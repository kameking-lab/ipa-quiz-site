import { PurchaseStatus } from "../PurchaseStatus";
import { billingTelemetryTestMode } from "@/lib/billing/telemetry-context";
export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return <PurchaseStatus order={order ?? ""} testMode={billingTelemetryTestMode()} />;
}
