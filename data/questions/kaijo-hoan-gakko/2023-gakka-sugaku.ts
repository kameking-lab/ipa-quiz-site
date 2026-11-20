import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_GAKKO_2023_GAKKA_SUGAKU: Question[] = [
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q01",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "命題と条件",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "m、nを自然数とする。次の記述のア、イ、ウに当てはまるものをA〜Dから選んだ組合せとして正しいのはどれか。\n・m²が奇数であることは、mが奇数であるための［ア］。\n・mが30の約数であることは、mが15の約数であるための［イ］。\n・m又はnが8の倍数であることは、mnが8の倍数であるための［ウ］。\nA. 必要条件であるが十分条件でない\nB. 十分条件であるが必要条件でない\nC. 必要十分条件である\nD. 必要条件でも十分条件でもない",
    "choices": {
      "ア": "アB・イB・ウA",
      "イ": "アB・イD・ウC",
      "ウ": "アC・イA・ウB",
      "エ": "アC・イA・ウC",
      "オ": "アC・イD・ウB"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "平方は元の整数と同じ偶奇になり、15の約数はすべて30の約数だが逆は成り立たない。片方が8の倍数なら積も8の倍数であり、m＝2、n＝4のような反例があるため逆は成り立たない。",
    "choiceExplanations": {
      "ア": "mの偶奇は平方しても変わらないため、アは十分条件だけでなく必要条件でもある。",
      "イ": "mが15の約数なら必ず30の約数になるので、イには必要条件を表すAが入る。",
      "ウ": "平方は元の整数と同じ偶奇になり、15の約数はすべて30の約数だが逆は成り立たない。片方が8の倍数なら積も8の倍数であり、m＝2、n＝4のような反例があるため逆は成り立たない。",
      "エ": "m＝2、n＝4なら積は8だが、mもnも8の倍数ではないのでウは必要十分条件にならない。",
      "オ": "15の約数はすべて30の約数でもあるので、イに必要性を否定するDは入らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q02",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二次関数",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "3点（−2，−12）、（−1，0）、（3，8）を通る放物線をグラフとする2次関数として正しいのはどれか。",
    "choices": {
      "ア": "y＝x²＋3x＋2",
      "イ": "y＝−x²＋9x＋10",
      "ウ": "y＝−x²＋3x−2",
      "エ": "y＝−2x²＋6x＋8",
      "オ": "y＝−2x²−6x＋4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "x＝−2、−1、3を順に代入すると−12、0、8となる。したがって、グラフは指定された3点をすべて通る。",
    "choiceExplanations": {
      "ア": "x＝−2を代入すると4−6＋2＝0となり、（−2，−12）を通らない。",
      "イ": "x＝3を代入すると−9＋27＋10＝28となり、（3，8）を通らない。",
      "ウ": "x＝−1を代入すると−1−3−2＝−6となり、（−1，0）を通らない。",
      "エ": "x＝−2、−1、3を順に代入すると−12、0、8となる。したがって、グラフは指定された3点をすべて通る。",
      "オ": "x＝−1を代入すると−2＋6＋4＝8となり、（−1，0）を通らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q03",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "正弦定理と面積",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "AB＝6、AC＝10、∠BAC＝120°である△ABCの外接円の半径をR、内接円の半径をrとするとき、R/rの値はいくらか。",
    "choices": {
      "ア": "4/3",
      "イ": "√3",
      "ウ": "4√3/3",
      "エ": "14/3",
      "オ": "14√3/3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "余弦定理よりBC＝14なので、正弦定理でR＝14/√3となる。面積15√3を半周長15で割るとr＝√3になり、R/r＝14/3を得る。",
    "choiceExplanations": {
      "ア": "余弦定理で得た辺BC＝14を使い、正弦定理から外接円の半径は14/√3になる。この値を内接円の半径r＝√3で割るため、分子は4ではなく14になる。",
      "イ": "√3は三角形の面積15√3を半周長15で割った内接円の半径である。求めるのは外接円の半径と内接円の半径の比である。",
      "ウ": "外接円の半径はBC/(2sin120°)＝14/√3であり、BCに4を用いると辺の長さを取り違える。",
      "エ": "余弦定理よりBC＝14なので、正弦定理でR＝14/√3となる。面積15√3を半周長15で割るとr＝√3になり、R/r＝14/3を得る。",
      "オ": "14√3/3は14/√3の有理化で得る外接円の半径である。これをさらに内接円の半径√3で割る必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q04",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "確率",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "大人5人、子ども3人が一列に並ぶとき、どの子どもも隣り合わない確率はいくらか。",
    "choices": {
      "ア": "3/14",
      "イ": "2/7",
      "ウ": "5/14",
      "エ": "3/7",
      "オ": "1/2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "大人5人を並べたときにできる6か所の隙間から3か所を選ぶと₆C₃＝20通りある。子どもの位置の全組合せ₈C₃＝56通りで割ると5/14となる。",
    "choiceExplanations": {
      "ア": "全配置を子どもの位置の選び方で数えると56通りある。両端を含む6か所から子どもの入る3か所を選ぶと20通りなので、3/14に相当する12通りにはならない。",
      "イ": "大人の前後と大人同士の間の6か所から3か所を選ぶ。条件を満たすのは20通りで、2/7の分子に対応する16通りより多い。",
      "ウ": "大人5人を並べたときにできる6か所の隙間から3か所を選ぶと₆C₃＝20通りある。子どもの位置の全組合せ₈C₃＝56通りで割ると5/14となる。",
      "エ": "3/7は条件を満たす位置の組合せを24通りとする値だが、子どもの入る隙間を3か所選ぶ組合せは20通りである。",
      "オ": "どの子どもも隣り合わない配置は56通りのうち20通りなので、全体の半数にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q05",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "組合せ",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "正十角形の①対角線の本数と②10個の頂点のうちの3個を頂点とする三角形の個数の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "①30本・②110個",
      "イ": "①35本・②110個",
      "ウ": "①35本・②120個",
      "エ": "①45本・②110個",
      "オ": "①45本・②120個"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "2頂点を結ぶ45本から辺10本を引くので対角線は35本になる。3頂点の組合せは₁₀C₃＝120通りで、すべて三角形を作る。",
    "choiceExplanations": {
      "ア": "各頂点から引ける対角線は自分自身と隣の2頂点を除く7本ある。両端で数えた重複を除くと10×7÷2＝35本となる。",
      "イ": "対角線の35本は正しい。どの3頂点を選んでも三角形を作れるので、その数は₁₀C₃＝120個である。",
      "ウ": "2頂点を結ぶ45本から辺10本を引くので対角線は35本になる。3頂点の組合せは₁₀C₃＝120通りで、すべて三角形を作る。",
      "エ": "45本は10個から2頂点を選んで結べる線分をすべて数えた値であり、十角形の10本の辺を含む。",
      "オ": "三角形の120個は正しい。対角線は全45本の線分のうち、外周の10本の辺を除いた35本である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q06",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "重心と面積比",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "△ABCの重心をGとし、直線AGと直線BCとの交点をDとするとき、△GBDと△ABCの面積比として正しいのはどれか。",
    "choices": {
      "ア": "1：3",
      "イ": "1：4",
      "ウ": "1：5",
      "エ": "1：6",
      "オ": "1：7"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "DはBCの中点なので底辺の比は1/2である。Gは中線ADを2：1に分けて高さの比が1/3になるため、面積の比は1：6となる。",
    "choiceExplanations": {
      "ア": "GからBCまでの高さはAからBCまでの高さの1/3である。底辺BDもBCの半分なので、面積比は高さの比だけでは決まらない。",
      "イ": "1：4は底辺と高さがともに半分のときの比である。DはBCの中点だが、Gは中線ADを2：1に内分する。",
      "ウ": "重心の性質によりGD/AD＝1/3で、底辺の比BD/BC＝1/2である。この二つを掛けると1/5にはならない。",
      "エ": "DはBCの中点なので底辺の比は1/2である。Gは中線ADを2：1に分けて高さの比が1/3になるため、面積の比は1：6となる。",
      "オ": "底辺の比1/2に、GD/ADから求まる高さの比1/3を掛ければよい。重心の位置を使って求めた面積比の分母は7ではなく6である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-sugaku/q06.webp"
    ],
    "imageAltTexts": [
      "三角形ABCと重心Gおよび辺BCの中点Dを示す原図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q07",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "実係数方程式の複素根",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "a、bは実数の定数とする。3次方程式 x³＋ax²＋6x＋b＝0 の一つの解が−1−iであるとき、他の解のうち実数の解として正しいのはどれか。ただし、iは虚数単位とする。",
    "choices": {
      "ア": "−2",
      "イ": "−√2",
      "ウ": "−1",
      "エ": "0",
      "オ": "1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "実係数なので−1＋iも解であり、これらの和は−2、積は2である。残る解をtとするとxの係数が2−2t＝6となるので、t＝−2である。",
    "choiceExplanations": {
      "ア": "実係数なので−1＋iも解であり、これらの和は−2、積は2である。残る解をtとするとxの係数が2−2t＝6となるので、t＝−2である。",
      "イ": "残る解が−√2なら、解の2個ずつの積の和は2＋2√2となる。これは与えられたxの係数6と一致しない。",
      "ウ": "残る解が−1なら、他の2解との積の和は2であり、共役な2解の積を加えてもxの係数は4となる。",
      "エ": "残る解を0とすると、その解を含む積が消え、xの係数は共役な2解の積2になる。",
      "オ": "残る解を1とすると、共役な2解の積2にそれらの和−2を加えることになり、xの係数は0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q08",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "点の線対称",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "直線 2x−2y−1＝0 に関して、点（2，9/2）と対称な点の座標として正しいのはどれか。",
    "choices": {
      "ア": "（4，1）",
      "イ": "（4，3/2）",
      "ウ": "（9/2，1）",
      "エ": "（5，1）",
      "オ": "（5，3/2）"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "この点との中点は（7/2，3）で直線上にある。両点を結ぶ線分の傾きも−1で、直線の傾き1と垂直になる。",
    "choiceExplanations": {
      "ア": "この点と元の点を結ぶ線分の傾きは（1−9/2）÷（4−2）＝−7/4である。対称軸の傾き1に垂直な傾き−1を満たさない。",
      "イ": "この点との中点は（3，3）であり、代入すると2x−2y−1＝−1になる。中点が対称軸上にない。",
      "ウ": "この点と元の点（2，9/2）を結ぶ線分の傾きは−7/5なので、傾き1の対称軸と直交しない。",
      "エ": "線分の中点は（7/2，11/4）となり、2x−2y−1＝1/2である。中点が対称軸を通るという条件を満たさない。",
      "オ": "この点との中点は（7/2，3）で直線上にある。両点を結ぶ線分の傾きも−1で、直線の傾き1と垂直になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q09",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角関数と符号",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "π/2≦θ≦πとする。sinθ＋cosθ＝1/√3のとき、cosθ−sinθの値はいくらか。",
    "choices": {
      "ア": "−√3",
      "イ": "−√15/3",
      "ウ": "−√3/3",
      "エ": "√3/3",
      "オ": "√15/3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二つの式の二乗和が2なので、（cosθ−sinθ）²＝2−1/3＝5/3である。指定範囲でcosθ−sinθは負だから、値は−√15/3となる。",
    "choiceExplanations": {
      "ア": "（sinθ＋cosθ）²＋（cosθ−sinθ）²＝2である。差を−√3とすると二乗が3となり、この恒等式を満たさない。",
      "イ": "二つの式の二乗和が2なので、（cosθ−sinθ）²＝2−1/3＝5/3である。指定範囲でcosθ−sinθは負だから、値は−√15/3となる。",
      "ウ": "和と差をともに二乗すると各1/3となるため、その二乗和が2になる条件を満たさない。",
      "エ": "指定範囲ではcosθ≦0かつsinθ≧0であり、cosθ−sinθは正にならない。",
      "オ": "絶対値√15/3は正しいが、θがπ/2からπまでのとき、cosθ−sinθの符号は負である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q10",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "対数不等式",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "不等式 log₍₁/₇₎(2x＋4)＞−1 の解として正しいのはどれか。",
    "choices": {
      "ア": "−2＜x＜−3/2",
      "イ": "−2＜x＜3/2",
      "ウ": "x＞−3/2",
      "エ": "0＜x＜3/2",
      "オ": "x＜3/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "真数の条件は2x＋4＞0である。底が1より小さいので、対数の不等式を真数で表すと2x＋4＜7となり、合わせて−2＜x＜3/2を得る。",
    "choiceExplanations": {
      "ア": "底が1/7なので、右辺の−1に対応する真数は(1/7)⁻¹＝7である。真数2x＋4＜7から得られる上限は3/2である。",
      "イ": "真数の条件は2x＋4＞0である。底が1より小さいので、対数の不等式を真数で表すと2x＋4＜7となり、合わせて−2＜x＜3/2を得る。",
      "ウ": "底が1より小さい対数は真数が増えると減少するので、2x＋4には上限7がかかる。x＞−3/2では例えばx＝2も含んでしまう。",
      "エ": "真数が正なら負のxでも対数を取れる。例えばx＝−1なら真数は2で、7より小さいので条件を満たす。",
      "オ": "上限3/2は正しいが、x≦−2では真数が0以下になり対数が定義されない。下限−2も必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q11",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二次曲線の接線",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "点（1，0）から曲線 y＝x²＋3 に引いた接線のうち、傾きが負の直線の方程式として正しいのはどれか。",
    "choices": {
      "ア": "y＝−2x＋2",
      "イ": "y＝−3x＋3",
      "ウ": "y＝−4x＋4",
      "エ": "y＝−5x＋5",
      "オ": "y＝−6x＋6"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "x²＋3＝−2x＋2を整理すると（x＋1）²＝0となり、交点のx座標が重解−1になる。したがって、傾き−2の接線である。",
    "choiceExplanations": {
      "ア": "x²＋3＝−2x＋2を整理すると（x＋1）²＝0となり、交点のx座標が重解−1になる。したがって、傾き−2の接線である。",
      "イ": "代入して得る方程式はx²＋3x＝0であり、x＝0とx＝−3の二点で曲線と交わる。",
      "ウ": "曲線との交点を求める方程式はx²＋4x−1＝0となり、判別式が20なので相異なる二交点を持つ。",
      "エ": "x²＋3＝−5x＋5から得られる方程式x²＋5x−2＝0の判別式は33であり、交点が一つになる接線の条件を満たさない。",
      "オ": "直線と曲線を連立するとx²＋6x−3＝0となり、判別式48は0ではない。直線は放物線を二点で横切る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q12",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "数列の和と一般項",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "数列 {aₙ} の初項から第n項までの和Sₙが Sₙ＝3aₙ＋2 で表されるとき、aₙを表す式として正しいのはどれか。",
    "choices": {
      "ア": "−3ⁿ⁻¹",
      "イ": "−(3/2)ⁿ⁻¹",
      "ウ": "−(3/2)ⁿ",
      "エ": "(3/2)ⁿ⁻¹",
      "オ": "3ⁿ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "S₁＝a₁からa₁＝−1を得る。n≧2で差を取るとaₙ＝3(aₙ−aₙ₋₁)、すなわち公比3/2の等比数列となる。",
    "choiceExplanations": {
      "ア": "初項は−1だが、Sₙ−Sₙ₋₁＝aₙより2aₙ＝3aₙ₋₁となる。公比は3ではなく3/2である。",
      "イ": "S₁＝a₁からa₁＝−1を得る。n≧2で差を取るとaₙ＝3(aₙ−aₙ₋₁)、すなわち公比3/2の等比数列となる。",
      "ウ": "公比3/2は正しいが、n＝1でこの式は−3/2となる。S₁＝a₁を満たす初項は−1である。",
      "エ": "この式の初項は正の1である。条件式にn＝1を入れるとa₁＝3a₁＋2よりa₁＝−1となる。",
      "オ": "n＝1で3となるため、初項−1の条件を満たさない。隣り合う項の比も3ではなく3/2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-sugaku-q13",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "ベクトルの内積",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "|a⃗|＝1、|b⃗|＝√2で、a⃗−b⃗と3a⃗＋2b⃗が垂直であるとき、a⃗、b⃗のなす角として正しいのは次のうちではどれか。",
    "choices": {
      "ア": "45°",
      "イ": "60°",
      "ウ": "90°",
      "エ": "120°",
      "オ": "135°"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "与えられた二つのベクトルの内積は3|a⃗|²−a⃗・b⃗−2|b⃗|²＝−1−a⃗・b⃗なので、a⃗・b⃗＝−1である。長さの積√2で割ると余弦は−1/√2になり、角は135°となる。",
    "choiceExplanations": {
      "ア": "45°ではa⃗とb⃗の内積が1になる。このとき（a⃗−b⃗）・（3a⃗＋2b⃗）は−1−1＝−2となり、垂直の条件を満たさない。",
      "イ": "60°に対する余弦は1/2で正である。垂直の条件からa⃗とb⃗の内積は−1と求まるので、鋭角にはならない。",
      "ウ": "90°ならa⃗とb⃗の内積は0となり、変形後の内積は3|a⃗|²−2|b⃗|²＝−1となる。これは垂直の条件に合わない。",
      "エ": "120°の余弦は−1/2であり、内積は−√2/2となる。条件を満たすには内積が−1でなければならない。",
      "オ": "与えられた二つのベクトルの内積は3|a⃗|²−a⃗・b⃗−2|b⃗|²＝−1−a⃗・b⃗なので、a⃗・b⃗＝−1である。長さの積√2で割ると余弦は−1/√2になり、角は135°となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010554.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 13。解説は過去問AIの独自作成。"
  }
];
