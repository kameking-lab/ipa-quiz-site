import data from "./questions.json";
import riron2024 from "./2024-riron.json";
import { normalizePublicPdlQuestion } from "@/lib/questions/pdl-public";

export const KANTEISHI_QUESTIONS = [
  ...data.map(normalizePublicPdlQuestion),
  ...riron2024.map(normalizePublicPdlQuestion),
];
