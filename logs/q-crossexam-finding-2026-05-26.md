# /q crossExam 全走査 (C-1) の調査結果 — 最適化不要 (2026-05-26)

構造レビュー C-1: 「個別問題ページ生成時に『他試験区分の同テーマ問題』抽出で全 14,402 問を走査、
TTFB に直結」。本フェーズで index 化を検討したが、**実測により最適化は不要と判明**。

## 計測（事実）

```
ALL_QUESTIONS.filter(q => q.topicTags.length > 0).length === 0   // 14,402 問中 0 問
```

**全問題の `topicTags` が空**（topic-tagger スクリプトは未実行。CLAUDE.md §3「topic-tagger.ts は
未書き込みのヒューリスティックのみ」と一致）。

## 該当コード（`app/q/.../page.tsx`）

```ts
const crossExamByTopic =
  q.topicTags.length > 0
    ? ALL_QUESTIONS.filter(...)   // ← topicTags が空なので決して実行されない
    : [];
```

`q.topicTags.length > 0` は全問題で false のため、**14k 走査の分岐には一度も入らない**。
実際には `: []` を返すだけで O(1)。つまり C-1 が懸念した「毎レンダリング 14k 走査」は
現データでは発生していない（クロス試験セクションも常に非表示）。

## 判断

- 「計測根拠なしの推測最適化禁止」に従い、**発生していない走査に対する index 化は実施しない**。
  試作した index（lib/questions/topic-index.ts）は revert 済み。
- もし将来 topic-tagger を実行して `topicTags` が投入された場合は、その時点で初めて 14k 走査が
  発生しうるため、**topicTags 投入と同じ PR で index 化を行う**のが正しい順序。
- 関連: topicTags 空は crossExam だけでなく、ヘッダの #tag リンク・AI CTA の前提知識整理など
  他の topicTag 依存表示も不発にしている（別途、コンテンツ拡充タスクの候補）。

## 結論

C-1 はコード上の理論的指摘としては妥当だが、現データ（topicTags 全空）では走査が発生せず、
TTFB への実害なし。最適化は不要。topicTags を投入する将来タスクとセットで対応する。
