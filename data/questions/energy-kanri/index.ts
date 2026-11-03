import type { Question } from "@/lib/questions/types";
import q2025_common_q02 from "./2025-common-q02.json";
import q2025_common_q03 from "./2025-common-q03.json";
import q2025_electric_q06 from "./2025-electric-q06.json";
import q2025_electric_q14 from "./2025-electric-q14.json";
import q2025_electric_q16 from "./2025-electric-q16.json";
import q2025_heat_q08 from "./2025-heat-q08.json";
import q2025_heat_q09 from "./2025-heat-q09.json";
import q2025_heat_q11 from "./2025-heat-q11.json";
import q2025_heat_q12 from "./2025-heat-q12.json";
import q2025_heat_q14 from "./2025-heat-q14.json";
import q2025_heat_q17 from "./2025-heat-q17.json";
import q2026_common_q02 from "./2026-common-q02.json";
import q2026_common_q03 from "./2026-common-q03.json";
import q2026_electric_q06 from "./2026-electric-q06.json";
import q2026_electric_q14 from "./2026-electric-q14.json";
import q2026_electric_q15 from "./2026-electric-q15.json";
import q2026_electric_q16 from "./2026-electric-q16.json";
import q2026_heat_q08 from "./2026-heat-q08.json";
import q2026_heat_q09 from "./2026-heat-q09.json";
import q2026_heat_q11 from "./2026-heat-q11.json";
import q2026_heat_q12 from "./2026-heat-q12.json";
import q2026_heat_q13 from "./2026-heat-q13.json";
import q2026_heat_q14 from "./2026-heat-q14.json";
import q2026_heat_q17 from "./2026-heat-q17.json";

/** 公開前データ。資格コード・利用区分の本登録と全課目の完成までは演習レジストリへ接続しない。 */
export type StagedEnergyKanriQuestion = Omit<Question, "exam" | "license"> & {
  exam: "energy-kanri";
  license: "ECCJ-owner-approved";
};

/** 24原問・319公式解答欄・315演習設問。順序不問の4ペアは2肢選択に統合する。 */
export const ENERGY_KANRI_STAGED_QUESTIONS: readonly StagedEnergyKanriQuestion[] =
  [...q2025_common_q02, ...q2025_common_q03, ...q2025_electric_q06, ...q2025_electric_q14, ...q2025_electric_q16, ...q2025_heat_q08, ...q2025_heat_q09, ...q2025_heat_q11, ...q2025_heat_q12, ...q2025_heat_q14, ...q2025_heat_q17, ...q2026_common_q02, ...q2026_common_q03, ...q2026_electric_q06, ...q2026_electric_q14, ...q2026_electric_q15, ...q2026_electric_q16, ...q2026_heat_q08, ...q2026_heat_q09, ...q2026_heat_q11, ...q2026_heat_q12, ...q2026_heat_q13, ...q2026_heat_q14, ...q2026_heat_q17] as StagedEnergyKanriQuestion[];
