import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_SC_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const SC_QUESTIONS: Question[] = applyIpaCorrections("sc", RAW_SC_QUESTIONS);
