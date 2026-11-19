import { convertLq9 } from "../lq9-staging";
import y2026 from "./2026.json";
import y2025 from "./2025.json";
import y2024 from "./2024.json";
import y2023 from "./2023.json";
import y2022 from "./2022.json";

export const REFORM_MGR_QUESTIONS = [
  ...convertLq9(y2026, "reform-mgr"),
  ...convertLq9(y2025, "reform-mgr"),
  ...convertLq9(y2024, "reform-mgr"),
  ...convertLq9(y2023, "reform-mgr"),
  ...convertLq9(y2022, "reform-mgr"),
];
