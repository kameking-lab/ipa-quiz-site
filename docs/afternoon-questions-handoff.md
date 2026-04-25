# 午後問題 模範解答生成 — 引継ぎドキュメント

最終更新: 2026-04-25

## 本ドキュメントの位置付け

タスクB「午後記述・論述模範解答の生成」は規模が大きく、複数セッションに分割して進める。
本ドキュメントは「これまでに何が完了し、次に何を進めるべきか」を記録する。

## データ構造（決定済み）

- 型定義: `lib/afternoon/types.ts`
  - `AfternoonQuestionType = "descriptive" | "essay"`
  - `SubAnswerType = "short-text" | "long-text" | "essay-text" | "fill-blank" | "choice"`
  - `essay-text` は 2,000〜3,000 字の小論文用。`compositionPoints[]` と `scoringCriteria[]` を併記する。
- 配置: `data/questions/afternoon/{exam}/{year}-{season}.ts`
- ローダ: `lib/afternoon/load.ts`
- 採点API: `app/api/scoring/route.ts`（記述式・論述式両対応のシステムプロンプトに更新済み）

## UI（決定済み）

- 一覧: `app/[exam]/afternoon/page.tsx`
- プレイヤー: `app/[exam]/afternoon/[year]/[season]/page.tsx` + `components/afternoon/AfternoonPlayer.tsx`
- 結果表示: `components/afternoon/AfternoonResultView.tsx`
- 論述式（essay-text）対応:
  - textarea を 16 行に拡張
  - 字数下限/上限を表示（`minLength`〜`maxLength`）
  - 「構成のポイント」を折りたたみ表示
  - 「採点基準」を結果画面に折りたたみ表示
  - 模範解答ラベルを「模範解答（論述例）」に切替

## 現状の登録問題

| 試験 | 年度 | 形式 | 大問数 | 状態 |
|------|------|------|--------|------|
| AP   | 2024 春 | 記述式 | 1 大問（4設問） | キュレーション完了（Claude品質） |
| AP   | 2023 秋 | 記述式 | 1 大問（4設問） | キュレーション完了（Claude品質） |
| AP   | 2023 春 | 記述式 | 1 大問（4設問） | キュレーション完了（Claude品質） |
| ST   | 2024 春 | 論述式 | 1 大問（設問ア・イ・ウ） | キュレーション完了（Claude品質、論述例 600〜1,600字） |

## 残作業（優先度順）

### Phase A — 試験区分の網羅（記述式）

`SUPPORTED_AFTERNOON_EXAMS` に以下を順次追加し、それぞれサンプル大問を1〜2問キュレーションする:

- [ ] FE 午後（記述式相当の科目B拡張は要確認）
- [ ] DB 午後I（記述式）
- [ ] NW 午後I（記述式）
- [ ] SC 午後（記述式）
- [ ] ES 午後I（記述式）

各試験につき、最低でも:
- 直近2年分（4季）× 各大問1問
- カテゴリは試験出題範囲を満遍なくカバー

### Phase B — 論述式試験の網羅

ST 以外の論述式試験を追加:

- [ ] PM 午後II（プロジェクトマネジメント）
- [ ] SA 午後II（システム監査）
- [ ] AU 午後II（システム監査）
- [ ] SM 午後II（ITサービスマネジメント）

論述式は ST のテンプレ（`data/questions/afternoon/st/2024-spring.ts`）を参照すること。
`compositionPoints[]` と `scoringCriteria[]` を必ず付与する。

### Phase C — 量の拡充

各試験で過去5年分（10季）まで拡張。
`scripts/parse-afternoon/parse-ap-afternoon.ts` をベースに、
`parse-{exam}-afternoon.ts` を試験ごとに用意する想定。

### Phase D — 品質改善

- [ ] AI採点精度の検証（実際にユーザー解答を投入して評価）
- [ ] 採点結果の HTML/PDF エクスポート機能
- [ ] 解答途中保存（localStorage に下書きを保存）
- [ ] 採点後の AI コパイロット連携（"このフィードバックについて深掘りしたい"）

## キュレーション品質ガイドライン

### 記述式（descriptive）

- **modelAnswer**: 設問の字数制限内で、答案として通用する完成形を1案または2案
- **scoringRubric**: 「【満点】〜」「【部分点】〜」「【0点】〜」の3段構成
  - 満点条件は具体的キーワードを2〜3個列挙
  - NGキーワードや混同しやすい論点も明示
- **points**: 大問の合計が 100 になるよう配分

### 論述式（essay）

- **modelAnswer**: 指定字数下限を満たす完全な論述例（600〜1,200字×3章）
  - 第三者が読んで「答案として成立している」と判断できるレベル
  - 数値・固有名詞・代替案検討を必ず織り込む
- **compositionPoints**: 4〜5項目。論述で押さえるべき構造的要素
- **scoringCriteria**: 4観点（適合性／具体性／構造化／自己関与）が標準
- **scoringRubric**: 【A評価】【B評価】【C評価相当】の3段で記述

### 共通

- 出典 PDF URL は `https://www.jitec.ipa.go.jp/...` の形式で正確に
- `license: "IPA-public"` を必ず付与
- 著作権上、IPA問題文をそのまま転載する場合は引用要件（出典明示）を満たす
- 編集者作成のシナリオを使う場合は context 末尾に「※学習用シナリオ」と注記推奨

## 関連スクリプト

- `pnpm parse:afternoon` — AP午後 PDF 抽出（GEMINI_API_KEY 必須、ローカルPDF配置必須）
- `pnpm validate:questions` — 午前問題の zod 検証（午後はまだ未対応）
- `pnpm typecheck && pnpm build` — 各セッションの最後に必ず実行

## 採点API調整の余地

- 現状 `maxTokens: question.type === "essay" ? 4000 : 1500` だが、論述式 3 章×1,500 字を採点する場合は不足する可能性あり。実運用ログを見て調整する。
- レート制限（`lib/rate-limit/server.ts`）は記述式・論述式共に同一カウント。論述採点は実コストが大きいので、論述式は別カウンタにする検討余地あり。
