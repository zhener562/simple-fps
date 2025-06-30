use actix_web::{
    get, web, HttpRequest, HttpResponse, Result, 
    web::ServiceConfig
};
use actix_web_actors::ws;
use actix_files::Files;
use shuttle_actix_web::ShuttleActixWeb;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

mod signaling;
use signaling::{SignalingServer, SignalingSession};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignalingMessage {
    pub msg_type: String,
    pub data: serde_json::Value,
    pub target: Option<String>,
    pub sender: Option<String>,
}

pub type Clients = Arc<Mutex<HashMap<String, actix_web_actors::ws::WebsocketContext<SignalingSession>>>>;

// Remove the index handler since we'll use Files to serve everything

#[get("/ws")]
async fn websocket(
    req: HttpRequest,
    stream: web::Payload,
    data: web::Data<SignalingServer>,
) -> Result<HttpResponse> {
    let session = SignalingSession::new(data.get_ref().clone());
    ws::start(session, &req, stream)
}

#[shuttle_runtime::main]
async fn main() -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    let signaling_server = SignalingServer::new();
    
    let config = move |cfg: &mut ServiceConfig| {
        cfg
            .app_data(web::Data::new(signaling_server))
            .service(websocket)
            
            .service(Files::new("/game", "static/dist/").index_file("index.html"))
            .service(Files::new("/", "all-about-shinji/dist/").index_file("index.html"));
    };

    Ok(config.into())
}