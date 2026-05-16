# Bundle Analysis — perf/bundle-analysis-and-cleanup

## Before

Static client chunks: 29MB total (77 files)
Largest chunk: 0vlg4_no6qvzr.js — 25MB
  - This chunk contained ALL_QUESTIONS (~40,000 questions across 13 exams)
  - Created because 3 client components imported @/data/questions directly

## Root Causes Found

1. components/quiz/stream/StreamQuizLoader.tsx ("use client")
   - Imported { ALL_QUESTIONS } directly
   - Used filterQuestions(ALL_QUESTIONS, ...) in useEffect

2. components/account/tabs/DashboardOverview.tsx ("use client")
   - Imported { ALL_QUESTIONS } directly
   - Used computeExamProbabilities(entries, ALL_QUESTIONS)

3. components/account/tabs/DashboardProgress.tsx ("use client")
   - Imported { ALL_QUESTIONS } directly
   - Used computeCategoryStats/computeExamProbabilities(entries, ALL_QUESTIONS)

4. app/review/ReviewClient.tsx ("use client")
   - Dynamically imported getAllQuestions from lib/questions/load
   - lib/questions/load statically imports ALL_QUESTIONS from @/data/questions
   - Even dynamic import caused Turbopack to create a 25MB lazy chunk

## Fixes Applied

Fix 1 — StreamQuizLoader
  - Moved filtering to server component (app/quiz/stream/page.tsx)
  - Uses getQuestionsForExam(exam) + filterQuestions server-side
  - Passes pre-filtered pool (60 questions) as prop to client component
  - Client just applies shuffleChoices on mount

Fix 2 — DashboardOverview + DashboardProgress
  - Removed ALL_QUESTIONS import
  - Analytics now fetch question metadata via existing /api/questions/meta API
  - Only fetches metadata for question IDs the user has actually answered
  - Updated lib/dashboard/analytics.ts to accept QuestionMeta[] instead of Question[]

Fix 3 — ReviewClient
  - Removed dynamic import of lib/questions/load (which statically imports ALL_QUESTIONS)
  - Created new API: /api/review/due (POST)
    - Client sends: historyIds, reviewStore, today
    - Server loads only the due questions using findQuestionById (lazy per-exam loader)
    - Returns: filtered Question[] + metadata (seenCount, scheduledCount, nextReviewDate)
  - Same UX and logic, question loading moved server-side

Fix 4 — Removed unused dependency
  - stripe 22.0.2 removed from package.json (confirmed unused by depcheck + manual grep)

## After

Static client chunks: 4MB total (74 files)
Largest chunk: 416KB x4 (utility/vendor chunks)
Reduction: -25MB (-86%) in static client JS

## Depcheck Notes

False positives (not removed):
  - @tailwindcss/postcss — used by Tailwind v4 PostCSS, depcheck cannot detect CSS usage
  - tailwindcss — same reason

Missing (not added — already resolvable via Next.js transitive):
  - server-only — imported in lib/questions/pool-server.ts but resolves fine at runtime
