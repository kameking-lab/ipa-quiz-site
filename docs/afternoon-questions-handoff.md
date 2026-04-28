# 午後問題 模範解答生成 — 引継ぎドキュメント

最終更新: 2026-04-25（Phase 4 完了 — SA/AU/SM 追加 / Phase 3: SC/ES/PM、第2弾: FE/DB/NW）

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
| FE   | 2024 春 | 記述式（練習） | 1 大問（5設問・配点合計100） | キュレーション完了（Claude品質、テーマ: ECサイトのパスワード保管/MFA） |
| DB   | 2024 春 | 記述式（午後I相当） | 1 大問（5設問・配点合計100） | キュレーション完了（Claude品質、テーマ: 販売管理DB再設計／正規化／SQL／インデックス） |
| NW   | 2024 春 | 記述式（午後I相当） | 1 大問（5設問・配点合計100） | キュレーション完了（Claude品質、テーマ: SSL-VPN→ZTNA／ローカルブレイクアウト／EDRポスチャ） |
| SC   | 2024 春 | 記述式（午後I相当） | 1 大問（5設問・配点合計100） | キュレーション完了（Phase 3、Webセキュリティ／クレデンシャル・スタッフィング） |
| ES   | 2024 春 | 記述式（午後I相当） | 1 大問（5設問・配点合計100） | キュレーション完了（Phase 3、リアルタイム制御／RTOS） |
| PM   | 2024 春 | 論述式 | 1 大問（設問ア・イ・ウ） | キュレーション完了（Phase 3、不確実性の高い要求への対応／論述例 600〜1,600字） |
| SA   | 2024 春 | 論述式 | 1 大問（設問ア・イ・ウ） | キュレーション完了（Phase 4、業務デジタル化のシステムアーキテクチャ設計） |
| AU   | 2024 秋 | 論述式 | 1 大問（設問ア・イ・ウ） | キュレーション完了（Phase 4、クラウドサービス利用に関する監査） |
| SM   | 2024 秋 | 論述式 | 1 大問（設問ア・イ・ウ） | キュレーション完了（Phase 4、重大インシデントの早期解決と再発防止） |

> 注（FE）: FE 本試験は 2023年4月以降 CBT・科目B（多肢選択）に移行している。
> 本サイトの FE 午後は「FEレベルの記述式練習」用の編集者キュレーション問題であり、
> 本試験形式の再現ではない（ページ全体に「練習用オリジナル問題」のディスクレーマあり）。

## 残作業（優先度順）

### Phase A — 試験区分の網羅（記述式）

`SUPPORTED_AFTERNOON_EXAMS` に以下を順次追加し、それぞれサンプル大問を1〜2問キュレーションする:

- [x] FE 午後（2024春 1大問）— 編集者キュレーション、練習用オリジナル問題
- [x] DB 午後I（2024春 1大問）— 編集者キュレーション
- [x] NW 午後I（2024春 1大問）— 編集者キュレーション
- [x] SC 午後（2024春 1大問）— Phase 3 完了
- [x] ES 午後I（2024春 1大問）— Phase 3 完了

各試験につき、最低でも:
- 直近2年分（4季）× 各大問1問
- カテゴリは試験出題範囲を満遍なくカバー

### Phase B — 論述式試験の網羅

ST 以外の論述式試験を追加:

- [x] PM 午後II（プロジェクトマネジメント）— Phase 3 完了（2024春 1大問）
- [x] SA 午後II（システムアーキテクト）— Phase 4 完了（2024春 1大問）
- [x] AU 午後II（システム監査）— Phase 4 完了（2024秋 1大問）
- [x] SM 午後II（ITサービスマネジメント）— Phase 4 完了（2024秋 1大問）

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

## セッションログ

### 第1弾（2026-04-25 / branch: claude/eager-cori-d910a0）

- AP 3大問を Claude 品質で刷新（記述式・配点100点満点・3段ルーブリック化）
- ST 2024 春 午後II を新規追加（論述式・compositionPoints/scoringCriteria 完備）
- 型定義に `essay-text` を追加し、AfternoonPlayer / AfternoonResultView を essay-text 対応
- 採点API のシステムプロンプト＋maxTokens を論述式向けに拡張

### 第2弾（2026-04-25 / branch: claude/peaceful-kalam-d10de5）

- FE / DB / NW 各 1 大問（2024春）を新規追加。各5設問・配点合計100の Claude 品質キュレーション
- `SUPPORTED_AFTERNOON_EXAMS` を `["ap","st"]` → `["ap","st","fe","db","nw"]` に拡張
- `lib/afternoon/load.ts` に 3 試験のバレルを統合
- FE は「FEレベルの記述式練習」位置付け（本試験はCBT科目B）。ファイル冒頭・index・本ドキュメントに明記
- typecheck / build いずれも green

### 第3弾（2026-04-25 / branch: claude/elastic-williams-8107df）

- SC / ES / PM 各 1 大問（2024春）を新規追加
  - SC 2024春午後I: クレデンシャル・スタッフィング攻撃／ECサイト対策（5設問・配点100）
  - ES 2024春午後I: 電動アシスト自転車のRTOS制御ファームウェア改修（5設問・配点100）
  - PM 2024春午後II: 不確実性の高い要求への対応（設問ア800字／イ1600字／ウ1200字、論述例完備）
- `SUPPORTED_AFTERNOON_EXAMS` を `["ap","st","fe","db","nw","sc","es","pm"]` に拡張
- `lib/afternoon/load.ts` に 3 試験のバレルを統合
- PM 論述は ST 同様に compositionPoints / scoringCriteria / scoringRubric (A/B/C 3段) を完備
- typecheck / build いずれも green
- 残作業: SA / AU / SM 午後II 論述、各試験の量的拡充（過去5年分）

### 第4弾 / Phase 4（2026-04-25 / branch: claude/heuristic-wright-6bbd10）

- SA / AU / SM 各 1 大問を新規追加（いずれも論述式・設問ア・イ・ウ完備）
  - SA 2024春午後II: 業務のデジタル化を実現するシステムアーキテクチャ設計（方式比較3案＋採用判断）
  - AU 2024秋午後II: クラウドサービスの利用に関する監査（リスクアセスメント／重点監査3項目／指摘事項3点）
  - SM 2024秋午後II: 重大なインシデントの早期解決と再発防止（時系列対応／根本原因分析／4層再発防止）
- `SUPPORTED_AFTERNOON_EXAMS` を `["ap","st","fe","db","nw","sc","es","pm","sa","au","sm"]` に拡張
- `lib/afternoon/load.ts` に 3 試験のバレルを統合
- 論述は ST 同様に compositionPoints / scoringCriteria / scoringRubric (A/B/C 3段) を完備
- typecheck / build いずれも green
- これで論述式試験（ST/PM/SA/AU/SM）は全 5 区分が出題可能に
- 残作業: 各試験の量的拡充（過去5年分）／IP・SG 午後（午前のみ試験のため対象外）
