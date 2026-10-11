# 令和8年度 1級電気通信工事施工管理技術検定・第一次検定

全国建設研修センターの[試験問題／正答肢一覧](https://www.jctc.jp/mondai/)から、次の原本を取得した。

| 原本 | 公式URL | SHA-256 |
| --- | --- | --- |
| 問題A | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_mondaia.pdf | `92367d48419e62b7bcf9d0f52c5f94c36dc98739c950d890f81ec64ead1c36cf` |
| 問題B | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_mondaib.pdf | `413a26b3b67141778d625cb027a1ff25cab8c343efb9570c13bdd1e7e19a51aa` |
| 正答肢 | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_seitou.pdf | `ec90c11593965c413028313988dca1bc1a67f29e4cd606d4c3f68064976a404d` |

原本の表紙によると、問題Aは55問から33問を選択（No.1〜19から14問、No.20〜47から14問、No.48〜55から5問）、問題Bは35問から27問を解答（No.1〜2とNo.31〜35は必須、No.3〜16から8問、No.17〜30から12問）する。合計90問のうち実試験の解答数は60問。

2026-10-11の追加では、初回12問をそのまま保持し、未収録78問の問題・公式正答・4肢すべての解説を追加した。A55問・B35問、合計90原問を収録する。実試験で選択解答する60問と原問の母数90問を区別する。

`complete/OFFICIAL-ANSWERS.json` は公式正答表を再抽出した全90問の解答番号である。`TRANSCRIPTION-OVERRIDES.json` は原本画像と照合して復元した添字・指数・否定記号・分数・表の列区切りを記録する。機械抽出だけでは失われる図表は原本PDFの設問範囲をPNGで添付し、範囲・ページ・原本および画像のSHA-256を `CROP-RECEIPTS.json` に保存する。選択解答の案内は問題文・選択肢に含めない。図中情報の文字化は原本画像と区別して併記する。`BASELINE-HASHES.json` で初回12問の問題データを保持したことを検証する。学習用解説は本サイト作成で、公式正答表そのものの解説ではない。

検証は `python scripts/audit_tsushin1_pilot.py` と `pnpm exec vitest run __tests__/questions/tsushin1-pilot.test.ts` を使う。原本・全問番号・問題文・4肢・正答・全肢解説・図表ファイルの整合を検査する。

最新2年度として2025年度第一次も対象だが、現行の公式一覧から問題A・B・正答を取得できていない。母数を2026年度から推定せず、未収録として `complete/2025-SOURCE-STATUS.json` に分離した。2026年度90問の完備を、最新2回分の完成や本番公開の証明としては扱わない。

既存スキーマの `JCTC-authorized-reuse` 識別子を引き継ぐ。この識別子や公式URLの存在から新たな許諾を認定していない。掲載可否は所有者が扱うもので、本作業は新たな権利・許諾の証拠を作成しない。

難問13問だけ独立局所査読を行い、原本画像と解説の対応を確認した。`complete/TARGETED-INDEPENDENT-REVIEW.json` に範囲と結果を記録する。A49は電気設備の技術基準の解釈149条・各表、B31は公共建築改修工事標準仕様書（電気設備工事編）令和4年版2.11.2(イ)を取得済み公式PDFと照合した。参照PDFは `complete/reference/` に保存し、SHA-256と確認ページを査読記録に残す。全90問の独立二重査読や公開承認を意味しない。

過去の12問用 `build_tsushin1_pilot.py` は、完成データを上書きしないガードを設けた。今回の検査結果は `complete/MECHANICAL-AUDIT.json`、公開前の12問観測は `complete/PUBLIC-BASELINE.json` を参照する。
