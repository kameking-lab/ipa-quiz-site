import type { Question } from "@/lib/questions/types";

type FigureCorrection = Pick<Question, "hasImage" | "imageUrls">;

const figure = (path: string): FigureCorrection => ({ hasImage: true, imageUrls: [path] });

/** Official-PDF crops required to make every 2024 ST morning question playable. */
export const ST_FIGURE_CORRECTIONS: Record<string, FigureCorrection> = {
  "st-2024h-am1-q3": figure("/questions/ipa-audit-20260924/st-2024h-am1-q3.png"),
  "st-2024h-am1-q6": figure("/questions/ipa-audit-20260924/st-2024h-am1-q6.png"),
  "st-2024h-am1-q7": figure("/questions/ipa-audit-20260924/st-2024h-am1-q7.png"),
  "st-2024h-am1-q18": figure("/questions/ipa-audit-20260924/st-2024h-am1-q18.png"),
  "st-2024h-am1-q19": figure("/questions/ipa-audit-20260924/st-2024h-am1-q19.png"),
  "st-2024h-am1-q29": figure("/questions/ipa-audit-20260924/st-2024h-am1-q29.png"),
  "st-2024h-am2-q5": figure("/questions/ipa-audit-20260924/st-2024h-am2-q5.png"),
  "st-2024h-am2-q11": figure("/questions/ipa-audit-20260924/st-2024h-am2-q11.png"),
  "st-2024h-am2-q20": figure("/questions/ipa-audit-20260924/st-2024h-am2-q20.png"),
};
