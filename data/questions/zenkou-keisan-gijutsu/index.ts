import type { Question } from "@/lib/questions/types";
import round92 from "./round-92.json";
import round93 from "./round-93.json";
import round94 from "./round-94.json";

export const ZENKOU_KEISAN_GIJUTSU_QUESTIONS = [...round94, ...round93, ...round92] as Question[];
