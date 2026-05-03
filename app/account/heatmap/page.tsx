import { redirect } from "next/navigation";

export default function HeatmapPage() {
  redirect("/account/dashboard?tab=overview");
}
