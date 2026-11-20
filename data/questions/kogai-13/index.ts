import type { Question } from "@/lib/questions/types";
import noise2024 from "./2024-annual-soon-shindo-gairon.json";
import dust2024 from "./2024-annual-baijin-funjin.json";
import waterTreatment2024 from "./2024-annual-osui-tokuron.json";
import waterHazard2024 from "./2024-annual-suishitsu-yugai.json";
import airWater2024 from "./2024-annual-taiki-suishitsu-gairon.json";
import airSpecialty2024 from "./2024-annual-taiki-tokuron.json";
import airHazard2024 from "./2024-annual-taiki-yugai.json";
import waterLarge2024 from "./2024-annual-daikibo-suishitsu.json";
import airLarge2024 from "./2024-annual-daikibo-taiki.json";
import air2024 from "./2024-annual-taiki-gairon.json";
import water2024 from "./2024-annual-suishitsu-gairon.json";
import vibrationTech2025 from "./2025-annual-soon-shindo-tokuron.json";
import airTech2025 from "./2025-annual-taiki-gijutsu.json";
import waterTech2025 from "./2025-annual-suishitsu-gijutsu.json";
import dioxinFund2025 from "./2025-annual-dioxin-gairon.json";
import airWater2025 from "./2025-annual-taiki-suishitsu-gairon.json";
import dioxin2025 from "./2025-annual-dioxin-tokuron.json";
import noise2025 from "./2025-annual-soon-shindo-gairon.json";
import generalDust2025 from "./2025-annual-ippan-funjin.json";
import dust2025 from "./2025-annual-baijin-funjin.json";
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
  ...dust2025,
  ...generalDust2025,
  ...airHazard2025,
  ...airLarge2025,
  ...water2025,
  ...waterTreatment2025,
  ...waterHazard2025,
  ...waterLarge2025,
  ...noise2025,
  ...vibrationTech2025,
  ...dioxinFund2025,
  ...dioxin2025,
  ...airWater2025,
  ...airTech2025,
  ...waterTech2025,
  ...general2024,
  ...air2024,
  ...airSpecialty2024,
  ...dust2024,
  ...airHazard2024,
  ...airLarge2024,
  ...water2024,
  ...waterTreatment2024,
  ...waterHazard2024,
  ...waterLarge2024,
  ...noise2024,
  ...airWater2024,
  ...general2023,
  ...general2022,
] as Question[];
