import type { Question } from "@/lib/questions/types";
import first from "./2024.json";
import second from "./2025.json";
import annual2023 from "./2023.json";
import annual2022 from "./2022.json";
import annual2026 from "./2026.json";

/** 第24回・第25回の全原問と第22・23・26回の一部を収録。公開可否は資格カタログで制御する。 */
export const IJI_SHUZEN_QUESTIONS: Question[] = [...annual2022, ...annual2023, ...first, ...second, ...annual2026] as Question[];
