# 本番サイト実体検証レポート 2026-05-20

## 概要

- 検証日時: 2026-05-20 08:32〜08:52 JST
- main HEAD SHA: 36ca817e9ebd9a1eee0195264008ae6bf3c8a384
- 検証ツール: Playwright chromium headless (viewport: desktop 1440x900 / mobile 390x844)
- 検証者: Claude Sonnet 4.6 (claude-code)
- 対象URL: https://www.kakomon-ai.jp
- スクリーンショット保存先: logs/verification-2026-05-19/

---

## A. 主要ページ実体観察結果

全13ページとも HTTP 200 を返却。サイトはすべてのルートで正常稼働中。

### / (ホーム)
- HTTP: 200 / ロード: 7.9秒 (要注意: networkidle待ち)
- title: "IPA過去問×AI、無料で全機能 — 過去問AI"
- description: "IPA 情報処理技術者試験 全 13 区分・14,000問超を AI コパイロット付きで学べる無料サイト。登録不要・モバイル最適化。"
- H1: "どの試験を受けますか?"
- ナビ: 過去問AI / 学習進捗 / 推薦書籍 / 試験区分6本 + 全試験一覧 → / FAQ / 機能特集 / 用語集 / 学習トピック / ブログ / サイトマップ / プロジェクトについて / 公開ダッシュボード / 透明性レポート
- フッター: "出典: IPA 情報処理技術者試験（ipa.go.jp）" 記載あり。「教育貢献」「ボランティア有志」の文言は非掲載。
- AIコパイロットボタン: ホームページ上では汎用セレクタで検出されず。ただしB-1検証で起動確認済み。
- スクリーンショット: a-01-home-desktop.png / a-01-home-mobile.png

### /quiz
- HTTP: 200 / ロード: 2.5秒
- title/H1: ホームと同一（クイズページ未選択時はホームと同内容が表示）
- スクリーンショット: a-02-quiz-desktop.png / a-02-quiz-mobile.png

### /mock-exam
- HTTP: 200 / ロード: 3.4秒
- title: "模試モード — 本番形式・制限時間付き | 過去問AI"
- H1: "模試モード — 本番形式で実力チェック"
- JSON-LD type: LearningResource
- スクリーンショット: a-03-mock-exam-desktop.png / a-03-mock-exam-mobile.png

### /search
- HTTP: 200 / ロード: 2.8秒
- title: "問題検索 | 過去問AI"
- H1: "IPA過去問 横断検索"
- JSON-LD: なし (構造化データ未実装)
- スクリーンショット: a-04-search-desktop.png / a-04-search-mobile.png

### /success-stories
- HTTP: 200 / ロード: 11.5秒 (要注意: 極めて遅い)
- title: "IPA試験 合格体験記｜13区分の合格者ストーリー集 | 過去問AI"
- H1: "IPA試験 合格体験記"
- JSON-LD type: CollectionPage (additionalPropertyに "AI-generated fictional personas" の英文免責あり)
- スクリーンショット: a-05-success-stories-desktop.png / a-05-success-stories-mobile.png

### /study-plan
- HTTP: 200 / ロード: 1.6秒
- title: "自動学習スケジュール作成 | 過去問AI | 過去問AI" ← 「| 過去問AI」が重複
- H1: "自動学習スケジュール作成"
- JSON-LD: なし
- スクリーンショット: a-06-study-plan-desktop.png / a-06-study-plan-mobile.png

### /my-progress
- HTTP: 200 / ロード: 2.5秒
- title: "マイ進捗 | 過去問AI | 過去問AI" ← 「| 過去問AI」が重複
- H1: "マイ進捗"
- JSON-LD: なし
- スクリーンショット: a-07-my-progress-desktop.png / a-07-my-progress-mobile.png

### /bookmarks
- HTTP: 200 / ロード: 1.7秒
- title: "ブックマーク | 過去問AI | 過去問AI" ← 「| 過去問AI」が重複
- H1: "ブックマーク(0件)" (未ログイン/空状態表示、正常)
- JSON-LD: なし
- スクリーンショット: a-08-bookmarks-desktop.png / a-08-bookmarks-mobile.png

### /why-kakomon-ai
- HTTP: 200 / ロード: 4.3秒
- title: "過去問AI を選ぶ理由 ── IPA 試験対策サービス比較 | 過去問AI"
- H1: "過去問AI を選ぶ理由"
- JSON-LD types: FAQPage + WebPage + BreadcrumbList
- スクリーンショット: a-09-why-desktop.png / a-09-why-mobile.png

### /features
- HTTP: 200 / ロード: 2.1秒
- title: "機能特集 | 過去問AI"
- H1: "過去問AI の差別化機能"
- JSON-LD types: CollectionPage + BreadcrumbList
- スクリーンショット: a-10-features-desktop.png / a-10-features-mobile.png

### /features/copilot
- HTTP: 200 / ロード: 1.7秒
- title: "AI コパイロット ── RAG 引用つき対話で過去問を深掘る | 過去問AI"
- H1: "AI コパイロットの仕組みと使い方"
- JSON-LD types: Service + FAQPage + WebPage + BreadcrumbList
- スクリーンショット: a-11-features-copilot-desktop.png / a-11-features-copilot-mobile.png

### /features/mock-exam
- HTTP: 200 / ロード: 1.9秒
- title: "模試モード ── 本番想定の時間配分とスコア分析 | 過去問AI"
- H1: "模試モードの使い方と結果分析"
- JSON-LD types: Service + FAQPage + WebPage + BreadcrumbList
- スクリーンショット: a-12-features-mock-exam-desktop.png / a-12-features-mock-exam-mobile.png

### /features/study-plan
- HTTP: 200 / ロード: 2.3秒
- title: "学習計画 ── 受験日から逆算した週次タスク自動生成 | 過去問AI"
- H1: "学習計画の組み立て方"
- JSON-LD types: Service + FAQPage + WebPage + BreadcrumbList
- スクリーンショット: a-13-features-study-plan-desktop.png / a-13-features-study-plan-mobile.png

---

## B. 主要機能の実動作観察

### B-1. AIコパイロット

- 起動ボタン: ホームページ上でAI関連ボタンを検出・クリック成功
- クリック後パネル表示: 確認済み (copilotPanelAfterClick = true)
- クイックアクションプリセット: スクリプトのセレクタでは未検出（実装に別の属性が使われている可能性）
- ストリーミングUI (typing indicator 等): 汎用セレクタでは未検出。送信前の静的状態での観察のため、実際のストリーミング動作は送信後にのみ発生する可能性が高い
- 停止ボタン: 静的状態では未検出（ストリーミング中のみ出現と思われる）
- 入力欄: 特定のplaceholderセレクタでは未検出だが送信ボタンは検出済み
- スクリーンショット: b-01-copilot.png
- 総合判定: コパイロットUI自体は存在・起動可能。ストリーミング関連UIはメッセージ送信後の動的表示のため静的観察限界あり

### B-2. 模試 (/mock-exam)

- 試験区分テキスト検出: IP / FE / AP / SC / ST / NW / DB (7/13)
- 未検出区分: PM / SA / SM / AU / ES / SG ← 略称でなく日本語フルネームで表示されている可能性
- 結果分析表現: 「合格」「分野別」「分析」いずれもテキスト内で確認済み
- 履歴トラッキング: 「履歴」テキスト確認済み
- スクリーンショット: b-02-mock-exam.png

### B-3. 検索 (/search)

- 検索履歴UI: 「履歴」テキスト確認済み
- ソートモードセレクタ: DOMセレクタでは未検出（実装に異なる構造を使用している可能性）
- ハイライト機能: テキスト「ハイライト」未検出
- CTA(学習誘導): 「学習」+「始め/続け/おすすめ」の組み合わせ未検出
- スクリーンショット: b-03-search.png

### B-4. /my-progress

- ストリーク表示: 「ストリーク」または「連続」テキスト確認済み ✓
- バッジ表示: 「バッジ」テキスト未検出（英語 badge/Badge は存在する可能性あり）
- 日次目標: 「目標」テキスト確認済み ✓
- LocalStorage説明: 「ブラウザ」またはlocalStorage関連テキスト確認済み ✓
- スクリーンショット: b-04-my-progress.png

### B-5. /bookmarks

- カスタムタグUI: 「タグ」テキスト確認済み ✓
- 空状態メッセージ: 「まだ」「ありません」等の表現確認済み ✓
- H1が「ブックマーク(0件)」となっており、初訪問者にも分かりやすい空状態が表示されている
- スクリーンショット: b-05-bookmarks.png

### B-6. /why-kakomon-ai と /features/[slug]

- 差別化メッセージ: 「過去問道場との併用は可能ですか?」FAQ項目あり。「AI コパイロット」「午後 AI 採点」「PWA 対応」の差別化機能を明示 ✓
- 競合への言及: why-kakomon-aiのFAQに「過去問道場」を名指しで言及、競合批判ではなく補完関係として説明 ✓
- NG表現検出: 「絶対合格」「100%合格」「確実合格」「最強」「唯一無二」— 全ページで検出なし ✓
- スクリーンショット: b-06-why.png

### B-7. /success-stories

- 体験記リンク数: 77本検出（10件以上カウント可能 ✓）
- カードDOM構造: article/.story-card等のセレクタでは0件（異なるDOM構造を使用）
- AI生成ディスクレーマー: 確認済み ✓
- 実際の免責文: "AI生成の架空ペルソナによる学習ガイドです。"
- JSON-LDのadditionalProperty: "AI-generated fictional personas based on typical exam candidate patterns. Not based on real individuals."
- 個別記事リンク: 77本のリンクで存在確認 ✓
- スクリーンショット: b-07-success-stories.png

### B-8. モチベーションシステム

- ホームでのストリーク表示: テキスト「ストリーク」「連続」確認済み ✓
- ホームでの日次目標表示: 「目標」「今日」テキスト確認済み ✓
- 実装コミット(ac93ab0 feat(motivation))はmainにマージ済みで、UI上でも確認可能な状態

---

## C. 構造化データ実体

### ページ別JSON-LD type一覧

/ (ホーム): @graph内にWebSite + EducationalOrganization + ItemList
/mock-exam: LearningResource
/success-stories: CollectionPage + BreadcrumbList
/why-kakomon-ai: FAQPage + WebPage + BreadcrumbList
/features: CollectionPage + BreadcrumbList
/features/copilot: Service + FAQPage + WebPage + BreadcrumbList
/features/mock-exam: Service + FAQPage + WebPage + BreadcrumbList
/features/study-plan: Service + FAQPage + WebPage + BreadcrumbList
/blog: @graph あり（詳細typeは取得完了）
/q/ap/2017-autumn/am/q1 (サンプル問題URL): JSON-LD なし ← Quiz スキーマ未実装
/essays: JSON-LD なし ← 構造化データ未実装

### 欠落・要確認事項

1. 問題個別ページ (/q/[exam]/[年度]/[session]/[問番号]) に Quiz スキーマが存在しない。
   引継ぎ書は14,417問超を資産として挙げているが、検索エンジンへのリッチリザルト配信がない状態。
2. /essays ページにJSON-LD未実装。
3. /search / /study-plan / /my-progress / /bookmarks にJSON-LD未実装（ツール系ページなのでFAQPageやWebApplicationを付与する余地あり）。

---

## D. SEO・運用基盤

### D-1. robots.txt (全文)

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /auth/
Disallow: /account/
Disallow: /chat/share
Disallow: /api-docs
Disallow: /final-review-v3
Disallow: /strategy-discussion-v2
Disallow: /demo/

Host: https://www.kakomon-ai.jp
Sitemap: https://www.kakomon-ai.jp/sitemap.xml
```

- 「Stop Claude」等の混入: なし ✓
- Sitemap指定: あり ✓
- User-agent指定: あり (User-Agent: * — 大文字A)
- /final-review-v3 / /strategy-discussion-v2 は内部ドラフトと思われるパスがDisallow済み（適切）
- 補足: Host: ディレクティブは標準的なrobots.txtには含まれない場合が多いが、無害

### D-2. sitemap.xml URL集計

子サイトマップ: 9本

sitemap/main.xml: 52件
sitemap/exams.xml: 463件
sitemap/topics.xml: 71件
sitemap/blog.xml: 153件
sitemap/books.xml: 14件
sitemap/essays.xml: 24件
sitemap/success-stories.xml: 64件
sitemap/questions/0.xml: 10,000件
sitemap/questions/1.xml: 2,652件

合計: 13,493件

内訳:
- 問題URL: 12,652件 (questions/0 + questions/1)
- ブログ: 153件
- エッセイ: 24件
- 合格体験記: 64件
- 試験区分: 463件
- 学習トピック: 71件
- 参考書: 14件
- メイン: 52件

引継ぎ書記載 12,162+ との比較: 実際は12,652件 (490件超過、より多い) ✓

### D-3. PWA

- /manifest.webmanifest: HTTP 200
- name: "過去問AI"
- short_name: "過去問AI"
- start_url: "/"
- display: "standalone"
- icons: 3個
- /sw.js: HTTP 200 ✓
- PWA設定は正常稼働

### D-4. Vercel Analytics / PostHog

- PostHog: ホームHTMLに「posthog」文字列確認 ✓
- Vercel Insights (/_vercel/insights/script.js): HTML内で未検出
- Vercel Speed Insights (/_vercel/speed-insights/script.js): HTML内で未検出
- 補足: Vercel AnalyticsはNext.jsコンポーネントとしてバンドルされる場合、独立したscriptタグとして現れないことがある。実際にAnalyticsが機能しているかはVercelダッシュボードで確認推奨。

---

## E. NG確認・ブランド毀損リスク

### E-1. 誇大表現スキャン結果

スキャン対象: / / /why-kakomon-ai / /features / /mock-exam / /study-plan
スキャン語: 「絶対合格」「100%合格」「確実合格」「最強」「唯一無二」

検出結果: 全ページ・全語で検出なし ✓

### E-2. AI生成コンテンツ明示状況

/success-stories: 「AI生成の架空ペルソナによる学習ガイドです。」明示 ✓ また、JSON-LDのadditionalPropertyにも英文で"AI-generated fictional personas"を記載 ✓
/essays: 免責文の検出なし ✗ → 要対処
/blog: 「参考」テキストのみ検出（弱い） ← 明示的な「AI生成」表記が望ましい

### E-3. アフィリエイト明示

- ホームページのrel="sponsored"リンク: 0件
- ホームHTMLにAmazon associate tag (safeaisite22-22): 未検出
- 現時点でアフィリエイトリンクがホームには存在しない、またはrel=sponsoredが未付与
- 引継ぎ書記載のフェーズ4での実装前のため未着手と推測

---

## F. 引継ぎ書記載との突合

### 定量データ比較

| 引継ぎ書記載 | 実sitemap件数 | 判定 |
|---|---|---|
| 問題 14,417問 | 12,652件 | ✗ 1,765件不足 (87.8%) |
| blog 92本 | 153本 | ✓ (超過: 引継ぎ書の数字が古い可能性) |
| essays 100+本 | 24本 | ✗ 大幅不足 (24%) |
| success-stories 51本 | 64本 | ✓ (超過) |
| sitemap 12,162+件 | 12,652問URLのみで12,162超え | ✓ |

(注: 判定は定量の一致のみ。×は引継ぎ書の更新または実装追加が必要なことを示す)

### ページ存在確認

/why-kakomon-ai: HTTP 200 ✓
/features: HTTP 200 ✓
/features/copilot: HTTP 200 ✓
/features/mock-exam: HTTP 200 ✓
/features/study-plan: HTTP 200 ✓

全ハブページ正常稼働 ✓

### /admin/launch-monitoring 認証確認

HTTPステータス: 401 → Basic Auth 正常動作 ✓

---

## 結論サマリ (15-25行)

引継ぎ書記載と実態が概ね一致する点として、全主要ページのHTTP 200返却、PWA稼働(sw.js/manifest)、robots.txtの健全性(Stopワード汚染なし)、ハブページ5本の全存在確認、/admin Basic Auth動作、AIコパイロット起動可能、モチベーションシステム(ストリーク/目標)の稼働がある。

一致しない・乖離がある点として、問題数が引継ぎ書の14,417に対してsitemap実数は12,652(1,765件不足)、essaysが引継ぎ書の100+本に対して実sitemapは24本(76本以上未インデックス)がある。また、ブログ・合格体験記は引継ぎ書より多くインデックスされており、引継ぎ書の数字が古い可能性がある。

ユーザー視点で見えるリスクとして、まず/success-storiesの表示に11.5秒かかっており、モバイルユーザーが離脱するレベルの遅さがある。次に、/study-plan・/my-progress・/bookmarksのページタイトルに「| 過去問AI」が重複しており、検索結果での見栄えとSEO評価に悪影響がある。さらに、/essaysページにAI生成コンテンツの免責文がなく、/success-storiesで実施済みの対応が/essaysには未反映でブランドリスクがある。問題個別ページにQuizスキーマが未実装で、Googleのリッチリザルト(クイズカード)取得機会を逸失している。

---

## 推奨アクション (順序付き)

1) タイトル重複バグの修正 (優先度: 高・即時対応)
/study-plan・/my-progress・/bookmarksのmetaタイトルに「| 過去問AI」が二重付与されている。これはNext.jsのmetadataの親子設定の問題と思われる。検索エンジンのクロールキャッシュに入る前に修正すべき。具体的にはapp/(home)/layout.tsxまたは各ページのmetadata exportを確認し、重複する suffix を削除する。

2) /essaysページへのAI生成免責表示追加 (優先度: 高・ブランドリスク)
/success-storiesでは「AI生成の架空ペルソナによる学習ガイドです。」の明示および JSON-LD additionalPropertyへの機械可読な免責が実装済みだが、/essaysには未実装。同様の対応をessaysページとesssays個別記事ページに追加する。コンテンツが実際の受験者執筆でないことを読者に明示しなければ、信頼性問題につながる。

3) 問題個別ページへのQuizスキーマ実装 (優先度: 中・SEO機会)
サンプル確認URL(/q/ap/2017-autumn/am/q1)にJSON-LDが存在しなかった。schema.org/Quiz タイプを各問題ページに追加することで、Googleの教育系リッチリザルト掲載の機会が生まれる。14,000問超というコンテンツ資産を最大限活用するために、app/q/[exam]/[...slug]/page.tsxのgenerateMetadataまたはページ内にQuiz + BreadcrumbListスキーマを追加する。

4) /success-storiesと/の表示速度改善 (優先度: 中・UX)
/success-storiesは11.5秒、/は7.9秒のnetworkidleまでの時間を計測した。体験記ページについては大量のJSON-LD(20件分の記事データ)をページに全展開していることが原因の可能性がある。virtualizeやincremental loadingを検討する。またVercel Speed Insightsが検出されなかった点を確認し、実際のCWV(LCP等)をVercelダッシュボードで確認することを推奨する。

5) essays/blogのsitemap件数と引継ぎ書の同期 (優先度: 低・管理)
essaysがsitemapで24件(引継ぎ書100+)、blogが153件(引継ぎ書92)と乖離している。essaysについては未生成コンテンツの生成またはsitemapの動的更新ロジックを確認する。引継ぎ書の数字はいずれにせよ更新が必要。

---

## スクリーンショット一覧

logs/verification-2026-05-19/ 配下に以下を保存:

ページ観察 (desktop + mobile, 各2枚):
a-01-home-desktop.png / a-01-home-mobile.png
a-02-quiz-desktop.png / a-02-quiz-mobile.png
a-03-mock-exam-desktop.png / a-03-mock-exam-mobile.png
a-04-search-desktop.png / a-04-search-mobile.png
a-05-success-stories-desktop.png / a-05-success-stories-mobile.png
a-06-study-plan-desktop.png / a-06-study-plan-mobile.png
a-07-my-progress-desktop.png / a-07-my-progress-mobile.png
a-08-bookmarks-desktop.png / a-08-bookmarks-mobile.png
a-09-why-desktop.png / a-09-why-mobile.png
a-10-features-desktop.png / a-10-features-mobile.png
a-11-features-copilot-desktop.png / a-11-features-copilot-mobile.png
a-12-features-mock-exam-desktop.png / a-12-features-mock-exam-mobile.png
a-13-features-study-plan-desktop.png / a-13-features-study-plan-mobile.png

機能検証 (各1枚):
b-01-copilot.png
b-02-mock-exam.png
b-03-search.png
b-04-my-progress.png
b-05-bookmarks.png
b-06-why.png
b-07-success-stories.png

合計: 33枚

---

検証データ: logs/verification-2026-05-19/results.json
