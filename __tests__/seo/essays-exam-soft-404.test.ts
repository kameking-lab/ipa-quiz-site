import { describe, expect, it, vi } from "vitest";

import EssayEditorPage from "@/app/essay/[exam]/[questionId]/page";
import EssaysHomePage from "@/app/essays/page";
import EssaysExamPage from "@/app/essays/[exam]/page";
import EssaysDetailPage from "@/app/essays/[exam]/[yearSeason]/[section]/[qnum]/page";
import DemoPage from "@/app/demo/essay-grading/page";

vi.mock("next/navigation", () => ({
  redirect: (url: string) => { throw new Error(`redirect:${url}`); },
}));

describe("retired independent essay routes", () => {
  it("redirects every public manuscript route to the official IPA guide", () => {
    expect(() => EssaysHomePage()).toThrow("redirect:/essay");
    expect(() => EssaysExamPage()).toThrow("redirect:/essay");
    expect(() => EssaysDetailPage()).toThrow("redirect:/essay");
    expect(() => EssayEditorPage()).toThrow("redirect:/essay");
    expect(() => DemoPage()).toThrow("redirect:/essay");
  });
});
