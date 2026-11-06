# 保育士試験 令和8年後期（地域限定を含む）筆記9科目・未公開ステージング

2026-11-06 時点。**公式正答は未公表**（全国保育士養成協議会「令和８年筆記試験（後期・地域限定）問題」ページに
「正答は11月30日（月）午前10時より掲載予定」と記載）。そのため公開ローダー（data/questions/hoikushi/index.ts）には接続していない。

- 出典: https://www.hoyokyo.or.jp/exam/pasttest/08-2.html（問題PDF 08AP1-2.pdf〜08AP9-2.pdf）
- 試験日: 2026-10-24・25（公式試験案内ページ）
- `questions.json`: 9科目160問の原文（PDFテキスト層から転記し、表・下線・組合せ表・楽譜・図のページは画像で確認）。各科目に PDF の SHA-256。
  - 科目別問数: 保育原理20・教育原理10・社会的養護10・子ども家庭福祉20・社会福祉20・保育の心理学20・子どもの保健20・子どもの食と栄養20・保育実習理論20
  - `hold: true`（5問・保育実習理論 問1・3・4・5・12）: 楽譜が「著作権の関係により公表できません。」に差し替え、または図・五線譜でしか示されずテキストに忠実に起こせないもの。前期と同じ扱いで出題プールに入れない。
  - `underlinedSegments`（任意）: 下線部の範囲を画像で確認した記録。前期ファイルにはないキーなので、公開データ化の際は問題文表記へ反映するか削除する。
  - 保育原理 問20・子どもの食と栄養 問6 の表は markdown 表で転記（後者のセル内改行は `<br>`、見出し行「グループ／主な食品」は転記者の補い）。公開時は前期ファイルの表の書き方に合わせて整える。
- `official-answers.json`: 正答の空テンプレート。**推測で埋めないこと。**

## 11/30 以降の仕上げ手順

1. 08-2.html の公式正答（前期はPDFでなくHTML表）を取得し、URL・取得日時・SHA-256 を記録して `official-answers.json` を埋める。各問の `requiredSelections` と正答数の一致を確認する。
2. 全問・全肢の独自解説を作成する（前期 `data/questions/hoikushi/2026-early.json` と同じ形式: `officialAnswer`, `choiceExplanations`, `topicTags`, `lawSensitive`, `reviewStatus`, `evidenceUrls`）。`lawReferenceDate` は `2026-10-24`。
3. 別エージェントで公式PDF・公式正答と照合する独立レビューを行い、PASS するまで直す。結果を `reports/hoikushi-review.md` に保存する。
4. `data/questions/hoikushi/2026-late.json` を書き出し（`season: "late"`, `examLabel: "令和8年度後期・地域限定保育士試験"`, 各科目の `sourceAnswerUrl` は 08-2.html）、`data/questions/hoikushi/index.ts` に
   `HOIKUSHI_2026_LATE_QUESTIONS = buildRound(source2026late as HoikushiSource)` を追加して `HOIKUSHI_QUESTIONS` に連結する。
   `lib/exam-config.ts` の hoikushi は既に `seasons: ["early", "late"]`・`yearRange 2025–2026` なので変更不要。
   SEO 文言（`lib/seo/exam-meta.ts` の「令和8年度前期の1回分154問」「令和7年度後期は未公開」）と `lib/qualifications/catalog.ts` の件数は親が直す（`reports/hoikushi-registry.md`）。
5. `pnpm validate:questions`・`pnpm typecheck`・`__tests__/questions/hoikushi-round1.test.ts` を通す。
