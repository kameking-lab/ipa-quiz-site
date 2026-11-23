import type { Metadata } from "next";
import { EssayWorkshopPreview } from "@/components/essay/EssayWorkshopPreview";

export const metadata: Metadata = {
  title: "プロジェクトマネージャの論文見本",
  robots: { index: false, follow: false },
};

export default function EssayWorkshopPreviewPage() {
  return <EssayWorkshopPreview />;
}
