# ガス主任技術者（甲・乙・丙）最新2回の未公開準備

対象はJIA公式一覧に掲載された2026（令和8）年度と2025（令和7）年度。
各級・各年度は法令16、基礎15、ガス技術27の計58原問。6冊で**348原問**。
基礎10・ガス技術20という受験者の選択解答数から原問総数を減らさない。
同じ問番号が科目ごとに繰り返されるため、identityは級・年度・科目・問番号で定める。

このパッケージに原問本文、選択肢、正答表、解説は収録されていない。
保存原稿も0件であり、完成問題数・公開増分はともに0。348は必要数であって成果数ではない。
論述は原典URLのみ保存し、原問総数は未確認のためnull。甲乙は論述PDFを共有する。
JIAの公開解答はマークシート対象であり、論述の模範解答を公式正答と扱わない。

`gate.json` は既存の
`note-automation/reports/qualification-expansion-20261007/approved35/independent/industrial-sources-only/SOURCE-ONLY-LEDGER.json`
のガス行（approvedRank 16）をSHA-256で結び付ける。
同台帳の `HOLD_PROVIDER_PERMISSION_REQUIRED` と「原問・正答PDFの読取は権利ゲート後」という境界を保持する。
提供元の許諾・利用権を宣言していない。掲載判断とHOLD解除はユーザーと統合担当が扱う。

公式資料のURLと全348identityを固定し、候補の科目別重複、最新main/既存PRとのidentity重複、
正答番号範囲、全5肢の説明欠落、年度・級と出典の取り違え、図表・代替テキスト欠落を機械で検出できる。
構造検査だけでは内容の正確性を認定しない。公開Question schema・資格カタログ・ルートに接続していない。

```sh
node data/prepared-industrial/gas/audit.mjs
node --test --test-isolation=none data/prepared-industrial/gas/validate.test.mjs
# HOLD解除後、保存原稿と最新main/open PRの正規化identityを照合するための読取専用検査:
node data/prepared-industrial/gas/audit.mjs candidate.json existing-main-and-pr-identities.json
```

再開条件は既存HOLDの解除を明示する記録と範囲の確定。その後に公式原本を正規取得し、
本文・正答表を照合して図表を確認、全肢解説を保存、原問単位で重複排除して検証する。
HOLD付きmanifestを書き換えただけでは公開承認にならない。
