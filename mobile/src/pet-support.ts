import { Capacitor } from "@capacitor/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { installPetLocalPlatform } from "@/lib/pet/v1/platform";
import { flushPetSubmissions } from "@/lib/pet/v1/submission-order";
import { persistStudy, portablePetOwner } from "./portable-storage";

export function installNativePetSupport() {
  if (!Capacitor.isNativePlatform()) return () => {};
  return installPetLocalPlatform({
    ...(location.protocol === "capacitor:" ? { resolveOwner: portablePetOwner } : {}),
    async saveBackup(raw, name, isCurrent) {
      if (!/^[a-z-]+\.json$/.test(name) || !await isCurrent()) throw new Error("pet_backup_owner");
      const path = `pet-backups/${name}`;
      try {
        const file = await Filesystem.writeFile({ directory: Directory.Cache, path, data: raw, encoding: Encoding.UTF8, recursive: true });
        if (!await isCurrent()) throw new Error("pet_backup_owner");
        await Share.share({ title: "チワワのバックアップ", files: [file.uri] });
      } finally { await Filesystem.deleteFile({ directory: Directory.Cache, path }).catch(() => {}); }
    },
  });
}
export async function persistStudyAfterPets(owner:string|null) {
  await flushPetSubmissions(); await persistStudy(owner);
}
export function observePetStudyWrites(current:()=>{ready:boolean;owner:string|null}, onError:(error:unknown)=>void) {
  const saved=()=>{const state=current();if(state.ready)void persistStudy(state.owner).catch(onError);};
  window.addEventListener("pet-v1:committed",saved);window.addEventListener("pet-v1:updated",saved);
  return ()=>{window.removeEventListener("pet-v1:committed",saved);window.removeEventListener("pet-v1:updated",saved);};
}
