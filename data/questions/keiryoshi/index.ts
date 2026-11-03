import type { Question } from "@/lib/questions/types";
import kanka from "./2025-kanka.json";
import kanbutsu from "./2025-kanbutsu.json";
import kanno from "./2025-kanno.json";
import kanon from "./2025-kanon.json";
import houki from "./2025-houki.json";
import kanri from "./2025-kanri.json";
import ichiki from "./2025-ichiki.json";
import keishitsu from "./2025-keishitsu.json";

import kanka75 from "./2024-kanka.json";
import kanbutsu75 from "./2024-kanbutsu.json";
import kanno75 from "./2024-kanno.json";
import kanon75 from "./2024-kanon.json";
import houki75 from "./2024-houki.json";
import kanri75 from "./2024-kanri.json";
import ichiki75 from "./2024-ichiki.json";
import keishitsu75 from "./2024-keishitsu.json";

export type KeiryoshiExam = "keiryoshi" | "keiryoshi-nodo" | "keiryoshi-soon";
type SourceQuestion = Omit<Question, "id" | "exam">;

/** 第76回・第75回の計400原問。共通科目は複製せず、訂正もここで一元管理する。 */
export const KEIRYOSHI_SOURCE_QUESTIONS: readonly SourceQuestion[] = [
  ...kanka, ...kanbutsu, ...kanno, ...kanon, ...houki, ...kanri, ...ichiki, ...keishitsu,
  ...kanka75, ...kanbutsu75, ...kanno75, ...kanon75, ...houki75, ...kanri75, ...ichiki75, ...keishitsu75,
] as SourceQuestion[];

/** 公式問題一覧と正答表の科目番号に対応。公開は資格台帳の判断で別途制御する。 */
export const KEIRYOSHI_SUBJECTS = {
  keiryoshi: ["一基", "計質", "法規", "管理"],
  "keiryoshi-nodo": ["環化", "環濃", "法規", "管理"],
  "keiryoshi-soon": ["環物", "環音", "法規", "管理"],
} as const satisfies Record<KeiryoshiExam, readonly string[]>;

export function getKeiryoshiCandidates(exam: KeiryoshiExam): Question[] {
  return KEIRYOSHI_SUBJECTS[exam].flatMap(subject =>
    KEIRYOSHI_SOURCE_QUESTIONS.filter(q => q.subject === subject).map(q => ({
      ...q,
      id: `${exam}-${q.year}-${q.season}-${q.session}-q${q.qNumber}`,
      exam,
    })),
  );
}

/** 未公開候補もスキーマ検証の対象にする。一般の出題プールへの登録とは分離する。 */
export const KEIRYOSHI_CANDIDATES: Question[] = (
  Object.keys(KEIRYOSHI_SUBJECTS) as KeiryoshiExam[]
).flatMap(getKeiryoshiCandidates);
