import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const singleRulesUrl = "https://www.mansion-info.mlit.go.jp/wp-content/uploads/2025/03/01_%E7%AE%A1%E7%90%86%E8%A6%8F%E7%B4%84%EF%BC%88%E5%8D%98%E6%A3%9F%E5%9E%8B%EF%BC%89.pdf";
const districtRulesUrl = "https://www.mansion-info.mlit.go.jp/wp-content/uploads/2025/03/02_%E7%AE%A1%E7%90%86%E8%A6%8F%E7%B4%84%EF%BC%88%E5%9B%A3%E5%9C%B0%E5%9E%8B%EF%BC%89.pdf";
const civilCodeUrl = "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20250401";
const leaseLawUrl = "https://laws.e-gov.go.jp/law/403AC0000000090?occasion_date=20250401";

/** 公式問題・正答と試験時点の一次資料を全肢照合。 */
export const KANRI_BATCH_07: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q37", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 37, officialAnswerNumber: "3", type: "multiple-choice",
    category: "標準管理規約", topicTags: ["団地型", "総会決議", "専門委員会"], difficulty: 3,
    question: "標準管理規約（単棟型・団地型）における総会決議について、最も適切なものはどれか。",
    choices: {
      ア: "使用細則の制定・変更・廃止には総会の決議は要らない。",
      イ: "給水管やエレベーター設備の更新工事には総会の決議は要らない。",
      ウ: "理事会の責任と権限の範囲内で専門委員会を設置する場合、総会の決議は要らない。",
      エ: "団地で計画修繕のために各棟修繕積立金を取り崩す場合、団地総会と棟総会の両方の決議が要る。",
    },
    answer: "ウ", explanation: "正解は3。単棟型55条は、理事会が自己の責任と権限の範囲内で専門委員会を設けられると定める。団地型では、計画修繕のための各棟修繕積立金取崩しは原則として団地総会決議事項であり、棟総会との二重決議を一律には要しない。",
    choiceExplanations: {
      ア: "不適切。単棟型48条、団地型50条は使用細則等の制定・変更・廃止を総会の議決事項とする。",
      イ: "不適切。給水管やエレベーターの更新は長期修繕計画や特別の管理に関わり、単棟型48条・団地型50条の総会議決を要する。",
      ウ: "適切。単棟型55条は理事会の責任と権限の範囲内で専門委員会を設けられると明記する。",
      エ: "不適切。団地型50条10号は計画修繕等とそのための各棟修繕積立金取崩しを団地総会議決事項とする。72条6号の棟総会議決は建替え等の合意形成調査とその経費の取崩しである。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問37を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [singleRulesUrl, districtRulesUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q39", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 39, officialAnswerNumber: "1", type: "multiple-choice",
    category: "民法", topicTags: ["相続", "管理費", "相続財産清算人"], difficulty: 3,
    question: "管理費を滞納した区分所有者が死亡した場合について、民法等によれば、最も適切なものはどれか。",
    choices: {
      ア: "相続人がいることが明らかでない場合、管理組合は家庭裁判所に相続財産清算人の選任を請求できる。",
      イ: "相続人は相続開始を知った時から10か月以内に、承認か放棄をしなければならない。",
      ウ: "遺産分割で住戸の取得者が決まるまで、管理組合は滞納管理費を請求できない。",
      エ: "相続人に滞納管理費は請求できるが、被相続人の支払遅延についての損害金は請求できない。",
    },
    answer: "ア", explanation: "正解は1。相続人のあることが明らかでない場合、利害関係人である債権者は家庭裁判所に相続財産清算人の選任を申し立てられる（民法952条）。相続の承認・放棄の熟慮期間は原則3か月（915条）。",
    choiceExplanations: {
      ア: "適切。民法952条は利害関係人等の請求で家庭裁判所が相続財産清算人を選任すると定める。",
      イ: "不適切。民法915条の熟慮期間は、自己のために相続が始まったことを知った時から原則3か月である。",
      ウ: "不適切。管理費債務は相続の対象であり、遺産分割による住戸取得者決定まで一切請求できないわけではない。",
      エ: "不適切。相続人は被相続人の債務を承継し、滞納管理費に付随する既発生の遅延損害金も請求対象となる。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問39を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [civilCodeUrl, "https://www.courts.go.jp/saiban/syurui/syurui_kazi/kazi_06_15/"], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q40", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 40, officialAnswerNumber: "2", type: "multiple-choice",
    category: "民法", topicTags: ["管理費", "消滅時効", "催告"], difficulty: 3,
    question: "滞納管理費の消滅時効について、民法等によれば、最も適切なものはどれか。",
    choices: {
      ア: "管理費債権が確定判決で確定した場合でも、時効期間は5年である。",
      イ: "滞納者に普通郵便で支払を催告した場合も、催告が届けば時効の完成猶予が生じる。",
      ウ: "滞納者が死亡して相続が始まると、管理費債権の時効は当然に更新する。",
      エ: "滞納者が住戸を第三者に売ると、前所有者の滞納管理費債権の時効は当然に更新する。",
    },
    answer: "イ", explanation: "正解は2。民法150条の催告は内容証明郵便に限られず、普通郵便でも相手への到達を立証できれば、その時から6か月間の時効完成猶予を生じる。確定判決で確定した債権の時効期間は原則10年（169条）。",
    choiceExplanations: {
      ア: "不適切。確定判決で確定した債権の消滅時効期間は民法169条により原則10年である。",
      イ: "適切。民法150条の催告に郵便方法の限定はない。ただし普通郵便では到達の証明が実務上難しい。",
      ウ: "不適切。債務者の死亡・相続開始は民法の時効更新事由ではない。",
      エ: "不適切。住戸の売買自体は前所有者への管理費債権の時効更新事由ではない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問40を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [civilCodeUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q41", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 41, officialAnswerNumber: "2", type: "multiple-choice",
    category: "借地借家法", topicTags: ["建物賃貸借", "引渡し", "定期借家"], difficulty: 3,
    question: "住戸を賃貸する場合について、民法・借地借家法によれば、最も適切なものはどれか。",
    choices: {
      ア: "住戸部分を業務用に借りた場合、借地借家法の建物賃貸借規定は適用されない。",
      イ: "賃借権の登記がなくても、建物の引渡しを受ければ、その後の建物買主に賃借権を対抗できる。",
      ウ: "定期建物賃貸借契約は必ず公正証書によらなければならない。",
      エ: "期間を定めない賃貸借契約は期間1年の契約とみなされる。",
    },
    answer: "イ", explanation: "正解は2。借地借家法31条は、建物の引渡しがあれば、賃借権の登記がなくてもその後の建物取得者に賃貸借を対抗できるとする。用途が業務用でも建物賃貸借なら同法の対象。",
    choiceExplanations: {
      ア: "不適切。借地借家法の建物賃貸借規定は居住用に限定されず、業務用にも適用される。",
      イ: "適切。借地借家法31条は引渡しを建物賃借権の対抗要件として認める。",
      ウ: "不適切。同法38条は公正証書による等の書面を求めるが、公正証書に限定していない。",
      エ: "不適切。期間の定めがない建物賃貸借を一律に1年の契約とみなす規定はない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問41を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [leaseLawUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q42", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 42, officialAnswerNumber: "3", type: "multiple-choice",
    category: "個人情報保護法", topicTags: ["個人情報", "防犯カメラ", "管理組合法人"], difficulty: 2,
    question: "個人情報保護法について、最も不適切なものはどれか。",
    choices: {
      ア: "死者に関する情報でも、生存する遺族に関する情報でもある場合は個人情報に該当し得る。",
      イ: "防犯カメラ映像で特定の個人を識別できる情報は個人情報に該当する。",
      ウ: "管理組合法人も『個人』に当たり、法人そのものに関する情報は個人情報に該当する。",
      エ: "日本の個人情報取扱事業者等が扱う情報は、本人の居住地・国籍によらず保護対象になり得る。",
    },
    answer: "ウ", explanation: "正解は3。個人情報保護法の『個人』は生存する自然人を指し、法人そのものの情報は個人情報ではない。管理組合法人に関する情報でも、役員等の個人を識別する情報は別途個人情報となり得る。",
    choiceExplanations: {
      ア: "適切。死者の情報が同時に生存する遺族の情報でもあれば、その遺族の個人情報となり得る（個人情報保護委員会FAQ）。",
      イ: "適切。特定の個人を識別できる防犯カメラ映像は個人情報となる。検索できる形かどうかは『個人情報データベース等』の別の論点。",
      ウ: "不適切。法人そのものは自然人ではないため、その法人自体に関する情報は個人情報に当たらない。",
      エ: "適切。法の対象となる個人情報は本人の国籍や居住地だけで除外されない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問42を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: ["https://www.ppc.go.jp/all_faq_index/faq1-q1-21/", "https://www.ppc.go.jp/all_faq_index/faq1-q1-41/", "https://www.ppc.go.jp/personalinfo/faq/kojin/"], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
