import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const db = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $queryRaw: db.query } }));
import { GET as live } from "@/app/api/health/route";
import { GET as ready } from "@/app/api/health/ready/route";
const request = (authorized = false) => new Request("http://localhost/api/health/ready", {
  headers: authorized ? { authorization: "Bearer public-readiness-fixture" } : {},
});
beforeEach(() => {
  db.query.mockReset(); vi.stubEnv("DATABASE_URL", "public-fixture-never-connected"); vi.stubEnv("CRON_SECRET", "public-readiness-fixture");
  vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); });
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("public liveness versus authenticated DB readiness (offline)", () => {
  it("repeated anonymous liveness never queries DB, including a DB outage", async () => {
    db.query.mockRejectedValue(new Error("must never be called"));
    for (let n = 0; n < 3; n++) {
      const response = await live(); expect(response.status).toBe(200);
      expect(await response.json()).toMatchObject({ ok: true, kind: "liveness", checks: { database: { checked: false } } });
    }
    expect(db.query).not.toHaveBeenCalled();
  });
  it("missing readiness credential stays closed without importing/querying DB", async () => {
    vi.stubEnv("CRON_SECRET", ""); expect((await ready(request(true))).status).toBe(503); expect(db.query).not.toHaveBeenCalled();
  });
  it("anonymous readiness cannot wake DB", async () => {
    expect((await ready(request())).status).toBe(401); expect(db.query).not.toHaveBeenCalled();
  });
  it("authorized readiness reports missing DB configuration without a query", async () => {
    vi.stubEnv("DATABASE_URL", ""); expect((await ready(request(true))).status).toBe(503); expect(db.query).not.toHaveBeenCalled();
  });
  it("authorized readiness executes one SELECT only", async () => {
    db.query.mockResolvedValue([{ one: 1 }]); const response = await ready(request(true));
    expect(response.status).toBe(200); expect(db.query).toHaveBeenCalledTimes(1);
    expect(Array.from(db.query.mock.calls[0][0]).join("")).toBe("SELECT 1");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });
  it("DB exceptions become a fixed unavailable response without any raw diagnostic", async () => {
    db.query.mockRejectedValue(new Error("postgresql://public-canary-not-a-secret/raw-stack"));
    const response = await ready(request(true)); expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, kind: "readiness", error: "database_unavailable" });
  });
});
