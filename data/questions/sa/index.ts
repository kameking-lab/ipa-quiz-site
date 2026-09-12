import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_SA_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const SA_QUESTIONS: Question[] = applyIpaCorrections("sa", RAW_SA_QUESTIONS);
