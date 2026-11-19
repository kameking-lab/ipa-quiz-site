import type { Question } from "@/lib/questions/types";
import round42 from "./2021-second.json";
import round43 from "./2022-first.json";
import round44 from "./2022-second.json";
import round45 from "./2023-first.json";
import round46 from "./2023-second.json";
import round47 from "./2024-first.json";
import round48 from "./2024-second.json";
import round49 from "./2025-first.json";
import round50 from "./2025-second.json";

export const KATEI_HOIKU_QUESTIONS = [...round42, ...round43, ...round44, ...round45, ...round46, ...round47, ...round48, ...round49, ...round50] as Question[];
