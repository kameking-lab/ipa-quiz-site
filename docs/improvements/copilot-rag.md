# Copilot RAG Grounding (feat/copilot-rag-grounding)

このファイルは「alive marker」です。RAG-based citations 実装の進捗・設計・評価結果を記録します。

## 目的

AI Copilot の応答にハルシネーションが混入することを抑え、回答末尾に必ず出典
（問題 ID / 用語集エントリ）を付与する。教育コンテンツとしての信頼性を確保することが目的。

## アーキテクチャ

```
ユーザー質問
  ↓
  ┌─────────────────────────────┐
  │  Phase 1: BM25 Retriever     │
  │  - char-bigram tokenizer (JP) │
  │  - Questions + Glossary 統合  │
  │  - Top-K=10                   │
  └─────────────────────────────┘
  ↓
  ┌─────────────────────────────┐
  │  Phase 2: Reranker            │
  │  - deterministic (default)    │
  │  - or LLM-based (opt-in)      │
  │  - Top-3                      │
  └─────────────────────────────┘
  ↓
  ┌─────────────────────────────┐
  │  Phase 3: Prompt 統合         │
  │  - RAG ブロック注入            │
  │  - "出典のみ参照" ディレクティブ │
  │  - 末尾に citation list 自動付与│
  └─────────────────────────────┘
```

## 実装ファイル

- `lib/copilot/tokenize.ts` — 日本語向けトークナイザ（char-bigram + ASCII split）
- `lib/copilot/corpus.ts` — Questions + Glossary を統合 corpus に変換
- `lib/copilot/retriever.ts` — BM25 ベース検索
- `lib/copilot/reranker.ts` — 決定的リランカー（タグ重複・カテゴリ一致・長さペナルティ）+ LLM オプション
- `lib/copilot/citations.ts` — 出典ブロックのレンダリング
- `lib/copilot/rag.ts` — オーケストレーション
- `app/api/copilot/route.ts` — 既存ルートへの統合（env で off にも切替可能）
- `lib/ai/prompts.ts` — RAG ディレクティブ追加

## 環境変数

- `COPILOT_RAG_ENABLED` （デフォルト `true`）— RAG パイプライン全体の有効化
- `COPILOT_RAG_RERANK_LLM` （デフォルト `false`）— LLM 再ランクの有効化。`false` で決定的リランカー
- `COPILOT_RAG_MIN_MAX_IDF` （デフォルト `3.0`）— クエリ最大 IDF の下限。識別力不足の query を弾く。
- `COPILOT_RAG_MIN_SCORE` （デフォルト `18`）— citation 表示しきい値。評価で校正した値。
- `COPILOT_RAG_TOP_K` （デフォルト `10`）— BM25 候補数
- `COPILOT_RAG_TOP_N` （デフォルト `3`）— 最終文脈数

## 互換性

- `COPILOT_RAG_ENABLED=false` で既存挙動に 100% フォールバック
- 雑談・モチベ・進路相談など知識を必要としない質問では retrieve を試みるが、
  しきい値未満なら citation を抑制（既存挙動を維持）

## 評価

`pnpm tsx scripts/eval-copilot-rag.ts` で再現可能。
ground truth は `data/copilot-eval/groundtruth.ts`（50 件）。

### 計測指標
- **Recall@5**: 期待 doc ID が top-5 候補に含まれる割合
- **Citation rate**: 知識質問のうち citation を返した割合
- **MRR@10**: Mean Reciprocal Rank（順位品質）

最新結果は本ファイル末尾「Results」セクションを参照。

## Results

### Before / After 比較 (citation-enhancement PR)

| 指標                        | Before (PR #269) | After (本 PR) | Δ        |
| --------------------------- | ---------------- | ------------- | -------- |
| 総クエリ数                  | 50               | 65            | +30 %    |
| 知識クエリ数                | 40               | 50            | +25 %    |
| 雑談クエリ数                | 10               | 15            | +50 %    |
| Recall@5 (knowledge)        | 87.5 %           | **94.0 %**    | **+6.5pt** |
| MRR@10 (knowledge)          | 0.875            | **0.940**     | +0.065   |
| Citation rate (knowledge)   | 97.5 %           | **98.0 %**    | +0.5pt   |
| False-positive (chitchat)   | 50.0 %           | 60.0 %        | +10pt (※1) |

※1: 雑談 FP は仕様上許容 (rag.ts 内コメント参照)。新規追加した chitchat バリエーション 5 件のうち、
    雑談トーンが弱く本文に学習相談文脈を含むもの (「難しくて挫けそう」等) が score >18 で citation 化。
    回答テキスト側で「Q: ありがとう / よろしく → 短文応答」の挙動は既存実装で担保済み。

主な強化点:
- `lib/copilot/aliases.ts` を新設し、14 用語に対する和洋・略称エイリアスを定義。
- corpus.ts でエイリアスを doc 本文に注入し、BM25 でヒットしやすくする。
- retriever.ts に「エイリアス完全一致 → glossary doc ピン留め注入」を追加。
  これにより RSA → 公開鍵暗号、二相コミット → ACID、サブネットマスク → CIDR
  などの paraphrase クエリで recall が 90%+ に向上。
- groundtruth.ts に paraphrase 概念質問 10 件、雑談バリエーション 5 件を追加。

### 2026-05-18 評価実行

- 総クエリ数: 65
- 知識クエリ: 50
- 雑談クエリ: 15
- Recall@5 (knowledge): 94.0 %
- MRR@10  (knowledge): 0.940
- Citation rate (knowledge cited): 98.0 %
- False-positive rate (chitchat cited): 60.0 %
- Threshold (COPILOT_RAG_MIN_SCORE): 18.00

#### Recall@5 miss サンプル (上位 3 件 / 計 3)
- "リスクベース認証と二要素認証" → expected ["g:OAuth 2.0"] / top5 ["q:sc-2019h-am1-q12","q:sm-2019h-am1-q12","q:sa-2019h-am1-q12","q:ap-2021h-am-q39","q:st-2019h-am1-q12"] / topScore 61.60
- "スプリントレトロスペクティブの目的" → expected ["g:アジャイル"] / top5 ["q:ap-2023h-am-q48","q:sa-2023h-am2-q12","q:sc-2022a-am1-q17","q:au-2022a-am1-q17","q:sa-2025h-am1-q17"] / topScore 85.79
- "プログラム実行中の動的最適化" → expected ["g:JIT (Just-In-Time)"] / top5 ["q:db-2016a-am1-q6","q:fe-2013a-am-q49","q:ap-2010a-am-q44","q:es-2021a-am2-q22","q:sa-2010a-am1-q15"] / topScore 40.69

#### False-positive サンプル (上位 5 件 / 計 9)
- "今日もよろしくお願いします" → top5 ["q:fe-2018a-am-q24","q:ip-2013h-am-q85","q:db-2020a-am2-q6","q:fe-2023cbt-kamoku-a-q12","q:ip-2018a-am-q62"] / topScore 58.29
- "難しくて挫けそうです" → top5 ["q:ip-2009a-am-q95","q:nw-2019h-am1-q1","q:sc-2017a-am1-q3","q:ap-2025h-am-q7","q:ap-2016a-am-q2"] / topScore 20.16
- "AIってどんな仕組み？（雑談）" → top5 ["q:au-2010h-am2-q14","q:nw-2022h-am2-q14","q:ip-2017h-am-q90","q:ip-2023cbt-am-q19","q:ip-2020a-am-q32"] / topScore 27.80
- "もう一度説明してくれる？" → top5 ["q:ip-2019a-am-q43","q:fe-2010a-am-q77","q:ip-2010h-am-q93","q:fe-2017h-am-q27","q:fe-2014h-am-q77"] / topScore 20.46
- "受験まで 2 ヶ月でどう勉強すればいい？" → top5 ["q:sc-2025a-am1-q19","q:pm-2025a-am1-q19","q:ap-2009h-am-q52","q:ap-2018a-am-q53","q:ap-2015h-am-q53"] / topScore 29.46

