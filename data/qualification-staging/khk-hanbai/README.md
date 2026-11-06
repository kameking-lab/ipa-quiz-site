# KHK 販売主任者・設備士（学科）未公開データ

対象は令和7・6年度の国家試験。令和8年度は2026年11月8日の実施前につき対象外。

- 第一種販売80問、第二種販売80問、設備士法令30問、計190問・950肢解説を継承・再照合した。
- 設備士の配管理論等（LY）40問を2026-11-06に追加し、全230問・1150肢解説。公式PDFの正しいファイル名は両年度とも末尾「-W-W.pdf」（Wayback CDXの記録で特定し、公式サーバーから通常GETで取得）。`session` は `piping`。
- 全問 `publicAllowed=false`、`needsReview=true`。公開レジストリ、ExamCode、ルートには接続しない。
- `question` は原問本文、`choices` のア〜オは公式番号1〜5の順。本文内のイ・ロ・ハ・ニとは別。
- `sharedContext` は公式の共通条件。将来表示する際は本文と併せて提示すること。R7第一種保安は絶対圧力、R7第二種保安・設備士法令はゲージ圧力が原則。設備士法令の表紙⑺⑻の原則と本文冒頭の法令基準日・例外条件を両方保持する。
- `lawNote` は独自の法令基準日注記。公式本文とは区別し、原本の基準日も `sharedContext` に保持する。
- 公式問題10冊・正答2冊は `tmp/lk6/` にローカル保存。原本と抽出草稿はリポジトリの手順に従いコミットしない。URL、SHA256、取得記録は `official-sources.json`。
- 販売主任者・設備士法令の190問に図表は不要。配管理論等の問12（配管図・継手寸法表）と問20（配管図・別紙寸法早見表）は両年度とも `images/` のwebpを併用し（`imageSha256s` で改変検知）、本文末尾の【図】【表】【別紙抜粋】に数値を文章化した。文章化部分は原本の文章ではなく転記補助。
- 配管理論等40問の原本照合は、本文の各行（文章化部分を除く）と全5肢を該当ページの抽出テキストと正規化して照合（`source-audit.json` の `lyMethod`）。

引継ぎ元・検索範囲は `provenance.json`、欠落数・URLは `manifest.json`、公式ページ確認は `official-verification.json`。協会の転載禁止文言は報告に記録し、オーナー決定に従って未公開で収録した。`KHK-owner-approved-staging` は協会の許諾取得を示さない。

検証: `pnpm validate:questions --exam=khk-hanbai`、`pnpm typecheck`、`pnpm exec vitest run __tests__/questions/khk-hanbai-staging.test.ts`。
