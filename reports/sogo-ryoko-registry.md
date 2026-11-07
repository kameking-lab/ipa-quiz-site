# sogo-ryoko レジストリ差分（未反映・親が反映）

## 共通の前提（親が直列で反映する）
- 本ブランチはステージング JSON（`data/qualification-staging/<slug>/`）のみを追加し、共有レジストリは編集していない。
- 公開に切り替える場合は、`data/questions/<slug>/index.ts` でステージング JSON を `Question` 型に写す薄いアダプタを作り
  （`publicAllowed`・`publicationStatus`・`explanationConfidence`・`explanationNotes`・`sourceTextSha256` 等のステージング専用項目は落とす）、
  下記スニペットを各共有ファイルへ追加する。オーナーの公開指示があるまで `catalog.ts` の status は `ready-to-ingest` のままにする。

## lib/questions/types.ts
- `ExamCode` に `| "sogo-ryoko"`、license に `| "JATA-owner-authorized"`（validate-questions の z.enum も）。
- Session `hoki`・`yakkan`、Season `annual` は既存値。複数選択の採点は chiiki-ryoko と同じく `answer` 配列＋`requiredSelections`。

## lib/exam-config.ts
```ts
"sogo-ryoko": {"code": "sogo-ryoko", "nameFull": "総合旅行業務取扱管理者", "urlSlug": "sogo-ryoko", "level": "specialist", "sessions": [{"session": "hoki", "urlSlug": "hoki", "expectedQuestions": 25, "label": "旅行業法令", "categories": ["旅行業法令"]}, {"session": "yakkan", "urlSlug": "yakkan", "expectedQuestions": 30, "label": "約款", "categories": ["約款"]}], "seasons": ["annual"], "yearRange": {"start": 2025, "end": 2026}},
```

## lib/qualifications/catalog.ts
```ts
{
    slug: "sogo-ryoko", examCode: "sogo-ryoko", shortName: "総合旅行業務取扱管理者", fullName: "総合旅行業務取扱管理者試験",
    domain: "personal-services", administrator: "一般社団法人日本旅行業協会",
    officialQuestionsUrl: "https://www.jata-net.or.jp/seminar/page-41637/exam_xaminationquestion/",
    officialReuseTermsUrl: "https://www.jata-net.or.jp/seminar/page-41637/exam_xaminationquestion/", status: "ready-to-ingest",
    stagingDataPath: "data/qualification-staging/sogo-ryoko",
    reuseSummary: "令和8・7年度の旅行業法令・約款110問を収録。「すべて選ぶ」は全選択一致で採点。国内旅行実務・海外旅行実務は未収録。問題・正答は公式原本、解説は過去問AIの独自作成です。",
    attributionTemplate: "出典：一般社団法人日本旅行業協会 令和○年度総合旅行業務取扱管理者試験 科目 問○。解説は過去問AIの独自作成。",
    remainingWork: ["国内旅行実務（各年32問）・海外旅行実務（各年52問）の転記・解説", "公開用の試験区分設定とローダー接続（公開指示が必要）"],
},
```

## lib/seo/exam-meta.ts / lib/utils.ts / lib/home/home-directory.ts
```ts
  "sogo-ryoko": "令和8・7年度の旅行業法令・約款110問を収録。「すべて選ぶ」は全選択一致で採点します。",
  "sogo-ryoko": "総合旅行業務取扱管理者",
  "sogo-ryoko": (count) => "総合旅行業務取扱管理者の公開演習" + count + "問。" + "令和8・7年度の旅行業法令・約款110問を収録。「すべて選ぶ」は全選択一致で採点します。",
  {"code": "sogo-ryoko", "name": "総合旅行業務取扱管理者", "sub": "旅行業法令・約款の公式問題・正答・独自解説", "domain": "money"},
```
（home-directory の domain は chiiki-ryoko と同じ値に揃えた。）
