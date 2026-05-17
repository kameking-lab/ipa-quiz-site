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

### 2026-05-17 評価実行

- 総クエリ数: 50
- 知識クエリ: 40
- 雑談クエリ: 10
- Recall@5 (knowledge): 87.5 %
- MRR@10  (knowledge): 0.875
- Citation rate (knowledge cited): 97.5 %
- False-positive rate (chitchat cited): 50.0 %
- Threshold (COPILOT_RAG_MIN_SCORE): 18.00

#### Recall@5 miss サンプル (上位 5 件 / 計 5)
- "機械学習の教師あり学習" → expected ["g:マシン学習"] / top5 ["q:fe-2019h-am-q4","q:ip-2024cbt-am-q65","q:ap-2019a-am-q4","q:pm-2019a-am1-q3","q:ip-2022cbt-am-q24"] / topScore 60.40
- "RSA 暗号の鍵長と安全性" → expected ["g:公開鍵暗号"] / top5 ["q:ap-2023a-am-q37","q:fe-2019h-am-q39","q:sc-2021h-am2-q7","q:sg-2019h-am-q27","q:es-2024a-am2-q15"] / topScore 40.90
- "二相コミット 2PC の流れ" → expected ["g:ACID"] / top5 ["q:sc-2014h-am1-q9","q:sm-2022h-am2-q23","q:sm-2014h-am1-q9","q:db-2021a-am2-q12","q:sa-2014h-am1-q9"] / topScore 33.55
- "サブネットマスク /24 のホスト数" → expected ["g:CIDR"] / top5 ["q:nw-2021h-am2-q10","q:nw-2025h-am2-q8","q:ap-2016h-am-q35","q:nw-2010a-am2-q15","q:pm-2021a-am1-q11"] / topScore 64.58
- "クロスサイトスクリプティングの反射型" → expected ["g:XSS"] / top5 ["q:ap-2015a-am-q36","q:ip-2018a-am-q77","q:ip-2012h-am-q77","q:ip-2012a-am-q60","q:au-2013a-am1-q15"] / topScore 71.75

#### False-positive サンプル (上位 5 件 / 計 5)
- "受験まで 2 ヶ月でどう勉強すればいい？" → top5 ["q:sc-2025a-am1-q19","q:pm-2025a-am1-q19","q:ap-2009h-am-q52","q:ap-2015h-am-q53","q:es-2025a-am1-q19"] / topScore 29.52
- "緊張で当日眠れなかったらどうする" → top5 ["q:nw-2010a-am1-q21","q:sa-2010a-am1-q21","q:ap-2010a-am-q57","q:sc-2010a-am1-q21","q:sm-2010a-am1-q21"] / topScore 28.86
- "資格を取って何が変わる？" → top5 ["q:db-2021a-am2-q8","q:ap-2025h-am-q39","q:pm-2020a-am2-q8","q:ip-2014h-am-q95","q:nw-2022h-am2-q10"] / topScore 23.24
- "他のサイトと比べてどう？" → top5 ["q:fe-2016a-am-q34","q:fe-2018a-am-q14","q:sc-2019a-am1-q15","q:fe-2017h-am-q28","q:ap-2023a-am-q37"] / topScore 19.32
- "ありがとう、わかりやすかった" → top5 ["q:ip-2019h-am-q54","q:pm-2016a-am1-q5","q:ip-2019h-am-q66","q:ip-2020a-am-q85","q:db-2018a-am1-q9"] / topScore 25.06

