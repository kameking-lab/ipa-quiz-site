import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

/**
 * Admin Basic-Auth middleware — branch coverage that distinguishes the two
 * non-success outcomes the empirical review confused (phase 14 / 致命傷②):
 *
 *   401  → admin auth IS configured; the request just lacks/has-wrong creds.
 *   503  → admin auth is NOT configured (ADMIN_BASIC_USER/PASS unset or blank).
 *
 * The pre-existing E2E accepted [401, 503] interchangeably, so it could not
 * tell "auth working" from "auth broken". These deterministic unit tests pin
 * the branch boundary so a regression to 503 (env dropped) fails loudly.
 */

const REAL_USER = "admin";
const REAL_PASS = "s3cret-パス"; // includes non-ASCII to exercise UTF-8 decode

function req(headers: Record<string, string> = {}): NextRequest {
  return new NextRequest("https://www.kakomon-ai.jp/admin", { headers });
}

function basic(user: string, pass: string): string {
  return "Basic " + Buffer.from(`${user}:${pass}`, "utf-8").toString("base64");
}

const ORIG_USER = process.env.ADMIN_BASIC_USER;
const ORIG_PASS = process.env.ADMIN_BASIC_PASS;

afterEach(() => {
  if (ORIG_USER === undefined) delete process.env.ADMIN_BASIC_USER;
  else process.env.ADMIN_BASIC_USER = ORIG_USER;
  if (ORIG_PASS === undefined) delete process.env.ADMIN_BASIC_PASS;
  else process.env.ADMIN_BASIC_PASS = ORIG_PASS;
});

describe("admin middleware — unconfigured (fail-closed → 503)", () => {
  it("returns 503 when both env vars are unset", () => {
    delete process.env.ADMIN_BASIC_USER;
    delete process.env.ADMIN_BASIC_PASS;
    const res = middleware(req());
    expect(res.status).toBe(503);
  });

  it("returns 503 when only the password is set", () => {
    delete process.env.ADMIN_BASIC_USER;
    process.env.ADMIN_BASIC_PASS = REAL_PASS;
    expect(middleware(req()).status).toBe(503);
  });

  it("returns 503 when an env var is blank/whitespace-only (Case B)", () => {
    process.env.ADMIN_BASIC_USER = REAL_USER;
    process.env.ADMIN_BASIC_PASS = "   "; // trims to empty → treated as unset
    expect(middleware(req()).status).toBe(503);
  });
});

describe("admin middleware — configured", () => {
  beforeEach(() => {
    process.env.ADMIN_BASIC_USER = REAL_USER;
    process.env.ADMIN_BASIC_PASS = REAL_PASS;
  });

  it("returns 401 (NOT 503) with a Basic challenge when no credentials are sent", () => {
    const res = middleware(req());
    expect(res.status).toBe(401);
    expect(res.headers.get("www-authenticate")).toBe('Basic realm="Kakomon AI Admin"');
  });

  it("returns 401 for a non-Basic Authorization scheme", () => {
    expect(middleware(req({ authorization: "Bearer abc" })).status).toBe(401);
  });

  it("returns 401 for malformed base64 credentials", () => {
    expect(middleware(req({ authorization: "Basic @@not-base64@@" })).status).toBe(401);
  });

  it("returns 401 for wrong credentials", () => {
    expect(middleware(req({ authorization: basic("admin", "wrong") })).status).toBe(401);
  });

  it("passes through (NextResponse.next) for correct credentials", () => {
    const res = middleware(req({ authorization: basic(REAL_USER, REAL_PASS) }));
    // NextResponse.next() is a 200-status pass-through carrying the
    // x-middleware-next marker; crucially it is neither 401 nor 503.
    expect(res.status).toBe(200);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it("tolerates a trailing newline on the env value (Vercel paste artifact)", () => {
    process.env.ADMIN_BASIC_USER = `${REAL_USER}\n`;
    process.env.ADMIN_BASIC_PASS = `${REAL_PASS}\n`;
    const res = middleware(req({ authorization: basic(REAL_USER, REAL_PASS) }));
    expect(res.status).toBe(200);
  });
});
