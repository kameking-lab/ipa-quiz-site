# Loop 4 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: f115d5e（Loop 3 push 後）

## Phase 1: 過去ループ修正の再検証
- Loop 1 description: prod 反映済 ✅
- Loop 2 OG 画像 / FAQ 修正: prod デプロイ済（直前ループで Vercel 反映確認）
- Loop 3 JSON-LD: コミット f115d5e で push 済、prod デプロイ進行中

## Phase 2: Critical
**Critical 該当なし**。
- 認証 / 課金 / API すべて期待ステータスで応答
- sitemap, robots.txt, OG 画像生成 すべて健全

## Phase 3: Major
新規 Major 該当なし（既存 M1〜M3 を `logs/major-issues.md` で継続記録）。

## Phase 4: Minor（即修正）

### N4-1. 午後 AI 採点ページ `/[exam]/afternoon` がホームから到達不可
**実測**:
- `lib/afternoon/load.ts` で AP/ST/FE/DB/NW/SC/ES/PM/SA/AU/SM 11 区分の午後問題を登録済
- `app/[exam]/afternoon/page.tsx` で SUPPORTED_AFTERNOON_EXAMS 11 区分の SSG ページ生成済
- 一方、ホーム `HomeExamPicker` のモードカードは 5 種類のみ（ランダム / 未回答 / 復習 / 年度別 / 分野別）
- → 午後 AI 採点はサイト内ナビゲーションから一切リンクされていない（フッター・グローバルナビ・ホームすべて未掲載）
- ユーザーは URL 直打ちか、午後問題の詳細ページからの遷移しか到達手段がない

**影響**:
- 「午後 AI 採点」は CLAUDE.md §1 の差別化軸 (C) であり、競合（過去問道場）が未着手の独占領域
- にもかかわらず**最も発見しづらい状態**でリリースされている（ローンチ準備として致命的な情報設計ミス）
- 訪問者は他の「過去問サイト」と同じく午前選択肢クイズしかないと誤認するリスクが高い

**修正**: `components/HomeExamPicker.tsx` + `app/page.tsx`
- 6 番目の ModeCard「午後 AI 採点 (β)」を追加（`<FileEdit>` アイコン）
- `app/page.tsx` でサーバーサイドに `afternoonCounts` を計算（`getAfternoonQuestions(exam).length`）
- `afternoonCounts[exam] > 0` の試験区分でのみ表示（IP/SG では非表示）
- 件数を desc に表示してボリューム感を伝える

**検証**: `pnpm typecheck` ✅ / `pnpm build` ✅（既存ページに退行なし、route 一覧変化なし）

## Phase 5: ビジネス・SEO・差別化評価
- 午後 AI 採点をホームに露出することで、CLAUDE.md §1 の差別化軸 (C) が訪問者に伝わる
- 競合サイトとの最大の違いをトップ画面に明示できる UX 改善
- afternoonCounts を実数で表示することで「実装中」ではなく「収録済」が一目で分かる
- 既存 5 モードと同じ視覚言語（ModeCard）で並列表示 → 違和感なく自然な流入経路

## Phase 6: NPS 予測
- Loop 3 比 +4 → **+14（baseline）**
- 理由: 差別化軸 (C) の発見性向上で「他サイトと違う」が初訪問で伝わる

## Phase 7: ローンチ可否判定
- **Soft Launch 可、Hard Launch も可（Loop 2 OG/FAQ + Loop 3 JSON-LD + Loop 4 午後導線が prod 反映後）**
- 早期完了条件（3 ループ連続 Critical 0 + Minor 0）には未到達 — Loop 4 で Minor 1 件発見

## 本ループで対応する Issue
- N4-1: 午後 AI 採点 ModeCard をホームに追加（HomeExamPicker, app/page.tsx）
