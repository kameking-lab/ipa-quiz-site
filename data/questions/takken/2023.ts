import type { Question } from "@/lib/questions/types";

// RETIO official paper and answer table; provenance: 2023-source.json.
export const TAKKEN_2023_QUESTIONS: Question[] = [
  {
    "id": "takken-2023-october-gakka-q1",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 1,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "遺産分割と賃料債権"
    ],
    "difficulty": 3,
    "question": "次の1 から4 までの記述のうち、民法の規定、判例及び下記判決文によれば、誤っているものはどれか。\n（判決文）遺産は、相続人が数人あるときは、相続開始から遺産分割までの間、共同相続人の共有に属するものであるから、この間に遺産である賃貸不動産を使用管理した結果生ずる金銭債権たる賃料債権は、遺産とは別個の財産というべきであって、各共同相続人がその相続分に応じて分割単独債権として確定的に取得するものと解するのが相当である。",
    "choices": {
      "ア": "遺産である不動産から、相続開始から遺産分割までの間に生じた賃料債権は、遺産である不動産が遺産分割によって複数の相続人のうちの一人に帰属することとなった場合、当該不動産が帰属することになった相続人が相続開始時にさかのぼって取得する。",
      "イ": "相続人が数人あるときは、相続財産は、その共有に属し、各共同相続人は、その相続分に応じて被相続人の権利義務を承継する。",
      "ウ": "遺産分割の効力は、相続開始の時にさかのぼって生ずる。ただし、第三者の権利を害することはできない。",
      "エ": "遺産である不動産が遺産分割によって複数の相続人のうちの一人に帰属することとなった場合、当該不動産から遺産分割後に生じた賃料債権は、遺産分割によって当該不動産が帰属した相続人が取得する。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。誤り。判決文が示すとおり、分割前に発生した賃料は各相続人が相続分に応じて取得する。後の遺産分割で不動産の帰属が決まっても、既に取得した賃料の帰属は変わらない。",
    "choiceExplanations": {
      "ア": "誤り。判決文が示すとおり、分割前に発生した賃料は各相続人が相続分に応じて取得する。後の遺産分割で不動産の帰属が決まっても、既に取得した賃料の帰属は変わらない。",
      "イ": "正しい。共同相続の遺産は相続人の共有となり、各人が相続分に応じて権利義務を承継する。民法898条・899条。",
      "ウ": "正しい。遺産分割は相続開始時に遡るが、第三者の権利を害することはできない。民法909条。",
      "エ": "正しい。分割後の賃料は、その時点で不動産を取得している相続人に帰属する。分割前に生じた賃料と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q2",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 2,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "相隣関係"
    ],
    "difficulty": 3,
    "question": "相隣関係に関する次の記述のうち、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "土地の所有者は、境界標の調査又は境界に関する測量等の一定の目的のために必要な範囲内で隣地を使用することができる場合であっても、住家については、その家の居住者の承諾がなければ、当該住家に立ち入ることはできない。",
      "イ": "土地の所有者は、隣地の竹木の枝が境界線を越える場合、その竹木の所有者にその枝を切除させることができるが、その枝を切除するよう催告したにもかかわらず相当の期間内に切除しなかったときであっても、自らその枝を切り取ることはできない。",
      "ウ": "相隣者の一人は、相隣者間で共有する障壁の高さを増すときは、他方の相隣者の承諾を得なければならない。",
      "エ": "他の土地に囲まれて公道に通じない土地の所有者は、公道に出るためにその土地を囲んでいる他の土地を自由に選んで通行することができる。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。正しい。測量等のための隣地使用が認められる場合でも、住家への立入りには居住者の承諾が必要である。民法209条1項ただし書。",
    "choiceExplanations": {
      "ア": "正しい。測量等のための隣地使用が認められる場合でも、住家への立入りには居住者の承諾が必要である。民法209条1項ただし書。",
      "イ": "誤り。枝の切除を催告しても相当期間内に切除されない場合、越境された土地の所有者が自ら枝を切り取ることができる。民法233条3項。",
      "ウ": "誤り。共有の障壁は、工事費用を自ら負担して高くできる。通常の工事で障壁が耐えられない場合は、自己の費用で改築する。民法231条。",
      "エ": "誤り。通行の場所・方法は必要な範囲で、他の土地への損害が最も少ないものを選ぶ。自由に選べるものではない。民法211条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q3",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 3,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "請負の契約不適合責任"
    ],
    "difficulty": 3,
    "question": "Ａを注文者、Ｂを請負人として、Ａ所有の建物に対して独立性を有さずその構成部分となる増築部分の工事請負契約を締結し、Ｂは3 か月間で増築工事を終了させた。この場合に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。なお、この問において「契約不適合」とは品質に関して契約の内容に適合しないことをいい、当該請負契約には契約不適合責任に関する特約は定められていなかったものとする。",
    "choices": {
      "ア": "ＡがＢに請負代金を支払っていなくても、Ａは増築部分の所有権を取得する。",
      "イ": "Ｂが材料を提供して増築した部分に契約不適合がある場合、Ａは工事が終了した日から1 年以内にその旨をＢに通知しなければ、契約不適合を理由とした修補をＢに対して請求することはできない。",
      "ウ": "Ｂが材料を提供して増築した部分に契約不適合があり、Ｂは不適合があることを知りながらそのことをＡに告げずに工事を終了し、Ａが工事終了日から3 年後に契約不適合を知った場合、ＡはＢに対して、消滅時効が完成するまでは契約不適合を理由とした修補を請求することができる。",
      "エ": "増築した部分にＡが提供した材料の性質によって契約不適合が生じ、Ｂが材料が不適当であることを知らずに工事を終了した場合、ＡはＢに対して、Ａが提供した材料によって生じた契約不適合を理由とした修補を請求することはできない。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。誤り。通知期間は、工事終了からではなく、注文者が契約不適合を知った時から1年である。民法637条1項。",
    "choiceExplanations": {
      "ア": "正しい。既存建物に付合し独立性を持たない増築部分は、建物所有者に帰属する。請負代金の未払だけで帰属は変わらない。民法242条。",
      "イ": "誤り。通知期間は、工事終了からではなく、注文者が契約不適合を知った時から1年である。民法637条1項。",
      "ウ": "正しい。請負人が引渡し時等に不適合を知り、または重大な過失で知らなかった場合、知ってから1年という通知期間の制限は適用されない。消滅時効は別に問題となる。民法637条2項。",
      "エ": "正しい。注文者が提供した材料の性質に起因する不適合には、原則として修補等を請求できない。請負人が不適当と知りながら告げなかった場合が例外である。民法636条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q4",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 4,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "相殺の弁済期"
    ],
    "difficulty": 3,
    "question": "ＡがＢに対して貸金債権である甲債権を、ＢがＡに対して貸金債権である乙債権をそれぞれ有している場合において、民法の規定及び判例によれば、次のアからエまでの記述のうち、Ａが一方的な意思表示により甲債権と乙債権とを対当額にて相殺できないものを全て掲げたものは、次の1 から4 のうちどれか。なお、いずれの債権も相殺を禁止し又は制限する旨の意思表示はされていないものとする。\nア　弁済期の定めのない甲債権と、弁済期到来前に、ＡがＢに対して期限の利益を放棄する旨の意思表示をした乙債権\nイ　弁済期が到来している甲債権と、弁済期の定めのない乙債権\nウ　弁済期の定めのない甲債権と、弁済期が到来している乙債権\nエ　弁済期が到来していない甲債権と、弁済期が到来している乙債権",
    "choices": {
      "ア": "ア、イ、ウ",
      "イ": "イ、ウ",
      "ウ": "ウ、エ",
      "エ": "エ"
    },
    "answer": "エ",
    "explanation": "相殺できないのはエだけである。自働債権が弁済期にあることと、受働債権の期限の利益を区別する。\n\nア：相殺できる。期限の定めのない自働債権は直ちに行使でき、Aが負う受働債権の期限の利益も放棄している。\n\nイ：相殺できる。自働債権は弁済期にあり、Aが負う期限の定めのない受働債権も履行できる。\n\nウ：相殺できる。自働債権に期限の定めがない場合も相殺でき、受働債権は既に弁済期にある。\n\nエ：相殺できない。自働債権である甲債権が弁済期前であり、Aが一方的にBの期限の利益を奪って相殺することはできない。",
    "choiceExplanations": {
      "ア": "誤り。「ア、イ、ウ」を選ぶ肢。相殺できないのはエだけである。自働債権が弁済期にあることと、受働債権の期限の利益を区別する。",
      "イ": "誤り。「イ、ウ」を選ぶ肢。相殺できないのはエだけである。自働債権が弁済期にあることと、受働債権の期限の利益を区別する。",
      "ウ": "誤り。「ウ、エ」を選ぶ肢。相殺できないのはエだけである。自働債権が弁済期にあることと、受働債権の期限の利益を区別する。",
      "エ": "正答。「エ」を選ぶ肢。相殺できないのはエだけである。自働債権が弁済期にあることと、受働債権の期限の利益を区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q5",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 5,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "不在者財産管理"
    ],
    "difficulty": 3,
    "question": "従来の住所又は居所を去った者（以下この問において「不在者」という。）の財産の管理に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、この問において「管理人」とは、不在者の財産の管理人をいうものとする。",
    "choices": {
      "ア": "不在者が管理人を置かなかったときは、当該不在者の生死が7 年間明らかでない場合に限り、家庭裁判所は、利害関係人又は検察官の請求により、その財産の管理について必要な処分を命ずることができる。",
      "イ": "不在者が管理人を置いた場合において、その不在者の生死が明らかでないときは、家庭裁判所は、利害関係人又は検察官から請求があったとしても管理人を改任することはできない。",
      "ウ": "家庭裁判所により選任された管理人は、不在者を被告とする建物収去土地明渡請求を認容した第一審判決に対して控訴を提起するには、家庭裁判所の許可が必要である。",
      "エ": "家庭裁判所により選任された管理人は、保存行為として不在者の自宅を修理することができるほか、家庭裁判所の許可を得てこれを売却することができる。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。修理等の保存行為は管理人が行える。売却など権限を超える行為には家庭裁判所の許可を要する。民法28条・103条。",
    "choiceExplanations": {
      "ア": "誤り。財産管理の処分に、生死不明が7年続くことは必要ない。7年は普通失踪の宣告の要件であり、財産保護の処分とは別である。民法25条・30条。",
      "イ": "誤り。本人が管理人を置いていても、生死不明の場合、家庭裁判所は利害関係人等の請求で改任できる。民法26条。",
      "ウ": "誤り。管理財産を失わせる判決に対する控訴は保存行為であり、権限を超える処分として家庭裁判所の許可を要するものではない。民法28条・103条。",
      "エ": "正しい。修理等の保存行為は管理人が行える。売却など権限を超える行為には家庭裁判所の許可を要する。民法28条・103条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q6",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 6,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "取得時効と第三者"
    ],
    "difficulty": 3,
    "question": "Ａ所有の甲土地について、Ｂが所有の意思をもって平穏にかつ公然と時効取得に必要な期間占有を継続した場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはいくつあるか。\nア　ＡがＣに対して甲土地を売却し、Ｃが所有権移転登記を備えた後にＢの取得時効が完成した場合には、Ｂは登記を備えていなくても、甲土地の所有権の時効取得をＣに対抗することができる。\nイ　Ｂの取得時効が完成した後に、ＡがＤに対して甲土地を売却しＤが所有権移転登記を備え、Ｂが、Ｄの登記の日から所有の意思をもって平穏にかつ公然と時効取得に必要な期間占有を継続した場合、所有権移転登記を備えていなくても、甲土地の所有権の時効取得をＤに対抗することができる。\nウ　Ｂの取得時効完成後、Ｂへの所有権移転登記がなされないままＥがＡを債務者として甲土地にＡから抵当権の設定を受けて抵当権設定登記をした場合において、Ｂがその後引き続き所有の意思をもって平穏にかつ公然と時効取得に必要な期間占有を継続した場合、特段の事情がない限り、再度の時効取得により、Ｂは甲土地の所有権を取得し、Ｅの抵当権は消滅する。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "なし"
    },
    "answer": "ウ",
    "explanation": "ア・イ・ウの全てが正しく、三つとなる。時効完成前後での第三者の位置付けと、再度の時効完成を整理する。\n\nア：正しい。時効完成前の譲受人は、時効取得の当事者と同様に扱われ、登記がなくても完成した時効取得を対抗できる。\n\nイ：正しい。完成後の譲受人に登記で対抗できなくても、その登記後さらに必要期間の占有が続けば、再度の時効取得を主張できる。\n\nウ：正しい。抵当権設定登記後、さらに必要期間の占有が継続すれば、特段の事情がない限り再度の取得時効により抵当権は消滅する。",
    "choiceExplanations": {
      "ア": "誤り。「一つ」を選ぶ肢。ア・イ・ウの全てが正しく、三つとなる。時効完成前後での第三者の位置付けと、再度の時効完成を整理する。",
      "イ": "誤り。「二つ」を選ぶ肢。ア・イ・ウの全てが正しく、三つとなる。時効完成前後での第三者の位置付けと、再度の時効完成を整理する。",
      "ウ": "正答。「三つ」を選ぶ肢。ア・イ・ウの全てが正しく、三つとなる。時効完成前後での第三者の位置付けと、再度の時効完成を整理する。",
      "エ": "誤り。「なし」を選ぶ肢。ア・イ・ウの全てが正しく、三つとなる。時効完成前後での第三者の位置付けと、再度の時効完成を整理する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q7",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 7,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "配偶者居住権"
    ],
    "difficulty": 3,
    "question": "甲建物を所有するＡが死亡し、Ａの配偶者Ｂが甲建物の配偶者居住権を、Ａの子Ｃが甲建物の所有権をそれぞれ取得する旨の遺産分割協議が成立した場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "遺産分割協議において、Ｂの配偶者居住権の存続期間が定められなかった場合、配偶者居住権の存続期間は20 年となる。",
      "イ": "Ｂが高齢となり、バリアフリーのマンションに転居するための資金が必要になった場合、Ｂは、Ｃの承諾を得ずに甲建物を第三者Ｄに賃貸することができる。",
      "ウ": "Ｃには、Ｂに対し、配偶者居住権の設定の登記を備えさせる義務がある。",
      "エ": "Ｃは、甲建物の通常の必要費を負担しなければならない。"
    },
    "answer": "ウ",
    "explanation": "正答は選択肢3（ウ）。正しい。居住建物の所有者は、配偶者に対して配偶者居住権の設定登記を備えさせる義務を負う。民法1031条1項。",
    "choiceExplanations": {
      "ア": "誤り。遺産分割等で別段の定めをしなければ、配偶者居住権は配偶者の終身の間存続する。民法1030条。",
      "イ": "誤り。配偶者が第三者に使用・収益させるには、所有者の承諾が必要となる。転居資金を得る事情があっても変わらない。民法1032条3項。",
      "ウ": "正しい。居住建物の所有者は、配偶者に対して配偶者居住権の設定登記を備えさせる義務を負う。民法1031条1項。",
      "エ": "誤り。居住建物の通常の必要費は、配偶者居住権を持つ配偶者が負担する。民法1034条1項。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q8",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 8,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "未成年者の取消しと追認"
    ],
    "difficulty": 3,
    "question": "未成年者Ａが、法定代理人Ｂの同意を得ずに、Ｃから甲建物を買い受ける契約（以下この問において「本件売買契約」という。）を締結した場合における次の記述のうち、民法の規定によれば、正しいものはどれか。なお、Ａに処分を許された財産はなく、Ａは、営業を許されてはいないものとする。",
    "choices": {
      "ア": "ＡがＢの同意を得ずに制限行為能力を理由として本件売買契約を取り消した場合、Ｂは、自己が本件売買契約の取消しに同意していないことを理由に、Ａの当該取消しの意思表示を取り消すことができる。",
      "イ": "本件売買契約締結時にＡが未成年者であることにつきＣが善意無過失であった場合、Ｂは、Ａの制限行為能力を理由として、本件売買契約を取り消すことはできない。",
      "ウ": "本件売買契約につき、取消しがなされないままＡが成年に達した場合、本件売買契約についてＢが反対していたとしても、自らが取消権を有すると知ったＡは、本件売買契約を追認することができ、追認後は本件売買契約を取り消すことはできなくなる。",
      "エ": "本件売買契約につき、Ｂが追認しないまま、Ａが成年に達する前にＢの同意を得ずに甲建物をＤに売却した場合、ＢがＤへの売却について追認していないときでも、Ａは制限行為能力を理由として、本件売買契約を取り消すことはできなくなる。"
    },
    "answer": "ウ",
    "explanation": "正答は選択肢3（ウ）。正しい。成年となり取消権を知った後は、自ら追認できる。追認後はその行為を取り消せない。民法122条・124条。",
    "choiceExplanations": {
      "ア": "誤り。制限行為能力を理由とする取消しは、未成年者本人が単独でできる。親が同意しなかったことを理由に、その取消しをさらに取り消すことはできない。民法120条1項。",
      "イ": "誤り。未成年者の取消しは、相手方の善意・無過失によって妨げられない。本人が詐術を用いた場合等とは区別する。民法5条・21条。",
      "ウ": "正しい。成年となり取消権を知った後は、自ら追認できる。追認後はその行為を取り消せない。民法122条・124条。",
      "エ": "誤り。未成年の間の無断転売だけでは、最初の売買を取り消す権利は失われない。法定追認も、追認できる時以後の行為であることが必要である。民法125条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q9",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 9,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "賃借人による修繕"
    ],
    "difficulty": 3,
    "question": "Ａを貸主、Ｂを借主として甲建物の賃貸借契約が令和5 年7 月1 日に締結された場合の甲建物の修繕に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "甲建物の修繕が必要であることを、Ａが知ったにもかかわらず、Ａが相当の期間内に必要な修繕をしないときは、Ｂは甲建物の修繕をすることができる。",
      "イ": "甲建物の修繕が必要である場合において、ＢがＡに修繕が必要である旨を通知したにもかかわらず、Ａが必要な修繕を直ちにしないときは、Ｂは甲建物の修繕をすることができる。",
      "ウ": "Ｂの責めに帰すべき事由によって甲建物の修繕が必要となった場合は、Ａは甲建物を修繕する義務を負わない。",
      "エ": "甲建物の修繕が必要である場合において、急迫の事情があるときは、Ｂは甲建物の修繕をすることができる。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。誤り。通知しただけで直ちに自ら修繕できるわけではなく、賃貸人が相当の期間内に修繕しないことが原則として必要となる。急迫の事情がある場合とは別である。民法607条の2。",
    "choiceExplanations": {
      "ア": "正しい。賃貸人が修繕の必要を知りながら相当期間内に修繕しない場合、賃借人は自ら修繕できる。民法607条の2第1号。",
      "イ": "誤り。通知しただけで直ちに自ら修繕できるわけではなく、賃貸人が相当の期間内に修繕しないことが原則として必要となる。急迫の事情がある場合とは別である。民法607条の2。",
      "ウ": "正しい。賃借人の責めに帰すべき事由で修繕が必要となった場合、賃貸人の修繕義務はない。民法606条1項ただし書。",
      "エ": "正しい。急迫の事情がある場合は、賃借人が自ら修繕できる。通知後の相当期間経過を待つことは要しない。民法607条の2第2号。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q10",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 10,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "抵当権の順位放棄"
    ],
    "difficulty": 3,
    "question": "債務者Ａが所有する甲土地には、債権者Ｂが一番抵当権（債権額1,000 万円）、債権者Ｃが二番抵当権（債権額1,200 万円）、債権者Ｄが三番抵当権（債権額2,000 万円）をそれぞれ有しているが、ＢがＤの利益のため、Ａの承諾を得て抵当権の順位を放棄した。甲土地の競売に基づく売却代金が2,400 万円であった場合、Ｂの受ける配当額として、民法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "0 円",
      "イ": "200 万円",
      "ウ": "400 万円",
      "エ": "800 万円"
    },
    "answer": "ウ",
    "explanation": "正答は選択肢3（ウ）。正しい。Cの1200万円を維持し、BとDの配当合計1200万円を債権額1000対2000で配分する。Bは1200×1000÷3000＝400万円。民法376条。",
    "choiceExplanations": {
      "ア": "誤り。順位放棄をしてもBの配当が当然にゼロになるわけではない。BとDが本来受ける配当1200万円を、債権額1000対2000で分ける。",
      "イ": "誤り。BとDの本来の配当は1000万円と200万円だが、順位放棄後は合計1200万円を債権額に比例して配分する。Bは200万円ではなく400万円となる。",
      "ウ": "正しい。Cの1200万円を維持し、BとDの配当合計1200万円を債権額1000対2000で配分する。Bは1200×1000÷3000＝400万円。民法376条。",
      "エ": "誤り。800万円はDが受ける額であり、Bの額ではない。BとDの分配割合は1対2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q11",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 11,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "借地契約の更新"
    ],
    "difficulty": 3,
    "question": "ＡがＢとの間で、Ａ所有の甲土地につき建物所有目的で期間を50 年とする賃貸借契約（以下この問において「本件契約」という。）を締結する場合に関する次の記述のうち、借地借家法の規定及び判例によれば、正しいものはどれか。",
    "choices": {
      "ア": "本件契約に、当初の10 年間は地代を減額しない旨の特約を定めた場合、その期間内は、ＢはＡに対して地代の減額請求をすることはできない。",
      "イ": "本件契約が甲土地上で専ら賃貸アパート事業用の建物を所有する目的である場合、契約の更新や建物の築造による存続期間の延長がない旨を定めるためには、公正証書で合意しなければならない。",
      "ウ": "本件契約に建物買取請求権を排除する旨の特約が定められていない場合、本件契約が終了したときは、その終了事由のいかんにかかわらず、ＢはＡに対してＢが甲土地上に所有している建物を時価で買い取るべきことを請求することができる。",
      "エ": "本件契約がＢの居住のための建物を所有する目的であり契約の更新がない旨を定めていない契約であって、期間満了する場合において甲土地上に建物があり、Ｂが契約の更新を請求したとしても、Ａが遅滞なく異議を述べ、その異議に更新を拒絶する正当な事由があると認められる場合は、本件契約は更新されない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。建物があり更新請求をした場合も、貸主が遅滞なく異議を述べ、その異議に正当事由があれば更新されない。借地借家法5条・6条。",
    "choiceExplanations": {
      "ア": "誤り。地代を減額しない特約があっても、借地借家法11条による減額請求は排除できない。増額しない特約とは扱いが異なる。",
      "イ": "誤り。50年以上の一般定期借地権の特約は書面等で定めれば足り、公正証書に限られない。居住用を含まない事業用定期借地権の方式と区別する。借地借家法22条・23条。",
      "ウ": "誤り。建物買取請求権は、例えば借地人の債務不履行により解除された場合には認められない。終了原因を問わず行使できるものではない。",
      "エ": "正しい。建物があり更新請求をした場合も、貸主が遅滞なく異議を述べ、その異議に正当事由があれば更新されない。借地借家法5条・6条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/403AC0000000090_20230220_504AC0000000048"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q12",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 12,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "建物賃貸借"
    ],
    "difficulty": 3,
    "question": "令和5 年7 月1 日に締結された建物の賃貸借契約（定期建物賃貸借契約及び一時使用目的の建物の賃貸借契約を除く。）に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。",
    "choices": {
      "ア": "期間を1 年未満とする建物の賃貸借契約は、期間を1 年とするものとみなされる。",
      "イ": "当事者間において、一定の期間は建物の賃料を減額しない旨の特約がある場合、現行賃料が不相当になったなどの事情が生じたとしても、この特約は有効である。",
      "ウ": "賃借人が建物の引渡しを受けている場合において、当該建物の賃貸人が当該建物を譲渡するに当たり、当該建物の譲渡人及び譲受人が、賃貸人たる地位を譲渡人に留保する旨及び当該建物の譲受人が譲渡人に賃貸する旨の合意をしたときは、賃貸人たる地位は譲受人に移転しない。",
      "エ": "現行賃料が定められた時から一定の期間が経過していなければ、賃料増額請求は、認められない。"
    },
    "answer": "ウ",
    "explanation": "正答は選択肢3（ウ）。正しい。賃貸人の地位の留保と、譲受人から譲渡人への賃貸借を合意した場合、賃貸人の地位は譲受人に移転しない。民法605条の2第2項。",
    "choiceExplanations": {
      "ア": "誤り。期間1年未満の通常の建物賃貸借は、期間の定めがないものとみなされる。借地借家法29条1項。",
      "イ": "誤り。通常の建物賃貸借では、賃料を減額しない特約によって法定の減額請求を妨げることはできない。借地借家法32条1項。",
      "ウ": "正しい。賃貸人の地位の留保と、譲受人から譲渡人への賃貸借を合意した場合、賃貸人の地位は譲受人に移転しない。民法605条の2第2項。",
      "エ": "誤り。増額請求に一律の待機期間はない。租税公課・経済事情や近傍同種賃料との比較等から、現行賃料が不相当かを判断する。借地借家法32条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/129AC0000000089_20230401_503AC0000000061",
      "https://laws.e-gov.go.jp/law/403AC0000000090_20230220_504AC0000000048"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q13",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 13,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "権利関係",
    "topicTags": [
      "権利関係",
      "区分所有建物の集会"
    ],
    "difficulty": 3,
    "question": "建物の区分所有等に関する法律（以下この問において「法」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "集会においては、法で集会の決議につき特別の定数が定められている事項を除き、規約で別段の定めをすれば、あらかじめ通知した事項以外についても決議することができる。",
      "イ": "集会は、区分所有者の4 分の3 以上の同意があるときは、招集の手続を経ないで開くことができる。",
      "ウ": "共用部分の保存行為は、規約に別段の定めがある場合を除いて、各共有者がすることができるため集会の決議を必要としない。",
      "エ": "一部共用部分に関する事項で区分所有者全員の利害に関係しないものについての区分所有者全員の規約は、当該一部共用部分を共用すべき区分所有者が8 人である場合、3 人が反対したときは変更することができない。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。誤り。招集手続を省略して集会を開くには区分所有者全員の同意が必要であり、4分の3では足りない。出題時の区分所有法36条。",
    "choiceExplanations": {
      "ア": "正しい。法定の特別定数事項を除けば、規約で別段の定めをすることで、通知していない事項も決議できる。出題時の区分所有法37条。",
      "イ": "誤り。招集手続を省略して集会を開くには区分所有者全員の同意が必要であり、4分の3では足りない。出題時の区分所有法36条。",
      "ウ": "正しい。保存行為は、規約で別段の定めがなければ各共有者が行える。通常の共用部分の管理決議と区別する。出題時の区分所有法18条。",
      "エ": "正しい。一部共用部分に関係する区分所有者の4分の1を超える者が反対すると、当該規約の変更はできない。8人中3人の反対はこれに当たる。出題時の区分所有法31条2項。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/337AC0000000069_20230401_503AC0000000024"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q14",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
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
    "question": "不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "建物が滅失したときは、表題部所有者又は所有権の登記名義人は、その滅失の日から1 か月以内に、当該建物の滅失の登記を申請しなければならない。",
      "イ": "何人も、理由の有無にかかわらず、登記官に対し、手数料を納付して、登記簿の附属書類である申請書を閲覧することができる。",
      "ウ": "共有物分割禁止の定めに係る権利の変更の登記の申請は、当該権利の共有者である全ての登記名義人が共同してしなければならない。",
      "エ": "区分建物の所有権の保存の登記は、表題部所有者から所有権を取得した者も、申請することができる。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。誤り。申請書等の附属書類の閲覧は、請求人に利害関係がある部分等に限られる。理由を問わず誰でも閲覧できる登記事項証明書の交付とは異なる。出題時の不動産登記法121条。",
    "choiceExplanations": {
      "ア": "正しい。表題部所有者または所有権登記名義人は、建物の滅失から1か月以内に滅失登記を申請する。出題時の不動産登記法57条。",
      "イ": "誤り。申請書等の附属書類の閲覧は、請求人に利害関係がある部分等に限られる。理由を問わず誰でも閲覧できる登記事項証明書の交付とは異なる。出題時の不動産登記法121条。",
      "ウ": "正しい。共有物分割禁止の定めに関する変更登記は、共有者全員が共同して申請する。不動産登記法65条。",
      "エ": "正しい。区分建物では表題部所有者から所有権を取得した者にも保存登記の申請が認められる。不動産登記法74条2項。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/416AC0000000123_20230401_503AC0000000024"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q15",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 15,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "都市計画の区域・地域地区"
    ],
    "difficulty": 3,
    "question": "都市計画法に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "市街化調整区域は、土地利用を整序し、又は環境を保全するための措置を講ずることなく放置すれば、将来における一体の都市としての整備に支障が生じるおそれがある区域とされている。",
      "イ": "高度利用地区は、土地の合理的かつ健全な高度利用と都市機能の更新とを図るため、都市計画に、建築物の高さの最低限度を定める地区とされている。",
      "ウ": "特定用途制限地域は、用途地域が定められている土地の区域内において、都市計画に、制限すべき特定の建築物等の用途の概要を定める地域とされている。",
      "エ": "地区計画は、用途地域が定められている土地の区域のほか、一定の場合には、用途地域が定められていない土地の区域にも定めることができる。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。地区計画は用途地域内に限られず、用途地域がない区域でも法定の要件を満たすと定められる。都市計画法12条の5。",
    "choiceExplanations": {
      "ア": "誤り。記述は準都市計画区域の考え方である。市街化調整区域は、市街化を抑制すべき区域である。都市計画法5条の2・7条。",
      "イ": "誤り。高度利用地区が定めるのは容積率の最高・最低限度、建蔽率の最高限度、建築面積の最低限度等である。高さの最低限度を定める高度地区とは異なる。都市計画法9条。",
      "ウ": "誤り。特定用途制限地域は、用途地域が定められていない区域内に定める。用途地域内の特別用途地区とは区別する。都市計画法9条。",
      "エ": "正しい。地区計画は用途地域内に限られず、用途地域がない区域でも法定の要件を満たすと定められる。都市計画法12条の5。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/343AC0000000100_20221216_504AC0000000087"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q16",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 16,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "開発許可の手続"
    ],
    "difficulty": 3,
    "question": "都市計画法に関する次の記述のうち、正しいものはどれか。ただし、この問において条例による特別の定めはないものとし、「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。",
    "choices": {
      "ア": "開発許可を申請しようとする者は、あらかじめ、開発行為に関係がある公共施設の管理者と協議し、その同意を得なければならない。",
      "イ": "開発許可を受けた者は、当該許可を受ける際に申請書に記載した事項を変更しようとする場合においては、都道府県知事に届け出なければならないが、当該変更が国土交通省令で定める軽微な変更に当たるときは、届け出なくてよい。",
      "ウ": "開発許可を受けた者は、当該開発行為に関する工事が完了し、都道府県知事から検査済証を交付されたときは、遅滞なく、当該工事が完了した旨を公告しなければならない。",
      "エ": "市街化調整区域のうち開発許可を受けた開発区域以外の区域内において、自己の居住用の住宅を新築しようとする全ての者は、当該建築が開発行為を伴わない場合であれば、都道府県知事の許可を受けなくてよい。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。正しい。開発許可申請前に、関係する既存の公共施設の管理者と協議し、同意を得る必要がある。都市計画法32条1項。",
    "choiceExplanations": {
      "ア": "正しい。開発許可申請前に、関係する既存の公共施設の管理者と協議し、同意を得る必要がある。都市計画法32条1項。",
      "イ": "誤り。申請事項の変更は原則として変更許可が必要であり、軽微な変更の場合に届出となる。記述は両者を取り違えている。都市計画法35条の2。",
      "ウ": "誤り。工事完了の公告を行うのは開発許可を受けた者ではなく都道府県知事である。都市計画法36条3項。",
      "エ": "誤り。市街化調整区域内の許可区域外の建築等には、開発行為を伴わなくても原則として知事の許可を要する。自己居住用住宅というだけで全て免除されない。都市計画法43条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/343AC0000000100_20221216_504AC0000000087"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q17",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 17,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "建築物の防火・避難"
    ],
    "difficulty": 3,
    "question": "建築基準法に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "地方公共団体は、条例で、津波、高潮、出水等による危険の著しい区域を災害危険区域として指定し、当該区域内における住居の用に供する建築物の建築を禁止することができる。",
      "イ": "3 階建て以上の建築物の避難階以外の階を、床面積の合計が1,500 m2 を超える物品販売業の店舗の売場とする場合には、当該階から避難階又は地上に通ずる2 以上の直通階段を設けなければならない。",
      "ウ": "建築物が防火地域及び準防火地域にわたる場合、その全部について準防火地域内の建築物に関する規定を適用する。",
      "エ": "石綿等をあらかじめ添加した建築材料は、石綿等を飛散又は発散させるおそれがないものとして国土交通大臣が定めたもの又は国土交通大臣の認定を受けたものを除き、使用してはならない。"
    },
    "answer": "ウ",
    "explanation": "正答は選択肢3（ウ）。誤り。防火地域と準防火地域にまたがる場合、原則として全部に厳しい防火地域の規定が適用される。防火壁で区画する場合等の例外とは区別する。出題時の建築基準法65条。",
    "choiceExplanations": {
      "ア": "正しい。地方公共団体は条例で災害危険区域を指定し、居住用建築物の建築を禁止する等の制限を定められる。建築基準法39条。",
      "イ": "正しい。所定規模を超える物品販売店舗の売場には、避難のため2以上の直通階段を設ける必要がある。建築基準法施行令121条。",
      "ウ": "誤り。防火地域と準防火地域にまたがる場合、原則として全部に厳しい防火地域の規定が適用される。防火壁で区画する場合等の例外とは区別する。出題時の建築基準法65条。",
      "エ": "正しい。石綿等をあらかじめ添加した建材は、飛散・発散のおそれがないものとして指定・認定されたもの等を除き使用できない。建築基準法28条の2。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20230401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20230401_505CO0000000034"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q18",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 18,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "建蔽率と道路・日影"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、建築基準法（以下この問において「法」という。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "法第53 条第1 項及び第2 項の建蔽率制限に係る規定の適用については、準防火地域内にある準耐火建築物であり、かつ、街区の角にある敷地又はこれに準ずる敷地で特定行政庁が指定するものの内にある建築物にあっては同条第1 項各号に定める数値に10 分の2 を加えたものをもって当該各号に定める数値とする。",
      "イ": "建築物又は敷地を造成するための擁壁は、道路内に、又は道路に突き出して建築し、又は築造してはならず、地盤面下に設ける建築物においても同様である。",
      "ウ": "地方公共団体は、その敷地が袋路状道路にのみ接する建築物であって、延べ面積が150 m2 を超えるものについては、一戸建ての住宅であっても、条例で、その敷地が接しなければならない道路の幅員、その敷地が道路に接する部分の長さその他その敷地又は建築物と道路との関係に関して必要な制限を付加することができる。",
      "エ": "冬至日において、法第56 条の2 第1 項の規定による日影規制の対象区域内の土地に日影を生じさせるものであっても、対象区域外にある建築物であれば一律に、同項の規定は適用されない。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。正しい。準防火地域内の準耐火建築物等の緩和と、指定された角地の緩和が重なる場合、建蔽率の上限を20ポイント加算できる。建築基準法53条3項。",
    "choiceExplanations": {
      "ア": "正しい。準防火地域内の準耐火建築物等の緩和と、指定された角地の緩和が重なる場合、建蔽率の上限を20ポイント加算できる。建築基準法53条3項。",
      "イ": "誤り。道路内建築の禁止には、地盤面下に設ける建築物などの例外がある。建築基準法44条1項。",
      "ウ": "誤り。袋路状道路だけに接する敷地について条例で追加制限できる規定から、一戸建て住宅は除かれる。建築基準法43条3項。",
      "エ": "誤り。対象区域外の建築物でも、高さ10mを超え、冬至日に対象区域内へ日影を生じさせるものは規制の対象となる。建築基準法56条の2第4項。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20230401_504AC0000000069"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q19",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 19,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "宅地造成等規制法"
    ],
    "difficulty": 3,
    "question": "宅地造成等規制法に関する次の記述のうち、誤っているものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。",
    "choices": {
      "ア": "都道府県知事は、関係市町村長の意見を聴いて、宅地造成工事規制区域内で、宅地造成に伴う災害で相当数の居住者その他の者に危害を生ずるものの発生のおそれが大きい一団の造成宅地の区域であって、一定の基準に該当するものを、造成宅地防災区域として指定することができる。",
      "イ": "都道府県知事は、その地方の気候、風土又は地勢の特殊性により、宅地造成等規制法の規定のみによっては宅地造成に伴うがけ崩れ又は土砂の流出の防止の目的を達し難いと認める場合は、都道府県（地方自治法に基づく指定都市、中核市又は施行時特例市の区域にあっては、それぞれ指定都市、中核市又は施行時特例市）の規則で、宅地造成工事規制区域内において行われる宅地造成に関する工事の技術的基準を強化し、又は付加することができる。",
      "ウ": "都道府県知事は、宅地造成工事規制区域内の宅地について、宅地造成に伴う災害を防止するために必要があると認める場合には、その宅地の所有者に対して、擁壁等の設置等の措置をとることを勧告することができる。",
      "エ": "宅地造成工事規制区域内の宅地において、雨水その他の地表水又は地下水を排除するための排水施設の除却工事を行おうとする場合は、一定の場合を除き、都道府県知事への届出が必要となる。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。誤り。造成宅地防災区域の指定対象は、宅地造成工事規制区域外の造成宅地である。出題時の宅地造成等規制法20条。",
    "choiceExplanations": {
      "ア": "誤り。造成宅地防災区域の指定対象は、宅地造成工事規制区域外の造成宅地である。出題時の宅地造成等規制法20条。",
      "イ": "正しい。地域の特殊性により通常の基準では災害防止が難しい場合、都道府県等の規則で技術的基準を強化・付加できる。出題時の同法9条。",
      "ウ": "正しい。規制区域内の宅地で災害防止が必要な場合、知事は所有者等に擁壁設置等を勧告できる。出題時の同法16条。",
      "エ": "正しい。規制区域内で排水施設等の除却工事を行う場合、許可対象工事等を除き、知事への届出を要する。出題時の同法15条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/336AC0000000191_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q20",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 20,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "土地区画整理"
    ],
    "difficulty": 3,
    "question": "土地区画整理法に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "換地計画において定められた清算金は、換地処分の公告があった日の翌日において確定する。",
      "イ": "現に施行されている土地区画整理事業の施行地区となっている区域については、その施行者の同意を得なければ、その施行者以外の者は、土地区画整理事業を施行することができない。",
      "ウ": "施行者は、換地処分の公告があった場合において、施行地区内の土地及び建物について土地区画整理事業の施行により変動があったときは、遅滞なく、その変動に係る登記を申請し、又は嘱託しなければならない。",
      "エ": "土地区画整理組合は、仮換地を指定しようとする場合においては、あらかじめ、その指定について、土地区画整理審議会の同意を得なければならない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。誤り。組合施行の場合は、原則として総会の同意等を得る。土地区画整理審議会の意見を聴く手続は、公的施行者の場合の手続である。土地区画整理法98条。",
    "choiceExplanations": {
      "ア": "正しい。換地計画の清算金は、換地処分の公告の日の翌日に確定する。土地区画整理法104条8項。",
      "イ": "正しい。既存の施行地区内では、先の施行者の同意なしに別の施行者が事業を施行できない。土地区画整理法128条。",
      "ウ": "正しい。換地処分の公告後、土地・建物に事業による変動がある場合、施行者は遅滞なく必要な登記を申請・嘱託する。土地区画整理法107条。",
      "エ": "誤り。組合施行の場合は、原則として総会の同意等を得る。土地区画整理審議会の意見を聴く手続は、公的施行者の場合の手続である。土地区画整理法98条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/329AC0000000119_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q21",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 21,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "農地法"
    ],
    "difficulty": 3,
    "question": "農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "相続により農地を取得する場合は、法第3 条第1 項の許可を要しないが、相続人に該当しない者が特定遺贈により農地を取得する場合は、同項の許可を受ける必要がある。",
      "イ": "自己の所有する面積4 アールの農地を農作物の育成又は養畜の事業のための農業用施設に転用する場合は、法第4 条第1 項の許可を受ける必要はない。",
      "ウ": "法第3 条第1 項又は法第5 条第1 項の許可が必要な農地の売買について、これらの許可を受けずに売買契約を締結しても、その所有権の移転の効力は生じない。",
      "エ": "社会福祉事業を行うことを目的として設立された法人（社会福祉法人）が、農地をその目的に係る業務の運営に必要な施設の用に供すると認められる場合、農地所有適格法人でなくても、農業委員会の許可を得て、農地の所有権を取得することができる。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。誤り。自己の農地を農業用施設へ転用する小規模な場合の許可不要の面積は2アール未満であり、4アールでは適用されない。",
    "choiceExplanations": {
      "ア": "正しい。相続による取得は3条許可不要だが、相続人以外への特定遺贈は別であり、原則として許可が必要となる。農地法3条。",
      "イ": "誤り。自己の農地を農業用施設へ転用する小規模な場合の許可不要の面積は2アール未満であり、4アールでは適用されない。",
      "ウ": "正しい。必要な許可なしに契約をしても、農地の所有権移転の効力は生じない。農地法3条・5条。",
      "エ": "正しい。社会福祉法人が業務に必要な施設用地として取得する場合には、農地所有適格法人であることを要しない例外がある。農地法3条2項。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC0000000229_20230401_504AC0000000056"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q22",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 22,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "法令上の制限",
    "topicTags": [
      "法令上の制限",
      "土地取引の届出"
    ],
    "difficulty": 3,
    "question": "土地を取得する場合における届出に関する次の記述のうち、正しいものはどれか。なお、この問において「事後届出」とは、国土利用計画法第23 条の届出をいい、「重要土地等調査法」とは、重要施設周辺及び国境離島等における土地等の利用状況の調査及び利用の規制等に関する法律をいうものとする。",
    "choices": {
      "ア": "都市計画区域外において、国から一団の土地である6,000 m2 と5,000 m2 の土地を購入した者は、事後届出を行う必要はない。",
      "イ": "市街化区域を除く都市計画区域内において、Ａが所有する7,000 m2 の土地をＢが相続により取得した場合、Ｂは事後届出を行う必要がある。",
      "ウ": "市街化区域において、Ｃが所有する3,000 m2 の土地をＤが購入する契約を締結した場合、Ｃ及びＤは事後届出を行わなければならない。",
      "エ": "重要土地等調査法の規定による特別注視区域内にある100 m2 の規模の土地に関する所有権又はその取得を目的とする権利の移転をする契約を締結する場合には、当事者は、一定の事項を、あらかじめ、内閣総理大臣に届け出なければならない。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。正しい。国等が当事者となる土地取引は事後届出の適用除外となる。面積が区域外の基準1万m²を超えても同じである。国土利用計画法23条2項。",
    "choiceExplanations": {
      "ア": "正しい。国等が当事者となる土地取引は事後届出の適用除外となる。面積が区域外の基準1万m²を超えても同じである。国土利用計画法23条2項。",
      "イ": "誤り。相続は土地売買等の契約による取得ではないため、面積が基準を超えても事後届出は不要である。国土利用計画法23条。",
      "ウ": "誤り。事後届出をするのは権利取得者である買主Dであり、売主Cとの双方届出ではない。国土利用計画法23条1項。",
      "エ": "誤り。特別注視区域の事前届出の対象面積は200m²以上であり、100m²では対象とならない。重要土地等調査法13条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/349AC1000000092_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/503AC0000000084_20220920_000000000000000",
      "https://www.cao.go.jp/tochi-chosa/todokede.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q23",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 23,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "税・価格評定",
      "印紙税"
    ],
    "difficulty": 3,
    "question": "印紙税に関する次の記述のうち、正しいものはどれか。なお、以下の契約書はいずれも書面により作成されたものとする。",
    "choices": {
      "ア": "売主Ａと買主Ｂが土地の譲渡契約書を3 通作成し、Ａ、Ｂ及び仲介人Ｃがそれぞれ1 通ずつ保存する場合、当該契約書3 通には印紙税が課される。",
      "イ": "一の契約書に土地の譲渡契約（譲渡金額5,000 万円）と建物の建築請負契約（請負金額6,000 万円）をそれぞれ区分して記載した場合、印紙税の課税標準となる当該契約書の記載金額は1 億1,000 万円である。",
      "ウ": "「Ｄの所有する甲土地（時価2,000 万円）をＥに贈与する」旨を記載した贈与契約書を作成した場合、印紙税の課税標準となる当該契約書の記載金額は、2,000 万円である。",
      "エ": "当初作成の「土地を1 億円で譲渡する」旨を記載した土地譲渡契約書の契約金額を変更するために作成する契約書で、「当初の契約書の契約金額を1,000 万円減額し、9,000 万円とする」旨を記載した変更契約書について、印紙税の課税標準となる当該変更契約書の記載金額は、1,000 万円である。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。正しい。契約成立を証明する譲渡契約書を3通作成した場合、保存者が仲介人であるものも含め、原則として各通が課税文書となる。",
    "choiceExplanations": {
      "ア": "正しい。契約成立を証明する譲渡契約書を3通作成した場合、保存者が仲介人であるものも含め、原則として各通が課税文書となる。",
      "イ": "誤り。不動産譲渡と請負の双方を記載した文書は、原則として記載金額の大きい号の文書に所属し、本問の記載金額は6000万円となる。単純に合算しない。",
      "ウ": "誤り。贈与契約では対価がなく、記載された時価を譲渡金額とするものではない。記載金額のない不動産譲渡契約書として扱う。",
      "エ": "誤り。減額変更を記載した契約書は、減額分を記載金額とはせず、記載金額のない契約書として扱う。増額変更の場合と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/342AC0000000023_20230401_505AC0000000003",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/inshi/7104.htm",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/inshi/7122.htm",
      "https://www.nta.go.jp/publication/pamph/inshi/tebiki/pdf/00.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q24",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 24,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "税・価格評定",
      "不動産取得税"
    ],
    "difficulty": 3,
    "question": "不動産取得税に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "不動産取得税の徴収については、特別徴収の方法によることができる。",
      "イ": "不動産取得税は、目的税である。",
      "ウ": "不動産取得税は、不動産の取得に対し、当該不動産所在の市町村及び特別区において、当該不動産の取得者に課する。",
      "エ": "不動産取得税は、市町村及び特別区に対して、課することができない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。市町村・特別区等の取得には不動産取得税を課すことができない。地方税法73条の3。",
    "choiceExplanations": {
      "ア": "誤り。不動産取得税は普通徴収の方法によって徴収する。地方税法73条の17。",
      "イ": "誤り。不動産取得税は道府県の普通税であり、使途を特定する目的税ではない。地方税法4条。",
      "ウ": "誤り。不動産取得税を課すのは不動産所在地の道府県であり、市町村や特別区ではない。地方税法73条の2。",
      "エ": "正しい。市町村・特別区等の取得には不動産取得税を課すことができない。地方税法73条の3。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/325AC0000000226_20230401_505AC0000000001"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q25",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 25,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "税・価格評定",
    "topicTags": [
      "税・価格評定",
      "不動産鑑定評価の手法"
    ],
    "difficulty": 3,
    "question": "不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、正しいものはどれか。",
    "choices": {
      "ア": "原価法は、価格時点における対象不動産の収益価格を求め、この収益価格について減価修正を行って対象不動産の比準価格を求める手法である。",
      "イ": "原価法は、対象不動産が建物又は建物及びその敷地である場合には適用することができるが、対象不動産が土地のみである場合においては、いかなる場合も適用することができない。",
      "ウ": "取引事例比較法における取引事例が、特殊事情のある事例である場合、その具体的な状況が判明し、事情補正できるものであっても採用することは許されない。",
      "エ": "取引事例比較法は、近隣地域若しくは同一需給圏内の類似地域等において対象不動産と類似の不動産の取引が行われている場合又は同一需給圏内の代替競争不動産の取引が行われている場合に有効である。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。類似不動産や同一需給圏内の代替競争不動産の取引事例を収集できる場合、取引事例比較法が有効となる。",
    "choiceExplanations": {
      "ア": "誤り。原価法は再調達原価を求めて減価修正し、積算価格を求める手法である。収益価格や比準価格を求める手法ではない。",
      "イ": "誤り。造成地・埋立地など、再調達原価を適切に求められる土地には原価法を適用できる。土地だけなら一律に不可というものではない。",
      "ウ": "誤り。特殊な事情があっても、その事情が明らかで適切に補正できる取引事例は採用できる。",
      "エ": "正しい。類似不動産や同一需給圏内の代替競争不動産の取引事例を収集できる場合、取引事例比較法が有効となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://www.mlit.go.jp/common/001043585.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q26",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 26,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "37条書面の電子交付"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第37 条の規定により交付すべき書面に記載すべき事項を電磁的方法により提供すること（以下この問において「37 条書面の電磁的方法による提供」という。）に関する次の記述のうち、正しいものはいくつあるか。\nア　宅地建物取引業者が自ら売主として締結する売買契約において、当該契約の相手方から宅地建物取引業法施行令第3 条の4 第1 項に規定する承諾を得なければ、37 条書面の電磁的方法による提供をすることができない。\nイ　宅地建物取引業者が媒介業者として関与する売買契約について、宅地建物取引業法施行令第3 条の4 第1 項に規定する承諾を取得するための通知の中に宅地建物取引士を明示しておけば、37 条書面の電磁的方法による提供において提供に係る宅地建物取引士を明示する必要はない。\nウ　宅地建物取引業者が自ら売主として締結する売買契約において、37 条書面の電磁的方法による提供を行う場合、当該提供されたファイルへの記録を取引の相手方が出力することにより書面を作成できるものでなければならない。\nエ　宅地建物取引業者が媒介業者として関与する建物賃貸借契約について、37 条書面の電磁的方法による提供を行う場合、当該提供するファイルに記録された記載事項について、改変が行われていないかどうかを確認することができる措置を講じなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ウ",
    "explanation": "正しいのはア・ウ・エの三つ。電子交付への承諾と、実際の提供時に必要な措置を別々に確認する。\n\nア：正しい。契約の相手方から、所定の方法による承諾を得て電子交付する必要がある。\n\nイ：誤り。事前通知に宅建士名を載せても、実際の提供時にその提供に係る宅建士を明示する必要はなくならない。\n\nウ：正しい。受領した記録を出力して書面を作成できる必要がある。\n\nエ：正しい。電子ファイルの内容が改変されていないか確認できる措置が必要となる。",
    "choiceExplanations": {
      "ア": "誤り。「一つ」を選ぶ肢。正しいのはア・ウ・エの三つ。電子交付への承諾と、実際の提供時に必要な措置を別々に確認する。",
      "イ": "誤り。「二つ」を選ぶ肢。正しいのはア・ウ・エの三つ。電子交付への承諾と、実際の提供時に必要な措置を別々に確認する。",
      "ウ": "正答。「三つ」を選ぶ肢。正しいのはア・ウ・エの三つ。電子交付への承諾と、実際の提供時に必要な措置を別々に確認する。",
      "エ": "誤り。「四つ」を選ぶ肢。正しいのはア・ウ・エの三つ。電子交付への承諾と、実際の提供時に必要な措置を別々に確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007",
      "https://laws.e-gov.go.jp/law/339CO0000000383_20230401_504CO0000000351"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q27",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 27,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "建物状況調査"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第34 条の2 第1 項第4 号に規定する建物状況調査（以下この問において「建物状況調査」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "建物状況調査とは、建物の構造耐力上主要な部分又は雨水の浸入を防止する部分として国土交通省令で定めるものの状況の調査であって、経年変化その他の建物に生じる事象に関する知識及び能力を有する者として国土交通省令で定める者が実施するものをいう。",
      "イ": "宅地建物取引業者が建物状況調査を実施する者のあっせんを行う場合、建物状況調査を実施する者は建築士法第2 条第1 項に規定する建築士であって国土交通大臣が定める講習を修了した者でなければならない。",
      "ウ": "既存住宅の売買の媒介を行う宅地建物取引業者が売主に対して建物状況調査を実施する者のあっせんを行った場合、宅地建物取引業者は売主から報酬とは別にあっせんに係る料金を受領することはできない。",
      "エ": "既存住宅の貸借の媒介を行う宅地建物取引業者は、宅地建物取引業法第37 条の規定により交付すべき書面に建物の構造耐力上主要な部分等の状況について当事者の双方が確認した事項を記載しなければならない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。誤り。建物の構造耐力上主要な部分等について双方が確認した事項は、売買・交換の37条書面の記載事項である。貸借の37条書面の必要事項ではない。宅建業法37条。",
    "choiceExplanations": {
      "ア": "正しい。対象は構造耐力上主要な部分や雨水浸入防止部分等であり、省令所定の知識・能力を持つ者が行う調査である。宅建業法34条の2第1項4号。",
      "イ": "正しい。調査実施者は建築士であり、国土交通大臣が定める既存住宅状況調査技術者講習の修了が必要となる。宅建業法施行規則15条の8。",
      "ウ": "正しい。媒介契約に伴う調査実施者のあっせんについて、通常の媒介報酬とは別のあっせん料を受け取ることはできない。",
      "エ": "誤り。建物の構造耐力上主要な部分等について双方が確認した事項は、売買・交換の37条書面の記載事項である。貸借の37条書面の必要事項ではない。宅建業法37条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q28",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 28,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "不当な勧誘"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａの業務に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定に違反するものはいくつあるか。\nア　Ａの従業員Ｂが、Ｃが所有する戸建住宅の買取りを目的とした訪問勧誘をＣに対して行ったところ、Ｃから「契約の意思がないので今後勧誘に来ないでほしい」と言われたことから、後日、Ａは、別の従業員Ｄに同じ目的で訪問勧誘を行わせて、当該勧誘を継続した。\nイ　Ａの従業員Ｅは、Ｆが所有する戸建住宅の買取りを目的とした電話勧誘をＦに対して行った際に、不実のことと認識しながら「今後5 年以内にこの一帯は再開発されるので、急いで売却した方がよい。」と説明した。\nウ　Ａの従業員Ｇは、Ｈが所有する戸建住宅の買取りを目的とした電話勧誘をＨに対して行おうと考え、23 時頃にＨの自宅に電話をかけ、勧誘を行い、Ｈの私生活の平穏を害し、Ｈを困惑させた。\nエ　Ａは、Ｊとの間でＪが所有する戸建住宅を買い取る売買契約を締結し、法第37 条の規定に基づく書面をＪに交付したが、Ａの宅地建物取引士に、当該書面に記名のみさせ、押印させることを省略した。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ウ",
    "explanation": "違反するのはア・イ・ウの三つ。従業員を替えても、勧誘を断った相手への勧誘の継続は禁止される。\n\nア：違反する。契約しない意思を示した者に対して、別の従業員に交代して勧誘を続けることも禁止対象となる。\n\nイ：違反する。重要な事項について、虚偽であると知りながら事実と異なる説明をすることは許されない。\n\nウ：違反する。深夜の電話で私生活の平穏を害し困惑させる勧誘は、不適切な時間の勧誘として禁止される。\n\nエ：違反しない。出題時には37条書面の宅建士の押印義務は廃止されており、記名があればこの点で違反しない。",
    "choiceExplanations": {
      "ア": "誤り。「一つ」を選ぶ肢。違反するのはア・イ・ウの三つ。従業員を替えても、勧誘を断った相手への勧誘の継続は禁止される。",
      "イ": "誤り。「二つ」を選ぶ肢。違反するのはア・イ・ウの三つ。従業員を替えても、勧誘を断った相手への勧誘の継続は禁止される。",
      "ウ": "正答。「三つ」を選ぶ肢。違反するのはア・イ・ウの三つ。従業員を替えても、勧誘を断った相手への勧誘の継続は禁止される。",
      "エ": "誤り。「四つ」を選ぶ肢。違反するのはア・イ・ウの三つ。従業員を替えても、勧誘を断った相手への勧誘の継続は禁止される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q29",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 29,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "免許の欠格事由"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者Ａ社の使用人であって、Ａ社の宅地建物取引業を行う支店の代表者であるものが、道路交通法の規定に違反したことにより懲役の刑に処せられたとしても、Ａ社の免許は取り消されることはない。",
      "イ": "宅地建物取引業者Ｂ社の取締役が、所得税法の規定に違反したことにより罰金の刑に処せられたとしても、Ｂ社の免許は取り消されることはない。",
      "ウ": "宅地建物取引業者である個人Ｃが、宅地建物取引業法の規定に違反したことにより罰金の刑に処せられたとしても、Ｃの免許は取り消されることはない。",
      "エ": "宅地建物取引業者Ｄ社の非常勤の取締役が、刑法第222 条（脅迫）の罪を犯したことにより罰金の刑に処せられたとしても、Ｄ社の免許は取り消されることはない。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。正しい。所得税法違反による罰金刑は、免許の欠格となる特定の罰金刑には含まれない。懲役刑等の場合とは区別する。出題時の宅建業法5条。",
    "choiceExplanations": {
      "ア": "誤り。政令で定める使用人である支店代表者が懲役刑に処せられれば、罪名にかかわらず法定の期間は欠格に当たり、法人の免許取消事由となる。出題時の宅建業法5条・66条。",
      "イ": "正しい。所得税法違反による罰金刑は、免許の欠格となる特定の罰金刑には含まれない。懲役刑等の場合とは区別する。出題時の宅建業法5条。",
      "ウ": "誤り。宅建業法違反による罰金刑は欠格事由に当たり、免許取消しの対象となる。出題時の宅建業法5条・66条。",
      "エ": "誤り。脅迫罪の罰金刑は欠格事由に含まれる。取締役が非常勤であっても役員として判断され、法人の免許取消事由となる。出題時の宅建業法5条・66条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q30",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 30,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "営業保証金"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａ（甲県知事免許）の営業保証金に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。なお、Ａは宅地建物取引業保証協会の社員ではないものとする。\nア　Ａが免許を受けた日から6 か月以内に甲県知事に営業保証金を供託した旨の届出を行わないとき、甲県知事はその届出をすべき旨の催告をしなければならず、当該催告が到達した日から1 か月以内にＡが届出を行わないときは、その免許を取り消すことができる。\nイ　Ａは、営業保証金を供託したときは、その供託物受入れの記載のある供託書の写しを添付して、その旨を甲県知事に届け出なければならず、当該届出をした後でなければ、その事業を開始することができない。\nウ　Ａは、営業保証金が還付され、甲県知事から営業保証金が政令で定める額に不足が生じた旨の通知を受け、その不足額を供託したときは、30 日以内に甲県知事にその旨を届け出なければならない。\nエ　Ａが免許失効に伴い営業保証金を取り戻す際、供託した営業保証金につき還付を受ける権利を有する者に対し、3 か月を下らない一定期間内に申し出るべき旨を公告し、期間内にその申出がなかった場合でなければ、取り戻すことができない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ア",
    "explanation": "正しいのはイだけで、一つ。届出の時期と、取り戻し公告の期間を取り違えない。\n\nア：誤り。催告の前提は免許から6か月ではなく3か月以内に供託の届出がない場合である。\n\nイ：正しい。供託の届出には供託書の写しを添え、届出後でなければ事業を開始できない。\n\nウ：誤り。不足額を供託した後の届出は30日以内ではなく、2週間以内に行う。\n\nエ：誤り。営業保証金取り戻しの公告期間は6か月以上必要であり、3か月では足りない。",
    "choiceExplanations": {
      "ア": "正答。「一つ」を選ぶ肢。正しいのはイだけで、一つ。届出の時期と、取り戻し公告の期間を取り違えない。",
      "イ": "誤り。「二つ」を選ぶ肢。正しいのはイだけで、一つ。届出の時期と、取り戻し公告の期間を取り違えない。",
      "ウ": "誤り。「三つ」を選ぶ肢。正しいのはイだけで、一つ。届出の時期と、取り戻し公告の期間を取り違えない。",
      "エ": "誤り。「四つ」を選ぶ肢。正しいのはイだけで、一つ。届出の時期と、取り戻し公告の期間を取り違えない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q31",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 31,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "宅建業者の広告"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者がその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。なお、この問において「建築確認」とは、建築基準法第6 条第1 項の確認をいうものとする。",
    "choices": {
      "ア": "宅地又は建物の売買に関する注文を受けたときは、遅滞なくその注文をした者に対して取引態様の別を明らかにしなければならないが、当該注文者が事前に取引態様の別を明示した広告を見てから注文してきた場合においては、取引態様の別を遅滞なく明らかにする必要はない。",
      "イ": "既存の住宅に関する広告を行うときは、法第34 条の2 第1 項第4 号に規定する建物状況調査を実施しているかどうかを明示しなければならない。",
      "ウ": "これから建築工事を行う予定である建築確認申請中の建物については、当該建物の売買の媒介に関する広告をしてはならないが、貸借の媒介に関する広告はすることができる。",
      "エ": "販売する宅地又は建物の広告に関し、著しく事実に相違する表示をした場合、監督処分の対象となるだけでなく、懲役若しくは罰金に処せられ、又はこれを併科されることもある。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。誇大広告等の禁止違反は監督処分のほか刑事罰の対象となり、懲役・罰金の併科もある。出題時の宅建業法32条・79条の2。",
    "choiceExplanations": {
      "ア": "誤り。広告で取引態様を明示していても、注文を受けたときには改めて明示する必要がある。宅建業法34条2項。",
      "イ": "誤り。建物状況調査の実施の有無等は重要事項説明の事項であり、宅建業法上、全ての広告で明示する義務を一律に課したものではない。宅建業法35条。",
      "ウ": "誤り。未完成建物の広告は、貸借の媒介でも原則として建築確認後でなければできない。確認申請中では足りない。宅建業法33条。",
      "エ": "正しい。誇大広告等の禁止違反は監督処分のほか刑事罰の対象となり、懲役・罰金の併科もある。出題時の宅建業法32条・79条の2。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q32",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 32,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "届出の期限"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が行う届出に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者Ａ（甲県知事免許）が、新たに宅地建物取引業を営む支店を甲県内に設置した場合、Ａはその日から30 日以内にその旨を甲県知事に届け出なければならない。",
      "イ": "宅地建物取引業者Ｂ（乙県知事免許）が、宅地建物取引業者ではないＣとの合併により消滅した場合、Ｂを代表する役員であった者は、その日から30 日以内にその旨を乙県知事に届け出なければならない。",
      "ウ": "宅地建物取引業者Ｄ（丙県知事免許）が、本店における専任の宅地建物取引士Ｅの退職に伴い、新たに専任の宅地建物取引士Ｆを本店に置いた場合、Ｄはその日から30 日以内にその旨を丙県知事に届け出なければならない。",
      "エ": "宅地建物取引業者Ｇ（丁県知事免許）が、その業務に関し展示会を丁県内で実施する場合、展示会を実施する場所において売買契約の締結（予約を含む。）又は売買契約の申込みの受付を行うときは、Ｇは展示会での業務を開始する日の5 日前までに展示会を実施する場所について丁県知事に届け出なければならない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。誤り。契約・申込みを扱う案内所等の届出期限は、業務開始の10日前までである。5日前では足りない。宅建業法50条2項・同法施行規則19条。",
    "choiceExplanations": {
      "ア": "正しい。同一県内に事務所を新設すると、免許申請事項の変更として30日以内の届出を要する。宅建業法9条。",
      "イ": "正しい。合併で法人が消滅した場合、代表する役員であった者が30日以内に届け出る。宅建業法11条。",
      "ウ": "正しい。事務所ごとの専任宅建士の氏名の変更は、30日以内の変更届出の対象である。宅建業法9条。",
      "エ": "誤り。契約・申込みを扱う案内所等の届出期限は、業務開始の10日前までである。5日前では足りない。宅建業法50条2項・同法施行規則19条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q33",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 33,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "重要事項説明"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第35 条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "甲宅地を所有する宅地建物取引業者Ａが、乙宅地を所有する宅地建物取引業者ではない個人Ｂと、甲宅地と乙宅地の交換契約を締結するに当たって、Ｂに対して、甲宅地に関する重要事項の説明を行う義務はあるが、乙宅地に関する重要事項の説明を行う義務はない。",
      "イ": "宅地の売買における当該宅地の引渡しの時期について、重要事項説明において説明しなければならない。",
      "ウ": "宅地建物取引業者が売主となる宅地の売買に関し、売主が買主から受領しようとする金銭のうち、買主への所有権移転の登記以後に受領するものに対して、宅地建物取引業法施行規則第16 条の4 に定める保全措置を講ずるかどうかについて、重要事項説明書に記載する必要がある。",
      "エ": "重要事項説明書の電磁的方法による提供については、重要事項説明を受ける者から電磁的方法でよいと口頭で依頼があった場合、改めて電磁的方法で提供することについて承諾を得る必要はない。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。正しい。交換の相手方Bへ説明する対象は、Bが取得する甲宅地である。Bが手放す乙宅地についてBへ説明する義務ではない。宅建業法35条。",
    "choiceExplanations": {
      "ア": "正しい。交換の相手方Bへ説明する対象は、Bが取得する甲宅地である。Bが手放す乙宅地についてBへ説明する義務ではない。宅建業法35条。",
      "イ": "誤り。宅地の引渡し時期は37条書面の記載事項であり、35条の重要事項説明の事項ではない。宅建業法35条・37条。",
      "ウ": "誤り。所有権移転登記後に受領する金銭は、ここでいう支払金・預り金の保全措置の対象から除かれる。宅建業法施行規則16条の4。",
      "エ": "誤り。電磁的方法での提供の承諾は、所定の内容を示した上で書面または電磁的方法で得る。口頭の依頼だけでは足りない。宅建業法施行令3条の3。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007",
      "https://laws.e-gov.go.jp/law/339CO0000000383_20230401_504CO0000000351"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q34",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 34,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "貸借の媒介報酬"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａ（消費税課税事業者）は貸主Ｂから建物の貸借の媒介の依頼を受け、宅地建物取引業者Ｃ（消費税課税事業者）は借主Ｄから建物の貸借の媒介の依頼を受け、ＢとＤとの間で、1 か月分の借賃を12 万円（消費税等相当額を含まない。）とする賃貸借契約（以下この問において「本件契約」という。）を成立させた場合における次の記述のうち、宅地建物取引業法の規定に違反するものはいくつあるか。\nア　本件契約が建物を住居として貸借する契約である場合に、Ｃは、媒介の依頼を受けるに当たってＤから承諾を得ないまま、132,000 円の報酬を受領した。\nイ　ＡはＢから事前に特別な広告の依頼があったので、依頼に基づく大手新聞掲載広告料金に相当する額をＢに請求し、受領した。\nウ　ＣはＤに対し、賃貸借契約書の作成費を、Ｄから限度額まで受領した媒介報酬の他に請求して受領した。\nエ　本件契約が建物を事務所として貸借する契約である場合に、報酬として、ＡはＢから132,000 円を、ＣはＤから132,000 円をそれぞれ受領した。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ウ",
    "explanation": "違反するのはア・ウ・エの三つ。報酬全体の上限は借賃1か月分に消費税を加えた13万2000円であり、業者が複数でも合計で判断する。\n\nア：違反する。居住用の貸借で事前承諾がなければ、借主一方から受けられる額は原則として借賃半月分に消費税を加えた6万6000円までである。\n\nイ：違反しない。依頼者が特に依頼した広告の実費は、通常の媒介報酬と別に受領できる。\n\nウ：違反する。契約書作成は通常の媒介業務に含まれ、報酬上限とは別に作成料を加算できない。\n\nエ：違反する。事務所用でも貸主・借主から受ける媒介報酬の合計上限は13万2000円であり、双方から各13万2000円は超過する。",
    "choiceExplanations": {
      "ア": "誤り。「一つ」を選ぶ肢。違反するのはア・ウ・エの三つ。報酬全体の上限は借賃1か月分に消費税を加えた13万2000円であり、業者が複数でも合計で判断する。",
      "イ": "誤り。「二つ」を選ぶ肢。違反するのはア・ウ・エの三つ。報酬全体の上限は借賃1か月分に消費税を加えた13万2000円であり、業者が複数でも合計で判断する。",
      "ウ": "正答。「三つ」を選ぶ肢。違反するのはア・ウ・エの三つ。報酬全体の上限は借賃1か月分に消費税を加えた13万2000円であり、業者が複数でも合計で判断する。",
      "エ": "誤り。「四つ」を選ぶ肢。違反するのはア・ウ・エの三つ。報酬全体の上限は借賃1か月分に消費税を加えた13万2000円であり、業者が複数でも合計で判断する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://www.mlit.go.jp/notice/noticedata/sgml/1970/26197000/26197000.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q35",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 35,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "クーリング・オフ"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない買主Ｂから宅地の買受けの申込みを受けた場合における宅地建物取引業法第37 条の2 の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "Ａは、仮設テント張りの案内所でＢから買受けの申込みを受けた際、以後の取引について、その取引に係る書類に関してＢから電磁的方法で提供をすることについての承諾を得た場合、クーリング・オフについて電磁的方法で告げることができる。",
      "イ": "Ａが、仮設テント張りの案内所でＢから買受けの申込みを受けた場合、Ｂは、クーリング・オフについて告げられた日から8 日以内に電磁的方法により当該申込みの撤回を申し出れば、申込みの撤回を行うことができる。",
      "ウ": "Ａが、Ａの事務所でＢから買受けの申込みを受けた場合、Ｂは、申込みの日から8 日以内に電磁的方法により当該申込みの撤回を申し出れば、申込みの撤回を行うことができる。",
      "エ": "Ａが、売却の媒介を依頼している宅地建物取引業者Ｃの事務所でＢから買受けの申込みを受けた場合、Ｂは、申込みの日から8 日以内に書面により当該申込みの撤回を申し出ても、申込みの撤回を行うことができない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。売主が媒介を依頼した宅建業者の事務所で買受けを申し込んだ場合も、法定の事務所等での申込みに当たり、クーリング・オフはできない。",
    "choiceExplanations": {
      "ア": "誤り。クーリング・オフの告知は法定の書面で行う必要がある。一般的な電子交付の承諾を得ても、電子的な告知へ置き換えられない。出題時の宅建業法37条の2。",
      "イ": "誤り。買受けの申込みの撤回・契約解除は書面による必要がある。電磁的方法で申し出るだけでは同条の撤回とならない。出題時の宅建業法37条の2。",
      "ウ": "誤り。売主業者の事務所で買受けを申し込んだ場合は、この制度の対象外である。8日以内なら場所を問わず撤回できる制度ではない。",
      "エ": "正しい。売主が媒介を依頼した宅建業者の事務所で買受けを申し込んだ場合も、法定の事務所等での申込みに当たり、クーリング・オフはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q36",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 36,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "宅建業務上の禁止行為"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業者Ａが行う業務に関して宅地建物取引業法の規定に違反するものはいくつあるか。\nア　建物の貸借の媒介に際して、賃借の申込みをした者がその撤回を申し出たので、Ａはかかった諸費用を差し引いて預り金を返還した。\nイ　Ａは、売主としてマンションの売買契約を締結するに際して、買主が手付として必要な額を今すぐには用意できないと申し出たので、手付金の分割払いを買主に提案した。\nウ　Ａは取引のあったつど、その年月日やその取引に係る宅地又は建物の所在及び面積その他必要な記載事項を帳簿に漏らさず記載し、必要に応じて紙面にその内容を表示できる状態で、電子媒体により帳簿の保存を行っている。\nエ　Ａはアンケート調査を装ってその目的がマンションの売買の勧誘であることを告げずに個人宅を訪問し、マンションの売買の勧誘をした。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ウ",
    "explanation": "違反するのはア・イ・エの三つ。電子帳簿の保存は、必要事項を記録し随時表示できるなどの要件を満たせば可能である。\n\nア：違反する。申込みの撤回に際し、預り金から業者の諸費用を一方的に差し引いて返すことはできない。\n\nイ：違反する。手付金の貸付け等により契約締結を誘引してはならず、手付の分割払いの提案もこれに当たる。\n\nウ：違反しない。記載事項を保存し、必要時に紙面等に表示できる方法であれば、電子媒体による帳簿保存も認められる。\n\nエ：違反する。勧誘目的を告げず、アンケート調査を装って訪問し契約を勧誘する行為は許されない。",
    "choiceExplanations": {
      "ア": "誤り。「一つ」を選ぶ肢。違反するのはア・イ・エの三つ。電子帳簿の保存は、必要事項を記録し随時表示できるなどの要件を満たせば可能である。",
      "イ": "誤り。「二つ」を選ぶ肢。違反するのはア・イ・エの三つ。電子帳簿の保存は、必要事項を記録し随時表示できるなどの要件を満たせば可能である。",
      "ウ": "正答。「三つ」を選ぶ肢。違反するのはア・イ・エの三つ。電子帳簿の保存は、必要事項を記録し随時表示できるなどの要件を満たせば可能である。",
      "エ": "誤り。「四つ」を選ぶ肢。違反するのはア・イ・エの三つ。電子帳簿の保存は、必要事項を記録し随時表示できるなどの要件を満たせば可能である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q37",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 37,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "従業者証明書と名簿"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "宅地建物取引業者は、非常勤役員には従業者であることを証する証明書を携帯させる必要はない。",
      "イ": "宅地建物取引業者は、その事務所ごとに従業者名簿を備えなければならないが、取引の関係者から閲覧の請求があった場合であっても、宅地建物取引業法第45 条に規定する秘密を守る義務を理由に、閲覧を拒むことができる。",
      "ウ": "宅地建物取引業者の従業者は、宅地の買受けの申込みをした者から請求があった場合には、その者が宅地建物取引業者であっても、その者に従業者であることを証する証明書を提示する必要がある。",
      "エ": "宅地建物取引業者は、従業者名簿を最終の記載をした日から5 年間保存しなければならない。"
    },
    "answer": "ウ",
    "explanation": "正答は選択肢3（ウ）。正しい。取引関係者から請求があれば従業者証明書を提示する。相手が宅建業者であることを理由とする提示義務の除外はない。宅建業法48条2項。",
    "choiceExplanations": {
      "ア": "誤り。非常勤役員も従業者に含まれ、業務に従事させる場合には従業者証明書を携帯させる必要がある。宅建業法48条。",
      "イ": "誤り。取引関係者から請求があれば従業者名簿を閲覧に供しなければならず、一般的な守秘義務を理由には拒めない。宅建業法48条4項。",
      "ウ": "正しい。取引関係者から請求があれば従業者証明書を提示する。相手が宅建業者であることを理由とする提示義務の除外はない。宅建業法48条2項。",
      "エ": "誤り。従業者名簿の保存期間は最終の記載から10年間である。通常の帳簿の保存期間と取り違えない。宅建業法施行規則17条の2。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q38",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 38,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "宅建業と宅建士"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\nア　宅地建物取引業者Ａが、自ら所有する複数の建物について、複数人に対し、反復継続して賃貸する行為は、宅地建物取引業に該当しない。\nイ　宅地建物取引士とは、宅地建物取引士資格試験に合格し、都道府県知事の登録を受けた者をいう。\nウ　建設業者Ｂが、建築請負工事の受注を目的として、業として宅地の売買の媒介を行う行為は、宅地建物取引業に該当しない。\nエ　宅地建物取引士は、宅地又は建物の取引に係る事務に必要な知識及び能力の維持向上に努めなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "イ",
    "explanation": "正しいのはア・エの二つ。自ら貸す行為と貸借の媒介、資格登録者と宅建士を区別する。\n\nア：正しい。自ら所有する建物の賃貸は、反復継続していても宅建業法上の宅建業に含まれない。\n\nイ：誤り。宅建士となるには、試験合格・登録に加えて有効な宅建士証の交付を受けている必要がある。\n\nウ：誤り。建設工事受注という目的があっても、業として宅地売買を媒介する行為は宅建業に当たる。\n\nエ：正しい。宅建士には、取引事務に必要な知識・能力の維持向上に努める義務がある。",
    "choiceExplanations": {
      "ア": "誤り。「一つ」を選ぶ肢。正しいのはア・エの二つ。自ら貸す行為と貸借の媒介、資格登録者と宅建士を区別する。",
      "イ": "正答。「二つ」を選ぶ肢。正しいのはア・エの二つ。自ら貸す行為と貸借の媒介、資格登録者と宅建士を区別する。",
      "ウ": "誤り。「三つ」を選ぶ肢。正しいのはア・エの二つ。自ら貸す行為と貸借の媒介、資格登録者と宅建士を区別する。",
      "エ": "誤り。「四つ」を選ぶ肢。正しいのはア・エの二つ。自ら貸す行為と貸借の媒介、資格登録者と宅建士を区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q39",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 39,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "手付金の保全措置"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない個人Ｂとの間で宅地の売買契約を締結する場合における手付金の保全措置に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。なお、当該契約に係る手付金は保全措置が必要なものとする。",
    "choices": {
      "ア": "Ａは、Ｂから手付金を受領した後に、速やかに手付金の保全措置を講じなければならない。",
      "イ": "Ａは、手付金の保全措置を保証保険契約を締結することにより講ずる場合、保険期間は保証保険契約が成立した時から宅地建物取引業者が受領した手付金に係る宅地の引渡しまでの期間とすればよい。",
      "ウ": "Ａは、手付金の保全措置を保証保険契約を締結することにより講ずる場合、保険事業者との間において保証保険契約を締結すればよく、保険証券をＢに交付する必要はない。",
      "エ": "Ａは、手付金の保全措置を保証委託契約を締結することにより講ずるときは、保証委託契約に基づいて銀行等が手付金の返還債務を連帯して保証することを約する書面のＢへの交付に代えて、Ｂの承諾を得ることなく電磁的方法により講ずることができる。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。正しい。保証保険の保険期間は、保険契約成立時から手付金等に係る宅地・建物の引渡しまでを対象とする。宅建業法41条1項2号。",
    "choiceExplanations": {
      "ア": "誤り。保全措置が必要な手付金等は、受領前に措置を講じなければならない。受領してから速やかに措置を取るという順序ではない。宅建業法41条・41条の2。",
      "イ": "正しい。保証保険の保険期間は、保険契約成立時から手付金等に係る宅地・建物の引渡しまでを対象とする。宅建業法41条1項2号。",
      "ウ": "誤り。保証保険契約の締結だけでは足りず、保険証券等を買主に交付する必要がある。宅建業法41条1項2号。",
      "エ": "誤り。保証を約する書面の交付に代えて電磁的方法で提供するには、買主の承諾等が必要となる。無断では置き換えられない。宅建業法41条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q40",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 40,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "専任媒介契約"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａが、ＢからＢ所有の中古住宅の売却の依頼を受け、専任媒介契約（専属専任媒介契約ではないものとする。）を締結した場合に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Ａは、当該中古住宅について購入の申込みがあったときは、遅滞なく、その旨をＢに報告しなければならないが、Ｂの希望条件を満たさない申込みだとＡが判断した場合については報告する必要はない。",
      "イ": "Ａは、法第34 条の2 第1 項の規定に基づく書面の交付後、速やかに、Ｂに対し、法第34条の2 第1 項第4 号に規定する建物状況調査を実施する者のあっせんの有無について確認しなければならない。",
      "ウ": "Ａは、当該中古住宅について法で規定されている事項を、契約締結の日から休業日数を含め7 日以内に指定流通機構へ登録する義務がある。",
      "エ": "Ａは、Ｂが他の宅地建物取引業者の媒介又は代理によって売買の契約を成立させたときの措置を法第34 条の2 第1 項の規定に基づく書面に記載しなければならない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。依頼者が他の業者の媒介・代理で契約を成立させた場合の措置は、媒介契約書面の記載事項である。宅建業法34条の2第1項。",
    "choiceExplanations": {
      "ア": "誤り。購入の申込みがあれば依頼者へ遅滞なく報告する。業者の判断で希望条件に合わない申込みを報告対象から除くことはできない。宅建業法34条の2。",
      "イ": "誤り。調査実施者のあっせんに関する事項は、媒介契約書面に記載する。書面交付後に初めて確認すればよいという順序ではない。宅建業法34条の2第1項4号。",
      "ウ": "誤り。専任媒介の指定流通機構への登録は7日以内だが、休業日数を算入しない。宅建業法施行規則15条の10。",
      "エ": "正しい。依頼者が他の業者の媒介・代理で契約を成立させた場合の措置は、媒介契約書面の記載事項である。宅建業法34条の2第1項。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068",
      "https://laws.e-gov.go.jp/law/332M50004000012_20230228_504M60000800007"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q41",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 41,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "宅建士への監督"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "甲県知事は、宅地建物取引士に対して必要な報告を求めることができるが、その対象は、甲県知事登録の宅地建物取引士であって、適正な事務の遂行を確保するために必要な場合に限られる。",
      "イ": "宅地建物取引業者Ａ（甲県知事免許）で専任の宅地建物取引士として従事しているＢ（甲県知事登録）が、勤務実態のない宅地建物取引業者Ｃ（乙県知事免許）において、自らが専任の宅地建物取引士である旨の表示がされていることを許した場合には、乙県知事は、Ｂに対し、必要な指示をすることができる。",
      "ウ": "宅地建物取引士が不正の手段により宅地建物取引士証の交付を受けた場合においては、その登録をしている都道府県知事は、情状が特に重いときは、当該宅地建物取引士の登録を消除することができる。",
      "エ": "都道府県知事は、宅地建物取引士に対して登録消除処分を行ったときは、適切な方法で公告しなければならない。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。正しい。他人に専任宅建士である旨の名義を使わせた場合、その事務を行う都道府県の知事も必要な指示をできる。宅建業法68条。",
    "choiceExplanations": {
      "ア": "誤り。知事が報告を求められる相手は、自らの登録者だけではない。当該都道府県内で事務を行う他県登録の宅建士も対象となる。宅建業法72条。",
      "イ": "正しい。他人に専任宅建士である旨の名義を使わせた場合、その事務を行う都道府県の知事も必要な指示をできる。宅建業法68条。",
      "ウ": "誤り。不正な手段で宅建士証の交付を受けた場合は、登録消除をしなければならない。情状が特に重い場合だけの任意処分ではない。宅建業法68条の2。",
      "エ": "誤り。登録消除処分について、宅建業法が業者の免許取消し等と同様の公告義務を定めているわけではない。宅建業法70条の公告対象と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q42",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 42,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "重要事項説明の相手と内容"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業法第35 条に規定する重要事項の説明に関する次の記述のうち、誤っているものはいくつあるか。\nア　宅地建物取引士は、重要事項説明をする場合、取引の相手方から請求されなければ、宅地建物取引士証を相手方に提示する必要はない。\nイ　売主及び買主が宅地建物取引業者ではない場合、当該取引の媒介業者は、売主及び買主に重要事項説明書を交付し、説明を行わなければならない。\nウ　宅地の売買について売主となる宅地建物取引業者は、買主が宅地建物取引業者である場合、重要事項説明書を交付しなければならないが、説明を省略することはできる。\nエ　宅地建物取引業者である売主は、宅地建物取引業者ではない買主に対して、重要事項として代金並びにその支払時期及び方法を説明しなければならない。",
    "choices": {
      "ア": "一つ",
      "イ": "二つ",
      "ウ": "三つ",
      "エ": "四つ"
    },
    "answer": "ウ",
    "explanation": "誤っているのはア・イ・エの三つ。説明・書面交付・宅建士証の提示の義務を分けて考える。\n\nア：誤り。重要事項説明の際は、請求がなくても宅建士証を提示しなければならない。\n\nイ：誤り。売買の媒介で35条の説明を受けるのは取得する買主であり、売主にも同じ重要事項説明を行う義務があるわけではない。\n\nウ：正しい。買主が宅建業者なら重要事項説明は省略できるが、重要事項説明書の交付義務は残る。\n\nエ：誤り。代金・支払時期・方法は37条書面の記載事項であり、35条の重要事項説明事項ではない。",
    "choiceExplanations": {
      "ア": "誤り。「一つ」を選ぶ肢。誤っているのはア・イ・エの三つ。説明・書面交付・宅建士証の提示の義務を分けて考える。",
      "イ": "誤り。「二つ」を選ぶ肢。誤っているのはア・イ・エの三つ。説明・書面交付・宅建士証の提示の義務を分けて考える。",
      "ウ": "正答。「三つ」を選ぶ肢。誤っているのはア・イ・エの三つ。説明・書面交付・宅建士証の提示の義務を分けて考える。",
      "エ": "誤り。「四つ」を選ぶ肢。誤っているのはア・イ・エの三つ。説明・書面交付・宅建士証の提示の義務を分けて考える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q43",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 43,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "37条書面"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａが媒介により宅地の売買契約を成立させた場合における宅地建物取引業法第37 条の規定により交付すべき書面（以下この問において「37 条書面」という。）に関する次の記述のうち、正しいものはどれか。",
    "choices": {
      "ア": "Ａは、買主が宅地建物取引業者であるときは、37 条書面に移転登記の申請時期を記載しなくてもよい。",
      "イ": "Ａは、37 条書面を売買契約成立前に、各当事者に交付しなければならない。",
      "ウ": "Ａは、37 条書面を作成したときは、専任の宅地建物取引士をして37 条書面に記名させる必要がある。",
      "エ": "Ａは、天災その他不可抗力による損害の負担に関する定めがあるときは、その内容を37条書面に記載しなければならない。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。天災その他不可抗力による損害の負担を定めた場合、その内容を記載する。定めがある場合の任意的記載事項である。宅建業法37条1項。",
    "choiceExplanations": {
      "ア": "誤り。売買の37条書面には移転登記の申請時期を記載する。買主が宅建業者であっても省略できない。宅建業法37条1項4号。",
      "イ": "誤り。37条書面は契約成立後、遅滞なく交付する。契約成立前の重要事項説明書と区別する。宅建業法37条1項。",
      "ウ": "誤り。記名するのは宅建士であればよく、当該業者の専任宅建士に限られない。宅建業法37条3項。",
      "エ": "正しい。天災その他不可抗力による損害の負担を定めた場合、その内容を記載する。定めがある場合の任意的記載事項である。宅建業法37条1項。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q44",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 44,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "保証協会"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "保証協会の社員は、自らが取り扱った宅地建物取引業に係る取引の相手方から当該取引に関する苦情について解決の申出が保証協会にあり、保証協会から関係する資料の提出を求められたときは、正当な理由がある場合でなければ、これを拒んではならない。",
      "イ": "保証協会は、社員がその一部の事務所を廃止したことに伴って弁済業務保証金分担金を当該社員に返還しようとするときは、弁済業務保証金の還付請求権者に対し、一定期間内に認証を受けるため申し出るべき旨の公告を行わなければならない。",
      "ウ": "保証協会は、宅地建物取引業者の相手方から、社員である宅地建物取引業者の取り扱った宅地建物取引業に係る取引に関する損害の還付請求を受けたときは、直ちに弁済業務保証金から返還しなければならない。",
      "エ": "保証協会は、手付金等保管事業について国土交通大臣の承認を受けた場合、社員が自ら売主となって行う宅地又は建物の売買で、宅地の造成又は建築に関する工事の完了前における買主からの手付金等の受領について、当該事業の対象とすることができる。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。正しい。苦情解決のため保証協会が資料提出等を求めた場合、社員は正当な理由なしに拒めない。宅建業法64条の5。",
    "choiceExplanations": {
      "ア": "正しい。苦情解決のため保証協会が資料提出等を求めた場合、社員は正当な理由なしに拒めない。宅建業法64条の5。",
      "イ": "誤り。事務所の一部廃止に伴う分担金の返還では、社員資格喪失の場合と異なり、還付請求権者への認証申出の公告は不要である。宅建業法64条の11。",
      "ウ": "誤り。弁済には保証協会の認証等の手続が必要であり、請求を受けたら直ちに無条件で還付するものではない。宅建業法64条の8。",
      "エ": "誤り。手付金等保管事業は完成物件に関する仕組みであり、未完成物件の手付金等は対象とできない。宅建業法63条の3・64条の17の2。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/327AC1000000176_20220617_504AC0000000068"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q45",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 45,
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "宅建業法",
    "topicTags": [
      "宅建業法",
      "住宅瑕疵担保履行確保"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない買主Ｂに新築住宅を販売する場合に関する次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "Ａが信託会社又は金融機関の信託業務の兼営等に関する法律第1 条第1 項の認可を受けた金融機関であって、宅地建物取引業を営むものである場合、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負わない。",
      "イ": "Ａは、住宅販売瑕疵担保保証金の供託をする場合、当該住宅の売買契約を締結するまでに、Ｂに対し供託所の所在地等について、必ず書面を交付して説明しなければならず、買主の承諾を得ても書面の交付に代えて電磁的方法により提供することはできない。",
      "ウ": "Ａは、住宅販売瑕疵担保保証金の供託をする場合、当該住宅の最寄りの供託所へ住宅販売瑕疵担保保証金の供託をしなければならない。",
      "エ": "ＡＢ間の売買契約において、当該住宅の構造耐力上主要な部分に瑕疵があってもＡが瑕疵担保責任を負わない旨の特約があった場合においても、Ａは住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負う。"
    },
    "answer": "エ",
    "explanation": "正答は選択肢4（エ）。正しい。構造耐力上主要な部分等の法定の瑕疵担保責任を免れる特約は無効であり、その特約を置いても供託・保険による資力確保義務を免れない。",
    "choiceExplanations": {
      "ア": "誤り。宅建業を営む信託会社等にも新築住宅販売時の資力確保義務が及ぶ。宅建業法の一部適用除外を、この法律の義務の除外と混同しない。",
      "イ": "誤り。供託所の所在地等を契約前に説明する書面は、買主の承諾等の要件を満たせば電磁的方法で提供できる。履行確保法15条。",
      "ウ": "誤り。供託先は住宅の最寄りではなく、売主業者の主たる事務所の最寄りの供託所である。履行確保法11条。",
      "エ": "正しい。構造耐力上主要な部分等の法定の瑕疵担保責任を免れる特約は無効であり、その特約を置いても供託・保険による資力確保義務を免れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/419AC0000000066_20221001_503AC0000000048"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q46",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 46,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "住宅金融支援機構"
    ],
    "difficulty": 3,
    "question": "独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "機構は、子どもを育成する家庭又は高齢者の家庭（単身の世帯を含む。）に適した良好な居住性能及び居住環境を有する賃貸住宅の建設に必要な資金の貸付けを業務として行っている。",
      "イ": "機構は、証券化支援事業（買取型）において、新築住宅に対する貸付債権のみを買取りの対象としている。",
      "ウ": "機構は、証券化支援事業（買取型）において、ＺＥＨ（ネット・ゼロ・エネルギーハウス）及び省エネルギー性、耐震性、バリアフリー性、耐久性・可変性に優れた住宅を取得する場合に、貸付金の利率を一定期間引き下げる制度を実施している。",
      "エ": "機構は、マンション管理組合や区分所有者に対するマンション共用部分の改良に必要な資金の貸付けを業務として行っている。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。誤り。買取型の証券化支援は新築住宅だけでなく、基準を満たす中古住宅の取得に係る住宅ローンも対象となる。",
    "choiceExplanations": {
      "ア": "正しい。機構は子育て世帯や高齢者世帯等に適した賃貸住宅の建設資金への融資を扱う。一般の全ての賃貸住宅への直接融資とは区別する。住宅金融支援機構法13条。",
      "イ": "誤り。買取型の証券化支援は新築住宅だけでなく、基準を満たす中古住宅の取得に係る住宅ローンも対象となる。",
      "ウ": "正しい。出題時のフラット35S等には、省エネルギー性・耐震性等に優れた住宅の金利を一定期間引き下げる仕組みがある。",
      "エ": "正しい。マンション共用部分の改良資金に対する融資も、機構の業務に含まれる。住宅金融支援機構法13条。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://laws.e-gov.go.jp/law/417AC0000000082_20220901_504AC0000000069",
      "https://www.jhf.go.jp/loan/yushi/info/used.html",
      "https://www.flat35.com/loan/flat35s/index.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q47",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 47,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "不動産広告の表示"
    ],
    "difficulty": 3,
    "question": "宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。",
    "choices": {
      "ア": "実際には取引する意思がない物件であっても実在するものであれば、当該物件を広告に掲載しても不当表示に問われることはない。",
      "イ": "直線距離で50 m 以内に街道が存在する場合、物件名に当該街道の名称を用いることができる。",
      "ウ": "物件の近隣に所在するスーパーマーケットを表示する場合は、物件からの自転車による所要時間を明示しておくことで、徒歩による所要時間を明示する必要がなくなる。",
      "エ": "一棟リノベーションマンションについては、一般消費者に対し、初めて購入の申込みの勧誘を行う場合であっても、「新発売」との表示を行うことはできない。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。正しい。街道からの直線距離が50m以内の場合は、規約の特例により、その街道名を物件名に用いることができる。",
    "choiceExplanations": {
      "ア": "誤り。実在していても、取引する意思がない物件の広告はおとり広告に当たり得る。物件が存在することだけでは適法にならない。",
      "イ": "正しい。街道からの直線距離が50m以内の場合は、規約の特例により、その街道名を物件名に用いることができる。",
      "ウ": "誤り。近隣の商業施設までの距離・所要時間の表示は、規約所定の道路距離または徒歩所要時間等に従う。自転車所要時間だけで置き換えられない。",
      "エ": "誤り。一棟リノベーションマンションは、新たな購入申込みの勧誘を初めて行う場合等、規約の要件を満たせば「新発売」と表示できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://www.sfkoutori.or.jp/webkanri/kanri/wp-content/uploads/2019/01/h_kiyaku.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q48",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 48,
    "officialAnswerNumber": "1",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "出題時の不動産統計"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "令和3 年度宅地建物取引業法の施行状況調査（令和4 年9 月公表）によれば、令和4 年3 月末における宅地建物取引業者の全事業者数は14 万業者を超え、8 年連続で増加した。",
      "イ": "令和5 年地価公示（令和5 年3 月公表）によれば、令和4 年1 月以降の1 年間の地価について、地方圏平均では、全用途平均、住宅地、商業地のいずれも2 年連続で上昇し、工業地は6 年連続で上昇した。",
      "ウ": "建築着工統計調査報告（令和4 年計。令和5 年1 月公表）によれば、令和4 年の民間非居住建築物の着工床面積は、前年と比較すると、工場及び倉庫は増加したが、事務所及び店舗が減少したため、全体で減少となった。",
      "エ": "年次別法人企業統計調査（令和3 年度。令和4 年9 月公表）によれば、令和3 年度における不動産業の売上高営業利益率は11.1 ％と2 年連続で前年度と比べ上昇し、売上高経常利益率も12.5 ％と2 年連続で前年度と比べ上昇した。"
    },
    "answer": "ア",
    "explanation": "正答は選択肢1（ア）。誤り。令和4年3月末の宅建業者数は128,597業者で、14万業者を超えていない。8年連続増加という傾向と、業者数の水準を分けて確認する。",
    "choiceExplanations": {
      "ア": "誤り。令和4年3月末の宅建業者数は128,597業者で、14万業者を超えていない。8年連続増加という傾向と、業者数の水準を分けて確認する。",
      "イ": "正しい。令和5年地価公示では、地方圏の全用途・住宅地・商業地が2年連続、工業地が6年連続で上昇している。出題で指定された年の資料による。",
      "ウ": "正しい。令和4年の民間非居住建築物は工場・倉庫の増加に対し、事務所・店舗が減少し、全体の着工床面積は減少している。",
      "エ": "正しい。指定された令和3年度法人企業統計の不動産業では、営業利益率11.1％、経常利益率12.5％で、いずれも2年連続の上昇となっている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://www.mlit.go.jp/report/press/content/001514596.pdf",
      "https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/content/001593773.pdf",
      "https://www.mlit.go.jp/report/press/joho04_hh_001131.html",
      "https://www.mof.go.jp/pri/publication/zaikin_geppo/hyou/g846/all_846.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q49",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 49,
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "地形と地盤災害"
    ],
    "difficulty": 3,
    "question": "土地に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "自然堤防の後背湿地側の縁は、砂が緩く堆積していて、地下水位も浅いため、地震時に液状化被害が生じやすい地盤である。",
      "イ": "谷底低地に軟弱層が厚く堆積している所では、地震動が凝縮されて、震動が小さくなる。",
      "ウ": "1923 年の関東地震の際には、東京の谷底低地で多くの水道管や建物が被害を受けた。",
      "エ": "大都市の近郊の丘陵地では、丘を削り谷部に盛土し造成宅地が造られたが、盛土造成に際しては、地下水位を下げるため排水施設を設け、締め固める等の必要がある。"
    },
    "answer": "イ",
    "explanation": "正答は選択肢2（イ）。誤り。厚い軟弱層を持つ谷底低地では、地震動が増幅しやすい。「凝縮されて小さくなる」という説明は逆である。",
    "choiceExplanations": {
      "ア": "正しい。緩く堆積した砂と浅い地下水位の組合せは、地震時の液状化が起こりやすい条件となる。自然堤防の後背湿地側の縁にも注意する。",
      "イ": "誤り。厚い軟弱層を持つ谷底低地では、地震動が増幅しやすい。「凝縮されて小さくなる」という説明は逆である。",
      "ウ": "正しい。関東地震では東京の谷底低地で水道管や建物の被害が生じており、軟弱地盤の地震被害を考える事例となる。",
      "エ": "正しい。谷埋め盛土などの造成地では、適切な排水と締固めにより地下水・地盤の不安定化を抑えることが重要となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://www.jma.go.jp/jma/kishou/know/jishin/suikei/kaisetsu.html",
      "https://dil-opac.bosai.go.jp/publication/nied_tech_note/pdf/n361.pdf"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  },
  {
    "id": "takken-2023-october-gakka-q50",
    "exam": "takken",
    "session": "gakka",
    "year": 2023,
    "season": "october",
    "qNumber": 50,
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "免除科目",
    "topicTags": [
      "免除科目",
      "鉄筋コンクリート構造"
    ],
    "difficulty": 3,
    "question": "建物の構造と材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄筋コンクリート構造は、地震や風の力を受けても、躯体の変形は比較的小さく、耐火性にも富んでいる。",
      "イ": "鉄筋コンクリート構造は、躯体の断面が大きく、材料の質量が大きいので、建物の自重が大きくなる。",
      "ウ": "鉄筋コンクリート構造では、鉄筋とコンクリートを一体化するには、断面が円形の棒鋼である丸鋼の方が表面に突起をつけた棒鋼である異形棒鋼より、優れている。",
      "エ": "鉄筋コンクリート構造は、コンクリートが固まって所定の強度が得られるまでに日数がかかり、現場での施工も多いので、工事期間が長くなる。"
    },
    "answer": "ウ",
    "explanation": "正答は選択肢3（ウ）。誤り。表面に節等を設けた異形棒鋼の方が、コンクリートとの付着・一体化に有利である。平滑な丸鋼の方が優れるという比較が逆である。",
    "choiceExplanations": {
      "ア": "正しい。鉄筋コンクリート構造は剛性が比較的高く、変形を抑えやすい。コンクリートによる耐火性も特徴である。",
      "イ": "正しい。コンクリート等の材料密度が大きく、部材断面も大きくなるため、一般に建物の自重は大きくなる。",
      "ウ": "誤り。表面に節等を設けた異形棒鋼の方が、コンクリートとの付着・一体化に有利である。平滑な丸鋼の方が優れるという比較が逆である。",
      "エ": "正しい。コンクリートの打設後には所定強度までの養生が必要であり、現場での型枠・配筋等の作業も多く、工期が長くなりやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAnswerUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "sourceAttribution": "出典：一般財団法人不動産適正取引推進機構 令和5年度宅地建物取引士資格試験 問題・正解番号表。",
    "officialReferenceUrls": [
      "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
      "https://www.jci-net.or.jp/j/concrete/kiso/rebar.html"
    ],
    "license": "RETIO-reuse",
    "needsReview": false,
    "lastUpdated": "2026-11-17",
    "lawReferenceDate": "2023-04-01"
  }
];
