import type { Question } from "@/lib/questions/types";
import common2025 from "./2025-common-q03.json";
import common2026 from "./2026-common-q03.json";
import heat2026 from "./2026-heat-q08.json";
import electric2026 from "./2026-electric-q06.json";

/** 公開前データ。資格コード・利用区分の本登録と全課目の完成までは演習レジストリへ接続しない。 */
export type StagedEnergyKanriQuestion = Omit<Question, "exam" | "license"> & {
  exam: "energy-kanri";
  license: "ECCJ-owner-approved";
};

/** 4原問・65解答単位。熱・電気共通課目は一度だけ保持する。 */
export const ENERGY_KANRI_STAGED_QUESTIONS: readonly StagedEnergyKanriQuestion[] =
  [...common2026, ...heat2026, ...electric2026, ...common2025] as StagedEnergyKanriQuestion[];
