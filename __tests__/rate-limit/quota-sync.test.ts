import { describe, expect, it } from "vitest";

import { FREE_AI_DAILY_LIMIT, POST_FEEDBACK_AI_DAILY_LIMIT } from "@/lib/constants/ai-quota";
import { FREE_DAILY_LIMIT_CLIENT, POST_FEEDBACK_DAILY_LIMIT_CLIENT } from "@/lib/storage/rate-limit-client";
import {
  FREE_INITIAL_LIMIT,
  FREE_DAILY_LIMIT,
  POST_FEEDBACK_DAILY_LIMIT,
} from "@/lib/rate-limit/server";

// A-2: the AI daily quota shown to users (client) must equal what the server
// enforces. Both now derive from lib/constants/ai-quota.ts with no env override,
// so they cannot drift.
describe("AI quota: server enforcement == client display", () => {
  it("free daily limit matches across constant / server / client", () => {
    expect(FREE_INITIAL_LIMIT).toBe(FREE_AI_DAILY_LIMIT);
    expect(FREE_DAILY_LIMIT).toBe(FREE_AI_DAILY_LIMIT);
    expect(FREE_DAILY_LIMIT_CLIENT).toBe(FREE_AI_DAILY_LIMIT);
  });

  it("post-feedback limit matches across constant / server / client", () => {
    expect(POST_FEEDBACK_DAILY_LIMIT).toBe(POST_FEEDBACK_AI_DAILY_LIMIT);
    expect(POST_FEEDBACK_DAILY_LIMIT_CLIENT).toBe(POST_FEEDBACK_AI_DAILY_LIMIT);
  });
});
