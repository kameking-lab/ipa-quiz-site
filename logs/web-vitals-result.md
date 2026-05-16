# Core Web Vitals — Result (2026-05-16)

## PR

- **#204** perf(cwv): defer heavy client modules until needed
- マージ SHA: `4dd8c78` (origin/main)

## 適用した最適化 (本 PR 範囲)

1. `components/motivation/QuestionVideoButton.tsx`
   - 静的 import の `lib/motivation/video.ts` (Canvas + MediaRecorder, 268 行) を
     `handleGenerate` 内の `await import(...)` に変更。
   - `/q/[exam]/[year]/[section]/[q]` 全 1,595 静的ページの初回 JS から除外。
2. `components/motivation/SessionSummaryGate.tsx`
   - `SessionSummaryDialog` (radix Dialog + `SocialShare` + share util, 223 行 + 依存)
     を `next/dynamic` + `ssr:false` で遅延読込化。
   - `?done=1` 発火時のみチャンク要求。さらに `open && summary` ガードで未発火時は
     Dialog の空シェルすら描画しない。

## 既存最適化との関係

- PR #155 (`optimizePackageImports` 拡張) — 適用済 (lucide-react / radix / react-markdown / remark-gfm)。
- PR #162 (`DeferredLayoutWidgets` + preconnect) — 適用済 (Keyboard / AiQuota / Streak / Badge / Coupon / Welcome を `requestIdleCallback` 後にロード)。
- 本 PR — 個別重量コンポーネントのピンポイント遅延化として上記の続編。

## 期待効果 (定性)

- `/q/*` の First Load JS が `lib/motivation/video.ts` 相当 (gzip 後概ね 9KB 前後) 縮小。
  → LCP/INP/TBT が改善方向に。
- `/` の First Load JS が `SessionSummaryDialog` ＋ `SocialShare` ＋ `buildXShareUrl/buildLineShareUrl/buildOgImageUrl/buildSessionText` 相当縮小。
  → 通常閲覧 (=`?done=1` なし) の hydration コスト軽減。

## 計測手段の限界 (再掲)

- PSI API (匿名): `HTTP 429` quota exhausted (project_number:583797351490)
- CrUX API (匿名): `HTTP 403` API key required

両 API ともに API キー無しで叩いており、本 PR 期間中はクォータ回復しなかった。
ローカル `pnpm build` (NEXT_BUILD_WORKERS=4) は成功し 2,402 静的ページ生成完了を確認済。
本番反映後の数値検証は PSI クォータ回復時 (約 24 時間後) に追加 PR か運用タスクで実施予定。

## 反映確認

- `git log origin/main` HEAD: `4dd8c78` (Merge PR #204)
- e2e workflow: in_progress (PR マージ直後)
- Vercel: PR 直後のため preview/production deploy 進行中
