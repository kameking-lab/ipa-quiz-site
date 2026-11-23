import { expect, it } from "vitest";
import { cardSharePath } from "@/lib/sharing/card";
import { studyCardDetails, studyCardMetadata } from "@/lib/sharing/card-metadata";

it("advertises a dedicated card URL with the custom OG image", () => {
  const card = { kind: "goal", mastered: 1, total: 3, streak: 0 } as const;
  const query = { card: "goal", mastered: "1", total: "3", streak: "0", utm_source: "share", utm_medium: "card" };
  expect(cardSharePath("ip", card)).toBe("/share/study/ip?card=goal&mastered=1&total=3&streak=0");
  expect(studyCardMetadata("ip", studyCardDetails("ip", query)!).openGraph).toMatchObject({
    url: new URL("https://www.kakomon-ai.jp/share/study/ip?card=goal&mastered=1&total=3&streak=0&utm_source=share&utm_medium=card"),
    images: [{ url: expect.stringContaining("/api/og?card=goal&mastered=1&total=3&streak=0&type=study-card&exam=ip") }],
  });
});

it("rejects unknown qualifications and ambiguous card parameters", () => {
  const query = { card: "goal", mastered: "1", total: "3", streak: "0" };
  expect(studyCardDetails("not-an-exam", query)).toBeNull();
  expect(studyCardDetails("ip", { ...query, total: ["3", "5"] })).toBeNull();
});
