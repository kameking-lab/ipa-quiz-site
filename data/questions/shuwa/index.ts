import type { Question } from "@/lib/questions/types";
import reviewed from "./2026-reviewed.json";
import reviewed2022 from "./2022-reviewed.json";
import reviewed2023 from "./2023-reviewed.json";
import reviewed2024 from "./2024-reviewed.json";
import reviewed2025 from "./2025-reviewed.json";

/** 原本照合済みのステージング候補。公開レジストリは資格台帳のゲートを通す。 */
export const SHUWA_QUESTIONS: Question[] = [...reviewed, ...reviewed2025, ...reviewed2024, ...reviewed2023, ...reviewed2022] as Question[];
