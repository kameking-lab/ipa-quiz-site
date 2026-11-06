import type { PetOwnerLease } from "./runtime";
export interface PetLocalPlatform {
  resolveOwner?(isCurrent: () => boolean): Promise<PetOwnerLease | null>;
  saveBackup?(raw: string, name: string, isCurrent: () => Promise<boolean>): Promise<void>;
}
const platforms = new Set<PetLocalPlatform>();
/** Installed only by the native shell; never authority for paid rights or APIs. */
export function installPetLocalPlatform(platform: PetLocalPlatform) {
  platforms.add(platform); return () => { platforms.delete(platform); };
}
export function petLocalOwnerResolver() {
  return [...platforms].reverse().find(platform => platform.resolveOwner)?.resolveOwner;
}
export async function savePetBackupFile(raw: string, name: string, isCurrent: () => Promise<boolean>) {
  const save = [...platforms].reverse().find(platform => platform.saveBackup)?.saveBackup;
  if (save) return save(raw, name, isCurrent);
  if (!await isCurrent()) throw new Error("pet_owner_changed");
  const url = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
  const link = document.createElement("a"); link.href = url; link.download = name;
  document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
