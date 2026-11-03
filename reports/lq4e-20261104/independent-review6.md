FAIL — 受入証跡の結合と preflight にブロッキング問題があります。

対象は指定5ファイル（`render-figures.py` は `reports/lq4e-20261104/` 配下）。途中の外部更新後、依存先 `scripts/lq4e-numbering.mjs` も確認しました。未完成原稿の内容評価は行っていません。編集・コミット・ファイル書込み・ネットワークアクセスなしです。

1. **P1：既存 PASS レポートで別内容を受入可能**  
   `scripts/validate-lq4e-staging.mjs:52–63`  
   本文とスナップショットを変更し、receipt の関連ハッシュを再計算すると、レポートを変更せず検証が PASS。追加攻撃で再現しました。レポートが対象スナップショットの SHA256 を明示的に承認していることを検証し、その対応を受入後も必須にしてください。

2. **P1：raw review 実行証跡を検証していない**  
   `scripts/accept-lq4e-batch.mjs:14–15`  
   execution に `exitCode:0` と report ハッシュだけを用意し、prompt・raw log・モデル証跡なしで22問を受入できました。各証跡の存在・実バイトのハッシュ・モデル・対象レポートとの対応を必須検証してください。`run-review.py:10–11` も、実行後に再読込した prompt ではなく、実際に送信した同一バイト列をハッシュする必要があります。

3. **P1：preflight が重複・構造・対象範囲を保証しない**  
   `scripts/accept-lq4e-batch.mjs:17–38`  
   同一22問ファイルを二重指定すると、成功終了して「44問受入、累計74/160」と出力しました。資格・公式原問・選択肢・出典・既存原問との重複も書込み前に検証されません。入力パスの重複拒否と、全候補・既存receiptを含む共通検証を、最初の書込みより前に実施してください。

4. **P1：図版出力先が engineer-only に限定されない**  
   `reports/lq4e-20261104/render-figures.py:13–17`  
   原稿の `figure.path` をそのまま書込み先に使用します。公開側や LQ4D 側の既存画像も指定可能です。解決済みパスを LQ4E 専用図版ディレクトリ内に限定し、全対象を事前検証してください。受入済み原稿の再生成も拒否すべきです。

確認結果：更新後のⅠ番号は5群×6問、Ⅲは1–35。公式索引の **2024 III-28／2025 III-32 は null＋full-credit例外**。五択・各説明、出典SHA／ページ、重複、非公開状態の検証は存在します。`--sources` は PASS、baseline **30**／総数 **160**／新規受入 **0**／残 **130**。`--require-reviewed` は未レビュー70問を拒否しました。

指定テストは一時ファイルを書き込むため、**通常の `node --test` は未実行**です。書込み禁止を守り、ファイル操作と子プロセスをメモリ上へ置換して実行した結果は、LQ4E **18/18**、ベースライン **14/14** 成功。ただし上記追加攻撃は防げませんでした。

レビュー版 SHA256：

```text
scripts/validate-lq4e-staging.mjs
9B44BB96B19A70982F2E15060AB58055737416EF4D8C652EFFA9CB2E5DFE84FD
scripts/validate-lq4e-staging.test.mjs
B626E99AABD3FE2B421C5D85C3D9CDED23161D59D9C7160891647FAFB96FC3F8
scripts/accept-lq4e-batch.mjs
B135A99537C36F020C6A5515897593BC3E3FBC0172605A561B5A0291220942DC
reports/lq4e-20261104/run-review.py
D31B89CBDBF6F18FCDF9AD9F354B3495D6F560E7D9655009E38E681B95E8CD48
reports/lq4e-20261104/render-figures.py
25381B65E753F152051E9093EFAF4E216906DB1EA63660EEAD2B7C8A3915F50C
scripts/lq4e-numbering.mjs（追加依存）
AFAE9425825F9204B8048E948D1A2D28A11E3D717D12E88B0DDF243E6438E974
```