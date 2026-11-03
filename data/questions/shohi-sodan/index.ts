import { convertLq9 } from "../lq9-staging";
import y2025 from "./2025.json";
import y2024 from "./2024.json";

/** Unpublished candidates. No public registry or loader imports this module. */
export const SHOHI_SODAN_QUESTIONS = [
  ...convertLq9(y2025, "shohi-sodan"),
  ...convertLq9(y2024, "shohi-sodan"),
];
