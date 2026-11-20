import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2025_SENMON_DIGITAL: Question[] = [
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q01",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "最大公約数と等差数列",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "1以上1024以下の整数のうち、1024との正の公約数が1以外に一つだけ存在する数の総和はいくらか。",
    "choices": {
      "ア": "130560",
      "イ": "131072",
      "ウ": "261120",
      "エ": "262144",
      "オ": "1050112"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "1以外の公約数が一つだけなら、その数は2であり、求める整数は2、6、10、…、1022である。この等差数列は256項あり、両端の平均512との積は131072となる。",
    "choiceExplanations": {
      "ア": "1024＝2¹⁰なので、条件を満たすのは2の倍数で4の倍数ではない整数である。初項2、末項1022の256項を足すと、平均512を掛けて131072になる。",
      "イ": "1以外の公約数が一つだけなら、その数は2であり、求める整数は2、6、10、…、1022である。この等差数列は256項あり、両端の平均512との積は131072となる。",
      "ウ": "2で割り切れる数でも、4で割り切れると公約数として4が加わる。最初から4飛びで256項を取ると、261120にはならない。",
      "エ": "2、6、…、1022の両端の和は1024だが、それは2項分の和なので、組数128を掛ける。256を掛けると総和を二重に数える。",
      "オ": "奇数は1024と1より大きい公約数をもたず、4の倍数は2と4の両方を公約数にもつ。残る2の奇数倍だけを足すので131072である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q02",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "2変数の二次式の平方完成",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "x、yが全ての実数値をとるとき、x²＋2xy＋4y²＋2x＋8yの最小値はいくらか。",
    "choices": {
      "ア": "−4",
      "イ": "−3",
      "ウ": "−2",
      "エ": "−1",
      "オ": "0"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "式は(x＋y＋1)²＋3(y＋1)²−4となり、二つの平方はともに非負である。x＝0、y＝−1なら両方が0となるため、最小値は−4である。",
    "choiceExplanations": {
      "ア": "式は(x＋y＋1)²＋3(y＋1)²−4となり、二つの平方はともに非負である。x＝0、y＝−1なら両方が0となるため、最小値は−4である。",
      "イ": "x＝0、y＝−1を代入すると4−8＝−4になる。−3より小さい値を取る点があるので、−3は最小値ではない。",
      "ウ": "xの項について平方完成すると、(x＋y＋1)²＋3y²＋6y−1となる。yの項の下限はy＝−1で得られ、全体の最小値は−4になる。",
      "エ": "yだけを0に固定するとx²＋2xの最小値は−1である。yも動かせるので、y＝−1を選ぶとx²−4となり、さらに小さくできる。",
      "オ": "原点では式の値は0だが、yだけを−1に変えると値は−4になる。二つの平方にまとめた式から、これより小さな値は取らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q03",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "正四面体の辺に接する球と体積",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、正四面体の全ての辺に半径1の球が接するとき、この正四面体の体積はいくらか。\nなお、一辺の長さがaの正四面体の体積は、(√2/12)a³である。",
    "choices": {
      "ア": "4/3",
      "イ": "4√3/3",
      "ウ": "8/3",
      "エ": "8√3/3",
      "オ": "16/3"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "頂点を立方体の互い違いの4頂点に取ると、一辺は立方体の面対角線で、6辺の中点が立方体各面の中心になる。各面までの距離が球の半径1なので、立方体の一辺は2、体積は(√2/12)(2√2)³＝8/3となる。",
    "choiceExplanations": {
      "ア": "球の中心を原点にして正四面体の頂点を(1,1,1)、(1,−1,−1)、(−1,1,−1)、(−1,−1,1)と置くと、辺の中点は中心から距離1にある。辺長が2√2なので、与えられた体積式の結果は4/3を上回る。",
      "イ": "球の直径2は対向する辺の中点を結ぶ長さで、正四面体の一辺aの1/√2倍である。a＝2√2が得られ、その三乗に√2/12を掛けると8/3である。",
      "ウ": "頂点を立方体の互い違いの4頂点に取ると、一辺は立方体の面対角線で、6辺の中点が立方体各面の中心になる。各面までの距離が球の半径1なので、立方体の一辺は2、体積は(√2/12)(2√2)³＝8/3となる。",
      "エ": "球が接するのは各辺の中点であり、球の半径は頂点までの距離ではない。立方体の向かい合う面の中心が球の直径の両端となるので、一辺2√2を用いると体積に√3は現れない。",
      "オ": "辺長2√2の三乗は16√2である。与式の係数√2/12を掛けると32/12＝8/3になり、16/3にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q03.webp"
    ],
    "imageAltTexts": [
      "半径1の球が全ての辺に接する正四面体の図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q04",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "多項式の下限とパラメータ",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "aを定数として、二つの関数f(x)、g(x)を次のとおり定める。\n\nf(x)＝x⁴＋x³−x²＋4x−2\ng(x)＝x²＋7x＋a\n\n全ての実数xについてf(x)≥g(x)が成り立つようなaの最大値はいくらか。",
    "choices": {
      "ア": "−5",
      "イ": "−4",
      "ウ": "−1",
      "エ": "2",
      "オ": "4"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "差は(x−1)²(x²＋3x＋3)−5−aであり、二次因子は(x＋3/2)²＋3/4で正である。最小の差はx＝1で−5−aなので、条件はa≤−5となる。",
    "choiceExplanations": {
      "ア": "差は(x−1)²(x²＋3x＋3)−5−aであり、二次因子は(x＋3/2)²＋3/4で正である。最小の差はx＝1で−5−aなので、条件はa≤−5となる。",
      "イ": "x＝1を代入するとf(1)＝3、g(1)＝8＋aである。a＝−4ではg(1)＝4となり、f(1)より大きくなる。",
      "ウ": "a＝−1にすると、x＝1でg(1)＝7、f(1)＝3となる。全ての実数で成立させるには、x＝1で等号になる−5以下であることが必要である。",
      "エ": "a＝2では、x＝0ですでにf(0)＝−2がg(0)＝2を下回る。さらにx＝1での条件が厳しく、aの上限は−5である。",
      "オ": "gの定数項を4にすると、x＝0で直ちに不等式が崩れる。差から定数項を除いて(x−1)²(x²＋3x＋3)−5と因数分解すると、許される上限は−5となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q05",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "半球の容器と球冠の体積",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、半径3の半球状の容器に、容器の底から高さhまで水が入っている。容器内の水の体積と、容器の容積の比が4：27であるとき、hの値はいくらか。",
    "choices": {
      "ア": "2/3",
      "イ": "1",
      "ウ": "3/2",
      "エ": "2",
      "オ": "13/6"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "底から高さzでの断面積はπ(6z−z²)なので、0からhまで積分するとπh²(3−h/3)となる。半球の容積18πの4/27である8π/3を与える高さは、体積が高さとともに増えることも踏まえるとh＝1である。",
    "choiceExplanations": {
      "ア": "水の体積は高さhの球冠の体積πh²(3−h/3)である。h＝2/3では、目標の8π/3より体積が小さい。",
      "イ": "底から高さzでの断面積はπ(6z−z²)なので、0からhまで積分するとπh²(3−h/3)となる。半球の容積18πの4/27である8π/3を与える高さは、体積が高さとともに増えることも踏まえるとh＝1である。",
      "ウ": "高さ3/2のとき、球冠の体積は45π/8である。必要なのは8π/3なので、この高さでは水が多すぎる。",
      "エ": "高さ2では底からの断面積を積分した体積が28π/3になる。半球の18πに対して、これは4/27を超える。",
      "オ": "0から3まで水位を上げると、水の体積は増え続ける。h＝1で既に18πの4/27に達するので、それより高い13/6は条件に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q05.webp"
    ],
    "imageAltTexts": [
      "半径3の半球状の容器と、底から水面までの高さh"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q06",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "サイコロの和事象と包除原理",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "1～6の数字が一つずつ書かれたサイコロを3回振る試行を考える。この試行において、1回目と3回目で共に2の数字が出る事象をA、3回のうち出た数字の最大値が4となる事象をBとするとき、和事象A∪Bの確率はいくらか。",
    "choices": {
      "ア": "1/6",
      "イ": "7/36",
      "ウ": "43/216",
      "エ": "11/54",
      "オ": "5/24"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Aは真ん中の目が自由なので6通りで、Bは4³−3³＝37通りある。両方を満たす(2,4,2)の1通りを引くと、確率は(6＋37−1)/216＝7/36になる。",
    "choiceExplanations": {
      "ア": "最大値が4の出目だけでも、全て4以下の64通りから全て3以下の27通りを引いた37通りである。1/6に相当する36通りは、このBだけより少ない。",
      "イ": "Aは真ん中の目が自由なので6通りで、Bは4³−3³＝37通りある。両方を満たす(2,4,2)の1通りを引くと、確率は(6＋37−1)/216＝7/36になる。",
      "ウ": "6通りと37通りを単純に足すと、AとBを同時に満たす(2,4,2)を二重に数える。この重複1通りを引いて42/216になる。",
      "エ": "11/54は216通り中44通りに当たる。AとBの件数を重複込みで足しても6＋37＝43通りなので、44通りにはならない。",
      "オ": "5/24に当たる45通りは、和事象に含まれる42通りより多い。最大値が4という条件では、全ての目が3以下の出目をBから除く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q07",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "有向グラフの隣接行列と閉じた歩道",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "頂点が1～nで番号付けされた有向グラフに対して、頂点iから頂点jへ向かう辺の数を(i,j)成分にもつn×n行列を、そのグラフの隣接行列という。\n\n例えば、図のようなグラフに対する隣接行列は次のとおりである。\n［0 1 1；0 0 1；1 1 0］\n\n一般に、グラフに対する隣接行列をk乗した行列の(i,j)成分は、そのグラフの頂点iから頂点jへ、辺をk回通って至る経路の数と等しいことが知られている。\n例えば、図のグラフにおいて、頂点1から頂点2へ、辺を3回通って至る経路は2通り（1→2→3→2、1→3→1→2）があるが、確かに、［0 1 1；0 0 1；1 1 0］³＝［1 2 2；0 1 1；2 2 1］の(1,2)成分は2である。\n\n行列A＝［0 1 0 0 0；0 0 1 0 1；0 0 0 1 0；0 0 0 0 1；1 0 0 0 0］に対して、Aᵏの(1,1)成分が0となる整数kの最大値はいくらか。\n（行列は「；」で行を区切っている。）",
    "choices": {
      "ア": "6",
      "イ": "7",
      "ウ": "8",
      "エ": "9",
      "オ": "11"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "頂点1への一巡の長さは3辺か5辺なので、7は3と5の非負整数倍の和で表せない。一方8、9、10は作れ、それぞれに3を足していけば8以上の全ての長さで戻れる。",
    "choiceExplanations": {
      "ア": "頂点1からは1→2→5→1の3辺の閉じた経路を使える。これを2回繰り返せば6辺で戻れるので、(1,1)成分は0にならない。",
      "イ": "頂点1への一巡の長さは3辺か5辺なので、7は3と5の非負整数倍の和で表せない。一方8、9、10は作れ、それぞれに3を足していけば8以上の全ての長さで戻れる。",
      "ウ": "8辺の経路は、1→2→5→1を一巡し、続けて1→2→3→4→5→1を一巡して作れる。したがってA⁸の(1,1)成分は正である。",
      "エ": "9辺で戻るには、頂点2から5へ直接向かう3辺の経路を3回繰り返せばよい。9は経路が存在しない長さではない。",
      "オ": "11は3＋3＋5なので、3辺の経路を2回と5辺の経路を1回つないで1に戻れる。正の長さのうち戻れない最大は7である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q07.webp"
    ],
    "imageAltTexts": [
      "頂点1、2、3を結ぶ例示の有向グラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q08",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "フローチャートと二分探索",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "配列要素A[0]、A[1]、…、A[50]から成る配列Aが定義され、次のように各配列要素A[k]には値kが格納されている。\n\n配列要素 A[0]、A[1]、A[2]、A[3]、…、A[48]、A[49]、A[50]\n値 0、1、2、3、…、48、49、50\n\n図は、ある値pをAから探索するフローチャートである。p＝10としてこのフローチャートを実行したとき、①の操作が行われる回数はいくらか。\nただし、⌊x⌋はxを超えない最大の整数を表すとする。",
    "choices": {
      "ア": "1回",
      "イ": "2回",
      "ウ": "3回",
      "エ": "4回",
      "オ": "5回"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "調べる添字の順序は25、12、5、8、10である。①のx←m＋1はA[m]が10未満のときなので、m＝5と8の2回で実行される。",
    "choiceExplanations": {
      "ア": "最初に①へ進むのは、中央の添字mが5のときである。xを6に更新した後、次の中央の添字8でも①へ進むので、1回ではない。",
      "イ": "調べる添字の順序は25、12、5、8、10である。①のx←m＋1はA[m]が10未満のときなので、m＝5と8の2回で実行される。",
      "ウ": "①は調べた値が探索値より小さいときだけ行う。m＝10では一致して終了し、xの更新はしないので、①は3回にはならない。",
      "エ": "m＝25と12では調べた値が10より大きいので、変更するのは上端yである。10より小さい5と8を調べるときだけ①を実行する。",
      "オ": "中央の添字を計算するのは25、12、5、8、10の5回だが、その全てで①へは進まない。探索範囲の下端xを変更するのはm＝5と8の2回である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q08.webp"
    ],
    "imageAltTexts": [
      "配列Aに対する二分探索のフローチャート。①は下端xをm＋1に更新する処理"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q09",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "確率密度関数の裾の積分",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "ある建設事業では、事故が起こった場合、事故1件の損害額X［億円］の確率分布が以下の確率密度関数f(x)をもつことが分かっている。\n\nf(x)＝xe^(−x)（x＞0）、0（x≤0）\n\nこのとき、事故1件の損害額が3億円以上となる確率はいくらか。",
    "choices": {
      "ア": "2e⁻¹",
      "イ": "2e⁻²",
      "ウ": "3e⁻²",
      "エ": "3e⁻³",
      "オ": "4e⁻³"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "3から無限大までのxe^(−x)の積分は、原始関数−(x＋1)e^(−x)で計算できる。上端の極限は0なので、残る値は4e⁻³である。",
    "choiceExplanations": {
      "ア": "積分の下端は損害額3億円に対応する3である。2e⁻¹は下端を1にした場合の裾確率で、求める事象より広い。",
      "イ": "下端が3なので、積分結果の指数には−3が現れる。部分積分で境界を評価すると、係数は下端3に1を加えた4である。",
      "ウ": "3e⁻²は、損害額が2億円以上である確率に当たる。下端を3に変えると、xe^(−x)の積分は4e⁻³になる。",
      "エ": "3e⁻³はx＝3での確率密度の値である。3以上の確率にはその先の密度の積分が必要で、部分積分でe⁻³がさらに加わる。",
      "オ": "3から無限大までのxe^(−x)の積分は、原始関数−(x＋1)e^(−x)で計算できる。上端の極限は0なので、残る値は4e⁻³である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q10",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "平衡三進法の加法",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "3種の数字T、0、1（ただし、ここでTは−1に相当する値を表す数字とする。）を用いた位取り記数法を、平衡三進法（balanced ternary）と呼ぶ。この記法では、負値を表現することも可能であり、例えば10進数の−2は、平衡三進法では2桁でT1と表せる。\n\n平衡三進法で表された式1T1TT＋T11T1の計算結果を平衡三進法で表したものとして正しいのはどれか。",
    "choices": {
      "ア": "100",
      "イ": "110",
      "ウ": "1100",
      "エ": "1T01T",
      "オ": "10T00"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "1T1TTは81−27＋9−3−1＝59で、T11T1は−81＋27＋9−3＋1＝−47である。和は12＝9＋3なので、平衡三進法では110となる。",
    "choiceExplanations": {
      "ア": "平衡三進法の100は3²＝9である。二つの被加数の和は10進で12なので、3の位にも1を置く必要がある。",
      "イ": "1T1TTは81−27＋9−3−1＝59で、T11T1は−81＋27＋9−3＋1＝−47である。和は12＝9＋3なので、平衡三進法では110となる。",
      "ウ": "1100は3³＋3²＝36である。もとの二つの数を位ごとに加えると、最高位の81と次の27の項は互いに打ち消し合う。",
      "エ": "1T01Tの値は81−27＋3−1＝56である。被加数の合計は59＋(−47)＝12となるので、この5桁の表記とは一致しない。",
      "オ": "10T00は81−9＝72である。元の計算では9の位の合計18から3の位の合計6を引き、その他は相殺されて12になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q11",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "群の単位元と逆元",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "集合G上に二項演算(a,b) ↦ a∘b（a、b、a∘b∈G）が定義されていて、\n\n・(a∘b)∘c＝a∘(b∘c)\n・任意のa∈Gに対し、a∘e＝e∘a＝aとなる元e∈Gが存在する\n・任意のa∈Gに対し、a∘a⁻¹＝a⁻¹∘a＝eとなる元a⁻¹∈Gが存在する\n\nときに、Gはこの二項演算に関して群であるという。次の㋐～㋓のうち、群をなすもののみを挙げているのはどれか。\n\n㋐ 0を除いた実数の集合における（通常の）積\n㋑ 実数の集合における（通常の）和\n㋒ 0を除いた整数の集合における（通常の）積\n㋓ 自然数の集合における（通常の）和",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐は単位元が1で、逆元1/aも0でない実数である。㋑は単位元0と逆元−aを実数内にもつので、どちらも群をなす。",
    "choiceExplanations": {
      "ア": "㋐は単位元が1で、逆元1/aも0でない実数である。㋑は単位元0と逆元−aを実数内にもつので、どちらも群をなす。",
      "イ": "㋐では0でない数の逆数も集合に入る。㋒では例えば2の乗法逆元1/2が整数ではないので、逆元の条件を満たさない。",
      "ウ": "㋐は群をなすが、㋓には1に対する加法逆元−1がない。0を自然数に含める約束でも、逆元を欠く点は変わらない。",
      "エ": "㋑は各実数aの逆元−aを含む。㋒の整数の積では、例えば2と掛けて1になる整数を取れない。",
      "オ": "㋑の和は実数全体で閉じ、加法逆元も存在する。㋓では正の自然数の加法逆元を集合内に取れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q12",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "偶数段の反転を帰還した論理回路",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、101個のインバータ（NOTゲート）をつなぎ合わせて作られた論理回路がある。この回路の出力端子OUTに出力される信号の振る舞いとして最も妥当なのはどれか。\nただし、インバータの入出力間の伝搬遅延時間は10ナノ秒とし、ゲート入力容量や配線容量の影響は無視できるものとする。",
    "choices": {
      "ア": "常に0を出力し続ける。",
      "イ": "常に1を出力し続ける。",
      "ウ": "常に同じ値を出力し続けるがその値が0か1かは不定である。",
      "エ": "50MHzの周波数で0と1の出力を交互に繰り返す。",
      "オ": "100MHzの周波数で0と1の出力を交互に繰り返す。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最後の1段は出力用で、帰還するのは手前の100段である。偶数回の反転は元の論理値に戻るため、帰還は0と1のいずれも保持でき、OUTはそこから一意には決まらない。",
    "choiceExplanations": {
      "ア": "OUTの直前にある最後のインバータは、帰還点の値を反転して出力する。帰還点が0の安定状態ではOUTは1になるので、必ず0とはいえない。",
      "イ": "帰還に入る100段には、帰還点が0の状態と1の状態のどちらも整合する。帰還点が1で落ち着けば最後の一段を通したOUTは0である。",
      "ウ": "最後の1段は出力用で、帰還するのは手前の100段である。偶数回の反転は元の論理値に戻るため、帰還は0と1のいずれも保持でき、OUTはそこから一意には決まらない。",
      "エ": "50MHzを1ゲートの遅延10ナノ秒の2倍から求めても、帰還には100段が入る。偶数回反転する帰還は、反転を繰り返す発振の条件を作らない。",
      "オ": "100MHzは10ナノ秒の逆数だが、これは1段の伝搬遅延から得た値である。帰還の100段は反転が相殺されるため、その周波数で交互に切り替わることは示せない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q12.webp"
    ],
    "imageAltTexts": [
      "インバータ101個の回路。最終段の手前から先頭へ信号が帰還する"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q13",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "3ビットのAND、OR、XOR",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "3-bitのビット列に対する次のような式について考える。\n\n(a₂a₁1 ［㋐］ 0x₁0) ［㋑］ y₂y₁y₀ ＝ 1a₁0\n\nここで、［㋐］及び［㋑］はそれぞれAND（論理積）、OR（論理和）、XOR（排他的論理和）のうちのいずれかのビット演算（bitwise operation）であり、x₁、y₀、y₁、y₂のそれぞれは0又は1のいずれかの値であるとする。a₂及びa₁が0又は1の任意の値をとる全ての場合で本式が成立するような、ビット列y₂y₁y₀として最も妥当なのは次のうちではどれか。",
    "choices": {
      "ア": "001",
      "イ": "010",
      "ウ": "011",
      "エ": "100",
      "オ": "101"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最初にANDをx₁＝1で行うと0a₁0になる。次に100とORを取れば、a₂とa₁の全ての組で1a₁0となる。",
    "choiceExplanations": {
      "ア": "最上位でa₂＝0のとき、最初の演算の二つの入力は両方0で、結果も0である。最終結果を1にするにはy₂が1でなければならないため、001は使えない。",
      "イ": "y₂を0にすると、a₂＝0の場合に上位ビットは二つの演算を行っても0のままである。要求される上位ビットは常に1である。",
      "ウ": "最上位はa₂が0の場合にも1とする必要がある。最初の演算結果が0のとき、y₂＝0の011では、AND、OR、XORのどれでも1が得られない。",
      "エ": "最初にANDをx₁＝1で行うと0a₁0になる。次に100とORを取れば、a₂とa₁の全ての組で1a₁0となる。",
      "オ": "上位の出力を常に1にする二番目の演算はORかXORである。下位のy₀＝1ではORなら下位が必ず1となり、XORなら最初をANDにして上位を固定した場合に下位が1になるので、101は使えない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q14",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "画面の対角線と画素密度",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "画素が正方形でその数が横1,920ドット、縦1,080ドットである、対角が23インチのディスプレイの画素の解像度はおよそいくらか。",
    "choices": {
      "ア": "48ドット／インチ",
      "イ": "72ドット／インチ",
      "ウ": "84ドット／インチ",
      "エ": "96ドット／インチ",
      "オ": "144ドット／インチ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "画素は正方形なので、対角のドット単位の長さは√(1920²＋1080²)≒2,203である。対角23インチで割ると約95.8ドット／インチになる。",
    "choiceExplanations": {
      "ア": "1,080を23で割るとおよそ47になるが、分子と分母がそれぞれ縦と対角で、同じ方向の長さではない。対角のドット数は約2,203である。",
      "イ": "ドット数の縦横比が16：9なので、縦横どちらも対角の23インチより短い。対角を基準にするには、その方向のドット数も三平方の定理で求める必要がある。",
      "ウ": "1,920を23で割ると約84だが、1,920は対角ではなく横方向のドット数である。対角の約2,203ドットを23で割ると約96になる。",
      "エ": "画素は正方形なので、対角のドット単位の長さは√(1920²＋1080²)≒2,203である。対角23インチで割ると約95.8ドット／インチになる。",
      "オ": "縦と横を足した長さは対角ではなく、二辺に沿った長さになる。画素密度には直線の対角長を使うので、144ほど大きくはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q15",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "C言語の再帰と境界値",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次の関数をf(4, 2)と呼び出したときの戻り値として最も妥当なのはどれか。\n\nint f(int x, int y) {\n    if (x <= 0 || y <= 0) return 0;\n    return f(x - 1, y) + x + y + f(x, y - 1);\n}",
    "choices": {
      "ア": "22",
      "イ": "27",
      "ウ": "45",
      "エ": "48",
      "オ": "90"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "y＝1の値をx＝1から計算すると2、5、9、14となり、y＝2ではx＝1、2、3で5、14、28となる。したがってf(4,2)＝28＋6＋14＝48である。",
    "choiceExplanations": {
      "ア": "xかyが0になる呼出しだけが0を返す。y＝1ではf(4,1)＝14になり、f(4,2)にはこれに加えてf(3,2)＝28と6も含まれる。",
      "イ": "f(3,2)はf(2,2)＝14、f(3,1)＝9、加算項3＋2を合わせた28である。最終結果にはf(4,1)と4＋2も加わり、27より大きくなる。",
      "ウ": "第2引数を1に固定した列はf(1,1)から2、5、9、14である。f(4,2)では、これらから得たf(3,2)＝28と14に、4＋2も足すので45にはならない。",
      "エ": "y＝1の値をx＝1から計算すると2、5、9、14となり、y＝2ではx＝1、2、3で5、14、28となる。したがってf(4,2)＝28＋6＋14＝48である。",
      "オ": "再帰呼出しの二項はf(3,2)とf(4,1)で、同じ値を返すものではない。28と14に引数の和6を加えるので、90にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q16",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "有病率と陽性的中率",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "ある疾病に関して実際に感染している人の割合が人口の1％とする。その疾病の検査の精度が99％であるとする。ここでいう精度とは、実際に感染している人の99％を正しく陽性と判定するが、残る1％を誤って陰性と判定し、また、実際に感染していない人の99％を正しく陰性と判定するが、残る1％を誤って陽性と判定してしまうことを指す。このとき、検査で陽性と判定された人のうち、実際に感染している人の割合はいくらか。",
    "choices": {
      "ア": "1％",
      "イ": "10％",
      "ウ": "50％",
      "エ": "90％",
      "オ": "99％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "真陽性は全体の0.01×0.99、偽陽性は全体の0.99×0.01で、両者は等しい。陽性のうち真陽性が占める割合はその半分の50％である。",
    "choiceExplanations": {
      "ア": "1％は検査結果が分かる前に、人口全体に占める感染者の割合である。陽性の人だけを集めると、その集団の構成は全人口とは異なる。",
      "イ": "1万人を想定すると感染者100人のうち99人、非感染者9,900人のうち99人が陽性になる。実際の感染者は陽性198人のうちの99人である。",
      "ウ": "真陽性は全体の0.01×0.99、偽陽性は全体の0.99×0.01で、両者は等しい。陽性のうち真陽性が占める割合はその半分の50％である。",
      "エ": "陽性を母集団にすると、感染者由来の陽性と、非感染者由来の陽性をともに分母に入れる。非感染者の人数が大きいため、偽陽性の数も真陽性と等しくなり、90％には達しない。",
      "オ": "99％は、すでに感染していることを条件に検査が陽性になる割合である。求める値は陽性を条件に感染している割合で、条件と判定を入れ替えるには有病率も使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q17",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "リレーショナルデータベースのACID特性",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "次の㋐、㋑、㋒のうち、重要な資産であるデータを管理するデータベースを安心して使うためにデータベースのトランザクションがもつべき特性であり、リレーショナルデータベースが準拠している特性として妥当なもののみを全て挙げているのはどれか。\n\n㋐ ACID（Atomicity, Consistency, Isolation, Durability）\n㋑ BASE（Basically Available, Soft state, Eventually consistent）\n㋒ CAP（Consistency, Availability, Partition tolerance）",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ACIDは処理を一体として確定・取消しする原子性、制約を守る一貫性、並行処理の分離性、確定結果の永続性を指す。これはリレーショナルデータベースにおけるトランザクションの特性である。",
    "choiceExplanations": {
      "ア": "ACIDは処理を一体として確定・取消しする原子性、制約を守る一貫性、並行処理の分離性、確定結果の永続性を指す。これはリレーショナルデータベースにおけるトランザクションの特性である。",
      "イ": "ACIDはトランザクションに求める特性だが、BASEは可用性を重視し結果整合性を許容する分散データ管理の考え方である。その両方をトランザクション特性として挙げることはできない。",
      "ウ": "BASEの結果整合性は、更新がすぐ全てのノードに反映されなくても最終的に一致するという性質である。リレーショナルデータベースのトランザクション特性を表す語はACIDである。",
      "エ": "BASEは結果整合性などを示し、CAPは分散環境のネットワーク分断時における一貫性と可用性の関係を扱う。トランザクションの原子性や永続性を表す組はACIDである。",
      "オ": "CAPの一貫性、可用性、分断耐性は、分散システムで分断がある場合の設計上の制約に関わる。個々のトランザクションの保証を指すのはACIDである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q18",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "経済安全保障の施策",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "国際情勢の複雑化、社会経済構造の変化等により、安全保障の裾野が経済分野に急速に拡大する中、国家・国民の安全を経済面から確保するための取組として、経済安全保障の重要性が指摘されている。次の記述㋐～㋓のうち、経済安全保障の取組として妥当なもののみを全て挙げているのは次のうちではどれか。\n\n㋐ 内外半導体メーカ工場の日本国内への誘致\n㋑ 基幹インフラ導入維持管理からの外資企業の排除\n㋒ 先端的な重要技術の開発支援\n㋓ 特許出願の非公開",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "国内の半導体生産基盤の確保と先端的な重要技術の研究開発支援は、供給網や技術上の安全保障に資する。また、安全保障上機微な発明を対象に、特許出願を非公開とする制度がある。",
    "choiceExplanations": {
      "ア": "半導体の安定供給と重要技術の開発を支える㋐・㋒は妥当である。基幹インフラ制度は重要設備の導入・維持管理の委託を事前審査する仕組みで、外資企業を一律排除するものではない。",
      "イ": "㋐と㋒は供給網の強化や重要技術の育成に結び付く。さらに安全保障上機微な発明の流出を防ぐ特許出願の非公開制度も設けられているため、㋓も含める。",
      "ウ": "国内の半導体生産基盤の確保と先端的な重要技術の研究開発支援は、供給網や技術上の安全保障に資する。また、安全保障上機微な発明を対象に、特許出願を非公開とする制度がある。",
      "エ": "重要技術の開発支援は経済安全保障の施策に当たる。基幹インフラでは設備の導入や重要な維持管理委託を審査し、外国資本であることだけで対象企業を排除する仕組みではない。",
      "オ": "機微な特許出願の非公開は実際の制度である。一方、基幹インフラ制度は審査に基づき妨害行為のリスクを確認するため、外資企業の排除とした㋑は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q19",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "マルチモーダル学習と関連する機械学習手法",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "テキスト、画像、音声情報等を統合的に取り扱い、これらのデータを組み合わせることにより高度な情報処理を実現する機械学習手法の名称として最も妥当なのはどれか。",
    "choices": {
      "ア": "連合学習",
      "イ": "エッジAI",
      "ウ": "転移学習",
      "エ": "マルチモーダル学習",
      "オ": "大規模言語モデル"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "文章、画像、音声のように種類の異なる情報をそれぞれモダリティという。それらにまたがる特徴を学習し、組み合わせて扱うのがマルチモーダル学習である。",
    "choiceExplanations": {
      "ア": "連合学習では各端末などがデータを手元に置いて学習し、更新結果を共有してモデルを改善する。統合する情報の種類よりも、データをどこに保ったまま学習するかが特徴である。",
      "イ": "エッジAIはセンサーや端末に近い場所でAIの処理を実行することを指す。文字、画像、音声を横断して扱う取り組みの名称はマルチモーダル学習である。",
      "ウ": "転移学習は、ある課題で学んだ特徴やパラメータを、別の課題の学習に再利用することである。一つの種類のデータしか使わなくても転移学習は成り立つ。",
      "エ": "文章、画像、音声のように種類の異なる情報をそれぞれモダリティという。それらにまたがる特徴を学習し、組み合わせて扱うのがマルチモーダル学習である。",
      "オ": "大規模言語モデルは、大量の言語データなどを用いて学習したモデルの種類を指す。言語モデルを含む構成でも、複数の種類の入力を統合する学習手法自体はマルチモーダル学習と呼ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q20",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "量子計算の方式と公開鍵暗号",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "量子情報処理技術に関する記述㋐、㋑、㋒の正誤の組合せとして最も妥当なのはどれか。\n\n㋐ 量子計算機のアーキテクチャは、大きく分けてゲート式量子コンピュータ、量子アニーリングマシンの二つが存在し、汎用性の面で量子アニーリングマシンが優れている。\n㋑ 実用的な汎用量子コンピュータが実現されると、大きな数の素因数分解を高速に解くことが可能となるため、実用上利用されている主要な暗号化方式の安全性が失われる。\n㋒ 現時点で実現されている量子コンピュータが備える物理量子ビット数は2～3ビット程度であり、応用に耐え得るシステムを実現するためには、利用可能な物理量子ビット数を100～200程度まで引き上げる必要がある。",
    "choices": {
      "ア": "㋐ 正、㋑ 正、㋒ 正",
      "イ": "㋐ 正、㋑ 誤、㋒ 誤",
      "ウ": "㋐ 誤、㋑ 正、㋒ 正",
      "エ": "㋐ 誤、㋑ 正、㋒ 誤",
      "オ": "㋐ 誤、㋑ 誤、㋒ 正"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ゲート式は量子ゲートを組み合わせて多様な計算を行え、量子アニーリングは主に最適化に向く。十分な誤り訂正が可能な汎用量子計算機はRSAなどを脅かし、物理量子ビット数は試験時点で既に2～3を上回っていた。",
    "choiceExplanations": {
      "ア": "量子アニーリングは主に最適化に使われ、様々な量子アルゴリズムを構成できるのはゲート式である。試験時点でも物理量子ビット数は2～3を超えていたので、㋐と㋒は誤りである。",
      "イ": "量子アニーリング装置に比べ、ゲート式は多様な回路を実行できる。㋑のように大きな数の素因数分解を効率よく行える装置は、RSAなどの公開鍵暗号に影響する。",
      "ウ": "㋐は汎用性を逆にしており、㋑は十分に大規模な量子計算を前提とするRSAへの影響に合う。㋒の物理量子ビット数は、試験時点で実現済みの装置と比べ過小である。",
      "エ": "ゲート式は量子ゲートを組み合わせて多様な計算を行え、量子アニーリングは主に最適化に向く。十分な誤り訂正が可能な汎用量子計算機はRSAなどを脅かし、物理量子ビット数は試験時点で既に2～3を上回っていた。",
      "オ": "素因数分解を効率よく行う量子アルゴリズムは、RSAの安全性の前提を崩しうる。物理量子ビットが2～3しか実現していないという記述も試験時点の状況とは合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q21",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "計算機科学",
    "topicTags": [
      "無向グラフの支配集合",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "Vを頂点集合とし、Eを枝集合とする無向グラフG＝(V,E)を考える。Gの各辺はVに含まれる二つの要素（すなわち、辺の両端点）から成る部分集合で表されるものとする。次の条件を満たすVの部分集合S⊆VをグラフGの支配集合と呼ぶ。\n\n∀v［(v∈S) ∨ (∃u［{u,v}∈E ∧ (u∈S)］)］\n\nここで、G＝(V,E)を図に示すグラフとする。\n\n次に示す頂点集合のうち、Gの支配集合でないものはどれか。",
    "choices": {
      "ア": "{v₁, v₃, v₅}",
      "イ": "{v₁, v₂, v₄, v₅}",
      "ウ": "{v₁, v₄}",
      "エ": "{v₂, v₄}",
      "オ": "{v₃, v₆}"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "頂点v₆の隣はv₂とv₅で、v₆自身もその隣もこの集合に入っていない。よってv₆を支配できず、支配集合ではない。",
    "choiceExplanations": {
      "ア": "集合外のv₂はv₁と、v₄はv₁と、v₆はv₅とそれぞれつながっている。各頂点が集合に属するか集合の頂点に隣接するので、支配集合である。",
      "イ": "集合外の頂点はv₃とv₆だけである。v₃はv₁に、v₆はv₂に隣接しており、どちらも集合内の頂点で支配される。",
      "ウ": "頂点v₆の隣はv₂とv₅で、v₆自身もその隣もこの集合に入っていない。よってv₆を支配できず、支配集合ではない。",
      "エ": "v₁はv₂またはv₄、v₃はv₂またはv₄、v₅はv₂またはv₄、v₆はv₂と隣接する。集合外の全頂点を支配する。",
      "オ": "v₃はv₁、v₂、v₄、v₅の全てと隣接する。残るv₆は集合に含まれているので、支配の条件を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q21.webp"
    ],
    "imageAltTexts": [
      "六つの頂点v₁～v₆と辺を示す無向グラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q22",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "計算機科学",
    "topicTags": [
      "プッシュダウンオートマトンと接頭辞",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "語w∈{0,1}*に対して、その長さを∣w∣で表すものとする。また、非負整数i∈ℕについて、wᵢを、i≤∣w∣ならばwの先頭i文字から成る語、そうでなければwそのものを表す記号とし、wにおけるシンボルx∈{0,1}の出現回数を#ₓ(w)で表すものとする。次の状態遷移図で状態遷移関数δが定義されるプッシュダウンオートマトンM＝({q₀,q₁,q₂}, {0,1}, {A,$}, δ, q₀, {q₁})を考える。\n\nこのとき、次に示す言語のうち、Mが認識するものはどれか。",
    "choices": {
      "ア": "{w ∣ ∀i［#₁(wᵢ)＞#₀(wᵢ)］}",
      "イ": "{w ∣ ∀i［#₁(wᵢ)≥#₀(wᵢ)］}",
      "ウ": "{w ∣ #₁(w)＞∣w∣/2}",
      "エ": "{w ∣ #₁(w)＝#₀(w)}",
      "オ": "{w ∣ ∀i［#₁(wᵢ)＝#₀(wᵢ)］}"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "公式正答は1で、入力1でAを積み、0でAを一つ取り除くため、スタックが途中で底に戻ると次の入力で非受理状態q₂へ移る。ただし図では語「10」もq₁で受理され、選択肢1を字義どおり読めばi＝0でも厳密不等号が成立しないため、図に対応する条件は「非空で、空でない真の接頭辞では1が多く、全体では1が0以上」である。",
    "choiceExplanations": {
      "ア": "公式正答は1で、入力1でAを積み、0でAを一つ取り除くため、スタックが途中で底に戻ると次の入力で非受理状態q₂へ移る。ただし図では語「10」もq₁で受理され、選択肢1を字義どおり読めばi＝0でも厳密不等号が成立しないため、図に対応する条件は「非空で、空でない真の接頭辞では1が多く、全体では1が0以上」である。",
      "イ": "「101」はどの接頭辞でも1の数が0の数を下回らない。しかし「10」を読んだ時点でスタックは底に戻り、最後の1でq₂に移るため受理されない。",
      "ウ": "「011」は語全体で1が過半数だが、最初の0でq₀からq₂に移ってしまう。全体の個数だけでは、途中で非受理状態に入るかどうかを判定できない。",
      "エ": "初期状態から「1」だけを読むとスタックにAが積まれ、受理状態q₁に移る。1と0が同数であることは、状態q₁で入力を終えるための必要条件ではない。",
      "オ": "各接頭辞で1と0の数が等しいという条件は、非空の語では最初の1文字の時点で崩れる。Mは「1」を読んだ時点でq₁に達するので、選択肢5の言語とは一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q22.webp"
    ],
    "imageAltTexts": [
      "初期状態q₀、受理状態q₁、非受理状態q₂と、プッシュダウンオートマトンの遷移"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q23",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "計算機科学",
    "topicTags": [
      "二項関係の推移律と反射律",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "ℕを全ての正整数の集合とし、R⊆ℕ×ℕをℕ上の二項関係とする。次のように定義される二項関係Rのうち、推移律を満たすが反射律を満たさないものはどれか。",
    "choices": {
      "ア": "R＝{(x,y) ∣ x−y≤0}",
      "イ": "R＝{(x,y) ∣ ∣x−y∣≤1}",
      "ウ": "R＝{(x,y) ∣ x≥y²}",
      "エ": "R＝{(x,y) ∣ x²≥y}",
      "オ": "R＝{(x,y) ∣ (x−y)は3で割り切れる}"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "x≥y²、y≥z²なら、正整数zについてx≥z⁴≥z²となり、推移律を満たす。一方、x＝2では2≥2²が偽となるため、反射律を満たさない。",
    "choiceExplanations": {
      "ア": "条件はx≤yと同じで、推移的である。任意のxについてx−x＝0なので反射律も成立する。",
      "イ": "自分との差は0なので反射律は成り立つ。しかし1と2、2と3の差はそれぞれ1でも、1と3の差は2なので推移律は成り立たない。",
      "ウ": "x≥y²、y≥z²なら、正整数zについてx≥z⁴≥z²となり、推移律を満たす。一方、x＝2では2≥2²が偽となるため、反射律を満たさない。",
      "エ": "正整数xなら常にx²≥xなので反射律を満たす。また、2²≥4、4²≥16だが2²＜16なので、推移律は成り立たない。",
      "オ": "x−yとy−zがともに3の倍数なら、その和x−zも3の倍数である。x−x＝0も3で割り切れ、推移律と反射律の両方を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q24",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "CMOS回路のプルアップとプルダウン",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "図のようなCMOS回路が論理式x＝¬(a・c＋b)を実現するときに、破線部に入る回路として最も妥当なのは次のうちではどれか。",
    "choices": {
      "ア": "aと、c・bの並列部を直列にした回路",
      "イ": "bと、a・cの並列部を直列にした回路",
      "ウ": "bと、a・cの直列部を並列にした回路",
      "エ": "cと、b・aの直列部を並列にした回路",
      "オ": "(aとbの並列部)と(bとcの並列部)を直列にした回路"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "電源につなぐ条件は¬b∧(¬a∨¬c)である。低入力で導通するpMOSのbを、aとcの並列回路に直列接続すれば、この条件のときだけ電源からxまで導通する。",
    "choiceExplanations": {
      "ア": "選択肢1はaのpMOSが並列部と直列なので、a＝1なら電源経路が切れる。a＝1、b＝0、c＝0ではx＝1が必要だが、この回路では電源につながらない。",
      "イ": "電源につなぐ条件は¬b∧(¬a∨¬c)である。低入力で導通するpMOSのbを、aとcの並列回路に直列接続すれば、この条件のときだけ電源からxまで導通する。",
      "ウ": "bのpMOSだけで導通する経路があるため、b＝0ならaとcがともに1でも電源につながる。式ではその場合a・c＝1なので、xは0を求められる。",
      "エ": "cのpMOS単独で電源につながる経路があるので、c＝0かつb＝1でもプルアップされる。b＝1では下側が導通し、求める出力は0である。",
      "オ": "両方の並列部にbのpMOSがあり、b＝0で常に二つの並列部が接続される。a＝c＝1かつb＝0でもプルアップしてしまうので、所定の論理式にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q24.webp"
    ],
    "imageAltTexts": [
      "下半分がnMOSで構成され、上半分が破線枠になったCMOS回路"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-sogo-dai/2025/senmon-digital/q24-choice-1.webp",
      "イ": "/questions/kokka-sogo-dai/2025/senmon-digital/q24-choice-2.webp",
      "ウ": "/questions/kokka-sogo-dai/2025/senmon-digital/q24-choice-3.webp",
      "エ": "/questions/kokka-sogo-dai/2025/senmon-digital/q24-choice-4.webp",
      "オ": "/questions/kokka-sogo-dai/2025/senmon-digital/q24-choice-5.webp"
    }
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q25",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "Dフリップフロップと線形帰還",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、四つのDフリップフロップと4入力マルチプレクサを結線した順序回路があり、Dフリップフロップの初期状態がQ₀＝1、Q₁＝Q₂＝Q₃＝0であるとする。この順序回路に10回クロックパルスが入力された後のDフリップフロップの状態Q₀、Q₁、Q₂、Q₃として最も妥当なのはどれか。\nただし、4入力マルチプレクサは、制御入力C₀＝0、C₁＝0のとき入力I₀が、C₀＝1、C₁＝0のときI₁が、C₀＝0、C₁＝1のときI₂が、C₀＝1、C₁＝1のときI₃が、出力O（オー）に出力されるものとする。",
    "choices": {
      "ア": "Q₀ Q₁ Q₂ Q₃＝0 1 1 1",
      "イ": "Q₀ Q₁ Q₂ Q₃＝1 0 1 0",
      "ウ": "Q₀ Q₁ Q₂ Q₃＝1 1 0 1",
      "エ": "Q₀ Q₁ Q₂ Q₃＝1 1 1 0",
      "オ": "Q₀ Q₁ Q₂ Q₃＝1 1 1 1"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "マルチプレクサはQ₂とQ₃が異なるときだけ1を出すので、毎回(Q₀,Q₁,Q₂,Q₃)は(Q₂⊕Q₃,Q₀,Q₁,Q₂)に移る。初期値1000からの9回目が1101で、10回目は1110である。",
    "choiceExplanations": {
      "ア": "9回後の状態は1101であり、Q₂とQ₃の値は0と1で異なる。次のQ₀にはその排他的論理和1が入るので、0では始まらない。",
      "イ": "1010は8回のクロックを与えた後の状態である。その次が1101となり、さらにもう一度更新すると1110になる。",
      "ウ": "1101は9回更新したときの状態に当たる。10回目では旧Q₀、Q₁、Q₂が右にずれるので、新Q₁、Q₂、Q₃は1、1、0になる。",
      "エ": "マルチプレクサはQ₂とQ₃が異なるときだけ1を出すので、毎回(Q₀,Q₁,Q₂,Q₃)は(Q₂⊕Q₃,Q₀,Q₁,Q₂)に移る。初期値1000からの9回目が1101で、10回目は1110である。",
      "オ": "10回目のQ₃は9回目のQ₂を引き継ぐ。9回目が1101なので、最後のQ₃は1ではなく0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q25.webp"
    ],
    "imageAltTexts": [
      "4入力マルチプレクサとDフリップフロップ4個を結んだ順序回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q26",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "浮動小数点の丸めとオーバーフロー",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次の関数を実行した場合に関する記述㋐～㋓のうち、誤っているのはどれか。\n\ndouble func(double x, double y) {\n    double a1, a2, tmp;\n    a1 = x + y;\n    tmp = a1 - x;\n    a2 = y - tmp;\n    return a2;\n}",
    "choices": {
      "ア": "㋐ a2が無限値あるいは非数（NaN）となる場合がある。",
      "イ": "㋑ この関数は、ゼロ以外の有限の値を返すことはない。",
      "ウ": "㋒ xとyの値を入れ替えると、a1やa2に格納される値が異なる場合がある。",
      "エ": "㋓ この計算過程においてオーバーフローが発生し得る。",
      "オ": "該当なし"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "倍精度でx＝2⁵⁴、y＝1なら、x＋yは丸めでxになり、tmpは0となる。その結果a2＝1というゼロでない有限値が返るので、㋑が誤りである。",
    "choiceExplanations": {
      "ア": "浮動小数点で大きい有限値の和がオーバーフローするとa1とtmpが無限大になり、有限なyからtmpを引く結果は負の無限大になり得る。従って㋐は誤りではない。",
      "イ": "倍精度でx＝2⁵⁴、y＝1なら、x＋yは丸めでxになり、tmpは0となる。その結果a2＝1というゼロでない有限値が返るので、㋑が誤りである。",
      "ウ": "a1が同じであっても、次にはxを引き、最後にyから引くため、丸めの影響は引数の順序で変わる。例えば(2⁵⁴,1)では1、(1,2⁵⁴)では0が返り得る。",
      "エ": "a1を求める加算で、有限の最大値に近い二つの正の数を足すと、表現範囲を超え得る。そのため、㋓のオーバーフローが発生し得るという記述は妥当である。",
      "オ": "厳密な実数演算ではy−((x＋y)−x)は0だが、丸めで小さい加数が消えると同じ値にはならない。ゼロ以外の有限値を否定する㋑に反例がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q27",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "挿入ソートと分岐予測ミス",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "次は、挿入ソートを実現するC言語のコードである。このコードを実行した際、x[i]（i＝0、1、…、N−1）の初期値が\n\n㋐ 各iについて、x[i]にiが保持されていた場合\n㋑ 各iについて、x[i]にN−iが保持されていた場合\n㋒ 各iについて、1～Nの間のある値が一様ランダムに選択され、その値がx[i]に保持されていた場合\n\nのそれぞれにおいて発生する分岐予測ミス回数を表したものの組合せとして最も妥当なのはどれか。\nただし、ターゲットアーキテクチャの命令セットには、二つのレジスタオペランドの値を大小比較した結果に基づいて分岐する条件分岐命令が存在し、本コード中の条件式はその命令を用いたコードに変換されるものとする。また分岐予測は、「当該命令の直近の分岐結果と同じ方向に分岐する」と予測する単純なアルゴリズムを用いるものとする。\n\nfor(int i = 0; i < N; i++) {\n    int tmp = x[i];  int j = i;\n    while(0 < j && tmp < x[j - 1]) {\n        x[j] = x[j - 1];\n        j--;\n    }\n    x[j] = tmp;\n}",
    "choices": {
      "ア": "㋐ Θ(1)、㋑ Θ(N)、㋒ Θ(log N)",
      "イ": "㋐ Θ(1)、㋑ Θ(N)、㋒ Θ(N)",
      "ウ": "㋐ Θ(1)、㋑ Θ(N²)、㋒ Θ(log N)",
      "エ": "㋐ Θ(N)、㋑ Θ(N)、㋒ Θ(N)",
      "オ": "㋐ Θ(N)、㋑ Θ(N²)、㋒ Θ(N²)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "昇順では大小比較が一貫して偽で、分岐が変わる回数は一定である。逆順やランダムでは、続けて要素をずらす間は分岐が同じ向きで、終端などで各挿入当たり定数回だけ結果が切り替わるため、ミス回数は線形の規模となる。",
    "choiceExplanations": {
      "ア": "昇順では内側のループに入らず、逆順では各回に終了時の分岐変化があるので、初めの二つは合う。ランダムでも線形個の挿入でシフト後に分岐結果が変わるので、予測ミスは対数程度ではない。",
      "イ": "昇順では大小比較が一貫して偽で、分岐が変わる回数は一定である。逆順やランダムでは、続けて要素をずらす間は分岐が同じ向きで、終端などで各挿入当たり定数回だけ結果が切り替わるため、ミス回数は線形の規模となる。",
      "ウ": "逆順のシフト総数は二次の規模だが、連続してシフトする間は直前と同じ方向に分岐する。ミスを数えるにはシフトの件数でなく、各挿入で条件が切り替わる回数を見る。",
      "エ": "昇順の場合、左右の値を比べる条件は初めから成立せず、内側で連続したシフトは発生しない。ループの開始や最後で分岐が変わっても一定回数なので、㋐がΘ(N)ではない。",
      "オ": "逆順やランダムでは、一度の挿入で多数のシフトがあっても、それらの分岐方向は続けて同じである。シフト中と終了時を区別すると、二次の数になるのは分岐の実行回数であってミス回数ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q28",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "IPv4ヘッダとTCPの流量制御",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "TCP/IPに関する記述㋐、㋑、㋒の正誤の組合せとして最も妥当なのはどれか。\n\n㋐ IPv4ヘッダ内のプロトコルフィールドでは、フレーム転送時に用いるアプリケーション層プロトコルが指定されている。\n㋑ TCPにおいては、フロー制御と輻輳制御のいずれも、データの流量を送信側で調整することにより行う。\n㋒ IPv4ヘッダのチェックサムは、1ホップごとに再計算される。",
    "choices": {
      "ア": "㋐ 正、㋑ 正、㋒ 正",
      "イ": "㋐ 正、㋑ 誤、㋒ 正",
      "ウ": "㋐ 誤、㋑ 正、㋒ 正",
      "エ": "㋐ 誤、㋑ 正、㋒ 誤",
      "オ": "㋐ 誤、㋑ 誤、㋒ 誤"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "IPv4のプロトコル欄はTCPなどの上位プロトコルを示し、TCPではフロー制御と輻輳制御の両方で送信側が流量を調整する。IPv4の各ルータはTTLを減らすので、変化したヘッダのチェックサムも更新する。",
    "choiceExplanations": {
      "ア": "IPv4のプロトコル番号は、TCP、UDP、ICMPなど、IPv4の直後のデータの種類を示す。アプリケーション層のプロトコルを指定するとした㋐は誤りである。",
      "イ": "IPv4のプロトコル欄はアプリケーション層の指定用ではない。TCPでは受信側が通知するウィンドウと送信側の輻輳ウィンドウに応じ、送信側が送れる量を制限するので㋑は正しい。",
      "ウ": "IPv4のプロトコル欄はTCPなどの上位プロトコルを示し、TCPではフロー制御と輻輳制御の両方で送信側が流量を調整する。IPv4の各ルータはTTLを減らすので、変化したヘッダのチェックサムも更新する。",
      "エ": "㋐と㋑の判定は正しい。IPv4ではホップを通るたびにTTLのフィールドが変わり、チェックサムもその変更を反映するため、㋒は正しい。",
      "オ": "フィールドの説明である㋐は誤りだが、送信側がウィンドウに従って流量を調整する㋑は正しい。さらにIPv4ではTTLの変更に合わせてヘッダのチェックサムが更新される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q29",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "マルコフ情報源と3ビットの発生確率",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "図のような単純マルコフ情報源（一重マルコフ情報源）で生成されるビット列を、3ビットずつブロックに分けたとき、最も起こりにくいのはどれか。",
    "choices": {
      "ア": "010",
      "イ": "011",
      "ウ": "101",
      "エ": "110",
      "オ": "111"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "定常確率をπ₀、π₁とすると、0から1への確率の流れと逆の流れはπ₀×0.1＝π₁×0.5で、π₁＝1/6となる。101は(1/6)×0.5×0.1＝1/120、ほかの四つは1/24である。",
    "choiceExplanations": {
      "ア": "定常状態の0の確率は5/6であり、010の確率は(5/6)×0.1×0.5＝1/24である。101はこの5分の1なので、010より起こりにくい。",
      "イ": "011は、0から1へ移る確率0.1と、1に留まる確率0.5を使う。初めに0となる定常確率5/6を掛けると1/24となり、101の1/120より大きい。",
      "ウ": "定常確率をπ₀、π₁とすると、0から1への確率の流れと逆の流れはπ₀×0.1＝π₁×0.5で、π₁＝1/6となる。101は(1/6)×0.5×0.1＝1/120、ほかの四つは1/24である。",
      "エ": "110では、定常状態で1から始まり、1に留まってから0へ移る。したがって確率は(1/6)×0.5×0.5＝1/24で、101より高い。",
      "オ": "111の確率は、最初の1の定常確率1/6に二回分の自己遷移0.5×0.5を掛けた1/24である。101には0から1への確率0.1の遷移があり、そちらが小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q29.webp"
    ],
    "imageAltTexts": [
      "0と1を状態とするマルコフ情報源の遷移確率。0から1は0.1、1から0は0.5"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q30",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "循環バッファの添字更新",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "大きさN（記号定数として定義されている）の、整数を格納するリングバッファをC言語で次のように実装した。㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、満杯のバッファへのエンキュー、空のバッファからのデキューは考えないものとする。\n\nint q[N], head = 0, tail = 0;\n\nvoid enqueue(int x) {\n    q[［㋐］] = x; tail %= N;\n}\n\nint dequeue(void) {\n    int tmp = q[［㋑］];\n    head %= N;\n    return tmp;\n}",
    "choices": {
      "ア": "㋐ ++tail、㋑ ++head",
      "イ": "㋐ ++tail、㋑ head++",
      "ウ": "㋐ tail++、㋑ ++head",
      "エ": "㋐ tail++、㋑ head++",
      "オ": "㋐ tail + 1、㋑ head + 1"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "後置インクリメントは増やす前の添字をqの添字として使い、その後にheadまたはtailを一つ進める。直後の剰余により、Nに達した添字を次回のアクセスの前に0に戻せる。",
    "choiceExplanations": {
      "ア": "前置インクリメントでは添字を先に増やすので、tailやheadがN−1のときq[N]にアクセスする。剰余で戻す命令はその後にあるため、範囲を外れる。",
      "イ": "読み出しが現在のheadを使う一方、書込みは増加後のtailを使う。初期値0から一度ずつ実行すると、q[1]に書いてq[0]を読むことになる。",
      "ウ": "書込みは現在のtailに格納してから進むが、読み出しが先にheadを増やす。最初にq[0]へ入れた要素を飛ばしてq[1]を参照することになる。",
      "エ": "後置インクリメントは増やす前の添字をqの添字として使い、その後にheadまたはtailを一つ進める。直後の剰余により、Nに達した添字を次回のアクセスの前に0に戻せる。",
      "オ": "tail＋1とhead＋1は加算値を返すだけで、変数を更新しない。後で剰余を代入しても初期位置から進まないため、キューとして順番に出し入れできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q31",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "安定な計数ソートと基数ソート",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "次のPythonコードを実行したとき、関数cが2回呼ばれた後のa[2]の値はどれか。\nただし、lenとmaxはそれぞれリストの長さと最大値を返す関数である。\n\ndef c(a, e):\n    n = len(a)\n    output = [0] * n\n    count = [0] * 10\n\n    for i in range(n):\n        index = a[i] // e % 10\n        count[index] += 1\n\n    for i in range(1, 10):\n        count[i] += count[i - 1]\n\n    i = n - 1\n    while i >= 0:\n        index = a[i] // e % 10\n        output[count[index] - 1] = a[i]\n        count[index] -= 1\n        i -= 1\n\n    for i in range(n):\n        a[i] = output[i]\n\ndef r(a):\n    maxl = max(a)\n    e = 1\n    while maxl / e >= 1:\n        c(a, e)\n        e *= 10\n\na = [875, 810, 679, 55, 160]\nr(a)",
    "choices": {
      "ア": "55",
      "イ": "160",
      "ウ": "679",
      "エ": "810",
      "オ": "875"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "1回目は一の位で安定に並べて[810, 160, 875, 55, 679]になる。2回目は十の位を比較して[810, 55, 160, 875, 679]になるので、添字2の値は160である。",
    "choiceExplanations": {
      "ア": "2回目は十の位で並べ替え、55の十の位5より小さいのは810の1だけである。55は添字1に入り、添字2にはならない。",
      "イ": "1回目は一の位で安定に並べて[810, 160, 875, 55, 679]になる。2回目は十の位を比較して[810, 55, 160, 875, 679]になるので、添字2の値は160である。",
      "ウ": "679の十の位は7で、875も十の位が7である。2回目の処理は安定なので、一の位の処理で先になった875が添字3、679が添字4となる。",
      "エ": "810は十の位が1で、五つの値の中で最も小さい。2回目のcの直後は添字0にあるため、添字2の答えにはならない。",
      "オ": "最初のcの直後には、875は添字2にある。しかし次に十の位で並べると十の位1、5、6の値に続くので、添字3に移る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q32",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "制御フローとサイクロマティック複雑度",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "プログラムの複雑度を間接的に測定するメトリクスとしてよく使われるものに、サイクロマティック複雑度がある。これはプログラムの制御フローを有向グラフで表したときのグラフ中のノードの数Nとアーク（エッジ）の数Lを用いて、L−N＋2で求められる。次に示すC言語で記述されたプログラムのサイクロマティック複雑度はいくらか。\n\nint func(int x) {\n    int i = 8;\n    while(i > 0) {\n        if (x < 0)\n            x = -1 * x + i;\n        else\n            x += i;\n        i--;\n    }\n    return x;\n}",
    "choices": {
      "ア": "1",
      "イ": "2",
      "ウ": "3",
      "エ": "9",
      "オ": "10"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二方向の分岐を生むのはwhileのi＞0とifのx＜0である。この単一の制御フローでは、一本道の制御フローの基準値1に各判定の寄与1を加え、複雑度は3となる。",
    "choiceExplanations": {
      "ア": "1は、条件で枝分かれせずに一本道で進む場合の値である。この関数にはwhileの終了条件とifの判定の二つがある。",
      "イ": "ループ本体に入るかどうかでwhileが一つの分岐を作る。その内部のifとelseも一つの分岐なので、両方を数えて初期値1に2を足す。",
      "ウ": "二方向の分岐を生むのはwhileのi＞0とifのx＜0である。この単一の制御フローでは、一本道の制御フローの基準値1に各判定の寄与1を加え、複雑度は3となる。",
      "エ": "変数iの初期値8は動作時の繰返し回数を決めるが、同じwhile判定を8個の別ノードにするわけではない。複雑度の計算ではwhileとifを各1回だけ数える。",
      "オ": "elseはifの判定のもう一方の枝なので、独立した判定を増やさない。繰返しごとに同じ枝を通る実行回数も、制御フローの複雑度に加算しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q33",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "個人認証の要素と生体認証の誤り率",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "個人認証は、知識を利用する知識認証、所有しているものを利用する所有物認証、生体情報を利用する生体認証の3種に大別できる。次の記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 知識認証として、パスワードやワンタイムパスワードの利用が挙げられる。ワンタイムパスワードは、パスワードが認証ごとに変化するため、一般に、通常のパスワードより安全性が高い。\n㋑ 乱数表を用いた認証では、一般に、認証ごとに異なる場所の乱数の入力を必要とする。この認証方式は所有物認証とみなすことができる。\n㋒ 生体認証においては、生体から情報を取得するごとに差異が生じるため、正規ユーザであっても認証されない場合がある。このようなエラーが起きる確率をFRRという。\n㋓ 脆弱なパスワードの利用やパスワードの使い回しを避け、サービスごとに十分な強度のある異なるパスワードを用いることで、フィッシングによる被害を防ぐことができる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "指定された値を乱数表から読み出す方法は、表を持っていることを確かめる所有物認証とみなせる。FRRは正規の本人を誤って拒否する割合なので、㋑と㋒が妥当である。",
    "choiceExplanations": {
      "ア": "手元の乱数表に指定された値を答える㋑は、表の所持を利用する。ワンタイムパスワードは生成器や受信端末の所持を確認する方式があり、一律に記憶した知識による認証に分類できない。",
      "イ": "㋐はワンタイムパスワードを知識認証として一括りにしている。㋓も、強いパスワードを偽サイトへ入力すれば、推測されなくても窃取され得るので誤りである。",
      "ウ": "指定された値を乱数表から読み出す方法は、表を持っていることを確かめる所有物認証とみなせる。FRRは正規の本人を誤って拒否する割合なので、㋑と㋒が妥当である。",
      "エ": "乱数表を所持していることで応答する㋑は妥当である。サービスごとに強いパスワードを使っても、偽の入力画面に正しい文字列を入力させる手口をそれだけで防げない。",
      "オ": "FRRは本人拒否率なので㋒は正しい。㋓の対策は使い回しによる被害拡大を抑えるが、利用者が偽サイトを本物と思って入力すること自体は防げない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q34",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "RSA署名の計算手順と処理列",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "RSA署名の署名機能をもつICカードを考える。図は、署名作成で必要となるs＝hᵈ mod nを計算する過程を表したフローチャートである。\nただし、入力h、d、nは全て非負整数、hはハッシュ値、d、nは署名に用いる鍵であり、h＜nを満たす。また、mod nはnで割った余り、lsb(c)はcの最下位ビット、≫は右ビットシフトを表す。\n\nnが大きな整数のとき、この計算過程において計算負荷が高いのは、処理M「s＝s*a mod n」及び処理S「a＝a*a mod n」である。ICカード内で署名作成を行ったときの処理MとSの実行順序が、ICカードの消費電力パターンなどのサイドチャネル情報から観測できると、秘密鍵の情報dを推測できる。\n処理MとSの実行順序として、SMSSMSSSSMSが観測されたとき、dの値はいくらか。",
    "choices": {
      "ア": "81",
      "イ": "117",
      "ウ": "138",
      "エ": "174",
      "オ": "578"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "与えられた列を図の1反復ずつ読むと、S、MS、S、MS、S、S、S、MSとなる。最下位からのビットは0、1、0、1、0、0、0、1で、値は2＋8＋128＝138である。",
    "choiceExplanations": {
      "ア": "観測列にはSが8個あり、図では1ビット当たりSを1回行う。81の2進表示1010001は7桁なので、この列を生じる値ではない。",
      "イ": "117の2進表示1110101は7桁であり、最下位のビットも1である。問題で与えられた列には8組があり、最初の組はMを伴わないSである。",
      "ウ": "与えられた列を図の1反復ずつ読むと、S、MS、S、MS、S、S、S、MSとなる。最下位からのビットは0、1、0、1、0、0、0、1で、値は2＋8＋128＝138である。",
      "エ": "174の下位3ビットは110なので、最下位からの3組はS、MS、MSになる。問題の列はS、MS、Sで始まるので一致しない。",
      "オ": "578は512以上1024未満なので、2進では10桁である。与えられた列ではSを8回行って終了しており、桁数が合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q34.webp"
    ],
    "imageAltTexts": [
      "RSAのべき乗計算を示すフローチャート。図中に処理MとSを示す"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q35",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "ハッシュ値の衝突の確率",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "要素数10の、添字0から始まる配列で構成されるハッシュ表に対して、開番地法（オープンアドレス法）を用いて{0,1,2,…,19}から選ばれた相異なる五つの値x₀、x₁、x₂、x₃、x₄を格納することを考える。格納に用いるハッシュ関数h：{0,1,2,…,19}→{0,1,2,…,9}は、各i（0≤i≤4）について、h(xᵢ)の値が一様かつ独立に分布すると仮定する。このとき、ハッシュ値の衝突に伴う処理が発生する確率、すなわちh(xₐ)＝h(xᵦ)が成立するa、b（a≠b、0≤a,b≤4）が存在する確率はおよそいくらか。",
    "choices": {
      "ア": "1/10",
      "イ": "1/3",
      "ウ": "1/2",
      "エ": "7/10",
      "オ": "9/10"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全てが異なる確率は、選ぶたびに既出の値を除いて(10/10)(9/10)(8/10)(7/10)(6/10)＝0.3024である。少なくとも一つの衝突の確率は1−0.3024＝0.6976なので、約7/10となる。",
    "choiceExplanations": {
      "ア": "1/10は、特定の二つの値だけのハッシュ値が一致する確率である。五つのうちどの組でも衝突し得るので、全てが異なる確率を先に求める必要がある。",
      "イ": "全てが異なる確率は1×0.9×0.8×0.7×0.6＝0.3024であり、これは約1/3に近い。求める衝突の確率はその補数である。",
      "ウ": "三つ目までが全て異なっても、四つ目は7、五つ目は6個の空いた値を選ばなければ衝突を避けられない。非衝突の確率は半分より小さく、衝突は約0.70である。",
      "エ": "全てが異なる確率は、選ぶたびに既出の値を除いて(10/10)(9/10)(8/10)(7/10)(6/10)＝0.3024である。少なくとも一つの衝突の確率は1−0.3024＝0.6976なので、約7/10となる。",
      "オ": "5個すべてに異なる値が付く確率は約0.30ある。衝突したときだけを数える補数は約0.70となり、0.90にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q36",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "グレースケール画像の最大・最小値フィルタ",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような256×256の符号なし8ビットグレースケール画像があり、画素値255の画素は白、画素値0の画素は黒になるように表示されているとする。図Ⅰの一部を拡大したものが図Ⅱである。\nここで、図Ⅰの画素値をf(x,y)とするとき、D・f(x,y)＝max f(x＋u,y＋v)、E・f(x,y)＝min f(x＋u,y＋v)（いずれも−1≤u≤1、−1≤v≤1）とするような演算子D、Eを考える。このとき、図Ⅲになるものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "D・D・E・E・f(x,y)",
      "イ": "D・E・D・E・f(x,y)",
      "ウ": "E・D・E・D・f(x,y)",
      "エ": "E・D・D・E・f(x,y)",
      "オ": "E・E・D・D・f(x,y)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Dは近くの最大値で置き換えるため、先に2回適用すると細い黒線が白い周囲に置き換わる。その後にEで残った暗部を2回広げると、消えた輪郭は戻らず、厚みのあるKが残る。",
    "choiceExplanations": {
      "ア": "右側からEを2回適用すると、周囲の最小値を取るため黒い線や点は最初に太くなる。その後にDを2回適用しても、細い黒線を先に消して太いKだけを残す処理にはならない。",
      "イ": "Eの直後にDを行う組を重ねても、まず暗い輪郭を広げる処理が繰り返される。図Ⅲのように細い暗線を先に除去するには、最大値を取るDを先行させる。",
      "ウ": "右端のDで細い線は少し縮むが、続くEが残っている暗部をすぐに広げる。Dを連続で2回行う場合より、図Ⅱの細い輪郭を除く作用は弱い。",
      "エ": "最初のEで細線を太らせてからDを2回かけるので、元の細線に対する縮小は実質的に弱まる。初めにDを2回用いれば、広がる前の細い輪郭を消しやすい。",
      "オ": "Dは近くの最大値で置き換えるため、先に2回適用すると細い黒線が白い周囲に置き換わる。その後にEで残った暗部を2回広げると、消えた輪郭は戻らず、厚みのあるKが残る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q36.webp"
    ],
    "imageAltTexts": [
      "元画像、部分拡大、処理結果を並べた三つのグレースケール図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q37",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "符号を出力するニューラルネットワーク",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "ニューラルネットワークの素子が図Ⅰのように示されているとき、出力yは次の式で求められるとする。\n\nz＝w₁x₁＋w₂x₂＋b\ny＝1（z＞0）、−1（z≤0）\n\nこのとき、図Ⅱで示されるネットワークに、入力(x₁,x₂)として①(−1,−1)、②(−1,1)、③(1,−1)、④(1,1)が入力されたときに得られる出力(y₁,y₂)の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "①(1,1)、②(−1,1)、③(−1,1)、④(1,−1)",
      "イ": "①(1,−1)、②(1,−1)、③(1,−1)、④(−1,1)",
      "ウ": "①(−1,−1)、②(1,−1)、③(1,−1)、④(1,1)",
      "エ": "①(−1,−1)、②(1,−1)、③(1,−1)、④(−1,1)",
      "オ": "①(−1,−1)、②(−1,1)、③(−1,1)、④(1,−1)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最初の出力hは①～③で1、④で−1となり、y₂は順に−1、−1、−1、1となる。y₁に入る中間の二出力は順に(1,1)、(1,−1)、(−1,1)、(1,1)なので、y₁は−1、1、1、−1である。",
    "choiceExplanations": {
      "ア": "①では最初の素子の出力hが1になり、y₂の入力和は1−2h＝−1である。y₂は1にならず、y₁につながる中間の二つの出力も共に1なのでy₁は−1である。",
      "イ": "①ではx₁＝x₂＝−1なので、最初の出力h＝1を受けても中間の二つの出力はどちらも1になる。y₁の入力和は1−1−1＝−1なので、①のy₁を1とする点が誤りである。",
      "ウ": "④では最初の素子の入力和1−1−1が負で、その出力hは−1である。中間の二つの入力和はどちらも1−1−(−1)＝1なので、y₁の入力和は−1となる。",
      "エ": "最初の出力hは①～③で1、④で−1となり、y₂は順に−1、−1、−1、1となる。y₁に入る中間の二出力は順に(1,1)、(1,−1)、(−1,1)、(1,1)なので、y₁は−1、1、1、−1である。",
      "オ": "②では最初の出力hは、1−(−1)−1＝1を符号化した1であり、y₂は−1になる。中間の片方だけが1となるので、y₁は1である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q37-1.webp",
      "/questions/kokka-sogo-dai/2025/senmon-digital/q37-2.webp"
    ],
    "imageAltTexts": [
      "重みとバイアスを入力に掛けるニューラルネットワークの1素子",
      "二つの入力を四つの中間素子に伝え、二つの出力を計算する回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q38",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "線形部分空間の判定",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "nを2以上の整数とする。次の㋐～㋓に掲げるℝ上の線形空間Vとその部分集合Wについて、WがVの線形部分空間となるもののみを全て挙げているものはどれか。\n\n㋐ Vを3次元ベクトル空間ℝ³とし、W＝{(x,y,z)∈V ∣ x²＋2xy＋y²−z²＝0 かつ x−y＋3z＝0}。\n㋑ Vを成分が実数のn次正方行列全体のなす線形空間Mₙ(ℝ)とし、W＝{A∈V ∣ tr(A)＝0}。\n㋒ Vを不定元xに関するn次以下の実係数多項式全体のなす線形空間ℝ[x]ₙとし、W＝{f(x)∈V ∣ xについての方程式f(x)＝0は実数解をもつ}。\n㋓ Vを実数列全体のなす線形空間{(aₖ)ₖ₌₁,₂,… ∣ aₖ∈ℝ}とし、W＝{(aₖ)ₖ₌₁,₂,…∈V ∣ (aₖ)ₖ₌₁,₂,…は等差数列}。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋑は線形なトレースの核で、和とスカラー倍に閉じている。㋓も初項と公差をそれぞれ加算またはスカラー倍した等差数列にとどまるため、両方が部分空間である。",
    "choiceExplanations": {
      "ア": "㋐の左の条件は(x＋y−z)(x＋y＋z)＝0なので、二つの平面のいずれかに入る条件である。例えば(−1,2,1)と(−2,1,1)は両条件を満たすが、その和(−3,3,2)は二次の条件を満たさない。",
      "イ": "トレースが0の行列と等差数列は、和とスカラー倍に関して閉じている。しかし㋐では二次の条件を満たす二点の和がその条件から外れる場合がある。",
      "ウ": "㋐は和に関して閉じていない。㋒でもx²と1−x²はそれぞれ実数解をもつが、和の定数多項式1は実数解をもたない。",
      "エ": "㋑はトレースという線形写像の核である。㋒は実数解をもつ二つの多項式を加えると実数解を失い得るので、両方を部分空間とはいえない。",
      "オ": "㋑は線形なトレースの核で、和とスカラー倍に閉じている。㋓も初項と公差をそれぞれ加算またはスカラー倍した等差数列にとどまるため、両方が部分空間である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q39",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "微分と積分の合成写像の像と核",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次数が4以下の1変数実係数多項式全体のなすベクトル空間をV、次数が5以下の1変数実係数多項式全体のなすベクトル空間をWとする。線形写像D、Iをそれぞれ\n\nD：W→V、f(x)↦(df/dx)(x)\nI：V→W、f(x)↦∫₀ˣ f(t)dt\n\nで定めるとき、D∘Iの像Im(D∘I)と、I∘Dの核Ker(I∘D)の次元の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "dim Im(D∘I)＝4、dim Ker(I∘D)＝0",
      "イ": "dim Im(D∘I)＝4、dim Ker(I∘D)＝1",
      "ウ": "dim Im(D∘I)＝5、dim Ker(I∘D)＝0",
      "エ": "dim Im(D∘I)＝5、dim Ker(I∘D)＝1",
      "オ": "dim Im(D∘I)＝6、dim Ker(I∘D)＝0"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "D∘IはV上の恒等写像なので、像の次元はdim V＝5である。逆にI∘Dはf(x)をf(x)−f(0)に写し、核は定数多項式だけからなる1次元空間である。",
    "choiceExplanations": {
      "ア": "積分してから微分すると、次数4以下のすべての入力がそのまま戻り、定数項も失われない。逆順では定数多項式が0に写るので、核は0次元ではない。",
      "イ": "核は定数多項式の空間なので1次元である。D∘Iの像には1、x、x²、x³、x⁴がすべて含まれており、4次元ではなく5次元である。",
      "ウ": "D∘IはVの恒等写像で、像の次元は5である。しかしI∘Dに定数多項式を入力すると0になるため、核の次元は0ではない。",
      "エ": "D∘IはV上の恒等写像なので、像の次元はdim V＝5である。逆にI∘Dはf(x)をf(x)−f(0)に写し、核は定数多項式だけからなる1次元空間である。",
      "オ": "D∘Iの値域はVなので、像にx⁵は含まれず、6次元にはならない。また、I∘Dは定数項を除くので核に定数関数が入る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q40",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "直交射影が可換になるベクトル",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ℝ³の元a＝(3,0,4)ᵀ、b＝(0,3,4)ᵀについて、ℝ³上の線形写像f、gを\n\nf(v)＝v−(⟨a,v⟩/⟨a,a⟩)a、g(v)＝v−(⟨b,v⟩/⟨b,b⟩)b\n\nで定める。ここで、⟨・,・⟩はユークリッド内積を表す。\nこのとき、部分空間V＝{v∈ℝ³ ∣ g(f(v))＝f(g(v))}として正しいのはどれか。",
    "choices": {
      "ア": "{(x,y,z)ᵀ∈ℝ³ ∣ x＝y＝z＝0}",
      "イ": "{(x,y,z)ᵀ∈ℝ³ ∣ x/3＝y/3＝z/8}",
      "ウ": "{(x,y,z)ᵀ∈ℝ³ ∣ x/4＝y/4＝−z/3}",
      "エ": "{(x,y,z)ᵀ∈ℝ³ ∣ 3x＋3y＋8z＝0}",
      "オ": "{(x,y,z)ᵀ∈ℝ³ ∣ 4x＋4y−3z＝0}"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "a、bへの射影をPₐ、Pᵦとすると、合成が等しい条件はPᵦPₐv＝PₐPᵦvであり、aとbが独立で内積が16なので両辺が0となるには⟨a,v⟩＝⟨b,v⟩＝0が必要である。これを解くと3x＋4z＝3y＋4z＝0、すなわちx/4＝y/4＝−z/3である。",
    "choiceExplanations": {
      "ア": "aとbの両方に直交するベクトルはfとgのどちらでも変わらない。例えば(4,4,−3)は両内積が0である非零の解なので、零ベクトルだけではない。",
      "イ": "この式で指定する方向はa＋b＝(3,3,8)で、aにもbにも直交しない。二つの合成を等しくするには、aへの射影後にbへ射影した結果と、逆順の結果がともに0となる必要がある。",
      "ウ": "a、bへの射影をPₐ、Pᵦとすると、合成が等しい条件はPᵦPₐv＝PₐPᵦvであり、aとbが独立で内積が16なので両辺が0となるには⟨a,v⟩＝⟨b,v⟩＝0が必要である。これを解くと3x＋4z＝3y＋4z＝0、すなわちx/4＝y/4＝−z/3である。",
      "エ": "3x＋3y＋8z＝0はa＋bに直交するという条件にすぎない。例えば(1,−1,0)はこれを満たしても、aとbへの内積がそれぞれ3と−3で、合成が一致しない。",
      "オ": "4x＋4y−3z＝0は、求める方向(4,4,−3)に直交する平面である。可換になるベクトルは、その方向に沿う直線に含まれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q41",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "実行列の固有値と固有空間",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "実行列［4 1 1；2 5 2；1 2 2］の固有値と、それに対応する固有空間の組合せとして正しいのは次のうちではどれか。\n（行列は「；」で行を区切っている。）",
    "choices": {
      "ア": "2、{(x,y,z)ᵀ∈ℝ³ ∣ x＝y/2＝−z/5}",
      "イ": "3、{(x,y,z)ᵀ∈ℝ³ ∣ x＝y/2＝z}",
      "ウ": "5、{(x,y,z)ᵀ∈ℝ³ ∣ x＝y/2＝−z/5}",
      "エ": "7、{(x,y,z)ᵀ∈ℝ³ ∣ x＝y/2＝z}",
      "オ": "11、{(x,y,z)ᵀ∈ℝ³ ∣ x＝y/2＝−z/5}"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "行列を(1,2,1)に掛けると(7,14,7)となり固有値7が得られる。また行列から7Iを引いた連立式ではy＝2x、z＝xになるので、固有空間全体がこの直線である。",
    "choiceExplanations": {
      "ア": "記された直線は(1,2,−5)を張るが、行列を掛けると(1,2,−5)がそのまま得られる。対応する固有値は2ではなく1である。",
      "イ": "条件x＝y/2＝zの直線の生成ベクトルは(1,2,1)である。行列を作用させると(7,14,7)となるため、固有値3には対応しない。",
      "ウ": "(1,2,−5)に行列を掛けた第1成分は4＋2−5＝1である。固有値5であれば第1成分は5になるはずなので、この組合せは誤りである。",
      "エ": "行列を(1,2,1)に掛けると(7,14,7)となり固有値7が得られる。また行列から7Iを引いた連立式ではy＝2x、z＝xになるので、固有空間全体がこの直線である。",
      "オ": "11は行列の対角成分の和だが、一つの固有値とは限らない。与えられた直線の(1,2,−5)に対する倍率は1なので、11との組合せにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q42",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "関数項級数の一様収束",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の関数項級数㋐、㋑、㋒のうち、ℝ上一様収束するもののみを全て挙げているのはどれか。\n\n㋐ ∑（n＝1から∞） (cos nx)/3ⁿ\n㋑ ∑（n＝1から∞） 1/(n³＋nx²)\n㋒ ∑（n＝1から∞） x⁴/(1＋x⁴)^(n−1)",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐は各項の絶対値が1/3ⁿ以下、㋑は1/n³以下で、それぞれの定数項級数が収束するので一様収束する。㋒の和はx≠0で1＋x⁴、x＝0で0となって連続でないので、一様収束しない。",
    "choiceExplanations": {
      "ア": "㋐は各項の絶対値が1/3ⁿ以下、㋑は1/n³以下で、それぞれの定数項級数が収束するので一様収束する。㋒の和はx≠0で1＋x⁴、x＝0で0となって連続でないので、一様収束しない。",
      "イ": "㋐と㋑にはxによらない収束する上界の級数がある。㋒は連続関数の部分和をいくら重ねても、x＝0で不連続な極限への収束となるため一様ではない。",
      "ウ": "㋐は絶対値を1/3ⁿで抑えられる。しかし㋒ではx≠0で等比級数の和が1＋x⁴となり、x＝0では全項0なので、一様収束の必要条件である極限関数の連続性を欠く。",
      "エ": "㋑が一様収束する点は正しい。㋐もn番目の項の絶対値をxによらず3⁻ⁿで抑えられ、その和が有限なので含める必要がある。",
      "オ": "㋒はx≠0のときに公比1/(1＋x⁴)の等比級数になるが、x＝0付近の振る舞いが一様でない。極限関数がx＝0で連続にならないので、㋒は選べない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q43",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "非同次線形微分方程式と境界条件",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "y＝y(x)を未知関数とする微分方程式\n\nd²y/dx²−2 dy/dx＝−2(x²＋x＋1)/(x²＋1)²\n\nはy＝tan⁻¹xを一つの解にもつ。この方程式のy(0)＝y(1)＝0を満たす解についてdy/dx(0)はいくらか。\nただし、tan⁻¹xはtan θ＝x及び−π/2＜θ＜π/2を満たすただ一つのθのことである。",
    "choices": {
      "ア": "1−(π/4)e/(e−1)",
      "イ": "1−(π/4)e²/(e²−1)",
      "ウ": "1−(π/2)e/(e²−1)",
      "エ": "1−(π/4)/(e−1)",
      "オ": "1−(π/2)/(e²−1)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "一般解はtan⁻¹x＋A＋Be^(2x)で、y(0)＝0からA＝−B、y(1)＝0からB＝−π/[4(e²−1)]となる。x＝0で微分を取ると1＋2B＝1−π/[2(e²−1)]である。",
    "choiceExplanations": {
      "ア": "元の方程式の同次部分はy″−2y′＝0であり、指数関数はeˣではなくe^(2x)となる。従って境界条件を使う分母はe²−1である。",
      "イ": "境界条件は指数関数の係数を−π/[4(e²−1)]に定める。x＝0でe^(2x)を微分した値は2であり、係数に掛かる因子はe²ではない。",
      "ウ": "同次解の指数関数の値をx＝1で使うのは、境界条件を課すときである。傾きを求めるx＝0ではe^(2x)＝1なので、分子にeは掛からない。",
      "エ": "境界値の差はtan⁻¹1−tan⁻¹0＝π/4だが、同次解の差は係数にe²−1を掛けたものである。微分ではさらに指数の係数2が掛かる。",
      "オ": "一般解はtan⁻¹x＋A＋Be^(2x)で、y(0)＝0からA＝−B、y(1)＝0からB＝−π/[4(e²−1)]となる。x＝0で微分を取ると1＋2B＝1−π/[2(e²−1)]である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q44",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "最後の偶数カードを引くまでの期待値",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように1から6までの数字が一つずつ書かれた6枚のカードの中から無作為に1枚ずつカードを抜き出す。ただし、抜き出したカードは元に戻さないものとする。偶数が書かれたカードを全て抜き出した時点で試行を終える。抜き出したカードの枚数の期待値はいくらか。",
    "choices": {
      "ア": "9/2",
      "イ": "19/4",
      "ウ": "5",
      "エ": "21/4",
      "オ": "11/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "偶数は3枚とも必ず引く。各奇数はそれと偶数3枚の中で最後のときだけ引かれないので、期待枚数は3＋3×(3/4)＝21/4になる。",
    "choiceExplanations": {
      "ア": "偶数のカードはすべて引くので3枚が確定する。各奇数カードが偶数3枚のうち最後のカードより前に来る確率は3/4なので、引く奇数カードは平均9/4枚になる。",
      "イ": "最後の偶数カードより前に、ある奇数カードを引く確率は、偶数3枚とその奇数1枚の相対順で奇数が最後でない確率である。従ってその確率は3/4であり、合計期待値は19/4ではなく3＋3×3/4である。",
      "ウ": "最後に引く偶数カードの位置は一定でなく、3番目から6番目まであり得る。偶数3枚の位置の最大値を、選び方が等確率の20組で平均すると21/4になる。",
      "エ": "偶数は3枚とも必ず引く。各奇数はそれと偶数3枚の中で最後のときだけ引かれないので、期待枚数は3＋3×(3/4)＝21/4になる。",
      "オ": "期待値11/2なら引かれる奇数の平均は2.5枚となる。各奇数が最後の偶数より前に出る確率は3/4なので、奇数の期待枚数は2.25枚である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q44.webp"
    ],
    "imageAltTexts": [
      "1から6までの数字を一つずつ記した6枚のカード"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q45",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "サイコロの和の正規近似と95％点",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "1から6までの数字が一つずつ書かれたサイコロを考える。このサイコロを105回振ったときに出た目の和がk以下となる確率をpₖとする。pₖが95％以上となるkのうち、10の倍数で最小のものはいくらか。\n必要であれば、平均が0で分散が1の正規分布の上側5％点がおよそ1.645であることを用いてよい。",
    "choices": {
      "ア": "370",
      "イ": "380",
      "ウ": "390",
      "エ": "400",
      "オ": "410"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "1回の平均と分散は3.5と35/12なので、105回の和は平均367.5、標準偏差17.5である。正規近似の95％点は367.5＋1.645×17.5≒396.3となり、これを満たす最小の10の倍数は400である。",
    "choiceExplanations": {
      "ア": "和の平均は105×3.5＝367.5なので、370は平均をわずかに上回るだけである。標準偏差は17.5で、上側5％点に達するには平均におよそ28.8を加える。",
      "イ": "380は平均より12.5大きく、標準偏差17.5の1倍にも達しない。95％点に必要な位置は、平均よりおよそ1.645×17.5上にある。",
      "ウ": "390での標準化値は(390−367.5)/17.5≒1.29であり、上側5％点1.645に達しない。整数への補正を0.5加えても約1.31で、まだ不足する。",
      "エ": "1回の平均と分散は3.5と35/12なので、105回の和は平均367.5、標準偏差17.5である。正規近似の95％点は367.5＋1.645×17.5≒396.3となり、これを満たす最小の10の倍数は400である。",
      "オ": "410も95％以上になるが、最小の10の倍数を求めるのが設問である。95％点が約396であるため、すでに400で条件を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q46",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "数学モデル",
    "topicTags": [
      "マルコフ連鎖と3日後の不良品率",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある工場で、ある製品を1日1個ずつ作っている。ある日に作った製品が正常なものであるとき、翌日作る製品が正常なものである確率が70％、不良品である確率が30％である。また、ある日に作った製品が不良品であるとき、翌日作る製品が正常なものである確率が90％、不良品である確率が10％である。ある日に作った製品が不良品であるとき、3日後に作った製品もまた不良品である確率はおよそいくらか。",
    "choices": {
      "ア": "3％",
      "イ": "9％",
      "ウ": "24％",
      "エ": "28％",
      "オ": "33％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "不良が出た日を0日目とし、n日後の不良確率をpₙとすると、pₙ₊₁＝0.1pₙ＋0.3(1−pₙ)となる。p₀＝1から0.10、0.28、0.244と移るので、3日後は約24％である。",
    "choiceExplanations": {
      "ア": "不良品が3日連続する場合だけでなく、途中で正常品が作られてから3日後に不良品となる場合も含める。翌日の不良確率は前日が正常なら0.3なので、途中で正常に戻る経路を無視できない。",
      "イ": "初日に不良品なら、翌日に正常品となる確率は90％である。この経路でも3日後に再び不良となり得るので、初日の不良が続く確率だけで3日後を求めることはできない。",
      "ウ": "不良が出た日を0日目とし、n日後の不良確率をpₙとすると、pₙ₊₁＝0.1pₙ＋0.3(1−pₙ)となる。p₀＝1から0.10、0.28、0.244と移るので、3日後は約24％である。",
      "エ": "0.28は2日後の確率であり、この時点で正常品の確率は0.72である。さらに1日進めると0.28×0.1＋0.72×0.3＝0.244となる。",
      "オ": "翌日の不良確率は、その前の日に不良なら0.1、正常なら0.3である。その加重平均は0.3以下なので、3日後に33％となることはない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q47",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "オペレーションズ・リサーチ",
    "topicTags": [
      "重み付き二次制約と線形目的関数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の非線形計画問題の最適解における目的関数の値はいくらか。\nただし、nは正の整数とする。\n\n最小化：−∑（i＝1からn）xᵢ\n制約：∑（i＝1からn）2^(i−1)xᵢ²＝1、xᵢ≥0（i＝1,2,…,n）",
    "choices": {
      "ア": "−3＋2^(−n＋2)",
      "イ": "−2＋2^(−n＋1)",
      "ウ": "−2^(−n＋1)",
      "エ": "−√(2−2^(−n＋1))",
      "オ": "−√(3−2^(−n＋2))"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "コーシー・シュワルツの不等式を重み付きで用いると、(∑xᵢ)²≤(∑2^(i−1)xᵢ²)(∑2^(1−i))＝2−2^(−n＋1)である。xᵢを2^(1−i)に比例させると等号にできるため、最小値は−√(2−2^(−n＋1))である。",
    "choiceExplanations": {
      "ア": "例えばn＝2では、x₁²＋2x₂²＝1の下でx₁＋x₂は√(3/2)以下である。選択肢1はこのとき−2となって、実現できる最小値より小さい。",
      "イ": "選択肢2は、逆重みを足した2−2^(−n＋1)に負号を付けた形である。コーシー・シュワルツの不等式が直接与えるのは和の二乗の上限なので、目的関数の値には平方根が必要である。",
      "ウ": "n＝2のとき選択肢3は−1/2であるが、x₁＝1、x₂＝0という許容点ですでに−1が得られる。従って提示された式は最小値を表さない。",
      "エ": "コーシー・シュワルツの不等式を重み付きで用いると、(∑xᵢ)²≤(∑2^(i−1)xᵢ²)(∑2^(1−i))＝2−2^(−n＋1)である。xᵢを2^(1−i)に比例させると等号にできるため、最小値は−√(2−2^(−n＋1))である。",
      "オ": "平方根の中に入れるのは各二次項の重み2^(i−1)の逆数を足した値である。数列1、1/2、…、2^(1−n)の和は2−2^(−n＋1)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q48",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "オペレーションズ・リサーチ",
    "topicTags": [
      "単一窓口の平均待ち時間",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある売店にはレジが一つしかなく、他の客が会計中であれば、後から来た客は順番に並んで待たなければならない。客は平均して3分間に1人の割合の定常ポアソン過程に従ってレジに到着し、1人の客に対する会計の時間は平均1分の指数分布に従うものとする。定常状態において、客がレジに到着してから自分の番が来るまでの平均待ち時間はいくらか。",
    "choices": {
      "ア": "1/2分",
      "イ": "2/3分",
      "ウ": "1分",
      "エ": "4/3分",
      "オ": "3/2分"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "単一窓口のM/M/1待ち行列で、到着率λ＝1/3、サービス率μ＝1である。会計開始までの平均待ち時間はλ/[μ(μ−λ)]＝1/2分となる。",
    "choiceExplanations": {
      "ア": "単一窓口のM/M/1待ち行列で、到着率λ＝1/3、サービス率μ＝1である。会計開始までの平均待ち時間はλ/[μ(μ−λ)]＝1/2分となる。",
      "イ": "2/3は窓口が空いている時間の割合1−λ/μに当たる。平均待ち時間はλ/[μ(μ−λ)]で求めるので、値は1/2分である。",
      "ウ": "1分は窓口での平均会計時間であり、設問が尋ねるのは会計が始まるまでの時間である。定常状態での待ち時間は平均で1分より短い。",
      "エ": "サービス率との差μ−λは2/3で、会計が終わるまでの平均時間はその逆数の3/2分である。ここから会計自体の平均1分を引くと、待ち時間は1/2分となる。",
      "オ": "3/2分は、会計時間も含めた平均滞在時間1/(μ−λ)である。自分の番を待つ時間だけを求めるには会計時間の平均1分を差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q49",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "経営工学",
    "topicTags": [
      "焼きなまし法の近傍移動と温度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "組合せ最適化問題を解くための発見的解法の一つである焼きなまし法（simulated annealing）に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 現在の解の近傍からランダムに選んだ解が改善解ならばその解に移動する。\n㋑ 温度パラメータが低い方が、移動が生じやすい。\n㋒ 温度パラメータを急速に下げる方が、最適解が得られやすい。\n㋓ 必ずしも最適解が得られるとは限らない。",
    "choices": {
      "ア": "㋐、㋑、㋓",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "改善解は受理し、温度によっては悪化する解も確率的に受理して局所解を抜け出すことを狙う。有限回の実行で最適解を得る保証はないので、㋐と㋓が妥当である。",
    "choiceExplanations": {
      "ア": "改善解への移動と、実行で最適解が必ず得られるとは限らない点は正しい。温度が低いと目的値を悪化させる移動の受理確率が低くなるので、㋑が誤りである。",
      "イ": "改善解は受理し、温度によっては悪化する解も確率的に受理して局所解を抜け出すことを狙う。有限回の実行で最適解を得る保証はないので、㋐と㋓が妥当である。",
      "ウ": "高温であるほど悪化する方向へも移動しやすいので、㋑は誤りである。㋒のように急冷すると、十分に広い範囲を探索できずに局所解にとどまりやすい。",
      "エ": "最適解が確実に得られるとは限らないという㋓は妥当である。㋑は低温で悪化方向への移動が抑えられるという関係を逆にしている。",
      "オ": "㋓のように有限の探索で最適性は保証されない。急速に温度を下げると悪化する移動を早く拒むようになるため、㋒のように最適解を得やすいとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q50",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "経営工学",
    "topicTags": [
      "ヘッセ行列と多変数関数の凸性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の関数f(x,y,z)が凸関数となるような整数kはいくつあるか。\n\nf(x,y,z)＝3x²＋(8−k)xy＋3y²＋(2/3)z⁶−(k/3)z⁴＋10z²",
    "choices": {
      "ア": "8",
      "イ": "9",
      "ウ": "10",
      "エ": "11",
      "オ": "15"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "x、yのヘッセ行列の対角は6、非対角は8−kであり、半正定値の条件は∣8−k∣≤6である。zの二階微分は20z⁴−4kz²＋20で、k≥2ではz²＝k/10で最小値20−k²/5を取るため、条件を合わせると整数kは2～10の9個である。",
    "choiceExplanations": {
      "ア": "x、yのヘッセ行列が半正定値となるには2≤k≤14が必要である。zの二階微分が全てのzで非負となるk≤10と合わせると、端の2と10も含まれて9個になる。",
      "イ": "x、yのヘッセ行列の対角は6、非対角は8−kであり、半正定値の条件は∣8−k∣≤6である。zの二階微分は20z⁴−4kz²＋20で、k≥2ではz²＝k/10で最小値20−k²/5を取るため、条件を合わせると整数kは2～10の9個である。",
      "ウ": "k＝1ではx、yのヘッセ行列の非対角成分が7となり、一方の固有値6−7が負になる。下端に1を加えることはできず、x、yとzの両条件を満たすのは2～10である。",
      "エ": "x、yだけでもkは2～14に限られる。さらにk＞10ではz²＝k/10で二階微分が負になるので、許される整数は2～10の範囲に減る。",
      "オ": "x、yの方向に制限したときの凸性から、kは2～14の最大13個までに絞られる。zの方向にも凸性が必要なので、15個の整数が条件を満たすことはない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q51",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "制御工学",
    "topicTags": [
      "振り子の動作点と伝達関数の極",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのようなモータの回転軸にアームが取り付けられた振り子のシステムにおいて、運動方程式が次の式で与えられている。\n\nI d²θ(t)/dt²＋ν dθ(t)/dt＋mgl cos(θ(t))＝τ(t)\n\nここで、θ(t)はモータの中心を通る水平面からアームを反時計回りに回転させた角度、τ(t)は入力トルク、I、ν、mglはそれぞれ物理定数である。図Ⅱのような入力トルクが0（ゼロ）である倒立状態及び懸垂状態にそれぞれ微小なトルクδτ(t)を加えたときの微小な回転角の変化をδθ(t)とする。このとき、倒立状態及び懸垂状態それぞれについて、入力δτ(t)から出力δθ(t)までの伝達関数を考える。この二つの伝達関数の極の組合せとして最も妥当なのはどれか。\nただし、I＝1 kg・m²、ν＝4 kg・m²/s、mgl＝3 kg・m²/s²とする。",
    "choices": {
      "ア": "倒立 −2−√7、−2＋√7 ／ 懸垂 −3、−1",
      "イ": "倒立 −2−√7、−2＋√7 ／ 懸垂 1、3",
      "ウ": "倒立 −4、0 ／ 懸垂 −4、0",
      "エ": "倒立 −3、−1 ／ 懸垂 −2−√7、−2＋√7",
      "オ": "倒立 2−√7、2＋√7 ／ 懸垂 −3、−1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "重力項の一次係数は−mgl sin θ₀であり、倒立のθ₀＝π/2では−3、懸垂のθ₀＝−π/2では＋3である。分母s²＋4s−3の根は−2±√7、分母s²＋4s＋3の根は−3、−1となる。",
    "choiceExplanations": {
      "ア": "重力項の一次係数は−mgl sin θ₀であり、倒立のθ₀＝π/2では−3、懸垂のθ₀＝−π/2では＋3である。分母s²＋4s−3の根は−2±√7、分母s²＋4s＋3の根は−3、−1となる。",
      "イ": "倒立側の根は正しく求まっている。懸垂側の分母は(s＋1)(s＋3)なので、極は1、3ではなく−1、−3である。",
      "ウ": "それぞれの平衡点ではcos θ₀＝0だが、cosの微分−sin θ₀は0ではない。したがって二つの伝達関数の分母に、s²＋4sだけでなく符号の異なる定数項が残る。",
      "エ": "倒立では上側のθ₀＝π/2から少し回すと、重力項の一次係数は負になる。倒立側が不安定な正の極をもち、懸垂側は二つとも負なので、提示された並びは逆である。",
      "オ": "粘性抵抗に対応する一次の係数は倒立でも＋4なので、倒立側の二つの極の和は−4である。2±√7の和は＋4になり、符号が一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q51.webp"
    ],
    "imageAltTexts": [
      "図Ⅰのモータとアーム、および図Ⅱの倒立状態と懸垂状態"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q52",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "制御工学",
    "topicTags": [
      "二つの負帰還を含む線図の整理",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次のブロック線図において入力uから出力yまでの伝達関数を表したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "G₁G₃/(1＋G₁G₂＋G₃G₄)",
      "イ": "G₁G₂G₃G₄/(1＋G₁G₂＋G₃G₄)",
      "ウ": "G₁G₃/(1＋G₁G₂＋G₃G₄＋G₁G₂G₃G₄)",
      "エ": "G₁G₃/(1＋G₁G₂＋G₃G₄＋2G₁G₂G₃G₄)",
      "オ": "G₁G₃/(1＋2G₁G₃＋G₂G₄＋G₁G₂G₃G₄)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "G₃への入力をzとすると、図でG₂への入力も同じくG₁出力からG₄出力を引いたzであり、y＝G₃zである。z＝G₁(u−G₂z)−G₄G₃zを整理すると、y/u＝G₁G₃/(1＋G₁G₂＋G₃G₄)となる。",
    "choiceExplanations": {
      "ア": "G₃への入力をzとすると、図でG₂への入力も同じくG₁出力からG₄出力を引いたzであり、y＝G₃zである。z＝G₁(u−G₂z)−G₄G₃zを整理すると、y/u＝G₁G₃/(1＋G₁G₂＋G₃G₄)となる。",
      "イ": "前向きに入力から出力へ進むとG₁とG₃を通り、G₂とG₄は帰還側にある。両方の帰還を0にしてもG₁G₃が残るので、分子が四つの積にはならない。",
      "ウ": "G₂とG₃の入力に同じ差zを使うと、戻ってくる二項はG₁G₂zとG₃G₄zである。二つの帰還係数を別々に掛け合わせた積の項は生じない。",
      "エ": "二つの帰還は、同じ差の信号に比例する係数G₁G₂とG₃G₄を加える形で入る。従ってそれらの積を2倍した項は分母に入らない。",
      "オ": "G₁G₃は入力から出力への前向きの利得である。帰還の寄与はG₁G₂とG₃G₄であり、例えばG₂＝G₄＝0なら分母は1になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q52.webp"
    ],
    "imageAltTexts": [
      "G₁からG₄と三つの加算点からなる負帰還ブロック線図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q53",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "渦電流の向きと磁石への追従",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "渦電流に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図Ⅰのように、アルミニウム製の円板を、軸を中心に自由に回転できるように、磁石のN極とS極の間に設置する。図Ⅱはこれを上から見た様子を示している。磁石を静止させた状態で、円板を図Ⅱの矢印の向きに回転させると、円板の中には図Ⅱの［㋐］の向きに渦電流が流れる。また、円板と磁石を静止させた状態から磁石を円板の周に沿って一定の方向に動かしたとき、円板は［㋑］。」",
    "choices": {
      "ア": "㋐ A、D ／ ㋑ 磁石の動きと同じ方向に回転する",
      "イ": "㋐ A、D ／ ㋑ 磁石の動きと逆の方向に回転する",
      "ウ": "㋐ A、D ／ ㋑ 動かない",
      "エ": "㋐ B、C ／ ㋑ 磁石の動きと同じ方向に回転する",
      "オ": "㋐ B、C ／ ㋑ 磁石の動きと逆の方向に回転する"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "磁石へ近づく部分は増える下向き磁束を打ち消す反時計回りのB、離れる部分は減る下向き磁束を補う時計回りのCである。磁石を動かすと、円板は磁石との相対速度を小さくする同方向へ回る。",
    "choiceExplanations": {
      "ア": "円板が図の向きに回転すると、磁石に近づく側では下向き磁束が増加する。その増加を打ち消す上向きの磁界を作るには、上から見て反時計回りのBの電流が流れる。",
      "イ": "磁石に近づく側ではB、離れる側ではCの向きに電流が流れる。磁石を動かす場合、渦電流による力は磁石と円板の相対運動を弱めるように働くため、円板は同じ方向に回る。",
      "ウ": "円板と磁石が相対的に動けば円板を貫く磁束が変わり、導体に渦電流が生じる。その電流は磁石との相対運動を妨げる向きに円板へ力を及ぼすので、円板は静止したままとは限らない。",
      "エ": "磁石へ近づく部分は増える下向き磁束を打ち消す反時計回りのB、離れる部分は減る下向き磁束を補う時計回りのCである。磁石を動かすと、円板は磁石との相対速度を小さくする同方向へ回る。",
      "オ": "B、Cの電流の向きはレンツの法則に合う。磁石の動きに対して円板が逆回転すると相対速度が増すので、㋑は同方向となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q53.webp"
    ],
    "imageAltTexts": [
      "図Ⅰのアルミ円板と磁石、図Ⅱの渦電流の向きA～Dと回転方向"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q54",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "誘電体を挿入したコンデンサの電界",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、真空中に置かれた極板間隔dの平行平板コンデンサに電圧Vの電源が接続され、極板にQ₀の電荷が蓄えられている。このコンデンサに、面積と形状が極板と等しく、誘電率3ε₀、厚さ(2/5)dの誘電体板を、次の2通りの方法で、極板と平行に挿入する。\n\n① コンデンサを電源から切り離してから誘電体板を挿入（極板に蓄えられた電荷を固定）\n② コンデンサを電源に接続したまま誘電体板を挿入（極板間の電圧を固定）\n\n①のときの真空部分における電界の大きさをE₁とし、②のときの真空部分における電界の大きさをE₂とするとき、E₂/E₁の値として最も妥当なのはどれか。\nただし、端効果は無視できるものとする。また、真空の誘電率をε₀とする。",
    "choices": {
      "ア": "11/15",
      "イ": "5/6",
      "ウ": "6/5",
      "エ": "15/11",
      "オ": "15/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "①の電荷固定では真空電界E₁＝V/dで変わらない。②ではV＝E₂(3d/5)＋(E₂/3)(2d/5)＝E₂(11d/15)となるので、E₂/E₁＝15/11である。",
    "choiceExplanations": {
      "ア": "11/15は、真空と誘電体の電圧降下を真空電界で割った有効な距離の、元の間隔dに対する比である。固定電圧での電界は距離に反比例するので、電界比はその逆数となる。",
      "イ": "電荷を固定する①の真空電界は挿入前のV/dのままである。②では分極によって、電源から追加の電荷が供給されるため、真空電界はV/dより大きくなる。",
      "ウ": "②では真空部が3d/5、誘電体部が2d/5で、後者の電界は前者の1/3である。電圧を足し合わせるとV＝(11/15)dE₂になり、6/5にはならない。",
      "エ": "①の電荷固定では真空電界E₁＝V/dで変わらない。②ではV＝E₂(3d/5)＋(E₂/3)(2d/5)＝E₂(11d/15)となるので、E₂/E₁＝15/11である。",
      "オ": "誘電体中の電圧降下だけを考えると有効距離が2d/15に見える。しかし②では真空部3d/5の電圧降下も含むため、有効距離は11d/15である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q54.webp"
    ],
    "imageAltTexts": [
      "平行平板コンデンサと、電荷または電圧を固定して誘電体を入れる二通りの構成"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q55",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "テブナン等価回路と最大電力",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図の回路に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「抵抗値R［Ω］の抵抗を流れる電流Iᵣ［A］は［㋐］［A］と表すことができる。また、抵抗値R［Ω］の抵抗で消費される電力は、Rが［㋑］［Ω］の場合に最大となる。」",
    "choices": {
      "ア": "㋐ I/(1＋2R) ／ ㋑ 1",
      "イ": "㋐ I/(1＋2R) ／ ㋑ 1/2",
      "ウ": "㋐ I/(2＋3R) ／ ㋑ 1",
      "エ": "㋐ I/(2＋3R) ／ ㋑ 2/3",
      "オ": "㋐ I/(2＋3R) ／ ㋑ 1/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Rを外した端子の電圧は、電流Iを1Ωと2Ωの枝に分けたときの右の抵抗の降下I/3で、端子から見た等価抵抗は1Ωと2Ωの並列で2/3Ωである。従ってIᵣ＝(I/3)/(R＋2/3)＝I/(2＋3R)で、最大電力はR＝2/3Ωで得られる。",
    "choiceExplanations": {
      "ア": "電流源を開放して負荷から見ると、右の1Ωと、残る二つの1Ωを直列にした2Ωが並列になる。従って最大電力の条件はR＝1Ωではなく、等価抵抗の2/3Ωである。",
      "イ": "電流式I/(1＋2R)は、左側と右側の枝の抵抗の構成を反映していない。R端子の等価抵抗は1Ωと2Ωの並列であり、最大電力は1/2Ωでは得られない。",
      "ウ": "電流式はI/(2＋3R)となる。電力RIᵣ²を最大にするにはRを2/3Ωにするため、R＝1Ωという条件は合わない。",
      "エ": "Rを外した端子の電圧は、電流Iを1Ωと2Ωの枝に分けたときの右の抵抗の降下I/3で、端子から見た等価抵抗は1Ωと2Ωの並列で2/3Ωである。従ってIᵣ＝(I/3)/(R＋2/3)＝I/(2＋3R)で、最大電力はR＝2/3Ωで得られる。",
      "オ": "Iᵣ＝I/(2＋3R)は正しいが、R＝1/2Ωは等価抵抗に一致しない。等価抵抗は1Ωと2Ωの並列で、逆数を加えてから戻すと2/3Ωである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q55.webp"
    ],
    "imageAltTexts": [
      "電流源Iと三つの1Ω抵抗、負荷Rからなる回路図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q56",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "並列RCと直列コイルの同相条件",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図の交流回路において、V̇とİが同相であるとき、ωL及びİの組合せとして最も妥当なのはどれか。\nただし、R＝3Ω、1/(ωC)＝4Ω、ωは電源の角周波数とする。また、V̇は複素電圧、İは複素電流を表す。",
    "choices": {
      "ア": "ωL 1.44Ω ／ İ V̇/4",
      "イ": "ωL 1.44Ω ／ İ V̇/3",
      "ウ": "ωL 1.44Ω ／ İ V̇/1.92",
      "エ": "ωL 4Ω ／ İ V̇/4",
      "オ": "ωL 4Ω ／ İ V̇/3"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "並列部のインピーダンスは3(−j4)/(3−j4)＝1.92−j1.44Ωである。直列のjωLを加え、虚部を0にするにはωL＝1.44Ωが必要で、そのときİ＝V̇/1.92になる。",
    "choiceExplanations": {
      "ア": "ωL＝1.44Ωとすれば合成の虚部は消える。しかし、抵抗とコンデンサの並列部の実部は1.92Ωで、コンデンサのリアクタンスの大きさ4Ωが抵抗分になるわけではない。",
      "イ": "並列部の合成インピーダンスは1.92−j1.44Ωである。虚部をコイルで相殺した後に残るのは1.92Ωなので、電流をV̇/3とはできない。",
      "ウ": "並列部のインピーダンスは3(−j4)/(3−j4)＝1.92−j1.44Ωである。直列のjωLを加え、虚部を0にするにはωL＝1.44Ωが必要で、そのときİ＝V̇/1.92になる。",
      "エ": "コンデンサ単体のリアクタンスは−j4Ωだが、コイルと直列につながっているのは抵抗を含む並列部である。並列部の虚部が−1.44なので、ωL＝4Ωでは虚部が残る。",
      "オ": "R＝3Ωをそのまま電源から見た抵抗にはできない。並列部を計算すると実部1.92Ωと虚部−1.44Ωが得られ、後者だけをコイルで打ち消す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q56.webp"
    ],
    "imageAltTexts": [
      "コイルLと、コンデンサC・抵抗Rの並列部を接続した交流回路図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q57",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "力率、有効電力と並列回路の電流",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図の回路において、単相交流電圧源の実効値は200V、回路の力率は0.8であった。電圧源の有効電力出力P［kW］、リアクタンスX［Ω］、電流の実効値I［A］の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "P 10 ／ X 3.00 ／ I 50.0",
      "イ": "P 10 ／ X 5.33 ／ I 62.5",
      "ウ": "P 50 ／ X 3.00 ／ I 50.0",
      "エ": "P 50 ／ X 5.33 ／ I 50.0",
      "オ": "P 50 ／ X 5.33 ／ I 62.5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "有効電力を消費する抵抗は4Ωなので、P＝200²/4＝10kWである。同相電流50Aを力率0.8で割ると全電流62.5Aで、直交成分は√(62.5²−50²)＝37.5A、従ってX＝200/37.5≒5.33Ωとなる。",
    "choiceExplanations": {
      "ア": "抵抗枝の電流は200/4＝50Aだが、これは電圧と同相の成分だけである。力率0.8なので、リアクタンス枝も含めた実効電流は50/0.8＝62.5Aになる。",
      "イ": "有効電力を消費する抵抗は4Ωなので、P＝200²/4＝10kWである。同相電流50Aを力率0.8で割ると全電流62.5Aで、直交成分は√(62.5²−50²)＝37.5A、従ってX＝200/37.5≒5.33Ωとなる。",
      "ウ": "200Vは抵抗4Ωにも直接かかるので、有効電力は200²/4＝10,000Wである。50は抵抗を流れるアンペア数であって、50kWにはならない。",
      "エ": "Xが約5.33Ωならリアクタンス枝には約37.5Aが流れ、抵抗枝の50Aと直交する。合成電流は50Aのままではなく、また有効電力は抵抗枝の10kWである。",
      "オ": "合成電流62.5AとX≒5.33Ωは条件に合う。有効電力は200×62.5×0.8＝10,000Wなので、50kWではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q57.webp"
    ],
    "imageAltTexts": [
      "200Vの交流電源にリアクタンスXと4Ωの抵抗を並列に結んだ回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q58",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "nチャネルMOSFETの飽和とピンチオフ",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "MOSFETに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「MOSFETは、ゲート・ソース間電圧によって、ドレイン電流を制御できる。ドレイン電流I_Dは、ゲート・ソース間電圧V_GSとドレイン・ソース間電圧V_DSの大小関係によって表される式が異なる。nチャネルMOSFETの場合、閾値電圧をV_Tとすると、V_DS＞V_GS−V_T＞0が成り立つ範囲を［㋐］と呼び、そのときのドレイン電流I_Dは、トランスコンダクタンス係数Kを用いて、［㋑］と表される。また、V_DS＝V_GS−V_TとなるV_DSを［㋒］と呼ぶ。」",
    "choices": {
      "ア": "㋐ 非飽和領域 ／ ㋑ I_D＝2K(V_GS−V_T−V_DS/2)V_DS ／ ㋒ ピンチオフ電圧",
      "イ": "㋐ 非飽和領域 ／ ㋑ I_D＝K(V_GS−V_T)² ／ ㋒ 降伏電圧",
      "ウ": "㋐ 非飽和領域 ／ ㋑ I_D＝K(V_GS−V_T)² ／ ㋒ ピンチオフ電圧",
      "エ": "㋐ 飽和領域 ／ ㋑ I_D＝2K(V_GS−V_T−V_DS/2)V_DS ／ ㋒ 降伏電圧",
      "オ": "㋐ 飽和領域 ／ ㋑ I_D＝K(V_GS−V_T)² ／ ㋒ ピンチオフ電圧"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "V_DS＞V_GS−V_T＞0では、ドレイン端がピンチオフして飽和領域となり、理想式ではI_D＝K(V_GS−V_T)²で表される。二つの領域が切り替わるV_DS＝V_GS−V_Tがピンチオフ電圧である。",
    "choiceExplanations": {
      "ア": "V_DSを含むこの式は、ピンチオフ前の非飽和領域に対応する。設問はV_DSが境界V_GS−V_Tより大きい場合を述べているので、飽和領域の式を使う。",
      "イ": "示された電流式は飽和領域の近似として合っている。㋐が非飽和となっており、境界の呼び名も降伏電圧ではなくピンチオフ電圧である。",
      "ウ": "電流式と境界の呼び名は合う。ただしV_DSがV_GS−V_Tを越えるとドレイン側でチャネルがピンチオフして、㋐は飽和領域となる。",
      "エ": "㋐の名称は正しいが、㋑のV_DSを明示的に含む式は非飽和領域のものになる。V_DS＝V_GS−V_Tはチャネルのピンチオフの境界であって、降伏の条件ではない。",
      "オ": "V_DS＞V_GS−V_T＞0では、ドレイン端がピンチオフして飽和領域となり、理想式ではI_D＝K(V_GS−V_T)²で表される。二つの領域が切り替わるV_DS＝V_GS−V_Tがピンチオフ電圧である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q59",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "理想演算増幅器による電流源回路",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、抵抗値R_L［kΩ］の抵抗を流れる電流I_L［mA］として最も妥当なのはどれか。\nただし、R₁、R₃、R₄＝10kΩ、R₂、R₅＝5kΩ、演算増幅器は理想的なものとする。",
    "choices": {
      "ア": "(1/2.5＋1/(15＋R_L))Vᵢ",
      "イ": "Vᵢ/(5＋R_L)",
      "ウ": "Vᵢ/(15＋R_L)",
      "エ": "Vᵢ/2.5",
      "オ": "Vᵢ/5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "負荷電圧をV_L、演算増幅器の入力電圧をvとすると、非反転側の分圧から3v＝Vᵢ＋2V_L、反転側から出力は2vである。負荷へ流れ込む電流の和は(2v−V_L)/5＋(v−V_L)/5＝Vᵢ/5である。",
    "choiceExplanations": {
      "ア": "負荷の節点は、R₅だけでなくR₂を介して入力側ともつながっている。理想演算増幅器の入力電圧の等しさを使って二つの電流を加えると、R_Lに依存する項は消える。",
      "イ": "負荷と5kΩだけを単純な直列として数えると、R₂の電流と増幅器出力の変化が漏れる。二つの枝から負荷へ流れ込む電流を合計するとVᵢ/5になる。",
      "ウ": "15kΩがR_Lと直列に入る構成ではない。負荷端の電位が変わると両入力と出力の電圧も変わり、最終的な負荷電流を求める式ではその電位が相殺される。",
      "エ": "同じ5kΩの二枝が負荷節点に接続されるが、二つの枝の送り側の電位は等しくない。単純な2.5kΩの並列に置き換えず節点電流を足すと、係数は1/5となる。",
      "オ": "負荷電圧をV_L、演算増幅器の入力電圧をvとすると、非反転側の分圧から3v＝Vᵢ＋2V_L、反転側から出力は2vである。負荷へ流れ込む電流の和は(2v−V_L)/5＋(v−V_L)/5＝Vᵢ/5である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q59.webp"
    ],
    "imageAltTexts": [
      "抵抗R₁～R₅と理想演算増幅器で負荷R_Lへ電流を供給する回路図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q60",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "1ビットの大小を区別する比較回路",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、1ビットの入力A、Bの大小関係を判定する比較回路の回路図である。図の㋐、㋑に当てはまる回路素子の組合せとして最も妥当なのはどれか。\nただし、この回路はA＞B、A＜B、A＝Bそれぞれの場合に、いずれか一つの出力のみが1を出力するものとする。",
    "choices": {
      "ア": "㋐ AND、㋑ AND",
      "イ": "㋐ AND、㋑ OR",
      "ウ": "㋐ OR、㋑ AND",
      "エ": "㋐ OR、㋑ OR",
      "オ": "㋐ OR、㋑ NAND"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋐がANDならXはA∧¬B、Zは¬A∧Bで、大小を区別できる。中央二段のA∧Bと¬A∧¬Bを㋑のORで合わせれば、Yは両入力が等しい場合だけ1になる。",
    "choiceExplanations": {
      "ア": "㋐をANDにすると大小に対応するXとZは適切に動く。しかし中央の二つはABと¬A¬Bなので、㋑までANDにすると両方が1になることはなく、等しい場合のYを出力できない。",
      "イ": "㋐がANDならXはA∧¬B、Zは¬A∧Bで、大小を区別できる。中央二段のA∧Bと¬A∧¬Bを㋑のORで合わせれば、Yは両入力が等しい場合だけ1になる。",
      "ウ": "㋐をORにすると、A＝B＝0でも上の入力の組は0と1なのでXが1になる。同じとき下のZも1になり、一つの出力だけという条件に反する。",
      "エ": "㋐をORにした場合、A＝B＝1でもXとZは両方1になる。中央の㋑をORに変えても、XとZが同時に1になる点は解消しない。",
      "オ": "㋑はYだけを変えるので、㋐がORである限りXとZがともに1になる入力が残る。A＝B＝0のときにその問題が起きる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q60.webp"
    ],
    "imageAltTexts": [
      "AとBを入力し、素子㋐・㋑を通じてX、Y、Zを出力する比較回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q61",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "振幅変調の搬送波と上下側帯波",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "振幅変調（AM）に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「搬送波をc(t)＝A_c cos(2πf_c t)、変調波をm(t)＝A_m cos(2πf_m t)とする。ここで、A_cは搬送波振幅、f_cは搬送波周波数、A_mは変調波振幅、f_mは変調波周波数であり、f_c≫f_m≥0を満たすとする。このとき、振幅変調波u(t)は、u(t)＝［㋐］cos(2πf_c t)のように表される。また、振幅変調波u(t)の振幅スペクトルは、搬送波と上側帯波、下側帯波の3本の線スペクトルから成り、上下側帯波の各周波数は［㋑］となる。振幅スペクトルから分かるように、振幅変調では、変調波で表される情報は、［㋒］に乗っている。」",
    "choices": {
      "ア": "㋐ {A_c＋A_m cos(2πf_m t)} ／ ㋑ f_c、f_c−f_m ／ ㋒ 搬送波",
      "イ": "㋐ {A_c＋A_m cos(2πf_m t)} ／ ㋑ f_c＋f_m、f_c−f_m ／ ㋒ 上下側帯波",
      "ウ": "㋐ {A_c＋A_m cos(2πf_m t)} ／ ㋑ f_c＋f_m、f_c ／ ㋒ 搬送波",
      "エ": "㋐ A_c A_m cos(2πf_m t) ／ ㋑ f_c、f_c−f_m ／ ㋒ 上下側帯波",
      "オ": "㋐ A_c A_m cos(2πf_m t) ／ ㋑ f_c＋f_m、f_c−f_m ／ ㋒ 上下側帯波"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "搬送波の振幅にA_c＋m(t)を使い、余弦同士の積を和に直すとf_c±f_mに側帯波が現れる。変調波の情報はその側帯波に反映され、f_cの線は無変調の搬送波に対応する。",
    "choiceExplanations": {
      "ア": "変調項と搬送波の余弦の積を和に直すと、周波数の差と和ができる。f_cは搬送波なので、上側帯波はf_cではなくf_c＋f_mである。",
      "イ": "搬送波の振幅にA_c＋m(t)を使い、余弦同士の積を和に直すとf_c±f_mに側帯波が現れる。変調波の情報はその側帯波に反映され、f_cの線は無変調の搬送波に対応する。",
      "ウ": "上側帯波はf_c＋f_mだが、下側帯波はf_c−f_mになる。f_cの成分は変調波に依存しない定数A_cによるので、情報の位置にも当たらない。",
      "エ": "㋐のように定数項を含まないと、変調波との積は和周波と差周波だけになり、独立した搬送波成分が消える。㋑のうちf_cを上側帯波としている点も誤りである。",
      "オ": "側帯波の周波数と情報の位置は合っているが、㋐には無変調の搬送波を生じる定数A_cが必要である。設問の3本の線スペクトルを得るには、振幅を定数と変調波の和にする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q62",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "一様量子化誤差とコンパンディング",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "アナログ信号の量子化に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「振幅Aが−A_m≤A≤A_mのアナログ信号を、量子化ステップ数Mで線形量子化（均一量子化、一様量子化とも呼ぶ。）すると、量子化誤差（元のアナログ信号と量子化後の信号の差）は、最大で［㋐］となる。線形量子化は、アナログ信号の振幅が小さいとき、入力信号対量子化雑音電力比（SN比）が劣化する。このようなSN比の劣化の対策として、送信側で［㋑］のような特性をもつ圧縮器を通した後に線形量子化を行い、受信側で［㋒］のような特性をもつ伸張器を適用することがある。これをコンパンディングと呼ぶ。」",
    "choices": {
      "ア": "㋐ 2A_m/M ／ ㋑ 図Ⅰ ／ ㋒ 図Ⅱ",
      "イ": "㋐ A_m/M ／ ㋑ 図Ⅰ ／ ㋒ 図Ⅱ",
      "ウ": "㋐ A_m/M ／ ㋑ 図Ⅱ ／ ㋒ 図Ⅰ",
      "エ": "㋐ A_m/(2M) ／ ㋑ 図Ⅰ ／ ㋒ 図Ⅱ",
      "オ": "㋐ A_m/(2M) ／ ㋑ 図Ⅱ ／ ㋒ 図Ⅰ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一様量子化は幅2A_mをM区間に分け、区間中央への丸めなので誤差は最大A_m/Mである。図Ⅱは原点付近の傾きが大きく、小信号を量子化前に広い範囲へ割り当てるため、受信側では逆特性の図Ⅰを使う。",
    "choiceExplanations": {
      "ア": "2A_m/Mは量子化区間の幅である。区間の中心値に丸める一様量子化では、最大誤差はその半分のA_m/Mとなる。",
      "イ": "最大誤差A_m/Mは正しい。小振幅の分解能を上げる送り側には原点付近の傾きが大きい図Ⅱ、受け側にはそれを戻す図Ⅰを使う。",
      "ウ": "一様量子化は幅2A_mをM区間に分け、区間中央への丸めなので誤差は最大A_m/Mである。図Ⅱは原点付近の傾きが大きく、小信号を量子化前に広い範囲へ割り当てるため、受信側では逆特性の図Ⅰを使う。",
      "エ": "量子化の幅を求めるには正側だけのA_mではなく、負側から正側までの長さ2A_mをMで割る。半ステップの誤差はA_m/(2M)にはならない。",
      "オ": "送信側が図Ⅱ、受信側が図Ⅰなのは妥当である。誤差は区間幅2A_m/Mの半分なので、A_m/(2M)より大きいA_m/Mである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q62.webp"
    ],
    "imageAltTexts": [
      "図Ⅰと図Ⅱの非線形入出力特性。図Ⅰは原点付近が緩やかで、図Ⅱは急である"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-digital-q63",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "一意復号可能な符号と接頭語条件",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "符号に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「次のうち、一意復号可能な符号は［㋐］である。\nまた、一意復号可能であることは、瞬時復号可能であるための［㋑］である。」",
    "choices": {
      "ア": "㋐ 符号1、符号2、符号3 ／ ㋑ 必要条件",
      "イ": "㋐ 符号1、符号2、符号3 ／ ㋑ 十分条件",
      "ウ": "㋐ 符号1、符号2、符号4 ／ ㋑ 必要条件",
      "エ": "㋐ 符号1、符号3、符号4 ／ ㋑ 十分条件",
      "オ": "㋐ 符号1、符号3、符号4 ／ ㋑ 必要条件"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "符号1と3には他の語の先頭に当たる符号語がなく、符号2には他の語の末尾に当たる符号語がないため、いずれも一意に復号できる。瞬時に復号できるなら一意に復号できるので、㋑は必要条件である。",
    "choiceExplanations": {
      "ア": "符号1と3には他の語の先頭に当たる符号語がなく、符号2には他の語の末尾に当たる符号語がないため、いずれも一意に復号できる。瞬時に復号できるなら一意に復号できるので、㋑は必要条件である。",
      "イ": "符号1、2、3の組は妥当である。しかし符号2では10が100の接頭語で、左からの瞬時復号はできないため、一意復号だけでは十分でない。",
      "ウ": "一意復号可能であることは瞬時復号の必要条件である。ただし符号4では101を一つの符号語とも「1、01」の連結とも読めるので、符号4は一意復号できない。",
      "エ": "符号4には101の二通りの読みがある。さらに符号2が示すように一意復号できても最初の符号語の終端を即座に決められない場合があるので、㋑も合わない。",
      "オ": "㋑の必要条件は妥当である。㋐は、末尾から一意に読める符号2を含め、101の分割に曖昧さがある符号4を除く必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016301.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-digital/q63.webp"
    ],
    "imageAltTexts": [
      "四つの符号のc₁からc₄までの符号語を比較した公式表"
    ]
  }
];
