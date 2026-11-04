import studyData from '@/data/questions/kisho/study-data.json';
import type { ImageAsset, PrivateQuestion } from '@/lib/kisho-private/types';
export const KISHO_STUDY_QUESTIONS = studyData.questions as unknown as readonly Pick<PrivateQuestion, 'raw' | 'source' | 'fields'>[];
export const KISHO_STUDY_ASSETS = new Map((studyData.assets as ImageAsset[]).map(asset => [asset.assetId, asset]));
export function resolveKishoStudyImage(asset: Pick<ImageAsset, 'assetId'>): string {
  const found = KISHO_STUDY_ASSETS.get(asset.assetId);
  if (!found) throw new Error('Unknown source image');
  return found.preparedPath;
}
