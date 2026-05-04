import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckResult {
  ok: boolean;
  detail?: string;
}

interface HealthReport {
  ok: boolean;
  ts: string;
  checks: {
    routes: CheckResult;
    database: CheckResult;
    ai_providers: CheckResult;
  };
}

async function checkRoutes(): Promise<CheckResult> {
  // Next.js のアプリディレクトリが起動しているならこの関数自体が実行されているので routes は ok。
  return { ok: true, detail: "next-app booted" };
}

async function checkDatabase(): Promise<CheckResult> {
  if (!process.env.DATABASE_URL) {
    // DB は graceful degradation 対象。未設定でも全体としては ok 扱い。
    return { ok: true, detail: "DATABASE_URL not configured (graceful)" };
  }
  try {
    const { prisma } = await import("@/lib/db/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true, detail: "select 1 ok" };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

function checkAiProviders(): CheckResult {
  const provider = process.env.LLM_PROVIDER ?? "gemini";
  const hasKey =
    (provider === "gemini" && Boolean(process.env.GEMINI_API_KEY)) ||
    (provider === "claude" && Boolean(process.env.ANTHROPIC_API_KEY)) ||
    (provider === "openai" && Boolean(process.env.OPENAI_API_KEY));
  if (!hasKey) {
    return { ok: true, detail: `${provider} key absent → falling back to mock provider` };
  }
  return { ok: true, detail: `${provider} key present` };
}

export async function GET(): Promise<NextResponse<HealthReport>> {
  const [routes, database] = await Promise.all([checkRoutes(), checkDatabase()]);
  const ai_providers = checkAiProviders();
  const ok = routes.ok && database.ok && ai_providers.ok;

  return NextResponse.json(
    {
      ok,
      ts: new Date().toISOString(),
      checks: { routes, database, ai_providers },
    },
    { status: ok ? 200 : 503 },
  );
}
