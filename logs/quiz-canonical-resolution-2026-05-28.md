# /quiz canonical 自己301矛盾の解消 (2026-05-28)

対象: フェーズ14 第4致命傷 / 構造的激辛レビュー第3弾 SEO-1。
ブランチ: `fix/quiz-canonical-self-301-resolution` / 基点 main HEAD: `dfc65fa`

## 現状調査結果（修正前の自己矛盾）
- `app/quiz/page.tsx:9-14`
  - `alternates: { canonical: "/quiz" }`（自分自身を canonical 宣言）
  - `robots: { index: true, follow: true }`（indexable を主張）
- `next.config.ts:62-68`
  - `source:"/quiz"`, `missing:[{type:"query",key:"mode"}]`, `destination:"/"`, `permanent:true`
  - つまり「mode クエリ無しの素 `/quiz`」は **permanent redirect**（Next 16 は `permanent:true` → **308**、本番curl実測 `status=308 location=https://www.kakomon-ai.jp/`）。
- `lib/seo/sitemap-xml.ts:65` で /quiz は sitemap から既に除外済（コメント記載）。
- `app/robots.ts` に /quiz は無し（クロールは許可、index禁止は meta で伝える設計）。

### 自己矛盾の機序
1. すべての `/quiz?mode=…` ページの `<head>` が `<link rel="canonical" href="https://www.kakomon-ai.jp/quiz">` を出力。
2. Google は canonical を解決しに行く → `/quiz` を fetch → **308 → /**。
3. Google は「canonical 先は / だ」と判定し、`/quiz?mode=…` の全リンク評価（PageRank）を**ホームに吸収**。
4. 同時に `index:true` は完全に dead — Google は redirect の宛先（/）を index するだけで、宣言した自己URLは絶対に index できない。
5. 宣言とインフラ（page.tsx の主張 vs next.config の redirect）が論理破綻 → SEO 効率を毀損。

## 修正方針: 案A（noindex + canonical を 308 先に整合）
- /quiz は**機能的にプレイヤーのアプリシェル**（インタラクティブ）。SEO landing は `/q/[exam]/...` の静的ページ群（CLAUDE.md・構造的激辛 第3弾と一致）。
- `/quiz?mode=…` の各種は「ランダム/復習/分野…」のアプリ状態であり、固有コンテンツではない → index する正当性なし。
- 採用しない: 案B（/quiz を機能LP化）は不要な大改修。案C（URL構造変更）はリダイレクト管理が煩雑で互換コスト大。

## 修正内容（app/quiz/page.tsx の metadata のみ）
```
- alternates: { canonical: "/quiz" },
- robots:     { index: true,  follow: true },
+ alternates: { canonical: "/" },
+ robots:     { index: false, follow: true },
```
意図: 
- **noindex,follow**: このURLは index しない（誤主張をやめる）、内部リンクは follow させ link equity を外へ流す。
- **canonical: "/"**: 308 の宛先と一致させ、信号を redirect 先（/）で確実に統合。Google を「redirect する自URL」へ案内する誤導を停止。

ホームCTA `/quiz?mode=random&exam=ap&limit=3` 等のユーザー導線は不変。素の `/quiz` の 308 動作も不変。ユーザーから見える挙動の変化はゼロ（noindex は検索エンジン向け signal）。

## ビルド成果物・テストで確認した事実
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest **28ファイル 171件全緑**(+5) / build 成功。
- 新規 e2e `tests/e2e/quiz-canonical.spec.ts`（3件 × 3回 = 9/9 緑、フレーキー無し）:
  - 素 `/quiz` は依然として 30x で `/` に redirect（互換維持）。
  - `/quiz?mode=…` は 200 で、`<meta name="robots" content="noindex,follow">` を含み（修正前の "index" を含まない）、`<link rel="canonical">` が `/quiz(?|$)` を**指さない**こと（"/" を指すこと）。
  - ページは依然到達可能（リンクフォロー UX 不変）。
- 新規 vitest `__tests__/seo/quiz-noindex.test.ts`（5件緑）: app/quiz/page.tsx を直接 import できない（`pool-server.ts` の `import "server-only"` のため）ので、metadata literal をソース走査で精密に固定。`index:false` / `follow:true` / `canonical:"/"`、`index:true` と `canonical:"/quiz..."` の不在を機械的に保証。
- 回帰 e2e subset（quiz-canonical・canonical 既存・home-cta-click・admin-auth・blog-question-count・smoke-routes）**22 全緑**。`canonical.spec.ts` は `/quiz/review` と `/quiz/stream`（別ルート）のみ検証しており、本修正は無影響。`home-cta-click` は `/quiz?mode=...`（308 非該当）を使用、UX 不変を確認。

## SEO 効果見込み
- 自己 redirect canonical の論理破綻が消える → Google の canonical 解決が短絡せず、`/quiz?mode=*` の評価がホームへ「不正な経路」で吸われるルートが閉じる。
- `noindex,follow` により Search Console の "Submitted URL marked 'noindex'" 等の警告は出ない（/quiz は sitemap 既に除外）。
- `/q/*` 静的ページ群（SEO landing）に PageRank が透過的に行き渡る基盤が整う。
- すでに index されていた稀な `/quiz?mode=*` 個別URL（あれば）は、次回クロールから順次 deindex される見込み。

## 申し送り
- `playwright.config.ts` の冒頭コメント（onboarding tour が「first visit で synchronous に開く」と書かれている部分）は現行コードと不整合（OnboardingTour は opt-in、phase 10 以降）。第2致命傷の調査でも指摘。docs 整合の別タスク候補。
- `/q/*`↔`/quiz` の流入面と演習面の分断（構造的激辛 使-1）も別タスク候補（残）。

## 次のステップ
本番反映後、以下で実機確認推奨:
1. `curl -sI https://www.kakomon-ai.jp/quiz` → 308 + `Location: https://www.kakomon-ai.jp/` を確認。
2. `curl -s "https://www.kakomon-ai.jp/quiz?mode=random&exam=ap" | grep -oE '<meta[^>]+robots[^>]*>|<link[^>]+canonical[^>]*>'` → `content="noindex,follow"` と canonical が `/` を指すことを確認。
3. Google Search Console の URL 検査ツールで `/quiz` を再申請（任意・即時反映を促す）。
