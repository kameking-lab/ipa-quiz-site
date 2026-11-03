import type { Question } from "@/lib/questions/types";

/** Official 115th morning Q90; fixture only, not a published question. */
export const nurseNumericQuestion: Question = {
  "id": "kangoshi-2025-annual-am-q90",
  "exam": "kangoshi",
  "session": "am",
  "year": 2025,
  "season": "annual",
  "qNumber": 90,
  "type": "numeric",
  "numericAnswer": {
    "format": "integer",
    "unit": "滴/分"
  },
  "category": "基礎看護学",
  "topicTags": [
    "点滴",
    "滴下数"
  ],
  "difficulty": 2,
  "question": "1,500mLの輸液を朝6時から18時にかけて点滴静脈内注射で実施する。20滴で1mLの輸液セットを用いた場合の1分間の滴下数を求めよ。ただし、小数点以下の数値が得られた場合には、小数点以下第1位を四捨五入すること。",
  "answer": "42",
  "explanation": "総滴下数は1,500mL×20滴/mL＝30,000滴。時間は6時から18時の12時間＝720分。30,000÷720＝41.67…で、小数点以下第1位を四捨五入すると42滴/分となる。",
  "hasImage": false,
  "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-05a_01.pdf",
  "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-05seitou.pdf",
  "sourceAttribution": "第115回看護師国家試験 午前問題90（厚生労働省）",
  "license": "MHLW-attributed",
  "isCalculation": true
};
