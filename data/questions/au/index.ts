import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_AU_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const AU_QUESTIONS: Question[] = applyIpaCorrections("au", RAW_AU_QUESTIONS);
