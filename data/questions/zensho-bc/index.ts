import type { Question } from "@/lib/questions/types";
import second2022 from "./2022-second.json";
import first2023 from "./2023-first.json";
import second2023 from "./2023-second.json";

export const ZENSHO_BC_QUESTIONS = [...second2023, ...first2023, ...second2022] as Question[];
