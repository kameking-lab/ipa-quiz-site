import { PurchaseStatus } from "../PurchaseStatus";
export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return <><h1 className="text-2xl font-bold">購入状況</h1><PurchaseStatus order={order ?? ""} /></>;
}
