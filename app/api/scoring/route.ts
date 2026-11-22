export const runtime = "nodejs";

export function POST() {
  return Response.json({ error: "scoring_retired" }, { status: 410 });
}
