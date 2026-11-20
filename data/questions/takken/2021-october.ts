import type { Question } from "@/lib/questions/types";

export const TAKKEN_2021_OCTOBER_QUESTIONS: Question[] = [
  {
    "id": "takken-2021-october-gakka-q1",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 1,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "敷金と明渡し"
    ],
    "difficulty": 3,
    "question": "次の1から4までの記述のうち、民法の規定、判例及び下記判決文によれば、正しいものはどれか。\n\n（判決文）\n賃貸人は、特別の約定のないかぎり、賃借人から家屋明渡を受けた後に前記の敷金残額を返還すれば足りるものと解すべく、したがって、家屋明渡債務と敷金返還債務とは同時履行の関係にたつものではないと解するのが相当であり、このことは、賃貸借の終了原因が解除（解約）による場合であっても異なるところはないと解すべきである。",
    "choices": {
      "ア": "賃借人の家屋明渡債務が賃貸人の敷金返還債務に対し先履行の関係に立つと解すべき場合、賃借人は賃貸人に対し敷金返還請求権をもって家屋につき留置権を取得する余地はない。",
      "イ": "賃貸借の終了に伴う賃借人の家屋明渡債務と賃貸人の敷金返還債務とは、1個の双務契約によって生じた対価的債務の関係にあるものといえる。",
      "ウ": "賃貸借における敷金は、賃貸借の終了時点までに生じた債権を担保するものであって、賃貸人は、賃貸借終了後賃借人の家屋の明渡しまでに生じた債権を敷金から控除することはできない。",
      "エ": "賃貸借の終了に伴う賃借人の家屋明渡債務と賃貸人の敷金返還債務の間に同時履行の関係を肯定することは、家屋の明渡しまでに賃貸人が取得する一切の債権を担保することを目的とする敷金の性質にも適合する。"
    },
    "answer": "ア",
    "explanation": "敷金の残額は、明渡しまでに生じた債務を差し引いて確定する。明渡しが先に必要となる。明渡し前には敷金残額の返還を求められない。",
    "choiceExplanations": {
      "ア": "正しい。敷金返還請求権は明渡しより先に弁済期が来ないため、これを根拠に家屋を留置できない。",
      "イ": "誤り。両債務は交換関係にある対価的債務ではなく、明渡しと敷金返還は同時履行にならない。",
      "ウ": "誤り。敷金は契約終了後、実際に明け渡すまでの賃料相当損害金なども担保する。",
      "エ": "誤り。先に明渡しを受けてから精算する方が、明渡しまでの債権を担保する敷金の性質に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=3",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034",
      "https://www.retio.or.jp/wp-content/uploads/2024/12/407.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q2",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 2,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "連帯債務"
    ],
    "difficulty": 3,
    "question": "債務者A、B、Cの3名が、令和3年7月1日に、内部的な負担部分の割合は等しいものとして合意した上で、債権者Dに対して300万円の連帯債務を負った場合に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "DがAに対して裁判上の請求を行ったとしても、特段の合意がなければ、BとCがDに対して負う債務の消滅時効の完成には影響しない。",
      "イ": "BがDに対して300万円の債権を有している場合、Bが相殺を援用しない間に300万円の支払の請求を受けたCは、BのDに対する債権で相殺する旨の意思表示をすることができる。",
      "ウ": "DがCに対して債務を免除した場合でも、特段の合意がなければ、DはAに対してもBに対しても、弁済期が到来した300万円全額の支払を請求することができる。",
      "エ": "AとDとの間に更改があったときは、300万円の債権は、全ての連帯債務者の利益のために消滅する。"
    },
    "answer": "イ",
    "explanation": "他の連帯債務者の反対債権を自分で相殺に使うことはできない。自分の履行を拒める範囲と区別する。Cが履行を拒める額はBの負担部分である100万円までとなる。",
    "choiceExplanations": {
      "ア": "正しい。Aへの請求による時効の効果は、別段の意思表示がない限りB・Cに及ばない（441条）。",
      "イ": "誤り。Bが相殺を援用するまで、CはBの負担部分100万円を限度に履行を拒める（439条2項）。",
      "ウ": "正しい。Cへの免除は原則としてA・Bに及ばず、DはA・Bのどちらにも全額を請求できる（436条・441条）。",
      "エ": "正しい。DとAの間の更改により、従来の債権は全連帯債務者のために消滅する（438条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=4",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q3",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 3,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "契約当事者の死亡"
    ],
    "difficulty": 3,
    "question": "個人として事業を営むAが死亡した場合に関する次の記述のうち、民法の規定によれば、誤っているものはいくつあるか。なお、いずれの契約も令和3年7月1日付けで締結されたものとする。\n\nア　AがBとの間でB所有建物の清掃に関する準委任契約を締結していた場合、Aの相続人は、Bとの間で特段の合意をしなくても、当該準委任契約に基づく清掃業務を行う義務を負う。\nイ　AがA所有の建物について賃借人Cとの間で賃貸借契約を締結している期間中にAが死亡した場合、Aの相続人は、Cに賃貸借契約を継続するか否かを相当の期間を定めて催告し、期間内に返答がなければ賃貸借契約をAの死亡を理由に解除することができる。\nウ　AがA所有の土地について買主Dとの間で売買契約を締結し、当該土地の引渡しと残代金決済の前にAが死亡した場合、当該売買契約は原始的に履行が不能となって無効となる。\nエ　AがE所有の建物について貸主Eとの間で使用貸借契約を締結していた場合、Aの相続人は、Eとの間で特段の合意をしなくても、当該使用貸借契約の借主の地位を相続して当該建物を使用することができる。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "エ",
    "explanation": "死亡による契約の終了事由は契約の種類ごとに異なる。アからエまでの四つが誤り。賃貸借と売買は相続により契約上の地位が引き継がれる。",
    "choiceExplanations": {
      "ア": "誤りが一つではない。アの清掃の準委任では、原則として受任者Aの死亡により契約が終了する（653条・656条）。",
      "イ": "誤りが二つではない。イでは賃貸人の地位が相続され、賃貸人の死亡だけで解除することはできない（896条）。",
      "ウ": "誤りが三つではない。ウでは売主の地位が相続され、死亡によって契約が初めから無効になることはない（896条）。",
      "エ": "四つが正解。ア・イ・ウに加え、エの使用貸借は原則として借主Aの死亡によって終了する（597条3項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=4",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q4",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 4,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "配偶者居住権"
    ],
    "difficulty": 3,
    "question": "被相続人Aの配偶者Bが、A所有の建物に相続開始の時に居住していたため、遺産分割協議によって配偶者居住権を取得した場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "遺産分割協議でBの配偶者居住権の存続期間を20年と定めた場合、存続期間が満了した時点で配偶者居住権は消滅し、配偶者居住権の延長や更新はできない。",
      "イ": "Bは、配偶者居住権の存続期間内であれば、居住している建物の所有者の承諾を得ることなく、第三者に当該建物を賃貸することができる。",
      "ウ": "配偶者居住権の存続期間中にBが死亡した場合、Bの相続人CはBの有していた配偶者居住権を相続する。",
      "エ": "Bが配偶者居住権に基づいて居住している建物が第三者Dに売却された場合、Bは、配偶者居住権の登記がなくてもDに対抗することができる。"
    },
    "answer": "ア",
    "explanation": "協議で20年という存続期間を選ぶと、その期間の満了で配偶者居住権は消滅する。終身とする原則に対し、相続人の協議で期間を別に定めることができる。",
    "choiceExplanations": {
      "ア": "正しい。終身が原則だが、期間を別に定められる。定めた存続期間を更新する制度はない（1030条）。",
      "イ": "誤り。配偶者は建物の所有者の承諾を得なければ、第三者に建物を使用・収益させることができない（1032条3項）。",
      "ウ": "誤り。配偶者居住権は配偶者が死亡すると消滅し、相続の対象にならない（1036条・597条3項）。",
      "エ": "誤り。権利を建物の買主Dに対抗するためには配偶者居住権の登記が必要となる（1031条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=5",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q5",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 5,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "行為能力と意思能力"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。",
    "choices": {
      "ア": "令和3年4月1日において18歳の者は成年であるので、その時点で、携帯電話サービスの契約や不動産の賃貸借契約を1人で締結することができる。",
      "イ": "養育費は、子供が未成熟であって経済的に自立することを期待することができない期間を対象として支払われるものであるから、子供が成年に達したときは、当然に養育費の支払義務が終了する。",
      "ウ": "営業を許された未成年者が、その営業に関するか否かにかかわらず、第三者から法定代理人の同意なく負担付贈与を受けた場合には、法定代理人は当該行為を取り消すことができない。",
      "エ": "意思能力を有しないときに行った不動産の売買契約は、後見開始の審判を受けているか否かにかかわらず効力を有しない。"
    },
    "answer": "エ",
    "explanation": "意思能力は意思表示の時点で判断する。後見開始の審判の有無にかかわらず、意思能力を欠いた行為は無効となる。",
    "choiceExplanations": {
      "ア": "誤り。出題時点の成年年齢は20歳。18歳への引下げは2022年4月1日から施行された。",
      "イ": "誤り。養育費は子が経済的に自立できるかなどによって判断され、成年に達しただけで当然に終わるものではない。",
      "ウ": "誤り。営業を許された場合でも、成年者と同じ行為能力を持つのは許可された営業についてである（6条）。",
      "エ": "正しい。契約を結ぶ時点で意思能力がなければ、後見の審判を受けていなくても無効となる（3条の2）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=5",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034",
      "https://www.moj.go.jp/MINJI/minji07_00238.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q6",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 6,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "債権譲渡"
    ],
    "difficulty": 3,
    "question": "売買代金債権（以下この問において「債権」という。）の譲渡（令和3年7月1日に譲渡契約が行われたもの）に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "譲渡制限の意思表示がされた債権が譲渡された場合、当該債権譲渡の効力は妨げられないが、債務者は、その債権の全額に相当する金銭を供託することができる。",
      "イ": "債権が譲渡された場合、その意思表示の時に債権が現に発生していないときは、譲受人は、その後に発生した債権を取得できない。",
      "ウ": "譲渡制限の意思表示がされた債権の譲受人が、その意思表示がされていたことを知っていたときは、債務者は、その債務の履行を拒むことができ、かつ、譲渡人に対する弁済その他の債務を消滅させる事由をもって譲受人に対抗することができる。",
      "エ": "債権の譲渡は、譲渡人が債務者に通知し、又は債務者が承諾をしなければ、債務者その他の第三者に対抗することができず、その譲渡の通知又は承諾は、確定日付のある証書によってしなければ、債務者以外の第三者に対抗することができない。"
    },
    "answer": "イ",
    "explanation": "譲渡時に存在しない将来債権も譲渡できる。発生時に譲受人が取得する。譲渡制限のある債権も譲渡自体は有効であり、譲受人への対抗の可否は別に判断する。",
    "choiceExplanations": {
      "ア": "正しい。譲渡制限があっても譲渡は有効で、債務者は債権の全額に相当する金銭を供託できる（466条・466条の2）。",
      "イ": "誤り。譲渡時に未発生の債権も譲渡の対象となり、譲受人は発生した債権を当然に取得する（466条の6）。",
      "ウ": "正しい。制限を知っていた譲受人には履行を拒み、譲渡人への弁済などを対抗できる（466条3項）。",
      "エ": "正しい。譲渡人の通知か債務者の承諾が必要で、債務者以外への対抗には確定日付のある証書を要する（467条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=6",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q7",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 7,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "契約不適合責任"
    ],
    "difficulty": 3,
    "question": "Aを売主、Bを買主として、A所有の甲自動車を50万円で売却する契約（以下この問において「本件契約」という。）が令和3年7月1日に締結された場合に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "Bが甲自動車の引渡しを受けたが、甲自動車のエンジンに契約の内容に適合しない欠陥があることが判明した場合、BはAに対して、甲自動車の修理を請求することができる。",
      "イ": "Bが甲自動車の引渡しを受けたが、甲自動車に契約の内容に適合しない修理不能な損傷があることが判明した場合、BはAに対して、売買代金の減額を請求することができる。",
      "ウ": "Bが引渡しを受けた甲自動車が故障を起こしたときは、修理が可能か否かにかかわらず、BはAに対して、修理を請求することなく、本件契約の解除をすることができる。",
      "エ": "甲自動車について、第三者CがA所有ではなくC所有の自動車であると主張しており、Bが所有権を取得できないおそれがある場合、Aが相当の担保を供したときを除き、BはAに対して、売買代金の支払を拒絶することができる。"
    },
    "answer": "ウ",
    "explanation": "修理で追完できる契約不適合は、原則として履行を催告してから解除を検討する。追完ができるかどうかを確認し、代金減額や解除に進むための要件を分けて考える。",
    "choiceExplanations": {
      "ア": "正しい。引き渡された物の品質が契約に適合しないときは、修理などの追完を請求できる（562条）。",
      "イ": "正しい。追完が不能なら催告をせず、契約不適合の程度に応じて代金減額を請求できる（563条2項）。",
      "ウ": "誤り。修理可能かどうかを問わず直ちに解除できるわけではなく、原則は催告解除の要件による（541条・564条）。",
      "エ": "正しい。第三者の権利主張で権利を取得できないおそれがあれば、その危険の限度で代金の支払いを拒める（576条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=6",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q8",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 8,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "工作物責任と時効"
    ],
    "difficulty": 3,
    "question": "Aが1人で居住する甲建物の保存に瑕疵があったため、令和3年7月1日に甲建物の壁が崩れて通行人Bがケガをした場合（以下この問において「本件事故」という。）における次の記述のうち、民法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "Aが甲建物をCから賃借している場合、Aは甲建物の保存の瑕疵による損害の発生の防止に必要な注意をしなかったとしても、Bに対して不法行為責任を負わない。",
      "イ": "Aが甲建物を所有している場合、Aは甲建物の保存の瑕疵による損害の発生の防止に必要な注意をしたとしても、Bに対して不法行為責任を負う。",
      "ウ": "本件事故について、AのBに対する不法行為責任が成立する場合、BのAに対する損害賠償請求権は、B又はBの法定代理人が損害又は加害者を知らないときでも、本件事故の時から20年間行使しないときには時効により消滅する。",
      "エ": "本件事故について、AのBに対する不法行為責任が成立する場合、BのAに対する損害賠償請求権は、B又はBの法定代理人が損害及び加害者を知った時から5年間行使しないときには時効により消滅する。"
    },
    "answer": "ア",
    "explanation": "工作物の占有者は、損害を防ぐのに必要な注意を怠れば、工作物の瑕疵による損害を賠償する。占有者と所有者では、必要な注意をした場合の責任の扱いも異なる。",
    "choiceExplanations": {
      "ア": "誤り。賃借人Aは占有者であり、必要な注意を怠った場合はBに対する責任を負う（717条1項）。",
      "イ": "正しい。所有者には必要な注意を尽くしたことによる免責がない（717条1項）。",
      "ウ": "正しい。不法行為の時から20年間行使しないと、損害と加害者を知っていなくても時効が完成する（724条2号）。",
      "エ": "正しい。生命・身体を害する不法行為では、損害と加害者を知ってからの時効期間は5年となる（724条の2）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=7",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q9",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 9,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "法定相続分"
    ],
    "difficulty": 3,
    "question": "Aには死亡した夫Bとの間に子Cがおり、Dには離婚した前妻Eとの間に子F及び子Gがいる。Fの親権はEが有し、Gの親権はDが有している。AとDが婚姻した後にDが令和3年7月1日に死亡した場合における法定相続分として、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Aが2分の1、Fが4分の1、Gが4分の1",
      "イ": "Aが2分の1、Cが6分の1、Fが6分の1、Gが6分の1",
      "ウ": "Aが2分の1、Gが2分の1",
      "エ": "Aが2分の1、Cが4分の1、Gが4分の1"
    },
    "answer": "ア",
    "explanation": "Dの配偶者Aが2分の1を取得し、Dの子FとGが残りの2分の1を等分する。Fの親権者がEであることや、DとAが婚姻したことは、Dと実子F・Gの関係を変えない。",
    "choiceExplanations": {
      "ア": "正しい。Dの配偶者Aと子F・Gが相続人になる。子の親権者が誰かは相続資格に影響しない（887条・890条・900条）。",
      "イ": "誤り。AとBの子CとDとの間に養子縁組等は示されておらず、CはDの相続人ではない。",
      "ウ": "誤り。Fは母Eの親権に服していてもDの子であり、Gと同じ法定相続分を持つ。",
      "エ": "誤り。Dの子Fを含め、Dの子でないCを除くと、FとGが4分の1ずつとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=7",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q10",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 10,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "選択債権"
    ],
    "difficulty": 3,
    "question": "AとBとの間で、Aを売主、Bを買主とする、等価値の美術品甲又は乙のいずれか選択によって定められる美術品の売買契約（以下この問において「本件契約」という。）が令和3年7月1日に締結された場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "本件契約において、給付の目的を甲にするか乙にするかについて、第三者Cを選択権者とする合意がなされた場合、Cが選択をすることができないときは、選択権はBに移転する。",
      "イ": "本件契約において、給付の目的を甲にするか乙にするかについて、Aを選択権者とする合意がなされた後に、Aの失火により甲が全焼したときは、給付の目的物は乙となる。",
      "ウ": "本件契約において、給付の目的を甲にするか乙にするかについての選択権に関する特段の合意がない場合、Bが選択権者となる。",
      "エ": "本件契約において、給付の目的を甲にするか乙にするかについて、第三者Dを選択権者とする合意がなされた場合、Dが選択権を行使するときは、AとBの両者に対して意思表示をしなければならない。"
    },
    "answer": "イ",
    "explanation": "選択権を持つA自身の過失によって甲を給付できなくなったため、残る乙を給付する。第三者が選択できなくなった場合に選択権を取得するのも、給付債務を負うAである。",
    "choiceExplanations": {
      "ア": "誤り。第三者が選択できない場合、選択権は債務者Aに移る（409条2項）。",
      "イ": "正しい。選択権者Aの過失で甲を給付できなくなった場合は、残存する乙が債権の目的となる（410条）。",
      "ウ": "誤り。別段の意思表示がなければ、選択権は給付債務を負う売主Aに属する（406条）。",
      "エ": "誤り。第三者Dは売主Aか買主Bのいずれか一方に意思表示すれば選択権を行使できる（409条1項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=8",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q11",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 11,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "定期借地権"
    ],
    "difficulty": 3,
    "question": "Aは、所有している甲土地につき、Bとの間で建物所有を目的とする賃貸借契約（以下この問において「借地契約」という。）を締結する予定であるが、期間が満了した時点で、確実に借地契約が終了するようにしたい。この場合に関する次の記述のうち、借地借家法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "事業の用に供する建物を所有する目的とし、期間を60年と定める場合には、契約の更新や建物の築造による存続期間の延長がない旨を書面で合意すれば、公正証書で合意しなくても、その旨を借地契約に定めることができる。",
      "イ": "居住の用に供する建物を所有することを目的とする場合には、公正証書によって借地契約を締結するときであっても、期間を20年とし契約の更新や建物の築造による存続期間の延長がない旨を借地契約に定めることはできない。",
      "ウ": "居住の用に供する建物を所有することを目的とする場合には、借地契約を書面で行えば、借地権を消滅させるため、借地権の設定から20年が経過した日に甲土地上の建物の所有権を相当の対価でBからAに移転する旨の特約を有効に定めることができる。",
      "エ": "借地契約がBの臨時設備の設置その他一時使用のためになされることが明らかである場合には、期間を5年と定め、契約の更新や建物の築造による存続期間の延長がない旨を借地契約に定めることができる。"
    },
    "answer": "ウ",
    "explanation": "建物譲渡特約付借地権では、相当の対価による建物譲渡を借地権設定後30年以上の日に定める。書面で約束しても、設定から20年後の譲渡を予定する設問の特約にはこの効力がない。",
    "choiceExplanations": {
      "ア": "正しい。50年以上の一般定期借地権は書面による特約で足り、公正証書に限られない（22条）。",
      "イ": "正しい。20年の事業用定期借地権等では居住用の建物を除くため、居住用の建物には適用できない（23条）。",
      "ウ": "誤り。建物の譲渡により借地権を消滅させる特約では、借地権設定後30年以上を要する（24条）。",
      "エ": "正しい。臨時設備の設置など一時使用であることが明らかな場合は、一般の存続期間・更新の規定が適用されない（25条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=8",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/403AC0000000090/403AC0000000090_20200401_429AC0000000045"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q12",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 12,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "建物賃貸借と敷金"
    ],
    "difficulty": 3,
    "question": "Aを賃貸人、Bを賃借人とする甲建物の賃貸借契約（以下この問において「本件契約」という。）が令和3年7月1日に締結された場合に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。",
    "choices": {
      "ア": "本件契約について期間の定めをしなかった場合、AはBに対して、いつでも解約の申入れをすることができ、本件契約は、解約の申入れの日から3月を経過することによって終了する。",
      "イ": "甲建物がBに引き渡された後、甲建物の所有権がAからCに移転した場合、本件契約の敷金は、他に特段の合意がない限り、BのAに対する未払賃料債務に充当され、残額がCに承継される。",
      "ウ": "甲建物が適法にBからDに転貸されている場合、AがDに対して本件契約が期間満了によって終了する旨の通知をしたときは、建物の転貸借は、その通知がされた日から3月を経過することによって終了する。",
      "エ": "本件契約が借地借家法第38条の定期建物賃貸借契約で、期間を5年、契約の更新がない旨を定めた場合、Aは、期間満了の1年前から6月前までの間に、Bに対し賃貸借が終了する旨の通知をしなければ、従前の契約と同一条件で契約を更新したものとみなされる。"
    },
    "answer": "イ",
    "explanation": "引渡し後に建物の所有権が移り賃貸人が交替すると、旧賃貸人への未払賃料を差し引いた敷金残額が引き継がれる。",
    "choiceExplanations": {
      "ア": "誤り。賃貸人からの解約申入れには正当事由を要し、終了まで6か月かかる（借地借家法27条・28条）。",
      "イ": "正しい。新賃貸人は敷金に関する地位を承継する。判例は未払賃料への充当後に残額を承継するとしている。",
      "ウ": "誤り。転借人が終了通知を受けた場合、通知から6か月を経過すると転貸借が終了する（借地借家法34条）。",
      "エ": "誤り。通知期間を過ぎたときは直ちに終了を対抗できず、後から通知すると6か月後に対抗できる（同法38条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=9",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034",
      "https://laws.e-gov.go.jp/law/403AC0000000090/403AC0000000090_20200401_429AC0000000045",
      "https://www.courts.go.jp/app/files/hanrei_jp/132/054132_hanrei.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q13",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 13,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "区分所有法"
    ],
    "difficulty": 3,
    "question": "建物の区分所有等に関する法律（以下この問において「法」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "法又は規約により集会において決議をすべき場合において、区分所有者が1人でも反対するときは、集会を開催せずに書面によって決議をすることはできない。",
      "イ": "形状又は効用の著しい変更を伴う共用部分の変更については、区分所有者及び議決権の各4分の3以上の多数による集会の決議で決するものであるが、規約でこの区分所有者の定数を過半数まで減ずることができる。",
      "ウ": "敷地利用権が数人で有する所有権その他の権利である場合には、規約に別段の定めがあるときを除いて、区分所有者は、その有する専有部分とその専有部分に係る敷地利用権とを分離して処分することができない。",
      "エ": "各共有者の共用部分の持分は、規約に別段の定めがある場合を除いて、その有する専有部分の床面積の割合によるが、この床面積は壁その他の区画の中心線で囲まれた部分の水平投影面積である。"
    },
    "answer": "エ",
    "explanation": "共用部分の持分を決める専有部分の床面積は、壁などの内側の線で囲まれた部分で測る。壁の中心線を基準とする面積と混同しないようにする。",
    "choiceExplanations": {
      "ア": "正しい。集会を開かずに書面で決議することには、区分所有者全員の承諾が必要となる（45条1項）。",
      "イ": "正しい。重大な変更は原則として人数・議決権とも4分の3以上で決議する。規約で人数の要件だけを過半数まで下げられる（17条）。",
      "ウ": "正しい。規約に別段の定めがなければ、専有部分と共有の敷地利用権を切り離して処分できない（22条）。",
      "エ": "誤り。持分の算定に用いる床面積は内法による水平投影面積である（14条）。壁の中心線を基準にしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=9",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000069/337AC0000000069_20200401_502AC0000000008"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q14",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 14,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "不動産登記の申請"
    ],
    "difficulty": 3,
    "question": "不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "所有権の登記の抹消は、所有権の移転の登記がある場合においても、所有権の登記名義人が単独で申請することができる。",
      "イ": "登記の申請をする者の委任による代理人の権限は、本人の死亡によって消滅する。",
      "ウ": "法人の合併による権利の移転の登記は、登記権利者が単独で申請することができる。",
      "エ": "信託の登記は、受託者が単独で申請することができない。"
    },
    "answer": "ウ",
    "explanation": "合併に伴う権利移転では、登記権利者が単独で申請できる。共同申請が原則であっても、相続・合併による移転には単独申請を認める特則がある。",
    "choiceExplanations": {
      "ア": "誤り。所有権の登記名義人が単独で抹消申請できる特則は、所有権移転登記がない場合に限る（77条）。",
      "イ": "誤り。登記申請の委任による代理権は、本人が死亡しても消滅しない（17条）。",
      "ウ": "正しい。相続や法人の合併による権利の移転の登記は、登記権利者が単独で申請できる（63条2項）。",
      "エ": "誤り。信託の登記は受託者の単独申請が認められている（98条2項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=10",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/416AC0000000123/416AC0000000123_20200929_502AC0000000012"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q15",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 15,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "地区計画と区域区分"
    ],
    "difficulty": 3,
    "question": "都市計画法に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "地区計画については、都市計画に、当該地区計画の目標を定めるよう努めるものとされている。",
      "イ": "地区計画については、都市計画に、区域の面積を定めるよう努めるものとされている。",
      "ウ": "地区整備計画においては、市街化区域と市街化調整区域との区分の決定の有無を定めることができる。",
      "エ": "地区整備計画においては、建築物の建蔽率の最高限度を定めることができる。"
    },
    "answer": "ウ",
    "explanation": "市街化区域と市街化調整区域を分ける区域区分は都市計画のうち独立した事項で、地区整備計画の内容には含まれない。",
    "choiceExplanations": {
      "ア": "正しい。地区計画の目標は都市計画に定めるよう努める事項である（12条の5第2項）。",
      "イ": "正しい。地区計画では区域の面積も定めるよう努める（14条2項）。",
      "ウ": "誤り。区域区分は7条の事項。地区整備計画は地区内の施設配置や建築物の制限などを具体化する。",
      "エ": "正しい。地区整備計画では、建築物の建蔽率の最高限度などを定めることができる（12条の5第7項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=10",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/343AC0000000100/343AC0000000100_20200907_502AC0000000043"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q16",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 16,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "開発許可"
    ],
    "difficulty": 3,
    "question": "都市計画法に関する次の記述のうち、正しいものはどれか。ただし、許可を要する開発行為の面積については、条例による定めはないものとし、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。",
    "choices": {
      "ア": "市街化区域において、都市公園法に規定する公園施設である建築物の建築を目的とした5,000m²の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。",
      "イ": "首都圏整備法に規定する既成市街地内にある市街化区域において、住宅の建築を目的とした800m²の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。",
      "ウ": "準都市計画区域において、商業施設の建築を目的とした2,000m²の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。",
      "エ": "区域区分が定められていない都市計画区域において、土地区画整理事業の施行として行う8,000m²の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。"
    },
    "answer": "イ",
    "explanation": "首都圏の既成市街地内の市街化区域では500m²未満の開発が規模による許可不要の対象で、800m²はその対象外となる。",
    "choiceExplanations": {
      "ア": "誤り。都市公園法上の公園施設である建築物を目的とする開発は、公益上必要な建築物の例外に当たる（29条1項3号、施行令21条）。",
      "イ": "正しい。既成市街地内の基準は500m²未満で、住宅を建てるための800m²の開発には許可が必要（施行令19条）。",
      "ウ": "誤り。準都市計画区域では原則3,000m²未満の開発は許可不要で、2,000m²はこれに該当する（施行令19条）。",
      "エ": "誤り。土地区画整理事業の施行として行う開発行為は、面積にかかわらず開発許可の対象外である（29条1項5号）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=11",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/343AC0000000100/343AC0000000100_20200907_502AC0000000043",
      "https://laws.e-gov.go.jp/law/344CO0000000158/344CO0000000158_20200907_502CO0000000268"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q17",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 17,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "建築物の使用と防火"
    ],
    "difficulty": 3,
    "question": "建築基準法に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "居室の内装の仕上げには、ホルムアルデヒドを発散させる建築材料を使用することが認められていない。",
      "イ": "4階建ての共同住宅の敷地内には、避難階に設けた屋外への出口から道又は公園、広場その他の空地に通ずる幅員が2m以上の通路を設けなければならない。",
      "ウ": "防火地域又は準防火地域内にある建築物で、外壁が防火構造であるものについては、その外壁を隣地境界線に接して設けることができる。",
      "エ": "建築主は、3階建ての木造の共同住宅を新築する場合において、特定行政庁が、安全上、防火上及び避難上支障がないと認めたときは、検査済証の交付を受ける前においても、仮に当該共同住宅を使用することができる。"
    },
    "answer": "エ",
    "explanation": "検査済証の交付前でも、特定行政庁が安全・防火・避難上の支障がないと認めれば仮使用できる。三階建ての木造共同住宅にも、この認定による仮使用の制度を適用できる。",
    "choiceExplanations": {
      "ア": "誤り。ホルムアルデヒドを発散する建材は種類に応じて使用の禁止や面積の制限があり、すべての材料が一律禁止ではない（施行令20条の7）。",
      "イ": "誤り。この敷地内通路の幅員の原則は1.5m以上である（施行令128条）。",
      "ウ": "誤り。隣地境界線に接して外壁を設けられる特則は、外壁が耐火構造の場合に適用される（63条）。",
      "エ": "正しい。安全上、防火上及び避難上の支障がないとして認定を受けた場合は仮使用できる（7条の6第1項1号）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=11",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201/325AC0000000201_20200907_502AC0000000043",
      "https://laws.e-gov.go.jp/law/325CO0000000338/325CO0000000338_20200907_502CO0000000268"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q18",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 18,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "建築基準法の用途・建蔽率"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、建築基準法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "都市計画により建蔽率の限度が10分の6と定められている近隣商業地域において、準防火地域内にある耐火建築物で、街区の角にある敷地又はこれに準ずる敷地で特定行政庁が指定するものの内にある建築物については、建蔽率の限度が10分の8となる。",
      "イ": "市町村は、集落地区計画の区域において、用途地域における用途の制限を補完し、当該区域の特性にふさわしい土地利用の増進等の目的を達成するため必要と認める場合においては、国土交通大臣の承認を得て、当該区域における用途制限を緩和することができる。",
      "ウ": "居住環境向上用途誘導地区内においては、公益上必要な一定の建築物を除き、建築物の建蔽率は、居住環境向上用途誘導地区に関する都市計画において建築物の建蔽率の最高限度が定められたときは、当該最高限度以下でなければならない。",
      "エ": "都市計画区域内のごみ焼却場の用途に供する建築物について、特定行政庁が建築基準法第51条に規定する都市計画審議会の議を経てその敷地の位置が都市計画上支障がないと認めて許可した場合においては、都市計画においてその敷地の位置が決定しているものでなくても、新築することができる。"
    },
    "answer": "イ",
    "explanation": "用途地域の制限を大臣の承認を経て条例で緩和する規定は、特別用途地区について設けられている。地区を指定する制度ごとに、用途や建蔽率について設けられる規制が異なる。",
    "choiceExplanations": {
      "ア": "正しい。準防火地域内の耐火建築物と指定された角地の緩和を合わせて、各1割を加え60%から80%になる（53条3項）。",
      "イ": "誤り。国土交通大臣の承認により用途制限を緩和できるのは特別用途地区の規定で、設問の集落地区計画には当てはまらない（49条2項）。",
      "ウ": "正しい。都市計画で建蔽率の最高限度を定めた場合、一定の適用除外を除いてそれに従う（60条の2の2）。",
      "エ": "正しい。特定行政庁が所定の都市計画審議会を経て支障がないと認めて許可すれば、敷地の都市計画決定なしでも新築できる（51条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=12",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201/325AC0000000201_20200907_502AC0000000043"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q19",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 19,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "宅地造成工事と防災区域"
    ],
    "difficulty": 3,
    "question": "宅地造成等規制法（以下この問において「法」という。）に関する次の記述のうち、誤っているものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。",
    "choices": {
      "ア": "宅地造成工事規制区域内において、宅地を造成するために切土をする土地の面積が500m²であって盛土を生じない場合、切土をした部分に生じる崖の高さが1.5mであれば、都道府県知事の法第8条第1項本文の工事の許可は不要である。",
      "イ": "都道府県知事は、法第8条第1項本文の工事の許可の申請があった場合においては、遅滞なく、文書をもって許可又は不許可の処分を申請者に通知しなければならない。",
      "ウ": "都道府県知事は、一定の場合には都道府県（地方自治法に基づく指定都市、中核市又は施行時特例市の区域にあっては、それぞれ指定都市、中核市又は施行時特例市）の規則で、宅地造成工事規制区域内において行われる宅地造成に関する工事の技術的基準を強化し、又は付加することができる。",
      "エ": "都道府県知事は、関係市町村長の意見を聴いて、宅地造成工事規制区域内で、宅地造成に伴う災害で相当数の居住者その他の者に危害を生ずるものの発生のおそれが大きい一団の造成宅地の区域であって一定の基準に該当するものを、造成宅地防災区域として指定することができる。"
    },
    "answer": "エ",
    "explanation": "出題時の宅地造成等規制法では、造成宅地防災区域の対象から宅地造成工事規制区域内の土地を除いていた。切土の高さと面積による工事許可の判定とは別の制度である。",
    "choiceExplanations": {
      "ア": "正しい。切土の崖は高さ2mを超えず、面積も500m²を超えないため、設問の工事は許可の対象にならない（施行令3条）。",
      "イ": "正しい。知事は遅滞なく、許可又は不許可の処分を文書で通知する（10条）。",
      "ウ": "正しい。地域の条件から政令の基準だけでは災害の防止が難しい場合、規則で技術的基準を強化又は付加できる（施行令15条）。",
      "エ": "誤り。造成宅地防災区域は宅地造成工事規制区域の外で指定する制度であった（20条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=12",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/336AC0000000191/336AC0000000191_20150401_426AC0000000042",
      "https://laws.e-gov.go.jp/law/337CO0000000016/337CO0000000016_20190401_429CO0000000232"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q20",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 20,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "土地区画整理事業"
    ],
    "difficulty": 3,
    "question": "土地区画整理法に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "換地計画において参加組合員に対して与えるべきものとして定められた宅地は、換地処分の公告があった日の翌日において、当該宅地の所有者となるべきものとして換地計画において定められた参加組合員が取得する。",
      "イ": "換地計画において換地を定める場合においては、換地及び従前の宅地の位置、地積、土質、水利、利用状況、環境等が照応するように定めなければならない。",
      "ウ": "土地区画整理組合の設立の認可の公告があった日後、換地処分の公告がある日までは、施行地区内において、土地区画整理事業の施行の障害となるおそれがある土地の形質の変更を行おうとする者は、当該土地区画整理組合の許可を受けなければならない。",
      "エ": "土地区画整理組合の組合員は、組合員の3分の1以上の連署をもって、その代表者から理由を記載した書面を土地区画整理組合に提出して、理事又は監事の解任を請求することができる。"
    },
    "answer": "ウ",
    "explanation": "施行の障害となり得る土地の形質変更は、区画整理組合ではなく都道府県知事等が許可する。組合が施行する事業でも、工事を妨げるおそれのある行為を制限する権限は行政庁にある。",
    "choiceExplanations": {
      "ア": "正しい。参加組合員に与える宅地は、換地処分公告の翌日に換地計画で定められた参加組合員が取得する（104条11項）。",
      "イ": "正しい。換地と従前の宅地について位置、地積、利用状況などが照応するように定める（89条1項）。",
      "ウ": "誤り。土地の形質変更等の許可権者は都道府県知事等であり、事業を施行する組合とは区別する（76条1項）。",
      "エ": "正しい。組合員の3分の1以上が連署し、代表者が理由を記した書面を組合に提出して解任を請求できる（27条7項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=13",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/329AC0000000119/329AC0000000119_20200401_429AC0000000045"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q21",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 21,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "農地の権利移転と転用"
    ],
    "difficulty": 3,
    "question": "農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "遺産分割によって農地を取得する場合には、法第3条第1項の許可は不要であるが、農業委員会への届出が必要である。",
      "イ": "法第3条第1項の許可を受けなければならない場合の売買については、その許可を受けずに農地の売買契約を締結しても、所有権移転の効力は生じない。",
      "ウ": "砂利採取法第16条の認可を受けて市街化調整区域内の農地を砂利採取のために一時的に借り受ける場合には、法第5条第1項の許可は不要である。",
      "エ": "都道府県が市街化調整区域内の農地を取得して病院を建設する場合には、都道府県知事（法第4条第1項に規定する指定市町村の区域内にあってはその長）との協議が成立すれば、法第5条第1項の許可があったものとみなされる。"
    },
    "answer": "ウ",
    "explanation": "砂利を採るため農地を一時的に借りる場合も転用を目的とした権利の設定に当たり、砂利採取法の認可とは別に農地法の許可を要する。",
    "choiceExplanations": {
      "ア": "正しい。遺産分割での取得に3条の許可は不要だが、農業委員会への届出を要する（3条1項・3条の3）。",
      "イ": "正しい。許可を要する場合に無許可で行った行為は農地の権利移転の効力を生じない（3条6項）。",
      "ウ": "誤り。市街化調整区域内で借り受けて一時転用するときは、砂利採取法の認可を受けても農地法5条の許可を要する。",
      "エ": "正しい。都道府県が病院建設のために農地を取得する場合は、権限を持つ知事等と協議が成立すれば転用許可があったとみなされる（5条4項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=13",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC0000000229/327AC0000000229_20200401_501AC0000000012"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q22",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 22,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "国土利用計画法の事後届出"
    ],
    "difficulty": 3,
    "question": "国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市にあってはその長をいうものとする。",
    "choices": {
      "ア": "土地売買等の契約を締結した場合には、当事者のうち当該契約による権利取得者は、その契約を締結した日の翌日から起算して3週間以内に、事後届出を行わなければならない。",
      "イ": "都道府県知事は、事後届出をした者に対し、その届出に係る土地に関する権利の移転若しくは設定後における土地の利用目的又は土地に関する権利の移転若しくは設定の対価の額について、当該土地を含む周辺の地域の適正かつ合理的な土地利用を図るために必要な助言をすることができる。",
      "ウ": "事後届出が必要な土地売買等の契約を締結したにもかかわらず、所定の期間内に当該届出をしなかった者は、都道府県知事からの勧告を受けるが、罰則の適用はない。",
      "エ": "宅地建物取引業者Aが所有する準都市計画区域内の20,000m²の土地について、10,000m²をB市に、10,000m²を宅地建物取引業者Cに売却する契約を締結した場合、B市は事後届出を行う必要はないが、Cは一定の場合を除き事後届出を行う必要がある。"
    },
    "answer": "エ",
    "explanation": "地方公共団体が当事者である契約には届出の例外がある。民間同士の準都市計画区域内の取引は10,000m²以上が対象になる。",
    "choiceExplanations": {
      "ア": "誤り。起算日は契約締結日であり、事後届出の期限はその日から2週間以内である（23条1項）。",
      "イ": "誤り。届出後の助言は土地の利用目的について行う。対価額の適否は事後届出による助言の対象ではない（27条の2）。",
      "ウ": "誤り。必要な届出を怠った場合には罰則が設けられている（47条）。勧告は届出後の土地利用目的に関する制度である。",
      "エ": "正しい。B市の契約は地方公共団体が当事者なので対象外となる。Cの契約は面積基準を満たすため、原則として届出が必要（23条2項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=14",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/349AC1000000092/349AC1000000092_20200907_502AC0000000043"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q23",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 23,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "譲渡所得"
    ],
    "difficulty": 3,
    "question": "所得税法に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "譲渡所得の特別控除額（50万円）は、譲渡益のうち、まず、資産の取得の日以後5年以内にされた譲渡による所得で政令で定めるものに該当しないものに係る部分の金額から控除し、なお控除しきれない特別控除額がある場合には、それ以外の譲渡による所得に係る部分の金額から控除する。",
      "イ": "譲渡所得の金額の計算上、資産の譲渡に係る総収入金額から控除する資産の取得費には、その資産の取得時に支出した購入代金や購入手数料の金額は含まれるが、その資産の取得後に支出した設備費及び改良費の額は含まれない。",
      "ウ": "建物の全部の所有を目的とする土地の賃借権の設定の対価として支払を受ける権利金の金額が、その土地の価額の10分の5に相当する金額を超えるときは、不動産所得として課税される。",
      "エ": "居住者がその取得の日以後5年以内に固定資産を譲渡した場合には、譲渡益から譲渡所得の特別控除額（50万円）を控除した後の譲渡所得の金額の2分の1に相当する金額が課税標準とされる。"
    },
    "answer": "ア",
    "explanation": "総合課税の譲渡所得に対する50万円の特別控除は、まず短期譲渡所得から引き、残りを長期譲渡所得から引く。",
    "choiceExplanations": {
      "ア": "正しい。50万円の特別控除を短期譲渡所得から先に差し引く（33条4項・5項）。",
      "イ": "誤り。購入代金や手数料に加え、資産の取得後に支出した設備費と改良費も取得費に含まれる（38条）。",
      "ウ": "誤り。建物全体の所有を目的とする借地権設定の対価で、土地の価額の半分を超える権利金は、譲渡所得として扱われる（33条、施行令79条）。",
      "エ": "誤り。総合課税で譲渡所得の2分の1を算入するのは長期譲渡所得の扱い。短期は特別控除後の全額を算入する（22条2項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=14",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/340AC0000000033?occasion_date=20210401",
      "https://laws.e-gov.go.jp/law/340CO0000000096?occasion_date=20210401",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3152.htm"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q24",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 24,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "不動産取得税"
    ],
    "difficulty": 3,
    "question": "不動産取得税に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "平成28年に新築された既存住宅（床面積210m²）を個人が自己の居住のために取得した場合、当該取得に係る不動産取得税の課税標準の算定については、当該住宅の価格から1,200万円が控除される。",
      "イ": "家屋が新築された日から3年を経過して、なお、当該家屋について最初の使用又は譲渡が行われない場合においては、当該家屋が新築された日から3年を経過した日において家屋の取得がなされたものとみなし、当該家屋の所有者を取得者とみなして、これに対して不動産取得税を課する。",
      "ウ": "不動産取得税は、不動産の取得があった日の翌日から起算して2か月以内に当該不動産の所在する都道府県に申告納付しなければならない。",
      "エ": "不動産取得税は、不動産を取得するという比較的担税力のある機会に相当の税負担を求める観点から創設されたものであるが、不動産取得税の税率は4%を超えることができない。"
    },
    "answer": "ア",
    "explanation": "自己居住用の既存住宅を取得する場合、床面積と新築時期などが要件を満たせば課税標準から控除が受けられる。",
    "choiceExplanations": {
      "ア": "正しい。床面積210m²はこの特例の床面積の範囲内で、平成28年新築の住宅の控除額は1,200万円になる（73条の14）。",
      "イ": "誤り。新築後に使用も譲渡もされない場合に取得があったとみなす期間は原則6か月であり、3年ではない（73条の2第2項）。",
      "ウ": "誤り。不動産取得税は都道府県による普通徴収であり、取得の翌日から2か月以内に自ら申告納付する制度ではない（73条の17）。",
      "エ": "誤り。4%は法定の標準税率であり、税率の上限を定める制限税率ではない（73条の15）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=15",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000226/325AC0000000226_20210401_503AC1000000019"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q25",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 25,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "不動産鑑定評価基準"
    ],
    "difficulty": 3,
    "question": "不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、誤っているものはどれか。",
    "choices": {
      "ア": "不動産鑑定士の通常の調査の範囲では、対象不動産の価格への影響の程度を判断するための事実の確認が困難な特定の価格形成要因がある場合、鑑定評価書の利用者の利益を害するおそれがないと判断されるときに限り、当該価格形成要因について調査の範囲に係る条件を設定することができる。",
      "イ": "対象不動産を価格時点において再調達することを想定した場合において必要とされる適正な原価の総額を再調達原価というが、建設資材、工法等の変遷により、対象不動産の再調達原価を求めることが困難な場合には、対象不動産と同等の有用性を持つものに置き換えて求めた原価を再調達原価とみなすものとする。",
      "ウ": "取引事例等に係る取引が特殊な事情を含み、これが当該取引事例等に係る価格等に影響を及ぼしている場合に、適切に補正することを時点修正という。",
      "エ": "不動産の鑑定評価によって求める賃料は、一般的には正常賃料又は継続賃料であるが、鑑定評価の依頼目的に対応した条件により限定賃料を求めることができる場合がある。"
    },
    "answer": "ウ",
    "explanation": "特殊な事情で価格が偏った取引事例を整えるのは事情補正であり、取引時から価格時点までの価格水準の変化を整えるのが時点修正である。",
    "choiceExplanations": {
      "ア": "正しい。通常の調査では確認が困難な要因については、評価書の利用者の利益を害するおそれがない場合に調査範囲の条件を置ける。",
      "イ": "正しい。従来の資材や工法を再現しにくい場合は、同等の有用性を持つものを再調達する費用によって評価する。",
      "ウ": "誤り。特殊な取引事情による価格の偏りを調整する処理を事情補正という。",
      "エ": "正しい。賃料には正常賃料・継続賃料のほか、依頼目的と条件に応じて限定賃料を求める場合がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=15",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/policy/shingikai/totikensangyo02_sg_000061.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q26",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 26,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "重要事項説明と契約書面"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではない買主Bに対し建物の売却を行う場合における宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "Aは、Bに対し、専任の宅地建物取引士をして説明をさせなければならない。",
      "イ": "Aは、Bに対し、代金以外に授受される金銭の額だけでなく、当該金銭の授受の目的についても説明しなければならない。",
      "ウ": "Aは、Bに対し、建物の上に存する登記された権利の種類及び内容だけでなく、移転登記の申請の時期についても説明しなければならない。",
      "エ": "Aは、Bに対し、売買の対象となる建物の引渡しの時期について説明しなければならない。"
    },
    "answer": "イ",
    "explanation": "売買代金以外の金銭を授受する場合は、その額と目的を契約前の重要事項説明で明らかにする。建物の引渡しや移転登記申請の時期は、契約成立後の37条書面に記載する。",
    "choiceExplanations": {
      "ア": "誤り。説明は宅地建物取引士が行うが、専任の取引士であることまでは求められない（35条1項）。",
      "イ": "正しい。代金以外の金銭については、授受する金額とその目的が重要事項となる（35条1項7号）。",
      "ウ": "誤り。登記された権利の種類や内容は説明するが、所有権移転登記の申請時期は37条書面の記載事項である。",
      "エ": "誤り。引渡しの時期は契約成立後の37条書面の記載事項で、35条に列挙された説明事項には含まれない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=16",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q27",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 27,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業免許の欠格事由"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "個人Aが不正の手段により免許を受けた後、免許を取り消され、その取消しの日から5年を経過した場合、その間に免許を受けることができない事由に該当することがなかったとしても、Aは再び免許を受けることはできない。",
      "イ": "免許を受けようとする個人Bが破産手続開始の決定を受けた後に復権を得た場合においても、Bは免許を受けることができない。",
      "ウ": "免許を受けようとするC社の役員Dが刑法第211条（業務上過失致死傷等）の罪により地方裁判所で懲役1年の判決を言い渡された場合、当該判決に対してDが高等裁判所に控訴し裁判が係属中であっても、C社は免許を受けることができない。",
      "エ": "免許を受けようとするE社の役員に、宅地建物取引業法の規定に違反したことにより罰金の刑に処せられた者がいる場合、その刑の執行が終わって5年を経過しなければ、E社は免許を受けることができない。"
    },
    "answer": "エ",
    "explanation": "宅建業法違反の罰金刑を受けてから所定期間を経ていない役員がいる法人には、宅建業免許を出せない。役員の処分歴が法人の免許の欠格事由になる点を押さえる。",
    "choiceExplanations": {
      "ア": "誤り。不正手段による免許取消しの日から5年が経過すれば、その取消しによる欠格には該当しなくなる（5条）。",
      "イ": "誤り。欠格になるのは破産手続開始決定を受けて復権を得ない者で、復権後はこの欠格に該当しない（5条）。",
      "ウ": "誤り。控訴中は懲役刑が確定しておらず、刑に処せられたことを理由とする法人の欠格は生じない。",
      "エ": "正しい。役員が宅建業法違反で罰金刑を受け、執行終了から5年が経過していないと法人も欠格となる（5条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=16",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q28",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 28,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅地建物取引士の登録"
    ],
    "difficulty": 3,
    "question": "宅地建物取引士の登録（以下この問において「登録」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引士A（甲県知事登録）が、乙県に所在する宅地建物取引業者の事務所の業務に従事することとなったときは、Aは甲県知事を経由せずに、直接乙県知事に対して登録の移転を申請しなければならない。",
      "イ": "甲県知事の登録を受けているが宅地建物取引士証の交付を受けていないBが、宅地建物取引士としてすべき事務を行った場合、情状のいかんを問わず、甲県知事はBの登録を消除しなければならない。",
      "ウ": "宅地建物取引士C（甲県知事登録）は、宅地建物取引業者D社を退職し、宅地建物取引業者E社に再就職したが、CはD社及びE社のいずれにおいても専任の宅地建物取引士ではないので、勤務先の変更の登録を申請しなくてもよい。",
      "エ": "甲県で宅地建物取引士資格試験を受け、合格したFは、乙県に転勤することとなったとしても、登録は甲県知事に申請しなければならない。"
    },
    "answer": "エ",
    "explanation": "宅建士の最初の登録は、勤務地ではなく、資格試験に合格した都道府県の知事に申請する。勤務する都道府県が変わった場合に行う登録の移転は、試験合格後の最初の登録と区別する。",
    "choiceExplanations": {
      "ア": "誤り。他県の事務所に従事する場合は任意で移転を申請でき、申請は現に登録している甲県知事を経由する（19条の2）。",
      "イ": "誤り。取引士証未交付の登録者が取引士の事務を行ったときは、情状が特に重い場合に登録を消除する（68条の2）。",
      "ウ": "誤り。勤務する業者の名称、免許証番号などに変更があれば、専任でなくても変更登録が必要（20条）。",
      "エ": "正しい。乙県への転勤が決まっていても、最初の登録の申請先は資格試験を行った甲県知事である（18条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=17",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q29",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 29,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "事務所・案内所の義務"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者は、その事務所ごとに従業者の氏名、従業者証明書番号その他国土交通省令で定める事項を記載した従業者名簿を備えなければならず、当該名簿を最終の記載をした日から5年間保存しなければならない。",
      "イ": "宅地建物取引業者は、一団の宅地の分譲を行う案内所において宅地の売買の契約の締結を行わない場合、その案内所には国土交通省令で定める標識を掲示しなくてもよい。",
      "ウ": "宅地建物取引業者が、一団の宅地の分譲を行う案内所において宅地の売買の契約の締結を行う場合、その案内所には国土交通大臣が定めた報酬の額を掲示しなければならない。",
      "エ": "宅地建物取引業者は、事務所以外の継続的に業務を行うことができる施設を有する場所であっても、契約（予約を含む。）を締結せず、かつ、その申込みを受けない場合、当該場所に専任の宅地建物取引士を置く必要はない。"
    },
    "answer": "エ",
    "explanation": "事務所以外に設ける一定の場所でも、契約の締結と申込みの受領の両方を行わなければ、専任取引士の設置を要しない。",
    "choiceExplanations": {
      "ア": "誤り。従業者名簿の保存期間は最終記載の日から10年であり、5年ではない（施行規則17条の2）。",
      "イ": "誤り。分譲案内所に標識を掲げる義務は、その案内所で契約を締結するかどうかでなくならない（50条）。",
      "ウ": "誤り。国土交通大臣が定めた報酬額の掲示義務は事務所について課される（46条4項）。",
      "エ": "正しい。事務所以外の施設でも、契約を締結し、又は申込みを受ける場所が専任取引士設置の対象となる（31条の3、施行規則15条の5の2）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=17",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q30",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 30,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業の広告規制"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者がその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア　宅地の販売広告において、宅地に対する将来の利用の制限について、著しく事実に相違する表示をしてはならない。\nイ　建物の貸借の媒介において広告を行った場合には、依頼者の依頼の有無にかかわらず、報酬の限度額を超えて、当該広告の料金に相当する額を受領することができる。\nウ　複数の区画がある宅地の売買について、数回に分けて広告するときは、最初に行う広告に取引態様の別を明示すれば足り、それ以降は明示する必要はない。\nエ　賃貸マンションの貸借に係る媒介の依頼を受け、媒介契約を締結した場合であっても、当該賃貸マンションが建築確認申請中であるときは広告をすることができない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "アとエの二つが正しい。将来の利用制限についての誇大な表示はできず、建築確認が済む前の広告にも制限がある。",
    "choiceExplanations": {
      "ア": "一つではない。アのとおり、宅地の将来の利用制限について事実と著しく異なる広告は禁じられる（32条）。",
      "イ": "二つが正解。エも正しい。建築確認を要する建物は確認が下りる前に貸借の広告を出せない（33条）。",
      "ウ": "三つではない。イの広告費を報酬と別に受け取れるのは、依頼者の特別な依頼による広告などに限られる。",
      "エ": "四つではない。ウの取引態様の明示は最初の広告だけでは足りず、広告をするたびに必要となる（34条1項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=18",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://www.mlit.go.jp/totikensangyo/const/content/001740864.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q31",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 31,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "保証協会の弁済業務"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "保証協会は、当該保証協会の社員である宅地建物取引業者が社員となる前に当該宅地建物取引業者と宅地建物取引業に関し取引をした者の有するその取引により生じた債権に関し弁済業務保証金の還付が行われることにより弁済業務の円滑な運営に支障を生ずるおそれがあると認めるときは、当該社員に対し、担保の提供を求めることができる。",
      "イ": "保証協会の社員である宅地建物取引業者は、取引の相手方から宅地建物取引業に係る取引に関する苦情について解決の申出が当該保証協会になされ、その解決のために当該保証協会から資料の提出の求めがあったときは、正当な理由がある場合でなければ、これを拒んではならない。",
      "ウ": "保証協会の社員である宅地建物取引業者は、当該宅地建物取引業者と宅地建物取引業に関し取引をした者の有するその取引により生じた債権に関し弁済業務保証金の還付がなされたときは、その日から2週間以内に還付充当金を保証協会に納付しなければならない。",
      "エ": "還付充当金の未納により保証協会の社員がその地位を失ったときは、保証協会は、直ちにその旨を当該社員であった宅地建物取引業者が免許を受けた国土交通大臣又は都道府県知事に報告しなければならない。"
    },
    "answer": "ウ",
    "explanation": "社員が還付充当金を納める期限は、保証協会からの納付通知を受けた日を基準に数える。還付があった日と、通知を受けた日が一致するとは限らない。",
    "choiceExplanations": {
      "ア": "正しい。加入前の取引が原因となる還付で弁済業務に支障のおそれがあるときは、保証協会が担保を求められる（64条の4第3項）。",
      "イ": "正しい。保証協会の苦情解決に必要な資料の提出は、正当な理由なく拒むことができない（64条の5）。",
      "ウ": "誤り。還付充当金は、還付の日からではなく納付すべき旨の通知を受けた日から2週間以内に納付する（64条の10）。",
      "エ": "正しい。還付充当金を納めず社員の地位を失った場合、保証協会は免許権者へ直ちに報告する（64条の4第2項・64条の10第3項）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=18",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q32",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 32,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅地の定義と免許"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。なお、いずれの場合も、その行為を業として営むものとする。",
    "choices": {
      "ア": "A社が、都市計画法に規定する用途地域外の土地であって、ソーラーパネルを設置するための土地の売買を媒介しようとする場合、免許は必要ない。",
      "イ": "B社が、土地区画整理事業の換地処分により取得した換地を住宅用地として分譲しようとする場合、免許は必要ない。",
      "ウ": "農業協同組合Cが、組合員が所有する宅地の売却の代理をする場合、免許は必要ない。",
      "エ": "D社が、地方公共団体が定住促進策としてその所有する土地について住宅を建築しようとする個人に売却する取引の媒介をしようとする場合、免許は必要ない。"
    },
    "answer": "ア",
    "explanation": "用途地域外で建物の敷地に使う予定のない土地は、宅建業法上の宅地に含まれない。宅建業の免許が必要かは、媒介の対象が宅建業法でいう宅地に当たるかを先に確認する。",
    "choiceExplanations": {
      "ア": "正しい。用途地域外でソーラーパネルの設置だけを目的とする土地は、この設問では建物の敷地に当たらず、売買の媒介に免許を要しない（2条）。",
      "イ": "誤り。換地処分で取得しても、住宅用地を業として分譲する行為には免許が必要となる。",
      "ウ": "誤り。組合員のために代理する農業協同組合にも、宅地の売却を業として代理する場合の免許が必要となる。",
      "エ": "誤り。地方公共団体は適用除外だが、地方公共団体の取引を媒介する民間業者には免許が必要となる（78条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=19",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q33",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 33,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "水害ハザードマップ"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第35条に規定する重要事項の説明における水防法施行規則第11条第1号の規定により市町村（特別区を含む。以下この問において同じ。）の長が提供する図面（以下この問において「水害ハザードマップ」という。）に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。",
    "choices": {
      "ア": "宅地建物取引業者は、市町村が、取引の対象となる宅地又は建物の位置を含む水害ハザードマップを作成せず、又は印刷物の配布若しくはホームページ等への掲載等をしていないことを確認できた場合は、重要事項説明書にその旨記載し、重要事項説明の際に提示すべき水害ハザードマップが存在しない旨を説明すればよい。",
      "イ": "宅地建物取引業者は、市町村が取引の対象となる宅地又は建物の位置を含む「洪水」、「雨水出水（内水）」、「高潮」の水害ハザードマップを作成している場合、重要事項説明の際にいずれか1種類の水害ハザードマップを提示すればよい。",
      "ウ": "宅地建物取引業者は、市町村が取引の対象となる宅地又は建物の位置を含む水害ハザードマップを作成している場合、売買又は交換の媒介のときは重要事項説明の際に水害ハザードマップを提示しなければならないが、貸借の媒介のときはその必要はない。",
      "エ": "宅地建物取引業者は、市町村が取引の対象となる宅地又は建物の位置を含む水害ハザードマップを作成している場合、重要事項説明書に水害ハザードマップを添付すれば足りる。"
    },
    "answer": "ア",
    "explanation": "対象物件を含む市町村の地図が公表されている場合は、その地図を使って所在地を示す。提示できる地図がなければ、その旨を説明する。",
    "choiceExplanations": {
      "ア": "正しい。公表された該当図面がないことを確認した場合は、その旨を重要事項説明書に記載して説明する。",
      "イ": "誤り。洪水、雨水出水（内水）、高潮のうち公表されている該当図面をそれぞれ提示する。",
      "ウ": "誤り。貸借の媒介でも説明対象となる。売買・交換の媒介に限った制度ではない。",
      "エ": "誤り。図面を添付するだけでは足りず、その図面のどこに物件があるかを示して説明する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=19",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098",
      "https://laws.e-gov.go.jp/law/412M50004000044/412M50004000044_20210101_502M60000800098",
      "https://www.mlit.go.jp/report/press/totikensangyo16_hh_000205.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q34",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 34,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "営業保証金"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法の規定に基づく営業保証金に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "国土交通大臣から免許を受けた宅地建物取引業者が、営業保証金を主たる事務所のもよりの供託所に供託した場合、当該供託所から国土交通大臣にその旨が通知されるため、当該宅地建物取引業者は国土交通大臣にその旨を届け出る必要はない。",
      "イ": "宅地建物取引業者と宅地建物取引業に関し取引をした者は、その取引により生じた債権に関し、当該宅地建物取引業者が供託した営業保証金について、その債権の弁済を受ける権利を有するが、取引をした者が宅地建物取引業者に該当する場合は、その権利を有しない。",
      "ウ": "営業保証金は、金銭による供託のほか、有価証券をもって供託することができるが、金銭と有価証券とを併用して供託することはできない。",
      "エ": "有価証券を営業保証金に充てる場合における当該有価証券の価額は、国債証券の場合はその額面金額の100分の90、地方債証券の場合はその額面金額の100分の80である。"
    },
    "answer": "イ",
    "explanation": "営業保証金から弁済を受けられる取引相手からは、宅地建物取引業者が除かれる。弁済を受けられるのは、宅建業に関する取引で生じた債権について、供託された営業保証金の範囲内である。",
    "choiceExplanations": {
      "ア": "誤り。営業保証金を供託した業者自身が免許権者に届け出る。供託しただけで事業を開始することはできない（25条）。",
      "イ": "正しい。取引により生じた債権は営業保証金による弁済の対象となるが、債権者が宅建業者である場合は対象外となる（27条）。",
      "ウ": "誤り。金銭と、供託に使用できる有価証券を組み合わせて供託することもできる（25条3項）。",
      "エ": "誤り。評価額は国債証券が額面の100%、地方債証券が90%である（営業保証金規則3条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=20",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004010001?occasion_date=20210401"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q35",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 35,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅地建物取引士証と変更登録"
    ],
    "difficulty": 3,
    "question": "宅地建物取引士の登録（以下この問において「登録」という。）及び宅地建物取引士証に関する次の記述のうち、正しいものはいくつあるか。\n\nア　宅地建物取引士（甲県知事登録）が事務禁止処分を受けた場合、宅地建物取引士証を甲県知事に速やかに提出しなければならず、速やかに提出しなかったときは10万円以下の過料に処せられることがある。\nイ　宅地建物取引士（甲県知事登録）が宅地建物取引士としての事務禁止処分を受け、その禁止の期間中に本人の申請により登録が消除された場合は、その者が乙県で宅地建物取引士資格試験に合格したとしても、当該期間が満了していないときは、乙県知事の登録を受けることができない。\nウ　宅地建物取引士（甲県知事登録）が甲県から乙県に住所を変更したときは、乙県知事に対し、登録の移転の申請をすることができる。\nエ　宅地建物取引士（甲県知事登録）が本籍を変更した場合、遅滞なく、甲県知事に変更の登録を申請しなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ウ",
    "explanation": "ア・イ・エの三つが正しい。住所変更に伴う変更登録と、他の都道府県への登録の移転は別の手続である。移転は事務所の業務に従事する都道府県が変わる場合などに申請できる。",
    "choiceExplanations": {
      "ア": "一つではない。アは正しい。事務禁止処分を受けた取引士は取引士証を速やかに提出し、不提出には10万円以下の過料の規定がある（22条の2・86条）。",
      "イ": "二つではない。イも正しい。本人が登録消除を申請しても、禁止期間中は他県で試験に合格しただけでは登録できない（18条）。",
      "ウ": "三つが正解。エの本籍変更は変更登録の対象であり、遅滞なく登録先の知事に申請する（20条）。",
      "エ": "四つではない。ウは住所を変えただけでは登録の移転を申請できない。他県の宅建業者の事務所で従事することなどが必要となる（19条の2）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=20",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q36",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 36,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "貸借の重要事項説明"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、同法の規定に少なくとも説明しなければならない事項として掲げられていないものはどれか。",
    "choices": {
      "ア": "建物の貸借の媒介を行う場合における、「都市計画法第29条第1項の規定に基づく制限」",
      "イ": "建物の貸借の媒介を行う場合における、「当該建物について、石綿の使用の有無の調査の結果が記録されているときは、その内容」",
      "ウ": "建物の貸借の媒介を行う場合における、「台所、浴室、便所その他の当該建物の設備の整備の状況」",
      "エ": "宅地の貸借の媒介を行う場合における、「敷金その他いかなる名義をもって授受されるかを問わず、契約終了時において精算することとされている金銭の精算に関する事項」"
    },
    "answer": "ア",
    "explanation": "建物の貸借を媒介する場合、都市計画法29条1項の開発許可に関する制限は法定の説明事項に含まれない。一方、石綿調査の記録があるときは、その内容を建物の貸借でも説明する。",
    "choiceExplanations": {
      "ア": "掲げられていない。法令上の制限のうち貸借で説明する範囲は限られ、建物の貸借ではこの開発許可の制限は対象外となる（施行令3条）。",
      "イ": "掲げられている。石綿使用の有無について調査結果の記録があるときは、その内容を説明する（施行規則16条の4の3）。",
      "ウ": "掲げられている。台所・浴室・便所などの設備の整備状況は建物の貸借で説明する（施行規則16条の4の3）。",
      "エ": "掲げられている。契約終了時に清算する敷金等については、名目を問わず清算に関する事項を宅地の貸借でも説明する（施行規則16条の4の3）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=21",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/339CO0000000383/339CO0000000383_20201201_502CO0000000217",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q37",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 37,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "35条書面と37条書面"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第35条の規定に基づく重要事項の説明及び同法第37条の規定により交付すべき書面（以下この問において「37条書面」という。）に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者は、媒介により区分所有建物の賃貸借契約を成立させた場合、専有部分の用途その他の利用の制限に関する規約においてペットの飼育が禁止されているときは、その旨を重要事項説明書に記載して説明し、37条書面にも記載しなければならない。",
      "イ": "宅地建物取引業者は、自ら売主となる土地付建物の売買契約において、宅地建物取引業者ではない買主から保全措置を講ずる必要のない金額の手付金を受領する場合、手付金の保全措置を講じないことを、重要事項説明書に記載して説明し、37条書面にも記載しなければならない。",
      "ウ": "宅地建物取引業者は、媒介により建物の敷地に供せられる土地の売買契約を成立させた場合において、当該売買代金以外の金銭の授受に関する定めがあるときは、その額並びに当該金銭の授受の時期及び目的を37条書面に記載しなければならない。",
      "エ": "宅地建物取引業者は、自ら売主となる土地付建物の売買契約及び自ら貸主となる土地付建物の賃貸借契約のいずれにおいても、37条書面を作成し、その取引の相手方に交付しなければならない。"
    },
    "answer": "ウ",
    "explanation": "代金以外の金銭を授受する取り決めがあれば、契約成立後の37条書面にその額・時期・目的を記載する。契約前の35条の説明では、この金銭について額と目的を示す。",
    "choiceExplanations": {
      "ア": "誤り。専有部分の利用を制限するペット飼育禁止は重要事項だが、37条書面への法定記載事項ではない。",
      "イ": "誤り。手付金の保全措置の説明は重要事項説明の対象であり、保全措置を講じない旨は37条書面の法定記載事項ではない。",
      "ウ": "正しい。契約で売買代金以外の金銭の授受を定めたときは、額、いつ授受するか、その目的を37条書面に記載する（37条1項6号）。",
      "エ": "誤り。自ら貸主となる取引は宅建業の定義に含まれず、37条書面の交付義務はない（2条・37条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=21",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q38",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 38,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "一般媒介契約"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、宅地建物取引業者BからB所有の建物の売却を依頼され、Bと一般媒介契約（以下この問において「本件契約」という。）を締結した場合に関する次の記述のうち、宅地建物取引業法の規定に違反しないものはいくつあるか。\n\nア　本件契約を締結する際に、Bから有効期間を6か月としたい旨の申出があったが、AとBが協議して、有効期間を3か月とした。\nイ　当該物件に係る買受けの申込みはなかったが、AはBに対し本件契約に係る業務の処理状況の報告を口頭により14日に1回以上の頻度で行った。\nウ　Aは本件契約を締結した後、所定の事項を遅滞なく指定流通機構に登録したが、その登録を証する書面を、登録してから14日後にBに交付した。\nエ　本件契約締結後、1年を経過しても当該物件を売却できなかったため、Bは売却をあきらめ、当該物件を賃貸することにした。そこでBはAと当該物件の貸借に係る一般媒介契約を締結したが、当該契約の有効期間を定めなかった。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "エ",
    "explanation": "四つとも違反しない。期間、業務報告、指定流通機構への登録について、専任媒介の規制を一般媒介にそのまま適用しない。",
    "choiceExplanations": {
      "ア": "違反しないものが一つではない。アの一般媒介に専任媒介のような有効期間の法定上限はなく、3か月の合意もできる。",
      "イ": "違反しないものが二つではない。イの一般媒介に専任媒介と同じ定期報告義務はなく、任意に口頭で報告できる。",
      "ウ": "違反しないものが三つではない。ウの一般媒介で任意登録した場合には、専任媒介に課される登録証明書の遅滞ない交付義務は適用されない。",
      "エ": "四つが正解。エの建物の貸借に係る一般媒介には、売買・交換の媒介に関する34条の2の規定が適用されず、期間を定めなくてもよい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=22",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q39",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 39,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法のクーリング・オフ"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、自ら売主として、宅地建物取引業者Bの媒介により、宅地建物取引業者ではないCを買主とするマンションの売買契約を締結した場合における宅地建物取引業法第37条の2の規定に基づくいわゆるクーリング・オフについて告げるときに交付すべき書面（以下この問において「告知書面」という。）に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "告知書面には、クーリング・オフによる買受けの申込みの撤回又は売買契約の解除があったときは、Aは、その買受けの申込みの撤回又は売買契約の解除に伴う損害賠償又は違約金の支払を請求することができないことを記載しなければならない。",
      "イ": "告知書面には、クーリング・オフについて告げられた日から起算して8日を経過するまでの間は、Cが当該マンションの引渡しを受け又は代金の全部を支払った場合を除き、書面によりクーリング・オフによる買受けの申込みの撤回又は売買契約の解除を行うことができることを記載しなければならない。",
      "ウ": "告知書面には、Cがクーリング・オフによる売買契約の解除をするときは、その旨を記載した書面がAに到達した時点で、その効力が発生することを記載しなければならない。",
      "エ": "告知書面には、A及びBの商号又は名称及び住所並びに免許証番号を記載しなければならない。"
    },
    "answer": "ア",
    "explanation": "適法なクーリング・オフがあったとき、売主は損害賠償や違約金を求められない。このことを告知書面に記載する。",
    "choiceExplanations": {
      "ア": "正しい。損害賠償・違約金を請求できない旨は、売主が交付するクーリング・オフの告知書面の記載事項である（37条の2、施行規則16条の6）。",
      "イ": "誤り。8日を経過する前に除外されるのは、物件の引渡しを受け、かつ代金全額を支払った場合である。",
      "ウ": "誤り。撤回・解除の効力は書面を発した時点で生じ、売主への到達を待つ必要はない（37条の2第2項）。",
      "エ": "誤り。商号又は名称・住所・免許証番号を記載する対象は売主Aであり、媒介業者Bの分までは求められない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=22",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q40",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 40,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業者の帳簿・標識・守秘"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者は、その業務に関する帳簿を備え、取引のあったつど、その年月日、その取引に係る宅地又は建物の所在及び面積その他国土交通省令で定める事項を記載しなければならないが、支店及び案内所には備え付ける必要はない。",
      "イ": "成年である宅地建物取引業者は、宅地建物取引業の業務に関し行った行為について、行為能力の制限を理由に取り消すことができる。",
      "ウ": "宅地建物取引業者は、一団の宅地建物の分譲をする場合における当該宅地又は建物の所在する場所に国土交通省令で定める標識を掲示しなければならない。",
      "エ": "宅地建物取引業者は、業務上取り扱ったことについて知り得た秘密に関し、税務署の職員から質問検査権の規定に基づき質問を受けたときであっても、回答してはならない。"
    },
    "answer": "ウ",
    "explanation": "一団の宅地・建物を分譲するときは、その物件の所在地に所定の標識を掲げる。案内所の有無やそこで契約をするかにかかわらず、分譲物件の所在地も掲示の対象となる。",
    "choiceExplanations": {
      "ア": "誤り。業務に関する帳簿は事務所ごとに備える。支店が事務所であれば、支店にも備える必要がある（49条）。",
      "イ": "誤り。成年の宅建業者は、その業務に関する取引を行為能力の制限を理由として取り消すことができない（47条の3）。",
      "ウ": "正しい。分譲する一団の宅地・建物の所在地は、法令により標識を掲示する場所に含まれる（50条、施行規則19条）。",
      "エ": "誤り。法令に基づく質問検査に答えることには正当な理由があり、守秘義務に反しない（45条）。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=23",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q41",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 41,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "37条書面の交付と記載"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが行う業務に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。なお、この問において「37条書面」とは、同法第37条の規定により交付すべき書面をいうものとする。\n\nア　Aが自ら売主として建物を売却する場合、宅地建物取引業者Bに当該売却の媒介を依頼したときは、Bは宅地建物取引士をして37条書面に記名押印させなければならず、Aも宅地建物取引士をして37条書面に記名押印させなければならない。\nイ　Aが自ら売主として建物を売却する場合、当該売買契約に際し、買主から支払われる手付金の額が売買代金の5%未満であるときは、当該手付金の額の記載があれば、授受の時期については37条書面に記載しなくてもよい。\nウ　Aが売主を代理して建物を売却する場合、買主が宅地建物取引業者であるときは、37条書面を交付しなくてもよい。\nエ　Aが売主を代理して抵当権が設定されている建物を売却する場合、当該抵当権の内容について37条書面に記載しなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ア",
    "explanation": "正しいのはアだけ。出題時の法令では、売主と媒介業者がいずれも宅建業者の場合、双方で宅建士による記名押印が必要だった。",
    "choiceExplanations": {
      "ア": "一つが正解。アのA・Bの双方に37条書面の交付に関する義務があり、各業者の取引士が記名押印する（出題時の37条）。",
      "イ": "二つではない。イの手付金は売買代金以外の金銭であり、5%未満でも授受の時期を記載する。",
      "ウ": "三つではない。ウの相手方が宅建業者でも、37条書面の交付は省略できない。",
      "エ": "四つではない。エの抵当権の内容は重要事項説明の対象となるが、37条書面の法定記載事項には含まれない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=23",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q42",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 42,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "手付金等の保全と割賦販売"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではないBを買主とする土地付建物の売買契約（代金3,200万円）を締結する場合に関する次の記述のうち、民法及び宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "割賦販売の契約を締結し、当該土地付建物を引き渡した場合、Aは、Bから800万円の賦払金の支払を受けるまでに、当該土地付建物に係る所有権の移転登記をしなければならない。",
      "イ": "当該土地付建物の工事の完了前に契約を締結した場合、Aは、宅地建物取引業法第41条に定める手付金等の保全措置を講じなくても手付金100万円、中間金60万円を受領することができる。",
      "ウ": "当事者の債務の不履行を理由とする契約の解除に伴う損害賠償の予定額を400万円とし、かつ、違約金の額を240万円とする特約を定めた場合、当該特約は無効となる。",
      "エ": "当事者の債務の不履行を理由とする契約の解除に伴う損害賠償の予定額を定めていない場合、債務の不履行による損害賠償の請求額は売買代金の額の10分の2を超えてはならない。"
    },
    "answer": "イ",
    "explanation": "工事完了前でも、手付金等の合計が代金の5%以下かつ1,000万円以下なら、保全措置を講じずに受領できる。",
    "choiceExplanations": {
      "ア": "誤り。所有権留保が制限される原則の基準は代金の3割を超える額である。800万円は3,200万円の25%にとどまる（43条）。",
      "イ": "正しい。手付金100万円と中間金60万円の合計160万円は代金のちょうど5%で、1,000万円以下でもある（41条）。",
      "ウ": "誤り。400万円と240万円の合計640万円は代金のちょうど20%で、上限を超えない（38条）。",
      "エ": "誤り。20%の制限は損害賠償の予定額と違約金を定める場合の規制で、予定額を定めず実損害を請求する場合の上限ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=24",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/129AC0000000089/129AC0000000089_20200401_501AC0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q43",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 43,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "勧誘・申込み時の禁止行為"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者の業務に関する次の記述のうち、宅地建物取引業法の規定に違反するものはいくつあるか。\n\nア　マンションの販売に際して、買主が手付として必要な額を持ち合わせていなかったため、手付を分割受領することにより、契約の締結を誘引した。\nイ　宅地の売買に際して、相手方が「契約の締結をするかどうか明日まで考えさせてほしい」と申し出たのに対し、事実を歪めて「明日では契約締結できなくなるので、今日しか待てない」と告げた。\nウ　マンション販売の勧誘を電話で行った際に、勧誘に先立って電話口で宅地建物取引業者の商号又は名称を名乗らずに勧誘を行った。\nエ　建物の貸借の媒介に際して、賃貸借契約の申込みをした者がその撤回を申し出たが、物件案内等に経費がかかったため、預り金を返還しなかった。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "エ",
    "explanation": "アからエまでの四つが違反する。手付の分割による誘引、事実を曲げた告知、名乗らない勧誘、預り金の返還拒否が問われている。",
    "choiceExplanations": {
      "ア": "一つではない。アのように手付を分割で受け取ると約束して契約を誘うことは、手付の信用供与による誘引に当たる（47条3号）。",
      "イ": "二つではない。イのように判断に必要な時間を与えず、事実を曲げて契約を急がせる行為も禁じられる。",
      "ウ": "三つではない。ウのように勧誘に先立って商号又は名称を明らかにしない行為も禁じられる（施行規則16条の12）。",
      "エ": "四つが正解。エのように申込みが撤回された際、案内等の費用を理由に預り金の返還を拒む行為も禁じられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=24",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://laws.e-gov.go.jp/law/332M50004000012/332M50004000012_20210101_502M60000800098"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q44",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 44,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "媒介・代理の報酬上限"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者A（消費税課税事業者）が受け取ることができる報酬額についての次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "居住の用に供する建物（1か月の借賃20万円。消費税等相当額を含まない。）の貸借であって100万円の権利金の授受があるものの媒介をする場合、依頼者双方から受領する報酬の合計額は11万円を超えてはならない。",
      "イ": "宅地（代金1,000万円。消費税等相当額を含まない。）の売買について、売主から代理の依頼を受け、買主から媒介の依頼を受け、売買契約を成立させて買主から303,000円の報酬を受領する場合、売主からは489,000円を上限として報酬を受領することができる。",
      "ウ": "宅地（代金300万円。消費税等相当額を含まない。）の売買の媒介について、通常の媒介と比較して現地調査等の費用が6万円（消費税等相当額を含まない。）多く要した場合、依頼者双方から合計で44万円を上限として報酬を受領することができる。",
      "エ": "店舗兼住宅（1か月の借賃20万円。消費税等相当額を含まない。）の貸借の媒介をする場合、依頼者の一方から受領する報酬は11万円を超えてはならない。"
    },
    "answer": "イ",
    "explanation": "1,000万円の売買の媒介報酬上限は一方につき税込39万6,000円。代理報酬と買主からの媒介報酬を合わせた上限は税込79万2,000円となる。",
    "choiceExplanations": {
      "ア": "誤り。居住用建物の貸借では権利金を売買代金とみなす特例は使わない。双方から受領する合計の上限は借賃1か月分の税込22万円。",
      "イ": "正しい。（1,000万円×3%＋6万円）×1.1×2から買主の30万3,000円を引くと、売主からは48万9,000円まで受領できる。",
      "ウ": "誤り。出題時の低廉な空家等の特例は売主側にのみ適用でき、売主側の上限は税込19万8,000円、買主側の上限は税込15万4,000円である。",
      "エ": "誤り。店舗兼住宅の貸借では居住用建物に対する片側0.5か月分の制限は適用されず、双方の合計が税込22万円以内なら一方から11万円を超えて受け取れる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=25",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/327AC1000000176/327AC1000000176_20200612_502AC0000000050",
      "https://www.mlit.go.jp/totikensangyo/const/content/001740864.pdf",
      "https://www.mlit.go.jp/policy/shingikai/content/001965126.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q45",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 45,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "住宅販売瑕疵担保責任"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではない買主Bに新築住宅を販売する場合における次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Bが建設業者である場合、Aは、Bに引き渡した新築住宅について、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負わない。",
      "イ": "Aが住宅販売瑕疵担保責任保険契約を締結する場合、当該契約は、BがAから当該新築住宅の引渡しを受けた時から2年以上の期間にわたって有効なものでなければならない。",
      "ウ": "Aが住宅販売瑕疵担保責任保険契約を締結した場合、A及びBは、指定住宅紛争処理機関に特別住宅紛争処理の申請をすることにより、当該新築住宅の瑕疵に関するAとBとの間の紛争について、あっせん、調停又は仲裁を受けることができる。",
      "エ": "AB間の新築住宅の売買契約において、当該新築住宅の構造耐力上主要な部分に瑕疵があってもAが瑕疵担保責任を負わない旨の特約があった場合、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務はない。"
    },
    "answer": "ウ",
    "explanation": "保険付き住宅の瑕疵の紛争では、申請により指定住宅紛争処理機関のあっせん、調停又は仲裁を利用できる。保険の対象となる住宅について、購入者だけでなく売主も手続を利用できる。",
    "choiceExplanations": {
      "ア": "誤り。買主が建設業者でも宅建業者でなければ、販売した宅建業者には供託又は保険による資力確保が必要となる。",
      "イ": "誤り。引渡しから10年以上有効であることが保険契約の要件であり、2年では足りない（2条）。",
      "ウ": "正しい。住宅の瑕疵をめぐる売主と買主の紛争を、指定住宅紛争処理機関への申請によって解決できる（33条）。",
      "エ": "誤り。新築住宅の構造耐力上主要な部分について売主の責任を免除する買主に不利な特約は無効であり、資力確保の義務も免れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=25",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/419AC0000000066/419AC0000000066_20200401_429AC0000000045",
      "https://laws.e-gov.go.jp/law/411AC0000000081/411AC0000000081_20200401_429AC0000000045"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q46",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 46,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "住宅金融支援機構"
    ],
    "difficulty": 3,
    "question": "独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "機構は、証券化支援事業（買取型）において、賃貸住宅の購入に必要な資金の貸付けに係る金融機関の貸付債権を譲受けの対象としている。",
      "イ": "機構は、市街地の土地の合理的な利用に寄与する一定の建築物の建設に必要な資金の貸付けを業務として行っている。",
      "ウ": "機構は、証券化支援事業（買取型）において、省エネルギー性に優れた住宅を取得する場合について、貸付金の利率を一定期間引き下げる制度を設けている。",
      "エ": "機構は、経済事情の変動に伴い、貸付けを受けた者の住宅ローンの元利金の支払が著しく困難になった場合に、償還期間の延長等の貸付条件の変更を行っている。"
    },
    "answer": "ア",
    "explanation": "証券化支援業務の買取型では、金融機関が実行した本人等が居住するための住宅ローン債権を買い取る。賃貸住宅を購入するための借入れを、長期固定金利の住宅ローン債権と区別する。",
    "choiceExplanations": {
      "ア": "誤り。賃貸住宅の購入資金に係る貸付債権は、自己居住用等の住宅ローンを対象とした買取型の対象外となる。",
      "イ": "正しい。機構は、市街地の土地の合理的な利用に寄与する一定の建築物の建設に必要な資金を貸し付ける（13条）。",
      "ウ": "正しい。省エネルギー性などが一定の水準を満たす住宅には、フラット35Sによる一定期間の金利引下げがある。",
      "エ": "正しい。経済事情の変動で返済が著しく困難になった場合には、返済期間の延長などの条件変更を行う制度がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=26",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/417AC0000000082/417AC0000000082_20180831_430AC0000000040",
      "https://www.jhf.go.jp/about/financial/join/outline_kaitori.html?print=true",
      "https://www.flat35.com/files/topics/6172_ext_99_4.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q47",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 47,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "不動産広告の表示規約"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "住宅の居室の広さを畳数で表示する場合には、畳1枚当たりの広さにかかわらず、実際に当該居室に敷かれている畳の数を表示しなければならない。",
      "イ": "団地（一団の宅地又は建物をいう。）と駅との間の距離は、駅から最も近い当該団地内の地点を起点又は着点として算出した数値を表示しなければならず、当該団地を数区に区分して取引するときは各区分ごとに距離を算出して表示しなければならない。",
      "ウ": "新築分譲マンションを完成予想図により表示する場合、完成予想図である旨を表示すれば、緑豊かな環境であることを訴求するために周囲に存在しない公園等を表示することができる。",
      "エ": "新築分譲住宅の販売に当たって行う二重価格表示は、実際に過去において販売価格として公表していた価格を比較対照価格として用いて行うのであれば、値下げの時期から1年以内の期間は表示することができる。"
    },
    "answer": "イ",
    "explanation": "試験時点の規則では、団地を区分して取引するときは駅までの距離を各区分について算出して表示していた。この問題は出題当時の表示規約施行規則に基づく。",
    "choiceExplanations": {
      "ア": "誤り。畳数で広さを表示するときは、畳1枚当たり1.62m²以上に相当する広さを基準にする。敷いてある現物の枚数だけで決めない。",
      "イ": "正しい。試験時点の距離表示は駅に最も近い団地内の地点で算出し、複数の区分で取引する場合は区分ごとに算出していた。",
      "ウ": "誤り。完成予想図である旨を付記しても、存在しない周辺施設を描いて実際の環境であるかのように示せない。",
      "エ": "誤り。値下げ前の価格を用いる二重価格表示は、値下げ後6か月以内などの条件があり、1年間は表示できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=26",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/337AC0000000134/337AC0000000134_20191216_501AC0000000016",
      "https://www.rftc.jp/webkanri/kanri/wp-content/uploads/2021/10/20211022_hyoujikiyaku-kaiseian.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q48",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 48,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "住宅着工・土地取引・地価の統計"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "建築着工統計（令和3年1月公表）によれば、令和2年1月から令和2年12月までの新設住宅着工戸数は約81.5万戸となり、4年ぶりに増加に転じた。",
      "イ": "令和3年版土地白書（令和3年6月公表）によれば、土地取引について、売買による所有権移転登記の件数でその動向を見ると、令和2年の全国の土地取引件数は約128万件となり、5年連続の増加となっている。",
      "ウ": "令和3年地価公示（令和3年3月公表）によれば、令和2年1月以降の1年間の地価の変動を見ると、全国平均の用途別では、住宅地及び商業地は下落に転じたが、工業地は5年連続の上昇となっている。",
      "エ": "年次別法人企業統計調査（令和元年度。令和2年10月公表）によれば、令和元年度における不動産業の営業利益は約5兆円を超え、前年度を上回った。"
    },
    "answer": "ウ",
    "explanation": "令和3年地価公示では全国の住宅地と商業地が下落に転じた一方、工業地は5年連続で上昇した。住宅着工、土地取引、地価、営業利益は、資料ごとの対象年と増減の方向を個別に確認する。",
    "choiceExplanations": {
      "ア": "誤り。令和2年の新設住宅着工は約81.5万戸だが、前年から減少しており、増加への転換ではない。",
      "イ": "誤り。全国の土地取引は約128万件で、土地白書ではほぼ横ばいとされる。5年連続の増加ではない。",
      "ウ": "正しい。全国平均を用途別に見ると、住宅地と商業地は下落に転じ、工業地は上昇率が縮小しながらも上昇が5年続いた。",
      "エ": "誤り。不動産業の営業利益は4兆2,621億円で、前年度の5兆1,563億円を下回った。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=27",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/report/press/joho04_hh_000960.html",
      "https://www.mlit.go.jp/report/press/content/001408318.pdf",
      "https://www.mlit.go.jp/totikensangyo/content/001419079.pdf",
      "https://www.mof.go.jp/pri/reference/ssc/results/r1.pdf#page=4"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q49",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 49,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "地形と土砂災害"
    ],
    "difficulty": 3,
    "question": "土地に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "森林は、木材資源としても重要で、水源涵養、洪水防止等の大きな役割を担っている。",
      "イ": "活動度の高い火山の火山麓では、火山活動に伴う災害にも留意する必要がある。",
      "ウ": "林相は良好でも、破砕帯や崖錐等の上の杉の植林地は、豪雨に際して崩壊することがある。",
      "エ": "崖錐や小河川の出口で堆積物の多い所等は、土石流の危険が少ない。"
    },
    "answer": "エ",
    "explanation": "谷や小河川の出口など、土砂が堆積してできた地形では、大雨による土石流や土砂の堆積に注意する。樹木の生育状況が良好でも、土地に土砂が集まりやすい構造や履歴がある場合は注意が必要となる。",
    "choiceExplanations": {
      "ア": "適当。森林の土壌は降水を蓄え、河川に流れる水の量を平準化して洪水を緩和する。",
      "イ": "適当。活動の盛んな火山の麓では、火山泥流などが斜面を下ってくる可能性を考慮する必要がある。",
      "ウ": "適当。林の状態が良くても、岩が砕けた破砕帯や斜面下の崖錐のような地形では、豪雨で地盤が崩れることがある。",
      "エ": "不適当。崖錐や渓流出口の堆積物は、過去に土砂が運ばれたことを示す。こうした場所では土石流の危険がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=27",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://www.rinya.maff.go.jp/j/keikaku/tamenteki/con_2_4.html",
      "https://www.mlit.go.jp/kokudokeikaku/iten/information/council/shuto-research/kazan_kentou/c_kazan25.html",
      "https://nlftp.mlit.go.jp/kokjo/inspect/landclassification/land/land_history_2011/mapdata/574036/574036_REF.pdf",
      "https://www.gsi.go.jp/bousaichiri/bousaichiri41051.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  },
  {
    "id": "takken-2021-october-gakka-q50",
    "exam": "takken",
    "session": "gakka",
    "year": 2021,
    "season": "october",
    "qNumber": 50,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "鉄骨構造"
    ],
    "difficulty": 3,
    "question": "建物の構造に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄骨構造は、主要構造の構造形式にトラス、ラーメン、アーチ等が用いられ、高層建築の骨組に適している。",
      "イ": "鉄骨構造の床は既製気泡コンクリート板、プレキャストコンクリート板等でつくられる。",
      "ウ": "鉄骨構造は、耐火被覆や鋼材の加工性の問題があり、現在は住宅、店舗等の建物には用いられていない。",
      "エ": "鉄骨構造は、工場、体育館、倉庫等の単層で大空間の建物に利用されている。"
    },
    "answer": "ウ",
    "explanation": "鉄骨構造は高層建築や大空間だけでなく、住宅や店舗にも使われる。防耐火の要件に対応して設計する。住宅着工統計でも住宅の構造として鉄骨造が集計されている。",
    "choiceExplanations": {
      "ア": "適当。鉄骨の柱・梁などは軸組をつくりやすく、トラス、ラーメン、アーチといった骨組に利用される。",
      "イ": "適当。鉄骨の骨組に既製気泡コンクリート板やプレキャストコンクリート板を架ける床のつくり方がある。",
      "ウ": "不適当。鉄骨造は住宅にも用いられる。必要に応じて耐火被覆などを行い、用途に応じた性能を確保する。",
      "エ": "適当。鉄骨を使うと柱の間を広く取りやすく、工場、体育館、倉庫の大空間の骨組にも利用される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-question.pdf#page=27",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R3-answer.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和3年度宅地建物取引士資格試験（10月実施）。選択肢の番号と紙面の体裁をWeb表示向けに整えています。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338/325CO0000000338_20200907_502CO0000000268",
      "https://www.mlit.go.jp/toukeijouhou/chojou/gaiyou/gai_kent.htm"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-18",
    "lawReferenceDate": "2021-04-01"
  }
];
