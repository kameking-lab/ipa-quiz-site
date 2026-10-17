import { describe, expect, it } from "vitest";
import { FREE_AI_DAILY_LIMIT, POST_FEEDBACK_AI_DAILY_LIMIT } from "@/lib/constants/ai-quota";
import { FREE_INITIAL_LIMIT, FREE_DAILY_LIMIT, POST_FEEDBACK_DAILY_LIMIT } from "@/lib/rate-limit/server";

// The legacy daily limit still protects non-AI endpoints using the default server path.
describe("default daily rate-limit constants", () => {
  it("keeps the default and feedback limits in sync", () => {
    expect(FREE_INITIAL_LIMIT).toBe(FREE_AI_DAILY_LIMIT);
    expect(FREE_DAILY_LIMIT).toBe(FREE_AI_DAILY_LIMIT);
    expect(POST_FEEDBACK_DAILY_LIMIT).toBe(POST_FEEDBACK_AI_DAILY_LIMIT);
  });
});
