# A11y Baseline Audit — feat/a11y-screen-reader-hardening

Date: 2026-05-16
Branch: feat/a11y-screen-reader-hardening
Base commit: 37e85b7

## Already in Place (WCAG 2.1 AA achieved)

- Skip link "メインコンテンツへスキップ" → #main-content (layout.tsx)
- lang="ja" on <html> (layout.tsx)
- id="main-content" tabIndex={-1} as skip-link target (layout.tsx)
- Desktop nav aria-label="グローバルナビゲーション" (SiteHeader.tsx)
- Mobile nav aria-label="モバイルナビゲーション" (SiteHeader.tsx)
- Dropdown button: aria-haspopup, aria-expanded (SiteHeader.tsx)
- ChevronDown icon aria-hidden (SiteHeader.tsx)
- aria-current on active links (SiteHeader.tsx)
- Progress bar with role="progressbar", aria-valuenow/min/max/valuetext (QuizPlayer.tsx)
- Choices role="group" aria-label (QuizPlayer.tsx)
- role="status" aria-live="polite" aria-atomic for quiz feedback (QuizPlayer.tsx)
- ChoiceButton: aria-label, aria-pressed, aria-keyshortcuts (ChoiceButton.tsx)
- Check/X icons aria-hidden (ChoiceButton.tsx)
- ExplanationCard: role="region" aria-label (ExplanationCard.tsx)
- Copilot message area: aria-live="polite" aria-label (CopilotPanel.tsx)
- Copilot actions menu: aria-label, aria-haspopup="menu", aria-expanded (CopilotPanel.tsx)
- Mic/Send buttons: aria-label (CopilotPanel.tsx)
- Response length toggle: role="group" aria-label, aria-pressed (CopilotPanel.tsx)
- Share dialog: DialogTitle, DialogDescription (CopilotPanel.tsx)
- Tabs: role="tablist", role="tab", aria-selected, role="tabpanel" (ui/tabs.tsx)
- focus-visible:ring-2 ring-ring on all interactive elements (global pattern)
- Footer <footer> element (contentinfo role implicit) (layout.tsx)
- SiteHeader <header> element (banner role) (layout.tsx)
- Star button: aria-pressed, aria-label, aria-keyshortcuts (ExplanationCard.tsx)

## Issues Found (to fix in Phase 2)

### HIGH — Incorrect landmark / missing label

H1. QuizPlayer inner <header> (line 297 QuizPlayer.tsx) creates a second "banner" landmark on
    quiz pages alongside SiteHeader's <header>. Must change to <div>.

H2. QuizPlayer <aside> (line 437) has no aria-label — aside landmark is opaque to SR.
    Must add aria-label="AI コパイロット".

H3. CopilotPanel <textarea> (line 843) has no aria-label — form control without label
    is WCAG 2.1 SC 1.3.1 / SC 4.1.2 violation. Must add aria-label.

H4. CopilotPanel toast (line 955) appears/disappears visually with no live region —
    screen readers won't announce "コピーしました" etc. Must add role="status".

### MEDIUM — Landmark improvements / pattern correctness

M1. Footer nav groups are plain <div>s with <p> headings. Should wrap in <nav aria-label>
    and use <h3> for group headings (semantic outline).

M2. SiteHeader and CopilotPanel dropdown menus declare role="menu" / role="menuitem"
    but lack arrow-key navigation. ARIA menu pattern requires ArrowDown/Up/Home/End.
    Fix: remove role="menu" / role="menuitem" (use simpler disclosure list pattern).

M3. Tabs (ui/tabs.tsx): TabsTrigger and TabsContent missing aria-controls / aria-labelledby
    association. ARIA tab pattern requires explicit id linking.

M4. CopilotPanel error banner (line 800) is not announced by SR — should use role="alert"
    so errors are announced immediately.

### LOW — Polish / best practice

L1. QuizCompleteScreen emoji <div> (🎉/👍/💪) will be read as emoji name by SR.
    Should add aria-hidden="true" + visually-hidden text alternative.

L2. QuizCompleteScreen "X でシェア" and "LINE" links open target="_blank" with no
    indication for SR users. Add (新しいタブで開く) to aria-label.

L3. CopilotPanel Loader2 streaming indicator "生成中..." has no aria-live wrapper.
    The message area already has aria-live="polite" so this may be covered, but the
    streaming boolean state change isn't explicitly announced.

## Before count (estimated by category)
- Missing landmark labels: 3 (QuizPlayer header, aside, footer nav)
- Missing form labels: 1 (textarea)
- Missing live regions: 2 (toast, error banner)
- Broken ARIA patterns: 2 (menu without arrow keys, tabs without id linking)
- Polish: 3 (emoji, new-tab links, streaming indicator)
Total issues: ~11
