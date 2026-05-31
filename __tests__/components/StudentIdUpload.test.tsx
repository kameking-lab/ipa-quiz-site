import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { StudentIdUpload } from "@/app/student/StudentIdUpload";

beforeEach(() => {
  cleanup();
  // jsdom にない URL.createObjectURL を補う(プレビュー生成に必要)
  URL.createObjectURL = vi.fn(() => "blob:mock") as typeof URL.createObjectURL;
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

// 申請送信後、アップロード UI は「申請を受け付けました」カードに差し替わるが、
// role/aria-live が無いと SR 利用者に受付完了が告知されない(WCAG 4.1.3)。
// 成功カードを polite live region にして通知する(ContactForm と同型)。
describe("StudentIdUpload — 申請完了の SR 通知", () => {
  it("成功カードが role=status / aria-live=polite の live region で告知される", async () => {
    const { container } = render(<StudentIdUpload />);

    const fileInput = container.querySelector("#student-id-file") as HTMLInputElement;
    const file = new File(["x"], "id.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: "申請を送信する" }));

    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("申請を受け付けました");
  });

  it("送信前には live region は存在しない", () => {
    render(<StudentIdUpload />);
    expect(screen.queryByRole("status")).toBeNull();
  });
});
