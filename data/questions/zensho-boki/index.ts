import type { Question } from "@/lib/questions/types";
import second2024 from "./2024-second.json";
import first2024 from "./2024-first.json";
import second2023 from "./2023-second.json";
import first2023 from "./2023-first.json";
import second2022 from "./2022-second.json";
import first2022 from "./2022-first.json";

export const ZENSHO_BOKI_QUESTIONS: Question[] = [...second2024, ...first2024, ...second2023, ...first2023, ...second2022, ...first2022] as Question[];
