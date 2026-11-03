import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_ES_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const ES_QUESTIONS: Question[] = applyIpaCorrections("es", RAW_ES_QUESTIONS);
