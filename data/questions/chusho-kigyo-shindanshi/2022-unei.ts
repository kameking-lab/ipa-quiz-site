import type { Question } from "@/lib/questions/types";

export const CHUSHO_2022_D_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 1,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産管理の指標",
    "topicTags": [
      "生産管理の指標"
    ],
    "difficulty": 3,
    "question": "管理指標に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "検査によって不適合と判断された製品の数を検査によって適合と判断された製品の数で除して、不適合品率を求めた。",
      "イ": "産出された品物の量を投入された主原材料の量で除して、歩留りを求めた。",
      "ウ": "実績時間を標準時間で除して、作業能率を求めた。",
      "エ": "投下した労働量をその結果として得られた生産量で除して、労働生産性を求めた。",
      "オ": "副材料、消耗品、エネルギーなどの消費量を工数または製品量で除して、作業密度を求めた。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "投入した主原材料からどれだけ製品を得られたかを表す比率が歩留りである。作業能率は、作業実績に対応する標準時間を実績時間で割って求める。",
    "choiceExplanations": {
      "ア": "不適合品率の分母は、適合品だけの数ではなく検査した総数である。",
      "イ": "投入した主原材料からどれだけ製品を得られたかを表す比率が歩留りである。",
      "ウ": "作業能率は、作業実績に対応する標準時間を実績時間で割って求める。",
      "エ": "労働生産性は生産量などの産出を労働投入量で割る。この選択肢は分子と分母が逆である。",
      "オ": "工数や製品量当たりの副材料・エネルギー消費量は、各投入物の原単位である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q2-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 2,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ラインバランス",
    "topicTags": [
      "ラインバランス"
    ],
    "difficulty": 3,
    "question": "以下の文章を読んで、下記の設問に答えよ。要素作業ａ〜ｈの先行関係が下図に示される製品を単一ラインで生産する。稼働予定時間は 700 時間で、目標生産計画量は 5,900 個である。ただし、設定サイクルタイムは分単位の整数値とする。\n\n（設問1）\n目標生産計画量を達成することを前提に、生産ラインの各工程に要素作業を割り付けた。その割り付けの組み合わせとして、最も適切なものはどれか。",
    "choices": {
      "ア": "第 1 工程：ａ 第 2 工程：ｂ、ｃ 第 3 工程：ｄ 第 4 工程：ｅ、ｈ 第 5 工程：ｆ、ｇ",
      "イ": "第 1 工程：ａ、ｂ 第 2 工程：ｃ、ｅ 第 3 工程：ｄ 第 4 工程：ｆ、ｇ 第 5 工程：ｈ",
      "ウ": "第 1 工程：ａ、ｂ 第 2 工程：ｃ、ｆ 第 3 工程：ｄ、ｅ 第 4 工程：ｇ、ｈ",
      "エ": "第 1 工程：ａ、ｂ、ｃ 第 2 工程：ｄ、ｅ、ｇ 第 3 工程：ｆ、ｈ",
      "オ": "第 1 工程：ａ、ｂ、ｅ 第 2 工程：ｄ、ｇ 第 3 工程：ｃ、ｆ 第 4 工程：ｈ"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "各工程は順に6.7分、3.7分、5.7分、6.7分、4.9分で、すべて７分以内である。先行関係も満たす。",
    "choiceExplanations": {
      "ア": "第４工程のｈには第５工程に割り当てたｆとｇが先行する必要がある。",
      "イ": "各工程は順に6.7分、3.7分、5.7分、6.7分、4.9分で、すべて７分以内である。先行関係も満たす。",
      "ウ": "第２工程のｃとｆは合わせて7.2分を要し、設定できる７分を超える。",
      "エ": "第１工程のａ、ｂ、ｃは計9.2分であり、目標数量に必要な７分以内に収まらない。",
      "オ": "第１工程のａ、ｂ、ｅは計7.9分であり、設定サイクルタイムの上限を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q2.png"
    ],
    "imageAltTexts": [
      "要素作業の時間はａが2.9分、ｂが3.8分、ｃが2.5分、ｄが5.7分、ｅが1.2分、ｆが4.7分、ｇが2.0分、ｈが4.9分。先行関係はａ→ｂ・ｃ、ｂ→ｄ・ｅ、ｃ→ｆ、ｄ・ｅ→ｇ、ｆ・ｇ→ｈ。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q2-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 2,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ラインバランス",
    "topicTags": [
      "ラインバランス"
    ],
    "difficulty": 3,
    "question": "以下の文章を読んで、下記の設問に答えよ。要素作業ａ〜ｈの先行関係が下図に示される製品を単一ラインで生産する。稼働予定時間は 700 時間で、目標生産計画量は 5,900 個である。ただし、設定サイクルタイムは分単位の整数値とする。\n\n（設問2）\n生産ラインの編成効率として、最も近い値はどれか（単位：％）。",
    "choices": {
      "ア": "69",
      "イ": "79",
      "ウ": "89",
      "エ": "97",
      "オ": "99"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "分単位の整数で設定可能なサイクルタイムの上限は、700×60÷5,900を切り下げた７分である。５工程の編成効率は27.7÷(５×７)≒79.1％になる。",
    "choiceExplanations": {
      "ア": "適切な割り付けは５工程であり、総作業時間27.7分を35分で除すと69％より高い。",
      "イ": "分単位の整数で設定可能なサイクルタイムの上限は、700×60÷5,900を切り下げた７分である。５工程の編成効率は27.7÷(５×７)≒79.1％になる。",
      "ウ": "89％は５工程でサイクルタイムを７分とした値と一致しない。分母は５工程合計の35分である。",
      "エ": "どの工程にも実作業を割り付けていない時間があり、総作業時間が35分に近いとした97％は過大である。",
      "オ": "全工程で合計7.3分の余裕が生じるので、ほぼ完全に均衡する99％にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q2.png"
    ],
    "imageAltTexts": [
      "要素作業の時間はａが2.9分、ｂが3.8分、ｃが2.5分、ｄが5.7分、ｅが1.2分、ｆが4.7分、ｇが2.0分、ｈが4.9分。先行関係はａ→ｂ・ｃ、ｂ→ｄ・ｅ、ｃ→ｆ、ｄ・ｅ→ｇ、ｆ・ｇ→ｈ。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 3,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "製品設計",
    "topicTags": [
      "製品設計"
    ],
    "difficulty": 3,
    "question": "製品設計に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ あらゆる業界で環境配慮型製品へのシフトが進み、製品設計・開発において、材料調達から出荷までのライフサイクル全体にわたって環境負荷を抑えることは企業の責任である。\nｂ 機能設計では、製品の性能を実現するために必要な機能と、その機能を実現させる具体的な構造が決定される。\nｃ 生産設計では、製品設計において決定された製品品質、生産量、納期を考慮した工程表や工程図が作成され、作業方法および生産設備が決定する。\nｄ 製品寿命の短期化に対応するために、製品設計と生産設計を並行して行う手法であるエンジニアリング・アプローチを活用する。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：正 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：正 ｄ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：誤 ｄ：正"
    },
    "answer": [],
    "officialAnswerNumber": null,
    "explanation": "中小企業診断協会は2022年8月30日の公式訂正で、公表した正解の選択肢が不適切だったため、受験者全員の解答を正解扱いにした。",
    "choiceExplanations": {
      "ア": "製品の環境負荷を考えるライフサイクルには、出荷後の使用や廃棄も含まれる。公式訂正で全員正解扱いとなった。",
      "イ": "機能設計では要求を満たす機能を具体化し、その後の設計で構造や形状を詰める。機能と構造のどこまでを機能設計と呼ぶかは整理が必要な点である。",
      "ウ": "生産設計では、つくりやすさや品質を考慮して加工・組立方法などを検討する。工程表や設備の決定は工程設計との区別に注意する。",
      "エ": "製品設計と生産準備などを並行して進める手法は、コンカレント・エンジニアリングと呼ばれる。",
      "オ": "この組合せに限らず、公式訂正後の採点ではすべての受験者が本問の得点を受ける。並行した設計を指す標準的な名称はコンカレント・エンジニアリングである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "officialScoring": {
      "kind": "credit-for-all",
      "reason": "中小企業診断協会は2022年8月30日の公式訂正で、公表した正解の選択肢が不適切だったため、受験者全員の解答を正解扱いにした。"
    },
    "officialReferenceUrls": [
      "https://www.jf-cmca.jp/attach/test/r04/seikai_teisei.pdf"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 4,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産方式",
    "topicTags": [
      "生産方式"
    ],
    "difficulty": 3,
    "question": "生産方式に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ オーダエントリー方式は、生産工程にある半製品に顧客のオーダを引き当て、顧客が希望した仕様の製品として完成させるために、仕様に合わせた部品や作業を選択して生産する方式である。\nｂ 生産座席予約方式は、設備の稼働状況を基に、顧客のオーダを到着順に生産する方式である。\nｃ モジュール生産方式は、あらかじめモジュール部品を複数用意し、受注後にそれらの組み合わせによって多品種の最終製品を生産する方式で、リードタイムの短縮が期待できる。\nｄ 製番管理方式は、製品の組立を開始する時点で部品を引き当てる方式で、ロット生産にも利用可能で、特にロットサイズが大きい場合に適している。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "ａは仕掛品に受注を引き当てる方式、ｃは受注後に既成のモジュールを組み合わせる方式を説明している。到着順とするｂ、大ロット向けとするｄは誤りである。",
    "choiceExplanations": {
      "ア": "生産座席を予約する際は納期と計画上の生産枠を対応させるため、単に到着順で生産するとは限らない。",
      "イ": "製番管理は、受注品や個別の製造指図ごとに部品や進捗を追跡しやすい方式である。大きなロットに特に向くというｄは誤りである。",
      "ウ": "ａは仕掛品に受注を引き当てる方式、ｃは受注後に既成のモジュールを組み合わせる方式を説明している。到着順とするｂ、大ロット向けとするｄは誤りである。",
      "エ": "ａの半製品への引当てとｃのモジュールの組合せは、どちらもそれぞれの方式に合う。",
      "オ": "オーダエントリー方式では共通の半製品を準備し、注文仕様に合わせて仕上げる。したがってａを誤りとする組合せは成立しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 5,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ｔ検定",
    "topicTags": [
      "ｔ検定"
    ],
    "difficulty": 3,
    "question": "統計的検定に関する以下の文章の空欄ＡとＢに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。なお、検定においては、下の t 表を使用すること。\nある製品特性の平均値は 65.5 である。この特性について、技術部門で新しい生産条件を設定して実験し、 9 個のサンプルを得た。その平均値は 71.0、標準偏差は 9.0 であった。生産条件の変更によって特性の平均値が上がったか否かを、有意水準 5 ％で t 検定したところ、検定統計量の値は Ａ 。これより、生産条件の変更によって平均値は上がったと Ｂ 。",
    "choices": {
      "ア": "Ａ：1.833 以上となった Ｂ：いえる",
      "イ": "Ａ：1.833 より小さくなった Ｂ：いえない",
      "ウ": "Ａ：1.860 以上となった Ｂ：いえる",
      "エ": "Ａ：1.860 より小さくなった Ｂ：いえない",
      "オ": "Ａ：1.860 より小さくなった Ｂ：いえる"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "自由度８の片側５％の臨界値は1.860である。統計量1.83333…はこれを下回るため、平均が上がったとはいえない。",
    "choiceExplanations": {
      "ア": "標本は９個なので、ｔ表で使う自由度は８である。統計量は約1.83333で、棄却の基準となる1.860を下回る。",
      "イ": "統計量は(71.0－65.5)÷(9.0÷√９)＝1.83333…であり、1.833よりわずかに大きい。",
      "ウ": "分子は標本平均と従来の平均の差5.5、分母は標準誤差3.0なので、統計量は1.860未満である。",
      "エ": "自由度８の片側５％の臨界値は1.860である。統計量1.83333…はこれを下回るため、平均が上がったとはいえない。",
      "オ": "1.860より小さいという比較は合っているが、帰無仮説は棄却できず、平均が上がったとは判断できない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q5.png"
    ],
    "imageAltTexts": [
      "ｔ表。自由度１から10までの５％上側点は順に6.314、2.920、2.353、2.132、2.015、1.943、1.895、1.860、1.833、1.812。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 6,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "資材所要量計画",
    "topicTags": [
      "資材所要量計画"
    ],
    "difficulty": 3,
    "question": "資材所要量計画に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "従属需要品目とは、資材調達先企業からの要望に従い、生産する時期と数量が決定される品目のことである。",
      "イ": "タイムバケットとは、外部企業からの資材の調達にかかる所要時間のことである。",
      "ウ": "独立需要品目とは、営業部門とは無関係に、生産部門や資材調達部門が独自の需要予測に基づいて、生産する時期と必要量を決定する品目のことである。",
      "エ": "部品構成表とは、購買部門が調達する資材と部品をリスト化した表のことである。",
      "オ": "部品展開とは、計画期間内に生産する最終製品の種類と数量が決まったとき、それらを生産するのに必要な構成部品の種類とその数量を求めることである。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "最終製品の計画数量と部品構成表から各構成部品の所要量を計算する処理が、部品展開である。従属需要品目の必要量や必要時期は、上位の製品や組立品の計画から導かれる。",
    "choiceExplanations": {
      "ア": "従属需要品目の必要量や必要時期は、上位の製品や組立品の計画から導かれる。",
      "イ": "タイムバケットは日や週など計画を区切る時間単位である。調達に要する期間は調達リードタイムという。",
      "ウ": "独立需要は、他の品目の必要量から導くのではなく、市場需要や受注に基づいて決める。どの部門が需要予測をするかは定義に含まれない。",
      "エ": "部品構成表は、上位品目と構成部品の親子関係や数量を示す。内製の部品も対象になる。",
      "オ": "最終製品の計画数量と部品構成表から各構成部品の所要量を計算する処理が、部品展開である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 7,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "クリティカルパス法",
    "topicTags": [
      "クリティカルパス法"
    ],
    "difficulty": 3,
    "question": "下表は、あるプロジェクト業務を構成する各作業の要件を示している。CPM（Critical Path Method）を適用して、現状のプロジェクト完了までの最短時間を明らかにした上で、その最短時間を 1 時間短くするために必要な最小費用として、最も適切なものを下記の解答群から選べ（単位：万円）。",
    "choices": {
      "ア": "10",
      "イ": "20",
      "ウ": "30",
      "エ": "40",
      "オ": "50"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "最長経路はＡ→Ｆ→Ｇの17時間である。最も安く短縮できるＡを20万円で１時間縮めると、他の経路も含めた最長時間は16時間になる。",
    "choiceExplanations": {
      "ア": "費用10万円のＢは、所要時間17時間のクリティカルパスＡ→Ｆ→Ｇに含まれない。Ｂだけを短縮しても全体は短くならない。",
      "イ": "最長経路はＡ→Ｆ→Ｇの17時間である。最も安く短縮できるＡを20万円で１時間縮めると、他の経路も含めた最長時間は16時間になる。",
      "ウ": "Ｆを１時間短縮する方法は30万円かかるが、同じ最長経路上のＡを短縮すれば20万円で済む。",
      "エ": "Ｇを縮めても全体は１時間短くなるが、必要な40万円はＡを縮める20万円より大きい。",
      "オ": "Ｅを短縮してもＡ→Ｆ→Ｇは17時間のままである。50万円を投じる必要はない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q7.png"
    ],
    "imageAltTexts": [
      "直前の先行作業、所要時間、時間当たりの短縮費用の順。Ａはなし、９時間、20万円。Ｂはなし、５時間、10万円。ＣはＡ、２時間、30万円。ＤはＢ、３時間、40万円。ＥはＣ、３時間、50万円。ＦはＡとＤ、６時間、30万円。ＧはＥとＦ、２時間、40万円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 8,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "フローショップ",
    "topicTags": [
      "フローショップ"
    ],
    "difficulty": 3,
    "question": "製品Ａ〜Ｄの 2 つの工程の加工時間が下表のように与えられたとき、 2 工程のフローショップにおける製品の投入順序を検討する。生産を開始して全ての製品の加工を完了するまでの時間（メイクスパン）を最小にする順序で投入した場合、メイクスパンに含まれる第 1 工程と第 2 工程の非稼働時間の合計値として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "2",
      "イ": "3",
      "ウ": "4",
      "エ": "5",
      "オ": "6"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ジョンソン法ではＡ→Ｃ→Ｄ→Ｂとなり、メイクスパンは19である。工程別の加工時間は17と16なので、非稼働時間の合計は２＋３＝５である。",
    "choiceExplanations": {
      "ア": "Ａ→Ｃ→Ｄ→Ｂでの最終完了は時刻19である。第１工程だけの非稼働時間が２であり、第２工程も含める必要がある。",
      "イ": "第２工程だけなら、加工時間合計16をメイクスパン19から引いて非稼働は３となる。第１工程の分が含まれていない。",
      "ウ": "２工程とも時刻０から19までを対象とする。加工時間の合計は33なので、非稼働は38－33＝５となる。",
      "エ": "ジョンソン法ではＡ→Ｃ→Ｄ→Ｂとなり、メイクスパンは19である。工程別の加工時間は17と16なので、非稼働時間の合計は２＋３＝５である。",
      "オ": "非稼働時間を６とすると、合計の加工時間が32になってしまう。実際は第１工程17と第２工程16で計33である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q8.png"
    ],
    "imageAltTexts": [
      "第１工程と第２工程の加工時間は、製品Ａが１と４、Ｂが５と２、Ｃが５と６、Ｄが６と４。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 9,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "制約理論",
    "topicTags": [
      "制約理論"
    ],
    "difficulty": 3,
    "question": "TOC（制約理論）における、ボトルネック工程やドラム、バッファ、ロープに関する記述として、最も不適切なものはどれか。",
    "choices": {
      "ア": "ドラムは、一定で安定した生産活動を目指すために、製造プロセスの各工程において、一定のリズムに合わせて生産を進める役割を果たしている。",
      "イ": "バッファとは、設備故障や作業遅延など生産活動における不確実性に対する余裕分を含めたリードタイムのことである。",
      "ウ": "ボトルネック工程とは、工場全体の生産速度に決定的に影響する工程のことである。",
      "エ": "ロープは、ボトルネック工程の前後に隣り合う 2 つの工程間で生産指示や運搬指示を伝える役割を果たしている。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ロープは制約工程のペースやバッファに合わせて工程の入口で材料を投入する信号である。制約工程の前後に隣接する工程だけで指示を伝える仕組みではない。",
    "choiceExplanations": {
      "ア": "ドラムは制約工程を基準に生産全体のペースを決める役割を果たす。",
      "イ": "バッファには、変動や遅れがあっても制約工程や出荷に影響しにくくするための時間上の余裕を設ける。",
      "ウ": "全体の生産量や速度を制約する工程がボトルネックである。",
      "エ": "ロープは制約工程のペースやバッファに合わせて工程の入口で材料を投入する信号である。制約工程の前後に隣接する工程だけで指示を伝える仕組みではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 10,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "安全在庫と発注方式",
    "topicTags": [
      "安全在庫と発注方式"
    ],
    "difficulty": 3,
    "question": "発注方式における発注点あるいは発注量の決定に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "安全在庫は欠品を起こさないために決めるものであるが、保有在庫は安全在庫として決めた量を下回ることがある。",
      "イ": "経済的発注量は、累積入荷数量と累積出荷数量に基づいて決まる。",
      "ウ": "ダブルビン方式の発注量は、納入リードタイムを考慮して、その都度、決める。",
      "エ": "内示とは、発注後に納入日を提示することである。",
      "オ": "発注点とは、発注をする時点を示し、通常、日付のことである。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "実際の需要や納入の遅れに対応するために安全在庫を設けるので、変動が起きれば実在庫が安全在庫水準を下回ることがある。",
    "choiceExplanations": {
      "ア": "実際の需要や納入の遅れに対応するために安全在庫を設けるので、変動が起きれば実在庫が安全在庫水準を下回ることがある。",
      "イ": "経済的発注量は、一定の需要などを前提に発注費用と在庫保管費用の合計を最小化する数量である。",
      "ウ": "ダブルビン方式では一方を使い切ったときに発注し、残る箱で納入までをつなぐ。発注量はその都度計算するものではない。",
      "エ": "内示は、確定注文に先立ち、予定数量や納期などを予告するものである。",
      "オ": "発注点は在庫量がどの水準に下がったら発注するかを示す数量の基準である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 11,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "QCの道具",
    "topicTags": [
      "QCの道具"
    ],
    "difficulty": 3,
    "question": "QC 7 つ道具と新 QC 7 つ道具に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "管理図は、時系列データをヒストグラムで表した図である。",
      "イ": "散布図は、不具合を原因別に集計し、件数が多い順に並べた図である。",
      "ウ": "特性要因図は、原因と結果、目的と手段などが複雑に絡み合った問題の因果関係を表した図である。",
      "エ": "パレート図は、項目別に層別して出現頻度の高い順に並べるとともに、累積和を表した図である。",
      "オ": "連関図は、原因と結果の関係を魚の骨のように表した図である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "パレート図は項目を頻度などの大きい順に棒で示し、その累積を折れ線で表す。魚の骨に似た形で要因を分類し特性との関係を表すのは、特性要因図である。",
    "choiceExplanations": {
      "ア": "管理図はデータを時間順に描き、管理限界などによって異常を見つける。ヒストグラムは度数の分布を表す。",
      "イ": "散布図は２変数の値の組を点で示す。件数を多い順に並べるのはパレート図の特徴である。",
      "ウ": "複雑に絡んだ原因と結果、目的と手段の関係を表す説明は、連関図に対応する。",
      "エ": "パレート図は項目を頻度などの大きい順に棒で示し、その累積を折れ線で表す。",
      "オ": "魚の骨に似た形で要因を分類し特性との関係を表すのは、特性要因図である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 12,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "在庫管理指標",
    "topicTags": [
      "在庫管理指標"
    ],
    "difficulty": 3,
    "question": "在庫管理に関する用語の記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "顧客へのサービス率は、（１－返品率）によって求められる。",
      "イ": "在庫回転率とは、標準在庫量を使用実績量で除したものである。",
      "ウ": "在庫引当とは、注文に対して在庫残高から注文量を割り当てて引き落とすことである。",
      "エ": "棚卸資産回転期間とは、棚卸を行った時点で保有している製品を在庫している期間のことである。",
      "オ": "発注残とは、発注の平準化のために、次の期に発注するために残している予定発注量のことである。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "在庫引当は、受けた注文に対して該当数量を在庫から予約し、他の注文に引き当てられる数量から除く処理である。",
    "choiceExplanations": {
      "ア": "在庫管理でいうサービス率は、欠品せず需要に応えられる割合などを指す。販売後の返品率から求める指標ではない。",
      "イ": "在庫回転率は一定期間の使用量や売上原価を平均在庫量や平均在庫額で割る。選択肢では分子と分母の関係が逆である。",
      "ウ": "在庫引当は、受けた注文に対して該当数量を在庫から予約し、他の注文に引き当てられる数量から除く処理である。",
      "エ": "棚卸資産回転期間は平均棚卸資産を１日当たりの売上原価などで割って求める。特定の商品を棚卸日に保有していた期間ではない。",
      "オ": "発注残は、すでに発注しているがまだ入荷していない数量をいう。将来の予定発注は含まない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 13,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "製品工程分析",
    "topicTags": [
      "製品工程分析"
    ],
    "difficulty": 3,
    "question": "部品Ａ、Ｂ、Ｃを用いて製品Ｘが製造される生産の流れについて、製品工程分析を行った結果を下図に示す。この図から読み取ることができる記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "加工ａ、ｂ、ｃは、同期して加工している。",
      "イ": "台車は 11 台である。",
      "ウ": "滞留を表す工程は、 4 カ所である。",
      "エ": "品質保証室での検査は、品質検査を主として行っているが、同時に数量検査も行っている。",
      "オ": "部品Ａ、Ｂ、Ｃは、同じ倉庫にまとめて保管されている。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "品質保証室には、ひし形の品質検査記号の中に正方形の数量検査記号が描かれている。品質検査を主としながら数量も検査する複合記号である。",
    "choiceExplanations": {
      "ア": "図は各部品の加工と組立への合流を示すが、加工時刻や同期条件は示していない。",
      "イ": "台車の表示は各運搬工程で用いる手段を示す。同じ台車を別々の工程で利用できるため、台車の実台数は分からない。",
      "ウ": "Ｄ形で表される停滞は各部品の仮置き場の３カ所である。逆三角形は管理下の保管を示し、停滞とは別の記号である。",
      "エ": "品質保証室には、ひし形の品質検査記号の中に正方形の数量検査記号が描かれている。品質検査を主としながら数量も検査する複合記号である。",
      "オ": "部品Ａ、Ｂ、Ｃの開始位置に保管記号があるだけでは、同一の倉庫にまとめているとは読み取れない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q13.png"
    ],
    "imageAltTexts": [
      "部品Ａ、Ｂ、Ｃそれぞれに保管、台車運搬、加工、台車運搬、仮置き、台車運搬がある。３部品は合流し、組立、台車運搬、ひし形に正方形を内包する記号の検査、台車運搬、倉庫保管と進む。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 14,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "流動数分析",
    "topicTags": [
      "流動数分析"
    ],
    "difficulty": 3,
    "question": "ある倉庫では、ある製品の入出庫管理が先入先出法で行われている。その製品の在庫状況を把握するために行った流動数分析の結果を下図に示す。この図から読み取ることができる記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "Ａが示す区間の値は、時点ａにおける在庫量が倉庫に補充されるまでの期間である。",
      "イ": "Ａが示す区間の値は、時点ａに入庫した製品の倉庫における滞留期間である。",
      "ウ": "Ｂが示す区間の値は、時点ｂにおいて製品が倉庫に補充された量である。",
      "エ": "Ｂが示す区間の値は、時点ｂにおける製品が倉庫から出荷された量である。",
      "オ": "インプット累積線とアウトプット累積線における水平方向の間隔が広いほど、倉庫内の在庫が多い。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "先入先出のため、同じ累積数量の製品が入庫した時点ａと出庫した時点ｃの差が、その製品の倉庫内での滞留期間になる。",
    "choiceExplanations": {
      "ア": "横方向の間隔Ａは、同じ累積数量における入庫時刻と出庫時刻の差である。在庫が補充されるまでの期間を示す矢印ではない。",
      "イ": "先入先出のため、同じ累積数量の製品が入庫した時点ａと出庫した時点ｃの差が、その製品の倉庫内での滞留期間になる。",
      "ウ": "Ｂは時点ｂまでの累積入庫量と累積出庫量の差である。その時点だけの補充量とは異なる。",
      "エ": "時点ｂの出荷量そのものではなく、Ｂは時点ｂの在庫量である。",
      "オ": "在庫量の大小は、同じ時点で計った両累積線の縦方向の間隔で比較する。横方向は滞留期間を表す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q14.png"
    ],
    "imageAltTexts": [
      "横軸は時間、縦軸は累積量。Ａは同じ累積量に達した入庫と出庫の時刻ａからｃまでの横幅。Ｂは時刻ｂでの入庫と出庫の累積量の縦の差。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 15,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "作業標準",
    "topicTags": [
      "作業標準"
    ],
    "difficulty": 3,
    "question": "作業標準に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 作業標準の作成に当たっては、最善な作業方法で実行可能で、目的や目標値が具体的であることが重要であり、状況が変化した場合には常に改定されなければならない。\nｂ 作業標準では、加工・組立・検査・準備段取作業などの直接的な作業に関する作業方法が規定されており、運搬や保全、異常処理作業などの間接的な作業に関する作業方法は含まれない。\nｃ 作業標準は標準作業に基づいて作成されるもので、作業者の教育・訓練の基礎資料であるため、個別生産方式の職場では作成されない。\nｄ 作業標準は文書化して保存しておくことが必要で、VTR や動画は現場の教育用として補助的に利用するものであり、正式な作業標準には含まれない。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：正 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：誤 ｄ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "作業条件が変われば標準を見直すのでａは正しい。間接作業を対象外とするｂ、個別生産では作らないとするｃ、動画を正式資料から除くｄは誤りである。",
    "choiceExplanations": {
      "ア": "ｂの運搬や保全、異常時の対応も、必要に応じて作業標準の対象になる。",
      "イ": "作業標準は個別生産でも、共通の作業手順や安全上の注意などを明確にするために使える。したがってｃが誤りである。",
      "ウ": "作業条件が変われば標準を見直すのでａは正しい。間接作業を対象外とするｂ、個別生産では作らないとするｃ、動画を正式資料から除くｄは誤りである。",
      "エ": "ａのとおり、条件に合う実行可能な方法や具体的な目標を定め、変更時には見直す。ｂのように間接作業を一律に除く必要もない。",
      "オ": "目標や作業方法を実際の条件に合わせるａは正しい。映像なども正式な作業標準として管理できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 16,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "標準時間",
    "topicTags": [
      "標準時間"
    ],
    "difficulty": 3,
    "question": "あるプレス工程では、 1 人の作業者が以下のような手順①、②で作業を行っている。\n手順① 作業ａの後に作業ｂを行い、これを 5 回繰り返す。\n作業ａ：材料置き場から鉄板を 1 枚取り出し、プレス機に投入して加工する。\n作業ｂ：加工が終わった鉄板を取り出し、加工済みの鉄板を入れるパレットに移す。\n手順② 加工済みの鉄板 5 枚を入れたパレットを仮置き場に移し、手順①に戻る。この手順①、②を 1 サイクルとして、ストップウオッチを使って時間研究を実施した結果、 1 サイクルの正味作業の観測時間の平均値は 90 秒、レイティング係数は 110 であった。次に、この作業者についてワークサンプリングを実施し、延べ500 回の計測の中で余裕に該当するサンプルの数が 60 観測された。この結果を用いて標準時間を求めたとき、この 1 サイクルの標準時間として、最も適切なものはどれか。",
    "choices": {
      "ア": "90 秒未満",
      "イ": "90 秒以上 95 秒未満",
      "ウ": "95 秒以上 100 秒未満",
      "エ": "100 秒以上"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "正味時間は90×1.10＝99秒で、内掛けの余裕率は60÷500＝12％である。標準時間は99÷(１－0.12)＝112.5秒となる。",
    "choiceExplanations": {
      "ア": "観測時間だけで90秒あり、レイティング係数110を掛けると正味時間は99秒になる。",
      "イ": "正味時間は90×1.10＝99秒である。さらに余裕時間が加わるので95秒を下回らない。",
      "ウ": "99秒は余裕を含まない正味時間である。観測全体にしめる余裕の割合12％を反映する必要がある。",
      "エ": "正味時間は90×1.10＝99秒で、内掛けの余裕率は60÷500＝12％である。標準時間は99÷(１－0.12)＝112.5秒となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 17,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産保全",
    "topicTags": [
      "生産保全"
    ],
    "difficulty": 3,
    "question": "生産保全の観点から見た保全活動に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "あらかじめ代替機を用意し、故障してから修理した方がコストがかからない場合は、予防保全を選択する。",
      "イ": "過去に発生した故障が再発しないように改善を加える活動は、事後保全である。",
      "ウ": "設備の劣化傾向について設備診断技術などを用いて管理することによって、保全の時期や修理方法などを決める予防保全の方法を状態監視保全という。",
      "エ": "掃除、給油、増し締めなどの活動は、設備の劣化を防ぐために実施される改良保全である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "状態監視保全では、振動などで劣化の兆候を捉え、状態の測定結果を基に保全の時期や方法を決める。清掃、給油、増し締めなどは、設備の劣化を抑える日常保全である。改良保全は故障しにくくするなど設備の設計や構造に手を加える。",
    "choiceExplanations": {
      "ア": "故障してから修理するほうが経済的な設備では、事後保全の採用を検討する。予防保全は故障前に対処する。",
      "イ": "故障の再発を防ぐため設備そのものを改良する活動は改良保全に当たる。事後保全は故障後に機能を復旧することを指す。",
      "ウ": "状態監視保全では、振動などで劣化の兆候を捉え、状態の測定結果を基に保全の時期や方法を決める。",
      "エ": "清掃、給油、増し締めなどは、設備の劣化を抑える日常保全である。改良保全は故障しにくくするなど設備の設計や構造に手を加える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 18,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "設備総合効率",
    "topicTags": [
      "設備総合効率"
    ],
    "difficulty": 3,
    "question": "ある設備について、1,000 時間の負荷時間内での設備データを収集したところ下表が得られた。以下の改善施策を、期待される設備総合効率の高い順に並べたものとして、最も適切なものを下記の解答群から選べ。ただし、負荷時間は同じで、その他の条件も変わらないものとする。\nａ 不適合の原因を検討して、不適合品率を 20 ％から 15 ％にする。\nｂ 速度低下の原因を改善して、加工数量を 6,720 個から 7,680 個にする。\nｃ 段取作業を改善して、停止時間を半減させ、稼働時間を 800 時間から 900 時間にする。",
    "choices": {
      "ア": "ａ−ｂ−ｃ",
      "イ": "ｂ−ａ−ｃ",
      "ウ": "ｂ−ｃ−ａ",
      "エ": "ｃ−ａ−ｂ",
      "オ": "ｃ−ｂ−ａ"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "現状の時間稼働率、性能稼働率、良品率は順に80％、70％、80％である。施策別の総合効率はｂ51.2％、ｃ50.4％、ａ47.6％の順となる。",
    "choiceExplanations": {
      "ア": "良品率を改善するａの総合効率は47.6％であり、加工速度を改善するｂの51.2％より低い。",
      "イ": "ｂが最高だが、ｃは時間稼働率を90％に改善して50.4％となるので、ａの47.6％より上に来る。",
      "ウ": "現状の時間稼働率、性能稼働率、良品率は順に80％、70％、80％である。施策別の総合効率はｂ51.2％、ｃ50.4％、ａ47.6％の順となる。",
      "エ": "ｃの50.4％を上回るのは、性能稼働率が80％になるｂの51.2％である。",
      "オ": "ｃの総合効率は50.4％で２番目である。ｂの51.2％を上回らない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q18.png"
    ],
    "imageAltTexts": [
      "基準サイクルタイムは１個５分、稼働時間は800時間、加工数は不適合品込みで6,720個、不適合品率は20％。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 19,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "TPM",
    "topicTags": [
      "TPM"
    ],
    "difficulty": 3,
    "question": "TPM（Total Productive Maintenance）に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 設備の高度化・複雑化に対応するために、生産部門と独立して保全部門を強化することが故障の未然防止につながる。\nｂ 保全の技術・技能を高め、設備の MTTR をより長く、また MTBF をなるべく短くするような活動を進めることにより、故障ゼロ、不良ゼロを目指す。\nｃ 設備総合効率は設備の実力を把握するための指標で、 7 大ロスを数値化したものである。\nｄ トップから第一線従業員に至るまで全員が参加し、重複小集団活動により実施する。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：正 ｄ：誤",
      "イ": "ａ：正 ｂ：正 ｃ：誤 ｄ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：正 ｄ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "ＴＰＭではＭＴＴＲを短くしＭＴＢＦを長くする。設備総合効率で設備のロスを捉え、全員参加の重複小集団で改善する活動なのでｃ・ｄが正しい。",
    "choiceExplanations": {
      "ア": "ＭＴＴＲは平均修復時間なので短く、ＭＴＢＦは平均故障間隔なので長くするのが目標である。また、全員参加のｄは正しい。",
      "イ": "生産部門と保全部門が連携して未然防止に取り組むため、独立して強化するとするａは不適切である。ＭＴＴＲとＭＴＢＦの改善方向も逆である。",
      "ウ": "保全部門だけを生産部門と独立して強化するものではないため、ａを正とするのは誤りである。",
      "エ": "ｂは指標の改善方向が逆であり、全員参加の重複小集団活動を示すｄは正しい。",
      "オ": "ＴＰＭではＭＴＴＲを短くしＭＴＢＦを長くする。設備総合効率で設備のロスを捉え、全員参加の重複小集団で改善する活動なのでｃ・ｄが正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 20,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "作業改善",
    "topicTags": [
      "作業改善"
    ],
    "difficulty": 3,
    "question": "作業改善における改善案作成のための原則に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "ある設備における 1 年間のチョコ停事例の発生件数に基づいて、改善対象の優先順序をブレーンストーミングによって決定した。",
      "イ": "現在行われている検査項目について、 5 W 1 H を活用し、まず最初に「How?Why?」の視点\n「どのようにしてその作業を行うのか？」を検討し、検査時間の短縮を実現した。",
      "ウ": "製品工程分析を実施し、動作経済の原則に基づいて作業順序を精査し、作業者の総移動距離が最小になるような配置に変更した。",
      "エ": "倉庫の仕分け工程について作業者工程分析を行い、ECRS の原則に基づいて簡素化できる作業方法を発見し、作業時間の短縮を実現した。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "作業者工程分析で人の作業をつかみ、ＥＣＲＳのＳに当たる簡素化で仕分けの時間を短縮する組合せは適切である。",
    "choiceExplanations": {
      "ア": "ブレーンストーミングは多くの案を出すために用いる。実績件数で優先順位を決める場合はパレート図などが対応する。",
      "イ": "まず検査そのものが必要かを理由や目的から確かめ、必要な作業について方法を検討する。いきなり方法の工夫から始めると省略できる検査を残しやすい。",
      "ウ": "人の移動を見るなら作業者工程分析や動線の分析が適している。動作経済の原則は手足の動作や作業場所・工具などの工夫に用いる。",
      "エ": "作業者工程分析で人の作業をつかみ、ＥＣＲＳのＳに当たる簡素化で仕分けの時間を短縮する組合せは適切である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 21,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "循環経済と環境経営",
    "topicTags": [
      "循環経済と環境経営"
    ],
    "difficulty": 3,
    "question": "環境問題に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ サーキュラー・エコノミー（循環経済）への移行を推進するためには、あらゆる主体におけるプラスチック資源循環等の取組（ 3 R＋Renewable）を促進し、資源循環の高度化に向けた環境整備を進めることが重要である。\nｂ エコアクション 21 は、中堅・中小事業者に配慮した、取り組みやすい継続的改善のための PDCA サイクルを示しており、環境会計を公表することを義務付けている。\nｃ 酸素は、発電・産業・運輸など、幅広く活用されるカーボンニュートラルのキーテクノロジーと位置付けられている。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "３Ｒに再生可能資源の利用を加えて資源循環を進めるａは正しい。環境会計の公表を必須とするｂと、キーテクノロジーを酸素とするｃは誤りである。",
    "choiceExplanations": {
      "ア": "エコアクション21では環境経営レポートの公表が求められるが、環境会計の公表まで一律に求めるわけではない。",
      "イ": "カーボンニュートラル化で発電、産業、運輸への活用が期待されているのは酸素ではなく水素である。",
      "ウ": "３Ｒに再生可能資源の利用を加えて資源循環を進めるａは正しい。環境会計の公表を必須とするｂと、キーテクノロジーを酸素とするｃは誤りである。",
      "エ": "プラスチック資源循環で３ＲとRenewableを組み合わせるａは正しい。ｂとｃも正誤が逆になっている。",
      "オ": "ａの資源循環を促進する方針は正しい。ｃで想定されるエネルギー活用の対象は水素である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 22,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "商業動態統計",
    "topicTags": [
      "商業動態統計"
    ],
    "difficulty": 3,
    "question": "下図は、経済産業省が公表している「2020 年商業動態統計年報」を基に、2020 年における百貨店、スーパー、コンビニエンスストアおよびドラッグストアの販売額を示したものである。図中のａ〜ｄに該当する小売業の組み合わせとして、最も適切なものを下記の解答群から選べ。なお、商業動態統計は 2020 年 3 月に改正されている。",
    "choices": {
      "ア": "ａ：コンビニエンスストア ｂ：スーパー",
      "イ": "ａ：スーパー ｃ：百貨店",
      "ウ": "ｂ：コンビニエンスストア ｄ：ドラッグストア",
      "エ": "ｃ：ドラッグストア ｄ：百貨店"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "2020年の販売額はスーパー、コンビニエンスストア、ドラッグストア、百貨店の順である。よってｃがドラッグストア、ｄが百貨店になる。",
    "choiceExplanations": {
      "ア": "販売額が最大のａはスーパーであり、コンビニエンスストアに当たるのは２番目のｂである。",
      "イ": "ａはスーパーだが、ｃはドラッグストアである。百貨店は売上規模が最も小さいｄに当たる。",
      "ウ": "ｂはコンビニエンスストアだが、ｄは百貨店に当たる。ドラッグストアの販売額は百貨店より多い。",
      "エ": "2020年の販売額はスーパー、コンビニエンスストア、ドラッグストア、百貨店の順である。よってｃがドラッグストア、ｄが百貨店になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q22.png"
    ],
    "imageAltTexts": [
      "2020年の販売額。ａは約15兆円、ｂは約12兆円、ｃは約７兆円、ｄは約５兆円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 23,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "中心市街地活性化法",
    "topicTags": [
      "中心市街地活性化法"
    ],
    "difficulty": 3,
    "question": "中心市街地活性化法に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "この法律では、居住誘導区域の中に都市機能誘導区域を定める必要がある。",
      "イ": "この法律の対象となる区域を地区とする商工会または商工会議所は、当該区域の中心市街地活性化協議会を組織することができない。",
      "ウ": "この法律の目的は、大規模小売店舗の立地に関して、その周辺の地域の生活環境の保持をすることである。",
      "エ": "中心市街地整備推進機構の役割の 1 つは、中心市街地活性化にかかわる情報の提供、相談、その他の援助などである。",
      "オ": "都道府県は、政府が定めた基本方針に基づき、基本計画を作成し、経済産業大臣の認定を申請することができる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "中心市街地整備推進機構は、中心市街地の活性化に関わる情報提供や相談、援助などを行う。基本計画の作成主体は市町村であり、認定を申請する相手は内閣総理大臣である。",
    "choiceExplanations": {
      "ア": "居住誘導区域や都市機能誘導区域は、都市再生特別措置法に基づく立地適正化計画の制度である。",
      "イ": "区域を地区とする商工会や商工会議所は、所定の主体として中心市街地活性化協議会の組織に関われる。",
      "ウ": "大規模小売店舗の周辺地域で生活環境を保持する趣旨は、大規模小売店舗立地法に定められている。",
      "エ": "中心市街地整備推進機構は、中心市街地の活性化に関わる情報提供や相談、援助などを行う。",
      "オ": "基本計画の作成主体は市町村であり、認定を申請する相手は内閣総理大臣である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 24,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "都市計画と用途地域",
    "topicTags": [
      "都市計画と用途地域"
    ],
    "difficulty": 3,
    "question": "都市計画法および建築基準法で定められている用途地域と建築物に関する記述として、最も適切なものはどれか。なお、各記述における面積はその用途に供する部分の床面積の合計を意味する。",
    "choices": {
      "ア": "近隣商業地域には、100 m²（ 1 階建て）の料理店を出店することができる。",
      "イ": "工業地域には、15,000 m²の店舗を出店することができる。",
      "ウ": "第一種住居地域には、500 m²（ 2 階建て）のカラオケボックスを出店することができる。",
      "エ": "田園住居地域には、300 m²（ 1 階建て）の農産物直売所を出店することができる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "田園住居地域では、その地域で生産された農産物の販売などに供する一定条件の店舗を設けられる。１階で300㎡の農産物直売所は床面積500㎡以内に収まる。",
    "choiceExplanations": {
      "ア": "ここでの「料理店」は建築基準法別表第二の用途区分で、一般の飲食店と区別される。近隣商業地域ではこの用途に供する建築物は認められない。",
      "イ": "工業地域では店舗等の床面積が10,000㎡を超えるものは建築できない。15,000㎡はその制限を超える。",
      "ウ": "第一種住居地域ではカラオケボックスの用途が制限されており、この面積や階数であっても建築できない。",
      "エ": "田園住居地域では、その地域で生産された農産物の販売などに供する一定条件の店舗を設けられる。１階で300㎡の農産物直売所は床面積500㎡以内に収まる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 25,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ライリーの法則",
    "topicTags": [
      "ライリーの法則"
    ],
    "difficulty": 3,
    "question": "Ａ市とＢ市が、その中間にあるＸ町からどの程度の購買力を吸引するかを求めたい。下図の条件が与えられたとき、ライリーの法則を用いてＡ市とＢ市がＸ町から吸引する購買力の比率を求める場合、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "Ａ市：Ｂ市= 1 ： 1",
      "イ": "Ａ市：Ｂ市= 2 ： 1",
      "ウ": "Ａ市：Ｂ市= 1 ： 2",
      "エ": "Ａ市：Ｂ市= 8 ： 1",
      "オ": "Ａ市：Ｂ市= 1 ： 8"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "購買力の吸引は人口に比例し、距離の２乗に反比例する。Ａ市の人口は４倍、距離は２倍なので両市の吸引力は等しい。",
    "choiceExplanations": {
      "ア": "購買力の吸引は人口に比例し、距離の２乗に反比例する。Ａ市の人口は４倍、距離は２倍なので両市の吸引力は等しい。",
      "イ": "人口比４対１に、距離に単純に反比例する比１対２を掛けると２対１になるが、ライリーの法則で使うのは距離の２乗である。",
      "ウ": "Ａ市は遠いが、人口の４倍が距離の２乗の４倍をちょうど打ち消す。Ｂ市の吸引力が２倍になる計算ではない。",
      "エ": "Ａ市は人口が多い一方で遠い。距離の不利も倍率を掛けて増やす計算ではなく、距離の２乗で割る。",
      "オ": "距離が近いＢ市には距離上の利点があるが、人口ではＡ市が４倍である。この条件では８対１のような差は生じない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q25.png"
    ],
    "imageAltTexts": [
      "Ｘ町はＡ市から12km、Ｂ市から６km。Ａ市の人口は20万人、Ｂ市は５万人。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q26",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 26,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "屋外広告物",
    "topicTags": [
      "屋外広告物"
    ],
    "difficulty": 3,
    "question": "屋外広告物に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 屋外広告物法によれば、都道府県は、屋外広告物の形状、面積、色彩などの表示方法の基準を条例で定めることができる。\nｂ 建築基準法によれば、広告塔を設置する場合、広告塔の高さにかかわらず、建築確認申請をする必要がある。\nｃ 建築基準法によれば、防火地域内にある看板で、建築物の屋上に設けるものは、主要部分を不燃材料で造るか不燃材料で覆わなければならない。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：正",
      "イ": "ａ：正 ｂ：誤 ｃ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "都道府県は条例で表示方法の基準を定められる。広告塔の建築確認には高さの条件があり、防火地域の屋上看板には主要部分を不燃材料とするなどの規制がある。",
    "choiceExplanations": {
      "ア": "高さ４ｍを超える広告塔などが建築確認の対象であり、すべての高さで申請が必要とするｂは誤りである。",
      "イ": "都道府県は条例で表示方法の基準を定められる。広告塔の建築確認には高さの条件があり、防火地域の屋上看板には主要部分を不燃材料とするなどの規制がある。",
      "ウ": "防火地域内の屋上看板について、不燃材料の使用や被覆の規定があるためｃは正しい。",
      "エ": "条例で屋外広告の表示方法を規制できるのでａは正しい。建築確認に高さの条件がないとするｂは誤りである。",
      "オ": "条例により形状、面積、色彩などの基準を定められるので、ａを誤りとする点が合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q27",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 27,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "販売計画",
    "topicTags": [
      "販売計画"
    ],
    "difficulty": 3,
    "question": "最寄品を取り扱う小売店の販売計画や計数管理に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "カテゴリーマネジメントでは、店員の作業計画に基づき商品カテゴリー単位で販売計画を立案する。",
      "イ": "損益分岐点売上高を計算する際、変動費には売上原価は含まれない。",
      "ウ": "販売計画は年間で立案するものであり、月別や週別に細分化して立案する必要はない。",
      "エ": "販売計画立案時には、祝日のイベントや地域行事などの影響を考慮することが重要である。",
      "オ": "販売計画立案時の売上予測では、市場動向は考慮せず自店舗の過去の販売データのみを用いることが重要である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "祝日や地域行事に伴って来店数や需要が変わるため、販売計画ではそれらの影響を織り込む。売上予測では過去の自店の販売実績に加え、市場動向や競合、商圏の状況の変化も考慮する。",
    "choiceExplanations": {
      "ア": "カテゴリーマネジメントでは、消費者ニーズやカテゴリー別の販売実績・役割などに基づき、品揃えや販売を計画する。作業計画から販売計画を決めるものではない。",
      "イ": "小売店の売上原価は、一般に販売量とともに増減するため、損益分岐点分析では変動費に含める。",
      "ウ": "需要の変動に対応するため、年間計画を月や週などに具体化することがある。",
      "エ": "祝日や地域行事に伴って来店数や需要が変わるため、販売計画ではそれらの影響を織り込む。",
      "オ": "売上予測では過去の自店の販売実績に加え、市場動向や競合、商圏の状況の変化も考慮する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q28-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 28,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "関連購買とラインロビング",
    "topicTags": [
      "関連購買とラインロビング"
    ],
    "difficulty": 3,
    "question": "以下は、文房具店の店主Ｘ氏と中小企業診断士（以下、「診断士」という。）との間で行われた会話である。この会話に基づく下記の設問に答えよ。\nＸ 氏：\n「最近は、近所の小学校の生徒数が少なくなっているので、子供向けの文房具の売上が落ちています。品揃えを変えていこうと考えているのですが、アドバイスをいただけますか。」\n診断士：\n「品揃えの計画を立てるには、まず店舗の商圏における消費者のニーズを理解することが大事です。小学生が減っているということなので、新たな顧客層をターゲットにしたいですね。」\nＸ 氏：\n「店舗の徒歩圏には高齢者が多く居住しているのですが、あまり来店していません。高齢者の方に使ってもらえる店にしていきたいと思います。」\n診断士：\n「ニーズに合った商品を品揃えすることで、購買の機会を増やしたいですね。どのようなニーズがありそうですか。」\nＸ 氏：\n「自治会では、高齢者の絵画サークルなどをやっているようなので、絵の具やデッサン用の鉛筆などの品揃えを増やそうと考えています。」\n診断士：\n「買上点数を増やして【下線部①】客単価を高めるために関連購買を促進【下線ここまで】できる取り組みをするのがよいでしょう。今はあまり来店されていないということなので、販売促進をして接客にも力を入れて常連客を増やすことが重要です。常連客の満足度を高めると、友人などへ口コミで店舗を薦めてもらえることも期待できます。」\nＸ 氏：\n「分かりました。」\n診断士：\n「ただ、文房具は毎日買うものではありません。そこで、別の取り組みとして、高齢者が好む菓子や飲み物など、【下線部②】今まで販売していない商品カテゴリーの品揃え【下線ここまで】をしてはどうでしょうか。また、商品を販売するだけでなく、ワークショップなどを開いてもよいかもしれません。」\n\n（設問1）\n会話の中の下線部①に記載されている関連購買の促進に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "5 回買うと特典を与えるスタンプカードによる販売促進を行う。",
      "イ": "同じデッサン用の鉛筆を 10 本買うと 1 本おまけをつける。",
      "ウ": "高齢者が好みそうな園芸用品を品揃えする。",
      "エ": "デッサン用の鉛筆と一緒に使う鉛筆削りと消しゴムを同じ棚に陳列する。",
      "オ": "来店目的になりやすい商品を品揃えする。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "鉛筆と一緒に使う削り器や消しゴムを近くに置くと、併せて必要なことに気づきやすい。関連商品の買上点数を増やす施策に当たる。",
    "choiceExplanations": {
      "ア": "スタンプカードは再来店や繰り返し購入を促す手法である。異なる関連商品を一緒に買うように働きかける例ではない。",
      "イ": "同じ鉛筆をまとめて買わせる方法であり、用途の関連する別の品目との併買を促す例ではない。",
      "ウ": "園芸用品の追加は品揃えの拡大に当たるが、絵画向け商品との関連購買に直接つながる説明ではない。",
      "エ": "鉛筆と一緒に使う削り器や消しゴムを近くに置くと、併せて必要なことに気づきやすい。関連商品の買上点数を増やす施策に当たる。",
      "オ": "来店目的になる商品をそろえることは集客に役立つが、それだけで関連商品との併買を促すことにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q28-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 28,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "関連購買とラインロビング",
    "topicTags": [
      "関連購買とラインロビング"
    ],
    "difficulty": 3,
    "question": "以下は、文房具店の店主Ｘ氏と中小企業診断士（以下、「診断士」という。）との間で行われた会話である。この会話に基づく下記の設問に答えよ。\nＸ 氏：\n「最近は、近所の小学校の生徒数が少なくなっているので、子供向けの文房具の売上が落ちています。品揃えを変えていこうと考えているのですが、アドバイスをいただけますか。」\n診断士：\n「品揃えの計画を立てるには、まず店舗の商圏における消費者のニーズを理解することが大事です。小学生が減っているということなので、新たな顧客層をターゲットにしたいですね。」\nＸ 氏：\n「店舗の徒歩圏には高齢者が多く居住しているのですが、あまり来店していません。高齢者の方に使ってもらえる店にしていきたいと思います。」\n診断士：\n「ニーズに合った商品を品揃えすることで、購買の機会を増やしたいですね。どのようなニーズがありそうですか。」\nＸ 氏：\n「自治会では、高齢者の絵画サークルなどをやっているようなので、絵の具やデッサン用の鉛筆などの品揃えを増やそうと考えています。」\n診断士：\n「買上点数を増やして【下線部①】客単価を高めるために関連購買を促進【下線ここまで】できる取り組みをするのがよいでしょう。今はあまり来店されていないということなので、販売促進をして接客にも力を入れて常連客を増やすことが重要です。常連客の満足度を高めると、友人などへ口コミで店舗を薦めてもらえることも期待できます。」\nＸ 氏：\n「分かりました。」\n診断士：\n「ただ、文房具は毎日買うものではありません。そこで、別の取り組みとして、高齢者が好む菓子や飲み物など、【下線部②】今まで販売していない商品カテゴリーの品揃え【下線ここまで】をしてはどうでしょうか。また、商品を販売するだけでなく、ワークショップなどを開いてもよいかもしれません。」\n\n（設問2）\n会話の中の下線部②に記載されている、今まで販売していない商品カテゴリーの品揃えをするラインロビングに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "今回のラインロビングの取り組みでは、近隣の商店へ影響することはない。",
      "イ": "今回のラインロビングの取り組みでは、顧客の来店目的に影響することはない。",
      "ウ": "今回のラインロビングを提案する主目的は、粗利益率を高めることにある。",
      "エ": "今回のラインロビングを提案する主目的は、買上点数を増やすことにある。",
      "オ": "今回のラインロビングを提案する主目的は、来店頻度を増やすことにある。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "菓子や飲み物など文房具より頻繁に買う品目をそろえ、来店する用事を増やすことが提案の主目的である。近隣の店の扱い分野に進出すれば、顧客が文房具店で菓子なども買うようになり、周辺の店に影響し得る。",
    "choiceExplanations": {
      "ア": "近隣の店の扱い分野に進出すれば、顧客が文房具店で菓子なども買うようになり、周辺の店に影響し得る。",
      "イ": "菓子や飲み物をそろえると、補充や日常の買物を目的とした来店が生じ得る。",
      "ウ": "追加品の粗利益率は示されておらず、助言のきっかけは文房具を毎日は購入しないことである。粗利益率の改善が主目的とは読み取れない。",
      "エ": "買上点数の増加は下線部①の関連購買のねらいである。②では日常的に買うものを拡充することで来店機会を増やそうとしている。",
      "オ": "菓子や飲み物など文房具より頻繁に買う品目をそろえ、来店する用事を増やすことが提案の主目的である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q29",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 29,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "小売の売場づくり",
    "topicTags": [
      "小売の売場づくり"
    ],
    "difficulty": 3,
    "question": "スーパーマーケットの売場づくりに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "買上点数を増やすために、レジ前売場には単価が低い商品よりも高い商品を陳列する。",
      "イ": "買物客の売場回遊を促すために、衝動購買されやすい商品は売場に分散配置する。",
      "ウ": "商品棚前の通路幅を広くすると、当該商品棚のゴールデンゾーンの範囲が広がる。",
      "エ": "販売促進を行うエンドの販売力は、主通路に面するよりもレジ前の方が高い。",
      "オ": "複数の入り口からレジまでの客動線を一筆書きのようにコントロールすることをワンウェイコントロールという。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "通路が広く棚から距離を取れると、顧客が視認し手を伸ばしやすい範囲が広がり、ゴールデンゾーンも広がる。",
    "choiceExplanations": {
      "ア": "レジ前では価格が低めで短時間に購入を決めやすい商品がついで買いに向く。高単価品を優先するという説明は合わない。",
      "イ": "回遊を促したいときは、来店目的になりやすい商品を離して配置する方法がある。衝動購買品は目につきやすい動線上などに置く。",
      "ウ": "通路が広く棚から距離を取れると、顧客が視認し手を伸ばしやすい範囲が広がり、ゴールデンゾーンも広がる。",
      "エ": "主通路側のエンドは通行する買物客の目に留まりやすい。レジ前側の方が一般に販売力が高いとする説明は適切でない。",
      "オ": "ワンウェイコントロールでは入口からレジまでの標準的な動線を誘導する。複数の入り口が前提ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q30",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 30,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "小売業の価格政策",
    "topicTags": [
      "小売業の価格政策"
    ],
    "difficulty": 3,
    "question": "小売業の価格政策と特売に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "EDLP 政策の場合、プライスラインは 1 つしか設けない。",
      "イ": "定番価格を高く設定していても、特売を頻繁に繰り返すと顧客の内的参照価格は低下する。",
      "ウ": "特売による販売促進は、価格弾力性が低い商品ほどチラシなどで告知したときの集客効果が高い。",
      "エ": "ハイ・ロープライシング政策では、特売時における対象商品の販売数量を最大化することで店全体の利益率が高まる。",
      "オ": "端数価格には、買物客に安さを感じさせる心理的効果はない。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "顧客が割引価格を何度も経験すると、その価格を妥当と感じやすくなる。定番価格を高く維持していても、内的参照価格は下がり得る。",
    "choiceExplanations": {
      "ア": "ＥＤＬＰは安値を継続する価格政策であり、カテゴリー内に複数の価格帯を設定することと両立する。",
      "イ": "顧客が割引価格を何度も経験すると、その価格を妥当と感じやすくなる。定番価格を高く維持していても、内的参照価格は下がり得る。",
      "ウ": "価格弾力性が低い商品は、価格を下げても需要量の変化が小さい。特売に反応しやすいのは一般に価格弾力性が高い商品である。",
      "エ": "販売数量が多いだけでは店全体の利益率が高まるとは限らない。割引幅や併買される商品の粗利益も関係する。",
      "オ": "例えば1,000円より980円の方が安いと感じさせやすく、端数価格には知覚価格に働きかける効果がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q31",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 31,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "定期発注方式",
    "topicTags": [
      "定期発注方式"
    ],
    "difficulty": 3,
    "question": "小売店舗における在庫管理に関する以下の文章の空欄Ａ〜Ｃに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。ある商品について、当該店舗の発注担当者は在庫量を毎日確認し、需要予測に基づいて必要と見込まれる数量を毎日発注している。ここで行われている発注方法を一般的に Ａ という。\n適正在庫を維持するためには、発注量を決めるための需要予測量を計算する期間を Ｂ にする必要がある。また、毎日計算する発注量は、需要予測量と安全在庫の合計数量から発注時の Ｃ を減算して求める必要がある。",
    "choices": {
      "ア": "Ａ：定期発注方式 Ｂ：調達期間 Ｃ：手持在庫量",
      "イ": "Ａ：定期発注方式 Ｂ：調達期間と発注間隔の合計期間 Ｃ：手持在庫量",
      "ウ": "Ａ：定期発注方式 Ｂ：調達期間と発注間隔の合計期間 Ｃ：有効在庫量",
      "エ": "Ａ：定量発注方式 Ｂ：調達期間 Ｃ：有効在庫量",
      "オ": "Ａ：定量発注方式 Ｂ：調達期間と発注間隔の合計期間 Ｃ：手持在庫量"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "定期発注では次回発注分の納入までの需要を、調達期間と発注間隔の合計で見積もる。安全在庫を加え、手持と発注残などを考慮した有効在庫量を差し引く。",
    "choiceExplanations": {
      "ア": "毎日決まった間隔で発注するので定期発注方式に当たる。次の発注分が納入されるまでをカバーするには、Ｂに発注間隔も含める。",
      "イ": "Ｂは正しいが、すでに発注済みで未納の数量などを考慮する必要があるため、手持在庫量だけを差し引くのでは不足する。",
      "ウ": "定期発注では次回発注分の納入までの需要を、調達期間と発注間隔の合計で見積もる。安全在庫を加え、手持と発注残などを考慮した有効在庫量を差し引く。",
      "エ": "発注の時期が毎日と決まっているため定期発注方式であり、一定量を発注する定量発注方式とは異なる。",
      "オ": "発注時期が固定のためＡは定期発注方式である。二重発注を防ぐためにもＣには有効在庫量を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q32",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 32,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "貨物輸送",
    "topicTags": [
      "貨物輸送"
    ],
    "difficulty": 3,
    "question": "物品の輸送手段の特徴に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "鉄道輸送において使用されるコンテナは、 1 種類に限定されている。",
      "イ": "トラックに積載した貨物を RORO 船で輸送する際には、トラックがそのまま船内へ入れないため、貨物を取り卸して船内に積み込む作業が発生する。",
      "ウ": "トラック輸送から鉄道輸送へのモーダルシフトを推進することにより、貨物の積み替えが不要になる。",
      "エ": "トラック輸送の契約に関する\n「標準貨物自動車運送約款」では、運送の対価である運賃と運送以外の役務等の対価である料金を区別している。",
      "オ": "路線便は、トラック 1 台を単独の荷主が貸し切りにして、発地から着地まで直行する輸送方法である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "標準貨物自動車運送約款では、輸送の対価を運賃、積込みなど輸送以外の役務等の対価を料金として区別する。",
    "choiceExplanations": {
      "ア": "鉄道コンテナには異なる大きさや用途のものがあり、１種類だけではない。",
      "イ": "ＲＯＲＯ船は車両やトレーラーを自走などで船内に乗り入れさせる方式で、貨物をばらして積み直すことを前提としない。",
      "ウ": "集荷や配達にトラックを使う場合は、鉄道との接続点でコンテナなどの積み替えが必要になる。",
      "エ": "標準貨物自動車運送約款では、輸送の対価を運賃、積込みなど輸送以外の役務等の対価を料金として区別する。",
      "オ": "単独荷主が車両を貸し切るのは貸切便である。路線便では一般に複数荷主の貨物を混載し、拠点を結ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q33",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 33,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "パレチゼーション",
    "topicTags": [
      "パレチゼーション"
    ],
    "difficulty": 3,
    "question": "物流におけるユニットロードおよびその搬送機器に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "一貫パレチゼーションの推進は、荷役作業の効率化につながる。",
      "イ": "パレチゼーションの目的は、輸送中における貨物の温度管理をすることである。",
      "ウ": "平パレット 1 枚に積載できる貨物量は、積載する貨物のサイズによって決まり、重量は無関係である。",
      "エ": "ユニットロード化を推進しようとすると、モーダルシフトが困難になる。",
      "オ": "ロールボックスパレットは、それ自体を上方向に積み重ねて使用することにより、商品の保管効率を高めることができる。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "出荷から入荷まで同じパレット上で荷姿をまとめると、個々の荷物を持ち替える回数が減り、荷役を効率化できる。",
    "choiceExplanations": {
      "ア": "出荷から入荷まで同じパレット上で荷姿をまとめると、個々の荷物を持ち替える回数が減り、荷役を効率化できる。",
      "イ": "パレチゼーションの目的は荷物をまとめて機械荷役しやすくすることである。温度管理には保冷機材などを使う。",
      "ウ": "パレットにも許容荷重があるため、荷物の寸法に加えて重量や重心にも留意する。",
      "エ": "ユニットロード化で積替えをまとめて扱えるため、異なる輸送手段を使うモーダルシフトを進めやすくなる。",
      "オ": "通常のロールボックスパレットはキャスター付きのかご状の搬送機器であり、段積みを前提とする保管機器ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q34",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 34,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "物流センターの機能",
    "topicTags": [
      "物流センターの機能"
    ],
    "difficulty": 3,
    "question": "チェーン小売業の物流センターの機能に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "通過型物流センターの機能は、仕入先の在庫量と各店舗の在庫量を調整することである。",
      "イ": "通過型物流センターの入荷形態には、事前に商品を店舗別に仕分けて入荷する場合と、事前に仕分けをせずに総量をそのまま入荷する場合がある。",
      "ウ": "物流センターから店舗へのカテゴリー納品では、カテゴリー区分を細かく設定することにより、納品車両と商品が入った折りたたみコンテナ内の積載効率を高めることができる。",
      "エ": "物流センターを利用した取引では、商品の所有権の移転経路に一致するように物流経路を設定する必要がある。",
      "オ": "プロセスセンターは、在庫型物流センターの機能を補完するための小型拠点として、主に完成品の積替えと仕分けの機能を果たすセンターである。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "通過型には仕入先で店舗別仕分けまで済ませた入荷と、総量で入荷して物流センター内で仕分ける形の両方がある。",
    "choiceExplanations": {
      "ア": "通過型は商品を長期保管して在庫量を調整する拠点ではなく、入荷したものを行先別に仕分けて出荷する拠点である。",
      "イ": "通過型には仕入先で店舗別仕分けまで済ませた入荷と、総量で入荷して物流センター内で仕分ける形の両方がある。",
      "ウ": "区分を細かくすると仕分け容器が増え、各容器に空きが出やすくなるため、必ずしも積載効率は高まらない。",
      "エ": "商取引上の所有権の移転と、物理的な納品経路は別に設計できる。所有権を移す順に現物を運ぶ必要はない。",
      "オ": "プロセスセンターの主要機能は生鮮品などの加工や包装である。完成品の積替えや仕分けは通過型の機能に近い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q35",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 35,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "巡回集荷と積載率",
    "topicTags": [
      "巡回集荷と積載率"
    ],
    "difficulty": 3,
    "question": "トラックの積載率を改善させるために、取組案ａとｂを検討している。\n現状では、物流センターＡと物流センターＢからそれぞれ別々にトラック 1 台が走行し、物流センターＣへ納品しており、各物流センターから輸送する際の実車の積載率は 50 ％未満である。（下図参照）\n取組案ａとｂは、それぞれ以下のとおりである。\n取組案ａ\n物流センターＡの納品分を物流センターＢに集めた後、物流センターＢからまとめて物流センターＣへ別のトラック 1 台で納品する。（下図参照）\n取組案ｂ\n物流センターＣから物流センターＡと物流センターＢをトラック 1 台が巡回して集荷し、物流センターＣへ納品する。（下図参照）\n上記の取組案ａとｂに関する記述として、最も適切なものはどれか。\nただし、ここでいう積載率とは、「貨物を積載して走行するトラックの最大積載量に占める、実際に積載した貨物の量の割合」のことである。また、トラックの大きさ（最大積載量）は現状と取組案において全て同じである。",
    "choices": {
      "ア": "トラックの積載率は、取組案ａとｂのいずれにおいても改善される。",
      "イ": "トラックの積載率は、取組案ａでは改善されるが、ｂでは改善されない。",
      "ウ": "トラックの積載率は、取組案ｂでは改善されるが、ａでは改善されない。",
      "エ": "トラックの積載率は、取組案ａとｂのいずれにおいても改善されない。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "ａもｂも、最後のＢ→ＣではＡとＢの貨物を同じ車両に積める。Ａ→Ｂの実車にはＡ分だけを積むので、実車の平均積載率は従来より高くなる。",
    "choiceExplanations": {
      "ア": "ａもｂも、最後のＢ→ＣではＡとＢの貨物を同じ車両に積める。Ａ→Ｂの実車にはＡ分だけを積むので、実車の平均積載率は従来より高くなる。",
      "イ": "ｂでもＡの荷物を積んでＢへ行き、Ｂの荷物を加えてＣへ戻るため、Ｃへの納品区間ではＡ分とＢ分をまとめて積む。",
      "ウ": "ａでもＡ分をＢに持ち込んでＢ分とまとめるため、Ｂ→Ｃの積載率が改善する。",
      "エ": "定義が対象とするのは実車区間である。両案ともＢ→ＣでＡ、Ｂ両方の貨物を運び、この区間の積載率は改善する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q35-1.png",
      "/images/chusho-kigyo-shindanshi/2022-unei-q35-2.png",
      "/images/chusho-kigyo-shindanshi/2022-unei-q35-3.png"
    ],
    "imageAltTexts": [
      "現状はＡとＢそれぞれからＣへ実車で向かい、別々に空車で戻る。",
      "取組案ａはＡの貨物をＢに持ち込み、ＢからＣへ一括納品する。Ａ→ＢとＢ→Ｃが実車で、それぞれ空車で戻る。",
      "取組案ｂはＣ→Ａを空車で走り、Ａ→ＢとＢ→Ｃを実車で走る。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q36",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 36,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "物流センターの運営",
    "topicTags": [
      "物流センターの運営"
    ],
    "difficulty": 3,
    "question": "物流センターの運営に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "3 PL は、荷主が物流事業者に代わって物流センターを運営することである。",
      "イ": "ASN は、出荷する商品に誤りがないかを確認する出荷検品に利用される。",
      "ウ": "在庫管理の重点を決める手法として、ABC 分析が利用される。",
      "エ": "種まき方式ピッキングは、オーダー別に商品を一品ごとに集品する方法である。",
      "オ": "マテハン機器のうち、パレタイザは保管用の機器であり、AGV（Automatic Guided Vehicle）は仕分用の機器である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "ＡＢＣ分析により、売上金額や使用金額などへの寄与が大きい品目を識別して重点的に在庫を管理できる。注文ごとに必要品を取りに行くのは摘み取り方式である。種まき方式では品目別にまとめて集品してから注文先別に配分する。",
    "choiceExplanations": {
      "ア": "３ＰＬでは荷主から物流機能を受託した第三者が、物流の企画や運営を行う。契約関係が逆になっている。",
      "イ": "ＡＳＮは出荷者から受荷側に送る事前出荷明細であり、主に受荷側の入荷検品や作業準備に使う。",
      "ウ": "ＡＢＣ分析により、売上金額や使用金額などへの寄与が大きい品目を識別して重点的に在庫を管理できる。",
      "エ": "注文ごとに必要品を取りに行くのは摘み取り方式である。種まき方式では品目別にまとめて集品してから注文先別に配分する。",
      "オ": "パレタイザは荷をパレットに積み付ける機械で、ＡＧＶは無人で荷を搬送する機器である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q37",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 37,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "JANコードとインストアマーキング",
    "topicTags": [
      "JANコードとインストアマーキング"
    ],
    "difficulty": 3,
    "question": "商品コード（GTIN）に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "JAN コードは国内のみで通用するコードであるので、例えばヨーロッパへ輸出する際には EAN コードなども別に表示する必要がある。",
      "イ": "インストアマーキングは、バーコードの中に価格データが入っていない\n「PLU」タイプと、バーコードの中に価格データが入っている\n「NonPLU」タイプの 2 種類に分けられる。",
      "ウ": "商品が製造または出荷される段階で、製造業者または発売元が商品包装に JANコードを JAN シンボルにより表示することを、インストアマーキングという。",
      "エ": "ソースマーキングを行う際、先頭の 2 桁と最後の 1 桁以外は申請などをしなくても、自社商品や管理ルールに合わせた番号を自由に割り振ることが可能である。",
      "オ": "日本の企業のブランドで販売される場合であっても、実際の製造が海外で行われる商品には原産国の国番号を表示しなければならない。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "ＰＬＵは商品識別情報を使って価格を参照するため価格をコードに含めない。ＮｏｎＰＬＵは価格をコード内に含める。",
    "choiceExplanations": {
      "ア": "ＪＡＮはＧＴＩＮとして国際標準の体系に含まれる。欧州向けに同じ商品へ別のＥＡＮコードを追加する必要はない。",
      "イ": "ＰＬＵは商品識別情報を使って価格を参照するため価格をコードに含めない。ＮｏｎＰＬＵは価格をコード内に含める。",
      "ウ": "製造業者などが商品にバーコードを表示するのはソースマーキングである。インストアマーキングは小売側が店内管理用に行う。",
      "エ": "ソースマーキングでは付与された事業者コードを使う。その部分まで各社が無申請で自由に割り振ることはできない。",
      "オ": "ＪＡＮなどのＧＳ１事業者コードの先頭は、登録に関わるＧＳ１機関を示すもので、商品の原産国を示す番号ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q38",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 38,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "GS1アプリケーション識別子",
    "topicTags": [
      "GS1アプリケーション識別子"
    ],
    "difficulty": 3,
    "question": "近年、商品識別に加えて、\n「製造年月日」や「品質保持期限日」といった属性情報もバーコードで表示して利用したい、という要求が高まっている。GS1 では、これに対応するために、以下のシンボル例のカッコ内に示す GS1 アプリケーション識別子（AI）を利用することで、商品識別コード以外の属性情報もバーコード化して伝達することを可能としている。AI に関する記述として、最も適切なものを下記の解答群から選べ。\n＊シンボル例は実寸法ではなく、正確なバーコードを示しているわけではない。\n＊カッコ内の 0 1 や 1 1 が AI であり、例えば（ 0 1 ）は、次の（ 1 1 ）の前までの記号列が商品識別コードであることを意味する。",
    "choices": {
      "ア": "AI で規定されている情報項目では、固定長のデータのみ扱うことが可能である。",
      "イ": "AI で表現できる情報項目では、漢字・かなといった特定の言語に依存するテキストデータでも使用可能である。",
      "ウ": "AI は GS1 が定めたグローバル標準であるため、国内に限らず、輸出入など海外との取引においてもそのまま利用可能である。",
      "エ": "AI は GS1 データマトリックスで利用可能であるが、GS1 QR コードでは利用できない。",
      "オ": "属性情報の AI の番号は、昇順に設定しなければ認識されない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "ＡＩはＧＳ１の国際標準のため、商品識別コードや製造日などの項目を国内取引にも輸出入にも共通の定義で伝えられる。",
    "choiceExplanations": {
      "ア": "ＡＩには固定長の項目だけでなく、ロット番号など可変長の項目もある。",
      "イ": "ＡＩごとに文字種や長さが規定されており、漢字・かなを任意のテキストとして使えるわけではない。",
      "ウ": "ＡＩはＧＳ１の国際標準のため、商品識別コードや製造日などの項目を国内取引にも輸出入にも共通の定義で伝えられる。",
      "エ": "ＧＳ１データマトリックスに加え、ＧＳ１ ＱＲコードでもＡＩによるデータ表現を利用できる。",
      "オ": "ＡＩはデータの先頭で項目を識別させるもので、番号を昇順にする必要はない。可変長の項目が続く場合は区切りの扱いに注意する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q38.png"
    ],
    "imageAltTexts": [
      "GS1のバーコード例。下に（01）049に続く伏字と（11）210707が表示される。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q39-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 39,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "アソシエーション分析",
    "topicTags": [
      "アソシエーション分析"
    ],
    "difficulty": 3,
    "question": "ある小売店の一定期間における POS システムから得られた 1,000 件のレシートデータを分析する。このとき、商品ａと商品ｂの購買パターンについて、下表のような結果が得られたとする。下記の設問に答えよ。\n\n（設問1）\n商品ａと商品ｂの購買パターンについての評価指標に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "商品ａからみた商品ｂの信頼度（コンフィデンス）は、5/9である。",
      "イ": "商品ａと商品ｂを併買したパターンの支持度（サポート）は、0.25 である。",
      "ウ": "商品ａを購買したパターンの支持度（サポート）は、0.45 である。",
      "エ": "商品ｂからみた商品ａの信頼度（コンフィデンス）は、5/7である。",
      "オ": "商品ｂを購買したパターンの支持度（サポート）は、0.35 である。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "併買の支持度は全1,000件のうち両方を購入した250件の割合なので、0.25である。商品ａを購入した件数には併買250件も含まれる。支持度は(350＋250)÷1,000＝0.60となる。",
    "choiceExplanations": {
      "ア": "商品ａの購入は350＋250＝600件なので、ａから見たｂの信頼度は250÷600＝5/12である。",
      "イ": "併買の支持度は全1,000件のうち両方を購入した250件の割合なので、0.25である。",
      "ウ": "商品ａを購入した件数には併買250件も含まれる。支持度は(350＋250)÷1,000＝0.60となる。",
      "エ": "商品ｂの購入は50＋250＝300件なので、ｂから見たａの信頼度は250÷300＝5/6である。",
      "オ": "商品ｂを買ったのは合計300件なので支持度は0.30である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q39.png"
    ],
    "imageAltTexts": [
      "商品ａのみ350件、商品ｂのみ50件、商品ａ・ｂ両方250件。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q39-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 39,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "アソシエーション分析",
    "topicTags": [
      "アソシエーション分析"
    ],
    "difficulty": 3,
    "question": "ある小売店の一定期間における POS システムから得られた 1,000 件のレシートデータを分析する。このとき、商品ａと商品ｂの購買パターンについて、下表のような結果が得られたとする。下記の設問に答えよ。\n\n（設問2）\n商品ａと商品ｂを併買した購買パターンのリフト値として、最も適切なものはどれか。",
    "choices": {
      "ア": "3/10",
      "イ": "5/13",
      "ウ": "5/9",
      "エ": "5/6",
      "オ": "25/18"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "併買の支持度は0.25、独立の場合に期待される支持度は0.60×0.30＝0.18である。両者の比は25/18になる。",
    "choiceExplanations": {
      "ア": "3/10は商品ｂの支持度である。リフト値には、併買の割合と両商品の支持度を使う。",
      "イ": "併買件数250を少なくともどちらか買った650件で割った値が5/13である。リフト値の分母は独立とした場合の併買支持度である。",
      "ウ": "リフト値は(250÷1,000)÷((600÷1,000)×(300÷1,000))である。5/9では商品ｂの支持度に対する信頼度の比と一致しない。",
      "エ": "5/6は商品ｂを買ったときにａも買った割合である。これをａの支持度0.60で割るとリフト値になる。",
      "オ": "併買の支持度は0.25、独立の場合に期待される支持度は0.60×0.30＝0.18である。両者の比は25/18になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q39.png"
    ],
    "imageAltTexts": [
      "商品ａのみ350件、商品ｂのみ50件、商品ａ・ｂ両方250件。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q40",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 40,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "散布図と相関係数",
    "topicTags": [
      "散布図と相関係数"
    ],
    "difficulty": 3,
    "question": "商品の売上高の変化が関連しそうな 2 商品の組み合わせ 3 つ（以下、ペア番号1 、 2 、 3 で示す。）について、POS データを用いて分析を行い、下表のような相関係数を得た。ただし、これらのペア間で重複する商品は存在せず、全部で 6 種類の商品から構成される。また、いずれかのペアの月別売上高の関係を散布図で表したものが、以下の散布図ａ、ｂ、ｃである。このとき、ペア番号と対応する散布図の組み合わせとして、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "ペア番号 1 と散布図ａ ペア番号 2 と散布図ｂ ペア番号 3 と散布図ｃ",
      "イ": "ペア番号 1 と散布図ｂ ペア番号 2 と散布図ａ ペア番号 3 と散布図ｃ",
      "ウ": "ペア番号 1 と散布図ｂ ペア番号 2 と散布図ｃ ペア番号 3 と散布図ａ",
      "エ": "ペア番号 1 と散布図ｃ ペア番号 2 と散布図ａ ペア番号 3 と散布図ｂ",
      "オ": "ペア番号 1 と散布図ｃ ペア番号 2 と散布図ｂ ペア番号 3 と散布図ａ"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ｃには明瞭な傾向がなく0.1のペア１、ａは右上がりなので0.8のペア２、ｂは右下がりなので－0.8のペア３に対応する。",
    "choiceExplanations": {
      "ア": "散布図ａは明瞭な右上がりで、相関0.1のペア１より相関0.8のペア２に対応する。",
      "イ": "散布図ｂは明瞭な右下がりなので、相関係数が負のペア３に対応する。",
      "ウ": "散布図ｃは点が散っており、強い正の相関を示すペア２には当てはまらない。",
      "エ": "ｃには明瞭な傾向がなく0.1のペア１、ａは右上がりなので0.8のペア２、ｂは右下がりなので－0.8のペア３に対応する。",
      "オ": "ペア１とｃの対応は合っているが、ペア２は正の相関なのでａ、ペア３は負の相関なのでｂである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-unei-q40-1.png",
      "/images/chusho-kigyo-shindanshi/2022-unei-q40-2.png",
      "/images/chusho-kigyo-shindanshi/2022-unei-q40-3.png"
    ],
    "imageAltTexts": [
      "相関係数はペア１が0.1、ペア２が0.8、ペア３が－0.8。",
      "散布図ａの点群は右上がりで、ｂの点群は右下がり。",
      "散布図ｃの点群は幅広く散らばり、明瞭な方向がない。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-unei-q41",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2022,
    "fiscalYear": 2022,
    "examDate": "2022-08-06",
    "qNumber": 41,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "仮名加工情報",
    "topicTags": [
      "仮名加工情報"
    ],
    "difficulty": 3,
    "question": "個人情報保護法の令和 2 年改正（令和 4 年 4 月全面施行）に関する以下の文章において、空欄Ａ〜Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。データの利活用において、従来から存在していた匿名加工情報よりも詳細な分析を比較的簡便な加工方法で実施したいというニーズの高まりを受け、 Ａ が新たに創設された。匿名加工情報では、特定の個人を識別することができず、復元できないことが求められていたが、 Ａ では Ｂ 限り特定の個人を識別できないように加工されることが求められている。例えば、会員 ID、氏名、職業、商品購買履歴で構成されるデータを加工する場合、 Ａ では Ｃを削除するなど個人が特定できないようにすることが必要となる。",
    "choices": {
      "ア": "Ａ：仮名加工情報 Ｂ：インターネットで検索しない Ｃ：職業",
      "イ": "Ａ：仮名加工情報 Ｂ：他の情報（対照表など）と照合しない Ｃ：氏名",
      "ウ": "Ａ：仮名加工情報 Ｂ：他の情報（対照表など）と照合しない Ｃ：職業",
      "エ": "Ａ：個人識別符号 Ｂ：インターネットで検索しない Ｃ：職業",
      "オ": "Ａ：個人識別符号 Ｂ：他の情報（対照表など）と照合しない Ｃ：氏名"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "新設されたのは仮名加工情報であり、他の情報と照合しない限り個人を識別できないようにする。例のデータでは、本人を直接識別し得る氏名が削除等の対象になる。",
    "choiceExplanations": {
      "ア": "仮名加工情報では、照合をしない限り誰か分からないように加工する。氏名のようにその情報だけで本人を識別できる記述を除く必要がある。",
      "イ": "新設されたのは仮名加工情報であり、他の情報と照合しない限り個人を識別できないようにする。例のデータでは、本人を直接識別し得る氏名が削除等の対象になる。",
      "ウ": "ＡとＢは正しいが、氏名を残して職業だけを削除しても例のデータから個人を直接識別できる。",
      "エ": "個人識別符号は個人を識別できる符号についての概念である。今回のような加工類型の名称は仮名加工情報である。",
      "オ": "照合への言及と氏名を削除する点は合うが、新設された加工類型は個人識別符号ではなく仮名加工情報である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/D1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  }
];
