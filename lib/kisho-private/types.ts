export type KishoSession = "ippan" | "senmon" | "pm1" | "pm2";

export interface RawQuestion {
  id: string;
  exam: "kisho";
  session: KishoSession;
  qNumber: number;
  type: "multiple-choice" | "descriptive";
  question: string;
  choices?: Record<string, string>;
  answer: string;
  officialAnswerNumber?: string;
  explanation: string;
  choiceExplanations?: Record<string, string>;
  modelAnswer?: string;
  scoringCriteria?: string;
  license: string;
  [key: string]: unknown;
}

export interface RawField {
  questionId: string;
  field: string;
  path?: string;
  prompt?: string;
  officialAnswer: string;
  explanation: string;
}

export interface RawCombined {
  status: string;
  publicationAllowed: false;
  questions: RawQuestion[];
  answerFields: RawField[];
  [key: string]: unknown;
}

export interface PageReference {
  sourcePdf: string;
  physicalPage: number;
  assetId: string;
  preparedPath: string;
  private: true;
}

export interface ImageAsset {
  assetId: string;
  preparedPath: string;
  sha256: string;
  width: number;
  height: number;
  sourcePdf?: string;
  physicalPage?: number;
  kind: string;
  private: true;
}

export interface SourceQuestion {
  questionId: string;
  round: 65 | 66;
  session: KishoSession;
  qNumber: number;
  questionPages: PageReference[];
  officialAnswerPages: PageReference[];
  figurePages: PageReference[];
  drawingAnswers: unknown[];
  imageAssetIds: string[];
  private: true;
  rightsPermissionVerified: false;
}

export interface SourceField {
  questionId: string;
  field: string;
  officialAnswer: string;
  officialAnswerPages: PageReference[];
  officialAnswerImageAssetId: string | null;
  private: true;
}

export interface SourceManifest {
  schemaVersion: 1;
  publicationAllowed: false;
  questions: SourceQuestion[];
  answerFields: SourceField[];
  assets: ImageAsset[];
}

export interface PrivateQuestion {
  raw: RawQuestion;
  source: SourceQuestion;
  fields: readonly { raw: RawField; source: SourceField }[];
  publicationAllowed: false;
  publicGo: false;
}

export type ImageResolver = (asset: ImageAsset) => string;
