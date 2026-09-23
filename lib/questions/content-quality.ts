import type { Question } from "./types";

/** Shared by server/client pools and direct question pages. A metadata flag
 * alone is not a rendered figure. Transcribed Markdown tables remain usable. */
export function hasUnrenderableContent(q: Question): boolean {
  const hasFigures = (q.imageUrls ?? []).some((url) => url.trim().length > 0);
  if (hasFigures) return false;
  if (q.choiceImageUrls && q.choices && Object.keys(q.choices).every((key) => Boolean(q.choiceImageUrls?.[key as keyof typeof q.choiceImageUrls]))) return false;
  const hasTable = /^\s*\|?\s*:?-{2,}:?\s*\|/m.test(q.question);
  if (hasTable) return false;
  if (q.hasImage) return true;
  return /次の表|以下の表|下の表|表のように|表に示す|表のとおり|次の図|以下の図|下の図|図のように|図に示す|図中の/.test(q.question);
}
