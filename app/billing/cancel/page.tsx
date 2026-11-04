import { PurchaseStatus } from "../PurchaseStatus";
import { billingTelemetryTestMode } from "@/lib/billing/telemetry-context";
export default async function CancelPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return <PurchaseStatus order={order ?? ""} canceled testMode={billingTelemetryTestMode()} />;
}
