import type { Question } from "@/lib/questions/types";
import business2023 from "./2023-business.json";
import business2022 from "./2022-business.json";
import marketing2023 from "./2023-marketing.json";
import marketing2022 from "./2022-marketing.json";
import economicLaw2023 from "./2023-keihou.json";
import economicsA2023 from "./2023-businessA.json";
import economicsA2022 from "./2022-businessA.json";
import economicsB2023 from "./2023-businessB.json";
import economicsB2022 from "./2022-businessB.json";
import management2023 from "./2023-businessmane.json";

export const ZENSHO_ECO_QUESTIONS = [
  ...business2023,
  ...marketing2023,
  ...economicLaw2023,
  ...economicsA2023,
  ...economicsB2023,
  ...management2023,
  ...business2022,
  ...marketing2022,
  ...economicsA2022,
  ...economicsB2022,
] as Question[];
