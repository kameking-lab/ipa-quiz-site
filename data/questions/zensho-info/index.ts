import type { Question } from "@/lib/questions/types";
import round72 from "./2024-round2.json";
import round71 from "./2024-round1.json";

export const ZENSHO_INFO_QUESTIONS = [
  ...round72,
  ...round71,
] as Question[];
