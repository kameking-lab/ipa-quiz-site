import type { Question } from "./types";

/** Shared by server/client pools and direct question pages. A metadata flag
 * alone is not a rendered figure. Transcribed Markdown tables remain usable. */
export function hasUnrenderableContent(q: Question): boolean {
  const hasFigures = (q.imageUrls ?? []).some((url) => url.trim().length > 0);
  if (hasFigures || (q.type === "native-b" && q.nativeB?.bankImageUrls?.some((url) => url.trim()))) return false;
  if (q.choiceImageUrls && q.choices && Object.keys(q.choices).every((key) => Boolean(q.choiceImageUrls?.[key as keyof typeof q.choiceImageUrls]))) return false;
  // A choice may contain a visual symbol while the stem itself is fully readable
  // as text. Partial choice figures are sufficient in that case.
  const stemNeedsFigure = /次の図(?!面)|以下の図(?!面)|下の図(?!面)|図のように|図に示す|図中の/.test(q.question);
  if (!stemNeedsFigure && Object.values(q.choiceImageUrls ?? {}).some(Boolean)) return false;
  const visibleText = [q.question, ...(q.originalContent?.sharedPassages ?? []).map(passage => passage.text)].join("\n");
  const hasTable = /^\s*\|?\s*:?-{2,}:?\s*\|/m.test(visibleText);
  if (hasTable) return false;
  // 電験三種の2024年度上期法規問8は、公式表の行・数値・単位を
  // 「【表】」以下に全文文字起こししている。画像フラグだけで除外しない。
  if (q.exam === "denken3" && q.id === "denken3-2024-upper-law-q08" && q.question.includes("【表】") && q.question.includes("0.1 MΩ") && q.question.includes("0.2 MΩ")) return false;
  // 貸金業務取扱主任者 第19回問48は、損益計算書の科目・金額を全文文字起こしして
  // ステムに含めている（原本は表組みだが数値の欠落はない）。
  if (q.exam === "kashikin" && q.id === "kashikin-2024-annual-gakka-q48") return false;
  // These accepted originals preserve every table row in the visible transcript.
  if (q.id === "gijutsushi1-kikai-2024-basis-I-1-5" && q.question.includes("原料A［kg］：1／2／12") && q.question.includes("利益［万円/kg］：300／200／適用なし")) return false;
  if (q.exam === "jken-system" && /^jken-system-260913-js01-q[24]-\d+$/.test(q.id) && q.question.includes("```text")) return false;
  if (q.hasImage) return true;
  return /次の表(?!面)|以下の表(?!面)|下の表(?!面)|表のように|表に示す|表のとおり|次の図(?!面)|以下の図(?!面)|下の図(?!面)|図のように|図に示す|図中の/.test(q.question);
}
