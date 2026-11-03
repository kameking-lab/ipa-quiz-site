# ビル管理士・直近2回の監査

確認日: 2026-11-03。対象資格は建築物環境衛生管理技術者（ビル管理士）、実施団体は公益財団法人日本建築衛生管理教育センター。

## 対象回と一次資料

[公式国家試験情報](https://www.jahmec.or.jp/kokka/)の「過去の試験問題と合格基準・正答一覧」は令和7・6・5年度を掲載している。公開済みの問題・正答がそろう直近2回は以下。回数は正答PDFの見出しで確認し、年数から算出していない。

| 対象 | 午前問題 | 午後問題 | 公式正答 | 公式正答表の問題番号 |
| --- | --- | --- | --- | --- |
| 第55回・令和7年度（2025） | [PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025shiken_am.pdf) | [PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025shiken_pm.pdf) | [合格基準及び正答一覧](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025kizyun_seitou.pdf) | 1〜180 |
| 第54回・令和6年度（2024） | [PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2024/2024shiken_am.pdf) | [PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2024/2024shiken_pm.pdf) | [合格基準及び正答一覧](https://www.jahmec.or.jp/kokka/shiken_pdf/2024/2024kizyun_seitou.pdf) | 1〜180 |

公式案内には第56回・令和8年度は2026-10-04実施、合格発表予定は2026-11-10とある。一覧には同回の問題・正答がないため、令和8年度を推測で対象にしていない。

## 収録結果と未完了事項

追加問数 **0問**（第55回0問、第54回0問）。生成問題、類題、画像だけの問題、解説、正答だけの疑似問題は追加していない。

公式国家試験情報・トップページの末尾に「Copyright © 2019 JAHMEC All rights reserved.」がある。一方、確認した案内ページとPDF冒頭では「転載禁止」「複製禁止」という具体的文言は確認できていない。**権利留保表示だけを、明示の転載・複製禁止と同一視した事実認定は行っていない。** 全問非公開を理由とする除外でもない。

この表示をユーザー指定の収録除外条件に含めるか照会中。問題本文の収録は保留し、資格台帳の `terms-review-required` として未公開登録した。したがって、直近2回360問のテキスト収録・公式正答との問題単位の照合・独自解説の作成は**未完了**。明示の禁止を確認したための確定除外ではなく、権利条件の解釈が未確定の保留である。

問題PDF4本は画像形式で、pdftotextでは本文を抽出できなかった。問題PDF4本の計123ページに対してOCRを実行し、「転載」「複製」「著作」「禁じ」の検索では該当を検出しなかった。ただしOCRには誤認識があり、禁止文言の不存在を保証するものではない。OCRは調査補助として一時ディレクトリだけに作成し、誤認識のある未照合テキストを問題データとして採用していない。図の必要箇所・hasImage・法令の出題時点注記は、収録する場合の設問ごとの照合時に対応する。PDFやOCR本文はコミットしない。

## 既存方式の確認と公開範囲

- `data/questions/eisei2/index.ts` は回別JSONを集約する類似構成。
- `lib/qualifications/catalog.ts` が公開判断の台帳。`live` 以外の状態を公開前の管理に使用する。今回の登録は既存の収録保留資格と同様に `examCode` を持たない。
- `data/questions/index.ts` の `QUESTIONS_BY_EXAM` と `lib/questions/get-questions.ts` が問題登録・公開判定を担う。未収録の問題配列やローダーを架空に作成しない。
- `app/qualifications/page.tsx` は `status === "live"` のみ掲載する。
- `app/[exam]/page.tsx` は `getAvailableExams()` から静的ルートを列挙する。今回は `biru-kan` の公開ルートや資格一覧掲載を追加しない。

## 検証

- `pnpm install`: 成功（Prisma Client生成を含む）。
- `pnpm validate:questions`: 成功。既存26,444問、失敗0・警告16,808。今回の問題追加は0問。
- `pnpm typecheck`: 標準ヒープではメモリ上限に到達したため、`NODE_OPTIONS=--max-old-space-size=12288 pnpm typecheck` で再実行し成功。
- `pnpm exec vitest run __tests__/lib/exam-config-integrity.test.ts __tests__/lib/home-directory.test.ts __tests__/questions/get-questions.test.ts`: 成功（3ファイル・107テスト）。台帳変更後にも実行。
- `git diff --check`: 成功。

build・デプロイ・Vercel操作・PR作成は行っていない。作業ブランチは `codex/biru-kan-latest2`。mainにはpushしない。

## 取得した公式PDFのSHA-256

PDF自体はリポジトリ外に保存。再確認時は公式ファイルの更新に注意する。

| ファイル | SHA-256 |
| --- | --- |
| 2024kizyun_seitou.pdf | `faebc327503541422b331d5e14ff47035cec23b6ef0fd1048f9d6cd8f3b9c54c` |
| 2024shiken_am.pdf | `b788546847af935f8f068f0e0d2a5d5ea9ba302fa083a590ef4ffdd548a75aef` |
| 2024shiken_pm.pdf | `3af224c2aa9fab1ca58032efd8911ad1339c3c005751745a046c7154b0ec0e73` |
| 2025kizyun_seitou.pdf | `587f114205af05d4776f241af9a822bff5caa70bae5178f13ad6c948d8ac4088` |
| 2025shiken_am.pdf | `0947f24245ec6ebd75654824605f426429634c17b4ca8f9d0e7d92388752ba40` |
| 2025shiken_pm.pdf | `6d537264afbd40657eb6075fbf16e07cd879528a6925a67abd5bb52a241ed3e8` |
