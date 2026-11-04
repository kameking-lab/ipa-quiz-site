import "server-only";
import type { PreparedChizai2Question } from "./types";

export type { PreparedChizai2Question } from "./types";

/** Unregistered private reader; only an existing development runtime may load. */
export async function getPreparedChizai2Questions(): Promise<PreparedChizai2Question[]> {
  if (process.env.NODE_ENV !== "development") return [];
  const { PREPARED_CHIZAI2_QUESTIONS } = await import("./questions");
  return structuredClone(PREPARED_CHIZAI2_QUESTIONS);
}
