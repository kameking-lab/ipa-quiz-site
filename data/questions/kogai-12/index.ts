import type { Question } from "@/lib/questions/types";
import general2025 from "./2025-kogai-general.json";
import airBasics2025 from "./2025-kogai-air-basics.json";
import airTechnology2025 from "./2025-kogai-air-technology.json";
import dust2025 from "./2025-kogai-dust.json";
import airHazardous2025 from "./2025-kogai-air-hazardous.json";
import largeAir2025 from "./2025-kogai-large-air.json";
import waterBasics2025 from "./2025-kogai-water-basics.json";
import wastewater2025 from "./2025-kogai-wastewater.json";
import waterHazardous2025 from "./2025-kogai-water-hazardous.json";
import largeWater2025 from "./2025-kogai-large-water.json";

export const KOGAI_QUESTIONS: Question[] = [...general2025, ...airBasics2025, ...airTechnology2025, ...dust2025, ...airHazardous2025, ...largeAir2025, ...waterBasics2025, ...wastewater2025, ...waterHazardous2025, ...largeWater2025] as Question[];
