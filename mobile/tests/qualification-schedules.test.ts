import { afterEach, expect, it, vi } from "vitest";
import { confirmedSchedules, isQualificationUrl, qualificationTargets, qualificationUrl, todayJst, validDay } from "../shared/qualification-schedules";
import { pageQualifications } from "../shared/qualification-context";
import { addQualificationEvent, fetchQualificationSchedules, openQualificationUrl } from "../src/qualification-platform";
const transport = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("@capacitor/core", () => ({ Capacitor: { isNativePlatform: () => true }, CapacitorHttp: transport, registerPlugin: () => ({}) }));
const target = qualificationTargets("kaigo")[0];
const today = "2026-11-03";
function response(patch: Record<string, unknown> = {}) {
  return { items: [{ id: target.id, publicationStatus: "active", scheduleClock: { schedules: [{
    id: "session-2027", qualificationId: target.id, sessionLabel: "2027年", status: "published", cadence: "fixed", timezone: "Asia/Tokyo", venueDependent: false,
    examStartAt: "2027-01-31", examEndAt: null, applicationOpenAt: "2026-10-01", applicationDeadlineAt: "2026-11-20", estimatedEventTypes: [],
    officialUrl: "https://www.sssc.or.jp/kaigo/", sourceVerifiedAt: "2026-10-20", sourceValidUntil: "2026-11-20", ...patch,
  }] } }] };
}
afterEach(() => { vi.useRealTimers(); vi.resetAllMocks(); });
it("creates sourced all-day exam/deadline drafts with exclusive end dates", () => {
  const events = confirmedSchedules(response(), target, today);
  expect(events.map(e => [e.startDay,e.endDay])).toEqual([["2026-11-20","2026-11-21"],["2027-01-31","2027-02-01"]]);
  expect(events[0].notes).toContain("出典確認日：2026-10-20");
  expect(events[0].notes).toContain(qualificationUrl(target.id));
});
it.each([
  { status: "unannounced" }, { status: "estimated" }, { status: "retired" }, { sourceStatus: "contradicted" }, { sourceStatus: "source_unavailable" },
  { officialUrl: "http://source.test" }, { officialUrl: "https://user:pass@source.test" }, { sourceVerifiedAt: "" }, { sourceVerifiedAt: "2026-11-04" },
  { sourceValidUntil: "2026-11-02" }, { sourceValidUntil: null }, { estimatedEventTypes: undefined }, { venueDependent: true }, { cadence: "year_round" },
  { qualificationId: "another-exam" }, { applicationOpenAt: "2026-12-01" }, { applicationDeadlineAt: "2027-02-01" },
  { examEndAt: "2027-01-30" }, { resultAnnouncementAt: "2027-01-01" }, { examStartAt: "2027-02-29" },
])("rejects unconfirmed, stale, unsafe or contradictory schedules %j", patch => {
  expect(confirmedSchedules(response(patch), target, today)).toEqual([]);
});
it("suppresses estimated event kinds, past dates and CBT ranges without inventing a date", () => {
  expect(confirmedSchedules(response({ estimatedEventTypes: ["exam"] }), target, today).map(e => e.startDay)).toEqual(["2026-11-20"]);
  expect(confirmedSchedules(response({ estimatedEventTypes: ["application_deadline"] }), target, today).map(e => e.startDay)).toEqual(["2027-01-31"]);
  expect(confirmedSchedules(response({ examEndAt: "2027-02-05" }), target, today).map(e => e.startDay)).toEqual(["2026-11-20"]);
  expect(confirmedSchedules(response({ cadence: "period", examEndAt: "2027-02-05" }), target, today).map(e => e.startDay)).toEqual(["2026-11-20"]);
  expect(confirmedSchedules(response({ applicationDeadlineAt: "2026-10-20" }), target, today)).toHaveLength(1);
  expect(confirmedSchedules(response(), { ...target, calendarScope: "group" }, today)).toEqual([]);
});
it("keeps postal and online deadlines separate and includes the postmark rule", () => {
  const events = confirmedSchedules(response({ applicationMethods: [
    { label: "郵送", deadlineAt: "2026-11-10", deadlineRule: "postmark", officialUrl: "https://source.test/post", verifiedAt: "2026-10-20" },
    { label: "ネット", deadlineAt: "2026-11-20T23:59:00", deadlineRule: "received", officialUrl: "https://source.test/web", verifiedAt: "2026-10-20" },
  ] }), target, today);
  expect(events.map(e => e.startDay)).toEqual(["2026-11-10","2026-11-20","2027-01-31"]);
  expect(events[0].title).toContain("消印有効");
});
it("validates leap dates and JST midnight independently of the device timezone", () => {
  expect(validDay("2027-02-29")).toBe(false); expect(validDay("2028-02-29")).toBe(true);
  expect(todayJst(new Date("2026-11-03T15:00:00Z"))).toBe("2026-11-04");
});
it("allows qualification detail URLs only, excluding payment pages and disguised origins", async () => {
  for (const url of ["https://tsugino-shikaku.jp/billing", "https://tsugino-shikaku.jp/shikaku/ap?checkout=1", "https://tsugino-shikaku.jp.evil.test/shikaku/ap", "https://u@tsugino-shikaku.jp/shikaku/ap", "http://tsugino-shikaku.jp/shikaku/ap"]) {
    expect(isQualificationUrl(url)).toBe(false);
    await expect(openQualificationUrl(url)).rejects.toThrow("情報ページ");
  }
  expect(isQualificationUrl(qualificationUrl("care-worker"))).toBe(true);
});
it("opens the target app when possible, otherwise uses the in-app browser", async () => {
  const native = { openUniversalLink: vi.fn().mockResolvedValue({ opened: true }), presentCalendar: vi.fn() };
  const browser = { open: vi.fn() } as unknown as Parameters<typeof openQualificationUrl>[2];
  await openQualificationUrl(qualificationUrl(target.id), native, browser);
  expect(browser!.open).not.toHaveBeenCalled();
  native.openUniversalLink.mockResolvedValue({ opened: false });
  await openQualificationUrl(qualificationUrl(target.id), native, browser);
  expect(browser!.open).toHaveBeenCalledWith({ url: qualificationUrl(target.id), presentationStyle: "fullscreen" });
});
it("reads only the fixed public API anonymously with redirects disabled", async () => {
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-03T10:00:00Z"));
  transport.get.mockResolvedValue({ status: 200, data: response() });
  expect(await fetchQualificationSchedules(target)).toHaveLength(2);
  expect(transport.get).toHaveBeenCalledWith(expect.objectContaining({ url: `https://tsugino-shikaku.jp/api/qualification-summaries?ids=${target.id}&schedules=1`, disableRedirects: true, headers: { Accept: "application/json" } }));
  transport.get.mockResolvedValue({ status: 503 }); await expect(fetchQualificationSchedules(target)).rejects.toThrow("取得できません");
});
it("rechecks before presenting and distinguishes a user cancellation from a save", async () => {
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-03T10:00:00Z"));
  const draft = confirmedSchedules(response(), target, today)[0];
  const request = vi.fn().mockResolvedValue([draft]);
  const native = { openUniversalLink: vi.fn(), presentCalendar: vi.fn().mockResolvedValue({ saved: false }) };
  expect(await addQualificationEvent(draft, target, request, native)).toBe(false);
  native.presentCalendar.mockResolvedValue({ saved: true });
  expect(await addQualificationEvent(draft, target, request, native)).toBe(true);
  for (const fresh of [[], [{ ...draft, startDay: "2026-11-21" }], [{ ...draft, sourceUrl: "https://changed.test/" }]]) {
    native.presentCalendar.mockClear(); request.mockResolvedValue(fresh);
    await expect(addQualificationEvent(draft, target, request, native)).rejects.toThrow("再取得");
    expect(native.presentCalendar).not.toHaveBeenCalled();
  }
});
it("resolves hub, query, question, material and library routes without unrelated-page actions", () => {
  for (const [path, query, id] of [["/kaigo","","care-worker"],["/quiz","?exam=ip","itpassport"],["/q/fe/2025/am/1","","kihon-joho"],["/fp3/practical/2026","","fp-3kyu"],["/chusho-secondary/2025/a","","chusho-kigyo-shindanshi"],["/essay/st/1","","st"],["/e-learning/exams/lckohyo-LC20260401-2","","boiler-tokkyu"]]) {
    expect(pageQualifications(path,query).map(t => t.id)).toContain(id);
  }
  expect(pageQualifications("/account")).toEqual([]);
  expect(pageQualifications("/e-learning/exams/qualifications/ni-kyu-boiler-gishi").map(t => t.id)).toEqual(["boiler-2kyu"]);
  expect(pageQualifications("/e-learning/exams", "?group=cskohyo&subject=労働衛生一般").map(t => t.id)).toEqual(["rodo-eisei-consultant"]);
  expect(pageQualifications("/e-learning/exams", "?group=emkohyo&subject=労働衛生一般").map(t => t.id)).toEqual(["work-environment-measurement-expert-first", "work-environment-measurement-expert-second"]);
  expect(qualificationTargets("gas-otsu")).toEqual([]);
  expect(qualificationTargets("amateur1")[0].calendarScope).toBe("group");
});
