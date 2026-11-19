import data from "./questions.json";
import annual2023 from "./2023-annual.json";
import { normalizePublicPdlQuestion } from "@/lib/questions/pdl-public";

export const KANTEISHI_QUESTIONS = [...data, ...annual2023].map(normalizePublicPdlQuestion);
