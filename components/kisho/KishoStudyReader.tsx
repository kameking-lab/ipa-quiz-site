"use client";
import { KishoReader } from "./KishoReader";
import { resolveKishoStudyImage, KISHO_STUDY_QUESTIONS, KISHO_STUDY_ASSETS } from "@/lib/kisho-study";
export function KishoStudyReader({ initialQuestionId }: { initialQuestionId: string }) {
  return <KishoReader questions={KISHO_STUDY_QUESTIONS} assets={KISHO_STUDY_ASSETS} study initialQuestionId={initialQuestionId} resolvePrivateImage={resolveKishoStudyImage} />;
}
