# Internal-link network coverage (2026-05-23, phase 7 task ②)

## /q/* individual question pages (12,649 indexable)

Outbound internal links now emitted per page:

- Breadcrumb trail: 3-4 (home → exam → year-season → this question)
- Prev / next problem nav: up to 2 (top desktop + mobile sticky reuse the same targets)
- 関連する問題 (same exam + same category): up to 5
- 他試験の同テーマ問題 (cross-exam, shared topicTags): up to 5
- 他年度の「{category}」問題 (same exam + category, one per other year, newest first): up to 5 — **NEW this PR**
- {exam} の学習ガイド (related blog posts): up to 2
- exam hub + year-season hub links in the header: 2

Approximate outbound internal links per page: ~22 (was ~17 before the cross-year section).

Across 12,649 indexable question pages that is on the order of ~278,000 internal link edges, up from ~215,000 — a ~29% density increase concentrated on same-exam / same-category / cross-year relevance, which is exactly the signal that compounds page authority without external backlinks.

## /blog/* article pages (153 posts, 83 exam-tagged)

- この記事に関連する過去問 (NEW this PR): up to 3 direct /q/* links per exam-tagged post, ranked by category/topicTag overlap then newest-first → ~249 new blog→question edges (83 posts × 3)
- この試験を演習する CTA (existing): /quiz + /[exam] + /recommended-books/[exam]
- 関連記事 (existing): up to 4 blog→blog

## Bidirectional reinforcement

- /q/* → /blog/* via "学習ガイド" (existing, up to 2)
- /blog/* → /q/* via "この記事に関連する過去問" (NEW, up to 3)

The two directions now close the loop, so question pages and their topical blog guides reinforce each other's authority.

## Determinism note

All new selections are deterministic (sorted by score → year → qNumber, no `Math.random`) so the SSG / ISR output is stable across rebuilds — important for crawl consistency.

## Follow-up

See `logs/internal-link-quality-audit-2026-05-23.md` (task ⑨) for the orphan-page / broken-link / anchor-diversity audit run after this lands.
