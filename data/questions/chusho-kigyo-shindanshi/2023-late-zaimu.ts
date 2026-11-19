import type { Question } from "@/lib/questions/types";

export const CHUSHO_2023_RETEST_B_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 1,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "期末商品の評価",
    "topicTags": [
      "期末商品の評価",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "以下の期末商品に関する資料に基づき、棚卸減耗損と商品評価損の金額の組み合わせとして、最も適切なものを下記の解答群から選べ。\n【資料】\n帳簿棚卸数量 320 個\n実地棚卸数量 290 個\n原価 ＠ 250 円\n正味売却価額 ＠ 230 円",
    "choices": {
      "ア": "棚卸減耗損：6,900 円商品評価損：5,800 円",
      "イ": "棚卸減耗損：6,900 円商品評価損：6,400 円",
      "ウ": "棚卸減耗損：7,500 円商品評価損：5,800 円",
      "エ": "棚卸減耗損：7,500 円商品評価損：6,400 円"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "減耗分は(320－290)×250＝7,500円である。商品評価損は現存する290個の値下がり分なので、290×(250－230)＝5,800円となる。",
    "choiceExplanations": {
      "ア": "棚卸減耗損は不足30個を原価250円で評価するため7,500円である。6,900円は正味売却価額230円を使った値である。",
      "イ": "減耗した数量には原価を用い、評価損は実在する290個に対して計算する。6,400円は帳簿の320個を使った値である。",
      "ウ": "減耗分は(320－290)×250＝7,500円である。商品評価損は現存する290個の値下がり分なので、290×(250－230)＝5,800円となる。",
      "エ": "減耗損の7,500円は合っている。評価損は帳簿数量ではなく実地棚卸数量290個に対して計算する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 2,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "クレジット売掛金",
    "topicTags": [
      "クレジット売掛金",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "以下の取引を仕訳するとき、販売時のクレジット売掛金の金額として、最も適切なものを下記の解答群から選べ。クレジット払いにより、商品を 650,000 円（税抜）で販売した。信販会社へのクレジット手数料は販売代金の ２ ％ であり、販売時に認識する。なお、消費税の税率は 10 ％ とし、税抜方式で処理するが、クレジット手数料には消費税は課税されない。また、商品売買は三分法により記帳している。",
    "choices": {
      "ア": "635,700 円",
      "イ": "637,000 円",
      "ウ": "700,700 円",
      "エ": "702,000 円"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "クレジット売掛金は税抜販売額650,000円に消費税65,000円を加え、販売代金の2%に当たる手数料13,000円を引いた702,000円である。",
    "choiceExplanations": {
      "ア": "635,700円は税抜額から税込額に対する2%の手数料を引いた値で、顧客が負担する消費税65,000円が売掛金に含まれていない。",
      "イ": "637,000円は税抜販売額からその2%を引いた値である。クレジット売掛金には顧客から回収する消費税相当額も含める。",
      "ウ": "700,700円は税込の715,000円に対して手数料2%を計算した値である。設問の手数料は販売代金650,000円の2%とする。",
      "エ": "クレジット売掛金は税抜販売額650,000円に消費税65,000円を加え、販売代金の2%に当たる手数料13,000円を引いた702,000円である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 3,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "圧縮記帳",
    "topicTags": [
      "圧縮記帳",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "当社は、第 １ 年度期首に補助金 12,000 千円を受け取り、当座預金に入金した。同日、その補助金 12,000 千円と自己資金 14,000 千円で備品 26,000 千円を購入し、直ちに使用を開始した。その際、補助金相当額の圧縮記帳（直接減額方式）を行った。そして第 １ 年度期末に、定額法（耐用年数 ５ 年、残存価額ゼロ）により減価償却を行った。第 １ 年度の減価償却費として、最も適切なものはどれか。",
    "choices": {
      "ア": "2,400 千円",
      "イ": "2,800 千円",
      "ウ": "12,000 千円",
      "エ": "14,000 千円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "直接減額後の帳簿価額は26,000－12,000＝14,000千円である。残存価額ゼロ、耐用年数5年なので、年2,800千円となる。",
    "choiceExplanations": {
      "ア": "2,400千円は補助金12,000千円を5年で割った値である。補助金は取得価額から差し引く額で、償却の対象ではない。",
      "イ": "直接減額後の帳簿価額は26,000－12,000＝14,000千円である。残存価額ゼロ、耐用年数5年なので、年2,800千円となる。",
      "ウ": "12,000千円は受け取った補助金であり、定額法で1年分として配分する額ではない。",
      "エ": "14,000千円は圧縮記帳後の取得価額である。5年間の定額法ではこれを毎年同額ずつ、2,800千円に分けて償却する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 4,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "連結会計とのれん",
    "topicTags": [
      "連結会計とのれん",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "Ａ社は、Ｂ社株式の 100 ％ を 315 百万円で取得し、支配を獲得した。取得時におけるＡ社およびＢ社の貸借対照表は以下のとおりである。なお、Ｂ社の土地の簿価は 100 百万円であるが、時価は 200 百万円である。Ｂ社のその他の諸資産および諸負債の簿価は、時価と一致している。取得時におけるのれんの金額として、最も適切なものを下記の解答群から選べ。\nなお、税効果は考慮しないものとする。",
    "choices": {
      "ア": "のれん：15 百万円",
      "イ": "のれん：55 百万円",
      "ウ": "のれん：115 百万円",
      "エ": "のれん：215 百万円"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "B社の純資産は帳簿上200百万円であり、土地の評価差額100百万円を加えると時価で300百万円である。取得額315百万円との差15百万円がのれんとなる。",
    "choiceExplanations": {
      "ア": "B社の純資産は帳簿上200百万円であり、土地の評価差額100百万円を加えると時価で300百万円である。取得額315百万円との差15百万円がのれんとなる。",
      "イ": "取得対価と比べるのはB社の時価純資産300百万円である。差額は55百万円ではなく15百万円になる。",
      "ウ": "115百万円はB社の帳簿純資産200百万円を使った差額である。土地の時価評価差額100百万円を反映する。",
      "エ": "215百万円は取得額から土地の評価差額だけを引いた値である。比較するのは評価差額を含むB社の純資産全体である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-zaimu-q4.png"
    ],
    "imageAltTexts": [
      "取得時のA社及びB社の貸借対照表。B社は諸資産300、土地100、諸負債200、資本金150、利益剰余金50。単位は百万円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 5,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "固定資産の減損",
    "topicTags": [
      "固定資産の減損",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "固定資産の減損に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "減損処理を行った資産であっても、収益性が回復した場合には帳簿価額を増額させる。",
      "イ": "減損処理を行った資産については、減損損失を控除した帳簿価額に基づき減価償却を行う。",
      "ウ": "減損損失を認識すべきであると判定された対象資産については、帳簿価額を再調達価額まで減額し、当該減少額を減損損失とする。",
      "エ": "対象資産から得られる割引前将来キャッシュ・フローが負である場合に、減損損失を認識する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "減損損失は帳簿価額を切り下げる。以後の減価償却は減損後の帳簿価額と残存耐用年数などに基づいて行う。減額する先は再調達価額ではなく回収可能価額である。回収可能価額は正味売却価額と使用価値の高い方とする。",
    "choiceExplanations": {
      "ア": "日本の固定資産の減損会計では、減損損失について、収益性回復を理由とした戻入れは行わない。",
      "イ": "減損損失は帳簿価額を切り下げる。以後の減価償却は減損後の帳簿価額と残存耐用年数などに基づいて行う。",
      "ウ": "減額する先は再調達価額ではなく回収可能価額である。回収可能価額は正味売却価額と使用価値の高い方とする。",
      "エ": "認識の判定では割引前将来キャッシュ・フローの合計と帳簿価額を比較する。キャッシュ・フローが正でも帳簿価額を下回れば認識の条件を満たし得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 6,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "引当金",
    "topicTags": [
      "引当金",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "引当金に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "一般債権については、債権額から担保の処分見込額及び保証による回収見込額を差し引いて貸倒見積額を求め、これに基づいて貸倒引当金を算定する。",
      "イ": "将来発生が懸念される大地震に対して、震災損失引当金を設定することができる。",
      "ウ": "引当金は、確定した債務について設定される。",
      "エ": "負債性引当金は、流動負債または固定負債に分類される。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "負債性の引当金は負債に計上し、その支払いが見込まれる時期や性質に応じて流動負債または固定負債に分類する。",
    "choiceExplanations": {
      "ア": "一般債権は、債権全体などに過去の貸倒実績率等を適用する方法で見積もる。担保や保証を個別に考慮する方法は貸倒懸念債権などに用いる。",
      "イ": "引当金の設定には、発生原因が当期以前の事象にあることなどが必要である。将来起こるかもしれない地震だけではその要件を満たさない。",
      "ウ": "確定した債務は未払金などとして計上する。引当金は一定の要件を満たす将来の費用や損失を見積もって計上する。",
      "エ": "負債性の引当金は負債に計上し、その支払いが見込まれる時期や性質に応じて流動負債または固定負債に分類する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 7,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "法定準備金",
    "topicTags": [
      "法定準備金",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "Ｃ社は、定時株主総会において、繰越利益剰余金から 4,000 千円、その他資本剰余金から 1,000 千円の配当を行うことを決議した。なお、配当を行う前の資本金は22,000 千円、資本準備金は 1,000 千円、利益準備金は 1,500 千円であった。このとき、積み立てるべき法定準備金として、最も適切なものはどれか。",
    "choices": {
      "ア": "資本準備金：100 千円利益準備金：150 千円",
      "イ": "資本準備金：100 千円利益準備金：400 千円",
      "ウ": "利益準備金：400 千円",
      "エ": "利益準備金：500 千円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "既存準備金は合計2,500千円、資本金の4分の1は5,500千円なので、積立の余裕は3,000千円ある。各配当の10分の1を原資ごとに資本準備金100千円、利益準備金400千円へ積み立てる。",
    "choiceExplanations": {
      "ア": "利益剰余金からの配当4,000千円の10分の1は400千円である。積立限度には余裕があるため150千円に減らす必要はない。",
      "イ": "既存準備金は合計2,500千円、資本金の4分の1は5,500千円なので、積立の余裕は3,000千円ある。各配当の10分の1を原資ごとに資本準備金100千円、利益準備金400千円へ積み立てる。",
      "ウ": "利益準備金400千円は合っているが、その他資本剰余金からの配当にも資本準備金100千円の積立が必要である。",
      "エ": "合計500千円の積立は必要だが、その他資本剰余金を原資とする配当分100千円は資本準備金に振り分ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 8,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "無形固定資産",
    "topicTags": [
      "無形固定資産",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "無形固定資産の会計に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "自社が開発した営業秘密の製造技術などにより、同業他社に比べて継続的に高い収益性を獲得している場合であっても、これを無形固定資産に計上することはできない。",
      "イ": "自社の研究開発活動により特許権を取得した場合、過去の年度に費用処理した研究開発費を戻入れ、無形固定資産として計上しなければならない。",
      "ウ": "受注に基づいて制作したソフトウェアは無形固定資産に計上され、規則的に償却される。",
      "エ": "無形固定資産に計上されるのれんは、耐用年数を確定できない場合、規則的な償却を行わない。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "自社の営業秘密による超過収益力があっても、内部で生じたのれんに当たる価値を自社の無形固定資産には計上できない。",
    "choiceExplanations": {
      "ア": "自社の営業秘密による超過収益力があっても、内部で生じたのれんに当たる価値を自社の無形固定資産には計上できない。",
      "イ": "過去に費用処理した研究開発費は、後から特許が取得できたことを理由として資産に戻さない。",
      "ウ": "顧客の受注に基づくソフトウェアは受注制作として処理する。受注者が自社の無形固定資産に計上して規則的に償却するものではない。",
      "エ": "日本の基準で資産計上したのれんは、効果の及ぶ期間を見積もり、20年以内の期間にわたって規則的に償却する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 9,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "外貨建取引",
    "topicTags": [
      "外貨建取引",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "外貨建取引の決算時の処理に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "外貨建売上債権においては、円安の進行によって為替差損が発生する。",
      "イ": "外貨建の子会社株式・関連会社株式は、決算日の直物為替相場により換算する。",
      "ウ": "在外支店の有形固定資産は、決算日の直物為替相場により換算する。",
      "エ": "取引発生後に付した為替予約について振当処理を適用する場合、予約時の直物相場と先物相場の差額は、適切な期間にわたって合理的な基準により配分し、各期の損益として処理する。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "為替予約の振当処理で、予約時の直物相場と先物相場との差は直先差額である。対象となる期間に合理的な基準で配分し、各期の損益にする。",
    "choiceExplanations": {
      "ア": "外貨建売上債権は、円安になると同じ外貨額を円に換算した残高が増える。この場合は為替差益となる。",
      "イ": "外貨建の子会社株式・関連会社株式は原則として取得時の相場によって換算する。",
      "ウ": "在外支店の有形固定資産は原則として取得時の相場で換算する。在外子会社の財務諸表を換算する場合とは区別する。",
      "エ": "為替予約の振当処理で、予約時の直物相場と先物相場との差は直先差額である。対象となる期間に合理的な基準で配分し、各期の損益にする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 10,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "標準原価計算",
    "topicTags": [
      "標準原価計算",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "当工場は標準原価計算を採用している。以下の資料に基づき、作業時間差異として最も適切なものを下記の解答群から選べ。なお、直接材料は工程の始点で全量投入している。",
    "choices": {
      "ア": "不利差異： 8,400 円",
      "イ": "不利差異： 8,500 円",
      "ウ": "不利差異：109,200 円",
      "エ": "不利差異：110,500 円"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "当月の加工換算量は180＋40×75%－80×50%＝170個で、標準作業時間は680時間となる。実際は690時間で10時間長く、標準賃率850円を掛けた8,500円の不利差異である。",
    "choiceExplanations": {
      "ア": "8,400円は10時間の差に実際賃率840円を掛けた値である。作業時間差異は標準賃率850円を使う。",
      "イ": "当月の加工換算量は180＋40×75%－80×50%＝170個で、標準作業時間は680時間となる。実際は690時間で10時間長く、標準賃率850円を掛けた8,500円の不利差異である。",
      "ウ": "加工換算量は完成品と期首・期末仕掛品の進捗を反映した170個である。実際賃率ではなく標準賃率を用いる。",
      "エ": "110,500円は当月投入の140個だけに4時間を掛けて標準時間とした場合の差額である。加工換算量は期首・期末仕掛品を考慮する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-zaimu-q10.png"
    ],
    "imageAltTexts": [
      "標準原価、当月の生産量、実際原価の資料。標準は時間850円で製品1個当たり4時間、実績は時間840円で690時間。加工進捗度は月初の仕掛品80個が50%、月末の仕掛品40個が75%、完成品は180個。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q11-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 11,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "財務指標",
    "topicTags": [
      "財務指標",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "当社の貸借対照表および損益計算書は以下のとおりであった。下記の設問に答えよ。\n\n（設問1）\n20X2 年の固定長期適合率の値として、最も適切なものはどれか。",
    "choices": {
      "ア": "64.44 ％",
      "イ": "82.86 ％",
      "ウ": "105.45 ％",
      "エ": "193.33 ％"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "20X2年の固定資産は116,000千円、自己資本110,000千円、固定負債30,000千円である。116,000÷(110,000＋30,000)×100＝約82.86%となる。",
    "choiceExplanations": {
      "ア": "64.44%は固定資産116,000千円を総資産180,000千円で割った値である。固定長期適合率は長期安定資金に対する固定資産の割合である。",
      "イ": "20X2年の固定資産は116,000千円、自己資本110,000千円、固定負債30,000千円である。116,000÷(110,000＋30,000)×100＝約82.86%となる。",
      "ウ": "105.45%は固定資産を自己資本だけで割った固定比率である。固定長期適合率では分母に固定負債も加える。",
      "エ": "193.33%は資本金60,000千円だけを分母とした値である。自己資本には利益剰余金も含め、さらに固定負債を足す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-zaimu-q11.png"
    ],
    "imageAltTexts": [
      "20X1年、20X2年の貸借対照表と損益計算書。単位千円。総資産170,000と180,000、固定資産105,000と116,000、長期借入金はともに30,000、自己資本100,000と110,000、売上高187,000と198,000、当期純利益10,500と11,000。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q11-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 11,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "財務指標",
    "topicTags": [
      "財務指標",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "当社の貸借対照表および損益計算書は以下のとおりであった。下記の設問に答えよ。\n\n（設問2）\n20X1 年から 20X2 年の自己資本利益率の変化とその要因に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "自己資本利益率は上昇したが、その要因の １ つは財務レバレッジの上昇である。",
      "イ": "自己資本利益率は上昇したが、その要因の １ つは総資本回転率の上昇である。",
      "ウ": "自己資本利益率は低下したが、その要因の １ つは財務レバレッジの低下である。",
      "エ": "自己資本利益率は低下したが、その要因の １ つは総資本回転率の低下である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "自己資本利益率は10,500÷100,000＝10.5%から、11,000÷110,000＝10.0%へ低下した。総資本回転率は同じで、財務レバレッジが低下した。",
    "choiceExplanations": {
      "ア": "財務レバレッジは170,000÷100,000＝1.70倍から、180,000÷110,000＝約1.64倍へ低下した。利益率も上昇していない。",
      "イ": "総資本回転率は187,000÷170,000と198,000÷180,000で、双方とも1.10回である。",
      "ウ": "自己資本利益率は10,500÷100,000＝10.5%から、11,000÷110,000＝10.0%へ低下した。総資本回転率は同じで、財務レバレッジが低下した。",
      "エ": "自己資本利益率が低下した点は合っているが、総資本回転率は両年とも1.10回である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-zaimu-q11.png"
    ],
    "imageAltTexts": [
      "20X1年、20X2年の貸借対照表と損益計算書。単位千円。総資産170,000と180,000、固定資産105,000と116,000、長期借入金はともに30,000、自己資本100,000と110,000、売上高187,000と198,000、当期純利益10,500と11,000。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 12,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "運転資金管理",
    "topicTags": [
      "運転資金管理",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "運転資金管理に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "売上高を一定とすると、期中平均売上債権が少なくなるほど、売上債権回転率は小さくなる。",
      "イ": "売掛金を増加させる動機の １ つとして、現金保有を増加させることが挙げられる。",
      "ウ": "営業サイクルは、企業が商品を仕入れてから、商品を販売して現金化するまでに要する期間である。",
      "エ": "企業間信用は、商品を販売したりサービスを提供した企業にとっての資金調達手段とみなすことができる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "営業サイクルは、在庫を仕入れて販売するまでの期間と、販売後に売上債権を回収するまでの期間を合わせたものである。",
    "choiceExplanations": {
      "ア": "売上債権回転率は売上高を平均売上債権で割る。同じ売上に対して分母が小さくなれば回転率は上がる。",
      "イ": "売掛金は販売代金が未回収の金額である。掛け販売が増えても、回収するまでは現金保有の増加にはならない。",
      "ウ": "営業サイクルは、在庫を仕入れて販売するまでの期間と、販売後に売上債権を回収するまでの期間を合わせたものである。",
      "エ": "企業間信用で支払猶予を受け、資金調達と同様の効果を得るのは購入側である。販売側には回収前の売上債権が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 13,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "営業キャッシュ・フロー",
    "topicTags": [
      "営業キャッシュ・フロー",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "Ｄ社は卸売業を営んでいる。以下のＤ社の資料に基づく売上および仕入に関するキャッシュ・フローの記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "売上によるキャッシュ・インフロー：960 万円\n仕入によるキャッシュ・アウトフロー：560 万円",
      "イ": "売上によるキャッシュ・インフロー：960 万円\n仕入によるキャッシュ・アウトフロー：570 万円",
      "ウ": "売上によるキャッシュ・インフロー：1,040 万円\n仕入によるキャッシュ・アウトフロー：560 万円",
      "エ": "売上によるキャッシュ・インフロー：1,040 万円\n仕入によるキャッシュ・アウトフロー：570 万円"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "売上高1,000万円から売掛金の増加40万円を引くと入金は960万円である。仕入高600万円から買掛金と支払手形の増加計40万円を引くと支払いは560万円になる。",
    "choiceExplanations": {
      "ア": "売上高1,000万円から売掛金の増加40万円を引くと入金は960万円である。仕入高600万円から買掛金と支払手形の増加計40万円を引くと支払いは560万円になる。",
      "イ": "売上による入金960万円は合っている。仕入の支払額には買掛金の増加だけでなく、支払手形の増加10万円も反映する。",
      "ウ": "買掛金と支払手形を調整した560万円は合っている。売掛金の増加は未回収分なので、売上に足すのではなく引く。",
      "エ": "未回収の増加40万円は売上から引く。仕入には買掛金30万円増に加え、支払手形10万円増も反映する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-zaimu-q13.png"
    ],
    "imageAltTexts": [
      "D社の期首・期末残高と売上・仕入高。単位万円。商品40と60、売掛金80と120、買掛金40と70、支払手形10と20、未払金5と10、当期売上高1,000、当期仕入高600。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q14-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 14,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "財務指標",
    "topicTags": [
      "財務指標",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "以下の資料はＥ社の連結財務諸表に基づいて計算された財務指標を示している。この資料に基づき、下記の設問に答えよ。なお、株主資本、自己資本および純資産は同額である。\n\n（設問1）\nＥ社の ROE として、最も適切なものはどれか。",
    "choices": {
      "ア": "1.23 ％",
      "イ": "5.34 ％",
      "ウ": "5.70 ％",
      "エ": "9.50 ％"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "DOEは配当÷自己資本であり、ROEに配当性向を掛けた値となる。ROE＝3.42%÷0.36＝9.50%である。",
    "choiceExplanations": {
      "ア": "1.23%はDOE3.42%に配当性向36%を掛けた値である。DOE＝ROE×配当性向なので、ROEは配当性向で割って求める。",
      "イ": "5.34%は数値の組合せが違う。DOEを自己資本比率ではなく、配当性向36%で割る。",
      "ウ": "5.70%はDOEを自己資本比率で割った値である。ROEとDOEを結び付けるのは配当性向である。",
      "エ": "DOEは配当÷自己資本であり、ROEに配当性向を掛けた値となる。ROE＝3.42%÷0.36＝9.50%である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-zaimu-q14.png"
    ],
    "imageAltTexts": [
      "E社の連結財務指標。自己資本比率60.00%、配当性向36.00%、株主資本配当率3.42%、株価収益率16.00倍。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q14-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 14,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "財務指標",
    "topicTags": [
      "財務指標",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "以下の資料はＥ社の連結財務諸表に基づいて計算された財務指標を示している。この資料に基づき、下記の設問に答えよ。なお、株主資本、自己資本および純資産は同額である。\n\n（設問2）\nＥ社の配当利回りとして、最も適切なものはどれか。",
    "choices": {
      "ア": "0.21 ％",
      "イ": "2.25 ％",
      "ウ": "5.20 ％",
      "エ": "5.70 ％"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "配当利回りは1株当たり配当÷株価であり、配当性向÷PERと計算できる。36%÷16＝2.25%となる。",
    "choiceExplanations": {
      "ア": "0.21%はDOEをPERで割った値である。DOEは分母が自己資本であり、配当利回りを求めるこの計算には直接使わない。",
      "イ": "配当利回りは1株当たり配当÷株価であり、配当性向÷PERと計算できる。36%÷16＝2.25%となる。",
      "ウ": "株価に対する配当を求めるには、配当性向36%をPER16倍で割る。5.20%にはならない。",
      "エ": "5.70%はDOEを自己資本比率で割った値である。配当利回りは株価に対する配当で、配当性向とPERから計算する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-zaimu-q14.png"
    ],
    "imageAltTexts": [
      "E社の連結財務指標。自己資本比率60.00%、配当性向36.00%、株主資本配当率3.42%、株価収益率16.00倍。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 15,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "ポートフォリオの期待収益率とリスク",
    "topicTags": [
      "ポートフォリオの期待収益率とリスク",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "Ｆ社は現在、余剰資金の全額を、 １ ％ の収益率をもつ安全資産と、期待収益率５ ％、標準偏差 ７ ％ の株式に等額投資する投資案を検討している。この投資案の期待収益率と標準偏差の組み合わせとして、最も適切なものはどれか。",
    "choices": {
      "ア": "期待収益率： ３ ％ 標準偏差：3.5 ％",
      "イ": "期待収益率： ３ ％ 標準偏差：4.5 ％",
      "ウ": "期待収益率： ６ ％ 標準偏差：3.5 ％",
      "エ": "期待収益率： ６ ％ 標準偏差：4.5 ％"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "等額投資なので期待収益率は(1%＋5%)÷2＝3%である。安全資産の変動はゼロなので標準偏差は株式の7%に投資割合0.5を掛けた3.5%となる。",
    "choiceExplanations": {
      "ア": "等額投資なので期待収益率は(1%＋5%)÷2＝3%である。安全資産の変動はゼロなので標準偏差は株式の7%に投資割合0.5を掛けた3.5%となる。",
      "イ": "期待収益率の3%は合っている。安全資産には変動がないため、標準偏差は7%の半分の3.5%になる。",
      "ウ": "標準偏差は3.5%で合っている。期待収益率は二つの収益率を足した6%ではなく、等額投資で平均した3%である。",
      "エ": "期待収益率は投資割合で重み付けし、安全資産にリスクがないため標準偏差は株式の投資割合に比例する。計算結果はそれぞれ3%と3.5%である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 16,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "効率的フロンティア",
    "topicTags": [
      "効率的フロンティア",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "ポートフォリオ理論に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "危険回避的な投資家にとって、実現可能な最小分散ポートフォリオを選択することが最適となる。",
      "イ": "効率的フロンティア上の点は、平均収益率と分散可能でないリスクの最適な組み合わせを表したものである。",
      "ウ": "個々の危険資産のリスクの一部は、危険資産のリターンが完全に正相関の場合に、資産の組み合わせで取り除くことができる。",
      "エ": "市場ポートフォリオは、効率的フロンティアの形状、リスクフリー・レートの値、投資家の危険回避度に依存する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "効率的フロンティアは、与えられたリスクに対し最大の期待収益率となる組合せを示す。分散投資によって削減できるリスクを取り除いて効率的な組合せを考える。",
    "choiceExplanations": {
      "ア": "危険回避的でも期待収益率とリスクの組合せを選ぶため、最小分散の一点を全員が選ぶことにはならない。",
      "イ": "効率的フロンティアは、与えられたリスクに対し最大の期待収益率となる組合せを示す。分散投資によって削減できるリスクを取り除いて効率的な組合せを考える。",
      "ウ": "リターンが完全に正相関する場合は同じ方向に動く。組合せによるリスクの相殺効果は相関が低い場合に得られる。",
      "エ": "安全資産を導入したときの市場ポートフォリオは、安全利子率から引いた直線と効率的フロンティアの接点である。各投資家の危険回避度は、安全資産との配分に影響する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 17,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "投資の不確実性分析",
    "topicTags": [
      "投資の不確実性分析",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "次の文章の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。割引キャッシュフロー法には、キャッシュフロー予測に関する問題、資本コスト推定の問題、不確実で複雑な意思決定機会への対処の問題がある。このうち、キャッシュフロー予測に関する問題は、予測方法の問題と予測値にかかわる不確実性の問題に分けられる。予測値にかかわる不確実性の問題に対処する方法としては、 Ａ 、 Ｂ 、 Ｃ などの適用が考えられる。 Ａ は将来の企業環境の状態を記述するストーリーに基づいて分析するものである。また、 Ｂ と Ｃ は、キャッシュフローに不確実性を生じさせる要因を確率変数とみなして、 キャッシュフローの確率分布を見い出す方法である。Ｃ は、コンピュータなどを利用して反復計算し、予測を繰り返す点に特徴がある。",
    "choices": {
      "ア": "Ａ：シナリオ分析\nＢ：ディシジョン・ツリー分析\nＣ：モンテカルロ・シミュレーション",
      "イ": "Ａ：シナリオ分析\nＢ：モンテカルロ・シミュレーション\nＣ：ディシジョン・ツリー分析",
      "ウ": "Ａ：ディシジョン・ツリー分析\nＢ：シナリオ分析\nＣ：モンテカルロ・シミュレーション",
      "エ": "Ａ：モンテカルロ・シミュレーション\nＢ：シナリオ分析\nＣ：ディシジョン・ツリー分析"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "シナリオ分析は将来の環境を筋書きとして置く。決定と結果の分岐を扱うのがディシジョン・ツリー、確率分布を反復計算で推定するのがモンテカルロ法である。",
    "choiceExplanations": {
      "ア": "シナリオ分析は将来の環境を筋書きとして置く。決定と結果の分岐を扱うのがディシジョン・ツリー、確率分布を反復計算で推定するのがモンテカルロ法である。",
      "イ": "Aのシナリオ分析は合っている。多数の試行をコンピュータで反復して予測するCはモンテカルロ法である。",
      "ウ": "Cのモンテカルロ法は合っている。Aがシナリオ分析、確率を持つ分岐をたどるBがディシジョン・ツリーである。",
      "エ": "将来の環境を表すストーリーに基づくAはシナリオ分析、反復計算で分布を推定するCはモンテカルロ法である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 18,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "正味現在価値",
    "topicTags": [
      "正味現在価値",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "次のＧ社に関する記述として、最も適切なものを下記の解答群から選べ。なお、割引率はゼロとする。Ｇ社は、初期投資額 500 万円を必要とする投資案（経済命数 ２ 年）を検討中である。第 １ 年度のキャッシュフローが 500 万円となる確率は 0.5、300 万円となる確率は 0.5 と予測されている。第 ２ 年度のキャッシュフローと、その確率については次のとおりである。まず、第 １ 年度に 500 万円のキャッシュフローが生じた場合に、第 ２ 年度のキャッシュフローが 800 万円となる確率は 0.5、400 万円となる確率は 0.5 と予測されている。次に、第 １ 年度に 300 万円のキャッシュフローが生じた場合に、第 ２ 年度のキャッシュフローが 300 万円となる確率は 0.5、100 万円となる確率は 0.5 と予測されている。",
    "choices": {
      "ア": "正味現在価値が 300 万円となる確率は 0.5 である。",
      "イ": "正味現在価値が 500 万円となる確率は 0.5 である。",
      "ウ": "正味現在価値の期待値は－300 万円である。",
      "エ": "正味現在価値の期待値は 300 万円である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "割引率がゼロなので、2年分のキャッシュフローから初期投資500万円を引く。800、400、100、－100万円が各確率0.25で生じ、期待値は300万円である。",
    "choiceExplanations": {
      "ア": "4通りのNPVは800、400、100、－100万円である。300万円はその中の結果ではなく期待値である。",
      "イ": "NPVが500万円になる経路は存在しない。各経路の確率は0.5×0.5＝0.25で、得られる額は4通りである。",
      "ウ": "初期投資を引いたNPVは800、400、100、－100万円である。等確率の平均は－300万円ではなく300万円となる。",
      "エ": "割引率がゼロなので、2年分のキャッシュフローから初期投資500万円を引く。800、400、100、－100万円が各確率0.25で生じ、期待値は300万円である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 19,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "モジリアーニ・ミラー理論",
    "topicTags": [
      "モジリアーニ・ミラー理論",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "モジリアーニ・ミラー理論に関する記述として、最も適切なものはどれか。なお、株式市場は完全で、取引コストは存在しないものとする。",
    "choices": {
      "ア": "法人税が存在するとき、負債の利用度が高まるほど、株主資本コストは低下する。",
      "イ": "法人税が存在するとき、負債の利用度が高まるほど、全社的加重平均資本コストは低下する。",
      "ウ": "法人税がないとき、負債の利用度が高まるほど、株主資本コストは低下する。",
      "エ": "法人税がないとき、負債の利用度が高まるほど、全社的加重平均資本コストは低下する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "法人税がある場合、支払利息の損金算入による節税効果がある。MM理論では負債の利用で全社的な加重平均資本コストが低下する。",
    "choiceExplanations": {
      "ア": "負債比率が高いと株主が負うリスクが増える。法人税がある場合でも株主資本コストは負債の増加で低下しない。",
      "イ": "法人税がある場合、支払利息の損金算入による節税効果がある。MM理論では負債の利用で全社的な加重平均資本コストが低下する。",
      "ウ": "税がない場合も負債の増加で株主の取り分は不安定になり、株主資本コストは上昇する。",
      "エ": "税がない完全市場では負債の割合が増える分だけ株主資本コストが上がる。加重平均資本コストは一定である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 20,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "配当政策",
    "topicTags": [
      "配当政策",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "Ｈ社は全額自己資本からなる企業であり、今期の配当政策を検討中である。Ｈ社の資産構成は、現金 1,000 万円、その他の資産 4,000 万円である。また、Ｈ社は毎期 300 万円の営業利益をあげており、次期以降も同額の営業利益が期待されている。Ｈ社では減価償却費と同額を営業活動維持のために設備投資にあてており、また運転資本の増減もなく、減価償却費以外の費用はすべて現金支出であるため、上記の営業利益はフリーキャッシュフローに一致する。Ｈ社の現在の株価は 500 円であり、発行済み株式数は 10 万株である。Ｈ社が現金 200 万円を配当した場合、配当支払後の株価に関する記述として、最も適切なものはどれか。なお、株式市場は完全で、税金や取引コストは存在しないものとする。",
    "choices": {
      "ア": "株価は配当前と配当後で変化しない。",
      "イ": "株価は配当前と比較して 20 円下落する。",
      "ウ": "株価は配当前と比較して 50 円下落する。",
      "エ": "株価は配当前と比較して 50 円上昇する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "200万円を10万株で割ると1株当たり配当は20円である。完全市場の前提では配当落ちのため株価が500円から480円へ下がる。",
    "choiceExplanations": {
      "ア": "完全市場で配当の支払いは企業の現金を減らすため、配当落ち後の株価は1株当たり配当相当額だけ下がる。",
      "イ": "200万円を10万株で割ると1株当たり配当は20円である。完全市場の前提では配当落ちのため株価が500円から480円へ下がる。",
      "ウ": "配当による資産の減少200万円を発行済み10万株で割ると、1株当たりの下落幅は20円である。",
      "エ": "配当を出すと企業の手元現金が減る。将来のフリーキャッシュフローが変わらない前提では1株当たり20円の下落となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 21,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "オプション価値",
    "topicTags": [
      "オプション価値",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "現在の原資産価格が 500 円であるときのオプション価値に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "行使価格が 500 円のコールオプションはアット・ザ・マネーの状態にあり、オプションの本源的価値は 80 円である。",
      "イ": "行使価格が 520 円のコールオプションはイン・ザ・マネーの状態にあり、オプションの本源的価値は 20 円である。",
      "ウ": "行使価格が 580 円のプットオプションはイン・ザ・マネーの状態にあり、オプションの本源的価値は 80 円である。",
      "エ": "行使価格が 620 円のプットオプションはアウト・オブ・ザ・マネーの状態にあり、オプションの本源的価値は－120 円である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "原資産が500円のとき580円で売れるプットには80円の本源的価値がある。権利を行使すると有利なイン・ザ・マネーである。",
    "choiceExplanations": {
      "ア": "行使価格と原資産価格が等しいのでアット・ザ・マネーである。本源的価値は差額ゼロである。",
      "イ": "500円の原資産を520円で買う権利は、直ちに行使しても利益がない。アウト・オブ・ザ・マネーで本源的価値はゼロである。",
      "ウ": "原資産が500円のとき580円で売れるプットには80円の本源的価値がある。権利を行使すると有利なイン・ザ・マネーである。",
      "エ": "620円で売れるプットは500円の原資産に対してイン・ザ・マネーである。本源的価値は120円で、負にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-zaimu-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "zaimu",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 22,
    "subject": "財務・会計（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "株主価値評価",
    "topicTags": [
      "株主価値評価",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "有利子負債がある企業に適用される株主価値評価モデルに関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 割引キャッシュフローモデルによる株主価値は、株主に帰属する将来の期待フリーキャッシュフローを割引いた現在価値の合計である。\nｂ 割引超過利益モデルと配当割引モデルは、クリーンサープラス関係を通じて、理論的な整合性が図られている。\nｃ 割引超過利益モデルと配当割引モデルのターミナル・バリューは、理論的に等価である。\nｄ 割引超過利益モデルによれば、株主価値は将来の超過利益の割引現在価値を合計したものになる。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｃ",
      "ウ": "ａとｄ",
      "エ": "ｂとｃ",
      "オ": "ｂとｄ"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "株主に帰属するフリーキャッシュフローを適切な株主資本コストで割り引くと株主価値になる。クリーンサープラス関係が成立すると、配当割引モデルから超過利益によるモデルを導ける。",
    "choiceExplanations": {
      "ア": "株主に帰属するフリーキャッシュフローを適切な株主資本コストで割り引くと株主価値になる。クリーンサープラス関係が成立すると、配当割引モデルから超過利益によるモデルを導ける。",
      "イ": "aは正しい。モデル全体の株主価値が整合しても、将来の配当と将来の超過利益から求める残存部分が常にそのまま同額となるわけではない。",
      "ウ": "aは正しいが、超過利益モデルには将来の超過利益の現在価値に加え、評価時点の株主資本の帳簿価額が含まれる。",
      "エ": "bは正しい。期末の帳簿価額を介してモデル全体はつながるが、各モデルのターミナル・バリューをそのまま等価とするcは誤りである。",
      "オ": "bは正しい。株主価値を超過利益で評価する際には、超過利益の現在価値だけでなく、現在の株主資本の帳簿価額も加える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/B1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/B.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） B 財務・会計",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  }
];
