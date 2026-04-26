# Major Issues — 第2巡（承認必須・本自動レビュー外）

## M2-1. hasImage:true 問題に画像が描画されない（UX 影響）
- 現状: `data/questions/` 全体で hasImage:true レコードが約 700 件以上、すべて imageUrls 欠落
- UI: `components/quiz/` で imageUrls を描画する処理なし、`/q/[exam]/...` も同様
- 影響: 「図のように」「表のように」を含む問題で図が見えず、回答困難
- フィルタ補強（Loop 2-1 でパターン拡張済）で一部除外されるが、根本解決には IPA 公式 PDF からの画像抽出または "画像必要問題" を pool から除外する仕組みが必要
- 工数: 8-16 時間（OCR/画像抽出スクリプト実装 + データバインド）
- 優先度: 高（UX に直接影響）
- 検出ループ: Round 2 Loop 1

## M2-2. 解説 3 層構造の遵守率が低水準
- 現状: AP 2024秋68問のみ3層化済、残12,094問は単純1行（「正解はXです。」）または1段落
- 現状 type 定義: `lib/questions/types.ts:48` `explanation: string`
- 競合（過去問道場）は静的解説で10年積み上げ。差別化のため AI 再生成が進行中（pnpm refactor:by-file）
- 別ループの大規模リファクタとして対応中
- 検出ループ: Round 2 Loop 1（既知）

## M2-3. explanation を構造化型に移行
- 現状: `explanation: string`
- 推奨: `explanation: { short: string; reasoning: string; supplement?: string }`
- 既存データのマイグレーションが大規模、現行 string も併存可能な抽象化が必要
- 工数: 4-8 時間（型定義 + マイグレーション + Markdown レンダラ更新）
- 優先度: 中
- 検出ループ: Round 2 Loop 1
