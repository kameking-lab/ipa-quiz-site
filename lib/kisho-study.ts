import round64 from '@/data/questions/kisho/round-64.json';
import studyData from '@/data/questions/kisho/study-data.json';
import type { ImageAsset, PrivateQuestion } from '@/lib/kisho-private/types';
export const KISHO_STUDY_QUESTIONS = [...studyData.questions, ...round64.questions] as unknown as readonly Pick<PrivateQuestion, 'raw' | 'source' | 'fields'>[];
export const KISHO_STUDY_ASSETS = new Map(([...studyData.assets, ...round64.assets] as ImageAsset[]).map(asset => [asset.assetId, asset]));
export function resolveKishoStudyImage(asset: Pick<ImageAsset, 'assetId'>): string {
  const found = KISHO_STUDY_ASSETS.get(asset.assetId);
  if (!found) throw new Error('Unknown source image');
  return found.preparedPath;
}
