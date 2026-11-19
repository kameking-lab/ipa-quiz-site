import type { Question } from "@/lib/questions/types";
import autumn2011 from "./2011-autumn.json";
import autumn2015 from "./2015-autumn.json";

export const APEF4_QUESTIONS = [...autumn2015, ...autumn2011] as Question[];
