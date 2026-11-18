import { expect, it, vi } from "vitest";
import { createPresenceService } from "@/lib/study-presence-service";
const data = { count: 1, exams: [{ exam: "fe", count: 1 }] };
function setup() {
  let clock = Date.parse("2026-10-23T10:00:00Z");
  const store = { read: vi.fn().mockResolvedValue({ snapshot: data }), record: vi.fn().mockResolvedValue(undefined) };
  const service = createPresenceService(store, () => clock);
  return { store, service, advance: (ms: number) => { clock += ms; } };
}
it("coalesces reads and reuses the exact timestamp until the 90-second boundary", async () => {
  const { store, service, advance } = setup();
  const [first, second] = await Promise.all([service.read(), service.read()]);
  expect(second).toEqual(first); expect(store.read).toHaveBeenCalledOnce();
  advance(89_999); expect(await service.read()).toEqual(first); expect(store.read).toHaveBeenCalledOnce();
  advance(1); const fresh = await service.read(); expect(store.read).toHaveBeenCalledTimes(2);
  expect(fresh.measuredAt).not.toBe(first.measuredAt);
});
it("does not invent measured zero on error and backs off 90,180,300,900 seconds", async () => {
  const { store, service, advance } = setup(); store.read.mockRejectedValue(new Error("offline"));
  for (const seconds of [90, 180, 300, 900, 900]) {
    const before = store.read.mock.calls.length;
    expect(await service.read()).toMatchObject({ status: "unavailable", count: null, total: null, exams: null, retryAfterSeconds: seconds });
    await service.read(); await service.record("id", 0, "fe");
    expect(store.read).toHaveBeenCalledTimes(before + 1); expect(store.record).not.toHaveBeenCalled();
    advance(seconds * 1000);
  }
  store.read.mockResolvedValue({ snapshot: { count: 0, exams: [] } });
  expect(await service.read()).toMatchObject({ status: "measured", count: 0, total: 0, exams: [] });
});
it("allows only one half-open recovery probe", async () => {
  const { store, service, advance } = setup(); store.read.mockRejectedValueOnce(new Error("offline")); await service.read(); advance(90_000);
  let resolve: (value: { snapshot: typeof data }) => void = () => {};
  store.read.mockReturnValue(new Promise(done => { resolve = done; }));
  const probe = service.read();
  expect(await service.record("id", 0, "fe")).toMatchObject({ status: "unavailable", reason: "circuit_open" });
  expect(store.record).not.toHaveBeenCalled(); resolve({ snapshot: data }); expect(await probe).toMatchObject({ status: "measured" });
});
it("invalidates an in-flight read after an answer without aggregating as part of the write", async () => {
  const { store, service } = setup();
  let resolve: (value: { snapshot: typeof data }) => void = () => {};
  store.read.mockReturnValueOnce(new Promise(done => { resolve = done; }));
  const oldRead = service.read();
  expect(await service.record("id", 0, "fe", "old")).toBeUndefined();
  expect(store.record).toHaveBeenCalledWith("id", 0, "fe", "old");
  expect(store.read).toHaveBeenCalledOnce();
  store.read.mockResolvedValue({ snapshot: { count: 0, exams: [] } });
  expect(await service.read()).toMatchObject({ status: "measured", count: 0 });
  resolve({ snapshot: data }); await oldRead;
  expect(await service.read()).toMatchObject({ status: "measured", count: 0 });
  expect(store.read).toHaveBeenCalledTimes(2);
});
it("cannot share cache or breaker state across independent server instances", async () => {
  const a = setup(), b = setup();
  a.store.read.mockRejectedValue(new Error("offline")); await a.service.read();
  expect(await b.service.read()).toMatchObject({ status: "measured" }); expect(b.store.read).toHaveBeenCalledOnce();
});
it("an older concurrent success cannot clear a newly opened circuit", async () => {
  const { store, service } = setup();
  let resolve: (value: undefined) => void = () => {};
  store.record.mockReturnValue(new Promise(done => { resolve = done; }));
  const write = service.record("id", 0, "fe");
  store.read.mockRejectedValue(new Error("offline")); await service.read(); resolve(undefined); await write;
  expect(await service.read()).toMatchObject({ status: "unavailable", reason: "circuit_open" }); expect(store.read).toHaveBeenCalledOnce();
});
