import type { ExamCode, Question } from "@/lib/questions/types";
import { AP_QUESTIONS } from "./ap";

// ─── How to add a new exam ───────────────────────────────────────────────────
// 1. Run:  pnpm fetch:pdfs --exam=<code>
//          pnpm parse:pdfs --exam=<code> --resume
// 2. The parser writes data/questions/<code>/by-year/*.ts + by-year/index.ts
// 3. Create data/questions/<code>/index.ts (see ap/index.ts as reference)
// 4. Uncomment the import + QUESTIONS_BY_EXAM entry below
// 5. Uncomment the matching loader in lib/questions/get-questions.ts
// ────────────────────────────────────────────────────────────────────────────

// import { FE_QUESTIONS } from "./fe";
// import { SG_QUESTIONS } from "./sg";
// import { SC_QUESTIONS } from "./sc";
// import { NW_QUESTIONS } from "./nw";
// import { DB_QUESTIONS } from "./db";
// import { ST_QUESTIONS } from "./st";
// import { SA_QUESTIONS } from "./sa";
// import { PM_QUESTIONS } from "./pm";
// import { ES_QUESTIONS } from "./es";
// import { SM_QUESTIONS } from "./sm";
// import { AU_QUESTIONS } from "./au";

export const QUESTIONS_BY_EXAM: Partial<Record<ExamCode, Question[]>> = {
  ap: AP_QUESTIONS,
  // fe: FE_QUESTIONS,
  // sg: SG_QUESTIONS,
  // sc: SC_QUESTIONS,
  // nw: NW_QUESTIONS,
  // db: DB_QUESTIONS,
  // st: ST_QUESTIONS,
  // sa: SA_QUESTIONS,
  // pm: PM_QUESTIONS,
  // es: ES_QUESTIONS,
  // sm: SM_QUESTIONS,
  // au: AU_QUESTIONS,
};

export const ALL_QUESTIONS: Question[] = (
  Object.values(QUESTIONS_BY_EXAM) as Question[][]
).flat();
