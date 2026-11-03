import { describe, expect, it } from "vitest";

import {
  encodeExplicitPoolIds,
  MAX_EXPLICIT_POOL_IDS,
  MAX_EXPLICIT_POOL_PARAM_LENGTH,
  parseExplicitPoolIds,
  selectExplicitPoolIds,
} from "@/lib/questions/explicit-pool";

describe("explicit question pool URL codec", () => {
  it("round-trips valid cross-exam IDs in result order", () => {
    const encoded = encodeExplicitPoolIds([
      "ap-2024s-am-q1",
      "ip-2023-cbt-q2",
      "ap-2024s-am-q1",
    ]);
    expect(parseExplicitPoolIds(encoded)).toEqual([
      "ap-2024s-am-q1",
      "ip-2023-cbt-q2",
    ]);
  });

  it("caps count and encoded URL length", () => {
    const ids = Array.from({ length: 100 }, (_, i) => `ap-2024s-am-q${i}`);
    const encoded = encodeExplicitPoolIds(ids);
    expect(encoded.split(",").length).toBe(MAX_EXPLICIT_POOL_IDS);
    expect(encodeURIComponent(encoded).length).toBeLessThanOrEqual(
      MAX_EXPLICIT_POOL_PARAM_LENGTH,
    );
  });

  it.each([
    "ap-ok,,ip-ok",
    "ap-ok,AP-UPPER",
    "ap-ok,../private",
    "ap-ok,ap-ok",
  ])("rejects the entire tampered payload %s", (raw) => {
    expect(parseExplicitPoolIds(raw)).toBeNull();
  });

  it("rejects duplicate query-key arrays and other non-string runtime shapes", () => {
    expect(parseExplicitPoolIds(["ap-2024s-am-q1", "ip-2023-cbt-q2"])).toBeNull();
    expect(
      selectExplicitPoolIds(["ap-2024s-am-q1", "ip-2023-cbt-q2"], [
        "ap-2024s-am-q1",
        "ip-2023-cbt-q2",
      ]),
    ).toEqual([]);
    expect(parseExplicitPoolIds(undefined)).toBeNull();
  });

  it("keeps an empty search result as an explicit empty pool", () => {
    expect(parseExplicitPoolIds("")).toEqual([]);
  });

  it("drops arbitrary and stale IDs against the canonical available set", () => {
    expect(
      selectExplicitPoolIds(
        "ap-2024s-am-q1,unknown-2099-q999,ip-2023-cbt-q2",
        ["ip-2023-cbt-q2", "ap-2024s-am-q1"],
      ),
    ).toEqual(["ap-2024s-am-q1", "ip-2023-cbt-q2"]);
    expect(selectExplicitPoolIds("../invalid", ["ap-2024s-am-q1"])).toEqual([]);
  });
});
