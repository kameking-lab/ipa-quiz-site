import type { Question } from "@/lib/questions/types";
import annual2020 from "./2020-annual.json";
import annual2021 from "./2021-annual.json";
import early2022 from "./2022-early.json";
import late2022 from "./2022-late.json";

export const KYOTO_KENTEI3_QUESTIONS = [...late2022, ...early2022, ...annual2021, ...annual2020] as Question[];
