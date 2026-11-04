**FAIL：必須修正1件（Q21）。** 全22ページ・35問・175理由を照合しました。正答番号は35問とも公式正答と一致していますが、Q21の解説に誤りがあります。

- **Q21：AとDの重合分類が逆。** 原本の選択肢②は「重付加＝B・C／付加縮合＝D／縮合重合＝A・E」です。現行解説は「付加縮合＝A／縮合重合＝D・E」と記載しています。さらに①の理由は、原本にない「縮合重合の欄にC」を挙げています。正答②は維持し、要約と各肢理由を原本の表に合わせて修正してください。[原稿の該当箇所](C:/Users/kanet/20260522/wt-LQ3/reports/LQ3B-20261104/manuscripts/pe-first-chemical-2024.json:274)、[採用データの該当箇所](C:/Users/kanet/20260522/wt-LQ3/data/exam-library/pe-first/pe-first-chemical-2024.json:1891)。

そのほかの確認結果：

| 対象 | 判定 |
|---|---|
| 35問の番号・ページ対応、175理由の原稿／採用データ一致 | PASS |
| 原本22ページと採用画像 | 全ページで画素一致 |
| 原稿・問題PDF・正答PDF・採用JSON・画像22枚のmanifestハッシュ | 全一致 |
| 本文・5肢のテキスト化 | Q2・Q23・Q35の3問を確認 |
| Q6・Q19・Q25 | 必須修正なし。Q25はEガラスの例外を明記済み |
| Q31 | 1時間当たり20 kWhとの解釈を明記。再計算24.599℃→③ |
| Q32 | 分配比1/3、再計算4.64346 mol→④ |

既存ログの関連30テスト成功・typecheck `exitCode=0` を確認しました。`validate-questions.log` の `fail=0` はnative問題側の結果として区別しています。今回の読み取り専用検証でも構造・正答・ハッシュは通りましたが、Q21の内容誤りは検出対象外です。

原本の根拠は問題PDF16ページと正答PDF7ページです。
:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3/reports/LQ3B-20261104/sources/2024-05.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3/reports/LQ3B-20261104/sources/answers-2024.pdf" purpose="source"}

変更・push・PR作成はしていません。この判定は化学2024のみで、全8件の完了判定ではありません。