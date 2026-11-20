import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2026_SENMON_DIGITAL: Question[] = [
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q01",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角方程式",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "0 ≦ θ ＜ 2π のとき、方程式 2cos²θ＋sin θ－1＝0 を満たすθの個数はいくつあるか。",
    "choices": {
      "ア": "0",
      "イ": "1",
      "ウ": "2",
      "エ": "3",
      "オ": "4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "cos²θ＝1－sin²θを代入すると、sin θ＝1またはsin θ＝－1/2となる。前者の解は一つ、後者の解は二つなので、合計は3個である。",
    "choiceExplanations": {
      "ア": "s＝sin θとすると、式は（1－s）（2s＋1）＝0になる。s＝1とs＝－1/2はどちらも正弦の値域に入るので、解は存在する。",
      "イ": "sin θ＝1だけを見るとθ＝π/2の一つである。因数分解するとsin θ＝－1/2も得られ、解を追加する必要がある。",
      "ウ": "sin θ＝－1/2は区間内で二つの解を持つ。これにsin θ＝1となるθ＝π/2を加える。",
      "エ": "cos²θ＝1－sin²θを代入すると、sin θ＝1またはsin θ＝－1/2となる。前者の解は一つ、後者の解は二つなので、合計は3個である。",
      "オ": "正弦が－1/2となる角は二つあるが、正弦が1となる角は一つだけである。両方を二つずつと数えると最大値を取る角を重複してしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q02",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "正四面体の体積",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "一辺の長さが1の正四面体の体積はいくらか。",
    "choices": {
      "ア": "√2/12",
      "イ": "√3/12",
      "ウ": "√2/6",
      "エ": "√3/6",
      "オ": "√3/4"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "底面積は√3/4で、底面の重心から頂点までの高さは√(2/3)である。これらを掛けて3で割ると、体積は√2/12になる。",
    "choiceExplanations": {
      "ア": "底面積は√3/4で、底面の重心から頂点までの高さは√(2/3)である。これらを掛けて3で割ると、体積は√2/12になる。",
      "イ": "√3/12は、底面積√3/4に高さ1を掛けて3で割った値である。実際の高さは、底面の重心と頂点の位置関係から√(2/3)となる。",
      "ウ": "√2/6は求める体積の2倍である。高さを求めて底面積と掛けた後、三角錐の体積の公式に従って3で割る。",
      "エ": "√3/6は底面積に2/3を掛けた値であり、体積には三角錐の高さと係数1/3が必要である。高さは√(2/3)なので値は√2/12になる。",
      "オ": "√3/4は底面である正三角形の面積である。体積を求めるにはこれに高さを掛け、三角錐なので3で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q02.webp"
    ],
    "imageAltTexts": [
      "一辺の長さが1の正四面体"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q03",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三角関数の極限",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "x→0 のときの 2x sin x /（1－cos x）の極限はいくらか。",
    "choices": {
      "ア": "0",
      "イ": "1/2",
      "ウ": "1",
      "エ": "2",
      "オ": "4"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "分子と分母に1＋cos xを掛けると、与式は2（1＋cos x）x/sin xになる。1＋cos x→2、x/sin x→1なので、極限は4である。",
    "choiceExplanations": {
      "ア": "分子と分母はともに0に近づくため、分子が0に近づくことだけでは極限は決まらない。分母はx²/2、分子は2x²に近いので極限は4である。",
      "イ": "1/2は（1－cos x）/x² の極限であり、与式ではこの項が分母に来る。分子の2 sin x/x の極限は2なので、その比は4になる。",
      "ウ": "sin x/x の極限は1だが、与式には2と分母の変換から生じる1＋cos xも掛かる。この二つの因子はどちらも2に近づく。",
      "エ": "分子分母に1＋cos xを掛けると、2（1＋cos x）x/sin x となる。x/sin xが1、1＋cos xが2に近づくため、極限は2ではなく4である。",
      "オ": "分子と分母に1＋cos xを掛けると、与式は2（1＋cos x）x/sin xになる。1＋cos x→2、x/sin x→1なので、極限は4である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q04",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "放物線で囲まれる面積",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "放物線 y＝－x²＋9 及びx軸で囲まれた領域の面積が、y＝－x²＋9 及び直線 y＝a で囲まれた領域の面積の8倍であるとき、定数aの値はいくらか。",
    "choices": {
      "ア": "49/8",
      "イ": "27/4",
      "ウ": "15/2",
      "エ": "8",
      "オ": "9"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "頂点から直線までの高さをhとすると、囲まれる面積は h^(3/2) に比例する。8倍の面積差は高さの比4倍に対応するから、9－a＝9/4よりa＝27/4である。",
    "choiceExplanations": {
      "ア": "a＝49/8を代入すると、放物線の頂点と直線の高さの差は23/8になる。面積比が8となるために必要な高さの差は9/4である。",
      "イ": "頂点から直線までの高さをhとすると、囲まれる面積は h^(3/2) に比例する。8倍の面積差は高さの比4倍に対応するから、9－a＝9/4よりa＝27/4である。",
      "ウ": "a＝15/2では高さの差が3/2になり、面積の比は（9÷(3/2)）^(3/2)で8を超える。必要な差は9/4である。",
      "エ": "a＝8では頂点と直線の高さの差が1である。x軸の場合の高さ9との比から、面積比は9^(3/2)＝27となる。",
      "オ": "a＝9では直線は放物線の頂点に接していて、囲まれる領域の面積は0になる。この場合には有限の面積比8は得られない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q04.webp"
    ],
    "imageAltTexts": [
      "放物線とx軸及び直線y＝aの位置関係"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q05",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "扇形の面積の最大化",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "円弧と2つの半径を合計した一周の長さが16の扇形のうち、その面積が最大となるものの半径及び面積の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "4／16",
      "イ": "4／20",
      "ウ": "4／32",
      "エ": "6／16",
      "オ": "6／20"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "半径rのとき円弧の長さは16－2rなので、面積はr（16－2r）/2＝16－（r－4）²である。したがって半径4のとき面積16が最大となる。",
    "choiceExplanations": {
      "ア": "半径rのとき円弧の長さは16－2rなので、面積はr（16－2r）/2＝16－（r－4）²である。したがって半径4のとき面積16が最大となる。",
      "イ": "半径4では円弧の長さが8になる。扇形の面積は半径と円弧の長さの積の半分なので、面積は20ではなく16である。",
      "ウ": "半径4と円弧の長さ8を掛けると32になるが、面積の計算では積を2で割る。求める値は16である。",
      "エ": "半径6では円弧の長さは4で、面積は6×4÷2＝12にとどまる。最大値16は半径4のときに得られる。",
      "オ": "半径6では円弧が4しかないので、面積は12である。面積を16－（r－4）²と表せば、半径を4から離すと面積は減少する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q06",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "対数方程式",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "4log₄(3x＋2y)＝log₂(2x)＋log₂(3y)＋2 のとき、12xy /（6x²＋2xy＋y²）はいくらか。",
    "choices": {
      "ア": "3/4",
      "イ": "1",
      "ウ": "36/35",
      "エ": "4/3",
      "オ": "8/5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "底を2にそろえて整理すると（3x＋2y）²＝24xy、すなわち（3x－2y）²＝0になる。x：y＝2：3を与式に代入すると72/45＝8/5である。",
    "choiceExplanations": {
      "ア": "底を2にそろえると（3x＋2y）²＝24xyとなり、3x＝2yを得る。x＝2、y＝3と置けば、分子は72、分母は45なので3/4ではない。",
      "イ": "分子と分母が等しいかは、対数の式から得るxとyの比で確かめられる。x：y＝2：3では分子72に対して分母45なので、1より大きい。",
      "ウ": "比が同じなら式の値は変わらないため、3x＝2yからx＝2、y＝3を使える。分母には6x²に加えて2xyとy²があり、合計は35ではなく45になる。",
      "エ": "対数の両辺をまとめると（3x－2y）²＝0になる。その比を分数に代入すると72/45＝8/5であり、4/3ではない。",
      "オ": "底を2にそろえて整理すると（3x＋2y）²＝24xy、すなわち（3x－2y）²＝0になる。x：y＝2：3を与式に代入すると72/45＝8/5である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q07",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二項定理",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "Σ（k＝0～9） ₉Cₖ はいくらか。",
    "choices": {
      "ア": "510",
      "イ": "511",
      "ウ": "512",
      "エ": "513",
      "オ": "514"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二項定理で（1＋1）⁹を展開すると、k＝0～9の二項係数の和がそのまま得られる。したがって2⁹＝512である。",
    "choiceExplanations": {
      "ア": "二項係数の総和は、要素数9の集合の部分集合をすべて数えた値である。空集合と全体集合も含むので2⁹＝512となる。",
      "イ": "511は空集合など一つの部分集合を除いた数である。和にはk＝0からk＝9までのすべてが入る。",
      "ウ": "二項定理で（1＋1）⁹を展開すると、k＝0～9の二項係数の和がそのまま得られる。したがって2⁹＝512である。",
      "エ": "部分集合を作るとき、9要素について入れるかどうかを一回ずつ決める。2⁹＝512で全てを数え終えており、さらに1を加える必要はない。",
      "オ": "二項定理の展開には端の₉C₀と₉C₉も含まれている。この二つを512に再び足すと二重に数えることになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q08",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "確率漸化式",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "△ABCの各頂点を1秒ごとに移動する点Pがある。ある頂点にいるPが、1秒後に他の2頂点のいずれかに移動する確率はそれぞれ2/5であり、1秒後に同じ頂点にとどまる確率は1/5である。最初、Pが頂点Aにいたとすると、それからn秒後にPがAにいる確率として正しいのはどれか。\nただし、nは自然数とする。",
    "choices": {
      "ア": "(1/15)(－1/15)^(n－1)＋1/3",
      "イ": "(2/3)(－1/5)^n＋1/3",
      "ウ": "(1/3)(1/5)^n＋2/15",
      "エ": "(1/15)(－1/3)^(n－1)＋2/15",
      "オ": "(1/15)(1/3)^(n－1)＋2/15"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "n秒後の確率をpₙとすると、pₙ₊₁＝pₙ/5＋2(1－pₙ)/5なので pₙ₊₁－1/3＝－(pₙ－1/3)/5 である。p₀＝1から、pₙ＝1/3＋(2/3)(－1/5)^nを得る。",
    "choiceExplanations": {
      "ア": "n＝1を代入すると2/5になり、Aにとどまる確率1/5に一致しない。Aにいる確率が平衡値1/3からずれる量は毎回－1/5倍になる。",
      "イ": "n秒後の確率をpₙとすると、pₙ₊₁＝pₙ/5＋2(1－pₙ)/5なので pₙ₊₁－1/3＝－(pₙ－1/3)/5 である。p₀＝1から、pₙ＝1/3＋(2/3)(－1/5)^nを得る。",
      "ウ": "n＝1では1/5になるが、nを大きくすると値は2/15に近づく。三頂点が対等なので、実際の確率は1/3に近づく。",
      "エ": "n＝1では1/5になるが、nを増やすと2/15に近づく。確率の漸化式 pₙ₊₁＝2/5－pₙ/5 の平衡値は1/3である。",
      "オ": "n＝1では値が一致するが、漸化式で平衡値との差に掛かる比は1/3ではなく－1/5である。nを増やすと選択肢は誤った平衡値2/15に近づく。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q09",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "基数変換",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "2進数で表された次の数を5進数で表したものとして正しいのはどれか。\n\n1110101",
    "choices": {
      "ア": "341",
      "イ": "343",
      "ウ": "432",
      "エ": "441",
      "オ": "443"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "1110101₂＝64＋32＋16＋4＋1＝117である。117＝4×25＋3×5＋2だから、5進数では432になる。",
    "choiceExplanations": {
      "ア": "5進数341は十進数で3×25＋4×5＋1＝96である。与えられた2進数は64＋32＋16＋4＋1＝117になる。",
      "イ": "5進数343を展開すると75＋20＋3＝98である。1110101₂は十進数117なので一致しない。",
      "ウ": "1110101₂＝64＋32＋16＋4＋1＝117である。117＝4×25＋3×5＋2だから、5進数では432になる。",
      "エ": "5進数441は100＋20＋1＝121になる。117を5で割った余りは2なので、5進表示の一の位は1にならない。",
      "オ": "5進数443は100＋20＋3＝123である。117を25で割った余り17は3×5＋2と表せるので、末尾2桁は32になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q10",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "直列につないだばね",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "上端が天井に固定された、ばねA（ばね定数k）と、二つのばねB₁（ばね定数k₁）、B₂（ばね定数k₂）を直列につないだばねBがある。また、AとBは自然長が等しい。\n図のように、A、Bの下端に質量3m、2mの小物体を取り付けたところ、A、Bの伸びは等しくなった。このとき、k、k₁、k₂の間に成り立つ関係として最も妥当なのはどれか。\nただし、ばねの質量は無視できるものとする。",
    "choices": {
      "ア": "2/k＝3/k₁＋3/k₂",
      "イ": "3/k＝2/k₁＋2/k₂",
      "ウ": "k＝k₁＋k₂",
      "エ": "2k＝3k₁＋3k₂",
      "オ": "3k＝2k₁＋2k₂"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Aの伸びは3mg/kで、Bは直列なので伸びの合計が2mg/k₁＋2mg/k₂になる。両者を等しく置き、mgで割ると3/k＝2/k₁＋2/k₂である。",
    "choiceExplanations": {
      "ア": "Aが受ける力は3mg、Bの各ばねが受ける力は2mgである。力に対応する係数3と2を逆に置いている。",
      "イ": "Aの伸びは3mg/kで、Bは直列なので伸びの合計が2mg/k₁＋2mg/k₂になる。両者を等しく置き、mgで割ると3/k＝2/k₁＋2/k₂である。",
      "ウ": "ばね定数が単純に足し合わされるのは、同じ伸びをするばねを並列につないだ場合である。直列では各ばねの伸びが加わるため、逆数を足す。",
      "エ": "AとBの伸びは力をばね定数で割って求める。直列のBは2mg/k₁＋2mg/k₂となるため、ばね定数をそのまま加える式は使えない。",
      "オ": "質量の違いから係数3と2は現れるが、それらが掛かるのはばね定数の逆数である。直列の二つのばねは、どちらも2mgで引かれる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q10.webp"
    ],
    "imageAltTexts": [
      "ばねAに質量3m、直列ばねBに質量2mを付けた配置"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q11",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "パスカルの原理",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "大気中で、図のように、断面積がそれぞれS₁、S₂の二つの容器を管で連結して液体を入れ、二つの滑らかに動く軽いピストンを介して液体に力を作用させられるように密封した。断面積S₁のピストンに大きさF₁の力を、断面積S₂のピストンに大きさF₂の力をそれぞれ加えたところ、二つのピストンは同じ高さで静止した。このとき、F₂として最も妥当なのはどれか。",
    "choices": {
      "ア": "F₁",
      "イ": "(S₁/S₂)F₁",
      "ウ": "(S₂/S₁)F₁",
      "エ": "[S₁/(S₁＋S₂)]F₁",
      "オ": "[S₂/(S₁＋S₂)]F₁"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "連結した液体の同じ高さでは圧力が等しく、外側の大気圧も共通である。したがってF₁/S₁＝F₂/S₂であり、F₂＝(S₂/S₁)F₁となる。",
    "choiceExplanations": {
      "ア": "二つのピストンの高さが同じなら、等しいのは液体が受ける圧力である。力は面積に比例するため、F₂＝F₁となるのはS₁＝S₂の場合に限られる。",
      "イ": "F₁/S₁＝F₂/S₂をF₂について解くと、面積比はS₂/S₁の向きになる。面積の大きいピストンには、その分だけ大きな力が必要である。",
      "ウ": "連結した液体の同じ高さでは圧力が等しく、外側の大気圧も共通である。したがってF₁/S₁＝F₂/S₂であり、F₂＝(S₂/S₁)F₁となる。",
      "エ": "圧力はそのピストンにかかる力を、そのピストンの断面積で割った値である。左側に力F₁がかかるとき、その圧力の算出に両方の断面積を足す必要はない。",
      "オ": "左のピストンが液体に加える圧力はF₁/S₁である。この圧力を右の面積S₂に掛けるため、分母はS₁＋S₂ではなくS₁となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q11.webp"
    ],
    "imageAltTexts": [
      "断面積S₁とS₂のピストンで連結容器の液体を押す配置"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q12",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "円弧の運動と斜方投射",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、点Oを中心とした半径rで∠AOB＝120°の円弧の形をした滑らかな円筒面をもつ台が、水平面に接して固定された。点Aは水平面からの高さがrの位置にあり、ここから小球を静かに放すと、小球は台上を滑り落ち、点Bで台から飛び出した。このとき、小球が台から飛び出した後に達する最高点の水平面からの高さhとして最も妥当なのはどれか。",
    "choices": {
      "ア": "[(8－3√3)/8]r",
      "イ": "[(7－2√3)/8]r",
      "ウ": "r/2",
      "エ": "[(8－√3)/8]r",
      "オ": "7r/8"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "点Bの高さは（1－√3/2）rで、落差から点Bでの速さはv²＝√3grとなる。接線は水平から30°なので、その後の上昇はv²sin²30°/(2g)＝√3r/8となり、合計は（8－3√3）r/8である。",
    "choiceExplanations": {
      "ア": "点Bの高さは（1－√3/2）rで、落差から点Bでの速さはv²＝√3grとなる。接線は水平から30°なので、その後の上昇はv²sin²30°/(2g)＝√3r/8となり、合計は（8－3√3）r/8である。",
      "イ": "放出前の落差は√3r/2である。放出後に高さへ変わるのは鉛直方向の運動エネルギーであり、速さの鉛直成分の二乗は全体の1/4になる。",
      "ウ": "点Bの位置と接線の傾きは∠AOB＝120°から決まる。点Bの高さに鉛直速度による上昇分√3r/8を加えると、r/2にはならない。",
      "エ": "点Bでの速さの鉛直成分は全体の1/2である。上昇の計算で必要なのはその二乗のため、放出時の運動エネルギーの1/4が高さに変わる。",
      "オ": "最高点でも水平方向の速度が残るため、落下で得た運動エネルギーの全てが位置エネルギーに戻るわけではない。点Bの高さからの上昇分は√3r/8である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q12.webp"
    ],
    "imageAltTexts": [
      "円弧の点Bを離れる小球と水平面から測る最高点h"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q13",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "非弾性衝突",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、滑らかで水平な床の上を、質量mの二つの小物体がそれぞれ同じ向きに速さv₁、v₂（v₁＞v₂）で等速直線運動した後、これら二つの小物体が衝突した。衝突後、図Ⅱのように、一体となって運動したとき、衝突によって失われた運動エネルギーの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0",
      "イ": "(m/4)(v₁²－v₂²)",
      "ウ": "(m/2)(v₁²－v₂²)",
      "エ": "(m/4)(v₁－v₂)²",
      "オ": "(m/2)(v₁－v₂)²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "運動量保存より合体後の速さは（v₁＋v₂）/2である。衝突前の（m/2）（v₁²＋v₂²）から衝突後の（m/4）（v₁＋v₂）²を引くと（m/4）（v₁－v₂）²になる。",
    "choiceExplanations": {
      "ア": "一体となる衝突では運動量は保存されるが、運動エネルギーの一部は変形や熱などに移る。速さが異なるので失われる運動エネルギーは0より大きい。",
      "イ": "衝突後の一体の速さは（v₁＋v₂）/2である。衝突前後のエネルギー差を整理すると、速さの二乗の差ではなく、速さの差の二乗が現れる。",
      "ウ": "衝突前の二物体のエネルギーは（m/2）（v₁²＋v₂²）である。そこから質量2mの合体した物体の運動エネルギーを引くため、この式のように二物体の衝突前の値を引き合うわけではない。",
      "エ": "運動量保存より合体後の速さは（v₁＋v₂）/2である。衝突前の（m/2）（v₁²＋v₂²）から衝突後の（m/4）（v₁＋v₂）²を引くと（m/4）（v₁－v₂）²になる。",
      "オ": "合体後の速度には二つの速さの平均が入る。合体後のエネルギーを差し引くと、速さの差の二乗に掛かる係数はm/2ではなくm/4である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q13.webp"
    ],
    "imageAltTexts": [
      "衝突前の二つの小物体と衝突後に一体となった物体"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q14",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "光電効果",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "光電効果に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「金属に光を当てると電子が飛び出す現象を、光電効果という。当てる光の［㋐］を増すと、飛び出す電子の［㋑］が増える。一方、当てる光の［㋒］を増すと、飛び出す電子の［㋓］が増える。また、当てる光の［㋒］がある値よりも小さいと、光電効果は起こらなくなる。」",
    "choices": {
      "ア": "振動数／運動エネルギーの最大値／強さ（光子の数）／数",
      "イ": "振動数／数／強さ（光子の数）／運動エネルギーの最大値",
      "ウ": "強さ（光子の数）／運動エネルギーの最大値／振動数／数",
      "エ": "強さ（光子の数）／運動エネルギーの最大値／波長／数",
      "オ": "強さ（光子の数）／数／振動数／運動エネルギーの最大値"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "光子の数を増やすと放出電子数が増え、振動数を上げると最大運動エネルギーhν－Wが増える。振動数がしきい値W/hに届かなければ、光子数を増やしても光電効果は起きない。",
    "choiceExplanations": {
      "ア": "振動数と最大エネルギー、光の強さと電子数という二組の関係は合っている。最後の文にある下限が存在するのは光の強さではなく振動数であるため、㋒には振動数が入る。",
      "イ": "光子の数を増やすと放出電子の数が増える。電子一個の最大エネルギーは光子一個のエネルギーhνと仕事関数の差で決まる。",
      "ウ": "強さを増すと放出される電子数が増える。振動数を増すと各光子のエネルギーが大きくなり、光電子の最大運動エネルギーが増える。",
      "エ": "光子一個のエネルギーは波長が長いほど小さい。下限があるのは振動数であり、振動数が仕事関数をプランク定数で割った値未満だと電子が放出されない。",
      "オ": "光子の数を増やすと放出電子数が増え、振動数を上げると最大運動エネルギーhν－Wが増える。振動数がしきい値W/hに届かなければ、光子数を増やしても光電効果は起きない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q15",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "単振り子",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、小球を長さLの糸に取り付けて天井からつるし、糸がたるまないようにしながら、鉛直線と角θをなす状態で支える。いま、小球を静かに放すとき、鉛直線上を小球が初めて通るまでの時間として最も妥当なのはどれか。\nただし、重力加速度の大きさをgとする。また、θは十分に小さく、sin θ≒θと近似できるものとする。",
    "choices": {
      "ア": "(π/4)√(L/g)",
      "イ": "(π/2)√(L/g)",
      "ウ": "(π/4)√(g/L)",
      "エ": "(π/2)√(g/L)",
      "オ": "π√(g/L)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "微小振動では単振り子の角振動数は√(g/L)で、周期は2π√(L/g)になる。振幅の端で静かに放して平衡位置へ初めて達するまでの時間は周期の1/4なので（π/2）√(L/g)である。",
    "choiceExplanations": {
      "ア": "周期2π√(L/g)のうち、端から中央までの時間は1/4周期である。π/4を掛けた値は1/8周期なので短すぎる。",
      "イ": "微小振動では単振り子の角振動数は√(g/L)で、周期は2π√(L/g)になる。振幅の端で静かに放して平衡位置へ初めて達するまでの時間は周期の1/4なので（π/2）√(L/g)である。",
      "ウ": "√(g/L)は角振動数で、単位は時間の逆数である。時間を求めるにはこの逆数を用い、周期の1/4を取る。",
      "エ": "π/2の係数は周期の4分の1に対応する。時間の単位を持つのは角振動数の逆数√(L/g)である。",
      "オ": "√(g/L)は角振動数なので時間ではない。また、角振動数の逆数にπを掛けた時間は端から反対の端までの半周期である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q15.webp"
    ],
    "imageAltTexts": [
      "長さLの糸でつった小球を鉛直から角θだけずらした状態"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q16",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ヤングの干渉実験",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ヤングの実験に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図のように、単スリットS₀と複スリットS₁、S₂を設置した。S₁とS₂の間隔はd、複スリットからスクリーンまでの距離はlである。\nS₀の左側から単色光をS₀に通すと、光は［㋐］により広がる。その後、S₁、S₂それぞれから出た光は、［㋑］によりスクリーン上に明暗の縞模様をつくる。単色光の波長をλとすると、隣り合う明線の間隔は［㋒］である。\nただし、スクリーンの中央Oから距離xの位置にある点をPとし、xとdはlに比べて十分に小さく、S₁PとS₂Pの距離の差は(d/l)xとみなせるものとする。」",
    "choices": {
      "ア": "回折／干渉／lλ/d",
      "イ": "回折／干渉／dλ/l",
      "ウ": "回折／散乱／dλ/l",
      "エ": "屈折／干渉／lλ/d",
      "オ": "屈折／散乱／dλ/l"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "狭いスリットの後で光が広がるのは回折であり、二つの光の重なりで縞ができるのは干渉である。光路差(d/l)xが波長λだけ変わるごとに明線ができるので、明線間隔はlλ/dである。",
    "choiceExplanations": {
      "ア": "狭いスリットの後で光が広がるのは回折であり、二つの光の重なりで縞ができるのは干渉である。光路差(d/l)xが波長λだけ変わるごとに明線ができるので、明線間隔はlλ/dである。",
      "イ": "回折と干渉の選択は妥当である。光路差の変化をλと置くと(d/l)Δx＝λなので、縞間隔はdλ/lではなくlλ/dになる。",
      "ウ": "S₀での広がりは回折である。縞は、S₁とS₂からの光がおのおのの位相によって強め合い、弱め合う干渉によって生じる。",
      "エ": "縞の原因と間隔は妥当である。スリットの後で光が広がるのは媒質の境界での屈折ではなく、狭い開口部での回折である。",
      "オ": "スリットを通った後の広がりは回折、縞模様を生む重なりは干渉である。隣り合う明線の光路差の増分がλなので、間隔はlλ/dになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q16.webp"
    ],
    "imageAltTexts": [
      "スリットS₀・S₁・S₂からスクリーン上の点Pまでの配置"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q17",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "単原子理想気体の定圧変化",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "物質量1 mol、体積V、圧力Pの単原子分子理想気体を、圧力を一定に保ったまま、体積が4Vになるまで、準静的に変化させた。このとき、気体が吸収した正味の熱量として最も妥当なのはどれか。",
    "choices": {
      "ア": "－3PV",
      "イ": "－(3/2)PV",
      "ウ": "(3/2)PV",
      "エ": "(9/2)PV",
      "オ": "(15/2)PV"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "内部エネルギーの増加は(3/2)P(4V－V)＝(9/2)PVである。定圧での膨張仕事P(4V－V)＝3PVを加えると、吸収熱は(15/2)PVになる。",
    "choiceExplanations": {
      "ア": "気体は膨張して外部に3PVの仕事をし、定圧なので温度も上昇する。したがって外にする仕事と内部エネルギーの増加の両方をまかなう正の熱を吸収する。",
      "イ": "体積が定圧で4倍になると絶対温度が4倍になり、内部エネルギーは増える。熱は内部エネルギーの増加と気体の膨張仕事の合計になるので、負にはならない。",
      "ウ": "(3/2)PVは変化前の内部エネルギーである。求める熱量では初期値そのものではなく、内部エネルギーの増加と膨張仕事を計算する。",
      "エ": "(9/2)PVは内部エネルギーの増加である。膨張仕事3PVも気体が吸収する熱から供給されるので、これを足す必要がある。",
      "オ": "内部エネルギーの増加は(3/2)P(4V－V)＝(9/2)PVである。定圧での膨張仕事P(4V－V)＝3PVを加えると、吸収熱は(15/2)PVになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q18",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "磁界中の電流に働く力",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、磁束密度の大きさBの一様な磁界中に、質量が無視できる長さLの導体が、磁界の向きと角度θをなすように、紙面に平行に置かれている。この導体に、図に示す向きに大きさIの電流を流すとき、この導体に働く力の大きさとその向きの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "IBL／紙面に垂直で表から裏へ向かう向き",
      "イ": "IBL sin θ／紙面に垂直で表から裏へ向かう向き",
      "ウ": "IBL sin θ／紙面に垂直で裏から表へ向かう向き",
      "エ": "IBL cos θ／紙面に垂直で表から裏へ向かう向き",
      "オ": "IBL cos θ／紙面に垂直で裏から表へ向かう向き"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "力の大きさは外積からIBL sin θになる。電流の上向き成分と右向きの磁界の外積は紙面の奥を向くので、力は表から裏へ向かう。",
    "choiceExplanations": {
      "ア": "表から裏へ向かう向きは合っている。導体と磁界が直交する場合に力はIBLとなり、角度θの場合は磁界に垂直な成分に応じて減る。",
      "イ": "力の大きさは外積からIBL sin θになる。電流の上向き成分と右向きの磁界の外積は紙面の奥を向くので、力は表から裏へ向かう。",
      "ウ": "磁界に垂直な成分によって、大きさはIBL sin θとなる。電流方向を磁界方向に回す右ねじの向きは紙面の奥である。",
      "エ": "向きは紙面の奥で合っているが、力を生むのは磁界に垂直な電流成分である。平行成分に対応するcos θではなくsin θを使う。",
      "オ": "磁界に平行な成分は力を受けないので、力の大きさはIBL sin θになる。図の電流と磁界で外積を取ると向きも表から裏である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q18.webp"
    ],
    "imageAltTexts": [
      "右向きの磁界Bと右斜め上へ流れる電流Iのなす角θ"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q19",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "並列抵抗の合成",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、図に示す電流の大きさIの値として最も妥当なのはどれか。",
    "choices": {
      "ア": "5/3 A",
      "イ": "10/3 A",
      "ウ": "25/3 A",
      "エ": "10 A",
      "オ": "55/3 A"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "抵抗を含まない導線で結ばれた点は同電位なので、三つの抵抗は並列である。枝電流の和は10/1＋10/2＋10/3＝55/3 Aとなる。",
    "choiceExplanations": {
      "ア": "5/3 Aは三つの抵抗を直列とみなしたときの10/6 Aに等しい。図では抵抗の両端が二つの接続点にまたがっているため、それぞれに電源の10 Vがかかる。",
      "イ": "10/3 Aは3 Ωに分かれる電流である。電源の電流Iには、1 Ωと2 Ωを流れる電流も含まれる。",
      "ウ": "25/3 Aは2 Ωと3 Ωに流れる5 Aと10/3 Aの和である。さらに1 Ωを流れる10 Aが加わる。",
      "エ": "10 Aは1 Ωを流れる電流に等しい。2 Ωと3 Ωの枝も電源に並列につながっているので、電源電流はこれより大きい。",
      "オ": "抵抗を含まない導線で結ばれた点は同電位なので、三つの抵抗は並列である。枝電流の和は10/1＋10/2＋10/3＝55/3 Aとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q19.webp"
    ],
    "imageAltTexts": [
      "10 V電源に1 Ω、2 Ω、3 Ωを並列接続したひし形の回路"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q20",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "コンデンサの電位",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、電圧21 Vの直流電源、静電容量0.5 μF、1 μFのコンデンサ及びスイッチSを接続した回路において、スイッチSを閉じて十分に時間が経過した後のAB間の電位差の大きさとして最も妥当なのはどれか。\nただし、コンデンサに初め電荷は蓄えられていなかったものとする。\nなお、図Ⅱのように、スイッチSを閉じて十分に時間が経過した後の各コンデンサに蓄えられる電気量をQ₁、Q₂、Q₃、Q₄、Q₅とするとき、Q₁＝Q₃、Q₂＝Q₄となることを用いてもよい。",
    "choices": {
      "ア": "0 V",
      "イ": "1 V",
      "ウ": "2 V",
      "エ": "3 V",
      "オ": "4 V"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "右側を0 Vとすると、AとBの電荷保存より2.5V_A－V_B＝21、2.5V_B－V_A＝10.5である。解はV_A＝12 V、V_B＝9 Vなので、電位差は3 Vである。",
    "choiceExplanations": {
      "ア": "左右の容量の配置がA側とB側で逆なので、AB間に電位差が生じる。各接点の電荷の和を0とする条件から、電位はAが12 V、Bが9 Vである。",
      "イ": "AB間の1 μFのコンデンサでの電圧は、回路全体の電荷保存で決まる。右側を0 VとすればBは9 V、Aは12 Vなので、1 Vではない。",
      "ウ": "21 V側と0 V側への容量を接点ごとに数えると、AとBの電位はそれぞれ12 Vと9 Vになる。これらの差は2 Vではなく3 Vである。",
      "エ": "右側を0 Vとすると、AとBの電荷保存より2.5V_A－V_B＝21、2.5V_B－V_A＝10.5である。解はV_A＝12 V、V_B＝9 Vなので、電位差は3 Vである。",
      "オ": "接点AとBの初期電荷は0であり、電圧印加後も各接点に接続する極板の電荷の和は0である。その条件から得られるAとBの電位の差は3 Vである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q20.webp"
    ],
    "imageAltTexts": [
      "電圧21 Vを印加するコンデンサ回路と各コンデンサの電荷の向き"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q21",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "グラフの一筆書き",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の㋐～㋔のうち、いずれかの頂点から一筆書きを行うことができるグラフとして妥当なもののみを全て挙げているのはどれか。\nただし、グラフを描く際には、頂点から頂点へ線分を引くものとする。",
    "choices": {
      "ア": "㋐、㋒、㋓",
      "イ": "㋑、㋔",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓、㋔",
      "オ": "㋓、㋔"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "連結グラフが一筆書きできるのは、次数が奇数の頂点が0個か2個の場合である。㋑、㋓、㋔がこの条件を満たす。",
    "choiceExplanations": {
      "ア": "㋐と㋒には次数が奇数の頂点が4個以上あり、出発点と終点だけでは奇数の頂点を処理できない。㋓は奇数次数の頂点が2個なので一筆書きが可能である。",
      "イ": "㋑は奇数次数の頂点が2個で、㋔は全ての頂点の次数が偶数であり、どちらも一筆書きできる。㋓も同じ条件を満たすため、この組合せだけでは足りない。",
      "ウ": "㋑は一筆書きできるが、㋒には次数が奇数の頂点が4個以上ある。線分の途中の交差は頂点として数えない。",
      "エ": "連結グラフが一筆書きできるのは、次数が奇数の頂点が0個か2個の場合である。㋑、㋓、㋔がこの条件を満たす。",
      "オ": "㋓と㋔はいずれも一筆書きできる。㋑も奇数次数の頂点が2個なので、それらを始点と終点にすれば一筆で描ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q21.webp"
    ],
    "imageAltTexts": [
      "㋐から㋔までの五つの連結グラフ"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q22",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "線形補間",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "xy平面において、2点A(2.38, 1.79)、B(5.32, 0.53)がある。この2点の値から点C(3.22, y)におけるyの値を線形補間により補間した。このとき、yの値はいくらか。",
    "choices": {
      "ア": "1.07",
      "イ": "1.25",
      "ウ": "1.43",
      "エ": "1.72",
      "オ": "2.02"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "AからCまでのxの増分は0.84で、AからBまでの増分2.94の2/7である。yの値は1.79＋(0.53－1.79)×2/7＝1.43になる。",
    "choiceExplanations": {
      "ア": "点Cのx座標はAからBまでの距離の2/7だけ進んでいる。yの減少は1.26×2/7＝0.36なので、1.79から引くと1.43になる。",
      "イ": "1.25は補間値1.43より小さく、必要な減少量を大きく見積もっている。両点のx方向の差2.94に対するCまでの差0.84を重みとする。",
      "ウ": "AからCまでのxの増分は0.84で、AからBまでの増分2.94の2/7である。yの値は1.79＋(0.53－1.79)×2/7＝1.43になる。",
      "エ": "1.72を得るにはAからの減少を0.07と見積もることになる。実際にはyの全減少1.26の2/7だけ進むので、減少は0.36である。",
      "オ": "Cのx座標はAとBの間にあるので、線形補間した値は0.53から1.79の間にある。2.02はこの範囲に入らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q23",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "NAND・NORゲート",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "論理回路に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「NAND回路は、それ自体を組み合わせて全ての回路（本問においては、AND、OR、NOT、NAND、NOR及びXORの回路を指す。）を実現することができる。例えば、図のように最低二つのNANDゲートを用いることで［㋐］回路を、最低［㋑］つのNANDゲートを用いることでXOR回路を実現できる。他方、NOR回路については、最低三つのNORゲートを用いることで［㋐］回路を、最低五つのNORゲートを用いることでXOR回路を実現できる。NOR回路は、NAND回路と［㋒］。」",
    "choices": {
      "ア": "AND／四／異なり、それ自体を組み合わせても実現できない回路がある",
      "イ": "AND／四／同様、それ自体を組み合わせて全ての回路を実現できる",
      "ウ": "AND／五／同様、それ自体を組み合わせて全ての回路を実現できる",
      "エ": "OR／四／異なり、それ自体を組み合わせても実現できない回路がある",
      "オ": "OR／五／同様、それ自体を組み合わせて全ての回路を実現できる"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図の二段目は同じ信号を二入力に与えるため、NANDの出力を反転してANDとなる。NAND四つでXORを実現でき、NORも単独の組合せで全ての基本回路を実現できる。",
    "choiceExplanations": {
      "ア": "出力を反転する図はANDを実現し、NAND四つでXORを作ることができる。NORでもNOT・OR・ANDが作れるため、実現できない回路があるという記述は誤りである。",
      "イ": "図の二段目は同じ信号を二入力に与えるため、NANDの出力を反転してANDとなる。NAND四つでXORを実現でき、NORも単独の組合せで全ての基本回路を実現できる。",
      "ウ": "ANDの判断とNORの完全性は妥当である。NANDによるXORでは最初のNANDの出力を二つの中間ゲートで共有できるため、四つのゲートで足りる。",
      "エ": "図の後段はNAND出力を反転するので、得られるのはORではなくANDである。NORは入力を束ねるとNOTになり、NOTを組み合わせてANDとORを作れる。",
      "オ": "NORの完全性は妥当だが、図の出力はANDである。NANDでXORを実現するには、両方の入力を受ける最初のゲートと二つの中間ゲート、最後のゲートの四つで足りる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q23.webp"
    ],
    "imageAltTexts": [
      "一つ目のNANDの出力を二つ目のNANDの二入力に接続する回路"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q24",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "デッドロック",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "計算機システムにおけるデッドロックに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　デッドロックとは、複数の処理が同時に一つの資源を要求することで、資源の競合が生じることである。\n㋑　優先順位の高い処理が必要としている資源を、優先順位の低い別の処理が占有することは、デッドロックの発生に必要な条件の一つである。\n㋒　資源に対する処理が終了するまで、保持している処理から資源を強制的に取り除くことができないことは、デッドロックの発生に必要な条件の一つである。\n㋓　デッドロックを回避するためには、資源獲得の順序を、複数の処理で同じにするとよい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "資源を保持者から強制的に取り上げられないことは、デッドロックの必要条件の一つである。獲得順序を共通に固定すると、相互に待ち続ける循環を作れなくなる。",
    "choiceExplanations": {
      "ア": "単なる資源の競合では、先に取得した処理が終われば他の処理も進める。低優先度の処理が資源を持つ現象は優先順位逆転に関係し、デッドロックの必要条件ではない。",
      "イ": "㋒の資源の横取り不可は発生条件の一つである。㋐のような同時要求だけでは相互に待ち続ける循環が生じるとは限らない。",
      "ウ": "資源獲得順を統一する㋓は、循環待ちを防ぐために有効である。㋐の資源の競合は、処理が互いの資源を待って進めない状態まで示していない。",
      "エ": "㋓は妥当だが、デッドロックに処理間の優先順位の差は必要ない。同じ優先度の処理でも、互いが持つ資源を待ち続けると発生する。",
      "オ": "資源を保持者から強制的に取り上げられないことは、デッドロックの必要条件の一つである。獲得順序を共通に固定すると、相互に待ち続ける循環を作れなくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q25",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "システムの稼働率",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "稼働率が等しい4台の装置を使用して、以下に示す㋐～㋔の5種類のシステムを構築する。この装置の稼働率Rが0.75のとき、システム全体の稼働率が最も高くなるシステムとして最も妥当なのはどれか。\nただし、この装置以外の稼働率は考慮しないものとする。また、図Ⅰのように装置を並列接続したシステムでは、いずれかの装置が稼働していれば、そのシステム全体は稼働し、図Ⅱのように装置を直列接続したシステムでは、全ての装置が稼働している場合のみ、そのシステム全体は稼働するものとする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋑",
      "ウ": "㋒",
      "エ": "㋓",
      "オ": "㋔"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋑は3台直列の枝と1台だけの枝を並列にする。両方の枝が止まる確率を1から引くと1－(1－0.75³)(1－0.75)≒0.855となり、五つの中で最も高い。",
    "choiceExplanations": {
      "ア": "㋐では4台全ての稼働が必要なので、全体の稼働率は0.75⁴で約0.316である。並列構成を含む㋑の約0.855より低い。",
      "イ": "㋑は3台直列の枝と1台だけの枝を並列にする。両方の枝が止まる確率を1から引くと1－(1－0.75³)(1－0.75)≒0.855となり、五つの中で最も高い。",
      "ウ": "㋒の各直列枝の稼働率は0.75²である。いずれかが動く確率1－(1－0.75²)²は約0.809であり、㋑に及ばない。",
      "エ": "㋓では中央の並列部分に加え、その前後にある各1台も動く必要がある。稼働率は0.75²×(1－0.25²)≒0.527である。",
      "オ": "㋔では3台の並列部分が動いていても、末尾の1台が止まると全体が止まる。稼働率は0.75×(1－0.25³)≒0.738である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q25.webp"
    ],
    "imageAltTexts": [
      "装置の並列・直列接続の例と四台を使うシステム㋐～㋔"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q26",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "ハフマン符号",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ハフマン符号に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ハフマン符号は［㋐］するための符号である。ハフマン符号の［㋑］は語頭符号の中で最小である。語頭符号の［㋑］は［㋒］未満にならないことが知られている。」",
    "choices": {
      "ア": "誤りを訂正／符号化率／通信路の通信路容量",
      "イ": "誤りを訂正／復号誤り確率／情報源のエントロピー",
      "ウ": "誤りを訂正／平均符号語長／情報源のエントロピー",
      "エ": "データを圧縮／符号化率／通信路の通信路容量",
      "オ": "データを圧縮／平均符号語長／情報源のエントロピー"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ハフマン符号は頻出する記号ほど短い符号を割り当てる圧縮方式で、接頭語条件を満たす符号の平均符号語長を最小にする。その平均長は情報源のエントロピーを下回らない。",
    "choiceExplanations": {
      "ア": "ハフマン符号は頻出する記号に短い符号語を割り当てる圧縮用の符号である。最小にするのは通信路符号の符号化率ではなく、情報源の平均符号語長である。",
      "イ": "情報源のエントロピーが下限となるのは平均符号語長である。ハフマン符号の目的は誤りを訂正することではなく、可逆にデータ量を減らすことである。",
      "ウ": "平均符号語長と情報源のエントロピーの関係は妥当である。目的は頻度に合わせてデータを圧縮することであり、誤り訂正用ではない。",
      "エ": "圧縮用という点は正しい。最小にするのは平均符号語長であり、その下限は通信路容量ではなく情報源のエントロピーである。",
      "オ": "ハフマン符号は頻出する記号ほど短い符号を割り当てる圧縮方式で、接頭語条件を満たす符号の平均符号語長を最小にする。その平均長は情報源のエントロピーを下回らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q27",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "パルス符号変調",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "AD変換に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「以下の図は、パルス符号変調について示している。まず、連続して変化するアナログ波形を一定の時間間隔でパルス振幅変調し、振幅の変化するパルス列に変換する。これを［㋐］という。次に、これらのパルスの振幅を図のような整数値で近似し、離散的な値に置換する。これを［㋑］という。この離散的な値を、2値の『1』、『0』のビットを組み合わせて表す。これを［㋒］という。」",
    "choices": {
      "ア": "標本化／符号化／量子化",
      "イ": "標本化／量子化／符号化",
      "ウ": "符号化／量子化／標本化",
      "エ": "量子化／標本化／符号化",
      "オ": "量子化／符号化／標本化"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "一定の時間間隔で振幅を取り出すのが標本化で、その振幅を離散的な段階に当てはめるのが量子化である。離散値をビット列で表す工程が符号化である。",
    "choiceExplanations": {
      "ア": "最初に一定時間ごとに信号値を取り出すのは標本化である。振幅を整数値に近似する量子化が先で、その値をビット列にする符号化が後になる。",
      "イ": "一定の時間間隔で振幅を取り出すのが標本化で、その振幅を離散的な段階に当てはめるのが量子化である。離散値をビット列で表す工程が符号化である。",
      "ウ": "二番目の量子化は妥当だが、最初は標本化で時間軸上の値を取り出す。各離散値を0と1の並びに変換する工程が符号化である。",
      "エ": "量子化は振幅値を離散化する後段の工程である。それに先立って時間を区切り、各時点の値を取り出す標本化を行う。",
      "オ": "波形の変換で先に行うのは、一定間隔で値を取り出す標本化である。次に振幅を量子化し、最後に符号化する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q27.webp"
    ],
    "imageAltTexts": [
      "パルス符号変調におけるアナログ波形、標本値、整数値、ビット表現"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q28",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "OSI参照モデルとTCP・UDP",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "OSI参照モデルに関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「OSI参照モデルは、通信に必要な機能をアプリケーション層、プレゼンテーション層、セッション層、［㋐］、［㋑］、データリンク層及び物理層の7階層で定義したものである。［㋒］及び［㋓］は、どちらも［㋐］で動作するプロトコルである。そのうち、コネクション型で、ホスト間で交換されるデータの到達性を保証するプロトコルは［㋒］であり、コネクションレス型で、データの到達性を保証しないプロトコルは［㋓］である。」",
    "choices": {
      "ア": "トランスポート層／ネットワーク層／TCP／UDP",
      "イ": "トランスポート層／ネットワーク層／UDP／SMTP",
      "ウ": "トランスポート層／ネットワーク層／UDP／TCP",
      "エ": "ネットワーク層／トランスポート層／TCP／SMTP",
      "オ": "ネットワーク層／トランスポート層／TCP／UDP"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "セッション層の次はトランスポート層、その下がネットワーク層である。TCPはコネクション型で再送などにより信頼性を確保し、UDPは到達を保証しないコネクションレス型である。",
    "choiceExplanations": {
      "ア": "セッション層の次はトランスポート層、その下がネットワーク層である。TCPはコネクション型で再送などにより信頼性を確保し、UDPは到達を保証しないコネクションレス型である。",
      "イ": "階層の順序は合っているが、UDPはコネクションレス型である。SMTPは電子メール転送のアプリケーション層のプロトコルである。",
      "ウ": "階層の順序は合っているが、TCPとUDPの性質が逆である。TCPは接続を確立し、UDPは接続を確立せずにデータグラムを送る。",
      "エ": "セッション層の下はトランスポート層で、その次がネットワーク層である。SMTPはアプリケーション層のプロトコルなので、㋓はUDPになる。",
      "オ": "TCPとUDPの区別は合っているが、両方ともトランスポート層で動作する。ネットワーク層はその下に位置する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q29",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "誘電体を挿入したコンデンサ",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "真空中に極板間隔d、極板面積Sの平行平板コンデンサがある。図のように、このコンデンサに厚さ(d/2)、面積S、誘電率2ε₀の誘電体を挿入して極板間に電圧Vを加えたとき、コンデンサに蓄えられる静電エネルギーとして最も妥当なのはどれか。\nただし、真空中の誘電率はε₀とし、端効果は無視できるものとする。",
    "choices": {
      "ア": "(2ε₀S/3d)V²",
      "イ": "(3ε₀S/4d)V²",
      "ウ": "(ε₀S/d)V²",
      "エ": "(3ε₀S/2d)V²",
      "オ": "(8ε₀S/3d)V²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "電界方向に重なる誘電体層と真空層の容量は4ε₀S/dと2ε₀S/dで、直列合成すると4ε₀S/(3d)である。エネルギーはその容量にV²/2を掛けた2ε₀SV²/(3d)となる。",
    "choiceExplanations": {
      "ア": "電界方向に重なる誘電体層と真空層の容量は4ε₀S/dと2ε₀S/dで、直列合成すると4ε₀S/(3d)である。エネルギーはその容量にV²/2を掛けた2ε₀SV²/(3d)となる。",
      "イ": "誘電率を単純に平均して3ε₀/2とするとこの値になる。二層は極板に垂直な方向に重なるので、それぞれの容量の逆数を足して合成する。",
      "ウ": "ε₀SV²/dは、極板間の全てを誘電率2ε₀の物質で満たした場合のエネルギーである。実際は残り半分に真空層があるため、容量はそれより小さい。",
      "エ": "真空層と誘電体層の厚み方向に電圧が分かれる。全容量を求めるときには、二層を直列にして各容量の逆数を加える必要がある。",
      "オ": "合成容量は4ε₀S/(3d)になる。静電エネルギーはCV²ではなくCV²/2なので、係数は8/3ではなく2/3である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q29.webp"
    ],
    "imageAltTexts": [
      "極板間の半分を誘電率2ε₀の誘電体で満たした平行平板コンデンサ"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q30",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "ソレノイドの自己インダクタンス",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような、単位長さ当たりの巻数n、長さl、断面積Sのソレノイドコイルの自己インダクタンスとして最も妥当なのはどれか。\nただし、コイル内部の透磁率をμとし、コイル内部の磁界は一様であり、磁束の漏れはないものとする。\nなお、コイルに大きさIの電流を流し、この電流がつくる磁界によって磁束ψがこのコイルに鎖交するとき、このコイルの自己インダクタンスをLとして、ψ＝LIが成り立つことを用いてよい。",
    "choices": {
      "ア": "μnlS",
      "イ": "μn²lS",
      "ウ": "μnS/l",
      "エ": "μn²S/l",
      "オ": "μnS/l²"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "磁束密度はμnIで、一巻き当たりの磁束はμnISになる。全巻数nlを掛けて電流Iで割れば、自己インダクタンスはμn²lSである。",
    "choiceExplanations": {
      "ア": "磁束密度は巻数密度nに比例し、鎖交する巻数nlもnに比例する。この二つが掛かるので、自己インダクタンスはnの二乗に比例する。",
      "イ": "磁束密度はμnIで、一巻き当たりの磁束はμnISになる。全巻数nlを掛けて電流Iで割れば、自己インダクタンスはμn²lSである。",
      "ウ": "nはコイル全体の巻数ではなく、単位長さ当たりの巻数である。全巻数を求めるにはnに長さlを掛ける。",
      "エ": "自己インダクタンスは全巻数Nを使うとμN²S/lである。N＝nlを代入すると長さは分母に残らず、μn²lSになる。",
      "オ": "巻数密度を固定すれば、長いコイルほど全巻数は多くなる。磁束密度は同じで鎖交磁束が増すため、自己インダクタンスは長さに比例する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q30.webp"
    ],
    "imageAltTexts": [
      "長さl、断面積S、単位長さ当たりn巻のソレノイド"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q31",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "対称な抵抗網",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、抵抗値がRの抵抗を12個組み合わせた回路に、電圧Vの直流電圧源を接続したとき、流れる電流Iの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "V/(3R)",
      "イ": "3V/(5R)",
      "ウ": "2V/(3R)",
      "エ": "3V/(2R)",
      "オ": "5V/(2R)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "上下対称の接点は同電位で、左右対称に電源をつないだ中央の三点も中間電位になる。左からR/2、R/4、R/4、R/2が直列となるので、合成抵抗は3R/2、電流は2V/(3R)である。",
    "choiceExplanations": {
      "ア": "合成抵抗3Rは並列の枝の効果を見落としている。上下対称の対応する接点が同電位なので、隣り合う列の間の抵抗は並列としてまとめられる。",
      "イ": "この電流に対応する合成抵抗は5R/3である。中央の各列間には4本のRが並列になるため、端のR/2を二つ、中央のR/4を二つ足した3R/2が正しい。",
      "ウ": "上下対称の接点は同電位で、左右対称に電源をつないだ中央の三点も中間電位になる。左からR/2、R/4、R/4、R/2が直列となるので、合成抵抗は3R/2、電流は2V/(3R)である。",
      "エ": "3R/2は回路の合成抵抗である。それをVに掛けるのではなく、オームの法則でVを合成抵抗で割ると2V/(3R)になる。",
      "オ": "電源に接した左右の各端子では、最初の抵抗2本を並列にしてもそれぞれR/2が残る。中央の抵抗を含む合成値はRより大きく、5V/(2R)ほどの電流は流れない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q31.webp"
    ],
    "imageAltTexts": [
      "12個の等しい抵抗をひし形の格子状に接続した回路"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q32",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "直列RC回路の充電",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような、抵抗値Rの抵抗、静電容量Cのコンデンサ、電圧Eの直流電圧源、スイッチSから成る回路がある。最初、コンデンサに電荷は蓄えられておらず、Sは開いていた。時刻t＝0でSを閉じた後、tにおけるコンデンサの両端にかかる電圧v_Cとして最も妥当なのはどれか。\nただし、eは自然対数の底である。",
    "choices": {
      "ア": "E[1－e^(－Ct/R)]",
      "イ": "E[1－e^(－t/(CR))]",
      "ウ": "E[1－e^(－Rt/C)]",
      "エ": "Ee^(－Ct/R)",
      "オ": "Ee^(－t/(CR))"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "電流C dv_C/dtを回路式に代入すると、RC dv_C/dt＋v_C＝Eとなる。初期電圧0の条件で解くとE[1－e^(－t/(CR))]になる。",
    "choiceExplanations": {
      "ア": "持ち上がる形は充電に合っているが、時定数はR/CではなくRCである。式はCR dv_C/dt＋v_C＝Eから求まる。",
      "イ": "電流C dv_C/dtを回路式に代入すると、RC dv_C/dt＋v_C＝Eとなる。初期電圧0の条件で解くとE[1－e^(－t/(CR))]になる。",
      "ウ": "指数に使う時定数はC/RではなくRCである。抵抗を大きくすると充電電流は小さくなるので、充電は遅くなる。",
      "エ": "この式ではt＝0でコンデンサの電圧がEになり、その後0へ減る。未充電で始まり電源電圧へ上がるという条件に合わない。",
      "オ": "時定数CRは合っているが、これはEから減衰する電圧の式である。コンデンサの電圧は未充電の0からEへ近づくので、減衰項を1から引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q32.webp"
    ],
    "imageAltTexts": [
      "電圧Eの電源と抵抗R、コンデンサC、スイッチSを直列にした回路"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q33",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "ラプラス変換",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "関数f(t)がt≧0で定義されているとき、F(s)＝∫₀^∞ e^(－st)f(t)dt をf(t)のラプラス変換という。\nf(t)のグラフが図のように表され、f(t)＝t（0≦t＜1）、f(t)＝0（1≦t）であるとき、f(t)のラプラス変換として正しいのはどれか。\nただし、eは自然対数の底である。",
    "choices": {
      "ア": "1/s",
      "イ": "1/s²",
      "ウ": "1/s²－(1/s²)e^(－s)",
      "エ": "1/s²－(1/s²)e^(－s)－(1/s)e^(－s)",
      "オ": "1/s²－(1/s²)e^(－2s)－(1/s)e^(－2s)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "f(t)が0でない範囲で∫₀¹ te^(－st)dtを部分積分する。境界項は－e^(－s)/s、残りの積分は(1－e^(－s))/s²である。",
    "choiceExplanations": {
      "ア": "1/sは、t≧0で常に1である関数のラプラス変換である。ここではt＜1の間だけ被積分関数がte^(－st)になる。",
      "イ": "1/s²は、f(t)＝tがt＝1以降も続く場合の変換である。上端t＝1で切って積分するため、上端に由来する指数項が現れる。",
      "ウ": "部分積分では∫te^(－st)dtに境界項－te^(－st)/sが生じる。上端t＝1の寄与－e^(－s)/sが不足している。",
      "エ": "f(t)が0でない範囲で∫₀¹ te^(－st)dtを部分積分する。境界項は－e^(－s)/s、残りの積分は(1－e^(－s))/s²である。",
      "オ": "積分の上端はt＝1なので、上端代入で現れる指数はe^(－s)である。e^(－2s)を使うと図の上端に対応しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q33.webp"
    ],
    "imageAltTexts": [
      "t＝0から1まで直線的に増え、t＝1以降は0となる関数f(t)"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q34",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "有効数字",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "有効数字に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ある量の測定値が0.03であったとき、この値の有効数字は［㋐］桁である。また、測定値2.3×10³と0.03を、有効数字の桁数を考慮して乗算すると、結果は［㋑］となる。」",
    "choices": {
      "ア": "1／6.9×10",
      "イ": "1／7.0×10",
      "ウ": "1／7×10",
      "エ": "3／6.9×10",
      "オ": "3／7×10"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "0.03の先頭の0は位を示すだけで、有効数字は3の1桁である。積69を1桁に丸めると7×10になる。",
    "choiceExplanations": {
      "ア": "0.03の有効数字は1桁で合っている。6.9×10は丸める前の積で、有効数字が2桁のままになっている。",
      "イ": "0.03の有効数字は1桁である。7.0と書くと末尾の0も有効数字となるので、1桁にするには7×10と書く。",
      "ウ": "0.03の先頭の0は位を示すだけで、有効数字は3の1桁である。積69を1桁に丸めると7×10になる。",
      "エ": "0.03の0は桁を示すだけなので、3桁とは数えない。6.9×10も、有効数字のより少ない測定値に合わせて1桁に丸める必要がある。",
      "オ": "積を1桁で示す7×10は妥当である。0.03の有効数字は3だけで、桁数は1である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q35",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "誘導電動機の試験",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図の簡易等価回路で表される誘導電動機に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、r₁は固定子巻線抵抗、x₁は固定子漏れリアクタンス、r′₂は回転子巻線抵抗（一次換算）、x′₂は回転子漏れリアクタンス（一次換算）、Y₀は励磁アドミタンス、sはすべりを表す。\n\n「誘導電動機の特性を調べる試験として、［㋐］や［㋑］が知られている。［㋐］のとき、［㋒］とみなせるため、Y₀に関する情報が得られる。また［㋑］によってr₁、x₁、r′₂、x′₂に関する情報が得られる。」",
    "choices": {
      "ア": "無負荷試験／拘束試験／s＝0",
      "イ": "無負荷試験／拘束試験／s＝1",
      "ウ": "無負荷試験／拘束試験／sは無限大",
      "エ": "拘束試験／無負荷試験／s＝0",
      "オ": "拘束試験／無負荷試験／sは無限大"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "無負荷では回転子の速度が同期速度に近く、すべりを0とみなすと励磁側の情報が得られる。拘束試験では回転子が止まってs＝1になるため、直列の巻線抵抗や漏れリアクタンスを調べられる。",
    "choiceExplanations": {
      "ア": "無負荷では回転子の速度が同期速度に近く、すべりを0とみなすと励磁側の情報が得られる。拘束試験では回転子が止まってs＝1になるため、直列の巻線抵抗や漏れリアクタンスを調べられる。",
      "イ": "試験の順序は合っているが、s＝1は回転子が止まる拘束時の条件である。無負荷では同期速度に近く、sは0に近い。",
      "ウ": "無負荷では回転速度と同期速度の差が小さくなる。すべりはこの差を同期速度で割った値なので、無限大ではなく0に近い。",
      "エ": "s＝0とみなすのは無負荷試験である。拘束試験では回転速度を0にして、直列の巻線抵抗と漏れリアクタンスに関する情報を得る。",
      "オ": "回転子を拘束したときは回転速度0なので、すべりは1である。励磁アドミタンスを主に調べるのは、すべりを0とみなせる無負荷試験である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q35.webp"
    ],
    "imageAltTexts": [
      "固定子、回転子及び励磁アドミタンスを表す誘導電動機の簡易等価回路"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q36",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "力率改善",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰは、抵抗値10 Ωの抵抗と自己インダクタンス0.1 Hのコイルとが直列に接続された負荷に、角周波数100 rad/sの正弦波交流電圧源を接続した回路である。図Ⅱのように、図Ⅰの回路の負荷に静電容量Cのコンデンサを並列に接続して、回路の力率を改善することを考える。図Ⅱの回路の力率を1にするとき、コンデンサの静電容量Cとして最も妥当なのはどれか。",
    "choices": {
      "ア": "10 μF",
      "イ": "100 μF",
      "ウ": "200 μF",
      "エ": "500 μF",
      "オ": "1000 μF"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "RL負荷は10＋j10 Ωで、そのアドミタンスは0.05－j0.05 Sである。虚部を打ち消すため100C＝0.05とすると、C＝0.0005 F＝500 μFになる。",
    "choiceExplanations": {
      "ア": "10 μFの進みサセプタンスはωC＝0.001 Sにすぎない。直列RL枝の遅れサセプタンスの大きさは0.05 Sなので打ち消せない。",
      "イ": "100 μFではωC＝0.01 Sであり、必要な進みサセプタンス0.05 Sより小さい。コンデンサ接続後も電流に遅れの成分が残る。",
      "ウ": "200 μFではωC＝0.02 Sで、負荷のアドミタンスの虚部－0.05 Sを相殺できない。完全に相殺するには進み成分を0.05 Sにする。",
      "エ": "RL負荷は10＋j10 Ωで、そのアドミタンスは0.05－j0.05 Sである。虚部を打ち消すため100C＝0.05とすると、C＝0.0005 F＝500 μFになる。",
      "オ": "1000 μFではωC＝0.1 Sとなり、必要な0.05 Sの2倍になる。遅れ成分を打ち消した後に進み成分が残り、力率1にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q36.webp"
    ],
    "imageAltTexts": [
      "直列RL負荷と、それにコンデンサCを並列に接続した回路"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q37",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "配列と連結リスト",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "データ構造において、配列とリストを比較した次の記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。ただし、nは1以上の整数とする。\n㋐　それぞれ2n個の要素をもつ配列及びリストがある。配列の末尾には空となっている要素があり、また、リストについては、先頭の要素のアドレスのみが分かっている。この配列及びリストについて、それぞれn番目の要素を探索してその要素の直後に要素を挿入する処理に掛かる時間は、どちらもnの大きさの影響を受ける。\n㋑　配列でキューを実装する場合においては、要素を追加した場合にキューの要素数が配列の長さを超えるかを確認し、配列の長さを増やすなどの処理を設ける必要があるが、リストでスタックやキューを実装する場合においては、通常、上記のような要素数に応じた処理を設ける必要はない。\n㋒　配列及びリストそれぞれの要素数が十分に多い場合において、リストは、配列と比較し、一つの要素当たり使用する記憶容量を少なく抑えられる。ただし、配列において、空となっている要素はなく、また、配列とリストで保存している要素それ自体のデータの大きさは等しいものとする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "配列では挿入位置より後ろをずらし、リストでは先頭からn番目までたどるので、どちらもnの影響を受ける。配列のキューには容量の確認や確保が要るが、リストでは節点を追加できる。",
    "choiceExplanations": {
      "ア": "㋐は妥当である。配列の長さを超える場合の処理が必要で、リストなら通常は節点を追加できるとする㋑も妥当である。",
      "イ": "配列では挿入位置より後ろをずらし、リストでは先頭からn番目までたどるので、どちらもnの影響を受ける。配列のキューには容量の確認や確保が要るが、リストでは節点を追加できる。",
      "ウ": "㋐は妥当だが、リストの節点にはデータのほかにリンクを保存する必要がある。空きがなく同じデータを格納する配列に比べ、リストが要素当たりの容量を減らすという㋒は誤りである。",
      "エ": "㋑の容量管理の説明は妥当である。挿入位置の探索と挿入を合わせると、配列でもリストでもnに応じた処理があるので㋐も入る。",
      "オ": "㋑は妥当だが、リストは各要素で次の節点のアドレスなどを別途記憶する。空きのない配列に比べ、同じデータの格納に必要な要素当たりの容量を抑えられるとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q38",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "ε遷移を含む有限オートマトン",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "ε推移を含む非決定性有限オートマトンに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして、最も妥当なのはどれか。\n\n「［㋐］文法から生成される記号列の集合を受理する、ε推移を含む非決定性有限オートマトンが必ず存在する。n個の状態をもつ、ε推移を含む非決定性有限オートマトンが与えられたとき、それと同じ記号列の集合を受理する、状態が［㋑］個以下の決定性有限オートマトンが必ず存在する。以下の図で示されるε推移を含む非決定性有限オートマトンについて、それと同じ記号列の集合を受理する、3個の状態を有する決定性有限オートマトンは［㋒］。ただし、開始状態はS、終了状態の集合は｛B｝である。」",
    "choices": {
      "ア": "正規／n／存在しない",
      "イ": "正規／2ⁿ／存在する",
      "ウ": "正規／2ⁿ／存在しない",
      "エ": "文脈自由／n／存在する",
      "オ": "文脈自由／2ⁿ／存在しない"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "有限オートマトンは正規言語を受理し、ε閉包を取る部分集合構成で状態数の上限は2ⁿとなる。図は一つ以上のaに零個以上のbが続く列を受理し、未定義の推移を拒否とすれば開始・aの列・bの列の3状態で表せる。",
    "choiceExplanations": {
      "ア": "正規文法という選択は合っている。部分集合構成では元のn状態の部分集合を一つの状態にするので、一般に上限はnではなく2ⁿとなる。",
      "イ": "有限オートマトンは正規言語を受理し、ε閉包を取る部分集合構成で状態数の上限は2ⁿとなる。図は一つ以上のaに零個以上のbが続く列を受理し、未定義の推移を拒否とすれば開始・aの列・bの列の3状態で表せる。",
      "ウ": "正規文法と2ⁿは妥当である。図の言語は、aを一つ以上読んだ状態と、その後bを読んだ状態を受理とし、許されない推移を描かない3状態で表せる。",
      "エ": "一般の文脈自由言語には有限オートマトンで受理できないものがある。有限オートマトンで必ず受理できるのは正規言語であり、決定化の上限は2ⁿ個である。",
      "オ": "2ⁿの上限は妥当である。正規文法が適切で、図では開始・一つ以上のaを読んだ状態・続くbを読んだ状態の三つで受理経路を表せる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q38.webp"
    ],
    "imageAltTexts": [
      "ε遷移でSからA、aでAからBへ進み、Aにa、Bにbの自己ループがある状態遷移図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q39",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "ハッシュの衝突",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "次に示すC言語で定義される関数において、関数hash_sumにvalue[]＝｛3, 7, 8｝、table[]＝｛0, 0, 0, …, 0｝（0が40個並んだ配列）を入力すると、出力は18にならない。出力を18にするためにプログラムを書き換えるとき、書き換える方法として妥当でないのはどれか。\nただし、選択肢の書換えはそれぞれ排他的に行うものとする。また、プログラムの動作に必要なヘッダーファイルは適切に読み込まれるものとする。",
    "choices": {
      "ア": "①の行を、「return val % 40;」と書き換える。",
      "イ": "①の行を、「return val * val * val % 40;」と書き換える。",
      "ウ": "②の行の直後に、「if(coll[i]) address = hash(address);」を追加する。さらに、④の行の直後に、「if(coll[i]) address = hash(address);」を追加する。",
      "エ": "②の行の直後に、「if(coll[i]) address = (address + 1) % 40;」を追加する。さらに、④の行の直後に、「if(coll[i]) address = (address + 1) % 40;」を追加する。",
      "オ": "③の行を、「table[address] += value[i];」と書き換える。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "足し算で格納しても、3と7が同じ添字9を参照することは変わらない。その要素に入った10を読み出しで2回足し、さらに8を足すため28が出力される。",
    "choiceExplanations": {
      "ア": "3、7、8の40による剰余は全て異なる。各値が別の要素に保存され、読み戻して足すと18になるため妥当である。",
      "イ": "三乗を40で割った剰余は順に27、23、32になる。三つの値の格納位置が重ならず、参照時にも同じ場所を使うため18が得られる。",
      "ウ": "元のハッシュで3と7はどちらも添字9になるが、衝突した7の添字を再ハッシュすれば1に移る。読み出すときも同じ添字1を使うので、値3と7を1回ずつ足せる。",
      "エ": "7が添字9で衝突したとき、空いている添字10に移して格納する。読み出すときもこの変更を再現するため、出力は18になる。",
      "オ": "足し算で格納しても、3と7が同じ添字9を参照することは変わらない。その要素に入った10を読み出しで2回足し、さらに8を足すため28が出力される。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q39.webp"
    ],
    "imageAltTexts": [
      "ハッシュ関数と、値の格納後に格納先の値を加算するC言語のプログラム"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q40",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "再帰とハノイの塔",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "以下のC言語で定義される関数move_diskについて、n＝4、a＝1、b＝2を入力したときの実行結果を以下に示す。実行結果の空欄㋐に表示される数字として最も妥当なのはどれか。\nただし、プログラムの動作に必要なヘッダーファイルは適切に読み込まれるものとする。\n\n実行結果：\nStep 1: Move disk 1 from 1 to 3\n（中略）\nStep ［㋐］: Move disk 3 from 3 to 2\n（中略）\nStep 15: Move disk 1 from 3 to 2",
    "choices": {
      "ア": "4",
      "イ": "6",
      "ウ": "8",
      "エ": "10",
      "オ": "12"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "最初の七手で小さい三枚を棒3へ移し、手順8で円盤4を棒2へ移す。次の三手で小さい二枚を棒1へ移すので、棒3から棒2への円盤3の移動は手順12になる。",
    "choiceExplanations": {
      "ア": "手順4では、最初の三枚を棒1から棒3に移す途中で円盤3を棒1から棒3に移す。問われるのは同じ円盤を棒3から棒2へ移す手順である。",
      "イ": "手順6は、最初の七手で三枚の円盤を棒1から棒3に集める段階にある。円盤3が棒2へ動くのは、棒1の円盤4を棒2へ移した後である。",
      "ウ": "手順8で移すのは最も大きい円盤4で、移動先は棒2である。円盤3を棒2に移すには、その後に小さい二枚を先に移す。",
      "エ": "手順8で円盤4を移した後、手順9～11は小さい二枚を棒3から棒1へ避けるために使う。手順10では円盤3はまだ棒3にある。",
      "オ": "最初の七手で小さい三枚を棒3へ移し、手順8で円盤4を棒2へ移す。次の三手で小さい二枚を棒1へ移すので、棒3から棒2への円盤3の移動は手順12になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q40.webp"
    ],
    "imageAltTexts": [
      "三本の棒の間で円盤を移す再帰関数move_diskのソースコード"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q41",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "p型半導体",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "p型半導体に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「p型半導体は、シリコン（Si）の真性半導体に3価の元素である［㋐］などを不純物として添加することで得られる。この不純物原子がSi原子と［㋑］結合しようとすると、価電子が1個不足するため、この不足分は他のSi原子の価電子を受け取ることで補われる。このように、半導体から電子を受け取り、正孔を供与する不純物は［㋒］と呼ばれている。」",
    "choices": {
      "ア": "ヒ素（As）／共有／ドナー",
      "イ": "ヒ素（As）／金属／アクセプタ",
      "ウ": "ガリウム（Ga）／共有／アクセプタ",
      "エ": "ガリウム（Ga）／金属／アクセプタ",
      "オ": "ガリウム（Ga）／金属／ドナー"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ガリウムは3価であり、4価のシリコンと共有結合を作ると電子が一つ足りない。電子を受け取って正孔を作るため、アクセプタになる。",
    "choiceExplanations": {
      "ア": "ヒ素は価電子を5個持ち、シリコンに加えると余った電子を供与するドナーになる。p型を作るには価電子が一つ少ない3価元素を用いる。",
      "イ": "ヒ素は5価であり、シリコンの中ではアクセプタではなくドナーとして働く。結晶中で結合に使われるのはシリコンの共有結合である。",
      "ウ": "ガリウムは3価であり、4価のシリコンと共有結合を作ると電子が一つ足りない。電子を受け取って正孔を作るため、アクセプタになる。",
      "エ": "ガリウムがアクセプタになるという判断は合っている。シリコンの結晶中で価電子を共有する結合は金属結合ではなく共有結合である。",
      "オ": "3価のガリウムは余分な電子を与えるドナーではなく、電子を受け取るアクセプタである。シリコン原子との結合には価電子を共有する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q42",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "バイポーラトランジスタの電流増幅率",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "図のバイポーラトランジスタにおいて、端子B、C、Eは、それぞれベース、コレクタ、エミッタの端子を示している。図のように、コレクタ電流、エミッタ電流がそれぞれ8 mA、8.08 mAのとき、エミッタ接地電流増幅率として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.01",
      "イ": "1.01",
      "ウ": "10",
      "エ": "50",
      "オ": "100"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "エミッタ電流とコレクタ電流の差からベース電流は0.08 mAである。エミッタ接地電流増幅率はコレクタ電流をベース電流で割った8/0.08＝100となる。",
    "choiceExplanations": {
      "ア": "0.01は、ベース電流0.08 mAをコレクタ電流8 mAで割った値である。エミッタ接地の電流増幅率では分子と分母を逆にする。",
      "イ": "1.01はエミッタ電流をコレクタ電流で割った比である。エミッタ接地では、出力側のコレクタ電流を入力側のベース電流で割る。",
      "ウ": "電流保存からベース電流は8.08－8＝0.08 mAである。8÷0.08を計算すると、10ではなく100になる。",
      "エ": "50という値には0.16 mAのベース電流が必要になる。図で与えられた電流差はその半分の0.08 mAである。",
      "オ": "エミッタ電流とコレクタ電流の差からベース電流は0.08 mAである。エミッタ接地電流増幅率はコレクタ電流をベース電流で割った8/0.08＝100となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q42.webp"
    ],
    "imageAltTexts": [
      "C端子に流入する8 mAとE端子から流出する8.08 mA"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q43",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "差動増幅回路",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "図のように、演算増幅器と抵抗値1 kΩの抵抗を組み合わせた回路において、電圧v₁、v₂を入力したときに出力される電圧vₒとして最も妥当なのはどれか。\nただし、演算増幅器は理想的なものであり、演算増幅器の入力端子間の電位差はなく、各入力端子には電流が流れ込まないものとする。",
    "choices": {
      "ア": "－v₁＋v₂",
      "イ": "v₁－v₂",
      "ウ": "2(－v₁＋v₂)",
      "エ": "v₁＋v₂",
      "オ": "2(v₁＋v₂)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "非反転入力は等しい抵抗で分圧されてv₂/2となり、負帰還で反転入力もv₂/2になる。反転入力では(v₁＋vₒ)/2＝v₂/2なので、vₒ＝－v₁＋v₂である。",
    "choiceExplanations": {
      "ア": "非反転入力は等しい抵抗で分圧されてv₂/2となり、負帰還で反転入力もv₂/2になる。反転入力では(v₁＋vₒ)/2＝v₂/2なので、vₒ＝－v₁＋v₂である。",
      "イ": "v₁は反転入力側へつながるので、出力では負の係数を持つ。v₂は非反転入力側で、正の係数になる。",
      "ウ": "非反転入力から出力までの利得は2だが、その入力電位は最初にv₂/2に分圧されている。反転側のv₁には－1倍が掛かるため、差全体が2倍になるわけではない。",
      "エ": "v₁の入力抵抗と帰還抵抗は等しいため、v₁から出力への利得は－1である。出力は和ではなく、v₂からv₁を引いた値になる。",
      "オ": "非反転側の分圧と負帰還により、反転入力の電圧もv₂/2になる。そこで電流収支を取るとv₁＋vₒ＝v₂で、両入力を加えて2倍にはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q43.webp"
    ],
    "imageAltTexts": [
      "四つの1 kΩ抵抗と理想演算増幅器による差動回路"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-digital-q44",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "ダイオード論理回路",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "図①～④はデジタル回路であり、入力1と入力2の端子にはそれぞれ、Hレベル（高い電圧）かLレベル（低い電圧）の電圧が入力される。AND回路（入力1と入力2が共にHのときに限り、出力がHとなる）、OR回路（入力1と入力2が共にLのときに限り、出力がLとなる）を示すものの組合せとして最も妥当なのはどれか。\nただし、Hレベルは図中のV（電源電圧）と同等、Lレベルは0 Vと同等であるものとする。また、ダイオードは理想的であるとする。",
    "choices": {
      "ア": "①／②",
      "イ": "①／③",
      "ウ": "①／④",
      "エ": "②／③",
      "オ": "②／④"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "②ではプルアップされた出力が一つでもLの入力があるとダイオードを通してLになり、両方HのときだけHになる。③ではプルダウンされた出力がどちらかのH入力からダイオードを通してHになる。",
    "choiceExplanations": {
      "ア": "①では入力がLでも出力から入力へ電流が流れず、出力がLに引き下げられない。②ではどちらかの入力がLなら出力もLになるので、②はANDである。",
      "イ": "③がORになるという判断は正しい。ANDには一方がLでも出力がLになる必要があり、その向きのダイオードとプルアップを持つのは②である。",
      "ウ": "①はプルアップされていて、入力がLでもダイオードが出力をLへ引き下げない。④はプルダウンされ、入力がHでも出力をHへ引き上げる向きにダイオードが付いていない。",
      "エ": "②ではプルアップされた出力が一つでもLの入力があるとダイオードを通してLになり、両方HのときだけHになる。③ではプルダウンされた出力がどちらかのH入力からダイオードを通してHになる。",
      "オ": "②はANDになる。④ではダイオードがH入力から出力に電流を供給する向きではないため、ORになるのは③である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-digital/q44.webp"
    ],
    "imageAltTexts": [
      "二つのダイオードとプルアップまたはプルダウン抵抗を使う四つの回路"
    ]
  }
];
