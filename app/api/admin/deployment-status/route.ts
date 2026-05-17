import { NextResponse } from "next/server";
import { fetchDeploymentStatus, type DeploymentStatusData } from "@/lib/admin/deployment-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(): Promise<NextResponse<DeploymentStatusData | { error: string }>> {
  try {
    const data = await fetchDeploymentStatus();
    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
