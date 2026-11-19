import type { Question } from "@/lib/questions/types";
import round14 from "./2022.json";
import round15 from "./2023.json";

export const ZENSHO_FINANCIAL_STATEMENT_ANALYSIS_QUESTIONS = [...round15, ...round14] as Question[];
