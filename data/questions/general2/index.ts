import data from "./two-sittings.json";
import englishWritten2025 from "./2025-september-eigo-hikki.json";
import englishConversation2025 from "./2025-september-eigo-kaiwa.json";
import tiri2025 from "./2025-september-tiri.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/** Private candidate only; root owns catalog/runtime and public authorization. */
export const GENERAL2_ALL_QUESTIONS = [...data, ...tiri2025, ...englishWritten2025, ...englishConversation2025].map(normalizeQuestionData);
export const GENERAL2_QUESTIONS = GENERAL2_ALL_QUESTIONS.filter(isPracticeReadyQuestion);
