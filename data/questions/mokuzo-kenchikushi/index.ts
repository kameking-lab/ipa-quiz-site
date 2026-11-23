import type { Question } from "@/lib/questions/types";
import planning2024 from "./2024-am1.json";
import int7Questions from "../batch3/mokuzo-kenchikushi.json";
import questions2022 from "./2022-gakka-III-IV.json";
import law2024 from "./2024-am2.json";
import source2024 from "./2024-annual-iii-iv.json";
import source2023 from "./2023-annual-i-ii.json";
import structureAndConstruction2023 from "./2023-annual-iii-iv.json";
import planningAndLaw2021 from "./2021-planning-law.json";
import questions2021 from "./2021-gakka-III-IV.json";

export const QUESTIONS = [
  ...planning2024,
  ...int7Questions,
  ...questions2022,
  ...law2024,
  ...source2024,
  ...source2023,
  ...structureAndConstruction2023,
  ...planningAndLaw2021,
  ...questions2021,
] as Question[];
