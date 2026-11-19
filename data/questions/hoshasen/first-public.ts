import type { Question } from "@/lib/questions/types";
import previous from "../batch1/hoshasen-1.json";
import law2024 from "./2024-1-hourei-public.json";

export const HOSHASEN_FIRST_QUESTIONS = [...previous, ...law2024] as Question[];
