# 2級建築施工管理技術検定（第一次検定）直近2回の監査

確認日：2026-11-03（UTC）。資格コード：`sekou-kenchiku2`。前回のWIPコミット `b21175f6` から継続。

## 結果

**直近2回・100問を未公開ステージングに収録。正答100問を公式正答表と照合し，全410選択肢に独自解説，必要図5点，出典URLを付与した。除外0問，保留0問，公開0問。** 本文収録は `1e5e75b2` にコミット済み。監督役による独立レビュー（`/tmp/review.md`，対象HEAD `1e5e75b2`）は法令基準日の誤設定によりFAIL。今回その指摘を修正し，再レビューへ引き継ぐ。PASSとは扱わない。

既存台帳を維持し，`status: "ready-to-ingest"` の公開ゲートを閉じている。修正後の独立再レビューと公開判定が残る。権利理由による100問除外（`81f12b99`）の撤回は継続し，権利の再確認を残作業にはしていない。

## 対象回と公式根拠

一般財団法人建設業振興基金の[過去の受検状況・検定問題・合格基準](https://www.fcip-shiken.jp/about/index.html)の保存済み一覧 `data/raw_pdfs/sekou-2kenchiku/LISTINGS.json` と `COVERAGE.json` を確認。建築施工管理技術検定→2級→第一次検定の前期リンクが令和8年度，後期リンクが令和7年度を指す。保存済み `COVERAGE.json` には令和8年度後期は2026-11-08予定で未実施との記録もある（保存済み日程ページ本文は日程PDFへのリンクのみのため，日付の原資料再照合済みとは扱わない）。対象回はこの2回に固定し，追加取得・ネットワークアクセスは行っていない。

| 対象回 | 実施日（PDF表紙） | 公式問題・正答PDF | 出題数 | 収録数 | 選択肢解説数 | 図 |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| 令和8年度前期 第一次検定 | 2026-06-14 | [r08_2kgz_mondai.pdf](https://www.fcip-shiken.jp/pdf/r08_2kgz_mondai.pdf) | 50 | 50 | 205 | 3 |
| 令和7年度後期 第一次検定 | 2025-11-09 | [r07_2kg_mondai.pdf](https://www.fcip-shiken.jp/pdf/r07_2kg_mondai.pdf) | 50 | 50 | 205 | 2 |
| 合計 | | | 100 | 100 | 410 | 5 |

両回とも50問出題，40問を解答する試験。No.38～42は五肢択一，その他は四肢択一。必須問題と選択問題の両方をすべて収録しており，50問の全問必答試験としては扱わない。原問の数字1～5をサイトのア～オへ対応付け，`officialAnswerNumber` に原番号を保持した。

## 原資料とハッシュ

取得済み公式PDFを使用した。前回記録にあったHTTP 403による取得不能は今回の制約ではない。原本は `data/raw_pdfs/sekou-2kenchiku/` にあり，今回SHA256を再計算して `MANIFEST.json` と一致した。

| ファイル | ページ数 | 正答ページ（PDF通算） | SHA256 |
| --- | ---: | ---: | --- |
| r08_2kgz_mondai.pdf | 26 | 26 | `521dd178370ff0bc0111b2d95bad6af1b54cc2380da9fdbfd9f1cbd0acbaf286` |
| r07_2kg_mondai.pdf | 25 | 25 | `91c4902e5987ce5e56d793e69a933aca5835c469bfa9087db36254ce87a95aff` |

原本PDF・MANIFEST・保存済み一覧はgitignore対象のままコミットしない。コミット対象の `data/questions/sekou-kenchiku2/source-audit.json` にURL・ハッシュ・正答ページ・確認方法を記録する。

## 全問照合と加工内容

- 全100問の問題文・全410選択肢をPDF抽出テキストと突き合わせ，本文ページをレンダリングして確認。原問の内容を保持し，ルビ，改行，レイアウト上の空白を整理した。ページヘッダー，解答指示，ページ番号は問題本文へ混入させていない。
- 抽出で落ちた字形は原図で確認して復元した。令和8年度はNo.3のP₁・P₂，No.8の「隙間」，No.12の10⁵・mm²・cm³，No.24の「1人」「m²」，No.26の「1/4」「防錆」，No.32の「進捗」。令和7年度はNo.3のw，No.4のmm²，No.19の「揃」，No.25・38の「錆」，No.31の「進捗」，No.41の「隙間」，No.45のm²を復元。令和8年度No.26に抽出時に付いた分子「1」は問題文から除去し，選択肢1の分数に戻した。
- 令和7年度No.16・29の対になる用語を「／」で区切り，No.32の組合せ表を「イ：…／ロ：…」として全文テキスト化。四角枠は［空欄］・［イ］・［ロ］で表現した。
- 文字抽出が困難な公式正答ページをレンダリングして目視確認し，両回ともNo.1～50の登録正答と一致。令和7年度の現ローカル原本末尾は「正答肢」であり，旧レポートの「正答肢（案）」という表記を訂正した。テストには目視転記した公式正答100個を別配列として保持している。
- 全選択肢に個別解説を付け，正答肢だけでなく誤答肢の判断理由も記載。令和8年度No.23は公式正答3に合わせ，シリコーン系の付着汚れは硬化前の拭取りで広がりやすいこと，コンクリート打継ぎ目地の最小充填深さは10mmであることを説明している。総合解説も正答と一致する。
- 法令問題（両回No.36・37，No.43～50，令和8年度No.10）には「出題時点の法令に基づく」旨を表示し，`lawReferenceDate` を付与。独立レビューの指摘に基づき，試験日ではなく公式手引の基準日（令和8年度前期 `2026-01-01`，令和7年度後期 `2025-01-01`）に修正した。令和8年度No.46では専任基準4,500万円／建築一式9,000万円，No.47では解雇制限の「その後30日間」を説明している。
- 各問に問題PDF・正答PDFのURL（合冊のため同一），出典団体，年度・回，問題番号，本文・正答のPDFページ，加工表示を付与。解説は本サイト作成で，公式解説としては表示しない。

図は本文全体の画像化ではなく，必要な箇所だけ原本からWebPに切り出した。すべて `hasImage`・画像URL・代替テキストを付与し，図中の荷重・寸法が欠けていないことを確認した。図選択肢にはサイト作成の形状説明も添えた。

| 回・問題 | PDFページ | 収録図 |
| --- | ---: | --- |
| 令和8年度前期 No.3 | 4 | 単純梁，荷重8kN・4kN，区間4m・2m・2m |
| 令和8年度前期 No.11 | 8 | 集中モーメントを受ける梁と4つの曲げモーメント図 |
| 令和8年度前期 No.16 | 10 | 4つの電気設備名と配線用図記号 |
| 令和7年度後期 No.3 | 3 | 等分布荷重3kN/m，区間2m・4m |
| 令和7年度後期 No.11 | 8 | 2集中荷重を受ける梁と4つの曲げモーメント図 |

## 登録方式・重複確認

`data/questions/sekou-kenchiku2/{2026-early,2025-late}.json` と変換用 `index.ts` に収録し，`data/qualification-staging/sekou-kenchiku2/index.ts` から取り出せる。既存の施工管理資格と同様に，型，試験設定，表示名，SEO，質問ローダー，質問検証に登録した。

`data/questions/index.ts` と遅延ローダーは台帳の `isExamPublished` を適用。未公開状態では公開問題一覧・資格一覧・演習API用ローダーには出ず，`getQuestionsForExam` は空配列となる。公開ルートは既存の汎用資格ルーティングを利用する方式で，今回公開ゲートは開けていない。`data/exam-library` に本資格の別データを追加していない。

作業前の `data/questions`・台帳・`data/exam-library` を確認し，対象資格は既存台帳と今回のWIPだけだった。保存されているoriginのclaude/*・qual/*・codex/* 360参照，異なる本文blob 3,511個の検索では対象slug・両PDF名の一致0件（`/tmp/ken-duplicates.json`）。今回の指示に従ってfetchは行っておらず，最新リモート全体の監査済みとは主張しない。依頼で明示されたWIPを再作成せず継続した。

## 権利・除外

オーナーが権利確認済み。公式一覧フッターの「本サイトに掲載されている記事・写真・図表などの転載を禁じます。」という文言は記録するが，収録除外・再承認要求の根拠にはしない。`license: "FCIP-owner-authorized"` はプロジェクト内の管理区分である。

**除外0問・保留0問。** 非公開問題・生成した類題は追加していない。両回の全50問と末尾の公式正答がローカル原本で確認できる。

## 独立レビュー指摘への対応

監督役が別プロセスで実施した `/tmp/review.md` のレビュー結果はFAIL。問題文100問・選択肢410肢・公式正答100件・図5点・出典・未公開ゲートは一致／問題なしと報告され，次の3点を今回修正した。

- 法令基準日21問（令和8年度11問，令和7年度10問）を試験日から公式手引の基準日に変更。根拠はレビューで示された[令和8年度前期手引PDF 5ページ](https://www.fcip-shiken.jp/pdf/r08_2KGz_tebiki.pdf#page=5)と[令和7年度後期手引PDF 5ページ](https://www.fcip-shiken.jp/pdf/r07_2K_1jik_tebiki.pdf#page=5)。今回，手引の追加取得は行っていない。テストは令和8年度No.10を含む全対象問の具体的な基準日と，非対象問では未設定であることを確認する。
- 末尾のコミット状態を，本文収録済みコミット `1e5e75b2` と今回の修正の状態に分けて更新。
- `lib/seo/exam-meta.ts` をCRLFからLFへ統一し，追加行で報告された末尾空白を解消。改行以外の内容変更はない。

独立再レビューは作者から起動せず，監督役へ引き継ぐ。

## 検証

以下は本文収録時の実行結果。ログは `/tmp/ken-final-*.log`。レビュー修正後の再検証結果は下記に記載。

- `pnpm install --offline --frozen-lockfile`：exit 0。ネットワーク取得なし。postinstallのPrisma生成も成功。pnpmが一部依存パッケージのbuild scriptを無効化している旨の既存警告あり。
- `pnpm validate:questions`：exit 0。26,544問，ok=26,544，fail=0，warn=16,808。今回の100問に警告なし（既存警告数と同じ）。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：exit 0。
- `pnpm exec vitest run __tests__/questions/sekou-kenchiku2.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/seo/qualification-coverage-copy.test.tsx __tests__/exam-library-coverage.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/lib/exam-config-pdf-url.test.ts __tests__/lib/questions-filter.test.ts __tests__/exam-qualification-hubs.test.ts`：exit 0，9ファイル・1,235テスト成功（今回専用104テストを含む）。
- `git diff --check`：成功。

今回専用テストは各回の連続50問，重複なし，全410肢，公式正答，4肢／5肢，図5点の存在，出典，法令注記，未公開ゲート，5番目の選択肢と解説のシャッフル対応を確認する。

レビュー修正後の再検証（ログ `/tmp/ken-review-fix-*.log`）：

- `pnpm install --offline --frozen-lockfile`：exit 0。Prisma生成成功，既存の依存build script無効化の警告あり。
- `pnpm validate:questions`：exit 0。26,544問，ok=26,544，fail=0，warn=16,808。今回の資格の警告なし。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：exit 0。
- 前掲9ファイルに `__tests__/seo/exam-meta-description.test.ts` と `__tests__/seo/exam-meta-grouping.test.ts` を追加したVitest：exit 0。11ファイル・1,255テスト成功（専用104テストを含む）。
- `git diff --check` と `git diff --check origin/main -- lib/seo/exam-meta.ts`：exit 0。レビューで報告されたCRLF由来の末尾空白も解消。


独立レビュー・公開判定は監督役へ引き継ぐ。今回から独立レビューやCodexの再起動は行っていない。`pnpm build`・push・PR作成・デプロイ・Vercelは実行していない。

## コミット状態・引継ぎ

本文100問の収録は `1e5e75b2`（`feat: 2-kyu building construction level 1 exam, 100 questions staged (unpublished)`）にコミット済み。作業開始時の `claude/blissful-rubin-pks6ce` はクリーンであり，旧記録の「最終変更は未コミット・作業ツリーに残存」はこの本文収録コミットには該当しない。WIP `b21175f6` も履歴に保持されている。

今回のレビュー修正4ファイルは検証完了後に `git add`・`git commit` を試みたが，`fatal: Unable to create '/home/user/ipa-quiz-site/.git/index.lock': Read-only file system` により `git add` の時点で停止した。したがって今回の修正のみ未ステージ・未コミットで作業ツリーに残っている。本文収録済みの `1e5e75b2` は変更していない。サンドボックスの迂回やGitディレクトリの移設・権限変更は行っていない。監督役は書込み可能な権限でこの4ファイルをコミットし，独立再レビューとpush・公開判定を行う必要がある。
