import { z } from "zod";
import { PackSchema, packHash, type Pack, type Delta } from "../src/domain";
import bundledIp from "../src/packs/ip.json";
import bundledFe from "../src/packs/fe.json";

// Published versions are immutable. To publish a content correction, append its
// reviewed JSON here, retain v1, and advance current. Never mutate an old version.
export const releases: Record<string, Pack[]> = {
  ip: [PackSchema.parse(bundledIp)], fe: [PackSchema.parse(bundledFe)],
};
export async function createDelta(base: Pack, current: Pack): Promise<Delta> {
  if (base.id !== current.id || base.version >= current.version) throw new Error("Invalid release history");
  const old = new Map(base.questions.map(q => [q.id, JSON.stringify(q)]));
  const ids = new Set(current.questions.map(q => q.id));
  return {
    schema: 1, packId: current.id, fromVersion: base.version, toVersion: current.version,
    updatedAt: current.updatedAt, attribution: current.attribution, rightsUrl: current.rightsUrl,
    upserts: current.questions.filter(q => old.get(q.id) !== JSON.stringify(q)),
    deletedIds: base.questions.filter(q => !ids.has(q.id)).map(q => q.id),
    sha256: await packHash(current),
  };
}
const QuerySchema = z.object({ pack: z.enum(["ip", "fe"]), since: z.string().regex(/^\d{1,9}$/).transform(Number) });

export async function handlePackRequest(request: Request, catalog = releases): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const query = QuerySchema.safeParse({ pack: params.get("pack"), since: params.get("since") });
  const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (!query.success) return Response.json({ error: "invalid_request" }, { status: 400, headers });
  const versions = catalog[query.data.pack];
  const current = versions.at(-1);
  if (!current) return Response.json({ error: "unavailable" }, { status: 503, headers });
  if (query.data.since === current.version) return new Response(null, { status: 204, headers });
  const base = versions.find(p => p.version === query.data.since);
  if (!base) return Response.json({ error: "unsupported_version", currentVersion: current.version }, { status: 409, headers });
  return Response.json(await createDelta(base, current), { headers });
}
