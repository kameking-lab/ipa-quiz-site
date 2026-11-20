import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2026_SENMON_KENCHIKU: Question[] = [
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q21",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "単純支持梁のせん断力図",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような荷重又は曲げモーメントを受ける単純支持梁A、B、Cについて、それぞれのせん断力図を定性的に示したものの組合せとして最も妥当なのはどれか。\nただし、せん断力の向きは図Ⅱの向きを「＋」とする。",
    "choices": {
      "ア": "㋒／㋐／㋓",
      "イ": "㋒／㋑／㋐",
      "ウ": "㋒／㋓／㋐",
      "エ": "㋓／㋐／㋒",
      "オ": "㋓／㋑／㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "集中荷重を受けるAは、荷重点でせん断力が正から負へ段差を作る㋒である。集中モーメントのBは負の一定値の㋑、全長に等分布荷重が作用するCは正から負へ直線的に減る㋐である。",
    "choiceExplanations": {
      "ア": "Aの集中荷重は㋒で合っている。Bの集中モーメントは鉛直荷重を加えないためせん断力が一定になり、Cの等分布荷重でせん断力が直線的に変わる。",
      "イ": "集中荷重を受けるAは、荷重点でせん断力が正から負へ段差を作る㋒である。集中モーメントのBは負の一定値の㋑、全長に等分布荷重が作用するCは正から負へ直線的に減る㋐である。",
      "ウ": "Aの㋒とCの㋐は妥当である。Bの集中モーメントは鉛直力を加えないので、集中荷重を受ける場合のようなせん断力の段差は生じない。",
      "エ": "Aの下向き集中荷重でせん断力は荷重点を境に減るので、負から正へ増える㋓にはならない。Bは一定値、Cは直線的に減る図になる。",
      "オ": "Bの㋑は妥当である。下向きの集中荷重が作用するAは正から負への段差、等分布荷重が作用するCは直線的な減少を示す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kenchiku/q21.webp"
    ],
    "imageAltTexts": [
      "三種類の荷重条件とせん断力の正方向、およびせん断力図の候補"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q22",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "長方形の断面二次モーメント",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "図のような長方形断面のX軸及びY軸に関する断面2次モーメントを、それぞれIₓ、Iᵧとしたとき、それらの比Iₓ：Iᵧとして最も妥当なのはどれか。",
    "choices": {
      "ア": "4：1",
      "イ": "2：1",
      "ウ": "1：1",
      "エ": "1：2",
      "オ": "1：4"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "長方形の幅をb、高さをhとすると、Iₓ＝bh³/12、Iᵧ＝hb³/12であり、比はh²：b²となる。高さ4l、幅2lなので比は4：1である。",
    "choiceExplanations": {
      "ア": "長方形の幅をb、高さをhとすると、Iₓ＝bh³/12、Iᵧ＝hb³/12であり、比はh²：b²となる。高さ4l、幅2lなので比は4：1である。",
      "イ": "2：1は高さと幅の比である。断面二次モーメントは軸からの距離の二乗を面積について積分するので、この比を二乗して4：1になる。",
      "ウ": "X軸、Y軸はいずれも図心を通るが、断面は正方形ではない。高さが幅の2倍なので、X軸まわりの断面二次モーメントが4倍になる。",
      "エ": "横方向のX軸から各点までの距離は高さ方向に測る。高さ4lが幅2lを上回るので、Iₓの方が大きい。",
      "オ": "4倍という大きさの違いは合っているが、縦に長い断面ではX軸の方が大きい。Iₓ：Iᵧは4：1である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kenchiku/q22.webp"
    ],
    "imageAltTexts": [
      "横幅2l、高さ4lの長方形と断面の中心を通るX軸とY軸"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q23",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "オイラー座屈",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "図のように、材端の支持条件が異なる長柱A～Dの弾性座屈荷重の理論値P_A～P_Dの大小関係として、最も妥当なのはどれか。\nただし、全ての柱の材質、断面形状及び長さは同じものとする。",
    "choices": {
      "ア": "P_A＞P_B＞P_C＞P_D",
      "イ": "P_C＞P_A＞P_B＞P_D",
      "ウ": "P_C＞P_B＞P_A＞P_D",
      "エ": "P_D＞P_A＞P_B＞P_C",
      "オ": "P_D＞P_B＞P_A＞P_C"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "同じ材質・断面では、オイラー座屈荷重は有効座屈長さの二乗に反比例する。有効長さは両端固定C、片端固定・片端ピンB、両端ピンA、片端自由Dの順に長くなる。",
    "choiceExplanations": {
      "ア": "両端固定Cの有効座屈長さは柱長の半分で、両端ピンAの有効座屈長さは柱長に等しい。座屈荷重は有効長さの二乗に反比例するため、Cの方が大きい。",
      "イ": "Cが最大、Dが最小という点は妥当である。片端を固定するBは両端ピンのAより有効座屈長さが短く、Bの座屈荷重の方が大きい。",
      "ウ": "同じ材質・断面では、オイラー座屈荷重は有効座屈長さの二乗に反比例する。有効長さは両端固定C、片端固定・片端ピンB、両端ピンA、片端自由Dの順に長くなる。",
      "エ": "Dは片端が自由なので変形を拘束されにくく、有効座屈長さが柱長の2倍となる。Dの座屈荷重は、この中で最も小さい。",
      "オ": "両端固定Cは端部の回転が拘束されているため、有効座屈長さが最も短く、座屈荷重が最大になる。片端自由Dは有効座屈長さが最も長く、座屈荷重は最小になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-kenchiku/q23.webp"
    ],
    "imageAltTexts": [
      "両端ピン、一端ピン他端固定、両端固定、一端自由他端固定の四つの柱"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q24",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "耐震設計・剛性率",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "建築物の耐震設計、構造計画等に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　建築物の各階の剛性率は、各階の層間変形角の逆数を建築物全体の層間変形角の逆数の平均値で除した値である。\n㋑　建築物の固有周期は、質量が同じであれば、剛性が低くなるほど長くなる。\n㋒　エキスパンションジョイントのみで接している複数の建築物については、一体の建築物として構造計算を行う。\n㋓　建築物の各階の偏心距離ができるだけ大きくなるように、耐力壁を配置する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "各階の剛性率は、層間変形角の逆数をその全階の平均で割る。質量が同じ建物では、剛性が低くなるほど固有周期が長くなる。",
    "choiceExplanations": {
      "ア": "各階の剛性率は、層間変形角の逆数をその全階の平均で割る。質量が同じ建物では、剛性が低くなるほど固有周期が長くなる。",
      "イ": "㋐の剛性率の説明は妥当である。エキスパンションジョイントで構造的に分離した部分は独立して変形するので、各部分を別に構造計算する。",
      "ウ": "㋐は剛性率の定義に沿う。耐力壁は重心と剛心が近くなるように配置し、偏心と地震時のねじれを抑える。",
      "エ": "㋑の固有周期の説明は妥当である。エキスパンションジョイントで分けた部分は、相互に応力を伝えないようにするため、各部分について計算する。",
      "オ": "エキスパンションジョイントで分離した部分は別々に計算する。耐力壁の配置では偏心距離を抑え、地震時のねじれを小さくする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q25",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "建築用鋼材",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "建築用鋼材に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　鋼に含まれる代表的な合金元素は、炭素、ケイ素、マンガン、リン、硫黄である。\n㋑　降伏点が高い鋼材は、降伏点が低い鋼材よりもヤング係数が大きくなる。\n㋒　鋼は、炭素の含有量が0.8％以下の範囲において、炭素量の増加とともに降伏点、引張強さなどの強度を示す特性が増加し、伸びなどの延性を示す特性が減少する。\n㋓　降伏強さを引張強さで除した値を破断伸びと呼ぶ。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "列挙された炭素、ケイ素、マンガン、リン、硫黄は鋼の組成に含まれる代表的な元素である。設問の範囲では炭素量が増えると強度が高まり、伸びなどの延性は低下する。",
    "choiceExplanations": {
      "ア": "㋐の炭素、ケイ素、マンガン、リン、硫黄は鋼の組成を表す代表的な元素である。降伏点の違いに応じて、ヤング係数が同じ比率で増減するわけではない。",
      "イ": "列挙された炭素、ケイ素、マンガン、リン、硫黄は鋼の組成に含まれる代表的な元素である。設問の範囲では炭素量が増えると強度が高まり、伸びなどの延性は低下する。",
      "ウ": "㋒の炭素と強度・延性の関係は妥当である。ヤング係数は弾性域の傾きで、鋼材の降伏点とは異なる特性である。",
      "エ": "建築用鋼材のヤング係数は通常、降伏点の高低によらず同程度として扱う。降伏強さを引張強さで割った値は降伏比である。",
      "オ": "㋒の炭素量による強度と延性の傾向は妥当である。破断伸びは、引張試験で破断した後の標点距離の伸びの割合をいう。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q26",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "建築施工",
    "topicTags": [
      "鉄骨工事の施工検査",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "鉄骨工事に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　トルシア形高力ボルトの締付け検査において、締付けが完了した際にピンテールが破断していないものを合格とした。\n㋑　完全溶込み溶接において、裏はつりを行った後に、裏側の溶接を行った。\n㋒　高力六角ボルトの締付け作業では、全てのボルトにマーキングを実施した後に、1次締めと本締めを行った。\n㋓　溶接部の内部欠陥の有無を超音波探傷試験によって検査し、合否を判定した。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "裏はつりで溶接の裏側の不健全な部分を取り除いた後、裏側を溶接して完全溶込みを確保する。溶接部の内部欠陥の確認には超音波探傷試験を使える。",
    "choiceExplanations": {
      "ア": "㋑の裏はつり後の裏側溶接は妥当である。トルシア形高力ボルトでは、本締めで所定の状態になるとピンテールが破断するので、未破断を合格とはしない。",
      "イ": "トルシア形高力ボルトは、本締め後にピンテールの破断を確認する。高力六角ボルトでは、一次締めをしてからマーキングし、その後に本締めを行う。",
      "ウ": "完全溶込み溶接で裏はつり後に裏側を溶接する㋑は妥当である。㋒のマーキングは一次締め後に行い、本締めによるナットの回転などを確認するために用いる。",
      "エ": "裏はつりで溶接の裏側の不健全な部分を取り除いた後、裏側を溶接して完全溶込みを確保する。溶接部の内部欠陥の確認には超音波探傷試験を使える。",
      "オ": "超音波探傷試験で内部欠陥を調べる㋓は妥当である。高力六角ボルトは一次締め、マーキング、本締めの順に施工する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q27",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "色の知覚",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "色彩に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　色の三属性は、色相、明度、彩度である。\n㋑　色の重量感は、一般に、明度の低いものほど軽く感じられる。\n㋒　同じ色の場合、一般に、面積の大きいものほど、明度と彩度が高くなったように見える。\n㋓　一般に、明度の低い色ほど膨張して見え、明度の高い色ほど収縮して見える。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "色は色相、明度、彩度の三属性で表す。同じ色でも面積が大きいと、面積効果により明度や彩度が高く感じられることがある。",
    "choiceExplanations": {
      "ア": "色は色相、明度、彩度の三属性で表す。同じ色でも面積が大きいと、面積効果により明度や彩度が高く感じられることがある。",
      "イ": "色の三属性は㋐のとおりである。膨張して見えやすいのは一般に明度の高い色で、暗い色は引き締まって見えやすい。",
      "ウ": "面積効果を述べた㋒は妥当である。色の重量感は一般に明度が低いほど大きく感じられる。",
      "エ": "明度が低い色ほど一般に重く、収縮して見えやすい。明度の高い色は軽く、膨張して見えやすい。",
      "オ": "面積が広くなると明るさや鮮やかさが強まって見えることがある。㋓の膨張・収縮は逆で、明度の高い色の方が膨張して見えやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q28",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "音速・吸音・遮音",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "音に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　空気中の音速は、気温が高くなるほど速くなる。\n㋑　材料に投射された音のエネルギーに対して、その材料に反射せずに吸収された音のエネルギーの割合を吸音率と呼び、一般に、吸音率は柔らかく多孔質な材料ほど低くなる。\n㋒　壁の遮音性を高めるためには、壁の透過損失を高めることが有効である。\n㋓　音源からの直接音と反射音が時間差で聞こえることにより、一つの音が分離して聞こえる現象を残響と呼ぶ。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "空気中の音速は気温が高いほど大きくなる。透過損失の大きい壁ほど反対側へ伝わる音が少なくなり、遮音性が高まる。",
    "choiceExplanations": {
      "ア": "㋐の音速と気温の関係は妥当である。柔らかく多孔質な材料は、孔の中で音のエネルギーを失わせるため、一般に吸音率が高い。",
      "イ": "空気中の音速は気温が高いほど大きくなる。透過損失の大きい壁ほど反対側へ伝わる音が少なくなり、遮音性が高まる。",
      "ウ": "音速は気温とともに上がる。一つの音に対する反射音が時間差によって分離して聞こえる現象はエコーである。",
      "エ": "透過損失が大きいほど遮音性は高くなる。柔らかい多孔質材料の空隙では音のエネルギーが失われやすく、一般に吸音率は高くなる。",
      "オ": "㋒は妥当である。残響は反射音が重なって音源停止後も音が続いて聞こえる現象で、直接音と反射音が別々に聞こえるエコーとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q29",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "建築設備",
    "topicTags": [
      "給排水衛生設備",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "給排水衛生設備に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　中央式給湯設備においては、レジオネラ属菌の繁殖を防ぐために、循環給湯温度を40 ℃程度に保つことが有効である。\n㋑　水道直結直圧方式は、屋上に設けた高置水槽へ揚水した後、重力によって建物内の必要箇所に給水する方式である。\n㋒　逆サイホン作用の防止のため、吐水口空間の確保が不可能な器具には、バキュームブレーカーを設けることが有効である。\n㋓　給水管内の水流を急に止めた際などに、急激な圧力変化によって給水管等が振動し、騒音を発することをウォーターハンマーと呼ぶ。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "吐水口空間を確保できない器具では、管内の負圧時に空気を取り入れるバキュームブレーカーが逆サイホンを防ぐ。水流の急停止などで圧力が変化し、管が振動する現象はウォーターハンマーである。",
    "choiceExplanations": {
      "ア": "40 ℃程度はレジオネラ属菌の抑制に適した温度ではない。高置水槽から重力で給水する仕組みは、高置水槽方式である。",
      "イ": "㋒の逆流防止の説明は妥当である。㋐の40 ℃程度は、循環給湯で菌の増殖を防ぐ温度としては低い。",
      "ウ": "水流を急に止めたときに圧力が変動する㋓は妥当である。中央式給湯での菌の増殖防止には、40 ℃程度より高い温度を保つ管理が必要になる。",
      "エ": "㋒のバキュームブレーカーは逆サイホン作用の対策になる。直結直圧方式は、水道本管の圧力で給水し、水槽から重力で給水する方式ではない。",
      "オ": "吐水口空間を確保できない器具では、管内の負圧時に空気を取り入れるバキュームブレーカーが逆サイホンを防ぐ。水流の急停止などで圧力が変化し、管が振動する現象はウォーターハンマーである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q30",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "美術館・図書館・学校・集合住宅",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "建築計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　美術館の設計において、展示品に直接光が当たらないことや明るさに配慮した上で、人工照明と自然採光を組み合わせることとした。\n㋑　図書館の設計において、閲覧者が自由に書架から本を取り出して閲覧可能な半開架式を採用した。\n㋒　小学校の設計において、各教科の学習を充実させるため、児童が時間割に応じて教室を移動し、全授業をそれぞれの科目専用の教室で受ける総合教室型を採用した。\n㋓　集合住宅の設計において、廊下側の居室のプライバシーの確保が難しいことや、日照・通風条件が悪くなりやすいことを理由に、中廊下型の採用を避けた。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "美術館では直接光を避けながら照明と自然採光を組み合わせて展示環境を整えられる。住戸が共用廊下を挟む中廊下型では、廊下側のプライバシーや、日照・通風に配慮する必要がある。",
    "choiceExplanations": {
      "ア": "展示品に直接光を当てずに採光を調整する㋐は妥当である。利用者が自由に書架から資料を取り出す方式は開架式である。",
      "イ": "㋐は妥当である。教科ごとに専用の教室へ移動して全授業を受ける方式は教科教室型に当たる。",
      "ウ": "美術館では直接光を避けながら照明と自然採光を組み合わせて展示環境を整えられる。住戸が共用廊下を挟む中廊下型では、廊下側のプライバシーや、日照・通風に配慮する必要がある。",
      "エ": "利用者自身が自由に本を取るのは開架式である。教科ごとの専用教室に移動する方式は教科教室型で、総合教室型ではない。",
      "オ": "㋓の中廊下型に関する配慮は妥当である。総合教室型では学級が使う教室で各教科を学ぶため、全授業で専用教室に移動するという説明は当てはまらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q31",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "建築家と作品",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "建築家と、その建築家が設計した建築物の組合せ㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　安藤忠雄 —— 国立競技場\n㋑　磯崎新 —— せんだいメディアテーク\n㋒　妹島和世・西沢立衛 —— 金沢21世紀美術館\n㋓　原広司 —— 京都駅ビル",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "金沢21世紀美術館は妹島和世と西沢立衛の建築事務所SANAAの設計である。京都駅ビルは原広司が設計した。",
    "choiceExplanations": {
      "ア": "現国立競技場の設計には隈研吾らが参加した。せんだいメディアテークを設計したのは伊東豊雄である。",
      "イ": "金沢21世紀美術館を設計したのは妹島和世と西沢立衛である。国立競技場の設計を安藤忠雄とする組合せは合わない。",
      "ウ": "京都駅ビルの設計者は原広司である。現国立競技場は隈研吾らの設計による。",
      "エ": "㋒は妥当である。せんだいメディアテークの設計者は磯崎新ではなく伊東豊雄である。",
      "オ": "金沢21世紀美術館は妹島和世と西沢立衛の建築事務所SANAAの設計である。京都駅ビルは原広司が設計した。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q32",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "建築基準法と建築士法",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "建築基準法及び建築士法に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　耐火建築物においては、その主要構造部は全て鉄骨造又は鉄筋コンクリート造でなければならない。\n㋑　人口25万未満の市町村であっても、建築主事を置くことができる。\n㋒　建築物が、がけ崩れ等による被害を受けるおそれのある場合においては、擁壁の設置その他安全上適当な措置を講じなければならない。\n㋓　木造の建築物又は建築物の部分で、高さが16メートルを超えるもの又は地階を除く階数が4以上であるものを新築する場合においては、原則として一級建築士又は二級建築士でなければ、その設計又は工事監理をしてはならない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "人口25万未満でも、建築主事を置くことができる。がけ崩れなどで被害を受けるおそれがある敷地では、擁壁の設置その他の安全措置が求められる。",
    "choiceExplanations": {
      "ア": "㋑は妥当である。主要構造部が必要な耐火性能を備えれば、素材を鉄骨や鉄筋コンクリートに限る規定ではない。",
      "イ": "㋒は擁壁などの安全措置を求める建築基準法の規定に沿う。耐火建築物は耐火性能が求められ、木質の部材でも性能を満たす工法がある。",
      "ウ": "耐火建築物の主要構造部は所定の耐火性能を満たす必要がある。高さ16 mを超えるか、地階を除いて4階以上の木造建築物の設計・工事監理は、原則として一級建築士に限られる。",
      "エ": "人口25万未満でも、建築主事を置くことができる。がけ崩れなどで被害を受けるおそれがある敷地では、擁壁の設置その他の安全措置が求められる。",
      "オ": "㋒の安全措置は妥当である。設問の規模の木造建築物について、二級建築士は設計や工事監理を行えない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-kenchiku-q33",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kenchiku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "都市計画法",
      "建築区分"
    ],
    "difficulty": 3,
    "question": "都市計画法に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　都市計画法において「公共施設」とは、公園、官公庁、図書館、体育館、集会所などの広く市民が利用する施設をいうものであり、道路や下水道は含まれない。\n㋑　都市計画区域においては、土地区画整理法による土地区画整理事業などの市街地開発事業を都市計画に定めることができる。\n㋒　都道府県又は市町村は、都市計画を決定しようとするときは、あらかじめ、その旨を公告し、その都市計画の案を、公衆の縦覧に供しなければならない。\n㋓　国の機関は、都市計画事業を施行することができない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "都市計画区域では、土地区画整理などを市街地開発事業として定められる。都道府県や市町村が都市計画を決定する場合は、事前に公告し、案を公衆の縦覧に供する。",
    "choiceExplanations": {
      "ア": "㋑の市街地開発事業の説明は妥当である。都市計画法の公共施設には、道路、公園、下水道などが含まれる。",
      "イ": "都市計画案の公告と縦覧を述べた㋒は妥当である。道路や下水道は都市計画法でいう公共施設に含まれるため、㋐は誤りである。",
      "ウ": "公共施設に道路と下水道は含まれる。国の機関も、法律で定められた要件を満たし、承認を受けて都市計画事業を施行できる場合がある。",
      "エ": "都市計画区域では、土地区画整理などを市街地開発事業として定められる。都道府県や市町村が都市計画を決定する場合は、事前に公告し、案を公衆の縦覧に供する。",
      "オ": "㋒の公告と縦覧は妥当である。国の機関による事業施行は法律上認められる場合があり、一律に禁止されているわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018480.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 建築区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  }
];
