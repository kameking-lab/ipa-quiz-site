import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";
import paper2023 from "./2023-annual.json";
import paper2022 from "./2022-annual.json";
import paper2021 from "./2021-annual.json";

/** 第115・114回の464原問に、第113～111回の午前各10問を追加。未確認・採点除外は未収録。 */
export const KANGOSHI_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
  ...(paper2023 as Question[]),
  ...(paper2022 as Question[]),
  ...(paper2021 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
