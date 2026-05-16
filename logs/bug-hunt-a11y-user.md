# Bug Hunt — Accessibility Perspective

Date: 2026-05-17  
Branch: fix/comprehensive-bug-hunt  
Method: Static code review (keyboard / SR semantics / contrast / focus)

## Findings

### 高 (High)

- **SheetContent missing explicit aria-modal** — components/ui/sheet.tsx:57
  - Radix Dialog primitive defaults usually OK; verify and add `aria-modal="true"` if missing.

- **Copilot mobile sheet — focus return path unclear** — components/copilot/CopilotPanel.tsx:1012-1027
  - Escape closes sheet; need to ensure focus returns to FAB trigger button.

### 中 (Medium)

- **ExplanationLayers `text-muted-foreground/70` borderline contrast** — components/quiz/ExplanationLayers.tsx:111-112
  - 70% opacity on muted may drop below WCAG AA 4.5:1 in light mode.

- **QuizPlayer sticky-nav timer / stats not in aria-live** — components/quiz/QuizPlayer.tsx:327-343
  - Timer updates silently for SR users; wrap in `aria-live="polite"`.

- **CopilotPanel message list missing role="log"** — components/copilot/CopilotPanel.tsx:763
  - Streaming assistant messages should be announced.

### 低 (Low)

- ExplanationCard emphasis text → consider `<strong>` for semantic emphasis
- CopilotPanel toast — add `aria-label` for clarity

## Already-fixed (per logs/a11y-baseline.md)

Skip findings already covered in baseline doc.
