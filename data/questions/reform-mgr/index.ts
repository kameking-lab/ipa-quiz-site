import { convertLq9 } from "../lq9-staging";
import y2026 from "./2026.json";
import y2025 from "./2025.json";

/** Unpublished candidates. No public registry or loader imports this module. */
export const REFORM_MGR_QUESTIONS = [
  ...convertLq9(y2026, "reform-mgr"),
  ...convertLq9(y2025, "reform-mgr"),
];
