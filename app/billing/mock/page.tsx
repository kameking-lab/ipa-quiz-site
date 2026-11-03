import { notFound } from "next/navigation";
import { billingConfig } from "@/lib/billing/config";
import { MockCheckout } from "./MockCheckout";
export default async function MockPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  if (billingConfig().mode !== "mock") notFound();
  const { order } = await searchParams;
  return <><h1 className="text-2xl font-bold">ローカル模擬決済</h1><MockCheckout order={order ?? ""} /></>;
}
