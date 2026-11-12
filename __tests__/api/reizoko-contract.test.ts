// @vitest-environment node
import { describe, expect, it } from "vitest";
import { z } from "zod";
import openapi from "../fixtures/reizoko-openapi.json";
import { inputSchemas, isAction } from "@/lib/reizoko/schema";

// Snapshot of research/reizoko-api/cloudrun-openapi.json, reviewed 2026-11-13.
// Keep the external contract independent of our Zod implementation.
interface Schema { required?: string[]; properties: Record<string, Record<string, unknown>> }
const schemas: Record<string, Schema> = openapi.components.schemas;
const actions = Object.entries(openapi.paths).flatMap(([path, methods]) => {
  if (!("post" in methods)) return [];
  const name = methods.post.requestBody.content["application/json"].schema.$ref.split("/").at(-1)!;
  return [{ action: path.slice(1), contract: schemas[name] }];
});

it("implements every AI POST in the external OpenAPI (the eighth path is GET /)", () => {
  expect(actions.map(({ action }) => action).sort()).toEqual(Object.keys(inputSchemas).sort());
  expect(openapi.paths["/"]).toHaveProperty("get");
  expect(actions).toHaveLength(7);
});

describe.each(actions)("OpenAPI $action", ({ action, contract }) => {
  it("preserves every documented field's type, required status and default", () => {
    if (!isAction(action)) throw new Error(action);
    const schema = inputSchemas[action];
    const json = z.toJSONSchema(schema, { io: "input" });
    const properties = json.properties!;
    const required = new Set(json.required);
    for (const [key, property] of Object.entries(contract.properties)) {
      expect(properties[key], key).toMatchObject({ type: property.type });
      if (property.items) expect(properties[key], key).toMatchObject({ items: property.items });
      expect(required.has(key), key).toBe(contract.required?.includes(key) ?? false);
      if ("default" in property) expect(properties[key], key).toMatchObject({ default: property.default });
    }
  });
});
