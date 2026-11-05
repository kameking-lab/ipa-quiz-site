import type { Kenchikushi1StagedQuestion } from "./types";

export const KENCHIKUSHI1_2026_KOZO: Kenchikushi1StagedQuestion[] = [
  {
    "id": "kenchikushi1-2026-annual-kozo-q1",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 1,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のように高さが等しい矩形断面と円形断面がある。同じ大きさの曲げモーメントが作用するとき、図に示す垂直応力度分布となり、最大・最小垂直応力度±σが２つの断面で等しくなった。このとき、矩形断面と円形断面の断面積をそれぞれA_R、A_Cとすると、それらの比として、正しいものは、次のうちどれか。ただし、矩形断面と円形断面の断面二次モーメントはそれぞれbh³/12、πh⁴/64である。",
    "choices": {
      "ア": "9：16",
      "イ": "3：4",
      "ウ": "5：6",
      "エ": "1：1"
    },
    "originalContent": {
      "body": "図のように高さが等しい矩形断面と円形断面がある。同じ大きさの曲げモーメントが作用するとき、図に示す垂直応力度分布となり、最大・最小垂直応力度±σが２つの断面で等しくなった。このとき、矩形断面と円形断面の断面積をそれぞれA_R、A_Cとすると、それらの比として、正しいものは、次のうちどれか。ただし、矩形断面と円形断面の断面二次モーメントはそれぞれbh³/12、πh⁴/64である。",
      "choices": {
        "ア": "9：16",
        "イ": "3：4",
        "ウ": "5：6",
        "エ": "1：1"
      },
      "tables": [
        {
          "caption": "A_R：A_C（原表）",
          "rows": [
            [
              "A_R",
              "A_C"
            ],
            [
              "9",
              "16"
            ],
            [
              "3",
              "4"
            ],
            [
              "5",
              "6"
            ],
            [
              "1",
              "1"
            ]
          ]
        }
      ]
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。適当。bh³/12=πh⁴/64からb=3πh/16。AR=bh、AC=πh²/4なのでAR/AC=3/4となる。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。両断面でMと最大応力度と高さが等しいので断面二次モーメントが等しい。面積比は9:16ではなく3:4となる。",
      "イ": "適当。bh³/12=πh⁴/64からb=3πh/16。AR=bh、AC=πh²/4なのでAR/AC=3/4となる。",
      "ウ": "不適当。断面積だけを直接等置せず、σ=M(h/2)/Iから断面二次モーメントを等置する。計算結果の面積比は3:4で、5:6ではない。",
      "エ": "不適当。同じ高さで同じ曲げ応力度となる条件は等しい断面積ではなく等しい断面二次モーメントである。面積は矩形のほうが小さく、比は3:4となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.1（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 2,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q1.png"
    ],
    "imageAltTexts": [
      "公式原図・原表：同じ高さhの幅bの矩形断面と直径hの円形断面、最大応力度±σ及び面積比の選択肢"
    ],
    "isCalculation": true
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q2",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 2,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような集中荷重２Pを受ける単純梁の中央点Ｂに生じるたわみδとして、正しいものは、次のうちどれか。ただし、梁は、曲げ剛性がAB間で２EI、BC間でEIの弾性部材とし、自重は無視する。",
    "choices": {
      "ア": "PL³/(2EI)",
      "イ": "PL³/(3EI)",
      "ウ": "PL³/(4EI)",
      "エ": "PL³/(5EI)"
    },
    "originalContent": {
      "body": "図のような集中荷重２Pを受ける単純梁の中央点Ｂに生じるたわみδとして、正しいものは、次のうちどれか。ただし、梁は、曲げ剛性がAB間で２EI、BC間でEIの弾性部材とし、自重は無視する。",
      "choices": {
        "ア": "PL³/(2EI)",
        "イ": "PL³/(3EI)",
        "ウ": "PL³/(4EI)",
        "エ": "PL³/(5EI)"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。適当。実荷重の支点反力は左右P、中央単位荷重の反力は1/2。左右の∫Mm/(EI)を足すとPL³/(12EI)+PL³/(6EI)=PL³/(4EI)。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。中央に単位荷重を置く仮想仕事法では、左右の曲げ剛性の違いを別々に積分する。たわみはPL³/(4EI)で、PL³/(2EI)ではない。",
      "イ": "不適当。全長2Lを一様なEIの梁と扱った値である。左半分が2EIであることによるたわみの減少を考慮する必要がある。",
      "ウ": "適当。実荷重の支点反力は左右P、中央単位荷重の反力は1/2。左右の∫Mm/(EI)を足すとPL³/(12EI)+PL³/(6EI)=PL³/(4EI)。",
      "エ": "不適当。曲げ剛性を単純平均して一様梁の式に入れる扱いはできない。区間別の仮想仕事から分母は4EIとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.2（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 3,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q2.png"
    ],
    "imageAltTexts": [
      "公式原図：両端ピン・ローラーの単純梁ABC、AB=BC=L、中央Bに下向き2P、曲げ剛性AB=2EI・BC=EI、Bのたわみδ"
    ],
    "isCalculation": true
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q3",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 3,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような水平荷重Pを受ける骨組に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "梁BC及び梁CDに生じる圧縮軸力の大きさは、2P/3である。",
      "イ": "梁BC及び梁CDに生じるせん断力の大きさは、2P/3である。",
      "ウ": "点Bと点Dの曲げモーメントの大きさはともに、PL/3である。",
      "エ": "柱ABと柱EDのせん断力の大きさQ_ABとQ_EDとの比は、Q_AB：Q_ED＝１：２である。"
    },
    "originalContent": {
      "body": "図のような水平荷重Pを受ける骨組に関する次の記述のうち、誤っているものはどれか。",
      "choices": {
        "ア": "梁BC及び梁CDに生じる圧縮軸力の大きさは、2P/3である。",
        "イ": "梁BC及び梁CDに生じるせん断力の大きさは、2P/3である。",
        "ウ": "点Bと点Dの曲げモーメントの大きさはともに、PL/3である。",
        "エ": "柱ABと柱EDのせん断力の大きさQ_ABとQ_EDとの比は、Q_AB：Q_ED＝１：２である。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。左柱の水平せん断力P/3に高さ2L、右柱の水平せん断力2P/3に高さLを乗じると、B・Dの曲げモーメントの大きさはどちらも2PL/3である。PL/3ではない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "正しい。全体の釣合いとC点の曲げモーメント零の条件から、右柱側に流れる水平力は2P/3となる。この力がBC・CDの圧縮軸力となる。",
      "イ": "正しい。全体と左右部分のモーメントの釣合いから鉛直反力の大きさは2P/3となり、梁BC・CDのせん断力も2P/3となる。",
      "ウ": "誤り。左柱の水平せん断力P/3に高さ2L、右柱の水平せん断力2P/3に高さLを乗じると、B・Dの曲げモーメントの大きさはどちらも2PL/3である。PL/3ではない。",
      "エ": "正しい。水平反力の大きさは左P/3、右2P/3で、柱のせん断力もこの値となる。したがってQAB:QED=1:2。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.3（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 4,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q3.png"
    ],
    "imageAltTexts": [
      "公式原図：A・Eで支持されCにヒンジを持つ骨組、AB=2L・DE=L・BC=CD=L、Bに右向き水平力P"
    ],
    "isCalculation": true
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q4",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 4,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図は、２層のラーメンにおいて、２階に水平荷重P₁、Ｒ階に水平荷重P₂が作用したときの柱の曲げモーメントを示したものである。次の記述のうち、誤っているものはどれか。ただし、全ての部材の自重は無視する。",
    "choices": {
      "ア": "２階に作用する水平荷重P₁は、80 kNである。",
      "イ": "２階の梁のせん断力Q_Bは、100 kNである。",
      "ウ": "１階右側の柱の軸方向圧縮力N_Cは、150 kNである。",
      "エ": "右側の支点の鉛直反力Vは、230 kNである。"
    },
    "originalContent": {
      "body": "図は、２層のラーメンにおいて、２階に水平荷重P₁、Ｒ階に水平荷重P₂が作用したときの柱の曲げモーメントを示したものである。次の記述のうち、誤っているものはどれか。ただし、全ての部材の自重は無視する。",
      "choices": {
        "ア": "２階に作用する水平荷重P₁は、80 kNである。",
        "イ": "２階の梁のせん断力Q_Bは、100 kNである。",
        "ウ": "１階右側の柱の軸方向圧縮力N_Cは、150 kNである。",
        "エ": "右側の支点の鉛直反力Vは、230 kNである。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。誤り。R階の層せん断力は2×(200+240)/4=220kN、1階層せん断力は2×(160+320)/4=240kN。差のP1は20kNで、80kNではない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "誤り。R階の層せん断力は2×(200+240)/4=220kN、1階層せん断力は2×(160+320)/4=240kN。差のP1は20kNで、80kNではない。",
      "イ": "正しい。2階の梁端モーメントは各側で柱の240と160の和400kN・m。梁せん断力は(400+400)/8=100kNとなる。",
      "ウ": "正しい。屋根梁のせん断力は(200+200)/8=50kN、2階梁は100kNなので、右側の1階柱の軸方向圧縮力は50+100=150kNとなる。",
      "エ": "正しい。各階の梁からの軸力150kNに加え、柱脚の曲げモーメントの釣合いによる鉛直反力の成分がある。右支点では150+(320+320)/8=230kNとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.4（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 5,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q4.png"
    ],
    "imageAltTexts": [
      "公式原図：二層各高さ4m、スパン8mのラーメン、柱の曲げモーメント200・240・160・320kN・m、水平力P1・P2、梁せん断QB・柱軸力NC・反力V"
    ],
    "isCalculation": true
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q5",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 5,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような荷重を受けるトラスの斜材Ａ及びＢに生じる軸方向力をそれぞれN_A及びN_Bとするとき、軸方向力の組合せとして、正しいものは、次のうちどれか。ただし、全ての部材は弾性部材とし、自重は無視する。また、軸方向力は、引張力を「＋」、圧縮力を「－」とする。",
    "choices": {
      "ア": "N_A：0 ／ N_B：＋√2P",
      "イ": "N_A：0 ／ N_B：－√2P",
      "ウ": "N_A：＋√2P ／ N_B：＋√2P",
      "エ": "N_A：＋√2P ／ N_B：－√2P"
    },
    "originalContent": {
      "body": "図のような荷重を受けるトラスの斜材Ａ及びＢに生じる軸方向力をそれぞれN_A及びN_Bとするとき、軸方向力の組合せとして、正しいものは、次のうちどれか。ただし、全ての部材は弾性部材とし、自重は無視する。また、軸方向力は、引張力を「＋」、圧縮力を「－」とする。",
      "choices": {
        "ア": "N_A：0 ／ N_B：＋√2P",
        "イ": "N_A：0 ／ N_B：－√2P",
        "ウ": "N_A：＋√2P ／ N_B：＋√2P",
        "エ": "N_A：＋√2P ／ N_B：－√2P"
      },
      "tables": [
        {
          "caption": "斜材A・Bの軸方向力（原表）",
          "rows": [
            [
              "N_A",
              "N_B"
            ],
            [
              "0",
              "＋√2P"
            ],
            [
              "0",
              "－√2P"
            ],
            [
              "＋√2P",
              "＋√2P"
            ],
            [
              "＋√2P",
              "－√2P"
            ]
          ]
        }
      ]
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。適当。全体のモーメントの釣合いから左支点の鉛直反力は0、右支点はP。左下節点・左上節点の釣合いからNA=0、右側節点からNB=+√2Pとなる。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。全体のモーメントの釣合いから左支点の鉛直反力は0、右支点はP。左下節点・左上節点の釣合いからNA=0、右側節点からNB=+√2Pとなる。",
      "イ": "不適当。Aの軸力は0だが、右斜材Bは圧縮ではなく引張となる。荷重Pと水平荷重による支点反力を両方考慮する。",
      "ウ": "不適当。左支点の鉛直反力が0で、左側節点の釣合いから斜材Aは零部材となる。NAを+√2Pとする点が異なる。",
      "エ": "不適当。Aは零部材、Bは引張材である。斜材が同じ角度でも荷重と支点条件が左右対称ではなく、同じ大きさの引張・圧縮になるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.5（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 6,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q5.png"
    ],
    "imageAltTexts": [
      "公式原図・原表：幅2L高さLのトラス、左上に右向きP・上中央に下向きP、斜材A・Bと軸力の四組"
    ],
    "isCalculation": true
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q6",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 6,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような構造物Ａ、Ｂ及びＣの水平方向の固有周期をそれぞれT_A、T_B及びT_Cとしたとき、それらの大小関係として、正しいものは、次のうちどれか。ただし、水平力P又は２Pを作用させたときの水平変位δ又は2δは、図のとおりである。なお、柱は弾性部材で伸縮はないものとし、梁は剛体とする。また、柱の質量は考慮しないものとする。",
    "choices": {
      "ア": "T_A＜T_B＜T_C",
      "イ": "T_A＜T_B＝T_C",
      "ウ": "T_A＝T_B＜T_C",
      "エ": "T_B＜T_A＜T_C"
    },
    "originalContent": {
      "body": "図のような構造物Ａ、Ｂ及びＣの水平方向の固有周期をそれぞれT_A、T_B及びT_Cとしたとき、それらの大小関係として、正しいものは、次のうちどれか。ただし、水平力P又は２Pを作用させたときの水平変位δ又は2δは、図のとおりである。なお、柱は弾性部材で伸縮はないものとし、梁は剛体とする。また、柱の質量は考慮しないものとする。",
      "choices": {
        "ア": "T_A＜T_B＜T_C",
        "イ": "T_A＜T_B＝T_C",
        "ウ": "T_A＝T_B＜T_C",
        "エ": "T_B＜T_A＜T_C"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。適当。kA=P/δ、kB=2P/δ、kC=P/(2δ)。m/kはAが2Mδ/P、B・Cが8Mδ/PなのでTA<TB=TCである。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。周期はT=2π√(m/k)、水平剛性は作用力/変位で求める。BとCのm/kは等しいため、TB<TCとはならない。",
      "イ": "適当。kA=P/δ、kB=2P/δ、kC=P/(2δ)。m/kはAが2Mδ/P、B・Cが8Mδ/PなのでTA<TB=TCである。",
      "ウ": "不適当。BはAの8倍の質量で剛性は2倍であり、周期はAの2倍となる。TA=TBではない。",
      "エ": "不適当。Bの質量が大きいため、剛性の増加だけでは周期は小さくならない。正しい順序はTA<TB=TCである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.6（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 7,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q6.png"
    ],
    "imageAltTexts": [
      "公式原図：構造物A・B・Cの質量2M・16M・4M、荷重P・2P・P及び水平変位δ・δ・2δ"
    ],
    "isCalculation": true
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q7",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 7,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "中心圧縮力を受ける正方形断面の長柱の弾性座屈荷重P_eに関する次の記述のうち、最も不適当なものはどれか。ただし、柱は全長にわたって等質等断面とする。",
    "choices": {
      "ア": "P_eは、柱の長さが1/2倍になると４倍になる。",
      "イ": "P_eは、正方形断面を保ちながら柱断面積が２倍になると16 倍になる。",
      "ウ": "P_eは、柱のヤング係数が２倍になると２倍になる。",
      "エ": "P_eは、柱の材端条件が「一端自由他端固定の場合」に比べて「両端ピンの場合」のほうが大きくなる。"
    },
    "originalContent": {
      "body": "中心圧縮力を受ける正方形断面の長柱の弾性座屈荷重P_eに関する次の記述のうち、最も不適当なものはどれか。ただし、柱は全長にわたって等質等断面とする。",
      "choices": {
        "ア": "P_eは、柱の長さが1/2倍になると４倍になる。",
        "イ": "P_eは、正方形断面を保ちながら柱断面積が２倍になると16 倍になる。",
        "ウ": "P_eは、柱のヤング係数が２倍になると２倍になる。",
        "エ": "P_eは、柱の材端条件が「一端自由他端固定の場合」に比べて「両端ピンの場合」のほうが大きくなる。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。不適当。正方形の面積を二倍にすると一辺は√2倍、断面二次モーメントは四倍になる。座屈荷重も四倍であり、16倍ではない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。オイラー座屈荷重はPe=π²EI/(座屈長さ)²。長さを半分にすれば、材端条件が同じ場合の座屈荷重は四倍になる。",
      "イ": "不適当。正方形の面積を二倍にすると一辺は√2倍、断面二次モーメントは四倍になる。座屈荷重も四倍であり、16倍ではない。",
      "ウ": "適当。弾性座屈荷重はヤング係数Eに比例する。断面・長さ・材端条件が一定ならEが二倍でPeも二倍になる。",
      "エ": "適当。一端固定他端自由の座屈長さは2L、両端ピンはLである。両端ピンの座屈荷重のほうが四倍大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.7（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 8,
    "isCalculation": true
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q8",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 8,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築基準法における荷重及び外力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "建築物の地上部分における各層の地震層せん断力Q_iは、最下層の値が最も大きくなる。",
      "イ": "単位床面積当たりの積載荷重の大小関係は、建築物の実況に応じて計算しない場合、「地震力を計算する場合」＜「大梁、柱又は基礎の構造計算をする場合」＜「床の構造計算をする場合」である。",
      "ウ": "風圧力の計算に用いる速度圧qは、その地方について定められている基準風速V_0の２乗に比例する。",
      "エ": "風圧力の計算に用いる基準風速V_0は、極めて稀に発生する暴風時（再現期間が概ね500 年）を想定して定められている。"
    },
    "originalContent": {
      "body": "建築基準法における荷重及び外力に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "建築物の地上部分における各層の地震層せん断力Q_iは、最下層の値が最も大きくなる。",
        "イ": "単位床面積当たりの積載荷重の大小関係は、建築物の実況に応じて計算しない場合、「地震力を計算する場合」＜「大梁、柱又は基礎の構造計算をする場合」＜「床の構造計算をする場合」である。",
        "ウ": "風圧力の計算に用いる速度圧qは、その地方について定められている基準風速V_0の２乗に比例する。",
        "エ": "風圧力の計算に用いる基準風速V_0は、極めて稀に発生する暴風時（再現期間が概ね500 年）を想定して定められている。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。基準風速V0は再現期間およそ50年の風速を基本としている。極めて稀な500年程度の暴風をそのまま定義とするものではない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。ある層の層せん断力はその層以上の各階の地震力の合計である。最下層では全ての上階の地震力を負担するため最大となる。",
      "イ": "適当。床の局所的な最大載荷、柱・大梁の広範囲の載荷、地震時の重量評価では想定が異なる。所定の用途の表の値では設問の順となる。",
      "ウ": "適当。速度圧はq=0.6EV0²で表される。その他の条件が同じなら基準風速の二乗に比例する。",
      "エ": "不適当。基準風速V0は再現期間およそ50年の風速を基本としている。極めて稀な500年程度の暴風をそのまま定義とするものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.8（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 8
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q9",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 9,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による地上２階建ての建築物に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "壁量計算において、垂れ壁を存在壁量として算入するために、垂れ壁の両側は準耐力壁とした。",
      "イ": "筋かいの端部について、一方を柱と横架材との仕口に緊結し、もう一方を柱に緊結した。",
      "ウ": "平面が長方形の建築物において、地震力に対する必要な耐力壁の有効長さ（必要壁量）を張り間方向及び桁行方向について同じ値とした。",
      "エ": "風圧力に対する必要な耐力壁の有効長さ（必要壁量）は、桁行方向の耐力壁については、桁行方向の立面の見付面積を用いて求めた。"
    },
    "originalContent": {
      "body": "木造軸組工法による地上２階建ての建築物に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "壁量計算において、垂れ壁を存在壁量として算入するために、垂れ壁の両側は準耐力壁とした。",
        "イ": "筋かいの端部について、一方を柱と横架材との仕口に緊結し、もう一方を柱に緊結した。",
        "ウ": "平面が長方形の建築物において、地震力に対する必要な耐力壁の有効長さ（必要壁量）を張り間方向及び桁行方向について同じ値とした。",
        "エ": "風圧力に対する必要な耐力壁の有効長さ（必要壁量）は、桁行方向の耐力壁については、桁行方向の立面の見付面積を用いて求めた。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。桁行方向に抵抗する耐力壁の必要量は、その方向に作用する風圧力を受ける張り間方向の立面の見付面積から求める。風向と壁の抵抗方向を区別する。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。垂れ壁を壁量に算入するには、その両側の壁等の条件がある。設問は両側を準耐力壁とする必要な構成を採っている。",
      "イ": "適当。改正された筋かい端部の接合の扱いでは、片端を柱・横架材の仕口に緊結し他端を柱に緊結する方法が認められる。両端を必ず仕口だけに接合するという旧来の理解で判断しない。",
      "ウ": "適当。地震力による必要壁量は建築物の重量等を基に算定するため、張り間・桁行の両方向について同じ必要量となる。",
      "エ": "不適当。桁行方向に抵抗する耐力壁の必要量は、その方向に作用する風圧力を受ける張り間方向の立面の見付面積から求める。風向と壁の抵抗方向を区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.9（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 8
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q10",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 10,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような平面を有する木造軸組工法による平家建て建築物（桁行12.0 m、張り間10.0 m）について、「木造の建築物の軸組の構造方法及び設置の基準を定める件（昭和56 年建設省告示第1100 号）」第4（いわゆる四分割法）に従って耐力壁等が釣合いよく配置されていることを確認する場合の、張り間方向の計算に用いる側端部分を示す図として、正しいものは、次のうちどれか。ただし、図中における寸法の単位はmとする。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4"
    },
    "originalContent": {
      "body": "図のような平面を有する木造軸組工法による平家建て建築物（桁行12.0 m、張り間10.0 m）について、「木造の建築物の軸組の構造方法及び設置の基準を定める件（昭和56 年建設省告示第1100 号）」第4（いわゆる四分割法）に従って耐力壁等が釣合いよく配置されていることを確認する場合の、張り間方向の計算に用いる側端部分を示す図として、正しいものは、次のうちどれか。ただし、図中における寸法の単位はmとする。",
      "choices": {
        "ア": "図1",
        "イ": "図2",
        "ウ": "図3",
        "エ": "図4"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。適当。張り間方向の計算では、直交する桁行方向の全体長さ12mの両端1/4、すなわち3mの帯を基本に側端部分を定める。欠けた部分の外側の帯は建物内に残る部分だけとなり、図3の右下は1m幅になる。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。桁行方向の全体長さ12mの両端1/4である3mの帯を基本にし、欠けた部分は除く。図1の右下3m幅は、欠けを除いた図3の1m幅と異なる。",
      "イ": "不適当。下側の長さ10mを別に四分割して2.5mの帯にしている。全体長さ12mの両端1/4の帯と欠けの関係を示す図3とは異なる。",
      "ウ": "適当。張り間方向の計算では、直交する桁行方向の全体長さ12mの両端1/4、すなわち3mの帯を基本に側端部分を定める。欠けた部分の外側の帯は建物内に残る部分だけとなり、図3の右下は1m幅になる。",
      "エ": "不適当。桁行方向の全体長さ12mを基準にすべきところを、10mを基準とした2.5m幅にしている。右下の欠けを考慮した区域も図3と異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.10（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 9,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q10.png"
    ],
    "imageAltTexts": [
      "公式原図：張り間方向の四分割法の側端部分を塗った平面図1〜4、幅12m、下部幅10mの欠けを持つ平面、各寸法と方向・凡例"
    ]
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q11",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 11,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造の配筋に関する次の図と記述のうち、最も不適当なものはどれか。ただし、図に記載のない鉄筋は適切に配筋されているものとする。",
    "choices": {
      "ア": "両側にスラブが取り付いた梁の副あばら筋において、必要な余長を確保したうえで、副あばら筋の上側の末端を90度フックとした。",
      "イ": "柱主筋の配筋において、同一断面内に継手が重ならないように相互にずらして、ガス圧接継手を柱頭部に設けた。",
      "ウ": "両側スラブの配筋において、梁端からの必要な定着長さを確保したうえで、スラブの上端筋を直線定着した。",
      "エ": "柱と壁との間に設けた完全スリットにおいて、面外変形を抑えるための鉄筋を設けた。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造の配筋に関する次の図と記述のうち、最も不適当なものはどれか。ただし、図に記載のない鉄筋は適切に配筋されているものとする。",
      "choices": {
        "ア": "両側にスラブが取り付いた梁の副あばら筋において、必要な余長を確保したうえで、副あばら筋の上側の末端を90度フックとした。",
        "イ": "柱主筋の配筋において、同一断面内に継手が重ならないように相互にずらして、ガス圧接継手を柱頭部に設けた。",
        "ウ": "両側スラブの配筋において、梁端からの必要な定着長さを確保したうえで、スラブの上端筋を直線定着した。",
        "エ": "柱と壁との間に設けた完全スリットにおいて、面外変形を抑えるための鉄筋を設けた。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。不適当。柱頭部など応力・塑性変形が大きくなる位置にはガス圧接継手を設けない。継手を相互にずらしても、不適切な継手位置は解消されない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。両側にスラブがある梁の副あばら筋では、必要余長とスラブによる拘束を確保する条件で上側末端を90度フックとできる。",
      "イ": "不適当。柱頭部など応力・塑性変形が大きくなる位置にはガス圧接継手を設けない。継手を相互にずらしても、不適切な継手位置は解消されない。",
      "ウ": "適当。両側スラブの上端筋は、梁端から必要な定着長さを確保すれば直線定着が可能である。全ての上端筋に末端フックが必要とは限らない。",
      "エ": "適当。完全スリットでも、壁の面外変形・脱落を抑える鉄筋を所定の方法で設ける。スリットの面内方向の変形を妨げない配慮と防錆処理が必要となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.11（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 10,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2026-kozo-q11.png"
    ],
    "imageAltTexts": [
      "公式原図：四つの配筋例と記述。副あばら筋の上端90度フック、柱頭ガス圧接継手、スラブ上端筋の直線定着、完全スリットの面外拘束筋"
    ]
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q12",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 12,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "帯筋によるコンクリートの拘束の度合いが大きいほど、一般に、柱の軸方向圧縮耐力は大きくなり、最大耐力以降の耐力低下の度合いは緩やかになる。",
      "イ": "柱の断面算定において、コンクリートに対する鉄筋のヤング係数比nは、一般に、コンクリートの設計基準強度が高くなるほど小さな値となる。",
      "ウ": "壁式構造の耐力壁では、曲げ降伏する時点の平均せん断応力度が同じ場合、一般に、壁板両端に柱があるラーメン構造の耐力壁に比べて、靱性は低下する。",
      "エ": "主筋間のあきが大きくなるほど、一般に、付着割裂強度は小さくなる。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "帯筋によるコンクリートの拘束の度合いが大きいほど、一般に、柱の軸方向圧縮耐力は大きくなり、最大耐力以降の耐力低下の度合いは緩やかになる。",
        "イ": "柱の断面算定において、コンクリートに対する鉄筋のヤング係数比nは、一般に、コンクリートの設計基準強度が高くなるほど小さな値となる。",
        "ウ": "壁式構造の耐力壁では、曲げ降伏する時点の平均せん断応力度が同じ場合、一般に、壁板両端に柱があるラーメン構造の耐力壁に比べて、靱性は低下する。",
        "エ": "主筋間のあきが大きくなるほど、一般に、付着割裂強度は小さくなる。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。主筋間のあきが大きいほど、一般に付着割裂に抵抗する周囲のコンクリートを確保しやすくなり、付着割裂強度は大きくなる。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。帯筋の拘束はコアコンクリートの圧縮強度と変形能力を改善するため、柱の圧縮耐力を高め、最大耐力後の低下を緩やかにする。",
      "イ": "適当。コンクリートの強度が高くなると通常そのヤング係数も大きくなる。鉄筋のヤング係数がほぼ一定なら、比n=Es/Ecは小さくなる。",
      "ウ": "適当。壁端部に柱のある耐力壁は端部の拘束等により変形性能を確保しやすい。同じ平均せん断応力度でも壁式構造の壁が同じ靱性を持つとは限らない。",
      "エ": "不適当。主筋間のあきが大きいほど、一般に付着割裂に抵抗する周囲のコンクリートを確保しやすくなり、付着割裂強度は大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.12（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 11
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q13",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 13,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造の許容応力度計算に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "柱の許容曲げモーメントは、「圧縮縁がコンクリートの許容圧縮応力度に達したとき」、「圧縮側鉄筋が許容圧縮応力度に達したとき」及び「引張鉄筋が許容引張応力度に達したとき」に対して算定したそれぞれの曲げモーメントの値のうち、最大となるものとした。",
      "イ": "建築物の外壁から突出する部分の長さが２m以下の片持ちのバルコニーについて、鉛直方向の振動の励起が生じにくいものと判断して、鉛直震度による突出部分に作用する応力の割増しを行わなかった。",
      "ウ": "引張側にスラブが取り付く大梁の短期許容曲げ耐力の算定時に、スラブ筋の耐力を算入しなかった。",
      "エ": "柱梁接合部の許容せん断力を大きくするために、設計基準強度がより高いコンクリートを採用した。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造の許容応力度計算に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "柱の許容曲げモーメントは、「圧縮縁がコンクリートの許容圧縮応力度に達したとき」、「圧縮側鉄筋が許容圧縮応力度に達したとき」及び「引張鉄筋が許容引張応力度に達したとき」に対して算定したそれぞれの曲げモーメントの値のうち、最大となるものとした。",
        "イ": "建築物の外壁から突出する部分の長さが２m以下の片持ちのバルコニーについて、鉛直方向の振動の励起が生じにくいものと判断して、鉛直震度による突出部分に作用する応力の割増しを行わなかった。",
        "ウ": "引張側にスラブが取り付く大梁の短期許容曲げ耐力の算定時に、スラブ筋の耐力を算入しなかった。",
        "エ": "柱梁接合部の許容せん断力を大きくするために、設計基準強度がより高いコンクリートを採用した。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。不適当。許容曲げモーメントは、いずれかの材料が許容応力度に達する最初の状態で決まり、算定した値の最小値を採る。最大値では他の材料が許容値を超える。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。許容曲げモーメントは、いずれかの材料が許容応力度に達する最初の状態で決まり、算定した値の最小値を採る。最大値では他の材料が許容値を超える。",
      "イ": "適当。突出長さ2m以下で鉛直振動が励起されにくいと判断される片持ち部分は、所定の鉛直震度による応力割増しを省ける扱いがある。",
      "ウ": "適当。許容応力度計算の短期許容曲げ耐力に、引張側にあるスラブ筋の耐力を必ず算入するとは限らない。保有水平耐力時の評価と区別する。",
      "エ": "適当。柱梁接合部の許容せん断力はコンクリート強度の影響を受ける。断面等の条件が同じなら設計基準強度を高めることは耐力向上の方法となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.13（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 11
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q14",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 14,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造の保有水平耐力計算に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "柱のせん断終局耐力は、一般に、平均軸応力度がコンクリートの設計基準強度の0.4 倍以下の場合、軸方向圧縮応力度が大きいほど大きくなる。",
      "イ": "架構のメカニズム時にヒンジが生じない状態の柱のせん断終局耐力が、架構のメカニズム時のせん断力に対して1.1 倍の場合、一般に、部材種別はFDとなる。",
      "ウ": "局部崩壊に至る脆性破壊を生じる柱を有する建築物では、一般に、当該柱を無視した靭性部材のみで構成された建築物とみなして、当該柱がある階の保有水平耐力を算定する。",
      "エ": "大梁のせん断終局耐力は、一般に、有効せいに対するせん断スパンの比が小さいほど大きくなる。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造の保有水平耐力計算に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "柱のせん断終局耐力は、一般に、平均軸応力度がコンクリートの設計基準強度の0.4 倍以下の場合、軸方向圧縮応力度が大きいほど大きくなる。",
        "イ": "架構のメカニズム時にヒンジが生じない状態の柱のせん断終局耐力が、架構のメカニズム時のせん断力に対して1.1 倍の場合、一般に、部材種別はFDとなる。",
        "ウ": "局部崩壊に至る脆性破壊を生じる柱を有する建築物では、一般に、当該柱を無視した靭性部材のみで構成された建築物とみなして、当該柱がある階の保有水平耐力を算定する。",
        "エ": "大梁のせん断終局耐力は、一般に、有効せいに対するせん断スパンの比が小さいほど大きくなる。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。不適当。局部崩壊に至る脆性柱がある場合、その柱のせん断破壊時などの状態を考慮する。単に柱を除去して靱性部材だけで算定すると、先行する脆性破壊の危険を過小評価する。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。軸圧縮応力は一定の範囲でせん断ひび割れを抑制するため、平均軸応力度がFcの0.4倍以下という条件では柱せん断終局耐力を増す方向に働く。",
      "イ": "適当。メカニズム時にヒンジを生じない柱には所定のせん断余裕度が求められる。余裕度1.1では脆性破壊を避けるための基準に足りず、FDの扱いとなる。",
      "ウ": "不適当。局部崩壊に至る脆性柱がある場合、その柱のせん断破壊時などの状態を考慮する。単に柱を除去して靱性部材だけで算定すると、先行する脆性破壊の危険を過小評価する。",
      "エ": "適当。有効せいに対するせん断スパン比が小さいほど、一般にコンクリートのアーチ機構が働きやすくなり、せん断終局耐力は大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.14（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 11
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q15",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 15,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄骨構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "多数回の繰返し応力を受ける梁フランジを建築構造用圧延鋼材SN400 Bから同一断面のSN490 Bに変更しても、継手などの形式及び総繰返し数が同じであれば、許容疲労強さは変わらない。",
      "イ": "柱を建築構造用圧延鋼材SN400 Bから同一断面のSN490 Bに変更しても、細長比がSN400 Bの限界細長比より大きければ、許容圧縮応力度は変わらない。",
      "ウ": "建築構造用圧延鋼材SN490 Bの板厚を25 mmから50 mmに変更しても、許容引張応力度は変わらない。",
      "エ": "大スパンの梁部材を建築構造用圧延鋼材SN400 Bから同一断面のSN490 Bに変更しても、鉛直荷重による梁の弾性たわみは変わらない。"
    },
    "originalContent": {
      "body": "鉄骨構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "多数回の繰返し応力を受ける梁フランジを建築構造用圧延鋼材SN400 Bから同一断面のSN490 Bに変更しても、継手などの形式及び総繰返し数が同じであれば、許容疲労強さは変わらない。",
        "イ": "柱を建築構造用圧延鋼材SN400 Bから同一断面のSN490 Bに変更しても、細長比がSN400 Bの限界細長比より大きければ、許容圧縮応力度は変わらない。",
        "ウ": "建築構造用圧延鋼材SN490 Bの板厚を25 mmから50 mmに変更しても、許容引張応力度は変わらない。",
        "エ": "大スパンの梁部材を建築構造用圧延鋼材SN400 Bから同一断面のSN490 Bに変更しても、鉛直荷重による梁の弾性たわみは変わらない。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。不適当。SN490Bの基準強度は板厚によって異なり、25mmから50mmでは強度区分が変わる。許容引張応力度を同じとすることはできない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。溶接継手等の疲労強度は継手形式や繰返し数等に強く支配される。鋼種の静的強度を上げるだけで許容疲労強さが同様に増すとはならない。",
      "イ": "適当。弾性座屈が支配する大きな細長比では許容圧縮応力度は主としてEと細長比で決まる。同断面・同長さでEが同じなら鋼種変更の効果はない。",
      "ウ": "不適当。SN490Bの基準強度は板厚によって異なり、25mmから50mmでは強度区分が変わる。許容引張応力度を同じとすることはできない。",
      "エ": "適当。弾性たわみは主として荷重、スパン、E、Iで決まる。同断面で鋼材のEはほぼ同じなので、基準強度の高い鋼種への変更だけではたわみは減らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.15（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 12
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q16",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 16,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄骨構造の接合部に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "溶接接合において、溶接部の強度を低下させないために、入熱量及びパス間温度が規定値より小さくなるように管理した。",
      "イ": "露出形式柱脚において、所定の構造計算を行わなかったので、アンカーボルトの基礎に対する定着長さをアンカーボルトの径の15 倍とした。",
      "ウ": "高力ボルト摩擦接合部において、２面摩擦接合２本締めの許容せん断耐力を、同一径の１面摩擦接合４本締めの場合と同じ値とした。",
      "エ": "高力ボルト摩擦接合部において、すべり耐力以下の繰返し応力に対しては、ボルト張力の低下や摩擦面の状態の変化を考慮しなかった。"
    },
    "originalContent": {
      "body": "鉄骨構造の接合部に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "溶接接合において、溶接部の強度を低下させないために、入熱量及びパス間温度が規定値より小さくなるように管理した。",
        "イ": "露出形式柱脚において、所定の構造計算を行わなかったので、アンカーボルトの基礎に対する定着長さをアンカーボルトの径の15 倍とした。",
        "ウ": "高力ボルト摩擦接合部において、２面摩擦接合２本締めの許容せん断耐力を、同一径の１面摩擦接合４本締めの場合と同じ値とした。",
        "エ": "高力ボルト摩擦接合部において、すべり耐力以下の繰返し応力に対しては、ボルト張力の低下や摩擦面の状態の変化を考慮しなかった。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。不適当。所定の構造計算によらない露出柱脚のアンカーボルト定着長さは、原則として径の20倍以上が必要であり、15倍では不足する。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。入熱量・パス間温度が過大になると溶接部の機械的性能を損ない得るため、上限となる所定値を超えない管理を行う。",
      "イ": "不適当。所定の構造計算によらない露出柱脚のアンカーボルト定着長さは、原則として径の20倍以上が必要であり、15倍では不足する。",
      "ウ": "適当。ボルト径等が同じなら摩擦面数とボルト本数が基本耐力に関わる。二面×二本と一面×四本では総摩擦面数が等しくなる。",
      "エ": "適当。すべり耐力以下の繰返しでは、適切に施工された摩擦接合のボルト張力や摩擦面の変化を通常は特別に低減評価しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.16（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 12
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q17",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 17,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄骨構造の耐震計算に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "最大スパンが９mで、高さ９m、延べ面積が450 m²の２階建ての建築物を「ルート１－２」で設計した。",
      "イ": "「ルート１－２」の計算において、標準せん断力係数を0.3 として地震力の算定を行ったので、層間変形角及び剛性率の確認を行わなかった。",
      "ウ": "「ルート２」の計算において、筋かいの水平力分担率の値に応じて、地震時の応力を割り増した。",
      "エ": "冷間成形角形鋼管を柱に用いた建築物の「ルート２」の計算において、中間階の各柱梁接合部の梁の全塑性モーメントの和が、柱の全塑性モーメントの和の1.5 倍以上となるようにした。"
    },
    "originalContent": {
      "body": "鉄骨構造の耐震計算に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "最大スパンが９mで、高さ９m、延べ面積が450 m²の２階建ての建築物を「ルート１－２」で設計した。",
        "イ": "「ルート１－２」の計算において、標準せん断力係数を0.3 として地震力の算定を行ったので、層間変形角及び剛性率の確認を行わなかった。",
        "ウ": "「ルート２」の計算において、筋かいの水平力分担率の値に応じて、地震時の応力を割り増した。",
        "エ": "冷間成形角形鋼管を柱に用いた建築物の「ルート２」の計算において、中間階の各柱梁接合部の梁の全塑性モーメントの和が、柱の全塑性モーメントの和の1.5 倍以上となるようにした。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。冷間成形角形鋼管柱を用いるルート2では、柱の耐力を梁より十分大きくする柱梁耐力比の条件がある。梁を柱の1.5倍以上にする設問は関係が逆である。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。ルート1−2の適用範囲には高さ・階数・面積・スパン等の条件がある。設問の高さ9m、二階、450m²、スパン9mはその範囲内となる。",
      "イ": "適当。ルート1−2では標準せん断力係数0.3以上等による割増しを前提に、層間変形角・剛性率の確認を省ける扱いがある。",
      "ウ": "適当。ルート2の筋かい付き鉄骨造では、筋かいが負担する水平力の割合に応じて地震時応力を割り増し、脆性的な挙動に配慮する。",
      "エ": "不適当。冷間成形角形鋼管柱を用いるルート2では、柱の耐力を梁より十分大きくする柱梁耐力比の条件がある。梁を柱の1.5倍以上にする設問は関係が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.17（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 12
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q18",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 18,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄骨構造の設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "角形鋼管を用いた柱は、横座屈が生じるおそれがないので、材長にかかわらず、許容曲げ応力度を許容引張応力度と同じ値にすることができる。",
      "イ": "骨組の塑性変形能力を確保するために定められているＨ形鋼（炭素鋼）の梁の幅厚比の上限値は、フランジよりウェブのほうが小さい。",
      "ウ": "鋼材断面の幅厚比の規定は、局部座屈防止のために設けられたものであり、鋼材の降伏点に影響される。",
      "エ": "柱梁接合部パネルは、大地震時において、接合される梁や柱より早期に降伏しても、一般に、骨組の剛性は直ちに低下しない。"
    },
    "originalContent": {
      "body": "鉄骨構造の設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "角形鋼管を用いた柱は、横座屈が生じるおそれがないので、材長にかかわらず、許容曲げ応力度を許容引張応力度と同じ値にすることができる。",
        "イ": "骨組の塑性変形能力を確保するために定められているＨ形鋼（炭素鋼）の梁の幅厚比の上限値は、フランジよりウェブのほうが小さい。",
        "ウ": "鋼材断面の幅厚比の規定は、局部座屈防止のために設けられたものであり、鋼材の降伏点に影響される。",
        "エ": "柱梁接合部パネルは、大地震時において、接合される梁や柱より早期に降伏しても、一般に、骨組の剛性は直ちに低下しない。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。不適当。H形鋼の幅厚比の上限は、一般にウェブのほうがフランジより大きい。幅の定義や拘束条件が異なるため、同じ上限で評価しない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。角形鋼管は横座屈の影響を受けにくい閉断面であり、許容曲げ応力度を許容引張応力度と同値にできる。柱としての圧縮座屈の確認は別に必要である。",
      "イ": "不適当。H形鋼の幅厚比の上限は、一般にウェブのほうがフランジより大きい。幅の定義や拘束条件が異なるため、同じ上限で評価しない。",
      "ウ": "適当。幅厚比制限は板要素の局部座屈を防ぐためのもので、鋼材の降伏点が高いほど一般に厳しい制限となる。",
      "エ": "適当。接合部パネルが降伏しても周囲のフランジ等による抵抗があり、直ちに骨組全体の剛性が急落するとは限らない。パネル単体と骨組全体の挙動を区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.18（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 13
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q19",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 19,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "土質及び地盤に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "土の含水比は、一般に、細粒分含有率が大きくなるほど小さくなる。",
      "イ": "土の飽和度は、水の体積を間隙の体積で除したものである。",
      "ウ": "地盤の有効応力は、全応力と間隙水圧との差である。",
      "エ": "地震動が作用している軟弱な地盤においては、地盤のせん断ひずみが大きくなるほど、地盤の減衰定数は増大する。"
    },
    "originalContent": {
      "body": "土質及び地盤に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "土の含水比は、一般に、細粒分含有率が大きくなるほど小さくなる。",
        "イ": "土の飽和度は、水の体積を間隙の体積で除したものである。",
        "ウ": "地盤の有効応力は、全応力と間隙水圧との差である。",
        "エ": "地震動が作用している軟弱な地盤においては、地盤のせん断ひずみが大きくなるほど、地盤の減衰定数は増大する。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。不適当。細粒分の多い土は一般に水を保持しやすく、含水比が大きくなる傾向がある。小さくなるとする設問は傾向が逆である。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。細粒分の多い土は一般に水を保持しやすく、含水比が大きくなる傾向がある。小さくなるとする設問は傾向が逆である。",
      "イ": "適当。飽和度は間隙のうち水が占める体積の割合である。含水比の水質量/土粒子質量とは定義が異なる。",
      "ウ": "適当。有効応力は土粒子の骨格が負担する応力で、全応力から間隙水圧を引いて求める。水圧を加えるものではない。",
      "エ": "適当。せん断ひずみが増すと地盤の非線形性が強まり、履歴減衰が増大するため、一般に減衰定数は大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.19（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 13
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q20",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 20,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "地下外壁及び基礎に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "地下外壁の設計において、地下水以深の部分は、一般に、静止土圧と水圧を考慮する。",
      "イ": "地下外壁に作用する土圧は、地表面全面に等しく荷重度が作用する場合、一般に、｢地表面荷重がない場合の土圧｣に｢地表面の荷重度に静止土圧係数を乗じた値｣を加えたものとする。",
      "ウ": "直接基礎の極限鉛直支持力は、一般に、根入れ深さが深いほど小さくなる。",
      "エ": "粘性土地盤に建築物を建築する場合、過圧密粘土の地盤よりも正規圧密粘土の地盤のほうが、大きな圧密沈下が発生する可能性が高い。"
    },
    "originalContent": {
      "body": "地下外壁及び基礎に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "地下外壁の設計において、地下水以深の部分は、一般に、静止土圧と水圧を考慮する。",
        "イ": "地下外壁に作用する土圧は、地表面全面に等しく荷重度が作用する場合、一般に、｢地表面荷重がない場合の土圧｣に｢地表面の荷重度に静止土圧係数を乗じた値｣を加えたものとする。",
        "ウ": "直接基礎の極限鉛直支持力は、一般に、根入れ深さが深いほど小さくなる。",
        "エ": "粘性土地盤に建築物を建築する場合、過圧密粘土の地盤よりも正規圧密粘土の地盤のほうが、大きな圧密沈下が発生する可能性が高い。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。不適当。直接基礎の根入れを深くすると、一般に周囲の上載圧等の効果で極限鉛直支持力は大きくなる。小さくなるという記述は逆である。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。地下外壁は通常側方変形が拘束されるため静止土圧を用い、地下水位以下では水圧も別途考慮する。水中単位体積重量との組合せに注意する。",
      "イ": "適当。地表面の等分布荷重による水平土圧の増分は、一般に静止土圧係数とその荷重度の積として加える。",
      "ウ": "不適当。直接基礎の根入れを深くすると、一般に周囲の上載圧等の効果で極限鉛直支持力は大きくなる。小さくなるという記述は逆である。",
      "エ": "適当。正規圧密粘土は過去の圧密降伏応力を超える載荷となりやすく、同程度の荷重増分では過圧密粘土より大きな圧密沈下を生じやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.20（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 13
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q21",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 21,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "基礎に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "一様な地盤において、杭の水平抵抗の検討に用いる水平地盤反力係数（単位kN／m³）は、杭径が小さいほど大きくなる。",
      "イ": "同一の砂質地盤を支持層とする直接基礎において、極限鉛直支持力は、基礎の底面積のみならず、基礎底面の形状にも依存する。",
      "ウ": "同一の砂質地盤において、正方形で剛な直接基礎の底面に単位面積当たり同じ荷重が作用する場合、一般に、基礎底面の幅が小さいほど、即時沈下量は大きくなる。",
      "エ": "１スパンで、幅に対する高さの比が大きい建築物では、一般に、圧縮側の杭の破壊が、直ちに杭基礎全体の極限状態につながりやすい。"
    },
    "originalContent": {
      "body": "基礎に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "一様な地盤において、杭の水平抵抗の検討に用いる水平地盤反力係数（単位kN／m³）は、杭径が小さいほど大きくなる。",
        "イ": "同一の砂質地盤を支持層とする直接基礎において、極限鉛直支持力は、基礎の底面積のみならず、基礎底面の形状にも依存する。",
        "ウ": "同一の砂質地盤において、正方形で剛な直接基礎の底面に単位面積当たり同じ荷重が作用する場合、一般に、基礎底面の幅が小さいほど、即時沈下量は大きくなる。",
        "エ": "１スパンで、幅に対する高さの比が大きい建築物では、一般に、圧縮側の杭の破壊が、直ちに杭基礎全体の極限状態につながりやすい。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。不適当。同じ接地圧であれば、一般に直接基礎の幅が大きいほど即時沈下量は大きくなる。幅が小さいほど沈下が大きいとはいえない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。水平地盤反力係数は地盤だけの定数ではなく杭径にも依存し、一般に杭径が小さいほど大きな値となる。",
      "イ": "適当。極限支持力の評価式には基礎の形状による係数があり、同じ面積でも長方形・円形等の違いが支持力に影響する。",
      "ウ": "不適当。同じ接地圧であれば、一般に直接基礎の幅が大きいほど即時沈下量は大きくなる。幅が小さいほど沈下が大きいとはいえない。",
      "エ": "適当。幅に対して高い一スパンの建築物では転倒モーメントによる杭軸力が集中し、圧縮側杭の破壊が杭基礎全体の限界につながりやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.21（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 14
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q22",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 22,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄骨鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "地震時に引張軸力が生じる１階の柱脚の鉄骨部分は、原則として、非埋込み形式とする。",
      "イ": "非埋込み形式の鉄骨柱脚が曲げ降伏する場合、その柱を鉄筋コンクリート造とみなして、構造特性係数D_sの算定を行う。",
      "ウ": "耐力壁の縦横筋を周囲の鉄骨鉄筋コンクリート造の柱や梁に定着できない場合、縦横筋による耐力は無視する。",
      "エ": "構造特性係数D_sの算定において、耐力壁の想定される破壊モードがせん断破壊である場合、その耐力壁の種別はWCとする。"
    },
    "originalContent": {
      "body": "鉄骨鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "地震時に引張軸力が生じる１階の柱脚の鉄骨部分は、原則として、非埋込み形式とする。",
        "イ": "非埋込み形式の鉄骨柱脚が曲げ降伏する場合、その柱を鉄筋コンクリート造とみなして、構造特性係数D_sの算定を行う。",
        "ウ": "耐力壁の縦横筋を周囲の鉄骨鉄筋コンクリート造の柱や梁に定着できない場合、縦横筋による耐力は無視する。",
        "エ": "構造特性係数D_sの算定において、耐力壁の想定される破壊モードがせん断破壊である場合、その耐力壁の種別はWCとする。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。不適当。地震時に引張軸力が作用するSRC柱脚は、原則として埋込み形式とする。非埋込み形式を原則とする記述は逆である。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。地震時に引張軸力が作用するSRC柱脚は、原則として埋込み形式とする。非埋込み形式を原則とする記述は逆である。",
      "イ": "適当。非埋込み形式の鉄骨柱脚が曲げ降伏する場合は、その柱脚の変形性能を考慮し、柱をRC造とみなしてDsを評価する扱いがある。",
      "ウ": "適当。縦横筋を周辺の柱梁へ適切に定着できなければ、所定の応力を伝えられないため、その筋による耐力を見込まない。",
      "エ": "適当。耐力壁がせん断破壊するモードは、靱性が低いWCとして評価する。曲げ降伏する壁と同じ種別にはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.22（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 14
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q23",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 23,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "各種建築構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "壁式鉄筋コンクリート構造の建築物では、使用するコンクリートの設計基準強度を高くすると、一般に、必要壁量を小さくすることができる。",
      "イ": "壁式鉄筋コンクリート構造の建築物では、直交壁の取り付いた耐力壁の曲げ剛性を評価する場合、一般に、直交壁の効果を考慮する必要がある。",
      "ウ": "プレストレストコンクリート構造におけるポストテンション方式は、コンクリートの硬化後、PC鋼材に引張力を導入する方式である。",
      "エ": "建築物の安全限界時の各部材の減衰特性を表す数値は、一般に、プレストレストコンクリート造の部材のほうが、鉄筋コンクリート造の部材に比べて大きい。"
    },
    "originalContent": {
      "body": "各種建築構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "壁式鉄筋コンクリート構造の建築物では、使用するコンクリートの設計基準強度を高くすると、一般に、必要壁量を小さくすることができる。",
        "イ": "壁式鉄筋コンクリート構造の建築物では、直交壁の取り付いた耐力壁の曲げ剛性を評価する場合、一般に、直交壁の効果を考慮する必要がある。",
        "ウ": "プレストレストコンクリート構造におけるポストテンション方式は、コンクリートの硬化後、PC鋼材に引張力を導入する方式である。",
        "エ": "建築物の安全限界時の各部材の減衰特性を表す数値は、一般に、プレストレストコンクリート造の部材のほうが、鉄筋コンクリート造の部材に比べて大きい。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。PC造部材はひび割れや履歴によるエネルギー吸収がRC造部材より小さい傾向があり、安全限界時の減衰特性の値も一般に小さい。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。壁式RC造の必要壁量の算定ではコンクリート強度の補正を行うため、所定の範囲で強度を高めると必要壁量を減らすことができる。",
      "イ": "適当。直交壁はフランジとして曲げ剛性等に寄与する。耐力壁を単独の矩形断面として扱うだけでは剛性を適切に評価できない場合がある。",
      "ウ": "適当。ポストテンションはコンクリート硬化後にPC鋼材を緊張し、定着具等を介してプレストレスを導入する方式である。硬化前に緊張するプレテンションと区別する。",
      "エ": "不適当。PC造部材はひび割れや履歴によるエネルギー吸収がRC造部材より小さい傾向があり、安全限界時の減衰特性の値も一般に小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.23（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 14
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q24",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 24,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "免震構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "免震構造において、免震層に設置するダンパーの減衰力を大きくすると、上部構造の地震時応答せん断力は単調に小さくなる。",
      "イ": "免震構造に用いられる、積層ゴムのアイソレータの１次形状係数S₁（ゴム１層の自由表面積（側面積）に対するゴムの拘束面積（受圧面積）の比）は、主に積層ゴムの鉛直剛性及び曲げ剛性に関係する。",
      "ウ": "免震構造に用いられるオイルダンパーは、免震層平面の外周部に設置すると、免震層のねじれ変形を抑制する効果がある。",
      "エ": "免震構造で用いられる天然ゴム系積層ゴムのアイソレータには、復元機能はあるが、減衰機能はほとんどない。"
    },
    "originalContent": {
      "body": "免震構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "免震構造において、免震層に設置するダンパーの減衰力を大きくすると、上部構造の地震時応答せん断力は単調に小さくなる。",
        "イ": "免震構造に用いられる、積層ゴムのアイソレータの１次形状係数S₁（ゴム１層の自由表面積（側面積）に対するゴムの拘束面積（受圧面積）の比）は、主に積層ゴムの鉛直剛性及び曲げ剛性に関係する。",
        "ウ": "免震構造に用いられるオイルダンパーは、免震層平面の外周部に設置すると、免震層のねじれ変形を抑制する効果がある。",
        "エ": "免震構造で用いられる天然ゴム系積層ゴムのアイソレータには、復元機能はあるが、減衰機能はほとんどない。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。不適当。ダンパーの減衰力が過大になると上部構造へ伝達する力が増すことがある。上部応答せん断力が常に単調に小さくなるとは限らず、適切な減衰量がある。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "不適当。ダンパーの減衰力が過大になると上部構造へ伝達する力が増すことがある。上部応答せん断力が常に単調に小さくなるとは限らず、適切な減衰量がある。",
      "イ": "適当。一次形状係数はゴム層の受圧面積と自由表面積の比で、ゴムの横膨張の拘束を通じて鉛直剛性・曲げ剛性に影響する。",
      "ウ": "適当。外周部に配置したダンパーは回転中心からの距離が大きく、ねじれに対して有効な減衰モーメントを発揮しやすい。",
      "エ": "適当。天然ゴム系積層ゴムは水平変形後の復元力を持つが、単体のエネルギー吸収は小さい。通常は別のダンパー等で減衰を補う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.24（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 15
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q25",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 25,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造の建築物の耐震設計及び耐震改修に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "耐震設計において、部材のせん断終局耐力を計算する場合のせん断補強筋の材料強度は、JIS規格品の鉄筋であっても、せん断破壊に対する余裕度を確保するために基準強度の割増しはしない。",
      "イ": "耐震設計において、設計用一次固有周期Tを固有値解析等の精算によって求める場合には、建築物の振動特性はコンクリートにひび割れのない初期剛性を用い、基礎や基礎杭の変形はないものと仮定する。",
      "ウ": "耐震改修には強度補強、靱性改善、損傷集中の回避のほかに、減築等により建築物に作用する地震力を低減する方法もある。",
      "エ": "耐震改修において、そで壁付き柱の耐力の向上を図る方法の一つに、「柱とそで壁との間に耐震スリットを設ける方法」がある。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造の建築物の耐震設計及び耐震改修に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "耐震設計において、部材のせん断終局耐力を計算する場合のせん断補強筋の材料強度は、JIS規格品の鉄筋であっても、せん断破壊に対する余裕度を確保するために基準強度の割増しはしない。",
        "イ": "耐震設計において、設計用一次固有周期Tを固有値解析等の精算によって求める場合には、建築物の振動特性はコンクリートにひび割れのない初期剛性を用い、基礎や基礎杭の変形はないものと仮定する。",
        "ウ": "耐震改修には強度補強、靱性改善、損傷集中の回避のほかに、減築等により建築物に作用する地震力を低減する方法もある。",
        "エ": "耐震改修において、そで壁付き柱の耐力の向上を図る方法の一つに、「柱とそで壁との間に耐震スリットを設ける方法」がある。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。そで壁との間にスリットを入れる方法は、短柱化等を解消して靱性を改善するもので、そで壁付き柱としての耐力を向上させる方法ではない。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。せん断補強筋の強度を安易に割り増すと、せん断破壊に対する安全余裕を過大に見積もる。所定の材料強度を用いて評価する。",
      "イ": "適当。設計用一次固有周期を精算する所定の条件では、ひび割れ前の初期剛性を用い、基礎・杭の変形を考慮しない。応答解析全般に対する一律の仮定という意味ではない。",
      "ウ": "適当。減築により建物重量が減ると地震慣性力も減る。耐力や靱性を増す方法に加え、作用する地震力を小さくすることも耐震改修となる。",
      "エ": "不適当。そで壁との間にスリットを入れる方法は、短柱化等を解消して靱性を改善するもので、そで壁付き柱としての耐力を向上させる方法ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.25（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 15
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q26",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 26,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築物の構造計画及び構造設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "地震時水平力を受けて骨組の水平変形が大きくなると、P－Δ効果による付加的な応力及び水平変形が無視できなくなる。",
      "イ": "建築物の平面形状が細長く、耐力壁が短辺方向の両妻面のみに配置され、剛床と仮定できない場合、両妻面の耐力壁の負担せん断力は、剛床と仮定した場合より大きくなる。",
      "ウ": "鉄骨構造の筋かい付き骨組の保有水平耐力計算において、Ｘ形筋かいの耐力は、引張側筋かいの耐力と、変形の適合を考慮した圧縮側筋かいの座屈後安定耐力を加えたものとすることができる。",
      "エ": "コンクリート充塡鋼管（CFT）構造の柱は、鉄骨構造の柱に比べて塑性変形能力が優れているので、鋼管の幅厚比制限を緩和することができる。"
    },
    "originalContent": {
      "body": "建築物の構造計画及び構造設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "地震時水平力を受けて骨組の水平変形が大きくなると、P－Δ効果による付加的な応力及び水平変形が無視できなくなる。",
        "イ": "建築物の平面形状が細長く、耐力壁が短辺方向の両妻面のみに配置され、剛床と仮定できない場合、両妻面の耐力壁の負担せん断力は、剛床と仮定した場合より大きくなる。",
        "ウ": "鉄骨構造の筋かい付き骨組の保有水平耐力計算において、Ｘ形筋かいの耐力は、引張側筋かいの耐力と、変形の適合を考慮した圧縮側筋かいの座屈後安定耐力を加えたものとすることができる。",
        "エ": "コンクリート充塡鋼管（CFT）構造の柱は、鉄骨構造の柱に比べて塑性変形能力が優れているので、鋼管の幅厚比制限を緩和することができる。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。不適当。剛床でない細長い床では中央部が変形して内側架構も水平力を負担するため、両妻面の耐力壁の負担は剛床仮定より一般に小さくなる。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。鉛直荷重Pが水平変位Δを生じた架構に作用すると付加モーメントPΔが生じる。大変形時は応力と変形の増大を無視できなくなる。",
      "イ": "不適当。剛床でない細長い床では中央部が変形して内側架構も水平力を負担するため、両妻面の耐力壁の負担は剛床仮定より一般に小さくなる。",
      "ウ": "適当。X形筋かいは引張側の耐力だけでなく、変形適合を満たす圧縮側の座屈後安定耐力を加えて評価することができる。",
      "エ": "適当。充塡コンクリートは鋼管の局部座屈を抑える等の効果を持ち、CFT柱では所定の範囲で鋼管の幅厚比制限を緩和できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.26（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 16
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q27",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 27,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "木材及び木質系材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "CLT（直交集成板）の圧縮、引張、面外曲げ及び面内曲げの基準強度は、CLTを構成するラミナ（挽板）の強度を用いた算定式で与えられている。",
      "イ": "構造用集成材の強度性能は、一般に、繊維方向と積層方向で異なる。",
      "ウ": "木材を大気中で十分に乾燥させ、木材中の結合水と大気中の湿度が平衡に達した状態を、気乾状態という。",
      "エ": "木裏は、一般に、木表に比べて乾燥収縮率が大きいので、乾燥時に木裏側に凹に反る性質がある。"
    },
    "originalContent": {
      "body": "木材及び木質系材料に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "CLT（直交集成板）の圧縮、引張、面外曲げ及び面内曲げの基準強度は、CLTを構成するラミナ（挽板）の強度を用いた算定式で与えられている。",
        "イ": "構造用集成材の強度性能は、一般に、繊維方向と積層方向で異なる。",
        "ウ": "木材を大気中で十分に乾燥させ、木材中の結合水と大気中の湿度が平衡に達した状態を、気乾状態という。",
        "エ": "木裏は、一般に、木表に比べて乾燥収縮率が大きいので、乾燥時に木裏側に凹に反る性質がある。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。一般に木表側の収縮が大きく、板材は木表側を凹にして反る。木裏側が凹になるとする説明は逆である。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。CLTの各基準強度は、構成するラミナの強度と積層構成等を反映した算定によって定められる。板全体を等方性材料として一つの強度にするものではない。",
      "イ": "適当。集成材も繊維方向の異方性を持つ。繊維方向と積層方向で圧縮・引張等の強度性能は異なる。",
      "ウ": "適当。大気中で乾燥し木材含水率が周囲の温湿度と平衡した状態を気乾という。水分を全て除いた全乾状態とは異なる。",
      "エ": "不適当。一般に木表側の収縮が大きく、板材は木表側を凹にして反る。木裏側が凹になるとする説明は逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.27（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 16
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q28",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 28,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "コンクリートに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "コンクリートのせん断弾性係数は、一般に、ヤング係数の0.4 倍程度である。",
      "イ": "コンクリートの引張強度は、一般に、コンクリートの圧縮強度が大きいほど大きくなる。",
      "ウ": "コンクリートの圧縮強度は、一般に、コンクリート供試体の形状が相似の場合、供試体寸法が大きいほど大きくなる。",
      "エ": "軽量コンクリート１種のヤング係数は、一般に、同じ設計基準強度の普通コンクリートのヤング係数に比べて小さい。"
    },
    "originalContent": {
      "body": "コンクリートに関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "コンクリートのせん断弾性係数は、一般に、ヤング係数の0.4 倍程度である。",
        "イ": "コンクリートの引張強度は、一般に、コンクリートの圧縮強度が大きいほど大きくなる。",
        "ウ": "コンクリートの圧縮強度は、一般に、コンクリート供試体の形状が相似の場合、供試体寸法が大きいほど大きくなる。",
        "エ": "軽量コンクリート１種のヤング係数は、一般に、同じ設計基準強度の普通コンクリートのヤング係数に比べて小さい。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。不適当。相似供試体では、寸法が大きいほど欠陥等の影響を受ける寸法効果により、一般に得られる圧縮強度は小さくなる。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。等方弾性体の関係G=E/[2(1+ν)]から、コンクリートのポアソン比を0.2前後とすればGはEの約0.4倍となる。",
      "イ": "適当。圧縮強度の増加とともに引張強度も一般に増す。ただし比例的に同じ割合だけ大きくなるわけではない。",
      "ウ": "不適当。相似供試体では、寸法が大きいほど欠陥等の影響を受ける寸法効果により、一般に得られる圧縮強度は小さくなる。",
      "エ": "適当。軽量コンクリートは単位容積質量が小さいため、同じ設計基準強度でも普通コンクリートよりヤング係数が小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.28（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 16
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q29",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 29,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鋼材に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "（一社）日本鉄鋼連盟の製品規定「建築構造用冷間ロール成形角形鋼管」に適合するBCR295 材の降伏点又は耐力の下限値は、295 N／mm² である。",
      "イ": "建築構造用圧延鋼材SN400 Aは炭素量の上限と降伏点の下限が規定されているが、十分な変形性能は保証されていない。",
      "ウ": "建築構造用圧延鋼材の常温から400 ℃程度までの引張強さは、一般に、その鋼材の基準強度（F 値）よりも大きい。",
      "エ": "熱間圧延鋼材の板厚方向（Ｚ方向）の強度は、圧延方向（Ｌ方向）や圧延方向に直角な方向（Ｃ方向）よりも大きい。"
    },
    "originalContent": {
      "body": "鋼材に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "（一社）日本鉄鋼連盟の製品規定「建築構造用冷間ロール成形角形鋼管」に適合するBCR295 材の降伏点又は耐力の下限値は、295 N／mm² である。",
        "イ": "建築構造用圧延鋼材SN400 Aは炭素量の上限と降伏点の下限が規定されているが、十分な変形性能は保証されていない。",
        "ウ": "建築構造用圧延鋼材の常温から400 ℃程度までの引張強さは、一般に、その鋼材の基準強度（F 値）よりも大きい。",
        "エ": "熱間圧延鋼材の板厚方向（Ｚ方向）の強度は、圧延方向（Ｌ方向）や圧延方向に直角な方向（Ｃ方向）よりも大きい。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。不適当。熱間圧延材の板厚方向は介在物等の影響で延性・強度が圧延面内より劣る傾向がある。板厚方向がより強いという記述は逆である。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。BCR295の降伏点又は耐力の下限は295N/mm²であり、記号の295もこの強度区分を表す。",
      "イ": "適当。SN400Aは炭素量上限・降伏点下限などを規定するが、B・C種と同様の溶接性や変形性能が全て保証されるわけではない。",
      "ウ": "適当。常温から400℃程度までの引張強さは、一般に常温の設計基準となるF値より大きい。高温での剛性・降伏特性の変化とは区別する。",
      "エ": "不適当。熱間圧延材の板厚方向は介在物等の影響で延性・強度が圧延面内より劣る傾向がある。板厚方向がより強いという記述は逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.29（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 17
  },
  {
    "id": "kenchikushi1-2026-annual-kozo-q30",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2026,
    "season": "annual",
    "qNumber": 30,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築物の構造計画及び構造設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "建築物に作用する荷重及び外力の性質には、いろいろな種類があり取扱いが難しいので、法規及び基規準は、荷重及び外力の数値を扱いやすいように便宜的に提示している。",
      "イ": "鋼材スクラップから再生した電炉材を適切に用いることは、建築物の資材製造段階の二酸化炭素排出量を削減する方法の一つである。",
      "ウ": "平面が不整形な建築物をエキスパンションジョイントを用いて整形な建築物に分割すると、一般に、構造体の地震時の挙動が明確になるが、温度応力やコンクリートの乾燥収縮に対しては、不利になる。",
      "エ": "床の積載荷重や部材断面設計において、適度に余裕をもたせて設計することは、イニシャルコスト増となるが、一般に、建築物の寿命を延ばし、ライフサイクルコストの節減に結びつく。"
    },
    "originalContent": {
      "body": "建築物の構造計画及び構造設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "建築物に作用する荷重及び外力の性質には、いろいろな種類があり取扱いが難しいので、法規及び基規準は、荷重及び外力の数値を扱いやすいように便宜的に提示している。",
        "イ": "鋼材スクラップから再生した電炉材を適切に用いることは、建築物の資材製造段階の二酸化炭素排出量を削減する方法の一つである。",
        "ウ": "平面が不整形な建築物をエキスパンションジョイントを用いて整形な建築物に分割すると、一般に、構造体の地震時の挙動が明確になるが、温度応力やコンクリートの乾燥収縮に対しては、不利になる。",
        "エ": "床の積載荷重や部材断面設計において、適度に余裕をもたせて設計することは、イニシャルコスト増となるが、一般に、建築物の寿命を延ばし、ライフサイクルコストの節減に結びつく。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。不適当。エキスパンションジョイントによる分割は、不整形建物の地震挙動を整理するだけでなく、温度伸縮や乾燥収縮による拘束応力の緩和にも役立つ。\n法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "choiceExplanations": {
      "ア": "適当。実際の荷重・外力の多様性を設計に用いやすい数値や荷重組合せとして整理したものが、法規・基規準の設計用荷重である。",
      "イ": "適当。電炉材はスクラップを再利用し、一般に高炉材に比べ材料製造時のCO2排出を抑えやすい。品質と設計条件に適合した使用が前提となる。",
      "ウ": "不適当。エキスパンションジョイントによる分割は、不整形建物の地震挙動を整理するだけでなく、温度伸縮や乾燥収縮による拘束応力の緩和にも役立つ。",
      "エ": "適当。適度な設計余裕は将来の利用変更や劣化への対応性を高める。初期費用が増えても、長寿命化によりライフサイクルコストを抑え得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年一級建築士試験 学科Ⅳ（構造）No.30（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2026-01-01",
    "questionNotice": "法令は出題時点に基づく。2026-01-01現在の施行規定による。 地方公共団体の条例は考慮しない。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 17
  }
];
