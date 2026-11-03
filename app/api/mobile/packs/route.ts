// Only the Next.js entry point lives here; mobile code/data remain isolated.
import { handlePackRequest } from "../../../../mobile/server/packs";
export const runtime = "nodejs";
export async function GET(request: Request) { return handlePackRequest(request); }
