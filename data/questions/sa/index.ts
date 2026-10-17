import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";
import { applySa2024Am1Sparse } from "./am1-2024-sparse-corrections";

const RAW_SA_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const SA_QUESTIONS: Question[] = applySa2024Am1Sparse(
  applyIpaCorrections("sa", RAW_SA_QUESTIONS),
);
