# 管理栄養士・直近2回の公式資料監査

確認日：2026-11-03。作業ブランチ：`claude/gracious-hawking-c4ic14`。

## 判定と追加問数

| 資格 | 対象回 | 追加問数 | 判定 |
| --- | --- | ---: | --- |
| 管理栄養士国家試験 | 第40回（2026年）・第39回（2025年） | 0 | 追加見送り。第39回の問題全文を公式PDFで確認できず、直近2回全問の公式資料を揃えられなかったため。 |

ユーザー指定「公式に全問が公開されていない資格は追加せず理由を報告」に従う。今回確認できた範囲では第39回の全問の公式公開先を確認できなかった。過去に公開されなかったという意味でも、あらゆる公式URLの不存在を証明するという意味でもない。旧URLの取得失敗と、現行公式案内・検索で代替を確認できなかったことによる判定である。

資格の新規登録、ルーティング、資格一覧、公開前ステージングへのデータ追加は実施していない。第40回だけの部分追加や古い回への置換は行わない。問題文・選択肢・解説・図版の登録および各問の正答照合は未実施であり、全問照合完了とは扱わない。類題・生成問題・第三者転載による補完も0問。

## 対象回の根拠（厚生労働省）

- [管理栄養士・栄養士関係](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000089299.html)：現行の試験問題欄は第40回を案内。
- [第40回の問題および正答](https://www.mhlw.go.jp/stf/newpage_17056.html)：午前・午後・正答の公式PDFへのリンクを確認。ページは回ごとに固定された履歴ではなく、現在は第40回の内容。
- [第41回の施行について](https://www.mhlw.go.jp/kouseiroudoushou/shikaku_shiken/kanrieiyoushi/index.html?newwindow=true)：試験日は2027年2月28日。確認日時点で未実施なので対象外。
- [第39回の結果](https://www.mhlw.go.jp/content/10904750/001466573.pdf)：2025年3月2日実施、200点満点の試験であることを確認。第40回の前回を第39回と特定。

## 公式資料の取得結果

Python requests によるHTTP GETで確認。200のPDFはローカル一時領域に取得し、pdftotextで表題・収録範囲を確認した。原本はリポジトリに追加していない。

| 資料 | URL | HTTP | 確認内容 |
| --- | --- | --- | --- |
| 第40回午前 | https://www.mhlw.go.jp/content/10900000/001663681.pdf | 200 | 39ページ。表紙に問1〜97の97問と記載。 |
| 第40回午後 | https://www.mhlw.go.jp/content/10900000/001663682.pdf | 200 | 58ページ。問98〜200の103問。 |
| 第40回正答 | https://www.mhlw.go.jp/content/10900000/001683038.pdf | 200 | 1ページ。第40回の正答一覧。 |
| 第39回午前・旧URL | https://www.mhlw.go.jp/content/10900000/001428960.pdf | 404 | 問題PDFを取得不可。 |
| 第39回午後・旧URL | https://www.mhlw.go.jp/content/10900000/001428961.pdf | 404 | 問題PDFを取得不可。 |
| 第39回正答 | https://www.mhlw.go.jp/content/10904750/001466575.pdf | 200 | 1ページ。第39回の正答一覧（問1〜200）。問題本文の代用にはしない。 |

第39回の旧問題URLは第三者の出典記載を探索の手掛かりとして発見し、取得可否は上記公式ホストへ直接アクセスして確認した。第三者の問題文・解説・模範解答は収録根拠として採用していない。

代替公開先を調べるため、厚生労働省の現行案内を読み、公式ドメイン内で回名・午前／午後・旧ファイル名を検索した。さらに次の別パスもGETしたが、全て404だった（別パスは探索候補であり、公式リンクとしての存在確認ではない）。

- https://www.mhlw.go.jp/content/10904750/001428960.pdf
- https://www.mhlw.go.jp/content/10904750/001428961.pdf
- https://www.mhlw.go.jp/content/001428960.pdf
- https://www.mhlw.go.jp/content/001428961.pdf

取得成功PDFのSHA-256：

| 資料 | SHA-256 |
| --- | --- |
| 第40回午前 | `6af5a86ec967b84cfa3deeeb96ffdfc92bb5f857577e424fce3cb48e5b07bf42` |
| 第40回午後 | `4d1b1a6d840873af4669d20fb4dc1111a67083b62de068a342075a63d58af6e5` |
| 第40回正答 | `776ae04b59cfe7c3706c9482b3eb4c3c9dae9eebdfd817906a8281619bf93de2` |
| 第39回正答 | `560c7080d9e9de692df65a2f701acc5427b61a4c6f5317a13c1573d4dd650959` |
| 第39回結果 | `f059851f55f900fcc7ed8fc388c4e0c76d3504173314f4837349c5263569eaf3` |

## 既存追加方式の調査

- `data/questions/shino-kunrenshi/index.ts` など：資格別JSONをQuestion配列として読み込み、照合済み候補を抽出。
- `lib/questions/types.ts`、`lib/exam-config.ts`：資格コード・試験科目・年度範囲の登録。
- `lib/qualifications/catalog.ts`：資格一覧と公開判定の単一台帳。`isExamPublished` が `live` の外部資格を公開。
- `data/questions/index.ts`、`lib/questions/get-questions.ts`：公開判定を介して一括・遅延取得の両経路を制御。
- `data/questions/riyoshi/release.json`、`lib/riyoshi/publication.ts`、`data/qualification-staging/sagyo-ryohoshi/`：公開前候補・承認対象の分離例。
- `lib/questions/display.ts`、`lib/home/home-directory.ts`、`lib/seo/exam-meta.ts`：選択肢表示・資格導線・メタデータ。

今回は全問の公式資料を取得できない資格を追加しない条件が先に適用されるため、これらの登録は変更しない。

## 除外と再開条件

- 第39回：200問すべて未収録。午前・午後の公式問題PDFを取得できず原文照合不能。
- 第40回：200問すべて未収録。単独回としては資料取得できたが、今回指定の直近2回を揃えられず資格全体を見送り。
- 第41回：未実施のため対象外。
- 再開には、第39回の全問を収録した厚生労働省の公式PDFの公開先確認が必要。その後、2回分の本文・全選択肢・共通設例・図表・正答を照合し、独自解説（法令問題は出題時点の法令と明記）を準備して未公開で登録する。

## 検証

- `pnpm install`：成功。
- `pnpm validate:questions`：成功。26,444問、エラー0、既存警告16,808。
- `pnpm typecheck`：初回はNode既定ヒープ上限でOOM（終了134）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し成功。ソースコード変更は不要だった。
- `pnpm exec vitest run __tests__/questions/medical44-prepublication.test.ts __tests__/questions/get-questions.test.ts __tests__/exam-catalog-browser.test.tsx __tests__/lib/home-directory.test.ts`：4ファイル・108テスト成功。
- 先行の `pnpm test -- <対象ファイル>` はVitestへの引数の渡し方により全体テストを開始したため中断し、上記の対象指定コマンドで実行し直した。全体テスト成功とは扱わない。

`pnpm build`、デプロイ、Vercel、PR作成、mainへのpushは実施しない。秘密値はレポートに記録しない。
