# 1級電気工事施工管理技術検定（第一次検定）直近2回の監査

確認日: 2026-11-03 UTC

結論: **転載禁止の明示により収録対象外。追加0問。ステージング問題データの作成も行わない。**

依頼の「公式サイト・PDFに転載や複製の禁止が明記されている資格は、問題本文を収録せず理由を報告」に従う。公開可能な状態に完成した資格としては扱わない。

## 対象回と公式根拠

| 対象 | 実施日 | 公式問題・正答PDF | 公表原問数 | 追加 | 除外 |
| --- | --- | --- | ---: | ---: | ---: |
| 令和8年度 第一次検定 | 2026-07-12 | [令和8年度 問題・正答肢](https://www.fcip-shiken.jp/pdf/r08_1dg_mondai.pdf) | 89 | 0 | 89 |
| 令和7年度 第一次検定 | 2025-07-13 | [令和7年度 問題・正答肢](https://www.fcip-shiken.jp/pdf/r07_1dg_mondai.pdf) | 89 | 0 | 89 |
| 合計 | | | 178 | 0 | 178 |

- [公式の過去の受検状況・検定問題・合格基準](https://www.fcip-shiken.jp/about/)の「電気工事施工管理技術検定／1級／第一次検定」欄から、最新の令和8年度PDFを確認した。同表の令和7年度リンクは**第二次検定**であり、第一次検定の2回目として数えていない。
- 令和7年度は上記の公式ドメイン上の第一次検定PDFを直接開き、表題と末尾の正答肢にある年度・実施日を確認した。年度だけを推測して対象回を確定していない。
- 令和8年度PDFは全44ページ、正答肢はPDFの44ページ目。令和7年度PDFは全43ページ、正答肢は43ページ目。両正答ページとも「89問出題」「60問解答」を明示している。89は原問数、60は受検者の解答数であり、収録対象の数を60問としていない。
- 実施日は[令和8年度の公式案内](https://www.fcip-shiken.jp/den1/)、[令和8年度第一次検定実施結果](https://www.fcip-shiken.jp/pdf/r08_1d_1_goukaku.pdf)、[令和7年度公式結果表](https://www.fcip-shiken.jp/pdf/kekka_r07_1d.pdf)とも照合した。
- 今回確認した公式一次資料の範囲で、これらの間に別の第一次検定実施回は確認されなかった。第二次検定と、建築施工管理の臨時試験は対象外。

## 除外理由

[問題公開ページ](https://www.fcip-shiken.jp/about/)の末尾に、次の表示がある。

> 本サイトに掲載されている記事・写真・図表などの転載を禁じます。

[公式トップページ](https://www.fcip-shiken.jp/)にも同じ表示がある。問題・正答が閲覧できることと、当サイトへの転載が許されることを同一視せず、依頼の除外条件を適用した。別資料のマニュアルの禁止表示を、問題の禁止表示の代わりに根拠としていない。

全178問を同じ理由で除外。問題本文、選択肢、原図、問題PDFおよびその画像・全文抽出物はリポジトリに追加していない。類題や生成問題による代替もしていない。追加問題が0問のため、全問の正答対応表・各選択肢の独自解説・hasImage・問別出典の作成と照合は対象外であり、実施済みとは扱わない。

## 作業前の重複確認

- 開始コミット: `00e49b94060cc2671e9d098df91d653a4ed3ffe2`
- 作業ブランチ: `claude/epic-volta-l9vm4r`
- 現在の `data/questions`、`data/exam-library` に、この資格の問題データはない。第一種電気工事士の `denko1` は別資格として区別した。
- `lib/qualifications/catalog.ts` に `slug: "sekou-denki1"` の既存メタデータがあり、`status: "permission-required"`、`examCode` 未設定。これは今回対象2回の収録成果ではなく、転載許諾待ちの判断台帳である。重複登録は行わない。
- `git fetch origin` と `git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` を実施。リモートで取得できた対象headは359本（claude 96本、codex 263本、qual 0本）で、取得漏れ0件。ローカルに元からあった現在の作業ブランチの追跡ref `origin/claude/epic-volta-l9vm4r` も加え、走査した追跡refは `origin/claude/*` 97本、`origin/codex/*` 263本、`origin/qual/*` 0本、計360本。確認時点で現在の作業ブランチのheadは `ls-remote` に含まれていなかった。
- 全360ブランチの `data/questions`、`data/exam-library`、`lib/qualifications/catalog.ts` を `git grep` で内容照合した。資格名・識別子・対象PDF名を検索し、問題データと公表問題ライブラリの一致は0件。カタログのみ299ブランチに一致し、いずれも上記と同じ許諾待ちメタデータだった。対象回の既存問題データは見つからなかった。`reports` のファイル名についても `1denki` / `denki1` / `denki-1` を確認し、一致0件。
- 補助確認として、同じ360ブランチの対象パスの一意な4,032個のGit blob（264,511,925バイト）も走査し、カタログ以外の一致0件を再確認した。

## 既存の追加・公開方式の確認と今回の変更範囲

- 類似資格の `data/questions/civil1/index.ts` は公式PDF由来のJSONから問題を構成し、公式正答、全肢解説、必要図、出典を保持する。
- `data/questions/index.ts` の資格別登録は `isExamPublished()` で公開可否を判定する。判断元は `lib/qualifications/catalog.ts` の資格状態。
- 資格一覧 `app/qualifications/page.tsx` は公開資格を表示する。公表問題ライブラリは `lib/exam-library-catalog.ts` と `data/exam-library/official-catalog.json` を参照する。
- 今回は転載禁止のため、この資格の未公開問題データ、登録、ルーティング、公開資格一覧、公表問題ライブラリへの追加は行わない。既存の許諾待ち状態を維持し、変更は本監査報告のみとする。空の資格データや公開用ルートを作って収録完了と見せない。

## 検証

- `pnpm install`: 成功。
- `pnpm validate:questions`: 成功。26,444問、エラー0件、既存警告16,808件。問題データの変更は0件。
- `pnpm typecheck`: 標準ヒープ上限（約2GB）でメモリ不足により終了した後、`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行して成功（終了コード0）。設定ファイルや依存関係は変更していない。
- 関連テスト: `pnpm test __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/exam-qualification-hubs.test.ts __tests__/exam-library-model.test.ts` — 4ファイル、1,089テスト成功。
- `pnpm build`、デプロイ、Vercel操作、PR作成、mainへのpushは実行しない。

## 独立レビュー

指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium` を読み取り専用で使用。

- 初回: **PASS**（除外判断・変更内容に修正必須の問題なし）。公式の転載禁止表示、両年度PDF、全360追跡ref・4,032個のGit blob、カタログ一致299ブランチを独立照合した。
- 初回の留保: install成功とtypecheckの終了コード0は、標準出力ログだけから独立確認できないため、完了証跡の補足を求められた。
- 対応: installとtypecheckを再実行し、コマンド、開始・終了UTC、終了コードを記録した。検証内容を変更せず証跡を補足した。
- 再レビュー: **PASS**。終了コード記録と実ログを照合し、install・typecheckとも終了コード0、報告書の時刻・コマンドとの一致、報告書だけの追加、問題データと公開設定の未変更を独立確認。初回の留保は解消し、修正必須の残課題なし。

再実行の完了証跡（プロセスの終了コードを呼出元で取得）:

| コマンド | 開始UTC | 終了UTC | 終了コード |
| --- | --- | --- | ---: |
| `pnpm install` | 2026-11-03 15:54:59 | 2026-11-03 15:55:12 | 0 |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` | 2026-11-03 15:55:12 | 2026-11-03 15:55:24 | 0 |

再実行の標準出力・標準エラーログと終了コード記録をレビュー担当に提示し、再照合を完了した。ログ・一時的な照合ファイルは作業環境の `/tmp/sekou-1denki-*` に保持し、本コミットには問題原本や全文抽出物を含めない。
