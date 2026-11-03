# keiryoshi 直近2回 収録前監査

監査日: 2026-11-03（UTC）
対象: 一般計量士・環境計量士（濃度関係）・環境計量士（騒音・振動関係）
作業ブランチ: `claude/vibrant-allen-nla4zw`

## 結果

**未完了。追加は全資格0問。公開・ステージングへの問題登録は未実施。**
公式PDFの取得拒否（HTTP 403）、Gitメタデータの読み取り専用制限、pnpm/Corepack及び独立レビューの起動失敗を確認した。ユーザーの「迂回せず報告」に従い、プロキシ・別ホスト・キャッシュ設定変更・権限変更等による迂回は実施していない。権利条件を中断理由にしていない。

## 対象回と公式根拠

[経済産業省「過去の計量士国家試験問題」](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/23_kakomon.html) の公式ドメインの検索結果本文（最終更新日2026-06-18）に、第76回、第75回、第74回、第73回、第72回の順で掲載されていることを確認した。したがって今回の対象は第76回・第75回。直接取得はHTTP 403であり、一覧HTMLやリンク先全件を取得したとは扱わない。

| 対象回 | 実施日 | 日付・区分・科目対応の公式根拠 |
| --- | --- | --- |
| 第76回（令和7年12月） | 2025-12-14 | https://www.meti.go.jp/information/license/data/c251215aj.html |
| 第75回（令和6年12月） | 2024-12-15 | https://www.meti.go.jp/information/license/data/c241216aj.html |

上記の公式正答案内の検索結果本文で日付と科目対応表を確認した。第76回案内の直接取得はHTTP 403。検索結果の抜粋を、問題全文や原本PDFの照合の代用にはしていない。

### 正答の訂正（再開時の必須事項）

第76回の公式正答案内には次の訂正が掲載されている。

- 2025-12-18: 法規 問21を「1」から「2」に訂正。
- 2026-01-22: 環濃 問3を「全員正解」に訂正。

根拠: https://www.meti.go.jp/information/license/data/c251215aj.html

環濃問3については[公式訂正発表](https://www.meti.go.jp/press/2025/01/20260122003/20260122003.html)の検索結果本文でも確認。正答表の検索結果に旧正答「5」が残っているため、その値を採用しない。収録再開時には、全員正解を正しく扱える採点・表示方法を確認する。

## 重複確認と既存方式

- `CLAUDE.md` を最初に読んだ。探索対象の上位ディレクトリ及びリポジトリ内に適用される `AGENTS.md` は見つからなかった。
- `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を `keiryoshi`・`keiryo`・`計量士` で検索し、該当資格の既存データ・登録は0件。別資格の解説にある「計量法」の言及は対象資格の成果物とは扱わない。
- `git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` で374ブランチの名前と先端ハッシュを取得し、資格名・slugに相当する名前は見つからなかった。ブランチ名が任意の場合の重複までは否定できない。
- `git fetch --no-tags origin '+refs/heads/claude/*:refs/remotes/origin/claude/*' '+refs/heads/qual/*:refs/remotes/origin/qual/*' '+refs/heads/codex/*:refs/remotes/origin/codex/*'` は `cannot open '.git/FETCH_HEAD': Read-only file system` で失敗。全リモートブランチの内容を照合できていないため、重複確認完了とは報告しない。
- 類似データ `data/questions/gas/kou/{ready.json,index.ts}`、事前公開候補を扱う `__tests__/questions/medical44-prepublication.test.ts` を確認。集約は `data/questions/index.ts`、遅延ロードは `lib/questions/get-questions.ts`。資格一覧 `app/qualifications/page.tsx` はカタログの `status === "live"` を抽出する。公開判定は `lib/qualifications/catalog.ts` の `isExamPublished`。問題のない状態でこれらへ接続する必要があるが、今回の登録変更はない。

## 資格ごとの追加問数・除外

| 資格 | 対象専門科目 | 共通科目 | 第76回追加 | 第75回追加 | 今回の扱い |
| --- | --- | --- | --- | --- | --- |
| 一般計量士 | 一基・計質 | 法規・管理 | 0 | 0 | 取得・照合未完了で未収録 |
| 環境計量士（濃度関係） | 環化・環濃 | 法規・管理 | 0 | 0 | 取得・照合未完了で未収録 |
| 環境計量士（騒音・振動関係） | 環物・環音 | 法規・管理 | 0 | 0 | 取得・照合未完了で未収録 |

公開一覧には各回8科目の問題と正解番号が掲載されている。公式問題表紙の検索結果には25問・五肢択一とあり、原問数の予定は各回8科目×25問=200問、2回で400原問（共通科目の資格間重複を除く）。資格別では各回100問、2回200問の予定だが、原本全ページによる最終件数照合は未実施。

「公式未公開」を理由に対象回を除外したものはない。両回とも公式一覧には公表されているが、今回の実行環境では原本照合を完了できず全科目を未収録とした。第74回以前への差し替えも行っていない。問題本文・全肢解説・必要図・全問正答照合はすべて未実施。

## PDF取得状況

一覧の直接取得が拒否されているため、リンクURLが未確定のPDFについてはファイル名を推測せず、公式一覧での名称を記載する。「未取得・URL未確認」はそのPDF自体にHTTP 403を観測したという意味ではない。

公式一覧: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/23_kakomon.html

| 回 | PDF | URLまたは公式一覧の項目 | 結果 |
| --- | --- | --- | --- |
| 76 | 環化 | https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/1_R07kanka.pdf | 直接取得 HTTP 403 |
| 76 | 環物 | https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/2_R07kanbutsu.pdf | 直接取得 HTTP 403 |
| 76 | 環濃 | https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/3_R07kannou.pdf | 直接取得 HTTP 403 |
| 76 | 環音 | 公式一覧「令和7年12月実施」環音（4,391KB） | 未取得・URL未確認 |
| 76 | 法規 | 同 法規（1,283KB） | 未取得・URL未確認 |
| 76 | 管理 | 同 管理（1,837KB） | 未取得・URL未確認 |
| 76 | 一基 | 同 一基（4,029KB） | 未取得・URL未確認 |
| 76 | 計質 | 同 計質（1,645KB） | 未取得・URL未確認 |
| 76 | 正解番号 | https://www.meti.go.jp/information/license/data/pdf/c251215aj.pdf | 直接取得 HTTP 403。訂正版原本のリンク照合も未完了 |
| 75 | 環化 | https://www.meti.go.jp/policy/economy/hyojun/techno_infra/1_R06kanka.pdf | 直接取得 HTTP 403 |
| 75 | 環物 | 公式一覧「令和6年12月実施」環物（538KB） | 未取得・URL未確認 |
| 75 | 環濃 | 同 環濃（398KB） | 未取得・URL未確認 |
| 75 | 環音 | 同 環音（541KB） | 未取得・URL未確認 |
| 75 | 法規 | 同 法規（273KB） | 未取得・URL未確認 |
| 75 | 管理 | 同 管理（504KB） | 未取得・URL未確認 |
| 75 | 一基 | 同 一基（251KB） | 未取得・URL未確認 |
| 75 | 計質 | 同 計質（351KB） | 未取得・URL未確認 |
| 75 | 正解番号 | https://www.meti.go.jp/policy/economy/hyojun/techno_infra/75seikaibangou.pdf | 直接取得 HTTP 403 |

直接取得はWebツールの通常のopenで実施。ログイン、CAPTCHA、ボット拒否の迂回はしていない。

## 権利条件

ユーザー提示のオーナー決定（2026-11-04 01:30）「この資格は権利確認済み」を作業上の承認として扱う。転載条件・使用許諾申請の文言を中断理由にしていない。公式一覧とPDFの直接取得が拒否されたため、今回確認できた検索結果からは本資格の転載条件・使用許諾申請に関する固有の文言を確認できなかった。未確認の文言は引用・創作しない。

## 検証・独立レビュー・コミット

- `pnpm install`: 失敗。Corepackが `/root/.cache/node/corepack/v1` を作成できず `ENOENT`。依存関係のインストール未完了。
- `pnpm validate:questions`: 同じCorepackエラーで起動不可。検証合格ではない。
- `pnpm typecheck`: 同じCorepackエラーで起動不可。メモリ不足ではないためヒープ上限変更は行っていない。
- 関連テスト `pnpm test __tests__/questions/qualification-expansion.test.ts`: 同じCorepackエラーで起動不可。
- 指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` による起動確認: `failed to initialize in-process app-server client: Read-only file system (os error 30)`。独立レビュー・指摘修正・再レビュー合格は未達。監査報告自体も同じ指定で独立レビューを試行し、同じ初期化エラーで失敗。合格判定は得られていない。
- `pnpm build`、push、PR作成、デプロイ、main変更は実施していない。
- `git add reports/cloud-keiryoshi-latest2.md` は `.git/index.lock: Read-only file system` で失敗。ステージできずコミット未作成。報告ファイルは作業ツリーに未追跡のまま保存した。

## 再開に必要な条件

公式PDFを通常の方法で取得でき、Gitメタデータ、Corepack及び指定Codexレビューが許可された環境が必要。その環境で全リモートブランチの内容を重複確認し、資格ごとに原文・正答・全肢解説・必要図・件数の照合、ステージング登録、指定検証と独立再レビュー、資格単位のコミットを完了する。今回の報告を公開可能な完成データとして扱わない。
