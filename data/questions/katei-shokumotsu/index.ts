import type { Question } from "@/lib/questions/types";
import round60 from "./round-60.json";
import round61 from "./round-61.json";
import round62 from "./round-62.json";

export const KATEI_SHOKUMOTSU_QUESTIONS = [...round62, ...round61, ...round60] as Question[];
