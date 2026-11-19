import type { Question } from "@/lib/questions/types";
import previous from "../batch1/hoshasen-1.json";
import law2022 from "./2022-1-hourei-public.json";
import law2023 from "./2023-1-hourei-public.json";
import law2024 from "./2024-1-hourei-public.json";
import physics2024 from "./2024-1-butsuri-public.json";
import chemistry2024 from "./2024-1-kagaku-public.json";
import biology2024 from "./2024-1-seibutsu-public.json";
import practice2024 from "./2024-1-jitsumu-public.json";

export const HOSHASEN_FIRST_QUESTIONS = [...previous, ...physics2024, ...chemistry2024, ...biology2024, ...practice2024, ...law2024, ...law2023, ...law2022] as Question[];
