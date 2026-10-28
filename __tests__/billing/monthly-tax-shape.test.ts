// @vitest-environment node
import { describe, expect, it } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";

const absent = Symbol("absent");
const cases: [string, unknown, boolean, string | null][] = [
  ["absent", absent, false, "invalid_type"],
  ["explicit undefined (omitted by JSON transport)", undefined, false, "invalid_type"],
  ["null", null, true, null],
  ["empty array", [], true, null],
  ["expanded zero-rate entry", [{ id: "txr_fixture", percentage: 0 }], false, "too_big"],
  ["expanded positive-rate entry", [{ id: "txr_fixture", percentage: 10 }], false, "too_big"],
  ["ID entry", ["txr_fixture"], false, "too_big"],
  ["single object", { id: "txr_fixture", percentage: 0 }, false, "invalid_type"],
  ["list envelope", { object: "list", data: [], has_more: false }, false, "invalid_type"],
  ["string", "fixture", false, "invalid_type"],
  ["boolean", false, false, "invalid_type"],
  ["number", 0, false, "invalid_type"],
];

describe("default tax-rate shape: shape regression with unknown subscription defaults", () => {
  for (const target of ["subscription", "invoice"] as const) {
    it.each(cases)(`${target}: %s preserves documented empty-tax policy`, async (_name, value, nullableAllowed, code) => {
      const fixture = await monthlyStripeFixture();
      const object = (target === "subscription" ? fixture.sub : fixture.invoice) as Record<string, unknown>;
      if (value === absent) delete object.default_tax_rates;
      else object.default_tax_rates = value;
      const before = JSON.stringify([...fixture.store.accounts]);
      const allowed = target === "subscription" && (value === absent || value === undefined) ? true : value === null ? target === "subscription" : nullableAllowed;
      if (allowed) {
        await fixture.service.receive(fixture.event(), "shape-fixture", fixture.provider);
        expect((await fixture.service.status("alice")).entitled).toBe(true);
      } else {
        const error = await fixture.service.receive(fixture.event(), "shape-fixture", fixture.provider).then(() => null, error => error);
        expect(error).not.toBeNull();
        expect(error.issues).toEqual(expect.arrayContaining([
          expect.objectContaining({ path: ["default_tax_rates"], code: value === null ? "invalid_type" : code }),
        ]));
        expect(JSON.stringify([...fixture.store.accounts])).toBe(before);
      }
    });
  }
});
