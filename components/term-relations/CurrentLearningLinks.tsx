import { currentLearningRelations } from "@/lib/term-relations/current";
import type { RelationResource } from "@/lib/term-relations/model.mjs";
import { CuratedLearningLinks } from "./CuratedLearningLinks";

export function CurrentLearningLinks({ origin, placement, headingId }: {
  origin: Pick<RelationResource, "kind" | "id">; placement?: string; headingId: string;
}) {
  const result = currentLearningRelations(origin, placement);
  if (!result || result.groups.length === 0) return null;
  return <CuratedLearningLinks result={result} headingId={headingId} />;
}
