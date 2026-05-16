# Bug Hunt — Naive User Perspective

Date: 2026-05-17  
Branch: fix/comprehensive-bug-hunt  
Method: Static code review simulating first-time user journey (home → mode → quiz → q/page → essay/page → 404)

## Findings

### 高 (High)

- **Dead link in 404 page**
  - File: app/not-found.tsx:75
  - Symptom: link `href="/exam/{code}"` but actual route is `/{code}` — user clicks exam link on 404 → another 404
  - Reproduction: Visit any 404 page, click exam link (e.g. "IP ITパスポート")

- **Empty quiz pool renders QuizPlayer with total=0**
  - File: app/quiz/QuizClient.tsx:147-165
  - Symptom: filter (`?mode=weakness` with no weak categories, etc.) → `sessionIds=[]` → `QuizPlayer total={0}` with no error UI
  - Reproduction: `/quiz?mode=weakness` when no weak categories exist

- **ContinueFromLast may link to non-existent question**
  - File: components/ContinueFromLast.tsx:46
  - Symptom: `nextQNumber = last.qNumber + 1` does not check session boundary → 404
  - Reproduction: answer last question in a session, refresh home → "続きから" link 404

### 中 (Medium)

- **QuizPlayer spinner loops indefinitely on fetch error**
  - File: components/quiz/QuizPlayer.tsx:75-130
  - Symptom: catch silently swallowed → user sees spinner forever
  - Reproduction: simulate /api/questions/next failure

- **Mobile bottom nav can obscure last content on short pages**
  - File: app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:878-911
  - Symptom: spacer h-20 sm:hidden may be insufficient depending on safe area / content

### 低 (Low)

- **/essays/{non-essay-exam} 404s without context**
  - File: app/essays/[exam]/page.tsx:53-56

- **ContinueFromLast truncates long exam names without ellipsis visible**
  - File: components/ContinueFromLast.tsx:65
