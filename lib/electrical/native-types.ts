export type ElectricalNativeSlot = (
  | { slot: number; officialAnswer: string; explanation: string; derivation: string; officialDefinition?: never; officialUnit?: never }
  | { slot: number; officialDefinition: string; officialUnit: string; explanation: string; derivation: string; officialAnswer?: never }
) & { prompt?: string; choiceExplanations?: Record<string, string> };

export type ElectricalNativeQuestion = {
  id: string;
  year: number;
  examDate: string;
  subject: "theory" | "power" | "machine" | "law";
  number: number;
  topic: string;
  questionText: string;
  choiceGroups: Record<string, string> | Record<string, Record<string, string>>;
  slots: ElectricalNativeSlot[];
  figures: string[];
  sourcePages: { physicalPage: number; url: string; sha256: string }[];
  sourcePdfUrl: string;
  alternateQuestionRule: string | null;
};

export type ElectricalNativeReaderConfig = {
  examName: string;
  examPath: "/denken1" | "/denken2" | "/denken3";
  editionSlug?: string;
  editionLabel?: string;
  sourceAnswerUrl: string;
  sourceIndexUrl: string;
  lawReferenceDate?: string;
};
