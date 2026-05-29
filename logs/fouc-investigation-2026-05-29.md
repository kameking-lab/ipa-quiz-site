# 初回ナビゲーション FOUC の調査と判定 (2026-05-29)

対象: フェーズ14 第11致命傷（最後）/ 実機激辛レビュー第3弾。/q/* 初回アクセスで 2–3 秒 unstyled HTML（Tailwind 未適用）、stylesheets 配列に CORS 制限 CSS の兆候、という報告。
ブランチ: `docs/fouc-already-resolved` / 基点 main HEAD: `4cf4841`

## 結論: ケースY（FOUC 発生せず／構造的に発生し得ない）。修正不要。
過大修正の罠を回避し、コード変更なし。退行防止の E2E ガードのみ追加。

## 厳密調査の根拠（推測でなく実測）
### 1. 本番 /q の <head> CSS 配信（curl 実測）
- `<link rel="stylesheet" href="/_next/static/chunks/*.css" data-precedence="next">` が **2枚**。いずれも:
  - **同一オリジン**（/_next/static/…）＝ CORS 制限なし。
  - `media` 属性なし＝**レンダリングブロッキング**（print-then-swap の非同期読込ではない）。
  - `data-precedence="next"`＝Next App Router が <head> に管理配置する標準のブロッキング CSS。
- インライン `<style>` は0、preload as=style は0、CSS への crossorigin 属性は0（同一オリジンなので不要）。
- フォントは next/font（Geist, display:"swap"）で woff2 を crossorigin preload（適切）。

### 2. CSS チャンクの HTTP ヘッダ（curl -I 実測）
- `HTTP/1.1 200`、`Content-Type: text/css; charset=utf-8`、`Cache-Control: public,max-age=31536000,immutable`、`Access-Control-Allow-Origin: *`（むしろ CORS 許容）、`X-Content-Type-Options: nosniff`。
- → CSS は正しく配信され、CORS でブロックされていない。

### 3. Next 設定（next.config.ts）
- `experimental` は `optimizePackageImports` のみ。**`optimizeCss`／`cssChunking`／`inlineCss` は未使用**（これら、特に optimizeCss の CSS インライナは設定次第で FOUC を起こす既知要因 → オフで安全）。

### 4. 非同期 CSS／JS 注入の不在
- `media="print"` swap、`loadCSS`、`document.createElement("link")` での stylesheet 注入、`insertRule` 等は app/layout・components に**存在しない**。CSS は `import "./globals.css"`（→ ブロッキング CSS チャンクにコンパイル）のみ。

### 5. ローカル本番ビルドでの再現確認（pnpm build）
- prerendered `.next/server/app/q/ap/2024-autumn/am/q1.html`: stylesheet 2枚・data-precedence 2・`media="print"` 0・inline `<style>` 0。本番と同一構造。

## なぜ「2–3秒 unstyled」が報告されたか（解釈）
レンダリングブロッキングの同一オリジン CSS が <head> にある以上、ブラウザは CSS 読込まで初回ペイントを抑止する＝**構造的に FOUC は起きない**。報告された現象は次のいずれかと考えられる:
- (a) デプロイ伝播の一過性: 新デプロイの HTML が、CDN エッジ未配置の CSS チャンクを参照した瞬間の素HTML表示（CDN 追従後に自然解消、コード問題ではない）。
- (b) 誤診: ブラウザの `document.styleSheets` 配列に映る第三者（PostHog/Vercel/Turnstile 等）の CORS 制限エントリを見て FOUC 原因と推定。だがこれらは `cssRules` 読取が制限されるだけで**スタイル適用はされ、レンダリングをブロックしない**＝FOUC を起こさない。
Chrome agent の直近検証「unstyled HTML 観測されず」とも整合。

## 過大修正回避の判断
critical CSS インライン化（案A）・CSS chunk 戦略変更（案B）・crossorigin 変更（案D）は、いずれも現状（同一オリジン・ブロッキング・CORS 許容・FOUC 無し）に対して不要で、むしろ optimizeCss/インライン化は新たな FOUC・退行リスクを持ち込む。よって**コード変更せず**、退行防止ガードのみ追加する。

## テスト追加件数（+2、コード変更なし）
- `tests/e2e/fouc-css-delivery.spec.ts`（Playwright 2件 ×3回緑）:
  1. /q の <head> が **同一オリジン（/_next/static/）・data-precedence・media!=print** のレンダリングブロッキング stylesheet を持つ（非同期 swap・CORS CSS が混入したら fail）。
  2. 初回レンダリングで Tailwind 適用済み（main の `max-w-3xl` → computed max-width = "768px"、未適用なら "none"）＋ styleSheets が1枚以上アタッチ。
- 将来 optimizeCss/inlineCss 有効化・非同期 CSS 化・クロスオリジン CSS 化が入れば、このガードが FOUC リスクを検知する。

## 副作用範囲
コード変更なし（アプリ挙動・スタイル・bundle・ビルド時間に影響ゼロ）。追加は E2E 1ファイルとログのみ。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 32ファイル205全緑（変化なし）/ build 成功。
- e2e: fouc-css-delivery 2件 ×3回緑。フルe2e 175件中169 passed・5 skipped。1 fail は task1 由来 home-cta-click「最早クリック」の並列負荷 flake（本変更はコード非変更・home 非関与・単体緑・CI retries:1 で吸収）。

## UX/SEO 影響
現状で FOUC は無く、CSS はレンダリングブロッキングで LCP/CLS を悪化させない（CSS 待ちで初回ペイントを抑止＝unstyled flash なし）。本タスクは現状維持＋退行ガード。

## 次のステップ
本番反映後、Chrome agent で高頻度フレーム取得による実機検証推奨（/q/* 初回ナビで unstyled フレームが無いこと）。デプロイ直後の一過性（CDN 伝播）を疑う場合は、デプロイ完了後しばらく置いてからの再観測を推奨。

## フェーズ14 致命傷シリーズ完了メモ
本件で実機激辛レビュー第3弾起点の致命傷対応（CTA座標クリック→/admin 503→ブログ問題数→/quiz canonical→/q その場回答→Q&A schema→SERPスニペット→バッジトースト→MobileBottomNav重複→数字キー嘘表記→FOUC）が一巡。残課題の申し送り: home-cta-click「最早クリック」E2E の並列 flake（task5〜11 で頻発）と copilot-rag flake の安定化を別マイクロタスクで推奨。
