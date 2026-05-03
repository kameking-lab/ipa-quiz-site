import { redirect } from "next/navigation";

export default function TutorPage() {
  redirect("/account/dashboard?tab=tutor");
}
