import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_DAIGAKKO_2024_GAKKA_SUGAKU: Question[] = [
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q01",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二重根号と分数式"
    ],
    "difficulty": 3,
    "question": "a＝√(4−2√3)、b＝√(4＋2√3) であるとき、b/a−a/b の値はいくらか。",
    "choices": {
      "ア": "−4＋2√3",
      "イ": "√3",
      "ウ": "2",
      "エ": "2√3",
      "オ": "4＋2√3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "通分すると (b²−a²)/(ab) となる。分子は 4√3、分母は √(16−12)＝2 なので、求める値は 2√3 である。",
    "choiceExplanations": {
      "ア": "4＞2√3 より a は正であり b＞a なので、引き算 b/a−a/b の結果も正になる。",
      "イ": "分子 b²−a² は 4√3 であり、分母 ab は2である。したがって √3 の2倍になる。",
      "ウ": "積 ab＝2 は通分後の分母である。分子 b²−a² も計算して割る必要がある。",
      "エ": "通分すると (b²−a²)/(ab) となる。分子は 4√3、分母は √(16−12)＝2 なので、求める値は 2√3 である。",
      "オ": "4＋2√3 は b² の値である。求める式には a と b の両方が入るので、b² だけでは計算できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q02",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "判別式と集合の共通部分"
    ],
    "difficulty": 3,
    "question": "実数の部分集合である A、B をそれぞれ\nA＝{m ∣ x の2次方程式 x²−2mx−m＋12＝0 が相異なる二つの実数解をもつ}、\nB＝{m ∣ m²−16≦0}\nとするとき、集合 A∩B として正しいのはどれか。",
    "choices": {
      "ア": "{m ∣ m＜−4、m＞3}",
      "イ": "{m ∣ m≦−4、m≧3}",
      "ウ": "{m ∣ m＝−4、3＜m≦4}",
      "エ": "{m ∣ 3≦m≦4}",
      "オ": "{m ∣ 3＜m≦4}"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "判別式を4で割ると (m＋4)(m−3) になり、A は m＜−4 又は m＞3 である。B の −4≦m≦4 と共通するのは 3＜m≦4 である。",
    "choiceExplanations": {
      "ア": "m＜−4 又は m＞3 が判別式の条件を満たす。さらに B の条件 −4≦m≦4 との共通部分を取る。",
      "イ": "m＝−4、3 では判別式が0で重解になる。相異なる二つの実数解を得るには判別式が正でなければならない。",
      "ウ": "m＝−4 は B に含まれるが、二次方程式が重解になるため A には含まれない。",
      "エ": "m＝3 では判別式が0になり、二つの異なる実数解を持たない。",
      "オ": "判別式を4で割ると (m＋4)(m−3) になり、A は m＜−4 又は m＞3 である。B の −4≦m≦4 と共通するのは 3＜m≦4 である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q03",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "円に内接する四角形と正弦定理"
    ],
    "difficulty": 3,
    "question": "四角形 ABCD において、∠ABD＝45°、∠ADC＝105°、∠CBD＝30°、AD＝√2 であるとき、CD の長さはいくらか。",
    "choices": {
      "ア": "1",
      "イ": "√2",
      "ウ": "√3",
      "エ": "2",
      "オ": "2√2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "∠ABC＝45°＋30°＝75° で、対角 ∠ADC と和が180°だから ABCD は円に内接する。同じ外接円の直径を使って CD＝AD×sin 30°/sin 45°＝1 となる。",
    "choiceExplanations": {
      "ア": "∠ABC＝45°＋30°＝75° で、対角 ∠ADC と和が180°だから ABCD は円に内接する。同じ外接円の直径を使って CD＝AD×sin 30°/sin 45°＝1 となる。",
      "イ": "AD を見込む角45°よりも CD を見込む角30°の方が小さいため、CD は AD＝√2 より短い。",
      "ウ": "sin 30° と sin 45° の比は 1/√2 である。CD は AD にこの比を掛けた1である。",
      "エ": "正弦定理から外接円の直径は AD/sin 45°＝2 である。弦 CD の長さは、この直径に sin 30° を掛ける。",
      "オ": "AD と CD の長さの比を求めるには、共通の円でそれぞれに対する円周角の正弦を比べる。CD/AD＝sin 30°/sin 45° で1未満になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q04",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "交差点で分岐する最短経路の確率"
    ],
    "difficulty": 3,
    "question": "図のように各区画が正方形になるように道路が並んでいる。P と Q の二人がこの道路を、P は A 地点を出発して B 地点を目指し、Q は B 地点を出発して A 地点を目指し、それぞれ最短経路で移動する。二人は同時に出発して同じ速さで移動し、各交差点において2通りの進み方があるときは 1/2 の確率でどちらかを選ぶとする。このとき、C 地点で P と Q が出会う確率はいくらか。",
    "choices": {
      "ア": "1/14²",
      "イ": "3/14²",
      "ウ": "1/2⁶",
      "エ": "5/2⁸",
      "オ": "3/2⁷"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "P は右4回で確率 1/16、Q は下3回と左1回で、左が最後なら 1/8、それ以外の3通りが各 1/16 なので計 5/16 である。両者が C に着く確率は積の 5/2⁸ となる。",
    "choiceExplanations": {
      "ア": "各交差点に分岐が残っているときだけ確率が 1/2 であり、最短経路全体が等確率になるわけではない。",
      "イ": "C は A と B のどちらからも4区画なので着く時刻は等しい。Q は左1回かつ下3回だが、最後に左に進むときは強制される場合がある。",
      "ウ": "P が C へ行く四つの移動は毎回二択で、到達確率は 1/16 である。Q の到達確率も別に求めて掛ける。",
      "エ": "P は右4回で確率 1/16、Q は下3回と左1回で、左が最後なら 1/8、それ以外の3通りが各 1/16 なので計 5/16 である。両者が C に着く確率は積の 5/2⁸ となる。",
      "オ": "Q が最初に下へ3回進む場合、下端で左折する最後の移動に 1/2 は掛からない。残りの経路3通りはいずれも4回分の分岐がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-daigakko/2024/gakka-sugaku/q04-1.webp"
    ],
    "imageAltTexts": [
      "5列3行の道路網の左下が A、右上が B、下辺の右から二つ目が C"
    ]
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q05",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "中点連結でできる平行四辺形"
    ],
    "difficulty": 3,
    "question": "四面体 ABCD について、AB、BC、CD、DA の中点をそれぞれ P、Q、R、S とする。∠ABC＝50°、∠BPQ＝60°、∠QPS＝75° であるとき、∠PSR はいくらか。",
    "choices": {
      "ア": "105°",
      "イ": "110°",
      "ウ": "120°",
      "エ": "125°",
      "オ": "135°"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "中点連結定理より PQ と SR は向きも平行であり、PS と SP は逆向きである。したがって ∠PSR＝180°−∠QPS＝105° となる。",
    "choiceExplanations": {
      "ア": "中点連結定理より PQ と SR は向きも平行であり、PS と SP は逆向きである。したがって ∠PSR＝180°−∠QPS＝105° となる。",
      "イ": "P→Q と S→R は同じ向きに平行なので、P と S の内角は和が180°になる。75°の補角は105°である。",
      "ウ": "∠BPQ＝60° の補角は120°だが、PB と PS は異なる方向である。ここで使うのは PQ と PS の間の角75°である。",
      "エ": "P、Q、R、S の四角形では中点連結定理により対辺が平行になり、∠QPS と ∠PSR は隣り合う。隣り合う角の和は180°である。",
      "オ": "平行四辺形の隣り合う内角は補角であり、75°に対して135°では和が180°を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q06",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二項定理で下4桁を求める"
    ],
    "difficulty": 3,
    "question": "11²⁰ の下4桁として正しいのはどれか。",
    "choices": {
      "ア": "0001",
      "イ": "0201",
      "ウ": "1201",
      "エ": "2101",
      "オ": "9201"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "(1＋10)²⁰ で10⁴以上のべきの項は下4桁に影響しない。残りは 1＋200＋19,000＋1,140,000 となるため、下4桁は9201である。",
    "choiceExplanations": {
      "ア": "11＝1＋10 と書けるので、二項展開の定数項は1だが、10、10²、10³ の項も下4桁に影響する。",
      "イ": "0201 は定数項1と一次の項200の和である。二次の項 190×100 も加える。",
      "ウ": "10² の項の係数は 20×19/2＝190 なので、19,000 の下4桁は9000である。",
      "エ": "200 と1に、係数190を掛けた100の倍数及び係数1140を掛けた1000の倍数を加える。後者は下4桁に影響しない。",
      "オ": "(1＋10)²⁰ で10⁴以上のべきの項は下4桁に影響しない。残りは 1＋200＋19,000＋1,140,000 となるため、下4桁は9201である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q07",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "反射を使った最短距離"
    ],
    "difficulty": 3,
    "question": "xy 平面上において、点 A(2, 9/2)、点 B(−1, 3/2) と直線 l：2x−2y−1＝0 がある。直線 l 上にある点 P のうち、線分 AP の長さと線分 BP の長さの和が最小となる点 P の座標として正しいのはどれか。",
    "choices": {
      "ア": "(1, 1/2)",
      "イ": "(3/2, 1)",
      "ウ": "(2, 3/2)",
      "エ": "(5/2, 2)",
      "オ": "(3, 5/2)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "B を y＝x−1/2 に関して反射すると B′＝(2, −3/2) であり、BP＝B′P となる。A と B′ を結ぶ x＝2 と l の交点は (2, 3/2) である。",
    "choiceExplanations": {
      "ア": "この点は直線 l 上にあるが、B を l に関して反射した点と A を結ぶ直線は x＝2 になる。",
      "イ": "最短経路では A、P、反射後の B が一直線上に並ぶ。対称点の x 座標は2なので、x＝3/2 は条件を満たさない。",
      "ウ": "B を y＝x−1/2 に関して反射すると B′＝(2, −3/2) であり、BP＝B′P となる。A と B′ を結ぶ x＝2 と l の交点は (2, 3/2) である。",
      "エ": "B を反射した B′ と A を結んだ線分上でのみ AP＋B′P が最小になる。いずれも x＝2 上の点である。",
      "オ": "x＝3 は直線 l 上の点の x 座標になりうるが、AP＋BP の最小点は A と反射した B を結ぶ x＝2 上にある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q08",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "直線の回転と正接の加法定理"
    ],
    "difficulty": 3,
    "question": "xy 平面上において、直線 y＝(3/4)x を原点を中心に反時計回りに45°回転した直線の方程式として正しいのはどれか。",
    "choices": {
      "ア": "y＝3x",
      "イ": "y＝4x",
      "ウ": "y＝5x",
      "エ": "y＝6x",
      "オ": "y＝7x"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "元の直線が x 軸となす角を θ とすると、回転後の傾きは tan(θ＋45°)＝(3/4＋1)/(1−3/4)＝7 である。原点を通るため y＝7x となる。",
    "choiceExplanations": {
      "ア": "もとの傾き 3/4 と tan 45°＝1 を、正接の加法定理に入れる。分母は 1−3/4＝1/4 であり、傾きは3より大きい。",
      "イ": "45°回転させると、水平・鉛直成分に比例する値は 4−3 と 4＋3 になる。傾きはその比の7である。",
      "ウ": "正接の加法定理の分子は 3/4＋1＝7/4 である。分母の 1−3/4 で割ると7になる。",
      "エ": "方向ベクトル (4, 3) を45°回すと (1/√2, 7/√2) になり、鉛直成分と水平成分の比は7である。",
      "オ": "元の直線が x 軸となす角を θ とすると、回転後の傾きは tan(θ＋45°)＝(3/4＋1)/(1−3/4)＝7 である。原点を通るため y＝7x となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q09",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "指数方程式の対数と逆数"
    ],
    "difficulty": 3,
    "question": "3ˣ＝4ʸ＝12ᶻ（x≠0）であるとき、xy−yz−zx はいくらか。",
    "choices": {
      "ア": "−1",
      "イ": "0",
      "ウ": "1",
      "エ": "2",
      "オ": "3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "共通値を t とすると t≠1 であり、1/x＝log 3/log t、1/y＝log 4/log t、1/z＝log 12/log t である。log 12＝log 3＋log 4 から xy＝yz＋zx となり、差は0である。",
    "choiceExplanations": {
      "ア": "12＝3×4 であるため、同じ値の対数を使うと 1/z＝1/x＋1/y となる。これを xyz 倍すると、差は −1 にならない。",
      "イ": "共通値を t とすると t≠1 であり、1/x＝log 3/log t、1/y＝log 4/log t、1/z＝log 12/log t である。log 12＝log 3＋log 4 から xy＝yz＋zx となり、差は0である。",
      "ウ": "指数の逆数の関係から xy＝yz＋zx が成り立つ。1は 3⁰ の値だが、求めるのは指数の積の組合せである。",
      "エ": "3 と4の積は12である。対数の足し算を使うので、差が正の定数2になることはない。",
      "オ": "3 は左端の指数の底である。共通値の対数をとって整理すれば、底の一つではなく積の差0を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q10",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三次関数の極値と実数解の個数"
    ],
    "difficulty": 3,
    "question": "x についての方程式 x³−3x²−9x−a＝0 が、相異なる三つの実数解をもつような定数 a の範囲として正しいのはどれか。",
    "choices": {
      "ア": "a＝−1, 3",
      "イ": "a＝0, (3±3√5)/2",
      "ウ": "−27＜a＜5",
      "エ": "−1＜a＜3",
      "オ": "(3−3√5)/2＜a＜0、(3＋3√5)/2＜a"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "f(x)＝x³−3x²−9x の導関数は 3(x＋1)(x−3) であり、極大値は f(−1)＝5、極小値は f(3)＝−27 である。水平線 y＝a がグラフと3点で交わるのは −27＜a＜5 のときである。",
    "choiceExplanations": {
      "ア": "−1 と3は三次関数 x³−3x²−9x の極値を取る x 座標であり、a の範囲を表す高さではない。",
      "イ": "a＝0 で元の左辺を因数分解すると根は x＝0, (3±3√5)/2 である。これらは a の境界ではない。",
      "ウ": "f(x)＝x³−3x²−9x の導関数は 3(x＋1)(x−3) であり、極大値は f(−1)＝5、極小値は f(3)＝−27 である。水平線 y＝a がグラフと3点で交わるのは −27＜a＜5 のときである。",
      "エ": "−1 と3は極値点の x 座標なので、そこに x を代入して得られる高さ −27 と5を使う。",
      "オ": "a の範囲の境界は水平線が三次関数に接する高さである。a＝0 のときの三つの x 座標の並び方からは求められない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q11",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三次曲線と直線の間の面積"
    ],
    "difficulty": 3,
    "question": "xy 平面上の曲線 y＝x³−6x²＋9x と直線 y＝x で囲まれた図形の面積はいくらか。",
    "choices": {
      "ア": "4",
      "イ": "8",
      "ウ": "10",
      "エ": "12",
      "オ": "16"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "曲線から直線を引くと x(x−2)(x−4) になり、交点は x＝0、2、4 である。0～2 の積分は4、2～4 の積分は −4 なので、面積は絶対値の和で8となる。",
    "choiceExplanations": {
      "ア": "4 は 0≦x≦2 の囲まれた部分の面積である。2≦x≦4 にも同じ面積の部分がある。",
      "イ": "曲線から直線を引くと x(x−2)(x−4) になり、交点は x＝0、2、4 である。0～2 の積分は4、2～4 の積分は −4 なので、面積は絶対値の和で8となる。",
      "ウ": "交点の x 座標で積分区間を分ける。各区間の面積は4なので、合計10にはならない。",
      "エ": "0～2 では曲線が直線の上にあり、2～4 では下にある。それぞれの差の絶対値を積分すると4ずつである。",
      "オ": "二つの領域は (2, 2) のまわりで点対称であり、片方の面積4を2倍すると8になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q12",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "逆数の差が与えられた数列"
    ],
    "difficulty": 3,
    "question": "次のように定められた数列 {aₙ} について、a₁₀₁ の値はいくらか。\na₁＝2、1/aₙ₊₁−1/aₙ＝n（n＝1、2、…）",
    "choices": {
      "ア": "2/10101",
      "イ": "1/5050",
      "ウ": "2/9901",
      "エ": "5050",
      "オ": "10101/2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "等式を n＝1～100 まで足すと、1/a₁₀₁−1/2＝1＋2＋…＋100＝5050 になる。よって 1/a₁₀₁＝10101/2 であり、a₁₀₁ はその逆数である。",
    "choiceExplanations": {
      "ア": "等式を n＝1～100 まで足すと、1/a₁₀₁−1/2＝1＋2＋…＋100＝5050 になる。よって 1/a₁₀₁＝10101/2 であり、a₁₀₁ はその逆数である。",
      "イ": "5050 は 1/a₁₀₁ と 1/a₁ の差である。逆数を取る前に初項の逆数1/2を加える。",
      "ウ": "2/9901 は 1＋…＋99＝4950 を使った値であり、求めるのは第101項なので n＝100 の差まで足す。",
      "エ": "右辺の和5050が表すのは、数列の値ではなく逆数の増加分である。",
      "オ": "10101/2 は第101項の逆数である。求める項は 2/10101 になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2024-annual-gakka-sugaku-q13",
    "exam": "kaijo-hoan-daigakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二つのベクトルに垂直なベクトル"
    ],
    "difficulty": 3,
    "question": "二つのベクトル a＝(3, 2, 2)、b＝(3, −2, 0) の両方に垂直で、大きさが7であるベクトルとして正しいのは次のうちではどれか。",
    "choices": {
      "ア": "(−2√2, −4, 5)",
      "イ": "(−2, −3, 6)",
      "ウ": "(√2, −√3, −6)",
      "エ": "(2, −3, 6)",
      "オ": "(4, 6, −12)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "a と b との内積はいずれも0である。また長さは √(4＋9＋36)＝7 なので、全ての条件を満たす。",
    "choiceExplanations": {
      "ア": "b との内積は −6√2＋8 であり、0にならない。",
      "イ": "a と b との内積はいずれも0である。また長さは √(4＋9＋36)＝7 なので、全ての条件を満たす。",
      "ウ": "b との内積は 3√2＋2√3 であり、0にならない。",
      "エ": "長さは7であるが、b との内積は 3×2＋(−2)×(−3)＝12 であり、垂直ではない。",
      "オ": "両方のベクトルとの内積は0だが、長さは √(16＋36＋144)＝14 である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/900035880.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安大学校学生採用試験 学科試験」No. 13。解説は過去問AIの独自作成。"
  }
];
