import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2024_SENMON_DIGITAL: Question[] = [
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q01",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二次方程式の異なる正の実数解",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "方程式kx²＋4x＋k＝0が異なる二つの正の実数解をもつような整数kの値として最も妥当なのはどれか。",
    "choices": {
      "ア": "−3",
      "イ": "−2",
      "ウ": "−1",
      "エ": "1",
      "オ": "2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "解の積は1で、和が−4/kとなるので、両解が正であるためにはk＜0が必要である。判別式16−4k²＞0から−2＜k＜2を得るので、負の整数は−1である。",
    "choiceExplanations": {
      "ア": "k＝−3では判別式が16−4×9＝−20となる。異なる二つの実数解を得るには判別式が正でなければならない。",
      "イ": "k＝−2では判別式が0となり、解はx＝1の重解である。正ではあるが、異なる二つの解という条件を満たさない。",
      "ウ": "解の積は1で、和が−4/kとなるので、両解が正であるためにはk＜0が必要である。判別式16−4k²＞0から−2＜k＜2を得るので、負の整数は−1である。",
      "エ": "k＝1では判別式は正だが、解の積は1、和は−4である。二つの実数解はともに負になる。",
      "オ": "k＝2では判別式が0となり、解はx＝−1の重解になる。正の実数解が二つあるという条件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q02",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "平行四辺形の対角線と頂点の座標",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "xy平面上に(1, 3)、(2, 5)、(7, 1)、(a, b)の4点があり、これら4点が平行四辺形の頂点となるとき、(a, b)となり得るもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "(−5, 8)、(5, 0)",
      "イ": "(−5, 8)、(5, 0)、(8, 3)",
      "ウ": "(−4, 7)、(5, 0)、(8, 3)",
      "エ": "(−4, 7)、(6, −1)",
      "オ": "(−4, 7)、(6, −1)、(8, 3)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "対角線の中点が等しいので、未知頂点は既知の三点のうち二点の和から残る一点を引いた座標になる。三通りを計算すると(−4, 7)、(6, −1)、(8, 3)である。",
    "choiceExplanations": {
      "ア": "対角線の中点をそろえるには、既知の二頂点を足し、残る一頂点を引く。例えば(1, 3)＋(2, 5)−(7, 1)は(−4, 7)となり、示された組には含まれない。",
      "イ": "(8, 3)は(2, 5)＋(7, 1)−(1, 3)で得られる。残りの二つの場合を同じ方法で計算すると(−4, 7)と(6, −1)である。",
      "ウ": "(−4, 7)と(8, 3)は妥当である。残りは(1, 3)＋(7, 1)−(2, 5)＝(6, −1)で、(5, 0)にはならない。",
      "エ": "示された二点は対角線の中点を一致させられる。さらに(1, 3)と未知点を対角線の端点とすると、(2, 5)＋(7, 1)−(1, 3)＝(8, 3)も得られる。",
      "オ": "対角線の中点が等しいので、未知頂点は既知の三点のうち二点の和から残る一点を引いた座標になる。三通りを計算すると(−4, 7)、(6, −1)、(8, 3)である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q03",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "放物線の接線とy切片",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "放物線y＝x²−5xに引いた接線の傾きが−1であったとき、この接線とy軸との交点におけるy座標の値はいくらか。",
    "choices": {
      "ア": "−6",
      "イ": "−11/2",
      "ウ": "−5",
      "エ": "−9/2",
      "オ": "−4"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "微分すると傾きは2x−5であり、これを−1とすると接点のx座標は2、y座標は−6となる。接線y＋6＝−(x−2)にx＝0を代入すると切片は−4になる。",
    "choiceExplanations": {
      "ア": "−6は接点での放物線のy座標である。接点からy軸まで左へ2移動すると、傾き−1の接線上ではyが2増える。",
      "イ": "傾きから求めた接点は(2, −6)である。傾きが−1なので、この点からx座標を0まで戻すとyは−6＋2になる。",
      "ウ": "−5は元の放物線の一次項の係数で、接線の切片には当たらない。接線は(2, −6)を通り傾き−1なので、y＝−x−4となる。",
      "エ": "点(2, −6)を通る傾き−1の直線では、原点側に向かってxが2減り、yが2増える。増加量を1.5とすると接線の傾きと合わない。",
      "オ": "微分すると傾きは2x−5であり、これを−1とすると接点のx座標は2、y座標は−6となる。接線y＋6＝−(x−2)にx＝0を代入すると切片は−4になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q04",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角関数のグラフに囲まれた面積",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、0≦x≦π/2において、曲線y＝sin 2x及び曲線y＝cos xのみで囲まれた領域の面積はいくらか。",
    "choices": {
      "ア": "1/8",
      "イ": "1/6",
      "ウ": "1/4",
      "エ": "1/3",
      "オ": "1/2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "sin 2x−cos x＝cos x(2 sin x−1)から交点はπ/6とπ/2で、この間はsin 2xが上にある。［sin²x−sin x］を二つの端点で評価すると0−(−1/4)＝1/4である。",
    "choiceExplanations": {
      "ア": "二曲線の差はcos x(2 sin x−1)で、その原始関数はsin²x−sin xである。端点π/6の値は−1/4なので、面積は1/8より大きい。",
      "イ": "二つの交点はx＝π/6、π/2である。差の積分ではsin xを変数に取ると、1/2から1まで2u−1を積分することになり、1/6にはならない。",
      "ウ": "sin 2x−cos x＝cos x(2 sin x−1)から交点はπ/6とπ/2で、この間はsin 2xが上にある。［sin²x−sin x］を二つの端点で評価すると0−(−1/4)＝1/4である。",
      "エ": "端点π/2ではsin²x−sin x＝0、π/6では1/4−1/2＝−1/4となる。この差は1/3ではない。",
      "オ": "定積分をsin x＝uで置き換えると、幅1/2で高さ0から1に増加する三角形の面積になる。底辺と高さの積に1/2を掛けて1/4になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q04.webp"
    ],
    "imageAltTexts": [
      "y＝sin 2xとy＝cos xの曲線。xがπ/6からπ/2までの間の二曲線に囲まれた領域が網掛けされる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q05",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "指数不等式と置き換え",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "実数xについて、2^(3x)−2^(2x)−5·2^(x＋1)−2³≧0が成り立つとき、xの最小値はいくらか。",
    "choices": {
      "ア": "1/2",
      "イ": "1",
      "ウ": "3/2",
      "エ": "2",
      "オ": "5/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "t＝2ˣ＞0と置くと、左辺はt³−t²−10t−8＝(t−4)(t＋1)(t＋2)になる。後ろ二因子は正なのでt≧4、すなわちx≧2である。",
    "choiceExplanations": {
      "ア": "t＝2ˣとすると、x＝1/2ではt＝√2となる。多項式を(t−4)(t＋1)(t＋2)に分解すると、このときt−4だけが負になる。",
      "イ": "x＝1では2ˣ＝2である。式の符号は2ˣ−4が決めるため、左辺は負となって不等式を満たさない。",
      "ウ": "x＝3/2では2ˣ＝2√2で、因数分解で求まる境界値の4に届かない。不等式は2ˣ≧4の場合に成立する。",
      "エ": "t＝2ˣ＞0と置くと、左辺はt³−t²−10t−8＝(t−4)(t＋1)(t＋2)になる。後ろ二因子は正なのでt≧4、すなわちx≧2である。",
      "オ": "x＝5/2でも不等式は満たすが、境界の2ˣ＝4で等号が成立する。したがって最小値はより小さいx＝2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q06",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角関数の三乗差",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "sin θ−cos θ＝1/2であるとき、sin³θ−cos³θの値はいくらか。",
    "choices": {
      "ア": "5/16",
      "イ": "7/16",
      "ウ": "9/16",
      "エ": "11/16",
      "オ": "13/16"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "与式を二乗するとsin θ cos θ＝3/8である。三乗差の恒等式により、求める値は(sin θ−cos θ)(1＋sin θ cos θ)＝(1/2)(11/8)＝11/16となる。",
    "choiceExplanations": {
      "ア": "差を二乗すると1−2 sin θ cos θ＝1/4となるので、積は正の3/8である。三乗の差は(1/2)(1＋3/8)となる。",
      "イ": "三乗の差を因数分解した第二因子はsin²θ＋sin θ cos θ＋cos²θである。積の項を足すので、その因子は1より大きくなり、結果は1/2を超える。",
      "ウ": "第二因子の二乗和は1で、さらにsin θ cos θ＝3/8を足す。1/2を掛けるので、9/16より大きい11/16となる。",
      "エ": "与式を二乗するとsin θ cos θ＝3/8である。三乗差の恒等式により、求める値は(sin θ−cos θ)(1＋sin θ cos θ)＝(1/2)(11/8)＝11/16となる。",
      "オ": "13/16になるにはsin θ cos θが5/8必要である。sin²θ＋cos²θ＝1よりその積は最大でも1/2で、与式からは3/8となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q07",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "指数法則と対数",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "8^(log₂ 3)はいくらか。",
    "choices": {
      "ア": "9",
      "イ": "16",
      "ウ": "24",
      "エ": "27",
      "オ": "48"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "8＝2³なので8^(log₂ 3)＝(2^(log₂ 3))³となる。2^(log₂ 3)＝3より求める値は27である。",
    "choiceExplanations": {
      "ア": "9は3の二乗である。底の8を2³と書くと、指数法則により三乗になる。",
      "イ": "8^(log₂ 3)は指数法則で(2^(log₂ 3))³と変形できる。内側の値は3なので、16にはならない。",
      "ウ": "24は8と3を掛けた値である。対数は8の指数にあり、底8を2³と書いて指数法則を用いる。",
      "エ": "8＝2³なので8^(log₂ 3)＝(2^(log₂ 3))³となる。2^(log₂ 3)＝3より求める値は27である。",
      "オ": "底が2の指数関数とlog₂は逆関係にある。8を2³と書くと、指数と対数を解いた後に3の三乗が残る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q08",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "条件付き確率から不良率を求める",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "二つの工場A、Bで製造された製品には、それぞれある確率で不良品が混入している。Aの製品が6割、Bの製品が4割を占める大量の製品の中から1個取り出したとき、それが不良品である確率は1.2%であり、また、その不良品がAの製品である確率は75%であることが分かっている。このとき、それぞれの工場で製造された製品に不良品が混入している確率の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "A：0.75%、B：1.00%",
      "イ": "A：0.75%、B：1.50%",
      "ウ": "A：1.50%、B：0.75%",
      "エ": "A：1.50%、B：1.00%",
      "オ": "A：3.00%、B：1.50%"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "A製の不良品は全製品の1.2%×0.75＝0.90%、B製の不良品は1.2%×0.25＝0.30%である。それぞれAの割合0.60、Bの割合0.40で割ると、1.50%と0.75%になる。",
    "choiceExplanations": {
      "ア": "不良品全体の75%がA製なので、A製かつ不良品となる割合は0.90%になる。これをA製品の全体に占める割合60%で割ると、Aの不良率は1.50%である。",
      "イ": "示された不良率を製品の比率で加重すると、全体の不良率は0.60×0.75%＋0.40×1.50%＝1.05%となる。条件の1.2%と合わない。",
      "ウ": "A製の不良品は全製品の1.2%×0.75＝0.90%、B製の不良品は1.2%×0.25＝0.30%である。それぞれAの割合0.60、Bの割合0.40で割ると、1.50%と0.75%になる。",
      "エ": "Aは妥当である。B製かつ不良品の割合は全体で0.30%なので、B製品内では0.30%÷0.40＝0.75%となる。",
      "オ": "Aの不良率が3.00%なら、A製の不良品だけで全製品の1.80%を占める。全ての不良品を含めた割合が1.2%という条件に反する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q09",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "二次元配列の回転",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰは、図Ⅱで表される2次元配列Aの状態を、図Ⅲで表される2次元配列Bの状態に変更するフローチャートである。図Ⅰの㋐に当てはまるものとして最も妥当なのはどれか。ただし、A、Bにおけるi行j列の要素をそれぞれA[i][j]、B[i][j]（0≦i≦6、0≦j≦6）とする。",
    "choices": {
      "ア": "B[6−i][6−j]←A[i][j]",
      "イ": "B[6−j][i]←A[i][j]",
      "ウ": "B[7−j][i]←A[i][j]",
      "エ": "B[j][6−i]←A[i][j]",
      "オ": "B[j][7−i]←A[i][j]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "図ではAの上辺がBの右辺へ移る時計回り90°の回転が行われる。元の列jが新しい行になり、元の行iは右端から数えた列になるので、B[j][6−i]に代入する。",
    "choiceExplanations": {
      "ア": "これは上下と左右の両方を反転するので180°回転である。Aの上辺に並ぶ星印が、Bの右辺に沿って並ぶ状態を表せない。",
      "イ": "この添字は反時計回りの90°回転に当たる。その場合、Aの上辺はBの左辺に移るが、図Ⅲでは右辺に移っている。",
      "ウ": "j＝0で行番号が7になるが、有効な添字は0から6までである。添字の範囲だけでもこの代入が使えないことが分かる。",
      "エ": "図ではAの上辺がBの右辺へ移る時計回り90°の回転が行われる。元の列jが新しい行になり、元の行iは右端から数えた列になるので、B[j][6−i]に代入する。",
      "オ": "元の行を反転した列添字は6−iとなる。7−iを用いるとi＝0のとき列番号7を指定してしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q09.webp"
    ],
    "imageAltTexts": [
      "図Ⅰのフローチャートがi、jを0から6まで走査する。図Ⅱの配列Aと図Ⅲの配列Bには7×7のセルと星印が示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q10",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "接線上の棒の力のモーメント",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、粗い水平な床の上に半径rの半球が固定されており、これに長さl、質量mの一様な細い剛体棒が立て掛けてある。剛体棒と床のなす角が30°であるとき、剛体棒が半球から受ける力の大きさとして最も妥当なのはどれか。\nただし、重力加速度の大きさをgとし、剛体棒と半球の間に摩擦はないものとする。また、√3r＜l＜2√3rとする。",
    "choices": {
      "ア": "mgl/(4r)",
      "イ": "√3mgl/(6r)",
      "ウ": "√3mgl/(4r)",
      "エ": "mgl/(2r)",
      "オ": "√3mgl/(2r)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "床との接点から半球との接点まではr cot 30°＝√3rで、半球の反力Nは棒に垂直である。床との接点回りでN√3r＝mg(l/2)cos 30°を解くとN＝mgl/(4r)となる。",
    "choiceExplanations": {
      "ア": "床との接点から半球との接点まではr cot 30°＝√3rで、半球の反力Nは棒に垂直である。床との接点回りでN√3r＝mg(l/2)cos 30°を解くとN＝mgl/(4r)となる。",
      "イ": "半球の反力の腕は√3rである。重力の腕には棒の中心までの長さl/2そのものではなく、その水平成分(l/2)cos 30°を使う。",
      "ウ": "重力のモーメントは√3mgl/4になる。反力のモーメントにも腕の長さ√3rを掛けるので、両辺を割ると√3は消える。",
      "エ": "重力が働くのは一様な棒の中央で、床との接点からl/2の位置である。棒の全長を作用点までの距離に用いると、必要な反力を2倍に見積もる。",
      "オ": "力のモーメントは半球の接点までの√3rを反力に掛ける。重力についても腕は重力の方向に垂直な(l/2)cos 30°なので、この値より小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q10.webp"
    ],
    "imageAltTexts": [
      "水平な床上の半球と、床から30°の角度で半球に接して立て掛けられた長さlの棒。半径rは接点で棒と直交する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q11",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "円柱とおもりに働く浮力",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、密度ρ₀、底面積S、高さLの一様な円柱を密度ρ（ρ＞ρ₀）の液体に浮かべ、円柱の上面の中心に質量mの小物体を静かに置いた。このとき、液体中に沈んでいる部分の円柱の高さとして最も妥当なのはどれか。ただし、円柱の中心軸は鉛直に保たれ、円柱の一部は液面よりも上にあるものとする。",
    "choices": {
      "ア": "(m＋ρ₀SL)/[(ρ−ρ₀)S]",
      "イ": "(m＋ρ₀SL)/(ρS)",
      "ウ": "(m＋ρSL)/(ρ₀S)",
      "エ": "(m−ρ₀SL)/(ρS)",
      "オ": "(m−ρSL)/(ρ₀S)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "円柱と小物体が受ける重力は(m＋ρ₀SL)gである。沈んだ高さをhとすると浮力はρShgなので、釣合いからh＝(m＋ρ₀SL)/(ρS)となる。",
    "choiceExplanations": {
      "ア": "沈んだ高さhに働く浮力は押しのけた液体の重さρShgである。円柱全体の重さは別に右辺へ足すので、浮力の密度からρ₀を引かない。",
      "イ": "円柱と小物体が受ける重力は(m＋ρ₀SL)gである。沈んだ高さをhとすると浮力はρShgなので、釣合いからh＝(m＋ρ₀SL)/(ρS)となる。",
      "ウ": "円柱の質量は円柱自体の密度ρ₀と体積SLで求める。浮力を決めるのは液体の密度ρであり、密度の役割が逆になっている。",
      "エ": "小物体と円柱の重力はどちらも下向きに働く。釣合いに用いる質量は差ではなくm＋ρ₀SLである。",
      "オ": "液体の密度ρは浮力に使い、円柱の質量にはρ₀を用いる。小物体と円柱は合わせて液面を押し下げるので、二つの質量の和を考える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q11.webp"
    ],
    "imageAltTexts": [
      "密度ρの液面に密度ρ₀、高さLの円柱が一部沈んで浮き、円柱上面中央に質量mの小物体が載っている。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q12",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "斜面内で打ち出した小球の軌道",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、水平面と60°をなす滑らかな斜面が水平な床に固定されており、床に置かれた小球を、この斜面に沿って上向き30°に、速さvで打ち出した。このとき、打ち出した地点から小球が床に初めて衝突する地点までの距離として最も妥当なのはどれか。ただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "v²/(2g)",
      "イ": "√3v²/(2g)",
      "ウ": "v²/g",
      "エ": "√3v²/g",
      "オ": "2v²/g"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "斜面の上向きをyとすると、床に戻るまでの時間は2v sin 30°/(g sin 60°)である。斜面の下端方向の速度v cos 30°は一定なので、その積を取るとv²/gになる。",
    "choiceExplanations": {
      "ア": "上向きの速度成分はv sin 30°だが、斜面上でこの成分を減らす加速度はg sin 60°である。床に戻るまでの時間には上りと下りの両方を含める。",
      "イ": "斜面の下端と平行な速度はv cos 30°である。床に戻るまでの時間では、鉛直の重力加速度ではなく斜面に沿う成分g sin 60°を使う。",
      "ウ": "斜面の上向きをyとすると、床に戻るまでの時間は2v sin 30°/(g sin 60°)である。斜面の下端方向の速度v cos 30°は一定なので、その積を取るとv²/gになる。",
      "エ": "戻る時刻は初期の斜面上向き速度成分と、加速度g sin 60°から決まる。下端に平行な成分まで正しく分解すると√3が約分される。",
      "オ": "下端に沿った速度をvと置くと過大になる。鉛直下向きの重力は斜面の上り下り方向にg sin 60°として働き、下端に沿った速度はv cos 30°である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q12.webp"
    ],
    "imageAltTexts": [
      "水平面との角が60°の固定斜面。床との境界線を基準に斜面上方へ30°の向きに小球を速さvで打ち出す。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q13",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "動摩擦が働く二物体の加速度",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかで水平な床の上に、質量4.0 kgで上面が粗い平板Aがあり、その上に質量2.0 kgの小物体Bが置かれている。Aに大きさ44 Nの力を水平に加え続けたところ、BはAの上を滑った。BがAの上を滑っているときの、AとBの床に対する加速度の大きさの組合せとして最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²、AとBの間の動摩擦係数を0.20とする。",
    "choices": {
      "ア": "A：10 m/s²、B：2.0 m/s²",
      "イ": "A：10 m/s²、B：4.0 m/s²",
      "ウ": "A：12 m/s²、B：1.0 m/s²",
      "エ": "A：12 m/s²、B：2.0 m/s²",
      "オ": "A：12 m/s²、B：4.0 m/s²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Bが受ける動摩擦力は0.20×2.0×10＝4.0 Nで、その加速度は4.0/2.0＝2.0 m/s²である。Aは左向きに同じ大きさの摩擦力を受けるため、加速度は(44−4)/4.0＝10 m/s²になる。",
    "choiceExplanations": {
      "ア": "Bが受ける動摩擦力は0.20×2.0×10＝4.0 Nで、その加速度は4.0/2.0＝2.0 m/s²である。Aは左向きに同じ大きさの摩擦力を受けるため、加速度は(44−4)/4.0＝10 m/s²になる。",
      "イ": "Aの加速度は妥当である。Bに働く水平力は4.0 Nの動摩擦力なので、質量2.0 kgで割った2.0 m/s²となる。",
      "ウ": "動摩擦力はBの重さ20 Nの0.20倍であり、Bではこれを質量2.0 kgで割る。Aの摩擦力は加えた44 Nと反対向きなので、Aの合力は40 Nである。",
      "エ": "Bの加速度は妥当である。BがAを引く摩擦力は図の44 Nと逆向きなので、合力は44＋4 Nではなく44−4 Nとなる。",
      "オ": "摩擦力はBの垂直抗力20 Nから求めると4.0 Nである。作用・反作用によりBを右へ加速し、Aに対しては加えた力を4.0 Nだけ減らす。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q13.webp"
    ],
    "imageAltTexts": [
      "床上の平板Aは4.0 kg、上にある小物体Bは2.0 kg。Aに44 Nの水平力が右向きに加わる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q14",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "放射線の電離作用と透過力",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "放射線に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n放射線が物質中に入射すると、原子中の電子を跳ね飛ばして物質内にイオンを生成することがある。これを電離作用と呼び、α線、β線、γ線の3種類の中だと、㋐の電離作用が最も大きい。また、放射線は物質を透過する能力があり、これを透過力と呼ぶ。α線、β線、γ線の3種類の中だと、㋑の透過力が最も大きい。",
    "choices": {
      "ア": "㋐：α線、㋑：β線",
      "イ": "㋐：α線、㋑：γ線",
      "ウ": "㋐：β線、㋑：α線",
      "エ": "㋐：γ線、㋑：α線",
      "オ": "㋐：γ線、㋑：β線"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "α線は電荷を持つ重い粒子で、通過した短い距離に多くの電離を起こす。γ線は電磁波であり、一般にα線、β線より厚い物質を透過する。",
    "choiceExplanations": {
      "ア": "α線の電離作用は大きい。透過力については、同じ物質で比べると一般にγ線がβ線より大きい。",
      "イ": "α線は電荷を持つ重い粒子で、通過した短い距離に多くの電離を起こす。γ線は電磁波であり、一般にα線、β線より厚い物質を透過する。",
      "ウ": "β線にも電離作用があるが、α線は一般に単位長さ当たりの電離がより大きい。α線は物質中で短い距離しか進まず、透過力は小さい。",
      "エ": "γ線は電荷を持たない光子で、物質を透過しやすい。α線は電離を強く起こして短距離で停止しやすく、記述は二つの役割を入れ替えている。",
      "オ": "β線の透過力はα線より大きいが、γ線はさらに透過しやすい。電離作用の大きさではα線が最も大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q15",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "正弦関数で表した単振動の変位",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "時刻t [s]における変位x [m]が、角振動数ω（＞0）[rad/s]を用いてx＝4.0 sin ωtと表される単振動において、周期が24 sである場合、t＝2.0のときの変位として最も妥当なのはどれか。",
    "choices": {
      "ア": "−3.5 m",
      "イ": "−2.0 m",
      "ウ": "−1.3 m",
      "エ": "1.3 m",
      "オ": "2.0 m"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "角振動数は2π/24＝π/12 rad/sで、2.0 s時点の位相はπ/6である。したがってx＝4.0×sin(π/6)＝2.0 mとなる。",
    "choiceExplanations": {
      "ア": "時刻2.0 sは一周期の1/12で、位相はπ/6である。正弦は正なので、負の変位にはならない。",
      "イ": "単振動はt＝0で原点を通過し、正の向きに進み始める。t＝2.0 sでは最初の四分の一周期の途中なので、変位は正である。",
      "ウ": "周期24 sからω＝π/12 rad/sと分かる。2.0 sを掛けた位相π/6の正弦は1/2なので、変位は負にならない。",
      "エ": "位相は2π×(2.0/24)＝π/6になる。正弦の値1/2を振幅4.0 mに掛けると1.3 mより大きい2.0 mになる。",
      "オ": "角振動数は2π/24＝π/12 rad/sで、2.0 s時点の位相はπ/6である。したがってx＝4.0×sin(π/6)＝2.0 mとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q16",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "焦点内にある物体と凸レンズの像",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、焦点距離6 cmの凸レンズの前方2 cmの位置に物体を置いたとき、レンズによってできる物体の像の種類と倍率（物体の大きさに対する像の大きさ）の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "虚像、3/4倍",
      "イ": "虚像、3/2倍",
      "ウ": "虚像、3倍",
      "エ": "実像、3/4倍",
      "オ": "実像、3/2倍"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "レンズ式1/6＝1/2＋1/bを解くと、像の距離bは−3 cmとなり、物体側に虚像をつくる。大きさの比は∣b∣/2＝3/2である。",
    "choiceExplanations": {
      "ア": "物体が焦点の内側にあるので、像が虚像である点は妥当である。像のレンズからの距離は3 cm、物体は2 cmなので倍率は3/2である。",
      "イ": "レンズ式1/6＝1/2＋1/bを解くと、像の距離bは−3 cmとなり、物体側に虚像をつくる。大きさの比は∣b∣/2＝3/2である。",
      "ウ": "虚像である点は妥当である。3はレンズから虚像までの距離をcmで表した値で、倍率は物体の距離2 cmに対する比を取る。",
      "エ": "物体が焦点距離より内側にあるため、レンズを出た光は後方で実際に収束しない。前方に見える像の倍率は3/2である。",
      "オ": "倍率の大きさは妥当である。レンズ式で像の距離が負になるので、光そのものが集まる実像ではなく、物体側に見える虚像になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q16.webp"
    ],
    "imageAltTexts": [
      "焦点距離6 cmの凸レンズの前方2 cmの位置に物体があり、前方と後方の焦点が示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q17",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "相変化、内部エネルギーと熱効率",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "熱力学に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 物質が液体から気体へ状態変化する間、物質の温度は必ず変化する。\n㋑ 気体の内部エネルギーは、原子・分子の相互の衝突による力積の総和のことをいう。\n㋒ 実在する熱機関の熱効率は、必ず1未満となる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "実在の熱機関では、受け取った熱の全てを仕事に変えることはできない。カルノー効率の上限でも低温熱源の絶対温度が正であれば1未満になる。",
    "choiceExplanations": {
      "ア": "純物質が一定圧力で沸騰しているとき、加えた熱は相変化の潜熱として使われる。その間は温度が沸点に保たれるので、㋐の「必ず」は誤りである。",
      "イ": "相変化に使われる熱は必ずしも温度上昇を生まない。気体の内部エネルギーは分子の運動や相互作用によるエネルギーの総和を考え、衝突の力積を足したものではない。",
      "ウ": "㋒は熱力学第二法則に沿っている。㋐には一定温度の相変化という反例があり、㋑の力積はそもそもエネルギーと異なる物理量である。",
      "エ": "熱効率に関する㋒は妥当である。力積の単位は運動量と同じで、運動や相互作用のエネルギーを合計した内部エネルギーとは次元が異なる。",
      "オ": "実在の熱機関では、受け取った熱の全てを仕事に変えることはできない。カルノー効率の上限でも低温熱源の絶対温度が正であれば1未満になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q18",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "一様な磁場中の荷電粒子の円運動",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、紙面に垂直に裏から表へ向かう一様な磁束密度Bの磁界中で、質量m、電気量q（＞0）の荷電粒子が、速さvで等速円運動をしているとき、荷電粒子の描く円軌道の半径として最も妥当なのはどれか。",
    "choices": {
      "ア": "mv/(2qB)",
      "イ": "mv/(qB)",
      "ウ": "2mv/(qB)",
      "エ": "mv²B/(2q)",
      "オ": "mv²B/q"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "速度に垂直なローレンツ力qvBが向心力mv²/rとなる。これを半径について解くとr＝mv/(qB)である。",
    "choiceExplanations": {
      "ア": "磁気力は速度が磁界と直交するとqvBになる。向心力mv²/rと等式を立てても係数2は現れない。",
      "イ": "速度に垂直なローレンツ力qvBが向心力mv²/rとなる。これを半径について解くとr＝mv/(qB)である。",
      "ウ": "磁気力qvBを半分に仮定すると、この半径に相当する。図では速度と磁界が直交するので、磁気力はqvBの大きさで働く。",
      "エ": "向心力の式にはv²が現れる一方、ローレンツ力はvに比例するため、等式を解くとvは一つだけ残る。磁束密度Bは磁気力を強めるので半径の分母に入る。",
      "オ": "磁束密度を大きくすると向心力が強まり、同じ速さでは軌道半径は小さくなる。Bに比例するこの形はその関係を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q18.webp"
    ],
    "imageAltTexts": [
      "磁束密度Bは紙面の裏から表へ向かう。正の粒子が右向きの速度から紙面内の円を描く。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q19",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "三枝の直流回路と接点電位",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、20 Ωの抵抗に流れる電流Iの大きさとして最も妥当なのはどれか。ただし、電源の内部抵抗は無視できるものとする。",
    "choices": {
      "ア": "0.14 A",
      "イ": "0.16 A",
      "ウ": "0.18 A",
      "エ": "0.20 A",
      "オ": "0.22 A"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "左の節点から右を引いた電位差をVとすると、枝電流の合計は(V−4)/10＋(V＋1)/10＋(V＋2)/20＝0となる。これよりV＝0.80 Vなので、下段には(0.80＋2)/20＝0.14 Aが流れる。",
    "choiceExplanations": {
      "ア": "左の節点から右を引いた電位差をVとすると、枝電流の合計は(V−4)/10＋(V＋1)/10＋(V＋2)/20＝0となる。これよりV＝0.80 Vなので、下段には(0.80＋2)/20＝0.14 Aが流れる。",
      "イ": "下段の電流が0.16 Aなら、下段での電圧降下は3.2 V、節点の電位差は1.2 Vになる。各枝の電流を合計するとゼロにならない。",
      "ウ": "三つの枝に対して電池の向きを考慮すると、節点電位差は0.80 Vである。下段の抵抗にかかる電圧は2.80 Vになり、3.60 Vに対応する0.18 Aにはならない。",
      "エ": "20 Ωに0.20 Aが流れるには、抵抗の電圧降下は4.0 V必要になる。電源2 Vを加えても、節点電位差0.80 Vから得られる電圧は2.80 Vである。",
      "オ": "0.22 Aでは20 Ωの電圧降下は4.4 Vとなり、下段から逆算した節点の電位差は2.4 Vである。この電位差では三枝の電流の和がゼロにならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q19.webp"
    ],
    "imageAltTexts": [
      "二つの節点を三つの枝がつなぐ。上段は10 Ωと左側が正の4 V電源、中段は10 Ωと右側が正の1 V電源、下段は右側が正の2 V電源と20 Ω抵抗で、下段の矢印は右向き。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q20",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "スイッチで切り替えるコンデンサと電荷の保存",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような回路がある。初め、いずれのコンデンサにも電荷は蓄えられておらず、スイッチS₁、S₂はいずれも開いていたとする。まず、S₁を閉じ、十分に時間が経過した後、S₁を開き、S₂を閉じた。この後、十分に時間が経過したとき、電気容量が20 µFのコンデンサに蓄えられている電気量として最も妥当なのはどれか。",
    "choices": {
      "ア": "6.0×10⁻⁴ C",
      "イ": "8.0×10⁻⁴ C",
      "ウ": "1.0×10⁻³ C",
      "エ": "1.2×10⁻³ C",
      "オ": "1.4×10⁻³ C"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "S₁を閉じると20 µFには90 Vで1800 µCが蓄えられ、下側の共通節点には−1800 µCが残る。S₂への切替え後の節点電位をVとすると20(V−45)＋40V＝−1800を満たし、V＝−15 Vより求める電気量は20×60＝1200 µCである。",
    "choiceExplanations": {
      "ア": "二つのコンデンサを初めから無電荷の直列として45 Vに接続すると600 µCになる。実際には最初の90 Vにより共通節点に負電荷が残っている。",
      "イ": "800 µCは20 µFに40 Vがかかった場合である。切替え後の共通節点は接地に対して−15 Vとなるため、45 Vの上端との電位差は60 Vである。",
      "ウ": "20 µFに1000 µCが蓄えられると電位差は50 Vで、共通節点の電位は−5 Vになる。この値では共通節点の初期電荷−1800 µCが保存されない。",
      "エ": "S₁を閉じると20 µFには90 Vで1800 µCが蓄えられ、下側の共通節点には−1800 µCが残る。S₂への切替え後の節点電位をVとすると20(V−45)＋40V＝−1800を満たし、V＝−15 Vより求める電気量は20×60＝1200 µCである。",
      "オ": "1400 µCなら20 µFの電位差は70 Vで共通節点は−25 Vになる。共通節点の−1800 µCが保存される値は−15 Vである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q20.webp"
    ],
    "imageAltTexts": [
      "左に90 V電源とスイッチS₁、右に45 V電源とS₂、中央の枝に20 µF、下の枝に40 µFのコンデンサがある。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q21",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "サイコロの確率と条件別の期待値",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n1～6の目をもつサイコロを3回振った。3回のうち同じ目が2回、異なる目が1回出る確率は㋐である。また、1の目が1回以上出る確率は㋑である。また、1回目に出た目が偶数の場合は、2回目と3回目に出た目の数の和に1回目に出た目を掛けた積を、1回目に出た目が奇数の場合は、2回目に出た目の数から3回目に出た目の数を引いた差に1回目に出た目を掛けた積を得点としたとき、この得点の期待値は㋒である。",
    "choices": {
      "ア": "㋐：5/12、㋑：91/216、㋒：14",
      "イ": "㋐：5/12、㋑：91/216、㋒：28",
      "ウ": "㋐：5/12、㋑：125/216、㋒：28",
      "エ": "㋐：5/36、㋑：91/216、㋒：28",
      "オ": "㋐：5/36、㋑：125/216、㋒：14"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "同じ目を6通り、異なる目を5通り、異なる目の位置を3通り選ぶので㋐は90/216＝5/12となり、㋑は1−(5/6)³＝91/216である。偶数のときの最初の目の平均4と残りの和の期待値7を掛け、偶数の確率1/2をさらに掛けるので㋒は14となる。",
    "choiceExplanations": {
      "ア": "同じ目を6通り、異なる目を5通り、異なる目の位置を3通り選ぶので㋐は90/216＝5/12となり、㋑は1−(5/6)³＝91/216である。偶数のときの最初の目の平均4と残りの和の期待値7を掛け、偶数の確率1/2をさらに掛けるので㋒は14となる。",
      "イ": "二つの確率は妥当である。28は最初の目が偶数という条件の下での期待値で、奇数の場合の期待値0も含めると14になる。",
      "ウ": "125/216は1の目が一度も出ない確率である。得点の期待値は、最初が偶数の場合の28にその確率1/2を掛け、奇数の場合の0を足した14となる。",
      "エ": "5/36は異なる目の位置を一つに決めた値で、実際は位置が3通りある。奇数の場合の差の期待値が0なので、無条件の得点の期待値は28の半分になる。",
      "オ": "得点の期待値14は妥当である。同じ目が二度出る確率は異なる目の位置の3通りを含めて5/12で、1が出る確率は1から(5/6)³を引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q22",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "数値解析",
    "topicTags": [
      "二分法とニュートン法の収束",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "非線形方程式の解を数値的に求める方法に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n区間[a₀, b₀]において、連続な関数f(x)が与えられたとき、f(a₀)f(b₀)≦0を満たすなら、f(x)＝0となる解が少なくとも一つ存在する。この解のうちの一つの近似値を求めるための方法として、以下の方法が挙げられる。\n㋐法\n① 区間[aₙ, bₙ]の二つの端点においてf(aₙ)f(bₙ)≦0である場合、その区間の中点cₙ＝(aₙ＋bₙ)/2及びf(cₙ)の値を求める。\n② f(aₙ)f(cₙ)≦0であれば、新しい区間[aₙ₊₁, bₙ₊₁]を[aₙ, cₙ]と設定し、f(aₙ)f(cₙ)＞0であれば、新しい区間[aₙ₊₁, bₙ₊₁]を[cₙ, bₙ]と設定する。\n③ ①、②を繰り返すことにより、解αの近似値を求める。\n㋑法\n① 解αに近いと考えられる初期値x₀を設定する。\n② 点(xₙ, f(xₙ))におけるy＝f(x)の接線を引く。\n③ 接線がx軸と交わる点xₙ₊₁を求める。\n④ ②、③を繰り返すことにより、解αの近似値を求める。\n関数f(x)が2回連続微分可能で、かつf′(α)≠0の場合、解に収束する速さを比較すると、㋐法は㋒収束であり、㋑法は㋓収束である。",
    "choices": {
      "ア": "㋐：はさみうち、㋑：ニュートン、㋒：一次、㋓：二次",
      "イ": "㋐：はさみうち、㋑：二分、㋒：二次、㋓：一次",
      "ウ": "㋐：ニュートン、㋑：二分、㋒：一次、㋓：二次",
      "エ": "㋐：二分、㋑：ニュートン、㋒：二次、㋓：一次",
      "オ": "㋐：二分、㋑：ニュートン、㋒：一次、㋓：二次"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋐は符号が変わる区間を二分し、その幅が毎回半分になるので一次収束と扱う。㋑はニュートン法で、単根の近くでは一次の誤差項が消え、残る誤差が二次の大きさになる。",
    "choiceExplanations": {
      "ア": "接線を用いる㋑はニュートン法で、その収束の次数は妥当である。㋐は各ステップで中点を取り、区間を二分する手順である。",
      "イ": "㋐は端点の間隔を毎回半分にする二分法で、誤差の上限は一定比で小さくなる。㋑では中点ではなく接線とx軸との交点を次の近似値とする。",
      "ウ": "一次、二次という順序は妥当である。㋐は中点で区間を半分にする二分法、㋑は接線から次の値を取るニュートン法であり、名称が逆である。",
      "エ": "方法の名称は合っている。二分法の区間幅は毎回1/2倍で一次に縮み、単根近傍のニュートン法は誤差が前回の誤差の二乗の大きさで減る。",
      "オ": "㋐は符号が変わる区間を二分し、その幅が毎回半分になるので一次収束と扱う。㋑はニュートン法で、単根の近くでは一次の誤差項が消え、残る誤差が二次の大きさになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q22.webp"
    ],
    "imageAltTexts": [
      "連続な関数y＝f(x)の根αを挟む端点a₀、b₀と中点、および初期値x₀から接線で求める点x₁が示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q23",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "ディジタル回路",
    "topicTags": [
      "論理ゲートの整理と吸収則",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような論理回路における入力A、Bと出力Xの関係を表す論理式として最も妥当なのはどれか。ただし、AとBの論理積をA·B、AとBの否定をそれぞれ¬A、¬Bと表すものとする。",
    "choices": {
      "ア": "X＝A",
      "イ": "X＝¬A",
      "ウ": "X＝B",
      "エ": "X＝¬B",
      "オ": "X＝¬A·¬B"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "上側は¬A∨¬(¬A·B)＝¬A∨A∨¬B＝1である。下側は¬[(¬A∨B)·B]＝¬Bなので、最後のANDでX＝1·¬B＝¬Bとなる。",
    "choiceExplanations": {
      "ア": "上側のORの出力は¬A∨¬(¬A·B)＝1となる。最終出力は下側から来る¬Bで決まり、Aには依存しない。",
      "イ": "Aが否定されて中間回路に入るが、上側の式は常に1に簡約される。下側もBを含む吸収則でAが消えるのでXは¬Aではない。",
      "ウ": "下側のNANDへの入力の論理積(¬A∨B)·BはBに簡約される。NANDなので、最終段に届く信号はBを反転した¬Bである。",
      "エ": "上側は¬A∨¬(¬A·B)＝¬A∨A∨¬B＝1である。下側は¬[(¬A∨B)·B]＝¬Bなので、最後のANDでX＝1·¬B＝¬Bとなる。",
      "オ": "例えばA＝1、B＝0の場合、上側は1、下側も1でX＝1になる。提案式¬A·¬Bはこの入力で0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q23.webp"
    ],
    "imageAltTexts": [
      "入力AとBをNOT、NAND、ORで組み合わせ、最後のANDゲートからXを出す回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q24",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "相対パスと排他制御のデッドロック",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "オペレーティングシステムにおけるファイル処理に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n階層型ファイルシステムを採用するオペレーティングシステムにおいて、ファイルやディレクトリを特定する文字列をパスと呼ぶ。パスにはルートディレクトリからの絶対的な位置を示す絶対パスと、㋐からの相対的な位置を示す相対パスがある。ファイルAとファイルBの両方にアクセスするタスクPとタスクQが同時に実行されるとき、㋑を行う必要がある。PがAに㋑を行った後にBに㋑を行い、Qが㋒に㋑を行った後に㋓に㋑を行うとき、デッドロックが発生する可能性がある。",
    "choices": {
      "ア": "㋐：カレントディレクトリ、㋑：排他制御、㋒：A、㋓：B",
      "イ": "㋐：カレントディレクトリ、㋑：排他制御、㋒：B、㋓：A",
      "ウ": "㋐：カレントディレクトリ、㋑：ロールフォワード、㋒：B、㋓：A",
      "エ": "㋐：ホームディレクトリ、㋑：排他制御、㋒：B、㋓：A",
      "オ": "㋐：ホームディレクトリ、㋑：ロールフォワード、㋒：A、㋓：B"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "相対パスはカレントディレクトリを基準とし、共有資源へのアクセスを排他制御で調整する。PがAを保持してBを待ち、QがBを保持してAを待つと、循環待ちが生じる。",
    "choiceExplanations": {
      "ア": "相対パスの基準と排他制御は妥当である。二つのタスクがともにA、Bの順でロックを取るなら、この二つのロックだけで相互に待ち続ける状態は生じない。",
      "イ": "相対パスはカレントディレクトリを基準とし、共有資源へのアクセスを排他制御で調整する。PがAを保持してBを待ち、QがBを保持してAを待つと、循環待ちが生じる。",
      "ウ": "ディレクトリと二つのファイルを取得する順は妥当である。ロールフォワードはログなどから回復を進める処理で、同時アクセスを調整するための排他制御とは用途が異なる。",
      "エ": "B、Aの順で排他制御をすると、Pと相互に待つ可能性がある。相対パスはその時点の作業ディレクトリを基準にし、ログイン時のホームディレクトリとは限らない。",
      "オ": "相対パスの起点はカレントディレクトリで、資源の同時利用を調整するのは排他制御である。A、Bの順が両タスクで共通なら、ここでの逆順のロック待ちは生じない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q25",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "RAID 5の稼働率と同時故障",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ハードディスクで構成されたRAID 5のストレージシステムを考える。RAID 5とは複数台のハードディスクにデータとパリティを分散して書き込むことで、1台のハードディスクが故障しても稼働することができ、2台以上のハードディスクが故障すると停止するストレージシステムである。ここで、稼働率がRのハードディスクを4台使用してRAID 5のストレージシステムを構築するとき、このストレージシステム全体の稼働率として最も妥当なのはどれか。",
    "choices": {
      "ア": "R⁴",
      "イ": "R⁴＋R(1−R)³",
      "ウ": "R⁴＋4R(1−R)³",
      "エ": "R⁴＋R³(1−R)",
      "オ": "R⁴＋4R³(1−R)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ディスクの稼働が独立とすると、4台とも動く確率はR⁴である。1台だけ故障する確率は故障する1台の選び方4を掛けた4R³(1−R)となり、両方を足す。",
    "choiceExplanations": {
      "ア": "R⁴は4台全てが動作している確率である。RAID 5は1台だけが停止している場合も運用できるので、その確率を加える必要がある。",
      "イ": "R(1−R)³は特定の1台だけが動き、残り3台が故障した場合を表す。その状態ではシステムは停止する。",
      "ウ": "4R(1−R)³は稼働している1台の選び方を含め、3台が停止する確率を数えている。追加するべきなのは稼働が3台、停止が1台の事象である。",
      "エ": "R³(1−R)は特定の1台だけが故障する確率である。故障する1台は4通り選べるので、この項を4倍する。",
      "オ": "ディスクの稼働が独立とすると、4台とも動く確率はR⁴である。1台だけ故障する確率は故障する1台の選び方4を掛けた4R³(1−R)となり、両方を足す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q26",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "M/M/1待ち行列の平均滞在時間",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "コンピュータによる伝票処理システムがある。このシステムは、1分当たり平均15件の伝票を受信し、1分当たり平均40件の伝票を処理することができる。このとき、伝票1件当たりの平均処理時間として最も妥当なのはどれか。\nただし、伝票の受信及び処理は、M/M/1待ち行列モデルに従うものとする。なお、M/M/1待ち行列モデルにおいて、平均滞留件数L（処理中又は処理を待っている伝票の数の平均）は、利用率（伝票が処理中である時間の割合）をρとしたとき、L＝ρ/(1−ρ)と表せる。また、伝票1件当たりの平均処理時間とは、伝票の受信から処理終了までに掛かる時間の平均である。",
    "choices": {
      "ア": "2.1秒",
      "イ": "2.2秒",
      "ウ": "2.3秒",
      "エ": "2.4秒",
      "オ": "2.5秒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "利用率は15/40＝0.375で、平均滞留件数は0.375/(1−0.375)＝0.6件である。リトルの法則により0.6/15＝0.04分、すなわち平均2.4秒となる。",
    "choiceExplanations": {
      "ア": "利用率は15/40で、平均滞留件数ρ/(1−ρ)は0.6件である。毎分15件で割ると、平均時間は0.04分であり、2.1秒ではない。",
      "イ": "毎分15件は毎秒0.25件に当たる。平均滞留0.6件を毎秒の到着数で割ると、受信から終了までに平均2.4秒を要する。",
      "ウ": "このモデルでの平均滞在時間は、処理率と到着率の差40−15＝25件/分の逆数になる。1/25分を秒に換算すると2.4秒である。",
      "エ": "利用率は15/40＝0.375で、平均滞留件数は0.375/(1−0.375)＝0.6件である。リトルの法則により0.6/15＝0.04分、すなわち平均2.4秒となる。",
      "オ": "待ち時間を含む平均時間は到着率と平均滞留件数から求める。平均0.6件に対して毎分15件を受信するので、2.5秒より短い2.4秒になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q27",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "信号処理",
    "topicTags": [
      "標本化定理と折り返し雑音の対策",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "AD変換に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n様々な周波数成分を含む連続的なアナログ信号を、サンプリング周波数fₛ [Hz]で標本化することを考える。標本化定理によると、アナログ信号に含まれる周波数成分のうち、fₛ/2 [Hz]㋐のものについては、標本化を経た後も元通りの波形を再現することができる。一方、そうでない高周波の成分は、標本化を経た後に元の波形を再現できず、異なる周波数の波形と区別できなくなってしまう。これを折り返し雑音という。このような折り返し雑音への対策として、標本化の㋑に㋒フィルタを用いることで、不要な高周波の成分を取り除くことが挙げられる。",
    "choices": {
      "ア": "㋐：未満、㋑：前、㋒：ローパス",
      "イ": "㋐：未満、㋑：前、㋒：ハイパス",
      "ウ": "㋐：未満、㋑：後、㋒：ハイパス",
      "エ": "㋐：以下、㋑：前、㋒：ローパス",
      "オ": "㋐：以下、㋑：後、㋒：ハイパス"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "再現を保証するには最高周波数がfₛ/2より低い必要がある。サンプリング前のローパスフィルタで不要な高周波を落とすと、低い周波数への折り返しを抑えられる。",
    "choiceExplanations": {
      "ア": "再現を保証するには最高周波数がfₛ/2より低い必要がある。サンプリング前のローパスフィルタで不要な高周波を落とすと、低い周波数への折り返しを抑えられる。",
      "イ": "周波数条件とフィルタを通す時期は妥当である。ハイパスフィルタは低い周波数を抑えるので、不要な高周波を取り除くにはローパスフィルタを使う。",
      "ウ": "元の高周波成分は標本化を終えると有用な低周波と区別できなくなる場合がある。そこで、ローパスフィルタは標本化前に使う。",
      "エ": "フィルタの種類と適用時期は妥当である。ちょうどfₛ/2の成分は位相によって全サンプルが0になることもあるため、一般の再現保証には厳密に未満とする。",
      "オ": "サンプリング周波数の半分以上の成分が混入する前に取り除く必要がある。高周波を通すハイパスフィルタを標本化後に使う方法では防げない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q28",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "情報通信",
    "topicTags": [
      "無線LANのMACアドレスと暗号化",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "無線LANと情報ネットワークに関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n無線LANの規格のうち近年幅広く使われているものにIEEE 802.11nがある。無線LANのこの規格において、ネットワーク機器やネットワークアダプタに製造段階で与えられる固有の識別子を㋐と呼ぶ。㋐はOSI階層モデルにおける㋑に相当する。無線LANにおける通信を秘匿化するために暗号化が用いられることがあるが、IEEE 802.11nにおいて暗号化を行う方式の一つに㋒がある。",
    "choices": {
      "ア": "㋐：MACアドレス、㋑：データリンク層、㋒：WPA",
      "イ": "㋐：MACアドレス、㋑：トランスポート層、㋒：IPA",
      "ウ": "㋐：MACアドレス、㋑：ネットワーク層、㋒：WPA",
      "エ": "㋐：SSID、㋑：データリンク層、㋒：WPA",
      "オ": "㋐：SSID、㋑：ネットワーク層、㋒：IPA"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "インターフェースの識別に用いるMACアドレスは、OSIのデータリンク層でフレームの送受信に使われる。WPAは無線LAN通信を保護する方式の一つである。",
    "choiceExplanations": {
      "ア": "インターフェースの識別に用いるMACアドレスは、OSIのデータリンク層でフレームの送受信に使われる。WPAは無線LAN通信を保護する方式の一つである。",
      "イ": "識別子がMACアドレスである点は妥当である。MACアドレスはデータリンク層で扱い、示された暗号化方式はWPAである。",
      "ウ": "MACアドレスとWPAは妥当である。IPアドレスの論理的な経路制御を担うネットワーク層より下位のデータリンク層で、MACアドレスを扱う。",
      "エ": "データリンク層とWPAは妥当である。SSIDは接続先となる無線ネットワークの識別名で、機器のインターフェースに与えられる識別子はMACアドレスである。",
      "オ": "SSIDは無線ネットワークを識別し、機器のデータリンク層のアドレスを表すのはMACアドレスである。無線LANの保護方式としてはWPAが該当する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q29",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電磁気",
    "topicTags": [
      "半無限線電荷による原点の電場",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、真空中において、x軸に沿ってx＝x₀（＞0）からx＝＋∞まで、線密度λで電荷が一様に線状に分布している。原点Oにおける電界の大きさとして最も妥当なのはどれか。ただし、真空の誘電率をε₀とする。",
    "choices": {
      "ア": "λ/(2πε₀x₀)",
      "イ": "λ/(4πε₀x₀)",
      "ウ": "λ/(12πε₀x₀)",
      "エ": "λ/(4πε₀x₀²)",
      "オ": "λ/(12πε₀x₀²)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "位置xにおける微小電荷λdxは、原点に大きさλdx/(4πε₀x²)の電界をつくる。全て同じ軸方向なので合計し、∫ₓ₀^∞ x⁻²dx＝1/x₀からλ/(4πε₀x₀)を得る。",
    "choiceExplanations": {
      "ア": "電場の微小成分にはクーロンの法則の係数1/(4πε₀)を使う。原点の右側のx₀から無限遠までの線電荷だけを積分するので、係数を2倍にはしない。",
      "イ": "位置xにおける微小電荷λdxは、原点に大きさλdx/(4πε₀x²)の電界をつくる。全て同じ軸方向なので合計し、∫ₓ₀^∞ x⁻²dx＝1/x₀からλ/(4πε₀x₀)を得る。",
      "ウ": "原点での各微小電場はx⁻²に比例し、x₀から無限遠まで積分すると1/x₀である。積分で3による除算は生じない。",
      "エ": "各微小電荷の寄与は距離の二乗に反比例する。線に分布する寄与をdxについて積分すると、距離x₀の一乗の逆数になる。",
      "オ": "距離依存性は、点電荷の式を線上の全電荷について積分して求める。その結果はx₀⁻¹であり、さらに係数1/3を付ける理由もない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q29.webp"
    ],
    "imageAltTexts": [
      "x軸の原点Oより右側のx₀から右向きに、線密度λの線電荷が続く。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q30",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電磁気",
    "topicTags": [
      "コイルの自己誘導と蓄積エネルギー",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "コイルに流れる電流が図のように変化しているとき、4 Vの誘導起電力が生じるコイルがある。このコイルに2 Aの直流電流を流したとき、このコイルに蓄えられるエネルギーとして最も妥当なのはどれか。",
    "choices": {
      "ア": "40 mJ",
      "イ": "80 mJ",
      "ウ": "160 mJ",
      "エ": "320 mJ",
      "オ": "640 mJ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "グラフから電流の増加率は0.2 A/0.001 s＝200 A/sであり、自己インダクタンスは4/200＝0.020 Hである。2 Aにおける蓄積エネルギーはLI²/2＝0.040 Jである。",
    "choiceExplanations": {
      "ア": "グラフから電流の増加率は0.2 A/0.001 s＝200 A/sであり、自己インダクタンスは4/200＝0.020 Hである。2 Aにおける蓄積エネルギーはLI²/2＝0.040 Jである。",
      "イ": "0.080 JはLにI²を掛けた値である。電流0から2 Aに増やすときの仕事を積分すると、エネルギーには1/2が付く。",
      "ウ": "誘導起電力から得るLは20 mHである。2 Aを流したときのエネルギーはI²の4にLと1/2を掛けた40 mJになる。",
      "エ": "4 Vはグラフの電流増加率に対する誘導起電力で、直流2 Aを流し続けたときの電力を与える値ではない。エネルギーは20 mHと電流から求める。",
      "オ": "0.2 Aの増加に要する1 msを秒に直すと、電流変化率は200 A/sである。Lは0.020 Hとなり、蓄積エネルギーは0.040 Jになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q30.webp"
    ],
    "imageAltTexts": [
      "電流と時間のグラフ。電流が0 Aから1 msで0.2 Aに直線的に増加する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q31",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "平衡した直流ブリッジ回路",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、電流Iと電圧Vの大きさの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "I：0.4 A、V：4 V",
      "イ": "I：0.4 A、V：8 V",
      "ウ": "I：0.5 A、V：4 V",
      "エ": "I：0.5 A、V：8 V",
      "オ": "I：0.6 A、V：8 V"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "24/16＝21/14で左右の中点の電位が等しく、中央の8 Ωには電流が流れない。I＝20/(24＋16)＝0.5 A、V＝20×14/(21＋14)＝8 Vとなる。",
    "choiceExplanations": {
      "ア": "左右の上下の抵抗比は等しいので中央の8 Ωに電流が流れない。左枝の電流は20/(24＋16) A、右下の電圧は20×14/(21＋14) Vである。",
      "イ": "右下の分圧Vは8 Vで妥当である。中央の8 Ωは平衡しているため、左枝の電流を計算する式には含まれない。",
      "ウ": "左枝電流0.5 Aは合う。右下は枝にかかる20 Vのうち抵抗比14/(21＋14)の分なので、4 Vにはならない。",
      "エ": "24/16＝21/14で左右の中点の電位が等しく、中央の8 Ωには電流が流れない。I＝20/(24＋16)＝0.5 A、V＝20×14/(21＋14)＝8 Vとなる。",
      "オ": "V＝8 Vは妥当である。左枝の全抵抗は40 Ωであり、20 Vを40 Ωで割ると0.5 Aである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q31.webp"
    ],
    "imageAltTexts": [
      "20 V電源につながるブリッジ。左の縦枝は24 Ωと16 Ω、右は21 Ωと14 Ωで、両中点を8 Ωが結ぶ。Iは左下を下向き、Vは右下の両端間。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q32",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "理想LC回路の電荷振動",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、自己インダクタンス100 mHのコイルと、静電容量1.6 µFのコンデンサを直列につないだ回路において、スイッチを開いた状態でコンデンサに8 µCの電荷を与え、その後スイッチを閉じた。スイッチを閉じてから3.14×10⁻⁴秒後に、コンデンサに蓄えられている電荷の大きさとして最も妥当なのはどれか。ただし、スイッチを閉じたとき、コイルに電流は流れていないものとする。",
    "choices": {
      "ア": "0.0 µC",
      "イ": "4.0 µC",
      "ウ": "5.7 µC",
      "エ": "6.9 µC",
      "オ": "8.0 µC"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "初期電流0なので電荷はq(t)＝8 cos(ωt) µC、ω＝1/√(LC)＝2500 rad/sである。指定時刻でωt≃π/4となり、電荷の大きさは8/√2≃5.7 µCである。",
    "choiceExplanations": {
      "ア": "電荷が最初に0になるのは位相がπ/2のときである。指定の時刻ではまだ約π/4で、電荷が残っている。",
      "イ": "4.0 µCは初期値の半分で、位相がπ/3のときの値である。与えられた時刻をLC振動の角振動数に掛けると位相はπ/4になる。",
      "ウ": "初期電流0なので電荷はq(t)＝8 cos(ωt) µC、ω＝1/√(LC)＝2500 rad/sである。指定時刻でωt≃π/4となり、電荷の大きさは8/√2≃5.7 µCである。",
      "エ": "6.9 µCは初期値にcos(π/6)を掛けた値に近い。100 mHと1.6 µFから求まる角振動数では、指定時刻の位相はより大きいπ/4になる。",
      "オ": "8.0 µCは閉じた瞬間の電荷の大きさである。閉じた後はコンデンサとコイルでエネルギーが行き来し、指定時刻の電荷は初期値の1/√2になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q32.webp"
    ],
    "imageAltTexts": [
      "100 mHのコイル、1.6 µFのコンデンサとスイッチの直列回路。スイッチが開いており、コンデンサの極板に＋8 µC、−8 µCが示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q33",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "T形二端子対回路のインピーダンス行列",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような四端子回路において、電圧V₁、V₂及び電流I₁、I₂をそれぞれ図の向きにとったとき、それらの関係式はインピーダンス行列［［Z₁₁, Z₁₂］, ［Z₂₁, Z₂₂］］を用いて［V₁, V₂］ᵀ＝［［Z₁₁, Z₁₂］, ［Z₂₁, Z₂₂］］［I₁, I₂］ᵀで表される。このとき、図Ⅱの回路のインピーダンス行列として最も妥当なのはどれか。",
    "choices": {
      "ア": "［［4 Ω, 1 Ω］, ［1 Ω, 4 Ω］］",
      "イ": "［［4 Ω, 1 Ω］, ［1 Ω, 3 Ω］］",
      "ウ": "［［4 Ω, 0 Ω］, ［0 Ω, 3 Ω］］",
      "エ": "［［4 Ω, 3 Ω］, ［4 Ω, 3 Ω］］",
      "オ": "［［4 Ω, 3 Ω］, ［3 Ω, 4 Ω］］"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "中央の1 ΩにはI₁＋I₂が流れるので、その中点電位はI₁＋I₂である。左はさらに3I₁、右は2I₂が加わり、V₁＝4I₁＋I₂、V₂＝I₁＋3I₂となる。",
    "choiceExplanations": {
      "ア": "右側だけから電流を入れると、右の2 Ωと中央の1 Ωの両方に流れる。よってZ₂₂は2＋1＝3 Ωとなる。",
      "イ": "中央の1 ΩにはI₁＋I₂が流れるので、その中点電位はI₁＋I₂である。左はさらに3I₁、右は2I₂が加わり、V₁＝4I₁＋I₂、V₂＝I₁＋3I₂となる。",
      "ウ": "一方の端子から電流を入れると、共通の1 Ωで生じる電圧がもう一方の端子にも現れる。そのため相互の係数Z₁₂とZ₂₁も1 Ωになる。",
      "エ": "相互の係数は片側からの電流が中央の枝で生む電圧によって決まる。中央の抵抗は1 Ωであり、3 Ωや4 Ωにはならない。",
      "オ": "左右が共有する中央抵抗は1 Ωなので、Z₁₂とZ₂₁はいずれも1 Ωである。右開放時と左開放時の対角成分は、それぞれ3＋1 Ω、2＋1 Ωになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q33.webp"
    ],
    "imageAltTexts": [
      "図Ⅰは左右の端子にV₁、V₂がありI₁、I₂がそれぞれ流れ込む四端子回路。図Ⅱでは左3 Ωと右2 Ωが中点でつながり、中点から下の基準線へ1 Ωが接続される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q34",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "制御工学",
    "topicTags": [
      "負帰還系の伝達関数",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のようなフィードバック制御系のブロック線図において、伝達関数B/Aを表したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "[G(K＋F)−H]/(1＋G−H)",
      "イ": "[G(K＋F)＋H]/(1−G＋H)",
      "ウ": "[G(K−F)−H]/(1−G−H)",
      "エ": "G(K＋F)/(1−GH)",
      "オ": "G(K−F)/(1＋GH)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "加算点の信号は(K−F)A−HBであり、出力はこれにGを掛けたB＝G(K−F)A−GHBとなる。Bの項を左に集めるとB/A＝G(K−F)/(1＋GH)となる。",
    "choiceExplanations": {
      "ア": "Fの枝は加算点へ負号で入るので、入力と直接関係する項は(K−F)Aである。Hは入力から引く定数ではなく、出力Bを通した帰還信号を作る。",
      "イ": "帰還される信号はHBで、その符号は負である。出力方程式の−GHBを左に移すことで、分母には積GHを加える。",
      "ウ": "KとFの入力枝の差は合っている。Hに入るのは出力Bであるため、分子からHを単独で引くのではなく、GとHの積が分母に現れる。",
      "エ": "FとHの信号はいずれも加算点で減算される。したがって入力側はK−F、帰還を左辺へ移した係数は1＋GHになる。",
      "オ": "加算点の信号は(K−F)A−HBであり、出力はこれにGを掛けたB＝G(K−F)A−GHBとなる。Bの項を左に集めるとB/A＝G(K−F)/(1＋GH)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q34.webp"
    ],
    "imageAltTexts": [
      "入力AからKとFの並列枝が出て、Kが正、Fが負の符号で加算点に入る。加算点の後段はG、出力BからHを通した帰還も負。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q35",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "理想変圧器の巻数比と一次電流",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、一次巻線及び二次巻線の巻数がそれぞれN₁及びN₂の理想変圧器があり、その二次側に抵抗値Rの抵抗が接続されている。一次側に実効値Vの交流電圧を印加したときの一次側の電流の実効値Iとして最も妥当なのはどれか。",
    "choices": {
      "ア": "V/(N₁N₂R)",
      "イ": "N₂V/(N₁R)",
      "ウ": "N₁V/(N₂R)",
      "エ": "N₂²V/(N₁²R)",
      "オ": "N₁²V/(N₂²R)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "二次電圧は(N₂/N₁)Vなので、二次電流は(N₂/N₁)V/Rとなる。理想変圧器の電力の釣合いにより一次電流は二次電流のN₂/N₁倍で、N₂²V/(N₁²R)となる。",
    "choiceExplanations": {
      "ア": "理想変圧器の変換は巻数の比で決まり、一次と二次の巻数を同じ割合で増やしても変わらない。分母に巻数の積を用いるこの形は、その性質を満たさない。",
      "イ": "N₂V/(N₁R)は二次側電圧(N₂/N₁)VをRで割った二次側電流である。一次側電流に直すと、さらにN₂/N₁を掛ける。",
      "ウ": "二次電圧は一次電圧のN₂/N₁倍となる。二次側の抵抗電流から一次側に換算すると、もう一度同じ巻数比が現れる。",
      "エ": "二次電圧は(N₂/N₁)Vなので、二次電流は(N₂/N₁)V/Rとなる。理想変圧器の電力の釣合いにより一次電流は二次電流のN₂/N₁倍で、N₂²V/(N₁²R)となる。",
      "オ": "一次側から見た等価抵抗は(N₁/N₂)²Rである。電流はVをこの抵抗で割るので、式ではN₂²/N₁²を掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q35.webp"
    ],
    "imageAltTexts": [
      "一次巻数N₁の巻線に実効電圧Vを印加し電流Iが流れる。二次巻数N₂の巻線に抵抗Rを接続する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q36",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "交流の有効電力・無効電力・皮相電力",
      "デジタル・電気・電子区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ある負荷に実効値200 Vの交流電源を接続したところ、実効値20 Aの電流が流れ、3200 Wの電力を消費した。このときの無効電力として最も妥当なのはどれか。",
    "choices": {
      "ア": "800 var",
      "イ": "1600 var",
      "ウ": "2400 var",
      "エ": "3200 var",
      "オ": "4000 var"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "皮相電力Sは200×20＝4000 VAで、有効電力Pは3200 Wである。無効電力の大きさは√(S²−P²)＝2400 varとなる。",
    "choiceExplanations": {
      "ア": "800は皮相電力4000と有効電力3200を単純に引いた値である。無効電力は有効電力と直交する成分なので、電力三角形から求める。",
      "イ": "力率は3200/(200×20)＝0.8であり、位相差の正弦の大きさは0.6となる。この0.6を皮相電力4000 VAに掛けると2400 varになる。",
      "ウ": "皮相電力Sは200×20＝4000 VAで、有効電力Pは3200 Wである。無効電力の大きさは√(S²−P²)＝2400 varとなる。",
      "エ": "3200 Wは負荷が消費する有効電力である。無効電力はこれと皮相電力から二乗の差を取って求める別の成分である。",
      "オ": "4000 VAは電圧と電流の実効値の積である皮相電力である。有効電力が0でないため、無効電力の大きさは皮相電力より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q37",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "スタックのLIFOとPUSH・POP",
      "デジタル・電気・電子区分",
      "選択A（情報工学）"
    ],
    "difficulty": 3,
    "question": "スタックと呼ばれるデータ構造に関する記述の㋐、㋑及び図Ⅱの㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n図Ⅰのように、PUSH(X)命令でデータXを入れ、POP命令でデータを取り出すLIFO（Last In First Out）構造のスタックについて考える。データA～Dがあり、最初の命令を実行する前にデータ㋐だけがスタックに格納されているときに、「PUSH(A)→PUSH(C)→POP→PUSH(㋑)→PUSH(B)→PUSH(D)→POP」の順番に命令を実行した。最後の命令を実行した後にスタックは図Ⅱのようになった。",
    "choices": {
      "ア": "㋐：B、㋑：B、㋒：A",
      "イ": "㋐：B、㋑：B、㋒：B",
      "ウ": "㋐：B、㋑：D、㋒：A",
      "エ": "㋐：C、㋑：A、㋒：A",
      "オ": "㋐：C、㋑：D、㋒：B"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二回のPOPで消えるデータは各直前に入れたCとDである。残るデータは下から初期値㋐、A、途中で積んだ㋑、Bの順なので、図Ⅱから㋐＝B、㋑＝D、㋒＝Aとなる。",
    "choiceExplanations": {
      "ア": "最下段Bと、その直上に残るAは妥当である。最後のPOPで最後に積んだDは取り出されるので、最終図の上から二番目のDは㋑で積んだものになる。",
      "イ": "最下段の初期データがBである点は合っている。途中の二回のPOPで取り出されるのはCと最後のDなので、Aが最下段の一つ上に残り、㋑で積んだものがその上段のDになる。",
      "ウ": "二回のPOPで消えるデータは各直前に入れたCとDである。残るデータは下から初期値㋐、A、途中で積んだ㋑、Bの順なので、図Ⅱから㋐＝B、㋑＝D、㋒＝Aとなる。",
      "エ": "Aは取り出されないため㋒に残る。最下段の初期データは最後まで残ってBとなり、上から二番目のDは㋑で積んだものになる。",
      "オ": "手順に最下段までPOPする操作はないので、図の最下段Bが㋐である。PUSH(A)で入れたAも残るので、最下段の直上はAである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q37.webp"
    ],
    "imageAltTexts": [
      "図ⅠはPUSHとPOPのスタック操作。図Ⅱは上端からB、D、㋒、Bと四段に並んでいる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q38",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "BNFで生成できる式",
      "デジタル・電気・電子区分",
      "選択A（情報工学）"
    ],
    "difficulty": 3,
    "question": "BNF定義において非終端記号〈式〉から生成して得られるものとして最も妥当なのはどれか。\n〈式〉 ::= 〈変数〉 | (〈式〉＋〈式〉) | (〈式〉−〈式〉) | 〈式〉＊〈式〉\n〈変数〉 ::= x | y | z",
    "choices": {
      "ア": "x＋y＋z",
      "イ": "x＋y−z",
      "ウ": "x＋y＊z",
      "エ": "(x＋y)＊z",
      "オ": "(x−y)＋z"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最初に〈式〉＊〈式〉を選び、左を(〈式〉＋〈式〉)、右をzに展開できる。左の括弧内をxとyに変えると(x＋y)＊zとなる。",
    "choiceExplanations": {
      "ア": "生成規則で足し算を使う場合、両辺を含む式全体に括弧が付く。括弧を付けずに足し算だけを連ねる式は規則から生成できない。",
      "イ": "足し算と引き算はいずれも、その演算の左右を括弧で囲む生成規則を使う。この候補には双方に必要な括弧がない。",
      "ウ": "掛け算は括弧を付けずに生成できるが、足し算には括弧が付く。先頭のxと後続の積を足す式を生成すると外側に括弧が必要になる。",
      "エ": "最初に〈式〉＊〈式〉を選び、左を(〈式〉＋〈式〉)、右をzに展開できる。左の括弧内をxとyに変えると(x＋y)＊zとなる。",
      "オ": "括弧内の(x−y)は生成できるが、外側にも足し算がある。その足し算にも括弧が必要なので、全体は((x−y)＋z)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q39",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "バブルソートの外側ループ回数",
      "デジタル・電気・電子区分",
      "選択A（情報工学）"
    ],
    "difficulty": 3,
    "question": "図に示すプログラムは、バブルソートと呼ばれる配列内の数字を値が小さい順に並び替えるアルゴリズムをC言語で記述したものである。このプログラムを実行したとき、㋐に表示されるものとして最も妥当なのはどれか。ただし、プログラムの動作に必要なヘッダーファイルは適切に読み込まれるものとする。",
    "choices": {
      "ア": "4",
      "イ": "5",
      "ウ": "6",
      "エ": "7",
      "オ": "8"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "kは初期値6から、各周で3、2、1、0、−1の順に変化する。k＝0の周もループ本体を一度実行して回数を数えるので、表示は5になる。",
    "choiceExplanations": {
      "ア": "四回目を終えると配列は並び替わるが、kはまだ0である。条件k≧0を満たしてもう一度外側のループに入り、交換なしで回数が増える。",
      "イ": "kは初期値6から、各周で3、2、1、0、−1の順に変化する。k＝0の周もループ本体を一度実行して回数を数えるので、表示は5になる。",
      "ウ": "最初の走査では最後の交換がi＝4で起こり、kはすぐ3になる。続く各周で2、1、0、−1に進むため、外側のループは6回に達しない。",
      "エ": "配列の要素数は7個だが、外側のループは要素を一つずつ処理する構造ではない。最後に交換した位置まで比較範囲を縮めるので、回数は5になる。",
      "オ": "外側の計数は各要素の比較回数ではなく、whileの本体を通過した回数である。最後の交換がなくk＝−1に変わった直後に終了するため、5回で止まる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q39.webp"
    ],
    "imageAltTexts": [
      "C言語のバブルソート。配列は34、25、12、22、11、64、90で、最後に交換した場所をkに記録し、外側ループの回数を表示する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q40",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "情報処理",
    "topicTags": [
      "乱数の大小比較と幾何学的確率",
      "デジタル・電気・電子区分",
      "選択A（情報工学）"
    ],
    "difficulty": 3,
    "question": "図に示すプログラムは、ある計算の近似解を求める関数をC言語で記述したものである。引数nの値を十分に大きくすると、関数fの戻り値は1/3に近づくことが分かった。㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、プログラムの動作に必要なヘッダーファイルは適切に読み込まれるものとする。なお、関数randは、0以上かつ記号定数RAND_MAX以下の疑似乱数をint型の値として返す関数である。また、記号定数RAND_MAXは、32767以上かつint型で表現可能な整数である。",
    "choices": {
      "ア": "㋐：1、㋑：3",
      "イ": "㋐：2、㋑：3",
      "ウ": "㋐：3、㋑：1",
      "エ": "㋐：3、㋑：2",
      "オ": "㋐：3、㋑：3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "二つの乱数を独立な0～1の一様乱数として近似すると、条件はy≦(2/3)xとなる。底辺1、高さ2/3の三角形の面積は1/3で、整数乱数の離散化による差を除けば戻り値はこの値に近づく。",
    "choiceExplanations": {
      "ア": "条件はy≦3xとなり、x、yを0～1の一様乱数で近似すると、正方形の中で数える領域は約5/6である。傾きが大きいので、1/3よりも広い。",
      "イ": "条件はy≦(3/2)xである。1と比べて傾きが大きく、正方形に入る領域の面積は約2/3となる。",
      "ウ": "条件はy≦x/3となり、正方形の中で数える領域は底辺1、高さ1/3の三角形である。面積は約1/6になる。",
      "エ": "二つの乱数を独立な0～1の一様乱数として近似すると、条件はy≦(2/3)xとなる。底辺1、高さ2/3の三角形の面積は1/3で、整数乱数の離散化による差を除けば戻り値はこの値に近づく。",
      "オ": "a＝bなら条件はy≦xであり、ほぼ正方形の半分を数える。整数乱数では等しい場合も含むのでわずかに増えるが、1/3からは離れている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q40.webp"
    ],
    "imageAltTexts": [
      "C言語の関数f。疑似乱数x、yを取りx/a−y/b≧0を満たす回数を数え、試行回数nで割って返す。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q41",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "立方格子のミラー指数",
      "デジタル・電気・電子区分",
      "選択B（電子工学）"
    ],
    "difficulty": 3,
    "question": "半導体材料の電気的な特性には、半導体中の原子の配列が関与しており、その原子の配列を表すのにミラー指数が使われる。図の塗りつぶし部分は、結晶中の原子配列が作り出した平面を表している。図の立方格子のミラー指数㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。なお、a1、a2、a3は基本単位格子の基本結晶軸である。",
    "choices": {
      "ア": "㋐：(110)、㋑：(½ 0 0)、㋒：(322)",
      "イ": "㋐：(110)、㋑：(200)、㋒：(322)",
      "ウ": "㋐：(110)、㋑：(200)、㋒：(233)",
      "エ": "㋐：(111)、㋑：(½ 0 0)、㋒：(322)",
      "オ": "㋐：(111)、㋑：(200)、㋒：(233)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐はa1とa2の切片が1でa3に平行なので(110)、㋑はa1の切片が1/2で他の軸に平行なので(200)である。㋒は切片3、2、2の逆数を整数比に直して(233)となる。",
    "choiceExplanations": {
      "ア": "㋐は(110)で妥当である。㋑のa1軸上の切片1/2は逆数の2にし、㋒も切片の比をそのまま使わず逆数を整数比にする。",
      "イ": "㋐と㋑は妥当である。㋒の切片はa1、a2、a3の順に3、2、2なので、逆数を6倍すると(233)になる。",
      "ウ": "㋐はa1とa2の切片が1でa3に平行なので(110)、㋑はa1の切片が1/2で他の軸に平行なので(200)である。㋒は切片3、2、2の逆数を整数比に直して(233)となる。",
      "エ": "㋐はa3軸と平行なので、第三の指数が0となる。㋑も切片1/2ではなく逆数2を用い、㋒の指数は(233)となる。",
      "オ": "㋑と㋒は妥当である。㋐はa3に平行で有限の切片を持たないので、第三の指数は1でなく0である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q41.webp"
    ],
    "imageAltTexts": [
      "基本単位格子の三軸a1、a2、a3と三つの斜線付きの平面㋐、㋑、㋒。各平面と格子軸の交点を読み取る図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q42",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "pn接合の順方向と逆方向バイアス",
      "デジタル・電気・電子区分",
      "選択B（電子工学）"
    ],
    "difficulty": 3,
    "question": "pn接合に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n図Ⅰ、Ⅱにおいてスイッチを閉じ、pn接合した半導体に電圧をかける。㋐のように電圧をかけることを順方向バイアスといい、空乏層の幅は㋑、電流が流れる。また、㋒のように電圧をかけることを逆方向バイアスといい、空乏層の幅は㋓、電流がほとんど流れない。",
    "choices": {
      "ア": "㋐：図Ⅰ、㋑：大きくなり、㋒：図Ⅱ、㋓：小さくなり",
      "イ": "㋐：図Ⅰ、㋑：小さくなり、㋒：図Ⅱ、㋓：大きくなり",
      "ウ": "㋐：図Ⅰ、㋑：小さくなり、㋒：図Ⅱ、㋓：変わらず",
      "エ": "㋐：図Ⅱ、㋑：大きくなり、㋒：図Ⅰ、㋓：小さくなり",
      "オ": "㋐：図Ⅱ、㋑：小さくなり、㋒：図Ⅰ、㋓：大きくなり"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図Ⅰはp型側が電源の正極につながるため順方向で、電位障壁が低下して空乏層が狭まる。図Ⅱは逆方向で電位障壁が上がり、空乏層は広がる。",
    "choiceExplanations": {
      "ア": "順方向が図Ⅰ、逆方向が図Ⅱという対応は妥当である。順方向では電位障壁が下がり空乏層は狭くなるので、幅の変化は逆である。",
      "イ": "図Ⅰはp型側が電源の正極につながるため順方向で、電位障壁が低下して空乏層が狭まる。図Ⅱは逆方向で電位障壁が上がり、空乏層は広がる。",
      "ウ": "図Ⅰで空乏層が狭まる点は妥当である。図Ⅱでは多数キャリアが接合部から遠ざかるため、空乏層は逆方向電圧に応じて広がる。",
      "エ": "図Ⅱで空乏層が広がるのは、n型側に正電圧をかけた逆方向バイアスだからである。順方向の図Ⅰでは空乏層は狭まり、電流が流れやすくなる。",
      "オ": "順方向で空乏層が狭まり、逆方向では広がる点は妥当である。順方向はp型側を正にする図Ⅰであり、図の順序が逆になっている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q42.webp"
    ],
    "imageAltTexts": [
      "n型が左、p型が右のpn接合を二枚示す。図Ⅰは電池の正極がp型側、図Ⅱは正極がn型側に接続される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q43",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "非反転増幅回路の電圧利得",
      "デジタル・電気・電子区分",
      "選択B（電子工学）"
    ],
    "difficulty": 3,
    "question": "図のような演算増幅器を用いた回路において、電圧vᵢₙを入力したときに出力される電圧をvₒᵤₜとする。この回路の電圧利得について、vₒᵤₜ/vᵢₙ＝20が成り立つときの抵抗値Rとして最も妥当なのはどれか。ただし、演算増幅器は理想的なものであり、演算増幅器の入力端子間の電位差はなく、各入力端子には電流が流れ込まないものとする。",
    "choices": {
      "ア": "500 Ω",
      "イ": "20 kΩ",
      "ウ": "190 kΩ",
      "エ": "200 kΩ",
      "オ": "210 kΩ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "反転入力に電流が流れず、その電位は分圧によってvₒᵤₜ×10 kΩ/(R＋10 kΩ)となる。これがvᵢₙに等しいので利得は1＋R/(10 kΩ)となり、R＝190 kΩである。",
    "choiceExplanations": {
      "ア": "R＝500 Ωの場合、10 kΩを基準にした電圧利得は1＋0.5/10＝1.05となる。入力は非反転端子に接続されているため、利得の式に1が加わる。",
      "イ": "R＝20 kΩの場合、非反転増幅回路の電圧利得は1＋20/10＝3である。20倍にするには帰還抵抗をさらに大きくする。",
      "ウ": "反転入力に電流が流れず、その電位は分圧によってvₒᵤₜ×10 kΩ/(R＋10 kΩ)となる。これがvᵢₙに等しいので利得は1＋R/(10 kΩ)となり、R＝190 kΩである。",
      "エ": "R＝200 kΩは利得をR/(10 kΩ)だけとした場合に得る値である。実際の非反転回路には1が加わり、この抵抗では21倍になる。",
      "オ": "R＝210 kΩでは電圧利得は1＋210/10＝22である。所定の20倍を得るには抵抗比R/(10 kΩ)を19にする。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q43.webp"
    ],
    "imageAltTexts": [
      "非反転入力にvᵢₙが入り、反転入力は出力との間に抵抗R、接地との間に10 kΩを持つ演算増幅器の回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-digital-q44",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "正帰還による発振の利得と位相条件",
      "デジタル・電気・電子区分",
      "選択B（電子工学）"
    ],
    "difficulty": 3,
    "question": "発振回路に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。ただし、Re( )、Im( )はそれぞれ括弧内の複素数の実部と虚部を表す。\n発振回路とは、増幅回路に特定の周波数で正帰還がかかるようにすることにより、特定の周期の信号を生成する回路である。図は、電圧増幅率A、電圧帰還率Hの正帰還回路を示している。この回路の電圧利得は、㋐となる。発振回路の発振条件は、一巡利得AHを用いて与えることができる。通常、回路にはリアクタンス成分が含まれているのでAとHは共に複素数となり、AHも複素数となる。発振条件は実部と虚部に分けることができ、実部については振幅条件といい、㋑となる。虚部については周波数条件といい、㋒となる。",
    "choices": {
      "ア": "㋐：vₒᵤₜ/vᵢₙ＝A/(1＋AH)、㋑：Re(AH)≧1、㋒：Im(AH)＝0",
      "イ": "㋐：vₒᵤₜ/vᵢₙ＝A/(1＋AH)、㋑：Re(AH)＝0、㋒：Im(AH)≧1",
      "ウ": "㋐：vₒᵤₜ/vᵢₙ＝A/(1−AH)、㋑：Re(AH)≧1、㋒：Im(AH)＝0",
      "エ": "㋐：vₒᵤₜ/vᵢₙ＝A/(1−AH)、㋑：Re(AH)≧1、㋒：Im(AH)≧1",
      "オ": "㋐：vₒᵤₜ/vᵢₙ＝A/(1−AH)、㋑：Re(AH)＝0、㋒：Im(AH)≧1"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "vₒᵤₜ＝A(vᵢₙ＋Hvₒᵤₜ)から利得はA/(1−AH)である。一巡後の位相が元に戻るにはIm(AH)＝0で、発振を始める振幅条件はRe(AH)≧1、持続する定常状態では実効的に1となる。",
    "choiceExplanations": {
      "ア": "振幅条件と周波数条件は妥当である。正帰還では出力から戻るHvₒᵤₜを入力に足すため、出力の項を左辺に移すと1−AHとなる。",
      "イ": "正帰還の分母は1−AHである。発振の周波数では一巡後の位相が元と一致するため、AHは正の実数で虚部は0となる。",
      "ウ": "vₒᵤₜ＝A(vᵢₙ＋Hvₒᵤₜ)から利得はA/(1−AH)である。一巡後の位相が元に戻るにはIm(AH)＝0で、発振を始める振幅条件はRe(AH)≧1、持続する定常状態では実効的に1となる。",
      "エ": "利得式と実部の条件は妥当である。周波数条件では帰還後の位相が元と一致する必要があるので、虚部が1以上の複素数はこの条件を満たさない。",
      "オ": "正帰還の利得式は妥当である。一巡利得が純虚数だと位相がずれて同相で帰還しないので、虚部を0とし実部を1以上にする。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007500.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-digital/q44.webp"
    ],
    "imageAltTexts": [
      "増幅器Aの出力vₒᵤₜをHで帰還し、入力vᵢₙに正符号で加える回路。"
    ]
  }
];
