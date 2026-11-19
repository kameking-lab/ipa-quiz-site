import type { Question } from "@/lib/questions/types";

export const KANRI_2021_QUESTIONS: Question[] = [
  {
    "id": "kanri-2021-annual-gakka-q1",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 1,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "民法",
    "topicTags": [
      "心裡留保",
      "虚偽表示",
      "取消し"
    ],
    "difficulty": 3,
    "question": "Ａが、Ｂとの間で、自己の所有するマンションの一住戸甲をＢに売却する旨の契約を締結した場合に関する次の記述のうち、民法の規定によれば、最も適切なものはどれか。",
    "choices": {
      "ア": "Ａが、所有権を移転する意思がないにもかかわらず、Ｂと売買契約を締結した場合に、Ｂがその真意を知り、又は知ることができたときは、Ａは、Ｂに対して当該契約の無効を主張することができる。",
      "イ": "Ａが、所有権を移転する意思がないにもかかわらず、Ｂと通謀して売買契約を締結し、所有権移転登記を済ませた後に、ＢがＡに無断で、その事情を知らない第三者Ｃに甲を転売した場合に、Ｃにその事情を知らないことについて過失があるときは、Ａは、Ｃに対して、虚偽表示による当該売買契約の無効を主張することができる。",
      "ウ": "Ａが、Ｂの詐欺を理由として当該売買契約を取り消した場合に、Ａの取消し前に、Ｂが、その事情を知らず、かつその事情を知らないことについて過失のある第三者Ｄに甲を転売していたときは、Ａは、Ｄに対して取消しの効果を主張することができない。",
      "エ": "Ａが、Ｂの強迫を理由として当該売買契約を取り消した場合に、Ａの取消し前に、Ｂが、その事情を知らず、かつその事情を知らないことについて過失のない第三者Ｅに甲を転売していたときは、Ａは、Ｅに対して取消しの効果を主張することができない。"
    },
    "answer": "ア",
    "explanation": "民法93条1項により、真意に反することを相手方が知り、又は知ることができたときは意思表示が無効になる。",
    "choiceExplanations": {
      "ア": "Ｂは真意を知り得たので、ＡはＢに無効を主張できる。",
      "イ": "94条2項が虚偽表示の無効から保護するのは善意の第三者であり、この設例でＣに無過失は要求されない。",
      "ウ": "96条3項で詐欺の取消しに対抗できる第三者は善意・無過失。Ｄには過失がある。",
      "エ": "96条3項の第三者保護は詐欺による取消しを対象とする。強迫による取消しについてＡはＥに対抗できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問1（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q2",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 2,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "民法",
    "topicTags": [
      "連帯債務",
      "相殺",
      "求償"
    ],
    "difficulty": 3,
    "question": "Ａ、Ｂ、Ｃが、マンションの一住戸甲を共同して購入するための資金として、Ｄから900万円を借り受け、Ｄとの間で、各自が連帯してその債務を負う旨の合意をした場合に関する次の記述のうち、民法の規定によれば、最も不適切なものはどれか。ただし、Ａ、Ｂ、Ｃの間の負担部分は等しいものとし、元本900万円以外は考慮しないものとする。",
    "choices": {
      "ア": "Ａが、Ｄに対して600万円を弁済し、残債務の支払を免除された場合に、Ｂは、Ｄから300万円の支払の請求を受けたときは、これを拒むことができない。",
      "イ": "Ｂが、Ｄに対して、270万円を弁済した場合に、Ｂは、ＡとＣのそれぞれに対して、90万円について求償することができる。",
      "ウ": "Ｃが、Ｄに対して有する600万円の代金債権との相殺を援用しない場合に、Ａは、Ｄから900万円の支払請求を受けたときは、ＣがＤに対して当該債権を有することを理由に600万円についてＤの支払請求を拒むことができる。",
      "エ": "Ｃが、Ｄに対して、700万円を弁済したが、Ｂに資力がない場合に、Ｂから償還を受けることができないことについてＣに過失がないときは、Ｃは、Ａに対して、350万円を求償することができる。"
    },
    "answer": "ウ",
    "explanation": "Ｃが相殺を援用しない間、Ａが履行を拒めるのはＣの負担部分300万円まで（民法439条2項）。",
    "choiceExplanations": {
      "ア": "免除は原則としてＡとＤの関係で効く（441条）。弁済後に残った300万円はＢにも請求できる。",
      "イ": "270万円で共同の免責を得たため、自己の負担部分を超えない弁済でも各人に90万円ずつ求償できる（442条）。",
      "ウ": "Ｃの反対債権600万円がそのままＡの履行拒絶額になるわけではない。Ｃ自身の負担部分900÷3＝300万円が上限。",
      "エ": "700万円のうちＢの負担相当分をＡとＣで等分する。ＣはＡに700÷3＋700÷6＝350万円を求償できる（444条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問2（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q3",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 3,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "民法",
    "topicTags": [
      "債権者代位権"
    ],
    "difficulty": 3,
    "question": "マンションの管理組合法人Ａは、区分所有者Ｂに対して有する200万円の管理費債権を保全するため、Ｂの債務者Ｃに対する500万円の金銭債権を代位行使した場合に関する記述のうち、民法の規定によれば、最も適切なものはどれか。",
    "choices": {
      "ア": "Ａの代位権の行使は、Ｂの代理人としてＢの権利を行使するものであるから、Ａが自己の権利として行使することは認められない。",
      "イ": "Ａが代位権を行使をすることができる債権額は500万円であり、Ｂに対する債権額である200万円に制限されない。",
      "ウ": "ＣがＢに対して反対債権を有していたときでも、Ｃは、Ａに対して、相殺の抗弁を主張することができない。",
      "エ": "Ａは、Ｃに対して、Ａ自身への直接の支払を求めることができる。"
    },
    "answer": "エ",
    "explanation": "金銭債権を代位行使する管理組合法人Ａは、Ｃに対し、自己への直接の支払を求められる（民法423条の3）。",
    "choiceExplanations": {
      "ア": "Ａは自己の債権を保全するために民法423条の代位権を行使する。Ｂから代理権を授与される必要はない。",
      "イ": "可分な金銭債権の代位行使は自己の債権額200万円が限度（423条の2）。",
      "ウ": "ＣはＢに対して主張できる抗弁をＡにも対抗できるため、要件を満たせばＣの反対債権による相殺も妨げられない（423条の4）。",
      "エ": "Ａへの支払を請求でき、実際に支払われれば、その限度でＣのＢに対する債務は消滅する（423条の3）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問3（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q4",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 4,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "民法",
    "topicTags": [
      "任意代理",
      "無権代理"
    ],
    "difficulty": 3,
    "question": "Ａが、自己の所有するマンションの一住戸甲をＢに売却する契約の締結について、Ｃに代理権を授与した場合に関する次の記述のうち、民法の規定によれば、最も不適切なものはどれか。",
    "choices": {
      "ア": "Ｃが制限行為能力者であった場合に、Ａは、Ｃの制限行為能力を理由に代理行為を取り消すことができない。",
      "イ": "Ｃが、売却代金を着服する目的で、当該代理権の範囲内において、当該契約を締結した場合に、Ｂが、Ｃの当該目的を知ることができたときは、Ｃの行為は代理権を有しない者がした行為とみなされる。",
      "ウ": "Ｃの子Ｄは、ＣがＡから預かった書類をＡ及びＣに無断で持ち出し、Ａの代理人と称して当該契約を締結したところ、これを知ったＢが、Ａに対して、追認をするかどうかを確答すべき旨の催告をした場合に、相当の期間内に確答がなかったときは、Ａは追認をしたものとみなされる。",
      "エ": "Ｃは、Ａの許諾を得たとき、又はやむを得ない事由があるときでなければ、復代理人を選任することができない。"
    },
    "answer": "ウ",
    "explanation": "無権代理の相手方が本人に確答を求め、相当期間内に本人が回答しないときは追認拒絶とみなす（民法114条）。",
    "choiceExplanations": {
      "ア": "任意代理人Ｃの制限行為能力を理由として、本人Ａが代理行為を取り消すことはできない（102条）。",
      "イ": "代理権の範囲内の取引でも、着服目的を相手方が知り得た場合は、代理権の濫用として無権代理扱いになる（107条）。",
      "ウ": "ＤはＡから代理権を得ていない。追認するかの催告にＡが答えなければ追認拒絶とみなす。",
      "エ": "委任による代理人の復代理人選任には、本人の許諾又はやむを得ない事由が必要（104条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問4（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q5",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 5,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "民法",
    "topicTags": [
      "管理費",
      "消滅時効"
    ],
    "difficulty": 3,
    "question": "マンションの管理組合Ａの管理費に関する次の記述のうち、民法の規定によれば、最も不適切なものはどれか。",
    "choices": {
      "ア": "Ａが、管理費を滞納している区分所有者Ｂに対して、滞納管理費を請求する訴訟を提起し、勝訴した場合には、当該滞納管理費債権は、確定判決を得た時から10年間これを行使しないときは、時効によって消滅する。",
      "イ": "Ａが、管理費を滞納している区分所有者Ｃに対して、管理費の支払を催告した場合に、その時から6箇月を経過するまでに管理組合が再度催告をしたときには、再度の催告は時効の完成猶予の効力を有しない。",
      "ウ": "管理費を滞納している区分所有者Ｄが、Ａに対して、管理費を滞納していることを書面により認めたときは、その時から時効の更新の効力が生じる。",
      "エ": "Ａの管理規約において、各区分所有者は、Ａに対する債務の消滅時効を主張することができない旨が定められていた場合には、区分所有者Ｅは、滞納した管理費の債務について、時効が完成したとしても、それによる債務の消滅を主張することができない。"
    },
    "answer": "エ",
    "explanation": "時効の利益はあらかじめ放棄できない（民法146条）。時効完成前に規約で一律に援用を禁じても、この規定に反する。",
    "choiceExplanations": {
      "ア": "確定判決で確定した弁済期の到来した債権の時効期間は、元の期間が短くても10年（169条）。",
      "イ": "催告による完成猶予中の再度の催告に、重ねて完成を猶予する効力はない（150条）。",
      "ウ": "債務者の書面による債務の承認で時効が更新され、その時から新たに進行する（152条）。",
      "エ": "管理規約を置くだけで、区分所有者の消滅時効の利益を事前に奪うことはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問5（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q6",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 6,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "標準管理委託契約書",
    "topicTags": [
      "再委託",
      "事務室",
      "解約"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、標準管理委託契約書によれば、最も不適切なものはどれか。",
    "choices": {
      "ア": "マンション管理業者は、事務管理業務の管理事務の全部を、第三者に再委託することができる。",
      "イ": "管理組合は、マンション管理業者に管理事務を行わせるために不可欠な管理事務室、管理用倉庫、清掃員控室、器具、備品等を無償で使用させるものとする。",
      "ウ": "マンション管理業者は、事務管理業務のうち出納業務を行う場合において、管理組合の組合員に対し管理委託契約に従って管理費等の督促を行っても、なお当該組合員が支払わないときは、その責めを免れるものとし、その後の収納の請求は管理組合が行うものとする。",
      "エ": "管理組合及びマンション管理業者は、解除事由の有無にかかわらず、その相手方に対し、少なくとも3月前に書面で解約の申入れを行うことにより、本契約を終了させることができる。"
    },
    "answer": "ア",
    "explanation": "標準管理委託契約書4条は、事務管理業務の一部の再委託を認める。事務管理業務の全部を第三者に任せることはできない。",
    "choiceExplanations": {
      "ア": "同条で全部又は一部の再委託を認めるのは管理員業務、清掃業務、建物・設備管理業務。事務管理業務との区別が必要。",
      "イ": "管理事務に不可欠な事務室等は、管理組合が管理業者に無償で使用させる（6条）。",
      "ウ": "所定の督促をしても未払いなら、管理業者は収納について責任を免れ、その後の請求は管理組合が行う（10条・別表第1）。",
      "エ": "19条は、相手方に少なくとも3月前に書面で申し入れることで、解除事由の有無にかかわらず契約を終了できるとする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問6（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001225099.pdf",
      "https://laws.e-gov.go.jp/law/412AC1000000149?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q7",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 7,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理委託契約書",
    "topicTags": [
      "管理情報の開示"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が、管理組合の組合員から、当該組合員が所有する専有部分の売却の依頼を受け、その媒介の業務のために、管理規約の提供及び「別表第5（宅地建物取引業者等の求めに応じて開示する事項）」に掲げる事項の開示を求めてきた場合に、マンション管理業者が当該管理組合に代わって行う対応に関する次の記述のうち、標準管理委託契約書によれば、適切なものはいくつあるか。ただし、マンション管理業者は、その対応にあたって組合員等の個人情報の保護等を踏まえながら行うものとする。\nア　マンション管理業者は、管理規約の提供等の業務に要する費用を当該宅地建物取引業者から受領することはできない。\nイ　マンション管理業者は、当該組合員が管理費等を滞納していることが明らかな場合であっても、当該宅地建物取引業者に対し、その清算に関する必要な措置を求めることはできない。\nウ　マンション管理業者が管理規約の提供等を行う場合にあっては、管理規約等において宅地建物取引業者等への提供・開示に関する根拠が明確に規定されるとともに、これと整合的に管理委託契約書においてマンション管理業者による提供・開示に関して規定されることが必要である。\nエ　管理組合の財務・管理に関する情報を、宅地建物取引業者を通じて専有部分の購入等を予定する者に提供・開示することは、当該購入予定者等の利益の保護等に資するとともに、マンション内におけるトラブルの未然防止、組合運営の円滑化、マンションの資産価値の向上等の観点からも有意義である。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "適切なのはウ・エの二つ。標準管理委託契約書14条と同コメントは、規約等で開示の根拠を明確にし、購入予定者への情報提供に役立てるとしている。",
    "choiceExplanations": {
      "ア": "一つではない。ウの開示の根拠と、エの購入予定者への情報提供の意義がいずれも適切。",
      "イ": "二つ。ウ・エが該当する。アは費用を受け取れる点、イは滞納の清算に向けた措置を求められる点を誤っている。",
      "ウ": "三つではない。管理業者は提供等に要する費用を当該宅建業者から受領できるので、アは不適切。",
      "エ": "四つではない。費用を受け取れることに加え、滞納が明らかなら宅建業者に清算に関する必要な措置を求められるので、ア・イは不適切。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問7（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001225099.pdf",
      "https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000269.html"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q8",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 8,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理委託契約書",
    "topicTags": [
      "緊急業務",
      "立入り",
      "免責"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、標準管理委託契約書によれば、最も不適切なものはどれか。",
    "choices": {
      "ア": "マンション管理業者は、地震の発生により、管理組合のために、緊急に行う必要がある業務で、管理組合の承認を受ける時間的な余裕がないものについて、管理組合の承認を受けないで実施した場合においては、速やかに、書面をもって、その業務の内容及びその実施に要した費用の額を管理組合に通知しなければならない。",
      "イ": "管理組合は、マンション管理業者が火災の発生により、緊急に行う必要がある業務を遂行する上でやむを得ず支出した費用であれば、その発生原因が当該マンション管理業者の責めによるものであったとしても、当該マンション管理業者に対して、その費用を速やかに支払わなければならない。",
      "ウ": "マンション管理業者は、漏水の発生により、管理組合のために緊急に行う必要がある場合、専有部分等に立ち入ることができるが、この場合において、マンション管理業者は、管理組合及びマンション管理業者が立ち入った専有部分等に係る組合員等に対し、事後速やかに、報告をしなければならない。",
      "エ": "マンション管理業者は、マンション管理業者の責めによらない火災の発生により、管理組合又は管理組合の組合員等が損害を受けたときは、その損害を賠償する責任を負わない。"
    },
    "answer": "イ",
    "explanation": "管理業者の責めに帰すべき事由で緊急業務が必要になった場合、標準管理委託契約書8条2項の費用負担の対象から外れる。",
    "choiceExplanations": {
      "ア": "事前承認なしに緊急業務を実施したなら、速やかに内容と費用を管理組合へ書面で通知する（8条1項）。",
      "イ": "原因が管理業者の責めによる場合まで、組合に緊急業務費用の支払を求める規定ではない。",
      "ウ": "緊急時の専有部分等への立入りが認められ、事後速やかに管理組合と関係する組合員等へ報告する（13条）。",
      "エ": "管理業者の責めによらない火災による損害は、免責事由の規定に該当する（17条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問8（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001225099.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q9",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 9,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "管理費の滞納",
    "topicTags": [
      "共有",
      "破産手続",
      "訴訟代理"
    ],
    "difficulty": 3,
    "question": "管理業務主任者が、管理費の滞納問題について、管理組合の理事会で行った次の説明のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "管理費を滞納している区分所有者がその有する専有部分を第三者に賃貸しているときは、現に専有部分に居住している賃借人が、管理組合に対して管理費の支払義務を負います。",
      "イ": "専有部分を2名の区分所有者が各2分の1の持分で共有しているときには、管理組合は、そのいずれか一方の区分所有者に対して滞納管理費の全額を請求することができます。",
      "ウ": "区分所有者が自己破産し、破産手続開始の決定があったときには、管理組合は、滞納管理費債権について、破産手続に参加することができます。",
      "エ": "滞納管理費について、マンション管理業者は、地方裁判所においては、管理組合の訴訟代理人になることはできません。"
    },
    "answer": "ア",
    "explanation": "管理組合への管理費の支払義務は区分所有者にある。賃貸したことだけで、賃借人が管理組合への支払義務を負うわけではない。",
    "choiceExplanations": {
      "ア": "賃貸借契約で賃料等の負担を定めても、その契約は賃貸人と賃借人の間の取り決め。組合に対する区分所有者の義務とは別に扱う。",
      "イ": "一つの専有部分を共有している場合の滞納管理費は不可分債務として、共有者の一方にも全額を請求できる（民法430条）。",
      "ウ": "管理組合は破産手続開始前の滞納管理費について破産債権者として手続に参加できる。",
      "エ": "地方裁判所では、管理を受託していることだけで訴訟代理人になれない（民事訴訟法54条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問9（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/408AC0000000109?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/416AC0000000075?occasion_date=20210401",
      "https://www.mlit.go.jp/kankocho/content/001216238.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q10",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 10,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "管理費の滞納",
    "topicTags": [
      "催告",
      "支払督促",
      "少額訴訟"
    ],
    "difficulty": 3,
    "question": "管理費の滞納が生じたときにとられる通常の民事訴訟によらない法的手段に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "「内容証明郵便による督促」の場合は、簡便な手続であるが、消滅時効の完成猶予をさせる催告としての効力は生じない。",
      "イ": "「支払督促」による場合は、簡易裁判所に申し立てることにより書記官が支払を命ずる簡略な手続であるが、債務者から異議申立てがなされると通常の訴訟に移行してしまう。",
      "ウ": "「調停」による場合は、弁護士等の専門家に依頼することはできないが、手続が訴訟に比べ簡明であり、調停委員の意見には強制力があることから、紛争が早期に解決される。",
      "エ": "「少額訴訟」による場合は、通常訴訟に比べ、少ない経済的負担で迅速かつ効果的に解決することができるが、訴訟の目的の価額が60万円以下に制限されるため、滞納額が60万円を超えるときは、制限額以下に分割したとしてもこの手続を利用できない。"
    },
    "answer": "イ",
    "explanation": "支払督促は裁判所書記官が発し、適法な督促異議があると請求について訴えを提起したものとみなされる（民事訴訟法382・395条）。",
    "choiceExplanations": {
      "ア": "管理費の支払を求める催告が到達すれば、民法150条の時効完成猶予を生じ得る。内容証明郵便は通知内容を証明する方法。",
      "イ": "金銭請求などについて申立てに基づき書記官が発する。適法な異議が出れば、請求額に応じた裁判所の訴訟手続に移る。",
      "ウ": "調停で弁護士に依頼することは可能。調停委員から示された解決案は、当事者の合意に代わるものではない。",
      "エ": "少額訴訟の60万円の上限は、実際に請求する訴訟の目的の価額に関するもの。請求の一部だけを対象にすることまで一律に禁じてはいない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問10（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/408AC0000000109?occasion_date=20210401",
      "https://www.courts.go.jp/vc-files/courts/2020/kanmin/kansai-honbun.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q11",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 11,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "管理費の滞納",
    "topicTags": [
      "特定承継人",
      "免責",
      "遅延損害金"
    ],
    "difficulty": 3,
    "question": "管理費の滞納に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "滞納者が、所有している専有部分を売却し、区分所有者でなくなった場合、その専有部分の買受人である区分所有者が滞納管理費債務を承継し、当該滞納者は滞納管理費債務を免れる。",
      "イ": "滞納者が破産手続開始の決定を受けた場合でも、その決定だけでは、当該滞納者は管理費の支払義務を免れるわけではない。",
      "ウ": "滞納者が死亡し、その相続人全員が相続放棄した場合には、いずれの相続人も滞納管理費債務を負わない。",
      "エ": "管理規約に管理費について遅延損害金の定めがない場合でも、民法に定める法定利率によって遅延損害金を請求することができる。"
    },
    "answer": "ア",
    "explanation": "専有部分が売却されると、管理費の滞納分は特定承継人にも請求できる（区分所有法7・8条）。売却した元の区分所有者の債務は、それだけでは消えない。",
    "choiceExplanations": {
      "ア": "買受人への請求が認められる一方で、元の区分所有者に対する請求もできる。",
      "イ": "開始決定は破産手続を始める裁判で、従前の債務の免責には別に免責許可の決定が必要。",
      "ウ": "相続放棄した者は初めから相続人にならなかったものと扱われるので、被相続人の管理費債務を相続しない（民法939条）。",
      "エ": "金銭債務の遅延損害金は、規約に定めがない場合も民法419条により法定利率で算定できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問11（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/416AC0000000075?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q12",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 12,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理規約",
    "topicTags": [
      "収支",
      "修繕積立金",
      "緊急工事"
    ],
    "difficulty": 3,
    "question": "管理組合の会計等に関する次の記述のうち、標準管理規約（単棟型）によれば、不適切なものはいくつあるか。\nア　預金口座に係る印鑑等の保管にあたっては、適切な取扱い方法を検討し、その取扱いについて総会の承認を得て細則等に定めておくことが望ましい。\nイ　理事会の議決事項の中には、収支決算案、事業報告案、収支予算案及び事業計画案がある。\nウ　災害等により総会の開催が困難である場合に、応急的な修繕工事の実施等を理事会で決議したときには、理事会は、当該工事の実施に充てるための修繕積立金の取崩しについて決議できるが、資金の借入れについては決議できない。\nエ　修繕積立金の保管及び運用方法を決めるにあたっては、理事会の決議だけで足り、総会の決議は不要である。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "不適切なのはウ・エの二つ。災害時の応急修繕のための借入れは条件を満たせば理事会で決議でき、修繕積立金の保管・運用方法は総会で決める。",
    "choiceExplanations": {
      "ア": "一つではない。ウは借入れを一律に否定するため、エは総会決議を不要とするため、両方が不適切。",
      "イ": "二つ。総会の開催が困難な場合の例外と、通常の修繕積立金の保管・運用を区別する（標準管理規約48・54条）。",
      "ウ": "三つではない。アは規約コメントの示す印鑑等の取扱いに沿い、イは54条の理事会の議決事項に沿う。",
      "エ": "四つではない。アの総会承認を経た取扱いと、イの理事会で審議する各案は、どちらも適切。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問12（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/kankocho/content/001216238.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q13",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 13,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "標準管理委託契約書",
    "topicTags": [
      "管理事務報告",
      "書類提示"
    ],
    "difficulty": 3,
    "question": "マンション管理業者による管理事務の報告等に関する次の記述のうち、標準管理委託契約書によれば、最も適切なものはどれか。",
    "choices": {
      "ア": "マンション管理業者は、管理組合の事業年度終了後あらかじめ管理委託契約書で定められた期間内に、管理組合に対し、当該年度における管理事務の処理状況及び管理組合の会計の収支の結果を記載した書面を交付し、報告しなければならないが、その報告をする者は管理業務主任者である必要はない。",
      "イ": "マンション管理業者は、毎月末日までに、管理組合に対し、前月における管理事務の処理状況に関する書面を交付しなければならない。",
      "ウ": "管理組合からマンション管理業者に対し、あらかじめ管理委託契約書で定められていない時期に、管理事務の処理状況及び管理組合の会計の収支状況について報告を行うよう請求があるときは、マンション管理業者は、管理業務主任者をして、その報告をさせなければならない。",
      "エ": "マンション管理業者が、管理組合に対し、管理事務の処理状況及び管理組合の会計の収支状況について報告を行う場合に、管理組合は、マンション管理業者に対し、それらに係る関係書類の提示を求めることができる。"
    },
    "answer": "エ",
    "explanation": "標準管理委託契約書9条4項により、管理組合は管理事務や会計収支の報告に関係する書類の提示を求められる。",
    "choiceExplanations": {
      "ア": "事業年度終了後に契約で定めた期間内にする報告は、管理業務主任者に行わせる（9条1項）。",
      "イ": "毎月末日までに交付する前月分の書面は、管理組合の会計の収支状況に関するもの（9条2項）。",
      "ウ": "契約書で定めていない時期の請求に応じる報告については、管理業務主任者に行わせるとまでは定めていない（9条3項）。",
      "エ": "報告を受ける管理組合は、その裏付けとなる関係書類の提示を求められる（9条4項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問13（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001225099.pdf",
      "https://laws.e-gov.go.jp/law/412AC1000000149?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q14",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 14,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "管理組合会計",
    "topicTags": [
      "貸借対照表",
      "前払金",
      "前受金"
    ],
    "difficulty": 3,
    "question": "以下の貸借対照表（勘定式）は、甲管理組合の令和3年3月末日の決算において作成された一般（管理費）会計にかかる未完成の貸借対照表である。貸借対照表を完成させるために、表中の（Ａ）及び（Ｂ）の科目と金額の組合せとして最も適切なものは、次の1～4のうちどれか。\n\n一般（管理費）会計貸借対照表\n令和3年3月31日現在（単位：円）\n\n| 資産の部・科目 | 金額 | 負債・繰越金の部・科目 | 金額 |\n| --- | ---: | --- | ---: |\n| 現金 | 100,000 | 未払金 | 200,000 |\n| 普通預金 | 900,000 | 預り金 | 100,000 |\n| （Ａ） |  | （Ｂ） |  |\n| 未収入金 | 100,000 | 次期繰越剰余金 | 800,000 |\n| 資産の部合計 | 1,500,000 | 負債・繰越金の部合計 | 1,500,000 |",
    "choices": {
      "ア": "Ａ 前払金 400,000円 ／ Ｂ 前受金 400,000円",
      "イ": "Ａ 前払金 600,000円 ／ Ｂ 前受金 600,000円",
      "ウ": "Ａ 前受金 400,000円 ／ Ｂ 前払金 400,000円",
      "エ": "Ａ 前受金 600,000円 ／ Ｂ 前払金 600,000円"
    },
    "answer": "ア",
    "explanation": "資産欄と負債・繰越金欄の不足額はどちらも40万円。資産のＡに前払金、負債のＢに前受金を入れる。",
    "choiceExplanations": {
      "ア": "資産は150万円−（10万円＋90万円＋10万円）＝40万円、負債・繰越金は150万円−（20万円＋10万円＋80万円）＝40万円。科目と金額が合う。",
      "イ": "前払金・前受金の科目は合うが、各60万円では貸借の各欄の合計が170万円になり、設問の150万円と一致しない。",
      "ウ": "金額の40万円は合うが、将来の給付を受ける権利である前払金を負債側、将来分の収入を先に受け取った前受金を資産側に置く点が誤り。",
      "エ": "資産に前受金、負債に前払金を置いていることに加え、各60万円ではいずれの合計額も150万円にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問14（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01",
    "imageUrls": [
      "/questions/kanri/2021-annual/q14-p11.jpg"
    ],
    "imageAltTexts": [
      "令和3年度 問14の原本 PDF p.11"
    ]
  },
  {
    "id": "kanri-2021-annual-gakka-q15",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 15,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "管理組合会計",
    "topicTags": [
      "発生主義",
      "未収入金",
      "前受金"
    ],
    "difficulty": 3,
    "question": "管理組合における以下の①～③の活動に関し、令和3年3月分の仕訳として最も適切なものは、次の1～4のうちどれか。ただし、会計処理は毎月次において発生主義の原則によって処理されているものとする。（管理組合の会計年度：毎年4月1日から翌年3月31日まで）\n\n活動\n令和3年3月中の管理組合の普通預金の入金の内訳は、次の①～③の通りである。\n\n| 区分 | 科目 | 月・金額 | 計 |\n| --- | --- | --- | ---: |\n| ① 令和3年2月以前分 | 管理費収入 | 1月分100,000円、2月分150,000円 | 250,000円 |\n| ① 令和3年2月以前分 | 修繕積立金収入 | 1月分10,000円、2月分20,000円 | 30,000円 |\n| ② 令和3年3月分 | 管理費収入／修繕積立金収入 | 250,000円／50,000円 | 300,000円 |\n| ③ 令和3年4月分 | 管理費収入／修繕積立金収入 | 2,500,000円／500,000円 | 3,000,000円 |\n| 合計 |  |  | 3,580,000円 |",
    "choices": {
      "ア": "借方：普通預金3,580,000円 ／ 貸方：未収入金280,000円、管理費収入250,000円、修繕積立金収入50,000円、前受金3,000,000円",
      "イ": "借方：普通預金3,580,000円 ／ 貸方：管理費収入3,000,000円、修繕積立金収入580,000円",
      "ウ": "借方：普通預金3,580,000円 ／ 貸方：管理費収入500,000円、修繕積立金収入80,000円、前受金3,000,000円",
      "エ": "借方：普通預金3,580,000円 ／ 貸方：未収入金280,000円、管理費収入2,750,000円、修繕積立金収入550,000円"
    },
    "answer": "ア",
    "explanation": "3月入金358万円の内訳は、2月以前の未収入金回収28万円、3月の管理費25万円・修繕積立金5万円、4月分の前受金300万円。",
    "choiceExplanations": {
      "ア": "借方に普通預金358万円。貸方の未収入金28万円は過去分の回収、収入30万円は3月分、前受金300万円は4月分を表す。",
      "イ": "入金をすべて3月の収入にする仕訳では、2月以前の未収入金の回収と4月分の前受けを処理できない。",
      "ウ": "4月分の前受金は合っているが、2月以前分も3月の収入としている。既に計上した未収入金が入金で減る。",
      "エ": "2月以前分の未収入金の回収は合っているが、4月分300万円を3月収入に含めている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問15（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01",
    "imageUrls": [
      "/questions/kanri/2021-annual/q15-p12.jpg",
      "/questions/kanri/2021-annual/q15-p13.jpg"
    ],
    "imageAltTexts": [
      "令和3年度 問15の原本 PDF p.12",
      "令和3年度 問15の原本 PDF p.13"
    ]
  },
  {
    "id": "kanri-2021-annual-gakka-q16",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 16,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "管理組合会計",
    "topicTags": [
      "発生主義",
      "修繕費",
      "未払金"
    ],
    "difficulty": 3,
    "question": "管理組合における以下の①～③の活動に関し、令和3年3月分の仕訳として最も適切なものは、次の1～4のうちどれか。ただし、会計処理は毎月次において発生主義の原則によって処理されているものとする。（管理組合の会計年度：毎年4月1日から翌年3月31日まで）\n\n活動\n①令和2年12月1日に壁面の補修のためにＡ社に発注し、令和3年2月末日に完了した塗装工事の代金2，350，000円を令和3年3月15日に普通預金から支払った。\n②令和3年1月10日にＢ社に1，200，000円で発注した外階段の補修工事について、令和3年3月15日にＢ社から完了報告があり、工事代金は令和3年4月15日に普通預金から支払われる。\n③令和3年3月1日にＣ社に350，000円で発注した備品である除雪機が、令和3年4月1日に納入され、納入後10日以内にその代金が支払われる契約となっている。",
    "choices": {
      "ア": "借方：未払金2,350,000円、修繕費1,200,000円 ／ 貸方：普通預金2,350,000円、未払金1,200,000円",
      "イ": "借方：修繕費3,550,000円 ／ 貸方：普通預金2,350,000円、未払金1,200,000円",
      "ウ": "借方：未払金2,350,000円、修繕費1,200,000円 ／ 貸方：普通預金3,550,000円",
      "エ": "借方：修繕費3,550,000円、備品350,000円 ／ 貸方：普通預金3,550,000円、未払金350,000円"
    },
    "answer": "ア",
    "explanation": "2月に完了した塗装費の支払は未払金を取り崩す。3月に完了した外階段補修は修繕費と未払金を計上し、4月納入の除雪機は3月に仕訳しない。",
    "choiceExplanations": {
      "ア": "①借方は未払金235万円、貸方は普通預金235万円。②借方は修繕費120万円、貸方は未払金120万円。③は翌月の取引。",
      "イ": "2月の完了時に計上した235万円を3月の修繕費に再計上している。3月は未払金の決済を記録する。",
      "ウ": "3月に普通預金から出たのは235万円だけ。120万円の補修費は3月に発生したが支払は4月なので、貸方は未払金。",
      "エ": "2月分まで3月の修繕費に含め、未払いの120万円まで支出扱いにしている。除雪機も3月末には納入されていない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問16（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01",
    "imageUrls": [
      "/questions/kanri/2021-annual/q16-p14.jpg"
    ],
    "imageAltTexts": [
      "令和3年度 問16の原本 PDF p.14"
    ]
  },
  {
    "id": "kanri-2021-annual-gakka-q17",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 17,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "建築設備",
    "topicTags": [
      "屋上防水",
      "メンブレン",
      "塗膜防水"
    ],
    "difficulty": 3,
    "question": "マンションの屋上の防水に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "メンブレン防水とは、被膜を形成して防水層を作る工法の総称である。",
      "イ": "シート防水に用いられる、プラスチック系の材料等で作られたシートは、変形能力が大きく下地の動きに追従する。",
      "ウ": "建築改修工事監理指針によれば、外気温の著しい低下が予想されるときは、塗膜防水を施工しなければならない。",
      "エ": "ウレタン系塗膜防水工法は、突出物の多い屋上の改修工事の際に、施工が容易なため採用されることが多い。"
    },
    "answer": "ウ",
    "explanation": "外気温の著しい低下は、塗膜防水を施工しなければならない理由ではない。材料の硬化や施工後の品質を確保できる環境かを確認する。",
    "choiceExplanations": {
      "ア": "メンブレン防水は、下地上に連続した防水層をつくる工法の総称。シートや塗膜による工法を含む。",
      "イ": "合成高分子系シートには変形能力があり、下地の動きに追従する。",
      "ウ": "低温では防水材の硬化等に支障が出るため、施工に適する気象条件を確認する。気温低下を理由に施工を義務づける記述は逆である。",
      "エ": "ウレタン系の塗膜防水は液状の材料で防水層を形成するので、突出部や立上りが多い複雑な形状にも対応しやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問17（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001879369.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q18",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 18,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "建築構造",
    "topicTags": [
      "鉄筋コンクリート",
      "かぶり厚さ",
      "劣化"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリートに関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "建築基準法によれば、特定の要件を満たす部材を除いて、布基礎の立上り部分を除いた基礎においては、鉄筋に対するコンクリートのかぶり厚さは、捨コンクリートの部分を除き、6㎝以上としなければならない。",
      "イ": "コンクリートは、通常の使用範囲において温度上昇に伴う膨張の程度が鉄筋とほぼ等しい。",
      "ウ": "硬化したコンクリートが、空気中の二酸化炭素の作用によって次第にアルカリ性を失って中性に近づく現象を中性化という。",
      "エ": "アルカリ骨材反応とは、アルカリ反応性骨材と鉄筋が長期にわたる化学反応により、その鉄筋が発錆し膨張することで、コンクリートにひび割れを生じたり崩壊したりする現象をいう。"
    },
    "answer": "エ",
    "explanation": "アルカリ骨材反応は、コンクリート中のアルカリ成分と反応性の骨材による反応。鉄筋の発錆を反応の原因とする説明は誤り。",
    "choiceExplanations": {
      "ア": "建築基準法施行令79条の基礎のかぶり厚さは、設問の条件では捨てコンクリートを除き6 cm以上。",
      "イ": "通常の範囲では鉄筋とコンクリートの熱膨張の程度が近いため、温度変化に対して大きな差が生じにくい。",
      "ウ": "二酸化炭素の作用によってコンクリートのアルカリ性が弱まることを中性化という。",
      "エ": "アルカリ骨材反応の膨張は、骨材中の反応性鉱物とアルカリ性の成分との反応に由来する。鉄筋腐食による膨張と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問18（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338?occasion_date=20210401",
      "https://www.cgr.mlit.go.jp/chiki/doyroj/hozen/douro_roukyuu_jirei.html"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q19",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 19,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "建築構造",
    "topicTags": [
      "免震",
      "主要構造部",
      "基礎"
    ],
    "difficulty": 3,
    "question": "マンションの構造・部材に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "免震装置を設置することにより、建築物がゆっくりと水平移動し、建築物に作用する地震力を低減する構造形式を免震構造という。",
      "イ": "建築基準法に定める「主要構造部」には、建築物の構造上重要でない間仕切壁は、含まれない。",
      "ウ": "建築基準法によれば、1つの建築物で高さが部分的に異なる場合には、原則として、各部分の高さに応じて異なる構造方法による基礎を併用しなければならない。",
      "エ": "建築基準法によれば、特定の要件を満たす場合を除いて、各戸の界壁は小屋裏又は天井裏に達していなければならない。"
    },
    "answer": "ウ",
    "explanation": "一つの建築物では、原則として異なる構造方法の基礎を併用しない（建築基準法施行令38条2項）。",
    "choiceExplanations": {
      "ア": "免震装置によって上部構造への地震の力の伝わり方を抑えるのが免震構造である。",
      "イ": "建築基準法2条の主要構造部からは、構造上重要でない間仕切壁が除かれる。",
      "ウ": "建物の高さが部分的に違うという理由で、異なる構造方法の基礎を併用しなければならないわけではない。",
      "エ": "設問でいう例外を除くと、各戸の界壁は小屋裏又は天井裏まで達する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問19（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/325CO0000000338?occasion_date=20210401",
      "https://www.mlit.go.jp/jutakukentiku/build/s2002/gaiyou.htm"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q20",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 20,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "建築設備",
    "topicTags": [
      "簡易専用水道",
      "受水槽",
      "逆流防止"
    ],
    "difficulty": 3,
    "question": "上水の給水設備に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "水道法によれば、簡易専用水道とは、水道事業の用に供する水道及び専用水道以外の水道であって、水道事業の用に供する水道から供給を受ける水のみを水源とし、その供給を受けるために設けられる水槽の有効容量の合計が20㎥を超えるものをいう。",
      "イ": "建築基準法により、共同住宅の給水タンクに保守点検用のマンホールを設置する必要がある場合には、そのマンホールは、直径60㎝以上の円が内接することができるものとしなければならない。",
      "ウ": "給水管でのウォーターハンマーを防止するために、管内流速が過大とならないように流速は毎秒1．5～2．0ｍ以下が標準とされている。",
      "エ": "流しの水栓の開口部にあっては、あふれ面と水栓の開口部との垂直距離を保つ等、水の逆流防止のための有効な措置を講ずる。"
    },
    "answer": "ア",
    "explanation": "簡易専用水道で基準となる水槽の有効容量の合計は10 m³を超えるもの。20 m³を超えることが条件ではない。",
    "choiceExplanations": {
      "ア": "水道事業から供給される水だけを水源とする貯水槽の区分を問う問題。20 m³という容量は誤り。",
      "イ": "点検用のマンホールを設ける場合は、直径60 cm以上の円が内接する大きさが必要である。",
      "ウ": "急な流速変化による水撃を抑えるため、管内流速が過大にならないように給水管を選定する。設問の1.5〜2.0 m/sは設計上の目安。",
      "エ": "吐水口とあふれ面の間を離すと、負圧が生じても汚水等が水栓から給水系に吸い戻されることを防げる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問20（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/332CO0000000336?occasion_date=20210401",
      "https://www.mlit.go.jp/notice/noticedata/pdf/201703/00006620.pdf",
      "https://union.suido-kagawa.lg.jp/uploaded/attachment/11865.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q21",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 21,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "建築設備",
    "topicTags": [
      "排水通気",
      "特殊継手",
      "排水立て管"
    ],
    "difficulty": 3,
    "question": "建築基準法及び給排水衛生設備規準・同解説（公益社団法人空気調和・衛生工学会）によれば、排水通気設備に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "衛生器具の排水トラップは、二重トラップとならないように設けることとする。",
      "イ": "通気弁は、吸気機能だけを有する弁で、排水通気管内が負圧になる部分のみに設ける。",
      "ウ": "特殊継手排水システムは、超高層共同住宅に対応するために、伸頂通気管と通気立て管を併設し、許容排水流量を大きくした排水通気方式である。",
      "エ": "排水立て管の管径は、どの階においても最下部の管径と同一とする。"
    },
    "answer": "ウ",
    "explanation": "特殊継手排水方式は、特殊継手で排水と通気の経路を確保する方式。別系統の通気立て管の併設を特徴とする説明は誤り。",
    "choiceExplanations": {
      "ア": "一つの器具の排水にトラップを重ねると、間の空気が動きにくくなる。二重トラップとならないように設ける。",
      "イ": "吸気型の通気弁は負圧で空気を吸い込む部材であり、管内の正圧を排気する器具ではない。",
      "ウ": "通常の通気立て管を別に並べる方式と、特殊継手で単一の立て管内の通気を確保する方式を区別する。",
      "エ": "排水立て管は、途中の階で管径を小さくしたりせず、最下部と同じ管径にそろえる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問21（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338?occasion_date=20210401",
      "https://www.mlit.go.jp/notice/noticedata/pdf/201703/00006620.pdf",
      "https://www.jstage.jst.go.jp/article/shase/30/96/30_KJ00006792647/_article/-char/ja/"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q22",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 22,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "建築設備",
    "topicTags": [
      "機械換気",
      "熱交換",
      "必要換気量"
    ],
    "difficulty": 3,
    "question": "換気設備に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "建築基準法のホルムアルデヒドに関する技術的基準によれば、住宅等の居室における機械換気設備（居室内の空気を浄化して供給する方式を用いるものを除く。）の必要有効換気量は、居室の床面積に天井高さを乗じたものの0．5倍である。",
      "イ": "全熱交換型の換気は、「第2種換気方式」である。",
      "ウ": "建築基準法によれば、換気設備を設けるべき調理室等に、火を使用する設備又は器具の近くに排気フードを有する排気筒を設ける場合においては、排気フードは、不燃材料で造らなければならない。",
      "エ": "浴室や便所等の換気に用いる「第3種換気方式」では、必要換気量を確保するために、換気扇の運転時に給気を確保できるよう十分な大きさの給気口を設ける必要がある。"
    },
    "answer": "イ",
    "explanation": "全熱交換型の換気は、給気と排気の双方を機械で行う第1種換気方式に当たる。",
    "choiceExplanations": {
      "ア": "住宅等の居室の必要有効換気量は、設問の機械換気設備では床面積と天井高さで求めた容積に0.5回毎時を掛ける。",
      "イ": "第2種換気では機械を使うのは給気側。給気と排気を熱交換器に通す方式は第1種である。",
      "ウ": "調理室等で火を使用する設備の近くに排気フードを置く場合、フードを不燃材料で造る。",
      "エ": "第3種換気は機械で排気し、給気口から空気を取り入れる。給気口が不足すると必要な換気量を確保しにくくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問22（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338?occasion_date=20210401",
      "https://www.mlit.go.jp/jutakukentiku/build/content/001487964.pdf",
      "https://www.mlit.go.jp/common/001627028.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q23",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 23,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "建築基準法",
    "topicTags": [
      "建築",
      "主要用語",
      "大規模修繕"
    ],
    "difficulty": 3,
    "question": "建築基準法第2条（用語の定義）に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "特殊建築物には、病院、劇場、百貨店、工場などのほか、共同住宅も含まれる。",
      "イ": "建築設備とは、建築物に設ける電気、ガス、給水、排水、換気、暖房、冷房、消火、排煙若しくは汚物処理の設備又は煙突、昇降機若しくは避雷針をいう。",
      "ウ": "居室とは、居住、執務、作業、集会、娯楽その他これらに類する目的のために継続的に使用する室をいう。",
      "エ": "建築とは、建築物を新築し、増築し、改築し、移転し、大規模の修繕をし、又は大規模の模様替えをすることをいう。"
    },
    "answer": "エ",
    "explanation": "建築基準法2条の「建築」に該当するのは新築・増築・改築・移転。大規模の修繕と模様替えは別に定義される。",
    "choiceExplanations": {
      "ア": "共同住宅は同条に挙げられている特殊建築物に含まれる。",
      "イ": "建築物に設ける給排水や換気等の設備に加え、煙突、昇降機及び避雷針も建築設備の定義に含まれる。",
      "ウ": "居住、作業、執務などの目的で継続的に使用する室が居室に当たる。",
      "エ": "大規模の修繕や模様替えも建築基準法で規律されるが、2条の用語上はいずれも「建築」と区別される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問23（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q24",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 24,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "消防法",
    "topicTags": [
      "防火管理者",
      "統括防火管理",
      "外部委託"
    ],
    "difficulty": 3,
    "question": "防火管理者に関する次の記述のうち、消防法によれば、最も不適切なものはどれか。ただし、本問において共同住宅とは消防法施行令別表第一（五）項ロに掲げる防火対象物とする。",
    "choices": {
      "ア": "高さ40ｍの共同住宅で100人が居住している場合に、その管理について権原が分かれているものの管理について権原を有する者は、統括防火管理者を協議して定めなければならない。",
      "イ": "法第8条第1項の管理について権原を有する者は、政令で定める資格を有する者のうちから防火管理者を定め、政令で定めるところにより、消防計画に基づく消火、通報及び避難の訓練の実施を行わせなければならない。",
      "ウ": "法第8条第1項の管理について権原を有する者は、管理的又は監督的な地位にある者のいずれもが遠隔の地に勤務していることその他の事由により防火管理上必要な業務を適切に遂行することができない場合であっても、防火管理業務を外部へ委託することはできない。",
      "エ": "法第8条第1項の管理について権原を有する者は、政令で定める資格を有する者のうちから防火管理者を定め、政令で定めるところにより、避難又は防火上必要な構造及び設備の維持管理を行わせなければならない。"
    },
    "answer": "ウ",
    "explanation": "対象物の管理権原者側で防火管理の業務を適切に遂行できない場合、条件を満たせば外部の有資格者を防火管理者にできる。",
    "choiceExplanations": {
      "ア": "高さ31 mを超える建築物で管理権原が分かれている場合、各権原者は協議して統括防火管理者を定める。",
      "イ": "防火管理者を選任し、消防計画に基づく消火・通報・避難訓練を実施させるのは管理権原者の役割。",
      "ウ": "管理的・監督的地位の者による遂行が困難な事由があり、消防長等が認める場合等には外部委託が可能である。",
      "エ": "避難や防火に必要な構造・設備の維持管理も、防火管理者に行わせる業務に含まれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問24（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/323AC1000000186?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/336CO0000000037?occasion_date=20210401",
      "https://www.fdma.go.jp/laws/tutatsu/post1356/"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q25",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 25,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "長期修繕計画",
    "topicTags": [
      "単棟型",
      "団地型",
      "専有部分"
    ],
    "difficulty": 3,
    "question": "長期修繕計画の対象の範囲に関する次の記述のうち、長期修繕計画作成ガイドラインによれば、最も不適切なものはどれか。",
    "choices": {
      "ア": "単棟型のマンションの場合は、管理規約に定めた組合管理部分である敷地を全て対象とする。",
      "イ": "単棟型のマンションの場合は、専有部分を全て対象としない。",
      "ウ": "団地型のマンションの場合は、一般的に、団地全体の土地、附属施設及び団地共用部分を対象とする。",
      "エ": "団地型のマンションの場合は、一般的に、各棟の共用部分を対象とする。"
    },
    "answer": "イ",
    "explanation": "単棟型でも、共用部分の修繕等に伴って修繕が必要となる専有部分は計画の対象に含める。",
    "choiceExplanations": {
      "ア": "管理規約で管理組合の管理対象となる敷地は、単棟型の計画に含まれる。",
      "イ": "専有部分をすべて一律に除くと、共用部分の工事に伴い組合が費用を負担して修繕する専有部分まで除かれてしまう。",
      "ウ": "団地型では、団地全体で管理される敷地や附属施設、団地共用部分を対象にする。",
      "エ": "団地共用部分に加え、棟ごとの共用部分も修繕計画の対象になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問25（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/report/press/house06_hh_000006.html",
      "https://www.mlit.go.jp/jutakukentiku/house/content/001747006.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q26",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 26,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "長期修繕計画",
    "topicTags": [
      "修繕積立金",
      "推定修繕",
      "計画修繕"
    ],
    "difficulty": 3,
    "question": "長期修繕計画作成ガイドラインに用いられている用語の定義について、最も不適切なものはどれか。",
    "choices": {
      "ア": "推定修繕工事とは、長期修繕計画において、計画期間内に見込まれる修繕工事（補修工事（経常的に行う補修工事を除く。）を含む。以下本問において同じ。）及び改修工事をいう。",
      "イ": "計画修繕工事とは、長期修繕計画に基づいて計画的に実施する修繕工事及び改修工事をいう。",
      "ウ": "修繕工事費とは、計画修繕工事の実施に要する費用をいう。",
      "エ": "修繕積立金とは、推定修繕工事に要する費用に充当するための積立金をいう。"
    },
    "answer": "エ",
    "explanation": "修繕積立金の定義は、計画修繕工事に要する費用に充てるための積立金。設問の「推定修繕工事」と区別する。",
    "choiceExplanations": {
      "ア": "推定修繕工事は計画期間内に見込む修繕・改修工事で、経常的な補修工事はこの区分から外れる。",
      "イ": "長期修繕計画に従って計画的に実施する修繕・改修工事が、計画修繕工事である。",
      "ウ": "計画修繕工事の実施に要する費用を修繕工事費と呼ぶ。計画作成時の推定修繕工事費とは区別される。",
      "エ": "積立額の検討には推定額を用いるが、ガイドライン上の修繕積立金の用途は計画修繕工事の費用への充当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問26（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/report/press/house06_hh_000006.html",
      "https://www.mlit.go.jp/jutakukentiku/house/content/001747006.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q27",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 27,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "長期修繕計画",
    "topicTags": [
      "見直し",
      "大規模修繕",
      "基本計画"
    ],
    "difficulty": 3,
    "question": "長期修繕計画の見直しに関する以下のア～ウの記述のうち、長期修繕計画作成ガイドラインによれば、適切なものを全て含む組合せは、次の1～4のうちどれか。\nア　大規模修繕工事と大規模修繕工事の中間の時期に単独で、長期修繕計画の見直しを行う。\nイ　大規模修繕工事の直前に基本計画の検討に併せて、長期修繕計画の見直しを行う。\nウ　大規模修繕工事の実施の直後に修繕工事の結果を踏まえて、長期修繕計画の見直しを行う。",
    "choices": {
      "ア": "ア",
      "イ": "ア・ウ",
      "ウ": "イ・ウ",
      "エ": "ア・イ・ウ"
    },
    "answer": "エ",
    "explanation": "適切なのはア・イ・ウ。見直しには工事間の単独の見直し、工事直前の基本計画との同時見直し、工事直後の結果を踏まえた見直しがある。",
    "choiceExplanations": {
      "ア": "工事と工事の中間でも見直せる。イとウが該当するため、アだけでは不足する。",
      "イ": "ア・ウに加え、直前に基本計画と併せて見直すイも適切。",
      "ウ": "イ・ウの工事直前と直後だけでなく、工事間に単独で行うアも適切。",
      "エ": "ア・イ・ウのどの時期でも見直せる。各時点で得られる調査・診断や工事の結果を反映する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問27（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/report/press/house06_hh_000006.html",
      "https://www.mlit.go.jp/jutakukentiku/house/content/001747006.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q28",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 28,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理規約",
    "topicTags": [
      "監事",
      "臨時総会",
      "理事会"
    ],
    "difficulty": 3,
    "question": "監事の職務に関する次の記述のうち、標準管理規約（単棟型）によれば、適切なものはいくつあるか。\nア　監事は、管理組合の業務執行及び財産の状況について不正があると認めるときは、臨時総会を招集することができる。\nイ　監事は、当該会計年度の収支決算案の会計監査をし、通常総会に報告し、その承認を得なければならない。\nウ　監事は、理事の業務執行が著しく不当であると認めるときは、直ちに理事会を招集することができる。\nエ　監事は、理事が理事会の決議に違反する事実があると認めるときは、遅滞なく、その旨を理事会に報告しなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "適切なのはア・エの二つ。監事の監査、報告と理事会の招集の手続を標準管理規約（単棟型）41条で区別する。",
    "choiceExplanations": {
      "ア": "一つではない。監事は不正があると認めたときに臨時総会を招集でき、違反があれば理事会に報告する。",
      "イ": "二つ。アは41条3項、エは同条5項に当たる。監査結果を総会に報告することと、監事が承認を得ることは異なる。",
      "ウ": "三つではない。イは監事が総会の承認を得なければならないとする点が誤り。収支決算案を承認する場は総会である。",
      "エ": "四つではない。ウのように直ちに招集はできず、原則としてまず理事長に理事会の招集を請求する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問28（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/kankocho/content/001216238.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q29",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 29,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理規約",
    "topicTags": [
      "団地",
      "雑排水管",
      "積立金"
    ],
    "difficulty": 3,
    "question": "団地の雑排水管等の管理及び更新工事に関する次の記述のうち、標準管理規約（団地型）によれば、適切なものはいくつあるか。\nア　全棟の雑排水管の高圧洗浄に要する費用は、その年度の事業計画・予算の承認を得ていれば、管理費から支出することができる。\nイ　各棟の雑排水管の立て管及び継手部分の更新工事に要する費用は、各棟修繕積立金から支出することができない。\nウ　新築時から全棟の全住戸に設置されている給湯器ボイラーの一斉取替えに要する費用は、管理組合の普通決議により、団地修繕積立金から支出することができる。\nエ　集会所の雑排水管の更新工事に要する費用は、管理組合の普通決議により、団地修繕積立金から支出することができる。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "適切なのはア・エの二つ。経常的な洗浄と計画的な更新を分け、更新の対象が各棟か団地の共用施設かを確認する。",
    "choiceExplanations": {
      "ア": "一つではない。事業計画と予算の承認を受けた雑排水管の洗浄は管理費、集会所の管の更新は団地修繕積立金の対象になる。",
      "イ": "二つ。ア・エ。団地の共用施設である集会所と、各棟の共用部分にある排水管では使う積立金が異なる。",
      "ウ": "三つではない。イの立て管と継手部分は棟の共用部分に含まれるため、更新に各棟修繕積立金を使える。",
      "エ": "四つではない。ウの住戸の給湯器は住戸の専有設備であり、全戸に設置されたことだけでは団地修繕積立金を充てられない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問29（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/kankocho/content/001228580.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q30",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 30,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理規約",
    "topicTags": [
      "共用部分",
      "普通決議",
      "店舗部会"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、標準管理規約（単棟型）又は標準管理規約（複合用途型）によれば、適切なものはいくつあるか。\nア　窓枠及び窓ガラスの一斉交換工事は、総会の普通決議により行うことができる。\nイ　店舗用階段を店舗用エレベーターに変更する工事を行うためには、店舗部会の特別多数決議のみで足りる。\nウ　新築時から全戸に設置されている台所・浴室の換気扇の一斉取替えは、総会の普通決議により行うことができる。\nエ　ＩＴ化工事に関し、既存のパイプスペースを利用して光ファイバー・ケーブルを敷設する工事は、総会の普通決議により行うことができる。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "適切なのはア・エの二つ。窓枠・ガラスの一斉交換と既存スペースを使う光回線の工事は、設問の条件では普通決議で行える。",
    "choiceExplanations": {
      "ア": "一つではない。既存の窓を改良するアと、共用部分の形状等を大きく変えず光回線を敷設するエが適切。",
      "イ": "二つ。ア・エが普通決議でできる例として標準管理規約のコメントに沿う。",
      "ウ": "三つではない。店舗の階段からエレベーターへの変更は建物の共用部分に影響するので、店舗部会の特別多数決議だけでは足りない。",
      "エ": "四つではない。住戸内の専有設備である換気扇まで、全戸に設置されたことを理由に普通決議だけで交換することはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問30（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/kankocho/content/001216238.pdf",
      "https://www.mlit.go.jp/kankocho/content/001216243.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q31",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 31,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "標準管理規約",
    "topicTags": [
      "理事会",
      "電磁的方法",
      "専有部分の修繕"
    ],
    "difficulty": 3,
    "question": "甲マンションにおいて、理事会に出席できない理事の取扱い等に関する次の記述のうち、標準管理規約（単棟型）によれば、最も適切なものはどれか。なお、甲マンションの管理規約は、標準管理規約（単棟型）と同一の定めがあるものとし、そのコメントに基づく別段の定めはないものとする。",
    "choices": {
      "ア": "外国に出張中で理事会に出席できない理事がいたが、議長（理事長）一任の委任状の提出を求めた。",
      "イ": "議題が「長期修繕計画の変更案について」と既に決まっていたため、理事会に出席できない理事には議決権行使書の提出を求めた。",
      "ウ": "専有部分の改良工事の申請について、理事会に出席できない理事がいたため、電磁的方法による決議をしようとしたとき、監事は電磁的方法について反対したが、理事の過半数の承諾があったので、当該申請について電磁的方法により理事会で決議した。",
      "エ": "病気で入院中の理事がいたので、その理事に代わって、その理事の配偶者に、理事会への出席と決議への参加を求めた。"
    },
    "answer": "ウ",
    "explanation": "標準管理規約（単棟型）53条2項・54条1項5号により、専有部分の修繕等の承認は理事の過半数の承諾があれば電磁的方法で決議できる。",
    "choiceExplanations": {
      "ア": "理事会は理事本人の出席と議決が原則で、理事長に一任する委任状による議決は規約に根拠がない。",
      "イ": "長期修繕計画変更案は53条2項が書面による決議を認める専有部分の修繕等の承認に当たらない。",
      "ウ": "専有部分の改良工事の申請は例外の対象となる。承諾を数えるのは理事で、監事はその数に含めない。",
      "エ": "配偶者による代理出席の別段の定めがないので、配偶者に交代して議決へ参加してもらうことはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問31（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/kankocho/content/001216238.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q32",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 32,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "区分所有法",
    "topicTags": [
      "敷地利用権",
      "共用部分",
      "持分"
    ],
    "difficulty": 3,
    "question": "共用部分及びその持分等に関する次の記述のうち、区分所有法の規定によれば、最も不適切なものはどれか。",
    "choices": {
      "ア": "区分所有者が数個の専有部分を所有する場合の各敷地利用権の割合は、共用部分の持分の割合と同一であり、規約で別段の定めをすることができない。",
      "イ": "共用部分の管理に関する事項であっても、それが専有部分の使用に特別の影響を及ぼすべきときは、その専有部分の所有者の承諾を得なければならない。",
      "ウ": "共用部分の持分の割合と管理費等の負担割合は、一致しないこともある。",
      "エ": "共用部分の共有者は、この法律に別段の定めがある場合を除いて、その有する専有部分と分離して共用部分の持分を処分することができない。"
    },
    "answer": "ア",
    "explanation": "数個の専有部分を所有する場合の敷地利用権の割合は、規約で別段の定めができる（区分所有法22条2項）。",
    "choiceExplanations": {
      "ア": "原則の割合に加えて、22条2項ただし書は規約による別段の定めを認めている。",
      "イ": "共用部分の管理が専有部分の使用に特別の影響を及ぼすときは、当該専有部分の所有者の承諾が必要（18条3項・17条2項）。",
      "ウ": "19条の共用部分の負担は、規約で別段の定めができる。共用部分の持分割合と管理費の負担割合が異なることもある。",
      "エ": "共用部分の持分は、特別の規定がある場合を除き、専有部分と分離して処分できない（15条2項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問32（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q33",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 33,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "区分所有法",
    "topicTags": [
      "共用部分の変更",
      "規約の変更",
      "書面決議"
    ],
    "difficulty": 3,
    "question": "共用部分の変更（その形状又は効用の著しい変更を伴わないものを除く。）又は規約の変更を集会で決議する場合に関する次の記述のうち、区分所有法の規定によれば、適切なものはいくつあるか。\nア　集会決議の要件に関し、共用部分の変更については、規約で別段の定めをして区分所有者の定数のみを過半数まで減ずることはできるが、規約については、同様の変更はできない。\nイ　共用部分の変更は、区分所有者全員の承諾があれば、集会によらず書面による決議ですることができるが、規約の変更は、集会によらず書面による決議ですることはできない。\nウ　集会の招集通知を発するに際して、共用部分の変更にかかる議案については、議案の要領を各区分所有者に通知しなければならないが、規約の変更にかかる議案については、その必要はない。\nエ　規約の変更は、その規約事項について区分所有者間の利害の衡平が図られなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "適切なのはア・エの二つ。2021年4月1日時点の区分所有法では、特別多数決の緩和の可否と、決議の手続を別に確認する。",
    "choiceExplanations": {
      "ア": "一つではない。共用部分変更の区分所有者数要件を規約で緩和できることと、規約変更に衡平が求められることが適切。",
      "イ": "二つ。アは17・31条、エは30条3項に対応する。",
      "ウ": "三つではない。書面決議は全員が書面による決議に承諾すれば規約の変更にも利用できるので、イは不適切（45条1項）。",
      "エ": "四つではない。イに加え、共用部分の変更でも規約の変更でも集会の招集通知に議案の要領を示すので、ウも不適切（35条5項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問33（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q34",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 34,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "区分所有法",
    "topicTags": [
      "建替え",
      "催告",
      "売渡請求"
    ],
    "difficulty": 3,
    "question": "区分所有法の規定によれば、建替え決議が可決した後、建替えに参加するか否かの催告期間が終了するまでの間に、次の行動をとった区分所有者に対し、買受指定者として定められている者が、当該催告期間経過後に、売渡請求できるのはどれか。",
    "choices": {
      "ア": "建替え決議で建替えに賛成したが、事情により建替えに参加できない旨を申し出た。",
      "イ": "建替え決議で建替えに反対したが、建替えに参加する旨を回答し、その後さらに、その回答を撤回して、参加しない旨を申し出た。",
      "ウ": "建替え決議で建替えに反対し、建替えに参加しない旨を回答したが、その後さらに、その回答を撤回して、参加する旨を申し出た。",
      "エ": "建替え決議で議決権を行使しなかったが、建替えに参加するか否かの回答もしなかった。"
    },
    "answer": "エ",
    "explanation": "議決権を行使せず、参加する旨を回答しなかった区分所有者は、不参加とみなされる。催告期間経過後の売渡請求の対象になる（区分所有法63条）。",
    "choiceExplanations": {
      "ア": "賛成した区分所有者は事後に不参加と申し出ても、賛成しなかった者に対する催告・売渡請求の手続の対象ではない。",
      "イ": "反対した者が参加する旨を確定的に回答した場合、その回答の撤回を理由に売渡請求の対象に変わるわけではない。",
      "ウ": "不参加と回答した後も、催告期間の終了までに参加する旨を回答した者は参加する区分所有者に含まれる。",
      "エ": "議決権を行使しなかった者は賛成者に含まれず、期間内に参加の回答をしなければ、同条3項により不参加とみなされる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問34（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q35",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 35,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "区分所有法",
    "topicTags": [
      "管理組合法人",
      "理事",
      "監事"
    ],
    "difficulty": 3,
    "question": "管理組合法人に関する次の記述のうち、区分所有法の規定によれば、最も不適切なものはどれか。",
    "choices": {
      "ア": "代表理事を管理者とする旨を規約で定めても無効である。",
      "イ": "管理組合法人及び理事について、その代理権に加えた制限を規約で定めても、善意の第三者に対抗することができない。",
      "ウ": "代表権のない理事を置くことを規約で定めても無効である。",
      "エ": "監事の任期を3年間とすることを規約で定めることができる。"
    },
    "answer": "ウ",
    "explanation": "理事が複数いる場合、規約又は集会決議によって代表する理事を定められるため、代表権のない理事を置ける（区分所有法49条5項）。",
    "choiceExplanations": {
      "ア": "法人には管理者についての規定が適用されない。法人を代表する理事の地位と、法人化前の区分所有法上の管理者を区別する（47条）。",
      "イ": "理事等の代理権に加えた制限を規約に定めても、善意の第三者には対抗できない（47条・49条）。",
      "ウ": "各理事が代表するのが原則だが、代表者を選ぶ定めを置けるので、他の理事全員が代表権を持つ必要はない。",
      "エ": "監事の任期にも理事の任期の規定が準用され、規約で3年以内の異なる期間を定められる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問35（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q36",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 36,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理規約",
    "topicTags": [
      "総会",
      "議決権",
      "組合員数"
    ],
    "difficulty": 3,
    "question": "総住戸数96（この中には、1人で2住戸を所有する区分所有者が6人おり、それ以外に2人で1住戸を共有する住戸が3つ含まれる。）の甲マンションにおける総会に関する次のア～エの記述のうち、標準管理規約（単棟型）によれば、不適切なものはいくつあるか。ただし、議決権については1住戸1議決権の定めがあるものとする。\nア　総会開催のための招集通知書は、最低93部が必要である。\nイ　総会の会議は、出席する組合員の議決権数の合計が49以上でなければ成立しない。\nウ　理事長に対し会議の目的を示して総会の招集を請求するためには、組合員数18以上及び議決権数20以上の同意が必要である。\nエ　総会で規約変更の決議をするためには、組合員数68以上及び議決権数72以上の賛成が必要である。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "不適切なのはア・イの二つ。組合員数は96−6＝90、議決権は96。共有住戸の通知先は共有者の代表者1人となる。",
    "choiceExplanations": {
      "ア": "アとイの二つとも不適切。通知先の数は住戸の数と一致せず、総会の定足数は議決権の半数以上で足りる。",
      "イ": "二つ。通知は90部で足り、議決権48でも会議を開ける。",
      "ウ": "三つではない。ウの要件は各5分の1以上なので、組合員18と議決権20でよい。",
      "エ": "四つではない。エは各4分の3以上。90×3/4は切り上げて68、96×3/4は72となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問36（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/kankocho/content/001216238.pdf",
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q37",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 37,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "区分所有法",
    "topicTags": [
      "規約共用部分",
      "法定共用部分",
      "団地"
    ],
    "difficulty": 3,
    "question": "次に掲げるもののうち、区分所有法第4条第2項の規定により規約共用部分とすることができるものは、どれか。",
    "choices": {
      "ア": "団地内にある集会場に使われている建物",
      "イ": "建物横に設置した屋根のない駐輪場",
      "ウ": "区分所有者全員が利用可能な専有部分",
      "エ": "エントランスホール"
    },
    "answer": "ウ",
    "explanation": "区分所有法4条2項の規約共用部分にできるのは、同法1条の建物部分や附属の建物。設問の専有部分は規約により共用部分にできる。",
    "choiceExplanations": {
      "ア": "団地内の建物を団地共用部分とする根拠は、団地についての区分所有法67条。問われている4条2項と区別する。",
      "イ": "屋根のない屋外の駐輪場は、規約で共用にするための建物の部分や附属の建物に該当しない。",
      "ウ": "全員が利用できる専有部分は同法1条の建物部分に当たり、規約によって共用部分にできる。",
      "エ": "構造上当然に共用するエントランスホールは法定共用部分であり、規約によって初めて共用となる対象ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問37（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q38",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 38,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "標準管理規約",
    "topicTags": [
      "総会",
      "専門委員会",
      "理事長"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、区分所有法の規定、標準管理規約（単棟型）及び判例によれば、理事会の決議のみで行うことができるものはいくつあるか。\nア　管理組合の業務を委託するマンション管理業者を変更すること。\nイ　組合員が利用していないマンションの屋上部分に、携帯電話基地局の設置を認めて、電信電話会社から賃料収益を得る契約を締結すること。\nウ　敷地及び共用の施設での禁煙細則案と、それに伴う規約の改正案を検討するために、別途の予算を要さずに組合員で構成される専門委員会を設置すること。\nエ　管理者である理事長が1箇月入院することになったため、理事長と他の理事との職務を交代すること。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "理事会の決議でできるのはウ・エ。総会に諮る事項と、理事会が案を準備したり役員の職務を整理したりする事項を区別する。",
    "choiceExplanations": {
      "ア": "一つではない。予算措置の要らない専門委員会の設置と、理事の中での理事長職務の交代が該当する。",
      "イ": "二つ。ウの委員会は案を検討する段階にとどまり、エは理事会が選任する理事長の職務に関する事項である。",
      "ウ": "三つではない。管理業者の変更は管理委託契約の重要な事項として、理事会の決議だけで行える範囲を超える。",
      "エ": "四つではない。屋上という共用部分を第三者に基地局用として使用させる賃貸借契約も総会の議決事項になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問38（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/kankocho/content/001216238.pdf",
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q39",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 39,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "判例",
    "topicTags": [
      "排水枝管",
      "専用使用料",
      "住居侵入"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、判例によれば、適切なものはいくつあるか。\nア　特定の専有部分の排水を階下の専有部分の天井裏の枝管を通じて排水する場合、その枝管は、その構造及び設置場所に照らし、専有部分に属しない建物の附属物に当たり、区分所有者全員の共用部分と解される。\nイ　区分所有者の全員又は管理組合法人が、共同利益背反行為をした賃借人に係る賃貸借契約を解除し、賃借人に対し、当該専有部分の引渡しを求める集会決議をするには、あらかじめ、賃貸人たる区分所有者及び当該賃借人に対し、弁明の機会を与えなければならない。\nウ　管理組合は、区分所有者全員の共有に属する敷地につき、一部の区分所有者に係る駐車場専用使用料の増額について、その必要性及び合理性が認められ、かつ、その増額された額が社会通念上相当な額であると認められる場合には、規約又は集会決議をもって、その専用使用権者の承諾を得ることなく増額を決することができる。\nエ　政党ビラの配布行為は、憲法21条1項で保障されている表現の自由の行使に該当することから、マンションの各住戸のポストへの政党ビラの投函のために各階の廊下等に立ち入る行為が住居侵入罪（刑法130条）に該当することはない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "適切なのはア・ウ。枝管の専有・共用の判断は構造・設置場所に基づき、駐車場専用使用料の増額は必要性・合理性・金額の相当性を確認する。",
    "choiceExplanations": {
      "ア": "一つではない。階下の天井裏にあり専有部分に属さない枝管を全員の共用部分とする判断と、要件を満たした駐車場使用料の増額が適切。",
      "イ": "二つ。ア・ウが最高裁の判断に対応する。ウの承諾不要は、必要性等の条件を満たす場合である。",
      "ウ": "三つではない。区分所有法60条2項が準用する弁明の機会は、共同利益に反する行為をした占有者を対象とし、賃貸人である区分所有者にも必須とする記述は誤り。",
      "エ": "四つではない。政治的表現目的でも、管理者の意思に反し共用廊下に立ち入れば住居侵入罪が成立し得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問39（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20210401",
      "https://www.courts.go.jp/app/files/hanrei_jp/818/062818_hanrei.pdf",
      "https://www.courts.go.jp/assets/hanrei/hanrei-pdf-52595.pdf",
      "https://www.courts.go.jp/app/files/hanrei_jp/200/038200_hanrei.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q40",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 40,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "消費者契約法",
    "topicTags": [
      "消費者",
      "事業者",
      "契約目的"
    ],
    "difficulty": 3,
    "question": "マンションの売買又は賃貸借に関する次の記述のうち、消費者契約法が適用されるものはいくつあるか。\nア　マンションの分譲業者が、マンションの一住戸を合同会社に、その従業員の個人居住用として使用することの明示を受けて売却する契約\nイ　宅地建物取引業者が、いわゆる「買取再販事業」として、既存のマンションを購入し、個人に居住用として売却する契約\nウ　個人が、マンションの賃貸業者から、1階の店舗部分を店舗用として賃借する契約\nエ　マンションの賃貸業者から、マンションの一住戸を個人の居住用として賃借する契約の場合に、その賃借人が個人の宅地建物取引業者であるとき",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "適用されるのはイ・エ。消費者契約法2条は、個人が事業として又は事業のために契約するかで区別する。",
    "choiceExplanations": {
      "ア": "一つではない。イの個人の居住用購入と、エの宅建業者本人による居住用賃借の双方が該当する。",
      "イ": "二つ。イ・エが事業者と消費者との契約。職業が宅建業者でも本人の住まいを借りる契約では消費者となる。",
      "ウ": "三つではない。アの契約当事者は合同会社であり、入居する従業員の用途を理由に法人を消費者とは扱わない。",
      "エ": "四つではない。ウの個人にも店を営業するための賃借という事業目的がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問40（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/412AC0000000061?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q41",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 41,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "賃貸借",
    "topicTags": [
      "鍵の交換",
      "相続",
      "造作買取請求"
    ],
    "difficulty": 3,
    "question": "区分所有者Ａが、自己の所有するマンションの専有部分をＢに賃貸する契約において、ＡＢ間で合意した次の特約のうち、民法及び借地借家法の規定によれば、無効であるものを全て含む組合せはどれか。\nア　Ｂが、賃料を滞納した場合には、Ａは、直ちに専有部分に入る玄関扉の鍵を取り替える特約\nイ　Ｂは、賃貸借の契約期間中、中途解約できる特約\nウ　Ｂが死亡したときは、同居する相続人がいる場合であっても、賃貸借契約は終了する特約\nエ　ＢがＡの同意を得て建物に付加した造作であっても、賃貸借契約の終了に際して、造作買取請求はできない特約",
    "choices": {
      "ア": "エ",
      "イ": "ア・イ",
      "ウ": "ア・ウ",
      "エ": "イ・ウ・エ"
    },
    "answer": "ウ",
    "explanation": "無効なのはア・ウ。無断で鍵を交換する自力救済と、同居する相続人の賃借権を死亡だけで失わせる定めが問題になる。",
    "choiceExplanations": {
      "ア": "エは無効ではない。借地借家法33条の造作買取請求権を認めない特約は、同法37条の強行規定による禁止の対象ではない。",
      "イ": "イの賃借人の中途解約を認める合意は有効。イを含めた組合せは誤り。",
      "ウ": "滞納を理由に法的手続を経ず鍵を交換する特約と、同居相続人がいても死亡だけで契約を終了させる特約が無効となる。",
      "エ": "ウは無効だが、賃借人に中途解約を認めるイと造作買取請求権を排除するエは有効。アも含めなければならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問41（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/403AC0000000090?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q42",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 42,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "関連法令",
    "topicTags": [
      "景観",
      "個人情報",
      "浄化槽"
    ],
    "difficulty": 3,
    "question": "各種の法令に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "「景観法」によれば、景観計画区域内において、マンション等の建築物の外観を変更することとなる修繕若しくは模様替又は色彩の変更を行おうとする者は、あらかじめ、国土交通省令で定めるところにより、行為の種類、場所、設計又は施行方法、着手予定日その他国土交通省令で定める事項を景観行政団体の長に届け出なければならない。",
      "イ": "「動物の愛護及び管理に関する法律」によれば、動物の所有者又は占有者は、その所有し、又は占有する動物の逸走を防止するために必要な措置を講じなければならず、これに違反した場合は、同法により一定の罰則が科せられる。",
      "ウ": "「個人情報の保護に関する法律」によれば、取り扱う個人情報によって識別される特定の個人の数の合計が、過去6月以内のいずれの日においても5，000を超えない管理組合は、同法の個人情報取扱事業者に該当しない。",
      "エ": "「浄化槽法」によれば、浄化槽管理者は、使用されている浄化槽については、3年に1回、保守点検及び清掃をしなければならない。"
    },
    "answer": "ア",
    "explanation": "景観計画区域内で建築物の外観を変更する修繕等を行う場合、景観法16条の定めに従って景観行政団体の長へ事前に届け出る。",
    "choiceExplanations": {
      "ア": "規制の対象となる外観変更に当たる場合、行為の種類・場所・設計又は施行方法・着手予定日等を届け出る。",
      "イ": "逸走防止に関する措置について、選択肢のようにその不履行に罰則が科される規定ではない。",
      "ウ": "取り扱う個人情報に係る人数が5,000人以下であることを理由に適用を除外する旧制度は、2017年施行の改正で廃止された。",
      "エ": "使用中の浄化槽の保守点検・清掃は、3年に1回とする規定ではない。浄化槽の種類による定めを確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問42（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/416AC0000000110?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/348AC1000000105?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/415AC0000000057?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/358AC1000000043?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q43",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 43,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "マンション統計",
    "topicTags": [
      "分譲マンション",
      "ストック数",
      "推計の対象"
    ],
    "difficulty": 3,
    "question": "国土交通省が公表している分譲マンションの新規供給戸数及びストック戸数の推計に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "築40年超の分譲マンションの戸数は、令和元年末において、分譲マンションストック総数の約3割を占めている。",
      "イ": "公表の対象となっている分譲マンションとは、中高層（3階建て以上）・分譲・共同建で、鉄筋コンクリート、鉄骨鉄筋コンクリート又は鉄骨造の住宅をいう。",
      "ウ": "令和元年末における分譲マンションストック総数に対して、平成27年の国勢調査による一世帯当たり平均人員をかけると、国民の約2割が分譲マンションに居住していることになる。",
      "エ": "令和元年末現在の分譲マンションストック総数は、約500万戸である。"
    },
    "answer": "イ",
    "explanation": "国土交通省の推計対象は、3階建て以上の分譲・共同建てで、構造は鉄筋コンクリート造、鉄骨鉄筋コンクリート造、鉄骨造のいずれか。",
    "choiceExplanations": {
      "ア": "2019年末の資料では、築40年超は当時の分譲マンションストックの約3割には達していない。",
      "イ": "規模、分譲の別、建て方、構造を組み合わせた条件が、国土交通省の推計の注記と一致する。",
      "ウ": "2019年末の住戸数に1世帯当たりの人員を掛けた居住者数の推計は、総人口の約1割台。約2割とはならない。",
      "エ": "2019年末のストックは600万戸台で、約500万戸という記述は過小である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問43（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/page/content/001746948.pdf",
      "https://www.mlit.go.jp/saiyojoho/introduction/pdf/r03gyoumu_total.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q44",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 44,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "賃貸住宅管理業法",
    "topicTags": [
      "サブリース",
      "誇大広告",
      "事前説明"
    ],
    "difficulty": 3,
    "question": "賃貸住宅管理業法によれば、次の記述のうち、最も適切なものはどれか。ただし、勧誘者とは、特定転貸事業者が特定賃貸借契約の締結についての勧誘を行わせる者をいう。",
    "choices": {
      "ア": "特定転貸事業者又は勧誘者は、特定賃貸借契約に基づき賃借した賃貸住宅を第三者に転貸する事業に係る特定賃貸借契約の条件について広告をするときは、特定賃貸借契約に基づき特定転貸事業者が支払うべき家賃、賃貸住宅の維持保全の実施方法、特定賃貸借契約の解除に関する事項その他の国土交通省令で定める事項について、著しく事実に相違する表示をし、又は実際のものよりも著しく優良であり、若しくは有利であると人を誤認させるような表示をしてはならない。",
      "イ": "特定転貸事業者は、特定賃貸借契約を締結しようとするときは、特定賃貸借契約の相手方となろうとする者（特定転貸事業者である者その他の特定賃貸借契約に係る専門的知識及び経験を有すると認められる者として国土交通省令で定めるものを除く。）に対し、業務管理者をして、当該特定賃貸借契約を締結するまでに、特定賃貸借契約の内容及びその履行に関する事項であって国土交通省令で定めるものについて、書面を交付して説明しなければならない。",
      "ウ": "特定転貸事業者は、国土交通省令で定めるところにより、当該特定転貸事業者の業務及び財産の状況を記載した書類を、特定賃貸借契約に関する業務を行う営業所又は事務所に備え置き、特定賃貸借契約の相手方又は相手方となろうとする者の求めに応じ、その写しを交付しなければならない。",
      "エ": "特定転貸事業者は、第29条の不当な勧誘等の禁止の規定に違反して、故意に事実を告げない場合、懲役若しくは罰金に処せられるか、又はこれを併科されるが、勧誘者は、特定転貸事業者と同様に違反したとしても罰則の対象にはならない。"
    },
    "answer": "ア",
    "explanation": "特定転貸事業者と勧誘者には、家賃や維持保全方法等についての誇大広告の禁止が適用される（賃貸住宅管理業法28条）。",
    "choiceExplanations": {
      "ア": "契約条件について著しく事実と相違する表示や、著しく有利だと誤認させる表示は禁止される。勧誘者も対象。",
      "イ": "締結前に書面を交付して説明する義務はあるが、業務管理者に説明させなければならないとの指定はない（30条）。",
      "ウ": "営業所等に備え置く書類は、求めに応じて閲覧させる。写しの交付が法定の義務という記述は誤り（32条）。",
      "エ": "勧誘者も29条の不当な勧誘の禁止の対象となり、故意に事実を告げない場合に罰則の対象外とはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問44（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/502AC0000000060?occasion_date=20210401",
      "https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/const/content/001373100.pdf"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q45",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 45,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "1",
    "category": "宅地建物取引業法",
    "topicTags": [
      "重要事項説明",
      "水害ハザードマップ"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａが自ら売主としてマンションの一住戸の売買を行う場合、宅地建物取引業法第35条の規定に基づく重要事項の説明に関する次の記述のうち、最も適切なものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。",
    "choices": {
      "ア": "Ａは、「水防法施行規則」第11条第1号の規定により当該マンションが所在する市町村の長が提供する図面に当該マンションの位置が表示されているときは、当該図面における当該マンションの所在地を買主に説明しなければならない。",
      "イ": "Ａは、当該マンションについて、石綿の使用の有無を買主に説明するために、自らその調査を行わなければならない。",
      "ウ": "Ａは、当該マンションが既存の建物である場合には、当該マンションについて、建物状況調査結果の概要を記載した書面で、買主に説明するために、自らその調査を実施しなければならない。",
      "エ": "Ａは、台所、浴室、便所その他の当該住戸の設備の整備の状況について、記載した書面で、買主に説明しなければならない。"
    },
    "answer": "ア",
    "explanation": "水防法に基づく水害ハザードマップで取引物件の所在地を買主に示すことが重要事項説明に含まれる。",
    "choiceExplanations": {
      "ア": "水防法施行規則に基づき市町村が提供する図面のうち、設問のマンションの位置を含むものを使って所在地を説明する。",
      "イ": "石綿使用調査は、その結果の記録がある場合に内容を説明する事項。宅建業者自身に調査の実施を求める規定ではない。",
      "ウ": "既存建物の建物状況調査に関する説明では、調査実施の有無や該当する結果の概要を扱う。宅建業者が自ら実施する義務とは異なる。",
      "エ": "台所等の設備の整備状況は建物の貸借で説明する事項であり、この設問のように建物を売買する場合の義務としては挙げられない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問45（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20210401",
      "https://www.mlit.go.jp/totikensangyo/const/sosei_const_fr3_000074.html"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q46",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 46,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "2",
    "category": "マンション管理適正化法",
    "topicTags": [
      "契約成立時の書面",
      "電磁的方法"
    ],
    "difficulty": 3,
    "question": "マンション管理業者が行うマンション管理適正化法に基づく契約の成立時の書面の交付に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "法第73条第1項の規定によれば、マンション管理業者は、管理組合から管理事務の委託を受けることを内容とする契約を締結したときは、当該管理組合の管理者等（当該マンション管理業者が当該管理組合の管理者等である場合又は当該管理組合に管理者等が置かれていない場合にあっては、当該管理組合を構成するマンションの区分所有者等全員）に対し、遅滞なく、契約の成立時の書面を交付しなければならない。",
      "イ": "マンション管理業者は、法第73条第1項の規定に基づく書面の交付に代えて、当該書面に記載すべき事項を、電子情報処理組織を使用する方法その他の情報通信の技術を利用する方法により提供する場合においては、管理組合の管理者等又は管理組合を構成するマンションの区分所有者等の承諾を得る必要はない。",
      "ウ": "法第73条第1項の規定によれば、マンション管理業者が、管理組合から管理事務の委託を受けることを内容とする契約を締結した場合において、管理事務の一部の再委託に関する定めがあるときは、契約の成立時に交付する書面にその内容を記載しなければならない。",
      "エ": "マンション管理業者が、法第73条第1項の規定に違反して、虚偽の記載のある書面を交付したときは、30万円以下の罰金に処せられる。"
    },
    "answer": "イ",
    "explanation": "書面に代えて電磁的方法で提供するには、受領側の承諾を得る必要がある（マンション管理適正化法73条3項）。",
    "choiceExplanations": {
      "ア": "管理組合の管理者等に遅滞なく交付する。管理者等が不在又は受託する管理業者自身が管理者等の場合は区分所有者等全員が対象。",
      "イ": "電磁的方法で提供できることは、受領側の承諾を省略できることを意味しない。",
      "ウ": "一部再委託の定めがある場合、その内容は成立時書面の法定記載事項である。",
      "エ": "同条に違反し虚偽の記載がある書面を交付した場合、30万円以下の罰金の対象になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問46（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/412AC1000000149?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/413M60000800110?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q47",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 47,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "マンション管理適正化法",
    "topicTags": [
      "重要事項説明会",
      "契約更新"
    ],
    "difficulty": 3,
    "question": "マンション管理業者がマンション管理適正化法第72条の規定に基づく重要事項を記載した書面の交付、説明を行う場合における次の記述のうち、マンション管理適正化法によれば、適切なものはいくつあるか。\nア　マンション管理業者は、新たに建設されたマンションが分譲された場合、当該マンションの人の居住の用に供する独立部分の引渡しの日のうち最も早い日から1年の間に契約期間が満了する管理組合との管理受託契約を締結しようとするときであっても、当該管理組合を構成するマンションの区分所有者等及び当該管理組合の管理者等に対し、重要事項を記載した書面を交付し、管理業務主任者をして、説明をさせなければならない。\nイ　マンション管理業者は、重要事項説明会の開催日の1週間前までに説明会の開催の日時及び場所について、管理組合を構成するマンションの区分所有者等及び管理組合の管理者等の見やすい場所に掲示しなければならない。\nウ　マンション管理業者は、重要事項説明会を開催するときは、できる限り説明会に参加する者の参集の便を考慮して開催の日時及び場所を定め、管理事務の委託を受けた管理組合ごとに開催するものとする。\nエ　法第72条第3項の規定によれば、マンション管理業者は、従前の管理受託契約と同一の条件で管理組合との管理受託契約を更新しようとする場合において、当該管理組合に管理者等が置かれているときは、当該管理者等に対し、管理業務主任者をして、重要事項について、これを記載した書面を交付して説明をさせなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ウ",
    "explanation": "適切なのはイ・ウ・エの三つ。新築分譲時の一定の短期契約は、適正化法72条の管理受託契約の定義から除かれる。",
    "choiceExplanations": {
      "ア": "一つではない。開催日時と場所の事前掲示、組合ごとの開催、同一条件更新時の説明の三つが適切。",
      "イ": "二つではない。イとウの開催手続だけでなく、エの管理者等への説明と書面交付も適切。",
      "ウ": "三つ。イは事前掲示、ウは日程・場所と開催単位、エは同一条件での更新を扱う。",
      "エ": "四つではない。アにある1年以内に期間が満了する新築分譲時の契約には、その説明義務がかからない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問47（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/412AC1000000149?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/413M60000800110?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q48",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 48,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "4",
    "category": "マンション管理適正化法",
    "topicTags": [
      "管理業務主任者証",
      "返納",
      "登録取消し"
    ],
    "difficulty": 3,
    "question": "管理業務主任者及び管理業務主任者証に関する次の記述のうち、マンション管理適正化法によれば、適切なものはいくつあるか。\nア　管理業務主任者証の有効期間は、5年である。\nイ　管理業務主任者が、管理業務主任者証がその効力を失ったにもかかわらず、速やかに、管理業務主任者証を国土交通大臣に返納しない場合は、10万円以下の過料に処せられる。\nウ　管理業務主任者証の有効期間は、申請により更新することができる。\nエ　管理業務主任者が、管理業務主任者として行う事務に関し、不正又は著しく不当な行為をし、その情状が特に重いときは、国土交通大臣は、当該管理業務主任者の登録を取り消さなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "エ",
    "explanation": "ア〜エの四つとも適切。主任者証の有効期間と、主任者の登録そのものに対する処分は区別する。",
    "choiceExplanations": {
      "ア": "一つではない。5年の有効期間だけでなく、失効した証の返納義務及び未返納への過料も規定されている。",
      "イ": "二つではない。有効期間は申請によって更新できるため、ウも適切。",
      "ウ": "三つではない。事務に関する不正等の情状が特に重いときは登録を取り消さなければならず、エも適切。",
      "エ": "四つ。アの5年、イの10万円以下の過料、ウの申請による更新、エの重い事案の取消しがすべて適切。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問48（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/412AC1000000149?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/413M60000800110?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q49",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 49,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "マンション管理適正化法",
    "topicTags": [
      "分別管理",
      "保証契約",
      "保管口座"
    ],
    "difficulty": 3,
    "question": "マンション管理業者が行うマンション管理適正化法第76条の規定に基づく管理組合の財産の分別管理に関する次の記述のうち、マンション管理適正化法によれば、適切なものを全て含む組合せはどれか。\nア　マンション管理業者は、管理組合から委託を受けて管理する修繕積立金等については、自己の固有財産及び他の管理組合の財産と分別して管理しなければならない。\nイ　マンション管理業者は、同法施行規則第87条第2項第1号ハに定める方法により収納・保管口座で修繕積立金等金銭を管理する場合にあっては、マンションの区分所有者等から徴収される1月分の修繕積立金等金銭の合計額以上の額につき有効な保証契約を締結していなければならない。\nウ　マンション管理業者は、修繕積立金等金銭を管理するにあたり、管理組合に管理者等が置かれていない場合で管理者等が選任されるまでの比較的短い期間に限り保管する場合を除き、保管口座又は収納・保管口座に係る管理組合等の印鑑、預貯金の引出用のカードその他これらに類するものを管理してはならない。\nエ　保管口座とは、マンションの区分所有者等から徴収された修繕積立金を預入し、又は修繕積立金等金銭若しくは管理組合又はマンションの区分所有者等から受領した管理費用に充当する金銭の残額を収納口座から移し換え、これらを預貯金として管理するための口座であって、管理組合等を名義人とするものをいう。",
    "choices": {
      "ア": "ア・ウ",
      "イ": "イ・エ",
      "ウ": "ア・ウ・エ",
      "エ": "ア・イ・ウ・エ"
    },
    "answer": "ウ",
    "explanation": "適切なのはア・ウ・エ。収納・保管口座を用いる規則87条2項1号ハの方式は、設問にある1か月分以上の保証契約の要件から除かれる。",
    "choiceExplanations": {
      "ア": "アとウのほか、保管口座の名義と使途を説明したエも適切。",
      "イ": "イは不適切。ハの方式に、イ・ロの方式に関する保証契約要件を当てはめている。またア・ウも必要。",
      "ウ": "アの財産の分別、ウの印鑑や引出用カードの管理制限、エの保管口座の定義が規定に合う。",
      "エ": "イを含むので誤り。保証契約の要否は、どの種類の口座を使い、どの方式で管理するかによって判断する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問49（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/412AC1000000149?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/413M60000800110?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "kanri-2021-annual-gakka-q50",
    "exam": "kanri",
    "session": "gakka",
    "year": 2021,
    "season": "annual",
    "qNumber": 50,
    "type": "multiple-choice",
    "examDate": "2021-12-05",
    "officialAnswerNumber": "3",
    "category": "マンション管理適正化法",
    "topicTags": [
      "更新登録",
      "欠格事由",
      "廃業届"
    ],
    "difficulty": 3,
    "question": "マンション管理業の登録に関する次の記述のうち、マンション管理適正化法によれば、適切なものを全て含む組合せはどれか。\nア　マンション管理業の更新の登録を受けようとする者は、登録の有効期間満了の日の90日前から30日前までの間に登録申請書を提出しなければならない。\nイ　マンション管理業者が更新の登録の申請を行った場合において、従前の登録の有効期間の満了の日までにその申請に対する処分がなされないときは、当該マンション管理業者の従前の登録は、当該有効期間の満了後もその処分がなされるまでの間は、なお効力を有する。\nウ　マンション管理業を営もうとする者は、法人でその役員のうちに、「暴力団員による不当な行為の防止等に関する法律」第2条第6号に規定する暴力団員又は同号に規定する暴力団員でなくなった日から5年を経過しない者がいた場合は、マンション管理業の登録を受けることができない。\nエ　マンション管理業者が、マンション管理業を廃止した場合においては、その日から2週間以内に、その旨を国土交通大臣に届け出なければならない。",
    "choices": {
      "ア": "ア・イ",
      "イ": "ア・ウ",
      "ウ": "ア・イ・ウ",
      "エ": "イ・ウ・エ"
    },
    "answer": "ウ",
    "explanation": "適切なのはア・イ・ウ。廃業の届出期限は廃業日から30日以内であり、エの2週間ではない。",
    "choiceExplanations": {
      "ア": "ア・イは適切だが、役員が欠格事由に当たる法人についてのウも適切。",
      "イ": "ア・ウは適切だが、満了日までに更新の処分がない場合に従前の登録が暫定的に効力を保つというイも適切。",
      "ウ": "更新申請は満了の90日前から30日前まで。満了までに処分がなければ従前の登録は処分まで有効で、法人役員の欠格事由も審査される。",
      "エ": "エを含み、アが欠けている。廃業の届出期限と更新申請の提出期間を区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAnswerUrl": "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r03.pdf",
    "sourceAttribution": "出典：令和3年度 管理業務主任者試験問題 問50（一般社団法人マンション管理業協会）",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/412AC1000000149?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/413M60000800110?occasion_date=20210401"
    ],
    "license": "KANRIKYO-educational-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  }
];
