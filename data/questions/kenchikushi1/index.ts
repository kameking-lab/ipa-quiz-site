import plan7194 from "./official-2019-annual-kozo-sekou.json";
import official2018AnnualGakkaBook3 from "./official-2018-annual-gakka-book-3.json";
import official2017StructureConstruction from "./official-2017-annual-gakka-book-3.json";
import official2025Drawing from "./official-2025-annual-sekkei.json";
import official2018AnnualGakkaBook2 from "./official-2018-annual-gakka-book-2.json";
import official2020AnnualGakkaBook1 from "./official-2020-annual-gakka-book-1.json";
import official2022AnnualPractical from "./official-2022-annual-practical.json";
import official2017AnnualGakkaBook2 from "./official-2017-annual-gakka-book-2.json";
import official2021AnnualPractical from "./official-2021-annual-practical.json";
import type { Question } from "@/lib/questions/types";
import selected2024 from "./2024-keikaku-selected.json";
import law2021 from "./plan5-324-law.json";
import kozoAndSekou2021 from "./2021-kouzo-sekou.json";
import r6Houki from "./2024-annual-houki.json";
import latestQuestions from "../batch2/kenchikushi1.json";
import r5 from "./2023-annual-gakka-1-2.json";
import kozoAndSekou2023 from "./2023-kouzo-sekou.json";
import questions2022 from "./2022-gakka-i-ii.json";
import structureAndConstruction2022 from "./2022-kozo-sekou.json";
import environment2021 from "./2021-kankyo-setsubi.json";
import planning2021 from "./2021-keikaku.json";
import environment2024 from "./2024-kankyo-setsubi.json";
import planningComplement2024 from "./2024-keikaku-complement.json";
import law2023 from "./2023-houki.json";
import structureConstruction2024 from "./2024-kouzo-sekou.json";
import law2022 from "./2022-houki.json";
import source190 from "./plan7-190.json";
import design2024 from "./plan7-185.json";
import book1 from "./2019-annual-book-1.json";
import { KENCHIKUSHI1_2018_QUESTIONS } from "./2018-annual";
import official2017AnnualGakkaBook1 from "./official-2017-annual-gakka-book-1.json";
import official2023AnnualPractical from "./official-2023-annual-practical.json";
import official2019AnnualHouki from "./official-2019-annual-houki.json";
import official2020AnnualKozoSekou from "./official-2020-annual-kozo-sekou.json";

export const KENCHIKUSHI1_QUESTIONS = [
  ...plan7194,
  ...official2018AnnualGakkaBook3,
  ...official2017StructureConstruction,
  ...official2025Drawing,
  ...official2018AnnualGakkaBook2,
  ...official2020AnnualGakkaBook1,
  ...official2022AnnualPractical,
  ...official2017AnnualGakkaBook2,
  ...official2021AnnualPractical,
  ...selected2024,
  ...law2021,
  ...kozoAndSekou2021,
  ...r6Houki,
  ...latestQuestions,
  ...r5,
  ...kozoAndSekou2023,
  ...questions2022,
  ...structureAndConstruction2022,
  ...environment2021,
  ...planning2021,
  ...environment2024,
  ...planningComplement2024,
  ...law2023,
  ...structureConstruction2024,
  ...law2022,
  ...source190,
  ...design2024,
  ...book1,
  ...KENCHIKUSHI1_2018_QUESTIONS,
  ...official2017AnnualGakkaBook1,
  ...official2023AnnualPractical,
  ...official2019AnnualHouki,
  ...official2020AnnualKozoSekou,
] as Question[];
