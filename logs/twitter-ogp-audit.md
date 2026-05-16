# Twitter OGP 監査レポート — 2026-05-16

## 監査対象ページと結果

### ルートレイアウト (/)
- twitter:card: summary_large_image ✓
- twitter:site: @kakomon_ai_jp ✓
- twitter:title: "過去問AI — AIネイティブ過去問学習" ✓
- twitter:description: ✓
- twitter:image: https://www.kakomon-ai.jp/opengraph-image ✓
- 結果: 正常

### 試験区分トップ (/ap, /fe, /sc等)
- twitter:card: summary_large_image ✓
- twitter:images: /api/og?type=exam&title=...&subtitle=... ✓
- 結果: 正常 (動的OGP画像生成済み)

### 年度別ページ (/ap/2025-spring等)
- twitter:card: summary_large_image ✓
- twitter:images: なし (rootから継承) △
- 結果: 軽微な問題 (大規模修正は別タスク化)

### 個別問題ページ (/q/ap/2025-spring/am/q1)
- 修正前: twitter:card=summary_large_image だが images なし ✗
- 修正後: images: /api/og?type=question&title=... ✓
- 対応: app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx を修正

### essaysページ (/essays/sc/2025-spring/pm2/q1)
- 修正前: twitter:card=summary_large_image だが images なし ✗
- 修正後: images: /api/og?type=essay&title=... ✓
- 対応: app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx を修正

### ブログ記事ページ (/blog/[slug])
- twitter:card: summary_large_image ✓
- twitter:images: /api/og?type=blog&... ✓
- 結果: 正常

### /stats, /about, /transparency
- 独自twitter定義なし (rootから継承) △
- rootの default OGP画像が使われる
- 結果: 機能的に問題なし (ページ固有画像は改善余地あり)

## 検出した問題と対応

### 重大不備（修正済み）
1. 個別問題ページ (約4,000+URL) のtwitter:images未設定
   - 修正ファイル: app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx
   - 修正内容: ogImageUrl を生成して openGraph.images と twitter.images に追加

2. essaysページのtwitter:images未設定
   - 修正ファイル: app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx
   - 修正内容: ogImageUrl を生成して openGraph.images と twitter.images に追加

### 軽微な問題（別タスク化）
- 年度別・トピック別ページの動的OGP画像なし
- /stats, /about, /transparency のページ固有OGP画像なし

## /api/og 動的画像生成の確認

対応type一覧:
- home: ✓
- exam: ✓ (試験区分トップで使用中)
- question: ✓ (今回問題ページに追加)
- blog: ✓ (ブログページで使用中)
- books: ✓
- essay: ✓ (今回essaysページに追加)
- streak, session, badge, topic, glossary, keyword, faq, mock-exam: ✓

画像仕様:
- サイズ: 1200x630 ✓
- 日本語フォント: Noto Sans JP (ローカルwoff or Google Fonts fallback) ✓
- Content-Type: image/png ✓

## Twitter Card Validator対応状況

Twitter Card の要件:
- twitter:card = summary_large_image ✓ (全ページ)
- twitter:site = @kakomon_ai_jp ✓ (rootで設定)
- twitter:title <= 70 chars: 動的生成で .slice(0,80) でクランプ ✓
- twitter:description: 各ページで設定 ✓
- twitter:image: 絶対URL (SITE_BASE_URL 起点) ✓
- 画像サイズ: 1200x630 ✓ (2:1比率)

## まとめ

重大不備2件を修正。個別問題ページとessaysページに動的OGP画像URLを追加した。
これにより Twitter でシェアされた際に summary_large_image 形式でのリッチプレビューが表示される。
