import { isExamPublished } from "@/lib/qualifications/catalog";
import assets from "@/data/questions/khk-kagaku/image-assets.json";
import { KHK_IMAGE_LOADERS } from "@/data/questions/khk-kagaku/assets.server";

export const runtime = "nodejs";
const allowed = new Set(assets.map((file) => file.replace(/^images\//, "")));

export async function GET(_request: Request, context: { params: Promise<{ file: string }> }) {
  // Check before reading or disclosing an asset, even for a known filename.
  if (!isExamPublished("khk-kagaku")) return new Response(null, { status: 404 });
  const { file } = await context.params;
  if (!allowed.has(file)) return new Response(null, { status: 404 });
  try {
    const bytes = await KHK_IMAGE_LOADERS[file]();
    return new Response(new Uint8Array(bytes), { headers: { "Content-Type": "image/png", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return new Response(null, { status: 404 });
  }
}
