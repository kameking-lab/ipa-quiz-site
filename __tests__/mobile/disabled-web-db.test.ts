import { afterEach, expect, it, vi } from "vitest";
const sql = vi.hoisted(() => vi.fn(() => { throw new Error("mobile tables do not exist"); }));
vi.mock("@/lib/db/prisma", () => ({ prisma: { $queryRawUnsafe: sql, $executeRawUnsafe: sql, $transaction: sql } }));
import { revenueCatAccess } from "@/mobile/server/revenuecat";
import { GET as question } from "@/app/api/questions/next/route";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });
it("serves existing and batch2 Web questions with mobile configuration and new tables absent", async () => {
  vi.stubEnv("MOBILE_IAP_ENABLED", undefined);
  expect(await revenueCatAccess("synthetic-web-user")).toBeNull();
  for (const exam of ["ap", "kenchikushi1", "khk-kagaku", "sekou-1kenchiku"] as const) {
    const q = QUESTIONS_BY_EXAM[exam]![0];
    const response = await question(new Request(`http://localhost/api/questions/next?id=${q.id}`));
    expect(response.status).toBe(200);
    expect((await response.json()).id).toBe(q.id);
  }
  expect(sql).not.toHaveBeenCalled();
});
