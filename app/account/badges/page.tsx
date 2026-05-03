import { redirect } from "next/navigation";

export default function BadgesPage() {
  redirect("/account/dashboard?tab=badges");
}
