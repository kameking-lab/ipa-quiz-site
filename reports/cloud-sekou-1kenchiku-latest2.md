# 1級建築施工管理技術検定（第一次検定）直近2回の監査

確認日：2026-11-03 UTC。

## 今回の結果

**令和8年度72問・令和7年度72問、計144原問を未公開（ステージング）で収録。除外0問、596肢の独自解説、必要図9問分を追加した。監督役による独立レビューは未実施。公開判定は変更していない。**

この報告は、転載禁止を理由に0問で停止した旧監査と、その後の403による取得保留の報告を置き換える。最新のユーザー指示によりオーナー権利確認済みとして収録を進めた。今回提供された公式PDFは取得済みであり、403は現在の保留理由ではない。取得拒否・ログイン・CAPTCHAの迂回は行っていない。

## 対象回と公式根拠

実施機関は一般財団法人建設業振興基金 試験研修本部。

公式の[過去の受検状況・検定問題・合格基準](https://www.fcip-shiken.jp/about/index.html)で「建築施工管理技術検定／1級／第一次検定」の現行掲載が令和8年度であることを再確認した。同じ行の令和7年度・臨時試験のリンクは第二次検定であり、第一次検定の回として流用していない。

公式の[年度日程表](https://www.fcip-shiken.jp/about/schedule.html)には令和8・7年度の実施日程が掲載されている。[令和8年度日程](https://www.fcip-shiken.jp/pdf/year_schedule.pdf)・[令和7年度日程](https://www.fcip-shiken.jp/pdf/year_schedule_r7.pdf)と両PDF表紙の年度・検定区分・実施日を照合し、対象を以下の2回とした。令和7年度問題PDFは既存監査・提供MANIFESTの公式URLを使用しており、年度文字列の推測による選定ではない。

| 対象回 | 実施日 | 公式問題・正答合冊PDF | 頁数／正答頁 | 公式出題数 | 追加数 | 除外 |
| --- | --- | --- | --- | --- | --- | --- |
| 令和8年度 第一次検定 | 2026-07-19 | [r08_1kg_mondai.pdf](https://www.fcip-shiken.jp/pdf/r08_1kg_mondai.pdf) | 38／38 | 72 | 72 | 0 |
| 令和7年度 第一次検定 | 2025-07-20 | [r07_1kg_mondai.pdf](https://www.fcip-shiken.jp/pdf/r07_1kg_mondai.pdf) | 39／39 | 72 | 72 | 0 |

各回は午前No.1–44の44問、午後No.45–72の28問。受検者が解答するのは各60問であり、出題総数72問と区別する。No.51–60は5肢、それ以外は4肢で、各回298肢、合計596肢。午前No.21–30と31–40の選択解答数は、令和8年度が7問・8問、令和7年度が8問・7問である。

## 原本・本文・正答・図の照合

最初に `/tmp/srcpdf/sekou-1kenchiku/MANIFEST.json` とPDF実体のSHA256を照合し、両方一致を確認した。原本は `.gitignore` 対象の `data/raw_pdfs/sekou-1kenchiku/` にも複製した。

| 原本 | SHA256 |
| --- | --- |
| r08_1kg_mondai.pdf | `a34ae1cd5145e08882932e552e596a8e6f94bb31bbb6777081587c7637c03eac` |
| r07_1kg_mondai.pdf | `ee93b4002a986217958bd4b396bacaf581a929e1b4747949e44bebefe7918ab6` |

- 全144問の問題文・選択肢は公式PDFの本文から抽出して収録した。ルビ、強調の傍点、改行・空白は整理し、分数を横書き、指数を上付き文字にした。通常の文字抽出ではフォントとルビの影響で欠落したため、PyMuPDFの文字座標とサイズから本文を取り出し、分数・上下付き文字・空欄をレンダリングと照合して補正した。
- 数字の選択肢1–5をア・イ・ウ・エ・オに対応させた。図だけで提示される選択肢は図番号をテキストで明示し、実際の公式選択肢図を併用した。架空の選択肢や類題は作成していない。
- 正答は両年の最終頁をレンダリングし、全72問ずつ目視転記した。[独立した正答転記表](sekou-1kenchiku-latest2/official-answer-key.json)を元に、変換後の全144問の採点キーをテストで照合した。[令和7年度正答頁](sekou-1kenchiku-latest2/2025-official-answers.png)・[令和8年度正答頁](sekou-1kenchiku-latest2/2026-official-answers.png)も監査証跡に保存した。
- **令和7年度No.57は公式訂正で3または4のいずれも正答。** `answer: ["ウ", "エ"]` と `requiredSelections: 1` を用い、どちらか1肢の選択で正解、2肢同時選択は正解としないことをテストした。訂正を無視して3だけを採点する実装にはしていない。
- 必要図は令和8年度No.5・11・12・51、令和7年度No.2・5・7・11・12。問題文・文字選択肢はテキストで保持し、図の必要部分のみ切り出した。9問・11PNGを `public/questions/sekou-1kenchiku/` に保存し、`hasImage` を付けた。[図版台帳](sekou-1kenchiku-latest2/figures.json)に原本頁・切出し座標・画像SHA256を記録した。
- 各問に公式問題URL・正答頁URLと出典表示を保持した。解説は596肢すべて独自作成で、公式の解説と誤認させない表示にした。法令に関する箇所は出題時点の法令に基づく旨を各問の解説に明記した。現在の法令をそのまま過去の採点へ遡及適用しない。

追加確認に用いた一次資料には、[国土交通省・公共建築工事標準仕様書](https://www1.mlit.go.jp/common/001472794.pdf)、[国土交通省・建設機械施工安全マニュアル](https://www.thr.mlit.go.jp/bumon/b00097/k00910/jikogaiyou/kensetsukikaisekouanzenmanyuaru.pdf)、[国土交通省・植栽の寸法定義](https://www.mlit.go.jp/tec/constplan/content/001984209.pdf)、[厚生労働省・クレーン等安全規則](https://www.mhlw.go.jp/web/t_doc?dataId=74020000&dataType=0)がある。正答の採点根拠は常に上表の対象回公式PDFである。

## 重複確認と既存方式への統合

作業前に `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を確認した。同資格の台帳行と旧0問監査は存在したが、令和7・8年度の問題データはなかった。ユーザー補足に従い、旧監査は重複成果と扱わず更新した。

originの `claude/*`・`qual/*`・`codex/*` を取得し、388ブランチ、220種の `data/questions` ツリーと69種の `data/exam-library` ツリーをそれぞれ走査した。問題データ・試験ライブラリに同資格・同年度の既存成果はない。唯一の文字列一致は別資格shuwaのブランチ一覧内の旧監査ブランチ名であり、問題成果ではない。[重複走査結果](sekou-1kenchiku-latest2/duplicate-scan.json)を保存した。

類似資格 `data/questions/civil1`・`zoen1` の年度JSON＋`index.ts`による変換方式と、資格台帳の `isExamPublished` に従った。

- データ：`data/questions/sekou-1kenchiku/2025-july.json`・`2026-july.json`、変換・検証用エクスポートは `index.ts`。
- 登録：`ExamCode`、試験設定、名称、SEO名称、同期・遅延問題ローダーに登録。年度・午前午後・原問番号で一意なIDとルートを設定。
- ステージング：既存台帳slug `sekou-kenchiku1` にexamCode `sekou-1kenchiku` を対応させ、statusは未公開の `ready-to-ingest` を維持。公開一覧・同期問題集合・遅延ローダーはすべて既存の公開判定を通す。資格一覧の公開済み区分やサイトマップへ追加しないことをテストした。
- `data/exam-library` は既存成果確認を実施済み。一般公開の別カタログに未公開教材を重複登録せず、出典は各問と監査MANIFESTで保持。
- 未公開でも全問検証されるよう `scripts/validate-questions.ts` の検証集合に明示的に追加した。

公式ページ末尾の転載禁止表示「本サイトに掲載されている記事・写真・図表などの転載を禁じます。」を確認した。依頼中のオーナー決定（権利確認済み）に従い記録にとどめ、停止・除外理由にはしていない。ライセンス識別子 `FCIP-owner-authorized` はこの依頼におけるオーナー確認を表し、一般向けの自由転載許諾を主張するものではない。

## 検証・レビュー

- `pnpm install`：終了コード0。読取り専用の共有ストアで他OS向けoptionalパッケージ取得の警告が出たが、検証に必要な依存は利用可能。
- `pnpm validate:questions`：全26,588問、ok=26,588、fail=0。既存データにwarn=16,808あり。今回の追加144問はエラー・警告とも0。
- `pnpm validate:questions --exam=sekou-1kenchiku`：144問、ok=144、fail=0、warn=0。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。
- 関連テスト7ファイルのうち既存6ファイル1,184テストは成功。追加6テストの初回検証で解説1肢の短さを検出し、建築基準法の根拠を補足して修正。追加テストの再実行は6/6成功。さらに力学図の支点条件を最終照合し、令和7年度No.11の反力の解説を補正した後も6/6成功。合計1,190テストが修正後の対象範囲で成功。新規テストは `__tests__/questions/sekou-1kenchiku-latest2.test.ts`。既存の関連テストは `accepted-answers`、`exam-config-integrity`、`get-questions`、`qualification-expansion`、`question-url`、`exam-meta-description`。
- `git diff --check`：既存CRLFファイルを考慮した `-c core.whitespace=cr-at-eol` で成功。
- `pnpm build`、デプロイ、Vercel操作、PR作成、mainへのpushは実行していない。

**独立レビューは最新指示どおり作者から呼ばず、監督役が別プロセスで実施する。未実施のレビューを合格済みとは報告しない。** 監督役は対象PDF、正答転記表、全肢解説、図版台帳、公開ゲートの回帰テストを独立に確認し、指摘修正後に再レビューで合格させる。この確認が残るため、公開前ゲートは維持している。

作業環境の `.git` が読み取り専用のため、Gitの取得・コミット・pushには書込み可能な `/tmp/sekou-1kenchiku-git/.git` と本作業ツリーの組合せを使用する。対象は `codex/cloud-sekou-1kenchiku-latest2` のみ。元作業ツリーHEAD `abe234ef` とリモート既存HEAD `f6a7c4e7` は同一内容のツリーであり、後者を親として今回の資格追加を1コミットにまとめる。
