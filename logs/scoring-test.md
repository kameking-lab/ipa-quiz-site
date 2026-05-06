# 過去問AI — SEO+UX 最終評価レポート

- **対象**: https://ipa-quiz-site.vercel.app
- **計測日時**: 2026-05-06 (JST)
- **計測対象コミット (production)**: `cdf4441` 系列（`fix(ts): gamification型エラー修正` 直後）
- **計測ツール**: `curl`（HTTPステータス・サイズ・TTFB・HTMLヘッダ抽出）/ サイトマップ XML 解析 / 仮想ペルソナによる UX 評価
- **収録データ規模 (sitemap実測)**: 12,722 URL（main 37 / exams 434 / topics 0 / blog 75 / books 14 / questions 12,162）

---

## 1. 定量スコアサマリ

### 1.1 総合スコア（10段階）

| 観点 | スコア | 一言評価 |
|---|---|---|
| **技術 SEO 基盤** | 8.5 / 10 | sitemap・robots・canonical・構造化データの主要要素は実装済み。topics.xml 空など軽微な穴あり |
| **メタデータ品質** | 7.5 / 10 | title/description は概ね固有。og 補完にムラあり、重複文字列も検出 |
| **構造化データ** | 8.0 / 10 | 問題ページが特に手厚い（QAPage + Quiz + Question + Answer + LearningResource + FAQPage）。mock-exam だけ抜け |
| **パフォーマンス（TTFB/HTML）** | 8.0 / 10 | TTFB 64–700ms 中心、HTML 100–130KB。blog 286KB が突出。問題ページは TTFB 64ms と非常に速い |
| **モバイル/PWA** | 9.0 / 10 | viewport / theme-color / manifest / skip-link すべて完備 |
| **セキュリティ/HTTP ヘッダ** | 9.5 / 10 | CSP / HSTS / X-Frame-Options / COOP / Permissions-Policy 全実装 |
| **内部リンク構造** | 7.5 / 10 | ページあたり 23–107 ユニーク内部リンク。深層問題ページからの導線豊富 |
| **404 / エラー UX** | 5.5 / 10 | HTTP 404 は正しく返るが、内容は site default（問題リカバリー導線なし） |
| **UX 全体（10名平均NPS）** | **+20（promoter 2, passive 8, detractor 0）** | プロダクトコア（爆速・AI解説・無料）は高評価、課金導線とオンボーディングに改善余地。集計詳細は §4 末尾参照 |

### 1.2 計測サマリ表（10ページ実測）

| # | ページ | URL | HTTP | HTMLサイズ | TTFB | Title長 | H1 | JSON-LD blocks | og:image | robots meta |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ホーム | `/` | 200 | 84.3 KB | 81 ms | 28字 | ✅ | 1 (5型) | ✅ | 暗黙(index) |
| 2 | ITパスポート | `/ip` | 200 | 119.5 KB | 554 ms | 31字 | ✅ | 1 (5型) | ✅ (動的OG) | 暗黙 |
| 3 | 応用情報技術者 | `/ap` | 200 | 104.2 KB | 598 ms | 33字 | ✅ | 1 (5型) | ✅ | 暗黙 |
| 4 | 基本情報技術者 | `/fe` | 200 | 119.7 KB | 621 ms | 32字 | ✅ | 1 (5型) | ✅ | 暗黙 |
| 5 | 情報処理安全確保支援士 | `/sc` | 200 | 132.0 KB | 598 ms | 35字 | ✅ | 1 (5型) | ✅ | 暗黙 |
| 6 | ネットワークスペシャリスト | `/nw` | 200 | 118.0 KB | 684 ms | 35字 | ✅ | 1 (5型) | ✅ | 暗黙 |
| 7a | 問題詳細 (要望URL) | `/q/ip/2024-spring/am/q1` | **404** | 25.7 KB | 5,546 ms | site default | ❌ | 0 | ❌ | n/a |
| 7b | 問題詳細 (代替) | `/q/ip/2024-cbt/am/q1` | 200 | 127.9 KB | 64 ms | 41字 | ✅ | 1 (10型) | ✅ (専用OG画像) | `index, follow` |
| 8 | 推薦書籍 (IP) | `/recommended-books/ip` | 200 | 119.0 KB | 585 ms | **53字 / 重複あり** | ✅ | 1 (Product) | ✅ | 暗黙 |
| 9 | ブログ | `/blog` | 200 | **285.8 KB** | 645 ms | 36字 | ✅ | 1 (Blog) | ❌ | 暗黙 |
| 10 | 模試モード | `/mock-exam` | 200 | 34.5 KB | 272 ms | 27字 | ❌ | **0** | site default | 暗黙 |

> 7a の 404 はユーザ要望 URL の試験区分が「IP は spring 開催なし（CBT）」のため。この事実自体は正しい挙動だが、404 ページ側にリカバリ導線がない点は UX 課題。

### 1.3 サイトマップ・robots 実測

```
robots.txt           : 200 OK / 728B / Disallow: /api /admin /auth /account /chat/share 他10件
                       Sitemap: 計 6 ファイル明示（sitemap.xml + 5 サブ）
sitemap.xml          : 200 OK / sitemapindex / 7 サブ参照
sitemap/main.xml     :  37 URL  ← トップ + 機能 + キーワード + 法務
sitemap/exams.xml    : 434 URL  ← 13区分 × (一覧 + 年度別 + topic別)
sitemap/topics.xml   :   0 URL  ← ⚠ 空。生成バグ or 設計上意図的か要確認
sitemap/blog.xml     :  75 URL  ← 記事
sitemap/books.xml    :  14 URL  ← 試験別 + 横断
sitemap/questions/0.xml : 10,000 URL  ← 個別問題
sitemap/questions/1.xml :  2,162 URL  ← 同上 (overflow)
合計: 12,722 URL
```

### 1.4 セキュリティ/HTTP ヘッダ（全ページ共通）

| ヘッダ | 値 | 評価 |
|---|---|---|
| `Content-Security-Policy` | default-src 'self' / script-src 厳格 / connect-src 限定列挙 | ✅ 厳しめ |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | ✅ HSTS preload |
| `X-Frame-Options` | `DENY` | ✅ |
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `Cross-Origin-Opener-Policy` | `same-origin` | ✅ |
| `Cross-Origin-Resource-Policy` | `same-site` | ✅ |
| `Permissions-Policy` | camera/mic/geo/payment/topics 全 deny | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Cache-Control` | `public, max-age=0, must-revalidate` (HTML) | ✅ ETag 併用 |
| `X-Vercel-Cache` | `HIT` (大半) | ✅ Edge cache 効いている |

セキュリティヘッダは現代の SaaS として最上位水準。

---

## 2. ページ別詳細

### 2.1 ホーム `/` (84KB, TTFB 81ms)
- **Title**: `IPA過去問×AI、無料で全機能 — 過去問AI`（28字、最適長）
- **Description**: 91字。「全 13 区分・12,000 問超」「登録不要」「モバイル最適化」を盛り込み高品質
- **JSON-LD**: WebSite + SearchAction (`/quiz?mode=random&exam={search_term_string}`) + Organization (sameAs: X, note) + ItemList (13区分)
- **H1**: 「どの試験を受けますか?」（行動を促す疑問形・優秀）
- **OGP**: 完全（type=website, image=動的生成 `/opengraph-image`, twitter card 完備, locale ja_JP）
- **内部リンク**: 50ユニーク（学習進捗・推薦書籍・FAQ・機能特集・用語集・学習トピック・ブログ・サイトマップ・プロジェクトについて 等）
- ✅ **総合: A**

### 2.2 区分トップ `/ip` `/ap` `/fe` `/sc` `/nw` (104–132KB, TTFB 554–684ms)
- 5ページとも同じテンプレで構造化:
  - Title: `<試験名> 過去問一覧・AI解説 | 過去問AI`（最適化済み）
  - Description: 「全N問収録」を含む（具体数字でCTR向上に寄与）
  - JSON-LD: `CollectionPage` + `BreadcrumbList` + `EducationalOccupationalCredential` + `Organization` + `ListItem`
  - OG: `/api/og?type=exam&...` で動的生成（試験別に専用画像）
  - H1: 「<試験名> 過去問」+ 説明文
  - H2: 「学習ロードマップ」「IPA 公式リソース」「AI 解説の作り方と限界」← 信頼性訴求セクションが全試験に展開済み
- TTFB が 550–700ms 帯。Edge cache HIT 後は速いが初回は重め（テーブル生成等の SSG/ISR コスト）
- 内部リンク 34–63ユニーク
- ✅ **総合: A−**（内部リンクとロードマップ情報が手厚い。TTFB やや遅め）

### 2.3 問題詳細 `/q/ip/2024-cbt/am/q1` (128KB, TTFB 64ms)
- **TTFB 64ms = 全ページ最速**。SSG + Edge cache が完璧に効いている
- Title: `令和6年度 CBT ITパスポート 午前 問1 ストラテジ 解説 | 過去問AI` — 試験名・年度・形式・問番号・分野を全包含、検索意図を完全カバー
- Description: 問題本文の冒頭＋解説冒頭をプレビュー（リッチスニペット最適化済）
- **JSON-LD が突出**: `QAPage` + `Question` + `Answer` (acceptedAnswer + suggestedAnswer 全選択肢) + `Quiz` + `LearningResource` + `FAQPage` + `BreadcrumbList` + `WebSite` + `Organization`
  - これは Google の Q&A リッチリザルト・教育コンテンツ強調表示の両方を狙った最適形。競合「過去問道場」を上回る構造化レベル
- 専用 og:image (`/q/ip/2024-cbt/am/q1/opengraph-image`) — Twitter シェア時の見栄えが個別に最適化
- `<meta name="robots" content="index, follow">` 明示（10ページ中ここだけ明示）
- H2 構成: 選択肢 / 解説 / AI と深掘り / 共有 / ショート動画 / 関連する問題 ← UI/AI/シェア/関連回遊が一画面に集約
- ✅ **総合: A+**

### 2.4 推薦書籍 `/recommended-books/ip` (119KB, TTFB 585ms)
- ⚠ **Title 重複バグ**: `【ITパスポート】おすすめ問題集 | 過去問AI | 過去問AI`
  - layout 側の `templates.title` と page 側の固定 title が二重結合している疑い
- Description は具体的＆魅力的（「教科書・過去問・午後対策・論文事例まで段階別」「最短学習ルート」）
- JSON-LD: `Product` + `Brand` + `ItemList` + `BreadcrumbList` + `Person` — Google ショッピング/Product リッチ枠を狙えている
- アフィリ収益最重要ページなので Title 修正の優先度は高
- ⚠ **総合: B**（コンテンツは A だが Title 重複が減点）

### 2.5 ブログ `/blog` (286KB, TTFB 645ms)
- ⚠ HTML サイズが 286KB と他ページの 2.5 倍。75 記事を一覧表示しているため
- Title / Description / JSON-LD (Blog + BlogPosting × 75) は良好
- ⚠ **og:image 欠落** — SNS シェア時に画像が出ない
- 内部リンク 107 と最多（記事個別への動線は十分）
- 改善: 一覧をページネーションまたは「もっと見る」遅延表示で 100KB 程度に削れる
- ⚠ **総合: B**

### 2.6 模試モード `/mock-exam` (34KB, TTFB 272ms)
- ⚠ **HTML 34KB = ほぼ完全クライアントレンダー**（サーバーで描画されるのは header/footer のみ）
- ⚠ **H1 タグなし**（H1 → H6 すべてゼロ）
- ⚠ **JSON-LD なし**
- ⚠ **og:title が site default** にフォールバック (「過去問AI — AIネイティブ過去問学習」）
  - page metadata の `title.default` 構造に対して `openGraph.title` を別途オーバーライドし忘れている
- 9b67e07 で「JS 16MB→720KB」最適化済みとあるが、SEO 面の最適化はまだ
- ⚠ **総合: C+**

### 2.7 404 ページ `/q/ip/2024-spring/am/q1`
- HTTP 404 は正しく返る (SEO 上◎)
- が、レンダリング内容は site default（試験区分一覧へのサジェスト等のリカバリ導線なし）
- 5.5秒の TTFB は 404 ジェネリックパスで cold path に乗っている可能性
- ⚠ **総合: C**

---

## 3. 構造化データ検証結果

### 3.1 実装カバレッジマトリクス

| ページ種別 | WebSite | Organization | BreadcrumbList | CollectionPage | Question/Quiz | Product | Blog | 総合 |
|---|---|---|---|---|---|---|---|---|
| ホーム | ✅+SearchAction | ✅ | — | — | — | — | — | A |
| 区分トップ × 5 | ✅ | ✅ | ✅ | ✅+EducationalCredential | — | — | — | A |
| 問題詳細 | ✅ | ✅ | ✅ | — | ✅✅✅ (Q+A+Quiz+LearningResource+FAQ) | — | — | A+ |
| 推薦書籍 | — | — | ✅ | — | — | ✅+Brand+ItemList | — | A |
| ブログ | — | ✅ | ✅ | — | — | — | ✅+BlogPosting×75 | A |
| 模試モード | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | F |

### 3.2 リッチリザルト適合可能性
- **Q&A リッチリザルト**: 問題詳細ページが完全準拠（Question + acceptedAnswer + suggestedAnswer）。Search Console 経由で実装監視推奨
- **Quiz リッチリザルト**: 同ページに Quiz スキーマも併設。教育系のリッチ表示を二面的に狙えている
- **FAQ リッチリザルト**: 問題詳細に FAQPage も含むが、現状 Google は Q&A と競合する可能性（要 Search Console 観察）
- **Breadcrumb リッチリザルト**: 全主要ページに実装。SERP のパンくず表示が安定する
- **Product リッチリザルト**: 推薦書籍ページで Product schema（Brand 付）→ Amazon/Rakuten 連携書籍の SERP リッチ枠を狙える
- **Sitelinks SearchBox**: ホームの SearchAction 実装済み

### 3.3 検出された不備
1. ❌ `mock-exam` ページに構造化データが一切なし（ページ自体の SEO 価値が低くなっている）
2. ⚠ topics サイトマップが 0 URL（生成失敗の可能性）
3. ⚠ `recommended-books/ip` の Title 二重結合
4. ⚠ blog ページ og:image 欠落

---

## 4. UX レビュー（仮想ペルソナ 10 名）

> いずれもプロダクトの仕様・本番 UI 観察に基づく仮想評価。実在の人物・企業ではない。

### #1 完全初学者（IP志望）22歳・文系新卒
- **第一印象**: 「どの試験を受けますか?」のH1が親切。試験区分のグラデーションカードが視覚的に楽しい
- **致命的問題**: 13区分が並んでいて「自分はどれを受けるべきか」迷う。/ip にたどり着いても「学習ロードマップ」が長い文章で読み気が萎える
- **改善 TOP3**: (1) 「ITに自信なし → IP」「開発志望 → FE/AP」など30秒診断 (2) 学習ロードマップを折りたたみ式 (3) スマホで AI コパイロットの「無制限対話」が広告と被り混乱しない動線
- **NPS**: 8

### #2 中級者（AP志望）28歳・SE3年目
- **第一印象**: 過去問道場を使っていたが「AI 解説で深掘り」が即時的に試せて感動
- **致命的問題**: 1 問あたりの「関連する問題」が表示されているが、間違えた問題を後でまとめて復習する動線が浅い
- **改善 TOP3**: (1) 「間違えた問題のみ」モードへ深い導線 (2) 模試モード のヘッダ動線（現状 mock-exam 直下から即始まる感じが薄い） (3) 学習進捗を年度・分野ヒートマップで可視化
- **NPS**: 9

### #3 上級者（SC志望）35歳・セキュリティエンジニア
- **第一印象**: SC 区分も全 1,735 問収録は競合との差別化点。AI解説の品質チェック目線で問題ページを開く
- **致命的問題**: 問題ページに `index, follow` 明示はあるが、解説の出典 PDF へのリンクがフッタ近くで気付きにくい。技術者ほど「IPA 原典」を即確認したい
- **改善 TOP3**: (1) 解説冒頭に「IPA 公式 PDF を開く」CTA (2) AI 解説に対し「異議申し立て・修正提案」ボタン (3) 午後問題が見当たらない（高度試験は午前 II のみ表示？） — フェーズ3 公開時の整理
- **NPS**: 7

### #4 モバイル特化（電車通勤30分・iPhone 15 mini）
- **第一印象**: 84KB のホーム HTML / TTFB 81ms = 山手線でも一瞬で表示。skip-link、theme-color、PWA 対応を即評価
- **致命的問題**: AI コパイロットのボトムシートが片手で開きにくい時がある（要観察）。問題ページ 128KB は LTE で1秒前後
- **改善 TOP3**: (1) AI コパイロットのスワイプ起動 (2) ホームから問題ページまで 1 タップ復帰の「直前の問題に戻る」 (3) PWA インストール促進バナー（control可能で）
- **NPS**: 9

### #5 デスクトップ重視（社内研修担当）45歳
- **第一印象**: 1080p で全画面が広く感じる（max-width が狭め）。複数ウィンドウ並べた研修利用がしやすい
- **致命的問題**: 模試モードの結果画面で受験者間比較や CSV エクスポートがない（CLAUDE.md でフェーズ2扱い）
- **改善 TOP3**: (1) 試験別「弱点分野ヒートマップ」をPDF/CSV エクスポート (2) チーム/組織アカウント (3) 結果共有用の OG 自動生成（既に動的OG基盤あり、流用可）
- **NPS**: 7

### #6 SEOプロ視点（インハウス SEO）
- **第一印象**: 12,722 URL のサイトマップ、構造化データ 5–10 タイプ実装、CSP/HSTS まで揃って「Lighthouse Best Practices 100点級」
- **致命的問題**: (a) `topics.xml` 0 URL (b) `recommended-books/ip` Title 二重 (c) blog og:image 欠落 (d) mock-exam 構造化データ皆無 (e) `<meta name="robots">` が問題ページ以外で暗黙
- **改善 TOP3**: (1) topics.xml 復活 + topic ハブページ 充実で「IPA + 用語名」ロングテール獲得 (2) recommended-books の Title バグ修正 (3) ブログ記事各単体に og:image を専用生成（既存 `/api/og?type=...` を流用）
- **NPS**: 8

### #7 教育SaaS CEO視点（競合プロダクトCEO）
- **第一印象**: 過去問道場の人力解説資産に対して、AI を「常駐・無制限」にした体験密度は本当に脅威。価格 300円/月は破壊的
- **致命的問題**: 月商を稼ぐ「課金導線」が薄い。プレミアム転換 CTA がトップ階層から数タップ
- **改善 TOP3**: (1) AI コパイロット 30回/日リミット到達時の「あと N 回でリセット」表示 + 即課金 CTA (2) ランキング/段級ゲーミフィケーションで連続学習を煽り、解約率を下げる (3) 法人向け「組織アカウント」（高単価帯確保）
- **NPS**: 8

### #8 グロース担当視点（AARRR）
- **第一印象**: Acquisition の SEO 基盤は現時点で十分。Activation（初回問題到達）も悪くない。Retention の習慣化導線が弱い
- **致命的問題**: 学習履歴が localStorage のみ → 端末乗り換えで消滅 → Retention の天井になる
- **改善 TOP3**: (1) 軽い無料サインアップ（Magic Link）で履歴クラウド保存（フェーズ2 既定） (2) 連続学習日数バッジ + 通知 (3) 模試結果のシェア OG → Viral 流入経路
- **NPS**: 7

### #9 個人開発者視点
- **第一印象**: Next.js 16 + RSC + Tailwind v4、Sentry + PostHog、Vercel + Edge cache の構成が美しい。228コミット/branch 運用＋多数ワークツリーの開発体制も興味深い
- **致命的問題**: 機能 (`features/`)、レビュー (`final-review-v3` 等)、ストラテジ (`strategy-discussion-*`) など 「内部用なのに本番にビルドされている」ページが多数
- **改善 TOP3**: (1) 内部用ページは `next.config` の `excludeFiles` か Vercel 環境変数で production ビルドから除外 (2) Vercel Analytics で実 LCP/CLS/INP を計測 (3) Edge Function 化できる軽量ルート（OG・sitemap）の徹底
- **NPS**: 8

### #10 CTO視点
- **第一印象**: 12,000 問規模を Next.js + ISR で捌きつつ、CSP まで厳格に決めている安定感。LLM 抽象（`getProvider()`）と localStorage 抽象でロックイン回避
- **致命的問題**: コスト試算上、無料 30 req/日 × ユーザ数 が線形に Gemini API コストを生む。ユーザ数が伸びる前にハード上限/SLO/予算アラート設計が必要
- **改善 TOP3**: (1) `/api/admin/usage` ダッシュボード優先実装（CLAUDE.md フェーズ4 → 前倒し） (2) Gemini API キー が漏れた場合の即時 rotation 手順整備 (3) Sentry + PostHog のサンプリング率最適化（コスト見合い）
- **NPS**: 8

### NPS 集計
- Promoters (9-10): 2名 — #2 (9), #4 (9)
- Passives (7-8): 8名 — #1 (8), #3 (7), #5 (7), #6 (8), #7 (8), #8 (7), #9 (8), #10 (8)
- Detractors (0-6): 0名
- **NPS = (2/10)×100 − (0/10)×100 = +20**

---

## 5. 改善優先度マトリクス

### Quick Win（1–2日で実装可・効果大）
| # | 項目 | 影響 | 工数 |
|---|---|---|---|
| Q1 | `recommended-books/ip` Title 二重結合の修正（layout の `templates.title` 競合） | アフィリ収益ページの SERP CTR | XS |
| Q2 | `mock-exam` ページに H1 + 構造化データ (`Quiz` + `EducationalOccupationalCredential`) 追加 | 模試需要キーワード獲得 | S |
| Q3 | blog ページ og:image を `/api/og?type=blog` で動的生成 | SNS シェア時のCTR | S |
| Q4 | 404 ページに「サジェスト試験区分一覧」「人気問題TOP10」を表示 | 直帰率改善 | S |
| Q5 | 全ページに `<meta name="robots">` を明示宣言（暗黙→明示） | クローラ判定の安定化 | XS |
| Q6 | `topics.xml` の 0 URL バグ調査・修正 | トピックページのインデックス | S |

### Strategic（1–4週で実装・収益直結）
| # | 項目 | 影響 | 工数 |
|---|---|---|---|
| S1 | プレミアム転換 CTA の強化（30回到達時のモーダル + リセットカウントダウン） | 直接ARPU | M |
| S2 | 学習履歴クラウド同期（Magic Link 認証 + Supabase） | Retention 30%+ | L |
| S3 | 連続学習日数バッジ + Push 通知（PWA） | DAU 維持 | M |
| S4 | 模試結果の OG 動的生成 + ワンタップ X シェア | Viral 流入 | M |
| S5 | 法人向け「組織アカウント」プラン（月3,000円/10名） | 高 ARPU | L |
| S6 | `/api/admin/usage` ダッシュボード（コスト監視） | 持続可能性 | M |
| S7 | 午後 AI 採点（AP 優先） | 競合未着手領域の独占 | XL |

### Avoid / 様子見
| # | 項目 | 理由 |
|---|---|---|
| A1 | デフォルト LLM を Gemini Flash → Flash-Lite 以外への切替 | CLAUDE.md 第10章「承認必須」。コスト構造を崩す |
| A2 | プレミアム価格 300円 → 値上げ | ユーザ獲得最優先フェーズ。LTV 最適化はサインアップ実装後 |
| A3 | 内部レビューページ（`final-review-*`, `strategy-discussion-*`）の即時削除 | アクセスログでの利用確認後に整理 |
| A4 | `/q` URL スキームの再設計 | sitemap 12k URL がキャッシュ済み。canonical で十分 |
| A5 | hreflang 追加（en など） | コンテンツが日本語のみ。先行してコンテンツ国際化が必要 |

---

## 6. 総合判定

### 6.1 SEO面
**評価: A−（90/100）**

- **強み**: 12,722 URL の網羅性・問題詳細ページの構造化データ密度・セキュリティヘッダ・モバイル/PWA対応・動的OG生成基盤——いずれも「IPA 系過去問サイト No.1 候補」の実装水準。技術 SEO で競合「過去問道場」の旧式実装を確実に上回る
- **弱み**: 5件の Quick Win（Title 重複・mock-exam・blog OG・404 UX・topics.xml）。いずれも 1 日で潰せる
- **6か月予測**: Quick Win 全消化＋ブログ週 2 本ペースで「IPA + 各キーワード」のロングテール獲得が現実的。問題詳細 12,000 URL のインデックス進捗を Search Console で監視するのが要

### 6.2 UX面
**評価: B+（NPS +20）**

- **強み**: ゼロ遷移クイズ・AI コパイロット常駐・無料無制限・PWA・ダークモード・スキップリンク——CLAUDE.md ビジョン (A)(B) は本番で機能している
- **弱み**: (1) 課金 CTA の弱さ (2) 学習履歴の localStorage 限界 (3) オンボーディング診断の不在
- **競合差**: 過去問道場との UX 比較で、モバイル・AI体験では明確に勝ち。網羅性（午後・論文）と中堅ユーザ向け復習動線で詰めれば総合勝ち目あり

### 6.3 月商100万達成現実性
**評価: 12–18か月で達成圏内、6か月では困難**

**前提算出**:
- 月商 100 万円 ÷ プレミアム 300 円 = **3,333 名の有料会員**が必要
- 業界平均無料→有料転換率 2% と仮定 → **MAU 約 17 万人**が必要

**現状ストック試算**:
- IPA 受験者の延べ年間規模: 約 80–100 万人（IP/SG/FE/AP 中心）
- 過去問学習サイト利用率を仮に 30% とすると潜在 MAU プール: 24–30 万人
- 競合「過去問道場」のシェアを楽観 50% 奪取 → 12–15 万 MAU
- 17 万 MAU は「楽観値の上限近く」=可能だが余裕はない

**達成シナリオ**:
1. **Quick Win 6 件即消化**（1 週間）→ SEO 機会損失止血
2. **学習履歴クラウド同期 + プレミアム CTA 強化**（4 週間）→ 転換率 2% → 3% に底上げ
3. **ブログ + キーワードハブ ページを週 2–3 本ペース**で 6 か月積み上げ → MAU 5万→ 12万
4. **午後 AI 採点（AP）公開**（フェーズ3）→ 独占領域で MAU+30%
5. **法人プラン 3,000円/組織** で MRR ベースを安定化（高単価で 3,333 名要件を緩和）

**結論**: SEO/UX 基盤はすでに「月商 100 万級プロダクトに耐える品質」にある。残るのは ① 課金導線 ② 学習履歴の永続化 ③ コンテンツ継続供給の 3 点。**6 か月で月商 30–50 万、12–18 か月で月商 100 万** が現実的なベースライン。

---

## 付録: レポート末尾

- 計測手法: `curl -sI` および `curl -s` による HTML 取得。HTML 解析は `grep -oE` でタグ単位抽出
- ペルソナ評価は実装観察ベースの定性評価（Lighthouse 等の実機計測ではない）
- 本ページは内部検討用・noindex（検索エンジン非登録）
