# Rich Results Gap Analysis — 過去問AI

Generated: 2026-05-17
Branch: feat/rich-results-validation

## 調査方法

本番 https://www.kakomon-ai.jp を curl で取得し、`<script type="application/ld+json">` を全ページ抽出。
Google Rich Results Test の要件と schema.org 仕様を照合。

---

## Phase 1: 本番 JSON-LD 実態

| URL | スキーマ種別（実測） |
|-----|---------------------|
| / | WebSite, Organization(EducationalOrganization), ItemList |
| /ap〜/au（13区分） | CollectionPage, EducationalOccupationalCredential, BreadcrumbList |
| /ap/2024-autumn | CollectionPage, BreadcrumbList |
| /q/ap/2024-autumn/am/q1〜q20 | QAPage, Quiz, LearningResource, FAQPage, BreadcrumbList, Organization |
| /blog（一覧） | Blog + BlogPosting×n |
| /blog/[slug] | Article, BreadcrumbList ※LearningResourceはコード有り・本番未反映 |
| /topics | CollectionPage, BreadcrumbList, WebSite |
| /about | なし |
| /stats | なし |
| /transparency | なし |
| /privacy | なし |

注: 試験ページ(Course/HowTo)・ブログ記事(LearningResource)はコードに実装済みだが
本番は古いビルドのためデプロイ済み分に未反映。

---

## Phase 2: ギャップ一覧

### ERROR（必須欠落・リッチリザルト非対象化のリスク）

#### E-1: Organization.logo が文字列 URL（ホームページ app/page.tsx:80）
- 現状: `logo: "https://www.kakomon-ai.jp/icon-512.svg"` (文字列)
- 要件: `logo: {"@type": "ImageObject", "url": "...", "width": 512, "height": 512}`
- 影響: Google の Organization リッチリザルト・ナレッジパネルでロゴが表示されない
- 修正: ImageObject に変換し width/height を明示

#### E-2: Course.offers 未設定（試験ページ app/[exam]/page.tsx）
- 現状: Course ノードに offers なし
- 要件: Google Course rich result に `offers` (price:0, priceCurrency:"JPY") 推奨
- 影響: 無料コースとして SERP に表示されない可能性
- 修正: `offers: [{@type:"Offer", price:0, priceCurrency:"JPY", availability:"https://schema.org/InStock", url: absUrl}]` を追加

#### E-3: Course.courseCode 未設定（試験ページ app/[exam]/page.tsx）
- 現状: courseCode なし
- 要件: schema.org Course では courseCode を推奨
- 修正: `courseCode: code.toUpperCase()` を追加

#### E-4: @id の trailing-slash 不一致（全ページ）
- 現状: ホームページは `${SITE_BASE_URL}/#website` `/` 付き
  試験・問題ページは `${SITE_BASE_URL}#website` `/` なし
- 影響: Google が別エンティティと認識する可能性
- 修正: 全ページで `${SITE_BASE_URL}/#website` `/` 付きに統一

### WARNING（推奨フィールド欠落）

#### W-1: LearningResource.audience 未設定（問題ページ・ブログ記事）
- 現状: audience フィールドなし
- 推奨: `{"@type": "EducationalAudience", "educationalRole": "student"}`
- 修正: 問題ページ(app/q/.../page.tsx:275) と blog記事(app/blog/[slug]/page.tsx:140) に追加

#### W-2: educationalLevel の大文字小文字不統一
- 現状: 試験ページ CredentialNode は "professional"（小文字）
  問題ページ LearningResource/Quiz は "Professional"（大文字）
- 修正: 全箇所 "Professional" に統一

#### W-3: Article.publisher.logo に width/height 未設定（ブログ記事）
- 現状: `logo: {"@type": "ImageObject", "url": "..."}` (width/height なし)
- 推奨: width/height 明示
- 修正: `width: 512, height: 512` を追加（app/blog/[slug]/page.tsx:129）

#### W-4: LearningResource(blog).educationalLevel 未設定
- 現状: educationalLevel なし
- 推奨: 試験記事は "Professional"、IP/SG 初学者向けは "Beginner"
- 修正: post.exam を見て出し分け (app/blog/[slug]/page.tsx:139)

#### W-5: WebSite.potentialAction.target URL 不整合
- 現状: `/quiz?mode=random&exam={search_term_string}` (試験コードを渡す URL)
- 問題: SearchAction は `{search_term_string}` にキーワードを期待するが
  当サイトに検索ページは存在しない
- 修正: quiz モードを試験絞り込みとして維持するか、target を削除する
  → 今回は `entryPoint` 型に変更して"URL template"として残す

#### W-6: About ページに JSON-LD なし（app/about/page.tsx）
- 追加すべき: Organization + WebPage
- 修正: generateMetadata に JSON-LD を追加

#### W-7: Stats/Transparency/Privacy ページに JSON-LD なし
- 追加すべき: WebPage のみ
- 修正: 各ページで最小限の WebPage スキーマを追加

#### W-8: Quiz.educationalAlignment 未設定（問題ページ）
- 推奨: `educationalAlignment: [{alignmentType:"educationalSubject", targetName: q.category}]`
- 修正: Quiz ノードに追加

---

## Phase 3: 実装方針

### 変更対象ファイル

1. `app/page.tsx` — Organization.logo を ImageObject 化、@id trailing-slash 統一
2. `app/[exam]/page.tsx` — Course に courseCode/offers 追加、educationalLevel 大文字統一、@id 統一
3. `app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx` — LearningResource に audience 追加、educationalLevel 統一、@id 統一、Quiz に educationalAlignment 追加
4. `app/blog/[slug]/page.tsx` — publisher.logo に width/height、LearningResource に audience/educationalLevel 追加
5. `app/about/page.tsx` — Organization + WebPage JSON-LD 追加
6. `app/stats/page.tsx` — WebPage JSON-LD 追加
7. `app/transparency/page.tsx` — WebPage JSON-LD 追加
8. `app/privacy/page.tsx` — WebPage JSON-LD 追加

### 捏造禁止のルール（遵守事項）

- 実際の SNS アカウント URL がない場合は sameAs に追加しない
- `aggregateRating` は実際の評価データなしに追加しない
- `numberOfStudents` など実測不明の数値は追加しない
- `dateModified` は実際のコンテンツ更新日を使用、ハードコード禁止

---

## Before/After サマリー（修正後）

| ページ種別 | Before | After |
|-----------|--------|-------|
| ホーム | WebSite, Org(ロゴ文字列), ItemList | WebSite, Org(ロゴImageObject), ItemList |
| 試験トップ | CollectionPage, Credential, BreadcrumbList | + Course(courseCode/offers), HowTo |
| 問題ページ | QAPage, Quiz, LR, FAQPage, BC, Org | + LR audience/alignment, Org logo |
| ブログ記事 | Article, BreadcrumbList | + LR(audience/educationalLevel), publisher logo width/height |
| About | なし | Organization + WebPage |
| Stats | なし | WebPage |
| Transparency | なし | WebPage |
| Privacy | なし | WebPage |
