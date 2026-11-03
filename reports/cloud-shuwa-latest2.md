# 手話通訳士（学科試験）直近2回監査（未完了）

確認日: 2026-11-03 / slug: `shuwa`

**公開不可・作業途中。160問のうち完成した問題データは2問。残る158問の本文・全肢解説・必要図の照合、指定CLIの独立レビュー合格、コミットは未完了。**

## 対象回と根拠

公式一覧: https://www.jyoubun-center.or.jp/slit/exam/past-exam/

一覧にある最新の学科試験は、第37回（令和8年度、2026-08-31公開）と第36回（令和7年度、2025-08-29公開）。実技試験の掲載日を学科試験の回の判定に使っていない。各回の公式正答表に4科目各20問、80問の正答がある。対象は合計160問。

| 回 | 問題Ⅰ・Ⅱ | 問題Ⅲ・Ⅳ | 公式正答 | 対象問数 | 完成済み |
|---|---|---|---|---:|---:|
| 37 | https://www.jyoubun-center.or.jp/jbmain/wp-content/uploads/2026/09/s-d3_37_01-02.pdf | https://www.jyoubun-center.or.jp/jbmain/wp-content/uploads/2026/08/s-d3_37_03-04.pdf | https://www.jyoubun-center.or.jp/jbmain/wp-content/uploads/2026/08/37_answers.pdf | 80 | 2 |
| 36 | https://www.jyoubun-center.or.jp/jbmain/wp-content/uploads/2025/08/s-d3_36_01-02.pdf | https://www.jyoubun-center.or.jp/jbmain/wp-content/uploads/2025/10/s-d3-36_03-04-2.pdf | https://www.jyoubun-center.or.jp/jbmain/wp-content/uploads/2025/08/36_answers.pdf | 80 | 0 |

全6PDF取得成功。取得不可PDF、全問または正答が非公開で除外した回はいずれもなし。ログイン・CAPTCHA・ボット拒否の迂回なし。残る158問は除外ではなく未整備。

## 重複確認

作業前に `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を検索し、同資格の登録なし。`git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` で375ブランチを確認し、同資格の成果なし。

362ブランチはローカルGitオブジェクトを検査。残る13ブランチはGitHubの再帰ツリー（省略なし）と資格台帳を確認。11ブランチは `/tmp` の別Gitリポジトリへ取得して同じ3領域を検索した。`claude/magical-newton-a0t56z` と `codex/cloud-sekou-1kenchiku-latest2` の最初のSHA `2edf160334dcc496080910cddd63674e446b4c9f` は、一覧取得後のfetchではローカルに存在しなかったため、当該SHAのGitHub再帰ツリーとraw資格台帳で確認した。いずれも重複なし。確認したrefとSHAは `data/exam-library/source-packs/shuwa/remote-branches.json` に保存。元リポジトリのfetchは `.git/FETCH_HEAD` が読み取り専用で失敗したため使用できなかった。

## 実装済みの範囲

- 資格台帳は `ready-to-ingest`。未完了事項を `remainingWork` に明示。
- 第37回・障害者福祉の基礎知識の問1・問2のみ、原PDFの4ページの画像で本文・4肢を目視照合し、公式正答4・4と独自の全肢解説を保存。改行・空白・括弧の表記は画面用に整形。図は不要。問2は出題時点の条約に関する問題である旨を明記し、外務省の条約本文を参照。
- 型、4科目の試験設定、同期・非同期の問題ロード、番号表示、科目ラベル、生成問題抑止、非公開候補を含む検証スクリプトを追加。
- 公開用資格一覧と問題一覧は既存の `isExamPublished` を使用。公開ルートに候補問題を露出させない。
- `data/exam-library/source-packs/shuwa` に6PDFのURL・SHA-256、全160問の公式正答、未照合OCRを保存。既存の公開 `official-catalog.json` に混ぜていない。OCRは番号欠落・誤認識・読み順の乱れがあり、問題データへの自動変換はしていない。

## 転載条件の記録

オーナーから本資格は権利確認済みと指定されており、利用条件を理由として停止していない。ライセンス値 `JYOUBUN-owner-authorized` はこの作業指示を表し、一般向けの公開ライセンスを意味しない。

公式の文言（抜粋）: 「利用者ご自身による新たな著作権処理の手続きが必要となります。」「聴力障害者情報文化センター公益支援部門（slit@jyoubun-center.or.jp）にお申し出のうえ、必要な手続きをとってください。」

公式一覧の「学科試験問題について」は、引用部分の再利用には利用者自身による権利処理を求め、試験問題の二次使用にはセンターへの申出と手続を求めている。公表期間は直近3回分。動画には複製禁止の記述があるが、本作業の対象は学科試験。

第三者出典の表示: 第37回Ⅱ問19は富士通のOntenna、Ⅳ問1〜6は前田エマ「魚屋の息子」（『過去の学生』、ミシマ社、2025-06-20）。第36回国語問題Ⅰは宮島未奈「幸せじゃなくても」（『JAF Mate』第63巻第1号、2025-01-13）。今後の本文照合時に原本の出典表示も保持する必要がある。

## 検証・独立レビュー・コミット

- `pnpm install`: 成功。書込可能な `/tmp` をCorepackキャッシュとpnpmストアに使用。lockfileの変更なし。
- `pnpm validate:questions`: 成功。26446問、fail=0、warn=16808。警告は既存データを含む。これは今回の160問すべての完成を意味しない。
- `pnpm typecheck`: 成功。
- 関連テスト: `pnpm exec vitest run __tests__/questions/shuwa.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/exam-library-model.test.ts`。3ファイル・1080テスト成功。公開ゲート、公式正答テーブル、追加済み問題の全肢解説、番号順固定、生成問題抑止を検査。
- `git diff --check`: 成功。
- 指定された `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` を実行したが、`failed to initialize in-process app-server client: Read-only file system (os error 30)` で起動失敗。`--ephemeral` と `/tmp` のlog_dir・sqlite_homeを追加した再試行、およびユーザー設定を読まない再試行も同じエラー。独立レビューは実施できておらず、合格と記載できない。
- `git add` は `.git/index.lock: Read-only file system` で失敗。元リポジトリでのコミットは不可能だった。ファイルの変更はワークスペースに保存済み。
- build・デプロイ・push・PR作成・main操作は実施していない。

## 残作業

第37回の残り78問と第36回80問の本文・選択肢を原本照合し、読解共通本文・傍線・空欄・必要図を含めて実装する。全158問の独自全肢解説、出題時点の法令注記を整備する。全160問の問題数・公式正答・出典を照合し、レビュー可能な環境で指定モデルの独立レビューと修正・再レビューを行う。最後に全検証を再実行し、書込可能なGit環境でコミットする。現時点で公開切替してはならない。
