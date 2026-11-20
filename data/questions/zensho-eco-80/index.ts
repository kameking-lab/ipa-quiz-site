import type { Question } from "@/lib/questions/types";
import business2022 from "./2022-annual-business.json";
import businessA2022 from "./2022-annual-businessA.json";
import marketing2022 from "./2022-annual-marketing.json";
import business2023 from "./2023-annual-business.json";
import law2023 from "./2023-annual-keihou.json";
import management2023 from "./2023-annual-businessmane.json";
import businessB2023 from "./2023-annual-businessB.json";
import businessA2023 from "./2023-annual-businessA.json";
import marketing2023 from "./2023-annual-marketing.json";

export const ZENSHO_ECO_QUESTIONS: Question[] = [
  ...business2023 as Question[],
  ...marketing2023 as Question[],
  ...businessA2023 as Question[],
  ...businessB2023 as Question[],
  ...management2023 as Question[],
  ...law2023 as Question[],
  ...business2022 as Question[],
  ...marketing2022 as Question[],
  ...businessA2022 as Question[],
];
