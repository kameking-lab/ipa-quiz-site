import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ErrorPage from "@/app/error";

vi.mock("@/lib/monitoring/sentry", () => ({ captureException: vi.fn().mockResolvedValue(undefined) }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("error recovery for the installed Next.js boundary contract", () => {
  it.each([undefined, null, "private error", { message: "private error" }])("recovers when a client throws a non-Error value: %s", (error) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const retry = vi.fn();
    render(<ErrorPage error={error} retry={retry} />);
    expect(screen.queryByText("private error")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "もう一度試す" }));
    expect(retry).toHaveBeenCalledOnce();
  });
  it("retains the diagnostic ID and calls retry", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const error = Object.assign(new Error("private error"), { digest: "display-id-123" });
    const retry = vi.fn();
    render(<ErrorPage error={error} retry={retry} />);
    expect(screen.getByText("display-id-123")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "もう一度試す" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
