import type { Question } from "@/lib/questions/types";
import business2022 from "./2022-business.json";
import marketing2022 from "./2022-marketing.json";
import businessEconomicsA2022 from "./2022-business-a.json";
import businessEconomicsB2022 from "./2022-business-b.json";
import law2022 from "./2022-law.json";

export const ZENSHO_ECO_81_QUESTIONS: Question[] = [
  ...business2022,
  ...marketing2022,
  ...businessEconomicsA2022,
  ...businessEconomicsB2022,
  ...law2022,
] as Question[];
