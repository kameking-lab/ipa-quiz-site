import data from "./questions.json";
import round2024First from "./2024-round1.json";
import round2024Second from "./2024-round2.json";
import { normalizePublicPdlQuestion } from "@/lib/questions/pdl-public";

export const KAIKEISHI_QUESTIONS = [...data, ...round2024First, ...round2024Second].map(normalizePublicPdlQuestion);
