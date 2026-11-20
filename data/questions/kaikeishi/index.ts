import data from "./questions.json";
import round2023First from "./2023-round1.json";
import round2023Second from "./2023-round2.json";
import round2024First from "./2024-round1.json";
import round2024Second from "./2024-round2.json";
import { normalizePublicPdlQuestion } from "@/lib/questions/pdl-public";

export const KAIKEISHI_QUESTIONS = [...data, ...round2024First, ...round2024Second, ...round2023First, ...round2023Second].map(normalizePublicPdlQuestion);
