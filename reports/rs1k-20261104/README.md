# RS1K ローカル再照合（2026-11-04）

起点は `origin/claude/magical-newton-a0t56z` の `da6c2311f85bad071fd8dca3a7422af816986bfe`。
指定worktree `C:/Users/kanet/20260522/wt-sekou-1kenchiku`、ブランチ `qual/sekou-1kenchiku-20261104`。

## 引継ぎ記録と修正

初回FAILの3件は `7cbc75b5b` で既に修正され、`da6c2311f` には再レビューPASSも記録されていた。
一方、`cloud-sekou-1kenchiku-latest2.md` は再レビュー待ちの記述が残っていた。
今回、既存の判定をそのまま採用せず、原本を取り直して再照合し、新たに指定コマンドの独立レビューを実施する。

- R8 No.12：PDF9頁と画像を目視照合。CA・AB・BD各2 mの寸法線と数値を確認。
- R8 No.37肢4：石膏ボード工業会の施工マニュアルPDF23頁・図3.8を取得・描画し、中塗り400～500 mm、上塗り500～600 mmを確認。肢別・総合解説とも修正済み。
- R7 No.5肢1：PDF5頁を描画し、荷重点より上の左柱はせん断力が零で曲げモーメント一定となることと、図1の直線変化との不整合を確認。修正済みの説明と整合。
- 追加修正：R8 No.51の「なお，図中の〔斜線記号〕が…」という注記は、記号を「斜線部分」と言い換える代わりに、公式PDF27頁から注記全体を既存図版に含めた。テキスト本文はその直前まで、以後の原文注記と全5図は画像で保持。切出し上端を255から200 ptへ拡大し、台帳SHA256を更新。出題条件・選択肢・正答は不変。

## 公式資料と全問照合

公式サイトから再取得したPDF（HTTP 200、PDFヘッダー確認）：

- [R7公式問題・正答](https://www.fcip-shiken.jp/pdf/r07_1kg_mondai.pdf)：39頁、2,228,209 bytes、SHA256 `ee93b4002a986217958bd4b396bacaf581a929e1b4747949e44bebefe7918ab6`。
- [R8公式問題・正答](https://www.fcip-shiken.jp/pdf/r08_1kg_mondai.pdf)：38頁、2,056,715 bytes、SHA256 `a34ae1cd5145e08882932e552e596a8e6f94bb31bbb6777081587c7637c03eac`。
- [石膏ボード施工マニュアル](https://www.gypsumboard-a.or.jp/pdf/Construct_Manual.pdf)：PDF23頁・図3.8。

原本のローカル保存先は `C:/Users/kanet/AppData/Local/Temp/codex-work/rs1k-pdfs/2025.pdf`、`2026.pdf`。
原本PDFはGitに追加しない。

両PDFの正答頁を新規に描画し、全72問ずつ目視で再転記した値を `verify_official.py` の `ANSWER_ROWS` に保持した。
その値を問題JSONと既存の公式正答転記表の双方に照合し、144/144一致。R7 No.57は訂正「3または4」を確認した。
採点では1肢選択の3・4をそれぞれ正解とし、2肢同時選択を不正解とする既存テストも成功。

本文144件、文字選択肢579件を各問の公式PDF文字層と比較。図選択肢17件は公式画像を併用する表示ラベルで、全11画像を指定座標・倍率2.5で原本から再描画し、保存画像との画素列およびSHA256一致を確認した。
文字比較はルビ・傍点・空白を除去し、Unicode表記を正規化する。分数線の文字抽出欠落、空欄の矩形を示す `［　　］` は別途以下の原本頁を描画して目視確認した。

- R7：No.2（PDF3頁、空欄2箇所）、No.10（8頁、1/3・1/250）、No.20（13頁、1/2）、No.23（14頁、1/100・1/4）、No.52（29頁、1/3）。
- R8：No.10（8頁、1/2・1/3）、No.18（11頁、1/100・1/50）、No.21（13頁、1/5）、No.25（14頁、1/4）、No.32・33（16頁、1/2）、No.36（17頁、1/3）、No.40（19頁、空欄2箇所）。
- 上下付きの数値も5.46 pt以上の文字層から取得。図記号を含むNo.51はPDF27頁と修正画像を目視確認した。

この比較は本文の完全な版面比較ではない。ルビ・傍点・空白・分数・選択肢番号の表示上の整形を許容し、文言・数値・出題条件の置換はしない。必要な図記号は原図で保持する。
問別照合台帳は `official-recheck.json`。各年72原問・298肢、計144問・596肢、図9問・11画像、追加0問・除外0問。

再現コマンド：

```powershell
python reports/rs1k-20261104/verify_official.py --pdf-dir C:/Users/kanet/AppData/Local/Temp/codex-work/rs1k-pdfs --output reports/rs1k-20261104/official-recheck.json
```

## 検証

依存関係はリポジトリ指定の `corepack pnpm`（10.33.0）で `install --offline --ignore-scripts --frozen-lockfile`。ロック変更なし。
グローバルのpnpm 9.15.9による導入は設定不一致で停止したため使っていない。
型検査の初回はPrismaクライアント未生成で失敗し、DB接続を伴わない `prisma generate` 後の再実行は終了コード0で成功した。

- `corepack pnpm validate:questions --exam=sekou-1kenchiku`：144問、ok=144、fail=0、warn=0。
- 関連Vitest：既存7ファイル・1,190テスト成功。公式正答、No.57の訂正採点、図SHA256、未公開ゲート、ローダー、ルート情報を含む。
- 原本再照合スクリプト：144正答・144本文・596肢・11画像の検証に成功。
- No.51修正後の対象Vitest再実行：6テスト成功。`git diff --check`：成功。

未公開台帳の `ready-to-ingest` を維持し、公開一覧・同期集合・遅延ローダーから除外されたまま。
push・PR作成・mainマージ・デプロイ・本番設定変更・本番DB接続を行わず、秘密値の出力も行わない。
`C:/Users/kanet/secrets-local` は参照しない。

独立レビュー結果は別ファイルに保存する。完了状況は指定の外部報告 `rs1k-report.md` にも記録する。
