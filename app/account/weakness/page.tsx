import { redirect } from "next/navigation";

export default function WeaknessPage() {
  redirect("/account/dashboard?tab=weakness");
}
