import hissu2026 from "./2026-hissu.json";


import hissu2025 from "./2025-hissu.json";


import ippan2026 from "./2026-ippan.json";


import ippan2025 from "./2025-ippan.json";
import practical2025 from "./2025-practical.json";

import practical2026 from "./2026-practical.json";


import type { Question } from "@/lib/questions/types";

export const AIGAN_KANGOSHI_QUESTIONS = [...hissu2026, ...hissu2025, ...ippan2026, ...ippan2025, ...practical2026, ...practical2025] as Question[];
