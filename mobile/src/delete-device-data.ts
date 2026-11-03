import { Preferences } from "@capacitor/preferences";
import { downloads } from "./downloads";
import { deleteStudy } from "./portable-storage";
import { Membership } from "./purchases";
import { setReminder } from "./platform";
import { Filesystem,Directory } from "@capacitor/filesystem";
export async function deleteDeviceData(){
  await downloads.invalidate();
  // Explicit device-data deletion clears all saved accounts on this device.
  for(const code of Object.keys(await downloads.list()))await downloads.remove(code);
  await deleteStudy();
  const {keys}=await Preferences.keys();
  for(const key of keys)if(key.startsWith("kakomon:")&&key!=="kakomon:deletion-epoch:v1")await Preferences.remove({key});
  // Also remove interrupted/orphaned files that never entered the committed index.
  for(const [directory,names] of [[Directory.Data,["exams","offline-assets"]],[Directory.Cache,["images"]]] as const){
    const listing=await Filesystem.readdir({directory,path:""});
    for(const name of names)if(listing.files.some(file=>file.name===name))await Filesystem.rmdir({directory,path:name,recursive:true});
  }
  await new Membership().disconnect();
  await setReminder(null);
}
