# 二級建築士・木造建築士（学科）直近2回の監査

再確認日: 2026-11-03（環境日付）。ユーザー指定のオーナー判断日時は2026-11-04 06:10（タイムゾーン未指定）として別途記録する。

## 作業状況と既存方式

- **部分実施。問題本文の追加は未完了。** オーナーの収録判断を記録した。転載・複製禁止表示そのものを停止理由にはしない。別の制約として、ユーザーから本文の提供を受けていない著作権保護対象の問題文・選択肢を外部サイトから大量転載する部分には対応できない。本文を含むステージングが完成したという扱いにはしない。
- `data/questions/civil2/index.ts` 等はQuestionに原問・正答の出典を保持する。`data/questions/index.ts` の `isExamPublished` と `lib/questions/get-questions.ts` が演習登録・ロードを制御する。
- `lib/qualifications/catalog.ts` のliveだけが資格一覧に掲載され、`app/[exam]/page.tsx` は利用可能な試験からルートを生成する。本文のない台帳にはexamCodeを付けない。収録判断を記録済みの台帳をready-to-ingestとし、公開はしない。
- 既存の `data/qualification-staging/sagyo-ryohoshi/ot13-recovered/` と同じ未公開領域に、今回は出典・公式正答・問題数の台帳だけを保存する。Questionレコード、本文、選択肢、画像、解説は含めない。
- `data/exam-library/official-catalog.json` は別の公開ライブラリ。公開カタログやpapersに未完成データを登録しない。
- 指定の `origin/ops/source-pdfs-20261104` は一時チェックアウトでリモートから再取得して確認。`kenchikushi2/`、`mokuzo-kenchikushi/` はどちらも存在しなかった。公式サイトからPDF12件を直接取得できた。ログイン・CAPTCHA・ボット拒否の迂回はしていない。
- 元の作業場所の `.git` は環境の読み取り専用制約によりコミット不可。`/tmp/ipa-kenchikushi-work` に作成した一時チェックアウトで資格ごとにコミットする。元の作業ツリーにも同じ変更を保持する。

## 二級建築士（学科）

公式の「学科の試験」一覧の先頭2回が令和8年・令和7年であることを再確認。
公式一覧: https://www.jaeic.or.jp/shiken/2k/2k-mondai.html

| 対象回 | 学科I・IIの問題PDF | 学科III・IVの問題PDF | 公式正答PDF |
| --- | --- | --- | --- |
| 令和8年（2026年） | https://www.jaeic.or.jp/.assets/R8_2k_1_2.pdf | https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf | https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf |
| 令和7年（2025年） | https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka1_2.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf |

- 保存先: `data/qualification-staging/kenchikushi2/source-inventory.json`。
- 各回、計画25+法規25=50、構造25+施工25=50、合計100問を問題番号の抽出で照合。2回合計200問。公式正答表の100セル×2回をテキスト抽出とページ画像で照合し、元の正答番号1〜5を保存した。問題本文と正答の対応照合は未実施。
- PDF6件のSHA-256、公式問題・正答URL、科目名、問題番号範囲、法令基準日（2026-01-01／2025-01-01）、確認したソースブランチのコミットを台帳に保存。
- 追加問題数: **0問**。追加したのは公式正答**200件**と出典台帳。収録待ち: 両年の全200問。公式非掲載と判定した問題は0問だが、全問の目視校合は未完了なので非掲載の有無を断定しない。
- 未完了: 問題文・全選択肢のテキスト、必要図、hasImage、各問の出典、独自の全肢解説、Question登録、未公開ルートの検証。全問の正答照合完了や教材完成は主張しない。
- 利用条件の記録: 公式一覧の注意事項3に個人利用以外の無断転載・複製禁止、PDF表紙に「禁無断転載・複製」。ユーザー指定の収録判断を記録し、許諾取得は主張しない。

## 木造建築士（学科）

公式の「学科の試験」一覧の先頭2回が令和8年・令和7年であることを再確認。
公式一覧: https://www.jaeic.or.jp/shiken/mk/mk-mondai.html

| 対象回 | 学科I・IIの問題PDF | 学科III・IVの問題PDF | 公式正答PDF |
| --- | --- | --- | --- |
| 令和8年（2026年） | https://www.jaeic.or.jp/.assets/R8_mk_1_2.pdf | https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf | https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf |
| 令和7年（2025年） | https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf |

- 保存先: `data/qualification-staging/mokuzo-kenchikushi/source-inventory.json`。
- 令和7年は計画25+法規25=50、構造25+施工25=50。令和8年も計画25+法規25=50、構造25+施工25=50。令和8年後半冊子はPoppler抽出では49問。施工問12を別の公式PDFテキスト読み取りで確認し、欠番として除外せず50問として照合した。
- 令和8年施工問12はPDF18ページ（紙面「施工17」）。Popplerでは図5点と注記を表示できるが、問題文・選択肢の文字が欠落する。Webの別のPDF読み取りでは問題文と5肢の文字を確認できた。単なる抽出欠落を公式非掲載と判断しない。
- 同問の選択肢2・4の図は、**2025年版フラット35対応 木造住宅工事仕様書（住宅金融支援機構）**が出典。注記を台帳に保持。これは第三者図の出典の記録であり、利用許諾取得の主張ではない。将来図を収録する際にも注記を残す。
- 公式正答表の100セル×2回をlayout/rawのテキスト抽出とページ画像で照合し、元の正答番号1〜5を保存。令和8年施工問12の公式正答は4。問題本文と正答の全問対応照合は未実施。
- PDF6件のSHA-256、公式問題・正答URL、科目名、問題番号範囲、法令基準日（2026-01-01／2025-01-01）、ソースブランチの確認コミット、施工問12の確認方法を台帳に保存。
- 追加問題数: **0問**。追加したのは公式正答**200件**と出典台帳。収録待ち: 両年の全200問。公式非掲載と判定した問題は0問だが、全問の目視校合は未完了なので非掲載の有無を断定しない。
- 未完了: 問題文・全選択肢のテキスト、必要図、hasImage、各問の出典、独自の全肢解説、Question登録、未公開ルートの検証。全問の正答照合完了や教材完成は主張しない。
- 利用条件の記録: 公式一覧の注意事項3に個人利用以外の無断転載・複製禁止、PDF表紙に「禁無断転載・複製」。ユーザー指定の収録判断を記録。今回本文収録が未完了の理由は冒頭に記載した外部取得本文の大量転載の制約であり、オーナー判断の再承認を求めるものではない。

## 問題数の照合と収録状況

| 資格・回 | 計画＋法規 | 構造＋施工 | 問題番号の確認計 | 正答台帳 | 本文収録 | 収録待ち |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 二級・令和8年 | 50 | 50 | 100 | 100 | 0 | 100 |
| 二級・令和7年 | 50 | 50 | 100 | 100 | 0 | 100 |
| 木造・令和8年 | 50 | 49＋別方法1 | 100 | 100 | 0 | 100 |
| 木造・令和7年 | 50 | 50 | 100 | 100 | 0 | 100 |
| 合計 | 200 | 200 | 400 | 400 | 0 | 400 |

収録待ちは公式除外・採点対象外を意味しない。全400問の本文・図・全肢解説を備えた未公開教材という依頼は未完了である。類題・生成問題や仮のQuestionレコードは作成していない。

## 検証

二級建築士の出典台帳追加後:

- `pnpm install --store-dir /tmp/kenchikushi-pnpm-store`: 成功。既定キャッシュが書き込み不可のため `COREPACK_HOME=/tmp/kenchikushi-corepack` を指定した。最初の既定キャッシュでの実行は失敗。
- `pnpm validate:questions`: 成功。26,444問、fail=0、warn=16,808（既存データ）。今回の台帳はQuestionデータではなく、この検証の対象問数には含まれない。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 成功。
- `pnpm exec vitest run __tests__/questions/kenchikushi2-source-inventory.test.ts __tests__/lib/home-directory.test.ts __tests__/questions/live-qualification-coverage.test.ts`: 3ファイル・21テスト成功。公式正答200件の期待値、問題数、出典、公開レジストリへの混入がないことを検証。
- `git diff --check`: 成功。

問題本文がないため、これらの成功をこの資格の教材完成の証拠にはしない。

木造建築士の出典台帳追加後:

- `pnpm validate:questions`: 成功。26,444問、fail=0、warn=16,808（既存データ）。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 成功。
- `pnpm exec vitest run __tests__/questions/kenchikushi2-source-inventory.test.ts __tests__/questions/mokuzo-kenchikushi-source-inventory.test.ts __tests__/lib/home-directory.test.ts __tests__/questions/live-qualification-coverage.test.ts`: 4ファイル・24テスト成功。全400件の正答の期待値、各回100問の台帳、施工問12の別方法の確認と出典注記、公開レジストリへの非登録を検証。
- `git diff --check`: 成功。

## コミットの受け渡し

- 読み取り専用の元リポジトリではHEADを変更できない。変更ファイルは元の作業ツリーにも保存してあるが、そこでの状態は未コミット。
- 一時チェックアウト: `/tmp/ipa-kenchikushi-work`。二級建築士の台帳を `949b4715`（`chore(kenchikushi2): stage official source inventory and 200 answer keys`）として先にコミット。その後、木造建築士の台帳を別コミットとして保存する。
- 2コミットの受け渡し用Git bundle: `/tmp/kenchikushi2-latest2.bundle`。元のHEADを前提とする差分bundleとして作成する。
- これらは出典・正答台帳のコミットであり、問題収録完成のコミットではない。

`pnpm build`・デプロイ・push・PR作成は実行していない。
