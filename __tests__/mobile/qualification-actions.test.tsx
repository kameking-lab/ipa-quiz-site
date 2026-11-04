import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { QualificationActions } from "@/mobile/src/QualificationActions";
import { qualificationTargets, type CalendarDraft } from "@/mobile/shared/qualification-schedules";
const target = qualificationTargets("kaigo")[0];
const draft: CalendarDraft = { id: "future-exam", qualificationId: target.id, title: "介護福祉士 試験日", startDay: "2099-01-31", endDay: "2099-02-01", sourceUrl: "https://www.sssc.or.jp/kaigo/", verifiedAt: "2026-11-03", validUntil: "2099-01-01", notes: "出典と確認日" };
const service = { fetch: vi.fn(), add: vi.fn(), open: vi.fn(), source: vi.fn() };
beforeEach(() => { vi.resetAllMocks(); service.fetch.mockResolvedValue([draft]); service.add.mockResolvedValue(false); service.open.mockResolvedValue(undefined); service.source.mockResolvedValue(undefined); });
afterEach(() => vi.useRealTimers());
async function load() { fireEvent.click(screen.getByRole("button", { name: "試験日・申込締切を取得・再確認" })); await screen.findByRole("button", { name: "カレンダーに追加" }); }
it("shows sourced dates after an explicit fetch and opens the specific qualification page", async () => {
  render(<QualificationActions target={target} service={service}/>);
  expect(service.fetch).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "次の資格で申込方法・日程・関連資格を見る" }));
  await waitFor(() => expect(service.open).toHaveBeenCalledWith("https://tsugino-shikaku.jp/shikaku/care-worker"));
  await waitFor(() => expect(screen.getByRole("button", { name: "試験日・申込締切を取得・再確認" })).not.toBeDisabled());
  await load(); expect(screen.getByText(/出典確認日：2026-11-03/)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "公式出典を確認" }));
  await waitFor(() => expect(service.source).toHaveBeenCalledWith(draft.sourceUrl));
});
it("reports cancellation separately and never reports a save until the system editor returns saved", async () => {
  render(<QualificationActions target={target} service={service}/>); await load();
  fireEvent.click(screen.getByRole("button", { name: "カレンダーに追加" }));
  expect(await screen.findByText("保存をキャンセルしました。")).toBeVisible();
  expect(screen.queryByText("カレンダーに保存しました。")).toBeNull();
  service.add.mockResolvedValue(true);
  fireEvent.click(screen.getByRole("button", { name: "カレンダーに追加" }));
  expect(await screen.findByText("カレンダーに保存しました。")).toBeVisible();
});
it("offers no add action for unconfirmed schedules or a group without an exact grade", async () => {
  service.fetch.mockResolvedValue([]);
  const view = render(<QualificationActions target={target} service={service}/>);
  fireEvent.click(screen.getByRole("button", { name: "試験日・申込締切を取得・再確認" }));
  expect(await screen.findByText(/追加できる確定日程はありません/)).toBeVisible();
  expect(screen.queryByRole("button", { name: "カレンダーに追加" })).toBeNull();
  view.rerender(<QualificationActions target={{ ...target, calendarScope: "group" }} service={service}/>);
  expect(screen.getByRole("button", { name: "試験日・申込締切を取得・再確認" })).toBeDisabled();
});
it("removes old add buttons when a refresh or pre-save verification fails", async () => {
  render(<QualificationActions target={target} service={service}/>); await load();
  service.fetch.mockRejectedValue(new Error("通信エラー"));
  fireEvent.click(screen.getByRole("button", { name: "試験日・申込締切を取得・再確認" }));
  expect(await screen.findByText("通信エラー")).toBeVisible();
  expect(screen.queryByRole("button", { name: "カレンダーに追加" })).toBeNull();
  service.fetch.mockResolvedValue([draft]); await load();
  service.add.mockRejectedValue(new Error("日程が変更されました"));
  fireEvent.click(screen.getByRole("button", { name: "カレンダーに追加" }));
  expect(await screen.findByText("日程が変更されました")).toBeVisible();
  expect(screen.queryByRole("button", { name: "カレンダーに追加" })).toBeNull();
});
it("disables a date after its confirmation window expires while the page is open", async () => {
  vi.useFakeTimers({ toFake: ["Date"] }); vi.setSystemTime(new Date("2026-11-03T01:00:00Z"));
  service.fetch.mockResolvedValue([{ ...draft, validUntil: "2026-11-03" }]);
  const view = render(<QualificationActions target={target} service={service}/>); await load();
  vi.setSystemTime(new Date("2026-11-03T15:00:00Z"));
  view.rerender(<QualificationActions target={target} service={service}/>);
  expect(screen.getByRole("button", { name: "カレンダーに追加" })).toBeDisabled();
});
it("does not replace a new qualification with a delayed response from the previous one", async () => {
  let resolve!: (events: CalendarDraft[]) => void;
  service.fetch.mockReturnValue(new Promise<CalendarDraft[]>(r => { resolve = r; }));
  const view = render(<QualificationActions target={target} service={service}/>);
  fireEvent.click(screen.getByRole("button", { name: "試験日・申込締切を取得・再確認" }));
  view.rerender(<QualificationActions target={qualificationTargets("ip")[0]} service={service}/>);
  await act(async () => { resolve([draft]); });
  expect(screen.queryByRole("button", { name: "カレンダーに追加" })).toBeNull();
});
