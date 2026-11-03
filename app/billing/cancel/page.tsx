import { PurchaseStatus } from "../PurchaseStatus";
export default async function CancelPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return <PurchaseStatus order={order ?? ""} canceled />;
}
