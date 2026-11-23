import type { Question } from "@/lib/questions/types";

// RETIO の原本・正答番号表は docs/replenish/plan5-yc4-ledger.json に記録。
export const TAKKEN_2022_QUESTIONS: Question[] = [
  {
    "id": "takken-2022-october-gakka-q1",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 1,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "不動産の二重譲渡"
    ],
    "difficulty": 3,
    "question": "次の1から4までの記述のうち、民法の規定、判例及び下記判決文によれば、正しいものはどれか。\n\n（判決文）\n所有者甲から乙が不動産を買い受け、その登記が未了の間に、丙が当該不動産を甲から二重に買い受け、更に丙から転得者丁が買い受けて登記を完了した場合に、たとい丙が背信的悪意者に当たるとしても、丁は、乙に対する関係で丁自身が背信的悪意者と評価されるのでない限り、当該不動産の所有権取得をもって乙に対抗することができるものと解するのが相当である。",
    "choices": {
      "ア": "所有者AからBが不動産を買い受け、その登記が未了の間に、Cが当該不動産をAから二重に買い受けて登記を完了した場合、Cは、自らが背信的悪意者に該当するときであっても、当該不動産の所有権取得をもってBに対抗することができる。",
      "イ": "所有者AからBが不動産を買い受け、その登記が未了の間に、背信的悪意者ではないCが当該不動産をAから二重に買い受けた場合、先に買い受けたBは登記が未了であっても当該不動産の所有権取得をもってCに対抗することができる。",
      "ウ": "所有者AからBが不動産を買い受け、その登記が未了の間に、背信的悪意者であるCが当該不動産をAから二重に買い受け、更にCから転得者Dが買い受けて登記を完了した場合、DもBに対する関係で背信的悪意者に該当するときには、Dは当該不動産の所有権取得をもってBに対抗することができない。",
      "エ": "所有者AからBが不動産を買い受け、その登記が未了の間に、Cが当該不動産をAから二重に買い受け登記を完了した場合、Cが背信的悪意者に該当しなくてもBが登記未了であることにつき悪意であるときには、Cは当該不動産の所有権取得をもってBに対抗することができない。"
    },
    "answer": "ウ",
    "explanation": "背信的悪意の有無は転得者D自身について、先に買ったBとの関係で判断する。本問のDは登記を備えていてもBに対抗できない。",
    "choiceExplanations": {
      "ア": "Cが背信的悪意者なら、民法177条の保護を受ける第三者に当たらず、Bの登記の欠缺を主張できない。",
      "イ": "背信的悪意者でないCに対して、先に買っただけのBは登記なしでは所有権を対抗できない。",
      "ウ": "判決文の丁に当たるD自身がBに対する背信的悪意者である。Dが登記を得た事実だけではBに対抗できない。",
      "エ": "事情を知っているだけの悪意と信義則に反する背信的悪意を区別する。Cが単なる悪意者なら、登記をもってBに対抗できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=3",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401",
      "https://www.courts.go.jp/app/files/hanrei_jp/520/052520_hanrei.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q2",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 2,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "相続と遺留分"
    ],
    "difficulty": 3,
    "question": "相続に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "被相続人の生前においては、相続人は、家庭裁判所の許可を受けることにより、遺留分を放棄することができる。",
      "イ": "家庭裁判所への相続放棄の申述は、被相続人の生前には行うことができない。",
      "ウ": "相続人が遺留分の放棄について家庭裁判所の許可を受けると、当該相続人は、被相続人の遺産を相続する権利を失う。",
      "エ": "相続人が被相続人の兄弟姉妹である場合、当該相続人には遺留分がない。"
    },
    "answer": "ウ",
    "explanation": "遺留分を放棄しても相続人の地位は失われない。生前の遺留分放棄と相続放棄は効果も手続も別である。",
    "choiceExplanations": {
      "ア": "相続開始前の遺留分放棄は家庭裁判所の許可により効力を生じる（民法1049条1項）。",
      "イ": "相続放棄の申述は、相続が開始した後に家庭裁判所に行う（民法915条・938条）。",
      "ウ": "放棄の対象は遺留分であり、相続権は残る。遺産の相続もできる。",
      "エ": "兄弟姉妹は相続人であっても、遺留分の権利者から外れる（民法1042条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=3",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q3",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 3,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "制限行為能力"
    ],
    "difficulty": 3,
    "question": "制限行為能力者に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。",
    "choices": {
      "ア": "成年後見人は、後見監督人がいる場合には、後見監督人の同意を得なければ、成年被後見人の法律行為を取り消すことができない。",
      "イ": "相続の放棄は相手方のない単独行為であるから、成年後見人が成年被後見人に代わってこれを行っても、利益相反行為となることはない。",
      "ウ": "成年後見人は成年被後見人の法定代理人である一方、保佐人は被保佐人の行為に対する同意権と取消権を有するが、代理権が付与されることはない。",
      "エ": "令和4年4月1日からは、成年年齢が18歳となったため、18歳の者は、年齢を理由とする後見人の欠格事由に該当しない。"
    },
    "answer": "エ",
    "explanation": "2022年4月1日に成年年齢が18歳となった。民法847条は未成年者を後見人の欠格事由とするため、18歳は年齢により排除されない。",
    "choiceExplanations": {
      "ア": "民法864条は成年後見人による取消しについて、後見監督人の同意を要しないと定める。",
      "イ": "成年後見人と被後見人が共同相続人となるような場面では、被後見人だけの相続放棄は持分の利害が対立し得る。単独行為でも利益相反は生じる（民法860条・826条）。",
      "ウ": "保佐人にも、家庭裁判所の審判で特定の法律行為について代理権を与えることができる（民法876条の4）。",
      "エ": "同日の施行で18歳は成年となり、未成年者としての欠格に該当しない（民法4条・847条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=4",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q4",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 4,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "抵当権"
    ],
    "difficulty": 3,
    "question": "A所有の甲土地にBのCに対する債務を担保するためにCの抵当権（以下この問において「本件抵当権」という。）が設定され、その旨の登記がなされた場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Aから甲土地を買い受けたDが、Cの請求に応じてその代価を弁済したときは、本件抵当権はDのために消滅する。",
      "イ": "Cに対抗することができない賃貸借により甲土地を競売手続の開始前から使用するEは、甲土地の競売における買受人Fの買受けの時から6か月を経過するまでは、甲土地をFに引き渡すことを要しない。",
      "ウ": "本件抵当権設定登記後に、甲土地上に乙建物が築造された場合、Cが本件抵当権の実行として競売を申し立てるときには、甲土地とともに乙建物の競売も申し立てなければならない。",
      "エ": "BがAから甲土地を買い受けた場合、Bは抵当不動産の第三取得者として、本件抵当権について、Cに対して抵当権消滅請求をすることができる。"
    },
    "answer": "ア",
    "explanation": "第三取得者Dが抵当権者Cの請求に応じて代価を弁済すると、抵当権はDのために消滅する（民法378条）。",
    "choiceExplanations": {
      "ア": "Dは抵当不動産の買主であり、Cの請求に応じて代価を支払うので代価弁済の要件を満たす。",
      "イ": "競売後の6か月の明渡猶予は、抵当権の目的である建物の使用者に関する制度である。土地を借りるEには適用されない（民法395条）。",
      "ウ": "土地と建物を一括して競売できるが、義務ではない。優先弁済を受けられるのは土地の代価に限る（民法389条）。",
      "エ": "Bは主たる債務者である。所有権を取得しても抵当権消滅請求はできない（民法380条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=4",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q5",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 5,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "期間計算"
    ],
    "difficulty": 3,
    "question": "期間の計算に関する次の記述のうち、民法の規定によれば、正しいものはどれか。なお、明記された日付は、日曜日、国民の祝日に関する法律に規定する休日その他の休日には当たらないものとする。",
    "choices": {
      "ア": "令和4年10月17日午前10時に、引渡日を契約締結日から1年後とする不動産の売買契約を締結した場合、令和5年10月16日が引渡日である。",
      "イ": "令和4年8月31日午前10時に、弁済期限を契約締結日から1か月後とする金銭消費貸借契約を締結した場合、令和4年9月30日の終了をもって弁済期限となる。",
      "ウ": "期間の末日が日曜日、国民の祝日に関する法律に規定する休日その他の休日に当たるときは、その日に取引をしない慣習がある場合に限り、期間はその前日に満了する。",
      "エ": "令和4年5月30日午前10時に、代金の支払期限を契約締結日から1か月後とする動産の売買契約を締結した場合、令和4年7月1日の終了をもって支払期限となる。"
    },
    "answer": "イ",
    "explanation": "午前10時に始まる期間は初日を算入しない。8月31日の翌日から暦で1か月を数えると、9月30日の終了で満了する。",
    "choiceExplanations": {
      "ア": "10月17日は算入せず、10月18日から起算する。1年後の応当日の前日である翌年10月17日が満了日となる（民法140条・143条）。",
      "イ": "9月1日起算の1か月は9月30日の終了で満了する（民法141条・143条）。",
      "ウ": "その日に取引しない慣習がある場合は、末日は前日に繰り上がらず翌日に繰り下がる（民法142条）。",
      "エ": "5月31日から起算すると、6月には31日がないため、6月の末日である30日の終了で満了する（民法143条2項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=5",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01",
    "isCalculation": true
  },
  {
    "id": "takken-2022-october-gakka-q6",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 6,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "賃貸借と使用貸借"
    ],
    "difficulty": 3,
    "question": "Aを貸主、Bを借主として、A所有の甲土地につき、資材置場とする目的で期間を2年として、AB間で、①賃貸借契約を締結した場合と、②使用貸借契約を締結した場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Aは、甲土地をBに引き渡す前であれば、①では口頭での契約の場合に限り自由に解除できるのに対し、②では書面で契約を締結している場合も自由に解除できる。",
      "イ": "Bは、①ではAの承諾がなければ甲土地を適法に転貸することはできないが、②ではAの承諾がなくても甲土地を適法に転貸することができる。",
      "ウ": "Bは、①では期間内に解約する権利を留保しているときには期間内に解約の申入れをし解約することができ、②では期間内に解除する権利を留保していなくてもいつでも解除することができる。",
      "エ": "甲土地について契約の本旨に反するBの使用によって生じた損害がある場合に、Aが損害賠償を請求するときは、①では甲土地の返還を受けた時から5年以内に請求しなければならないのに対し、②では甲土地の返還を受けた時から1年以内に請求しなければならない。"
    },
    "answer": "ウ",
    "explanation": "有期の賃貸借は中途解約権を留保していれば期間内に解約の申入れができる。使用貸借の借主はいつでも解除できる。",
    "choiceExplanations": {
      "ア": "賃貸借では引渡し前というだけで自由に解除できない。使用貸借では貸主が受取り前に解除できるが、書面による契約は除外される（民法593条の2）。",
      "イ": "賃貸借の転貸にも、使用貸借で第三者に使用・収益させる場合にも、貸主の承諾が必要である（民法612条・594条2項）。",
      "ウ": "賃貸借では民法618条、使用貸借では598条3項が根拠となる。後者に中途解除権の留保は要らない。",
      "エ": "契約の本旨に反する使用による損害は、どちらも返還を受けた時から1年以内に請求する（民法600条・622条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=5",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q7",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 7,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "失踪宣告"
    ],
    "difficulty": 3,
    "question": "不在者Aが、家庭裁判所から失踪宣告を受けた。Aを単独相続したBは相続財産である甲土地をCに売却（以下この問において「本件売買契約」という。）して登記も移転したが、その後、生存していたAの請求によって当該失踪宣告が取り消された。本件売買契約当時に、Aの生存について、（ア）Bが善意でCが善意、（イ）Bが悪意でCが善意、（ウ）Bが善意でCが悪意、（エ）Bが悪意でCが悪意、の4つの場合があり得るが、これらのうち、民法の規定及び判例によれば、Cが本件売買契約に基づき取得した甲土地の所有権をAに対抗できる場合を全て掲げたものとして正しいものはどれか。",
    "choices": {
      "ア": "（ア）、（イ）、（ウ）",
      "イ": "（ア）、（イ）",
      "ウ": "（ア）、（ウ）",
      "エ": "（ア）"
    },
    "answer": "エ",
    "explanation": "失踪宣告取消しの影響を受けない売買には、売主Bと買主Cの双方が善意であることが必要である（民法32条1項）。",
    "choiceExplanations": {
      "ア": "（イ）ではB、（ウ）ではCがAの生存を知っている。いずれも双方善意を満たさない。",
      "イ": "（イ）のBは悪意である。Cだけが善意でも、本件売買は取消しの影響を受ける。",
      "ウ": "（ウ）のCは悪意である。Bだけが善意でも、本件売買は取消しの影響を受ける。",
      "エ": "（ア）だけが双方善意であり、Cの取得は失踪宣告の取消しによって影響を受けない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=6",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q8",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 8,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "地上権と賃借権"
    ],
    "difficulty": 3,
    "question": "AがB所有の甲土地を建物所有目的でなく利用するための権原が、①地上権である場合と②賃借権である場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、AもBも対抗要件を備えているものとする。",
    "choices": {
      "ア": "①でも②でも、特約がなくても、BはAに対して、甲土地の使用及び収益に必要な修繕をする義務を負う。",
      "イ": "CがBに無断でAから当該権原を譲り受け、甲土地を使用しているときは、①でも②でも、BはCに対して、甲土地の明渡しを請求することができる。",
      "ウ": "①では、Aは当該権原を目的とする抵当権を設定することができるが、②では、Aは当該権原を目的とする抵当権を設定することはできない。",
      "エ": "Dが甲土地を不法占拠してAの土地利用を妨害している場合、①では、Aは当該権原に基づく妨害排除請求権を行使してDの妨害の排除を求めることができるが、②では、AはDの妨害の排除を求めることはできない。"
    },
    "answer": "ウ",
    "explanation": "民法369条2項は地上権を抵当権の目的にできるとしている。賃借権そのものはこの規定の対象外である。",
    "choiceExplanations": {
      "ア": "賃貸人には民法606条の修繕義務があるが、地上権を設定した土地所有者に同じ義務はない。",
      "イ": "地上権は原則として土地所有者の承諾を得ずに譲渡できる。無断譲渡が制限される賃貸借と同じには扱えない（民法612条）。",
      "ウ": "地上権には抵当権を設定できる。土地の賃借権そのものには設定できない。",
      "エ": "対抗要件を備えた不動産賃借人にも妨害停止や返還の請求が認められる（民法605条の4）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=6",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q9",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 9,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "委任と辞任"
    ],
    "difficulty": 3,
    "question": "辞任に関する次の記述のうち、民法の規定によれば、正しいものはいくつあるか。\n\nア　委任によって代理権を授与された者は、報酬を受ける約束をしている場合であっても、いつでも委任契約を解除して代理権を消滅させて、代理人を辞することができる。\n\nイ　親権者は、やむを得ない事由があるときは、法務局に届出を行うことによって、親権を辞することができる。\n\nウ　後見人は、正当な事由があるときは、後見監督人の許可を得て、その任務を辞することができる。\n\nエ　遺言執行者は、正当な事由があるときは、相続人の許可を得て、その任務を辞することができる。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ア",
    "explanation": "正しいのはアのみ。親権者・後見人・遺言執行者の辞任には、各規定に従った家庭裁判所の許可が必要である。",
    "choiceExplanations": {
      "ア": "アは報酬の約束があっても委任を解除できる（民法651条）。イは親権を辞するのに家庭裁判所の許可が必要（837条）。ウの許可権者も家庭裁判所（844条）。エも同じ（1019条2項）。",
      "イ": "アだけが正しい。例えばイは届出だけで辞任できず、家庭裁判所の許可を要する。",
      "ウ": "ウは後見監督人、エは相続人を許可権者としている点がともに誤りである。",
      "エ": "親権者・後見人・遺言執行者のいずれについても、設問の許可・届出先では足りない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=7",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q10",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 10,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "取得時効"
    ],
    "difficulty": 3,
    "question": "AはBに対し、自己所有の甲土地を売却し、代金と引換えにBに甲土地を引き渡したが、その後にCに対しても甲土地を売却し、代金と引換えにCに甲土地の所有権登記を移転した。この場合におけるBによる甲土地の所有権の時効取得に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。",
    "choices": {
      "ア": "Bが甲土地をDに賃貸し、引き渡したときは、Bは甲土地の占有を失うので、甲土地の所有権を時効取得することはできない。",
      "イ": "Bが、時効の完成前に甲土地の占有をEに奪われたとしても、Eに対して占有回収の訴えを提起して占有を回復した場合には、Eに占有を奪われていた期間も時効期間に算入される。",
      "ウ": "Bが、甲土地の引渡しを受けた時点で所有の意思を有していたとしても、AC間の売買及びCに対する登記の移転を知ったときは、その時点で所有の意思が認められなくなるので、Bは甲土地を時効により取得することはできない。",
      "エ": "Bが甲土地の所有権を時効取得した場合、Bは登記を備えなければ、その所有権を時効完成時において所有者であったCに対抗することはできない。"
    },
    "answer": "イ",
    "explanation": "占有回収の訴えで占有を回復した場合、占有権は消滅しなかったものとして扱う。奪われていた期間も取得時効の期間に含まれる。",
    "choiceExplanations": {
      "ア": "Dへの賃貸により、BはDを通じた代理占有を続ける（民法181条）。",
      "イ": "民法203条ただし書により占有権は消滅せず、164条による取得時効の中断も生じない。",
      "ウ": "後から二重譲渡や登記を知っただけで、それまでの自主占有が他主占有には変わらない（民法185条）。",
      "エ": "Cは時効完成前から所有者である。Bは時効取得を、その当事者であるCに登記なしで主張できる。完成後に権利を得た第三者との関係とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=7",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q11",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 11,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "借地権"
    ],
    "difficulty": 3,
    "question": "建物の所有を目的とする土地の賃貸借契約（定期借地権及び一時使用目的の借地権となる契約を除く。）に関する次の記述のうち、借地借家法の規定及び判例によれば、正しいものはどれか。",
    "choices": {
      "ア": "借地権の存続期間が満了する前に建物の滅失があった場合において、借地権者が借地権の残存期間を超えて存続すべき建物を築造したときは、その建物を築造することにつき借地権設定者の承諾がない場合でも、借地権の期間の延長の効果が生ずる。",
      "イ": "転借地権が設定されている場合において、転借地上の建物が滅失したときは、転借地権は消滅し、転借地権者（転借人）は建物を再築することができない。",
      "ウ": "借地上の建物が滅失し、借地権設定者の承諾を得て借地権者が新たに建物を築造するに当たり、借地権設定者が存続期間満了の際における借地の返還確保の目的で、残存期間を超えて存続する建物を築造しない旨の特約を借地権者と結んだとしても、この特約は無効である。",
      "エ": "借地上の建物所有者が借地権設定者に建物買取請求権を適法に行使した場合、買取代金の支払があるまでは建物の引渡しを拒み得るとともに、これに基づく敷地の占有についても、賃料相当額を支払う必要はない。"
    },
    "answer": "ウ",
    "explanation": "再築を承諾しながら、残存期間を超える建物の築造を禁じて期間延長を封じる特約は、借地権者に不利なため無効である（借地借家法7条・9条）。",
    "choiceExplanations": {
      "ア": "再築による延長には承諾が要る。ただし再築の通知後2か月以内に異議がなければ、所定の場合に承諾があったものとみなされる。",
      "イ": "建物の滅失だけで、土地を借りる転借地権が当然に消滅するわけではない。",
      "ウ": "承諾ある再築について法が認める効果を借地権者に不利に制限する特約であり、借地借家法9条により無効となる。",
      "エ": "建物の引渡しを拒めても、敷地の利用利益は受けている。敷地の占有について賃料相当額の支払は必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=8",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/403AC0000000090?occasion_date=20220401",
      "https://www.courts.go.jp/tokyo/saiban/minji-section22/minji-section22-mokuji-1/index.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q12",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 12,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "定期建物賃貸借"
    ],
    "difficulty": 3,
    "question": "Aは、B所有の甲建物（床面積100m²）につき、居住を目的として、期間2年、賃料月額10万円と定めた賃貸借契約（以下この問において「本件契約」という。）をBと締結してその日に引渡しを受けた。この場合における次の記述のうち、民法及び借地借家法の規定並びに判例によれば、誤っているものはどれか。",
    "choices": {
      "ア": "BはAに対して、本件契約締結前に、契約の更新がなく、期間の満了により賃貸借が終了する旨を記載した賃貸借契約書を交付して説明すれば、本件契約を借地借家法第38条に規定する定期建物賃貸借契約として締結することができる。",
      "イ": "本件契約が借地借家法第38条に規定する定期建物賃貸借契約であるか否かにかかわらず、Aは、甲建物の引渡しを受けてから1年後に甲建物をBから購入したCに対して、賃借人であることを主張できる。",
      "ウ": "本件契約が借地借家法第38条に規定する定期建物賃貸借契約である場合、Aの中途解約を禁止する特約があっても、やむを得ない事情によって甲建物を自己の生活の本拠として使用することが困難になったときは、Aは本件契約の解約の申入れをすることができる。",
      "エ": "AがBに対して敷金を差し入れている場合、本件契約が期間満了で終了するに当たり、Bは甲建物の返還を受けるまでは、Aに対して敷金を返還する必要はない。"
    },
    "answer": "ア",
    "explanation": "定期建物賃貸借の事前説明書面は契約書とは別に交付する。更新がないことを契約書に記載して事前に示すだけでは足りない。",
    "choiceExplanations": {
      "ア": "2022年4月1日時点の借地借家法38条2項は、契約に先立つ書面交付と説明を要求する。契約書をその説明書面で兼用できない。",
      "イ": "建物の引渡しがあれば、定期か普通かを問わず、その後の取得者Cに賃借権を対抗できる（借地借家法31条）。",
      "ウ": "居住用で床面積200m²未満。やむを得ない事情で生活の本拠にできないときは、借主から解約でき、不利な特約は無効となる（借地借家法38条）。",
      "エ": "敷金返還義務は賃貸借が終了し、目的物が返還されたときに生じる（民法622条の2）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=8",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/403AC0000000090?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20220401",
      "https://www.courts.go.jp/assets/hanrei/hanrei-pdf-87172.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q13",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 13,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "区分所有法"
    ],
    "difficulty": 3,
    "question": "建物の区分所有等に関する法律（以下この問において「法」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "管理者は、規約により、その職務に関し、区分所有者のために、原告又は被告となったときは、その旨を各区分所有者に通知しなくてよい。",
      "イ": "管理者がないときは、区分所有者の5分の1以上で議決権の5分の1以上を有するものは、集会を招集することができる。ただし、この定数は、規約で減ずることができる。",
      "ウ": "集会において、管理者の選任を行う場合、規約に別段の定めがない限り、区分所有者及び議決権の各過半数で決する。",
      "エ": "管理組合（法第3条に規定する区分所有者の団体をいう。）は、区分所有者及び議決権の各4分の3以上の多数による集会の決議で法人となる旨並びにその名称及び事務所を定め、かつ、その主たる事務所の所在地において登記をすることによって法人となる。"
    },
    "answer": "ア",
    "explanation": "管理者が規約に基づいて原告又は被告となったら、その旨を区分所有者に通知する（区分所有法26条5項）。",
    "choiceExplanations": {
      "ア": "各区分所有者への通知が必要である。規約に訴訟追行の定めがあることは通知を免れる理由にならない。",
      "イ": "管理者がいなければ人数・議決権ともに5分の1以上で招集でき、規約でその数を引き下げられる（34条5項）。",
      "ウ": "管理者の選任に別段の定めがなければ、集会の通常決議として人数・議決権の各過半数による（25条・39条）。",
      "エ": "人数・議決権ともに4分の3以上で所定事項を決議し、主たる事務所の所在地で登記すると法人になる（47条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=9",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q14",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 14,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "不動産登記"
    ],
    "difficulty": 3,
    "question": "不動産の登記に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "所有権の移転の登記の申請をする場合には、申請人は、法令に別段の定めがある場合を除き、その申請情報と併せて登記原因を証する情報を提供しなければならない。",
      "イ": "所有権の移転の登記の申請をする場合において、当該申請を登記の申請の代理を業とすることができる代理人によってするときは、登記識別情報を提供することができないことにつき正当な理由があるとみなされるため、登記義務者の登記識別情報を提供することを要しない。",
      "ウ": "所有権の移転の登記の申請をする場合において、登記権利者が登記識別情報の通知を希望しない旨の申出をしたときは、当該登記に係る登記識別情報は通知されない。",
      "エ": "所有権の移転の登記の申請をする場合において、その登記が完了した際に交付される登記完了証を送付の方法により交付することを求めるときは、その旨及び送付先の住所を申請情報の内容としなければならない。"
    },
    "answer": "イ",
    "explanation": "資格者代理人に依頼しただけでは、登記識別情報を提供できない正当な理由にはならない。",
    "choiceExplanations": {
      "ア": "法令に別段の定めがなければ、申請情報とともに登記原因証明情報を提供する（不動産登記法61条）。",
      "イ": "代理人の本人確認情報は、登記識別情報を提供できない正当な理由がある場面の本人確認手段である。依頼だけで通常の提供義務は消えない（22条・23条）。",
      "ウ": "通知を希望しない旨を申し出た場合には、登記識別情報は通知されない（21条ただし書）。",
      "エ": "送付による登記完了証の交付を希望するときは、その旨と送付先を申請情報に含める（不動産登記規則182条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=9",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/416AC0000000123?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/417M60000010018?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q15",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 15,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "用途地域"
    ],
    "difficulty": 3,
    "question": "都市計画法に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "市街化区域については、都市計画に、少なくとも用途地域を定めるものとされている。",
      "イ": "準都市計画区域については、都市計画に、特別用途地区を定めることができる。",
      "ウ": "高度地区については、都市計画に、建築物の容積率の最高限度又は最低限度を定めるものとされている。",
      "エ": "工業地域は、主として工業の利便を増進するため定める地域とされている。"
    },
    "answer": "ウ",
    "explanation": "高度地区で定めるのは建築物の高さの最高限度又は最低限度である。容積率を定める高度利用地区と区別する（都市計画法9条）。",
    "choiceExplanations": {
      "ア": "市街化区域には少なくとも用途地域を定める（都市計画法13条）。",
      "イ": "準都市計画区域でも特別用途地区を定めることができる（都市計画法8条2項）。",
      "ウ": "高度地区は高さの制限であり、設問が挙げる容積率の限度ではない。",
      "エ": "工業地域の目的は主として工業の利便を増進することである（都市計画法9条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=9",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/343AC0000000100?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q16",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 16,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "開発許可"
    ],
    "difficulty": 3,
    "question": "都市計画法に関する次の記述のうち、正しいものはどれか。ただし、この問において条例による特別の定めはないものとし、「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。",
    "choices": {
      "ア": "市街化区域内において、市街地再開発事業の施行として行う1haの開発行為を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。",
      "イ": "区域区分が定められていない都市計画区域内において、博物館法に規定する博物館の建築を目的とした8,000m²の開発行為を行おうとする者は、都道府県知事の許可を受けなくてよい。",
      "ウ": "自己の業務の用に供する施設の建築の用に供する目的で行う開発行為にあっては、開発区域内に土砂災害警戒区域等における土砂災害防止対策の推進に関する法律に規定する土砂災害警戒区域内の土地を含んではならない。",
      "エ": "市街化調整区域内における開発行為について、当該開発行為が開発区域の周辺における市街化を促進するおそれがあるかどうかにかかわらず、都道府県知事は、開発審査会の議を経て開発許可をすることができる。"
    },
    "answer": "イ",
    "explanation": "博物館法の博物館は、公益上必要な建築物として開発許可の対象から除かれる（都市計画法29条1項3号、施行令21条）。",
    "choiceExplanations": {
      "ア": "市街地再開発事業の施行として行う開発行為は、面積にかかわらず適用除外に当たる（29条1項6号）。",
      "イ": "非線引きの区域でも、公益上必要な博物館に係る開発行為は許可を要しない。",
      "ウ": "開発許可の立地基準で問題になるのは土砂災害特別警戒区域などである。警戒区域を一律に含められないという規定ではない（33条1項8号）。",
      "エ": "開発審査会の議を経る類型でも、周辺の市街化を促進するおそれがない等の条件がある（34条14号）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=10",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/343AC0000000100?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/344CO0000000158?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q17",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 17,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "建築確認"
    ],
    "difficulty": 3,
    "question": "建築基準法（以下この問において「法」という。）に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "法の改正により、現に存する建築物が改正後の法の規定に適合しなくなった場合には、当該建築物は違反建築物となり、速やかに改正後の法の規定に適合させなければならない。",
      "イ": "延べ面積が500m²を超える建築物について、大規模な修繕をしようとする場合、都市計画区域外であれば建築確認を受ける必要はない。",
      "ウ": "地方公共団体は、条例で、建築物の敷地、構造又は建築設備に関して安全上、防火上又は衛生上必要な制限を附加することができる。",
      "エ": "地方公共団体が、条例で、津波、高潮、出水等による危険の著しい区域を災害危険区域として指定した場合には、災害危険区域内における住居の用に供する建築物の建築は一律に禁止されることとなる。"
    },
    "answer": "ウ",
    "explanation": "地方公共団体は地域の事情に応じ、敷地・構造・建築設備に安全、防火、衛生上の制限を条例で付加できる（建築基準法40条）。",
    "choiceExplanations": {
      "ア": "改正時に適法に存在した建築物には既存不適格の扱いがあり、直ちに違反建築物になるわけではない（3条2項）。",
      "イ": "当時の6条1項1号〜3号に該当する建築物の大規模な修繕は、都市計画区域外であることだけで確認が免除されない。",
      "ウ": "地域の気候・風土の特殊性や特殊建築物の用途・規模に応じて条例で付加できる。",
      "エ": "災害危険区域内の建築の禁止や制限は条例で定める。区域への指定だけで一律に住宅が禁止されるわけではない（39条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=10",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q18",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 18,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "建築物の道路・高さ"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、建築基準法（以下この問において「法」という。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "第一種低層住居専用地域内においては、神社、寺院、教会を建築することはできない。",
      "イ": "その敷地内に一定の空地を有し、かつ、その敷地面積が一定規模以上である建築物で、特定行政庁が交通上、安全上、防火上及び衛生上支障がなく、かつ、その建蔽率、容積率及び各部分の高さについて総合的な配慮がなされていることにより市街地の環境の整備改善に資すると認めて許可したものの建蔽率、容積率又は各部分の高さは、その許可の範囲内において、関係規定による限度を超えるものとすることができる。",
      "ウ": "法第3章の規定が適用されるに至った際、現に建築物が立ち並んでいる幅員1.8m未満の道で、あらかじめ、建築審査会の同意を得て特定行政庁が指定したものは、同章の規定における道路とみなされる。",
      "エ": "第一種住居地域内においては、建築物の高さは、10m又は12mのうち当該地域に関する都市計画において定められた建築物の高さの限度を超えてはならない。"
    },
    "answer": "ウ",
    "explanation": "第3章の適用開始時に建築物が立ち並ぶ道は、幅員1.8m未満でも建築審査会の同意を得た指定により道路とみなせる（建築基準法42条2項・6項）。",
    "choiceExplanations": {
      "ア": "第一種低層住居専用地域でも、神社・寺院・教会等は建築できる（別表第2（い）項）。",
      "イ": "総合設計制度で緩和されるのは容積率と高さの制限であり、列挙に建蔽率を含めた点が誤り（59条の2）。",
      "ウ": "幅員1.8m未満の道を指定するには建築審査会の同意が必要であり、本肢はその要件を満たす。",
      "エ": "10m又は12mの絶対高さ制限は第一種・第二種低層住居専用地域及び田園住居地域に関する規定である（55条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=11",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q19",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 19,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "宅地造成"
    ],
    "difficulty": 3,
    "question": "宅地造成等規制法に関する次の記述のうち、誤っているものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。",
    "choices": {
      "ア": "宅地造成工事規制区域内において、雨水その他の地表水又は地下水を排除するための排水施設の除却工事を行おうとする場合は、一定の場合を除き、都道府県知事への届出が必要となる。",
      "イ": "宅地造成工事規制区域内において、森林を宅地にするために行う切土であって、高さ3mの崖を生ずることとなるものに関する工事については、造成主は、都市計画法第29条第1項又は第2項の許可を受けて行われる当該許可の内容に適合した工事を除き、工事に着手する前に、都道府県知事の許可を受けなければならない。",
      "ウ": "宅地造成工事規制区域内で過去に宅地造成に関する工事が行われ、現在は造成主とは異なる者がその工事が行われた宅地を所有している場合において、当該宅地の所有者は宅地造成に伴う災害が生じないよう、その宅地を常時安全な状態に維持するよう努めなければならない。",
      "エ": "宅地造成工事規制区域外に盛土によって造成された一団の造成宅地の区域において、造成された盛土の高さが5m未満の場合は、都道府県知事は、当該区域を造成宅地防災区域として指定することができない。"
    },
    "answer": "エ",
    "explanation": "当時の宅地造成等規制法では、造成宅地防災区域を指定できるかを盛土の高さ5mだけで決めない。災害のおそれを所定の基準に照らして判断する。",
    "choiceExplanations": {
      "ア": "区域内で排水施設を除却する一定の工事は、都道府県知事への事前届出の対象となる（当時の15条2項）。",
      "イ": "森林を宅地にする切土で高さ2mを超える崖が生じる工事は対象となる。都市計画法の開発許可どおりの工事は除外される（8条1項・施行令3条）。",
      "ウ": "安全に維持する努力義務は現所有者・管理者・占有者に及ぶ。自ら造成した者に限られない（16条）。",
      "エ": "規制区域外で要件を満たせば、盛土が5m未満であることだけで指定が排除されない（20条・施行令の指定基準）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=11",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/336AC0000000191?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/337CO0000000016?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q20",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 20,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "土地区画整理"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、土地区画整理法の規定及び判例によれば、誤っているものはどれか。",
    "choices": {
      "ア": "土地区画整理組合の設立の認可の公告があった日以後、換地処分の公告がある日までは、施行地区内において、土地区画整理事業の施行の障害となるおそれがある建築物の新築を行おうとする者は、土地区画整理組合の許可を受けなければならない。",
      "イ": "土地区画整理組合は、定款に別段の定めがある場合においては、換地計画に係る区域の全部について工事が完了する以前においても換地処分をすることができる。",
      "ウ": "仮換地を指定したことにより、使用し、又は収益することができる者のなくなった従前の宅地については、当該宅地を使用し、又は収益することができる者のなくなった時から換地処分の公告がある日までは、施行者が当該宅地を管理する。",
      "エ": "清算金の徴収又は交付に関する権利義務は、換地処分の公告によって換地についての所有権が確定することと併せて、施行者と換地処分時点の換地所有者との間に確定的に発生するものであり、換地処分後に行われた当該換地の所有権の移転に伴い当然に移転する性質を有するものではない。"
    },
    "answer": "ア",
    "explanation": "建築行為等の制限に係る許可をするのは施行者である土地区画整理組合ではなく、都道府県知事等である（土地区画整理法76条）。",
    "choiceExplanations": {
      "ア": "事業の支障となり得る新築には法76条の許可を要する。組合の認可の公告が起点でも、組合が許可権者にはならない。",
      "イ": "定款に別段の定めがあれば、工事完了前でも換地処分を行える（103条2項ただし書）。",
      "ウ": "仮換地指定により使用収益する者がいなくなった従前地は、換地処分の公告まで施行者が管理する（100条の2）。",
      "エ": "清算金の債権債務は公告の翌日に確定する。当時の権利者が換地を譲渡しても当然には移転しない（104条8項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=12",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/329AC0000000119?occasion_date=20220401",
      "https://www.courts.go.jp/assets/hanrei/hanrei-pdf-17353.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q21",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 21,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "農地法"
    ],
    "difficulty": 3,
    "question": "農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "農地の賃貸借及び使用貸借は、その登記がなくても農地の引渡しがあったときは、これをもってその後にその農地について所有権を取得した第三者に対抗することができる。",
      "イ": "法第2条第3項の農地所有適格法人の要件を満たしていない株式会社は、耕作目的で農地を借り入れることはできない。",
      "ウ": "法第4条第1項、第5条第1項の違反について原状回復等の措置に係る命令の対象となる者（違反転用者等）には、当該規定に違反した者又はその一般承継人は含まれるが、当該違反に係る土地について工事を請け負った者は含まれない。",
      "エ": "法の適用については、土地の面積は、登記簿の地積によることとしているが、登記簿の地積が著しく事実と相違する場合及び登記簿の地積がない場合には、実測に基づき農業委員会が認定したところによる。"
    },
    "answer": "エ",
    "explanation": "面積は原則として登記簿の地積を用いる。記録がないか事実と著しく異なる場合には、実測に基づき農業委員会が認定する。",
    "choiceExplanations": {
      "ア": "引渡しによる対抗力を農地法16条が認めるのは賃貸借であり、使用貸借は対象外である。",
      "イ": "所有適格法人の要件を満たさない法人でも、解除条件付きの賃貸借など所定の要件で農地を借りられる（農地法3条3項）。",
      "ウ": "違反転用の工事を請け負った者も、原状回復等の措置命令の対象に含まれる（農地法51条）。",
      "エ": "設問の二つの例外では、農業委員会が実測に基づいて認定する（農地法56条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=12",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC0000000229?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q22",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 22,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "国土利用計画法"
    ],
    "difficulty": 3,
    "question": "国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市にあってはその長をいうものとする。",
    "choices": {
      "ア": "都市計画区域外において、A市が所有する面積15,000m²の土地を宅地建物取引業者Bが購入した場合、Bは事後届出を行わなければならない。",
      "イ": "事後届出において、土地売買等の契約に係る土地の土地に関する権利の移転又は設定の対価の額については届出事項ではない。",
      "ウ": "市街化区域を除く都市計画区域内において、一団の土地である甲土地（C所有、面積3,500m²）と乙土地（D所有、面積2,500m²）を宅地建物取引業者Eが購入した場合、Eは事後届出を行わなければならない。",
      "エ": "都道府県知事は、土地利用審査会の意見を聴いて、事後届出をした者に対し、当該事後届出に係る土地の利用目的について必要な変更をすべきことを勧告することができ、勧告を受けた者がその勧告に従わない場合、その勧告に反する土地売買等の契約を取り消すことができる。"
    },
    "answer": "ウ",
    "explanation": "一団の土地を取得する場合は、個々の契約面積ではなく一団の面積で判断する。合計6,000m²はこの区域の5,000m²以上という基準を満たす。",
    "choiceExplanations": {
      "ア": "一方の当事者が地方公共団体であるときは事後届出の適用除外である（国土利用計画法23条2項）。",
      "イ": "権利の移転・設定の対価の額は届出事項に含まれる（同条1項）。",
      "ウ": "市街化区域外の都市計画区域では5,000m²以上が対象である。3,500m²と2,500m²を一団として取得するため届け出る。",
      "エ": "都道府県知事等は利用目的について勧告できるが、従わない場合は公表の制度があり、契約を取り消す制度ではない（24条・26条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=13",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/349AC1000000092?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01",
    "isCalculation": true
  },
  {
    "id": "takken-2022-october-gakka-q23",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 23,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "税・価格評定",
      "印紙税"
    ],
    "difficulty": 3,
    "question": "印紙税に関する次の記述のうち、正しいものはどれか。なお、以下の覚書又は契約書はいずれも書面により作成されたものとする。",
    "choices": {
      "ア": "土地を8,000万円で譲渡することを証した覚書を売主Aと買主Bが作成した場合、本契約書を後日作成することを文書上で明らかにしていれば、当該覚書には印紙税が課されない。",
      "イ": "一の契約書に甲土地の譲渡契約（譲渡金額6,000万円）と、乙建物の譲渡契約（譲渡金額3,000万円）をそれぞれ区分して記載した場合、印紙税の課税標準となる当該契約書の記載金額は、6,000万円である。",
      "ウ": "当初作成した土地の賃貸借契約書において「契約期間は5年とする」旨の記載がされていた契約期間を変更するために、「契約期間は10年とする」旨を記載した覚書を貸主Cと借主Dが作成した場合、当該覚書には印紙税が課される。",
      "エ": "駐車場経営者Eと車両所有者Fが、Fの所有する車両を駐車場としての設備のある土地の特定の区画に駐車させる旨の賃貸借契約書を作成した場合、土地の賃借権の設定に関する契約書として印紙税が課される。"
    },
    "answer": "ウ",
    "explanation": "課税文書に記載した重要な事項を変更する覚書も課税文書となる。土地の賃貸借期間は重要事項に当たる。",
    "choiceExplanations": {
      "ア": "譲渡契約の成立を証する文書は名称を問わず課税対象であり、後日の本契約書作成を予定していても同じである。",
      "イ": "同じ号の不動産譲渡の金額を一文書に記載しているため、土地6,000万円と建物3,000万円を合計し、9,000万円となる。",
      "ウ": "土地賃貸借の契約期間を5年から10年に変更する内容を証する覚書は、課税対象となる。",
      "エ": "駐車場設備のある土地を駐車区画として使用する契約は、土地の賃借権を設定する契約書としては扱われない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=13",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/342AC0000000023?occasion_date=20220401",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/inshi/7107.htm",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/inshi/7127.htm",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/inshi/7117.htm"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01",
    "isCalculation": true
  },
  {
    "id": "takken-2022-october-gakka-q24",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 24,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "税・価格評定",
      "固定資産税"
    ],
    "difficulty": 3,
    "question": "固定資産税に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "固定資産税の徴収については、特別徴収の方法によらなければならない。",
      "イ": "土地価格等縦覧帳簿及び家屋価格等縦覧帳簿の縦覧期間は、毎年4月1日から、4月20日又は当該年度の最初の納期限の日のいずれか遅い日以後の日までの間である。",
      "ウ": "固定資産税の賦課期日は、市町村の条例で定めることとされている。",
      "エ": "固定資産税は、固定資産の所有者に課するのが原則であるが、固定資産が賃借されている場合は、当該固定資産の賃借権者に対して課される。"
    },
    "answer": "イ",
    "explanation": "縦覧期間は4月1日から、4月20日又は最初の納期限のいずれか遅い日以後の日までである（地方税法416条）。",
    "choiceExplanations": {
      "ア": "固定資産税の徴収は普通徴収による（地方税法364条）。",
      "イ": "帳簿の縦覧の始期と、縦覧期間の末日が下回れない基準日の説明がいずれも一致する。",
      "ウ": "賦課期日は当該年度の初日の属する年の1月1日と法律で定める（359条）。",
      "エ": "課税対象となるのは原則として所有者であり、通常の賃貸借で賃借人に納税義務が移るわけではない（343条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=14",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000226?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q25",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 25,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "税・価格評定",
      "地価公示"
    ],
    "difficulty": 3,
    "question": "地価公示法に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "土地鑑定委員会は、標準地の正常な価格を判定したときは、標準地の単位面積当たりの価格のほか、当該標準地の地積及び形状についても官報で公示しなければならない。",
      "イ": "正常な価格とは、土地について、自由な取引が行われるとした場合におけるその取引（一定の場合を除く。）において通常成立すると認められる価格をいい、当該土地に建物がある場合には、当該建物が存するものとして通常成立すると認められる価格をいう。",
      "ウ": "公示区域内の土地について鑑定評価を行う場合において、当該土地の正常な価格を求めるときは、公示価格を規準とする必要があり、その際には、当該土地とこれに類似する利用価値を有すると認められる1又は2以上の標準地との位置、地積、環境等の土地の客観的価値に作用する諸要因についての比較を行い、その結果に基づき、当該標準地の公示価格と当該土地の価格との間に均衡を保たせる必要がある。",
      "エ": "公示区域とは、都市計画法第4条第2項に規定する都市計画区域その他の土地取引が相当程度見込まれるものとして国土交通省令で定める区域のうち、国土利用計画法第12条第1項の規定により指定された規制区域を除いた区域をいう。"
    },
    "answer": "イ",
    "explanation": "地価公示の正常な価格は、建物その他の定着物や土地の使用収益を制限する権利がないものとして評価した土地の価格である（地価公示法2条2項）。",
    "choiceExplanations": {
      "ア": "単位面積当たりの価格とともに、標準地の地積・形状なども官報で公示する（6条）。",
      "イ": "土地上の建物が存在する前提で評価するのではなく、建物のないものとして評価する。",
      "ウ": "標準地との客観的要因の比較を通じて公示価格と均衡を保たせることが、公示価格を規準とする意味である（8条・11条）。",
      "エ": "都市計画区域等から国土利用計画法の規制区域を除いた範囲が公示区域である（地価公示法2条1項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=14",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/344AC0000000049?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q26",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 26,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "事務所"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第3条第1項に規定する事務所（以下この問において「事務所」という。）に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "事務所とは、契約締結権限を有する者を置き、継続的に業務を行うことができる施設を有する場所を指すものであるが、商業登記簿に登載されていない営業所又は支店は事務所には該当しない。",
      "イ": "宅地建物取引業を営まず他の兼業業務のみを営んでいる支店は、事務所には該当しない。",
      "ウ": "宅地建物取引業者は、主たる事務所については、免許証、標識及び国土交通大臣が定めた報酬の額を掲げ、従業者名簿及び帳簿を備え付ける義務を負う。",
      "エ": "宅地建物取引業者は、その事務所ごとに一定の数の成年者である専任の宅地建物取引士を置かなければならないが、既存の事務所がこれを満たさなくなった場合は、30日以内に必要な措置を執らなければならない。"
    },
    "answer": "イ",
    "explanation": "宅建業を営まず兼業だけを行う支店は、本問の宅建業法上の事務所に当たらない。商業登記の有無だけで判断しない。",
    "choiceExplanations": {
      "ア": "登記簿に登載されていなくても、契約を締結する権限を有する使用人を置き、継続して業務を行う施設なら事務所に該当し得る（宅建業法施行令1条の2）。",
      "イ": "兼業業務だけを行う支店は、宅建業を営む事務所として扱われない。",
      "ウ": "標識と報酬額の掲示、従業者名簿と帳簿の備付けは必要だが、免許証の掲示義務はない（宅建業法46条・48条・49条・50条）。",
      "エ": "既存の事務所が専任の取引士の要件を欠いた場合の措置期限は2週間である（31条の3第3項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=15",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/339CO0000000383?occasion_date=20220401",
      "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000268.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q27",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 27,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "報酬"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者A（消費税課税事業者）が受け取ることができる報酬についての次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Aが、Bから売買の媒介を依頼され、Bからの特別の依頼に基づき、遠隔地への現地調査を実施した。その際、当該調査に要する特別の費用について、Bが負担することを事前に承諾していたので、Aは媒介報酬とは別に、当該調査に要した特別の費用相当額を受領することができる。",
      "イ": "Aが、居住用建物について、貸主Bから貸借の媒介を依頼され、この媒介が使用貸借に係るものである場合は、当該建物の通常の借賃をもとに報酬の限度額が定まるが、その算定に当たっては、不動産鑑定業者の鑑定評価を求めなければならない。",
      "ウ": "Aが居住用建物の貸主B及び借主Cの双方から媒介の依頼を受けるに当たって、依頼者の一方から受けることのできる報酬の額は、借賃の1か月分の0.55倍に相当する金額以内である。ただし、媒介の依頼を受けるに当たって、依頼者から承諾を得ている場合はこの限りではなく、双方から受けることのできる報酬の合計額は借賃の1か月分の1.1倍に相当する金額を超えてもよい。",
      "エ": "Aは、土地付建物について、売主Bから媒介を依頼され、代金300万円（消費税等相当額を含み、土地代金は80万円である。）で契約を成立させた。現地調査等の費用については、通常の売買の媒介に比べ5万円（消費税等相当額を含まない。）多く要する旨、Bに対して説明し、合意の上、媒介契約を締結した。この場合、AがBから受領できる報酬の限度額は20万200円である。"
    },
    "answer": "ア",
    "explanation": "依頼者の特別な依頼で遠隔地を調査し、費用負担の事前承諾を得ているので、その実費相当額は媒介報酬とは別に受け取れる。",
    "choiceExplanations": {
      "ア": "Bの特別な依頼、遠隔地での調査、費用負担への事前承諾がそろっている。国土交通省の宅建業法46条の解釈・運用が認める実費に当たる。",
      "イ": "使用貸借では、使用貸借の場合の通常の借賃を報酬計算の基礎とするが、不動産鑑定業者の鑑定評価は必須ではない。",
      "ウ": "承諾で緩和できるのは一方から受け取る額の制限である。双方の合計は借賃1か月分の1.1倍以内である。",
      "エ": "課税対象外の土地80万円と税抜建物200万円の計280万円を基にした通常報酬は税込145,200円。調査費込みで200,200円になる計算でも、当時の低廉な空家等の特例の上限198,000円を超えられない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=15",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://www.mlit.go.jp/appli/content/001481807.pdf",
      "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000266.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01",
    "isCalculation": true
  },
  {
    "id": "takken-2022-october-gakka-q28",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 28,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "重要事項説明"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者が、宅地建物取引業者ではない個人から媒介業者の仲介なしに土地付建物を購入する場合、買主である宅地建物取引業者は重要事項説明書を作成しなくても宅地建物取引業法違反とはならない。",
      "イ": "宅地建物取引業者が、重要事項説明書を作成する際、調査不足のため、重要事項説明書に記載された内容が事実と異なるものとなったが、意図的に事実と異なる内容を記載したものではないため、宅地建物取引業法違反とはならない。",
      "ウ": "宅地建物取引業者は、土地売買の媒介を行う場合、宅地建物取引業者ではない売主に対して契約が成立する前までの間に、宅地建物取引士をして重要事項説明書を交付して説明をさせなければならない。",
      "エ": "宅地又は建物の取引は権利関係や法令上の制限など取引条件に関する事項が複雑で多岐にわたるため、重要事項説明書は、宅地又は建物の取引の専門的知識を有する宅地建物取引士が作成しなければならない。"
    },
    "answer": "ア",
    "explanation": "宅建業者が媒介なしで個人から自ら買い受ける場合、買主である業者に重要事項説明書の作成義務はない（宅建業法35条）。",
    "choiceExplanations": {
      "ア": "自ら買主となる場合は、それだけで35条の説明義務は生じない。個人の売主に説明する義務もない。",
      "イ": "故意でなくても、調査不足により義務の対象となる重要事項を正しく説明できていなければ義務を果たしていない。",
      "ウ": "売買の媒介で説明する相手は取得者である買主側で、売主は35条の説明対象ではない。",
      "エ": "35条が取引士に求めるのは書面への記名押印と説明である。取引士しか書面を作成できないという定めではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=16",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000268.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q29",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 29,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "宅地建物取引士"
    ],
    "difficulty": 3,
    "question": "宅地建物取引士に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "宅地建物取引士は、禁錮以上の刑に処せられた場合、刑に処せられた日から30日以内に、その旨を宅地建物取引士の登録を受けた都道府県知事に届け出なければならない。",
      "イ": "宅地建物取引士は、業務に関して事務禁止の処分を受けた場合、速やかに、宅地建物取引士証をその交付を受けた都道府県知事に提出しなければならず、これを怠った場合には罰則の適用を受けることがある。",
      "ウ": "宅地建物取引士は、有効期間の満了日が到来する宅地建物取引士証を更新する場合、国土交通大臣が指定する講習を受講しなければならず、また、当該宅地建物取引士証の有効期間は5年である。",
      "エ": "宅地建物取引士は、宅地建物取引士の信用を害するような行為をしてはならず、信用を害するような行為には、宅地建物取引士の職務に必ずしも直接関係しない行為や私的な行為も含まれる。"
    },
    "answer": "ウ",
    "explanation": "宅建士証更新時に受けるのは都道府県知事が指定する講習である。5年という有効期間は正しい。",
    "choiceExplanations": {
      "ア": "当時の規定では、禁錮以上の刑に処せられたときは30日以内に登録先の都道府県知事へ届け出る（宅建業法18条・21条）。",
      "イ": "事務禁止を受けた場合には、宅建士証を交付した知事へ速やかに提出する義務があり、違反には罰則がある（22条の2・86条）。",
      "ウ": "講習の指定者は国土交通大臣ではなく都道府県知事である（22条の2・22条の3）。",
      "エ": "信用失墜行為の禁止は、職務に直接関係する行為だけに限られない（15条の2）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=16",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q30",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 30,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "割賦販売と取引時確認"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業法（以下この問において「法」という。）及び犯罪による収益の移転防止に関する法律の規定によれば、正しいものはいくつあるか。\n\nア　法第35条第2項の規定による割賦販売とは、代金の全部又は一部について、目的物の引渡し後6か月以上の期間にわたり、かつ、2回以上に分割して受領することを条件として販売することをいう。\n\nイ　犯罪による収益の移転防止に関する法律において、宅地建物取引業のうち、宅地若しくは建物の売買契約の締結又はその代理若しくは媒介が特定取引として規定されている。\n\nウ　宅地建物取引業者は、その従業者に対し、その業務を適正に実施させるため、必要な教育を行うよう努めなければならないと法に定められている。\n\nエ　宅地建物取引業者の使用人その他の従業者は、正当な理由がある場合でなければ、宅地建物取引業の業務を補助したことについて知り得た秘密を他に漏らしてはならないと法に定められている。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "なし"
    },
    "answer": "ウ",
    "explanation": "正しいのはイ・ウ・エの三つ。アの割賦販売の要件は2回以上ではなく3回以上である。",
    "choiceExplanations": {
      "ア": "アは宅建業法35条2項の回数要件に反する。引渡し後6か月以上にわたり、かつ3回以上に分割する必要がある。",
      "イ": "イは犯罪収益移転防止法令の特定取引に該当する。ウの教育の努力義務とエの秘密保持義務も法律にあるため、二つでは足りない。",
      "ウ": "イは宅地・建物の売買契約の締結、その代理又は媒介で正しい。ウは宅建業法31条の2、エは同法75条の2に合う。",
      "エ": "従業者教育は明文の努力義務であり、従業者の秘密保持も明文である。正しい記述が一つもないという選択は誤り。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=17",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/419AC0000000022?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/420CO0000000020?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q31",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 31,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "一般媒介契約"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、BからB所有の土地付建物の売却について媒介の依頼を受けた場合における次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Aが、Bと一般媒介契約を締結した場合、AがBに対し当該土地付建物の価額について意見を述べるために行った価額の査定に要した費用をBに請求することはできない。",
      "イ": "Aは、Bとの間で締結した媒介契約が一般媒介契約である場合には、専任媒介契約の場合とは異なり、法第34条の2第1項の規定に基づく書面に、売買すべき価額を記載する必要はない。",
      "ウ": "Aが、Bとの間で締結した専任媒介契約については、Bからの申出により更新することができ、その後の有効期間については、更新の時から3か月を超える内容に定めることができる。",
      "エ": "Aが、当該土地付建物の購入の媒介をCから依頼され、Cとの間で一般媒介契約を締結した場合、Aは、買主であるCに対しては、必ずしも法第34条の2第1項の規定に基づく書面を交付しなくともよい。"
    },
    "answer": "ア",
    "explanation": "媒介価額の意見を述べるための通常の査定費用は、業者が媒介業務として負担し、依頼者へ別途請求できない。",
    "choiceExplanations": {
      "ア": "一般媒介契約でも、媒介価額について意見を述べるために行う査定は媒介業務の一部に当たる（宅建業法34条の2第2項・国土交通省の解釈通知）。",
      "イ": "媒介価額は専任媒介だけでなく一般媒介の書面にも記載する（34条の2第1項）。",
      "ウ": "依頼者が申し出れば更新できるが、更新後の期間も3か月を超えられない（34条の2第4項）。",
      "エ": "購入の媒介も対象となる。買主から一般媒介の依頼を受けた業者には、その依頼者に書面を交付する義務がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=17",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000268.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q32",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 32,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "37条書面"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第37条の規定により交付すべき書面（以下この問において「37条書面」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者である売主Aは、宅地建物取引業者であるBの媒介により、宅地建物取引業者ではないCと宅地の売買契約を令和4年4月1日に締結した。AとBが共同で作成した37条書面にBの宅地建物取引士の記名押印がなされていれば、Aは37条書面にAの宅地建物取引士をして記名押印をさせる必要はない。",
      "イ": "宅地建物取引士は、37条書面を交付する際、買主から請求があったときは、宅地建物取引士証を提示しなければならない。",
      "ウ": "宅地建物取引業者である売主Dと宅地建物取引業者ではないEとの建物の売買契約において、手付金の保全措置を講ずる場合、Dはその保全措置の概要を、重要事項説明書に記載し説明する必要があるが、37条書面には記載する必要はない。",
      "エ": "宅地建物取引業者である売主と宅地建物取引業者ではない個人との建物の売買において、建物の品質に関して契約の内容に適合しない場合におけるその不適合を担保すべき責任について特約を定めたときは、37条書面にその内容を記載しなければならない。"
    },
    "answer": "ア",
    "explanation": "2022年4月1日時点では、取引に関与する業者はそれぞれ宅建士に37条書面へ記名押印させる必要がある。共同作成しても片方の宅建士だけでは足りない。",
    "choiceExplanations": {
      "ア": "売主Aと媒介Bはいずれも交付義務を負う。Bの宅建士の記名押印によってAの義務がなくなるわけではない（当時の宅建業法37条）。",
      "イ": "宅建士は、取引の関係者から求められたときに宅建士証を提示する（22条の4）。",
      "ウ": "手付金等の保全措置の概要は35条で説明する。37条書面の記載事項には挙げられていない。",
      "エ": "種類・品質に関する契約不適合を担保する責任について特約があれば、37条書面に内容を記載する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=18",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://www.mlit.go.jp/report/press/tochi_fudousan_kensetsugyo16_hh_000001_00036.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q33",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 33,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "宅建士の登録"
    ],
    "difficulty": 3,
    "question": "宅地建物取引士に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア　宅地建物取引士資格試験は未成年者でも受験することができるが、宅地建物取引士の登録は成年に達するまでいかなる場合にも受けることができない。\n\nイ　甲県知事登録の宅地建物取引士が、宅地建物取引業者（乙県知事免許）の専任の宅地建物取引士に就任するためには、宅地建物取引士の登録を乙県に移転しなければならない。\n\nウ　丙県知事登録の宅地建物取引士が、事務の禁止の処分を受けた場合、丁県に所在する宅地建物取引業者の事務所の業務に従事しようとするときでも、その禁止の期間が満了するまで、宅地建物取引士の登録の移転を丁県知事に申請することができない。\n\nエ　戊県知事登録の宅地建物取引士が、己県へ登録の移転の申請とともに宅地建物取引士証の交付を申請した場合、己県知事が宅地建物取引士証を交付するときは、戊県で交付された宅地建物取引士証の有効期間が経過するまでの期間を有効期間とする宅地建物取引士証を交付しなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "正しいのはウ・エの二つ。登録の移転は任意だが、事務禁止期間中は申請できない。",
    "choiceExplanations": {
      "ア": "アの登録には例外がある。宅建業に関し成年者と同一の行為能力を有する未成年者は、この欠格事由から除かれる（宅建業法18条）。",
      "イ": "イは誤りで、勤務先の都道府県への移転は義務ではない（19条の2）。ウは事務禁止期間中の移転申請の制限に合う。エも移転前の宅建士証の残存期間を引き継ぐため正しい（22条の2第5項）。",
      "ウ": "アとイがともに誤りであるため、正しい記述は三つにはならない。",
      "エ": "事務禁止中の移転制限と残存期間の取扱いが正しく、未成年者の登録を一律に否定する記述と移転を義務付ける記述は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=18",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q34",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 34,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "重要事項説明"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が建物の売買の媒介の際に行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、誤っているものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。",
    "choices": {
      "ア": "当該建物が既存の建物であるときは、宅地建物取引業法第34条の2第1項第4号に規定する建物状況調査を過去1年以内に実施しているかどうか、及びこれを実施している場合におけるその結果の概要を説明しなければならない。",
      "イ": "当該建物が宅地造成等規制法の規定により指定された造成宅地防災区域内にあるときは、その旨を説明しなければならない。",
      "ウ": "当該建物について、石綿の使用の有無の調査の結果が記録されているときは、その内容を説明しなければならない。",
      "エ": "当該建物（昭和56年5月31日以前に新築の工事に着手したもの）が指定確認検査機関、建築士、登録住宅性能評価機関又は地方公共団体による耐震診断を受けたものであるときは、その旨を説明しなければならない。"
    },
    "answer": "エ",
    "explanation": "対象となる旧耐震の建物が所定の耐震診断を受けていれば、その事実だけでなく診断の内容を説明する。",
    "choiceExplanations": {
      "ア": "2022年4月1日時点では、既存建物について所定の期間内の建物状況調査の有無と、実施されていれば結果の概要を説明する（宅建業法35条・施行規則）。",
      "イ": "造成宅地防災区域にある場合は、その旨が説明事項に当たる（宅建業法施行規則16条の4の3）。",
      "ウ": "石綿の使用の有無の調査結果が記録されているときは、記録の内容が説明事項となる（同条）。",
      "エ": "旧耐震の建物について、指定確認検査機関等が行った所定の耐震診断を受けていれば、その内容を説明する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=19",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/332M50004000012?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q35",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 35,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "35条書面と37条書面"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者の従業者である宅地建物取引士は、取引の関係者から事務所で従業者証明書の提示を求められたときは、この証明書に代えて従業者名簿又は宅地建物取引士証を提示することで足りる。",
      "イ": "宅地建物取引業者Aが所有する甲建物を法人Bに売却するに当たり、Bが宅地建物取引業者であるか否かにかかわらず、AはBに対し、宅地建物取引士をして、法第35条の規定に基づく書面を交付し説明をさせなければならない。",
      "ウ": "法人Cが所有する乙建物の個人Dへの賃貸を宅地建物取引業者Eが媒介し、当該賃貸借契約が成立したときは、EはDに対し、宅地建物取引士をして、法第35条の規定に基づく書面を交付し説明をさせなければならない。",
      "エ": "宅地建物取引業者Fが所有する丙宅地を法人Gに売却する契約を締結したとき、Gが宅地建物取引業者であるか否かにかかわらず、FはGに対し、法第37条の規定に基づく書面を交付しなければならない。"
    },
    "answer": "エ",
    "explanation": "売主である宅建業者は、買主が宅建業者かどうかにかかわらず、契約成立後に37条書面を交付する。",
    "choiceExplanations": {
      "ア": "従業者証明書の提示を求められたときは、当該証明書を提示する。従業者名簿や宅建士証で代用はできない（宅建業法48条）。",
      "イ": "相手方が宅建業者なら35条書面の交付は必要だが、宅建士による説明は省略される（35条6項）。",
      "ウ": "35条の説明は契約が成立するまでに必要である。「成立したとき」では間に合わない。",
      "エ": "37条書面には、35条の説明におけるような相手方が同業者の場合の省略規定がない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=19",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q36",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 36,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "重要事項説明"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。",
    "choices": {
      "ア": "建物の売買の媒介を行う場合、当該建物が既存の住宅であるときは当該建物の検査済証（宅地建物取引業法施行規則第16条の2の3第2号に定めるもの）の保存の状況について説明しなければならず、当該検査済証が存在しない場合はその旨を説明しなければならない。",
      "イ": "宅地の売買の媒介を行う場合、売買代金の額並びにその支払の時期及び方法について説明しなければならない。",
      "ウ": "建物の貸借の媒介を行う場合、当該建物が、水防法施行規則第11条第1号の規定により市町村（特別区を含む。）の長が提供する図面にその位置が表示されている場合には、当該図面が存在していることを説明すれば足りる。",
      "エ": "自ら売主となって建物の売買契約を締結する場合、当該建物の引渡しの時期について説明しなければならない。"
    },
    "answer": "ア",
    "explanation": "既存住宅の売買では指定された検査済証等の保存の状況が重要事項である。存在しなければそのことを説明する。",
    "choiceExplanations": {
      "ア": "検査済証が保存されているかどうか自体が説明事項である（宅建業法35条1項6号の2・施行規則16条の2の3）。",
      "イ": "売買代金そのものの額、支払時期・方法は37条書面の記載事項。35条で扱う金銭の項目には、売買代金等以外に授受される金銭の額・目的がある。",
      "ウ": "水害ハザードマップの存在だけでなく、図面上で物件の所在地を示す（宅建業法施行規則16条の4の3）。",
      "エ": "建物の引渡しの時期は37条書面の記載事項であり、35条の説明事項ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=20",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/332M50004000012?occasion_date=20220401",
      "https://www.mlit.go.jp/totikensangyo/const/sosei_const_fr3_000074.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q37",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 37,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "広告規制"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aがその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはいくつあるか。\n\nア　Aが未完成の建売住宅を販売する場合、建築基準法第6条第1項に基づく確認を受けた後、同項の変更の確認の申請書を提出している期間においては、変更の確認を受ける予定であることを表示し、かつ、当初の確認内容を合わせて表示すれば、変更の確認の内容を広告することができる。\n\nイ　Aが新築住宅の売買に関する広告をインターネットで行った場合、実際のものより著しく優良又は有利であると人を誤認させるような表示を行ったが、当該広告について問合せや申込みがなかつたときは、法第32条に定める誇大広告等の禁止の規定に違反しない。\n\nウ　Aが一団の宅地の販売について、数回に分けて広告をするときは、そのたびごとに広告へ取引態様の別を明示しなければならず、当該広告を見た者から売買に関する注文を受けたときも、改めて取引態様の別を明示しなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "なし"
    },
    "answer": "イ",
    "explanation": "正しいのはウのみ。広告の都度、さらに注文を受けた時にも、売主・代理・媒介のいずれかを明示する（宅建業法34条）。",
    "choiceExplanations": {
      "ア": "アは変更後の内容について必要な確認が済んでおらず誤り（33条）。イも誇大広告の禁止は表示する行為自体に及ぶため誤り（32条）。ウだけが34条に合う。",
      "イ": "取引態様の明示は正しいが、変更確認前の広告は確認予定を示しても認められない。",
      "ウ": "反響がなかったとしても、著しく優良・有利と誤認させる表示をすれば禁止規定に違反する。",
      "エ": "ウでは、広告をしたときと注文を受けたときの両方の明示を求めており正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=20",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q38",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 38,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "クーリング・オフ"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が自ら売主となる宅地の売買契約について、買受けの申込みを喫茶店で行った場合における宅地建物取引業法第37条の2の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "買受けの申込みをした者が、売買契約締結後、当該宅地の引渡しを受けた場合、クーリング・オフによる当該売買契約の解除を行うことができない。",
      "イ": "買受けの申込みをした者が宅地建物取引業者であった場合、クーリング・オフについて告げられていなくても、申込みを行った日から起算して8日を経過するまでは、書面により買受けの申込みの撤回をすることができる。",
      "ウ": "売主業者の申出により、買受けの申込みをした者の勤務先で売買契約を行った場合、クーリング・オフによる当該売買契約の解除を行うことはできない。",
      "エ": "クーリング・オフによる売買契約の解除がなされた場合において、宅地建物取引業者は、買受けの申込みをした者に対し、速やかに、当該売買契約の締結に際し受領した手付金その他の金銭を返還しなければならない。"
    },
    "answer": "エ",
    "explanation": "適法なクーリング・オフを受けた売主業者は、受領した手付金などの金銭を速やかに返還する（宅建業法37条の2第3項）。",
    "choiceExplanations": {
      "ア": "できなくなるのは引渡しを受け、かつ代金の全額を支払った場合である。引渡しだけでは足りない。",
      "イ": "取引の当事者がともに宅建業者なら37条の2は適用されない（78条2項）。そもそも8日間は申込日から数える制度ではない。",
      "ウ": "喫茶店で申込み、その後売主の申出で買主の勤務先に移って契約しても、事務所等での買主による申込みにはならない。",
      "エ": "売主業者は、契約に際し受け取った手付金等を速やかに返還する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=21",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/332M50004000012?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q39",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 39,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "宅地建物取引業保証協会"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "保証協会は、弁済業務保証金について弁済を受ける権利を有する者から認証申出書の提出があり、認証に係る事務を処理する場合には、各月ごとに、認証申出書に記載された取引が成立した時期の順序に従ってしなければならない。",
      "イ": "保証協会は、当該保証協会の社員から弁済業務保証金分担金の納付を受けたときは、その納付を受けた額に相当する額の弁済業務保証金を当該社員の主たる事務所の最寄りの供託所に供託しなければならない。",
      "ウ": "保証協会の社員が弁済業務保証金分担金を納付した後に、新たに事務所を設置したときは、その日から2週間以内に保証協会に納付すべき弁済業務保証金分担金について、国債証券をもって充てることができる。",
      "エ": "宅地建物取引業者と宅地の売買契約を締結した買主（宅地建物取引業者ではない。）は、当該宅地建物取引業者が保証協会の社員となる前にその取引により生じた債権に関し、当該保証協会が供託した弁済業務保証金について弁済を受ける権利を有する。"
    },
    "answer": "エ",
    "explanation": "保証協会の弁済業務は、その宅建業者が協会へ加入する前の取引により生じた債権にも及ぶ（宅建業法64条の8）。",
    "choiceExplanations": {
      "ア": "認証の順序は認証申出書の受理の順であり、取引成立の古い順ではない。",
      "イ": "納付を受けた分担金に相当する額は、国土交通大臣の定める供託所に供託する（64条の7）。",
      "ウ": "事務所を新設した場合にも分担金は金銭で納付する。社員が国債証券で分担金に充てることはできない（64条の9）。",
      "エ": "加入前の取引も対象に含む明文があり、宅建業者ではない買主は設問の債権で弁済を受けることができる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=21",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://laws.e-gov.go.jp/law/332M50004000012?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q40",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 40,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "IT重説"
    ],
    "difficulty": 3,
    "question": "建物の貸借の媒介を行う宅地建物取引業者が、その取引の相手方（宅地建物取引業者を除く。）に対して、次のアからエの発言に続けて宅地建物取引業法第35条の規定に基づく重要事項の説明を行った場合のうち、宅地建物取引業法の規定に違反しないものはいくつあるか。\n\nア　本日は重要事項の説明を行うためにお電話しました。お客様はIT環境をお持ちでなく映像を見ることができないとのことですので、宅地建物取引士である私が記名押印した重要事項説明書は現在お住まいの住所に郵送いたしました。このお電話にて重要事項の説明をさせていただきますので、お手元でご覧いただきながらお聞き願います。\n\nイ　建物の貸主が宅地建物取引業者で、代表者が宅地建物取引士であり建物の事情に詳しいことから、その代表者が作成し、記名押印した重要事項説明書がこちらになります。当社の宅地建物取引士は同席しますが、説明は貸主の代表者が担当します。\n\nウ　この物件の担当である弊社の宅地建物取引士が本日急用のため対応できなくなりましたが、せっかくお越しいただきましたので、重要事項説明書にある宅地建物取引士欄を訂正の上、宅地建物取引士である私が記名押印をし、代わりに説明をいたします。私の宅地建物取引士証をお見せします。\n\nエ　本日はお客様のご希望ですので、テレビ会議を用いて重要事項の説明を行います。当社の側の音声は聞こえていますでしょうか。十分に聞き取れたとのお返事、こちらにも聞こえました。では、説明を担当する私の宅地建物取引士証をお示ししますので、画面上でご確認をいただき、私の名前を読み上げていただけますでしょうか。そうです、読み方も間違いありません。それでは、双方音声・映像ともやりとりできる状況ですので、説明を始めます。事前にお送りした私が記名押印した重要事項説明書をお手元にご用意ください。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "要件を満たすのはウとエの二つ。取引士の交代は可能で、所定の要件を満たすテレビ会議での説明も認められる。",
    "choiceExplanations": {
      "ア": "アの電話だけでは映像による取引士証の確認などができない。ウは交代した取引士が記名押印し、取引士証を示して説明するので適法である。",
      "イ": "ウは適法。エも双方向の音声・映像、書面の事前送付、取引士証提示と確認という要件を満たすため適法である。",
      "ウ": "イでは説明義務を負う媒介業者の取引士が説明していない。同席だけでは足りないので、三つにはならない。",
      "エ": "アの音声のみの電話と、イの貸主代表者による説明が違反となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=22",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://www.mlit.go.jp/common/001224217.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q41",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 41,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "営業保証金"
    ],
    "difficulty": 3,
    "question": "営業保証金及び宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはいくつあるか。\n\nア　宅地建物取引業者の代表者が、その業務に関し刑法第222条（脅迫）の罪により懲役の刑に処せられたことを理由に宅地建物取引業の免許を取り消された場合、当該宅地建物取引業者であった者は、当該刑の執行を終わった日から5年間は供託した営業保証金を取り戻すことができない。\n\nイ　営業保証金の還付により、営業保証金が政令で定める額に不足することとなったため、国土交通大臣又は都道府県知事から不足額を供託すべき旨の通知書の送付を受けた宅地建物取引業者は、その送付を受けた日から2週間以内にその不足額を供託しなければならない。\n\nウ　保証協会の社員は、自らが取り扱った宅地建物取引業に係る取引の相手方から当該取引に関する苦情について解決の申出が保証協会にあり、保証協会から関係する資料の提出を求められたときは、正当な理由がある場合でなければ、これを拒んではならない。\n\nエ　保証協会の社員と宅地建物取引業に関し取引をした者は、その取引により生じた債権に関し、当該社員が納付した弁済業務保証金の額に相当する額の範囲内において弁済を受ける権利を有する。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "誤っているのはア・エの二つ。免許の欠格期間と供託金の取戻し制限は別で、弁済額の上限は社員の納めた分担金の額だけでは決まらない。",
    "choiceExplanations": {
      "ア": "アは誤りで、刑の執行を終えてから5年待つという取戻し要件はない（宅建業法30条）。エも分担金の額を基準としている点が誤りである。",
      "イ": "イは還付による不足額を通知書受領から2週間以内に供託するので正しい（28条）。ウも資料提出を正当な理由なく拒めないので正しい（64条の5）。誤りはアとエである。",
      "ウ": "保証協会の社員は、正当な理由なく資料提出を拒むことはできず、ウを誤りに数えない。",
      "エ": "還付後の営業保証金の補充期限の記述は正しい。弁済の限度は社員が非加入だった場合の営業保証金相当額である（64条の8）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=23",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q42",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 42,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "専属専任媒介契約"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、BからB所有の宅地の売却を依頼され、Bと専属専任媒介契約（以下この問において「本件媒介契約」という。）を締結した場合に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "AはBに対して、契約の相手方を探索するために行った措置など本件媒介契約に係る業務の処理状況を2週間に1回以上報告しなければならない。",
      "イ": "AがBに対し当該宅地の価額又は評価額について意見を述べるときは、その根拠を明らかにしなければならないが、根拠の明示は口頭でも書面を用いてもどちらでもよい。",
      "ウ": "本件媒介契約の有効期間について、あらかじめBからの書面による申出があるときは、3か月を超える期間を定めることができる。",
      "エ": "Aは所定の事項を指定流通機構に登録した場合、Bから引渡しの依頼がなければ、その登録を証する書面をBに引き渡さなくてもよい。"
    },
    "answer": "イ",
    "explanation": "価額や評価額について意見を述べる場合、根拠を示す必要はあるが、示し方は口頭でも書面でもよい（宅建業法34条の2第2項）。",
    "choiceExplanations": {
      "ア": "専属専任媒介では業務処理状況の報告が1週間に1回以上必要。2週間に1回以上は専任媒介の基準である。",
      "イ": "法律は根拠を明らかにすることを求める。方法を書面に限定していない。",
      "ウ": "専属専任媒介の有効期間は3か月を超えられず、依頼者の書面による申出があっても変わらない。",
      "エ": "指定流通機構に登録した業者は、登録を証する書面を遅滞なく依頼者に渡す。依頼がなくても必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=23",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401",
      "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000268.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q43",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 43,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "自ら売主の規制"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、自ら売主として行う売買契約に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。なお、買主は宅地建物取引業者ではないものとする。",
    "choices": {
      "ア": "Aが、宅地又は建物の売買契約に際して手付を受領した場合、その手付がいかなる性質のものであっても、Aが契約の履行に着手するまでの間、買主はその手付を放棄して契約の解除をすることができる。",
      "イ": "Aが、土地付建物の売買契約を締結する場合において、買主との間で、「売主は、売買物件の引渡しの日から1年間に限り当該物件の種類又は品質に関して契約の内容に適合しない場合におけるその不適合を担保する責任を負う」とする旨の特約を設けることができる。",
      "ウ": "販売代金2,500万円の宅地について、Aが売買契約の締結を行い、損害賠償の額の予定及び違約金の定めをする場合、その合計額を500万円と設定することができる。",
      "エ": "Aが建物の割賦販売を行った場合、当該建物を買主に引き渡し、かつ、代金の額の10分の3を超える額の支払を受けた後は、担保の目的で当該建物を譲り受けてはならない。"
    },
    "answer": "イ",
    "explanation": "引渡しから1年間だけに責任を限定する特約は、宅建業者が自ら売主となる取引では無効である（宅建業法40条）。",
    "choiceExplanations": {
      "ア": "買主は売主が履行に着手するまで、手付の性質にかかわらず手付を放棄して解除できる（39条）。",
      "イ": "宅建業法40条が認める期間特約は、引渡しから2年以上とするもの。1年間に限る特約では要件を満たさない。",
      "ウ": "予定損害賠償額と違約金の合計は代金の2割が上限。2,500万円の2割である500万円は上限内である（38条）。",
      "エ": "建物を引き渡し、代金の3割を超えて受領した後は、担保として当該建物を譲り受けることが禁止される（43条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=24",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01",
    "isCalculation": true
  },
  {
    "id": "takken-2022-october-gakka-q44",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 44,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "37条書面"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法（以下この問において「法」という。）第37条の規定により交付すべき書面（以下この問において「37条書面」という。）に関する次の記述のうち、宅地建物取引業者Aが法の規定に違反するものはどれか。",
    "choices": {
      "ア": "Aは、自ら売主として宅地建物取引業者ではないBとの間で宅地の売買契約を締結した。この際、当該買主の代理として宅地建物取引業者Cが関与していたことから、37条書面をBに加え、Cにも交付した。",
      "イ": "Aは、その媒介により建物の貸借の契約を成立させ、37条書面を借主に交付するに当たり、37条書面に記名した宅地建物取引士が不在であったことから、宅地建物取引士ではないAの従業員に書面を交付させた。",
      "ウ": "Aは、その媒介により借主Dと建物の貸借の契約を成立させた。この際、借賃以外の金銭の授受に関する定めがあるので、その額や当該金銭の授受の時期だけでなく、当該金銭の授受の目的についても37条書面に記載し、Dに交付した。",
      "エ": "Aは、自ら売主として宅地建物取引業者Eの媒介により、宅地建物取引業者Fと宅地の売買契約を締結した。37条書面については、A、E、Fの三者で内容を確認した上で各自作成し、交付せずにそれぞれ自ら作成した書類を保管した。"
    },
    "answer": "エ",
    "explanation": "業者同士で売買をした場合も37条書面の交付義務がある。それぞれが自分の書面を作成して保管するだけでは交付にならない。",
    "choiceExplanations": {
      "ア": "売主Aは契約相手であるBに必要な書面を交付している。加えて代理のCにも渡すことは37条違反ではない。",
      "イ": "宅建士の関与が必要なのは書面への記名等であり、書面を渡す行為は宅建士以外の従業員も行える。",
      "ウ": "借賃以外の金銭の授受に定めがあるときは、金額・時期・目的を記載する（宅建業法37条2項）。",
      "エ": "売主Aは相手方へ交付しなければならない。相手方が宅建業者であってもこの義務はなくならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=24",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q45",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 45,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "住宅瑕疵担保履行法"
    ],
    "difficulty": 3,
    "question": "特定住宅瑕疵担保責任の履行の確保等に関する法律に基づく住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者は、自ら売主として宅地建物取引業者である買主との間で新築住宅の売買契約を締結し、その住宅を引き渡す場合、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負う。",
      "イ": "住宅販売瑕疵担保責任保険契約は、新築住宅の引渡し時から10年以上有効でなければならないが、当該新築住宅の買主の承諾があれば、当該保険契約に係る保険期間を5年間に短縮することができる。",
      "ウ": "自ら売主として新築住宅を販売する宅地建物取引業者は、基準日から3週間を経過する日までの間において、当該基準日前10年間に自ら売主となる売買契約に基づき宅地建物取引業者ではない買主に引き渡した新築住宅（住宅販売瑕疵担保責任保険契約に係る新築住宅を除く。）について、住宅販売瑕担保保証金の供託をしていなければならない。",
      "エ": "宅地建物取引業者が住宅販売瑕疵担保保証金の供託をし、その額が、基準日において、販売新築住宅の合計戸数を基礎として算定する基準額を超えることとなった場合、宅地建物取引業法の免許を受けた国土交通大臣又は都道府県知事の承認がなくても、その超過額を取り戻すことができる。"
    },
    "answer": "ウ",
    "explanation": "新築住宅を宅建業者ではない買主に引き渡した場合、基準日前10年間の対象住宅について供託が必要である。保険契約を結んだ住宅は対象から除く。",
    "choiceExplanations": {
      "ア": "宅建業者が買主である取引は供託又は保険による資力確保措置の義務の対象外である（住宅瑕疵担保履行法11条）。",
      "イ": "新築住宅の引渡しから10年以上有効であることが保険の要件で、買主の承諾だけで5年に短縮できない（2条7項）。",
      "ウ": "基準日の3週間後までに、基準日前10年間に対象の買主へ引き渡した住宅について所定額を供託する（11条）。",
      "エ": "超過額を取り戻すには、免許を受けた国土交通大臣又は都道府県知事の承認が必要である（13条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=25",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/419AC0000000066?occasion_date=20220401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q46",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 46,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "住宅金融支援機構"
    ],
    "difficulty": 3,
    "question": "独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "機構は、住宅の建設又は購入に必要な資金の貸付けに係る金融機関の貸付債権の譲受けを業務として行っているが、当該住宅の建設又は購入に付随する土地又は借地権の取得に必要な資金については、譲受けの対象としていない。",
      "イ": "機構は、団体信用生命保険業務において、貸付けを受けた者が死亡した場合のみならず、重度障害となった場合においても、支払われる生命保険の保険金を当該貸付けに係る債務の弁済に充当することができる。",
      "ウ": "証券化支援事業（買取型）において、機構による譲受けの対象となる貸付債権の償還方法には、元利均等の方法であるものに加え、元金均等の方法であるものもある。",
      "エ": "機構は、証券化支援事業（買取型）において、MBS（資産担保証券）を発行することにより、債券市場（投資家）から資金を調達している。"
    },
    "answer": "ア",
    "explanation": "住宅取得に付随する土地や借地権の取得資金に係る貸付債権も、住宅金融支援機構の譲受け対象に含まれる。",
    "choiceExplanations": {
      "ア": "独立行政法人住宅金融支援機構法13条は、住宅の建設・購入に付随する土地又は借地権の取得資金を範囲に含めている。",
      "イ": "機構法の団体信用生命保険業務では、死亡だけでなく重度障害の場合も保険金の充当対象とされている。",
      "ウ": "買取型で扱う返済方式には、返済額が均等な方式と、返す元金が均等な方式がある。",
      "エ": "金融機関から譲り受けた住宅ローン債権を裏付けに、機構はMBSを発行して市場から資金を調達する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=26",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/417AC0000000082?occasion_date=20220401",
      "https://www.jhf.go.jp/about/financial/join/outline_kaitori.html",
      "https://www.flat35.com/loan/lineup/kinto/index.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q47",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 47,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "不動産広告"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "物件からスーパーマーケット等の商業施設までの徒歩所要時間は、道路距離80mにつき1分間を要するものとして算出し、1分未満の端数が生じたときは、端数を切り捨てて表示しなければならない。",
      "イ": "インターネット上に掲載した賃貸物件の広告について、掲載直前に契約済みとなっていたとしても、消費者からの問合せに対して既に契約済みであり取引できない旨を説明すれば、不当表示に問われることはない。",
      "ウ": "マンションの管理費について、住戸により管理費の額が異なる場合において、その全ての住宅の管理費を示すことが困難であるときは、最高額のみを表示すればよい。",
      "エ": "建築条件付土地の取引の広告においては、当該条件の内容、当該条件が成就しなかったときの措置の内容だけでなく、そもそも当該取引の対象が土地であることも明らかにして表示しなければならない。"
    },
    "answer": "エ",
    "explanation": "建築条件付土地の広告では、土地の取引であること、条件の内容、条件が成立しなかった場合の措置を表示する。",
    "choiceExplanations": {
      "ア": "徒歩時間は道路距離80mにつき1分とし、1分未満の端数は切り上げる。",
      "イ": "既に契約済みで取引できない物件を広告に掲載する行為は、おとり広告の規制の対象になる。問合せ後の説明では広告時の表示が適正にはならない。",
      "ウ": "住戸ごとの表示が困難な場合でも、管理費が異なるなら最低額と最高額を示す。最高額だけでは足りない。",
      "エ": "宅地の取引であることを明らかにしたうえで、建築条件と不成就時の措置を表示する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=26",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://www.rftc.jp/webkanri/kanri/wp-content/uploads/2022/03/20220216_hyoujikiyaku-kaiseian.pdf",
      "https://www.rftc.jp/koseikyosokiyaku/"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q48",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 48,
    "officialAnswerNumber": null,
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "不動産統計"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "建築着工統計調査報告（令和3年計。令和4年1月公表）によれば、令和3年の新設住宅の着工戸数のうち、持家は前年比で増加したが、貸家及び分譲住宅は前年比で減少した。",
      "イ": "令和4年地価公示（令和4年3月公表）によれば、令和3年1月以降の1年間の住宅地の地価は、三大都市圏平均では下落したものの、それ以外の地方圏平均では上昇した。",
      "ウ": "令和4年版土地白書（令和4年6月公表）によれば、令和3年の全国の土地取引件数は約133万件となり、土地取引件数の対前年比は令和元年以降減少が続いている。",
      "エ": "国土交通省の公表する不動産価格指数のうち、全国の商業用不動産総合の季節調整値は、2021年（令和3年）においては第1四半期から第4四半期まで連続で対前期比増となった。"
    },
    "answer": [],
    "explanation": "第4肢の統計が改訂されたため、試験実施団体は正答肢なしとし、すべての解答を正解扱いとした。",
    "choiceExplanations": {
      "ア": "令和3年の新設住宅着工戸数は持家で9.4%増、貸家で4.8%増、分譲住宅で1.5%増。貸家と分譲住宅も増加している。",
      "イ": "令和4年地価公示の住宅地は、三大都市圏平均も地方圏平均も0.5%上昇した。",
      "ウ": "令和3年は約133万件だが、令和2年の約127万件から増えた。件数が減り続けたという記述は誤りである。",
      "エ": "2022年9月30日の国土交通省公表に伴い、2021年第2四半期の前期比が＋0.7%から▲0.0%に改訂された。4四半期連続の上昇ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=27",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/report/press/content/kencha21.pdf#page=2",
      "https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/content/001470654.pdf",
      "https://www.mlit.go.jp/seisakutokatsu/hyouka/content/001520639.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01",
    "officialScoring": {
      "kind": "credit-for-all",
      "reason": "実施団体は第4肢の統計改訂を受けて正答肢なしとし、すべての解答を正解扱いとした。"
    },
    "choiceFactTruth": {
      "ア": false,
      "イ": false,
      "ウ": false,
      "エ": false
    }
  },
  {
    "id": "takken-2022-october-gakka-q49",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 49,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "土地と災害"
    ],
    "difficulty": 3,
    "question": "土地に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "台地の上の浅い谷は、豪雨時には一時的に浸水することがあり、注意を要する。",
      "イ": "低地は、一般に洪水や地震などに対して強く、防災的見地から住宅地として好ましい。",
      "ウ": "埋立地は、平均海面に対し4～5mの比高があり護岸が強固であれば、住宅地としても利用が可能である。",
      "エ": "国土交通省が運営するハザードマップポータルサイトでは、洪水、土砂災害、高潮、津波のリスク情報などを地図や写真に重ねて表示できる。"
    },
    "answer": "イ",
    "explanation": "低地は洪水や内水氾濫等の影響を受け得る。地盤によっては揺れや液状化にも注意が要るため、防災面から一般に好ましいとはいえない。",
    "choiceExplanations": {
      "ア": "台地でも浅い谷には周囲から水が集まる。豪雨時には一時的に浸水する場合がある。",
      "イ": "洪水や地震に強いと低地一般についていえるわけではない。地形や地盤の条件を確認する必要がある。",
      "ウ": "設問は海面との高低差と強固な護岸がある場合の利用可能性を述べている。実際の安全性は高潮や地盤の条件にも左右される。",
      "エ": "国のハザードマップポータルサイトでは、各災害のリスク情報を地図などに重ねて確認できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=27",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://www.gsi.go.jp/bousaichiri/bousaichiri41051.html",
      "https://disaportal.gsi.go.jp/"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  },
  {
    "id": "takken-2022-october-gakka-q50",
    "exam": "takken",
    "session": "gakka",
    "year": 2022,
    "season": "october",
    "qNumber": 50,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "建築物の構造"
    ],
    "difficulty": 3,
    "question": "建築物の構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "木構造は、主要構造を木質系材料で構成するものであり、在来軸組構法での主要構造は、一般に軸組、小屋組、床組からなる。",
      "イ": "在来軸組構法の軸組は、通常、水平材である土台、桁、胴差と、垂直材の柱及び耐力壁からなる。",
      "ウ": "小屋組は、屋根の骨組であり、小屋梁、小屋束、母屋、垂木等の部材を組み合わせた和小屋と、陸梁、束、方杖等の部材で形成するトラス構造の洋小屋がある。",
      "エ": "軸組に仕上げを施した壁には、真壁と大壁があり、真壁のみで構成する洋風構造と、大壁のみで構成する和風構造があるが、これらを併用する場合はない。"
    },
    "answer": "エ",
    "explanation": "真壁は柱を見せる納まり、大壁は柱を壁の仕上げで覆う納まりである。同じ建物の中で併用できる。",
    "choiceExplanations": {
      "ア": "在来軸組構法の木造建築物では、軸組、小屋組、床組がそれぞれ壁・屋根・床を含む骨組を構成する。",
      "イ": "土台・桁・胴差などの横架材と、柱・耐力壁などの縦の要素が軸組を構成する。",
      "ウ": "在来の和小屋は小屋束・母屋等を組み、洋小屋は陸梁・方杖などを組んだトラスで屋根を支える。",
      "エ": "柱が見えるかどうかは壁の納まりの違いであり、建物全体を和風・洋風のどちらか一方に限定する分類ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf#page=27",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和4年度宅地建物取引士資格試験 問題・正解番号表",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001879388.pdf",
      "https://www.mlit.go.jp/common/000030417.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2022-04-01"
  }
];
