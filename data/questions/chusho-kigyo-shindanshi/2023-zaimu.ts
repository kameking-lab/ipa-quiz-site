import type { Question } from "@/lib/questions/types";

export const CHUSHO_2023_B_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 1,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "移動平均法",
    "topicTags": [
      "移動平均法"
    ],
    "difficulty": 3,
    "question": "７ 月における商品Ａの取引は以下のとおりである。 ７ 月の売上原価として、最も適切なものを下記の解答群から選べ。ただし、払出単価の計算には移動平均法を採用している。",
    "choices": {
      "ア": "2,200 円",
      "イ": "2,300 円",
      "ウ": "2,400 円",
      "エ": "2,600 円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "7月15日の売上時点で、在庫40個の原価は4,600円、移動平均単価は115円である。売上原価は115×20＝2,300円となる。",
    "choiceExplanations": {
      "ア": "7月12日の仕入れ後の単価は（10×100＋30×120）÷40＝115円である。2,200円は20個を110円で払い出した場合の金額になる。",
      "イ": "7月15日の売上時点で、在庫40個の原価は4,600円、移動平均単価は115円である。売上原価は115×20＝2,300円となる。",
      "ウ": "120円は7月12日の仕入分だけの単価である。前月繰越分も含めて平均すると115円になる。",
      "エ": "7月25日の仕入れは15日の払出原価に反映しない。払出時点の単価は130円ではなく115円である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-zaimu-q1.png"
    ],
    "imageAltTexts": [
      "7月1日：前月繰越10個、単価100円。12日：仕入30個、120円。15日：売上20個、270円。25日：仕入20個、160円。31日：次月繰越40個、単価記載省略。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 2,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "収益認識と契約資産",
    "topicTags": [
      "収益認識と契約資産"
    ],
    "difficulty": 3,
    "question": "以下の一連の取引の仕訳として、最も適切なものを下記の解答群から選べ。\n８ /12 当社は、得意先との間で、25,000 円の商品Ｂと 35,000 円の商品Ｃを販売する契約を締結した。合計の代金 60,000 円は、商品Ｂと商品Ｃの両方を引き渡した後に請求することになっている。また、商品Ｂと商品Ｃの引き渡しは、それぞれ独立した履行義務である。商品Ｂについては、契約を締結した後、直ちに得意先に引き渡した。\n８ /25 商品Ｃを得意先に引き渡した。当社は、商品Ｂと商品Ｃの代金に対する請求書を送付する予定である。",
    "choices": {
      "ア": "8/12　（借）契約資産 25,000 ／（貸）売上 25,000\n8/25　（借）売掛金 60,000 ／（貸）契約資産 25,000、売上 35,000",
      "イ": "8/12　（借）契約資産 25,000 ／（貸）契約負債 25,000\n8/25　（借）売掛金 60,000、契約負債 25,000 ／（貸）売上 60,000、契約資産 25,000",
      "ウ": "8/12　（借）契約資産 60,000 ／（貸）売上 60,000\n8/25　（借）売掛金 60,000 ／（貸）契約資産 60,000",
      "エ": "8/12　（借）契約資産 60,000 ／（貸）売上 25,000、契約負債 35,000\n8/25　（借）売掛金 60,000、契約負債 35,000 ／（貸）契約資産 60,000、売上 35,000"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "12日のＢの引渡しで売上25,000円を認識し、まだ無条件の請求権がないため契約資産を計上する。25日にＣを引き渡すと、Ｂの契約資産とＣの売上を合わせて売掛金60,000円となる。",
    "choiceExplanations": {
      "ア": "12日のＢの引渡しで売上25,000円を認識し、まだ無条件の請求権がないため契約資産を計上する。25日にＣを引き渡すと、Ｂの契約資産とＣの売上を合わせて売掛金60,000円となる。",
      "イ": "Ｂを引き渡した時点で履行義務を満たしているため、25,000円の売上を計上する。Ｂの引渡しを契約負債にする処理は適切でない。",
      "ウ": "ＢとＣは独立の履行義務で、12日に売上計上できるのはＢの25,000円である。Ｃの35,000円は引渡日の25日に計上する。",
      "エ": "12日に契約資産となるのは引渡し済みのＢに対応する25,000円である。Ｃは未引渡しで対価も先に受け取っていないため、その契約負債を計上しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 3,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "定率法による減価償却",
    "topicTags": [
      "定率法による減価償却"
    ],
    "difficulty": 3,
    "question": "当社は、X1 年度期首に機械（取得原価 300,000 円、耐用年数 ５ 年）を購入し、200 ％ 定率法により減価償却を行っている。保証率は 0.10800、改定償却率は 0.500である。X4 年度における減価償却費として、最も適切なものはどれか。",
    "choices": {
      "ア": "18,750 円",
      "イ": "25,920 円",
      "ウ": "30,000 円",
      "エ": "32,400 円"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "X4年度期首の簿価は300,000×0.6³＝64,800円で、調整前の償却額25,920円は保証額32,400円を下回る。改定償却率0.5を掛けた32,400円を償却する。",
    "choiceExplanations": {
      "ア": "調整前の償却額は期首簿価64,800円に0.4を掛けた25,920円である。これが償却保証額32,400円を下回る年には改定償却率を使う。",
      "イ": "25,920円は通常の定率法による調整前償却額である。保証額を下回るので、X4年は改定取得価額64,800円に0.5を掛ける。",
      "ウ": "X1〜X3年度に償却率0.4を適用した後の帳簿価額は64,800円である。改定率0.5を掛けると30,000円にはならない。",
      "エ": "X4年度期首の簿価は300,000×0.6³＝64,800円で、調整前の償却額25,920円は保証額32,400円を下回る。改定償却率0.5を掛けた32,400円を償却する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 4,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "連結会計",
    "topicTags": [
      "連結会計"
    ],
    "difficulty": 3,
    "question": "連結会計に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "親会社による子会社株式の所有割合が 100 ％ に満たない場合、連結貸借対照表の負債の部に非支配株主持分が計上される。",
      "イ": "子会社の決算日と連結決算日の差異が ３ か月を超えない場合は、子会社の正規の決算を基礎として連結決算を行うことができる。",
      "ウ": "負ののれんは、連結貸借対照表に固定負債として計上する。",
      "エ": "連結子会社の当期純損益に株式の所有割合を乗じた額は、持分法による投資損益として連結損益計算書に計上する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "連結決算日と子会社決算日の差が3か月以内であれば、子会社の正規の決算を利用できる。決算日の間に生じた重要な取引には必要な調整を行う。",
    "choiceExplanations": {
      "ア": "非支配株主持分は子会社純資産のうち親会社以外の株主に帰属する部分であり、連結貸借対照表の純資産の部に表示する。",
      "イ": "連結決算日と子会社決算日の差が3か月以内であれば、子会社の正規の決算を利用できる。決算日の間に生じた重要な取引には必要な調整を行う。",
      "ウ": "負ののれんが生じる場合は識別可能な資産・負債の把握等を再点検し、残額を負ののれん発生益として認識する。固定負債には計上しない。",
      "エ": "連結子会社の損益は連結損益計算書に取り込み、非支配株主への帰属分を区分する。持分法による投資損益で処理する方法とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 5,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "会社法の計算書類",
    "topicTags": [
      "会社法の計算書類"
    ],
    "difficulty": 3,
    "question": "会社法における計算書類の作成、開示に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "計算書類とは、貸借対照表、損益計算書、キャッシュ・フロー計算書および株主資本等変動計算書のことである。",
      "イ": "子会社を有するすべての株式会社は、連結計算書類を作成しなければならない。",
      "ウ": "すべての株式会社は、各事業年度に係る計算書類を作成しなければならない。",
      "エ": "すべての株式会社は、定時株主総会の終結後遅滞なく、貸借対照表と損益計算書を公告しなければならない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "会社法435条2項により、株式会社は各事業年度の計算書類を作成しなければならない。決算公告の要件とは別の義務である。",
    "choiceExplanations": {
      "ア": "会社法の計算書類には貸借対照表、損益計算書、株主資本等変動計算書、個別注記表が含まれる。キャッシュ・フロー計算書は含まれない。",
      "イ": "子会社の保有だけで連結計算書類を作成する法的義務が生じるわけではない。事業年度末で大会社かつ有価証券報告書の提出義務を負う会社には作成が必要となる。",
      "ウ": "会社法435条2項により、株式会社は各事業年度の計算書類を作成しなければならない。決算公告の要件とは別の義務である。",
      "エ": "会社法上、通常の株式会社の決算公告は貸借対照表が基本で、損益計算書の公告も要するのは大会社である。有価証券報告書の提出義務がある会社には公告の例外もある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 6,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "法人税の加減算",
    "topicTags": [
      "法人税の加減算"
    ],
    "difficulty": 3,
    "question": "当期の税引前当期純利益は 800,000 円であった。ただし、受取配当金の益金不算入額が 24,000 円、交際費の損金不算入額が 36,000 円ある。また、前期末に設定した貸倒引当金 10,000 円が損金不算入となったが、当期において損金算入が認められた。法人税率を 20 ％ とするとき、当期の損益計算書に計上される法人税として、最も適切なものはどれか。",
    "choices": {
      "ア": "158,000 円",
      "イ": "160,400 円",
      "ウ": "162,000 円",
      "エ": "164,400 円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "課税所得は800,000－24,000＋36,000－10,000＝802,000円である。税率20％を掛けると160,400円になる。",
    "choiceExplanations": {
      "ア": "益金不算入の24,000円と当期損金となった10,000円は減算し、交際費の損金不算入36,000円は加算する。課税所得は790,000円にはならない。",
      "イ": "課税所得は800,000－24,000＋36,000－10,000＝802,000円である。税率20％を掛けると160,400円になる。",
      "ウ": "162,000円に対応する課税所得810,000円は、指定された加減算をすべて反映した802,000円と異なる。",
      "エ": "164,400円は課税所得822,000円に相当し、当期に損金算入される引当金10,000円を加算したときの額である。当期はこれを減算する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 7,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "剰余金の配当",
    "topicTags": [
      "剰余金の配当"
    ],
    "difficulty": 3,
    "question": "剰余金の配当と処分に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "株式会社は、 １ 事業年度につき、中間配当と期末配当の最大 ２ 回の配当を行うことができる。",
      "イ": "株式会社は、資本剰余金を原資とする配当を行うことはできない。",
      "ウ": "取締役会設置会社は、取締役会の決議によって中間配当を実施することができる旨を定款で定めることができる。",
      "エ": "役員賞与を支払う場合、その 10 分の １ の額を利益準備金として積み立てなければならない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "会社法454条5項により、取締役会設置会社は、取締役会決議で事業年度の途中に1回中間配当をできる旨を定款に定められる。",
    "choiceExplanations": {
      "ア": "会社法上、株主総会の決議による剰余金配当は年2回に限定されない。中間配当の特則と通常の配当決議は区別する。",
      "イ": "分配可能額などの制限内で、その他資本剰余金を原資にする配当もできる。",
      "ウ": "会社法454条5項により、取締役会設置会社は、取締役会決議で事業年度の途中に1回中間配当をできる旨を定款に定められる。",
      "エ": "利益準備金への積立ては剰余金の配当に関連する。役員賞与は原則として費用処理するので、賞与額を基に利益準備金を積み立てない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 8,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "貸借対照表の流動性分類",
    "topicTags": [
      "貸借対照表の流動性分類"
    ],
    "difficulty": 3,
    "question": "貸借対照表の表示に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "売掛金は、代金が回収されるまでの期間の長短にかかわらず流動資産に分類される。",
      "イ": "株式は、その保有目的にかかわらず流動資産に分類される。",
      "ウ": "棚卸資産は、決算日の翌日から起算して １ 年以内に販売されるものは流動資産に、 １ 年を超えるものは固定資産に分類される。",
      "エ": "長期借入金は、時の経過により、返済期日が決算日の翌日から起算して １ 年以内となっても、固定負債に分類される。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "通常の営業取引から生じる売掛金は、正常営業循環基準によって流動資産に分類する。回収が1年を超えても、そのことだけで固定資産にはならない。",
    "choiceExplanations": {
      "ア": "通常の営業取引から生じる売掛金は、正常営業循環基準によって流動資産に分類する。回収が1年を超えても、そのことだけで固定資産にはならない。",
      "イ": "短期の売買目的で持つ株式と、長期保有する投資有価証券などでは表示区分が異なる。すべてが流動資産になるわけではない。",
      "ウ": "通常の営業で販売する棚卸資産は、正常営業循環基準によって流動資産となる。販売までの見込み期間が1年を超えるだけで固定資産にはならない。",
      "エ": "決算日後1年以内が返済期日となる部分は固定負債から流動負債へ振り替える。長期借入金の全額が返済まで固定負債になるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 9,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "キャッシュ・フロー計算書",
    "topicTags": [
      "キャッシュ・フロー計算書"
    ],
    "difficulty": 3,
    "question": "キャッシュ・フロー計算書に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "間接法によるキャッシュ・フロー計算書では、棚卸資産の増加額は営業活動によるキャッシュ・フローの増加要因として表示される。",
      "イ": "資金の範囲には定期預金は含まれない。",
      "ウ": "支払利息は、営業活動によるキャッシュ・フローの区分で表示する方法と財務活動によるキャッシュ・フローの区分で表示する方法の ２ つが認められている。",
      "エ": "有形固定資産の売却による収入は、財務活動によるキャッシュ・フローの区分で表示される。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "支払利息は、日本の表示方法では営業活動の区分に載せる方法と財務活動の区分に載せる方法がある。企業は採用した方針を継続適用する。",
    "choiceExplanations": {
      "ア": "間接法では棚卸資産が増えると、その分は利益から営業キャッシュ・フローへの調整で差し引く。在庫の保有に資金を使うためである。",
      "イ": "定期預金も、取得日から満期までが短く、容易に換金でき価値変動リスクが僅少などの要件を満たす場合、現金同等物に含まれる。",
      "ウ": "支払利息は、日本の表示方法では営業活動の区分に載せる方法と財務活動の区分に載せる方法がある。企業は採用した方針を継続適用する。",
      "エ": "有形固定資産の売却収入は固定資産への投資の回収なので投資活動によるキャッシュ・フローで表示する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 10,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "総合原価計算と正常減損",
    "topicTags": [
      "総合原価計算と正常減損"
    ],
    "difficulty": 3,
    "question": "当工場の以下の資料に基づき、平均法による月末仕掛品原価として、最も適切なものを下記の解答群から選べ。なお、材料は工程の始点ですべて投入されており、減損は工程の終点で発生している。また、月末仕掛品原価の計算は度外視法によるものとする。",
    "choices": {
      "ア": "70,400 円",
      "イ": "81,000 円",
      "ウ": "85,500 円",
      "エ": "108,000 円"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "材料費は150,000円÷600kg×200kg＝50,000円である。加工費は102,000円÷500kg相当×100kg相当＝20,400円となり、合計は70,400円となる。",
    "choiceExplanations": {
      "ア": "材料費は150,000円÷600kg×200kg＝50,000円である。加工費は102,000円÷500kg相当×100kg相当＝20,400円となり、合計は70,400円となる。",
      "イ": "平均法では期首と当月投入の原価を合算する。材料200kg相当と加工100kg相当に、終点での正常減損を含めた各単価を掛けると81,000円にはならない。",
      "ウ": "正常減損の発生が工程の終点なので、終点に達していない月末仕掛品には減損分を負担させない。月末の材料費と加工費を計算すると70,400円になる。",
      "エ": "月末200kgの材料はすべて投入済みだが、加工は50％で100kg相当である。加工を200kg分としたり、正常減損分を月末仕掛品に負担させたりしない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-zaimu-q10.png"
    ],
    "imageAltTexts": [
      "当月生産量は月初仕掛品200kg（50％）と当月投入400kgの計600kg。その内訳は正常減損100kg（100％）、月末仕掛品200kg（50％）、当月完成品300kg。材料費と加工費は、月初が30,000円と18,000円、当月投入が120,000円と84,000円、合計が150,000円と102,000円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 11,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "財務比率",
    "topicTags": [
      "財務比率"
    ],
    "difficulty": 3,
    "question": "余剰現金の使途として、新規の設備の購入（Ｄ案）と長期借入金の返済（Ｅ案）を比較検討している。他の条件を一定とすると、Ｄ案とＥ案の財務諸表および財務比率への影響に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "固定長期適合率は、Ｄ案では悪化するが、Ｅ案では改善する。",
      "イ": "自己資本比率は、Ｄ案では不変であるが、Ｅ案では改善する。",
      "ウ": "総資産は、Ｄ案、Ｅ案ともに不変である。",
      "エ": "流動比率は、Ｄ案では悪化するが、Ｅ案では改善する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "Ｄ案は現金と設備の入替えで、自己資本と総資産は変わらない。Ｅ案は現金と負債を減らすので、自己資本が同じまま総資産が減り自己資本比率は高まる。",
    "choiceExplanations": {
      "ア": "Ｄ案では固定資産が増え、Ｅ案では分母の長期借入金が減る。固定長期適合率はどちらでも高まり、固定資産の長期資金によるカバーが悪化する。",
      "イ": "Ｄ案は現金と設備の入替えで、自己資本と総資産は変わらない。Ｅ案は現金と負債を減らすので、自己資本が同じまま総資産が減り自己資本比率は高まる。",
      "ウ": "Ｄ案では現金が設備に振り替わるため総資産は不変である。Ｅ案では借入金返済のための現金が流出して総資産が減る。",
      "エ": "Ｄ案もＥ案も現金を使い、流動資産が減る。Ｅ案は長期借入金の返済で、他の条件が一定なら流動負債は減らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q12-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 12,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "付加価値率と生産性",
    "topicTags": [
      "付加価値率と生産性"
    ],
    "difficulty": 3,
    "question": "当社とその競合会社であるＦ社に関する以下の資料に基づき、下記の設問に答えよ。ただし、金額の単位は万円とする。\n\n（設問1）\n当社の付加価値率として、最も適切なものはどれか。",
    "choices": {
      "ア": "20 ％",
      "イ": "25 ％",
      "ウ": "65 ％",
      "エ": "75 ％"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "当社の付加価値率は付加価値12,000万円を売上高48,000万円で割った25％である。65％は当社の人件費7,800÷付加価値12,000で計算する労働分配率である。付加価値率の分母は売上高である。",
    "choiceExplanations": {
      "ア": "20％はＦ社の22,400÷112,000で求めた付加価値率である。当社については12,000を48,000で割る。",
      "イ": "当社の付加価値率は付加価値12,000万円を売上高48,000万円で割った25％である。",
      "ウ": "65％は当社の人件費7,800÷付加価値12,000で計算する労働分配率である。付加価値率の分母は売上高である。",
      "エ": "75％はＦ社の人件費16,800÷付加価値22,400で求める労働分配率である。当社の付加価値率は25％になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-zaimu-q12.png"
    ],
    "imageAltTexts": [
      "当社、Ｆ社の順で、単位は万円。資産合計64,000、86,000。有形固定資産合計16,000、20,000。売上高48,000、112,000。付加価値12,000、22,400。うち人件費7,800、16,800。従業員数20人、40人。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q12-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 12,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "付加価値率と生産性",
    "topicTags": [
      "付加価値率と生産性"
    ],
    "difficulty": 3,
    "question": "当社とその競合会社であるＦ社に関する以下の資料に基づき、下記の設問に答えよ。ただし、金額の単位は万円とする。\n\n（設問2）\n当社とＦ社の生産性に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "労働生産性はＦ社が上回っているが、その要因は設備生産性が当社のそれを上回っていることにある。",
      "イ": "労働生産性はＦ社が上回っているが、その要因は労働装備率が当社のそれを上回っていることにある。",
      "ウ": "労働生産性は当社が上回っているが、その要因は設備生産性がＦ社のそれを上回っていることにある。",
      "エ": "労働生産性は当社が上回っているが、その要因は労働装備率がＦ社のそれを上回っていることにある。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "労働生産性は当社600万円、Ｆ社560万円である。当社は設備生産性では下回るが、1人当たりの有形固定資産が800万円とＦ社の500万円を上回る。",
    "choiceExplanations": {
      "ア": "Ｆ社の設備生産性は22,400÷20,000＝1.12で当社の0.75を上回る。一方、労働生産性は当社600万円、Ｆ社560万円である。",
      "イ": "労働装備率は従業員1人当たりの有形固定資産で、当社800万円、Ｆ社500万円である。労働生産性も付加価値÷従業員数で当社が上回る。",
      "ウ": "当社の労働生産性が上回る点は正しい。設備生産性はＦ社1.12、当社0.75なので、その差は当社が上回る理由にならない。",
      "エ": "労働生産性は当社600万円、Ｆ社560万円である。当社は設備生産性では下回るが、1人当たりの有形固定資産が800万円とＦ社の500万円を上回る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-zaimu-q12.png"
    ],
    "imageAltTexts": [
      "当社、Ｆ社の順で、単位は万円。資産合計64,000、86,000。有形固定資産合計16,000、20,000。売上高48,000、112,000。付加価値12,000、22,400。うち人件費7,800、16,800。従業員数20人、40人。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 13,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "キャッシュ・コンバージョン・サイクル",
    "topicTags": [
      "キャッシュ・コンバージョン・サイクル"
    ],
    "difficulty": 3,
    "question": "運転資金管理のための財務指標であるキャッシュ・コンバージョン・サイクルに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "売上債権回転率が低くなると、キャッシュ・コンバージョン・サイクルは短くなる。",
      "イ": "キャッシュ・コンバージョン・サイクルは、マイナスの値になることはない。",
      "ウ": "仕入債務回転期間が短くなると、キャッシュ・コンバージョン・サイクルは短くなる。",
      "エ": "棚卸資産回転期間が短くなると、キャッシュ・コンバージョン・サイクルは短くなる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "キャッシュ・コンバージョン・サイクルは棚卸資産回転期間と売上債権回転期間を足し、仕入債務回転期間を引く。在庫期間の短縮は日数を減らす。",
    "choiceExplanations": {
      "ア": "売上債権回転率が下がると、同じ売上規模で資金回収の所要日数は長くなる。キャッシュ・コンバージョン・サイクルは長くなる方向に動く。",
      "イ": "仕入債務の支払いまでの期間が棚卸資産と売上債権の回転期間の合計より長ければ、キャッシュ・コンバージョン・サイクルは負になる。",
      "ウ": "式では仕入債務回転期間を差し引く。支払いまでの日数が短くなると差し引く日数が減り、資金が寝る期間は長くなる。",
      "エ": "キャッシュ・コンバージョン・サイクルは棚卸資産回転期間と売上債権回転期間を足し、仕入債務回転期間を引く。在庫期間の短縮は日数を減らす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 14,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "ROEと配当",
    "topicTags": [
      "ROEと配当"
    ],
    "difficulty": 3,
    "question": "Ｚ 社の期首自己資本は 3,000 万円である。 また、ROE は ５ ％、 配当性向は40 ％、発行済株式数は 20 万株である。Ｚ社の当期の １ 株当たり配当として、最も適切なものはどれか。ただし、本問において、ROE は当期純利益を期首自己資本で除した値とする。",
    "choices": {
      "ア": "２円",
      "イ": "３円",
      "ウ": "４円",
      "エ": "５円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "純利益は3,000万円×5％＝150万円、配当総額は150万円×40％＝60万円である。20万株で割ると1株3円になる。",
    "choiceExplanations": {
      "ア": "当期純利益は3,000万円×5％＝150万円である。その40％の60万円を20万株に配るため2円を上回る。",
      "イ": "純利益は3,000万円×5％＝150万円、配当総額は150万円×40％＝60万円である。20万株で割ると1株3円になる。",
      "ウ": "4円なら配当総額は80万円となり、純利益150万円に対して配当性向40％にならない。指定された配当総額は60万円である。",
      "エ": "5円では配当総額が100万円になり、指定された配当性向を超える。ROEは配当額ではなく当期純利益に換算してから使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q15-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 15,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "資本構成と企業価値",
    "topicTags": [
      "資本構成と企業価値"
    ],
    "difficulty": 3,
    "question": "次の文章を読んで、下記の設問に答えよ。現在、Ｙ社は総資本 10 億円（時価ベース）の全額を自己資本で調達して事業活動を行っており、総資本営業利益率は 10 ％ である。また、ここでの営業利益は税引前当期純利益に等しく、また同時に税引前キャッシュフローにも等しいものとする。Ｙ社は今後の事業活動において、負債による調達と自己株式の買い入れによって総資本額を変えずに負債と自己資本との割合（資本構成）を １ : １ に変化させることを検討しており、その影響について議論している。\n\n（設問1）\n税金が存在しない場合、Ｙ社が資本構成を変化させたとき、ROE の値として、最も適切なものはどれか。ただし、負債利子率は ３ ％ であり、資本構成の変化によって総資本営業利益率は変化しないものとする。",
    "choices": {
      "ア": "13 ％",
      "イ": "13.5 ％",
      "ウ": "17 ％",
      "エ": "17.5 ％"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "借入金5億円に対する利息は1,500万円である。営業利益1億円から利息を引いた8,500万円を自己資本5億円で割ると17％になる。",
    "choiceExplanations": {
      "ア": "総資本の10％で営業利益は1億円となる。負債利息1,500万円を引いてから自己資本5億円で割ると、13％にはならない。",
      "イ": "当初の総資本10億円は維持するため、負債と自己資本は各5億円である。株主の利益8,500万円を自己資本で割ると17％になる。",
      "ウ": "借入金5億円に対する利息は1,500万円である。営業利益1億円から利息を引いた8,500万円を自己資本5億円で割ると17％になる。",
      "エ": "17.5％では純利益8,750万円が必要になる。実際は借入利息が1,500万円なので純利益は8,500万円である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q15-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 15,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "資本構成と企業価値",
    "topicTags": [
      "資本構成と企業価値"
    ],
    "difficulty": 3,
    "question": "次の文章を読んで、下記の設問に答えよ。現在、Ｙ社は総資本 10 億円（時価ベース）の全額を自己資本で調達して事業活動を行っており、総資本営業利益率は 10 ％ である。また、ここでの営業利益は税引前当期純利益に等しく、また同時に税引前キャッシュフローにも等しいものとする。Ｙ社は今後の事業活動において、負債による調達と自己株式の買い入れによって総資本額を変えずに負債と自己資本との割合（資本構成）を １ : １ に変化させることを検討しており、その影響について議論している。\n\n（設問2）\nモジリアーニ・ミラー理論において法人税のみが存在する場合、Ｙ社が資本構成を変化させることで、企業全体の価値に対する影響として、最も適切なものはどれか。ただし、法人税率は 20 ％ とする。",
    "choices": {
      "ア": "企業価値が 1 億円減少する。",
      "イ": "企業価値が 1 億円増加する。",
      "ウ": "企業価値が ４ 億円減少する。",
      "エ": "企業価値が ４ 億円増加する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "法人税があると利息の節税効果の現在価値を企業価値に加える。恒久的な負債5億円に税率20％を掛けるので、1億円増える。",
    "choiceExplanations": {
      "ア": "負債による利息の損金算入で税負担が下がり、企業価値は増える。1億円の減少にはならない。",
      "イ": "法人税があると利息の節税効果の現在価値を企業価値に加える。恒久的な負債5億円に税率20％を掛けるので、1億円増える。",
      "ウ": "節税効果は企業価値の増加として現れる。税率は負債の5億円に適用するため4億円の減少にはならない。",
      "エ": "価値の変化が増加方向という点は正しい。節税効果の現在価値は負債5億円×20％で1億円となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 16,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "意思決定関連原価",
    "topicTags": [
      "意思決定関連原価"
    ],
    "difficulty": 3,
    "question": "次の文章の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。100 万円のコストで製造した機械装置 １ 台に対して、Ｇ社とＨ社の ２ 社から、これを購入したい旨の引き合いがあった。Ｇ社は 120 万円、Ｈ社は 130 万円の価格を提示している。 どちらかに販売すると他方を断らなければならないため、Ａ はＧ社に販売したときは 130 万円、Ｈ社に販売したときは 120 万円である。100 万円の支出原価は、どちらを選択しても変化しないため、 Ｂ と呼ばれる。それに対して、 Ａ はどちらを選ぶかによって変化するため、Ｃ と呼ばれる。",
    "choices": {
      "ア": "Ａ：機会原価 Ｂ：固定原価 Ｃ：変動原価",
      "イ": "Ａ：機会原価 Ｂ：埋没原価 Ｃ：関連原価",
      "ウ": "Ａ：限界原価 Ｂ：固定原価 Ｃ：変動原価",
      "エ": "Ａ：限界原価 Ｂ：埋没原価 Ｃ：関連原価"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "Ａは選択を変えると失う代替機会の価値である。既に支出したＢは埋没原価であり、選択により金額が変わるＡは関連原価である。",
    "choiceExplanations": {
      "ア": "Ａは選ばなかった取引の収入を失う機会原価である。支出済みのＢは埋没原価で、意思決定により変わるＡは関連原価である。",
      "イ": "Ａは選択を変えると失う代替機会の価値である。既に支出したＢは埋没原価であり、選択により金額が変わるＡは関連原価である。",
      "ウ": "Ａは追加生産1単位の原価ではなく、断る取引から得られたはずの収入である。すでに支出したＢは埋没原価に当たる。",
      "エ": "ＢとＣは正しい。Ａは選ばなかった相手への販売で得られた額なので、限界原価ではなく機会原価である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 17,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "事業部別資本コスト",
    "topicTags": [
      "事業部別資本コスト"
    ],
    "difficulty": 3,
    "question": "以下の、リスクの異なるＨ事業部とＬ事業部を持つ多角化企業に関する資料に基づいて、Ｈ事業部に属する投資案（Ｈ案）とＬ事業部に属する投資案（Ｌ案）の投資評価を行ったとき、最も適切なものを下記の解答群から選べ。ただし、この多角化企業は借り入れを行っていない。",
    "choices": {
      "ア": "Ｈ案、Ｌ案ともに棄却される。",
      "イ": "Ｈ案、Ｌ案ともに採択される。",
      "ウ": "Ｈ案は棄却され、Ｌ案は採択される。",
      "エ": "Ｈ案は採択され、Ｌ案は棄却される。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "各事業の資本コストと比較し、Ｈ案は10％＜11％なので棄却、Ｌ案は7％＞5％なので採択となる。全社のWACCを両案に一律に適用しない。",
    "choiceExplanations": {
      "ア": "Ｈ案の内部収益率10％は同部門の資本コスト11％を下回る。Ｌ案は7％が5％を上回るので採択する。",
      "イ": "Ｌ案は内部収益率が資本コストを上回る。Ｈ案は全社の8％より高くても、事業部のリスクに対応するハードル11％を下回る。",
      "ウ": "各事業の資本コストと比較し、Ｈ案は10％＜11％なので棄却、Ｌ案は7％＞5％なので採択となる。全社のWACCを両案に一律に適用しない。",
      "エ": "これは全社の8％だけを基準にした判断である。各事業のリスクに応じた資本コストで比較すると結論は反対になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-zaimu-q17.png"
    ],
    "imageAltTexts": [
      "内部収益率はＨ案10％、Ｌ案7％。リスクフリー・レートは2％。資本コストはＨ事業部11％、Ｌ事業部5％。全社のWACCは8％。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 18,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "ポートフォリオ理論",
    "topicTags": [
      "ポートフォリオ理論"
    ],
    "difficulty": 3,
    "question": "ポートフォリオ理論に関する記述として、最も適切なものはどれか。ただし、リスク資産の間の相関係数は １ 未満であり、投資比率は正とする。",
    "choices": {
      "ア": "２ つのリスク資産からなるポートフォリオのリスク（リターンの標準偏差）は、ポートフォリオを構成する各資産のリスクを投資比率で加重平均した値である。",
      "イ": "２ つのリスク資産からなるポートフォリオのリターンは、ポートフォリオを構成する各資産のリターンを投資比率で加重平均した値である。",
      "ウ": "２ つのリスク資産からポートフォリオを作成するとき、両資産のリターン間の相関係数が大きいほど、リスク低減効果は顕著となる。",
      "エ": "安全資産とリスク資産からなるポートフォリオのリスク（リターンの標準偏差）は、リスク資産への投資比率に反比例する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "ポートフォリオのリターンは、各資産のリターンに投資比率を掛けて合計する。相関はリターンの加重平均ではなくリスクの計算に影響する。",
    "choiceExplanations": {
      "ア": "標準偏差には各資産の分散だけでなく共分散が影響する。相関係数が1未満なら標準偏差は単純な加重平均とは一致しない。",
      "イ": "ポートフォリオのリターンは、各資産のリターンに投資比率を掛けて合計する。相関はリターンの加重平均ではなくリスクの計算に影響する。",
      "ウ": "他の条件が同じなら相関係数が低いほど値動きが相殺されやすい。分散投資のリスク低減効果は相関係数の上昇で小さくなる。",
      "エ": "安全資産のリターンを確定とすると、ポートフォリオの標準偏差はリスク資産の標準偏差にその投資比率を掛けた値である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 19,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "効率的市場仮説",
    "topicTags": [
      "効率的市場仮説"
    ],
    "difficulty": 3,
    "question": "効率的市場仮説（セミストロング型）に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "インサイダー取引によっても、市場の期待を上回る過大なリターンを獲得できない。",
      "イ": "市場価格は公に入手可能な情報を反映する。",
      "ウ": "市場価格は規則的に変動する。",
      "エ": "すべての証券の将来の価格は確実に予測できる。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "セミストロング型では過去の価格に加え、業績発表など公に取得できる情報を市場価格が織り込むと考える。公開情報が速やかに織り込まれるなら、その公開情報だけで持続的に超過収益を得られる規則的な値動きは想定しない。",
    "choiceExplanations": {
      "ア": "非公開情報まで市場価格が反映するのはストロング型の想定である。セミストロング型が想定するのは公開情報の反映である。",
      "イ": "セミストロング型では過去の価格に加え、業績発表など公に取得できる情報を市場価格が織り込むと考える。",
      "ウ": "公開情報が速やかに織り込まれるなら、その公開情報だけで持続的に超過収益を得られる規則的な値動きは想定しない。",
      "エ": "公開情報が価格に反映されても、将来のニュースは確定していない。将来の価格を確実に予測できるという仮説ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 20,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "配当と株主価値",
    "topicTags": [
      "配当と株主価値"
    ],
    "difficulty": 3,
    "question": "以下のデータに基づいて、Ａ社の株主価値を割引キャッシュフローモデルに従って計算したとき、最も適切なものを下記の解答群から選べ。ただし、これらの数値は毎年 ３ ％ ずつ増加する。また、Ａ社には現在も今後も負債がなく、株主の要求収益率は ６ ％ である。",
    "choices": {
      "ア": "15,000 万円",
      "イ": "30,000 万円",
      "ウ": "35,000 万円",
      "エ": "70,000 万円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "次期の株主向けキャッシュ・フローは1,200＋300－500－100＝900万円である。永続成長率を差し引いた割引率0.06－0.03で割ると30,000万円になる。",
    "choiceExplanations": {
      "ア": "30,000万円を得るには要求収益率6％と成長率3％の差で次期キャッシュ・フローを割る。成長を考慮せず6％で割ると15,000万円になる。",
      "イ": "次期の株主向けキャッシュ・フローは1,200＋300－500－100＝900万円である。永続成長率を差し引いた割引率0.06－0.03で割ると30,000万円になる。",
      "ウ": "正味運転資本の増加100万円は資金流出なので、次期キャッシュ・フローから差し引く。次期額900万円を3％で割ると35,000万円より小さい。",
      "エ": "70,000万円を成長率控除後の3％で逆算すると、次期キャッシュ・フロー2,100万円が必要になる。提示資料から得られる次期額は900万円である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-zaimu-q20.png"
    ],
    "imageAltTexts": [
      "Ａ社の次期の予測値。税引後純利益1,200万円、減価償却費300万円、設備投資額500万円、正味運転資本の増加額100万円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 21,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "サステナブル成長率",
    "topicTags": [
      "サステナブル成長率"
    ],
    "difficulty": 3,
    "question": "サステナブル成長率に関する記述として、最も適切なものはどれか。ただし、ROE および配当性向は毎期一定とする。",
    "choices": {
      "ア": "企業が毎期の純利益の全額を配当する場合、サステナブル成長率はリスクフリー・レートに一致する。",
      "イ": "サステナブル成長率は、ROE に配当性向を乗じることで求められる。",
      "ウ": "サステナブル成長率は、事業環境に左右されるが、内部留保率には左右されない。",
      "エ": "サステナブル成長率は、配当割引モデルにおける配当成長率として用いることができる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ROEと配当性向が一定なら、利益や配当は内部留保による自己資本の増加と同じ率で成長する。配当割引モデルの成長率にROE×内部留保率を用いられる。",
    "choiceExplanations": {
      "ア": "全額配当すると内部留保率が0になる。ROEが一定なら内部留保で実現する成長率も0となる。",
      "イ": "ROEに掛けるのは配当性向ではなく1から配当性向を引いた内部留保率である。",
      "ウ": "同じROEでも利益を社内に残す割合が違えば、自己資本の増加速度が変わる。内部留保率は成長率を決める。",
      "エ": "ROEと配当性向が一定なら、利益や配当は内部留保による自己資本の増加と同じ率で成長する。配当割引モデルの成長率にROE×内部留保率を用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 22,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "市場リスク",
    "topicTags": [
      "市場リスク"
    ],
    "difficulty": 3,
    "question": "市場リスクに関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 外貨建取引の場合に、為替レートの変動で損益が生じるリスク\nｂ 貸付先の財務状況の悪化などにより、貸付金の価値が減少ないし消失し、損害を被るリスク\nｃ 債券を売却するときに、金利変動に伴って債券の市場価格が変動するリスク\nｄ 市場取引において需給がマッチしないために売買が成立しなかったり、資金繰りに失敗するリスク",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｃ",
      "ウ": "ａとｄ",
      "エ": "ｂとｃ",
      "オ": "ｂとｄ"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "為替レートや金利など市場価格を決める変数が動くことで損失が生じるａとｃが市場リスクである。ｄは市場で約定できない、または資金が調達できない流動性リスクである。ａの為替変動は市場リスクに当たる。",
    "choiceExplanations": {
      "ア": "ａの為替リスクは市場リスクである。ｂの貸付先の信用悪化による損失は信用リスクに当たる。",
      "イ": "為替レートや金利など市場価格を決める変数が動くことで損失が生じるａとｃが市場リスクである。",
      "ウ": "ｄは市場で約定できない、または資金が調達できない流動性リスクである。ａの為替変動は市場リスクに当たる。",
      "エ": "ｃの金利変動は市場リスクである。ｂは貸付先の信用力に関わる信用リスクである。",
      "オ": "ｂは信用リスク、ｄは流動性リスクである。市場リスクの例はａの為替変動とｃの金利変動である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-zaimu-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 23,
    "subject": "財務・会計",
    "type": "multiple-choice",
    "category": "為替予約",
    "topicTags": [
      "為替予約"
    ],
    "difficulty": 3,
    "question": "次の文章の空欄ＡとＢに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。ただし、手数料、金利などは考えないこととする。現在の為替相場（直物）は １ ドル 130 円である。 ３ か月後にドル建てで商品の仕入代金 １ 万ドルを支払う予定の企業が、 １ ドル 131 円で １ 万ドルを買う為替予約（ ３か月後の受け渡し）を行うとする。このとき、 ３ か月後の為替相場（直物）が 134 円になると、為替予約をしなかった場合に比べて円支出は Ａ 。他方、 ３ か月後の為替相場（直物）が 125 円になると、為替予約をしなかった場合に比べて円支出は Ｂ 。",
    "choices": {
      "ア": "Ａ： ３ 万円多くなる Ｂ： ６ 万円少なくなる",
      "イ": "Ａ： ３ 万円少なくなる Ｂ： ６ 万円多くなる",
      "ウ": "Ａ： ４ 万円多くなる Ｂ： ５ 万円少なくなる",
      "エ": "Ａ： ４ 万円少なくなる Ｂ： ５ 万円多くなる"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "予約すると円支出は131万円で固定される。134円なら無予約の134万円より3万円少なく、125円なら無予約の125万円より6万円多い。",
    "choiceExplanations": {
      "ア": "131円で買う予約は134円で買うより3円安く、125円で買うより6円高い。どちらの支出差の方向も逆である。",
      "イ": "予約すると円支出は131万円で固定される。134円なら無予約の134万円より3万円少なく、125円なら無予約の125万円より6万円多い。",
      "ウ": "比較するのは現在の130円ではなく、予約レート131円と支払時の直物レートである。差は1ドル当たり3円と6円になる。",
      "エ": "増減の方向は正しいが、差額は現在の130円から計算しない。予約レート131円と支払時レートの差を1万ドルに掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/B1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023b.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  }
];
