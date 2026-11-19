import type { Question } from "@/lib/questions/types";


import recent from "../batch1/kyusui.json";


import gakka2From2024 from "./2024-gakka-2.json";


import latest from "../batch1/kyusui.json";


import gakka2023 from "./2023-annual-gakka2.json";

import recentQuestions from "../batch1/kyusui.json";

import book2021 from "./2021-annual-gakka-2.json";

export const KYUSUI_QUESTIONS = [...recent, ...gakka2From2024, ...latest, ...gakka2023, ...recentQuestions, ...book2021] as Question[];
