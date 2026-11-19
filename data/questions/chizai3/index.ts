import type { Question } from "@/lib/questions/types";
import round52 from "./2025-autumn.json";
import round51 from "./2025-july.json";
import round50 from "./2025-spring.json";
import round49 from "./2024-autumn.json";

export const CHIZAI3_QUESTIONS = [...round52, ...round51, ...round50, ...round49] as Question[];
