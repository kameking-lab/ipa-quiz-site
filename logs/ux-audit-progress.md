# UX Harsh Audit — Progress Log
Started: 2026-05-15

## Phase 1 — Findings so far

### Critical (likely fix)
1. **iOS zoom-on-focus on inputs**: ContactForm inputs use `text-sm` (14px). iOS zooms in when user taps fields below 16px. Fix: use `text-base` on mobile or set `font-size: 16px` for inputs.
2. **Small tap targets on essay list CTA**: `app/essays/[exam]/page.tsx` "業種別答案を見る" button uses `px-3 py-1.5 text-xs` — height ~28px, far below 44px WCAG 2.5.5 / Apple HIG 44pt.
3. **HomeExamGrid nested interactive elements**: Shuffle button (40×40) below 44px, sits ON TOP of card Link → ambiguous tap zones and accidental triggers.
4. **Sub-44px header back button**: QuizPlayer back button uses `size="icon"` → h-10 w-10 (40px). Below recommended.
5. **Button size="sm" too small**: 32px height — used in many places. Below tap target.

### High (recommend fix)
6. Quiz header stats text-xs (12px). Combo/timer/correct hard to read on mobile.
7. Footer link tap target: `py-2` only — could be padded more.

### A11y to verify
- Skip link present (good)
- Focus ring fallback present (good)
- Reduced motion respected (good)
- aria-live regions in QuizPlayer (good)
- ChoiceButton uses Check/X icons not just color (good)

### Pending
- Stats page graceful fallback
- ServiceWorker / PWA UX
- Forms a11y deeper
