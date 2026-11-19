import type { Question } from "@/lib/questions/types";
import february2022 from "./2022-february.json";
import june2022 from "./2022-june.json";
import february2023 from "./2023-february.json";
import june2023 from "./2023-june.json";
import february2024 from "./2024-february.json";

export const KANKEN_4_QUESTIONS = (february2024 as Question[]).concat(
  february2023 as Question[],
  june2023 as Question[],
  february2022 as Question[],
  june2022 as Question[],
);
