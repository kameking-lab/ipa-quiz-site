import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MockExamLanding } from "@/app/mock-exam/MockExamLanding";
import { MOCK_EXAM_CONFIGS, type MockExamCode } from "@/lib/mock-exam/config";

beforeEach(() => { localStorage.clear(); });
afterEach(cleanup);
describe("mock query and return context", () => {
  it("denko2 never renders AP settings or a start action", () => {
    render(<MockExamLanding examFromQuery="denko2" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("未対応");
    expect(screen.queryByRole("button", { name: "模試を開始する" })).not.toBeInTheDocument();
    expect(screen.queryByText("80問")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "第二種電気工事士に戻る" })).toHaveAttribute("href", "/denko2");
  });
  it.each(["unknown", "", "constructor", "toString", "__proto__"])("%s is explicit and offers qualification selection", (exam) => {
    render(<MockExamLanding examFromQuery={exam} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("未対応");
    expect(screen.queryByRole("button", { name: "模試を開始する" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "資格を選ぶ" })).toHaveAttribute("href", "/#choose-qualification");
  });
  it.each(Object.keys(MOCK_EXAM_CONFIGS) as MockExamCode[])("%s uses its own timing and return destination", (exam) => {
    const config = MOCK_EXAM_CONFIGS[exam];
    render(<MockExamLanding examFromQuery={exam} returnTo={`/${exam}/2024-cbt`} />);
    expect(screen.getByRole("heading", { level: 2, name: config.label })).toBeInTheDocument();
    expect(screen.getByText(`${config.questions}問`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← 試験ページに戻る" })).toHaveAttribute("href", `/${exam}/2024-cbt`);
  });
  it("updates query context on client navigation, including an unsupported detour", () => {
    const view = render(<MockExamLanding examFromQuery="ap" />);
    view.rerender(<MockExamLanding examFromQuery="denko2" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("未対応");
    view.rerender(<MockExamLanding examFromQuery="ip" />);
    expect(screen.getByRole("heading", { level: 2, name: MOCK_EXAM_CONFIGS.ip.label })).toBeInTheDocument();
  });
  it.each(["https://example.com", "//example.com", "/\\example.com", "/quiz?exam=ap"])("rejects unsafe or looping returnTo %s", (returnTo) => {
    render(<MockExamLanding examFromQuery="ip" returnTo={returnTo} />);
    expect(screen.getByRole("link", { name: "← 試験ページに戻る" })).toHaveAttribute("href", "/ip");
  });
  it("keeps the existing explicit AP default when no exam was specified", () => {
    render(<MockExamLanding />);
    expect(screen.getByRole("heading", { level: 2, name: MOCK_EXAM_CONFIGS.ap.label })).toBeInTheDocument();
  });
});
