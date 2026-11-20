import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2026_SENMON_KIKAI: Question[] = [
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q21",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "熱ひずみと弾性伸び",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、直径4.00 cmの鋼棒が水平な天井に鉛直に接合されている。気温が30.0 ℃から－10.0 ℃に低下した後、鋼棒の長さを元に戻すために吊るすおもりの重量として最も妥当なのはどれか。\nただし、鋼の線膨張係数を1.00×10⁻⁵ ℃⁻¹、ヤング率を200 GPaとし、円周率を3.14とする。",
    "choices": {
      "ア": "25.1 kN",
      "イ": "50.2 kN",
      "ウ": "100 kN",
      "エ": "201 kN",
      "オ": "402 kN"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "熱収縮のひずみは1.00×10⁻⁵×40.0＝4.00×10⁻⁴であり、これを補う応力は200 GPa×4.00×10⁻⁴＝80 MPaである。断面積3.14×0.0200² m²を掛けると約100 kNとなる。",
    "choiceExplanations": {
      "ア": "温度低下に伴うひずみの大きさは4.00×10⁻⁴で、これを補う応力は80 MPaである。半径0.0200 mの断面積を掛けるので、重量は約100 kNになる。",
      "イ": "50.2 kNの力を断面積で割ると、およそ40 MPaにしかならない。40 ℃の温度低下による収縮を補うには80 MPaの引張応力が必要である。",
      "ウ": "熱収縮のひずみは1.00×10⁻⁵×40.0＝4.00×10⁻⁴であり、これを補う応力は200 GPa×4.00×10⁻⁴＝80 MPaである。断面積3.14×0.0200² m²を掛けると約100 kNとなる。",
      "エ": "201 kNは約160 MPaの引張応力に当たる。必要な引張ひずみは4.00×10⁻⁴なので、ヤング率を掛けた応力は80 MPaである。",
      "オ": "断面積は直径4.00 cmの二乗にπを掛けるのではなく、半径2.00 cmを使う。直径を半径として使うと力を約4倍に見積もってしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q21.webp"
    ],
    "imageAltTexts": [
      "天井から鉛直に支持された直径4.00 cmの鋼棒"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q22",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "動力伝達軸のねじれ",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のような伝動軸があり、角周波数（1秒間当たりの回転角）200 rad/sで回転し、A端で動力H_A＝16 kWが、B及びC端でそれぞれH_B＝12 kW、H_C＝4 kWが伝達される。軸の区間AB及び区間BCは同一の一様な材料（せん断弾性定数100 GPa、断面二次極モーメント1.6×10⁻⁸ m⁴）から成り、長さl＝8.0 cmであるとき、A端に対するC端のねじれ角として最も妥当なのはどれか。\nただし、円周率を3.14とする。",
    "choices": {
      "ア": "0.058°",
      "イ": "0.15°",
      "ウ": "0.23°",
      "エ": "0.29°",
      "オ": "0.58°"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "動力を角周波数で割ると、ABのトルクは80 N·m、BCは20 N·mである。各区間のねじれ角の和は(80＋20)×0.080/(100×10⁹×1.6×10⁻⁸)＝0.005 rad≒0.29°である。",
    "choiceExplanations": {
      "ア": "0.058°は、動力4 kWを伝える区間BCだけのねじれに相当する。A端に対するC端の角度には区間ABのねじれも加わる。",
      "イ": "ねじれ角は区間ごとにトルクと長さの積をGJで割り、合計する。ABの80 N·mとBCの20 N·mを用いれば、合計は0.005 radである。",
      "ウ": "0.23°は、16 kWを伝えるAB区間のねじれ角に相当する。BC区間の4 kW分を加えると約0.29°になる。",
      "エ": "動力を角周波数で割ると、ABのトルクは80 N·m、BCは20 N·mである。各区間のねじれ角の和は(80＋20)×0.080/(100×10⁹×1.6×10⁻⁸)＝0.005 rad≒0.29°である。",
      "オ": "各区間の長さはそれぞれ8.0 cmで、トルクもABとBCで異なる。区間ごとの寄与を合計すると0.005 radになり、0.58°の約半分である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q22.webp"
    ],
    "imageAltTexts": [
      "間隔lで並ぶA、B、Cの各位置と伝達動力の向き"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q23",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "円形パンチによるせん断",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、直径100 mmの円形パンチで、厚さ3 mmの一様な板を板面に垂直に打ち抜くことを考える。この板のせん断強さが100 MPaのとき、この板の打抜きに必要な最小の力として最も妥当なのはどれか。\nただし、円周率を3.14とする。",
    "choices": {
      "ア": "30.0 kN",
      "イ": "94.2 kN",
      "ウ": "188 kN",
      "エ": "785 kN",
      "オ": "2360 kN"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "板が切れる面の面積は円周長×板厚＝3.14×100×3＝942 mm²である。せん断強さ100 N/mm²を掛けると94,200 N、すなわち94.2 kNとなる。",
    "choiceExplanations": {
      "ア": "30.0 kNは、直径と板厚の積をせん断面積としたときの値である。切れる面は円周に沿うため、直径ではなく円周長を使う。",
      "イ": "板が切れる面の面積は円周長×板厚＝3.14×100×3＝942 mm²である。せん断強さ100 N/mm²を掛けると94,200 N、すなわち94.2 kNとなる。",
      "ウ": "188 kNは、正しい打抜き力のおよそ2倍である。円周は2πr＝πdなので、直径100 mmを用いるときに2を掛ける必要はない。",
      "エ": "785 kNはパンチの円形の端面積にせん断強さを掛けた値である。切断面は端面ではなく、円周の長さと板厚の積で求める。",
      "オ": "せん断強さには、円周長314 mmに厚さ3 mmを掛けた面積を用いる。板の面に沿う円の面積を使うと、せん断を受ける場所を取り違える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q23.webp"
    ],
    "imageAltTexts": [
      "直径100 mmのパンチが厚さ3 mmの板を打ち抜く断面"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q24",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "中空断面の断面二次モーメント",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図Ⅰ、図Ⅱのような断面をもち、z軸を中立軸とする部材がある。このとき、図Ⅰ、図Ⅱそれぞれの部材の断面について計算したz軸に関する断面2次モーメントI₁、I₂の組合せとして、最も妥当なのはどれか。",
    "choices": {
      "ア": "(b₂h₂³－b₁h₁³)/12／π(d₂⁴－d₁⁴)/64",
      "イ": "(b₂³h₂－b₁³h₁)/12／π(d₂⁴－d₁⁴)/64",
      "ウ": "(b₂h₂³－b₁h₁³)/12／π(d₂³－d₁³)/64",
      "エ": "(b₂³h₂－b₁³h₁)/12／π(d₂³－d₁³)/64",
      "オ": "(b₂h₂³－b₁h₁³)/12／π(d₂²－d₁²)/64"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "水平なz軸まわりの長方形の断面二次モーメントはbh³/12、円ではπd⁴/64である。どちらも外側の断面から同じ軸を持つ空洞の値を引く。",
    "choiceExplanations": {
      "ア": "水平なz軸まわりの長方形の断面二次モーメントはbh³/12、円ではπd⁴/64である。どちらも外側の断面から同じ軸を持つ空洞の値を引く。",
      "イ": "円の式は合っているが、長方形では水平な軸からの距離は縦方向に測る。そのため、三乗する寸法は幅bではなく高さhである。",
      "ウ": "長方形の式は正しい。断面二次モーメントの単位は長さの4乗なので、円では直径を4乗する。",
      "エ": "長方形ではz軸に垂直な高さが三乗になる。円の二次モーメントは直径の4乗に比例するため、この組合せは両方の式が合わない。",
      "オ": "円の直径の二乗は断面積に関する次元である。断面二次モーメントは面積に軸からの距離の二乗を掛けて積分するので直径の4乗になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q24.webp"
    ],
    "imageAltTexts": [
      "中空の長方形と円の断面、およびそれぞれの中立軸z"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q25",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "棒の力とモーメントのつり合い",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、鉛直な壁に一端が回転支持されて、他端が糸で支えられた軽い剛体棒の先端に、質量mのおもりをつり下げる。棒が水平となり、かつ糸が水平と30°の角度をなすとき、棒と支点における反力Rのなす角度をθとする。このとき、反力R、張力T、角度θの組合せとして最も妥当なのはどれか。\nただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "√3 mg／2mg／0°",
      "イ": "2mg／√3 mg／0°",
      "ウ": "2mg／2mg／30°",
      "エ": "2√3 mg／2mg／60°",
      "オ": "(√3/2)mg／2mg／60°"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "支点まわりのモーメントがつり合うためT sin 30°＝mgとなり、T＝2mgである。鉛直成分はつり合っているので反力は水平で、R＝T cos 30°＝√3 mgとなる。",
    "choiceExplanations": {
      "ア": "支点まわりのモーメントがつり合うためT sin 30°＝mgとなり、T＝2mgである。鉛直成分はつり合っているので反力は水平で、R＝T cos 30°＝√3 mgとなる。",
      "イ": "反力が水平である点は正しいが、糸の張力の鉛直成分がmgになるにはT＝2mgが必要である。反力の大きさは張力の水平成分√3 mgとなる。",
      "ウ": "T＝2mgは妥当である。糸の鉛直成分だけでおもりの重力とつり合うため、反力には鉛直成分がなく、θは0°になる。",
      "エ": "張力の鉛直成分は重力と等しいため、反力は水平である。Rは2mg cos 30°なので2√3 mgにはならない。",
      "オ": "反力は水平で角度θは0°になる。張力2mgの水平成分はcos 30°を掛けた√3 mgであり、これが反力の大きさである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q25.webp"
    ],
    "imageAltTexts": [
      "壁で支持した水平棒の先端を30°の糸で支えておもりを吊るす配置"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q26",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "糸で引く円柱の転がり",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、半径r、質量mの一様な剛体円柱に糸を巻き付けて水平な床の上に置き、糸を張力Tで水平方向に引いて転がす。円柱と床の間には、滑りがなく、摩擦力Fが作用し、円柱の並進距離xと回転角θの間にはx＝rθという関係が成り立つ。このとき、円柱の並進の加速度d²x/dt²として最も妥当なのはどれか。\nただし、tは時間とし、並進の加速度d²x/dt²は張力Tの方向を正とする。また、円柱の慣性モーメントIはI＝(1/2)mr²であることを用いてよい。",
    "choices": {
      "ア": "T/(3m)",
      "イ": "T/m",
      "ウ": "4T/(3m)",
      "エ": "2T/m",
      "オ": "4T/m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "図の左向きを正に取った符号付きのFを使うと、並進はT－F＝ma、回転は(T＋F)r＝Ia/rとなる。二つの式からFを消去し、I/r²＝m/2を使うと2T＝(3/2)maとなるため、a＝4T/(3m)である。",
    "choiceExplanations": {
      "ア": "転がりの加速度をaとすると、並進と回転の式を足して摩擦力を消去できる。両式に張力Tの寄与があるので、左辺には2Tが残る。",
      "イ": "T/mは張力だけを並進の力とした値である。滑らずに回転するため摩擦も働くので、並進と回転の式を一緒に解く。",
      "ウ": "図の左向きを正に取った符号付きのFを使うと、並進はT－F＝ma、回転は(T＋F)r＝Ia/rとなる。二つの式からFを消去し、I/r²＝m/2を使うと2T＝(3/2)maとなるため、a＝4T/(3m)である。",
      "エ": "2T/mは回転の慣性モーメントの寄与を落とした値である。回転分のI/r²＝m/2も加えると、加速度は2T/(m＋m/2)になる。",
      "オ": "4T/mは、回転分のI/r²＝m/2だけを慣性とした場合の値である。円柱全体の並進に必要な質量mも分母に加える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q26.webp"
    ],
    "imageAltTexts": [
      "上端の糸を右向きに引く円柱と床に示された摩擦力Fの向き"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q27",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "ばねで支えた剛体棒の固有振動数",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、左端が壁に回転自由支持され、右端に質量mの小球が取り付けられた、長さ2lの軽い剛体棒があり、左端から距離lの点においてばね定数kの軽いばねで支持されている。この棒が微小振動するときの固有振動数として最も妥当なのはどれか。",
    "choices": {
      "ア": "(1/π)√(k/m)",
      "イ": "(1/(2π))√(kl/(2m))",
      "ウ": "(1/(2π))√(k/(2ml))",
      "エ": "(1/(2π))√(k/(2m))",
      "オ": "(1/(4π))√(k/m)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "微小角φに対しばねの変位はlφ、復元モーメントはkl²φ、小球の慣性モーメントはm(2l)²である。角振動数は(1/2)√(k/m)となり、2πで割った固有振動数は(1/(4π))√(k/m)である。",
    "choiceExplanations": {
      "ア": "小球の支点からの距離はばね取付点までの距離の2倍である。回転の慣性にはその距離の二乗が入るので、角振動数は√(k/m)の半分になる。",
      "イ": "√(kl/m)は振動数の単位にならない。支点まわりのばねによる復元モーメントも小球の慣性モーメントも距離の二乗を持つので、lは約分される。",
      "ウ": "√(k/(ml))には距離lが残り、振動数の単位にならない。ばねの変位と力の腕の双方にlが入るので、回転ばね定数ではl²が現れる。",
      "エ": "質点の距離2lとばねの距離lの比は、角振動数の二乗に距離比の二乗として入る。角振動数は√(k/(2m))ではなく(1/2)√(k/m)になる。",
      "オ": "微小角φに対しばねの変位はlφ、復元モーメントはkl²φ、小球の慣性モーメントはm(2l)²である。角振動数は(1/2)√(k/m)となり、2πで割った固有振動数は(1/(4π))√(k/m)である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q27.webp"
    ],
    "imageAltTexts": [
      "左端を支点とし、中央をばね、右端を小球とする棒"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q28",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "三物体を連結した運動",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、水平で滑らかな床の上に質量M₁、M₂、M₃の小物体A、B、Cがあり、それぞれが軽い糸で一列につながれている。小物体Cに一定の外力Fが図中右向きに作用しているとき、小物体BとCの間の糸に働く一定の張力Tの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "F",
      "イ": "[(M₁＋M₂)/(M₁＋M₂＋M₃)]F",
      "ウ": "[(M₁＋M₂)/M₃]F",
      "エ": "[M₃/(M₁＋M₂＋M₃)]F",
      "オ": "[M₃/(M₁＋M₂)]F"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "三物体は一体に加速するため、加速度はF/(M₁＋M₂＋M₃)である。糸の張力TはAとBの合計質量M₁＋M₂をこの加速度で動かす力である。",
    "choiceExplanations": {
      "ア": "Fの一部は小物体C自身を加速するために使われる。BとCの間の張力はA、Bを加速する力なので、Fより小さい。",
      "イ": "三物体は一体に加速するため、加速度はF/(M₁＋M₂＋M₃)である。糸の張力TはAとBの合計質量M₁＋M₂をこの加速度で動かす力である。",
      "ウ": "FはCに加わるが、糸でつながれた三物体全てが加速する。加速度の分母にM₃だけを用いると、AとBの質量を数えていない。",
      "エ": "M₃に全体の加速度を掛けた力は、Cに作用する合力F－Tに当たる。Tに対応する質量は糸の左側にあるM₁＋M₂である。",
      "オ": "求める張力はAとBの合計質量に全体の加速度を掛けた値である。M₃は全質量の一部として加速度を求める分母に入る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q28.webp"
    ],
    "imageAltTexts": [
      "三物体A、B、Cを糸でつなぎ、Cを右向きに引く配置"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q29",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "球に働く抗力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "直径2.5 cmの球が、大気中を一定の速さ3 m/sで移動したところ、大きさF₁の抗力を受けた。同じ大気中を、直径5.0 cmの球が一定の速さ9 m/sで移動したところ、大きさF₂の抗力を受けた。どちらの場合も抵抗係数が同じであるとき、F₂/F₁として最も妥当なのはどれか。",
    "choices": {
      "ア": "12",
      "イ": "18",
      "ウ": "24",
      "エ": "36",
      "オ": "72"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "抗力は同じ抵抗係数・密度のもとで投影面積と速さの二乗に比例する。直径比2の二乗と速さの比3の二乗を掛けると4×9＝36である。",
    "choiceExplanations": {
      "ア": "12は直径比の二乗4に速さの比3を一度だけ掛けた値である。抗力には速さの二乗が効くため、速さの項は9になる。",
      "イ": "18は直径比2と速さの比の二乗9を掛けた値である。投影面積も直径の二乗に比例するので、面積比は2ではなく4である。",
      "ウ": "抵抗係数と密度が同じなら、抗力は投影面積と速さの二乗の積に比例する。直径が2倍、速さが3倍なので、各寄与は4倍と9倍である。",
      "エ": "抗力は同じ抵抗係数・密度のもとで投影面積と速さの二乗に比例する。直径比2の二乗と速さの比3の二乗を掛けると4×9＝36である。",
      "オ": "球の抗力に入る幾何学的な量は体積ではなく投影面積である。直径を二乗した面積比4に速さの比の二乗9を掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q30",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "速度場と流線",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "xy平面（直交座標系）における二次元の定常な非圧縮性流体の流れを考える。いま、x方向の速度u及びy方向の速度vが次式で与えられるとする。このとき、この流れを示す図として最も妥当なのはどれか。\n\nu＝－y、v＝x",
    "choices": {
      "ア": "左上を向く平行な直線",
      "イ": "右を向く水平の平行な直線",
      "ウ": "原点から外向きに広がる放射状の直線",
      "エ": "座標軸に沿って曲がる双曲線状の流線",
      "オ": "原点を中心とする反時計回りの同心円"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "2xu＋2yv＝2x(－y)＋2yx＝0なので、流線でx²＋y²は一定になる。正のx軸上で速度が上向きになるため、原点を中心に反時計回りに回る。",
    "choiceExplanations": {
      "ア": "この速度場の向きは場所によって変化する。例えば正のx軸上では上向き、正のy軸上では左向きなので、一様に左上を向く直線にはならない。",
      "イ": "正のx軸上ではu＝0、v＞0であり、速度は上向きになる。右向きの水平流線はこの条件に合わない。",
      "ウ": "位置ベクトル(x,y)と速度(－y,x)の内積は0である。速度は半径方向ではなく、原点を中心とする円の接線を向く。",
      "エ": "流れに沿ったx²＋y²の変化は2xu＋2yv＝0である。原点からの距離が変わらないので、双曲線状の流線にはならない。",
      "オ": "2xu＋2yv＝2x(－y)＋2yx＝0なので、流線でx²＋y²は一定になる。正のx軸上で速度が上向きになるため、原点を中心に反時計回りに回る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-kikai/q30-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-kikai/q30-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-kikai/q30-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-kikai/q30-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-kikai/q30-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q31",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "レイノルズ数",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "レイノルズ数に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「レイノルズ数は［㋐］と［㋑］の比で表される。一般に、円管内の非圧縮性流れにおいて、流速を大きくしていくと、［㋑］の影響に比べ、［㋐］の影響が大きくなり、流れは層流から乱流へと遷移する。」",
    "choices": {
      "ア": "圧力／重力",
      "イ": "圧力／粘性力",
      "ウ": "粘性力／慣性力",
      "エ": "慣性力／重力",
      "オ": "慣性力／粘性力"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "レイノルズ数は慣性力と粘性力の比である。流速が上がるとこの比が増し、円管の流れは層流から乱流へ遷移しやすくなる。",
    "choiceExplanations": {
      "ア": "管内の流れでレイノルズ数が比較するのは、流体の慣性の効果と粘性の効果である。圧力と重力の比にはならない。",
      "イ": "粘性力を分母に置く点は妥当である。流速を上げたときに相対的に大きくなる分子側は、圧力ではなく慣性力である。",
      "ウ": "レイノルズ数は流速を上げるほど増加する。流速が増すと慣性力の影響が粘性力を上回りやすくなるため、比は慣性力を分子に置く。",
      "エ": "慣性力が分子に来る点は妥当である。重力との比で扱う代表的な無次元数はフルード数であり、レイノルズ数は粘性力と比べる。",
      "オ": "レイノルズ数は慣性力と粘性力の比である。流速が上がるとこの比が増し、円管の流れは層流から乱流へ遷移しやすくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q32",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "ピトー管による流速測定",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、水平な管内を空気が流れているとき、管内にピトー管を挿入し、水を入れたマノメータで全圧と静圧の差を測定する。液面の高さの差が15 cmであったとき、管内を流れる空気の流速vとして最も妥当なのはどれか。\nただし、水の密度を1.0×10³ kg/m³、空気の密度を1.2 kg/m³、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "6.0×10⁻² m/s",
      "イ": "35 m/s",
      "ウ": "50 m/s",
      "エ": "1.0×10² m/s",
      "オ": "5.0×10² m/s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "全圧と静圧の差は密度差×g×0.15≒1,500 Paである。これを空気の動圧1.2v²/2と等しくするとv≒50 m/sになる。",
    "choiceExplanations": {
      "ア": "水柱の高さ0.15 mは、そのまま速度を表さず、密度と重力加速度を掛けて圧力差に変換する。その圧力差を空気の動圧と等しく置くと約50 m/sになる。",
      "イ": "35 m/sは動圧をρv²とした計算に近い。動圧はρv²/2なので、速度を解くときに圧力差を2倍する。",
      "ウ": "全圧と静圧の差は密度差×g×0.15≒1,500 Paである。これを空気の動圧1.2v²/2と等しくするとv≒50 m/sになる。",
      "エ": "100 m/sでの空気の動圧は6,000 Paで、15 cmの水柱による圧力差約1,500 Paの4倍である。速度は動圧の平方根に比例する。",
      "オ": "500 m/sでの空気の動圧は約150,000 Paで、水柱15 cmが示す値より約100倍大きい。高さは15 mではなく0.15 mに換算する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q32.webp"
    ],
    "imageAltTexts": [
      "管を流れる空気の全圧と静圧を比較する水マノメータ"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q33",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "発熱量と出力の換算",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "4.6×10⁴ kJ/kgの発熱量をもつ灯油を0.5 kg/hで消費するヒーターがある。このヒーターと同じ発熱量を電熱器で得るとするとき、電熱器の出力として最も妥当なのはどれか。",
    "choices": {
      "ア": "4.6 kW",
      "イ": "6.4 kW",
      "ウ": "3.8×10² kW",
      "エ": "2.3×10⁴ kW",
      "オ": "9.2×10⁴ kW"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "発熱量に消費量を掛けると2.3×10⁴ kJ/hになる。1 kW＝1 kJ/sなので3,600で割り、約6.4 kWと求められる。",
    "choiceExplanations": {
      "ア": "発熱量4.6×10⁴ kJ/kgに、1時間当たりの灯油の消費量を掛ける。さらに1時間＝3,600秒で割った結果は4.6 kWではなく約6.4 kWである。",
      "イ": "発熱量に消費量を掛けると2.3×10⁴ kJ/hになる。1 kW＝1 kJ/sなので3,600で割り、約6.4 kWと求められる。",
      "ウ": "2.3×10⁴ kJ/hを60で割ると約3.8×10² kJ/minになる。kWにするには、さらに1分当たりから1秒当たりに換算する。",
      "エ": "2.3×10⁴は1時間当たりの発熱量をkJで表した値である。kWに直すには、1時間の秒数3,600で割る必要がある。",
      "オ": "単位質量当たりの発熱量は消費量0.5 kg/hで割るのではなく掛ける。得られた熱量の単位はkJ/hなので、さらに秒当たりに直す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q34",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "定圧膨張の絶対仕事",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "滑らかに動く軽いピストンの付いたシリンダに封じられた空間に、圧力220 kPaで理想気体が充填されている。気体が圧力を一定に保ったまま外部から可逆的に加熱されることにより、その体積が0.9 m³から2.3 m³に変化した場合、この気体が外部にした絶対仕事として最も妥当なのはどれか。",
    "choices": {
      "ア": "86 kJ",
      "イ": "198 kJ",
      "ウ": "308 kJ",
      "エ": "506 kJ",
      "オ": "562 kJ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "体積の増加は2.3－0.9＝1.4 m³である。定圧過程では仕事が圧力と体積増加の積に等しく、220×1.4＝308 kJになる。",
    "choiceExplanations": {
      "ア": "圧力220 kPaを一定に保つので、外部への仕事は圧力と体積変化1.4 m³の積である。1 kPa·m³＝1 kJなので仕事は308 kJになる。",
      "イ": "198 kJは圧力220 kPaと初めの体積0.9 m³を掛けた値である。膨張仕事に必要なのは初めの体積ではなく、体積の増加分である。",
      "ウ": "体積の増加は2.3－0.9＝1.4 m³である。定圧過程では仕事が圧力と体積増加の積に等しく、220×1.4＝308 kJになる。",
      "エ": "506 kJは圧力と最後の体積の積である。初めの体積に対応する198 kJを引いた差が膨張仕事となる。",
      "オ": "絶対仕事は圧力を体積で積分した値である。圧力一定なので積分区間の幅1.4 m³を掛け、308 kJを得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q35",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "理想気体の絞り",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "断熱された管の中に絞りが設置され、理想気体が定常的に流れている。絞りの上流における気体の圧力p₁が1600 kPa、温度T₁が600 Kであり、密度ρ₁が12.0 kg/m³であった。下流における圧力p₂は200 kPaであった。このとき、絞り下流における気体の温度T₂及び密度ρ₂の組合せとして最も妥当なのはどれか。\nただし、流体のもつ運動エネルギーは無視できるほど小さいとし、下流の状態は、絞りを通る際の局所的な加速や乱れなどが収まった平衡状態に達していたとする。",
    "choices": {
      "ア": "75 K／1.5 kg/m³",
      "イ": "75 K／12 kg/m³",
      "ウ": "600 K／1.5 kg/m³",
      "エ": "600 K／12 kg/m³",
      "オ": "4800 K／96 kg/m³"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "絞りの前後で熱や軸仕事のやり取りがなく、運動エネルギー差を無視できるので、比エンタルピーは一定である。理想気体ではそのため温度は600 Kに保たれ、圧力比1/8から密度は1.5 kg/m³となる。",
    "choiceExplanations": {
      "ア": "密度1.5 kg/m³は正しい。断熱の絞りでは比エンタルピーが等しく、理想気体の比エンタルピーは温度の関数なので、温度は変わらない。",
      "イ": "理想気体の絞りでは比エンタルピーが保存され、温度は600 Kのままである。圧力が1/8になるため、状態方程式から密度も1/8になる。",
      "ウ": "絞りの前後で熱や軸仕事のやり取りがなく、運動エネルギー差を無視できるので、比エンタルピーは一定である。理想気体ではそのため温度は600 Kに保たれ、圧力比1/8から密度は1.5 kg/m³となる。",
      "エ": "温度600 Kは正しい。状態方程式p＝ρRTの下で温度が一定なら密度は圧力と同じ比で変わるため、12 kg/m³にはとどまらない。",
      "オ": "断熱絞りではエンタルピーの収支から、理想気体の温度が上昇することはない。圧力が下がり温度が一定なので、密度は上昇せず低下する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q36",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "ディーゼルサイクルの熱効率",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "等圧加熱過程における空気1 kg当たりの加熱量が2780 kJ、等容放熱過程における空気1 kg当たりの放熱量が1310 kJであるディーゼルサイクルの熱効率として最も妥当なのはどれか。\nただし、サイクルの過程はいずれも可逆過程とする。",
    "choices": {
      "ア": "0.12",
      "イ": "0.35",
      "ウ": "0.47",
      "エ": "0.53",
      "オ": "0.68"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "1サイクルの正味仕事は加熱量2780 kJと放熱量1310 kJとの差である。したがって熱効率は(2780－1310)/2780≒0.53になる。",
    "choiceExplanations": {
      "ア": "熱効率は、受け取る熱のうち正味仕事に変わった割合である。受け取った2780 kJから放出した1310 kJを引き、2780 kJで割ると約0.53になる。",
      "イ": "加熱量と放熱量の差の1470 kJが正味仕事になる。正味仕事は加熱量の半分より多いので、効率0.35にはならない。",
      "ウ": "0.47は、与えられた加熱量に対する放熱量の割合である。熱効率は仕事になった割合なので、1からこの割合を引く。",
      "エ": "1サイクルの正味仕事は加熱量2780 kJと放熱量1310 kJとの差である。したがって熱効率は(2780－1310)/2780≒0.53になる。",
      "オ": "放熱量1310 kJは加熱量2780 kJの約47％である。仕事に変わるのは残りの約53％なので、効率0.68ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q37",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "機械設計",
    "topicTags": [
      "平歯車の減速比",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "回転速度1000 min⁻¹の電動機の回転を400 min⁻¹に減速して出力する歯車減速機構を設計する。電動機の軸に取り付ける駆動側歯車の歯数N₁、出力軸に取り付ける従動側歯車の歯数N₂及び両歯車の回転方向の組合せとして最も妥当なのはどれか。\nただし、両歯車とも平歯車であり、減速機構は二つの歯車のみで構成されるとする。",
    "choices": {
      "ア": "20／50／同方向",
      "イ": "20／50／逆方向",
      "ウ": "25／25／逆方向",
      "エ": "50／20／同方向",
      "オ": "50／20／逆方向"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "回転速度比は駆動側の歯数を従動側の歯数で割った値なので、20/50なら1000 min⁻¹が400 min⁻¹になる。二つの歯車が直接かみ合うため、回転方向は逆である。",
    "choiceExplanations": {
      "ア": "歯数の比20/50なら、出力は1000×20/50＝400 min⁻¹になり、減速比は合っている。直接かみ合う二つの平歯車は逆方向に回転する。",
      "イ": "回転速度比は駆動側の歯数を従動側の歯数で割った値なので、20/50なら1000 min⁻¹が400 min⁻¹になる。二つの歯車が直接かみ合うため、回転方向は逆である。",
      "ウ": "回転方向は逆になるが、両方の歯数が等しいと回転速度の大きさは変わらない。400 min⁻¹にするには従動側の歯数を大きくする。",
      "エ": "駆動側50歯、従動側20歯では出力が2.5倍に増速する。直接かみ合う平歯車では回転方向も同方向にはならない。",
      "オ": "二つの歯車は逆方向に回転するが、この歯数の比では回転速度は2.5倍になる。減速するには、駆動側より従動側の歯数を多くする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q38",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "炭素繊維強化プラスチック",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "CFRP（炭素繊維強化プラスチック）に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「CFRPは［㋐］と比べ［㋑］が高い性質をもつ材料である。強度以外の性質も踏まえ、最近では［㋒］に広く利用されている。」",
    "choices": {
      "ア": "圧縮強度／引張強度／高圧ガスのタンク",
      "イ": "圧縮強度／引張強度／鉄道車両の台車",
      "ウ": "引張強度／圧縮強度／航空機の翼",
      "エ": "曲げ強度／圧縮強度／自動車の外板",
      "オ": "曲げ強度／圧縮強度／家電製品の筐体"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "CFRPは繊維方向に高い引張強度を得やすく、圧縮では繊維の微小な座屈などの影響を受ける。軽量で高い引張強度を生かし、圧力で周方向に引張応力が生じる高圧ガスのタンクに利用される。",
    "choiceExplanations": {
      "ア": "CFRPは繊維方向に高い引張強度を得やすく、圧縮では繊維の微小な座屈などの影響を受ける。軽量で高い引張強度を生かし、圧力で周方向に引張応力が生じる高圧ガスのタンクに利用される。",
      "イ": "繊維方向の引張強度が圧縮強度を上回りやすいという点は合っている。高圧ガスのタンクは、軽さと引張強度を生かす広く知られた用途である。",
      "ウ": "航空機の翼にもCFRPは利用されるが、引張強度と圧縮強度の関係が逆になっている。繊維方向では圧縮時に座屈などが起こり、引張強度の方が高いことが多い。",
      "エ": "自動車部品への適用例はあるが、CFRPの代表的な特徴として問われているのは高い引張強度である。繊維方向では圧縮より引張の方が高い強度を得やすい。",
      "オ": "CFRPの圧縮特性は繊維の座屈や樹脂との界面の影響を受ける。設問の組合せでは、繊維方向の引張強度と高圧ガスのタンクへの用途が適切である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q39",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "切削・鋳造・溶接・プレス加工",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "材料の加工法に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n・［㋐］は、棒材等の工作物と刃物とに相対運動を与え、工作物の不要な部分を削り取って、所要の形状や大きさに仕上げる加工法で、比較的高い工作精度が求められる精密機械部品（ピン等）の製作に用いられる。\n・［㋑］は、大きくて複雑な曲面をもつものを製作する場合に用いられ、ポンプ・圧縮機のケーシング等の製作に用いられる。\n・大型機械のフレームのような、大きいが個々の素材は単純なものを組み合わせて製作する場合には、［㋒］が用いられる。\n・［㋓］は、主に板材を一対の工具に大きな力で押し付けて加工する方法で、自動車の車体のサイドパネルのような同じ形のものを大量に速く作るのに用いられる加工法である。",
    "choices": {
      "ア": "切削／鋳造／溶接／プレス加工",
      "イ": "鋳造／切削／溶接／鍛造",
      "ウ": "切削／鋳造／鍛造／鋳造",
      "エ": "鋳造／鋳造／鍛造／プレス加工",
      "オ": "切削／切削／鍛造／鋳造"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "刃物で削るのは切削で、複雑な曲面を持つケーシングは溶融材料を型に流す鋳造で作れる。別々の部材を接合するのは溶接、金型で板を成形するのはプレス加工である。",
    "choiceExplanations": {
      "ア": "刃物で削るのは切削で、複雑な曲面を持つケーシングは溶融材料を型に流す鋳造で作れる。別々の部材を接合するのは溶接、金型で板を成形するのはプレス加工である。",
      "イ": "フレームを溶接で作る㋒は妥当である。工作物を刃物で削るのは切削であり、板を一対の工具で成形する加工はプレス加工である。",
      "ウ": "㋐と㋑は妥当である。大型フレームの部材同士を接合するのは溶接、板材を一対の工具で押し付けて大量生産するのはプレス加工である。",
      "エ": "複雑な曲面のケーシングを作る鋳造と、板材を成形するプレス加工は妥当である。刃物で不要な部分を削る㋐は切削で、個々の部材を接合する㋒は溶接である。",
      "オ": "工作物を刃物で削る㋐は妥当である。㋑のケーシングは鋳造が適し、㋓は溶融材料を使う鋳造ではなく板材を押し付けるプレス加工である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kikai-q40",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "二次元切削とすくい角",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "切削工具に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図は、二次元切削の様子を模式的に表したものである。図中の切削工具において、切り屑と接触している面が工作物の垂直面となす角度を［㋐］と呼び、［㋐］を大きくし、刃先を鋭利にするほど、切り屑は［㋑］なる。また、切削速度を［㋒］するほど、切り屑は厚くなる。」",
    "choices": {
      "ア": "せん断角／厚く／速く",
      "イ": "逃げ角／厚く／速く",
      "ウ": "逃げ角／薄く／遅く",
      "エ": "すくい角／薄く／遅く",
      "オ": "すくい角／厚く／速く"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "切り屑が接するすくい面と工作物の垂直面のなす角がすくい角である。この角度が大きいと切り屑は薄くなり、設問の条件では切削速度を遅くすると切り屑は厚くなる。",
    "choiceExplanations": {
      "ア": "せん断角は材料が主にせん断変形する面に関わる角度である。図の㋐は切り屑と接する工具面の角度で、すくい角に当たる。",
      "イ": "逃げ角は加工面と工具の逃げ面が接触しないよう設ける角度である。図の㋐は、切り屑が流れるすくい面と工作物の垂直面の間にある。",
      "ウ": "切り屑が薄くなることと切削速度の傾向は妥当である。図の角度は切り屑が接するすくい面を基準とするため、名称は逃げ角ではなくすくい角である。",
      "エ": "切り屑が接するすくい面と工作物の垂直面のなす角がすくい角である。この角度が大きいと切り屑は薄くなり、設問の条件では切削速度を遅くすると切り屑は厚くなる。",
      "オ": "角度の名称はすくい角で合っているが、それを大きくして刃先を鋭利にすると切り屑は薄くなる。切り屑が厚くなる側は、設問では切削速度を遅くした場合である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018478.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kikai/q40.webp"
    ],
    "imageAltTexts": [
      "切り屑、切削工具、工作物と、切り屑に接する工具面の角度㋐"
    ]
  }
];
