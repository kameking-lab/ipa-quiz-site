import type { StagedKenchikushiQuestion } from "./types";

export const KENCHIKUSHI2_2026_III: readonly StagedKenchikushiQuestion[] = [
  {
    "id": "kenchikushi2-2026-annual-III-q1",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 1,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "断面二次モーメント",
    "topicTags": [
      "断面二次モーメント"
    ],
    "difficulty": 3,
    "question": "図のような断面積の等しい断面A及び断面Bにおいて、強軸まわりの断面二次モーメントをそれぞれIA、IBとするとき、I_B/I_Aの値として、最も近いものは、次のうちどれか。",
    "choices": {
      "ア": "0.6",
      "イ": "1.4",
      "ウ": "1.6",
      "エ": "2.0",
      "オ": "3.2"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。断面Aの強軸は図の水平軸でI_A=6×10³/12=500 cm⁴。断面Bは外接長方形から左右の欠損を引き、I_B=(12×10³-10×6³)/12=820 cm⁴。I_B/I_A=1.64より1.6が最も近い。",
    "choiceExplanations": {
      "ア": "不正解。0.6は強軸の断面二次モーメントの比を逆にした場合に近い。原本で求めるのはI_B/I_Aであり、820/500=1.64となる。",
      "イ": "不正解。断面Bは上下フランジの寄与が大きく、I_Bは820 cm⁴。I_A=500 cm⁴との比は1.64で、1.4より1.6のほうが近い。",
      "ウ": "正解。I_A=6×10³/12=500 cm⁴、I_B=(12×10³-10×6³)/12=820 cm⁴。比は820/500=1.64で、最も近い値は1.6。",
      "エ": "不正解。断面Bの外接長方形だけを用いると欠損部分の影響を無視する。左右の幅5 cm・高さ6 cmの欠損を控除すると、比は2.0ではなく1.64。",
      "オ": "不正解。両断面の面積は等しいが、強軸二次モーメントは面積だけでは決まらない。フランジとウェブの配置を考慮した比は1.64である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2026-III-q1.png"
    ],
    "imageAltTexts": [
      "等断面積の断面AとB、寸法cm。Aは幅6・高さ10の長方形。Bは全幅12・全高10、上下フランジ厚2、ウェブ厚2、フランジ間内法高さ6、ウェブ左右の突出幅5のH形。"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q2",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 2,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "曲げ応力度",
    "topicTags": [
      "曲げ応力度"
    ],
    "difficulty": 3,
    "question": "図のような等分布荷重を受ける片持ち梁に断面200mm×300mmの部材を用いた場合、その部材に生じる最大曲げ応力度として、正しいものは、次のうちどれか。ただし、部材の断面は一様とし、自重は無視するものとする。",
    "choices": {
      "ア": "0.01N/mm²",
      "イ": "0.2N/mm²",
      "ウ": "0.4N/mm²",
      "エ": "60N/mm²",
      "オ": "120N/mm²"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。片持ち梁固定端の最大曲げモーメントはwL²/2=10×6,000²/2=180×10⁶ N・mm。断面係数Z=200×300²/6=3.0×10⁶ mm³なのでσ=M/Z=60 N/mm²。",
    "choiceExplanations": {
      "ア": "不正解。0.01 N/mm²ではない。荷重は10 N/mm、梁長は6,000 mmで計算し、最大モーメントを断面係数で割る。長さの単位を統一する必要がある。",
      "イ": "不正解。0.2 N/mm²ではない。等分布荷重を受ける片持ち梁の固定端モーメントwL²/2を用いると180×10⁶ N・mmとなる。",
      "ウ": "不正解。0.4 N/mm²ではない。断面二次モーメントではなく断面係数Z=bh²/6でモーメントを割る。計算結果は60 N/mm²。",
      "エ": "正解。最大モーメントは180×10⁶ N・mm、断面係数は3.0×10⁶ mm³。最大曲げ応力度は180/3=60 N/mm²となる。",
      "オ": "不正解。120 N/mm²は正答の2倍。等分布荷重の合力は固定端からL/2の位置に作用するので、固定端モーメントはwL²ではなくwL²/2。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2026-III-q2.png"
    ],
    "imageAltTexts": [
      "左端固定・右端自由の片持ち梁。梁長6,000 mm、下向き等分布荷重10 N/mm。部材断面は幅200 mm・高さ300 mmの長方形。寸法単位mm。"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q3",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 3,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "張出し梁",
    "topicTags": [
      "張出し梁"
    ],
    "difficulty": 3,
    "question": "図のような、水平投影長さ8mで、水平投影長さ1m当たり鉛直方向に6kNの等分布荷重を受ける梁において、A点における曲げモーメントの大きさとして、正しいものは、次のうちどれか。",
    "choices": {
      "ア": "12kN・m",
      "イ": "15kN・m",
      "ウ": "24kN・m",
      "エ": "27kN・m",
      "オ": "30kN・m"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。A点の左側は水平投影長さ2 mの張出し部で、荷重合力6×2=12 kNがA点から水平距離1 mに作用する。A点の曲げモーメントの大きさは12×1=12 kN・m。",
    "choiceExplanations": {
      "ア": "正解。A点の左側の張出し部分だけで切断面の釣合いを取る。等分布荷重の合力12 kNと腕の長さ1 mから、曲げモーメントは12 kN・m。",
      "イ": "不正解。15 kN・mではない。荷重は水平投影長さ当たりで定められているため、傾斜した梁の実長を荷重長さに用いない。",
      "ウ": "不正解。24 kN・mは合力12 kNに張出し長さ2 mをそのまま乗じた値。合力の作用位置は張出し部の中央なので、腕の長さは1 mとなる。",
      "エ": "不正解。27 kN・mではない。A点の左側部分の釣合いだけで求められ、右側支間全体の荷重を直接加える必要はない。",
      "オ": "不正解。30 kN・mではない。A点の曲げは張出し部の等分布荷重による負曲げで、その絶対値は6×2²/2=12 kN・m。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2026-III-q3.png"
    ],
    "imageAltTexts": [
      "水平投影全長8 m、右上がり高低差6 mの梁。支持点Aは左端から水平2 m・高さ1.5 m、右支点はAから水平6 m・高さ4.5 m。全長に水平投影長さ1 m当たり下向き6 kN。左端は自由な張出し部。"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q4",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 4,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "静定ラーメン",
    "topicTags": [
      "静定ラーメン"
    ],
    "difficulty": 3,
    "question": "図のような外力を受ける静定ラーメンにおいて、支点A、Bに生じる鉛直反力RA、RBの値と、C点に生じるせん断力QCの絶対値との組合せとして、正しいものは、次のうちどれか。ただし、鉛直反力の方向は、上向きを「+」、下向きを「-」とする。",
    "choices": {
      "ア": "R_A：−6 kN、R_B：+6 kN、Q_Cの絶対値：6 kN",
      "イ": "R_A：−6 kN、R_B：+6 kN、Q_Cの絶対値：12 kN",
      "ウ": "R_A：+6 kN、R_B：−6 kN、Q_Cの絶対値：6 kN",
      "エ": "R_A：+6 kN、R_B：−6 kN、Q_Cの絶対値：12 kN",
      "オ": "R_A：+6 kN、R_B：+6 kN、Q_Cの絶対値：12 kN"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。水平荷重の合力は2×6=12 kN、A点に対するモーメントは12×3=36 kN・m。支点間6 mよりR_B=+6 kN、鉛直力の釣合いからR_A=−6 kN。梁C断面のせん断力の絶対値は6 kN。",
    "choiceExplanations": {
      "ア": "正解。水平分布荷重のモーメント36 kN・mを鉛直反力の偶力で抵抗する。R_A=−6 kN、R_B=+6 kN、C点の梁せん断力の絶対値は6 kN。",
      "イ": "不正解。鉛直反力の組合せは正しいが、C点のせん断力は6 kN。水平荷重の合力12 kNを水平梁のせん断力と取り違えている。",
      "ウ": "不正解。C点せん断力の絶対値は正しいが、鉛直反力の向きが逆。右向き水平荷重の転倒モーメントに対し、Aは下向き、Bは上向きとなる。",
      "エ": "不正解。鉛直反力の符号が逆であり、C点のせん断力も12 kNではなく6 kN。全体のモーメントの釣合いと梁の切断面の釣合いを別に考える。",
      "オ": "不正解。鉛直外力がないのでR_A+R_B=0でなければならない。両方を+6 kNとする組合せは、全体の鉛直力の釣合いを満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 4,
    "sourcePrintedPage": "構造 3",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2026-III-q4.png"
    ],
    "imageAltTexts": [
      "左柱脚Aがローラー支持、右柱脚Bがピン支持、柱高6 m、支点間6 m、Cは水平梁の中央で両端から3 m。左柱全高に右向き等分布荷重2 kN/m。選択肢表はR_A、R_B、Q_Cの絶対値の組合せ。"
    ],
    "originalContent": {
      "body": "図のような外力を受ける静定ラーメンにおいて、支点A、Bに生じる鉛直反力RA、RBの値と、C点に生じるせん断力QCの絶対値との組合せとして、正しいものは、次のうちどれか。ただし、鉛直反力の方向は、上向きを「+」、下向きを「-」とする。",
      "tables": [
        {
          "caption": "鉛直反力とC点せん断力の組合せ（選択肢1～5の順）",
          "rows": [
            [
              "R_A",
              "R_B",
              "Q_Cの絶対値"
            ],
            [
              "−6 kN",
              "+6 kN",
              "6 kN"
            ],
            [
              "−6 kN",
              "+6 kN",
              "12 kN"
            ],
            [
              "+6 kN",
              "−6 kN",
              "6 kN"
            ],
            [
              "+6 kN",
              "−6 kN",
              "12 kN"
            ],
            [
              "+6 kN",
              "+6 kN",
              "12 kN"
            ]
          ]
        }
      ]
    }
  },
  {
    "id": "kenchikushi2-2026-annual-III-q5",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 5,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "静定トラス",
    "topicTags": [
      "静定トラス"
    ],
    "difficulty": 3,
    "question": "図のような外力を受ける静定トラスにおいて、部材Aに生じる軸方向力の値として、正しいものは、次のうちどれか。ただし、軸方向力は、引張力を「+」、圧縮力を「-」とする。",
    "choices": {
      "ア": "−3√2 kN",
      "イ": "−√2 kN",
      "ウ": "0 kN",
      "エ": "+√2 kN",
      "オ": "+3√2 kN"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。全体の釣合いから右支点反力は3×2/6=1 kN。部材Aを切る断面で右側の鉛直力の釣合いを取ると、N_A sin45°=−1 kN。N_A=−√2 kNで圧縮となる。",
    "choiceExplanations": {
      "ア": "不正解。−3√2 kNではない。部材Aが負担する鉛直成分は荷重3 kNの全量ではなく、右支点反力の1 kNに対応する。",
      "イ": "正解。右支点反力は1 kN、部材Aの傾斜は45度。右側部分の鉛直力の釣合いからN_A=−1/sin45°=−√2 kNとなり、圧縮を示す。",
      "ウ": "不正解。部材Aは零部材ではない。右支点反力1 kNを切断面の斜材の鉛直成分で釣り合わせるため、軸力が生じる。",
      "エ": "不正解。絶対値√2 kNは合っているが、符号が逆。右側部分で右支点の上向き反力を打ち消すには、部材Aは圧縮となる。",
      "オ": "不正解。引張りではなく圧縮で、絶対値も3√2 kNではない。右支点反力1 kNと斜材の45度から−√2 kNを求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 5,
    "sourcePrintedPage": "構造 4",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2026-III-q5.png"
    ],
    "imageAltTexts": [
      "スパン6 m、高さ2 m、2 m間隔3区画の静定トラス。左端下がピン、右端下がローラー支持。左から2 mの上弦節点に下向き3 kN。部材Aはこの節点から右下の節点への斜材。"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q6",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 6,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "弾性座屈",
    "topicTags": [
      "弾性座屈"
    ],
    "difficulty": 3,
    "question": "図のような長さL(m)の柱(材端条件は、一端自由、他端固定とする。)に圧縮力Pが作用したとき、次のLとIとの組合せのうち、弾性座屈荷重が最も大きくなるものはどれか。ただし、Iは断面二次モーメントの最小値とし、それぞれの柱は同一の材質で、断面は一様とする。",
    "choices": {
      "ア": "L：2 m、I：2×10⁻⁵ m⁴",
      "イ": "L：3 m、I：4×10⁻⁵ m⁴",
      "ウ": "L：4 m、I：8×10⁻⁵ m⁴",
      "エ": "L：5 m、I：15×10⁻⁵ m⁴",
      "オ": "L：6 m、I：18×10⁻⁵ m⁴"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。オイラー座屈荷重はP_cr=π²EI/(2L)²。材質と材端条件が共通なのでI/L²を比較する。10⁻⁵を共通因子として、0.500、0.444、0.500、0.600、0.500となり、4が最大。",
    "choiceExplanations": {
      "ア": "不正解。I/L²=2/2²=0.500（共通因子10⁻⁵を除く）。選択肢4の15/5²=0.600より小さいので、座屈荷重は最大ではない。",
      "イ": "不正解。I/L²=4/3²≒0.444（共通因子10⁻⁵を除く）。5つの組合せのうち最小であり、弾性座屈荷重も最小になる。",
      "ウ": "不正解。I/L²=8/4²=0.500（共通因子10⁻⁵を除く）。選択肢1・5と同じで、選択肢4の0.600より小さい。",
      "エ": "正解。I/L²=15/5²=0.600（共通因子10⁻⁵を除く）で最大。長さだけ又は断面二次モーメントだけではなく、両者の比I/L²で比較する。",
      "オ": "不正解。断面二次モーメントは最大だが、柱長さも大きい。I/L²=18/6²=0.500となり、選択肢4より座屈荷重は小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 5,
    "sourcePrintedPage": "構造 4",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2026-III-q6.png"
    ],
    "imageAltTexts": [
      "一端固定・他端自由の長さLの柱。自由端から軸方向圧縮力P。選択肢表はL(m)、最小断面二次モーメントI(m⁴)の順に、2と2×10⁻⁵、3と4×10⁻⁵、4と8×10⁻⁵、5と15×10⁻⁵、6と18×10⁻⁵。"
    ],
    "originalContent": {
      "body": "図のような長さL(m)の柱(材端条件は、一端自由、他端固定とする。)に圧縮力Pが作用したとき、次のLとIとの組合せのうち、弾性座屈荷重が最も大きくなるものはどれか。ただし、Iは断面二次モーメントの最小値とし、それぞれの柱は同一の材質で、断面は一様とする。",
      "tables": [
        {
          "caption": "柱の長さと最小断面二次モーメント（選択肢1～5の順）",
          "rows": [
            [
              "L（m）",
              "I（m⁴）"
            ],
            [
              "2",
              "2×10⁻⁵"
            ],
            [
              "3",
              "4×10⁻⁵"
            ],
            [
              "4",
              "8×10⁻⁵"
            ],
            [
              "5",
              "15×10⁻⁵"
            ],
            [
              "6",
              "18×10⁻⁵"
            ]
          ]
        }
      ]
    }
  },
  {
    "id": "kenchikushi2-2026-annual-III-q7",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 7,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "荷重・外力",
    "topicTags": [
      "荷重・外力"
    ],
    "difficulty": 3,
    "question": "構造計算における荷重及び外力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "各階が事務室である建築物において、基礎の垂直荷重による圧縮力を計算する場合の積載荷重は、その基礎が支える床の数に応じて低減することができる。",
      "イ": "屋根の積雪荷重は、屋根に雪止めがある場合を除き、その勾配が60度を超える場合において、零とすることができる。",
      "ウ": "多雪区域において、長期に生ずる力の計算に用いる積雪荷重は、短期に生ずる力の計算に用いる積雪荷重の0.35倍の数値とする。",
      "エ": "許容応力度等計算において、地盤が著しく軟弱な区域として指定された区域内における木造の建築物の標準せん断力係数C0は、原則として、0.3以上とする。",
      "オ": "建築物の地下の各部分に作用する地震力の計算に用いる水平震度kの下限値は、一般に、地盤面から深さ20mまでは深さが深くなるほど小さくなる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。多雪区域で長期に用いる積雪荷重は、積雪時の短期計算で用いる積雪荷重の0.7倍。0.35は地震時の荷重組合せに現れる係数であり、長期の係数ではない。",
    "choiceExplanations": {
      "ア": "適当。事務室等の積載荷重について、柱・基礎が支える床数が多いほど全階が同時に満載となる可能性が低いことを考慮した低減が認められる。",
      "イ": "適当。屋根の積雪荷重は勾配に応じて低減でき、雪止めがない場合は勾配60度超で零とすることができる。雪止めがある場合はこの扱いを適用しない。",
      "ウ": "不適当。多雪区域の長期の荷重組合せでは積雪荷重の0.7倍を用いる。0.35倍は地震時の組合せに用いる値であり、長期荷重と混同している。",
      "エ": "適当。著しく軟弱な地盤の指定区域にある木造では、標準せん断力係数C0を原則0.3以上とする。通常の原則0.2以上より大きい。",
      "オ": "適当。地下部分の水平震度の下限は深さに応じて低減され、地盤面から20 mまでの範囲では、一般に深くなるほど小さい値となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 6,
    "sourcePrintedPage": "構造 5",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q8",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 8,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "風圧力",
    "topicTags": [
      "風圧力"
    ],
    "difficulty": 3,
    "question": "図のような方向に風を受ける建築物のA点における風圧力の大きさとして、最も適当なものは、次のうちどれか。ただし、速度圧は1,000N/m²とし、建築物の外圧係数及び内圧係数は、図に示す値とする。",
    "choices": {
      "ア": "150N/m²",
      "イ": "200N/m²",
      "ウ": "350N/m²",
      "エ": "400N/m²",
      "オ": "600N/m²"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。A点は風下側壁で外圧係数−0.40、内圧係数−0.20。風力係数は−0.40−(−0.20)=−0.20で、風圧力の大きさは1,000×0.20=200 N/m²。",
    "choiceExplanations": {
      "ア": "不正解。150 N/m²ではない。風圧力は外圧係数と内圧係数の差に速度圧を乗じて求める。係数を掛け合わせない。",
      "イ": "正解。外圧係数−0.40から内圧係数−0.20を引くと−0.20。速度圧1,000 N/m²を乗じた絶対値は200 N/m²となる。",
      "ウ": "不正解。350 N/m²ではない。A点は風下側の鉛直壁にあり、風上側壁や屋根の外圧係数を用いない。図の−0.40を使う。",
      "エ": "不正解。400 N/m²は外圧係数だけで計算した値。建築物内部の圧力も作用するため、外圧と内圧の差を考慮する必要がある。",
      "オ": "不正解。600 N/m²は係数の絶対値0.40と0.20を足した値。両係数が負なので差は−0.20となり、その絶対値を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 6,
    "sourcePrintedPage": "構造 5",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2026-III-q8.png"
    ],
    "imageAltTexts": [
      "左から風を受ける切妻建築物の断面。外圧係数は風上壁+0.75、風上屋根−1.00、風下屋根−0.50、風下壁−0.40。内圧係数−0.20。A点は風下壁。枠内は外圧係数、括弧内は内圧係数の原図注記あり。"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q9",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 9,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "地盤・基礎",
    "topicTags": [
      "地盤・基礎"
    ],
    "difficulty": 3,
    "question": "地盤及び基礎構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "沖積層は、一般に、洪積層に比べて、支持力不足や地盤沈下が生じやすい。",
      "イ": "直接基礎の水平抵抗の検討において、上部構造の重量として基礎底面から下方の地盤へ作用する鉛直力が地下水による浮力によって減少し、摩擦抵抗が減少する場合がある。",
      "ウ": "地下外壁に地下水による水圧が作用する場合、地下水位が低いほど、その水圧は大きくなる。",
      "エ": "軟弱地盤等において、周囲の地盤が沈下することにより、杭の周面に下向きに作用する摩擦力を「負の摩擦力」という。",
      "オ": "一般に、標準貫入試験によるN値が同じであっても、砂質地盤と粘土質地盤とでは長期許容応力度が異なる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。地下水による静水圧は、その位置より上にある水頭の高さに比例する。同じ地下外壁の位置では、地下水位が高いほど水圧が大きい。",
    "choiceExplanations": {
      "ア": "適当。沖積層は比較的新しく堆積した地層で、一般に洪積層より軟弱な地盤を含み、支持力不足や沈下への注意が必要となる。",
      "イ": "適当。地下水の浮力で基礎底面の有効な鉛直力が小さくなると、底面摩擦による水平抵抗も減少する場合がある。",
      "ウ": "不適当。水圧は水頭に比例するので、同じ深さの地下外壁では地下水位が高いほど大きくなる。低いほど大きいとする方向が逆である。",
      "エ": "適当。杭周辺の地盤が杭より沈下すると、杭を下向きに引きずる周面摩擦が働く。これは杭の負担を増やす負の摩擦力である。",
      "オ": "適当。N値は地盤の性質を表す唯一の指標ではない。砂質土と粘性土では、同じN値でも強度・変形特性が異なり、許容応力度の評価も異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6"
  },
  {
    "id": "kenchikushi2-2026-annual-III-q10",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 10,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木造の部材",
    "topicTags": [
      "木造の部材"
    ],
    "difficulty": 3,
    "question": "木造建築物の部材とその説明との組合せとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "内法貫 ― 床板の端部などを受けるために、柱の根元近くに入れる部材",
      "イ": "転び止め ― 小屋組において、合掌の上に母屋を取り付ける際に、母屋が移動・回転しないように留めておく部材",
      "ウ": "長押 ― 鴨居の上部に水平に取り付けられる和室の化粧造作材",
      "エ": "配付け垂木 ― 寄棟屋根において、隅木の側面に斜めに取り付ける部材",
      "オ": "根太掛け ― 柱の横や土台の側面に取り付けて、根太の端部を受ける部材"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。柱の根元近くで床板の端部等を受ける貫は足貫。内法貫は内法付近の高さで柱相互をつなぐ水平部材であり、部材名と説明が対応していない。",
    "choiceExplanations": {
      "ア": "不適当。記述は足貫など柱の根元近くに入れる部材の説明。内法貫は内法付近の高さに設ける貫で、柱脚近くの床板を受ける部材ではない。",
      "イ": "適当。転び止めは母屋等の横移動や回転を防ぎ、所定の位置・向きを保つための部材である。",
      "ウ": "適当。長押は和室の鴨居上などで柱を水平につなぐように取り付ける化粧造作材。貫とは取り付け方や役割が異なる。",
      "エ": "適当。配付け垂木は寄棟屋根などで隅木に取り付く短い垂木で、隅木の側面へ斜めに取り付ける。",
      "オ": "適当。根太掛けは柱・土台等の側面に設け、根太の端部を受けて床荷重を伝える部材である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6",
    "sourceRubies": [
      {
        "base": "母屋",
        "reading": "もや"
      }
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q11",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 11,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木造軸組",
    "topicTags": [
      "木造軸組"
    ],
    "difficulty": 3,
    "question": "木造2階建ての建築物の構造設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "圧縮力を負担する筋かいとして使用する木材の断面寸法は、一般に、幅9cm以上、厚さ3cm以上とする。",
      "イ": "筋かいを入れた高さが3.2mを超える軸組の壁倍率は、通常の壁倍率に低減係数を乗じた値とする。",
      "ウ": "風圧力は、柱を介して水平構面に伝達されるので、柱の断面及びその仕口の設計においては、水平荷重と鉛直荷重を考慮する。",
      "エ": "耐力壁は、上下階の位置をできるだけ分散させ、かつ、市松状にならないように配置する。",
      "オ": "柱にやむを得ず設ける切欠きの大きさは、原則として、柱の所要断面積の1/3未満とする。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。耐力壁は平面内で偏りなく配置し、上下階でできるだけ位置をそろえて力を伝える。上下階の耐力壁位置をできるだけ分散するという4の記述が不適当。",
    "choiceExplanations": {
      "ア": "適当。圧縮力を負担する木製筋かいは、一般に幅9 cm以上、厚さ3 cm以上とし、圧縮による座屈等に配慮する。",
      "イ": "適当。筋かいを入れた高い軸組では通常の高さの場合に比べ耐力が低下するので、3.2 mを超える場合は所定の低減係数を用いる。",
      "ウ": "適当。風による水平荷重は柱等から床・小屋等の水平構面に伝わる。柱と仕口は鉛直荷重だけでなく水平荷重も考慮して設計する。",
      "エ": "不適当。耐力壁は平面的な偏りを避けつつ、上下階の位置をできるだけ一致させる。上下で分散したり市松状にしたりすると力の伝達が不利になる。",
      "オ": "適当。柱にやむを得ず切欠きを設ける場合も、所要断面積の1/3未満とするのが原則であり、断面欠損による耐力低下を抑える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q12",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 12,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "枠組壁工法",
    "topicTags": [
      "枠組壁工法"
    ],
    "difficulty": 3,
    "question": "枠組壁工法による2階建ての住宅に関する次の記述のうち、最も不適当なものはどれか。ただし、構造計算は行わないものとする。",
    "choices": {
      "ア": "床根太相互及び床根太と側根太との間隔は、65cm以下とする。",
      "イ": "幅90cm以上の開口部の上部には、まぐさ受けによって支えられたまぐさを設ける。",
      "ウ": "アンカーボルトは、その間隔を2m以下とし、隅角部及び土台の継手部に配置する。",
      "エ": "同じ壁に複数の仕様が併用されている耐力壁の倍率は、7倍を上限として、各仕様の倍率を合算した値とすることができる。",
      "オ": "耐力壁線相互の間隔は、15m以下とする。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。構造計算を行わない枠組壁工法では、耐力壁線相互の間隔は原則12 m以下。15 m以下とする5は規定を緩め過ぎている。",
    "choiceExplanations": {
      "ア": "適当。床根太相互及び床根太と側根太の間隔は65 cm以下とし、床下地等を適切に支持する。",
      "イ": "適当。幅90 cm以上の開口部上部にはまぐさを設け、まぐさ受けを介して開口上部の荷重を側部へ伝達する。",
      "ウ": "適当。アンカーボルトは間隔2 m以下とし、隅角部と土台継手部にも配置して、土台を基礎へ緊結する。",
      "エ": "適当。同一壁に複数仕様を併用した場合、仕様ごとの倍率を合算できるが、7倍が上限となる。無制限に加算できるわけではない。",
      "オ": "不適当。耐力壁線相互の間隔は原則12 m以下。設問は構造計算を行わないので、15 mまで認めるものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001769650.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q13",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 13,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "壁式RC造",
    "topicTags": [
      "壁式RC造"
    ],
    "difficulty": 3,
    "question": "壁式鉄筋コンクリート造3階建ての住宅に関する次の記述のうち、最も不適当なものはどれか。ただし、壁式プレキャスト鉄筋コンクリート造ではないものとする。",
    "choices": {
      "ア": "1階及び2階の耐力壁の厚さを15cmとした。",
      "イ": "構造計算によって構造耐力上安全であることを確認したので、壁梁のせいを40cmとした。",
      "ウ": "各階の階高を3.5mとした。",
      "エ": "構造耐力上主要な部分のコンクリートの設計基準強度を18N/mm²とした。",
      "オ": "耐力壁の実長を45cm以上、かつ、同一の実長を有する部分の高さの30%以上とした。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。現場打ちの壁式鉄筋コンクリート造3階建てでは、最上階以外の耐力壁の最小厚さは原則18 cm。1階・2階とも15 cmとした1は不足する。",
    "choiceExplanations": {
      "ア": "不適当。3階建ての最上階以外の耐力壁は原則18 cm以上を要する。1階・2階を15 cmとするのは不足。壁式プレキャストRC造の規定と区別する。",
      "イ": "適当。壁梁のせいは原則45 cm以上だが、構造計算により安全性を確認した場合にはこの仕様規定によらず40 cmとすることができる。",
      "ウ": "適当。壁式RC造の階高は3.5 m以下とする。ちょうど3.5 mはこの上限に含まれる。",
      "エ": "適当。構造耐力上主要な部分のコンクリートの設計基準強度は18 N/mm²以上を確保する。設問の18 N/mm²は最低値を満たす。",
      "オ": "適当。耐力壁の実長は45 cm以上、かつ同一実長部分の高さの30%以上を確保する。幅だけでなく壁の高さとの関係も確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "officialReferenceUrls": [
      "https://www.jstage.jst.go.jp/article/coj/54/7/54_681/_pdf"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q14",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 14,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "RC造の構造特性",
    "topicTags": [
      "RC造の構造特性"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "普通コンクリートを用いた柱の小径は、原則として、その構造耐力上主要な支点間の距離の1/30以上とする。",
      "イ": "長方形梁とスラブが一体となった構造とみなされるT形梁において、スラブが圧縮側になる場合、スラブの効果を取り入れて許容曲げモーメントを算定してよい。",
      "ウ": "耐震壁の短期許容せん断力は、「壁にせん断ひび割れが生じないという条件から求めたせん断力」と「壁のせん断ひび割れの発生以降に壁と柱が負担しうるせん断力」のうち、大きいほうとすることができる。",
      "エ": "普通コンクリートを用いた片持ちスラブの厚さは、建築物の使用上の支障が起こらないことを計算によって確かめた場合を除き、片持ちスラブの出の長さの1/10を超える値とする。",
      "オ": "柱、梁のせん断破壊は、脆性的な破壊であり、建築物の崩壊につながるおそれがあるので、一般に、曲げ破壊よりも先行しないように設計する。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。普通コンクリート柱の小径は原則支点間距離の1/15以上。1/30以上とする1は小さ過ぎる。せん断破壊の防止やスラブの剛性なども別に確認する。",
    "choiceExplanations": {
      "ア": "不適当。普通コンクリートを用いた柱の小径は原則として支点間距離の1/15以上。1/30では必要な寸法の半分となる。",
      "イ": "適当。スラブが圧縮側となるT形梁では、有効幅の範囲のスラブを圧縮フランジとして扱い、許容曲げモーメントの算定に寄与させることができる。",
      "ウ": "適当。RC耐震壁の短期許容せん断力は、せん断ひび割れ前の限度と、ひび割れ後に壁・柱が負担する限度を算定し、規準に従って大きいほうを採用できる。",
      "エ": "適当。片持ちスラブの変形を抑えるため、原則として厚さを出の長さの1/10を超える値とする。使用上の支障がないことを計算で確認した場合は例外となる。",
      "オ": "適当。せん断破壊は脆性的で変形能力が乏しい。十分なせん断耐力を確保し、曲げ降伏に先行してせん断破壊しないようにする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "sourceRubies": [
      {
        "base": "脆",
        "reading": "ぜい"
      }
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q15",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 15,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "RC造の配筋",
    "topicTags": [
      "RC造の配筋"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造における配筋等に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "折曲げによる梁主筋の柱への定着における投影定着長さは、原則として、柱せいの0.75倍以上とする。",
      "イ": "柱の帯筋の末端部は、135度以上に折り曲げて定着させるか、又は相互に溶接する。",
      "ウ": "床スラブの最大曲げモーメントを受ける部分における配筋は、一般に、異形鉄筋を用いる場合、短辺方向では200mm以下の間隔とする。",
      "エ": "柱の出隅部分に設ける主筋の末端は、一般に、異形鉄筋を用いる場合、直線定着としてもよい。",
      "オ": "鉄筋の重ね継手は、原則として、部材応力並びに鉄筋存在応力度の小さい箇所に設け、同一断面で全数継手としない。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。柱の出隅の主筋末端には、一般にフックを設けて定着を確保する。異形鉄筋だから直線定着でよいとする4は、出隅柱の主筋の扱いとして不適当。",
    "choiceExplanations": {
      "ア": "適当。梁主筋を折り曲げて柱へ定着する場合、投影定着長さは原則柱せいの0.75倍以上とする。曲げた鉄筋の全長とは区別する。",
      "イ": "適当。柱帯筋の末端は135度以上のフック等で定着するか、相互に溶接して閉鎖性を確保する。主筋を拘束し、せん断補強の効果を得るためである。",
      "ウ": "適当。床スラブの最大曲げモーメント部では、短辺方向の異形鉄筋の間隔を一般に200 mm以下とし、ひび割れの分散等に配慮する。",
      "エ": "不適当。柱の出隅に設ける主筋末端には一般にフックが必要である。異形鉄筋の付着だけで直線定着としてよいという説明は適切でない。",
      "オ": "適当。重ね継手は応力の小さい箇所に配置し、同じ断面へ全数を集中させない。継手の負担とひび割れの集中を避ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8"
  },
  {
    "id": "kenchikushi2-2026-annual-III-q16",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 16,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鉄骨構造",
    "topicTags": [
      "鉄骨構造"
    ],
    "difficulty": 3,
    "question": "鉄骨構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "細長比の大きい部材ほど、座屈の影響により、許容圧縮応力度が小さくなる。",
      "イ": "クレーン走行桁など、1×10⁴回を超える繰返し応力を受ける部材及び接合部に対しては、一般に、疲労の検討を行う。",
      "ウ": "露出柱脚に用いられるアンカーボルトの設計において、柱脚に引張力が作用する場合、一般に、引張力とせん断力との組合せ応力を考慮する必要がある。",
      "エ": "側柱や隅柱の埋込み柱脚において、鋼柱から基礎梁のない側の基礎コンクリート端までの距離が小さい場合、パンチングシヤー破壊が生じやすい。",
      "オ": "長期に作用する荷重に対する梁材のたわみは、通常の場合ではスパンの1/200以下とし、片持ち梁の場合ではスパンの1/250以下とする。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。長期荷重による梁のたわみの一般的な目安は、通常の梁でスパンの1/300以下、片持ち梁で1/250以下。選択肢5の通常梁の1/200が誤りで、片持ち梁の1/250は正しい。",
    "choiceExplanations": {
      "ア": "適当。細長比が大きい圧縮材は座屈しやすくなり、許容圧縮応力度は小さくなる。材料の引張強度だけで圧縮耐力を判断しない。",
      "イ": "適当。クレーン走行桁等で1万回を超える繰返し応力を受ける場合は、応力範囲や繰返し回数に応じた疲労の検討を行う。",
      "ウ": "適当。露出柱脚のアンカーボルトに引張力とせん断力が同時に作用する場合は、両者の組合せによる耐力を検討する必要がある。",
      "エ": "適当。側柱・隅柱の埋込み柱脚で基礎梁のない側の縁端距離が小さいと、周囲のコンクリートが押し抜かれるパンチングシヤー破壊が生じやすい。",
      "オ": "不適当。通常の梁はスパンの1/300以下、片持ち梁は1/250以下を一般的な限度とする。選択肢の通常梁の1/200が誤りであり、片持ち梁の1/250は正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "officialReferenceUrls": [
      "https://aij-static-bucket.s3-ap-northeast-1.amazonaws.com/da1/shiyoukijyun/pdf/J7004246_01.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q17",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 17,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鉄骨接合",
    "topicTags": [
      "鉄骨接合"
    ],
    "difficulty": 3,
    "question": "鉄骨構造の接合に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "重ね継手は、2列以上の隅肉溶接を原則とし、薄いほうの板厚の5倍以上、かつ、30mm以上重ね合わせなければならない。",
      "イ": "一つの継手に溶接接合と高力ボルト摩擦接合とを併用する場合において、溶接接合が高力ボルト摩擦接合より先に施工されるときは、溶接接合と高力ボルト摩擦接合の両方の耐力を加算することができる。",
      "ウ": "高力ボルトの接合において、ボルト孔の中心間の距離は、ねじの呼び径の2.5倍以上とする。",
      "エ": "軒の高さが9mを超える、又は張り間が13mを超える建築物の構造耐力上主要な部分である鋼材の接合には、原則として、普通ボルトを使用してはならない。",
      "オ": "溶接継目ののど断面に対する短期許容せん断応力度は、長期許容せん断応力度の1.5倍とする。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。溶接接合と高力ボルト摩擦接合の許容耐力の加算は、原則として高力ボルトを先に締め付ける場合に認められる。溶接を先に施工する2は順序が逆。",
    "choiceExplanations": {
      "ア": "適当。重ね継手は原則2列以上の隅肉溶接とし、重ね長さを薄板厚の5倍以上かつ30 mm以上確保する。両方の条件を満たす必要がある。",
      "イ": "不適当。溶接を先行すると熱変形などによって摩擦面の密着が損なわれるおそれがある。耐力を加算できるのは、原則高力ボルトの締付けを先に行う場合。",
      "ウ": "適当。高力ボルト孔の中心間距離は、ねじの呼び径の2.5倍以上とする。孔の径や縁端距離とは別の寸法である。",
      "エ": "適当。軒高9 m超又は張り間13 m超等の鋼構造では、主要な鋼材接合を普通ボルトだけに頼ることは原則として認められない。",
      "オ": "適当。溶接継目ののど断面に対する短期許容せん断応力度は、長期の1.5倍とする。のど断面を用いる点にも注意する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377",
      "https://www.kouriki-bolt.jp/qa/faq"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q18",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 18,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "構造計画",
    "topicTags": [
      "構造計画"
    ],
    "difficulty": 3,
    "question": "建築物の構造計画に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "同一の建築物に異なる構造方法による基礎を採用するので、自重による圧密沈下等を考慮した許容応力度計算を行い、建築物又は建築物の部分に有害な損傷、変形及び沈下が生じないことを確かめた。",
      "イ": "開口周比が0.3の開口部を有する鉄筋コンクリート造の耐力壁について、無開口の耐力壁のせん断剛性とせん断耐力の数値に、開口部の寸法を用いて計算したそれぞれの低減率を乗じて、構造計算を行った。",
      "ウ": "暴風時の揺れを抑える目的のために、同調質量型の制振装置を建築物の頂部に集中配置した。",
      "エ": "木造の建築物について、床組や小屋梁組のたわみを減少させるために、火打ち材を用いて補強した。",
      "オ": "温度変化によって部材の伸縮量が大きくなることが予想される建築物について、大きな温度応力が生じないための対策として、エキスパンションジョイントを設けた。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。火打ち材は床組・小屋梁組の面内剛性を高め、水平力を伝えるための補強材。鉛直荷重による床梁等のたわみを直接減らす目的の部材ではない。",
    "choiceExplanations": {
      "ア": "適当。異なる構造方法の基礎の併用は原則禁止だが、所定の構造計算で安全性を確認する例外がある。不同沈下等も含めて有害な変形がないことを確認する。",
      "イ": "適当。開口を有するRC耐力壁は、開口寸法に応じて無開口壁に対するせん断剛性・せん断耐力をそれぞれ低減して評価する。開口周比0.3はこの扱いの対象範囲にある。",
      "ウ": "適当。同調質量型の制振装置は建築物の振動に同調する質量の運動を利用する。揺れが大きい頂部へ設置する方法は風揺れの低減に有効である。",
      "エ": "不適当。火打ち材は水平構面の面内変形を抑え、地震・風の水平力を伝えるために設ける。床梁や小屋梁の鉛直たわみ対策として説明するのは適切でない。",
      "オ": "適当。エキスパンションジョイントで建築物を分けると温度伸縮等の相対変位を許容でき、大きな温度応力の発生を抑えられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9"
  },
  {
    "id": "kenchikushi2-2026-annual-III-q19",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 19,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "耐震設計",
    "topicTags": [
      "耐震設計"
    ],
    "difficulty": 3,
    "question": "建築物の耐震設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "建築物の固有周期と地震の揺れの周期が一致すると、建築物の揺れが増幅されて徐々に大きくなる共振現象が起き、建築物が激しく揺れ、被害が発生する場合がある。",
      "イ": "建築物には振動エネルギーを吸収することで揺れを減少させる性質があり、この減少の度合いを表す指標として、減衰定数を用いる。",
      "ウ": "一般に、壁の多い鉄筋コンクリート造やブレースの多い鉄骨造の建築物は強度を大きくして地震力に抵抗する「強度指向型の構造」であり、ラーメン構造の建築物は弾性限を超えて大きな変形を生じることのできる「靱性指向型の構造」である。",
      "エ": "鉄筋コンクリート造のスラブなどにより床の一体性の確保が図られた剛床仮定のもとでは、建築物の各層の地震力は、一般に、柱や耐震壁などにそれらの水平剛性が比例して分配される。",
      "オ": "鉄骨造の建築物において、保有耐力接合の検討は、柱及び梁部材の局部座屈を防止するために行う。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。保有耐力接合は部材が十分に塑性変形するまで接合部が先行破断しないようにする設計。柱・梁部材そのものの局部座屈を防ぐ検討とは異なる。",
    "choiceExplanations": {
      "ア": "適当。入力地震動の周期と建築物の固有周期が近づくと共振で応答が大きくなり、大きな損傷につながる場合がある。",
      "イ": "適当。減衰定数は振動エネルギーの散逸による揺れの減少の度合いを表す。減衰が大きいほど一般に振動の収まりがよい。",
      "ウ": "適当。耐震壁・ブレースの多い構造は強度の確保を主とし、ラーメンは部材の塑性変形能力を活用する靱性指向の設計と関係が深い。",
      "エ": "適当。剛床かつ並進応答の基本的な扱いでは、各層の水平力は柱・耐震壁等の水平剛性に比例して分配する。剛性の偏りがある場合はねじれも考慮する。",
      "オ": "不適当。保有耐力接合は部材の降伏・塑性化に先行して接合部が破断することを防ぐ検討である。部材の局部座屈は主に板要素の幅厚比等によって検討する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10",
    "sourceRubies": [
      {
        "base": "靱",
        "reading": "じん"
      }
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q20",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 20,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木材・木質材料",
    "topicTags": [
      "木材・木質材料"
    ],
    "difficulty": 3,
    "question": "建築材料として使用される木材及び木質材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "JISにおいて、繊維板は、密度、用途及び製法によってインシュレーションボード、ミディアムデンシティファイバーボード(MDF)、ハードボードに分類される。",
      "イ": "木材に一定の荷重を継続して載荷すると、時間の経過に伴って変形が徐々に増加していくクリープが生じる。",
      "ウ": "含水率が繊維飽和点以上の木材において、膨張・収縮は、ほぼ含水率に比例する。",
      "エ": "単板積層材(LVL)は、一般に、厚さ2～6mm程度の単板の繊維方向をほぼ平行にして積層接着したものである。",
      "オ": "耐腐朽性及び耐蟻性が高い木材として、ヒバ、ベイヒバ等がある。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。木材の膨張・収縮が含水率変化に応じて生じるのは主として繊維飽和点以下。繊維飽和点以上では自由水が増減するため、寸法変化は小さい。",
    "choiceExplanations": {
      "ア": "適当。繊維板は密度や製法等により、インシュレーションボード、MDF、ハードボードに分類され、用途に応じて選定する。",
      "イ": "適当。木材には持続荷重の下で時間とともに変形が進むクリープが生じる。長期たわみ等ではこの影響を考慮する。",
      "ウ": "不適当。繊維飽和点以上では主に細胞内の自由水が変化し、寸法はほとんど変わらない。含水率にほぼ対応する膨張・収縮は繊維飽和点以下で顕著となる。",
      "エ": "適当。LVLは薄い単板を、繊維方向をほぼ平行にそろえて積層接着する材料。一般的な合板の交互直交積層と区別する。",
      "オ": "適当。ヒバやベイヒバは心材の耐腐朽性・耐蟻性が高い樹種として用いられる。実際の耐久性は使用部位や水分条件にも左右される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10"
  },
  {
    "id": "kenchikushi2-2026-annual-III-q21",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 21,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "コンクリート"
    ],
    "difficulty": 3,
    "question": "コンクリートに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "コンクリートの調合管理強度は、品質基準強度に構造体強度補正値を加えて求める。",
      "イ": "常温時において、コンクリートの線膨張係数は鉄筋とほぼ等しいので、鉄筋コンクリート部材内で、温度変化によってコンクリートと鉄筋との間にずれが生じることはない。",
      "ウ": "コンクリートの引張強度は小さく、乾燥収縮ひずみが引張破壊ひずみを上回ることがあるので、変形を拘束されている部材では、常にひび割れの発生を予期する必要がある。",
      "エ": "気乾単位容積質量が大きいコンクリートほど、ヤング係数は大きくなる。",
      "オ": "コンクリートの耐久性に関わる中性化の進行は、水セメント比が大きいほど遅くなる。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。水セメント比が大きいとコンクリートの組織は一般に粗くなり、二酸化炭素の浸入が進みやすい。中性化は遅くなるのではなく、一般に速くなる。",
    "choiceExplanations": {
      "ア": "適当。調合管理強度は品質基準強度に構造体強度補正値を加えて定め、構造体で必要な強度が得られるよう調合を管理する。",
      "イ": "適当。常温範囲ではコンクリートと鉄筋の線膨張係数はほぼ同じで、温度変化による両者の伸縮差は小さく、一体のRC部材として働きやすい。",
      "ウ": "適当。コンクリートの引張破壊ひずみは小さいため、乾燥収縮を拘束するとひび割れが生じうる。配筋や目地等によるひび割れ制御が必要となる。",
      "エ": "適当。コンクリートのヤング係数は圧縮強度と単位容積質量等に依存し、他の条件が同じなら気乾単位容積質量が大きいほど大きくなる。",
      "オ": "不適当。水セメント比が大きいと一般に中性化は速くなる。緻密な組織を得て二酸化炭素の浸入を抑えることが中性化抵抗性の向上につながる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q22",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 22,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "コンクリート材料",
    "topicTags": [
      "コンクリート材料"
    ],
    "difficulty": 3,
    "question": "コンクリートの材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "コンクリート中に含まれる塩化物イオン量は、原則として、1m³につき0.30kg以下とする必要がある。",
      "イ": "コンクリートの骨材は、適切な粒形及び粒度分布を有したものでないと、コンクリート打設時のワーカビリティー低下の原因となる。",
      "ウ": "AE剤は、コンクリート中に無数の微細な気泡を生じさせることから、凍結融解に対する抵抗性を低下させる。",
      "エ": "高炉スラグ微粉末を使用することにより、硬化後のコンクリートの水密性や化学抵抗性を向上させることができる。",
      "オ": "コンクリート用練混ぜ水の水質は、コンクリートの凝結時間、硬化後の強度に大きな影響を及ぼす。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。AE剤が作る微細な独立気泡は、凍結による水の膨張を緩和する空間となる。適切な空気量の確保により凍結融解抵抗性は向上する。",
    "choiceExplanations": {
      "ア": "適当。コンクリートの塩化物イオン量は、鉄筋腐食の防止のため原則として1 m³当たり0.30 kg以下に管理する。",
      "イ": "適当。粒形・粒度が不適切な骨材では流動性や材料分離抵抗性が低下し、打込みや締固めが難しくなることがある。",
      "ウ": "不適当。AE剤の微細気泡は凍結時の圧力を緩和し、凍結融解作用に対する抵抗性を高める。抵抗性を低下させるという説明は逆である。",
      "エ": "適当。高炉スラグ微粉末の利用は組織の緻密化等によって、水密性や化学的な抵抗性の改善に役立つ。",
      "オ": "適当。練混ぜ水に含まれる不純物等はセメントの凝結・硬化や強度発現に影響するため、所定の水質を確保する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q23",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 23,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鋼材",
    "topicTags": [
      "鋼材"
    ],
    "difficulty": 3,
    "question": "鋼材に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "長さ10mの棒材は、常温においては、鋼材の温度が10°C上がると長さが約1mm伸びる。",
      "イ": "鋼材の熱伝導率は、ステンレス鋼よりも大きい。",
      "ウ": "軟鋼は、炭素含有量が多くなると硬質になり、引張強さが大きくなる。",
      "エ": "鋼材の比重は、アルミニウム材の比重の約3倍である。",
      "オ": "異形棒鋼SD345の引張強さの下限値は、345N/mm²である。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。SD345の345は降伏点又は耐力の下限値に対応し、引張強さの下限値ではない。引張強さの下限値は490 N/mm²である。",
    "choiceExplanations": {
      "ア": "適当。鋼材の線膨張係数は常温でおよそ1.2×10⁻⁵/℃。10 m×10 ℃で約1.2 mm伸びるため、約1 mmという記述は妥当。",
      "イ": "適当。一般的な炭素鋼の熱伝導率はステンレス鋼より大きい。ステンレス鋼のほうが熱を伝えにくい。",
      "ウ": "適当。一般に炭素量が多くなると軟鋼は硬くなり、引張強さは大きくなる一方、延性や溶接性には不利となる。",
      "エ": "適当。鋼材の比重はおよそ7.85、アルミニウムはおよそ2.7で、鋼材はアルミニウムの約3倍の密度である。",
      "オ": "不適当。SD345の引張強さの下限は490 N/mm²。345 N/mm²は降伏点又は耐力の下限値であり、引張強さと取り違えている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "officialReferenceUrls": [
      "https://www.shimizusteel.co.jp/products/products_toma08.html"
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q24",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 24,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "ガラス",
    "topicTags": [
      "ガラス"
    ],
    "difficulty": 3,
    "question": "ガラスに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "フロート板ガラスは、平面精度が高く、透明性と採光性に優れている。",
      "イ": "合わせガラスは、2枚の板ガラスを透明で強靱な中間膜で張り合わせたガラスであり、割れても破片の飛散を防ぐことができる。",
      "ウ": "複層ガラスは、複数枚の板ガラスを一定の間隔に保ち、中空層に乾燥空気等を封入したものであり、断熱性が高く、結露防止に有効である。",
      "エ": "熱線吸収板ガラスは、ガラスの片面又は両面に金属酸化膜をコーティングしたガラスであり、太陽光線を反射して冷房負荷を軽減する。",
      "オ": "強化ガラスは、同じ厚さのフロート板ガラスより強度が高く、割れても破片が粒状になるので、安全性が高い。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。金属酸化膜等のコーティングで日射を反射するのは熱線反射ガラス。熱線吸収板ガラスはガラス素地に金属成分等を加え、日射を吸収する性質を与えたもの。",
    "choiceExplanations": {
      "ア": "適当。フロート法では溶融ガラスを溶融金属上に浮かべて成形し、平滑で平面精度の高い板ガラスが得られる。",
      "イ": "適当。合わせガラスは板ガラスを中間膜で接着したもので、割れた際にも破片が膜に保持され、飛散・脱落を抑える。",
      "ウ": "適当。複層ガラスは乾燥空気等を封入した中空層で熱移動を抑え、断熱性を高め、室内側表面の結露を起こしにくくする。",
      "エ": "不適当。記述は熱線反射ガラスの説明。熱線吸収板ガラスは素地に含む金属成分等によって日射を吸収するもので、表面膜による反射とは原理が異なる。",
      "オ": "適当。強化ガラスは表面の圧縮応力により同厚のフロート板ガラスより強く、破損時に小さな粒状片となる。ただし飛散・脱落防止には別の対策も検討する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12",
    "sourceRubies": [
      {
        "base": "靱",
        "reading": "じん"
      }
    ]
  },
  {
    "id": "kenchikushi2-2026-annual-III-q25",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 25,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "建築材料"
    ],
    "difficulty": 3,
    "question": "建築材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "複層仕上塗材(吹付タイル等)は、下塗材・主材・上塗材の3層からなる塗厚3～5mm程度のものであり、防水性に優れている。",
      "イ": "しっくいは、消石灰にすさ・のり・砂などを混ぜて水で練ったものであり、水と反応して固まる水硬性の材料である。",
      "ウ": "窯業系サイディングは、セメント質原料及び繊維質原料を板状に成形したものであり、外装材として用いられる。",
      "エ": "せっこうラスボードは、左官材の付着をよくするために、表面に多数のくぼみを付けたせっこうボードである。",
      "オ": "チタンは、耐食性や意匠性に優れており、屋根や内外壁に使用される。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。しっくいの消石灰は空気中の二酸化炭素と反応して炭酸カルシウムとなり硬化する。水との反応を主体とする水硬性ではなく、気硬性の材料である。",
    "choiceExplanations": {
      "ア": "適当。複層仕上塗材は下塗材・主材・上塗材による複層構成で、吹付タイル等に用いられる。塗厚は一般に3～5 mm程度で、防水性を備える。",
      "イ": "不適当。しっくいは消石灰を主材とする気硬性材料。空気中の二酸化炭素と反応して硬化するため、水と反応する水硬性とする説明は誤り。",
      "ウ": "適当。窯業系サイディングはセメント質と繊維質の原料等を成形した外装板で、外壁仕上げに広く使われる。",
      "エ": "適当。せっこうラスボードは表面にくぼみ等を設けて左官材が付着しやすくした、塗り下地用のせっこうボードである。",
      "オ": "適当。チタンは耐食性に優れ、表面の意匠性も活用できるため、屋根・外壁・内装などの仕上げ材に用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12"
  }
];
