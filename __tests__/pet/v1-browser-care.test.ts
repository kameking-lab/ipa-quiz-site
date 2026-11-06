import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { emptyPetProfiles, newPetProfile, petProfileStorageKey, serializePetProfileDocument } from "@/lib/pet/v1/profile";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { savePetCare, exportCurrentPetBackup, restoreCurrentPetBackup } from "@/lib/pet/v1/browser-care";
import * as runtime from "@/lib/pet/v1/runtime";
import { readSyncAccount } from "@/lib/sync/ownership";
import { LS_KEYS } from "@/lib/storage/keys";
vi.mock("@/lib/sync/ownership", () => ({ readSyncAccount: vi.fn() }));
const zone = "Asia/Tokyo";
function source() { const doc = emptyPetProfiles("guest", zone); doc.profiles.push(newPetProfile("guest", "ap")); return doc; }
beforeEach(() => {
  localStorage.clear(); vi.mocked(readSyncAccount).mockResolvedValue(null);
  vi.spyOn(runtime, "browserPetProfiles").mockReturnValue(new PetProfileStore({ storage: localStorage, now: Date.now, exclusive: { run: async (_key, work) => work() } }));
});
afterEach(() => vi.restoreAllMocks());
it("care commits publish a quiet saved revision; backup/restore doesn't replay a reward", async () => {
  const doc = source(); localStorage.setItem(petProfileStorageKey("guest"), serializePetProfileDocument(doc));
  const quiet = vi.fn(), reaction = vi.fn(); window.addEventListener("pet-v1:updated", quiet); window.addEventListener("pet-v1:committed", reaction);
  try {
    const saved = await savePetCare(doc, "ap", { type: "name", name: "こむぎ" });
    expect(saved.revision).toBe(1); expect(quiet.mock.calls[0][0].detail).toEqual(saved); expect(reaction).not.toHaveBeenCalled();
    const backup = await exportCurrentPetBackup(saved);
    const changed = await savePetCare(saved, "ap", { type: "name", name: "そら" });
    const restored = await restoreCurrentPetBackup(changed, backup);
    expect(restored.revision).toBe(3); expect(restored.profiles[0].name).toBe("こむぎ"); expect(reaction).not.toHaveBeenCalled();
  } finally { window.removeEventListener("pet-v1:updated", quiet); window.removeEventListener("pet-v1:committed", reaction); }
});
it("rejects stale exports, selections and restores without overwriting new study data", async () => {
  const doc = source(); localStorage.setItem(petProfileStorageKey("guest"), serializePetProfileDocument(doc));
  const backup = await exportCurrentPetBackup(doc);
  await savePetCare(doc, "ap", { type: "name", name: "新しい名前" });
  const current = localStorage.getItem(petProfileStorageKey("guest"));
  await expect(exportCurrentPetBackup(doc)).rejects.toThrow();
  await expect(savePetCare(doc, "ap", { type: "name", name: "巻き戻し" })).rejects.toThrow();
  await expect(restoreCurrentPetBackup(doc, backup)).rejects.toThrow();
  expect(localStorage.getItem(petProfileStorageKey("guest"))).toBe(current);
});
it("refuses another owner before exporting and after lock wait; retains legacy storage", async () => {
  const doc = source(), raw = serializePetProfileDocument(doc); localStorage.setItem(petProfileStorageKey("guest"), raw); localStorage.setItem(LS_KEYS.petLearning, "old-source");
  vi.mocked(readSyncAccount).mockResolvedValue({ id: "other", label: "other" });
  await expect(exportCurrentPetBackup(doc)).rejects.toThrow();
  await expect(savePetCare(doc, "ap", { type: "name", name: "別人" })).rejects.toThrow();
  vi.mocked(readSyncAccount).mockResolvedValue(null);
  vi.spyOn(runtime, "browserPetProfiles").mockReturnValue(new PetProfileStore({ storage: localStorage, now: Date.now, exclusive: { run: async (_key, work) => {
    vi.mocked(readSyncAccount).mockResolvedValue({ id: "other", label: "other" }); return work();
  } } }));
  await expect(savePetCare(doc, "ap", { type: "name", name: "待機中の変更" })).rejects.toThrow();
  expect(localStorage.getItem(petProfileStorageKey("guest"))).toBe(raw); expect(localStorage.getItem(LS_KEYS.petLearning)).toBe("old-source");
  expect(localStorage.getItem(petProfileStorageKey("user:other"))).toBeNull();
});
