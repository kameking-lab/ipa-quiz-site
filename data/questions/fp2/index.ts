import type { Question } from "@/lib/questions/types";
import academic2024And2025 from "./academic-2024-2025.json";
import academic2026May from "./academic-2026-may.json";

/** 2026年5月公表・学科の問1〜10（ライフプラン分野）。2026-09-23 照合。 */
const FP2_2026_PILOT_QUESTIONS: Question[] = [
  {
    "id": "fp2-2026-published-gakka-q1",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "6つの係数",
      "積立"
    ],
    "difficulty": 2,
    "question": "ライフプランの作成の際に活用される各種係数に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "現在保有する資金を一定期間、一定の利率で複利運用した場合の一定期間経過後の元利合計額を試算する際、現在保有する資金の額に乗じる係数は、現価係数である。",
      "イ": "毎年一定の積立額を一定期間、一定の利率で複利運用した場合の一定期間経過後の元利合計額を試算する際、毎年の積立額に乗じる係数は、年金現価係数である。",
      "ウ": "一定の利率で複利運用しながら一定期間経過後に目標とする額を得るために必要な毎年一定の積立額を試算する際、目標とする額に乗じる係数は、減債基金係数である。",
      "エ": "一定の利率で複利運用しながら一定期間、毎年一定金額を受け取るために必要な元本を試算する際、毎年受け取りたい金額に乗じる係数は、資本回収係数である。"
    },
    "answer": "ウ",
    "explanation": "目標額から毎年の積立額を逆算する場合は減債基金係数を使います。現在の一括資金を将来額にする終価係数、毎年の積立額を将来額にする年金終価係数、定額の受取りを支える元本を求める年金現価係数と区別します。 年利率をr、年数をn、毎年末の積立額をaとすると、目標額はa×{(1+r)^n−1}/rです。したがって毎年の積立額は目標額×r/{(1+r)^n−1}となり、後半が減債基金係数です（rが0の場合は1/n）。",
    "choiceExplanations": {
      "ア": "誤りです。一括の現在資金を将来の元利合計に変換するのは終価係数です。現価係数は将来の額から現在必要な元本を逆算するときに使います。",
      "イ": "誤りです。毎年の積立額から将来の累計額を求めるのは年金終価係数です。年金現価係数は、将来の定期的な受取額を現在の元本に換算します。",
      "ウ": "適切な記述で、本問の正解です。目標額に減債基金係数を掛けると、一定利率で運用しながら目標を達成する毎年の積立額が求められます。",
      "エ": "誤りです。毎年の受取額から必要な元本を求めるのは年金現価係数です。資本回収係数は反対に、現在の元本から毎年取り崩せる額を求めます。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q2",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "健康保険",
      "出産育児一時金"
    ],
    "difficulty": 2,
    "question": "全国健康保険協会管掌健康保険（協会けんぽ）の保険給付に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "70歳未満の被保険者が医療機関において診察や薬剤の支給などの療養の給付を受ける場合、原則として、被保険者が支払う一部負担金（自己負担額）の割合は３割である。",
      "イ": "傷病手当金の支給期間は、同一の疾病または負傷およびこれにより発した疾病に関して、その支給を始めた日から通算して最長で１年６カ月間である。",
      "ウ": "70歳未満の被保険者が同一月内に同一の医療機関で支払った医療費の一部負担金等の額のうち、高額療養費の額の算定にあたって合算の対象となるものは、原則として、入院・外来、医科・歯科別に２万1,000円以上のものである。",
      "エ": "夫婦がともに被保険者である場合において、妻が出産したときは、所定の手続により、妻に対して出産育児一時金が支給され、夫に対して家族出産育児一時金が支給される。"
    },
    "answer": "エ",
    "explanation": "不適切なのはエです。妻自身が被保険者として出産育児一時金を受ける場合、同じ出産について夫が家族出産育児一時金を重ねて受け取ることはできません。家族出産育児一時金は被扶養者の出産について支給されるものです。",
    "choiceExplanations": {
      "ア": "適切な記述なので、本問の正解ではありません。70歳未満の被保険者本人の療養の給付について、原則の自己負担割合は3割です。",
      "イ": "適切な記述です。同一傷病等の傷病手当金は、支給開始日から通算して最長1年6カ月です。途中で就労等により不支給の期間があっても、単に開始から暦で1年6カ月ではありません。",
      "ウ": "適切な記述です。70歳未満の高額療養費では、原則として同月・同一人・医療機関ごとに入院と外来、医科と歯科を分け、自己負担2万1,000円以上を合算対象とします。",
      "エ": "不適切な記述で、本問の正解です。妻は自身の健康保険の被保険者であり、夫の被扶養者ではありません。同じ出産について妻への出産育児一時金と夫への家族出産育児一時金を二重に受給できません。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html",
      "https://www.mhlw.go.jp/stf/newpage_22308.html",
      "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q3",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "雇用保険",
      "基本手当"
    ],
    "difficulty": 2,
    "question": "雇用保険の基本手当に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "雇用保険の一般被保険者が正当な理由のない自己都合で離職した場合、基本手当を受給するためには、離職の日以前２年間に被保険者期間が通算して12カ月以上なければならない。",
      "イ": "特定受給資格者等を除く一般の受給資格者に支給される基本手当の所定給付日数は、算定基礎期間が20年以上である場合、150日である。",
      "ウ": "基本手当は、原則として、４週間に１回、求職の申込みを行った公共職業安定所において失業の認定を受けた日分について支給される。",
      "エ": "基本手当日額の算定の基礎となる賃金日額は、原則として、離職の日以前６カ月間に支払われた賃金および賞与の総額を180で除して得た額である。"
    },
    "answer": "エ",
    "explanation": "不適切なのはエです。賃金日額は原則として離職直前6カ月の毎月決まって支払われた賃金を合計し、180で割って求めます。賞与等は除きます。「6カ月・180」という数値が正しくても、賞与を含める点が誤りです。",
    "choiceExplanations": {
      "ア": "適切な記述です。正当な理由のない自己都合離職では、原則として離職前2年間に被保険者期間が通算12カ月以上必要です。倒産・解雇等の特定受給資格者等の要件とは区別します。",
      "イ": "適切な記述です。特定受給資格者等を除く一般の受給資格者では、算定基礎期間が20年以上の場合の所定給付日数は150日です。",
      "ウ": "適切な記述です。原則として4週間に1回、ハローワークで失業認定を受け、その認定対象となる失業の日について基本手当が支給されます。",
      "エ": "不適切な記述で、本問の正解です。算定に用いる6カ月の賃金には、賞与等を含めません。賞与を加えると賃金日額を過大に計算することになります。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.hellowork.mhlw.go.jp/insurance/insurance_basicbenefit.html"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q4",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "国民年金",
      "学生納付特例"
    ],
    "difficulty": 2,
    "question": "国民年金の学生納付特例制度に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "国民年金の第１号被保険者である学生が学生納付特例制度を利用するためには、学生が属する世帯の年収（所得）が世帯人数に応じて定められた基準額以下でなければならない。",
      "イ": "学生納付特例制度の利用申請にあたって、適用を受ける期間を６カ月から24カ月までの範囲内で選択することができる。",
      "ウ": "学生納付特例制度の適用を受けた期間に係る保険料のうち、追納することができる保険料は、追納に係る厚生労働大臣の承認を受けた日の属する月前10年以内の期間に係るものに限られる。",
      "エ": "学生納付特例制度の適用を受けた期間は、その期間に係る保険料の追納がない場合、保険料全額免除期間として、その期間の月数の２分の１に相当する月数が老齢基礎年金の年金額に反映される。"
    },
    "answer": "ウ",
    "explanation": "適切なのはウです。学生納付特例の承認期間については、承認月前10年以内の保険料を追納できます。学生納付特例は納付の猶予であり、追納しない期間は受給資格期間には入りますが、老齢基礎年金額の計算には反映されません。",
    "choiceExplanations": {
      "ア": "誤りです。学生納付特例の所得審査は学生本人の所得で行い、世帯全体や家族の所得の多寡では判定しません。",
      "イ": "誤りです。原則として4月から翌年3月までの年度単位で申請します。6〜24カ月の任意の期間を選べる仕組みではなく、複数年度分は年度ごとに申請します。",
      "ウ": "適切な記述で、本問の正解です。追納は追納承認月前10年以内の期間が対象です。承認を受けた期間の翌年度から数えて3年度目以降に追納する場合には加算額がつきます。",
      "エ": "誤りです。学生納付特例期間は保険料全額免除期間とは異なります。追納しなければ老齢基礎年金の年金額には反映されません。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/stf/nenkin_shikumi_002.html",
      "https://www.mhlw.go.jp/content/04_nenkin_20230331.pdf"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q5",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "在職老齢年金",
      "繰下げ受給"
    ],
    "difficulty": 2,
    "question": "在職老齢年金に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "厚生年金保険の被保険者に支給される老齢厚生年金は、当該被保険者の総報酬月額相当額と基本月額の合計額が支給停止調整額を超える場合、在職老齢年金の仕組みにより、その超える金額が支給停止となる。",
      "イ": "在職老齢年金の仕組みにより老齢厚生年金の全部が支給停止される場合、老齢基礎年金の支給も停止される。",
      "ウ": "厚生年金保険の被保険者が老齢厚生年金の繰下げ支給の申出をする場合、老齢厚生年金の年金額のうち、在職老齢年金の仕組みにより支給停止となる部分の金額は、支給を繰り下げたことによる増額の対象とならない。",
      "エ": "厚生年金保険の適用事業所に常時使用される70歳以上の者に支給される老齢厚生年金は、在職老齢年金の仕組みによる支給調整は行われない。"
    },
    "answer": "ウ",
    "explanation": "適切なのはウです。在職老齢年金によって支給停止となる部分は繰下げ増額の対象になりません。支給停止の対象は老齢厚生年金であり、老齢基礎年金は対象外です。本問は2025年4月1日基準で解き、年度ごとに変わる支給停止調整額と制度の仕組みを分けて確認します。",
    "choiceExplanations": {
      "ア": "誤りです。基本月額と総報酬月額相当額の合計が支給停止調整額を超えると、原則として超過額の2分の1が支給停止額です。超過額の全額ではありません。",
      "イ": "誤りです。在職老齢年金で老齢厚生年金が全額支給停止になっても、老齢基礎年金はこの仕組みによる支給停止の対象になりません。",
      "ウ": "適切な記述で、本問の正解です。在職老齢年金により支給停止となる額を除いた部分が繰下げ増額の対象です。働いていて本来支給されない部分を繰り下げて増やすことはできません。",
      "エ": "誤りです。70歳以上でも厚生年金の適用事業所で働く人には、在職老齢年金による支給調整が行われます。被保険者資格の年齢と支給調整の対象は同じではありません。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/stf/nenkin_shikumi_010.html",
      "https://www.mhlw.go.jp/stf/nenkin_shikumi_011.html"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q6",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "障害年金",
      "障害認定日"
    ],
    "difficulty": 2,
    "question": "公的年金の障害給付に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "障害基礎年金および障害厚生年金における障害認定日とは、原則として、障害の原因となった傷病の初診日から１年を経過した日である。",
      "イ": "国民年金の被保険者ではない20歳前の期間に初診日のある傷病を原因とする障害については、20歳以後の障害の状態の程度にかかわらず、障害基礎年金は支給されない。",
      "ウ": "障害厚生年金の受給権を取得した者が、その者によって生計を維持されている65歳未満の配偶者を有する場合、受給権者の障害の状態の程度にかかわらず、障害厚生年金に加給年金額が加算される。",
      "エ": "障害厚生年金の額について、当該障害厚生年金の支給事由となった障害に係る障害認定日の属する月後における厚生年金保険の被保険者であった期間は、その計算の基礎とされない。"
    },
    "answer": "エ",
    "explanation": "適切なのはエです。障害厚生年金額の算定では、その障害認定日の属する月後の被保険者期間は計算の基礎に含めません。障害認定日の原則は初診日から1年6カ月であり、障害等級により給付や加給年金の扱いも異なります。",
    "choiceExplanations": {
      "ア": "誤りです。障害認定日は原則として初診日から1年6カ月を経過した日です。その前に傷病が治った場合（症状固定等）はその日となる場合があります。1年ではありません。",
      "イ": "誤りです。年金未加入の20歳前に初診日がある場合でも、20歳到達時等に所定の障害等級1級・2級の状態なら障害基礎年金の対象になり得ます。本人の所得による支給制限があります。",
      "ウ": "誤りです。配偶者加給年金額の加算は障害厚生年金1級・2級が対象で、3級にはありません。所定の配偶者要件があっても「障害の程度にかかわらず」は誤りです。",
      "エ": "適切な記述で、本問の正解です。当該障害認定日の属する月後の厚生年金被保険者期間は、障害厚生年金の計算に算入しません。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/stf/nenkin_shikumi_012.html"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q7",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "iDeCo",
      "確定拠出年金"
    ],
    "difficulty": 2,
    "question": "確定拠出年金の個人型年金に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "個人型年金加入者が国民年金の第３号被保険者である場合、掛金の拠出限度額は年額27万6,000円である。",
      "イ": "個人型年金加入者は、原則として、拠出する掛金の額を、１年（12月分の掛金から翌年11月分の掛金）につき１回、変更することができる。",
      "ウ": "個人型年金は、運用実績によって将来受け取る年金額が変動するが、個人型年金加入者が拠出した掛金合計額は最低保証されている。",
      "エ": "個人型年金加入者が60歳から老齢給付金を受給するためには、通算加入者等期間が10年以上なければならない。"
    },
    "answer": "ウ",
    "explanation": "不適切なのはウです。iDeCoの受取額は掛金と運用成果によって決まり、制度全体として掛金合計額が最低保証されるわけではありません。元本確保型の商品と、元本割れの可能性がある投資信託等を区別します。",
    "choiceExplanations": {
      "ア": "適切な記述です。本問の基準日で、第3号被保険者の掛金上限は月2万3,000円で、年額では27万6,000円です。",
      "イ": "適切な記述です。掛金額の変更は、原則として12月分から翌年11月分までの1年につき1回です。掛金額変更と運用商品の変更を混同しないでください。",
      "ウ": "不適切な記述で、本問の正解です。iDeCoには元本割れの可能性がある商品もあり、制度として拠出掛金合計額の最低保証はありません。",
      "エ": "適切な記述です。60歳から老齢給付金を受け取るには、通算加入者等期間が10年以上必要です。10年未満の場合、加入期間に応じて受給開始可能年齢が後ろになります。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/kouteki_nenkin_simulator_guide/ideco/",
      "https://www.mhlw.go.jp/content/12500000/001230769.pdf"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q8",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "企業年金",
      "所得控除"
    ],
    "difficulty": 2,
    "question": "企業年金等に係る税金に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "確定拠出年金の企業型年金において企業型年金加入者が拠出した掛金（マッチング拠出により拠出した掛金）は、所得税の小規模企業共済等掛金控除の対象となる。",
      "イ": "中小企業退職金共済において事業主が支払った掛金は、被共済者である従業員の給与所得として所得税の課税対象となる。",
      "ウ": "小規模企業共済において個人事業主が支払った掛金は、事業所得の金額の計算上、必要経費となる。",
      "エ": "確定拠出年金の個人型年金において個人型年金加入者が一括で受け取った老齢給付金は、一時所得として所得税の課税対象となる。"
    },
    "answer": "ア",
    "explanation": "適切なのはアです。企業型確定拠出年金で加入者本人が拠出するマッチング拠出の掛金は、小規模企業共済等掛金控除の対象です。掛金支払い時の所得控除と、給付受取時の所得区分を分けて判断します。",
    "choiceExplanations": {
      "ア": "適切な記述で、本問の正解です。企業型年金加入者掛金は小規模企業共済等掛金控除の対象で、本人が支払った掛金が所得控除されます。",
      "イ": "誤りです。中小企業退職金共済の事業主負担掛金は、拠出時に従業員の給与所得として課税されません。退職金を受け取る際の課税とは別です。",
      "ウ": "誤りです。個人事業主本人の小規模企業共済掛金は、事業の必要経費ではなく小規模企業共済等掛金控除として扱います。",
      "エ": "誤りです。iDeCoの老齢給付金を一括の一時金で受け取る場合は、原則として退職所得です。一時所得とは区分が異なります。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1135.htm",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/hojin/5231.htm",
      "https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2725.htm"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q9",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "住宅ローン",
      "フラット35"
    ],
    "difficulty": 2,
    "question": "住宅金融支援機構と金融機関が提携した住宅ローンであるフラット35（買取型）に関する次の記述のうち、最も不適切なものはどれか。",
    "choices": {
      "ア": "フラット35の融資期間は、原則として、申込者が80歳になるまでの年数と35年のいずれか短い年数が上限となる。",
      "イ": "フラット35の資金使途は、新築住宅の建設・購入資金または中古住宅の購入資金とされており、投資用物件など第三者に賃貸する目的で取得する住宅の建設・購入資金も対象となる。",
      "ウ": "フラット35を利用する場合、住宅金融支援機構が、対象となる住宅や敷地について第１順位の抵当権者となる。",
      "エ": "フラット35の利用者向けインターネットサービスである「住・ＭｙＮｏｔｅ」を利用して一部繰上げ返済をする場合、繰上返済手数料は不要で、返済することができる額は10万円以上である。"
    },
    "answer": "イ",
    "explanation": "不適切なのはイです。フラット35は本人または親族が住む住宅のための融資で、第三者に賃貸する投資用物件の取得には利用できません。借入期間・抵当権・繰上返済条件と、対象となる資金使途を分けて覚えます。",
    "choiceExplanations": {
      "ア": "適切な記述です。原則の返済期間上限は、80歳までの年数と35年のうち短い年数です。申込時年齢の端数処理等の詳細は公式条件で確認します。",
      "イ": "不適切な記述で、本問の正解です。投資用物件や第三者に賃貸する目的の住宅には利用できません。自己居住用等の資金使途の条件があります。",
      "ウ": "適切な記述です。買取型では、対象の住宅と敷地に住宅金融支援機構を抵当権者とする第1順位の抵当権を設定します。",
      "エ": "適切な記述です。「住・My Note」を使う一部繰上返済は10万円以上から可能で、繰上返済手数料はかかりません。金融機関窓口での最低額とは区別します。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/report/interview/daijin190507.html",
      "https://www.mlit.go.jp/common/001201075.pdf"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  },
  {
    "id": "fp2-2026-published-gakka-q10",
    "exam": "fp2",
    "session": "gakka",
    "year": 2026,
    "season": "published",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "ライフプランニングと資金計画",
    "topicTags": [
      "資金調達",
      "ABL"
    ],
    "difficulty": 2,
    "question": "中小企業の資金調達方法の一般的な特徴に関する次の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "企業が金融機関から直接融資を受けて資金を調達する方法は直接金融に分類され、企業が株式や債券の発行により市場を経由して資金を調達する方法は間接金融に分類される。",
      "イ": "インパクトローンは、企業が金融機関から外貨建ての融資を受けて資金を調達する方法であり、その資金使途は、海外事業の展開・再編に係るものに限られる。",
      "ウ": "ＡＢＬ（アセット・ベースト・レンディング）は、企業が保有する売掛債権や在庫・機械設備等の資産を担保として金融機関から融資を受けて資金を調達する方法である。",
      "エ": "第三者割当増資は、特定の既存株主に限定して新株引受権を与え、新たに株式を発行して資金を調達する方法である。"
    },
    "answer": "ウ",
    "explanation": "適切なのはウです。ABLは、売掛債権や在庫・機械設備などの動産・債権を担保にする融資です。銀行借入れと市場からの調達の分類、外貨借入れ、増資の割当先の違いを整理します。",
    "choiceExplanations": {
      "ア": "誤りです。金融機関からの借入れは間接金融、株式や債券を発行して市場から調達する方法は直接金融です。記述は両者が逆です。",
      "イ": "誤りです。インパクトローンは使途を特定しない外貨建て融資で、海外事業の展開・再編に用途を限定するものではありません。",
      "ウ": "適切な記述で、本問の正解です。ABLは不動産だけに依存せず、売掛債権や在庫・機械設備等を担保として活用する資金調達です。",
      "エ": "誤りです。第三者割当増資は特定の第三者へ新株を割り当てる方法で、既存株主に限定されません。既存株主へ持株数に応じて割り当てる株主割当増資とは区別します。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAnswerUrl": "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf",
    "sourceAttribution": "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。",
    "officialReferenceUrls": [
      "https://www.meti.go.jp/policy/economy/keiei_innovation/sangyokinyu/index.html"
    ],
    "license": "JAFP-reuse-with-attribution",
    "lawReferenceDate": "2025-04-01",
    "lastUpdated": "2026-09-23"
  }
];

/**
 * 2026年5月公表・学科。問1〜10に、問11以降で照合済みの連続範囲（academic-2026-may.json）を続ける。
 * 照合記録は docs/evidence/fp2-2026-may/receipts/。HOLD以降は収録しない。
 */
const FP2_2026_MAY_QUESTIONS: Question[] = [
  ...FP2_2026_PILOT_QUESTIONS,
  ...academic2026May as Question[],
];

/** 2026年5月公表 学科（全60問）のうち収録済みの範囲。表示文言は必ずここから作る。 */
export const FP2_2026_MAY_COVERAGE = (() => {
  const numbers = FP2_2026_MAY_QUESTIONS.map((q) => q.qNumber);
  const last = numbers.length;
  if (numbers.some((n, index) => n !== index + 1)) {
    throw new Error(`FP2 2026年5月公表の収録範囲が連続していません: ${numbers.join(",")}`);
  }
  return {
    total: 60,
    count: numbers.length,
    last,
    complete: last === 60,
    label: last === 60 ? "全60問" : `60問のうち問1〜${last}`,
  };
})();

/** 2024・2025年の公式公開4回は学科240問、2026年5月公表分は FP2_2026_MAY_COVERAGE の範囲。 */
export const FP2_QUESTIONS: Question[] = [
  ...FP2_2026_MAY_QUESTIONS,
  ...academic2024And2025 as Question[],
];
