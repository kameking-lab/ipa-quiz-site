import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useRovingRadioGroup } from "@/lib/a11y/use-roving-radio";

const VALUES = ["a", "b", "c"] as const;

function Harness() {
  const [sel, setSel] = React.useState<(typeof VALUES)[number]>("a");
  const { getRadioProps } = useRovingRadioGroup(VALUES, sel, setSel);
  return (
    <div role="radiogroup" aria-label="t">
      {VALUES.map((v, i) => (
        <button key={v} role="radio" aria-checked={sel === v} {...getRadioProps(i)}>
          {v}
        </button>
      ))}
    </div>
  );
}

describe("useRovingRadioGroup", () => {
  it("keeps the group a single tab stop (selected = tabIndex 0, rest -1)", () => {
    const { getAllByRole } = render(<Harness />);
    const radios = getAllByRole("radio");
    expect(radios.map((r) => r.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
  });

  it("ArrowDown/Right moves selection + focus to the next radio", () => {
    const { getAllByRole } = render(<Harness />);
    let radios = getAllByRole("radio");
    fireEvent.keyDown(radios[0], { key: "ArrowDown" });
    radios = getAllByRole("radio");
    expect(radios[1].getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(radios[1]);
  });

  it("ArrowUp from the first wraps to the last; Home/End jump to ends", () => {
    const { getAllByRole } = render(<Harness />);
    fireEvent.keyDown(getAllByRole("radio")[0], { key: "ArrowUp" });
    expect(getAllByRole("radio")[2].getAttribute("aria-checked")).toBe("true");

    fireEvent.keyDown(getAllByRole("radio")[2], { key: "Home" });
    expect(getAllByRole("radio")[0].getAttribute("aria-checked")).toBe("true");

    fireEvent.keyDown(getAllByRole("radio")[0], { key: "End" });
    expect(getAllByRole("radio")[2].getAttribute("aria-checked")).toBe("true");
  });
});
