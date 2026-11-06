# yobi-tanto（司法試験予備試験 短答式）共有レジストリ差分案

W3 ブランチでは共有レジストリを編集していない。データは `data/qualification-staging/yobi-tanto/{2026,2025}.json`（各137解答単位・法律7科目95原問）。一般教養科目は未収録。
司法試験と本文完全一致の問（令和8年28問・令和7年30問）は、レコードに `sharedWith`（例 `shiho-tanto-2026-constitution-q9`）を持つ。解説は同一。

## lib/questions/types.ts
```ts
| "yobi-tanto"   // ExamCode
// Session（shiho-tanto と共用分に加えて）
| "admin-law" | "commercial-law" | "civil-procedure" | "criminal-procedure"
```
補助フィールド（`sourcePage`, `officialPoints`, `references`, `sharedWith`, `transcriptionNote`）の扱いは shiho-tanto と同じ。

## lib/exam-config.ts
```ts
"yobi-tanto": {
    code: "yobi-tanto", nameFull: "司法試験予備試験（短答式・法律基本科目）", urlSlug: "yobi-tanto", level: "specialist",
    sessions: [
        { session: "constitution", urlSlug: "constitution", expectedQuestions: 12, label: "憲法", categories: ["憲法"] },
        { session: "admin-law", urlSlug: "admin-law", expectedQuestions: 12, label: "行政法", categories: ["行政法"] },
        { session: "civil-law", urlSlug: "civil-law", expectedQuestions: 15, label: "民法", categories: ["民法"] },
        { session: "commercial-law", urlSlug: "commercial-law", expectedQuestions: 15, label: "商法", categories: ["商法"] },
        { session: "civil-procedure", urlSlug: "civil-procedure", expectedQuestions: 15, label: "民事訴訟法", categories: ["民事訴訟法"] },
        { session: "criminal-law", urlSlug: "criminal-law", expectedQuestions: 13, label: "刑法", categories: ["刑法"] },
        { session: "criminal-procedure", urlSlug: "criminal-procedure", expectedQuestions: 13, label: "刑事訴訟法", categories: ["刑事訴訟法"] },
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
```
qNumber は原本どおり（行政法は第13〜24問、商法は第16〜30問、民訴は第31〜45問、刑訴は第14〜26問）。

## lib/qualifications/catalog.ts
```ts
{
    slug: "yobi-tanto", examCode: "yobi-tanto", shortName: "予備試験（短答）", fullName: "司法試験予備試験 短答式（法律基本科目）",
    domain: "legal", administrator: "法務省",
    officialQuestionsUrl: "https://www.moj.go.jp/jinji/shihoushiken/jinji07_00317.html",
    officialReuseTermsUrl: "https://www.moj.go.jp/hisho06_00280.html",
    status: "ready-to-ingest",
    reuseSummary: "令和8・7年の短答式・法律基本科目（憲法・行政法・民法・商法・民事訴訟法・刑法・刑事訴訟法）各95問・137解答欄を公式問題・公式正解どおりに保存。全記述・全選択肢に条文・判例を示した独自解説。一般教養科目は未収録。",
    attributionTemplate: "出典：法務省 令和○年司法試験予備試験 短答式試験問題（科目）第○問・同正解及び配点。解説は過去問AIが独自作成。",
    remainingWork: ["公開判断", "一般教養科目（各年44問中20問選択）の収録可否", "令和7年は公式PDFの文字コード表が壊れておりグリフIDから本文を復元。公開前に法律科目の独自問題（65問）をページ画像で最終照合済み（独立レビュー）だが、取り込み時に再確認するか判断"],
},
```

## その他（shiho-tanto と同じ要領）
- `lib/questions/display.ts`: `PLAIN_NUMBER_CHOICE_EXAMS` に `"yobi-tanto"`。
- `lib/questions/practice-session.ts`: `PRACTICE_SESSIONS` に `"admin-law", "commercial-law", "civil-procedure", "criminal-procedure"`、ラベル `"admin-law": "行政法", "commercial-law": "商法", "civil-procedure": "民事訴訟法", "criminal-procedure": "刑事訴訟法"`、`defaultPracticeSession` に `if (exam === "yobi-tanto") return "constitution";`。
- `lib/utils.ts`: `"yobi-tanto": "予備試験（短答）",`
- `lib/seo/exam-meta.ts`: 状態説明 `"yobi-tanto": "令和8・7年の短答式・法律基本科目 各95問を解答欄単位で保存。全記述に条文・判例を示した独自解説。"`、表示名 `"yobi-tanto": "司法試験予備試験 短答式"`、カテゴリ説明 `` "yobi-tanto": (c) => `司法試験予備試験 短答式の${c}。公式正解どおりに収録。` ``。
- `data/questions/yobi-tanto/index.ts`・`data/questions/index.ts`・`lib/questions/get-questions.ts`: shiho-tanto と同形で `YOBI_TANTO_QUESTIONS`。
- `lib/home/home-directory.ts`: `"shiho-tanto"` の直後に `"yobi-tanto"`。
- runtime-pins: yobi-tanto 2026=137, 2025=137。
