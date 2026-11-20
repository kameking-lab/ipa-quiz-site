import type { Question } from "@/lib/questions/types";

export const KAIJO_HOAN_GAKKO_2023_GAKKA_BUTSURI: Question[] = [
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q27",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "相対速度",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "船Aは東向きに10 m/sの速さで進み、船Bは北向きに10 m/sの速さで進んでいる。Aから見たBが進む向きと速さとして最も妥当なのはどれか。",
    "choices": {
      "ア": "北東向きに10 m/s",
      "イ": "北東向きに14 m/s",
      "ウ": "南東向きに14 m/s",
      "エ": "北西向きに10 m/s",
      "オ": "北西向きに14 m/s"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Aを基準にすると、Bは西向きと北向きにそれぞれ10 m/sの成分を持つ。したがって、北西向きで速さは10√2≒14 m/sとなる。",
    "choiceExplanations": {
      "ア": "Bの北向きの速度からAの東向きの速度を引くため、東西成分は西向きになる。速さには南北成分と東西成分の両方が効く。",
      "イ": "14 m/sは二つの速度成分から求められるが、Bの速度からAの東向き速度を引くので合成の向きは西に傾く。",
      "ウ": "南東向きになるのはAの速度からBの速度を引いた場合で、Bから見たAの相対速度である。",
      "エ": "北西向きは正しいが、北と西の各成分が10 m/sなので、速さを一方の成分の大きさ10 m/sだけでは表せない。",
      "オ": "Aを基準にすると、Bは西向きと北向きにそれぞれ10 m/sの成分を持つ。したがって、北西向きで速さは10√2≒14 m/sとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q28",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "力とモーメントのつり合い",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、長さ1.2 mの軽い一様な棒を、端Aから0.80 mの点Oで糸につるす。Aに重さ15 Nのおもりをつるし、もう一方の端Bに鉛直下向きの力を加えて棒を水平に静止させたとき、Oに付けた糸の張力の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "35 N",
      "イ": "40 N",
      "ウ": "45 N",
      "エ": "50 N",
      "オ": "55 N"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Oまわりのモーメントをつり合わせると、B側の力は15×0.80÷0.40＝30 Nとなる。張力は下向きの力の合計15＋30＝45 Nである。",
    "choiceExplanations": {
      "ア": "張力35 NならBでの下向きの力は20 Nになり、Oまわりのモーメントは8 N·mとなる。A側の12 N·mとつり合わない。",
      "イ": "張力40 NならB側の力は25 Nとなる。Bの腕の長さ0.40 mを掛けた10 N·mは、A側の12 N·mより小さい。",
      "ウ": "Oまわりのモーメントをつり合わせると、B側の力は15×0.80÷0.40＝30 Nとなる。張力は下向きの力の合計15＋30＝45 Nである。",
      "エ": "張力50 NではBの力が35 Nとなり、B側のモーメントは14 N·mになる。これはAのおもりによる12 N·mより大きい。",
      "オ": "55 Nの張力とつり合うにはBに40 Nがかかることになる。その場合のモーメント16 N·mでは棒の水平を保てない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "点Oでつられた棒のA端に15 Nのおもり、B端に下向きの力がかかる原図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q29",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "斜面上の運動方程式",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、水平面とのなす角がθの滑らかな斜面上に、糸でつながれた質量mの物体Aと質量3mの物体Bがある。Aを斜面と平行な向きに大きさFの力で引くと、AとBは糸でつながれたまま斜面を上り始めた。このとき、Bの加速度の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "F/(4m)−g sinθ",
      "イ": "F/(4m)−g cosθ",
      "ウ": "F/(3m)−g sinθ",
      "エ": "F/(3m)−g cosθ",
      "オ": "F/(3m)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "二物体を一体とみれば質量は4mで、斜面方向の合力はF−4mg sinθである。これを4mで割ると、両物体の共通の加速度が求まる。",
    "choiceExplanations": {
      "ア": "二物体を一体とみれば質量は4mで、斜面方向の合力はF−4mg sinθである。これを4mで割ると、両物体の共通の加速度が求まる。",
      "イ": "g cosθは斜面に垂直な重力成分に対応する。斜面に沿って運動を妨げるのはg sinθの成分である。",
      "ウ": "FはAに加えられており、AとBを合わせた系に働く外力として扱う。加速度を求める分母はBだけの質量3mでなく総質量4mとなる。",
      "エ": "質量3mだけでFを割るとAの慣性を計算に入れられない。加えて、重力の斜面方向成分はcosθではなくsinθを使う。",
      "オ": "Bを引くのは糸の張力であり、BにFが直接働くわけではない。斜面方向の重力も加速度に影響する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q29.webp"
    ],
    "imageAltTexts": [
      "角度θの斜面に沿ってつながれた物体AとBを力Fで引く原図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q30",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "仕事と運動エネルギー",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "滑らかな水平面上を速さ2.0 m/sで運動している質量4.0 kgの物体に力を加えたところ、物体の運動方向は変わらず、速さは4.0 m/sになった。このとき、加えた力がした仕事として最も妥当なのはどれか。",
    "choices": {
      "ア": "4.0 J",
      "イ": "8.0 J",
      "ウ": "16 J",
      "エ": "24 J",
      "オ": "32 J"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "水平面が滑らかなので、加えた力の仕事は運動エネルギーの増分に等しい。1/2×4.0×(4.0²−2.0²)＝24 Jとなる。",
    "choiceExplanations": {
      "ア": "加えた力の仕事は速さの差だけからは算出できず、運動エネルギーの変化を使う。初めの8 Jから最後の32 Jに増えたので、仕事は4.0 Jより大きい。",
      "イ": "8.0 Jは速さ2.0 m/sでの初めの運動エネルギーである。仕事は、最後の運動エネルギーからこの8.0 Jを差し引いた量である。",
      "ウ": "速さが2倍になると運動エネルギーは4倍になる。初めの8 Jを単純に2倍した16 Jは、仕事の値にならない。",
      "エ": "水平面が滑らかなので、加えた力の仕事は運動エネルギーの増分に等しい。1/2×4.0×(4.0²−2.0²)＝24 Jとなる。",
      "オ": "32 Jは速さ4.0 m/sに達した時点での運動エネルギーである。増加分を求めるには初めからあった8 Jを差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q31",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ばねと力学的エネルギー",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな水平面上で、ばね定数3.0×10² N/mのばねの一端を壁に固定し、他端に質量1.2 kgの小球を押しつけ、自然長から0.20 mだけ縮めた状態から静かに放したところ、小球は、ばねが自然長になった位置でばねから離れ、水平面とつながる滑らかな曲面に沿って滑り上がった。このとき、小球が達する最高点の水平面からの高さとして最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²とし、小球の運動とばねの変形は同一平面内で生じるものとする。",
    "choices": {
      "ア": "0.10 m",
      "イ": "0.20 m",
      "ウ": "0.30 m",
      "エ": "0.40 m",
      "オ": "0.50 m"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ばねの弾性エネルギーは1/2×300×0.20²＝6.0 Jである。最高点ではこれが重力による位置エネルギー1.2×10×hとなるので、h＝0.50 mを得る。",
    "choiceExplanations": {
      "ア": "高さ0.10 mで増える重力による位置エネルギーは1.2 Jである。ばねから得た6.0 Jのうち4.8 Jが運動エネルギーとして残るため、最高点より低い。",
      "イ": "0.20 mはばねの縮みであり、小球の上昇高さとは異なる。その高さでの位置エネルギー2.4 Jは、ばねの弾性エネルギー6.0 Jに達しない。",
      "ウ": "0.30 mの高さでは位置エネルギーの増加は3.6 Jである。出発時のばねに蓄えられた6.0 Jはこの点でまだ使い切られていない。",
      "エ": "0.40 mで得られる位置エネルギーは4.8 Jなので、最高点の条件である位置エネルギー6.0 Jに届かない。",
      "オ": "ばねの弾性エネルギーは1/2×300×0.20²＝6.0 Jである。最高点ではこれが重力による位置エネルギー1.2×10×hとなるので、h＝0.50 mを得る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q31.webp"
    ],
    "imageAltTexts": [
      "圧縮したばねが小球を押し出し、小球が滑らかな曲面を上る原図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q32",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "浮力",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "それぞれ一様な物体A、B、Cを、密度ρ₀で一様な液体中に完全に沈める。Aは体積V、密度ρ、Bは体積2V、密度ρ、Cは体積V、密度2ρである。A、B、Cが受ける浮力の大きさをそれぞれF_A、F_B、F_Cとしたとき、F_A、F_B、F_Cの関係を表したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "F_A＜F_B＜F_C",
      "イ": "F_A＜F_C＜F_B",
      "ウ": "F_A＝F_B＜F_C",
      "エ": "F_A＝F_C＜F_B",
      "オ": "F_A＝F_B＝F_C"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "液体の密度は共通であり、浮力の大きさは完全に沈めた物体の体積に比例する。AとCの体積はV、Bは2Vなので、F_A＝F_C＜F_Bとなる。",
    "choiceExplanations": {
      "ア": "Cは密度が大きいが、浮力は押しのけた液体の体積で決まる。体積が最大なのはBなので、Cの浮力が最大にはならない。",
      "イ": "Bの浮力が最大である点は合うが、AとCは同じ体積の液体を押しのけるので、二つの浮力は等しい。",
      "ウ": "AとBは同じ密度でも体積が異なり、完全に沈めたときにBが受ける浮力はAの2倍である。",
      "エ": "液体の密度は共通であり、浮力の大きさは完全に沈めた物体の体積に比例する。AとCの体積はV、Bは2Vなので、F_A＝F_C＜F_Bとなる。",
      "オ": "すべて完全に沈んでいても、押しのけた液体の量が等しいとは限らない。BはAやCの2倍の体積を持つので、受ける浮力も2倍となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q32.webp"
    ],
    "imageAltTexts": [
      "密度ρ₀の液体に体積と密度の異なる三つの物体を沈めた原図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q33",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "比熱",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "ある金属でできた250 gの物体を20 ℃から80 ℃に上昇させるのに4.5 kJの熱量を必要とした。この金属の比熱として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.30 J/(g·K)",
      "イ": "0.40 J/(g·K)",
      "ウ": "0.50 J/(g·K)",
      "エ": "0.60 J/(g·K)",
      "オ": "0.70 J/(g·K)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "温度上昇は80−20＝60 K、熱量は4,500 Jである。Q＝mcΔTより、比熱は4,500÷(250×60)＝0.30 J/(g·K)となる。",
    "choiceExplanations": {
      "ア": "温度上昇は80−20＝60 K、熱量は4,500 Jである。Q＝mcΔTより、比熱は4,500÷(250×60)＝0.30 J/(g·K)となる。",
      "イ": "0.40 J/(g·K)の金属なら、250 gを60 K温めるために6,000 Jが必要になる。実測値の4,500 Jより大きい。",
      "ウ": "この比熱では熱量は250×0.50×60＝7,500 Jとなり、加えた4.5 kJと一致しない。",
      "エ": "比熱0.60 J/(g·K)では同じ温度上昇に9.0 kJを要する。これは問題の熱量の2倍である。",
      "オ": "この値を用いると必要な熱量は10.5 kJになり、4.5 kJで起きた60 Kの温度上昇を説明できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q34",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "熱力学第一法則",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "滑らかに動くピストンのついた容器に閉じ込めた理想気体が、次のア、イのように変化したとき、それぞれの場合の気体の内部エネルギーの変化に関する記述の組合せとして最も妥当なのはどれか。\nア 気体を圧縮して3.5×10² Jの仕事をしたところ、気体は2.0×10² Jの熱を放出した。\nイ 温度を一定に保ったまま気体に3.5×10² Jの熱を与えたところ、気体は膨張した。",
    "choices": {
      "ア": "ア増加する・イ減少する",
      "イ": "ア増加する・イ変わらない",
      "ウ": "ア減少する・イ増加する",
      "エ": "ア減少する・イ減少する",
      "オ": "ア変わらない・イ変わらない"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "アの内部エネルギー変化は受けた仕事350 Jから放出熱200 Jを引いた＋150 Jである。イは理想気体の温度が一定なので内部エネルギーが変わらない。",
    "choiceExplanations": {
      "ア": "アでは気体が受けた仕事が放出した熱量を上回るので、内部エネルギーが増加する。イは温度一定なので、理想気体の内部エネルギーは減少しない。",
      "イ": "アの内部エネルギー変化は受けた仕事350 Jから放出熱200 Jを引いた＋150 Jである。イは理想気体の温度が一定なので内部エネルギーが変わらない。",
      "ウ": "アの圧縮では気体が外部から仕事をされるので、仕事は気体にとってエネルギーの流入である。イで加えた熱は膨張の仕事に回り、内部エネルギーは増えない。",
      "エ": "アでは放出熱以上の仕事を外部から受けるため、内部エネルギーが増加する。イでは温度が保たれるため、膨張しても内部エネルギーは減少しない。",
      "オ": "イで内部エネルギーが一定なのは正しい。アでは仕事350 Jと放出熱200 Jが等しくないので、変化が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q35",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "音波と回折",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "音に関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「音（音波）は、波の一種であり、媒質が［ア］伝わる［イ］である。波に共通する現象は、音においても観察することができる。例えば、直接には姿が見えなくても、塀の向こう側の人の声が聞こえることがある。これは、音が［ウ］し、塀の背後にも届くためである。」",
    "choices": {
      "ア": "ア 気体のときのみ・イ 縦波・ウ 回折",
      "イ": "ア 気体のときのみ・イ 横波・ウ 干渉",
      "ウ": "ア 気体、液体、固体のいずれであっても・イ 縦波・ウ 回折",
      "エ": "ア 気体、液体、固体のいずれであっても・イ 縦波・ウ 干渉",
      "オ": "ア 気体、液体、固体のいずれであっても・イ 横波・ウ 干渉"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "音の圧縮波は気体・液体・固体を伝わり、媒質が波の進行方向に振動する縦波である。塀のような障害物の背後に波が回り込む現象は回折と呼ぶ。",
    "choiceExplanations": {
      "ア": "塀の背後に広がる現象は回折である。音の圧縮波は空気だけでなく、水や固体を媒質としても伝わる。",
      "イ": "音の圧縮波は、粒子の振動方向が伝播方向に平行な縦波である。媒質も気体に限られず、塀を回り込む現象は干渉ではない。",
      "ウ": "音の圧縮波は気体・液体・固体を伝わり、媒質が波の進行方向に振動する縦波である。塀のような障害物の背後に波が回り込む現象は回折と呼ぶ。",
      "エ": "障害物を回り込んで波が広がるのは回折である。干渉は複数の波の重ね合わせにより強め合いや弱め合いが生じる現象である。",
      "オ": "音の圧縮波の振動方向は進行方向に平行であり、横波の説明は当てはまらない。塀の裏に届く現象は波の回折である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q36",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "弦の固有振動",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように、振動数fのおんさAに付けた弦の端に、滑車を通しておもりをつり下げ、おんさを振動させたところ、PQ間に3倍振動の定常波が生じた。次に、おんさAを、振動数の異なるおんさBに取り替えて同じ実験をしたところ、PQ間に5倍振動の定常波が生じた。おんさBの振動数として最も妥当なのはどれか。",
    "choices": {
      "ア": "(3/5)f",
      "イ": "(2/3)f",
      "ウ": "(3/2)f",
      "エ": "(5/3)f",
      "オ": "(5/2)f"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "同じ弦とおもりを用いるので波の速さは一定である。弦の振動数は次数に比例し、3倍振動がfなら5倍振動は(5/3)fとなる。",
    "choiceExplanations": {
      "ア": "3/5は5倍振動の波長を3倍振動の波長で割った場合の比である。波の速さが同じなので振動数の比はその逆になる。",
      "イ": "5倍振動では3倍振動より波長が短くなり、振動数が高くなる。2/3をfに掛けると振動数を下げてしまう。",
      "ウ": "3/2は2倍振動に対する3倍振動の比である。この問題では同じ弦の3倍振動と5倍振動を比べる。",
      "エ": "同じ弦とおもりを用いるので波の速さは一定である。弦の振動数は次数に比例し、3倍振動がfなら5倍振動は(5/3)fとなる。",
      "オ": "この比は基準を2倍振動とした場合の値である。実験ではおんさAを用いたときに3倍振動が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q36.webp"
    ],
    "imageAltTexts": [
      "おんさAとBを使った弦の3倍振動と5倍振動の原図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q37",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "光の屈折",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "光が屈折率の異なる媒質中を通過するとき、光の通過する経路を模式的に示した図として最も妥当なのはどれか。ただし、図中のθ（0°＜θ＜90°）は空気から媒質Ⅰへの入射角を表す。また、空気の絶対屈折率を1.0、媒質Ⅰの絶対屈折率をn₁、媒質Ⅱの絶対屈折率をn₂としたとき、1.0＜n₁＜n₂が成り立つものとする。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "空気から媒質Ⅰ、媒質Ⅰから媒質Ⅱへ進むたびに屈折率が高くなり、光は法線に近づく。平行な境界面を経て再び空気に出ると、光の法線に対する角度は最初のθに戻る。",
    "choiceExplanations": {
      "ア": "屈折率が高くなるたびに法線側に曲がる最初の二層は妥当である。最後に空気へ出ると、平行な境界面では最初の入射角θに戻るため、法線近くを進む描き方は合わない。",
      "イ": "空気から媒質Ⅰ、媒質Ⅰから媒質Ⅱへ進むたびに屈折率が高くなり、光は法線に近づく。平行な境界面を経て再び空気に出ると、光の法線に対する角度は最初のθに戻る。",
      "ウ": "媒質Ⅱは媒質Ⅰより屈折率が高いので、境界を越えた光は法線に近づく。図3では逆に媒質Ⅱで光と法線のなす角が大きくなっている。",
      "エ": "空気から媒質Ⅰへ進むときは屈折角が入射角θより小さくなる。図4ではこの最初の境界で光が法線から遠ざかっている。",
      "オ": "図5では屈折率のより大きい媒質へ入るときに光が法線から離れている。測る角度は境界面とではなく法線との角度である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 37。解説は過去問AIの独自作成。",
    "choiceImageUrls": {
      "ア": "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q37-choice-1.webp",
      "イ": "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q37-choice-2.webp",
      "ウ": "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q37-choice-3.webp",
      "エ": "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q37-choice-4.webp",
      "オ": "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q37-choice-5.webp"
    }
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q38",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "並列回路と電力",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のような回路において、直流電源に流れる電流が5.0 Aであったとき、抵抗Rでの消費電力として最も妥当なのはどれか。ただし、直流電源の内部抵抗は無視できるものとする。",
    "choices": {
      "ア": "50 W",
      "イ": "60 W",
      "ウ": "70 W",
      "エ": "80 W",
      "オ": "90 W"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "各抵抗に30 Vがかかり、10 Ω側には30÷10＝3.0 Aが流れる。Rには残りの2.0 Aが流れるため、消費電力は30×2.0＝60 Wである。",
    "choiceExplanations": {
      "ア": "Rの両端は30 Vなので、50 Wなら流れる電流は5/3 Aである。10 Ω側の3 Aと合わせても電源の5.0 Aに届かない。",
      "イ": "各抵抗に30 Vがかかり、10 Ω側には30÷10＝3.0 Aが流れる。Rには残りの2.0 Aが流れるため、消費電力は30×2.0＝60 Wである。",
      "ウ": "30 Vで70 Wを消費するならRを流れる電流は7/3 Aとなる。10 Ω側の3 Aとの合計は所定の5.0 Aを超える。",
      "エ": "電源の全電力は30×5.0＝150 Wで、10 Ω側が30²÷10＝90 Wを消費する。残りは80 Wではなく60 Wになる。",
      "オ": "90 Wは電流3.0 Aが流れる10 Ω側の消費電力に当たる。電流2.0 AのRでは60 Wとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q38.webp"
    ],
    "imageAltTexts": [
      "30 Vの直流電源に10 Ωの抵抗と抵抗Rが並列につながる原図"
    ]
  },
  {
    "id": "kaijo-hoan-gakko-2023-annual-gakka-butsuri-q39",
    "exam": "kaijo-hoan-gakko",
    "year": 2023,
    "season": "annual",
    "session": "gakka-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "電流がつくる磁場",
      "海洋科学課程"
    ],
    "difficulty": 3,
    "question": "図のように導線に電流を流したとき、平面上に位置する点ア、イ、ウに生じる磁場の向きを選び出したものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "アA・イA・ウA",
      "イ": "アA・イB・ウA",
      "ウ": "アA・イB・ウB",
      "エ": "アB・イA・ウA",
      "オ": "アB・イB・ウB"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "直線導線では親指を電流の向きにそろえ、曲げた指が示す回転の向きからアはAになる。円形導線とコイルでは指を電流に沿わせた右手の親指がそれぞれAを指す。",
    "choiceExplanations": {
      "ア": "直線導線では親指を電流の向きにそろえ、曲げた指が示す回転の向きからアはAになる。円形導線とコイルでは指を電流に沿わせた右手の親指がそれぞれAを指す。",
      "イ": "円形導線のイでは、指を電流の回る向きに巻くと親指はAを指す。Bは円の軸上に生じる磁場と逆向きである。",
      "ウ": "円形導線とコイルでは、右手の指が電流に沿うとき親指が磁場を指す。イとウでBを選ぶと、どちらも原図の電流を逆向きにした場合の磁場になる。",
      "エ": "直線導線のアでは親指を下向きの電流にそろえる。導線を回る指の向きを点アで読むとAであり、Bではない。",
      "オ": "どの点でもBを選ぶと、図と逆向きの電流に対応する。直線導線では導線の周りに、円形導線とコイルでは軸に沿って右ねじの法則を適用する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010553.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 海上保安学校学生採用試験 海洋科学課程 学科試験（物理）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kaijo-hoan-gakko/2023/gakka-butsuri/q39.webp"
    ],
    "imageAltTexts": [
      "直線導線、円形導線、コイルと点アからウにおけるA・Bの向きを示した原図"
    ]
  }
];
