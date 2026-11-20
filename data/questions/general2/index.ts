import kogaku_b2022 from "./2022-september-kogaku-b.json";
import kogaku_a2022 from "./2022-september-kogaku-a.json";
import kiso2022 from "./2022-september-kiso.json";
import hoki2022 from "./2022-september-hoki.json";
import kiso2023 from "./2023-march-kiso.json";
import kogaku_b2025 from "./2025-september-kogaku-b.json";
import kogaku_a2025 from "./2025-september-kogaku-a.json";
import kiso2025 from "./2025-september-kiso.json";
import hoki2025 from "./2025-september-hoki.json";
import data from "./two-sittings.json";
import englishWritten2025 from "./2025-september-eigo-hikki.json";
import englishConversation2025 from "./2025-september-eigo-kaiwa.json";
import tiri2025 from "./2025-september-tiri.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/** Private candidate only; root owns catalog/runtime and public authorization. */
export const GENERAL2_ALL_QUESTIONS = [...data, ...tiri2025, ...englishWritten2025, ...englishConversation2025, ...hoki2025, ...kiso2025, ...kogaku_a2025, ...kogaku_b2025, ...kiso2023, ...hoki2022, ...kiso2022, ...kogaku_a2022, ...kogaku_b2022].map(normalizeQuestionData);
export const GENERAL2_QUESTIONS = GENERAL2_ALL_QUESTIONS.filter(isPracticeReadyQuestion);
