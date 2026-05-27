# フェーズ13後 CLI 診断（社長作業の現状確認、SLACK除く）— 2026-05-26

main HEAD: `02b4370`（フェーズ13完了）。CLI から確認可能な範囲で社長作業5件の現状を診断した。
原則: 実装変更なし・読み取りのみ・値は出力せず存在のみ確認。

## 最重要結論（先に）

**KV（Upstash）が本番に未設定のため、フェーズ13で実装した「月5万円コスト自動停止」（CLAUDE.md §0）は
本番で実質的に発動しない。** `lib/ai/cost-guard.ts::checkMonthlyCostCap()` は KV 未設定時に
`{ allowed: true }`（degrade-open）を返す設計のため、上限チェックが常に通過する。レート制限も
in-memory（サーバレスインスタンス毎・非永続）に縮退する。→ **KV 設定が単独で最優先の社長作業。**

## Step 1: GitHub main ブランチ保護

- `gh api .../branches/main/protection` → **404 "Branch not protected"**。
- 保護ルールは未設定。フェーズ13で CI（e2e ワークフロー）に lint/test を組み込んだが、
  それらは main マージの required status check として**強制されていない**。直 push も技術的に可能。
- 推奨: `logs/branch-protection-recommendation-2026-05-26.md` 参照。

## Step 2: Vercel Deployment Protection

- `vercel whoami` → 認証済み（kameking-lab）。CLI から読み取り可能。
- 直接の Protection 設定は `vercel env ls` 等では露出しないが、実機 curl で間接確定:
  - `curl -I https://www.kakomon-ai.jp/` → **HTTP 200 を公開で返す**（Vercel SSO へのリダイレクトなし）。
  - `curl -I https://www.kakomon-ai.jp/admin` → **HTTP 401 + `WWW-Authenticate: Basic realm="Kakomon AI Admin"`**
    （アプリの middleware による Basic 認証。Vercel SSO ではない）。
- 結論: **Vercel Deployment Protection は OFF**（公開ページは誰でも 200、/admin はアプリ層で保護）。
  これは望ましい状態。**社長作業なし。**

## Step 3: 本番反映の確認（curl）

- **Server ヘッダ**: `Server: Vercel` が残存（root）。next.config の `Server: kakomon-ai` 上書きは
  Vercel edge が上書きしており**アプリ側からは消せない（プラットフォーム制約）**。実害は低（フィンガープリント要素のみ）。
- **/admin**: HTTP 401 即返却 ✓。実機レビューの「/admin 10秒ハング」は**サーバハングではなく Basic 認証
  ダイアログのブロッキング**であることを本番で実証（curl は即 401）。
- **AP令和7年春 問1**: 本番ページに「IPA 公式の正解はエです」が表示され、矛盾文
  「正解とされていますが／一般的な論理学の解釈では…」は**0件**。→ **本番でも修正済み（stale でない）**。
- **ブログ /blog/ip-nani-kara-benkyou**: 古い「2,398」が**2件残存**（「2,381」は0件）。
  main ソースに 2,398 は存在しないため、これは **CDN/デプロイ stale**（`X-Vercel-Cache: HIT`）。
  → 再デプロイ or 当該ルートのキャッシュ無効化で解消見込み。
- **/quickstart/ip**: 308 → `/` ✓（リダイレクト正常）。
- 学習カレンダー 24px の視覚確認は curl 不可 → Chrome agent 委譲。

本番反映済み: AP問1・/admin・リダイレクト。本番 stale: ブログ数値（要再デプロイ）。
解消不能（プラットフォーム）: Server ヘッダ。

## Step 4: Vercel KV 接続

- `vercel env ls`（全環境・名称のみ・値非表示）で確認:
  - `KV_REST_API_URL` : **ABSENT**
  - `KV_REST_API_TOKEN` : **ABSENT**
  - `UPSTASH_REDIS_REST_URL` : **ABSENT**
- コード（`lib/rate-limit/server.ts:34` `USE_KV = Boolean(KV_URL && KV_TOKEN)`、`lib/ai/cost-guard.ts`）は
  KV 未設定時に in-memory / degrade-open へ縮退する。
- 結論: **KV 未設定。** 影響:
  1. **コスト上限（§0）が本番で発動しない**（degrade-open）。
  2. レート制限がインスタンス毎の in-memory のみ（複数インスタンスをまたぐと緩い）。
  3. `recordAiCost` が no-op（月次累計が記録されない）。
- 設定手順: `logs/kv-setup-guide-2026-05-26.md` 参照。

## Step 5: SLACK_WEBHOOK_URL スキップの影響範囲

- `SLACK_WEBHOOK_URL` : **ABSENT**（社長判断でスキップ、確認済み）。
- 影響（詳細は `logs/slack-skip-impact-2026-05-26.md`）:
  - コスト上限通知（¥40k 警告 / ¥50k 緊急）→ Slack に飛ばず `console.error`（Vercel ログ）のみ。
    なお KV 未設定の現状では上限自体が発動しないため、通知有無以前に上限が機能していない。
  - フィードバック転送 → Slack に届かない。`/api/contact` は `console.log`（Vercel ログ）に残るのみ。
    `app/admin/feedback`（旧一覧 UI）はフェーズ13で削除済みのため、**届いたフィードバックを閲覧する常設 UI が無い**。
  - TURNSTILE は本番設定済み（Preview+Production）のため、問い合わせフォームのスパム保護は有効。

## 社長作業 最終リスト（優先度順）

1. 【最優先】**Upstash KV を本番に接続**（`KV_REST_API_URL` / `KV_REST_API_TOKEN`）。
   これが無いと §0 のコスト自動停止が発動せず、レート制限も非永続。自走運用の前提条件。
2. 【中】**ブログ等 stale ページの解消** — 再デプロイ or キャッシュ purge（AP問1は既に最新）。
3. 【中】**main ブランチ保護** — required status check に `e2e` を追加 + 直 push 禁止。
4. 【低・KV後】**SLACK_WEBHOOK_URL** — KV 設定後にコスト警告通知を機能させる/フィードバック受信のため。
   届いたフィードバックの閲覧手段（Slack or 簡易管理 UI 再追加）の方針判断も必要。
5. 【情報】Server ヘッダ `Vercel` — Vercel プラットフォーム制約。アプリで解消不可。許容 or Vercel サポート。
6. 【確認済】Vercel Deployment Protection は OFF（作業不要）。

## CLI で完結できる対策の提案

- ブランチ保護は `gh api -X PUT .../branches/main/protection` でも設定可能だが、トークン権限と
  不可逆性（必須チェック名の固定）を伴うため、社長の GitHub UI 操作を推奨（手順は recommendation ログ）。
- KV / SLACK は値（秘密）が必要なため CLI 自動設定は不可。社長が Vercel UI/CLI で登録。

## Chrome agent 委譲が必要な項目

- 学習カレンダーセルの実視覚 24px 確認（DOM 測定）。
- ブログ再デプロイ後の 2,398→正値の反映確認（視覚）。
- Vercel ダッシュボードでの Deployment Protection 明示確認（curl で OFF と判定済みだが UI 最終確認）。

## ipa-quiz-site の「真の自走運用◯」までの残課題

- **KV 未設定によりコスト安全装置が無効** = 暴走コスト防止が成立していない。自走運用の最大の穴。最優先で塞ぐ。
- ブランチ保護未設定 = CI をすり抜けた直 push が技術的に可能（現状は常に PR 経由だが強制すべき）。
- Slack 不在 = コスト警告・ユーザーフィードバックが人に届かない（Vercel ログ依存・揮発）。
- CDN stale = デプロイ後のキャッシュ revalidate 挙動の把握（一部静的/ISR ページが古い）。
- 既知の構造積み残し（フェーズ13総括参照）: cold TTFB、ブランド SEO、インデックス率、analytics 二重計測 等。
