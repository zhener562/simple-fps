# Simple FPS Game - 開発資料

## プロジェクト概要

WebRTCを使った2人対戦のシンプルなFPSゲーム。Three.jsで3D描画、Shuttle.rsでWebSocketシグナリングサーバーをデプロイ。

## アーキテクチャ

### フロントエンド
- **フレームワーク**: Three.js + TypeScript + Vite
- **ファイル**: `/static/index.tsx` (単一ファイル構成)
- **ビルド出力**: `/static/dist/`

### バックエンド (Signaling Server)
- **言語**: Rust
- **フレームワーク**: Actix Web + Actix Web Actors
- **デプロイ**: Shuttle.rs
- **主要ファイル**:
  - `src/main.rs` - メインサーバー、静的ファイル配信
  - `src/signaling.rs` - WebSocketシグナリング実装

## 自動マッチングシステム

### ルーム生成ロジック
```typescript
const roomPrefix = selectedMapType === 'random' ? 'any' : selectedMapType.toString();
const roomId = `${roomPrefix}_${Math.floor(Date.now() / 60000)}`; // 60秒間隔
```

### 接続条件
- **同じマップ選択** + **同じ60秒間隔**で自動マッチング
- マップ別ルーム: `arena_xxxxx`, `urban_xxxxx`, `forest_xxxxx`
- ランダムマップ: `any_xxxxx`

## デプロイメント

### 本番環境
- **URL**: https://fps-a1zx.shuttle.app
- **コマンド**: `shuttle deploy`
- **静的ファイル**: Shuttle.tomlで設定、手動ビルド必須

### 重要な設定ファイル

#### Cargo.toml
```toml
[package]
name = "fps"
version = "0.1.0"
edition = "2021"
# build = "build.rs" は削除済み (npm依存回避)

[dependencies]
actix-web = "4.3.1"
actix-files = "0.6.2"
actix-web-actors = "4.2.0"
actix = "0.13"
shuttle-actix-web = "0.55.0"
shuttle-runtime = "0.55.0"
tokio = "1.26.0"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
uuid = { version = "1.0", features = ["v4"] }
```

#### Shuttle.toml
```toml
name = "fps"

[build]
assets = ["static/dist/index.html", "static/dist/assets/*"]
```

## 開発ワークフロー

### ローカル開発
```bash
# フロントエンドビルド
cd static && npm run build

# サーバー起動
shuttle run
```

### デプロイ手順
```bash
# 1. フロントエンドビルド
cd static && npm run build && cd ..

# 2. デプロイ
shuttle deploy
```

## ゲーム機能

### マップ種類
- **Arena**: シンプルなアリーナマップ
- **Urban**: ビル群のある都市マップ  
- **Forest**: 木々のある森林マップ
- **Random**: ランダム生成マップ

### 武器システム
- **Handgun** (1キー): 基本武器
- **Sniper Rifle** (2キー): 高威力、スコープ付き
- **SMG** (3キー): 連射武器

### 操作方法
- WASD: 移動
- マウス: 視点移動
- 左クリック: 射撃
- 右クリック/Left Shift: エイム
- 1/2/3: 武器切り替え

## WebRTC P2P 通信

### シグナリングフロー
1. プレイヤーAがMultiplayerボタンクリック
2. WebSocket接続してルーム参加
3. プレイヤーBが同じルーム参加
4. 自動的にOffer/Answer/ICE交換
5. P2P接続確立後、ゲーム開始

### メッセージ形式
```typescript
interface SignalingMessage {
    msg_type: string;
    data: any;
    target?: string;
    sender?: string;
}
```

## トラブルシューティング

### よくある問題

#### 1. デプロイ失敗
**原因**: build.rsでnpm実行エラー
**解決**: build.rsを削除、手動ビルドに変更

#### 2. 静的ファイル404エラー  
**原因**: Shuttle.tomlのassets設定
**解決**: index.htmlを明示的に指定

#### 3. ボタン反応しない
**原因**: TypeScriptコンパイルエラー
**解決**: `npm run build`でビルド確認

#### 4. WebRTC接続失敗
**原因**: pitchObject初期化タイミング
**解決**: setTimeout(0)で遅延初期化

## パフォーマンス最適化

### 完了済み
- PitchObject初期化の最適化
- ICE candidate自動送信
- ルーム管理システム

### 今後の改善案
- バンドルサイズ削減 (現在507KB)
- 動的import()によるコード分割
- マップデータの最適化

## 開発履歴

### v1.0 - 基本実装
- 手動WebRTCシグナリング
- Three.js基本ゲーム

### v2.0 - 自動化
- WebSocketサーバー実装
- 自動マッチングシステム
- Shuttle.rsデプロイ

### v2.1 - 最適化
- ルーム間隔を60秒に変更
- デプロイ問題修正

## 次期開発アイデア

### 機能追加
- [ ] プレイヤー名前設定
- [ ] スコアボード・ランキング
- [ ] チャット機能
- [ ] リプレイ機能
- [ ] カスタムマップエディター

### 技術改善
- [ ] サーバーサイドゲーム状態管理
- [ ] チート対策
- [ ] モバイル対応
- [ ] PWA化
- [ ] Docker化

### UI/UX
- [ ] ゲーム内設定画面
- [ ] 感度調整
- [ ] サウンド追加
- [ ] エフェクト強化

## 参考情報

### 重要なファイル場所
- メインゲームロジック: `/static/index.tsx`
- シグナリングサーバー: `/src/signaling.rs`
- 静的配信設定: `/src/main.rs:45`
- ビルド設定: `/static/vite.config.js`

### 外部依存関係
- Three.js: CDN経由
- React: ESM経由  
- WebRTC: ブラウザネイティブAPI
- Actix Web: Rust Webフレームワーク

### デプロイURL
- 本番: https://fps-a1zx.shuttle.app
- WebSocket: wss://fps-a1zx.shuttle.app/ws

---
*最終更新: 2025-06-15*