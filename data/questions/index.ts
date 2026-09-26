import type { ExamCode, Question } from "@/lib/questions/types";
import { AP_QUESTIONS } from "./ap";
import { IP_QUESTIONS } from "./ip";
import { SG_QUESTIONS } from "./sg";
import { FE_QUESTIONS } from "./fe";
import { SC_QUESTIONS } from "./sc";
import { NW_QUESTIONS } from "./nw";
import { DB_QUESTIONS } from "./db";
import { ST_QUESTIONS } from "./st";
import { SA_QUESTIONS } from "./sa";
import { PM_QUESTIONS } from "./pm";
import { ES_QUESTIONS } from "./es";
import { SM_QUESTIONS } from "./sm";
import { AU_QUESTIONS } from "./au";
import { FP2_QUESTIONS } from "./fp2";
import { FP3_QUESTIONS } from "./fp3";
import { DENKO2_QUESTIONS } from "./denko2";
import { CIVIL2_QUESTIONS } from "./civil2";
import { KANKOJI2_QUESTIONS } from "./kankoji2";
import { KAIGO_QUESTIONS } from "./kaigo";
import { SHAKAI_QUESTIONS } from "./shakai";
import { SEISHIN_QUESTIONS } from "./seishin";
import { TOHAN_QUESTIONS } from "./tohan";
import { DENKEN3_QUESTIONS } from "./denken3";
import { TAKKEN_QUESTIONS } from "./takken";
import { isExamPublished } from "@/lib/qualifications/catalog";

// ─── How to add a new exam ───────────────────────────────────────────────────
// 1. Run:  pnpm fetch:pdfs --exam=<code>
//          pnpm parse:pdfs --exam=<code> --resume
// 2. The parser writes data/questions/<code>/by-year/*.ts + by-year/index.ts
// 3. Create data/questions/<code>/index.ts (see ap/index.ts as reference)
// 4. Uncomment the import + QUESTIONS_BY_EXAM entry below
// 5. Uncomment the matching loader in lib/questions/get-questions.ts
// ────────────────────────────────────────────────────────────────────────────

export const QUESTIONS_BY_EXAM: Partial<Record<ExamCode, Question[]>> = {
  ap: AP_QUESTIONS,
  ip: IP_QUESTIONS,
  sg: SG_QUESTIONS,
  fe: FE_QUESTIONS,
  sc: SC_QUESTIONS,
  nw: NW_QUESTIONS,
  db: DB_QUESTIONS,
  st: ST_QUESTIONS,
  sa: SA_QUESTIONS,
  pm: PM_QUESTIONS,
  es: ES_QUESTIONS,
  sm: SM_QUESTIONS,
  au: AU_QUESTIONS,
  fp2: FP2_QUESTIONS,
  fp3: FP3_QUESTIONS,
  denken3: DENKEN3_QUESTIONS,
  takken: TAKKEN_QUESTIONS,
  // The official FAQ asks users to notify the examination center. Keep the
  // reviewed pilot out of all public counts/routes until that receipt exists.
  ...(isExamPublished("denko2") ? { denko2: DENKO2_QUESTIONS } : {}),
  ...(isExamPublished("civil2") ? { civil2: CIVIL2_QUESTIONS } : {}),
  ...(isExamPublished("kankoji2") ? { kankoji2: KANKOJI2_QUESTIONS } : {}),
  ...(isExamPublished("kaigo") ? { kaigo: KAIGO_QUESTIONS } : {}),
  ...(isExamPublished("shakai") ? { shakai: SHAKAI_QUESTIONS } : {}),
  ...(isExamPublished("seishin") ? { seishin: SEISHIN_QUESTIONS } : {}),
  ...(isExamPublished("tohan") ? { tohan: TOHAN_QUESTIONS } : {}),
};

export const ALL_QUESTIONS: Question[] = (
  Object.values(QUESTIONS_BY_EXAM) as Question[][]
).flat();
