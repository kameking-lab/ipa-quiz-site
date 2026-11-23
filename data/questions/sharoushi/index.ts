import type { Question } from "@/lib/questions/types";

import paper2026 from "./2026-annual.json";

import paper2025 from "./2025-annual.json";

import gakka2024 from "./2024-gakka.json";

import rousai2025 from "./rousai-2025-annual.json";

import rousai2026 from "./rousai-2026-annual.json";

import koyou2025 from "./koyou-2025-annual.json";

import koyou2026 from "./koyou-2026-annual.json";

import kenpo2025 from "./kenpo-2025-annual.json";

import kenpo2026 from "./kenpo-2026-annual.json";

import kounen2025 from "./kounen-2025-annual.json";

import kounen2026 from "./kounen-2026-annual.json";

import ippan2025 from "./ippan-2025-annual.json";

import kokunen2025 from "./kokunen-2025-annual.json";

import kokunen2026 from "./kokunen-2026-annual.json";

import ippan2026 from "./ippan-2026-annual.json";


import remainingVerified from "./remaining-verified-20261011.json";


/**
 * 第58・57回の既存択一式と、第56回の労基・安衛全10問。
 * 第56回は他科目を含む択一式全70問の一部収録。
 * 各科目の公式問番号1〜10は独立して保持する。
 */
export const SHAROUSHI_QUESTIONS: Question[] = [
  ...(paper2026 as Question[]),
  ...(paper2025 as Question[]),
  ...(gakka2024 as Question[]),
  ...(rousai2025 as Question[]),
  ...(rousai2026 as Question[]),
  ...(koyou2025 as Question[]),
  ...(koyou2026 as Question[]),
  ...(kenpo2025 as Question[]),
  ...(kenpo2026 as Question[]),
  ...(kounen2025 as Question[]),
  ...(kounen2026 as Question[]),
  ...(ippan2025 as Question[]),
  ...(ippan2026 as Question[]),
  ...(kokunen2025 as Question[]),
  ...(kokunen2026 as Question[]),
  ...(remainingVerified as Question[]),
].sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
