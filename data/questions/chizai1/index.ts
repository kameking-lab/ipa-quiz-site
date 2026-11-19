import type { Question } from "@/lib/questions/types";
import round52 from "./2025-52.json";
import round51 from "./2025-51.json";
import round50 from "./2025-50.json";

export const CHIZAI1_QUESTIONS = [...round52, ...round51, ...round50] as Question[];
