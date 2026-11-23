import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { NotificationSettings } from "@/app/account/notifications/NotificationSettings";

it("shows the mail status without requesting browser notification permission", () => {
  render(<NotificationSettings />);
  expect(screen.getByText("メール通知")).toBeVisible();
  expect(screen.queryByText("ブラウザ通知")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "通知を許可" })).not.toBeInTheDocument();
});
