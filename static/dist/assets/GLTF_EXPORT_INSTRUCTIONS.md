# Blender to GLTF Export Instructions

## Zombie_Schoolgirl_01.blend を GLTF に変換する手順

### 1. Blenderでファイルを開く
1. Blender を起動
2. `File > Open` から `/home/zhener/simple-fps/static/assets/Custom Rigg/Zombie_Schoolgirl_01.blend` を開く

### 2. モデルの確認と調整
1. モデルが画面中央に表示されることを確認
2. 必要に応じてスケールを調整（通常は 1.0 のまま）
3. モデルが原点 (0,0,0) 付近にあることを確認

### 3. GLTFエクスポート
1. `File > Export > glTF 2.0 (.gltf/.glb)` を選択
2. エクスポート設定:
   - Format: `glTF Embedded (.gltf)`
   - Include: 
     - ✓ Selected Objects (モデルを選択した場合)
     - ✓ Visible Objects
   - Transform:
     - ✓ Y Up
   - Geometry:
     - ✓ Apply Modifiers
     - ✓ UVs
     - ✓ Normals
   - Animation: 必要に応じて
3. ファイル名: `zombie.gltf`
4. 保存場所: `/home/zhener/simple-fps/static/assets/zombie.gltf`

### 4. 確認
エクスポートが完了したら、以下のファイルが作成されます:
- `zombie.gltf` - メインファイル
- 必要に応じてテクスチャファイル

### 代替案: GLBフォーマット
より軽量にしたい場合：
1. Format を `glTF Binary (.glb)` に変更
2. ファイル名を `zombie.glb` に変更
3. コード内の読み込みパスを更新

## 注意事項
- モデルのサイズが大きすぎる場合は、ゲーム内でスケール調整可能
- テクスチャパスが正しく設定されていることを確認
- アニメーションが不要な場合は除外して軽量化

## トラブルシューティング
- エクスポートできない場合: モデルを選択してから Export Selected
- ファイルサイズが大きい場合: テクスチャ解像度を下げる
- 表示されない場合: Y Up の設定を確認