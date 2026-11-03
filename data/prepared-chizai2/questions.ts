import "server-only";
import questions from "./questions.json";
import type { PreparedChizai2Question } from "./types";

// Fixed reviewed JSON; kept outside every public pool. The private integration
// verifier checks the JSON literal against the authentic Prepared/Question types.
// The assertion only bridges TypeScript JSON imports' widened string values.
export const PREPARED_CHIZAI2_QUESTIONS = questions as PreparedChizai2Question[];
