import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2024_SENMON_KIKAI: Question[] = [
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q21",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "直列につないだ丸棒の軸方向変形",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、材質と直径の異なる丸棒を応力が加わらないように組み合わせ、その両端に圧縮荷重Wを加えたときの縮みとして最も妥当なのはどれか。ただし、丸棒のヤング率をそれぞれE₁、E₂、直径をそれぞれd₁、d₂とし、Wを加える前の長さは共にlとする。",
    "choices": {
      "ア": "(4lW/π)[1/(d₁²E₁)＋1/(d₂²E₂)]",
      "イ": "(2lW/π)[1/(d₁²E₁)＋1/(d₂²E₂)]",
      "ウ": "(lW/π)[1/(d₁²E₁)＋1/(d₂²E₂)]",
      "エ": "[4W/(πl)][1/(d₁²E₁)＋1/(d₂²E₂)]",
      "オ": "[W/(πl)][1/(d₁²E₁)＋1/(d₂²E₂)]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "両方の棒に同じ軸力Wが伝わり、縮みは各棒についてWl/(EA)である。円断面積A＝πd²/4を代入し、二本の縮みを加えると(4lW/π)[1/(d₁²E₁)＋1/(d₂²E₂)]となる。",
    "choiceExplanations": {
      "ア": "両方の棒に同じ軸力Wが伝わり、縮みは各棒についてWl/(EA)である。円断面積A＝πd²/4を代入し、二本の縮みを加えると(4lW/π)[1/(d₁²E₁)＋1/(d₂²E₂)]となる。",
      "イ": "二本は直列に並ぶので軸力は各棒にWずつ伝わる。軸力を二分すると縮みを半分に見積もってしまう。",
      "ウ": "直径dの丸棒の断面積はπd²/4である。断面積をπd²とすると四倍大きくなるため、計算された縮みは正しい値の四分の一になる。",
      "エ": "弾性域では縮みの大きさはひずみに元の長さlを掛けたものである。長い棒ほど同じ軸応力での縮みは大きくなり、lを分母には置かない。",
      "オ": "丸棒の縮みは軸方向ひずみW/(EA)に長さlを掛ける。さらにA＝πd²/4なので、長さを分母とし係数4がないこの式では変形量を表せない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q21.webp"
    ],
    "imageAltTexts": [
      "長さlの二本の丸棒を直列につなぎ両端を荷重Wで押す。左は直径d₁、ヤング率E₁、右はd₂、E₂。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q22",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "矩形断面の断面係数と曲げ応力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のような幅3a、高さ4aの軸に垂直な矩形断面をもつ一様な棒に曲げモーメントを作用させるとき、z軸を中立軸として曲げる場合の最大曲げ応力σ_zと、同一の曲げモーメントでy軸を中立軸として曲げる場合の最大曲げ応力σ_yとの比σ_z/σ_yとして最も妥当なのはどれか。\nただし、棒の軸に垂直な断面は曲げモーメントが作用した後も棒の軸に垂直で、かつ、平面を保つものとする。",
    "choices": {
      "ア": "3/16",
      "イ": "9/16",
      "ウ": "3/4",
      "エ": "4/3",
      "オ": "16/9"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "幅b、高さhの矩形ではZ_z＝bh²/6、Z_y＝hb²/6である。σ_z/σ_y＝Z_y/Z_z＝b/hとなるので、b＝3aとh＝4aから3/4を得る。",
    "choiceExplanations": {
      "ア": "最大曲げ応力は曲げモーメントを断面係数で割ると求まる。断面係数を求めるとき、断面二次モーメントを中立軸から最外縁までの距離で割る必要がある。",
      "イ": "9/16は二つの断面二次モーメントの比である。最大応力を比較するには、それぞれの中立軸から最外縁までの距離の比も考える。",
      "ウ": "幅b、高さhの矩形ではZ_z＝bh²/6、Z_y＝hb²/6である。σ_z/σ_y＝Z_y/Z_z＝b/hとなるので、b＝3aとh＝4aから3/4を得る。",
      "エ": "4/3は断面係数Z_z/Z_yの比である。曲げ応力は断面係数に反比例するので、σ_z/σ_yはその逆数になる。",
      "オ": "16/9はI_z/I_yに相当する。応力の比では断面二次モーメントの逆比に最外縁までの距離の比を掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q22.webp"
    ],
    "imageAltTexts": [
      "幅3a、高さ4aの長方形断面。中央を通る鉛直方向にy軸、水平方向にz軸を取る。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q23",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "丸棒の単純せん断強さ",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、カッターで一様な丸棒を切断することを考える。切断する力の大きさをP、丸棒のせん断強さをτとするとき、切断可能な丸棒の直径dの最大値として最も妥当なのはどれか。",
    "choices": {
      "ア": "√[P/(πτ)]",
      "イ": "√[2P/(πτ)]",
      "ウ": "2√[P/(πτ)]",
      "エ": "P/(πτ)",
      "オ": "4P/(πτ)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "切断に必要な力がPに達する最大の断面積はP/τである。丸棒の円断面πd²/4＝P/τを解くと、d＝2√[P/(πτ)]となる。",
    "choiceExplanations": {
      "ア": "せん断強さに達するのはP/A＝τのときである。丸棒の半径は√[P/(πτ)]になるので、問題の直径はこの二倍になる。",
      "イ": "図では切断面を一面として考え、円断面積はπd²/4である。これをP/τに等しくすると、根号の中の分子には4Pが入る。",
      "ウ": "切断に必要な力がPに達する最大の断面積はP/τである。丸棒の円断面πd²/4＝P/τを解くと、d＝2√[P/(πτ)]となる。",
      "エ": "P/τは力を応力で割った値なので面積の次元を持つ。直径を求めるには円断面積の式を使い、平方根を取る。",
      "オ": "4P/(πτ)は条件を満たす直径の二乗である。選択肢の値から平方根を取った長さが、最大直径になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q23.webp"
    ],
    "imageAltTexts": [
      "下刃と上刃の間に直径dの丸棒を置き、上刃から丸棒に切断力Pを加える。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q24",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "クランクによるねじりと最大せん断応力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、中実丸棒の手回しのクランクがある。図のAの部分におけるねじりによって生じる最大せん断応力を100 MPaとするために必要となるハンドルを回す力の大きさとして最も妥当なのはどれか。\nただし、直径dの中実丸棒がねじりモーメントTでねじられる場合、丸棒に生じる最大せん断応力τ_maxはτ_max＝16T/(πd³)で与えられる。",
    "choices": {
      "ア": "15 N",
      "イ": "100 N",
      "ウ": "150 N",
      "エ": "300 N",
      "オ": "450 N"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "d＝10 mmとτ_max＝100 N/mm²を代入するとT＝100π×10³/16≃19635 N·mmである。力の腕は130 mmなので、必要な力はT/130≃151 Nである。",
    "choiceExplanations": {
      "ア": "ねじりモーメントはおよそ19600 N·mm必要である。作用線までの距離130 mmで割ると約150 Nとなり、15 Nではその十分の一の応力しか生じない。",
      "イ": "100 MPaはせん断応力であり、ハンドルに加える力にはねじりモーメントと腕の長さから換算する。100 Nで生じるTは13000 N·mmで、必要な値に足りない。",
      "ウ": "d＝10 mmとτ_max＝100 N/mm²を代入するとT＝100π×10³/16≃19635 N·mmである。力の腕は130 mmなので、必要な力はT/130≃151 Nである。",
      "エ": "300 Nを腕の距離130 mmに加えると、ねじりモーメントは39000 N·mmになる。必要なモーメント19635 N·mmのおよそ二倍である。",
      "オ": "450 Nを加えるとねじりモーメントは58500 N·mmになり、所定の応力を生む値より大きい。直径10 mmの軸に必要な力は約150 Nである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q24.webp"
    ],
    "imageAltTexts": [
      "直径10 mmの軸とクランクハンドルの軸間距離130 mm。軸のA部と回転方向が示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q25",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "振動工学",
    "topicTags": [
      "ばね支持倒立振子の微小振動",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、一様な断面をもつ軽い剛体棒の点Oから距離lの位置に質量mのおもりを取り付け、点Oを支点として回転する倒立振子がある。この振子は、点Oから高さhの位置で、ばね定数k/2の軽いばねを介して壁に接続されている。この振子が微小振動する際の固有角振動数として最も妥当なのはどれか。\nただし、剛体棒の傾き角θは十分に小さく、ばねの力は常に水平方向に作用するものとする。また、摩擦は無視するものとし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "√[(kh²−mgl)/(4ml²)]",
      "イ": "√[(kh²−mgl)/(ml²)]",
      "ウ": "√[(kh²−mg)/(ml²)]",
      "エ": "√[(kh²＋mgl)/(ml²)]",
      "オ": "√[(kh²＋2mgl)/(ml²)]"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二本のばねの合力による復元モーメントは小角で−kh²θ、倒立したおもりに働く重力のモーメントは＋mglθである。慣性モーメントml²で割ると、微小振動が成立するkh²＞mglのとき角振動数は√[(kh²−mgl)/(ml²)]となる。",
    "choiceExplanations": {
      "ア": "ばねの復元モーメントと重力のモーメントの差は使えている。慣性モーメントは質点の支点からの距離lを使ったml²であり、係数4は付かない。",
      "イ": "二本のばねの合力による復元モーメントは小角で−kh²θ、倒立したおもりに働く重力のモーメントは＋mglθである。慣性モーメントml²で割ると、微小振動が成立するkh²＞mglのとき角振動数は√[(kh²−mgl)/(ml²)]となる。",
      "ウ": "mgは重力の大きさであり、ばね側のkh²は角度当たりのモーメントの係数である。重力にもおもりの距離lを掛けてモーメントを求める。",
      "エ": "倒立した質点に働く重力は、棒を直立に戻す向きではなく傾きを増やす向きに作用する。ばねの復元効果から重力の項mglを差し引く。",
      "オ": "おもりは一つで、その重力によるモーメントの係数はmglである。重力は直立位置を不安定にするため、ばねの復元モーメントに足し合わせない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q25.webp"
    ],
    "imageAltTexts": [
      "支点Oに立てた棒の高さlに質量mのおもり、高さhにばね定数k/2の水平ばねが左右一本ずつつく。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q26",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "一次元衝突の運動量保存と反発係数",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな水平面上をx軸方向に9.00 m/sの速さで移動している質量10.00 kgの小球Aが、x軸方向に8.00 m/sの速さで移動している質量5.00 kgの小球Bに衝突した。衝突後もAとBはx軸方向に移動し、AとBの間の反発係数が0.55であったとき、衝突後のAの速さV_AとBの速さV_Bの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "V_A：4.94 m/s、V_B：7.45 m/s",
      "イ": "V_A：5.75 m/s、V_B：7.78 m/s",
      "ウ": "V_A：5.75 m/s、V_B：7.87 m/s",
      "エ": "V_A：8.48 m/s、V_B：9.03 m/s",
      "オ": "V_A：8.56 m/s、V_B：8.75 m/s"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "運動量保存から10V_A＋5V_B＝130である。反発係数からV_B−V_A＝0.55(9.00−8.00)＝0.55なので、連立するとV_A≃8.48 m/s、V_B≃9.03 m/sとなる。",
    "choiceExplanations": {
      "ア": "衝突前の全運動量は10×9＋5×8＝130 kg·m/sである。この組合せの運動量は約86.7 kg·m/sしかなく、保存されていない。",
      "イ": "衝突後に二球が離れる速さは、衝突前の近づく速さ1.00 m/sに反発係数0.55を掛けた0.55 m/sである。与えられた速度差2.03 m/sは大きすぎる。",
      "ウ": "外部から水平方向の衝撃を受けないので、全運動量は130 kg·m/sに保たれる。組合せの運動量は約96.9 kg·m/sで、反発後の速度差も0.55 m/sにはならない。",
      "エ": "運動量保存から10V_A＋5V_B＝130である。反発係数からV_B−V_A＝0.55(9.00−8.00)＝0.55なので、連立するとV_A≃8.48 m/s、V_B≃9.03 m/sとなる。",
      "オ": "この組合せは全運動量が約129.4 kg·m/sであるが、衝突後の相対速度は0.19 m/sしかない。反発係数0.55なら、衝突後の相対速度は0.55 m/sとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q26.webp"
    ],
    "imageAltTexts": [
      "滑らかな水平面でAは10.00 kg・9.00 m/s、Bは5.00 kg・8.00 m/sで、同じx軸正方向へ進む。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q27",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "落下物によるばねの最大圧縮と床への力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、質量mの小物体を、ばね定数kの軽いばねばかりの初期位置からの高さがhとなる位置から、初速度V₀でばねばかりの上に落とした。このとき、ばねの最大圧縮量λと最大圧縮時にばねが床を押す力の大きさPの組合せとして最も妥当なのはどれか。\nただし、運動は全て鉛直線上で起こるものとし、小物体とばねばかりが衝突した後は一体となって運動するものとする。また、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "λ：√(m²g²＋2mghk＋mkV₀²)/k、P：√(m²g²＋2mghk＋mkV₀²)",
      "イ": "λ：√[m(V₀²＋2gh)/k]、P：√[mk(V₀²＋2gh)]",
      "ウ": "λ：mg＋√(m²g²＋2mghk＋mkV₀²)、P：[mg＋√(m²g²＋2mghk＋mkV₀²)]/k",
      "エ": "λ：[mg＋√(m²g²＋2mghk＋mkV₀²)]/k、P：mg＋√(m²g²＋2mghk＋mkV₀²)",
      "オ": "λ：[mg＋√(mg＋2mghk＋mkV₀²)]/k、P：mg＋√(mg＋2mghk＋mkV₀²)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最大圧縮では速度が0なので、kλ²/2＝mV₀²/2＋mg(h＋λ)である。二次方程式の正の解を取るとλ＝[mg＋√(m²g²＋2mghk＋mkV₀²)]/kで、床を押す力はP＝kλとなる。",
    "choiceExplanations": {
      "ア": "圧縮が進む間にも物体は重力で仕事を受ける。圧縮量の式では、平方根で表される項にmg/kを加えた正の解を使う。",
      "イ": "この組合せでは、ばねに接触するまでのエネルギーだけがばねのエネルギーになる。圧縮する距離λについても重力がmgλの仕事をするため、その分を加える必要がある。",
      "ウ": "mgと平方根を加えた式は力の次元を持つ。これをばね定数kで割ると変位になるので、候補では変位と力が逆である。",
      "エ": "最大圧縮では速度が0なので、kλ²/2＝mV₀²/2＋mg(h＋λ)である。二次方程式の正の解を取るとλ＝[mg＋√(m²g²＋2mghk＋mkV₀²)]/kで、床を押す力はP＝kλとなる。",
      "オ": "圧縮量の二次方程式の一次項にmgがある。解の平方根の中は力の二乗でそろえる必要があり、単独のmgにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q27.webp"
    ],
    "imageAltTexts": [
      "小物体mが初速度V₀で下向きに落ち、初期位置から高さh下の、ばね定数kの軽いばねばかりに当たる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q28",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "一様な球の慣性モーメント",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "半径R、密度ρの一様な球の中心を通る任意の軸まわりの慣性モーメントIとして最も妥当なのはどれか。ただし、半径r、質量mの一様な円板の中心軸まわりの慣性モーメントをmr²/2とする。",
    "choices": {
      "ア": "2ρπR²/5",
      "イ": "2ρπR⁵/5",
      "ウ": "8ρπR²/15",
      "エ": "8ρπR⁴/15",
      "オ": "8ρπR⁵/15"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "軸方向の位置zにある薄い円板の半径は√(R²−z²)なので、慣性モーメントの寄与は(ρπ/2)(R²−z²)²dzである。−RからRまで積分すると8ρπR⁵/15となる。",
    "choiceExplanations": {
      "ア": "球の質量は密度と体積の積でρR³に比例する。慣性モーメントはさらに距離の二乗に比例するので、密度を使った式ではR⁵が必要になる。",
      "イ": "一様な球の中心軸まわりの慣性モーメントはMR²の2/5である。質量Mには球の体積4πR³/3を掛けた値を使うため、係数は8/15となる。",
      "ウ": "係数8/15は妥当であるが、密度ρにR²を掛けた量では質量×長さの二乗の次元にならない。密度に体積に対応するR³も掛ける必要がある。",
      "エ": "密度から慣性モーメントを求める式には、体積に対応する長さの三乗と慣性の距離の二乗が入る。合わせてRの五乗に比例する。",
      "オ": "軸方向の位置zにある薄い円板の半径は√(R²−z²)なので、慣性モーメントの寄与は(ρπ/2)(R²−z²)²dzである。−RからRまで積分すると8ρπR⁵/15となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q29",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "レイノルズ数と密度の単位換算",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "1 L当たりの質量がm [kg]、粘性係数がμ [Pa·s]の流体が内径d [m]の円管内を流速U [m/s]で流れている。円管の内径を代表長さとした場合のレイノルズ数として最も妥当なのはどれか。",
    "choices": {
      "ア": "(mU²d/μ)×10⁶",
      "イ": "(mUd/μ)×10⁶",
      "ウ": "[mU²d/(2μ)]×10³",
      "エ": "(mUd/μ)×10³",
      "オ": "[mUd²/(4μ)]×10³"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "1 m³は1000 Lなので、密度はρ＝10³m kg/m³である。内径を代表長さとするレイノルズ数はρUd/μなので、(mUd/μ)×10³になる。",
    "choiceExplanations": {
      "ア": "レイノルズ数の式で代表速度Uは一乗である。また1 m³は1000 Lなので、質量をm³当たりに直す係数は10³になる。",
      "イ": "流速Uと内径dの組合せは妥当である。体積の換算では1 L＝10⁻³ m³なので、密度はmの1000倍になる。",
      "ウ": "密度換算の10³は妥当である。慣性と粘性の比から得るレイノルズ数では、流速は二乗ではなく一乗で、係数1/2は入らない。",
      "エ": "1 m³は1000 Lなので、密度はρ＝10³m kg/m³である。内径を代表長さとするレイノルズ数はρUd/μなので、(mUd/μ)×10³になる。",
      "オ": "レイノルズ数の代表長さは設問で内径dと指定されている。d²は面積の次元で、式に代入するとレイノルズ数が無次元にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q30",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "タンクからの水平噴流と反力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、密度ρの非圧縮かつ非粘性の流体がタンクの底から高さHまで入っており、タンクの底からの高さhの位置に設けられた断面積Aの細管より水平方向に噴出している。このとき、噴流によってタンクに作用する反力の大きさとして最も妥当なのはどれか。\nただし、液体の体積に対し流出する流量は十分小さく、流れは定常として扱い、液面の流速は0（ゼロ）とみなす。また、液面と噴流には大気圧が作用するものとし、重力加速度の大きさはgとする。",
    "choices": {
      "ア": "2ρg(H＋h)A",
      "イ": "√[2ρg(H−h)A]",
      "ウ": "2ρg(H−h)A",
      "エ": "√[2ρg(H−h)A/h]",
      "オ": "2ρgH(H−h)A/h"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ベルヌーイの式から出口速度は√[2g(H−h)]である。噴流の水平な運動量流量ρAv²が反力の大きさに等しいので、2ρg(H−h)Aとなる。",
    "choiceExplanations": {
      "ア": "噴流に使われる水頭は液面と出口の高さの差H−hである。出口を液面に近づけるほど反力が小さくなるはずなので、H＋hの式は合わない。",
      "イ": "噴流の運動量流量は、単位時間に流れ出る質量ρAvと流速vの積である。項2ρg(H−h)Aはその力を表しており、さらに平方根を取る必要はない。",
      "ウ": "ベルヌーイの式から出口速度は√[2g(H−h)]である。噴流の水平な運動量流量ρAv²が反力の大きさに等しいので、2ρg(H−h)Aとなる。",
      "エ": "水頭から速度を求める段階で平方根を使うが、反力は質量流量と速度の積になる。出口の高さhだけで割る項は生じない。",
      "オ": "反力は液面から出口までの水頭H−hに比例する。余分なH/hの係数は現れず、出口を底近くに動かしても反力が無限に大きくなることはない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q30.webp"
    ],
    "imageAltTexts": [
      "液体の深さH、底から出口までの高さh、出口面積Aのタンク。液体が水平方向へ噴き出す。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q31",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "円管内の放物型速度分布と壁面せん断応力",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "図のように、内径1.0 mの円管内を粘性係数1.0 Pa·sのニュートン流体が定常的に流れている。円管の軸方向と垂直となる断面における速度分布は、二次関数の分布となっており、流速の最大速度u_maxは円管の中心で1.0 m/sであった。このとき、この断面の壁面が流体から受けるせん断応力の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1.0 Pa",
      "イ": "2.0 Pa",
      "ウ": "4.0 Pa",
      "エ": "8.0 Pa",
      "オ": "16 Pa"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "速度分布はu＝u_max[1−(r/R)²]で、壁面r＝Rでは速度勾配の大きさが2u_max/Rである。R＝0.50 m、μ＝1.0 Pa·sを代入すると壁面せん断応力は4.0 Paになる。",
    "choiceExplanations": {
      "ア": "壁面のせん断応力は粘性係数と速度勾配の積である。速度勾配を求めるには、放物形の流速を壁面で半径方向に微分する。",
      "イ": "最大速度1.0 m/sを半径0.50 mで割ると2.0 s⁻¹になるが、これは中心と壁面の間の平均的な勾配である。放物形の分布の壁面勾配はこの二倍になる。",
      "ウ": "速度分布はu＝u_max[1−(r/R)²]で、壁面r＝Rでは速度勾配の大きさが2u_max/Rである。R＝0.50 m、μ＝1.0 Pa·sを代入すると壁面せん断応力は4.0 Paになる。",
      "エ": "放物形を微分すると壁面の勾配の大きさは2u_max/Rである。係数2を重ねて掛ける必要はなく、R＝0.50 mで結果は4.0 Paになる。",
      "オ": "管の半径0.50 mで無次元化した速度分布を微分すると、壁面の勾配は4.0 s⁻¹となる。粘性係数1.0 Pa·sを掛けても、この勾配と同じ数値の4.0 Paである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q31.webp"
    ],
    "imageAltTexts": [
      "内径1.0 mの管内の放物型速度分布。中心で速度が最大の1.0 m/s、壁面に近づくと0になる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q32",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "ピトー管と液柱マノメータ",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "断面積が滑らかに変化する異径管内に、密度ρ₁の流体による準一次元定常流れが形成されており、断面積がA₁である地点Pにおける流速はv₁である。図のように、断面積がA₂である地点Qの管路において流れに平行に設置された細管と、流れに垂直に異径管壁面に設置された細管がU字管に接続されている。U字管に封入されている流体の密度がρ₂であるとき、この流体に生じる液面差hとして最も妥当なのはどれか。\nただし、異径管内を流れる流体は非圧縮かつ非粘性である。また、ρ₂はρ₁より十分大きいものとし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "(1/2)[ρ₁/(ρ₂g)](A₁/A₂)²v₁²",
      "イ": "(1/2)[ρ₂/(ρ₁g)](A₂/A₁)²v₁²",
      "ウ": "(1/2)√[ρ₂/(ρ₁g)](A₂/A₁)²v₁²",
      "エ": "√[ρ₂/(ρ₁g)](A₂/A₁)²v₁²",
      "オ": "√[ρ₁/(ρ₂g)](A₁/A₂)²v₁²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "連続の式からQの流速はv₁A₁/A₂で、全圧と静圧の差はρ₁v₁²(A₁/A₂)²/2である。マノメータの圧力差は(ρ₂−ρ₁)gh≃ρ₂ghなので、これらを等置すると候補のhを得る。",
    "choiceExplanations": {
      "ア": "連続の式からQの流速はv₁A₁/A₂で、全圧と静圧の差はρ₁v₁²(A₁/A₂)²/2である。マノメータの圧力差は(ρ₂−ρ₁)gh≃ρ₂ghなので、これらを等置すると候補のhを得る。",
      "イ": "流体の速度は断面積に反比例するため、Qの流速はA₁/A₂を掛ける。重いマノメータ液ほど同じ圧力差でのhは小さくなるので、密度比も逆である。",
      "ウ": "管内流体の動圧は速度の二乗に比例し、液柱が示す差圧は高さhに比例する。平方根は必要なく、Qの速度は断面積の比A₁/A₂を用いる。",
      "エ": "Qで測る差圧は管内流体の動圧で、液面差はそれをマノメータ液の単位体積重量で割って求める。平方根を使った式では高さの次元にもならない。",
      "オ": "面積比と密度の順は妥当である。差圧と液面差は一次の関係にあるため、密度比とgの項に平方根を取ることはなく、動圧には1/2が付く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q32.webp"
    ],
    "imageAltTexts": [
      "面積A₁の場所Pから面積A₂の狭い場所Qへ流れる異径管。Qの全圧と壁面静圧を密度ρ₂の液体を入れたU字管で比べ、液面差hを測る。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q33",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "密閉ピストンの定圧変化と第一法則",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "周囲から断熱された状態で、断面積が0.05 m²の滑らかに動く軽いピストンの付いたシリンダに理想気体が封入されている。周囲の圧力が0.1 MPaであるとき、冷却器を用いてシリンダ内の理想気体から2.0 kJの熱量を放出させて可逆的に定圧変化させたところ、ピストンが移動し、理想気体の内部エネルギーが0.5 kJ減少した。このとき、ピストンが移動する距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.02 m",
      "イ": "0.03 m",
      "ウ": "0.1 m",
      "エ": "0.2 m",
      "オ": "0.3 m"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "気体が外部にする仕事をWとすれば、ΔU＝Q−Wから−0.5＝−2.0−Wとなり、W＝−1.5 kJである。ピストンを内側へ押す仕事が1500 Jなので、距離は1500/(100000×0.05)＝0.3 mである。",
    "choiceExplanations": {
      "ア": "熱力学第一法則から、冷却中に外部が気体にした仕事は1.5 kJである。0.02 mでは圧力と断面積から計算した仕事が0.1 kJにしかならない。",
      "イ": "外圧0.1 MPaと断面積0.05 m²の積は5000 Nなので、仕事は移動距離0.03 mで0.15 kJとなる。内部エネルギーの変化と放熱量に必要な1.5 kJに足りない。",
      "ウ": "0.1 mは内部エネルギーの減少0.5 kJをそのまま仕事として割った値である。圧縮仕事は放出した熱2.0 kJのうち内部エネルギーの減少で賄われない1.5 kJに当たる。",
      "エ": "0.2 mの移動に相当する仕事は5000 N×0.2 m＝1.0 kJである。外部からの仕事は放出熱と内部エネルギーの減少の差1.5 kJ必要である。",
      "オ": "気体が外部にする仕事をWとすれば、ΔU＝Q−Wから−0.5＝−2.0−Wとなり、W＝−1.5 kJである。ピストンを内側へ押す仕事が1500 Jなので、距離は1500/(100000×0.05)＝0.3 mである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q34",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "物体と熱浴のエントロピー変化",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "熱移動におけるエントロピーの変化に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n比熱が0.45 kJ/(kg·K)、質量が100 kg、温度が560 Kの鉄球を、温度が280 Kの湖に全体が浸かるように沈め、鉄球の温度が280 Kとなったとき、鉄球のエントロピーは減少し、湖のエントロピーは㋐。鉄球と湖を合わせた系のエントロピーは㋑。ただし、熱量の移動にかかわらず、湖の温度は一定とし、ln 2＝0.693とする。",
    "choices": {
      "ア": "㋐：増大する、㋑：増大する",
      "イ": "㋐：増大する、㋑：変化しない",
      "ウ": "㋐：変化しない、㋑：増大する",
      "エ": "㋐：変化しない、㋑：変化しない",
      "オ": "㋐：変化しない、㋑：減少する"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "湖は鉄球の放出熱12600 kJを280 Kで受け取るため、エントロピーが45 kJ/K増える。鉄球の変化は45 ln(280/560)≃−31.2 kJ/Kなので、合計は約13.8 kJ/K増加する。",
    "choiceExplanations": {
      "ア": "湖は鉄球の放出熱12600 kJを280 Kで受け取るため、エントロピーが45 kJ/K増える。鉄球の変化は45 ln(280/560)≃−31.2 kJ/Kなので、合計は約13.8 kJ/K増加する。",
      "イ": "湖の増加は妥当である。高温の鉄球から低温の湖への不可逆な熱移動では全体のエントロピーが増加し、数値でも約13.8 kJ/Kとなる。",
      "ウ": "合計が増大する点は妥当である。湖は温度一定の熱浴だが、熱を受け取ることで熱量を280 Kで割った分だけエントロピーが増える。",
      "エ": "温度が一定でも、熱浴は熱を受け取るためエントロピーが増える。全体のエネルギーは保存されるが、不可逆な熱移動でエントロピーは増大する。",
      "オ": "鉄球のエントロピーは減少するが、湖の増加の方が大きい。有限の温度差のもとで熱が移動するため、合計は約13.8 kJ/K増える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q35",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "オットーサイクルの熱効率",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "オットーサイクルに関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\nガソリン機関やガス機関などの火花点火機関の理論サイクルであるオットーサイクルは、図のようなp–v線図に示される、可逆過程で構成されている。1の状態の温度がT₁、2の状態の温度がT₂、3の状態の温度がT₃、4の状態の温度がT₄である場合、1の状態の比体積をv₁、2の状態の比体積をv₂として、圧縮比はε＝v₁/v₂と表され、εと比熱比κを用いると、理論熱効率η_thは㋐となる。また、温度のみを用いて表すと、η_th＝㋑となる。\nただし、圧力をp、体積をVとすると、このサイクルの断熱過程ではpV^κ＝一定が成り立つとする。",
    "choices": {
      "ア": "㋐：1−1/ε^(κ−1)、㋑：1−T₁/T₂",
      "イ": "㋐：1−1/ε^(κ−1)、㋑：1−T₁/T₃",
      "ウ": "㋐：1−ε^κ、㋑：1−T₁/T₂",
      "エ": "㋐：1−1/ε^κ、㋑：1−T₁/T₂",
      "オ": "㋐：1−1/ε^κ、㋑：1−T₁/T₃"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "熱効率は定積の吸熱と放熱を使って1−(T₄−T₁)/(T₃−T₂)と表せる。断熱関係よりT₁/T₂＝T₄/T₃＝1/ε^(κ−1)なので、効率は1−1/ε^(κ−1)＝1−T₁/T₂となる。",
    "choiceExplanations": {
      "ア": "熱効率は定積の吸熱と放熱を使って1−(T₄−T₁)/(T₃−T₂)と表せる。断熱関係よりT₁/T₂＝T₄/T₃＝1/ε^(κ−1)なので、効率は1−1/ε^(κ−1)＝1−T₁/T₂となる。",
      "イ": "圧縮比を使った式は妥当である。T₃は定積加熱後の温度で、断熱圧縮の温度比を表すには圧縮前のT₁と圧縮後のT₂を使う。",
      "ウ": "温度比を使った式は妥当である。圧縮比が1より大きいとε^κは1を超えるため、この圧縮比の式では熱効率が負になってしまう。",
      "エ": "1−T₁/T₂は妥当である。断熱関係pV^κ＝一定に理想気体の状態方程式を組み合わせるとTV^(κ−1)が一定であり、圧縮比の指数はκ−1となる。",
      "オ": "圧縮比の指数は断熱過程の温度と体積の関係からκ−1となる。温度比の比較には断熱圧縮の端点である1と2を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q35.webp"
    ],
    "imageAltTexts": [
      "p–v線図の1→2が断熱圧縮、2→3が定積加熱、3→4が断熱膨張、4→1が定積冷却。1、4の比体積はv₁、2、3はv₂。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q36",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "理想気体の準静的な等温膨張",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "27℃の理想気体を、滑らかに動く軽いピストンの付いたシリンダに封入し、11.4 kJの熱量を加えて準静的に等温膨張させたところ、圧力が5.0気圧から0.5気圧に変化した。このとき、シリンダ内の理想気体の物質量として最も妥当なのはどれか。ただし、一般気体定数を8.3 J/(mol·K)、ln 10＝2.3とする。",
    "choices": {
      "ア": "0.5 mol",
      "イ": "1.0 mol",
      "ウ": "2.0 mol",
      "エ": "3.0 mol",
      "オ": "5.0 mol"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "等温なので体積比は圧力の逆比5.0/0.5＝10で、吸熱量は仕事nRT ln 10に等しい。n＝11400/(8.3×300×2.3)≃2.0 molとなる。",
    "choiceExplanations": {
      "ア": "絶対温度300 K、体積比10の等温膨張では、1 mol当たりの仕事は約5.7 kJである。0.5 molでは必要な熱量11.4 kJのほぼ4分の1にしかならない。",
      "イ": "等温変化だから内部エネルギーは一定で、仕事は加えた熱に等しい。1.0 molがこの変化で行う仕事は約5.7 kJなので、必要な物質量はその二倍である。",
      "ウ": "等温なので体積比は圧力の逆比5.0/0.5＝10で、吸熱量は仕事nRT ln 10に等しい。n＝11400/(8.3×300×2.3)≃2.0 molとなる。",
      "エ": "体積が10倍になるときの仕事は1 mol当たり約5.7 kJである。3.0 molでは約17.2 kJとなり、加えた熱量より大きい。",
      "オ": "等温膨張の仕事では最初の圧力の値そのものではなく、体積比の対数を使う。熱量11400 JをRT ln 10で割ると、物質量は約2.0 molになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q37",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "機械要素",
    "topicTags": [
      "平歯車の軸間距離と速度伝達比",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "平歯車1（歯数16）と平歯車2（歯数32）が正しく噛み合っている。それぞれの歯車のモジュールが1.0 mmであるとき、軸間距離Cと速度伝達比iの組合せとして最も妥当なのはどれか。ただし、平歯車1は駆動歯車であり、平歯車2が被動歯車であるものとする。",
    "choices": {
      "ア": "C：16 mm、i：1.5",
      "イ": "C：16 mm、i：2.0",
      "ウ": "C：24 mm、i：1.5",
      "エ": "C：24 mm、i：2.0",
      "オ": "C：32 mm、i：2.0"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ピッチ円直径はモジュールと歯数の積なので16 mmと32 mmである。軸間距離は半径の和8＋16＝24 mm、駆動側の回転速度を被動側で割った速度伝達比は32/16＝2.0となる。",
    "choiceExplanations": {
      "ア": "16 mmは駆動歯車のピッチ円直径である。軸間距離は二つのピッチ円半径の和で、速度伝達比は被動側と駆動側の歯数の比32/16となる。",
      "イ": "速度伝達比2.0は妥当である。各ピッチ円半径8 mmと16 mmを足すので、軸間距離は24 mmとなる。",
      "ウ": "軸間距離は妥当である。ピッチ円上の周速度が共通なので、駆動側の回転速度を被動側で割った比は歯数の逆向きの比32/16＝2.0になる。",
      "エ": "ピッチ円直径はモジュールと歯数の積なので16 mmと32 mmである。軸間距離は半径の和8＋16＝24 mm、駆動側の回転速度を被動側で割った速度伝達比は32/16＝2.0となる。",
      "オ": "速度伝達比は妥当である。32 mmは被動歯車のピッチ円の直径なので、軸間距離には両歯車のピッチ円半径を足した24 mmを用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q38",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "ダイカスト、融接、スパッタリング",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "材料の加工法に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n㋐は、軽合金などの金属の溶湯を金型に高速高圧で鋳込む鋳造法であり、寸法精度が高く高強度となるが、低融点金属にしか用いることができない。\n㋑は、被溶接材料の接合面を溶融凝固させて接合する溶接法であり、水密性、気密性に優れるが、残留応力が発生しやすい。\n㋒は、表面処理として行われる物理蒸着法の一つであり、合金の蒸着を行いやすくするものであるが、複雑形状の表面には成膜しにくい。",
    "choices": {
      "ア": "㋐：遠心鋳造、㋑：ろう接、㋒：静電塗装",
      "イ": "㋐：遠心鋳造、㋑：融接、㋒：静電塗装",
      "ウ": "㋐：ダイカスト、㋑：ろう接、㋒：スパッタリング",
      "エ": "㋐：ダイカスト、㋑：融接、㋒：静電塗装",
      "オ": "㋐：ダイカスト、㋑：融接、㋒：スパッタリング"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "溶湯の高速・高圧注入はダイカストで、接合部を溶かす方法は融接である。ターゲットの構成原子を弾き出して基板上に膜を形成するスパッタリングは物理蒸着に当たる。",
    "choiceExplanations": {
      "ア": "回転する型の遠心力を用いる遠心鋳造に対し、溶湯を金型に高速・高圧で注入するのはダイカストである。母材自体を溶かす接合は融接で、物理蒸着法はスパッタリングである。",
      "イ": "㋑は妥当である。㋐は高速・高圧で注入するダイカスト、㋒はターゲットから原子を飛ばして膜をつくるスパッタリングである。",
      "ウ": "㋐と㋒は妥当である。ろう接では通常、母材は溶かさず溶けたろう材で接合するため、母材を溶融・凝固させる㋑は融接である。",
      "エ": "㋐と㋑は妥当である。静電塗装は帯電した塗料を引き寄せる方法で、物理蒸着で薄膜をつくる㋒にはスパッタリングが入る。",
      "オ": "溶湯の高速・高圧注入はダイカストで、接合部を溶かす方法は融接である。ターゲットの構成原子を弾き出して基板上に膜を形成するスパッタリングは物理蒸着に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q39",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "ブリネル、ロックウェル、ビッカース硬さ",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "硬さ試験に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n㋐硬さは、鋼球圧子を試験面に押し付けたときに生じたくぼみの表面積で荷重を割った値である。\n㋑硬さ試験では、ダイヤモンドコーン、あるいは鋼球を用いる。基準荷重をかけてくぼみを作り、その後試験荷重をかける。基準荷重と試験荷重のくぼみ深さの差が㋑硬さとなる。硬い材料の測定のときにはダイヤモンドコーンを用い、プラスチックなどの軟らかい材料には、鋼球を用いる。\n㋒硬さは、圧子としてダイヤモンドを使用し、生じたくぼみの表面積で荷重を割った値である。硬い材料の測定が可能であり、荷重を小さくした試験機では、箔などの薄い試料やめっき層などの表面層の測定ができる。",
    "choices": {
      "ア": "㋐：ショア、㋑：ブリネル、㋒：ビッカース",
      "イ": "㋐：ショア、㋑：ロックウェル、㋒：ブリネル",
      "ウ": "㋐：ビッカース、㋑：ロックウェル、㋒：ブリネル",
      "エ": "㋐：ブリネル、㋑：ショア、㋒：ビッカース",
      "オ": "㋐：ブリネル、㋑：ロックウェル、㋒：ビッカース"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "球圧子のくぼみの面積を使う㋐はブリネル硬さである。ロックウェル硬さは基準荷重を基にした押込み深さの差を使い、ビッカース硬さはダイヤモンド四角すいによるくぼみの面積を使う。",
    "choiceExplanations": {
      "ア": "ビッカースを使う㋒は妥当である。球の圧痕の面積を用いる㋐はブリネルで、押込み深さの差を用いる㋑はロックウェルである。",
      "イ": "㋑はロックウェルで妥当である。ショア硬さは一般におもりの反発を用い、球圧子のくぼみで測るのはブリネルで、ダイヤモンド圧子の圧痕面積を使うのはビッカースである。",
      "ウ": "㋑は妥当である。㋐は球でくぼみをつくるブリネル、㋒はダイヤモンド四角すいのくぼみを使うビッカースで、二つの方法の順序が逆である。",
      "エ": "㋐と㋒は妥当である。圧子を押し込んだ深さの差を使うのはロックウェルであり、ショア硬さの反発の測定とは異なる。",
      "オ": "球圧子のくぼみの面積を使う㋐はブリネル硬さである。ロックウェル硬さは基準荷重を基にした押込み深さの差を使い、ビッカース硬さはダイヤモンド四角すいによるくぼみの面積を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kikai-q40",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kikai",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "測定",
    "topicTags": [
      "マイクロメータのスリーブとシンブルの読取り",
      "機械区分"
    ],
    "difficulty": 3,
    "question": "ねじのピッチが0.5 mm、シンブルの円筒目盛が50等分のマイクロメータを用いて物体を測定したところ、スリーブ部の目盛とシンブル部の目盛の関係が図のようになった。このときの測定値として最も妥当なのはどれか。",
    "choices": {
      "ア": "13.24 mm",
      "イ": "13.74 mm",
      "ウ": "16.24 mm",
      "エ": "24.13 mm",
      "オ": "24.17 mm"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "スリーブは13 mmの目盛まで読め、13.5 mmの線はまだ現れていない。シンブルは1目盛が0.5/50＝0.01 mmで24目盛なので、13＋0.24＝13.24 mmとなる。",
    "choiceExplanations": {
      "ア": "スリーブは13 mmの目盛まで読め、13.5 mmの線はまだ現れていない。シンブルは1目盛が0.5/50＝0.01 mmで24目盛なので、13＋0.24＝13.24 mmとなる。",
      "イ": "13.74 mmは、スリーブの値にさらに0.5 mmがあると読んだ値である。シンブルの縁では13.5 mmの線がまだ見えないので、0.5 mmは加えない。",
      "ウ": "シンブルの0.24 mmの読みは妥当である。スリーブの0、5、10の線を数えると最後に見える整数目盛は13 mmである。",
      "エ": "24はシンブルの目盛数であり、長さに直すと0.24 mmである。測定値の整数の部分はスリーブから13 mmと読む。",
      "オ": "シンブルの値をmmに換算してスリーブの値に足す。スリーブは13 mmで、24目盛はねじの0.5 mmの一回転より小さい0.24 mmである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007502.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 機械区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kikai/q40.webp"
    ],
    "imageAltTexts": [
      "マイクロメータの目盛。シンブルの縁はスリーブの13 mmを越え、13.5 mmの線は見えない。基準線はシンブルの24目盛と合う。"
    ]
  }
];
