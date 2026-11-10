import assert from "node:assert/strict";
import { test } from "node:test";
import { nextBuildNumber } from "./next-build-number.mjs";

test("an uploaded build is followed by a distinct larger number", () => {
  assert.equal(nextBuildNumber("13"), 14);
  assert.equal(nextBuildNumber("37\n"), 38);
  assert.equal(nextBuildNumber("00018"), 19);
});

test("an empty, stale, malformed or overflowing ASC response stops the build", () => {
  for (const value of [undefined, "", "\n", "0", "12", "-1", "13.0", "13 extra", "NaN", "9007199254740991"]) {
    assert.throws(() => nextBuildNumber(value));
  }
});
