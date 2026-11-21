import type { Question } from "@/lib/questions/types";

export const KISHO_DAIGAKKO_2024_GAKKA_BUTSURI: Question[] = [
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q27",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "速度・時間グラフと追い付き"
    ],
    "difficulty": 3,
    "question": "図は物体 A と B の速度と時間の関係を示している。はじめ、時刻 t＝0 s に両者は同じ位置にあり、同じ直線上を移動するとき、A が B に追いつく時刻として最も妥当なのはどれか。",
    "choices": {
      "ア": "12 s",
      "イ": "16 s",
      "ウ": "20 s",
      "エ": "24 s",
      "オ": "28 s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最初の8秒の変位はグラフの符号付き面積から A が (−4＋6)×8/2＝8 m、B が32 mである。差の24 mを毎秒2 mずつ縮めるので、8＋24/2＝20秒で追いつく。",
    "choiceExplanations": {
      "ア": "8秒までの変位は A が8 m、B が32 m なので、B が24 m先にいる。その後4秒で縮まるのは8 mである。",
      "イ": "8秒以降の相対速度は 6−4＝2 m/s である。時刻16秒ではまだ8 mの間隔が残っている。",
      "ウ": "最初の8秒の変位はグラフの符号付き面積から A が (−4＋6)×8/2＝8 m、B が32 mである。差の24 mを毎秒2 mずつ縮めるので、8＋24/2＝20秒で追いつく。",
      "エ": "24 m は時刻8秒での間隔であり、時刻ではない。その後12秒でこの間隔を縮める。",
      "オ": "時刻20秒で位置が等しくなった後も A の方が速いので、28秒では A が先にいる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q27.webp"
    ],
    "imageAltTexts": [
      "物体 A は初速 −4.0 m/s から時刻8.0秒で 6.0 m/s に達し、その後一定。B は 4.0 m/s の速度で一定"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q28",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "壁との静止摩擦と棒のつり合い"
    ],
    "difficulty": 3,
    "question": "図のように、長さ L の軽い棒 AB の一端 B を鉛直な粗い壁に付け、他端 A に糸を取り付けて、AB が水平な状態で静止するように糸を壁に固定した。糸と壁とのなす角は30°であった。質量 m のおもりを A に付け、A から徐々に右へ移動させると、A からの距離が x になったとき、B が滑り出した。x として最も妥当なのはどれか。ただし、棒と壁との間の静止摩擦係数を μ とする。",
    "choices": {
      "ア": "L/(1＋√3 μ)",
      "イ": "μL/(1＋√3 μ)",
      "ウ": "√3 μL/(1＋√3 μ)",
      "エ": "L/(√3＋μ)",
      "オ": "μL/(√3＋μ)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "A まわりのモーメントから摩擦力は f＝mgx/L、鉛直のつり合いから張力の鉛直成分は mg−f なので垂直抗力 N＝(mg−f)/√3 である。滑り出すとき f＝μN を用いると x＝μL/(√3＋μ) になる。",
    "choiceExplanations": {
      "ア": "摩擦係数が0に近づくと、B で支えられる鉛直力も0に近づくため、おもりを A からほとんど動かせない。この選択肢はその極限で L になる。",
      "イ": "A まわりのモーメントから摩擦力は mgx/L である。糸の水平成分と鉛直成分の比が 1/√3 なので、分母は 1＋√3 μ にならない。",
      "ウ": "糸の張力と壁の垂直抗力を関係付ける際、30°は鉛直線と糸の角である。水平成分は鉛直成分の 1/√3 である。",
      "エ": "μ＝0 で静止摩擦力は0となり、棒が水平に静止するにはおもりが A にある必要がある。この選択肢は μ＝0 でも正の値となる。",
      "オ": "A まわりのモーメントから摩擦力は f＝mgx/L、鉛直のつり合いから張力の鉛直成分は mg−f なので垂直抗力 N＝(mg−f)/√3 である。滑り出すとき f＝μN を用いると x＝μL/(√3＋μ) になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "右側の鉛直な壁の B と、左端 A の糸で支える棒。糸と壁の角度は30°"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q29",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "斜面上の摩擦とモーターの仕事率"
    ],
    "difficulty": 3,
    "question": "図のように、水平な床に固定された傾斜角が30°の粗い斜面上に質量 0.40 kg の物体があり、滑らかに回転する滑車を介して糸でモーターにつながれている。モーターが毎秒 2.0 m の糸を巻き取るとき、このモーターの仕事率として最も妥当なのはどれか。ただし、重力加速度の大きさを 10 m/s²、物体と斜面との間の動摩擦係数を 0.50 とする。また、物体と滑車との間の糸は常に斜面に平行であるとする。",
    "choices": {
      "ア": "3.7 W",
      "イ": "7.5 W",
      "ウ": "8.9 W",
      "エ": "15 W",
      "オ": "18 W"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "等速なので、糸の張力は mg sin 30°＋0.50 mg cos 30°＝2＋√3 N である。巻き取る速さ 2.0 m/s を掛けると約7.46 W、選択肢では7.5 Wになる。",
    "choiceExplanations": {
      "ア": "斜面方向の重力成分だけでも張力に2 Nが必要なので、秒速2.0 mでは4 Wになる。摩擦の仕事分も加わる。",
      "イ": "等速なので、糸の張力は mg sin 30°＋0.50 mg cos 30°＝2＋√3 N である。巻き取る速さ 2.0 m/s を掛けると約7.46 W、選択肢では7.5 Wになる。",
      "ウ": "摩擦力を求めるときの垂直抗力は mg cos 30° である。斜面に平行な重力成分と摩擦力の合計に速さ2.0 m/sを掛けると、8.9 Wより小さい。",
      "エ": "固定滑車は糸の向きを変えるが、物体は巻き取る糸と同じ速さで動く。速さを2倍して仕事率を求める必要はない。",
      "オ": "糸の張力は (2＋√3) N であり、モーターの仕事率はこれに 2.0 m/s を掛けた値である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q29.webp"
    ],
    "imageAltTexts": [
      "固定滑車を通して質量0.40 kgの物体を30°の斜面に沿って引くモーター"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q30",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "滑らかな台を上り下りする球の速度"
    ],
    "difficulty": 3,
    "question": "図のように、水平で滑らかな床の上に、質量 m の小球と滑らかな曲面をもつ質量 M の台が静止している。小球に速度 v₀ を与え、台に向かって動かしたところ、小球は台の曲面を滑り上がり、台も小球を乗せて動き出した。小球は台のある高さまで上った後、曲面を滑り下り、再び床面上を運動した。小球が再び床面上を運動するときの小球の速度として最も妥当なのはどれか。ただし、速度は図中右向きを正とし、台の曲面の左端は床になだらかにつながっているものとする。",
    "choices": {
      "ア": "−v₀",
      "イ": "2mv₀/(m＋M)",
      "ウ": "2Mv₀/(m＋M)",
      "エ": "(m−M)v₀/(m＋M)",
      "オ": "(M−m)v₀/(m＋M)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "水平の運動量と力学的エネルギーが保存され、小球が元の高さに戻るため、台に対する速度は v₀ から −v₀ へ反転する。台の速度を V として m(V−v₀)＋MV＝mv₀ を解くと、小球の速度 V−v₀ は (m−M)v₀/(m＋M) になる。",
    "choiceExplanations": {
      "ア": "台が動けないときには速さ v₀ のまま反転するが、この問題では台にも運動量とエネルギーが移る。",
      "イ": "2mv₀/(m＋M) は球が床面へ戻ったときの台の速度である。小球の速度はこれから v₀ を引いた値になる。",
      "ウ": "小球の台に対する速度は床面に戻ったときに −v₀ なので、右向きだけを示すこの式は質量によって符号が変わる小球の速度を表せない。",
      "エ": "水平の運動量と力学的エネルギーが保存され、小球が元の高さに戻るため、台に対する速度は v₀ から −v₀ へ反転する。台の速度を V として m(V−v₀)＋MV＝mv₀ を解くと、小球の速度 V−v₀ は (m−M)v₀/(m＋M) になる。",
      "オ": "M が m より十分大きいとき小球は左向きに戻る。右向きを正とした式の分子は M−m ではなく m−M である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q30.webp"
    ],
    "imageAltTexts": [
      "滑らかな床上の曲面をもつ台と、右向きの初速 v₀ の小球"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q31",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "両側のばねで支えた物体の振動周期"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな床の上に質量 m の小物体を置き、一方はばね定数 k の軽いばねを介して、もう一方はばね定数 2k の軽いばねを介して壁に取り付けた。この小物体を、ばねの伸縮方向に単振動させたときの周期として最も妥当なのはどれか。",
    "choices": {
      "ア": "2π√[m/(3k)]",
      "イ": "2π√[m/(2k)]",
      "ウ": "2π√[2m/(3k)]",
      "エ": "2π√(m/k)",
      "オ": "2π√[3m/(2k)]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "物体がつり合いの位置から x ずれると、両ばねはともに変位を戻す向きに力を加える。有効ばね定数は k＋2k＝3k なので、周期は 2π√[m/(3k)] である。",
    "choiceExplanations": {
      "ア": "物体がつり合いの位置から x ずれると、両ばねはともに変位を戻す向きに力を加える。有効ばね定数は k＋2k＝3k なので、周期は 2π√[m/(3k)] である。",
      "イ": "2k のばねだけの場合の周期である。もう一方のばねの復元力も加わるため、周期はより短くなる。",
      "ウ": "運動する物体の質量は m で、ばねは軽い。分子の質量を 2m にする必要はない。",
      "エ": "これは k のばねだけで振動する場合の周期である。両側の力が合わさるので有効ばね定数は k より大きい。",
      "オ": "直列ばねの合成定数 2k/3 を使った値である。この図では両ばねの変位の大きさがそれぞれ x で、復元力を足す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q31.webp"
    ],
    "imageAltTexts": [
      "左のばね定数 k、右のばね定数 2k のばねで支えられた小物体"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q32",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "閉じ込めた空気の圧力と容器のつり合い"
    ],
    "difficulty": 3,
    "question": "底が閉じた質量 M、長さ L、断面積 S の容器を、図Ⅰのようにある液体の上に逆さに立て、空気を閉じ込めた。その際、容器内の空気の圧力は、外部の大気の圧力 P₀ と同じになるようにした。この状態から、図Ⅱのように、容器の底が液面の高さになる位置まで垂直に沈めたところ、容器内の空気部の高さが (9/10)L となった。このとき、図Ⅱの状態で静止させるのに必要な力 F の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさを g とする。また、液体の密度は一様、かつ、容器内の空気の温度は一定としてよく、容器の厚さ、容器内の空気の質量、空気の液体への溶解及び液体の蒸発は無視できるものとする。",
    "choices": {
      "ア": "P₀S/10−Mg",
      "イ": "P₀S/9−Mg",
      "ウ": "9P₀S/10−Mg",
      "エ": "P₀S−Mg",
      "オ": "10P₀S/9−Mg"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ボイルの法則から内部の圧力は P₀×L/(0.9L)＝10P₀/9 となる。底面の内外の圧力差による上向きの力 P₀S/9 から容器の重さ Mg を引いた値が、図Ⅱの下向きの力 F である。",
    "choiceExplanations": {
      "ア": "体積は初めの 9/10 になる。等温変化では圧力はその逆の 10/9 倍となるので、大気圧との差は P₀/9 である。",
      "イ": "ボイルの法則から内部の圧力は P₀×L/(0.9L)＝10P₀/9 となる。底面の内外の圧力差による上向きの力 P₀S/9 から容器の重さ Mg を引いた値が、図Ⅱの下向きの力 F である。",
      "ウ": "空気の高さが 9/10 になっても、等温圧縮により空気の圧力は増えるので、9P₀/10 にはならない。",
      "エ": "容器を押し上げる力は容器の閉じた底の内外の圧力差で決まる。外の大気圧 P₀ だけを使うことはできない。",
      "オ": "10P₀S/9 は内側の空気の押す力である。外側からは大気圧による P₀S の力も下向きにかかる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "図Ⅰ 逆さの容器の開口部が液面にある状態。図Ⅱ 底が液面まで沈み、空気部の高さが (9/10)L になった状態"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q33",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "理想気体と定圧・定積モル比熱"
    ],
    "difficulty": 3,
    "question": "気体の性質に関する記述㋐、㋑、㋒のうち妥当なもののみを全て挙げているのはどれか。\n㋐ 理想気体では、気体分子1個当たりの運動エネルギーの平均値は、同じ温度であれば、分子量が大きいほど大きい。\n㋑ 理想気体では、分子間に働く力や分子の大きさを無視することができる。一方、実際に存在する気体では、特に温度が高いときには分子間に働く力が、また、特に圧力が低いときには分子の大きさが相対的に大きく現れ、理想気体との違いが顕著となる。\n㋒ 物質 1 mol の温度を 1 K 高めるのに必要な熱量をモル比熱という。気体のモル比熱の値は体積や圧力などの条件によって異なり、一般に、体積を一定に保つ場合のモル比熱（定積モル比熱）よりも圧力を一定に保つ場合のモル比熱（定圧モル比熱）の方が大きい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "定圧で加熱すると気体が膨張して外部に仕事をするので、同じ温度上昇に定積の場合よりも多くの熱が必要となる。㋐ と ㋑ は理想気体の平均並進運動エネルギーと実在気体の性質について誤っている。",
    "choiceExplanations": {
      "ア": "理想気体の分子1個の平均並進運動エネルギーは (3/2)k_BT であり、分子の質量には依存しない。",
      "イ": "㋒ は正しいが、同温度で分子量が増えると平均の速さの二乗が下がり、平均並進運動エネルギーは変わらないので ㋐ は誤りである。",
      "ウ": "実在気体では一般に、温度が低いときに分子間力、高圧で密度が高いときに分子の有限な体積の影響が現れやすい。",
      "エ": "㋒ は正しいが、㋑ は温度と圧力の条件が反対である。高温・低圧では一般に理想気体のふるまいに近づく。",
      "オ": "定圧で加熱すると気体が膨張して外部に仕事をするので、同じ温度上昇に定積の場合よりも多くの熱が必要となる。㋐ と ㋑ は理想気体の平均並進運動エネルギーと実在気体の性質について誤っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q34",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "定圧加熱と内部エネルギー"
    ],
    "difficulty": 3,
    "question": "1.2 mol の理想気体に、一定圧力の下で 4.0×10³ J の熱を与えたところ、温度が 400 K から 500 K まで上昇した。このとき、気体の内部エネルギーの増加量として最も妥当なのはどれか。ただし、気体定数を 8.3 J/(mol·K) とする。",
    "choices": {
      "ア": "1.0×10³ J",
      "イ": "1.5×10³ J",
      "ウ": "2.0×10³ J",
      "エ": "3.0×10³ J",
      "オ": "3.5×10³ J"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "定圧なので膨張仕事は PΔV＝nRΔT＝1.2×8.3×100＝996 J となる。熱力学第1法則より内部エネルギーの増加は約 3.0×10³ J である。",
    "choiceExplanations": {
      "ア": "約 1.0×10³ J は定圧で気体がした膨張仕事である。内部エネルギーの増加は、加えた熱からこの仕事を引いた量である。",
      "イ": "1.5×10³ J は単原子分子と仮定して (3/2)nRΔT を計算した値に近い。問題では気体の種類が指定されず、熱量と膨張仕事から求める。",
      "ウ": "熱力学第1法則では、与えた熱 4.0×10³ J から気体の膨張仕事 996 J を引く。熱が半分ずつ分かれるわけではない。",
      "エ": "定圧なので膨張仕事は PΔV＝nRΔT＝1.2×8.3×100＝996 J となる。熱力学第1法則より内部エネルギーの増加は約 3.0×10³ J である。",
      "オ": "3.5×10³ J とするには膨張仕事が約500 Jになる必要があるが、nRΔT は約1000 J である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q35",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "反射音とドップラー効果によるうなり"
    ],
    "difficulty": 3,
    "question": "図のように、音を反射する壁があり、その垂線上に置かれた観測装置との間を、振動数 f の音を発する音源が移動している。いま、音源が一定の速さ u で壁に向かって進んでいるとき、観測装置では音源から直接届く音と壁で反射してから届く音によって、うなりが生じた。単位時間当たりに生じるうなりの回数として最も妥当なのはどれか。ただし、音の速さを V とし、u は V より十分小さいものとする。",
    "choices": {
      "ア": "uf/V",
      "イ": "2uf/V",
      "ウ": "Vuf/[2(V²−u²)]",
      "エ": "Vuf/(V²−u²)",
      "オ": "2Vuf/(V²−u²)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "静止した壁への接近で反射音は Vf/(V−u)、観測装置からの遠ざかりで直接音は Vf/(V＋u) となる。両者の差がうなりの振動数 2Vuf/(V²−u²) である。",
    "choiceExplanations": {
      "ア": "u≪V の近似でも、直接音は振動数が下がり、反射音は上がる。二つのずれを合わせるので、一方だけのずれ uf/V では足りない。",
      "イ": "2uf/V は u² を V² に対して無視した一次近似である。分母に V²−u² を残した式が二つの振動数の差に正確に一致する。",
      "ウ": "直接音と反射音の振動数は Vf/(V＋u) と Vf/(V−u) である。差を通分すると分子の速度差は 2u となる。",
      "エ": "分母は正しいが、二つの波の分母を通分すると V＋u と V−u の差で分子に 2u が出る。",
      "オ": "静止した壁への接近で反射音は Vf/(V−u)、観測装置からの遠ざかりで直接音は Vf/(V＋u) となる。両者の差がうなりの振動数 2Vuf/(V²−u²) である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q35.webp"
    ],
    "imageAltTexts": [
      "観測装置と壁の間で、壁へ向かって速さ u で右に動く音源"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q36",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "二重スリットと屈折率"
    ],
    "difficulty": 3,
    "question": "ヤングの実験に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「空気中に、図のような単スリット S₀ と複スリット S₁、S₂ を設置した。S₁ と S₂ の間隔は d、複スリットからスクリーンまでの距離は l である。ここに、波長 λ の単色光を当てると、スクリーン上に明暗の縞ができる。このとき、隣り合う明線との間隔は［㋐］である。この状態から、複スリットとスクリーンとの間を、空気に対する相対屈折率 n（＞1）の媒質で満たしたとき、隣り合う明線との間隔は［㋑］。\nなお、スクリーンの中央 O から距離 x の位置にある点を P とすると、S₁P と S₂P の距離の差は (d/l)x とみなせる。」",
    "choices": {
      "ア": "㋐ lλ/d、㋑ 広くなる",
      "イ": "㋐ lλ/d、㋑ 変わらない",
      "ウ": "㋐ lλ/d、㋑ 狭くなる",
      "エ": "㋐ dλ/l、㋑ 広くなる",
      "オ": "㋐ dλ/l、㋑ 狭くなる"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "隣り合う明線では経路差 (d/l)x が波長 λ だけ増えるので、間隔は lλ/d である。媒質中では波長が λ/n になり、間隔は空気中の 1/n となる。",
    "choiceExplanations": {
      "ア": "空気中の間隔は合っているが、媒質に入ると波長が λ/n になるので明線の間隔は狭くなる。",
      "イ": "光の振動数は同じだが、屈折率が高い媒質では光速と波長が小さくなる。明線の間隔も波長の変化に応じて小さくなる。",
      "ウ": "隣り合う明線では経路差 (d/l)x が波長 λ だけ増えるので、間隔は lλ/d である。媒質中では波長が λ/n になり、間隔は空気中の 1/n となる。",
      "エ": "空気中では (d/l)Δx＝λ なので Δx＝lλ/d である。媒質中では短くなった波長が式に入るため、間隔は広がらない。",
      "オ": "媒質を入れた際に間隔が縮む点は正しいが、(d/l)Δx＝λ から空気中の間隔は dλ/l ではなく lλ/d である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q36.webp"
    ],
    "imageAltTexts": [
      "単スリット、間隔 d の複スリット、距離 l 先のスクリーン"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q37",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "電位差と静電気力の仕事"
    ],
    "difficulty": 3,
    "question": "一様な電場中に、電場の向きに沿って距離 d だけ離れた2点 A と B がある。質量 m、電気量 q（q＞0）の荷電粒子 X を A に静かに置いたところ、X は静電気力を受けて運動し、速さ v で B を通過した。質量 M、電気量 Q（Q＞0）の別の荷電粒子 Y に外力を加えて B から A までゆっくりと移動させるとき、外力が Y にする仕事として最も妥当なのはどれか。ただし、荷電粒子に働く重力は無視できるものとする。",
    "choices": {
      "ア": "Qmv²/(2q)",
      "イ": "QMv/(2mq)",
      "ウ": "QMv²/(2mq)",
      "エ": "Qmv²/(2qd)",
      "オ": "QmMv²/(2qd)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "X の運動エネルギーの増加は qEd＝mv²/2 なので、A と B の電位差は mv²/(2q) である。外力が Y をゆっくり逆向きに動かす仕事は電位エネルギーの増加 Qmv²/(2q) に等しい。",
    "choiceExplanations": {
      "ア": "X の運動エネルギーの増加は qEd＝mv²/2 なので、A と B の電位差は mv²/(2q) である。外力が Y をゆっくり逆向きに動かす仕事は電位エネルギーの増加 Qmv²/(2q) に等しい。",
      "イ": "X の得た量は運動量ではなく運動エネルギーなので、式には v の二乗が入る。Y の質量 M は必要ない。",
      "ウ": "電位差は X の運動から得られる量である。Y をゆっくり移動させる仕事は電位差に電荷 Q を掛けて求めるため、Y の質量 M には依存しない。",
      "エ": "この式は Y に働く静電気力の大きさ QE に当たる。仕事を求めるときは距離 d を掛ける。",
      "オ": "電場の大きさは X の運動から決まり、Y に必要な仕事は QEd となる。Y の質量や分母に残る d は不要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q38",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "コンデンサーの誘電体・金属板と電源"
    ],
    "difficulty": 3,
    "question": "図のように、極板間隔 d、面積 S で極板間が真空であるコンデンサーと電池、スイッチからなる回路がある。スイッチを閉じてコンデンサーを充電した後、以下の㋐、㋑、㋒のいずれかの操作を行うとする。操作後の結果を比較し、コンデンサーに蓄えられる電荷が最大となる場合及び極板間の電位差が最大となる場合のみをそれぞれ全て挙げているのはどれか。\n㋐ スイッチを閉じたまま、厚さ d、面積 S、比誘電率2の誘電体を極板間に挿入する。\n㋑ スイッチを閉じたまま、厚さ d/2、面積 S の金属板を極板間に挿入する。\n㋒ スイッチを開き、厚さ d/2、面積 S の金属板を極板間に挿入する。",
    "choices": {
      "ア": "電荷 ㋐、電位差 ㋐",
      "イ": "電荷 ㋐、電位差 ㋐・㋑",
      "ウ": "電荷 ㋐・㋑、電位差 ㋐・㋑",
      "エ": "電荷 ㋐・㋑、電位差 ㋒",
      "オ": "電荷 ㋑、電位差 ㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "挿入後はいずれも容量が2倍である。㋐・㋑ は電池につないだままなので電位差は一定で電荷が2倍、㋒ は電荷が一定なので電位差は半分となり、両方の最大は ㋐・㋑ になる。",
    "choiceExplanations": {
      "ア": "比誘電率2の誘電体を入れる場合と電場がかかる空間を半分にする場合で、容量はいずれも2倍になる。㋐ と同じく電池につながる ㋑ も最大になる。",
      "イ": "電位差の組合せは合っているが、電荷は ㋐ と ㋑ に同じ電池電圧がかかり、両者の容量も同じなので等しい。",
      "ウ": "挿入後はいずれも容量が2倍である。㋐・㋑ は電池につないだままなので電位差は一定で電荷が2倍、㋒ は電荷が一定なので電位差は半分となり、両方の最大は ㋐・㋑ になる。",
      "エ": "電荷は ㋐ と ㋑ が最大で合っているが、㋒ では電荷が保存され容量が増えるため、電位差は小さくなる。",
      "オ": "㋐ の容量も ㋑ と同じ2倍で、どちらも電池の電圧に保たれる。電池から切り離した ㋒ では挿入後に電位差は半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q38.webp"
    ],
    "imageAltTexts": [
      "電池・スイッチ・コンデンサーの回路と、極板間に誘電体又は金属板を挿入する模式図"
    ]
  },
  {
    "id": "kisho-daigakko-2024-annual-gakka-butsuri-q39",
    "exam": "kisho-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "直線電流がつくる磁場の合成"
    ],
    "difficulty": 3,
    "question": "図のように、一辺の長さが a の正方形 PQRS の三つの頂点 P、Q、R に、3本の十分に長い直線導線を正方形に対して垂直に配置し、P、Q を通る導線には紙面の裏から表の向きにそれぞれ大きさ I、2I の電流を、R を通る導線には紙面の表から裏の向きに大きさ I の電流を流した。このとき、3本の導線によって S に生じる磁場の強さとして最も妥当なのはどれか。",
    "choices": {
      "ア": "√2 I/(2πa)",
      "イ": "I/(πa)",
      "ウ": "√2 I/(πa)",
      "エ": "I/(πa²)",
      "オ": "√2 I/(πa²)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "P、R による磁場はそれぞれ上向き、右向きに I/(2πa) である。Q の磁場は左上向きで左と上に各 I/(2πa) なので、左右が打ち消され、上向きの強さ I/(πa) が残る。",
    "choiceExplanations": {
      "ア": "これは Q の導線だけによる磁場の強さである。P と R の導線の磁場も向きに注意して加える。",
      "イ": "P、R による磁場はそれぞれ上向き、右向きに I/(2πa) である。Q の磁場は左上向きで左と上に各 I/(2πa) なので、左右が打ち消され、上向きの強さ I/(πa) が残る。",
      "ウ": "それぞれの導線が作る磁場の方向は異なる。S では Q の左向き成分と R の右向き成分が等しく打ち消し合う。",
      "エ": "長い直線電流が作る磁場の強さは電流からの距離の1乗に反比例する。この選択肢は a² に反比例している。",
      "オ": "正方形の対角線の長さは √2 a であり、直線導線からの磁場の強さは距離の2乗ではなく距離に反比例する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035963.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 気象大学校学生採用試験 学科試験」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2024/gakka-butsuri/q39.webp"
    ],
    "imageAltTexts": [
      "正方形の P と Q は手前向き、R は奥向きの電流。磁場を求める点 S は右上"
    ]
  }
];
