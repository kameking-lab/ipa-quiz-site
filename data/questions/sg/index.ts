import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_SG_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const SG_QUESTIONS: Question[] = applyIpaCorrections("sg", RAW_SG_QUESTIONS);
