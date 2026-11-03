# 山口県 食品関係3資格・直近2回 監査

確認日: 2026-11-03（UTC）。依頼のオーナー決定「2026-11-04 01:30」は依頼文の記載として受領。
作業ブランチ: `claude/lucid-johnson-etmru0`。基点: `00e49b94060cc2671e9d098df91d653a4ed3ffe2`。

## 結果

**資格追加は未完了。3資格とも追加0問。** 本変更は取得状況の監査報告のみで、ステージング用問題データ・資格登録・ルートを追加していない。全問の原文・正答・図を照合できていないため、公開可能とは判定していない。

依頼順に調理師、製菓衛生師、ふぐ処理師の各2回について取得を試みた。6件とも、実行環境からの通常のHTTPS取得が `Tunnel connection failed: 403 Forbidden` となり、PDFファイルを保存できなかった。接続トンネルの拒否であり、山口県自身によるボット拒否と断定するものではない。ログイン・CAPTCHAへの遭遇はなく、アクセス経路・プロキシ設定の変更等による拒否の迂回は行っていない。

ブラウザツールでは各PDFの抽出テキストを参照できる。ただし調理師・製菓衛生師の正答表では設問番号と正答の配置順が崩れている。PDFのスクリーンショットも要求したが、このセッションのツール応答では画像本体を受け取れず、正答表の位置関係を確認できなかった。したがって「公式未公開」ではなく、**この環境で原本の保存・図表照合を完了できないことによる保留**である。ふぐの令和7年は抽出テキストで正答欄が比較的明瞭だが、全文・選択肢・図の照合まで完了したとは扱わない。

## 対象回の根拠

山口県 生活衛生課の[各試験過去問について](https://www.pref.yamaguchi.lg.jp/site/syoku-anshin/320296.html)（ページ更新日2026-09-11）では、各資格とも令和8年・令和7年・令和6年・令和5年・令和4年の順に問題及び正答を掲載している。直近2回は令和8年（2026年）と令和7年（2025年）。公式一覧とリンク先をブラウザで確認し、暦だけで対象を推測していない。依頼文の部名は「健康福祉部」だが、[現行の公式組織案内](https://www.pref.yamaguchi.lg.jp/soshiki/39/index.html)上は「環境生活部 生活衛生課」である。

| 資格 | 対象 | 問題・正答の公式PDF | 原本ファイルの取得 | 追加問数 |
| --- | --- | --- | --- | ---: |
| 調理師（山口県） | 令和8年度 | [247840.pdf](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/247840.pdf) | 接続トンネル403 | 0 |
| 調理師（山口県） | 令和7年度 | [221379.pdf](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/221379.pdf) | 接続トンネル403 | 0 |
| 製菓衛生師（山口県） | 令和8年度 | [247841.pdf](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/247841.pdf) | 接続トンネル403 | 0 |
| 製菓衛生師（山口県） | 令和7年度 | [221380.pdf](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/221380.pdf) | 接続トンネル403 | 0 |
| ふぐ処理師（山口県・学科） | 令和8年 | [245007.pdf](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/245007.pdf) | 接続トンネル403 | 0 |
| ふぐ処理師（山口県・学科） | 令和7年 | [213285.pdf](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/213285.pdf) | 接続トンネル403 | 0 |

## 既存成果・追加方式の確認

- 作業前の `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を検索。同資格の登録・年度データは見つからなかった。「調理師」の本文内言及は介護福祉士の別問題であり、対象資格の既存成果ではない。
- origin の `claude/*`・`qual/*`・`codex/*` をリモートから調査。375ブランチのうち同一dataツリーをまとめた249ツリーについて、`data/questions`・`data/exam-library`・`data/qualification-staging` のパスを確認。`yamaguchi`・`shoku`・`chori`・`seika`・`fugu` に該当するパスはなかった。このパス検索のみで、任意の別名で保存された全問題本文の不存在までは保証しない。
- 調査対象ブランチ名・dataツリーSHA・検索条件・取得失敗・検証概要を [cloud-yamaguchi-shoku-evidence.json](./cloud-yamaguchi-shoku-evidence.json) に保存した。再集計は `git for-each-ref`、各refの `git rev-parse <ref>:data`、各代表refの `git ls-tree -r --name-only <ref> data/questions data/exam-library data/qualification-staging` で行う。リモート全カタログの本文走査は未完了であり、完了主張に含めない。
- `data/questions/riyoshi/index.ts` は候補データと公開ゲートを分離し、`data/qualification-staging/sagyo-ryohoshi/ot13-recovered` は公開前の保存先として使われている。`data/questions/index.ts`、`lib/questions/get-questions.ts`、`lib/qualifications/catalog.ts` の `isExamPublished` で公開を制御する方式を確認した。
- 元ワークスペースの `.git` は読み取り専用。調査用のリモート複製と、コミット用のGitメタデータは書き込み可能な `/tmp` に準備した。mainへのpush・PR作成・デプロイ・buildは実行しない。

## 権利・転載条件の記録

依頼された資格の権利確認はオーナー確認済みとして扱った。[山口県「このサイトの利用について」](https://www.pref.yamaguchi.lg.jp/soshiki/21/26951.html)には、文章・写真等が著作権の対象であり、著作権法の範囲内で使用する旨が記載されている。この文言や過去のSTOP記録を保留理由にしていない。外部への連絡は行っていない。

## 検証

- `pnpm install`: 成功。Corepackとpnpmのキャッシュ先を `/tmp` に指定。
- `pnpm validate:questions`: 成功。既存26,444問、失敗0、警告16,808件。追加問題の正答照合を意味しない。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 成功。
- `pnpm exec vitest run __tests__/questions/get-questions.test.ts __tests__/lib/home-directory.test.ts __tests__/data/official-catalog-note-links.test.ts`: 3ファイル・107テスト成功。
- 参考: `pnpm test -- <テストパス>` は意図に反して全体テストを起動したため中断（終了コード130）。途中で `__tests__/dentist-latest-two.test.ts` の4件中1件の失敗を観測した。全体テスト成功とは扱わず、関連テストは上記の正しいコマンドで別途確認した。本変更に歯科医師のデータ・コード変更はない。
- 指定コマンドの `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` は、読み取り専用ファイルシステムによりapp-server初期化で失敗。`--ephemeral` と `/tmp` へのログ・SQLite保存先指定を追加した再試行も同じ結果。代替として、同じ指定モデル・推論強度（gpt-6-astra / medium）の別Codexエージェントが独立レビューした。初回の指摘は担当部名1件（環境生活部へ訂正済み）。同レビュアーが6PDFの接続トンネル403、抽出文の正答表配置崩れ、スクリーンショット画像未受領を独立に再現した。本報告の正確性をレビュー対象とし、資格の公開合格とは区別する。訂正と証跡追加後の最終再レビューは監査報告としてPASS（追加指摘なし）。資格データの追加・公開に対する合格ではない。

## 除外・再開時の残作業

調理師2回、製菓衛生師2回、ふぐ処理師学科2回を、原本ファイル取得・図表照合未完了として今回の収録対象から保留した。各資格の追加問数は0。問題数の全数照合、全問の公式正答照合、全選択肢の独自解説、法令を扱う問の出題時点注記、必要図と `hasImage` の設定、未公開資格としての登録・ルーティング・資格一覧への接続は未実施。

取得可能な環境で同じ公式URLの原本を保存し、既存成果の重複確認を再実施したうえで資格ごとに作業を再開する。製菓衛生師の問58〜60は和菓子・洋菓子・製パンで番号が重複するため選択科目を区別する。ふぐ学科は○×・語群選択・対応付け形式を保持し、令和8年の鑑別フロー図を確認する。公開データが存在しないと決めつけて古い回へ置き換えたり、問題・正答を生成して補充したりしない。
