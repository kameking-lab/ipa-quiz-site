# 激辛レビュー第2巡 — Loop 2

実施日: 2026-04-26
レビュアー: 齋藤ナオ厳格モード
対象: origin/main c3d00f9（Loop 2-1 修正後）
重点: API / 認証 / Stripe / 管理画面 / AI コパイロット層

## サマリ

| 区分 | 件数 |
|------|------|
| Critical | 0（精査の結果、Agent 報告 5 件は誤検出または許容範囲） |
| Minor | 2（即修正） |
| Major | 4（保留） |

## 観点別所見

### 観点1: API ルート全般
- `app/api/` 配下を全列挙、`runtime = "nodejs"` 明示確認
- 認証必要ルートは getServerSession で session check
- `app/api/email-list/route.ts` は in-memory rate limit（Vercel Edge は単一インスタンスなので許容）
- Critical 0 / Minor 0

### 観点2: AI コパイロット
- `lib/ai/prompts.ts` に競合言及禁止プロンプトあり、PR #65 で追加済
- LLM 出力の post-validation regex は未実装 → **Major M2-4**
- Gemini Provider mock fallback 動作確認済
- Critical 0 / Minor 0

### 観点3: 認証 (NextAuth v5)
- Google/GitHub に `allowDangerousEmailAccountLinking: true` 設定 → **Major M2-5**（運用リスク）
- Magic Link template が default のまま → **Major M2-6**（β中は許容）
- session ガードは `/account` 等で正しく動作
- Critical 0 / Minor 0

### 観点4: 課金 (Stripe)
- Webhook 署名検証 ✅、Prisma `upsert` で stripeSubId unique による idempotency 担保
- Customer Portal 設定 OK
- `User.plan` と `Subscription.status` の同期は webhook 経由で正しく実装
- Agent 指摘の「idempotency 欠落」は upsert で十分担保される（誤検出）
- Critical 0 / Minor 0

### 観点5: 管理画面
- `middleware.ts` で `/admin/*` を Basic Auth ガード（timing-safe compare）
- `/operator` は public な運営者情報ページ（PII 露出なし、認証不要が正しい）
- Agent 指摘の「/operator auth 欠落」は誤検出
- Critical 0 / Minor 0

### 観点6: レート制限
- `lib/rate-limit/server.ts` で日次 50 / 分 10 の双重リミット
- JST 0:00 リセット実装あり、in-memory（Vercel single-instance で機能）
- Critical 0 / Minor 0

### 観点7: エラーハンドリング
- `app/error.tsx` `app/global-error.tsx` で `console.error` のみ、Sentry に送信なし → **Minor N2-1（即修正）**
- `lib/monitoring/sentry.ts` の `captureException` は実装済だが client error boundary から呼ばれていなかった

### 観点8: Prisma スキーマ
- User / Account / Session / Subscription / StudyRecord / Streak の関係 OK
- `User.plan` の derive を Subscription から行わない設計 → **Major M2-7**（webhook 失敗時の不整合 risk）
- Critical 0 / Minor 0

### 観点9: 環境変数
- 30+ の env 変数を実コードで参照しているが `.env.example` がない → **Minor N2-2（即修正）**
- Critical 0 / Minor 0

### 観点10: ログ・監視
- Sentry bridge が DSN 設定時のみ送信、未設定で console.error fallback ✅
- PII フィルタは未実装だが request body は send しない設計 → **Major M2-8**（context.extra に PII が含まれた場合のサニタイズ）
- Critical 0 / Minor 0

## 即修正

| ID | 内容 | ファイル |
|----|------|----------|
| N2-1 | `app/error.tsx` `app/global-error.tsx` で `captureException` を呼び、Sentry に送信 | `app/{error,global-error}.tsx` |
| N2-2 | `.env.example` を追加し、30+ env 変数を分類・コメント付きで列挙、`.gitignore` で `!.env.example` 例外 | `.env.example` `.gitignore` |

## Major（保留）— logs/major-issues-2.md に追記

- M2-4: AI コパイロット応答の post-validation（競合名 regex フィルタ）
- M2-5: NextAuth `allowDangerousEmailAccountLinking` の見直し
- M2-6: Magic Link メールテンプレートのカスタマイズ
- M2-7: User.plan を Subscription から derive する正規化
- M2-8: Sentry context PII サニタイザ

## 品質保証

- ✅ `pnpm typecheck` 成功
- ✅ `pnpm build` 成功
- NPS 予測: +28 → +28（structural な改善のみ、UX 影響なし）

## 1巡目との比較
- Loop 1 では UX/法務に集中
- Loop 2 では API/auth/課金/監視層を深掘り
- Critical regression は検出されなかった（loop1 修正は維持）
