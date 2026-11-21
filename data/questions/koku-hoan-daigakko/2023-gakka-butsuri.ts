import type { Question } from "@/lib/questions/types";

export const KOKU_HOAN_DAIGAKKO_2023_GAKKA_BUTSURI: Question[] = [
  {
    "id": "koku-hoan-daigakko-2023-annual-gakka-butsuri-q30",
    "exam": "koku-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "衝突と反発係数",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "滑らかな水平面内にある直線上で、右向きに速さ v で進む質量 2m の小球 A が、静止していた質量 3m の小球 B に衝突し、衝突後、A と B はそれぞれ右向きに進んだ。衝突後の A の速さが v/5 であったとき、A と B の間の反発係数として最も妥当なのはどれか。",
    "choices": {
      "ア": "1/6",
      "イ": "1/5",
      "ウ": "1/4",
      "エ": "1/3",
      "オ": "1/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "運動量保存 2mv = 2m(v/5) + 3mv_B から v_B = 8v/15 である。衝突後に離れる速さは v/3、衝突前に近づく速さは v なので、反発係数は1/3となる。",
    "choiceExplanations": {
      "ア": "衝突後の相対速度の大きさは 8v/15 − v/5 = v/3 なので、衝突前の接近速度 v で割ると1/6にはならない。",
      "イ": "1/5 は A の速さの衝突前後の比であり、反発係数には二球間の相対速度の比を使う。",
      "ウ": "運動量保存から衝突後の B の速さは 8v/15 と求まるため、二球が離れる速さは v/4 にならない。",
      "エ": "運動量保存 2mv = 2m(v/5) + 3mv_B から v_B = 8v/15 である。衝突後に離れる速さは v/3、衝突前に近づく速さは v なので、反発係数は1/3となる。",
      "オ": "衝突後の A と B の速さの差は v/2 より小さく、これを衝突前の差 v で割って反発係数を求める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "koku-hoan-daigakko-2023-annual-gakka-butsuri-q32",
    "exam": "koku-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "円運動と静止摩擦の限界",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、中心軸のまわりに回転する水平で粗い円板の、中心から r だけ離れたところに質量 m の小物体を置いた。円板の角速度を徐々に大きくしていくと、角速度がある値より大きくなったときに小物体は滑り出した。このときの円板の周期として最も妥当なのはどれか。\nただし、小物体と円板との間の静止摩擦係数を μ、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "(1/(2π))√(r/(μg))",
      "イ": "(1/(2π))√(μg/r)",
      "ウ": "2π√(μgr)",
      "エ": "2π√(r/(μg))",
      "オ": "2π√(μg/r)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "滑り出す直前には最大静止摩擦力 μmg が向心力 mrω² に等しい。ω = √(μg/r) なので、一周の周期は 2π/ω = 2π√(r/(μg)) になる。",
    "choiceExplanations": {
      "ア": "円板が一周するときの回転角は 2π なので、角速度の逆数に 2π を掛けて周期を求める。",
      "イ": "この式は滑り始めの角速度を 2π で割った回転数であり、周期はその逆数である。",
      "ウ": "√(μgr) は滑り始めの接線方向の速さであり、周期は円周 2πr をその速さで割って求める。",
      "エ": "滑り出す直前には最大静止摩擦力 μmg が向心力 mrω² に等しい。ω = √(μg/r) なので、一周の周期は 2π/ω = 2π√(r/(μg)) になる。",
      "オ": "√(μg/r) は角速度で、周期を求めるときはその逆数を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2023/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "水平な回転円板と中心から距離 r にある質量 m の小物体"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2023-annual-gakka-butsuri-q37",
    "exam": "koku-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "電磁波の波長と用途",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "電磁波に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 電波は、波長が 0.1 mm 以上であり、波長に応じて、ラジオやテレビ放送、航空機の管制などに利用されている。\n㋑ 紫外線は、可視光線よりも波長が長く、物体を温めるはたらきがある。また、リモコンにも利用されている。\n㋒ X 線は、可視光線よりも波長が短く、レントゲン検査のほか、物体の内部や結晶構造の解析に利用されている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "電波は放送や管制通信に使われ、X線は可視光より波長が短く、透過像や回折による構造解析に用いられる。紫外線は可視光より短波長なので㋑は除く。",
    "choiceExplanations": {
      "ア": "㋐は妥当だが、可視光より長波長で一般的なリモコンに使われるのは赤外線なので、㋑は妥当でない。",
      "イ": "電波は放送や管制通信に使われ、X線は可視光より波長が短く、透過像や回折による構造解析に用いられる。紫外線は可視光より短波長なので㋑は除く。",
      "ウ": "紫外線は可視光線の紫側よりも短波長であり、㋑は紫外線と赤外線の特徴を取り違えている。",
      "エ": "X線の説明は妥当だが、リモコンでよく用いられる赤外線は可視光より長波長であり、紫外線ではない。",
      "オ": "X線だけでなく、波長0.1 mm以上に相当する周波数3 THz以下の電波が放送や航空管制に用いられるとする㋐も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "koku-hoan-daigakko-2023-annual-gakka-butsuri-q39",
    "exam": "koku-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "一様電場と電位差・仕事",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "電位差と仕事に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、一様な電場 E の中で、電気量 q の正電荷を点 A に静かに置いたところ、正電荷は静電気力を受けて移動し、距離 d だけ離れた点 B に達した。このとき、AB 間の電位差は［㋐］であり、正電荷が A から B に達するまでに静電気力がした仕事は［㋑］である。」",
    "choices": {
      "ア": "Ed／qEd",
      "イ": "Ed／Ed/q",
      "ウ": "E/d／qEd",
      "エ": "E/d／Ed/q",
      "オ": "E/d／qE/d"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "電場の向きに距離 d だけ離れると電位は Ed だけ下がる。電場が電荷に及ぼす力 qE と変位 d は同じ向きなので、仕事は qEd となる。",
    "choiceExplanations": {
      "ア": "電場の向きに距離 d だけ離れると電位は Ed だけ下がる。電場が電荷に及ぼす力 qE と変位 d は同じ向きなので、仕事は qEd となる。",
      "イ": "電位差 Ed は合うが、同じ電場・変位でも電荷が大きいほど力は大きいので、仕事は q で割らずに掛ける。",
      "ウ": "仕事の式は合っているが、一様な電場による電位差は電場の大きさに距離を掛けて求める。",
      "エ": "電位差は E に d を掛け、仕事はその電位差に q を掛けるため、どちらも距離や電荷で割る形にはならない。",
      "オ": "電位差は一様な電場の線積分の大きさ Ed であり、静電気力の仕事も距離が大きいほど増える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010545.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2023/gakka-butsuri/q39.webp"
    ],
    "imageAltTexts": [
      "右向きの一様な電場と、距離 d を隔てた点 A、B"
    ]
  }
];
