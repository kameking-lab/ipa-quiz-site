import type { Question } from "@/lib/questions/types";

export const KISHO_DAIGAKKO_2025_GAKKA_BUTSURI: Question[] = [
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q27",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "鉛直投射と相対速度"
    ],
    "difficulty": 3,
    "question": "一定の速さ 2.0 m/s で鉛直上向きに上昇している気球がある。地上からの高さが 360 m の所で、小球を気球から鉛直下向きに投げた。小球を投げてから小球が地面に達するまでの時間が 8.0 s であったとき、気球から見た小球を投げた速さとして最も妥当なのはどれか。ただし、重力加速度の大きさを 10 m/s² とし、小球に対して気球は十分に重く、小球の投げ下ろしによる気球の速さの変化は無視できるものとする。また、空気抵抗は無視できるものとする。",
    "choices": {
      "ア": "3.0 m/s",
      "イ": "4.0 m/s",
      "ウ": "5.0 m/s",
      "エ": "6.0 m/s",
      "オ": "7.0 m/s"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "上向きを正とすると 0＝360＋8v₀−(1/2)×10×8² より、地上から見た初速は −5.0 m/s となる。気球の速度 ＋2.0 m/s を引くと −7.0 m/s なので速さは7.0 m/sである。",
    "choiceExplanations": {
      "ア": "地上から見た下向きの初速5.0 m/sから、上昇する気球の速さを引くと3.0 m/sになる。速度の向きが逆なので、相対速度の大きさは両者の和で求める。",
      "イ": "重力による落下距離は320 mであり、残り40 mを8秒で進む地上から見た初速は5.0 m/sである。",
      "ウ": "5.0 m/s は地上基準の初速の大きさであり、上向きの気球から見た速さはこれより 2.0 m/s 大きい。",
      "エ": "この速さで気球から投げると地上基準では下向き 4.0 m/s になり、8秒で進む距離は352 mで地面に届かない。",
      "オ": "上向きを正とすると 0＝360＋8v₀−(1/2)×10×8² より、地上から見た初速は −5.0 m/s となる。気球の速度 ＋2.0 m/s を引くと −7.0 m/s なので速さは7.0 m/sである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q28",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "支持反力がゼロになる条件"
    ],
    "difficulty": 3,
    "question": "図のように、重さ 10 N で長さが 0.8 m の一様な板を、板の左端から 0.2 m の位置にある支柱 A と板の右端から 0.2 m の位置にある支柱 B によって水平に支え、板の中心に重さ 20 N の小物体を置いた。小物体を徐々に右へ移動させると、ある所で板が支柱 A から離れた。このときの板の左端から小物体までの距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.60 m",
      "イ": "0.63 m",
      "ウ": "0.65 m",
      "エ": "0.70 m",
      "オ": "0.72 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "支柱 A から離れる瞬間は B まわりで 10×(0.60−0.40)＝20×(x−0.60) が成り立つ。したがって左端からの距離は x＝0.70 m である。",
    "choiceExplanations": {
      "ア": "0.60 m は B の位置である。小物体がここにあるとそのモーメントがゼロで、板の重さのモーメントが残る。",
      "イ": "B より右へ0.03 mでは、小物体の作る右回りのモーメントは 0.6 N·m で、板による 2 N·m に届かない。",
      "ウ": "0.65 m では小物体のモーメントが 1.0 N·m となり、B の左にある板の重さのモーメントを打ち消せない。",
      "エ": "支柱 A から離れる瞬間は B まわりで 10×(0.60−0.40)＝20×(x−0.60) が成り立つ。したがって左端からの距離は x＝0.70 m である。",
      "オ": "0.72 m での小物体のモーメントは 2.4 N·m で、板が A から離れるときの 2.0 N·m を超えている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "支柱 A、B で支えた一様な板と、右へ移動させる小物体"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q29",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "浮力と糸を切った直後の加速度"
    ],
    "difficulty": 3,
    "question": "図のように、それぞれ均質で、密度が異なり、体積が等しい二つの球 A、B を糸でつないで水に入れたところ、A の体積のちょうど半分が水面から上に出た状態で、糸がたるまずに浮かんだ。この状態から、糸を静かに切ったところ、B は下降し始めた。水の密度が ρ、A の密度が ρ/5 であるとき、糸を切った瞬間の B の加速度の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "(3/13)g",
      "イ": "(3/10)g",
      "ウ": "(4/9)g",
      "エ": "(1/2)g",
      "オ": "(4/5)g"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "球1個の体積を V とすると、2球の浮力は合計で (3/2)ρVg なので、B の質量は (13/10)ρV になる。糸を切った直後の B の下向きの合力は (3/10)ρVg で、質量で割ると (3/13)g となる。",
    "choiceExplanations": {
      "ア": "球1個の体積を V とすると、2球の浮力は合計で (3/2)ρVg なので、B の質量は (13/10)ρV になる。糸を切った直後の B の下向きの合力は (3/10)ρVg で、質量で割ると (3/13)g となる。",
      "イ": "3/10 は B の水に対する密度の超過割合である。加速度を求めるときは B の質量 (13/10)ρV で割る。",
      "ウ": "A の半分と B の全部が水没するため、浮力は両球で同じにならない。等しい体積から両球の浮力を計算すると、B の密度は (13/10)ρ と求まる。",
      "エ": "A が体積の半分を水に入れていることは、B の加速度が g の半分であることを意味しない。B に対する浮力は B の重さの 10/13 である。",
      "オ": "ρ/5 は A の密度である。糸を切った直後の加速度には、水中にある B の密度と水の密度との差を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q29.webp"
    ],
    "imageAltTexts": [
      "水面に半分浮く球 A と、糸でつながれ水中にある球 B"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q30",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ばねの弾性エネルギーと反発係数"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな水平面上で、ばね定数 k のばねの一端を壁に固定し、他端に質量 M の小球 A を取り付けた。ばねが自然長のときの A の位置を O とし、O から l だけばねを縮め、O に質量 m の小球 B を置いた。A を放したところ、A は床面上を運動し、B と衝突した。このとき、衝突後の B の速さとして最も妥当なのはどれか。ただし、A と B との反発係数を e とする。また、M は m に対して大きく、衝突は一度しか起こらないものとする。",
    "choices": {
      "ア": "(1−e)l√(kM)/(M＋m)",
      "イ": "(1＋e)l√(kM)/(M＋m)",
      "ウ": "(1−e)l√(kM)/(M−m)",
      "エ": "(1＋e)ml√(k/M)/(M＋m)",
      "オ": "(1−e)ml√(k/M)/(M＋m)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "衝突直前の A の速さ u は (1/2)kl²＝(1/2)Mu² より l√(k/M) である。衝突後の速度を v_A、v_B として Mu＝Mv_A＋mv_B と v_B−v_A＝eu を連立すると v_B＝(1＋e)l√(kM)/(M＋m) となる。",
    "choiceExplanations": {
      "ア": "衝突後の離れる相対速度が衝突前の速さの e 倍なので、運動量保存と合わせると係数は 1＋e になる。",
      "イ": "衝突直前の A の速さ u は (1/2)kl²＝(1/2)Mu² より l√(k/M) である。衝突後の速度を v_A、v_B として Mu＝Mv_A＋mv_B と v_B−v_A＝eu を連立すると v_B＝(1＋e)l√(kM)/(M＋m) となる。",
      "ウ": "v_B−v_A＝eu を運動量の式に代入すると、v_B に掛かるのは質量の和 M＋m である。",
      "エ": "入射する球は質量 M の A なので、u に掛かる質量の比の分子は m ではなく M である。",
      "オ": "運動量をもって入射するのは質量 M の球であり、反発の効果は 1＋e として現れる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q30.webp"
    ],
    "imageAltTexts": [
      "ばねが自然長の状態と、縮めて小球 B を置いた状態"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q31",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "二つの物体とばねの単振動"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな水平面上で、ばね定数 k のばねの一端を壁に固定し、他端に質量 m の小物体を取り付けた。小物体に糸を付け、滑らかな滑車を通して糸の他端に質量 M のおもりをつるしたところ、つり合って静止した。次に、おもりを持ち上げ、ばねが自然長になる位置から静かに放したところ、糸はたるまず、小物体は単振動した。このとき、単振動の中心の位置と周期の組合せとして最も妥当なのはどれか。ただし、重力加速度の大きさを g とし、ばねが自然長のときの小物体の位置を原点とし、水平方向右向きを正とする。",
    "choices": {
      "ア": "中心 Mg/k、周期 π√[(M＋m)/k]",
      "イ": "中心 Mg/k、周期 π√[2(M＋m)/k]",
      "ウ": "中心 Mg/k、周期 2π√[(M＋m)/k]",
      "エ": "中心 Mmg/[(M＋m)k]、周期 π√[2(M＋m)/k]",
      "オ": "中心 Mmg/[(M＋m)k]、周期 2π√[(M＋m)/k]"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "右向きの変位を x とすると糸の張力が相殺されて (M＋m)x″＝Mg−kx となる。中心は Mg/k、角振動数は √[k/(M＋m)] なので周期は 2π√[(M＋m)/k] である。",
    "choiceExplanations": {
      "ア": "振動の中心は正しいが、周期は角振動数の逆数に π ではなく 2π を掛けた値である。",
      "イ": "中心は正しいが、両物体の運動方程式を加えると角振動数は √[k/(M＋m)] となる。",
      "ウ": "右向きの変位を x とすると糸の張力が相殺されて (M＋m)x″＝Mg−kx となる。中心は Mg/k、角振動数は √[k/(M＋m)] なので周期は 2π√[(M＋m)/k] である。",
      "エ": "静止時の張力はおもりの重力 Mg と等しく、中心は Mg/k である。周期には両物体の質量の和とばね定数を使う。",
      "オ": "周期は正しいが、中心は静的につり合う位置なので、ばねの力 kx をおもりの重さ Mg に等しくする。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q31.webp"
    ],
    "imageAltTexts": [
      "ばねにつながる小物体と、滑車を通してつるすおもり"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q32",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "楕円軌道の近点速度"
    ],
    "difficulty": 3,
    "question": "図のように、定点 O に静止している質量 M の巨大な星からの万有引力だけを受けて、楕円運動している惑星がある。楕円軌道の長軸を AB とし、OA＝r_A、OB＝r_B（r_A＜r_B）とする。点 A における惑星の速さとして最も妥当なのはどれか。ただし、万有引力定数を G とする。なお、ケプラーの第2法則により、惑星と巨大な星を結ぶ線分が単位時間内に描く面積（面積速度）は一定である。",
    "choices": {
      "ア": "√(GM/r_A)",
      "イ": "√[GM(r_B−r_A)/(r_A r_B)]",
      "ウ": "√[2GM/(r_A＋r_B)]",
      "エ": "√[2GMr_B/{r_A(r_A＋r_B)}]",
      "オ": "√[2GM(r_B−r_A)/(r_A r_B)]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "面積速度の保存で r_Av_A＝r_Bv_B となる。力学的エネルギーの保存 v_A²/2−GM/r_A＝v_B²/2−GM/r_B に代入すると v_A²＝2GMr_B/[r_A(r_A＋r_B)] を得る。",
    "choiceExplanations": {
      "ア": "√(GM/r_A) は半径 r_A の円軌道の速さであり、r_A＜r_B の楕円軌道では近点のほうがこの値より速い。",
      "イ": "r_B が r_A に近づくとこの式は0に近づくが、円軌道の極限の速度は0にならない。",
      "ウ": "この式は半長軸 (r_A＋r_B)/2 を半径とする円軌道の速さであり、近点での速さより小さい。",
      "エ": "面積速度の保存で r_Av_A＝r_Bv_B となる。力学的エネルギーの保存 v_A²/2−GM/r_A＝v_B²/2−GM/r_B に代入すると v_A²＝2GMr_B/[r_A(r_A＋r_B)] を得る。",
      "オ": "この根号内は 2GM(1/r_A−1/r_B) であり、エネルギー保存で得る v_A²−v_B² の値である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "恒星 O を焦点とする楕円軌道と、近点 A・遠点 B の速さ"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q33",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "連結ピストンと理想気体の状態方程式"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかに動くピストンがついた、同じ円筒形の容器 A、B を水平な床の上に固定し、A、B に等量の理想気体を封入したところ、A、B 内の気体は共に圧力 1.0×10⁵ Pa、体積 1.2×10⁻⁵ m³、温度 300 K となった。次に、A 内の気体の温度を 300 K に保ちながら、B 内の気体を加熱し、B 内の気体の圧力を 1.2×10⁵ Pa とした。このときの B 内の気体の温度として最も妥当なのはどれか。",
    "choices": {
      "ア": "360 K",
      "イ": "390 K",
      "ウ": "420 K",
      "エ": "450 K",
      "オ": "500 K"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ピストンのつり合いにより圧力は両方で 1.2×10⁵ Pa になる。A は等温なので体積は 1.0×10⁻⁵ m³、B は 1.4×10⁻⁵ m³ となり、B の温度は 300×1.2×(1.4/1.2)＝420 K となる。",
    "choiceExplanations": {
      "ア": "360 K は B が一定体積のままと考えた値である。B の圧力が上がるとピストンが動いて B の体積も増える。",
      "イ": "A の体積が 1.0×10⁻⁵ m³ になるので、全容積から引いた B の体積は 1.4×10⁻⁵ m³ になる。B は圧力と体積がともに増え、390 K を超える。",
      "ウ": "ピストンのつり合いにより圧力は両方で 1.2×10⁵ Pa になる。A は等温なので体積は 1.0×10⁻⁵ m³、B は 1.4×10⁻⁵ m³ となり、B の温度は 300×1.2×(1.4/1.2)＝420 K となる。",
      "エ": "B の圧力と体積の積は初めの1.4倍である。450 K に対応する1.5倍にはならない。",
      "オ": "A の体積が減る分だけ B の体積が増え、圧力と体積の両方の変化を考慮しても B の温度は初めの1.4倍である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q33.webp"
    ],
    "imageAltTexts": [
      "床に固定した円筒形の容器 A、B のピストンを連結した図"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q34",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "圧力・体積線図と熱効率"
    ],
    "difficulty": 3,
    "question": "滑らかに動くピストンを使って、シリンダーに封入した単原子分子理想気体を、図のように A → B → C → A と変化させる。この変化を熱機関のサイクルとみなしたとき、熱効率として最も妥当なのはどれか。ただし、図の縦軸は圧力 P を、横軸は体積 V を示しており、図の BC は線分であるものとする。なお、熱効率とは、熱機関の1サイクルの過程で、外部から吸収した熱量に対する、外部にした正味の仕事の割合である。",
    "choices": {
      "ア": "1/6",
      "イ": "1/5",
      "ウ": "1/4",
      "エ": "1/3",
      "オ": "2/5"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "内部エネルギー U＝3PV/2 と熱力学第1法則より、A→B の吸熱は 1.5P₀V₀、B→C の吸熱は 4.5P₀V₀ である。サイクルの正味の仕事は三角形の面積 P₀V₀ なので、熱効率は 1/6 となる。",
    "choiceExplanations": {
      "ア": "内部エネルギー U＝3PV/2 と熱力学第1法則より、A→B の吸熱は 1.5P₀V₀、B→C の吸熱は 4.5P₀V₀ である。サイクルの正味の仕事は三角形の面積 P₀V₀ なので、熱効率は 1/6 となる。",
      "イ": "吸熱は A→B で 1.5P₀V₀、B→C で 4.5P₀V₀ であり、合計は 5 ではなく 6P₀V₀ になる。",
      "ウ": "定積の A→B では仕事はゼロだが、圧力と内部エネルギーが上がるため吸熱がある。B→C の吸熱にそれを加える。",
      "エ": "B→C だけを見ると仕事は 3P₀V₀ だが、C→A では外部から 2P₀V₀ の仕事をされる。熱効率の分子は差の P₀V₀ である。",
      "オ": "三角形の底辺は 2V₀、高さは P₀ である。正味の仕事を求めるときは面積の式に 1/2 を掛け、吸熱は A→B と B→C の合計を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q34.webp"
    ],
    "imageAltTexts": [
      "A は (V₀, P₀)、B は (V₀, 2P₀)、C は (3V₀, P₀) の圧力・体積線図"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q35",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "全反射の臨界角と円板の半径"
    ],
    "difficulty": 3,
    "question": "図のように、水深 h のプールの底に点光源を置き、点光源の真上の水面に円板を浮かべた。点光源が発する光が水面から空気中に出ないとき、円板の半径が満たすべき最小値として最も妥当なのはどれか。ただし、空気の屈折率を 1、水の屈折率を n とする。また、円板による光の反射はないものとする。",
    "choices": {
      "ア": "h/n",
      "イ": "h/√(n²−1)",
      "ウ": "h/√(n²＋1)",
      "エ": "h/(n²−1)",
      "オ": "h/(n²＋1)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "臨界角 θ_c では sin θ_c＝1/n となる。臨界角で水面に当たるまでの水平距離は h tan θ_c＝h/√(n²−1) であり、それより外の光は全反射する。",
    "choiceExplanations": {
      "ア": "1/n は臨界角の正弦であるが、水深と水平方向の距離の比に使うのは正接である。",
      "イ": "臨界角 θ_c では sin θ_c＝1/n となる。臨界角で水面に当たるまでの水平距離は h tan θ_c＝h/√(n²−1) であり、それより外の光は全反射する。",
      "ウ": "cos θ_c＝√(1−1/n²) なので、正接の分母には n²＋1 ではなく n²−1 の平方根が現れる。",
      "エ": "n²−1 は臨界角の正接の逆数を二乗した値である。水深に掛ける量は正接そのものなので、平方根が必要である。",
      "オ": "臨界角の正接は sin θ_c を cos θ_c で割って得られ、n²＋1 はそのいずれの計算にも使わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q35.webp"
    ],
    "imageAltTexts": [
      "水深 h の底の光源と、その真上の水面に浮かべた円板"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q36",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "逆位相の点波源による干渉"
    ],
    "difficulty": 3,
    "question": "互いに 29 m 離れた水面上の2点 A、B に置いた波源が、波長 5 m で、周期、振幅が等しい水面波を連続的に送り出している。A に置いた波源から送り出される水面波と B に置いた波源から送り出される水面波との位相が π rad ずれているとき、AB 間にできる節の数として最も妥当なのはどれか。ただし、各波源からの水面波はそれぞれ同心円状に広がっていく正弦波とし、減衰は無視できるものとする。",
    "choices": {
      "ア": "4",
      "イ": "5",
      "ウ": "6",
      "エ": "11",
      "オ": "12"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "波源は逆位相なので、経路差が波長の整数倍の点で振動を打ち消し合う。AB 間の符号付きの経路差は −29 m から 29 m の間を取り、5 m の整数倍は −25 m から 25 m までの11個である。",
    "choiceExplanations": {
      "ア": "AB の中点以外にも、符号付き経路差が ±5、±10、±15、±20、±25 m のそれぞれに対応する節がある。",
      "イ": "正の経路差で条件に合う点が5個ある。負の側にも5個あり、さらに経路差0の中点がある。",
      "ウ": "中点とその一方の側を合わせると6個になる。反対側にも中点から離れた5個の節ができる。",
      "エ": "波源は逆位相なので、経路差が波長の整数倍の点で振動を打ち消し合う。AB 間の符号付きの経路差は −29 m から 29 m の間を取り、5 m の整数倍は −25 m から 25 m までの11個である。",
      "オ": "中点は経路差0で1個だけ数える。正と負の経路差はそれぞれ5個なので、合計は11個になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q37",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "正方形上の点電荷のつり合い"
    ],
    "difficulty": 3,
    "question": "図のように、一辺の長さが l である正方形 ABCD がある。点 A、C に q（q＞0）の電気量をもつ点電荷を固定し、点 B、D に −q の電気量をもつ点電荷 X、Y を置いた。X、Y を、それぞれ点 B、D から正方形の中心 O に向かって、同じ距離ずつ線分 BD 上を動かすと、あるとき、X、Y にかかる力はつり合った。このときの O から X までの距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "l/√6",
      "イ": "l/√5",
      "ウ": "l/2",
      "エ": "l/√3",
      "オ": "l/√2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "OX＝x、OA＝l/√2 とすると、A、C の引力の合力と Y の斥力のつり合いから 2x/(x²＋l²/2)³ᐟ²＝1/(4x²) となる。よって x²＋l²/2＝4x²、すなわち x＝l/√6 である。",
    "choiceExplanations": {
      "ア": "OX＝x、OA＝l/√2 とすると、A、C の引力の合力と Y の斥力のつり合いから 2x/(x²＋l²/2)³ᐟ²＝1/(4x²) となる。よって x²＋l²/2＝4x²、すなわち x＝l/√6 である。",
      "イ": "A、C の引力の合力を求めるには、対角線 BD 方向への射影が必要である。OX＝l/√5 ではこの引力の合力が Y の斥力を上回る。",
      "ウ": "点電荷間の距離 XY は 2x であり、A、C までの距離はそれぞれ √(x²＋l²/2) である。引力の射影を加算すると x²＝l²/6 になる。",
      "エ": "A、C までの距離を求めるとき、O から各頂点への距離は一辺 l でなく l/√2 である。",
      "オ": "l/√2 は初めの OB の長さである。その位置では A と C による BD 方向の合力が D 側の点電荷の斥力より大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q37.webp"
    ],
    "imageAltTexts": [
      "正方形の対角線 AC 上に固定した正電荷と、BD 上を移動させる負電荷 X、Y"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q38",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "スイッチを切った直後の自己誘導"
    ],
    "difficulty": 3,
    "question": "図のように、起電力 V の電池、スイッチ、抵抗値がそれぞれ R_A、R_B の抵抗2個及び自己インダクタンス L のコイルから成る回路がある。回路のスイッチを入れ、十分に時間が経過した後、スイッチを切った。スイッチを切った直後に、抵抗値 R_B の抵抗に流れる電流の向きと大きさの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "A から B、V/L",
      "イ": "A から B、V/R_A",
      "ウ": "B から A、V/L",
      "エ": "B から A、V/R_A",
      "オ": "B から A、V/R_B"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "スイッチを切る直前、コイルと抵抗 R_A の枝には B から A へ V/R_A の定常電流が流れている。直後もコイルの電流は連続で、この電流は抵抗 R_B を A から B へ戻る。",
    "choiceExplanations": {
      "ア": "向きは正しいが、V/L の単位は電流ではなく電流の時間変化率である。",
      "イ": "スイッチを切る直前、コイルと抵抗 R_A の枝には B から A へ V/R_A の定常電流が流れている。直後もコイルの電流は連続で、この電流は抵抗 R_B を A から B へ戻る。",
      "ウ": "コイルの電流は B から A へ保たれるので、閉じたループを構成する抵抗 R_B では A から B に流れる。大きさはコイルに直前まで流れていた V/R_A である。",
      "エ": "大きさは正しいが、B から A という向きはコイルの枝についてである。下の抵抗には逆向きに流れる。",
      "オ": "V/R_B はスイッチを切る前に下の抵抗に流れていた電流の大きさである。切った直後はコイルの電流で大きさと向きが決まる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q38.webp"
    ],
    "imageAltTexts": [
      "電池とスイッチの枝、コイル L と抵抗 R_A の枝、抵抗 R_B の枝からなる回路"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-butsuri-q39",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ホール電圧とキャリアの符号"
    ],
    "difficulty": 3,
    "question": "ホール効果に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「直方体状の試料がある。図のように、試料の幅が d、厚さが h である面と垂直になる方向を y 軸とし、幅方向を x 軸、高さ方向を z 軸とする。試料に y 軸の正の向きに電流 I を流し、z 軸の正の向きに磁束密度 B の磁場を加える。試料中のキャリア（電流の担い手）が磁場からローレンツ力を受け、試料の一端に集まることで、試料内には電流とも磁場とも垂直な x 軸方向の電位差が生じる。\n試料の単位体積当たりのキャリアの数を n、キャリア一つ当たりの電気量を q とすると、試料の x 軸に垂直な二つの面の間の x 軸方向の電位差は［㋐］となる。キャリアがホールであるとき、x 軸の［㋑］の向きに電位が高くなっている。」",
    "choices": {
      "ア": "㋐ IB/(qnd)、㋑ 負",
      "イ": "㋐ IBh/(qnd²)、㋑ 負",
      "ウ": "㋐ IBh/(qnd²)、㋑ 正",
      "エ": "㋐ IB/(qnh)、㋑ 負",
      "オ": "㋐ IB/(qnh)、㋑ 正"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ホールの速さを v とすると I＝nqvdh、横方向の磁気力と電気力のつり合いから電場の大きさは vB なので、電位差は vBd＝IB/(nqh) である。正のホールは x の正方向へ集まり、その側の電位が高くなる。",
    "choiceExplanations": {
      "ア": "電位差は x 方向の幅 d に電場の大きさを掛けるため d が約分される。正のホールが集まるのは x の正の側である。",
      "イ": "電流が通る断面積は dh で、電位差を測る距離は d である。電流と磁場の正の向きから、ホールは x の正の側へ偏る。",
      "ウ": "電位が高い向きは合っているが、電位差は vBd であり、I＝nqvdh で v を消すと h は分母に残る。",
      "エ": "電位差の大きさは正しいが、正電荷に働く磁気力は y の正方向と z の正方向の外積で x の正方向になる。",
      "オ": "ホールの速さを v とすると I＝nqvdh、横方向の磁気力と電気力のつり合いから電場の大きさは vB なので、電位差は vBd＝IB/(nqh) である。正のホールは x の正方向へ集まり、その側の電位が高くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-butsuri/q39.webp"
    ],
    "imageAltTexts": [
      "幅 d、厚さ h の試料の座標軸、電流 I、磁場 B と電位差の方向"
    ]
  }
];
