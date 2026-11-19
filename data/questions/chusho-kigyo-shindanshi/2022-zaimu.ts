import type { Question } from "@/lib/questions/types";

export const CHUSHO_2022_B_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 1,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "銀行勘定調整表",
    "topicTags": [
      "銀行勘定調整表"
    ],
    "difficulty": 3,
    "question": "以下の資料に基づき、決算日の調整後の当座預金勘定残高として、最も適切なものを下記の解答群から選べ。\n【資料】当店の決算日現在の当座預金勘定残高は 500,000 円であったが、銀行から受け取った残高証明書の残高は 480,000 円であったので、不一致の原因を調査したところ、次の事実が判明した。\n① 仕入先銀座商店へ買掛金 80,000 円の支払いのために振出した小切手が、未取付であった。\n② 得意先京橋商店から売掛金 150,000 円の当座振込があったが、通知未達のため未記入である。\n③ 得意先新橋商店が振出した小切手 200,000 円を当座預金口座へ預け入れたが、いまだ取り立てられていない。\n④ 水道光熱費 50,000 円の通知が未達である。",
    "choices": {
      "ア": "520,000 円",
      "イ": "600,000 円",
      "ウ": "620,000 円",
      "エ": "720,000 円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "帳簿の500,000円に通知未達の振込150,000円を加え、未記入の水道光熱費50,000円を引く。未取付の小切手と取立て中の預入れは銀行側との時期差なので、帳簿調整後の残高は600,000円となる。",
    "choiceExplanations": {
      "ア": "未取付小切手は当社の帳簿で支払を既に記入している。通知未達の振込と公共料金を帳簿に反映すると、当座預金は520,000円ではなく600,000円になる。",
      "イ": "帳簿の500,000円に通知未達の振込150,000円を加え、未記入の水道光熱費50,000円を引く。未取付の小切手と取立て中の預入れは銀行側との時期差なので、帳簿調整後の残高は600,000円となる。",
      "ウ": "未取付小切手80,000円を帳簿で重ねて減額しない。また、当社が記録した取立て中の小切手200,000円も当社側の調整対象ではない。",
      "エ": "銀行の残高から照合すると、未取付の80,000円を引き、取立て中の200,000円を足して600,000円になる。未取付の支出を足す計算ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 2,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "増築と財政状態",
    "topicTags": [
      "増築と財政状態"
    ],
    "difficulty": 3,
    "question": "Ａ、Ｂ、Ｃの各商店は、いずれも資産 2,000 万円、負債 500 万円を有する小売業であるが、あるとき各商店ともそれぞれ 800 万円で店舗を増築した。支払いの内訳は以下のとおりである。\n・Ａ店は全額を自店の現金で支払った。\n・Ｂ店は建築費の半額を銀行より借り入れ、残額を自店の現金で支払った。\n・Ｃ店は全額、銀行からの借り入れであった。下表のア〜オのうち、増築後の各商店の財政状態を示すものとして、最も適切なものはどれか。（単位：万円）",
    "choices": {
      "ア": "Ａ店  2,000 ／ 500 ／ 1,500\nＢ店  2,000 ／ 900 ／ 1,100\nＣ店  2,800 ／ 1,300 ／ 1,500",
      "イ": "Ａ店  2,000 ／ 500 ／ 1,500\nＢ店  2,400 ／ 900 ／ 1,500\nＣ店  2,800 ／ 1,300 ／ 1,500",
      "ウ": "Ａ店  2,800 ／ － ／ 2,800\nＢ店  2,800 ／ 400 ／ 2,400\nＣ店  2,800 ／ 800 ／ 2,000",
      "エ": "Ａ店  2,800 ／ 500 ／ 1,500\nＢ店  2,800 ／ 900 ／ 1,500\nＣ店  2,800 ／ 1,300 ／ 1,500",
      "オ": "Ａ店  2,800 ／ 500 ／ 2,300\nＢ店  2,800 ／ 900 ／ 1,900\nＣ店  2,800 ／ 1,300 ／ 1,500"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "Ａは現金と建物が800万円入れ替わるため資産総額は2,000万円のままである。Ｂでは資産と負債が各400万円、Ｃでは各800万円増え、3店とも純資産は1,500万円で変わらない。",
    "choiceExplanations": {
      "ア": "Ｂは現金が400万円減り、建物が800万円増える。資産は差引400万円増加し、純資産は変わらない。",
      "イ": "Ａは現金と建物が800万円入れ替わるため資産総額は2,000万円のままである。Ｂでは資産と負債が各400万円、Ｃでは各800万円増え、3店とも純資産は1,500万円で変わらない。",
      "ウ": "増築前にあった負債500万円がなくなる取引はない。借入れのあるＢとＣはこの負債にそれぞれ400万円、800万円を加える。",
      "エ": "ＡおよびＢでは自店の現金で支払った分だけ現金が減る。増築額800万円のすべてを資産の純増額としては扱えない。",
      "オ": "増築で建物は増えるが、対価の支払いで現金が減るか負債が増える。増築だけでＡやＢの純資産が増えることはない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q2.png"
    ],
    "imageAltTexts": [
      "選択肢表。資産、負債、純資産の順で、単位は万円。ア：Ａ2,000、500、1,500、Ｂ2,000、900、1,100、Ｃ2,800、1,300、1,500。イ：Ａ2,000、500、1,500、Ｂ2,400、900、1,500、Ｃ2,800、1,300、1,500。ウ：Ａ2,800、なし、2,800、Ｂ2,800、400、2,400、Ｃ2,800、800、2,000。エ：Ａ2,800、500、1,500、Ｂ2,800、900、1,500、Ｃ2,800、1,300、1,500。オ：Ａ2,800、500、2,300、Ｂ2,800、900、1,900、Ｃ2,800、1,300、1,500。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 3,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "収益認識の時点",
    "topicTags": [
      "収益認識の時点"
    ],
    "difficulty": 3,
    "question": "収益認識のタイミングとして、最も適切なものはどれか。",
    "choices": {
      "ア": "委託販売において、商品を代理店に発送した時点",
      "イ": "割賦販売において、商品を引き渡した時点",
      "ウ": "試用販売において、試用のために商品を発送した時点",
      "エ": "予約販売において、商品の販売前に予約を受けた時点"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "割賦は代金の回収方法である。引渡しによって商品の支配が顧客に移るなら、収益は分割代金の回収時ではなくその引渡時に認識する。",
    "choiceExplanations": {
      "ア": "委託先への発送だけで最終顧客に支配が移ったわけではない。通常、委託先が顧客に販売したときに収益を認識する。",
      "イ": "割賦は代金の回収方法である。引渡しによって商品の支配が顧客に移るなら、収益は分割代金の回収時ではなくその引渡時に認識する。",
      "ウ": "試用のために送っただけでは顧客の購入が確定していない。正式な買い取りの合意などで支配が移る時点に収益を認識する。",
      "エ": "予約を受けた時点では、商品を渡すという履行義務を充足していない。予約だけでは収益を認識しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 4,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "外貨建取引",
    "topicTags": [
      "外貨建取引"
    ],
    "difficulty": 3,
    "question": "外貨建取引に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "外貨建の金銭債権・債務、前払金・前受金については、決算日の直物為替レートにより換算する。",
      "イ": "為替差損益は、原則として営業外収益または営業外費用とする。",
      "ウ": "在外支店の財務諸表項目の換算は、決算日の直物為替レートにより換算する。",
      "エ": "二取引基準とは、自国通貨と外国通貨で帳簿を作成することをいう。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "外国通貨建ての金銭債権・債務を決算時や決済時のレートで換算すると為替差損益が生じる。通常は営業外収益または営業外費用に計上する。",
    "choiceExplanations": {
      "ア": "外貨建金銭債権・債務は原則として決算時レートを使用する。物品等の受渡しで決済する前払金・前受金は金銭債権・債務と同じには扱わない。",
      "イ": "外国通貨建ての金銭債権・債務を決算時や決済時のレートで換算すると為替差損益が生じる。通常は営業外収益または営業外費用に計上する。",
      "ウ": "在外支店は本店と一体として扱い、項目の性質によって換算に用いる為替レートを使い分ける。全項目を決算時レートで一律換算する方式ではない。",
      "エ": "二取引基準は売買などの取引と、その外貨建金銭債権・債務の決済を分け、為替変動の影響を為替差損益にする考え方である。二つの通貨で帳簿を作ることではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 5,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "無形固定資産",
    "topicTags": [
      "無形固定資産"
    ],
    "difficulty": 3,
    "question": "貸借対照表における無形固定資産に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "受注制作のソフトウェアについても償却を行う。",
      "イ": "人的資産は無形固定資産に含まれる。",
      "ウ": "のれんは減損処理の対象となる。",
      "エ": "無形固定資産の償却には定額法と定率法がある。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "買収などで計上したのれんは、日本基準では規則的に償却するとともに、必要に応じて減損の判定・処理の対象となる。",
    "choiceExplanations": {
      "ア": "受注制作のソフトウェアは顧客への提供のために制作する。受注品の制作原価を自社利用のソフトウェアと同様に無形固定資産として償却するわけではない。",
      "イ": "従業員の知識や技能は企業にとって価値があるが、通常、企業が支配して資産計上する無形固定資産とは扱わない。",
      "ウ": "買収などで計上したのれんは、日本基準では規則的に償却するとともに、必要に応じて減損の判定・処理の対象となる。",
      "エ": "日本では無形固定資産は一般に定額法で償却する。有形固定資産のように定額法と定率法の双方を使えるという一般化は適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 6,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "非原価項目",
    "topicTags": [
      "非原価項目"
    ],
    "difficulty": 3,
    "question": "原価計算における非原価項目として、最も適切なものはどれか。ただし、すべて正常なものであるとする。",
    "choices": {
      "ア": "売上債権に対する貸倒引当金繰入",
      "イ": "減価償却費",
      "ウ": "仕損、減損、棚卸減耗損",
      "エ": "支払利息"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "支払利息は資金調達に伴う財務費用であり、製品の製造や販売のための原価計算には通常含めない。営業活動で生じた売上債権の正常な貸倒れの見積りは、販売費及び一般管理費に含まれる。正常・経常的な費用の区分である。",
    "choiceExplanations": {
      "ア": "営業活動で生じた売上債権の正常な貸倒れの見積りは、販売費及び一般管理費に含まれる。正常・経常的な費用の区分である。",
      "イ": "製造設備を正常に利用することに伴う減価償却費は製造原価に含まれる。販売部門等の固定資産であればその部門の経費となる。",
      "ウ": "正常な製造過程で生じる仕損や減損は原価として扱う。通常生じる棚卸減耗も、異常な損失とは区別する。",
      "エ": "支払利息は資金調達に伴う財務費用であり、製品の製造や販売のための原価計算には通常含めない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 7,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "繰越欠損金と税効果",
    "topicTags": [
      "繰越欠損金と税効果"
    ],
    "difficulty": 3,
    "question": "当社は資本金 1 億円以下の中小法人に該当する。当期 400 万円の繰越欠損金を計上した。そのときの仕訳として、最も適切なものはどれか（単位：万円）。なお、法人税の実効税率は 30 ％とする。",
    "choices": {
      "ア": "（借）繰越利益剰余金 120 （貸）繰越欠損金 120",
      "イ": "（借）繰越利益剰余金 400 （貸）繰越欠損金 400",
      "ウ": "（借）繰延税金資産 120 （貸）法人税等調整額 120",
      "エ": "（借）法人税等調整額 120 （貸）繰延税金負債 120"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "繰越欠損金の利用により、将来の課税所得が減ることが見込まれる。回収可能とすると400万円×30％の繰延税金資産を借方、法人税等調整額を貸方に記録する。",
    "choiceExplanations": {
      "ア": "120万円は欠損金の税効果の額である。税務上の繰越欠損金と会計上の繰越利益剰余金を直接相殺する仕訳ではない。",
      "イ": "400万円は税務上繰り越される欠損金の額である。将来の税負担の軽減額は、税率を掛けた120万円になる。",
      "ウ": "繰越欠損金の利用により、将来の課税所得が減ることが見込まれる。回収可能とすると400万円×30％の繰延税金資産を借方、法人税等調整額を貸方に記録する。",
      "エ": "繰越欠損金は将来の税金を増やすのではなく減らし得る項目である。税効果を認識するなら繰延税金負債ではなく資産となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 8,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "給与支払と預り金",
    "topicTags": [
      "給与支払と預り金"
    ],
    "difficulty": 3,
    "question": "従業員の給料・賞与支払時に「預り金」として処理するものとして、最も不適切なものはどれか。",
    "choices": {
      "ア": "源泉所得税",
      "イ": "事業主負担の社会保険料",
      "ウ": "社内預金",
      "エ": "従業員負担の生命保険料"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "企業が自ら負担する社会保険料は従業員からの預り金ではない。会社負担分は法定福利費として処理する。給与の一部を従業員の社内預金として会社が保管する場合、会社に返還義務があり、給与支払時の預り項目として扱う。",
    "choiceExplanations": {
      "ア": "源泉所得税は従業員の給与から控除して、企業が税務署へ納付する。納付までは従業員から預かった金額として記録する。",
      "イ": "企業が自ら負担する社会保険料は従業員からの預り金ではない。会社負担分は法定福利費として処理する。",
      "ウ": "給与の一部を従業員の社内預金として会社が保管する場合、会社に返還義務があり、給与支払時の預り項目として扱う。",
      "エ": "給与から差し引く従業員負担分の保険料を会社が保険会社へ納付するなら、納付までは従業員からの預り金となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 9,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "退職給付会計",
    "topicTags": [
      "退職給付会計"
    ],
    "difficulty": 3,
    "question": "退職給付会計に関する記述として、最も不適切なものはどれか。",
    "choices": {
      "ア": "退職給付会計における年金資産とは、制度に基づいて積み立てられた年金資産だけでなく、一定の要件を満たした外部積立の資産も年金資産とみなしている。",
      "イ": "退職給付会計における費用は、「退職給付費用」として企業の損益計算書に計上される。",
      "ウ": "退職給付制度が終了した場合、資産の減少を伴って退職給付債務が減少する。",
      "エ": "年金資産および年金債務は両建てで貸借対照表に表示されなければならない。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "退職給付債務から年金資産を控除した額を基に、退職給付に係る負債または資産を表示する。対応する債務と年金資産を必ず両建てするわけではない。",
    "choiceExplanations": {
      "ア": "所定の要件を満たす退職給付信託など、制度の外部に積み立てた資産も年金資産に含まれ得る。",
      "イ": "退職給付に係る当期の費用は損益計算書に退職給付費用として計上する。債務の残高を表示する貸借対照表とは役割が異なる。",
      "ウ": "退職給付制度が終了して給付金の支払いなどで債務が消滅すれば、それに応じて支出した資産も減少する。",
      "エ": "退職給付債務から年金資産を控除した額を基に、退職給付に係る負債または資産を表示する。対応する債務と年金資産を必ず両建てするわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 10,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "自己株式",
    "topicTags": [
      "自己株式"
    ],
    "difficulty": 3,
    "question": "自己株式の会計処理に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "自己株式の取得は、他社の株式を取得する場合と同様に処理される。",
      "イ": "自己株式の取得は純資産の減少、自己株式の売却は純資産の増加として処理する。",
      "ウ": "自己株式を消却した場合、その他利益剰余金が減少する。",
      "エ": "自己株式を消却した場合、資産が減少する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "自己株式を取得すると純資産から控除する額が増える。自己株式を売却して対価を受ける場合は資本取引として純資産が増える。",
    "choiceExplanations": {
      "ア": "他社の株式は通常、取得する企業にとっての資産である。自己株式は自社株主への資本の払戻しに関わり、純資産の控除項目として扱う。",
      "イ": "自己株式を取得すると純資産から控除する額が増える。自己株式を売却して対価を受ける場合は資本取引として純資産が増える。",
      "ウ": "自己株式を消却した際は、原則として消却する自己株式の帳簿価額をその他資本剰余金から減額する。その他利益剰余金の減少が原則ではない。",
      "エ": "自己株式は取得したときから資産として計上していない。帳簿上の消却だけで資産の減少が生じるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 11,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "直接控除法と減価償却",
    "topicTags": [
      "直接控除法と減価償却"
    ],
    "difficulty": 3,
    "question": "当期は X5 年 4 月 1 日から X6 年 3 月 31 日の 1 年間である。決算整理前の機械勘定の残高は 216,000 円であるが、当期より直接控除法から間接控除法に記帳方法を変更する。この機械は X1 年 4 月 1 日に取得したものであり、耐用年数 10 年、残存価額をゼロとする定額法により減価償却を行っている。この機械の取得原価として、最も適切なものはどれか。",
    "choices": {
      "ア": "216,000 円",
      "イ": "237,600 円",
      "ウ": "360,000 円",
      "エ": "432,000 円"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "X1年度からX4年度までの4年分で、取得原価の40％を償却済みである。残った60％が216,000円なので、取得原価は216,000÷0.6＝360,000円となる。",
    "choiceExplanations": {
      "ア": "216,000円は決算整理前の帳簿価額であり、直接控除法でそれまでの減価償却額を取得原価から控除した後の額である。",
      "イ": "取得から当期首まで4年の償却が終わっている。取得原価の60％に当たる216,000円から、取得原価を逆算する必要がある。",
      "ウ": "X1年度からX4年度までの4年分で、取得原価の40％を償却済みである。残った60％が216,000円なので、取得原価は216,000÷0.6＝360,000円となる。",
      "エ": "432,000円は帳簿価額が取得原価の50％とした場合の値である。当期の減価償却は決算整理前なので、償却済みなのは4年分である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q12-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 12,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "直接原価計算と損益分岐点",
    "topicTags": [
      "直接原価計算と損益分岐点"
    ],
    "difficulty": 3,
    "question": "当工場では、単一製品Ｘを製造・販売している。以下の資料に基づいて、下記の設問に答えよ。\n【資料】当期における実績値は次のとおりであった。また、当期の生産量は 1,000 個、販売量は 800 個（単価 1,000 円）であり、仕掛品および期首製品は存在しない。\n\n（設問1）\n直接原価計算を採用した場合の営業利益として、最も適切なものはどれか。",
    "choices": {
      "ア": "△ 30,000 円",
      "イ": "0円",
      "ウ": "70,000 円",
      "エ": "110,000 円"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "1個当たり変動製造費は240＋160＋100＝500円であり、変動販売費100円を加えると変動費は600円になる。800個の限界利益320,000円から固定費250,000円を引くと70,000円である。",
    "choiceExplanations": {
      "ア": "直接原価計算による変動費は、販売した800個に対応する製造・販売変動費である。販売量分の限界利益から固定費を引くと赤字にはならない。",
      "イ": "1個の限界利益は1,000－500－100＝400円である。800個分の限界利益320,000円は固定費250,000円を上回る。",
      "ウ": "1個当たり変動製造費は240＋160＋100＝500円であり、変動販売費100円を加えると変動費は600円になる。800個の限界利益320,000円から固定費250,000円を引くと70,000円である。",
      "エ": "固定製造費を在庫200個にも配賦すると、その分の費用が繰り延べられて110,000円となる。直接原価計算では固定製造費全額を当期費用にする。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q12.png"
    ],
    "imageAltTexts": [
      "1個当たり直接材料費240円、直接労務費160円、変動製造間接費100円、変動販売費100円。固定製造間接費200,000円、固定販売費・一般管理費50,000円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q12-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 12,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "直接原価計算と損益分岐点",
    "topicTags": [
      "直接原価計算と損益分岐点"
    ],
    "difficulty": 3,
    "question": "当工場では、単一製品Ｘを製造・販売している。以下の資料に基づいて、下記の設問に答えよ。\n【資料】当期における実績値は次のとおりであった。また、当期の生産量は 1,000 個、販売量は 800 個（単価 1,000 円）であり、仕掛品および期首製品は存在しない。\n\n（設問2）\n損益分岐点売上高として、最も適切なものはどれか。",
    "choices": {
      "ア": "400,000 円",
      "イ": "500,000 円",
      "ウ": "625,000 円",
      "エ": "800,000 円"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "限界利益率は1－600/1,000＝40％である。固定費250,000円を0.4で割ると、損益分岐点売上高は625,000円になる。",
    "choiceExplanations": {
      "ア": "販売価格に対する限界利益の割合は40％である。売上400,000円の限界利益160,000円では固定費に足りない。",
      "イ": "固定費は製造分200,000円と販売・管理分50,000円を合算する。売上500,000円に限界利益率40％を掛けても固定費を賄えない。",
      "ウ": "限界利益率は1－600/1,000＝40％である。固定費250,000円を0.4で割ると、損益分岐点売上高は625,000円になる。",
      "エ": "800,000円は設問の実績売上高で、限界利益から固定費を引いても利益が残る。損益分岐点は固定費を限界利益でちょうど賄う売上高である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q12.png"
    ],
    "imageAltTexts": [
      "1個当たり直接材料費240円、直接労務費160円、変動製造間接費100円、変動販売費100円。固定製造間接費200,000円、固定販売費・一般管理費50,000円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q13-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 13,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "資金繰り表",
    "topicTags": [
      "資金繰り表"
    ],
    "difficulty": 3,
    "question": "次の文章を読んで、下記の設問に答えよ。Ａ社では、X1 年 4 月末に以下のような資金繰り表（一部抜粋）を作成した（表中のカッコ内は各自推測すること）。また、条件は以下のとおりである。\n① 売上代金の 20 ％は現金で受け取り、残額は翌月末に受け取る。\n② 仕入高は翌月予想売上高の 60 ％とする。仕入代金は全額現金で支払う。\n③ すべての収入、支出は月末時点で発生するものとする。\n④ 5 月末に事務用備品の購入支出が 300 万円予定されているが、それを除き、経常収支以外の収支はゼロである。\n⑤ Ａ社では、月末時点で資金残高が 200 万円を下回らないようにすることを、資金管理の方針としている。\n\n（設問1）\nＡ社は資金不足に陥ることを避けるため、金融機関から借り入れを行うことを検討している。 6 月末の時点で資金残高が 200 万円を下回らないようにするには、いくら借り入れればよいか。最も適切なものを選べ。ただし、借入金の利息は年利率 5 ％であり、 1 年分の利息を借入時に支払うものとする。",
    "choices": {
      "ア": "190 万円",
      "イ": "200 万円",
      "ウ": "460 万円",
      "エ": "660 万円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "6月の仕入960万円と諸費用540万円を収入1,040万円から差し引くと460万円の赤字であり、月末は10万円になる。200万円まで必要な190万円を手元に得るには、190÷0.95＝200万円を借り入れる。",
    "choiceExplanations": {
      "ア": "190万円は利息を支払った後に手元に必要な額である。額面を190万円にすると、借入時に支払う利息分だけ不足する。",
      "イ": "6月の仕入960万円と諸費用540万円を収入1,040万円から差し引くと460万円の赤字であり、月末は10万円になる。200万円まで必要な190万円を手元に得るには、190÷0.95＝200万円を借り入れる。",
      "ウ": "460万円は6月の経常収支の赤字額である。5月末残高470万円を使えるので、調達すべき手取り額は190万円になる。",
      "エ": "660万円は6月の赤字460万円に必要な期末残高200万円を足した額である。5月末残高470万円も考慮して不足額を計算する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q13.png"
    ],
    "imageAltTexts": [
      "5月、6月の金額を万円で示す。前月末残高は1,000、470。現金売上は200、240。売掛金回収は800、800。収入合計は1,000、1,040。現金仕入は720、空欄。諸費用支払は510、540。支出合計は1,230、空欄。収支過不足は－230、空欄。備品購入支出は300、0。当月末残高は470、空欄。売上高は4月実績1,000万円、5月予想1,000万円、6月予想1,200万円、7月予想1,600万円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q13-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 13,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "資金繰り表",
    "topicTags": [
      "資金繰り表"
    ],
    "difficulty": 3,
    "question": "次の文章を読んで、下記の設問に答えよ。Ａ社では、X1 年 4 月末に以下のような資金繰り表（一部抜粋）を作成した（表中のカッコ内は各自推測すること）。また、条件は以下のとおりである。\n① 売上代金の 20 ％は現金で受け取り、残額は翌月末に受け取る。\n② 仕入高は翌月予想売上高の 60 ％とする。仕入代金は全額現金で支払う。\n③ すべての収入、支出は月末時点で発生するものとする。\n④ 5 月末に事務用備品の購入支出が 300 万円予定されているが、それを除き、経常収支以外の収支はゼロである。\n⑤ Ａ社では、月末時点で資金残高が 200 万円を下回らないようにすることを、資金管理の方針としている。\n\n（設問2）\n中小企業診断士であるあなたは、Ａ社の経営者から、当座の資金繰り対策として銀行借り入れ以外の手段がないか、アドバイスを求められた。 6 月末の時点で資金残高が 200 万円を下回らないようにするための手段として、最も適切なものはどれか。",
    "choices": {
      "ア": "5 月に予定されている事務用備品の購入支出のうち半額を現金払いとし、残額の支払いは 7 月に延期する。",
      "イ": "6 月に予定されている諸費用支払のうち 400 万円を現金払いとし、残額の支払いは 7 月に延期する。",
      "ウ": "仕入先と交渉して、 6 月の仕入代金のうち半額を現金払いとし、残額を買掛金（翌月末払い）とする。",
      "エ": "得意先と交渉して、 5 月の売上代金のうち半額を現金で受け取り、残額を売掛金（翌月末回収）とする。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "6月の現金仕入960万円の半分を翌月払いにすれば、6月末の資金残高が480万円増える。元の10万円と合わせた490万円は基準の200万円以上である。",
    "choiceExplanations": {
      "ア": "5月の備品代の半分150万円を延期すると、6月末残高は10万円から160万円になる。目標の200万円には届かない。",
      "イ": "6月の諸費用540万円のうち140万円を7月に回せる。6月末は150万円となり目標を下回る。",
      "ウ": "6月の現金仕入960万円の半分を翌月払いにすれば、6月末の資金残高が480万円増える。元の10万円と合わせた490万円は基準の200万円以上である。",
      "エ": "5月代金を多く前倒ししても、その分だけ6月に回収する5月の売掛金が減る。6月末までに回収する総額に変化はない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q13.png"
    ],
    "imageAltTexts": [
      "5月、6月の金額を万円で示す。前月末残高は1,000、470。現金売上は200、240。売掛金回収は800、800。収入合計は1,000、1,040。現金仕入は720、空欄。諸費用支払は510、540。支出合計は1,230、空欄。収支過不足は－230、空欄。備品購入支出は300、0。当月末残高は470、空欄。売上高は4月実績1,000万円、5月予想1,000万円、6月予想1,200万円、7月予想1,600万円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 14,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "元利金の割引現在価値",
    "topicTags": [
      "元利金の割引現在価値"
    ],
    "difficulty": 3,
    "question": "Ｂ社は以下のような条件で、取引先に貸し付けを行った。割引率を 4 ％としたとき、貸付日における現在価値として、最も適切なものを下記の解答群から選べ。\n① 貸付日は 2020 年 7 月 1 日、貸付期間は 5 年であり、満期日の 2025 年 6 月 30 日に元本 200 万円が返済されることになっている。\n② 2021〜2025 年の毎年 6 月 30 日に、利息として元本の 5 ％である 10 万円が支払われる。\n③ 期間 5 年のときの複利現価係数と年金現価係数は以下のとおりである。",
    "choices": {
      "ア": "200.1 万円",
      "イ": "201.3 万円",
      "ウ": "207.7 万円",
      "エ": "208.9 万円"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "満期元本は200万円×0.822、利息は毎年10万円なので10万円×4.452である。合計の現在価値は208.92万円となる。",
    "choiceExplanations": {
      "ア": "200.1万円は年5％を割引率として元本と利息を割り引いた場合の丸め値である。指定された割引率は4％である。",
      "イ": "元本と毎年の利息のどちらも4％の係数により割り引く。得られる現在価値は200×0.822＋10×4.452である。",
      "ウ": "207.7万円は元本を4％、利息を5％の係数で割り引いた金額に近い。指定された割引率4％を両方に用いる必要がある。",
      "エ": "満期元本は200万円×0.822、利息は毎年10万円なので10万円×4.452である。合計の現在価値は208.92万円となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q14.png"
    ],
    "imageAltTexts": [
      "5年の複利現価係数、年金現価係数の順で、割引率4％では0.822と4.452、5％では0.784と4.329。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 15,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "ポートフォリオの分散",
    "topicTags": [
      "ポートフォリオの分散"
    ],
    "difficulty": 3,
    "question": "Ｃ社では、以下の証券Ｙと証券Ｚに等額ずつ分散投資するポートフォリオで運用することを検討している。証券Ｙと証券Ｚの収益率の相関係数がゼロのとき、ポートフォリオの収益率の標準偏差として、最も適切なものを下記の解答群から選べ。ただし、√15≒3.9、√30≒5.5、√125≒11.2、√250≒15.8 である。",
    "choices": {
      "ア": "3.9 ％",
      "イ": "5.5 ％",
      "ウ": "11.2 ％",
      "エ": "15.8 ％"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "相関がゼロなので、分散は0.5²×10²＋0.5²×20²＝125となる。平方根は約11.2％である。",
    "choiceExplanations": {
      "ア": "リターンの分散には両証券の標準偏差の二乗を使う。相関がゼロなので共分散項を0とし、分散125の平方根を求める。",
      "イ": "分散には投資比率の二乗を掛ける。ＹだけでなくＺの分散20²も半分の投資比率に対応させてモデルに入れる。",
      "ウ": "相関がゼロなので、分散は0.5²×10²＋0.5²×20²＝125となる。平方根は約11.2％である。",
      "エ": "15.8％に対応する分散250は、各証券の分散に比率0.5を1回だけ掛けた値である。分散には投資比率の二乗を掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q15.png"
    ],
    "imageAltTexts": [
      "証券Ｙの期待収益率は3％、標準偏差は10％。証券Ｚの期待収益率は6％、標準偏差は20％。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 16,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "効率的フロンティア",
    "topicTags": [
      "効率的フロンティア"
    ],
    "difficulty": 3,
    "question": "以下の図は、すべてのリスク資産と安全資産により実行可能な投資機会を表している。投資家のポートフォリオ選択に関する記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "安全資産が存在しない場合、効率的フロンティアは曲線 ABCD である。",
      "イ": "安全資産が存在しない場合、投資家のリスク回避度にかかわらず、リスク資産の最適なポートフォリオは点Ｃになる。",
      "ウ": "安全資産が存在する場合、投資家のリスク回避度が高いほど、リスク資産の最適なポートフォリオは曲線 BCD 上の点Ｄ寄りに位置する。",
      "エ": "安全資産が存在する場合で、かつ資金の借り入れができないならば、効率的フロンティアは FCD を結んだ線となる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "借入れができなければ、安全資産Ｆと接点Ｃを結ぶ部分では安全資産を非負の比率で保有する。Ｃより高リスク側では危険資産のみの効率的な部分ＣＤを選ぶ。",
    "choiceExplanations": {
      "ア": "安全資産がなければ、期待収益率が同じで標準偏差が高い組合せを除く。ＡからＢの下側の部分はＢより低い期待収益率で効率的でない。",
      "イ": "危険資産だけで運用する場合、最適点はリスクの好みによって効率的な曲線上で異なる。一律で接点Ｃに定まらない。",
      "ウ": "安全資産があると、リスクをより避ける投資家は安全資産の比率を高める。危険資産だけの構成を高リスクの点Ｄに近づけるわけではない。",
      "エ": "借入れができなければ、安全資産Ｆと接点Ｃを結ぶ部分では安全資産を非負の比率で保有する。Ｃより高リスク側では危険資産のみの効率的な部分ＣＤを選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q16.png"
    ],
    "imageAltTexts": [
      "縦軸は期待収益率、横軸は標準偏差。リスク資産の組合せを表す曲線の左端は点Ｂで、Ｂの下側にＡ、上側にＣ、Ｄがある。標準偏差ゼロの点Ｆから伸びる直線はＣで曲線に接し、点Ｅに伸びる。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 17,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "サステナブル成長率",
    "topicTags": [
      "サステナブル成長率"
    ],
    "difficulty": 3,
    "question": "以下の資料に基づき計算したサステナブル成長率（内部留保のみを事業に投資した場合の純資産の成長率）として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "2％",
      "イ": "3％",
      "ウ": "8％",
      "エ": "12 ％"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ROEは200÷1,000＝20％、内部留保率は(200－80)÷200＝60％である。サステナブル成長率はその積の12％となる。",
    "choiceExplanations": {
      "ア": "純利益200万円に対し配当は80万円なので、内部留保は120万円である。これを純資産1,000万円に対する割合にする。",
      "イ": "3％は内部留保120万円を総資産4,000万円で割った値である。設問が求める純資産の成長率では、分母に純資産を使う。",
      "ウ": "8％は配当80万円を純資産1,000万円で割った値である。実際に事業に残るのは純利益から配当を差し引いた120万円である。",
      "エ": "ROEは200÷1,000＝20％、内部留保率は(200－80)÷200＝60％である。サステナブル成長率はその積の12％となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-zaimu-q17.png"
    ],
    "imageAltTexts": [
      "売上高5,000万円、当期純利益200万円、総資産4,000万円、純資産1,000万円、配当80万円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 18,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "割引超過利益モデル",
    "topicTags": [
      "割引超過利益モデル"
    ],
    "difficulty": 3,
    "question": "企業価値評価における割引超過利益モデルに関する記述として、最も不適切なものはどれか。",
    "choices": {
      "ア": "クリーン・サープラス関係が成り立つ場合、配当性向が高いほど株式価値は高くなる。",
      "イ": "クリーン・サープラス関係が成り立つ場合、配当割引モデルから割引超過利益モデルを導出することができる。",
      "ウ": "将来の配当がゼロの場合でも株式価値を求めることができる。",
      "エ": "毎期の予想利益が、自己資本に自己資本コストを乗じた額を上回るならば、株式価値は当期自己資本簿価を上回る。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "クリーン・サープラス関係のもとでは、配当で自己資本簿価が減る一方、内部留保は将来の利益や配当に影響する。配当性向が高いというだけで株式価値が上がるとはいえない。",
    "choiceExplanations": {
      "ア": "クリーン・サープラス関係のもとでは、配当で自己資本簿価が減る一方、内部留保は将来の利益や配当に影響する。配当性向が高いというだけで株式価値が上がるとはいえない。",
      "イ": "純利益と配当により自己資本簿価が変わる関係を使うと、配当を割り引く式を期首簿価と将来の超過利益の現在価値に変形できる。",
      "ウ": "当期の簿価と将来の超過利益に基づいて株式価値を計算できるので、将来の特定期間の配当がゼロでも評価できる。",
      "エ": "予想利益が自己資本に対する資本コストを上回る部分が超過利益である。各期の超過利益が正なら、株式価値は簿価より高い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 19,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "非上場株式の評価",
    "topicTags": [
      "非上場株式の評価"
    ],
    "difficulty": 3,
    "question": "非上場会社の株式評価の方法に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "時価純資産方式では、対象会社が事業を継続することを前提とする場合、再調達時価を用いるべきである。",
      "イ": "収益還元方式は、将来獲得すると期待される売上高を割り引いた現在価値に基づき、株式評価を行う方法である。",
      "ウ": "簿価純資産方式は、客観性に優れた株式評価方式のため他の方式よりも優先して適用されるべきである。",
      "エ": "類似業種比準方式とは、対象会社に類似する非上場会社の過去の買収事例をベースに株式評価を行う方法である。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "継続企業として資産を使い続ける前提なら、同じ機能を持つ資産を取得する再調達時価が評価に使える。換金を前提とする処分時価とは目的が異なる。",
    "choiceExplanations": {
      "ア": "継続企業として資産を使い続ける前提なら、同じ機能を持つ資産を取得する再調達時価が評価に使える。換金を前提とする処分時価とは目的が異なる。",
      "イ": "収益還元方式で還元するのは将来期待される利益などの収益力である。費用を控除する前の売上高をそのまま割り引く方法ではない。",
      "ウ": "簿価は財務諸表から把握できるが、資産の時価や収益力を十分に反映するとは限らない。常に他の評価方式に優先するわけではない。",
      "エ": "類似業種比準方式では類似業種の上場会社等の株価を参照し、利益・配当・純資産などを比較する。過去の個別買収価格に基づく評価とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 20,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "先物と先渡し",
    "topicTags": [
      "先物と先渡し"
    ],
    "difficulty": 3,
    "question": "先物取引および先渡取引に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "先物価格と現物価格の差は、満期日までの長さとは関連がない。",
      "イ": "先物取引では取引金額を上回る額の証拠金を差し入れる必要がある。",
      "ウ": "先物取引における建玉は、清算値段により日々値洗いされる。",
      "エ": "先渡取引は、先物取引と異なり、ヘッジ目的に用いられることはない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "取引所の先物取引では、その日の清算値段に基づいて建玉を評価し直し、損益を日々精算する。先渡契約で将来の取引価格を固定すれば、現物価格や為替の変動を抑えられる。先渡取引もヘッジに用いられる。",
    "choiceExplanations": {
      "ア": "先物と現物の価格差には、満期まで資産を持つための金利や保管費、資産から得る収入などが影響する。満期までの期間と無関係ではない。",
      "イ": "証拠金は値動きに伴う損失等に備える担保で、通常、先物の想定元本の一部を差し入れる。取引金額を超える必要はない。",
      "ウ": "取引所の先物取引では、その日の清算値段に基づいて建玉を評価し直し、損益を日々精算する。",
      "エ": "先渡契約で将来の取引価格を固定すれば、現物価格や為替の変動を抑えられる。先渡取引もヘッジに用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 21,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "投資の評価基準",
    "topicTags": [
      "投資の評価基準"
    ],
    "difficulty": 3,
    "question": "投資の評価基準に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 回収期間が短いほど、内部収益率は高くなる。\nｂ 回収期間法では、回収後のキャッシュフローを無視している。\nｃ 正味現在価値法では、投資によって生じる毎年のキャッシュフローの符号が複数回変化する場合、異なるいくつかの値が得られる場合がある。\nｄ 内部収益率法を用いて相互排他的投資案を判定すると、企業価値の最大化をもたらさないことがある。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｃ",
      "ウ": "ｂとｃ",
      "エ": "ｂとｄ",
      "オ": "ｃとｄ"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "回収期間法は投資額を取り戻した後の収入を考慮しない。相互排他的な案では投資規模や収入時期の違いのため、内部収益率が高い案と正味現在価値が大きい案が異なる場合がある。",
    "choiceExplanations": {
      "ア": "回収期間法で回収後のキャッシュフローを考慮しないｂは正しい。回収期間が短くても、その後の収益次第で内部収益率は低くなり得る。",
      "イ": "回収期間と内部収益率の順位が必ず一致するわけではない。符号が何度も変わるときに複数の解が出る可能性は内部収益率法の課題である。",
      "ウ": "回収期間法は回収後のキャッシュフローを無視する。正味現在価値は所定の割引率で一つに定まり、複数の候補が出るのは内部収益率の場合である。",
      "エ": "回収期間法は投資額を取り戻した後の収入を考慮しない。相互排他的な案では投資規模や収入時期の違いのため、内部収益率が高い案と正味現在価値が大きい案が異なる場合がある。",
      "オ": "内部収益率法で相互排他的な案の選択を誤る可能性はある。正味現在価値法は割引率を先に定めるので、複数の値が生じるというｃは誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 22,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "リスクと現在価値",
    "topicTags": [
      "リスクと現在価値"
    ],
    "difficulty": 3,
    "question": "リスクがある場合の割引現在価値の計算に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "確実性等価法で用いる割引率は資本コストである。",
      "イ": "確実性等価法は、将来キャッシュフローの期待値をその不確実性が大きいほど、高めに見積もる方法である。",
      "ウ": "リスク調整割引率法とは、割引率からリスク・プレミアムを差し引いて、現在価値を求める方法である。",
      "エ": "リスク調整割引率法におけるリスク・プレミアムは、将来キャッシュフローが不確実であるほど大きくなる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "リスク調整割引率法では、将来のキャッシュフローに係るリスクが高いほど大きいプレミアムを割引率に上乗せする。現在価値はその分小さくなる。",
    "choiceExplanations": {
      "ア": "確実性等価法ではキャッシュフローの側でリスクを調整する。調整後の金額はリスクフリー・レートで割り引く。",
      "イ": "確実性等価法は不確実なキャッシュフローを、同等とみなす確実な金額に置き換える。リスク回避を前提にするとリスクが高いほど確実な金額を低く評価する。",
      "ウ": "リスク調整割引率法ではリスクフリー・レートにリスク・プレミアムを加える。高い割引率で将来キャッシュフローを割り引く。",
      "エ": "リスク調整割引率法では、将来のキャッシュフローに係るリスクが高いほど大きいプレミアムを割引率に上乗せする。現在価値はその分小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-zaimu-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 23,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "配当政策",
    "topicTags": [
      "配当政策"
    ],
    "difficulty": 3,
    "question": "配当政策に関する記述として、最も適切なものはどれか。ただし、他の条件は一定とする。",
    "choices": {
      "ア": "1 株当たり配当金額を一定にする政策では、当期の利益額にかかわらず配当性向は変わらない。",
      "イ": "自己資本配当率（配当額÷期首自己資本）を一定にする政策では、当期の利益額にかかわらず 1 株当たり配当金額は変わらない。",
      "ウ": "当期の利益額のうち投資に必要な支出分を留保し、残余を配当する政策では、当期の利益額にかかわらず配当性向は変わらない。",
      "エ": "配当性向を一定にする政策では、当期の利益額にかかわらず自己資本配当率（配当額÷期首自己資本）は変わらない。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "自己資本配当率を一定にすると配当総額は期首自己資本に比例して決まる。期首自己資本と株式数などの条件を一定とすると、今期の利益が変動しても1株当たり配当額は変わらない。",
    "choiceExplanations": {
      "ア": "株式数が一定なら1株当たり配当額を一定にすると配当総額も一定となる。利益が変われば、配当総額を利益で割った配当性向は変わる。",
      "イ": "自己資本配当率を一定にすると配当総額は期首自己資本に比例して決まる。期首自己資本と株式数などの条件を一定とすると、今期の利益が変動しても1株当たり配当額は変わらない。",
      "ウ": "投資に必要な留保額を差し引く残余配当では、利益の額に対する配当の比率が変化し得る。通常、配当性向が一定にはならない。",
      "エ": "配当性向を一定にすると配当額は当期純利益に応じて変わる。期首自己資本が不変なら、自己資本配当率も変化する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/B1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  }
];
