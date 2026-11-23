import type { Question } from "@/lib/questions/types";
import recent from "./kyusui.json";
import gakka2024 from "./kyusui-2024-gakka1.json";

export const KYUSUI_QUESTIONS = [...recent, ...gakka2024] as Question[];
