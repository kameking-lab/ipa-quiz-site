import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { normalizePetName, PET_DEFAULT_NAME } from "@/lib/pet/v1/name";
import { applyPetCare } from "@/lib/pet/v1/care";
import { emptyPetProfiles, newPetProfile } from "@/lib/pet/v1/profile";

const saved: unknown[] = [];
vi.mock("@/lib/pet/v1/browser-care", () => ({ savePetCare: vi.fn(async (...args: unknown[]) => { saved.push(args); return null; }) }));
import { PetNameTitle, petDisplayName } from "@/components/pet/PetNameTitle";

afterEach(() => { cleanup(); saved.length = 0; });

describe("pet names", () => {
  it("trims, allows up to 10 characters, maps empty back to the default and blocks a few bad words", () => {
    expect(normalizePetName("  ポチ  ")).toEqual({ ok: true, name: "ポチ" });
    expect(normalizePetName("あいうえおかきくけこ")).toEqual({ ok: true, name: "あいうえおかきくけこ" });
    expect(normalizePetName("あいうえおかきくけこさ")).toEqual({ ok: false, error: "10文字までにしてください。" });
    expect(normalizePetName("   ")).toEqual({ ok: true, name: PET_DEFAULT_NAME });
    for (const bad of ["しね", "シネ", "ｓｈｉｔ", "う ん こ"]) expect(normalizePetName(bad)).toEqual({ ok: false, error: "この名前は使えません。" });
  });

  it("stores the name per qualification and rejects invalid names in the save path", () => {
    const doc = emptyPetProfiles("guest", "Asia/Tokyo");
    doc.profiles.push(newPetProfile("guest", "ip"), newPetProfile("guest", "ap"));
    applyPetCare(doc, "ip", { type: "name", name: " ポチ " }, Date.now());
    expect(doc.profiles.map(pet => pet.name)).toEqual(["ポチ", PET_DEFAULT_NAME]);
    applyPetCare(doc, "ip", { type: "name", name: "" }, Date.now());
    expect(doc.profiles[0].name).toBe(PET_DEFAULT_NAME);
    expect(() => applyPetCare(doc, "ap", { type: "name", name: "ばか".repeat(6) }, Date.now())).toThrow("pet_name_invalid");
  });

  it("shows the qualification's chihuahua until named, then the name large with the qualification small", () => {
    expect(petDisplayName("ITパスポート", PET_DEFAULT_NAME)).toBe("ITパスポートのチワワ");
    expect(petDisplayName("ITパスポート", "ポチ")).toBe("ポチ・ITパスポート");
  });

  it("edits the name in place from the heading and saves it for that qualification", async () => {
    const doc = emptyPetProfiles("guest", "Asia/Tokyo");
    doc.profiles.push(newPetProfile("guest", "ip"));
    render(<PetNameTitle id="t" qualificationLabel="ITパスポート" name={PET_DEFAULT_NAME} document={doc} qualificationId="ip" />);
    fireEvent.click(screen.getByRole("button", { name: "ITパスポートのチワワ（名前を変える）" }));
    const input = screen.getByRole("textbox", { name: "チワワの名前" });
    expect(input).toHaveValue("");
    fireEvent.change(input, { target: { value: "あいうえおかきくけこさ" } });
    fireEvent.submit(input.closest("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("10文字までにしてください。");
    expect(saved).toHaveLength(0);
    fireEvent.change(input, { target: { value: " ポチ " } });
    fireEvent.submit(input.closest("form")!);
    await waitFor(() => expect(saved).toHaveLength(1));
    expect(saved[0]).toEqual([doc, "ip", { type: "name", name: "ポチ" }]);
  });

  it("cancels with Escape and cannot be edited before the pet exists", () => {
    const { rerender } = render(<PetNameTitle id="t" qualificationLabel="ITパスポート" name="ポチ" document={emptyPetProfiles("guest", "Asia/Tokyo")} qualificationId="ip" />);
    fireEvent.click(screen.getByRole("button", { name: "ポチ・ITパスポート（名前を変える）" }));
    fireEvent.keyDown(screen.getByRole("textbox", { name: "チワワの名前" }), { key: "Escape" });
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(saved).toHaveLength(0);
    rerender(<PetNameTitle id="t" qualificationLabel="ITパスポート" name={undefined} document={null} qualificationId={undefined} />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByRole("heading")).toHaveTextContent("ITパスポートのチワワ");
  });
});
