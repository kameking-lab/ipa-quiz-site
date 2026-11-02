import { expect } from "vitest";

// SSR proves structure and containment; the release E2E checks actual browser visibility.
export function expectClosedNativeExplanations(doc: Document, expectedSlots: number) {
  const panels = doc.querySelectorAll<HTMLDetailsElement>("details[data-native-explanation]");
  expect(panels).toHaveLength(expectedSlots);
  expect(expectedSlots).toBeGreaterThan(0);
  for (const panel of panels) {
    expect(panel.hasAttribute("open")).toBe(false);
    expect(panel.firstElementChild?.tagName).toBe("SUMMARY");
    expect(panel.firstElementChild?.textContent).toBe("答えと解説を読む（答えを含みます）");
    expect(panel.querySelector("p")?.textContent).toMatch(/^公式正答：.+/);
  }
  const outside = doc.body.cloneNode(true) as HTMLElement;
  outside.querySelectorAll("details[data-native-explanation]").forEach(panel => panel.remove());
  expect(outside.textContent).not.toContain("正答：");
  expect([...doc.querySelectorAll("select")].every(select => select.value === "")).toBe(true);
}
