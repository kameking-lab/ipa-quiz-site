# career-consultant レジストリ差分（未反映・親が反映）

## 共通の前提（親が直列で反映する）
- 本ブランチはステージング JSON（`data/qualification-staging/<slug>/`）のみを追加し、共有レジストリは編集していない。
- 公開に切り替える場合は、`data/questions/<slug>/index.ts` でステージング JSON を `Question` 型に写す薄いアダプタを作り
  （`publicAllowed`・`publicationStatus`・`explanationConfidence`・`explanationNotes`・`sourceTextSha256` 等のステージング専用項目は落とす）、
  下記スニペットを各共有ファイルへ追加する。オーナーの公開指示があるまで `catalog.ts` の status は `ready-to-ingest` のままにする。

## lib/questions/types.ts
- `ExamCode` に `| "career-consultant"` を追加。
- `license` の union に `| "CAREER-SHIKEN-owner-authorized"` を追加（`scripts/validate-questions.ts` の z.enum にも同じ値）。
- Session `gakka`、Season `autumn`（第33回・11月）/`july`（第32回）は既存値で足りる。

## lib/exam-config.ts
```ts
"career-consultant": { code: "career-consultant", nameFull: "国家資格キャリアコンサルタント試験（学科）", urlSlug: "career-consultant", level: "specialist", sessions: [{ session: "gakka", urlSlug: "gakka", expectedQuestions: 50, label: "学科試験", categories: ["キャリアコンサルティングの社会的意義", "キャリアコンサルティングを行うために必要な知識", "キャリアコンサルティングを行うために必要な技能", "キャリアコンサルタントの倫理と行動"] }], seasons: ["autumn", "july"], yearRange: { start: 2026, end: 2026 } },
```
（categories は解説執筆時の分類名と一致しないものがあるため、公開時に `category` 値の一覧で置き換えること。）

## lib/qualifications/catalog.ts
```ts
{
    slug: "career-consultant", examCode: "career-consultant", shortName: "キャリアコンサルタント（学科）", fullName: "国家資格キャリアコンサルタント試験 学科試験",
    domain: "welfare", administrator: "特定非営利活動法人キャリアコンサルティング協議会・特定非営利活動法人日本キャリア開発協会",
    officialQuestionsUrl: "https://www.career-shiken.org/about/learninfo/",
    officialReuseTermsUrl: "https://www.career-shiken.org/about/learninfo/", status: "ready-to-ingest",
    stagingDataPath: "data/qualification-staging/career-consultant",
    reuseSummary: "第33回（2026年11月）・第32回（2026年7月）の学科試験各50問、計100問。公式問題・正答と全肢の独自解説を収録。問題用紙の「無断転載・無断複製を禁ず」はオーナー決定に基づき記録のみ。",
    attributionTemplate: "出典：キャリアコンサルティング協議会・日本キャリア開発協会 2026年度第○回国家資格キャリアコンサルタント試験 学科試験 問○。解説は過去問AIの独自作成。",
    remainingWork: ["公開用の試験区分設定とローダー接続（公開指示が必要）", "実技（論述・面接）は対象外"],
},
```

## lib/seo/exam-meta.ts
```ts
  "career-consultant": "第33回・第32回の学科試験100問を収録。公式問題・正答と全肢の独自解説。",
  "career-consultant": "キャリアコンサルタント（学科）",
  "career-consultant": (count) => "キャリアコンサルタント（学科）の公開演習" + count + "問。" + "第33回・第32回の学科試験100問を収録。公式問題・正答と全肢の独自解説。",
```
（上から順に、説明文マップ・名称マップ・関数マップの各位置へ。）

## lib/utils.ts / lib/home/home-directory.ts
```ts
  "career-consultant": "キャリアコンサルタント（学科）",
  {"code": "career-consultant", "name": "キャリアコンサルタント（学科）", "sub": "公式問題・正答・全肢の独自解説を収録", "domain": "welfare"},
```
（home-directory の domain 値は既存の選択肢に合わせて調整すること。）

## __tests__/fixtures runtime-pins
公開時に問題数 100（第33回50・第32回50）を追加。
