# エネルギー管理士・高圧ガス製造保安責任者 直近2回監査

確認日: 2026-11-03（UTC）。試験と研修修了試験・講習検定を区別する。

## 既存実装の確認

- `data/questions/denken3` は年度・科目別、`data/questions/gas/kou` は区分別の構成。集約は `data/questions/index.ts`。
- 資格登録・未公開管理は `lib/qualifications/catalog.ts`。既存の建築施工管理・行政書士と同じ `permission-required`、`examCode` なしの候補登録を利用する。
- `lib/exam-config.ts` の公開資格一覧、`app/[exam]` の動的ルーティング、`app/qualifications/page.tsx` の `live` フィルターを確認。本文収録を見送る候補は演習レジストリ・公開ルートへ登録しない。空の問題や生成問題で補わない。

## エネルギー管理士

対象は国家試験の第48回（令和8年度、2026-08-02実施）と第47回（令和7年度、2025-08-03実施）。過去問一覧だけで最新を判断せず、当年度の標準解答ページと照合した。

- 当年度公式: https://www.eccj.or.jp/mgr1/test/answer.html （2026-08-04更新、実施日と第48回を明記。熱・電気両分野の問題・解答リンクあり）
- 過去年度公式・利用条件: https://www.eccj.or.jp/mgr1/test_past/ （2026-08-04更新、先頭の実施回は令和7年8月3日）
- 第48回の回数確認用標準解答: https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_1.pdf
- 第47回の回数確認用標準解答: https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_1.pdf

除外理由: 過去問公式ページ冒頭に「これらの全部又は一部を無断で複製・転写することを固く禁じます。」と明記。個人利用を超える場合は試験部への連絡が必要とされている。ユーザー指定の除外条件に該当するため、熱・電気・共通基礎の全対象を本文収録から除外。許諾取得済みとは扱わない。

追加問数: **0問**。資格台帳に未公開の候補として登録。問題文・選択肢・図・正答データ・解説は追加していない。

## 高圧ガス製造保安責任者

対象は令和7年度（2025-11-09実施）・令和6年度（2024-11-10実施）の国家試験。甲種化学・甲種機械・乙種化学・乙種機械・丙種化学（液石／特別）・第一種／第二種／第三種冷凍機械の全区分を監査対象とする。販売主任者・設備士・講習検定は対象外。

- 令和8年度受験案内（冊子2頁、PDF4頁）: https://www.khk.or.jp/Portals/0/khk/exam/2026/R8FY_exam_seizouhanbai_%20rev.pdf 。試験日は2026-11-08と明記され、確認日には未実施のため直近2回へ含めない。
- 令和7年度受験案内: https://www.khk.or.jp/Portals/0/khk/exam/2025/R07fy_exam__seizouhanbai.pdf.pdf 。試験日2025-11-09を確認。
- 令和7年度の問題・正解答公表実績: https://www.khk.or.jp/information_list/?PageNo=3 の2025-11-10付「令和7年度国家試験問題及び正解答について」。年度・公開実績の根拠であり、現在も全PDFが取得可能という意味ではない。
- 令和6年度実施実績: https://www.khk.or.jp/Portals/0/khk/gp/2025/HP_R6_gyoumuhoukoku.pdf の5.5.3（冊子31頁）に2024-11-10実施を明記。
- 令和6年度公式正解答: https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf （表題に年度を明記）。令和7年度記述式の公式解答例も確認: https://www.khk.or.jp/Portals/0/khk/exam/2025/1219/R7fy_kaitourei_3.pdf 。これらは回の確認に使用し、問題データへ転記していない。
- 公表窓口: https://shiken.khk.or.jp/shiken.html 。問題は試験翌日から当年度1月下旬、択一式正解答は翌年度試験日の1週間前までの期間限定。確認時点では令和8年度の見出しへ切替済みで、HTML内に問題PDFへのリンクはなかった。見出しだけを根拠に令和8年度問題が公開済みとは判断しない。直近2回の全科目PDFを揃えたとは扱わない。
- 利用条件: https://www.khk.or.jp/condition.html 「1. 著作権について」。私的使用・引用の例外を除き、権利者の許諾のない使用・転載・複製等を禁止している。

除外理由: 公式サイトの明示的な転載・複製禁止がユーザー指定の除外条件に該当するため、全区分・全科目の本文収録を見送る。期間限定公開による全問入手・照合も未完了であり、不足分を推測・生成・非公式転載から補わない。

追加問数: **0問**。既存の `gas/kou` 等はガス主任技術者であり別資格。本資格は `koatsu-gas` として未公開台帳にのみ登録し、既存ガス資格へ混入しない。問題文・画像・正答データ・解説の追加はない。

## 検証

エネルギー管理士分:

- `pnpm install`: 成功（lockfile変更なし）。
- `pnpm validate:questions`: 成功、26,444問、失敗0、既存警告16,808。
- `pnpm typecheck`: 初回はNodeヒープ上限で終了。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で成功。
- `pnpm exec vitest run __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/lib/home-directory.test.ts`: 3ファイル、1,084件成功。
- `git diff --check`: 成功。

高圧ガス製造保安責任者分（最終状態）:

- `pnpm validate:questions`: 成功、26,444問、失敗0、既存警告16,808。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 成功。
- 同じ関連3ファイルの Vitest: 1,084件成功。
- `git diff --check`: 成功。

2資格とも `permission-required` の未公開候補で、公開一覧・演習ルート・問題レジストリへの追加は0。資格ごとにコミットし、それぞれpushする。

`pnpm build`・デプロイは実施していない。
