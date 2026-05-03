import { redirect } from "next/navigation";

export default function WeaknessRedirectPage() {
  redirect("/quiz?mode=weakness&exam=ap");
}
