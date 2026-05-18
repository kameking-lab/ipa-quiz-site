# Vercel Block 中の暫定運用ガイドライン

作成: 2026-05-18

---

## 現在の状態（2026-05-18 時点）

本番デプロイは回復済み。本ガイドは次回 rate limit 発生時のための参考資料。

---

## 1. Block 中でも可能な作業

- GitHub へのコード push、PR 作成、PR マージ — すべて可能
- E2E テスト (pnpm test) — 可能
- ビルド確認 (pnpm build) — ローカルで可能
- コードレビュー、仕様検討 — すべて可能

制約事項:
- マージした変更は Vercel に自動デプロイされない (rate limit 中)
- www.kakomon-ai.jp は block 前の最終正常デプロイを配信し続ける (edge cache)

---

## 2. Hotfix が必要な場合の対処

rate limit 中に本番緊急修正が必要な場合:

A. Vercel CLI から直接デプロイ（本人ローカル作業）:
   ```bash
   vercel --prod
   ```
   CLI デプロイは API trigger とは別カウントの場合がある。
   ただし状況によっては同じ limit に引っかかる可能性がある。

B. 24 時間待機を選択する:
   www.kakomon-ai.jp は edge cache で旧バージョンを正常配信している。
   セキュリティ脆弱性・決済バグでない限り待機が推奨。

C. 緊急時は Vercel サポートに連絡:
   URL: https://vercel.com/support
   「緊急 hotfix が必要だが rate limit 中」と伝える。

---

## 3. Block 解除後のデプロイ殺到対策

block が解除された直後、滞留していた全 PR の commit が一斉にデプロイを
トリガーするリスクがある（再度 limit を超過する危険）。

対策:
- Vercel ダッシュボードから「Ignored Build Step」を一時的に設定
  Settings > Git > Ignored Build Step に `exit 1` を設定して
  デプロイを一時停止し、HEAD コミットのみを手動でデプロイ

- または vercel-recovery.yml の `force_redeploy` を false に設定して
  recovery workflow が連続トリガーしないようにする

---

## 4. 再発防止策

4-1. PR マージペースの制御:
- 1 日あたりのマージ数を 80 件以下に抑える (safety margin: 20%)
- 大量 PR merge が必要な場合は 2 日以上に分散する

4-2. Vercel Pro プランへのアップグレード検討（月 20 USD〜）:
- Pro プランはデプロイ上限が大幅に緩和される
- Hobby の 100 builds/日 → Pro は 6000 builds/月
- フェーズ4 の Stripe 本実装時に合わせて検討

4-3. Preview デプロイの無効化:
- Settings > Git > Skipped Deployments で PR ブランチの preview を無効化
- main merge のみデプロイすることで使用量を半減

4-4. vercel.json に `builds` や `routes` でビルドスキップ設定:
   ```json
   {
     "ignoreCommand": "git diff --quiet HEAD^ HEAD -- '*.md' '*.txt'"
   }
   ```
   ドキュメントのみ変更の場合はビルドをスキップ。

---

## 5. 現在の監視体制

vercel-recovery.yml が 2 時間おきに production と main HEAD の SHA を比較し、
乖離がある場合に Vercel API 経由で再デプロイをトリガーする。

```
gh run list --workflow vercel-recovery.yml --limit 5
```

すべて "success" であれば監視は正常。"failure" が連続する場合は
VERCEL_TOKEN の有効期限・権限を確認。

VERCEL_TOKEN:
- 登録日: 2026-05-17T13:31:12Z
- 確認方法: gh secret list | grep VERCEL_TOKEN
- 再登録が必要な場合: docs/vercel-token-setup.md 参照

---

## 6. edge cache について

www.kakomon-ai.jp は Vercel edge network でキャッシュされている。
block 中でも古いバージョンを正常に返し続けるため、ユーザーへの影響は限定的。

edge cache の purge が必要な場合（本番デプロイ後に古いコンテンツが残る場合）:
```bash
vercel --prod --force  # キャッシュを強制 bypass して再デプロイ
```
