import type { StagedKenchikushiQuestion } from "./types";

export const KENCHIKUSHI2_2025_III: readonly StagedKenchikushiQuestion[] = [
  {
    "id": "kenchikushi2-2025-annual-III-q1",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 1,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "断面二次モーメント",
    "topicTags": [
      "断面二次モーメント"
    ],
    "difficulty": 3,
    "question": "図のような断面におけるX軸に関する断面二次モーメントの値として、正しいものは、次のうちどれか。",
    "choices": {
      "ア": "1,038×10⁴ mm⁴",
      "イ": "1,056×10⁴ mm⁴",
      "ウ": "1,440×10⁴ mm⁴",
      "エ": "2,076×10⁴ mm⁴",
      "オ": "2,112×10⁴ mm⁴"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。上下対称な二つのT形断面について平行軸の定理を用いる。I=2×{100×20³/12+(100×20)×50²+10×10³/12+(10×10)×35²}=1,038×10⁴ mm⁴。",
    "choiceExplanations": {
      "ア": "正解。上下の幅100・厚20の長方形の重心はX軸から50 mm、中央突起の幅10・厚10の重心は35 mm。各自重心軸回りの値にAd²を加える。",
      "イ": "不正解。1,056×10⁴ mm⁴にはならない。中央突起の重心距離は30 mmでも40 mmでもなく35 mmとして、平行軸の定理を適用する。",
      "ウ": "不正解。1,440×10⁴ mm⁴にはならない。幅100の部分がX軸まで連続する長方形ではなく、上下間に空隙のある断面である。",
      "エ": "不正解。2,076×10⁴ mm⁴は正しい値の2倍。上下の部分を既に合算した後に、さらに2倍しない。",
      "オ": "不正解。2,112×10⁴ mm⁴にはならない。各部分の面積と重心距離を用い、上下を一度ずつ数えると1,038×10⁴ mm⁴となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-III-q1.png"
    ],
    "imageAltTexts": [
      "X軸の上下に対称な断面、寸法mm。上下各幅100・厚20の長方形のX軸側中央に幅10・高さ10の突起。左右の突出幅各45。X軸から最外縁まで上下各60、突起先端まで各30。"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q2",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 2,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "梁の曲げ応力度",
    "topicTags": [
      "梁の曲げ応力度"
    ],
    "difficulty": 3,
    "question": "図のような等分布荷重を受ける単純梁に断面100mm×200mmの部材を用いた場合、その部材に生じる最大曲げ応力度として、正しいものは、次のうちどれか。ただし、部材の断面は一様とし、自重は無視するものとする。",
    "choices": {
      "ア": "3N/mm²",
      "イ": "8N/mm²",
      "ウ": "12N/mm²",
      "エ": "24N/mm²",
      "オ": "48N/mm²"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。Mmax=wL²/8=4×4,000²/8=8×10⁶ N・mm。Z=bh²/6=100×200²/6。σ=M/Z=12 N/mm²。",
    "choiceExplanations": {
      "ア": "不正解。3 N/mm²ではない。単純梁の等分布荷重による最大曲げモーメントはwL²/8で、断面係数はbh²/6を用いる。",
      "イ": "不正解。8は最大曲げモーメント8×10⁶ N・mmに対応する数値で、曲げ応力度ではない。断面係数で除す必要がある。",
      "ウ": "正解。最大曲げモーメント8×10⁶ N・mmを断面係数(100×200²/6) mm³で除すと、12 N/mm²となる。",
      "エ": "不正解。24 N/mm²は正しい値の2倍。梁の全長4,000 mmを用い、Mmax=wL²/8から計算する。",
      "オ": "不正解。48 N/mm²ではない。片持ち梁のwL²/2を使うと4倍になるが、原図は両端単純支持である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-III-q2.png"
    ],
    "imageAltTexts": [
      "長さ4,000 mmの単純梁全長に下向き等分布荷重w=4 N/mm。部材断面は幅100 mm・高さ200 mmの長方形。"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q3",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 3,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "単純梁の応力",
    "topicTags": [
      "単純梁の応力"
    ],
    "difficulty": 3,
    "question": "図のような荷重を受ける単純梁において、B点の曲げモーメントMBの大きさとA-B間のせん断力QABの大きさとの組合せとして、正しいものは、次のうちどれか。",
    "choices": {
      "ア": "M_Bの大きさ：8 kN・m、Q_ABの大きさ：2 kN",
      "イ": "M_Bの大きさ：12 kN・m、Q_ABの大きさ：1 kN",
      "ウ": "M_Bの大きさ：12 kN・m、Q_ABの大きさ：2 kN",
      "エ": "M_Bの大きさ：16 kN・m、Q_ABの大きさ：1 kN",
      "オ": "M_Bの大きさ：16 kN・m、Q_ABの大きさ：2 kN"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。右半分の等分布荷重は4 kNで作用点は左端から6 m。左支点回りのつり合いから右反力=(8×2+4×6)/8=5 kN、左反力7 kN。Q_AB=7−8=−1 kN、M_B=7×4−8×2=12 kN・m。",
    "choiceExplanations": {
      "ア": "不正解。B点の曲げモーメントは8ではなく12 kN・m。A-B間のせん断力の絶対値も2ではなく1 kNである。",
      "イ": "正解。左反力7 kN、右反力5 kNから、B点の曲げモーメントは12 kN・m、A-B間のせん断力の大きさは1 kNとなる。",
      "ウ": "不正解。B点の曲げモーメント12 kN・mは正しいが、A-B間のせん断力は7−8=−1 kNで、大きさは1 kN。",
      "エ": "不正解。A-B間のせん断力の大きさ1 kNは正しいが、B点の曲げモーメントは16ではなく12 kN・m。",
      "オ": "不正解。右半分の分布荷重4 kNも反力算定に含める。B点12 kN・m、A-B間1 kNとなり、両方の値が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-III-q3.png"
    ],
    "imageAltTexts": [
      "スパン8 mの単純梁。左から2 mのA点に下向き8 kN、左から4 mのB点から右端まで4 mに下向き等分布荷重1 kN/m。A-B間2 m。表はM_BとQ_ABの大きさの組合せ。"
    ],
    "originalContent": {
      "body": "図のような荷重を受ける単純梁において、B点の曲げモーメントMBの大きさとA-B間のせん断力QABの大きさとの組合せとして、正しいものは、次のうちどれか。",
      "tables": [
        {
          "caption": "選択肢1～5の組合せ",
          "rows": [
            [
              "M_Bの大きさ",
              "Q_ABの大きさ"
            ],
            [
              "8 kN・m",
              "2 kN"
            ],
            [
              "12 kN・m",
              "1 kN"
            ],
            [
              "12 kN・m",
              "2 kN"
            ],
            [
              "16 kN・m",
              "1 kN"
            ],
            [
              "16 kN・m",
              "2 kN"
            ]
          ]
        }
      ]
    }
  },
  {
    "id": "kenchikushi2-2025-annual-III-q4",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 4,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "静定ラーメン",
    "topicTags": [
      "静定ラーメン"
    ],
    "difficulty": 3,
    "question": "図のような荷重Pを受ける静定ラーメンにおいて、曲げモーメント図の形とせん断力の大きさの最大値との組合せとして、正しいものは、次のうちどれか。ただし、曲げモーメント図は、部材の引張側に描くものとする。",
    "choices": {
      "ア": "曲げモーメント図：A、せん断力の最大値：P/2",
      "イ": "曲げモーメント図：A、せん断力の最大値：P",
      "ウ": "曲げモーメント図：B、せん断力の最大値：P/2",
      "エ": "曲げモーメント図：C、せん断力の最大値：P/2",
      "オ": "曲げモーメント図：C、せん断力の最大値：P"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。水平反力は左柱脚でP。右柱は水平反力がなく曲げモーメントも0。左柱は荷重点まで直線増加し、その上は一定、梁は右端0まで直線変化するので図A。左柱下部のせん断力の大きさPが最大。",
    "choiceExplanations": {
      "ア": "不正解。曲げモーメント図Aは正しいが、最大せん断力はP/2ではなくP。鉛直反力の大きさP/2と混同している。",
      "イ": "正解。右柱の曲げモーメントは0、左柱上部は一定となる図A。左柱の荷重点より下で水平せん断力Pが生じ、これが最大となる。",
      "ウ": "不正解。右柱に水平せん断力・曲げモーメントは生じないため図Bではない。最大せん断力もP/2ではなくPである。",
      "エ": "不正解。左柱の荷重点より上では水平せん断力0なので曲げモーメント一定。図Cではなく図Aで、最大せん断力はP。",
      "オ": "不正解。最大せん断力Pは正しいが、図Cではない。左柱上部の一定モーメントと梁の直線的な変化を示す図Aを選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 4,
    "sourcePrintedPage": "構造 3",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-III-q4.png"
    ],
    "imageAltTexts": [
      "柱高2l・梁長2l、左柱脚ピン・右柱脚ローラーの門形ラーメン。左柱の高さlに右向きP。候補図Aは左柱下半で直線変化・上半で一定、梁で右端0まで直線変化、右柱0。Bは右柱にもモーメント、Cは左柱上半も直線変化。選択肢表は図形A/B/Cと最大せん断力P/2又はP。"
    ],
    "originalContent": {
      "body": "図のような荷重Pを受ける静定ラーメンにおいて、曲げモーメント図の形とせん断力の大きさの最大値との組合せとして、正しいものは、次のうちどれか。ただし、曲げモーメント図は、部材の引張側に描くものとする。",
      "tables": [
        {
          "caption": "選択肢1～5の組合せ",
          "rows": [
            [
              "曲げモーメント図の形",
              "せん断力の大きさの最大値"
            ],
            [
              "A",
              "P/2"
            ],
            [
              "A",
              "P"
            ],
            [
              "B",
              "P/2"
            ],
            [
              "C",
              "P/2"
            ],
            [
              "C",
              "P"
            ]
          ]
        }
      ]
    }
  },
  {
    "id": "kenchikushi2-2025-annual-III-q5",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 5,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "静定トラス",
    "topicTags": [
      "静定トラス"
    ],
    "difficulty": 3,
    "question": "図のような荷重を受ける静定トラスにおいて、部材Aに生じる軸方向力として、正しいものは、次のうちどれか。ただし、軸方向力は、引張力を「+」、圧縮力を「-」とする。なお、節点間距離は全て2mとする。",
    "choices": {
      "ア": "−3√3 kN",
      "イ": "−2√3 kN",
      "ウ": "−√3 kN",
      "エ": "+2√3 kN",
      "オ": "+3√3 kN"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。左反力は9×(6−4)/6=3 kN。左端斜材は−3/sin60°=−2√3 kN。左上節点のつり合いから右下向き斜材は+2√3 kNで、上弦材Aは−2√3 kNとなる。",
    "choiceExplanations": {
      "ア": "不正解。部材Aは圧縮だが、−3√3 kNではない。荷重点は左端から4 mで、左反力は3 kNとして節点のつり合いを解く。",
      "イ": "正解。左反力3 kNから左端斜材の軸力を求め、左上節点で水平・鉛直方向をつり合わせると、部材Aは圧縮−2√3 kNとなる。",
      "ウ": "不正解。圧縮の符号は合っているが、大きさは√3ではなく2√3 kN。左上節点では二本の斜材の水平成分を考える。",
      "エ": "不正解。大きさ2√3 kNは正しいが、部材Aは上弦の圧縮材なので符号は負。引張力を正とする設問条件に従う。",
      "オ": "不正解。部材Aは引張材ではなく圧縮材であり、値も3√3ではなく2√3 kN。反力と節点の力のつり合いから求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 5,
    "sourcePrintedPage": "構造 4",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-III-q5.png"
    ],
    "imageAltTexts": [
      "正三角形を連続するトラス、全節点間長2 m。下弦は左から0,2,4,6 m、上弦は1,3,5 m位置。左下ピン・右下ローラー。左から4 mの下弦節点に下向き9 kN。部材Aは左から1～3 mの上弦材。斜材と水平材の角60°。"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q6",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 6,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "弾性座屈",
    "topicTags": [
      "弾性座屈"
    ],
    "difficulty": 3,
    "question": "断面が一様な長柱の弾性座屈荷重に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "弾性座屈荷重は、柱の断面二次モーメントに反比例する。",
      "イ": "弾性座屈荷重は、材料のヤング係数に比例する。",
      "ウ": "弾性座屈荷重は、柱の座屈長さの2乗に反比例する。",
      "エ": "弾性座屈荷重は、柱の両端の支持条件が水平移動拘束で「両端ピンの場合」より水平移動拘束で「両端固定の場合」のほうが大きい。",
      "オ": "弾性座屈荷重は、断面に強軸と弱軸があり、かつ、両端の支持条件が同じ場合、弱軸まわりより強軸まわりのほうが大きい。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。Eulerの弾性座屈荷重はPcr=π²EI/lk²。断面二次モーメントIとヤング係数Eに比例し、座屈長さの2乗に反比例する。",
    "choiceExplanations": {
      "ア": "不適当。座屈荷重は断面二次モーメントに反比例ではなく比例する。Iが大きいほど曲げ変形しにくくなり、弾性座屈荷重も大きくなる。",
      "イ": "適当。Euler式Pcr=π²EI/lk²から、他条件が同じならヤング係数Eに比例して弾性座屈荷重が大きくなる。",
      "ウ": "適当。座屈長さlkが2倍になると座屈荷重は1/4となる。座屈長さの2乗に反比例する関係である。",
      "エ": "適当。水平移動を拘束した両端固定の柱は、両端ピンより座屈長さが小さくなり、その分だけ座屈荷重は大きくなる。",
      "オ": "適当。支持条件が同じなら座屈荷重はIに比例するため、Iが大きい強軸回りのほうが、弱軸回りより大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 5,
    "sourcePrintedPage": "構造 4"
  },
  {
    "id": "kenchikushi2-2025-annual-III-q7",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 7,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "荷重・地震力",
    "topicTags": [
      "荷重・地震力"
    ],
    "difficulty": 3,
    "question": "構造計算における荷重及び外力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "同一の室における床の単位床面積当たりの積載荷重は、一般に、「床の構造計算をする場合」より「地震力を計算する場合」のほうが小さい。",
      "イ": "地震力の計算に用いる地震層せん断力係数の建築物の高さ方向の分布を示す数値Aiは、一般に、上階になるほど大きくなる。",
      "ウ": "地震力の計算に用いる標準せん断力係数C0の値は、一般に、許容応力度計算を行う場合においては0.2以上とし、必要保有水平耐力を計算する場合においては1.0以上とする。",
      "エ": "雪下ろしを行う慣習のある地方の積雪荷重は、その地方における垂直積雪量が1mを超える場合、雪下ろしの実況に応じて垂直積雪量を1mまで減らして計算することができる。",
      "オ": "多雪区域以外の区域において、積雪荷重の計算に用いる積雪の単位荷重は、積雪量1cmごとに15N/m²以上とする。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。積雪単位荷重は積雪量1 cmにつき原則20 N/m²以上。15 N/m²では不足する。積載荷重は構造計算の目的により使い分ける。",
    "choiceExplanations": {
      "ア": "適当。地震力用の積載荷重は荷重の同時存在等を考慮した値であり、同一用途の床の構造計算用より一般に小さい。",
      "イ": "適当。Aiは高さ方向の地震層せん断力係数の分布を表す値で、一般に上階ほど大きくなり、上部の応答増幅を考慮する。",
      "ウ": "適当。標準せん断力係数C0は、通常の許容応力度計算で0.2以上、必要保有水平耐力の計算で1.0以上を用いる。",
      "エ": "適当。雪下ろしの慣習がある地方では、所定の条件により実情に応じて垂直積雪量を1 mまで減らして計算できる。",
      "オ": "不適当。積雪量1 cm当たり20 N/m²以上を用いる。15 N/m²以上では、一般の積雪単位荷重の下限を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 6,
    "sourcePrintedPage": "構造 5",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q8",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 8,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "風圧力",
    "topicTags": [
      "風圧力"
    ],
    "difficulty": 3,
    "question": "構造計算における建築物に作用する風圧力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "速度圧は、一般に、建築物の高さと軒の高さとの平均に基づいて算定する。",
      "イ": "基準風速V0は、その地方における過去の台風の記録に基づく風害の程度その他の風の性状に応じて、30～46m/sの範囲内において定められている。",
      "ウ": "平均風速の高さ方向の分布を表す係数Erは、同じ地上高さの建築物の場合、「都市化が極めて著しい区域」より「極めて平坦で障害物がない区域」のほうが小さい。",
      "エ": "開放型の建築物の内圧係数Cpiは、一般に、風向に対して風上開放の場合においては正の値とし、風向に対して風下開放の場合においては負の値とする。",
      "オ": "単位面積当たりの風圧力の絶対値は、一般に、同じ部位の場合、「屋根葺き材等に用いる風圧力」より「構造骨組に用いる風圧力」のほうが小さい。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。平坦で障害物のない地表では風が減速されにくく、同じ高さのErは粗度の大きい都市部より大きい。小さいとする3が誤り。",
    "choiceExplanations": {
      "ア": "適当。構造骨組用の速度圧は一般に建築物高さと軒高さの平均Hを用いて算定する。屋根頂部の高さだけによるものではない。",
      "イ": "適当。基準風速V0は地域の風の性状等を考慮し、30～46 m/sの範囲で指定される地域別の設計基準値である。",
      "ウ": "不適当。同じ高さなら、極めて平坦で障害物がない区域のErは、都市化が極めて著しい区域より大きくなる。大小が逆である。",
      "エ": "適当。風上開放では風が内部に流入して正の内圧、風下開放では吸引により負の内圧となるのが一般的である。",
      "オ": "適当。外装材用は局部的・瞬間的な大きな風圧変動を考慮するため、同じ部位でも構造骨組用より一般に絶対値が大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 6,
    "sourcePrintedPage": "構造 5"
  },
  {
    "id": "kenchikushi2-2025-annual-III-q9",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
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
      "ア": "地下外壁に常時作用する土圧を静止土圧として算定する場合の静止土圧係数は、一般に、砂質土、粘性土のいずれの場合であっても0.5とする。",
      "イ": "標準貫入試験は、試験用サンプラーを300mm打ち込むのに要する打撃回数(N値)を測定し、土の硬軟や締まり具合などを調査する試験である。",
      "ウ": "基礎梁に人通口や換気口を設ける場合、上部構造の大きな開口の下部となる位置をできるだけ避け、必要な補強措置をとる。",
      "エ": "基礎に直接作用する固定荷重は、一般に、基礎スラブ上部の土被り重量を考慮せずに基礎構造各部の自重から算定する。",
      "オ": "布基礎は、建築物の上部構造の支持要素(柱・壁)に沿って連続して配置した基礎である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。基礎に作用する固定荷重には基礎自重だけでなく基礎スラブ上の土被り重量も含める。土被りを無視する4が誤り。",
    "choiceExplanations": {
      "ア": "適当。通常の算定では、地下外壁に常時作用する静止土圧の静止土圧係数を砂質土・粘性土とも一般に0.5として扱う。",
      "イ": "適当。標準貫入試験のN値は、所定の打撃でサンプラーを300 mm貫入させるのに要する打撃回数で、地盤の硬軟等の指標となる。",
      "ウ": "適当。上部に大きな開口がある部分は基礎梁が重要な応力伝達を担うため、人通口等をできるだけ避け、必要な補強を行う。",
      "エ": "不適当。基礎スラブ上の土の重量も基礎に作用する固定荷重。基礎各部の自重だけで算定すると荷重を過小評価する。",
      "オ": "適当。布基礎は壁や柱列に沿って連続する帯状の基礎。独立基礎や全面を覆うべた基礎とは形態が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6"
  },
  {
    "id": "kenchikushi2-2025-annual-III-q10",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 10,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木造用語",
    "topicTags": [
      "木造用語"
    ],
    "difficulty": 3,
    "question": "木造建築物の用語とその説明との組合せとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "雨押え ― 下屋と外壁の立上りの取合い、開口部の上枠、屋根面からの突出部分の取合いなどにおいて、雨水の浸入を防ぐための部材",
      "イ": "折置組 ― 側柱の頂部に小屋梁をのせ、その上に軒桁を取り付けて組む形式",
      "ウ": "鼻母屋 ― 母屋のうち軒の上にあるもの",
      "エ": "木割り ― 木造建築物の部材の大きさの比例関係を定めたルール",
      "オ": "側桁 ― 階段の踏板を下側から支えるために、上端を段形に加工し、上下の階に架け渡す部材"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。上端を段形に加工し踏板を下から支えるのはささら桁。側桁は踏板の側面に設け、踏板を取り付けて支持する。",
    "choiceExplanations": {
      "ア": "適当。雨押えは下屋と壁、開口上部、屋根突出部等の取合いで雨水の浸入を防ぐための部材である。",
      "イ": "適当。折置組は柱上に小屋梁を載せ、その上に軒桁を組む形式。柱上に軒桁を載せる京呂組と区別する。",
      "ウ": "適当。鼻母屋は軒の上にある母屋をいう。屋根下地を支持する母屋の位置を表す用語である。",
      "エ": "適当。木割りは建物各部や部材寸法の比例関係を定めるルールで、伝統的な木造建築の寸法計画に用いる。",
      "オ": "不適当。記述はささら桁の説明。側桁は階段の側面で踏板を取り付けて支持する部材で、上端を段形に加工して下から支えるものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
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
    "id": "kenchikushi2-2025-annual-III-q11",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 11,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木質構造設計",
    "topicTags": [
      "木質構造設計"
    ],
    "difficulty": 3,
    "question": "木質構造の構造設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "存在壁量は、耐力壁のほか、所定の仕様を満たす準耐力壁及び垂れ壁・腰壁を加えて求めることができる。",
      "イ": "横架材の相互間の垂直距離に対する柱の小径の割合は、一般に、「当該階が負担する単位面積当たりの固定荷重と積載荷重の和」や「横架材の相互間の垂直距離」に基づいて算定する。",
      "ウ": "曲げ材は、一般に、材幅に比べて材せいが大きいほど、横座屈が生じにくい。",
      "エ": "水平荷重を耐力壁や軸組に確実に伝達するためには、耐力壁を釣合いよく配置するとともに、水平構面の剛性をできるだけ高くする。",
      "オ": "燃えしろ設計では、柱や梁の燃えしろを除いた有効断面を用いて許容応力度計算を行う。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。材幅に対して材せいが大きい細長い曲げ材ほど、横方向への変形・ねじれを伴う横座屈を生じやすい。改正後の壁量・柱小径の基準にも注意する。",
    "choiceExplanations": {
      "ア": "適当。改正後は所定の仕様を満たす準耐力壁、垂れ壁・腰壁等の耐震性への寄与を存在壁量に算入できる。無条件に全壁を算入するものではない。",
      "イ": "適当。柱小径は負担する単位面積当たりの固定・積載荷重や横架材間の垂直距離等を反映して算定する基準となっている。",
      "ウ": "不適当。材幅に比べて材せいが大きい材は横方向の安定性が低下し、一般に横座屈を生じやすい。生じにくいという大小関係が逆。",
      "エ": "適当。耐力壁の釣合いよい配置と十分な水平構面剛性によって、地震・風の水平力を各耐力要素へ確実に伝達する。",
      "オ": "適当。燃えしろ設計では火災時の炭化等を見込む部分を除き、残る有効断面について許容応力度計算で安全性を確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001845916.pdf",
      "https://www.mlit.go.jp/common/001855615.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q12",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 12,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木質接合",
    "topicTags": [
      "木質接合"
    ],
    "difficulty": 3,
    "question": "木質構造の接合に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "接合耐力は、一般に、木材の比重に影響されない。",
      "イ": "釘接合において、木材と木材の一面せん断接合とする場合、側材厚は釘径の6倍以上とし、有効主材厚は釘径の9倍以上とする。",
      "ウ": "ドリフトピン接合において、気乾状態で使用する前提であっても、施工時の木材の含水率が20%以上の場合、接合部の設計用許容耐力を低減する。",
      "エ": "水平力を負担する筋かいの緊結方法において、端部の一方を柱と横架材との仕口、もう一方を柱等に緊結することができる。",
      "オ": "継手は、できるだけ応力の小さい位置に設ける。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。木材の比重は釘・ボルト等の接合耐力に影響する。比重に影響されないとする1が誤り。施工時の含水率や継手の配置にも注意する。",
    "choiceExplanations": {
      "ア": "不適当。接合耐力は木材の比重によって変わる。木材のめり込みや支圧などが関係するため、材種・比重を無視できない。",
      "イ": "適当。木材同士の一面せん断の釘接合では、側材厚6d以上、有効主材厚9d以上を確保する。dは釘径を表す。",
      "ウ": "適当。施工時に含水率20%以上の場合は、後に気乾状態で使用しても乾燥収縮等の影響があるため、設計用許容耐力を低減する。",
      "エ": "適当。改正された所定の緊結方法では、一方を柱・横架材の仕口、他方を柱等へ緊結することができる。接合仕様への適合は必要。",
      "オ": "適当。継手はできるだけ応力の小さい位置に配置し、継手部分への大きな力の集中や断面欠損の影響を抑える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001845916.pdf",
      "https://www.mlit.go.jp/common/001855615.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q13",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 13,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "壁式RC造",
    "topicTags": [
      "壁式RC造"
    ],
    "difficulty": 3,
    "question": "壁式鉄筋コンクリート造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "階高3mの平家建ての建築物の耐力壁の厚さを120mmとした。",
      "イ": "壁梁のせいを一般部は450mmとし、その他の壁梁は最小300mmとした。",
      "ウ": "基礎梁にプレキャスト鉄筋コンクリート部材を使用したので、部材相互を緊結し基礎梁の一体性を確保する計画とした。",
      "エ": "基礎の根入れ深さは、地盤への水平力の伝達も考慮し、軒高の10%程度確保する計画とした。",
      "オ": "2階建ての建築物の耐力壁の配筋を構造計算によって構造耐力上安全であると確認したので、縦筋及び横筋の鉄筋比を0.2%とした。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。壁梁せいは原則450 mm以上とする。構造安全性を別途検証する条件もなく、その他の壁梁を300 mmまで小さくする2は不適当。",
    "choiceExplanations": {
      "ア": "適当。階高3 mの平家では、所定の壁厚と階高に対する厚さの条件を満たす耐力壁厚120 mmとすることができる。",
      "イ": "不適当。壁梁せいは原則450 mm以上が必要であり、その他の壁梁を一律に最小300 mmとしてよいという扱いにはならない。",
      "ウ": "適当。プレキャスト部材を基礎梁に用いる場合も、接合部を緊結して梁全体として一体性を確保する必要がある。",
      "エ": "適当。鉛直支持だけでなく水平力を地盤へ伝えるため、基礎根入れを軒高の10%程度確保する計画は妥当である。",
      "オ": "適当。構造計算で安全性を確認した2階建てでは、所定の規定により縦横の壁筋比を0.2%とすることができる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "officialReferenceUrls": [
      "https://www.jstage.jst.go.jp/article/coj/54/7/54_681/_pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q14",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 14,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "RC構造",
    "topicTags": [
      "RC構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "溶接した閉鎖形帯筋を、柱の主筋を包含するように配置したり、副帯筋を使用したりすることは、柱の靱性の確保に有効である。",
      "イ": "部材の曲げモーメントに対する断面算定においては、一般に、コンクリートの引張応力度を考慮しない。",
      "ウ": "床スラブは、梁と一体となり建築物の水平面を構成する役割をもち、地震力などの水平力を柱や耐震壁に伝える働きがある。",
      "エ": "袖壁付き柱のせん断補強筋比は、原則として、0.3%以上とする。",
      "オ": "梁の引張鉄筋比が、釣合鉄筋比より高い場合、梁の許容曲げモーメントは、引張鉄筋の断面積にほぼ比例する。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。釣合鉄筋比を超える梁では、コンクリート圧縮側が断面性能を支配し、引張鉄筋を増やしても許容曲げモーメントが断面積にほぼ比例するとはいえない。",
    "choiceExplanations": {
      "ア": "適当。溶接閉鎖形帯筋や副帯筋はコンクリートと主筋を拘束し、柱のせん断抵抗や靱性を確保するのに有効である。",
      "イ": "適当。通常のRCの曲げ断面算定では、ひび割れ後のコンクリート引張抵抗を無視して引張力を鉄筋に負担させる。",
      "ウ": "適当。床スラブは梁等と水平構面を構成し、地震力等を柱・耐震壁に伝えるダイアフラムとして働く。",
      "エ": "適当。袖壁付き柱のせん断補強筋比は、原則0.3%以上とする。通常の柱の最小値と混同しない。",
      "オ": "不適当。釣合鉄筋比より高い領域ではコンクリート圧縮側の制限が影響するため、許容曲げモーメントは引張鉄筋面積にほぼ比例しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "sourceRubies": [
      {
        "base": "靱",
        "reading": "じん"
      }
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q15",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 15,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "RC配筋",
    "topicTags": [
      "RC配筋"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造における配筋等に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "四辺固定された床スラブに必要な単位幅当たりの鉄筋量は、一般に、短辺方向に比べて長辺方向が多くなる。",
      "イ": "径が同じ柱主筋の相互のあきは、「25mm」、「異形鉄筋の径(呼び名の数値)の1.5倍」及び「粗骨材最大寸法の1.25倍」のうち最も大きい数値以上とする。",
      "ウ": "引張応力を受ける鉄筋の直線定着長さは、原則として、300mm以上とする。",
      "エ": "フック付き重ね継手の長さは、鉄筋相互の折曲げ開始点間の距離とする。",
      "オ": "梁の圧縮鉄筋は、一般に、長期荷重によるクリープたわみの抑制及び地震時における靱性の確保に有効であるので、全スパンにわたって複筋梁とする。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。四辺固定スラブでは一般に短辺方向が主な荷重伝達方向で、単位幅当たりの必要鉄筋量も長辺方向より多い。",
    "choiceExplanations": {
      "ア": "不適当。一般には短辺方向により大きな曲げモーメントが生じるため、必要鉄筋量は長辺方向より短辺方向が多い。",
      "イ": "適当。主筋のあきは25 mm、1.5d、粗骨材最大寸法の1.25倍の最大値以上として、コンクリートの充填性等を確保する。",
      "ウ": "適当。引張鉄筋の直線定着長さは算定値に加え、原則300 mm以上という下限にも適合させる必要がある。",
      "エ": "適当。フック付き重ね継手は、鉄筋相互の折曲げ開始点間の距離で継手長さを測り、フック部分を重ね長さに加算しない。",
      "オ": "適当。梁の圧縮鉄筋はクリープたわみを抑え、地震時の繰返し曲げや靱性にも有効なため、全スパンで複筋とする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "sourceRubies": [
      {
        "base": "靱",
        "reading": "じん"
      }
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q16",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
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
      "ア": "圧縮力を負担する柱の有効細長比は、200以下とする。",
      "イ": "座屈を拘束するための補剛材には、十分な剛性と強度が必要である。",
      "ウ": "H形鋼の梁においては、せん断力の大部分をフランジで負担する。",
      "エ": "鉄骨部材は、平板要素の幅厚比や鋼管の径厚比が小さいものほど、局部座屈が生じにくい。",
      "オ": "母屋において、長期に作用する荷重に対するたわみは、仕上げ材に支障を与えない範囲で、スパンの1/300を超えることができる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。H形鋼梁のせん断力は主にウェブが負担し、曲げモーメントは主にフランジが負担する。3は役割が逆である。",
    "choiceExplanations": {
      "ア": "適当。圧縮柱の有効細長比は200以下とする。圧縮材の座屈に対する安定性を確保するための制限である。",
      "イ": "適当。座屈補剛には変形を拘束する剛性と、補剛力に耐える強度の両方が必要。片方だけを確保しても十分ではない。",
      "ウ": "不適当。H形鋼の梁でせん断力の大部分を負担するのはウェブ。フランジは主として曲げに伴う軸方向の引張・圧縮を負担する。",
      "エ": "適当。幅厚比や径厚比が小さいほど板厚が相対的に厚く、一般に局部座屈が生じにくい断面となる。",
      "オ": "適当。母屋では仕上げ材等に支障がない範囲で、長期荷重によるたわみの通常の目安であるスパン1/300を超えることが許容される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "sourceRubies": [
      {
        "base": "母屋",
        "reading": "もや"
      }
    ],
    "officialReferenceUrls": [
      "https://aij-static-bucket.s3-ap-northeast-1.amazonaws.com/da1/shiyoukijyun/pdf/J7004246_01.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q17",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
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
      "ア": "溶接接合において、隅肉溶接のサイズは、一般に、厚いほうの母材厚さ以上の値とする。",
      "イ": "構造用鋼材の高力ボルト摩擦接合の表面処理方法として、浮き錆を取り除いた赤錆面とした場合、接合面のすべり係数の値は0.45とする。",
      "ウ": "一つの継手に突合せ溶接と隅肉溶接を併用する場合、それぞれの応力は、各溶接継目の許容耐力に応じて分担させることができる。",
      "エ": "隅肉溶接における溶接継目ののど断面に対する許容引張応力度は、突合せ溶接による溶接継目の許容引張応力度の1/√3倍である。",
      "オ": "完全溶込み溶接を鋼材の両側から行う場合において、先に溶接した面の裏側から溶接部分の第1層を削り落とすことを、裏はつりという。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。隅肉溶接のサイズは原則として薄いほうの母材厚以下とする。厚い母材厚以上とする1は不適当。のど断面の許容応力度とサイズを区別する。",
    "choiceExplanations": {
      "ア": "不適当。サイズは一般に薄いほうの母材厚以下とする。厚いほうの母材厚以上に一律設定するのではなく、必要耐力と母材厚等で決める。",
      "イ": "適当。浮き錆を除去した所定の赤錆面では、高力ボルト摩擦接合面のすべり係数を0.45として扱うことができる。",
      "ウ": "適当。突合せ溶接と隅肉溶接を一つの継手に併用する場合、各溶接継目の許容耐力に応じて応力を分担させることができる。",
      "エ": "適当。隅肉溶接はのど断面でせん断相当の許容値を用い、突合せ溶接の許容引張応力度の1/√3倍となる。",
      "オ": "適当。裏はつりは、両面から完全溶込み溶接する際に、先行溶接の裏側から初層部分等を削り取って健全な溶込みを確保する作業。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "sourceRubies": [
      {
        "base": "錆",
        "reading": "さび"
      }
    ],
    "officialReferenceUrls": [
      "https://aij-static-bucket.s3-ap-northeast-1.amazonaws.com/da1/shiyoukijyun/pdf/J7017635_03.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q18",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 18,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "構造計画",
    "topicTags": [
      "構造計画"
    ],
    "difficulty": 3,
    "question": "建築物の構造計画等に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄骨造の露出型柱脚の設計において、固定度があることからピンと仮定せずに、回転剛性を適切に評価して、柱脚に生じる力を計算した。",
      "イ": "鉄筋コンクリート造の建築物において、袖壁と腰壁については非耐力壁として考え、偏心率を計算する際に影響はないものとした。",
      "ウ": "屋根勾配が大きな山型架構の建築物において、設計用一次固有周期を計算する際の高さは、当該建築物の振動性状を十分に考慮し、屋根の高さの平均とした。",
      "エ": "高さが7m、水平投影面積が230m²、天井面構成部材等の単位面積質量が3kg/m²の吊り天井について、人が日常立ち入る場所に設置するために、特定天井の規定に従った構造方法とした。",
      "オ": "瓦屋根の構造方法において、建設地の基準風速が38m/sであるので、平部においては、隣接する瓦と構造耐力上有効に組み合わせることができるフックが付いた桟瓦を採用し、各桟瓦を釘で下地に緊結する方法とした。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。袖壁・腰壁は非耐力壁として計画しても架構の剛性や偏心へ影響する。偏心率の計算から一律に除外する2は不適当。",
    "choiceExplanations": {
      "ア": "適当。露出型柱脚には回転抵抗があるため、実状に応じた回転剛性を評価して柱脚の応力を算定する。",
      "イ": "不適当。RCの袖壁・腰壁も柱等の剛性に影響し、偏心率を変化させる。非耐力壁という名称だけで影響なしとしてよいわけではない。",
      "ウ": "適当。勾配の大きい山型架構では振動性状を考慮し、屋根高さの平均を用いて設計用一次固有周期を求めることができる。",
      "エ": "適当。高さ6 m超、面積200 m²超、質量2 kg/m²超の条件を全て満たすので、人が日常立ち入る場所の特定天井として扱う。",
      "オ": "適当。基準風速38 m/sの条件では、隣接瓦と有効に組み合うフック付き桟瓦を用い、各瓦を釘で下地へ緊結する方法が認められる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9",
    "sourceRubies": [
      {
        "base": "吊",
        "reading": "つ"
      }
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q19",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
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
      "ア": "耐震設計の一次設計では、建築物が存在期間中に数回程度遭遇する可能性の高い地震動に対して、小さなひび割れ等は許容するが、修復をせずに続けて使えるような耐震性があることを確認する。",
      "イ": "建築物の固有周期は、構造物としての剛性が同じであれば、質量が小さいほど短くなる。",
      "ウ": "各階における層間変形角の値は、一次設計用地震力に対し、原則として、1/200以内となるようにするが、帳壁、内・外装材、設備等に著しい損傷が生じるおそれがないことが確認された場合には、1/100以内まで緩和することができる。",
      "エ": "建築物の各階の剛性率は、「当該階の層間変形角の逆数」を「全ての階の層間変形角の逆数の相加平均の値」で除した値であり、その値が小さいほど、その階に損傷が集中する危険性が高い。",
      "オ": "建築物の各階の偏心率は、「当該階の重心と剛心との距離(偏心距離)」を「当該階の弾力半径」で除した値であり、その値が大きいほど、その階において特定の部材に損傷が集中する危険性が高い。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。層間変形角は原則1/200以内。帳壁等に著しい損傷のおそれがない場合でも緩和は1/120以内であり、1/100ではない。",
    "choiceExplanations": {
      "ア": "適当。一次設計は、供用中に数回程度想定される中地震で、軽微なひび割れ等にとどめ、継続使用できる性能を確認する。",
      "イ": "適当。固有周期は概ねT=2π√(m/k)。剛性kが同じなら質量mが小さいほど周期は短くなる。",
      "ウ": "不適当。損傷のおそれがないことによる層間変形角制限の緩和は1/120以内。1/100以内まで緩和するという記述が誤り。",
      "エ": "適当。剛性率は各階の層間変形角の逆数を全階平均で除した値。小さい階へ変形・損傷が集中しやすい。",
      "オ": "適当。偏心率は重心と剛心の距離を弾力半径で除した値。大きいほどねじれ応答により特定部材の損傷が大きくなりやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q20",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 20,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木材",
    "topicTags": [
      "木材"
    ],
    "difficulty": 3,
    "question": "建築材料として使用される木材及び木質材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "構造用集成材は、曲げヤング係数によって等級区分されたラミナをその繊維方向を互いに平行にして積層接着したものである。",
      "イ": "辺材は、一般に、心材に比べてシロアリなどの食害を受けやすい。",
      "ウ": "板目材は、乾燥すると、木裏側に凸に変形する。",
      "エ": "木材の基準強度の大小関係は、一般に、圧縮>曲げ>せん断である。",
      "オ": "木材を大気中で乾燥させ、蒸発が進行して自由水が完全に失われ、結合水のみとなったときの状態を、繊維飽和点という。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。木材の一般的な基準強度の順は曲げ＞圧縮＞せん断。圧縮と曲げを逆に並べた4が誤り。",
    "choiceExplanations": {
      "ア": "適当。構造用集成材はラミナの繊維方向を平行にそろえて積層接着する。直交させる合板やCLTとは構成が異なる。",
      "イ": "適当。辺材は一般に心材より腐朽やシロアリ等の食害を受けやすく、防腐・防蟻上の配慮が必要となる。",
      "ウ": "適当。板目板は乾燥収縮の方向差によって反り、一般に木裏側が凸、木表側が凹となる。",
      "エ": "不適当。一般的な大小関係は曲げ＞圧縮＞せん断であり、圧縮＞曲げという順序が逆である。",
      "オ": "適当。自由水がなくなり細胞壁内の結合水だけが残った状態が繊維飽和点。この点以下では乾燥に伴う収縮が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10"
  },
  {
    "id": "kenchikushi2-2025-annual-III-q21",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
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
      "ア": "引張強度は、一般に、圧縮強度の1/10程度である。",
      "イ": "長期許容圧縮応力度は、設計基準強度に2/3を乗じた値である。",
      "ウ": "一般に、スランプを大きくすると、コンクリートの材料分離が生じやすくなる。",
      "エ": "コンクリートの乾燥収縮は、一般に、乾燥開始材齢が遅いほど小さくなる。",
      "オ": "一般に、コンクリートの養生期間中の温度が高いほど、初期材齢の強度発現は促進されるが、長期材齢の強度増進は小さくなる。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。長期許容圧縮応力度はFc/3、短期はその2倍の2Fc/3。2は短期の値と取り違えている。",
    "choiceExplanations": {
      "ア": "適当。コンクリートの引張強度は圧縮強度よりかなり小さく、一般的な目安は圧縮強度の約1/10である。",
      "イ": "不適当。長期許容圧縮応力度は設計基準強度Fcの1/3。2/3は短期許容圧縮応力度であり、長期・短期の取り違えである。",
      "ウ": "適当。一般にスランプが大きく流動性が高いコンクリートは、材料分離を起こしやすいため、調合や施工管理に配慮する。",
      "エ": "適当。乾燥開始が遅いほど水和が進み組織が形成されるため、その後の乾燥収縮は一般に小さくなる。",
      "オ": "適当。高温養生は初期強度を早く発現させる一方、長期的な強度の伸びは一般に小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q22",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 22,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "セメント",
    "topicTags": [
      "セメント"
    ],
    "difficulty": 3,
    "question": "A～Cのセメントを用いた一般的なコンクリートの初期強度(材齢7日程度までの硬化初期の過程における圧縮強度)の大小関係として、正しいものは、次のうちどれか。ただし、呼び強度等の条件は同一とする。A:中庸熱ポルトランドセメントB:普通ポルトランドセメントC:早強ポルトランドセメント",
    "choices": {
      "ア": "A>B>C",
      "イ": "B>A>C",
      "ウ": "B>C>A",
      "エ": "C>A>B",
      "オ": "C>B>A"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。材齢7日程度までの初期強度は、早強ポルトランドC＞普通ポルトランドB＞中庸熱ポルトランドAの順。中庸熱は初期発熱・強度の進行を抑える性質を持つ。",
    "choiceExplanations": {
      "ア": "不正解。中庸熱Aが最大、早強Cが最小という順序は逆。初期強度は早強Cが最も大きい。",
      "イ": "不正解。普通Bより早強Cが高い初期強度を発現する。中庸熱Aは初期強度の発現が遅い。",
      "ウ": "不正解。普通Bと早強Cの順位が逆。早強C＞普通B＞中庸熱Aの順となる。",
      "エ": "不正解。早強Cが最大なのは正しいが、中庸熱Aと普通Bの順位が逆。初期強度は普通Bのほうが大きい。",
      "オ": "正解。早強Cは初期強度発現が速く、普通B、中庸熱Aの順となる。同じ呼び強度等の条件で比較する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10"
  },
  {
    "id": "kenchikushi2-2025-annual-III-q23",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 23,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鋼材応力ひずみ",
    "topicTags": [
      "鋼材応力ひずみ"
    ],
    "difficulty": 3,
    "question": "鋼材の引張試験から得られる図のような引張応力度-ひずみ度曲線に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "0から1までのひずみ度に対する応力度の割合をヤング係数と呼ぶ。",
      "イ": "1は比例限度であり、0から1までは応力度-ひずみ度関係は直線的に変化する。",
      "ウ": "2は弾性限度であり、2までは荷重を零に戻すと、鋼材は元の形に戻る。",
      "エ": "3は下降伏点と呼ぶ。",
      "オ": "4は最大荷重点であり、その時の応力度を引張強さと呼ぶ。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。図の③は最初の降伏ピークで上降伏点。その後の低いほぼ水平な部分が下降伏域となる。③を下降伏点とした4が誤り。",
    "choiceExplanations": {
      "ア": "適当。比例域では応力度σとひずみ度εの比σ/εがヤング係数Eであり、曲線の原点付近の傾きを表す。",
      "イ": "適当。①は比例限度で、原点から①までは応力度とひずみ度が比例し、図では直線となっている。",
      "ウ": "適当。②は弾性限度で、この点までなら除荷すると永久ひずみを残さず元の形へ戻る。比例限度とは区別する。",
      "エ": "不適当。③は上降伏点。応力度が一旦低下した後の下降伏点と区別する必要がある。",
      "オ": "適当。④は最大荷重に対応する点で、その公称応力度を引張強さと呼ぶ。その後はくびれが進み破断に至る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-III-q23.png"
    ],
    "imageAltTexts": [
      "鋼材の公称応力度-ひずみ度曲線。原点⓪から直線域の終端①、弾性限度②、最初の降伏ピーク③、その後低下・ほぼ水平域、ひずみ硬化で最大④、その後低下し破断点。"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-III-q24",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 24,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "建築材料"
    ],
    "difficulty": 3,
    "question": "建築材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鋼材は、イオン化傾向の小さい銅板などの金属材料に接すると腐食しやすい。",
      "イ": "住宅屋根用化粧スレートは、「セメント」、「けい酸質原料」、「石綿以外の繊維質原料」などを主原料として加圧成形したものである。",
      "ウ": "網入り板ガラスは、板ガラスの中に金網を封入したガラスであり、同程度の厚さのフロート板ガラスに比べて強度が低い。",
      "エ": "せっこうボードは、火災時にはせっこうに含まれる結晶水が分解されるまでの間、温度上昇を防ぐので、耐火性に優れている。",
      "オ": "ALCパネルは、気泡コンクリートを用いた軽量なものであり、防水性に優れている。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。ALCは多孔質で吸水しやすく、防水性に優れる材料ではない。外壁として用いるときは塗装等の防水・保護仕上げを必要とする。",
    "choiceExplanations": {
      "ア": "適当。鋼材が銅などより貴な金属と接し、水分等があると異種金属接触腐食によって鋼材側の腐食が促進される。",
      "イ": "適当。住宅屋根用化粧スレートは、セメントやけい酸質原料、石綿以外の繊維等を主原料として加圧成形する。",
      "ウ": "適当。網入りガラスは防火時の破片脱落防止等を目的とするもので、同程度の厚さのフロート板ガラスより一般に強度が低い。",
      "エ": "適当。せっこうの結晶水が火災熱を受けて脱水する際に熱を吸収し、温度上昇を抑えるため、せっこうボードは耐火性に優れる。",
      "オ": "不適当。ALCは気泡を多く含んで軽量だが吸水しやすい。防水性に優れるとはいえず、表面の防水仕上げ等が必要。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12"
  },
  {
    "id": "kenchikushi2-2025-annual-III-q25",
    "exam": "kenchikushi2",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 25,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "仕上げ・断熱材料",
    "topicTags": [
      "仕上げ・断熱材料"
    ],
    "difficulty": 3,
    "question": "建築材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "テラコッタは、大型のタイルの一種であり、装飾用の外装材として用いられる。",
      "イ": "パーティクルボードは、木材の小片と接着剤とを混合して加熱圧縮成形したものである。",
      "ウ": "顔料系ステインは、染料系ステインよりも耐候性に優れている。",
      "エ": "発泡プラスチック系断熱材は、樹脂の中に微細な独立空気泡を閉じ込めることによって断熱効果を発揮するものであるが、一般に、繊維系断熱材と比べて断熱性に劣っている。",
      "オ": "外壁等に使用する薄付け仕上塗材(リシン等)は、塗厚を1～3mm程度の単層で仕上げるものであり、防水性に劣っている。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。発泡プラスチック系断熱材は微細な気泡により熱移動を抑え、一般に優れた断熱性を持つ。繊維系より一律に劣るとする4は誤り。",
    "choiceExplanations": {
      "ア": "適当。テラコッタは大型の焼成した装飾用陶製部材で、外装の装飾などに用いられる大型タイルの一種である。",
      "イ": "適当。パーティクルボードは木材小片と接着剤を混合し、加熱圧縮して板状に成形した木質材料である。",
      "ウ": "適当。顔料系ステインは染料系に比べて紫外線等による劣化に強く、一般に耐候性に優れている。",
      "エ": "不適当。独立気泡等によって熱移動を抑えるため、発泡プラスチック系は一般に高い断熱性能を持つ。繊維系より劣るとする説明が誤り。",
      "オ": "適当。薄付け仕上塗材はおよそ1～3 mmの単層仕上げで、複層仕上塗材等と比べると防水性に劣る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12"
  }
];
