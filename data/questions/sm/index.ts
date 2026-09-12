import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_SM_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const SM_QUESTIONS: Question[] = applyIpaCorrections("sm", RAW_SM_QUESTIONS);
