import official2018StructureConstruction from "./official-2018-annual-gakka-book-2.json";
import official2022Drawing from "./official-2022-annual-sekkei.json";
import official2017StructureConstruction from "./official-2017-annual-gakka-book-2.json";
import type { Question } from "@/lib/questions/types";
import planning2024 from "./2024-gakka-I.json";
import law2024 from "./2024-gakka-II.json";
import law2022 from "./2022-law.json";
import planning2022 from "./2022-planning.json";
import recentQuestions from "../batch3/kenchikushi2.json";
import questions2022 from "./2022-III-IV.json";
import questions2021 from "./2021-gakka-I-II.json";
import questions2023 from "./2023-gakka-I-II.json";
import structureAndConstruction2021 from "./2021-gakka-III-IV.json";
import questions2024 from "./2024-gakka-III-IV.json";
import gakka2023StructureAndConstruction from "./2023-gakka-III-IV.json";
import source212 from "./plan7-212.json";
import book1 from "./2020-annual-book-1.json";
import design2025 from "./2025-design.json";
import { KENCHIKUSHI2_2020_QUESTIONS } from "./2020-annual";
import { KENCHIKUSHI2_2024_PRACTICAL_QUESTIONS } from "./2024-annual-practical";
import drawing2023 from "./official-2023-annual-practical.json";
import official2019AnnualGakkaBook1 from "./official-2019-annual-gakka-book-1.json";
import { KENCHIKUSHI2_2019_GAKKA_III } from "./2019-annual-gakka-III";
import { KENCHIKUSHI2_2019_GAKKA_IV } from "./2019-annual-gakka-IV";
import { KENCHIKUSHI2_2021_PRACTICAL } from "./2021-annual-practical";
import official2018 from "./2018-annual-gakka-1-2.json";

export const QUESTIONS = [
  ...official2018StructureConstruction,
  ...official2022Drawing,
  ...official2017StructureConstruction,
  ...planning2024,
  ...law2024,
  ...law2022,
  ...planning2022,
  ...recentQuestions,
  ...questions2022,
  ...questions2021,
  ...questions2023,
  ...structureAndConstruction2021,
  ...questions2024,
  ...gakka2023StructureAndConstruction,
  ...source212,
  ...book1,
  ...design2025,
  ...KENCHIKUSHI2_2020_QUESTIONS,
  ...KENCHIKUSHI2_2024_PRACTICAL_QUESTIONS,
  ...drawing2023,
  ...official2019AnnualGakkaBook1,
  ...KENCHIKUSHI2_2019_GAKKA_III,
  ...KENCHIKUSHI2_2019_GAKKA_IV,
  KENCHIKUSHI2_2021_PRACTICAL,
  ...official2018,
] as Question[];
