import type { Question } from "@/lib/questions/types";
import source2023 from "./2023-annual.json";
import source2022 from "./2022-annual.json";

export const BUILDING_CLEANING3_QUESTIONS = [...source2023, ...source2022] as Question[];
