import type { Question } from "@/lib/questions/types";
import business2023 from "./2023-business.json";
import business2022 from "./2022-business.json";

export const ZENSHO_ECO_QUESTIONS = [...business2023, ...business2022] as Question[];
