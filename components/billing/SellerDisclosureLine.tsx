import { monthlySellerDisclosure } from "@/lib/billing/subscription/public-offer";

/**
 * 特定商取引法 第11条ただし書: the seller's name, address and phone number are
 * disclosed without delay on request. Buying does not require asking first.
 */
export function SellerDisclosureLine({ className }: { className?: string }) {
  const seller = monthlySellerDisclosure();
  return <p className={className}>販売者の氏名・住所・電話番号は、ご請求があれば遅滞なく開示します（請求先: <a className="underline underline-offset-2" href={seller.requestPath}>お問い合わせ</a>）。</p>;
}
