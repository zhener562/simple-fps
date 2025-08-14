use actix_web::{
    get, web, HttpRequest, HttpResponse, Result, 
    web::ServiceConfig
};
use actix_web_actors::ws;
use actix_files::Files;
use shuttle_actix_web::ShuttleActixWeb;
use shuttle_runtime::SecretStore;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

mod signaling;
use signaling::{SignalingServer, SignalingSession};

mod ai_api;
use ai_api::{gemini_chat, text_to_speech};

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
async fn main(
    #[shuttle_runtime::Secrets] secrets: SecretStore,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    let signaling_server = SignalingServer::new();
    
    let config = move |cfg: &mut ServiceConfig| {
        cfg
            .app_data(web::Data::new(signaling_server))
            .app_data(web::Data::new(secrets))
            .service(websocket)
            .service(gemini_chat)
            .service(text_to_speech)
            
            .service(Files::new("/game", "static/simple-fps/dist/").index_file("index.html"))
            .service(Files::new("/card-game", "static/card-game/dist/").index_file("index.html"))
            .service(Files::new("/clone-shinji", "static/clone-shinji/dist/").index_file("index.html"))
            .service(Files::new("/ai-agent-research", "static/ai-agent-research/dist/").index_file("index.html"))
            .service(Files::new("/prometheus-novel", "static/prometheus-novel/dist/").index_file("index.html"))
            .service(Files::new("/", "static/all-about-shinji/dist/").index_file("index.html"));
    };

    Ok(config.into())
}