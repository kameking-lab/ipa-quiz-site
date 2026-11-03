# 獣医師国家試験・直近2回の公式公開状況監査

監査日：2026-11-03（UTC）

## 結論

獣医師は追加しない。追加問数は **0問**（第77回0問、第76回0問）。
農林水産省の公式掲載ページには、必須問題の図表と別冊C・別冊Dを掲載省略する旨の注記がある。
問題冊子と正答値の公開は確認できるが、解答に必要な図表を含む全問の完全な公式公開ではない。
依頼の「公式に全問が公開されていない資格は追加せず」に該当するため、資格全体を対象外とした。
ステージングへの部分収録、資格登録、ルート、資格一覧の追加も行わない。

## 対象回の確定根拠

[農林水産省「獣医師国家試験」](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/shiken.html)
（ページ更新日：令和8年10月15日）の「試験問題及び正答値」の先頭2件は、
第77回（令和7年度）と第76回（令和6年度）。この公式掲載順・回次・年度から確定した。
第78回は「受験手続等」の案内であり、公開済み過去問の対象回には含めない。

同ページの第73回の掲載欄の後、「試験結果」の前に、必須問題の図表・別冊C・別冊Dを省略する注記がある。
第77回・第76回とも問題Cの本文には別冊Cの図表への参照が残っており、問題冊子だけでは図表を照合できない。
第三者サイトの図表や生成画像で欠落を補わない。

## 公式資料URL

| 対象回 | 必須 | A | B | C | D | 正答値 |
| --- | --- | --- | --- | --- | --- | --- |
| 第77回（令和7年度） | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-140.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-141.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-142.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-143.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-144.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-146.pdf) |
| 第76回（令和6年度） | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-126.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-127.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-128.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-129.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-130.pdf) | [PDF](https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/attach/pdf/shiken-131.pdf) |

上記URLは公式掲載ページのリンクから取得。必須・C・正答値のPDFを開き、回次と資料種別を確認した。
収録対象外のため、全問の逐語転記、正答の全問照合、独自解説の作成には進んでいない。

## 既存方式の調査

- `data/questions/shika-ishi/index.ts` はJSONを読み込み、`needsReview === false` の問題を選別する。
- `lib/questions/types.ts` と `lib/exam-config.ts` が試験コード・試験設定を定義する。
- `lib/qualifications/catalog.ts` が資格一覧と公開状態を管理し、`isExamPublished` で公開を判定する。
- `data/questions/index.ts` と `lib/questions/get-questions.ts` は公開ゲートを通して問題を登録・読み込みする。
- `app/qualifications/page.tsx` は `status === "live"` の資格を一覧表示する。
- `lib/exam-qualification-hubs.ts` と `app/e-learning/exams/qualifications/[slug]/page.tsx` が資格別入口と静的ルートを管理する。
- `data/qualification-staging/sagyo-ryohoshi/ot13-recovered/` に公開レジストリから分離したステージングの例がある。

本件は公式公開の完全性の条件を満たさないため、これらへの獣医師の追加は行わず、監査記録のみ残す。

## 検証

- `pnpm install`：成功（pnpm 10.33.0、Prisma Client生成完了）。
- `pnpm validate:questions`：成功。26,444問、失敗0、既存データの警告16,808件。
- `pnpm typecheck`：標準ヒープ上限でメモリ不足（終了134）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し成功（終了0）。
- 関連テスト：下記4ファイル、108テストすべて成功。
  - `__tests__/lib/exam-config-integrity.test.ts`
  - `__tests__/questions/get-questions.test.ts`
  - `__tests__/exam-qualification-hubs.test.ts`
  - `__tests__/questions/live-qualification-coverage.test.ts`

`pnpm build` とデプロイは実施していない。追加問題はなく、既存データの警告への変更は本件に含めない。
