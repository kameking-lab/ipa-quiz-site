# ブログ「2,398問」残存問題の解消 — 原因特定と修正 (2026-05-28)

対象: フェーズ14 第3致命傷。/blog/ip-nani-kara-benkyou に「2,398問」が表示され、SSOT実値 2,381 と17問乖離していた件。
ブランチ: `fix/blog-ip-question-count-stale` / 基点 main HEAD: `465048b`

## 結論（ケース判定: C = ビルドロジックのバグ）
ハードコード（ケースA）でもCDN stale（ケースB）でもなかった。**ブログ記事ページが SSOT ではなく「生のデータ件数」を読んでいた**。再デプロイしても直らない真のコードバグ。

- 本番 /blog/ip-nani-kara-benkyou は「2,398問」を表示（curl 実測, X-Vercel-Cache: HIT）。SSOT 値「2,381」は0回。
- ソース全文に "2,398"/"2,381" の**リテラルは存在しない**（grep 0件）→ 動的計算。
- 現行 main が計算する値: IP indexable（SSOT `EXAM_QUESTION_COUNTS.ip`）= **2,381**、IP raw（`QUESTIONS_BY_EXAM.ip.length`）= **2,398**。差 **17** = IP の placeholder解説＋needsReview（noindex/404、出題不可）件数。
- `app/blog/[slug]/page.tsx:291,294` が `(QUESTIONS_BY_EXAM[post.exam] ?? []).length`（raw）を表示していた。→ **再ビルドしても 2,398 のまま**だった（=stale CDN ではない）。

## 既存テストがすり抜けた理由
`__tests__/seo/no-hardcoded-counts.test.ts`（PR #454）は**リテラル文字列**（"2,398" 等）をスキャンする。本件はリテラルではなく**誤ったデータソース参照**のため、ソースに "2,398" の文字列が無く、テストは緑のままだった。

## 全文ビルドスキャンで判明した同根の残存（重要）
`.next` 成果物を全走査したところ、同じ「raw を表示」バグがブログ以外にも残存していた。
- **`app/sitemap/page.tsx:38`**: 人間向けサイトマップが `QUESTIONS_BY_EXAM[code]?.length`（raw）で IP=「2,398問」表示。**ブログと同一バグ・同一の 2,398**。→ 本PRで修正。
- `app/blog/[slug]/page.tsx:319`（else分岐）: `ALL_QUESTIONS.length`（raw 総数 **14,402**）を「13区分・N問」として表示。SSOT 総数 12,653 と乖離。→ 本PRで修正。
- /topics の "2398" は誤検知（URLエンコード "システム。398" の部分一致。コンマ付き 2,398 ではない）。

## 本PRの修正範囲（「2,398/raw総数の残存」を完全解消）
1. `app/blog/[slug]/page.tsx`
   - 291/294行: per-exam を `getExamQuestionCount(post.exam)`（SSOT indexable）へ。IP: 2,398→**2,381**。
   - 319行: 総数を `TOTAL_QUESTIONS_PUBLISHED`（SSOT）へ。14,402→**12,653**。
   - 不要になった `QUESTIONS_BY_EXAM, ALL_QUESTIONS` import を SSOT import に置換。
2. `app/sitemap/page.tsx`
   - 38行: per-exam を `getExamQuestionCount(code)` へ。IP: 2,398→**2,381**。import も SSOT へ置換。

ビルド成果物検証: `.next` 全体でコンマ付き **`2,398` = 0件**（修正前は5件）。/blog・/sitemap とも 2,381 を出力。

## あえて本PRで触れない範囲（別サイクル提案・申し送り）
`app/stats`・`app/transparency` が `lib/stats/content-count.ts::getContentCounts()` 経由で「**総収録問題 = 午前+午後+論文**」を表示し、その午前成分が raw（`ALL_QUESTIONS.length`=14,402）。`.next` のコンマ付き `14,402` はこの2ページのみ。
- これは blog/sitemap の「practiceable件数」とは**別ラベル・別粒度の指標**（午後記述・論文を含む“収録総数”）。`question-counts.ts` の doctrine は raw 非表示を求めるが、/transparency は“収録した素データ規模”の開示として raw が妥当な可能性もある。
- getContentCounts は /stats・/transparency・content-count API・/admin/stats を同時に変えるため、「総収録の午前成分を indexable に切替えるか」は**プロダクト判断を要する別致命傷候補**。本サイクル（=「2,398 残存解消」）の範囲外として申し送る。

## 退行防止テスト（リテラルでは防げない“raw参照”を捕捉）
- `__tests__/seo/no-hardcoded-counts.test.ts` 強化（+5件）:
  - count表示ページ（/blog/[slug]、/sitemap）が `QUESTIONS_BY_EXAM`/`ALL_QUESTIONS` を**参照しない**こと、SSOT helper を使うことをファイル単位で固定（app/admin/stats 等の正当な raw 利用は対象外）。
  - データ不変条件: `getExamQuestionCount('ip') < QUESTIONS_BY_EXAM.ip.length`（indexable<raw、=バグが可視である前提を固定）。
- `tests/e2e/blog-question-count.spec.ts`（新規）: レンダリング後の **/blog の IP件数 == ホーム ItemList JSON-LD の IP件数** を実HTTPで照合。ハードコード値なし＝SSOT追従。修正前なら 2,398≠2,381 で失敗する真のガード。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 27ファイル**166全緑** / build 成功
- ビルド成果物: コンマ付き 2,398 = **0**、/blog・/sitemap = 2,381、blog総数 = 12,653
- e2e: blog-question-count 6/6相当（3回確認・フレーキー無し）、回帰subset（blog-question-count・user-journey-blog・smoke-routes・admin-auth・home-cta-click）26全緑

## 次のステップ
本番反映後、curl 簡易確認を推奨: `curl -s https://www.kakomon-ai.jp/blog/ip-nani-kara-benkyou | grep -o '2,3[0-9][0-9]'` が **2,381**（2,398 が消えていること）。/sitemap も同様。あわせて /stats・/transparency の「総収録問題 14,402」を別サイクルで扱うか判断を仰ぐ。
