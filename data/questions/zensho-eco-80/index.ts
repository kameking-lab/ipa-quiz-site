import type { Question } from "@/lib/questions/types";
import business2022 from "./2022-annual-business.json";
import business2023 from "./2023-annual-business.json";
import marketing2023 from "./2023-annual-marketing.json";

export const ZENSHO_ECO_QUESTIONS: Question[] = [
  ...business2023 as Question[],
  ...marketing2023 as Question[],
  ...business2022 as Question[],
];
