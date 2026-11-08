# juishi（獣医師国家試験）— 共有レジストリに必要な差分

W6（ブランチ `qual/w6-20261106`）では共有レジストリを編集していない。
親が直列で反映する差分をここに記載する。データ本体は
`data/qualification-staging/juishi/`（`publicAllowed: false`）にあり、
公開レジストリ・通常ローダー・ExamCode には未接続である。

## 1. 公開の前提（確認してから入れる）

- 権利・転載条件は未確認（`manifest.json` の `rightsStatus: "permission-not-confirmed"`）。
  農林水産省サイトの利用規約と出典表示の要件を確認してから公開に進むこと。
- 独立レビュー（別プロセス・read-only）の結果は `reports/juishi-review.md` にある。
  PASS していない項目が残る場合は公開しない。
- 実地試験（問題C・D）は未収録のため、資格ページの説明文で「学説試験・必須問題のみ」と明示する。

## 2. lib/qualifications/catalog.ts（追記1件）

`domain` に獣医・医療系の値がないため、暫定で `welfare` を提案する。
`"welfare"` 以外（新しい `domain` の追加、または `safety`）にするかは親の判断に委ねる。

```ts
{
    slug: "juishi", examCode: "juishi", shortName: "獣医師国家試験", fullName: "獣医師国家試験（学説試験・必須問題）",
    domain: "welfare", administrator: "農林水産省",
    officialQuestionsUrl: "https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/shiken.html",
    officialReuseTermsUrl: "https://www.maff.go.jp/j/use/", status: "live",
    stagingDataPath: "data/qualification-staging/juishi",
    reuseSummary: "第77回（令和7年度）・第76回（令和6年度）の必須問題と学説試験 問題A・Bを418問収録。実地試験は別冊の図表が公式に非公開のため未収録。問題・正答は公式原本、解説は過去問AIの独自作成です。",
    attributionTemplate: "出典：農林水産省 獣医師国家試験 試験問題及び正答値。本文整形と独自解説の追加は過去問AIによる加工。",
    remainingWork: ["実地試験（問題C・D）は別冊が公式に非公開のため未収録"],
},
```

公開しない（ステージングのまま置く）場合は、`status` を `live` にせず
`examCode` を付けないこと。`jokaso-setsubishi` の README と同じ扱いになる。

## 3. scripts/validate-questions.ts（import 1行 + 呼び出し1行）

このファイルは他ワーカーと競合するため編集していない。次の2行を加える。

```ts
import { validateJuishiStaging } from "./validate-juishi";
```

既存の staging 検証の並び（`validateChiikiRyoko(opts.exams);` の近く）に:

```ts
validateJuishiStaging(opts.exams);
```

`scripts/validate-juishi.ts` は単体でも実行できる（`pnpm tsx scripts/validate-juishi.ts`）。

## 4. 触っていない共有ファイル

`lib/exam-config.ts` / `lib/questions/types.ts` / `lib/questions/get-questions.ts` /
`data/questions/index.ts` / `lib/home/home-directory.ts` / `lib/seo/exam-meta.ts` /
`lib/utils.ts` / `__tests__/fixtures/*runtime-pins*` は未編集。

公開する場合に必要になる追加作業（親の判断と、別途の実装が必要）:

- `ExamCode` に `juishi` を追加し、`EXAM_CONFIGS` に設定を追加する。
- ステージングの行は5択（`choices` が `"1"`〜`"5"`）で、公式正答が2つある問が8問ある。
  既存の `Question` 型（`choices{ア,イ,ウ,エ}`）とは形が違うため、
  `chiiki-ryoko` と同様に投影（projection）を作るか、5択と複数正答に対応した変換を用意する必要がある。
- `lib/seo/exam-meta.ts` と `lib/home/home-directory.ts` への追加。
