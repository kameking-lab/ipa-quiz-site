/** Client-safe response shape for the continuous-practice start endpoint. */
export interface PracticeAccess {
  kind: "free" | "sample" | "trial" | "pass" | "guest" | "unavailable";
  remaining: number | null;
  freeDaily: number;
  resetAt: string;
  retryAfter: number | null;
}
