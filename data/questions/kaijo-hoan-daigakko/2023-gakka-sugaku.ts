import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_DAIGAKKO_2023_GAKKA_SUGAKU: Question[] = [
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q01",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必要条件と十分条件"
    ],
    "difficulty": 3,
    "question": "x、y を実数とする。次の記述の㋐、㋑、㋒に当てはまるものを A～D から選び出したものの組合せとして正しいのはどれか。\n・x＝3 は、x²−x−6＝0 であるための［㋐］。\n・x³＝1 は、x²⁰²³＝1 であるための［㋑］。\n・x＞y は、x⁴＞y⁴ であるための［㋒］。\nA．必要条件であるが十分条件でない\nB．十分条件であるが必要条件でない\nC．必要十分条件である\nD．必要条件でも十分条件でもない",
    "choices": {
      "ア": "㋐ A、㋑ A、㋒ B",
      "イ": "㋐ A、㋑ B、㋒ D",
      "ウ": "㋐ B、㋑ A、㋒ A",
      "エ": "㋐ B、㋑ C、㋒ B",
      "オ": "㋐ B、㋑ C、㋒ D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋐ は x＝3 なら満たすが x＝−2 も解なので B、㋑ は実数ではどちらも x＝1 と同値なので C である。㋒ は (x,y)＝(−1,−2) と (−2,1) が双方の含意の反例となるため D である。",
    "choiceExplanations": {
      "ア": "x＝3 を代入すれば x²−x−6＝0 を満たすため、㋐ は十分条件である。x＝−2 も解なので必要条件ではない。",
      "イ": "x²−x−6 は (x−3)(x＋2) で、x＝3 は二つの解のうちの一つである。二つの奇数乗の方程式は実数の範囲でともに x＝1 が唯一の解であり、㋑ は必要十分条件である。",
      "ウ": "㋐ は正しいが、㋑ の方程式はどちらも x＝1 と同値で、㋒ は x＝−2、y＝1 のとき反例になるため必要条件ではない。",
      "エ": "㋐ と ㋑ は正しいが、x＝−1、y＝−2 では x＞y でも x⁴＜y⁴ なので、㋒ は十分条件ではない。",
      "オ": "㋐ は x＝3 なら満たすが x＝−2 も解なので B、㋑ は実数ではどちらも x＝1 と同値なので C である。㋒ は (x,y)＝(−1,−2) と (−2,1) が双方の含意の反例となるため D である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q02",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二次関数の最大値と係数の符号"
    ],
    "difficulty": 3,
    "question": "2次関数 y＝ax²−6ax＋4（−2≦x≦4）の最大値が20であるとき、定数 a の取り得る値のみを全て挙げたものとして正しいのはどれか。",
    "choices": {
      "ア": "1",
      "イ": "1、−16/9",
      "ウ": "−16/9",
      "エ": "1、−2",
      "オ": "1、−2、−16/9"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "y＝a(x−3)²−9a＋4 とすると、a＞0 では x＝−2 で最大値 16a＋4＝20 から a＝1 となる。a＜0 では頂点の値 −9a＋4＝20 から a＝−16/9 となり、a＝0 では最大値は4である。",
    "choiceExplanations": {
      "ア": "a＝1 は x＝−2 で最大値20になる。a が負のときは頂点 x＝3 に最大値があり、別の解がある。",
      "イ": "y＝a(x−3)²−9a＋4 とすると、a＞0 では x＝−2 で最大値 16a＋4＝20 から a＝1 となる。a＜0 では頂点の値 −9a＋4＝20 から a＝−16/9 となり、a＝0 では最大値は4である。",
      "ウ": "a＜0 の場合は −16/9 だが、上に開く場合は頂点から最も遠い x＝−2 で最大値20となる a＝1 がある。",
      "エ": "a＝−2 のとき頂点の値は −9(−2)＋4＝22 となり、最大値は20にならない。",
      "オ": "a＝−2 は不要である。下に開くときは区間内の x＝3 の値 −9a＋4 だけを20に等しくする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q03",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角錐の外接円と高さ"
    ],
    "difficulty": 3,
    "question": "三角錐 OABC において、AB＝2√3、OA＝OB＝OC＝AC＝BC＝3 とする。このとき、三角錐 OABC の体積はいくらか。",
    "choices": {
      "ア": "√5/2",
      "イ": "√5",
      "ウ": "3√5/2",
      "エ": "2√5",
      "オ": "5√5/2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "△OAB の面積は √3×√6＝3√2、外接円半径は AB×OA×OB を面積の4倍で割った 3√6/4 である。C は O・A・B から等距離3なので高さは √[9−(3√6/4)²]＝3√10/4、体積は 3√5/2 となる。",
    "choiceExplanations": {
      "ア": "底面 OAB の面積は 3√2 である。これに C から底面までの高さを掛けて3で割ると、√5/2 より大きい値になる。",
      "イ": "C から底面への垂足は O、A、B から等距離の外心である。外接円半径 3√6/4 を使うと、高さは 3√10/4 になる。",
      "ウ": "△OAB の面積は √3×√6＝3√2、外接円半径は AB×OA×OB を面積の4倍で割った 3√6/4 である。C は O・A・B から等距離3なので高さは √[9−(3√6/4)²]＝3√10/4、体積は 3√5/2 となる。",
      "エ": "C は △OAB の外心の真上にあるので、底面までの高さは辺 OC＝3 より短い。底面積 3√2 にこの高さの 1/3 を掛ける。",
      "オ": "底面積を 3√2 として高さ 3√10/4 を掛け、錐体の体積なので3で割る。5√5/2 に必要な高さは実際の高さを超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q04",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "不合格品の製造元を求める条件付き確率"
    ],
    "difficulty": 3,
    "question": "ある製品が多数入っている箱がある。その箱の中の製品のうちの70％は A 工場で、30％は B 工場で作られたもので、A 工場、B 工場で作られた製品には、それぞれ、3％、4％の不合格品が含まれることが分かっている。これらの製品が入っている箱の中から1個を取り出して検査を行ったところ、その1個が不合格品であったとき、それが A 工場で作られた製品である確率はいくらか。",
    "choices": {
      "ア": "3/250",
      "イ": "21/1000",
      "ウ": "33/1000",
      "エ": "4/11",
      "オ": "7/11"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "不合格品のうち A 由来の割合は (0.70×0.03)/(0.70×0.03＋0.30×0.04) である。分子・分母を千倍すると 21/(21＋12)＝7/11 となる。",
    "choiceExplanations": {
      "ア": "3/250＝0.30×0.04 は、箱から取り出した製品が B 工場製で不合格となる確率である。",
      "イ": "21/1000 は A 工場製であり、かつ不合格品である確率である。求める条件付き確率には全不合格品の割合で割る必要がある。",
      "ウ": "33/1000 は箱全体の不合格品の割合であり、条件付き確率を求める際の分母になる。",
      "エ": "4/11 は B 工場製の不合格品の比率である。A 工場製の割合は残りの 7/11 になる。",
      "オ": "不合格品のうち A 由来の割合は (0.70×0.03)/(0.70×0.03＋0.30×0.04) である。分子・分母を千倍すると 21/(21＋12)＝7/11 となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q05",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "階乗の素因数分解に含まれる2の指数"
    ],
    "difficulty": 3,
    "question": "30!＝30×29×…×2×1 を素因数分解して、\n30!＝2ᵐ×3ⁿ×…×29\nと表すとき、m の値はいくらか。",
    "choices": {
      "ア": "24",
      "イ": "26",
      "ウ": "28",
      "エ": "30",
      "オ": "32"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "30以下には2の倍数が15個、4の倍数が7個、8の倍数が3個、16の倍数が1個ある。2の因子を重ねて数えると、指数は 15＋7＋3＋1＝26 になる。",
    "choiceExplanations": {
      "ア": "4や8の倍数は2の因子を複数持つ。30以下の2、4、8、16の各倍数の個数を足す必要がある。",
      "イ": "30以下には2の倍数が15個、4の倍数が7個、8の倍数が3個、16の倍数が1個ある。2の因子を重ねて数えると、指数は 15＋7＋3＋1＝26 になる。",
      "ウ": "30以下には32の倍数は存在しない。16の倍数の1個までを加えた26が指数である。",
      "エ": "30は階乗に掛ける整数の個数であり、2の因子の個数ではない。奇数は2の因子を一つも持たない。",
      "オ": "2の因子を数えるときは、同じ整数でも4の倍数なら2個以上、8の倍数なら3個以上として扱う。その総数は26である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q06",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "内心の高さと相似を使う辺の長さ"
    ],
    "difficulty": 3,
    "question": "図のような三角形 ABC の内心 I を通り、辺 BC に平行な直線と辺 AB、AC の交点をそれぞれ P、Q とする。AB＝13、AC＝15、AP＝26/3、AQ＝10 とするとき、PQ の長さはいくらか。",
    "choices": {
      "ア": "9",
      "イ": "28/3",
      "ウ": "29/3",
      "エ": "10",
      "オ": "31/3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "A から BC までの高さを h とすると、相似比 2/3 により I から BC までの距離、すなわち内接円半径は h/3 である。面積を BC×h/2 と (h/3)×(13＋15＋BC)/2 で表して等置すると BC＝14、PQ＝28/3 となる。",
    "choiceExplanations": {
      "ア": "△APQ と △ABC の相似比は 2：3 である。BC は内接円半径と面積の関係から14であり、その 2/3 を取る。",
      "イ": "A から BC までの高さを h とすると、相似比 2/3 により I から BC までの距離、すなわち内接円半径は h/3 である。面積を BC×h/2 と (h/3)×(13＋15＋BC)/2 で表して等置すると BC＝14、PQ＝28/3 となる。",
      "ウ": "PQ は BC の 2/3 である。内接円半径が高さの 1/3 なので、面積の等式では 3BC＝28＋BC となる。",
      "エ": "10 は A から Q までの距離である。平行な辺 PQ の長さは、相似比 2/3 を BC に掛けて求める。",
      "オ": "PQ を 31/3 とすると BC＝31/2 となるが、その値は三角形の面積を底辺と高さ、内接円半径と半周長の二通りで表した条件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-daigakko/2023/gakka-sugaku/q06.webp"
    ],
    "imageAltTexts": [
      "三角形 ABC の内心 I を通り、BC と平行な線分 PQ"
    ]
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q07",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "多項式の剰余と指数"
    ],
    "difficulty": 3,
    "question": "x²¹ を x²−3 で割った余りとして正しいのはどれか。",
    "choices": {
      "ア": "3¹⁰",
      "イ": "3¹⁰√3",
      "ウ": "3¹⁰x",
      "エ": "3¹⁰x＋3¹⁰",
      "オ": "3¹⁰x＋3¹⁰√3"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "x²≡3（mod x²−3）だから、x²¹＝x(x²)¹⁰ の余りは 3¹⁰x である。次数が1なので、これで割る式の次数2より小さい。",
    "choiceExplanations": {
      "ア": "x² を3と置き換えていくと20乗分は 3¹⁰ になる。元の次数は21なので、さらに x が残る。",
      "イ": "x＝√3 での値だけを定数として採用すると、もう一方の根 x＝−√3 での値が一致しない。",
      "ウ": "x²≡3（mod x²−3）だから、x²¹＝x(x²)¹⁰ の余りは 3¹⁰x である。次数が1なので、これで割る式の次数2より小さい。",
      "エ": "余りは x の一次式だが、追加の定数項を入れると x＝√3 で元の x²¹ の値と合わない。",
      "オ": "x²¹ は奇関数で x＝±√3 における値は互いに符号が逆である。余りの定数項は0でなければならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q08",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二次関数の頂点の軌跡"
    ],
    "difficulty": 3,
    "question": "a が全ての実数値をとりながら変化するとき、2次関数 y＝2x²−2ax＋a＋3 のグラフの頂点の軌跡として正しいのはどれか。",
    "choices": {
      "ア": "y＝−2x²＋2x＋3",
      "イ": "y＝−2x²＋3",
      "ウ": "y＝−x²＋3",
      "エ": "y＝x²＋3",
      "オ": "y＝2x²−2x＋3"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "平方完成すると 2(x−a/2)²−a²/2＋a＋3 であり、頂点の座標は (a/2, −a²/2＋a＋3) である。a＝2x を代入すると軌跡は y＝−2x²＋2x＋3 となる。",
    "choiceExplanations": {
      "ア": "平方完成すると 2(x−a/2)²−a²/2＋a＋3 であり、頂点の座標は (a/2, −a²/2＋a＋3) である。a＝2x を代入すると軌跡は y＝−2x²＋2x＋3 となる。",
      "イ": "頂点の y 座標には −a²/2 だけでなく a も含まれる。a＝2x により一次項 2x が残る。",
      "ウ": "頂点の x 座標は a/2 なので、二次項 −a²/2 は −2x² に変わる。さらに a に由来する一次項がある。",
      "エ": "元の各放物線は上に開くが、頂点の高さは a の二次式で係数が負である。頂点の軌跡は下に開く。",
      "オ": "一次項は a を 2x に置き換えた ＋2x、二次項は −a²/2 に由来する −2x² になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q09",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "半円上の三角比と和の最大値"
    ],
    "difficulty": 3,
    "question": "点 P が長さ2の線分 AB を直径とする半円周（端点を含まない）上を動くとし、∠PAB＝θ（0＜θ＜π/2）とする。このとき、(3/2)AP＋2BP の最大値はいくらか。",
    "choices": {
      "ア": "5√2/2",
      "イ": "4",
      "ウ": "5√3/2",
      "エ": "5",
      "オ": "5√2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "∠APB は直角なので AP＝2 cos θ、BP＝2 sin θ となる。3 cos θ＋4 sin θ は cos θ：sin θ＝3：4 のとき最大 √(3²＋4²)＝5 になる。",
    "choiceExplanations": {
      "ア": "θ＝π/4 に限らず P は半円周上を動く。加重和の最大化には係数3と4に対応する向きを使う。",
      "イ": "θ を π/2 に近づけると和は4に近づく。しかし cos θ＝3/5、sin θ＝4/5 となる内部の点で、それより大きい値になる。",
      "ウ": "和は 3 cos θ＋4 sin θ で、二つの項の係数が異なる。θ が30°や60°と仮定して最大値を決めることはできない。",
      "エ": "∠APB は直角なので AP＝2 cos θ、BP＝2 sin θ となる。3 cos θ＋4 sin θ は cos θ：sin θ＝3：4 のとき最大 √(3²＋4²)＝5 になる。",
      "オ": "3 cos θ＋4 sin θ≦√(3²＋4²)√(cos²θ＋sin²θ)＝5 である。三角比の二乗和は1なので余分な √2 は掛からない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-daigakko/2023/gakka-sugaku/q09.webp"
    ],
    "imageAltTexts": [
      "長さ2の線分 AB を直径とする半円周上の点 P と角 PAB"
    ]
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q10",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "常用対数で最初の非零桁を求める"
    ],
    "difficulty": 3,
    "question": "(1/5)¹⁰ を小数で表すとき、初めて0でない数字が現れるのは小数第何位か。ただし、log₁₀2＝0.301 とする。",
    "choices": {
      "ア": "小数第5位",
      "イ": "小数第6位",
      "ウ": "小数第7位",
      "エ": "小数第8位",
      "オ": "小数第9位"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "1/5＝2/10 なので常用対数は 10(log₁₀2−1)＝−6.99 である。10⁻⁷ より大きく 10⁻⁶ より小さいため、小数第7位に初めて0でない数字が現れる。",
    "choiceExplanations": {
      "ア": "常用対数は −6.99 であり、数は 10⁻⁵ よりも小さい。小数第5位までには0以外の数字は現れない。",
      "イ": "(1/5)¹⁰ は 10⁻⁶ 未満なので、小数第6位も0である。",
      "ウ": "1/5＝2/10 なので常用対数は 10(log₁₀2−1)＝−6.99 である。10⁻⁷ より大きく 10⁻⁶ より小さいため、小数第7位に初めて0でない数字が現れる。",
      "エ": "小数第8位が最初なら 10⁻⁷ 未満であるはずだが、常用対数 −6.99 は −7 より大きい。",
      "オ": "(1/5)¹⁰＝2¹⁰/10¹⁰＝1024/10¹⁰ である。最も左の1は小数第7位に来る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q11",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "定積分で定まる関数の極小値"
    ],
    "difficulty": 3,
    "question": "x についての関数 f(x)＝∫₂ˣ (t²＋2t−8) dt の極小値はいくらか。",
    "choices": {
      "ア": "−56/3",
      "イ": "−10",
      "ウ": "−14/3",
      "エ": "0",
      "オ": "14/3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "f′(x)＝x²＋2x−8＝(x＋4)(x−2) は x＝2 で負から正に変わる。f(2) は上下の端がともに2の定積分であるため0になる。",
    "choiceExplanations": {
      "ア": "導関数の符号が負から正に変わるのは x＝2 である。そこで積分区間の長さは0になる。",
      "イ": "極小値を求めるには被積分関数の値をそのまま使わず、その符号が負から正に変わる積分の上端で f を評価する。",
      "ウ": "極小点は上端が下端に等しい x＝2 である。そこでは積分は −14/3 にならず0である。",
      "エ": "f′(x)＝x²＋2x−8＝(x＋4)(x−2) は x＝2 で負から正に変わる。f(2) は上下の端がともに2の定積分であるため0になる。",
      "オ": "x＝−4 では導関数の符号は正から負に変わり極大となる。極小点 x＝2 で定積分を評価すると0である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q12",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "分数型漸化式の変形"
    ],
    "difficulty": 3,
    "question": "次のように定められた数列 {aₙ} について、a₁₀₀ の値はいくらか。\na₁＝1、aₙ₊₁＝4/(4−aₙ)（n＝1、2、…）",
    "choices": {
      "ア": "99/100",
      "イ": "101/100",
      "ウ": "201/100",
      "エ": "200/101",
      "オ": "201/101"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "1/(2−aₙ₊₁)＝1/(2−aₙ)＋1/2 なので、1/(2−a₁₀₀)＝1＋99/2＝101/2 である。したがって a₁₀₀＝2−2/101＝200/101 である。",
    "choiceExplanations": {
      "ア": "a₂＝4/3 であり、以後は2へ向かって増える数列である。初項1より小さくなる値は第100項にならない。",
      "イ": "変形した数列 1/(2−aₙ) は初項1、公差 1/2 であり、第100項は 101/2 になる。元の数列に戻すと2に近い値である。",
      "ウ": "初項 a₁ は2より小さく、aₙ＜2 なら aₙ₊₁＜2 である。201/100 は2を超えるので第100項にならない。",
      "エ": "1/(2−aₙ₊₁)＝1/(2−aₙ)＋1/2 なので、1/(2−a₁₀₀)＝1＋99/2＝101/2 である。したがって a₁₀₀＝2−2/101＝200/101 である。",
      "オ": "第100項から2までの差は、101/2 の逆数である 2/101 である。2＝202/101 からこの差を引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2023-annual-gakka-sugaku-q13",
    "exam": "kaijo-hoan-daigakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "ベクトルの大きさの最小化"
    ],
    "difficulty": 3,
    "question": "ベクトル a、b について、|a|＝5、|b|＝1、|a−b|＝4√2 であるとき、|a＋tb|（t は定数）の最小値はいくらか。",
    "choices": {
      "ア": "4",
      "イ": "6",
      "ウ": "8",
      "エ": "10",
      "オ": "12"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "|a−b|²＝25＋1−2a·b＝32 から a·b＝−3 である。|a＋tb|²＝t²−6t＋25＝(t−3)²＋16 より、最小値はその平方根の4になる。",
    "choiceExplanations": {
      "ア": "|a−b|²＝25＋1−2a·b＝32 から a·b＝−3 である。|a＋tb|²＝t²−6t＋25＝(t−3)²＋16 より、最小値はその平方根の4になる。",
      "イ": "t＝0 なら |a＋tb|＝5 である。6は既にその値より大きいので最小値にならない。",
      "ウ": "|a＋tb|² の最小値は16であり、その平方根を取る。対応する t は3である。",
      "エ": "b の大きさは1で、a と反対方向の成分を打ち消すには t＝3 を選ぶ。残る成分の大きさは √(5²−3²)＝4 である。",
      "オ": "t が変化するため、|a| と |b| を足して最小値とすることはできない。t＝3 を代入すると |a＋3b|＝4 である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010547.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安大学校学生採用試験 学科試験」No. 13。解説は過去問AIの独自作成。"
  }
];
