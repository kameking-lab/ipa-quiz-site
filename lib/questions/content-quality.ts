import type { Question } from "./types";

/** Shared by server/client pools and direct question pages. A metadata flag
 * alone is not a rendered figure. Transcribed Markdown tables remain usable. */
export function hasUnrenderableContent(q: Question): boolean {
  const hasFigures = (q.imageUrls ?? []).some((url) => url.trim().length > 0);
  if (hasFigures) return false;
  if (q.choiceImageUrls && q.choices && Object.keys(q.choices).every((key) => Boolean(q.choiceImageUrls?.[key as keyof typeof q.choiceImageUrls]))) return false;
  // A choice may contain a visual symbol while the stem itself is fully readable
  // as text. Partial choice figures are sufficient in that case.
  const stemNeedsFigure = /次の図|以下の図|下の図|図のように|図に示す|図中の/.test(q.question);
  if (!stemNeedsFigure && Object.values(q.choiceImageUrls ?? {}).some(Boolean)) return false;
  const hasTable = /^\s*\|?\s*:?-{2,}:?\s*\|/m.test(q.question);
  if (hasTable) return false;
  // 電験三種の2024年度上期法規問8は、公式表の行・数値・単位を
  // 「【表】」以下に全文文字起こししている。画像フラグだけで除外しない。
  if (q.exam === "denken3" && q.id === "denken3-2024-upper-law-q08" && q.question.includes("【表】") && q.question.includes("0.1 MΩ") && q.question.includes("0.2 MΩ")) return false;
  if (q.hasImage) return true;
  return /次の表|以下の表|下の表|表のように|表に示す|表のとおり|次の図|以下の図|下の図|図のように|図に示す|図中の/.test(q.question);
}
