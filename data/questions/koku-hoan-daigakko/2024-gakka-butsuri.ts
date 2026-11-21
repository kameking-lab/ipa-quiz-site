import type { Question } from "@/lib/questions/types";

export const KOKU_HOAN_DAIGAKKO_2024_GAKKA_BUTSURI: Question[] = [
  {
    "id": "koku-hoan-daigakko-2024-annual-gakka-butsuri-q27",
    "exam": "koku-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "水平投射と速さ",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、水面からの高さが20 mの崖の上から水平方向に速さ15 m/sで小球を投げ出した。水面に達する直前の小球の速さとして最も妥当なのはどれか。\nただし、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "15 m/s",
      "イ": "20 m/s",
      "ウ": "25 m/s",
      "エ": "30 m/s",
      "オ": "35 m/s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "重力で得る鉛直速度の大きさは √(2 × 10 × 20) = 20 m/s である。水平成分は15 m/sなので、二乗和の平方根 √(15² + 20²) = 25 m/s となる。",
    "choiceExplanations": {
      "ア": "15 m/s は一定の水平方向の速度であり、水面に達する直前には下向きの速度成分も加わる。",
      "イ": "20 m/s は20 m落下して得た鉛直方向の速さであり、水平方向の15 m/sも含めて速さを求める。",
      "ウ": "重力で得る鉛直速度の大きさは √(2 × 10 × 20) = 20 m/s である。水平成分は15 m/sなので、二乗和の平方根 √(15² + 20²) = 25 m/s となる。",
      "エ": "水平と鉛直の速度成分は互いに直角で、成分の二乗和が 625 (m/s)² であるため、速さは30 m/sには達しない。",
      "オ": "35 m/s は二成分の大きさを直接足した値である。互いに直角な成分なので、二乗を足してから平方根を取る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010612.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010612.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2024/gakka-butsuri/q27.webp"
    ],
    "imageAltTexts": [
      "水面から高さ20 mの崖から投げ出した小球の軌道"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2024-annual-gakka-butsuri-q32",
    "exam": "koku-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "つり下げたばねの単振動",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、軽いばねの先に質量 m の物体 A と質量 2m の物体 B を接合したものをつけて天井からつるすと、ばねは自然長から L だけ伸びてつり合った。この状態で、静かに B を切り離すと、A は鉛直方向に単振動をした。この単振動の周期として最も妥当なのはどれか。\nただし、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "2π√(L/(3g))",
      "イ": "2π√(L/(2g))",
      "ウ": "2π√(L/g)",
      "エ": "2π√(2L/g)",
      "オ": "2π√(3L/g)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "初期のつり合いから kL = (m + 2m)g = 3mg となる。B を切り離した後に振動するのは A だけなので、周期は 2π√(m/k) = 2π√(L/(3g)) である。",
    "choiceExplanations": {
      "ア": "初期のつり合いから kL = (m + 2m)g = 3mg となる。B を切り離した後に振動するのは A だけなので、周期は 2π√(m/k) = 2π√(L/(3g)) である。",
      "イ": "伸び L を決める重力は 2mg ではなく、A と B の合計の重力 3mg である。",
      "ウ": "この値は質量 3m がばねについたまま振動する場合の周期であり、切り離した後は質量 m だけが動く。",
      "エ": "ばね定数は最初の全荷重 3mg を L で割って求め、振動に使う質量は m であるため、平方根の中は 2L/g にはならない。",
      "オ": "物体 A の新しいつり合い位置は自然長から L/3 の位置であり、周期の根号内には 3L/g ではなく L/(3g) が入る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010612.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010612.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2024/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "天井のばねに質量 m の物体 A と質量 2m の物体 B をつるした状態"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2024-annual-gakka-butsuri-q37",
    "exam": "koku-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "点電荷と電位の重ね合わせ",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、xy 平面の原点 O から距離 d だけ離れた x 軸上の2点 A(d, 0) 及び B(−d, 0) に、次の㋐、㋑のように電荷を固定したとき、y 軸上における位置 y と電位 V との関係を表すグラフを図Ⅱから選び出したものの組合せとして最も妥当なのはどれか。\nただし、電位は無限遠を基準とする。\n㋐ A 及び B に正の点電荷 Q (Q > 0) をそれぞれ固定する。\n㋑ A に正の点電荷 Q (Q > 0) を、B に負の点電荷 −Q (Q > 0) をそれぞれ固定する。",
    "choices": {
      "ア": "①／②",
      "イ": "①／③",
      "ウ": "②／③",
      "エ": "③／①",
      "オ": "③／②"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "y 軸上の各点から A、B までの距離は等しく √(d² + y²) である。㋐は正の寄与が足されて原点で最大となる①、㋑は正負の寄与が打ち消し合う③になる。",
    "choiceExplanations": {
      "ア": "㋐には①が合うが、㋑では y 軸上の各点が二電荷から等距離なので電位は0となり、負にはならない。",
      "イ": "y 軸上の各点から A、B までの距離は等しく √(d² + y²) である。㋐は正の寄与が足されて原点で最大となる①、㋑は正負の寄与が打ち消し合う③になる。",
      "ウ": "㋑には③が合うが、㋐では二つの正電荷の電位の和が負になることはない。",
      "エ": "㋐では正電位が加わり、㋑では等距離の正負の電位が打ち消し合うので、グラフの対応が逆である。",
      "オ": "㋐は y 軸上で電位が正、㋑は y 軸上全体で0であるため、この二つのグラフはどちらも合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010612.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010612.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2024/gakka-butsuri/q37-1.webp",
      "/questions/koku-hoan-daigakko/2024/gakka-butsuri/q37-2.webp"
    ],
    "imageAltTexts": [
      "図Ⅰ。A、B に同符号または異符号の電荷を配置した二つの図",
      "図Ⅱ。y 軸上の電位 V の候補グラフ①～③"
    ]
  }
];
