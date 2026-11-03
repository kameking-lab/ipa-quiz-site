import type { Metadata } from "next";
export const metadata: Metadata = { title: "連続演習 月額プラン", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10">{children}</main>;
}
