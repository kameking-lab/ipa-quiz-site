import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2025_SENMON_BUTSURI: Question[] = [
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q06",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "矩形関数のフーリエ変換",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "aを正数、bを実数とするとき、以下のように数直線上で関数f(x)を定義する。\nf(x)＝b（|x|≦a）、f(x)＝0（|x|＞a）\nこのとき、関数f(x)のフーリエ変換 F(k)＝∫₋∞^∞ f(x)e^(−ikx) dx は次のうちではどれか。",
    "choices": {
      "ア": "−2b cos(ka)/k",
      "イ": "−2b sin(ka)/k",
      "ウ": "0",
      "エ": "2b cos(ka)/k",
      "オ": "2b sin(ka)/k"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "sin(kx)の項は対称区間で打ち消し合う。実部の2b∫₀^a cos(kx) dxは2b sin(ka)/kであり、k＝0では極限2abと解釈する。",
    "choiceExplanations": {
      "ア": "cos(kx)は偶関数なので、積分では左右から同じ符号で寄与する。ただし、その原始関数はsin(kx)/kであり、答えがcos(ka)に比例するわけではない。",
      "イ": "区間[−a、a]でのcos(kx)の積分は2 sin(ka)/kとなる。上下の積分端を逆にしない限り、式全体に負号は付かない。",
      "ウ": "虚部の積分は奇関数なので0になるが、偶関数である実部は一般には残る。例えばk＝0では矩形の面積2abになる。",
      "エ": "積分で残る実部はcos(kx)だが、それを積分した値は端点のsin(ka)から決まる。2b cos(ka)/kはk→0で有限な面積2abに近づかない。",
      "オ": "sin(kx)の項は対称区間で打ち消し合う。実部の2b∫₀^a cos(kx) dxは2b sin(ka)/kであり、k＝0では極限2abと解釈する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q08",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "画素列のランレングス圧縮",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、白、黒の2色の画素から成る図を文字列で表現し、圧縮することを考える。図を文字列で表現するため、一番上の行の左から右方向へ1画素ずつ読み取り、右端に達したら次の行の左端に移って、右方向へ1画素ずつ読み取ることを、全ての画素を読み取るまで続ける。読み取りの結果は、白をW、黒をBとした文字列によって表す。次に、X＝W、Bがn（n≧3）文字以上連続し、n＋1文字以上は連続していない場合、その部分を「Xn」によって置き換える。このとき、Xの文字数は1、nの文字数は10進数表記における文字数とする。\n例えば、画素数が3×3個である図Ⅰにこの操作を行ったときの文字列は「BWB5WB」（6文字）となる。画素数が8×8個である図Ⅱに同じ操作を行ったとき、圧縮前の文字数に対する圧縮後の文字数の割合はおよそいくらか。",
    "choices": {
      "ア": "53％",
      "イ": "59％",
      "ウ": "66％",
      "エ": "72％",
      "オ": "80％"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "上から各行をつなげると、圧縮後は「B9WWBBWWBBWB4WB4WWB6WWB4WB4WBBWWBBWWB9」の38文字になる。38/64＝0.59375なので約59％である。",
    "choiceExplanations": {
      "ア": "文字は8×8の64個あり、連続した同色のまとまりを規則に従って置き換える。圧縮後は38文字なので、53％に相当する約34文字より多い。",
      "イ": "上から各行をつなげると、圧縮後は「B9WWBBWWBBWB4WB4WWB6WWB4WB4WBBWWBBWWB9」の38文字になる。38/64＝0.59375なので約59％である。",
      "ウ": "図で、行末と次の行頭の黒が続く場合は一つのまとまりとして数える。行の境界で切らずに計算すると38文字となり、約66％より小さい。",
      "エ": "横の一行ごとに圧縮をやり直す規則ではないので、前行の末尾と次行の先頭の同色もつながる。文字列全体を圧縮すると約59％になる。",
      "オ": "連続3個以上の部分は、記号と個数の計2文字に縮む場合が多い。実際の連続を一つずつ数えると64文字から38文字になり、割合は80％まで高くない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q08.webp"
    ],
    "imageAltTexts": [
      "図Ⅰは白黒の3×3画素、図Ⅱは白黒の8×8画素の配置を示す。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q09",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "粗い斜面での仕事と速度比",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "一様重力場中において、図のように、水平面とθ（0＜θ＜π/2）の傾きをなす斜面がある。斜面上のABとBCの長さは等しく、AB間は滑らかで、BC間は粗い。斜面上の点Aに小物体を置き、静かに放したところ、小物体は斜面を滑り出し、点Cに到達した。小物体が点Bに到達したときの速さに対する、小物体が点Cに到達したときの速さの比として最も妥当なのはどれか。\nただし、小物体と斜面BCの間の動摩擦係数の値をμ′、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "√(1/2−μ′/tan θ)",
      "イ": "√(1−μ′/tan θ)",
      "ウ": "√(2−μ′/tan θ)",
      "エ": "√(1−μ′ cos θ)",
      "オ": "√(2−μ′ cos θ)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一区間の長さをlとすると、Bまでの運動エネルギー増加はmgl sin θ、Cまでは2mgl sin θ−μ′mgl cos θである。二つの運動エネルギーの比の平方根が√(2−μ′/tan θ)になる。",
    "choiceExplanations": {
      "ア": "摩擦がなければ、Cまでの落下高さはBまでの2倍なので、速さの比は√2となる。摩擦を0としたときのこの選択肢の値は1/√2で、合わない。",
      "イ": "この式では、AからBで増えた運動エネルギーと同じ分だけBCでも重力が仕事をする点が反映されない。摩擦がない場合には比を二乗した値が2になる。",
      "ウ": "一区間の長さをlとすると、Bまでの運動エネルギー増加はmgl sin θ、Cまでは2mgl sin θ−μ′mgl cos θである。二つの運動エネルギーの比の平方根が√(2−μ′/tan θ)になる。",
      "エ": "BCの摩擦の仕事にcos θは入るが、速さの比ではBの運動エネルギーに含まれるsin θで割る。摩擦が0の場合にも、この式は比√2を与えない。",
      "オ": "無摩擦で√2になる点は合っている。摩擦による減少分をBの運動エネルギーで割るとμ′ cos θ/sin θになるので、cos θだけでは足りない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q09.webp"
    ],
    "imageAltTexts": [
      "等しい長さのABとBCを持つ斜面。上側のABは滑らかで、下側のBCだけが粗い。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q13",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "一様な円柱の慣性モーメント",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のような、半径a、質量Mの一様な円柱がある。円柱の中心軸に関する慣性モーメントとして最も妥当なのはどれか。",
    "choices": {
      "ア": "(1/6)Ma²",
      "イ": "(1/3)Ma²",
      "ウ": "(2/5)Ma²",
      "エ": "(1/2)Ma²",
      "オ": "Ma²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "半径rの薄い円筒殻の質量は微小幅drに対して(2M/a²)r drとなる。これにr²を掛けてr＝0からaまで積分するとMa²/2になる。",
    "choiceExplanations": {
      "ア": "中心軸まわりでは半径rにある質量の寄与はr²に比例する。一様な円形断面で面積を重みとして平均すると、r²の平均はa²/2である。",
      "イ": "半径だけを等しい重みで積分すると1/3が出るが、外側の同じ厚さの環ほど面積は大きい。半径rの環の質量はrに比例する。",
      "ウ": "2/5は一様な球の中心軸まわりの慣性モーメントに現れる係数である。一様な円柱では、各高さの円形断面の計算を合わせると係数は1/2になる。",
      "エ": "半径rの薄い円筒殻の質量は微小幅drに対して(2M/a²)r drとなる。これにr²を掛けてr＝0からaまで積分するとMa²/2になる。",
      "オ": "全質量が半径aにある薄い円筒殻ならMa²になる。一様な円柱では内部にも質量が分布し、その寄与の距離はaより小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q13.webp"
    ],
    "imageAltTexts": [
      "半径a・質量Mの円柱と、その中心を通る鉛直な回転軸。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q14",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "切欠きのある平板の重心",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "一様重力場中において、図のような平面形状の一様な薄い板がある。この板の重心と点Aの間の距離はいくらか。",
    "choices": {
      "ア": "9/5",
      "イ": "11/5",
      "ウ": "7/3",
      "エ": "8/3",
      "オ": "3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "底辺を高さ0とすると、長方形は面積768で重心高さ12、切り抜いた三角形は面積192で重心高さ4である。残る板の重心は(768×12−192×4)/576＝44/3で、Aの高さ12との差は8/3になる。",
    "choiceExplanations": {
      "ア": "図は左右対称なので、重心はAと同じ鉛直線上にある。長方形から三角形を差し引いた面積モーメントを求めると、Aからの距離は9/5でなく8/3である。",
      "イ": "切り抜き部分の三角形の高さは√(20²−16²)＝12である。三角形の重心は底辺から4であり、この値で面積モーメントを引くと11/5にはならない。",
      "ウ": "もとの長方形と三角形は面積が異なる。各重心位置に面積を掛けて差し引き、残る面積で割ると、Aから8/3の位置になる。",
      "エ": "底辺を高さ0とすると、長方形は面積768で重心高さ12、切り抜いた三角形は面積192で重心高さ4である。残る板の重心は(768×12−192×4)/576＝44/3で、Aの高さ12との差は8/3になる。",
      "オ": "Aは底辺から12の高さで、板全体の重心は44/3の高さになる。差は3ではなく8/3である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q14.webp"
    ],
    "imageAltTexts": [
      "幅32、高さ24の長方形から、底辺を幅いっぱいに取り頂点をAとする二等辺三角形を切り抜いた形。斜辺は各20。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q15",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "容器側壁の小孔からの流出",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、大きな円筒形の容器の中に、非粘性かつ非圧縮の液体が入っていて、側壁の下部の小孔から液体が流出するときを考える。底面から小孔の中心までの高さはh、底面から液面までの高さは4hであるとき、小孔から流出する液体の速さとして最も妥当なのはどれか。\nただし、液面の面積に対して、液体が流出する小孔の面積が十分に小さいことから、液面の降下速度は無視できるものとする。また、容器の液面と小孔での気圧差はなく、重力加速度の大きさはgとする。",
    "choices": {
      "ア": "√(gh)",
      "イ": "√(2gh)",
      "ウ": "√(6gh)",
      "エ": "2√(gh)",
      "オ": "3√(gh)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "液面と小孔の圧力は同じで、液面の速さは無視できる。ベルヌーイの式からv²/(2g)＝4h−h＝3hなので、v＝√(6gh)になる。",
    "choiceExplanations": {
      "ア": "出口の速さは自由表面から小孔までの落差で決まる。落差はhではなく3hで、さらに運動エネルギーに係数1/2が入る。",
      "イ": "√(2gh)は落差をhとした値である。hは底面から小孔までの高さであり、水面から小孔までの落差は4h−h＝3hとなる。",
      "ウ": "液面と小孔の圧力は同じで、液面の速さは無視できる。ベルヌーイの式からv²/(2g)＝4h−h＝3hなので、v＝√(6gh)になる。",
      "エ": "2√(gh)を二乗して2gで割ると2hになる。実際に与えられた水面と小孔の落差は3hである。",
      "オ": "3√(gh)を使うと速さの二乗が9ghとなり、落差は4.5hに相当する。水面から小孔までの3hに対応するのは√(6gh)である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q15.webp"
    ],
    "imageAltTexts": [
      "底面から液面まで4h、底面から側壁の小孔までhの円筒形容器。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q16",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "球対称な湧き出しの流量保存",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "縮まない完全流体の定常で球対称な流れとして、中心に湧き出しがあるものを考える。中心から距離rの場所における流体の速さとして最も妥当なのは次のうちではどれか。\nただし、mは正の定数とする。",
    "choices": {
      "ア": "m/√r",
      "イ": "m/r",
      "ウ": "m/(r√r)",
      "エ": "m/r²",
      "オ": "m/r³"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "球対称なので球面上で速さvは一定で、球面を通る流量は4πr²vである。その流量が半径によらないため、vはm/r²の形になる。",
    "choiceExplanations": {
      "ア": "半径rの球面全体を通る体積流量は、球面積4πr²と速さの積である。速さが1/√rなら流量がrとともに増え、流量保存に合わない。",
      "イ": "1/rは円周の長さに反比例するが、ここでは三次元の球面を通過する。面積はr²に比例するため、速さは1/r²に比例する。",
      "ウ": "速さがrの3/2乗に反比例すると、面積を掛けた流量は√rに比例してしまう。定常な非圧縮流れでは異なる半径の球面でも流量は一定である。",
      "エ": "球対称なので球面上で速さvは一定で、球面を通る流量は4πr²vである。その流量が半径によらないため、vはm/r²の形になる。",
      "オ": "分母にr³を使うと、球面を通る体積流量がrの逆数に比例する。流れを横切る面積は球の体積ではなく球面積4πr²である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q17",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "斜断面の法線応力と接線応力",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、断面積Sの一様な弾性体の棒の両端を大きさFの力で引っ張る。法線が棒の軸から角度θ（0＜θ＜π/2）で傾いた斜断面Aを考えたとき、Aに働く法線応力σ_n、接線応力σ_tの大きさの組合せとして最も妥当なのはどれか。\nなお、応力とは、外力を受けた物体において、物体内部の断面に働く単位面積当たりの力のことである。",
    "choices": {
      "ア": "(F/S)cos² θ、(F/S)sin θ cos θ",
      "イ": "(F/S)cos θ、(F/S)sin θ",
      "ウ": "(F/S)sin² θ、(F/S)sin θ cos θ",
      "エ": "(F/S)sin θ cos θ、(F/S)sin² θ",
      "オ": "F/S、(F/S)tan θ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "斜断面には面積S/cos θがあり、軸方向の力Fの法線成分と接線成分はF cos θとF sin θである。各成分をその面積で割ると、法線応力は(F/S)cos² θ、接線応力は(F/S)sin θ cos θとなる。",
    "choiceExplanations": {
      "ア": "斜断面には面積S/cos θがあり、軸方向の力Fの法線成分と接線成分はF cos θとF sin θである。各成分をその面積で割ると、法線応力は(F/S)cos² θ、接線応力は(F/S)sin θ cos θとなる。",
      "イ": "力の成分の分け方は合っているが、斜断面そのものの面積がSより大きい。面積S/cos θで割るので、両成分にもう一つcos θを掛ける。",
      "ウ": "接線応力は合っているが、法線成分の力はF sin θでなくF cos θである。斜断面の面積で割ると、法線応力の因子もcos² θになる。",
      "エ": "荷重を法線方向へ投影するにはcos θを掛ける。軸と法線が近づくときに法線応力が0となるこの組合せは、垂直断面のF/Sとつながらない。",
      "オ": "θをπ/2に近づけると、斜断面上の法線応力も接線応力も小さくなる。ここでは法線応力が一定、接線応力が発散するので合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q17.webp"
    ],
    "imageAltTexts": [
      "棒を両方向に引っ張り、棒軸に対する法線角がθの斜断面Aで応力を分解する図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q18",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "等方弾性体のラメ定数",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "等方弾性体に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「等方弾性体において、xyz空間における応力テンソルσとひずみテンソルεの関係がフックの法則：\nσ_ij＝λ(Σ_(k＝x,y,z) ε_kk)δ_ij＋2με_ij（i、j＝x、y、z）\nで表されるとする。ここで、δ_ijはクロネッカーのデルタであり、弾性係数λ、μはラメの定数と呼ばれる。一方、この等方弾性体に対してx軸方向にのみ応力を加えるとき、ヤング率Yはσ_xx＝Yε_xxで定義される弾性係数、ポアソン比νはε_yy＝ε_zz＝−νε_xxで定義される無次元量である。これらから、ヤング率Yとポアソン比νをラメの定数λ、μを用いて表すと、ヤング率Yは［㋐］となり、ポアソン比νはλ/[2(λ＋μ)]となる。また、ラメの定数の一つであるμは、ヤング率Yとポアソン比νを用いて表すと［㋑］となる。」",
    "choices": {
      "ア": "μ(λ＋2μ)/(λ＋μ)、Y/(1−ν)",
      "イ": "μ(2λ＋3μ)/(λ＋μ)、Y/[2(1−ν)]",
      "ウ": "μ(2λ＋3μ)/(λ＋μ)、Y/[2(1＋ν)]",
      "エ": "μ(3λ＋2μ)/(λ＋μ)、Y/[2(1−ν)]",
      "オ": "μ(3λ＋2μ)/(λ＋μ)、Y/[2(1＋ν)]"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "横方向の応力を0と置くとλ(1−2ν)＝2μνが得られ、縦方向はY＝λ(1−2ν)＋2μ＝2μ(1＋ν)となる。与えられたνを代入するとY＝μ(3λ＋2μ)/(λ＋μ)になる。",
    "choiceExplanations": {
      "ア": "単軸応力では横方向のひずみも体積ひずみに寄与する。ポアソン比を使って代入するとYはμ(3λ＋2μ)/(λ＋μ)になり、この候補の係数とは一致しない。",
      "イ": "横ひずみを−νε_xxと置くとσ_xx/ε_xx＝λ(1−2ν)＋2μである。さらにσ_yy＝0を使って整理するとY＝2μ(1＋ν)で、分母には1−νではなく1＋νが入る。",
      "ウ": "μ＝Y/[2(1＋ν)]は正しい。Yにν＝λ/[2(λ＋μ)]を代入すると、分子に入るのは2λ＋3μでなく3λ＋2μである。",
      "エ": "Yをラメの定数で表した式は合っている。ポアソン比で表し直すとY＝2μ(1＋ν)になるので、μの分母は2(1＋ν)になる。",
      "オ": "横方向の応力を0と置くとλ(1−2ν)＝2μνが得られ、縦方向はY＝λ(1−2ν)＋2μ＝2μ(1＋ν)となる。与えられたνを代入するとY＝μ(3λ＋2μ)/(λ＋μ)になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q20",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "波動",
    "topicTags": [
      "二次元平面波の波長",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "時刻tにおける水面の変位が z(x, y, t)＝A sin{2π[νt−(x＋y)/λ]} によって表されるとする。ただし、A、ν、λは正の定数、x、yは水面上のデカルト座標とする。この水面波の波長の表式として正しいのはどれか。",
    "choices": {
      "ア": "λ/2",
      "イ": "λ/√2",
      "ウ": "λ",
      "エ": "√2λ",
      "オ": "2λ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "波数ベクトルはx、y方向それぞれ2π/λであり、その大きさは2π√2/λである。進行方向で位相が2π変わる波長はλ/√2になる。",
    "choiceExplanations": {
      "ア": "xとyを同時にλ/2ずつ増やすと位相は2π変わる。ただし、その移動距離はλ/2ではなく、対角方向の距離としてλ/√2になる。",
      "イ": "波数ベクトルはx、y方向それぞれ2π/λであり、その大きさは2π√2/λである。進行方向で位相が2π変わる波長はλ/√2になる。",
      "ウ": "λはyを固定してxだけを変えたときの周期である。波の進行方向はx軸に対して45°であり、進行方向で測る波長はこれより短い。",
      "エ": "進行方向に距離sだけ移動すると、xとyがそれぞれs/√2だけ変化する。位相の空間部分にはx＋yが現れるため、波長は√2を掛けるのでなく割る。",
      "オ": "位相が空間的に一周期変わるにはx＋yがλだけ変わればよい。進行方向の移動距離は、その和の変化量を√2で割った値になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q21",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "X線散乱の運動量保存",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、静止している電子に向けて波長λ_iのX線を入射したところ、その入射方向に対して角度θの方向に波長λ_sのX線が散乱され、電子は角度φの方向に跳ね飛ばされた。プランク定数をhとするとき、跳ね飛ばされた電子の運動量の大きさとして最も妥当なのはどれか。\nなお、波長λのX線の運動量の大きさpはp＝h/λと表せる。",
    "choices": {
      "ア": "h√[1/λ_i²＋1/λ_s²−2 cos θ/(λ_iλ_s)]",
      "イ": "h√[1/λ_i²＋1/λ_s²＋2 cos θ/(λ_iλ_s)]",
      "ウ": "h√[1/λ_i²＋1/λ_s²−2 sin θ/(λ_iλ_s)]",
      "エ": "h√[1/λ_i²＋1/λ_s²＋2 sin θ/(λ_iλ_s)]",
      "オ": "h√[1/λ_i²＋1/λ_s²−sin θ/(λ_iλ_s)]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "電子の運動量は、入射X線の運動量ベクトルから散乱X線の運動量ベクトルを引いたものになる。差の大きさを二乗すると内積の項は−2(h/λ_i)(h/λ_s) cos θとなる。",
    "choiceExplanations": {
      "ア": "電子の運動量は、入射X線の運動量ベクトルから散乱X線の運動量ベクトルを引いたものになる。差の大きさを二乗すると内積の項は−2(h/λ_i)(h/λ_s) cos θとなる。",
      "イ": "正符号の内積項は、二つのX線の運動量ベクトルを足した場合に出る。電子の運動量は入射から散乱を引いた差である。",
      "ウ": "ベクトルのなす角はθであり、内積に使う三角関数はその余弦である。sin θを使うと、二つが平行な場合の差の大きさを正しく表せない。",
      "エ": "電子の運動量を求めるには散乱後の光子の運動量を差し引く。したがって内積項の符号は負であり、その角度の因子にはcos θが入る。",
      "オ": "差を取る二つのX線の運動量の内積は、なす角θの余弦を使う。また、差の二乗を展開すると交差項には係数2が付く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q21.webp"
    ],
    "imageAltTexts": [
      "X線の入射方向、角度θで散乱するX線、角度φで反跳する電子の図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q24",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "定圧の部屋を加熱する開放系",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "断熱壁で囲まれた一定の容積をもつ部屋に、温度T₁で質量M₁の空気が入っている。室内にヒーターが置いてあり、これにより室温をゆっくり上げていく。このとき、室内の圧力が一定に保たれるように、空気は壁の小孔から出て行くことができるようにしてある。室温をT₁からT₂へ上げるために、室内の空気へ供給しなければならない熱量として最も妥当なのはどれか。\nただし、空気は理想気体とみなし、定圧比熱C_pは定数とする。",
    "choices": {
      "ア": "C_p M₁T₂ log(T₂/T₁)",
      "イ": "C_p M₁T₁ log(T₂/T₁)",
      "ウ": "C_p M₁T₁ log[(T₂＋T₁)/(T₂−T₁)]",
      "エ": "C_p M₁T₂(T₂−T₁)/(T₂＋T₁)",
      "オ": "C_p M₁T₁(T₂＋T₁)/(T₂−T₁)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "定圧・定積なので室内の質量はM₁T₁/Tであり、微小な加熱に必要な熱はC_p(M₁T₁/T)dTである。T₁からT₂まで積分するとC_p M₁T₁ log(T₂/T₁)になる。",
    "choiceExplanations": {
      "ア": "M₁は初期温度T₁で部屋を満たす質量である。定圧・定積の条件で一定となるのは室内の質量Mと温度Tの積M₁T₁であって、M₁T₂ではない。",
      "イ": "定圧・定積なので室内の質量はM₁T₁/Tであり、微小な加熱に必要な熱はC_p(M₁T₁/T)dTである。T₁からT₂まで積分するとC_p M₁T₁ log(T₂/T₁)になる。",
      "ウ": "T₂をT₁に近づけると、必要な熱量は0に近づく。この候補は対数の中の分母が0に近づいて発散するため、その条件に合わない。",
      "エ": "昇温とともに空気が抜け、室内の質量はTに反比例して減る。その時点の質量を使った熱量を積分するため、温度比の対数が現れる。",
      "オ": "温度を全く変えない極限では必要な熱は0になる。この式はT₂−T₁を分母に置くため、温度差を小さくすると逆に大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q25",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "熱力学ポテンシャルとマクスウェル関係式",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "マクスウェルの関係式に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「内部エネルギーUが、エントロピーSと体積Vを独立変数とする熱力学関数であり、ヘルムホルツの自由エネルギーFが、温度TとVを独立変数とする熱力学関数であり、ギブスの自由エネルギーGが、Tと圧力Pを独立変数とする熱力学関数である場合、それらの全微分dU、dF、dGは、それぞれ\ndU＝T dS−P dV、dF＝−S dT−P dV、dG＝−S dT＋V dP\nと表される。これらの式から、\nT＝(∂U/∂S)_V、P＝−(∂U/∂V)_S、S＝−(∂F/∂T)_V、P＝−(∂F/∂V)_T、S＝−(∂G/∂T)_P、V＝(∂G/∂P)_T\nの六つの式が得られる。U、F、Gが2回連続微分可能であるときは、これらの六つの式から、次のようなマクスウェルの関係式が得られる。Uについては、∂²U/(∂V∂S)＝∂²U/(∂S∂V)より、［㋐］が導かれる。Fについては、∂²F/(∂V∂T)＝∂²F/(∂T∂V)より、［㋑］が導かれる。Gについては、∂²G/(∂P∂T)＝∂²G/(∂T∂P)より、［㋒］が導かれる。」",
    "choices": {
      "ア": "(∂P/∂V)_T＝−(∂S/∂T)_V、(∂S/∂V)_T＝−(∂P/∂T)_V、(∂V/∂P)_T＝−(∂S/∂T)_P",
      "イ": "(∂P/∂V)_T＝−(∂S/∂T)_V、(∂S/∂V)_T＝(∂P/∂T)_V、(∂S/∂P)_T＝−(∂V/∂T)_P",
      "ウ": "(∂T/∂V)_S＝−(∂P/∂S)_V、(∂S/∂V)_T＝−(∂P/∂T)_V、(∂V/∂P)_T＝−(∂S/∂T)_P",
      "エ": "(∂T/∂V)_S＝−(∂P/∂S)_V、(∂S/∂V)_T＝(∂P/∂T)_V、(∂S/∂P)_T＝−(∂V/∂T)_P",
      "オ": "(∂T/∂V)_S＝−(∂P/∂S)_V、(∂S/∂V)_T＝(∂P/∂T)_V、(∂V/∂P)_T＝−(∂S/∂T)_P"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "UではTと−P、Fでは−Sと−P、Gでは−SとVをそれぞれ他方の独立変数で微分する。これにより㋐は負号、㋑は同符号、㋒は負号の関係になる。",
    "choiceExplanations": {
      "ア": "Uでは独立変数SとVについて混合微分するので、温度を固定して圧力を体積で微分する関係は出ない。Fでは二つの係数にともに負号が付くため、混合微分を等しく置くと両辺の負号は消える。",
      "イ": "後二つはそれぞれF、Gの混合微分から得られる。UではdSの係数TをVで微分し、dVの係数−PをSで微分するので、最初の式が合わない。",
      "ウ": "Uの関係は正しい。FではdT、dVの係数がともに負なので関係式の符号は正になり、GではSをPで、VをTで微分する。",
      "エ": "UではTと−P、Fでは−Sと−P、Gでは−SとVをそれぞれ他方の独立変数で微分する。これにより㋐は負号、㋑は同符号、㋒は負号の関係になる。",
      "オ": "UとFの関係は正しい。Gの混合微分では(∂S/∂P)_Tと(∂V/∂T)_Pが現れ、(∂V/∂P)_Tと(∂S/∂T)_Pではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q28",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "一様な球形電荷の内外の電場",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "真空中において、半径aの球内に電荷Qが一様に分布している。電場の大きさがEであるような点の球の中心からの距離rの値として可能なもののみを挙げているのはどれか。\nただし、Eは球の表面における値より小さいものとし、真空の誘電率をε₀とする。",
    "choices": {
      "ア": "4πε₀aE/Q、Q/(4πε₀E)",
      "イ": "4πε₀a²E/Q、√[Q/(4πε₀E)]",
      "ウ": "4πε₀a²E/Q、Q/(4πε₀E)",
      "エ": "4πε₀a³E/Q、√[Q/(4πε₀E)]",
      "オ": "4πε₀a³E/Q、Q/(4πε₀E)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ガウスの法則による電場は、球内でQr/(4πε₀a³)、球外でQ/(4πε₀r²)である。Eは表面での値より小さいので、それぞれをrについて解いた二つの距離が存在する。",
    "choiceExplanations": {
      "ア": "球内の半径rの球面に含まれる電荷は、半径比の三乗Q(r/a)³である。球の外では逆二乗則をrについて解くので、距離には平方根が必要である。",
      "イ": "球外の式は合っている。球内では電荷の割合に体積比(r/a)³が入るため、半径を出した式にはa²ではなくa³が現れる。",
      "ウ": "球の内部にある電荷は体積に比例するので、aの三乗を使う必要がある。外部では電場が1/r²に比例し、電場から距離を求めると平方根になる。",
      "エ": "ガウスの法則による電場は、球内でQr/(4πε₀a³)、球外でQ/(4πε₀r²)である。Eは表面での値より小さいので、それぞれをrについて解いた二つの距離が存在する。",
      "オ": "球内の距離は合っている。球外のQ/(4πε₀E)は距離rではなくr²であり、距離を表すには平方根を取る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q29",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "平行導線の磁場の重ね合わせ",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "真空中において、図のように、x軸上の点A（−d、0）及び点B（d、0）のそれぞれに、xy平面に垂直な無限に長い直線状の導線が通っており、同じ強さの電流が点Aでは奥から手前へ、点Bでは手前から奥へ流れている。y軸上には、点Bからの距離が2dとなるような点Cを取る。点A及び点Bの導線を流れる電流による点Cにおける磁場の強さが、x軸の正の部分上の点Dにおける磁場の強さと同じであるとき、原点Oから点Dまでの距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "2√3d/3",
      "イ": "3√3d/4",
      "ウ": "√3d",
      "エ": "√5d",
      "オ": "6√5d/5"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Cで各磁場の鉛直成分を足すと共通係数μ₀I/(2π)に1/(2d)を掛けた値になる。Dの座標x＞dでは同じ係数に2d/(x²−d²)を掛けるので、等式からx＝√5dを得る。",
    "choiceExplanations": {
      "ア": "Cでは水平方向の磁場成分が打ち消し合い、各導線からの鉛直成分の合計が残る。その合計はμ₀I/(2π)に1/(2d)を掛けた値で、候補の距離で得る磁場より弱い。",
      "イ": "この距離の点はBの外側にあるが、Dでの強さには両導線からの距離の逆数の差を使う。それをCでの合成値に合わせるとx²＝5d²が必要になる。",
      "ウ": "√3dはCのy座標に当たる値であり、x軸上の磁場が等しくなる距離ではない。x軸外側では各導線からの距離がx−dとx＋dで異なる。",
      "エ": "Cで各磁場の鉛直成分を足すと共通係数μ₀I/(2π)に1/(2d)を掛けた値になる。Dの座標x＞dでは同じ係数に2d/(x²−d²)を掛けるので、等式からx＝√5dを得る。",
      "オ": "DをBからさらに遠くすると、距離の逆数の差2d/(x²−d²)は小さくなる。候補の距離ではCでの合成磁場の強さに達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q29.webp"
    ],
    "imageAltTexts": [
      "座標平面上でAは原点の左、BとDは右、Cはy軸上。AとBの導線に逆向きの電流が流れる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q30",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "直列RLC回路の微分方程式",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "電気回路に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、抵抗値Rの抵抗、インダクタンスLのコイル、静電容量Cのコンデンサーから成るRLC回路の回路方程式は、時刻をt、加える電圧をv(t)、コンデンサーに蓄えられる電荷をq(t)として\n［㋐］d²q(t)/dt²＋R dq(t)/dt＋［㋑］q(t)＝v(t)\nと表せる。」",
    "choices": {
      "ア": "L、1/C",
      "イ": "L、C",
      "ウ": "1/C、1/L",
      "エ": "C、1/L",
      "オ": "C、L"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "電流はdq/dtであり、コイルの電圧はL di/dt、コンデンサーの電圧はq/Cである。直列の各素子の電圧を足すと、係数はLと1/Cになる。",
    "choiceExplanations": {
      "ア": "電流はdq/dtであり、コイルの電圧はL di/dt、コンデンサーの電圧はq/Cである。直列の各素子の電圧を足すと、係数はLと1/Cになる。",
      "イ": "Lは正しいが、コンデンサーにはq＝CVの関係がある。電圧は電荷にCを掛けるのでなく、電荷をCで割って求める。",
      "ウ": "電流の時間変化に比例する電圧はコイルに生じ、係数はLである。電荷に比例する電圧はコンデンサーのもので、係数は1/Cになる。",
      "エ": "Cは静電容量であり、電流の微分に掛けるのはインダクタンスLである。電荷からコンデンサーの電圧を得る因子は1/Cである。",
      "オ": "Lは電荷そのものではなく、その時間二階微分に掛かる。コンデンサーの電圧はq/Cなので、候補は二つの素子の役割を入れ違えている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q30.webp"
    ],
    "imageAltTexts": [
      "抵抗R、コイルL、コンデンサーCと電圧源v(t)を直列に接続した回路。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q31",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "重心運動と相対運動のラグランジアン",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "ばねで連結された二つの質点から成る系のラグランジアンに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「1次元のx軸上のみを運動する、質量Mの質点Aと質量mの質点Bが、ばね定数kの軽いばねで連結された系を考える。質点に働く力は質点間のばねによる弾性力のみとする。質点A、Bの位置のx座標を、それぞれx_A、x_Bとすると、系の重心座標RはR＝(Mx_A＋mx_B)/(M＋m)と表される。x_A≧x_Bとして、系の相対座標r＝x_A−x_Bとすると、ばねの自然長をlとして、質点間に働く力のポテンシャルU(r)は、U(r)＝(1/2)k(r−l)²となる。特にM＝2mであるとき、系のラグランジアンLは、L＝［㋐］と表され、オイラー・ラグランジュ方程式は、R̈＝［㋑］、r̈＝［㋒］となる。\nただし、Ṙ、ṙはそれぞれR、rの時間微分、R̈、r̈はそれぞれR、rの時間2階微分を表す。」",
    "choices": {
      "ア": "mṘ²/2＋mṙ²/2−k(r−l)²/2、0、0",
      "イ": "mṘ²/2＋mṙ²/2−k(r−l)²/2、−(k/m)(r−l)、0",
      "ウ": "3mṘ²/2＋mṙ²/3−k(r−l)²/2、0、0",
      "エ": "3mṘ²/2＋mṙ²/3−k(r−l)²/2、0、−[3k/(2m)](r−l)",
      "オ": "3mṘ²/2＋mṙ²/3−k(r−l)²/2、−(k/m)(r−l)、−[3k/(2m)](r−l)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全質量は3m、換算質量はMm/(M＋m)＝2m/3なので、二つの運動エネルギーの係数は3m/2とm/3になる。Rに外力がなくR̈＝0、相対運動は(2m/3)r̈＝−k(r−l)となる。",
    "choiceExplanations": {
      "ア": "重心の運動エネルギーでは二つの質量の和3mが係数となる。相対運動はばねの力を受けており、相対加速度は一般に0にならない。",
      "イ": "ばねの力は内部力なので、外力のない質点系の重心は加速しない。ばねが自然長からずれたときに加速度が生じるのは、重心座標Rでなく相対座標rである。",
      "ウ": "ラグランジアンと重心の加速度は正しい。相対座標のポテンシャルはrで変わるため、r̈を0にしてはいけない。",
      "エ": "全質量は3m、換算質量はMm/(M＋m)＝2m/3なので、二つの運動エネルギーの係数は3m/2とm/3になる。Rに外力がなくR̈＝0、相対運動は(2m/3)r̈＝−k(r−l)となる。",
      "オ": "ラグランジアンと相対加速度は合っている。内部のばね力は二つの質点に逆向きに働き、重心に加速度を与えない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q32",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "統計力学",
    "topicTags": [
      "二準位系の内部エネルギー",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "エネルギー固有値が0、εの二つだけの量子系を考える。いずれのエネルギー固有値も縮退していないとしたとき、この量子系が温度Tの熱平衡状態にあるときの内部エネルギーの表式として正しいのはどれか。\nただし、ボルツマン定数をk_Bとする。",
    "choices": {
      "ア": "(ε/2) exp[−ε/(k_BT)]",
      "イ": "ε exp[−ε/(k_BT)]",
      "ウ": "ε exp[ε/(k_BT)]",
      "エ": "ε exp[−ε/(k_BT)]/{1＋exp[−ε/(k_BT)]}",
      "オ": "ε exp[−ε/(k_BT)]/{1−exp[−ε/(k_BT)]}"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各状態の重みは1とexp[−ε/(k_BT)]で、それらの和が分配関数となる。内部エネルギーはεに励起状態の規格化された確率を掛けた値である。",
    "choiceExplanations": {
      "ア": "εの状態の重みはexp[−ε/(k_BT)]であるが、二つの重みの合計は通常2ではない。分母は1とこの指数の和になる。",
      "イ": "これはεとその状態のボルツマン重みを掛けただけである。内部エネルギーを求めるには、さらに分配関数で割って確率に直す。",
      "ウ": "高いエネルギーの状態は温度が低いほど占有されにくい。したがって、励起状態の重みの指数に正の符号を付けるのは誤りである。",
      "エ": "各状態の重みは1とexp[−ε/(k_BT)]で、それらの和が分配関数となる。内部エネルギーはεに励起状態の規格化された確率を掛けた値である。",
      "オ": "分配関数は各準位の正の重みを足した値である。0とεの二準位では二つの重みの差を取らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q33",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "統計力学",
    "topicTags": [
      "量子調和振動子の自由エネルギー",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "角振動数ωの量子調和振動子のエネルギー固有値は、非負の整数nを用いて、E_n＝ℏω(n＋1/2)（n＝0、1、2、…）と表される。この調和振動子がN個集まった系が温度Tのカノニカル分布に従うとき、ヘルムホルツの自由エネルギーの表式として最も妥当なのはどれか。\nただし、調和振動子の間に相互作用はなく、互いに区別できるものとする。また、β＝1/(k_BT)（k_Bはボルツマン定数）とする。",
    "choices": {
      "ア": "Nℏω log(1−e^(−βℏω))",
      "イ": "(N/β) log(1−e^(−βℏω))",
      "ウ": "Nℏω[1/2＋log(1−e^(−βℏω))/(βℏω)]",
      "エ": "Nℏω[1/2＋1/(e^(βℏω)−1)]",
      "オ": "Nℏω/(e^(βℏω)−1)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一つの分配関数は幾何級数を足してe^(−βℏω/2)/(1−e^(−βℏω))となる。全体の分配関数はそのN乗なので、−log Z/βはNℏω/2＋(N/β)log(1−e^(−βℏω))になる。",
    "choiceExplanations": {
      "ア": "分配関数の対数に掛ける係数はk_BT＝1/βである。また、固有値にはn＝0でもℏω/2の零点エネルギーが含まれる。",
      "イ": "熱に由来する対数の項は正しいが、全振動子の零点エネルギーNℏω/2が抜けている。温度を0に近づけると自由エネルギーはこの基底状態の値に近づく。",
      "ウ": "一つの分配関数は幾何級数を足してe^(−βℏω/2)/(1−e^(−βℏω))となる。全体の分配関数はそのN乗なので、−log Z/βはNℏω/2＋(N/β)log(1−e^(−βℏω))になる。",
      "エ": "これは平均エネルギーとして得られる形である。自由エネルギーにはエントロピーの寄与が入り、分配関数の対数から求める必要がある。",
      "オ": "これは熱励起による内部エネルギーの寄与を表し、零点エネルギーも含まない。自由エネルギーは−log Z/βであり、対数項と零点項を含む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q34",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "調和振動子の基底状態",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "量子調和振動子の基底状態に関する次の記述の㋐、㋑に当てはまるものの組合せとして正しいのはどれか。\n「調和振動子の定常状態に対するシュレーディンガー方程式\n−(ℏ²/(2m))d²ψ(x)/dx²＋(mω²x²/2)ψ(x)＝Eψ(x)\nの基底状態に対応するエネルギー固有値はE＝［㋐］、対応する固有関数はψ(x)＝［㋑］で与えられる。」",
    "choices": {
      "ア": "0、[mω/(πℏ)]^(1/4)e^(−mωx²/(2ℏ))",
      "イ": "0、[4m³ω³/(πℏ³)]^(1/4)x e^(−mωx²/(2ℏ))",
      "ウ": "ℏω/2、[mω/(πℏ)]^(1/4)e^(−mωx²/(2ℏ))",
      "エ": "ℏω/2、[4m³ω³/(πℏ³)]^(1/4)x e^(−mωx²/(2ℏ))",
      "オ": "3ℏω/2、[4m³ω³/(πℏ³)]^(1/4)x e^(−mωx²/(2ℏ))"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "節のない規格化されたガウス関数を方程式に代入すると、二階微分とポテンシャルのx²項が打ち消し合う。残る定数がℏω/2となり、これが基底状態のエネルギーである。",
    "choiceExplanations": {
      "ア": "偶関数のガウス形は正しい。これを方程式に入れると、基底状態でも零点エネルギーℏω/2が残り、0にはならない。",
      "イ": "xを掛けた波動関数は奇関数で中心に節を持ち、最初の励起状態に当たる。基底状態は節のないガウス関数で、固有値も0ではない。",
      "ウ": "節のない規格化されたガウス関数を方程式に代入すると、二階微分とポテンシャルのx²項が打ち消し合う。残る定数がℏω/2となり、これが基底状態のエネルギーである。",
      "エ": "固有値ℏω/2は正しい。掛けられたxは波動関数の中央に節を作るため、その関数は基底状態にはならない。",
      "オ": "エネルギー3ℏω/2とxを掛けたガウス関数は、第一励起状態に対応する。より低いエネルギーℏω/2の、節のない状態が基底状態である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q35",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "無限深井戸の基底エネルギーと確率",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "1次元ポテンシャル V(x)＝0（0≦x≦L）、V(x)＝∞（x＜0、L＜x）、Lは正の定数、の中を運動している質量mの量子力学的粒子を考える。系の規格化された固有関数はψ(x)＝√(2/L) sin kx（kは実数）という形をしており、系のエネルギー固有値は、kを用いてE＝ℏ²k²/(2m)と表せる。この系の基底状態のエネルギー固有値E₁と、基底状態の下で粒子が0≦x≦L/3の領域に見いだされる確率P₁の組合せとして最も妥当なのはどれか。\nなお、定義域内で規格化された波動関数ψ(x)で表される状態の下で粒子がa≦x≦bの領域に見いだされる確率Pは P＝∫ₐᵇ |ψ(x)|² dx で与えられる。",
    "choices": {
      "ア": "0、1/3",
      "イ": "π²ℏ²/(8mL²)、1/3−√3/(4π)",
      "ウ": "π²ℏ²/(8mL²)、1/3",
      "エ": "π²ℏ²/(2mL²)、1/3−√3/(4π)",
      "オ": "π²ℏ²/(2mL²)、1/3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "境界条件sin(kL)＝0から最小の正の波数はπ/Lで、E₁はπ²ℏ²/(2mL²)である。(2/L) sin²(πx/L)を0からL/3まで積分すると、1/3−√3/(4π)になる。",
    "choiceExplanations": {
      "ア": "k＝0を入れると波動関数は全域で0となり、規格化できない。最小の正の波数はπ/Lであり、エネルギーも正になる。",
      "イ": "確率の積分式は合っている。波動関数は両端で0となり、最小の正の波数はπ/(2L)ではなくπ/Lなので、分母は8ではなく2になる。",
      "ウ": "k＝π/(2L)ではx＝Lで波動関数が0にならない。さらに確率密度は一様でないため、区間の長さの比1/3をそのまま確率にできない。",
      "エ": "境界条件sin(kL)＝0から最小の正の波数はπ/Lで、E₁はπ²ℏ²/(2mL²)である。(2/L) sin²(πx/L)を0からL/3まで積分すると、1/3−√3/(4π)になる。",
      "オ": "基底エネルギーは合っている。粒子は井戸の端付近より中央付近で見つかりやすく、左端から1/3の範囲の確率は1/3より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q36",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "角運動量演算子の交換関係",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "量子力学的な状態に作用する線型演算子A、Bの交換子は、[A, B]＝AB−BAと表される。[A, B]がゼロとなるとき、AとBは可換であるという。角運動量演算子は、[J₂, J₃]＝iℏJ₁、[J₃, J₁]＝iℏJ₂、[J₁, J₂]＝iℏJ₃という交換子関係を満たす線型演算子J₁、J₂、J₃の組である。\n四つの線型演算子\n㋐ J₁\n㋑ J₁＋iJ₂\n㋒ (J₁)²＋(J₂)²\n㋓ (J₁)²＋(J₂)²＋(J₃)²\nのうち、J₃と可換なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋓",
      "エ": "㋒",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "積の交換子を展開すると、[J₃, J₁²]と[J₃, J₂²]は符号が逆で打ち消し合う。J₃²はJ₃と可換なので、㋒と㋓の両方が可換である。",
    "choiceExplanations": {
      "ア": "[J₃, J₁]＝iℏJ₂と与えられているので、一般には0にならない。J₁単独はJ₃と可換ではない。",
      "イ": "二乗の和で交差項が相殺するので㋒は妥当である。㋐のJ₁には、J₃との交換子iℏJ₂がそのまま残る。",
      "ウ": "[J₃, J₁＋iJ₂]＝ℏ(J₁＋iJ₂)で、㋑は可換ではない。J₃の二乗もJ₃と可換なので、㋒と㋓が当てはまる。",
      "エ": "㋒はJ₃と可換である。㋓は㋒にJ₃²を足したものだから、こちらもJ₃と可換になる。",
      "オ": "積の交換子を展開すると、[J₃, J₁²]と[J₃, J₂²]は符号が逆で打ち消し合う。J₃²はJ₃と可換なので、㋒と㋓の両方が可換である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q37",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "金属のバンドと電気抵抗",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "金属の電気伝導に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 金属では、電子に完全には占有されていないバンドが存在する。\n㋑ 金属では、室温付近における電気抵抗の主な原因は、伝導電子間の衝突によるものである。\n㋒ 室温付近では、多くの場合に金属の電気抵抗は温度の下降に伴い減少する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "金属ではフェルミ準位付近に電子が移動できる状態があり、部分的に占有されたバンドが伝導に寄与する。室温付近で温度が下がると格子振動が弱くなり、電気抵抗は多くの場合に小さくなる。",
    "choiceExplanations": {
      "ア": "部分的に占有されたバンドがあるという㋐は妥当である。温度の低下で格子振動が弱まり電気抵抗が減るという㋒も妥当である。",
      "イ": "㋐は妥当である。室温付近で抵抗の主因となるのは通常、格子振動などによる伝導電子の散乱であり、電子同士の衝突を主とする㋑は合わない。",
      "ウ": "金属ではフェルミ準位付近に電子が移動できる状態があり、部分的に占有されたバンドが伝導に寄与する。室温付近で温度が下がると格子振動が弱くなり、電気抵抗は多くの場合に小さくなる。",
      "エ": "格子の振動による電子の散乱は、室温付近の金属の抵抗に大きく寄与する。主因を伝導電子同士の衝突とした㋑は妥当でない。",
      "オ": "㋒は妥当である。㋑の代わりに、金属には部分的に占有されたバンドが存在するという㋐を選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q38",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "相対論",
    "topicTags": [
      "粒子のエネルギーと運動量",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "相対論的な粒子に関する以下の記述㋐～㋓のうち、正しいもののみを全て挙げているのはどれか。\n㋐ ゼロでない質量をもつ自由粒子の運動エネルギーは、粒子の速さの2乗に比例する。\n㋑ ゼロでない質量をもつ粒子の速さは、原理的には光速にいくらでも近い値をとることができる。\n㋒ ゼロでない質量をもつ自由粒子の全エネルギーと速さとの積は、運動量の大きさと光速の2乗との積に等しい。\n㋓ 光子のエネルギーは、光子の運動量の大きさと光速との積に等しい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋓",
      "ウ": "㋐、㋑、㋒、㋓",
      "エ": "㋑",
      "オ": "㋑、㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "質量のある粒子は光速に任意に近づけ、E＝γmc²とp＝γmvからEv＝pc²となる。光子にはE＝pcが成り立つ一方、運動エネルギーの二乗則は低速の近似である。",
    "choiceExplanations": {
      "ア": "運動エネルギーがmv²/2になるのは速度が光速より十分小さい場合の近似である。相対論では厳密には(γ−1)mc²を用いる。",
      "イ": "光子でE＝pcが成り立つ点は合っている。質量のある粒子の運動エネルギーは速度の二乗と厳密には比例しない。",
      "ウ": "㋑、㋒、㋓は相対論の関係に合う。㋐の二乗則は低速近似なので、全てを正しいとすることはできない。",
      "エ": "質量のある粒子はエネルギーを大きくすると光速に近づくため㋑は正しい。さらにE＝γmc²、p＝γmvから㋒も成り立ち、質量0の光子には㋓が成り立つ。",
      "オ": "質量のある粒子は光速に任意に近づけ、E＝γmc²とp＝γmvからEv＝pc²となる。光子にはE＝pcが成り立つ一方、運動エネルギーの二乗則は低速の近似である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q39",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "原子核物理",
    "topicTags": [
      "放射性崩壊と半減期",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "セシウムの放射性同位体である¹³⁴Csの放射性崩壊を考える。初期状態にN₀個あった¹³⁴Csの原子核のうち、6年の間に崩壊する個数として最も妥当なのはどれか。\nただし、¹³⁴Csの放射性崩壊の半減期は2年とする。",
    "choices": {
      "ア": "N₀/8",
      "イ": "3N₀/8",
      "ウ": "N₀/2",
      "エ": "5N₀/8",
      "オ": "7N₀/8"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "6年は半減期の3回分で、残った数はN₀(1/2)³＝N₀/8になる。したがって、崩壊した数は初期数との差7N₀/8である。",
    "choiceExplanations": {
      "ア": "N₀/8は三回の半減期を経て残った原子核の個数である。設問は崩壊した数を求めているので、初期数からこれを引く。",
      "イ": "6年は半減期の3回分であり、各回でその時点の未崩壊の数が半分になる。減少量を数えるとN₀の3/8ではなく7/8である。",
      "ウ": "N₀/2が崩壊するのは半減期一回に相当する2年間である。6年間ではさらに二回分の崩壊がある。",
      "エ": "6年後に残るのは初期の(1/2)³＝1/8である。崩壊した数は、残った1/8と足して1になる7/8である。",
      "オ": "6年は半減期の3回分で、残った数はN₀(1/2)³＝N₀/8になる。したがって、崩壊した数は初期数との差7N₀/8である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q40",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "原子核物理",
    "topicTags": [
      "α崩壊とβ⁻崩壊の回数",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "アクチニウム系列に属するウラン235（質量数235、原子番号92）は、α崩壊とβ⁻崩壊をそれぞれ何回か経て、安定同位体である鉛207（質量数207、原子番号82）を生成する。ウラン235から鉛207に至るまでの崩壊経路には何通りかあるが、経路中のα崩壊及びβ⁻崩壊の回数は、ともに崩壊経路によらない。α崩壊の回数とβ⁻崩壊の回数の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "27、10",
      "イ": "10、27",
      "ウ": "9、6",
      "エ": "8、5",
      "オ": "7、4"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "質量数が28減るのでα崩壊は7回で、原子番号は92−14＝78になる。原子番号を82にするには、1回ごとに原子番号が1増えるβ⁻崩壊が4回必要である。",
    "choiceExplanations": {
      "ア": "α崩壊1回で質量数が4減る。必要な減少は235−207＝28なので、27回という候補は質量数の変化に合わない。",
      "イ": "質量数の差28を4で割るとα崩壊は7回になる。β⁻崩壊では質量数が変わらないので、α崩壊の回数は10にならない。",
      "ウ": "この組合せではβ⁻崩壊で質量数を戻せないため、α崩壊9回の段階で質量数が199になる。求める鉛の質量数207には合わない。",
      "エ": "α崩壊8回なら、質量数は235−32＝203になる。β⁻崩壊で変更できるのは原子番号であって、質量数ではない。",
      "オ": "質量数が28減るのでα崩壊は7回で、原子番号は92−14＝78になる。原子番号を82にするには、1回ごとに原子番号が1増えるβ⁻崩壊が4回必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q41",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "地球の放射平衡温度",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "放射平衡温度に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「地球の半径をa、太陽から地球に入射する単位面積・単位時間当たりの放射エネルギーをS、これが地球の大気や表面での反射により宇宙空間に戻されるときの反射率（アルベド）をAとすると、単位時間当たりに地球が吸収する太陽の放射エネルギーは［㋐］となる。一方、地球の温度を一定値Tとすると、地球表面から放出される単位時間当たりの放射エネルギーは、黒体放射を仮定すると、ステファン・ボルツマン定数σを用いて［㋑］と表される。\n両者が釣り合った状態にあるときのTを放射平衡温度という。A＝0.3としたときの放射平衡温度はT＝255［K］であるが、A＝0.2としたときにはT＝［㋒］［K］になる。」",
    "choices": {
      "ア": "πa²SA、(4πa³/3)σT⁴、247",
      "イ": "πa²SA、(4πa³/3)σT⁴、264",
      "ウ": "πa²S(1−A)、(4πa³/3)σT⁴、255",
      "エ": "πa²S(1−A)、4πa²σT⁴、247",
      "オ": "πa²S(1−A)、4πa²σT⁴、264"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "太陽放射は断面積πa²で受け、そのうち1−Aを吸収し、球表面全体4πa²から放射する。温度は(1−A)の1/4乗に比例するため、255×(0.8/0.7)^(1/4)≒264 Kとなる。",
    "choiceExplanations": {
      "ア": "アルベドAは反射する割合なので、吸収には1−Aを使う。また、放射は球の表面から出るので、体積に比例する式にはならない。",
      "イ": "温度が264 Kという点は合っている。地球が吸収するのは反射後の割合1−Aであり、放出する領域の大きさは球の体積でなく表面積である。",
      "ウ": "吸収量は正しいが、黒体放射の熱流束σT⁴に掛けるのは表面積4πa²である。反射率が下がれば吸収が増えるため、温度は255 Kより高くなる。",
      "エ": "吸収および放出の式は正しい。アルベドが0.3から0.2に下がると、反射が減って吸収エネルギーが増えるので、温度が247 Kに下がることはない。",
      "オ": "太陽放射は断面積πa²で受け、そのうち1−Aを吸収し、球表面全体4πa²から放射する。温度は(1−A)の1/4乗に比例するため、255×(0.8/0.7)^(1/4)≒264 Kとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q42",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "ダウンバーストと流量保存",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "積乱雲の下部では、強い下降流が地表に衝突して地表面に沿って放射状に広がり、地表付近で強い風が吹く場合がある。こうした現象はダウンバーストと呼ばれる。\n図のように、半径が1000 mの円柱内で強い下降流があったとする。空気の流れは、円柱の地表から高さ100 mより上方の部分では一様な下降流であり、地表から高さ100 mまでの範囲では、一様に放射状に広がっているとみなせる。下降流の中心から2000 m離れた地点における風速は50 m/sであった。このとき、円柱の上方の一様な下降流の速さとして最も妥当なのはどれか。\nただし、定常状態を仮定し、空気密度は一定で、地表摩擦は無視できるものとする。",
    "choices": {
      "ア": "10 m/s",
      "イ": "20 m/s",
      "ウ": "25 m/s",
      "エ": "30 m/s",
      "オ": "40 m/s"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "下降流が通る断面はπ×1000² m²で、外向き流れが通る面積は2π×2000×100 m²である。両者の流量を等しく置くと、下降流の速さは50×0.4＝20 m/sとなる。",
    "choiceExplanations": {
      "ア": "流出する空気は、半径2000 mの円周全体の高さ100 mの側面を通る。計算で半径と直径を取り違え、側面積を半分にすると流量を過小評価する。",
      "イ": "下降流が通る断面はπ×1000² m²で、外向き流れが通る面積は2π×2000×100 m²である。両者の流量を等しく置くと、下降流の速さは50×0.4＝20 m/sとなる。",
      "ウ": "下降部分の断面積と横に出る部分の面積の比は0.5ではなく0.4である。横向き風速50 m/sにこの比を掛けると20 m/sになる。",
      "エ": "定常で密度が一定なら、入る体積流量と出る体積流量は等しい。30 m/sでは、半径1000 mの流入口から入る空気が観測値から求めた流出量を上回る。",
      "オ": "横向きの速さが50 m/sの地点は中心から2000 mである。そこに高さ100 mの円筒側面を考え、面積を使って流量に換算すると、下降流は40 m/sにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q42.webp"
    ],
    "imageAltTexts": [
      "円柱に上から流入する下降流が、地面から100 mまでの側面へ放射状に流出する模式図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q43",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "季節風の成因と風向",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "季節風（モンスーン）に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「季節風（モンスーン）は季節によって風向が逆転する風である。大陸の地表面温度の季節変化の振幅が、海面水温の季節変化の振幅より［㋐］ために大陸と海洋の間で気温の差が生じ、冬季には［㋑］、夏季には［㋒］向けて吹く季節風が生じる。一般に、大陸が海に面した地域で季節風が発生するが、特に山岳による地形の効果により強められ、多量の雨をもたらす［㋓］付近では、「モンスーン」という言葉は雨季の代名詞としても使われる。」",
    "choices": {
      "ア": "大きい、大陸から海洋上に、海洋上から大陸に、インド",
      "イ": "大きい、大陸から海洋上に、海洋上から大陸に、アルプス山脈",
      "ウ": "大きい、海洋上から大陸に、大陸から海洋上に、インド",
      "エ": "小さい、大陸から海洋上に、海洋上から大陸に、アルプス山脈",
      "オ": "小さい、海洋上から大陸に、大陸から海洋上に、インド"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "陸地は海より季節の温度変化が大きく、冬は冷えた大陸から海へ、夏は海から暖まった大陸へ季節風が吹く。インドでは湿った夏の季節風と山地により多くの雨が降る。",
    "choiceExplanations": {
      "ア": "陸地は海より季節の温度変化が大きく、冬は冷えた大陸から海へ、夏は海から暖まった大陸へ季節風が吹く。インドでは湿った夏の季節風と山地により多くの雨が降る。",
      "イ": "陸と海の温度変化、冬と夏の風向は合っている。雨季をもたらすアジアのモンスーンの例としては、アルプス山脈ではなくインドが当てはまる。",
      "ウ": "温度変化の大きさとインドは正しい。冬は冷えた大陸側の気圧が高くなり、風が大陸から海に向かうので、冬と夏の風向が逆である。",
      "エ": "季節風の風向は正しいが、陸地の方が海より暖まりやすく冷えやすい。さらに、雨季との結び付きが強い例はインド付近である。",
      "オ": "インドの記述は妥当である。陸地の温度変化の方が大きく、夏は暖まった陸へ海から湿った空気が入るため、前半の組合せは合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q44",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "渦位保存とロスビー波",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "渦位の保存に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「地球上で、流体塊が渦位(ζ＋f)/hを保存しながら移流する流れを考える。ここで、hは流体の深さ、ζは相対渦度、fは惑星渦度で、地球回転角速度Ωと緯度φを用いてf＝2Ω sin φで表される。また、hは一定とする。\n図のように、北半球中緯度で流体塊が東西に並んでいると考える。時刻t＝Tでの中央付近の流体塊Bの渦による擾乱により、渦位を持たない西側の流体塊Aが時刻t＝T＋ΔTで高緯度側にΔφ、東側の流体塊Cが低緯度側に−Δφ移流したとき、Aに［㋐］、Cにその反対符号の相対渦度が生じる。渦度の生成により、Aの西側で［㋑］向きの流れ、Cの西側でその反対方向の流れが生じるので、擾乱の位相は［㋒］向きに移動する。」",
    "choices": {
      "ア": "−2Ω cos φ Δφ、高緯度、西",
      "イ": "−2Ω sin φ Δφ、高緯度、東",
      "ウ": "2Ω cos φ Δφ、高緯度、西",
      "エ": "2Ω cos φ Δφ、低緯度、西",
      "オ": "2Ω sin φ Δφ、低緯度、東"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "北上したAではfが一次近似で2Ω cos φ Δφ増えるため、ζは同じ量だけ減る。負の渦は時計回りで西側の流れを北に向け、その渦の並びによる擾乱の位相は西向きに伝わる。",
    "choiceExplanations": {
      "ア": "北上したAではfが一次近似で2Ω cos φ Δφ増えるため、ζは同じ量だけ減る。負の渦は時計回りで西側の流れを北に向け、その渦の並びによる擾乱の位相は西向きに伝わる。",
      "イ": "Aの西側が北へ向く点は合っている。惑星渦度2Ω sin φの微分にはcos φが現れ、擾乱の伝播は西向きである。",
      "ウ": "Aは高い緯度へ移るので、変化するfの符号は正、これを補う相対渦度の符号は負になる。選択肢はAに生じる渦度の符号を逆にしている。",
      "エ": "渦位を保つには北上したAの相対渦度は負になる。負の渦が西側に誘起する流れは北向き、すなわち高緯度向きである。",
      "オ": "緯度による惑星渦度の変化はsin φを微分して求めるのでcos φを含む。Aが北へ動いたときの相対渦度は負で、位相は西へ進む。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q44.webp"
    ],
    "imageAltTexts": [
      "北半球の中緯度で西側の流体塊Aが北、東側のCが南へ移動することを示す模式図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q45",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "海洋学",
    "topicTags": [
      "海洋表面塩分の緯度分布",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "海洋表面の塩分に関する次の記述の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。\n「赤道付近が［㋐］になるのは、赤道収束帯に関連した大きな［㋑］による。南北回帰線付近が［㋒］になるのは、貿易風帯での［㋓］をはるかに上回る［㋔］による。高緯度帯が低塩分になるのは、主に降水が蒸発を上回ることによる。」",
    "choices": {
      "ア": "低塩分、蒸発量、高塩分、蒸発、降水",
      "イ": "低塩分、降水量、高塩分、降水、蒸発",
      "ウ": "低塩分、降水量、高塩分、蒸発、降水",
      "エ": "高塩分、蒸発量、低塩分、降水、蒸発",
      "オ": "高塩分、降水量、低塩分、蒸発、降水"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "赤道収束帯では雨が多く、海水が淡水で薄まるため表層は低塩分になる。南北回帰線付近では蒸発が降水を上回り、表層が高塩分になる。",
    "choiceExplanations": {
      "ア": "赤道付近の低塩分には赤道収束帯の多雨が関係する。回帰線付近では降水より蒸発が多く、海水中の塩分の濃度が上がる。",
      "イ": "赤道収束帯では雨が多く、海水が淡水で薄まるため表層は低塩分になる。南北回帰線付近では蒸発が降水を上回り、表層が高塩分になる。",
      "ウ": "赤道付近の降水による低塩分は合っている。回帰線付近で高塩分となるのは、降水が蒸発を上回るからでなく、その逆である。",
      "エ": "南北回帰線付近では蒸発が多いため高塩分になる。赤道付近の塩分は、赤道収束帯の降水によって下がりやすい。",
      "オ": "降水量の大きい赤道付近では淡水が加わって塩分が低くなる。南北回帰線付近では水が蒸発により多く失われて高塩分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q46",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "海洋学",
    "topicTags": [
      "海洋の成層と深層循環",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "海洋の成層構造に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「海洋の表層では、海面を吹く風によって海水がかき混ぜられたり、海面で冷やされたりすることで、海水が上下によく混合され、水温が［㋐］層ができる。これを表層混合層という。［㋑］の海域では、表層混合層の下に、深層に向かって水温が急激に下がる層が常に存在し、主水温躍層という。主水温躍層より深部（深層）では水温が低く、季節変化や地域による違いも少ない。\n現在、全地球の深層を巡る海水の大部分は、［㋒］や南極付近から沈み込んで流れ込んできたものである。この深層を流れる海水の大循環は、海上を吹く風によって生じる海流に比べると極めて遅く、［㋓］かけて循環し、海水の上下交換や熱や海水に溶け込む物質の輸送をしていると考えられている。」",
    "choices": {
      "ア": "一様になる、熱帯や中緯度、北大西洋北部、1000～2000年",
      "イ": "一様になる、熱帯や中緯度、北太平洋北部、100～500年",
      "ウ": "一様になる、寒帯、北太平洋北部、1000～2000年",
      "エ": "急変する、熱帯や中緯度、北太平洋北部、1000～2000年",
      "オ": "急変する、寒帯、北大西洋北部、100～500年"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "よく混合された表層混合層の水温は深さ方向にほぼ一様で、熱帯や中緯度の下には主水温躍層がある。深層水は北大西洋北部や南極付近で形成され、1000～2000年程度かけて大洋を巡る。",
    "choiceExplanations": {
      "ア": "よく混合された表層混合層の水温は深さ方向にほぼ一様で、熱帯や中緯度の下には主水温躍層がある。深層水は北大西洋北部や南極付近で形成され、1000～2000年程度かけて大洋を巡る。",
      "イ": "表層混合層と主水温躍層の説明は合っている。深層水の主な形成海域は北太平洋北部ではなく北大西洋北部や南極付近で、循環の目安もさらに長い。",
      "ウ": "表層混合層の水温がほぼ一様という点は正しい。恒常的な主水温躍層は熱帯や中緯度で発達し、北太平洋北部は深層水の主要な形成域ではない。",
      "エ": "海水がよく混ざる表層混合層の内部では、水温の鉛直変化は小さい。深層への沈み込みの主要域についても、北太平洋北部ではなく北大西洋北部が当てはまる。",
      "オ": "北大西洋北部で深層水が形成される点は合っている。混合層の水温はほぼ一様で、世界規模の深層循環には千年以上の時間がかかる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q47",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "海洋学",
    "topicTags": [
      "エクマン輸送と風成循環",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "風成循環に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「海洋上に風が吹くと表面付近に形成されるエクマン境界層においては、主にコリオリ力と［㋐］が釣り合って、風応力の方向に対して北半球では［㋑］に質量輸送が生じる。海洋上では赤道域で東風、中緯度帯で西風が卓越するため、両者の中間の亜熱帯域の海面付近の水には［㋒］が生じる。それにより、岸から離れた海洋の内部領域では、鉛直水柱の厚さ変化による効果と［㋓］による効果によって渦位が一定に保たれるため、赤道向きの流れが生じる。」",
    "choices": {
      "ア": "粘性力、右向き、収束場による沈降流、コリオリ力の南北変化",
      "イ": "粘性力、左向き、発散場による湧昇流、コリオリ力の南北変化",
      "ウ": "粘性力、左向き、発散場による湧昇流、相対渦度の変化",
      "エ": "遠心力、右向き、収束場による沈降流、相対渦度の変化",
      "オ": "遠心力、左向き、収束場による湧昇流、コリオリ力の南北変化"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "エクマン層では粘性を介して伝わる風の応力とコリオリ力が関わり、北半球の輸送は風応力の右向きとなる。亜熱帯では表層の水が収束して沈降し、内部の流れにはコリオリ力の緯度変化が関わる。",
    "choiceExplanations": {
      "ア": "エクマン層では粘性を介して伝わる風の応力とコリオリ力が関わり、北半球の輸送は風応力の右向きとなる。亜熱帯では表層の水が収束して沈降し、内部の流れにはコリオリ力の緯度変化が関わる。",
      "イ": "エクマン輸送は北半球では風応力に対して右へ向かう。亜熱帯では水が発散して湧昇するのではなく、輸送が収束して沈降する。",
      "ウ": "粘性力の関与は妥当である。北半球の右向き輸送によって亜熱帯では表層水が収束するため、湧昇ではなく沈降が起こる。",
      "エ": "右向きの輸送と収束による沈降は正しい。エクマン層で重要なのは粘性力であり、内部領域の南北流には惑星渦度の緯度変化が関わる。",
      "オ": "粘性力が風の運動量を水中に伝え、北半球では右向きの輸送が現れる。水が集まる収束域では、水が下向きに運ばれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q48",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "地球物理",
    "topicTags": [
      "P波の初動と震源距離",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図は、ある観測点の地震計で記録した地震波形の3成分（南北動、東西動、上下動）を示す。図Ⅰは初期微動（P波）の到着直前から主要動（S波）を含む時間範囲を表示しており、図ⅡはP波の到着直前からP波の到着直後までの時間を拡大して表示している。図Ⅰを見ると地震波形の初期微動継続時間（P波とS波の到着時間の差）は10 sであり、図Ⅱを見るとP波の先頭部分における振動方向の3成分はそれぞれ、南向き、東向き、下向きと読み取ることができる。\nこれらから、この観測点から見た震源の方向と、震源までの距離の組合せとして最も妥当なのはどれか。ただし、P波とS波の伝わる速度は一定とし、それぞれ6.0 km/s、3.0 km/sとする。",
    "choices": {
      "ア": "南東、50 km",
      "イ": "南東、60 km",
      "ウ": "北西、50 km",
      "エ": "北西、60 km",
      "オ": "北東、60 km"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "P波は縦波で震源から地表へ来るので、下向きの初動は震源側への動きを表し、水平成分から震源は南東にある。到着差10＝d(1/3.0−1/6.0)より距離は60 kmである。",
    "choiceExplanations": {
      "ア": "方向は南東で正しい。震源距離をdとすると到着時刻の差はd/3.0−d/6.0＝d/6.0で、10秒に相当するのは60 kmである。",
      "イ": "P波は縦波で震源から地表へ来るので、下向きの初動は震源側への動きを表し、水平成分から震源は南東にある。到着差10＝d(1/3.0−1/6.0)より距離は60 kmである。",
      "ウ": "下向きの初動は地中の震源に向かう向きであり、水平成分の南と東を組み合わせると南東になる。また、到着差の計算から距離は50 kmではなく60 kmである。",
      "エ": "距離は正しい。P波の伝播方向は地下から地表に向かい、下向きの初動はその逆方向を示すため、初動の水平成分は震源側の南東を示す。",
      "オ": "初動の南北成分は南向きであって北向きではない。P波の初動が下向きなので、水平の南東が震源の方向となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q48.webp"
    ],
    "imageAltTexts": [
      "三成分の地震波形。図ⅠはP波とS波が到着する時間範囲、図ⅡはP波の初動を拡大したもの。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q49",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "地球物理",
    "topicTags": [
      "深発地震と異常震域",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "異常震域に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「日本列島が位置する陸のプレートの下に沈み込んだ海洋プレート内部の深さ300 kmより深いところで発生する地震（以下、深発地震）では、震源から地震波が周囲に伝わっていくが、人体に感じやすい短周期の地震波は、海洋プレート内部の方がその外部よりも減衰が［㋐］ため、海洋プレート内部を伝わって地上に到達する地域で［㋑］震度となる異常震域が現れる。日本周辺における深発地震では、関東地方以北の［㋒］の地域で異常震域が現れることが多い。\n図は、地震A～Dの発生により、それぞれ日本国内の震度計が観測した震度の分布である。地震A～Dのうち、上で述べた深発地震による異常震域がみられるものは［㋓］である。なお、震度計の配置はこれらの地震の発生時期によらず同じであり、図中の×印はこれらの地震の震央（震源の真上に当たる点）を示す。」",
    "choices": {
      "ア": "大きい、小さい、日本海側、AとC",
      "イ": "大きい、小さい、太平洋側、BとD",
      "ウ": "大きい、大きい、日本海側、AとC",
      "エ": "小さい、大きい、日本海側、BとD",
      "オ": "小さい、大きい、太平洋側、AとC"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "短周期の波は海洋プレート内で減衰しにくく、震央から離れていてもプレートを通じて届く地域で震度が大きくなる。関東地方以北では太平洋側に多く、図のAとCに当たる。",
    "choiceExplanations": {
      "ア": "海洋プレート内では短周期の地震波の減衰が小さい。遠方に伝わっても比較的強く揺れる現象なので、震度が小さくなる説明は合わない。",
      "イ": "太平洋側に現れやすい点は合っているが、プレート内での減衰は小さく、震度は相対的に大きくなる。BとDは強く揺れた地域が震央にも比較的近い。",
      "ウ": "AとCでは震央から離れた地域でも顕著に揺れている。異常震域は減衰しにくい波によって生じ、関東地方以北では太平洋側に現れやすい。",
      "エ": "プレート内での小さい減衰と大きい震度は合っている。異常震域が現れやすいのは太平洋側で、図で震央から離れた地域に広がるのはAとCである。",
      "オ": "短周期の波は海洋プレート内で減衰しにくく、震央から離れていてもプレートを通じて届く地域で震度が大きくなる。関東地方以北では太平洋側に多く、図のAとCに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q49.webp",
      "/questions/kokka-ippan-dai/2025/senmon-butsuri/q49-legend.webp"
    ],
    "imageAltTexts": [
      "地震A～Dの日本周辺の震度分布図。各地震の震央を×印で示す。",
      "震度1〜4の濃淡と、震央の×印を示す凡例。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-butsuri-q50",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "地球物理",
    "topicTags": [
      "高さによる重力加速度の変化",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "地球の平均海水面を半径6.4×10³ kmの球面とし、地球の密度分布は球対称であるとする。重力加速度の大きさが地球中心からの距離の2乗に反比例することを用いて、平均海水面における重力加速度の大きさg₀と、平均海水面からの高さ30 mの地点における重力加速度の大きさgとの差(g₀−g)の値として最も妥当なのはどれか。\nただし、g₀＝9.8 m/s²とする。",
    "choices": {
      "ア": "4.6×10⁻⁶ m/s²",
      "イ": "9.2×10⁻⁶ m/s²",
      "ウ": "4.6×10⁻⁵ m/s²",
      "エ": "9.2×10⁻⁵ m/s²",
      "オ": "4.6×10⁻⁴ m/s²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "地球半径R＝6.4×10⁶ m、高さh＝30 mとして、g＝g₀[R/(R＋h)]²である。h/Rが非常に小さいので、差は2g₀h/R≒9.2×10⁻⁵ m/s²と見積もれる。",
    "choiceExplanations": {
      "ア": "4.6×10⁻⁶はおおよそ高さと半径の比30/(6.4×10⁶)に当たる。重力加速度の変化量には、基準の重力加速度と逆二乗の効果も含める。",
      "イ": "9.2×10⁻⁶は近似した相対変化2h/Rに近い。この無次元の比を重力加速度の差に直すにはg₀＝9.8 m/s²を掛ける。",
      "ウ": "4.6×10⁻⁵ m/s²は高さと半径の比にg₀を掛けた値に近い。重力が距離の逆二乗に比例するので、一次の変化にはさらに係数2が必要である。",
      "エ": "地球半径R＝6.4×10⁶ m、高さh＝30 mとして、g＝g₀[R/(R＋h)]²である。h/Rが非常に小さいので、差は2g₀h/R≒9.2×10⁻⁵ m/s²と見積もれる。",
      "オ": "半径は6.4×10³ kmであり、メートルに直すと6.4×10⁶ mである。高さ30 mとの比から得る加速度差は10⁻⁴の数倍ではなく、約9.2×10⁻⁵ m/s²である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016353.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  }
];
