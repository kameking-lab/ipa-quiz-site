import type { Question } from "@/lib/questions/types";
import waterHazard2025 from "./2025-annual-suishitsu-yugai.json";
import general2022 from "./2022-annual-ippan.json";
import general2023 from "./2023-annual-ippan.json";
import general2024 from "./2024-annual-ippan.json";
import general2025 from "./2025-annual-ippan.json";
import air2025 from "./2025-annual-taiki-gairon.json";
import airSpecialty2025 from "./2025-annual-taiki-tokuron.json";
import water2025 from "./2025-annual-suishitsu-gairon.json";
import waterTreatment2025 from "./2025-annual-osui-tokuron.json";
import waterLarge2025 from "./2025-annual-daikibo-suishitsu.json";
import airLarge2025 from "./2025-annual-daikibo-taiki.json";
import airHazard2025 from "./2025-annual-taiki-yugai.json";

export const KOGAI_13_QUESTIONS: Question[] = [
  ...general2025,
  ...air2025,
  ...airSpecialty2025,
  ...airHazard2025,
  ...airLarge2025,
  ...water2025,
  ...waterTreatment2025,
  ...waterHazard2025,
  ...waterLarge2025,
  ...general2024,
  ...general2023,
  ...general2022,
] as Question[];
