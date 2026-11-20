import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2026_SENMON_SURI_BUTSURI_CHIKYU: Question[] = [
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q001",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "基礎数学・情報数学",
    "topicTags": [
      "二次方程式の二根の累乗和",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "2次方程式 x²−x−1＝0 の2つの実数解をα、βとするとき、α⁵＋β⁵はいくらか。",
    "choices": {
      "ア": "−11",
      "イ": "−2",
      "ウ": "5",
      "エ": "7",
      "オ": "11"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "根はそれぞれx²＝x＋1を満たすので、累乗和SₙはSₙ＝Sₙ₋₁＋Sₙ₋₂を満たす。S₀＝2、S₁＝1から、S₂＝3、S₃＝4、S₄＝7、S₅＝11となる。",
    "choiceExplanations": {
      "ア": "二つの根の和は1である。各根は二乗すると自分自身に1を加えた値になるので、累乗和は正の値として順に求まり、−11にはならない。",
      "イ": "0乗の和は2だが、5乗の和を求めるにはαとβがともに満たす関係x²＝x＋1を使う。負の根があることだけから、5乗の和が負とはいえない。",
      "ウ": "3乗までの累乗和はS₀＝2、S₁＝1、S₂＝3、S₃＝4である。続く4乗の和7と3乗の和4を足して5乗の和を求める。",
      "エ": "3乗と4乗の和はそれぞれ4と7なので、7は4乗の和に当たる。5乗の和はこの二つを加える。",
      "オ": "根はそれぞれx²＝x＋1を満たすので、累乗和SₙはSₙ＝Sₙ₋₁＋Sₙ₋₂を満たす。S₀＝2、S₁＝1から、S₂＝3、S₃＝4、S₄＝7、S₅＝11となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q002",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "基礎数学・情報数学",
    "topicTags": [
      "立方体に内接する球と直方体",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、立方体Xに2つの球と直方体Yが入っており、2つの球はそれぞれXの3面に接し、かつ互いに接している。また、YはXと4面を共有し、2つの球に面で接している。このとき、Yの上面（網掛け部分）の面積はいくらか。\nただし、球の半径はそれぞれ3√3と4√3であるとする。",
    "choices": {
      "ア": "40",
      "イ": "42",
      "ウ": "44",
      "エ": "46",
      "オ": "48"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "球の中心間距離は√3(L−7√3)＝7√3なので、L＝7＋7√3となる。網掛け面の各辺はL−6√3＝7＋√3、L−8√3＝7−√3であり、積は49−3＝46である。",
    "choiceExplanations": {
      "ア": "立方体の一辺をLとすると、二球の中心は三方向にそれぞれL−7√3だけ離れる。中心間距離を半径の和と等しく置くと、Lは7＋7√3となる。",
      "イ": "網掛け面の辺の長さは、立方体の一辺からそれぞれの球の直径を引いて求める。半径だけを引くのでなく、球が立方体の外側の面と直方体の面の両方に接する条件を使う。",
      "ウ": "二球の直径は6√3と8√3である。立方体の一辺7＋7√3からそれぞれを差し引いた二つの値の積は44にはならない。",
      "エ": "球の中心間距離は√3(L−7√3)＝7√3なので、L＝7＋7√3となる。網掛け面の各辺はL−6√3＝7＋√3、L−8√3＝7−√3であり、積は49−3＝46である。",
      "オ": "各辺の正負の差は√3である。積は7²から(√3)²を引くので、48ではなく46になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q002.webp"
    ],
    "imageAltTexts": [
      "立方体Xに内接する二つの球と、直方体Yの網掛け上面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q020",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "連星の質量とケプラーの第三法則",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "二つ以上の恒星が互いに共通重心のまわりを公転しているものを連星という。図のように、恒星Xと恒星Yから成る連星があり、XとYは共通重心を中心とし、それぞれ半径の異なる円軌道で公転している。XとYから共通重心までの距離の比が1：2、公転周期が40年、XとYの平均距離が20天文単位であるとき、太陽の質量に対するXの質量の比として最も妥当なのはどれか。\nただし、太陽の質量は地球の質量に対して、十分大きいものとする。\nなお、1天文単位は、太陽と地球の間の平均距離である。",
    "choices": {
      "ア": "2",
      "イ": "10／3",
      "ウ": "4",
      "エ": "16／3",
      "オ": "8"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "太陽と地球の軌道を単位にすると、連星の合計質量は太陽質量の20³／40²＝5倍になる。重心までの距離がXとYで1：2なので、Xは合計の2／3を占めて10／3倍となる。",
    "choiceExplanations": {
      "ア": "重心の関係から得られる2は、XのYに対する質量比である。太陽に対するXの質量比を出すには連星の合計質量も求める。",
      "イ": "太陽と地球の軌道を単位にすると、連星の合計質量は太陽質量の20³／40²＝5倍になる。重心までの距離がXとYで1：2なので、Xは合計の2／3を占めて10／3倍となる。",
      "ウ": "個別の恒星の軌道半径でなく二星間の距離20天文単位から合計質量を求める。4倍とするとYが2倍になり、合計が太陽質量の5倍という関係と合わない。",
      "エ": "連星の合計質量は太陽の5倍なので、X単独の質量比16／3がそれを超えることはない。重心の関係から合計の2／3を取る。",
      "オ": "ケプラーの第三法則から求めた合計は太陽質量の5倍である。二星間の距離のほかに重心位置も用いてXの分を配分する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q020.webp"
    ],
    "imageAltTexts": [
      "共通重心の周りを公転する恒星XとY"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q022",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "正断層・逆断層の発震機構解",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "震源メカニズムに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図Ⅰは、南側から見た西傾斜の正断層（断層の上盤側が下盤側に対して下がる）の断層運動である。この断層運動を考えるため、震源を中心とする単位長さの半径を持つ球を考え、これを震源球と呼ぶ。\n震源球の球面を通過するP波の初動が「押し」であれば黒色、「引き」であれば白色とし、震源球面上の全方位で「押し」「引き」に応じて色をつけると、図Ⅱ(A)のように、白色と黒色の境界は、球の中心を通る二つの直交する平面それぞれと球面が交わるところに現れる。ここで、震源球の下半球を二次元に投射したものを震源メカニズム解と呼び、この断層運動の震源メカニズム解は図Ⅱ(B)のように表される。\n同様に、東傾斜の逆断層（断層の上盤側が下盤側に対して上がる）の震源の震源メカニズム解を求めると、図Ⅲの［㋐］となる。\n震源メカニズム解からは断層の特徴を知ることができる。例えば、震源球の二つの直交する平面の一つが断層面に相当する。二つの平面のうち、実際にどちらが動いた断層面かを特定するには、［㋑］などの情報が必要となる。」",
    "choices": {
      "ア": "(X) ／ 本震のマグニチュード",
      "イ": "(X) ／ 余震の空間分布",
      "ウ": "(Y) ／ 本震のマグニチュード",
      "エ": "(Y) ／ 余震の空間分布",
      "オ": "(Z) ／ 本震のマグニチュード"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "逆断層では中央の押しの領域が黒くなる図(Y)に対応する。震源メカニズム解で得られる二つの節面は、余震の空間分布などと比較して実際の断層面を判断する。",
    "choiceExplanations": {
      "ア": "図(X)は中央が白く、正断層型の模式図に相当する。地震の規模だけでは二つの節面のどちらが動いたかを選べない。",
      "イ": "余震の空間分布は、実際の断層面の判別に使える。東傾斜の逆断層では中心が黒くなり、対応するのは図(Y)である。",
      "ウ": "逆断層に対応するのは図(Y)である。断層面の位置や傾斜を知るには、本震の大きさより余震がどの平面に並ぶかが役立つ。",
      "エ": "逆断層では中央の押しの領域が黒くなる図(Y)に対応する。震源メカニズム解で得られる二つの節面は、余震の空間分布などと比較して実際の断層面を判断する。",
      "オ": "図(Z)の四つの領域は横ずれ型に対応する。本震のマグニチュードは地震規模であり、実際の断層面を判別する情報にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q022-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q022-2.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q022-3.webp"
    ],
    "imageAltTexts": [
      "西傾斜の正断層（図Ⅰ）",
      "震源球と下半球の震源メカニズム解（図Ⅱ）",
      "震源メカニズム解の候補（図Ⅲ）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q023",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "第四紀の氷期と縄文海進",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "日本の第四紀層に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　過去70万年の間、およそ10万年周期で気候の寒暖が繰り返されている。その要因の一つとして、ミランコビッチサイクルが挙げられる。\n㋑　河岸段丘は、海退期に河川の侵食によって低地ができたもので、地殻変動の影響に関係なく形成される。\n㋒　約2万年前は最終氷期に当たり、対馬海峡が閉じたため、暖流が日本海に流入せず、日本の冬季の降雪量が増加した。\n㋓　約7000年前から4000年前までは、気候が温暖となり、海水準が上昇した。縄文時代の貝塚の分布から、当時の海岸線が推計されている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "約10万年周期の寒暖には、地球の軌道などの周期的変動が関係する。縄文海進の時期の海岸線は、貝塚などの考古・地質資料から推定できる。",
    "choiceExplanations": {
      "ア": "地球の軌道や自転軸の変動は氷期と間氷期に関係する。河岸段丘の形成には地盤の隆起などの地殻変動も関与する。",
      "イ": "約10万年周期の寒暖には、地球の軌道などの周期的変動が関係する。縄文海進の時期の海岸線は、貝塚などの考古・地質資料から推定できる。",
      "ウ": "河岸段丘は地殻変動と無関係に生じるわけではない。暖流の流入が弱まり日本海からの水蒸気供給が減ると、冬の降雪は増えにくい。",
      "エ": "貝塚の分布についての㋓は妥当である。一方、河岸段丘の形成には基準面の低下だけでなく、土地の隆起や流量・供給土砂の変化も関わる。",
      "オ": "縄文海進を記した㋓は妥当である。㋒の暖流の流入が弱まる条件では、冬の季節風が得る水蒸気は減るため、降雪量が増加するという説明は合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q024",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "海底地形の水深・勾配・起伏",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "海底地形の特徴をまとめた次の表の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "深海平原 ／ 海溝 ／ 大陸斜面 ／ 中央海嶺頂上部 ／ 大陸棚",
      "イ": "深海平原 ／ 海溝 ／ 大陸棚 ／ 中央海嶺頂上部 ／ 大陸斜面",
      "ウ": "海溝 ／ 大陸斜面 ／ 大陸棚 ／ 中央海嶺頂上部 ／ 深海平原",
      "エ": "海溝 ／ 中央海嶺頂上部 ／ 大陸斜面 ／ 深海平原 ／ 大陸棚",
      "オ": "海溝 ／ 中央海嶺頂上部 ／ 大陸棚 ／ 深海平原 ／ 大陸斜面"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "最も深く起伏のある㋐は海溝で、中央海嶺頂上部は幅が広い㋑に当たる。浅く緩やかな㋒は大陸棚、深く平坦な㋓は深海平原、より急な㋔は大陸斜面である。",
    "choiceExplanations": {
      "ア": "水深が5000～12000 mで周囲との起伏が大きい㋐は海溝に当たる。浅くて勾配が小さい㋒は大陸棚であり、大陸斜面は表の㋔に当たる。",
      "イ": "大陸棚と大陸斜面の位置は合っている。海溝は表の中で深く起伏の大きい㋐で、広く平坦な深海平原は㋓になる。",
      "ウ": "㋐は海溝、㋒は大陸棚で合っている。中央海嶺頂上部は幅が広く水深が2000～4000 mの㋑、深海平原は勾配の小さい㋓である。",
      "エ": "海溝、中央海嶺頂上部、深海平原の割当ては正しい。大陸棚は浅く緩やかな㋒、大陸斜面は勾配が大きい㋔となる。",
      "オ": "最も深く起伏のある㋐は海溝で、中央海嶺頂上部は幅が広い㋑に当たる。浅く緩やかな㋒は大陸棚、深く平坦な㋓は深海平原、より急な㋔は大陸斜面である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q024.webp"
    ],
    "imageAltTexts": [
      "海底地形の幅・勾配・起伏・水深の表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q025",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "地球の年代・示準化石・大量絶滅",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "地球や生命の歴史に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「地球が誕生したのは、今から約［㋐］億年前であると考えられている。地球の歴史は、多数の地質年代によって区分されている。地質年代を決定する際に有用な化石は［㋑］と呼ばれる。生命史上の顕著な出来事として、地質学的に短期間のうちに化石の多様性が急激に減少した、大量絶滅と呼ばれる現象が知られており、顕生代の間に5回起こった。それらのうち、中生代末の大量絶滅の主要因は［㋒］であると考えられている。」",
    "choices": {
      "ア": "46 ／ 示準化石 ／ 全球凍結",
      "イ": "46 ／ 示準化石 ／ 巨大隕石の衝突",
      "ウ": "46 ／ 示相化石 ／ 全球凍結",
      "エ": "64 ／ 示相化石 ／ 巨大隕石の衝突",
      "オ": "64 ／ 示相化石 ／ 全球凍結"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "地球の形成年代は約46億年前で、地層の年代対比には示準化石を用いる。中生代末の大量絶滅の主要因は巨大隕石の衝突と考えられている。",
    "choiceExplanations": {
      "ア": "地球の年齢と年代を示す化石の名称は合っている。中生代末の大量絶滅には、チクシュルーブ衝突が深く関わったと考えられている。",
      "イ": "地球の形成年代は約46億年前で、地層の年代対比には示準化石を用いる。中生代末の大量絶滅の主要因は巨大隕石の衝突と考えられている。",
      "ウ": "地球の形成年代は正しい。示相化石は堆積環境を推定するのに用い、中生代末の絶滅には巨大隕石の衝突が関わった。",
      "エ": "巨大隕石の衝突は妥当である。地球は約46億年前に形成され、地層の年代を示すのは示準化石である。",
      "オ": "地球の年齢は約46億年で、地質年代の決定には示準化石を用いる。全球凍結が論じられるのは主に先カンブリア時代である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q026",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "階乗の素因数と位取り表記の末尾",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "1000!を175進数表示したときに、末尾の数字は0となる。末尾に並ぶ0の個数はいくらか。",
    "choices": {
      "ア": "124",
      "イ": "164",
      "ウ": "204",
      "エ": "244",
      "オ": "284"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "175＝5²×7なので、0の個数は1000!に含まれる5の指数の半分の整数部分と、7の指数の小さい方である。5の指数は200＋40＋8＋1＝249、7の指数は164なので124個となる。",
    "choiceExplanations": {
      "ア": "175＝5²×7なので、0の個数は1000!に含まれる5の指数の半分の整数部分と、7の指数の小さい方である。5の指数は200＋40＋8＋1＝249、7の指数は164なので124個となる。",
      "イ": "164は1000!の素因数に現れる7の指数である。175一つにつき5を二つ使うため、5の方が制約になる。",
      "ウ": "175で何回割り切れるかを数えるため、5と7の両方の指数を調べる。7の指数が164なので、204回も175では割り切れない。",
      "エ": "1000!に現れる5の指数は249である。175ではその指数を一つずつでなく二つずつ消費するので、244回には足りない。",
      "オ": "175を何回因数として取り出せるかが末尾の0の数である。5²が必要なので、5の指数249より多い284個の0はあり得ない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q027",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "写像による集合の像と逆像",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "集合Xから集合Yへの写像f：X→Y、Xの部分集合A₁、A₂、及びYの部分集合Bに関する記述㋐、㋑、㋒のうち、常に正しいもののみを全て挙げているのはどれか。\n㋐　B⊂f(A₁)∩f(A₂)であり、かつ、fが全射であるなら、f⁻¹(B)⊂A₁∩A₂である。\n㋑　B＝f(A₁)∪f(A₂)であり、かつ、fが単射であるなら、f⁻¹(B)＝A₁∪A₂である。\n㋒　f⁻¹(B)⊂A₁∩A₂であり、かつ、fが全射であるなら、B⊂f(A₁)∩f(A₂)である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "㋑は単射のとき、A₁∪A₂の像の逆像が再びA₁∪A₂になることから従う。㋒はBの任意の点の原像を全射性で一つ取り、それが両方のAに属することから従う。",
    "choiceExplanations": {
      "ア": "全射でも異なる点が同じ像を持てる。例えば二点集合から一点集合への写像でA₁とA₂を互いに素な一点集合とすると、㋐の結論は成り立たない。",
      "イ": "単射を使う㋑は正しいが、㋐で全射は各点の逆像の一意性を保証しない。逆像の点がそれぞれのAに一つずつあっても、共通する点があるとは限らない。",
      "ウ": "㋑は単射により正しい。㋒も、全射であればBの各点に原像があり、その原像はA₁とA₂の両方に入るので正しい。",
      "エ": "㋑は単射のとき、A₁∪A₂の像の逆像が再びA₁∪A₂になることから従う。㋒はBの任意の点の原像を全射性で一つ取り、それが両方のAに属することから従う。",
      "オ": "㋒は正しいが、㋑も常に成り立つ。f(A₁)∪f(A₂)はf(A₁∪A₂)に等しく、単射では逆像で元の集合が戻る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q028",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "可算集合と二進無限列",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の集合㋐、㋑、㋒のうち、可算無限濃度であるもののみを全て挙げているのはどれか。\n㋐　非負整数の数列で非減少、かつ、上に有界なもの全体のなす集合。すなわち、｛(aₙ)ₙ₌₁,₂,…｜aₙは非負整数、かつ、ある非負整数Mが存在して a₁≦a₂≦…≦M｝\n㋑　0と1からなる数列全体のなす集合。すなわち、｛(aₙ)ₙ₌₁,₂,…｜aₙ∈｛0, 1｝｝\n㋒　非負整数の数列で、0でない項が有限個であるもの全体のなす集合。すなわち、｛(aₙ)ₙ₌₁,₂,…｜aₙは非負整数、かつ、aₙ≠0となるnは有限個｝",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐は有界な非減少整数列なのでやがて一定、㋒はやがて0となり、いずれも有限列を使って可算個に列挙できる。㋑は対角線論法で、どの列挙にも現れない二進列を作れる。",
    "choiceExplanations": {
      "ア": "㋐の整数列はやがて一定になり、有限個のデータで指定できる。㋑は無限二進列全体であり、対角線論法により非可算である。",
      "イ": "有限個のデータで記述できる㋐、㋒は可算である。㋑では無限個の位置で独立に0か1を選べるため、可算ではない。",
      "ウ": "㋐は有界な非減少整数列なのでやがて一定、㋒はやがて0となり、いずれも有限列を使って可算個に列挙できる。㋑は対角線論法で、どの列挙にも現れない二進列を作れる。",
      "エ": "仮に二進列を列挙できるとすると、第n列の第n項を反転した列を作れる。その列はどの列とも異なるので、㋑は非可算である。",
      "オ": "㋒は可算だが、㋐もやがて一定になる。安定する位置とそれ以前の有限列、最後の定数を指定すれば列挙できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q029",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "商空間で保たれる位相的性質",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "位相空間X上の同値関係～による商空間X／～に関する命題㋐、㋑、㋒のうち、常に正しいもののみを全て挙げているのはどれか。\n㋐　Xがハウスドルフ空間ならば、X／～もハウスドルフ空間である。\n㋑　Xがコンパクト空間ならば、X／～もコンパクト空間である。\n㋒　Xが連結ならば、X／～も連結である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "商写像は連続な全射であり、コンパクト性と連結性はいずれも連続像に保たれる。ハウスドルフ性を保つには同値関係に追加条件が必要である。",
    "choiceExplanations": {
      "ア": "商を取るとハウスドルフ性が失われる場合がある。例えば実直線の開区間(0, 1)を一点に同一視すると、その一点の逆像が閉じていない。",
      "イ": "コンパクト性は連続像に移るが、ハウスドルフ性は一般には移らない。商で一点にまとめる集合が閉じていなければ、商は一点集合が閉であるという条件すら満たさない。",
      "ウ": "連結性は正しい。ハウスドルフ性については、同値類が閉集合にならないような同値関係が反例となる。",
      "エ": "商写像が連続であるため、コンパクト性は保たれる。同じように連結空間の連続像も連結であり、㋒を含める必要がある。",
      "オ": "商写像は連続な全射であり、コンパクト性と連結性はいずれも連続像に保たれる。ハウスドルフ性を保つには同値関係に追加条件が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q030",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "対称群の置換の位数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "5次対称群S₅の元の位数として現れる数のみを挙げているのは次のうちではどれか。",
    "choices": {
      "ア": "2、4、8",
      "イ": "3、6",
      "ウ": "3、8、10",
      "エ": "4、7",
      "オ": "5、9"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "3は3巡回の置換の位数である。互いに素な3巡回と2巡回を組み合わせると、位数は最小公倍数の6になる。",
    "choiceExplanations": {
      "ア": "2と4はそれぞれ2巡回、4巡回の置換で得られる。位数8を得るには巡回の長さの最小公倍数が8でなければならず、5文字では不可能である。",
      "イ": "3は3巡回の置換の位数である。互いに素な3巡回と2巡回を組み合わせると、位数は最小公倍数の6になる。",
      "ウ": "位数8になる巡回長は5文字には収まらない。また位数10に必要な長さ5と2の独立した巡回を置くこともできない。",
      "エ": "位数4は4巡回で実現できる。位数が7であるためには7の倍数の巡回長が必要で、5文字では実現できない。",
      "オ": "5巡回で位数5を実現できる。位数9には9の倍数の巡回長が要るので、5文字を置換するS₅には現れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q031",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "環準同型とイデアルの像・逆像",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ℝ係数の2変数及び1変数の多項式環ℝ[x, y]、ℝ[t]について、φ：ℝ[x, y]→ℝ[t]を環の準同型写像で、任意のa∈ℝに対してφ(a)＝aであるものとする。このとき、記述㋐、㋑、㋒のうち、常に正しいもののみを全て挙げているのはどれか。\n㋐　ℝ[t]のイデアルI＝(t²＋1)の逆像φ⁻¹(I)は、ℝ[x, y]の素イデアルである。\n㋑　φ(x)＝tのとき、ℝ[x, y]の任意のイデアルIの像φ(I)は、ℝ[t]のイデアルである。\n㋒　φ(x)＝t²、φ(y)＝t⁴のとき、ℝ[x, y]の任意のイデアルIの像φ(I)は、ℝ[t]のイデアルである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "t²＋1は実数体上で既約であり、生成する素イデアルの逆像は素になる。㋑では定数とtが像に含まれるためφは全射で、イデアルの像もイデアルになる。",
    "choiceExplanations": {
      "ア": "t²＋1が実係数では既約なので㋐は正しい。㋑も、φ(x)＝tにより全射となるので成り立つ。",
      "イ": "t²＋1は実数体上で既約であり、生成する素イデアルの逆像は素になる。㋑では定数とtが像に含まれるためφは全射で、イデアルの像もイデアルになる。",
      "ウ": "㋒の像は偶数べきの多項式から成る。全体の環をイデアルIとした場合、像に1を含むがtは含まないため、ℝ[t]のイデアルにはならない。",
      "エ": "㋑は全射性から正しいが、㋒では全射性がない。例えばt²は像に入るが、これにtを掛けたt³は像に入らない。",
      "オ": "㋒の写像で環全体を写すと像はℝ[t²]である。1を含むのにtを含まないので、ℝ[t]のイデアルにならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q032",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "円分体と三次多項式の最小分解体",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xを不定元とする有理数体ℚ上の多項式㋐、㋑、㋒のうち、そのℚ上の最小分解体がℚ上の6次拡大であるもののみを全て挙げているのはどれか。\n㋐　x⁶−1\n㋑　x⁷−1\n㋒　x³−3",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "原始7乗根の最小多項式の次数は6である。x³−3の実根の次数は3で、残る二根を得るための非実の原始3乗根がさらに2次拡大を与える。",
    "choiceExplanations": {
      "ア": "x⁶−1の分解体は原始6乗根を添加した円分体である。オイラーのφ関数の値φ(6)は2なので、6次ではない。",
      "イ": "x³−3の分解体は6次だが、x⁶−1の分解体の次数はφ(6)＝2である。x⁷−1の方がφ(7)＝6となる。",
      "ウ": "x⁷−1の分解体は6次である。x³−3も実の三乗根だけでは分解せず、原始3乗根の追加により次数が6になる。",
      "エ": "原始7乗根の最小多項式の次数は6である。x³−3の実根の次数は3で、残る二根を得るための非実の原始3乗根がさらに2次拡大を与える。",
      "オ": "x³−3の根をそろえると分解体の次数は6になる。x⁷−1も原始7乗根を生成元にでき、その次数は6なので含める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q033",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "トーラスの曲面積",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "3次元ユークリッド空間ℝ³内のパラメータ表示された曲面\n\n(x, y, z)＝((2＋cos u) cos v, (2＋cos u) sin v, sin u)　（(u, v)∈(0, π)²）\n\nの面積はいくらか。",
    "choices": {
      "ア": "2π²",
      "イ": "4π²",
      "ウ": "8π²",
      "エ": "16π²",
      "オ": "32π²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "偏微分ベクトルは直交し、それぞれの長さは1と2＋cos uである。uとvをともに0からπまで積分すると、cos uの積分が0なので面積は2π²となる。",
    "choiceExplanations": {
      "ア": "偏微分ベクトルは直交し、それぞれの長さは1と2＋cos uである。uとvをともに0からπまで積分すると、cos uの積分が0なので面積は2π²となる。",
      "イ": "4π²は一方のパラメータの範囲を2πまで広げて計算した場合の値である。与えられた曲面ではどちらも0からπまでである。",
      "ウ": "8π²は両方の角度を0から2πまで動かした完全なトーラスの面積である。問題の範囲では面積はその4分の1となる。",
      "エ": "パラメータの偏微分から得られる面積要素は2＋cos uである。二つの区間の長さπを使うと16π²より小さい。",
      "オ": "曲面の面積を求める積分で、cos uの項は0からπまで積分すると打ち消し合う。残る一定項2の積分は2π²である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q034",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "二つの円が交わる空間の一次ホモロジー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "3次元ユークリッド空間ℝ³の部分空間\n\nX＝｛(x, y, z)∈ℝ³｜x²＋y²＋z²＝1, xy＝0｝\n\nの1次整数係数ホモロジー群H₁(X; ℤ)の階数はいくらか。",
    "choices": {
      "ア": "1",
      "イ": "2",
      "ウ": "3",
      "エ": "4",
      "オ": "0"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Xには二つの円があり、z軸上の二点を共通の頂点とみなせる。頂点2個と辺4本の連結グラフの一次ホモロジーの階数は辺数−頂点数＋1＝3である。",
    "choiceExplanations": {
      "ア": "xy＝0なので、Xはxz平面とyz平面の単位円の和集合である。一つの円だけと違い、二円は北極と南極の二点で交わり、独立なループが三つできる。",
      "イ": "二円の交点は一点ではなく二点ある。二つの交点を結ぶ半円が四本ある連結グラフとして数えると、階数は4−2＋1である。",
      "ウ": "Xには二つの円があり、z軸上の二点を共通の頂点とみなせる。頂点2個と辺4本の連結グラフの一次ホモロジーの階数は辺数−頂点数＋1＝3である。",
      "エ": "半円は四本あるが、各辺単独は閉路ではない。二頂点を結ぶ一辺を全域木に選ぶと、残る三辺が独立な一つずつの閉路を与える。",
      "オ": "空間には円周が含まれ、それを埋める2次元の面は存在しない。グラフとしての閉路を数えると階数は0にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q035",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "写像のヤコビ行列の階数と臨界点",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xyz空間ℝ³からℝ²への写像 f(x, y, z)＝(x³＋y³＋z³, xy−z)を考える。ℝ³内の点㋐、㋑、㋒のうち、fの臨界点であるもののみを全て挙げているのはどれか。\n㋐　(0, 0, 0)\n㋑　(1, 1, −1)\n㋒　(−1, −1, 1)",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ヤコビ行列の二行は(3x², 3y², 3z²)と(y, x, −1)である。㋐では第一行が0、㋒では第一行(3, 3, 3)と第二行(−1, −1, −1)が比例するので階数が2未満になる。",
    "choiceExplanations": {
      "ア": "原点では第一成分の勾配が0になるので臨界点である。㋑では勾配(3, 3, 3)と(1, 1, −1)は比例しない。",
      "イ": "ヤコビ行列の二行は(3x², 3y², 3z²)と(y, x, −1)である。㋐では第一行が0、㋒では第一行(3, 3, 3)と第二行(−1, −1, −1)が比例するので階数が2未満になる。",
      "ウ": "㋑では二つの勾配の第三成分の符号が、第一・第二成分の比例関係と合わない。したがってヤコビ行列の階数は2となる。",
      "エ": "㋒は二行が比例するため臨界点である。㋑では二行が一次独立であり、㋐では第一行が零行となる。",
      "オ": "㋒は臨界点であるが、原点も含まれる。原点では三次の第一成分の偏微分がすべて0で、第二行だけが残る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q036",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "ロジスティック方程式の増減と解",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある微分方程式に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ある生物の個体数の変化が、個体数に比例する増加要因と、個体数の2乗に比例する減少要因のみによるとき、時刻tにおける個体数y＝y(t)は、微分方程式\n\ndy／dt＝py−qy²\n\nを満たす。ここで、p、qは正の比例定数である。したがって、個体数yはr＝［㋐］とおくと、0＜y＜rにおいて［㋑］であり、r＜yにおいて［㋒］となる。また、この微分方程式の一般解は、積分定数Cを用いてy＝［㋓］と表される。」",
    "choices": {
      "ア": "p／q ／ 単調増加 ／ 単調減少 ／ r／(1＋Ce^(−pt))",
      "イ": "p／q ／ 単調増加 ／ 単調減少 ／ r／(1＋Ce^(pt))",
      "ウ": "p／q ／ 単調減少 ／ 単調増加 ／ r／(1＋Ce^(−pt))",
      "エ": "q／p ／ 単調減少 ／ 単調増加 ／ r／(1＋Ce^(−pt))",
      "オ": "q／p ／ 単調減少 ／ 単調増加 ／ r／(1＋Ce^(pt))"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "右辺はy(p−qy)なので、正の平衡値r＝p／qより小さければ増加し、大きければ減少する。正の解ではz＝1／yとしてz′＋pz＝qを解くと、解の分母にCe^(−pt)が現れる。",
    "choiceExplanations": {
      "ア": "右辺はy(p−qy)なので、正の平衡値r＝p／qより小さければ増加し、大きければ減少する。正の解ではz＝1／yとしてz′＋pz＝qを解くと、解の分母にCe^(−pt)が現れる。",
      "イ": "平衡値と増減は妥当である。逆数の微分方程式の斉次解はe^(−pt)に比例し、e^(pt)ではない。",
      "ウ": "解の形は妥当だが、増減が逆である。yが正でrより小さいときはp−qyが正なので、個体数は増加する。",
      "エ": "正の平衡値はp−qy＝0を解いたp／qである。右辺の符号はこの値を境に、正から負に変わる。",
      "オ": "平衡値と増減が逆であり、解の指数の符号も異なる。z＝1／yの一次方程式を使うと、時間とともにe^(−pt)の項が減衰する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q037",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "三角領域上の重積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の重積分の値はいくらか。\n\n∬_D dx dy／√(4−x²),　D＝｛(x, y)∈ℝ²｜0＜x＜y＜1｝",
    "choices": {
      "ア": "π／6＋√3−2",
      "イ": "(π−√2)／6",
      "ウ": "(π−1)／3",
      "エ": "π／4",
      "オ": "π／2−√3＋1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "xを固定するとyの範囲はxから1であり、積分は∫₀¹ (1−x)／√(4−x²) dxになる。逆正弦と平方根の原始関数で評価するとπ／6＋√3−2となる。",
    "choiceExplanations": {
      "ア": "xを固定するとyの範囲はxから1であり、積分は∫₀¹ (1−x)／√(4−x²) dxになる。逆正弦と平方根の原始関数で評価するとπ／6＋√3−2となる。",
      "イ": "三角領域の縦の長さは1−xである。端点x＝1で√(4−x²)＝√3になるため、平方根の寄与は√3−2である。",
      "ウ": "定数項の積分にはarcsin(x／2)を用いる。0から1までの差はπ／6で、さらに−xの項から√3−2を加える。",
      "エ": "積分範囲では0≤x≤1なので被積分関数は最大でも1／√3である。領域の面積は1／2だから、積分値はπ／4には届かない。",
      "オ": "逆正弦の端点はarcsin(1／2)＝π／6である。平方根の端点差は√3−2なので、この和とは一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q038",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "点での微分係数と近傍の単調性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ℝ上の関数\n\nf(x)＝x／2−x² sin(1／x)　（x≠0）\nf(0)＝0\n\nに関する記述として正しいのはどれか。",
    "choices": {
      "ア": "f′(0)＝0であり、原点のある近傍においてf(x)は定数関数である。",
      "イ": "f′(0)＜0であり、原点のある近傍においてf(x)は減少関数である。",
      "ウ": "f′(0)＜0であるが、原点のどんな近傍においてもf(x)は減少関数ではない。",
      "エ": "f′(0)＞0であり、原点のある近傍においてf(x)は増加関数である。",
      "オ": "f′(0)＞0であるが、原点のどんな近傍においてもf(x)は増加関数ではない。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "差商を取るとf′(0)＝1／2である。一方、x＝1／((2k＋1)π)ではf′(x)＝−1／2であり、どの近傍にも局所的に減少する点がある。",
    "choiceExplanations": {
      "ア": "差商は1／2−x sin(1／x)であり、振動項はx→0で0に収束する。原点での傾きは1／2なので近傍で定数にはならない。",
      "イ": "原点での傾きは差商の極限1／2で正である。減少関数なら微分可能な点の傾きは非正となる。",
      "ウ": "原点の近くに減少関数としての単調性はないが、微分係数を負とする点が誤りである。x sin(1／x)は絶対値が｜x｜以下である。",
      "エ": "原点を外すとf′(x)＝1／2−2x sin(1／x)＋cos(1／x)である。1／xをπの正の奇数倍にすれば、原点にいくらでも近い点で傾きが−1／2になる。",
      "オ": "差商を取るとf′(0)＝1／2である。一方、x＝1／((2k＋1)π)ではf′(x)＝−1／2であり、どの近傍にも局所的に減少する点がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q039",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "広義積分の収束",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ℝの区間[0, ∞)上の連続関数fᵢ（i＝1, 2, 3）を\n\nf₁(x)＝1／(eˣ＋e^(−x))\nf₂(x)＝0（x＝0）、sin²x／(x√x)（x＞0）\nf₃(x)＝lim_(n→∞) (1／√n)e^(−x／n)\n\nで定義するとき、これらのうち、広義積分∫₀^∞ fᵢ(x) dxが収束するもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "f₁",
      "イ": "f₁、f₂、f₃",
      "ウ": "f₁、f₃",
      "エ": "f₂",
      "オ": "該当なし"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "f₁には減衰指数の上界があり、f₂は原点付近で√x以下、無限遠でx^(−3／2)以下となる。f₃は各xで極限が0の関数なので積分値は0である。",
    "choiceExplanations": {
      "ア": "f₁はe^(−x)に抑えられるので積分できる。f₂も無限遠でx^(−3／2)に抑えられ、f₃は各点で0となる。",
      "イ": "f₁には減衰指数の上界があり、f₂は原点付近で√x以下、無限遠でx^(−3／2)以下となる。f₃は各xで極限が0の関数なので積分値は0である。",
      "ウ": "f₁とf₃の積分は収束する。f₂も原点ではsin²x≤x²、無限遠ではsin²x≤1を使って収束を確認できる。",
      "エ": "f₂は収束するが、f₁とf₃も含まれる。f₁の分母はeˣ以上であり、f₃はxによらず0である。",
      "オ": "どの関数も広義積分が存在する。特にf₃の定義は先に各xで極限を取るので、f₃自体を積分した値は0である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q040",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "留数定理による余弦の広義積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑に当てはまるものの組合せとして正しいのは次のうちではどれか。\n\n「広義積分I＝∫_(−∞)^∞ (cos x)／(x²＋1) dxの値を、留数定理を用いて求める。f(z)＝［㋐］とすると、Iはlim_(R→∞)∫_(C_R) f(z) dzの実部に等しい。ここで、C_Rは図のような、複素平面における原点中心半径Rの半円周と実軸上の長さ2Rの線分からなる、向き付けられた閉曲線である。留数定理より、∫_(C_R) f(z) dzはC_Rの囲む領域上のf(z)の極におけるその留数の和の2πi倍に等しいことから、I＝［㋑］となる。」",
    "choices": {
      "ア": "cos z／(z²＋1) ／ −(e＋e⁻¹)π／2",
      "イ": "cos z／(z²＋1) ／ (e＋e⁻¹)π／4",
      "ウ": "cos z／(z²＋1) ／ (e＋e⁻¹)π／2",
      "エ": "e^(iz)／(z²＋1) ／ π／e",
      "オ": "e^(iz)／(z²＋1) ／ (e−e⁻¹)π"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "上半平面では｜e^(iz)｜≤1なので半円弧の積分はO(1／R)で消える。極iの留数はe⁻¹／(2i)で、2πiを掛けて実部を取るとπ／eである。",
    "choiceExplanations": {
      "ア": "図の経路は反時計回りであり、負の向きの係数は付かない。さらにcos zは上半円で指数的に大きくなる項を含むため、弧の寄与は捨てられない。",
      "イ": "cos zの留数を用いた閉曲線積分は、実軸部分の極限そのものではない。上半平面で大きくなる指数項があるので、弧の積分が0になる形に変える必要がある。",
      "ウ": "この値はcos z／(z²＋1)の極iの留数から出る閉曲線積分の値である。cos zでは上側の弧の積分が残り、実軸の求める積分にはならない。",
      "エ": "上半平面では｜e^(iz)｜≤1なので半円弧の積分はO(1／R)で消える。極iの留数はe⁻¹／(2i)で、2πiを掛けて実部を取るとπ／eである。",
      "オ": "積分に使う関数は正しいが、囲まれる極はiだけである。そこではe^(iz)＝e⁻¹となるため、eの項は加わらない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q040.webp"
    ],
    "imageAltTexts": [
      "上半平面の半円弧と実軸の線分からなる反時計回りの閉曲線C_R"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q041",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "ルベーグ積分と可測な切断",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "命題㋐、㋑、㋒のうち、真であるもののみを全て挙げているのはどれか。ただし、ℝ内のルベーグ非可測集合の存在は認めるものとする。\n㋐　ℝの区間(0, ∞)上で定義された関数sin x／xはルベーグ積分可能である。\n㋑　ℝ上で定義された実数値関数f(x)がルベーグ積分可能であるとき、lim_(y→0) ∫_ℝ ｜f(x＋y)−f(x)｜ dx＝0が成り立つ。\n㋒　f(x, y)をℝ²上で定義されたルベーグ可測な実数値関数とする。このとき、任意にx∈ℝを固定すると、f(x, y)はyの関数としてℝ上ルベーグ可測となる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑はまず台がコンパクトな連続関数で示し、任意のL¹関数に対してはその近似と平行移動によるL¹ノルムの不変性を使える。㋐は絶対積分が発散し、㋒は例外のxで非可測な切断を持ち得る。",
    "choiceExplanations": {
      "ア": "㋑はL¹ノルムでの平行移動の連続性である。㋐では各周期内の｜sin x｜が一定以上の部分を拾うと調和級数型の下界が生じ、絶対積分が発散する。",
      "イ": "㋐の絶対積分は発散し、㋒も全てのxについては成立しない。非可測集合Eに対して｛0｝×Eの指示関数はℝ²で可測だが、x＝0での切断は非可測である。",
      "ウ": "㋑はまず台がコンパクトな連続関数で示し、任意のL¹関数に対してはその近似と平行移動によるL¹ノルムの不変性を使える。㋐は絶対積分が発散し、㋒は例外のxで非可測な切断を持ち得る。",
      "エ": "㋑は成り立つが、㋒の扱いには例外がある。二次元で零集合となる直線上に限って非可測な集合の指示関数を置くと、そのxで切断が非可測になる。",
      "オ": "ルベーグ測度の完備性により、ℝ²の零集合の任意の部分集合は可測である。その部分集合を一本の縦線上の非可測な切断として選べるので、㋒は成り立たない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q042",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "一階偏微分方程式の特性曲線",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xy平面ℝ²内の部分集合｛(x, y)∈ℝ²｜x＋y≥1｝の近傍上で定義されているC¹級関数uは、偏微分方程式\n\ny∂u／∂x＋x∂u／∂y＝y\n\nを満たし、直線x＋y＝1上でu(x, y)＝x²を満たしているとする。このとき、u(2, 1)はいくらか。\nなお、必要であれば、上記偏微分方程式の特性曲線(x(t), y(t), u(t))の方程式は、dx／dt＝y、dy／dt＝x、du／dt＝yを満たすことを用いてよい。",
    "choices": {
      "ア": "−5",
      "イ": "−2",
      "ウ": "−1",
      "エ": "2",
      "オ": "4"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "特性曲線に沿ってx²−y²とu−xが一定である。(2, 1)を通る曲線はx＋y＝1と(2, −1)で交わり、二点のx座標が等しいのでuは初期値2²＝4のままである。",
    "choiceExplanations": {
      "ア": "特性曲線ではu−xが保存される。境界の交点ではx＝2かつu＝4なので、u(2, 1)に負の値は出ない。",
      "イ": "境界上の初期点はx²−y²＝3とx＋y＝1から(2, −1)となる。境界でu＝x²を入れるのでu−x＝2である。",
      "ウ": "特性曲線の不変量はx²−y²とu−xである。境界のyが−1になっても、指定された初期値はyではなくx²である。",
      "エ": "2はu−xの保存値である。求めるuには評価点のx＝2を加える。",
      "オ": "特性曲線に沿ってx²−y²とu−xが一定である。(2, 1)を通る曲線はx＋y＝1と(2, −1)で交わり、二点のx座標が等しいのでuは初期値2²＝4のままである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q043",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "奇関数のフーリエ正弦係数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ℝの半開区間(−1, 1]上の関数f(x)＝x³を、周期2をもつようにℝ上全体に拡張した関数のフーリエ級数は∑_(n＝1)^∞ bₙ sin(nπx)（ただし、bₙは定数）となる。このとき、係数b₂はいくらか。",
    "choices": {
      "ア": "3／(2π³)−1／π",
      "イ": "4／(3π²)−1／π",
      "ウ": "1／(2π³)＋1／π",
      "エ": "3／(4π)−1／3",
      "オ": "π³／2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "b₂＝2∫₀¹ x³ sin(2πx) dxである。部分積分を繰り返すと、k＝2πとして2(−1／k＋6／k³)を得る。",
    "choiceExplanations": {
      "ア": "b₂＝2∫₀¹ x³ sin(2πx) dxである。部分積分を繰り返すと、k＝2πとして2(−1／k＋6／k³)を得る。",
      "イ": "境界の正弦が0になるため、部分積分で得る1／k²の境界項は消える。補正として残るのは1／k³に比例する項である。",
      "ウ": "最初の境界項は−2cos(2π)／(2π)＝−1／πで、符号は負である。残りは部分積分から3／(2π³)となる。",
      "エ": "角周波数2πを使って、x³を微分しながら部分積分する。端点で正弦が消えるため、定数−1／3の項は出ない。",
      "オ": "係数の絶対値は2∫₀¹ x³ dx＝1／2以下である。π³／2はこの上界を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q044",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "微分方程式のべき級数解",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "微分方程式dy／dx＝x−y²の原点x＝0における整級数解y(x)＝∑_(n＝0)^∞ aₙxⁿ（ただし、aₙは定数）で、y(0)＝1を満たすもののx⁴の係数a₄はいくらか。",
    "choices": {
      "ア": "−7／10",
      "イ": "−2／5",
      "ウ": "4／13",
      "エ": "1／3",
      "オ": "17／12"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "低次からa₀＝1、a₁＝−1、a₂＝3／2、a₃＝−4／3を得る。x³の項を比較すると4a₄＝−2a₀a₃−2a₁a₂＝17／3となる。",
    "choiceExplanations": {
      "ア": "定数項からa₁＝−1、一次の項からa₂＝3／2を得る。三次まで突き合わせると4a₄は正になる。",
      "イ": "a₀＝1とa₁＝−1を使うと3a₃＝−(2a₂＋a₁²)＝−4である。三次の係数は−(2a₃＋2a₁a₂)だから正になる。",
      "ウ": "x³の係数の比較より4a₄＝−2(a₃＋a₁a₂)である。かっこ内は−4／3−3／2＝−17／6となる。",
      "エ": "x³の係数にはa₀a₃だけでなくa₁a₂から生じる項もある。両方を二倍して符号を反転すると4a₄＝17／3となる。",
      "オ": "低次からa₀＝1、a₁＝−1、a₂＝3／2、a₃＝−4／3を得る。x³の項を比較すると4a₄＝−2a₀a₃−2a₁a₂＝17／3となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q045",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "グリーンの公式と線積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xy平面ℝ²内のtでパラメータ表示された曲線r(t)＝(t, 1−√(1−t²))（0≤t≤1）において、t＝0からt＝1の方向に向きを入れたものをCとする。このとき、線積分\n\n∫_C ｛(3x²y²＋2xy³−y)dx＋(2x³y＋3x²y²＋x)dy｝\n\nの値はいくらか。\nなお、必要であれば、グリーンの公式∫_A (P dx＋Q dy)＝∬_B (∂Q／∂x−∂P／∂y) dx dyを用いてよい。ここで、Bはxy平面内の区分的に滑らかな境界をもつ有界閉領域で、AはBの境界に反時計回りの向きを入れたものであり、P、QはそれぞれBの近傍において定義された滑らかな関数である。",
    "choices": {
      "ア": "−π／4＋5／2",
      "イ": "2",
      "ウ": "π／4＋3／2",
      "エ": "π／2＋1",
      "オ": "3π／4＋1／2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "(1, 1)から(0, 1)を経て原点に戻ると、閉曲線の積分は2×π／4＝π／2になる。足した水平線の積分は−1、y軸上は0なので、Cの積分はπ／2＋1である。",
    "choiceExplanations": {
      "ア": "Cを上の水平線とy軸で閉じると、囲まれる領域は単位円の四分円である。反時計回りの閉曲線に対し、グリーンの公式の被積分関数は＋2となる。",
      "イ": "多項式項の多くは∂Q／∂xと∂P／∂yで相殺する。残る定数2の面積積分からπ／2の寄与がある。",
      "ウ": "閉曲線が囲む面積はπ／4である。差∂Q／∂x−∂P／∂yが2なので、閉曲線全体の積分はπ／2となる。",
      "エ": "(1, 1)から(0, 1)を経て原点に戻ると、閉曲線の積分は2×π／4＝π／2になる。足した水平線の積分は−1、y軸上は0なので、Cの積分はπ／2＋1である。",
      "オ": "Cを閉じるために加えたy＝1上の線分の積分は∫₁⁰ (3x²＋2x−1) dx＝−1となる。したがって補正は＋1である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q046",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "空箱の期待割合",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "nを正の整数とする。3n個の玉と2n個の空の箱がある。1つの玉に対し、2n個の箱の中から1つの箱を無作為に選び、その玉を選んだ箱に入れる。異なる玉に対する箱の選択が独立になるようにこの操作を繰り返し、全ての玉を箱に入れ終わったときに、空のままになっている箱の個数の期待値をMₙとする。このとき、lim_(n→∞) Mₙ／(2n)はいくらか。",
    "choices": {
      "ア": "1／8",
      "イ": "1／e^(3／2)",
      "ウ": "1／e^(2／3)",
      "エ": "3／(2e)",
      "オ": "2／3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "特定の箱が空である確率は(1−1／(2n))^(3n)であり、期待値の線形性からMₙ／(2n)も同じ値である。これを極限に移すとe^(−3／2)となる。",
    "choiceExplanations": {
      "ア": "1／8はn＝1で特定の箱を3回とも避ける確率である。極限では箱の数も増えて1回ごとの回避確率が変わる。",
      "イ": "特定の箱が空である確率は(1−1／(2n))^(3n)であり、期待値の線形性からMₙ／(2n)も同じ値である。これを極限に移すとe^(−3／2)となる。",
      "ウ": "指数の大きさは投入回数を箱数で割った3n／(2n)で求まる。比を逆にすると、1箱あたりの投入回数が入れ替わる。",
      "エ": "1箱あたりの投入回数3／2は、極限の指数に入る。1／eに掛ける係数ではない。",
      "オ": "箱数と玉数の比だけで、空箱の期待割合は求まらない。複数の玉が同じ箱に入るため、各回に一つの箱を避ける確率を掛け合わせる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q047",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "二状態マルコフ連鎖の追加人数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある事業所の各年度の決算は、黒字か赤字のいずれか一方である。1年度経過しても黒字のまま維持される確率は7／10であり、赤字のまま維持される確率は1／5である。1年度経過して黒字から赤字に推移する確率は3／10であり、赤字から黒字に推移する確率は4／5である。また、いずれの確率も、これらの維持及び推移以前の決算の履歴には影響されないものとする。\nこの事業所では、1年度経過しても黒字のままであると3人の人員が追加され、赤字のままであると人員の増減は起きない。1年度経過して黒字から赤字に推移すると1人の人員が追加され、赤字から黒字に推移すると2人の人員が追加される。黒字決算となったある年度を1年度目とし、その後n年度目からn＋1年度目への決算の推移による人員追加人数の期待値をrₙとする。このとき、lim_(n→∞) rₙはいくらか。",
    "choices": {
      "ア": "20／11",
      "イ": "104／55",
      "ウ": "24／11",
      "エ": "25／11",
      "オ": "243／55"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "黒字確率pの更新はp↦(7／10)p＋(4／5)(1−p)で、固定点8／11に収束する。これと赤字確率3／11で条件付き期待値12／5と8／5を平均すると24／11となる。",
    "choiceExplanations": {
      "ア": "定常分布は黒字8／11、赤字3／11である。各状態での翌年度の平均追加人数は黒字12／5、赤字8／5なので、それらの加重平均を取る。",
      "イ": "黒字からの条件付き期待値には黒字継続の3人と赤字移行の1人の両方が入る。7／10×3＋3／10×1＝12／5である。",
      "ウ": "黒字確率pの更新はp↦(7／10)p＋(4／5)(1−p)で、固定点8／11に収束する。これと赤字確率3／11で条件付き期待値12／5と8／5を平均すると24／11となる。",
      "エ": "赤字からの追加人数は黒字に戻った場合の2人であり、条件付き期待値は2×4／5＝8／5となる。黒字側と重み付き平均すると24／11である。",
      "オ": "1年度の推移で追加される人数は最大でも3人である。243／55はその上限を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q048",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "一元配置分散分析",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "銘柄米A、B、Cのそれぞれの産地から1アールの田んぼ5か所を無作為に選び、それぞれの田んぼでの各銘柄米の収量をキログラム単位で量ったところ、図表のようになった。\n\n分散分析により、各銘柄の1アール当たりの収量の分散が同一であるとして、各銘柄の1アール当たりの収量に差がないという仮説を、危険率5％で検定する際の記述として最も妥当なのはどれか。\nただし、自由度n、mのF分布に従う確率変数Xについて、P(X≥a)＝0.05を満たすaの小数第二位までの値F_(n,m)(0.05)は各選択肢で示されたものとする。なお、必要であれば、確率変数XとYが独立であり、かつ、それぞれ自由度nとmのカイ二乗分布に従うとき、確率変数(X／n)／(Y／m)が自由度n、mのF分布に従うことを用いてよい。",
    "choices": {
      "ア": "F_(2,12)(0.05)＝3.89を用いることにより仮説は採択される。",
      "イ": "F_(2,14)(0.05)＝3.74を用いることにより仮説は棄却される。",
      "ウ": "F_(12,14)(0.05)＝2.53を用いることにより仮説は採択される。",
      "エ": "F_(14,2)(0.05)＝19.42を用いることにより仮説は採択される。",
      "オ": "F_(14,12)(0.05)＝2.64を用いることにより仮説は棄却される。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "群間と群内の平方和は40と78、自由度はそれぞれ3−1＝2と15−3＝12である。F値(40／2)／(78／12)＝40／13は3.89未満なので、5％水準では仮説を棄却しない。",
    "choiceExplanations": {
      "ア": "群間と群内の平方和は40と78、自由度はそれぞれ3−1＝2と15−3＝12である。F値(40／2)／(78／12)＝40／13は3.89未満なので、5％水準では仮説を棄却しない。",
      "イ": "14は全体の自由度であり、分母の群内自由度は各群の4を足した12である。F値は40／13で、5％の臨界値を下回る。",
      "ウ": "分子には銘柄ごとの平均の変動を使うので、自由度は2である。分母は群内のばらつきの自由度12となる。",
      "エ": "14は群間と群内を合わせた自由度である。F比の分子と分母には分割したそれぞれの自由度2と12を使う。",
      "オ": "分母の自由度12は正しいが、分子の自由度は銘柄数から1を引いた2である。対応する臨界値3.89より観測値が小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q048.webp"
    ],
    "imageAltTexts": [
      "銘柄米A、B、Cの田んぼ5か所ずつの収量"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q049",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "指数誤差つき回帰の最尤推定",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "二つの量(x, y)を測定したところ、5組のデータ\n\n｛(xᵢ, yᵢ)｝_(i＝1)^5＝｛(1, 2), (2, 1), (2, 4), (3, 3), (4, 2)｝\n\nが得られた。x、yの関係がy＝ax＋ε（a＞0）で表せるとする。このとき、最尤推定法max_(a,λ) ∑_(i＝1)^5 logₑ p_λ(εᵢ)でパラメータ(a, λ)を求めると、(a, λ)の推定値はいくらか。\nただし、εは、λ＞0をパラメータとして、確率密度関数p_λ(ε)＝λexp(−λε)（ε≥0）、0（ε＜0）をもつ指数分布に従うものとする。",
    "choices": {
      "ア": "(1／2, 5／6)",
      "イ": "(1／2, 6／5)",
      "ウ": "(1, 1)",
      "エ": "(2, 5／6)",
      "オ": "(2, 6／5)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "誤差を全て非負にするにはa≤min(yᵢ／xᵢ)＝1／2であり、固定したλで対数尤度はaとともに増える。a＝1／2で誤差の和は6なので、5 log λ−6λを最大にするλは5／6である。",
    "choiceExplanations": {
      "ア": "誤差を全て非負にするにはa≤min(yᵢ／xᵢ)＝1／2であり、固定したλで対数尤度はaとともに増える。a＝1／2で誤差の和は6なので、5 log λ−6λを最大にするλは5／6である。",
      "イ": "aは妥当であるが、6／5は誤差の標本平均である。指数分布の率λは平均誤差の逆数となる。",
      "ウ": "a＝1では観測値(2, 1)に誤差−1が生じる。負の誤差の密度は0なので、この傾きの尤度は0である。",
      "エ": "(4, 2)の観測ではa＝2だと予測値8が観測値2を超える。負の誤差が生じるため、λの値にかかわらず尤度は0である。",
      "オ": "a＝2では全観測で誤差を非負にする制約を満たさない。λについても、許容される最適なaにおける平均誤差の逆数5／6を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q050",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "吸収マルコフ連鎖の過渡状態",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の推移確率行列Pは、状態1、2、3、4とそれらの間の推移確率を表したものである。すなわち、Pの各成分p_(i,j)（i, j∈｛1, 2, 3, 4｝）は状態iから状態jへの推移確率を表している。初期状態が状態3であり、mステップ後の状態が状態kである確率をπₖ(m)と表すものとする。lim_(m→∞) πₖ(m)＝0となる状態kのみを全て挙げているのはどれか。\n\nP＝［［1, 0, 0, 0］、［0, 1, 0, 0］、［1／3, 1／3, 1／6, 1／6］、［1／3, 1／3, 0, 1／3］］",
    "choices": {
      "ア": "1、3",
      "イ": "2、4",
      "ウ": "3",
      "エ": "3、4",
      "オ": "4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "状態3と4のどちらからも、次に3または4にとどまる確率は1／3である。この二状態にいる確率の合計は(1／3)^mとなり、吸収状態1と2は初回から正の確率を持つ。",
    "choiceExplanations": {
      "ア": "状態1は吸収状態で、初回に状態3から1に移る確率が1／3ある。その事象では以後も1にいるため、状態1の確率は0にならない。",
      "イ": "状態2も吸収状態であり、初回に1／3の確率で到達すると、その後は出ない。状態4は毎回吸収状態へ移る確率があるため、その滞在確率は極限で0になる。",
      "ウ": "状態3の滞在確率は0に収束する。状態4からも各ステップで2／3の確率で吸収状態へ出るので、状態4を加える。",
      "エ": "状態3と4のどちらからも、次に3または4にとどまる確率は1／3である。この二状態にいる確率の合計は(1／3)^mとなり、吸収状態1と2は初回から正の確率を持つ。",
      "オ": "状態4に加えて状態3の確率も0になる。初期状態3に戻るには連続して状態3に残る必要があり、その確率は(1／6)^mである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q051",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "情報理論",
    "topicTags": [
      "同時・周辺エントロピーの大小",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "確率変数X∈｛1, 2｝、Y∈｛1, 2, 3｝の同時分布が表のように与えられるとする。このとき、X、Yの同時エントロピーH(X, Y)＝−∑ₓ∑ᵧ P(X＝x, Y＝y)log₂P(X＝x, Y＝y)、周辺エントロピーH(X)＝−∑ₓ P(X＝x)log₂P(X＝x)、H(Y)＝−∑ᵧ P(Y＝y)log₂P(Y＝y)について成り立つ関係式として最も妥当なのはどれか。\nただし、log₂3＝1.585、log₂5＝2.321とする。",
    "choices": {
      "ア": "H(X)＜H(Y)＜H(X, Y)＝H(X)＋H(Y)",
      "イ": "H(X)＜H(Y)＜H(X, Y)＜H(X)＋H(Y)",
      "ウ": "H(X, Y)＝H(X)＋H(Y)＜H(X)＜H(Y)",
      "エ": "H(Y)＜H(X)＜H(X, Y)＝H(X)＋H(Y)",
      "オ": "H(Y)＜H(X)＜H(X, Y)＜H(X)＋H(Y)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "周辺分布からH(X)は約0.811、H(Y)は約1.477となる。全てのセルが正なのでH(X, Y)＞H(Y)であり、独立でないためH(X, Y)は周辺エントロピーの和より小さい。",
    "choiceExplanations": {
      "ア": "同時エントロピーが和と等しいのは独立な場合である。表ではP(X＝1, Y＝2)＝1／8と周辺確率の積(3／4)(3／16)が異なる。",
      "イ": "周辺分布からH(X)は約0.811、H(Y)は約1.477となる。全てのセルが正なのでH(X, Y)＞H(Y)であり、独立でないためH(X, Y)は周辺エントロピーの和より小さい。",
      "ウ": "同時エントロピーはH(X)に条件付きエントロピーH(Y｜X)を加えた値である。YはXを固定しても確定しないため、H(X, Y)はH(X)より大きい。",
      "エ": "Xの周辺分布は(3／4, 1／4)、Yは(1／2, 3／16, 5／16)であり、H(Y)の方が大きい。加えて、同時分布は周辺分布の積ではない。",
      "オ": "和との厳密な不等号は妥当であるが、周辺エントロピーの順番が逆である。表を行方向と列方向に足し、各周辺分布を式に代入するとH(X)＜H(Y)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q051.webp"
    ],
    "imageAltTexts": [
      "XとYの六つの組合せの同時確率"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q052",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "計算機数学",
    "topicTags": [
      "文脈自由文法が生成する言語の一致",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次のL₁、L₂、L₃のうち、文脈自由文法L＝(｛S｝, ｛a｝, ｛S→aSa｜ε｝, S)と等価な文法のみを全て挙げているのはどれか。\n\nL₁＝(｛S₀, S, A, X｝, ｛a｝, ｛S₀→AX｜AA, S→AX｜AA｜ε, X→SA, A→a｝, S₀)\nL₂＝(｛S, S₀｝, ｛a｝, ｛S₀→aSa｜aa｜ε, S→aSa｜aa｝, S₀)\nL₃＝(｛S₀, S, A, X｝, ｛a｝, ｛S₀→XA｜AA｜ε, S→AX｜AA, X→SA, A→a｝, S₀)",
    "choices": {
      "ア": "L₁",
      "イ": "L₁、L₂",
      "ウ": "L₂",
      "エ": "L₂、L₃",
      "オ": "L₃"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "L₂は開始記号で空文字とaaを選べ、再帰規則が長さを2ずつ増やす。L₃も開始記号のεとAAに加えてXA→SAAにより残りの偶数長を生成し、L₁だけは空文字を生成しない。",
    "choiceExplanations": {
      "ア": "Lは空文字εを含む偶数長のa列を生成する。L₁の開始記号はどの規則を使っても少なくとも二つのAを出すため、空文字を生成できない。",
      "イ": "開始記号からεを導出できるL₂はLと等価である。L₁ではS→εを使っても、開始記号が導入した二つのaが残る。",
      "ウ": "L₂は空文字と全ての正の偶数長を生成する。L₃でもSが正の偶数長を生成し、開始記号がε、aa、またはSからの列にaaを加えたものを生成する。",
      "エ": "L₂は開始記号で空文字とaaを選べ、再帰規則が長さを2ずつ増やす。L₃も開始記号のεとAAに加えてXA→SAAにより残りの偶数長を生成し、L₁だけは空文字を生成しない。",
      "オ": "L₃は等価だが、L₂も含まれる。L₂のSが生成する長さは2、4、6と続き、S₀の規則で空文字を補うことができる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q055",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "中心差分を使ったニュートン法",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次のプログラムを実行したときに表示される値に最も近い値は次のうちではどれか。ただし、pow(double a, double b)はaᵇを返り値とする関数とする。\n\n#include<stdio.h>\n#include<math.h>\ndouble f(double x, double a) {\n    return 1/(1+pow(2.0, -x))-a;\n}\n\nint main(void) {\n    int i, T=10000;\n    double x=0.0, g, a=16.0/17.0, eps=0.0000001;\n    for(i=0; i<T; i++) {\n        g=(f(x+eps, a)-f(x-eps, a))/eps/2.0;\n        x=x-f(x, a)/g;\n    }\n    printf(\"%f\\n\", x);\n\n    return 0;\n}",
    "choices": {
      "ア": "2.000",
      "イ": "2.500",
      "ウ": "3.000",
      "エ": "3.500",
      "オ": "4.000"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "中心差分で傾きを近似したニュートン法であり、初期値0からf(x, a)＝0の根に収束する。1／(1＋2^(−x))＝16／17を解くと2^(−x)＝1／16、すなわちx＝4となる。",
    "choiceExplanations": {
      "ア": "x＝2では1／(1＋2⁻²)＝4／5で、設定された16／17に届かない。更新はこの差が0になる点を探している。",
      "イ": "gはfの中心差分による微分近似値である。根を求める式では2^(−x)＝1／16が必要で、x＝2.5ではこの条件を満たさない。",
      "ウ": "x＝3では分数部分が8／9となり、f(x, a)＜0である。微分が正なので、この点では更新でxが大きくなる。",
      "エ": "x＝3.5では2^(−x)＞1／16なので、分数部分は16／17より小さい。反復の根はさらに右にある。",
      "オ": "中心差分で傾きを近似したニュートン法であり、初期値0からf(x, a)＝0の根に収束する。1／(1＋2^(−x))＝16／17を解くと2^(−x)＝1／16、すなわちx＝4となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q056",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "三つの指定数字を全て含む数列の個数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "A₁～A₄をそれぞれ1以上9以下の整数とする。長さ4の数列A₁、A₂、A₃、A₄で次の条件を全て満たすものはいくつあるか。\n・数列中に1が含まれる。\n・数列中に4が含まれる。\n・数列中に7が含まれる。",
    "choices": {
      "ア": "144個",
      "イ": "180個",
      "ウ": "204個",
      "エ": "1476個",
      "オ": "2605個"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "余る1枠が指定外の数字なら、6通りそれぞれについて4!通り並べられる。指定数字の重複なら3通りそれぞれ4!／2!通りであり、合計は180個である。",
    "choiceExplanations": {
      "ア": "144個は指定の三つ以外の数字が一つ入る場合の6×4!である。指定された数字のどれかが二度現れる場合も数える。",
      "イ": "余る1枠が指定外の数字なら、6通りそれぞれについて4!通り並べられる。指定数字の重複なら3通りそれぞれ4!／2!通りであり、合計は180個である。",
      "ウ": "四つの数字が全て異なる場合は144個、同じ数字がある場合は36個である。重複する数字の二つの出現を区別すると過大に数える。",
      "エ": "長さ4のうち三つの数字が指定されている。四つ目が指定外か三つのうちの重複かで漏れなく分けると、両ケースを足して180個である。",
      "オ": "9⁴個の全数から包除原理を使うと9⁴−3×8⁴＋3×7⁴−6⁴である。三種類の指定数字のいずれかを欠く数列を除くと180個となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q057",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "平面的グラフと完全グラフ",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "無向グラフGに対し、Gの頂点と辺を平面上に適切に配置し直すことで、頂点以外では二つの辺が交差しないように描けるとき、Gを平面的グラフという。次のグラフ(a)～(e)のうち、平面的グラフであるもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "(a)",
      "イ": "(a)、(b)、(c)、(e)",
      "ウ": "(a)、(b)、(d)",
      "エ": "(a)、(c)",
      "オ": "(a)、(d)、(e)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "(a)は三角形であり、(b)はK₄、(c)は5頂点の閉路、(e)は中央の二頂点を両端とする枝分かれのない経路を互いに交差させずに描ける。(d)のK₅だけは辺数が平面単純グラフの上限3×5−6を超える。",
    "choiceExplanations": {
      "ア": "(a)の三角形はそのまま平面に描ける。(b)もK₄の一頂点を外側の三角形の内側に置けば、交差せずに描ける。",
      "イ": "(a)は三角形であり、(b)はK₄、(c)は5頂点の閉路、(e)は中央の二頂点を両端とする枝分かれのない経路を互いに交差させずに描ける。(d)のK₅だけは辺数が平面単純グラフの上限3×5−6を超える。",
      "ウ": "(b)は一頂点を三角形の内部に置くことで平面的になる。(d)は5頂点10辺で、平面単純グラフの辺数上限9を超える。",
      "エ": "(c)で辺が交差する点は頂点ではなく、辺を順にたどると単なる5頂点の閉路である。(b)や(e)も頂点の配置を変えると交差を除ける。",
      "オ": "(e)では、中央の二点を結ぶ各二辺の経路を別々に並べられる。(d)は全頂点の対が辺で結ばれたK₅なので、(e)と異なり平面的に描けない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q057.webp"
    ],
    "imageAltTexts": [
      "五つの無向グラフ(a)～(e)の頂点と辺"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q058",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "半正定値順序における極小元",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "実対称行列X、Yに対して、X−Yが半正定値行列となるときをX≽Yと表すこととする。≽は半順序関係である。次に示す行列A～Dのうち、集合｛A, B, C, D｝における極小元として正しいのはどれか。\nただし、実対称行列が半正定値であるとは、その固有値が全て非負であることをいう。\n\nA＝［［−4, −1］、［−1, 3］］、B＝［［−3, −1］、［−1, 5］］、C＝［［1, −4］、［−4, 7］］、D＝［［4, −1］、［−1, 10］］",
    "choices": {
      "ア": "A",
      "イ": "B",
      "ウ": "C",
      "エ": "D",
      "オ": "該当なし"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "B−AとD−Aは正の対角行列である。C−Aも左上成分5と行列式11が正なので正定値となり、Aは他の全てより小さい。",
    "choiceExplanations": {
      "ア": "B−AとD−Aは正の対角行列である。C−Aも左上成分5と行列式11が正なので正定値となり、Aは他の全てより小さい。",
      "イ": "B−Aの対角成分は1、2で、非対角成分は0である。したがってA≼Bであり、Bには自分より小さい元がある。",
      "ウ": "C−Aの対角成分は5、4、非対角成分は−3であり、行列式は20−9＝11である。C−Aが正定値なのでCは極小ではない。",
      "エ": "D−Aは対角成分が8、7の正定値行列である。集合の中にDより真に小さいAが存在する。",
      "オ": "全てのB−A、C−A、D−Aが正定値なのでA≼Xが集合の各Xについて成り立つ。よってAは極小元である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q059",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "行交換なしのLU分解",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の行列A～Dのうち、LU分解可能なもののみを全て挙げているのはどれか。\n\nA＝［［cos(π／2), sin(π／2)］、［sin(π／2), cos(π／2)］］\nB＝［［1, 2, 3］、［2, 4, 5］、［3, 5, 6］］\nC＝［［1／2, 1／3, 1／4］、［1／3, 1／4, 1／5］、［1／4, 1／5, 0］］\nD＝［［2, 0, 4］、［0, 1, 2］、［−1, 3, 4］］",
    "choices": {
      "ア": "A、B",
      "イ": "B、C",
      "ウ": "C",
      "エ": "C、D",
      "オ": "D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "CとDは最初の二つのピボットが非零なので下三角部分を消去できる。Aは第一段、Bは第二段で0のピボットの下に非零成分が現れる。",
    "choiceExplanations": {
      "ア": "Aは第一ピボットが0で直下が1なので、行交換なしの消去ができない。Bも第一段の消去後に第二ピボットが0で直下が−1になる。",
      "イ": "Cの先頭の1次および2次主小行列式は1／2と1／72なので最初の二段で消去できる。Bの2次主小行列式は0で、消去すべき非零成分が残る。",
      "ウ": "Cは分解できるが、Dも分解可能である。Dの最後のピボットは0になるものの、その下には消去する行が残っていない。",
      "エ": "CとDは最初の二つのピボットが非零なので下三角部分を消去できる。Aは第一段、Bは第二段で0のピボットの下に非零成分が現れる。",
      "オ": "Dは分解できるが、Cも含まれる。Cの最初のピボットは1／2で、次は1／4−(1／3)²／(1／2)＝1／36である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q060",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "非線形漸化式の単調収束",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "実数列｛xₖ｝_(k＝0, 1, …)をx₀＝1.5、x_(k＋1)＝2／(xₖ²−4xₖ＋5)と定義する。このとき、xₖの極限に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "1に収束する。",
      "イ": "1.8に収束する。",
      "ウ": "2に収束する。",
      "エ": "3.1に収束する。",
      "オ": "1と2の間で振動する。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "1＜xₖ＜2なら分母は(xₖ−2)²＋1なのでx_(k＋1)＜2であり、差x_(k＋1)−xₖ＝(2−xₖ)(xₖ−1)²／((xₖ−2)²＋1)は正となる。よって数列はx₀以上の固定点に単調収束し、その値は2である。",
    "choiceExplanations": {
      "ア": "1は固定点だが、初項は1.5である。1＜x＜2で次の項がxより大きくなるため、極限は1にならない。",
      "イ": "極限LはL(L²−4L＋5)＝2を満たす必要がある。この式は(L−1)²(L−2)＝0となり、1.8は固定点ではない。",
      "ウ": "1＜xₖ＜2なら分母は(xₖ−2)²＋1なのでx_(k＋1)＜2であり、差x_(k＋1)−xₖ＝(2−xₖ)(xₖ−1)²／((xₖ−2)²＋1)は正となる。よって数列はx₀以上の固定点に単調収束し、その値は2である。",
      "エ": "分母は(xₖ−2)²＋1≥1なので、次の項が2を超えることはない。極限3.1はこの上界と両立しない。",
      "オ": "初項は1と2の間にあり、その区間では次の項との差が正である。数列が単調増加するため振動は起こらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q066",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "物理数学",
    "topicTags": [
      "固有ベクトルから行列の跡を求める",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "a、bを定数とし、行列［［a, 1, 1］、［0, b, 0］、［a, 0, 1］］がある。この行列の固有ベクトルの一つが列ベクトル(1, −4, 3)であるとき、この行列の三つの固有値をλ₁、λ₂、λ₃とすると、λ₁＋λ₂＋λ₃の値はいくらか。",
    "choices": {
      "ア": "0",
      "イ": "1",
      "ウ": "3",
      "エ": "5",
      "オ": "6"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "第一と第三成分からa−1＝(a＋3)／3を得てa＝3、対応する固有値は2であり、第二成分からb＝2となる。固有値の総和は跡a＋b＋1＝6である。",
    "choiceExplanations": {
      "ア": "固有ベクトルを掛けた第一成分はa−1、第三成分はa＋3である。これらが固有値に対して1対3となる条件から、aは3に決まる。",
      "イ": "固有値の和は行列の対角成分の和a＋b＋1である。対角の1だけではなく、固有ベクトルの条件で決まるaとbも加える。",
      "ウ": "3は固有ベクトルの条件から得られるaの値である。第二成分からb＝2となるので、固有値の和は3＋2＋1である。",
      "エ": "a＋b＝5だが、行列の跡には第三対角成分1も含まれる。固有値の和は固有値を個別に求めずに計算できる。",
      "オ": "第一と第三成分からa−1＝(a＋3)／3を得てa＝3、対応する固有値は2であり、第二成分からb＝2となる。固有値の総和は跡a＋b＋1＝6である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q069",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "水平加速する容器の自由水面",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、水の入ったビーカーを水平方向に加速度の大きさaで動かしているときの水面の傾きの角θとして最も妥当なのはどれか。\nただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "0",
      "イ": "arcsin(a／g)",
      "ウ": "arccos(a／g)",
      "エ": "arctan(a／g)",
      "オ": "arccot(a／g)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ビーカーの系では下向きgに加えて逆向きの水平加速度aが作用する。自由水面はその合成方向に垂直なので、傾きはtan θ＝a／gを満たす。",
    "choiceExplanations": {
      "ア": "水平な水面は水平方向に加速度がない場合に対応する。図のように加速するビーカーの系では有効重力に水平成分が生じる。",
      "イ": "aとgは互いに直交する有効重力の成分である。sin θの分母は有効重力の大きさ√(g²＋a²)となる。",
      "ウ": "a／gは水平成分を鉛直成分で割った比である。水平面から測る水面の角度に対して、この比は余弦ではなく正接となる。",
      "エ": "ビーカーの系では下向きgに加えて逆向きの水平加速度aが作用する。自由水面はその合成方向に垂直なので、傾きはtan θ＝a／gを満たす。",
      "オ": "a／gはtan θである。余接を使うならcot θ＝g／aであり、引数はこの選択肢の逆になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q069.webp"
    ],
    "imageAltTexts": [
      "右へ加速するビーカーと水面が水平線となす角θ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q070",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "円筒内を転がる円柱のラグランジアン",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑に当てはまる数式の組合せとして最も妥当なのはどれか。\n\n「軸を水平にして固定された半径Rの円筒の内側で、半径rの円柱が滑ることなく転がる運動について考える。円柱の質量をMとすると、円柱軸まわりの慣性モーメントはI＝(1／2)Mr²である。図のように、円筒の中心Oを通る鉛直線と、Oと円柱の中心Cを通る直線のなす角を一般化座標θとする。つり合いの状態で最下点Aに接していた状態を位置エネルギーの基準とする。ラグランジアン（ラグランジュ関数）LはL＝［㋐］となり、それから求められる運動方程式は［㋑］となる。\nただし、つり合いの状態で最下点Aに接していた円柱の点をP、運動中の接点をQとすると、円弧PQと円弧AQの長さは等しいのでrφ＝Rθであり、CPの回転角αはα＝φ−θ＝((R−r)／r)θで与えられる。また、θ̇はθの時間微分を表し、重力加速度の大きさをgとする。」",
    "choices": {
      "ア": "(3／4)M(R−r)²θ̇²−Mg(R−r)(1−cos θ) ／ θ̈＝[2g／(3(R−r))]sin θ",
      "イ": "(3／4)M(R−r)²θ̇²−Mg(R−r)(1−cos θ) ／ θ̈＝−[2g／(3(R−r))]sin θ",
      "ウ": "(3／4)M(R−r)²θ̇²＋Mg(R−r)(1−cos θ) ／ θ̈＝−[2g／(3(R−r))]cos θ",
      "エ": "(1／2)M(R−r)²θ̇²−Mg(R−r)(1−cos θ) ／ θ̈＝−[2g／(3(R−r))]cos θ",
      "オ": "(1／2)M(R−r)²θ̇²＋Mg(R−r)(1−cos θ) ／ θ̈＝[2g／(3(R−r))]sin θ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "重心の並進と円柱の自転を足すとT＝(1／2)M(R−r)²θ̇²＋(1／2)Iα̇²＝(3／4)M(R−r)²θ̇²となる。L＝T−Mg(R−r)(1−cos θ)を微分するとθ̈＝−[2g／(3(R−r))]sin θを得る。",
    "choiceExplanations": {
      "ア": "ラグランジアンの符号は正しい。運動方程式の加速度は位置エネルギーの勾配に逆らうので、正のθに対して負になる。",
      "イ": "重心の並進と円柱の自転を足すとT＝(1／2)M(R−r)²θ̇²＋(1／2)Iα̇²＝(3／4)M(R−r)²θ̇²となる。L＝T−Mg(R−r)(1−cos θ)を微分するとθ̈＝−[2g／(3(R−r))]sin θを得る。",
      "ウ": "位置エネルギーは最下点からの上昇に伴って増え、Lでは引く。高さの微分から生じる角度依存性はsin θである。",
      "エ": "運動エネルギーの係数1／2は重心の並進だけの値である。回転の寄与を加え、鉛直からの高さを微分してsin θを得る。",
      "オ": "回転エネルギーを欠き、位置エネルギーの符号も逆である。最下点が安定なので、一方へずれたとき角加速度はそれを戻す向きとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q070.webp"
    ],
    "imageAltTexts": [
      "円筒内を転がる円柱の中心、接点、一般化座標と回転角"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q071",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "電磁ポテンシャルのラグランジアン",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "質量m、電荷qの荷電粒子が三次元空間を運動しており、時刻tにおける荷電粒子の位置をxᵢ(t)（i＝1, 2, 3）とする。この粒子の位置xᵢ(t)における静電ポテンシャルをφ(t, xᵢ(t))、ベクトルポテンシャルをAⱼ(t, xᵢ(t))（j＝1, 2, 3）とすると、ラグランジアンは\n\nL(xᵢ, ẋᵢ)＝(1／2)m∑_(j＝1)^3 (ẋⱼ)²−qφ(t, xᵢ(t))＋q∑_(j＝1)^3 ẋⱼ Aⱼ(t, xᵢ(t))\n\nで与えられる。このとき、変分原理により得られる運動方程式として最も妥当なのはどれか。\nただし、ẋᵢはxᵢの時間微分を表す。",
    "choices": {
      "ア": "m ẍᵢ＋q∂φ／∂xᵢ−q∑_(j＝1)^3 ẋⱼ ∂Aⱼ／∂xᵢ＝0",
      "イ": "m ẍᵢ＋q∂φ／∂xᵢ＋q∑_(j＝1)^3 ẋⱼ ∂Aᵢ／∂xᵢ＝0",
      "ウ": "m ẍᵢ＋q∂φ／∂xᵢ−q∑_(j＝1)^3 ẋⱼ (∂Aⱼ／∂xᵢ−∂Aᵢ／∂xⱼ)＝0",
      "エ": "m ẍᵢ＋q(∂Aᵢ／∂t＋∂φ／∂xᵢ)−q∑_(j＝1)^3 ẋⱼ ∂Aⱼ／∂xᵢ＝0",
      "オ": "m ẍᵢ＋q(∂Aᵢ／∂t＋∂φ／∂xᵢ)−q∑_(j＝1)^3 ẋⱼ (∂Aⱼ／∂xᵢ−∂Aᵢ／∂xⱼ)＝0"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "∂L／∂ẋᵢ＝m ẋᵢ＋qAᵢを全時間微分すると、Aᵢの時間偏微分と軌道に沿う空間微分が現れる。ここから∂L／∂xᵢ＝−q∂φ／∂xᵢ＋q∑ ẋⱼ∂Aⱼ／∂xᵢを引くと、この式になる。",
    "choiceExplanations": {
      "ア": "速度に関する偏微分はm ẋᵢ＋qAᵢである。この式の時間微分に含まれるAᵢの陽な時間変化と軌道に沿う変化が両方欠けている。",
      "イ": "Aᵢを軌道に沿って微分すると、速度ẋⱼに掛かる空間微分の分母はxⱼとなる。さらにAⱼのxᵢ微分は∂L／∂xᵢから別に現れる。",
      "ウ": "空間微分の組合せは正しい。Aᵢは時刻tを明示的に含むので、陽な偏微分∂Aᵢ／∂tを加える必要がある。",
      "エ": "∂Aᵢ／∂tに加えて、軌道に沿う全微分には∑ ẋⱼ∂Aᵢ／∂xⱼが入る。速度に比例する二種類の空間微分を差として残す。",
      "オ": "∂L／∂ẋᵢ＝m ẋᵢ＋qAᵢを全時間微分すると、Aᵢの時間偏微分と軌道に沿う空間微分が現れる。ここから∂L／∂xᵢ＝−q∂φ／∂xᵢ＋q∑ ẋⱼ∂Aⱼ／∂xᵢを引くと、この式になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q072",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "水面が一定速度で下がる容器の形",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、鉛直軸まわりに回転対称な壁面をもつ容器に十分な水が入っており、このときの水面の高さはhである。いま、容器の底の小さい孔から流出速度vで水が流出している。小さい孔に比べて水面の面積は十分大きく、水面の降下速度uは一定でu≪vを満たす。このとき、次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、重力加速度の大きさをgとし、水の密度ρは一定であり、摩擦などによるエネルギー損失は無視できるものとする。\nなお、ベルヌーイの定理が成り立つ流体と容器において、流体の圧力、流出する流体の単位体積当たりの運動エネルギー及び流体の単位体積当たりの位置エネルギーの間に保存関係が成り立つ。\n\n「u≪vから、流出する水の流れを定常流とみなし、さらに、水面及び流出点での圧力は共に外気圧p₀に等しいとして、鉛直軸に沿った流線上でベルヌーイの定理を用いると、近似としてv＝［㋐］を得る。\nまた、uが一定であることから、高さhにおける容器壁面の半径をrとすると、rはhの［㋑］乗に比例することが分かる。」",
    "choices": {
      "ア": "√(gh) ／ 1／4",
      "イ": "√(gh) ／ 1／3",
      "ウ": "√(gh) ／ 1／2",
      "エ": "√(2gh) ／ 1／4",
      "オ": "√(2gh) ／ 1／2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "外気圧を両辺で消し、水面の速度uを無視するとv²／2＝ghとなる。孔の面積を一定とするとuπr²がvに比例し、uは一定なのでr∝h^(1／4)である。",
    "choiceExplanations": {
      "ア": "半径の指数は妥当である。ベルヌーイの式でρgh＝ρv²／2となるため、流出速度の根号の中には2が必要である。",
      "イ": "位置エネルギーの減少からvは√(2gh)になる。連続の式では水面の面積πr²が速度vに比例するので、rはhの1／4乗に比例する。",
      "ウ": "hの1／2乗に比例するのは流出速度と水面の面積である。半径は面積の平方根を取り、さらに指数が半分になる。",
      "エ": "外気圧を両辺で消し、水面の速度uを無視するとv²／2＝ghとなる。孔の面積を一定とするとuπr²がvに比例し、uは一定なのでr∝h^(1／4)である。",
      "オ": "流出速度は妥当である。πr²∝√hから半径を求めるには両辺の平方根を取る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q072.webp"
    ],
    "imageAltTexts": [
      "軸対称容器の水面の半径と水面・流出口の速度"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q073",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "ファン・デル・ワールス気体の臨界点",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ファン・デル・ワールスの式に従う気体1 molの状態方程式は、圧力をP、体積をV、絶対温度をTとして以下の式で与えられる。\n\n(P＋a／V²)(V−b)＝RT\n\nここで、Rは気体定数、a、bは正の定数である。\nこの気体は、低温では圧力の変化によって液体相と気体相の間で相転移が起こるが、高温では圧力の変化による液体相と気体相の区別がなくなる。このときの絶対温度を臨界温度T_cと呼ぶ。T_cは、P−V曲線において、\n\n∂P／∂V＝0、∂²P／∂V²＝0　…①\n\nが同時に成り立つ絶対温度として定義される。このとき、式①が同時に成り立つ圧力P_c、体積V_cが存在する。P_cとT_cの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "a／(27b²) ／ 8a／(81Rb)",
      "イ": "a／(27b²) ／ 8a／(27Rb)",
      "ウ": "2a／(27b²) ／ 2a／(27Rb)",
      "エ": "4a／(27b²) ／ 8a／(81Rb)",
      "オ": "4a／(27b²) ／ 8a／(27Rb)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "P＝RT／(V−b)−a／V²を二回微分し、二つの導関数を0とおいて割り合わせるとV_c＝3bになる。これを一次導関数の条件と状態方程式に入れるとT_c＝8a／(27Rb)、P_c＝a／(27b²)を得る。",
    "choiceExplanations": {
      "ア": "臨界圧力は妥当だが、臨界体積V_c＝3bを一次導関数が0の条件に代入するとRT_c＝2a(2b)²／(3b)³となる。分母は81ではなく27になる。",
      "イ": "P＝RT／(V−b)−a／V²を二回微分し、二つの導関数を0とおいて割り合わせるとV_c＝3bになる。これを一次導関数の条件と状態方程式に入れるとT_c＝8a／(27Rb)、P_c＝a／(27b²)を得る。",
      "ウ": "V_c＝3bではT_c＝8a／(27Rb)が必要である。この温度を状態方程式に戻すと圧力は4a／(27b²)−3a／(27b²)となる。",
      "エ": "二つの微分条件を満たす温度は8a／(27Rb)である。臨界圧力には状態方程式の引力補正−a／V_c²も含める。",
      "オ": "温度は妥当だが、4a／(27b²)はRT_c／(V_c−b)の値である。そこからa／(9b²)を引くとP_c＝a／(27b²)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q074",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "理想気体の断熱曲線と等温曲線の傾き",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "理想気体の断熱過程と等温過程に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、Rは気体定数である。\n\n「図の曲線①、②は、それぞれ理想気体の圧力をP、体積をVとしたときの等温変化（PV＝一定）と断熱変化（PV^γ＝一定）のどちらかを表したものである。γは定圧比熱C_Pと定積比熱C_Vの比であり、γ＝C_P／C_Vの関係がある。断熱変化の任意の点(P, V)における傾き(dP／dV)_断熱変化と等温変化の任意の点(P, V)における傾き(dP／dV)_等温変化の差(dP／dV)_断熱変化−(dP／dV)_等温変化は［㋐］であり、断熱変化は図の［㋑］である。」",
    "choices": {
      "ア": "−(R／C_V)(P／V) ／ 曲線①",
      "イ": "−(R／C_V)(P／V) ／ 曲線②",
      "ウ": "(R／C_V)(P／V) ／ 曲線①",
      "エ": "(R／C_V)(P／V) ／ 曲線②",
      "オ": "(C_V／R)(P／V) ／ 曲線②"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "PV^γとPVを微分すると傾きはそれぞれ−γP／Vと−P／Vである。差は−(γ−1)P／V＝−(R／C_V)(P／V)であり、交点でより急な曲線②が断熱変化となる。",
    "choiceExplanations": {
      "ア": "傾きの差は妥当である。差が負ということは交点で断熱曲線の方が急なので、図では②に当たる。",
      "イ": "PV^γとPVを微分すると傾きはそれぞれ−γP／Vと−P／Vである。差は−(γ−1)P／V＝−(R／C_V)(P／V)であり、交点でより急な曲線②が断熱変化となる。",
      "ウ": "γは1より大きいため、断熱の傾きから等温の傾きを引いた差は負である。図の②が交点でより大きく下がる。",
      "エ": "曲線②は妥当だが、差の符号が逆である。断熱では体積とともに温度も下がるので、等温より圧力が急に低下する。",
      "オ": "γ−1＝(C_P−C_V)／C_V＝R／C_Vであり、C_V／Rはその逆数である。断熱の傾きの方が負に大きいため、差の符号は負になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q074.webp"
    ],
    "imageAltTexts": [
      "交差する二つの圧力・体積曲線"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q075",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "三準位のカノニカル分布",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "N個の区別できる独立な粒子から成る系があり、それぞれの粒子は縮退のない三つのエネルギー準位0、ε、2ε（0＜ε）をとることができる。この系は温度Tの熱浴に接しており、カノニカル集団として扱うことができるものとする。このとき、系の平均エネルギーとして最も妥当なのはどれか。\nただし、ボルツマン定数をk_Bとし、β＝1／(k_B T)とする。",
    "choices": {
      "ア": "Nε",
      "イ": "Nε(e^(−βε)＋e^(−2βε))／(1＋e^(−βε)＋e^(−2βε))",
      "ウ": "Nε(e^(−βε)−e^(−2βε))／(1＋e^(−βε)＋e^(−2βε))",
      "エ": "Nε(e^(−βε)＋2e^(−2βε))／(1＋e^(−βε)＋e^(−2βε))",
      "オ": "Nε(e^(−βε)−2e^(−2βε))／(1＋e^(−βε)＋e^(−2βε))"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "一粒子の分配関数は1＋e^(−βε)＋e^(−2βε)であり、平均エネルギーの分子はεe^(−βε)＋2εe^(−2βε)である。独立なN粒子の期待値を足すとこの式になる。",
    "choiceExplanations": {
      "ア": "三準位が等確率なら、粒子あたりの平均はεとなる。有限の正温度では高い準位ほど重みが小さくなるため、一般にはNεより小さい。",
      "イ": "分母は一粒子の分配関数である。分子で2εの準位を数えるときは、占有確率にεの二倍を掛ける必要がある。",
      "ウ": "平均値ではエネルギー値にボルツマン因子を掛けて足す。2εの準位のエネルギーは正なので、その寄与は減算しない。",
      "エ": "一粒子の分配関数は1＋e^(−βε)＋e^(−2βε)であり、平均エネルギーの分子はεe^(−βε)＋2εe^(−2βε)である。独立なN粒子の期待値を足すとこの式になる。",
      "オ": "係数2は準位の高さを反映しているが、符号は正である。特に高温極限でこの式は負になり、非負の三準位の平均にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q076",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "二重スリットの干渉とレンズの分解能",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "光の回折とレンズの分解能に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図Ⅰのように、間隔dの二重スリットに波長λの単色光を入射させたとき、二重スリットから距離aの後方に置かれたスクリーン上にできる干渉縞の明線の間隔sは、s≈［㋐］である。ただし、d≪aとする。\n次に、図Ⅱのように、図Ⅰのスクリーンを半径R、焦点距離fの凸レンズに置き換え、それによって二重スリットの実像を、凸レンズから距離bの後方に置いたスクリーン上に結んだ。このとき、スクリーン上に映った二つのスリットの像の間隔DはD＝［㋑］となる。\nなるべく小さいものを凸レンズで拡大して観察するには、倍率D／dを大きくする。そのために、a≈fとするが、しかし倍率をいくら大きくしても分解能には限界がある。つまり、二重スリットの間隔dが、ある値d_min以下になると、±1次の回折光がレンズに入りきらなくなって、レンズを通過しなくなり、その結果、スクリーン上で二つのスリットの像が十分に分離されずに一本のスリットの像となってしまう。これがこのレンズの分解能といえる。d_minを計算すると、d_min≈［㋒］となる。」",
    "choices": {
      "ア": "λa／d ／ da／b ／ λR／f",
      "イ": "λa／d ／ db／a ／ λR／f",
      "ウ": "λa／d ／ db／a ／ λf／R",
      "エ": "λd／a ／ da／b ／ λR／f",
      "オ": "λd／a ／ db／a ／ λf／R"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "1次ごとの回折角の差は小角近似でλ／dなのでs≈aλ／dであり、像の倍率はb／aとなる。レンズ面での±1次の変位が約fλ／dなので、開口半径Rに収まる限界はd_min≈λf／Rである。",
    "choiceExplanations": {
      "ア": "明線間隔は妥当である。実像の倍率は像側距離を物体側距離で割ったb／aであり、レンズの半径Rを大きくすると分解できる最小間隔は小さくなる。",
      "イ": "明線間隔と像の倍率は正しい。1次光のレンズ面でのずれが約fλ／dであり、これをR以下に抑える条件から最小間隔はλf／Rとなる。",
      "ウ": "1次ごとの回折角の差は小角近似でλ／dなのでs≈aλ／dであり、像の倍率はb／aとなる。レンズ面での±1次の変位が約fλ／dなので、開口半径Rに収まる限界はd_min≈λf／Rである。",
      "エ": "スクリーンを遠ざけると縞間隔は広がり、sはaに比例する。レンズの作る実像の大きさは、光軸に平行な距離a、bによる相似からdb／aで求まる。",
      "オ": "像の間隔と分解能は妥当である。縞の角度間隔はスリットを狭めるほど広がるため、明線間隔はdに反比例する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q076-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q076-2.webp"
    ],
    "imageAltTexts": [
      "距離aのスクリーンにできる明線・暗線と回折次数（図Ⅰ）",
      "凸レンズを通ってスクリーンにできる二重スリットの実像（図Ⅱ）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q078",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "有限直線電流のビオ・サバール積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、平面内に置いた電線に大きさIの電流をA→B→C→Dの向きに流す。このとき、この電流が平面内の点Pにつくる磁束密度の大きさとして最も妥当なのはどれか。\nただし、点Pは直線ABと直線CDの交点であり、直線BCと直線CDは直交する。線分PCの長さはa、線分BCの長さはbである。\nなお、位置r′にある電流素片I dr′が点rにつくる磁束密度dB(r)は、μ₀を真空の透磁率として、ビオ・サバールの法則により\n\ndB(r)＝(μ₀I／(4π)) [dr′×(r−r′)]／｜r−r′｜³\n\nで与えられるものとする。この式より、電流素片の延長線上にある点には磁場は生じないことが分かる。また、必要であれば\n\nd／dz [z／√(1＋z²)]＝1／(1＋z²)^(3／2)\n\nを用いてよい。",
    "choices": {
      "ア": "μ₀I／(2a)",
      "イ": "μ₀I／(2πa)",
      "ウ": "μ₀I／(4π√(a²＋b²))",
      "エ": "μ₀Ib／(4πa√(a²＋b²))",
      "オ": "μ₀Ia／(2πb√(a²＋b²))"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ABとCDでは電流素片とPへの変位が平行なので、外積は0となる。BCについて距離Cからzの点の寄与を積分すると、(μ₀I／(4π))∫₀ᵇ a／(a²＋z²)^(3／2) dz＝μ₀Ib／(4πa√(a²＋b²))である。",
    "choiceExplanations": {
      "ア": "寄与は長さbの区間BCだけである。b→0とすると磁束密度も0に近づくので、bに依存しないこの式では表せない。",
      "イ": "これは距離aにある無限直線電流の磁束密度である。BCは垂線の足Cから片側に有限の長さしかない。",
      "ウ": "√(a²＋b²)はPとBの距離であるが、BC上の全ての電流素片からの寄与を重ねる必要がある。BCが短くなっても有限の値が残るこの式は適さない。",
      "エ": "ABとCDでは電流素片とPへの変位が平行なので、外積は0となる。BCについて距離Cからzの点の寄与を積分すると、(μ₀I／(4π))∫₀ᵇ a／(a²＋z²)^(3／2) dz＝μ₀Ib／(4πa√(a²＋b²))である。",
      "オ": "BCとPとの垂直距離はaであり、積分範囲の長さはbである。積分した磁束密度はb→0で0に近づき、1／bの発散は生じない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q078.webp"
    ],
    "imageAltTexts": [
      "折れ線ABCDを流れる電流と観測点Pの位置関係"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q079",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "無限長ソレノイドの内外の誘導電場",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "電磁誘導に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「円筒面に沿って導線をらせん状に密に巻いたコイルをソレノイドという。半径a、単位長さ当たりの巻き数nで、円筒軸方向に無限に長いソレノイドに電流Iを流す。\nソレノイドに時間tに比例する電流I(t)＝I₀t（I₀は定数）を流すと、ソレノイドの内部には、真空の透磁率をμ₀とし、円筒軸方向に一様な大きさB＝μ₀nI(t)の磁束密度が発生する。ソレノイドの外部には、磁束密度は発生しない。さらに、電磁誘導の法則∇×E(r, t)＝−∂B(r, t)／∂tにより電場が誘導される。円筒軸からの距離をrとすると、誘導電場の大きさは、ソレノイド内部では［㋐］、外部では［㋑］である。」",
    "choices": {
      "ア": "μ₀nI₀／2 ／ 0",
      "イ": "μ₀nI₀／2 ／ μ₀nI₀a²／(2r)",
      "ウ": "μ₀nI₀r／2 ／ 0",
      "エ": "μ₀nI₀r／2 ／ μ₀nI₀a²／(2r)",
      "オ": "μ₀nI₀r／2 ／ μ₀nI₀a²／(2r²)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "半径rの円でファラデーの法則を積分すると、2πrE＝μ₀nI₀π min(r², a²)となる。内側では磁束の面積がπr²、外側ではπa²なので、この組合せになる。",
    "choiceExplanations": {
      "ア": "内側の磁束は閉曲線が囲む面積πr²に比例する。円周で割ると電場はrに比例し、外側でも閉曲線が内部の磁束を囲むため電場が生じる。",
      "イ": "外側の電場は妥当である。内側の円が囲む磁束の変化はr²に比例するので、電場には円周で割った後もrが一つ残る。",
      "ウ": "内側の電場は妥当である。閉曲線が外側にあっても内部の磁場を囲むので、磁束の時間変化は0にならない。",
      "エ": "半径rの円でファラデーの法則を積分すると、2πrE＝μ₀nI₀π min(r², a²)となる。内側では磁束の面積がπr²、外側ではπa²なので、この組合せになる。",
      "オ": "内側の式は妥当である。外側の円が囲む磁束の変化はrに依存せず、円周2πrで割るため電場は1／rで減る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q080",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "電荷一定のコンデンサーから誘電体を引き出す力",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、面積S、幅a、極板間の間隔dの平行板コンデンサーに、コンデンサーの極板間と同じ形状で誘電率εの誘電体をx軸に平行に出し入れすることを考える。\n極板間に誘電体が完全に収まっている状態で底面の極板に電荷＋Qを、上面の極板に電荷−Qを与え、外部と絶縁して、誘電体の左端のx座標がx₁になるまで誘電体を静かに引き出した。このとき、誘電体を、その左端がx₁の位置で静止させるために外部から加える力F(x₁)として最も妥当なのはどれか。\nただし、真空の誘電率をε₀とし、力の正の向きはx軸の正の向きとする。また、コンデンサーの極板間の電場に対して、極板及び誘電体の端の影響並びに極板と誘電体の間の摩擦は無視できるものとする。",
    "choices": {
      "ア": "(ε＋ε₀)Q²ad／[2S｛εa＋(ε＋ε₀)x₁｝²]",
      "イ": "(ε−ε₀)Q²ad／[2S｛εa−(ε−ε₀)x₁｝²]",
      "ウ": "(ε−ε₀)Q²ad／[S｛εa＋(ε＋ε₀)x₁｝²]",
      "エ": "(ε＋ε₀)Q²ad／[S｛εa＋(ε＋ε₀)x₁｝²]",
      "オ": "(ε−ε₀)Q²ad／[S｛εa−(ε−ε₀)x₁｝²]"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二つの領域は並列なのでC＝S[εa−(ε−ε₀)x₁]／(ad)である。電荷が一定のため外力はd(Q²／(2C))／dx₁となり、この式を得る。",
    "choiceExplanations": {
      "ア": "引き出すにつれて幅x₁だけ誘電体が真空に置き換わるので、容量の変化はε₀−εに比例する。ε＝ε₀なら力は0であり、和を含むこの式では0にならない。",
      "イ": "二つの領域は並列なのでC＝S[εa−(ε−ε₀)x₁]／(ad)である。電荷が一定のため外力はd(Q²／(2C))／dx₁となり、この式を得る。",
      "ウ": "ε−ε₀は容量変化を表すが、引き出すと容量は減少するため分母のかっこ内はεaから差を引く。エネルギーにはさらに1／2が付く。",
      "エ": "ε＝ε₀なら引き出しで電場のエネルギーは変わらず、必要な外力は0である。この式ではその条件でもε＋ε₀が残る。",
      "オ": "容量のx₁依存性は妥当である。電荷一定での蓄積エネルギーはQ²／(2C)なので、外力には分母の係数2が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q080.webp"
    ],
    "imageAltTexts": [
      "電荷を蓄えた平行板コンデンサーと右に引き出された誘電体"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q081",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "トンネル効果を弱める要因",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "量子力学におけるトンネル効果に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「トンネル効果とは、古典力学的には超えられないポテンシャル障壁を、粒子が一定の確率で通り抜けてしまう量子力学的な現象であり、［㋐］から理解される。この現象は、放射性元素のα崩壊やトンネルダイオードなどで見られる。ポテンシャル障壁の高さが高いほど、障壁の厚さが厚いほど、粒子のエネルギーが低いほど、粒子の質量が［㋑］ほど、障壁を通り抜ける確率は［㋒］くなる。」",
    "choices": {
      "ア": "不確定性原理 ／ 大きい ／ 低",
      "イ": "不確定性原理 ／ 小さい ／ 低",
      "ウ": "対応原理 ／ 大きい ／ 低",
      "エ": "対応原理 ／ 大きい ／ 高",
      "オ": "対応原理 ／ 小さい ／ 高"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "位置と運動量には不確定性があり、障壁中で波動関数は減衰しながら広がる。障壁内での減衰率は質量が大きいほど増すため、透過確率は下がる。",
    "choiceExplanations": {
      "ア": "位置と運動量には不確定性があり、障壁中で波動関数は減衰しながら広がる。障壁内での減衰率は質量が大きいほど増すため、透過確率は下がる。",
      "イ": "質量が小さいと障壁内で波動関数の減衰が緩やかになる。したがって他の条件が同じなら透過確率は高まる。",
      "ウ": "質量が大きいほど透過確率が低い点は正しい。対応原理は古典極限へのつながりを述べるもので、この問題では量子力学的な広がりに関わる不確定性原理が当てはまる。",
      "エ": "質量が大きい場合、同じ障壁中で波動関数はかえって速く減衰する。したがって透過確率が高いとする部分は逆である。",
      "オ": "質量を小さくすると透過しやすくなること自体は成り立つが、本文が挙げた障壁の高さや厚さの増加はいずれも透過率を低下させる。これに対応する質量の変化は増加である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q082",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "交換子とエーレンフェストの定理",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "量子力学における物理量の期待値に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「3次元空間において、質量mの粒子がポテンシャルV(x)中を運動している。位置演算子をx̂とし、運動量演算子をp̂として、ハミルトニアン演算子は\n\nĤ＝p̂²／(2m)＋V(x̂)\n\nであり、波動関数をψ(t, x)とすると、演算子Ô(x̂, p̂)の期待値は次の式で与えられる。\n\n〈O〉＝∫d³x ψ*Ôψ\n\nシュレーディンガー方程式を用いると、d〈O〉／dt＝［㋐］となり、特に、d〈p〉／dt＝［㋑］となる。\nただし、iは虚数単位であり、波動関数は十分遠方で0であるとする。」",
    "choices": {
      "ア": "(i／ℏ)〈ĤÔ＋ÔĤ〉 ／ 〈∇V〉",
      "イ": "(i／ℏ)〈ĤÔ＋ÔĤ〉 ／ −〈∇V〉",
      "ウ": "(i／ℏ)〈ĤÔ−ÔĤ〉 ／ 0",
      "エ": "(i／ℏ)〈ĤÔ−ÔĤ〉 ／ 〈∇V〉",
      "オ": "(i／ℏ)〈ĤÔ−ÔĤ〉 ／ −〈∇V〉"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "シュレーディンガー方程式とその共役を期待値の微分に代入すると(i／ℏ)〈[Ĥ, Ô]〉を得る。p̂の場合は運動エネルギー項と可換で、[V, p̂]＝iℏ∇Vによって−〈∇V〉になる。",
    "choiceExplanations": {
      "ア": "ψと複素共役ψ*の時間微分ではiの符号が逆になる。二つの演算子積は和ではなく差となり、運動量の場合には力−∇Vが出る。",
      "イ": "運動量の時間変化は力の期待値である。一般式では波動関数とその共役の時間微分を足すと、ハミルトニアンとの反交換子ではなく交換子になる。",
      "ウ": "交換子の形は妥当であるが、ポテンシャル演算子は一般に運動量演算子と可換ではない。Vが空間で変わるなら力の期待値が現れる。",
      "エ": "交換子の順序は正しいが、[V, p̂]＝iℏ∇Vにi／ℏを掛けると符号は負になる。これはポテンシャルに対する力の向きと一致する。",
      "オ": "シュレーディンガー方程式とその共役を期待値の微分に代入すると(i／ℏ)〈[Ĥ, Ô]〉を得る。p̂の場合は運動エネルギー項と可換で、[V, p̂]＝iℏ∇Vによって−〈∇V〉になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q083",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "磁場中の荷電粒子のランダウ準位",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "2次元空間において運動する質量m、電荷qの荷電粒子を考える。2次元空間に垂直に、一様な磁束密度が大きさBでかかっている。位置演算子を(x̂, ŷ)とし、運動量演算子を(p̂ₓ, p̂ᵧ)として、荷電粒子のハミルトニアン演算子は\n\nĤ＝p̂ₓ²／(2m)＋(p̂ᵧ−qBx̂)²／(2m)\n\nで与えられるとする。定常状態のエネルギー準位として最も妥当なのはどれか。\nただし、この定常状態ではp̂ᵧの固有値をℏkとし、nは0以上の整数とする。",
    "choices": {
      "ア": "[(qB)²／(2m)](n＋1／2)",
      "イ": "[(qB)²／(2m)](n＋1)＋(ℏk)²／(2m)",
      "ウ": "(qBℏ／m)(n＋1／2)",
      "エ": "(qBℏ／m)(n＋1)",
      "オ": "(qBℏ／m)(n＋1)＋(ℏk)²／(2m)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "p̂ᵧをℏkで置き換えると、x₀＝ℏk／(qB)を中心とする調和振動子になる。角振動数は｜q｜B／mであり、選択肢のqB＞0の表記ではEₙ＝(qBℏ／m)(n＋1／2)となる。",
    "choiceExplanations": {
      "ア": "(qB)²／(2m)は位置の二乗に掛かるポテンシャルの係数である。準位の間隔はこの係数そのものではなく角振動数にℏを掛けた値になる。",
      "イ": "平方完成によりℏkは調和振動子の中心の座標に移る。中心の移動でエネルギーのずれが加わることはなく、振動数から準位を求める。",
      "ウ": "p̂ᵧをℏkで置き換えると、x₀＝ℏk／(qB)を中心とする調和振動子になる。角振動数は｜q｜B／mであり、選択肢のqB＞0の表記ではEₙ＝(qBℏ／m)(n＋1／2)となる。",
      "エ": "調和振動子の零点エネルギーはℏω／2である。n＝0の準位をℏωとするn＋1では、この零点エネルギーが合わない。",
      "オ": "ℏkで変わるのは振動子の中心であり、別の運動エネルギー項は残らない。量子化された準位はℏω(n＋1／2)である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q084",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "角運動量測定の固有ベクトルと確率",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "軌道角運動量演算子に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「軌道角運動量演算子をl̂、3次元直交座標でのそれぞれの成分をl̂＝(l̂ₓ, l̂ᵧ, l̂_z)とする。l̂²とl̂_zは可換であるので、同じ固有関数をもち、lを0以上の整数として、l̂²の固有値はℏ²l(l＋1)と表され、l̂_zの固有値はℏmで、各lに対してm＝0, ±1, …, ±(l−2), ±(l−1), ±lである。l＝1のとき、m＝1, 0, −1の三つの値をとり、それぞれに対応する固有関数をブラ・ケット表示で｜m〉とする。l̂ₓは｜1〉、｜0〉、｜−1〉を基底とする固有関数系において行列表示で\n\nl̂ₓ＝(ℏ／√2)［［0, 1, 0］、［1, 0, 1］、［0, 1, 0］］\n\nとなる。l̂ₓの固有値0の固有ベクトルは［㋐］である。また、次の状態ベクトル｜Ψ〉＝(1／√3)(1, 1, −1)ᵀについて、l̂ₓの観測値が0となる確率は、l̂ₓの固有値0の固有関数への射影成分（振幅）の2乗で求められ、［㋑］である。」",
    "choices": {
      "ア": "(1／2)(1, −√2, 1)ᵀ ／ 2／3",
      "イ": "(1／2)(1, √2, 1)ᵀ ／ 1／3",
      "ウ": "(1／2)(1, √2, 1)ᵀ ／ 1／√6",
      "エ": "(1／√2)(1, 0, −1)ᵀ ／ 2／3",
      "オ": "(1／√2)(1, 0, −1)ᵀ ／ 2／√6"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "l̂ₓv＝0から中央成分が0、両端成分の和が0であり、規格化するとv＝(1, 0, −1)ᵀ／√2となる。内積は2／√6で、その絶対値の二乗は2／3である。",
    "choiceExplanations": {
      "ア": "確率2／3は妥当だが、このベクトルにl̂ₓを作用させると固有値は−ℏとなる。固有値0には中央成分が0で、外側の成分が互いに逆であることが必要である。",
      "イ": "このベクトルに行列を掛けると元のベクトルのℏ倍となる。固有値0の部分空間への射影を求めるには別のベクトルを使う。",
      "ウ": "固有値0の条件には中央成分0が含まれるので、このベクトルは適さない。確率には振幅の絶対値の二乗を使う。",
      "エ": "l̂ₓv＝0から中央成分が0、両端成分の和が0であり、規格化するとv＝(1, 0, −1)ᵀ／√2となる。内積は2／√6で、その絶対値の二乗は2／3である。",
      "オ": "固有ベクトルは妥当である。2／√6は射影の振幅であり、測定確率にはその二乗2／3を取る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q085",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "コンプトン散乱による波長変化",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "静止している電子にX線（光子）を入射すると、電子によって散乱されたX線の波長は、入射X線の波長より長くなる。hをプランク定数として、入射光子のエネルギー、運動量、波長をそれぞれhν、hk／(2π)、λ、散乱光子のエネルギー、運動量、波長をそれぞれhν′、hk′／(2π)、λ′とする。初め静止している電子が、光子との衝突によって動き出したときの運動量をpとし、光子の散乱角をθとする。散乱前後でのエネルギー保存則及び運動量保存則を考えるとき、波長の変化Δλ＝λ′−λを表す式として最も妥当なのはどれか。\nただし、電子の質量をm、光子の速さをcとする。また、運動量pで運動する電子のエネルギーはc√(｜p｜²＋m²c²)である。",
    "choices": {
      "ア": "(h／mc)sin θ",
      "イ": "(h／mc)(1−sin θ)",
      "ウ": "(h／mc)(1＋sin θ)",
      "エ": "(h／mc)cos θ",
      "オ": "(h／mc)(1−cos θ)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "運動量保存から｜p｜²＝h²(λ⁻²＋λ′⁻²−2cos θ／(λλ′))となる。エネルギー保存のmc²＋hc(1／λ−1／λ′)を電子のエネルギーとして二乗し、同じ式を代入して整理するとΔλ＝(h／mc)(1−cos θ)を得る。",
    "choiceExplanations": {
      "ア": "sin θは前方でも後方でも0になるが、反対向きに散乱するθ＝πで電子の反跳は最大である。角度依存性は光子運動量の内積からcos θを用いて求める。",
      "イ": "散乱角が0の場合は光子の方向が変わらず、波長変化は0である。この式はθ＝0でh／(mc)を与える。",
      "ウ": "運動量の大きさを求めるときに用いるのは二つの光子運動量の内積である。角度項はsin θでなくcos θであり、前方散乱で変化は0になる。",
      "エ": "θ＝πでは光子が反対向きに散乱され、波長が最も長くなる。この式はその場合に負の変化を与える。",
      "オ": "運動量保存から｜p｜²＝h²(λ⁻²＋λ′⁻²−2cos θ／(λλ′))となる。エネルギー保存のmc²＋hc(1／λ−1／λ′)を電子のエネルギーとして二乗し、同じ式を代入して整理するとΔλ＝(h／mc)(1−cos θ)を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q086",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "フォノンの平均エネルギー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "格子振動を調和振動子とみなすと、それを量子化したフォノンのエネルギーはEₙ＝(n＋1／2)hνと表せる。ここで、νは格子振動の振動数、hはプランク定数、n＝0, 1, 2, …である。一方、一般に、系が温度Tにおいてエネルギー準位Eを占める確率Pは、ボルツマン分布P＝c・exp(−E／(k_B T))で与えられる。ここで、k_Bはボルツマン定数、cは規格化定数である。これらを用いて、温度Tにおけるフォノンの平均エネルギーを計算した結果として最も妥当なのはどれか。",
    "choices": {
      "ア": "hν／[exp(hν／(k_B T))＋1]",
      "イ": "hν／[exp(−hν／(k_B T))−1]＋hν／2",
      "ウ": "hν／[exp(hν／(k_B T))−1]＋hν／2",
      "エ": "hν／[exp(−hν／(k_B T))＋1]＋hν／2",
      "オ": "hν／[exp(hν／(k_B T))＋1]＋hν／2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "r＝exp(−hν／(k_B T))とすると、nの確率は(1−r)rⁿである。その平均はr／(1−r)なので、平均エネルギーはhν／[exp(hν／(k_B T))−1]＋hν／2となる。",
    "choiceExplanations": {
      "ア": "全ての準位に零点エネルギーhν／2がある。したがってT→0でエネルギーは0ではなくhν／2に近づく。",
      "イ": "指数が負だと分母exp(−hν／(k_B T))−1が負となる。励起の平均は非負なので、熱的な寄与は負にならない。",
      "ウ": "r＝exp(−hν／(k_B T))とすると、nの確率は(1−r)rⁿである。その平均はr／(1−r)なので、平均エネルギーはhν／[exp(hν／(k_B T))−1]＋hν／2となる。",
      "エ": "この熱的寄与はT→0でhνとなり、基底状態に収束する条件を満たさない。正規化には等比級数の和1／(1−r)を使う。",
      "オ": "分母の＋1ではnが0、1だけの場合に対応する形になる。調和振動子ではnは任意の非負整数をとるため、等比級数から分母に−1が現れる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q087",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "pn接合の拡散・ドリフト電流と整流特性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、半導体のpn接合ダイオードに電源をつないで流れる電流Iを測定する。ダイオードに印加する電圧Vと電流Iは、図Ⅰに示した矢印の向きを正とする。図Ⅱは、V＝0のときのバンド構造の模式図であり、接合の境界の左側がp型半導体、右側がn型半導体に対応する。このpn接合ダイオードに関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「p型領域ではホールが多数キャリアとなり、n型領域では電子が多数キャリアとなっているので、それぞれのキャリアの濃度の勾配によって、バンド構造の模式図に示すようなポテンシャル障壁を越えて［㋐］に向かう電流が流れる。これを拡散電流という。一方、このポテンシャル勾配によって、それぞれの領域の少数キャリアの移動により［㋑］に向かう電流が流れる。これをドリフト電流という。電圧Vを印加する前では上記二つの電流がつり合っているが、Vを印加すると、ポテンシャル障壁の高さが変化するので、主に［㋒］の大きさが変化する。その結果、このダイオードの電流電圧特性は、図Ⅲの［㋓］となる。」",
    "choices": {
      "ア": "n型領域からp型領域 ／ p型領域からn型領域 ／ ドリフト電流 ／ (b)",
      "イ": "n型領域からp型領域 ／ p型領域からn型領域 ／ ドリフト電流 ／ (c)",
      "ウ": "p型領域からn型領域 ／ n型領域からp型領域 ／ ドリフト電流 ／ (b)",
      "エ": "p型領域からn型領域 ／ n型領域からp型領域 ／ 拡散電流 ／ (a)",
      "オ": "p型領域からn型領域 ／ n型領域からp型領域 ／ 拡散電流 ／ (c)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "多数キャリアの拡散はp側からn側への電流となり、少数キャリアのドリフトはその反対である。正のVで障壁が下がって拡散電流が急増し、逆方向では小さい電流にとどまるため曲線(c)となる。",
    "choiceExplanations": {
      "ア": "多数キャリアのホールはp側からn側、電子はn側からp側に拡散する。電子の移動と電流は逆向きなので、どちらもp側からn側への拡散電流を与える。",
      "イ": "曲線(c)は正しいが、拡散とドリフトの向きは逆である。熱平衡では多数キャリアのp側からn側への拡散電流と、逆向きのドリフト電流がつり合う。",
      "ウ": "二つの電流の向きは妥当である。障壁が低くなると多数キャリアが接合を越えやすくなり、主として拡散電流が増える。",
      "エ": "二つの向きと拡散電流の選択は妥当である。図Ⅰの正電圧はp側を正にする順方向なので、正のVで正のIが増える曲線(c)を選ぶ。",
      "オ": "多数キャリアの拡散はp側からn側への電流となり、少数キャリアのドリフトはその反対である。正のVで障壁が下がって拡散電流が急増し、逆方向では小さい電流にとどまるため曲線(c)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q087-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q087-2.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q087-3.webp"
    ],
    "imageAltTexts": [
      "電流と印加電圧の符号を示すpn接合の回路（図Ⅰ）",
      "V＝0でのpn接合のエネルギーバンド（図Ⅱ）",
      "電流・電圧特性の三つの候補（図Ⅲ）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q088",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "周期的な斜線列のラウエ斑点",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "らせん状高分子のX線回折について考える。らせん状高分子を、図Ⅰのような周期aと角度θで特徴付けられる無限に長いジグザグの2次元図形で近似する。さらに、これを図Ⅱのように二つの傾いた十分に長い直線列の組合せと考えるものとする。観測されるX線回折パターンに現れるラウエ斑点の特徴を表す図形として最も妥当なのはどれか。選択肢の図を参照。",
    "choices": {
      "ア": "図の1（鉛直1列、鉛直間隔2π／a）",
      "イ": "図の2（鉛直1列、鉛直間隔4π／a）",
      "ウ": "図の3（鉛直から±θの2列、鉛直間隔2π／a）",
      "エ": "図の4（鉛直から±θの2列、鉛直間隔4π／a）",
      "オ": "図の5（水平から±θの2列、鉛直間隔2π／a）"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一つの斜線列からの強度は斜線に垂直な波数の線上にあり、二組の法線は鉛直からそれぞれ±θ傾く。各直線列は鉛直方向に周期aを持つので、斑点の鉛直座標は2π／aの整数倍となる。",
    "choiceExplanations": {
      "ア": "無限に長い斜線からの回折は、斜線に直交する波数方向に現れる。元の図形には傾きが反対の二種類の斜線があり、回折は一本の鉛直線に限られない。",
      "イ": "元の直線列は高さaで周期的に戻る。鉛直波数が4π／aの整数倍に限られるわけではなく、方向にも二種類ある。",
      "ウ": "一つの斜線列からの強度は斜線に垂直な波数の線上にあり、二組の法線は鉛直からそれぞれ±θ傾く。各直線列は鉛直方向に周期aを持つので、斑点の鉛直座標は2π／aの整数倍となる。",
      "エ": "二列の角度の向きは妥当である。高さaの平行移動に対して波の位相が2πの整数倍となる条件から、鉛直間隔は2π／aである。",
      "オ": "鉛直間隔は妥当であるが、斑点が並ぶ線は元の直線に平行ではなく直交する。したがって水平線ではなく鉛直線を基準に±θ傾く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q088-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q088-2.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q088-3.webp"
    ],
    "imageAltTexts": [
      "周期a、角度θの無限に長いジグザグ（図Ⅰ）",
      "反対に傾いた二つの直線列への分解（図Ⅱ）",
      "ラウエ斑点の並び方と間隔の五つの候補"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q089",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "三次元自由電子のフェルミ球と全エネルギー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "1辺の長さがLの立方体の箱の中に、質量mの自由電子N個が閉じ込められている系を考える。シュレーディンガー方程式に周期的境界条件を適用すると、整数nₓ、nᵧ、n_zを用いて、波数ベクトルはk＝(2π／L)(nₓ, nᵧ, n_z)で与えられる。波数空間内のフェルミ球の半径をフェルミ波数k_Fとする。N個の自由電子がフェルミ球内の全ての量子状態を占有しているものとする。このとき、電子の個数をスピンの自由度2を考慮して、k_F、Lを用いて表すことができる。また、フェルミ球内にある電子の全エネルギーEについても、スピンの自由度を考慮して、\n\nE＝[2L³／(2π)³]∭_(｜k｜≤k_F) [ℏ²｜k｜²／(2m)] dkₓ dkᵧ dk_z\n\nから求めることができる。このときのNとEの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "k_F³ L³／(3π²) ／ ℏ² k_F⁵ L²／(30π²m)",
      "イ": "k_F³ L³／(3π²) ／ ℏ² k_F⁵ L³／(30π²m)",
      "ウ": "k_F³ L³／(3π²) ／ ℏ² k_F⁵ L³／(10π²m)",
      "エ": "k_F³ L³／π² ／ ℏ² k_F⁵ L³／(30π²m)",
      "オ": "k_F³ L³／π² ／ ℏ² k_F⁵ L³／(10π²m)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "球座標では体積要素が4πk² dkであり、エネルギーの積分は∫ k⁴ dkとなる。スピンを含む状態密度と係数を掛けると、電子数とエネルギーの双方がこの式になる。",
    "choiceExplanations": {
      "ア": "電子数は妥当だが、波数空間の状態密度はL³に比例する。全エネルギーもNと同様に体積L³に比例する。",
      "イ": "スピンを含む状態密度2L³／(2π)³に球の体積4πk_F³／3を掛けるとN＝k_F³ L³／(3π²)となる。全エネルギーは同じ密度に(ℏ²／(2m))∫₀^(k_F) 4πk⁴ dkを掛けるので、E＝ℏ² k_F⁵ L³／(10π²m)である。",
      "ウ": "球座標では体積要素が4πk² dkであり、エネルギーの積分は∫ k⁴ dkとなる。スピンを含む状態密度と係数を掛けると、電子数とエネルギーの双方がこの式になる。",
      "エ": "Eは与えられた積分の結果とも合わない。Nを求めるには球の体積4πk_F³／3を使うため、分母に3が必要である。",
      "オ": "全エネルギーは与えられた積分から得られるが、電子数ではフェルミ球の体積を使うので分母に3が入る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q090",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "コリオリパラメータの緯度変化と水平発散",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "東向きにx軸、北向きにy軸を取り、海水の速度のx、y成分をそれぞれu、vとして、次式で表されるような北半球中緯度における定常で緩やかな流れを考える。\n\nfu＝−(1／ρ)∂p／∂y\nfv＝(1／ρ)∂p／∂x\n\nここで、fはコリオリパラメータ、pは海水の圧力である。また、ρは海水の密度で、定数とする。この流れの水平発散∂u／∂x＋∂v／∂yを表したものとして最も妥当なのはどれか。\nただし、β＝∂f／∂yとする。",
    "choices": {
      "ア": "−βu／f",
      "イ": "−βv／f",
      "ウ": "0",
      "エ": "βu／f",
      "オ": "βv／f"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "第一式をx、第二式をyで微分して足すと、圧力の混合偏微分は打ち消し合う。積の微分からf(∂u／∂x＋∂v／∂y)＋βv＝0となる。",
    "choiceExplanations": {
      "ア": "fが変わる方向は北向きのy方向である。積の微分は∂(fv)／∂yで生じるので、補正にはuではなくvが入る。",
      "イ": "第一式をx、第二式をyで微分して足すと、圧力の混合偏微分は打ち消し合う。積の微分からf(∂u／∂x＋∂v／∂y)＋βv＝0となる。",
      "ウ": "fが一定なら発散は0になる。ここではfがy方向に変化し、第二式の微分からβvが残る。",
      "エ": "βはfのy方向勾配であり、北向き成分vに掛かる。これを発散の式で移項すると符号も負になる。",
      "オ": "vへの依存は正しいが、積の微分で出るβvを右辺に移すため負号が付く。符号はfの勾配による流量の変化を相殺する向きである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q091",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "下向き長波放射による雲底高度の推定",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "厚い層雲に覆われている地点で、放射計で地上における下向き長波放射量を測定したところ、384 W／m²であった。地上での気温が297 Kであるとき、推定される雲底高度として最も妥当なのはどれか。\nただし、雲と地表の間での大気による長波放射の吸収はなく、雲底は黒体放射をしていると仮定する。また、絶対温度T［K］を持つ黒体表面においては、単位時間・単位面積当たりσT⁴［W／m²］のエネルギーが放射される。ここで、σはステファン・ボルツマン定数であり、σ＝6×10⁻⁸ W／(m²・K⁴)、大気の温度減率は6 K／kmとする。\nなお、必要ならば√2＝1.41を用いてよい。",
    "choices": {
      "ア": "1000 m",
      "イ": "1500 m",
      "ウ": "2000 m",
      "エ": "2500 m",
      "オ": "3000 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "384＝6×10⁻⁸ T⁴よりT＝200√2 Kである。指定の近似では282 Kとなり、地上との温度差15 Kを6 K／kmで割ると2.5 kmである。",
    "choiceExplanations": {
      "ア": "1000 mなら雲底は291 Kとなり、放射は約430 W／m²である。観測された384 W／m²を説明するにはより低温の雲底が必要である。",
      "イ": "1500 mでは雲底温度は288 Kとなる。放射量から四乗根で逆算した雲底温度は約283 Kであり、地上との差は9 Kより大きい。",
      "ウ": "2000 mなら雲底温度は285 Kである。観測からの推定温度は約283 Kなので、高度は2000 mよりも少し高い。",
      "エ": "384＝6×10⁻⁸ T⁴よりT＝200√2 Kである。指定の近似では282 Kとなり、地上との温度差15 Kを6 K／kmで割ると2.5 kmである。",
      "オ": "3000 mの雲底温度は297−18＝279 Kである。これは放射量から得られる約283 Kより低いので、推定高度としては高すぎる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q092",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "雲粒の凝結成長と併合成長の釣り合い",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "速度vで落下している水滴の成長過程を考える。この水滴の周囲には、落下速度を無視できるほど小さい水滴があり、小さい水滴の合計の質量は単位容積当たりqであるとする。水滴が凝結成長と併合成長によって増大するとき、それぞれの過程による成長速度が同程度になる水滴の半径として最も妥当なのはどれか。\nただし、凝結成長において(dM／dt)_凝結＝4πrDρᵥSを満たす。ここで、Mは水滴の質量、tは時間、rは水滴の半径、Dは水蒸気分子の空気中の拡散係数、ρᵥは水蒸気密度、Sは過飽和度であり、水滴は密度ρ_w（≠ρᵥ）の球形を仮定する。\nまた、併合成長において(dM／dt)_併合＝πr²vqを満たす。ここで、vはMg＝6πrηvであり、gは重力加速度の大きさ、ηは流体の粘性係数である。",
    "choices": {
      "ア": "r＝[πDSη／(gq)]^(1／2)",
      "イ": "r＝[4πρᵥDSη／(ρ_w gq)]^(1／2)",
      "ウ": "r＝[9DSη／(gq)]^(1／3)",
      "エ": "r＝[9ρᵥDSη／(gq)]^(1／4)",
      "オ": "r＝[18ρᵥDSη／(ρ_w gq)]^(1／3)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "M＝(4／3)πr³ρ_wからv＝2ρ_w gr²／(9η)を得る。二つの成長速度を等置すると4πrDρᵥS＝2πρ_w gq r⁴／(9η)であり、正のrについて解くとこの式になる。",
    "choiceExplanations": {
      "ア": "球の質量はr³に比例し、抵抗はrvに比例するので、終端速度vはr²に比例する。凝結のrと併合のr⁴を等しくする条件はr²ではなくr³の式になる。",
      "イ": "質量からv＝2ρ_w gr²／(9η)となる。πは二つの成長式を等置すると消え、残る半径の指数は1／3である。",
      "ウ": "半径は三乗根であるが、水蒸気密度の因子ρᵥと水滴の密度ρ_wの比が残る。球の質量の係数を代入すると数係数は18になる。",
      "エ": "併合成長はr⁴に比例するが、比較する凝結成長もrに比例する。両辺をrで割るため、釣り合う半径は四乗根にならない。",
      "オ": "M＝(4／3)πr³ρ_wからv＝2ρ_w gr²／(9η)を得る。二つの成長速度を等置すると4πrDρᵥS＝2πρ_w gq r⁴／(9η)であり、正のrについて解くとこの式になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q093",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "温位保存から求める気圧座標の鉛直流",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "成層圏において、ある空気塊の温位が、鉛直運動に伴って1時間で1 K下がった。空気塊は、南北の温位勾配が1 K／36 kmで北ほど下がり、南風が8 m／sで吹いている中を移動している。鉛直上向きに気圧が1 hPa下がると温位は10 K上がるような鉛直流ω［Pa／s］として最も妥当なのはどれか。\nただし、この空気塊は乾燥断熱運動していると仮定して、次の温位の保存式が成り立つとする。\n\n∂θ／∂t＋u∂θ／∂x＋v∂θ／∂y＋ω∂θ／∂p＝0\n\nここで、東向きにx軸、北向きにy軸、鉛直方向に気圧p軸を取り、θ［K］は温位、t［s］は時間、u［m／s］、v［m／s］はそれぞれ空気塊の速度のx、y成分とする。",
    "choices": {
      "ア": "−5×10⁻² Pa／s",
      "イ": "−5×10⁻³ Pa／s",
      "ウ": "0 Pa／s",
      "エ": "5×10⁻³ Pa／s",
      "オ": "5×10⁻² Pa／s"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "温位の時間変化を−1／3600 K／sとすると、北向きの移流は8×(−1／36000) K／sで、合わせて−5×10⁻⁴ K／sとなる。これをω(−0.1 K／Pa)で相殺するにはω＝−5×10⁻³ Pa／sである。",
    "choiceExplanations": {
      "ア": "鉛直流の符号は妥当だが、鉛直温位勾配は−10 K／hPa＝−0.1 K／Paである。時間変化と水平移流の合計−1.8 K／時をこの単位系で相殺すると、絶対値は5×10⁻³ Pa／sとなる。",
      "イ": "温位の時間変化を−1／3600 K／sとすると、北向きの移流は8×(−1／36000) K／sで、合わせて−5×10⁻⁴ K／sとなる。これをω(−0.1 K／Pa)で相殺するにはω＝−5×10⁻³ Pa／sである。",
      "ウ": "北に向かう流れと北ほど小さい温位の組合せで、水平移流項は負である。負の時間変化を加えても0にならないので、鉛直流が必要になる。",
      "エ": "気圧が下がるほど温位が上がるため∂θ／∂pは負である。正の鉛直寄与を得るには、ωも負でなければならない。",
      "オ": "この符号では鉛直移流も負になり、温位の保存式を満たさない。大きさも気圧の単位をPaに直して計算した値より10倍大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q094",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "海風を生む海陸の熱収支の違い",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "海風に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「海風は、海と陸の温度差によって生じる。日中、海と陸の温度差が生じる理由として以下が考えられる。\n(1) 海の熱容量が、陸のそれよりも［㋐］、そのため、海は温まりにくいのに対して、陸は温まりやすい。\n(2) 海面の方が陸面より蒸発量が大きく、太陽から受け取った熱は［㋑］となってしまうので、海水が昇温しにくい。\n(3) 海では、表層で吸収された熱が、混合によって深く輸送される。\nこのような理由で、海面温度の日変化は小さい。一方、地面温度の日変化は大きくなるため、温度差が生じる。海風の生成には陸の加熱が重要なので、［㋒］に海風は強くなると考えられる。」",
    "choices": {
      "ア": "大きく ／ 顕熱 ／ 冬よりも夏",
      "イ": "大きく ／ 潜熱 ／ 冬よりも夏",
      "ウ": "小さく ／ 潜熱 ／ 夏よりも冬",
      "エ": "小さく ／ 潜熱 ／ 冬よりも夏",
      "オ": "小さく ／ 顕熱 ／ 夏よりも冬"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "海は熱容量が大きく、蒸発と混合によって表面が温まりにくい。蒸発は潜熱を消費し、夏は陸への日射加熱により日中の海陸間の温度差が発達しやすい。",
    "choiceExplanations": {
      "ア": "海の熱容量が大きく、日射で陸の温度が上がりやすい点は妥当である。蒸発に使われるエネルギーは温度上昇を表す顕熱ではなく潜熱である。",
      "イ": "海は熱容量が大きく、蒸発と混合によって表面が温まりにくい。蒸発は潜熱を消費し、夏は陸への日射加熱により日中の海陸間の温度差が発達しやすい。",
      "ウ": "蒸発で使うエネルギーは潜熱であるが、海は陸より温度変化が小さいので熱容量は大きい。日中に陸が加熱されやすい夏の方が海風の生じる条件に合う。",
      "エ": "潜熱と夏は妥当である。一定量の熱で温度が上がりにくいのは、熱容量が大きい側である。",
      "オ": "海の温まりにくさには大きな熱容量と、蒸発による潜熱への配分が関係する。陸の加熱が弱い冬は、日中に海風を強める温度差も発達しにくい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q095",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "三層の定常熱伝導と熱伝導率",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地下の温度構造が1次元定常状態であり、熱源がなく、熱の移動は伝導のみによるものとする。このとき、地表から深さzにおける温度Tは、次のように表される。\n\nd／dz (k dT／dz)＝0\n\nここで、kは熱伝導率であり、zの関数である。また、熱流量（単位時間、単位面積当たりに流れる熱の量）は、熱伝導率と深さ方向の温度勾配の積k dT／dzとして求められる。\nいま、図のような熱伝導率の異なる三つの層を考える。熱流量が6.0×10⁻² W／m²で一様であり、層1、層2、層3の厚さがそれぞれ40 m、80 m、120 m、層1と層3の熱伝導率がそれぞれ2.0 W／(m・K)、1.5 W／(m・K)、層1の上面の温度が22.5 ℃、層3の下面の温度が30.5 ℃であるとき、層2の熱伝導率として最も妥当なのはどれか。",
    "choices": {
      "ア": "1.6 W／(m・K)",
      "イ": "2.0 W／(m・K)",
      "ウ": "2.4 W／(m・K)",
      "エ": "2.8 W／(m・K)",
      "オ": "3.2 W／(m・K)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "層1と層3の温度差は熱流量と厚さを掛けて各熱伝導率で割ると、1.2 Kと4.8 Kである。層2は残りの2.0 Kを80 mで生じるので、k＝0.06×80／2.0＝2.4である。",
    "choiceExplanations": {
      "ア": "この値では層2の温度差が0.06×80／1.6＝3 Kになる。既知の二層の温度差6 Kを足すと9 Kになり、観測された8 Kを超える。",
      "イ": "層1と層3で合計6 Kの温度差があり、層2に残る温度差は2 Kである。k＝2.0とすると層2だけで2.4 Kとなって大きすぎる。",
      "ウ": "層1と層3の温度差は熱流量と厚さを掛けて各熱伝導率で割ると、1.2 Kと4.8 Kである。層2は残りの2.0 Kを80 mで生じるので、k＝0.06×80／2.0＝2.4である。",
      "エ": "熱流量は三層を通じて共通なので、層2の温度差は0.06×80／kである。k＝2.8では2 Kより小さく、与えられた全体の温度差に届かない。",
      "オ": "層2は温度勾配2／80 K／mを持つ。k＝3.2ではこの勾配に対して熱流量が0.08 W／m²となり、設定された熱流量を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q095.webp"
    ],
    "imageAltTexts": [
      "地表から下へ並ぶ三層の厚さ、熱伝導率と境界温度"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q096",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "球の半径方向の自由振動と固有値",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球自由振動に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「地球自由振動は、主に大きな地震（断層運動）が発生したときに起きる地球の振動である。地球自由振動を理解するために、球の自由振動を考える。球の自由振動には、伸び縮み振動とねじれ振動があるが、ここでは伸び縮み振動の中でも最も単純な半径方向の振動だけを考える。この振動場は、球座標系(r, θ, φ)で次のように表される。\n\nu_r＝−k_α j₁(k_α r)\nu_θ＝u_φ＝0\nσ_rr＝−ρω²［j₀(k_α r)−(4β²／α²) j₁(k_α r)／(k_α r)］\n\nここで、u_r、u_θ、u_φはそれぞれの各軸方向の変位、σ_rrはr方向の鉛直応力である。また、αは球の縦波の速度、βは横波の速度、ρは密度、k_αは波数であり、\n\nj₀(k_α r)＝sin(k_α r)／(k_α r)\nj₁(k_α r)＝［sin(k_α r)−(k_α r)cos(k_α r)］／(k_α r)²\n\nである。\n球の半径をaとすれば、r＝aで［㋐］にならなければならない。この境界条件により、以下の特性方程式が得られる。\n\nk_α a／tan(k_α a)＝1−(α²／(4β²))(k_α a)²\n\nx＝k_α aとおき、両辺のグラフを描いてみれば分かるように、この方程式の実根は［㋑］。α＝√3 βとするとき、根は大きくなるにつれてπの整数倍に近づき、その根に対応するu_rの節の数は［㋒］する。\nなお、地球は半径a＝6370 kmの球で近似することができる。いま、地球の平均的な縦波の速度をα＝10 km／sとすれば、上の根に対応する自由振動の周期の最も長いものは約26分となり、実際に観測される地球の自由振動の周期に近いものとなる。」",
    "choices": {
      "ア": "u_r＝0 ／ 無数にある ／ 増加",
      "イ": "u_r＝0 ／ 有限個である ／ 減少",
      "ウ": "σ_rr＝0 ／ 無数にある ／ 増加",
      "エ": "σ_rr＝0 ／ 無数にある ／ 減少",
      "オ": "σ_rr＝0 ／ 有限個である ／ 増加"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "自由表面ではσ_rr＝0である。x cot xの各枝は左右の端で反対向きに発散して実根を繰り返し与え、k_αが大きくなるとj₁(k_α r)の零点が球内により多く入る。",
    "choiceExplanations": {
      "ア": "球の表面は自由に動けるので、変位は0に拘束されない。外部から応力を受けないため、半径方向の表面応力を0にする。",
      "イ": "変位を固定する条件は自由表面には適さない。各正の整数mについてx cot xは区間(mπ, (m＋1)π)で正から負へ無限に振れるので、有限な二次曲線と少なくとも一度交わる。",
      "ウ": "自由表面ではσ_rr＝0である。x cot xの各枝は左右の端で反対向きに発散して実根を繰り返し与え、k_αが大きくなるとj₁(k_α r)の零点が球内により多く入る。",
      "エ": "境界条件と実根の個数は妥当である。根が大きいほど波数も大きく、変位は半径方向により細かく振動して節が増える。",
      "オ": "自由表面の応力は0であり、波数が高くなるほど節が増える。特性方程式の左辺はπごとに発散を繰り返すので、根は有限個に限られない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q097",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "ホットスポット海山列の年代差",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球表面上でのプレート運動について考える。図のように、プレートA上に、ホットスポットによる火成活動で形成された海山列がある。この海山列にある二つの海山BとCについて、BC間の海山列に沿った距離は600 km、海山Bが形成された年代は1000万年前である。プレートAの絶対運動（マントル深部を基準とした運動）は、地球表面上の回転運動であり、その回転軸は地球表面上の点Pと地球の中心Oを通り、回転の角速度が100万年当たり0.60°であるとする。また、PとOと海山列のなす角は30°であるとする。ホットスポットの位置はマントル深部に対して動かないものとすると、海山Cが形成された年代として最も妥当なのはどれか。\nただし、地球は半径6400 kmの球であり、プレートAの絶対運動は時間変化しなかったものとする。",
    "choices": {
      "ア": "100万年前",
      "イ": "1000万年前",
      "ウ": "1900万年前",
      "エ": "2800万年前",
      "オ": "3700万年前"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "回転軸からの距離は3200 kmなので、100万年で進む長さは3200×0.60π／180 kmとなる。600 kmの移動には約1800万年かかり、図の運動方向で先に位置するCの年代は1000万年前にこれを加えた約2800万年前となる。",
    "choiceExplanations": {
      "ア": "プレートの運動方向の先にあるCはBより早くホットスポットを通過した海山である。したがってCの年代がBの1000万年前より新しくなることはない。",
      "イ": "距離600 kmを隔てている二つの海山は、同じホットスポットの上に異なる時期に形成された。回転速度が有限なので、同じ年代にはならない。",
      "ウ": "半径6400 kmの大円を使うと年代差を約900万年と見積もってしまう。海山列が動く小円の半径は回転軸からの距離6400 sin 30°＝3200 kmである。",
      "エ": "回転軸からの距離は3200 kmなので、100万年で進む長さは3200×0.60π／180 kmとなる。600 kmの移動には約1800万年かかり、図の運動方向で先に位置するCの年代は1000万年前にこれを加えた約2800万年前となる。",
      "オ": "年代差は海山列に沿った距離600 kmを小円上の速さで割って求める。その差は約1800万年であり、Bの年代に2700万年を足す必要はない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q097.webp"
    ],
    "imageAltTexts": [
      "回転軸OPと海山B・Cの距離関係を示す地球上の海山列"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q098",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "ひずみテンソルの主ひずみ",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "2次元直交座標系において、ひずみテンソル\n\n[eᵢⱼ]＝10⁻⁶［［1, 1／2］、［1／2, 1］］\n\nを考える。主ひずみは、せん断ひずみ（ひずみテンソルの非対角成分）が0になるように座標系を回転させたときのひずみテンソルの対角成分である。[eᵢⱼ]の主ひずみの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "(1／2)×10⁻⁶ ／ (1／2)×10⁻⁶",
      "イ": "(1／2)×10⁻⁶ ／ 1×10⁻⁶",
      "ウ": "(1／2)×10⁻⁶ ／ (3／2)×10⁻⁶",
      "エ": "1×10⁻⁶ ／ 1×10⁻⁶",
      "オ": "(3／2)×10⁻⁶ ／ (3／2)×10⁻⁶"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "対角成分が等しく、非対角成分が(1／2)×10⁻⁶なので、和と差の方向(1, 1)、(1, −1)が主方向となる。対応する固有値は(1±1／2)×10⁻⁶である。",
    "choiceExplanations": {
      "ア": "一方の主ひずみは(1／2)×10⁻⁶だが、二つの和は回転前と同じ2×10⁻⁶である。もう一方は(3／2)×10⁻⁶となる。",
      "イ": "主ひずみは元の行列の固有値である。対角の1×10⁻⁶は平均値であり、非対角成分の大きさだけ上下する。",
      "ウ": "対角成分が等しく、非対角成分が(1／2)×10⁻⁶なので、和と差の方向(1, 1)、(1, −1)が主方向となる。対応する固有値は(1±1／2)×10⁻⁶である。",
      "エ": "回転前の対角成分は両方1×10⁻⁶だが、せん断ひずみが残っている。主軸に回転することで対角成分は1／2と3／2に分かれる。",
      "オ": "(3／2)×10⁻⁶は大きい方の固有値である。二つともこの値とすると、回転で不変な対角和2×10⁻⁶に一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q099",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "四電極の電位差と均一媒質の比抵抗",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "電気探査では、大地に一対の電流電極を設置して電流を流し、それによって生じた電位差を測定して、電流と電位差の関係から大地の比抵抗構造を推定する。ここでは単純化して、大地を均一な比抵抗ρをもつ媒質で表現できると仮定する。図のように、一対の電流電極AとDを地中に設置して、電流I₀を流し、生じた電位差を地中の一対の電位電極BとCによって検出することを考える。BC間の距離をaとし、AB間、CD間の距離をともにbとするとき、BC間の電位差Vとして最も妥当なのはどれか。\nただし、A、B、C、Dは地表から十分離れており、同一直線上にあるものとする。また、地中に点電流源を置き、電流Iを流した場合、点電流源から距離rだけ離れた点の電位はρI／(4πr)と表されるものとする。ここで、Iは正負いずれの値も取り得る。",
    "choices": {
      "ア": "[ρI₀／(4π)](1／b−1／(a＋b))",
      "イ": "[ρI₀／(2π)](1／b−1／(a＋b))",
      "ウ": "[ρI₀／π](1／b−1／(a＋b))",
      "エ": "[ρI₀／(2π)](1／b＋1／(a＋b))",
      "オ": "[ρI₀／π](1／b＋1／(a＋b))"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Aを正、Dを負の点電流源とすると、Bの電位は(ρI₀／(4π))(1／b−1／(a＋b))である。Cの電位はその負の値となるため、BとCの差はBの電位の二倍である。",
    "choiceExplanations": {
      "ア": "この値はBの電位に一致する。対称に置かれたCはBと逆符号の電位を持つので、電位差はこの二倍になる。",
      "イ": "Aを正、Dを負の点電流源とすると、Bの電位は(ρI₀／(4π))(1／b−1／(a＋b))である。Cの電位はその負の値となるため、BとCの差はBの電位の二倍である。",
      "ウ": "点電流源の係数は問題でρI／(4π)と与えられている。BとCの差で二倍する一回の補正だけが必要である。",
      "エ": "距離に依存する二項には、Aから流入する電流とDで流出する電流が寄与する。電流の符号が逆なので距離の逆数は足さずに引く。",
      "オ": "AとDの符号を区別すれば、Bの電位は距離の逆数の差で決まる。電位差はそれを二倍するので、全体の係数はρI₀／(2π)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q099.webp"
    ],
    "imageAltTexts": [
      "電流電極A・D、電位電極B・Cと各電極間距離"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q100",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "アイソスタシーによる山体の地殻の根",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、ある地域の地表付近の模式的な断面を示したものであり、全ての地点においてアイソスタシーが成立している。この地域における大陸地殻の平均的な厚さをh̄として、地表に高さΔhの山体があるとき、山体の地下に張り出している大陸地殻部分の厚さxとして最も妥当なのはどれか。\nただし、大陸地殻の密度をρ_c、マントルの密度をρ_mとする。",
    "choices": {
      "ア": "[ρ_c／(ρ_m−ρ_c)]h̄",
      "イ": "[ρ_c／(ρ_m−ρ_c)]Δh",
      "ウ": "[ρ_m／(ρ_m−ρ_c)]h̄",
      "エ": "[ρ_m／(ρ_m−ρ_c)]Δh",
      "オ": "[ρ_m／(ρ_m−ρ_c)](h̄−Δh)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "山体が地表に加える単位面積当たりの質量はρ_cΔhである。根の部分はマントルを地殻で置き換えて質量を(ρ_m−ρ_c)xだけ減らすので、この二つを等置する。",
    "choiceExplanations": {
      "ア": "平均地殻厚h̄は左右両方に存在し、質量の差を取ると消える。余分な山体の厚さΔhが根の厚さを決める。",
      "イ": "山体が地表に加える単位面積当たりの質量はρ_cΔhである。根の部分はマントルを地殻で置き換えて質量を(ρ_m−ρ_c)xだけ減らすので、この二つを等置する。",
      "ウ": "h̄はどちらの柱にもあるため、補償深度までの重さを比べると相殺される。地表で加わった部分の密度はマントルのρ_mではなく地殻のρ_cとなる。",
      "エ": "高さΔhを使うのは妥当である。地表に増えたのは大陸地殻なので、分子にはその密度ρ_cを入れる。",
      "オ": "山が消えてΔh＝0になれば、根の厚さも0になる。この式では平均厚h̄に比例する根が残るため、補償の考え方と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q100.webp"
    ],
    "imageAltTexts": [
      "山体の高さΔhと地下に張り出す地殻の根の厚さx"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q101",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "島弧・海溝系における付加体と変成岩",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、海洋プレート沈み込み帯における代表的な島弧–海溝系の模式的な断面を示したものである。図中に示した領域A～Dに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐　Aは付加体と呼ばれ、海洋プレート上の堆積物や岩石が剥ぎ取られ、大陸プレートの縁に付け加わったものである。\n㋑　Bでは、浅い海で形成された石灰岩が主に堆積している。\n㋒　Cでは、海溝から沈み込んだ堆積物や海洋地殻が加熱され、ホルンフェルスと呼ばれる岩石が形成されている。\n㋓　Dで、マグマの熱によって変成作用を受けた石灰岩のことを大理石と呼ぶ。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aは海溝沿いでかき取られた物質の付加体である。Dではマグマの熱で石灰岩中の方解石などが再結晶し、大理石を生じる。",
    "choiceExplanations": {
      "ア": "Aの付加体の説明は正しい。Bの前弧海盆では一般に砕屑物が堆積し、浅海成石灰岩が主とは限らない。",
      "イ": "Aは海洋プレートから剥ぎ取られた堆積物などの集積である。Cの沈み込み帯では高圧型の変成作用が生じやすく、接触変成でできるホルンフェルスを当てるのは適さない。",
      "ウ": "Aは海溝沿いでかき取られた物質の付加体である。Dではマグマの熱で石灰岩中の方解石などが再結晶し、大理石を生じる。",
      "エ": "Bは前弧海盆であって浅海性石灰岩の集積を示していない。Cの沈み込みに伴う変成は、マグマ周辺の接触変成とは異なる。",
      "オ": "Dで石灰岩が熱変成して大理石となる説明は妥当である。Bの主な堆積物を浅海でできた石灰岩とする説明は前弧海盆の位置と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q101.webp"
    ],
    "imageAltTexts": [
      "沈み込み帯における領域A～D、海溝、マグマ溜り"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q102",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "プランジ褶曲の走向・傾斜と向斜",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、プランジ褶曲層の水平分布及び鉛直2方向の断面を模式的に示したものである。この図に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、図中の地層は逆転していないものとする。\n\n「Aの走向傾斜は［㋐］であり、①は［㋑］にプランジした［㋒］構造である。」",
    "choices": {
      "ア": "N30°W 40°S ／ 北 ／ 向斜",
      "イ": "N30°W 40°S ／ 南 ／ 背斜",
      "ウ": "N30°E 40°S ／ 北 ／ 向斜",
      "エ": "N30°E 40°S ／ 北 ／ 背斜",
      "オ": "N30°E 40°S ／ 南 ／ 向斜"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Aの走向線を北の矢印と比べるとN30°Eで、傾斜は40°Sである。①の軸は鉛直断面で谷状の向斜に対応し、水平面上の北側へ閉じる形から南へプランジする。",
    "choiceExplanations": {
      "ア": "向斜である点は妥当である。Aの走向を方位矢印と比べると北から東寄りであり、図の閉じ方から向斜軸の傾きは南向きとなる。",
      "イ": "南へのプランジは妥当であるが、Aの走向が北西ではなく北東である。①の軸を鉛直断面でたどると、地層は谷状に曲がっている。",
      "ウ": "走向傾斜と向斜である点は妥当である。地層が逆転していない向斜の平面図では、地層の閉じる側と軸が傾き下がる側は反対になる。",
      "エ": "Aの走向は北東である。①の鉛直断面では地層が下に凸なので向斜であり、平面図で北側に閉じる形からプランジは南となる。",
      "オ": "Aの走向線を北の矢印と比べるとN30°Eで、傾斜は40°Sである。①の軸は鉛直断面で谷状の向斜に対応し、水平面上の北側へ閉じる形から南へプランジする。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q102.webp"
    ],
    "imageAltTexts": [
      "北の方位、走向傾斜A、褶曲軸①を示す平面と鉛直断面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q103",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "地震波と岩石から推定する地球内部構造",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球内部構造に関する次の記述の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「地球内部の構造や構成物質は、複数の手法を組み合わせて推定されている。主に地震波の伝播特性から、地球は地殻、マントル、外核、内核から成るほぼ球対称な層構造を成していると考えられており、マントルは更に上部マントル、マントル遷移層、下部マントルに分けられる。また、マントルと核の間には、地震波速度不均質の程度が下部マントルよりも［㋐］境界層、いわゆるD″層が存在する。外核は［㋑］が伝わらないことから液体であると考えられている。地殻とマントルの構成物質は直接入手することができ、地殻は花こう岩質から玄武岩質の岩石、マントルは［㋒］質の岩石から成ることが分かっている。地殻、マントル及び［㋓］の化学組成と宇宙の元素存在度から、核は［㋔］から成ると推定されている。」",
    "choices": {
      "ア": "小さい ／ P波 ／ エクロジャイト ／ 隕石 ／ 金属鉄",
      "イ": "小さい ／ S波 ／ かんらん岩 ／ 隕石 ／ 珪酸塩",
      "ウ": "小さい ／ S波 ／ エクロジャイト ／ 海水 ／ 珪酸塩",
      "エ": "大きい ／ P波 ／ エクロジャイト ／ 海水 ／ 金属鉄",
      "オ": "大きい ／ S波 ／ かんらん岩 ／ 隕石 ／ 金属鉄"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "核の直上のD″層では地震波速度が強く不均質であり、液体外核をS波は通過しない。採取されたマントル岩石はかんらん岩質で、隕石などの組成も合わせると核は主に金属鉄と推定される。",
    "choiceExplanations": {
      "ア": "液体外核でも圧縮波であるP波は伝わる。せん断波のS波が伝わらないことが液体の証拠になる。",
      "イ": "S波とかんらん岩は妥当である。核は主要成分が金属鉄であり、D″層は上の下部マントルより地震波速度の不均質が大きい。",
      "ウ": "外核を通らないのはS波であるが、マントルの代表的な組成はかんらん岩質である。核の化学組成の推定には海水ではなく隕石の元素組成も比較する。",
      "エ": "D″層の強い不均質と金属鉄は妥当である。液体外核はP波を伝え、せん断の復元力を必要とするS波を伝えない。",
      "オ": "核の直上のD″層では地震波速度が強く不均質であり、液体外核をS波は通過しない。採取されたマントル岩石はかんらん岩質で、隕石などの組成も合わせると核は主に金属鉄と推定される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q104",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "地質図から読む地層の新旧と逆断層",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、ある地域の地質図である。この地質図に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、図中の地層は逆転していないものとする。また、地質図の破線は等高線、実線は地層の境界線を示したものである。\n\n「この地質図に示されている地層AからDのうち、最も古いものは地層［㋐］、最も新しいものは地層［㋑］である。断層Xは図の範囲内で地層の境界線がずれている。この断層による変位が傾斜方向である（走向変位がない）と仮定した場合、断層Xは東に傾斜した［㋒］であり、最新の活動時期は［㋓］である。」",
    "choices": {
      "ア": "C ／ B ／ 正断層 ／ 全ての地層が堆積した後",
      "イ": "C ／ B ／ 正断層 ／ 地層Aよりも前",
      "ウ": "C ／ B ／ 逆断層 ／ 全ての地層が堆積した後",
      "エ": "D ／ C ／ 正断層 ／ 地層Aよりも前",
      "オ": "D ／ C ／ 逆断層 ／ 全ての地層が堆積した後"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "DはBなどの下位にあり、Cは下位の地層境界を覆っている。断層両側の地層境界と等高線を比べると東の上盤が上昇した逆断層であり、Cも切られているので全層の堆積後に活動した。",
    "choiceExplanations": {
      "ア": "Cは他の地層の境界を覆っているので最も新しく、最古ではない。等高線と地層境界のずれを比べると、東側の上盤が上がっている。",
      "イ": "堆積順は下位のDから上位へたどる必要がある。断層が最新のCの境界もずらしているので、断層の最終活動をAより前とすることはできない。",
      "ウ": "逆断層で堆積後に動いた点は妥当である。Dが下位にあり、Bなどを覆うCが最も新しい。",
      "エ": "DとCの新旧関係は妥当である。東傾斜の断層では東側が上盤で、その側の上昇が読み取れ、Cもずれているため活動は全層堆積後である。",
      "オ": "DはBなどの下位にあり、Cは下位の地層境界を覆っている。断層両側の地層境界と等高線を比べると東の上盤が上昇した逆断層であり、Cも切られているので全層の堆積後に活動した。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q104.webp"
    ],
    "imageAltTexts": [
      "地層A～Dの境界線、等高線と断層Xを示す地質図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q105",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "傾斜不整合に覆われた向斜と最古の地層",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、ほぼ平坦なある地域を調査した際の模式的な地質図である。A層は砂岩、泥岩、石灰岩、B層はれき岩、砂岩から成る。B層のれき岩からは、A層の石灰岩のれきが見つかっている。この地質図に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、図中の地層は逆転していないものとする。\n\n「A層を表す地質構造群は、［㋐］方向に軸が通る褶曲構造であると考えられる。A層とB層の関係については、［㋑］を［㋒］不整合の関係で覆っているといえる。また、この地域で最も古い地層は、［㋓］であると考えられる。」",
    "choices": {
      "ア": "東西 ／ A層がB層 ／ 平行 ／ A層中の石灰岩",
      "イ": "東西 ／ B層がA層 ／ 傾斜 ／ A層中の砂岩",
      "ウ": "南北 ／ A層がB層 ／ 傾斜 ／ A層中の砂岩",
      "エ": "南北 ／ B層がA層 ／ 傾斜 ／ A層中の石灰岩",
      "オ": "南北 ／ B層がA層 ／ 平行 ／ B層中の砂岩"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "A層の地層は南北走向を示し、両側から中央に傾くので南北軸の向斜であり、外側の石灰岩が最も古い。A層由来のれきを含むB層が、傾斜の異なるA層を不整合に覆っている。",
    "choiceExplanations": {
      "ア": "A層の走向と反転する傾斜の位置から、褶曲軸は南北方向である。B層のれき岩がA層の石灰岩を含むので、B層がA層より新しい。",
      "イ": "傾斜不整合でB層がA層を覆う点は妥当である。A層の各層は中央へ傾くため中央の砂岩は上位にあり、外側の石灰岩が古い。",
      "ウ": "A層の軸は南北方向であるが、A層はB層の下位にある。B層のれきがA層に由来することから、A層の方が先にできていたことが分かる。",
      "エ": "A層の地層は南北走向を示し、両側から中央に傾くので南北軸の向斜であり、外側の石灰岩が最も古い。A層由来のれきを含むB層が、傾斜の異なるA層を不整合に覆っている。",
      "オ": "B層の走向・傾斜はA層と平行ではない。B層にはA層の石灰岩に由来するれきがあるので、B層中の砂岩が最古とはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q105.webp"
    ],
    "imageAltTexts": [
      "A層とB層の岩相、走向傾斜と調査ルートを示す地質図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q106",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "蛇行河川のポイントバーと堆積柱状図",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "河川における堆積作用に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「流れが緩やかになる平野部では、河川周辺は氾濫原となるが、河川自体は［㋐］となる。河川の外側斜面では水の流速が［㋑］ため、壁面が侵食され、内側斜面では堆積物が堆積することにより、ポイントバーが側方移動する。そのため、ある河川を模式的に示した図ⅠのAで得られる柱状図は、典型的には、図Ⅱの［㋒］のようになると考えられる。」",
    "choices": {
      "ア": "蛇行河川 ／ 速い ／ ①",
      "イ": "蛇行河川 ／ 速い ／ ②",
      "ウ": "蛇行河川 ／ 遅い ／ ①",
      "エ": "網状河川 ／ 速い ／ ②",
      "オ": "網状河川 ／ 遅い ／ ②"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "緩勾配の平野では流路が蛇行し、外側の速い流れが岸を削り、内側にポイントバーが成長する。Aでは下部の粗粒層から上部のより小規模な斜交層理を持つ砂層へ変わる②が対応する。",
    "choiceExplanations": {
      "ア": "蛇行外側の侵食と速い流れは妥当である。ポイントバーでは下部の粗粒堆積物から上に向けて砂層が細かくなる典型的な構造を持つ②が対応する。",
      "イ": "緩勾配の平野では流路が蛇行し、外側の速い流れが岸を削り、内側にポイントバーが成長する。Aでは下部の粗粒層から上部のより小規模な斜交層理を持つ砂層へ変わる②が対応する。",
      "ウ": "外側では流れが速いので河岸が侵食される。①のようなれき層と削り込みの反復より、②の上方細粒化がポイントバーに典型的である。",
      "エ": "外側は速く、柱状図は②である。図Ⅰは幾筋にも分かれる網状河川ではなく、一つの湾曲する流路の外岸と内岸を示している。",
      "オ": "②にはポイントバーの特徴が表れている。図の河川は単一流路が曲がる蛇行河川であり、侵食を受ける外側の流速は速い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q106-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q106-2.webp"
    ],
    "imageAltTexts": [
      "河道、氾濫原、ポイントバーと地点A（図Ⅰ）",
      "れき・砂・泥の分布を示す柱状図の二つの候補（図Ⅱ）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q107",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 107,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "化石の産出年代、産状と保存",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "化石に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　古生代カンブリア紀には、それ以前と比べて多様な動物の化石が産出されるようになる。この時代の代表的な化石動物群集としては、澄江動物群やエディアカラ動物群が挙げられる。\n㋑　過去の生物がその生活場所で化石化したものは自生又は原地性の化石であり、生活場所から離れた場所で化石化したものは他生又は異地性の化石である。\n㋒　生物の死骸は腐敗や分解を被るために、殻や骨や歯などの硬組織が化石として地層中に残されることが多いが、無酸素環境といった特殊な環境下では、軟組織が別の鉱物に置換されるなどによって状態良好な化石ができることがある。\n㋓　捕食者によって捕食を受けると、被食者は丸呑みされたり、断片化されたりするので、捕食を受けた痕跡を残す被食者の化石が見つかることはない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑、㋒",
      "エ": "㋒",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑の自生・他生は、生活場所で保存されたか移動先で保存されたかで区別する。㋒のように分解しにくい環境では軟組織の形も鉱物化などを通じて保存されることがある。",
    "choiceExplanations": {
      "ア": "澄江動物群はカンブリア紀の化石群である。一方、エディアカラ動物群はカンブリア紀より前の新原生代エディアカラ紀に属する。",
      "イ": "㋑の区分は妥当である。㋐はエディアカラ動物群の年代をカンブリア紀に含めている点が誤りである。",
      "ウ": "㋑の自生・他生は、生活場所で保存されたか移動先で保存されたかで区別する。㋒のように分解しにくい環境では軟組織の形も鉱物化などを通じて保存されることがある。",
      "エ": "軟組織が特殊な条件で保存される点は妥当である。生活場所との関係による自生と他生の区別も正しいので、㋑を加える。",
      "オ": "捕食の際に被食者が完全に失われるとは限らない。殻に開いた捕食孔や骨のかみ痕が残る化石が見つかることがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 107。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q108",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 108,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "炭酸塩の酸素同位体比のデルタ表記",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "サンゴ骨格、二枚貝の殻等の生物源炭酸塩の酸素同位体比は、過去の海水温の値を推定する際の代理指標になる。炭酸塩の酸素同位体比（¹⁸O／¹⁶O）自体は質量分析計によって測定されるが、過去の海水温の推定値を計算によって求める際には、δ¹⁸Oと呼ばれる量をパーミル単位で表した値を用いるのが慣例である。δ¹⁸Oを表す式として最も妥当なのはどれか。\nただし、測定試料（生物源炭酸塩）の酸素同位体比をR_sample、標準試料の酸素同位体比をR_stdとする。",
    "choices": {
      "ア": "(R_sample／R_std−1)×100",
      "イ": "(R_sample／R_std＋1)×100",
      "ウ": "(R_sample／R_std−1)×1000",
      "エ": "(R_sample／R_std)×1000",
      "オ": "(R_sample／R_std＋1)×1000"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "標準に対する相対差は(R_sample−R_std)／R_stdである。これを千分率で表すため、1000を掛ける。",
    "choiceExplanations": {
      "ア": "試料と標準の相対差の取り方は妥当である。100を掛けると百分率となるため、パーミルには1000を掛ける。",
      "イ": "標準と等しい試料ではδ値は0でなければならない。ここでは比に1を足してしまうほか、100はパーミルへの換算係数にならない。",
      "ウ": "標準に対する相対差は(R_sample−R_std)／R_stdである。これを千分率で表すため、1000を掛ける。",
      "エ": "この式では試料と標準の比が同じ場合にも1000になる。比から1を引いて、標準との相対的なずれを取る。",
      "オ": "換算係数1000は妥当だが、比に1を足すと標準より高いか低いかという差が表せない。標準の比を1として引く必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 108。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q109",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 109,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "シリカ含有量による火成岩と造岩鉱物の分類",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、火成岩の分類を示したものである。図中のA～Dに当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "デイサイト ／ 閃緑岩 ／ 石英 ／ 輝石",
      "イ": "デイサイト ／ 閃緑岩 ／ 方解石 ／ 輝石",
      "ウ": "蛇紋岩 ／ デイサイト ／ 石英 ／ 輝石",
      "エ": "閃緑岩 ／ デイサイト ／ 方解石 ／ 石英",
      "オ": "閃緑岩 ／ かんらん岩 ／ 輝石 ／ 石英"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "流紋岩と安山岩の間の火山岩はデイサイトであり、安山岩と同程度の珪酸量を持つ深成岩は閃緑岩である。珪酸に富む側のCは石英、苦鉄質側のDは輝石である。",
    "choiceExplanations": {
      "ア": "流紋岩と安山岩の間の火山岩はデイサイトであり、安山岩と同程度の珪酸量を持つ深成岩は閃緑岩である。珪酸に富む側のCは石英、苦鉄質側のDは輝石である。",
      "イ": "A、B、Dは妥当である。方解石は炭酸塩鉱物であり、二酸化ケイ素に富む火成岩の図でCに入る主要鉱物は石英である。",
      "ウ": "蛇紋岩は一般に超苦鉄質岩の変質でできる岩石である。図のAは火山岩のデイサイトであり、Bには深成岩が入る。",
      "エ": "安山岩に対応する深成岩は閃緑岩なので、デイサイトをBには置けない。低シリカの玄武岩側では、石英より輝石が代表的である。",
      "オ": "閃緑岩は深成岩なので上段のAには当たらない。Cは高シリカ側の石英、Dは低シリカ側の輝石である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 109。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q109.webp"
    ],
    "imageAltTexts": [
      "シリカ含有量に対する火成岩の分類と主な造岩鉱物の割合"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q110",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 110,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "海洋地殻と最上部マントルの岩石組成",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、平均的な海洋プレートにおける地殻から最上部マントルまでの模式的な断面を示したものである。図中の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "枕状溶岩 ／ 斑れい岩 ／ かんらん岩 ／ 6",
      "イ": "枕状溶岩 ／ 斑れい岩 ／ 花こう岩 ／ 60",
      "ウ": "枕状溶岩 ／ チャート ／ 花こう岩 ／ 60",
      "エ": "流紋岩 ／ 斑れい岩 ／ かんらん岩 ／ 60",
      "オ": "流紋岩 ／ チャート ／ かんらん岩 ／ 6"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "海底で玄武岩質の溶岩が水で急冷されて枕状溶岩となり、その下のシート状岩脈群を経て深部の斑れい岩に至る。地殻は約6 kmで、その下の最上部マントルは主にかんらん岩からなる。",
    "choiceExplanations": {
      "ア": "海底で玄武岩質の溶岩が水で急冷されて枕状溶岩となり、その下のシート状岩脈群を経て深部の斑れい岩に至る。地殻は約6 kmで、その下の最上部マントルは主にかんらん岩からなる。",
      "イ": "枕状溶岩と斑れい岩の位置は妥当である。海洋地殻は約6 kmで、最上部マントルは大陸地殻に多い花こう岩ではなくかんらん岩である。",
      "ウ": "チャートは珪質の堆積岩なので、シート状岩脈群の下の厚い火成岩層には当たらない。そこには玄武岩質マグマがゆっくり冷えた斑れい岩がある。",
      "エ": "斑れい岩とかんらん岩は妥当である。上部には海底噴出でできる玄武岩質枕状溶岩があり、地殻は60 kmよりずっと薄い。",
      "オ": "約6 kmとかんらん岩は妥当である。地殻上部は枕状溶岩、岩脈群の下は斑れい岩であって、流紋岩やチャートには対応しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 110。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q110.webp"
    ],
    "imageAltTexts": [
      "海洋プレートの堆積物、岩脈群、地殻下部と最上部マントル"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q111",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 111,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "石灰岩の成分、生成過程と用途",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "石灰岩に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「石灰岩は［㋐］を主成分とする岩石であり、二通りの生成過程がある。一つは、［㋑］の殻など石灰質の成分を持つ生物の遺骸が海底に堆積したことによるもので、もう一つは、［㋐］が［㋒］から析出し、海底に沈殿したことによるものである。\n石灰岩は、我が国が現在自給できる唯一の鉱産資源ともいわれ、［㋓］などの原料として使用されている。」",
    "choices": {
      "ア": "CaCO₃ ／ 有孔虫 ／ 海水 ／ セメント",
      "イ": "CaCO₃ ／ 有孔虫 ／ 火山灰 ／ 石膏",
      "ウ": "CaCO₃ ／ 放散虫 ／ 火山灰 ／ セメント",
      "エ": "CaSO₄・2H₂O ／ 有孔虫 ／ 海水 ／ 石膏",
      "オ": "CaSO₄・2H₂O ／ 放散虫 ／ 火山灰 ／ セメント"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "石灰岩の主成分は炭酸カルシウムCaCO₃であり、有孔虫などの石灰質の殻の集積や、海水からの化学的沈殿によって生成する。石灰岩の主な工業用途の一つはセメントの原料である。",
    "choiceExplanations": {
      "ア": "石灰岩の主成分は炭酸カルシウムCaCO₃であり、有孔虫などの石灰質の殻の集積や、海水からの化学的沈殿によって生成する。石灰岩の主な工業用途の一つはセメントの原料である。",
      "イ": "炭酸カルシウムと有孔虫は妥当である。化学的沈殿では海水から析出し、代表的な用途はセメント原料である。",
      "ウ": "セメント原料となる点は正しい。放散虫の骨格は一般に珪質で、石灰質の例には有孔虫の殻が当てはまる。",
      "エ": "CaSO₄・2H₂Oは石膏の化学式であり、石灰岩の主成分はCaCO₃である。有孔虫の殻を作る石灰質も炭酸カルシウムである。",
      "オ": "代表的な用途だけは妥当である。炭酸カルシウムは有孔虫などの殻の成分となり、化学的には海水からも沈殿する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 111。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q112",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 112,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "広域変成作用と低温高圧型変成岩",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "変成作用に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　接触変成作用は、水と触れることで生じる変成作用である。\n㋑　広域変成作用は、主に低温高圧型と高温低圧型に分類され、青色片岩は低温高圧型変成岩の代表である。\n㋒　三波川変成帯は代表的な高温低圧型変成帯の一つである。\n㋓　変成作用によって片理が発達した岩石のことを、片麻岩と呼ぶ。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "青色片岩は沈み込み帯などの低温高圧条件でできるため、㋑が妥当である。三波川変成帯も低温高圧型であり、片理が発達するというだけで片麻岩になるわけではない。",
    "choiceExplanations": {
      "ア": "接触変成作用は、主としてマグマが周囲の岩石を加熱するために生じる。水に触れることだけを成立条件にはしない。",
      "イ": "㋑に挙げる青色片岩は低温高圧の条件を示す。㋐の接触変成の例は貫入マグマ周辺の熱による変成である。",
      "ウ": "青色片岩は沈み込み帯などの低温高圧条件でできるため、㋑が妥当である。三波川変成帯も低温高圧型であり、片理が発達するというだけで片麻岩になるわけではない。",
      "エ": "三波川変成帯は沈み込みに関連した低温高圧型である。また、顕著な片理を持つ代表的な岩石には結晶片岩があり、片麻岩に限られない。",
      "オ": "片麻岩は鉱物の分離による縞状の片麻状組織などを特徴とする。変成岩に片理が発達しているというだけでは、片麻岩と判定できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 112。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q113",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 113,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "メタンハイドレートの安定条件と分布",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、メタンハイドレートが安定的に存在できる温度・圧力境界（実線）、及び、海水の深さ方向の温度変化（破線）を示したものである。メタンハイドレートに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　海底面が深い海域では、メタンハイドレートが安定に存在し得る層は薄くなる。\n㋑　メタンハイドレートは低温かつ高圧の条件下で形成されるため、永久凍土の地下に存在できる。\n㋒　メタンハイドレートは大陸から遠く離れた海洋深部に分布しており、大陸周辺の海底に有意な発見はない。\n㋓　全球的な寒冷化による海水準の低下や温暖化による海水温の上昇でメタンハイドレートが分解され、大量のメタンが海洋に放出される可能性がある。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "低温の永久凍土下で十分な圧力があれば、メタンハイドレートは安定に存在できる。海水準の低下による圧力減少や海水温上昇は、安定域から外れて分解する原因になり得る。",
    "choiceExplanations": {
      "ア": "低温の海底では深くなって圧力が上がるほど、より高い温度でも安定になり得る。海底面が深いだけで安定層が薄くなるとはいえない。",
      "イ": "㋐は水深による高圧側の効果と合わない。㋒も、大陸斜面などの堆積物中でメタンハイドレートが見つかっているため誤りである。",
      "ウ": "永久凍土の地下に存在し得る点は妥当である。海底での分布は遠洋深部に限られず、大陸周辺にも存在する。",
      "エ": "低温の永久凍土下で十分な圧力があれば、メタンハイドレートは安定に存在できる。海水準の低下による圧力減少や海水温上昇は、安定域から外れて分解する原因になり得る。",
      "オ": "海水温上昇による分解や海水準低下による減圧の可能性は妥当である。永久凍土下の低温かつ高圧の地層でも安定条件を満たすことがある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 113。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-suri-butsuri-chikyu/q113.webp"
    ],
    "imageAltTexts": [
      "メタンハイドレートの安定境界と海面からの深さに応じた海水温"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q114",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 114,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "部分溶融と微量元素の分配係数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "岩石や鉱物中に0.1質量％以下しか含まれていない元素を、微量元素と呼ぶ。マグマ中における微量元素の挙動を考える際には、分配係数と呼ばれる量が重要である。いま、ある微量元素を濃度C₀で含む岩石が部分溶融してマグマが生じる場合を考える。生成したマグマ中における微量元素の濃度をC_Lとし、マグマと融け残りの固相との間に化学平衡が成り立っているとき、C_L／C₀を表す式として最も妥当なのはどれか。\nただし、分配係数をD、部分溶融度をFとする。",
    "choices": {
      "ア": "1／(F＋D＋FD)",
      "イ": "1／(F＋D−FD)",
      "ウ": "FD／(F＋D＋FD)",
      "エ": "FD／(F＋D−FD)",
      "オ": "FD／(F＋D)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "融液の割合をF、固体の割合を1−Fとし、固体の濃度をDC_Lとすると、C₀＝F C_L＋(1−F)D C_Lとなる。これをC_L／C₀について解くと1／(F＋D−FD)である。",
    "choiceExplanations": {
      "ア": "固相の割合は1−Fである。質量収支で固相の濃度DC_Lにこれを掛けるので、交差項は−FDになる。",
      "イ": "融液の割合をF、固体の割合を1−Fとし、固体の濃度をDC_Lとすると、C₀＝F C_L＋(1−F)D C_Lとなる。これをC_L／C₀について解くと1／(F＋D−FD)である。",
      "ウ": "分子にはFやDを掛けず、質量収支全体をC_Lで割った値の逆数を取る。D＝1なら両相の濃度は等しく比は1となるが、この式はそうならない。",
      "エ": "分母は二相の量と濃度から求めた値で妥当である。ただし完全溶融F＝1ではC_L／C₀＝1でなければならず、分子にFDがあると一般に一致しない。",
      "オ": "固相の寄与はD全体ではなく(1−F)Dであり、分母には−FDが必要である。F＝1の極限を取れば、この式が完全溶融時の比1にならないことも分かる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 114。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-suri-butsuri-chikyu-q115",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 115,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "日本の地震・斜面・火山災害",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "日本の地質災害に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐　平成23年（2011年）東北地方太平洋沖地震の際、東北地方では最大5.3 m西に移動する地殻変動がみられた。\n㋑　南海トラフ地震は、南海トラフ周辺を震源とする海溝型地震で、過去1400年間をみると、約100～200年の間隔で繰り返し起きていると考えられている。\n㋒　斜面災害は、一般に、がけ崩れ、土石流、地すべりに分けられる。地すべりは、がけ崩れや土石流と比べて、移動速度が速く、影響範囲が広範囲にわたることが多い。\n㋓　火山の噴火や山体崩壊に伴う砕屑物が海に流入し、津波を起こすことがある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "南海トラフではプレート境界の海溝型地震が歴史上おおむね100～200年の間隔で繰り返している。火山活動や山体崩壊で大量の砕屑物が海に入れば、水を押しのけて津波を起こすことがある。",
    "choiceExplanations": {
      "ア": "南海トラフで大地震が繰り返す点は妥当である。2011年の東北地方の広域地殻変動では、太平洋側への大きな東向き変位が観測された。",
      "イ": "㋐の大きな変位の向きは東である。㋒の地すべりは広く影響することがあるが、一般にがけ崩れや土石流より緩やかな移動を指す。",
      "ウ": "南海トラフ地震の分類と繰り返し間隔は妥当である。地すべりががけ崩れや土石流より一般に速いという記述は妥当でない。",
      "エ": "南海トラフではプレート境界の海溝型地震が歴史上おおむね100～200年の間隔で繰り返している。火山活動や山体崩壊で大量の砕屑物が海に入れば、水を押しのけて津波を起こすことがある。",
      "オ": "火山由来の砕屑物が海に入って津波を生じる点は妥当である。地すべりは広い範囲を動かすことがある一方で、土石流などより移動速度が速いとは一般化できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018343.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 115。解説は過去問AIの独自作成。"
  }
];
