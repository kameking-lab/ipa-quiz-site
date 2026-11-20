import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2026_SENMON_KAGAKU: Question[] = [
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q10",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "気体分子の二乗平均平方根速さ",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "20 ℃におけるN₂分子の根平均二乗速度として最も妥当なのはどれか。ただし、N₂分子は理想気体とし、N₂のモル質量を28×10⁻³ kg·mol⁻¹、気体定数を8.31 J·K⁻¹·mol⁻¹とする。なお、圧力をP、質量をm、平均二乗速度をc²の平均、体積Vに含まれる分子数をNとすると、PV＝Nm(c²の平均)/3の関係があることを用いてもよい。",
    "choices": {
      "ア": "4.1×10² m·s⁻¹",
      "イ": "5.1×10² m·s⁻¹",
      "ウ": "6.1×10² m·s⁻¹",
      "エ": "7.1×10² m·s⁻¹",
      "オ": "8.1×10² m·s⁻¹"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "PV＝nRTと気体分子運動論の式を比べると、二乗平均は3RT/Mである。T＝293 K、M＝0.028 kg/molを入れて平方根を取ると約5.1×10² m/sとなる。",
    "choiceExplanations": {
      "ア": "理想気体の式から速さの二乗平均は3RT/Mである。293 Kでこの式を計算すると約2.61×10⁵ m²/s²で、平方根は410 m/sより大きい。",
      "イ": "PV＝nRTと気体分子運動論の式を比べると、二乗平均は3RT/Mである。T＝293 K、M＝0.028 kg/molを入れて平方根を取ると約5.1×10² m/sとなる。",
      "ウ": "610 m/sを二乗すると約3.72×10⁵ m²/s²である。温度293 Kとモル質量0.028 kg/molで得られる3RT/Mは約2.61×10⁵ m²/s²にとどまる。",
      "エ": "温度には摂氏の値ではなく絶対温度を用いる。293 Kでの速度の二乗平均の平方根は約511 m/sで、710 m/sには達しない。",
      "オ": "窒素分子1 molの質量は窒素原子の倍の28 gである。モル質量をkg単位で0.028として用いると、与えられた温度で810 m/sにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q11",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "分子の自由度",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "H₂、H₂Oの各分子と、ア〜オに示す並進、回転、振動の各自由度の数の組合せとして最も妥当なのはどれか。\n（並進・回転・振動）\nア 2・0・0\nイ 3・2・1\nウ 3・2・3\nエ 3・3・2\nオ 3・3・3",
    "choices": {
      "ア": "H₂ ア・H₂O エ",
      "イ": "H₂ イ・H₂O エ",
      "ウ": "H₂ イ・H₂O オ",
      "エ": "H₂ ウ・H₂O ア",
      "オ": "H₂ ウ・H₂O オ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "直線形のH₂は並進3・回転2・振動1である。折れ線形のH₂Oには並進3・回転3があり、残る3が振動自由度である。",
    "choiceExplanations": {
      "ア": "H₂は空間の3方向に並進し、直線に垂直な二軸に関して回転できる。振動する結合も1つあるため、アの自由度は当てはまらない。",
      "イ": "H₂はイで正しい。三原子の折れ線形であるH₂Oは9−3−3＝3の振動自由度を持つため、振動自由度2のエではない。",
      "ウ": "直線形のH₂は並進3・回転2・振動1である。折れ線形のH₂Oには並進3・回転3があり、残る3が振動自由度である。",
      "エ": "H₂の二原子が持つ全自由度は6で、並進と回転に計5を使うため振動は1である。H₂Oにも3つの並進自由度があるのでアにはならない。",
      "オ": "H₂Oのオは正しい。H₂の振動は二原子間の結合の伸縮に対応する1つだけである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q12",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "冷凍機の最大成績係数",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように温度T_cの低温熱源から温度T_hの高温シンクへq_cの熱を移すとき、追加した仕事wと輸送された熱エネルギーq_cの比q_c/wの最大値として最も妥当なのはどれか。",
    "choices": {
      "ア": "T_c/(T_h−T_c)",
      "イ": "T_h/(T_h−T_c)",
      "ウ": "(T_h−T_c)/T_c",
      "エ": "(T_h−T_c)/T_h",
      "オ": "T_c/T_h"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "可逆な極限ではq_h/T_h＝q_c/T_cであり、熱収支はw＝q_h−q_cである。これらからq_c/w＝T_c/(T_h−T_c)を得る。",
    "choiceExplanations": {
      "ア": "可逆な極限ではq_h/T_h＝q_c/T_cであり、熱収支はw＝q_h−q_cである。これらからq_c/w＝T_c/(T_h−T_c)を得る。",
      "イ": "これは高温側に放出する熱量を分子に置いたq_h/wで、暖房用のヒートポンプの成績係数である。求める比には低温側から受け取るq_cを使う。",
      "ウ": "この式は冷凍機に入れる仕事を取り出す熱で割ったw/q_cである。設問のq_c/wとは分子と分母が逆である。",
      "エ": "この式は二つの熱源の間で動く可逆熱機関の効率1−T_c/T_hである。冷凍機で熱を移す際の成績係数とは異なる。",
      "オ": "この比は可逆の場合のq_c/q_hである。分母は高温側へ出す熱そのものではなく、投入した仕事q_h−q_cである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q12.webp"
    ],
    "imageAltTexts": [
      "低温熱源から熱q_cを受け高温シンクに熱q_hを渡す冷却器の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q13",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "三重点と蒸気圧曲線",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ベンゼンの固体及び液体状態における蒸気圧P［Pa］は、絶対温度T［K］の関数としてそれぞれ次式で示される。\nlog₁₀ P_固体＝11.971−2310/T、250＜T＜280\nlog₁₀ P_液体＝10.087−1784/T、275＜T＜315\nこのとき、ベンゼンの三重点の温度と、横軸が温度、縦軸が圧力の図の中で、三重点における、気―液曲線の勾配に対する気―固曲線の勾配の比の組合せとして最も妥当なのはどれか。なお、必要に応じて次式を用いてもよい。\n(d log₁₀P)/dP＝d[(logₑP)/(logₑ10)]/dP＝1/(2.303 P)",
    "choices": {
      "ア": "279.2 K・1.29",
      "イ": "279.2 K・1.74",
      "ウ": "288.6 K・1.29",
      "エ": "288.6 K・1.74",
      "オ": "288.6 K・2.37"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "固体と液体の蒸気圧を等置すると、1.884＝526/TからT≒279.2 Kを得る。圧力と温度が共通の三重点では、勾配の比は2310/1784≒1.29である。",
    "choiceExplanations": {
      "ア": "固体と液体の蒸気圧を等置すると、1.884＝526/TからT≒279.2 Kを得る。圧力と温度が共通の三重点では、勾配の比は2310/1784≒1.29である。",
      "イ": "温度は蒸気圧を等置した値である。両曲線についてdP/dTは2.303Pと1/T²を共通に含むので、勾配の比は2310/1784になる。",
      "ウ": "勾配の比1.29は合っている。三重点は固体と液体の蒸気圧が一致するT＝526/1.884であり、288.6 Kではない。",
      "エ": "288.6 Kは与えられた固体側の式の適用範囲250＜T＜280から外れる。両式で傾きに効く係数の比も約1.29になる。",
      "オ": "三重点は二つの蒸気圧の式を等置し、差を取ってTを解く。勾配は対数を圧力に戻して比較するが、その共通因子が消えるので比は2.37にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q14",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "アレニウス式と活性化エネルギー",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の反応式に示すように、五酸化二窒素は二酸化窒素と酸素に分解する。\nN₂O₅ → 2NO₂＋(1/2)O₂\n様々な温度T［K］における分解反応の反応速度定数k［s⁻¹］を求め、温度の逆数に対して反応速度定数の自然対数をプロットしたところ、図のように、測定点は、傾きa＝−1.24×10⁴ K、切片b＝54.0の直線上に位置した。このとき、この分解反応の活性化エネルギーとして最も妥当なのはどれか。ただし、気体定数を8.31 J·mol⁻¹·K⁻¹とする。",
    "choices": {
      "ア": "11.4 kJ·mol⁻¹",
      "イ": "54.0 kJ·mol⁻¹",
      "ウ": "103 kJ·mol⁻¹",
      "エ": "148 kJ·mol⁻¹",
      "オ": "191 kJ·mol⁻¹"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "アレニウス式の対数を取るとln k＝ln A−E_a/(RT)である。傾き−1.24×10⁴ Kは−E_a/Rなので、E_a＝1.24×10⁴×8.31≒103 kJ/molとなる。",
    "choiceExplanations": {
      "ア": "活性化エネルギーの計算では、アレニウスプロットの傾きの絶対値に気体定数を掛ける。11.4 kJ/molでは傾きの絶対値が1.24×10⁴ Kより小さくなる。",
      "イ": "54.0は直線の切片で、頻度因子の自然対数に当たる。活性化エネルギーを決めるのは切片ではなく傾きである。",
      "ウ": "アレニウス式の対数を取るとln k＝ln A−E_a/(RT)である。傾き−1.24×10⁴ Kは−E_a/Rなので、E_a＝1.24×10⁴×8.31≒103 kJ/molとなる。",
      "エ": "縦軸は自然対数なので、傾きの絶対値と気体定数をそのまま掛け合わせる。1 Jを1/1000 kJに換算すると、148 kJ/molではなく約103 kJ/molになる。",
      "オ": "191 kJ/molならln k対1/Tの傾きは約−2.30×10⁴ Kになる。図の−1.24×10⁴ Kとは一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q14.webp"
    ],
    "imageAltTexts": [
      "ln kを1/Tに対して描いた右下がりの原グラフ"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q15",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "化学平衡の移動",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "平衡状態にある次の化学反応系に関する記述ア〜オのうち、妥当なもののみを挙げているのはどれか。\n(3/2)H₂(g)＋(1/2)N₂(g) ⇄ NH₃(g)　標準生成エンタルピー＝−46.1 kJ·mol⁻¹\nア 系の温度を下げると、平衡は右側へ移動する。\nイ 系の圧力を下げると、平衡は右側へ移動する。\nウ 系に水素ガスを加えると、平衡は左側へ移動する。\nエ この系の右向きの反応は、発熱反応である。\nオ この反応の平衡定数は系の温度に依存しない。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、エ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、オ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "標準生成エンタルピーは負で、右向きの反応では熱が放出される。温度が下がると平衡は発熱方向に移るので、アとエが正しい。",
    "choiceExplanations": {
      "ア": "温度を下げると発熱方向の右側が有利になる。ただし圧力を下げると気体の物質量が多い左側が有利となるため、イは正しくない。",
      "イ": "標準生成エンタルピーは負で、右向きの反応では熱が放出される。温度が下がると平衡は発熱方向に移るので、アとエが正しい。",
      "ウ": "圧力低下は気体の物質量が多い左側を有利にし、水素を加えるとそれを消費する右側が有利になる。イとウはいずれも向きが逆である。",
      "エ": "エが示す発熱反応という説明は正しい。イの圧力低下では左側の気体の量が2 mol、右側は1 molなので左へ移る。",
      "オ": "水素の分圧が増えた直後は反応商が下がり、平衡に向かって右へ反応する。また発熱反応の平衡定数は一般に温度が上がると小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q16",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "ルイス酸と配位子",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次に示すア、イ、ウのそれぞれの反応において、ルイス酸として働く化学種の組合せとして最も妥当なのはどれか。\nア BF₃＋NH₃ → H₃NBF₃\nイ I⁻＋I₂ → I₃⁻\nウ Ni＋4CO → Ni(CO)₄",
    "choices": {
      "ア": "ア BF₃・イ I₂・ウ Ni",
      "イ": "ア BF₃・イ I⁻・ウ Ni",
      "ウ": "ア BF₃・イ I⁻・ウ CO",
      "エ": "ア NH₃・イ I₂・ウ CO",
      "オ": "ア NH₃・イ I⁻・ウ Ni"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "電子対を受け取るのがルイス酸である。アでは電子不足のBF₃、イではI⁻の電子対を受けるI₂、ウではCOから電子対を受ける中心金属Niが当たる。",
    "choiceExplanations": {
      "ア": "電子対を受け取るのがルイス酸である。アでは電子不足のBF₃、イではI⁻の電子対を受けるI₂、ウではCOから電子対を受ける中心金属Niが当たる。",
      "イ": "I⁻は電子対を供与するルイス塩基である。イで受け手となるのは中性のI₂である。",
      "ウ": "イのI⁻は電子対の供与体である。ウでもCOは配位子として電子対を供与するため、酸として選ぶのはNiである。",
      "エ": "NH₃の窒素は非共有電子対をBF₃に供与する。COも金属への電子対供与を行うので、この組合せにはルイス塩基が含まれている。",
      "オ": "アではNH₃がBF₃に、イではI⁻がI₂に電子対を供与する。受け手を選ぶため、アとイの組合せが逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q17",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "双極子モーメントとイオン性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "塩化水素HClの双極子モーメントが1.1 D（デバイ）、H―Cl原子間距離が130 pmであるとき、H―Cl結合のイオン性として最も妥当なのはどれか。ただし、電気素量e＝1.6×10⁻¹⁹ C、1.0 D＝3.3×10⁻³⁰ C·mとする。また、1 pm＝10⁻¹² mである。",
    "choices": {
      "ア": "5.0％",
      "イ": "10％",
      "ウ": "17％",
      "エ": "28％",
      "オ": "41％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "実測の双極子は1.1×3.3×10⁻³⁰ C·mで、完全なイオン結合の双極子は(1.6×10⁻¹⁹)×(130×10⁻¹²) C·mである。その比は約0.17なのでイオン性は17％である。",
    "choiceExplanations": {
      "ア": "完全なイオン結合に対応する双極子はe×130 pm＝2.08×10⁻²⁹ C·mである。実測値は3.63×10⁻³⁰ C·mなので、比は5％より大きい。",
      "イ": "10％なら観測双極子は2.08×10⁻³⁰ C·mになる。1.1 Dを換算した3.63×10⁻³⁰ C·mの方が大きい。",
      "ウ": "実測の双極子は1.1×3.3×10⁻³⁰ C·mで、完全なイオン結合の双極子は(1.6×10⁻¹⁹)×(130×10⁻¹²) C·mである。その比は約0.17なのでイオン性は17％である。",
      "エ": "1.1 DをC·mに換算し、電気素量と距離の積で割ると約0.17になる。28％では実測の双極子より大きな値を予測する。",
      "オ": "電気素量の41％が130 pm離れているなら、双極子は約8.5×10⁻³⁰ C·mになる。これは設問の実測値の2倍以上である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q18",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "電子配置とフントの規則",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "炭素原子（原子番号6）と酸素原子（原子番号8）の基底状態における、2p軌道の電子配置を表した図の組合せとして最も妥当なのはどれか。ただし、図中の□は一つの軌道を、上向きと下向きの矢印は電子とそのスピンの向きをそれぞれ表しているものとする。各図の左は炭素原子、右は酸素原子である。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "炭素の2p電子は2個なので、二つの軌道に同じ向きで入る。酸素の4個は三つの軌道を一つずつ同じ向きで占めた後、一つの軌道に反対向きの電子を入れて対を作る。",
    "choiceExplanations": {
      "ア": "炭素の2p電子2個は縮退した別々の軌道に同じ向きのスピンで入る。酸素でも二つの対を先に作らず、三つの軌道にまず一つずつ電子が入る。",
      "イ": "酸素の配置は合っているが、炭素では一つの軌道に対を作るより、電子が別々の軌道に同じ向きのスピンで入る方が基底状態になる。",
      "ウ": "炭素の配置は正しいが、一つの軌道に入る酸素の2電子は同じスピンを持てない。電子対には反対向きのスピンが必要である。",
      "エ": "炭素の2p電子は2個なので、二つの軌道に同じ向きで入る。酸素の4個は三つの軌道を一つずつ同じ向きで占めた後、一つの軌道に反対向きの電子を入れて対を作る。",
      "オ": "同じ軌道に入る二つの電子のスピンは反対向きでなければならない。この図のように一つの軌道に同じスピンの電子を二つ入れることはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q18-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q18-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q18-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q18-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q18-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q19",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "界面活性剤のクラフト点",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "イオン性界面活性剤の分子集合状態の違いを、温度と水への溶解度の関係から考える。水和固体、ミセル、モノマー、クラフト点の各用語と、図の空欄ア〜オのうち対応するものの組合せとして最も妥当なのはどれか。ただし、図の空欄ア、イ、ウには分子集合状態の名称、エには濃度の名称、オには温度の名称が当てはまる。",
    "choices": {
      "ア": "水和固体ア・ミセルイ・モノマーウ・クラフト点エ",
      "イ": "水和固体ア・ミセルイ・モノマーウ・クラフト点オ",
      "ウ": "水和固体イ・ミセルア・モノマーウ・クラフト点エ",
      "エ": "水和固体ウ・ミセルア・モノマーイ・クラフト点エ",
      "オ": "水和固体ウ・ミセルア・モノマーイ・クラフト点オ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "低温で溶解度より高いアでは水和固体が存在し、高温で臨界ミセル濃度を超えるイではミセルができる。濃度が低いウにはモノマーがあり、溶解度曲線が臨界ミセル濃度に達する温度オがクラフト点である。",
    "choiceExplanations": {
      "ア": "三つの集合状態は合っている。クラフト点は溶解度が臨界ミセル濃度に達する温度なので、濃度軸のエではなく温度軸のオである。",
      "イ": "低温で溶解度より高いアでは水和固体が存在し、高温で臨界ミセル濃度を超えるイではミセルができる。濃度が低いウにはモノマーがあり、溶解度曲線が臨界ミセル濃度に達する温度オがクラフト点である。",
      "ウ": "温度が低く溶解度が不足するアでは、水和固体が残る。ミセルが形成されるのはクラフト点より上で臨界濃度を超えるイである。",
      "エ": "ウは濃度が臨界ミセル濃度より低い領域で、主にモノマーが溶けている。水和固体に当たるのは低温で溶解度を超えたアである。",
      "オ": "オをクラフト点とするのは正しい。温度が高く、臨界ミセル濃度を超えるイはモノマーだけの領域ではなくミセルができる領域である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q19.webp"
    ],
    "imageAltTexts": [
      "温度と濃度に対する界面活性剤の相領域を示した原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q20",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "燃料電池の標準起電力",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図は、電解質にリン酸を用いた燃料電池の模式図である。電極部分は白金触媒をつけた多孔質の板であり、水素や酸素を通過させ、また、電解質水溶液部分では水溶液中をH⁺が移動する。このとき、標準状態におけるこの電池の起電力として最も妥当なのはどれか。ただし、水の標準生成ギブズエネルギーを−237 kJ·mol⁻¹、ファラデー定数を9.65×10⁴ C·mol⁻¹とする。",
    "choices": {
      "ア": "0.615 V",
      "イ": "0.965 V",
      "ウ": "1.23 V",
      "エ": "2.45 V",
      "オ": "3.08 V"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "H₂＋(1/2)O₂→H₂Oで水1 molが生じると、電子は2 mol移動する。ΔG°＝−nFE°から、E°＝237,000÷(2×96,500)≒1.23 Vとなる。",
    "choiceExplanations": {
      "ア": "0.615 Vは水1 mol分のギブズエネルギー変化を4 mol分の電子の電荷で割った値である。4 mol分の電子を使う反応式なら、水が2 mol生じるためギブズエネルギー変化も2倍になる。",
      "イ": "必要な電荷は2×9.65×10⁴ C/molである。これに0.965 Vを掛けても、水1 mol生成時の237 kJに達しない。",
      "ウ": "H₂＋(1/2)O₂→H₂Oで水1 molが生じると、電子は2 mol移動する。ΔG°＝−nFE°から、E°＝237,000÷(2×96,500)≒1.23 Vとなる。",
      "エ": "2.45 Vは電子を1 molと数えた場合の値に近い。水1 molを得るにはH₂の酸化で2 molの電子が移動する。",
      "オ": "水の標準生成ギブズエネルギーの大きさ237 kJ/molを、対応する電子2 molの電荷で割る。3.08 Vはこの比より大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q20.webp"
    ],
    "imageAltTexts": [
      "リン酸を電解質に使う燃料電池の電極・反応物・プロトン移動を示した原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q21",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "グラファイトの結合",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "グラファイト（黒鉛）に関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「グラファイトは炭素原子の六員環が平面に連なる層からできており、炭素原子間の結合は［ア］混成軌道によるσ結合である。混成に加わらない［イ］軌道同士はπ結合をつくり、電子が非局在化しているため電気伝導性がある。また、層内の炭素の結合距離は層間の炭素の結合距離よりも［ウ］。」",
    "choices": {
      "ア": "sp²・1s・短い",
      "イ": "sp²・2p・長い",
      "ウ": "sp²・2p・短い",
      "エ": "sp³・1s・短い",
      "オ": "sp³・2p・長い"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各炭素はsp²軌道で平面内の三つのσ結合をつくり、面に垂直な未混成2p軌道の重なりでπ電子が非局在化する。層内の共有結合距離は層間隔より短い。",
    "choiceExplanations": {
      "ア": "平面のσ結合にsp²軌道を用いる点は合う。π結合に使われるのは最内殻の1sではなく、混成に加わらない2p軌道である。",
      "イ": "混成に加わらない2p軌道がπ結合をつくる。層間は層内の共有結合ほど強く結び付かないため、層間隔の方が大きい。",
      "ウ": "各炭素はsp²軌道で平面内の三つのσ結合をつくり、面に垂直な未混成2p軌道の重なりでπ電子が非局在化する。層内の共有結合距離は層間隔より短い。",
      "エ": "sp³混成の炭素は通常、ダイヤモンドのように四面体の方向に結合する。グラファイトは平面構造で、π結合をつくるのは2p軌道である。",
      "オ": "グラファイトの層内では一つの炭素が三つの隣接炭素と結合するのでsp²混成である。また、層内のC―C結合距離は層間隔より短い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q22",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "チタン酸バリウムの相転移",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "チタン酸バリウムに関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「チタン酸バリウムは［ア］構造をもつ酸化物である。高温のチタン酸バリウムを冷却するとキュリー温度を境に［イ］に結晶構造が変わり、［ウ］となる。」",
    "choices": {
      "ア": "スピネル・正方晶から立方晶・強誘電体",
      "イ": "スピネル・立方晶から正方晶・常誘電体",
      "ウ": "ペロブスカイト・正方晶から立方晶・強誘電体",
      "エ": "ペロブスカイト・正方晶から立方晶・常誘電体",
      "オ": "ペロブスカイト・立方晶から正方晶・強誘電体"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "BaTiO₃はペロブスカイト型酸化物である。冷却してキュリー温度を下回ると立方晶から正方晶へ変わり、イオン位置のずれにより自発分極を持つ。",
    "choiceExplanations": {
      "ア": "BaTiO₃はABO₃型のペロブスカイトである。高温の立方晶から冷却すると正方晶への転移が起きるため、イの順序も逆である。",
      "イ": "立方晶から正方晶に変わる点は合う。構造はスピネルではなくペロブスカイトで、低温側の正方晶には自発分極がある。",
      "ウ": "ペロブスカイトと強誘電体は合っている。冷却では高温の立方晶から低温の正方晶へ移る。",
      "エ": "ペロブスカイトである点は正しい。冷却に伴って立方晶からずれた正方晶では自発分極が生じ、強誘電体になる。",
      "オ": "BaTiO₃はペロブスカイト型酸化物である。冷却してキュリー温度を下回ると立方晶から正方晶へ変わり、イオン位置のずれにより自発分極を持つ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q23",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "八面体錯体の高スピン・低スピン",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "[Mn(H₂O)₆]²⁺と[Mn(CN)₆]⁴⁻は6配位八面体型の錯イオンで、前者は高スピン型、後者は低スピン型の電子配置をとる。それぞれのd軌道の電子配置をA〜Fの中から選び出したものの組合せとして最も妥当なのはどれか。ただし、図中の横線は軌道を、上向きと下向きの矢印はそれぞれ電子とそのスピンを表している。また、Mnの原子番号は25である。",
    "choices": {
      "ア": "[Mn(H₂O)₆]²⁺ A・[Mn(CN)₆]⁴⁻ F",
      "イ": "[Mn(H₂O)₆]²⁺ B・[Mn(CN)₆]⁴⁻ E",
      "ウ": "[Mn(H₂O)₆]²⁺ C・[Mn(CN)₆]⁴⁻ D",
      "エ": "[Mn(H₂O)₆]²⁺ D・[Mn(CN)₆]⁴⁻ C",
      "オ": "[Mn(H₂O)₆]²⁺ E・[Mn(CN)₆]⁴⁻ B"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "どちらの錯体でもMnは＋2でd⁵となる。高スピン型はt₂g³e_g²のE、低スピン型はt₂g⁵のBである。",
    "choiceExplanations": {
      "ア": "両錯体のMnは酸化数＋2で、d電子を5個持つ。Aのt₂g⁶もFのt₂g⁴e_g²もd電子を6個含む。",
      "イ": "Bのt₂g⁵は低スピン型で、Eのt₂g³e_g²は高スピン型である。水錯体が高スピン、シアノ錯体が低スピンなので割当てが逆である。",
      "ウ": "Cのt₂g³e_g¹には4個しかd電子がなく、Dのt₂g⁴も4個である。Mn²⁺にはd電子が5個必要になる。",
      "エ": "DとCはそれぞれ電子が4個である。水分子とシアン化物イオンの配位による違いは占有の仕方であり、両錯体のMn²⁺のd電子数は同じ5個である。",
      "オ": "どちらの錯体でもMnは＋2でd⁵となる。高スピン型はt₂g³e_g²のE、低スピン型はt₂g⁵のBである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q23.webp"
    ],
    "imageAltTexts": [
      "d軌道のt₂gとe_gに電子を配置した六つの原図A〜F"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q24",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "固体電解質と酸素センサ",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "固体電解質型酸素ガスセンサに関する次の記述ア、イ、ウのうち、妥当なもののみを全て挙げているのはどれか。\nア 固体電解質は、空格子点の多い構造をもつものがある。\nイ 固体電解質型酸素ガスセンサには、一般に、酸化物イオン伝導体であるβ-アルミナが用いられる。\nウ 酸素ガス濃度が異なる場合、固体電解質の両側で起電力が生じ、その起電力はアレニウスの式で表すことができる。",
    "choices": {
      "ア": "ア",
      "イ": "ア、イ",
      "ウ": "ア、イ、ウ",
      "エ": "イ、ウ",
      "オ": "ウ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "イオンが空格子点へ移ることで伝導する固体電解質がある。酸素センサには通常、安定化ジルコニアなどを用い、酸素分圧差による起電力はネルンスト式で表す。",
    "choiceExplanations": {
      "ア": "イオンが空格子点へ移ることで伝導する固体電解質がある。酸素センサには通常、安定化ジルコニアなどを用い、酸素分圧差による起電力はネルンスト式で表す。",
      "イ": "アの空格子点の記述は正しい。β-アルミナは代表的なナトリウムイオン伝導体であり、通常の酸素センサの酸化物イオン伝導体とは異なる。",
      "ウ": "固体電解質には結晶欠陥を介してイオンを通すものがある。ただし酸素ガスセンサの起電力は、酸素分圧の比を含むネルンスト式に従う。",
      "エ": "イのβ-アルミナは主にNa⁺を伝導する。ウの酸素の濃度差に伴う平衡起電力はネルンスト式で表され、アレニウスの式は温度と速度定数などの関係に用いる。",
      "オ": "酸素分圧差により起電力が生じる点は正しいが、起電力の式の名称が誤っている。空格子点の多い構造をもつ固体電解質の例はある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q25",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "リン酸の滴定曲線",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "0.10 mol·L⁻¹のリン酸（H₃PO₄）水溶液10 mLを0.10 mol·L⁻¹の水酸化ナトリウム水溶液で滴定したところ、図のような滴定曲線を得た。このとき、H₃PO₄、H₂PO₄⁻、HPO₄²⁻、PO₄³⁻のうち、点Xにおける被滴定液中で最も存在割合が大きい化学種及び二番目に存在割合が大きい化学種の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "最多H₃PO₄・二番目H₂PO₄⁻",
      "イ": "最多H₂PO₄⁻・二番目HPO₄²⁻",
      "ウ": "最多HPO₄²⁻・二番目H₂PO₄⁻",
      "エ": "最多HPO₄²⁻・二番目PO₄³⁻",
      "オ": "最多PO₄³⁻・二番目HPO₄²⁻"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "点Xは第一当量点10 mLより後で、第二当量点20 mLに近い。H₂PO₄⁻が多く中和されてHPO₄²⁻が最多となり、未反応のH₂PO₄⁻がこれに次ぐ。",
    "choiceExplanations": {
      "ア": "第一当量点は10 mLであり、点Xでは第一段階の中和を越えている。H₃PO₄が中和されて生じたH₂PO₄⁻の多くがさらにHPO₄²⁻に変わっている。",
      "イ": "第一と第二当量点の間ではH₂PO₄⁻とHPO₄²⁻が主要である。Xは両当量点の中点15 mLより右にあるので、HPO₄²⁻の方が多い。",
      "ウ": "点Xは第一当量点10 mLより後で、第二当量点20 mLに近い。H₂PO₄⁻が多く中和されてHPO₄²⁻が最多となり、未反応のH₂PO₄⁻がこれに次ぐ。",
      "エ": "HPO₄²⁻が最多になる点は正しい。Xは第二当量点より前であり、HPO₄²⁻がさらに電離したPO₄³⁻はH₂PO₄⁻より少ない。",
      "オ": "PO₄³⁻を多く生成するにはHPO₄²⁻から第三段階の中和を進める必要がある。点Xでは第二段階がまだ途中である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q25.webp"
    ],
    "imageAltTexts": [
      "リン酸の滴定曲線と第2当量点直前の点Xを示した原グラフ"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q26",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "酢酸緩衝液",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "緩衝液に関する次の記述のア、イに当てはまるものの組合せとして最も妥当なのはどれか。\n「0.10 molの酢酸と0.10 molの酢酸ナトリウムの混合物を水に溶かし、全体を1.0 Lとした緩衝液がある。酢酸の解離定数K_aを1.8×10⁻⁵ mol·L⁻¹とすると、この緩衝液の水素イオン濃度は［ア］mol·L⁻¹となる。また、この緩衝液1.0 Lに水酸化ナトリウムを0.010 mol加えて均一になるまで撹拌すると、水素イオン濃度は［イ］mol·L⁻¹となる。ただし、加えた水酸化ナトリウムの体積は無視できるものとする。」",
    "choices": {
      "ア": "ア 1.8×10⁻⁶・イ 1.5×10⁻⁷",
      "イ": "ア 1.8×10⁻⁶・イ 1.8×10⁻⁷",
      "ウ": "ア 1.8×10⁻⁵・イ 1.0×10⁻⁶",
      "エ": "ア 1.8×10⁻⁵・イ 1.5×10⁻⁵",
      "オ": "ア 0.10・イ 1.0×10⁻⁶"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "[H⁺]＝K_a×[酢酸]/[酢酸イオン]であり、初めの比は1である。塩基の添加後は酢酸0.090 mol、酢酸イオン0.110 molとなるので[H⁺]≒1.5×10⁻⁵ mol/Lである。",
    "choiceExplanations": {
      "ア": "初めは酢酸と酢酸イオンが等濃度なので、[H⁺]はK_aに等しい。塩基を加えた後も酸と塩基の比は0.090/0.110であり、濃度は2桁も下がらない。",
      "イ": "0.10 molを1.0 Lに溶かした酢酸と酢酸イオンの濃度比は1である。初めの水素イオン濃度に0.10を掛ける必要はない。",
      "ウ": "初めの[H⁺]はK_aに等しい。添加後は酢酸0.090 mol、酢酸イオン0.110 molなので、その比をK_aに掛けて約1.5×10⁻⁵を得る。",
      "エ": "[H⁺]＝K_a×[酢酸]/[酢酸イオン]であり、初めの比は1である。塩基の添加後は酢酸0.090 mol、酢酸イオン0.110 molとなるので[H⁺]≒1.5×10⁻⁵ mol/Lである。",
      "オ": "0.10 mol/Lは加えた酢酸などの濃度で、遊離した水素イオンの濃度ではない。平衡式に両者の比を入れて水素イオン濃度を求める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q28",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "¹H-NMRの結合定数と帰属",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次に示す化合物の¹H-NMRスペクトルにおいて、各ピークは図表のように帰属されている。このとき、X、Y、Zに対するプロトンB、C、Dの帰属の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "X B・Y C・Z D",
      "イ": "X B・Y D・Z C",
      "ウ": "X C・Y B・Z D",
      "エ": "X D・Y B・Z C",
      "オ": "X D・Y C・Z B"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Aの二重線間隔8.30 Hzを持つYが隣接プロトンBであり、Yのもう一方の大きな分裂はCとの結合である。ZはCとしてその大きな分裂を共有し、弱い結合しか持たないXはDとなる。",
    "choiceExplanations": {
      "ア": "Bは原図の隣接するAと結合し、Aの二重線の間隔8.30 Hzに対応する分裂を示す。Xの分裂はそれより小さく、Bに対応しない。",
      "イ": "Dは隣接する相手との結合定数が小さい。Yには8.30 Hzなどの大きな分裂があるため、DではなくAと隣接するBに当たる。",
      "ウ": "YがBである点は正しい。CはBとの大きな結合定数を共有するため分裂の小さいXではなくZに対応し、XはDになる。",
      "エ": "Aの二重線間隔8.30 Hzを持つYが隣接プロトンBであり、Yのもう一方の大きな分裂はCとの結合である。ZはCとしてその大きな分裂を共有し、弱い結合しか持たないXはDとなる。",
      "オ": "XをDとするのは正しい。Aと隣接するBのピークはAの結合定数8.30 Hzに対応する分裂を持つYであるため、YとZの割当てが逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q28.webp"
    ],
    "imageAltTexts": [
      "糖誘導体の分子構造と¹H-NMRスペクトルおよび各ピークの周波数を示した原図表"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q29",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "CIP順位と絶対配置",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次のア〜オの化合物のうち、Cahn–Ingold–Prelogの順位規則に基づく絶対配置がR配置であるもののみを挙げているのはどれか。",
    "choices": {
      "ア": "ア、ウ",
      "イ": "ア、オ",
      "ウ": "イ、エ",
      "エ": "イ、オ",
      "オ": "ウ、エ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ウはNH₂＞フェニル基＞メチル基＞Hで、Hが手前の反時計回りなのでRになる。エもエチニル基＞アルケニル基＞エチル基＞メチル基の順で、最下位を奥に置く向きに直すと時計回りになる。",
    "choiceExplanations": {
      "ア": "ウはRである。アではNH₂、COOH、CH₃、Hの順に順位を付け、Hを奥にして見ると上位3基が反時計回りになり、Sである。",
      "イ": "アはアミノ基、カルボキシ基、メチル基の順でSになる。オはBr、Cl、エチル基、Hの順に並べるとSであり、どちらもRではない。",
      "ウ": "エはRだが、イはOH、CHO、CH₂OH、Hの順である。Hが手前の図で上位3基は時計回りに並ぶため、裏返してSと判定する。",
      "エ": "イでは最下位のHが手前にあり、図での時計回りを反転してSになる。オもBr＞Cl＞エチル基＞Hの順位を適用するとSになる。",
      "オ": "ウはNH₂＞フェニル基＞メチル基＞Hで、Hが手前の反時計回りなのでRになる。エもエチニル基＞アルケニル基＞エチル基＞メチル基の順で、最下位を奥に置く向きに直すと時計回りになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q29.webp"
    ],
    "imageAltTexts": [
      "置換基の立体配置をくさびで示した化合物ア〜オの原構造式"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q30",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "ヒュッケル則",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次のア〜カの化合物のうち、Hückel則に基づく芳香族性を有する化合物として妥当なもののみを挙げているのはどれか。",
    "choices": {
      "ア": "ア、ウ",
      "イ": "ア、カ",
      "ウ": "イ、オ",
      "エ": "エ、オ",
      "オ": "エ、カ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "エは四つの二重結合の8電子に負電荷分の2電子が加わって10π電子となる。オは七つの二重結合から14π電子となり、いずれも4n＋2を満たす。",
    "choiceExplanations": {
      "ア": "アは二重結合と負電荷中心の孤立電子対を合わせて4π電子である。ウも6π電子に2電子が加わって8π電子となり、どちらも4n＋2を満たさない。",
      "イ": "アのシクロプロペニルアニオンは4π電子を持つ。カも環状共役系に16π電子を持ち、4n＋2にはならない。",
      "ウ": "オの14π電子は4n＋2に当てはまる。一方、イの五員環カチオンは二つの二重結合から4π電子となる。",
      "エ": "エは四つの二重結合の8電子に負電荷分の2電子が加わって10π電子となる。オは七つの二重結合から14π電子となり、いずれも4n＋2を満たす。",
      "オ": "エは10π電子で条件を満たす。カは二重結合8個で16π電子となるため、4n＋2型ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q30.webp"
    ],
    "imageAltTexts": [
      "芳香族性を比較する六つの環状化合物の原構造式"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q31",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "pKₐと共役塩基の安定性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次のA、B、Cのそれぞれの化合物ア、イを比較し、pKₐ値のより大きいものを選び出したものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "A ア・B ア・C イ",
      "イ": "A ア・B イ・C ア",
      "ウ": "A イ・B ア・C ア",
      "エ": "A イ・B ア・C イ",
      "オ": "A イ・B イ・C イ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Aではフルオレンの共役塩基が共鳴で安定になるのでア、Bではエノラートを作りにくいプロペン側のイのpKₐが高い。Cは塩素の誘起効果が弱いβ位のアが高い。",
    "choiceExplanations": {
      "ア": "Aのアは共役塩基がフルオレンの共役塩基ほど安定でなく、pKₐが高い。Bではアがエノラートを生成して酸性が強く、Cではイの塩素がカルボキシ基により近いためpKₐが低い。",
      "イ": "Aではフルオレンの共役塩基が共鳴で安定になるのでア、Bではエノラートを作りにくいプロペン側のイのpKₐが高い。Cは塩素の誘起効果が弱いβ位のアが高い。",
      "ウ": "Cのアは塩素がカルボキシ基から遠く、pKₐが大きい。AのイとBのアは共役塩基が安定化される側であり、pKₐはそれぞれ小さい。",
      "エ": "フルオレンの陰イオンも、アセトアルデヒドから生じるエノラートも共鳴で安定化する。Cもカルボキシ基に近い塩素が共役塩基を安定化するため、イの方がpKₐは低い。",
      "オ": "Bのイはカルボニル基を持たず、エノラートによる安定化がないので正しい。Aではア、Cではアの方が、それぞれ共役塩基の安定化が弱くpKₐが高い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q31.webp"
    ],
    "imageAltTexts": [
      "三組の化合物アとイの構造式を示した原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q32",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "E2脱離と立体配座",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "E2反応に関する次の記述のア、イ、ウに当てはまる化合物の記号の組合せとして最も妥当なのはどれか。\n「AとBについて、エタノール中ナトリウムエトキシドを用いてE2反応を行ったところ、主生成物として、それぞれ［ア］と［イ］が得られた。また、CとDについて、同じ条件でE2反応を行ったところ、［ウ］について行った反応の方が速く進行した。」",
    "choices": {
      "ア": "ア X・イ X・ウ C",
      "イ": "ア X・イ Y・ウ C",
      "ウ": "ア X・イ Y・ウ D",
      "エ": "ア Y・イ X・ウ C",
      "オ": "ア Y・イ X・ウ D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Clと隣のHがアンチペリプラナーになるよう回転させると、Aは両フェニル基が同じ側のY、Bは反対側のXを与える。Dはtert-ブチル基をエクアトリアルに保ったままBrをアキシアルに置けるため、E2が速い。",
    "choiceExplanations": {
      "ア": "AとBは脱離基側の立体配置が異なるため、アンチペリプラナーの配座から得るアルケンの幾何配置も異なる。Cの安定配座では臭素がエクアトリアルであり、反応の速い方ではない。",
      "イ": "脱離するClと隣接するHを反対向きに重ねて見ると、Aはフェニル基が同じ側のY、Bは反対側のXを与える。この選択肢ではその対応が逆である。",
      "ウ": "環状基質ではDの方が臭素をアキシアルに置きやすいので正しい。ただし直鎖基質では、アンチ脱離でAからY、BからXが得られる。",
      "エ": "AがY、BがXの組合せは合っている。Cはかさ高いtert-ブチル基がエクアトリアルの椅子形で臭素もエクアトリアルにあり、脱離に適した配座をとりにくい。",
      "オ": "Clと隣のHがアンチペリプラナーになるよう回転させると、Aは両フェニル基が同じ側のY、Bは反対側のXを与える。Dはtert-ブチル基をエクアトリアルに保ったままBrをアキシアルに置けるため、E2が速い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q32.webp"
    ],
    "imageAltTexts": [
      "基質A〜Dの立体構造とアルケンX・Yを示した原反応図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q33",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "ウィッティヒ反応",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の反応において、シクロヘキサノン由来の主生成物である化合物Aとして最も妥当なのはどれか。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "シクロヘキサノンのカルボニル基とメチレン型のリンイリドがウィッティヒ反応を起こす。酸素がリン側に移り、旧カルボニル炭素に環外の＝CH₂ができる。",
    "choiceExplanations": {
      "ア": "この構造はカルボニル基を保ったまま隣の位置にメチル基を付けた生成物である。ウィッティヒ反応で変化するのはカルボニル炭素そのものである。",
      "イ": "図2のアルコールはカルボニルに炭素求核剤が付加して酸素が残った形である。リンイリドを用いた反応では酸素がリン側に移り、炭素間の二重結合が生じる。",
      "ウ": "図3は環が一員拡大したケトンである。反応では環の炭素数は変わらず、元のカルボニル炭素に環外のメチレンが二重結合する。",
      "エ": "この構造にはカルボニル基が残っており、メチレンがその隣に付いている。リンイリドはカルボニルのC＝OをC＝CH₂に変える。",
      "オ": "シクロヘキサノンのカルボニル基とメチレン型のリンイリドがウィッティヒ反応を起こす。酸素がリン側に移り、旧カルボニル炭素に環外の＝CH₂ができる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q33.webp"
    ],
    "imageAltTexts": [
      "シクロヘキサノンとメチレン型リンイリドから化合物Aを得る原反応図"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q33-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q33-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q33-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q33-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q33-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q34",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "マイケル付加",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の反応において、主生成物である化合物Xとして最も妥当なのはどれか。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "マロン酸ジエチルの活性メチレン由来の求核種が、メチルビニルケトンのβ炭素へマイケル付加する。二重結合が消え、両エステル基を持つ炭素に−CH₂CH₂COCH₃がつながる。",
    "choiceExplanations": {
      "ア": "図1ではカルボニルへの1,2-付加でアルコールが生じ、元のビニル基が残っている。ここではマロン酸エステルの活性メチレン由来の求核種が共役二重結合へ1,4-付加する。",
      "イ": "マロン酸ジエチルの活性メチレン由来の求核種が、メチルビニルケトンのβ炭素へマイケル付加する。二重結合が消え、両エステル基を持つ炭素に−CH₂CH₂COCH₃がつながる。",
      "ウ": "マイケル付加で置換基が付く位置はカルボニルから数えてβ位である。エステル側の炭素からケトンのカルボニル炭素までは、二つのメチレンが介在する。",
      "エ": "図4は共役二重結合を残し、マロン酸ジエチルの二つのエステル基の保持にも合わない。主反応はエステル結合の切断ではなく炭素―炭素結合を作る共役付加である。",
      "オ": "図5には元のマロン酸ジエチルにあったエステル基が一つしかない。共役付加では二つのエステル基が残る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q34.webp"
    ],
    "imageAltTexts": [
      "マロン酸ジエチルとメチルビニルケトンから化合物Xを得る原反応図"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q34-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q34-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q34-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q34-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q34-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q35",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "高分子化学",
    "topicTags": [
      "連鎖重合と逐次重合",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "高分子の合成法に関する次の記述のア〜エに当てはまるものの組合せとして最も妥当なのはどれか。\n「高分子合成において、ビニルモノマーなどの付加重合は活性末端が連続的に結合していく［ア］反応により高分子を生成する。また、ジアミンとジカルボン酸の反応による高分子合成法である［イ］やジイソシアナートとジオールとの高分子合成法である［ウ］は［ア］反応に対して［エ］反応と呼ばれる。」",
    "choices": {
      "ア": "逐次・重縮合・重付加・連鎖",
      "イ": "逐次・重縮合・重付加・ラジカル",
      "ウ": "逐次・重付加・重縮合・ラジカル",
      "エ": "連鎖・重縮合・重付加・逐次",
      "オ": "連鎖・重付加・重縮合・逐次"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ビニルモノマーは活性末端に連続して付加する連鎖反応で重合する。ジアミンとジカルボン酸の重縮合と、ジイソシアナートとジオールの重付加は、官能基同士が段階的に反応する逐次反応である。",
    "choiceExplanations": {
      "ア": "イとウは適切である。ビニルモノマーの付加重合では活性末端にモノマーが順に加わる連鎖反応が起こり、重縮合と重付加は逐次反応に分類される。",
      "イ": "ビニルモノマーが活性末端に付加し続ける機構は連鎖反応である。重縮合と重付加は、ラジカルの連鎖を基準とする分類ではなく逐次反応に属する。",
      "ウ": "ジアミンとジカルボン酸からポリアミドが生じるときには水が外れるので重縮合である。ポリウレタンを作るジイソシアナートとジオールの反応は低分子を放出しない重付加である。",
      "エ": "ビニルモノマーは活性末端に連続して付加する連鎖反応で重合する。ジアミンとジカルボン酸の重縮合と、ジイソシアナートとジオールの重付加は、官能基同士が段階的に反応する逐次反応である。",
      "オ": "連鎖と逐次の分類は合う。ジアミンとジカルボン酸では重縮合、ジイソシアナートとジオールでは重付加が起こるため、イとウが逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q36",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "医薬品の構造",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "医薬品に関する次の記述ア、イ、ウのうち、妥当なもののみを全て挙げているのはどれか。\nア ペニシリンは、四員環のチアゾリジン環と五員環のβ-ラクタム環が縮合した構造を有する。\nイ 鎮痛薬として用いられるアスピリンは、サリチル酸に無水酢酸を反応させることで得られる。\nウ サリドマイドの鏡像異性体には、催奇形性を有するものがある。",
    "choices": {
      "ア": "ア",
      "イ": "ア、イ",
      "ウ": "ア、ウ",
      "エ": "イ",
      "オ": "イ、ウ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "サリチル酸のフェノール性ヒドロキシ基をアセチル化するとアスピリンになる。サリドマイドには催奇形性を示す鏡像異性体があり、体内では鏡像異性体間の相互変換も起こる。",
    "choiceExplanations": {
      "ア": "ペニシリンのβ-ラクタム環は四員環である。これと縮合するチアゾリジン環は五員環なので、アは環の大きさを逆にしている。",
      "イ": "サリチル酸のフェノール性ヒドロキシ基をアセチル化してアスピリンを得る点は合う。ペニシリンで四員環なのはβ-ラクタム環である。",
      "ウ": "サリドマイドに催奇形性の問題がある点は妥当である。ペニシリンではチアゾリジン環が五員環であり、アは誤っている。",
      "エ": "イのアスピリンに関する説明は正しい。ウで述べるサリドマイドの鏡像異性体の催奇形性も該当するため、イだけでは足りない。",
      "オ": "サリチル酸のフェノール性ヒドロキシ基をアセチル化するとアスピリンになる。サリドマイドには催奇形性を示す鏡像異性体があり、体内では鏡像異性体間の相互変換も起こる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q37",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "天然化合物とテルペン骨格",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の天然化合物ア〜オのうち、テルペンに分類されるもののみを挙げているのはどれか。",
    "choices": {
      "ア": "ア、エ",
      "イ": "ア、オ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、オ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "アとエは炭素5個を単位とするイソプレン由来の骨格を持つ。いずれもセスキテルペンに分類できる。",
    "choiceExplanations": {
      "ア": "アとエは炭素5個を単位とするイソプレン由来の骨格を持つ。いずれもセスキテルペンに分類できる。",
      "イ": "アにはイソプレン単位三つに由来するセスキテルペンの骨格がある。オは環内に正電荷を持つ窒素を含むアルカロイドである。",
      "ウ": "イは含窒素基を持つコルヒチンの構造であり、ウも複数の窒素を含むアルカロイドの構造である。どちらもイソプレン由来のテルペン骨格を示さない。",
      "エ": "エは炭素数15のイソプレン由来骨格を持つ。イはコルヒチンの構造なので、エだけがテルペンである。",
      "オ": "ウもオも含窒素の天然化合物で、原図の骨格はイソプレン単位をつないだテルペンのものではない。テルペンの骨格はアとエにある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q37.webp"
    ],
    "imageAltTexts": [
      "天然化合物ア〜オの五つの原構造式"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q38",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "基質競合と触媒効率",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "3種のペプチドを、あるタンパク質分解酵素によりカルボキシル末端アミノ酸残基を切断したときのミカエリス定数（K_M）と、酵素の単位時間当たりの代謝回転数（k_cat）を表に示す。この酵素反応に関する次の記述のア、イに当てはまるものの組合せとして最も妥当なのはどれか。ただし、この酵素反応はミカエリス・メンテン式に従うものとし、ペプチド同士の相互作用はないものとする。\n「これらのペプチドをそれぞれ同じ濃度になるように混合してこの酵素に提供したとき、最も速く消化されるペプチドは［ア］であり、最も遅く消化されるペプチドは［イ］である。」",
    "choices": {
      "ア": "ア Glu–Met–Thr–Ala–Gly・イ Glu–Met–Thr–Ala–Ala",
      "イ": "ア Glu–Met–Thr–Ala–Ala・イ Glu–Met–Thr–Ala–Gly",
      "ウ": "ア Glu–Met–Thr–Ala–Ala・イ Glu–Met–Thr–Ala–Phe",
      "エ": "ア Glu–Met–Thr–Ala–Phe・イ Glu–Met–Thr–Ala–Gly",
      "オ": "ア Glu–Met–Thr–Ala–Phe・イ Glu–Met–Thr–Ala–Ala"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "等濃度の競合基質ではk_cat/K_Mの順で反応速度を比較する。Gly末端が6、Ala末端が20、Phe末端が36なので、最速はPhe、最遅はGlyである。",
    "choiceExplanations": {
      "ア": "等濃度で同じ酵素を取り合うときは触媒効率k_cat/K_Mで比較できる。Gly末端の24/4.0は最小なので、最も遅い。",
      "イ": "Ala末端のk_catは最大だが、Phe末端のK_Mはより小さい。等濃度で比較するとPhe末端の18/0.5がAla末端の30/1.5を上回る。",
      "ウ": "Phe末端はk_catだけなら小さいが、K_Mも小さく、k_cat/K_Mは36で最大である。Ala末端の20は中間になる。",
      "エ": "等濃度の競合基質ではk_cat/K_Mの順で反応速度を比較する。Gly末端が6、Ala末端が20、Phe末端が36なので、最速はPhe、最遅はGlyである。",
      "オ": "Phe末端は最速である。最遅は触媒効率20のAla末端ではなく、触媒効率6のGly末端である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q38.webp"
    ],
    "imageAltTexts": [
      "三つのペプチドのミカエリス定数と代謝回転数を示した原表"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q39",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "GC含量とDNAの融解",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "二重らせんを形成するDNAでは、4種の塩基が図に示すような水素結合を形成している。このとき、DNAの融解温度とDNA中のGC塩基対の比率の関係を表すグラフとして最も妥当なのはどれか。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "GC塩基対には三つの水素結合があり、AT塩基対の二つより多い。同じ条件で比べるとGC塩基対が多いほど二重らせんが安定し、融解温度は高くなる。",
    "choiceExplanations": {
      "ア": "GC塩基対の水素結合は三つ、AT塩基対では二つである。GC塩基対の割合を増やしたときに融解温度が下がる部分を持つ図1は合わない。",
      "イ": "GC塩基対が多いほど二重らせんは熱的に安定になる。同じ融解温度に対し低いGC比率と高いGC比率の両方を示す図2は、この傾向を表さない。",
      "ウ": "図3ではGC塩基対が増えるほど融解温度が低くなる。GC塩基対の多いDNAは一般に融解により高い温度を要する。",
      "エ": "図4はGC塩基対の割合が変わっても融解温度が同じである。塩基対の組成が二重らせんの熱安定性に影響するため、融解温度は一定ではない。",
      "オ": "GC塩基対には三つの水素結合があり、AT塩基対の二つより多い。同じ条件で比べるとGC塩基対が多いほど二重らせんが安定し、融解温度は高くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q39.webp"
    ],
    "imageAltTexts": [
      "アデニン・チミンとグアニン・シトシンの水素結合の原構造式"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q39-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q39-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q39-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q39-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-kagaku/q39-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q40",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "ATPと加水分解",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生体でのエネルギー変換に関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「生体において、例えば食物から得られたエネルギーは［ア］として蓄えられる。この［ア］は、2個の［イ］結合をもつ物質であり、［ウ］反応に伴う大きな負の自由エネルギー変化をもつため、筋肉収縮などの機械的仕事、分子やイオンの能動輸送、生体物質の合成等に使われている。」",
    "choices": {
      "ア": "ATP・エーテル・加水分解",
      "イ": "ATP・高エネルギーリン酸・加水分解",
      "ウ": "ATP・高エネルギーリン酸・酸化還元",
      "エ": "NADH・エーテル・酸化還元",
      "オ": "NADH・高エネルギーリン酸・酸化還元"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ATPはリン酸基同士をつなぐ高エネルギーリン酸結合を二つ持つ。加水分解の自由エネルギー変化が負であり、これを他の反応や仕事と共役させる。",
    "choiceExplanations": {
      "ア": "ATPと加水分解は合っている。三つのリン酸基の間にある二つの結合はリン酸無水結合であり、エーテル結合ではない。",
      "イ": "ATPはリン酸基同士をつなぐ高エネルギーリン酸結合を二つ持つ。加水分解の自由エネルギー変化が負であり、これを他の反応や仕事と共役させる。",
      "ウ": "ATPと高エネルギーリン酸結合までは正しい。仕事に結び付く自由エネルギー変化を生むのは、ATPの酸化還元ではなく加水分解である。",
      "エ": "NADHは電子の受渡しを担う補酵素である。設問では筋収縮や能動輸送を駆動するATPの加水分解について述べている。",
      "オ": "NADHの主な役割は酸化還元反応で電子を運ぶことである。二つの高エネルギーリン酸結合と加水分解で説明される物質はATPである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q41",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "蒸発缶の物質収支",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "25 wt％の無機塩を含む水溶液を、単一蒸発缶に連続的に供給し、2,000 kg·h⁻¹の割合で水を除去している。この蒸発プロセスにおいて、缶出物の80 wt％は析出塩であり、缶出物の20 wt％は飽和水溶液（塩濃度30 wt％）である。この缶出物中の析出塩の析出速度として最も妥当なのはどれか。ただし、この蒸発プロセスにおいて無機塩は変化しないものとする。",
    "choices": {
      "ア": "4.8×10² kg·h⁻¹",
      "イ": "5.7×10² kg·h⁻¹",
      "ウ": "6.6×10² kg·h⁻¹",
      "エ": "7.5×10² kg·h⁻¹",
      "オ": "8.4×10² kg·h⁻¹"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "缶出物をP kg/hとすると供給はP＋2,000で、塩の収支は0.25(P＋2,000)＝(0.80＋0.20×0.30)Pとなる。P≒820 kg/hなので析出速度は0.80P≒660 kg/hである。",
    "choiceExplanations": {
      "ア": "析出塩480 kg/hは、缶出物600 kg/hに対応する。総収支から供給が2,600 kg/hとなると塩が650 kg/h入るが、缶出物へ出る塩は516 kg/hにとどまる。",
      "イ": "析出塩は缶出物の80％であり、さらに残る液の30％が溶解した塩である。缶出物の塩分86％を使って供給中の塩分25％と収支を取ると、570 kg/hより大きくなる。",
      "ウ": "缶出物をP kg/hとすると供給はP＋2,000で、塩の収支は0.25(P＋2,000)＝(0.80＋0.20×0.30)Pとなる。P≒820 kg/hなので析出速度は0.80P≒660 kg/hである。",
      "エ": "析出塩750 kg/hなら缶出物は937.5 kg/hである。缶出物の総塩量0.86×937.5は、供給側の0.25×2,937.5より大きくなり、収支に合わない。",
      "オ": "析出塩840 kg/hを得るには1,050 kg/hの缶出物が必要である。出る塩は903 kg/hとなるが、総収支から求める入る塩は762.5 kg/hなので成り立たない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q42",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "円管のレイノルズ数",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "内径20.0 mmのまっすぐな円管の中を20 ℃の水が1.50 m³·h⁻¹の割合で流れている。このときの流れに関する次の記述のア、イに当てはまるものの組合せとして最も妥当なのはどれか。ただし、20 ℃の水の密度を1.00×10³ kg·m⁻³、粘度を1.00×10⁻³ kg·m⁻¹·s⁻¹とする。\n「流れの状態が、層流であるか乱流であるかは、レイノルズ数Reを調べるとよい。Reは、流体の速度v、密度ρ、粘度μ及び代表長さLを用いて、［ア］で表される。この円管内の流れは［イ］と考えられる。」",
    "choices": {
      "ア": "vL/(μρ)・乱流",
      "イ": "vLρ/μ・乱流",
      "ウ": "vLρ/μ・層流",
      "エ": "vLμ/ρ・乱流",
      "オ": "vLμ/ρ・層流"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "レイノルズ数は慣性と粘性の比を示すρvL/μである。流量を秒当たりに直して断面積で割るとv≒1.33 m/sとなり、内径0.020 mでRe≒2.65×10⁴なので乱流である。",
    "choiceExplanations": {
      "ア": "乱流の判定は合っている。動粘度はμ/ρなので、これでvLを割ると密度ρは分子に来る。",
      "イ": "レイノルズ数は慣性と粘性の比を示すρvL/μである。流量を秒当たりに直して断面積で割るとv≒1.33 m/sとなり、内径0.020 mでRe≒2.65×10⁴なので乱流である。",
      "ウ": "レイノルズ数の式は正しいが、計算すると約26,500になる。円管の層流と乱流の目安である数千より十分大きい。",
      "エ": "動粘度μ/ρをvLに掛けるのではなく、vLを動粘度で割る。乱流という判定は正しいものの、この式は無次元にならない。",
      "オ": "正しい式はρvL/μであり、動粘度を分母に置く。得られるレイノルズ数は約26,500で、層流の範囲を外れる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q43",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "材料と乾燥特性曲線",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "横軸を乾量基準含水率、縦軸を乾燥速度とした乾燥特性曲線を考える。乾燥する対象物と乾燥特性曲線の形状の組合せとして最も妥当なのはどれか。ただし、図中のω_cは限界含水率を表す。",
    "choices": {
      "ア": "繊維 図A・粘土 図B・石けん 図C",
      "イ": "繊維 図A・粘土 図C・石けん 図B",
      "ウ": "繊維 図B・粘土 図A・石けん 図C",
      "エ": "繊維 図B・粘土 図C・石けん 図A",
      "オ": "繊維 図C・粘土 図B・石けん 図A"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "繊維では恒率期から滑らかに減率期へ移る図A、粘土では減率期の途中で傾向が変わる図Bが対応する。石けんは明瞭な恒率期を持たない図Cに対応する。",
    "choiceExplanations": {
      "ア": "繊維では恒率期から滑らかに減率期へ移る図A、粘土では減率期の途中で傾向が変わる図Bが対応する。石けんは明瞭な恒率期を持たない図Cに対応する。",
      "イ": "繊維の図Aは合っている。粘土には図Bのように恒率期があり、石けんには図Cのように明瞭な恒率期が現れにくい。",
      "ウ": "石けんに図Cを当てる点は正しい。Aの滑らかな減率期は繊維で見られ、粘土には減率期に折れ曲がりのある図Bを当てる。",
      "エ": "図Bのように減率期で傾きが変わるのは粘土に対応する。図Cのように初めから乾燥速度が含水率に依存するのは石けんに対応する。",
      "オ": "粘土の図Bは合っている。高含水率で恒率期のある図Aは繊維に対応し、石けんは単調に乾燥速度が減る図Cに対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kagaku/q43.webp"
    ],
    "imageAltTexts": [
      "含水率と乾燥速度の関係の異なる三つの原グラフA〜C"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kagaku-q44",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "連続槽型反応器の直列化",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "A→Cで表される液相1次反応（−r_A＝kC_A、k＝0.05 s⁻¹）を反応槽全容積5 m³の連続槽型反応器を用いて行う。次のア〜エの場合の原料成分Aの反応率の大小関係として最も妥当なのはどれか。ただし、−r_AはAの反応速度、kは反応速度定数、C_AはAの濃度であるとする。また、原料はAのみで、体積流量は0.1 m³·s⁻¹とする。\nア 容積5 m³の反応槽1個で反応させる場合\nイ 容積3 m³の反応槽と容積2 m³の反応槽の順に直列に1個ずつ繋いで反応させる場合\nウ 容積2 m³の反応槽と容積3 m³の反応槽の順に直列に1個ずつ繋いで反応させる場合\nエ 容積1 m³の反応槽5個で反応させる場合",
    "choices": {
      "ア": "ア＞イ＞ウ＞エ",
      "イ": "ア＞イ＝ウ＞エ",
      "ウ": "ア＝イ＝ウ＝エ",
      "エ": "エ＞イ＝ウ＞ア",
      "オ": "エ＞ウ＞イ＞ア"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各槽での濃度比は1/(1＋kV/Q)であり、直列では掛け合わせる。残存比はアが1/3.5、イ・ウが1/5、エが1/(1.5)⁵なので、反応率はエ＞イ＝ウ＞アとなる。",
    "choiceExplanations": {
      "ア": "イとウの出口濃度は、各槽の濃度比1/(1＋kV/Q)を掛けて求めるため、槽の順序を逆にしても同じである。槽を細かく分けたエの方が未反応成分が少ない。",
      "イ": "イとウが等しい点は合っている。直列槽では分母の各段の因子が掛け合わされ、5槽に分けるエでは単一槽のアより積が大きくなる。",
      "ウ": "総容積が同じでも、連続槽の出口濃度は段ごとに決まる。例えばアの残存比は1/3.5、イの残存比は1/5である。",
      "エ": "各槽での濃度比は1/(1＋kV/Q)であり、直列では掛け合わせる。残存比はアが1/3.5、イ・ウが1/5、エが1/(1.5)⁵なので、反応率はエ＞イ＝ウ＞アとなる。",
      "オ": "エが最大である点は合っている。一次反応で体積流量が一定なら各槽の濃度比の積は順番に依存しないので、ウとイは等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018482.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  }
];
