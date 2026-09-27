import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const mlitRepairUrl = "https://www.cgr.mlit.go.jp/cmc/common/img/training/repair2021/text_repair2021_07.pdf";
const mlitComparisonUrl = "https://www.qsr.mlit.go.jp/kyugi/site_files/file/08_m_hibiwarehoshukoho.pdf";
const ceriFreezeUrl = "https://zairyo.ceri.go.jp/ceri_zairyo/topics5/togaitebiki201705.pdf";
const niesConcreteUrl = "https://www-cycle.nies.go.jp/magazine/kenkyu/201212.html";

/** 公式試験の正答と国交省・寒地土木研究所・国立環境研究所の一次資料を照合。 */
export const KANRI_CONCRETE_MAINTENANCE_QUESTIONS: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q16", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 16, officialAnswerNumber: "2", type: "multiple-choice",
    category: "建築・維持保全", topicTags: ["ひび割れ", "シール工法", "防水性"], difficulty: 3,
    question: "『建築保全標準・同解説（JAMS）鉄筋コンクリート造建築物』によるシール工法の説明として、次の（A）（B）に入る語句の組合せはどれか。シール工法とは、（A）ひび割れの上に塗膜を構成させ、コンクリートの（B）や耐久性を向上させる工法である。",
    choices: {
      ア: "A：微細な／B：強度",
      イ: "A：微細な／B：防水性",
      ウ: "A：変動の大きい進行性の／B：強度",
      エ: "A：変動の大きい進行性の／B：防水性",
    },
    answer: "イ", explanation: "正解は2。微細なひび割れを塗膜で覆う目的は、水の侵入を抑え、防水性と耐久性を高めること。国土交通省の補修技術資料も、幅約0.2mm以下の微細なひび割れに対する被覆と防水性・耐久性の向上を示す。塗膜で構造体の強度を高める工法ではなく、変動の大きい進行性のひび割れは追従性に注意が必要である。",
    choiceExplanations: {
      ア: "誤り。微細なひび割れを覆う点は合うが、向上させるのは強度ではなく防水性と耐久性。",
      イ: "正しい。微細なひび割れに塗膜を構成し、防水性と耐久性を高める。国交省の補修技術資料も微細なひび割れの被覆目的をそう説明する。",
      ウ: "誤り。進行性で変動の大きいひび割れは塗膜が追従しにくく、強度を高めるという目的も違う。",
      エ: "誤り。防水性は目的に合うが、対象は変動の大きい進行性のひび割れではなく微細なひび割れ。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問16を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [mlitRepairUrl, mlitComparisonUrl],
    license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q17", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 17, officialAnswerNumber: "2", type: "multiple-choice",
    category: "建築・維持保全", topicTags: ["コンクリート", "ポップアウト", "凍害"], difficulty: 3,
    question: "鉄筋コンクリート構造体の劣化現象と発生原因の組合せとして、『建築保全標準・同解説（JAMS）鉄筋コンクリート造建築物』によれば最も不適切なものはどれか。",
    choices: {
      ア: "乾燥収縮によるひび割れ",
      イ: "酸・塩類による骨材のポップアウト",
      ウ: "凍結融解作用によるスケーリング",
      エ: "中性化による鉄筋腐食",
    },
    answer: "イ", explanation: "正解は2。ポップアウトは、骨材粒子の膨張でコンクリート表面が局所的にはじける現象。寒地土木研究所の凍害資料は、吸水した骨材内部の水が凍結・膨張して生じる例を説明する。酸・塩類を骨材のポップアウトの原因とする組合せが本問では不適切。乾燥収縮とひび割れ、凍結融解とスケーリング、中性化と鉄筋腐食の各組合せは、公的研究資料とも整合する。",
    choiceExplanations: {
      ア: "適切。コンクリートは乾燥で収縮し、ひび割れが生じる。国立環境研究所もこの機構を説明する。",
      イ: "不適切。骨材のポップアウトは、骨材の吸水・凍結膨張などによる局所的な表面破壊として説明される。酸・塩類との組合せを選ぶのが本問の正答。",
      ウ: "適切。凍結と融解の繰返しにより表面がはがれるスケーリングが生じる。寒地土木研究所の資料で確認できる。",
      エ: "適切。中性化によりコンクリートのアルカリ性が低下し、鉄筋の保護状態が失われると腐食が進む。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問17を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [ceriFreezeUrl, niesConcreteUrl],
    license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
