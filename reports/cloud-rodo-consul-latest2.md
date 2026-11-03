# 労働安全・労働衛生コンサルタント／作業環境測定士 直近2回監査

確認日: 2026-11-03。現在の `claude/loving-goodall-df47l4` ブランチのみを使用。

## 追加方式の確認

- `data/questions/eisei1`・`eisei2`: 原文・選択肢・公式正答・独自解説・問別出典URLをJSONに保持し `index.ts` から公開する。
- `lib/qualifications/catalog.ts` を公開判定の台帳として使用。`live` 以外は通常の資格一覧・演習・資格ルートに公開しない。
- 登録箇所は `lib/questions/types.ts`、`lib/exam-config.ts`、`data/questions/index.ts`、`lib/questions/get-questions.ts`。公開前候補も `scripts/validate-questions.ts` から検証する。
- 別系統の `data/exam-library` と `/e-learning/exams/qualifications/*` には対象3資格の既存コンテンツがある。今回の新規資格収録と区別し、既存公開内容は変更しない。
- [リンク条件](https://www.exam.or.jp/h_link/)はリンク許可の説明であり、転載の包括許諾とは扱わない。確認した公表一覧と取得PDFのテキストに転載・複製禁止の明記は見つからなかった。著作権の放棄を意味しない。

## 労働安全コンサルタント

追加 **0問**。資格単位で除外し、非公開の判断台帳のみ登録。

[公式公表一覧](https://www.exam.or.jp/cskohyo/)の掲載2回は **令和7年10月21日（2025-10-21）・令和6年10月22日（2024-10-22）実施分**。2026年度を推測で直近回に含めない。

掲載科目は産業安全一般・産業安全関係法令・機械安全・電気安全・化学安全・土木安全・建築安全。PDF全14冊を取得確認。例: [2025年産業安全一般](https://www.exam.or.jp/wp-content/uploads/2025/11/CS20251901.pdf)、[2024年産業安全一般](https://www.exam.or.jp/wp-content/uploads/2024/12/CS20241901.pdf)。

除外理由: [資格紹介](https://www.exam.or.jp/introduction/h_shokaiconsul/)・[公式FAQ](https://www.exam.or.jp/faq04/)では筆記と口述の双方がある一方、公表一覧には筆記科目だけが掲載され、口述問題の掲載はない。「公式に全問が公開されていない資格は問題本文を収録しない」を資格全体に適用した判断である。筆記の問題が欠落しているという意味ではない。また公式一覧は記述式に正答の記載がないことを明記する。これを独自の正答で補完しない。

検証: `pnpm install` 後、`pnpm validate:questions`・`pnpm typecheck`・既存安全衛生ハブ／資格登録関連テストを実施（結果は末尾に記録）。ビルド・デプロイ・PR作成は実施しない。

## 労働衛生コンサルタント

追加 **0問**。資格単位で除外し、非公開の判断台帳のみ登録。

[公式公表一覧](https://www.exam.or.jp/cskohyo/)の掲載2回は **令和7年10月21日（2025-10-21）・令和6年10月22日（2024-10-22）実施分**。

掲載科目は労働衛生一般・労働衛生関係法令・健康管理・労働衛生工学。PDF全8冊を取得確認。例: [2025年労働衛生一般](https://www.exam.or.jp/wp-content/uploads/2025/11/CS20251908.pdf)、[2024年労働衛生一般](https://www.exam.or.jp/wp-content/uploads/2024/12/CS20241908.pdf)。

除外理由: 労働安全コンサルタントと同じく、筆記・口述のうち公表一覧にあるのは筆記問題だけで、口述問題の掲載はない。ユーザー指定の全問公開条件を資格全体に適用。健康管理・労働衛生工学の記述式には公式正答がなく、独自解答を公式正答として登録しない。筆記の択一問題自体が未公開という意味ではない。

## 作業環境測定士（第一種・第二種）

追加 **360問**（9科目×2掲載回×各20問）。資格台帳は `terms-review-required` とし未公開ステージング。除外問題0問。第一種の共通科目と第二種の問題を二重計上していない。第一種選択科目の5分野は各分野の原問として保存する。

[公式公表一覧](https://www.exam.or.jp/emkohyo/)から実際のリンクを追跡。共通科目の直近2回は **令和8年8月19日・令和8年2月17日**。第一種選択科目の直近2回は **令和8年8月20日・令和7年8月21日**。2月のリンクは拡張子なしのURLからPDFが直接返る。全科目を同一年度・同一回と推定しない。

| 科目 | 最新掲載分 | 一つ前の掲載分 | 追加問数 |
| --- | --- | --- | ---: |
| 労働衛生一般 | [2026-08-19](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261801.pdf) | [2026-02-17](https://www.exam.or.jp/20260217/) | 40 |
| 労働衛生関係法令 | [2026-08-19](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261802.pdf) | [2026-02-17](https://www.exam.or.jp/20260217-2/) | 40 |
| デザイン・サンプリング | [2026-08-19](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261803.pdf) | [2026-02-17](https://www.exam.or.jp/20260217-3/) | 40 |
| 分析に関する概論 | [2026-08-19](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261804.pdf) | [2026-02-17](https://www.exam.or.jp/20260217-4/) | 40 |
| 有機溶剤 | [2026-08-20](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261805.pdf) | [2025-08-21](https://www.exam.or.jp/wp-content/uploads/2025/08/EM20251805.pdf) | 40 |
| 鉱物性粉じん | [2026-08-20](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261806.pdf) | [2025-08-21](https://www.exam.or.jp/wp-content/uploads/2025/08/EM20251806.pdf) | 40 |
| 特定化学物質 | [2026-08-20](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261807.pdf) | [2025-08-21](https://www.exam.or.jp/wp-content/uploads/2025/08/EM20251807.pdf) | 40 |
| 金属類 | [2026-08-20](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261808.pdf) | [2025-08-21](https://www.exam.or.jp/wp-content/uploads/2025/08/EM20251808.pdf) | 40 |
| 放射性物質 | [2026-08-20](https://www.exam.or.jp/wp-content/uploads/2026/08/EM20261809.pdf) | [2025-08-21](https://www.exam.or.jp/wp-content/uploads/2025/08/EM20251809.pdf) | 40 |

原本照合: 公式一覧から18冊を再取得し、全冊のSHA-256が既存 `official-catalog.json` と目視確認済み `reviewed-answer-keys.json` のハッシュに一致することを確認した。その原本に対応する既存 `papers`・`presentation` の原文、5肢、問番号・掲載ページ・正答を対応付けた。問題文・選択肢はテキストで保持し、図表が必要な15問のみ既存の必要部分の画像を併用して `hasImage: true`。原問全体の画像に置き換えない。図のみで印刷された選択肢は既存の説明テキストと原図を併用。

出典と来歴は [source-audit.json](../data/questions/sagyo-kankyo-sokuteishi/source-audit.json) に18冊分の実施日・科目・取得URL・原本ハッシュ・公式正答列・各問の原文ハッシュ・原問ID・ページを記録。公式正答の○がベクター描画のPDFもあるため、テキスト抽出に○がないことを「正答非公表」と誤認せず、原本ハッシュが一致した目視確認済み正答表を使用した。

解説は既存の過去問AI独自解説を利用し、349問は全肢解説、11問は公式正答に対応する一般解説を保持。一般解説を公式の解説とは表示しない。古い解説の「正答非公表」「参考解答」という記述は今回確認した公式正答の扱いに修正した。各問に出題時点の法令・制度である旨と実施日、問題・正答の公式URL、出典表記を付けた。類題・生成問題の追加は0問。

通常の `QUESTIONS_BY_EXAM`、遅延ローダー、公開資格一覧からは除外し、検証スクリプトにはステージング360問を明示追加。既存の動的資格ルーティングと同じ公開ゲートを使用し、新しい公開ルートは作らない。全科目の通し `qNumber` と公式冊子内番号 `officialAnswerNumber` を分けて、同年同月の異科目でIDが衝突するのを防ぐ。


## 完了確認（2026-11-03）

既存の資格別コミットを引き継いで最終検証を完了した。労働安全コンサルタントは `b23dcba8`、労働衛生コンサルタントは `644d279e` に除外監査を記録済み。作業環境測定士360問の登録は `f95b33e4` にあり、本監査の追記で作業中状態の検証を完了する。今回も現在の `claude/loving-goodall-df47l4` ブランチだけを使用する。

- 公式の公表一覧2ページを再確認し、上記の科目別掲載回が変わっていないことを確認。
- 作業環境測定士18冊を公式URLから再取得し、全冊のSHA-256が `source-audit.json` と一致。PDF抽出テキストに「転載禁止」「複製禁止」「無断転載」「無断複製」の表記なし。公式一覧・リンク条件にも転載・複製禁止の明記を確認できなかった。
- `pnpm install`: 成功。
- `pnpm validate:questions`: 成功（26,804問、エラー0、警告16,809）。今回の測定士データでは2月・分析に関する概論問2（通し番号62）の解説が不安表現検出の警告に該当する（流量表記の有効桁数が不明である旨）。計算値と公式正答に対応した説明を保持しており、検証エラーではない。
- `pnpm typecheck`: 成功。
- 関連テスト: `pnpm exec vitest run __tests__/questions/sagyo-kankyo-latest-two.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/seo/safety-qualification-hubs.test.ts __tests__/exam-qualification-hubs.test.ts` が **5ファイル・1,084テスト成功**。360問の本文・選択肢・公式正答対応、18冊の原本ハッシュと正答台帳、必要図のファイル存在、ID重複防止、公開一覧・通常演習・遅延ローダーからの除外を確認。
- 最初の `pnpm test -- ...` は引数がフィルターとして渡らず全件実行になったため途中停止し、上記の明示的な5ファイル指定で実行し直した。全件テストの完走を検証結果に含めない。

最終収録数: 労働安全コンサルタント0問、労働衛生コンサルタント0問、作業環境測定士360問（未公開）。ビルド・PR作成・デプロイ・Vercel操作・mainへのpushは実施していない。
