# J検 情報活用 最新2回 収録監査

- TASK slug: `jken-katsuyo`。級別コードは `jken-katsuyo1` / `jken-katsuyo2` / `jken-katsuyo3`。
- 公式一覧: https://www.jken.sgec.or.jp/docs/past_test.html （2026-11-03 UTC取得）。掲載順と各冊子表紙により、令和8年度前期（2026-06-21）・令和7年度後期（2025-12-21）が直近2回と確認。
- 令和8年度前期1級は一覧の2026-07-14訂正案内に従い訂正版を使用。問題6(1)は公式正答注記によりイ・ウの両方を正解に設定。
- オーナー決定「2026-11-04 01:30 権利確認済み」に従い収録。公式ページの `Copyright © JKEN All Rights Reserved.` を記録。取得した一覧に転載・使用許諾申請についての追加文言はない。権利文言を理由とする除外なし。
- 元の `.git` は環境の読み取り専用制約があるため、複製した `/tmp/jken-writable.git` をコミット・push用に使用。作業ツリーは元のワークスペース。
- 作業前の data/questions、lib/qualifications/catalog.ts、data/exam-library、および fetch した origin の claude/*・qual/*・codex/* 計378ブランチの問題パスと資格台帳に同資格の成果なし。
- 公式問題・正答PDF計12本はすべて取得成功。ログイン・CAPTCHA・ボット拒否の回避なし。取得失敗PDFなし。

| 級 | 2026年前期 | 2025年後期 | 追加解答欄数 | 図表 | 状態 |
|---|---:|---:|---:|---:|---|
| 1級 | 43 | 42 | 85 | 15 | 未公開ステージング |

問題数は大問数とは区別し、公式正答表の解答欄を1レコードとして数える。大問・解答欄番号はsubjectとIDに保持し、ルーティング用qNumberは大問×100＋解答欄番号とする。共通問題文・全解答群はテキストとして保持し、図表部分だけ原PDFから切り出す。各問に問題・正答URL、独自の全肢解説を保持。

1級の出典:
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_mondaijk01.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_kaitojk01.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_mondaijk01.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_kaitojk01.pdf

原本PDFのSHA-256、正答欄の独立抽出結果、本文・正答表のテキストを `data/exam-library/source-packs/jken-katsuyo/grade1/` に保持。公式正答85欄との全件一致を確認。1級に除外なし。法令に基づく採点の設問は1級にはない。

公開管理は既存の資格台帳 `ready-to-ingest` と `isExamPublished` に従う。公開一覧・静的ルート・レジストリ・遅延ローダーからは未公開候補を返さない。将来の公開時にも生成問題を混ぜない過去問限定方針を登録。

検証: pnpm install 完了。1級の `pnpm validate:questions --exam=jken-katsuyo1` は85件成功・失敗0件（解説文字数の警告あり）。全体検証・型チェック・関連テスト・独立レビューの結果は最終追記する。
