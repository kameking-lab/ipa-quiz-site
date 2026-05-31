import { describe, it, expect } from "vitest";
import { buildOpenApiSpec } from "@/lib/api/openapi";

/**
 * Characterization tests for the public OpenAPI 3.1 spec builder served at
 * /api/v1/openapi. Pins the baseUrl interpolation, the documented endpoint
 * surface, and—most importantly—$ref / tag referential integrity, so a renamed
 * schema or tag that leaves a dangling reference (an invalid spec for every
 * consumer's codegen) is caught.
 */

const BASE = "https://example.test";

// Recursively collect every "#/components/schemas/X" reference in the spec.
function collectSchemaRefs(node: unknown, acc: Set<string>): void {
  if (Array.isArray(node)) {
    for (const item of node) collectSchemaRefs(item, acc);
    return;
  }
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (key === "$ref" && typeof value === "string") {
        const m = value.match(/^#\/components\/schemas\/(.+)$/);
        if (m) acc.add(m[1]);
      } else {
        collectSchemaRefs(value, acc);
      }
    }
  }
}

describe("api/openapi buildOpenApiSpec metadata", () => {
  it("declares OpenAPI 3.1.0 with the public API title", () => {
    const spec = buildOpenApiSpec(BASE);
    expect(spec.openapi).toBe("3.1.0");
    expect(spec.info.title).toContain("過去問AI");
  });

  it("interpolates baseUrl into the server URL and contact", () => {
    const spec = buildOpenApiSpec(BASE);
    expect(spec.servers[0].url).toBe(`${BASE}/api/v1`);
    expect(spec.info.contact.url).toBe(BASE);
  });

  it("allows both authenticated and anonymous access", () => {
    const spec = buildOpenApiSpec(BASE);
    // [{ bearerAuth: [] }, {}] => bearer OR no auth.
    expect(spec.security).toContainEqual({ bearerAuth: [] });
    expect(spec.security).toContainEqual({});
    expect(spec.components.securitySchemes.bearerAuth.scheme).toBe("bearer");
  });
});

describe("api/openapi buildOpenApiSpec endpoints", () => {
  it("documents the exams, questions, and grade endpoints", () => {
    const spec = buildOpenApiSpec(BASE);
    const paths = spec.paths as Record<string, Record<string, unknown>>;
    expect(paths["/exams"]).toHaveProperty("get");
    expect(paths["/questions"]).toHaveProperty("get");
    expect(paths["/grade"]).toHaveProperty("post");
  });

  it("offers the 13 IPA exam codes in the questions exam enum", () => {
    const spec = buildOpenApiSpec(BASE);
    const params = (
      spec.paths["/questions"].get as {
        parameters: Array<{ name: string; schema: { enum?: string[] } }>;
      }
    ).parameters;
    const examParam = params.find((p) => p.name === "exam");
    expect(examParam?.schema.enum).toEqual([
      "ip",
      "sg",
      "fe",
      "ap",
      "st",
      "sa",
      "pm",
      "nw",
      "db",
      "es",
      "sc",
      "sm",
      "au",
    ]);
  });
});

describe("api/openapi buildOpenApiSpec referential integrity", () => {
  it("resolves every schema $ref to a defined component schema", () => {
    const spec = buildOpenApiSpec(BASE);
    const refs = new Set<string>();
    collectSchemaRefs(spec.paths, refs);
    collectSchemaRefs(spec.components.schemas, refs);
    const defined = new Set(Object.keys(spec.components.schemas));
    const dangling = [...refs].filter((r) => !defined.has(r));
    expect(dangling).toEqual([]);
    // sanity: the spec actually uses refs (guards against a vacuous pass).
    expect(refs.size).toBeGreaterThan(0);
  });

  it("references only tags that are declared at the top level", () => {
    const spec = buildOpenApiSpec(BASE);
    const declared = new Set(
      (spec.tags as Array<{ name: string }>).map((t) => t.name),
    );
    const usedTags = new Set<string>();
    for (const pathItem of Object.values(
      spec.paths as Record<string, Record<string, { tags?: string[] }>>,
    )) {
      for (const op of Object.values(pathItem)) {
        for (const t of op.tags ?? []) usedTags.add(t);
      }
    }
    const undeclared = [...usedTags].filter((t) => !declared.has(t));
    expect(undeclared).toEqual([]);
    expect(usedTags.size).toBeGreaterThan(0);
  });
});
