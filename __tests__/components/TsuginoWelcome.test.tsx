import { StrictMode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it } from "vitest";
import { TsuginoWelcome } from "@/components/analytics/TsuginoWelcome";
import { markReferralVisit } from "@/lib/analytics/referral";

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); history.replaceState({}, "", "/ap?utm_source=tsugino_shikaku"); });
afterEach(cleanup);
it("offers an inline, exact practice link on a first referral even under StrictMode, then remembers dismissal", () => {
  markReferralVisit();
  const href = "/quiz?mode=year&exam=ap&year=2025&session=am&category=network";
  const view = render(<StrictMode><TsuginoWelcome href={href} qualification="応用情報技術者" /></StrictMode>);
  expect(screen.getByRole("link", { name: "1問目から無料で解く" })).toHaveAttribute("href", href);
  expect(screen.queryByRole("dialog")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "案内を閉じる" }));
  expect(screen.queryByRole("complementary")).toBeNull();
  view.unmount(); render(<TsuginoWelcome href={href} qualification="応用情報技術者" />);
  expect(screen.queryByRole("complementary")).toBeNull();
});
it.each(["/ap", "/ap?utm_source=note"])("does not display for direct/other-source visits: %s", path => {
  history.replaceState({}, "", path);
  render(<TsuginoWelcome href="/quiz?mode=year&exam=ap" qualification="応用情報技術者" />);
  expect(screen.queryByRole("complementary")).toBeNull();
});
