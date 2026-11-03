import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_FE_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const FE_QUESTIONS: Question[] = applyIpaCorrections("fe", RAW_FE_QUESTIONS);
