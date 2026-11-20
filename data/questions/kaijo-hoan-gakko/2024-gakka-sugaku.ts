import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_GAKKO_2024_GAKKA_SUGAKU: Question[] = [
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q01",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "対称式と根号",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "a＝(√11＋√7)/4、b＝(√11−√7)/4であるとき、b/a＋a/bの値はいくらか。",
    "choices": {
      "ア": "3",
      "イ": "9/2",
      "ウ": "√77",
      "エ": "9",
      "オ": "11"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "通分すると(b²＋a²)/abとなる。a²＋b²＝(22＋14)/16＝9/4、ab＝(11−7)/16＝1/4なので、値は9である。",
    "choiceExplanations": {
      "ア": "b/aとa/bを合わせると(a²＋b²)/abになる。a²＋b²＝9/4、ab＝1/4なので3にはならない。",
      "イ": "aとbの平方の和は9/4、積は1/4である。この積で割るので、比の和は9/2の2倍になる。",
      "ウ": "平方和を取ると、√11と√7から生じる交差項はa²とb²で打ち消し合う。そのため答えに√77は残らない。",
      "エ": "通分すると(b²＋a²)/abとなる。a²＋b²＝(22＋14)/16＝9/4、ab＝(11−7)/16＝1/4なので、値は9である。",
      "オ": "平方和の分子には11の2倍に加え7の2倍も含まれる。積は(11−7)/16なので、比の和は11ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q02",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "分数を含む不等式",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "不等式(6−x)/x≧xの解として正しいのはどれか。",
    "choices": {
      "ア": "x≦−3",
      "イ": "−3≦x＜0",
      "ウ": "−3≦x≦2",
      "エ": "x≦−3、0＜x≦2",
      "オ": "x≦2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "移項すると−(x＋3)(x−2)/x≧0である。−3、0、2で区切って符号を調べると、x≦−3または0＜x≦2になる。",
    "choiceExplanations": {
      "ア": "x≦−3は解の一部であるが、例えばx＝1も左辺5が右辺1を上回るので解に含まれる。",
      "イ": "−3と0の間では例えばx＝−1を代入すると左辺−7、右辺−1で、不等式を満たさない。",
      "ウ": "x＝0では分母が0になるので定義されない。また、−3より小さいx＝−4も不等式を満たす。",
      "エ": "移項すると−(x＋3)(x−2)/x≧0である。−3、0、2で区切って符号を調べると、x≦−3または0＜x≦2になる。",
      "オ": "x＝0は定義されず、−3と0の間では左辺から右辺を引いた値が負になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q03",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "正弦定理と仰角",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "図のように、互いに200 m離れた地点AとBから、気球Pの真下にあってBと同じ標高の地点Hを見たとき、∠HAB＝45°、∠HBA＝75°であった。また、BからPを見上げた角度は60°であった。このとき、気球の高さPHはいくらか。",
    "choices": {
      "ア": "100√2 m",
      "イ": "100√3 m",
      "ウ": "200√2 m",
      "エ": "200√3 m",
      "オ": "200√6 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "△ABHのHの角は60°なので、正弦定理よりBH＝200 sin45°/sin60°＝200√2/√3 mとなる。△BHPでPH＝BH tan60°＝200√2 mである。",
    "choiceExplanations": {
      "ア": "Hでの角は60°であり、正弦定理でBHは200 sin45°/sin60°となる。これにtan60°を掛けた高さは100√2 mの2倍になる。",
      "イ": "高さが100√3 mなら、仰角60°に対応するBHは100 mである。正弦定理で求めるBHは200√2/√3 mで、100 mではない。",
      "ウ": "△ABHのHの角は60°なので、正弦定理よりBH＝200 sin45°/sin60°＝200√2/√3 mとなる。△BHPでPH＝BH tan60°＝200√2 mである。",
      "エ": "仰角60°だからといって200 mに直接tan60°を掛けることはできない。気球の真下までの水平距離はABではなくBHである。",
      "オ": "BHは200√2/√3 mであり、仰角60°から高さはその√3倍である。これを掛けると分母の√3が消えて200√2 mになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 3。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-sugaku/q03.webp"
    ],
    "imageAltTexts": [
      "地点A・B・H、気球Pと距離・角度の関係"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q04",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "独立試行と数直線上の位置",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "数直線上で、点Pは原点Oを出発点とし、サイコロを投げて1又は2の目が出たときは正の向きに2だけ進み、他の目が出たときは負の向きに1だけ進むものとする。サイコロを5回投げたとき、点Pが1の位置にいる確率はいくらか。",
    "choices": {
      "ア": "8/243",
      "イ": "10/243",
      "ウ": "32/243",
      "エ": "55/243",
      "オ": "80/243"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "正に進む回数をkとすると位置は2k−(5−k)＝3k−5なので、k＝2が必要である。確率は₅C₂(1/3)²(2/3)³＝80/243となる。",
    "choiceExplanations": {
      "ア": "8/243はプラス方向へ2回進む一つの決められた順序の確率である。この2回を置く位置は10通りある。",
      "イ": "プラスに進む2回の位置を選ぶ方法は10通りだが、各順序でマイナスになる確率は1/3ではなく2/3である。",
      "ウ": "32/243は5回ともマイナスに進む確率で、その場合の位置は−5となる。",
      "エ": "プラス方向が2回、マイナス方向が3回の並べ方は10通りで、どれも確率8/243を持つ。55/243にはならない。",
      "オ": "正に進む回数をkとすると位置は2k−(5−k)＝3k−5なので、k＝2が必要である。確率は₅C₂(1/3)²(2/3)³＝80/243となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-sugaku/q04.webp"
    ],
    "imageAltTexts": [
      "原点Oと点Pの位置を示した数直線"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q05",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "内接する円と角度",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "図において、二つの円は点Tで内接し、直線lはTを通る二つの円の共通接線である。このとき、角xはいくらか。",
    "choices": {
      "ア": "71°",
      "イ": "76°",
      "ウ": "81°",
      "エ": "86°",
      "オ": "91°"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二つの円はTを中心とする拡大・縮小で重なり、点AとC、点BとDがそれぞれ対応する。△ATBの二つの角が42°と57°なので、xは81°である。",
    "choiceExplanations": {
      "ア": "Tを中心とする相似で内側の円の弦ABは外側の円の弦CDに対応する。そのため三角形の残りの角は180°−42°−57°＝81°になる。",
      "イ": "△ATBのBの角は、相似な△CTDのDの角に等しく57°である。42°と57°の和を180°から引く必要がある。",
      "ウ": "二つの円はTを中心とする拡大・縮小で重なり、点AとC、点BとDがそれぞれ対応する。△ATBの二つの角が42°と57°なので、xは81°である。",
      "エ": "対応する円周上の点を結ぶ弦ABとCDは平行である。したがって42°と57°がxと同じ三角形の残り二つの角になり、xは86°より小さい。",
      "オ": "xを91°とすると42°、57°と合わせて190°になる。三角形の内角の和は180°である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-sugaku/q05.webp"
    ],
    "imageAltTexts": [
      "点Tで内接する円と共通接線、弦AB・CDおよび角度"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q06",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "比を用いた式の値",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "x/2＝y/6＝z/3≠0であるとき、(x＋y＋z)²/(xy＋yz＋zx)の値はいくらか。",
    "choices": {
      "ア": "49/36",
      "イ": "16/9",
      "ウ": "9/4",
      "エ": "25/9",
      "オ": "121/36"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "x＝2k、y＝6k、z＝3kと置くと、分子は(11k)²、分母は(12＋18＋6)k²である。kが0ではないので約分して121/36になる。",
    "choiceExplanations": {
      "ア": "共通の比をkとすればx＋y＋z＝11kであり、分子は49k²にならない。",
      "イ": "比の値をkとすると、分母は12k²＋18k²＋6k²＝36k²、分子は121k²となる。",
      "ウ": "三つの分子の数2、6、3を足すと11なので、平方した値は81ではなく121になる。",
      "エ": "25/9は分母36にそろえると100/36であるが、分子の(x＋y＋z)²は100k²ではなく121k²である。",
      "オ": "x＝2k、y＝6k、z＝3kと置くと、分子は(11k)²、分母は(12＋18＋6)k²である。kが0ではないので約分して121/36になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q07",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "点と直線の距離",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "xy平面上において、点A(2, 3/2)及び点B(−4, 6)を通る直線をlとするとき、原点Oと直線lの距離はいくらか。",
    "choices": {
      "ア": "12/5",
      "イ": "14/5",
      "ウ": "16/5",
      "エ": "18/5",
      "オ": "4"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "二点を通る直線の式は3x＋4y−12＝0である。原点からの距離は定数項の絶対値12を√(3²＋4²)で割るので12/5となる。",
    "choiceExplanations": {
      "ア": "二点を通る直線の式は3x＋4y−12＝0である。原点からの距離は定数項の絶対値12を√(3²＋4²)で割るので12/5となる。",
      "イ": "二点から求めた傾きは−3/4で、y切片は3となる。距離の分子は標準形の定数項の絶対値12で、14にはならない。",
      "ウ": "直線の法線方向は(3,4)で大きさは5である。原点に代入した残差は−12なので、距離は16/5ではない。",
      "エ": "直線を3x＋4y−12＝0の形にすると、原点は左辺に−12を与える。距離の公式ではその絶対値を5で割る。",
      "オ": "この直線はy軸上の点(0,3)を通るので、原点から直線までの最短距離は3以下であり、4にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q08",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角関数の周期",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "cos((2024/3)π)及びtan((2024/3)π)の値の組合せとして正しいのはどれか。各選択肢はcos、tanの順で示す。",
    "choices": {
      "ア": "−1/2、−√3",
      "イ": "−1/2、√3",
      "ウ": "1/2、−√3",
      "エ": "1/2、√3",
      "オ": "√3/2、√3"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "2024＝6×337＋2なので、角は2πの整数倍を除けば2π/3である。第2象限の角で、余弦は−1/2、正接は−√3になる。",
    "choiceExplanations": {
      "ア": "2024＝6×337＋2なので、角は2πの整数倍を除けば2π/3である。第2象限の角で、余弦は−1/2、正接は−√3になる。",
      "イ": "余弦は−1/2で合うが、第2象限の正弦は正なので、正弦を余弦で割った正接は負になる。",
      "ウ": "2π/3の基準角はπ/3だが、第2象限にあるため、余弦は正の1/2ではなく負になる。",
      "エ": "2π/3では余弦が負、正弦が正なので、余弦と正接はどちらも負である。",
      "オ": "√3/2は2π/3の正弦の値である。余弦は−1/2で、正接は二つの値の比で−√3となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q09",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "対数と指数",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "log₂(1/√(2³))の値はいくらか。",
    "choices": {
      "ア": "−3",
      "イ": "−3/2",
      "ウ": "3/2",
      "エ": "3",
      "オ": "6"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "√(2³)＝2^(3/2)なので、逆数は2^(−3/2)である。底が2の対数を取ると−3/2になる。",
    "choiceExplanations": {
      "ア": "−3は真数を1/2³とした場合に得られる値である。ここでは平方根を取るため、指数の絶対値は半分になる。",
      "イ": "√(2³)＝2^(3/2)なので、逆数は2^(−3/2)である。底が2の対数を取ると−3/2になる。",
      "ウ": "3/2は分母にある√(2³)の対数である。逆数を取った数の対数は符号が反対になる。",
      "エ": "log₂(2³)は3だが、真数は平方根の逆数なので、指数を半分にして負の符号を付ける。",
      "オ": "真数は1より小さい正の数であり、底2の対数は負となるので、6にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q10",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "箱の体積を最大化する微分",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "1辺の長さが10 cmの正方形の厚紙がある。この厚紙の四つの隅から合同な正方形を切り取って、図の点線に沿って折り曲げ、ふたのない箱を作る。箱の容積が最大となるときに切り取った正方形の1辺の長さはいくらか。",
    "choices": {
      "ア": "1 cm",
      "イ": "5/3 cm",
      "ウ": "2 cm",
      "エ": "5/2 cm",
      "オ": "3 cm"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "高さはx、底面の一辺は10−2xなので、容積はx(10−2x)²である。導関数(10−2x)(10−6x)の符号が正から負になるx＝5/3で最大となる。",
    "choiceExplanations": {
      "ア": "切り取る長さをxとすると容積の導関数は(10−2x)(10−6x)である。x＝1では正なので、さらに大きい容積を得られる。",
      "イ": "高さはx、底面の一辺は10−2xなので、容積はx(10−2x)²である。導関数(10−2x)(10−6x)の符号が正から負になるx＝5/3で最大となる。",
      "ウ": "x＝2では導関数が6×(−2)で負になっているため、xを少し小さくすると容積は大きくなる。",
      "エ": "x＝5/2での容積は(5/2)×5²＝62.5 cm³である。例えばx＝2の容積72 cm³の方が大きい。",
      "オ": "x＝3では底面の一辺が4 cmで、容積は48 cm³となる。切る長さを2 cmにしてもこれより大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2024/gakka-sugaku/q10.webp"
    ],
    "imageAltTexts": [
      "四つの角から等しい正方形を切る一辺10 cmの厚紙"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q11",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二次曲線と直線の囲む面積",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "xy平面上の曲線y＝x²/4−3と直線y＝x/2−1で囲まれた図形の面積はいくらか。",
    "choices": {
      "ア": "3",
      "イ": "6",
      "ウ": "9",
      "エ": "12",
      "オ": "15"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "交点はx＝−2と4であり、その間は直線が上にある。(x/2−1)−(x²/4−3)＝−x²/4＋x/2＋2を−2から4まで積分すると9になる。",
    "choiceExplanations": {
      "ア": "交点のx座標は−2と4であり、この幅6にわたって直線から曲線を引いた高さを積分すると3より大きくなる。",
      "イ": "二つの交点のx座標の差6は領域の横幅であり、面積ではない。各xの高さは一定ではない。",
      "ウ": "交点はx＝−2と4であり、その間は直線が上にある。(x/2−1)−(x²/4−3)＝−x²/4＋x/2＋2を−2から4まで積分すると9になる。",
      "エ": "高さが2となるのは例えばx＝0で、領域全体で一定ではない。上の直線と下の曲線との差を積分すると12にはならない。",
      "オ": "交点間の高さの最大値はx＝1で9/4であり、幅6の外接長方形の面積13.5でも15より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q12",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "階差数列",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "次の数列の第101項の数として正しいのはどれか。\n2、3、5、8、12、17、23、…",
    "choices": {
      "ア": "4952",
      "イ": "5052",
      "ウ": "9902",
      "エ": "10100",
      "オ": "10102"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "隣り合う項の差は1、2、3、…と続く。第101項は2＋1＋2＋…＋100＝2＋100×101/2＝5052である。",
    "choiceExplanations": {
      "ア": "4952は初項2に1から99までを足した値で、これは第100項になる。第101項はさらに100大きい。",
      "イ": "隣り合う項の差は1、2、3、…と続く。第101項は2＋1＋2＋…＋100＝2＋100×101/2＝5052である。",
      "ウ": "足す差の列は1から100までなので、その和は5050である。初項の2を加えても9902にはならない。",
      "エ": "10100は100×101であるが、1から100までの和はこれを2で割った5050となる。",
      "オ": "10102は100×101に初項2を足した値である。差を1から100まで合計するときには100×101を2で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2024-annual-gakka-sugaku-q13",
    "exam": "kaijo-hoan-gakko",
    "year": 2024,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "ベクトルの垂直条件",
      "管制課程"
    ],
    "difficulty": 3,
    "question": "ベクトルa＝(−4, 3)に垂直で、大きさが15であるベクトルは次のうちではどれか。",
    "choices": {
      "ア": "(−9, 12)",
      "イ": "(−3, −6√6)",
      "ウ": "(3, 6√6)",
      "エ": "(9, 12)",
      "オ": "(18, −6)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "(9,12)はaとの内積が−4×9＋3×12＝0である。大きさは√(81＋144)＝15となり、二つの条件を満たす。",
    "choiceExplanations": {
      "ア": "(−9,12)の長さは15だが、aとの内積は36＋36＝72なので垂直ではない。",
      "イ": "このベクトルとaとの内積は12−18√6であり、0にはならない。",
      "ウ": "このベクトルの長さは√(9＋216)＝15だが、aとの内積は−12＋18√6で垂直条件を満たさない。",
      "エ": "(9,12)はaとの内積が−4×9＋3×12＝0である。大きさは√(81＋144)＝15となり、二つの条件を満たす。",
      "オ": "(18,−6)とaの内積は−72−18＝−90であり、大きさも√360なので15にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002467.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 海上保安学校学生採用試験 管制課程 学科試験（数学）」No. 13。解説は過去問AIの独自作成。"
  }
];
