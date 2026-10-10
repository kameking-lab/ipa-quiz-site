import type { Question } from "@/lib/questions/types";

/** Official114th afternoon Q90; source-verified fixture, registry unchanged. */
export const nurseDecimalQuestion: Question = {
  "id": "kangoshi-2024-annual-pm-q90",
  "exam": "kangoshi",
  "session": "pm",
  "year": 2024,
  "season": "annual",
  "qNumber": 90,
  "subject": "午後（一般問題）",
  "category": "一般問題",
  "topicTags": [
    "一般問題",
    "第114回"
  ],
  "difficulty": 2,
  "question": "身長160cm、体重60kgの成人の体格指数〈BMI〉を求めよ。\nただし、小数点以下の数値が得られた場合には、小数点以下第2位を四捨五入すること。",
  "explanationCoverage": "full",
  "hasImage": false,
  "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-05c_01.pdf#page=35",
  "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-05seitou.pdf#page=1",
  "sourceAttribution": "出典：厚生労働省『第114回看護師国家試験』午後 問90（問題・正答）。問題文・選択肢は原典と照合。解説は過去問AIが独自に作成したもので、厚生労働省とは関係ありません。",
  "officialReferenceUrls": [
    "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp250428-03_04_05.html"
  ],
  "license": "MHLW-attributed",
  "lastUpdated": "2026-10-10",
  "type": "numeric",
  "officialAnswerNumber": "23.4",
  "answer": "23.4",
  "numericAnswer": {
    "format": "decimal",
    "precision": 1,
    "unit": "BMI"
  },
  "explanation": "BMI＝体重(kg)÷身長(m)²です。身長160cm＝1.60m、体重60kgなので、BMI＝60/(1.60^2)＝60/2.56＝23.4375となります。問題文の指示により小数点以下第2位を四捨五入すると23.4です。公式解答シートでは数字2、3、4として記入します。",
  "needsReview": false
};
