import type { Question } from "@/lib/questions/types";

export const MAFF_CHIKUSAN_2022_SENMON: Question[] = [
  {
    "id": "maff-chikusan-2022-annual-senmon-q01",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "畜産行政",
    "topicTags": [
      "牛・牛肉のトレーサビリティ"
    ],
    "difficulty": 3,
    "question": "我が国のトレーサビリティ制度に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "牛のトレーサビリティ制度は、日本における口蹄疫のまん延を防止するため、法律に基づく対策として運用されている制度である。",
      "イ": "牛のトレーサビリティ制度は、日本における BSE（牛海綿状脳症）のまん延を防止するため、法律に基づく対策として運用されている制度である。",
      "ウ": "豚のトレーサビリティ制度は、日本における CSF（豚熱）のまん延を防止するため、法律に基づく対策として運用されている制度である。",
      "エ": "鶏のトレーサビリティ制度は、日本における高病原性鳥インフルエンザのまん延を防止するため、法律に基づく対策として運用されている制度である。",
      "オ": "めん山羊のトレーサビリティ制度は、日本におけるスクレイピー（伝達性海綿状脳症）のまん延を防止するため、法律に基づく対策として運用されている制度である。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "牛の個体識別に関する特別措置法は、ＢＳＥのまん延防止などを目的とする。牛や牛肉を個体識別番号で追跡できるようにする。",
    "choiceExplanations": {
      "ア": "口蹄疫は家畜伝染病予防法などで対策を行う。牛の個体識別法による制度は、国内のＢＳＥ対策を契機とする。",
      "イ": "牛の個体識別に関する特別措置法は、ＢＳＥのまん延防止などを目的とする。牛や牛肉を個体識別番号で追跡できるようにする。",
      "ウ": "豚熱の防疫では飼養衛生管理や発生時の防疫措置を行うが、選択肢がいう牛と同種の法定の追跡制度とは異なる。",
      "エ": "高病原性鳥インフルエンザ対策の法令や指針はあるが、出題で問う法定の個体識別制度は牛を対象としている。",
      "オ": "スクレイピーは家畜の防疫制度の対象になり得るが、選択肢のような目的で牛の個体識別法と同じ制度を運用するわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q02",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "畜産行政",
    "topicTags": [
      "海外で生産される WAGYU"
    ],
    "difficulty": 3,
    "question": "現在、米国や豪州で生産されている海外産 WAGYU 肉に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "それぞれの国の生産者が生産した牛肉のうち、特に脂肪交雑が優れているものとして農林水産省が認定したものである。",
      "イ": "農林水産省が認定したそれぞれの国の農場で生産された牛肉が、高級霜降り牛肉として販売されているものである。",
      "ウ": "農林水産省が認定したそれぞれの国の生産者が生産した牛肉が、高級霜降り牛肉として販売されているものである。",
      "エ": "我が国において生産された和牛の子牛を全国和牛登録協会が登記した後、それぞれの国に輸出され、現地で肥育されたものである。",
      "オ": "過去に我が国から米国に輸出された和牛の精液、生体がルーツと考えられており、それぞれの国で WAGYU 肉として販売されているものである。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "海外産 WAGYU は、過去に日本から輸出された和牛の生体や精液などに由来する。米国や豪州などで現地生産される。",
    "choiceExplanations": {
      "ア": "海外で販売される WAGYU は、農林水産省が脂肪交雑を検査して認定した牛肉という意味ではない。",
      "イ": "海外産 WAGYU は現地で生産される牛肉であり、農林水産省が現地の農場を認定する制度に基づく呼称ではない。",
      "ウ": "現地の生産者を農林水産省が認定して販売を許可するという仕組みではない。和牛由来の遺伝資源を利用して生産される。",
      "エ": "主に現地の繁殖・肥育によって生産される。日本から登記済みの子牛を輸出して現地で肥育するものに限られない。",
      "オ": "海外産 WAGYU は、過去に日本から輸出された和牛の生体や精液などに由来する。米国や豪州などで現地生産される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q03",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "畜産行政",
    "topicTags": [
      "家畜改良増殖法の対象"
    ],
    "difficulty": 3,
    "question": "「家畜改良増殖法」に関する記述として最も妥当なのはどれか。\nア．家畜の伝染性疾病のまん延防止として家畜の殺処分に関する規定がある。\nイ．家畜人工授精及び家畜受精卵移植に関する規定がある。\nウ．家畜登録事業に関する規定がある。\nエ．家畜排せつ物の処理の高度化を図るための施設の整備を計画的に促進するための規定がある。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "イ．家畜改良増殖法は、家畜人工授精や受精卵移植の業務・資格などを規定する。ウ．家畜の品種や血統などを登録する家畜登録事業について、家畜改良増殖法に規定がある。",
    "choiceExplanations": {
      "ア": "ア．感染症のまん延を防止するための殺処分は、主に家畜伝染病予防法で扱われる。イ．家畜改良増殖法は、家畜人工授精や受精卵移植の業務・資格などを規定する。",
      "イ": "ア．感染症のまん延を防止するための殺処分は、主に家畜伝染病予防法で扱われる。ウ．家畜の品種や血統などを登録する家畜登録事業について、家畜改良増殖法に規定がある。",
      "ウ": "イ．家畜改良増殖法は、家畜人工授精や受精卵移植の業務・資格などを規定する。ウ．家畜の品種や血統などを登録する家畜登録事業について、家畜改良増殖法に規定がある。",
      "エ": "イ．家畜改良増殖法は、家畜人工授精や受精卵移植の業務・資格などを規定する。エ．排せつ物処理施設の整備などは家畜排せつ物の管理の適正化及び利用の促進に関する法律などで扱われる。",
      "オ": "ウ．家畜の品種や血統などを登録する家畜登録事業について、家畜改良増殖法に規定がある。エ．排せつ物処理施設の整備などは家畜排せつ物の管理の適正化及び利用の促進に関する法律などで扱われる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q04",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "畜産総論",
    "topicTags": [
      "和牛の品種と分布"
    ],
    "difficulty": 3,
    "question": "和牛に関する記述として最も妥当なのはどれか。\nア．和牛は我が国の固有品種である。\nイ．無角和種は主に岩手県、北海道、青森県で飼養されている。\nウ．褐毛和種は主に熊本県、北海道、高知県で飼養されている。\nエ．黒毛和種とホルスタイン種の交雑種は和牛である。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ア．黒毛和種、褐毛和種、日本短角種、無角和種はいずれも国内で成立した和牛の品種である。ウ．褐毛和種には熊本系と高知系があり、熊本県や高知県のほか北海道などでも飼われている。",
    "choiceExplanations": {
      "ア": "ア．黒毛和種、褐毛和種、日本短角種、無角和種はいずれも国内で成立した和牛の品種である。イ．無角和種は山口県を主な産地とし、岩手県などを挙げる選択肢の分布は日本短角種に近い。",
      "イ": "ア．黒毛和種、褐毛和種、日本短角種、無角和種はいずれも国内で成立した和牛の品種である。ウ．褐毛和種には熊本系と高知系があり、熊本県や高知県のほか北海道などでも飼われている。",
      "ウ": "イ．無角和種は山口県を主な産地とし、岩手県などを挙げる選択肢の分布は日本短角種に近い。ウ．褐毛和種には熊本系と高知系があり、熊本県や高知県のほか北海道などでも飼われている。",
      "エ": "イ．無角和種は山口県を主な産地とし、岩手県などを挙げる選択肢の分布は日本短角種に近い。エ．黒毛和種とホルスタイン種を掛け合わせた牛は乳肉交雑種であり、和牛４品種には含まれない。",
      "オ": "ウ．褐毛和種には熊本系と高知系があり、熊本県や高知県のほか北海道などでも飼われている。エ．黒毛和種とホルスタイン種を掛け合わせた牛は乳肉交雑種であり、和牛４品種には含まれない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q05",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "飼養管理",
    "topicTags": [
      "アニマルウェルフェアと飼養条件"
    ],
    "difficulty": 3,
    "question": "アニマルウェルフェアに関する記述として最も妥当なのはどれか。\nア．アニマルウェルフェアの基本的な理念として、空腹と渇きからの自由、不快感からの自由、痛み、けが、病気からの自由、正常行動を発現する自由、恐怖、苦悩からの自由の 5 つの自由が提唱されている。\nイ．飲用水は、新鮮な水を常に摂取できるようにするとともに、家畜の発育段階等にあわせ、畜種ごとの生理的要求を考慮する必要がある。\nウ．家畜にとって快適な温度域は、品種や発育段階等により異なるが、輸送する場合は家畜にあわせた暑熱･寒冷対策を行う必要はない。\nエ．家畜を群飼する際は、家畜同士で優劣の序列をつける習性があることから、できるだけ飼養密度を高めて序列が早く決まるようにする。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ア．５つの自由には空腹や渇き、不快、痛み等、恐怖等からの自由と、正常な行動を発現する自由が含まれる。イ．新鮮な飲用水を利用できるようにし、畜種、成長段階や生産状態による必要量の差を考慮する。",
    "choiceExplanations": {
      "ア": "ア．５つの自由には空腹や渇き、不快、痛み等、恐怖等からの自由と、正常な行動を発現する自由が含まれる。イ．新鮮な飲用水を利用できるようにし、畜種、成長段階や生産状態による必要量の差を考慮する。",
      "イ": "ア．５つの自由には空腹や渇き、不快、痛み等、恐怖等からの自由と、正常な行動を発現する自由が含まれる。ウ．輸送中も家畜が過度の暑さや寒さを受けないよう、換気などを含めて環境を管理する必要がある。",
      "ウ": "イ．新鮮な飲用水を利用できるようにし、畜種、成長段階や生産状態による必要量の差を考慮する。ウ．輸送中も家畜が過度の暑さや寒さを受けないよう、換気などを含めて環境を管理する必要がある。",
      "エ": "イ．新鮮な飲用水を利用できるようにし、畜種、成長段階や生産状態による必要量の差を考慮する。エ．群飼の際は優劣による攻撃や採食の妨げを避けるために十分な面積などが必要であり、高密度にすることを推奨しない。",
      "オ": "ウ．輸送中も家畜が過度の暑さや寒さを受けないよう、換気などを含めて環境を管理する必要がある。エ．群飼の際は優劣による攻撃や採食の妨げを避けるために十分な面積などが必要であり、高密度にすることを推奨しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q06",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "畜産総論",
    "topicTags": [
      "肉豚の三元交雑と黒豚"
    ],
    "difficulty": 3,
    "question": "豚の品種に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．日本では、ランドレース種、大ヨークシャー種、デュロック種を掛け合わせた肉豚が広く普及している。\nイ．三元交雑種は、純粋種と比較し、雑種強勢による強健な体質という利点がある。\nウ．日本では「黒豚」として知られているのは、中ヨークシャー種である。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "アは正、イは正、ウは誤である。ア．国内の三元交雑ではランドレースと大ヨークシャーの交雑雌にデュロックの雄を交配する例が多い／イ．品種や系統を交雑すると、雑種強勢により生存性や強健性などで利点を得られる場合がある／ウ．日本で黒豚と呼ぶ代表的な品種はバークシャーであり、中ヨークシャーとは異なる。",
    "choiceExplanations": {
      "ア": "ウは誤で、日本で黒豚と呼ぶ代表的な品種はバークシャーであり、中ヨークシャーとは異なる。",
      "イ": "アは正、イは正、ウは誤である。ア．国内の三元交雑ではランドレースと大ヨークシャーの交雑雌にデュロックの雄を交配する例が多い／イ．品種や系統を交雑すると、雑種強勢により生存性や強健性などで利点を得られる場合がある／ウ．日本で黒豚と呼ぶ代表的な品種はバークシャーであり、中ヨークシャーとは異なる。",
      "ウ": "イは正で、品種や系統を交雑すると、雑種強勢により生存性や強健性などで利点を得られる場合がある。ウは誤で、日本で黒豚と呼ぶ代表的な品種はバークシャーであり、中ヨークシャーとは異なる。",
      "エ": "アは正で、国内の三元交雑ではランドレースと大ヨークシャーの交雑雌にデュロックの雄を交配する例が多い。イは正で、品種や系統を交雑すると、雑種強勢により生存性や強健性などで利点を得られる場合がある。",
      "オ": "アは正で、国内の三元交雑ではランドレースと大ヨークシャーの交雑雌にデュロックの雄を交配する例が多い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q07",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "畜産行政",
    "topicTags": [
      "令和３年の畜種別飼養頭数"
    ],
    "difficulty": 3,
    "question": "令和 3 年 2 月 1 日現在の我が国の乳用牛、肉用牛、豚の飼養頭数の組合せとして最も妥当なのはどれか。\n（乳用牛） （肉用牛） （豚）",
    "choices": {
      "ア": "約 13 万頭 約 26 万頭 約 92 万頭",
      "イ": "約 13 万頭 約 92 万頭 約 26 万頭",
      "ウ": "約 136 万頭 約 261 万頭 約 929 万頭",
      "エ": "約 261 万頭 約 136 万頭 約 929 万頭",
      "オ": "約 136 万頭 約 929 万頭 約 261 万頭"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "令和３年２月１日現在の国内の飼養頭数は、乳用牛が約136万頭、肉用牛が約261万頭、豚が約929万頭である。",
    "choiceExplanations": {
      "ア": "３畜種の並びは合うが、どれも対象年の頭数よりほぼ１桁少ない。",
      "イ": "対象年に最も多いのは豚で、約929万頭である。乳用牛は約136万頭、肉用牛は約261万頭である。",
      "ウ": "令和３年２月１日現在の国内の飼養頭数は、乳用牛が約136万頭、肉用牛が約261万頭、豚が約929万頭である。",
      "エ": "豚の数は合うが、乳用牛約136万頭と肉用牛約261万頭の対応が逆である。",
      "オ": "乳用牛の数は合うが、肉用牛が約261万頭、豚が約929万頭である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q08",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "畜産総論",
    "topicTags": [
      "馬・めん羊・山羊の品種"
    ],
    "difficulty": 3,
    "question": "馬、羊、山羊の品種の組合せとして最も妥当なのはどれか。\n（馬） （羊） （山羊）",
    "choices": {
      "ア": "ペルシュロン種 サフォーク種 メリノ種",
      "イ": "ハンプシャー種 サフォーク種 メリノ種",
      "ウ": "ハンプシャー種 ブルトン種 ザーネン種",
      "エ": "ペルシュロン種 サフォーク種 ザーネン種",
      "オ": "ペルシュロン種 ブルトン種 メリノ種"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ペルシュロンはフランスに由来する馬で、サフォークは主に肉用のめん羊である。ザーネンは乳用の山羊の品種である。",
    "choiceExplanations": {
      "ア": "馬のペルシュロンとめん羊のサフォークは合うが、メリノは羊毛生産などに使われるめん羊である。",
      "イ": "ハンプシャーは馬の品種ではない。メリノも山羊ではなくめん羊に分類する。",
      "ウ": "ザーネンは乳用の山羊である。ブルトンはめん羊ではなくフランスに由来する馬の品種である。",
      "エ": "ペルシュロンはフランスに由来する馬で、サフォークは主に肉用のめん羊である。ザーネンは乳用の山羊の品種である。",
      "オ": "馬のペルシュロンは合うが、ブルトンも馬の品種である。メリノは山羊ではなくめん羊である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q09",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "畜産環境",
    "topicTags": [
      "畜産公害と温室効果ガス"
    ],
    "difficulty": 3,
    "question": "我が国の畜産環境問題に関する記述の〔 Ａ 〕、〔 Ｂ 〕、〔 Ｃ 〕に該当する語句の組合せとして最も妥当なのはどれか。我が国の畜産経営に起因する苦情は〔 Ａ 〕や〔 Ｂ 〕に関するものが多く、畜産環境問題の中心となっている。また、近年では、地球温暖化対策として、温室効果ガスの排出削減への取組みが求められている。畜産業由来の主な温室効果ガスとして、メタンと〔 Ｃ 〕があり、その発生に留意する必要がある。\n〔 Ａ 〕 〔 Ｂ 〕 〔 Ｃ 〕",
    "choices": {
      "ア": "騒音 振動 アンモニア",
      "イ": "騒音 水質汚濁 アンモニア",
      "ウ": "悪臭 振動 アンモニア",
      "エ": "悪臭 振動 一酸化二窒素（亜酸化窒素）",
      "オ": "悪臭 水質汚濁 一酸化二窒素（亜酸化窒素）"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "畜産経営に関する主な苦情は悪臭や水質汚濁である。排出削減が求められる温室効果ガスにはメタンと一酸化二窒素がある。",
    "choiceExplanations": {
      "ア": "畜産経営に関する苦情の主な種類は悪臭や水質汚濁であり、温室効果ガスではメタンと一酸化二窒素が重要である。",
      "イ": "水質汚濁は合うが、騒音より悪臭の苦情が多い。畜産分野の主な温室効果ガスには一酸化二窒素がある。",
      "ウ": "悪臭は合うが、もう一つの代表的な苦情は水質汚濁である。温室効果ガスでは一酸化二窒素が重要となる。",
      "エ": "悪臭と一酸化二窒素は合うが、振動より水質汚濁が代表的な問題となる。",
      "オ": "畜産経営に関する主な苦情は悪臭や水質汚濁である。排出削減が求められる温室効果ガスにはメタンと一酸化二窒素がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q10",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "畜産行政",
    "topicTags": [
      "経済連携協定と畜産物貿易"
    ],
    "difficulty": 3,
    "question": "国際貿易交渉の展開と我が国の畜産に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．平成 31 年 2 月に発効した日 EU 経済連携協定（日 EU・EPA）は、我が国の畜産物貿易にも関係する協定である。\nイ．平成 30 年 12 月に発効した環太平洋パートナーシップに関する包括的及び先進的な協定（TPP11 協定）に米国は加入していない。\nウ．国際経済のグローバル化の動きに対し、我が国の畜産業においては低コスト化や高付加価値化を進めることが求められている。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "アは正、イは正、ウは正である。ア．日ＥＵ経済連携協定は平成31年２月に発効し、乳製品などの畜産物の関税にも関わる／イ．平成30年12月発効のＴＰＰ11協定に米国は参加していない／ウ．国際的な競争の中で、生産費の削減や品質・ブランドで付加価値を高める取組が求められる。",
    "choiceExplanations": {
      "ア": "アは正、イは正、ウは正である。ア．日ＥＵ経済連携協定は平成31年２月に発効し、乳製品などの畜産物の関税にも関わる／イ．平成30年12月発効のＴＰＰ11協定に米国は参加していない／ウ．国際的な競争の中で、生産費の削減や品質・ブランドで付加価値を高める取組が求められる。",
      "イ": "ウは正で、国際的な競争の中で、生産費の削減や品質・ブランドで付加価値を高める取組が求められる。",
      "ウ": "イは正で、平成30年12月発効のＴＰＰ11協定に米国は参加していない。",
      "エ": "アは正で、日ＥＵ経済連携協定は平成31年２月に発効し、乳製品などの畜産物の関税にも関わる。イは正で、平成30年12月発効のＴＰＰ11協定に米国は参加していない。",
      "オ": "アは正で、日ＥＵ経済連携協定は平成31年２月に発効し、乳製品などの畜産物の関税にも関わる。ウは正で、国際的な競争の中で、生産費の削減や品質・ブランドで付加価値を高める取組が求められる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q11",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "畜産行政",
    "topicTags": [
      "都道府県別の畜産産出額"
    ],
    "difficulty": 3,
    "question": "我が国における令和 2 年の都道府県別の畜産部門における品目別産出額について、次の表の〔 Ａ 〕、〔 Ｂ 〕、〔 Ｃ 〕、〔 Ｄ 〕に該当する語句の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "生乳／肉用牛／鶏卵／豚",
      "イ": "生乳／肉用牛／ブロイラー／鶏卵",
      "ウ": "生乳／鶏卵／ブロイラー／肉用牛",
      "エ": "肉用牛／鶏卵／生乳／ブロイラー",
      "オ": "肉用牛／鶏卵／豚／生乳"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "北海道と栃木県が上位のＡは生乳、鹿児島県と北海道が上位のＢは肉用牛である。茨城県が首位のＣは鶏卵、鹿児島県が首位で宮崎県が次ぐＤは豚である。",
    "choiceExplanations": {
      "ア": "北海道と栃木県が上位のＡは生乳、鹿児島県と北海道が上位のＢは肉用牛である。茨城県が首位のＣは鶏卵、鹿児島県が首位で宮崎県が次ぐＤは豚である。",
      "イ": "生乳と肉用牛は合うが、茨城県が首位のＣは鶏卵である。Ｄは豚の産出額に当たる。",
      "ウ": "北海道が首位のＡは生乳で合う。Ｂが肉用牛、Ｃが鶏卵であり、Ｄが豚である。",
      "エ": "北海道と栃木県が上位を占めるＡは生乳である。茨城県が首位のＣは鶏卵に当たる。",
      "オ": "北海道が首位のＡは生乳であり、鹿児島県が首位で北海道が次ぐＢは肉用牛である。ＣとＤは鶏卵と豚である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/maff-chikusan/2022/senmon/q11.webp"
    ],
    "imageAltTexts": [
      "令和２年の畜産品目別産出額の上位３道県。Ａは北海道、栃木県、熊本県。Ｂは鹿児島県、北海道、宮崎県。Ｃは茨城県、千葉県、鹿児島県。Ｄは鹿児島県、宮崎県、北海道。"
    ]
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q12",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "異性双胎とフリーマーチン"
    ],
    "difficulty": 3,
    "question": "フリーマーチンに関する記述の〔 Ａ 〕、〔 Ｂ 〕、〔 Ｃ 〕に該当する語句の組合せとして最も妥当なのはどれか。フリーマーチンとは、〔 Ａ 〕の異性多胎において、雌胎子の約〔 Ｂ 〕割が性分化に先天的異常を起こし、不妊となることである。原因は妊娠早期に雌雄両胎子が共通の尿膜絨毛膜を形成することで血管が吻合し、両胎子間で血液が交流することにあり、血管吻合を介して、雌胎子の性染色体は〔 Ｃ 〕を示す。\n〔 Ａ 〕 〔 Ｂ 〕 〔 Ｃ 〕",
    "choices": {
      "ア": "牛 5 XY/XYY のモザイク",
      "イ": "牛 9 XY/XYY のモザイク",
      "ウ": "牛 9 XX/XY のキメラ",
      "エ": "馬 5 XX/XY のキメラ",
      "オ": "馬 9 XY/XYY のモザイク"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "牛の異性双胎の雌の約９割に生殖器の発達異常が生じる。胎子間の血管がつながり、ＸＸとＸＹの細胞が混在する。",
    "choiceExplanations": {
      "ア": "牛という畜種は合うが、異性双胎の雌の約９割で起こる。血液細胞ではＸＸとＸＹが混在するキメラがみられる。",
      "イ": "牛と約９割は合うが、血管吻合によって遺伝的に異なるＸＸとＸＹの細胞が混在する。",
      "ウ": "牛の異性双胎の雌の約９割に生殖器の発達異常が生じる。胎子間の血管がつながり、ＸＸとＸＹの細胞が混在する。",
      "エ": "ＸＸ／ＸＹキメラは合うが、設問の現象がよくみられるのは馬ではなく牛であり、割合は約９割である。",
      "オ": "約９割は合うが、畜種は牛で、所見はＸＸ／ＸＹの細胞が混在するキメラである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q13",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "家畜の射出精液量と精子数"
    ],
    "difficulty": 3,
    "question": "動物種、1 回の射精における射出精液量及び総精子数の組合せとして最も妥当なのはどれか。\n（動物種） （射出精液量（ml）） （総精子数（億））",
    "choices": {
      "ア": "牛 3～10 100～1000",
      "イ": "牛 50～150 100～1000",
      "ウ": "豚 3～10 30～70",
      "エ": "豚 150～500 30～70",
      "オ": "豚 150～500 100～1000"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "豚は１回当たりの精液量が多い家畜である。目安は150～500 mL で、総精子数は100～1,000億個の範囲となる。",
    "choiceExplanations": {
      "ア": "数 mL の精液量は牛に当てはまるが、100～1,000億個の総精子数は設問では豚の範囲に近い。",
      "イ": "牛は１回当たりの精液量が数 mL 程度である。50～150 mL とする点が大きすぎる。",
      "ウ": "豚が１回に射出する精液の量は数百 mL に達することがあり、３～10 mL は少なすぎる。",
      "エ": "射出精液量は豚の範囲だが、１回に射出する総精子数はこの選択肢より多い。",
      "オ": "豚は１回当たりの精液量が多い家畜である。目安は150～500 mL で、総精子数は100～1,000億個の範囲となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q14",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "畜種別の発情周期と妊娠期間"
    ],
    "difficulty": 3,
    "question": "動物種、発情周期及び妊娠期間の組合せとして最も妥当なのはどれか。\n（動物種） （発情周期（日）） （妊娠期間（日））",
    "choices": {
      "ア": "牛 20～21 360",
      "イ": "馬 22～23 335",
      "ウ": "豚 21 280",
      "エ": "めん羊 7 150",
      "オ": "山羊 10 220"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "馬の発情周期はおおむね３週間で、妊娠は約11か月続く。提示された22～23日と335日の組合せが妥当である。",
    "choiceExplanations": {
      "ア": "牛の発情周期は平均約21日だが、妊娠期間はおおむね280日であり、360日には達しない。",
      "イ": "馬の発情周期はおおむね３週間で、妊娠は約11か月続く。提示された22～23日と335日の組合せが妥当である。",
      "ウ": "豚の発情周期は約21日だが、妊娠期間は約114日である。280日は牛に近い。",
      "エ": "めん羊の妊娠期間約150日は合うが、発情周期は一般に約17日である。",
      "オ": "山羊の発情周期は一般に約21日、妊娠期間は約150日である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q15",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "精子の輸送と受精の成立"
    ],
    "difficulty": 3,
    "question": "受精に関する記述として最も妥当なのはどれか。\nア．射出された精子は、精子自身の運動性だけでなく、雌性生殖道の筋収縮運動による精子輸送によって、受精部位まで移送される。\nイ．受精能獲得精子による先体反応では、精子頭部の先体から放出されたアクロシンは卵子を取り巻く卵丘細胞を結合しているヒアルロン酸を溶解し、精子の透明帯への到達を助ける。\nウ．多精子受精を防ぐ多精拒否機構には、透明帯反応と卵黄遮断があり、両者の拒否機構の強弱は動物種によって異なる。\nエ．単為発生は、受精現象を伴わずに卵子又は精子から個体が発生する現象である。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ア．精子自身が運動するほか、雌の生殖道の筋収縮によっても受精部位の方向へ精子が運ばれる。ウ．多精子侵入の防止には透明帯の変化や卵細胞膜側での阻止が関わり、仕組みの寄与は動物によって異なる。",
    "choiceExplanations": {
      "ア": "ア．精子自身が運動するほか、雌の生殖道の筋収縮によっても受精部位の方向へ精子が運ばれる。イ．卵丘のヒアルロン酸に主に作用する酵素はヒアルロニダーゼであり、アクロシンとする組合せは適切でない。",
      "イ": "ア．精子自身が運動するほか、雌の生殖道の筋収縮によっても受精部位の方向へ精子が運ばれる。ウ．多精子侵入の防止には透明帯の変化や卵細胞膜側での阻止が関わり、仕組みの寄与は動物によって異なる。",
      "ウ": "イ．卵丘のヒアルロン酸に主に作用する酵素はヒアルロニダーゼであり、アクロシンとする組合せは適切でない。ウ．多精子侵入の防止には透明帯の変化や卵細胞膜側での阻止が関わり、仕組みの寄与は動物によって異なる。",
      "エ": "イ．卵丘のヒアルロン酸に主に作用する酵素はヒアルロニダーゼであり、アクロシンとする組合せは適切でない。エ．単為発生とは受精せずに卵が発生することであり、精子だけからの発生を通常この用語には含めない。",
      "オ": "ウ．多精子侵入の防止には透明帯の変化や卵細胞膜側での阻止が関わり、仕組みの寄与は動物によって異なる。エ．単為発生とは受精せずに卵が発生することであり、精子だけからの発生を通常この用語には含めない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q16",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "性腺と繁殖ホルモン"
    ],
    "difficulty": 3,
    "question": "ホルモンに関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "黄体形成ホルモン（LH）は、精巣の間質細胞に作用してアンドロジェンの合成・分泌を促進する。",
      "イ": "卵胞刺激ホルモン（FSH）は、精巣のセルトリ細胞に作用して精子形成を抑制する。",
      "ウ": "インヒビンは、雄又は雌の下垂体前葉に作用して卵胞刺激ホルモン（FSH）の分泌を促進する。",
      "エ": "プロスタグランジン F2α（PGF2α）は、卵巣に作用して妊娠黄体からのプロジェステロン（P4）分泌を促進する。",
      "オ": "プロラクチンは、子宮や卵巣に作用して子宮収縮や黄体退行を起こす。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "脳下垂体前葉からのＬＨは、精巣の間質にあるライディッヒ細胞を刺激し、アンドロジェンの産生と分泌を促す。",
    "choiceExplanations": {
      "ア": "脳下垂体前葉からのＬＨは、精巣の間質にあるライディッヒ細胞を刺激し、アンドロジェンの産生と分泌を促す。",
      "イ": "ＦＳＨはセルトリ細胞を刺激し、精子形成を支える。精子形成を抑制するわけではない。",
      "ウ": "インヒビンは下垂体前葉でのＦＳＨ分泌を主に抑える。分泌を促進するという記述は逆である。",
      "エ": "ＰＧＦ₂αには黄体を退行させる作用があり、黄体からのプロジェステロン分泌を維持・促進する作用とは異なる。",
      "オ": "プロラクチンは主に乳腺の発育や泌乳に関わる。子宮収縮にはオキシトシンなどが関係する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q17",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "家畜の季節繁殖と分娩時期"
    ],
    "difficulty": 3,
    "question": "生殖周期に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "周年繁殖動物である牛、馬、豚では、季節に影響することなく 1 年を通して繁殖活動を行うことができる。",
      "イ": "季節繁殖動物の季節周期は、主に日照時間（光）によって調節され、松果体から分泌されるエストラジオール（E2）が関与している。",
      "ウ": "長日繁殖動物であるめん羊は、日照時間が長くなる春から夏にかけて発情を示す。",
      "エ": "長日繁殖動物も短日繁殖動物も発情を示す季節は異なるが、いずれも分娩する時期は同じ季節になる。",
      "オ": "長日繁殖動物あるいは短日繁殖動物について、強く影響を及ぼす日照時間を人為的に調節する試みがなされているが実用には至っていない。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "馬とめん羊では発情しやすい季節が異なる。妊娠期間がそれぞれ異なるため、代表的な分娩時期はともに春ごろとなる。",
    "choiceExplanations": {
      "ア": "牛と豚は周年繁殖するが、馬は一般に日が長い春から夏に発情を示す長日繁殖動物である。",
      "イ": "季節繁殖の調節に関係して松果体から分泌されるのはメラトニンである。エストラジオールではない。",
      "ウ": "めん羊は一般に短日繁殖動物であり、春から夏よりも秋に繁殖活動が盛んになる。",
      "エ": "馬とめん羊では発情しやすい季節が異なる。妊娠期間がそれぞれ異なるため、代表的な分娩時期はともに春ごろとなる。",
      "オ": "日長の管理は採卵鶏の性成熟制御のほか、馬などの繁殖期を調整する目的にも実用化される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q18",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "牛の精液と胚の低温保存"
    ],
    "difficulty": 3,
    "question": "低温凍結保存に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．牛精液の凍結保存は、液体窒素を用いた急速凍結法が一般的で、液体窒素中であれば半永久的に保存できる。ただしストロー内温度が-130℃以上に上昇することがないよう注意が必要である。\nイ．牛胚の緩慢冷却による凍結保存法は、適切な速度で緩慢に冷却し、細胞を適度に脱水させることで、細胞内の氷晶形成を促す方法である。\nウ．牛胚のガラス化保存法は、胚を含む保存液全体をガラス化する方法で、プログラムフリーザーなどの機器を使用せず、安価に胚を保存できる簡便な方法である。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "アは正、イは誤、ウは正である。ア．牛の凍結精液は液体窒素中で長期保存できるが、出し入れの際の温度上昇は精子の傷害につながる場合がある／イ．緩慢冷却では細胞から水を徐々に出して、細胞内の氷晶形成を抑えることが重要である／ウ．ガラス化法では氷晶生成を抑えながら急冷し、プログラムフリーザーを使わずに胚を保存できる方法がある。",
    "choiceExplanations": {
      "ア": "イは誤で、緩慢冷却では細胞から水を徐々に出して、細胞内の氷晶形成を抑えることが重要である。",
      "イ": "イは誤で、緩慢冷却では細胞から水を徐々に出して、細胞内の氷晶形成を抑えることが重要である。ウは正で、ガラス化法では氷晶生成を抑えながら急冷し、プログラムフリーザーを使わずに胚を保存できる方法がある。",
      "ウ": "アは正、イは誤、ウは正である。ア．牛の凍結精液は液体窒素中で長期保存できるが、出し入れの際の温度上昇は精子の傷害につながる場合がある／イ．緩慢冷却では細胞から水を徐々に出して、細胞内の氷晶形成を抑えることが重要である／ウ．ガラス化法では氷晶生成を抑えながら急冷し、プログラムフリーザーを使わずに胚を保存できる方法がある。",
      "エ": "アは正で、牛の凍結精液は液体窒素中で長期保存できるが、出し入れの際の温度上昇は精子の傷害につながる場合がある。",
      "オ": "アは正で、牛の凍結精液は液体窒素中で長期保存できるが、出し入れの際の温度上昇は精子の傷害につながる場合がある。イは誤で、緩慢冷却では細胞から水を徐々に出して、細胞内の氷晶形成を抑えることが重要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q19",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "発情持続時間と性行動"
    ],
    "difficulty": 3,
    "question": "牛の発情に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。ア. 発情期の雌牛は、乗駕（マウンティング）されても逃げずに静かに許容する行動がみられるが、雄牛の乗駕に限られ、雌牛の乗駕は許容することはない。\nイ．雌牛の発情持続時間は、一般的に馬及び豚のそれと比較して短い傾向にある。\nウ．雄牛が発情期の雌牛に対して行う性行動の中には、外陰部の臭いを嗅ぐ、フレーメン、スタンディングなどがある。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．発情した雌牛は、雄牛だけでなくほかの雌牛の乗駕を受け入れて静止することもある／イ．牛の発情は通常およそ半日から１日であり、豚や馬よりも短い／ウ．フレーメンなどは雄牛の性行動だが、乗駕を許容して静止するスタンディングは主に発情雌牛の行動である。",
    "choiceExplanations": {
      "ア": "アは誤で、発情した雌牛は、雄牛だけでなくほかの雌牛の乗駕を受け入れて静止することもある。ウは誤で、フレーメンなどは雄牛の性行動だが、乗駕を許容して静止するスタンディングは主に発情雌牛の行動である。",
      "イ": "アは誤で、発情した雌牛は、雄牛だけでなくほかの雌牛の乗駕を受け入れて静止することもある。",
      "ウ": "アは誤で、発情した雌牛は、雄牛だけでなくほかの雌牛の乗駕を受け入れて静止することもある。イは正で、牛の発情は通常およそ半日から１日であり、豚や馬よりも短い。",
      "エ": "イは正で、牛の発情は通常およそ半日から１日であり、豚や馬よりも短い。ウは誤で、フレーメンなどは雄牛の性行動だが、乗駕を許容して静止するスタンディングは主に発情雌牛の行動である。",
      "オ": "アは誤、イは正、ウは誤である。ア．発情した雌牛は、雄牛だけでなくほかの雌牛の乗駕を受け入れて静止することもある／イ．牛の発情は通常およそ半日から１日であり、豚や馬よりも短い／ウ．フレーメンなどは雄牛の性行動だが、乗駕を許容して静止するスタンディングは主に発情雌牛の行動である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q20",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "雌牛の繁殖障害"
    ],
    "difficulty": 3,
    "question": "雌牛の繁殖障害に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．性周期、発情徴候ならびに臨床検査において生殖器官に異常が認められないにもかかわらず、3 回あるいはそれ以上の自然交配又は人工授精を行って受胎しない雌牛をリピートブリーダーという。\nイ．卵胞の発育、成熟、排卵及びその後の黄体形成、退行は営まれるが、卵胞の発育・成熟する時期に発情が発現しない状態を鈍性発情という。\nウ．嚢腫様黄体は、排卵後 7～14 日の開花期黄体においても、中心腔が著しく大きく、内容液を貯留し、周囲の黄体組織の層が薄い黄体であり、黄体嚢腫と区別される。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "アは正、イは正、ウは正である。ア．発情や臨床検査に明らかな異常がないのに、通常３回以上の交配や授精で受胎しない牛をリピートブリーダーという／イ．卵巣周期や排卵は進むものの、外から確認できる発情徴候が弱いか見られない状態が鈍性発情である／ウ．嚢腫様黄体は排卵後に形成された黄体に大きい液腔が残るもので、排卵に異常を伴い得る黄体嚢腫と区別する。",
    "choiceExplanations": {
      "ア": "アは正、イは正、ウは正である。ア．発情や臨床検査に明らかな異常がないのに、通常３回以上の交配や授精で受胎しない牛をリピートブリーダーという／イ．卵巣周期や排卵は進むものの、外から確認できる発情徴候が弱いか見られない状態が鈍性発情である／ウ．嚢腫様黄体は排卵後に形成された黄体に大きい液腔が残るもので、排卵に異常を伴い得る黄体嚢腫と区別する。",
      "イ": "ウは正で、嚢腫様黄体は排卵後に形成された黄体に大きい液腔が残るもので、排卵に異常を伴い得る黄体嚢腫と区別する。",
      "ウ": "イは正で、卵巣周期や排卵は進むものの、外から確認できる発情徴候が弱いか見られない状態が鈍性発情である。",
      "エ": "アは正で、発情や臨床検査に明らかな異常がないのに、通常３回以上の交配や授精で受胎しない牛をリピートブリーダーという。イは正で、卵巣周期や排卵は進むものの、外から確認できる発情徴候が弱いか見られない状態が鈍性発情である。",
      "オ": "アは正で、発情や臨床検査に明らかな異常がないのに、通常３回以上の交配や授精で受胎しない牛をリピートブリーダーという。ウは正で、嚢腫様黄体は排卵後に形成された黄体に大きい液腔が残るもので、排卵に異常を伴い得る黄体嚢腫と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q21",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "牛の分娩徴候と胎盤停滞"
    ],
    "difficulty": 3,
    "question": "牛の分娩に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．分娩が近づくと外陰部は充血・腫大して柔らかくなり、骨盤靱帯は次第に緊縮し、乳房は肥大する。\nイ．陣痛とは、リラキシンの作用により分娩時に周期的かつ不随意に起こる子宮筋の収縮のことで、常に疼痛を伴う。\nウ．胎盤停滞とは、胎子の娩出後 12 時間以上を経過しても排出されないものをいう。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "アは誤、イは誤、ウは正である。ア．外陰部の腫大と乳房の肥大はみられるが、骨盤靭帯は緊縮せず弛緩する／イ．リラキシンの主な役割は骨盤靭帯や子宮頸の弛緩であり、子宮筋の周期的収縮にはオキシトシンなどが関わる／ウ．出題が採用する目安では、胎子の娩出から12時間以上経っても胎盤が出ない状態を胎盤停滞とする。",
    "choiceExplanations": {
      "ア": "アは誤で、外陰部の腫大と乳房の肥大はみられるが、骨盤靭帯は緊縮せず弛緩する。イは誤で、リラキシンの主な役割は骨盤靭帯や子宮頸の弛緩であり、子宮筋の周期的収縮にはオキシトシンなどが関わる。",
      "イ": "アは誤で、外陰部の腫大と乳房の肥大はみられるが、骨盤靭帯は緊縮せず弛緩する。イは誤で、リラキシンの主な役割は骨盤靭帯や子宮頸の弛緩であり、子宮筋の周期的収縮にはオキシトシンなどが関わる。",
      "ウ": "アは誤で、外陰部の腫大と乳房の肥大はみられるが、骨盤靭帯は緊縮せず弛緩する。",
      "エ": "アは誤、イは誤、ウは正である。ア．外陰部の腫大と乳房の肥大はみられるが、骨盤靭帯は緊縮せず弛緩する／イ．リラキシンの主な役割は骨盤靭帯や子宮頸の弛緩であり、子宮筋の周期的収縮にはオキシトシンなどが関わる／ウ．出題が採用する目安では、胎子の娩出から12時間以上経っても胎盤が出ない状態を胎盤停滞とする。",
      "オ": "イは誤で、リラキシンの主な役割は骨盤靭帯や子宮頸の弛緩であり、子宮筋の周期的収縮にはオキシトシンなどが関わる。ウは正で、出題が採用する目安では、胎子の娩出から12時間以上経っても胎盤が出ない状態を胎盤停滞とする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q22",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "家畜繁殖",
    "topicTags": [
      "雌性生殖器の畜種差"
    ],
    "difficulty": 3,
    "question": "次の表の〔 Ａ 〕、〔 Ｂ 〕、〔 Ｃ 〕、〔 Ｄ 〕に該当する語句の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "馬／豚／牛／めん羊",
      "イ": "めん羊／馬／豚／牛",
      "ウ": "めん羊／豚／馬／牛",
      "エ": "牛／めん羊／豚／馬",
      "オ": "牛／豚／馬／めん羊"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "子宮角が短いＡはめん羊、卵胞が多いＢは豚である。卵巣が腎臓形のＣは馬で、子宮角が約35～40 cm のＤは牛である。",
    "choiceExplanations": {
      "ア": "多くの成熟卵胞がみられるＢは豚で合う。腎臓形の卵巣を持つのはＣの馬であり、Ａはめん羊、Ｄは牛である。",
      "イ": "Ａのめん羊とＤの牛は合うが、Ｂの桑実状の卵巣は豚、Ｃの腎臓形の卵巣は馬である。",
      "ウ": "子宮角が短いＡはめん羊、卵胞が多いＢは豚である。卵巣が腎臓形のＣは馬で、子宮角が約35～40 cm のＤは牛である。",
      "エ": "Ｄの子宮角や卵巣の特徴は牛に当たる。Ｂは成熟卵胞が多い豚、Ｃは腎臓形の卵巣をもつ馬である。",
      "オ": "Ｂの豚とＣの馬は合うが、子宮角がより短いＡはめん羊で、Ｄが牛である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/maff-chikusan/2022/senmon/q22.webp"
    ],
    "imageAltTexts": [
      "畜種Ａ～Ｄの卵巣の形、成熟卵胞数、子宮角の長さを比較する表。子宮角はＡが10～12 cm、Ｂが40～100 cm、Ｃが15～25 cm、Ｄが35～40 cm。"
    ]
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q23",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "育種・遺伝",
    "topicTags": [
      "鶏の羽色のＺ連鎖遺伝"
    ],
    "difficulty": 3,
    "question": "伴性遺伝に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "単黒色ミノルカの雄と横斑プリマスロックの雌を交配すると、子の羽色は全て単黒色となる。",
      "イ": "単黒色ミノルカの雄と横斑プリマスロックの雌を交配すると、子の羽色は全て横斑となる。",
      "ウ": "単黒色ミノルカの雄と横斑プリマスロックの雌を交配すると、子の羽色は雄は単黒色、雌は横斑となる。",
      "エ": "単黒色ミノルカの雄と横斑プリマスロックの雌を交配すると、子の羽色は雄は横斑、雌は単黒色となる。",
      "オ": "単黒色ミノルカの雄と横斑プリマスロックの雌を交配すると、子の羽色は全て褐色となる。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "鶏では雄がＺＺ、雌がＺＷである。横斑の母からＺを受ける雄の子が横斑となり、父のＺと母のＷを受ける雌の子は単黒色となる。",
    "choiceExplanations": {
      "ア": "横斑の雌のＺ染色体は雄の子に伝わる。雄の子は横斑を示すため、全て単黒色にはならない。",
      "イ": "横斑をもつ母のＺ染色体を受け継ぐのは雄の子である。雌の子は父の単黒色のＺ染色体を受け取る。",
      "ウ": "雄の子は母由来の横斑のＺ染色体を受け取り、雌の子は父由来の単黒色のＺ染色体を受け取る。選択肢は雌雄が逆である。",
      "エ": "鶏では雄がＺＺ、雌がＺＷである。横斑の母からＺを受ける雄の子が横斑となり、父のＺと母のＷを受ける雌の子は単黒色となる。",
      "オ": "この交配で横斑の遺伝子を受け継ぐかどうかは性別で異なる。子が一律に褐色になる組合せではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q24",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "育種・遺伝",
    "topicTags": [
      "家畜の選抜反応と後代検定"
    ],
    "difficulty": 3,
    "question": "選抜に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．牛の 1 日当たり増体量について選抜を進めても飼料効率は変わらない。\nイ．選抜を繰り返していくと選抜反応は徐々に小さくなり、やがて反応がなくなるが、この集団に遺伝的変異を導入することで再び選抜に対して反応するようになる。\nウ．黒毛和種の後代検定において、雌牛に対してランダムに交配されていなくてもその種雄牛の正確な育種価の予測は可能である。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．増体量と飼料効率に遺伝的な相関があれば、増体量の選抜に伴って飼料効率にも変化が生じ得る／イ．選抜で有効な遺伝的変異が減って反応が弱まった集団でも、新たな変異が加わると再び選抜反応を得られる場合がある／ウ．交配する雌牛の能力に偏りがあると、後代の成績にもその影響が入り、単純な後代検定では種雄牛の育種価が偏り得る。",
    "choiceExplanations": {
      "ア": "アは誤で、増体量と飼料効率に遺伝的な相関があれば、増体量の選抜に伴って飼料効率にも変化が生じ得る。ウは誤で、交配する雌牛の能力に偏りがあると、後代の成績にもその影響が入り、単純な後代検定では種雄牛の育種価が偏り得る。",
      "イ": "アは誤で、増体量と飼料効率に遺伝的な相関があれば、増体量の選抜に伴って飼料効率にも変化が生じ得る。",
      "ウ": "アは誤で、増体量と飼料効率に遺伝的な相関があれば、増体量の選抜に伴って飼料効率にも変化が生じ得る。イは正で、選抜で有効な遺伝的変異が減って反応が弱まった集団でも、新たな変異が加わると再び選抜反応を得られる場合がある。",
      "エ": "イは正で、選抜で有効な遺伝的変異が減って反応が弱まった集団でも、新たな変異が加わると再び選抜反応を得られる場合がある。ウは誤で、交配する雌牛の能力に偏りがあると、後代の成績にもその影響が入り、単純な後代検定では種雄牛の育種価が偏り得る。",
      "オ": "アは誤、イは正、ウは誤である。ア．増体量と飼料効率に遺伝的な相関があれば、増体量の選抜に伴って飼料効率にも変化が生じ得る／イ．選抜で有効な遺伝的変異が減って反応が弱まった集団でも、新たな変異が加わると再び選抜反応を得られる場合がある／ウ．交配する雌牛の能力に偏りがあると、後代の成績にもその影響が入り、単純な後代検定では種雄牛の育種価が偏り得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q25",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "育種・遺伝",
    "topicTags": [
      "近交係数と近交退化"
    ],
    "difficulty": 3,
    "question": "近交係数に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．遺伝的血縁関係の度合いを数値化した近交係数は、同じ祖先の個体から由来した共通の遺伝子が存在する確率である。\nイ．種雄牛の評価が正確に行われると、特定の種雄牛に交配が集中し、近交係数が上昇する。これを回避するためには血縁関係の低い個体を交配する。\nウ．近親交配を続けていくと近交係数が上昇する。この結果、牛では乳量、豚では産子数の低下が現れる。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "アは正、イは正、ウは正である。ア．個体のある遺伝子座で、一対の対立遺伝子が共通祖先由来で同一である確率が近交係数である／イ．優良と判定された一部の雄への交配集中は近交を進めるため、血縁の低い個体の組合せを選ぶことが対策になる／ウ．近親交配が続くと近交係数が上がり、牛の乳量や豚の産子数などで近交退化が起こる場合がある。",
    "choiceExplanations": {
      "ア": "アは正、イは正、ウは正である。ア．個体のある遺伝子座で、一対の対立遺伝子が共通祖先由来で同一である確率が近交係数である／イ．優良と判定された一部の雄への交配集中は近交を進めるため、血縁の低い個体の組合せを選ぶことが対策になる／ウ．近親交配が続くと近交係数が上がり、牛の乳量や豚の産子数などで近交退化が起こる場合がある。",
      "イ": "ウは正で、近親交配が続くと近交係数が上がり、牛の乳量や豚の産子数などで近交退化が起こる場合がある。",
      "ウ": "イは正で、優良と判定された一部の雄への交配集中は近交を進めるため、血縁の低い個体の組合せを選ぶことが対策になる。",
      "エ": "アは正で、個体のある遺伝子座で、一対の対立遺伝子が共通祖先由来で同一である確率が近交係数である。イは正で、優良と判定された一部の雄への交配集中は近交を進めるため、血縁の低い個体の組合せを選ぶことが対策になる。",
      "オ": "アは正で、個体のある遺伝子座で、一対の対立遺伝子が共通祖先由来で同一である確率が近交係数である。ウは正で、近親交配が続くと近交係数が上がり、牛の乳量や豚の産子数などで近交退化が起こる場合がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q26",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "育種・遺伝",
    "topicTags": [
      "黒毛和種の能力検定"
    ],
    "difficulty": 3,
    "question": "黒毛和種の産肉能力検定に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．雄牛自身の発育、飼料の利用性及び繁殖能力を測定する能力検定を直接検定と言う。\nイ．産子を用いて父である雄牛の能力を評価する検定を後代検定と言う。\nウ．後代検定は 1 か所で実施する間接検定と複数か所で実施する現場後代検定があるが、検定期間は同じである。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．産肉能力の直接検定では雄牛自身の発育や飼料利用性などを測り、繁殖能力を含むすべての能力を測るものではない／イ．雄牛自身で測りにくい枝肉形質などについて、産子の成績から雄牛の能力を評価するのが後代検定である／ウ．一定の試験施設で行う間接検定と、現場の複数農場の成績を用いる現場後代検定では、検定期間などの条件が異なる。",
    "choiceExplanations": {
      "ア": "アは誤で、産肉能力の直接検定では雄牛自身の発育や飼料利用性などを測り、繁殖能力を含むすべての能力を測るものではない。ウは誤で、一定の試験施設で行う間接検定と、現場の複数農場の成績を用いる現場後代検定では、検定期間などの条件が異なる。",
      "イ": "アは誤で、産肉能力の直接検定では雄牛自身の発育や飼料利用性などを測り、繁殖能力を含むすべての能力を測るものではない。",
      "ウ": "アは誤で、産肉能力の直接検定では雄牛自身の発育や飼料利用性などを測り、繁殖能力を含むすべての能力を測るものではない。イは正で、雄牛自身で測りにくい枝肉形質などについて、産子の成績から雄牛の能力を評価するのが後代検定である。",
      "エ": "イは正で、雄牛自身で測りにくい枝肉形質などについて、産子の成績から雄牛の能力を評価するのが後代検定である。ウは誤で、一定の試験施設で行う間接検定と、現場の複数農場の成績を用いる現場後代検定では、検定期間などの条件が異なる。",
      "オ": "アは誤、イは正、ウは誤である。ア．産肉能力の直接検定では雄牛自身の発育や飼料利用性などを測り、繁殖能力を含むすべての能力を測るものではない／イ．雄牛自身で測りにくい枝肉形質などについて、産子の成績から雄牛の能力を評価するのが後代検定である／ウ．一定の試験施設で行う間接検定と、現場の複数農場の成績を用いる現場後代検定では、検定期間などの条件が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q27",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "育種・遺伝",
    "topicTags": [
      "牛の遺伝性疾患"
    ],
    "difficulty": 3,
    "question": "遺伝病、牛の品種、主な症状の組合せとして最も妥当なのはどれか。\n（遺伝病） （牛の品種） （主な症状）",
    "choices": {
      "ア": "牛白血球粘着性欠如症 ホルスタイン種 流死産による出生率低下",
      "イ": "モリブデン補酵素欠損症 ホルスタイン種 腎機能不全による尿毒症",
      "ウ": "IARS 異常症 黒毛和種 虚弱子牛",
      "エ": "クローディン 16 欠損症 ホルスタイン種 尿路結石、発育遅延",
      "オ": "牛短脊椎症 黒毛和種 免疫不全、生後数ヶ月で死亡"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ＩＡＲＳの異常は黒毛和種で報告された遺伝性疾患である。出生した子牛が虚弱で育ちにくいなどの症状を示す。",
    "choiceExplanations": {
      "ア": "ホルスタインの白血球粘着性欠如症では、好中球の移動に障害があり、感染症を繰り返す。流死産を主徴とする分類は合わない。",
      "イ": "牛のモリブデン補酵素欠損症は黒毛和種での報告があり、神経症状や発育異常が問題となる。尿毒症を代表症状とする組合せではない。",
      "ウ": "ＩＡＲＳの異常は黒毛和種で報告された遺伝性疾患である。出生した子牛が虚弱で育ちにくいなどの症状を示す。",
      "エ": "クローディン16欠損症で腎機能障害や発育遅延が起こる点は合うが、国内で問題になったのは主に黒毛和種である。",
      "オ": "短脊椎症では脊椎の異常や体形の変化が主であり、免疫不全を特徴とする疾患とは区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q28",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "畜産環境",
    "topicTags": [
      "反すう動物のメタン発生"
    ],
    "difficulty": 3,
    "question": "反芻動物の消化管内発酵由来メタンの生成と抑制に関する記述として最も妥当なのはどれか。\nア．メタンは反芻動物のエネルギーとして利用されず、あい気として口から排出される。\nイ．メタンの生成は、主にルーメン内のプロトゾアによって行われる。\nウ．メタンの生成には、嫌気発酵で生成された水素が利用されている。\nエ．粗飼料の給与割合を高め、濃厚飼料の給与割合を低くすることで、メタンの生成が抑制される。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ア．第一胃などで生じたメタンの多くはあい気として排出され、家畜がエネルギーとして利用できない。ウ．第一胃の嫌気的な発酵で生じた水素は、メタン生成古細菌がメタンを作る際に利用する。",
    "choiceExplanations": {
      "ア": "ア．第一胃などで生じたメタンの多くはあい気として排出され、家畜がエネルギーとして利用できない。イ．メタンを作る主な微生物はメタン生成古細菌であり、原虫は水素供給などを通じて間接的に関わる。",
      "イ": "ア．第一胃などで生じたメタンの多くはあい気として排出され、家畜がエネルギーとして利用できない。ウ．第一胃の嫌気的な発酵で生じた水素は、メタン生成古細菌がメタンを作る際に利用する。",
      "ウ": "イ．メタンを作る主な微生物はメタン生成古細菌であり、原虫は水素供給などを通じて間接的に関わる。ウ．第一胃の嫌気的な発酵で生じた水素は、メタン生成古細菌がメタンを作る際に利用する。",
      "エ": "イ．メタンを作る主な微生物はメタン生成古細菌であり、原虫は水素供給などを通じて間接的に関わる。エ．粗飼料の割合を増やすと繊維の発酵に伴ってメタン生成が増える場合があり、高粗飼料で必ず抑制されるとはいえない。",
      "オ": "ウ．第一胃の嫌気的な発酵で生じた水素は、メタン生成古細菌がメタンを作る際に利用する。エ．粗飼料の割合を増やすと繊維の発酵に伴ってメタン生成が増える場合があり、高粗飼料で必ず抑制されるとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q29",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "家畜生理",
    "topicTags": [
      "家畜・家きんの消化器官"
    ],
    "difficulty": 3,
    "question": "家畜・家きんの消化器官に関する記述として最も妥当なのはどれか。\nア．牛などの反芻胃の運動は、第一胃と第二胃が連動して起こる。これらの運動により、胃内容物が撹拌される。\nイ．単胃動物の胃は噴門部、胃底部及び幽門部に分けられ、各部位には腺が存在し、粘液を分泌する。\nウ．鶏のそ嚢は鳥類特有の消化管で、胃の一部が変化したものであるが、分泌腺はない。\nエ．鶏には盲腸は存在しない。大腸の末端は総排泄腔と呼ばれ、輸卵管と尿管が開口し、尿と糞を混合して排泄する。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ア．第一胃と第二胃は連動して収縮し、発酵中の内容物を混ぜて移動させる。イ．単胃は噴門部、胃底部、幽門部などに区分され、腺から分泌される粘液が表面の保護に関わる。",
    "choiceExplanations": {
      "ア": "ア．第一胃と第二胃は連動して収縮し、発酵中の内容物を混ぜて移動させる。イ．単胃は噴門部、胃底部、幽門部などに区分され、腺から分泌される粘液が表面の保護に関わる。",
      "イ": "ア．第一胃と第二胃は連動して収縮し、発酵中の内容物を混ぜて移動させる。ウ．鶏のそ嚢は胃ではなく食道がふくらんだ構造で、飼料を一時的にためる。",
      "ウ": "イ．単胃は噴門部、胃底部、幽門部などに区分され、腺から分泌される粘液が表面の保護に関わる。ウ．鶏のそ嚢は胃ではなく食道がふくらんだ構造で、飼料を一時的にためる。",
      "エ": "イ．単胃は噴門部、胃底部、幽門部などに区分され、腺から分泌される粘液が表面の保護に関わる。エ．鶏には一対の盲腸があり、尿管などが総排泄腔に開く点と、盲腸の有無は区別して考える。",
      "オ": "ウ．鶏のそ嚢は胃ではなく食道がふくらんだ構造で、飼料を一時的にためる。エ．鶏には一対の盲腸があり、尿管などが総排泄腔に開く点と、盲腸の有無は区別して考える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q30",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "家畜衛生",
    "topicTags": [
      "飼養衛生管理基準の対象と運用"
    ],
    "difficulty": 3,
    "question": "「家畜伝染病予防法」に基づく飼養衛生管理基準に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "家畜の飼養に係る衛生管理の方法に関し、都道府県の家畜防疫員及び家畜の所有者が遵守すべき基準を定めている。",
      "イ": "家畜の所有者は、農場内への不適切な物品の持ち込み禁止などを規定した飼養衛生管理マニュアルを作成し、従事者等へ周知する必要がある。",
      "ウ": "衛生管理区域内において、猫等の愛玩動物の飼育に制限はない。",
      "エ": "衛生管理区域は衛生管理が徹底されていることから、入場時に消毒をすれば、退出する時の消毒は必要ない。",
      "オ": "飼養衛生管理基準では、過去 1 か月以内に海外から入国した者は、衛生管理区域に立ち入らせないようにすることを定めている。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "家畜の所有者は、衛生管理区域への物品持込みなどを含む作業手順をマニュアルに定める。従事者や関係者に内容を周知する必要がある。",
    "choiceExplanations": {
      "ア": "飼養衛生管理基準の遵守義務を負う主体は家畜の所有者である。防疫員の職務を定める基準とは区別する。",
      "イ": "家畜の所有者は、衛生管理区域への物品持込みなどを含む作業手順をマニュアルに定める。従事者や関係者に内容を周知する必要がある。",
      "ウ": "衛生管理区域内への愛玩動物の持込みや飼育は制限される。猫であっても制限がないという説明は合わない。",
      "エ": "病原体の持込みだけでなく、区域外への持出しも防止する必要がある。入退場時の衛生措置は基準の規定に従う。",
      "オ": "帰国者の立入り制限は、訪問先や接触歴などを踏まえた基準に基づく。一律に過去１か月以内に国外から来た全員を禁止する規定ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q31",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "飼養管理",
    "topicTags": [
      "牛の胎子と子牛の発育"
    ],
    "difficulty": 3,
    "question": "牛の発育に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．出生後の子牛は母牛の母乳(初乳)を摂取するが、60 時間経過しても小腸での免疫グロブリンの吸収能は持続している。\nイ．牛の胎子は妊娠初期には比較的緩やかな速度で発育し、妊娠中期から後期にかけて急速に発育する。\nウ．肥育牛の筋肉細胞内への脂肪の蓄積は約 20 ヶ月齢から始まる。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．子牛が初乳由来の免疫グロブリンを吸収できるのは出生後の短い期間であり、60時間後も同じ能力が続くわけではない／イ．胎子の体重の増加は、妊娠初期よりも組織が急速に成長する中期から後期に大きい／ウ．筋肉内脂肪につながる細胞の形成や脂肪蓄積は20か月齢より前から進み得るため、その月齢を一律の開始時期とはしない。",
    "choiceExplanations": {
      "ア": "アは誤で、子牛が初乳由来の免疫グロブリンを吸収できるのは出生後の短い期間であり、60時間後も同じ能力が続くわけではない。ウは誤で、筋肉内脂肪につながる細胞の形成や脂肪蓄積は20か月齢より前から進み得るため、その月齢を一律の開始時期とはしない。",
      "イ": "アは誤で、子牛が初乳由来の免疫グロブリンを吸収できるのは出生後の短い期間であり、60時間後も同じ能力が続くわけではない。",
      "ウ": "アは誤で、子牛が初乳由来の免疫グロブリンを吸収できるのは出生後の短い期間であり、60時間後も同じ能力が続くわけではない。イは正で、胎子の体重の増加は、妊娠初期よりも組織が急速に成長する中期から後期に大きい。",
      "エ": "イは正で、胎子の体重の増加は、妊娠初期よりも組織が急速に成長する中期から後期に大きい。ウは誤で、筋肉内脂肪につながる細胞の形成や脂肪蓄積は20か月齢より前から進み得るため、その月齢を一律の開始時期とはしない。",
      "オ": "アは誤、イは正、ウは誤である。ア．子牛が初乳由来の免疫グロブリンを吸収できるのは出生後の短い期間であり、60時間後も同じ能力が続くわけではない／イ．胎子の体重の増加は、妊娠初期よりも組織が急速に成長する中期から後期に大きい／ウ．筋肉内脂肪につながる細胞の形成や脂肪蓄積は20か月齢より前から進み得るため、その月齢を一律の開始時期とはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q32",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "家畜栄養",
    "topicTags": [
      "ビタミンの機能と欠乏症"
    ],
    "difficulty": 3,
    "question": "ビタミン、主な働き、欠乏症の組合せとして最も妥当なのはどれか。\n（ビタミン） （主な働き） （欠乏症）",
    "choices": {
      "ア": "ビタミンＡ コラーゲン生成、維持 壊血病",
      "イ": "ビタミンＢ1 脱炭酸酵素の補酵素 神経障害",
      "ウ": "ビタミンＣ カルシウムの吸収代謝促進 くる病、骨軟化症",
      "エ": "ビタミンＥ 成長促進 夜盲症、発育不全",
      "オ": "ビタミンＫ 抗酸化作用 不妊、筋ジストロフィー"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ビタミンＢ₁はチアミンであり、活性型は一部の脱炭酸反応の補酵素として働く。不足は神経障害などにつながる。",
    "choiceExplanations": {
      "ア": "コラーゲンの形成に関わり、不足して壊血病を起こすのはビタミンＣである。",
      "イ": "ビタミンＢ₁はチアミンであり、活性型は一部の脱炭酸反応の補酵素として働く。不足は神経障害などにつながる。",
      "ウ": "カルシウムの吸収を促し、不足するとくる病や骨軟化症に関わるのはビタミンＤである。",
      "エ": "夜盲症は主にビタミンＡ不足の症状である。ビタミンＥは脂質などの酸化を防ぐ作用を持つ。",
      "オ": "ビタミンＫは血液凝固因子などの活性化に関わり、欠乏すると出血傾向が出る。抗酸化作用はビタミンＥに代表される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q33",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "家畜栄養",
    "topicTags": [
      "糖新生の基質"
    ],
    "difficulty": 3,
    "question": "動物の糖新生に関する記述の〔 Ａ 〕、〔 Ｂ 〕、〔 Ｃ 〕に該当する語句の組合せとして最も妥当なのはどれか。動物には炭水化物以外の物質から糖を合成する能力が備わっている。単胃動物では、筋グリコーゲンの分解で得られた〔 Ａ 〕や筋内から放出されたアミノ酸、脂肪代謝の過程で生じた〔 Ｂ 〕が材料である。反芻動物では、第一胃内発酵で得られた揮発性脂肪酸(VFA)のうち、〔 Ｃ 〕が主要な材料である。\n〔 Ａ 〕 〔 Ｂ 〕 〔 Ｃ 〕",
    "choices": {
      "ア": "乳酸 酢酸 プロピオン酸",
      "イ": "酪酸 酢酸 クエン酸",
      "ウ": "クエン酸 酢酸 酪酸",
      "エ": "乳酸 グリセロール プロピオン酸",
      "オ": "プロピオン酸 グリセロール 乳酸"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "単胃動物では筋などに由来する乳酸や、脂肪の分解で生じるグリセロールを利用する。反すう動物では第一胃発酵でできるプロピオン酸が主要な基質となる。",
    "choiceExplanations": {
      "ア": "乳酸とプロピオン酸は合うが、脂質の分解で生じる糖新生の基質は酢酸ではなくグリセロールである。",
      "イ": "単胃動物では筋などに由来する乳酸や脂肪に由来するグリセロールを使える。反すう動物ではプロピオン酸が主要な基質である。",
      "ウ": "筋のグリコーゲン代謝由来の乳酸がＡに入る。反すう動物の糖新生では第一胃で生じるプロピオン酸が重要である。",
      "エ": "単胃動物では筋などに由来する乳酸や、脂肪の分解で生じるグリセロールを利用する。反すう動物では第一胃発酵でできるプロピオン酸が主要な基質となる。",
      "オ": "Ｂのグリセロールは合うが、乳酸はＡ、プロピオン酸はＣである。反すう動物では第一胃発酵の産物を利用する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q34",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "飼料作物",
    "topicTags": [
      "代表的な牧草の特性"
    ],
    "difficulty": 3,
    "question": "牧草の種類に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "オーチャードグラスは寒地型の多年生牧草である。耐湿性は弱いが施肥反応が良く、出穂後の品質低下が緩やかなため収穫適期の幅も広い。",
      "イ": "チモシーは寒地型の多年生牧草で、耐寒性が高く越冬性に優れるが、寒地型牧草の中では嗜好性や栄養価は低い。",
      "ウ": "イタリアンライグラスは寒地型のイネ科牧草であり、多様な作型と品種が存在し、秋播き栽培や水田裏作としても利用される。",
      "エ": "トールフェスクは暖地型の 1 年生牧草である。耐干性、耐暑性に優れているため日本に広く適応するが嗜好性が良好でない。",
      "オ": "アルファルファは１年生のマメ科牧草で、タンパク質やミネラルの割合が高く栄養価が高く、耐干性は極めて高い。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "イタリアンライグラスは寒地型のイネ科牧草である。品種や作型が多く、秋まきして水田裏作に利用する例もある。",
    "choiceExplanations": {
      "ア": "オーチャードグラスは寒地型の多年生で合うが、出穂すると茎の割合が増えて品質が下がりやすく、収穫適期は広いとはいえない。",
      "イ": "チモシーは耐寒性に優れ、一般に家畜の嗜好性もよい。寒地型牧草の中で嗜好性が低いという記述は合わない。",
      "ウ": "イタリアンライグラスは寒地型のイネ科牧草である。品種や作型が多く、秋まきして水田裏作に利用する例もある。",
      "エ": "トールフェスクは環境への適応性が広いが、寒地型の多年生牧草に分類される。",
      "オ": "アルファルファは栄養価が高く乾燥に比較的強いが、通常は多年生のマメ科牧草である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q35",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "飼料作物",
    "topicTags": [
      "乾草の品質と調製"
    ],
    "difficulty": 3,
    "question": "牧草及び乾草に関する記述として最も妥当なのはどれか。\nア．日本は海外から年間約 200 万トンの乾牧草を輸入しており、主な輸入先はロシアと米国である。\nイ．作物の生育が進むと繊維成分やリグニンが増加するため栄養価は低下する。\nウ．日本は高温多湿であるため乾草の調製には加温通風乾燥法が有効であるが、燃料代が高価である他、天日乾燥と比べて牧草からの養分の損失が大きい。\nエ．わら類など低栄養な牧草では、アンモニア処理や尿素処理を加えて消化性を高めることがある。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "イ．牧草が成熟すると茎や細胞壁の割合が増え、リグニンの増加によって消化率や栄養価が低下しやすい。エ．わらなどの粗飼料は、アンモニアや尿素による処理で繊維の利用性を改善できる場合がある。",
    "choiceExplanations": {
      "ア": "ア．国内は乾牧草を多く輸入するが、主な供給先には米国や豪州、カナダなどがあり、ロシアを主な相手とする説明は合わない。イ．牧草が成熟すると茎や細胞壁の割合が増え、リグニンの増加によって消化率や栄養価が低下しやすい。",
      "イ": "ア．国内は乾牧草を多く輸入するが、主な供給先には米国や豪州、カナダなどがあり、ロシアを主な相手とする説明は合わない。ウ．加温通風乾燥は燃料を要するが、天候不良による時間の延長や養分流出を抑えやすい。",
      "ウ": "イ．牧草が成熟すると茎や細胞壁の割合が増え、リグニンの増加によって消化率や栄養価が低下しやすい。ウ．加温通風乾燥は燃料を要するが、天候不良による時間の延長や養分流出を抑えやすい。",
      "エ": "イ．牧草が成熟すると茎や細胞壁の割合が増え、リグニンの増加によって消化率や栄養価が低下しやすい。エ．わらなどの粗飼料は、アンモニアや尿素による処理で繊維の利用性を改善できる場合がある。",
      "オ": "ウ．加温通風乾燥は燃料を要するが、天候不良による時間の延長や養分流出を抑えやすい。エ．わらなどの粗飼料は、アンモニアや尿素による処理で繊維の利用性を改善できる場合がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q36",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "飼料作物",
    "topicTags": [
      "サイレージの収穫適期と発酵"
    ],
    "difficulty": 3,
    "question": "サイレージの調製に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．材料草の収穫適期は糖分を十分量含んでいる時期であり、イネ科牧草では出穂期、マメ科牧草では開花期、トウモロコシは糊熟期がよい。\nイ．良好な条件下では、材料草の細切は、サイレージ発酵の促進と好気的変敗の抑制などの効果がある。\nウ．良好な条件下では、材料の詰め込みから 2～3 ヶ月で発酵が安定する。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．とうもろこしでは一般に水分と栄養の釣合いが取れる黄熟期が目安で、糊熟期はそれより早い／イ．原料を細かく切ると密に詰めやすく、残る空気が減って乳酸発酵を促し、好気的な変敗を抑えやすい／ウ．好条件では詰め込んでから数週間程度で発酵が進んで安定する場合があり、２～３か月を一般的な所要期間とはしない。",
    "choiceExplanations": {
      "ア": "アは誤で、とうもろこしでは一般に水分と栄養の釣合いが取れる黄熟期が目安で、糊熟期はそれより早い。ウは誤で、好条件では詰め込んでから数週間程度で発酵が進んで安定する場合があり、２～３か月を一般的な所要期間とはしない。",
      "イ": "アは誤で、とうもろこしでは一般に水分と栄養の釣合いが取れる黄熟期が目安で、糊熟期はそれより早い。",
      "ウ": "アは誤で、とうもろこしでは一般に水分と栄養の釣合いが取れる黄熟期が目安で、糊熟期はそれより早い。イは正で、原料を細かく切ると密に詰めやすく、残る空気が減って乳酸発酵を促し、好気的な変敗を抑えやすい。",
      "エ": "イは正で、原料を細かく切ると密に詰めやすく、残る空気が減って乳酸発酵を促し、好気的な変敗を抑えやすい。ウは誤で、好条件では詰め込んでから数週間程度で発酵が進んで安定する場合があり、２～３か月を一般的な所要期間とはしない。",
      "オ": "アは誤、イは正、ウは誤である。ア．とうもろこしでは一般に水分と栄養の釣合いが取れる黄熟期が目安で、糊熟期はそれより早い／イ．原料を細かく切ると密に詰めやすく、残る空気が減って乳酸発酵を促し、好気的な変敗を抑えやすい／ウ．好条件では詰め込んでから数週間程度で発酵が進んで安定する場合があり、２～３か月を一般的な所要期間とはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q37",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "飼料作物",
    "topicTags": [
      "飼料生産に使う作業機"
    ],
    "difficulty": 3,
    "question": "飼料生産における草地の耕起用、堆肥の散布用、牧草の圧砕用機械の組合せとして最も妥当なのはどれか。\n（草地の耕起） （堆肥の散布） （牧草の圧砕）",
    "choices": {
      "ア": "プラウ マニュアスプレッダ ヘイコンディショナー",
      "イ": "プラウ マニュアスプレッダ ブロア",
      "ウ": "レーキ マニュアスプレッダ ヘイコンディショナー",
      "エ": "レーキ ハロー ブロア",
      "オ": "レーキ ハロー ヘイコンディショナー"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "プラウは土を反転して耕し、マニュアスプレッダは堆肥を散布する。ヘイコンディショナーは牧草を圧砕して乾燥しやすくする。",
    "choiceExplanations": {
      "ア": "プラウは土を反転して耕し、マニュアスプレッダは堆肥を散布する。ヘイコンディショナーは牧草を圧砕して乾燥しやすくする。",
      "イ": "プラウとマニュアスプレッダは合う。牧草の茎の圧砕には送風用のブロアではなくヘイコンディショナーを使う。",
      "ウ": "堆肥の散布と牧草の圧砕の対応は合うが、草地を耕す機械はレーキではなくプラウである。",
      "エ": "レーキは牧草などの集草、ハローは土塊を砕く作業などに用いる。ここで問う用途はプラウ、マニュアスプレッダ、ヘイコンディショナーが対応する。",
      "オ": "ヘイコンディショナーは合うが、草地の耕起はプラウ、堆肥散布はマニュアスプレッダが担う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q38",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "飼料作物",
    "topicTags": [
      "放牧方式と草種への影響"
    ],
    "difficulty": 3,
    "question": "放牧に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．連続放牧は、放牧地を帯状に区分し、次々と連続して使用する集約的な方法である。\nイ．電気牧柵は断続的に通電し、接触した家畜に電気ショックを学習させることで家畜の脱柵を防止するものである。\nウ．放牧強度が高いと長草型牧草が成長し、クローバーなどのほふく型牧草が被食されやすい。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．牧区を帯状に区切って順に使うのは帯状放牧などであり、連続放牧では同じ放牧地を継続して使う／イ．電気牧柵は家畜が触れた際に短い通電の刺激を与え、柵に近づきにくくすることで脱柵を防ぐ／ウ．放牧圧が高いと高く茎を伸ばす草種は葉を失いやすく、地面に沿って伸びる草種は残りやすい場合がある。",
    "choiceExplanations": {
      "ア": "アは誤で、牧区を帯状に区切って順に使うのは帯状放牧などであり、連続放牧では同じ放牧地を継続して使う。ウは誤で、放牧圧が高いと高く茎を伸ばす草種は葉を失いやすく、地面に沿って伸びる草種は残りやすい場合がある。",
      "イ": "アは誤で、牧区を帯状に区切って順に使うのは帯状放牧などであり、連続放牧では同じ放牧地を継続して使う。",
      "ウ": "アは誤で、牧区を帯状に区切って順に使うのは帯状放牧などであり、連続放牧では同じ放牧地を継続して使う。イは正で、電気牧柵は家畜が触れた際に短い通電の刺激を与え、柵に近づきにくくすることで脱柵を防ぐ。",
      "エ": "イは正で、電気牧柵は家畜が触れた際に短い通電の刺激を与え、柵に近づきにくくすることで脱柵を防ぐ。ウは誤で、放牧圧が高いと高く茎を伸ばす草種は葉を失いやすく、地面に沿って伸びる草種は残りやすい場合がある。",
      "オ": "アは誤、イは正、ウは誤である。ア．牧区を帯状に区切って順に使うのは帯状放牧などであり、連続放牧では同じ放牧地を継続して使う／イ．電気牧柵は家畜が触れた際に短い通電の刺激を与え、柵に近づきにくくすることで脱柵を防ぐ／ウ．放牧圧が高いと高く茎を伸ばす草種は葉を失いやすく、地面に沿って伸びる草種は残りやすい場合がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q39",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "飼料作物",
    "topicTags": [
      "飼料生産作業を受託する組織"
    ],
    "difficulty": 3,
    "question": "飼料生産に関する記述の〔 Ａ 〕、〔 Ｂ 〕、〔 Ｃ 〕に該当する語句の組合せとして最も妥当なのはどれか。畜産農家から、播種や収穫などの自給飼料生産のための作業を受託する外部支援組織を〔 Ａ 〕という。その組織数は近年増加しており、〔 Ｂ 〕で最も多い。また、都府県の〔 Ａ 〕では〔 Ｃ 〕が生産されることが多い。\n〔 Ａ 〕 〔 Ｂ 〕 〔 Ｃ 〕",
    "choices": {
      "ア": "TMR センター 九州 青刈りトウモロコシ",
      "イ": "コントラクター 北海道 ホールクロップサイレージ（WCS）用稲",
      "ウ": "TMR センター 九州 ホールクロップサイレージ（WCS）用稲",
      "エ": "コントラクター 九州 青刈りトウモロコシ",
      "オ": "TMR センター 北海道 青刈りトウモロコシ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "自給飼料の栽培・収穫作業を請け負うのはコントラクターであり、北海道で多い。都府県ではＷＣＳ用稲の栽培にも関わる。",
    "choiceExplanations": {
      "ア": "播種や収穫を請け負う組織はコントラクターである。ＴＭＲセンターは主に混合飼料の調製・供給を担う。",
      "イ": "自給飼料の栽培・収穫作業を請け負うのはコントラクターであり、北海道で多い。都府県ではＷＣＳ用稲の栽培にも関わる。",
      "ウ": "ＷＣＳ用稲は都府県の受託作業で扱われるが、作業受託の組織はコントラクターである。組織数は北海道が多い。",
      "エ": "コントラクターは合うが、組織数の多い地域は北海道であり、都府県で多く扱われる作物にはＷＣＳ用稲がある。",
      "オ": "北海道は合うが、圃場での生産作業を受託する組織はコントラクターである。都府県ではＷＣＳ用稲の利用が進む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q40",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "家畜生理",
    "topicTags": [
      "自然免疫と抗体応答"
    ],
    "difficulty": 3,
    "question": "家畜の免疫に関する記述として最も妥当なのはどれか。\nア．抗原刺激を受けたことのない物質で抗原刺激を受けた家畜では、最初に IgG 抗体が産生される。\nイ．肥満細胞は、ヒスタミンと結合して IgE 抗体を産生し、アレルギー症状を引き起こす。\nウ．リゾチームは、涙に含まれる成分の一つで、溶菌作用を示す。\nエ．好中球による食作用は、体内に異物が侵入した際の生体防御機構である。",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ウ．涙に含まれるリゾチームは一部の細菌の細胞壁成分を分解し、自然防御に関与する。エ．好中球は体内に入った細菌などを取り込んで処理し、自然免疫の一部を担う。",
    "choiceExplanations": {
      "ア": "ア．初回の抗原刺激では一般に初めにＩｇＭが産生され、その後にＩｇＧなどへのクラススイッチが起こる。イ．肥満細胞は受容体に結合したＩｇＥを介して刺激を受け、ヒスタミンを放出するが、ＩｇＥを産生する細胞ではない。",
      "イ": "ア．初回の抗原刺激では一般に初めにＩｇＭが産生され、その後にＩｇＧなどへのクラススイッチが起こる。ウ．涙に含まれるリゾチームは一部の細菌の細胞壁成分を分解し、自然防御に関与する。",
      "ウ": "イ．肥満細胞は受容体に結合したＩｇＥを介して刺激を受け、ヒスタミンを放出するが、ＩｇＥを産生する細胞ではない。ウ．涙に含まれるリゾチームは一部の細菌の細胞壁成分を分解し、自然防御に関与する。",
      "エ": "イ．肥満細胞は受容体に結合したＩｇＥを介して刺激を受け、ヒスタミンを放出するが、ＩｇＥを産生する細胞ではない。エ．好中球は体内に入った細菌などを取り込んで処理し、自然免疫の一部を担う。",
      "オ": "ウ．涙に含まれるリゾチームは一部の細菌の細胞壁成分を分解し、自然防御に関与する。エ．好中球は体内に入った細菌などを取り込んで処理し、自然免疫の一部を担う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q41",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "家畜衛生",
    "topicTags": [
      "移動制限・ワクチン・消毒"
    ],
    "difficulty": 3,
    "question": "感染症の防疫に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．感染症が発生した際に家畜の移動制限を行うのは、病原体の伝播経路を遮断するためである。\nイ．ワクチンは、家畜に免疫を与えることにより、病原体の感染を予防又は感染症の発症を抑制する。\nウ．家畜伝染病のまん延の防止のため、都道府県知事は、家畜伝染病の病原体に汚染したおそれのある車両の消毒を命じることができる。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "アは正、イは正、ウは正である。ア．家畜の移動を制限すれば、病原体が別の農場や地域へ持ち出される経路を断つことができる／イ．ワクチンはあらかじめ免疫反応を誘導し、感染や感染後の発症を防いだり減らしたりする／ウ．家畜伝染病予防法は、汚染されたおそれのある車両などについて都道府県知事が消毒を命じることを認めている。",
    "choiceExplanations": {
      "ア": "アは正、イは正、ウは正である。ア．家畜の移動を制限すれば、病原体が別の農場や地域へ持ち出される経路を断つことができる／イ．ワクチンはあらかじめ免疫反応を誘導し、感染や感染後の発症を防いだり減らしたりする／ウ．家畜伝染病予防法は、汚染されたおそれのある車両などについて都道府県知事が消毒を命じることを認めている。",
      "イ": "ウは正で、家畜伝染病予防法は、汚染されたおそれのある車両などについて都道府県知事が消毒を命じることを認めている。",
      "ウ": "イは正で、ワクチンはあらかじめ免疫反応を誘導し、感染や感染後の発症を防いだり減らしたりする。",
      "エ": "アは正で、家畜の移動を制限すれば、病原体が別の農場や地域へ持ち出される経路を断つことができる。イは正で、ワクチンはあらかじめ免疫反応を誘導し、感染や感染後の発症を防いだり減らしたりする。",
      "オ": "アは正で、家畜の移動を制限すれば、病原体が別の農場や地域へ持ち出される経路を断つことができる。ウは正で、家畜伝染病予防法は、汚染されたおそれのある車両などについて都道府県知事が消毒を命じることを認めている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q42",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "家畜衛生",
    "topicTags": [
      "牛でみられる疾患の症状と原因"
    ],
    "difficulty": 3,
    "question": "牛の疾患、症状、原因の組合せとして最も妥当なのはどれか。\n（疾患） （症状） （原因）",
    "choices": {
      "ア": "ワラビ中毒 下痢 ワラビ中のプタキロシド摂取",
      "イ": "牛伝染性鼻気管炎 膿様鼻汁 マイコプラズマ感染",
      "ウ": "グラステタニー症 痙攣 マグネシウム欠乏",
      "エ": "麦角アルカロイド中毒 免疫不全 飼料中のアフラトキシン摂取",
      "オ": "乳熱 起立困難 高カルシウム血症"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "グラステタニーは血中マグネシウム濃度が低下して生じる。筋の振戦、痙攣や起立困難などの神経・筋症状を示す。",
    "choiceExplanations": {
      "ア": "プタキロシドは牛のワラビ中毒に関与するが、急性例では骨髄抑制による出血傾向などが特徴となる。",
      "イ": "膿様の鼻汁はみられ得るが、牛伝染性鼻気管炎の原因は牛ヘルペスウイルスである。",
      "ウ": "グラステタニーは血中マグネシウム濃度が低下して生じる。筋の振戦、痙攣や起立困難などの神経・筋症状を示す。",
      "エ": "麦角アルカロイドとアフラトキシンは異なるカビ毒である。麦角中毒では末梢循環障害などがみられる。",
      "オ": "乳熱では起立困難がみられるが、原因は血中カルシウムの上昇ではなく低下である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q43",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "家畜衛生",
    "topicTags": [
      "令和３年の監視伝染病発生状況"
    ],
    "difficulty": 3,
    "question": "令和 3 年の監視伝染病の発生状況に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．四国地方において、豚熱が継続的に発生した。\nイ．牛のヨーネ病は、北海道での発生が最も多い。\nウ．牛の伝達性海綿状脳症が 5 年ぶりに発生した。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．令和３年の家畜での豚熱の発生状況から、四国地方で継続的に発生したとはいえない／イ．令和３年の牛のヨーネ病では、北海道で報告された発生が多く、都道府県別で最も多い／ウ．対象年に、国内の牛の伝達性海綿状脳症が５年ぶりに発生したという報告はない。",
    "choiceExplanations": {
      "ア": "アは誤で、令和３年の家畜での豚熱の発生状況から、四国地方で継続的に発生したとはいえない。ウは誤で、対象年に、国内の牛の伝達性海綿状脳症が５年ぶりに発生したという報告はない。",
      "イ": "アは誤で、令和３年の家畜での豚熱の発生状況から、四国地方で継続的に発生したとはいえない。",
      "ウ": "アは誤で、令和３年の家畜での豚熱の発生状況から、四国地方で継続的に発生したとはいえない。イは正で、令和３年の牛のヨーネ病では、北海道で報告された発生が多く、都道府県別で最も多い。",
      "エ": "イは正で、令和３年の牛のヨーネ病では、北海道で報告された発生が多く、都道府県別で最も多い。ウは誤で、対象年に、国内の牛の伝達性海綿状脳症が５年ぶりに発生したという報告はない。",
      "オ": "アは誤、イは正、ウは誤である。ア．令和３年の家畜での豚熱の発生状況から、四国地方で継続的に発生したとはいえない／イ．令和３年の牛のヨーネ病では、北海道で報告された発生が多く、都道府県別で最も多い／ウ．対象年に、国内の牛の伝達性海綿状脳症が５年ぶりに発生したという報告はない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q44",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "家畜衛生",
    "topicTags": [
      "動物検疫の対象"
    ],
    "difficulty": 3,
    "question": "動物検疫所で実施する輸入検疫に関する記述ア、イ、ウの正誤の組合せとして最も妥当なのはどれか。\nア．検疫の対象は、生きた動物のみである。\nイ．偶蹄類の動物は、全て検疫対象である。\nウ．猫は、家畜ではないため検疫の対象ではない。ア イ ウ",
    "choices": {
      "ア": "正 正 正",
      "イ": "正 正 誤",
      "ウ": "正 誤 正",
      "エ": "誤 誤 正",
      "オ": "誤 正 誤"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アは誤、イは正、ウは誤である。ア．動物検疫の対象には生きた動物のほか、肉などの畜産物や一部の加工品も含まれる／イ．牛、豚、めん羊、山羊、鹿などの偶蹄類は、家畜伝染病予防法に基づく輸入検疫の対象となる／ウ．猫も狂犬病予防法に基づく輸入検疫の対象であり、対象は産業用の家畜に限られない。",
    "choiceExplanations": {
      "ア": "アは誤で、動物検疫の対象には生きた動物のほか、肉などの畜産物や一部の加工品も含まれる。ウは誤で、猫も狂犬病予防法に基づく輸入検疫の対象であり、対象は産業用の家畜に限られない。",
      "イ": "アは誤で、動物検疫の対象には生きた動物のほか、肉などの畜産物や一部の加工品も含まれる。",
      "ウ": "アは誤で、動物検疫の対象には生きた動物のほか、肉などの畜産物や一部の加工品も含まれる。イは正で、牛、豚、めん羊、山羊、鹿などの偶蹄類は、家畜伝染病予防法に基づく輸入検疫の対象となる。",
      "エ": "イは正で、牛、豚、めん羊、山羊、鹿などの偶蹄類は、家畜伝染病予防法に基づく輸入検疫の対象となる。ウは誤で、猫も狂犬病予防法に基づく輸入検疫の対象であり、対象は産業用の家畜に限られない。",
      "オ": "アは誤、イは正、ウは誤である。ア．動物検疫の対象には生きた動物のほか、肉などの畜産物や一部の加工品も含まれる／イ．牛、豚、めん羊、山羊、鹿などの偶蹄類は、家畜伝染病予防法に基づく輸入検疫の対象となる／ウ．猫も狂犬病予防法に基づく輸入検疫の対象であり、対象は産業用の家畜に限られない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q45",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "家畜衛生",
    "topicTags": [
      "国内で使われる家畜用ワクチン"
    ],
    "difficulty": 3,
    "question": "我が国でワクチンが使用されている家畜・家きんの感染症として最も妥当なのはどれか。\nア．豚熱\nイ．馬伝染性子宮炎\nウ．ニューカッスル病\nエ．牛の結核",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ア．豚熱のワクチンは、国内で定められた接種地域などにおいて防疫に用いられる。ウ．国内の家きんでは、ニューカッスル病を予防するためのワクチンが用いられる。",
    "choiceExplanations": {
      "ア": "ア．豚熱のワクチンは、国内で定められた接種地域などにおいて防疫に用いられる。イ．馬伝染性子宮炎の防疫は検査や繁殖衛生の管理などが中心で、国内で接種されている代表的ワクチンには当たらない。",
      "イ": "ア．豚熱のワクチンは、国内で定められた接種地域などにおいて防疫に用いられる。ウ．国内の家きんでは、ニューカッスル病を予防するためのワクチンが用いられる。",
      "ウ": "イ．馬伝染性子宮炎の防疫は検査や繁殖衛生の管理などが中心で、国内で接種されている代表的ワクチンには当たらない。ウ．国内の家きんでは、ニューカッスル病を予防するためのワクチンが用いられる。",
      "エ": "イ．馬伝染性子宮炎の防疫は検査や繁殖衛生の管理などが中心で、国内で接種されている代表的ワクチンには当たらない。エ．牛結核の国内対策では検査や感染牛の排除などが中心であり、牛への結核ワクチンが一般に使われるわけではない。",
      "オ": "ウ．国内の家きんでは、ニューカッスル病を予防するためのワクチンが用いられる。エ．牛結核の国内対策では検査や感染牛の排除などが中心であり、牛への結核ワクチンが一般に使われるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q46",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "家畜生理",
    "topicTags": [
      "摂食量を調節する因子"
    ],
    "difficulty": 3,
    "question": "摂食量を増加させる因子として最も妥当なのはどれか。\nア．レプチン\nイ．オレキシン\nウ．コレシストキニン\nエ．糖質コルチコイド",
    "choices": {
      "ア": "ア、イ",
      "イ": "ア、ウ",
      "ウ": "イ、ウ",
      "エ": "イ、エ",
      "オ": "ウ、エ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "イ．オレキシンは視床下部で作られ、覚醒の調節や摂食を促す作用に関わる。エ．糖質コルチコイドは食欲の調節に関わり、条件によって摂食を促進する。",
    "choiceExplanations": {
      "ア": "ア．脂肪組織由来のレプチンは、一般に脳にエネルギーの蓄積を伝えて摂食を抑える。イ．オレキシンは視床下部で作られ、覚醒の調節や摂食を促す作用に関わる。",
      "イ": "ア．脂肪組織由来のレプチンは、一般に脳にエネルギーの蓄積を伝えて摂食を抑える。ウ．コレシストキニンは消化を調節し、満腹の信号に関わって摂食量を抑える。",
      "ウ": "イ．オレキシンは視床下部で作られ、覚醒の調節や摂食を促す作用に関わる。ウ．コレシストキニンは消化を調節し、満腹の信号に関わって摂食量を抑える。",
      "エ": "イ．オレキシンは視床下部で作られ、覚醒の調節や摂食を促す作用に関わる。エ．糖質コルチコイドは食欲の調節に関わり、条件によって摂食を促進する。",
      "オ": "ウ．コレシストキニンは消化を調節し、満腹の信号に関わって摂食量を抑える。エ．糖質コルチコイドは食欲の調節に関わり、条件によって摂食を促進する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q47",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "家畜生理",
    "topicTags": [
      "立毛筋と家畜の体組織"
    ],
    "difficulty": 3,
    "question": "家畜の体の構造に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "牛の角では、角が成長する時期に角輪と呼ばれる輪状の陥凹が生じる。",
      "イ": "毛包には平滑筋からなる立毛筋が備わっており、立毛筋が収縮することで毛が逆立つ。",
      "ウ": "乳頭の数は家畜によって異なり、牛や羊では 2 対、馬では 1 対である。",
      "エ": "骨は、骨芽細胞の働きにより破壊と吸収が行われて更新される。",
      "オ": "中枢神経である脳と末梢神経である脊髄が神経組織を構成する。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "毛包に付く立毛筋は平滑筋である。寒さなどの刺激で立毛筋が収縮すると、毛包の角度が変わって皮膚の表面で毛が立つ。",
    "choiceExplanations": {
      "ア": "角輪は分娩などに伴って成長が一時的に鈍った跡として現れることがあり、単に伸長する時期に生じるとはいえない。",
      "イ": "毛包に付く立毛筋は平滑筋である。寒さなどの刺激で立毛筋が収縮すると、毛包の角度が変わって皮膚の表面で毛が立つ。",
      "ウ": "牛の乳頭は通常２対である。めん羊と馬は通常１対であり、めん羊を牛と同じ２対とする点が合わない。",
      "エ": "骨を吸収する主な細胞は破骨細胞であり、骨芽細胞は骨を作る役割を担う。",
      "オ": "脳と脊髄はいずれも中枢神経系に属する。末梢神経には脳・脊髄から伸びる神経などが含まれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q48",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "家畜生理",
    "topicTags": [
      "腎臓の濾過とカルシウム再吸収"
    ],
    "difficulty": 3,
    "question": "腎臓に関する記述の〔 Ａ 〕、〔 Ｂ 〕、〔 Ｃ 〕に該当する語句の組合せとして最も妥当なのはどれか。腎臓の〔 Ａ 〕は毛細血管網からなり、〔 Ａ 〕を通った血液がろ過され、原尿が作られる。腎臓の機能は、ホルモンにより調整されており、上皮小体ホルモンは、〔 Ｂ 〕に作用して〔 Ｃ 〕の再吸収を促進する。\n〔 Ａ 〕 〔 Ｂ 〕 〔 Ｃ 〕",
    "choices": {
      "ア": "糸球体 遠位尿細管 カルシウム",
      "イ": "ボーマン嚢 接合管 カルシウム",
      "ウ": "ボーマン嚢 近位尿細管 カルシウム",
      "エ": "糸球体 接合管 ナトリウム",
      "オ": "ボーマン嚢 近位尿細管 ナトリウム"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "毛細血管網の糸球体で血液が濾過され、原尿ができる。上皮小体ホルモンは遠位尿細管でカルシウムの再吸収を増やす。",
    "choiceExplanations": {
      "ア": "毛細血管網の糸球体で血液が濾過され、原尿ができる。上皮小体ホルモンは遠位尿細管でカルシウムの再吸収を増やす。",
      "イ": "濾液を受けるのがボーマン嚢で、濾過を行う毛細血管網は糸球体である。カルシウムという再吸収対象は合う。",
      "ウ": "ボーマン嚢は濾液を受け取る構造である。上皮小体ホルモンによるカルシウムの再吸収促進は主に遠位側で問われている。",
      "エ": "Ａの糸球体は合うが、このホルモンで再吸収が増えるのはナトリウムではなくカルシウムである。",
      "オ": "濾過を担う毛細血管網は糸球体である。上皮小体ホルモンは遠位尿細管などでカルシウムの保持に関わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q49",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "家畜栄養",
    "topicTags": [
      "家畜のビタミンとミネラル"
    ],
    "difficulty": 3,
    "question": "ビタミン及びミネラルに関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "コバルトは、ビタミンＢ6 を構成する成分の一つである。",
      "イ": "ヨウ素は、インスリンの補酵素として機能する。",
      "ウ": "牛では、肝臓や腎臓でビタミンＥが合成される。",
      "エ": "亜鉛は、様々な酵素の構成成分となっている。",
      "オ": "反芻動物では、ビタミンＡはルーメン微生物によって合成される。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "亜鉛は炭酸脱水酵素などの多くの酵素に含まれる。その亜鉛は酵素の触媒反応やタンパク質の構造維持に関わる。",
    "choiceExplanations": {
      "ア": "コバルトはビタミンＢ₁₂の構成元素であり、ビタミンＢ₆の構成成分ではない。",
      "イ": "ヨウ素は甲状腺ホルモンの原料となる。インスリンの補酵素として働くわけではない。",
      "ウ": "牛はビタミンＥを体内で十分に合成できない。主に飼料に含まれるトコフェロールなどから供給される。",
      "エ": "亜鉛は炭酸脱水酵素などの多くの酵素に含まれる。その亜鉛は酵素の触媒反応やタンパク質の構造維持に関わる。",
      "オ": "牛では飼料由来のβカロテンなどからビタミンＡを得る。ルーメン微生物による合成を通常の主な供給源とはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "maff-chikusan-2022-annual-senmon-q50",
    "exam": "maff-chikusan",
    "year": 2022,
    "season": "annual",
    "session": "senmon",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "家畜生理",
    "topicTags": [
      "消化液・消化酵素・基質"
    ],
    "difficulty": 3,
    "question": "単胃動物の消化酵素と含有される消化液、その酵素によって消化される物質の組合せとして最も妥当なのはどれか。\n（消化酵素） （消化液） （物質）",
    "choices": {
      "ア": "ペプシン 胃液 脂肪",
      "イ": "リパーゼ 膵液 タンパク質",
      "ウ": "アミラーゼ 胃液 脂肪",
      "エ": "トリプシン 膵液 タンパク質",
      "オ": "カルボキシペプチダーゼ 胃液 タンパク質"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "トリプシンは膵臓から前駆体として膵液中に分泌され、小腸で活性化してタンパク質やペプチドの結合を分解する。",
    "choiceExplanations": {
      "ア": "ペプシンは胃液中で働くが、消化する基質は脂肪ではなくタンパク質である。",
      "イ": "膵液のリパーゼは主に脂質を加水分解する。タンパク質の分解にはトリプシンなどが関わる。",
      "ウ": "アミラーゼは主に唾液や膵液に存在し、デンプンなどの炭水化物に作用する。脂肪の分解を担わない。",
      "エ": "トリプシンは膵臓から前駆体として膵液中に分泌され、小腸で活性化してタンパク質やペプチドの結合を分解する。",
      "オ": "カルボキシペプチダーゼはペプチドを末端から分解するが、胃液でなく主に膵液に由来する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-5.pdf",
    "sourceAnswerUrl": "https://www.maff.go.jp/j/joinus/recruit/2tikusan/attach/pdf/zooexam-7.pdf",
    "license": "MAFF-attributed",
    "sourceAttribution": "出典：農林水産省「2022年度 農林水産省畜産系技術職員採用試験 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  }
];
