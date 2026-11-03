# 臭気判定士（shuki）直近2回の公式資料監査

確認日：2026-11-03（UTC）。作業ブランチ：`claude/admiring-hypatia-9lnj7i`。

## 結果

追加問題数は **0問**。対象の令和7年度・令和6年度について、指定出典で問題本文・全選択肢の公開PDFを確認できなかったため、両回とも収録対象から除外した。資格登録・問題データ・ルーティング・公開状態は変更していない。

オーナーの権利確認済み決定を適用した。除外理由は権利未確認や転載条件ではなく、公式問題本文を取得・照合できないこと。正答から問題を復元したり、類題・生成問題で補ったりしていない。

## 対象回と根拠

公式の[臭気判定士試験案内](https://orea.or.jp/hanteishi/shiken/)「過去の問題」の先頭2回を対象とした。令和8年度は[公式日程](https://orea.or.jp/2026/04/01/r08-omo-test/)で2026年11月29日実施予定と確認でき、監査日現在は実施前のため対象外。

| 対象 | 正答表で確認できる問題番号 | 追加 | 除外理由 |
| --- | --- | --- | --- |
| 令和7年度（2025年度） | 問1〜44 | 0問 | 問題本文・全選択肢の公開PDFを確認できず、原文・図・全肢解説の照合ができない |
| 令和6年度（2024年度） | 問1〜44（検索サービス保持の正答表による。現物未取得） | 0問 | 問題本文・全選択肢の公開PDFを確認できず、正答PDFの元URLもHTTP 404 |

全88番号を収録対象から除外。ただし令和6年度の問題数44は正答表の検索保持内容による補助確認であり、取得済み公式問題PDFとの問題数照合に合格したという意味ではない。

試験案内は、過去問題を機関誌に掲載し、抜粋版を購入するか協会で閲覧するよう案内している。[販売書籍案内](https://orea.or.jp/books/)にも試験問題（学会誌抜粋）の販売と学会誌PDFの販売・会員向けダウンロードが掲載されており、確認した公開ページに問題本文の直接PDFリンクはなかった。購入申込み、外部への連絡、会員ログインは行っていない。

掲載号の注意：試験案内は令和7年度をNo.303、令和6年度をNo.296と記載する。一方、[2025年1月の公式刊行案内](https://orea.or.jp/2025/01/27/journal-of-japan-association-on-odor-environment-vol-56-no-1-2025-jan-no299/)はNo.299で、[令和6年度事業報告書](https://orea.or.jp/cp-bin/wordpress5/wp-content/uploads/2025/06/R07-09.pdf)の「試験問題と正答の公表」もNo.299を記載する。案内間の不一致として記録し、推測で掲載号を確定しない。

## PDF取得結果

| 資料 | URL | 取得結果 |
| --- | --- | --- |
| 令和7年度 問題本文 | 公開PDF URLを確認できず（上記試験案内・販売案内） | 未取得 |
| 令和7年度 正答番号 | https://orea.or.jp/cp-bin/wordpress5/wp-content/uploads/2025/12/R07-seitoubangou.pdf | HTTP 200、application/pdf、70,493 bytes。直接取得・テキスト抽出で問1〜44の連番44行を確認 |
| 令和6年度 問題本文 | 公開PDF URLを確認できず（上記試験案内・販売案内） | 未取得 |
| 令和6年度 正答番号 | https://orea.or.jp/cp-bin/wordpress5/wp-content/uploads/2024/12/2024.12.02-seitoubangou-R06.pdf | 直接取得はHTTP 404。検索サービスの保持内容では問1〜44を確認できるが、公式PDF現物取得の代わりには扱わない |

令和7年度正答PDFのSHA-256：`38fc6bacb6d8acbb82480236033c631892c954be9edc5bb94455df73b8364ec1`。
取得した資料は一時監査用で、問題データとして登録していない。ログイン・CAPTCHA・ボット拒否の迂回はしていない。

## 転載条件の記録

両年度の正答表に「転載禁止」の表示がある。[公式著作権案内](https://orea.or.jp/pc-rules/publish-co/)には、協会への権利帰属、承諾を得ず認められる範囲を超えた利用の禁止、転載時の事前告知・許可・出所明示等の条件が掲載されている。依頼のオーナー決定を優先し、これらの文言を取得・収録停止の理由にはしていない。

## 重複確認・既存方式

- 作業前に `CLAUDE.md` を読んだ。適用対象の `AGENTS.md` は見つからなかった。
- ローカルの `data/questions`、`data/exam-library`、`reports`、`lib/qualifications/catalog.ts` に `shuki` / `臭気判定士` の既存成果はなかった。
- originの `claude/*`・`qual/*`・`codex/*` を別のbareリポジトリに取得し、372ブランチ（claude 106、codex 266、qual 0）を確認した。各先端の `data/questions`・`data/exam-library`・`reports` のパスに `shuki` / `臭気判定士` はなく、`lib/qualifications/catalog.ts` と `data/exam-library/official-catalog.json` の重複をまとめた146個のblob本文にも該当はなかった。別名ファイルでの全問題本文の網羅検索や削除済みブランチの履歴調査は行っていない。
- 類似資格 `data/questions/eisei1/index.ts`、問題登録 `data/questions/index.ts`、遅延ロード `lib/questions/get-questions.ts`、資格カタログを確認した。既存方式ではカタログの `isExamPublished()` が公開データを制御し、資格一覧は `status === "live"` で絞り、年度別ルートは利用可能資格・問題群で存在を判定する。
- 今回は収録可能な公式原問が0問のため、空の資格や公開可能と誤認される登録は追加せず、監査報告のみを作成した。

## 検証・独立レビュー・コミット

実行結果：

- `pnpm install`：成功。初回はCorepackの標準キャッシュが書込み不可で失敗したため、`COREPACK_HOME`・`XDG_CACHE_HOME`・pnpm storeを `/tmp/shuki-audit` 配下に指定して完了した。
- `pnpm validate:questions`：成功。26,444問、fail=0、warn=16,808。警告は既存データに対するもので、今回の追加問題は0問。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功、終了コード0。
- `pnpm exec vitest run __tests__/questions/live-qualification-coverage.test.ts __tests__/questions/medical44-prepublication.test.ts`：2ファイル・12テストすべて成功。公開資格カバレッジと未公開データのゲートを確認した。先行した `pnpm test -- ...` は全体実行になったため中断し、対象ファイルを明示した上記コマンドで検証した。
- 全問の原文・正答・全肢解説・図の照合：原問未取得のため実施不可。問題収録完了・公開可能とは判定していない。
- `pnpm build`、デプロイ、PR作成、mainへの操作は実施していない。

指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` による独立レビューを試行したが、`failed to initialize in-process app-server client: Read-only file system (os error 30)` で起動できなかった。[OpenAI公式設定資料](https://learn.chatgpt.com/docs/config-file/config-reference)を確認して `sqlite_home` と `log_dir` を `/tmp` に指定し、`--ephemeral` を付けても同じ初期化エラーとなった。代替として、独立した `gpt-6-astra`・推論強度mediumのエージェントによる読み取りレビューを実施した。公式案内・日程・販売案内・両年度の正答取得状況と既存公開ゲート、調査・検証ログを独立確認し、**監査報告として合格、修正必須の指摘なし**との判定を得た。これは問題収録・公開準備完了の合格を意味しない。

この環境では `.git` が読み取り専用であり、通常の `git fetch origin` は `.git/FETCH_HEAD` の書込みで失敗した。リモート調査は `/tmp` に用意した別のbareリポジトリで行った。`git add reports/cloud-shuki-latest2.md` も `.git/index.lock` を作成できず失敗したため、コミット・pushは未実施。元のブランチは切り替えていない。

レビュー結果追記後の最終版についても、同じ独立エージェントによる再レビューで監査報告として合格、修正必須の指摘なしとの判定を得た。

コミット時に必要な末尾（未コミットの場合の引継ぎ用）：

```text
Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01TieomF6NEd5W8JCXbHJRZf
```
