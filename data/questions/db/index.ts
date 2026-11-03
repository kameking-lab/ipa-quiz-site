import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import latest2Audit from "./latest2-audit-20261103.json";

const RAW_DB_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

const audited: Record<string, Partial<Question>> = latest2Audit;

export const DB_QUESTIONS: Question[] = applyIpaCorrections("db", RAW_DB_QUESTIONS)
  .map(question => ({ ...question, ...audited[question.id] }));
