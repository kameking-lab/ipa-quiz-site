import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_PM_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const PM_QUESTIONS: Question[] = applyIpaCorrections("pm", RAW_PM_QUESTIONS);
