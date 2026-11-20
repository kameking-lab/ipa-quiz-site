import type { Question } from "@/lib/questions/types";

export const NAGANO_2026_SENMON_SUGAKU: Question[] = [
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "1(6)",
    "category": "算数・数学",
    "topicTags": [
      "標本調査",
      "標識再捕法",
      "割合"
    ],
    "difficulty": 3,
    "question": "袋の中にコップ1杯分の米粒が入っている。この袋の中の米粒の数を推測するために、着色した赤い米粒300粒をこの袋の中に加え、よくかき混ぜてから無作為に米粒を取り出して調べたところ、米粒は全部で336粒あり、そのうちの16粒が赤い米粒であった。最初に袋の中に入っていたコップ1杯分の米粒の数は、およそ何粒と推測されるか求めなさい。",
    "explanation": "全体でも赤い米粒の割合を16/336とみなせるので、赤い粒を加えた後の総数は300×336÷16＝6,300粒と推定できる。加えた300粒を引くと、およそ6,000粒である。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問1(6)。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "6000",
    "numericAnswer": {
      "format": "integer",
      "unit": "粒"
    },
    "officialAnswerNumber": "6000",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-01",
    "qNumber": 1
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "1(7)",
    "category": "算数・数学",
    "topicTags": [
      "平面図形",
      "円周角の定理の逆",
      "対頂角"
    ],
    "difficulty": 3,
    "question": "右の図1の四角形ABCDにおいて、∠EBC＝42°、∠ECD＝58°、∠ADC＝80°、∠AED＝108°である。このとき、∠xの大きさを求めなさい。",
    "explanation": "∠CED＝180°−108°＝72°なので、∠CDE＝180°−72°−58°＝50°となる。∠ADE＝80°−50°＝30°より∠DAC＝180°−108°−30°＝42°で、∠DBCと等しい。円周角の定理の逆から4点は同一円周上にあり、∠x＝∠BAC＝∠BDC＝50°である。",
    "hasImage": true,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問1(7)。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "imageUrls": [
      "/questions/kyoin-nagano/2026/senmon-sugaku-3.webp"
    ],
    "imageAltTexts": [
      "四角形ABCD。AとCを結ぶ対角線とBとDを結ぶ対角線がEで交わる。Bの∠EBCは42°、Cの∠ECDは58°、Dの内角は80°、∠AEDは108°。Aでは∠BACがxと示される。"
    ],
    "type": "numeric",
    "answer": "50",
    "numericAnswer": {
      "format": "integer",
      "unit": "°"
    },
    "officialAnswerNumber": "50",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-02",
    "qNumber": 2
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "2(1)①",
    "category": "算数・数学",
    "topicTags": [
      "場合の数",
      "組合せ",
      "グループ分け"
    ],
    "difficulty": 3,
    "question": "9人の中学生を5人、3人、1人の3つの組に分けるとき、分け方は何通りあるか求めなさい。",
    "explanation": "9人から5人、残る4人から3人を選ぶと、残りの1人も決まる。組の人数がすべて異なるので、C(9,5)×C(4,3)＝126×4＝504通りである。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問2(1)①。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "504",
    "numericAnswer": {
      "format": "integer",
      "unit": "通り"
    },
    "officialAnswerNumber": "504",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-03",
    "qNumber": 3
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "2(1)②",
    "category": "算数・数学",
    "topicTags": [
      "場合の数",
      "組合せ",
      "ラベル付きの組"
    ],
    "difficulty": 3,
    "question": "9人の中学生をA、B、Cの3つの組に3人ずつ分けるとき、分け方は何通りあるか求めなさい。",
    "explanation": "A組の3人を9人から、B組の3人を残り6人から選ぶと、C組の3人も決まる。組に名前があり区別するので、C(9,3)×C(6,3)＝84×20＝1,680通りになる。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問2(1)②。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "1680",
    "numericAnswer": {
      "format": "integer",
      "unit": "通り"
    },
    "officialAnswerNumber": "1680",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-04",
    "qNumber": 4
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "2(1)③",
    "category": "算数・数学",
    "topicTags": [
      "場合の数",
      "組合せ",
      "ラベルのない組"
    ],
    "difficulty": 3,
    "question": "9人の中学生を3人ずつ3つの組に分けるとき、分け方は何通りあるか求めなさい。",
    "explanation": "組を区別して数えると1,680通りだが、同じ3組の分け方を組名の付け方3!通りずつ数えている。組を区別しないので、1,680÷6＝280通りである。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問2(1)③。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "280",
    "numericAnswer": {
      "format": "integer",
      "unit": "通り"
    },
    "officialAnswerNumber": "280",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-05",
    "qNumber": 5
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "2(2)①x",
    "category": "算数・数学",
    "topicTags": [
      "データの活用",
      "度数分布",
      "相対度数"
    ],
    "difficulty": 3,
    "question": "T中学校の1年生60人全員について通学時間を調べた。次の表は、その結果を度数分布表にまとめたものである。\n\n| 階級（分） | 度数（人） | 相対度数 |\n| --- | --- | --- |\n| 0以上10未満 | 3 | 0.05 |\n| 10以上20未満 | 9 | 0.15 |\n| 20以上30未満 | x | 0.40 |\n| 30以上40未満 | 18 | y |\n| 40以上50未満 | 6 | 0.10 |\n| 計 | 60 | 1.00 |\n\n表のxにあてはまる数を求めなさい。",
    "explanation": "20分以上30分未満の相対度数が0.40で、全員は60人である。この階級の人数は60×0.40＝24人になる。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問2(2)①x。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "24",
    "numericAnswer": {
      "format": "integer",
      "unit": "人"
    },
    "officialAnswerNumber": "24",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-06",
    "qNumber": 6
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "2(2)①y",
    "category": "算数・数学",
    "topicTags": [
      "データの活用",
      "度数分布",
      "相対度数"
    ],
    "difficulty": 3,
    "question": "T中学校の1年生60人全員について通学時間を調べた。次の表は、その結果を度数分布表にまとめたものである。\n\n| 階級（分） | 度数（人） | 相対度数 |\n| --- | --- | --- |\n| 0以上10未満 | 3 | 0.05 |\n| 10以上20未満 | 9 | 0.15 |\n| 20以上30未満 | x | 0.40 |\n| 30以上40未満 | 18 | y |\n| 40以上50未満 | 6 | 0.10 |\n| 計 | 60 | 1.00 |\n\n表のyにあてはまる数を求めなさい。",
    "explanation": "30分以上40分未満の度数は18人、人数の合計は60人である。この階級の相対度数は18÷60＝0.30になる。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問2(2)①y。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "0.30",
    "numericAnswer": {
      "format": "decimal",
      "unit": "（相対度数）",
      "precision": 2
    },
    "officialAnswerNumber": "0.30",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-07",
    "qNumber": 7
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "2(2)②",
    "category": "算数・数学",
    "topicTags": [
      "データの活用",
      "ヒストグラム",
      "中央値"
    ],
    "difficulty": 3,
    "question": "T中学校の1年生60人全員について通学時間を調べ、学級別にヒストグラムに表した。1年1組と1年2組の中央値はどちらが大きいか、次のア、イから正しいものを選びなさい。",
    "explanation": "1組の15・16番目は20分以上30分未満、2組の15・16番目は30分以上40分未満の階級にある。したがって2組の中央値の方が大きい。",
    "hasImage": true,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問2(2)②。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "imageUrls": [
      "/questions/kyoin-nagano/2026/senmon-sugaku-4.webp"
    ],
    "imageAltTexts": [
      "横軸が通学時間で、10分刻みの階級が0分から50分まで並ぶ。0分以上10分未満から順に、1組の度数は1、7、14、6、2人、2組は2、2、10、12、4人。"
    ],
    "type": "multiple-choice",
    "choices": {
      "ア": "1年1組の中央値のほうが大きい。",
      "イ": "1年2組の中央値のほうが大きい。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "choiceExplanations": {
      "ア": "1組の中央に当たる15番目と16番目は20分以上30分未満であり、2組の中央の生徒が属する階級より短い。",
      "イ": "1組の15・16番目は20分以上30分未満、2組の15・16番目は30分以上40分未満の階級にある。したがって2組の中央値の方が大きい。"
    },
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-08",
    "qNumber": 8
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "3(1)②",
    "category": "算数・数学",
    "topicTags": [
      "円",
      "相似",
      "円周角"
    ],
    "difficulty": 3,
    "question": "4点A、B、C、Dを通る円Oがあり、ACは円Oの直径である。Aから線分BDに垂線をひき、BDとの交点をEとする。また、CとDを結ぶ。AB＝6cm、AD＝4cm、AE＝3cmのとき、円Oの半径を求めなさい。",
    "explanation": "弧ADに対する円周角より∠ABE＝∠ACDであり、∠AEB＝∠ADC＝90°なので、△ABEと△ACDは相似である。AB/AC＝AE/AD＝3/4よりAC＝8cmで、半径は4cmとなる。",
    "hasImage": true,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問3(1)②。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "imageUrls": [
      "/questions/kyoin-nagano/2026/senmon-sugaku-5.webp"
    ],
    "imageAltTexts": [
      "円Oの上方に点A、左にB、下方にC、右にDがある。直径ACと弦BDが交わり、AからBDに下ろした垂線がEで交わる。AとB、CとDを結ぶ線分も描かれている。"
    ],
    "type": "numeric",
    "answer": "4",
    "numericAnswer": {
      "format": "integer",
      "unit": "cm"
    },
    "officialAnswerNumber": "4",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-09",
    "qNumber": 9
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "4(1)x",
    "category": "算数・数学",
    "topicTags": [
      "関数",
      "反比例",
      "グラフの平行移動"
    ],
    "difficulty": 3,
    "question": "f(x)＝(2x−3)/(x−2) とする。関数 y＝f(x) のグラフは、関数 y＝1/x のグラフをx軸方向、y軸方向に平行移動した曲線である。x軸方向の移動量を答えなさい。",
    "explanation": "2x−3＝2(x−2)＋1なので、f(x)＝1/(x−2)＋2である。xをx−2に置き換えると、グラフはx軸の正の向きに2移動する。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問4(1)x。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "2",
    "numericAnswer": {
      "format": "integer",
      "unit": "（x軸の正の向き）"
    },
    "officialAnswerNumber": "2",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-10",
    "qNumber": 10
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "4(1)y",
    "category": "算数・数学",
    "topicTags": [
      "関数",
      "反比例",
      "グラフの平行移動"
    ],
    "difficulty": 3,
    "question": "f(x)＝(2x−3)/(x−2) とする。関数 y＝f(x) のグラフは、関数 y＝1/x のグラフをx軸方向、y軸方向に平行移動した曲線である。y軸方向の移動量を答えなさい。",
    "explanation": "2x−3＝2(x−2)＋1なので、f(x)＝1/(x−2)＋2である。式に2を足すことで、グラフはy軸の正の向きに2移動する。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問4(1)y。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "numeric",
    "answer": "2",
    "numericAnswer": {
      "format": "integer",
      "unit": "（y軸の正の向き）"
    },
    "officialAnswerNumber": "2",
    "isCalculation": true,
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-11",
    "qNumber": 11
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "5(2)①",
    "category": "教育課程",
    "topicTags": [
      "中学校学習指導要領",
      "数学的活動",
      "問題解決"
    ],
    "difficulty": 3,
    "question": "「中学校学習指導要領解説 数学編」（平成29年7月）第4章 指導計画の作成と内容の取扱い 3 数学的活動の取組における配慮事項をふまえて、指定された空欄に当てはまる語句を【選択肢】から選びなさい。\n(2) 数学を活用して問題解決する方法を理解するとともに、自ら問題を見いだし、解決するための構想を立て、実践し、その過程や結果を評価・改善する機会を設けること。\n数学的活動は、基本的に（①）の形で行われる。その過程では、生徒が（②）をもって活動に取り組めるよう配慮する。生徒が取り組む問題については、教師が提示するものだけでなく、適切な場面を設け、生徒が既習の数学を基にするなどして自ら問題を見いだしたり、その問題から導かれるであろう結果を予想したりする機会を設けることが大切である。また、その解決の過程では、問題を解決するために既習の何を用いてどのように表したり処理したりする必要があるのかについて生徒が構想する場面を設けることが重要である。さらに、その構想に基づいて試行錯誤をしたり、データを収集整理したり、観察したり、操作したり、実験したりするなどの活動を必要に応じて選択し行いながら、結果を導くことができるようにすることも重要である。このように生徒が（②）をもつことは、数学的活動に主体的に取り組むことができるようにするために必要である。また、見いだした問題を一旦解決し終えた後で、導いた結果やその価値を振り返って自覚化することは、問題解決の意義や数学のよさを実感する上で大切である。同時に、統合的・発展的な考察に向けた新しい問題を得る機会ともなる。\nさらに、これらの一連の問題解決の過程を（③）ことで、数学を活用して問題解決する方法を生徒が理解できるようにする。どのような場面で何をどのように捉えて考察したり、どのように表現・処理したりすれば問題がよりよく解決できるのかといった各場面における方法に着目し、うまくいったことやうまくいかなかったことを場面と関連付けて整理することが大切である。\nこのように、数学を活用して問題解決する方法を理解することは、生徒の数学的な見方・考え方を確かで豊かなものに鍛えていくことにつながる。その後に出合う新たな問題解決で（②）をもって主体的に取り組むためにも重要である。\n\n解答する空欄は（①）。",
    "explanation": "数学的活動は、問題を見いだし、構想を立てて実践し、その解決を評価するという過程を含む。解説では「問題解決」の形で行うとしている。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問5(2)①。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "multiple-choice",
    "choices": {
      "ア": "振り返る",
      "イ": "個別最適",
      "ウ": "具体化する",
      "エ": "見通し",
      "オ": "意欲",
      "カ": "理想化する",
      "キ": "問題解決",
      "ク": "主体性",
      "ケ": "一斉授業"
    },
    "answer": "キ",
    "officialAnswerNumber": "キ",
    "choiceExplanations": {
      "ア": "振り返るとは、取り組んだ過程や結果を見直すことである。数学的活動がとる基本の形は「問題解決」である。",
      "イ": "個別最適は、生徒の特性や学習状況に応じて学びを調整することを表す。数学的活動がとる基本の形は「問題解決」である。",
      "ウ": "具体化するとは、抽象的な考えなどを具体的な形にすることである。数学的活動がとる基本の形は「問題解決」である。",
      "エ": "見通しをもつとは、活動で何をどのように進めるかを見込むことである。数学的活動がとる基本の形は「問題解決」である。",
      "オ": "意欲は、目的のために取り組もうとする気持ちを指す。数学的活動がとる基本の形は「問題解決」である。",
      "カ": "理想化するとは、複雑な状況から数学的に重要な条件を取り出して単純に捉えることである。数学的活動がとる基本の形は「問題解決」である。",
      "キ": "数学的活動は、問題を見いだし、構想を立てて実践し、その解決を評価するという過程を含む。解説では「問題解決」の形で行うとしている。",
      "ク": "主体性は、自ら判断して行動する姿勢を表す。数学的活動がとる基本の形は「問題解決」である。",
      "ケ": "一斉授業は、学級などの集団全体に同時に指導する形態である。数学的活動がとる基本の形は「問題解決」である。"
    },
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-12",
    "qNumber": 12
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "5(2)②",
    "category": "教育課程",
    "topicTags": [
      "中学校学習指導要領",
      "数学的活動",
      "問題解決"
    ],
    "difficulty": 3,
    "question": "「中学校学習指導要領解説 数学編」（平成29年7月）第4章 指導計画の作成と内容の取扱い 3 数学的活動の取組における配慮事項をふまえて、指定された空欄に当てはまる語句を【選択肢】から選びなさい。\n(2) 数学を活用して問題解決する方法を理解するとともに、自ら問題を見いだし、解決するための構想を立て、実践し、その過程や結果を評価・改善する機会を設けること。\n数学的活動は、基本的に（①）の形で行われる。その過程では、生徒が（②）をもって活動に取り組めるよう配慮する。生徒が取り組む問題については、教師が提示するものだけでなく、適切な場面を設け、生徒が既習の数学を基にするなどして自ら問題を見いだしたり、その問題から導かれるであろう結果を予想したりする機会を設けることが大切である。また、その解決の過程では、問題を解決するために既習の何を用いてどのように表したり処理したりする必要があるのかについて生徒が構想する場面を設けることが重要である。さらに、その構想に基づいて試行錯誤をしたり、データを収集整理したり、観察したり、操作したり、実験したりするなどの活動を必要に応じて選択し行いながら、結果を導くことができるようにすることも重要である。このように生徒が（②）をもつことは、数学的活動に主体的に取り組むことができるようにするために必要である。また、見いだした問題を一旦解決し終えた後で、導いた結果やその価値を振り返って自覚化することは、問題解決の意義や数学のよさを実感する上で大切である。同時に、統合的・発展的な考察に向けた新しい問題を得る機会ともなる。\nさらに、これらの一連の問題解決の過程を（③）ことで、数学を活用して問題解決する方法を生徒が理解できるようにする。どのような場面で何をどのように捉えて考察したり、どのように表現・処理したりすれば問題がよりよく解決できるのかといった各場面における方法に着目し、うまくいったことやうまくいかなかったことを場面と関連付けて整理することが大切である。\nこのように、数学を活用して問題解決する方法を理解することは、生徒の数学的な見方・考え方を確かで豊かなものに鍛えていくことにつながる。その後に出合う新たな問題解決で（②）をもって主体的に取り組むためにも重要である。\n\n解答する空欄は（②）。",
    "explanation": "生徒が問題の結果を予想し、解決するための構想を立てられるようにする。解説は「見通し」をもって活動することを重視している。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問5(2)②。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "multiple-choice",
    "choices": {
      "ア": "振り返る",
      "イ": "個別最適",
      "ウ": "具体化する",
      "エ": "見通し",
      "オ": "意欲",
      "カ": "理想化する",
      "キ": "問題解決",
      "ク": "主体性",
      "ケ": "一斉授業"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "choiceExplanations": {
      "ア": "振り返るとは、取り組んだ過程や結果を見直すことである。予想や構想をもって活動に取り組む際の語は「見通し」である。",
      "イ": "個別最適は、生徒の特性や学習状況に応じて学びを調整することを表す。予想や構想をもって活動に取り組む際の語は「見通し」である。",
      "ウ": "具体化するとは、抽象的な考えなどを具体的な形にすることである。予想や構想をもって活動に取り組む際の語は「見通し」である。",
      "エ": "生徒が問題の結果を予想し、解決するための構想を立てられるようにする。解説は「見通し」をもって活動することを重視している。",
      "オ": "意欲は、目的のために取り組もうとする気持ちを指す。予想や構想をもって活動に取り組む際の語は「見通し」である。",
      "カ": "理想化するとは、複雑な状況から数学的に重要な条件を取り出して単純に捉えることである。予想や構想をもって活動に取り組む際の語は「見通し」である。",
      "キ": "問題解決は、課題を見つけ、考え、解決に至る活動である。予想や構想をもって活動に取り組む際の語は「見通し」である。",
      "ク": "主体性は、自ら判断して行動する姿勢を表す。予想や構想をもって活動に取り組む際の語は「見通し」である。",
      "ケ": "一斉授業は、学級などの集団全体に同時に指導する形態である。予想や構想をもって活動に取り組む際の語は「見通し」である。"
    },
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-13",
    "qNumber": 13
  },
  {
    "exam": "kyoin-nagano",
    "session": "senmon-sugaku",
    "year": 2026,
    "season": "annual",
    "officialQuestionLabel": "5(2)③",
    "category": "教育課程",
    "topicTags": [
      "中学校学習指導要領",
      "数学的活動",
      "問題解決"
    ],
    "difficulty": 3,
    "question": "「中学校学習指導要領解説 数学編」（平成29年7月）第4章 指導計画の作成と内容の取扱い 3 数学的活動の取組における配慮事項をふまえて、指定された空欄に当てはまる語句を【選択肢】から選びなさい。\n(2) 数学を活用して問題解決する方法を理解するとともに、自ら問題を見いだし、解決するための構想を立て、実践し、その過程や結果を評価・改善する機会を設けること。\n数学的活動は、基本的に（①）の形で行われる。その過程では、生徒が（②）をもって活動に取り組めるよう配慮する。生徒が取り組む問題については、教師が提示するものだけでなく、適切な場面を設け、生徒が既習の数学を基にするなどして自ら問題を見いだしたり、その問題から導かれるであろう結果を予想したりする機会を設けることが大切である。また、その解決の過程では、問題を解決するために既習の何を用いてどのように表したり処理したりする必要があるのかについて生徒が構想する場面を設けることが重要である。さらに、その構想に基づいて試行錯誤をしたり、データを収集整理したり、観察したり、操作したり、実験したりするなどの活動を必要に応じて選択し行いながら、結果を導くことができるようにすることも重要である。このように生徒が（②）をもつことは、数学的活動に主体的に取り組むことができるようにするために必要である。また、見いだした問題を一旦解決し終えた後で、導いた結果やその価値を振り返って自覚化することは、問題解決の意義や数学のよさを実感する上で大切である。同時に、統合的・発展的な考察に向けた新しい問題を得る機会ともなる。\nさらに、これらの一連の問題解決の過程を（③）ことで、数学を活用して問題解決する方法を生徒が理解できるようにする。どのような場面で何をどのように捉えて考察したり、どのように表現・処理したりすれば問題がよりよく解決できるのかといった各場面における方法に着目し、うまくいったことやうまくいかなかったことを場面と関連付けて整理することが大切である。\nこのように、数学を活用して問題解決する方法を理解することは、生徒の数学的な見方・考え方を確かで豊かなものに鍛えていくことにつながる。その後に出合う新たな問題解決で（②）をもって主体的に取り組むためにも重要である。\n\n解答する空欄は（③）。",
    "explanation": "問題解決の過程を振り返ることで、場面ごとに使った考え方や方法を整理できる。数学を活用して問題を解決する方法の理解につながる。",
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku.pdf",
    "sourceAnswerUrl": "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/documents/03_suugaku_k.pdf",
    "sourceAttribution": "出典：長野県教育委員会 令和9年度長野県教員採用選考 中学校専門問題 数学 問5(2)③。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "type": "multiple-choice",
    "choices": {
      "ア": "振り返る",
      "イ": "個別最適",
      "ウ": "具体化する",
      "エ": "見通し",
      "オ": "意欲",
      "カ": "理想化する",
      "キ": "問題解決",
      "ク": "主体性",
      "ケ": "一斉授業"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "choiceExplanations": {
      "ア": "問題解決の過程を振り返ることで、場面ごとに使った考え方や方法を整理できる。数学を活用して問題を解決する方法の理解につながる。",
      "イ": "個別最適は、生徒の特性や学習状況に応じて学びを調整することを表す。一連の問題解決の後に、その過程を「振り返る」ことを示している。",
      "ウ": "具体化するとは、抽象的な考えなどを具体的な形にすることである。一連の問題解決の後に、その過程を「振り返る」ことを示している。",
      "エ": "見通しをもつとは、活動で何をどのように進めるかを見込むことである。一連の問題解決の後に、その過程を「振り返る」ことを示している。",
      "オ": "意欲は、目的のために取り組もうとする気持ちを指す。一連の問題解決の後に、その過程を「振り返る」ことを示している。",
      "カ": "理想化するとは、複雑な状況から数学的に重要な条件を取り出して単純に捉えることである。一連の問題解決の後に、その過程を「振り返る」ことを示している。",
      "キ": "問題解決は、課題を見つけ、考え、解決に至る活動である。一連の問題解決の後に、その過程を「振り返る」ことを示している。",
      "ク": "主体性は、自ら判断して行動する姿勢を表す。一連の問題解決の後に、その過程を「振り返る」ことを示している。",
      "ケ": "一斉授業は、学級などの集団全体に同時に指導する形態である。一連の問題解決の後に、その過程を「振り返る」ことを示している。"
    },
    "id": "kyoin-nagano-2026-annual-senmon-sugaku-14",
    "qNumber": 14
  }
];
