import type { Question } from "@/lib/questions/types";

export const KISHO_DAIGAKKO_2023_GAKKA_BUTSURI: Question[] = [
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q27",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "自由落下と鉛直投げ上げの衝突"
    ],
    "difficulty": 3,
    "question": "地面から高さ h の位置から小球 A を自由落下させると同時に、その鉛直真下の地面から速さ v₀ で小球 B を鉛直に投げ上げたところ、A と B は高さ (2/3)h の位置で衝突した。v₀ として最も妥当なのはどれか。ただし、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "√(gh/2)",
      "イ": "√(2gh/3)",
      "ウ": "√(gh)",
      "エ": "2√(gh/3)",
      "オ": "√(3gh/2)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "A が h/3 落ちる時間は t＝√[2h/(3g)] である。両球の重力加速度が等しく、位置が一致するには v₀t＝h なので v₀＝√(3gh/2) となる。",
    "choiceExplanations": {
      "ア": "衝突点までに A が落下した距離は h/3 なので、時間は √[2h/(3g)] である。速度は二つの球の初めの間隔 h をこの時間で割る。",
      "イ": "√(2gh/3) は A が高さ h/3 を落ちたときの速さである。B の初速は A の落下速度そのものではない。",
      "ウ": "二つの球の相対加速度は0で、間隔 h を B の初速 v₀ で縮める。v₀＝√(gh) では、A が h/3 を落ちる時刻までに間隔を埋められない。",
      "エ": "二つの球が同じ高さになる時刻は、A の落下によって t＝√[2h/(3g)] と決まる。v₀ はこの時刻に v₀t＝h を満たす値である。",
      "オ": "A が h/3 落ちる時間は t＝√[2h/(3g)] である。両球の重力加速度が等しく、位置が一致するには v₀t＝h なので v₀＝√(3gh/2) となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q28",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "切り取った一様な板の重心"
    ],
    "difficulty": 3,
    "question": "xy 平面上に置いた図のような形の一様な平板の重心の座標 (x, y) として最も妥当なのはどれか。ただし、1目盛りの長さを1とする。",
    "choices": {
      "ア": "(−6/7, −1/7)",
      "イ": "(−6/7, 9/7)",
      "ウ": "(−2/7, −1/7)",
      "エ": "(−2/7, 1/7)",
      "オ": "(−2/7, 9/7)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "面積64、重心 (0, 0) の正方形から、面積4ずつで重心が (1, 1) と (3, −3) の部分を除く。残りの面積は56、一次モーメントは x 方向が −16、y 方向が8なので、重心は (−2/7, 1/7) である。",
    "choiceExplanations": {
      "ア": "全体の正方形から抜く二つの部分の重心の x 座標は 1 と3で、面積は各4である。残る図形の x 座標は −4(1＋3)/56＝−2/7 である。",
      "イ": "抜く部分は右上の正方形と右下隅の正方形である。負の面積で考えると y 方向の一次モーメントは −4×1−4×(−3)＝8 になる。",
      "ウ": "x 座標は正しいが、y 座標が負の右下から除いた面積の影響が大きいので、残る部分の y 座標は正になる。",
      "エ": "面積64、重心 (0, 0) の正方形から、面積4ずつで重心が (1, 1) と (3, −3) の部分を除く。残りの面積は56、一次モーメントは x 方向が −16、y 方向が8なので、重心は (−2/7, 1/7) である。",
      "オ": "x 座標は正しいが、y 座標は外した両部分の面積を考慮し、[−4×1−4×(−3)]/56＝1/7 となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "1目盛り1の xy 平面に置いた一様な平板。正方形の中央寄りと右下を切り取った形"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q29",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "定滑車で上がる皿の垂直抗力"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかに回転する軽い定滑車にかけた糸の一方に質量 M のおもり A を付け、もう一方に質量 2m の皿 B を付けてその上に質量 m の小物体 C を載せる。この状態で静かに放したところ、おもり A は下降し始めた。このとき、小物体 C が皿 B から受ける垂直抗力の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "2Mmg/(M＋3m)",
      "イ": "3Mmg/(M＋3m)",
      "ウ": "Mmg/(M＋2m)",
      "エ": "2Mmg/(M＋2m)",
      "オ": "Mmg/(M＋m)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "皿と小物体の合計質量は3mなので、A が下降するときの加速度の大きさは a＝(M−3m)g/(M＋3m) である。C に上向きの垂直抗力 N が働き N−mg＝ma より N＝2Mmg/(M＋3m) となる。",
    "choiceExplanations": {
      "ア": "皿と小物体の合計質量は3mなので、A が下降するときの加速度の大きさは a＝(M−3m)g/(M＋3m) である。C に上向きの垂直抗力 N が働き N−mg＝ma より N＝2Mmg/(M＋3m) となる。",
      "イ": "C の質量は m である。C が加速度 a で上がるのに必要な抗力は m(g＋a) である。",
      "ウ": "滑車の加速度を決める皿側の質量は、皿の 2m にその上の小物体の m を加えた3mである。",
      "エ": "分子の形は合っているが、系全体の加速される質量には皿の 2m と小物体の m がともに含まれ、分母は M＋3m となる。",
      "オ": "この式の分母は皿の質量 2m を含んでいない。皿と C は同じ加速度で上がるため、皿も含めた運動方程式を立てる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q29.webp"
    ],
    "imageAltTexts": [
      "定滑車に掛けた糸の左に質量 M のおもり、右に質量 m の物体を載せた質量 2m の皿"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q30",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "振り子同士の衝突と反発係数"
    ],
    "difficulty": 3,
    "question": "図のように、糸の先に質量 M のおもり A を付けた単振り子と、同じ長さの糸の先に質量 m のおもり B を付けた単振り子があり、それぞれ最下点で A と B が衝突するようにつり下げられている。B を最下点で静止させ、糸がたるまないようにして A を最下点から高さ H の位置まで持ち上げ静かに放したところ、A と B は衝突し、A ははね返り、B は最下点から高さ h の位置まで上がった。このとき、A と B との間の反発係数として最も妥当なのはどれか。",
    "choices": {
      "ア": "(m/M)√(h/H)",
      "イ": "(1＋m/M)√(h/H)",
      "ウ": "(1＋m/M)√(h/H)−1",
      "エ": "(1−m/M)√(h/H)＋1",
      "オ": "1−(1−m/M)√(h/H)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "A の衝突直前の速度は u＝√(2gH)、B の直後の速度は v＝√(2gh) である。運動量保存で A の直後の速度は u−(m/M)v となり、反発係数は [v−{u−(m/M)v}]/u＝(1＋m/M)√(h/H)−1 である。",
    "choiceExplanations": {
      "ア": "A の衝突直後の符号付き速度は u−(m/M)v である。反発係数には B の速度 v とこの速度との差を使う。",
      "イ": "(1＋m/M)√(h/H) は離れる相対速度と近づく相対速度の比を求める途中の項である。A の速度 u に由来する1を引く。",
      "ウ": "A の衝突直前の速度は u＝√(2gH)、B の直後の速度は v＝√(2gh) である。運動量保存で A の直後の速度は u−(m/M)v となり、反発係数は [v−{u−(m/M)v}]/u＝(1＋m/M)√(h/H)−1 である。",
      "エ": "衝突後に A がはね返るので、B と A の相対速度を計算する際は A の符号付きの速度を引く。この式では運動量保存から出る質量比の符号が合っていない。",
      "オ": "反発係数の分子は、A と B が離れる向きの相対速度である。近づく速さ u と離れる速さ (1＋m/M)v−u を取り違えないようにする。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q30.webp"
    ],
    "imageAltTexts": [
      "二つの振り子が最下点で衝突し、A は最下点より H の高さから、B は衝突後に h の高さまで移動"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q31",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ループ最上点で接触を保つ最小速度"
    ],
    "difficulty": 3,
    "question": "図のように、鉛直面内で半径 r の円形のループを含む滑らかなレールの内側に沿って、小球を滑らせて運動させる。ループの最下点より高さ r の地点から、レールに沿って図の向きに初速度 v₀ を与えて小球を滑らせるとき、小球がレールから離れないでループを一周するために最低限必要な v₀ の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "√(gr)",
      "イ": "√(2gr)",
      "ウ": "√(3gr)",
      "エ": "2√(gr)",
      "オ": "√(5gr)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最上点で垂直抗力が0となる限界で v²/r＝g である。出発点から最上点まで高さ r だけ上がるので、エネルギー保存より v₀²＝v²＋2gr＝3gr となる。",
    "choiceExplanations": {
      "ア": "√(gr) は最上点に達したときに必要な最小の速さである。そこまで高さ r だけ上がるため、初速はより大きくする必要がある。",
      "イ": "この値は高さ r の差を上って最上点で止まる場合に相当する。最上点でレールに接し続けるには速さ √(gr) が必要である。",
      "ウ": "最上点で垂直抗力が0となる限界で v²/r＝g である。出発点から最上点まで高さ r だけ上がるので、エネルギー保存より v₀²＝v²＋2gr＝3gr となる。",
      "エ": "この初速なら最上点の速度の二乗は 4gr−2gr＝2gr であり、接触の限界に必要な gr を超えている。",
      "オ": "√(5gr) は最下点から出発する場合の最小の初速である。本問の出発点は最下点より高さ r にある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q31.webp"
    ],
    "imageAltTexts": [
      "左から高さ r の地点で小球を放し、半径 r の鉛直ループを回るレール"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q32",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "等質量の連星の公転周期"
    ],
    "difficulty": 3,
    "question": "複数の恒星が、互いのまわりを公転している天体を連星という。いま、質量が M で等しい恒星 A と B から成る連星があり、二つの恒星の重心を中心として同じ角速度でそれぞれ等速円運動をしているとする。二つの恒星の重心から A までの距離を R としたとき、A の公転周期として最も妥当なのはどれか。ただし、万有引力定数を G とする。",
    "choices": {
      "ア": "π√(GM/R³)",
      "イ": "2π√(GM/R³)",
      "ウ": "4π√(GM/R³)",
      "エ": "2π√(R³/GM)",
      "オ": "4π√(R³/GM)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "重心は中点なので、恒星間の距離は 2R である。G M²/(2R)²＝MRω² を解くと ω＝√(GM/R³)/2 であり、周期は 2π/ω＝4π√(R³/GM) である。",
    "choiceExplanations": {
      "ア": "平方根 √(GM/R³) は時間の逆数の次元を持つ。周期を表すには角速度の逆数を用いる。",
      "イ": "√(GM/R³) は時間ではなく角速度と同じ次元である。さらに引力を求めるときに使う恒星間の距離は 2R である。",
      "ウ": "4π を掛けるのは √(R³/GM) の方である。周期は R が大きくなると長くなる。",
      "エ": "これは半径 R の中心に質量 M が固定された円軌道の周期である。本問で万有引力を計算する距離は恒星間の 2R になる。",
      "オ": "重心は中点なので、恒星間の距離は 2R である。G M²/(2R)²＝MRω² を解くと ω＝√(GM/R³)/2 であり、周期は 2π/ω＝4π√(R³/GM) である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "重心を中心とする半径 R の円上で反対側に位置する質量 M の恒星 A と B"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q33",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "水と氷の熱収支"
    ],
    "difficulty": 3,
    "question": "50℃の水100 gの中に、0℃の氷10 gを入れてしばらくすると、氷は全て融け、全体がある温度の水になった。このときの水の温度として最も妥当なのはどれか。ただし、熱は水と氷の間だけで移動し、水の比熱を 4.2 J/(g·K)、氷の融解熱を 330 J/g とする。",
    "choices": {
      "ア": "26℃",
      "イ": "30℃",
      "ウ": "34℃",
      "エ": "38℃",
      "オ": "42℃"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最終温度を T ℃ とすると、元の水の放出熱と、氷を融かし昇温する熱とが等しいので 100×4.2(50−T)＝10×330＋10×4.2T である。これを解くと T≒38.3 となる。",
    "choiceExplanations": {
      "ア": "26℃まで水が冷めれば水の放出熱は 100×4.2×24＝10,080 J になる。氷の融解と昇温に必要な熱量を大きく上回る。",
      "イ": "元の水が30℃まで冷えると放出する熱は 8,400 J である。氷を溶かし、その水を30℃にするのに必要なのは 3,300＋1,260＝4,560 J である。",
      "ウ": "氷を融かすための3,300 Jと、融けた水を最終温度まで温める分の両方を計算する。34℃を仮定すると、水が失う熱の方がまだ大きい。",
      "エ": "最終温度を T ℃ とすると、元の水の放出熱と、氷を融かし昇温する熱とが等しいので 100×4.2(50−T)＝10×330＋10×4.2T である。これを解くと T≒38.3 となる。",
      "オ": "42℃では元の水の放出熱は3,360 Jにとどまる。氷の融解だけで3,300 Jを要するため、融けた水を42℃まで上げるには足りない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q34",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "理想気体の状態変化と熱力学第1法則"
    ],
    "difficulty": 3,
    "question": "理想気体の状態変化に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 定積変化では、気体の得た熱量は、気体の内部エネルギーの増加と等しい。\n㋑ 定圧変化では、気体の得た熱量は、気体が外部にする仕事と等しい。\n㋒ 等温変化では、気体の内部エネルギーの変化は0である。\n㋓ 断熱変化では、気体が外部にする仕事は0である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "定積変化では膨張仕事が0なので、加えた熱は内部エネルギーの増加になる。理想気体の内部エネルギーは温度で決まるため、等温なら変化は0である。",
    "choiceExplanations": {
      "ア": "㋐ は正しいが、定圧で気体を加熱すると通常は膨張仕事に加えて内部エネルギーも増えるため ㋑ は誤りである。",
      "イ": "定積変化では膨張仕事が0なので、加えた熱は内部エネルギーの増加になる。理想気体の内部エネルギーは温度で決まるため、等温なら変化は0である。",
      "ウ": "㋒ は正しいが、定圧の ㋑ では熱量の全てが外部への仕事になるわけではない。温度が変われば内部エネルギーも変わる。",
      "エ": "定圧変化では熱が内部エネルギーの変化にも使われる。断熱変化で0なのは熱の出入りであり、体積が変われば外部に仕事をする。",
      "オ": "㋒ は正しいが、断熱膨張した気体は熱の出入りがなくても外部に仕事をし、内部エネルギーが減るため、㋓ は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q35",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "同位相の水面波の強め合い"
    ],
    "difficulty": 3,
    "question": "図は、無限に広がる水面を真上から見た様子を表したものである。位置が分かるように、1 cm 間隔の目盛りが入れてある。水面上の二つの点 P と点 Q から、振幅、振動数、位相が等しい波長 4 cm の正弦波を発生させたとき、図中の点 A～D のうち、二つの波が強め合う点のみを挙げているのはどれか。",
    "choices": {
      "ア": "A、C",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "同位相の波が強め合うのは経路差が 4 cm の整数倍になる点である。A は1 cmと5 cmで差4 cm、C は両方とも5 cmで差0なので、A、C が条件を満たす。",
    "choiceExplanations": {
      "ア": "同位相の波が強め合うのは経路差が 4 cm の整数倍になる点である。A は1 cmと5 cmで差4 cm、C は両方とも5 cmで差0なので、A、C が条件を満たす。",
      "イ": "A は正しいが、D は P から8 cm、Q から10 cmで距離差が2 cmとなり、半波長だけずれている。",
      "ウ": "C は P と Q から等距離だが、B の距離は P から4 cm、Q から2 cm で差が2 cmとなる。",
      "エ": "B と D はいずれも経路差が2 cmで、同位相で出た波に半波長のずれが生じる。",
      "オ": "C の距離差は0で強め合うが、D の距離差2 cmは波長4 cmの整数倍ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q35.webp"
    ],
    "imageAltTexts": [
      "1 cm 間隔の格子上にある二つの波源 P、Q と、強め合いを判定する A～D の4点"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q36",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "プリズムの直角面と全反射の臨界角"
    ],
    "difficulty": 3,
    "question": "図のように、AB 面と BC 面が直角に交わるプリズムを空気中に置き、AB 面に入射角 θ で光を入射させたところ、光は BC 面に臨界角で入射した。空気の絶対屈折率を1、プリズムの絶対屈折率を 2√3/3 としたとき、sin θ の値として最も妥当なのはどれか。なお、臨界角とは、全反射が生じる最小の入射角のことをいう。",
    "choices": {
      "ア": "√3/6",
      "イ": "√3/5",
      "ウ": "√3/4",
      "エ": "√3/3",
      "オ": "√3/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "BC 面での臨界角 θ_c は sin θ_c＝1/(2√3/3)＝√3/2 より60°である。AB 面での屈折角は30°なので、スネルの法則より sin θ＝(2√3/3)sin 30°＝√3/3 となる。",
    "choiceExplanations": {
      "ア": "AB 面の屈折角は臨界角の余角30°である。空気からプリズムに入る場合、sin θ は sin 30° にプリズムの屈折率を掛ける。",
      "イ": "臨界角を決めるのは空気とプリズムの屈折率の比である。BC 面の臨界角が60°になるので、AB 面の屈折角は30°になる。",
      "ウ": "直角に交わる二面の法線も直角に交わる。プリズム内での各法線との角は補角ではなく、足すと90°になる。",
      "エ": "BC 面での臨界角 θ_c は sin θ_c＝1/(2√3/3)＝√3/2 より60°である。AB 面での屈折角は30°なので、スネルの法則より sin θ＝(2√3/3)sin 30°＝√3/3 となる。",
      "オ": "√3/2 は BC 面に入射する臨界角の正弦である。求める θ は空気側から AB 面への入射角である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q36.webp"
    ],
    "imageAltTexts": [
      "AB と BC が直角なプリズムに、左から入射角 θ で向かう光"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q37",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "二つの点電荷による電場と電位"
    ],
    "difficulty": 3,
    "question": "図のように、xy 平面上の点 A(2a, 0) に電気量 2q の正の点電荷を、点 B(0, a) に電気量 q の正の点電荷を固定したとき、原点 O における電場の強さと電位の組合せとして最も妥当なのはどれか。ただし、クーロンの法則の比例定数を k とし、電位は無限遠を基準とする。",
    "choices": {
      "ア": "電場 3kq/(2a²)、電位 √2 kq/a",
      "イ": "電場 3kq/(2a²)、電位 2kq/a",
      "ウ": "電場 √5 kq/(2a²)、電位 kq/a",
      "エ": "電場 √5 kq/(2a²)、電位 √2 kq/a",
      "オ": "電場 √5 kq/(2a²)、電位 2kq/a"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "A、B による電場は互いに直交し、大きさは kq/(2a²) と kq/a² なので、合成すると √5 kq/(2a²) となる。電位は k(2q)/(2a)＋kq/a＝2kq/a である。",
    "choiceExplanations": {
      "ア": "二つの電場の向きは互いに直角なので、強さを単に足すことはできない。電位は方向を持たないので、各電位を普通に足す。",
      "イ": "電位は合っているが、電場は負の x 方向と負の y 方向のベクトルを合成する。それぞれの強さの二乗和から平方根を取る。",
      "ウ": "電場の強さは合っているが、A と B が作る電位はいずれも kq/a あり、合計は2倍になる。",
      "エ": "電場は正しいが、電位はスカラーなので、二つの値の二乗和の平方根ではなく和を求める。",
      "オ": "A、B による電場は互いに直交し、大きさは kq/(2a²) と kq/a² なので、合成すると √5 kq/(2a²) となる。電位は k(2q)/(2a)＋kq/a＝2kq/a である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q37.webp"
    ],
    "imageAltTexts": [
      "xy 平面で A(2a, 0) に電荷 2q、B(0, a) に電荷 q を置く図"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q38",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "同材質の導体棒の直列と並列"
    ],
    "difficulty": 3,
    "question": "同じ材質で太さがそれぞれ一様な導体棒 A と B がある。A は断面積 S、長さ 2L、B は断面積 2S、長さ L である。図Ⅰのように、A と B を直列に並べて電圧 V の直流電源につないだときに電源に流れる電流を I₁、図Ⅱのように、A と B を並列に並べて電圧 V の直流電源につないだときに電源に流れる電流を I₂ としたとき、I₁/I₂ として最も妥当なのはどれか。ただし、電源の内部抵抗及び導線の抵抗は無視できるものとする。",
    "choices": {
      "ア": "4/25",
      "イ": "3/16",
      "ウ": "2/9",
      "エ": "1/4",
      "オ": "1/2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "抵抗は長さに比例し断面積に反比例するので R_A＝4R_B である。直列の合成抵抗は 5R_B、並列は 4R_B/5 なので、電流の比はその逆比 4/25 となる。",
    "choiceExplanations": {
      "ア": "抵抗は長さに比例し断面積に反比例するので R_A＝4R_B である。直列の合成抵抗は 5R_B、並列は 4R_B/5 なので、電流の比はその逆比 4/25 となる。",
      "イ": "この比は、二つの棒の抵抗比を3：1とした場合の値である。図の長さと断面積から求まる抵抗比は4：1である。",
      "ウ": "抵抗比を2：1とすると 2/9 になるが、A は B より長さが2倍で、断面積は半分なので抵抗比は4：1である。",
      "エ": "二つの抵抗が等しければ電流の比は1/4になる。図では棒の寸法が異なり、抵抗は等しくない。",
      "オ": "二つの電流は同じ電圧を異なる合成抵抗で割って求める。並列の合成抵抗は直列の合成抵抗の 4/25 である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q38.webp"
    ],
    "imageAltTexts": [
      "図Ⅰ 導体棒 A と B の直列接続。図Ⅱ A と B の並列接続"
    ]
  },
  {
    "id": "kisho-daigakko-2023-annual-gakka-butsuri-q39",
    "exam": "kisho-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "磁場中を動く導体の誘導起電力"
    ],
    "difficulty": 3,
    "question": "導体棒に生じる誘導起電力に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、紙面に垂直に表から裏の向きにかけられた磁束密度の大きさ 4.0×10⁻² T の一様な磁場中で、紙面に平行に置かれた長さ 0.10 m の導体棒が、磁場及び導体棒の方向に垂直な向きに速さ 2.0 m/s で動いている。このとき、導体棒に生じる誘導起電力の大きさは［㋐］V であり、また、正の電荷が現れるのは図の導体棒の［㋑］側である。」",
    "choices": {
      "ア": "㋐ 8.0×10⁻³、㋑ a",
      "イ": "㋐ 8.0×10⁻³、㋑ b",
      "ウ": "㋐ 2.0×10⁻¹、㋑ a",
      "エ": "㋐ 2.0×10⁻¹、㋑ b",
      "オ": "㋐ 8.0×10⁻¹、㋑ b"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "誘導起電力は Blv＝(4.0×10⁻²)×0.10×2.0＝8.0×10⁻³ V である。速度が下向き、磁場が紙面の奥向きなので、正電荷に働く力は右向きとなり b 側が正になる。",
    "choiceExplanations": {
      "ア": "起電力の大きさは正しいが、正電荷に働く力は下向きの速度と紙面の奥向きの磁場の外積で、右側の b に向く。",
      "イ": "誘導起電力は Blv＝(4.0×10⁻²)×0.10×2.0＝8.0×10⁻³ V である。速度が下向き、磁場が紙面の奥向きなので、正電荷に働く力は右向きとなり b 側が正になる。",
      "ウ": "磁束密度を掛けないと起電力は得られない。正電荷に働く力は右向きである。",
      "エ": "b 側が正という向きは正しいが、2.0×10⁻¹ は長さと速さの積である。さらに磁束密度 4.0×10⁻² T を掛ける。",
      "オ": "b 側が正であるが、長さ0.10 m と磁束密度 4.0×10⁻² T の両方を速さに掛けた値は 8.0×10⁻³ V となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010559.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 気象大学校学生採用試験 学科試験」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2023/gakka-butsuri/q39.webp"
    ],
    "imageAltTexts": [
      "紙面の奥向きの磁場で、左端 a、右端 b の導体棒が下向きに動く図"
    ]
  }
];
