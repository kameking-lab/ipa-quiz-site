import data from "./questions.json";
import kigyo2025Round2 from "./2025-round2-kigyo.json";
import kansa2025Round2 from "./2025-round2-kansa.json";
import { normalizePublicPdlQuestion } from "@/lib/questions/pdl-public";

export const KAIKEISHI_QUESTIONS = [
  ...data.map(normalizePublicPdlQuestion),
  ...kigyo2025Round2.map(normalizePublicPdlQuestion),
  ...kansa2025Round2.map(normalizePublicPdlQuestion),
];
