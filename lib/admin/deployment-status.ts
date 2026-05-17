export const GITHUB_REPO = "kameking-lab/ipa-quiz-site";
export const VERCEL_PROJECT_ID = "prj_t0YGXuTY62TNajIJg2v6W68TciT1";

export interface ProductionDeployment {
  id: number;
  sha: string;
  shortSha: string;
  createdAt: string;
  state: string;
}

export interface PRStatus {
  number: number;
  title: string;
  mergedAt: string;
  headRefName: string;
  isInProduction: boolean;
  deploymentDelaySec: number | null;
}

export interface VercelQuota {
  used: number;
  limit: number;
  resetsAt: string;
  source: "vercel-api" | "estimated";
}

export interface DeploymentStatusData {
  currentProdSha: string;
  mainSha: string;
  isUpToDate: boolean;
  lastProdDeployAt: string | null;
  prodDeployments: ProductionDeployment[];
  recentPRs: PRStatus[];
  vercelQuota: VercelQuota | null;
  fetchedAt: string;
}

interface GHDeployment {
  id: number;
  sha: string;
  environment: string;
  created_at: string;
}

interface GHDeploymentStatus {
  state: string;
  created_at: string;
}

interface GHPull {
  number: number;
  title: string;
  merged_at: string | null;
  head: { ref: string };
}

function ghHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  return token
    ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }
    : { Accept: "application/vnd.github+json" };
}

async function fetchGH<T>(path: string): Promise<T> {
  const url = `https://api.github.com/${path}`;
  const res = await fetch(url, { headers: ghHeaders(), cache: "no-store" });
  if (!res.ok) throw new Error(`GitHub API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

async function getDeploymentState(deploymentId: number): Promise<string> {
  try {
    const statuses = await fetchGH<GHDeploymentStatus[]>(
      `repos/${GITHUB_REPO}/deployments/${deploymentId}/statuses`,
    );
    return statuses[0]?.state ?? "unknown";
  } catch {
    return "unknown";
  }
}

async function getVercelQuota(deploymentsRaw: GHDeployment[]): Promise<VercelQuota> {
  const token = process.env.VERCEL_TOKEN;
  if (token) {
    try {
      const url = `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/deployments?limit=100&target=production`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { deployments: { createdAt: number }[] };
        const windowStart = Date.now() - 24 * 60 * 60 * 1000;
        const usedToday = data.deployments.filter((d) => d.createdAt > windowStart).length;
        const resetDate = new Date();
        resetDate.setUTCHours(0, 0, 0, 0);
        resetDate.setUTCDate(resetDate.getUTCDate() + 1);
        return { used: usedToday, limit: 100, resetsAt: resetDate.toISOString(), source: "vercel-api" };
      }
    } catch {
      // fall through to estimate
    }
  }

  // Estimate from GitHub deployment records
  const windowStart = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const used = deploymentsRaw.filter((d) => d.created_at > windowStart).length;
  const resetDate = new Date();
  resetDate.setUTCHours(0, 0, 0, 0);
  resetDate.setUTCDate(resetDate.getUTCDate() + 1);
  return { used, limit: 100, resetsAt: resetDate.toISOString(), source: "estimated" };
}

export async function fetchDeploymentStatus(): Promise<DeploymentStatusData> {
  const [deploymentsRaw, pullsRaw, mainCommit] = await Promise.all([
    fetchGH<GHDeployment[]>(
      `repos/${GITHUB_REPO}/deployments?per_page=30&environment=Production`,
    ),
    fetchGH<GHPull[]>(
      `repos/${GITHUB_REPO}/pulls?state=closed&sort=updated&direction=desc&per_page=50`,
    ),
    fetchGH<{ sha: string }>(`repos/${GITHUB_REPO}/commits/main`),
  ]);

  const mainSha = mainCommit.sha;
  const latestProd = deploymentsRaw[0] ?? null;
  const currentProdSha = latestProd?.sha ?? "";

  const prodDeployments: ProductionDeployment[] = await Promise.all(
    deploymentsRaw.slice(0, 10).map(async (d) => ({
      id: d.id,
      sha: d.sha,
      shortSha: d.sha.slice(0, 8),
      createdAt: d.created_at,
      state: await getDeploymentState(d.id),
    })),
  );

  const successProd = prodDeployments.filter((d) => d.state === "success");
  const lastProdDeploy = successProd[0] ?? null;

  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const recentPRs: PRStatus[] = pullsRaw
    .filter((p): p is GHPull & { merged_at: string } => !!p.merged_at && p.merged_at > cutoff)
    .slice(0, 40)
    .map((p) => {
      const isInProduction = lastProdDeploy !== null && p.merged_at <= lastProdDeploy.createdAt;
      let deploymentDelaySec: number | null = null;
      if (isInProduction && lastProdDeploy) {
        const merged = new Date(p.merged_at).getTime();
        const deployed = new Date(lastProdDeploy.createdAt).getTime();
        deploymentDelaySec = Math.max(0, Math.floor((deployed - merged) / 1000));
      }
      return {
        number: p.number,
        title: p.title,
        mergedAt: p.merged_at,
        headRefName: p.head.ref,
        isInProduction,
        deploymentDelaySec,
      };
    });

  const vercelQuota = await getVercelQuota(deploymentsRaw);
  const isUpToDate = successProd.some((d) => d.sha === mainSha);

  return {
    currentProdSha,
    mainSha,
    isUpToDate,
    lastProdDeployAt: lastProdDeploy?.createdAt ?? null,
    prodDeployments,
    recentPRs,
    vercelQuota,
    fetchedAt: new Date().toISOString(),
  };
}
