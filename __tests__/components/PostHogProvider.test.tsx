import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  capture: vi.fn(),
  init: vi.fn(),
  prematureCapture: vi.fn(),
  ready: false,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/sa",
  useSearchParams: () => new URLSearchParams("utm_source=note&utm_campaign=sa-guide"),
}));

vi.mock("posthog-js", () => ({
  default: { init: mocks.init },
}));

vi.mock("@/lib/posthog", () => ({
  POSTHOG_CONFIG: { key: "phc_test", host: "https://example.invalid" },
  isPostHogConfigured: true,
  setPostHogClient: (client: unknown) => {
    mocks.ready = client !== null;
  },
  posthogCapture: (...args: unknown[]) => {
    if (!mocks.ready) mocks.prematureCapture(...args);
    mocks.capture(...args);
  },
}));

import { PostHogProvider } from "@/components/PostHogProvider";

beforeEach(() => {
  mocks.capture.mockReset();
  mocks.init.mockReset();
  mocks.prematureCapture.mockReset();
  mocks.ready = false;
});

describe("PostHogProvider", () => {
  it("waits for the client before recording the first page view and UTM", async () => {
    render(<PostHogProvider />);

    await waitFor(() => {
      expect(mocks.capture).toHaveBeenCalledWith("page_view", {
        path: "/sa?utm_source=note&utm_campaign=sa-guide",
      });
    });

    expect(mocks.prematureCapture).not.toHaveBeenCalled();
    expect(mocks.capture).toHaveBeenCalledWith("referrer_with_utm", {
      utm_source: "note",
      utm_medium: null,
      utm_campaign: "sa-guide",
      landing_path: "/sa",
    });
    expect(mocks.capture).toHaveBeenCalledTimes(2);
  });
});
