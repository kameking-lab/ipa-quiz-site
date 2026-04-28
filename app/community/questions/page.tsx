import type { Metadata } from "next";
import { COMMUNITY_QUESTIONS_SEED } from "@/data/community";
import { CommunityQuestionsClient } from "./CommunityQuestionsClient";

export const metadata: Metadata = {
  title: "質問掲示板｜過去問AI コミュニティ",
  description:
    "IPA 情報処理技術者試験 13 区分の受験者・合格者が集まる質問掲示板。午後選択の戦略、勉強時間、参考書選びなどリアルな悩みをシェアできます。",
  alternates: { canonical: "/community/questions" },
};

export default function CommunityQuestionsPage() {
  return <CommunityQuestionsClient seedPosts={COMMUNITY_QUESTIONS_SEED} />;
}
