import { applyIpaCorrections } from "../corrections";
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

const RAW_IP_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;

export const IP_QUESTIONS: Question[] = applyIpaCorrections("ip", RAW_IP_QUESTIONS);
