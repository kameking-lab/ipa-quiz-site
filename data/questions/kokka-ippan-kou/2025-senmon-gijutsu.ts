import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_KOU_2025_SENMON_GIJUTSU: Question[] = [
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q01",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "二次方程式の判別式"
    ],
    "difficulty": 2,
    "question": "2次方程式 x²＋4kx＋3k＋1＝0 が異なる二つの実数解をもつような定数kの値の範囲として正しいのはどれか。",
    "choices": {
      "ア": "k＜1",
      "イ": "k＜−1/4、1＜k",
      "ウ": "−1/3＜k＜1/4",
      "エ": "−1/4＜k＜1",
      "オ": "−1/4＜k"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "判別式は (4k)²−4(3k＋1)＝4(4k＋1)(k−1) である。これが正なのは k＜−1/4 または k＞1 のときである。",
    "choiceExplanations": {
      "ア": "k＜1だけでは、例えばk＝0が含まれる。このとき x²＋1＝0 には実数解がない。",
      "イ": "判別式は (4k)²−4(3k＋1)＝4(4k＋1)(k−1) である。これが正なのは k＜−1/4 または k＞1 のときである。",
      "ウ": "この区間にはk＝0も含まれるが、この場合に判別式は−4になる。正の判別式が必要なので条件に合わない。",
      "エ": "−1/4＜k＜1の区間では判別式の二つの因子が異符号になる。その区間では実数解をもたない。",
      "オ": "k＞−1/4でも、例えばk＝1では判別式が0になる。二つの異なる解をもつには判別式が正でなければならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q02",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "円の平行移動"
    ],
    "difficulty": 2,
    "question": "図のような円 x²＋y²＝9 をx軸方向に＋1だけ平行移動させたとき、直線 x＝1 との二つの交点間の距離はいくらか。",
    "choices": {
      "ア": "3",
      "イ": "2√2",
      "ウ": "2√5",
      "エ": "4√2",
      "オ": "6"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "移動後の円は (x−1)²＋y²＝9 である。x＝1での交点は(1, ±3)なので、距離は6になる。",
    "choiceExplanations": {
      "ア": "3は円の半径である。直線は移動後の円の中心を通るため、求めるのは半径の2倍である。",
      "イ": "移動後の円にx＝1を代入すると y²＝9 である。交点のy座標の差は2√2にはならない。",
      "ウ": "移動後も半径は3である。中心を通る直線で切るため、交点間の距離は直径になる。",
      "エ": "4√2は元の円にx＝1を代入したときの交点間の距離である。求めるには、平行移動後の中心が(1, 0)に来ることを反映する。",
      "オ": "移動後の円は (x−1)²＋y²＝9 である。x＝1での交点は(1, ±3)なので、距離は6になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q02.webp"
    ],
    "imageAltTexts": [
      "原点を中心とする円と、直線x＝1。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q03",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "長方形と三角形の面積"
    ],
    "difficulty": 2,
    "question": "図のように、長方形ABCDの内部に点Pがあるとき、三角形PCDの面積はいくらか。\nただし、三角形PAB、三角形PBC、三角形PDAの面積は、それぞれ21、24、12とする。",
    "choices": {
      "ア": "11",
      "イ": "12",
      "ウ": "13",
      "エ": "14",
      "オ": "15"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "向かい合う辺を底辺とする三角形の面積の和は、高さの和が対辺間の距離になるため、どちらの組でも長方形の半分である。よってPCDの面積は24＋12−21＝15である。",
    "choiceExplanations": {
      "ア": "対辺AB、CDを底辺とする二つの三角形の面積の和は、長方形の半分の36である。PCDを11とすると21との和は32にしかならない。",
      "イ": "12はPDAの面積である。PCDと対をなすPABとの面積の和は36なので、PCDは12ではない。",
      "ウ": "PCDを13とすると、これとPABの面積の和は34となる。PBCとPDAの面積の和36と一致していない。",
      "エ": "ABとCDを底辺とする三角形の面積の和は、BCとDAを底辺とする三角形の面積の和に等しい。PCDを14とすると和が35となるため合わない。",
      "オ": "向かい合う辺を底辺とする三角形の面積の和は、高さの和が対辺間の距離になるため、どちらの組でも長方形の半分である。よってPCDの面積は24＋12−21＝15である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q03.webp"
    ],
    "imageAltTexts": [
      "長方形の4頂点を内部の点Pと結んだ図。三角形PAB、PBC、PDAの面積はそれぞれ21、24、12。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q04",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "三角形の重心"
    ],
    "difficulty": 2,
    "question": "三角形ABCの重心を点Gとする。三角形ABCの各頂点とGを通る各直線が、三角形ABCの辺AB、BC、CAと交わる点をそれぞれD、E、Fとするとき、次の記述㋐～㋓のうち、常に成り立つもののみを挙げているのはどれか。\n㋐ D、E、FはそれぞれAB、BC、CAの中点である。\n㋑ GはAE、BF、CDをそれぞれ2：1に内分する。\n㋒ AE、BF、CDはそれぞれ∠CAB、∠ABC、∠BCAの二等分線である。\n㋓ GA、GB、GCは互いに長さが等しい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "重心は、各頂点と対辺の中点を結ぶ三本の中線の交点である。中線は頂点側が2となる2：1の比で重心により分けられる。",
    "choiceExplanations": {
      "ア": "重心は、各頂点と対辺の中点を結ぶ三本の中線の交点である。中線は頂点側が2となる2：1の比で重心により分けられる。",
      "イ": "対辺上の交点は各辺の中点になるので㋐は正しい。中線が角の二等分線になるのは特別な場合で、㋒は常には成り立たない。",
      "ウ": "㋐は重心の定義から成り立つ。三頂点からの距離が等しいのは外心の性質であり、㋓は重心には一般化できない。",
      "エ": "㋑の内分比は正しい。内心を通る角の二等分線とは異なり、中線が常に頂点の角を二等分するわけではない。",
      "オ": "㋑は妥当だが、重心と各頂点の距離が等しいのは一般の三角形では成り立たない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q04.webp"
    ],
    "imageAltTexts": [
      "三角形ABCの各頂点と重心Gを通る直線と、辺との交点D、E、F。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q05",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "導関数と二次方程式"
    ],
    "difficulty": 2,
    "question": "関数 f(x)＝x²＋1 の導関数を f′(x) とするとき、f(a)＝f′(a) を満たすaの値はいくらか。",
    "choices": {
      "ア": "−2",
      "イ": "−1",
      "ウ": "0",
      "エ": "1",
      "オ": "2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "f′(a)＝2aなので、条件は a²＋1＝2a となる。移項して (a−1)²＝0 より a＝1 である。",
    "choiceExplanations": {
      "ア": "a＝−2では f(a)＝5、f′(a)＝−4 となり、二つは一致しない。",
      "イ": "a＝−1では f(a)＝2 に対し、f′(a)＝−2 である。",
      "ウ": "a＝0では関数値が1、導関数の値が0になる。等しい値にはならない。",
      "エ": "f′(a)＝2aなので、条件は a²＋1＝2a となる。移項して (a−1)²＝0 より a＝1 である。",
      "オ": "a＝2では f(a)＝5、f′(a)＝4 であり、一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q06",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "三次関数の極小値"
    ],
    "difficulty": 2,
    "question": "関数 f(x)＝2x³−9x²＋12x−3 の極小値はいくらか。",
    "choices": {
      "ア": "1",
      "イ": "2",
      "ウ": "3",
      "エ": "4",
      "オ": "5"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "f′(x)＝6(x−1)(x−2) はx＝2の前後で負から正に変わる。x＝2で極小となり、f(2)＝1である。",
    "choiceExplanations": {
      "ア": "f′(x)＝6(x−1)(x−2) はx＝2の前後で負から正に変わる。x＝2で極小となり、f(2)＝1である。",
      "イ": "2は極小となるx座標である。極小値はそのxを元の関数に代入した値である。",
      "ウ": "極小の条件を満たす位置はx＝2である。そこでは16−36＋24−3＝1となり、3ではない。",
      "エ": "x＝1では導関数が正から負に変化するので、そのときのf(1)＝2は極大値である。極小値はもう一つの停留点で求める。",
      "オ": "定数項も含めてf(2)を計算すると1になる。導関数が0となる位置と、そこでの関数値は区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q07",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "対称な区間での定積分"
    ],
    "difficulty": 2,
    "question": "次の定積分の値はいくらか。\n∫［−2, 2］(4x³＋6x²−2x−3) dx",
    "choices": {
      "ア": "8",
      "イ": "12",
      "ウ": "16",
      "エ": "20",
      "オ": "24"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "対称区間で4x³と−2xの積分は0である。残りは [2x³−3x] を−2から2まで評価して20となる。",
    "choiceExplanations": {
      "ア": "奇関数の二項は相殺されるが、6x²の積分は32、定数項の積分は−12である。合計は8にならない。",
      "イ": "12は定数項の積分の絶対値である。正の6x²の積分を含める必要がある。",
      "ウ": "16は0から2までの6x²の積分である。負の側の同じ積分を加え、定数項の寄与も引く。",
      "エ": "対称区間で4x³と−2xの積分は0である。残りは [2x³−3x] を−2から2まで評価して20となる。",
      "オ": "定数項−3を区間全体で積分すると−12になる。6x²の積分32にこれを加え、24ではなく20を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q08",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "放物線と座標軸が囲む面積"
    ],
    "difficulty": 2,
    "question": "曲線 y＝x²−6x＋9 とx軸、y軸で囲まれた図形の面積はいくらか。",
    "choices": {
      "ア": "9",
      "イ": "10",
      "ウ": "11",
      "エ": "12",
      "オ": "13"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "曲線は y＝(x−3)² なので、囲まれた部分はx＝0から3までである。この区間で積分すると [x³/3−3x²＋9x] の差は9となる。",
    "choiceExplanations": {
      "ア": "曲線は y＝(x−3)² なので、囲まれた部分はx＝0から3までである。この区間で積分すると [x³/3−3x²＋9x] の差は9となる。",
      "イ": "x軸と接する点がx＝3なので、積分区間の右端はそこになる。その範囲での積分は10ではない。",
      "ウ": "三項を積分するとx＝3で9−27＋27となる。x＝0での値0を引くため、11にはならない。",
      "エ": "x＝3では−6xから来る積分値−27と定数項から来る27が相殺される。残るのはx²を積分した9である。",
      "オ": "図の領域全体では、x＝0から3まで曲線の高さが非負である。その面積は積分値9と等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q08.webp"
    ],
    "imageAltTexts": [
      "放物線とx軸、y軸で囲まれた部分。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q09",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "円順列"
    ],
    "difficulty": 2,
    "question": "図のように、円形のテーブルと四つの椅子があり、A、B、C、Dの4人がテーブルを囲んでいずれかの椅子に座る。A、Bは男性であり、C、Dは女性である。同性が隣り合うことのない座り方は何通りあるか。\nただし、回転して並びが同じになるものは同じ座り方とする。",
    "choices": {
      "ア": "1通り",
      "イ": "2通り",
      "ウ": "3通り",
      "エ": "4通り",
      "オ": "5通り"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "回転による重複を除くためAを固定すると、Bはその向かいに決まる。CとDの席に2通りあり、どちらも条件を満たす。",
    "choiceExplanations": {
      "ア": "Aを一つの席に固定するとBは正面に来る。CとDを交換した並びは回転で一致しないので、1通りではない。",
      "イ": "回転による重複を除くためAを固定すると、Bはその向かいに決まる。CとDの席に2通りあり、どちらも条件を満たす。",
      "ウ": "Aを固定すると、同性が隣り合わないためのBの位置は正面だけである。Bに三つの位置があると数えると条件に反する。",
      "エ": "AとBの席を選ぶ向きの違いは、回転して同じなら区別しない。Aを固定すれば、残るのはCとDの交換だけである。",
      "オ": "男女が交互になる以外の並びは条件から外れる。Aを固定した後はBが正面に決まり、残る二席にはCとDが入る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q09.webp"
    ],
    "imageAltTexts": [
      "円形のテーブルの周りに並んだ4脚の椅子。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q10",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "対数の性質"
    ],
    "difficulty": 2,
    "question": "次の㋐、㋑、㋒のうち、log₂10 と等しいもののみを全て挙げているのはどれか。\n㋐ (log₂2)(log₂5)\n㋑ 1＋log₂5\n㋒ 1/log₁₀2",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "積の対数の法則により log₂10＝log₂2＋log₂5＝1＋log₂5 になる。底を10に変換しても log₂10＝log₁₀10/log₁₀2＝1/log₁₀2 である。",
    "choiceExplanations": {
      "ア": "㋐ではlog₂2＝1なので積はlog₂5である。求めるlog₂10より1だけ小さい。",
      "イ": "㋑は積の対数の法則から妥当である。㋐は対数同士を掛けており、log₂(2×5)にはならない。",
      "ウ": "㋑は妥当であるが、底の変換を使うと㋒もlog₂10と等しい。",
      "エ": "積の対数の法則により log₂10＝log₂2＋log₂5＝1＋log₂5 になる。底を10に変換しても log₂10＝log₁₀10/log₁₀2＝1/log₁₀2 である。",
      "オ": "㋒は底の変換から妥当である。㋑も2と5の積の対数を和に直した値なので含める必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q11",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "相対速度"
    ],
    "difficulty": 2,
    "question": "相対速度に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「水平な地面の上を西向きに80 km/hの速さで進むトラックの荷台から、東向き水平方向に100 km/hでボールを放つ。このとき、地面に静止している人から見えるボールの速度は、［㋐］km/hである。また、東向きに40 km/hで進む自動車に乗っている人から見えるボールの速度は、［㋑］km/hである。」",
    "choices": {
      "ア": "東向きに20、東向きに20",
      "イ": "東向きに20、0",
      "ウ": "東向きに20、西向きに20",
      "エ": "西向きに20、東向きに20",
      "オ": "西向きに20、西向きに20"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "東を正にとれば、ボールの対地速度は−80＋100＝20 km/hである。そこから自動車の速度40 km/hを引くと−20 km/h、すなわち西向き20 km/hとなる。",
    "choiceExplanations": {
      "ア": "地面から見るとボールは東向きに20 km/hで進む。東向きに40 km/hで動く自動車から見ると、ボールは西向きに動くように見える。",
      "イ": "地面からのボールの速度20 km/hと自動車の速度40 km/hは等しくない。よって自動車に対する相対速度は0にならない。",
      "ウ": "東を正にとれば、ボールの対地速度は−80＋100＝20 km/hである。そこから自動車の速度40 km/hを引くと−20 km/h、すなわち西向き20 km/hとなる。",
      "エ": "ボールがトラックに対して東へ進む速さは、トラックの西向きの速さより大きい。地面から見た進行方向も東になる。",
      "オ": "自動車から西向きに見える点は合っている。地面からは100−80＝20 km/hの東向きに見える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q12",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "摩擦と運動エネルギー"
    ],
    "difficulty": 2,
    "question": "図のように、質量mの小球が滑らかな床の上（区間A）を速さVで進んだ後、粗い床の上（区間B）を進み、その後、滑らかな床の上（区間C）を進む。区間Cでの小球の速さがvであるとき、区間Bで失われた運動エネルギーとして最も妥当なのはどれか。",
    "choices": {
      "ア": "mV−mv",
      "イ": "mV＋mv",
      "ウ": "mV²/2",
      "エ": "mV²/2−mv²/2",
      "オ": "mV²/2＋mv²/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "A・Cは滑らかなので、Bの手前と通過後の速さはそれぞれV、vである。摩擦で失われたエネルギーは、通過前の運動エネルギーから通過後の値を引いたものである。",
    "choiceExplanations": {
      "ア": "mVとmvは運動量である。運動エネルギーを比較するには速さの二乗を使う。",
      "イ": "二つの運動量を足しても、摩擦で失われたエネルギーは得られない。入り口と出口の運動エネルギーの差が求める量である。",
      "ウ": "この値はBに入るときの運動エネルギー全体である。Bを出てからも速さvがあるため、その運動エネルギーを引く。",
      "エ": "A・Cは滑らかなので、Bの手前と通過後の速さはそれぞれV、vである。摩擦で失われたエネルギーは、通過前の運動エネルギーから通過後の値を引いたものである。",
      "オ": "通過後に残るエネルギーは、通過前の値に足すのではなく引く。求めるのは減少量である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q12.webp"
    ],
    "imageAltTexts": [
      "滑らかな区間A、粗い区間B、滑らかな区間Cの順に小球が進む図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q13",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "力学的エネルギー保存"
    ],
    "difficulty": 2,
    "question": "図のように、滑らかな円弧状のレールが水平な床に固定されている。レールの左端A及び右端Bの床からの高さはそれぞれh₁、h₂である。小球をAで静かに放したところ、小球はBから飛び出した。このとき、小球がBから飛び出した瞬間の速さとして最も妥当なのはどれか。\nただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "√{g(h₁−h₂)}",
      "イ": "√{g(h₁＋h₂)}",
      "ウ": "√{2g(h₁−h₂)}",
      "エ": "√{2g(h₁＋h₂)}",
      "オ": "2√{g(h₁−h₂)}"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "滑らかなレールでは力学的エネルギーが保存される。位置エネルギーの減少mg(h₁−h₂)をmv²/2に等置すると求める速さになる。",
    "choiceExplanations": {
      "ア": "高さの差を使う点は正しいが、運動エネルギーには係数1/2がある。速さを解くと根号内の係数は2gとなる。",
      "イ": "位置エネルギーの減少を決めるのは高さの和ではなく差である。Bでも床からh₂だけ高いことを考慮する。",
      "ウ": "滑らかなレールでは力学的エネルギーが保存される。位置エネルギーの減少mg(h₁−h₂)をmv²/2に等置すると求める速さになる。",
      "エ": "運動エネルギーに変わるのは、AとBの位置エネルギーの差だけである。h₂をh₁に足すことはできない。",
      "オ": "根号の外にある2を根号内へ移すと4となる。エネルギー保存から得られる根号内の係数は4gではなく2gである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q13.webp"
    ],
    "imageAltTexts": [
      "左端Aと右端Bの高さが異なる滑らかな円弧状のレール。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q14",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "遠心力とコリオリの力"
    ],
    "difficulty": 2,
    "question": "円運動と慣性力に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「中心を軸に一定の速さで回転している円板と、この円板に置かれている物体を考える。この円板に乗って物体と一緒に等速円運動をしている観測者から見たとき、円板の中心から遠ざかる向きに物体にはたらく慣性力を［㋐］という。また、この円板に乗って等速円運動をしている観測者から見て速度をもつ物体には、転向力（コリオリの力）と呼ばれる慣性力がはたらく。図Ⅰのように、中心を軸に回転できる円板を一定の速さで回転させながら、中心から円周に向かって一定の速度で直線状にペンを動かして引いた線は［㋑］のようになり、円板上にいる観測者から見ると、ペンにはペンの進行方向に対して［㋒］向きに力がはたらいたように見える。」",
    "choices": {
      "ア": "遠心力、図Ⅱ、右",
      "イ": "遠心力、図Ⅱ、左",
      "ウ": "遠心力、図Ⅲ、右",
      "エ": "向心力、図Ⅱ、右",
      "オ": "向心力、図Ⅲ、左"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "回転する観測者から見た外向きの慣性力を遠心力と呼ぶ。図Ⅰの回転方向では、円板に対して右へ進み始めるペンは左へ曲がるので、図Ⅱになる。",
    "choiceExplanations": {
      "ア": "中心から外向きの慣性力は遠心力である。図Ⅰで円板が時計回りに回るため、円板上ではペンの進行方向は左へそれる。",
      "イ": "回転する観測者から見た外向きの慣性力を遠心力と呼ぶ。図Ⅰの回転方向では、円板に対して右へ進み始めるペンは左へ曲がるので、図Ⅱになる。",
      "ウ": "遠心力という名称は合っているが、外向きに動かし続けるペンの軌跡は途中で閉じた輪を作らない。図Ⅱのように左へ湾曲する。",
      "エ": "向心力は物体を円運動させるために中心へ向かう力である。設問の外向きの慣性力は遠心力と呼ぶ。",
      "オ": "外向きに見える慣性力の名称は遠心力である。中心から半径方向に進むペンが描く線は図Ⅱのように左へ曲がる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q14.webp"
    ],
    "imageAltTexts": [
      "回転する円板上でペンを動かす図Ⅰと、描かれる線の候補の図Ⅱ・図Ⅲ。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q15",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "等温変化とボイルの法則"
    ],
    "difficulty": 2,
    "question": "圧力が1.0×10⁵ Paのときに、体積が7.0 m³になる理想気体がある。この理想気体の温度を一定に保ちながら、圧力を1.4×10⁵ Paにしたときの理想気体の体積として最も妥当なのはどれか。",
    "choices": {
      "ア": "2.0 m³",
      "イ": "5.0 m³",
      "ウ": "7.0 m³",
      "エ": "9.8 m³",
      "オ": "14 m³"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "温度と気体の量が一定なので圧力と体積の積は一定である。圧力が1.4倍になると体積は1/1.4倍となり、7.0/1.4＝5.0 m³になる。",
    "choiceExplanations": {
      "ア": "等温変化では圧力と体積の積が変わらない。1.4×10⁵ Paと2.0 m³の積は、初めの状態の積より小さい。",
      "イ": "温度と気体の量が一定なので圧力と体積の積は一定である。圧力が1.4倍になると体積は1/1.4倍となり、7.0/1.4＝5.0 m³になる。",
      "ウ": "7.0 m³は変化前の体積である。温度一定の下で圧力を上げるには、体積を小さくする。",
      "エ": "9.8 m³は体積を圧力と同じ比率で増やした値である。一定温度では圧力と体積が反比例する。",
      "オ": "圧力が増加したので、体積は7.0 m³から減少する。増加を示す14 m³は等温変化に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q16",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "スネルの法則"
    ],
    "difficulty": 2,
    "question": "図のように、絶対屈折率がnの物質中から、絶対屈折率が1の空気に向かって、入射角45°で光を入射させたところ、屈折角が60°となった。nの値として最も妥当なのはどれか。",
    "choices": {
      "ア": "√3/2",
      "イ": "√6/2",
      "ウ": "√2",
      "エ": "√3",
      "オ": "6"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "スネルの法則により n sin 45°＝1×sin 60° である。よって n＝(√3/2)/(√2/2)＝√6/2 となる。",
    "choiceExplanations": {
      "ア": "√3/2はsin 60°の値である。屈折率はこの値をさらにsin 45°で割って求める。",
      "イ": "スネルの法則により n sin 45°＝1×sin 60° である。よって n＝(√3/2)/(√2/2)＝√6/2 となる。",
      "ウ": "√2はsin 45°の逆数である。この逆数には屈折角60°の正弦を掛ける必要がある。",
      "エ": "両側で屈折率と角の正弦の積が等しくなる。sin 60°をsin 45°で割っても√3にはならない。",
      "オ": "屈折率は角度の大きさそのものではなく、角度の正弦の比を用いる。60°と45°の正弦の比は1と2の間にある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q16.webp"
    ],
    "imageAltTexts": [
      "絶対屈折率nの物質から屈折率1の空気への光の進行。入射角45度、屈折角60度。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q17",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "並列回路とオームの法則"
    ],
    "difficulty": 2,
    "question": "図のような回路において、電源の電圧Vと、2 Ωの抵抗に流れる電流の大きさIの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "6.6 V、5 A",
      "イ": "6.6 V、10 A",
      "ウ": "10 V、5 A",
      "エ": "10 V、10 A",
      "オ": "20 V、10 A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "並列回路なので両方の抵抗に同じ電圧がかかる。1 Ωに10 Aが流れているので V＝10 V、2 Ω側は I＝10/2＝5 Aである。",
    "choiceExplanations": {
      "ア": "2 Ωを流れる5 Aは妥当である。両抵抗の電圧は共通で、1 Ωに10 Aが流れるので電源電圧は10 Vとなる。",
      "イ": "1 Ω側の電流を合成抵抗に掛けても電源電圧は求められない。2 Ω側と1 Ω側の電流も同じではない。",
      "ウ": "並列回路なので両方の抵抗に同じ電圧がかかる。1 Ωに10 Aが流れているので V＝10 V、2 Ω側は I＝10/2＝5 Aである。",
      "エ": "電圧10 Vは妥当である。抵抗が2倍の枝に流れる電流は、1 Ωの枝の半分の5 Aになる。",
      "オ": "20 Vなら1 Ω側に20 Aが流れてしまう。図に示された10 Aの条件に反する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q17.webp"
    ],
    "imageAltTexts": [
      "1 Ωと2 Ωの抵抗が並列の回路。1 Ωの枝に10 Aが流れる。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q18",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "必須問題",
      "二進数と八進数"
    ],
    "difficulty": 2,
    "question": "2進数で表された10110＋1010の計算結果を、8進数で表したものとして正しいのはどれか。",
    "choices": {
      "ア": "32",
      "イ": "34",
      "ウ": "36",
      "エ": "40",
      "オ": "42"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "二進数で足すと100000₂になる。右から3桁ずつ100、000と区切って八進数に直すと40になる。",
    "choiceExplanations": {
      "ア": "32は和を十進数で表した値である。八進数では十進数の32を4×8＋0と表す。",
      "イ": "八進数の34は十進数の28である。10110₂と1010₂の和は十進数の32となる。",
      "ウ": "八進数の36は十進数の30である。計算した和の十進数32には一致しない。",
      "エ": "二進数で足すと100000₂になる。右から3桁ずつ100、000と区切って八進数に直すと40になる。",
      "オ": "八進数の42は十進数の34を表す。二進数の加算結果は32なので、一の位は0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q19",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "必須問題",
      "フローチャート"
    ],
    "difficulty": 2,
    "question": "図のフローチャートを実行したとき、出力されるiの値はいくらか。",
    "choices": {
      "ア": "1",
      "イ": "3",
      "ウ": "5",
      "エ": "7",
      "オ": "9"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "xは20→10→5→6→3→4→2→1と変わる。iはxを2で割るときだけ増えるので、出力は5である。",
    "choiceExplanations": {
      "ア": "最初にxを20から10へ半分にした段階ではi＝1だが、まだx＝1ではない。処理は続く。",
      "イ": "三度目にiが増えたときのxは3である。さらに奇数分岐と二度の偶数分岐を経て終了する。",
      "ウ": "xは20→10→5→6→3→4→2→1と変わる。iはxを2で割るときだけ増えるので、出力は5である。",
      "エ": "終了までxは7回更新されるが、奇数に1を加える2回ではiを増やさない。7は全更新回数であり、出力にはならない。",
      "オ": "x＝1になったところで反復は終わる。偶数分岐を通る回数は5回であり、それ以降はiに加算されない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q19.webp"
    ],
    "imageAltTexts": [
      "xを20、iを0で初期化し、偶数かどうかで処理を分けるフローチャート。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q20",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "必須問題",
      "論理回路の等価変換"
    ],
    "difficulty": 2,
    "question": "図のような入力X、Y、出力Zの論理回路と等価な回路は次のうちではどれか。\nなお、表はAND回路、OR回路、NOT回路の図記号と真理値表である。",
    "choices": {
      "ア": "図1の回路",
      "イ": "図2の回路",
      "ウ": "図3の回路",
      "エ": "図4の回路",
      "オ": "図5の回路"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "左上で A＝¬(X∨Y)、左下で B＝¬X∧Y を得る。最終出力 A∨¬(A∨B) はBが0のときだけ1になり、X∨¬Yと等しい。",
    "choiceExplanations": {
      "ア": "AND回路は(0, 0)を入力すると0を出力するが、設問の回路はこの入力で1を出力する。",
      "イ": "OR回路は(0, 1)を入力すると1になる。設問の回路では下側のANDの結果が1になるため、最終出力は0である。",
      "ウ": "NAND回路は(1, 1)で0を出力する。設問の回路は(1, 1)で最終段直前のNOTが1を出すため、最終出力も1である。",
      "エ": "この回路の出力は ¬X∧Y である。設問の出力は、例えば(0, 1)で0になるため、同じではない。",
      "オ": "左上で A＝¬(X∨Y)、左下で B＝¬X∧Y を得る。最終出力 A∨¬(A∨B) はBが0のときだけ1になり、X∨¬Yと等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q20.webp"
    ],
    "imageAltTexts": [
      "入力X、Y、出力Zの論理回路と、AND・OR・NOTの図記号、真理値表。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q20-1.webp",
      "イ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q20-2.webp",
      "ウ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q20-3.webp",
      "エ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q20-4.webp",
      "オ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q20-5.webp"
    }
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q21",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択A（電気・情報系）",
      "対称な回路"
    ],
    "difficulty": 2,
    "question": "図のような回路において、中央の導線に流れる電流の大きさIとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0.50 A",
      "イ": "0.67 A",
      "ウ": "1.0 A",
      "エ": "1.3 A",
      "オ": "2.0 A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "左右の枝は対称で、それぞれI/2を供給する。片側の電源と中央の抵抗を一周すると 10＝10(I/2)＋5I なので I＝1.0 Aである。",
    "choiceExplanations": {
      "ア": "0.50 Aは左右の10 Ωの枝それぞれから中央に向かう電流である。中央は両方から電流を受けるので、その2倍になる。",
      "イ": "中央を流れる電流を求めるとき、左右の電源を直列に足すことはできない。同じ10 Vで内部に10 Ωを持つ二つの枝を並列に合わせると、等価な抵抗は5 Ωになる。",
      "ウ": "左右の枝は対称で、それぞれI/2を供給する。片側の電源と中央の抵抗を一周すると 10＝10(I/2)＋5I なので I＝1.0 Aである。",
      "エ": "I＝1.3 Aなら中央の電圧は6.5 Vとなる。左右から0.35 Aずつしか流れ込まず、中央の電流と一致しない。",
      "オ": "2.0 Aなら中央の抵抗だけで10 Vの電圧降下が生じる。左右の10 Ωの抵抗に電流を流すにはそれらの電圧降下も必要なので、この値ではつり合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q21.webp"
    ],
    "imageAltTexts": [
      "左右に10 Ωの抵抗と10 Vの電源、中央に5 Ωの抵抗がある回路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q22",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択A（電気・情報系）",
      "並列回路の電力"
    ],
    "difficulty": 2,
    "question": "図のような回路において、6 Ωの抵抗で消費される電力が24 Wであるとき、2 Ωの抵抗で消費される電力として最も妥当なのはどれか。",
    "choices": {
      "ア": "8 W",
      "イ": "24 W",
      "ウ": "48 W",
      "エ": "72 W",
      "オ": "216 W"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "並列の両抵抗には同じ電圧がかかり、P＝V²/Rである。抵抗が3分の1になるので消費電力は3倍の72 Wになる。",
    "choiceExplanations": {
      "ア": "8 Wは電流が同じとして抵抗に比例させた値である。この回路では二つの抵抗の電圧が同じなので、電力は抵抗値に反比例する。",
      "イ": "同じ電圧であっても抵抗値が異なるため、電力は等しくならない。2 Ωの抵抗には6 Ωより大きな電流が流れる。",
      "ウ": "抵抗値の比は6：2なので、同一電圧での消費電力の比は1：3である。2 Ωの電力は24 Wの2倍ではない。",
      "エ": "並列の両抵抗には同じ電圧がかかり、P＝V²/Rである。抵抗が3分の1になるので消費電力は3倍の72 Wになる。",
      "オ": "2 Ωでは電流が6 Ωの3倍になるが、電力はその電流と同じ電圧の積である。電力の比を9倍にはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q22.webp"
    ],
    "imageAltTexts": [
      "2 Ωと6 Ωの抵抗を並列に接続した回路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q23",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択A（電気・情報系）",
      "コンデンサの直列・並列"
    ],
    "difficulty": 2,
    "question": "図のようにコンデンサを接続したときの合成静電容量として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.7 μF",
      "イ": "1.4 μF",
      "ウ": "2.1 μF",
      "エ": "2.8 μF",
      "オ": "3.5 μF"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "下の0.5 μFと2 μFは直列なので、合成容量は逆数の和の逆数で0.4 μFになる。上の1 μFと並列なので足して1.4 μFである。",
    "choiceExplanations": {
      "ア": "上の1 μFの枝と下の枝は並列である。合成容量が上の枝の1 μFより小さくなることはない。",
      "イ": "下の0.5 μFと2 μFは直列なので、合成容量は逆数の和の逆数で0.4 μFになる。上の1 μFと並列なので足して1.4 μFである。",
      "ウ": "直列の下の枝の容量は、枝の最小である0.5 μFより小さくなる。上の1 μFを加えても2.1 μFには届かない。",
      "エ": "下の二つは互いに直列で、上の1 μFの枝とのみ並列になる。下の枝を合成する段階で容量を単純に合計してはいけない。",
      "オ": "3.5 μFは三つを全て並列として加えた容量である。下の枝の0.5 μFと2 μFは直列である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q23.webp"
    ],
    "imageAltTexts": [
      "上の枝は1 μF、下の枝は0.5 μFと2 μFの直列のコンデンサ回路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q24",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択A（電気・情報系）",
      "RL直列回路"
    ],
    "difficulty": 2,
    "question": "図のような、角周波数ω、電圧（実効値）65 Vの正弦波交流電源に、抵抗値5 Ωの抵抗と、自己インダクタンス0.04 Hのコイルを直列に接続した回路がある。この回路に流れる電流（実効値）が5 Aであるとき、ωとして最も妥当なのはどれか。",
    "choices": {
      "ア": "300 rad/s",
      "イ": "350 rad/s",
      "ウ": "400 rad/s",
      "エ": "450 rad/s",
      "オ": "500 rad/s"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "実効値の比からインピーダンスの大きさは65/5＝13 Ωである。抵抗とリアクタンスが直交するので ωL＝√(13²−5²)＝12 Ω、よって ω＝300 rad/sとなる。",
    "choiceExplanations": {
      "ア": "実効値の比からインピーダンスの大きさは65/5＝13 Ωである。抵抗とリアクタンスが直交するので ωL＝√(13²−5²)＝12 Ω、よって ω＝300 rad/sとなる。",
      "イ": "350 rad/sならリアクタンスは14 Ωである。抵抗を含むインピーダンスが必要な13 Ωより大きくなる。",
      "ウ": "400 rad/sならリアクタンスは16 Ωである。実効電流が5 Aとなるために必要な12 Ωを超えている。",
      "エ": "抵抗とリアクタンスを二乗和で合わせると必要なリアクタンスは12 Ωである。450 rad/sで得る18 Ωでは電流が5 Aより小さくなる。",
      "オ": "500 rad/sではリアクタンスが20 Ωとなる。この値では抵抗分を考える前から、必要なインピーダンス13 Ωを超える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q24.webp"
    ],
    "imageAltTexts": [
      "実効値65 Vの交流電源と5 Ωの抵抗、0.04 Hのコイルの直列回路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q25",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択A（電気・情報系）",
      "三相交流のスター結線"
    ],
    "difficulty": 2,
    "question": "図のような三相交流回路において、各相の負荷が抵抗値10 Ωの抵抗で、線間電圧の大きさが173 Vであるとき、線電流の大きさI_lとして最も妥当なのはどれか。\nただし、√3＝1.73とする。",
    "choices": {
      "ア": "10.0 A",
      "イ": "13.3 A",
      "ウ": "17.3 A",
      "エ": "26.7 A",
      "オ": "30.0 A"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "スター結線で抵抗一つにかかる相電圧は線間電圧を√3で割った100 Vである。線電流と相電流は同じなので100/10＝10.0 Aになる。",
    "choiceExplanations": {
      "ア": "スター結線で抵抗一つにかかる相電圧は線間電圧を√3で割った100 Vである。線電流と相電流は同じなので100/10＝10.0 Aになる。",
      "イ": "抵抗にかかる相電圧を求めるときは、線間電圧を√3で割る。相電圧は133 Vにはならない。",
      "ウ": "この値は線間電圧173 Vをそのまま相負荷10 Ωで割ったものである。スター結線では各負荷にかかる電圧は100 Vである。",
      "エ": "三つの相負荷は共通点につながっているが、線電流は対応する相負荷の電流である。複数の相の電流をスカラーとして足す必要はない。",
      "オ": "10.0 Aの相電流を三相分足しても、一本の線に流れる電流にはならない。スター結線では線電流は各相の電流に等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q25.webp"
    ],
    "imageAltTexts": [
      "各線間が173 Vで、10 Ωの三つの負荷をスター結線した回路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q26",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "選択A（電気・情報系）",
      "半導体の多数キャリア"
    ],
    "difficulty": 2,
    "question": "半導体に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ シリコンの真性半導体の中に価電子の数が3個の原子をごく少量混ぜ合わせて結晶をつくると、n形半導体となる。\n㋑ n形半導体の多数キャリヤは電子である。\n㋒ バイポーラトランジスタは、電子と正孔のいずれか一方のみによって動作する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "n形の多数キャリヤは電子であり、㋑が正しい。価電子3個の不純物を入れたシリコンはp形となり、バイポーラトランジスタには電子と正孔が関与する。",
    "choiceExplanations": {
      "ア": "価電子が3個の不純物をシリコンに加えると正孔ができる。得られるのはp形である。",
      "イ": "n形の多数キャリヤが電子である点は正しい。㋐は、価電子3個の不純物がもたらすp形とn形を取り違えている。",
      "ウ": "価電子3個の不純物はアクセプタとして働くので㋐は誤りである。バイポーラトランジスタの動作には電子と正孔の両方が関わるため、㋒も誤りである。",
      "エ": "n形の多数キャリヤは電子であり、㋑が正しい。価電子3個の不純物を入れたシリコンはp形となり、バイポーラトランジスタには電子と正孔が関与する。",
      "オ": "多数キャリヤについての㋑は正しい。㋒は電子と正孔のどちらか一方だけとする点がバイポーラの性質と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q27",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "選択A（電気・情報系）",
      "ダイオードの半波整流"
    ],
    "difficulty": 2,
    "question": "図Ⅰに示す回路において、電源電圧v_inが図Ⅱのように時間変化するとき、電流iの時間変化の概形として最も妥当なのはどれか。\nただし、ダイオードの特性は理想的であるとする。",
    "choices": {
      "ア": "図1の波形",
      "イ": "図2の波形",
      "ウ": "図3の波形",
      "エ": "図4の波形",
      "オ": "図5の波形"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "電圧が正の半周期にはダイオードが順方向となり、電流は正の半波になる。負の半周期には逆方向となり、電流は0である。",
    "choiceExplanations": {
      "ア": "この波形では負の半周期にも逆向きの電流が流れる。理想ダイオードは逆方向の電流を流さない。",
      "イ": "初めの半周期では図の矢印方向に電流が流れる。位相を反転させ、初めに負の電流とするのは誤りである。",
      "ウ": "電圧が正の半周期にはダイオードが順方向となり、電流は正の半波になる。負の半周期には逆方向となり、電流は0である。",
      "エ": "初めの正の半周期にダイオードが導通し、負の半周期に遮断する。この波形は通過する側を逆にしている。",
      "オ": "この波形は全波整流に当たる。設問のようにダイオード1個の直列回路では、負の半波を正へ反転させる経路がない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q27.webp"
    ],
    "imageAltTexts": [
      "ダイオードと抵抗の直列回路の図Ⅰと、電源電圧の時間変化の図Ⅱ。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q27-1.webp",
      "イ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q27-2.webp",
      "ウ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q27-3.webp",
      "エ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q27-4.webp",
      "オ": "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q27-5.webp"
    }
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q28",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択A（電気・情報系）",
      "負帰還の伝達関数"
    ],
    "difficulty": 2,
    "question": "図のようなブロック線図の伝達関数 y/x として最も妥当なのはどれか。",
    "choices": {
      "ア": "1/G",
      "イ": "G/(1−G)",
      "ウ": "1/(1−G)",
      "エ": "G/(1＋G)",
      "オ": "1/(1＋G)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "出力のG倍が負の符号で入力へ戻るため、y＝x−Gyとなる。これをy/xについて解くと1/(1＋G)である。",
    "choiceExplanations": {
      "ア": "帰還信号がGyであっても、出力yは単に入力をGで割ったものではない。加算点では、入力xから帰還信号を差し引く。",
      "イ": "帰還の信号は加算点で引かれるので、整理すると分母は1＋Gになる。Gは前向きの増幅器ではなく、帰還経路にある。",
      "ウ": "1−Gが分母となるのは、帰還信号を入力に加える場合である。図の加算点は帰還側がマイナスである。",
      "エ": "分母1＋Gは妥当だが、前向き経路に増幅器はない。Gは帰還側だけにあるので分子は1である。",
      "オ": "出力のG倍が負の符号で入力へ戻るため、y＝x−Gyとなる。これをy/xについて解くと1/(1＋G)である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q28.webp"
    ],
    "imageAltTexts": [
      "出力をG倍し、入力側で減じるブロック線図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q29",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電気機器",
    "topicTags": [
      "選択A（電気・情報系）",
      "誘導電動機の滑り"
    ],
    "difficulty": 2,
    "question": "三相誘導電動機を、同期速度1500 min⁻¹、回転子の回転速度1455 min⁻¹で運転しているとき、滑りとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1％",
      "イ": "3％",
      "ウ": "45％",
      "エ": "97％",
      "オ": "99％"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "同期速度から回転子の速度を引き、同期速度で割る。滑りは (1500−1455)/1500＝0.03 で3％になる。",
    "choiceExplanations": {
      "ア": "同期速度の1％は15 min⁻¹である。実際の回転子は同期速度より45 min⁻¹遅い。",
      "イ": "同期速度から回転子の速度を引き、同期速度で割る。滑りは (1500−1455)/1500＝0.03 で3％になる。",
      "ウ": "45は同期速度と回転子の回転速度の差であり、単位はmin⁻¹である。滑りはその差を同期速度で割った割合である。",
      "エ": "97％は回転子の速度の同期速度に対する割合である。滑りは同期速度からの不足分の割合である。",
      "オ": "滑りが99％なら回転子の速度は同期速度の約1％しかない。1455 min⁻¹は同期速度に近いので滑りは小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q30",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電力",
    "topicTags": [
      "選択A（電気・情報系）",
      "送配電と商用周波数"
    ],
    "difficulty": 2,
    "question": "送配電に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 我が国において、直流方式の送電は一切行われていない。\n㋑ 電圧が低い方が効率よく送電できるため、我が国においては、発電所では変圧器によって電圧を下げ、需要場所の近くで電圧を上げている。\n㋒ 我が国の商用周波数は、東日本では50 Hz、西日本では60 Hzとなっている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "日本の商用電源は東日本の50 Hzと西日本の60 Hzに分かれている。直流送電も行われ、交流送電では損失を減らすため高電圧を使う。",
    "choiceExplanations": {
      "ア": "日本の送電には直流方式も使われている。海底ケーブルを通る連系設備などが例である。",
      "イ": "直流を用いる連系設備があるので㋐は誤りである。送電時には電圧を上げると電流が小さくなり、線路での損失を抑えられるので㋑も誤りである。",
      "ウ": "同じ電力なら高い電圧ほど流す電流を小さくでき、抵抗での損失が減る。送電側で昇圧し、需要地では利用に合わせて降圧する。",
      "エ": "商用周波数の㋒は正しい。㋑は送電側と需要地側での電圧の変換方向を逆にしている。",
      "オ": "日本の商用電源は東日本の50 Hzと西日本の60 Hzに分かれている。直流送電も行われ、交流送電では損失を減らすため高電圧を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q31",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "小数の位取り"
    ],
    "difficulty": 2,
    "question": "2進数で表された0.01は、16進数で表された0.01の何倍か。\nただし、選択肢は10進数で表されている。",
    "choices": {
      "ア": "1/64倍",
      "イ": "1/8倍",
      "ウ": "8倍",
      "エ": "64倍",
      "オ": "256倍"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "二進数の0.01は2⁻²、十六進数の0.01は16⁻²である。前者を後者で割ると (16/2)²＝64 になる。",
    "choiceExplanations": {
      "ア": "1/64は十六進数の値を二進数の値で割ったときの比である。設問は二進数の値を十六進数の値で割る。",
      "イ": "両方とも小数点の右側の第2位に1がある。基数が小さい二進数の0.01の方が大きく、比は1未満にならない。",
      "ウ": "8は基数16と基数2の比である。1が小数点以下の第2位にあるので、比にはその二乗が現れる。",
      "エ": "二進数の0.01は2⁻²、十六進数の0.01は16⁻²である。前者を後者で割ると (16/2)²＝64 になる。",
      "オ": "256は十六進数の0.01の逆数である。これに二進数の0.01の値である1/4を掛けると64になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q32",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "論理和と論理積"
    ],
    "difficulty": 2,
    "question": "論理式 A・(A＋B) と等価なものは次のうちではどれか。\nただし、「＋」は論理和を、「・」は論理積を表すものとする。",
    "choices": {
      "ア": "A",
      "イ": "B",
      "ウ": "A＋B",
      "エ": "A・B",
      "オ": "1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "分配すると A・A＋A・B＝A＋A・B となる。Aが1なら全体は1、Aが0なら全体は0なので、吸収律でAに等しい。",
    "choiceExplanations": {
      "ア": "分配すると A・A＋A・B＝A＋A・B となる。Aが1なら全体は1、Aが0なら全体は0なので、吸収律でAに等しい。",
      "イ": "A＝1、B＝0なら元の論理式は1であるが、Bは0である。",
      "ウ": "A＝0、B＝1のとき論理和は1である。元の式はAとの論理積を取るので、その入力では0になる。",
      "エ": "A＝1、B＝0でもA＋Bは1になり、元の式の値は1である。AとBの論理積なら値は0になる。",
      "オ": "元の式はA＝0のとき常に0になる。入力にかかわらず1になる式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q33",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "NOR回路による論理演算"
    ],
    "difficulty": 2,
    "question": "図の①、②、③は、NOR回路のみで構成した論理回路である。これらのうち、AND回路、OR回路と等価なものの組合せとして正しいのはどれか。\nただし、A、Bが入力で、Xが出力とする。",
    "choices": {
      "ア": "①、③",
      "イ": "②、①",
      "ウ": "②、③",
      "エ": "③、①",
      "オ": "③、②"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "①はNORの後にもう一度反転するのでORになる。②はAとBを個別に反転してからNORを取るので、ド・モルガンの法則によりANDになる。",
    "choiceExplanations": {
      "ア": "①の後段は同じ信号を二つの端子に入れるのでNOTとして働く。NORの出力を反転した①はORであり、ANDではない。",
      "イ": "①はNORの後にもう一度反転するのでORになる。②はAとBを個別に反転してからNORを取るので、ド・モルガンの法則によりANDになる。",
      "ウ": "②のANDは妥当である。③はA＝B＝0で出力が1になるので、ORではない。",
      "エ": "①はORになる。③は同じ値の二入力に対して1を出すため、A＝B＝0で0となるANDとは違う。",
      "オ": "③は二入力が異なる場合に0となり、等しい場合に1となる。②は個々の反転信号のNORなので、ORではなくANDになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q33.webp"
    ],
    "imageAltTexts": [
      "NORゲートだけで構成した①、②、③の論理回路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q34",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "電気通信",
    "topicTags": [
      "選択A（電気・情報系）",
      "ダイポールアンテナ"
    ],
    "difficulty": 2,
    "question": "アンテナに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図のように、直線導体の中央部に送信機（又は受信機）を接続したアンテナを［㋐］アンテナという。［㋐］アンテナを使って電波を放射するとき、電波が最も強く放射されるのは、図の［㋑］の方向である。」",
    "choices": {
      "ア": "パラボラ、①",
      "イ": "ヘリカル、①",
      "ウ": "ヘリカル、②",
      "エ": "ダイポール、①",
      "オ": "ダイポール、②"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "中央から給電する直線状の導体はダイポールアンテナである。図の構成では、導体の軸と直角になる方向②への放射が最も強い。",
    "choiceExplanations": {
      "ア": "パラボラアンテナは放物面の反射器を用いる。図の直線状の導体はダイポールで、導体に垂直な方向への放射が強い。",
      "イ": "ヘリカルアンテナはらせん状の導体を用いる。図の直線状の導体では、軸方向①に強く放射するわけではない。",
      "ウ": "垂直方向②は妥当である。図はらせん状ではなく、中央から給電する直線状のダイポールである。",
      "エ": "図の構造をダイポールとする点は正しい。放射が最も強いのは導体の軸方向①ではなく垂直方向②である。",
      "オ": "中央から給電する直線状の導体はダイポールアンテナである。図の構成では、導体の軸と直角になる方向②への放射が最も強い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q34.webp"
    ],
    "imageAltTexts": [
      "直線導体の中央に送受信機を接続した図。①は導体の軸方向、②は垂直方向。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q35",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "パリティチェック"
    ],
    "difficulty": 2,
    "question": "データ中の1の個数が偶数であれば0、奇数であれば1をパリティビットとしてデータに付加するパリティチェックについて考える。8ビットのデータ「10111110」に対して付加されるパリティビットが1であるとき、次の記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 一つのビットのみに誤りが生じている。\n㋑ 誤りが生じているが、何個のビットに誤りが生じているかは特定できない。\n㋒ 誤りが生じているビットの位置が分かる。\n㋓ 誤りが生じているビットの位置は分からない。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋓",
      "エ": "㋒",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "データ中の1は6個なので、正しいパリティビットなら0である。1が付いていれば誤りを検出できるが、誤りの個数や位置はこの情報だけでは特定できない。",
    "choiceExplanations": {
      "ア": "パリティの不一致は奇数個のビットの誤りを示す。1個と断定したり、その位置を特定したりすることはできない。",
      "イ": "位置を判定できないという㋓は妥当である。㋐のように1ビットだけと断定することはできない。",
      "ウ": "データ中の1は6個なので、正しいパリティビットなら0である。1が付いていれば誤りを検出できるが、誤りの個数や位置はこの情報だけでは特定できない。",
      "エ": "1個のパリティビットは全体の偶奇を検査する。どの位置が変化したかは分からないので㋒は誤りである。",
      "オ": "㋓は妥当である。誤りがあるものの個数は特定できないという㋑も成り立つ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q36",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "共通鍵暗号と公開鍵暗号"
    ],
    "difficulty": 2,
    "question": "次の㋐～㋓は、共通鍵暗号と公開鍵暗号のいずれかの特徴を記述したものである。これらのうち、共通鍵暗号の特徴のみを挙げているのはどれか。\n㋐ 暗号化と復号に異なる鍵を用いる方式である。\n㋑ 通信するペア当たり1個の鍵が必要であり、n人が通信する場合、n(n−1)/2個の鍵が必要である。\n㋒ 一般に、もう一方の方式と比較して処理が速い。\n㋓ 代表的なアルゴリズムとして、大きな合成数の素因数分解が困難であることを利用したRSA暗号がある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "共通鍵を通信する二者の組ごとに用意するなら、鍵はn人から2人を選ぶ組合せの分だけ必要になる。共通鍵暗号は一般に公開鍵暗号より計算負荷が小さい。",
    "choiceExplanations": {
      "ア": "ペアごとに鍵を共有する㋑は妥当である。暗号化と復号で異なる鍵を用いる㋐は公開鍵暗号の特徴である。",
      "イ": "処理が一般に速いという㋒は共通鍵暗号の特徴である。㋐は暗号化と復号に同じ秘密の鍵を使う共通鍵暗号には当てはまらない。",
      "ウ": "異なる鍵を用いることも、代表例がRSAであることも、公開鍵暗号の特徴である。",
      "エ": "共通鍵を通信する二者の組ごとに用意するなら、鍵はn人から2人を選ぶ組合せの分だけ必要になる。共通鍵暗号は一般に公開鍵暗号より計算負荷が小さい。",
      "オ": "処理速度についての㋒は妥当である。RSAは公開鍵と秘密鍵を用いる方式であるため㋓は含まれない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q37",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "プログラム言語と翻訳処理"
    ],
    "difficulty": 2,
    "question": "プログラム言語に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「コンピュータが直接理解できる機械語を、英文字を組み合わせたニーモニックと呼ばれる表意記号で記述し、人間に理解しやすくした言語のことを［㋐］言語という。また、C言語のような高水準言語で書かれたソースプログラムを、機械語のオブジェクトプログラムに変換する言語プロセッサを［㋑］という。」",
    "choices": {
      "ア": "アセンブリ、コンパイラ",
      "イ": "アセンブリ、ライブラリ",
      "ウ": "コンパイル、アセンブラ",
      "エ": "ライブラリ、アセンブラ",
      "オ": "ライブラリ、コンパイラ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "機械語の命令をニーモニックで表すのがアセンブリ言語である。Cなどの高水準言語を対象の機械語などへ翻訳する処理系をコンパイラと呼ぶ。",
    "choiceExplanations": {
      "ア": "機械語の命令をニーモニックで表すのがアセンブリ言語である。Cなどの高水準言語を対象の機械語などへ翻訳する処理系をコンパイラと呼ぶ。",
      "イ": "アセンブリ言語という名称は正しい。ライブラリは再利用できる機能などの集まりであり、翻訳処理系の名称ではない。",
      "ウ": "コンパイルは翻訳の処理を表す語であり、機械語をニーモニックで記述する言語の名称ではない。アセンブラはアセンブリ言語を翻訳する。",
      "エ": "ライブラリは言語ではなく、プログラムから再利用するコードなどの集まりである。Cのような高水準言語を処理するものはコンパイラである。",
      "オ": "コンパイラという㋑は妥当である。ニーモニックを用いる言語はライブラリではなくアセンブリ言語である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q38",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "命令網羅と分岐網羅"
    ],
    "difficulty": 2,
    "question": "図のフローチャートのような構造をもつプログラムを、①命令網羅、②判定条件網羅（分岐網羅）のそれぞれの方式でテストする。この場合における最小限必要なテストケースの個数の組合せとして正しいのはどれか。\nなお、命令網羅とは、プログラムの全ての命令を少なくとも1回実行する方式である。また、判定条件網羅（分岐網羅）とは、分岐部分の判定条件の真と偽それぞれの場合を少なくとも1回実行する方式である。",
    "choices": {
      "ア": "1、1",
      "イ": "1、2",
      "ウ": "1、4",
      "エ": "2、2",
      "オ": "2、4"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二つの判定がいずれも真になる一つのケースで両方の代入を実行できる。両方が偽になるケースを一つ追加すると、各判定の真偽を網羅できる。",
    "choiceExplanations": {
      "ア": "両方の代入は一つのケースで実行できる。しかし、各判定が真と偽になるには少なくとも二つのケースが必要である。",
      "イ": "二つの判定がいずれも真になる一つのケースで両方の代入を実行できる。両方が偽になるケースを一つ追加すると、各判定の真偽を網羅できる。",
      "ウ": "分岐網羅では各判定に真と偽が現れればよく、真偽の全組合せまで試す必要はない。両方が真のケースと両方が偽のケースで足りる。",
      "エ": "分岐網羅が2ケースという点は正しい。命令網羅は両方の判定を真にすれば、一度で二つの代入を実行できる。",
      "オ": "二つの代入を実行するには両方を真にする1ケースで足りる。分岐網羅でも全ての経路ではなく個々の判定の真・偽を通ればよい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q38.webp"
    ],
    "imageAltTexts": [
      "二つの判定があり、それぞれの真の分岐で代入を行うフローチャート。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q39",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "フローチャートの最適化"
    ],
    "difficulty": 2,
    "question": "プログラムの最適化に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図Ⅰのフローチャートにおいて、Aの分岐処理のうち、片方は実行されることがないため、この分岐を削除し、単に［㋐］を実行するだけにすることができる。また、Bの分岐処理について、変数iの代わりに変数Xの条件［㋑］とすることで、変数iが不要となる。結果として、図Ⅰは、出力を変えないまま、図Ⅱのように処理の少ない簡単なフローチャートとすることができる。」",
    "choices": {
      "ア": "Y←0、X＜n−1",
      "イ": "Y←0、X＜n",
      "ウ": "Y←0、X＜n＋1",
      "エ": "Y←1、X＜n−1",
      "オ": "Y←1、X＜n＋1"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "分岐Aでは初めのX＝0によりX≧0が成立し、Y←0だけが実行される。Bの時点では常にX＝i＋1なので、i＜nと等価なのはX＜n＋1である。",
    "choiceExplanations": {
      "ア": "最初にYを0にする点は妥当である。X＜n−1にすると、元のフローより2回早く反復を終える。",
      "イ": "Yの初期化は合っている。判定の時点ではXがiより1大きいので、X＜nにすると元より1回早く終了する。",
      "ウ": "分岐Aでは初めのX＝0によりX≧0が成立し、Y←0だけが実行される。Bの時点では常にX＝i＋1なので、i＜nと等価なのはX＜n＋1である。",
      "エ": "Aの判定を行う時点のXは0なので、Yは0に初期化される。条件X＜n−1も元の反復回数を保たない。",
      "オ": "条件X＜n＋1は妥当である。Y←1は到達しない分岐の処理なので、初期化に採用すると出力が変わる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q39.webp"
    ],
    "imageAltTexts": [
      "元のフローチャートの図Ⅰと、初期化および反復の条件を置き換える図Ⅱ。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q40",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "動的計画法と最大経路"
    ],
    "difficulty": 2,
    "question": "次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図Ⅰのように、第1層には1個、第2層には2個…というように、第n層まで三角形状に数字が配置され、ある層の一つの数字は、次の層の二つの数字と接続された構造がある（図Ⅰはn＝4）。いま、第1層から順に接続された数字をたどって第n層まで下るとき、たどった経路上の数字の合計が最大となる経路を求めたい。最も単純な解法は、全てのあり得る経路について数字の合計を調べる、いわゆる全探索である。この場合、［㋐］通りの経路を調べる必要があり、図Ⅰにおいては、太い矢印で示した経路で最大値21をとることが分かる。\nこれを工夫して解くことを考える。図Ⅱのように、第1層から順に、各数字の右上に、第1層からその数字までの経路のうち、数字の合計の最大のものをメモしていく。例えば、第3層の中央の「7」については、第2層の左の「4」から来る経路と、右の「2」から来る経路の2通りがあり、「4」からの経路の方が合計が大きくなるので、その合計値「12」をメモする。これを全ての数字に対して行い、第n層の数字に付いたメモを比べることで、最大値が分かる。この考え方を用いて図Ⅲの6層の三角形について最大値を求めると［㋑］となる。」",
    "choices": {
      "ア": "2n、28",
      "イ": "2n、30",
      "ウ": "2^(n−1)、28",
      "エ": "2^(n−1)、29",
      "オ": "2^(n−1)、30"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "第1層から第n層までに移動がn−1回あり、各移動で二択なので2^(n−1)通りになる。図Ⅲの最下層の最大合計を左から求めると28、29、28、27、30、29で、最大は30である。",
    "choiceExplanations": {
      "ア": "次の層に移るたび選択が二つあるので、経路の数は2nではなく2^(n−1)になる。図Ⅲでは28を超える経路もある。",
      "イ": "最大合計30は妥当である。異なる進み方は各層間で2倍ずつになるので、経路数は2nにはならない。",
      "ウ": "経路数は妥当である。最下層のいちばん左への最大合計は28だが、各到達点の中で最大なのは30である。",
      "エ": "経路数は妥当である。最下層の左から2番目と右端では29になるが、右から2番目では30になる。",
      "オ": "第1層から第n層までに移動がn−1回あり、各移動で二択なので2^(n−1)通りになる。図Ⅲの最下層の最大合計を左から求めると28、29、28、27、30、29で、最大は30である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q40.webp",
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q40-fig3.webp"
    ],
    "imageAltTexts": [
      "4層の三角形に数字を並べた図Ⅰと、各数字に到達するまでの最大合計をメモした図Ⅱ。",
      "図Ⅲ。数字を6層に並べた三角形と、各数字から直下の二つの数字へ向かう矢印。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q41",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "軟鋼の応力―ひずみ線図"
    ],
    "difficulty": 2,
    "question": "図は、炭素鋼（軟鋼）の引張試験結果から得られる応力―ひずみ線図である。図中の点A～Dに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n・点Aの応力を［㋐］限度といい、この点までは応力σとひずみεとが［㋐］関係を保つ。\n・点Bの応力を［㋑］限度といい、力を除くと試験片が原形に戻る限界点である。\n・点Cから点Dでは、力の増加がなくても伸びが増加する。この現象を［㋒］といい、［㋒］が生じるときの応力を［㋒］点という。",
    "choices": {
      "ア": "弾性、降伏、破断",
      "イ": "弾性、比例、降伏",
      "ウ": "比例、降伏、破断",
      "エ": "比例、弾性、降伏",
      "オ": "比例、弾性、破断"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "直線関係が保たれる限界が比例限度である。除荷後に原形へ戻る限界が弾性限度で、伸びが進むCからDの現象は降伏である。",
    "choiceExplanations": {
      "ア": "Aまでは応力とひずみが比例するので、Aは比例限度である。Bは原形回復の限界で、CからDにかけて起きる現象は破断ではない。",
      "イ": "CからDにかけての現象は降伏である。Aは比例限度、Bは弾性限度なので、最初の二つが逆である。",
      "ウ": "Aの比例限度は妥当である。Bは弾性限度であり、CからDにかけて試験片が破断するわけではない。",
      "エ": "直線関係が保たれる限界が比例限度である。除荷後に原形へ戻る限界が弾性限度で、伸びが進むCからDの現象は降伏である。",
      "オ": "AとBの用語は妥当である。CからDで伸びが大きくなる段階は降伏であり、試験片が切れる破断とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q41.webp"
    ],
    "imageAltTexts": [
      "軟鋼の引張試験で得た応力―ひずみ線図。曲線上に点A～Dが記されている。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q42",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "非鉄金属の性質"
    ],
    "difficulty": 2,
    "question": "非鉄金属材料に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n・［㋐］は、密度が2.7×10³ kg/m³で、鉄の約34％と軽い。また、面心立方格子で展延性に優れており、電気や熱の良導体で、熱や光をよく反射する。さらに、炭素鋼と比べて融点がはるかに低く、特にケイ素を含む合金は鋳造しやすく、ダイカストに用いられている。\n・［㋑］は、密度が1.74×10³ kg/m³で、鋼の約22％、［㋐］の約66％であり、実用されている構造用金属材料の中で最も軽い。そのため、航空機部品や自動車部品、オフィス機器、光学機器等、軽量化を必要とする分野での需要は年々増加している。常温では、結晶構造がちゅう密六方格子のため、展延性はよくない。また、切削加工する際には、化学的に活性な金属であるということに留意し、発火には十分気を付けて作業することが大切である。\n・［㋒］は、融点が1668 ℃と高く、密度が4.51×10³ kg/m³で鋼の約60％と軽く、引張強さが350～500 MPaと金属の中では比強度が大きい。［㋒］は表面に緻密な酸化皮膜を形成するため、耐食性に優れている。また、熱伝導性及び導電性が低く、耐熱性があるなどの特徴をもっている。",
    "choices": {
      "ア": "アルミニウム、マグネシウム、チタン",
      "イ": "アルミニウム、チタン、マグネシウム",
      "ウ": "マグネシウム、アルミニウム、チタン",
      "エ": "マグネシウム、チタン、アルミニウム",
      "オ": "チタン、マグネシウム、アルミニウム"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "密度約2.7×10³ kg/m³で面心立方格子なのがアルミニウムである。さらに軽い約1.74×10³ kg/m³はマグネシウムで、高融点と不動態皮膜が特徴なのがチタンである。",
    "choiceExplanations": {
      "ア": "密度約2.7×10³ kg/m³で面心立方格子なのがアルミニウムである。さらに軽い約1.74×10³ kg/m³はマグネシウムで、高融点と不動態皮膜が特徴なのがチタンである。",
      "イ": "㋐のアルミニウムは妥当である。チタンの密度は約4.51×10³ kg/m³であり、㋑の1.74×10³ kg/m³に当たるのはマグネシウムである。",
      "ウ": "㋒のチタンは妥当である。㋐の面心立方格子で密度約2.7×10³ kg/m³という性質はアルミニウムのものである。",
      "エ": "アルミニウムはチタンより低い温度で溶けるので、1668 ℃を特徴とする㋒には当たらない。㋑の材料はマグネシウムである。",
      "オ": "㋑は妥当である。チタンはアルミニウムより密度と融点が高く、㋐と㋒の対応が逆になっている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q43",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "金型鋳造と遠心鋳造"
    ],
    "difficulty": 2,
    "question": "鋳造法に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 金型は、砂型に比べて溶湯の冷却速度が速いので、組織が微細になり、ピンホールが生成しにくく、機械的性質が優れている。\n㋑ 金型鋳造法は、砂型鋳造法に比べると、鋳物の材質・形状・大きさなどの自由度が高い。\n㋒ 遠心鋳造法は、形状に制限があるが、中子を用いずに中空鋳物を造ることができる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "金型は砂型より熱を伝えやすく、速く凝固して組織が微細になりやすい。遠心鋳造では溶湯が回転する型の外周側に集まるため、中子なしで中空品を得られる。",
    "choiceExplanations": {
      "ア": "㋐は、金型による速い冷却の特徴を説明している。型を回転させて中空品を作る㋒も妥当である。",
      "イ": "㋐は妥当である。砂型は型を取り壊して製品を取り出せるため、金型より形状や大きさの自由度を確保しやすい。",
      "ウ": "金型は砂型より熱を伝えやすく、速く凝固して組織が微細になりやすい。遠心鋳造では溶湯が回転する型の外周側に集まるため、中子なしで中空品を得られる。",
      "エ": "金型は材料や形状などに制約がある。砂型より自由度が高いとする㋑は妥当でない。",
      "オ": "㋒は、遠心鋳造で中子を使わず中空にできる点が合っている。金型鋳造の自由度が砂型より高いという㋑は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q44",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "深絞りと材料の面積"
    ],
    "difficulty": 2,
    "question": "図Ⅰのようなブランクを深絞りすることによって、図Ⅱのような直径80 mm、高さ25 mmの金属円筒容器を造るとき、深絞り前のブランクの直径として最も妥当なのはどれか。\nただし、深絞りの前後で板厚は変化しないものとし、円筒容器底部の角の半径は十分小さいものとする。",
    "choices": {
      "ア": "100 mm",
      "イ": "105 mm",
      "ウ": "120 mm",
      "エ": "125 mm",
      "オ": "130 mm"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "底面と側面の面積から、円板の直径dは d²＝80²＋4×80×25＝14400 を満たす。よって直径は120 mmとなる。",
    "choiceExplanations": {
      "ア": "板厚が変わらないので、円板と容器の底・側面の面積が等しい。容器の面積はπ×40²＋2π×40×25＝3600πであり、円板の半径は60 mmである。",
      "イ": "105 mmの円板の半径は52.5 mmである。面積は3600π mm²より小さく、底面と側面を作るには足りない。",
      "ウ": "底面と側面の面積から、円板の直径dは d²＝80²＋4×80×25＝14400 を満たす。よって直径は120 mmとなる。",
      "エ": "125 mmの円板なら半径が62.5 mmであり、必要な面積3600π mm²を上回る。図のように余りがない条件では大きすぎる。",
      "オ": "直径に高さの2倍を加えると130 mmになるが、深絞り前後で等しくなるのは直径に沿った長さではなく板の面積である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q44.webp"
    ],
    "imageAltTexts": [
      "深絞り前の円形ブランクと、直径80 mm・高さ25 mmの金属円筒容器。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q45",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "旋削加工と送り"
    ],
    "difficulty": 2,
    "question": "図Ⅰ、図Ⅱは旋削による加工を表したものである。また、それぞれの図中の㋐、㋑はそれぞれ工作物、バイトの運動方向を示している。図Ⅰ、図Ⅱの加工法と、㋐、㋑の運動の名称の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "外丸削り、端面削り、主運動、送り運動",
      "イ": "外丸削り、端面削り、送り運動、主運動",
      "ウ": "外丸削り、正面削り、送り運動、主運動",
      "エ": "端面削り、外丸削り、主運動、送り運動",
      "オ": "端面削り、正面削り、主運動、送り運動"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "図Ⅰは工作物の軸と平行に刃を進めて外周を削り、図Ⅱは半径方向に進めて端面を削る。両図とも工作物の回転が主運動、バイトを進める動きが送り運動である。",
    "choiceExplanations": {
      "ア": "図Ⅰは工作物の軸と平行に刃を進めて外周を削り、図Ⅱは半径方向に進めて端面を削る。両図とも工作物の回転が主運動、バイトを進める動きが送り運動である。",
      "イ": "二つの加工法は妥当である。㋐の回転が切削の主運動で、㋑のバイトの移動が送り運動なので、名称の対応が逆である。",
      "ウ": "図Ⅰは外丸削りである。工作物の回転を送り運動としている点が誤りである。",
      "エ": "㋐と㋑の運動名は妥当である。外周を仕上げる図Ⅰが外丸削り、端面に刃を送る図Ⅱが端面削りである。",
      "オ": "回転とバイトの移動の名称は妥当である。図Ⅰの加工面は円柱の端面ではなく外周面なので外丸削りに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q45.webp"
    ],
    "imageAltTexts": [
      "工作物の回転とバイトの動きを矢印で示した二つの旋削加工図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q46",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "研削用砥粒"
    ],
    "difficulty": 2,
    "question": "砥粒に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「低炭素鋼のような比較的硬度が低く、靱性のある材料には［㋐］砥粒を用い、焼き入れ鋼のような硬度が高く、靱性が比較的低い材料では［㋑］砥粒を用いる。更に硬い超硬合金やセラミックスの加工には立方晶窒化ホウ素や［㋒］砥粒が使用される。」",
    "choices": {
      "ア": "アルミナ、ダイヤモンド、炭化ケイ素",
      "イ": "アルミナ、炭化ケイ素、ダイヤモンド",
      "ウ": "ダイヤモンド、アルミナ、炭化ケイ素",
      "エ": "炭化ケイ素、アルミナ、ダイヤモンド",
      "オ": "炭化ケイ素、ダイヤモンド、アルミナ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "設問の研削材の区分では、㋐が炭化ケイ素、㋑がアルミナである。ダイヤモンドは加工が難しい超硬合金やセラミックスに用いられる超砥粒である。",
    "choiceExplanations": {
      "ア": "超硬合金やセラミックスに用いる超砥粒として㋒に当てはまるのはダイヤモンドである。焼き入れ鋼ではダイヤモンドは鉄と反応しやすいため、㋑にはアルミナが適する。",
      "イ": "㋒のダイヤモンドは妥当である。焼き入れ鋼の研削に用いる砥粒は、この設問の組合せではアルミナである。",
      "ウ": "㋑のアルミナは妥当である。ダイヤモンドは低炭素鋼向けの一般砥粒ではなく、超硬合金などに使う㋒に当たる。",
      "エ": "設問の研削材の区分では、㋐が炭化ケイ素、㋑がアルミナである。ダイヤモンドは加工が難しい超硬合金やセラミックスに用いられる超砥粒である。",
      "オ": "㋐は公式の組合せと一致する。ダイヤモンドは通常の焼き入れ鋼より超硬合金などの加工に適しており、㋑と㋒が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q47",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "生産管理",
    "topicTags": [
      "選択B（機械系）",
      "見込生産と受注生産"
    ],
    "difficulty": 2,
    "question": "生産形態についてまとめた次の表の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "多品種少量、少品種多量、連続、個別、ロット",
      "イ": "多品種少量、少品種多量、ロット、連続、個別",
      "ウ": "多品種少量、少品種多量、ロット、個別、連続",
      "エ": "少品種多量、多品種少量、連続、個別、ロット",
      "オ": "少品種多量、多品種少量、ロット、連続、個別"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "見込生産は少品種多量で、ロット生産や連続生産が使われる。受注生産は多品種少量で個別生産が中心だが、一つの注文の数量が大きければロット生産も使われる。",
    "choiceExplanations": {
      "ア": "標準的な製品を予測に基づいて作る見込生産では少品種多量となりやすい。注文に応じる受注生産は多品種少量が多いので、始めの二つが逆である。",
      "イ": "ロット・連続・個別の対応は妥当である。需要特性による品種と数量の対応が逆で、見込生産では少品種を多量に作りやすい。",
      "ウ": "品種・数量の対応が逆である。受注ごとに仕様が異なる場合に用いるのは、連続生産ではなく個別生産である。",
      "エ": "見込生産と受注生産の品種・数量の対応は妥当である。表では受注数が多い場合にも対応する㋒はロット、受注に対応する基本の㋔は個別となる。",
      "オ": "見込生産は少品種多量で、ロット生産や連続生産が使われる。受注生産は多品種少量で個別生産が中心だが、一つの注文の数量が大きければロット生産も使われる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q47.webp"
    ],
    "imageAltTexts": [
      "見込生産と受注生産について、品種と生産量および製品のまとめ方を示す穴埋め表。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q48",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "ノギスの副尺"
    ],
    "difficulty": 2,
    "question": "図のように、ノギスを用いて丸棒の直径Dを測定した。このとき、Dの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "7.40 mm",
      "イ": "11.40 mm",
      "ウ": "12.40 mm",
      "エ": "12.70 mm",
      "オ": "40.70 mm"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "副尺のゼロのすぐ左にある本尺の目盛は12 mmである。本尺と一致する副尺の目盛が0.70 mmなので、加えて12.70 mmとなる。",
    "choiceExplanations": {
      "ア": "副尺と本尺の一致線だけを見ても、整数部分は求められない。副尺のゼロが本尺12 mmの目盛を超えている。",
      "イ": "本尺は副尺のゼロのすぐ左を読む。図では11 mmではなく12 mmを通過している。",
      "ウ": "本尺の12 mmは妥当である。副尺で本尺と一致する目盛は0.40 mmでなく0.70 mmを示す。",
      "エ": "副尺のゼロのすぐ左にある本尺の目盛は12 mmである。本尺と一致する副尺の目盛が0.70 mmなので、加えて12.70 mmとなる。",
      "オ": "本尺の整数部分は一致線の位置ではなく、副尺のゼロの位置から読む。40 mm台ではなく12 mm台である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q48.webp"
    ],
    "imageAltTexts": [
      "ノギスで丸棒の直径Dを測定したときの、本尺と副尺の拡大図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q49",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "力のモーメントの符号"
    ],
    "difficulty": 2,
    "question": "図のように、直角に折れ曲がった剛体棒の点Aにおいて左向きに3.0 N、点Bにおいて下向きに2.0 Nの力が作用している。左まわり（反時計まわり）を正とするとき、点Oまわりの力のモーメントとして最も妥当なのはどれか。",
    "choices": {
      "ア": "−3.0 N·m",
      "イ": "−0.5 N·m",
      "ウ": "0.5 N·m",
      "エ": "3.0 N·m",
      "オ": "8.5 N·m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aは反時計まわりに3.0×1.5＝4.5 N·m、Bは時計まわりに2.0×2.0＝4.0 N·mである。符号を付けて加えると0.5 N·mとなる。",
    "choiceExplanations": {
      "ア": "モーメントの腕は力の作用線への垂直距離である。Aの左向きの力は正で4.5 N·mとなり、−3.0 N·mにはならない。",
      "イ": "Aの力が生じる反時計まわりのモーメントの方が、Bの時計まわりのモーメントより大きい。合計の符号は正になる。",
      "ウ": "Aは反時計まわりに3.0×1.5＝4.5 N·m、Bは時計まわりに2.0×2.0＝4.0 N·mである。符号を付けて加えると0.5 N·mとなる。",
      "エ": "AとBの力は逆向きの回転を生むため、4.5 N·mから4.0 N·mを引く。3.0 N·mはこの差に一致しない。",
      "オ": "8.5 N·mは二つの大きさを足した値である。一方は時計まわりなので負として扱う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q49.webp"
    ],
    "imageAltTexts": [
      "直角に曲がった剛体棒。点Aに左向き3.0 N、点Bに下向き2.0 Nの力がかかる。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q50",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "運動量と台車の反動"
    ],
    "difficulty": 2,
    "question": "図のように、滑らかな床の上に静止していた質量1 kgの台車から、質量0.4 kgの小球を右向きに5 m/sで発射したとき、小球を発射した後の台車の速度として最も妥当なのはどれか。",
    "choices": {
      "ア": "左向きに5 m/s",
      "イ": "左向きに2 m/s",
      "ウ": "0 m/s（静止したまま）",
      "エ": "右向きに2 m/s",
      "オ": "右向きに5 m/s"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "発射前の水平運動量は0である。小球の右向きの運動量が0.4×5＝2 kg·m/sなので、台車は左向き2 m/sで動く。",
    "choiceExplanations": {
      "ア": "台車の向きは左である。打ち出した小球に比べ台車の質量が大きいため、運動量を打ち消すにはより小さな速さで足りる。",
      "イ": "発射前の水平運動量は0である。小球の右向きの運動量が0.4×5＝2 kg·m/sなので、台車は左向き2 m/sで動く。",
      "ウ": "台車が静止したままでは、小球が持つ右向きの運動量を打ち消せない。水平外力がないので台車は反対向きに動く。",
      "エ": "速さの大きさ2 m/sは妥当である。運動量の合計を0にするには、小球と反対の左向きでなければならない。",
      "オ": "台車と小球は反対向きに動く。台車の速さは小球の運動量を台車の質量で割った2 m/sである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q50.webp"
    ],
    "imageAltTexts": [
      "質量1 kgの台車から質量0.4 kgの小球が右向き5 m/sで動く図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q51",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "力の仕事"
    ],
    "difficulty": 2,
    "question": "図のように、物体に対して、鉛直上向きに大きさFの力を作用させ続けたまま、水平方向に距離lだけ移動させた。このとき、鉛直上向きに作用させた力がした仕事として最も妥当なのはどれか。",
    "choices": {
      "ア": "0",
      "イ": "Fl/2",
      "ウ": "Fl",
      "エ": "Fl²/2",
      "オ": "Fl²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "鉛直上向きの力と水平方向の変位との角は90°である。仕事は力と変位の内積なので0となる。",
    "choiceExplanations": {
      "ア": "鉛直上向きの力と水平方向の変位との角は90°である。仕事は力と変位の内積なので0となる。",
      "イ": "この力は全区間で変位に垂直である。平均値としてFlの半分を取る根拠はない。",
      "ウ": "Flは力が変位と同じ方向に加わるときの仕事である。今回は変位方向の力の成分が0である。",
      "エ": "一定の力のする仕事は、変位に平行な成分と移動距離の積である。変位の二乗には比例しない。",
      "オ": "Fl²はエネルギーの単位にもならない。今回の力のように向きが変位と直角なら、距離にかかわらず仕事は0である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q51.webp"
    ],
    "imageAltTexts": [
      "上向きの力Fを加えたまま物体を水平方向に距離lだけ移動させる図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q52",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "静止摩擦と動摩擦"
    ],
    "difficulty": 2,
    "question": "図のように、水平な粗い床の上に質量mの物体を置き、水平に加える力を徐々に大きくしたところ、力の大きさがf₀に達したとき、物体が動き出した。力の大きさをそのままf₀で保ち続けたところ、物体は力と同じ向きに一定の加速度aで運動した。このときのf₀とaの組合せとして最も妥当なのはどれか。\nただし、重力加速度の大きさをg、静摩擦係数をμ₀、動摩擦係数をμとする。",
    "choices": {
      "ア": "μ₀mg、μg",
      "イ": "μ₀mg、(μ₀−μ)g",
      "ウ": "μ₀mg、(μ−μ₀)g",
      "エ": "μmg、(μ₀−μ)g",
      "オ": "μmg、(μ−μ₀)g"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "動き始める直前の最大静止摩擦力はμ₀mgである。動き始めた後は μ₀mg−μmg＝ma より a＝(μ₀−μ)g となる。",
    "choiceExplanations": {
      "ア": "動き出す力f₀は妥当である。加速度を求めるには動摩擦力だけでなく、加え続けている力との差を使う。",
      "イ": "動き始める直前の最大静止摩擦力はμ₀mgである。動き始めた後は μ₀mg−μmg＝ma より a＝(μ₀−μ)g となる。",
      "ウ": "f₀は妥当である。加速度は加えた力から動摩擦力を引いた合力で決まるので、差の順が逆である。",
      "エ": "加速度の表式は妥当である。動き出す力は動摩擦係数μではなく静摩擦係数μ₀で決まる。",
      "オ": "静止状態から動き出すときに使うのは最大静止摩擦力である。運動中の加速度でも、外から加えた力から動摩擦力を引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q52.webp"
    ],
    "imageAltTexts": [
      "粗い水平面上で質量mの物体に右向きの力を加える図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q53",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "選択B（機械系）",
      "継手の平均せん断応力"
    ],
    "difficulty": 2,
    "question": "図Ⅰ（断面図）、図Ⅱ（上面図）のように、直径20 mmの丸棒を用いた継手に30 kNの引張荷重を加える。このとき、丸棒に生じる平均せん断応力の大きさとして最も妥当なのはどれか。\nただし、円周率を3とする。また、1 MPaは1 N/mm²と等しい。",
    "choices": {
      "ア": "10 MPa",
      "イ": "20 MPa",
      "ウ": "30 MPa",
      "エ": "60 MPa",
      "オ": "100 MPa"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "一面でせん断される円断面の面積は3×10²＝300 mm²である。荷重30,000 Nを割ると100 N/mm²、すなわち100 MPaとなる。",
    "choiceExplanations": {
      "ア": "せん断面は一面で、その面積は半径10 mmを使って300 mm²となる。30 kNの荷重をこの小さい面積で割ると10 MPaより大きくなる。",
      "イ": "円の面積を求めるのは直径ではなく半径を使う。30,000 Nを実際の断面積300 mm²で割って求める。",
      "ウ": "30 kNを単位だけ変えて30 MPaとはできない。応力は荷重を丸棒のせん断断面積で割った値である。",
      "エ": "図では二枚の部材の境界で丸棒が一面せん断を受ける。30,000 Nを受ける面積は300 mm²であり、応力は60 MPaにはならない。",
      "オ": "一面でせん断される円断面の面積は3×10²＝300 mm²である。荷重30,000 Nを割ると100 N/mm²、すなわち100 MPaとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q53.webp"
    ],
    "imageAltTexts": [
      "丸棒で二つの部材をつないだ継手の断面図と上面図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q54",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "機械設計",
    "topicTags": [
      "選択B（機械系）",
      "歯車の速度比"
    ],
    "difficulty": 2,
    "question": "図のように、歯数30の歯車Aと歯数50の歯車Bがかみ合っている。歯車Aが回転速度300 min⁻¹で回転しているとき、歯車Bの回転速度として最も妥当なのはどれか。",
    "choices": {
      "ア": "150 min⁻¹",
      "イ": "180 min⁻¹",
      "ウ": "240 min⁻¹",
      "エ": "300 min⁻¹",
      "オ": "500 min⁻¹"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "かみ合いでは単位時間に送る歯の数が等しい。歯車Bの回転速度は 300×30/50＝180 min⁻¹ となる。",
    "choiceExplanations": {
      "ア": "150 min⁻¹になるのはBの歯数がAの2倍ならばである。Bの歯数はAの5/3倍なので、回転速度は300の3/5倍である。",
      "イ": "かみ合いでは単位時間に送る歯の数が等しい。歯車Bの回転速度は 300×30/50＝180 min⁻¹ となる。",
      "ウ": "240 min⁻¹で歯数50の歯車が回ると、かみ合い点を通る歯の数はAより多くなる。両歯車で歯の通過数は一致する。",
      "エ": "両歯車の回転速度が同じなら、歯数の多いBの歯がより多く通過する。かみ合うので、Bの回転はAより遅い。",
      "オ": "歯数が多い歯車は、同じ個数の歯を送るのに必要な回転数が少ない。速度比に50/30を掛けるのは逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q54.webp"
    ],
    "imageAltTexts": [
      "歯数30の歯車Aと歯数50の歯車Bがかみ合って回転する図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q55",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "単振動の周期と振動数"
    ],
    "difficulty": 2,
    "question": "周期0.2秒で単振動するときの振動数として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.2 Hz",
      "イ": "0.5 Hz",
      "ウ": "2 Hz",
      "エ": "5 Hz",
      "オ": "50 Hz"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "振動数は周期の逆数である。1/0.2＝5なので5 Hzとなる。",
    "choiceExplanations": {
      "ア": "0.2秒は一回の振動にかかる時間である。1秒間の回数を求めるにはその逆数を用いる。",
      "イ": "0.5 Hzなら一回に2秒かかる。設問の周期0.2秒はその10分の1である。",
      "ウ": "2 Hzなら周期は0.5秒になる。周期0.2秒を満たさない。",
      "エ": "振動数は周期の逆数である。1/0.2＝5なので5 Hzとなる。",
      "オ": "50 Hzの周期は0.02秒となる。与えられた0.2秒より一桁短い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q56",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "選択B（機械系）",
      "パスカルの原理"
    ],
    "difficulty": 2,
    "question": "図のように、断面積がそれぞれA₁、A₂の二つの容器に、滑らかに動くピストン①、②をそれぞれ取り付けて、管で接続し、内部を非圧縮性流体で満たした。ここで、ピストン①、②にそれぞれF₁、F₂の力を加えたところ、ピストンは静止した。この状態から、ピストン①をゆっくりとl₁だけ押し込んだところ、ピストン②はl₂だけ押し上げられた。このときのF₂、l₂の組合せとして最も妥当なのはどれか。\nただし、重力による影響は無視でき、パスカルの原理により、容器内には一様に等しい圧力が加わっているものとする。",
    "choices": {
      "ア": "F₁、l₁",
      "イ": "(A₁/A₂)F₁、(A₁/A₂)l₁",
      "ウ": "(A₁/A₂)F₁、(A₂/A₁)l₁",
      "エ": "(A₂/A₁)F₁、(A₁/A₂)l₁",
      "オ": "(A₂/A₁)F₁、(A₂/A₁)l₁"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "圧力の等しさから F₁/A₁＝F₂/A₂ である。非圧縮性なので押しのけた体積は A₁l₁＝A₂l₂ となり、力と距離で面積比は逆になる。",
    "choiceExplanations": {
      "ア": "二つの断面で等しいのは圧力と移動する流体の体積である。断面積が異なる場合に力と移動距離が両方とも等しくなるわけではない。",
      "イ": "l₂の式は流体の体積が保存されることから妥当である。力は面積に比例するため、F₂の面積比はA₂/A₁になる。",
      "ウ": "圧力が一定なら力は断面積に比例し、同じ体積を動かすと移動距離は断面積に反比例する。この選択肢は二つの面積比を逆にしている。",
      "エ": "圧力の等しさから F₁/A₁＝F₂/A₂ である。非圧縮性なので押しのけた体積は A₁l₁＝A₂l₂ となり、力と距離で面積比は逆になる。",
      "オ": "F₂の関係は圧力の等しさを満たしている。l₂は面積が大きいほど小さくなるので、係数はA₁/A₂である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q56.webp"
    ],
    "imageAltTexts": [
      "接続された二つの容器のピストンと、各ピストンの断面積、力、移動距離。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q57",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "選択B（機械系）",
      "理想気体の状態方程式"
    ],
    "difficulty": 2,
    "question": "体積1.5 m³の理想気体を、温度が300 Kから500 Kになるまで加熱したところ、圧力が2.0 MPaから2.5 MPaに変化した。加熱後の理想気体の体積として最も妥当なのはどれか。",
    "choices": {
      "ア": "1.0 m³",
      "イ": "1.5 m³",
      "ウ": "2.0 m³",
      "エ": "2.5 m³",
      "オ": "3.0 m³"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一定量の理想気体ではpV/Tが一定である。最終体積は 1.5×(2.0/2.5)×(500/300)＝2.0 m³となる。",
    "choiceExplanations": {
      "ア": "温度の増加率は圧力の増加率より大きい。体積は元の1.5 m³より増えるので1.0 m³にはならない。",
      "イ": "体積一定なら圧力は絶対温度に比例し、300 Kから500 Kなら約3.33 MPaになる。実際の2.5 MPaでは体積が変わっている。",
      "ウ": "一定量の理想気体ではpV/Tが一定である。最終体積は 1.5×(2.0/2.5)×(500/300)＝2.0 m³となる。",
      "エ": "2.5 m³は温度変化だけを考慮し、圧力を一定としたときの体積である。実際は圧力が上がったので、そこから2.0/2.5倍する。",
      "オ": "体積は温度の比に比例し、圧力の比に反比例する。圧力が増えたことも体積を増やす要因として扱うと過大になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q58",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択B（機械系）",
      "電流と電荷"
    ],
    "difficulty": 2,
    "question": "ある導体の断面を、4.0秒間に20 Cの電荷（電気量）が通過したとき、この導体に流れる電流の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "4.0 A",
      "イ": "5.0 A",
      "ウ": "10 A",
      "エ": "20 A",
      "オ": "80 A"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "電流は単位時間当たりに通過する電荷量である。20 Cを4.0秒で割ると5.0 C/s、すなわち5.0 Aとなる。",
    "choiceExplanations": {
      "ア": "4.0は時間の値である。電流はその時間に通過した電荷量を時間で割って求める。",
      "イ": "電流は単位時間当たりに通過する電荷量である。20 Cを4.0秒で割ると5.0 C/s、すなわち5.0 Aとなる。",
      "ウ": "10 Aが4.0秒間流れると通過電荷は40 Cとなる。設問の20 Cの2倍になってしまう。",
      "エ": "20 Cは4.0秒間の電荷の合計である。1秒当たりに換算すると20 Aにはならない。",
      "オ": "電荷量と時間を掛けるのではなく、電荷量を時間で割るとアンペアの単位になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q59",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "選択B（機械系）",
      "直列抵抗の分圧"
    ],
    "difficulty": 2,
    "question": "図のような回路において、20 Ωの抵抗にかかる電圧V₁と40 Ωの抵抗にかかる電圧V₂の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "10 V、10 V",
      "イ": "10 V、20 V",
      "ウ": "20 V、10 V",
      "エ": "20 V、20 V",
      "オ": "30 V、30 V"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "直列なので電流は共通で、30/(20＋40)＝0.5 Aである。オームの法則をそれぞれに適用し、V₁＝10 V、V₂＝20 Vを得る。",
    "choiceExplanations": {
      "ア": "V₁は妥当である。直列では抵抗が2倍の40 Ωの方に、2倍の電圧がかかる。",
      "イ": "直列なので電流は共通で、30/(20＋40)＝0.5 Aである。オームの法則をそれぞれに適用し、V₁＝10 V、V₂＝20 Vを得る。",
      "ウ": "二つの電圧の和は30 Vだが、分圧の大小が逆である。共通の電流が流れるときは大きい抵抗に大きい電圧がかかる。",
      "エ": "20 Vずつなら電圧降下の合計は40 Vになる。電源の30 Vと一致しない。",
      "オ": "各抵抗に電源と同じ電圧がかかるのは並列の場合である。直列の場合は二つの電圧降下を足すと30 Vになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q59.webp"
    ],
    "imageAltTexts": [
      "20 Ωと40 Ωの抵抗を30 Vの電源に直列につないだ回路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q60",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "電磁気",
    "topicTags": [
      "選択B（機械系）",
      "直線電流がつくる磁場"
    ],
    "difficulty": 2,
    "question": "図Ⅰのように、紙面に垂直な方向に張られた十分に長い直線状導体に、紙面の表側から裏側の向きに電流を流した。このとき、図Ⅰの㋐～㋓のうち、紙面に置いた方位磁針が図Ⅱの向きを示す場所として妥当なもののみを全て挙げているのはどれか。\nただし、地磁気の影響は無視するものとする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋓",
      "オ": "㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "表から裏へ向かう電流の回りの磁場は、右手の法則により時計まわりである。導体の左側㋓では磁場が上を向き、磁針のN極も上を指す。",
    "choiceExplanations": {
      "ア": "電流が紙面の奥に向かうので、右手の法則から磁場は時計まわりである。導体の上の㋐では磁針のN極は右を向く。",
      "イ": "㋐では磁場が右、㋒では左を向く。どちらも図Ⅱの上向きではない。",
      "ウ": "導体の右側㋑では時計まわりの磁場が下を向く。図ⅡではN極が上なので向きが反対である。",
      "エ": "右側の㋑と左側の㋓では、磁場の向きは上下で逆になる。N極が上を向くのは左側だけである。",
      "オ": "表から裏へ向かう電流の回りの磁場は、右手の法則により時計まわりである。導体の左側㋓では磁場が上を向き、磁針のN極も上を指す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q60.webp"
    ],
    "imageAltTexts": [
      "紙面の裏側に流れる電流とその周辺の観測点。別図にN極が上を向く磁針がある。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q61",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "片持ち梁の支点反力"
    ],
    "difficulty": 2,
    "question": "図Ⅰのように、長さ10 mの片持ち梁ABの梁全域に等分布荷重が作用するとき、壁側の支点Aに生じる曲げモーメント反力の大きさとして最も妥当なのはどれか。\nただし、曲げモーメントの向きは、図Ⅱの向きを正とし、梁の自重は無視するものとする。",
    "choices": {
      "ア": "5 kN·m",
      "イ": "10 kN·m",
      "ウ": "50 kN·m",
      "エ": "100 kN·m",
      "オ": "250 kN·m"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "等分布荷重の合力は5×10＝50 kNで、その作用線はAから5 mの位置にある。支点の反力モーメントの大きさは50×5＝250 kN·mである。",
    "choiceExplanations": {
      "ア": "5 kN/mは単位長さ当たりの荷重の強さである。モーメントを求めるには、全荷重とその作用位置の両方が必要となる。",
      "イ": "10 mは梁の全長であり、等分布荷重の合力の作用線は固定端から5 mの位置にある。そこでの荷重50 kNのモーメントを求める。",
      "ウ": "50 kNは梁にかかる鉛直荷重の合計である。固定端に生じる反力モーメントはその合力に5 mの腕を掛けた値である。",
      "エ": "梁にかかる荷重の合計は50 kNである。分布が一様なので中心の5 mに集中させて扱い、100 kN·mより大きな値を得る。",
      "オ": "等分布荷重の合力は5×10＝50 kNで、その作用線はAから5 mの位置にある。支点の反力モーメントの大きさは50×5＝250 kN·mである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q61.webp"
    ],
    "imageAltTexts": [
      "等分布荷重を受ける10 mの片持ち梁の図Ⅰと、正の曲げモーメントを示す図Ⅱ。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q62",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "長方形の断面二次モーメント"
    ],
    "difficulty": 2,
    "question": "図のような長方形断面の図心軸に関する断面二次モーメントとして最も妥当なのはどれか。",
    "choices": {
      "ア": "bh²/16",
      "イ": "bh²/12",
      "ウ": "bh³/16",
      "エ": "bh³/12",
      "オ": "bh⁴/4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "断面の幅は一定のbである。図心軸に対して b y² を−h/2からh/2まで積分すると bh³/12 になる。",
    "choiceExplanations": {
      "ア": "断面二次モーメントは面積に軸からの距離の二乗を掛けて積分する。単位は長さの4乗であり、bh²では足りない。",
      "イ": "分母の12は正しいが、断面二次モーメントでは高さが3乗になる。bh²は長さの3乗で、求める量の次元に合わない。",
      "ウ": "幅と高さの次数は合っている。図心軸からの座標yの二乗を−h/2からh/2まで幅bで積分すると、係数は1/16ではなく1/12である。",
      "エ": "断面の幅は一定のbである。図心軸に対して b y² を−h/2からh/2まで積分すると bh³/12 になる。",
      "オ": "bh⁴は長さの5乗であり、面積と距離の二乗の積である断面二次モーメントの次元に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q62.webp"
    ],
    "imageAltTexts": [
      "幅b、高さhの長方形断面と、断面の中点を水平に通る図心軸。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q63",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "単純梁のせん断力"
    ],
    "difficulty": 2,
    "question": "図のように、長さ10 mの単純梁ABに10 kNの集中荷重が梁に対して30°の角度で作用するとき、点Cで発生するせん断力の大きさとして最も妥当なのはどれか。\nただし、√3＝1.7とする。",
    "choices": {
      "ア": "1.5 kN",
      "イ": "3.0 kN",
      "ウ": "5.0 kN",
      "エ": "8.5 kN",
      "オ": "10.0 kN"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "鉛直荷重は10 sin 30°＝5.0 kNで、Bから3 mの位置に作用する。BまわりのモーメントよりAの鉛直反力は5.0×3/10＝1.5 kNで、荷重より左側のCのせん断力の大きさに等しい。",
    "choiceExplanations": {
      "ア": "鉛直荷重は10 sin 30°＝5.0 kNで、Bから3 mの位置に作用する。BまわりのモーメントよりAの鉛直反力は5.0×3/10＝1.5 kNで、荷重より左側のCのせん断力の大きさに等しい。",
      "イ": "せん断力を求めるには、斜めの荷重の鉛直成分だけを使う。10 kN全体に支点反力の比を掛けると鉛直反力を過大に見積もる。",
      "ウ": "5.0 kNは鉛直成分の全体である。AとBの二つの反力が分担し、荷重より左側のCのせん断力はAの反力に等しい。",
      "エ": "8.5 kNは荷重の水平成分である。水平成分は梁の軸力に関わり、せん断力を求めるのに用いるのは鉛直成分である。",
      "オ": "10.0 kNは斜めの荷重の大きさである。求めるには鉛直成分を取り、そのうちAが受け持つ分を計算する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q63.webp"
    ],
    "imageAltTexts": [
      "長さ10 mの単純梁ABと、Bから3 mの位置に斜め30度で加わる集中荷重。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q64",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "選択C（土木系）",
      "二層の液体のゲージ圧"
    ],
    "difficulty": 2,
    "question": "図のような2種類の液体1、2が入った容器があり、液体は2層に分かれている。大気圧を基準とした（大気圧を0 Paと考えた）ときの、この容器の底面に生じる液体1、2のみによる圧力（ゲージ圧）の大きさとして最も妥当なのはどれか。\nただし、重力加速度の大きさを9.8 m/s²とする。",
    "choices": {
      "ア": "3.00×10³ Pa",
      "イ": "4.74×10³ Pa",
      "ウ": "7.84×10³ Pa",
      "エ": "8.00×10³ Pa",
      "オ": "9.62×10³ Pa"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "上層の圧力増分は1.0×10³×9.8×0.2 Pa、下層は2.0×10³×9.8×0.3 Paである。これらを合計すると7.84×10³ Paになる。",
    "choiceExplanations": {
      "ア": "底面では、上層と下層の二つの圧力増分を足す。厚さ0.3 mの下層だけでも2.0×10³×9.8×0.3＝5.88×10³ Paとなる。",
      "イ": "層の厚さで重み付けせず、単に密度の平均を取ることはできない。各層で密度と厚さを掛け、重力加速度を掛けた値を足す。",
      "ウ": "上層の圧力増分は1.0×10³×9.8×0.2 Pa、下層は2.0×10³×9.8×0.3 Paである。これらを合計すると7.84×10³ Paになる。",
      "エ": "重力加速度を10 m/s²と丸めるとこの値になる。設問の9.8 m/s²を使うと、7.84×10³ Paである。",
      "オ": "厚さ0.5 m全体に大きい密度を使うと圧力を過大に見積もる。各層に固有の密度を用いる必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q64.webp"
    ],
    "imageAltTexts": [
      "二層の液体の密度と深さを示す図。上層は0.2 m、下層は0.3 m。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q65",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "選択C（土木系）",
      "台形水路の潤辺"
    ],
    "difficulty": 2,
    "question": "図のような底幅B、斜面の法勾配1：mの台形断面水路に、水深Hで水が流れているときの潤辺として最も妥当なのはどれか。",
    "choices": {
      "ア": "2H√(1＋m²)",
      "イ": "B＋2H√(1＋m²)",
      "ウ": "2H(1＋m)",
      "エ": "2H(1＋m²)",
      "オ": "B＋2H(1＋m²)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "水に接する斜面の長さは片側で √{H²＋(mH)²}＝H√(1＋m²) である。二つの斜面と底幅を合わせると B＋2H√(1＋m²) となる。",
    "choiceExplanations": {
      "ア": "この式は水に接する左右の斜面の長さの合計である。水と接する水路の底幅Bも含める。",
      "イ": "水に接する斜面の長さは片側で √{H²＋(mH)²}＝H√(1＋m²) である。二つの斜面と底幅を合わせると B＋2H√(1＋m²) となる。",
      "ウ": "斜面の長さは、鉛直距離と水平距離の単純な和で求められない。斜面長を直角三角形で求め、底幅も加える。",
      "エ": "斜面の長さの計算には 1＋m² の平方根が必要である。二つの斜面だけでなく底の長さも潤辺に入る。",
      "オ": "底幅を含める点は合っている。各斜面では三平方の定理を用いるので 1＋m² の平方根を取る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q65.webp"
    ],
    "imageAltTexts": [
      "水深H、底幅B、法勾配1対mの台形断面水路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q66",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "選択C（土木系）",
      "ベルヌーイ式の三つの水頭"
    ],
    "difficulty": 2,
    "question": "図のように、断面Ⅰにおける流速がv、圧力がp、基準面からの高さがzであるとき、断面Ⅰでの速度水頭、圧力水頭、位置水頭の組合せとして最も妥当なのはどれか。\nただし、水の密度をρ、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "v²/(2g)、p/(ρg)、z",
      "イ": "v²/(2g)、p/(ρg)、z²",
      "ウ": "v²/(2g)、pg/ρ、z²",
      "エ": "v⁴/(2g)、p/(ρg)、z",
      "オ": "v⁴/(2g)、pg/ρ、z²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "水頭は各エネルギーを水の単位重量当たりで表した高さである。運動に対応する v²/(2g)、圧力に対応する p/(ρg)、高さそのもののzを用いる。",
    "choiceExplanations": {
      "ア": "水頭は各エネルギーを水の単位重量当たりで表した高さである。運動に対応する v²/(2g)、圧力に対応する p/(ρg)、高さそのもののzを用いる。",
      "イ": "速度水頭と圧力水頭は妥当である。位置水頭は基準面からの高さzであり、二乗しない。",
      "ウ": "圧力水頭は圧力を水の単位体積重量ρgで割った値である。位置水頭も長さzで表す。",
      "エ": "圧力水頭と位置水頭は妥当である。速度水頭には運動エネルギーに対応する速度の二乗が入る。",
      "オ": "水頭は全て長さの単位をもつ。速度は二乗、圧力はρgで割り、高さにはzをそのまま使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q66.webp"
    ],
    "imageAltTexts": [
      "流速vと圧力pの断面Ⅰ、および基準面から断面までの高さz。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q67",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "飽和土の間げき比"
    ],
    "difficulty": 2,
    "question": "飽和土を用いて、体積150 cm³、質量300 gの供試体を作成した。この供試体を炉乾燥させたところ、質量が240 gとなった。このとき、この飽和土の間げき比として最も妥当なのはどれか。\nただし、水の密度を1.0 g/cm³とし、炉乾燥前の供試体の間げき部は水で満たされていたものとする。",
    "choices": {
      "ア": "0.25",
      "イ": "0.33",
      "ウ": "0.67",
      "エ": "1.25",
      "オ": "1.50"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "乾燥で減った質量60 gは間げきを満たしていた水なので、間げき体積は60 cm³となる。土粒子体積は150−60＝90 cm³であり、間げき比は60/90≒0.67である。",
    "choiceExplanations": {
      "ア": "60/240＝0.25は、水の質量を土粒子の質量で割った含水比である。間げき比は質量ではなく体積の比で求める。",
      "イ": "間げきの体積は60 cm³、土粒子の体積は90 cm³である。それらの比は0.33にはならない。",
      "ウ": "乾燥で減った質量60 gは間げきを満たしていた水なので、間げき体積は60 cm³となる。土粒子体積は150−60＝90 cm³であり、間げき比は60/90≒0.67である。",
      "エ": "間げき比の分子は間げき体積であり、この飽和試料では水の体積に等しい。60 cm³は90 cm³より小さいため、比が1を超えることはない。",
      "オ": "1.50は土粒子体積90 cm³を間げき体積60 cm³で割った値である。定義では分子と分母が逆になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q68",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "土粒子の粒径区分"
    ],
    "difficulty": 2,
    "question": "土粒子の粒径区分とその呼び名を示す次の表の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "シルト、粘土、礫",
      "イ": "シルト、礫、粘土",
      "ウ": "粘土、礫、シルト",
      "エ": "粘土、シルト、礫",
      "オ": "礫、シルト、粘土"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "表では粒径0.005 mm未満の細粒分が粘土、0.005 mm以上0.075 mm未満がシルトである。2 mm以上75 mm未満の粗粒分は礫である。",
    "choiceExplanations": {
      "ア": "㋒が礫である点は妥当である。粘土はシルトより小さい粒径の区分なので、最初の二つが逆である。",
      "イ": "礫は粒径2 mm以上の粗粒分である。0.005 mmから0.075 mmの細粒分に当たるのはシルトである。",
      "ウ": "最も小さい㋐が粘土である点は正しい。シルトは礫より粒径が小さく、㋑と㋒が逆になっている。",
      "エ": "表では粒径0.005 mm未満の細粒分が粘土、0.005 mm以上0.075 mm未満がシルトである。2 mm以上75 mm未満の粗粒分は礫である。",
      "オ": "シルトの位置は合っている。礫は㋒の粗粒分で、最も粒径の小さい㋐は粘土である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q68.webp"
    ],
    "imageAltTexts": [
      "細粒分、粗粒分、石分を分ける粒径区分の表。三つの呼称が空欄になっている。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q69",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "ダルシーの法則"
    ],
    "difficulty": 2,
    "question": "図のように、断面積2.0 m²、長さ6.0 mの土試料に、上流側と下流側の水頭差を4.0 mに保つように、水を流した。このとき、土試料における1秒当たりの透水量として最も妥当なのはどれか。\nただし、土試料の透水係数は3.0×10⁻⁴ m/sとし、上流と下流の水頭は変化しないものとする。",
    "choices": {
      "ア": "2.0×10⁻⁵ m³",
      "イ": "4.0×10⁻⁵ m³",
      "ウ": "1.0×10⁻⁴ m³",
      "エ": "2.0×10⁻⁴ m³",
      "オ": "4.0×10⁻⁴ m³"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "動水勾配は4.0/6.0である。ダルシーの法則で 3.0×10⁻⁴×(4.0/6.0)×2.0＝4.0×10⁻⁴ m³/s となる。",
    "choiceExplanations": {
      "ア": "動水勾配は水頭差4.0 mを試料長6.0 mで割った2/3である。この勾配を使うと透水量の値は選択肢より一桁以上大きくなる。",
      "イ": "透水係数に動水勾配と断面積を掛ける。透水係数の指数は10⁻⁴なので、積を計算しても10⁻⁵の桁にはならない。",
      "ウ": "透水係数と動水勾配の積は2.0×10⁻⁴ m/sである。試料断面の全体を通る体積を数えるには、さらに2.0 m²を掛ける。",
      "エ": "2.0×10⁻⁴はダルシー流速の値であり、単位はm/sである。断面積2.0 m²を掛けて体積流量に直す。",
      "オ": "動水勾配は4.0/6.0である。ダルシーの法則で 3.0×10⁻⁴×(4.0/6.0)×2.0＝4.0×10⁻⁴ m³/s となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q69.webp"
    ],
    "imageAltTexts": [
      "上流と下流で4.0 mの水頭差がある土試料の透水装置。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q70",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "地形図の縮尺"
    ],
    "difficulty": 2,
    "question": "実際の地表上にある2点A、Bについて、縮尺が1：25000の地形図を用いてAB間の長さを測定したところ4 cmであった。このとき、縮尺が1：100000の地形図におけるAB間の長さとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1 cm",
      "イ": "2 cm",
      "ウ": "4 cm",
      "エ": "8 cm",
      "オ": "16 cm"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "実際の距離は4×25000＝100000 cmである。これを新しい地図の分母100000で割ると1 cmになる。",
    "choiceExplanations": {
      "ア": "実際の距離は4×25000＝100000 cmである。これを新しい地図の分母100000で割ると1 cmになる。",
      "イ": "地図上の長さが2 cmなら、実際の距離は2 kmである。1：25000で4 cmの距離は1 kmである。",
      "ウ": "1：100000の地図は1：25000の地図の4分の1の縮尺である。同じ実際の距離は地図上で4 cmより短くなる。",
      "エ": "縮尺の分母が増えると、同じ実際の距離は地図上で短くなる。4 cmから8 cmへ長くなることはない。",
      "オ": "16 cmは分母の比4を掛けた値である。縮尺の分母が4倍になったので、地図上の長さは4で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q71",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "点高法による地盤高"
    ],
    "difficulty": 2,
    "question": "図Ⅰのような区画①と区画②から成る土地を、二つの区画の地盤高が等しくなるように平坦にならすとき、平坦にならした後の土地の地盤高として最も妥当なのはどれか。\nただし、図Ⅰの状態から土の総量は変化させないものとする。\nなお、区画①、②の水平投影面積はいずれも8 m²であり、各区画の四隅には、それぞれの地盤高が表示されている。また、土量は点高法による計算で求めることができ、図Ⅱの区画の土量Vは、区画の水平投影面積S及び四隅の地盤高 h_a、h_b、h_c、h_d を用いて次式で表される。\nV＝(S/4)(h_a＋h_b＋h_c＋h_d)",
    "choices": {
      "ア": "11.00 m",
      "イ": "11.25 m",
      "ウ": "11.50 m",
      "エ": "11.75 m",
      "オ": "12.00 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "四隅の平均高は区画①が12.00 m、区画②が11.50 mである。両区画の面積は等しいので、全体をならす高さはその平均11.75 mである。",
    "choiceExplanations": {
      "ア": "11.00 mは測点の最小値である。全体をその高さにすると、元の土の総量を保てない。",
      "イ": "11.25 mは全体の平均より低い。区画①と②の四隅の値は、同じ面積なので同じ重みで平均する。",
      "ウ": "区画②の四隅の平均は11.50 mである。より高い区画①の土量も計算に加える必要がある。",
      "エ": "四隅の平均高は区画①が12.00 m、区画②が11.50 mである。両区画の面積は等しいので、全体をならす高さはその平均11.75 mである。",
      "オ": "12.00 mは区画①だけの平均高である。より低い区画②と合わせて平均すると12.00 mを下回る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q71.webp"
    ],
    "imageAltTexts": [
      "8 m²ずつの二つの区画と四隅の地盤高、点高法の土量計算の模式図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q72",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "角測量器械の誤差"
    ],
    "difficulty": 2,
    "question": "角測量器械の誤差に関する次の表の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "消去できる、消去できる、軽減できる、消去できる",
      "イ": "消去できる、消去できる、軽減できる、消去できない",
      "ウ": "消去できる、消去できない、消去できる、消去できる",
      "エ": "消去できない、消去できる、消去できる、消去できる",
      "オ": "消去できない、消去できない、消去できる、消去できない"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "正位・反位の測定を組み合わせると、視準軸誤差、水平軸誤差、目盛盤の偏心誤差が打ち消される。目盛の不均一による誤差は、目盛盤全周を均等に使うことで軽減できる。",
    "choiceExplanations": {
      "ア": "正位・反位の測定を組み合わせると、視準軸誤差、水平軸誤差、目盛盤の偏心誤差が打ち消される。目盛の不均一による誤差は、目盛盤全周を均等に使うことで軽減できる。",
      "イ": "始めの三つは妥当である。目盛盤の偏心誤差も正位・反位の測定を利用して消去できる。",
      "ウ": "視準軸と目盛盤の偏心については妥当である。水平軸誤差は正反測定で消去でき、目盛の不均一は全周を使っても軽減にとどまる。",
      "エ": "視準軸の誤差は望遠鏡を反転して観測すると符号が変わるため、正反の平均で消去できる。目盛盤の不均一については消去ではなく軽減である。",
      "オ": "視準軸、水平軸、目盛盤偏心による誤差は、正位・反位の測定で消去できる。目盛の不均一は全周を使って平均化し、影響を軽減する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q72.webp"
    ],
    "imageAltTexts": [
      "角測量器械の誤差の種類、原因、消去・軽減方法の穴埋め表。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q73",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "選択C（土木系）",
      "単鉄筋長方形梁"
    ],
    "difficulty": 2,
    "question": "鉄筋コンクリート梁に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「鉄筋コンクリート梁は、コンクリートの中に鉄筋を埋め込み、コンクリートと鉄筋が一体となって荷重に抵抗するものである。梁の中央部に荷重が加わるとき、梁の上部では［㋐］応力が、下部では［㋑］応力が発生する。単鉄筋長方形梁とは、［㋒］側のみに鉄筋を入れた、断面が長方形の鉄筋コンクリート梁である。この構造において、梁上部に発生する［㋐］応力は、［㋓］で受け持つこととしている。」",
    "choices": {
      "ア": "圧縮、引張、圧縮、鉄筋",
      "イ": "圧縮、引張、引張、コンクリート",
      "ウ": "圧縮、引張、引張、鉄筋",
      "エ": "引張、圧縮、圧縮、コンクリート",
      "オ": "引張、圧縮、引張、鉄筋"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "中央荷重で梁が下向きにたわむと上部が圧縮、下部が引張となる。単鉄筋梁では引張側を鉄筋で補い、上側の圧縮はコンクリートで負担する。",
    "choiceExplanations": {
      "ア": "応力の上下の向きは妥当である。単鉄筋梁では引張側に鉄筋を配置し、圧縮はコンクリートが受け持つ。",
      "イ": "中央荷重で梁が下向きにたわむと上部が圧縮、下部が引張となる。単鉄筋梁では引張側を鉄筋で補い、上側の圧縮はコンクリートで負担する。",
      "ウ": "引張側に鉄筋を配置するのは妥当である。単鉄筋の構成では、圧縮側にはそのための鉄筋を配置せずコンクリートで圧縮を受け持つ。",
      "エ": "圧縮をコンクリートで負担する考え方は妥当である。中央部が下向きに曲がると上部は短くなるため、上部に圧縮が生じる。",
      "オ": "鉄筋を引張側に配置する点は妥当である。下部が引張、上部が圧縮となり、上部の圧縮はコンクリートが受け持つ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q74",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "耐震工学",
    "topicTags": [
      "選択C（土木系）",
      "橋の設計地震動"
    ],
    "difficulty": 2,
    "question": "地震に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「橋の耐震設計に当たっては、レベル1地震動又はレベル2地震動の設計地震動と、橋の重要度に応じて設計する必要がある。ここでのレベル1地震動とは、橋の設計供用期間中に発生する確率が［㋐］地震動のことであり、レベル2地震動とは、橋の設計供用期間中に発生する確率が［㋑］、［㋒］強度をもつ地震動のことである。」",
    "choices": {
      "ア": "高い、高く、小さな",
      "イ": "高い、低く、大きな",
      "ウ": "低い、高く、小さな",
      "エ": "低い、高く、大きな",
      "オ": "低い、低く、小さな"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "レベル1は設計供用期間中に発生する可能性が比較的高い。レベル2では発生確率が低いものの、強い地震動を想定する。",
    "choiceExplanations": {
      "ア": "レベル1の発生確率が比較的高い点は正しい。レベル2は供用期間中の発生確率が低く、強度が大きい地震動である。",
      "イ": "レベル1は設計供用期間中に発生する可能性が比較的高い。レベル2では発生確率が低いものの、強い地震動を想定する。",
      "ウ": "供用中に起こりやすい地震動をレベル1としている。レベル2は発生確率が低い強い地震動なので、この組合せでは対応が逆になる。",
      "エ": "レベル2を大きな強度とする点は妥当である。レベル1とレベル2の発生確率の高低が逆である。",
      "オ": "レベル2の発生確率は低いが、その強度は大きい。一方、レベル1は比較的発生する確率が高い地震動である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q75",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "選択C（土木系）",
      "セメントペーストと骨材"
    ],
    "difficulty": 2,
    "question": "コンクリートに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「セメントに水を混ぜたものを［㋐］といい、これに砂（細骨材）を混ぜたものを［㋑］という。さらに、［㋑］に石（粗骨材）を混ぜたものを［㋒］という。」",
    "choices": {
      "ア": "コンクリート、セメントペースト、モルタル",
      "イ": "セメントペースト、コンクリート、モルタル",
      "ウ": "セメントペースト、モルタル、コンクリート",
      "エ": "モルタル、コンクリート、セメントペースト",
      "オ": "モルタル、セメントペースト、コンクリート"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水とセメントを混ぜるとセメントペーストになる。細骨材を加えたものがモルタルで、さらに粗骨材を加えたものがコンクリートである。",
    "choiceExplanations": {
      "ア": "コンクリートには粗骨材が含まれる。セメントと水だけの段階ではセメントペーストである。",
      "イ": "セメントと水からセメントペーストを作る点は妥当である。砂を加えるとモルタルであり、さらに粗骨材が加わるとコンクリートになる。",
      "ウ": "水とセメントを混ぜるとセメントペーストになる。細骨材を加えたものがモルタルで、さらに粗骨材を加えたものがコンクリートである。",
      "エ": "モルタルは細骨材を加えた段階である。骨材を加える前のものがセメントペーストなので、最後の項目には当たらない。",
      "オ": "コンクリートに粗骨材が入る点は妥当である。水とセメントだけのセメントペーストが先で、砂入りのモルタルが後になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q76",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "基礎工学",
    "topicTags": [
      "選択C（土木系）",
      "直接基礎・杭基礎・ケーソン基礎"
    ],
    "difficulty": 2,
    "question": "基礎工に関する次の表の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "ケーソン基礎、杭基礎、直接基礎",
      "イ": "ケーソン基礎、直接基礎、杭基礎",
      "ウ": "杭基礎、直接基礎、ケーソン基礎",
      "エ": "直接基礎、ケーソン基礎、杭基礎",
      "オ": "直接基礎、杭基礎、ケーソン基礎"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "浅い支持地盤に載せる㋐は直接基礎、杭の先端や周面で支持する㋑は杭基礎である。水中などに箱状の構造体を設ける㋒はケーソン基礎である。",
    "choiceExplanations": {
      "ア": "杭が深い支持層に達する㋑は杭基礎である。浅い位置の地盤に荷重を直接伝える㋐は直接基礎である。",
      "イ": "㋐には地表に近い支持地盤があり、フーチングが直接載る。㋑は細長い部材で深部に荷重を伝える杭基礎である。",
      "ウ": "㋒がケーソン基礎である点は妥当である。基礎を浅い支持地盤に載せる㋐と、杭を使う㋑の名称が逆である。",
      "エ": "㋐は直接基礎である。細長い杭が複数ある㋑は杭基礎で、水中・地下構造物に使われる㋒がケーソン基礎となる。",
      "オ": "浅い支持地盤に載せる㋐は直接基礎、杭の先端や周面で支持する㋑は杭基礎である。水中などに箱状の構造体を設ける㋒はケーソン基礎である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q76.webp"
    ],
    "imageAltTexts": [
      "三種類の基礎工の構造模式図と特徴を比較する表。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q77",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "選択C（土木系）",
      "掘削土量と搬出計画"
    ],
    "difficulty": 2,
    "question": "土量2000 m³の地山を掘削し、掘削でほぐした土を1台当たりの容積2 m³のダンプトラック8台で運搬するとき、全てのほぐした土を運搬し終えるまでに必要な日数として最も妥当なのはどれか。\nただし、地山に対するほぐした土の量の変化率は1.2とし、ダンプトラック1台が1日にほぐした土を運搬する回数は6回とする。",
    "choices": {
      "ア": "25日",
      "イ": "26日",
      "ウ": "27日",
      "エ": "28日",
      "オ": "29日"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ほぐした土量は2000×1.2＝2400 m³である。8台が1日6回ずつ2 m³を運ぶと96 m³/日になるため、2400/96＝25日である。",
    "choiceExplanations": {
      "ア": "ほぐした土量は2000×1.2＝2400 m³である。8台が1日6回ずつ2 m³を運ぶと96 m³/日になるため、2400/96＝25日である。",
      "イ": "1日に96 m³を搬出でき、25日で2400 m³に達する。割り切れるので26日目まで延ばす必要はない。",
      "ウ": "地山の土量に変化率を掛けると2400 m³である。1日96 m³を運べるため、27日より前に完了する。",
      "エ": "28日なら96×28＝2688 m³を運べる計算になる。ほぐした土量は2400 m³で、必要な最小日数はそれより少ない。",
      "オ": "運搬すべき土量は変化率込みで2400 m³である。1日の輸送容量96 m³で割ると、29日ではなく25日となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q78",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "道路工学",
    "topicTags": [
      "選択C（土木系）",
      "舗装の維持修繕"
    ],
    "difficulty": 2,
    "question": "道路の舗装と管理に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「道路の舗装は、利用交通量・気候・地形などの地域の特性に合わせた様々な構造のものがあり、代表的なものとして、アスファルト舗装とコンクリート舗装がある。我が国では、施工や維持修繕が容易であるなどの理由から、［㋐］舗装が多い。［㋐］舗装は、交通量や自然条件などにより、ひび割れや変形などが生じるため、道路上の異常箇所に補修材を充填・穴埋めする［㋑］や、劣化した既設舗装表面の上部に新たな舗装材料の層を重ねる［㋒］をはじめとした維持修繕を行うことが重要である。」",
    "choices": {
      "ア": "アスファルト、オーバーレイ、パッチング",
      "イ": "アスファルト、パッチング、オーバーレイ",
      "ウ": "アスファルト、パッチング、マーキング",
      "エ": "コンクリート、オーバーレイ、マーキング",
      "オ": "コンクリート、マーキング、パッチング"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "施工や維持修繕のしやすさから、国内ではアスファルト舗装が多い。局所の穴埋めはパッチング、新たな舗装層を上に重ねるのはオーバーレイである。",
    "choiceExplanations": {
      "ア": "日本で多い舗装をアスファルトとした点は正しい。部分的な穴埋めがパッチング、舗装の上に層を重ねるのがオーバーレイである。",
      "イ": "施工や維持修繕のしやすさから、国内ではアスファルト舗装が多い。局所の穴埋めはパッチング、新たな舗装層を上に重ねるのはオーバーレイである。",
      "ウ": "最初の二つは妥当である。路面に線などを描くマーキングと異なり、舗装を重ねるのはオーバーレイである。",
      "エ": "施工や修繕がしやすいことを理由に広く使われている舗装はアスファルトである。異常箇所の穴埋めはパッチングという。",
      "オ": "マーキングは道路標示などを設けることであり、舗装の穴埋めではない。新たな舗装層を重ねる工法はオーバーレイである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q79",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "河川工学",
    "topicTags": [
      "選択C（土木系）",
      "ダムの構造形式"
    ],
    "difficulty": 2,
    "question": "ダムに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ アーチダムは、水をせき止める鉄筋コンクリートの遮水壁を多数のバットレスで支える形式のダムであり、フィルダムに分類される。\n㋑ 重力式ダムは、堤体の自重で水圧その他の外力に抵抗するもので、大部分がコンクリートで造られるダムであり、コンクリートダムに分類される。\n㋒ アースダムは、洪水時に河川のピーク流量を超えないよう、河川に接する土地の一部を堤防で囲むことで、一時的に水を貯留することができるダムであり、コンクリートダムに分類される。\n㋓ ロックフィルダムは、捨石とよばれる岩石塊を積み上げて築造するもので、軟弱地盤の上にも造ることができるダムであり、フィルダムに分類される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "重力式コンクリートダムは堤体の自重で外力に抵抗する。ロックフィルダムは岩石を盛り立てる形式で、剛なコンクリートダムに比べて基礎地盤の変形に追随しやすい。",
    "choiceExplanations": {
      "ア": "自重で外力に抵抗する㋑は妥当である。アーチダムはアーチ作用で水圧を両岸へ伝え、バットレスで支える形式とは異なる。",
      "イ": "アーチダムをバットレスの形式とする㋐は誤りである。土を盛り立てるアースダムはフィルダムの一種である。",
      "ウ": "重力式ダムの㋑は妥当である。河川の増水を一時的に受け入れる土地は遊水地に当たり、アースダムをそのように定義しない。",
      "エ": "重力式コンクリートダムは堤体の自重で外力に抵抗する。ロックフィルダムは岩石を盛り立てる形式で、剛なコンクリートダムに比べて基礎地盤の変形に追随しやすい。",
      "オ": "ロックフィルダムの㋓は妥当である。アースダムは土を盛り立てたフィルダムなので、コンクリートダムとする㋒は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q80",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "都市計画",
    "topicTags": [
      "選択C（土木系）",
      "都市計画の基本方針と区域区分"
    ],
    "difficulty": 2,
    "question": "都市計画に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「都市計画に関する基本的な方針を都市計画［㋐］といい、都市計画［㋐］には、都市計画区域の整備・開発及び保全の方針を定める区域［㋐］、市町村の都市計画に関する基本的な方針を定める市町村［㋐］などがある。\nまた、都市計画区域には、［㋑］と［㋒］の区分を都市計画に定めることができ、［㋑］は、既に市街地を形成している区域及びおおむね10年以内に優先的かつ計画的に市街化を図るべき区域であり、［㋒］は、市街化を抑制すべき区域である。」",
    "choices": {
      "ア": "景観形成ガイドライン、市街化区域、市街化調整区域",
      "イ": "景観形成ガイドライン、市街化調整区域、用途地域",
      "ウ": "マスタープラン、市街化区域、市街化調整区域",
      "エ": "マスタープラン、市街化調整区域、市街化区域",
      "オ": "マスタープラン、市街化調整区域、用途地域"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "都市計画の基本方針を示すのがマスタープランである。市街化を進める市街化区域と、市街化を抑える市街化調整区域を区分する。",
    "choiceExplanations": {
      "ア": "市街化区域と市街化調整区域の対応は妥当である。都市計画全体に関する基本方針はマスタープランという。",
      "イ": "都市計画に関する基本方針の名称はマスタープランである。市街化を図る区域を市街化調整区域とする点も逆である。",
      "ウ": "都市計画の基本方針を示すのがマスタープランである。市街化を進める市街化区域と、市街化を抑える市街化調整区域を区分する。",
      "エ": "マスタープランの名称は妥当である。市街化を進める区域と抑制する区域の名称が逆になっている。",
      "オ": "市街化を進めるのは市街化区域である。用途地域は建築物の用途などを規制するための区分で、市街化調整区域の同義語ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q81",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "水平荷重を受ける部材の反力"
    ],
    "difficulty": 2,
    "question": "図のような荷重を受ける部材の支点Aでの鉛直方向反力V_Aと水平方向反力H_Aの大きさの組合せとして最も妥当なのはどれか。\nただし、部材の自重は無視するものとする。",
    "choices": {
      "ア": "4/3 kN、0 kN",
      "イ": "4/3 kN、1/2 kN",
      "ウ": "4/3 kN、1 kN",
      "エ": "5/6 kN、1/2 kN",
      "オ": "5/6 kN、1 kN"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "水平方向は1 kNの分布荷重の合力を左向きの反力で打ち消す。右支点まわりで 2×2−1×1.5−3V_A＝0 より V_A＝5/6 kNである。",
    "choiceExplanations": {
      "ア": "右支点は水平方向の力を受けない。左上に1 kNの水平合力があるので、Aの水平反力を0にはできない。",
      "イ": "水平に分布する荷重の合力は、1 kN/mを1 mにわたって加えた1 kNである。1/2 kNでは水平力がつり合わない。",
      "ウ": "水平の反力は妥当である。鉛直の反力を求めるモーメントの式には、高さ1.5 mに作用する水平合力による回転も入れる。",
      "エ": "鉛直反力は妥当である。水平荷重の合力の作用点は区間の中央だが、合力の大きさは全区間の荷重を足した1 kNである。",
      "オ": "水平方向は1 kNの分布荷重の合力を左向きの反力で打ち消す。右支点まわりで 2×2−1×1.5−3V_A＝0 より V_A＝5/6 kNである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q81.webp"
    ],
    "imageAltTexts": [
      "二支点で支えられた部材に、水平の等分布荷重と下向きの集中荷重が加わる図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q82",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "二方向の断面二次モーメント"
    ],
    "difficulty": 2,
    "question": "図のような断面において、X軸に関する断面2次モーメントI_XとY軸に関する断面2次モーメントI_Yの比I_X/I_Yとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1/8",
      "イ": "1/4",
      "ウ": "4",
      "エ": "8",
      "オ": "16"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "幅4a、高さ2aなので、I_X＝(4a)(2a)³/12、I_Y＝(2a)(4a)³/12である。比は(2a/4a)²＝1/4になる。",
    "choiceExplanations": {
      "ア": "軸に直交する辺は三乗となるが、軸と平行な辺も一次で式に入る。比を取ると辺長比の三乗ではなく二乗が残る。",
      "イ": "幅4a、高さ2aなので、I_X＝(4a)(2a)³/12、I_Y＝(2a)(4a)³/12である。比は(2a/4a)²＝1/4になる。",
      "ウ": "4はI_Y/I_Xの比である。設問は軸Xの値を軸Yの値で割るので、結果は1未満となる。",
      "エ": "軸Yからの最大距離が軸Xからの最大距離の2倍である。そこからI_Yが大きくなるため、I_X/I_Yは8にはならない。",
      "オ": "断面二次モーメントの次元は長さの4乗だが、同じ断面の二つの軸を比べると面積は同じである。比に残るのは距離の二乗の効果である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q82.webp"
    ],
    "imageAltTexts": [
      "幅4a、高さ2aの長方形と、図心を通るX軸・Y軸。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q83",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "木材の性質と年輪"
    ],
    "difficulty": 2,
    "question": "木材に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 木材は、木表側に凹に反る。\n㋑ 集成材は、通常の木材よりも品質にばらつきが大きく、構造材には用いられない。\n㋒ 樹木は、春季には成長が活発で、細胞が大きく、軟弱な淡色の層を、秋季には成長が低下し、細胞が小さく、強硬で密度の高い濃色の層を形成し、その繰返しによって年輪ができる。\n㋓ 木材は、大気中において、約90 ℃に達すると自然に発火する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "木材の収縮は方向によって異なるため、板は木表側に凹に反りやすい。成長の活発な時期の淡色で軟らかい層と、成長が緩やかな時期の濃色で密な層が年輪になる。",
    "choiceExplanations": {
      "ア": "木表側へ凹に反る㋐は妥当である。集成材は材料を選別して積層することで品質のばらつきを抑えられ、構造用の製品もある。",
      "イ": "木材の収縮は方向によって異なるため、板は木表側に凹に反りやすい。成長の活発な時期の淡色で軟らかい層と、成長が緩やかな時期の濃色で密な層が年輪になる。",
      "ウ": "㋐は妥当である。木材が大気中で約90 ℃に達しただけで自然に発火するという㋓は、通常の発火温度を正しく述べていない。",
      "エ": "早材と晩材による年輪の形成を述べた㋒は妥当である。構造用集成材は柱や梁にも利用されるので㋑は誤りである。",
      "オ": "年輪の成り立ちは㋒のとおりである。木材が約90 ℃で直ちに自然発火するという㋓は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q84",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "コンクリートの強度とクリープ"
    ],
    "difficulty": 2,
    "question": "コンクリートに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ コンクリートの圧縮強度から、引張強度、せん断強度、付着強度など、ほかの強度をおおよそ推定できる。\n㋑ クリープとは、コンクリートに一定の荷重が長時間作用しているとき、時間の経過とともにひずみが増大する現象のことをいう。\n㋒ 骨材の強度は、一般に、硬化したセメントペーストの強度より小さい。\n㋓ コンクリートの調合強度は、気温に左右されず設定されている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "圧縮強度は、試験結果や経験式を通じて他の強度を概算する基準になる。荷重を一定に保っても時間とともに変形が増えるのがクリープである。",
    "choiceExplanations": {
      "ア": "圧縮強度は、試験結果や経験式を通じて他の強度を概算する基準になる。荷重を一定に保っても時間とともに変形が増えるのがクリープである。",
      "イ": "㋐は妥当である。通常の良質な骨材は硬化したセメントペーストより強い場合が多く、㋒の一般化は誤りである。",
      "ウ": "定荷重下のひずみ増加を表す㋑は妥当である。一般的な骨材が硬化セメントペーストより弱いとする㋒は妥当でない。",
      "エ": "㋑は妥当である。気温によって硬化や強度発現が変わるため、調合強度を決めるときは施工時期の温度を考慮する。",
      "オ": "一般の骨材を硬化セメントペーストより弱いとする㋒は誤りである。温度による強度発現の違いを無視する㋓も誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q85",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "鋼材のヤング係数と強度"
    ],
    "difficulty": 2,
    "question": "鋼に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 一般に常温では、鋼材の密度や熱伝導率は、含有する炭素量が多いほど増大する傾向にある。\n㋑ ヤング係数は、比例限度以下のひずみ度に対する応力度の割合である。\n㋒ 一般の鋼材の引張応力度は、引張強度の方が上降伏点より小さい。\n㋓ 鋼の密度は、一般に、コンクリートの密度よりも大きい。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ヤング係数は応力―ひずみ線図の比例範囲における傾きである。また、鋼は通常のコンクリートより密度が大きい。",
    "choiceExplanations": {
      "ア": "炭素量が増えるほど密度や熱伝導率がともに増すという傾向はない。また、引張強度は一般に上降伏点より大きい。",
      "イ": "鋼がコンクリートより高密度である点は妥当である。炭素量の増加とともに鋼の熱伝導率が増大するという㋐は誤りである。",
      "ウ": "比例する範囲での応力とひずみの比をヤング係数とする㋑は正しい。上降伏点を過ぎてから加工硬化で応力がさらに増加するので㋒は妥当でない。",
      "エ": "ヤング係数は応力―ひずみ線図の比例範囲における傾きである。また、鋼は通常のコンクリートより密度が大きい。",
      "オ": "鋼とコンクリートの密度の比較は妥当である。引張強度は引張試験での最大応力であり、通常は上降伏点を上回る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q86",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "木造軸組の壁と土台"
    ],
    "difficulty": 2,
    "question": "木構造に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 大壁とは、壁の仕上げ材が柱面の外側に施され、柱が見えない壁をいう。\n㋑ 小屋組と緊結された軒部分の梁を胴差といい、屋根の荷重を一様に分散して支えるものである。\n㋒ 土台は、軸組最下部の水平材であり、上部構造を安定させるために、柱の下端を連結し、上部からの荷重を基礎に伝える働きがある。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "大壁は仕上げで柱が見えなくなる壁である。土台は木造軸組の下部で柱脚をつなぎ、上の荷重を基礎に伝える。",
    "choiceExplanations": {
      "ア": "柱が仕上げで隠れるという大壁の説明は妥当である。柱脚を連結して荷重を基礎へ伝えるという土台の説明も正しい。",
      "イ": "大壁の説明は正しい。軒に沿って小屋組を載せる横架材は軒桁であり、胴差は主に上下の階を区切る位置に用いる。",
      "ウ": "大壁は仕上げで柱が見えなくなる壁である。土台は木造軸組の下部で柱脚をつなぎ、上の荷重を基礎に伝える。",
      "エ": "土台の説明は妥当である。胴差は主に階の境にある横架材であり、小屋組を支える軒桁とは区別される。",
      "オ": "土台の説明だけでなく、壁面を柱の外に設けて柱を隠すという大壁の説明も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q87",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "鉄筋コンクリート構造"
    ],
    "difficulty": 2,
    "question": "鉄筋コンクリート構造に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 一般に、柱の間隔は、5～7 m程度を標準とする。\n㋑ フラットスラブ構造とは、梁を設けず、スラブが直接柱に緊結される構造である。\n㋒ 帯筋の間隔を大きくすればするほど、柱の粘り強さが増す。\n㋓ コンクリートは圧縮力に非常に弱いため、圧縮力が生ずる部分には、圧縮強度の大きい鉄筋を配置して補う。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "鉄筋コンクリート造の一般的な柱間隔として、5～7 m程度が目安となる。フラットスラブでは梁を設けず、床版を柱に直接支持させる。",
    "choiceExplanations": {
      "ア": "鉄筋コンクリート造の一般的な柱間隔として、5～7 m程度が目安となる。フラットスラブでは梁を設けず、床版を柱に直接支持させる。",
      "イ": "柱間隔の目安を述べた㋐は妥当である。帯筋を密に配置するとコンクリートを拘束できるため、間隔を大きくするほど粘るとする㋒は誤りである。",
      "ウ": "㋐の柱間隔は妥当である。コンクリートは引張に弱い一方で圧縮には強いので、弱点を逆に述べた㋓は妥当でない。",
      "エ": "フラットスラブの㋑は妥当である。帯筋の間隔を大きく取るとコンクリートの拘束効果は弱くなり、㋒の説明とは逆になる。",
      "オ": "フラットスラブの定義は合っている。鉄筋コンクリートでは、主にコンクリートの弱い引張方向を鉄筋で補う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q88",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "鋼構造の座屈と補剛"
    ],
    "difficulty": 2,
    "question": "鋼構造に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 鋼は炭素量の違いによって性質が変わる。一般に、鋼構造では最硬鋼が用いられる。\n㋑ 細長比が大きい部材ほど、許容圧縮応力度は小さい。\n㋒ 鋼材は部材として剛性が低いため、座屈などを考慮して部材の計算を行い、構造全体の変形に対しても注意する必要がある。\n㋓ プレート梁のスチフナーは、溶接によって二つの梁を継いだときにウェブプレートに設ける継手である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "細長い圧縮部材は座屈しやすいため、細長比が大きいほど許容圧縮応力度は小さくなる。鋼材は強度が高く小さな断面を使える分、部材の座屈や全体変形の検討が重要である。",
    "choiceExplanations": {
      "ア": "細長比が大きいと座屈しやすく、㋑は妥当である。構造には靱性や溶接性なども求められるため、最硬鋼が一般的という㋐は誤りである。",
      "イ": "薄く細長い鋼部材の座屈と全体変形に注意する㋒は妥当である。建築鋼構造では一般に最硬鋼を使うわけではない。",
      "ウ": "鋼材を選ぶときは構造用としての靱性や加工・溶接のしやすさも重視される。また、スチフナーはウェブを補剛する部材で、梁の継手ではない。",
      "エ": "細長い圧縮部材は座屈しやすいため、細長比が大きいほど許容圧縮応力度は小さくなる。鋼材は強度が高く小さな断面を使える分、部材の座屈や全体変形の検討が重要である。",
      "オ": "座屈や変形に注意する必要はある。スチフナーはウェブの局部座屈を防ぐ補剛材であり、梁をつなぐ継手とは区別される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q89",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "建築施工",
    "topicTags": [
      "選択D（建築系）",
      "コンクリートの打継ぎと打込み"
    ],
    "difficulty": 2,
    "question": "コンクリート工事に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ コンクリートの打継ぎ面は、打ち継ぐコンクリートと一体となるよう、打継ぎ面にある脆弱なコンクリートを除去しておく。\n㋑ コンクリートは、目的の位置にできるだけ近づけて打ち込むこととし、横流しをしてはいけない。\n㋒ 均質なコンクリートになるように、コンクリートの練混ぜから打込み完了までの時間は半日以上としなければならない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "打継ぎ面の弱い表層を除去して、新しいコンクリートが付着しやすくする。打込みは所定の位置に近づけ、横流しによる材料分離を避ける。",
    "choiceExplanations": {
      "ア": "打継ぎ面の弱い表層を除去して、新しいコンクリートが付着しやすくする。打込みは所定の位置に近づけ、横流しによる材料分離を避ける。",
      "イ": "打継ぎ面を処理する㋐は妥当である。練混ぜ後は硬化が進むので、打込みまで半日以上空けるという㋒は誤りである。",
      "ウ": "目的の位置に近づけて打ち込む㋑は妥当である。打継ぎ面の脆弱な部分を除去する㋐も含める必要がある。",
      "エ": "横流しを避ける㋑は妥当である。練混ぜから打込みまでは長く空けるのではなく、規定された時間内で完了させる。",
      "オ": "打込みに先立って半日以上待つとコンクリートの施工性が低下する。均質に仕上げるためにも、練混ぜ後の時間を管理して速やかに打ち込む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q90",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "建築施工",
    "topicTags": [
      "選択D（建築系）",
      "鉄筋・鉄骨・土工の用語"
    ],
    "difficulty": 2,
    "question": "建築工事に関する用語とそれに対応する工事名の組合せ㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ スペーサー ― 鉄筋工事\n㋑ ベースプレート ― コンクリート工事\n㋒ コールドジョイント ― 木工事\n㋓ ボイリング ― 土工事",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "スペーサーは鉄筋と型枠の間隔を確保して、必要なかぶり厚さを保つ。ボイリングは、土工事で掘削底に作用する上向きの浸透流で砂などが動く現象である。",
    "choiceExplanations": {
      "ア": "鉄筋のかぶり厚を確保するスペーサーは鉄筋工事で用いる。ベースプレートは主に鉄骨柱脚で用いる鋼板である。",
      "イ": "スペーサーと鉄筋工事の対応は妥当である。コールドジョイントはコンクリートの打重ね面に生じる不連続であり、木工事の用語ではない。",
      "ウ": "スペーサーは鉄筋と型枠の間隔を確保して、必要なかぶり厚さを保つ。ボイリングは、土工事で掘削底に作用する上向きの浸透流で砂などが動く現象である。",
      "エ": "ベースプレートは主に鉄骨柱の根元で荷重を基礎へ伝える部材である。コールドジョイントも木工事ではなくコンクリート工事に関係する。",
      "オ": "掘削時のボイリングは土工事の現象である。コールドジョイントを木工事に対応させた㋒は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q91",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "選択D（建築系）",
      "温熱環境の六要素とPMV"
    ],
    "difficulty": 2,
    "question": "温熱感覚の指標に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「気温・湿度・［㋐］・［㋑］の室内気候の4要素に、着衣量と作業量を合わせた6要素を考慮した温熱感覚の指標としては、新有効温度（ET*）や［㋒］がある。」",
    "choices": {
      "ア": "風速、日照率、作用温度（OT）",
      "イ": "風速、放射熱、予測平均温冷感申告（PMV）",
      "ウ": "風速、放射熱、作用温度（OT）",
      "エ": "気圧、日照率、作用温度（OT）",
      "オ": "気圧、放射熱、予測平均温冷感申告（PMV）"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "気温と湿度のほか、風速と放射熱が室内環境の要素である。これに着衣量と作業量を加えて温冷感を予測する指標がPMVである。",
    "choiceExplanations": {
      "ア": "風速は温熱環境の要素である。ただし人体と周囲との熱のやりとりには日照率ではなく放射熱を用い、六要素を使う代表的な指標にはPMVがある。",
      "イ": "気温と湿度のほか、風速と放射熱が室内環境の要素である。これに着衣量と作業量を加えて温冷感を予測する指標がPMVである。",
      "ウ": "環境の四要素は合っている。作用温度は主に気温と平均放射温度の効果を合わせるもので、六要素を用いる指標としてここに当たるのはPMVである。",
      "エ": "室内温熱環境の基本の四要素には気圧と日照率ではなく、対流に関わる風速と放射熱を含める。",
      "オ": "放射熱とPMVは合っている。残る環境要素は気圧ではなく風速である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q92",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "選択D（建築系）",
      "残響・周波数・音圧レベル"
    ],
    "difficulty": 2,
    "question": "音響に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 同じ床面積の部屋の場合、一般に、天井が高い方が残響時間が短い。\n㋑ マスキング現象とは、ある音が別の音の存在によって聞こえにくくなる現象をいう。\n㋒ 音の高低は、音の周波数によって決まり、一般に、20～20,000 Hzの周波数では、周波数が大きいほど高い音として聞こえる。\n㋓ 同じ部屋に60 dBの音源が二つ存在すると、音の強さのレベルは、一つ存在するときよりも約6 dB増加し、約66 dBとなる。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "別の音によって目的の音が聞こえにくくなる現象がマスキングである。可聴範囲では一般に周波数が高いほど高い音に聞こえる。",
    "choiceExplanations": {
      "ア": "可聴範囲では高い周波数ほど高く聞こえるため、㋒は妥当である。天井が高いと室容積が増え、吸音条件が同程度なら残響時間は長くなる。",
      "イ": "吸音力との関係を考えると、容積が大きい部屋で残響時間が短いとは限らない。同じ強度の音が二つ重なった場合の増加は、通常約3 dBである。",
      "ウ": "別の音によって目的の音が聞こえにくくなる現象がマスキングである。可聴範囲では一般に周波数が高いほど高い音に聞こえる。",
      "エ": "マスキングの説明は正しい。60 dBの音源が独立に二つなら強度は2倍となり、増加は10 log₁₀2≒3 dBである。",
      "オ": "㋒は妥当である。独立した同レベルの二つの音源の強さを足すと、約63 dBになり66 dBにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q93",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "建築設備",
    "topicTags": [
      "選択D（建築系）",
      "給水設備の加圧方式"
    ],
    "difficulty": 2,
    "question": "給水設備の給水方式に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 水道直結直圧式は、水道本管の水圧を利用して給水する方式をいい、中高層の集合住宅や事務所に適する。\n㋑ 高置タンク式は、水道引込管からの水を受水タンクに貯水し、それを揚水ポンプで高置タンクに揚水した後に、水の重力によって必要な箇所に給水する方式をいい、一戸建て住宅・低層集合住宅に適する。\n㋒ 圧力タンク式は、受水タンクから給水ポンプで圧力タンクに給水し、タンク内の空気を圧縮・加圧させ、その圧力で必要な箇所へ給水する方式をいう。この方式では、給水圧力は建築物内での水の使用状況により変動する。\n㋓ ポンプ直送式は、受水タンクから給水ポンプで直接建築物内の必要な箇所へ給水する方式をいう。この方式では、建築物内での水の使用状況に応じて給水ポンプを制御するため、給水圧力の変動が少ない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "圧力タンク式では圧縮空気の圧力で水を送り、使用量に応じて圧力が変わる。ポンプ直送式ではポンプの制御により給水圧力の変動を抑えられる。",
    "choiceExplanations": {
      "ア": "直結直圧式は利用可能な本管水圧の範囲で低層の建物などに用いる。高置タンク式は、重力で供給するための水頭が必要で、中高層の建物などで使われる。",
      "イ": "圧力タンク式の仕組みを述べた㋒は妥当である。直結直圧式を中高層建物向きとする㋐には、本管の圧力だけでは上層に必要な圧力を確保しにくいという問題がある。",
      "ウ": "ポンプ直送式は需要に応じてポンプを制御できる。水道直結直圧式は同じようにポンプで増圧する方式ではないので、中高層向きとする㋐は妥当でない。",
      "エ": "ポンプ直送式の説明は妥当である。高置タンク式では受水槽・揚水ポンプ・高置水槽が必要であり、典型例を一戸建てや低層集合住宅とする㋑は妥当でない。",
      "オ": "圧力タンク式では圧縮空気の圧力で水を送り、使用量に応じて圧力が変わる。ポンプ直送式ではポンプの制御により給水圧力の変動を抑えられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q94",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "建築設備",
    "topicTags": [
      "選択D（建築系）",
      "建物の消火設備"
    ],
    "difficulty": 2,
    "question": "消火設備に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ スプリンクラー設備は、火災を感知した人間が、人力で散水栓を作動し散水して消火する設備であることから、不特定多数の人が集う百貨店などの施設には設置されない。\n㋑ 屋内消火栓設備は、屋内に設置された消火栓箱の中に収納されたホース、ノズルなどを引き出し放水して消火に当たる設備で、事務所、学校、病院などに設置される。\n㋒ 二酸化炭素消火設備は、二酸化炭素（炭酸ガス）を噴射ヘッド又はノズルから放射し、空気中の水蒸気との反応による冷却作用によって消火する設備で、電気施設、美術館などに設置され、消火対象室に人がいる場合でも安全である。\n㋓ 泡消火設備は、泡ヘッドを天井に設置し、空気泡又は化学泡を放射して可燃性液体の表面を覆い、窒息作用により消火する設備で、飛行機の格納庫や駐車場などに設置される。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "屋内消火栓は屋内のホースやノズルを使って放水する設備である。泡消火設備は可燃性液体の表面を覆って空気との接触を断つので、格納庫や駐車場などで用いられる。",
    "choiceExplanations": {
      "ア": "スプリンクラーには火災時に自動で散水する方式があり、百貨店でも設置される。二酸化炭素による消火は主に酸素濃度を下げる作用によるため、人がいる場所で安全とはいえない。",
      "イ": "泡で可燃性液体の表面を覆う㋓は妥当である。スプリンクラーは人が散水栓を操作することを前提とする設備ではない。",
      "ウ": "屋内消火栓の仕組みを述べた㋑は妥当である。二酸化炭素は消火のために空気中の酸素濃度を下げるので、在室者に危険がある。",
      "エ": "屋内消火栓は屋内のホースやノズルを使って放水する設備である。泡消火設備は可燃性液体の表面を覆って空気との接触を断つので、格納庫や駐車場などで用いられる。",
      "オ": "泡消火設備の㋓は妥当である。二酸化炭素の放射は在室者に窒息などの危険をもたらすため、㋒の安全性の説明が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q95",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "選択D（建築系）",
      "建築各部の標準的な寸法"
    ],
    "difficulty": 2,
    "question": "建築設計における各部位とその標準的な寸法の組合せ㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 事務所の基準階の階高 ― 2.7 m\n㋑ 台所の調理台の高さ ― 0.8 m\n㋒ トイレブースの扉幅 ― 0.5 m",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "台所の調理台は、調理する人が立って作業しやすいようにおおむね0.8 m程度の高さにする。事務所の階高2.7 mとトイレブースの扉幅0.5 mは、設問の標準寸法として小さい。",
    "choiceExplanations": {
      "ア": "調理台の高さ0.8 mは一般的な寸法である。事務所の階高には天井内の設備や床の構造の厚さが入るため、天井高と同程度の2.7 mでは小さい。",
      "イ": "基準階の階高は床から次の階の床までを取るので、室内の天井高より大きくなる。扉幅0.5 mも標準的な寸法としては小さい。",
      "ウ": "台所の調理台は、調理する人が立って作業しやすいようにおおむね0.8 m程度の高さにする。事務所の階高2.7 mとトイレブースの扉幅0.5 mは、設問の標準寸法として小さい。",
      "エ": "調理台の高さは妥当である。トイレブースの扉は出入りに必要な幅を確保するため、0.5 mでは標準より小さい。",
      "オ": "トイレブースの出入り口の標準的な扉幅として0.5 mは小さい。標準的な値としては調理台の高さ0.8 mが妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q96",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "選択D（建築系）",
      "集合住宅の共用動線"
    ],
    "difficulty": 2,
    "question": "集合住宅の建築計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 片廊下型とは、廊下を片側に配し、これに各住戸を結んだ形式で、プライバシーを確保しやすく、遮音、採光などの居住性に優れている。\n㋑ 中廊下型とは、光庭を挟んだ2本の共用廊下に面して各住戸を連続して並べた形式で、遮音、採光などの居住性に優れている。\n㋒ 階段室型とは、階段室で各住戸を結んだ形式で、採光、通風などの居住性に優れている。\n㋓ メゾネット型とは、1住戸を2層以上で構成した形式で、廊下のない階は通風に優れている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "階段室型は住戸の両側を外部に開きやすく、採光や通風を確保しやすい。メゾネット型では、二層以上で構成する住戸のうち共用廊下のない階で通風を取りやすい。",
    "choiceExplanations": {
      "ア": "片廊下型では廊下側の開口で、通行者の視線や音が問題になることがある。中廊下型は一つの中央廊下の両側に住戸を配置する形式である。",
      "イ": "メゾネット型の説明は妥当である。片廊下型では廊下に面する住戸側のプライバシーや遮音の確保に配慮が必要になる。",
      "ウ": "階段室型の説明は妥当である。光庭を挟んだ二本の廊下で構成する形式を中廊下型とする点が誤りである。",
      "エ": "メゾネット型は一住戸の内部に複数階を設ける。中廊下型では住戸を一つの中央廊下の両側に配置するため、記述の光庭と二本の廊下の構成とは異なる。",
      "オ": "階段室型は住戸の両側を外部に開きやすく、採光や通風を確保しやすい。メゾネット型では、二層以上で構成する住戸のうち共用廊下のない階で通風を取りやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q97",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "選択D（建築系）",
      "建築作品と設計者"
    ],
    "difficulty": 2,
    "question": "建築物とその設計者の組合せ㋐～㋓のうち、正しいもののみを挙げているのはどれか。\n㋐ 世界平和記念聖堂 ― 丹下健三\n㋑ 中銀カプセルタワービル ― 黒川紀章\n㋒ ヤマトインターナショナル ― 槇文彦\n㋓ 地中美術館 ― 安藤忠雄",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "黒川紀章は中銀カプセルタワービルを設計した。直島にある地中美術館は安藤忠雄の設計である。",
    "choiceExplanations": {
      "ア": "中銀カプセルタワービルは黒川紀章の設計である。広島の世界平和記念聖堂の設計者は村野藤吾である。",
      "イ": "地中美術館は安藤忠雄の設計である。世界平和記念聖堂は丹下健三ではなく村野藤吾の作品である。",
      "ウ": "中銀カプセルタワービルと黒川紀章の対応は正しい。ヤマトインターナショナルは原広司らの設計である。",
      "エ": "黒川紀章は中銀カプセルタワービルを設計した。直島にある地中美術館は安藤忠雄の設計である。",
      "オ": "地中美術館の設計者は合っている。ヤマトインターナショナルの設計を槇文彦とする組合せは誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q98",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "選択D（建築系）",
      "用途地域の建築制限"
    ],
    "difficulty": 2,
    "question": "用途地域に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 第一種低層住居専用地域とは、低層住宅に係る良好な住居の環境を保護するために定める地域をいい、小学校を建てることはできない。\n㋑ 第二種住居地域とは、主として住居の環境を保護するために定める地域をいい、ホテル、カラオケボックスを建てることはできない。\n㋒ 商業地域とは、主として商業その他の業務の利便を増進するために定める地域をいい、住宅や小規模の工場も建てることができる。\n㋓ 工業専用地域とは、工場の利便を増進するために定める地域をいい、住宅を建てることはできない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "商業地域は商業・業務の利便を増進するが、建築基準法の制限内で住宅や小規模工場も立地できる。工業専用地域では住宅を建てられない。",
    "choiceExplanations": {
      "ア": "第一種低層住居専用地域にも小学校を建てられる。第二種住居地域でホテルやカラオケボックスが一律に禁止されているわけでもない。",
      "イ": "工業専用地域で住宅を建てられないことは正しい。第一種低層住居専用地域には小学校も建てられるので㋐は誤りである。",
      "ウ": "商業地域には住宅や所定の小規模工場を建てられる。第二種住居地域では、条件を満たすホテルやカラオケボックスの建築が可能である。",
      "エ": "工業専用地域に住宅を建てられない点は正しい。第二種住居地域におけるホテルやカラオケボックスを一律に不可とする㋑は妥当でない。",
      "オ": "商業地域は商業・業務の利便を増進するが、建築基準法の制限内で住宅や小規模工場も立地できる。工業専用地域では住宅を建てられない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q99",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "選択D（建築系）",
      "居室の平均天井高さ"
    ],
    "difficulty": 2,
    "question": "図Ⅰのような平面の居室において、東西方向の断面が図Ⅱのようであったとすると、この居室の平均天井高さとして最も妥当なのはどれか。",
    "choices": {
      "ア": "2.25 m",
      "イ": "2.40 m",
      "ウ": "2.55 m",
      "エ": "2.70 m",
      "オ": "2.85 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "断面積は傾斜部分が4×(1.5＋3)/2＝9 m²、水平部分が6×3＝18 m²である。奥行きが一定なので、断面積27 m²を幅10 mで割り2.70 mになる。",
    "choiceExplanations": {
      "ア": "2.25 mは天井が傾く4 mの区間だけの平均高さである。天井が3 mで一定の残り6 mも考慮する。",
      "イ": "傾斜部と水平部を、各区間の長さで重み付けする必要がある。断面積を出して長さ10 mで割れば2.40 mより高い。",
      "ウ": "傾斜部は幅4 mで平均高さ2.25 m、水平部は幅6 mで高さ3 mである。両部分をこの幅で重み付けして平均する。",
      "エ": "断面積は傾斜部分が4×(1.5＋3)/2＝9 m²、水平部分が6×3＝18 m²である。奥行きが一定なので、断面積27 m²を幅10 mで割り2.70 mになる。",
      "オ": "全幅が高さ3 mなら断面積は30 m²である。傾斜により三角形分の3 m²が減るため、断面積27 m²で計算する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-gijutsu/q99.webp"
    ],
    "imageAltTexts": [
      "居室の平面図と東西断面図。天井は最初の4 mで1.5 mから3 mに上がり、残り6 mでは3 m。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-gijutsu-q100",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "選択D（建築系）",
      "法律・政令・条例・省令の制定"
    ],
    "difficulty": 2,
    "question": "建築法規㋐～㋓とそれを制定する機関の名称の組合せとして最も妥当なのはどれか。\n㋐ 建築基準法\n㋑ 建築基準法施行令\n㋒ 建築基準法施行条例\n㋓ 建築基準法施行規則",
    "choices": {
      "ア": "国会、内閣、地方公共団体の議会、国土交通大臣",
      "イ": "国会、内閣、国土交通大臣、地方公共団体の議会",
      "ウ": "内閣、国会、国土交通大臣、地方公共団体の議会",
      "エ": "内閣、国会、地方公共団体の議会、国土交通大臣",
      "オ": "国土交通大臣、内閣、国会、地方公共団体の議会"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "建築基準法は国会が制定する法律で、その施行令は内閣が制定する政令である。施行条例は地方公共団体の議会が定め、施行規則は国土交通大臣が定める省令である。",
    "choiceExplanations": {
      "ア": "建築基準法は国会が制定する法律で、その施行令は内閣が制定する政令である。施行条例は地方公共団体の議会が定め、施行規則は国土交通大臣が定める省令である。",
      "イ": "法律と政令の制定機関は合っている。条例は地方公共団体の議会、施行規則は国土交通大臣が定めるので、後二つが逆である。",
      "ウ": "法律は国会が制定し、施行令は内閣が定める。地方公共団体の条例を国土交通大臣が制定するわけでもない。",
      "エ": "条例と施行規則の制定者は合っている。法律と政令の制定機関が逆であり、国会が法律、内閣が政令を制定する。",
      "オ": "内閣が施行令を定める点は妥当である。建築基準法は法律なので国会が制定し、地方の施行条例は地方公共団体の議会が定める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016210.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。"
  }
];
