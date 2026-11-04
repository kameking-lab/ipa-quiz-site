import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { HomeHero } from "@/components/home/landing/HomeHero";

afterEach(cleanup);
it("starts practice with one link and leaves the pool open for the wall and bonus", () => {
  localStorage.clear();
  render(<HomeHero domains={[]} image={<span />} />);
  const link = screen.getByRole("link", { name: "ログインなしで10問を始める" });
  const url = new URL(link.getAttribute("href")!, window.location.origin);
  expect(url.pathname).toBe("/quiz");
  expect(url.searchParams.get("mode")).toBe("random");
  expect(url.searchParams.has("limit")).toBe(false);
});
