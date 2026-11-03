# 公害防止管理者等国家試験・直近2回監査

確認日: 2026-11-03（UTC）

## 結論

対象は令和8年度（2026年度）と令和7年度（2025年度）。全13試験区分の追加は各0問。直近2回分の公式問題・正答を取得して全問照合する条件を満たせないため、ユーザー指定の除外条件に従い本文収録を見送った。生成問題、類題、画像のみの問題、正答から逆算した問題は追加していない。

`lib/qualifications/catalog.ts` に `kogai-boshi` を `terms-review-required` として未公開登録した。これは収録済みステージングではなく、収録を見送った資格の公開前判断台帳への登録である。

## 対象回と公式根拠

- [国家試験案内](https://www.jemai.or.jp/polconman/examination/index.html) は令和8年度試験の終了と2026年10月4日の実施を明記。正答は速報で未確定、11月16日の合格予定者発表までに確定する旨の記載がある。
- [国家試験の問題と正解](https://www.jemai.or.jp/polconman/examination/past.html) の表見出しは令和8年度。全18科目の問題PDFと全科目正答PDFへのリンクがある。令和7年度のリンクは掲載されていない。
- [令和7年度合格発表](https://www.jemai.or.jp/polconman/examination/results.html) で前年度の実施を確認。年度名を推測で決めていない。
- [令和8年度受験案内](https://www.jemai.or.jp/polconman/examination/d3ldbs00000011pg-att/jyukenguide_2026_rev2.pdf) の印刷6ページ（PDF8ページ）で13試験区分と共通科目方式を確認。18科目を18資格とは扱わない。

令和8年度の[公害総論PDF](https://www.jemai.or.jp/polconman/examination/dd4ht300000005fn-att/R08_01_1.pdf) は取得でき、年度表示と全15問の掲載を確認。[正答PDF](https://www.jemai.or.jp/polconman/examination/dd4ht300000005fn-att/answerR08.pdf) は令和8年10月5日付。残り17科目は掲載リンクを確認した段階であり、全問の原文・正答照合を完了したとは扱わない。

前年度については検索索引に残る公式の[公害総論PDF](https://www.jemai.or.jp/polconman/examination/dd4ht300000005fn-att/R07_01.pdf) と[正答PDF](https://www.jemai.or.jp/polconman/examination/dd4ht300000005fn-att/answerR07.pdf) を実アクセスし、ともにHTTP 404を確認した。科目02～18についても同ディレクトリの `R07_02.pdf` ～ `R07_18.pdf` を補助的に確認し、すべて404だった。これら補助確認URLの命名規則は年度の決定根拠には使っていない。現在の公式掲載ページと検索で、令和7年度全問の代替公開先は確認できなかった。過去に非公開だったと断定するものではなく、確認日時点での取得可否の記録である。検索スニペット・第三者転載・有料問題集を原文の代用にしていない。

## 転載条件

[協会のJEMAI CLUB「このサイトについて」](https://www.e-jemai.jp/guide/guide1.html) の著作権欄には「著作権者の許可なく転載、複製、出版、放送その他の著作権を侵害する行為を行うことはできません。」と明記されている。ただしこのページは `www.e-jemai.jp` のサイトについての規定であり、別ホスト `www.jemai.or.jp` の国家試験PDFへの適用は、この記載だけでは断定しない。

国家試験掲載ページにはCopyright表示があるが、それだけを明示の転載禁止とは扱っていない。今回の収録除外の確実な根拠は、直近2回分の公式全問・正答を取得して照合できないことである。転載条件も未解決事項として台帳に残した。

## 区分ごとの追加数・除外

以下は1区分ずつ確認した結果。共通の除外理由Aは「令和7年度の公式全問・正答を取得できず、対象2回の全問照合が成立しない」。今回の本文・選択肢・解説・画像の収録はすべて0件。

| 試験区分 | 対象回 | 追加問数 | 除外理由 |
| --- | --- | ---: | --- |
| 水質関係第1種 | 令和8・7年度 | 0 | A |
| 水質関係第2種 | 令和8・7年度 | 0 | A |
| 水質関係第3種 | 令和8・7年度 | 0 | A |
| 水質関係第4種 | 令和8・7年度 | 0 | A |
| 大気関係第1種 | 令和8・7年度 | 0 | A |
| 大気関係第2種 | 令和8・7年度 | 0 | A |
| 大気関係第3種 | 令和8・7年度 | 0 | A |
| 大気関係第4種 | 令和8・7年度 | 0 | A |
| 特定粉じん関係 | 令和8・7年度 | 0 | A |
| 一般粉じん関係 | 令和8・7年度 | 0 | A |
| 騒音・振動関係 | 令和8・7年度 | 0 | A |
| ダイオキシン類関係 | 令和8・7年度 | 0 | A |
| 公害防止主任管理者 | 令和8・7年度 | 0 | A |

## 既存方式との整合

- `data/questions/denken3/index.ts` は型付き配列とJSONの組合せ。各問は `sourcePdfUrl` / `sourceAnswerUrl` 等を保持する。今回、除外資格のため空配列や仮問題で問題数を作っていない。
- `lib/qualifications/catalog.ts` の既存の収録許諾待ち資格（例: `sekou-kenchiku1`）と同様、`examCode` を付けずに判断台帳へ登録。`ExamCode` や `QUESTIONS_BY_EXAM`、ローダーへの演習登録は行わない。
- `app/qualifications/page.tsx` は `status === "live"` のみ掲載。今回の資格は公開一覧に出ない。
- `app/[exam]/page.tsx` は `dynamicParams = false` で公開資格からルートを生成。今回の資格はルートを生成しない。`lib/questions/get-questions.ts` と問題集約も公開判定を使用する。
- 収録前の除外なので `hasImage`、問題別出典、独自解説や法令基準日の付与対象はない。再開する場合は原文テキスト、図のみ画像併用、公式正答、独自解説と出題時点法令の明記を区分単位で確認する。令和8年度公害総論の注意書きには原則同年4月1日時点の法令・JIS適用がある。

## 検証

- `pnpm install`: 成功（lockfile変更なし、Prisma Client生成成功）。
- `pnpm validate:questions`: 成功、26,444問、失敗0、既存データの警告16,808件。
- `pnpm exec vitest run __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/exam-qualification-hubs.test.ts`: 3ファイル・1,078テスト成功。
- 台帳を直接読み込み、`kogai-boshi` が1件のみ、非live、`examCode` なしであることも確認。
- 最初の `pnpm test -- ...` はファイル指定が効かず全体テストを開始したため中断し、上記の明示的なVitestコマンドで関連テストを実行し直した。全体テストの成功は主張しない。
- `pnpm typecheck`: 標準ヒープではメモリ不足で終了（exit 134）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し成功（exit 0）。
- `git diff --check`: 成功。
- `pnpm build` とデプロイは実施していない。
