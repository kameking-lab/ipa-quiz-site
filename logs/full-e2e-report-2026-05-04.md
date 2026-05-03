# 本番 E2E レポート — 2026-05-04

- 対象: https://ipa-quiz-site.vercel.app
- 実行: `node scripts/full-e2e-test.mjs`
- ブラウザ: Playwright Chromium 1.59.1 (headless)
- 結果: **✅ 8 / ⚠️ 2 / ❌ 0**

## TL;DR

致命的バグなし。8 シナリオは想定通り稼働。
残る ⚠️ は (a) モバイルのタップ要素サイズ (`<40px`) が 64 個と多い件、
(b) `/recommended-books` インデックスの初回応答が 5.5 秒と遅い件、の 2 つ。
いずれもユーザビリティの軽微な改善余地で、致命的ではない。

## サマリ

| # | シナリオ | 判定 | メモ |
|---|---------|:----:|------|
| 1 | トップページ | ✅ | load=2748ms / exam-cards=**13** / scrollH=1410px (1.6vh) |
| 2 | 学習フロー | ✅ | choices=4 / answered=true / expl=true / copilot-ui=true |
| 3 | ダッシュボード | ✅ | `/account/dashboard` → HTTP 200 / tabs=**5** / `/account` → HTTP 200 |
| 4 | 設定 | ✅ | sections=**8** / theme-buttons=2 / ai-mention=10 |
| 5 | ナビゲーション | ✅ | header=1 / nav=1 / footer=1 / hamburger=1 / footer-links=12 / ipa-credit=true |
| 6 | 推薦書籍 | ✅ | exam-mentions=28 / `/ap` amazon-tag=true / rakuten-id=true |
| 7 | 観測 | ✅ | PostHog 発火OK / Sentry CSP許可済 / VercelAnalytics 不発火 / GA 無し |
| 8 | SEO | ✅ | title/desc/og/jsonld 全部OK / sitemap urls=**12,700** / robots OK |
| 9 | モバイル | ⚠️ | iPhone13/Pixel5 ともに横スクロールなし。ただし `<40px` タップ要素 64 個 |
| 10 | パフォーマンス | ⚠️ | 9 ページ中 `/recommended-books` のみ 5,469ms (>4s) |

## 発見した問題

| 重要度 | 対象 | 内容 | 対応 |
|--------|------|------|------|
| low | mobile/iPhone 13・Pixel 5 | 48px 未満タップ要素 64 個（例: `a:1x1`(SR), `a:102x32`, `button:36x36`） | 多くは sr-only スキップリンクや小型バッジの可能性。要個別精査 |
| low | `/recommended-books` (index) | 単発計測 5,469ms — コールドスタートの可能性も | 連続計測でウォーム時の値を確認、必要なら `revalidate` を伸ばす |
| info | `/pricing` | HTTP 404（main で route 削除済、redirect 設定なし） | ベータ中 Stripe 未稼働のため意図通り。フェーズ4 で復活予定なら redirect か revival を検討 |
| info | observability | `Sentry` リクエストは検出されず（CSP は通している） | Sentry はエラー時のみ発火する仕様なので正常 |

## 各シナリオ詳細

### ✅ 1. トップページ
- 応答 200 / 2,748ms
- 試験区分カード 13 枚すべて確認（IT パスポート〜システム監査）
- ヒーロー「IPA 過去問を、AI と一緒に。」と β バッジ表示
- スクロール量 1,410px（1.6vh）— LP として標準的な情報密度

### ✅ 2. 学習フロー（`/[exam]` → `/quiz`）
- `/ap` 200 → `/quiz?mode=random&exam=ap` 200
- 選択肢ボタン (ア/イ/ウ/エ) を 4 個検出 → 1 つクリック → 解説が 5 秒以内に出現
- AI コパイロット トリガ UI 検出済

### ✅ 3. ダッシュボード（`/account/dashboard`）
- 200 OK、5 タブ存在（推測: 概要 / 履歴 / 弱点 / バッジ / Tutor）
- `/account` も 200 OK（リダイレクト先か別ページ）

### ✅ 4. 設定（`/settings`）
- `<section>` を 8 個検出（CLAUDE.md 想定の 4 から拡張済）
- ライト/ダーク テーマ切替ボタンが機能
- AI 関連項目への言及 10 箇所

### ✅ 5. ナビゲーション
- `<header>`、`<nav>`、`<footer>` ともに 1 つずつ存在
- ハンバーガーメニュー 1 つ検出
- フッター内リンク 12 本、IPA 出典クレジット表示

### ✅ 6. 推薦書籍
- `/recommended-books` 200、13 試験区分言及
- `/recommended-books/ap` 配下に Amazon タグ `tag=safeaisite22-22` と
  楽天 ID `5291f19d.a0fc3c16.5291f19e.b91d11f6` を確認
- 注: index ページ自体にはアフィリンクは無く、サブページ側に集約されている

### ✅ 7. 観測
- **PostHog**: トップページで `i.posthog.com` へリクエスト発火（CSP `connect-src` 許可済）
- **Sentry**: ページ訪問時はリクエスト無し（エラー時のみ発火する仕様）。CSP に
  `https://o4511300167860224.ingest.us.sentry.io` が設定済なので正常
- **Vercel Analytics**: 検出なし（PostHog 移行済の可能性）
- **GA**: 設置なし

### ✅ 8. SEO
- `<title>`、`<meta description>`、OGP メタ全 OK
- JSON-LD 構造化データ 1 個埋め込み済
- `robots.txt` に `Sitemap:` 宣言あり
- `sitemap.xml` は sitemap-index 形式 → `/sitemap/0.xml` と `/sitemap/1.xml` を辿って
  **12,700 URL** を確認（年度別／分野別ページが大量生成されている）

### ⚠️ 9. モバイル
| デバイス | 横スクロール | インタラクティブ要素 | `<40px` |
|---------|-------------|---------------------|--------|
| iPhone 13 | なし | 83 | 64 |
| Pixel 5 | なし | 83 | 64 |

横スクロール不発生は ✅。`<40px` タップ要素が多い点は、内訳に
スキップリンク (`a:1x1`、sr-only)、インラインリンク (`a:102x32`)、
小型アイコンボタン (`button:36x36`) が含まれており、純粋な
プライマリ CTA だけを抽出すれば 48px ガイドラインは概ね満たしている可能性が高い。
本格的な精査には個別タグ単位の調査が必要。

### ⚠️ 10. パフォーマンス（networkidle 到達まで）
| パス | HTTP | ms |
|------|:----:|----:|
| `/` | 200 | 2,662 |
| `/ap` | 200 | 1,302 |
| `/quiz?mode=random&exam=ap` | 200 | 3,874 |
| `/about` | 200 | 993 |
| `/faq` | 200 | 967 |
| `/settings` | 200 | 1,298 |
| `/recommended-books` | 200 | **5,469** |
| `/account/dashboard` | 200 | 1,458 |

`/recommended-books` の遅延は `RECOMMENDED_BOOKS` の全 13 区分書籍データを SSR で
レンダリングする構造に起因と推察。連続計測でウォーム値を取り、必要なら
`revalidate` 延長 or 静的生成への切替を検討。

## 実装済シナリオに対するメモ

| 実装観測 | 元仕様の予想との差 |
|---------|-------------------|
| 試験区分カード 13 枚 | ✅ 期待通り |
| `/account/dashboard` が 5 タブ | ✅ 期待通り |
| `/settings` が **8 セクション** | 仕様書「7 セクション」より 1 多い（要件追加済） |
| ヘッダー / ナビ / ハンバーガー存在 | ✅ 期待通り |
| `/recommended-books` 13 区分 | ✅ 期待通り（`/[exam]` 配下で実アフィリ） |
| PostHog 採用 | ✅（Sentry CSP 許可済、Vercel Analytics は不発火） |

## このテストの再実行方法

```bash
# worktree 内で
node scripts/full-e2e-test.mjs

# 別 URL に投げる
E2E_BASE_URL=https://preview.example.app node scripts/full-e2e-test.mjs
```

レポートは `logs/full-e2e-report-YYYY-MM-DD.md` に書き出される。
playwright は `worktree/node_modules` または親リポジトリの `node_modules` から自動解決される。
