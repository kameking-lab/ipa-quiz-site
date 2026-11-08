import MonthlyPage from "./MonthlyPage";

/** The adopted monthly offer remains visible independently of sales flags. */
export default async function BillingPage({ searchParams }: { searchParams: Promise<{ returnTo?: string | string[] }> }) {
  const { returnTo } = await searchParams;
  return MonthlyPage({ returnTo: typeof returnTo === "string" ? returnTo : undefined });
}
