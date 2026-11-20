import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2025_SENMON_KIKAI: Question[] = [
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q21",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "ピン継手の単純せん断",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図Ⅰ（上面図）、図Ⅱ（正面図）のように、直径20 mmの2本のピンで接合された鋼板に1280 Nの力Pをかけたとき、各ピンに生じるせん断応力の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0.5 MPa",
      "イ": "1.0 MPa",
      "ウ": "2.0 MPa",
      "エ": "4.1 MPa",
      "オ": "8.2 MPa"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各ピンの負担は1280/2＝640 Nで、せん断面積はπ×10² mm²である。平均せん断応力は約2.0 N/mm²、すなわち約2.0 MPaとなる。",
    "choiceExplanations": {
      "ア": "各ピンは半分の640 Nを一つのせん断面で受け持つ。直径20 mmを半径として面積を計算すると、本来より4倍大きな面積で割ることになる。",
      "イ": "重ね継手のピン1本につき、二枚の板の境界にせん断面が一つある。せん断面を1本当たり二つとすると、応力を実際の半分に見積もってしまう。",
      "ウ": "各ピンの負担は1280/2＝640 Nで、せん断面積はπ×10² mm²である。平均せん断応力は約2.0 N/mm²、すなわち約2.0 MPaとなる。",
      "エ": "4.1 MPaは一つのピンの面積に全体の1280 Nがかかった場合に相当する。図では同じ径のピン2本で荷重を分担する。",
      "オ": "両端の矢印はつり合う一対の引張荷重である。二つの1280 Nを足した荷重が各ピンに作用するわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q21.webp"
    ],
    "imageAltTexts": [
      "二枚の鋼板を直径20 mmの二本のピンで重ね継ぎし、反対向きに引っ張る上面図と正面図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q22",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "H形断面の断面二次モーメント",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のような断面をもつ梁について、図心を通るz軸に関する断面二次モーメントとして最も妥当なのはどれか。",
    "choices": {
      "ア": "(19/3)L³",
      "イ": "(38/3)L³",
      "ウ": "(76/3)L⁴",
      "エ": "(130/3)L⁴",
      "オ": "(260/3)L⁴"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "横3L・高さ6Lの長方形から、左右の幅L・高さ4Lの長方形を除いた形である。断面二次モーメントは［3L(6L)³−2L(4L)³］/12＝(130/3)L⁴となる。",
    "choiceExplanations": {
      "ア": "断面二次モーメントは面積に軸からの距離の二乗を乗じて積分する量である。したがって長さの4乗の次元を持ち、L³の式にはならない。",
      "イ": "L³は断面一次モーメントと同じ次元である。求める断面二次モーメントでは距離を二乗するので、正しい式はL⁴を含む。",
      "ウ": "上下のフランジについては、各フランジの図心まわりの値だけでなく、全断面のz軸までの距離5L/2も考慮する。中央部の寄与も足すと76/3ではなく130/3になる。",
      "エ": "横3L・高さ6Lの長方形から、左右の幅L・高さ4Lの長方形を除いた形である。断面二次モーメントは［3L(6L)³−2L(4L)³］/12＝(130/3)L⁴となる。",
      "オ": "外側の長方形の断面二次モーメントは54L⁴であり、切欠きのある断面の値はこれより小さくなる。260/3は54より大きいため当てはまらない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q22.webp"
    ],
    "imageAltTexts": [
      "上下の幅3L・厚さLのフランジと、高さ4L・厚さLの中央部から成る断面。水平z軸が図心を通る。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q23",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "並列部材の圧縮変形",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、断面積S₁、縦弾性係数E₁、長さlの円柱を、断面積S₂、縦弾性係数E₂、長さlの円管の中に中心軸が一致するように配置し、上下を剛体板で挟んだ構造体を圧縮した。圧縮荷重をPとしたとき、構造体の縮みとして最も妥当なのはどれか。\nただし、座屈は起こらないものとする。",
    "choices": {
      "ア": "Pl/(S₁E₁)＋Pl/(S₂E₂)",
      "イ": "Pl/(S₁E₁＋S₂E₂)",
      "ウ": "2Pl/(S₁E₁＋S₂E₂)",
      "エ": "Pl/(2S₁E₁＋2S₂E₂)",
      "オ": "Pl/[(S₁＋S₂)(E₁＋E₂)]"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "剛体板で挟まれているため、円柱と円管の縮みを共通のδと置ける。荷重はそれぞれS₁E₁δ/lとS₂E₂δ/lであり、和をPとするとδ＝Pl/(S₁E₁＋S₂E₂)となる。",
    "choiceExplanations": {
      "ア": "たわみを足す式は二つの部材が直列で、同じ力が両方にかかる場合に当てはまる。ここは並列なので両部材の縮みが同じで、力を分け合う。",
      "イ": "剛体板で挟まれているため、円柱と円管の縮みを共通のδと置ける。荷重はそれぞれS₁E₁δ/lとS₂E₂δ/lであり、和をPとするとδ＝Pl/(S₁E₁＋S₂E₂)となる。",
      "ウ": "外力の合計はPであり、二つの部材にそれぞれPが加わるわけではない。並列ばねとして剛性を加え、Pをその和で割る。",
      "エ": "並列の全剛性はS₁E₁/l＋S₂E₂/lである。柱と管を一つずつ既に数えているので、各剛性をさらに2倍にする必要はない。",
      "オ": "面積の和に弾性係数の和を掛けると、S₁E₂やS₂E₁などの交差項が含まれる。各部材の断面積とその部材の弾性係数を掛けた値を足すのが正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q23.webp"
    ],
    "imageAltTexts": [
      "上下を剛体板で挟んだ同軸の円柱と円管の断面図、および圧縮荷重Pの作用図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q24",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "片持ち梁の先端たわみ",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、長さlの片持ち梁の先端に集中荷重Pが作用するとき、片持ち梁の先端のたわみとして最も妥当なのはどれか。\nただし、梁の断面形状は幅a、高さ2aの長方形である。また、梁の縦弾性係数はEである。",
    "choices": {
      "ア": "Pl³/(2Ea⁴)",
      "イ": "3Pl³/(2Ea⁴)",
      "ウ": "Pl³/(4Ea⁴)",
      "エ": "3Pl³/(4Ea⁴)",
      "オ": "3Pl³/(8Ea⁴)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "片持ち梁の先端たわみはPl³/(3EI)である。長方形の断面二次モーメントI＝a(2a)³/12＝2a⁴/3を代入するとPl³/(2Ea⁴)になる。",
    "choiceExplanations": {
      "ア": "片持ち梁の先端たわみはPl³/(3EI)である。長方形の断面二次モーメントI＝a(2a)³/12＝2a⁴/3を代入するとPl³/(2Ea⁴)になる。",
      "イ": "先端のたわみはPl³/(EI)ではなく、その1/3である。断面二次モーメントに含まれる1/3と相殺するため、結果の分子に3は残らない。",
      "ウ": "曲げに効く高さ2aの三乗を含めると、3EIは2Ea⁴である。4Ea⁴で割る式はたわみを半分に見積もる。",
      "エ": "断面二次モーメントは単に断面の幅と高さの積ではない。I＝2a⁴/3を先端たわみの式に入れると、係数3/4ではなく1/2になる。",
      "オ": "曲げ剛性EIを求めるとき、長方形ではIに高さの三乗を使い、12で割る。その後のたわみの式にも係数1/3が掛かり、結果は3/8ではなく1/2である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q24.webp"
    ],
    "imageAltTexts": [
      "長さlの片持ち梁の先端に下向きPが作用する図。長方形断面は幅a、高さ2a。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q25",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "折れ曲がった剛体の重心",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、直角に曲がった太さの無視できる剛体が天井から糸でつり下げられている。AB＝6 cm、BC＝8 cmのとき、BCが水平面と成す角をαとしたときのtan αの値として最も妥当なのはどれか。\nただし、剛体の線密度は一様とし、糸と剛体は変形しないものとする。",
    "choices": {
      "ア": "12/35",
      "イ": "4/11",
      "ウ": "3/8",
      "エ": "16/35",
      "オ": "16/33"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Aを原点とすると、AB、BCの中点の水平座標は3 sin αと6 sin α−4 cos αである。質量比6：8で重み付けした和を0と置くと66 sin α＝32 cos αとなり、tan α＝16/33を得る。",
    "choiceExplanations": {
      "ア": "重心の水平座標がつり点Aと一致する条件を使う。二つの部分の質量を長さ6と8に比例させると、tan αは12/35にはならない。",
      "イ": "ABの中点の水平座標はAに対し3 sin αである。BCの中点の座標6 sin α−4 cos αも、質量に比例する8の重みで加える必要がある。",
      "ウ": "棒ABとBCの中点を等しい重みで平均してはならない。線密度は等しいが、長さの異なる二本の質量比は6：8である。",
      "エ": "左右方向のつり合い式は66 sin α−32 cos α＝0となる。したがって16/35ではなく、分母を33とした比になる。",
      "オ": "Aを原点とすると、AB、BCの中点の水平座標は3 sin αと6 sin α−4 cos αである。質量比6：8で重み付けした和を0と置くと66 sin α＝32 cos αとなり、tan α＝16/33を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q25.webp"
    ],
    "imageAltTexts": [
      "糸でつり下げた直角の折れ棒。ABは6 cm、BCは8 cmで、BCと水平の間に角αがある。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q26",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "孔のある円板の慣性モーメント",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のような半径aの円孔を二つ有する半径Rの薄い一様な円板の中心Oを通り、x軸とy軸に直交するz軸まわりの慣性モーメントの大きさとして最も妥当なのはどれか。\nただし、円板は密度がσで、二つの円孔の中心はそれぞれ原点からd離れたx軸上にあるものとする。\nなお、半径r、質量mの一様な円板の中心軸まわりの慣性モーメントは(1/2)mr²である。",
    "choices": {
      "ア": "σπR⁴/2−σπa²d²/2−σπa⁴",
      "イ": "σπR⁴/2−σπa²d²/2−2σπa⁴",
      "ウ": "σπR⁴/2−σπa²d²−σπa⁴",
      "エ": "σπR⁴/2−σπa²d²−2σπa⁴",
      "オ": "σπR⁴/2−2σπa²d²−σπa⁴"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "孔がない円板の値はσπR⁴/2である。各孔に対応する円板の値は平行軸の定理によりσπa⁴/2＋σπa²d²で、これを二つ分差し引く。",
    "choiceExplanations": {
      "ア": "孔1個の平行軸による寄与は、除いた質量σπa²にd²を掛けた値である。孔が二つあるため、この項はσπa²d²/2にはならない。",
      "イ": "一つの孔の中心軸まわりの値はσπa⁴/2である。二つでσπa⁴になり、これに中心のずれによる寄与を加えて円板から差し引く。",
      "ウ": "各孔の自分の中心に関する寄与を二つ分引いている点は合っている。距離dによる平行軸の項も二つ分引く必要がある。",
      "エ": "半径aの円板の中心軸まわりはσπa⁴/2で、二つ分はσπa⁴になる。距離dによる項の方が、1個分のσπa²d²の2倍となる。",
      "オ": "孔がない円板の値はσπR⁴/2である。各孔に対応する円板の値は平行軸の定理によりσπa⁴/2＋σπa²d²で、これを二つ分差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q26.webp"
    ],
    "imageAltTexts": [
      "半径Rの円板に半径aの円孔が二つあり、孔の中心は原点Oからx軸に沿って左右にdずつ離れる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q27",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "ばね支持された質点の伝達力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、質量mのおもりがばね定数kのばねを介して床に固定されている。このおもりに鉛直方向にF₀ sin ωtの周期的な力が作用し、定常状態となったとき、床に伝達される力の振幅として最も妥当なのはどれか。\nただし、おもりは鉛直方向にのみ運動するものとする。",
    "choices": {
      "ア": "[(F₀/m)k]/(ω²−k/m)",
      "イ": "[(F₀/m)k]/(ω²＋k/m)",
      "ウ": "F₀k/(ω²＋k/m)",
      "エ": "F₀k/(ω²−k/m)",
      "オ": "(F₀/m)/(ω²＋k/m)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "運動方程式mẍ＋kx＝F₀ sin ωtから、伝達力の振幅はkF₀/[m×|ω²−k/m|]となる。公式正答は絶対値を外した高周波側（ω²＞k/m）の形で、一般の振幅には絶対値が必要である。",
    "choiceExplanations": {
      "ア": "運動方程式mẍ＋kx＝F₀ sin ωtから、伝達力の振幅はkF₀/[m×|ω²−k/m|]となる。公式正答は絶対値を外した高周波側（ω²＞k/m）の形で、一般の振幅には絶対値が必要である。",
      "イ": "慣性項に対して周期解を二回微分すると−ω²が現れる。したがって剛性の項と慣性の項は打ち消す方向で、分母はω²＋k/mではない。",
      "ウ": "力の振幅を得るには変位の振幅F₀/|k−mω²|にkを掛ける。分母をω²とk/mで書く場合、分子のF₀もmで割る必要がある。",
      "エ": "角振動数と固有角振動数の二乗の差が現れる点は合っている。分母をω²−k/mと書くなら、質量mで割ったF₀/mを分子に用いる。",
      "オ": "力F₀を質量で割り、角振動数の二乗に相当する量で割ると変位の次元になる。床に伝わる力を得るには、変位にばね定数kを掛ける必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q27.webp"
    ],
    "imageAltTexts": [
      "鉛直ばねkの上端に質量mのおもりを載せ、ばねの下端を床に固定した図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q28",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "曲線走行の滑りと転倒",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、質量m、重心の高さh、左右のタイヤ間の距離Lの車が水平な道路の半径rのカーブ上を走っている。車がカーブを滑らずに走ることができる最大速さv₁と、タイヤが浮き上がらずにカーブを走ることができる最大速さv₂の組合せとして最も妥当なのはどれか。\nただし、車は左右対称でその重心はタイヤ間の中心線を通り、タイヤの太さは無視できるものとし、重力加速度の大きさをg、道路とタイヤの間の静止摩擦係数をμとする。また、カーブを滑ることと、タイヤが浮き上がることは独立して起きるものとする。",
    "choices": {
      "ア": "√(μgr)、√(grL/(2h))",
      "イ": "√(μgr)、√(ghL/(2r))",
      "ウ": "√(μgr)、√(mgrL/(2h))",
      "エ": "√(μmgr)、√(grL/(2h))",
      "オ": "√(μmgr)、√(mgrL/(2h))"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "滑り出す限界はmv₁²/r＝μmgである。内輪が浮く限界では外輪の接地点まわりで(mv₂²/r)h＝mgL/2となり、それぞれv₁＝√(μgr)、v₂＝√(grL/(2h))を得る。",
    "choiceExplanations": {
      "ア": "滑り出す限界はmv₁²/r＝μmgである。内輪が浮く限界では外輪の接地点まわりで(mv₂²/r)h＝mgL/2となり、それぞれv₁＝√(μgr)、v₂＝√(grL/(2h))を得る。",
      "イ": "滑りの限界速度は妥当である。浮き上がりは重心が高いほど起きやすいので、hは分子ではなく分母に入る。",
      "ウ": "浮き上がりの限界では、遠心力に対応する慣性力と重力の両モーメントに質量mが含まれる。つり合い式でmを消すため、v₂にmは残らない。",
      "エ": "浮き上がり限界の式は妥当である。滑りの限界において向心力と摩擦力はいずれもmに比例し、速度の式にはmが残らない。",
      "オ": "滑りと浮き上がりのどちらも、設問の条件では限界の式から質量mが消える。平方根内に質量が残る組合せは、速さの次元にも合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q28.webp"
    ],
    "imageAltTexts": [
      "半径rのカーブを走る車の上面図と、重心高さh・左右タイヤ間距離Lを示した正面図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q29",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "垂直な水門に作用する静水圧",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図Ⅰ（断面図）、図Ⅱ（正面図）のように、横幅5 mの長方形の水門により密度1 g/cm³の水がせき止められている。水深が10 mであるとき、この水門に働く力の大きさとして最も妥当なのはどれか。\nただし、重力加速度の大きさを9.81 m/s²とする。",
    "choices": {
      "ア": "4.91×10² N",
      "イ": "2.45×10³ N",
      "ウ": "4.91×10³ N",
      "エ": "2.45×10⁶ N",
      "オ": "4.91×10⁶ N"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "水面から深さzの圧力はρgzで、平均は1000×9.81×5 Paとなる。接水面積5×10＝50 m²を掛けると、約2.45×10⁶ Nである。",
    "choiceExplanations": {
      "ア": "水深に比例する圧力を、水に接する面積について積分する必要がある。幅5 mと水深10 mを考えると、力は数百Nではなく数百万Nになる。",
      "イ": "水の密度1 g/cm³は1000 kg/m³である。数値1をそのままSI単位の密度として計算すると、力を千分の一に見積もってしまう。",
      "ウ": "水門全体に作用する力は平均圧力に接水面積を掛けた値である。圧力は底まで一様ではなく、単位を換算した水の密度も使う必要がある。",
      "エ": "水面から深さzの圧力はρgzで、平均は1000×9.81×5 Paとなる。接水面積5×10＝50 m²を掛けると、約2.45×10⁶ Nである。",
      "オ": "4.91×10⁶ Nは接水面全体に底面の圧力がかかるとした値である。圧力は水面で0、底で最大となるため、平均はその半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q29.webp"
    ],
    "imageAltTexts": [
      "水深10 mで水をせき止める幅5 mの長方形水門の断面図と正面図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q30",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "クエット流れと粘性力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「高さHの薄い油膜上に重さが無視できる面積Aの平板がある。この平板を速さUで静かに動かしたところ、油膜内の速度分布は図のような直線分布となった。このときの油膜内の流れを［㋐］と呼ぶ。油膜と平板及び底面間の相対速度は0（すべりなし条件）とし、油膜を密度ρ、粘性係数μのニュートン流体とすると、平板を動かすのに必要な力Fは［㋑］となる。」",
    "choices": {
      "ア": "ハーゲン・ポアズイユ流れ、μUA/(ρH)",
      "イ": "ハーゲン・ポアズイユ流れ、μU/H",
      "ウ": "クエット流れ、μUA/(ρH)",
      "エ": "クエット流れ、μU/H",
      "オ": "クエット流れ、μUA/H"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "速度分布が直線になるクエット流れでは、速度勾配はU/Hである。ニュートン流体のせん断応力μU/Hに面積Aを掛けると必要な力になる。",
    "choiceExplanations": {
      "ア": "ハーゲン・ポアズイユ流れは円管の圧力勾配で生じる流れである。この油膜は境界の平板が動くことで流れ、力の計算で粘性係数を密度で割らない。",
      "イ": "圧力差でなく平板の運動により生じるので、流れはクエット流れである。μU/Hはせん断応力であり、力を得るには面積を掛ける。",
      "ウ": "クエット流れという名称は合っている。与えられたμは粘性係数で、ニュートンの粘性法則で密度ρで割る必要はない。",
      "エ": "μU/Hは油膜内のせん断応力を表す。設問は平板全体を動かす力を求めているので、接する面積Aをさらに掛ける。",
      "オ": "速度分布が直線になるクエット流れでは、速度勾配はU/Hである。ニュートン流体のせん断応力μU/Hに面積Aを掛けると必要な力になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q30.webp"
    ],
    "imageAltTexts": [
      "高さHの油膜の上に面積Aの平板があり、水平速度Uで動く。油膜内に直線的な速度分布が示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q31",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "斜めに衝突する噴流の運動量",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、密度ρ、速さU、体積流量Qの完全流体から成る噴流が、静止した十分大きな平板に対して30°の角度で衝突し、平板に沿って体積流量がそれぞれQ₁、Q₂の流れに分岐した。このとき、衝突後の体積流量比Q₁/Q₂と、平板が受ける力Fの組合せとして最も妥当なのはどれか。\nただし、流れは二次元流れで水平面内にあり、重力による体積力は無視できるものとする。",
    "choices": {
      "ア": "(2＋√3)²、ρQU",
      "イ": "(2＋√3)²、ρQU/2",
      "ウ": "(2＋√3)²、ρQU/√3",
      "エ": "(1＋√3)²/2、ρQU",
      "オ": "(1＋√3)²/2、ρQU/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "質量保存と接線方向の運動量保存より、Q₁＋Q₂＝Q、Q₁−Q₂＝Q cos 30°で、比は(2＋√3)²となる。力は法線方向の運動量変化ρQU sin 30°＝ρQU/2である。",
    "choiceExplanations": {
      "ア": "流量比は正しい。板が受ける力は噴流が失った法線方向の運動量流束であり、入射速度の法線成分U sin 30°を使う。",
      "イ": "質量保存と接線方向の運動量保存より、Q₁＋Q₂＝Q、Q₁−Q₂＝Q cos 30°で、比は(2＋√3)²となる。力は法線方向の運動量変化ρQU sin 30°＝ρQU/2である。",
      "ウ": "流量比は正しいが、法線方向の速度成分はU/√3ではなくU sin 30°＝U/2である。板に沿った分岐後には法線方向の速度はない。",
      "エ": "接線方向の保存から流量比は（1＋cos 30°）/（1−cos 30°）となる。力にも30°の法線成分を反映するので、ρQUをそのまま用いない。",
      "オ": "力はρQU/2で正しい。流量比は和と差の式から（2＋√3）/（2−√3）となり、これを有理化すると(2＋√3)²になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q31.webp"
    ],
    "imageAltTexts": [
      "速さU、流量Qの噴流が静止平板に30度で当たり、板に沿って両側に分かれる図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q32",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "速度場の発散と渦度",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "三次元定常非圧縮流れ場に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「三次元定常非圧縮流れ場の流速ベクトルv＝(u、v、w)の各成分が以下のとおり与えられている。\nu＝x、v＝y、w＝z\nここで、u、v、wはそれぞれ流速のx、y、z成分である。このとき、この流れ場の発散∇・vは［㋐］、連続の式を［㋑］。また、この流れ場は［㋒］の流れである。」",
    "choices": {
      "ア": "0になり、満たす、渦あり",
      "イ": "0になり、満たす、渦なし",
      "ウ": "0になり、満たさない、渦あり",
      "エ": "0にはならず、満たす、渦なし",
      "オ": "0にはならず、満たさない、渦なし"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "与えられた速度の発散は1＋1＋1＝3なので、連続の式が要求する発散0を満たさない。回転は0で渦なしとなり、設問中の「非圧縮」という仮定と与えられた速度成分が両立しないことが分かる。",
    "choiceExplanations": {
      "ア": "各速度成分を同じ向きの座標で偏微分するといずれも1で、発散は3になる。異なる向きの座標での偏微分は0なので、渦度も0である。",
      "イ": "渦なしは正しいが、発散は1＋1＋1＝3となる。非圧縮流れの連続の式が要求する発散0は満たさない。",
      "ウ": "連続の式を満たさない判断は正しい。理由は発散が3であり、速度の回転をつくる交差微分は0なので、渦度はない。",
      "エ": "発散が0でないことと渦なしは正しい。非圧縮流れの連続の式は発散が0であることを求めるため、両立しない。",
      "オ": "与えられた速度の発散は1＋1＋1＝3なので、連続の式が要求する発散0を満たさない。回転は0で渦なしとなり、設問中の「非圧縮」という仮定と与えられた速度成分が両立しないことが分かる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q33",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "カルノーサイクルの温度",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "高温熱源と低温熱源の間で、理想気体で作動する理論熱効率が20％のカルノーサイクルがある。低温熱源の温度をT［K］とするとき、高温熱源の温度［K］として最も妥当なのはどれか。",
    "choices": {
      "ア": "(6/5)T",
      "イ": "(5/4)T",
      "ウ": "(36/25)T",
      "エ": "(25/16)T",
      "オ": "5T"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "カルノー効率は高温側温度をT_Hとして1−T/T_Hである。これを0.20と置けばT/T_H＝0.80となり、高温側は(5/4)Tである。",
    "choiceExplanations": {
      "ア": "高温熱源の温度が1.2Tなら、効率は1−1/1.2＝1/6である。与えられた20％より小さくなる。",
      "イ": "カルノー効率は高温側温度をT_Hとして1−T/T_Hである。これを0.20と置けばT/T_H＝0.80となり、高温側は(5/4)Tである。",
      "ウ": "T_H＝(36/25)Tなら効率は1−25/36であり、0.20を上回る。必要な高温側温度は低温側を0.8で割って求める。",
      "エ": "候補を効率式に代入すると1−16/25＝0.36となる。要求される効率は0.20なので、比はさらに小さくなる。",
      "オ": "T_H＝5Tとすると効率は1−1/5＝0.80になる。20％に対応するのはT/T_H＝0.8の場合である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q34",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "氷の融解熱と熱収支",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "10 ℃の水に0 ℃の氷21 gを入れたところ、氷が全てとけ、とけた氷を含む水全体の温度が0 ℃となった。このとき、氷を入れる前の10 ℃の水の量として最も妥当なのはどれか。\nただし、氷の融解熱を334 J/g、水の比熱を4.2 J/（g·K）とし、水と氷の間以外での熱のやり取りはないものとする。",
    "choices": {
      "ア": "16.7 g",
      "イ": "66.8 g",
      "ウ": "167 g",
      "エ": "668 g",
      "オ": "1670 g"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "氷が受け取る熱は21×334＝7014 Jである。水の質量をm gとすると放出熱はm×4.2×10 Jなので、等しく置くとm＝167 gになる。",
    "choiceExplanations": {
      "ア": "氷の融解には21×334＝7014 Jが必要である。16.7 gの水が10 ℃下がっても約701 Jしか供給できない。",
      "イ": "10 ℃の水1 gが0 ℃まで冷えると42 Jを放出する。66.8 gでは約2806 Jで、氷を全て溶かす7014 Jに届かない。",
      "ウ": "氷が受け取る熱は21×334＝7014 Jである。水の質量をm gとすると放出熱はm×4.2×10 Jなので、等しく置くとm＝167 gになる。",
      "エ": "668 gの水が10 ℃下がると約28,000 Jを放出する。これは氷の融解に必要な熱量の約4倍である。",
      "オ": "水と氷が0 ℃で平衡になる条件では、初めの水が失った熱が氷の融解熱に等しい。1670 gでは失う熱を約10倍に見積もっている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q35",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "理想気体の準静的等温過程",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "圧力p₀、体積V₀の理想気体を、体積がV₁になるまで準静的に等温変化させたとき、この理想気体に加えられた熱量として最も妥当なのはどれか。",
    "choices": {
      "ア": "p₀(V₁−V₀)",
      "イ": "p₀V₀ ln(V₁/V₀)",
      "ウ": "p₀V₀ ln(V₀/V₁)",
      "エ": "p₀V₁ ln(V₁/V₀)",
      "オ": "p₀V₁ ln(V₀/V₁)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "理想気体の等温変化では内部エネルギーが変わらず、熱量は気体が外部にする仕事に等しい。p＝p₀V₀/VをV₀からV₁まで積分するとp₀V₀ ln(V₁/V₀)になる。",
    "choiceExplanations": {
      "ア": "この式は過程中の圧力をp₀で一定とした仕事である。等温変化ではpVが一定でpは体積に反比例するので、仕事は対数の形になる。",
      "イ": "理想気体の等温変化では内部エネルギーが変わらず、熱量は気体が外部にする仕事に等しい。p＝p₀V₀/VをV₀からV₁まで積分するとp₀V₀ ln(V₁/V₀)になる。",
      "ウ": "体積の比を逆にすると対数の符号が反対になる。V₁＞V₀の等温膨張では、仕事を補うため気体に正の熱が加わる。",
      "エ": "対数の体積比は合っている。pVの一定値は初期状態のp₀V₀であり、初期圧力と終状態の体積を組み合わせたp₀V₁ではない。",
      "オ": "係数にはp₀V₀を使う必要がある。また、気体がする仕事を求める積分の向きはV₀からV₁なので、対数はln(V₁/V₀)になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q36",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "理想気体の自由膨張",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "自由膨張に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、容積の等しい断熱容器A、Bが、断熱された弁を介して連結されている。最初、弁は閉じていて、Aには理想気体が封入され、Bは真空であった。この状態から、弁を開いたところ、理想気体は断熱的に自由膨張して平衡状態になった。このとき、断熱容器A、Bの中の理想気体の温度は［㋐］、エントロピーは［㋑］。」",
    "choices": {
      "ア": "上昇し、増加した",
      "イ": "上昇し、減少した",
      "ウ": "変化せず、増加した",
      "エ": "変化せず、減少した",
      "オ": "下降し、減少した"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "断熱で真空側への自由膨張なので熱も外部仕事もなく、理想気体の内部エネルギーと温度は変わらない。利用できる体積が2倍になる不可逆過程なので、エントロピーは増加する。",
    "choiceExplanations": {
      "ア": "利用できる体積が増えるためエントロピーは増加する。外部から熱や仕事を受け取らず内部エネルギーは増えないので、温度は上昇しない。",
      "イ": "断熱された剛体容器内の自由膨張では、熱と外部仕事のやり取りがない。理想気体の温度は一定で、自発的な膨張ではエントロピーが増える。",
      "ウ": "断熱で真空側への自由膨張なので熱も外部仕事もなく、理想気体の内部エネルギーと温度は変わらない。利用できる体積が2倍になる不可逆過程なので、エントロピーは増加する。",
      "エ": "温度が変わらない点は合っている。エントロピーは状態量で、同じ温度で体積が増えた前後を比較すると正の変化を持つ。",
      "オ": "自由膨張では気体が外部に仕事をしないので、理想気体の内部エネルギーは減らず、温度も下がらない。孤立系の不可逆過程ではエントロピーは増える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q36.webp"
    ],
    "imageAltTexts": [
      "弁を介してつながる等容積の断熱容器A・B。初期状態ではAに気体があり、Bは真空。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q37",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "機械設計",
    "topicTags": [
      "平歯車のモジュールと伝達比",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "ピッチ円直径が32 mm、歯数が16の駆動歯車と、ピッチ円直径が64 mm、歯数が32の被動歯車が正しく噛み合っている。駆動歯車への入力トルクが10 N·mであり、2000 min⁻¹で回転している場合、両歯車のモジュールm［mm］並びに被動歯車の出力トルクT［N·m］及び出力回転数n［min⁻¹］の組合せとして最も妥当なのはどれか。\nただし、伝達効率は100％とし、両歯車とも平歯車とする。",
    "choices": {
      "ア": "0.5、20、1000",
      "イ": "0.5、20、2000",
      "ウ": "2、5、1000",
      "エ": "2、10、2000",
      "オ": "2、20、1000"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "モジュールは32/16＝64/32＝2 mmである。歯数の比で出力回転数が入力の半分となり、動力保存から出力トルクは入力の2倍の20 N·mとなる。",
    "choiceExplanations": {
      "ア": "出力トルクと回転数は合っている。モジュールは歯数を直径で割るのではなく、ピッチ円直径を歯数で割るので2 mmである。",
      "イ": "モジュールを求める式は直径÷歯数である。被動歯車の歯数が駆動側の2倍なので、被動側の回転数は2000 min⁻¹の半分になる。",
      "ウ": "モジュール2 mmと回転数1000 min⁻¹は正しい。回転数が半分で伝達効率100％なら、出力トルクは入力の半分ではなく2倍である。",
      "エ": "被動側の歯数が2倍なので、同時間に回転する角度は半分になる。効率100％では動力が等しいため、トルクは2倍になる。",
      "オ": "モジュールは32/16＝64/32＝2 mmである。歯数の比で出力回転数が入力の半分となり、動力保存から出力トルクは入力の2倍の20 N·mとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q38",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "引張・疲労・衝撃試験",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "金属材料の試験法に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n・引張試験において、軟鋼の試験片に引張荷重を加えると、［㋐］近傍までは弾性変形し、［㋐］を超えると、塑性変形が起こる。\n・疲労試験は、平均応力を一定として、様々な応力振幅の下で破壊までの繰り返し数を求め、その結果を［㋑］で表すことにより評価を行うものである。\n・衝撃試験は、試験片に衝撃荷重を加えて破壊し、この破壊に要したエネルギーや破断面の様相等から、材料の［㋒］等を調べるものである。",
    "choices": {
      "ア": "降伏点、S–N線図、靱性",
      "イ": "降伏点、S–N線図、硬さ",
      "ウ": "降伏点、応力–ひずみ線図、靱性",
      "エ": "耐久限、S–N線図、靱性",
      "オ": "耐久限、応力–ひずみ線図、硬さ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "軟鋼は降伏点付近から永久変形を生じる。疲労は応力振幅と破壊までの繰返し回数をS–N線図で示し、衝撃試験では破壊に要するエネルギーなどから靱性を評価する。",
    "choiceExplanations": {
      "ア": "軟鋼は降伏点付近から永久変形を生じる。疲労は応力振幅と破壊までの繰返し回数をS–N線図で示し、衝撃試験では破壊に要するエネルギーなどから靱性を評価する。",
      "イ": "降伏点とS–N線図は正しい。衝撃荷重で破壊するまでに吸収したエネルギーは、押込みなどで測る硬さではなく靱性に関わる。",
      "ウ": "降伏点と靱性は正しい。疲労試験ではひずみと応力の関係ではなく、応力振幅と繰返し回数の関係をS–N線図で表す。",
      "エ": "S–N線図と靱性は正しい。耐久限は疲労に関わる限界の応力であり、単調な引張りで塑性変形が始まる付近は降伏点と呼ぶ。",
      "オ": "引張りで塑性変形が始まる付近は降伏点であり、耐久限ではない。疲労にはS–N線図、衝撃では靱性を用いるので後半の組合せも合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q39",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "体心立方格子の幾何",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "金属の結晶構造に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「金属結晶を構成している原子が同じ大きさの硬い球であると仮定する。このとき、図のような結晶構造において、立方体の中心にある原子は、すぐ上の面にある4個の原子及びすぐ下の面の4個の原子と接している。この構造をもつ格子を［㋐］格子といい、立方体の一辺の長さ（格子定数）をaとすると原子半径は［㋑］であり、この単位格子に属する原子数は2個である。室温で［㋐］格子となるものとして［㋒］などがある。」",
    "choices": {
      "ア": "体心立方、(√2/4)a、鉄",
      "イ": "体心立方、(√3/4)a、銅",
      "ウ": "体心立方、(√3/4)a、鉄",
      "エ": "面心立方、(√3/4)a、銅",
      "オ": "面心立方、(√2/4)a、鉄"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "体心の原子を含むので体心立方格子である。体対角線√3aに端の半径二つと中央の直径が並ぶのでr＝√3a/4となり、室温のα鉄がこの構造を持つ。",
    "choiceExplanations": {
      "ア": "√2aは立方体の一つの面の対角線の長さである。体心立方格子では原子が接して並ぶのは体対角線で、その長さは√3aになる。",
      "イ": "体心立方格子の名称と半径は合っている。銅の室温での結晶は面心立方格子で、ここで挙げる例には当てはまらない。",
      "ウ": "体心の原子を含むので体心立方格子である。体対角線√3aに端の半径二つと中央の直径が並ぶのでr＝√3a/4となり、室温のα鉄がこの構造を持つ。",
      "エ": "銅が面心立方格子を取る点は合っているが、図は体心に原子がある格子である。面心立方格子なら原子は面対角線上で接する。",
      "オ": "室温のα鉄は体心立方格子である。√2a/4は面心立方格子で面対角線から求まる半径で、図の格子の半径ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kikai/q39.webp"
    ],
    "imageAltTexts": [
      "立方体の各頂点と体心に原子があり、体対角線に沿って接している結晶構造の図。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kikai-q40",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "平削り盤・旋盤・ボール盤",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "工作機械に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n・［㋐］は、工作物を固定したテーブルを水平往復運動させ、バイトをテーブルの運動方向と直角方向に間欠的に送って切削を行う工作機械である。\n・［㋑］は、工作物を回転させ、主としてバイトなどの静止工具を使用して、外丸削り、中ぐり、突切り、正面削り、ねじ切りなどの切削加工を行う工作機械である。\n・［㋒］は、ドリルに回転と軸方向の送りを与え、テーブル上に固定した工作物に穴をあける切削を行う工作機械である。",
    "choices": {
      "ア": "平削り盤、旋盤、ボール盤",
      "イ": "平削り盤、旋盤、ブローチ盤",
      "ウ": "形削り盤、旋盤、ボール盤",
      "エ": "形削り盤、平削り盤、ブローチ盤",
      "オ": "旋盤、平削り盤、ボール盤"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "工作物をのせたテーブルが往復するのは平削り盤で、工作物を回すのは旋盤である。ドリルを回して軸方向に送る穴加工機はボール盤である。",
    "choiceExplanations": {
      "ア": "工作物をのせたテーブルが往復するのは平削り盤で、工作物を回すのは旋盤である。ドリルを回して軸方向に送る穴加工機はボール盤である。",
      "イ": "前二つは正しい。ブローチ盤は多数の切れ刃があるブローチを通して加工する装置で、ドリルを回転させるボール盤とは異なる。",
      "ウ": "旋盤とボール盤は合っている。形削り盤では主に工具側が往復するのに対し、第一の記述では工作物を固定したテーブルが往復する。",
      "エ": "形削り盤でなく平削り盤が工作物側を往復させる。第二の記述は工作物を回転させる旋盤、第三はドリルを回すボール盤である。",
      "オ": "第三の穴加工機はボール盤で正しい。旋盤は工作物を回転させるので第二の記述に、平削り盤は工作物側を往復させるので第一の記述に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016347.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  }
];
