# 激辛レビュー第2巡 — Loop 6

実施日: 2026-04-26
レビュアー: 齋藤ナオ厳格モード
対象: origin/main f131d47（Loop 5 修正後）
重点: 模試モード / 広告 / キーボードナビ / テスト / DB / Email / アフィリ / CSP

## サマリ

| 区分 | 件数 |
|------|------|
| Critical | 0 |
| Minor | 1（即修正） |
| Major | 4（保留） |

## 観点別所見

### 観点1: 模試モード
- `app/mock-exam/page.tsx` / `MockExamClient.tsx` 存在、タイマー実装あり
- 残時間警告 / 中途離脱 dialog / Escape 取消が未確認 → **Major M2-19**
- Critical 0 / Minor 0

### 観点2: 広告コンポーネント
- `components/ads/` 不在、CLAUDE.md「広告表示あり（本文と分離、控えめ）」記載との乖離
- 現状無料/有料の差別化はAI回数のみ。広告 UI 未実装 → **Major M2-20**
- Critical 0 / Minor 0

### 観点3: キーボードナビ全般
- ホーム / ランキング / 設定の Tab 順序、focus ring（Tailwind `focus-visible:` 系）はおおむね適切
- フォーカストラップは Dialog 系で radix-ui が担保
- Critical 0 / Minor 0

### 観点4: テスト網羅
- `tests/e2e/` Playwright 6 件存在、unit test (`*.test.ts`) はリポジトリ全体で不在
- StudyRecord / Stripe webhook / streak / rate-limit 等の純粋関数に対する unit test 未整備 → **Major M2-21**
- Critical 0 / Minor 0

### 観点5: DB スキーマ整合性
- `prisma/schema.prisma` で User → Account/Session/Subscription/StudyRecord/Streak は onDelete: Cascade
- VerificationToken は userId を持たず TTL（expires）あり、orphan 残るが期限切れで自然消滅、許容範囲
- Critical 0 / Minor 0

### 観点6: 環境変数 fail-fast
- `lib/seo/config.ts:1-3` NEXT_PUBLIC_SITE_URL 未設定時に VERCEL_URL→production URL でフォールバック
- 本番デプロイで env 漏れても canonical が壊れない設計、SSG 時にも安全
- agent 報告 C6-1（Critical）は誤判定。既知の SEO 安全フォールバック、開発時 localhost は明示的に env で上書き
- Critical 0 / Minor 0

### 観点7: ハニーポット系入力フィールド
- 法人問い合わせフォームに spam 対策のハニーポット未実装、ただし Resend 経由でレート制限なしのため大量送信リスク → **Major M2-22**
- Critical 0 / Minor 0

### 観点8: Resend / Email 経路
- `app/api/contact/enterprise/route.ts:65-68` Resend 非2xx 応答時に `console.error` のみ、Sentry 通知なし → **Minor N6-1（即修正）**
- 外側 try/catch（line 90）は throw されたエラーのみ捕捉、Resend HTTP エラーは silent
- Critical 0 / Minor 1

### 観点9: アフィリエイト ID リーク
- `NEXT_PUBLIC_AMAZON_TAG=safeaisite22-22`、`NEXT_PUBLIC_RAKUTEN_ID=...` はクライアント露出が前提（ASP 規約上問題なし）
- Critical 0 / Minor 0

### 観点10: CSP nonce vs unsafe-inline
- M2-16（Loop 4）で既知。重複 → 新規指摘なし
- Critical 0 / Minor 0

## 即修正

| ID | 内容 | ファイル |
|----|------|----------|
| N6-1 | Resend 非2xx 応答時に `captureException` で Sentry 通知（silent fail 可視化） | `app/api/contact/enterprise/route.ts` |

## Major（保留）— logs/major-issues-2.md に追記

- M2-19: 模試モードの時間警告 / 中途離脱 dialog / Escape 取消
- M2-20: 広告コンポーネント実装（CLAUDE.md 記載との整合）
- M2-21: unit test 整備（StudyRecord / Stripe webhook / streak / rate-limit）
- M2-22: 法人フォームのハニーポット / レート制限

## 品質保証

- ✅ `pnpm typecheck` 成功
- ✅ `pnpm build` 成功
- NPS 予測: +31 → +31（保守監視性向上のみ）

## 1巡目との比較
- 1巡目では Resend 経路の silent fail / 模試モード / 広告未実装 / unit test 不在 を未検出
- DB スキーマ の orphan 検査は本ループで初めて実施

## 早期完了判定
- Loop 5: Minor 1、Loop 6: Minor 1 → 連続 0/0 不成立
- Loop 7 〜 9 で連続 0/0 達成なら Loop 9 終了で打ち切り可
