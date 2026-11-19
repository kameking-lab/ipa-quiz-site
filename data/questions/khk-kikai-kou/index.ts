import type { Question } from "@/lib/questions/types";
import previousYears from "../batch1/khk-kikai-kou.json";
import paper2026 from "./2026-annual.json";

export const KHK_KIKAI_KOU_QUESTIONS = [...paper2026, ...previousYears] as Question[];
