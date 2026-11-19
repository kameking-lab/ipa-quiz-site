import type { Question } from "@/lib/questions/types";
import y2025 from "./2025.json";
import y2026 from "./2026.json";

/** 裁判所の問題冊子は禁転載。演習の公開レジストリからは参照しない。 */
export const SAIBANSHO_IPPAN_DAI_CANDIDATES = [...y2026, ...y2025] as Question[];
