import { describe, expect, it } from "vitest";
import { emptyPetCloudState, localPetCloudEnvelope, petCloudStateFor } from "@/lib/pet/v1/cloud-merge";
import { getPetCloudProfile, isSameOriginRequest, PetCloudLimiter, putPetCloudProfile } from "@/lib/pet/server/cloud-profile";
import { answer, memoryRepository, ORIGIN, sameOriginInit, serverDeps, studied, T0 } from "../pet/cloud-fixtures";

const url = `${ORIGIN}/api/pet/profile`;
const device = "device-aaaaaaaa";
const copy = (owner = "user:alice", questions = ["q1", "q2"]) => localPetCloudEnvelope(studied(owner, "ap", questions), emptyPetCloudState(), device, T0);
const put = (body: unknown, init: RequestInit = {}) => new Request(url, sameOriginInit({ method: "PUT", body: JSON.stringify(body), ...init }));
const get = (query = "", init: RequestInit = sameOriginInit()) => new Request(url + query, init);

describe("/api/pet/profile", () => {
  it("requires sign-in for reads and writes", async () => {
    const deps = serverDeps(memoryRepository(), () => null);
    expect((await getPetCloudProfile(get(), deps)).status).toBe(401);
    expect((await putPetCloudProfile(put({ expectedVersion: 0, envelope: copy() }), deps)).status).toBe(401);
  });
  it("answers 503 without a database, keeping the device copy local", async () => {
    expect((await getPetCloudProfile(get(), serverDeps(null, () => "alice"))).status).toBe(503);
  });
  it("refuses cross-site requests", async () => {
    const deps = serverDeps(memoryRepository(), () => "alice");
    const cross = { headers: { origin: "https://evil.example", "sec-fetch-site": "cross-site" } };
    expect((await putPetCloudProfile(new Request(url, { method: "PUT", body: "{}", ...cross }), deps)).status).toBe(403);
    expect((await getPetCloudProfile(get("", cross), deps)).status).toBe(403);
    // A write without Origin/Sec-Fetch-Site (non-browser forgery) is refused too.
    expect((await putPetCloudProfile(new Request(url, { method: "PUT", body: "{}" }), deps)).status).toBe(403);
    expect(isSameOriginRequest(new Request(url, { headers: { "sec-fetch-site": "same-origin" } }), false)).toBe(true);
  });
  it("creates, reads back, and then answers 'unchanged' for the known version", async () => {
    const repo = memoryRepository(), deps = serverDeps(repo, () => "alice");
    expect(await (await getPetCloudProfile(get(), deps)).json()).toEqual({ version: 0, envelope: null });
    const created = await putPetCloudProfile(put({ expectedVersion: 0, envelope: copy() }), deps);
    expect(created.status).toBe(200);
    expect(await created.json()).toEqual({ version: 1 });
    const read = await (await getPetCloudProfile(get(), deps)).json();
    expect(read.version).toBe(1);
    expect(read.envelope.document.profiles[0]).toMatchObject({ qualificationId: "ap", growth: 6 });
    expect(await (await getPetCloudProfile(get("?known=1"), deps)).json()).toEqual({ version: 1, unchanged: true });
  });
  it("is compare-and-set: a stale write gets 409 with the newer copy", async () => {
    const repo = memoryRepository(), deps = serverDeps(repo, () => "alice");
    await putPetCloudProfile(put({ expectedVersion: 0, envelope: copy() }), deps);
    const conflict = await putPetCloudProfile(put({ expectedVersion: 0, envelope: copy() }), deps);
    expect(conflict.status).toBe(409);
    const body = await conflict.json();
    expect(body.version).toBe(1);
    expect(body.envelope.document.ownerScope).toBe("user:alice");
    expect(repo.writes).toBe(1);
  });
  it("only ever reads and writes the signed-in account's row", async () => {
    const repo = memoryRepository();
    let user = "alice";
    const deps = serverDeps(repo, () => user);
    await putPetCloudProfile(put({ expectedVersion: 0, envelope: copy() }), deps);
    user = "bob";
    // Bob sees nothing of Alice's, and cannot write a copy that names Alice.
    expect(await (await getPetCloudProfile(get(), deps)).json()).toEqual({ version: 0, envelope: null });
    const forged = await putPetCloudProfile(put({ expectedVersion: 0, envelope: copy("user:alice") }), deps);
    expect(forged.status).toBe(422);
    expect((await forged.json()).reason).toBe("owner_mismatch");
    expect([...repo.rows.keys()]).toEqual(["alice"]);
  });
  it("refuses implausible and rolled-back copies with 422", async () => {
    const repo = memoryRepository(), deps = serverDeps(repo, () => "alice");
    const start = studied("user:alice", "ap", ["q1", "q2", "q3"]);
    const first = localPetCloudEnvelope(start, emptyPetCloudState(), device, T0);
    await putPetCloudProfile(put({ expectedVersion: 0, envelope: first }), deps);
    const rolled = await putPetCloudProfile(put({ expectedVersion: 1, envelope: copy() }), deps);
    expect(rolled.status).toBe(422);
    const grown = localPetCloudEnvelope(answer(start, "ap", "q4", T0 + 5000), petCloudStateFor(first, 1), device, T0);
    expect((await putPetCloudProfile(put({ expectedVersion: 1, envelope: grown }), deps)).status).toBe(200);
  });
  it("bounds the body and the request rate", async () => {
    const deps = serverDeps(memoryRepository(), () => "alice");
    const huge = put({ expectedVersion: 0, envelope: "x".repeat(3 * 1024 * 1024) });
    expect((await putPetCloudProfile(huge, deps)).status).toBe(413);
    expect((await putPetCloudProfile(new Request(url, sameOriginInit({ method: "PUT", body: "not json" })), deps)).status).toBe(400);
    const limited = { ...serverDeps(memoryRepository(), () => "alice"), limiter: new PetCloudLimiter({ read: 2, write: 1, windowMs: 60_000 }) };
    expect((await getPetCloudProfile(get(), limited)).status).toBe(200);
    expect((await getPetCloudProfile(get(), limited)).status).toBe(200);
    const third = await getPetCloudProfile(get(), limited);
    expect(third.status).toBe(429);
    expect(third.headers.get("Retry-After")).toBe("60");
    expect((await putPetCloudProfile(put({ expectedVersion: 0, envelope: copy() }), limited)).status).toBe(200);
    expect((await putPetCloudProfile(put({ expectedVersion: 1, envelope: copy() }), limited)).status).toBe(429);
  });
  it("never caches responses", async () => {
    const response = await getPetCloudProfile(get(), serverDeps(memoryRepository(), () => "alice"));
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
  });
});
