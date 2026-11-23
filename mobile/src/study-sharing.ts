import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

async function writeShareImage(image: Blob, path: string) {
  const data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(image);
  });
  return Filesystem.writeFile({ path, data, directory: Directory.Cache });
}

export async function shareStudyResult(title: string, url: string, image?: Blob) {
  const path = `study-result-${crypto.randomUUID()}.png`;
  const file = image ? await writeShareImage(image, path).catch(() => undefined) : undefined;
  try {
    await Share.share({ title, url, ...(file && { files: [file.uri] }) });
  } finally {
    if (file) await Filesystem.deleteFile({ path, directory: Directory.Cache }).catch(() => {});
  }
}
