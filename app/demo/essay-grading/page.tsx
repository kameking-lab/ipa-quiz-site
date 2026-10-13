import { redirect } from "next/navigation";

// The former grading sample used an independently written prompt and answer.
// Keep its historical source in Git, while routing visitors to official IPA papers.
export default function EssayGradingDemoPage() {
  redirect("/essay");
}
