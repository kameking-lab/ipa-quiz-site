// @vitest-environment node
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "node:net";
import { randomUUID } from "node:crypto";
import { createHmac } from "node:crypto";
import { migrateLegacyFeedbackIdentity } from "@/lib/feedback/migrate-legacy-identity";
import { unlockIdentity } from "@/lib/feedback/unlock-runtime";
import { vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import { FeedbackUnlockStore, type UnlockIdentity } from "@/lib/feedback/unlock-store";
import type { SqlDatabase, SqlSession } from "@/lib/billing/postgres-store";

// Opt-in native PostgreSQL test. Never reads DATABASE_URL or any application config.
// F1_POSTGRES_BIN must contain initdb/pg_ctl. Every run creates a fresh local cluster.
const bin = process.env.F1_POSTGRES_BIN;
// Do not capture pipes inherited by the background postgres process on Windows.
const executeFile = (file: string, args: string[]) => new Promise<void>((resolve, reject) => {
  const child = spawn(file, args, { stdio: "ignore", windowsHide: true });
  child.once("error", reject);
  child.once("exit", code => code === 0 ? resolve() : reject(new Error(`PostgreSQL helper exited with code ${code}`)));
});
describe.skipIf(!bin)("feedback wallet on disposable PostgreSQL", () => {
  let client: PrismaClient;
  let db: SqlDatabase;
  let store: FeedbackUnlockStore;
  let directory: string;
  let started = false;
  const identity = (account: string | null, browser = account): UnlockIdentity => ({ realm: "local-f1", account, browser });
  const data = { choices: ["mobile"], requestedQualifications: [], commentMasked: "test" };
  const session = (c: Pick<PrismaClient, "$queryRawUnsafe">): SqlSession => ({ query: (sql, values) => c.$queryRawUnsafe(sql, ...values) });
  beforeAll(async () => {
    directory = mkdtempSync(join(tmpdir(), "f1-postgres-"));
    const port = await new Promise<number>((resolve, reject) => {
      const server = createServer(); server.on("error", reject);
      server.listen(0, "127.0.0.1", () => { const a = server.address(); const p = typeof a === "object" && a ? a.port : 0; server.close(() => resolve(p)); });
    });
    const executable = (name: string) => join(bin!, name + (process.platform === "win32" ? ".exe" : ""));
    await executeFile(executable("initdb"), ["-D", directory, "-U", "postgres", "-A", "trust", "--encoding=UTF8", "--locale=C"]);
    await executeFile(executable("pg_ctl"), ["-D", directory, "-l", join(directory, "server.log"), "-o", `-h 127.0.0.1 -p ${port} -F`, "-w", "start"]);
    started = true;
    client = new PrismaClient({ datasources: { db: { url: `postgresql://postgres@127.0.0.1:${port}/postgres?connection_limit=20` } } });
    await client.$connect();
    const migration = ["20261103000000_feedback_unlock", "20261103010000_feedback_unlock_user_id"].map(name => readFileSync(`prisma/migrations/${name}/migration.sql`, "utf8")).join("\n");
    for (const statement of migration.split(";").filter(s => s.trim())) await client.$executeRawUnsafe(statement);
    db = { ...session(client), transaction: fn => client.$transaction(tx => fn(session(tx)), { maxWait: 15000, timeout: 20000 }) };
    store = new FeedbackUnlockStore(db);
  }, 120000);
  afterAll(async () => {
    await client?.$disconnect();
    if (started) await executeFile(join(bin!, "pg_ctl" + (process.platform === "win32" ? ".exe" : "")), ["-D", directory, "-m", "fast", "-w", "stop"]);
    // Keep the isolated cluster and server log for diagnosis; no recursive deletion.
  }, 30000);
  beforeEach(async () => { await client.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS "User" (id text PRIMARY KEY)'); await client.$executeRawUnsafe('TRUNCATE "User"'); await client.$executeRawUnsafe("TRUNCATE feedback_unlock_grant, feedback_unlock, feedback_unlock_rate RESTART IDENTITY"); });
  async function legacy(browser: string) {
    const event = randomUUID();
    await db.query("INSERT INTO feedback_unlock(event_id,realm,browser_hash,anonymous_id,choices,requested_qualifications,comment_masked) VALUES($1,$2,$3,$4,$5::text[],$6::text[],$7) RETURNING event_id", [event, "local-f1", browser, randomUUID(), [], [], ""]);
    return event;
  }
  it("migrates, enforces concurrent submissions and prevents cookie/day/network reacquisition", async () => {
    const results = await Promise.allSettled(Array.from({ length: 8 }, (_, n) => store.submit({ ...identity("alice"), realm: `realm-${n}`, browser: null }, null, data)));
    expect(results.filter(r => r.status === "fulfilled")).toHaveLength(1);
    expect(await db.query("SELECT count(*)::int AS n FROM feedback_unlock", [])).toEqual([{ n: 1 }]);
    expect(await db.query("SELECT browser_hash, network_day_hash FROM feedback_unlock", [])).toEqual([{ browser_hash: null, network_day_hash: null }]);
    await expect(store.submit(identity("alice", "new-next-day"), "changed-network", data)).rejects.toMatchObject({ code: "already_submitted" });
    await expect(store.submit(identity(null, "new"), null, data)).rejects.toMatchObject({ code: "sign_in_required" });
    expect(await store.status(identity(null, "new"))).toMatchObject({ eligible: false, requiresLogin: true });
    // Shared network has no daily uniqueness limit for authenticated submissions.
    await store.submit(identity("bob"), null, data);
  });
  it("grants only ten of eleven simultaneous questions, with idempotent reopen across days", async () => {
    await store.submit(identity("alice"), null, data);
    const results = await Promise.all(Array.from({ length: 11 }, (_, n) => store.grant(identity("alice", `b${n}`), n < 5 ? "2026-11-03" : "2026-11-04", `q${n}`)));
    expect(results.filter(Boolean)).toHaveLength(10);
    const grants = await db.query<{ day: string; question_id: string }>("SELECT day,question_id FROM feedback_unlock_grant", []);
    expect(grants).toHaveLength(10);
    expect(await store.grant(identity("alice"), grants[0].day, grants[0].question_id)).toEqual({ newlyUsed: false, remaining: 0 });
    expect(await store.grant(identity("alice"), "2026-11-05", "new")).toBeNull();
  });
  it("allows only one account to claim a legacy anonymous wallet and blocks logout reuse", async () => {
    await legacy("shared");
    const results = await Promise.all([store.claim(identity("alice", "shared")), store.claim(identity("bob", "shared"))]);
    expect(results.filter(Boolean)).toHaveLength(1);
    expect(await store.grant(identity(null, "shared"), "day", "q")).toBeNull();
    const owner = await db.query<{ user_id: string }>("SELECT user_id FROM feedback_unlock", []);
    expect(await store.status(identity(owner[0].user_id, "fresh"))).toMatchObject({ remaining: 10 });
  });
  it("does not stack an account wallet with simultaneous claims from two anonymous browsers", async () => {
    await store.submit(identity("alice", "original"), null, data);
    await store.grant(identity("alice"), "day", "used");
    await legacy("b1"); await legacy("b2");
    const results = await Promise.all([store.claim(identity("alice", "b1")), store.claim(identity("alice", "b2"))]);
    expect(results).toEqual([{ remaining: 9, newlyUsed: false }, { remaining: 9, newlyUsed: false }]);
    expect(await db.query("SELECT count(*)::int AS n FROM feedback_unlock WHERE retired=true", [])).toEqual([{ n: 2 }]);
    expect(await store.claim(identity("bob", "b1"))).toBeNull();
    expect(await store.claim(identity(null, "b2"))).toBeNull();
  });
  it("rolls back both account binding and inserted grant on a mid-transaction failure", async () => {
    const event = await legacy("b");
    const failing = new FeedbackUnlockStore({ ...db, transaction: fn => db.transaction(sql => fn({ query: async <T,>(text: string, values: unknown[]) => {
      const result = await sql.query<T>(text, values);
      if (text.startsWith("INSERT INTO feedback_unlock_grant")) throw new Error("injected-after-insert");
      return result;
    } })) });
    await expect(failing.grant(identity("alice", "b"), "day", "q")).rejects.toThrow("injected-after-insert");
    expect(await db.query("SELECT user_id FROM feedback_unlock WHERE event_id=$1", [event])).toEqual([{ user_id: null }]);
    expect(await db.query("SELECT count(*)::int AS n FROM feedback_unlock_grant", [])).toEqual([{ n: 0 }]);
    expect(await store.grant(identity("alice", "b"), "day", "q")).toEqual({ remaining: 9, newlyUsed: true });
  });
  it("keeps the same balance across auth key/session/realm changes and enforces user uniqueness in SQL", async () => {
    const request = new Request("http://localhost");
    vi.stubEnv("AUTH_SECRET", "local-old-key");
    const first = unlockIdentity(request, "alice", "old-realm");
    await store.submit(first, null, data);
    await store.grant(first, "day", "used");
    vi.stubEnv("AUTH_SECRET", "local-new-key");
    const renewed = unlockIdentity(request, "alice", "new-realm");
    expect(await store.status(renewed)).toEqual({ submitted: true, eligible: false, remaining: 9 });
    await expect(store.submit(renewed, null, data)).rejects.toMatchObject({ code: "already_submitted" });
    await expect(db.query("INSERT INTO feedback_unlock(event_id,realm,user_id,anonymous_id,choices,requested_qualifications,comment_masked) VALUES($1,$2,$3,$4,$5::text[],$6::text[],$7) RETURNING event_id", [randomUUID(), "other", "alice", randomUUID(), [], [], ""])).rejects.toThrow();
    vi.unstubAllEnvs();
  });
  it("fails closed for old keyed receipts, then preserves their spent balance after backfill and rotation", async () => {
    const event = await legacy("old-browser");
    const hash = createHmac("sha256", "old-key").update("feedback-unlock:v1:account:alice").digest("hex");
    await db.query("UPDATE feedback_unlock SET account_hash=$2 WHERE event_id=$1 RETURNING event_id", [event, hash]);
    await db.query("INSERT INTO feedback_unlock_grant VALUES($1,$2,$3) RETURNING event_id", [event, "day", "q"]);
    await db.query('INSERT INTO "User"(id) VALUES($1) RETURNING id', ["alice"]);
    await expect(store.submit(identity("alice", "fresh"), null, data)).rejects.toMatchObject({ code: "feedback_identity_migration_required" });
    await expect(migrateLegacyFeedbackIdentity(db, ["wrong-key"])).rejects.toThrow("Unresolved");
    expect(await migrateLegacyFeedbackIdentity(db, ["old-key"])).toBe(1);
    expect(await store.status({ realm: "changed", account: "alice", browser: null })).toEqual({ submitted: true, eligible: false, remaining: 9 });
    await expect(store.submit(identity("alice", "fresh"), null, data)).rejects.toMatchObject({ code: "already_submitted" });
  });
  it("rolls back backfill if old keys or realms already issued duplicate account receipts", async () => {
    await db.query('INSERT INTO "User"(id) VALUES($1) RETURNING id', ["alice"]);
    for (const [n, key] of ["old-key", "another-key"].entries()) {
      const event = await legacy(`b${n}`);
      const hash = createHmac("sha256", key).update("feedback-unlock:v1:account:alice").digest("hex");
      await db.query("UPDATE feedback_unlock SET account_hash=$2 WHERE event_id=$1 RETURNING event_id", [event, hash]);
    }
    await expect(migrateLegacyFeedbackIdentity(db, ["old-key", "another-key"])).rejects.toThrow();
    expect(await db.query("SELECT count(*)::int AS n FROM feedback_unlock WHERE user_id IS NOT NULL", [])).toEqual([{ n: 0 }]);
    await expect(store.submit(identity("alice", "fresh"), null, data)).rejects.toMatchObject({ code: "feedback_identity_migration_required" });
  });

});
