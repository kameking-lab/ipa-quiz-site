import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2025_SENMON_DIGITAL: Question[] = [
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q01",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "多項式の除法",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "x⁴＋2x²＋1をx²−4x−21で割った余りとして正しいのはどれか。",
    "choices": {
      "ア": "−158x＋26",
      "イ": "−57x＋168",
      "ウ": "32x＋74",
      "エ": "126x−115",
      "オ": "240x＋820"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "x²≡4x＋21よりx⁴≡16x²＋168x＋441≡232x＋777である。2x²＋1≡8x＋43を加えると240x＋820となる。",
    "choiceExplanations": {
      "ア": "余りを求めるには、x²−4x−21を0と置いた合同式で次数を下げられる。候補はこのときの一次式240x＋820と係数も定数項も異なる。",
      "イ": "x²を4x＋21で置き換えると、2x²の寄与は8x＋42である。さらにx⁴の寄与を加えると、一次の係数は−57ではなく240になる。",
      "ウ": "x⁴を（4x＋21）²で置き換えた際に168xの交差項が現れる。これがあるため、一次の係数を32とする候補は合わない。",
      "エ": "x⁴を低次化した定数項は777で、残る2x²＋1の定数項43を加える。定数項が負の候補は合わない。",
      "オ": "x²≡4x＋21よりx⁴≡16x²＋168x＋441≡232x＋777である。2x²＋1≡8x＋43を加えると240x＋820となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q02",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "円周角と接弦定理",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、点Oを中心とする円の周上に4点A、B、C、D、点Aにおける接線上に点Eがあり、線分BDは円の直径である。また、∠DAE＝α、∠DBC＝βであるとき、∠ACBの大きさはいくらか。",
    "choices": {
      "ア": "α",
      "イ": "β",
      "ウ": "90°−α",
      "エ": "90°−β",
      "オ": "（α＋β）/2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "接弦定理から∠ABD＝αで、直径BDに対する∠BADは90°である。よって∠ADB＝90°−αとなり、同じ弦ABに対する∠ACBにも等しい。",
    "choiceExplanations": {
      "ア": "接弦定理により、αは弦ADを見込む∠ABDに等しい。求める∠ACBは弦ABに対する角である。",
      "イ": "βは弦DCを見込む円周角である。∠ACBが見込む弦はABなので、一般にβと一致しない。",
      "ウ": "接弦定理から∠ABD＝αで、直径BDに対する∠BADは90°である。よって∠ADB＝90°−αとなり、同じ弦ABに対する∠ACBにも等しい。",
      "エ": "90°から差し引くのは、直角三角形ABDの∠ABDである。βは∠DBCなので、これを引く根拠はない。",
      "オ": "αとβは異なる弦を見込む円周角と結び付いている。求める角は直角三角形ABDから90°−αと決まり、二つの平均ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q02.webp"
    ],
    "imageAltTexts": [
      "円周上のA・B・C・Dと、Aでの接線上にあるEを示した図。BDは直径である。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q03",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "指数関数の変曲点",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "曲線 y＝27e^(−x²/3) の変曲点のx座標になっているものは次のうちではどれか。",
    "choices": {
      "ア": "0",
      "イ": "√6/2",
      "ウ": "√3",
      "エ": "3/2",
      "オ": "2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二階微分は（12x²−18）e^(−x²/3)である。x＝√6/2ではx²＝3/2となり、この点で二階微分の符号が変わる。",
    "choiceExplanations": {
      "ア": "x＝0では一階微分が0になるが、二階微分は−18である。傾きが0になる点と変曲点を区別する。",
      "イ": "二階微分は（12x²−18）e^(−x²/3)である。x＝√6/2ではx²＝3/2となり、この点で二階微分の符号が変わる。",
      "ウ": "x＝√3ではx²＝3で、二階微分の係数12x²−18は18になる。曲率はこの点で0にならない。",
      "エ": "x＝3/2なら二階微分の係数12x²−18は9となる。変曲点の条件x²＝3/2を満たさない。",
      "オ": "x＝2では二階微分の係数は30であり、符号の変化点ではない。変曲点の正の座標は√6/2になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q04",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "対数を含む定積分",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "∫₁² x² log x dx はいくらか。",
    "choices": {
      "ア": "(8/3) log 2−1",
      "イ": "(8/3) log 2−7/9",
      "ウ": "(8/3) log 2",
      "エ": "4 log 2",
      "オ": "(16/3) log 2＋7"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "部分積分で［(x³/3) log x］₁²−∫₁² x²/3 dxを得る。境界項は(8/3) log 2で、これから(8−1)/9を引く。",
    "choiceExplanations": {
      "ア": "部分積分で引く項は、∫₁² x²/3 dx＝7/9である。下端の寄与も含めるので1にはならない。",
      "イ": "部分積分で［(x³/3) log x］₁²−∫₁² x²/3 dxを得る。境界項は(8/3) log 2で、これから(8−1)/9を引く。",
      "ウ": "(8/3) log 2は部分積分の境界項である。log xを微分したことによる積分項7/9を差し引く必要がある。",
      "エ": "x²の原始関数はx³/3である。上端の境界項は(8/3) log 2であり、さらに積分項を引く。",
      "オ": "上端の境界項に入るx³/3は8/3である。残りの積分は正の値なので、境界項に加えるのでなく差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q05",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "連立一次不等式の最大値",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "実数x、yについて次の三つの不等式が成り立つとき、2x＋7yの最大値はいくらか。\nx−y≦0\n2x＋3y≦10\n5x−y≧−9",
    "choices": {
      "ア": "9",
      "イ": "18",
      "ウ": "23",
      "エ": "26",
      "オ": "32"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "境界の三つの交点は（−9/4、−9/4）、（2、2）、（−1、4）である。目的関数の値は順に−81/4、18、26で、最後の頂点が最大である。",
    "choiceExplanations": {
      "ア": "実行可能な頂点（2、2）だけでも目的関数は18になる。したがって9を上限とすることはできない。",
      "イ": "18は境界x＝yと2x＋3y＝10の交点（2、2）での値である。別の頂点（−1、4）では26になる。",
      "ウ": "点（−1、4）は三つの条件を満たし、2x＋7y＝26になる。したがって最大値は23より大きい。",
      "エ": "境界の三つの交点は（−9/4、−9/4）、（2、2）、（−1、4）である。目的関数の値は順に−81/4、18、26で、最後の頂点が最大である。",
      "オ": "一次の目的関数はこの三角形の頂点のいずれかで最大となる。各頂点の値はいずれも32より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q06",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "指数不等式",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "実数xについて次の式が成り立つとき、xの最大値はいくらか。\n9^(3x)≧3^(x²＋5)",
    "choices": {
      "ア": "5",
      "イ": "16/3",
      "ウ": "6",
      "エ": "15/2",
      "オ": "25/3"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "9^(3x)＝3^(6x)であり、底3は1より大きいので6x≧x²＋5と同値である。（x−1）（x−5）≦0から1≦x≦5になる。",
    "choiceExplanations": {
      "ア": "9^(3x)＝3^(6x)であり、底3は1より大きいので6x≧x²＋5と同値である。（x−1）（x−5）≦0から1≦x≦5になる。",
      "イ": "16/3は5より大きいので、（x−1）と（x−5）がともに正になる。したがって積が0以下という条件を満たさない。",
      "ウ": "x＝6では左辺の指数が36、右辺の指数が41になり、左辺が小さい。最大値は二つの指数が等しくなる上側の解5である。",
      "エ": "15/2は二次不等式の上側の解5を超える。底をそろえて指数を比べると元の不等式を満たさない。",
      "オ": "指数を比べて得られる二次式は（x−1）（x−5）である。25/3では両因子が正となり、許される区間に入らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q07",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二直線のなす角",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、二つの直線 y＝3x、y＝−(1/2)x がなす角をθとしたとき、tan θの値はいくらか。\nただし、0≦θ≦π/2とする。",
    "choices": {
      "ア": "9/2",
      "イ": "11/2",
      "ウ": "6",
      "エ": "13/2",
      "オ": "7"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "傾きは3と−1/2なので、tan θ＝|(3−(−1/2))/(1＋3×(−1/2))|＝7である。絶対値を取って鋭角に対応させる。",
    "choiceExplanations": {
      "ア": "角の正接は二つの傾きの差の絶対値を、1と傾きの積の和の絶対値で割って求める。傾きの差は7/2、分母は1/2なので9/2にならない。",
      "イ": "傾きの積は−3/2で、公式の分母は|1−3/2|＝1/2になる。これを用いると11/2ではなく7である。",
      "ウ": "片方の傾きは−1/2なので、差は3ではなく3＋1/2である。分母の1/2で割ると6より1大きい。",
      "エ": "傾きの差の絶対値7/2を1/2で割る。結果は13/2ではなく14/2になる。",
      "オ": "傾きは3と−1/2なので、tan θ＝|(3−(−1/2))/(1＋3×(−1/2))|＝7である。絶対値を取って鋭角に対応させる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q07.webp"
    ],
    "imageAltTexts": [
      "直線y＝3xとy＝−x/2の交点O付近に、鋭角θが示された座標図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q08",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "繰返し交換の確率",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "Aの袋には赤玉1個と黒玉2個が、Bの袋には黒玉が3個入っている。それぞれの袋から玉を1個ずつ無作為に取り出した後、Aの袋から取り出した玉をBの袋に、Bの袋から取り出した玉をAの袋に入れるという操作を繰り返す。この操作を5回繰り返した後に、Aの袋に赤玉が入っている確率はいくらか。",
    "choices": {
      "ア": "14/81",
      "イ": "47/243",
      "ウ": "40/81",
      "エ": "122/243",
      "オ": "128/243"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "n回後にAにある確率をp_nとすると、p_(n＋1)＝(2/3)p_n＋(1/3)(1−p_n)である。p₀＝1からp₅＝1/2＋(1/2)(1/3)⁵＝122/243になる。",
    "choiceExplanations": {
      "ア": "赤玉は各回に1/3の確率で反対の袋に移り、2/3の確率でもとの袋に残る。Aにある状態から始めるので、5回後も確率は1/2を上回る。",
      "イ": "Aにないときでも次の回に1/3の確率で戻る。Aにある場合とない場合の双方を数えると、47/243ではなく122/243になる。",
      "ウ": "40/81は1/2未満だが、Aに赤玉がある状態から開始すると各回のAの確率は1/2へ上から近づく。5回後も1/2を下回らない。",
      "エ": "n回後にAにある確率をp_nとすると、p_(n＋1)＝(2/3)p_n＋(1/3)(1−p_n)である。p₀＝1からp₅＝1/2＋(1/2)(1/3)⁵＝122/243になる。",
      "オ": "平均との差p_n−1/2は、操作のたびに1/3倍される。5回後の差は1/486なので、128/243まで大きくならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q09",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "配列の分割とピボット",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "配列要素A[0]、A[1]、…、A[6]から成る配列Aが定義され、次のように値が格納されている。\nA＝[10、1、3、8、2、9、6]\n図のフローチャートを実行した後の配列Aとして最も妥当なのはどれか。\nただし、swap(a, b)はaとbに格納された値を入れ替える操作とする。",
    "choices": {
      "ア": "[1、2、3、6、8、9、10]",
      "イ": "[1、3、2、6、10、9、8]",
      "ウ": "[1、3、2、8、10、9、6]",
      "エ": "[10、8、9、1、2、3、6]",
      "オ": "[10、8、9、6、2、3、1]"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "走査で6以下の1、3、2が順に先頭へ移動し、その時点でAは[1、3、2、8、10、9、6]となる。最後にA[6]をA[3]と入れ替え、[1、3、2、6、10、9、8]を得る。",
    "choiceExplanations": {
      "ア": "この処理は配列全体を昇順に整列するものではない。基準値6を使って左右に分割するので、左側にも1、3、2のように未整列の並びが残る。",
      "イ": "走査で6以下の1、3、2が順に先頭へ移動し、その時点でAは[1、3、2、8、10、9、6]となる。最後にA[6]をA[3]と入れ替え、[1、3、2、6、10、9、8]を得る。",
      "ウ": "この配列はループの終了時点の値である。フローチャートの最後に、6をA[3]の8と交換する処理が残っている。",
      "エ": "比較の条件はA[i]≦A[r]である。6より大きい10、8、9が走査で先頭側に集められることはない。",
      "オ": "走査で6以下の値を前へ動かすため、6の左側に10、8、9は残らない。また、最初に移動する1は左端に入る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q09.webp"
    ],
    "imageAltTexts": [
      "右端の要素を基準にし、走査した要素の比較と入替えを繰り返すフローチャート。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q10",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "剛体棒の質量中心",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、xy平面上に、質量がM、2M、3Mのまっすぐで一様な細い剛体棒の端を、点O、A、Bで結合させた構造物がある。この構造物の重心の座標として最も妥当なのはどれか。",
    "choices": {
      "ア": "（2、10/3）",
      "イ": "（10/3、11/6）",
      "ウ": "（10/3、2）",
      "エ": "（7/2、11/6）",
      "オ": "（7/2、10/3）"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "棒OA、AB、BOの中点は順に（2、2）、（5、3）、（3、1）である。質量比1対2対3で加重平均すると（21/6、11/6）になる。",
    "choiceExplanations": {
      "ア": "x＝2はOAの棒単独の重心の座標である。他の棒の中心のx座標は3と5なので、全体の重心のx座標は2より大きい。",
      "イ": "y座標は確かに11/6である。x座標は三本の中点を質量比1対2対3で重み付けし、（2＋10＋9）/6＝7/2となる。",
      "ウ": "構造物の重心は三頂点だけの平均では求められない。棒の中点を質量で重み付けするとx＝7/2、y＝11/6になる。",
      "エ": "棒OA、AB、BOの中点は順に（2、2）、（5、3）、（3、1）である。質量比1対2対3で加重平均すると（21/6、11/6）になる。",
      "オ": "x座標7/2は妥当だが、三本の中点のy座標はすべて3以下なので、重み付き平均が10/3になることはない。計算すると11/6である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q10.webp"
    ],
    "imageAltTexts": [
      "質量M・2M・3Mの棒で点O、A（4、4）、B（6、2）を結んだ三角形の図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q11",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "二層の液体による浮力",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、高さ4Lの一様な直方体状の物体を、上層の密度がρ_Aである液体A、下層の密度がρ_B（ρ_A＜ρ_B）である液体Bから成る2層の液体に沈めたところ、物体の下面が液体Aと液体Bの境界面から3Lだけ低い位置で静止した。次に、図Ⅱのように、この物体を液体Bのみに浮かべて静止させたとき、物体の沈んでいる深さhとして最も妥当なのはどれか。\nただし、物体にかかる大気圧と液体にかかる大気圧の差は無視するものとする。",
    "choices": {
      "ア": "[(ρ_A＋3ρ_B)/(2ρ_B)]L",
      "イ": "[3(ρ_A＋ρ_B)/(2ρ_B)]L",
      "ウ": "[(3ρ_A＋ρ_B)/ρ_B]L",
      "エ": "[(ρ_A＋3ρ_B)/ρ_B]L",
      "オ": "[3(ρ_A＋ρ_B)/ρ_B]L"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "図Ⅰの浮力は断面積Sを使ってgS（ρ_A L＋3ρ_B L）と表せる。これを図Ⅱのρ_B gShに等しいと置けば、h＝（ρ_A＋3ρ_B）L/ρ_Bとなる。",
    "choiceExplanations": {
      "ア": "図Ⅰの液体の体積は、断面積をSとしてAがSL、Bが3SLである。図Ⅱの浮力と等しく置いたとき、分母に2が付くことはない。",
      "イ": "図Ⅰでは下面が境界から3L下にあるので、上層Aに入る長さは1Lである。上層と下層に同じ長さで重みを付ける式は合わない。",
      "ウ": "この式はAの長さを3L、BをLとした値である。実際には上がL、下が3Lなので、両密度に掛ける長さが逆である。",
      "エ": "図Ⅰの浮力は断面積Sを使ってgS（ρ_A L＋3ρ_B L）と表せる。これを図Ⅱのρ_B gShに等しいと置けば、h＝（ρ_A＋3ρ_B）L/ρ_Bとなる。",
      "オ": "上層Aに入る高さはLなので、ρ_Aの係数を3にするのは誤りである。浮力に対応する両層の重み付き密度はρ_A＋3ρ_Bである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q11.webp"
    ],
    "imageAltTexts": [
      "一様な物体が液体AとBの境界をまたいで浮く図Ⅰと、液体Bのみに浮く図Ⅱ。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q12",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "壁と床で反発する小球",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、水平で滑らかな床上から、仰角θ（0＜θ＜π/2）、速さv₀で小球を打ち出したところ、小球は鉛直で滑らかな壁に衝突してはね返り、さらに床との衝突を繰り返した。小球が床と1回目に衝突した地点から2回目に衝突した地点までの水平距離Lとして最も妥当なのはどれか。\nただし、小球と壁、及び、小球と床との間の反発係数を共にe、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "(ev₀²/g) sin θ cos θ",
      "イ": "(2ev₀²/g) sin θ cos θ",
      "ウ": "[e²v₀²/(2g)] sin θ cos θ",
      "エ": "(e²v₀²/g) sin θ cos θ",
      "オ": "(2e²v₀²/g) sin θ cos θ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "壁の反発後の水平速さはev₀ cos θ、最初の床反発直後の上向き速さはev₀ sin θである。水平速さに飛行時間2ev₀ sin θ/gを掛けるとLとなる。",
    "choiceExplanations": {
      "ア": "水平方向には壁、鉛直方向には床での反発が効く。このため積にe²が現れ、全飛行時間には上昇と下降の両方を含む。",
      "イ": "この式では反発係数が一つしか掛かっていない。壁で水平速度が、床で鉛直速度がそれぞれe倍になる。",
      "ウ": "定数因子は1/2ではなく2である。床から床への飛行時間は最高点までの時間ev₀ sin θ/gの2倍となる。",
      "エ": "これは最初の床反発から最高点までに進む水平距離である。次の床衝突までは、上昇と下降を合わせた2倍の時間が掛かる。",
      "オ": "壁の反発後の水平速さはev₀ cos θ、最初の床反発直後の上向き速さはev₀ sin θである。水平速さに飛行時間2ev₀ sin θ/gを掛けるとLとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q12.webp"
    ],
    "imageAltTexts": [
      "右の壁で反発した小球が床に二度衝突する軌跡。二つの床との衝突地点の間にLが示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q13",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "円錐面上の等速円運動",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、軸が鉛直で半頂角θの滑らかな円錐面があり、質量mの小球が高さhの位置で等速円運動をしている。このとき、円運動の周期として最も妥当なのはどれか。\nただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "(2π/tan θ)√(h/g)",
      "イ": "(2π/tan θ)√(gh)",
      "ウ": "2π√(h/g)",
      "エ": "2π tan θ√(h/g)",
      "オ": "2π tan θ√(gh)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "垂直抗力NはN sin θ＝mgを満たし、水平方向にはN cos θ＝mg/tan θが働く。半径h tan θと向心加速度g/tan θから、周期は2π tan θ√(h/g)となる。",
    "choiceExplanations": {
      "ア": "半径はh tan θで、向心加速度はg/tan θになる。周期を出すために半径を加速度で割ると、平方根の外にtan θが残り、逆数にはならない。",
      "イ": "√(gh)は速さの次元を持つので、この式は周期の次元にならない。周期の式では√(h/g)が時間を表す。",
      "ウ": "円運動の半径も向心加速度も半頂角に依存する。2π√(h/g)は角度の因子tan θを落としている。",
      "エ": "垂直抗力NはN sin θ＝mgを満たし、水平方向にはN cos θ＝mg/tan θが働く。半径h tan θと向心加速度g/tan θから、周期は2π tan θ√(h/g)となる。",
      "オ": "角度の因子は合っているが、√(gh)は速さで、時間にならない。円運動の周期は向心加速度と半径から√(h/g)を含む式になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q13.webp"
    ],
    "imageAltTexts": [
      "鉛直軸を持つ円錐面の上で小球が一定の高さhを周回する図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q14",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "縦波・横波と地震波",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「波には、波の進行方向と同じ方向に振動する縦波と、波の進行方向に対して垂直な方向に振動する横波がある。縦波の例としては［㋐］が、横波の例としては［㋑］がある。また、地震の実体波は縦波の［㋒］と横波の［㋓］に分けられ、この［㋒］と［㋓］の到達時間の差は、震源の決定に利用されている。」",
    "choices": {
      "ア": "音波、電磁波、P波、S波",
      "イ": "音波、電磁波、S波、P波",
      "ウ": "水面の波、音波、P波、S波",
      "エ": "水面の波、電磁波、S波、P波",
      "オ": "電磁波、水面の波、P波、S波"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "空気中の音波は疎密の変化が伝わる縦波で、電磁波は電場や磁場が進行方向と垂直な横波である。地震ではP波が縦波、S波が横波に当たる。",
    "choiceExplanations": {
      "ア": "空気中の音波は疎密の変化が伝わる縦波で、電磁波は電場や磁場が進行方向と垂直な横波である。地震ではP波が縦波、S波が横波に当たる。",
      "イ": "前半の音波と電磁波は正しい。後半はP波が縦波、S波が横波なので逆である。",
      "ウ": "空気中の音波は進行方向に沿って気体に疎密が生じるため、横波ではない。水面の波も粒子が複合的に動き、単純な縦波の例とするのは適切でない。",
      "エ": "電磁波を横波とした点は合っている。地震の実体波を縦波S波、横波P波とした点が逆である。",
      "オ": "電磁波では電場と磁場の振動方向は進行方向に垂直である。縦波の例に電磁波を挙げることはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q15",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "動摩擦があるばねの運動",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、粗い水平な床の上でばね定数kのばねの一端を壁に固定し、ばねが自然長となる位置で他端に質量mの小物体を取り付けた。この小物体を水平方向にdだけ引っ張り、静かに手を放したところ、小物体は振動した。このとき、ばねの自然長からの縮みの最大値として最も妥当なのはどれか。\nただし、ばねの長さはdに比べて十分に長いものとし、また、小物体と床の間の動摩擦係数をμ、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "√(d²−2μmgd/k)",
      "イ": "d−2μmg/k",
      "ウ": "d−μmg/k",
      "エ": "μmgd/k",
      "オ": "2μmgd/k"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "最大の縮みをxとすると、ばねのエネルギーの減少はk（d²−x²）/2で、摩擦が失わせるエネルギーはμmg（d＋x）である。両者を等しくしてd＋xで割るとx＝d−2μmg/kとなる。",
    "choiceExplanations": {
      "ア": "この平方根は、動摩擦がdだけの移動で仕事をすると置いた場合に出る。実際には自然長を過ぎて縮みが最大になるまで動くので、その距離も含める必要がある。",
      "イ": "最大の縮みをxとすると、ばねのエネルギーの減少はk（d²−x²）/2で、摩擦が失わせるエネルギーはμmg（d＋x）である。両者を等しくしてd＋xで割るとx＝d−2μmg/kとなる。",
      "ウ": "摩擦の大きさμmgをばね定数で割った値は長さを持つが、エネルギー式から求める縮みの減少分はその2倍である。ばねのエネルギーに係数1/2があるためである。",
      "エ": "μmg/kは長さなので、それにdを掛けた式は長さの二乗になる。求める最大の縮みは長さである。",
      "オ": "摩擦によるエネルギー損失を比べる際、最終的な縮みの位置も考慮する。2μmgd/kは面積と同じ次元を持ち、縮みそのものにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q15.webp"
    ],
    "imageAltTexts": [
      "自然長のばねと、そこから小物体を水平にdだけ引いた状態を示した図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q16",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "空気くさびの干渉",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、2枚の平面ガラス板の一端を密着させ、そこから距離60 mmだけ離れたところに高さ0.030 mmの物体を挟んだ。その後、真上から単色光を当て、真上から観察すると、明暗の縞模様が観察された。この隣り合う明るい縞どうしの間隔が0.50 mmであるとき、当てた単色光の波長として最も妥当なのはどれか。\nただし、2枚の平面ガラス板と物体で囲まれたくさび形の部分には空気が入っているものとする。",
    "choices": {
      "ア": "360 nm",
      "イ": "400 nm",
      "ウ": "500 nm",
      "エ": "900 nm",
      "オ": "1000 nm"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "空気層の厚さは0.50 mm当たり0.030×0.50/60＝0.00025 mm変わる。隣接する明線間で往復光路差が1波長だけ変わるので、波長はその2倍の500 nmである。",
    "choiceExplanations": {
      "ア": "くさびの厚さは0.50 mm進むごとに0.00025 mm増加する。光は空気層を往復するため、光路差の変化は500 nmである。",
      "イ": "400 nmの光なら、同じ傾きのくさびで隣接する明線の間隔は0.40 mmになる。観測された明線の間隔は0.50 mmである。",
      "ウ": "空気層の厚さは0.50 mm当たり0.030×0.50/60＝0.00025 mm変わる。隣接する明線間で往復光路差が1波長だけ変わるので、波長はその2倍の500 nmである。",
      "エ": "900 nmは、傾き0.030/60のくさびで明線間隔0.90 mmに相当する。実際に与えられた間隔からは500 nmとなる。",
      "オ": "1000 nmは明線の間隔を1.0 mmにした場合の値である。反射時の位相変化は明線の位置に影響するが、隣り合う明線の間隔を2倍にはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q16.webp"
    ],
    "imageAltTexts": [
      "一端で接する二枚のガラス板の間に厚さ0.030 mmの物体を挟み、60 mmの空気くさびに光を当てる図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q17",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "理想気体のポリトロープ変化",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "理想気体の状態変化を、ポリトロープ指数nを用いて表すことを考える。理想気体の圧力をp、体積をVとすると、pVⁿが一定となる場合における状態変化に関する次の記述のうち、最も妥当なのはどれか。",
    "choices": {
      "ア": "n＝0は、定積変化に対応する。",
      "イ": "n＝1は、断熱変化に対応する。",
      "ウ": "n＝1は、等温変化に対応する。",
      "エ": "nが比熱比と等しいとき、等温変化に対応する。",
      "オ": "nが比熱比と等しいとき、定圧変化に対応する。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "n＝1のときpVが一定となる。物質量νが一定の理想気体では、状態方程式pV＝νRTにより温度Tも一定になる。",
    "choiceExplanations": {
      "ア": "n＝0ではV⁰＝1だからpが一定である。したがって定圧変化に対応する。",
      "イ": "n＝1ではpVが一定になる。可逆断熱変化では、体積の指数は通常1でなく比熱比γになる。",
      "ウ": "n＝1のときpVが一定となる。物質量νが一定の理想気体では、状態方程式pV＝νRTにより温度Tも一定になる。",
      "エ": "比熱比γが指数となるpV^γ＝一定は、理想気体の可逆断熱変化に対応する。等温変化の指数は1である。",
      "オ": "定圧変化に相当するのはn＝0である。指数が比熱比なら、圧力は体積に応じて変わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q18",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "電界と磁界の速度選別",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "互いに直交する大きさEの一様な電界と、磁束密度の大きさBの一様な磁界がある。図のように、質量m、電気量qの荷電粒子を、速さvで、この電界と磁界の双方に直交するように入射させたところ、等速直線運動を続けた。このとき、vとして最も妥当なのはどれか。",
    "choices": {
      "ア": "E/B",
      "イ": "B/E",
      "ウ": "qE/B",
      "エ": "mE/(qB)",
      "オ": "qB/(mE)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "等速直線運動では合力が0であり、逆向きの電気力と磁気力の大きさが等しい。|q|E＝|q|vBよりv＝E/Bとなる。",
    "choiceExplanations": {
      "ア": "等速直線運動では合力が0であり、逆向きの電気力と磁気力の大きさが等しい。|q|E＝|q|vBよりv＝E/Bとなる。",
      "イ": "B/Eは、力のつり合いから得る値の逆数である。vを求めるにはE＝vBをBで割る。",
      "ウ": "電気力にも磁気力にも電荷の絶対値|q|が掛かる。つり合い式で消えるので、速度にqは残らない。",
      "エ": "加速度が0なので、質量mは速度の条件に影響しない。電荷も両方の力の共通因子として消える。",
      "オ": "この組合せには質量と電荷が残っている。つり合いは二つの力だけで決まり、vは電界Eと磁束密度Bの比になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q18.webp"
    ],
    "imageAltTexts": [
      "下向きの電界、紙面の奥向きの磁界と、右向きに入射する荷電粒子の図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q19",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "直並列回路の分圧",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰ、Ⅱのような、50 Vの電源と抵抗値が2 Ω、4 Ω、12 Ωの三つの抵抗から成る回路がある。図Ⅰ、Ⅱの回路において、抵抗値が12 Ωの抵抗にかかる電圧をそれぞれV₁、V₂としたとき、V₁/V₂として最も妥当なのはどれか。",
    "choices": {
      "ア": "2/3",
      "イ": "3/4",
      "ウ": "1",
      "エ": "4/3",
      "オ": "3/2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "図Ⅰの12 Ωと4 Ωの並列合成は3 ΩなのでV₁＝50×3/(3＋2)＝30 Vである。図Ⅱの4 Ωと2 Ωの並列合成は4/3 ΩなのでV₂＝50×12/(12＋4/3)＝45 Vとなり、比は2/3になる。",
    "choiceExplanations": {
      "ア": "図Ⅰの12 Ωと4 Ωの並列合成は3 ΩなのでV₁＝50×3/(3＋2)＝30 Vである。図Ⅱの4 Ωと2 Ωの並列合成は4/3 ΩなのでV₂＝50×12/(12＋4/3)＝45 Vとなり、比は2/3になる。",
      "イ": "3/4になるには45 Vの3/4がV₁でなければならない。図Ⅰは直列の2 Ωと並列部3 Ωで分圧するため、V₁は30 Vとなる。",
      "ウ": "図Ⅰでは12 Ωが並列部にあり、図Ⅱでは12 Ωが他の並列部に直列につながる。この違いで、12 Ωにかかる電圧は図Ⅰより図Ⅱの方が大きい。",
      "エ": "V₁は電源の3/5、V₂は電源の9/10である。したがって、V₁/V₂が1を超えることはない。",
      "オ": "3/2は45 Vを30 Vで割った逆の比V₂/V₁である。設問の順番で割ると2/3になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q19.webp"
    ],
    "imageAltTexts": [
      "50 V電源と2 Ω、4 Ω、12 Ωの抵抗を異なる直並列の関係でつないだ二つの回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q20",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "箔検電器の静電誘導と接地",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "金属円板、金属棒、2枚の金属箔をゴム栓でガラス瓶に固定した図Ⅰのような器具を箔検電器という。金属円板に帯電した物体を近づけたり接触させたりすると、箔が帯電し、斥力により箔が開く。次の①、②、③の操作をした後の箔の開閉の組合せとして最も妥当なのはどれか。\n① 帯電しておらず箔が閉じた箔検電器の金属円板に、図Ⅱのように、正に帯電した物体を接触しないように近づけ、その後、金属円板に指で触れた。\n② ①に続いて、図Ⅲのように、金属円板から指を離し、その後、物体を遠ざけた。\n③ ②に続いて、図Ⅳのように、金属円板に負に帯電した物体を接触しないように近づけた。",
    "choices": {
      "ア": "閉、閉、開",
      "イ": "閉、開、開",
      "ウ": "開、開、閉",
      "エ": "開、閉、開",
      "オ": "開、開、開"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "①では接地すると正の物体に引かれた電子が流れ込み、箔は閉じる。②では残った負電荷が箔に広がって開き、③では近づけた負電荷が電子を箔側へ押すので開いたままとなる。",
    "choiceExplanations": {
      "ア": "指で接地している①で箔は閉じるが、②では指を先に離すため検電器に負電荷が残る。物体を遠ざけるとその電荷が箔にも分布し、箔が開く。",
      "イ": "①では接地すると正の物体に引かれた電子が流れ込み、箔は閉じる。②では残った負電荷が箔に広がって開き、③では近づけた負電荷が電子を箔側へ押すので開いたままとなる。",
      "ウ": "①の接地によって箔の電荷の偏りは解消され、箔は閉じる。③では負の物体を近づけるので、既に負の電荷を持つ箔は互いに反発し続ける。",
      "エ": "②の指を離す操作では検電器に入った電荷は逃げない。正の物体を遠ざけると、残った負電荷が箔へ移動して箔が開く。",
      "オ": "開閉がすべて開になるわけではない。①では円板に指で触れたことで検電器が接地され、箔が閉じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q20-i.webp",
      "/questions/kokka-ippan-dai/2025/senmon-digital/q20.webp"
    ],
    "imageAltTexts": [
      "金属円板、金属棒、金属箔、ゴム栓、ガラス瓶から成る箔検電器の図Ⅰ。",
      "正に帯電した物体と指を近づける操作、指と物体を離した状態、負に帯電した物体を近づける操作を示す図Ⅱ～Ⅳ。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q21",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "組合せと条件付き確率",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「表面に1から13までの数字が一つずつ書かれ、数字が1～5の裏面が赤色、6～10の裏面が青色、11～13の裏面が黄色の13枚のカードが箱の中にある。このとき、箱の中からカードを2枚取り出す組合せの数は［㋐］通りであり、取り出した2枚の数字の和が20以下になる確率は［㋑］である。また、取り出した2枚の数字の和が20以下のとき、2枚とも裏面が青色以外の色である確率は［㋒］である。」",
    "choices": {
      "ア": "156、23/26、25/69",
      "イ": "156、67/78、34/67",
      "ウ": "78、23/26、34/69",
      "エ": "78、23/26、25/69",
      "オ": "78、67/78、34/67"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全組合せは13×12/2＝78通りで、和が20を超える9通りを除くと69通り、よって確率は23/26である。その69通りのうち、青色を含まないのは赤2枚の10通りと赤・黄の15通りなので、条件付き確率は25/69となる。",
    "choiceExplanations": {
      "ア": "156は取り出す順序を区別した13×12である。2枚の組合せは同じ2枚の逆順をまとめるので、その半分の78通りである。",
      "イ": "組合せには順序を入れず、13×12/2で数える。数字の和が20より大きい組合せは9通りなので、20以下は67通りではなく69通りになる。",
      "ウ": "条件を満たす全69通りのうち、両方とも青色以外なのは、赤2枚が10通り、赤と黄が15通りである。黄2枚は和が20を超えるため、分子は34にならない。",
      "エ": "全組合せは13×12/2＝78通りで、和が20を超える9通りを除くと69通り、よって確率は23/26である。その69通りのうち、青色を含まないのは赤2枚の10通りと赤・黄の15通りなので、条件付き確率は25/69となる。",
      "オ": "和が21から25となる組合せは順に3、2、2、1、1通りである。全78通りから計9通りを引くので、条件付き確率の分母にもなる条件成立数は69である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q22",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "零点探索の数値計算",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "一変数方程式の解の数値計算に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「以下の関数f(x)を考える。\nf(x)＝0.5x−0.5（x＜−1）\nf(x)＝x（−1≦x≦2）\nf(x)＝0.5x＋1（2＜x）\n区間［−2、4］における方程式f(x)＝0の解の近似値を求めるために、ニュートン法、はさみうち法又は二分法のアルゴリズムを用いることを考える。関数f(x)が区間［−2、4］において［㋐］点を持つため、これら三つのうちニュートン法を用いるとアルゴリズムが収束しないことがある。一方、関数f(x)は区間［−2、4］において［㋑］であるから、はさみうち法と二分法のアルゴリズムは解に収束する。はさみうち法と二分法は方程式f(x)＝0の解を含むと考えられる区間［a、b］を繰り返し更新して解を求めるが、区間［a、b］の初期値として区間［−2、4］を用いたときに、区間［a、b］の1回以下の更新で近似値ではなくf(x)＝0の真の解x＝0を得られるアルゴリズムは、はさみうち法と二分法のうち［㋒］である。」",
    "choices": {
      "ア": "微分可能な、連続、二分法",
      "イ": "微分できない、連続、はさみうち法",
      "ウ": "微分できない、連続、二分法",
      "エ": "連続な、微分可能、はさみうち法",
      "オ": "連続な、微分可能、二分法"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "x＝−1と2で式の値はつながるが傾きが変わるので、関数は連続で、その2点では微分できない。両端（−2、−1.5）と（4、3）を結ぶ直線はx＝0で横軸を横切り、はさみうち法は最初に真の解を得る。",
    "choiceExplanations": {
      "ア": "折れ目x＝−1とx＝2では片側微分係数が異なるため、微分はできない。二分法が初めに試す値もx＝1なので、解の0とは異なる。",
      "イ": "x＝−1と2で式の値はつながるが傾きが変わるので、関数は連続で、その2点では微分できない。両端（−2、−1.5）と（4、3）を結ぶ直線はx＝0で横軸を横切り、はさみうち法は最初に真の解を得る。",
      "ウ": "関数が連続で折れ目が微分できない点までは合っている。二分法が最初に試す−2と4の中点は1で、解は得られない。",
      "エ": "はさみうち法を選んだ点は合っている。f(x)はx＝−1と2で左右の傾きが違うため、区間全体で微分可能ではない。",
      "オ": "両方の折れ目で関数の値は連続だが、左右の傾きが異なり微分できない。二分法の最初の中点では真の解を得られない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q23",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "排他的論理和の構成",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような論理回路において、入力A、Bと出力Zの関係が以下の真理値表で示されるとき、図の㋐に当てはまる図記号として最も妥当なのはどれか。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "上段の出力は（NOT A）AND Bなので、下段でA AND（NOT B）を作ってORで合わせる。二つの入力が異なるときだけZが1になる。",
    "choiceExplanations": {
      "ア": "空欄の入力はAとNOT Bである。ORではA＝B＝0のときにNOT Bが1なので、指定に反してZが1になる。",
      "イ": "上段の出力は（NOT A）AND Bなので、下段でA AND（NOT B）を作ってORで合わせる。二つの入力が異なるときだけZが1になる。",
      "ウ": "NANDを選ぶと、A＝0かつB＝0の場合に下段が1、上段が0となる。真理値表ではこのときZは0でなければならない。",
      "エ": "NORは空欄への入力が両方0のときだけ1を出す。A＝1、B＝0の場合は下段も上段も0となり、要求されるZ＝1を得られない。",
      "オ": "XORを下段に置くと、A＝B＝0で下段の入力が0と1になって出力が1になる。真理値表のZ＝0と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q23.webp"
    ],
    "imageAltTexts": [
      "入力A・Bと出力Zの真理値表、およびNOTとANDを経る上段と、図記号が空欄の下段を持つ回路。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2025/senmon-digital/q23-1.webp",
      "イ": "/questions/kokka-ippan-dai/2025/senmon-digital/q23-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2025/senmon-digital/q23-3.webp",
      "エ": "/questions/kokka-ippan-dai/2025/senmon-digital/q23-4.webp",
      "オ": "/questions/kokka-ippan-dai/2025/senmon-digital/q23-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q24",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "GPUの並列処理",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "演算装置に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「中央処理演算装置がコンピュータの制御や汎用的な演算機能を有するのに対し、画像処理装置は［㋐］とも呼ばれ、画像処理を目的として開発された演算装置である。特に、［㋐］は3次元グラフィックスにおける頂点計算や陰影処理で使用される大量の［㋑］を高速に行うことを得意とし、［㋒］能力が高い。最近は、その演算能力を生かし、［㋐］は機械学習にも応用される。」",
    "choices": {
      "ア": "ASIC、行列演算、逐次処理",
      "イ": "ASIC、分岐処理、並列処理",
      "ウ": "GPU、行列演算、並列処理",
      "エ": "GPU、行列演算、逐次処理",
      "オ": "GPU、分岐処理、並列処理"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "画像処理装置はGPUと呼ばれ、行列演算を多く含む画像処理を並列に実行するのが得意である。この能力は機械学習で用いる行列演算にも生かせる。",
    "choiceExplanations": {
      "ア": "ASICは特定用途向け集積回路の総称で、画像処理装置を指す名称はGPUである。行列演算を多数同時にこなす並列処理が特徴になる。",
      "イ": "ASICは画像処理装置に固有の名称ではない。GPUが多くの要素を高速に処理できるのは、分岐の多さよりも行列などに対する並列処理に強いためである。",
      "ウ": "画像処理装置はGPUと呼ばれ、行列演算を多く含む画像処理を並列に実行するのが得意である。この能力は機械学習で用いる行列演算にも生かせる。",
      "エ": "GPUと行列演算は合っている。多数の演算要素を同時に動かすのがGPUの利点であり、空欄に入るのは逐次処理より並列処理である。",
      "オ": "GPUは並列処理に強いが、頂点の座標変換などで多用されるのは行列演算である。多数の分岐で処理内容がばらつくと並列実行の効率が下がる場合がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q25",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "タスクのスケジューリング",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "三つのタスクA、B、Cをそれぞれ単独で実行した場合における、演算装置と入出力装置の動作順序及び処理時間は、表のとおりである。この演算装置と入出力装置から成るシステムがタスク実行可能な状態において、A、B、Cの順番で1秒間隔に処理要求が到着し、演算装置は処理要求の到着順に処理を行うとき、Aのタスクが到着してから三つのタスクが全て完了するまでに要する時間として最も妥当なのはどれか。\nただし、演算装置は同時に一つのみ演算処理を実行可能で、入出力装置は競合せず、表に示す処理時間以外は考慮しないものとする。",
    "choices": {
      "ア": "14秒",
      "イ": "15秒",
      "ウ": "16秒",
      "エ": "17秒",
      "オ": "18秒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "A、B、Cの最初の演算は順に0～2、2～4、4～5秒で、入出力の完了はそれぞれ12、11、10秒となる。残る演算はCが10～12秒、Bが12～14秒、Aが14～16秒である。",
    "choiceExplanations": {
      "ア": "14秒の時点では、先に入出力を終えて待っていたBの最後の演算までが済む。Aの最後の演算が14秒から2秒残っている。",
      "イ": "Cの最後の演算が終わる12秒から、BとAの演算が2秒ずつ続く。15秒の時点では最後の演算処理の途中である。",
      "ウ": "A、B、Cの最初の演算は順に0～2、2～4、4～5秒で、入出力の完了はそれぞれ12、11、10秒となる。残る演算はCが10～12秒、Bが12～14秒、Aが14～16秒である。",
      "エ": "演算装置が空いており、Cの入出力が終わる10秒から最後の演算を開始できる。そこから2秒の演算が三つ続くので16秒で完了する。",
      "オ": "最初の5秒でA、B、Cの初回演算が終わり、入出力は並行に進む。最終演算は10秒から空き時間を挟まず6秒で済むので、18秒は長すぎる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q25.webp"
    ],
    "imageAltTexts": [
      "タスクA・B・Cの演算と入出力の順序、その処理時間を示す表。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q26",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "M/M/1待ち行列",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "待ち行列に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「ある窓口は、客の到着間隔が平均4分である。窓口は一つであり、客は一人ずつ順番に窓口でサービスを受け、窓口における客一人当たりのサービス処理時間は平均3分である。客は、窓口に到着したとき、窓口が塞がっていれば、空くまで待ち行列に入るとする。このとき、窓口で待っている客の数は、サービスを受けている客を含めて平均［㋐］人であり、客が窓口に到着してからサービスを受け終わるまでの時間の平均は［㋑］分である。また、窓口のサービス処理時間の平均が大きくなり、客の到着間隔の平均に近づくと、客が窓口に到着してからサービスを受け終わるまでの時間の平均は［㋒］。\nただし、客の到着及びサービス処理は、M/M/1待ち行列モデルに従うものとする。\nまた、M/M/1待ち行列モデルにおいて、客の数の平均Eは、単位時間当たりの客の平均到着人数λ、単位時間当たりの窓口の平均サービス処理数μを用いて、以下のように表される。\nE＝ρ/(1−ρ)　ただしρ＝λ/μ」",
    "choices": {
      "ア": "3/4、9/4、特定の値に近づく",
      "イ": "3/4、21/4、限りなく大きくなる",
      "ウ": "3、9、特定の値に近づく",
      "エ": "3、12、特定の値に近づく",
      "オ": "3、12、限りなく大きくなる"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "利用率は（1/4）÷（1/3）＝3/4、平均人数は3人である。平均滞在時間は3÷（1/4）＝12分で、利用率が1に近づくと限りなく大きくなる。",
    "choiceExplanations": {
      "ア": "3/4は平均人数ではなく、窓口の利用率ρである。平均人数はρ/(1−ρ)＝3である。",
      "イ": "処理時間を到着間隔に近づけると滞在時間が発散する点は合っている。平均人数は3人で、到着率1/4で割った平均滞在時間は12分になる。",
      "ウ": "9分は平均滞在時間12分から平均サービス時間3分を引いた、サービス前の平均待ち時間である。設問はサービスを受け終わるまでの時間を求めている。",
      "エ": "3人、12分は正しい。処理時間が平均到着間隔に近づくと利用率が1に近づくため、滞在時間は有限値に収まらない。",
      "オ": "利用率は（1/4）÷（1/3）＝3/4、平均人数は3人である。平均滞在時間は3÷（1/4）＝12分で、利用率が1に近づくと限りなく大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q27",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "移動平均フィルタ",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "離散時間信号に対するデジタルフィルタに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「移動平均フィルタは、［㋐］インパルス応答フィルタの一種で、［㋑］フィルタとして機能する。サンプリング周期がT、時刻tにおける信号の値x(t)が表のとおりとなる離散時間信号に対して、窓幅5サンプルの移動平均フィルタを適用したとき、時刻7Tにおけるフィルタの出力は［㋒］となる。」",
    "choices": {
      "ア": "無限、ハイパス、6",
      "イ": "無限、ローパス、5",
      "ウ": "有限、ハイパス、4",
      "エ": "有限、ローパス、5",
      "オ": "有限、ローパス、6"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "窓幅が有限なのでFIRで、平均によって速い変化を抑えるローパスである。3Tから7Tまでの値は13、15、2、−11、6で、平均は5である。",
    "choiceExplanations": {
      "ア": "有限個の入力値だけを平均するので、インパルス応答は有限である。値を平均すると短い周期の変動が弱まるため、ローパスとして働く。",
      "イ": "ローパスと出力5は合っている。窓幅5サンプルの移動平均は、インパルスの影響が有限の期間で消えるFIRである。",
      "ウ": "有限インパルス応答である点は合っているが、平均化は高周波成分を抑える。過去4サンプルと現在の和25を5で割るので、出力は4ではなく5である。",
      "エ": "窓幅が有限なのでFIRで、平均によって速い変化を抑えるローパスである。3Tから7Tまでの値は13、15、2、−11、6で、平均は5である。",
      "オ": "6は時刻7Tの入力値そのものである。フィルタ出力にはそれ以前の4点も含めるので、値は5になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q27.webp"
    ],
    "imageAltTexts": [
      "時刻0から14Tまでの離散時間信号の値を示した表。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q28",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "IPv4とIPv6のアドレス",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "IPアドレスに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「IP（インターネットプロトコル）には、代表的なものとしてIPv4とIPv6のバージョンがあり、IPv6のIPアドレスは［㋐］ビットで構成され、IPv4のIPアドレスは32ビットで構成される。IPv4において一般的にIPアドレスは［㋑］と［㋒］で表され、［㋑］は端末が属しているグループを表し、［㋒］はグループ内で端末を識別するために利用される。」",
    "choices": {
      "ア": "64、ホスト部、ネットワーク部",
      "イ": "64、ネットワーク部、ホスト部",
      "ウ": "128、ホスト部、ネットワーク部",
      "エ": "128、サブネットプレフィックス、インターフェースID",
      "オ": "128、ネットワーク部、ホスト部"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "IPv6アドレスは128ビットで構成される。IPv4ではネットワーク部が所属するネットワークを、ホスト部がネットワーク内の端末を識別する。",
    "choiceExplanations": {
      "ア": "IPv6アドレス全体は128ビットである。IPv4で属するグループを識別する役割も、ホスト部ではなくネットワーク部にある。",
      "イ": "IPv4についてはネットワーク部、ホスト部の順で正しい。IPv6アドレス全体の長さは64ビットでなく128ビットである。",
      "ウ": "128ビットは正しいが、IPv4の二つの部分の役割が逆である。同じネットワーク内ではホスト部で機器を区別する。",
      "エ": "サブネットプレフィックスとインターフェースIDはIPv6を構成する際に用いる用語である。設問の後半が求めているIPv4の一般的な区分はネットワーク部とホスト部である。",
      "オ": "IPv6アドレスは128ビットで構成される。IPv4ではネットワーク部が所属するネットワークを、ホスト部がネットワーク内の端末を識別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q29",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "二種類の誘電体を含む球形コンデンサ",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、真空中に同心で半径aの導体球と内径b、外径cの球殻状導体が置かれている。導体間の領域を導体球の中心を通る平面で二等分し、一方を誘電率ε₁の誘電体、他方を誘電率ε₂の誘電体で満たした。このときの導体間の静電容量として最も妥当なのはどれか。",
    "choices": {
      "ア": "πab(ε₁＋ε₂)/(b−a)",
      "イ": "2πab(ε₁＋ε₂)/(b−a)",
      "ウ": "4πab(ε₁＋ε₂)/(b−a)",
      "エ": "2πac(ε₁＋ε₂)/(c−a)",
      "オ": "4πac(ε₁＋ε₂)/(c−a)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図では「内径」とあるbが中心から球殻内面までの半径として示されている。導体間が同じ電位差を共有する二つの半球は並列で、容量2πε₁ab/(b−a)と2πε₂ab/(b−a)を足す。",
    "choiceExplanations": {
      "ア": "各誘電体が占める立体角は半球の2πである。半球ごとの容量に現れる係数はπでなく2πである。",
      "イ": "図では「内径」とあるbが中心から球殻内面までの半径として示されている。導体間が同じ電位差を共有する二つの半球は並列で、容量2πε₁ab/(b−a)と2πε₂ab/(b−a)を足す。",
      "ウ": "4πは全方向を一種類の誘電体で満たした同心球の係数である。各誘電体は半球を占めるため、それぞれの寄与を半分にして加える。",
      "エ": "容量を決める電界があるのは内側導体表面aと球殻の内面bの間である。球殻外面cを境界として使う式は合わない。",
      "オ": "球殻の導体内部には静電場がないため、半径cはこの設問の導体間容量に入らない。さらに各半球に対応する係数は4πでなく2πである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q29.webp"
    ],
    "imageAltTexts": [
      "中心から内側導体の表面までの距離a、球殻の内面までの距離b、外面までの距離cと、左右の誘電体を示す図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q30",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "平行電流が導体に及ぼす力",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "真空中において、同一平面内に、無限に長い3本の直線状導体が互いに平行に置かれている。直線状導体を左から順にa、b、cとすると、aとbの間隔は5 m、bとcの間隔は2 mである。また、a、bには同じ向きに、cには逆向きにそれぞれ3 Aの直流電流が流れているものとする。このとき、bがaとcに流れる電流によって受ける1 m当たりの力の大きさとして最も妥当なのはどれか。\nただし、真空の透磁率を4π×10⁻⁷ H/mとする。",
    "choices": {
      "ア": "1.3×10⁻⁶ N",
      "イ": "1.9×10⁻⁶ N",
      "ウ": "2.5×10⁻⁶ N",
      "エ": "3.0×10⁻⁶ N",
      "オ": "3.6×10⁻⁶ N"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "単位長さ当たりの力はμ₀I₁I₂/(2πr)で、aからは左向きに3.6×10⁻⁷ N、cからも左向きに9.0×10⁻⁷ Nを受ける。合計1.26×10⁻⁶ Nは選択肢の1.3×10⁻⁶ Nに最も近い。",
    "choiceExplanations": {
      "ア": "単位長さ当たりの力はμ₀I₁I₂/(2πr)で、aからは左向きに3.6×10⁻⁷ N、cからも左向きに9.0×10⁻⁷ Nを受ける。合計1.26×10⁻⁶ Nは選択肢の1.3×10⁻⁶ Nに最も近い。",
      "イ": "距離5 mの導体からの力は3.6×10⁻⁷ N、距離2 mの導体からは9.0×10⁻⁷ Nである。両者を加えた値は1.9×10⁻⁶ Nに達しない。",
      "ウ": "bは同じ向きの電流を流すaに引かれ、逆向きの電流を流すcから反発する。どちらも左向きだが、力の式の分母は2πrであり、合計は約1.3×10⁻⁶ Nである。",
      "エ": "力は導体間隔に反比例する。二つの距離5 mと2 mをそれぞれ使うと、合力は約1.3×10⁻⁶ Nになる。",
      "オ": "導体aによる力の大きさは3.6×10⁻⁷ Nで、指数は−6ではない。cからの反発力も加えると1.26×10⁻⁶ Nになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q31",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "キルヒホッフの電流則",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、電流Iの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "3.0 A",
      "イ": "3.5 A",
      "ウ": "4.0 A",
      "エ": "4.5 A",
      "オ": "5.0 A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "下端を0 V、中央の節点をVとすると、5＝V/3＋（V−10）/2である。V＝12 Vを得るため、3.0 Ωを下向きに流れる電流Iは4.0 Aである。",
    "choiceExplanations": {
      "ア": "3.0 Aの場合、3.0 Ωの上側は9 Vとなる。その電位では左枝からも電流が流れ込むため、5.0 Aの右枝と合わせると電流のつり合いが取れない。",
      "イ": "3.5 Aなら上側の節点電圧は10.5 Vで、左枝へ流れるのは0.25 Aである。右枝から入る5.0 Aと合わず、節点の電流則を満たさない。",
      "ウ": "下端を0 V、中央の節点をVとすると、5＝V/3＋（V−10）/2である。V＝12 Vを得るため、3.0 Ωを下向きに流れる電流Iは4.0 Aである。",
      "エ": "4.5 Aでは節点が13.5 Vとなり、左枝へ出る1.75 Aと合わせて流出が6.25 Aになる。右枝の電流源が供給する5.0 Aより多い。",
      "オ": "右枝から来る5.0 Aはすべて3.0 Ωへ進むわけではない。節点の電圧が12 Vとなり、1.0 Aが左の2.0 Ω側へ流れる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q31.webp"
    ],
    "imageAltTexts": [
      "10 Vの電圧源側と5 Aの電流源側の間に、下向き電流Iが流れる3 Ωの枝を持つ回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q32",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "直列RC回路の力率",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、8 Ωの抵抗とコンデンサを直列に接続した交流回路がある。この回路において、電源の周波数を50 Hzにしたときの回路の力率は、80％になった。電源の周波数を25 Hzにしたときの回路の力率として最も妥当なのはどれか。",
    "choices": {
      "ア": "40％",
      "イ": "42％",
      "ウ": "56％",
      "エ": "60％",
      "オ": "68％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "50 Hzの力率からインピーダンスの大きさが10 Ω、容量リアクタンスが√(10²−8²)＝6 Ωと分かる。25 Hzではリアクタンスが12 Ωとなるので、力率は8/√(8²＋12²)で約55.5％となる。",
    "choiceExplanations": {
      "ア": "周波数を半分にすると容量リアクタンスが2倍になる。抵抗は一定で、力率は抵抗とインピーダンスの比なので、力率自体をそのまま半分にすることはできない。",
      "イ": "50 Hzでのインピーダンスの大きさは8/0.8＝10 Ωで、容量リアクタンスは6 Ωである。これを倍にして抵抗と直角方向に合成すると、力率は42％より大きい。",
      "ウ": "50 Hzの力率からインピーダンスの大きさが10 Ω、容量リアクタンスが√(10²−8²)＝6 Ωと分かる。25 Hzではリアクタンスが12 Ωとなるので、力率は8/√(8²＋12²)で約55.5％となる。",
      "エ": "25 Hzの容量リアクタンスは12 Ωなので、合成インピーダンスは約14.42 Ωになる。8 Ωとの比は約55.5％であり、60％より56％が近い。",
      "オ": "容量リアクタンスは周波数に反比例するため、半分の周波数では6 Ωから12 Ωになる。このとき力率は68％まで高くならず、約55.5％である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q32.webp"
    ],
    "imageAltTexts": [
      "8 Ωの抵抗とコンデンサを交流電源に直列に接続した回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q33",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "四端子回路の縦続行列",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような四端子回路において、電圧V₁、V₂及び電流I₁、I₂を図の向きにとったとき、それらの関係式は、縦続行列［A B；C D］を用いて、［V₁；I₁］＝［A B；C D］［V₂；I₂］で表される。\nこのとき、図Ⅱのような四端子回路の縦続行列［A B；C D］のBとして最も妥当なのはどれか。",
    "choices": {
      "ア": "Z₁＋Z₂＋Z₁Z₃/Z₁",
      "イ": "Z₁＋Z₂＋Z₁Z₃/Z₂",
      "ウ": "Z₁＋Z₃＋Z₁Z₃/Z₁",
      "エ": "Z₁＋Z₃＋Z₁Z₃/Z₂",
      "オ": "Z₂＋Z₃＋Z₁Z₂/Z₃"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "BはV₂＝0としたときのV₁/I₂である。中点電圧はZ₃I₂となり、Z₁を流れる電流はI₂＋Z₃I₂/Z₂なので、B＝Z₁＋Z₃＋Z₁Z₃/Z₂となる。",
    "choiceExplanations": {
      "ア": "Z₁とZ₃が直列の腕で、Z₂は中点の分路である。Bの式では中点で生じる分路電流の寄与がZ₁Z₃/Z₂となる。",
      "イ": "分路電流による補正項は正しい。Bの加算項には両側に直列に入るZ₁とZ₃が必要で、Z₂を直接加えることはできない。",
      "ウ": "Z₁＋Z₃は直列の寄与として正しい。残りの項は中点の分路への電流で生じるため、分母はZ₁でなくZ₂である。",
      "エ": "BはV₂＝0としたときのV₁/I₂である。中点電圧はZ₃I₂となり、Z₁を流れる電流はI₂＋Z₃I₂/Z₂なので、B＝Z₁＋Z₃＋Z₁Z₃/Z₂となる。",
      "オ": "Z₂は横から接地される分路であるため、直列抵抗の和としてZ₃に加えない。分路に関わる項も、分母はZ₃ではなくZ₂になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q33.webp"
    ],
    "imageAltTexts": [
      "電圧と電流の符号を定める四端子回路と、直列Z₁、分路Z₂、直列Z₃のT形回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q34",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "RC回路のブロック線図",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、入力電圧をe_i(t)、出力電圧をe_o(t)とみなしたときのブロック線図として最も妥当なのはどれか。\nただし、e_i(t)、e_o(t)のラプラス変換をE_i(s)、E_o(s)とする。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "抵抗電流は［E_i(s)−E_o(s)］/Rで、コンデンサの電圧はその電流の1/(sC)倍である。出力をそのまま入力から減算する負帰還と、二つの直列ブロックで表せる。",
    "choiceExplanations": {
      "ア": "抵抗を流れる電流は入力電圧のR倍ではなく、抵抗両端の電圧をRで割った値である。出力を差し引く分岐も必要なので、この直列ブロックでは表せない。",
      "イ": "1/Rと1/(sC)のブロック自体は電圧から電流、電流から電圧への変換に使える。ここでは入力から出力を引く負帰還が抜けている。",
      "ウ": "負帰還の位置は適切だが、抵抗のブロックをR、コンデンサのブロックをsCとした点が逆である。電圧差を電流に変えるには1/R、電流から出力電圧へは1/(sC)を用いる。",
      "エ": "抵抗電流は［E_i(s)−E_o(s)］/Rで、コンデンサの電圧はその電流の1/(sC)倍である。出力をそのまま入力から減算する負帰還と、二つの直列ブロックで表せる。",
      "オ": "この図ではコンデンサの1/(sC)が帰還側にあり、出力の手前で電流を出力電圧に変換していない。コンデンサの変換は抵抗に続く順方向に置く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q34.webp"
    ],
    "imageAltTexts": [
      "抵抗Rが直列、コンデンサCが分路に入り、Cの端子電圧を出力とする回路。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2025/senmon-digital/q34-1.webp",
      "イ": "/questions/kokka-ippan-dai/2025/senmon-digital/q34-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2025/senmon-digital/q34-3.webp",
      "エ": "/questions/kokka-ippan-dai/2025/senmon-digital/q34-4.webp",
      "オ": "/questions/kokka-ippan-dai/2025/senmon-digital/q34-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q35",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "変圧器の銅損と鉄損",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "変圧器の損失に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「変圧器における損失には、主に、巻線に電流が流れることによるジュール熱である［㋐］や、ヒステリシス損や渦電流損から成る［㋑］がある。図のような簡易等価回路で表される変圧器においては、［㋐］は［㋒］の式で表される。\nただし、r₁は一次巻線抵抗、x₁は一次漏れリアクタンス、g₀は励磁コンダクタンス、b₀は励磁サセプタンス、r₂′、x₂′、I₂′はそれぞれ二次巻線抵抗、二次漏れリアクタンス、二次電流を一次換算したものである。」",
    "choices": {
      "ア": "鉄損、銅損、(r₁＋r₂′)I₂′²",
      "イ": "鉄損、銅損、(1/g₀＋r₁＋r₂′)I₂′²",
      "ウ": "鉄損、銅損、(1/g₀＋r₁＋r₂′＋1/b₀＋x₁＋x₂′)I₂′²",
      "エ": "銅損、鉄損、(r₁＋r₂′)I₂′²",
      "オ": "銅損、鉄損、(1/g₀＋r₁＋r₂′＋1/b₀＋x₁＋x₂′)I₂′²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "巻線のジュール損失を銅損、鉄心のヒステリシス損と渦電流損を鉄損という。図の簡易等価回路の銅損は一次換算した直列抵抗r₁＋r₂′にI₂′²を掛けた値である。",
    "choiceExplanations": {
      "ア": "巻線抵抗による損失は銅損で、鉄心のヒステリシスや渦電流による損失は鉄損である。巻線抵抗を使う式は銅損を表す。",
      "イ": "励磁コンダクタンスは励磁分路の実電力損失に関わり、巻線とは別の枝にある。1/g₀を等価直列巻線抵抗に足して二次換算電流の二乗を掛ける式は合わない。",
      "ウ": "鉄損と銅損の名称が逆である。理想的なリアクタンスやサセプタンスは実電力を消費する巻線抵抗と同じ扱いにはならない。",
      "エ": "巻線のジュール損失を銅損、鉄心のヒステリシス損と渦電流損を鉄損という。図の簡易等価回路の銅損は一次換算した直列抵抗r₁＋r₂′にI₂′²を掛けた値である。",
      "オ": "銅損と鉄損の順は合っている。銅損には一次換算した巻線の抵抗だけを使い、励磁分路の成分や漏れリアクタンスは加えない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q35.webp"
    ],
    "imageAltTexts": [
      "変圧器の一次換算した簡易等価回路。励磁分路と巻線抵抗、漏れリアクタンスが描かれる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q36",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "送電損失とフェランチ効果",
      "デジタル・電気・電子",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "送電線路に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n・一つの送電線路において、同一負荷に対して電力を供給する場合、送電電圧を2倍にすると、送電線路の抵抗による損失は元の電圧のときと比べて［㋐］となる。ただし、線路定数は不変とする。\n・線路電圧が高く、亘長が長くなった場合に、受電端が開放又は軽負荷の状態では、線路定数のうち［㋑］の影響が大きくなり、進み電流が線路に流れるため、受電端電圧値が送電端電圧値よりも大きくなることをフェランチ効果という。フェランチ効果への対策としては、［㋒］を接続するなどがある。",
    "choices": {
      "ア": "1/2、静電容量、分路リアクトル",
      "イ": "1/2、インダクタンス、進相コンデンサ",
      "ウ": "1/4、静電容量、分路リアクトル",
      "エ": "1/4、静電容量、進相コンデンサ",
      "オ": "1/4、インダクタンス、進相コンデンサ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "同じ電力を送る電流は電圧が倍になると半分なので、抵抗損失は1/4になる。軽負荷時に線路の静電容量によって流れる進み電流は、分路リアクトルで補償できる。",
    "choiceExplanations": {
      "ア": "電圧を倍にすると、同じ電力を送る電流が半分になる。抵抗損失はその電流の二乗に比例するため、1/2ではなく1/4になる。",
      "イ": "進み電流は線路の静電容量により生じる。静電容量の影響を打ち消すために、進相コンデンサでさらに容量成分を加える方法は合わない。",
      "ウ": "同じ電力を送る電流は電圧が倍になると半分なので、抵抗損失は1/4になる。軽負荷時に線路の静電容量によって流れる進み電流は、分路リアクトルで補償できる。",
      "エ": "損失比と静電容量は合っている。進相コンデンサは容量性の成分を増やすため、進み電流を抑える補償には分路リアクトルを使う。",
      "オ": "電圧を倍にしたときの損失比1/4は合っている。受電端が開放または軽負荷のときの進み電流は静電容量に由来し、誘導性の分路リアクトルで補償する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q37",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "双方向リストの操作",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "図は双方向リストを示しており、各レコードは自身の直後のレコードに加え、直前のレコードのポインタも記憶している。また、リストに関する情報としてhead及びtailのポインタが分かっており、head及びtailにはそれぞれ先頭及び末尾のレコードのポインタが記憶されている。この双方向リストに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 単方向リストと比較し、レコード一つ当たりに必要な記憶領域が小さい。\n㋑ 双方向リストAを別の双方向リストBの後ろに連接させる作業を行う場合、作業時のポインタへのアクセス回数は、双方向リストBの長さに依存する。\n㋒ 目的のレコードがリストの末尾に近い場合、同じレコード数の単方向リストと比較し、少ないポインタへのアクセス回数によって目的のレコードにアクセスできる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "末尾に近いレコードに対して、双方向リストならtailから前方向のポインタをたどれる。先頭から次方向へ進む単方向リストより少ないアクセスで到達できる。",
    "choiceExplanations": {
      "ア": "双方向リストの各レコードは前後二つのポインタを持つ。次のレコードだけへのポインタを持つ単方向リストより、必要な領域が小さくなることはない。",
      "イ": "㋐では前のレコードへのポインタの領域が加わる。㋑ではBの末尾がtailで分かっているので、Bの長さに応じてたどる必要はない。",
      "ウ": "末尾から逆にたどれるという㋒は正しい。㋐は各レコードが持つポインタが一つ増える点を見落としている。",
      "エ": "㋒は妥当である。㋑の連接はBのtailとAのhead付近のポインタを更新すればよく、Bの全要素をたどる必要はない。",
      "オ": "末尾に近いレコードに対して、双方向リストならtailから前方向のポインタをたどれる。先頭から次方向へ進む単方向リストより少ないアクセスで到達できる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q37.webp"
    ],
    "imageAltTexts": [
      "先頭headと末尾tailを保持し、各レコードが前後へのポインタを持つ双方向リスト。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q38",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "右線形の生成文法",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "終端記号の集合が {a, b, c}、非終端記号の集合が {S, T}、開始記号がS、生成規則の集合が {S → aS, S → bS, S → aT, T → c} で与えられる生成文法Gに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ Gは文脈自由文法である。\n㋑ Gは正規文法である。\n㋒ 開始記号Sから導出される全ての文字列に含まれる終端記号aとbの個数は異なる。\n㋓ 開始記号Sから導出される文字列の集合を受理する決定性有限オートマトンが存在する。",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋐、㋓",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "規則はすべて右線形で、正規文法かつ文脈自由文法である。生成言語を正規表現(a｜b)*acで表せるので決定性有限オートマトンも存在し、bacが㋒の反例になる。",
    "choiceExplanations": {
      "ア": "左辺が一つの非終端記号なので文脈自由で、右線形なので正規でもある。S→bS→baT→bacはaとbの個数が同じなので、㋒が誤りである。",
      "イ": "規則はすべて右線形で、正規文法かつ文脈自由文法である。生成言語を正規表現(a｜b)*acで表せるので決定性有限オートマトンも存在し、bacが㋒の反例になる。",
      "ウ": "bacはaとbを1個ずつ含むため、㋒は成り立たない。また、生成規則が右線形なので、選択肢から外れた㋑も妥当である。",
      "エ": "文脈自由であり決定性有限オートマトンで受理できる点は合っている。各生成規則の形から正規文法という㋑も含める必要がある。",
      "オ": "正規文法で、決定性有限オートマトンで受理できる点は正しい。各生成規則の左辺が一つの非終端記号なので、文脈自由文法でもある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q39",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "二分探索の比較回数",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "次に示すC言語で定義される関数について、target＝42、a＝{0, 1, 2, 3, …… , 97, 98, 99}（0から99までの数字が順に並んでいる配列）を引数として与えたとき、表示される数値として最も妥当なのはどれか。\nただし、プログラムの動作に必要なヘッダーファイルは適切に読み込まれるものとする。",
    "choices": {
      "ア": "3",
      "イ": "4",
      "ウ": "6",
      "エ": "7",
      "オ": "9"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "整数除算によるmidは49、24、36、42の順に変わる。4回目で一致してループを抜けるため、countの値4が表示される。",
    "choiceExplanations": {
      "ア": "3回目の中間位置は36で、その要素は42より小さい。まだ探索が終わらないため、少なくとも次の比較が必要である。",
      "イ": "整数除算によるmidは49、24、36、42の順に変わる。4回目で一致してループを抜けるため、countの値4が表示される。",
      "ウ": "比較回数を数えるcountはループに入るたびに一つ増える。中間位置42で4回目に終了するため、6回目には進まない。",
      "エ": "探索区間が空になるまで必ず比較を続けるわけではない。今回の入力では4回目にtargetとa[mid]が一致し、直ちにbreakする。",
      "オ": "配列の大きさが100でも、二分探索は一致すればその場で終わる。42を見つけるまでの中間位置は四つだけである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q39.webp"
    ],
    "imageAltTexts": [
      "初期区間を0から99までとして、比較回数countを表示するC言語の二分探索関数。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q40",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "情報工学",
    "topicTags": [
      "再帰関数の整数除算と剰余",
      "デジタル・電気・電子",
      "選択A"
    ],
    "difficulty": 3,
    "question": "次に示すC言語のプログラムには、引数priceで示された価格を支払うために、配列として与えられる引数coin_valuesで示される価値をもつ硬貨をそれぞれ何枚支払えばよいか表示する関数payと、硬貨の種類を示す配列c1、c2が含まれている。関数payの動作に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、プログラムの動作に必要なヘッダーファイルは適切に読み込まれるものとする。\n「この関数payに価格171と配列c2を与えたとき『価値100の硬貨を1枚、価値50の硬貨を1枚、価値［㋐］の硬貨を［㋑］枚、価値［㋒］の硬貨を1枚、支払います。』と表示される。」",
    "choices": {
      "ア": "1、11、10",
      "イ": "5、2、10",
      "ウ": "5、4、1",
      "エ": "10、2、1",
      "オ": "10、2、6"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "100と50の処理後、残額21に対してc2の次の値5で割ると商4、剰余1である。続く10は商が0なので表示されず、最後の1が1枚表示される。",
    "choiceExplanations": {
      "ア": "c2では50の次に5を調べる。残額21に対して1の硬貨を先に11枚取る処理にはならない。",
      "イ": "残額21に対して5で整数除算すると商は4、剰余は1である。10の硬貨は次の段階で調べるが1を10で割った商は0で、表示されない。",
      "ウ": "100と50の処理後、残額21に対してc2の次の値5で割ると商4、剰余1である。続く10は商が0なので表示されず、最後の1が1枚表示される。",
      "エ": "10を5より先に調べれば10の硬貨を2枚使えるが、この入力はc2である。c2の50の次は5で、並べ替えをする処理はない。",
      "オ": "c2には価値6の硬貨が定義されていない。関数が表示する価値は配列の各要素から選ばれるため、6が出力されることはない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q40.webp"
    ],
    "imageAltTexts": [
      "価値の異なる硬貨の二つの配列と、除算と剰余で必要な硬貨を表示するC言語の関数pay。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q41",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "ドナー準位とpn接合",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "半導体に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n・高純度のシリコン（Si）にリン（P）を添加すると、［㋐］のすぐ［㋑］にドナー準位が形成され、n型半導体となる。\n・pn接合では、接合部付近に［㋒］が形成され、［㋓］が生じる。",
    "choices": {
      "ア": "価電子帯、上、反転層、電子親和力",
      "イ": "価電子帯、下、空乏層、拡散電位",
      "ウ": "伝導帯、上、反転層、拡散電位",
      "エ": "伝導帯、下、空乏層、電子親和力",
      "オ": "伝導帯、下、空乏層、拡散電位"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "リンはドナーとなり、伝導帯の直下に電子を供給しやすい準位をつくる。pn接合ではキャリアの拡散によって空乏層と拡散電位が生じる。",
    "choiceExplanations": {
      "ア": "ドナーの電子がわずかなエネルギーで伝導帯に入れるので、ドナー準位は伝導帯のすぐ下にある。pn接合付近には空乏層ができる。",
      "イ": "pn接合の空乏層と拡散電位は合っている。リンが与える準位は価電子帯の近くでなく、伝導帯のすぐ下にある。",
      "ウ": "ドナー準位は伝導帯の上ではなくすぐ下にできる。pn接合の近くでキャリアが減少した領域は空乏層である。",
      "エ": "前半の準位と空乏層は合っている。接合部でキャリアの拡散によって生じる電位差は拡散電位であり、電子親和力とは別の量である。",
      "オ": "リンはドナーとなり、伝導帯の直下に電子を供給しやすい準位をつくる。pn接合ではキャリアの拡散によって空乏層と拡散電位が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q42",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "BJTとFETの特性",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "バイポーラトランジスタと電界効果トランジスタ（FET）に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ バイポーラトランジスタのコレクタ電流には、電子と正孔の両方が関与する。\n㋑ バイポーラトランジスタは、チャネルの両側をゲート電極で挟んだ構造のトランジスタである。\n㋒ MOSFETのうちエンハンスメント型とは、ゲート電圧が0 Vのときにドレイン電流が流れるものをいう。\n㋓ バイポーラトランジスタは電流によって電流を調整でき、FETは電圧によって電流を調整できる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐は電子と正孔の双方が関与するバイポーラ動作を述べている。㋓のとおり、通常のBJT回路ではベース電流、FET回路ではゲート電圧で電流を制御できる。",
    "choiceExplanations": {
      "ア": "バイポーラトランジスタの動作には電子と正孔が関わる。ゲート電極でチャネルの電流を制御する構造はFETに当てはまり、㋑は誤りである。",
      "イ": "㋐は妥当である。エンハンスメント型は通常、ゲート・ソース間電圧が0 Vではチャネルが形成されず、ドレイン電流がほとんど流れない。",
      "ウ": "㋐は電子と正孔の双方が関与するバイポーラ動作を述べている。㋓のとおり、通常のBJT回路ではベース電流、FET回路ではゲート電圧で電流を制御できる。",
      "エ": "㋓は妥当である。チャネルとゲートを用いる㋑の説明はFETの構造であり、BJTはエミッタ、ベース、コレクタを持つ。",
      "オ": "ゲート・ソース間電圧0 Vでもチャネルがあるのはデプレッション型の特徴である。したがって㋓は当てはまるが、㋒は当てはまらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q43",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "反転増幅器の電圧利得",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "図のような演算増幅器を用いた回路において、電圧v_iを入力したときに出力される電圧をv_oとする。この回路の電圧利得v_o/v_iとして最も妥当なのはどれか。\nただし、演算増幅器は理想的なものであり、演算増幅器の入力端子間の電位差はなく、各入力端子には電流が流れ込まないものとする。",
    "choices": {
      "ア": "−9",
      "イ": "−8",
      "ウ": "−1",
      "エ": "8",
      "オ": "9"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "非反転端子が接地されているので、負帰還により反転端子も0 Vとなる。その節点に流れ込む電流と出る電流を等しく置くと、v_o/v_i＝−40/5＝−8である。",
    "choiceExplanations": {
      "ア": "非反転増幅器の利得に使われる1＋R_f/R_inのように1を加える必要はない。反転入力側の二つの抵抗に同じ電流が流れることで比が決まる。",
      "イ": "非反転端子が接地されているので、負帰還により反転端子も0 Vとなる。その節点に流れ込む電流と出る電流を等しく置くと、v_o/v_i＝−40/5＝−8である。",
      "ウ": "利得が−1となるには、入力抵抗と帰還抵抗が等しい必要がある。ここでは帰還抵抗が入力抵抗の8倍である。",
      "エ": "40/5で絶対値8は得られるが、入力は反転端子に入る。出力の符号が入力と逆なので、利得は負である。",
      "オ": "1＋40/5＝9は、異なる配線の非反転増幅器で現れる計算である。図の反転増幅器の利得は−40/5になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q43.webp"
    ],
    "imageAltTexts": [
      "入力抵抗5 kΩ、負帰還抵抗40 kΩで、非反転端子を接地した演算増幅回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-digital-q44",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "非安定マルチバイブレータ",
      "デジタル・電気・電子",
      "選択B"
    ],
    "difficulty": 3,
    "question": "図Ⅰは、二つのインバータ（NOT回路）を用いて構成され、図Ⅱのような矩形波を出力する非安定マルチバイブレータである。この矩形波の発振周波数f＝1/Tと、抵抗値R及び静電容量Cとの関係として最も妥当なのはどれか。",
    "choices": {
      "ア": "fはRとCに比例する。",
      "イ": "fはRとCに反比例する。",
      "ウ": "fはRに比例し、Cに反比例する。",
      "エ": "fはRに反比例し、Cに比例する。",
      "オ": "fはRに反比例し、Cには依存しない。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "コンデンサの充放電の時間尺度は時定数RCである。しきい値などが同じなら周期はRCに比例するので、その逆数の周波数はRとCの双方に反比例する。",
    "choiceExplanations": {
      "ア": "抵抗や容量が大きいほど充放電に時間がかかる。周期の長さが増すため、周波数は低くなる。",
      "イ": "コンデンサの充放電の時間尺度は時定数RCである。しきい値などが同じなら周期はRCに比例するので、その逆数の周波数はRとCの双方に反比例する。",
      "ウ": "容量を増やすと周波数が低くなる点は合っている。抵抗を増やしても充放電が遅くなるため、周波数はRにも反比例する。",
      "エ": "Rに反比例する点は合っている。Cを増やすと充放電で必要な電荷量が増え、周期が長くなるので周波数は下がる。",
      "オ": "容量Cは時定数RCの一部なので周波数に影響する。Rを固定してCを2倍にすると、周期はおおむね2倍になり周波数は半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016345.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） デジタル・電気・電子 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-digital/q44.webp"
    ],
    "imageAltTexts": [
      "二つのNOT回路と抵抗R・コンデンサCを使う回路、および周期Tの矩形波。"
    ]
  }
];
