import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2026_SENMON_BUTSURI: Question[] = [
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q06",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "ベクトル解析",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "xyz空間の微分可能なベクトル場 A＝(A_x, A_y, A_z) を考える。∇・(∇×A) と等価なものを与える式はどれか。",
    "choices": {
      "ア": "0",
      "イ": "−A",
      "ウ": "∇・A",
      "エ": "∇²A",
      "オ": "∇(∇・A)−∇²A"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "回転の各成分を展開して発散を取ると、例えば ∂x∂y A_z と −∂y∂x A_z が対で現れる。混合偏微分の順序を交換すると各対が打ち消し合うため、結果は0になる。",
    "choiceExplanations": {
      "ア": "回転の各成分を展開して発散を取ると、例えば ∂x∂y A_z と −∂y∂x A_z が対で現れる。混合偏微分の順序を交換すると各対が打ち消し合うため、結果は0になる。",
      "イ": "回転の発散はスカラーであり、ベクトルの−Aとは型が異なる。混合偏微分が互いに打ち消し合う。",
      "ウ": "∇・Aは元の場の一次微分で、一般には0でない。例えばA＝(x,0,0)の発散は1だが、Aの回転は0である。",
      "エ": "∇²Aは各成分にラプラシアンを取ったベクトルである。回転の発散は混合偏微分が相殺するスカラー量である。",
      "オ": "この式は ∇×(∇×A) を展開したベクトル恒等式である。設問は回転の発散を求めている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q11",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "円筒面上の運動と垂直抗力",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、中心O、半径rの滑らかな半円筒が水平面上に固定されている。半円筒面の最高点Aに小球を置き、静かに手を放したところ、小球は半円筒面を滑り、ある点Bで半円筒面を離れた。∠AOB＝θ₀とするとき、cos θ₀の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "1/3",
      "イ": "1/2",
      "ウ": "2/3",
      "エ": "√2/2",
      "オ": "√3/2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "エネルギー保存からv²＝2gr(1−cos θ₀)となる。面を離れるときの垂直抗力は0なので、向心方向の運動方程式v²/r＝g cos θ₀と合わせてcos θ₀＝2/3を得る。",
    "choiceExplanations": {
      "ア": "cos θ＝1/3では、高さの減少から速さの二乗は4gr/3となる。重力の中心向き成分g/3だけでその円運動を維持することはできず、すでに面を離れている。",
      "イ": "cos θ＝1/2ではv²/r＝gになるが、重力の中心向き成分はg/2である。この位置は垂直抗力が0になる条件を満たさない。",
      "ウ": "エネルギー保存からv²＝2gr(1−cos θ₀)となる。面を離れるときの垂直抗力は0なので、向心方向の運動方程式v²/r＝g cos θ₀と合わせてcos θ₀＝2/3を得る。",
      "エ": "√2/2は2/3より大きく、角度は離れるときより小さい。この位置では垂直抗力N＝mg(3 cos θ−2)がまだ正である。",
      "オ": "√3/2では重力の向心成分が速度に必要な向心力より大きいため、面が外向きに小球を押している。小球が離れるのは垂直抗力が0になったときである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q11.webp"
    ],
    "imageAltTexts": [
      "半円筒面上の最高点Aから小球が滑り、角θ₀の点Bで離れる原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q13",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "両側のばねと単振動",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、滑らかな床面上に質量mの小球を置き、一方にばね定数kのばねを、もう一方にばね定数3kのばねを連結し、壁に取り付けた。この小球を、床面に沿ってわずかに動かし、単振動させたときの周期として最も妥当なのはどれか。",
    "choices": {
      "ア": "(π/2)√(m/k)",
      "イ": "π√(m/(2k))",
      "ウ": "π√(m/k)",
      "エ": "2π√(m/(2k))",
      "オ": "2π√(m/k)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "小球をxずらすと一方が伸び、他方が縮んで、復元力は両方から同方向に働く。合力は−4kxなので、周期は2π√(m/(4k))＝π√(m/k)である。",
    "choiceExplanations": {
      "ア": "この周期は有効ばね定数16kを使った値に当たる。小球がxずれると二つの復元力が合わさり、有効ばね定数はk＋3k＝4kとなる。",
      "イ": "この周期は有効ばね定数8kを使う計算になる。各ばねの長さの変化は小球の変位xと同じ大きさなので、復元力の係数は4kである。",
      "ウ": "小球をxずらすと一方が伸び、他方が縮んで、復元力は両方から同方向に働く。合力は−4kxなので、周期は2π√(m/(4k))＝π√(m/k)である。",
      "エ": "この式はばね定数の差3k−k＝2kを使った値である。伸びたばねも縮んだばねも水平に小球を元の位置へ戻すため、ばね定数を足す。",
      "オ": "これはばね定数kのばねだけを考えた周期である。反対側にもばね定数3kのばねがあるため、周期はこの半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q13.webp"
    ],
    "imageAltTexts": [
      "ばね定数kと3kのばねで質量mの小球を左右の壁につないだ原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q14",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "静止摩擦と斜面",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、板Aを斜面Bの上に置いた。水平面に対する斜面の傾角θ（0≦θ＜π/2）をゆっくり増やしていったところ、ある角度θ₁より大きくなるとAが滑った。AB間の静止摩擦係数をμ₁、Aの質量をmとする。角度θ₁として最も妥当なのはどれか。",
    "choices": {
      "ア": "cot⁻¹μ₁",
      "イ": "tan⁻¹μ₁",
      "ウ": "cot⁻¹(mμ₁)",
      "エ": "tan⁻¹(mμ₁)",
      "オ": "cos⁻¹(mμ₁)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "滑り始めの境界ではmg sin θ₁＝μ₁mg cos θ₁となる。mgを消してtan θ₁＝μ₁となるので、θ₁＝tan⁻¹μ₁である。",
    "choiceExplanations": {
      "ア": "斜面に沿う重力mg sin θと最大静止摩擦力μ₁mg cos θを等置したときに現れる比はsin θ/cos θである。これはcot θではなくtan θである。",
      "イ": "滑り始めの境界ではmg sin θ₁＝μ₁mg cos θ₁となる。mgを消してtan θ₁＝μ₁となるので、θ₁＝tan⁻¹μ₁である。",
      "ウ": "滑る条件を決めるのは斜面方向の重力と垂直抗力の比tan θである。どちらの力にもmgが含まれるため、質量を逆関数の引数に入れない。",
      "エ": "tanの逆関数を取る点はよいが、斜面方向の重力と摩擦力の比較では質量mが約分される。引数はμ₁だけである。",
      "オ": "垂直抗力の計算にはcos θが現れるが、斜面方向の成分にはsin θも現れる。二つの成分を比べるとcos θ₁ではなくtan θ₁が求まる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q14.webp"
    ],
    "imageAltTexts": [
      "水平面と角θをなす斜面Bに板Aを置いた原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q15",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "定常流の流線",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "xy平面において、点(x,y)での速度が、t₀を0でない定数として、(y/t₀, x/t₀)で与えられる2次元の定常な流れがあるとき、この流れの流線の表式として最も妥当なのはどれか（Cは定数とする。）。ただし、流線とは各点において流速ベクトルが接するような曲線のことである。",
    "choices": {
      "ア": "y＝1/x＋C",
      "イ": "y＝−x＋C",
      "ウ": "y＝x＋C",
      "エ": "x²−y²＝C",
      "オ": "x²＋y²＝C"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "流線上では(y/t₀)dy＝(x/t₀)dxが成り立つ。積分するとy²−x²が一定になり、定数の符号を変えてx²−y²＝Cと表せる。",
    "choiceExplanations": {
      "ア": "この式の傾きは−1/x²である。流速に接する曲線はx方向の速度が0でない点でdy/dx＝x/yを満たし、一般にこの傾きとは一致しない。",
      "イ": "傾き−1になるのはx＝−yの直線上に限られる。Cを任意に取った平行な直線全体が流線になるわけではない。",
      "ウ": "y＝xだけは速度の傾きx/yが1である。定数Cをずらした直線y＝x＋Cでは一般に速度と接線が一致しない。",
      "エ": "流線上では(y/t₀)dy＝(x/t₀)dxが成り立つ。積分するとy²−x²が一定になり、定数の符号を変えてx²−y²＝Cと表せる。",
      "オ": "円x²＋y²＝Cの接線の傾きは−x/yである。与えられた速度の傾きはx/yなので、符号が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q16",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "連続の式とベルヌーイの関係",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、内側の断面が円形の細い管を水平に置き、その中を密度ρの非圧縮性の完全流体が断面Aから断面Bの方向に定常的に流れている場合を考える。断面Aと断面Bの面積はそれぞれS_A、S_B、断面Aと断面Bにおける圧力はそれぞれp_A、p_Bであった。断面Aにおける流量として最も妥当なのはどれか。ただし、この流体の流速の大きさをv、圧力をpとして、ベルヌーイの関係式 p＋ρv²/2＝一定 が成り立つものとする。",
    "choices": {
      "ア": "(S_A S_B/2)√[(p_B−p_A)/(ρ(S_B²−S_A²))]",
      "イ": "S_A S_B√[(p_B−p_A)/(2ρ(S_B²−S_A²))]",
      "ウ": "S_A S_B√[(p_B−p_A)/(ρ(S_B²−S_A²))]",
      "エ": "S_A S_B√[2(p_B−p_A)/(ρ(S_B²−S_A²))]",
      "オ": "2S_A S_B√[(p_B−p_A)/(ρ(S_B²−S_A²))]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Q＝S_A v_A＝S_B v_Bを p_B−p_A＝ρ(v_A²−v_B²)/2 に代入する。Qについて解くと、S_A S_B√[2(p_B−p_A)/(ρ(S_B²−S_A²))]となる。",
    "choiceExplanations": {
      "ア": "非圧縮の定常流では流量Qを使って両地点の速度をQ/S_A、Q/S_Bと表す。ベルヌーイの式の二乗速度の係数ρ/2を移項するので、流量をさらに2で割らない。",
      "イ": "この値を二乗してベルヌーイの式に戻すと、圧力差の4分の1しか説明できない。速度の二乗を求める段階では圧力差を2で割らず、2倍する。",
      "ウ": "連続の式からQ＝S_A v_A＝S_B v_Bである。圧力差を速度差の二乗項と結び付けるとき、ベルヌーイの式の係数1/2を入れるため根号内の分子には2が必要である。",
      "エ": "Q＝S_A v_A＝S_B v_Bを p_B−p_A＝ρ(v_A²−v_B²)/2 に代入する。Qについて解くと、S_A S_B√[2(p_B−p_A)/(ρ(S_B²−S_A²))]となる。",
      "オ": "根号内に2があるので、外へ出せる係数は√2である。外側に2を掛けると、同じ圧力差に対して流量を大きく見積もる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q16.webp"
    ],
    "imageAltTexts": [
      "断面積S_AとS_Bの断面を通る水平な管の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q17",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "変位勾配とひずみ",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "ある地点Aの周辺で測量を行ったところ、B地点はA地点の真東1 km、C地点はA地点の真北1 kmに位置していた。数年後、再測量を行ったところ、A地点を基準とすると、B地点は東方向へ2 cm、南方向へ2.6 cm移動し、C地点は西方向へ1 cm、北方向へは0 cm移動していた。ただし、測量を行った領域は平坦で、上下動方向の変動は全くなかったものと仮定する。\n座標系はx₁軸の正方向を東、x₂軸の正方向を北とする。また、(u₁,u₂)を変位ベクトル場とする。ひずみeᵢⱼは eᵢⱼ＝(∂uⱼ/∂xᵢ＋∂uᵢ/∂xⱼ)/2（i,j＝1,2）、剛体的な回転量ωは ω＝(∂u₂/∂x₁−∂u₁/∂x₂)/2 と表すことができる。ただし、変位ベクトル場(u₁,u₂)の1階微分は定数で、2階微分以上は無視できるとする。面積ひずみe₁₁＋e₂₂、せん断ひずみe₁₂、回転量ωの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "面積 1×10⁻⁵・せん断 −3.6×10⁻⁵・回転 −0.8×10⁻⁵",
      "イ": "面積 1×10⁻⁵・せん断 −3.6×10⁻⁵・回転 0.8×10⁻⁵",
      "ウ": "面積 1×10⁻⁵・せん断 −1.8×10⁻⁵・回転 0.8×10⁻⁵",
      "エ": "面積 2×10⁻⁵・せん断 −1.8×10⁻⁵・回転 −0.8×10⁻⁵",
      "オ": "面積 2×10⁻⁵・せん断 −1.8×10⁻⁵・回転 0.8×10⁻⁵"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "変位を1 kmで割ると、(∂u₁/∂x₁, ∂u₂/∂x₁, ∂u₁/∂x₂, ∂u₂/∂x₂)＝(2,−2.6,−1,0)×10⁻⁵となる。対角成分の和は2×10⁻⁵、交差成分の和と差の半分はそれぞれ−1.8×10⁻⁵、−0.8×10⁻⁵である。",
    "choiceExplanations": {
      "ア": "面積ひずみは東方向の伸び2 cmを1 kmで割った値に北方向の伸び0を加える。せん断ひずみは交差する二つの変位勾配を足して2で割るので、−3.6×10⁻⁵の半分である。",
      "イ": "C地点は北方向へ移動していないので、面積ひずみにはB地点の東方向変位2 cmが効く。回転量の分子も−2.6×10⁻⁵から−1×10⁻⁵を引くので負になる。",
      "ウ": "せん断ひずみの値は合っている。面積ひずみは2×10⁻⁵で、回転は二つの変位勾配の差を取る順番から負になる。",
      "エ": "変位を1 kmで割ると、(∂u₁/∂x₁, ∂u₂/∂x₁, ∂u₁/∂x₂, ∂u₂/∂x₂)＝(2,−2.6,−1,0)×10⁻⁵となる。対角成分の和は2×10⁻⁵、交差成分の和と差の半分はそれぞれ−1.8×10⁻⁵、−0.8×10⁻⁵である。",
      "オ": "面積ひずみとせん断ひずみは合っている。回転量は東へ進んだときの北向き変位勾配−2.6×10⁻⁵から、北へ進んだときの東向き変位勾配−1×10⁻⁵を引くため負になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q17.webp"
    ],
    "imageAltTexts": [
      "ひずみテンソルと剛体的な回転量を表す原式"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q18",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "ヤング率と変断面棒",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "長さl、一定の断面積Sの一様な弾性体の棒の両端に力Fを軸方向に加えたときの縮みをΔlとするとき、ヤング率Eは E＝(F/S)/(Δl/l) で与えられる。断面積が一定でない弾性体の棒に関する次の記述のア、イに当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、左端からの距離がxの所の断面が半径 r＝a＋(b−a)x/L の円板である長さL、ヤング率Eの一様な弾性体の棒の両端に力Fを加える場合を考える。このとき、左端からの距離がxとx＋dxの間にある微小部分の軸方向の縮みは［ア］である。従って、棒全体の縮みは［イ］である。」",
    "choices": {
      "ア": "ア F dx/{4πE[a＋(b−a)x/L]²}・イ FL/(πEab)",
      "イ": "ア F dx/{4πE[a＋(b−a)x/L]²}・イ 4FL/[πE(a＋b)²]",
      "ウ": "ア F dx/{πE[a＋(b−a)x/L]²}・イ FL/[πE(a＋b)²]",
      "エ": "ア F dx/{πE[a＋(b−a)x/L]²}・イ FL/(πEab)",
      "オ": "ア F dx/{πE[a＋(b−a)x/L]²}・イ 4FL/[πE(a＋b)²]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "微小部分の縮みはF dx/(Eπr²)である。r＝a＋(b−a)x/Lを代入して0からLまで積分すると、∫dx/r²＝L/(ab)なので全体の縮みはFL/(πEab)となる。",
    "choiceExplanations": {
      "ア": "棒全体の式は正しいが、局所の半径rに対して面積はπr²である。微小部分に4πr²を使うと、同じ力を受けたときの縮みを4分の1にしてしまう。",
      "イ": "微小部分の断面積はπr²なので、分母に4は付かない。棒全体についても、断面積を一定の代表値に置き換えず、微小部分の縮みを積分する。",
      "ウ": "微小部分の式は正しい。積分すると両端の半径の積abが分母に現れ、和の二乗にはならない。",
      "エ": "微小部分の縮みはF dx/(Eπr²)である。r＝a＋(b−a)x/Lを代入して0からLまで積分すると、∫dx/r²＝L/(ab)なので全体の縮みはFL/(πEab)となる。",
      "オ": "半径を両端の平均(a＋b)/2に固定して計算するとこのイの値になる。実際には縮みが半径の二乗に反比例するため、各断面を積分する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q18.webp"
    ],
    "imageAltTexts": [
      "半径が左端のaから右端のbまで直線的に変わる棒に両端から力Fを加える原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q20",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "波動",
    "topicTags": [
      "正弦波の速さ",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "ある正弦波がx軸上を正の向きに進んでいる。この波の時刻t［s］、位置x［m］における変位y［m］は、y＝2 sin[2π(t/8−x/4)]で表される。この波の速さはおよそいくらか。",
    "choices": {
      "ア": "0.25 m/s",
      "イ": "0.5 m/s",
      "ウ": "2 m/s",
      "エ": "4 m/s",
      "オ": "8 m/s"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "式のt/8とx/4から、周期8 s、波長4 mと読める。波の速さは4÷8＝0.5 m/sである。",
    "choiceExplanations": {
      "ア": "0.25は位置項の係数1/4で、波長4 mの逆数に当たる。速さは波長を周期で割った値である。",
      "イ": "式のt/8とx/4から、周期8 s、波長4 mと読める。波の速さは4÷8＝0.5 m/sである。",
      "ウ": "周期を波長で割ると2になるが、その単位はs/mであり速さの単位ではない。速さには波長を周期で割る。",
      "エ": "4 mは同じ位相が並ぶ位置の間隔で、波長に当たる。波がその距離を進むには8 sかかる。",
      "オ": "8は波が一周期を終えるのにかかる秒数である。速さを得るには、その間に進む4 mを8 sで割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q21",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "波動",
    "topicTags": [
      "結晶によるX線回折",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "波長が1.7×10⁻¹⁰ mであるX線を、図のように、ある結晶に入射させた。X線を入射させる方向を、結晶の格子面に平行な方向から徐々に傾けていくと、入射方向の格子面に対する角度がπ/6となったとき、反射X線の強さが初めて極大となった。結晶の格子面の間隔として最も妥当なのはどれか。",
    "choices": {
      "ア": "4.3×10⁻⁹ m",
      "イ": "1.0×10⁻¹⁰ m",
      "ウ": "1.7×10⁻¹⁰ m",
      "エ": "2.0×10⁻¹⁰ m",
      "オ": "3.4×10⁻¹⁰ m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "初めての極大ではブラッグの条件 2d sin(π/6)＝λ が成り立つ。sin(π/6)＝1/2なのでd＝λ＝1.7×10⁻¹⁰ mである。",
    "choiceExplanations": {
      "ア": "π/6では経路差2d sin(π/6)は格子面間隔dに等しい。この値では経路差が波長よりはるかに長く、最初の極大の条件を満たさない。",
      "イ": "格子面の間隔がこの値なら、π/6での隣接面からの経路差も1.0×10⁻¹⁰ mになる。最初の極大に必要な経路差は波長1.7×10⁻¹⁰ mである。",
      "ウ": "初めての極大ではブラッグの条件 2d sin(π/6)＝λ が成り立つ。sin(π/6)＝1/2なのでd＝λ＝1.7×10⁻¹⁰ mである。",
      "エ": "2d sin(π/6)＝dであり、初めて強め合うためにはこの値が波長に一致する必要がある。2.0×10⁻¹⁰ mでは与えられた波長と一致しない。",
      "オ": "この間隔だとπ/6での経路差は波長の2倍になり、二次の極大に相当する。設問では初めての極大を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q21.webp"
    ],
    "imageAltTexts": [
      "X線が結晶中の平行な格子面で反射する原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q23",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "仕事から温度上昇への変換",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "粒状の金属2.5 kgを詰めた袋がある。この袋を、高さ1.0 mの位置から、繰り返し80回落下させたところ、金属の温度が2.8 K上昇した。この金属の比熱の値として最も妥当なのはどれか。ただし、重力加速度の大きさを9.8 m/s²とする。また、空気の抵抗は無視でき、落下する際に重力がする仕事は全て金属の温度上昇に使われ、これ以外による金属の温度変化は無視できるものとする。",
    "choices": {
      "ア": "0.16 J/(g·K)",
      "イ": "0.22 J/(g·K)",
      "ウ": "0.28 J/(g·K)",
      "エ": "0.34 J/(g·K)",
      "オ": "0.40 J/(g·K)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "80回の落下による重力の仕事は80×2.5×9.8×1.0＝1,960 Jである。金属の質量を2,500 gとして、比熱は1,960÷(2,500×2.8)＝0.28 J/(g·K)となる。",
    "choiceExplanations": {
      "ア": "この比熱で2,500 gの金属を2.8 K温めるには1,120 Jあればよい。落下による仕事は80×2.5×9.8×1.0＝1,960 Jなので、比熱はさらに大きい。",
      "イ": "比熱0.22 J/(g·K)なら熱量は2,500×0.22×2.8＝1,540 Jとなる。80回の落下で与えられる1,960 Jより少ない。",
      "ウ": "80回の落下による重力の仕事は80×2.5×9.8×1.0＝1,960 Jである。金属の質量を2,500 gとして、比熱は1,960÷(2,500×2.8)＝0.28 J/(g·K)となる。",
      "エ": "0.34 J/(g·K)では同じ温度上昇に2,380 Jが必要になる。実際の仕事1,960 Jでは不足する。",
      "オ": "この値を用いると、金属全体の2.8 Kの温度上昇に2,800 Jが必要となる。80回の落下の仕事より大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q24",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "熱機関の効率",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、理想気体がサイクルA→B→C→D→Aの変化を準静的に行う熱機関を考える。この熱機関がA→B間で高温熱源から受け取る熱をQ₁、C→D間で低温熱源に与える熱をQ₂、外部に行う仕事をW＝Q₁−Q₂としたとき、熱機関の効率W/Q₁として最も妥当なのはどれか。ただし、状態A、B、C、Dにおけるそれぞれの絶対温度はT_A、T_B、T_C、T_Dであり、A→Bは定圧変化、C→Dは定積変化、B→C及びD→Aは断熱変化である。また、この気体の定圧モル比熱をC_P、定積モル比熱をC_Vとする。",
    "choices": {
      "ア": "1−C_V(T_C−T_D)/[C_P(T_B−T_A)]",
      "イ": "1−C_V(T_C−T_D)/[C_P(T_A−T_B)]",
      "ウ": "1−C_P(T_C−T_D)/[C_V(T_B−T_A)]",
      "エ": "1−C_P(T_C−T_D)/[C_V(T_A−T_B)]",
      "オ": "1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "n molの気体は定圧のA→BでQ₁＝nC_P(T_B−T_A)を受け取り、定積のC→DでQ₂＝nC_V(T_C−T_D)を放出する。効率1−Q₂/Q₁を計算するとnが約分される。",
    "choiceExplanations": {
      "ア": "n molの気体は定圧のA→BでQ₁＝nC_P(T_B−T_A)を受け取り、定積のC→DでQ₂＝nC_V(T_C−T_D)を放出する。効率1−Q₂/Q₁を計算するとnが約分される。",
      "イ": "A→Bでは気体が吸熱して温度が上がるので、定圧比熱に掛ける温度差はT_B−T_Aである。T_A−T_Bだと吸熱量を負で数えてしまう。",
      "ウ": "放熱過程C→Dは体積一定なので、温度差に掛けるのはC_Vである。吸熱過程A→Bの方に定圧比熱C_Pを使う。",
      "エ": "A→Bの熱量は定圧比熱を使い、温度差も温度が上がる向きのT_B−T_Aとする。この式では吸熱に用いる比熱と温度差の符号が両方異なる。",
      "オ": "低温熱源へQ₂を放出しており、吸収した熱の全量を仕事に変えるわけではない。効率はQ₂/Q₁の分だけ1より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q24.webp"
    ],
    "imageAltTexts": [
      "高温熱源から吸熱する定圧経路と低温熱源へ放熱する定積経路を含むサイクルの原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q25",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "熱力学ポテンシャル",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "熱力学的な系の内部エネルギーが、エントロピーS、体積Vの関数としてU(S,V)と与えられているとする。このとき、系の圧力はp(S,V)＝−∂U(S,V)/∂Vによって定義される。ルジャンドル変換により、U＋pVをS、pの関数として表したものを何というか。",
    "choices": {
      "ア": "エンタルピー",
      "イ": "ヘルムホルツの自由エネルギー",
      "ウ": "ギブスの自由エネルギー",
      "エ": "化学ポテンシャル",
      "オ": "分配関数"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "dU＝T dS−p dVにd(pV)を加えると、d(U＋pV)＝T dS＋V dpとなる。このようにSとpを自然な変数とするU＋pVがエンタルピーである。",
    "choiceExplanations": {
      "ア": "dU＝T dS−p dVにd(pV)を加えると、d(U＋pV)＝T dS＋V dpとなる。このようにSとpを自然な変数とするU＋pVがエンタルピーである。",
      "イ": "ヘルムホルツの自由エネルギーはU−TSである。内部エネルギーの自然な変数を体積についてではなくエントロピーについて変換した量である。",
      "ウ": "ギブスの自由エネルギーはU＋pV−TSで、圧力に加えて温度を自然な変数にする。設問の変換では−TSを加えない。",
      "エ": "化学ポテンシャルは、粒子数を変化させたときの熱力学ポテンシャルの変化率に対応する。設問では粒子数ではなく体積の変数を圧力に置き換える。",
      "オ": "分配関数は、統計力学で各状態のボルツマン因子などを足し合わせた量である。U＋pVという状態量の名称ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q28",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "有限の線電荷による電場",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "真空中において、一様な線密度λの電荷が長さ2aの線分上に分布している。図のように、線分の両端から等距離で、線分の中点からの距離がaである点をPとする。Pにおける電場の大きさを求める式として最も妥当なのはどれか。ただし、真空の誘電率をε₀とする。",
    "choices": {
      "ア": "(｜λ｜/(4πε₀))∫₋ₐᵃ 1/(x²＋a²) dx",
      "イ": "(｜λ｜/(4πε₀))∫₋ₐᵃ a/(x²＋a²)^(3/2) dx",
      "ウ": "(｜λ｜/(4πε₀))∫₋ₐᵃ x/(x²＋a²)^(3/2) dx",
      "エ": "(｜λ｜/(4πε₀))∫₋ₐᵃ a²/(x²＋a²)² dx",
      "オ": "(｜λ｜/(4πε₀))∫₋ₐᵃ x²/(x²＋a²)² dx"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "距離r＝√(x²＋a²)にある微小電荷の電場の大きさは｜λ｜dx/(4πε₀r²)である。左右の平行成分が打ち消すため、垂直方向への射影a/rを掛けて−aからaまで積分する。",
    "choiceExplanations": {
      "ア": "この積分は各微小電荷が作る電場の大きさをそのまま足している。合成では線分に平行な成分が打ち消し合うので、垂直成分を取り出す必要がある。",
      "イ": "距離r＝√(x²＋a²)にある微小電荷の電場の大きさは｜λ｜dx/(4πε₀r²)である。左右の平行成分が打ち消すため、垂直方向への射影a/rを掛けて−aからaまで積分する。",
      "ウ": "x/rを掛けると、線分に沿う成分を求めることになる。これは左右対称性で0になる一方、垂直成分は残る。",
      "エ": "この式では垂直方向への射影係数を二乗している。電場はベクトルなので、垂直成分を求めるにはa/rを1回だけ掛ける。",
      "オ": "x²/r²は平行方向への射影を二乗した量である。残る電場成分は線分に垂直であり、射影係数にはaを使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q28.webp"
    ],
    "imageAltTexts": [
      "線電荷の両端と中点の上方aの位置にある点Pの原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q29",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "ローレンツ力と円軌道",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "磁束密度の大きさがBでz方向を向いた一様な磁場中に、質量m、電気量qの荷電粒子が、xy平面内を、速さvでz軸正の側から見て反時計回りに等速円運動している。qの正負及び軌道の直径dの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "q＞0・d＝2mv²B/｜q｜",
      "イ": "q＞0・d＝2mv/(｜q｜B)",
      "ウ": "q＜0・d＝2mv²B/｜q｜",
      "エ": "q＜0・d＝2mv²/(｜q｜B)",
      "オ": "q＜0・d＝2mv/(｜q｜B)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "円の右端で速度が＋y方向なら、v×Bは＋x方向を向くので、中心向きの力を得るにはq＜0である。mv²/r＝｜q｜vBより直径は2mv/(｜q｜B)となる。",
    "choiceExplanations": {
      "ア": "円の右端で粒子が上向きに進むと、正電荷に働くローレンツ力は右向きで外側を向く。反時計回りの円運動に必要なのは左向きの力である。",
      "イ": "直径の式は向心力とローレンツ力を等置して得られる。電荷が正だと＋z方向の磁場に対して時計回りになるため、符号が合わない。",
      "ウ": "負電荷なら反時計回りになる点は正しい。ローレンツ力は｜q｜vBなので、半径は磁束密度Bに反比例する。",
      "エ": "向心力mv²/rを｜q｜vBと等置すると速さの一因子が消える。したがって直径はvに比例し、v²には比例しない。",
      "オ": "円の右端で速度が＋y方向なら、v×Bは＋x方向を向くので、中心向きの力を得るにはq＜0である。mv²/r＝｜q｜vBより直径は2mv/(｜q｜B)となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q30",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "コンデンサーの電荷保存",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、直流電源（電圧V）、コンデンサーC₁（電気容量C）、コンデンサーC₂（電気容量2C）、スイッチS₁、S₂から成る回路がある。まず、スイッチS₂を開いたまま、スイッチS₁を閉じる。十分に時間が経過した後、今度はスイッチS₁を開き、スイッチS₂を閉じる。さらに十分に時間が経過した後、コンデンサーC₂に蓄えられている電気量として最も妥当なのはどれか。ただし、コンデンサーC₁、C₂はいずれも、初め電荷が蓄えられていなかったとする。",
    "choices": {
      "ア": "CV/3",
      "イ": "2CV/3",
      "ウ": "CV",
      "エ": "2CV",
      "オ": "3CV"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "初めはC₁にCVが蓄えられ、その後はS₁が開いているため、二つの左側極板の電荷の和CVが保たれる。並列の合成容量は3Cなので、C₂には2C×(V/3)＝2CV/3が蓄えられる。",
    "choiceExplanations": {
      "ア": "両コンデンサーの最終的な電圧はV/3である。この値に容量Cを掛けたCV/3は、C₂ではなくC₁の電荷である。",
      "イ": "初めはC₁にCVが蓄えられ、その後はS₁が開いているため、二つの左側極板の電荷の和CVが保たれる。並列の合成容量は3Cなので、C₂には2C×(V/3)＝2CV/3が蓄えられる。",
      "ウ": "CVは切替え前にC₁にある電荷であり、切替え後の両コンデンサーの電荷の合計でもある。C₁にも一部が残るため、C₂単独の電荷はCVより小さい。",
      "エ": "2CVはC₂に電源の電圧Vが直接かかる場合の電荷である。S₁を開いた後は電源による充電ではなく、初めの電荷CVの再分配である。",
      "オ": "3CVは二つのコンデンサーに電源と同じ電圧Vをかけた場合の電荷の和である。切替え後の保存電荷はCVなので、それだけの電荷を供給できない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q30.webp"
    ],
    "imageAltTexts": [
      "S₁を閉じてC₁を充電した後にS₂を閉じてC₁とC₂を並列にする原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q31",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "力学",
    "topicTags": [
      "ラグランジアンと荷電粒子",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "磁場中の荷電粒子の運動に関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「3次元のxyz座標空間において、z軸正方向に印加された、磁束密度の大きさがBの一様な磁場中を、質量m、電荷qの質点が運動する系を考える。質点に働く力が一様磁場による力のみであるとき、系のラグランジアンLは、L＝m(ẋ²＋ẏ²＋ż²)/2＋qBxẏ と表すことができる。このとき、オイラー・ラグランジュ方程式から、ローレンツ力を受けて運動する荷電粒子の運動方程式 mẍ＝［ア］、mÿ＝［イ］、mz̈＝［ウ］ が得られる。ただし、ẋ、ẏ、żはそれぞれx、y、zの時間についての微分、ẍ、ÿ、z̈はそれぞれx、y、zの時間についての2階微分を表す。」",
    "choices": {
      "ア": "ア −qBẏ・イ qBẋ・ウ 0",
      "イ": "ア −qBẏ・イ qBẋ・ウ qBż",
      "ウ": "ア qBẏ・イ −qBẋ・ウ 0",
      "エ": "ア qBẏ・イ −qBẋ・ウ qBż",
      "オ": "ア qBẏ・イ qBẋ・ウ 0"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "xには∂L/∂x＝qBẏ、yにはd(mẏ＋qBx)/dt＝0を適用する。z方向の力は0なので、右辺は順にqBẏ、−qBẋ、0となる。",
    "choiceExplanations": {
      "ア": "xについては∂L/∂x＝qBẏである。そのためmẍの符号は＋で、yについても保存されるmẏ＋qBxからmÿ＝−qBẋが得られる。",
      "イ": "xの方程式はmẍ＝∂L/∂x＝qBẏである。また、zに関してLはz自身を含まず、∂L/∂ż＝mżの時間変化は0になる。",
      "ウ": "xには∂L/∂x＝qBẏ、yにはd(mẏ＋qBx)/dt＝0を適用する。z方向の力は0なので、右辺は順にqBẏ、−qBẋ、0となる。",
      "エ": "xy方向の二式は正しいが、z方向の運動量mżは保存される。z方向に磁場と平行な速度があっても、ローレンツ力のz成分は生じない。",
      "オ": "mẏ＋qBxの時間微分は0なので、qBẋを右辺に移すと符号は負になる。xとyの力が同時に正符号になるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q32",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "統計力学",
    "topicTags": [
      "統計集団",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "統計力学では、物理系の熱平衡状態は統計集団（アンサンブル）を用いて表される。温度が一定の熱浴に浸かった閉鎖系（粒子の出入りのない系）の熱平衡状態を表す際に、一般的に用いられる統計集団は次のうちどれか。",
    "choices": {
      "ア": "小正準集団（ミクロカノニカルアンサンブル）",
      "イ": "正準集団（カノニカルアンサンブル）",
      "ウ": "大正準集団（グランドカノニカルアンサンブル）",
      "エ": "分子集団（分子クラスター）",
      "オ": "原子集団（原子クラスター）"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "正準集団では温度、体積、粒子数を固定し、系は熱浴とエネルギーを交換する。各状態の重みはそのエネルギーに応じたボルツマン因子である。",
    "choiceExplanations": {
      "ア": "小正準集団はエネルギーと粒子数が一定の孤立系を記述する。熱浴と接してエネルギーを交換する場合、系のエネルギーは一定ではない。",
      "イ": "正準集団では温度、体積、粒子数を固定し、系は熱浴とエネルギーを交換する。各状態の重みはそのエネルギーに応じたボルツマン因子である。",
      "ウ": "大正準集団は熱浴・粒子浴とエネルギーと粒子の双方を交換できる場合に使う。閉鎖系では粒子数は変わらない。",
      "エ": "分子クラスターは複数の分子が集まった物質のまとまりを指す。熱平衡における微視状態の確率分布を表す名称ではない。",
      "オ": "原子クラスターは複数の原子が結合した集団を指す。温度と粒子数の条件から選ぶ統計集団は正準集団である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q33",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "統計力学",
    "topicTags": [
      "スピン系の極限エントロピー",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "スピンの大きさが1の独立なスピンN個が、z軸正方向を向く、強さH（H＞0）の一様な磁場中にある。各スピンに番号をつけ、i番目のスピン演算子のz成分の固有値をスピン変数σᵢで表すと、σᵢは−1、0、1の3通りの値をとる。系のエネルギー固有値Eは、正の定数μを用いて、E＝−μH∑ᵢ₌₁ᴺσᵢと表せるとする。この系が温度Tの熱平衡状態にあるとき、系のエントロピーをSとする。低温（T→0）及び高温（T→∞）の極限でのSの表式の組合せとして最も妥当なのはどれか。ただし、k_Bはボルツマン定数とする。",
    "choices": {
      "ア": "低温0・高温Nk_B log 3",
      "イ": "低温0・高温k_B log N",
      "ウ": "低温k_B log 3・高温0",
      "エ": "低温k_B log 3・高温Nk_B log 3",
      "オ": "低温k_B log 3・高温k_B log N"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "低温極限は全スピンがσᵢ＝1の基底状態1通りに限られ、エントロピーは0である。高温極限は3ᴺ通りが等確率なので、k_B log(3ᴺ)＝Nk_B log 3となる。",
    "choiceExplanations": {
      "ア": "低温極限は全スピンがσᵢ＝1の基底状態1通りに限られ、エントロピーは0である。高温極限は3ᴺ通りが等確率なので、k_B log(3ᴺ)＝Nk_B log 3となる。",
      "イ": "低温の0はよいが、高温極限の状態数はスピンの個数Nではない。各スピンに3通りがあるので3ᴺ通りになる。",
      "ウ": "高温ではエネルギーの違いが確率の差に及ぼす影響が小さくなり、多くの状態が等確率になる。エントロピーが0になるのは一つの基底状態だけが占められる低温極限である。",
      "エ": "高温の値は3ᴺ状態が等確率になることと一致する。低温では各スピンの3状態が選べるわけではなく、全てが磁場にそろった一状態になる。",
      "オ": "低温では縮退のない基底状態に集中するためエントロピーは0である。高温側の状態数はNではなく3ᴺである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q34",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "測定と定常状態",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "量子力学に関するア〜エの以下の命題について、正しいもののみを全て挙げている組合せはどれか。\nア 電子の位置と運動量を同時測定することができる。\nイ 定常状態を記述する波動関数の位相は時間的に変化しない。\nウ 量子系は測定によって一般に状態が変化する。\nエ 量子系を数回測定することによって、量子系の状態を完全に決定することができる。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、エ",
      "ウ": "イ",
      "エ": "ウ",
      "オ": "エ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "量子系を測定すると、測定前の重ね合わせ状態は一般に測定結果に対応する状態へ変わる。測定前から対応する固有状態にある場合などには状態が変わらないこともある。",
    "choiceExplanations": {
      "ア": "位置と運動量には不確定性関係があり、両方を同時に確定させることはできない。定常状態でも波動関数の位相は通常時間発展する。",
      "イ": "位置と運動量は可換ではなく、両方の値を同時に厳密には求められない。また、数回の測定結果だけから任意の未知状態を完全に決めることはできない。",
      "ウ": "エネルギー固有状態の波動関数には時間因子exp(−iEt/ℏ)が付く。確率密度は時間に依存しないが、位相は一般に変化する。",
      "エ": "量子系を測定すると、測定前の重ね合わせ状態は一般に測定結果に対応する状態へ変わる。測定前から対応する固有状態にある場合などには状態が変わらないこともある。",
      "オ": "未知の状態を推定する量子状態トモグラフィーでは、同じ手順で用意した多数の系に異なる測定を行う。単一の系を数回測定するだけで一般の状態を完全に決定できるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q35",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "自由粒子の運動量固有状態",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "x軸上を自由に運動する質量mの量子力学的粒子を考える。系の運動量演算子pₓは pₓ＝−iℏ d/dx で与えられる。系のハミルトニアン H＝pₓ²/(2m) とpₓは交換可能であり、Hとpₓは共通の固有関数（同時固有関数）をもつ。波動関数に周期Lの周期的境界条件を課すと、Hの固有値（エネルギー固有値）やpₓの固有値は量子化され、波数kₙ＝2πn/L（nは整数）を用いて表すことができる。この系の運動量演算子pₓの固有値とx軸上の長さLの範囲における粒子の存在確率が1となるように規格化された固有関数の組合せとして最も妥当なのはどれか。\nなお、関数f(x)が周期Lの周期的境界条件を満たすとは、任意のxについて、f(x＋L)＝f(x)が成り立つことを指す。",
    "choices": {
      "ア": "固有値ℏ²kₙ²/(2m)・固有関数exp(ikₙx)/√L",
      "イ": "固有値ℏ²kₙ²/(2m)・固有関数√(2/L) sin(kₙx)",
      "ウ": "固有値ℏkₙ・固有関数exp(ikₙx)/√L",
      "エ": "固有値ℏkₙ・固有関数√(2/L) sin(kₙx)",
      "オ": "固有値ℏkₙ・固有関数exp(ikₙx)/√(2L)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "exp(ikₙx)を−iℏ d/dxで微分すると固有値ℏkₙを得る。絶対値の二乗が1/Lになる規格化係数1/√Lを使うと、長さLの積分は1である。",
    "choiceExplanations": {
      "ア": "ℏ²kₙ²/(2m)はHのエネルギー固有値である。平面波に運動量演算子−iℏ d/dxを一度作用させるとℏkₙが得られる。",
      "イ": "正弦波は逆向きに進む二つの平面波の重ね合わせである。Hの固有関数にはなり得るが、一般にpₓを作用させると余弦になるためpₓの固有関数ではない。",
      "ウ": "exp(ikₙx)を−iℏ d/dxで微分すると固有値ℏkₙを得る。絶対値の二乗が1/Lになる規格化係数1/√Lを使うと、長さLの積分は1である。",
      "エ": "sin(kₙx)を微分するとkₙ cos(kₙx)になり、元の正弦波の定数倍にはならない。運動量固有値に対応する関数としては平面波を選ぶ。",
      "オ": "平面波と運動量の固有値は合っているが、長さLにわたって絶対値の二乗1/(2L)を積分すると1/2にしかならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q36",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "水素原子の量子数",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "水素原子の電子軌道について、以下の問いに答えよ。主量子数nをもつ電子軌道の方位量子数l、磁気量子数mの取り得る値の組合せとして可能なものを全て挙げているのはどれか。",
    "choices": {
      "ア": "l＝0,1,…,n−1・m＝−l,−l＋1,…,l−1,l",
      "イ": "l＝0,1,…,n−1・m＝−l,−l＋1/2,…,l−1/2,l",
      "ウ": "l＝1,2,…,n・m＝−l,−l＋1,…,l−1,l",
      "エ": "l＝1,2,…,n・m＝−l,−l＋1/2,…,l−1/2,l",
      "オ": "l＝1,2,…,n−1・m＝−l,−l＋1,…,l−1,l"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "方位量子数lは0からn−1までの整数を取る。軌道の磁気量子数mは−lからlまで1ずつ変わり、全部で2l＋1通りになる。",
    "choiceExplanations": {
      "ア": "方位量子数lは0からn−1までの整数を取る。軌道の磁気量子数mは−lからlまで1ずつ変わり、全部で2l＋1通りになる。",
      "イ": "lの範囲は正しいが、軌道の磁気量子数は整数で一つずつ変わる。電子スピンの半整数の値とは区別する。",
      "ウ": "mの並びは正しいが、方位量子数にはl＝0のs軌道が含まれる。取り得るlの最大はnではなくn−1である。",
      "エ": "lの列に0がなく、上限nも1大きい。また、軌道のmには半整数の値は含まれない。",
      "オ": "mの範囲とlの上限は合う。主量子数がどの値でも存在するl＝0のs軌道が抜けている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q37",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "磁化率と自発磁化",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "磁性に関する次の記述のア〜エに当てはまるものの組合せとして最も妥当なのはどれか。\n「正の磁化率をもつ物質を常磁性体、負の磁化率をもつ物質を［ア］と呼ぶ。キュリー常磁性体の磁化率は温度に［イ］。多くの金属や合金では低温で温度に［ウ］磁化率を示す。これをパウリ常磁性と呼ぶ。常磁性体の一種である強磁性体は、キュリー温度と呼ばれる、物質に固有の温度より低温では［エ］を示す。」",
    "choices": {
      "ア": "ア 反強磁性体・イ 比例する・ウ 比例する・エ 自発磁化",
      "イ": "ア 反強磁性体・イ 反比例する・ウ 比例する・エ 磁化消失",
      "ウ": "ア 反強磁性体・イ 反比例する・ウ 依らない・エ 磁化消失",
      "エ": "ア 反磁性体・イ 比例する・ウ 比例する・エ 自発磁化",
      "オ": "ア 反磁性体・イ 反比例する・ウ 依らない・エ 自発磁化"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "負の磁化率は反磁性に対応し、キュリー常磁性の磁化率は絶対温度に反比例する。低温のパウリ常磁性では温度にほぼ依らず、強磁性体はキュリー温度未満で外部磁場がなくても自発磁化を示す。",
    "choiceExplanations": {
      "ア": "磁化率が負で磁場を打ち消す向きに磁化する物質は反磁性体である。キュリー常磁性体の磁化率は絶対温度に比例せず、これに反比例する。",
      "イ": "イの反比例はキュリーの法則に合う。ただしパウリ常磁性の磁化率は低温でほぼ一定であり、キュリー温度より下では強磁性体に自発磁化が現れる。",
      "ウ": "キュリー常磁性とパウリ常磁性の温度依存性は合っている。負の磁化率を指す名称は反磁性で、強磁性の自発磁化はキュリー温度より下で生じる。",
      "エ": "反磁性体と自発磁化は合っている。キュリー常磁性では磁化率が温度に反比例し、パウリ常磁性の低温では温度にほとんど依らない。",
      "オ": "負の磁化率は反磁性に対応し、キュリー常磁性の磁化率は絶対温度に反比例する。低温のパウリ常磁性では温度にほぼ依らず、強磁性体はキュリー温度未満で外部磁場がなくても自発磁化を示す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q38",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "相対論",
    "topicTags": [
      "電子の相対論的全エネルギー",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "光速cの1/2の速さで自由空間を運動する電子（静止質量：0.511 MeV/c²）の全エネルギーの値として最も近いものはどれか。",
    "choices": {
      "ア": "0.006 MeV",
      "イ": "0.06 MeV",
      "ウ": "0.29 MeV",
      "エ": "0.59 MeV",
      "オ": "1.1 MeV"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全エネルギーはγmc²で、γ＝1/√(1−v²/c²)である。v＝c/2を代入すると0.511×2/√3≒0.59 MeVになる。",
    "choiceExplanations": {
      "ア": "全エネルギーには静止エネルギー0.511 MeVも含まれる。0.006 MeVはこの静止エネルギーより小さい。",
      "イ": "この値は全エネルギーに含まれる静止エネルギーだけよりも小さい。全エネルギーを得るには静止エネルギーにローレンツ因子を掛ける。",
      "ウ": "v＝c/2のローレンツ因子は2/√3で1より大きい。静止エネルギー0.511 MeVに掛けると約0.59 MeVとなり、0.29 MeVにはならない。",
      "エ": "全エネルギーはγmc²で、γ＝1/√(1−v²/c²)である。v＝c/2を代入すると0.511×2/√3≒0.59 MeVになる。",
      "オ": "1.1 MeVを得るにはローレンツ因子が2を超える必要がある。速さc/2での因子は約1.155なので、全エネルギーは1.1 MeVより小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q39",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "量子力学",
    "topicTags": [
      "光電効果と仕事関数",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "物質内の電子を物質表面から真空中に飛び出させるために必要な最小エネルギーを、仕事関数と呼ぶ。金属カリウムの場合、仕事関数はおよそ2.3 eVである。波長が2.0×10⁻⁷ mの紫外線を金属カリウムに照射したとき、飛び出す電子の運動エネルギーの最大値はおよそいくらか。なお、hをプランク定数、cを光速とするとき、hcの値をhc＝1.2×10⁻⁶ eV·mとしてよい。",
    "choices": {
      "ア": "2.7 eV",
      "イ": "3.7 eV",
      "ウ": "5.7 eV",
      "エ": "7.3 eV",
      "オ": "8.3 eV"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "光子のエネルギーは1.2×10⁻⁶÷(2.0×10⁻⁷)＝6.0 eVである。仕事関数2.3 eVを引いた残りの3.7 eVが最大運動エネルギーになる。",
    "choiceExplanations": {
      "ア": "光子1個のエネルギーはhc/λ＝6.0 eVである。そこから与えられた2.3 eVを差し引くと、2.7 eVにはならない。",
      "イ": "光子のエネルギーは1.2×10⁻⁶÷(2.0×10⁻⁷)＝6.0 eVである。仕事関数2.3 eVを引いた残りの3.7 eVが最大運動エネルギーになる。",
      "ウ": "5.7 eVだと表面を脱出するために使うエネルギーが差額の0.3 eVしかない。金属カリウムの仕事関数は2.3 eVである。",
      "エ": "入射した光子のエネルギーは6.0 eVで、電子はその一部を表面から出るために使う。飛び出した電子の運動エネルギーが7.3 eVになることはない。",
      "オ": "8.3 eVは光子のエネルギーと仕事関数を足した値である。仕事関数は脱出に消費するエネルギーなので差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q40",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "原子核物理",
    "topicTags": [
      "半減期とガスの粒子数",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "水素の放射性同位体であるトリチウム（³H）は、半減期12.3年でヘリウム3（³He）にβ崩壊する。密閉容器に100％トリチウムから成る水素ガスを封入したとする。封入してから12.3年後にこの容器内の圧力は封入直後の圧力の何倍になるか。ただし、トリチウムの化学式は³H₂であるとし、容器内の温度は室温で一定に保たれているとする。",
    "choices": {
      "ア": "0.5倍",
      "イ": "0.75倍",
      "ウ": "1倍",
      "エ": "1.5倍",
      "オ": "2倍"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "初めの二原子分子をN個とすると、半減期後にはトリチウム分子がN/2個、ヘリウム原子がN個になる。温度と体積が一定なので、圧力は合計粒子数に比例して1.5倍となる。",
    "choiceExplanations": {
      "ア": "半減期が経つとトリチウム原子は半分になるが、崩壊によって新たなヘリウム原子が生じる。圧力を求めるには両方の気体の粒子数を数える。",
      "イ": "残ったトリチウム分子の数は元の半分である。生じたヘリウムは単原子なので、元のトリチウム分子と同数のヘリウム原子が加わる。",
      "ウ": "原子核の総数で見ると崩壊前後で変わらない。しかし、圧力に効く粒子数は二原子分子と単原子気体で異なり、崩壊により増える。",
      "エ": "初めの二原子分子をN個とすると、半減期後にはトリチウム分子がN/2個、ヘリウム原子がN個になる。温度と体積が一定なので、圧力は合計粒子数に比例して1.5倍となる。",
      "オ": "2倍になるのは全てのトリチウム原子がヘリウム原子に変わった場合である。12.3年後は崩壊した原子が半分なので、粒子数の増え方もその半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q41",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "日積算の太陽放射",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "地球の大気上端で受け取る太陽放射に関する次の記述のア、イに当てはまるものの組合せとして最も妥当なのはどれか。ただし、太陽と地球との距離は季節によらず一定とし、地軸の傾きをφ₀（≒23.4°）とする。\n「地球上において、太陽の時角（太陽が南中している経度とその場所の経度との差）をλ（−π≦λ＜π）、太陽が天頂にあって、λがdλ変化する間に大気上端において単位面積当たりに受け取る太陽放射量をS dλとする。このとき、図のように、夏至の日の北極点上、春分の日の赤道上で、1日の間に大気上端において単位面積当たりに受け取る太陽放射量は、それぞれ［ア］、［イ］で表される。」",
    "choices": {
      "ア": "ア ∫[−π,π] S cos λ dλ・イ ∫[−π/2,π/2] S cos φ₀ dλ",
      "イ": "ア ∫[−π,π] S cos λ dλ・イ ∫[−π/2,π/2] S cos λ dλ",
      "ウ": "ア ∫[−π,π] S cos φ₀ dλ・イ ∫[−π/2,π/2] S cos λ dλ",
      "エ": "ア ∫[−π,π] S sin φ₀ dλ・イ ∫[−π/2,π/2] S cos φ₀ dλ",
      "オ": "ア ∫[−π,π] S sin φ₀ dλ・イ ∫[−π/2,π/2] S cos λ dλ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "夏至の北極点では太陽高度φ₀で終日照らされるので、−πからπまでS sin φ₀を積分する。春分の赤道では昼の−π/2からπ/2の間、天頂角の余弦cos λをSに掛けて積分する。",
    "choiceExplanations": {
      "ア": "夏至の北極点では太陽高度は終日φ₀である。春分の赤道では昼の半日で太陽が昇り、太陽高度は時角とともに変わるので、放射の係数は一定ではない。",
      "イ": "春分の赤道の積分は合っている。夏至の北極点では太陽が一定の高度にあり、入射の係数に時角λは入らない。",
      "ウ": "夏至の北極点に太陽光が入射する角度は、鉛直からπ/2−φ₀である。その方向余弦はcos φ₀ではなくsin φ₀となる。",
      "エ": "北極点は白夜で高度φ₀が一定だから、アは合っている。春分の赤道では時角λが天頂方向からの角度に当たり、昼間の係数はcos λである。",
      "オ": "夏至の北極点では太陽高度φ₀で終日照らされるので、−πからπまでS sin φ₀を積分する。春分の赤道では昼の−π/2からπ/2の間、天頂角の余弦cos λをSに掛けて積分する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q41.webp"
    ],
    "imageAltTexts": [
      "夏至と春分における地軸の傾きと北極点・赤道の向きを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q42",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "寒冷・温暖・閉塞前線",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "日本付近を通過する前線に関する記述ア〜エのうち、妥当なもののみを全て挙げているのはどれか。\nア 寒冷前線が西から東に移動しているとき、寒冷前線の通過に伴い、地上での風向は南〜南東から西〜南西に変化する。\nイ 一般的に、温暖前線の前線面の地面に対する傾きは、寒冷前線のそれに比べて緩やかである。\nウ 閉塞前線が西から東に移動し、前線西側の気団の方が冷たいとき、上空の前線は地上の閉塞前線より東側にある。\nエ 閉塞前線は、寒冷前線が温暖前線に追い付くことにより生じる。",
    "choices": {
      "ア": "ア",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "エ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "温暖前線では暖気が寒気の上を緩い勾配で上昇し、前線面の傾きは寒冷前線より小さい。寒冷前線が温暖前線に追い付き、暖気を地表から持ち上げると閉塞前線ができる。",
    "choiceExplanations": {
      "ア": "西から東へ進む典型的な寒冷前線では、地上風は通過前の南寄りから、前線の後ろの西〜北西寄りに変わる。通過後を西〜南西とする記述は適切でない。",
      "イ": "寒冷前線が通過した後、地上には冷たい気団に伴う西〜北西寄りの風が入る。西側がより冷たい寒冷型の閉塞では、前線面は上空に行くにつれ西側の冷たい気団の側へ傾く。",
      "ウ": "イは正しいが、後面の西側の気団の方が冷たい場合、上空の前線は地上より西側になる。東側にあるというウは該当しない。",
      "エ": "温暖前線では暖気が寒気の上を緩い勾配で上昇し、前線面の傾きは寒冷前線より小さい。寒冷前線が温暖前線に追い付き、暖気を地表から持ち上げると閉塞前線ができる。",
      "オ": "閉塞前線の成り立ちを述べるエは正しい。温暖前線面の傾きが寒冷前線面より緩やかだとするイも正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q43",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "地上風の力のつり合い",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "北半球のある地点における地上風の力学バランスについて考える。図のように、風速Vの定常な風が等圧線と角度θをなす方向に吹いており、気圧傾度力、コリオリ力、摩擦力がつり合っているとする。気圧傾度力は等圧線の向きに対して垂直に働き、摩擦力は風の向きとは反対方向に働いているとしたとき、風速Vとして最も妥当なのはどれか。ただし、単位質量当たりの気圧傾度力をP、コリオリパラメータをfとする。",
    "choices": {
      "ア": "P/(f sin θ)",
      "イ": "P/(f cos θ)",
      "ウ": "P sin θ/f",
      "エ": "P cos θ/f",
      "オ": "P tan θ/f"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "風に垂直な方向には摩擦力が働かない。気圧傾度力の垂直成分P cos θとコリオリ力fVがつり合うのでV＝P cos θ/fとなる。",
    "choiceExplanations": {
      "ア": "風の向きに垂直な気圧傾度力の成分はP cos θである。この成分がコリオリ力とつり合うため、sin θで割る式にはならない。",
      "イ": "気圧傾度力とコリオリ力の向きには角度θのずれがあり、風に垂直な方向に分解する対象は気圧傾度力である。fV＝P cos θとなるので、cos θは分母ではなく分子に来る。",
      "ウ": "P sin θは気圧傾度力の風に沿う成分で、その成分が摩擦力とつり合う。コリオリ力は風向と垂直である。",
      "エ": "風に垂直な方向には摩擦力が働かない。気圧傾度力の垂直成分P cos θとコリオリ力fVがつり合うのでV＝P cos θ/fとなる。",
      "オ": "摩擦が小さく風向が等圧線に近い極限ではVはP/fに近づく。tan θを使う式はこの極限でVが0になり、つり合いと合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q43.webp"
    ],
    "imageAltTexts": [
      "等圧線と風向の角度、気圧傾度力・コリオリ力・摩擦力の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q44",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "フェーン現象と断熱減率",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "湿った気塊が山を越える際に雲を作り、降水を伴うような、熱力学的要因によるフェーン現象を考える。図のように、気塊は地点A（高度h_A）から気流に乗って山の斜面に沿って上昇し、上昇中の地点B（高度h_B）で気塊中の水蒸気が凝結して雲を形成し始めた。凝結した水蒸気の一部は降水となった。その後、気塊は高度が最も高い地点C（高度h_C）を越えて、斜面に沿って下降した。下降中の地点D（高度h_D）で気塊中の雲は全て蒸発し、最終的に気塊は地点E（高度h_E）に到達した。\n乾燥断熱減率をΓ_d、湿潤断熱減率をΓ_wとするとき、気塊の地点Eにおける気温T_Eと、地点Aにおける気温T_Aとの差として最も妥当なのはどれか。ただし、Γ_d、Γ_wはいずれも正の定数とする。",
    "choices": {
      "ア": "(Γ_d−Γ_w)(h_C−h_B)−Γ_d(h_E−h_A)",
      "イ": "(Γ_d−Γ_w)(h_C−h_B)＋Γ_d(h_E−h_A)",
      "ウ": "(Γ_d−Γ_w)(h_C−h_B)",
      "エ": "(Γ_d−Γ_w)(h_D−h_B)−Γ_d(h_E−h_A)",
      "オ": "(Γ_d−Γ_w)(h_D−h_B)＋Γ_d(h_E−h_A)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "A→BとD→EにはΓ_d、B→CとC→DにはΓ_wを使い、上昇を冷却、下降を加温として合計する。すると(Γ_d−Γ_w)(h_D−h_B)−Γ_d(h_E−h_A)となる。",
    "choiceExplanations": {
      "ア": "この式は上昇時の湿潤区間B→Cだけで補正している。下降時のC→Dも湿潤断熱変化なので、山頂の高さh_Cは差を合計すると消える。",
      "イ": "B→Cの冷却とC→Dの加温は同じ湿潤断熱減率で計算するため、h_Cは消える。また、AよりEが高い分の乾燥断熱の温度差は負になる。",
      "ウ": "この式はAとEの標高差を考慮していない。湿潤断熱で上がる区間と下がる区間の差も、最高点Cではなく雲が消えるDまでで決まる。",
      "エ": "A→BとD→EにはΓ_d、B→CとC→DにはΓ_wを使い、上昇を冷却、下降を加温として合計する。すると(Γ_d−Γ_w)(h_D−h_B)−Γ_d(h_E−h_A)となる。",
      "オ": "湿潤区間の補正にh_D−h_Bを使う点は合う。Eの標高がAより高いことによる温度変化は冷却なので、最後の項はマイナスになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q44.webp"
    ],
    "imageAltTexts": [
      "気塊が山を越えながらBで雲を生じDで全て蒸発する経路の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q45",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "気象学",
    "topicTags": [
      "エルニーニョと貿易風",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "エルニーニョ現象に関する次の記述のア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「エルニーニョ現象の発生時には、太平洋赤道域の東部では、海面水温が平年時より［ア］なり、東西の海面水温の差が小さくなる。このとき、貿易風と呼ばれる東風が平年時より［イ］なり、積雲対流の活発な領域が平年時より［ウ］に移動する。」",
    "choices": {
      "ア": "ア 低く・イ 弱く・ウ 西",
      "イ": "ア 低く・イ 強く・ウ 西",
      "ウ": "ア 高く・イ 弱く・ウ 東",
      "エ": "ア 高く・イ 強く・ウ 東",
      "オ": "ア 高く・イ 強く・ウ 西"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "貿易風が弱まると、東部で冷たい水の湧昇が弱まり暖水が東へ広がる。東部の海面水温が上昇し、積雲対流の活発な領域も東へ移る。",
    "choiceExplanations": {
      "ア": "東部の海面水温が高くなるため、東西の水温差が縮まる。対流の中心は暖かくなった海域に対応して東へ移動する。",
      "イ": "東風が強まり東部海面水温が低くなるのは、ラニーニャに対応する傾向である。エルニーニョでは東風が弱まり、東部の海面水温が高くなる。",
      "ウ": "貿易風が弱まると、東部で冷たい水の湧昇が弱まり暖水が東へ広がる。東部の海面水温が上昇し、積雲対流の活発な領域も東へ移る。",
      "エ": "アとウはエルニーニョ時の変化に合う。貿易風は東西の海面水温差の縮小とともに弱まるので、イは強くなるではない。",
      "オ": "東部の海面水温が上昇する点は合う。貿易風は強まらず弱まり、暖かい海の上の対流が東へ移る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q46",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "海洋学",
    "topicTags": [
      "高潮の吹き寄せ",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "高潮に関する次の記述のア〜エに当てはまるものの組合せとして最も妥当なのはどれか。\n「台風や低気圧による高潮は、主に吸い上げ効果と吹き寄せ効果によって生じる。吸い上げ効果は、台風や低気圧の接近によって気圧が低くなることで海面が上昇する効果であり、気圧が1 hPa低下すると海面はおよそ1 cm上昇する。吹き寄せ効果は、風が海岸に向かって吹いている場合に海面が上昇する効果であり、おおむね［ア］に比例して上昇する。吹き寄せ効果では、一般に、湾の奥行きが［イ］ほど海面の上昇幅は大きくなり、また、湾の水深が［ウ］ほど海面の上昇幅は大きくなる。台風が日本に接近するときは、台風の中心付近に加え、台風の進行方向に向かって［エ］側や、風の吹いてくる方向に開いた湾で、特に高潮に注意が必要である。」",
    "choices": {
      "ア": "ア 風速・イ 長い・ウ 深い・エ 右",
      "イ": "ア 風速・イ 短い・ウ 浅い・エ 左",
      "ウ": "ア 風速の2乗・イ 長い・ウ 深い・エ 左",
      "エ": "ア 風速の2乗・イ 長い・ウ 浅い・エ 右",
      "オ": "ア 風速の2乗・イ 短い・ウ 深い・エ 左"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "風の応力はおおむね風速の二乗に比例し、吹き寄せは奥行きが長く浅い湾で大きくなる。北半球では台風の進行方向右側で、移動と回転の向きが重なって強風になりやすい。",
    "choiceExplanations": {
      "ア": "水面に働く風の応力はおおむね風速の二乗に比例する。水深が浅い湾の方が、吹き寄せによる海面の傾きが大きくなりやすい。",
      "イ": "浅い湾という条件は合っている。吹き寄せは風速の二乗におおむね比例し、風が水に作用する距離が長い湾ほど水位が上がりやすい。",
      "ウ": "台風の進行方向の右側では、台風の回転による風と移動が重なって風が強まりやすい。深い湾より浅い湾の方が吹き寄せによる上昇幅が大きい。",
      "エ": "風の応力はおおむね風速の二乗に比例し、吹き寄せは奥行きが長く浅い湾で大きくなる。北半球では台風の進行方向右側で、移動と回転の向きが重なって強風になりやすい。",
      "オ": "湾の水深が浅いほど吹き寄せによる水位の差が大きく、湾の奥行きが長いほど風が海面に働く距離が長い。短く深い湾ではこの効果が相対的に小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q47",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "海洋学",
    "topicTags": [
      "海洋混合層と台風",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "海洋表層の混合層に関する次の記述のア〜エに当てはまるものの組合せとして最も妥当なのはどれか。\n「海洋の表面付近には、深さ方向に水温変化の少ない、厚さ数十メートルから数百メートルの層があり、海洋混合層と呼ばれる。混合層より下では、深海に向かって水温は徐々に低下する。日本近海において、冬季には、海面で海水が冷却され、また、海上を強い風が継続的に吹くため、上層と下層の水の混合が活発になり、混合層の厚さは［ア］なる。一方、夏季には、海面付近の海水が日射により温められ、海面付近と下層の温度差が大きくなるため、混合層の厚さは［イ］なる。このようなときに海上を台風が通過すると、強風による上層と下層の水の混合によって混合層より下の海水が取り込まれて、混合層の水温は［ウ］し、台風が［エ］られる。」",
    "choices": {
      "ア": "ア 厚く・イ 薄く・ウ 上昇・エ 強め",
      "イ": "ア 厚く・イ 薄く・ウ 低下・エ 弱め",
      "ウ": "ア 薄く・イ 厚く・ウ 上昇・エ 強め",
      "エ": "ア 薄く・イ 厚く・ウ 低下・エ 強め",
      "オ": "ア 薄く・イ 厚く・ウ 低下・エ 弱め"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "冬季には冷却と強風で混合が深く及ぶので厚くなり、夏季には表層が温まって成層し、混合層は薄くなる。台風自身の風で下層の冷水が混ざると水温が下がり、海からのエネルギー供給が減る。",
    "choiceExplanations": {
      "ア": "冬夏の厚さは合っているが、混合層の下には冷たい水がある。台風の強風でこの水が混ざれば表層水温は低下する。",
      "イ": "冬季には冷却と強風で混合が深く及ぶので厚くなり、夏季には表層が温まって成層し、混合層は薄くなる。台風自身の風で下層の冷水が混ざると水温が下がり、海からのエネルギー供給が減る。",
      "ウ": "冬季は強風と海面の冷却により上下が混ざりやすい。夏季には暖かい表層が密度の高い冷たい下層から分かれ、混合層は薄くなる。",
      "エ": "強風で冷水が取り込まれると表層水温が下がる点は合っている。これにより海面から台風への熱・水蒸気の供給が弱まりやすい。",
      "オ": "台風通過時の水温低下と弱化は合っている。混合層は冬季に厚く、夏季に薄くなるため、季節の厚さが逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q48",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "地球物理",
    "topicTags": [
      "海嶺三重会合点と相対速度",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、プレートA、B、Cから成る海嶺―海嶺―海嶺（RRR）型の三重会合点を考える。プレートAとBの間の海嶺は北方向、つまり、会合点から見て0°の方位（方位角は北から時計回りの角度で表す）に伸びているとする。プレートBとCの間の海嶺は会合点から見て120°、プレートAとCの間の海嶺は会合点から見て270°の方位にそれぞれ伸びているとする。プレートBとCの間の相対速度の大きさを100 mm/年としたとき、プレートAとBの間の相対速度の大きさ及びプレートCとAの間の相対速度の大きさとして最も妥当なのはどれか。ただし、プレートの運動方向は水平面内のみとし、この三重会合点の形状は時間的に変化せず、安定に存在しているものとする。また、必要ならば√3＝1.73を用いてよい。",
    "choices": {
      "ア": "AB 50 mm/年・CA 87 mm/年",
      "イ": "AB 50 mm/年・CA 173 mm/年",
      "ウ": "AB 87 mm/年・CA 50 mm/年",
      "エ": "AB 173 mm/年・CA 87 mm/年",
      "オ": "AB 173 mm/年・CA 50 mm/年"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "AB間の拡大方向は東西、CA間は南北である。海嶺に直交するBC間の相対速度100 mm/年の東西・南北成分の大きさは50、50√3であり、相対速度のベクトルの和が0になる値を選ぶ。",
    "choiceExplanations": {
      "ア": "AB間の拡大方向は東西、CA間は南北である。海嶺に直交するBC間の相対速度100 mm/年の東西・南北成分の大きさは50、50√3であり、相対速度のベクトルの和が0になる値を選ぶ。",
      "イ": "東西成分50 mm/年は正しいが、南北成分も元の100 mm/年より長くはならない。南北成分の大きさは100×√3/2で約87 mm/年である。",
      "ウ": "AB間は南北に伸びる海嶺に直交するので、相対速度は東西方向である。BC間の相対速度の東西成分が50、南北成分が約87 mm/年なので、この組合せでは成分が逆になる。",
      "エ": "CA間の約87 mm/年は南北成分の大きさと合う。AB間の東西成分は100×1/2＝50 mm/年であり、173 mm/年にはならない。",
      "オ": "基準となるBC間の速度ベクトルは100 mm/年の大きさを持つ。AB間とCA間の相対速度はその直交成分に相当するので、片方が100 mm/年を超える組合せは成立しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q48.webp"
    ],
    "imageAltTexts": [
      "三つのプレートを隔てる海嶺の方位が0度、120度、270度の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q49",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "地球物理",
    "topicTags": [
      "S波の透過係数",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "図のように、均質で異なる弾性定数をもつ二つの半無限弾性体が接している場所に、平面S波が鉛直下方から入射した場合を考える。伝播方向をz軸とし、境界面をz＝0とするような座標軸を設定する。z＜0の媒質Ⅰ中の密度とS波速度をそれぞれρ₁、V_S1、z≧0の媒質Ⅱ中の密度とS波速度をそれぞれρ₂、V_S2とする。鉛直下方からの振幅Aの入射波u_Iは u_I(z,t)＝A cos[ω(t−z/V_S1)] のように表せる。\nここで、ωは角周波数、tは時間を表す。入射波がz＝0に入射したときに発生する反射波u_R及び透過波u_Tは u_R(z,t)＝R cos[ω(t＋z/V_S1)]、u_T(z,t)＝T cos[ω(t−z/V_S2)] と表せる。ここで、RとTはそれぞれ反射波と透過波の振幅を表す。透過波の振幅Tとして最も妥当なのはどれか。\nただし、z＝0では変位とz方向の応力の値が連続なので、u(z,t)|_(z＝0−)＝u(z,t)|_(z＝0＋)、ρ₁V_S1² ∂u(z,t)/∂z|_(z＝0−)＝ρ₂V_S2² ∂u(z,t)/∂z|_(z＝0＋) が成り立つものとする。",
    "choices": {
      "ア": "Aρ₁V_S1/(ρ₁V_S1＋2ρ₂V_S2)",
      "イ": "2Aρ₁V_S1/(ρ₁V_S1＋ρ₂V_S2)",
      "ウ": "2Aρ₁V_S1/(2ρ₁V_S1＋ρ₂V_S2)",
      "エ": "A(ρ₁V_S1−ρ₂V_S2)/(2ρ₁V_S1＋ρ₂V_S2)",
      "オ": "A(2ρ₁V_S1−ρ₂V_S2)/(2ρ₁V_S1＋ρ₂V_S2)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "境界での変位からA＋R＝T、応力からρ₁V_S1(A−R)＝ρ₂V_S2Tが成り立つ。R＝T−Aを代入すると、分母に二つのインピーダンスの和、分子に2Aρ₁V_S1が残る。",
    "choiceExplanations": {
      "ア": "二つの媒質の波動インピーダンスが等しい場合、反射はなく透過波の振幅はAになる。この式はその場合にA/3となるため、境界条件と合わない。",
      "イ": "境界での変位からA＋R＝T、応力からρ₁V_S1(A−R)＝ρ₂V_S2Tが成り立つ。R＝T−Aを代入すると、分母に二つのインピーダンスの和、分子に2Aρ₁V_S1が残る。",
      "ウ": "応力条件にR＝T−Aを代入すると、AとRの差が2A−Tとなる。係数2が付くのは分子側のAであり、分母のρ₁V_S1に2は付かない。",
      "エ": "二つのインピーダンスが等しければ境界で反射せず、そのまま振幅Aで透過する。この式はインピーダンスが等しいと0になるため、透過振幅を表していない。",
      "オ": "入射波と反射波のz微分は互いに逆符号なので、応力条件にはA−Rが現れる。変位条件も同時に使うと、分子はインピーダンスの差を含まず2Aρ₁V_S1になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q49.webp"
    ],
    "imageAltTexts": [
      "境界面z＝0で媒質Ⅰからの入射波が反射波と透過波に分かれる原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-butsuri-q50",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-butsuri",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "地球物理",
    "topicTags": [
      "断層の型と主圧力軸",
      "物理区分"
    ],
    "difficulty": 3,
    "question": "断層には、正断層、逆断層、横ずれ断層の3種類がある。水平方向の二つの軸と鉛直方向の軸のうち、地震によって断層が形成される際、断層付近に働いた圧縮力が最も高い方向と最も低い方向をそれぞれ主圧力軸と主張力軸と呼ぶ。図の3種類の断層のうち、主圧力軸が水平方向のときに生じ得るもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "ア 正断層",
      "イ": "ア 正断層、イ 逆断層",
      "ウ": "イ 逆断層",
      "エ": "イ 逆断層、ウ 横ずれ断層",
      "オ": "ウ 横ずれ断層"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "逆断層は主圧力軸が水平で主張力軸が鉛直のときに生じる。横ずれ断層では主圧力軸と主張力軸がともに水平であり、いずれも条件を満たす。",
    "choiceExplanations": {
      "ア": "正断層では水平方向の引張りにより上盤が下方へずれる。主圧力軸は鉛直方向に当たる。",
      "イ": "逆断層は水平圧縮で生じるが、正断層は水平に伸びるときに生じ、主圧力軸は鉛直になる。水平圧縮で起こり得る横ずれ断層も必要である。",
      "ウ": "逆断層は水平方向に強く圧縮されるときに起きる。主圧力軸が水平で主張力軸も水平なら、横ずれ断層も生じ得る。",
      "エ": "逆断層は主圧力軸が水平で主張力軸が鉛直のときに生じる。横ずれ断層では主圧力軸と主張力軸がともに水平であり、いずれも条件を満たす。",
      "オ": "横ずれ断層で主圧力軸が水平なのは正しい。主張力軸が鉛直のときは逆断層でも主圧力軸は水平になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018481.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 物理区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-butsuri/q50.webp"
    ],
    "imageAltTexts": [
      "正断層、逆断層、横ずれ断層のずれ方を示す三つの原図"
    ]
  }
];
