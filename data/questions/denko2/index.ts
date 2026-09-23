import type { ChoiceKey, Question } from "@/lib/questions/types";

const sourcePdfUrl = "https://www.shiken.or.jp/construction/upload/20260524_co_second_q01.pdf";
const sourceAnswerUrl = "https://www.shiken.or.jp/construction/upload/20260524_co_second_a01.pdf";
const governmentRule = "https://www.meti.go.jp/policy/safety_security/industrial_safety/law/files/dengikaishaku.pdf";
const image = (name: string) => `/images/denko2/2026-first/${name}.png`;
const officialToSite: Record<string, ChoiceKey> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };

function question(
  number: number,
  fields: Omit<Question, "id" | "exam" | "session" | "year" | "season" | "qNumber" | "type" | "answer" | "sourcePdfUrl" | "sourceAnswerUrl" | "sourceAttribution" | "license" | "hasImage" | "lastUpdated"> & {
    officialAnswer: "イ" | "ロ" | "ハ" | "ニ";
    imageUrls?: string[];
  },
): Question {
  const { officialAnswer, ...rest } = fields;
  return {
    id: `denko2-2026-first-gakka-q${number}`,
    exam: "denko2",
    session: "gakka",
    year: 2026,
    season: "first",
    qNumber: number,
    type: "multiple-choice",
    ...rest,
    answer: officialToSite[officialAnswer],
    hasImage: Boolean(rest.imageUrls?.length || rest.choiceImageUrls),
    sourcePdfUrl,
    sourceAnswerUrl,
    sourceAttribution: `出典：令和8年度上期第二種電気工事士学科試験 問${number}（電気技術者試験センター）。改行・空白を整え、元のイ・ロ・ハ・ニをア・イ・ウ・エへ置換。図は原本から設問部分のみ切り出し。`,
    license: "ECEE-educational-reuse",
    lastUpdated: "2026-09-23",
  };
}

/** 公式2026年5月24日実施の学科問1〜10。全50問中の先行収録。 */
export const DENKO2_QUESTIONS: Question[] = [
  question(1, {
    officialAnswer: "イ", category: "電気理論", topicTags: ["合成抵抗", "短絡"], difficulty: 2,
    question: "図のような回路で、端子a-b間の合成抵抗［Ω］は。",
    choices: { ア: "2.5", イ: "5", ウ: "7.5", エ: "15" },
    explanation: "中央の縦線は導線で、右側の5Ωは導線により短絡される。左側の上下5Ωだけが並列に残り、1/R=1/5+1/5=2/5、R=2.5Ω。",
    choiceExplanations: {
      ア: "正解。右上の5Ωは導線と並列の短絡状態で電流が流れず、左上下の5Ωの並列は2.5Ω。",
      イ: "上か下の一方の5Ωだけを数えた値。左上下2本の経路は並列なので合成抵抗はその半分になる。",
      ウ: "直列5Ωと並列2.5Ωを足した値だが、右上の5Ωは導線に短絡されているため加算しない。",
      エ: "5Ωを3個直列に加えた値。回路の接続点を追うと並列・短絡があり、直列ではない。",
    }, imageUrls: [image("q1")], isCalculation: true,
  }),
  question(2, {
    officialAnswer: "ロ", category: "電気理論", topicTags: ["電線抵抗", "抵抗率"], difficulty: 2,
    question: "軟銅線の電気抵抗に関する記述として、誤っているものは。",
    choices: {
      ア: "電気抵抗は周囲温度が上昇すると大きくなる。",
      イ: "電気抵抗は軟銅線の断面積の2乗に反比例する。",
      ウ: "電気抵抗は軟銅線の長さに比例する。",
      エ: "抵抗率はアルミニウム線よりも低い。",
    },
    explanation: "一定温度ではR=ρL/A。長さLに比例し、断面積Aには1乗で反比例する。断面積の2乗に反比例するという記述が誤り。",
    choiceExplanations: {
      ア: "正しい。金属の抵抗は一般に温度上昇で増す。誤りを選ぶ本問の答えにはならない。",
      イ: "誤りで正解。R=ρL/Aなので断面積には1乗で反比例する。断面積が2倍なら抵抗は半分で、4分の1ではない。",
      ウ: "正しい。R=ρL/Aより、材質と断面積が同じなら長さを2倍にすると抵抗も2倍になる。",
      エ: "正しい。銅の抵抗率はアルミニウムより低く、同じ寸法なら銅線の抵抗の方が小さい。",
    },
  }),
  question(3, {
    officialAnswer: "ハ", category: "電気理論", topicTags: ["電力量", "発熱量"], difficulty: 1,
    question: "消費電力が300Wの電熱器を、2時間使用したときの発熱量［kJ］は。",
    choices: { ア: "600", イ: "1 080", ウ: "2 160", エ: "3 600" },
    explanation: "1W=1J/s。2時間=7200秒なので、300J/s×7200s=2,160,000J=2160kJ。",
    choiceExplanations: {
      ア: "300×2=600Whの数値をそのままkJとして扱ったもの。WhをkJに直すには3.6を掛ける。",
      イ: "600Whの換算係数を1.8とした値。正しい換算は1Wh=3.6kJである。",
      ウ: "正解。300W×2h=600Wh、600×3.6=2160kJ。",
      エ: "1kWh=3600kJをそのまま使った値。今回の使用電力量は0.6kWhである。",
    }, isCalculation: true,
  }),
  question(4, {
    officialAnswer: "ニ", category: "電気理論", topicTags: ["力率改善", "コンデンサ"], difficulty: 2,
    question: "図のような交流回路で、負荷に対してコンデンサCを設置して、力率を100%に改善した。このときの電流計の指示値は。",
    choices: {
      ア: "零になる。", イ: "コンデンサ設置前と比べて変化しない。", ウ: "コンデンサ設置前と比べて増加する。", エ: "コンデンサ設置前と比べて減少する。",
    },
    explanation: "並列コンデンサが負荷の遅れ無効電流を補償する。単相の有効電力P=VIcosφなので、力率cosφを1にすると、同じP・Vを供給する電源電流I=P/Vとなり、設置前より小さくなる。",
    choiceExplanations: {
      ア: "無効成分を打ち消しても有効電力を運ぶ電流は残るため、零にはならない。",
      イ: "補償で電源側の無効電流が減り、電流計が測る合成電流は変化する。",
      ウ: "同じ有効電力を供給する条件では、力率改善で電源電流は増えずに減る。",
      エ: "正解。コンデンサが無効電流を補償し、電源側で測る電流の大きさが減少する。",
    }, imageUrls: [image("q4")],
  }),
  question(5, {
    officialAnswer: "ロ", category: "電気理論", topicTags: ["三相交流", "Y結線", "断線"], difficulty: 3,
    question: "図のような三相3線式200Vの回路で、c-o間の抵抗が断線した。断線前と断線後のa-o間の電圧Vの値［V］の組合せとして、正しいものは。",
    choices: {
      ア: "断線前116、断線後116", イ: "断線前116、断線後100", ウ: "断線前100、断線後116", エ: "断線前100、断線後100",
    },
    explanation: "断線前は三相Y結線の各相電圧が200/√3≈116V。c-oが切れるとa-oとo-bの等しい抵抗2個が線間200Vに直列となり、それぞれ200/2=100V。",
    choiceExplanations: {
      ア: "断線前の116Vは正しいが、断線後も三相平衡とみなしている。断線後は残り2抵抗による分圧で100V。",
      イ: "正解。平衡時は200/√3≈116V、断線後は同じ抵抗2個の直列分圧で100V。",
      ウ: "平衡時の線間電圧200Vを2分割した100Vを断線前に適用している。平衡時は200/√3。",
      エ: "断線後の100Vは正しいが、断線前は三相Y結線なので相電圧は約116V。",
    }, imageUrls: [image("q5")], isCalculation: true,
  }),
  question(6, {
    officialAnswer: "ロ", category: "配電理論", topicTags: ["電圧降下", "電線抵抗"], difficulty: 2,
    question: "図のように、電線のこう長12mの配線により、消費電力1600Wの抵抗負荷に電力を供給した結果、負荷の両端の電圧は100Vであった。配線における電圧降下［V］は。ただし、電線の電気抵抗は長さ1000m当たり5.0Ωとする。",
    choices: { ア: "1", イ: "2", ウ: "3", エ: "4" },
    explanation: "負荷電流は1600W/100V=16A。電線は往路12m・復路12mの計24mで、抵抗は5.0Ω×24/1000=0.12Ω。電圧降下は16A×0.12Ω=1.92V、最も近い2V。",
    choiceExplanations: {
      ア: "片道12mのみで計算すると0.96V≈1V。電流は往路と復路の双方を通るので24mを数える。",
      イ: "正解。16A×(5Ω/1000m)×24m=1.92Vで、約2V。",
      ウ: "電線長や電流を過大に見積もった値。往復24m・16Aからは1.92Vになる。",
      エ: "負荷の電力や往復の長さを二重に計上した値。負荷電流は16A、線路抵抗は0.12Ω。",
    }, imageUrls: [image("q6")], isCalculation: true,
  }),
  question(7, {
    officialAnswer: "ニ", category: "配電理論", topicTags: ["単相3線式", "中性線"], difficulty: 3,
    question: "図のような単相3線式回路において、抵抗負荷は3.3Ωで一定である。スイッチSを開いているとき、図中の電圧Vは99Vであった。この状態からスイッチSを閉じた場合、電圧Vはどのように変化するか。ただし、電源電圧は105V一定で、電線1線当たりの抵抗は0.1Ωとする。",
    choices: { ア: "3V下がる。", イ: "変化しない。", ウ: "1V上がる。", エ: "3V上がる。" },
    explanation: "開時は上側負荷の電流が105/(3.3+0.1+0.1)=30Aで、負荷電圧99V。閉時は上下の負荷が等しく中性線電流が相殺される。上側は105/(3.3+0.1)≈30.88A、電圧は約101.91V≈102V。約3V上がる。",
    choiceExplanations: {
      ア: "閉時は中性線の電圧降下が消えるため、上側負荷の電圧は下がらず上がる。",
      イ: "上下同じ負荷をつなぐと中性線電流が打ち消され、開時の中性線0.1Ωによる降下がなくなる。",
      ウ: "変化の方向は上昇だが、開時99Vに対して閉時は約102Vで約3V上がる。",
      エ: "正解。閉時の電圧は105×3.3/(3.3+0.1)≈102V、99Vから約3V上昇。",
    }, imageUrls: [image("q7")], isCalculation: true,
  }),
  question(8, {
    officialAnswer: "ロ", category: "電気設備技術基準", topicTags: ["許容電流", "金属管"], difficulty: 2,
    question: "金属管による低圧屋内配線工事で、管内に断面積3.5mm²の600Vビニル絶縁電線（軟銅線）4本を収めて施設した場合の、電線1本当たりの許容電流［A］は。ただし、周囲温度は30℃以下、電流減少係数は0.63とする。",
    choices: { ア: "19", イ: "23", ウ: "31", エ: "49" },
    explanation: "電気設備の技術基準の解釈・第146条第2項146-2表で、3.5mm²軟銅線の基準許容電流は37A。4本を同じ金属管に収める146-4表の係数0.63を掛け、37×0.63=23.31A、選択肢では23A。令和7年11月20日改正版を試験時点の根拠とする。",
    choiceExplanations: {
      ア: "3.5mm²の基準値37Aと4本の係数0.63を組み合わせた値ではない。37×0.63≈23A。",
      イ: "正解。第146条146-2表の37Aに146-4表の0.63を掛けると23.31A。",
      ウ: "3.5mm²の基準許容電流を49Aと読み違えた場合の49×0.63≈31A。49Aは5.5mm²以上8mm²未満の行。",
      エ: "5.5mm²以上8mm²未満の基準許容電流の値。3.5mm²は37Aで、管内4本の減少係数も必要。",
    }, officialReferenceUrls: [governmentRule], isCalculation: true, lawReferenceDate: "2025-11-20",
  }),
  question(9, {
    officialAnswer: "イ", category: "電気設備技術基準", topicTags: ["幹線", "電動機"], difficulty: 2,
    question: "図のように、三相の電動機と電熱器が低圧屋内幹線に接続されている場合、幹線の太さを決める根拠となる電流の最小値［A］は。ただし、需要率は100%とする。",
    choices: { ア: "45", イ: "50", ウ: "55", エ: "60" },
    explanation: "電動機10A、電熱器15Aと20Aで、他の負荷は計35A。電動機の合計10Aは他負荷35Aより小さいので、電気設備の技術基準の解釈第148条第1項第二号の原則どおり10+15+20=45A。",
    choiceExplanations: {
      ア: "正解。電動機10Aはその他負荷35A以下なので、幹線電流の下限は全負荷の合計45A。",
      イ: "電動機10Aへ1.5倍を適用すると50Aになるが、第148条で起動電流分を加える条件は電動機合計が他負荷合計より大きい場合に限る。",
      ウ: "モーターへ過大な倍率を掛けた値。10Aの電動機は他負荷35Aより小さく、加算補正は不要。",
      エ: "需要率100%の各定格10A・15A・20Aの和45Aを超える。条件にない余裕率を上乗せしない。",
    }, imageUrls: [image("q9")], officialReferenceUrls: [governmentRule], isCalculation: true, lawReferenceDate: "2025-11-20",
  }),
  question(10, {
    officialAnswer: "ハ", category: "電気設備技術基準", topicTags: ["分岐回路", "配線用遮断器", "コンセント"], difficulty: 3,
    question: "低圧屋内配線の分岐回路の設計で、配線用遮断器、分岐回路の電線の太さ及びコンセントの組合せとして、適切なものは。ただし、分岐点から配線用遮断器までは3m、配線用遮断器からコンセントまでは8mとし、電線の数値は分岐回路の電線（軟銅線）の太さを示す。また、コンセントは兼用コンセントではないものとする。",
    choices: {
      ア: "配線用遮断器20A・電線直径1.6mm・定格電流30Aのコンセント1個",
      イ: "配線用遮断器30A・電線直径2.0mm・定格電流30Aのコンセント1個",
      ウ: "配線用遮断器20A・電線直径2.0mm・定格電流20Aのコンセント1個",
      エ: "配線用遮断器30A・電線直径2.6mm・定格電流15Aのコンセント2個",
    },
    choiceImageUrls: { ア: image("q10-a"), イ: image("q10-b"), ウ: image("q10-c"), エ: image("q10-d") },
    explanation: "経産省『電気設備の技術基準の解釈』第149条第1項、149-2表・149-3表を照合する。20A配線用遮断器に直径2.0mm軟銅線、定格20Aコンセント1個の組合せが適切。原本の4肢の回路図は各選択肢に個別表示。令和7年11月20日改正版を試験時点の根拠とする。",
    choiceExplanations: {
      ア: "20A配線用遮断器と1.6mm電線の組合せだけで判断しない。149-3表ではこの遮断器に30A定格コンセントは組み合わせられない。",
      イ: "30A遮断器には149-2表の通常条件で直径2.6mm以上の軟銅線が必要。2.0mmでは不足する。",
      ウ: "正解。20A配線用遮断器、直径2.0mm電線、20Aコンセントは149-2表と149-3表の組合せに適合。",
      エ: "30A遮断器に2.6mm電線はよいが、149-3表に照らして定格15Aのコンセント2個はこの30A分岐回路に適合しない。",
    }, officialReferenceUrls: [governmentRule], lawReferenceDate: "2025-11-20",
  }),
];
