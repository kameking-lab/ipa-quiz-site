# kikai-hozen 登録ハンドオフ（共有ファイルは未編集）

このワーカーは共有ファイルを編集していない。親側で必要に応じて、以下をそのまま貼り付ける。

## 1. `lib/qualifications/catalog.ts`

ステージング段階の登録とする。`examCode`は付けない。`status`は`"ready-to-ingest"`で、`khk-reito`などの未公開エントリと同じ形にそろえた。
既存の`QualificationDomain`に製造・保全の区分がないため、`domain`は暫定で`"safety"`とした。分類は親側で調整してよい。

```ts
{
    slug: "kikai-hozen", shortName: "機械保全技能士 2級（機械系）", fullName: "機械保全技能検定 2級 機械系保全作業 学科",
    domain: "safety", administrator: "公益社団法人日本プラントメンテナンス協会",
    officialQuestionsUrl: "https://www.kikaihozenshi.jp/questions/",
    officialReuseTermsUrl: "https://www.kikaihozenshi.jp/questions/", status: "ready-to-ingest",
    stagingDataPath: "data/qualification-staging/kikai-hozen",
    reuseSummary: "2024年度第2回・2025年度第2回の2級機械系保全作業 学科（各50問：真偽法25・四肢択一25）を未公開ステージングに収録。問題・正答はJIPM公表PDF、解説は過去問AIの独自作成。公式ページの「許可なく複製、二次使用等することを禁止」文言は監査記録に保存し、オーナー判断に基づき作業。",
    attributionTemplate: "出典：JIPM 機械保全技能検定 ○年度 2級 機械系保全作業 学科 No.○。解説は過去問AIの独自作成。",
    remainingWork: ["公開用の試験区分（真偽法の2択表示を含む）とローダーへの接続（別途公開指示が必要）"],
},
```

## 2. 検証フック（任意）

`scripts/validate-questions.ts`の`[staging]`ログ行（jokaso-setsubishiの行付近）に追加する例を示す。
`index.ts`は型付きの配列を出すだけなので、件数と非公開の確認だけを行う。

```ts
import { KIKAI_HOZEN_STAGED_QUESTIONS } from "@/data/qualification-staging/kikai-hozen";
// ...
if (KIKAI_HOZEN_STAGED_QUESTIONS.length !== 100 || KIKAI_HOZEN_STAGED_QUESTIONS.some((q) => q.publicAllowed)) {
  throw new Error("kikai-hozen staging must hold 100 private questions");
}
console.log(`[staging] kikai-hozen: ${KIKAI_HOZEN_STAGED_QUESTIONS.length} questions; publicAllowed=false`);
```

詳しい検証は`__tests__/questions/kikai-hozen-staging.test.ts`が受け持つ。次の項目を確認する。

- 正答
- 形式
- 全肢解説
- 画像のハッシュ
- 本文ハッシュ
- 公開経路からのimportがないこと

## 3. 登録しないもの

次のファイルは変更しない。公開指示が出るまで、ExamCodeや公開レジストリに接続しない。

- `lib/exam-config.ts`
- `lib/seo/exam-meta.ts`
- `data/questions/index.ts`
- `lib/questions/types.ts`
- `lib/questions/get-questions.ts`
- `lib/home/home-directory.ts`
- `lib/utils.ts`
- `__tests__/fixtures/*`

表示名には地域の接尾辞を付けない。
