import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { HomeHeroImage } from "@/components/home/landing/HomeHeroImage";

it("serves two bounded local study companions with accessible qualification names", () => {
  const root = document.createElement("div"); root.innerHTML = renderToStaticMarkup(<HomeHeroImage />);
  const images = [...root.querySelectorAll("img")];
  expect(images).toHaveLength(2);
  for (const image of images) {
    expect(image.getAttribute("width")).toBe("256"); expect(image.getAttribute("height")).toBe("256");
    expect(image.getAttribute("src")).toMatch(/^\/images\/(pet-v1|home\/study-room-mascots)\//);
    expect(image.getAttribute("fetchPriority")).toBe("high");
  }
  expect(images[0].alt).toContain("ITパスポート"); expect(images[1].alt).toContain("FP3級");
  expect(root.innerHTML).not.toContain("hero-variants"); expect(root.innerHTML).not.toContain("hero-small-success");
});
