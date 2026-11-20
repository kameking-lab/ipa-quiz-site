import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_GAKKO_2025_GAKKA_SUGAKU: Question[] = [
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q01",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "複素数の実部と虚部",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "実数x、yが次の等式を満たすとき、x＋yの値はいくらか。\n x/(1−2i)＋y/(2＋i)＝1\nただし、iは虚数単位を表す。",
    "choices": {
      "ア": "3",
      "イ": "10/3",
      "ウ": "11/3",
      "エ": "4",
      "オ": "13/3"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "両分母を実数化すると(x＋2y＋(2x−y)i)/5＝1である。実部と虚部を比較するとx＋2y＝5、2x−y＝0なのでx＝1、y＝2、和は3になる。",
    "choiceExplanations": {
      "ア": "両分母を実数化すると(x＋2y＋(2x−y)i)/5＝1である。実部と虚部を比較するとx＋2y＝5、2x−y＝0なのでx＝1、y＝2、和は3になる。",
      "イ": "虚部が0となるにはy＝2xが必要である。このときx＋2y＝5x＝5よりx＝1なので、和は10/3にはならない。",
      "ウ": "実部からx＋2y＝5、虚部からy＝2xを得る。この連立方程式はx＝1、y＝2と定まる。",
      "エ": "和が4でy＝2xならx＝4/3となるが、そのとき実部はx＝4/3になり、右辺の実部1に一致しない。",
      "オ": "虚部の条件y＝2xを代入すると左辺は実数xとなる。x＝1なのでx＋y＝3である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q02",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "交わる弦と三平方の定理",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "図のように、円周上に4点A、B、C、Dがあり、線分ACと線分BDが点Pで垂直に交わっている。AP＝√3、BP＝1、CP＝2√3のとき、線分CDの長さはいくらか。",
    "choices": {
      "ア": "7/2",
      "イ": "4",
      "ウ": "3√3",
      "エ": "4√3",
      "オ": "7"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "交わる弦についてAP×CP＝BP×PDなので、PD＝6である。よってCD＝√((2√3)²＋6²)＝4√3となる。",
    "choiceExplanations": {
      "ア": "弦の積の関係によりPD＝√3×2√3÷1＝6となる。斜辺CDはPDより長く、7/2にはならない。",
      "イ": "CDは直角三角形CPDの斜辺で、既に一方の直角を挟む辺PDが6である。",
      "ウ": "CD²はCP²＋PD²＝12＋36＝48であり、3√3の平方である27とは一致しない。",
      "エ": "交わる弦についてAP×CP＝BP×PDなので、PD＝6である。よってCD＝√((2√3)²＋6²)＝4√3となる。",
      "オ": "7はBPとPDの和で、弦BDの長さである。CDはCとDを結ぶ別の弦である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2025/gakka-sugaku/q02.webp"
    ],
    "imageAltTexts": [
      "円内で点Pにおいて直交する2本の弦ACとBD"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q03",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "さいころの確率",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "1から6までの目が1つずつ書かれたサイコロを考える。このサイコロを3個同時に投げるとき、出た目の数の和が6となる確率はいくらか。",
    "choices": {
      "ア": "1/72",
      "イ": "1/24",
      "ウ": "5/108",
      "エ": "1/20",
      "オ": "5/72"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "和が6となる目は順番を除くと(1,1,4)、(1,2,3)、(2,2,2)で、並べ方は計3＋6＋1＝10通りである。全216通りに対する確率は10/216＝5/108となる。",
    "choiceExplanations": {
      "ア": "1/72は216通りのうち3通りに相当するが、1、2、3の並べ方だけでも6通りある。",
      "イ": "1/24は216通り中9通りに相当するが、1、1、4の3通りと1、2、3の6通りに加え、2、2、2の1通りもある。",
      "ウ": "和が6となる目は順番を除くと(1,1,4)、(1,2,3)、(2,2,2)で、並べ方は計3＋6＋1＝10通りである。全216通りに対する確率は10/216＝5/108となる。",
      "エ": "さいころの目は216通りすべて等確率で、和が6の10通りを割って得る確率は1/20より小さい。",
      "オ": "5/72であれば該当する出方は15通りだが、正整数3個で和6となる順序付きの出方は10通りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q04",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "放物線の頂点と通過点",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "qを定数とする。点(2, q)を頂点とし、点(1, 6)を通り、y軸との交点のy座標が12である放物線をグラフとする2次関数が存在するとき、qはいくらか。",
    "choices": {
      "ア": "−1",
      "イ": "1",
      "ウ": "3",
      "エ": "4",
      "オ": "6"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "頂点の形y＝a(x−2)²＋qに二つの通過点を代入し、a＋q＝6、4a＋q＝12を得る。差からa＝2、したがってq＝4である。",
    "choiceExplanations": {
      "ア": "q＝−1にすると点(1, 6)を通る係数は7となるが、そのときy軸との交点のy座標は27となる。",
      "イ": "q＝1にすると点(1, 6)を通る係数は5で、x＝0における値は21になってしまう。",
      "ウ": "q＝3なら点(1, 6)から係数は3となり、x＝0のときの値は4×3＋3＝15となる。",
      "エ": "頂点の形y＝a(x−2)²＋qに二つの通過点を代入し、a＋q＝6、4a＋q＝12を得る。差からa＝2、したがってq＝4である。",
      "オ": "q＝6では点(1, 6)を通る条件からa＝0になり、2次関数にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q05",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "余弦定理で求める辺",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "図のように、四角形ABCDにおいて、AB＝5、BC＝4、CD＝6、∠ABC＝(2/3)π、∠CDA＝(3/4)πとなっている。このとき、辺DAの長さはいくらか。",
    "choices": {
      "ア": "(−3√2＋√78)/2",
      "イ": "−3√2＋√43",
      "ウ": "3√2−√3",
      "エ": "√5",
      "オ": "3√2＋√3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "△ABCで余弦定理を用いるとAC²＝25＋16−40cos(2π/3)＝61である。DAをxとすると、△CDAより61＝36＋x²＋6√2xとなり、正の解は−3√2＋√43である。",
    "choiceExplanations": {
      "ア": "△ABCからAC²＝61であり、△CDAで余弦定理を使うとDAにはDA²＋6√2·DA＝25が必要になる。この選択肢の値では左辺が25に届かない。",
      "イ": "△ABCで余弦定理を用いるとAC²＝25＋16−40cos(2π/3)＝61である。DAをxとすると、△CDAより61＝36＋x²＋6√2xとなり、正の解は−3√2＋√43である。",
      "ウ": "3√2−√3の平方に6√2倍の項を加えると25を超える。これは余弦定理から得られるDAの条件に合わない。",
      "エ": "DA＝√5なら、△CDAの余弦定理からAC²＝41＋6√10となり、△ABCで得た61とは異なる。",
      "オ": "DA＝3√2＋√3ではDA²＋6√2·DAが25を大幅に超え、対角線ACの長さが△ABCから求めたものと一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2025/gakka-sugaku/q05.webp"
    ],
    "imageAltTexts": [
      "四角形ABCDの辺AB、BC、CDの長さと角ABC・CDA"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q06",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "代金を比較する不等式",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "x円のお菓子Aと180円のお菓子Bを合わせて12個買うことを考える。お菓子Aを4個買うことにして無料の箱に入れる場合の代金は、1800円以上であったが、お菓子Aを7個買うことにして120円の箱に入れる場合の代金よりも安かった。このようなxの範囲として正しいのはどれか。",
    "choices": {
      "ア": "x＜90",
      "イ": "90≦x＜140",
      "ウ": "140≦x",
      "エ": "140＜x",
      "オ": "180＜x"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "4x＋1440≧1800よりx≧90で、4x＋1440＜7x＋1020よりx＞140となる。両方を満たすのはx＞140である。",
    "choiceExplanations": {
      "ア": "4個買う場合の代金は4x＋1440円なので、1800円以上となるにはx≧90が必要である。",
      "イ": "xが140未満では4x＋1440が7x＋1020より大きくなる。4個の場合が安いという条件に反する。",
      "ウ": "x＝140を含めると4個の場合と7個の場合がともに2000円となり、4個の方が安いという条件を満たさない。",
      "エ": "4x＋1440≧1800よりx≧90で、4x＋1440＜7x＋1020よりx＞140となる。両方を満たすのはx＞140である。",
      "オ": "例えばx＝150なら無料の箱の場合は2040円、有料の箱の場合は2070円であり、どちらの条件も満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q07",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "解と係数の関係",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "α、βが2次方程式2x²＋3x＋4＝0の2つの解であるとき、(α³−β³)/(α²−β²)の値はいくらか。",
    "choices": {
      "ア": "−3/2",
      "イ": "−1/6",
      "ウ": "3/2",
      "エ": "2",
      "オ": "6"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "α＋β＝−3/2、αβ＝2である。差の因数α−βを約分して{(α＋β)²−αβ}/(α＋β)とすると、(1/4)/(−3/2)＝−1/6になる。",
    "choiceExplanations": {
      "ア": "−3/2はα＋βである。求める式は差の因数を約分すると、(α²＋αβ＋β²)をこの和で割った値になる。",
      "イ": "α＋β＝−3/2、αβ＝2である。差の因数α−βを約分して{(α＋β)²−αβ}/(α＋β)とすると、(1/4)/(−3/2)＝−1/6になる。",
      "ウ": "分子を差の因数で約分した後のα²＋αβ＋β²は1/4だが、分母のα＋βは負の値なので、全体は正にはならない。",
      "エ": "2はαβであり、αβは約分後の分子(α＋β)²−αβに用いる値である。",
      "オ": "差の比を約分した分子は1/4、分母は−3/2である。分母で割ると正の6にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q08",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二つの円の外接",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "aを定数とする。xy平面上の円x²＋y²＝9と円(x−a)²＋(y＋1)²＝4が外接するようなaの値として正しいのはどれか。",
    "choices": {
      "ア": "0",
      "イ": "±2",
      "ウ": "±2√3",
      "エ": "±2√6",
      "オ": "±2√42"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "中心(0,0)と(a,−1)の距離は√(a²＋1)である。外接するにはこれが3＋2＝5なので、a²＝24、a＝±2√6となる。",
    "choiceExplanations": {
      "ア": "a＝0なら中心間距離は1で、半径3と2の差に等しい。これは内接に当たる。",
      "イ": "a＝±2では中心間距離は√5であり、外接に必要な半径の和5より小さい。",
      "ウ": "a＝±2√3では中心間距離は√13となり、外接に必要な5にはならない。",
      "エ": "中心(0,0)と(a,−1)の距離は√(a²＋1)である。外接するにはこれが3＋2＝5なので、a²＝24、a＝±2√6となる。",
      "オ": "a＝±2√42とすると中心間距離は13となり、二つの円は離れる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q09",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角関数の倍角",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "0≦θ≦πとする。(3/7)cos 2θ＋cos θ＝1のとき、cos θの値はいくらか。",
    "choices": {
      "ア": "−2",
      "イ": "−1/2",
      "ウ": "1/3",
      "エ": "7/13",
      "オ": "5/6"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "cos 2θ＝2cos²θ−1を使い、u＝cos θとおくと6u²＋7u−10＝(6u−5)(u＋2)＝0となる。余弦の範囲にある解は5/6である。",
    "choiceExplanations": {
      "ア": "倍角の公式でcos θを未知数とした方程式には−2も解として現れるが、余弦は−1以上1以下である。",
      "イ": "cos θ＝−1/2ならcos 2θも−1/2であり、左辺は−5/7となって1に等しくならない。",
      "ウ": "cos θ＝1/3のとき、倍角の式によりcos 2θ＝−7/9となるので、問題の式の左辺は0になる。",
      "エ": "cos θをuとすると、満たすべき二次方程式は(6u−5)(u＋2)＝0である。7/13はどちらの因子も0にしない。",
      "オ": "cos 2θ＝2cos²θ−1を使い、u＝cos θとおくと6u²＋7u−10＝(6u−5)(u＋2)＝0となる。余弦の範囲にある解は5/6である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q10",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "対数方程式の真数条件",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "方程式log₃(2x−1)＝log₉(x＋2)＋2の解として正しいのはどれか。",
    "choices": {
      "ア": "−7/4",
      "イ": "2/3",
      "ウ": "3",
      "エ": "14",
      "オ": "23"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "真数条件はx＞1/2であり、底を3にそろえると(2x−1)²＝81(x＋2)となる。整理すると(x−23)(4x＋7)＝0なので、真数条件を満たすのは23である。",
    "choiceExplanations": {
      "ア": "方程式を対数の外で整理すると−7/4も候補になるが、真数2x−1＞0の条件を満たさない。",
      "イ": "x＝2/3では2x−1＝1/3なので左辺は−1であるが、x＋2＞1なので右辺は2より大きい。",
      "ウ": "x＝3なら(2x−1)²＝25で、対数の底をそろえた式が要求する81(x＋2)＝405と一致しない。",
      "エ": "x＝14のとき(2x−1)²＝729であり、81(x＋2)＝1296である。",
      "オ": "真数条件はx＞1/2であり、底を3にそろえると(2x−1)²＝81(x＋2)となる。整理すると(x−23)(4x＋7)＝0なので、真数条件を満たすのは23である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q11",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "微分と閉区間の最小値",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "関数f(x)＝4x³−3x²−6x−1（−1≦x≦2）の最小値はいくらか。",
    "choices": {
      "ア": "−33",
      "イ": "−6",
      "ウ": "−2",
      "エ": "7/4",
      "オ": "8"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "f′(x)＝6(2x＋1)(x−1)より、x＝−1/2は極大、x＝1は極小である。端点ではf(−1)＝−2、f(2)＝7なので、最小値はf(1)＝−6である。",
    "choiceExplanations": {
      "ア": "導関数から極値の候補となるxは−1/2と1である。これらと区間の端で関数値を比べても−33にはならない。",
      "イ": "f′(x)＝6(2x＋1)(x−1)より、x＝−1/2は極大、x＝1は極小である。端点ではf(−1)＝−2、f(2)＝7なので、最小値はf(1)＝−6である。",
      "ウ": "−2は左端x＝−1の値である。区間の内部のx＝1ではより小さい−6になる。",
      "エ": "7/4はx＝1で取る−6より大きい。内部の極小と区間の端点の値を比べる必要がある。",
      "オ": "x＝2での値は7で、それより小さい値も取るため、8は最小値にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q12",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "等比数列の部分和",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "等比数列{aₙ}の初項から第n項までの和をSₙ＝a₁＋…＋aₙとするとき、Tₙ＝Sₙ＋1で定まる数列{Tₙ}は初項3、公比3の等比数列となった。このとき、数列{aₙ}の初項と公比の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "−1/3、1/3",
      "イ": "2、2",
      "ウ": "2、3",
      "エ": "3、4",
      "オ": "4、2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Tₙ＝3ⁿでSₙ＝3ⁿ−1なので、a₁＝2である。n≧2ではaₙ＝Sₙ−Sₙ₋₁＝2×3ⁿ⁻¹となり、公比は3である。",
    "choiceExplanations": {
      "ア": "T₁＝S₁＋1＝a₁＋1が3であるため、a₁は−1/3ではなく2である。",
      "イ": "a₁＝2だが、a₂＝T₂−T₁＝9−3＝6となるため、公比は2ではなく3である。",
      "ウ": "Tₙ＝3ⁿでSₙ＝3ⁿ−1なので、a₁＝2である。n≧2ではaₙ＝Sₙ−Sₙ₋₁＝2×3ⁿ⁻¹となり、公比は3である。",
      "エ": "3はT₁の値であり、a₁はT₁から1を引く。また、a₂は6なのでa₁に対する比は3である。",
      "オ": "a₁はT₁−1であるため4にはならず、公比はa₂÷a₁＝6÷2となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2025-annual-gakka-sugaku-q13",
    "exam": "kaijo-hoan-gakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "ベクトルの内積と長さ",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "|a|＝2、|b|＝3である2つのベクトルa、bのなす角が(2/3)πであるとき、|4a＋b|の値はいくらか。",
    "choices": {
      "ア": "−3",
      "イ": "0",
      "ウ": "7",
      "エ": "√85",
      "オ": "11"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "a·b＝2×3×cos(2π/3)＝−3だから、|4a＋b|²＝16×4＋8×(−3)＋9＝49である。長さは正の平方根7となる。",
    "choiceExplanations": {
      "ア": "−3はaとbの内積であり、ベクトルの長さ|4a＋b|は負にならない。",
      "イ": "4aとbは長さが8と3で、互いに打ち消し合うことはない。したがって|4a＋b|は0より大きい。",
      "ウ": "a·b＝2×3×cos(2π/3)＝−3だから、|4a＋b|²＝16×4＋8×(−3)＋9＝49である。長さは正の平方根7となる。",
      "エ": "4aとbのなす角は120°で、内積を含む項は負である。二乗の大きさは85ではなく64−24＋9である。",
      "オ": "11は4aの長さ8とbの長さ3の和である。同じ方向を向いていれば等しくなるが、この場合は120°の角があるので11より短い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016378.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 13。解説は過去問AIの独自作成。"
  }
];
