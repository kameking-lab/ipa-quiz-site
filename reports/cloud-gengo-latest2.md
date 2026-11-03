# 言語聴覚士 直近2回の公式資料監査

確認日: 2026-11-03。実装は未公開ステージング。**直近1回・2回の全問収録は未完了**。

## 対象回の確定

- 第28回: 2026-02-21実施。[厚生労働省の合格発表](https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken21/about.html)。200点満点。
- 第27回: 2025-02-15実施。[厚生労働省の合格発表](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken21/about.html)。採点除外2問により198点満点。
- [財団トップ](https://www.pmet.or.jp/)の最新合格発表は第28回。[第29回受験案内](https://www.pmet.or.jp/_files/ugd/e1ce19_ea84ffbba9164f8988ed463cb1853cea.pdf)で第29回は2027-02-20実施予定と確認。回次を既存データや年から推測していない。

## 公表範囲と収録範囲

厚労省の両合格発表ページ、財団トップ・試験登録部のお知らせ、両ドメインに絞った問題公開検索を確認。全問題冊子の公式公開URLは確認できなかった。「非公開」と断定するものではない。第三者サイトの問題・推定解答は採用していない。

| 回 | 午前の本文確認済み問題 | 公式正答・取扱い | 保存先 |
|---|---|---|---|
|28|14|4または5|2026-annual.json|
|28|35|1または3|2026-annual.json|
|28|69|1または2|2026-annual.json|
|28|83|1または2|2026-annual.json|
|27|40|3または4|2025-annual.json|
|27|36・48|採点除外|excluded.json（演習対象外）|

問題PDFは `https://www.mhlw.go.jp/general/sikaku/successlist/{2026または2025}/siken21/dl/{28または27}A{問番号}.pdf`。各データに実URLを保存。正答は同ディレクトリの [28seitou.pdf](https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken21/dl/28seitou.pdf)、[27seitou.pdf](https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken21/dl/27seitou.pdf)と照合。

第28回4/200問、第27回3/200問の本文を確認。計7/400問（採点対象候補5問、除外アーカイブ2問）。残る393問は公式本文未確認で未収録。午後は両回とも本文未収録。時間不足による後回しではなく、指定された公式問題本文を確保できていないため、直近1回完了の条件も満たせていない。

## 原文照合・採点・解説

9件の公式PDF（問題7・正答2）を `docs/evidence/gengo-latest2/` に保存しSHA-256を記録。問題PDF全7ページを画像化して目視し、本文・全5肢を手動でテキスト転記。レイアウト由来の改行、字間、組合せを結ぶ罫線、英数字の表示幅はテキスト表示用に整理した。問48のa〜eの文も本文中に保存。本文・選択肢を画像だけで代用していない。7問に出題用の図・写真はなく、候補5問のhasImageはfalse。スキャンPDF自体であることを出題図とは扱わない。

複数正答5問は内部キーの配列とrequiredSelections: 1で保存。2肢同時選択を要求しない。採点除外2問には架空のanswerを付与せず、Question配列から分離した。公式正答を一般的な医学知識で上書きしていない。

解説・選択肢解説は独自作成。第28回35・83など、公式が正解とした理由の専門的な裏付けを十分確認できていない箇所は、公式採点の説明を中心としている。全候補はneedsReview:trueとしてあり、全肢の専門根拠の確認が残る。検査の補足根拠として[標準抽象語理解力検査の発行元](https://www.intern.co.jp/?p=576)でSCTAWが抽象語の言語理解力検査であることを確認。原文・正答の出典は厚労省PDFであり、この補足ページを問題本文の出典に用いていない。

## 登録と未公開の仕組み

既存のrigaku-ryohoshi・sagyo-ryohoshi・shino-kunrenshiのデータ構成、ExamCode、EXAM_CONFIGS、同期・非同期問題ローダー、数値選択肢表示、SEO名称、ホーム資格一覧、QUALIFICATION_CATALOGを確認。同じ箇所にgengo-chokakushiを登録した。

資格台帳はstatus: ready-to-ingest（liveではない）。既存isExamPublishedゲートを通すため、公開問題レジストリ、クイズ区分一覧、ホーム一覧、問題詳細URLに候補は露出しない。候補自体もneedsReviewで二重に除外する。公開前でもvalidate:questionsで候補5問を検証するよう追加。公開の承認や転載条件の最終判断は行っていない。

## 検証

実行結果は下記追記。pnpm build・デプロイは実行していない。秘密値や環境変数の内容は出力していない。

- `pnpm install`: 成功（pnpm 10.33.0）。postinstallのPrisma生成も成功。
- `pnpm validate:questions`: 成功。26,449問、ok=26,449、fail=0、warn=16,813。警告は既存データおよび短い原文設問等で、警告を回避するために公式原文を水増ししていない。
- `pnpm exec vitest run __tests__/questions/gengo-latest-two.test.ts __tests__/questions/get-questions.test.ts __tests__/lib/home-directory.test.ts __tests__/lib/exam-config-integrity.test.ts`: 4ファイル・111テスト成功。複数正答、採点除外分離、公式PDFのハッシュ、同期/非同期の公開抑止、ホーム非表示、詳細URLの404を確認。
- `pnpm typecheck`: 既定のNodeヒープ上限でメモリ不足となったため、`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`で再実行。SEO説明文の登録漏れを修正後、終了コード0で成功。
- `pnpm validate:questions --exam=gengo-chokakushi`: 5件すべて成功（fail=0）。needsReviewによる除外の警告を保持。
- `git diff --check`: 成功。
