# 問題データ統合監査 — 分類サマリ

生成: 2026-05-16
対象: 午前 14,402問 / 午後 (AP) 3問 / 論述 12問 = 計 14,417 問

総検出: 24,184 件
- 致命傷 (critical): **20**
- 機会損失 (opportunity): **2,477**
- 警告 (warning): **21,687**

---

## 致命傷 (critical) — 全件修復対象

10 問が「multiple-choice なのに全選択肢が空文字」という構造的破綻を抱えている
（うち各問が choices-too-few と answer-out-of-range の 2 件を発生させているため、合計 20 検出）。

共通パターン: いずれも `hasImage: true` で、選択肢が IPA PDF 内の図版（グラフ・論理回路・木構造・図表）として
描かれており、Gemini Vision パーサが選択肢テキストを抽出できなかったケース。
出題プールに残ると「選択肢の見えない問題」をユーザーに掴ませることになる。

| ID | exam | year/season/session | 問題テーマ |
|----|------|---------------------|------------|
| fe-2019h-am-q5 | fe | 2019 spring am | 2分探索木として適切なもの |
| sc-2009a-am1-q19 | sc | 2009 autumn am1 | 開発規模と工数の関係グラフ |
| nw-2017h-am1-q16 | nw | 2017 spring am1 | 汎化の適切な例 |
| pm-2018a-am1-q7 | pm | 2018 autumn am1 | 全加算器の論理回路 |
| pm-2018a-am1-q10 | pm | 2018 autumn am1 | DB同時実行制御の表 |
| pm-2018a-am1-q20 | pm | 2018 autumn am1 | ITIL 2011 サービスライフサイクル図 |
| es-2021a-am2-q10 | es | 2021 autumn am2 | ハッシュ表の探索時間グラフ |
| es-2021a-am2-q11 | es | 2021 autumn am2 | PWM 復調回路 |
| es-2021a-am2-q13 | es | 2021 autumn am2 | TTL AND 回路 |
| sm-2009a-am2-q10 | sm | 2009 autumn am2 | 逓減課金方式グラフ |

**修復方針**: 既存の `needsReview: true` メカニズムで隠す。
- `lib/questions/filter.ts` が `needsReview` 付き問題を出題プールから除外済
- 加えて (a) 個別問題ページで `q.needsReview` の場合 `notFound()` を返す、
  (b) サイトマップから needsReview 付きを除外、の 2 点を追加して URL レベルでも露出させない。
- 本文（解説など）を Dispatch が改変するのは禁止事項。データそのものは温存。

---

## 機会損失 (opportunity) — 本 Dispatch 対象外

| カテゴリ | 件数 | 備考 |
|----------|------|------|
| missing-image-urls | 2,147 | `hasImage: true` で `imageUrls` 未設定。既存 `hasUnrenderableContent` でクイズプールから除外済 |
| placeholder-explanation | 320 | 既存 `isPlaceholderExplanation` で個別ページは noindex、生成パイプライン側（regen:explanations）で対応 |
| その他 | 10 | descriptive/essay に modelAnswer なし等 |

placeholder-explanation 320件は生成パイプライン（`pnpm find:placeholders` → `pnpm regen:explanations`）で扱う領域。
本 Dispatch では検出のみ、修復はスコープ外（指示書 3.2）。

---

## 警告 (warning) — 観察のみ

| カテゴリ | 件数 | 備考 |
|----------|------|------|
| duplicate-body-cross | 21,658 | IPA 過去問の異年度／異試験での再出題は正規。誤った重複ではない |
| markup-question | 15 | 問題文の Markdown/HTML 整合不一致。要目視確認 |
| markup-explanation | 13 | 解説の Markdown/HTML 整合不一致。要目視確認 |
| duplicate-body-same-exam | 1 | 同一試験内で本文一致。要追跡 |

duplicate-body-cross は IPA 過去問の構造上避けがたい（同一問が翌年度に再出題されることは慣例）。
これを致命傷化すると false positive で運用が破綻するため、警告に留める。

---

## 修復後の検証

Phase 3 完了後に `pnpm tsx scripts/audit-questions.ts --ci` を再実行し
致命傷ゼロを確認、`logs/questions-audit-final.md` に最終状態を記録する。
