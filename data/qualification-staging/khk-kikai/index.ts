import kou from "./khk-kikai-kou/questions.json";
import otsu from "./khk-kikai-otsu/questions.json";

/** Editorial staging only. Public registries must not import these candidates. */
export const KHK_KIKAI_STAGING = [
  { slug: "khk-kikai-kou", name: "高圧ガス製造保安責任者 甲種機械", publicAllowed: false, questions: kou },
  { slug: "khk-kikai-otsu", name: "高圧ガス製造保安責任者 乙種機械", publicAllowed: false, questions: otsu },
] as const;
