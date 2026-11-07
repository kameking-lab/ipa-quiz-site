import { describe, expect, it } from "vitest";
import { jstResetLabel, nextJstMidnight } from "@/lib/billing/reset-time";
import { resetAt } from "@/lib/billing/guest-practice";

const jst = (iso: string) => Date.parse(iso);
describe("free quota reset time", () => {
  it("is always the next 00:00 JST, from any moment of the JST day", () => {
    for (const t of ["2026-11-07T00:00:00+09:00", "2026-11-07T00:00:01+09:00", "2026-11-07T15:45:00+09:00", "2026-11-07T23:59:59+09:00"]) {
      expect(nextJstMidnight(jst(t)).toISOString()).toBe("2026-11-07T15:00:00.000Z");
    }
  });
  it("matches the server's resetAt that the quota API returns", () => {
    for (const t of ["2026-11-07T00:00:00+09:00", "2026-11-07T09:30:00+09:00", "2026-12-31T23:59:59+09:00"]) {
      expect(resetAt(jst(t))).toBe(nextJstMidnight(jst(t)).toISOString());
    }
  });
  it("labels the server value as 0:00 and never shows another time of day", () => {
    expect(jstResetLabel("2026-11-07T15:00:00.000Z")).toBe("11/8 0:00（日本時間）");
    // A non-midnight value (e.g. a proxy or mock) snaps to the following midnight.
    expect(jstResetLabel("2026-11-07T06:45:00.000Z")).toBe("11/8 0:00（日本時間）");
    expect(jstResetLabel(null, jst("2026-11-07T15:45:00+09:00"))).toBe("11/8 0:00（日本時間）");
    expect(jstResetLabel("not-a-date", jst("2026-11-07T23:59:00+09:00"))).toBe("11/8 0:00（日本時間）");
  });
});
