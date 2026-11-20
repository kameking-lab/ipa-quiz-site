import studyData from '@/data/questions/kisho/study-data.json';
import { KISHO_HISTORICAL_ROUNDS } from "@/data/questions/kisho/history";
import type { ImageAsset, PrivateQuestion } from '@/lib/kisho-private/types';
export const KISHO_STUDY_QUESTIONS: readonly Pick<PrivateQuestion, 'raw' | 'source' | 'fields'>[] = [
  ...(studyData.questions as unknown as Pick<PrivateQuestion, 'raw' | 'source' | 'fields'>[]),
  ...KISHO_HISTORICAL_ROUNDS.flatMap(round => round.practical),
];
export const KISHO_STUDY_ASSETS = new Map(
  [...(studyData.assets as ImageAsset[]), ...KISHO_HISTORICAL_ROUNDS.flatMap(round => round.assets)]
    .map(asset => [asset.assetId, asset]),
);
export function resolveKishoStudyImage(asset: Pick<ImageAsset, 'assetId'>): string {
  const found = KISHO_STUDY_ASSETS.get(asset.assetId);
  if (!found) throw new Error('Unknown source image');
  return found.preparedPath;
}
