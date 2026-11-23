import round8 from "./2020-annual.json";
import round9 from "./2021-annual.json";
import data from "./2024-14.json";
import type { Question } from "@/lib/questions/types";

export const ZENSHO_BC_QUESTIONS = [...data, ...round9, ...round8] as Question[];
