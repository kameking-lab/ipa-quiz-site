# Loop 1 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 対象: https://ipa-quiz-site.vercel.app / 開始コミット: 4c17b15

## Phase 0: 環境ベースライン
- HTTP 200: `/`, `/quiz`, `/modes/topic`, `/modes/year`, `/about`, `/pricing`, `/faq` 全て 200 OK 確認
- `pnpm install` 完了、`pnpm typecheck` クリーン通過
- 実問題数（実測）: `grep -h '"id":\s*"' data/questions/*/by-year/*.ts | wc -l` → **12,162 問**
- robots.txt / sitemap.xml 200 OK

## Phase 1: 過去ループ修正の再検証
過去のレビューログは `logs/.gitkeep` のみで、実質「初回レビュー」相当。前ループ比較は本ループで基準値を確立。

## Phase 2: Critical（即修正）
### C1. SEO メタ description が「400問」のまま — OG/Twitter と矛盾
**実測コード**:
- `app/layout.tsx:26` — `description: "応用情報技術者試験の過去問400問を…"`（全ページのデフォルト）
- `app/layout.tsx:43` — OG description にも `400問`
- `app/layout.tsx:52` — Twitter description にも `400問`
- `app/page.tsx:18` — ホーム個別 description も `400問`
- `app/modes/year/page.tsx:8` — 「令和5年度春期〜令和7年度春期の400問収録」
- `app/modes/topic/page.tsx:8` — 「応用情報の過去問」（13試験対応の現状と乖離）

**実測ライブ**:
- `<meta name="description">` 「400問」 vs `<meta property="og:description">` 「IPA 13試験 12,162問」 — 同一ページ内で矛盾
- 実データは 12,162 問・13試験区分（ホーム本文では `全13試験区分 合計12,162問収録` を正しく出力）

**判定**: SEO の根幹ファクトが古い。Google にインデックスされる description が「400問」では、競合「過去問道場」（siken.com）の網羅性訴求に対し致命的な数値負け。**Critical**。

### C2. （調査結果）Critical 該当なし
ヒーロー、CTA、レンダリング、リンク切れ、コンソールエラーは確認範囲で問題なし。

## Phase 3: Major（記録のみ・承認必須）
### M1. プレミアム価格 980円 vs CLAUDE.md 300円 不整合
- 実装: `app/pricing/page.tsx:13` `components/PremiumUpsellDialog.tsx:39` で **月額980円**
- CLAUDE.md §9: 「プレミアム 月 300 円」と記載・「価格変更は承認必須」と明記
- 既存 PR #54/#59 で 980 円を実装済 = 承認済とみなすが、**CLAUDE.md が古い**
- CLAUDE.md の更新は Major（プロダクト戦略文書の改訂）として記録、本ループでは触らない

### M2. メタ description 全体の構造的見直し
ページ固有 description を「応用情報のみ」前提で書いているが、実態は 13 試験。各 exam ページに固有 description を出すアーキテクチャ変更は Major。本ループでは layout/home/modes のみ修正し、`[exam]/topic/[topicSlug]` などの動的 description は触らない。

## Phase 4: Minor（即修正）
### N1. modes/year `description` が「令和5春〜令和7春」と固定で 400 問
- `app/modes/year/page.tsx:8`
- 実装上は全 13 試験の年度ページがあるはずなのに応用情報限定の description

### N2. modes/topic `description` が「応用情報の過去問」限定文
- `app/modes/topic/page.tsx:8`

## Phase 5: ビジネス・SEO・差別化評価
- 競合直接言及: **なし** ✅（PR #65 の言及禁止ルール遵守）
- AI コパイロット推し: ホーム H1+本文+バッジで明示 ✅
- 出典明記: フッターに IPA 出典 + `ipa.go.jp` 直リンク ✅
- robots/sitemap: 配信済 ✅
- OG 画像: 動的生成あり (`/opengraph-image`) ✅
- 差別化文言「過去問道場と違う」訴求: 直接競合言及禁止のため遠回しのみ。差別化点（ゼロ遷移／AI／13試験統合／PWA）はホームに列挙されている

## Phase 6: NPS 予測
- **+5（baseline）** — 機能網羅は揃っている。SEO description の数値矛盾で Google からの初回流入数が低下する見込み。固有体験は SNS 経由で +。
- 競合 NPS（推定 -10〜0）よりは上。但し SEO 完全整合化＋`[exam]` ページ固有 description で +10〜+15 圏。

## Phase 7: ローンチ可否判定
- **Soft Launch 可、Hard Launch 不可**。
- 理由: SEO description の数値矛盾（C1）が修正されるまで広告/PR 投下は無駄。本ループで C1 を修正する。

## 本ループで対応する Issue
- C1: meta description 「400問」→ 実態（13試験 12,162問）に統一 — 即修正
- N1, N2: modes/year, modes/topic description 修正 — 即修正
- M1, M2: `logs/major-issues.md` に記録のみ
