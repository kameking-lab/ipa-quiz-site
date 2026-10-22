import data from "./questions.json";
import { normalizePublicPdlQuestion } from "@/lib/questions/pdl-public";

export const KAIKEISHI_QUESTIONS = data.map(normalizePublicPdlQuestion);
