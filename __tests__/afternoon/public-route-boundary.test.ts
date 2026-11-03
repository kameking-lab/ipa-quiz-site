import { describe, expect, it, vi } from "vitest";
const boundary = vi.hoisted(() => ({ notFound: vi.fn(() => { throw new Error("fixture:not-found"); }) }));
vi.mock("next/navigation", () => ({ notFound: boundary.notFound }));
import Page, { generateStaticParams, generateMetadata } from "@/app/[exam]/afternoon/[year]/[season]/page";
describe("retired original sitting routes", () => {
  it("prebuilds no old sitting and rejects the player route", async () => {
    expect(await generateStaticParams()).toEqual([]);
    await expect(Page()).rejects.toThrow("fixture:not-found");
    expect(boundary.notFound).toHaveBeenCalledOnce();
    expect(await generateMetadata()).toMatchObject({ robots: { index: false } });
  });
});
