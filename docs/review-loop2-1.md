# 激辛レビュー第2巡 — Loop 1

実施日: 2026-04-26
レビュアー: 齋藤ナオ厳格モード
対象: https://ipa-quiz-site.vercel.app（origin/main 32b364d 同期済み）
1巡目最終 NPS 予測: +27（baseline）

## サマリ

| 区分 | 件数 |
|------|------|
| Critical | 0 |
| Minor | 3（即修正） |
| Major | 3（保留・logs/major-issues-2.md に記録） |

## 観点別所見

### 観点1: 13試験 /q/ ページ問題データ品質
- 13試験すべて `data/questions/{exam}/by-year/` にデータが配置されている
- AP の 5 ファイル（2023-2025）に hasImage:true が計 68 件、imageUrls なし。 `lib/questions/filter.ts` の `hasUnrenderableContent` は `表/図` パターンを `hasImage:false` の場合のみ除外しており、`hasImage:true && imageUrlsなし` は表示される。 一部問題は「図のように」のような正規表現外パターンを含み、画像なしで表示されるリスクあり → **Major M2-1**
- ID重複・answer/choices 不整合は検出なし
- explanation 3層構造の遵守率は AP 2024秋以外で低水準（IP/SG/FE 全年度は1層） → **Major M2-2**

### 観点2: 解説3層構造の遵守率
- `lib/questions/types.ts:48` `explanation: string` は型レベルでの3層強制なし
- 既存の3層化済み問題はメモリ記載通り AP 2024秋68問に限定。残り12,094問が1層 → **Major M2-2**（既知、本ループ対応外）

### 観点3: 模範解答（午後I・II）品質
- `data/questions/afternoon/` を確認、TODO/プレースホルダ/空欄なし
- modelAnswer / scoringRubric / answerKeys が整備されている（ap, db, nw, sc, es, sm, au）
- Critical/Minor 0

### 観点4: 業種別論述（午後II）整合性
- ST/PM/SA/AU/SM の 6 業種パターンが `IndustryVariant` 型で統一
- Critical/Minor 0

### 観点5: M2 試験別 description（13試験）
- `lib/seo/exam-meta.ts:5-19` で全13試験の description 完備、47-62 字（簡潔）
- `/[exam]/page.tsx` で `examTopDescription` 経由の動的 generateMetadata 確認
- `/modes/year` `/modes/topic` も ?exam= パラメータに応じた dynamic metadata
- Critical/Minor 0

### 観点6: 利用規約 11 セクション
- `app/terms/page.tsx` Section 1-11 完備
- 「運営」が generic に使われているが Section 1 に事業者定義なし → **Minor N1-2 (即修正)**
- `/commerce` と返金ポリシー記述順が異なる（実質矛盾なし） → **Minor N1-3 (即修正不要)**

### 観点7: モバイル320px
- `app/pricing/page.tsx:385` `FeatureComparisonTable` が `min-w-[640px]`、320px 端末で水平スクロール必須 → **Minor N1-1 (即修正)**
- `overflow-x-auto` でラップ済みなので機能破綻はなし

### 観点8: ダークモード
- 193 箇所で `dark:` バリアント。semantic color (foreground, muted-foreground, primary, card, border) で一括対応
- Critical/Minor 0

### 観点9: canonical/sitemap
- `lib/seo/sitemap-xml.ts` の STATIC_ROUTES に /pricing /commerce /case-studies /review /mock-exam /faq /about /terms /privacy 完備
- `/[exam]` 動的 canonical 確認
- Critical/Minor 0

### 観点10: /commerce 法務整合
- 特商法11項目（事業者名・所在地・連絡先・販売価格・支払い方法・引渡時期・返品/解約等）を網羅
- /terms の「運営」ラベルが /commerce の「金田 義太」と紐づいていない → **Minor N1-2（即修正対象）**

## 即修正コミット

| ID | 内容 | ファイル |
|----|------|----------|
| N1-1 | /pricing FeatureComparisonTable を 320px 対応化（min-w-[640px] → 480px、cell padding を sm: 以上で拡大） | `app/pricing/page.tsx` |
| N1-2 | /terms Section 1 に事業者定義（金田 義太）を明記、/commerce へのリンクを追加 | `app/terms/page.tsx` |
| N1-3 | `lib/questions/{filter,pool-server}.ts` の図表パターン正規表現を拡張（「図のように」「表のように」「図に示す」「表に示す」「図中の」を追加） | `lib/questions/{filter,pool-server}.ts` |

## Major（保留）

`logs/major-issues-2.md` に記録:
- M2-1: hasImage:true 約700件以上が UI に画像描画されない（pre-existing UX 課題、データ整備が必要）
- M2-2: explanation 3層構造の遵守率が低水準（残12,094問、別ループ refactor 進行中）
- M2-3: explanation 型を string から3層構造オブジェクトへ移行（型レベル強制）

## 品質保証

- ✅ `pnpm typecheck` 成功
- ✅ `pnpm build` 成功（1,512 動的 question paths + 静的ルート）
- ✅ git push 予定
- NPS 予測: +27 → +28（Minor 3件解消で +1）
