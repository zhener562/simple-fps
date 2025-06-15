use actix_web_actors::ws::{self, WebsocketContext};
use actix::{Actor, ActorContext, AsyncContext, Handler, StreamHandler, Recipient};
use serde_json;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use uuid::Uuid;

use crate::SignalingMessage;

#[derive(Clone)]
pub struct SignalingServer {
    pub clients: Arc<Mutex<HashMap<String, Recipient<SignalingMessage>>>>,
}

impl SignalingServer {
    pub fn new() -> Self {
        Self {
            clients: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub fn add_client(&self, id: String, recipient: Recipient<SignalingMessage>) {
        let mut clients = self.clients.lock().unwrap();
        clients.insert(id, recipient);
    }

    pub fn remove_client(&self, id: &str) {
        let mut clients = self.clients.lock().unwrap();
        clients.remove(id);
    }

    pub fn send_to_client(&self, target: &str, message: SignalingMessage) {
        let clients = self.clients.lock().unwrap();
        if let Some(client) = clients.get(target) {
            let _ = client.do_send(message);
        }
    }

    pub fn broadcast(&self, message: SignalingMessage, exclude: Option<&str>) {
        let clients = self.clients.lock().unwrap();
        for (id, client) in clients.iter() {
            if Some(id.as_str()) != exclude {
                let _ = client.do_send(message.clone());
            }
        }
    }
}

pub struct SignalingSession {
    pub id: String,
    pub server: SignalingServer,
}

impl SignalingSession {
    pub fn new(server: SignalingServer) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            server,
        }
    }
}

impl Actor for SignalingSession {
    type Context = WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        println!("Client {} connected", self.id);
        self.server.add_client(self.id.clone(), ctx.address().recipient());
        
        // Send welcome message with client ID
        let welcome_msg = SignalingMessage {
            msg_type: "welcome".to_string(),
            data: serde_json::json!({
                "client_id": self.id
            }),
            target: None,
            sender: None,
        };
        ctx.text(serde_json::to_string(&welcome_msg).unwrap());
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        println!("Client {} disconnected", self.id);
        self.server.remove_client(&self.id);
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for SignalingSession {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Ping(msg)) => ctx.pong(&msg),
            Ok(ws::Message::Text(text)) => {
                println!("Received message from {}: {}", self.id, text);
                
                if let Ok(signaling_msg) = serde_json::from_str::<SignalingMessage>(&text) {
                    match signaling_msg.msg_type.as_str() {
                        "offer" | "answer" | "ice-candidate" => {
                            // Forward P2P signaling messages to target client
                            if let Some(target) = &signaling_msg.target {
                                let mut forward_msg = signaling_msg.clone();
                                forward_msg.sender = Some(self.id.clone());
                                self.server.send_to_client(target, forward_msg);
                            }
                        }
                        "join-room" => {
                            // Simple room joining - broadcast to all other clients
                            let room_msg = SignalingMessage {
                                msg_type: "user-joined".to_string(),
                                data: serde_json::json!({
                                    "user_id": self.id,
                                    "room": signaling_msg.data
                                }),
                                target: None,
                                sender: Some(self.id.clone()),
                            };
                            self.server.broadcast(room_msg, Some(&self.id));
                        }
                        "game-state" => {
                            // Forward game state updates to all other clients
                            let mut game_msg = signaling_msg.clone();
                            game_msg.sender = Some(self.id.clone());
                            self.server.broadcast(game_msg, Some(&self.id));
                        }
                        _ => {
                            println!("Unknown message type: {}", signaling_msg.msg_type);
                        }
                    }
                }
            }
            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
            Ok(ws::Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            }
            _ => (),
        }
    }
}

impl Handler<SignalingMessage> for SignalingSession {
    type Result = ();

    fn handle(&mut self, msg: SignalingMessage, ctx: &mut Self::Context) {
        if let Ok(json_msg) = serde_json::to_string(&msg) {
            ctx.text(json_msg);
        }
    }
}

impl actix::Message for SignalingMessage {
    type Result = ();
}