import { redirect } from "next/navigation";

// 旧・独自論述教材のURL。原稿は保管し、公開先は公式過去問案内へ集約する。
export default function EssaysExamPage() {
  redirect("/essay");
}
