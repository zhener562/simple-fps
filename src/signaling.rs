use actix_web_actors::ws::{self, WebsocketContext};
use actix::{Actor, ActorContext, AsyncContext, Handler, StreamHandler, Recipient};
use serde_json;
use std::collections::{HashMap, HashSet};
use std::sync::{Arc, Mutex};
use std::time::SystemTime;
use uuid::Uuid;

use crate::SignalingMessage;

#[derive(Debug, Clone)]
pub struct Room {
    pub id: String,
    pub players: HashSet<String>,
    pub max_players: usize,
    pub created_at: SystemTime,
}

impl Room {
    pub fn new(id: String, max_players: usize) -> Self {
        Self {
            id,
            players: HashSet::new(),
            max_players,
            created_at: SystemTime::now(),
        }
    }
    
    pub fn can_join(&self) -> bool {
        self.players.len() < self.max_players
    }
    
    pub fn add_player(&mut self, player_id: String) -> bool {
        if self.can_join() {
            self.players.insert(player_id)
        } else {
            false
        }
    }
    
    pub fn remove_player(&mut self, player_id: &str) -> bool {
        self.players.remove(player_id)
    }
    
    pub fn is_empty(&self) -> bool {
        self.players.is_empty()
    }
}

#[derive(Clone)]
pub struct SignalingServer {
    pub clients: Arc<Mutex<HashMap<String, Recipient<SignalingMessage>>>>,
    pub rooms: Arc<Mutex<HashMap<String, Room>>>,
    pub client_rooms: Arc<Mutex<HashMap<String, String>>>, // client_id -> room_id
}

impl SignalingServer {
    pub fn new() -> Self {
        Self {
            clients: Arc::new(Mutex::new(HashMap::new())),
            rooms: Arc::new(Mutex::new(HashMap::new())),
            client_rooms: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub fn add_client(&self, id: String, recipient: Recipient<SignalingMessage>) {
        let mut clients = self.clients.lock().unwrap();
        clients.insert(id, recipient);
    }

    pub fn remove_client(&self, id: &str) {
        // Remove from clients
        let mut clients = self.clients.lock().unwrap();
        clients.remove(id);
        drop(clients);
        
        // Remove from room if in one
        self.leave_room(id);
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

    // Room management methods
    pub fn create_or_join_room(&self, room_id: String, client_id: String, max_players: usize) -> Result<Vec<String>, String> {
        let mut rooms = self.rooms.lock().unwrap();
        let mut client_rooms = self.client_rooms.lock().unwrap();
        
        // Check if client is already in a room
        if client_rooms.contains_key(&client_id) {
            return Err("Client already in a room".to_string());
        }
        
        // Get or create room
        let room = rooms.entry(room_id.clone()).or_insert_with(|| Room::new(room_id.clone(), max_players));
        
        // Try to add player to room
        if room.add_player(client_id.clone()) {
            client_rooms.insert(client_id, room_id);
            Ok(room.players.iter().cloned().collect())
        } else {
            Err("Room is full".to_string())
        }
    }
    
    pub fn leave_room(&self, client_id: &str) {
        let mut rooms = self.rooms.lock().unwrap();
        let mut client_rooms = self.client_rooms.lock().unwrap();
        
        if let Some(room_id) = client_rooms.remove(client_id) {
            if let Some(room) = rooms.get_mut(&room_id) {
                room.remove_player(client_id);
                
                // Remove empty rooms
                if room.is_empty() {
                    rooms.remove(&room_id);
                }
            }
        }
    }
    
    pub fn get_room_players(&self, room_id: &str) -> Vec<String> {
        let rooms = self.rooms.lock().unwrap();
        rooms.get(room_id)
            .map(|room| room.players.iter().cloned().collect())
            .unwrap_or_default()
    }
    
    pub fn broadcast_to_room(&self, room_id: &str, message: SignalingMessage, exclude: Option<&str>) {
        let room_players = self.get_room_players(room_id);
        let clients = self.clients.lock().unwrap();
        
        for player_id in room_players {
            if Some(player_id.as_str()) != exclude {
                if let Some(client) = clients.get(&player_id) {
                    let _ = client.do_send(message.clone());
                }
            }
        }
    }
    
    pub fn get_client_room(&self, client_id: &str) -> Option<String> {
        let client_rooms = self.client_rooms.lock().unwrap();
        client_rooms.get(client_id).cloned()
    }
}

pub struct SignalingSession {
    pub id: String,
    pub server: SignalingServer,
    pub room_id: Option<String>,
}

impl SignalingSession {
    pub fn new(server: SignalingServer) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            server,
            room_id: None,
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
        
        // Notify room members about player leaving
        if let Some(room_id) = &self.room_id {
            let user_left_msg = SignalingMessage {
                msg_type: "user-left".to_string(),
                data: serde_json::json!({
                    "user_id": self.id,
                    "room_id": room_id
                }),
                target: None,
                sender: Some(self.id.clone()),
            };
            self.server.broadcast_to_room(room_id, user_left_msg, Some(&self.id));
        }
        
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
                            // Forward P2P signaling messages to target client within same room
                            if let Some(target) = &signaling_msg.target {
                                // Verify both clients are in the same room
                                if let Some(sender_room) = self.server.get_client_room(&self.id) {
                                    if let Some(target_room) = self.server.get_client_room(target) {
                                        if sender_room == target_room {
                                            let mut forward_msg = signaling_msg.clone();
                                            forward_msg.sender = Some(self.id.clone());
                                            self.server.send_to_client(target, forward_msg);
                                        } else {
                                            println!("Blocked cross-room message from {} to {}", self.id, target);
                                        }
                                    }
                                }
                            }
                        }
                        "join-room" => {
                            // Enhanced room joining with capacity limits
                            if let Some(room_data) = signaling_msg.data.as_object() {
                                let room_id = room_data.get("room_id")
                                    .and_then(|v| v.as_str())
                                    .unwrap_or("default")
                                    .to_string();
                                
                                let max_players = room_data.get("max_players")
                                    .and_then(|v| v.as_u64())
                                    .unwrap_or(6) as usize; // Default to 6 players max
                                
                                match self.server.create_or_join_room(room_id.clone(), self.id.clone(), max_players) {
                                    Ok(room_players) => {
                                        self.room_id = Some(room_id.clone());
                                        
                                        // Send success response to joiner
                                        let join_success = SignalingMessage {
                                            msg_type: "room-joined".to_string(),
                                            data: serde_json::json!({
                                                "room_id": room_id,
                                                "players": room_players,
                                                "player_count": room_players.len()
                                            }),
                                            target: None,
                                            sender: None,
                                        };
                                        ctx.text(serde_json::to_string(&join_success).unwrap());
                                        
                                        // Notify other players in room about new player
                                        let user_joined_msg = SignalingMessage {
                                            msg_type: "user-joined".to_string(),
                                            data: serde_json::json!({
                                                "user_id": self.id,
                                                "room_id": room_id,
                                                "player_count": room_players.len()
                                            }),
                                            target: None,
                                            sender: Some(self.id.clone()),
                                        };
                                        self.server.broadcast_to_room(&room_id, user_joined_msg, Some(&self.id));
                                    }
                                    Err(error) => {
                                        // Send error response
                                        let error_msg = SignalingMessage {
                                            msg_type: "room-error".to_string(),
                                            data: serde_json::json!({
                                                "error": error,
                                                "room_id": room_id
                                            }),
                                            target: None,
                                            sender: None,
                                        };
                                        ctx.text(serde_json::to_string(&error_msg).unwrap());
                                    }
                                }
                            }
                        }
                        "game-state" => {
                            // Forward game state updates to room members only
                            if let Some(room_id) = &self.room_id {
                                let mut game_msg = signaling_msg.clone();
                                game_msg.sender = Some(self.id.clone());
                                self.server.broadcast_to_room(room_id, game_msg, Some(&self.id));
                            }
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