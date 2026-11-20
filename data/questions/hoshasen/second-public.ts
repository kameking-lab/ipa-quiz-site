import type { Question } from "@/lib/questions/types";
import previous from "../batch1/hoshasen-2.json";
import law2022 from "./2022-2-hourei-public.json";
import law2023 from "./2023-2-hourei-public.json";
import law2024 from "./2024-2-hourei-public.json";
import physics2024 from "./2024-2-butsuri-public.json";
import chemistry2024 from "./2024-2-kagaku-public.json";
import biology2024 from "./2024-2-seibutsu-public.json";
import practice2024 from "./2024-2-jitsumu-public.json";
import physics2023 from "./2023-2-butsuri-public.json";
import chemistry2023 from "./2023-2-kagaku-public.json";
import biology2023 from "./2023-2-seibutsu-public.json";

export const HOSHASEN_SECOND_QUESTIONS = [...previous, ...physics2024, ...chemistry2024, ...biology2024, ...practice2024, ...physics2023, ...chemistry2023, ...biology2023, ...law2024, ...law2023, ...law2022] as Question[];
