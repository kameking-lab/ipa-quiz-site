import type { Question } from "@/lib/questions/types";
import paper1 from "./2024-annual-katei-old2.json";
import paper2 from "./2024-annual-katei-old3.json";

export const KATEI_SHOKUMOTSU_QUESTIONS = [...paper1, ...paper2] as Question[];
