# kanri-eiyoshi レジストリ差分（未反映・親が反映）

## 共通の前提（親が直列で反映する）
- 本ブランチはステージング JSON（`data/qualification-staging/<slug>/`）のみを追加し、共有レジストリは編集していない。
- 公開に切り替える場合は、`data/questions/<slug>/index.ts` でステージング JSON を `Question` 型に写す薄いアダプタを作り
  （`publicAllowed`・`publicationStatus`・`explanationConfidence`・`explanationNotes`・`sourceTextSha256` 等のステージング専用項目は落とす）、
  下記スニペットを各共有ファイルへ追加する。オーナーの公開指示があるまで `catalog.ts` の status は `ready-to-ingest` のままにする。

## 注意：既存ブランチとの関係
`origin/codex/kanri-eiyoshi-20261010`（未マージ）は午前17問と共有レジストリの変更を含む。本ブランチの200問で置き換え、
そのブランチは取り込まないこと（同じ examCode を二重定義しない）。

## lib/questions/types.ts
- `ExamCode` に `| "kanri-eiyoshi"` を追加。license は既存の `"MHLW-attributed"`、Session `am`/`pm`、Season `annual` は既存値。

## lib/exam-config.ts
```ts
"kanri-eiyoshi": { code: "kanri-eiyoshi", nameFull: "管理栄養士国家試験", urlSlug: "kanri-eiyoshi", level: "specialist", sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 97, label: "午前", categories: [] }, { session: "pm", urlSlug: "pm", expectedQuestions: 103, label: "午後", categories: [] }], seasons: ["annual"], yearRange: { start: 2026, end: 2026 } },
```
（categories は公開時にステージング JSON の `category` 値から生成する。）

## lib/qualifications/catalog.ts
```ts
{
    slug: "kanri-eiyoshi", examCode: "kanri-eiyoshi", shortName: "管理栄養士", fullName: "管理栄養士国家試験",
    domain: "welfare", administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/stf/newpage_17056.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html", status: "ready-to-ingest",
    stagingDataPath: "data/qualification-staging/kanri-eiyoshi",
    reuseSummary: "第40回（令和8年3月1日）の全200問を収録。公式問題・正答、全肢の独自解説、表・図・構造式は原本ページ画像を併記。第39回は公式の問題PDFが削除済みのため未収録。",
    attributionTemplate: "出典：厚生労働省 第40回管理栄養士国家試験 午前／午後 問○。解説は過去問AIの独自作成。",
    remainingWork: ["第39回：問題PDFが公式で404。保存コピー利用はオーナー判断待ち", "公開用の試験区分設定とローダー接続（公開指示が必要）"],
},
```
（officialReuseTermsUrl は厚労省サイトの著作権ページ想定。公開前に URL の到達を確認すること。）

## lib/seo/exam-meta.ts / lib/utils.ts / lib/home/home-directory.ts
```ts
  "kanri-eiyoshi": "第40回の全200問を収録。公式問題・正答・全肢の独自解説と原本図表。",
  "kanri-eiyoshi": "管理栄養士",
  "kanri-eiyoshi": (count) => "管理栄養士の公開演習" + count + "問。" + "第40回の全200問を収録。公式問題・正答・全肢の独自解説と原本図表。",
  {"code": "kanri-eiyoshi", "name": "管理栄養士", "sub": "公式問題・正答・独自解説と原本図表を収録", "domain": "welfare"},
```
