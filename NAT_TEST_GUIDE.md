# NAT越えテストガイド

## NAT越えテスト方法

### 1. 基本的なテスト環境

#### テスト環境パターン
1. **異なるネットワーク間**
   - 自宅WiFi ↔ モバイル回線
   - 自宅 ↔ 会社/学校
   - 異なるプロバイダ同士

2. **異なるNATタイプ組み合わせ**
   - Symmetric NAT vs Cone NAT
   - 企業ファイアウォール vs 家庭用ルーター
   - IPv4 vs IPv6環境

### 2. 現在のゲームでのテスト方法

#### 簡単なテスト手順
```bash
# 1. 異なるネットワークから同時アクセス
# 端末A: WiFi接続
# 端末B: モバイル回線（テザリング）

# 2. 同じマップを選択
# 3. 1分以内にMultiplayerボタンをクリック
# 4. 接続状況を確認
```

#### 接続確認ポイント
- P2P Statusが "Connected" になるか
- 相手プレイヤーが表示されるか
- リアルタイム同期ができるか

### 3. 詳細なWebRTC接続診断

#### ブラウザ開発者ツールでの確認

##### Chrome/Edge
```javascript
// F12 → Console で実行
// 1. ICE候補の確認
peerConnection.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
        console.log('ICE Candidate:', event.candidate.candidate);
        console.log('Type:', event.candidate.candidate.split(' ')[7]); // host, srflx, relay
    }
});

// 2. 接続状態の監視
peerConnection.addEventListener('connectionstatechange', () => {
    console.log('Connection State:', peerConnection.connectionState);
});

// 3. ICE接続状態
peerConnection.addEventListener('iceconnectionstatechange', () => {
    console.log('ICE Connection State:', peerConnection.iceConnectionState);
});
```

##### chrome://webrtc-internals/
Chromeで `chrome://webrtc-internals/` にアクセス
- リアルタイムでWebRTC統計を確認
- ICE候補の詳細情報
- 接続経路の可視化

### 4. ICE候補タイプの理解

#### 候補タイプ別の意味
```
host      : ローカルIPアドレス（NAT内部）
srflx     : Server Reflexive（STUNサーバー経由）
prflx     : Peer Reflexive（ピア発見）
relay     : TURNサーバー経由（最後の手段）
```

#### 理想的な接続順序
1. **host → host**: 同一LAN内（最速）
2. **srflx → srflx**: STUN経由P2P（良好）
3. **relay → relay**: TURNサーバー経由（接続可能だが遅い）

### 5. NAT越え失敗の診断

#### よくある失敗パターン

##### Symmetric NAT問題
```
症状: ICE候補は生成されるが接続が確立しない
原因: 両端がSymmetric NATで直接接続不可
解決: TURNサーバーが必要
```

##### ファイアウォール問題
```
症状: host候補のみでsrflx候補が生成されない
原因: UDP通信がブロックされている
解決: ネットワーク管理者への相談
```

##### STUN/TURNサーバー問題
```
症状: 接続タイムアウト
原因: STUNサーバーへのアクセス失敗
確認: 現在の設定を確認
```

### 6. 現在のSTUN/TURN設定確認

#### 設定場所の確認
```typescript
// static/index.tsx 内のWebRTC設定を確認
const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
        // TURNサーバーがあればここに追加
    ]
};
```

### 7. 高度なテスト方法

#### 異なるNATタイプの作り方

##### テスト環境構築
```bash
# 1. VPN経由での接続テスト
# 一方の端末でVPN接続してNAT環境を変更

# 2. 企業ネットワークでのテスト  
# オフィス/学校のネットワークから接続

# 3. モバイル回線でのテスト
# 4G/5G回線は通常Symmetric NAT
```

#### NATタイプ判定ツール
```javascript
// 簡易的なNATタイプ判定
// Console で実行可能
async function detectNATType() {
    const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    
    pc.createDataChannel('test');
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    return new Promise((resolve) => {
        const candidates = [];
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                candidates.push(event.candidate.candidate);
            } else {
                // ICE gathering complete
                const hasHost = candidates.some(c => c.includes('typ host'));
                const hasSrflx = candidates.some(c => c.includes('typ srflx'));
                const hasRelay = candidates.some(c => c.includes('typ relay'));
                
                console.log('NAT Detection Results:');
                console.log('Host candidates:', hasHost);
                console.log('SRFLX candidates:', hasSrflx);  
                console.log('Relay candidates:', hasRelay);
                console.log('All candidates:', candidates);
                
                resolve({ hasHost, hasSrflx, hasRelay, candidates });
            }
        };
    });
}

// 実行
detectNATType().then(result => console.log('NAT Type:', result));
```

### 8. TURNサーバー追加（将来の改善）

#### 無料TURNサーバー例
```typescript
const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
        }
    ]
};
```

#### 自前TURNサーバー構築
```bash
# coturn サーバーのインストール例
sudo apt-get install coturn

# 設定例 (/etc/turnserver.conf)
listening-port=3478
tls-listening-port=5349
realm=myserver.com
server-name=myserver.com
```

### 9. テスト結果の記録

#### テストケーステンプレート
```
テスト日時: 2025-XX-XX
環境A: [WiFi/モバイル] - [プロバイダ名] - [地域]
環境B: [WiFi/モバイル] - [プロバイダ名] - [地域]
結果: [成功/失敗]
接続時間: XX秒
ICE候補: host/srflx/relay
備考: 
```

### 10. 実用的なテストスケジュール

#### 段階的テスト
1. **Phase 1**: 同一WiFi内（基本動作確認）
2. **Phase 2**: WiFi vs モバイル（一般的なNAT越え）
3. **Phase 3**: 企業ネットワーク vs 家庭（厳しい環境）
4. **Phase 4**: 海外ネットワーク（レイテンシ・地域テスト）

---

## 今すぐできる簡単テスト

1. **スマートフォンのテザリングを使用**
   - PC: 家のWiFi
   - スマホ: モバイル回線でテザリング接続

2. **友人・同僚と協力**
   - 異なる場所から同時アクセス
   - 接続成功率を記録

3. **開発者ツールで診断**
   - F12 → Console
   - chrome://webrtc-internals/
   - 上記のNATタイプ判定コード実行

これらのテストで、実際のNAT越え能力を確認できます！