import type { Kenchikushi1StagedQuestion } from "./types";

export const KENCHIKUSHI1_2025_KOZO: Kenchikushi1StagedQuestion[] = [
  {
    "id": "kenchikushi1-2025-annual-kozo-q1",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 1,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図－１のような底部で固定された矩形断面材の頂部において、図心Ｇ点からeだけ離れた点に鉛直荷重Pが作用している。底部（a－a断面）における垂直応力度分布が図－２のようになる場合、距離eとして、正しいものは、次のうちどれか。ただし、BやDに対してhは十分に大きく、矩形断面材は等質等断面とし、自重は無視する。",
    "choices": {
      "ア": "D/12",
      "イ": "D²/(12B)",
      "ウ": "D/6",
      "エ": "D²/(6B)"
    },
    "originalContent": {
      "body": "図－１のような底部で固定された矩形断面材の頂部において、図心Ｇ点からeだけ離れた点に鉛直荷重Pが作用している。底部（a－a断面）における垂直応力度分布が図－２のようになる場合、距離eとして、正しいものは、次のうちどれか。ただし、BやDに対してhは十分に大きく、矩形断面材は等質等断面とし、自重は無視する。",
      "choices": {
        "ア": "D/12",
        "イ": "D²/(12B)",
        "ウ": "D/6",
        "エ": "D²/(6B)"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。正解。断面応力度の平均は2σ、曲げによる増減はσなので、(M/Z)/(P/A)＝1/2。M＝Pe、A＝BD、Z＝BD²/6より6e/D＝1/2、したがってe＝D/12。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正解。断面応力度の平均は2σ、曲げによる増減はσなので、(M/Z)/(P/A)＝1/2。M＝Pe、A＝BD、Z＝BD²/6より6e/D＝1/2、したがってe＝D/12。",
      "イ": "不正解。偏心は断面のD方向に生じ、eはDに比例する。D²/(12B)は直交方向の寸法Bを誤って用いた値である。",
      "ウ": "不正解。D/6は片縁の応力度が0となる核の限界に対応する。本図は両縁とも圧縮でσと3σなので偏心はその半分である。",
      "エ": "不正解。D²/(6B)では断面係数の軸の取り方と圧縮応力度比の両方を反映できない。実際の偏心はD/12となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.1（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 2,
    "officialReferenceUrls": [],
    "isCalculation": true,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2025-kozo-q1.png"
    ],
    "imageAltTexts": [
      "公式原図：幅D・奥行Bの矩形断面、図心Gからe偏心する鉛直荷重P、長さhの下端固定柱。a-a断面の圧縮応力度は両端σ・3σの台形分布。"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q2",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 2,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような集中荷重Pを受ける梁Ａ及びＢの荷重点に生じるたわみδ_Aとδ_Bとの比として、正しいものは、次のうちどれか。ただし、梁Ａ及びＢは同一断面で、全長にわたって等質等断面の弾性部材とし、自重は無視する。",
    "choices": {
      "ア": "1：1",
      "イ": "1：2",
      "ウ": "1：3",
      "エ": "1：4"
    },
    "originalContent": {
      "body": "図のような集中荷重Pを受ける梁Ａ及びＢの荷重点に生じるたわみδ_Aとδ_Bとの比として、正しいものは、次のうちどれか。ただし、梁Ａ及びＢは同一断面で、全長にわたって等質等断面の弾性部材とし、自重は無視する。",
      "choices": {
        "ア": "1：1",
        "イ": "1：2",
        "ウ": "1：3",
        "エ": "1：4"
      },
      "tables": [
        {
          "caption": "荷重点たわみδ_A：δ_B（原表）",
          "rows": [
            [
              "選択肢",
              "δ_A：δ_B"
            ],
            [
              "1",
              "1：1"
            ],
            [
              "2",
              "1：2"
            ],
            [
              "3",
              "1：3"
            ],
            [
              "4",
              "1：4"
            ]
          ]
        }
      ]
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。正解。梁AはPl³/(3EI)、梁Bの張出し先端は2Pl³/(3EI)となり、δ_A：δ_B＝1：2。支点の変位が0でも回転は0ではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "不正解。梁Aの自由端たわみはPl³/(3EI)。梁Bは左側スパンの回転も張出し先端の変位に加わるため、同じたわみにはならない。",
      "イ": "正解。梁AはPl³/(3EI)、梁Bの張出し先端は2Pl³/(3EI)となり、δ_A：δ_B＝1：2。支点の変位が0でも回転は0ではない。",
      "ウ": "不正解。比1：3ではない。梁Bの先端変位は支点回転によるPl³/(3EI)と張出し部自身のPl³/(3EI)の和で、梁Aの2倍となる。",
      "エ": "不正解。梁Bの全長2lを片持梁の長さとして扱わない。中央支点で鉛直変位が拘束されるため、比は1：2となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.2（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 3,
    "officialReferenceUrls": [],
    "isCalculation": true,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2025-kozo-q2.png"
    ],
    "imageAltTexts": [
      "公式原図：梁Aは長さlの片持梁の先端荷重P、梁Bは支点間l・張出しlの張出し先端荷重P。荷重点の下向き変位δ_A・δ_Bを比較。"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q3",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 3,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のようなラーメンに作用する水平荷重Pを増大させたとき、ラーメンの崩壊荷重の値として、正しいものは、次のうちどれか。ただし、柱、梁の全塑性モーメントの値は図中に示す値とする。",
    "choices": {
      "ア": "100 kN",
      "イ": "200 kN",
      "ウ": "300 kN",
      "エ": "450 kN"
    },
    "originalContent": {
      "body": "図のようなラーメンに作用する水平荷重Pを増大させたとき、ラーメンの崩壊荷重の値として、正しいものは、次のうちどれか。ただし、柱、梁の全塑性モーメントの値は図中に示す値とする。",
      "choices": {
        "ア": "100 kN",
        "イ": "200 kN",
        "ウ": "300 kN",
        "エ": "450 kN"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。正解。左右の柱梁接合部の上側は200と100、下側は400と100kN・mで降伏し、全塑性モーメントの和は800kN・m。水平変位4θについてP×4θ＝800θよりP＝200kN。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "不正解。崩壊荷重は100kNではない。柱だけでなく梁の全塑性モーメントの小さい側で先にヒンジが形成され、機構全体の仕事を用いて判定する。",
      "イ": "正解。左右の柱梁接合部の上側は200と100、下側は400と100kN・mで降伏し、全塑性モーメントの和は800kN・m。水平変位4θについてP×4θ＝800θよりP＝200kN。",
      "ウ": "不正解。300kNまで増やす前に、梁端・柱端の小さいほうの全塑性モーメントによる崩壊機構が形成される。",
      "エ": "不正解。450kNは接合する部材の大きい塑性耐力まで全て発揮するとした過大な値であり、先行する降伏機構を無視している。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.3（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 4,
    "officialReferenceUrls": [],
    "isCalculation": true,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2025-kozo-q3.png"
    ],
    "imageAltTexts": [
      "公式原図：幅8m・高さ4mの上下梁をもつラーメン、左下ピン・右下ローラー、左上に水平P。全塑性モーメントは左柱600、右柱100、上梁200、下梁400kN・m。"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q4",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 4,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような、柱と梁が剛接合された２階と、柱頭及び柱脚がピン接合され、筋かいを有する１階からなる架構が、水平荷重3P及びPを受けている。次の記述のうち、誤っているものはどれか。ただし、部材は等質等断面で伸縮はないものとし、部材の自重は無視する。",
    "choices": {
      "ア": "部材のせん断力の大きさの比は、柱Ａ：梁Ｂ＝４：３である。",
      "イ": "柱の曲げモーメントの大きさの最大値と、梁の曲げモーメントの大きさの最大値は等しい。",
      "ウ": "1 階柱の軸力の大きさの比は、柱Ｃ：柱Ｄ＝３：10 である。",
      "エ": "筋かいEの引張り軸力は、5Pである。"
    },
    "originalContent": {
      "body": "図のような、柱と梁が剛接合された２階と、柱頭及び柱脚がピン接合され、筋かいを有する１階からなる架構が、水平荷重3P及びPを受けている。次の記述のうち、誤っているものはどれか。ただし、部材は等質等断面で伸縮はないものとし、部材の自重は無視する。",
      "choices": {
        "ア": "部材のせん断力の大きさの比は、柱Ａ：梁Ｂ＝４：３である。",
        "イ": "柱の曲げモーメントの大きさの最大値と、梁の曲げモーメントの大きさの最大値は等しい。",
        "ウ": "1 階柱の軸力の大きさの比は、柱Ｃ：柱Ｄ＝３：10 である。",
        "エ": "筋かいEの引張り軸力は、5Pである。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。全体の転倒モーメントは3P×6＋P×3＝21Pで、支点鉛直反力は±21P/4。筋かいの鉛直分力は3Pであり、柱Cは引張9P/4、柱Dは圧縮21P/4となる。したがって軸力の大きさの比C：Dは3：7であり、3：10ではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。2階左右柱のせん断力は各3P/2。柱端モーメントは9P/4、梁端のせん断力は9P/8となり、柱A：梁B＝4：3。",
      "イ": "正しい。剛接合の節点に外力モーメントがないため、柱端と梁端の曲げモーメントは釣り合い、最大値の大きさも等しい。",
      "ウ": "誤り。全体の転倒モーメントは3P×6＋P×3＝21Pで、支点鉛直反力は±21P/4。筋かいの鉛直分力は3Pであり、柱Cは引張9P/4、柱Dは圧縮21P/4となる。したがって軸力の大きさの比C：Dは3：7であり、3：10ではない。",
      "エ": "正しい。1階層せん断力は4Pで、筋かいは水平4・鉛直3の3：4：5の傾き。水平分力4Pに対して引張軸力は5Pとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.4（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 5,
    "officialReferenceUrls": [],
    "isCalculation": true,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2025-kozo-q4.png"
    ],
    "imageAltTexts": [
      "公式原図：幅4m、各階3mの架構、上階剛接合、下階柱頭・柱脚ピン。上階に3P、1階柱頭にP。左下から右上への筋かいE、上階柱A・梁B、下階柱C・D。"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q5",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 5,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような異なる荷重を受ける同一のトラスにおいて、部材Ａ、Ｂ、Ｃ及びＤに生じる軸方向力をそれぞれ、N_A、N_B、N_C及びN_Dとするとき、それらの値として、誤っているものは、次のうちどれか。ただし、全ての部材は弾性部材とし、自重は無視する。また、軸方向力は、引張力を「＋」、圧縮力を「－」とする。",
    "choices": {
      "ア": "N_A＝＋3P",
      "イ": "N_B＝＋3√2P",
      "ウ": "N_C＝＋P",
      "エ": "N_D＝＋√2P"
    },
    "originalContent": {
      "body": "図のような異なる荷重を受ける同一のトラスにおいて、部材Ａ、Ｂ、Ｃ及びＤに生じる軸方向力をそれぞれ、N_A、N_B、N_C及びN_Dとするとき、それらの値として、誤っているものは、次のうちどれか。ただし、全ての部材は弾性部材とし、自重は無視する。また、軸方向力は、引張力を「＋」、圧縮力を「－」とする。",
      "choices": {
        "ア": "N_A＝＋3P",
        "イ": "N_B＝＋3√2P",
        "ウ": "N_C＝＋P",
        "エ": "N_D＝＋√2P"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。誤り。右図の部材Dは、上側2層に作用する水平荷重2Pのせん断力を負担する。45度の斜材なので軸力は＋2√2Pであり、＋√2Pではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。左図の上部に作用する水平力3Pに対する転倒モーメントと節点の釣合いから、部材Aは引張3Pとなる。",
      "イ": "正しい。左図の部材Bは水平分力3Pを負担する45度の斜材であり、引張軸力は3√2Pとなる。",
      "ウ": "正しい。右図の対象断面の上側荷重による鉛直力の釣合いから、部材Cの引張軸力はPとなる。",
      "エ": "誤り。右図の部材Dは、上側2層に作用する水平荷重2Pのせん断力を負担する。45度の斜材なので軸力は＋2√2Pであり、＋√2Pではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.5（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 6,
    "officialReferenceUrls": [],
    "isCalculation": true,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2025-kozo-q5.png"
    ],
    "imageAltTexts": [
      "公式原図：幅l、各層高さlの3層トラス。左図は頂部水平3P、右図は各層の節点に水平Pずつ。部材A・Cは中段左柱、B・Dは中段の右上がり斜材。"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q6",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 6,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "図のような構造物Ａ、Ｂ、Ｃの柱の弾性座屈荷重をそれぞれP_A、P_B、P_Cとしたとき、それらの大小関係として、正しいものは、次のうちどれか。ただし、全ての柱は等質等断面で、梁は剛体であり、柱及び梁の自重、柱の面外方向の座屈は無視する。",
    "choices": {
      "ア": "P_A＝P_B＜P_C",
      "イ": "P_A＝P_C＜P_B",
      "ウ": "P_B＜P_A＝P_C",
      "エ": "P_C＜P_A＝P_B"
    },
    "originalContent": {
      "body": "図のような構造物Ａ、Ｂ、Ｃの柱の弾性座屈荷重をそれぞれP_A、P_B、P_Cとしたとき、それらの大小関係として、正しいものは、次のうちどれか。ただし、全ての柱は等質等断面で、梁は剛体であり、柱及び梁の自重、柱の面外方向の座屈は無視する。",
      "choices": {
        "ア": "P_A＝P_B＜P_C",
        "イ": "P_A＝P_C＜P_B",
        "ウ": "P_B＜P_A＝P_C",
        "エ": "P_C＜P_A＝P_B"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。正解。Aは柱脚ピンの横移動形で座屈長さ2h。Cは実長2hで両端回転が拘束された横移動形なので座屈長さ2h。Bは実長2hの固定・ピンに対応し座屈長さ約0.699×2hとなる。P_cr＝π²EI/l_k²よりP_A＝P_C＜P_B。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "不正解。AとBの座屈荷重は等しくない。柱の実長ではなく、水平移動の拘束と端部回転条件を含む座屈長さで比較する。",
      "イ": "正解。Aは柱脚ピンの横移動形で座屈長さ2h。Cは実長2hで両端回転が拘束された横移動形なので座屈長さ2h。Bは実長2hの固定・ピンに対応し座屈長さ約0.699×2hとなる。P_cr＝π²EI/l_k²よりP_A＝P_C＜P_B。",
      "ウ": "不正解。Bが最小ではない。Bでは梁の水平移動が拘束されており、柱の曲げによる横移動を伴う座屈が抑制される。",
      "エ": "不正解。Cだけが最小となる関係ではない。Cは柱脚固定・柱頭回転拘束の横移動形で、Aとの座屈長さの対応によりP_A＝P_Cとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.6（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 7,
    "officialReferenceUrls": [],
    "isCalculation": true,
    "imageUrls": [
      "data/qualification-staging/kenchikushi1/assets/2025-kozo-q6.png"
    ],
    "imageAltTexts": [
      "公式原図：剛体梁を支持する2柱のA・B・C。Aは高さh・柱脚ピン・横移動自由、Bは高さ2h・柱脚ピン・梁の水平移動拘束、Cは高さ2h・柱脚固定・横移動自由。各柱にP_A・P_B・P_C。"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q7",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 7,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築基準法における建築物の構造計算に用いる地震力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "建築物の地下部分に作用する地震力の計算を行う場合、水平震度kは、地盤面からの深さが深くなるほど大きくなる。",
      "イ": "建築物の設計用一次固有周期Tが長い場合、建築物の地上部分に作用する地震力は、一般に、第一種地盤より第三種地盤のほうが大きくなる。",
      "ウ": "地震層せん断力係数の高さ方向の分布を表す係数A_iは、一般に、建築物の上階になるほど大きくなり、建築物の設計用一次固有周期Tが長いほど大きくなる。",
      "エ": "建築物の地上部分の必要保有水平耐力を計算する場合、標準せん断力係数は1.0 以上とする。"
    },
    "originalContent": {
      "body": "建築基準法における建築物の構造計算に用いる地震力に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "建築物の地下部分に作用する地震力の計算を行う場合、水平震度kは、地盤面からの深さが深くなるほど大きくなる。",
        "イ": "建築物の設計用一次固有周期Tが長い場合、建築物の地上部分に作用する地震力は、一般に、第一種地盤より第三種地盤のほうが大きくなる。",
        "ウ": "地震層せん断力係数の高さ方向の分布を表す係数A_iは、一般に、建築物の上階になるほど大きくなり、建築物の設計用一次固有周期Tが長いほど大きくなる。",
        "エ": "建築物の地上部分の必要保有水平耐力を計算する場合、標準せん断力係数は1.0 以上とする。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。誤り。地下部分の設計水平震度は深さが増すほど低減する。地上部分の高さ方向分布係数と地下部分の深さによる低減を混同しない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "誤り。地下部分の設計水平震度は深さが増すほど低減する。地上部分の高さ方向分布係数と地下部分の深さによる低減を混同しない。",
      "イ": "正しい。長周期域では第三種地盤の振動特性係数が第一種地盤より大きくなり、同じ建築物でも設計地震力が大きくなる。",
      "ウ": "正しい。A_iは上階ほど大きくなる傾向があり、固有周期が長い場合にも増大する。最下層の基準値とは区別する。",
      "エ": "正しい。必要保有水平耐力の算定に用いる地震力では標準せん断力係数C_0を1.0以上とし、一次設計の0.2と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.7（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 8,
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q8",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 8,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築基準法における建築物の構造計算に用いる風圧力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "風圧力を計算するに当たって用いる風力係数は、風洞試験によらない場合、建築物の断面及び平面の形状に応じて定める数値によらなければならない。",
      "イ": "単位面積当たりの風圧力については、一般に、「外装材に用いる風圧力」より「構造骨組に用いる風圧力」のほうが小さい。",
      "ウ": "ガスト影響係数G_fは、風の時間的変動により建築物が揺れた場合に発生する最大の力を計算するために用いる係数である。",
      "エ": "風圧力を計算するに当たって用いる速度圧qは、建築物の高さと軒の高さとの平均Hの平方根に比例する。"
    },
    "originalContent": {
      "body": "建築基準法における建築物の構造計算に用いる風圧力に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "風圧力を計算するに当たって用いる風力係数は、風洞試験によらない場合、建築物の断面及び平面の形状に応じて定める数値によらなければならない。",
        "イ": "単位面積当たりの風圧力については、一般に、「外装材に用いる風圧力」より「構造骨組に用いる風圧力」のほうが小さい。",
        "ウ": "ガスト影響係数G_fは、風の時間的変動により建築物が揺れた場合に発生する最大の力を計算するために用いる係数である。",
        "エ": "風圧力を計算するに当たって用いる速度圧qは、建築物の高さと軒の高さとの平均Hの平方根に比例する。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。誤り。速度圧はq＝0.6EV_0²で、Eは地表面粗度や高さ等に依存する。平均高さHの平方根に一律比例するものではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。風洞試験によらない場合は、告示等による建築物形状に応じた風力係数を用いる。形状に関係なく一定値を採用するものではない。",
      "イ": "正しい。外装材は局部的なピーク風圧を受けるため、平均化のある構造骨組用より単位面積当たりの設計風圧が一般に大きい。",
      "ウ": "正しい。ガスト影響係数G_fは風速の時間変動等による最大荷重の増幅を評価するもので、平均風による荷重だけでは表せない変動を考慮する。",
      "エ": "誤り。速度圧はq＝0.6EV_0²で、Eは地表面粗度や高さ等に依存する。平均高さHの平方根に一律比例するものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.8（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 8,
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q9",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "圧縮力を負担する構造耐力上主要な部分である柱の有効細長比を150 以下とした。",
      "イ": "9 cm角の木材の筋かいを入れた軸組の倍率（壁倍率）を３とし、９cm角の木材の筋かいをたすき掛けに入れた軸組の倍率（壁倍率）を５とした。",
      "ウ": "布基礎の底盤の厚さを、所定の構造計算を行わず、12 cmとした。",
      "エ": "建築物の高さが７m、延べ面積が300 m²であったので、壁量の検討及び耐力壁の釣合いのよい配置の検討を行い、許容応力度計算は行わなかった。"
    },
    "originalContent": {
      "body": "木造軸組工法による地上２階建ての建築物に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "圧縮力を負担する構造耐力上主要な部分である柱の有効細長比を150 以下とした。",
        "イ": "9 cm角の木材の筋かいを入れた軸組の倍率（壁倍率）を３とし、９cm角の木材の筋かいをたすき掛けに入れた軸組の倍率（壁倍率）を５とした。",
        "ウ": "布基礎の底盤の厚さを、所定の構造計算を行わず、12 cmとした。",
        "エ": "建築物の高さが７m、延べ面積が300 m²であったので、壁量の検討及び耐力壁の釣合いのよい配置の検討を行い、許容応力度計算は行わなかった。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。所定の計算によらない布基礎の底盤厚さは15cm以上が必要であり、12cmでは不足する。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。木造の構造耐力上主要な圧縮柱の有効細長比は150以下とする。座屈を防ぐための仕様上の上限である。",
      "イ": "正しい。9cm角の筋かいは壁倍率3、たすき掛けはその2倍を基本とするが上限5を適用するため壁倍率5となる。",
      "ウ": "誤り。所定の計算によらない布基礎の底盤厚さは15cm以上が必要であり、12cmでは不足する。",
      "エ": "正しい。2025年4月の規模見直し後も、2階建て・高さ7m・延べ面積300m²は所定の仕様規定による設計ができ、許容応力度計算の必須範囲には入らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.9（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 9,
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q10",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 10,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による地上２階建ての建築物において、「木造の建築物の軸組の構造方法及び設置の基準を定める件（昭和56 年建設省告示第1100 号）」第４（いわゆる四分割法）に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "建築物の平面を分割する1/4の線上に耐力壁の中心線があったので、当該壁を側端部分の存在壁量に算入した。",
      "イ": "壁量充足率の算定において、側端部分は、建築物の張り間方向にあっては桁行方向の、桁行方向にあっては張り間方向の両端から1/4の部分とした。",
      "ウ": "各階の張り間方向及び桁行方向のそれぞれについて、「壁量充足率の小さいほう」を「壁量充足率の大きいほう」で除して壁率比を求めた。",
      "エ": "検討する方向の各側端部分の壁量充足率がそれぞれ0.4 及び1.2 であったので、当該階のその方向については、偏心率の確認を行わず、壁率比の規定を満足すると判断した。"
    },
    "originalContent": {
      "body": "木造軸組工法による地上２階建ての建築物において、「木造の建築物の軸組の構造方法及び設置の基準を定める件（昭和56 年建設省告示第1100 号）」第４（いわゆる四分割法）に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "建築物の平面を分割する1/4の線上に耐力壁の中心線があったので、当該壁を側端部分の存在壁量に算入した。",
        "イ": "壁量充足率の算定において、側端部分は、建築物の張り間方向にあっては桁行方向の、桁行方向にあっては張り間方向の両端から1/4の部分とした。",
        "ウ": "各階の張り間方向及び桁行方向のそれぞれについて、「壁量充足率の小さいほう」を「壁量充足率の大きいほう」で除して壁率比を求めた。",
        "エ": "検討する方向の各側端部分の壁量充足率がそれぞれ0.4 及び1.2 であったので、当該階のその方向については、偏心率の確認を行わず、壁率比の規定を満足すると判断した。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。誤り。両端の充足率がともに1以上ではなく、壁率比0.4/1.2＝1/3も0.5未満なので規定を満たさない。偏心率による別の確認なしには適合と判断できない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。四分割線上に中心線がある耐力壁は側端部分の存在壁量に算入する。壁全体が内側にある場合だけに限定しない。",
      "イ": "正しい。各検討方向に対して、その直交方向の両端1/4の側端部分を取り出して必要壁量・存在壁量を比較する。",
      "ウ": "正しい。壁率比は小さい側の充足率÷大きい側の充足率であり、偏りが小さいほど1に近づく。",
      "エ": "誤り。両端の充足率がともに1以上ではなく、壁率比0.4/1.2＝1/3も0.5未満なので規定を満たさない。偏心率による別の確認なしには適合と判断できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.10（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 9,
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q11",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 11,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "梁のあばら筋比及び柱の帯筋比は、それぞれ0.2 %以上とする。",
      "イ": "柱の帯筋は、高強度せん断補強筋を除き、135 度フックを設ける代わりに、必要溶接長さを満たせば、帯筋相互を片面溶接とすることができる。",
      "ウ": "梁において、長期荷重時に正負最大曲げモーメントを受ける部分の引張鉄筋断面積は、引張鉄筋比で0.4 %以上となる面積、又は、存在応力によって必要とされる量の4/3倍のうち、小さいほうの数値以上とする。",
      "エ": "梁における圧縮側の主筋は、一般に、地震時荷重に対する靱性の確保には効果がない。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "梁のあばら筋比及び柱の帯筋比は、それぞれ0.2 %以上とする。",
        "イ": "柱の帯筋は、高強度せん断補強筋を除き、135 度フックを設ける代わりに、必要溶接長さを満たせば、帯筋相互を片面溶接とすることができる。",
        "ウ": "梁において、長期荷重時に正負最大曲げモーメントを受ける部分の引張鉄筋断面積は、引張鉄筋比で0.4 %以上となる面積、又は、存在応力によって必要とされる量の4/3倍のうち、小さいほうの数値以上とする。",
        "エ": "梁における圧縮側の主筋は、一般に、地震時荷重に対する靱性の確保には効果がない。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。誤り。圧縮側の主筋も曲げ圧縮力を負担し、コンクリートの圧壊を遅らせるなど、梁の塑性変形能力・靱性の向上に有効である。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。梁のあばら筋比と柱の帯筋比は、ともに0.2%以上を基本の下限とする。せん断補強とコンクリート拘束のためである。",
      "イ": "正しい。高強度せん断補強筋を除き、必要溶接長さ等を満足する所定の溶接閉鎖型帯筋を用いることができる。",
      "ウ": "正しい。梁の最小引張鉄筋量は、引張鉄筋比0.4%の量と必要量の4/3倍の小さいほう以上という規定による。",
      "エ": "誤り。圧縮側の主筋も曲げ圧縮力を負担し、コンクリートの圧壊を遅らせるなど、梁の塑性変形能力・靱性の向上に有効である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.11（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 10,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q12",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 12,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造の配筋に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "大梁の上端筋において、ガス圧接継手を梁端部から梁せいDの1/2離れた位置に設けた。",
      "イ": "大梁の下端筋において、主筋相互の重ね継手位置を重ね継手長さの1/2ずつずらして配筋した。",
      "ウ": "柱梁接合部内の応力伝達を考慮し、大梁の下端筋を上向きに折り曲げて定着させた。",
      "エ": "基礎梁せいが大きかったので、基礎梁に水平な打継ぎ部を設け、打継ぎ部のあばら筋はフック付き重ね継手とした。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造の配筋に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "大梁の上端筋において、ガス圧接継手を梁端部から梁せいDの1/2離れた位置に設けた。",
        "イ": "大梁の下端筋において、主筋相互の重ね継手位置を重ね継手長さの1/2ずつずらして配筋した。",
        "ウ": "柱梁接合部内の応力伝達を考慮し、大梁の下端筋を上向きに折り曲げて定着させた。",
        "エ": "基礎梁せいが大きかったので、基礎梁に水平な打継ぎ部を設け、打継ぎ部のあばら筋はフック付き重ね継手とした。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。誤り。梁端は地震時に曲げが大きくなり塑性ヒンジとなり得る。梁端からD/2の位置に上端筋のガス圧接継手を設けることは不適当で、応力の小さい位置に配置する。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "誤り。梁端は地震時に曲げが大きくなり塑性ヒンジとなり得る。梁端からD/2の位置に上端筋のガス圧接継手を設けることは不適当で、応力の小さい位置に配置する。",
      "イ": "正しい。重ね継手は継手長さの1/2以上ずらして集中を避けるよう配筋する。断面内で一斉に継手が生じることを防ぐ。",
      "ウ": "正しい。下端筋を上向きに曲げて定着し、柱梁接合部の圧縮ストラット等による応力伝達を確保する。",
      "エ": "正しい。せいの大きな基礎梁を水平打継ぎする場合、あばら筋に所定のフック付き重ね継手を設けることができる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.12（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 10,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q13",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 13,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造の設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "片側スラブ付き梁部材の曲げ剛性の算定において、スラブの効果を無視して計算を行った。",
      "イ": "曲げ降伏する梁部材の靱性を高めるために、梁せい及び引張側の鉄筋量を変えることなく、梁幅を大きくした。",
      "ウ": "梁において、上端筋のコンクリートに対する許容付着応力度は、下端筋よりも小さい値を用いた。",
      "エ": "柱梁接合部のせん断終局強度に基づいてせん断破壊に対する安全性の検討を行ったので、許容せん断力を用いた安全性の検討を省略した。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造の設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "片側スラブ付き梁部材の曲げ剛性の算定において、スラブの効果を無視して計算を行った。",
        "イ": "曲げ降伏する梁部材の靱性を高めるために、梁せい及び引張側の鉄筋量を変えることなく、梁幅を大きくした。",
        "ウ": "梁において、上端筋のコンクリートに対する許容付着応力度は、下端筋よりも小さい値を用いた。",
        "エ": "柱梁接合部のせん断終局強度に基づいてせん断破壊に対する安全性の検討を行ったので、許容せん断力を用いた安全性の検討を省略した。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。誤り。片側スラブも梁の曲げ剛性を増加させ、剛性分布や応力分担に影響するため、曲げ剛性の算定で一律に無視できない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "誤り。片側スラブも梁の曲げ剛性を増加させ、剛性分布や応力分担に影響するため、曲げ剛性の算定で一律に無視できない。",
      "イ": "正しい。幅を増すと引張鉄筋比が低くなり、圧縮域の負担が相対的に減るため、曲げ降伏後の靱性向上に有効である。",
      "ウ": "正しい。上端筋は打込み時の沈下やブリーディングの影響で付着が低下しやすく、下端筋より小さい許容付着応力度を用いる。",
      "エ": "正しい。柱梁接合部について所定のせん断終局強度による安全確認を行った場合、許容せん断力による確認を省略できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.13（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 10,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q14",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 14,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄筋の短期許容応力度は、一般に、JISに定められた最小の規格降伏点の数値を用いる。",
      "イ": "保有水平耐力計算では、部材の破壊形式、寸法、配筋、応力などに応じて構造特性係数D_sを算出する。",
      "ウ": "保有水平耐力計算では、一般に、保有水平耐力を発揮したときの変形と、大地震時の最大応答変形が一致する。",
      "エ": "限界耐力計算では、地震に対しては損傷限界と安全限界に対する性能を確認する。"
    },
    "originalContent": {
      "body": "鉄筋コンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "鉄筋の短期許容応力度は、一般に、JISに定められた最小の規格降伏点の数値を用いる。",
        "イ": "保有水平耐力計算では、部材の破壊形式、寸法、配筋、応力などに応じて構造特性係数D_sを算出する。",
        "ウ": "保有水平耐力計算では、一般に、保有水平耐力を発揮したときの変形と、大地震時の最大応答変形が一致する。",
        "エ": "限界耐力計算では、地震に対しては損傷限界と安全限界に対する性能を確認する。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。保有水平耐力は静的な崩壊機構形成時の耐力であり、その変形が大地震の最大応答変形と一般に一致するわけではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。鉄筋の短期許容応力度は一般に規格降伏点に対応する値を用い、長期許容値と異なる。",
      "イ": "正しい。構造特性係数D_sは柱等の破壊形式・寸法・配筋・応力等から靱性を評価し、部材群の性状に応じて定める。",
      "ウ": "誤り。保有水平耐力は静的な崩壊機構形成時の耐力であり、その変形が大地震の最大応答変形と一般に一致するわけではない。",
      "エ": "正しい。限界耐力計算は地震に対して損傷限界・安全限界を設定し、それぞれに必要な性能を確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.14（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 11,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q15",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 15,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄骨構造の筋かいに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "座屈拘束ブレースの芯材の周囲に設けられる座屈拘束材は、芯材の座屈を拘束するだけの剛性や曲げ耐力を必要とする一方、軸力を負担しない。",
      "イ": "有効細長比λが中程度の筋かい（λ＝80 程度）は、有効細長比λが小さい筋かい（λ＝20 程度）に比べて塑性変形能力が高い。",
      "ウ": "溝形鋼を用いた筋かい材とガセットプレートとの高力ボルト摩擦接合において、高力ボルトを筋かい材の軸方向に二列で同本数配置する場合、筋かい材の有効断面積は、一般に、高力ボルトの本数が多くなるほど大きくなる。",
      "エ": "筋かい材とガセットプレートとの接合部の溶接を側面隅肉溶接とするとき、筋かいの軸方向力は、せん断力によりガセットプレートに伝達される。"
    },
    "originalContent": {
      "body": "鉄骨構造の筋かいに関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "座屈拘束ブレースの芯材の周囲に設けられる座屈拘束材は、芯材の座屈を拘束するだけの剛性や曲げ耐力を必要とする一方、軸力を負担しない。",
        "イ": "有効細長比λが中程度の筋かい（λ＝80 程度）は、有効細長比λが小さい筋かい（λ＝20 程度）に比べて塑性変形能力が高い。",
        "ウ": "溝形鋼を用いた筋かい材とガセットプレートとの高力ボルト摩擦接合において、高力ボルトを筋かい材の軸方向に二列で同本数配置する場合、筋かい材の有効断面積は、一般に、高力ボルトの本数が多くなるほど大きくなる。",
        "エ": "筋かい材とガセットプレートとの接合部の溶接を側面隅肉溶接とするとき、筋かいの軸方向力は、せん断力によりガセットプレートに伝達される。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。誤り。中程度の細長比の筋かいは座屈後の耐力劣化が大きく、細長比の小さい筋かいに比べて塑性変形能力が高いとはいえない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。座屈拘束材は芯材の曲げ・座屈を抑える部材で、軸力は芯材に負担させる。拘束材への軸力伝達を避ける構造とする。",
      "イ": "誤り。中程度の細長比の筋かいは座屈後の耐力劣化が大きく、細長比の小さい筋かいに比べて塑性変形能力が高いとはいえない。",
      "ウ": "正しい。ボルトを軸方向に多数配置すると応力の伝達が分散され、突出脚の無効部分が減少するため、有効断面積は一般に大きくなる。",
      "エ": "正しい。側面隅肉溶接では、筋かいの軸力を溶接ののど断面のせん断力としてガセットプレートへ伝達する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.15（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 11,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q16",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "溶接継目ののど断面に対する長期許容せん断応力度は、溶接継目の形式が「完全溶込み溶接の場合」と「部分溶込み溶接の場合」とで異なる。",
      "イ": "組立溶接において、ビードの長さが短い溶接は、冷却時間が短いことから、塑性変形能力の低下や低温割れが生じる危険性が高い。",
      "ウ": "高力ボルト摩擦接合部の破断耐力の検討に当たっては、摩擦接合面がすべって支圧接合状態となったことを想定することができる。",
      "エ": "高力ボルト摩擦接合の二面せん断の長期許容せん断応力度は、高力ボルトの基準張力T_0（単位N／mm²）の0.6 倍である。"
    },
    "originalContent": {
      "body": "鉄骨構造の接合部に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "溶接継目ののど断面に対する長期許容せん断応力度は、溶接継目の形式が「完全溶込み溶接の場合」と「部分溶込み溶接の場合」とで異なる。",
        "イ": "組立溶接において、ビードの長さが短い溶接は、冷却時間が短いことから、塑性変形能力の低下や低温割れが生じる危険性が高い。",
        "ウ": "高力ボルト摩擦接合部の破断耐力の検討に当たっては、摩擦接合面がすべって支圧接合状態となったことを想定することができる。",
        "エ": "高力ボルト摩擦接合の二面せん断の長期許容せん断応力度は、高力ボルトの基準張力T_0（単位N／mm²）の0.6 倍である。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。誤り。溶接継目の長期許容せん断応力度は、完全溶込みと部分溶込みで同じ基準による。許容引張応力度等の違いと混同しない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "誤り。溶接継目の長期許容せん断応力度は、完全溶込みと部分溶込みで同じ基準による。許容引張応力度等の違いと混同しない。",
      "イ": "正しい。短いビードは急冷されやすく、硬化による塑性変形能力の低下や低温割れの危険性を高める。",
      "ウ": "正しい。破断耐力の検討では、すべり後にボルト軸と孔壁が接して支圧により力を伝える状態を想定できる。",
      "エ": "正しい。二面せん断の長期許容せん断応力度は、基準張力T_0に対する所定の係数0.6を用いる。一面せん断の値と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.16（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 11,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q17",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 17,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "鉄骨構造の耐震設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "高さ12 m、最大スパン10 mの建築物を「ルート１－２」によって設計できることを確認したが、「ルート３」によって設計した。",
      "イ": "建築物を「ルート２」で設計したので、標準せん断力係数を0.2 として地震力の算定を行った。",
      "ウ": "地震時のねじれ変形を抑制する目的で、各階の剛性率ができるだけ大きくなるように建築物を設計した。",
      "エ": "柱及び梁の部材群としての種別がＣであったので、種別がＡの場合よりも構造特性係数D_sの値を大きくして建築物を設計した。"
    },
    "originalContent": {
      "body": "鉄骨構造の耐震設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "高さ12 m、最大スパン10 mの建築物を「ルート１－２」によって設計できることを確認したが、「ルート３」によって設計した。",
        "イ": "建築物を「ルート２」で設計したので、標準せん断力係数を0.2 として地震力の算定を行った。",
        "ウ": "地震時のねじれ変形を抑制する目的で、各階の剛性率ができるだけ大きくなるように建築物を設計した。",
        "エ": "柱及び梁の部材群としての種別がＣであったので、種別がＡの場合よりも構造特性係数D_sの値を大きくして建築物を設計した。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。ねじれ変形の抑制には偏心率を小さくする。剛性率は主として高さ方向の剛性の偏りを評価する指標である。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。ルート1-2の適用範囲内であっても、より詳細な保有水平耐力計算を行うルート3を選ぶことができる。",
      "イ": "正しい。鉄骨造ルート2では一次設計の地震力に標準せん断力係数0.2を用いる。ルート1-2の割増し条件とは異なる。",
      "ウ": "誤り。ねじれ変形の抑制には偏心率を小さくする。剛性率は主として高さ方向の剛性の偏りを評価する指標である。",
      "エ": "正しい。部材群CはAより靱性が小さいため、構造特性係数D_sを大きくし、必要な保有水平耐力を増やす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.17（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 12,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q18",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "梁の塑性変形能力は、使用する鋼材の降伏比が小さいほど向上する。",
      "イ": "弱軸まわりに曲げを受けるＨ形鋼の許容曲げ応力度は、幅厚比の制限に従う場合、許容引張応力度と同じ値とすることができる。",
      "ウ": "梁の弱軸まわりの細長比が200 で、梁の全長にわたって均等間隔で横補剛を設ける場合、梁の鋼種がSN400 BよりSN490 Bのほうが横補剛の必要箇所は多くなる。",
      "エ": "圧縮材の許容圧縮応力度は、鋼材及び部材の座屈長さが同じ場合、座屈軸まわりの断面二次半径が小さいほど大きくなる。"
    },
    "originalContent": {
      "body": "鉄骨構造の設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "梁の塑性変形能力は、使用する鋼材の降伏比が小さいほど向上する。",
        "イ": "弱軸まわりに曲げを受けるＨ形鋼の許容曲げ応力度は、幅厚比の制限に従う場合、許容引張応力度と同じ値とすることができる。",
        "ウ": "梁の弱軸まわりの細長比が200 で、梁の全長にわたって均等間隔で横補剛を設ける場合、梁の鋼種がSN400 BよりSN490 Bのほうが横補剛の必要箇所は多くなる。",
        "エ": "圧縮材の許容圧縮応力度は、鋼材及び部材の座屈長さが同じ場合、座屈軸まわりの断面二次半径が小さいほど大きくなる。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。誤り。断面二次半径が小さいと細長比が大きくなり、座屈しやすいため許容圧縮応力度は小さくなる。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。降伏比が小さい鋼材ほど降伏後から最大強度までの余裕があり、一般に塑性変形能力を確保しやすい。",
      "イ": "正しい。H形鋼の弱軸曲げは通常の強軸曲げの横座屈と異なり、幅厚比制限を満たせば許容曲げ応力度を許容引張応力度と同値にできる。",
      "ウ": "正しい。高強度のSN490Bは材料強度に対して座屈が先行しやすく、同じ細長比のSN400Bより横補剛間隔を小さくする必要がある。",
      "エ": "誤り。断面二次半径が小さいと細長比が大きくなり、座屈しやすいため許容圧縮応力度は小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.18（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 12,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q19",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "圧密沈下は、有効応力の増加により、間隙水の排出を伴いながら地盤が徐々に沈下していく現象である。",
      "イ": "地盤の許容支持力度は、標準貫入試験によるN値が同じ場合、一般に、粘性土地盤に比べて砂質土地盤のほうが大きい。",
      "ウ": "地盤の極限鉛直支持力は、一般に、土のせん断破壊が生じることにより決定される。",
      "エ": "主働土圧は、地下壁や擁壁が地盤から離れる方向に変位するときに、最終的に一定値に落ち着いた状態で発揮される土圧である。"
    },
    "originalContent": {
      "body": "土質及び地盤に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "圧密沈下は、有効応力の増加により、間隙水の排出を伴いながら地盤が徐々に沈下していく現象である。",
        "イ": "地盤の許容支持力度は、標準貫入試験によるN値が同じ場合、一般に、粘性土地盤に比べて砂質土地盤のほうが大きい。",
        "ウ": "地盤の極限鉛直支持力は、一般に、土のせん断破壊が生じることにより決定される。",
        "エ": "主働土圧は、地下壁や擁壁が地盤から離れる方向に変位するときに、最終的に一定値に落ち着いた状態で発揮される土圧である。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。誤り。同じN値なら一般に粘性土地盤より砂質土地盤の許容支持力度が大きいとはいえず、簡易評価では粘性土側が大きい。土質別の支持力式を用いる必要がある。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。圧密は有効応力の増加に伴って間隙水が排出され、時間をかけて体積が減少する現象である。",
      "イ": "誤り。同じN値なら一般に粘性土地盤より砂質土地盤の許容支持力度が大きいとはいえず、簡易評価では粘性土側が大きい。土質別の支持力式を用いる必要がある。",
      "ウ": "正しい。極限支持力は基礎下の土がせん断破壊機構を形成する状態を基に定まる。許容支持力では沈下等も別途検討する。",
      "エ": "正しい。壁が背面地盤から離れる方向に変位すると土圧は減少し、最終的に主働土圧の状態に達する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.19（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 13,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q20",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 20,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "杭基礎に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "弾性支承梁理論の適用条件は、地震時の地盤変位が小さく、かつ、杭変形に影響を与える範囲の地盤がほぼ均一とみなせることである。",
      "イ": "長い杭において、杭頭が回転拘束の場合、杭の曲げ剛性、杭幅及び杭に作用する水平力が同じであれば、水平地盤反力係数が大きいほど杭頭の曲げモーメントは小さくなる。",
      "ウ": "長い杭において、杭の曲げ剛性、杭幅及び杭に作用する水平力が同じであれば、水平地盤反力係数が大きいほど杭頭の水平変位は大きくなる。",
      "エ": "応答変位法は、地震時の杭頭に作用する水平力と地盤変位を考慮して杭応力等を計算する方法であり、地震時に液状化しやすい軟弱地盤における杭の検討にも適用できる。"
    },
    "originalContent": {
      "body": "杭基礎に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "弾性支承梁理論の適用条件は、地震時の地盤変位が小さく、かつ、杭変形に影響を与える範囲の地盤がほぼ均一とみなせることである。",
        "イ": "長い杭において、杭頭が回転拘束の場合、杭の曲げ剛性、杭幅及び杭に作用する水平力が同じであれば、水平地盤反力係数が大きいほど杭頭の曲げモーメントは小さくなる。",
        "ウ": "長い杭において、杭の曲げ剛性、杭幅及び杭に作用する水平力が同じであれば、水平地盤反力係数が大きいほど杭頭の水平変位は大きくなる。",
        "エ": "応答変位法は、地震時の杭頭に作用する水平力と地盤変位を考慮して杭応力等を計算する方法であり、地震時に液状化しやすい軟弱地盤における杭の検討にも適用できる。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。水平地盤反力係数が大きい地盤ほど杭を強く拘束するため、同じ水平力による杭頭水平変位は小さくなる。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。弾性支承梁理論は杭を弾性梁、地盤をばねとして扱うため、地盤変位が小さく、影響範囲の地盤が概ね均一な場合に適用する。",
      "イ": "正しい。水平地盤反力係数が大きいと杭の変形・曲げが生じる範囲が短くなり、同じ水平力に対する杭頭曲げモーメントは小さくなる。",
      "ウ": "誤り。水平地盤反力係数が大きい地盤ほど杭を強く拘束するため、同じ水平力による杭頭水平変位は小さくなる。",
      "エ": "正しい。応答変位法は上部構造からの慣性力と地盤の変位による作用を考慮し、液状化を生じ得る軟弱地盤の杭にも用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.20（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 13,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q21",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 21,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "杭基礎及び直接基礎に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "地盤沈下が生じている埋立て地盤において、杭に負の摩擦力が生じる可能性がある場合、杭の表面に潤滑材を塗布することは杭の摩擦力低減に効果がある。",
      "イ": "斜面上部の水平面に建つ建築物を支持する杭基礎に地震力等の水平力が作用した場合、斜面近傍の杭は斜面から離れた杭に比べて、負担せん断力は大きくなる。",
      "ウ": "地震時に杭に作用する水平力は、基礎スラブの根入れ深さに応じて一定の範囲で低減できるが、建築物の地上部分の高さが大きいほど、この低減の度合いは小さくなる。",
      "エ": "直接基礎の即時沈下の計算において、粘性土地盤及び砂質土地盤ともに、地盤の変形係数及びポアソン比を適切に設定した弾性体と仮定してもよい。"
    },
    "originalContent": {
      "body": "杭基礎及び直接基礎に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "地盤沈下が生じている埋立て地盤において、杭に負の摩擦力が生じる可能性がある場合、杭の表面に潤滑材を塗布することは杭の摩擦力低減に効果がある。",
        "イ": "斜面上部の水平面に建つ建築物を支持する杭基礎に地震力等の水平力が作用した場合、斜面近傍の杭は斜面から離れた杭に比べて、負担せん断力は大きくなる。",
        "ウ": "地震時に杭に作用する水平力は、基礎スラブの根入れ深さに応じて一定の範囲で低減できるが、建築物の地上部分の高さが大きいほど、この低減の度合いは小さくなる。",
        "エ": "直接基礎の即時沈下の計算において、粘性土地盤及び砂質土地盤ともに、地盤の変形係数及びポアソン比を適切に設定した弾性体と仮定してもよい。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。誤り。斜面近傍では地盤の水平抵抗が低下し、他の杭との分担を考慮すると一般に負担せん断力は小さくなる。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。杭表面の潤滑材は地盤沈下により杭へ下向きに作用する負の摩擦力を低減する方法の一つである。",
      "イ": "誤り。斜面近傍では地盤の水平抵抗が低下し、他の杭との分担を考慮すると一般に負担せん断力は小さくなる。",
      "ウ": "正しい。根入れ部の抵抗による杭負担水平力の低減は、建物の高さが大きく転倒の影響が強いほど小さくなる。",
      "エ": "正しい。即時沈下は砂質土・粘性土とも、適切な弾性定数を設定した弾性体として計算できる。圧密沈下は別途評価する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.21（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 13,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q22",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 22,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "プレストレストコンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "プレストレストコンクリート部材は、地震による繰返し荷重に対して、ひび割れが閉じて変形も元に戻る復元性を有しており、地震後の残留変形が小さい。",
      "イ": "パーシャルプレストレッシングの設計（Ⅱ種）は、長期設計荷重時に断面に引張応力が生じないように制限するものである。",
      "ウ": "アンボンドPC鋼材を用いたポストテンション梁部材では、常時荷重の保持に対して冗長性を高めるために、バックアップシステムを設ける必要がある。",
      "エ": "PC鋼材定着部では、コンクリートの支圧破壊を避けるために、支圧板とコンクリート端面との接触面積が広くなるように設計する。"
    },
    "originalContent": {
      "body": "プレストレストコンクリート構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "プレストレストコンクリート部材は、地震による繰返し荷重に対して、ひび割れが閉じて変形も元に戻る復元性を有しており、地震後の残留変形が小さい。",
        "イ": "パーシャルプレストレッシングの設計（Ⅱ種）は、長期設計荷重時に断面に引張応力が生じないように制限するものである。",
        "ウ": "アンボンドPC鋼材を用いたポストテンション梁部材では、常時荷重の保持に対して冗長性を高めるために、バックアップシステムを設ける必要がある。",
        "エ": "PC鋼材定着部では、コンクリートの支圧破壊を避けるために、支圧板とコンクリート端面との接触面積が広くなるように設計する。"
      }
    },
    "officialAnswerNumber": "2",
    "answer": "イ",
    "explanation": "公式正答は2。誤り。Ⅱ種のパーシャルプレストレッシングは所定の引張応力を許容する。長期荷重時の引張応力を許さないのはⅠ種の設計である。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。プレストレスによって開いたひび割れが閉じやすく、原点復帰性が高いことから地震後の残留変形が小さい。",
      "イ": "誤り。Ⅱ種のパーシャルプレストレッシングは所定の引張応力を許容する。長期荷重時の引張応力を許さないのはⅠ種の設計である。",
      "ウ": "正しい。アンボンドPC鋼材は定着部の損傷等で部材全体の緊張力を失う可能性があるため、常時荷重を保持するバックアップを設ける。",
      "エ": "正しい。定着部の局部圧縮応力を減らして支圧破壊を防ぐため、支圧板の接触面積を確保し、補強筋等も配する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.22（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 14,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q23",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "壁式鉄筋コンクリート構造と壁式プレキャスト鉄筋コンクリート構造は、一つの建築物の同じ階で混用することができない。",
      "イ": "H形断面の鉄骨梁と鉄筋コンクリートスラブを緊結した合成梁では、一般に、下フランジの局部座屈の検討を行う必要があるが、上フランジの局部座屈の検討は省略することができる。",
      "ウ": "桁行方向を鉄骨鉄筋コンクリート構造、張り間方向を鉄筋コンクリート構造として設計する場合に、方向別にそれぞれの構造計算等の規定を適用することができる。",
      "エ": "コンクリート充塡鋼管（CFT）造の柱では、梁から伝達されるせん断力の一部を充塡コンクリートに負担させる場合、鋼管と充塡コンクリートとの間で応力伝達ができるように設計する必要がある。"
    },
    "originalContent": {
      "body": "各種建築構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "壁式鉄筋コンクリート構造と壁式プレキャスト鉄筋コンクリート構造は、一つの建築物の同じ階で混用することができない。",
        "イ": "H形断面の鉄骨梁と鉄筋コンクリートスラブを緊結した合成梁では、一般に、下フランジの局部座屈の検討を行う必要があるが、上フランジの局部座屈の検討は省略することができる。",
        "ウ": "桁行方向を鉄骨鉄筋コンクリート構造、張り間方向を鉄筋コンクリート構造として設計する場合に、方向別にそれぞれの構造計算等の規定を適用することができる。",
        "エ": "コンクリート充塡鋼管（CFT）造の柱では、梁から伝達されるせん断力の一部を充塡コンクリートに負担させる場合、鋼管と充塡コンクリートとの間で応力伝達ができるように設計する必要がある。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。誤り。壁式RC構造と壁式プレキャストRC構造は、接合部の応力伝達など所定の条件を満たせば同一階で混用できる。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "誤り。壁式RC構造と壁式プレキャストRC構造は、接合部の応力伝達など所定の条件を満たせば同一階で混用できる。",
      "イ": "正しい。上フランジはRCスラブによって拘束されるため局部座屈の検討を省略できるが、拘束されない下フランジの検討は必要となる。",
      "ウ": "正しい。方向によって構造種別が異なる場合、それぞれの方向に対応する構造計算等の規定を適用できる。",
      "エ": "正しい。CFT柱のコンクリートに梁のせん断力を伝えるためには、ダイアフラム等による鋼管とコンクリート間の応力伝達を確保する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.23（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 14,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q24",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 24,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "制振構造及び免震構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "制振構造において、せん断パネルを鋼材ダンパーとして比較的高い剛性の支持部材を介して架構に設置した場合、せん断パネルのせん断変形角は層間変形角に比べて大きくなる。",
      "イ": "制振構造に用いられるオイルダンパーは、建築物の揺れが比較的小さな段階から制振効果を発揮する。",
      "ウ": "超高層の免震建築物に用いられる直動型転がり支承は、転倒モーメントによりアイソレータに大きな引張軸力が生じる場合などに採用される。",
      "エ": "免震構造に用いられる積層ゴムアイソレータでは、長期荷重時の外周部の圧縮応力度は、中心部の圧縮応力度より大きくなる。"
    },
    "originalContent": {
      "body": "制振構造及び免震構造に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "制振構造において、せん断パネルを鋼材ダンパーとして比較的高い剛性の支持部材を介して架構に設置した場合、せん断パネルのせん断変形角は層間変形角に比べて大きくなる。",
        "イ": "制振構造に用いられるオイルダンパーは、建築物の揺れが比較的小さな段階から制振効果を発揮する。",
        "ウ": "超高層の免震建築物に用いられる直動型転がり支承は、転倒モーメントによりアイソレータに大きな引張軸力が生じる場合などに採用される。",
        "エ": "免震構造に用いられる積層ゴムアイソレータでは、長期荷重時の外周部の圧縮応力度は、中心部の圧縮応力度より大きくなる。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。誤り。積層ゴムの圧縮応力度は、自由膨張しやすい外周部より拘束の強い中心部で大きくなる。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。支持部材が硬いと層間変形が小さなせん断パネルに集中し、パネル自身のせん断変形角は層間変形角より大きくなる。",
      "イ": "正しい。オイルダンパーは速度に応じて抵抗を生じ、鋼材の降伏を要しないため小さな揺れから制振効果を発揮できる。",
      "ウ": "正しい。直動型転がり支承は引張力にも抵抗できる形式があり、超高層建物の転倒による引張軸力に対応するため用いられる。",
      "エ": "誤り。積層ゴムの圧縮応力度は、自由膨張しやすい外周部より拘束の強い中心部で大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.24（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 15,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q25",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 25,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築物の耐震設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄筋コンクリート造の腰壁付き梁の剛性は、腰壁と柱との間に完全スリットを設けた場合であっても、腰壁の影響を考慮する必要がある。",
      "イ": "保有水平耐力は、建築物の一部又は全体が地震力の作用によって崩壊形を形成する場合において、各階の柱、耐力壁及び筋かいが負担する水平せん断力の和として求められる値である。",
      "ウ": "鉄骨造の筋かい付き架構の構造特性係数D_sは、筋かいが所定の条件を満足する場合、柱及び梁の部材群の種別が同一で筋かいのない架構の構造特性係数D_sに比べて、小さくすることができる。",
      "エ": "各階の必要保有水平耐力の算定において、ある階の剛性率が所定の数値未満の場合、全ての階ではなく、当該階のみ必要保有水平耐力を割増しすればよい。"
    },
    "originalContent": {
      "body": "建築物の耐震設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "鉄筋コンクリート造の腰壁付き梁の剛性は、腰壁と柱との間に完全スリットを設けた場合であっても、腰壁の影響を考慮する必要がある。",
        "イ": "保有水平耐力は、建築物の一部又は全体が地震力の作用によって崩壊形を形成する場合において、各階の柱、耐力壁及び筋かいが負担する水平せん断力の和として求められる値である。",
        "ウ": "鉄骨造の筋かい付き架構の構造特性係数D_sは、筋かいが所定の条件を満足する場合、柱及び梁の部材群の種別が同一で筋かいのない架構の構造特性係数D_sに比べて、小さくすることができる。",
        "エ": "各階の必要保有水平耐力の算定において、ある階の剛性率が所定の数値未満の場合、全ての階ではなく、当該階のみ必要保有水平耐力を割増しすればよい。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。通常の筋かい付き架構は座屈等の影響で純ラーメンより靱性が低く、同じ部材群種別でも構造特性係数を小さくする扱いではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。柱とのスリットで柱への拘束を除いても、腰壁と梁が一体なら梁自体の曲げ剛性を増すため、その影響を考慮する。",
      "イ": "正しい。保有水平耐力は、崩壊機構時に当該階の柱・耐力壁・筋かいが負担する水平せん断力の和である。",
      "ウ": "誤り。通常の筋かい付き架構は座屈等の影響で純ラーメンより靱性が低く、同じ部材群種別でも構造特性係数を小さくする扱いではない。",
      "エ": "正しい。剛性率が不足する階では、その階の形状係数によって必要保有水平耐力を割り増す。全階一律の割増しではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.25（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 15,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q26",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 26,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築物の構造設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "超高層建築物に作用する風圧力に対する構造計算を行う場合、水平面内での風向に直交する方向及びねじれ方向の建築物の振動についても考慮する必要がある。",
      "イ": "プレストレストコンクリート構造において、クリープ等によるプレストレスの減少率は、一般に、プレテンション方式に比べて、ポストテンション方式のほうが小さい。",
      "ウ": "鉄骨構造において、露出柱脚の最大せん断耐力は、一般に、「摩擦により抵抗するせん断耐力」と「アンカーボルトのせん断耐力の和」のいずれか大きいほうとする。",
      "エ": "開口部を有する鉄筋コンクリート造の耐力壁のせん断耐力を計算する場合、開口部の面積の影響を考慮すれば、開口部の長さ及び高さの影響を無視してよい。"
    },
    "originalContent": {
      "body": "建築物の構造設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "超高層建築物に作用する風圧力に対する構造計算を行う場合、水平面内での風向に直交する方向及びねじれ方向の建築物の振動についても考慮する必要がある。",
        "イ": "プレストレストコンクリート構造において、クリープ等によるプレストレスの減少率は、一般に、プレテンション方式に比べて、ポストテンション方式のほうが小さい。",
        "ウ": "鉄骨構造において、露出柱脚の最大せん断耐力は、一般に、「摩擦により抵抗するせん断耐力」と「アンカーボルトのせん断耐力の和」のいずれか大きいほうとする。",
        "エ": "開口部を有する鉄筋コンクリート造の耐力壁のせん断耐力を計算する場合、開口部の面積の影響を考慮すれば、開口部の長さ及び高さの影響を無視してよい。"
      }
    },
    "officialAnswerNumber": "4",
    "answer": "エ",
    "explanation": "公式正答は4。誤り。開口の影響は面積だけでなく、長さと高さによっても耐力低減を評価する。同面積でも開口形状によって壁の抵抗が異なる。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。超高層建物は風向方向だけでなく、渦励振等による風直交方向及びねじれ振動も設計上重要となる。",
      "イ": "正しい。ポストテンションはプレテンションより比較的高い材齢で緊張するため、一般にクリープ等による緊張力の低下率が小さい。",
      "ウ": "正しい。露出柱脚の最大せん断耐力は、摩擦抵抗とアンカーボルト抵抗の単純加算ではなく、一般にいずれか大きい値による。",
      "エ": "誤り。開口の影響は面積だけでなく、長さと高さによっても耐力低減を評価する。同面積でも開口形状によって壁の抵抗が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.26（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 16,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q27",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "木材を常時湿潤状態にある部分に使用する場合、繊維方向の許容応力度は、所定の割合で減じた数値とする。",
      "イ": "繊維方向のせん断に対する許容応力度は、一般に、同樹種であれば、構造用製材より構造用集成材のほうが大きい。",
      "ウ": "木材の繊維方向の短期許容応力度は、積雪時の構造計算以外の場合、長期許容応力度の２倍と定められている。",
      "エ": "製材の日本農林規格において、機械等級区分構造用製材は、構造用製材のうち、人工乾燥処理を施した材のヤング係数を機械によって測定し、等級区分したものである。"
    },
    "originalContent": {
      "body": "木材及び木質系材料に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "木材を常時湿潤状態にある部分に使用する場合、繊維方向の許容応力度は、所定の割合で減じた数値とする。",
        "イ": "繊維方向のせん断に対する許容応力度は、一般に、同樹種であれば、構造用製材より構造用集成材のほうが大きい。",
        "ウ": "木材の繊維方向の短期許容応力度は、積雪時の構造計算以外の場合、長期許容応力度の２倍と定められている。",
        "エ": "製材の日本農林規格において、機械等級区分構造用製材は、構造用製材のうち、人工乾燥処理を施した材のヤング係数を機械によって測定し、等級区分したものである。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。通常の長期許容応力度は1.1F/3、短期は2F/3であり、比は2/1.1。単純に長期の2倍と定められているのではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。湿潤状態の木材は強度等が低下するため、繊維方向の許容応力度を所定の係数で低減する。",
      "イ": "正しい。同樹種の構造用集成材は、一般に構造用製材より大きい繊維方向の許容せん断応力度が与えられる。",
      "ウ": "誤り。通常の長期許容応力度は1.1F/3、短期は2F/3であり、比は2/1.1。単純に長期の2倍と定められているのではない。",
      "エ": "正しい。機械等級区分構造用製材は、人工乾燥した材のヤング係数を測定するなどして等級を区分する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.27（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 16,
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338"
    ]
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q28",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "圧縮強度試験用供試体を用いた圧縮強度試験において、コンクリートの圧縮強度は、一般に、載荷速度が大きいほど小さい。",
      "イ": "コンクリートの引張強度は、一般に、水セメント比が大きいほど小さい。",
      "ウ": "コンクリートの曲げ強度は、一般に、引張強度が大きいほど大きい。",
      "エ": "コンクリートのヤング係数は、一般に、水セメント比が小さいほど大きい。"
    },
    "originalContent": {
      "body": "コンクリートに関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "圧縮強度試験用供試体を用いた圧縮強度試験において、コンクリートの圧縮強度は、一般に、載荷速度が大きいほど小さい。",
        "イ": "コンクリートの引張強度は、一般に、水セメント比が大きいほど小さい。",
        "ウ": "コンクリートの曲げ強度は、一般に、引張強度が大きいほど大きい。",
        "エ": "コンクリートのヤング係数は、一般に、水セメント比が小さいほど大きい。"
      }
    },
    "officialAnswerNumber": "1",
    "answer": "ア",
    "explanation": "公式正答は1。誤り。載荷速度が大きいほど、一般に測定される圧縮強度は大きくなる。試験値を比較するため載荷速度を規定している。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "誤り。載荷速度が大きいほど、一般に測定される圧縮強度は大きくなる。試験値を比較するため載荷速度を規定している。",
      "イ": "正しい。水セメント比が大きいほど組織が粗くなり、一般に引張強度も低下する。",
      "ウ": "正しい。曲げ破壊は引張側のひび割れに関係するため、引張強度が大きいほど一般に曲げ強度も大きい。",
      "エ": "正しい。水セメント比が小さいほど圧縮強度が高くなり、他条件が同等なら一般にヤング係数も大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.28（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 16,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q29",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
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
      "ア": "シャルピー衝撃試験の吸収エネルギーが大きい鋼材を使用することは、溶接部の脆性的破壊を防ぐために有効である。",
      "イ": "板厚40 mm以下の建築構造用圧延鋼材SN490 Bについて、基準強度Fは325 N／mm²であり、短期荷重に対する許容引張応力度はこれに等しい。",
      "ウ": "建築構造用圧延鋼材SN400 の鋼板の厚さのマイナス許容差は、一般構造用圧延鋼材SS400 と同じである。",
      "エ": "リン（P）は鋼材及び溶接部の靱性を劣化させ、硫黄（S）は鋼の延性や靱性に悪影響を及ぼすので、これらの含有量が少ない鋼材を使用することが望ましい。"
    },
    "originalContent": {
      "body": "鋼材に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "シャルピー衝撃試験の吸収エネルギーが大きい鋼材を使用することは、溶接部の脆性的破壊を防ぐために有効である。",
        "イ": "板厚40 mm以下の建築構造用圧延鋼材SN490 Bについて、基準強度Fは325 N／mm²であり、短期荷重に対する許容引張応力度はこれに等しい。",
        "ウ": "建築構造用圧延鋼材SN400 の鋼板の厚さのマイナス許容差は、一般構造用圧延鋼材SS400 と同じである。",
        "エ": "リン（P）は鋼材及び溶接部の靱性を劣化させ、硫黄（S）は鋼の延性や靱性に悪影響を及ぼすので、これらの含有量が少ない鋼材を使用することが望ましい。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。SN材の板厚のマイナス許容差は原則0.3mmと厳しく管理され、一般構造用SS材と同じではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。シャルピー吸収エネルギーが大きいことは靱性が高い目安であり、溶接接合部の脆性破壊防止に有効である。",
      "イ": "正しい。板厚40mm以下のSN490Bの基準強度Fは325N/mm²であり、短期許容引張応力度もこの値を用いる。",
      "ウ": "誤り。SN材の板厚のマイナス許容差は原則0.3mmと厳しく管理され、一般構造用SS材と同じではない。",
      "エ": "正しい。リンは低温靱性、硫黄は延性・靱性等を損なうため、溶接性や変形能力を確保する上で含有量を制限する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.29（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 17,
    "officialReferenceUrls": []
  },
  {
    "id": "kenchikushi1-2025-annual-kozo-q30",
    "exam": "kenchikushi1",
    "session": "kozo",
    "year": 2025,
    "season": "annual",
    "qNumber": 30,
    "subject": "構造",
    "type": "multiple-choice",
    "category": "構造",
    "topicTags": [
      "構造"
    ],
    "difficulty": 3,
    "question": "建築物等の構造計画及び構造設計に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "補強コンクリートブロック造の塀の構造計算に用いる地下部分の水平震度は、建築物の地下部分と同様に計算することができる。",
      "イ": "コンクリート充塡鋼管（CFT）造柱の特徴の一つであるコンファインド効果は、短柱において角形鋼管より円形鋼管のほうがその効果が高い。",
      "ウ": "国土交通大臣が定めた構造方法によるプレキャスト鉄筋コンクリート造の柱及び梁における、鉄筋に対する最小かぶり厚さは、鉄筋コンクリート造の場合と同じ厚さである。",
      "エ": "鋼管杭の設計においては、地盤が強い酸性ではない場合、一般に、その鋼管の腐食代として厚さ１mmを見込む。"
    },
    "originalContent": {
      "body": "建築物等の構造計画及び構造設計に関する次の記述のうち、最も不適当なものはどれか。",
      "choices": {
        "ア": "補強コンクリートブロック造の塀の構造計算に用いる地下部分の水平震度は、建築物の地下部分と同様に計算することができる。",
        "イ": "コンクリート充塡鋼管（CFT）造柱の特徴の一つであるコンファインド効果は、短柱において角形鋼管より円形鋼管のほうがその効果が高い。",
        "ウ": "国土交通大臣が定めた構造方法によるプレキャスト鉄筋コンクリート造の柱及び梁における、鉄筋に対する最小かぶり厚さは、鉄筋コンクリート造の場合と同じ厚さである。",
        "エ": "鋼管杭の設計においては、地盤が強い酸性ではない場合、一般に、その鋼管の腐食代として厚さ１mmを見込む。"
      }
    },
    "officialAnswerNumber": "3",
    "answer": "ウ",
    "explanation": "公式正答は3。誤り。所定のプレキャストRCの柱・梁では製作精度等を考慮した最小かぶり厚さの特例があり、現場打ちRCと常に同じ厚さではない。\n法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "choiceExplanations": {
      "ア": "正しい。補強コンクリートブロック塀の地下部分の設計水平震度も、建築物の地下部分と同じ計算方法を適用できる。",
      "イ": "正しい。円形鋼管はコンクリートを周方向に均等に拘束するため、角形鋼管よりコンファインド効果が大きい。",
      "ウ": "誤り。所定のプレキャストRCの柱・梁では製作精度等を考慮した最小かぶり厚さの特例があり、現場打ちRCと常に同じ厚さではない。",
      "エ": "正しい。強酸性等の特別な腐食条件がなければ、鋼管杭は一般に厚さ1mmを腐食代として見込む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年一級建築士試験 学科Ⅳ（構造）No.30（問題・最終正答）。解説は独自作成。",
    "lawReferenceDate": "2025-01-01",
    "questionNotice": "法令は出題時点に基づく。指定された省エネ関連改正法令（令和4年法律第69号・令和6年政令第172号・令和6年国土交通省令第68号）については2025-04-01現在の施行規定を適用する例外あり。",
    "license": "JAEIC-owner-approved-staging",
    "publicAllowed": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "sourcePage": 17,
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338"
    ]
  }
];
