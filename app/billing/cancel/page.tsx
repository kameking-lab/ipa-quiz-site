import { PurchaseStatus } from "../PurchaseStatus";
export default async function CancelPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return <><h1 className="text-2xl font-bold">購入画面から戻りました</h1><p>この操作で新しい請求や履歴の削除は行いません。別のタブで支払いを完了した場合は、下の購入状況をご確認ください。</p><PurchaseStatus order={order ?? ""} /></>;
}
