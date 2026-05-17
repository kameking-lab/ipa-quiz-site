# Soft-404 fix — STOP report

Generated: 2026-05-18 (claude/confident-fermi-4d61d8 / Opus 4.7)
Branch: fix/soft-404-blog-q

## 概要

タスクの前提が誤っていることが production curl 検証で判明したため、停止条件
「/essays/* の実装パターンが特殊で /blog, /q に流用困難 → 別アプローチ検討で
停止報告」に該当する。実装を進める前に承認を求める。

## 検証事実

### /essays/* は「参考実装」になっていない

タスクの記述:
- `/essays/sc/9999-autumn/q99` → HTTP 404 ✅
- `/essays/au/2030-spring/q1` → HTTP 404 ✅

curl 検証で確認:
- `/essays/sc/9999-autumn/q99` (3 segments) → 404 — 動的ルートに一致しない URL
  なので Next.js のフレームワーク level 404 (notFound() 関係なし)
- `/essays/sc/9999-autumn/pm2/q99` (4 segments、ルートに一致) → **200** soft-404
- `/essays/au/2030-spring/pm2/q1` (4 segments、ルートに一致) → **200** soft-404

タスクで挙げられた `/essays/sc/9999-autumn/q99` 等の URL は `[exam]/[yearSeason]/
[section]/[qnum]` の 4 セグメント動的ルートに一致しない 3 セグメントなので、
notFound() を経由せず Next.js が URL routing 段階で 404 を返している。

`/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:108` は notFound() を
呼ぶが、`/blog` と `/q` と同じく **HTTP 200** で soft-404 を返している。

### 既存実装の状況

全ての該当 page.tsx は既に `notFound()` 呼び出しを実装済み:

- app/blog/[slug]/page.tsx:88 — `if (!post) notFound();`
- app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:169 — `notFound();`
- app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:174 — `if (q.needsReview) notFound();`
- app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:108 — `if (!question) notFound();`

しかし production では 3 ルート全てが HTTP 200 を返している (soft-404)。

### 「動く」パターンの共通点

このリポジトリで proper 404 を返している動的ルートは全て `dynamicParams=false`
を設定:

- app/[exam]/page.tsx:63 `dynamicParams = false`
- app/[exam]/[yearSeason]/page.tsx:25 `dynamicParams = false`
- app/[exam]/afternoon/page.tsx:30 `dynamicParams = false`
- app/[exam]/afternoon/[year]/[season]/page.tsx:36 `dynamicParams = false`
- app/[exam]/topic/[topicSlug]/page.tsx:20 `dynamicParams = false`
- app/topics/[slug]/page.tsx:20 `dynamicParams = false`
- app/keywords/[keyword]/page.tsx:15 `dynamicParams = false`
- app/features/[slug]/page.tsx:12 `dynamicParams = false`
- app/recommended-books/[exam]/page.tsx:23 `dynamicParams = false`

これらの URL は production で正しく 404 を返す。

### 過去の経緯

- 141d9c4 `fix(blog): return real 404 for nonexistent slugs (dynamicParams=false)` — 修正導入
- e297b05 `fix(essays): return real 404 for nonexistent essay paths (dynamicParams=false)` — 修正導入
- 4d126ce `fix(quiz): return real 404 for nonexistent/needsReview question URLs` — 修正導入
- 11ffa3e `Revert "fix(blog): return real 404 for nonexistent slugs (dynamicParams=false)"` — 3 件まとめて revert

3 件の commit message は明示的に「notFound() in Next.js 16 + Turbopack does not
reliably propagate as HTTP 404 for dynamic params」と記述し、proven pattern
として `dynamicParams=false` を採用。

revert の理由は logs/vercel-deploy-resolution.md に詳述されているが、
結論は「ローカル Windows 環境では vercel build が常に NEXT_MISSING_LAMBDA で
失敗するため、ローカルでの仮説検証は不可能」「**仮説: 未確定 (Indeterminate)**」。
つまり「dynamicParams=false が build を破壊した」は **未確定の仮説** であり、
revert は予防的措置だった可能性が高い。

## 矛盾するタスク制約

タスクは以下を同時に要求している:

- (A) /blog/*, /q/* の soft-404 を proper 404 に変換
- (B) dynamicParams=false は再導入禁止 (build 破壊リスク)
- (C) /essays/* の動作実装を参考にする

しかし:

- (C) の前提が誤り — /essays/* の動的詳細ページも soft-404 を返している
- (A) を満たす proven pattern は (B) で禁止されている dynamicParams=false
  のみ
- 別アプローチ (RouteHandler / middleware で 404 status を強制) は本リポジトリ
  には存在せず、Next.js 16 で確実に動作する保証がない

## 検討した代替案 (いずれも未検証)

1. **middleware で /blog, /q の URL に対し data 存在チェック → 404 response**
   - middleware.ts は edge runtime で動く。data 全件を edge にロードすると
     bundle が肥大化し、edge time-out リスクあり。
   - 既存 middleware は /admin のみが matcher、新規導入の影響範囲が広い。
2. **revalidate=0 + notFound() + 明示的な status code response**
   - App Router page.tsx は Response 型を return できない (Layout / Page の
     return 型は React.ReactNode)。
3. **opengraph-image route handler に 404 response を入れる**
   - これは og 画像専用、本体ページの status code に影響しない。
4. **`unstable_rethrow` 等の Next.js 16 API を使う**
   - 既存 codebase に該当用例なし、安全性未検証。

## 推奨アクション (ユーザー判断要)

以下のいずれかでの再開を提案する:

**(1) dynamicParams=false の再導入を許可する**
- 過去の revert 理由は未確定仮説。最新の Vercel 環境では現状 build が通る
  ことが PR #288 で確認済み (recovery 完了済)。
- /blog/*, /q/*, /essays/* の 3 ルート全部に dynamicParams=false + 完全な
  generateStaticParams を導入することで proper 404 を実現できる。
- ただし「絶対に再導入しない」制約に違反するため明示的な許可が必要。

**(2) middleware ベースの soft-404 検知**
- middleware.ts を拡張し、/blog/[slug], /q/[exam]/[yearSeason]/[section]/[qnum]
  の URL pattern を matcher に追加。data 存在チェックを行い、無効なら NextResponse
  で 404 を返す。
- 全件データを edge runtime にロードするコストの計測が必要。

**(3) Next.js のバグ調査 + 報告**
- Next.js 16 + Turbopack で notFound() が 404 を返さない件を upstream で確認
  し、修正待ち。短期的な解決にならない。

**(4) /essays/* も含めて現状維持 + SEO 側で対処**
- robots.txt や sitemap で問題 URL を排除し、検索エンジンへの indexing 影響
  を最小化。proper 404 化は延期。

## 現状

- alive marker push 済 (9bc0ee2)
- main HEAD 194eb4f (PR #288 マージ後、本番復旧済)
- ブランチ fix/soft-404-blog-q は alive marker のみ、コード変更なし

## 報告者所感

タスクの前提 (/essays/* は proper 404 を返している) が誤っているため、
そのまま実装に進むとユーザー期待と乖離した結果になる。
推奨は (1) — dynamicParams=false の再導入。理由:
- 既存 9 ルートで proven。本リポジトリの規約パターン。
- 過去の revert 理由は未確定仮説で、再現性なし。
- 他案 (middleware / Route Handler) は Next.js 16 + Turbopack 下で動く確証なし。
ただし制約違反となるため、ユーザー承認後に着手する。
