# khk-hanbai 登録ハンドオフ（共有ファイルは未編集）

ローカルWIP（`qual/khk-hanbai-20261104`、未push）は共有ファイル2つも変更していたが、本ブランチでは取り込んでいない。親側で以下を反映する。設備士の文言は配管理論等40問の追加（全230問）に合わせて更新済み。

## 1. `lib/qualifications/catalog.ts`（`QUALIFICATION_CATALOG` の先頭付近、kanteishi の前）

`examCode` は付けない（`__tests__/questions/khk-hanbai-staging.test.ts` が examCode なし・`ready-to-ingest` を確認する）。

```ts
  {
    slug: "khk-hanbai", shortName: "第一種販売主任者", fullName: "高圧ガス販売主任者 第一種",
    domain: "safety", administrator: "高圧ガス保安協会",
    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html", officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",
    status: "ready-to-ingest", stagingDataPath: "data/qualification-staging/khk-hanbai",
    reuseSummary: "オーナー決定（2026-11-04 06:10）による収録対象。令和7・6年度80問を未公開stagingに保存。公式の転載禁止文言を記録済み。協会の転載許諾取得を意味しない。",
    remainingWork: ["publicAllowed=falseで維持", "公開する場合は別途統合・公開判断が必要"],
  },
  {
    slug: "khk-hanbai2", shortName: "第二種販売主任者", fullName: "高圧ガス販売主任者 第二種",
    domain: "safety", administrator: "高圧ガス保安協会",
    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html", officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",
    status: "ready-to-ingest", stagingDataPath: "data/qualification-staging/khk-hanbai",
    reuseSummary: "オーナー決定（2026-11-04 06:10）による収録対象。令和7・6年度80問を未公開stagingに保存。協会の転載許諾取得を意味しない。",
    remainingWork: ["publicAllowed=falseで維持", "公開する場合は別途統合・公開判断が必要"],
  },
  {
    slug: "khk-setsubishi", shortName: "液化石油ガス設備士（学科）", fullName: "液化石油ガス設備士試験（学科）",
    domain: "safety", administrator: "高圧ガス保安協会",
    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html", officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",
    status: "ready-to-ingest", stagingDataPath: "data/qualification-staging/khk-hanbai",
    reuseSummary: "オーナー決定（2026-11-04 06:10）による収録対象。令和7・6年度の法令30問・配管理論等40問、計70問を未公開stagingに保存。協会の転載許諾取得を意味しない。",
    remainingWork: ["publicAllowed=falseで維持", "公開する場合は別途統合・公開判断が必要（配管理論等は図・早見表の画像表示が必要）"],
  },
```

## 2. `scripts/validate-questions.ts`

```ts
// import 群に追加
import { validateKhkHanbaiStaging } from "./validate-khk-hanbai";

// `const opts = parseCliOptions();` の直後に追加
if (opts.exams.length === 0 || opts.exams.some(exam => ["khk-hanbai", "khk-hanbai2", "khk-setsubishi"].includes(exam))) {
  const staging = validateKhkHanbaiStaging();
  console.log(`[staging:khk-hanbai] ${staging.count} questions, ${staging.errors.length} errors; private`);
  for (const error of staging.errors) console.error(`[FAIL] ${error}`);
  if (staging.errors.length > 0) process.exit(1);
}
```

`validateKhkHanbaiStaging()` は画像ハッシュ確認のため `process.cwd()` 基準で `data/qualification-staging/khk-hanbai/images/` を読む（リポジトリ直下で実行する前提）。

## 3. 登録しないもの

ExamCode・EXAM_CONFIGS・公開問題レジストリ・exam-meta・home-directory には接続しない。表示名に地域接尾辞は付けない。
