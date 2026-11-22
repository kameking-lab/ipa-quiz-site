import { render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { NextExamSchedule } from "@/components/exam/NextExamSchedule";

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

it("shows the announced future phases and deadline from the official source", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-22T09:00:00+09:00"));
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ exam: "sc", source: "tsugino", sessions: [
    { scheduleStatus: "official", examDate: "2026-10-17", examDateEnd: "2026-11-23",
      sourceUrl: "https://www.ipa.go.jp/shiken/" },
    { scheduleStatus: "official", examDate: "2027-02-20", applicationDeadline: "2027-02-27",
      sourceUrl: "https://www.ipa.go.jp/shiken/", qualificationId: "sc",
      examPhaseWindows: [
        { label: "科目A", start: "2027-02-20", end: "2027-03-02" },
        { label: "科目B", start: "2027-03-16", end: "2027-03-28" },
      ] },
  ] })));
  const { container } = render(<NextExamSchedule exam="sc" />);
  expect(await screen.findByText("科目A")).toBeVisible();
  expect(screen.getByText("科目B")).toBeVisible();
  const dates = [...container.querySelectorAll("time")].map(time => time.dateTime);
  expect(dates).toEqual(["2027-02-20", "2027-03-02", "2027-03-16", "2027-03-28", "2027-02-27"]);
  expect(screen.getByRole("link", { name: "申込方法は次の資格で確認" })).toHaveAttribute("href",
    "https://tsugino-shikaku.jp/shikaku/sc?utm_source=kakomon&utm_campaign=exam_schedule");
});
