# kenki 直近2回 監査記録（未完了）

確認日：2026-11-03 UTC。対象：1級・2級建設機械施工管理技術検定（第一次検定）。

## 結果

**問題追加0問。資格追加・公開可能なステージングデータの完成には至っていない。** 公式問題・正答の公開は確認できたが、実行環境のネットワークプロキシが `jcmanet-shiken.jp` への通常のHTTPS接続を CONNECT 時点で403拒否する。Web閲覧ツールでは22件のPDFの存在・テキストを確認できた一方、原本ファイルを保存できず、全問題・全肢・原図の照合は未実施。拒否は迂回していない。公式が非公開・削除したという判断ではない。

オーナー決定により本資格の権利確認は済んでいる。権利・転載条件・過去のSTOP記録を保留理由にしていない。告知ページには著作権表示（All Rights Reserved）があることのみ記録する。

## 対象回と根拠

- [指定された協会の技術検定一覧](https://jcmanet.or.jp/kentei/)の最新の問題公表告知は令和8年度、2026-06-22付。通常のHTTP取得では一覧を取得でき、その告知リンクは同協会試験部の専用サイトへ転送される。Web閲覧ツールではこの一覧がメンテナンス表示に転送されたため、両方の取得経路の結果を区別した。
- [令和8年度の公表告知](https://jcmanet-shiken.jp/2026/06/22/20260622/)：2026-06-22公表、2026-07-22更新。1級の問題PDFは末尾 `_260721.pdf` の現行リンクを採用。
- [令和7年度の公表告知](https://jcmanet-shiken.jp/2025/06/16/r7_1_2kyusikennmondai_kohyo/)：2025-06-16公表。
- [公式試験部トップ](https://jcmanet-shiken.jp/)と上記の公表告知を確認。第一次検定の最新2年度は令和8・7年度。2級の共通・第1〜第6種を対象とし、第二次検定や外国人技能実習評価試験を混ぜない。

| 資格 | 令和8年度の原問 | 令和7年度の原問 | 追加数 | 未収録数 |
| --- | ---: | ---: | ---: | ---: |
| 1級 第一次検定 | 56 | 56 | 0 | 112 |
| 2級 第一次検定（共通＋全6種） | 32＋20×6＝152 | 32＋20×6＝152 | 0 | 304 |
| 合計 | 208 | 208 | 0 | 416 |

原問数は問題冊子の表紙および正答表の番号範囲に基づく。受検者が解答する1級50問・2級45問と、冊子の全出題数を区別する。2級の共通問題は種別ごとに重複加算しない。

## 既存成果・追加方式の調査

- 作業開始時の `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` に `kenki` / `建設機械施工` の一致なし。既存の `data/qualification-staging` も確認。
- origin の `claude/*`・`qual/*`・`codex/*` 計374ブランチを `git ls-remote --heads` で取得。読み取り専用の作業元 `.git` へfetchできないため、許可された `/tmp` に監査用bareリポジトリを作り、同じリモートの対象ブランチを取得して調査。全374ブランチの対象データ領域のファイル名に `kenki` / `kensetsu-kikai` / `kenkikai` の一致なし。
- リモートの資格台帳 `lib/qualifications/catalog.ts` と公表試験カタログ `data/exam-library/official-catalog.json` について、374ブランチの重複を除いた146個のblob本文も照合し、`kenki` / `建設機械施工` の一致なし。ファイル名検索と本文検索の範囲を区別する。
- 類似資格 `data/questions/civil1/index.ts` は公式問題・正答URL、全肢解説、必要図を持つJSONを `Question` に変換。`data/questions/index.ts` は `isExamPublished` で公開を制御し、`lib/qualifications/catalog.ts` の `status: live` が公開条件。`app/qualifications/page.tsx` もliveだけを表示。
- 公表試験ライブラリは `lib/exam-library-catalog.ts` → `data/exam-library/official-catalog.json`、資格ハブは `lib/exam-qualification-hubs.ts` と対応するルートを参照。
- 今回は取得状況だけを `data/qualification-staging/kenki/source-inventory.json` に保存した。問題未整備のため資格台帳・問題レジストリ・公開一覧・ルートへの登録は未実施。空の資格や生成問題を過去問として登録していない。

## 原本をローカル取得できないPDF一覧

以下の22件はすべてWeb閲覧ではPDFとして確認できた。ローカル取得欄はホスト単位のプロキシ拒否に基づく分類であり、22件それぞれの配信元HTTPステータスを取得できたという意味ではない。解答用紙は収録に必須でないため一覧から除く。

| 年度 | 資料 | 公式PDF | ローカル取得 |
| --- | --- | --- | --- |
| 2026 | 1級 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/1_1kyu_1ji_shikenmondai_260721.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 共通 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/2_2kyu_1ji_shikenmondai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 第1種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/3_2kyu_1ji_1shu_shikenmondai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 第2種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/4_2kyu_1ji_2shu_shikenmondai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 第3種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/5_2kyu_1ji_3sju_shikenmondai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 第4種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/6_2kyu_1ji_4sju_shikenmondai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 第5種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/7_2kyu_1ji_5shu_shikenmondai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 第6種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/8_2kyu_1ji_6shu_shikenmondai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 1級 正答 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/17_1kyu_1ji_seikai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 共通 正答 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/18_2kyu_1ji_seikai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2026 | 2級 第1〜第6種 正答 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2026/06/19_2kyu_1ji_seikai.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 1級 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A0%EF%BC%91%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 共通 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A1%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E5%85%B1%E9%80%9A%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 第1種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A2%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E7%A8%AE%E5%88%A5%E7%AC%AC%EF%BC%91%E7%A8%AE%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 第2種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A3%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E7%A8%AE%E5%88%A5%E7%AC%AC%EF%BC%92%E7%A8%AE%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 第3種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A4%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E7%A8%AE%E5%88%A5%E7%AC%AC%EF%BC%93%E7%A8%AE%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 第4種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A5%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E7%A8%AE%E5%88%A5%E7%AC%AC%EF%BC%94%E7%A8%AE%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 第5種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A6%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E7%A8%AE%E5%88%A5%E7%AC%AC%EF%BC%95%E7%A8%AE%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 第6種 問題 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%A7%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E7%A8%AE%E5%88%A5%E7%AC%AC%EF%BC%96%E7%A8%AE%EF%BC%89%E8%A9%A6%E9%A8%93%E5%95%8F%E9%A1%8C.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 1級 正答 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%B0%EF%BC%91%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%EF%BC%89%E6%AD%A3%E8%A7%A3.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 共通 正答 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%B1%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E5%85%B1%E9%80%9A%EF%BC%89%E6%AD%A3%E8%A7%A3.pdf) | 未保存（接続先ホストのプロキシ403） |
| 2025 | 2級 第1〜第6種 正答 | [PDF](https://jcmanet-shiken.jp/gijutsu-kentei-shiken/wp-content/uploads/2025/06/%E2%91%B2%EF%BC%92%E7%B4%9A%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%A4%9C%E5%AE%9A%EF%BC%88%E6%8A%9E%E4%B8%80%E5%BC%8F%E7%A8%AE%E5%88%A5%EF%BC%89%E6%AD%A3%E8%A7%A3.pdf) | 未保存（接続先ホストのプロキシ403） |

## 除外・未完了の理由

- 1級：令和8・7年度のNo.1〜56、計112問を未収録。原本・必要図・全肢解説・公式正答の全問照合が未完了。
- 2級：両年度の共通No.1〜32と各種別No.1〜20、計304問を未収録。同じ取得制約によるもので、正答非公表や権利を理由とした除外ではない。
- 第二次検定：依頼範囲外。
- 法令問題の解説を作成する際は「出題時点の法令」と明記し、公式正答と照合する。今回は解説自体を作成していない。

## 検証・独立レビュー

- `pnpm install`：成功。Corepack・pnpmのキャッシュとストアを許可された `/tmp` 配下へ指定。
- `pnpm validate:questions`：既存26444問を検証しfail=0、warn=16808。kenkiは0問のため、この成功はkenkiの原本照合や品質合格を意味しない。
- `pnpm typecheck`：成功、終了コード0（`NODE_OPTIONS=--max-old-space-size=8192`）。
- 関連テスト：`pnpm exec vitest run __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/exam-qualification-hubs.test.ts __tests__/data/official-catalog-note-links.test.ts` は4ファイル1084テストすべて成功。
- 指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` を実行したが、`failed to initialize in-process app-server client: Read-only file system (os error 30)` によりモデルのレビュー開始前に終了コード1で失敗。`--ephemeral` と書き込み可能なログ・SQLite保存先を指定して再試行しても同じ失敗。独立レビュー・修正後の再レビュー合格は未達であり、本タスクを合格・完了とは扱わない。
- 代替の独立レビュー：指定と同じ `gpt-6-astra` / 推論強度mediumの別エージェントを新規コンテキストで起動。報告書・出典JSON・保存ログ・公開コードの差分を独立レビューし、監査記録の内部整合性に限って合格（修正必須の指摘なし）。資格追加タスク全体は未達との判定。追記後の再レビューでも限定範囲で合格。保存した公式Web閲覧結果で両年の原問数・公表日・更新日も確認された。22件の原本およびCONNECT403のネットワーク再取得は実施せず、その点の独立検証は含まない。
- 補足：最初の `pnpm test -- <対象ファイル>` はVitest側で絞り込みが適用されず全件実行になったため中断（終了コード130）。上記の `pnpm exec vitest run <対象ファイル>` で関連テストを明示して実行し直し、全1084テストが成功した。全件テストの合格は主張しない。
- `pnpm build`・デプロイ：実施せず。

## 再開時に必要な作業

公式配信の原本を正常に取得できる環境で、最初に重複確認を更新する。1級の両年度全112問を原文・四肢・正答・必要図・全肢解説まで完成させ、非公開登録、検証、独立レビューを完了して資格ごとにコミット・pushする。その後2級の両年度全304問について同じ手順を行う。本報告や出典一覧の完成を資格追加完了と扱わない。
