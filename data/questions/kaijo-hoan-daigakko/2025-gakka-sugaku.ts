import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_DAIGAKKO_2025_GAKKA_SUGAKU: Question[] = [
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q01",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "複素数を解にもつ三次方程式"
    ],
    "difficulty": 3,
    "question": "実数 a を定数とする3次方程式 x³＋x²−4x−a＝0 が x＝1＋i を解にもつとき、a の値はいくらか。ただし、i は虚数単位とする。",
    "choices": {
      "ア": "−6",
      "イ": "−3",
      "ウ": "−2",
      "エ": "−1",
      "オ": "2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "(1＋i)²＝2i、(1＋i)³＝−2＋2i なので、x＝1＋i を代入した左辺は −6−a となる。これが0になるのは a＝−6 のときである。",
    "choiceExplanations": {
      "ア": "(1＋i)²＝2i、(1＋i)³＝−2＋2i なので、x＝1＋i を代入した左辺は −6−a となる。これが0になるのは a＝−6 のときである。",
      "イ": "a＝−3 では左辺が −3 となり、方程式を満たさない。",
      "ウ": "a＝−2 では左辺が −4 となり、方程式を満たさない。",
      "エ": "a＝−1 では左辺が −5 となり、方程式を満たさない。",
      "オ": "a＝2 では左辺が −8 となり、方程式を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q02",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "立方体に内接する正八面体"
    ],
    "difficulty": 3,
    "question": "図のように、一辺の長さ a の立方体 ABCD−EFGH において、その各面の正方形の対角線の交点 P、Q、R、S、T、U を頂点とした正八面体を考える。この正八面体の体積はいくらか。",
    "choices": {
      "ア": "a³/6",
      "イ": "a³/4",
      "ウ": "a³/3",
      "エ": "a³/2",
      "オ": "√2 a³/3"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "赤道面の正方形は対角線がともに a で面積は a²/2、上下の四角錐の高さの和は a なので、体積は a³/6 となる。",
    "choiceExplanations": {
      "ア": "赤道面の正方形は対角線がともに a で面積は a²/2、上下の四角錐の高さの和は a なので、体積は a³/6 となる。",
      "イ": "赤道面の面積 a²/2 に各錐の高さ a/2 を掛けるだけでは、錐体の体積の係数 1/3 と上下二つの分が反映されない。",
      "ウ": "上下の四角錐はそれぞれ高さ a/2 であり、両方が高さ a として計算すると体積を2倍に数える。",
      "エ": "a³/2 は赤道面を底面とする高さ a の柱体の体積であり、ここで求める二つの四角錐の体積の和はその 1/3 である。",
      "オ": "a は正八面体の辺ではなく対向する頂点の距離である。実際の辺長 a/√2 を用いると体積は a³/6 になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-daigakko/2025/gakka-sugaku/q02.webp"
    ],
    "imageAltTexts": [
      "立方体 ABCD−EFGH の各面の中心を結んだ正八面体 PQRSTU"
    ]
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q03",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "サイコロと距離の期待値"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑に当てはまるものの組合せとして正しいのはどれか。\n「1から6までの目が1つずつ書かれたサイコロを2回投げ、その結果に基づいて、数直線上の原点 O にある2点 A、B を動かすことを考える。点 A は1回目に出た目の数だけ正の向きに動かし、点 B は2回目に出た目の数だけ負の向きに動かすとき、動かした後の2点 A、B の距離の期待値は［㋐］である。一方で、点 A は1回目に出た目の数だけ正の向きに動かし、点 B は2回目に出た目の数だけ正の向きに動かすとき、動かした後の2点 A、B の距離の期待値は［㋑］である。」",
    "choices": {
      "ア": "㋐ 7/2、㋑ 0",
      "イ": "㋐ 7/2、㋑ 53/18",
      "ウ": "㋐ 7、㋑ 0",
      "エ": "㋐ 7、㋑ 35/18",
      "オ": "㋐ 7、㋑ 53/18"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "出目を X、Y とすると、反対向きは E[X＋Y]＝7、同じ向きは E[|X−Y|]＝2(5＋8＋9＋8＋5)/36＝35/18 である。",
    "choiceExplanations": {
      "ア": "7/2 はサイコロ1回の期待値であり、同じ向きの距離も出目が異なれば正になる。",
      "イ": "反対向きの距離では出目を2回分足し、同じ向きの距離では絶対差を36通りで平均する。値はそれぞれ 7 と 35/18 である。",
      "ウ": "反対向きの距離の期待値は 7 で合っているが、同じ向きでは符号付きの差でなく絶対差を取る。",
      "エ": "出目を X、Y とすると、反対向きは E[X＋Y]＝7、同じ向きは E[|X−Y|]＝2(5＋8＋9＋8＋5)/36＝35/18 である。",
      "オ": "同じ向きで絶対差が d になる場合は 2(6−d) 通りある。この回数で重み付けすると 53/18 ではなく 35/18 になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q04",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "四次方程式の異なる実数解"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑に当てはまるものの組合せとして正しいのはどれか。\n「x についての4次方程式 (x−m)(x＋2m)(x²−x−m)＝0 の解が3つの異なる実数となるような定数 m を考える。そのような m の個数は［㋐］個であり、そのうち正のものの個数は［㋑］個である。」",
    "choices": {
      "ア": "㋐ 1、㋑ 0",
      "イ": "㋐ 1、㋑ 1",
      "ウ": "㋐ 2、㋑ 0",
      "エ": "㋐ 2、㋑ 1",
      "オ": "㋐ 3、㋑ 1"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "m≠0 で二次因子の異なる実根が一次因子の根と重なる候補は m＝2 と −1/4 である。後者では二次因子自体が重解なので、条件を満たすのは正の m＝2 のみである。",
    "choiceExplanations": {
      "ア": "m＝−1/4 では二次因子が重解をもち、その重解 1/2 は −2m にも等しいため、実数解は2種類になる。",
      "イ": "m≠0 で二次因子の異なる実根が一次因子の根と重なる候補は m＝2 と −1/4 である。後者では二次因子自体が重解なので、条件を満たすのは正の m＝2 のみである。",
      "ウ": "m＝2 のとき解は 2、−4、−1 の3種類であるため、正の候補が少なくとも1個ある。",
      "エ": "m＝0 のとき解は 0、1 の2種類であり、m＝−1/4 も2種類である。m＝2 の1個だけが残る。",
      "オ": "一次因子同士の一致や二次因子の重解も確認すると、m＝0 と −1/4 はともに異なる実数解が2種類である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q05",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "余弦定理と角の二等分線"
    ],
    "difficulty": 3,
    "question": "三角形 ABC において、角 A の二等分線が辺 BC と点 P で交わっている。∠BAP＝∠PAC＝15°、AB＝√3、AC＝1 のとき、線分 PC の長さはいくらか。",
    "choices": {
      "ア": "(√6−√2)/4",
      "イ": "(2√6−4)/3",
      "ウ": "(√3−1)/2",
      "エ": "(3−√3)/2",
      "オ": "(√2＋√6)/4"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "余弦定理で BC²＝3＋1−2√3 cos 30°＝1、二等分線の定理で BP：PC＝√3：1 より PC＝1/(√3＋1)＝(√3−1)/2 である。",
    "choiceExplanations": {
      "ア": "余弦定理で BC＝1 となり、角の二等分線の定理から PC はその 1/(√3＋1) 倍である。",
      "イ": "∠BAC は 30° なので BC＝1 であり、PC は AC の側にあるから AB：AC＝BP：PC を用いる。",
      "ウ": "余弦定理で BC²＝3＋1−2√3 cos 30°＝1、二等分線の定理で BP：PC＝√3：1 より PC＝1/(√3＋1)＝(√3−1)/2 である。",
      "エ": "(3−√3)/2 は BP＝√3/(√3＋1) の値であり、C 側の線分 PC はその 1/√3 倍である。",
      "オ": "PC は BC＝1 の半分より短い。角の二等分線の定理により C 側と B 側の長さの比が 1：√3 だからである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q06",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "ヒストグラムと平均値"
    ],
    "difficulty": 3,
    "question": "あるクラスで、2つの小テスト A、B を実施した。図Ⅰは、生徒の A の得点をヒストグラムにまとめたものであり、図Ⅱは B の得点を横軸、A の得点を縦軸とした散布図である。これらの図を作成して結果を確認したところ、B において4点だった生徒一人の A の採点に誤りが見つかったため、採点し直した。その結果、この生徒の A の正しい得点は7点であることがわかった。このとき、次の記述の空欄に当てはまるものとして正しいのはどれか。\n「正しい数値に直すと、小テスト A の修正後の平均点は、修正前より［　］なる。」",
    "choices": {
      "ア": "0.125点高く",
      "イ": "0.15点低く",
      "ウ": "0.2点低く",
      "エ": "0.25点高く",
      "オ": "0.3点高く"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "散布図の (B, A)＝(4, 1) を (4, 7) に修正すると合計が6点増え、ヒストグラムの人数は24人なので、平均は 6/24＝0.25 点高くなる。",
    "choiceExplanations": {
      "ア": "B が4点の生徒の A の得点は図Ⅱで1点なので、合計は3点ではなく6点増える。",
      "イ": "A の得点は1点から7点へ上がるため、平均も上がる。",
      "ウ": "平均の増加量は合計点の増加 6 をクラス全体の人数 24 で割って求める。",
      "エ": "散布図の (B, A)＝(4, 1) を (4, 7) に修正すると合計が6点増え、ヒストグラムの人数は24人なので、平均は 6/24＝0.25 点高くなる。",
      "オ": "度数分布を合計すると24人であるため、6点の増加を20人で割った 0.3 点にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-daigakko/2025/gakka-sugaku/q06.webp"
    ],
    "imageAltTexts": [
      "図Ⅰ 小テスト A の得点のヒストグラムと、図Ⅱ 横軸 B・縦軸 A の得点の散布図"
    ]
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q07",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "有理式の命題の真偽"
    ],
    "difficulty": 3,
    "question": "命題 A～D のうち真であるもののみを挙げているのはどれか。\nA．実数 x について、x＋1/x≠2 ならば、x≠1 である。\nB．全ての正の実数 x に対し、x＋1/x＞1 である。\nC．x＜0 のとき、x＋1/x の最小値は −2 である。\nD．x についての方程式 x＋1/x＝k は任意の実数 k に対して実数解をもつ。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "A は x＝1 なら和が2という対偶で確認できる。B は相加平均・相乗平均の関係より x＋1/x≧2＞1 なので真である。",
    "choiceExplanations": {
      "ア": "A は x＝1 なら和が2という対偶で確認できる。B は相加平均・相乗平均の関係より x＋1/x≧2＞1 なので真である。",
      "イ": "A は真だが、C の −2 は負の x についての最大値である。",
      "ウ": "B は真だが、x＝−2 で和が −2.5 になるため C は偽である。",
      "エ": "B は真だが、D は k＝0 で x²＋1＝0 となり実数解をもたない。",
      "オ": "C は −2 への上限制約を下限と取り違えており、D も |k|＜2 では実数解をもたない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q08",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "円上の一次式の最小値"
    ],
    "difficulty": 3,
    "question": "実数 x、y が (x−1)²＋(y−2)²＝5 を満たすとき、−x＋2y の最小値はいくらか。",
    "choices": {
      "ア": "−3",
      "イ": "−2",
      "ウ": "−1",
      "エ": "0",
      "オ": "1"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "u＝x−1、v＝y−2 とすると −x＋2y＝3−u＋2v の最小値は 3−√5√5＝−2 である。(u,v)＝(1,−2) で達成する。",
    "choiceExplanations": {
      "ア": "中心 (1, 2) で一次式は3、中心からの最大の減少は5であるため、−3 までは届かない。",
      "イ": "u＝x−1、v＝y−2 とすると −x＋2y＝3−u＋2v の最小値は 3−√5√5＝−2 である。(u,v)＝(1,−2) で達成する。",
      "ウ": "点 (2, 0) は円上にあり、一次式の値が −2 になるため、−1 は最小値ではない。",
      "エ": "円の中心から方向 (1, −2) に進んだ円周上の点で、一次式は 0 より小さい −2 になる。",
      "オ": "一次式は円の中心で3となり、円周までの変位によって最大5減少できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q09",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "合成した三角関数の不等式"
    ],
    "difficulty": 3,
    "question": "0≦θ＜2π のとき、次の不等式を満たすような θ の範囲として正しいのはどれか。\n0＜sin θ−cos θ≦1",
    "choices": {
      "ア": "θ＝0、π/2≦θ＜3π/4、7π/4＜θ＜2π",
      "イ": "π/4≦θ＜π/2、π＜θ≦5π/4",
      "ウ": "π/4＜θ＜5π/4",
      "エ": "π/4＜θ≦π/2、π≦θ＜5π/4",
      "オ": "π/2＜θ≦3π/4、7π/4≦θ＜2π"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "sin θ−cos θ＝√2 sin(θ−π/4) と変形すると、正で 1 以下になるのは π/4＜θ≦π/2 または π≦θ＜5π/4 である。",
    "choiceExplanations": {
      "ア": "θ＝0 では左辺が −1 となり、不等式の下限を満たさない。",
      "イ": "θ＝π/4 と 5π/4 では値が0なので除外し、θ＝π/2 と π では値が1なので含める。",
      "ウ": "この範囲は正になる区間だが、例えば θ＝3π/4 では値が √2 となって上限を超える。",
      "エ": "sin θ−cos θ＝√2 sin(θ−π/4) と変形すると、正で 1 以下になるのは π/4＜θ≦π/2 または π≦θ＜5π/4 である。",
      "オ": "π/2 の直後では値が1を超え、7π/4 以降では値が負になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q10",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "常用対数による累乗の大小比較"
    ],
    "difficulty": 3,
    "question": "3²²²、(10/9)²⁰²⁵、8.1¹⁰⁰ の大小関係として正しいのはどれか。ただし、log₁₀3＝0.4771 とする。",
    "choices": {
      "ア": "3²²²＜(10/9)²⁰²⁵＜8.1¹⁰⁰",
      "イ": "3²²²＜8.1¹⁰⁰＜(10/9)²⁰²⁵",
      "ウ": "(10/9)²⁰²⁵＜3²²²＜8.1¹⁰⁰",
      "エ": "8.1¹⁰⁰＜3²²²＜(10/9)²⁰²⁵",
      "オ": "8.1¹⁰⁰＜(10/9)²⁰²⁵＜3²²²"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "8.1＝3⁴/10、9＝3² より、提示順の常用対数は約105.92、92.745、90.84 である。対数は単調増加なので元の数もこの順に大きい。",
    "choiceExplanations": {
      "ア": "3²²² の対数は約105.92で3つの中で最大である。",
      "イ": "8.1¹⁰⁰ の対数は 100(4 log₁₀3−1)＝90.84 であり、3²²² の約105.92より小さい。",
      "ウ": "8.1¹⁰⁰ の対数 90.84 は (10/9)²⁰²⁵ の 92.745 より小さい。",
      "エ": "最小は 8.1¹⁰⁰ だが、3²²² の対数は (10/9)²⁰²⁵ の対数より大きい。",
      "オ": "8.1＝3⁴/10、9＝3² より、提示順の常用対数は約105.92、92.745、90.84 である。対数は単調増加なので元の数もこの順に大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q11",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "放物線と三角形の面積の二等分"
    ],
    "difficulty": 3,
    "question": "a を定数とする。図のように、xy 平面上において、2次関数 y＝ax(x−6) のグラフが、x 軸、直線 y＝−x 及び直線 y＝x−6 で囲まれてできる三角形を、面積の等しい2つの図形に分けている。このとき、a の値はいくらか。",
    "choices": {
      "ア": "1/12",
      "イ": "1/8",
      "ウ": "1/6",
      "エ": "1/4",
      "オ": "1/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "三角形の底辺は6、高さは3なので面積は9である。放物線と x 軸の間の面積は ∫₀⁶ ax(6−x) dx＝36a であり、36a＝9/2 から a＝1/8 を得る。",
    "choiceExplanations": {
      "ア": "a＝1/12 では x 軸と放物線の間の面積が 36a＝3 となり、三角形の半分の 9/2 に届かない。",
      "イ": "三角形の底辺は6、高さは3なので面積は9である。放物線と x 軸の間の面積は ∫₀⁶ ax(6−x) dx＝36a であり、36a＝9/2 から a＝1/8 を得る。",
      "ウ": "a＝1/6 では放物線と x 軸の間の面積が6となり、三角形の半分より大きい。",
      "エ": "36a＝9 は三角形全体の面積を用いた計算であり、求める面積は 9/2 である。",
      "オ": "a＝1/2 では x＝3 の放物線の y 座標が −4.5 になり、三角形の頂点の y 座標 −3 より下に来る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-daigakko/2025/gakka-sugaku/q11.webp"
    ],
    "imageAltTexts": [
      "x 軸と直線 y＝−x、y＝x−6 が囲む三角形を放物線が二分している図"
    ]
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q12",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "一次漸化式と等比数列"
    ],
    "difficulty": 3,
    "question": "a を定数とする。次のように定められた数列 {aₙ} に対し、bₙ＝aₙ−a で定まる数列 {bₙ} が等比数列となった。このとき、b₅ はいくらか。\na₁＝1、aₙ₊₁＝−2aₙ＋1（n＝1、2、3、…）",
    "choices": {
      "ア": "−16/3",
      "イ": "−5",
      "ウ": "−1/3",
      "エ": "10",
      "オ": "32/3"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "不動点 a は a＝−2a＋1 より 1/3 で、bₙ₊₁＝−2bₙ となる。b₅＝(1−1/3)(−2)⁴＝32/3 である。",
    "choiceExplanations": {
      "ア": "a＝1/3 とすると b₁＝2/3 であり、第5項では公比 −2 を4回掛けるので符号は正になる。",
      "イ": "第5項は初項 2/3 と公比の4乗 16 の積であり、−5 にはならない。",
      "ウ": "1/3 は漸化式の不動点であって b₅ の大きさではない。b₅ は a₅＝11 から 1/3 を引いた値である。",
      "エ": "a₅＝11 から引く値は1ではなく不動点 1/3 であるため、10 より大きい。",
      "オ": "不動点 a は a＝−2a＋1 より 1/3 で、bₙ₊₁＝−2bₙ となる。b₅＝(1−1/3)(−2)⁴＝32/3 である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-daigakko-2025-annual-gakka-sugaku-q13",
    "exam": "kaijo-hoan-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "中線の長さ"
    ],
    "difficulty": 3,
    "question": "図のように、三角形 ABC において、辺 AB、BC、CA の中点をそれぞれ L、M、N とするとき、∠BAC＝π/3、AL＝5、AN＝3 となっている。このとき、線分 AM の長さはいくらか。",
    "choices": {
      "ア": "√19",
      "イ": "√31",
      "ウ": "7",
      "エ": "8",
      "オ": "√79"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ベクトル AM＝(AB＋AC)/2＝AL＋AN の長さの二乗は 25＋9＋2×5×3×cos(π/3)＝49 なので、AM＝7 である。",
    "choiceExplanations": {
      "ア": "√19 はベクトル AL と AN の差の長さであり、中点 M へのベクトルはこの2本の和になる。",
      "イ": "二乗を求めるときは内積の項 2×5×3×cos(π/3)＝15 を、5²＋3² に加える。",
      "ウ": "ベクトル AM＝(AB＋AC)/2＝AL＋AN の長さの二乗は 25＋9＋2×5×3×cos(π/3)＝49 なので、AM＝7 である。",
      "エ": "8 は二つのベクトルの大きさの和で、なす角が π/3 なので合成後の長さはそれより短い。",
      "オ": "内積の項は角の余弦 1/2 を用いて15となり、平方和34に足した結果は79ではなく49である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016368.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 海上保安大学校学生採用試験 学科試験」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-daigakko/2025/gakka-sugaku/q13.webp"
    ],
    "imageAltTexts": [
      "三角形 ABC の辺の中点 L、M、N と、角 A 及び線分 AL、AN の長さ"
    ]
  }
];
