# sokuryoshiho（測量士補）登録ハンドオフ（共有ファイルは未編集）

このワーカーは共有レジストリを編集していない。親側で必要に応じて以下を貼り付ける。
データは `data/qualification-staging/sokuryoshiho/`（未公開・`publicAllowed: false`・`needsReview: true`）。

## 1. `lib/qualifications/catalog.ts`

ステージング段階の登録とする。`examCode`は付けない。`status`は`"ready-to-ingest"`で、`khk-reito`（親slug）などの未公開エントリと同じ形にそろえた。
測量士（`sokuryoshi`、live）とは別資格の別エントリ。`sokuryoshi`エントリの直後に置くと探しやすい。

```ts
{
    slug: "sokuryoshiho", shortName: "測量士補", fullName: "測量士補",
    domain: "construction", administrator: "国土地理院",
    officialQuestionsUrl: "https://www.gsi.go.jp/LAW/SHIKEN/past.html",
    officialReuseTermsUrl: "https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html", status: "ready-to-ingest",
    stagingDataPath: "data/qualification-staging/sokuryoshiho",
    reuseSummary: "令和8年・令和7年の測量士補試験（各28問・五肢択一）を未公開ステージングに収録。問題・正答は国土地理院公表PDF、解説は過去問AIの独自作成。令和8年No.12は公式正答と掲載数値の計算結果が一致しないため参考扱い（採点対象外）。",
    attributionTemplate: "出典：国土地理院 令和○年測量士補試験 No.○。解説は過去問AIの独自作成。",
    remainingWork: ["No.21の地形図（電子地形図25000）の測量法上の複製承認要否の確認", "公開用ExamCode・ローダーへの接続（別途公開指示が必要）"],
},
```

## 2. 検証フック（任意）

`scripts/validate-questions.ts` の `[staging]` ログ行（jokaso-setsubishi の行付近）に追加する例。
`index.ts` はJSONを束ねて出すだけなので、ここでは件数と非公開だけを確認する。詳細は専用テストが受け持つ。

```ts
import { SOKURYOSHIHO_STAGED_QUESTIONS } from "@/data/qualification-staging/sokuryoshiho";
// ...
if (SOKURYOSHIHO_STAGED_QUESTIONS.length !== 56 || SOKURYOSHIHO_STAGED_QUESTIONS.some((q) => q.publicAllowed)) {
  throw new Error("sokuryoshiho staging must hold 56 private questions");
}
console.log(`[staging] sokuryoshiho: ${SOKURYOSHIHO_STAGED_QUESTIONS.length} questions; publicAllowed=false`);
```

`__tests__/questions/sokuryoshiho-staging.test.ts` は次を確認する。

- 各回28問
- IDの一意性
- 正答表との一致（独立転記の正答列も照合）
- 5肢と5肢解説
- 非公開
- 画像の実在とSHA-256
- 本文ハッシュの再計算
- No.12だけが参考扱いであること
- 公開経路からのimportがないこと

## 3. 公開時に必要になる追加作業（今回は実施しない）

- `ExamCode`、`EXAM_CONFIGS`、ローダー、SEOメタを追加する。測量士（`sokuryoshi`）とIDの接頭辞やURLが重ならないようにする。
- 令和8年No.12（`referenceOnly: true`）は採点・正答率・復習判定から除外する。
  既存の `lib/exam-library/survey-assistant-reference-policy.ts` の `SURVEY_ASSISTANT_REFERENCE_ID` は旧候補IDなので、新ID `sokuryoshiho-2026-annual-gakka-q12` への対応が必要。
- 既存の `data/exam-library/survey-assistant/`（旧候補・HOLD）との重複表示を避けるため、どちらを正本にするかを決める。

## 4. 登録しないもの

次のファイルは変更していない。公開指示が出るまで、ExamCodeや公開レジストリには接続しない。

- `lib/exam-config.ts`
- `lib/qualifications/catalog.ts`
- `lib/seo/exam-meta.ts`
- `data/questions/index.ts`
- `lib/questions/types.ts`
- `lib/questions/get-questions.ts`
- `lib/home/home-directory.ts`
- `lib/utils.ts`
- `scripts/validate-questions.ts`
- `__tests__/fixtures/*`

表示名は「測量士補」で、地域の接尾辞は付けない。
