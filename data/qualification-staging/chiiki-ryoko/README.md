# 地域限定旅行業務取扱管理者（CQ5・未公開）

観光庁の2025年度（2025-09-28）・2026年度（2026-09-27）の全科目版を各59問、計118問保存する。候補根拠はCOV1報告Bの8位。2026-11-04に公式一覧の直近2回を確認した。免除1・免除2は全科目版の重複のため追加しない。

`publicAllowed=false`、`publicationStatus=staging`。公開Question/ExamCode、問題ローダー、試験ライブラリ、publicディレクトリには接続しない。`needsReview=true`は公開前の編集確認を残すフラグであり、独立レビューの実施結果はレビュー記録に別途保存する。

- 法令基準日は両年度とも当年6月1日。試験日、公開確認日、法令基準日はmanifestで区別する。公式一覧の最終更新日は2026-10-02。各PDFの公開年月日は個別に明記されていないため`publishedAt=null`とし、取得日を公開日と扱わない。
- 内訳は各回、法令25問・約款24問・実務10問。実務の小問①②はそれぞれ公式の配点4点がある解答単位であり、共通設例を持つ原問を水増ししたものではない。公式番号は`officialQuestionLabel`に保存する。
- 「すべて選びなさい」は公式正答を配列で保存し、`requiredSelections`と`all-selected-exactly`で全肢一致を表す。別解許容のOR採点と混同しない。
- 原文はPDF文字層から抽出し、ページ柱・空行・末尾の「以上」を除き、行末空白を整形する。図表・経路図・表のセル配置は`sourcePageImages`にある原本ページ画像を正本とする。画像は144dpi・グレースケールで、問題本文全49ページと正答2ページを欠けなく保持する。文字層に含まれる行程資料も省略しない。
- 出典：観光庁「地域限定旅行業務取扱管理者試験」公式問題・正解及び配点。観光庁の[利用規約](https://www.mlit.go.jp/kankocho/site-policy.html)は特記なき情報に公共データ利用規約1.0を適用する。原本ページの画像化・文章整形・独自解説の追加は過去問AIによる加工であり、観光庁の解説ではない。
- 問題・正答PDFは通常GETで200/application/pdfを確認。ログイン・CAPTCHA・アクセス制限の迂回なし。PDFファイル・抽出草稿はコミットしない。取得不能URLはない。

## 再現・照合

manifestの4本を通常GETで任意の一時フォルダへ`2025-questions.pdf`、`2025-answers.pdf`、`2026-questions.pdf`、`2026-answers.pdf`として保存する。PyMuPDF 1.28.0を使い、次で全118本文・472肢・118正答・51画像を原本から再生成して比較する（`--write`は初回生成用）。

```powershell
python scripts/ingest-chiiki-ryoko.py --source-dir <一時フォルダ>
pnpm validate:questions --exam=chiiki-ryoko
pnpm test __tests__/questions/chiiki-ryoko-staging.test.ts
pnpm typecheck
```

JSON構造検証と原本照合は別の検証である。source-auditは後者の再現記録。再描画のバイナリ一致には同じPyMuPDF版が必要。

独立レビューの記録は`reports/cq5-20261104/`。初回・2回目のFAIL指摘（責任期間、訪日団体割引、解除時点、通知期限、宿泊問題の抽出終端・超過室料）を修正し、3回目にPASS。公式正答は変更していない。検証の実行結果は同ディレクトリの記録を参照する。独立レビューのread-only sandboxではVitest起動が`spawn EPERM`となったため、親プロセスで成功したテスト・typecheckの記録と区別する。
