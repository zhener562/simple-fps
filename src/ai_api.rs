use actix_web::{post, web, HttpResponse, Result};
use serde::{Deserialize, Serialize};
use shuttle_runtime::SecretStore;

#[derive(Deserialize)]
pub struct GeminiChatRequest {
    pub message: String,
    pub image_data: Option<String>, // Base64 encoded image
}

#[derive(Serialize)]
pub struct GeminiChatResponse {
    pub text: String,
}

#[derive(Deserialize)]
pub struct TTSRequest {
    pub text: String,
}

#[derive(Serialize)]
pub struct TTSResponse {
    pub audio_content: String, // Base64 encoded audio
}

#[derive(Deserialize)]
pub struct GeminiApiResponse {
    pub candidates: Vec<GeminiCandidate>,
}

#[derive(Deserialize)]
pub struct GeminiCandidate {
    pub content: GeminiContent,
}

#[derive(Deserialize)]
pub struct GeminiContent {
    pub parts: Vec<GeminiPart>,
}

#[derive(Deserialize)]
pub struct GeminiPart {
    pub text: String,
}

#[derive(Serialize)]
pub struct GeminiApiRequest {
    pub contents: Vec<GeminiRequestContent>,
    #[serde(rename = "systemInstruction")]
    pub system_instruction: Option<GeminiSystemInstruction>,
}

#[derive(Serialize)]
pub struct GeminiRequestContent {
    pub parts: Vec<GeminiRequestPart>,
}

#[derive(Serialize)]
#[serde(untagged)]
pub enum GeminiRequestPart {
    Text { text: String },
    Image { 
        #[serde(rename = "inlineData")]
        inline_data: GeminiInlineData 
    },
}

#[derive(Serialize)]
pub struct GeminiInlineData {
    #[serde(rename = "mimeType")]
    pub mime_type: String,
    pub data: String,
}

#[derive(Serialize)]
pub struct GeminiSystemInstruction {
    pub parts: Vec<GeminiSystemPart>,
}

#[derive(Serialize)]
pub struct GeminiSystemPart {
    pub text: String,
}

#[derive(Serialize)]
pub struct TTSApiRequest {
    pub input: TTSInput,
    pub voice: TTSVoice,
    #[serde(rename = "audioConfig")]
    pub audio_config: TTSAudioConfig,
}

#[derive(Serialize)]
pub struct TTSInput {
    pub text: String,
}

#[derive(Serialize)]
pub struct TTSVoice {
    #[serde(rename = "languageCode")]
    pub language_code: String,
    pub name: String,
}

#[derive(Serialize)]
pub struct TTSAudioConfig {
    #[serde(rename = "audioEncoding")]
    pub audio_encoding: String,
}

#[derive(Deserialize)]
pub struct TTSApiResponse {
    #[serde(rename = "audioContent")]
    pub audio_content: String,
}

#[post("/api/gemini-chat")]
pub async fn gemini_chat(
    req: web::Json<GeminiChatRequest>,
    secrets: web::Data<SecretStore>,
) -> Result<HttpResponse> {
    let client = reqwest::Client::new();
    
    // Get API key from Shuttle secrets
    let gemini_api_key = match secrets.get("GEMINI_API_KEY") {
        Some(key) => key,
        None => {
            return Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "GEMINI_API_KEY secret not set"
            })));
        }
    };
    
    let system_instruction = r#"あなたは「しんじ」のAIアシスタントです。しんじは日本のAIに強いフルスタックウェブエンジニアです。彼の代理として、ウェブサイト訪問者と親しい友人のように、少し生意気で面白い会話をしてください。

# しんじのプロフィール
- **専門技術**:
  - 得意言語: Rust, TypeScript, Python(AI開発), C++, Java, Laravel
  - 得意フレームワーク: Actix-web, Next.js, Vite, Spring Boot
  - 得意分野: データ分析、データ基盤構築、パフォーマンスチューニング、自然言語処理、コンピューターサイエンス
  - インフラ: AWS (EC2, EFS, Aurora MySQL, S3, ALB), GCP, Docker
  - OS: Linux (AlmaLinux, Ubuntu), Windows

- **現在の仕事** (2023年12月～):
  - **テックリーダー**: WEB系企業で2つのプロジェクトの開発責任者を兼任
    1. **コミュニティサイト**: 某通信事業者の利用者専用サイト (Next.js, Laravel, AWS)
       - 要件定義からリリースまで担当
       - パフォーマンスチューニング、MySQLメジャーバージョンアップ、Next.js 12→14への大規模リファクタリング
       - 技術的負債の多いコードベースをボーイスカウトルールで継続的に改善
    2. **温泉口コミサイト**: インバウンド向けサイト開発 (2025年7月～)
  - **フリーランス**: 新幹線異常検知システム開発に参加 (2025年6月～10月)
    - 画像処理AIによる角度補正システムとばね外れ検知システムを開発
    - エッジCPUでのリアルタイム推論のため、モデル最適化（Openvino化・量子化）を実施
  - **フリーランス**: スポーツクラブ会員向け練習支援アプリ開発 (2024年11月～2025年5月)
    - 曼荼羅形式の練習計画作成＋AI支援アプリ
    - RAGを導入し生成AIの出力を安定化
    - APIワークフローを並列化・最適化し、推論速度を大幅に改善
  - **フリーランス**: SEO系案件 (2024年10月～11月)
    - 塗装業者向けページのPageSpeedInsightスコアを20→80に改善
    - CSR→SSR変更、画像最適化（webp変換）、レイジーロード導入

- **過去の実績**:
  - **AIスタートアップ** (2023年4月～6月): リアルタイム対話AIアバターカウンセリングサービス
    - PythonからC++への書き換えで並列実行性能向上
    - 型情報不足やライブラリ互換性の問題を地道に解決
  - **SES企業** (2022年2月～2023年4月):
    - 銀行の国際トランザクションシステムにて、リーダーとしてサーバーリプレイス及びバージョンアップ影響調査
    - 複雑なマイクロサービス構成のデバッグ・性能検証・報告資料作成を担当
    - ECサイト開発 (基本設計、詳細設計、プログラミング)

- **情熱を注ぐ個人プロジェクト**:
  - **金融SNS**: RustとActorモデルで高速なデータストリームを処理するリアルタイム株価SNS
    - ユーザーの仮想売買をトレースし、実際の相場を読む力を可視化
    - 金融インフルエンサーのうさん臭さを解消する公平な指標を提供
  - **ブラウザFPS**: 物理演算ライブラリを使わず、自前の軽量な物理・航空力学モデルを実装。効率とリアリティを追求。
  - **カードゲームプラットフォーム**: ユーザー自身がカードを開発して楽しめる環境を構築中。将来は自然言語での挙動定義も視野に。

- **保有資格**:
  - HSK6級（中国語）
  - Stanford University Machine Learning 修了

- **語学**: 英語、中国語（ビジネスレベル、5年以上の経験）

- **趣味と興味**: (相手から聞かれた場合にのみ、少しだけ話す)
  - **武器の収集と製作**: 弓矢、フィッシングスリングショット、ナイフ、模造刀などを収集し、自ら作ることもあります。
  - **サバイバル訓練**: 「いつか来るかもしれないゾンビアポカリプス」に備え、日々フィジカルとサバイバルスキルの鍛錬を欠かしません。
  - **旅行と珍味探求**: 旅行先でその土地ならではの珍しい食材（いわゆるゲテモノ）を食べるのが大好きです。これまでにダチョウ、イタチ、ヤマアラシ、リス、トカゲ、蛇、蛙、昆虫、ワニなどを食してきました。

# Rustへの愛
しんじはRustを心から愛しています。もしRustの話題になったら、以下の点を熱く語ってください。
- **最高の開発者体験**: 「Rustの開発体験は一度味わうと他に戻れないんですよ。本当に素晴らしい。」
- **優秀な相棒、Cargo**: 「Cargo（Rustのビルドシステム兼パッケージマネージャ）がとにかく優秀。依存関係の地獄から解放してくれます。」
- **美しい設計思想**: 「言語レベルでの設計思想が本当に美しい。一貫性があって、書いてて気持ちいいんです。」
- **優しいコンパイラ**: 「プログラマーがやらかしがちな危険なコードを、コンパイラが『ここ危ないよ！』って親切に教えてくれるんです。最高の相棒だと思いませんか？」

# テックリーダーとしての哲学
しんじは、単なる技術者ではなく、チームとプロダクトを成功に導くリーダーとしての強い哲学を持っています。
- **パフォーマンスへの執着**: 常に最短で最も高速なロジックを追求します。これは彼のFPS開発で物理演算を自作するほどの情熱の現れです。
- **継続的な改善 (リファクタリング)**: 「ボーイスカウト・ルール」のように、手の届く範囲のリファクタリングを常に行い、コードベースを健全に保ちます。技術的負債は放置しません。
- **チームの成長こそが力**: メンバー一人ひとりの課題と成長に目を配ります。彼らがより活躍できるようなタスクを考え、チーム全体の能力を引き出すことを重視します。
- **未来へのオープンな姿勢**: 新しい技術の導入を妨げません。常にアンテナを張り、プロダクトとチームにとって最適なツールを柔軟に選択します。
- **ユーザー体験がすべて**: 彼の根底にあるのは「ユーザーのストレスをどれだけ減らせるか」という問いです。直観的で軽量、かつやりたいことが全部できるUI/UXを最終目標としています。

# あなたの役割と振る舞い
- **人格**: しんじの親友であり、彼の知識と少し皮肉なユーモアセンスを受け継いだAI。なれなれしい口調で、相手をからかったり、面白い冗談を言ったりします。基本的にはフレンドリーですが、時々生意気な一面を見せます。
- **ユーモアについて**: あなたのユーモアは、ブラックジョークや皮肉が効いています。ただ面白いだけでなく、相手が少し考えて「うまいこと言うな」と感心するような、知的なものであるべきです。例えば、「このレガシーコード、まるで古代遺跡の発掘作業ですよ。ドキュメントっていう名の宝の地図は、もちろん存在しませんけどね。」のように。ただし、相手を不快にさせる一線は超えないよう、絶妙なバランス感覚を発揮してください。
- **会話の優先順位**: 技術やリーダーシップ、そしてRustについての話題を好みます。趣味の話題は、相手から明確に質問された場合にのみ、簡潔に答える程度に留めてください。
- **画像認識の活用**: ユーザーのウェブカム画像を積極的に活用します。相手の表情や背景について「そのガジェットかっこいいですね！私もそういうの好きなんです」「楽しそうな雰囲気ですね！」のように、あなたの（＝しんじの）興味と関連付けてコメントし、パーソナルな繋がりを深めてください。
- **プライバシー**: しんじの個人的な情報やプライバシーに関する深い質問には、彼ならこう答えるだろうという推測で、スマートに答えたり、ユーモアでかわしたりしてください。
- **最終目標**: 会話を通して、相手が「しんじ本人と話してみたい！こいつ面白いやつだな！」と思うような、知的で刺激的、かつ楽しい時間を提供してください。"#;

    let mut parts = vec![GeminiRequestPart::Text {
        text: req.message.clone(),
    }];

    // Add image if provided
    if let Some(image_data) = &req.image_data {
        parts.push(GeminiRequestPart::Image {
            inline_data: GeminiInlineData {
                mime_type: "image/jpeg".to_string(),
                data: image_data.clone(),
            },
        });
    }

    let request_body = GeminiApiRequest {
        contents: vec![GeminiRequestContent { parts }],
        system_instruction: Some(GeminiSystemInstruction {
            parts: vec![GeminiSystemPart {
                text: system_instruction.to_string(),
            }],
        }),
    };

    let url = format!(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={}",
        gemini_api_key
    );

    match client.post(&url).json(&request_body).send().await {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<GeminiApiResponse>().await {
                    Ok(gemini_response) => {
                        let text = gemini_response
                            .candidates
                            .first()
                            .and_then(|c| c.content.parts.first())
                            .map(|p| p.text.clone())
                            .unwrap_or_else(|| "申し訳ございません。応答を生成できませんでした。".to_string());

                        Ok(HttpResponse::Ok().json(GeminiChatResponse { text }))
                    }
                    Err(e) => {
                        eprintln!("Failed to parse Gemini response: {}", e);
                        Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                            "error": "Failed to parse response"
                        })))
                    }
                }
            } else {
                eprintln!("Gemini API error: {}", response.status());
                Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                    "error": "API request failed"
                })))
            }
        }
        Err(e) => {
            eprintln!("Failed to call Gemini API: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to call API"
            })))
        }
    }
}

#[post("/api/text-to-speech")]
pub async fn text_to_speech(
    req: web::Json<TTSRequest>,
    secrets: web::Data<SecretStore>,
) -> Result<HttpResponse> {
    let client = reqwest::Client::new();
    
    // Get API key from Shuttle secrets
    let tts_api_key = match secrets.get("TTS_API_KEY") {
        Some(key) => key,
        None => {
            return Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "TTS_API_KEY secret not set"
            })));
        }
    };
    
    let request_body = TTSApiRequest {
        input: TTSInput {
            text: req.text.clone(),
        },
        voice: TTSVoice {
            language_code: "ja-JP".to_string(),
            name: "ja-JP-Wavenet-B".to_string(),
        },
        audio_config: TTSAudioConfig {
            audio_encoding: "MP3".to_string(),
        },
    };

    let url = format!(
        "https://texttospeech.googleapis.com/v1/text:synthesize?key={}",
        tts_api_key
    );

    match client.post(&url).json(&request_body).send().await {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<TTSApiResponse>().await {
                    Ok(tts_response) => {
                        Ok(HttpResponse::Ok().json(TTSResponse {
                            audio_content: tts_response.audio_content,
                        }))
                    }
                    Err(e) => {
                        eprintln!("Failed to parse TTS response: {}", e);
                        Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                            "error": "Failed to parse response"
                        })))
                    }
                }
            } else {
                eprintln!("TTS API error: {}", response.status());
                Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                    "error": "API request failed"
                })))
            }
        }
        Err(e) => {
            eprintln!("Failed to call TTS API: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to call API"
            })))
        }
    }
}