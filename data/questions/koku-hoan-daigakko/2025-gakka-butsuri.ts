import type { Question } from "@/lib/questions/types";

export const KOKU_HOAN_DAIGAKKO_2025_GAKKA_BUTSURI: Question[] = [
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q27",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "等加速度直線運動",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "x 軸上を等加速度直線運動している物体を考える。この物体は、時刻 t = 0 s には原点 O を x 軸の負の向きに 4.0 m/s の速さで、時刻 t = 7.0 s には別の点を x 軸の正の向きに 10 m/s の速さで通過した。t = 7.0 s での原点 O から物体までの距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "4.0 m",
      "イ": "14 m",
      "ウ": "21 m",
      "エ": "28 m",
      "オ": "49 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "等加速度運動の平均速度は (−4.0 + 10)/2 = 3.0 m/s である。7.0 s 後は x = 21 m なので、原点からの距離は21 mとなる。",
    "choiceExplanations": {
      "ア": "4.0 は出発時の速さの数値であり、距離は符号付きの平均速度に時間を掛けて求める。",
      "イ": "速度の変化は 14 m/s だが、変位の計算に使うのは変化量ではなく平均速度である。",
      "ウ": "等加速度運動の平均速度は (−4.0 + 10)/2 = 3.0 m/s である。7.0 s 後は x = 21 m なので、原点からの距離は21 mとなる。",
      "エ": "28 m は出発時の速さ4.0 m/sが7.0 s続いた場合の移動距離であり、加速と向きの変化を含んでいない。",
      "オ": "初めの速度が負なので、平均速度を (4.0 + 10)/2 とする計算は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q28",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "重心の計算",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、質量を無視できる 80 cm の棒に、左から順に質量がそれぞれ 0.9 kg、1.8 kg、2.7 kg の三つの小球が固定されている。これらをまとめて一つの物体とみなすとき、棒の左端から物体の重心までの距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "35 cm",
      "イ": "40 cm",
      "ウ": "45 cm",
      "エ": "50 cm",
      "オ": "55 cm"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "球の位置は左から 0、30、80 cm なので、重心は (0.9 × 0 + 1.8 × 30 + 2.7 × 80)/(0.9 + 1.8 + 2.7) = 50 cm になる。",
    "choiceExplanations": {
      "ア": "35 cm は三球の位置の単純平均に近いが、右ほど質量が大きいため重心はさらに右に寄る。",
      "イ": "40 cm は棒の中点であり、棒の質量を無視して三球の位置を質量で重み付けする必要がある。",
      "ウ": "三球の左端まわりの質量と距離の積の和は 270 kg・cm で、全質量 5.4 kg で割ると 45 cm より大きくなる。",
      "エ": "球の位置は左から 0、30、80 cm なので、重心は (0.9 × 0 + 1.8 × 30 + 2.7 × 80)/(0.9 + 1.8 + 2.7) = 50 cm になる。",
      "オ": "55 cm のところを支点にすると三球のモーメントの和がゼロにならず、重心より右に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "棒の上に固定した質量0.9 kg、1.8 kg、2.7 kgの小球と間隔"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q29",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "定滑車と糸の張力",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかに回転する定滑車に糸をかけ、質量 m の物体 A と質量 M の物体 B を取り付けた。静かに手を離したところ、一定の加速度で物体 A は上昇し、物体 B は下降した。このとき、定滑車が天井を引く力の大きさとして最も妥当なのはどれか。\nただし、定滑車の質量は無視できるものとし、また、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "(M − m)g",
      "イ": "(M + m)g",
      "ウ": "(2Mm/(M + m))g",
      "エ": "(3m(M − m)/M)g",
      "オ": "(4Mm/(M + m))g"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "糸の張力を T、加速度の大きさを a とすると、T − mg = ma と Mg − T = Ma から T = 2Mmg/(M + m) になる。両側の糸が滑車を下に引くため、天井に加わる力は 2T である。",
    "choiceExplanations": {
      "ア": "重力の差 (M − m)g は二物体を加速させる駆動力であり、天井を引く二本の糸の張力の和とは異なる。",
      "イ": "全重量 (M + m)g は両物体が静止しているときの支持力に相当し、上下に加速する場合は張力を運動方程式で求める。",
      "ウ": "この値は滑車の片側にかかる張力一つ分であり、左右の糸が同じ張力で滑車を引く。",
      "エ": "仮に M が m に近づくとこの式は0に近づくが、加速度が小さくなっても両側の糸は物体の重さを支える力を及ぼす。",
      "オ": "糸の張力を T、加速度の大きさを a とすると、T − mg = ma と Mg − T = Ma から T = 2Mmg/(M + m) になる。両側の糸が滑車を下に引くため、天井に加わる力は 2T である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q29.webp"
    ],
    "imageAltTexts": [
      "天井に固定した定滑車と、糸で結んだ物体 A、B"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q30",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ばねの弾性エネルギー",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな水平面上で、質量 m の小球をばね定数 k の軽いばねに取り付け、ばねを自然長の位置 O から L だけ縮ませて、小球を静かに放した。小球が O を通過し、自然長の位置から L/3 伸びた位置に到達したときの小球の速さとして最も妥当なのはどれか。",
    "choices": {
      "ア": "(L/3)√(2k/m)",
      "イ": "(2L/3)√(k/m)",
      "ウ": "(2L/3)√(2k/m)",
      "エ": "(L/3)√(5k/m)",
      "オ": "(L/3)√(10k/m)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "力学的エネルギーの保存より mv²/2 = kL²/2 − k(L/3)²/2 である。これを v について解くと (2L/3)√(2k/m) となる。",
    "choiceExplanations": {
      "ア": "この速さの運動エネルギーは初めの弾性エネルギーの2/9倍にしかならず、残っている弾性エネルギーの1/9倍と足しても初期値に届かない。",
      "イ": "ばねのエネルギーは変位の二乗に比例するので、L − L/3 の長さをそのまま速さの式に入れることはできない。",
      "ウ": "力学的エネルギーの保存より mv²/2 = kL²/2 − k(L/3)²/2 である。これを v について解くと (2L/3)√(2k/m) となる。",
      "エ": "速度の二乗には k/m に L² − (L/3)² = 8L²/9 を掛けた値を使うので、この値では係数が足りない。",
      "オ": "自然長の位置を通過するときの最大速度は L√(k/m) であり、それより大きいこの値にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q30.webp"
    ],
    "imageAltTexts": [
      "ばねで壁につながれた小球と、ばねの自然長からの変位"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q31",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "運動量保存と摩擦",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな水平面上に、厚さが均一で上面は粗く、下面は滑らかな質量 M の板があり、その上に質量 m の小物体が置かれている。いま、静止した板の上で、小物体を初速 v₀ で滑らせたところ、やがて、板と小物体は一体となって動いた。このときの板と小物体の速さとして最も妥当なのはどれか。",
    "choices": {
      "ア": "(m/(m + M))v₀",
      "イ": "(2m/(m + M))v₀",
      "ウ": "(v₀/2)√(m/(m + M))",
      "エ": "v₀√(m/(m + M))",
      "オ": "v₀√(2m/(m + M))"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "摩擦は板と小物体の間に働く内力で、系全体には水平外力がない。初めの運動量 mv₀ と一体化後の運動量 (m + M)v を等しくすると、この速さが得られる。",
    "choiceExplanations": {
      "ア": "摩擦は板と小物体の間に働く内力で、系全体には水平外力がない。初めの運動量 mv₀ と一体化後の運動量 (m + M)v を等しくすると、この速さが得られる。",
      "イ": "この速さでは一体化後の運動量が 2mv₀ となり、外力のない水平方向の運動量保存に反する。",
      "ウ": "運動量は速さに一次で比例するため、質量比の平方根を使った式にはならない。",
      "エ": "この式は運動エネルギーの保存を仮定すると得られるが、すべり摩擦により力学的エネルギーの一部は熱になる。",
      "オ": "この式では一体化後の運動エネルギーが初期の2倍になるが、すべり摩擦が働くため運動エネルギーは減少する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q31.webp"
    ],
    "imageAltTexts": [
      "滑らかな床上の板と、その上を滑り始める小物体"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q32",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "万有引力と人工衛星の周期",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "地球の周りを半径 r で等速円運動する人工衛星がある。この人工衛星の周期として最も妥当なのはどれか。\nただし、地球の質量を M、万有引力定数を G とする。",
    "choices": {
      "ア": "(1/(2π))√(GM/r)",
      "イ": "(r/(2π))√(r/(GM))",
      "ウ": "2π√(rGM)",
      "エ": "2π√(GM/r)",
      "オ": "2πr√(r/(GM))"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "向心加速度 v²/r = GM/r² より v = √(GM/r) である。軌道一周の長さ 2πr を v で割ると 2πr√(r/(GM)) になる。",
    "choiceExplanations": {
      "ア": "√(GM/r) は衛星の速さの次元であり、周期は円周の長さをその速さで割って求める。",
      "イ": "周期を求めるときは軌道半径に 2π を掛けて軌道一周の長さとするため、2π で割るこの式とは異なる。",
      "ウ": "万有引力が強くなると同じ半径に対する軌道速度は上がり、周期は短くなるので GM は分母側に入る。",
      "エ": "この式は衛星の速さを 2π 倍しており、時間にならない。",
      "オ": "向心加速度 v²/r = GM/r² より v = √(GM/r) である。軌道一周の長さ 2πr を v で割ると 2πr√(r/(GM)) になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "地球の中心を回る半径 r の円軌道と人工衛星"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q33",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "加熱曲線と容器の熱容量",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "銅製容器に氷 100 g を入れたところ、全体の温度が −20 ℃ で熱平衡状態となった。次に、銅製容器と氷に毎秒一定量の熱を加えたところ、全体の温度は図のように変化した。銅製容器の熱容量として最も妥当なのはどれか。\nただし、氷の比熱を 2.0 J/(g・K)、氷の融解熱を 3.3 × 10² J/g とする。また、加える熱以外に、外部との熱の出入りはなく、容器の温度と氷の温度は熱を加えている間、常に等しかったものとする。",
    "choices": {
      "ア": "10 J/K",
      "イ": "50 J/K",
      "ウ": "100 J/K",
      "エ": "150 J/K",
      "オ": "200 J/K"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "0 ℃ での融解には 33000 J を要し、165 s かかるので加熱は 200 J/s である。最初の25 sの5000 Jから氷の昇温分4000 Jを引き、20 Kで割ると容器の熱容量は50 J/Kとなる。",
    "choiceExplanations": {
      "ア": "最初の25 sで受け取る熱は 5000 J で、氷の温度上昇の4000 Jを引くと1000 Jが容器に使われる。",
      "イ": "0 ℃ での融解には 33000 J を要し、165 s かかるので加熱は 200 J/s である。最初の25 sの5000 Jから氷の昇温分4000 Jを引き、20 Kで割ると容器の熱容量は50 J/Kとなる。",
      "ウ": "容器が 100 J/K なら最初の20 K の昇温に容器と氷で 6000 J 必要となり、加熱から得られた 5000 J を超える。",
      "エ": "この熱容量と氷の熱容量200 J/Kを合わせると、20 Kの上昇に7000 J必要になり、グラフの経過時間と合わない。",
      "オ": "200 J/K は氷100 g の熱容量である。水が凍ったまま温度が上がる最初の区間では、氷の分を全体から差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q33.webp"
    ],
    "imageAltTexts": [
      "銅製容器と氷の加熱開始後の時間と温度"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q34",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "理想気体の混合と内部エネルギー",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、体積 2V の容器 A と体積 V の容器 B がコックのついた細い管でつながれている。コックを閉じた状態で、容器 A に n_A モルの気体を入れたところ、気体の圧力は 3P、絶対温度は 2T に、また、容器 B に同じ気体を n_B モル入れたところ、気体の圧力は 4P、絶対温度は T になった。コックを開くと、気体はやがて熱平衡状態に達した。このときの気体の温度として最も妥当なのはどれか。\nただし、気体は単原子分子から成る理想気体とする。また、気体と容器との熱のやり取りはなく、細い管の体積は無視できるものとする。",
    "choices": {
      "ア": "(3/10)T",
      "イ": "(2/3)T",
      "ウ": "T",
      "エ": "(10/7)T",
      "オ": "(7/4)T"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "状態方程式から n_A : n_B = 3 : 4 となる。内部エネルギー保存により最終温度は (3 × 2T + 4 × T)/7 = (10/7)T である。",
    "choiceExplanations": {
      "ア": "固定された容器で外部と熱のやり取りがない場合、最終温度は二つの初期温度 T と 2T の間になる。",
      "イ": "最終温度は物質量で重み付けした平均になるので、初期温度の低い方の T より小さい値にはならない。",
      "ウ": "容器 A の温度は 2T であり、正の物質量の高温の気体を合わせると温度は T を上回る。",
      "エ": "状態方程式から n_A : n_B = 3 : 4 となる。内部エネルギー保存により最終温度は (3 × 2T + 4 × T)/7 = (10/7)T である。",
      "オ": "平均を取るときの重みは容器の体積や圧力そのものではなく物質量であり、n_B の方が大きいため平均は 1.5T より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q34.webp"
    ],
    "imageAltTexts": [
      "コック付きの細い管でつないだ容器 A と容器 B"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q35",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "開管の共鳴",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のように、開管の一端に置いたスピーカーから音を発した。スピーカーの音の振動数を徐々に大きくしていくと、510 Hz のとき共鳴が起き、大きな音が聞こえた。さらに振動数を大きくしていくと、一旦共鳴は起こらなくなり、680 Hz のときに再び共鳴が起こった。開管の長さとして最も妥当なのはどれか。\nただし、開口端補正は無視でき、音の伝わる速さは 340 m/s とする。",
    "choices": {
      "ア": "1.0 m",
      "イ": "1.5 m",
      "ウ": "2.0 m",
      "エ": "5.0 m",
      "オ": "10 m"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "開管の連続する共鳴振動数の差は基本振動数で、680 − 510 = 170 Hz である。開管の長さは基本振動の半波長なので、340/(2 × 170) = 1.0 mとなる。",
    "choiceExplanations": {
      "ア": "開管の連続する共鳴振動数の差は基本振動数で、680 − 510 = 170 Hz である。開管の長さは基本振動の半波長なので、340/(2 × 170) = 1.0 mとなる。",
      "イ": "1.5 m では基本振動数は約113 Hz であり、隣り合う共鳴の間隔が170 Hz にはならない。",
      "ウ": "2.0 m の開管では間隔が85 Hz となり、510 Hz と680 Hz の間にも595 Hzで共鳴が起こる。",
      "エ": "5.0 m では共鳴間隔が34 Hz となり、観測された連続する二つの共鳴の差より小さい。",
      "オ": "10 m なら基本振動数は17 Hzとなり、510 Hz と680 Hz の間に複数の共鳴がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q35.webp"
    ],
    "imageAltTexts": [
      "スピーカーを置いた開管内の定常波の模式図"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q36",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "凸レンズの実像と倍率",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "焦点距離 10 cm の凸レンズの前方 30 cm の位置に、長さ 5 cm の物体を立てて置いたとき、レンズによってできる物体の像の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1.25 cm",
      "イ": "1.67 cm",
      "ウ": "2.5 cm",
      "エ": "10 cm",
      "オ": "15 cm"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "レンズの式 1/10 = 1/30 + 1/b を解くと像距離 b は15 cmになる。像の大きさは倍率の絶対値15/30を物体の長さ5 cmに掛けて2.5 cmとなる。",
    "choiceExplanations": {
      "ア": "像距離と物体距離の比は 15/30 = 1/2 であり、この大きさに対応する倍率1/4ではない。",
      "イ": "焦点距離10 cmではなく、レンズの式から求めた像距離15 cmを物体距離30 cmで割る。",
      "ウ": "レンズの式 1/10 = 1/30 + 1/b を解くと像距離 b は15 cmになる。像の大きさは倍率の絶対値15/30を物体の長さ5 cmに掛けて2.5 cmとなる。",
      "エ": "物体距離が焦点距離の2倍より大きいため、できる実像は物体の5 cmより小さい。",
      "オ": "15 cm は凸レンズから像までの距離である。像そのものの大きさには倍率を掛けて求める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q37",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "半導体の抵抗率とダイオード",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "半導体に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 常温で抵抗率が絶縁体と導体の中間であるケイ素 Si やゲルマニウム Ge は半導体といえる。\n㋑ 純度の高い半導体の結晶に、リン P やアルミニウム Al などの不純物をわずかに混入したものは、不純物を含まない半導体に比べて、抵抗率が大きくなり、電流が流れにくくなる。\n㋒ p 型半導体と n 型半導体を接合し、その両端に電極をつけたものを半導体ダイオードといい、一方向にしか電流を流さない整流作用がある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ケイ素とゲルマニウムは半導体であり、p 型と n 型の接合は順方向に電流を通しやすく逆方向に通しにくい。従って、理想化した整流作用を述べる㋒と㋐が妥当である。",
    "choiceExplanations": {
      "ア": "ケイ素やゲルマニウムは半導体だが、少量の不純物を加えるとキャリアが増えるため、通常は抵抗率が下がる。",
      "イ": "ケイ素とゲルマニウムは半導体であり、p 型と n 型の接合は順方向に電流を通しやすく逆方向に通しにくい。従って、理想化した整流作用を述べる㋒と㋐が妥当である。",
      "ウ": "リンやアルミニウムの添加は電子または正孔の数を増やすため、純粋な半導体より電流を流しやすくする。",
      "エ": "㋒は妥当だが、半導体の導電性を高めるドーピングの効果を㋑は逆に述べている。",
      "オ": "ダイオードの整流作用に加え、ケイ素とゲルマニウムを半導体とする㋐も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q38",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "キルヒホッフの法則と電位差",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "図のような回路において、BC 間に 2.0 A、CD 間に 5.0 A の電流が流れている。図の AB 間の 1.0 Ω の抵抗に流れる電流 I の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "3.0 A",
      "イ": "4.0 A",
      "ウ": "5.0 A",
      "エ": "6.0 A",
      "オ": "8.0 A"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "BC 間の電圧は 2.0 V、CD 間は 10 V なので、BD 間の 6.0 Ω に流れる電流は 12/6.0 = 2.0 A である。B で BC と BD に各 2.0 A が分かれるので AB には 4.0 A が流れる。",
    "choiceExplanations": {
      "ア": "3.0 A は接点 C の電流の差 5.0 − 2.0 であり、AC 間に流れる電流に当たる。",
      "イ": "BC 間の電圧は 2.0 V、CD 間は 10 V なので、BD 間の 6.0 Ω に流れる電流は 12/6.0 = 2.0 A である。B で BC と BD に各 2.0 A が分かれるので AB には 4.0 A が流れる。",
      "ウ": "CD 間の 5.0 A は C で AC と BC から合流した電流であり、AB 間の電流には等しくない。",
      "エ": "BD 間の 6.0 は抵抗の値であり、流れる電流は電位差12 Vを6.0 Ωで割った2.0 Aである。",
      "オ": "B から出る電流は BC と BD の各 2.0 A なので、合流前の AB の電流はその和である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q38.webp"
    ],
    "imageAltTexts": [
      "接点 A、B、C、D と抵抗・電源の回路"
    ]
  },
  {
    "id": "koku-hoan-daigakko-2025-annual-gakka-butsuri-q39",
    "exam": "koku-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "一様磁場中の荷電粒子の円運動",
      "航空電子科"
    ],
    "difficulty": 3,
    "question": "真空中において、図のように、電気量 q (q > 0)、質量 m の荷電粒子を、紙面の表から裏の向きにかけられた磁束密度の大きさ B の一様な磁場中に、速さ v で垂直に入射させたところ、荷電粒子は半径 r の半円軌道を描いた。このときの v として最も妥当なのはどれか。\nただし、重力の影響は無視できるものとする。",
    "choices": {
      "ア": "√(qB/(mr))",
      "イ": "qB/(mr)",
      "ウ": "√(qrB/m)",
      "エ": "qrB/m",
      "オ": "mq/(rB)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "磁場が粒子に及ぼす力 qvB が円運動の向心力 mv²/r になる。従って v = qrB/m である。",
    "choiceExplanations": {
      "ア": "磁場と速度が直交する場合のローレンツ力は qvB であり、向心力との等式から速度は平方根の形にならない。",
      "イ": "半径 r = mv/(qB) を解くと速度は r に比例するため、分母に r を置くとその関係に反する。",
      "ウ": "qvB = mv²/r の両辺を v で割ると、速度は qrB/m そのものになる。",
      "エ": "磁場が粒子に及ぼす力 qvB が円運動の向心力 mv²/r になる。従って v = qrB/m である。",
      "オ": "同じ電荷、質量、軌道半径なら、より大きな磁束密度 B に対して必要な速さも大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016399.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 航空保安大学校学生採用試験 学科試験（多肢選択式・物理）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/koku-hoan-daigakko/2025/gakka-butsuri/q39.webp"
    ],
    "imageAltTexts": [
      "一様磁場を垂直に出入りする正電荷の半円軌道"
    ]
  }
];
