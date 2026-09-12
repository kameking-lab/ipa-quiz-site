import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_ST_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const ST_QUESTIONS: Question[] = applyIpaCorrections("st", RAW_ST_QUESTIONS);
