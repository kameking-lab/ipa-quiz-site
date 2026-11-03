import type { ChoiceKey } from "@/lib/questions/types";

/** An officially excluded original is deliberately not a gradable Question. */
export interface OfficialScoringExclusion {
  id: string; exam: "sagyo-ryohoshi"; session: "am" | "pm";
  year: number; season: "annual"; qNumber: number;
  type: "official-scoring-exclusion"; gradable: false;
  question: string; choices: Partial<Record<ChoiceKey, string>>;
  officialAnswer: null; officialAnswerNumber: null; answer: [];
  requiredSelectionsInOriginal: number; explanation: string;
  sourcePdfUrl: string; sourceAnswerUrl: string; sourceAttribution: string;
  license: "MHLW-attributed"; lastUpdated: string;
  officialScoringTreatment: { url: string; sha256: string; treatmentLiteral: string; reasonLiteral: string };
}

export const OT13_OFFICIAL_EXCLUSIONS: OfficialScoringExclusion[] = [
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q98",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 98,
    "question": "統合失調症の陽性症状はどれか。2 つ選べ。",
    "choices": {
      "ア": "快感消失",
      "イ": "会話の貧困",
      "ウ": "幻　覚",
      "エ": "注意の障害",
      "オ": "連合弛緩"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "type": "official-scoring-exclusion",
    "gradable": false,
    "officialAnswer": null,
    "officialAnswerNumber": null,
    "answer": [],
    "requiredSelectionsInOriginal": 2,
    "explanation": "厚生労働省の公式通知は、この問を「採点対象から除外する。」とし、理由を「選択肢に不適切があるため。」と明記している。公式正答表の該当セルも空欄である。正答や各肢の正誤は補作せず、通常の採点対象には含めない。",
    "officialScoringTreatment": {
      "url": "https://www.mhlw.go.jp/general/sikaku/successlist/2025/siken08_09/dl/kyoutu_PM98.pdf",
      "sha256": "5b8a499bf2e49c9eab4db8d24e5ff9de218391c34af5cc5f4fd617bb049e8375",
      "treatmentLiteral": "採点対象から除外する。",
      "reasonLiteral": "選択肢に不適切があるため。"
    },
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-am-q42",
    "exam": "sagyo-ryohoshi",
    "session": "am",
    "year": 2025,
    "season": "annual",
    "qNumber": 42,
    "question": "成人期において精神年齢が12 歳なのはどれか。",
    "choices": {
      "ア": "境界知能〈境界レベル〉",
      "イ": "軽度知的障害",
      "ウ": "中等度知的障害",
      "エ": "重度知的障害",
      "オ": "最重度知的障害"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09a_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午前）",
    "license": "MHLW-attributed",
    "type": "official-scoring-exclusion",
    "gradable": false,
    "officialAnswer": null,
    "officialAnswerNumber": null,
    "answer": [],
    "requiredSelectionsInOriginal": 1,
    "explanation": "厚生労働省の公式通知は、この問を「採点対象から除外する。」とし、理由を「問題として不適切であるため。」と明記している。公式正答表の該当セルも空欄である。正答や各肢の正誤は補作せず、通常の採点対象には含めない。",
    "officialScoringTreatment": {
      "url": "https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken08_09/dl/OT_AM42.pdf",
      "sha256": "c6e9aff3526abf67b22cbf0b2663ed568790e2ffdd0869cb45ca29a5e6582008",
      "treatmentLiteral": "採点対象から除外する。",
      "reasonLiteral": "問題として不適切であるため。"
    },
    "lastUpdated": "2026-10-11"
  }
];
