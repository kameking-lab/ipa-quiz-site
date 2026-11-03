import { describe, expect, it } from "vitest";
import { Repository } from "../src/state";
import { repository } from "./helpers";

describe("durable device snapshots", () => {
  it("restores answers, review and resume position after process restart", async () => {
    const { repo, storage } = await repository();
    await repo.update(s => {
      s.history.push({ questionId: "ip-1", selected: "ア", correct: false, answeredAt: new Date().toISOString(), uncertain: true });
      s.resume = { exam: "ip", questionId: "ip-1", reviewOnly: false, selected: "ア" };
      return s;
    });
    const restarted = new Repository(storage);
    expect((await restarted.load()).state).toEqual(repo.state);
  });
  it.each(["failWrite", "failCommit"] as const)("keeps committed data after %s", async failure => {
    const { repo, storage } = await repository();
    await repo.update(s => { s.reminder = "19:30"; return s; });
    storage[failure] = true;
    await expect(repo.update(s => { s.reminder = "22:00"; return s; })).rejects.toThrow();
    expect(repo.state.reminder).toBe("19:30");
    const restarted = new Repository(storage);
    expect((await restarted.load()).state.reminder).toBe("19:30");
  });
  it("serializes simultaneous operations and continues after a rejected operation", async () => {
    const { repo } = await repository();
    await expect(repo.update(() => { throw new Error("Invalid operation"); })).rejects.toThrow();
    await Promise.all(Array.from({ length: 10 }, () => repo.update(s => { s.aiQuota.used++; return s; })));
    expect(repo.state.aiQuota.used).toBe(10);
  });
  it("recovers the previous valid snapshot and signals recovery", async () => {
    const { repo, storage } = await repository();
    await repo.update(s => { s.reminder = "19:30"; return s; });
    await repo.update(s => { s.reminder = "22:00"; return s; });
    storage.files.set(Number(storage.current), "interrupted JSON");
    const restored = await new Repository(storage).load();
    expect(restored.recovered).toBe(true);
    expect(restored.state.reminder).toBe("19:30");
  });
  it("does not silently initialize over corrupt user data", async () => {
    const { repo, storage } = await repository();
    await repo.update(s => s);
    storage.files.set(Number(storage.current), "corrupt");
    await expect(new Repository(storage).load()).rejects.toThrow("保存を停止");
  });
});
