# Technical Implementation Notes

## WebRTC実装の詳細

### 重要な実装ポイント

#### PitchObject初期化問題
```typescript
// 問題: PointerLockControlsの準備が完了する前にアクセス
// 解決: 遅延初期化 + フォールバック
setTimeout(() => {
    try {
        pitchObject = controls?.getObject()?.children[0];
        if (!pitchObject) {
            pitchObject = new THREE.Object3D();
            controls?.getObject()?.add(pitchObject);
        }
    } catch (error) {
        console.error("CRITICAL: Both methods to get pitchObject failed");
    }
}, 0);
```

#### ICE Candidate自動送信
```typescript
peerConnection.addEventListener('icecandidate', (event) => {
    if (event.candidate && signalingSocket && opponentClientId) {
        signalingSocket.send(JSON.stringify({
            msg_type: 'ice-candidate',
            data: event.candidate.toJSON(),
            target: opponentClientId
        }));
    }
});
```

## Shuttle.rsデプロイの注意点

### build.rs問題と解決
```bash
# 問題: Shuttleビルド環境にnpmが存在しない
# エラー: "Failed to run npm install: Os { code: 2, kind: NotFound }"

# 解決: build.rsを削除し、手動ビルドに変更
rm build.rs
# Cargo.tomlから build = "build.rs" 行を削除
```

### 静的ファイル配信設定
```toml
# Shuttle.toml - 重要: index.htmlを明示的に指定
[build]
assets = ["static/dist/index.html", "static/dist/assets/*"]
```

```rust
// main.rs - 静的ファイル配信
.service(Files::new("/", "static/dist/").index_file("index.html"))
```

## マッチングアルゴリズム

### ルーム生成ロジック
```typescript
// 60秒間隔でルーム更新
const roomId = `${roomPrefix}_${Math.floor(Date.now() / 60000)}`;

// 例：
// 14:32:00-14:32:59 → "arena_167234173"  
// 14:33:00-14:33:59 → "arena_167234174"
```

### WebSocketメッセージフロー
```
Player A                    Server                     Player B
   |                          |                          |
   |-- join-room ------------>|                          |
   |                          |<----- join-room ---------|
   |                          |-- room-joined ---------->|
   |<----- room-joined -------|                          |
   |                          |                          |
   |-- offer ---------------->|-- offer ---------------->|
   |                          |                          |
   |<----- answer ------------|<----- answer ------------|
   |                          |                          |
   |-- ice-candidate -------->|-- ice-candidate -------->|
   |<----- ice-candidate -----|<----- ice-candidate -----|
```

## パフォーマンス考慮事項

### Three.jsオブジェクト管理
```typescript
// メモリリーク対策
function clearMap() {
    mapFeatures.forEach(feature => {
        if (feature.geometry) feature.geometry.dispose();
        if (feature.material) {
            if (Array.isArray(feature.material)) {
                feature.material.forEach(mat => mat.dispose());
            } else {
                feature.material.dispose();
            }
        }
        scene.remove(feature);
    });
    mapFeatures = [];
}
```

### WebRTCデータチャネル最適化
```typescript
// 位置同期の最適化（60FPS制限）
const SYNC_INTERVAL = 1000 / 60; // 16.67ms
let lastSyncTime = 0;

function syncPosition() {
    const now = Date.now();
    if (now - lastSyncTime < SYNC_INTERVAL) return;
    
    // 位置データ送信
    lastSyncTime = now;
}
```

## セキュリティ考慮事項

### WebRTC P2P通信
- データは暗号化されてピア間で直接送信
- サーバーはシグナリングのみ（ゲームデータは通らない）
- ICE候補によるNAT越え

### 潜在的な脆弱性
```typescript
// TODO: 将来的な改善点
// 1. 入力値検証（位置データ、射撃データ）
// 2. レート制限（射撃頻度、移動速度）
// 3. サーバーサイド検証（チート対策）
```

## デバッグ・ログ出力

### 開発時に有用なログ
```typescript
// WebRTC接続状態
peerConnection.addEventListener('connectionstatechange', () => {
    console.log('WebRTC Connection State:', peerConnection.connectionState);
});

// シグナリング状態
signalingSocket.addEventListener('message', (event) => {
    console.log('Signaling received:', JSON.parse(event.data));
});
```

### Shuttleログ確認
```bash
# リアルタイムログ
shuttle logs

# デプロイ状態確認  
shuttle project status
```

## ファイル構造詳細

```
/home/zhener/simple-fps/
├── src/
│   ├── main.rs           # Actix Webサーバー
│   └── signaling.rs      # WebSocketシグナリング
├── static/
│   ├── index.tsx         # メインゲームコード
│   ├── package.json      # Node.js依存関係
│   ├── vite.config.js    # Viteビルド設定
│   └── dist/             # ビルド出力
│       ├── index.html
│       └── assets/
├── Cargo.toml           # Rust依存関係
├── Shuttle.toml         # Shuttleデプロイ設定
└── .gitignore
```

## 既知の制限事項

### ブラウザ互換性
- WebRTC: モダンブラウザのみ
- PointerLockAPI: セキュリティ制限あり
- AudioContext: ユーザー操作後のみ利用可能

### ネットワーク制限
- 企業ファイアウォール: WebRTC接続に制限
- モバイル回線: レイテンシが高い場合あり
- IPv6: 一部環境で接続不安定

## 今後の技術的改善点

### アーキテクチャ
1. **サーバーサイドゲーム状態管理**
   - 現在: 完全P2P
   - 改善: ハイブリッド（重要データはサーバー検証）

2. **スケーラビリティ**
   - 現在: 2人対戦のみ
   - 改善: 4人対戦、チーム戦

3. **リアルタイム性**
   - 現在: 60FPS同期
   - 改善: 予測補正、ラグ補償

### コード品質
1. **型安全性強化**
   - strict TypeScript設定
   - Runtime型検証

2. **テスト追加**
   - Unit tests for game logic
   - Integration tests for WebRTC

3. **エラーハンドリング**
   - 接続断時の自動再接続
   - グレースフルデグラデーション

---
*Technical Notes - 2025-06-15*