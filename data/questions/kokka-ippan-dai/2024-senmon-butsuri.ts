import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2024_SENMON_BUTSURI: Question[] = [
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q06",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "定数係数の二階微分方程式の初期値問題",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "y(x)は微分方程式y″(x)＋2y′(x)＝3eˣの解であり、y(0)＝3、y′(0)＝3を満たす。このとき、y(1)として正しいのはどれか。",
    "choices": {
      "ア": "−e⁻²＋e＋3",
      "イ": "−e⁻²＋2e＋1",
      "ウ": "e⁻²−e−3",
      "エ": "e⁻²＋e²",
      "オ": "e²＋2e−1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "まずy′の方程式を解くとy′＝eˣ＋Ce⁻²ˣで、y′(0)＝3よりC＝2である。積分しy(0)＝3を使うとy＝eˣ−e⁻²ˣ＋3となり、x＝1を代入するとこの値になる。",
    "choiceExplanations": {
      "ア": "まずy′の方程式を解くとy′＝eˣ＋Ce⁻²ˣで、y′(0)＝3よりC＝2である。積分しy(0)＝3を使うとy＝eˣ−e⁻²ˣ＋3となり、x＝1を代入するとこの値になる。",
      "イ": "同次解は定数とe⁻²ˣからなり、eˣを特解に取ると、その係数は1で右辺3eˣになる。係数を2にすると右辺の係数が6になるので合わない。",
      "ウ": "eˣの係数を負にすると、左辺に代入したときのeˣの項の符号が右辺と逆になる。初期値条件を満たすため、e⁻²ˣの係数も−1となる。",
      "エ": "微分方程式の特解には右辺と同じ指数eˣを使える。e²ˣを代入すると左辺はe²ˣの倍数となるため、右辺のeˣに一致しない。",
      "オ": "右辺に合わせる特解の項はeˣである。初期微分値から求まる同次解の指数項は−e⁻²ˣで、定数はy(0)＝3から決まる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q08",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数値解析",
    "topicTags": [
      "二分法で更新する区間とニュートン法の接線",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "非線形方程式の解を数値的に求める方法に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n区間[a₀, b₀]において、連続な関数f(x)が与えられたとき、f(a₀)f(b₀)≦0を満たすなら、方程式f(x)＝0となる解が少なくとも一つ存在する。この解のうちの一つのαの近似値を求めるための方法として、以下の方法が挙げられる。\n二分法\n① a＝a₀、b＝b₀とする。\n② 区間[a, b]の中点c＝(a＋b)/2を求める。f(c)＝0ならば、cは解である。\n③ f(a)f(c)＜0であれば㋐を、f(a)f(c)＞0であれば㋑を新しい区間[a, b]とする。\n④ ②、③を繰り返し、区間幅∣b−a∣が十分小さくなったとき、cを解αの近似値とする。\nニュートン法\n① 解αに近いと考えられる初期値x₀を設定する。\n② 点(x₀, f(x₀))におけるy＝f(x)の接線を引き、接線がx軸と交わる点x₁を求める。f(x)の1階微分をf′(x)とすると、x₁＝㋒である。\n③ x₁を新しいx₀とする。\n④ ②、③を繰り返し、∣x₁−x₀∣が十分小さくなったとき、x₁を解αの近似値とする。\n関数f(x)が2回連続微分可能で、かつf′(α)≠0の場合、解に収束する速さを比較すると、㋓法の方が速い。",
    "choices": {
      "ア": "㋐：[a,c]、㋑：[c,b]、㋒：x₀−f′(x₀)/f(x₀)、㋓：二分",
      "イ": "㋐：[a,c]、㋑：[c,b]、㋒：x₀−f′(x₀)/f(x₀)、㋓：ニュートン",
      "ウ": "㋐：[a,c]、㋑：[c,b]、㋒：x₀−f(x₀)/f′(x₀)、㋓：ニュートン",
      "エ": "㋐：[c,b]、㋑：[a,c]、㋒：x₀−f(x₀)/f′(x₀)、㋓：二分",
      "オ": "㋐：[c,b]、㋑：[a,c]、㋒：x₀−f(x₀)/f′(x₀)、㋓：ニュートン"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "f(a)とf(c)が異符号なら[a,c]、同符号なら残る[c,b]が根を挟む。接線のx切片はx₀−f(x₀)/f′(x₀)で、単根近くのニュートン法は二次収束するため二分法より速い。",
    "choiceExplanations": {
      "ア": "区間は符号が異なる端点を残すので、㋐と㋑は妥当である。接線の高さf(x₀)をその傾きf′(x₀)で割ってx方向の補正量を求め、単根近傍ではニュートン法の方が速く収束する。",
      "イ": "更新する区間と収束の比較は妥当である。接線をy＝f(x₀)＋f′(x₀)(x−x₀)と書いてy＝0を解くと、補正項の分母にはf′(x₀)が入る。",
      "ウ": "f(a)とf(c)が異符号なら[a,c]、同符号なら残る[c,b]が根を挟む。接線のx切片はx₀−f(x₀)/f′(x₀)で、単根近くのニュートン法は二次収束するため二分法より速い。",
      "エ": "接線から求めるx₁は妥当である。一方、端点aと中点cの符号が異なれば残す区間は[a,c]であり、二分法よりニュートン法の方が単根近くで速い。",
      "オ": "接線による更新式と速い方の方法は妥当である。二分法ではf(a)f(c)＜0なら根を挟む[a,c]を採用するので、区間は逆になっている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q08.webp"
    ],
    "imageAltTexts": [
      "根αを挟む初期区間[a₀,b₀]、中点cと、x₀での接線がx軸と交わるx₁を示す関数の図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q13",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "ゴムひもの弾性と重力の位置エネルギー",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、自然長Lの軽いゴムひもの一端を天井の点Oに固定し、他端に質量mの小球を取り付けたところ、ゴムひもの伸びがL/12となる位置で釣り合った。この釣合いの位置からさらに鉛直方向にxだけ小球を引き下げて静かに放したところ、小球はちょうど速度0（ゼロ）で点Oに達した。xとして最も妥当なのはどれか。\nただし、ゴムひもは自然長よりも伸びている状態でフックの法則に従うものとし、たるんでいる状態でのゴムひもは小球の運動に影響を与えないものとする。",
    "choices": {
      "ア": "L/6",
      "イ": "L/4",
      "ウ": "L/3",
      "エ": "5L/12",
      "オ": "L/2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "釣合いの伸びをa＝L/12とするとmg＝kaであり、放すときの伸びはa＋xである。エネルギー保存k(a＋x)²/2＝mg(L＋a＋x)を解くとx²＝a²＋2aL＝25L²/144となり、x＝5L/12である。",
    "choiceExplanations": {
      "ア": "釣合いの伸びL/12を足すと、放すときの伸びはL/4になる。この伸びでの弾性エネルギーは、Oまでの距離L＋L/4に対する重力の位置エネルギーの増加を賄えない。",
      "イ": "求めるxは自然長からではなく、自然長よりL/12だけ下の釣合い位置から測る。x＝L/4では全伸びL/3で、Oに到達するための弾性エネルギーに足りない。",
      "ウ": "伸びをL/12＋L/3＝5L/12とすると、放した位置からOまでの距離は17L/12である。釣合いの条件から求まるkでは、この分の重力位置エネルギーを弾性エネルギーで全て賄えない。",
      "エ": "釣合いの伸びをa＝L/12とするとmg＝kaであり、放すときの伸びはa＋xである。エネルギー保存k(a＋x)²/2＝mg(L＋a＋x)を解くとx²＝a²＋2aL＝25L²/144となり、x＝5L/12である。",
      "オ": "L/2は放すときの自然長からの全伸びに当たる。設問のxは釣合い位置からさらに下げる距離なので、この値からL/12を引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q13.webp"
    ],
    "imageAltTexts": [
      "天井の点Oから自然長Lのゴムひもを垂らす。質量mの小球の釣合い位置はOからL＋L/12下で、そこからさらにx引き下げる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q14",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "剛体振り子の最小周期",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "辺の長さがそれぞれ2LとLで質量2Mの長方形の一様な薄い板がある。この板の中心を通り、板に垂直な回転軸aの周りの慣性モーメントIₐはIₐ＝(5/6)ML²で与えられる。図のように、この板の中心から中心線に沿ってxだけ離れた位置に質量Mの質点を貼り付ける。回転軸aを水平にとり、釣合いの位置の周りで板を微小振動させる。このとき、振動の周期が最小になるxの値として最も妥当なのはどれか。\nなお、質量mの剛体振り子の微小振動の周期TはT＝2π√[I/(mgh)]で与えられる。ここで、Iは剛体振り子の回転軸の周りの慣性モーメント、hは回転軸の中心から重心までの距離、gは重力加速度の大きさである。",
    "choices": {
      "ア": "√(1/6)L",
      "イ": "√(5/12)L",
      "ウ": "√(2/3)L",
      "エ": "(5/6)L",
      "オ": "√(5/6)L"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "全体の慣性モーメントはM[x²＋(5/6)L²]で、全質量と重心距離の積は3M(x/3)＝Mxである。T²はx＋(5/6)L²/xに比例し、二項が等しいx＝√(5/6)Lで最小になる。",
    "choiceExplanations": {
      "ア": "薄板の慣性モーメントは与えられた(5/6)ML²である。周期が最小になるときは付けた質点のMx²がこの値と等しいため、1/6ではない。",
      "イ": "周期の二乗を整理すると、xと(5/6)L²/xの和に比例する。二項を等しくする条件では、x²が5L²/12でなく5L²/6になる。",
      "ウ": "板中心から全体の重心までの距離はx/3である。全体の質量3Mとの積はMxなので、T²のx依存性から最小値はx²＝5L²/6で決まる。",
      "エ": "微分して0になる条件はx²＝(5/6)L²である。x自身を求めるので、係数5/6には平方根が必要になる。",
      "オ": "全体の慣性モーメントはM[x²＋(5/6)L²]で、全質量と重心距離の積は3M(x/3)＝Mxである。T²はx＋(5/6)L²/xに比例し、二項が等しいx＝√(5/6)Lで最小になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q14.webp"
    ],
    "imageAltTexts": [
      "縦2L、横L、質量2Mの薄板の中心を通る回転軸a。中心線上に中心からx離して質点Mを貼り付ける。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q15",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "時間依存の速度場における流跡線",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "時刻tにおけるx軸及びy軸方向の速度成分が、それぞれu＝−sin t、v＝cos tで表される2次元の流れを考える。このとき、時刻t＝0において原点Oを通る流跡線（流体粒子が時間の経過とともに移動する軌跡）として最も妥当なのはどれか。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "速度成分を時刻0から積分するとx＝cos t−1、y＝sin tとなる。したがって(x＋1)²＋y²＝1で、中心が原点の左にある単位円を描く。",
    "choiceExplanations": {
      "ア": "x座標は初期値0から−sin tを積分したcos t−1であり、すべての時刻でx≦0になる。右半平面にある円では、この条件を満たせない。",
      "イ": "速度成分を時刻0から積分するとx＝cos t−1、y＝sin tとなる。したがって(x＋1)²＋y²＝1で、中心が原点の左にある単位円を描く。",
      "ウ": "時刻0ではu＝0、v＝1なので、原点を上向きに通る。yはsin tとして正にも負にもなるため、全体が原点の下にある軌跡にはならない。",
      "エ": "速度成分を積分すると周期的なcos t−1とsin tが得られる。軌跡は一定の中心・半径を持つ閉曲線で、中心から離れる距離が変化する渦巻ではない。",
      "オ": "x＝cos t−1、y＝sin tは時刻が2π増えると同じ位置に戻る。中心(−1,0)からの距離も一定であるため、巻きながら半径が変わる形にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2024/senmon-butsuri/q15-1.webp",
      "イ": "/questions/kokka-ippan-dai/2024/senmon-butsuri/q15-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2024/senmon-butsuri/q15-3.webp",
      "エ": "/questions/kokka-ippan-dai/2024/senmon-butsuri/q15-4.webp",
      "オ": "/questions/kokka-ippan-dai/2024/senmon-butsuri/q15-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q16",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "よどみ点の圧力とベルヌーイの式",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "一定の密度ρの完全流体を考える。定常な渦なしの流れの中に物体を置くと、その表面に流速0の点が出来る。これをよどみ点という。よどみ点での圧力をp₀とすると、圧力がpの点での流速の大きさとして最も妥当なのはどれか。ただし、重力の影響は無視してよい。",
    "choices": {
      "ア": "(p₀−p)/ρ",
      "イ": "(p₀−p)/(2ρ)",
      "ウ": "ρ(p₀−p)",
      "エ": "(2/ρ)√(p₀−p)",
      "オ": "√[2(p₀−p)/ρ]"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "重力を無視すると、よどみ点と流れている点でp₀＝p＋ρu²/2となる。流速uを解いて√[2(p₀−p)/ρ]を得る。",
    "choiceExplanations": {
      "ア": "圧力差を密度で割った量は速度の二乗の次元を持つ。さらに係数2を掛けて平方根を取ると速度になる。",
      "イ": "ベルヌーイの式で圧力差はρu²/2と等しい。これをu²について解くと分母の2で割るのではなく全体を2倍し、その後平方根を取る。",
      "ウ": "一定密度の流れで動圧は密度と速度二乗の積に比例する。速度を求める際は圧力差を密度で割って、平方根を取る。",
      "エ": "圧力差の平方根だけでは流速の次元にならない。係数2と密度ρも平方根の中に入れてから計算する。",
      "オ": "重力を無視すると、よどみ点と流れている点でp₀＝p＋ρu²/2となる。流速uを解いて√[2(p₀−p)/ρ]を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q17",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "弾性力学",
    "topicTags": [
      "ひずみの対角和と体積変化",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "x₁x₂x₃空間における弾性体の変位(u₁,u₂,u₃)が、u₁＝(6x₁−4x₂−2x₃)×10⁻⁶、u₂＝(2x₁−2x₂)×10⁻⁶、u₃＝(ax₁＋bx₃−4)×10⁻⁶で表されているとする。ただし、aとbは定数とする。この変形が体積変化を伴わない場合、aとbの組合せとして最も妥当なのはどれか。なお、体積変化を伴わない場合、ひずみテンソルε_ijの対角和ε₁₁＋ε₂₂＋ε₃₃は0となる。",
    "choices": {
      "ア": "a＝−4、b＝4",
      "イ": "a＝−2、b＝−4",
      "ウ": "a＝0、b＝0",
      "エ": "a＝2、b＝−2",
      "オ": "a＝4、b＝0"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ひずみの対角成分は各uᵢの同じ座標xᵢに関する微分なので、対角和は(6−2＋b)×10⁻⁶になる。b＝−4で0になるため、この組合せが条件を満たす。",
    "choiceExplanations": {
      "ア": "体積変化を与える対角和にはu₃のx₃微分が入るので、寄与はaでなくbとなる。b＝4なら対角和は8×10⁻⁶になり、0にならない。",
      "イ": "ひずみの対角成分は各uᵢの同じ座標xᵢに関する微分なので、対角和は(6−2＋b)×10⁻⁶になる。b＝−4で0になるため、この組合せが条件を満たす。",
      "ウ": "u₁とu₂の対角ひずみの和は(6−2)×10⁻⁶である。b＝0ではu₃からこれを打ち消す寄与が生じない。",
      "エ": "b＝−2のとき対角和は(6−2−2)×10⁻⁶となる。aはu₃のx₁に関する係数なので、体積変化の条件には入らない。",
      "オ": "a＝4であってもu₃のx₃方向の伸縮を決めるのはbである。b＝0では他の二方向の対角ひずみが相殺されない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q18",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "鉛直につるした一様棒の自重による伸び",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "重力による棒の変形に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n密度ρ、長さL、断面積S、ヤング率Eの棒があり、これを水平な天井から鉛直に吊り下げると、棒は自重によって伸びる。この棒の、天井からXの距離に微小部分があり、その長さがdXである場合、この微小部分の伸びは㋐で表される。また、棒全体の伸びの長さは㋑となる。\nただし、重力加速度の大きさをgとし、棒の伸びは棒の長さに対して十分小さいものとする。なお、一般に、長さL、断面積S、ヤング率Eの一様な棒の両端に大きさFの引っ張る力を加えたときの棒の伸びΔLはΔL＝FL/(SE)で与えられる。",
    "choices": {
      "ア": "㋐：ρ(L−X)g dX/E、㋑：ρgL²/E",
      "イ": "㋐：ρ(L−X)g dX/E、㋑：ρgL²/(2E)",
      "ウ": "㋐：ρ(L−X)g dX/(SE)、㋑：ρgL²/(2E)",
      "エ": "㋐：ρ(L−X)g dX/(SE)、㋑：ρgL²/(SE)",
      "オ": "㋐：ρ(L−X)g dX/(SE)、㋑：ρgL²/(2SE)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "位置Xの断面は下に残る長さL−Xの棒を支えるので、軸力はρgS(L−X)である。これをSEで割ってdXを掛け、0からLまで積分すると全体の伸びはρgL²/(2E)になる。",
    "choiceExplanations": {
      "ア": "微小部の伸びは妥当である。軸力は上端で最大、下端で0に直線的に変化するので、全体の伸びは上端のひずみを長さLに掛けた値の半分になる。",
      "イ": "位置Xの断面は下に残る長さL−Xの棒を支えるので、軸力はρgS(L−X)である。これをSEで割ってdXを掛け、0からLまで積分すると全体の伸びはρgL²/(2E)になる。",
      "ウ": "全体の伸びは妥当である。微小部の引張力に断面積Sが含まれるため、ひずみを求めるときに分母のSは相殺される。",
      "エ": "自重による局所の軸力には密度ρに加え断面積Sも入る。したがって伸びの式にSが残らず、全体の積分から係数1/2が生じる。",
      "オ": "断面積を増やすと自重も同じ割合で増える。そのため応力とひずみは断面積に依存せず、微小部と全体のいずれの伸びにもSは残らない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q18.webp"
    ],
    "imageAltTexts": [
      "天井からつった長さLの棒。上端からXの位置に微小長さdXを取り、鉛直下向きの重力gが作用する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q20",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "有限水深の重力波の分散関係",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "深さhが一定の十分広い水槽内の水に起こる波を考える。鉛直上向きをz軸、波の進行方向をx軸にとり、波はy方向に一様であるとする。流体の運動は渦なしで非圧縮流体であるとすると、速度ポテンシャルφが存在し、φはラプラスの方程式∂²φ/∂x²＋∂²φ/∂z²＝0に従う。波に伴う水の運動が小さい場合、水面(z＝0)では∂²φ/∂t²＋g∂φ/∂z＝0という境界条件を満たす。一方、水底(z＝−h)では速度の法線成分は0であるため、∂φ/∂z＝0を満たす。いま、x軸方向に進む波として、波数k、角振動数ωを用いてφ＝f(z)cos(kx−ωt)の形の解を考えると、ωの値として最も妥当なのはどれか。ただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "√[gk tanh(kh)]",
      "イ": "√[2gk tanh(kh)]",
      "ウ": "√[gk cosh(kh)]",
      "エ": "√[gk sinh(kh)]",
      "オ": "√[2gk sinh(kh)]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "代入するとf″−k²f＝0となり、水底のf′(−h)＝0からf(z)はcosh[k(z＋h)]に比例する。水面の条件でω²＝g f′(0)/f(0)となるので、ω＝√[gk tanh(kh)]を得る。",
    "choiceExplanations": {
      "ア": "代入するとf″−k²f＝0となり、水底のf′(−h)＝0からf(z)はcosh[k(z＋h)]に比例する。水面の条件でω²＝g f′(0)/f(0)となるので、ω＝√[gk tanh(kh)]を得る。",
      "イ": "水面条件では時間の二階微分が−ω²、鉛直微分でkが一つ生じる。水面における比f′(0)/f(0)はk tanh(kh)で、係数2はない。",
      "ウ": "cosh(kh)は水面でのf(0)に現れる。周波数を求める式ではf′(0)をf(0)で割るので、sinhとcoshの比であるtanhが残る。",
      "エ": "f′(0)にはsinh(kh)が含まれるが、境界条件からω²を求めるときf(0)も使う。cosh(kh)で割ってtanh(kh)を得る。",
      "オ": "水底の条件を満たす鉛直形状を選び、水面での微分と振幅の比を取る。ここで現れるのはk tanh(kh)で、2k sinh(kh)にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q21",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "原子物理",
    "topicTags": [
      "放射線の電離作用と遮蔽",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "放射線に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n放射線が物質中に入射すると、原子中の電子をはじき飛ばして物質中にイオンを生成することがある。これを放射線の電離作用という。電離作用の大きい放射線ほど、進行方向に沿った短い区間により多くのイオンを生成してエネルギーを失うため、透過力は小さく、容易に遮蔽することができる。例えば、㋐は、紙では遮蔽できないが、アルミニウムなどの薄い金属板であれば遮蔽することができる。中性子線は電荷をもたず、特に透過力が大きい。これを遮蔽するには、高速中性子に対しては鉄が、それよりエネルギーの小さい中性子に対しては㋑が用いられている。",
    "choices": {
      "ア": "㋐：α線、㋑：水やパラフィン",
      "イ": "㋐：α線、㋑：水銀や鉛",
      "ウ": "㋐：β線、㋑：水やパラフィン",
      "エ": "㋐：β線、㋑：水銀や鉛",
      "オ": "㋐：γ線、㋑：水銀や鉛"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "紙を通り抜けても薄い金属板で止められる放射線の例はβ線である。水やパラフィンに多く含まれる水素は中性子と質量が近く、衝突で中性子のエネルギーを奪いやすい。",
    "choiceExplanations": {
      "ア": "水やパラフィンのような水素を多く含む材料は、中性子と衝突してその運動エネルギーを下げる。α線は電離作用が強く、通常は紙でも止まるので、ここで述べる例には当たらない。",
      "イ": "α線は紙や皮膚表面で止まりやすいため、紙を透過する放射線の例にはならない。鉛のような重い材料は主にγ線などを減衰させる際に用いる。",
      "ウ": "紙を通り抜けても薄い金属板で止められる放射線の例はβ線である。水やパラフィンに多く含まれる水素は中性子と質量が近く、衝突で中性子のエネルギーを奪いやすい。",
      "エ": "β線は薄いアルミニウム板などで止められるので妥当である。中性子の減速には衝突で運動エネルギーを受け取りやすい水素を多く含む材料を使う。",
      "オ": "γ線は電磁波で透過力が大きく、薄い金属板で容易に止められるという例には当たらない。水やパラフィンは中性子を減速させやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q23",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "等温膨張する理想気体のエントロピー",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "1 molの理想気体が、温度Tを保ったまま準静的に膨張して体積が4倍になった。このとき、この理想気体のエントロピーの変化量として最も妥当なのはどれか。\nただし、気体定数をRとする。また、温度Tの等温準静過程では、熱量ΔQを受け取った理想気体のエントロピーの変化量ΔSはΔS＝ΔQ/Tで与えられる。",
    "choices": {
      "ア": "−4R ln 2",
      "イ": "−2R ln 2",
      "ウ": "0",
      "エ": "2R ln 2",
      "オ": "4R ln 2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "等温なので内部エネルギーは変わらず、1 molの気体がする仕事RT ln(V_f/V_i)が吸熱量に等しい。体積比が4なのでΔS＝R ln 4＝2R ln 2となる。",
    "choiceExplanations": {
      "ア": "等温膨張では気体が外に正の仕事をする。温度が変わらず内部エネルギーが一定なので、外から熱を受け取りエントロピーは増加する。",
      "イ": "−2R ln 2は同じ二状態を逆にたどる等温圧縮の変化量に当たる。膨張で体積が増える場合は正の値になる。",
      "ウ": "温度が一定でも体積が増えると、同じエネルギーで占められる位置の状態数が増える。準静的な膨張では吸熱するので、エントロピーは一定ではない。",
      "エ": "等温なので内部エネルギーは変わらず、1 molの気体がする仕事RT ln(V_f/V_i)が吸熱量に等しい。体積比が4なのでΔS＝R ln 4＝2R ln 2となる。",
      "オ": "体積が4倍になる際の仕事には体積比の自然対数が入る。ln 4＝2 ln 2であり、4 ln 2にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q24",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "ギブズ自由エネルギーの混合偏微分",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "一成分の気体からなる系のGibbs自由エネルギーが、系の温度T、圧力p、物質量Nの関数G(T,p,N)として与えられるとき、系のエントロピーS、体積V、化学ポテンシャルμはそれぞれ、S＝−∂G/∂T、V＝∂G/∂p、μ＝∂G/∂Nとなる。また、G(T,p,N)の示量性から、G(T,p,N)＝Nμ(T,p,N)が成り立つ。G(T,p,N)が2回連続微分可能であるとき、一般に成り立つ熱力学関係式として最も妥当なのはどれか。各量は(T,p,N)で評価する。",
    "choices": {
      "ア": "∂S/∂p＝∂V/∂T",
      "イ": "∂S/∂N＝−∂μ/∂T",
      "ウ": "∂V/∂N＝−∂μ/∂p",
      "エ": "S＝N∂μ/∂T",
      "オ": "S＝−N∂S/∂N"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "SをNで微分すると−∂²G/(∂N∂T)である。Gの二階偏導関数の連続性により偏微分の順序を交換できるので、これは−∂μ/∂Tに等しい。",
    "choiceExplanations": {
      "ア": "S＝−∂G/∂Tなので、pで微分すると−∂²G/(∂p∂T)となる。微分の順序を交換すると−∂V/∂Tが得られ、符号が合わない。",
      "イ": "SをNで微分すると−∂²G/(∂N∂T)である。Gの二階偏導関数の連続性により偏微分の順序を交換できるので、これは−∂μ/∂Tに等しい。",
      "ウ": "VとμはいずれもGの正の偏微分として定義される。混合偏微分を交換すると∂V/∂N＝∂μ/∂pになり、負号は出ない。",
      "エ": "G＝NμのT微分ではNを固定する。Sの定義にある負号が付くため、S＝−N∂μ/∂Tになる。",
      "オ": "一成分系ではTとpを固定したときエントロピーは物質量Nに比例する。したがってS＝N∂S/∂Nであり、符号は正である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q25",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "純物質の三重点と相平衡",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "0℃、1×10⁵ Paの条件下で気体である純物質に関する記述として最も妥当なのはどれか。ただし、ガラス状態になる物質は除くものとする。",
    "choices": {
      "ア": "全ての気体は、1×10⁵ Paの下で十分温度を下げると必ず液体に相転移する。",
      "イ": "全ての気体は、0℃の下で十分圧力を上げると必ず液体に相転移する。",
      "ウ": "⁴Heの気体は、1×10⁵ Paの下ではいくら温度を下げても液体や固体に相転移することはない。",
      "エ": "一定圧力の下での気体から液体への相転移では、状態変化の間、温度は常に変化する。",
      "オ": "三重点より低い圧力で気体と液体の二相が共存することはない。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "気体と液体の安定な共存曲線は三重点と臨界点の間にある。三重点より低い圧力の平衡では、気体と固体の間で直接昇華・凝華する経路があり、気体と液体は共存しない。",
    "choiceExplanations": {
      "ア": "1×10⁵ Paが三重点の圧力より低い物質では、冷却によって気体が直接固体になることがある。二酸化炭素はこの条件に当たる。",
      "イ": "温度が臨界温度より高い場合には、圧縮しても気体と液体を分ける相境界を横切らない。0℃が臨界温度を超える物質もある。",
      "ウ": "ヘリウム4は約1気圧では冷却すると液体になる。常圧でさらに温度を下げても固体にならないことと、気体から液体に変わることは区別する。",
      "エ": "平衡条件で純物質の気体と液体が共存する温度は、一定の圧力に対して定まる。凝縮の間は放出される潜熱に対応して相の割合が変わり、温度は一定に保たれる。",
      "オ": "気体と液体の安定な共存曲線は三重点と臨界点の間にある。三重点より低い圧力の平衡では、気体と固体の間で直接昇華・凝華する経路があり、気体と液体は共存しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q27",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "電磁気",
    "topicTags": [
      "相互誘導とレンツの法則",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "電磁誘導に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n図のように、断面積Sの鉄心に、長さl、巻数N₁の1次コイルと、巻数N₂の2次コイルが巻かれている。図の矢印の向きに1次コイルを流れる電流Iが、微小時間Δtの間にIからI＋ΔIに増加したとき、2次コイルに生じる誘導起電力の大きさは㋐である。また、このとき2次コイルにつながる抵抗を流れる電流の向きは㋑である。ただし、鉄心内の磁場は一様とし、鉄心の透磁率をμとする。",
    "choices": {
      "ア": "㋐：(μSN₁N₂/l)(ΔI/Δt)、㋑：aからb",
      "イ": "㋐：(μSN₁N₂/l)(ΔI/Δt)、㋑：bからa",
      "ウ": "㋐：(μSN₁/lN₂)(ΔI/Δt)、㋑：aからb",
      "エ": "㋐：(μSN₁/lN₂)(ΔI/Δt)、㋑：bからa",
      "オ": "㋐：[μS/(lN₁N₂)](ΔI/Δt)、㋑：aからb"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "1次の磁束密度はμN₁I/lで、2次の鎖交磁束はこれにSN₂を掛けるので、磁束の時間変化から(μSN₁N₂/l)(ΔI/Δt)を得る。図の巻き方向では1次の磁束の増加を打ち消す電流が、抵抗をaからbへ流れる。",
    "choiceExplanations": {
      "ア": "1次の磁束密度はμN₁I/lで、2次の鎖交磁束はこれにSN₂を掛けるので、磁束の時間変化から(μSN₁N₂/l)(ΔI/Δt)を得る。図の巻き方向では1次の磁束の増加を打ち消す電流が、抵抗をaからbへ流れる。",
      "イ": "誘導起電力の大きさは妥当である。図の巻線でbからaへ流すと、2次が作る磁束は1次の変化を打ち消す向きにならない。",
      "ウ": "aからbという向きは合う。2次コイルの一巻ごとに生じる起電力が直列に加わるため、合計はN₂に比例する。",
      "エ": "鉄心内で変化する磁束を各巻が鎖交するので、起電力には1次と2次の巻数の積N₁N₂が入る。電流の向きは巻線の向きとレンツの法則からaからbになる。",
      "オ": "抵抗を流れる向きは妥当である。1次の磁束密度はN₁に比例し、2次ではN₂巻分の起電力が加算されるため、巻数の積は分子に入る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q27.webp"
    ],
    "imageAltTexts": [
      "断面積S・長さlの鉄心に巻いた1次コイルN₁巻と2次コイルN₂巻。左の1次コイルに上向きの電流Iが流れ、2次コイルの端子aとbは抵抗でつながる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q28",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "電磁気",
    "topicTags": [
      "分布定数回路の電信方程式",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "電信方程式に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n長い往路・復路をもつ伝送線に時間変化する信号を伝える。図は、伝送線の微小部分を模式的に表したものである。時刻t、往路上の座標xの点で流れる電流をI(x,t)とする。また、復路の電位を基準とする往路の電位をu(x,t)とし、単位長さ当たりの抵抗、インダクタンス、静電容量をそれぞれR、L、Cとする。\n伝送線の微小部分Δxを考えると、電位差Δu＝u(x＋Δx,t)−u(x,t)≃(∂u/∂x)Δx＝−(㋐Δx)∂I/∂t−(RΔx)Iとなる。また、電流の変化はΔI＝I(x＋Δx)−I(x)≃(∂I/∂x)Δx＝−CΔx∂u/∂tとなる。これらの方程式をΔxで割り、Iを消去すると、方程式∂²u/∂t²−c²∂²u/∂x²＋α∂u/∂t＝0が得られる。ここでc²＝㋑、α＝㋒である。",
    "choices": {
      "ア": "㋐：1/L、㋑：L/C、㋒：RL",
      "イ": "㋐：1/L、㋑：C/L、㋒：R/L",
      "ウ": "㋐：L、㋑：1/(LC)、㋒：R/L",
      "エ": "㋐：L、㋑：1/(LC)、㋒：RL",
      "オ": "㋐：L、㋑：LC、㋒：L/R"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "電位の式はu_x＝−LI_t−RIで、電流の式はI_x＝−Cu_tである。前者をxで微分して後者を代入するとu_xx＝LCu_tt＋RCu_tなので、c²＝1/(LC)、α＝R/Lとなる。",
    "choiceExplanations": {
      "ア": "直列のコイルによる電圧降下は、長さΔxのインダクタンスLΔxに電流の時間変化率を掛ける。したがって1/LではなくLが入る。",
      "イ": "α＝R/Lは妥当である。微小区間のインダクタンスはLΔxであり、電流を消去するとc²はLとCの積の逆数になる。",
      "ウ": "電位の式はu_x＝−LI_t−RIで、電流の式はI_x＝−Cu_tである。前者をxで微分して後者を代入するとu_xx＝LCu_tt＋RCu_tなので、c²＝1/(LC)、α＝R/Lとなる。",
      "エ": "㋐と㋑は妥当である。u_xx＝LCu_tt＋RCu_tの各項をLCで割ると、時間の一階微分の係数はRC/(LC)＝R/Lとなる。",
      "オ": "電圧降下を表すLは妥当である。微分方程式を時間の二階微分の係数が1になるよう整理すると、波速の二乗は1/(LC)、減衰項の係数はR/Lになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "微小長さΔxの往路にインダクタンスLと抵抗Rが直列、往路と復路の間に静電容量Cがつながる伝送線の等価回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q29",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電気回路",
    "topicTags": [
      "RC回路とRL回路の過渡電流",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰ、図Ⅱのように、直流電源、抵抗Rと、コンデンサーC若しくはコイルLから構成される回路がある。いずれも初めは回路が開いている状態から時刻t₁にスイッチをa側に倒し、十分な時間が経過した後、時刻t₂にb側に切り替えた。このとき、抵抗Rを図中の矢印方向に流れるそれぞれの電流i₁、i₂の時間変化の組合せとして最も妥当なのはどれか。\nただし、初期状態でコンデンサーCには電荷は蓄えられていないものとする。また、スイッチの切替えは瞬時に行われるものとする。",
    "choices": {
      "ア": "i₁：㋐、i₂：㋓",
      "イ": "i₁：㋐、i₂：㋔",
      "ウ": "i₁：㋑、i₂：㋓",
      "エ": "i₁：㋑、i₂：㋔",
      "オ": "i₁：㋒、i₂：㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "RC回路では充電開始時の電流が正で、その後0へ減り、切替え後は逆向きの放電電流が流れるので㋐である。RL回路では電流が徐々に増え、切替え後も同じ向きに減衰するので㋓である。",
    "choiceExplanations": {
      "ア": "RC回路では充電開始時の電流が正で、その後0へ減り、切替え後は逆向きの放電電流が流れるので㋐である。RL回路では電流が徐々に増え、切替え後も同じ向きに減衰するので㋓である。",
      "イ": "i₁の㋐は妥当である。i₂はコイルの電流が切替え時に連続するため、負に飛ぶ㋔ではなく正から減衰する㋓である。",
      "ウ": "i₂の㋓は妥当である。コンデンサーの充電開始時には矢印方向に電流が流れ、放電で逆方向になるため、i₁を示すのは㋐である。",
      "エ": "RC回路では充電開始時に正の電流が流れる。RL回路のコイル電流は切替え直後にも同じ向きを保つので、二つの曲線はそれぞれ㋐と㋓になる。",
      "オ": "コイル側の㋓は妥当である。コンデンサーは切替え後に蓄えた電荷を放出して抵抗に逆向きの電流を流すので、両方で正になる㋒は合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q29.webp",
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q29-2.webp"
    ],
    "imageAltTexts": [
      "図Ⅰは直流電源、抵抗R、コンデンサーCを使う切替回路。図ⅡはCをコイルLに置き換えた回路。スイッチをaまたはbに切り替える。",
      "電流と時刻の候補グラフ㋐～㋔。t₁とt₂で生じる過渡電流の向きと時間変化が異なる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q30",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電磁気",
    "topicTags": [
      "電気双極子の遠方の電位",
      "物理区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "モーメントの大きさpをもつ電気双極子がx軸の正の向きを向いて原点に置かれている。原点から十分離れたxy平面上の点P(x,y,0)における電位として最も妥当なのはどれか。\nただし、電位は無限遠を基準とする。真空の誘電率をε₀とし、r＝√(x²＋y²)である。また、この電気双極子による電位は、二つの点電荷−Q、Qをそれぞれ(−a,0,0)、(a,0,0)に置き、2Qa＝pを一定に保ちながら、a→0の極限をとったときの電位に等しい。",
    "choices": {
      "ア": "p/(4πε₀r)",
      "イ": "p/(4πε₀r²)",
      "ウ": "px/(4πε₀r³)",
      "エ": "py/(4πε₀r³)",
      "オ": "pxy/(4πε₀r⁴)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二つの電荷までの距離の逆数の差をaの一次まで展開すると2ax/r³となる。これにQ/(4πε₀)を掛けて2Qa＝pと置くと、電位はpx/(4πε₀r³)になる。",
    "choiceExplanations": {
      "ア": "1/rに比例する単極子の項は、正電荷と負電荷の総和が0なので打ち消される。距離の逆二乗に比例する双極子の項が残る。",
      "イ": "電位が距離の二乗に反比例する点は妥当である。電荷間の軸と観測点の方向の角度に応じて、さらにcosθ＝x/rを掛ける必要がある。",
      "ウ": "二つの電荷までの距離の逆数の差をaの一次まで展開すると2ax/r³となる。これにQ/(4πε₀)を掛けて2Qa＝pと置くと、電位はpx/(4πε₀r³)になる。",
      "エ": "双極子のモーメントはx軸の正方向を向いている。電位の方向依存性はこの軸への射影x/rであり、y/rではない。",
      "オ": "y＝0でxが正の軸上でも、正電荷に近い側の電位は0ではない。双極子の式で必要となる向きの成分はx/rだけである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q31",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "最速降下線の時間を表す変分積分",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "鉛直下向きの一様な重力場中で、質点が滑らかな曲線に沿って、ある点Oから初速度なしで滑り落ちて、与えられた点Aに達するとき、それに要する時間が最小になるような曲線を最速降下線という。点Oを原点とし、水平方向をx軸、鉛直下向きをy軸にとる。座標(x,y)での質点の速さvは重力加速度をgとしてv²/2＝gyにより定まる。点Aの座標を(x,y)＝(a,b)、2点O、Aを結ぶ曲線の方程式をy＝f(x)とする。\n質点が点Oから点Aまで滑り落ちるのに要する時間Sは、S＝∫₀ᵃF(f,f′)dx、f′＝df/dxで与えられる。このとき、被積分関数Fの関数形として最も妥当なのはどれか。",
    "choices": {
      "ア": "f′/√(2gf)",
      "イ": "(1＋f′)/√(2gf)",
      "ウ": "f′²/√(2gf)",
      "エ": "√[(1＋f′²)/(2gf)]",
      "オ": "√[(1＋f′²)/(2gff′)]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "微小時間は弧長dsを局所の速さvで割った値である。ds＝√(1＋f′²)dx、v＝√(2gf)なので、被積分関数は√[(1＋f′²)/(2gf)]となる。",
    "choiceExplanations": {
      "ア": "f′dxは曲線の鉛直成分dyである。質点は曲線に沿った弧長を進むので、移動距離には水平成分も含める。",
      "イ": "水平移動dxと鉛直移動f′dxは直交している。弧長はそれらを直接足すのでなく、二乗和の平方根を取る。",
      "ウ": "f′²だけでは弧長を求められず、水平な区間で積分値が0になってしまう。実際の微小弧長は√(1＋f′²)dxである。",
      "エ": "微小時間は弧長dsを局所の速さvで割った値である。ds＝√(1＋f′²)dx、v＝√(2gf)なので、被積分関数は√[(1＋f′²)/(2gf)]となる。",
      "オ": "速さは重力による位置エネルギーの減少から決まり、その点の高さの差fに依存する。曲線の傾きf′は弧長には現れるが、速さの平方根の中には入らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q32",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "統計力学",
    "topicTags": [
      "一様重力場の理想気体と古典分配関数",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "質量mの古典力学に従う粒子N個からなる理想気体が一様な重力場中にある。鉛直上向きにz軸を選んだxyz座標系をとり、気体は0≦x≦L、0≦y≦L、0≦z≦Aの領域に閉じ込められているものとする。1粒子の系で粒子の運動量と位置をそれぞれpとrとし、重力加速度の大きさをgとすると、系のハミルトニアンはH(p,r)＝p²/(2m)＋mgzと表される。\n温度Tの熱平衡状態を考えると、1粒子の系の分配関数はZ(β)＝(1/h³)∫∫d³p d³r exp[−βH(p,r)]である。ここで、β＝1/(k_B T)は逆温度、k_Bはボルツマン定数、hはプランク定数である。粒子数Nの系の分配関数として最も妥当なのはどれか。なお、必要ならば∫[−∞,∞]exp(−ax²)dx＝√(π/a)（a＞0）を用いてよい。",
    "choices": {
      "ア": "(1/N!)(L²/mg)^N(1−e^(−βmgA))^N(2πm/h²)^(3N/2)β^(−3N/2)",
      "イ": "(1/N!)(L²A/mg)^N(1−e^(−βmgA))^N(2πm/h²)^(3N/2)β^(−3N/2)",
      "ウ": "(1/N!)(L²/mg)^N(1−e^(−βmgA))^N(2πm/h²)^(3N/2)β^(−5N/2)",
      "エ": "(1/N!)(L²A/mg)^N(1−e^(−βmgA))^N(2πm/h²)^(3N/2)β^(−5N/2)",
      "オ": "(1/N!)(L³/mg)^N(1−e^(−βmgA))^N(2πm/h²)^(3N/2)β^(−5N/2)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "運動量積分は(2πm/β)^(3/2)、位置積分はL²(1−e^(−βmgA))/(βmg)である。h³で割った1粒子分をN乗し、粒子の入替えによる重複を除くN!で割るとこの式になる。",
    "choiceExplanations": {
      "ア": "三方向の運動量積分から粒子ごとにβ⁻³ᐟ²が出る。さらに鉛直方向の積分で1/(βmg)が出るので、合わせたβの指数は−5N/2である。",
      "イ": "水平二方向の位置積分はL²で、鉛直の積分は(1−e^(−βmgA))/(βmg)である。高さAを前に掛ける必要はなく、鉛直積分のβ⁻¹も含める。",
      "ウ": "運動量積分は(2πm/β)^(3/2)、位置積分はL²(1−e^(−βmgA))/(βmg)である。h³で割った1粒子分をN乗し、粒子の入替えによる重複を除くN!で割るとこの式になる。",
      "エ": "β^(−5N/2)は妥当である。高さAは鉛直積分の上限として指数の中に現れるので、位置積分の前にL²Aを掛けるとAを余計に数える。",
      "オ": "x、yの積分で幅Lを二回掛ける。z方向は重力のポテンシャルにより一様な積分ではないので、L³は現れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q33",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "統計力学",
    "topicTags": [
      "カノニカル分布のシャノンエントロピー",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "エントロピーに関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n量子力学に従う系のエネルギー固有状態にi＝1,2,…と番号を付け、そのエネルギー固有値をEᵢとする。この系の温度Tの熱平衡状態を考える。カノニカル分布はi番目のエネルギー固有状態を取る確率pᵢをpᵢ＝e^(−βEᵢ)/Z(β)、Z(β)＝Σᵢe^(−βEᵢ)とする確率分布である。ここで、β＝1/(k_B T)は逆温度、k_Bはボルツマン定数、Z(β)は分配関数である。この確率分布のシャノンエントロピーはH＝−Σᵢpᵢ ln pᵢ＝㋐〈Eᵢ〉＋ln Z(β)＝㋐(〈Eᵢ〉＋㋑)となる。ここで、〈Eᵢ〉はエネルギーの期待値、F(β)はヘルムホルツ自由エネルギーである。",
    "choices": {
      "ア": "㋐：β、㋑：−F(β)",
      "イ": "㋐：β、㋑：F(β)",
      "ウ": "㋐：1/β、㋑：−F(β)",
      "エ": "㋐：1/β、㋑：F(β)",
      "オ": "㋐：1/β、㋑：F(β)/β"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "対数を取るとln pᵢ＝−βEᵢ−ln Zである。−Σᵢpᵢ ln pᵢ＝β〈Eᵢ〉＋ln Zで、F＝−(ln Z)/βを使うとβ(〈Eᵢ〉−F)になる。",
    "choiceExplanations": {
      "ア": "対数を取るとln pᵢ＝−βEᵢ−ln Zである。−Σᵢpᵢ ln pᵢ＝β〈Eᵢ〉＋ln Zで、F＝−(ln Z)/βを使うとβ(〈Eᵢ〉−F)になる。",
      "イ": "期待値にβを掛ける点は妥当である。自由エネルギーの定義からln Z＝−βFなので、括弧の中ではFを引く。",
      "ウ": "括弧の中の自由エネルギーの符号は妥当である。−ln pᵢに出るエネルギー項はβEᵢなので、期待値には1/βでなくβを掛ける。",
      "エ": "確率の指数に−βEᵢがあるので、エネルギー期待値の係数はβである。またヘルムホルツ自由エネルギーは−ln Z/βなので、括弧内の符号は負になる。",
      "オ": "シャノンエントロピーは無次元で、エネルギーの期待値に逆エネルギーの次元をもつβを掛ける。ln Zは−βFに等しいので、括弧内にF/βは現れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q34",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "ポテンシャル段差で減衰する波動関数",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "量子力学的粒子の1次元の散乱問題を考える。ポテンシャル障壁はx＜0でU(x)＝0、0≦xでU(x)＝U₀（U₀＞0）とする。これに質量m、エネルギーE（E＜U₀）の粒子がx＜0の領域からx軸の正の向きに入射する。このとき、x＞0での波動関数として最も妥当なのはどれか。\nただし、A、Bを任意の定数、β＝√[2m(U₀−E)]/ℏとする。iは虚数単位である。",
    "choices": {
      "ア": "A e^(iβx)＋B e^(−iβx)",
      "イ": "A e^(iβx)",
      "ウ": "A e^(−iβx)",
      "エ": "A e^(βx)＋B e^(−βx)",
      "オ": "A e^(−βx)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "障壁内の時間に依存しない方程式はψ″＝β²ψであり、解は実指数の増加項と減衰項からなる。領域が正の無限遠まで続くので発散項を除き、A e^(−βx)となる。",
    "choiceExplanations": {
      "ア": "障壁内ではエネルギーがポテンシャルより低く、シュレーディンガー方程式はψ″＝β²ψになる。虚数指数の振動波を足し合わせてもこの方程式は満たせない。",
      "イ": "A e^(iβx)を二階微分すると−β²を掛けた式になる。E＜U₀の領域で必要な二階微分の係数は正のβ²である。",
      "ウ": "虚数指数ではxが大きくなっても振幅は減らない。障壁内の方程式には実指数が現れ、無限遠に向けて減衰する解を採る。",
      "エ": "二つの指数関数は局所的な方程式の一般解になる。x＞0の領域は無限に続き、e^(βx)があると遠方で発散するので、その係数を0にする必要がある。",
      "オ": "障壁内の時間に依存しない方程式はψ″＝β²ψであり、解は実指数の増加項と減衰項からなる。領域が正の無限遠まで続くので発散項を除き、A e^(−βx)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q35",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "二つのスピン1の合成とエネルギー固有値",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "大きさ1の二つのスピンS₁、S₂からなる系があり、系のハミルトニアンがH＝−(J/ℏ²)S₁·S₂＝−J[(S₁＋S₂)²−S₁²−S₂²]/(2ℏ²)であるとする（Jは定数）。系のエネルギー固有値のみを、Jを単位として全て挙げたものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0、1、2",
      "イ": "−1、1、2",
      "ウ": "−2、0、2",
      "エ": "−1、0、1、2",
      "オ": "−2、−1、0、1、2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二つのスピン1を合成すると、全スピンjは0、1、2となる。個々のスピン二乗の合計は4ℏ²なので、E/J＝−[j(j＋1)−4]/2に代入すると2、1、−1である。",
    "choiceExplanations": {
      "ア": "合成スピン2では(S₁＋S₂)²の固有値が6ℏ²、S₁²とS₂²の和が4ℏ²である。よって対応するエネルギーは0ではなく−Jになる。",
      "イ": "二つのスピン1を合成すると、全スピンjは0、1、2となる。個々のスピン二乗の合計は4ℏ²なので、E/J＝−[j(j＋1)−4]/2に代入すると2、1、−1である。",
      "ウ": "2はj＝0に対応する。j＝1でj(j＋1)＝2、j＝2で6になるので、他の固有値は0と−2ではなく1と−1になる。",
      "エ": "−1、1、2は取り得る値である。E/J＝0にするにはj(j＋1)＝4となる合成スピンが必要だが、j＝0、1、2のどれも当てはまらない。",
      "オ": "合成スピンは三通りで、それぞれの磁気量子数の違いは全スピンの二乗を変えない。したがってエネルギーの値は三種類で、−2と0は生じない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q36",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "量子調和振動子のコヒーレント状態",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ハミルトニアンH＝ℏω(a†a＋1/2)、[a,a†]＝1をもつ1次元の量子力学的調和振動子系を考える。ここで、a、a†はそれぞれ消滅、生成演算子であり、基底状態∣0〉はa∣0〉＝0によって与えられる。λを複素数として、コヒーレント状態を∣λ〉＝e^(λa†)∣0〉、e^(λa†)＝Σₙ₌₀^∞(λⁿ/n!)(a†)ⁿによって定義し、その時間発展を考える。時刻tでの状態∣λ,t〉＝e^(−itH/ℏ)∣λ〉を計算して求めた結果として最も妥当なのはどれか。\nただし、iは虚数単位であり、λ*はλの複素共役である。なお、必要ならばe^(−iωta†a)(a†)ⁿ∣0〉＝e^(−inωt)(a†)ⁿ∣0〉を用いてよい。",
    "choices": {
      "ア": "e^(−iωt/2)∣λ〉",
      "イ": "e^(−iωt/2)∣λ cos ωt〉",
      "ウ": "e^(−iωt/2)∣λ e^(−iωt)〉",
      "エ": "e^(−iωt/2)e^[λ(1＋ωt)a†]∣0〉",
      "オ": "e^(−iωt/2)∣λ e^(−iωt)＋λ* e^(iωt)〉"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各(a†)ⁿ∣0〉成分にはe^[−iωt(n＋1/2)]が掛かる。全体位相e^(−iωt/2)を外に出して残りの因子をλⁿにまとめると、∣λ e^(−iωt)〉が残る。",
    "choiceExplanations": {
      "ア": "零点エネルギーによる全体の位相は妥当である。各励起数nの成分にさらにe^(−inωt)が掛かるため、状態のパラメータλにも位相変化が生じる。",
      "イ": "時間発展ではλが複素平面で回転し、その絶対値は変わらない。実数のcos ωtを掛けると絶対値も変わるので、数状態ごとの位相の変化を表せない。",
      "ウ": "各(a†)ⁿ∣0〉成分にはe^[−iωt(n＋1/2)]が掛かる。全体位相e^(−iωt/2)を外に出して残りの因子をλⁿにまとめると、∣λ e^(−iωt)〉が残る。",
      "エ": "各励起数の成分は大きさを保ったまま位相だけが変わる。コヒーレント状態のパラメータに掛かるのは大きさ1のe^(−iωt)であり、実数の係数1＋ωtではない。",
      "オ": "数状態の各係数λⁿには位相e^(−inωt)を掛ける。複素共役λ*の成分はもとの級数にないため、時間発展の式に追加されない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q37",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "固体物理",
    "topicTags": [
      "アインシュタイン模型とデバイ模型の低温比熱",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "固体の格子振動による比熱に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n格子振動を独立な振動モードの量子力学的調和振動子の集まりとみなして、その比熱を考える。振動モードにs＝1,2,…と番号をふり、モードs、波数kの調和振動子の角振動数をω_(s,k)とする。カノニカル分布を用いると、温度Tの熱平衡状態のエネルギーはU(T)＝Σ_sΣ_k ℏω_(s,k)/[e^(ℏω_(s,k)/(k_B T))−1]である。ただし、k_Bはボルツマン定数で、ゼロ点振動のエネルギーは除いた。アインシュタインモデルは全ての調和振動子が同じ角振動数ωをもつとするモデルで、このとき比熱は低温でC(T)≃A㋐という温度依存性をもつ。ここで、Aは温度に依らない定数である。デバイは、低温では長波長の音響モードの寄与が支配的になることを考慮してモデルを改良し、低温で㋑に比例する比熱を得た。",
    "choices": {
      "ア": "㋐：e^(−ℏω/(k_B T))、㋑：T",
      "イ": "㋐：e^(−ℏω/(k_B T))、㋑：T³",
      "ウ": "㋐：e^(−ℏω/(k_B T))/T²、㋑：T",
      "エ": "㋐：e^(−ℏω/(k_B T))/T²、㋑：T³",
      "オ": "㋐：e^(−ℏω/(k_B T))/T²、㋑：T e^(−ℏω/(k_B T))"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "アインシュタイン模型の低温のエネルギーはe^(−ℏω/(k_B T))に比例し、温度微分でT⁻²が掛かる。デバイ模型の三次元音響モードでは、低温のエネルギーはT⁴に比例するので比熱はT³である。",
    "choiceExplanations": {
      "ア": "アインシュタイン模型の低温のエネルギーは指数関数で近似できるが、比熱はその温度微分なのでT⁻²が加わる。三次元のデバイ比熱はT³に比例する。",
      "イ": "デバイのT³則は妥当である。アインシュタイン比熱を求める際はエネルギーを温度で微分し、指数の微分からT⁻²が生じる。",
      "ウ": "アインシュタイン模型の低温の形は妥当である。三次元の音響モードの状態密度は角振動数の二乗に比例するので、デバイ比熱はT³になる。",
      "エ": "アインシュタイン模型の低温のエネルギーはe^(−ℏω/(k_B T))に比例し、温度微分でT⁻²が掛かる。デバイ模型の三次元音響モードでは、低温のエネルギーはT⁴に比例するので比熱はT³である。",
      "オ": "単一振動数のアインシュタイン模型では指数関数で低温の比熱が小さくなる。デバイ模型には任意に低い周波数の音響モードがあるので、比熱は固定したωを含む指数関数ではなくT³に従う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q38",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "相対論",
    "topicTags": [
      "相対論的自由粒子の正準運動量",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "相対論的に運動する静止質量m₀の自由粒子の作用Sは、S＝∫Ldt、L＝−m₀c²√(1−v⃗²/c²)、v⃗＝dx⃗(t)/dtで与えられる。ここで、x⃗(t)＝(x(t), y(t), z(t))は粒子の位置、tは時刻、cは光速である。この粒子が従うEuler–Lagrangeの方程式∂L/∂x⃗＝d(∂L/∂v⃗)/dtとして最も妥当なのはどれか。",
    "choices": {
      "ア": "m₀ dv⃗/dt＝0",
      "イ": "d[m₀c²/√(1−v⃗²/c²)]/dt＝0",
      "ウ": "m₀c² d[√(1−v⃗²/c²)]/dt＝0",
      "エ": "d[m₀v⃗/√(1−v⃗²/c²)]/dt＝0",
      "オ": "m₀v⃗ d[√(1−v⃗²/c²)]/dt＝0"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Lは位置x⃗に陽に依存しないので左辺は0である。速度で微分すると∂L/∂v⃗＝m₀v⃗/√(1−v⃗²/c²)なので、これの時間微分が0になる。",
    "choiceExplanations": {
      "ア": "自由粒子の速度が一定という結論にはつながるが、m₀v⃗は低速での運動量の形である。与えられた相対論的ラグランジアンの速度微分には1/√(1−v⃗²/c²)が付く。",
      "イ": "括弧内は相対論的エネルギーであり、自由粒子では保存される。設問の位置ベクトルに対する変分では、速度について微分したベクトルの運動量が現れる。",
      "ウ": "平方根の時間変化だけでは速さの変化しか捉えられない。位置の各成分に対するオイラー・ラグランジュ方程式は、運動量ベクトルの時間変化を含む。",
      "エ": "Lは位置x⃗に陽に依存しないので左辺は0である。速度で微分すると∂L/∂v⃗＝m₀v⃗/√(1−v⃗²/c²)なので、これの時間微分が0になる。",
      "オ": "時間微分は速度ベクトルと相対論的係数の積全体に作用する。この候補は速度を微分の外に置き、係数にも逆数を使っていない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q39",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "原子物理",
    "topicTags": [
      "医療画像用テクネチウム99mの親核種と放射線",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射性物質の利用に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\nテクネチウム⁹⁹ᵐ₄₃Tcは医療画像用に一般的に用いられる放射性同位元素である。この同位元素は、親核種㋐から生成されている。㋐は半減期66時間でβ線を放出して準安定状態のテクネチウム⁹⁹ᵐ₄₃Tcとなる。生成された⁹⁹ᵐ₄₃Tcは化学処理で分離されて利用されるが、半減期6時間で主に141 keVの㋑を放出して安定な⁹⁹₄₃Tcになる。",
    "choices": {
      "ア": "㋐：⁹⁹₄₂Mo、㋑：陽電子",
      "イ": "㋐：⁹⁹₄₂Mo、㋑：γ線",
      "ウ": "㋐：⁹⁹₄₄Ru、㋑：陽電子",
      "エ": "㋐：⁹⁹₄₄Ru、㋑：γ線",
      "オ": "㋐：⁹⁹₄₄Ru、㋑：X線"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "モリブデン99はβ⁻崩壊でテクネチウム99mを生じ、この準安定状態からの遷移では主に約141 keVのγ線が出る。原文は遷移先を「安定な」とするが、テクネチウム99も放射性核種で、半減期は約21万年である。",
    "choiceExplanations": {
      "ア": "モリブデン99を親核種とする点は妥当である。テクネチウム99mからテクネチウム99への遷移では原子番号は変わらず、主にγ線が出る。",
      "イ": "モリブデン99はβ⁻崩壊でテクネチウム99mを生じ、この準安定状態からの遷移では主に約141 keVのγ線が出る。原文は遷移先を「安定な」とするが、テクネチウム99も放射性核種で、半減期は約21万年である。",
      "ウ": "原子番号44のルテニウム99からβ⁻崩壊で生じると仮定すると原子番号は増えるので、43のテクネチウムにならない。また、観測する主な放射線はγ線である。",
      "エ": "テクネチウム99mが主にγ線を出す点は妥当である。β⁻崩壊で原子番号43になる親核種は原子番号42のモリブデン99である。",
      "オ": "親核種はモリブデン99である。141 keV付近の主な光子は核のエネルギー準位の変化で出るγ線で、電子殻の遷移による特性X線とは区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。 テクネチウム99の半減期は日本原子力研究開発機構の用語解説も参照。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q40",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "相対論",
    "topicTags": [
      "シュヴァルツシルト時空の動径方向の固有距離",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "質量Mのブラックホールの周りの定常静的球対称な時空は、計量ds²＝−(1−r_s/r)(c dt)²＋[1/(1−r_s/r)]dr²＋r²(dθ²＋sin²θ dφ²)、r_s＝2GM/c²で記述される。ここで、cは光速、Gはニュートンの重力定数である。(ct,r,θ,φ)は4次元時空間を記述する座標で、tは時間座標、rは動径座標であり、r＝0はブラックホールの中心に対応する。θ、φはブラックホールの中心から見た通常の3次元極座標の方向角である。\ndsは、座標値の微小な変化dt、dr、dθ、dφに対応する世界間隔であり、dt＝0にすればdr、dθ、dφに対応する2点(r,θ,φ)、(r＋dr,θ＋dθ,φ＋dφ)の間の実際の距離を表す。有限に離れた2点間の距離Lは、これを積分することによって与えられ、L＝∫dsである。同じ方向角(θ,φ)をもつ2点A(r₁,θ,φ)、B(r₂,θ,φ)の間の実際の距離Lが満たす式として最も妥当なのはどれか。ただし、r₁＜r₂とする。",
    "choices": {
      "ア": "L＝0",
      "イ": "L＜r₂−r₁",
      "ウ": "L＝r₂−r₁",
      "エ": "L＞r₂−r₁",
      "オ": "L～∞"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "静的な外部領域r₂＞r₁＞r_sで、同時刻・同じ角度に沿う微小距離はds＝dr/√(1−r_s/r)である。係数が全区間で1を超えるため、積分した固有距離はr₂−r₁より長い。",
    "choiceExplanations": {
      "ア": "同じ角度方向でもr₁とr₂が異なれば動径方向に距離がある。静的な外部領域では、その間の微小固有距離は正の係数をdrに掛けたものになる。",
      "イ": "ブラックホール外部では0＜1−r_s/r＜1である。動径方向の距離要素はdrをその平方根で割ったものなので、積分は座標差を上回る。",
      "ウ": "L＝r₂−r₁は動径方向の計量成分が1の場合に成立する。質量Mが正であると有限の外部座標ではこの成分が1より大きい。",
      "エ": "静的な外部領域r₂＞r₁＞r_sで、同時刻・同じ角度に沿う微小距離はds＝dr/√(1−r_s/r)である。係数が全区間で1を超えるため、積分した固有距離はr₂−r₁より長い。",
      "オ": "有限な二点がともに外部にあれば、区間内で距離要素の係数は有限である。したがって固有距離は座標差より大きいが、無限大にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q41",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "気温減率と大気の絶対安定",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "気温の高さ方向の変化にマイナスの符号を付けたものを気温減率と呼ぶ。例えば、標準大気の気温減率は0.0065℃/mである。\n気温減率Γの大気が絶対安定である場合を考える。絶対安定とは、空気塊が飽和しているかどうかに関係なく、空気塊が上昇した場合に周囲よりも密度が大きくなり、下向きに復元力が働く状態である。乾燥断熱減率をΓ_d、湿潤断熱減率をΓ_mとしたとき、Γ、Γ_d、Γ_mの関係として最も妥当なのはどれか。\nここで、乾燥断熱減率とは乾燥した空気塊が断熱的に上昇するときの気温減率、湿潤断熱減率とは水蒸気で飽和している空気塊が断熱的に上昇するときの気温減率であり、いずれも正の値である。",
    "choices": {
      "ア": "Γ＜Γ_m＜Γ_d",
      "イ": "Γ＜Γ_d＜Γ_m",
      "ウ": "Γ_m＜Γ＜Γ_d",
      "エ": "Γ_m＜Γ_d＜Γ",
      "オ": "Γ_d＜Γ_m＜Γ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "飽和した空気塊の上昇では凝結潜熱が放出されるため、冷え方は乾燥時より小さくΓ_m＜Γ_dとなる。どちらの空気塊も周囲より速く冷えて復元力を受けるには、環境の減率がΓ_mより小さくなければならない。",
    "choiceExplanations": {
      "ア": "飽和した空気塊の上昇では凝結潜熱が放出されるため、冷え方は乾燥時より小さくΓ_m＜Γ_dとなる。どちらの空気塊も周囲より速く冷えて復元力を受けるには、環境の減率がΓ_mより小さくなければならない。",
      "イ": "環境の減率が両方の断熱減率より小さい点は妥当である。水蒸気が凝結すると潜熱が生じて冷却を緩和するため、湿潤断熱減率は乾燥断熱減率より小さい。",
      "ウ": "Γが湿潤と乾燥の間にある場合、未飽和の空気塊は周囲より冷えるが、飽和した空気塊は周囲より暖かくなる。これは条件付き不安定に当たる。",
      "エ": "環境の減率が乾燥断熱減率より大きいと、乾燥・湿潤いずれの空気塊も上方で周囲より暖かくなる。そのため浮力は上昇を助ける方向に働く。",
      "オ": "凝結潜熱のためΓ_mはΓ_dより小さい。環境の減率が両方より大きければ、上昇した空気塊は周囲より冷たくならず、絶対安定の条件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q42",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "持ち上げ凝結高度から求める地表近くの露点",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "標高100 mにおいて気温30℃の空気塊がある。この空気塊が断熱的に上昇したところ、標高1700 mを雲底高度とする雲が発生した。この空気塊の標高100 mにおける露点温度として最も妥当なのはどれか。\nただし、乾燥断熱減率は0.010℃/mとする。また、露点温度は標高が1 m上がるごとに0.0020℃下がるものとする。",
    "choices": {
      "ア": "15℃",
      "イ": "17℃",
      "ウ": "19℃",
      "エ": "21℃",
      "オ": "23℃"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "上昇距離は1700−100＝1600 mなので、雲底の気温は30−0.010×1600＝14℃となる。そこでは露点も14℃であり、上昇中の低下分0.0020×1600＝3.2℃を戻すと元の露点は約17℃となる。",
    "choiceExplanations": {
      "ア": "空気塊は1600 m上昇する間に16℃冷え、雲底における気温と露点はともに14℃になる。元の露点は上昇中の低下分3.2℃を足すので約17℃である。",
      "イ": "上昇距離は1700−100＝1600 mなので、雲底の気温は30−0.010×1600＝14℃となる。そこでは露点も14℃であり、上昇中の低下分0.0020×1600＝3.2℃を戻すと元の露点は約17℃となる。",
      "ウ": "地上の気温と露点の差は、空気塊の気温と露点の減率の差0.0080℃/mに1600 mを掛けた12.8℃である。したがって露点は30−12.8＝17.2℃である。",
      "エ": "露点を21℃とすると最初の気温との差は9℃である。差は1 m当たり0.0080℃縮むので、飽和するのは1600 m上昇する前になる。",
      "オ": "露点が23℃なら最初の露点差は7℃しかない。温度と露点の差が0になるのは7/0.0080＝875 m上昇した時点で、示された雲底と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q43",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "ロスビー波の絶対渦度と分散関係",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "惑星波（ロスビー波）に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n地球上（座標系は球座標）を非圧縮性流体が一定の深さで覆うものと近似して、水平面（球面）内の二次元運動を考える。このとき、㋐渦度の鉛直成分に対する保存則は∂(∇²ψ)/∂t＋v·∇(∇²ψ＋2Ω sin φ)＝0と書くことができる。ここで、tは時間、ψは流線関数、Ωは自転角速度、φは緯度であり、vはψから導かれる速度である。\n簡単のため、緯度φ₀の点の接平面上に局所直角座標をとり、xを東向き座標、yを北向き座標、aを地球の半径として式の近似を作ると、∂(∇²ψ)/∂t＋∂(ψ,∇²ψ)/∂(x,y)＋β∂ψ/∂x＝0となる。ここで、β＝[∂(2Ω sin φ)/∂y]_(φ₀)＝㋑である。この式はexp[i(kx＋ly−ωt)]という形の波動解をもち、その分散関係は㋒となる。ここで、iは虚数単位、kはx方向の波数、lはy方向の波数、ωは周波数である。分散関係が示すように、位相速度は㋓向きに限られる。",
    "choices": {
      "ア": "㋐：絶対、㋑：2Ω cos φ₀/a、㋒：ω＝−βk/(k²＋l²)、㋓：西",
      "イ": "㋐：絶対、㋑：2Ω cos φ₀/a、㋒：ω＝βk/(k²＋l²)、㋓：東",
      "ウ": "㋐：惑星、㋑：2Ω cos φ₀/(aφ₀)、㋒：ω＝−βk/(k²＋l²)、㋓：西",
      "エ": "㋐：惑星、㋑：2Ω cos φ₀/a、㋒：ω＝−βk/(k²＋l²)、㋓：東",
      "オ": "㋐：相対、㋑：2Ω cos φ₀/(aφ₀)、㋒：ω＝βk/(k²＋l²)、㋓：東"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "相対渦度∇²ψと惑星渦度2Ω sin φの和が絶対渦度で、dy＝a dφよりβ＝2Ω cos φ₀/aとなる。平面波ではヤコビアンが消え、ω＝−βk/(k²＋l²)を得るので、位相の東西成分ω/kは負で西向きになる。",
    "choiceExplanations": {
      "ア": "相対渦度∇²ψと惑星渦度2Ω sin φの和が絶対渦度で、dy＝a dφよりβ＝2Ω cos φ₀/aとなる。平面波ではヤコビアンが消え、ω＝−βk/(k²＋l²)を得るので、位相の東西成分ω/kは負で西向きになる。",
      "イ": "絶対渦度とβの式は妥当である。波を代入すると時間微分項とβ項からω(k²＋l²)＋βk＝0となり、符号は負、西向きになる。",
      "ウ": "分散関係と西向きは妥当である。保存されるのは惑星渦度に相対渦度も加えた絶対渦度で、βの分母はdy/dφに当たるaである。",
      "エ": "βと分散関係は妥当である。保存則で使う量は惑星渦度と相対渦度の和で、ω/k＝−β/(k²＋l²)は西向きである。",
      "オ": "相対渦度だけではなく地球の自転による成分も移流項に入る。βは2Ω cos φ₀/aとなり、東西方向の位相速度には負号が付く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q44",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "地衡風の鉛直シアと温度風",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "静水圧バランスと地衡風バランスを満たす大気の温度風に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\nなお、上層の水平風ベクトルから下層の水平風ベクトルを引いたものを鉛直シアと呼ぶ。例えば、下層よりも上層で西風（東向きの風）が強い場合は、鉛直シアは東向きとなる。\n㋐ 平均的に北ほど温度が低くなる北半球の中緯度では、鉛直シアは西向きとなる。\n㋑ 温度の南北勾配の大きさが同じ場合、緯度が高いほど東西方向の鉛直シアは小さくなる。\n㋒ 平均的に北ほど温度が高くなる南半球の中緯度では、鉛直シアは西向きとなる。\n㋓ 北半球で局所的に北ほど温度が高くなる場所では、鉛直シアは西向きとなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "東西方向の鉛直シアは北向き温度勾配を符号反転し、コリオリ係数fで割った量に比例する。高緯度ほど∣f∣が大きくなって同じ勾配ならシアが小さく、北半球で北ほど暖かければシアは西向きとなる。",
    "choiceExplanations": {
      "ア": "コリオリ係数の絶対値が大きいと鉛直シアが小さくなる㋑は妥当である。北半球で温度が北へ下がる場合は、上層ほど東向きの地衡風が強くなる。",
      "イ": "北半球で北ほど寒い場合と、南半球で北ほど暖かい場合では、温度勾配とコリオリ係数の符号が両方逆になる。両方で鉛直シアは東向きなので、二つとも合わない。",
      "ウ": "㋑は妥当である。㋒では南半球でf＜0、北向きの温度勾配が正なので、鉛直シアの東西成分は東向きになる。",
      "エ": "東西方向の鉛直シアは北向き温度勾配を符号反転し、コリオリ係数fで割った量に比例する。高緯度ほど∣f∣が大きくなって同じ勾配ならシアが小さく、北半球で北ほど暖かければシアは西向きとなる。",
      "オ": "㋓は北半球でfが正なので妥当である。南半球ではfが負で、北ほど暖かい場合のシアは㋒の西向きと逆の東向きになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q45",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "海洋物理",
    "topicTags": [
      "深水波と浅水波の位相速度",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "海洋における波に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n重力を復元力として水面を伝わる微小振幅の波の位相速度CはC＝√[(g/k)tanh(kh)]で表せる。ここで、kは波数であり、波長をλとすると、k＝2π/λである。また、gは重力加速度の大きさ、hは水深である。\n波長が水深に比べて十分に小さい場合の位相速度は、tanhの性質から㋐で近似できる。実際の海洋での波では㋑がその例である。一方、波長が水深に比べて非常に大きい場合の位相速度は同様に㋒で近似できる。㋓がその例である。",
    "choices": {
      "ア": "㋐：√(gh)、㋑：うねり、㋒：√(g/k)、㋓：津波",
      "イ": "㋐：√(gh)、㋑：津波、㋒：√(g/k)、㋓：うねり",
      "ウ": "㋐：√(g/k)、㋑：うねり、㋒：√(gh)、㋓：津波",
      "エ": "㋐：√(g/k)、㋑：津波、㋒：√(gh)、㋓：うねり",
      "オ": "㋐：√(g/k)、㋑：津波、㋒：√(2gh)、㋓：うねり"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "波長が短ければkhが大きくtanh(kh)≃1なので、うねりなどの深水波は√(g/k)に近い。津波のように波長が十分長いとtanh(kh)≃khとなり、速度は√(gh)に近づく。",
    "choiceExplanations": {
      "ア": "うねりと津波の例は妥当である。深水波の位相速度はtanh(kh)を1に近似して求め、浅水波ではkhで近似するので、提示された速度の式は逆である。",
      "イ": "波長が短い場合はkhが大きく、位相速度は√(g/k)になる。長い波長の津波は、深い海でも水深に比べて波長が大きいので浅水波として扱われる。",
      "ウ": "波長が短ければkhが大きくtanh(kh)≃1なので、うねりなどの深水波は√(g/k)に近い。津波のように波長が十分長いとtanh(kh)≃khとなり、速度は√(gh)に近づく。",
      "エ": "深水波と浅水波の速度式は妥当である。うねりは波長が水深より短い深水波の例、津波は波長が非常に長い浅水波の例である。",
      "オ": "深水波の速度式は妥当である。津波に対応する浅水波ではtanh(kh)≃khを用い、速さは√(gh)となるので、その中に2は入らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q46",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "海洋物理",
    "topicTags": [
      "黒潮の流路と大蛇行",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "黒潮に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n黒潮は海洋の亜熱帯循環の一部分として太平洋の西端を低緯度から高緯度の方向へ流れる大海流である。北赤道海流の続きとして㋐東方から北上し、九州の南から本州南岸に沿って流れ、北太平洋海流につながる。流れの幅は100～200 km、厚さは㋑ mで、表面流速は平均1.5 m/s程度であるが、2.5 m/s近くに達することもある。高温（夏季で30℃に近い）、㋒（冬季には3.48%）で、水色が濃藍色であるところから黒潮の名が付けられた。安定した流路が二つあるのが大きな特徴で、一つは日本の南岸に沿って直進し、もう一つは紀州沖にかけて南側に大きく迂回する。後者は大蛇行と呼ばれ、その内側は反時計回りの㋓渦を形成している。この渦は大㋓塊とも呼ばれ、気象や漁場に影響を与える。",
    "choices": {
      "ア": "㋐：沖縄、㋑：数十、㋒：高塩分、㋓：暖水",
      "イ": "㋐：沖縄、㋑：数百、㋒：低塩分、㋓：冷水",
      "ウ": "㋐：フィリピン、㋑：数十、㋒：低塩分、㋓：暖水",
      "エ": "㋐：フィリピン、㋑：数百、㋒：高塩分、㋓：冷水",
      "オ": "㋐：フィリピン、㋑：数百、㋒：低塩分、㋓：冷水"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "北赤道海流の一部はフィリピン東方で北へ向かい、厚さ数百mに及ぶ高温・高塩分の黒潮となる。大蛇行の内側は北半球の低気圧性の反時計回り渦となり、冷水塊ができる。",
    "choiceExplanations": {
      "ア": "黒潮は高温・高塩分である。北赤道海流から分かれて北上する位置はフィリピン東方で、流れは数百mの深さに及び、大蛇行の内側には冷水渦ができる。",
      "イ": "流れの厚さと大蛇行内側の冷水渦は妥当である。北上を始めるのは沖縄東方より南のフィリピン東方であり、黒潮は比較的塩分が高い。",
      "ウ": "フィリピン東方から北上する点は妥当である。流れは数十mより深く数百mに及ぶ高塩分の海流で、大蛇行の内側には冷水渦が形成される。",
      "エ": "北赤道海流の一部はフィリピン東方で北へ向かい、厚さ数百mに及ぶ高温・高塩分の黒潮となる。大蛇行の内側は北半球の低気圧性の反時計回り渦となり、冷水塊ができる。",
      "オ": "流路、厚さ、冷水渦は妥当である。冬季の3.48%は比較的高い塩分であり、黒潮は高温・高塩分の海流として捉えられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q47",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "海洋物理",
    "topicTags": [
      "エクマンらせんと風応力のカール",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "海洋のエクマン境界層に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。ただし、鉛直渦動粘性係数は一定と考える。\n海上風により海面に応力が与えられると、北半球ではエクマン境界層内での流れは深さとともに㋐に向きを変えながら減衰する構造（エクマンらせん）をもつ。鉛直渦動粘性係数の値が大きくなった場合、エクマン境界層の厚さは㋑なる。エクマン境界層内の流れを鉛直平均すると、応力の向きに直交する流れとなる。海上風が反時計回りの応力（正のトルク）を与える場合、鉛直平均した流れは水平方向に㋒する場となる。",
    "choices": {
      "ア": "㋐：時計回り、㋑：大きく、㋒：収束",
      "イ": "㋐：時計回り、㋑：大きく、㋒：発散",
      "ウ": "㋐：時計回り、㋑：小さく、㋒：収束",
      "エ": "㋐：反時計回り、㋑：大きく、㋒：収束",
      "オ": "㋐：反時計回り、㋑：小さく、㋒：発散"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "北半球の流れは深くなるほど時計回りに向きが変わり、粘性が大きいほど風の影響が深く伝わる。鉛直平均した輸送は風応力の右向きなので、反時計回りの応力を受けると渦の外へ向かい発散する。",
    "choiceExplanations": {
      "ア": "北半球での時計回りと、粘性係数の増加に伴う層の厚さの増加は妥当である。風応力の右を向く輸送は反時計回りの風応力に対し外向きとなる。",
      "イ": "北半球の流れは深くなるほど時計回りに向きが変わり、粘性が大きいほど風の影響が深く伝わる。鉛直平均した輸送は風応力の右向きなので、反時計回りの応力を受けると渦の外へ向かい発散する。",
      "ウ": "時計回りのらせんは妥当である。層の厚さは渦動粘性係数の平方根に比例し、反時計回りの応力では北半球の右向き輸送が外側を向く。",
      "エ": "粘性が増すと境界層が厚くなる点は妥当である。北半球では深くなるほど流れが時計回りに変わり、反時計回りの応力に対して輸送が発散する。",
      "オ": "発散する点は妥当である。北半球の吹送流は深さとともに時計回りに変わり、粘性が大きい場合は深いところまで運動量が伝わるため境界層は厚くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q48",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "沈み込み帯の地震と地震規模",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "プレートテクトニクス及びそれと関係する事柄に関する記述㋐～㋔のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 2011年の東北地方太平洋沖地震のモーメントマグニチュードは9.0であった。この地震のエネルギーは、モーメントマグニチュード8.0の地震の約1000倍である。\n㋑ 一般に、中小地震に比べて、大地震の方が地震波の卓越周波数は高くなる。\n㋒ 日本海溝など陸のプレートの下に海洋プレートが沈み込む場所において、その二つのプレートの境界で発生する大地震の典型的なメカニズムは逆断層型である。\n㋓ 現在、日本海溝に沈み込んでいる太平洋プレートはおよそ3000万年前に東太平洋海膨（海嶺）で誕生したものである。\n㋔ 日本周辺では300 kmより深い場所でも地震が発生している。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓、㋔",
      "ウ": "㋑、㋒",
      "エ": "㋒、㋓",
      "オ": "㋒、㋔"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "沈み込み境界ではプレートが圧縮され、典型的な境界地震は逆断層型になる。沈み込むプレートに沿って深発地震も起こり、日本周辺では深さ300 kmを超える地震が観測される。",
    "choiceExplanations": {
      "ア": "マグニチュードが1大きいとエネルギーはおおむね10^1.5倍、約32倍になる。大地震ほど断層が長く破壊に時間がかかるので、相対的に低い周波数が卓越しやすい。",
      "イ": "深発地震を述べた㋔は妥当である。マグニチュード1の差はエネルギーで約32倍であり、日本海溝に沈み込む太平洋プレートの海洋地殻は約3000万年より古い。",
      "ウ": "沈み込み境界での逆断層型は妥当である。大きな断層の破壊では波の周期が長くなるため、大地震の卓越周波数が高いという㋑は逆である。",
      "エ": "㋒は妥当である。日本海溝に入る太平洋プレートは古い海洋プレートで、約3000万年前に形成されたとする㋓の年代は合わない。",
      "オ": "沈み込み境界ではプレートが圧縮され、典型的な境界地震は逆断層型になる。沈み込むプレートに沿って深発地震も起こり、日本周辺では深さ300 kmを超える地震が観測される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q49",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "溶岩の流動性と火山の形",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "火山に関する記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n火山の地形的な特徴は、噴出物の種類や性質によって異なる。流動性の高いマグマが㋐として繰り返し噴出すると、傾斜のゆるい溶岩台地や㋑が発達する。溶岩流とテフラが交互に堆積して大規模な山体を形成するのが㋒である。流動性の低いマグマは、噴出して㋓を造る。",
    "choices": {
      "ア": "㋐：溶岩流、㋑：盾状火山、㋒：成層火山、㋓：溶岩ドーム",
      "イ": "㋐：溶岩流、㋑：盾状火山、㋒：成層火山、㋓：噴石丘",
      "ウ": "㋐：溶岩流、㋑：溶岩ドーム、㋒：盾状火山、㋓：噴石丘",
      "エ": "㋐：テフラ、㋑：溶岩ドーム、㋒：成層火山、㋓：盾状火山",
      "オ": "㋐：テフラ、㋑：噴石丘、㋒：盾状火山、㋓：溶岩ドーム"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "流れやすい溶岩は遠くまで広がり、緩い斜面の盾状火山を造る。溶岩とテフラを重ねたものが成層火山で、粘性の高い溶岩が火口近くに盛り上がると溶岩ドームになる。",
    "choiceExplanations": {
      "ア": "流れやすい溶岩は遠くまで広がり、緩い斜面の盾状火山を造る。溶岩とテフラを重ねたものが成層火山で、粘性の高い溶岩が火口近くに盛り上がると溶岩ドームになる。",
      "イ": "㋐～㋒は妥当である。粘り強い溶岩が火口付近にたまって造るのは溶岩ドームで、噴石丘は飛び散った火山砕屑物の堆積からできる。",
      "ウ": "流動性の高い溶岩が広がると緩勾配の盾状火山になる。溶岩流とテフラが重なるのは成層火山で、粘り強い溶岩は火口近くにドームを造る。",
      "エ": "成層火山は妥当である。一方、流れやすいマグマは溶岩流として広がって盾状火山を造り、粘り強く広がりにくいマグマは溶岩ドームを造る。",
      "オ": "流動性の低いマグマがドームを造る点は妥当である。流れやすい溶岩の繰り返しが盾状火山につながり、成層火山では溶岩とテフラが重なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-butsuri-q50",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "P波とS波の到達時刻差から求める震央距離",
      "物理区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような位置にある地表の観測点A、B、Cにおいて、ある地震の初期微動継続時間（P波とS波の到達時間の差）が、それぞれ5秒、5秒、7秒であったとする。この地震の震央（震源の真上にあたる地表の点）は観測点Cからおよそ何km離れているか。ただし、P波とS波の速度は一定とし、それぞれ6.0 km/s、3.0 km/sとする。",
    "choices": {
      "ア": "23 km",
      "イ": "28 km",
      "ウ": "33 km",
      "エ": "38 km",
      "オ": "43 km"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "到達時間差は震源距離の1/6なのでA、Bから30 km、Cから42 kmである。震央はOから北へy km、震源深さをd kmとするとy²＋d²＝30²−20²＝500、(50−y)²＋d²＝42²となり、差からy＝12.36 km、Cまで37.64 kmである。",
    "choiceExplanations": {
      "ア": "到達時間差の6倍が震源からの距離なので、AとBは30 km、Cは42 kmである。等距離のA、Bから震央はOの南北線上にあり、震源距離の二乗の差からCまでの水平距離を求める。",
      "イ": "地表のCと震源の距離は42 kmであるが、震央までの距離には深さを含めない。A、Bから等距離という条件で震央の東西位置が決まり、残る南北位置はOから北へ約12 kmである。",
      "ウ": "Aから震源までの距離30 kmには東西方向の20 kmが含まれる。これを使って震源深さと北向き座標の二乗和を求め、Cの震源距離42 kmの条件と引き比べると33 kmより遠い。",
      "エ": "到達時間差は震源距離の1/6なのでA、Bから30 km、Cから42 kmである。震央はOから北へy km、震源深さをd kmとするとy²＋d²＝30²−20²＝500、(50−y)²＋d²＝42²となり、差からy＝12.36 km、Cまで37.64 kmである。",
      "オ": "Cから震源までの斜めの距離は42 kmである。震央は震源の真上であり、Cからの水平距離はそれより短くなるので43 kmにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007508.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-butsuri/q50.webp"
    ],
    "imageAltTexts": [
      "地表のOから西20 kmにA、東20 kmにB、北50 kmにCがある。"
    ]
  }
];
