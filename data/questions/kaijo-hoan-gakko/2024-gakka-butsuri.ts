import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_GAKKO_2024_GAKKA_BUTSURI: Question[] = [
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q27",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "鉛直投げ上げと落下",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、高さ20 mのビルの屋上から、鉛直上向きに速さ15 m/sで小球を投げ上げたのち、地面に落下した。小球が地面に達するまでに要した時間として最も妥当なのはどれか。\nただし、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "2.0 s",
      "イ": "3.0 s",
      "ウ": "4.0 s",
      "エ": "5.0 s",
      "オ": "6.0 s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "地面を基準とした高さは20＋15t−5t²である。これを0とおいて解くとt＝−1、4となり、投げ上げた後の時刻は4.0秒である。",
    "choiceExplanations": {
      "ア": "投げてから2.0秒後の高さは20＋15×2−5×2²＝30 mであり、まだ地面に達していない。",
      "イ": "3.0秒後には屋上と同じ高さ20 mに戻るので、その後さらに地面まで落ちる時間が必要になる。",
      "ウ": "地面を基準とした高さは20＋15t−5t²である。これを0とおいて解くとt＝−1、4となり、投げ上げた後の時刻は4.0秒である。",
      "エ": "高さの式20＋15t−5t²にt＝5を入れると0より低くなるため、その時刻より前に地面へ達する。",
      "オ": "屋上と同じ高さまで戻るのに3秒かかり、4秒後に地面に達する。6秒は地面へ落下する前の時刻ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q27.webp"
    ],
    "imageAltTexts": [
      "高さ20 mの屋上から鉛直上向きに小球を15 m/sで投げる図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q28",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "棒に働く力とモーメント",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、長さL、質量Mの一様な細い棒が、水平で粗い床と鉛直で滑らかな壁の間に立てかけられており、棒と床とのなす角がθで静止している。このとき、棒が床から受ける摩擦力の大きさFとして最も妥当なのはどれか。\nただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "(Mg/2)sin θ",
      "イ": "(Mg/2)cos θ",
      "ウ": "(Mg/2)tan θ",
      "エ": "Mg/(2 sin θ)",
      "オ": "Mg/(2 tan θ)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "壁からの水平な反力はFと等しい。床との接点まわりでF L sin θ＝Mg(L/2)cos θなので、F＝Mg/(2 tan θ)となる。",
    "choiceExplanations": {
      "ア": "重力のモーメントはMg(L/2)cos θなので、棒と床の角を直角に近づけると摩擦力は0に近づく。sin θに比例する式ではそうならない。",
      "イ": "重力の腕にはcos θが現れるが、壁から受ける反力の腕はL sin θである。モーメントのつり合いでは、この腕でも割る必要がある。",
      "ウ": "tan θは、壁の反力の腕と重力の腕の角度に関する因子の比である。反力を求めるときは重力の腕を反力の腕で割る。",
      "エ": "反力の腕はL sin θだが、重力の腕には(L/2)cos θが必要になる。分子にcos θがないので条件に合わない。",
      "オ": "壁からの水平な反力はFと等しい。床との接点まわりでF L sin θ＝Mg(L/2)cos θなので、F＝Mg/(2 tan θ)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "粗い床と滑らかな壁で支えられた棒と摩擦力F"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q29",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "振り子を放した直後の運動",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "小球の運動に関する次の記述のア、イに当てはまるものの組合せとして最も妥当なのはどれか。\n「図Ⅰのように、天井の点Oから糸で小球をつり下げ、点Oの真下にあるくぎよりも低い位置まで、糸がたるまないようにして小球を持ち上げ、静かに放す。糸はくぎに引っかかるようになっている。図Ⅱのように、小球が点Oの真下に来たときに糸が切れたとすると、その直後、小球は［ア］に運動する。また、図Ⅲのように、小球が、放した高さと同じ高さまで来たときに糸が切れたとすると、その直後、小球は［イ］に運動する。」",
    "choices": {
      "ア": "水平方向、斜め上向き",
      "イ": "水平方向、水平方向",
      "ウ": "水平方向、鉛直下向き",
      "エ": "鉛直下向き、斜め上向き",
      "オ": "鉛直下向き、鉛直下向き"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最下点では速度は円弧の接線に沿うので水平である。もとの高さまで戻ったときには速さが0となり、糸が切れると重力によって鉛直下向きに動く。",
    "choiceExplanations": {
      "ア": "図Ⅱでは接線方向に水平な速度を持つが、図Ⅲではもとの高さに戻ったときに速さが0になる。糸が切れると重力で下に動く。",
      "イ": "図Ⅲでは力学的エネルギーがもとの位置エネルギーに戻り、水平な初速度もない。そのため直後の運動は鉛直下向きである。",
      "ウ": "最下点では速度は円弧の接線に沿うので水平である。もとの高さまで戻ったときには速さが0となり、糸が切れると重力によって鉛直下向きに動く。",
      "エ": "図Ⅱの最下点では糸が鉛直なので、接線方向の速度は水平である。図Ⅲではもとの高さで速さが0になる。",
      "オ": "図Ⅲの運動は鉛直下向きで合うが、図Ⅱでは糸が切れる瞬間の速度が水平なので、その向きに動き始める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q29.webp"
    ],
    "imageAltTexts": [
      "くぎに糸が掛かる振り子の図I・II・III"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q30",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "滑車で結んだ二物体と摩擦",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、水平で粗い台の上に質量mの物体Aを置き、滑らかに回転する滑車を通して、質量3mの物体Bを糸でつないだところ、A及びBは加速度aで動き始めた。このとき、Aと床との間の動摩擦係数として最も妥当なのはどれか。\nただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "3−a/g",
      "イ": "3−2a/g",
      "ウ": "3−3a/g",
      "エ": "3−4a/g",
      "オ": "4−4a/g"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "動摩擦係数をμとすると、二物体の運動方程式を足して3mg−μmg＝4maとなる。mgで割って整理するとμ＝3−4a/gである。",
    "choiceExplanations": {
      "ア": "加速するのは台上のmだけではなく、つり下げられた3mも含む。運動方程式では加速度aに合計質量4mを掛ける。",
      "イ": "AとBの運動方程式を足すと、右辺はma＋3ma＝4maになる。加速度の係数は2mではない。",
      "ウ": "Bだけを考えると張力は3m(g−a)となる。Aを加速するmaも差し引いた値が摩擦力なので、係数は3−3a/gより小さい。",
      "エ": "動摩擦係数をμとすると、二物体の運動方程式を足して3mg−μmg＝4maとなる。mgで割って整理するとμ＝3−4a/gである。",
      "オ": "二物体の合計質量は4mだが、運動を進める重力はつり下がったBに働く3mgだけである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q30.webp"
    ],
    "imageAltTexts": [
      "粗い台の上の物体Aと滑車を介してつながった物体B"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q31",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "浮力と密度",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "密度9.0×10² kg/m³で一様な物体を、密度1.2×10³ kg/m³で一様な液体に浮かべると、物体の一部が液面から出て静止した。このとき、液面より上に出ている物体の体積は、物体全体の体積のおよそ何％か。",
    "choices": {
      "ア": "13％",
      "イ": "15％",
      "ウ": "21％",
      "エ": "25％",
      "オ": "33％"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "静止時は浮力と重力が等しいので、沈んだ体積の割合は物体と液体の密度の比900/1,200＝0.75になる。残りの25％が液面より上に出る。",
    "choiceExplanations": {
      "ア": "浮力の大きさから液体中にある体積の割合は900÷1,200＝0.75と分かるので、上に出る部分は13％より大きい。",
      "イ": "液面より上が15％なら液体中は85％になるが、密度の比900対1,200から液体中の部分は75％である。",
      "ウ": "液体との密度差300 kg/m³を液体の密度1,200 kg/m³で割ると、上に出る割合が求められる。これを計算すると21％ではない。",
      "エ": "静止時は浮力と重力が等しいので、沈んだ体積の割合は物体と液体の密度の比900/1,200＝0.75になる。残りの25％が液面より上に出る。",
      "オ": "33％は密度差300を物体の密度900で割った値に近い。液面上の体積を全体で割るには液体の密度1,200で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q32",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ばね定数と並列ばね",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、ばね定数がそれぞれk_A、k_B、k_CのばねA、B、Cがあり、ばねの一端を天井に固定し、他端におもりPをつり下げたところ、以下の結果が得られた。このとき、k_A、k_B、k_Cの大小関係として最も妥当なのはどれか。\n・AにPをつり下げたとき、ばねは自然長からxだけ伸びてつり合った。\n・BにPをつり下げたとき、ばねは自然長から2xだけ伸びてつり合った。\n・Cを2本用いてPをつり下げたとき、ばねはそれぞれ自然長から2xだけ伸びてつり合った。",
    "choices": {
      "ア": "k_A＞k_B＞k_C",
      "イ": "k_A＞k_B＝k_C",
      "ウ": "k_A＝k_C＜k_B",
      "エ": "k_A＜k_B＝k_C",
      "オ": "k_A＜k_B＜k_C"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "おもりの重さはk_A x、k_B・2x、2k_C・2xのいずれにも等しい。したがってk_A＝2k_B＝4k_Cとなる。",
    "choiceExplanations": {
      "ア": "おもりの重さはk_A x、k_B・2x、2k_C・2xのいずれにも等しい。したがってk_A＝2k_B＝4k_Cとなる。",
      "イ": "BとCの伸びはどちらも2xだが、Cは1本当たりのおもりの分担がBの半分である。k_Cはk_Bの半分になる。",
      "ウ": "C1本の負担する力はAの半分で伸びはAの2倍になるので、ばね定数はAの4分の1になる。",
      "エ": "同じ重さに対してAはBの半分しか伸びないため、Aのばね定数はBより大きい。",
      "オ": "AはBより伸びが小さいのでばね定数が大きい。BとCの伸びは同じで、Cには1本当たり半分の力しかかからない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "A・Bの各1本とCの2本に同じおもりPをつるした図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q33",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "熱・温度・内部エネルギー",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "熱に関する記述ア、イ、ウのうち、妥当なもののみを全て挙げているのはどれか。\nア：20℃の物体を温めて40℃にしたとき、その物体が持っている熱は2倍になる。\nイ：熱は、高温の物体から低温の物体へ自然に移動するが、低温の物体から高温の物体へ自然に移動することもある。\nウ：温度が高いほど、物体の内部エネルギーは大きい。物体の内部エネルギーは、物体に加えられる熱や、物体が外部からされる仕事によって変化する。",
    "choices": {
      "ア": "ア",
      "イ": "ア、ウ",
      "ウ": "イ",
      "エ": "イ、ウ",
      "オ": "ウ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "同じ物体の温度を上げると、一般に内部エネルギーは増える。熱の出入りや外部から受ける仕事によって内部エネルギーが変化する。",
    "choiceExplanations": {
      "ア": "熱は温度差によって移動するエネルギーである。摂氏温度を2倍にしても、物体の内部エネルギーが2倍になるとはいえない。",
      "イ": "ウは正しいが、20℃から40℃への変化は摂氏の目盛りで表したものであり、物体のエネルギーの比が2だとはいえない。",
      "ウ": "熱は自然には高温から低温へ移動する。低温から高温へ熱を送るには、冷蔵庫のように外部から仕事を加えることが必要になる。",
      "エ": "ウは妥当だが、イの低温から高温への熱の移動は、外部から仕事を加えずには自発的に起こらない。",
      "オ": "同じ物体の温度を上げると、一般に内部エネルギーは増える。熱の出入りや外部から受ける仕事によって内部エネルギーが変化する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q34",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "エンジンの熱効率",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "毎秒6.0 gのガソリンを消費して72 kWの出力を発生するエンジンの熱効率として最も妥当なのはどれか。\nただし、ガソリン1.0 gを燃焼させたときに発生する熱量を4.0×10⁴ Jとする。",
    "choices": {
      "ア": "0.30",
      "イ": "0.33",
      "ウ": "0.36",
      "エ": "0.39",
      "オ": "0.42"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "毎秒の入力は6.0×4.0×10⁴＝2.4×10⁵ J、出力は毎秒7.2×10⁴ Jである。両者の比は0.30になる。",
    "choiceExplanations": {
      "ア": "毎秒の入力は6.0×4.0×10⁴＝2.4×10⁵ J、出力は毎秒7.2×10⁴ Jである。両者の比は0.30になる。",
      "イ": "熱効率を0.33とすると240 kWの入力に対して出力は79.2 kWであり、72 kWより大きい。",
      "ウ": "0.36で72 kWを得るには200 kWの入力が必要だが、燃料から毎秒入力される熱は240 kWに相当する。",
      "エ": "0.39なら入力240 kWから出力93.6 kWが得られることになり、設問の出力を上回る。",
      "オ": "入力は燃料の消費量と1 g当たりの発熱量を掛けた240 kWで、72 kWはその0.30倍である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q35",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "進行波の周期と波形の移動",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図は、x軸上を正の向きに伝わる正弦波の波形を表したものである。時刻t＝0 sのときに図の実線で表された波は、t＝0.30 sのときに初めて図の破線のような波形となった。この波の周期として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.40 s",
      "イ": "0.60 s",
      "ウ": "0.90 s",
      "エ": "1.2 s",
      "オ": "2.5 s"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "波長は20 mで、実線の山を右へ15 m動かすと、初めて破線の山に重なる。0.30秒で波長の3/4進むので、1波長分の時間は0.40秒である。",
    "choiceExplanations": {
      "ア": "波長は20 mで、実線の山を右へ15 m動かすと、初めて破線の山に重なる。0.30秒で波長の3/4進むので、1波長分の時間は0.40秒である。",
      "イ": "周期が0.60秒なら0.30秒で半波長の10 m進むが、最初に同じ波形になる移動距離は15 mである。",
      "ウ": "周期が0.90秒なら0.30秒で波長の1/3しか進まない。図では正方向に3/4波長移動している。",
      "エ": "破線は実線を左へ5 m動かしても重なるが、波は正方向に進む。右へ15 mの移動を使って周期を求める。",
      "オ": "周期が2.5秒なら0.30秒の移動は波長の約1/8にすぎず、図の15 mのずれより小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q35.webp"
    ],
    "imageAltTexts": [
      "実線と破線で示した正弦波と位置・変位の目盛り"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q36",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "遠ざかる音源のドップラー効果",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "900 Hzのサイレンを鳴らしながら直線上を20 m/sの速さで走る自動車がある。この自動車の進行方向後方に観測者が静止している場合、観測者が聞くサイレンの音の振動数として最も妥当なのはどれか。\nただし、音速を340 m/sとする。",
    "choices": {
      "ア": "820 Hz",
      "イ": "850 Hz",
      "ウ": "880 Hz",
      "エ": "920 Hz",
      "オ": "950 Hz"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "後方の音波の波長は、音が進む距離と音源が遠ざかる距離を合わせて(340＋20)/900 mとなる。音速をこれで割ると850 Hzである。",
    "choiceExplanations": {
      "ア": "観測者には(340＋20)/900 m間隔で音の波が届く。この間隔から求める振動数は820 Hzより高い。",
      "イ": "後方の音波の波長は、音が進む距離と音源が遠ざかる距離を合わせて(340＋20)/900 mとなる。音速をこれで割ると850 Hzである。",
      "ウ": "遠ざかる音源に対する周波数の比は340/(340＋20)である。900 Hzに掛けると880 Hzより低い。",
      "エ": "音源が遠ざかるときは届く波長が長くなるので、周波数は元の900 Hzより低くなる。",
      "オ": "950 Hzのように元の振動数より高くなるのは、音源が近づいて波長が短くなる場合である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q36.webp"
    ],
    "imageAltTexts": [
      "静止した観測者から20 m/sで遠ざかる900 Hzのサイレンを鳴らした自動車"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q37",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "虫眼鏡と拡大した虚像",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "レンズに関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「物体を拡大して見ることができる虫眼鏡は［ア］レンズでできている。物体から［ア］レンズまでの距離をa、焦点距離をfとするとき、物体を拡大して見るためには、［イ］となる位置に物体を置く必要がある。また、このとき見える像は［ウ］である。」",
    "choices": {
      "ア": "凸、a＜f、実像",
      "イ": "凸、a＜f、虚像",
      "ウ": "凸、a＞f、実像",
      "エ": "凹、a＜f、虚像",
      "オ": "凹、a＞f、実像"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "虫眼鏡には凸レンズを使う。物体を焦点より内側に置くと、物体と同じ向きに拡大された虚像が見える。",
    "choiceExplanations": {
      "ア": "凸レンズの焦点より内側に物体を置くと、出た光線は実際には一点に集まらない。像は光を逆に延長して見える虚像である。",
      "イ": "虫眼鏡には凸レンズを使う。物体を焦点より内側に置くと、物体と同じ向きに拡大された虚像が見える。",
      "ウ": "焦点より外側では凸レンズが倒立した実像を作る。虫眼鏡として正立拡大像を見るには、焦点より内側に物体を置く。",
      "エ": "凹レンズによる実物の像は、正立の虚像になるが小さく見える。虫眼鏡に使うのは凸レンズである。",
      "オ": "凹レンズを通った光は発散するため、実物からの光を集めて拡大した実像をつくることはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q38",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "長さを半分にした抵抗の並列接続",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、均質で一様な太さの抵抗を、起電力一定の直流電源に接続すると、回路には大きさIの電流が流れた。この抵抗を長さが2等分されるように分割し、図Ⅱのように並列にして同じ電源に接続した場合、回路に流れる電流の大きさI′として最も妥当なのはどれか。\nただし、導線の抵抗及び電源の内部抵抗は無視できるものとする。",
    "choices": {
      "ア": "I/4",
      "イ": "I/2",
      "ウ": "I",
      "エ": "2I",
      "オ": "4I"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "抵抗値は長さに比例するため、切断した各抵抗はR/2となる。2本を並列にするとR/4で、同じ電圧では電流はIの4倍になる。",
    "choiceExplanations": {
      "ア": "元の抵抗をRとすると、R/4になるのは合成抵抗である。電圧一定なら電流は抵抗に反比例し、4倍になる。",
      "イ": "分割した抵抗の1本がR/2になる。これを同じ電圧につなぐと枝1本だけで2Iとなり、全体はさらに大きい。",
      "ウ": "分割後の2本を直列に戻せば元の抵抗値に等しい。並列では合成抵抗が小さくなる。",
      "エ": "2Iは分割した1本だけに流れる電流である。回路全体の電流は2本の枝に流れる電流を足す。",
      "オ": "抵抗値は長さに比例するため、切断した各抵抗はR/2となる。2本を並列にするとR/4で、同じ電圧では電流はIの4倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q38.webp"
    ],
    "imageAltTexts": [
      "切断する前の抵抗1本と切断後の並列接続を示す回路"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-butsuri-q39",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "直流モーターの回転方向",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "直流モーターに関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「図は、直流モーターの仕組みを表したものである。二つの磁石の間には［ア］の向きに磁場が生じる。この磁場中に置かれたコイルに、図Ⅰの状態において、A→B→C→Dの向きに電流を流すと、辺AB及び辺CDに力がはたらき、図Ⅱの状態において、コイルは［イ］に回転する。電流の向きを逆（D→C→B→Aの向き）にしたとき、コイルの回転の向きは［ウ］。」",
    "choices": {
      "ア": "N極→S極、時計まわり（図Ⅱ中のaの向き）、逆になる",
      "イ": "N極→S極、反時計まわり（図Ⅱ中のbの向き）、変わらない",
      "ウ": "N極→S極、反時計まわり（図Ⅱ中のbの向き）、逆になる",
      "エ": "S極→N極、時計まわり（図Ⅱ中のaの向き）、逆になる",
      "オ": "S極→N極、反時計まわり（図Ⅱ中のbの向き）、変わらない"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "磁場はN極からS極に向かう。フレミングの左手の法則で図ⅡのA側は上、D側は下に力を受けて時計まわりに回転し、電流を逆にすると力と回転の向きも逆になる。",
    "choiceExplanations": {
      "ア": "磁場はN極からS極に向かう。フレミングの左手の法則で図ⅡのA側は上、D側は下に力を受けて時計まわりに回転し、電流を逆にすると力と回転の向きも逆になる。",
      "イ": "元の電流ではA側が上、D側が下に力を受けるので時計まわりになる。電流を逆にすると両側に働く力が反転する。",
      "ウ": "磁場の向きと逆転については合っているが、もとの電流で左側のAに上向きの力が働くので、aの時計まわりである。",
      "エ": "力と回転の対応は合うが、磁石間の磁場はN極から出てS極に向かう。",
      "オ": "磁場はN極からS極に向かう。電流を反転させるとコイルに働く力の向きが逆になるので、回転の向きも変わる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035956.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-butsuri/q39.webp"
    ],
    "imageAltTexts": [
      "磁石とコイル、電流の向き、整流子及び回転の向きを示した図Iと図II"
    ]
  }
];
