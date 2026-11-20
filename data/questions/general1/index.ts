import data from "./two-sittings.json";
import engineeringA2023March from "./2023-03-kogaku-a.json";
import oralEnglish2022March from "./2022-03-eigo-oral.json";
import oralEnglish2023March from "./2023-03-eigo-oral.json";
import writtenEnglish2023March from "./2023-03-eigo-written.json";
import geography2022March from "./2022-03-tiri.json";
import law2022March from "./2022-03-hoki.json";
import engineeringA2022March from "./2022-03-kogaku-a.json";
import foundation2022March from "./2022-03-kiso.json";
import engineeringB2022March from "./2022-03-kogaku-b.json";
import writtenEnglish2025September from "./2025-09-eigo-written.json";
import oralEnglish2025September from "./2025-09-eigo-oral.json";
import general2025SepTiri from "./2025-09-tiri";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

// Preserve these exact unresolved original IDs even if a review flag changes.
const CONTENT_HOLD_IDS = new Set([
  "radio21-general1-2026-03-tiri-q01",
  "radio21-general1-2026-03-tiri-q03",
  "radio21-general1-2026-03-tiri-q04",
  "radio21-general1-2026-03-tiri-q05",
  "radio21-general1-2026-03-tiri-q06",
  "radio21-general1-2026-09-tiri-q02",
  "radio21-general1-2026-09-tiri-q03",
  "radio21-general1-2026-09-tiri-q04",
  "radio21-general1-2026-09-tiri-q05",
  "radio21-general1-2026-09-tiri-q06",
]);

export const GENERAL1_ALL_QUESTIONS = [...data, ...writtenEnglish2023March, ...oralEnglish2023March, ...engineeringA2023March, ...oralEnglish2022March, ...geography2022March, ...law2022March, ...engineeringA2022March, ...foundation2022March, ...engineeringB2022March, ...writtenEnglish2025September, ...oralEnglish2025September, ...general2025SepTiri].map(normalizeQuestionData);
export const GENERAL1_QUESTIONS = GENERAL1_ALL_QUESTIONS.filter(
  (q) => isPracticeReadyQuestion(q) && !CONTENT_HOLD_IDS.has(q.id),
);
