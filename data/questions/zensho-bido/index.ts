import type { Question } from "@/lib/questions/types";
import round73 from "./round-73.json";
import round72 from "./round-72.json";
import round71 from "./round-71.json";
import round70 from "./round-70.json";
import round69 from "./round-69.json";
import round68 from "./round-68.json";

export const ZENSHO_BIDO_QUESTIONS: Question[] = [
  ...(round73 as Question[]),
  ...(round72 as Question[]),
  ...(round71 as Question[]),
  ...(round70 as Question[]),
  ...(round69 as Question[]),
  ...(round68 as Question[]),
];
