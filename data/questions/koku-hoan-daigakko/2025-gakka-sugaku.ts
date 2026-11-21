import type { Question } from "@/lib/questions/types";

export const KOKU_HOAN_DAIGAKKO_2025_GAKKA_SUGAKU: Question[] = [
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-sugaku-q04",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二次関数の頂点と通過点",
      "航空情報科・航空電子科"
    ],
    "difficulty": 3,
    "question": "q を定数とする。点 (2, q) を頂点とし、点 (−6, −14) を通り、y 軸との交点の y 座標が −5 である放物線をグラフとする2次関数が存在するとき、q はいくらか。",
    "choices": {
      "ア": "−8",
      "イ": "−5",
      "ウ": "−174/35",
      "エ": "−22/5",
      "オ": "21/10"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "頂点を用いて y = a(x − 2)² + q と書くと、64a + q = −14、4a + q = −5 である。差から a = −3/20、これを代入すると q = −22/5 となる。",
    "choiceExplanations": {
      "ア": "q = −8 なら y 軸との交点から a = 3/4 となり、x = −6 のときの y が −14 にならない。",
      "イ": "q = −5 とおくと y 軸との交点の条件から a = 0 となり、二次関数にならない。",
      "ウ": "x = −6 と x = 0 では頂点の x 座標2からの距離の二乗は64と4であり、係数の式の差は 60a = −9 になる。",
      "エ": "頂点を用いて y = a(x − 2)² + q と書くと、64a + q = −14、4a + q = −5 である。差から a = −3/20、これを代入すると q = −22/5 となる。",
      "オ": "q = 21/10 なら y 軸との交点から定まる a を使っても、点 (−6, −14) を通らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・数学）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-sugaku-q06",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "箱ひげ図とヒストグラム",
      "航空情報科・航空電子科"
    ],
    "difficulty": 3,
    "question": "右図は、ある地点 A、B のある月の日ごとの最高気温の分布を箱ひげ図で表したものである。このとき、地点 A、B のこの月の日ごとの最高気温の分布をヒストグラムで表したものの組合せとして正しいのは次のうちではどれか。",
    "choices": {
      "ア": "①／②",
      "イ": "①／③",
      "ウ": "②／①",
      "エ": "②／③",
      "オ": "③／①"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "A には 28 ℃台付近の外れ値と高温側の山があり、①の分布に合う。B はおおむね 30 ℃台前半を中心に分布し、外れ値が見られない②に合う。",
    "choiceExplanations": {
      "ア": "A には 28 ℃台付近の外れ値と高温側の山があり、①の分布に合う。B はおおむね 30 ℃台前半を中心に分布し、外れ値が見られない②に合う。",
      "イ": "①は A に対応するが、③は27 ℃台と36 ℃台に日数があり、B の箱ひげ図で示す範囲を外れる。",
      "ウ": "②は高温側の範囲が狭く、A の38 ℃を超える値を表せない。①は低い外れ値を含み、B の分布には合わない。",
      "エ": "②は B に対応する分布であり、③の27 ℃台の値も B の最小値より低い。",
      "オ": "③は気温の最小値が A の外れ値より低く、①は B の箱ひげ図の右端を超える高温の日を含む。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・数学）」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-sugaku/q06-1.webp",
      "/questions/koku-hoan-daigakko/2025/gakka-sugaku/q06-2.webp"
    ],
    "imageAltTexts": [
      "地点 A、B の日最高気温の箱ひげ図",
      "日最高気温の候補となる三つのヒストグラム①、②、③"
    ]
  }
];
