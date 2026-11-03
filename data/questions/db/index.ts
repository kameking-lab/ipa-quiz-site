import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_DB_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const DB_QUESTIONS: Question[] = applyIpaCorrections("db", RAW_DB_QUESTIONS);
