# Core Web Vitals — Baseline (2026-05-16)

## Measurement status

PSI API: HTTP 429 (daily quota exhausted, anonymous access).
CrUX API: HTTP 403 (API key required).

両方の field data 取得手段が直接利用できないため、本 PR では **コード静的解析ベース** で
既知の Core Web Vitals アンチパターンを洗い出し、ターゲット最適化を適用する。
本番反映後、quota 回復時に PSI を再計測して `logs/web-vitals-result.md` に記録予定。

## 対象ページ

- `/` (home)
- `/[exam]` (13区分 — 中でも `/ap`, `/sc`)
- `/q/[exam]/[year]/[section]/[q]` (クイズページ — 主力 SEO ランディング)
- `/essays/sc/[year]/[section]/[q]` (午後論述)
- `/stats` (recharts ダッシュボード)
- `/blog/[slug]`

## 既にマージ済みの最適化 (#155, #162)

- next/font Geist (display:swap)
- AVIF/WebP image format, 30 日 cache
- optimizePackageImports: lucide-react, radix, react-markdown, remark-gfm
- `DeferredLayoutWidgets` で requestIdleCallback 後に dynamic import
- preconnect: fonts.googleapis / fonts.gstatic / dns-prefetch posthog

## 本 PR で追加調査する観点

1. SiteHeader / トップページに残る非クリティカル JS
2. /stats の recharts (重量級ライブラリ) を dynamic import 化したか
3. 各 page.tsx で next/image 未利用の `<img>` 残存
4. 巨大 ALL_QUESTIONS データを home layout で import している影響
5. PostHog の loading 戦略 (現状 PostHogProvider の中身次第)
6. dynamic import に lazy boundary が無い箇所
