import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-annual.json";
import paper2024 from "./2024-annual.json";
import paper2022 from "./2022-annual.json";
import paper2021 from "./2021-annual.json";
import paper2020 from "./2020-annual.json";

/** 貸金業務取扱主任者資格試験の公式公開問題。 */
export const KASHIKIN_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2024 as Question[]),
  ...(paper2022 as Question[]),
  ...(paper2021 as Question[]),
  ...(paper2020 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
