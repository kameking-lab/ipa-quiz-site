import type { Question } from "@/lib/questions/types";

export const KOKU_HOAN_DAIGAKKO_2023_GAKKA_SUGAKU: Question[] = [
  {
    "id": "koku-hoan-daigakko-2023-annual-gakka-sugaku-q05",
    "exam": "koku-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "互いに素な整数の個数",
      "航空情報科・航空電子科"
    ],
    "difficulty": 3,
    "question": "1以上250以下の整数で、250と互いに素（最大公約数が1）であるものは全部でいくつあるか。",
    "choices": {
      "ア": "50個",
      "イ": "75個",
      "ウ": "100個",
      "エ": "125個",
      "オ": "150個"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "250 = 2 × 5³ なので、2でも5でも割り切れない整数を数えればよい。包除原理より 250 − 125 − 50 + 25 = 100 個である。",
    "choiceExplanations": {
      "ア": "50個は5の倍数の個数であり、250と互いに素な整数を数えるには、さらに2の倍数を除き、重複を調整する。",
      "イ": "除くべきなのは2または5の倍数であり、2の倍数125個と5の倍数50個の両方に入る10の倍数は25個なので一度だけ除く。",
      "ウ": "250 = 2 × 5³ なので、2でも5でも割り切れない整数を数えればよい。包除原理より 250 − 125 − 50 + 25 = 100 個である。",
      "エ": "125個は奇数全体の数であり、そのうち5の倍数である25個をさらに除く必要がある。",
      "オ": "150個は2または5で割り切れる整数の個数であり、求めるのは全250個からそれを除いた個数である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 航空保安大学校学生採用試験 学科試験（多肢選択式・数学）」No. 5。解説は過去問AIの独自作成。"
  }
];
