import { act, cleanup } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { HomeHeroImage } from "@/components/home/landing/HomeHeroImage";
import { petArtFor } from "@/lib/pet/v1/art";

afterEach(cleanup);
it("keeps the same two companions through hydration without a random replacement", async () => {
  const container = document.createElement("div"); document.body.appendChild(container);
  container.innerHTML = renderToString(<HomeHeroImage />);
  const before = [...container.querySelectorAll("img")].map(img => img.getAttribute("src"));
  const onRecoverableError = vi.fn();
  let root!: ReturnType<typeof hydrateRoot>;
  await act(async () => { root = hydrateRoot(container, <HomeHeroImage />, { onRecoverableError }); });
  expect(onRecoverableError).not.toHaveBeenCalled();
  expect([...container.querySelectorAll("img")].map(img => img.getAttribute("src"))).toEqual(before);
  expect(before).toEqual([petArtFor("ip", "puppy", "study"), petArtFor("fp3", "puppy", "study")]);
  await act(async () => root.unmount()); container.remove();
});
