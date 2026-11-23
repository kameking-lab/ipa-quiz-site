import { petNextStageProgress } from "@/lib/pet/v1/growth";

export function PetStageProgress({ progress }: { progress: ReturnType<typeof petNextStageProgress> }) {
  if (progress?.stage !== "expert") return null;
  return <span aria-label="専門家への歩み">専門家への歩み {progress.parts.map(part => `${part.now}/${part.goal}${part.unit}`).join("・")}</span>;
}
