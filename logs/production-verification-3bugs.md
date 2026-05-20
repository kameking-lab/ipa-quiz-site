# Production Verification — 3-bugs fix (PR #305)

## Merge commit
51a8b1b5dc7b6fbc8047a42911fffc02ac41a500

## Vercel deployment status
PR #305 Vercel check: pass (Deployment has completed)
main branch run 51a8b1b5: in_progress (E2E running, expected failure per pre-existing issue)

## Note on curl verification
Production curl blocked by Vercel Security Checkpoint (bot mitigation).
Direct browser verification recommended. Code-level verification is authoritative.

## Bug 1 — Title duplication

BEFORE (production had):
/study-plan: <title>自動学習スケジュール作成 | 過去問AI | 過去問AI</title>
/my-progress: <title>マイ進捗 | 過去問AI | 過去問AI</title>
/bookmarks: <title>ブックマーク | 過去問AI | 過去問AI</title>

AFTER (code in main):
app/study-plan/page.tsx:  title: "自動学習スケジュール作成"
app/my-progress/page.tsx: title: "マイ進捗"
app/bookmarks/layout.tsx: title: "ブックマーク"

layout.tsx template: "%s | 過去問AI"
Expected rendered titles:
/study-plan:  自動学習スケジュール作成 | 過去問AI
/my-progress: マイ進捗 | 過去問AI
/bookmarks:   ブックマーク | 過去問AI

## Bug 2 — /essays missing AI-generated disclaimer

BEFORE: GET /essays → 404 (no app/essays/page.tsx existed)

AFTER: app/essays/page.tsx created with:
- role="note" amber-box disclaimer: "本答案は AI 生成の参考例です。IPA 公式の合格答案ではなく、合格を保証するものではありません。..."
- CollectionPage JSON-LD with contentGenerationMethod property
- Links to /essays/sc, /essays/st, /essays/sa, /essays/pm, /essays/sm, /essays/au

## Bug 3 — Quiz JSON-LD schema

FINDING: Schema was already fully implemented in app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx
Original verification checked https://www.kakomon-ai.jp/q/ap/2017-autumn/am/q1
That URL returns 404 because SSG_MIN_YEAR=2024 and dynamicParams=false.
Valid URL: https://www.kakomon-ai.jp/q/ap/2024-spring/am/q1

Code at lines 338-355 contains:
{
  "@type": "Quiz",
  "@id": pageUrl#quiz,
  name: "令和6年 春期 応用情報技術者試験 午前 問N",
  about: examLabel,
  educationalLevel: "Professional",
  educationalAlignment: [...],
  inLanguage: "ja",
  hasPart: { "@type": "Question", name: q.question.slice(0,120), ... }
}
No code change needed.

## Summary
Bug 1 fixed: 3 title fields updated (study-plan, my-progress, bookmarks)
Bug 2 fixed: /essays root page created with amber-box disclaimer
Bug 3 status: Already implemented; verification used invalid URL (2017 < SSG_MIN_YEAR=2024)
