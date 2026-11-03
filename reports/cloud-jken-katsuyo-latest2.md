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
| 2級 | 50 | 51 | 101 | 18 | 未公開ステージング |
| 3級 | 46 | 47 | 93 | 8 | 未公開ステージング |

問題数は大問数とは区別し、公式正答表の解答欄を1レコードとして数える。大問・解答欄番号はsubject・officialQuestionLabel・IDに保持し、ルーティング用qNumberは大問×100＋解答欄番号とする。共通問題文・全解答群はテキストとして保持し、図表部分だけ原PDFから切り出す。各問に問題・正答URL、独自の全肢解説を保持。

1級の出典:
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_mondaijk01.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_kaitojk01.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_mondaijk01.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_kaitojk01.pdf

原本PDFのSHA-256、正答欄の独立抽出結果、本文・正答表のテキストを `data/exam-library/source-packs/jken-katsuyo/grade1/` に保持。公式正答85欄との全件一致を確認。1級に除外なし。法令に基づく採点の設問は1級にはない。

公開管理は既存の資格台帳 `ready-to-ingest` と `isExamPublished` に従う。公開一覧・静的ルート・レジストリ・遅延ローダーからは未公開候補を返さない。将来の公開時にも生成問題を混ぜない過去問限定方針を登録。

検証結果は末尾に記載。

2級の出典（4本とも取得・全欄照合済み）:
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_mondaijk02.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_kaitojk02.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_mondaijk02.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_kaitojk02.pdf

2級は全101欄を収録し除外なし。`grade2/manifest.json` に全公式正答・原本ハッシュを保持。二分木・ヒープの図選択肢は親子関係・幅優先順のテキストと原図を併用。全体の問題データ検証にも候補101件を含める。

3級の出典（4本とも取得・全欄照合済み）:
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_mondaijk03.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/260621_kaitojk03.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_mondaijk03.pdf
- https://www.jken.sgec.or.jp/common/pdf/past_test/251221_kaitojk03.pdf

3級は全93欄を収録し除外なし。`grade3/manifest.json` に全公式正答・原本ハッシュを保持。2025年後期問題7の二択（適切ア・不適切イ）も公式指示どおり収録。権利に関わる情報モラル説明には出題時点の日付を明記。3級の作成を終え、総計279解答欄（大問40題）、図表41点。公開はせず台帳のステージング状態を保持する。


## 最終検証・レビュー

- `pnpm install --store-dir /tmp/jken-pnpm-store` 完了（Prisma生成を含む）。環境の書込制限に合わせCorepack・pnpmのホームを `/tmp` に指定。
- `pnpm validate:questions`: 26,723件成功、失敗0、警告16,942。J検候補279件も検証対象。J検の警告134件（1級58・2級40・3級36）は解説本文の文字数基準で、全問の全選択肢に別途解説あり。短い本文・全肢解説は公式正答との整合を確認した。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 成功。
- 関連テスト: `jken-katsuyo.test.ts`、`ExamBrowseTabs.mock-support.test.tsx`、`questions-filter.test.ts` の3ファイル206件成功。公式正答279欄、出典、図ファイル、全肢解説、原問題番号、年度表示、出典著作者、未公開レジストリ・ローダーを検証。
- 出典表示・構造化データ・ホームの既存関連テスト4ファイル42件も成功（`home-directory.test.ts`、`question-source-label.test.ts`、`exam-source-label.test.ts`、`question-jsonld.test.ts`）。その後、検索API・検索UI・年度別一覧の関連テストも追加し、最終実行は計10ファイル270件成功。
- 作成途中に全テストを実行した際の失敗4件は、対象ファイルを完成後に再実行して解消を確認。最終結果として上記の関連テストを採用。
- 指定どおり `pnpm build`、PR作成、mainへのpush、Vercel・その他デプロイは未実施。

初回の独立レビューで正答279欄は全件一致。解説の4点（WEEKDAYの不等号、累積金額の列参照、ファンクションキー、再配達18時ちょうどの扱い）と計算問題属性の不足を指摘されたため修正。二分木選択肢画像は左端の選択肢記号を含め再切出し。公式正答表の分野で分類し、表示用の原問題番号・正確な年度、SGECの著作者情報も整備した。2回目に指摘された2級2026年前期問題7(4)の文字列結合式の誤答解説も、参照セルは正しく加算演算子が誤りだと修正。公開切替後のITホームカード表示経路も補い、現状は台帳の非公開判定で除外される。3回目の独立レビューでPASSとなり、補足された公開時の表示も修正した。検索・分野別・年度別・オフライン一覧へ原問題番号を伝え、資格トップの説明をSGECの検定に設定して「国家試験」への誤った補完を防ぐ。4回目の追加確認で見つかった2級2025年後期問題7(6)の70％・90％の境界表現も，式の比較演算子に従い「超・以下・未満・以上」で明示した。

独立レビューは指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` で実行。環境内の入れ子sandboxでレビュー側のshell起動が失敗するため、全279候補・全公式本文/正答・図表41点・実装差分・公開判定コード・検証ログをCLI入力と画像添付として直接渡して実施し、sandbox制約の回避は行っていない。画像は既存方式と同じ `public/images/questions/` に保存し、資格の一覧・問題配信・SEO登録を未公開に保つ。

級別の初回commit/push:
- 1級: `3ce93742`（参照表修正 `3f26f9a3`）。
- 2級: `822a06c2`。
- 3級: `0b7e57cb`。

全3級・両回とも除外問題なし、取得不能PDFなし。生成問題・類題なし。


最終独立レビュー（5回目）: **PASS**。全279欄・全肢解説・41図表・未公開制御・公開時の表示修正を確認し、修正必須事項なし。最終回答の全文は [jken-katsuyo-independent-review.md](jken-katsuyo-independent-review.md) に保存。レビューは入力資料と添付画像による確認であり、実行・実画面・未提示のサイトマップ内部と採点処理の独立実行確認は対象外。実行検証は本作業側の270関連テスト・型チェック・全問題データ検証で実施した。最後の境界値修正後も全問題データ検証とJ検10テストを再実行し成功。

級別のレビュー修正commit/push:
- 1級: `3d0fea16`。
- 2級: `c3023e32`。
- 3級: `ab770cb2`。

push先は一貫して `origin/claude/gracious-bell-qghkii`。公開切替は行っていない。
