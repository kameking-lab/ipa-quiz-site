import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2026_SENMON_DOBOKU: Question[] = [
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q21",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "断面力と座屈",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "構造力学に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　長い柱が圧縮力を受ける場合、圧縮力を増加させると、ある荷重で荷重の方向と直角に曲がり始める。この現象を座屈という。\n㋑　構造物に集中荷重や等分布荷重等の外力が作用した場合、部材内部の断面には断面力が作用する。この断面力は、せん断力、曲げモーメントの2種類のみから成る。\n㋒　図のように、片持ち梁の自由端の先端に集中荷重が作用しているとき、断面のせん断力は、どの位置でも一定であり、曲げモーメントの絶対値は、支点（固定端）に近づくほど小さくなる。\n㋓　単純梁に等分布荷重が作用しているとき、単純梁の曲げモーメントが極値をとる位置は、せん断力が0となる位置になる。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "細長い柱が圧縮され、限界荷重で横にたわむ現象が座屈である。曲げモーメントの位置による変化率はせん断力なので、等分布荷重を受ける単純梁ではせん断力が0になるところが極値になる。",
    "choiceExplanations": {
      "ア": "㋐の説明は座屈を表している。片持ち梁の曲げモーメントの絶対値は、集中荷重の作用点から離れ、固定端に近づくほど大きくなる。",
      "イ": "細長い柱が圧縮され、限界荷重で横にたわむ現象が座屈である。曲げモーメントの位置による変化率はせん断力なので、等分布荷重を受ける単純梁ではせん断力が0になるところが極値になる。",
      "ウ": "部材の断面力には軸力も含まれる。自由端の集中荷重による曲げモーメントの絶対値は、固定端に近づくほど大きくなる。",
      "エ": "㋓のせん断力と曲げモーメントの関係は妥当である。断面力には、せん断力や曲げモーメントに加えて軸力なども含まれる。",
      "オ": "㋓は妥当だが、㋒の曲げモーメントは断面から荷重点までの距離に比例する。片持ち梁の固定端でその絶対値が最も大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q21.webp"
    ],
    "imageAltTexts": [
      "自由端に下向きの集中荷重を受ける片持ち梁"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q22",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "トラスの節点法",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、トラスの節点Dに鉛直集中荷重2Pが作用するとき、部材ACと部材ADに生じる部材力の大きさの組合せとして最も妥当なのはどれか。\nただし、部材力は引張を正とする。また、全ての部材の軸方向剛性は等しいものとし、部材の自重は無視するものとする。",
    "choices": {
      "ア": "－(√5/2)P／－P/5",
      "イ": "－(√5/2)P／P/2",
      "ウ": "－(√5/2)P／(2√5/5)P",
      "エ": "P/5／－P/5",
      "オ": "P/5／P/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "左右対称なのでAの鉛直反力はPであり、ACの鉛直方向の方向余弦が2/√5なのでACは－(√5/2)Pとなる。ACの左向き水平成分はP/2であり、ADにはP/2の引張力が生じる。",
    "choiceExplanations": {
      "ア": "ACは圧縮で大きさ(√5/2)Pとなる。節点Aでその左向き水平成分を打ち消すADには、右向きに引く力P/2が必要である。",
      "イ": "左右対称なのでAの鉛直反力はPであり、ACの鉛直方向の方向余弦が2/√5なのでACは－(√5/2)Pとなる。ACの左向き水平成分はP/2であり、ADにはP/2の引張力が生じる。",
      "ウ": "ACの値は正しいが、その水平方向の分力を求めるときは方向余弦1/√5を使う。したがってADの引張力は(√5/2)P×(1/√5)＝P/2となる。",
      "エ": "節点Aの上向き反力Pを打ち消すため、ACには下向き成分を生じる圧縮が必要になる。その水平成分を打ち消すADは引張である。",
      "オ": "ADの部材力は合っているが、ACは節点Aを斜め下に押す圧縮材である。鉛直成分のつり合いからACの値は負になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q22.webp"
    ],
    "imageAltTexts": [
      "中央の節点Dに2Pが下向きに作用する対称なトラス"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q23",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "ヒンジ付きラーメンの反力",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、ラーメン構造に鉛直集中荷重及び等分布荷重が作用するとき、支点Eにおける水平反力H_Eの大きさとして最も妥当なのはどれか。\nただし、部材の自重は無視するものとする。",
    "choices": {
      "ア": "4.7 kN",
      "イ": "9.4 kN",
      "ウ": "18.8 kN",
      "エ": "37.6 kN",
      "オ": "56.4 kN"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aまわりの全体のモーメントのつり合いからEの鉛直反力V_Eは(8－144)/10＝－13.6 kNとなる。右側についてCまわりのモーメントを取ると12H_E＋6V_E－144＝0なのでH_E＝18.8 kNである。",
    "choiceExplanations": {
      "ア": "高さ12 mに作用する分布荷重は24 kNで、その合力の位置は中点である。全体で鉛直反力を求めた後、右半分のヒンジCまわりのモーメントにこの合力を入れる。",
      "イ": "9.4 kNは必要な水平反力の半分である。ヒンジCまわりでH_Eの腕は柱の高さ12 mであり、分布荷重の合力の腕は6 mである。",
      "ウ": "Aまわりの全体のモーメントのつり合いからEの鉛直反力V_Eは(8－144)/10＝－13.6 kNとなる。右側についてCまわりのモーメントを取ると12H_E＋6V_E－144＝0なのでH_E＝18.8 kNである。",
      "エ": "支点Eの水平反力には、ヒンジCからEまでの垂直距離12 mを掛ける。6 mはCから分布荷重の合力の高さまでの距離であり、H_Eの腕には使わない。",
      "オ": "分布荷重の合力24 kNは柱の中点に作用し、ヒンジCまわりの腕は6 mである。鉛直反力も含めたモーメントのつり合いではH_Eは18.8 kNになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q23.webp"
    ],
    "imageAltTexts": [
      "中間ヒンジCのあるラーメンに4 kNの荷重と2 kN/mの水平分布荷重が作用"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q24",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "ゲルバー梁の曲げモーメント",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、ゲルバー梁の点D、F、Gに鉛直集中荷重が作用するとき、曲げモーメント図の概形として最も妥当なのはどれか。\nただし、梁の自重は無視するものとし、曲げモーメントは図に示す向きを正とする。",
    "choices": {
      "ア": "DとGで正、Bで負、A・E・Cで0となる連続図",
      "イ": "DとGで負、Bで正、Fで勾配が変化する連続図",
      "ウ": "DとGで負、Bで正、A・E・Cで0となる連続図",
      "エ": "DとFとGで段差が生じ、Bで0となる図",
      "オ": "DとFとGで段差が生じ、EとBで0となる図"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "左の梁AEでは反力Aが4 kNになり、Dのモーメントは正、ヒンジEでは0である。右側の梁ではEからBまでの荷重がBで負のモーメントを生じ、Gでは正になる。",
    "choiceExplanations": {
      "ア": "左の梁AEでは反力Aが4 kNになり、Dのモーメントは正、ヒンジEでは0である。右側の梁ではEからBまでの荷重がBで負のモーメントを生じ、Gでは正になる。",
      "イ": "Fで図の勾配が変わることは妥当である。点Bは左側の下向き荷重により負の曲げモーメントとなるので、選択肢の正の表示は符号が逆である。",
      "ウ": "左側の単純梁では、下向きの集中荷重Dに対して正の曲げモーメントが出る。Dを負、Bを正に描くこの図は符号の関係が逆である。",
      "エ": "鉛直集中荷重はせん断力に段差を生じさせるが、集中モーメントがない場合、曲げモーメントは連続する。Bの上では曲げモーメントが負になる。",
      "オ": "内部ヒンジEで曲げモーメントは0になるが、支点Bで0になるとは限らない。D、F、Gに作用しているのは集中荷重であり、曲げモーメントに段差は作らない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q24.webp"
    ],
    "imageAltTexts": [
      "支点A・B・C、内部ヒンジE、荷重点D・F・Gがあるゲルバー梁"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-doboku/q24-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q24-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q24-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q24-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q24-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q25",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "開水路の運動量保存",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、水路床が水平な広幅矩形断面水路に水が流れている。水路中に、奥行き方向に一様な形状の障害物が固定されているとき、障害物から水に加わる単位幅当たりの力Fとして最も妥当なのはどれか。\nただし、Fは左向きを正とし、水の密度をρ、重力加速度の大きさをg、単位幅当たりの流量をq、断面Ⅰでの水深をh₁、断面Ⅱでの水深をh₂とする。また、底面摩擦は無視するものとし、断面Ⅰ、Ⅱは障害物から十分に離れており、それぞれの断面における水圧分布は静水圧分布に従うものとする。",
    "choices": {
      "ア": "ρq²(h₂－h₁)/(h₁h₂)－ρg(h₂－h₁)",
      "イ": "－ρq²(h₂－h₁)/(h₁h₂)",
      "ウ": "ρq²(h₂－h₁)/(h₁h₂)",
      "エ": "ρq²(h₁－h₂)/(h₁h₂)－(1/2)ρg(h₂²－h₁²)",
      "オ": "ρq²(h₂－h₁)/(h₁h₂)－(1/2)ρg(h₂²－h₁²)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "右向きを正にした運動量式はρgh₁²/2－ρgh₂²/2－F＝ρq(q/h₂－q/h₁)である。これを左向きのFについて解くと、ρq²(h₂－h₁)/(h₁h₂)－ρg(h₂²－h₁²)/2になる。",
    "choiceExplanations": {
      "ア": "流速の変化に対応する第1項は妥当である。水圧は深さとともに増すので、断面全体の静水圧合力には水深の二乗が入る。",
      "イ": "断面Ⅰ・Ⅱには静水圧合力も働く。左向きの障害物力について解くと、運動量の項は流出から流入を引いた値の符号を反転する。",
      "ウ": "第1項は、流入と流出の運動量流束の差に当たる。両断面の静水圧合力P₁とP₂の差も、流体に働く力として加える必要がある。",
      "エ": "水圧合力の差は合っているが、運動量の項の符号が逆である。左向きを正とするFを求めるときは、流入側の速度q/h₁から流出側の速度q/h₂を引く。",
      "オ": "右向きを正にした運動量式はρgh₁²/2－ρgh₂²/2－F＝ρq(q/h₂－q/h₁)である。これを左向きのFについて解くと、ρq²(h₂－h₁)/(h₁h₂)－ρg(h₂²－h₁²)/2になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q25.webp"
    ],
    "imageAltTexts": [
      "水深h₁とh₂の間に置かれた障害物と、左向きに正の力F"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q26",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "開水路の層流速度分布",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のような広幅矩形断面水路に水が層流状態で流れているとき、この水路の流速分布の概形として最も妥当なのはどれか。\nただし、水表面における空気との摩擦抵抗は無視するものとする。",
    "choices": {
      "ア": "水路床で0、水面で最大となる放物線",
      "イ": "深さによらずほぼ一定の分布",
      "ウ": "水面まで直線的に増える分布",
      "エ": "水面に達する前に急増して頭打ちになる分布",
      "オ": "水面と水路床の間で最大となる分布"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "水路床では粘着条件により流速が0になり、空気との摩擦を無視する自由水面では速度勾配が0になる。重力と粘性がつり合う層流では、この二つを満たす放物線となる。",
    "choiceExplanations": {
      "ア": "水路床では粘着条件により流速が0になり、空気との摩擦を無視する自由水面では速度勾配が0になる。重力と粘性がつり合う層流では、この二つを満たす放物線となる。",
      "イ": "水路床で流速が0になるため、全ての深さで同じ流速にはならない。粘性の影響で、水面に向かって速度が増える分布ができる。",
      "ウ": "直線分布では傾きが水面でも0にならない。空気との摩擦がない自由水面ではせん断応力が0なので、粘性による速度勾配も0である。",
      "エ": "自由水面付近の速度変化は小さくなるが、層流の速度分布は流れを駆動する重力と粘性のつり合いから放物線になる。急に増えて水面手前からほぼ一定という形にはならない。",
      "オ": "自由水面にせん断応力がなければ、流速は水面で最大になり、その点で速度勾配が0になる。水面より下に最大値を置く分布はこの条件に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q26.webp"
    ],
    "imageAltTexts": [
      "自由水面と水路床を持つ広幅矩形水路"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-doboku/q26-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q26-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q26-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q26-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-doboku/q26-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q27",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "管路の連続式と動水勾配線",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、水が左から右に定常状態で流れる管路に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\nただし、断面Aから断面Cまで管路の断面積は一定とする。\n㋐　断面Aにおける断面平均流速v_Aと、断面Bにおける断面平均流速v_Bの関係は、v_A＜v_Bとなる。\n㋑　断面Bにおける流量Q_Bと、断面Dにおける流量Q_Dの関係は、Q_B＝Q_Dとなる。\n㋒　断面Cの直後の急拡部において、動水勾配線は上昇する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "定常な非圧縮流なので、BとDの流量は等しい。急拡部では速度水頭の減少が急拡損失を上回り、圧力水頭が回復するため動水勾配線が上昇する。",
    "choiceExplanations": {
      "ア": "BとDを通る流量は連続の式により等しい。AとBも流量が等しく、断面積も等しいので、平均流速は同じである。",
      "イ": "急拡部で動水勾配線が上がることは妥当である。AとBは同じ流量と断面積を持つため、平均流速についてv_A＜v_Bにはならない。",
      "ウ": "流量が等しいという㋑は妥当である。C直後では断面が広がって速度水頭が減り、損失を差し引いても圧力水頭が増えるので、㋒も入る。",
      "エ": "定常な非圧縮流なので、BとDの流量は等しい。急拡部では速度水頭の減少が急拡損失を上回り、圧力水頭が回復するため動水勾配線が上昇する。",
      "オ": "急拡部で動水勾配線が上昇する㋒は妥当である。流入や分岐のない定常管路ではどの断面の流量も等しいため、㋑も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q27.webp"
    ],
    "imageAltTexts": [
      "水槽の間の管路に断面A・B・C・DとC直後の急拡部が示されている"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q28",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "湿潤密度・含水比と間隙比",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "ある地域の地盤から土を採取したところ、土粒子密度が2.8 g/cm³、湿潤密度が1.3 g/cm³、含水比が120％であった。この土の間隙比として最も妥当なのはどれか。\nただし、水の密度は1.0 g/cm³とする。",
    "choices": {
      "ア": "2.8",
      "イ": "3.1",
      "ウ": "3.4",
      "エ": "3.7",
      "オ": "4.0"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "含水比1.2なので乾燥密度は1.3/(1＋1.2) g/cm³である。全体積と粒子体積の比は土粒子密度を乾燥密度で割った値なので、1を引くと間隙比は約3.74となる。",
    "choiceExplanations": {
      "ア": "土粒子密度を水の密度で割った2.8は土粒子の比重である。間隙比は空隙体積を土粒子体積で割った値なので、試料全体の体積も必要になる。",
      "イ": "含水比120％は水の質量が土粒子質量の1.2倍という意味である。乾燥密度は1.3/(1＋1.2)になり、2.8をこの値で割って1を引く。",
      "ウ": "乾燥密度は湿潤密度を2.2で割った約0.591 g/cm³である。間隙比は2.8/0.591－1であり、3.4よりも大きい。",
      "エ": "含水比1.2なので乾燥密度は1.3/(1＋1.2) g/cm³である。全体積と粒子体積の比は土粒子密度を乾燥密度で割った値なので、1を引くと間隙比は約3.74となる。",
      "オ": "1＋間隙比＝土粒子密度/乾燥密度である。値を代入すると1＋間隙比は約4.74になり、1を引いた結果は約3.74である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q29",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "擁壁にはたらくランキン主働土圧",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、高さ6 mの重力式擁壁の背面土の地表面に一様な載荷重q＝18 kN/m²が作用している。このとき、擁壁に作用する単位奥行き当たりの主働土圧の合力として最も妥当なのはどれか。\nただし、擁壁は剛体で、擁壁背面の表面摩擦は無視できるものとし、背面土の湿潤単位体積重量γ_t＝18 kN/m³、粘着力c＝0 kN/m²、せん断抵抗角（内部摩擦角）φ＝30°とする。",
    "choices": {
      "ア": "144 kN/m",
      "イ": "216 kN/m",
      "ウ": "676 kN/m",
      "エ": "868 kN/m",
      "オ": "1296 kN/m"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "表面摩擦を無視しφ＝30°なので、ランキン主働土圧係数は(1－sin 30°)/(1＋sin 30°)＝1/3である。三角形分布の自重分と矩形分布の載荷重分を足すと(18×6²/2＋18×6)/3＝144 kN/mになる。",
    "choiceExplanations": {
      "ア": "表面摩擦を無視しφ＝30°なので、ランキン主働土圧係数は(1－sin 30°)/(1＋sin 30°)＝1/3である。三角形分布の自重分と矩形分布の載荷重分を足すと(18×6²/2＋18×6)/3＝144 kN/mになる。",
      "イ": "背面土の自重による土圧は深くなるほど増えるため三角形分布になる。載荷重の一定分と分けて積分し、両方に主働土圧係数1/3を掛ける。",
      "ウ": "背面土の自重と載荷重を深さで積分した値は432 kN/mである。水平の主働土圧は、その値に1/3を掛けるので、676 kN/mにはならない。",
      "エ": "載荷重は深さにかかわらず一定であり、土の自重による圧力だけが深さに比例する。主働土圧として両方を合わせると144 kN/mになる。",
      "オ": "1296 kN/mは面積432 kN/mに係数3を掛けた値で、受働土圧係数を使った計算に当たる。ここでは主働土圧係数1/3を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q29.webp"
    ],
    "imageAltTexts": [
      "高さ6 mの擁壁と水平な背面地表に作用する18 kN/m²の載荷重"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q30",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "圧密時間と排水距離",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "層厚3 mの粘土層の中央部から厚さ2 cmの供試体を採取して圧密試験を実施したところ、ある荷重圧力で圧密度90％に到達するまでに要する時間は2分であった。この粘土層に圧密試験と同じ荷重圧力を加えたとき、圧密度90％に到達するまでに要する時間として最も妥当なのはどれか。\nただし、原位置における粘土層の排水条件は片面排水、圧密試験における排水条件は両面排水であるものとする。",
    "choices": {
      "ア": "150時間",
      "イ": "187.5時間",
      "ウ": "750時間",
      "エ": "1687.5時間",
      "オ": "3000時間"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "同じ圧密度で時間は排水距離の二乗に比例する。距離は現場の片面排水で3 m、試験の両面排水で1 cmなので、2分×(3/0.01)²＝180,000分＝3000時間である。",
    "choiceExplanations": {
      "ア": "圧密度が同じとき、時間は排水距離の比そのものではなく、その二乗に比例する。室内の排水距離1 cmと現場の3 mで二乗比を求める。",
      "イ": "層厚を使う前に排水条件から最長の排水距離を求める。室内の両面排水では厚さの半分の1 cm、現場の片面排水では層全体の3 mになる。",
      "ウ": "室内試験の厚さ2 cmを排水距離としてそのまま使うと、距離比150の二乗から750時間になる。両面排水での最長距離はその半分の1 cmである。",
      "エ": "現場では排水面が一つなので、最も遠い位置から排水面まで3 mある。粘土層の厚さと供試体の厚さの比を取るだけでは、片面と両面の条件の差を考慮できない。",
      "オ": "同じ圧密度で時間は排水距離の二乗に比例する。距離は現場の片面排水で3 m、試験の両面排水で1 cmなので、2分×(3/0.01)²＝180,000分＝3000時間である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q31",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "閉合トラバースの閉合比",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のような閉合トラバースの測量を行ったところ、トラバースの総測線長が12.500 m、緯距の総和Yが0.007 m、経距の総和Xが0.024 mであった。このとき、この閉合トラバースの閉合比として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.0010",
      "イ": "0.0015",
      "ウ": "0.0020",
      "エ": "0.0025",
      "オ": "0.0030"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "閉合差は√(0.024²＋0.007²)＝0.025 mである。総測線長で割れば、閉合比は0.025/12.500＝0.0020となる。",
    "choiceExplanations": {
      "ア": "閉合差はXとYを直交成分として長さを求めるので0.025 mである。これを総測線長12.500 mで割ると0.0020になる。",
      "イ": "閉合差には経距の成分0.024 mが含まれるので、全体でも0.024 mより大きい。0.0015に測線長12.500 mを掛けた値はこれを下回る。",
      "ウ": "閉合差は√(0.024²＋0.007²)＝0.025 mである。総測線長で割れば、閉合比は0.025/12.500＝0.0020となる。",
      "エ": "成分0.024 mと0.007 mを足した0.031 mを使うと約0.0025になる。二つは直交するため、実際の閉合差は平方和の平方根で求める。",
      "オ": "約0.0030であれば閉合差は約0.0375 mになる。XとYを単純に足しても0.031 mなので、そのような長さにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q31.webp"
    ],
    "imageAltTexts": [
      "閉合点のずれを緯距と経距の成分で示すトラバース"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q32",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "鉄筋コンクリートの材料と耐久性",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリートに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　コンクリートの熱膨張係数は、鉄筋の熱膨張係数の1/10程度である。\n㋑　水セメント比が高いほど、コンクリートの圧縮強度は高くなる。\n㋒　かぶりを設定するときは、鉄筋コンクリート構造物に要求される耐久性を考慮する必要がある。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "かぶりは、鉄筋を中性化や塩化物などによる腐食から守るコンクリートの厚さである。構造物に必要な耐久性や使用環境を考慮して決める。",
    "choiceExplanations": {
      "ア": "コンクリートと鉄筋の熱膨張係数は通常、いずれもおよそ10⁻⁵/℃の桁で近い。熱による変形に大きな差が生じにくいことは、両者を組み合わせる上で都合がよい。",
      "イ": "㋒のかぶりと耐久性の関係は妥当である。コンクリートと鉄筋の熱膨張係数には、㋐のいう約10倍の開きはない。",
      "ウ": "水セメント比が高いと硬化後に空隙が増えやすい。同じ材料や養生条件であれば、一般に水セメント比が低いほど圧縮強度は高い。",
      "エ": "かぶりを定める際には耐久性を考える。水セメント比を高くすると、一般にコンクリートの圧縮強度は低下するので、㋑は誤りである。",
      "オ": "かぶりは、鉄筋を中性化や塩化物などによる腐食から守るコンクリートの厚さである。構造物に必要な耐久性や使用環境を考慮して決める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q33",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "アルカリ骨材反応",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "コンクリートのアルカリ骨材反応に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　アルカリ骨材反応とは、コンクリート中のアルカリ成分と反応性骨材が化学反応を起こし、反応生成物が膨張することによってひび割れが生じる現象である。\n㋑　フライアッシュセメント（B種又はC種）を使用することは、アルカリ骨材反応を抑制するための有効な対策の一つである。\n㋒　コンクリートへの水分の供給が遮断されることで、アルカリ骨材反応が促進される。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "アルカリ成分と反応性骨材が反応し、生成物の膨張によってひび割れが起こる。フライアッシュセメントB種・C種の使用はその抑制策の一つである。",
    "choiceExplanations": {
      "ア": "㋐は反応と膨張によるひび割れを説明している。抑制効果のあるフライアッシュセメントの使用を挙げた㋑も妥当である。",
      "イ": "アルカリ成分と反応性骨材が反応し、生成物の膨張によってひび割れが起こる。フライアッシュセメントB種・C種の使用はその抑制策の一つである。",
      "ウ": "㋐は妥当だが、㋒の水分の影響は逆である。水分は反応生成物の膨張を助けるので、外部からの水分を抑えることは劣化の進行を抑える方向に働く。",
      "エ": "フライアッシュセメントを使用する対策は妥当である。反応性骨材とアルカリ成分の反応が膨張ひび割れを生むという㋐も妥当である。",
      "オ": "水分の供給があると反応生成物が吸水し、膨張しやすくなる。供給を遮断すると促進されるという説明は当てはまらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q34",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "鉄筋コンクリートのひび割れ",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "コンクリートのひび割れに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\nただし、各記述は施工時に関する説明であり、図には施工起因以外のひび割れを表したものも含まれている。\n㋐　図Ⅰのひび割れは、コンクリートを打ち込んでから硬化するまでの間に、セパレータや埋設金物による拘束の影響を受け、不均一な沈下が生じたことに起因するものと推測される。\n㋑　図Ⅱのひび割れは、不適当なコンクリートの打重ねによって形成されたコールドジョイントに起因するものと推測される。\n㋒　図Ⅲのひび割れは、コンクリートを打ち込むときの材料分離や、締固め不足などによる豆板（ジャンカ）に起因するものと推測される。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "硬化前にコンクリートが沈下すると、セパレータや埋設金物がその動きを妨げ、周囲に沈みひび割れができることがある。図Ⅰの金物付近から伸びるひび割れはこの特徴に合う。",
    "choiceExplanations": {
      "ア": "硬化前にコンクリートが沈下すると、セパレータや埋設金物がその動きを妨げ、周囲に沈みひび割れができることがある。図Ⅰの金物付近から伸びるひび割れはこの特徴に合う。",
      "イ": "㋐の沈みひび割れは妥当である。コールドジョイントはコンクリートの打重ね面に沿って現れるため、図Ⅱの広い範囲の網状のひび割れに対応しない。",
      "ウ": "㋐は妥当である。豆板はモルタルが十分に回らず粗骨材が露出し、空隙が多くなる施工上の欠陥であり、図Ⅲの横方向に繰り返す線状のひび割れとは形が異なる。",
      "エ": "道路橋床版の網状ひび割れは、輪荷重の繰返しによる疲労などでも生じる。打重ねのコールドジョイントであれば、打重ね面に沿った不連続部が生じる。",
      "オ": "豆板では粗骨材が露出して周囲に空隙が残る。橋脚表面に横方向の線がいくつも並ぶ図Ⅲのひび割れを、豆板の特徴だけでは説明できない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-doboku/q34.webp"
    ],
    "imageAltTexts": [
      "擁壁、道路橋床版、橋脚の三つのひび割れの例"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q35",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "都市計画",
    "topicTags": [
      "地域地区と市街地開発事業",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の都市計画に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　都市計画区域の要件を満たしていない区域であっても、将来的に市街化が見込まれる場合に、土地利用をあらかじめ規制しておく区域を、市街化調整区域という。\n㋑　地域地区は、用途の適正な配分、都市の再生の拠点整備、良好な景観の形成等の目的に応じた土地利用を実現するために設定する。\n㋒　市街地開発事業は、市街地を面的、計画的に開発整備する事業であり、土地収用、換地、権利変換といった各種の手法により、宅地の整備や公共施設の整備等を行う事業である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "地域地区は用途配分や景観形成などの目的で土地利用を誘導する。市街地開発事業では換地などの手法を用い、宅地や公共施設を面的に整備する。",
    "choiceExplanations": {
      "ア": "市街化調整区域は、都市計画区域内で市街化を抑制する区域である。都市計画区域の外で土地利用の規制を行う仕組みには準都市計画区域がある。",
      "イ": "㋑の地域地区の目的は妥当である。㋐の市街化調整区域は都市計画区域の外側に設けるものではなく、市街化区域と区分することで市街化を抑制する区域である。",
      "ウ": "面的整備を行う市街地開発事業の説明は妥当である。市街化調整区域は都市計画区域内に区域区分として設定する。",
      "エ": "地域地区を用途配分や景観形成などのために設定する㋑は妥当である。市街地開発事業について宅地や公共施設を面的に整備するとした㋒も妥当である。",
      "オ": "地域地区は用途配分や景観形成などの目的で土地利用を誘導する。市街地開発事業では換地などの手法を用い、宅地や公共施設を面的に整備する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q36",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "道路工学",
    "topicTags": [
      "道路線形と生活道路の安全対策",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の道路交通に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　道路線形の設計に当たっては、自動車の走行に対する安全性・快適性や、地形条件からみた経済性だけでなく、視覚的・運転心理的にも良好であることが求められる。\n㋑　生活道路における安全対策のための「狭さく」の主な効果は、交通量の抑制である。\n㋒　生活道路における安全対策として、最高速度30 km/hの区域規制と、ライジングボラードやハンプ等の物理的デバイスを組み合わせた区域を、ゾーン30プラスという。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "道路線形では運転者が進行方向を自然に見通せるかなども考慮する。ゾーン30プラスは最高速度30 km/hの区域規制と、ハンプなどの物理的対策を組み合わせた施策である。",
    "choiceExplanations": {
      "ア": "㋐の道路線形の設計に関する説明は妥当である。速度の区域規制とハンプなどの物理的な対策を組み合わせる㋒も妥当である。",
      "イ": "㋐は妥当である。㋑の狭さくは道路の幅を局所的に狭くすることで通行車両の走行速度を抑えることが主な効果である。",
      "ウ": "道路線形では運転者が進行方向を自然に見通せるかなども考慮する。ゾーン30プラスは最高速度30 km/hの区域規制と、ハンプなどの物理的対策を組み合わせた施策である。",
      "エ": "狭さくでは通る車両が進路に注意し、減速することが期待される。直接の目的は交通量を減らすことよりも、車両の走行速度を抑えることである。",
      "オ": "㋒のゾーン30プラスの説明は妥当である。㋑の狭さくの主な効果は、通過する車両の速度の抑制である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q37",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "河川工学",
    "topicTags": [
      "河川堤防の構造と高さ",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の堤防に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　堤防の高さは、原則として、計画高水位に、計画高水流量に応じた余裕高を加えた値以上とする。\n㋑　堤防は、流水による浸食及び浸透の作用だけでなく、自重による沈下及びすべり破壊等に対しても安全である必要がある。\n㋒　堤防は、原則として、その全部若しくは主要な部分をコンクリートによる構造にすることとされている。",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "堤防高には、計画高水位に計画高水流量に応じた余裕高を加える。堤防には流水による浸食・浸透だけでなく、沈下やすべり破壊に対する安全性も求められる。",
    "choiceExplanations": {
      "ア": "㋐と㋑は妥当である。河川堤防は土堤が原則であり、全部や主要部分をコンクリート造とすることが原則ではない。",
      "イ": "堤防高には、計画高水位に計画高水流量に応じた余裕高を加える。堤防には流水による浸食・浸透だけでなく、沈下やすべり破壊に対する安全性も求められる。",
      "ウ": "余裕高に関する㋐は妥当である。㋒のコンクリート構造は地形などの事情により採用することはあるが、堤防の原則は土堤である。",
      "エ": "㋑の安全性に関する説明は妥当である。堤防の主な部分をコンクリートで造ることが原則という㋒は誤りである。",
      "オ": "原則として主要部を土で築く土堤を用いる。コンクリートで全部又は主要部分を構成する仕様は、通常の原則に当たらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q38",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "河川工学",
    "topicTags": [
      "潮汐・観測基準面・東京湾平均海面",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "潮位や潮汐に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　観測基準面（O.D.L.）は、平均海面から主要4分潮の振幅の和だけ下げることによって算出できる。\n㋑　潮汐は、地球に対する月及び太陽の引力と、地球の天体運動に基づく慣性力との差によって、海水が移動することで生じる。\n㋒　東京湾平均海面（T.P.）は、100年以上前の観測結果から設定された東京湾の平均海面であり、現在の東京湾の平均海面とは必ずしも一致しない。",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "潮汐は月・太陽の引力と地球の運動に伴う慣性力による起潮力で生じる。T.P.は過去の東京湾の潮位観測で定めた基準であり、現在の平均海面と必ず一致するものではない。",
    "choiceExplanations": {
      "ア": "月や太陽の影響と東京湾平均海面の説明は妥当である。平均海面から主要4分潮の振幅の和を引くのは略最低低潮面の求め方で、潮位を測る観測基準面とは別である。",
      "イ": "T.P.の説明は妥当である。主要4分潮の振幅から求める面は略最低低潮面であり、各観測所で潮位を測るための観測基準面を一般に意味するものではない。",
      "ウ": "㋑は潮汐の成因を説明している。㋒のT.P.も、過去の観測を基にした基準なので現在の平均海面と必ずしも一致しない。",
      "エ": "潮汐は月・太陽の引力と地球の運動に伴う慣性力による起潮力で生じる。T.P.は過去の東京湾の潮位観測で定めた基準であり、現在の平均海面と必ず一致するものではない。",
      "オ": "T.P.についての㋒は妥当である。月・太陽の引力と地球の運動によって海水が周期的に移動するという㋑も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q39",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "環境工学",
    "topicTags": [
      "公共用水域の環境基準とアオコ",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の水環境に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　化学的酸素要求量（COD）は、水中に溶存する有機物の量に関する指標であり、国が定める河川の水質汚濁に係る環境基準の一つとされている。\n㋑　公共用水域の水質汚濁に係る環境基準は、人の健康の保護に関する環境基準及び生活環境の保全に関する環境基準から成る。\n㋒　アオコとは、湖沼などの閉鎖性水域の富栄養化によって藍藻類が異常に増殖し、水面が青色の粉をちりばめたように変色する現象であるが、景観の悪化による観光産業への影響がある以外は、生態系等への影響はないとされている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "該当なし"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "公共用水域の水質汚濁に関する国の環境基準は、人の健康の保護と生活環境の保全に関するものに分かれる。健康への影響や水域の利用・生態系に関わる項目をそれぞれ対象とする。",
    "choiceExplanations": {
      "ア": "㋑の環境基準の二つの区分は妥当である。有機汚濁の指標には、河川では主に生物化学的酸素要求量（BOD）、湖沼・海域では化学的酸素要求量（COD）を用いる。",
      "イ": "河川の生活環境の保全に関する基準では、有機汚濁の指標にBODを使う。アオコは景観を悪化させるほか、溶存酸素の低下など生態系に影響しうる。",
      "ウ": "公共用水域の水質汚濁に関する国の環境基準は、人の健康の保護と生活環境の保全に関するものに分かれる。健康への影響や水域の利用・生態系に関わる項目をそれぞれ対象とする。",
      "エ": "㋑の基準の区分は妥当である。藍藻類の大量発生は、分解時に酸素を消費して魚類などに影響を及ぼすことがある。",
      "オ": "人の健康の保護および生活環境の保全を目的とした基準があるため、㋑は妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-doboku-q40",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "環境工学",
    "topicTags": [
      "下水道管路の老朽化と点検",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の下水道に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「令和5年度末時点において、我が国における全国の下水道管路の総延長約［㋐］km（都市下水路を除く）のうち、標準耐用年数50年を経過した管路延長の割合は全体の約7％であるが、今後は急速に増加する見込みである。\nこのような中、令和7年1月に埼玉県八潮市で下水道管の破損に起因する道路陥没事故が発生した。下水道管の腐食の原因の一つとして、下水道で発生する有毒な［㋑］によるものがある。\nこの事故を踏まえ、全国の優先度が高い下水道管路において、緊急点検が行われ、［㋒］等のデジタル技術が用いられた。」",
    "choices": {
      "ア": "5万／メタンガス／管口カメラ",
      "イ": "5万／硫化水素／BIM/CIM",
      "ウ": "50万／メタンガス／BIM/CIM",
      "エ": "50万／硫化水素／管口カメラ",
      "オ": "50万／硫化水素／BIM/CIM"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全国の管路は令和5年度末で約50万kmあり、硫化水素は硫酸を生じてコンクリートを腐食させることがある。緊急点検では、管路内部の状態を管口カメラなどで確認した。",
    "choiceExplanations": {
      "ア": "管口カメラは現地で管路内部を確認するために使われる。管路の総延長は約50万kmで、コンクリート管の腐食に関わる有毒ガスは硫化水素である。",
      "イ": "硫化水素は腐食に関与する。管路の総延長は約50万kmで、緊急点検では現地で内部を撮影する管口カメラなどが使われた。",
      "ウ": "約50万kmという総延長は合っている。硫化水素から硫酸が生じると管が腐食しうるため、硫化水素が当てはまり、内部確認には管口カメラなどが用いられた。",
      "エ": "全国の管路は令和5年度末で約50万kmあり、硫化水素は硫酸を生じてコンクリートを腐食させることがある。緊急点検では、管路内部の状態を管口カメラなどで確認した。",
      "オ": "総延長と硫化水素は妥当である。BIM/CIMは構造物の情報をデジタルモデルとして管理・共有する考え方であり、管の内面を現場で確認する機器は管口カメラである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  }
];
