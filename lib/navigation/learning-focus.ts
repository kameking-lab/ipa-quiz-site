/**
 * "Learning-focus" routes are the in-quiz flows that render their OWN fixed
 * bottom CTA bar at `bottom-0 z-30`:
 *   - QuizPlayer's 「次の問題へ」 bar — /quiz, /quiz/stream, /quiz/review
 *   - the /q/* question page's sticky prev/next bar
 *
 * The global MobileBottomNav is also `fixed bottom-0 z-30 md:hidden`, so on
 * mobile it sat on top of those bars and intercepted taps on the primary
 * forward action (致命傷⑨). The nav is hidden on these routes; users still
 * navigate out via the player's own back/breadcrumb chrome.
 *
 * NOTE: usePathname() returns the path without the query string, so /quiz and
 * /quiz?mode=… both arrive here as "/quiz".
 */
export function isLearningFocusRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  // QuizPlayer routes (exact /quiz and any /quiz/… variant). Guard with the
  // trailing slash so an unrelated "/quizzes" style path would not match.
  if (pathname === "/quiz" || pathname.startsWith("/quiz/")) return true;
  // /q/* question landing pages.
  if (pathname.startsWith("/q/")) return true;
  return false;
}
