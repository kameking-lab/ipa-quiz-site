export const runtime = "nodejs";

export function POST() {
  return Response.json({ error: "essay_grading_retired" }, { status: 410 });
}
