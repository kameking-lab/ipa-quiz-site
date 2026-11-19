import type { Question } from "@/lib/questions/types";

export const DENKO2_2020_SECOND_PM: Question[] = [
  {
    "id": "denko2-2020-second-pm-q1",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "a−b間の電圧"
    ],
    "difficulty": 3,
    "question": "a−b間の電圧",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "電源は直列で合計200 V。抵抗の電流は200÷(20+30)=4 Aで、上側20 Ωで80 V降下する。aを基準にbは100−80=20 V。",
    "choiceExplanations": {
      "ア": "上側抵抗での電圧降下を引くと20 Vになる。",
      "イ": "aを0 Vに取るとbは20 Vになる。",
      "ウ": "30 Ωは下側抵抗の値で、端子間電圧ではない。",
      "エ": "4 Aを20 Ωに掛けた80 Vを使って求める。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q01.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問1 a−b間の電圧の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=5",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q2",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "同材質の銅線の抵抗比"
    ],
    "difficulty": 3,
    "question": "同材質の銅線の抵抗比",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "抵抗は長さに比例し、断面積に反比例する。AはBの2倍の長さで、断面積は1/4なので、抵抗は8倍。",
    "choiceExplanations": {
      "ア": "長さも断面積も等しくない。",
      "イ": "長さの比だけを考慮した値。",
      "ウ": "断面積の違いだけを考慮した値。",
      "エ": "長さ2倍と断面積1/4を両方考慮した値。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q02.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問2 同材質の銅線の抵抗比の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=5",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q3",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "接触抵抗で生じる熱量"
    ],
    "difficulty": 3,
    "question": "接触抵抗で生じる熱量",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "ジュール熱はI²Rt。10²×0.2×3,600=72,000 Jなので72 kJ。",
    "choiceExplanations": {
      "ア": "秒に直して計算すると72 kJ。",
      "イ": "72 kJをさらに2倍する条件はない。",
      "ウ": "接触点1か所の発熱量は288 kJにならない。",
      "エ": "通電時間は1時間なので576 kJにはならない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q03.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問3 接触抵抗で生じる熱量の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=5",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q4",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "直列交流回路の力率"
    ],
    "difficulty": 3,
    "question": "直列交流回路の力率",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "抵抗の電圧は電流と同相なので、力率は抵抗の電圧180 Vを電源電圧204 Vで割った約88%。",
    "choiceExplanations": {
      "ア": "抵抗の電圧と電源電圧の比は0.35ではない。",
      "イ": "96÷204はリアクタンス側の電圧比。",
      "ウ": "抵抗の電圧比は0.65より大きい。",
      "エ": "180÷204≒0.882を百分率で表した値。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q04.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問4 直列交流回路の力率の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=5",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q5",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "三相Y結線の線間電圧"
    ],
    "difficulty": 3,
    "question": "三相Y結線の線間電圧",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "平衡Y結線の相電圧は15×10=150 V。線間電圧は相電圧の√3倍なので、選択肢では260 Vが最も近い。",
    "choiceExplanations": {
      "ア": "150 Vは相電圧。",
      "イ": "√2倍する関係ではない。",
      "ウ": "150√3 Vは約260 V。",
      "エ": "相電圧を単純に2倍する関係ではない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q05.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問5 三相Y結線の線間電圧の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=5",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q6",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "単相2線式配線の電圧降下"
    ],
    "difficulty": 3,
    "question": "単相2線式配線の電圧降下",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "負荷電流は1,600÷100=16 A。電線は往復24 mで抵抗は0.12 Ω。電圧降下は16×0.12=1.92 V。",
    "choiceExplanations": {
      "ア": "片道だけで計算すると約1 Vになる。",
      "イ": "2本の電線を合計すると約2 V。",
      "ウ": "抵抗値と負荷電流から求まる値より大きい。",
      "エ": "往復の降下をさらに2倍する必要はない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q06.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問6 単相2線式配線の電圧降下の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=6",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q7",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "単相3線式の電力損失"
    ],
    "difficulty": 3,
    "question": "単相3線式の電力損失",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "両側の負荷電流が等しく中性線の電流は0 A。外側線2本で各20²×0.1=40 Wが失われ、合計80 W。",
    "choiceExplanations": {
      "ア": "外側1線分だけの損失。",
      "イ": "この条件では外側2線に等しく40 Wずつ生じる。",
      "ウ": "中性線の損失が0 Wなので40+40=80 W。",
      "エ": "3本すべてに20 Aが流れるとした値。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q07.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問7 単相3線式の電力損失の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=6",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q8",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "金属管内の電線の許容電流"
    ],
    "difficulty": 3,
    "question": "金属管内の電線の許容電流",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "軟銅線3.5 mm²の基準となる電流37 Aに、本問の低減係数0.63を掛けると約23 Aになる。",
    "choiceExplanations": {
      "ア": "基準の電流を約30 Aとすると生じる値。",
      "イ": "37×0.63≒23 A。",
      "ウ": "37 Aに指定の係数を掛けた値より大きい。",
      "エ": "低減係数を考慮した電流は49 Aより小さい。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q08.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問8 金属管内の電線の許容電流の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=6",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q9",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "電気理論・配電",
    "topicTags": [
      "電動機を接続した低圧屋内幹線"
    ],
    "difficulty": 3,
    "question": "電動機を接続した低圧屋内幹線",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "需要率を反映した電流は12×5×0.8=48 A。本問では電動機負荷の補正1.25を掛け、60 Aとなる。",
    "choiceExplanations": {
      "ア": "需要率までを反映し、電動機負荷の補正が抜けている。",
      "イ": "48×1.25=60 A。",
      "ウ": "本問の需要率と補正率の組合せでは66 Aにならない。",
      "エ": "需要率を100%のままとして1.25を掛けた値。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q09.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問9 電動機を接続した低圧屋内幹線の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=6",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q10",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "低圧分岐回路の遮断器・電線・コンセント"
    ],
    "difficulty": 3,
    "question": "低圧分岐回路の遮断器・電線・コンセント",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "遮断器の定格に対して電線の最小太さとコンセントの許容定格をそれぞれ照合する。図では40 A・8 mm²・30 Aの組合せが適切。",
    "choiceExplanations": {
      "ア": "20 Aの遮断器に30 Aのコンセントを組み合わせている。",
      "イ": "30 Aの遮断器に対して直径2.0 mmの電線では不足する。",
      "ウ": "40 A・8 mm²・30 Aの組合せは条件を満たす。",
      "エ": "15 Aコンセントを30 A分岐回路に2個取り付ける組合せは適さない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q10.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問10 低圧分岐回路の遮断器・電線・コンセントの原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=7",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q11",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "金属管が集まる場所で通線を助ける器具"
    ],
    "difficulty": 3,
    "question": "金属管が集まる場所で通線を助ける器具",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "プルボックスは電線管が集まる箇所などで、電線を引き入れる作業に使う。",
    "choiceExplanations": {
      "ア": "分電盤は回路を分け、遮断器などを収める。",
      "イ": "プルボックスを中継点にすることで通線しやすくなる。",
      "ウ": "フィクスチュアスタッドは器具の取付けに使う。",
      "エ": "スイッチボックスはスイッチ等を収める。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q11.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問11 金属管が集まる場所で通線を助ける器具の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=7",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q12",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "絶縁物の最高許容温度"
    ],
    "difficulty": 3,
    "question": "絶縁物の最高許容温度",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "比較の対象はシースではなく絶縁物。選択肢ではCVの架橋ポリエチレン絶縁が最高許容温度の最も高いものに当たる。",
    "choiceExplanations": {
      "ア": "CVは架橋ポリエチレン絶縁を使う。",
      "イ": "HIVの耐熱ビニル絶縁は、ここでの最高温度ではない。",
      "ウ": "VVRの電線の絶縁物はビニルである。",
      "エ": "IVもビニル絶縁である。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q12.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問12 絶縁物の最高許容温度の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=7",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q13",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "ねじなし電線管の曲げ加工"
    ],
    "difficulty": 3,
    "question": "ねじなし電線管の曲げ加工",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "電線管を曲げる工具はパイプベンダ。",
    "choiceExplanations": {
      "ア": "トーチランプは加熱用の工具。",
      "イ": "ディスクグラインダは切断や研削に使う。",
      "ウ": "パイプレンチは管を保持して回す工具。",
      "エ": "パイプベンダは電線管を所定の角度に曲げる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q13.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問13 ねじなし電線管の曲げ加工の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=7",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q14",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "三相誘導電動機の同期速度"
    ],
    "difficulty": 3,
    "question": "三相誘導電動機の同期速度",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "同期速度は120f/P。周波数60 Hz、極数4なので1,800 min⁻¹。",
    "choiceExplanations": {
      "ア": "60 Hzで1,200 min⁻¹になるのは6極。",
      "イ": "1,500 min⁻¹は50 Hz・4極の組合せ。",
      "ウ": "120×60÷4=1,800 min⁻¹。",
      "エ": "3,000 min⁻¹は50 Hz・2極の組合せ。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q14.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問14 三相誘導電動機の同期速度の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=7",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q15",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "漏電遮断器内の零相変流器"
    ],
    "difficulty": 3,
    "question": "漏電遮断器内の零相変流器",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "零相変流器は電路を出入りする電流の和を検出する。漏電で和が0でなくなることを地絡電流の検出に使う。",
    "choiceExplanations": {
      "ア": "零相変流器の検出対象は電圧低下ではない。",
      "イ": "短絡電流の大きさを測る用途とは異なる。",
      "ウ": "電路の過電流の大きさを検出する役割とは異なる。",
      "エ": "電路外へ流れた地絡電流を電流差から検出する。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q15.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問15 漏電遮断器内の零相変流器の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=7",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q16",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "曲がった管路材料の識別"
    ],
    "difficulty": 3,
    "question": "曲がった管路材料の識別",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "写真の緩やかに曲がった金属製電線管用の部材はノーマルベンド。",
    "choiceExplanations": {
      "ア": "ユニバーサルとは形状が異なる。",
      "イ": "写真は曲がりを持つノーマルベンド。",
      "ウ": "ベンダは管を曲げる工具。",
      "エ": "カップリングは管の接続に用いる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q16.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問16 曲がった管路材料の識別の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=8",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q17",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "写真のコンデンサの用途"
    ],
    "difficulty": 3,
    "question": "写真のコンデンサの用途",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "銘板の40 μFは静電容量。交流回路の遅れ無効電力を補う進相コンデンサとして用いる。",
    "choiceExplanations": {
      "ア": "進相コンデンサは回路の力率改善に用いる。",
      "イ": "地絡電流の検出は零相変流器の役割。",
      "ウ": "ネオン放電灯の点灯に使う機器とは異なる。",
      "エ": "水銀灯の放電を安定させる器具は安定器。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q17.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問17 写真のコンデンサの用途の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=8",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q18",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "電気機器・材料・工具",
    "topicTags": [
      "写真の照度測定器"
    ],
    "difficulty": 3,
    "question": "写真の照度測定器",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "受光部があり、表示にlxが使われているので照度計。",
    "choiceExplanations": {
      "ア": "周波数の単位はHzである。",
      "イ": "検相器は三相の相順を調べる。",
      "ウ": "照度計は光を受け、測定値をlxで示す。",
      "エ": "クランプ形電流計には電線を挟む検出部がある。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q18.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問18 写真の照度測定器の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=8",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q19",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "電線の終端接続部の絶縁処理"
    ],
    "difficulty": 3,
    "question": "電線の終端接続部の絶縁処理",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "リングスリーブで接続した箇所をテープで覆う場合は、テープの種類と重ね方を併せて見る。本問の自己融着性絶縁テープを2層にした処理が不適切。",
    "choiceExplanations": {
      "ア": "本問に示された自己融着性絶縁テープ2層では不足する。",
      "イ": "黒色粘着性ポリエチレン絶縁テープを半幅以上重ねている。",
      "ウ": "指定のビニルテープを半幅以上重ねて6層にしている。",
      "エ": "差込形コネクタは接続部を絶縁体で覆う構造。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q19.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問19 電線の終端接続部の絶縁処理の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=8",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q20",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "屋内配線の場所と工事の組合せ"
    ],
    "difficulty": 3,
    "question": "屋内配線の場所と工事の組合せ",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "工事方法ごとに、露出・隠ぺい、点検の可否、湿気の条件を照合する。本問では乾燥した展開場所での金属ダクト工事が該当する。",
    "choiceExplanations": {
      "ア": "点検できない隠ぺい場所に金属線ぴ工事を組み合わせている。",
      "イ": "湿気の多い隠ぺい場所は平形保護層工事に適さない。",
      "ウ": "展開した場所でも湿気の条件がライティングダクト工事に適さない。",
      "エ": "乾燥した展開場所には金属ダクト工事を選べる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q20.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問20 屋内配線の場所と工事の組合せの原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=8",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q21",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "三相200 Vルームエアコンの屋内配線"
    ],
    "difficulty": 3,
    "question": "三相200 Vルームエアコンの屋内配線",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "本問では三相200 Vエアコンの電路を他負荷と共用の配線用遮断器に接続する案が不適切。",
    "choiceExplanations": {
      "ア": "簡易接触防護措置は充電部分に触れるのを防ぐ。",
      "イ": "漏電遮断器は漏電時の保護に用いる。",
      "ウ": "他の負荷と遮断器を共用する案が、専用の電路を用いる条件に合わない。",
      "エ": "屋内配線との直接接続はこの条件で適切。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q21.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問21 三相200 Vルームエアコンの屋内配線の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=9",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q22",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "金属製外箱のD種接地工事"
    ],
    "difficulty": 3,
    "question": "金属製外箱のD種接地工事",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "接地工事の省略可否は遮断器の性能だけでなく設置場所も確認する。設問の水気のある場所は、ニの条件で接地を省略できない。",
    "choiceExplanations": {
      "ア": "二次側非接地の絶縁変圧器を通す条件を使っている。",
      "イ": "設問の機器では直径1.6 mm軟銅線が接地線の条件に合う。",
      "ウ": "移動して用いる器具の多心コードの一心を接地線に使っている。",
      "エ": "水気のある場所なので、漏電遮断器を付けてもこの条件で接地は省略できない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q22.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問22 金属製外箱のD種接地工事の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=9",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q23",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "金属管内の電線と電磁的不平衡"
    ],
    "difficulty": 3,
    "question": "金属管内の電線と電磁的不平衡",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "同じ回路を構成する電線を同じ金属管に収め、管内の電流が打ち消し合う配置とする。",
    "choiceExplanations": {
      "ア": "各負荷の回路をそれぞれ一つの金属管にまとめている。",
      "イ": "回路の往復の導体が別々の管に分かれている。",
      "ウ": "一方の負荷回路の導体が別々の管に分かれている。",
      "エ": "三相の導体を相ごとに別の管へ入れている。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q23.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問23 金属管内の電線と電磁的不平衡の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=9",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q24",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "回路計の測定レンジ"
    ],
    "difficulty": 3,
    "question": "回路計の測定レンジ",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "アナログ式回路計で電圧を測るときは、予想値より上のレンジを選んで針の振り切れを防ぐ。",
    "choiceExplanations": {
      "ア": "想定値の直近上位のレンジなら振り切れを避けやすい。",
      "イ": "抵抗測定は通常、内部電池から直流を流して行う。",
      "ウ": "アナログ式でも抵抗測定には電池が必要。",
      "エ": "絶縁抵抗測定には所定の試験電圧を与える計器を用いる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q24.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問24 回路計の測定レンジの原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=9",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q25",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "単相3線式屋内配線の絶縁抵抗"
    ],
    "difficulty": 3,
    "question": "単相3線式屋内配線の絶縁抵抗",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "100/200 V単相3線式について、対地電圧と測定対象を確認する。本問で選ぶ下限は対地と電線相互のどちらも0.1 MΩ。",
    "choiceExplanations": {
      "ア": "対地・電線相互とも本問の下限と異なる。",
      "イ": "両方を0.2 MΩにする組合せではない。",
      "ウ": "対地も電線相互も0.1 MΩになる。",
      "エ": "電線相互を0.2 MΩにする点が異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q25.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問25 単相3線式屋内配線の絶縁抵抗の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=9",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q26",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "直読式接地抵抗計の補助接地極"
    ],
    "difficulty": 3,
    "question": "直読式接地抵抗計の補助接地極",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "被測定接地極、電位極、電流極の順に一直線に並べる。本問の選択肢では、補助接地極を順次約10 m離す配置が適切。",
    "choiceExplanations": {
      "ア": "被測定接地極を端にし、補助極を同一直線に順に並べている。",
      "イ": "被測定接地極を中央に置く配置は本問の測定方法と異なる。",
      "ウ": "1 m間隔では本問が求める配置と異なる。",
      "エ": "正三角形ではなく、端から一直線に並べる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q26.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問26 直読式接地抵抗計の補助接地極の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=10",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q27",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "導通試験の目的"
    ],
    "difficulty": 3,
    "question": "導通試験の目的",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "導通試験は電路が意図どおりつながっているか確かめる。充電の有無を確認する試験とは用途が異なる。",
    "choiceExplanations": {
      "ア": "充電の確認は導通試験の目的に含まれない。",
      "イ": "未接続なら導通の有無に現れる。",
      "ウ": "断線は導通試験で確認できる。",
      "エ": "意図した接続になっているかを判別できる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q27.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問27 導通試験の目的の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=10",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q28",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "電気の保安に関する法令の役割"
    ],
    "difficulty": 3,
    "question": "電気の保安に関する法令の役割",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "電気工作物の区分は電気事業法の体系で定められる。一般用電気工作物の定義を技術基準の省令によるとした記述が本問の誤り。",
    "choiceExplanations": {
      "ア": "電気工事士法は工事作業に従事する者の資格・義務を扱う。",
      "イ": "一般用電気工作物の定義の出典が違う。",
      "ウ": "電気用品安全法は電気用品による危険・障害の防止を目的とする。",
      "エ": "電気用品安全法には表示のない用品について工事での使用制限がある。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q28.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問28 電気の保安に関する法令の役割の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=10",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q29",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "特定電気用品の区分"
    ],
    "difficulty": 3,
    "question": "特定電気用品の区分",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "電気用品安全法施行令の別表で品目と定格範囲を照合する。選択肢では定格電流60 Aの配線用遮断器が該当する。",
    "choiceExplanations": {
      "ア": "金属製電線管は本問の特定電気用品に当たらない。",
      "イ": "指定範囲の配線用遮断器は特定電気用品に含まれる。",
      "ウ": "ケーブル配線用スイッチボックスはここでの特定電気用品ではない。",
      "エ": "導体150 mm²の絶縁電線は本問の範囲外。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q29.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問29 特定電気用品の区分の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=10",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q30",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "施工・法規・検査",
    "topicTags": [
      "一般用電気工作物の区分"
    ],
    "difficulty": 3,
    "question": "一般用電気工作物の区分",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "本問では受電電圧と発電設備の種類・出力を分けて照合する。低圧受電で15 kWの太陽電池発電設備を備える幼稚園が該当する。",
    "choiceExplanations": {
      "ア": "低圧受電でも15 kWの内燃力発電設備を備える条件が異なる。",
      "イ": "高圧受電のため本問の一般用電気工作物には当たらない。",
      "ウ": "低圧受電で、設問の15 kWの太陽電池発電設備を備える。",
      "エ": "受電電力が55 kWでも高圧受電である。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q30.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問30 一般用電気工作物の区分の原文・選択肢"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=10",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q31",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "コンセントの刃受の配置"
    ],
    "difficulty": 3,
    "question": "コンセントの刃受の配置",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "図の①の表示20 A・250 Vと接地極を読み、写真の極配置と照合する。",
    "choiceExplanations": {
      "ア": "横一文字が2つで、①の極配置と異なる。",
      "イ": "片方がL形、もう片方が横一文字で接地極もある。",
      "ウ": "縦一文字が2つで、①の250 V用の配置と異なる。",
      "エ": "縦一文字を含み、①の配置とは異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q31.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問31 コンセントの刃受の配置の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q32",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "配線図の器具の取付け面"
    ],
    "difficulty": 3,
    "question": "配線図の器具の取付け面",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "②の引出し線が指すコンセントの記号はカウンターの上側に並ぶ天井面取付けの記号。",
    "choiceExplanations": {
      "ア": "配線図の②の取付け面に一致する。",
      "イ": "②が指す記号は壁面取付けを示していない。",
      "ウ": "床面を示す記号ではない。",
      "エ": "二重床面を指定する記号ではない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q32.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問32 配線図の器具の取付け面の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q33",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "破線で示す配線方法"
    ],
    "difficulty": 3,
    "question": "破線で示す配線方法",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "③の破線は床隠ぺい配線を表す。引出し線の先を確認し、付近の実線と取り違えない。",
    "choiceExplanations": {
      "ア": "③に使われる線種とは異なる。",
      "イ": "壁隠ぺいと判断する表示ではない。",
      "ウ": "③が指す破線は床隠ぺい配線に対応する。",
      "エ": "露出配線を示す実線とは異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q33.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問33 破線で示す配線方法の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q34",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "配線図で指定された管の種類"
    ],
    "difficulty": 3,
    "question": "配線図で指定された管の種類",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "④のケーブル表記に続く（FEP）を読む。FEPは波付硬質合成樹脂管を表す。",
    "choiceExplanations": {
      "ア": "硬質塩化ビニル電線管はVEで表す。",
      "イ": "耐衝撃性硬質塩化ビニル電線管の表記ではない。",
      "ウ": "耐衝撃性の硬質塩化ビニル管を示す記号ではない。",
      "エ": "FEPは波付硬質合成樹脂管。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q34.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問34 配線図で指定された管の種類の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q35",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "分電盤のBE記号"
    ],
    "difficulty": 3,
    "question": "分電盤のBE記号",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "⑤はP-1のBE記号を指す。過負荷保護付漏電遮断器に当たる。",
    "choiceExplanations": {
      "ア": "配線用遮断器は図中でBと区別される。",
      "イ": "BEは過負荷保護付漏電遮断器を示す。",
      "ウ": "電動機用モータブレーカの記号ではない。",
      "エ": "カットアウトスイッチには別の記号を使う。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q35.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問35 分電盤のBE記号の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q36",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "三相200 V回路の対地絶縁抵抗"
    ],
    "difficulty": 3,
    "question": "三相200 V回路の対地絶縁抵抗",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "⑥は三相200 Vの回路に当たる。本問では対地電圧の区分に応じた絶縁抵抗の最小値として0.2 MΩを選ぶ。",
    "choiceExplanations": {
      "ア": "本問の対地電圧の区分に合わない。",
      "イ": "設問の回路に対応する下限は0.2 MΩ。",
      "ウ": "本問の回路に求める下限より大きい。",
      "エ": "本問の最小値は1.0 MΩではない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q36.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問36 三相200 V回路の対地絶縁抵抗の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q37",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "配線図のR記号"
    ],
    "difficulty": 3,
    "question": "配線図のR記号",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "⑦が指すRは、リモコンスイッチの信号によって負荷回路を開閉するリモコンリレー。",
    "choiceExplanations": {
      "ア": "図で指定されているのはリモコン回路のR。",
      "イ": "押しボタンの操作器ではない。",
      "ウ": "Rの表示を持つリモコンリレー。",
      "エ": "リモコンセレクタスイッチの記号ではない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q37.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問37 配線図のR記号の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q38",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "接地工事の種類と接地線"
    ],
    "difficulty": 3,
    "question": "接地工事の種類と接地線",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "⑧の接地記号と回路の電圧区分を確認する。本問で該当するのはD種接地工事で、接地線は直径1.6 mm。",
    "choiceExplanations": {
      "ア": "A種である点と線径が本問の条件と異なる。",
      "イ": "線径は合うが接地工事の種類が異なる。",
      "ウ": "D種は合うが、問われる最小太さではない。",
      "エ": "D種と直径1.6 mmの組合せが該当する。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q38.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問38 接地工事の種類と接地線の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q39",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "冷蔵庫回路のF付き開閉器"
    ],
    "difficulty": 3,
    "question": "冷蔵庫回路のF付き開閉器",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "⑨のSにF40 Aの表示がある。ヒューズ付き開閉器なので目的は過電流の遮断。",
    "choiceExplanations": {
      "ア": "三相の不平衡だけを判定する器具ではない。",
      "イ": "地絡電流のみを検出する器具ではない。",
      "ウ": "図の⑨には漏電検出を示す表示がない。",
      "エ": "Fはヒューズを表し、過電流を遮断する。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q39.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問39 冷蔵庫回路のF付き開閉器の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q40",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "引込線取付点の高さ"
    ],
    "difficulty": 3,
    "question": "引込線取付点の高さ",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "道路を横断しないこと、技術上やむを得ず交通に支障がないことを併せて読む。本問の条件での最小値は2.5 m。",
    "choiceExplanations": {
      "ア": "特例の下限より低い。",
      "イ": "設問の条件を全て満たすときの最小値。",
      "ウ": "2.5 mを上回り、問われる最小値ではない。",
      "エ": "設問の例外条件を踏まえた最小値とは異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q40.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問40 引込線取付点の高さの原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=11",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q41",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "ライティングダクトの識別"
    ],
    "difficulty": 3,
    "question": "ライティングダクトの識別",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "⑪のLKは配線図で照明に使うライティングダクトを示す。写真の内部に導体が見えるものを対応させる。",
    "choiceExplanations": {
      "ア": "内部に給電用の導体があるライティングダクト。",
      "イ": "樹脂製のカバー状で、給電用の導体がない。",
      "ウ": "配線を覆う部材で、図のLKが示す部材ではない。",
      "エ": "金属の溝形部材だが給電用導体を持つダクトではない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q41.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問41 ライティングダクトの識別の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=12",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q42",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "リングスリーブと圧着工具"
    ],
    "difficulty": 3,
    "question": "リングスリーブと圧着工具",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "⑫の接続に使うリングスリーブは写真の大。使用する工具はリングスリーブ用の圧着工具を選ぶ。",
    "choiceExplanations": {
      "ア": "スリーブの表示が中で、必要な大と異なる。",
      "イ": "工具はリングスリーブ向けだが、スリーブが中。",
      "ウ": "大のリングスリーブと対応する圧着工具の組合せ。",
      "エ": "大のスリーブだが圧着工具の種類が異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q42.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問42 リングスリーブと圧着工具の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=12",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q43",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "自動点滅器の識別"
    ],
    "difficulty": 3,
    "question": "自動点滅器の識別",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "⑬は照度に応じて負荷を切り替える自動点滅器の記号。写真では受光部があるものを選ぶ。",
    "choiceExplanations": {
      "ア": "自動点滅器に対応する。",
      "イ": "写真の手動操作部は図の自動点滅器と異なる。",
      "ウ": "ON・OFFの押しボタンで操作する器具。",
      "エ": "写真の埋込形の操作器は図の自動点滅器ではない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q43.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問43 自動点滅器の識別の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=12",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q44",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "リモコンリレーの識別"
    ],
    "difficulty": 3,
    "question": "リモコンリレーの識別",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "⑭が指すRを読み、制御側と負荷側の表示を持つリモコンリレーの写真を選ぶ。",
    "choiceExplanations": {
      "ア": "電路の過電流を遮断する器具。",
      "イ": "写真に示された器具はRが示すリモコンリレーと異なる。",
      "ウ": "目盛りのあるタイムスイッチ。",
      "エ": "Rに対応するリモコンリレー。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q44.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問44 リモコンリレーの識別の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=12",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q45",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "差込形コネクタの種類と最小個数"
    ],
    "difficulty": 3,
    "question": "差込形コネクタの種類と最小個数",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ア",
    "officialAnswerNumber": "イ",
    "explanation": "⑮の箱に入る線を接続点ごとに分けて数える。本問では2本の接続が1か所、3本の接続が2か所。",
    "choiceExplanations": {
      "ア": "2本用1個と3本用2個で各接続点を満たす。",
      "イ": "2本用2個と4本用1個では接続する線の組が異なる。",
      "ウ": "4本用コネクタを必要とする接続点はない。",
      "エ": "2本用3個では3本をつなぐ2か所を満たせない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q45.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問45 差込形コネクタの種類と最小個数の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=12",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q46",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "配線に必要なケーブルの最小心線数"
    ],
    "difficulty": 3,
    "question": "配線に必要なケーブルの最小心線数",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "⑯の区間を通る導体を複線図で数えると3心が必要。最小心線数の条件から3心ケーブル1本を選ぶ。",
    "choiceExplanations": {
      "ア": "2心だけでは必要な導体数を満たさない。",
      "イ": "3心ケーブル1本で足りる。",
      "ウ": "2心ケーブル2本では合計4心で最小ではない。",
      "エ": "2心と3心の2本では合計5心になり余る。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q46.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問46 配線に必要なケーブルの最小心線数の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=13",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q47",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "圧着接続のスリーブと刻印"
    ],
    "difficulty": 3,
    "question": "圧着接続のスリーブと刻印",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ハ",
    "explanation": "⑰の接続点ごとに導体の太さと本数を確認する。小の○刻印2個と中の中刻印2個を組み合わせる。",
    "choiceExplanations": {
      "ア": "全て小では接続する導体の組合せに合わない。",
      "イ": "小の刻印は2個とも○となり、片方が小の組合せは異なる。",
      "ウ": "小の○刻印2個と中の中刻印2個が対応する。",
      "エ": "中を使用する接続点が1か所では足りない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q47.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問47 圧着接続のスリーブと刻印の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=13",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q48",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "金属製分電盤の穴あけ工具"
    ],
    "difficulty": 3,
    "question": "金属製分電盤の穴あけ工具",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "⑱の金属製分電盤に使える穴あけ工具を区別する。らせん状の木工用ドリルは金属製分電盤には用いない。",
    "choiceExplanations": {
      "ア": "ホールソーは金属板用の製品があり穴あけに使える。",
      "イ": "ノックアウトパンチャは分電盤などの金属板に穴を開ける。",
      "ウ": "電動ドリルは金属用の刃を付けて使用できる。",
      "エ": "写真の刃は木材に穴を開けるタイプ。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q48.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問48 金属製分電盤の穴あけ工具の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=13",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q49",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "配線図に使われていないコンセント"
    ],
    "difficulty": 3,
    "question": "配線図に使われていないコンセント",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "エ",
    "officialAnswerNumber": "ニ",
    "explanation": "接地端子・接地極の有無と口数を、平面図の記号と写真で照合する。2口の接地極付コンセントが図に使われていない。",
    "choiceExplanations": {
      "ア": "接地端子付の器具に対応する図記号がある。",
      "イ": "接地極と接地端子を備えた器具に対応する記号がある。",
      "ウ": "20 A・250 Vのコンセントに対応する記号がある。",
      "エ": "2口の接地極付コンセントの記号は平面図にない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q49.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問49 配線図に使われていないコンセントの原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=13",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "denko2-2020-second-pm-q50",
    "exam": "denko2",
    "year": 2020,
    "season": "second",
    "session": "pm",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "配線図",
    "topicTags": [
      "プルボックスの形状と個数"
    ],
    "difficulty": 3,
    "question": "プルボックスの形状と個数",
    "choices": {
      "ア": "原本の（イ）",
      "イ": "原本の（ロ）",
      "ウ": "原本の（ハ）",
      "エ": "原本の（ニ）"
    },
    "answer": "イ",
    "officialAnswerNumber": "ロ",
    "explanation": "配線図でプルボックスに当たる四角い記号を数える。写真の金属製角形プルボックスが2個。",
    "choiceExplanations": {
      "ア": "写真の箱の種類が異なり、個数も違う。",
      "イ": "金属製角形のプルボックス2個が配線図に対応する。",
      "ウ": "同じ形状だが、図の記号の数より1個多い。",
      "エ": "写真の器具の種類も個数も異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/denko2/2020-second-pm/q50.webp",
      "/questions/denko2/2020-second-pm/wiring.webp",
      "/questions/denko2/2020-second-pm/wiring-conditions.webp"
    ],
    "imageAltTexts": [
      "令和2年度下期午後 問50 プルボックスの形状と個数の原文・選択肢",
      "店舗兼平屋建ての配線図・単線結線図",
      "配線図問題の共通条件"
    ],
    "sourcePdfUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_q02.pdf#page=13",
    "sourceAnswerUrl": "https://www.shiken.or.jp/construction/upload/20201004_co_second_a02.pdf",
    "sourceAttribution": "出典：電気技術者試験センター 令和2年度下期 第二種電気工事士筆記試験（午後）。",
    "sourceExamSession": "下期・午後",
    "license": "ECEE-educational-reuse",
    "lastUpdated": "2026-11-19"
  }
];
