import { browserPetProfiles, preparePetOwner } from "./runtime";
import { applyPetCare, type PetCareAction } from "./care";
import type { PetProfileDocument } from "./profile";
import { savePetBackupFile } from "./platform";

async function currentOwner(expected: PetProfileDocument) {
  const owner = await preparePetOwner(() => true);
  if (!owner || owner.ownerScope !== expected.ownerScope || !await owner.revalidate()) throw new Error("pet_owner_changed");
  return owner;
}
function publish(document: PetProfileDocument) {
  window.dispatchEvent(new CustomEvent("pet-v1:updated", { detail: document }));
}
export async function savePetCare(expected: PetProfileDocument, qualification: string, action: PetCareAction) {
  const owner = await currentOwner(expected);
  const result = await browserPetProfiles().update({ ...owner, verifyCurrent: () => owner.revalidate() }, expected.timeZone, document => {
    if (document.revision !== expected.revision) throw new Error("pet_stale_view");
    return applyPetCare(document, qualification, action, Date.now());
  });
  if (result.status !== "ready") throw new Error(result.status);
  if (!owner.isCurrent() || !await owner.revalidate()) throw new Error("pet_owner_changed");
  publish(result.document); return result.document;
}
export async function exportCurrentPetBackup(expected: PetProfileDocument) {
  const owner = await currentOwner(expected), store = browserPetProfiles();
  const backup = await store.exportBackup({ ...owner, verifyCurrent: () => owner.revalidate() }, expected.timeZone, expected.revision);
  if (!backup || !owner.isCurrent() || !await owner.revalidate()) throw new Error("pet_backup_failed");
  return backup;
}
export async function restoreCurrentPetBackup(expected: PetProfileDocument, raw: string) {
  const owner = await currentOwner(expected);
  const result = await browserPetProfiles().restoreBackup({ ...owner, verifyCurrent: () => owner.revalidate() }, expected.timeZone, raw, expected.revision);
  if (result.status !== "ready") throw new Error(result.status);
  if (!owner.isCurrent() || !await owner.revalidate()) throw new Error("pet_owner_changed");
  publish(result.document); return result.document;
}
export async function writeCurrentPetBackup(expected: PetProfileDocument, name: string) {
  const owner = await currentOwner(expected);
  const raw = await browserPetProfiles().exportBackup({ ...owner, verifyCurrent: () => owner.revalidate() }, expected.timeZone, expected.revision);
  if (!raw) throw new Error("pet_backup_failed");
  await savePetBackupFile(raw, name, async () => owner.isCurrent() && await owner.revalidate());
}
