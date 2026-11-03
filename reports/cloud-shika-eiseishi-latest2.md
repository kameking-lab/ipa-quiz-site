# 歯科衛生士・歯科技工士 直近2回の公式公開資料監査

確認日：2026-11-03。対象は歯科医療振興財団（dc-training.or.jp）および厚生労働省（mhlw.go.jp）の公式資料。

## 既存の追加方式

- `data/questions/hokenshi/index.ts`、`josanshi/index.ts`：公式照合済みJSONを集約し、`needsReview === false` の問題を登録する。
- `data/questions/riyoshi/index.ts`：候補と公開対象を分け、公開ゲートを通して登録する。
- `lib/questions/types.ts` の資格型、`lib/exam-config.ts` の設定、`data/questions/index.ts` と `lib/questions/get-questions.ts` の登録が必要。
- `lib/qualifications/catalog.ts` の `status` と `isExamPublished` が公開を制御する。資格一覧 `app/qualifications/page.tsx` は公開資格を表示し、`app/[exam]/page.tsx` は利用可能資格以外を404にする。
- 今回は「公式に全問が公開されていない資格は追加しない」という依頼条件を先に適用する。全問の公式原本を確認できない資格については、空のデータ、資格型、ルート、一覧項目、ステージング候補も追加しない。

## 歯科衛生士（先に監査・完了）

### 対象回の根拠

[財団の歯科衛生士国家試験ページ](https://www.dc-training.or.jp/siken1.html) の「過去の実施結果」は、第35回（令和7年度）、第34回（令和6年度）、第33回の順。第36回は施行案内であり実施済み回として扱わない。

| 対象回 | 実施日・根拠 | 公式正答 | 追加問数 |
| --- | --- | --- | ---: |
| 第35回（令和7年度） | 2026-03-01：[厚労省合格発表](https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken19/about.html) | [正答肢](https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken19/hpSEITO.html) | 0 |
| 第34回（令和6年度） | 2025-03-02：[厚労省合格発表](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/about.html) | [正答肢](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/hpSEITO.html) | 0 |

### 公開範囲・除外理由

財団の[トップページ](https://www.dc-training.or.jp/index.html)と試験ページのリンク、および両回の厚労省合格発表・[第35回受験地別情報](https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken19/hp19.html)・[第34回合格者速報](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/hp19.html)を確認。正答肢は公開されているが、全問の問題冊子・別冊へのリンクは確認できなかった。公式ドメインに限定した問題公開ページの検索でも全問原本を確認できなかった。

合格発表にある問題PDFは、以下の採点除外等の個別資料に限られていた。

- 第35回：[午前97](https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken19/dl/AM97.pdf)。
- 第34回：[午前8](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/dl/AM8.pdf)、[午前10](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/dl/AM10.pdf)、[午前14](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/dl/AM14.pdf)、[午前33](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/dl/AM33.pdf)、[午後13](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/dl/PM13.pdf)、[午後37](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/dl/PM37.pdf)、[午後82](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken19/dl/PM82.pdf)。

判定：資格全体を追加対象から除外。個別の採点資料をもって全問公開とは扱わず、一部問題だけのステージングも作成しない。第三者サイトや市販問題集の本文を公式PDFの代用にしない。問題文・選択肢・図・解説は作成せず、公開・ステージングとも追加0問。

これは確認した公式公開範囲に基づく判断であり、「問題冊子が存在しない」「将来も公開されない」と断定するものではない。再開には両回の全問の公式原本を確認する必要がある。

## 検証

- `pnpm install`：成功（lockfile変更なし）。
- `pnpm validate:questions`：26,444問、成功26,444・失敗0・既存警告16,808。
- `pnpm exec vitest run __tests__/lib/exam-config-integrity.test.ts __tests__/questions/medical44-prepublication.test.ts __tests__/questions/get-questions.test.ts __tests__/exam-catalog-browser.test.tsx`：4ファイル・103テスト成功。
- `pnpm typecheck`：標準ヒープではメモリ不足。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で成功。
- `pnpm build`・デプロイは実行しない。
