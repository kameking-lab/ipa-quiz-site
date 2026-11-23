import type { ChoiceKey, Question } from "@/lib/questions/types";

export interface Ot61PmScoringExclusion extends Omit<Question, "type" | "answer" | "officialAnswerNumber" | "requiredSelections" | "needsReview"> {
  type: "official-scoring-exclusion";
  gradable: false;
  answer: ChoiceKey[];
  officialAnswer: null;
  officialAnswerNumber: null;
  requiredSelectionsInOriginal: 1;
  officialScoringTreatment: { url: string; sha256: string; text: string; treatmentLiteral: string; reasonLiteral: string };
}

/** 原問・参考説明を保存し、クイズ採点集合から除外。 */
export const OT61_PM34_SCORING_EXCLUSIONS: Ot61PmScoringExclusion[] = [
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q34",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 34,
    "examDate": "2026-02-23",
    "type": "official-scoring-exclusion",
    "category": "臨床医学",
    "topicTags": [
      "Down症候群",
      "公式採点除外",
      "合併症"
    ],
    "difficulty": 3,
    "question": "Down 症候群の特徴的な合併症でないのはどれか。",
    "choices": {
      "ア": "近　視",
      "イ": "てんかん",
      "ウ": "外反扁平足",
      "エ": "環軸椎亜脱臼",
      "オ": "先天性心疾患"
    },
    "answer": [],
    "officialAnswerNumber": null,
    "explanation": "この問題は厚生労働省の通知により採点対象から除外され、公式正答表のB034も空欄である。理由は設問および選択肢が不十分とされたためで、正答を推定して補ってはならない。以下は選択肢に挙げられた合併症に関する参考説明であり、本問の正誤判定ではない。疾患で起こり得ることと、どの頻度で特徴的にみられるかという表現は区別する。通常の採点対象・クイズ出題集合には登録しない。",
    "choiceExplanations": {
      "ア": "参考説明。Down症候群では屈折異常などの眼科的問題がみられ、近視も起こり得る。公式が問題を採点対象から除外しているため、近視を本問の正答や誤答と決めつけない。",
      "イ": "参考説明。Down症候群ではてんかんが合併することがあり、年齢に応じて発作型や背景も異なる。起こり得る合併症であることから本問の正誤を補作することはしない。",
      "ウ": "参考説明。関節の弛緩や筋緊張の低下に関連して外反扁平足などの足部の問題を呈することがある。採点除外となった本問では、この肢の正誤を公式正答として扱わない。",
      "エ": "参考説明。環軸椎の不安定性はDown症候群で留意すべき整形外科的問題である。首の症状や神経症状の評価が重要となるが、本問の唯一の正答を推定する根拠にはしない。",
      "オ": "参考説明。Down症候群には房室中隔欠損などの先天性心疾患が合併し得る。医学的な参考情報と採点上の判定を分け、採点除外の公式決定を優先する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken08_09/dl/OT_PM34.pdf",
      "https://www.nichd.nih.gov/health/topics/down/conditioninfo/associated"
    ],
    "gradable": false,
    "officialAnswer": null,
    "requiredSelectionsInOriginal": 1,
    "officialScoringTreatment": {
      "url": "https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken08_09/dl/OT_PM34.pdf",
      "sha256": "dda2e19f4e2518bff910696ff8d211efc8b97757521eca4bffe12ea64073fc1d",
      "text": "第\n（　採点上の取り扱い　）\n採点対象から除外する。\n（　理　由　）\n設問および選択肢が不十分なため。\n（別　紙）\n午後\n34 問\n第61回作業療法士国家試験における採点除外等の取扱いをした問題について\n",
      "treatmentLiteral": "採点対象から除外する。",
      "reasonLiteral": "設問および選択肢が不十分なため。"
    }
  }
];
