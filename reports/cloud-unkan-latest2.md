# 運行管理者（貨物・旅客）直近2回監査

確認日：2026-11-03 UTC。TASK slug：`unkan`。作業ブランチ：`claude/keen-lamport-eqgo18`。

## 結果

貨物・旅客とも追加0問、ステージング登録0問。直近の実施2回の問題・正答は公式非公開のため、TASKの「公式に全問または正答が公開されていない回は作れないので、理由を報告して次へ進む」に従って両資格を除外した。権利条件や過去のSTOP記録を理由とした停止ではない。2026-11-04 01:30のオーナー権利確認済み指示を適用した。

## 対象回と根拠

[公式トップページ](https://www.unkan.or.jp/)のお知らせが読み込む[公式お知らせJSON](https://www.unkan.or.jp/contents/infodata.json)で、結果発表の直近2件を確認した。

| 対象回（貨物・旅客共通） | 結果発表日 | 公式情報番号 | 貨物追加 | 旅客追加 | 除外理由 |
| --- | --- | --- | --- | --- | --- |
| 令和8年度第1回 | 2026-09-24 | 231 | 0問 | 0問 | 実施回全体の問題・正答が非公開 |
| 令和7年度第2回 | 2026-04-01 | 102 | 0問 | 0問 | 実施回全体の問題・正答が非公開 |

[公式FAQ Q40/A40](https://www.unkan.or.jp/help.html)は「後日の試験問題及び正答の公表は行いません。」と明記している。直近2回の全問題・公式正答を照合できないため、推測・再現・生成による補完はしない。

## 公開資料と実施回の区別

[過去の試験問題ページ](https://www.unkan.or.jp/past.html)はJavaScriptで[PDF一覧JSON](https://www.unkan.or.jp/contents/after_pdf.json)を取得し、各年度を「試験出題例」と表示する。確認時のJSON更新日時は `2026/10/13 09:00`、掲載は令和6年度・令和5年度の2年度のみ。これらを令和8年度第1回・令和7年度第2回の全問題とみなす根拠はない。年度の出題例を個別の実施回に割り当てず、今回の収録対象から除外した。出題例が生成問題であるという判断はしていない。

| 出題例年度 | 貨物問題 | 貨物正答 | 旅客問題 | 旅客正答 |
| --- | --- | --- | --- | --- |
| 令和6年度 | [問題](https://www.unkan.or.jp/contents/pdf/past/2024/kamotsu/mondai.pdf) | [正答](https://www.unkan.or.jp/contents/pdf/past/2024/kamotsu/seitou.pdf) | [問題](https://www.unkan.or.jp/contents/pdf/past/2024/ryokaku/mondai.pdf) | [正答](https://www.unkan.or.jp/contents/pdf/past/2024/ryokaku/seitou.pdf) |
| 令和5年度 | [問題](https://www.unkan.or.jp/contents/pdf/past/2023/kamotsu/mondai.pdf) | [正答](https://www.unkan.or.jp/contents/pdf/past/2023/kamotsu/seitou.pdf) | [問題](https://www.unkan.or.jp/contents/pdf/past/2023/ryokaku/mondai.pdf) | [正答](https://www.unkan.or.jp/contents/pdf/past/2023/ryokaku/seitou.pdf) |

8件とも通常の公開URLから取得・テキスト抽出に成功。問題PDFは各30問の出題例。取得できなかった掲載PDF：なし。直近実施2回のPDF URLは掲載されておらず、URLを推測して取得しない。ログイン、CAPTCHA、ボット拒否の迂回なし。PDFのURL・サイズ・SHA-256を [source-audit.json](unkan-evidence/source-audit.json) に保存した。

## 既存成果・追加方式

作業前に `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library`、`data/qualification-staging` を確認し、`unkan`・運行管理者の収録なし。

類似資格の `data/questions/eisei1`、`data/questions/eisei2` と `lib/questions/types.ts`、`lib/exam-config.ts`、`data/questions/index.ts`、`lib/questions/load.ts`、`lib/qualifications/catalog.ts`、`lib/exam-library-catalog.ts` を確認。公開可否は `isExamPublished` と資格台帳の `status`、公開前の別置き例は `data/qualification-staging/sagyo-ryohoshi/ot13-recovered`。対象原問を確定できないため空の資格・ルート・公開資格一覧は追加しない。

origin の `claude/*`・`qual/*`・`codex/*` は `git ls-remote --heads` で列挙し、[参照名とコミット一覧](unkan-evidence/origin-heads.txt) を保存。作業リポジトリの `.git` は読み取り専用でfetchできないため、公開originを `/tmp/unkan-origin-audit/repo.git` にbare cloneして各対象ブランチを確認した。

ブランチ内容監査：374ブランチについて対象データディレクトリのパス名を `unkan`・`kamotsu`・`ryokaku`・運行管理者で検索し、存在する資格台帳137種類の内容を `unkan`・運行管理者で検索。該当成果なし。台帳が存在しない古いブランチもパス検索には含めた。[監査集計](unkan-evidence/origin-audit.json)を保存。

## 転載条件・使用許諾の文言（記録のみ）

[公式FAQ Q40/A40](https://www.unkan.or.jp/help.html)には「試験問題は著作権法で保護されています」とあり、受験問題の第三者への共有・開示に関する禁止と措置を記載している。[過去問ページ](https://www.unkan.or.jp/past.html)のフッターは `Copyright © NECO. All rights reserved.`。同ページ本文・掲載PDF・[問い合わせページ](https://www.unkan.or.jp/contact.html)・[個人情報保護ポリシー](https://www.unkan.or.jp/policy.html)の確認範囲では、公開出題例の転載条件・使用許諾申請手順を特定できなかった。明示条件がないことを自由利用の根拠とはしない。TASKのオーナー権利確認済み決定を優先し、これらの表示を収録中止理由にしていない。問い合わせの送信はしていない。

## 検証・独立レビュー

- `pnpm install`：成功。書込可能な `/tmp` にCorepack・pnpmキャッシュを指定した。
- `pnpm validate:questions`：成功。26,444問、fail=0、既存警告16,808件。新規問題なし。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功（exit 0）。
- `pnpm exec vitest run __tests__/exam-catalog-browser.test.tsx __tests__/exam-qualification-hubs.test.ts __tests__/exam-library-integration.test.ts`：3ファイル・12テスト成功。[実行結果](unkan-evidence/related-tests.log)。
- 指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` を実行したが、`failed to initialize in-process app-server client: Read-only file system (os error 30)` で起動失敗。[公式OpenAI設定リファレンス](https://learn.chatgpt.com/docs/config-file/config-reference)を確認し、`--ephemeral` と `/tmp` の `sqlite_home`・`log_dir` を追加して再試行しても同じ初期化エラー。代替として別エージェントの同一モデル `gpt-6-astra`・reasoning `medium` に独立レビューを実施し、除外監査としてPASS。レビュアーは公式FAQ・お知らせJSON・PDF一覧を独自確認し、8PDFを再取得してサイズ・SHA-256全件一致と問題4PDF各30問を確認した。指摘された監査の時制を修正し、最終再レビューもPASS（追加指摘なし）。[レビュー記録](unkan-evidence/independent-review.md)。指定CLIでのレビュー合格とは扱わない。
- 関連テストの初回指定で `pnpm test -- ...` が全体実行になったため、上記の `pnpm exec vitest run ...` で関連12テストを別途完了後、不要な全体実行を中断（exit 130）。全体テスト合格とは主張しない。
- build・デプロイ・push・PR作成：未実施。

原問を追加していないため、新規の正答・全肢解説・図版の照合対象は0問。公開可能な問題追加が完了したという主張はしない。

## コミットの制約

環境の権限プロファイルが `/home/user/ipa-quiz-site/.git` を読み取り専用に指定しており、Gitは `.git/FETCH_HEAD` への書込みを `Read-only file system` で拒否した。`git add reports/cloud-unkan-latest2.md reports/unkan-evidence` も `.git/index.lock` 作成時に同じエラーで失敗した。現在のブランチのインデックス・オブジェクト・参照を更新できず、資格別コミットは未実施。監査レポートと根拠ファイルを作業ツリーに保存した。
