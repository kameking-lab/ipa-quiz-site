# Bookmark Tags Feature

## Overview

Question bookmark tags allow users to save any question with up to 5 custom tags,
providing a personal labeling system for targeted review sessions.

## New Files

- `lib/storage/bookmarks.ts` — LocalStorage CRUD for bookmark entries with tag support
- `components/BookmarkButton.tsx` — Bookmark toggle with inline tag editing
- `components/TagInput.tsx` — Reusable tag chip input (Enter/comma to confirm, Backspace to delete last)
- `app/bookmarks/page.tsx` — Bookmarks list with tag filter chips + JSON export/import

## Modified Files

- `lib/storage/keys.ts` — Added `bookmarks: "ipa-quiz:bookmarks:v1"`
- `components/quiz/ExplanationCard.tsx` — Added `BookmarkButton` next to the star (review) button

## LocalStorage Keys

| Key | Purpose |
|-----|---------|
| `ipa-quiz:bookmarks:v1` | Bookmark entries keyed by questionId |
| `ipa-quiz:history:v1` | Existing star/review system (unchanged) |

## Export Format

```json
{
  "entries": {
    "ap-2023s-am-q1": {
      "questionId": "ap-2023s-am-q1",
      "tags": ["苦手", "ネットワーク"],
      "bookmarkedAt": 1716000000000,
      "questionSnippet": "最初の80文字…",
      "exam": "ap",
      "year": 2023,
      "season": "spring",
      "qNumber": 1,
      "category": "テクノロジ"
    }
  }
}
```

## Design Decisions

- Bookmarks are stored separately from `ipa-quiz:history:v1` (star/review) to avoid coupling
- `questionSnippet` is denormalized so the bookmarks page renders without loading all questions
- Tags are limited to 5 per question to keep the UI focused
- The star button (復習) continues to work independently for the existing review quiz mode
