# Phase 0 Findings — Essays Full Expansion (2026-05-16)

Branch: `feat/essays-full-expansion-batch`
Worktree: `kind-bouman-fc286a`
Investigator: Claude Opus 4.7

## TL;DR

The task as specified (8 exams × 3 years × 5 industries = 120 new 2,200+ char essays) is NOT executable as planned in a single autonomous session. The actual state diverges from the task assumptions in three important ways:

1. **5 of the 8 target exams already have industry-variant data** (ST/SA/PM/SM/AU). They are NOT yet exposed via `/essays/` — only SC is. So most of the "expansion work" is actually a routing/wiring task, not content generation.
2. **3 of the 8 target exams (NW/DB/ES) have no PM2 essay-format questions** at all. NW/DB/ES午後II are technical descriptive problems, not 800-1600字論述. There is no source material to expand from in these exams.
3. **No `GEMINI_API_KEY` is available locally** in this environment (verified `.env*` and `env`). The provider falls back to mock. Batch-generating any new essay content requires an API key the prompt assumes is present.

A separate caveat: the existing industry data is ~1,800 chars per essay — **below the 2,200 char standard** PR #192 established for SC. So "wire up existing data" still falls short of the prompt's quality bar.

## Detailed findings

### Existing essays infrastructure

- Route: `app/essays/[exam]/page.tsx` and `app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx`
- Route guard: both files check `SC_ESSAY_EXAM_CODES.includes(params.exam as "sc")` and `notFound()` otherwise.
- Type: `lib/essays/types.ts` — uses `EssayIndustryId = "it" | "finance" | "construction" | "healthcare" | "public"` (SC-specific industries).
- Loader: `lib/essays/load.ts` exports `getSCpm2Questions()` returning 3 SC questions (2023/2024/2025 spring).
- Data: `data/essays/sc/{year}-spring/pm2/q1/{industry}.ts` — each industry has its own file with `intro / body / conclusion`.

### Existing industry-variant data in afternoon questions

| Exam | File | Question | Industries | Lines | Avg chars/essay |
|------|------|----------|------------|-------|-----------------|
| AU   | `data/questions/afternoon/au/2024-autumn-industries.ts` | 2024秋 q1「クラウドサービスの利用に関する監査」 | 6 (manufacturing/construction/finance/retail/telecom/public) | 179 | ~1,860 |
| PM   | `data/questions/afternoon/pm/2024-spring-industries.ts` | 2024春 q1「不確実性の高い要求への対応」 | 6 | 183 | ~1,875 |
| SA   | `data/questions/afternoon/sa/2024-spring-industries.ts` | 2024春 q1 (SA午後II q1) | 6 | 215 | ~1,855 |
| SM   | `data/questions/afternoon/sm/2024-autumn-industries.ts` | 2024秋 q1 | 6 | 191 | ~1,860 |
| ST   | `data/questions/afternoon/st/2024-spring-industries.ts` | 2024春 q1「事業環境の変化を捉えたIT戦略」 | 6 | 168 | ~1,820 |

- Schema: `lib/afternoon/types.ts::IndustryVariant` with `essayA / essayI / essayU` (= 設問ア/イ/ウ).
- These map directly to the essays UI's `intro / body / conclusion`.
- Industries differ from SC's set: includes `manufacturing/retail/telecom` instead of `it/healthcare`.

### Exams without PM2 essay data

- NW: only `2024-spring.ts` with descriptive technical problems. No `*-industries.ts`. NW午後II is not essay-format.
- DB: same — descriptive technical problems only.
- ES: same — embedded systems descriptive problems only.

These three exams require generation of:
- Question metadata (theme, context, ~800字 background) per year
- 5-6 industry-variant essay answers per question
- Without an API key + without source PDFs locally parsed, this is fully manual writing of expert-level Japanese exam content.

### Quality gap vs. prompt's 2,200+ char standard

Per-essay totals from the existing data (excluding whitespace):

```
au manufacturing  2034   construction 1872   finance 1871   retail 1796   telecom 1771   public 1816
pm manufacturing  1980   construction 1921   finance 1872   retail 1791   telecom 1843   public 1840
sa manufacturing  1939   construction 1922   finance 1852   retail 1806   telecom 1842   public 1754
sm manufacturing  1937   construction 1867   finance 1847   retail 1747   telecom 1801   public 1956
st manufacturing  1801   construction 1809   finance 1845   retail 1779   telecom 1872   public 1811
```

Only 1 of 30 existing essays (au-manufacturing at 2,034) is even close to the 2,200 bar. None meets it. The SC essays were lifted from ~1,800 to 2,200+ chars by PR #192 (regen via API). No script remains in the repo — that was a one-off automation.

## Realistic options

### Option A — Wire existing data through (no new content)
- Generalize `lib/essays/types.ts` to support all exams and the wider industry set (`manufacturing/construction/finance/retail/telecom/public/it/healthcare`).
- Generalize the route guard in `app/essays/[exam]/...` to accept ST/SA/PM/SM/AU.
- Build a loader that adapts `IndustryVariant` from `lib/afternoon/types.ts` into `SCEssayAnswer`-shaped objects.
- Result: 5 new exam categories × 1 year × 6 industries = **30 new live essay pages**, each ~1,800 chars. No new content generated.
- Risk: essays are below the 2,200 char standard the prompt set. May be seen as quality regression vs. SC pages.
- Time: ~1-2 hours work, ships immediately, zero API cost.

### Option B — Option A + regenerate to 2,200+ chars
- Same as A, plus: write a `scripts/generate-essays.ts` that uses `lib/ai/provider.ts` to regenerate the 30 essays at 2,200+ chars.
- Needs `GEMINI_API_KEY` (or equivalent) configured locally to run. User would invoke the script themselves.
- I can write the script + prompts, but cannot run it from this environment.
- Time: ~2-3 hours my work + user runs script.

### Option C — Full task as specified (NOT recommended)
- NW/DB/ES require both question metadata AND industry essays generated from scratch.
- ST/SA/PM/SM/AU at 3 years × 5+ industries = 75-90 more essays beyond what exists.
- Needs LLM API access AND careful prompt engineering AND multi-hour generation runtime.
- Not achievable in this session.

## Recommended next step

**Option A first**, then queue Option B as a follow-up with API key configured. This ships measurable SEO value (30 new indexable pages, all essay-format searches: "AU 業種別 答案", "ST 製造業 論述", etc.) in one PR, then regen quality lift in a separate PR when the user can supply the API key.

NW/DB/ES essay expansion should be deferred until source-of-truth question data is created (perhaps via `scripts/parse-pdf-to-json.ts` against IPA PDFs — but those exams' PM2 isn't论述, so this may be a永久 non-starter).

## Stopping here for user direction

Per the task instruction "②Phase 0完了(対象範囲確定) で段階報告", I am stopping at Phase 0 and requesting direction.
