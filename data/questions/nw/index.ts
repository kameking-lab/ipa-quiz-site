import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_NW_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const NW_QUESTIONS: Question[] = applyIpaCorrections("nw", RAW_NW_QUESTIONS);
