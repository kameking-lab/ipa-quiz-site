import studyData from '@/data/questions/kisho/study-data.json';
import { KISHO_HISTORICAL_ROUNDS } from "@/data/questions/kisho/history";
import round64 from "@/data/questions/kisho/round-64.json";
import type { ImageAsset, PrivateQuestion } from '@/lib/kisho-private/types';

type StudyQuestion = Pick<PrivateQuestion, "raw" | "source" | "fields">;

const round64Practical2 = round64.questions.filter((question) => question.raw.session === "pm2") as unknown as StudyQuestion[];
const round64Practical2Assets = new Set(round64Practical2.flatMap(({ source, fields }) => [
  ...source.imageAssetIds,
  ...[...source.questionPages, ...source.figurePages, ...source.officialAnswerPages].map((page) => page.assetId),
  ...fields.flatMap(({ source: field }) => [
    ...field.officialAnswerPages.map((page) => page.assetId),
    field.officialAnswerImageAssetId,
  ]),
]));

export const KISHO_STUDY_QUESTIONS: readonly StudyQuestion[] = [
  ...(studyData.questions as unknown as StudyQuestion[]),
  ...round64Practical2,
  ...KISHO_HISTORICAL_ROUNDS.flatMap(round => round.practical),
];
export const KISHO_STUDY_ASSETS = new Map(
  [
    ...(studyData.assets as ImageAsset[]),
    ...(round64.assets as ImageAsset[]).filter((asset) => round64Practical2Assets.has(asset.assetId)),
    ...KISHO_HISTORICAL_ROUNDS.flatMap(round => round.assets),
  ]
    .map(asset => [asset.assetId, asset]),
);
export function resolveKishoStudyImage(asset: Pick<ImageAsset, 'assetId'>): string {
  const found = KISHO_STUDY_ASSETS.get(asset.assetId);
  if (!found) throw new Error('Unknown source image');
  return found.preparedPath;
}
