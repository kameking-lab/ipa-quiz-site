import { KYOIN_GUNMA_2022 } from "./2022";
import { KYOIN_GUNMA_2023 } from "./2023";
import { KYOIN_GUNMA_2024 } from "./2024";
import { KYOIN_GUNMA_2025 } from "./2025";
import { KYOIN_GUNMA_2025_SENMON_EIGO } from "./2025-senmon-eigo";
import { KYOIN_GUNMA_2025_SENMON_KO_EIGO } from "./2025-senmon-ko-eigo";

export const KYOIN_GUNMA_QUESTIONS = [
  ...KYOIN_GUNMA_2025,
  ...KYOIN_GUNMA_2025_SENMON_EIGO,
  ...KYOIN_GUNMA_2025_SENMON_KO_EIGO,
  ...KYOIN_GUNMA_2024,
  ...KYOIN_GUNMA_2023,
  ...KYOIN_GUNMA_2022,
];
