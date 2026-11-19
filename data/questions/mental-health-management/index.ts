import type { Question } from "@/lib/questions/types";
import round35 from "./2023-autumn.json";
import round33 from "./2022-autumn.json";
import round31 from "./2021-autumn.json";
import round29 from "./2020-autumn.json";
import round27 from "./2019-autumn.json";

export const MENTAL_HEALTH_MANAGEMENT_QUESTIONS = [...round35, ...round33, ...round31, ...round29, ...round27] as Question[];
