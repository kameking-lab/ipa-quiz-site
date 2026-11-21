import "server-only";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { CAFE_POSE_PATH } from "./study-room-cafe-mascots";

/** Only the filenames cross the server/client boundary. Public images load on demand. */
export function readCafePoseFiles(directory = join(process.cwd(), "public", `.${CAFE_POSE_PATH}`)): string[] {
  try {
    const entries = readdirSync(directory, { withFileTypes: true });
    return entries.filter(entry => entry.isFile() && /^[a-z0-9-]+\.webp$/.test(entry.name)).map(entry => entry.name).sort();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}
