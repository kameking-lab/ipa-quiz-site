# Vercel アカウント block 原因調査 & 解除手順書

作成: 2026-05-18
調査ブランチ: investigate/vercel-account-block

---

## セクション1: Block 原因の可能性（調査結果から）

### 最有力仮説: Hobby プラン 100 builds/日 レートリミット超過（確定）

Vercel Hobby プランは 1 日あたり 100 件のデプロイ上限を持つ。
2026-05-15〜16 にかけて PR #184〜#232 (約 85 PR) が急速にマージされ、
各マージが Vercel の GitHub Webhook 経由でデプロイをトリガーした。

GitHub commit status の証拠:
- 最初の rate limit 発生: 2026-05-16T02:44 UTC (PR #204 merge)
- 直前の成功デプロイ: 2026-05-16T02:38 UTC (alive marker commit)
- 発生から 24h 後にリセットされるが、翌日も同様の PR merge が続いたため
  再度 limit に到達した。

API エラーメッセージ（recovery workflow ログより）:
```
{"error":{"code":"payment_required",
  "message":"Resource is limited - try again in 24 hours
             (more than 100, code: \"api-deployments-free-per-day\").",
  "limit":{"total":100,"remaining":0,"reset":1779112039254},
  "resource":"api-deployments-free-per-day"}}
```

GitHub commit status 表示:
- description: "Deployment rate limited — retry in 24 hours."
- target_url: https://vercel.com/kameking-labs-projects?upgradeToPro=build-rate-limit

注: 「Account is blocked.」という description は Vercel ダッシュボード UI の表示差異。
    API / commit status では "Deployment rate limited" として記録されている。
    target_url が参照する https://vercel.com/knowledge/why-is-my-account-deployment-blocked
    は rate limit 超過のサポートページであり、アカウント停止とは別物。

### 副次的仮説: dynamicParams=false による BUILD FAILURE（確定）

recovery 作業中、commit 141d9c4 (fix(blog)) が dynamicParams=false を設定したため
SSG でのビルド時に動的ルートが 404 を返し、本番ビルドが失敗した。
PR #288 (2026-05-17) で revert 済み。これは rate limit とは独立した問題。

### 除外された仮説: ToS / Fair Use Policy 違反によるアカウント停止

Vercel API /v2/user の調査結果:
- status: "active"（アクティブ）
- softBlock: null（ソフトブロックなし）

アカウント停止ではなく、デプロイ上限の一時的な rate limit であることを確認。
Vercel サポートへの連絡は現時点では不要。

---

## セクション2: 本人作業手順（現在は解除済みのため参考情報）

### 現在の状態（2026-05-18 調査時点）

- 本番 URL (www.kakomon-ai.jp): 正常稼働中
- 最新本番デプロイ: 2026-05-17T15:32 UTC (READY)
- アカウント status: active、softBlock: null
- 解除済み。以下は再発時の手順。

### 手順A: 24 時間待機（rate limit の場合）— 最優先

rate limit は 24 時間後に自動リセットされる。
待機中は GitHub への PR マージ・コード push は可能。ただし本番反映はされない。
edge cache (www.kakomon-ai.jp) は古いバージョンを配信し続けるため、
致命的なバグがない限り待機が最善策。

所要時間: 最大 24 時間（自動解除）

### 手順B: billing issue の場合 — Vercel ダッシュボード確認（本人作業）

https://vercel.com/dashboard にアクセス（本人ログイン必須）
Settings > Billing から支払い情報・使用量を確認。
支払いが必要な場合は画面上で手続き。

所要時間: 15〜30 分

### 手順C: Vercel サポート連絡（policy review の場合）— 本人作業

1. https://vercel.com/support からサポートリクエスト送信
2. 件名: "Account deployment blocked — hobby plan"
3. 伝える内容:
   - アカウント名: kameking-lab (kameking-labs-projects チーム)
   - プロジェクト: ipa-quiz-site
   - 状況: 短期間に多数の PR merge により rate limit 超過
   - 確認内容: rate limit か ToS 違反か

所要時間: Vercel サポートの応答 24〜72 時間

### 手順D: 24〜48 時間の自然解除待機

API rate limit は滚動24時間窓でカウントされる。
急速 push を止めれば次の 24h 窓で残数が回復する。

所要時間: 24〜48 時間

---

## セクション3: 各手順の所要時間見積もり

- 手順A (rate limit 待機): 自動、最大 24h
- 手順B (billing 確認): 本人作業 15〜30 分
- 手順C (サポート連絡): 本人作業 30 分 + 応答待ち 24〜72h
- 手順D (自然解除): 24〜48h

現時点ではすでに解除済みのため、以上の手順は再発時に参照。

---

## セクション4: 解除後の確認方法

1. GitHub commit status 確認:
   ```
   gh api "repos/kameking-lab/ipa-quiz-site/commits/main/statuses" \
     --jq '.[0] | {state, description, created_at}'
   ```
   description が "Deployment has completed" かつ state が "success" であれば正常。

2. Vercel CLI での確認（本人ローカル）:
   ```
   vercel ls
   ```
   ipa-quiz-site の最新デプロイが Ready / Production であることを確認。

3. 本番 URL の動作確認:
   curl -I https://www.kakomon-ai.jp | grep "HTTP/"
   HTTP/2 200 であれば正常。

4. recovery workflow の確認:
   ```
   gh run list --workflow vercel-recovery.yml --limit 5
   ```
   conclusion が "success" であればデプロイ監視が正常動作中。

---

## セクション5: 連絡先・参照

- Vercel サポート: https://vercel.com/support
- Vercel ステータス: https://www.vercel-status.com/
- Vercel Hobby プラン制限: https://vercel.com/docs/limits/overview
- ブロック理由の KB: https://vercel.com/knowledge/why-is-my-account-deployment-blocked
- GitHub Actions ログ (recovery workflow 失敗時):
  - Run 25992623578 (payment_required / api-deployments-free-per-day)
  - Run 25992337797 (repoId missing in API payload — 修正済み)
  - Run 25991240576 (VERCEL_TOKEN 未登録 — 修正済み)
  - Run 25988928509 (VERCEL_TOKEN 未登録 + push 権限なし — 修正済み)

---

## タイムライン（参考）

2026-05-15〜16 早朝: PR #184〜#232 約 85 PR が急速マージ、
  各 PR が Vercel デプロイをトリガー → 100 builds/日 上限到達

2026-05-16T02:44 UTC: 最初の "Deployment rate limited" 発生

2026-05-17T04:00〜15:15: 日次リセット後も再 limit 到達 + dynamicParams=false build error

2026-05-17T13:31: VERCEL_TOKEN GitHub Secret 登録

2026-05-17T15:25〜15:31: PR #288 merge (dynamicParams revert) + recovery workflow 成功

2026-05-18 現在: 本番正常稼働中、アカウント active、softBlock なし
