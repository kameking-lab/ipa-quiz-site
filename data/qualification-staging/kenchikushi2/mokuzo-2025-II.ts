import type { StagedKenchikushiQuestion } from "./types";

export const MOKUZO_2025_II: readonly StagedKenchikushiQuestion[] = [
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q1",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 1,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "法令用語",
    "topicTags": [
      "法令用語"
    ],
    "difficulty": 3,
    "question": "用語に関する次の記述のうち、建築基準法上、誤っているものはどれか。",
    "choices": {
      "ア": "木造平家建て、延べ面積50m²の自動車車庫は、「特殊建築物」である。",
      "イ": "アスファルトは、「耐水材料」である。",
      "ウ": "建築物に設ける合併処理浄化槽は、「建築設備」である。",
      "エ": "建築主事又は建築副主事を置く市町村の区域については、原則として、当該市町村の長が、「特定行政庁」である。",
      "オ": "建築物に関する工事用の現寸図は、「設計図書」である。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。工事用の現寸図は施工用の図で、建築士法等でいう設計図書には含まれない。特殊建築物は用途による定義と確認対象規模を区別する。",
    "choiceExplanations": {
      "ア": "正しい。自動車車庫は特殊建築物に含まれる。50 m²という小規模でも用途による定義から外れるわけではない。",
      "イ": "正しい。アスファルトは水に対する耐性を有する材料として、施行令の耐水材料に含まれる。",
      "ウ": "正しい。合併処理浄化槽は建物に設ける汚物処理設備で、建築設備の定義に該当する。",
      "エ": "正しい。建築主事又は建築副主事を置く市町村では原則市町村長が特定行政庁となる。",
      "オ": "誤り。工事用の現寸図その他の施工図は設計図書の定義から除かれる。施工の具体化に用いる図面と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 10,
    "sourcePrintedPage": "法規 9",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q2",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 2,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "建築面積",
    "topicTags": [
      "建築面積"
    ],
    "difficulty": 3,
    "question": "図のような地下1階、地上1階建ての建築物の建築面積として、建築基準法上、正しいものは、次のうちどれか。ただし、国土交通大臣が高い開放性を有すると認めて指定する構造の部分及び「特例軒等」に該当する部分はないものとする。",
    "choices": {
      "ア": "100.0 m²",
      "イ": "105.0 m²",
      "ウ": "107.5 m²",
      "エ": "110.0 m²",
      "オ": "112.5 m²"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。本体は10×10=100 m²。1.5 m突出する軒は先端から1 m後退した残り0.5 mを算入し、0.5×10=5 m²を加える。地盤上0.5 mの地階部分等は算入せず、計105 m²。",
    "choiceExplanations": {
      "ア": "不正解。本体100 m²だけでなく、軒の出1.5 mのうち先端から1 mを除いた0.5 m分の水平投影面積5 m²も加える。",
      "イ": "正解。本体100 m²に、長さ10 mの東側軒の算入部分0.5 m×10 m=5 m²を加え、105.0 m²となる。",
      "ウ": "不正解。出0.5 mの軒は通常先端から1 m後退の範囲内で算入しない。突出寸法を全て加算する計算ではない。",
      "エ": "不正解。地階は地盤面上に出る高さ0.5 mで1 m以下なので、その張出し部分を建築面積へ加えない。",
      "オ": "不正解。テラスや地階の張出しを一律に本体へ加算しない。軒の所定の算入分のみを加えて105.0 m²。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 10,
    "sourcePrintedPage": "法規 9",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q2.png"
    ],
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "地下1階・地上1階。1階本体10×10 m、左軒0.5 m・右軒1.5 m。1階右下5 m幅部分にテラス奥行2 m、地階平面5×5 mのうち3 mが本体下・2 mがテラス下へ張り出す。地階の地盤上高さ0.5 m、地盤下2.2 m。立面・両平面と数値選択肢全体を保持。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q3",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 3,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "確認変更",
    "topicTags": [
      "確認変更"
    ],
    "difficulty": 3,
    "question": "都市計画区域内(都道府県知事が指定する確認が不要な地域ではないものとする。)における次の記述のうち、建築基準法上、誤っているものはどれか。",
    "choices": {
      "ア": "建築主は、木造2階建て、延べ面積150m²の一戸建て住宅を新築するために確認済証の交付を受けた後に、建築物の高さが減少する場合の建築物の高さの変更(建築物の高さの最低限度が定められている区域内の建築物に係るものを除く。)をしようとする場合、変更後も建築物の計画が建築基準関係規定に適合することが明らかであっても、改めて、確認済証の交付を受けなければならない。",
      "イ": "建築主は、大規模の模様替をするために確認済証の交付を受けた木造2階建て、延べ面積250m²の寄宿舎について、計画の変更(国土交通省令で定める軽微な変更を除く。)をしようとする場合、改めて、確認済証の交付を受けなければならない。",
      "ウ": "工事を施工するために現場に設ける事務所及び材料置場については、確認済証の交付を受ける必要はない。",
      "エ": "建築物を新築する場合、下水道法に基づくその土地の下水を公共下水道に流入させるための排水設備の規定については、建築基準関係規定に該当し、建築主事等又は指定確認検査機関による確認審査等の対象となる。",
      "オ": "建築主は、木造2階建て、延べ面積150m²の一戸建て住宅を新築するために確認済証の交付を受けた後に、敷地面積が減少する場合の敷地面積及び敷地境界線の変更(当該敷地境界線の変更により変更前の敷地の一部が除かれる場合を除く。)をしようとする場合、改めて、確認済証の交付を受けなければならない。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。高さを減らす所定の変更で適合が明らかなら軽微な変更に当たり、改めて確認済証は不要。最低高さ区域の例外等は設問で除かれている。",
    "choiceExplanations": {
      "ア": "誤り。最低高さ区域等を除き、高さを減らして適合が明らかな所定の変更は軽微な変更となり、改めて確認済証を要しない。",
      "イ": "正しい。確認を受けた大規模模様替の計画を軽微でない変更にする場合は、改めて確認を受ける必要がある。",
      "ウ": "正しい。工事現場に設ける事務所・材料置場等には所定の仮設建築物の確認規定の適用除外がある。",
      "エ": "正しい。下水道法の所定の排水設備規定は建築基準関係規定に含まれ、確認審査等の対象となる。",
      "オ": "正しい。敷地面積が減少する所定の変更は、設問の除外条件を踏まえて軽微な変更に該当せず、変更確認が必要。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 11,
    "sourcePrintedPage": "法規 10",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q4",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 4,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "確認対象",
    "topicTags": [
      "確認対象"
    ],
    "difficulty": 3,
    "question": "木造建築物に関する次の行為のうち、建築基準法上、全国どの場所においても、確認済証の交付を受ける必要があるものはどれか。",
    "choices": {
      "ア": "平家建て、延べ面積180m²の飲食店の新築",
      "イ": "平家建て、延べ面積200m²の診療所(患者の収容施設があるもの)の新築",
      "ウ": "平家建て、延べ面積250m²の物品販売業を営む店舗からマーケットへの用途の変更",
      "エ": "2階建て、延べ面積250m²の共同住宅の大規模の修繕",
      "オ": "2階建て、延べ面積300m²の公会堂から集会場への用途の変更"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。改正後の2階建て共同住宅250 m²の大規模修繕は全国で確認が必要。類似用途相互の変更は用途変更確認の例外となる。",
    "choiceExplanations": {
      "ア": "該当しない。平家180 m²の飲食店は全国一律に確認対象となる特殊建築物200 m²超等の条件に達しない。",
      "イ": "該当しない。平家200 m²の診療所は200 m²超ではなく、区域等により確認の要否が変わる。",
      "ウ": "該当しない。物品販売店舗からマーケットは所定の類似用途相互の変更に当たり、用途変更確認の対象外。",
      "エ": "該当する。2階建て共同住宅250 m²は所定の確認対象建築物で、その大規模修繕も全国で確認を要する。",
      "オ": "該当しない。公会堂から集会場は類似用途相互の変更なので、用途変更の確認を要するものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 11,
    "sourcePrintedPage": "法規 10",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q5",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 5,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "共同住宅一般構造",
    "topicTags": [
      "共同住宅一般構造"
    ],
    "difficulty": 3,
    "question": "木造2階建て、各階の居室の床面積の合計がそれぞれ120m²の共同住宅(主要構造部が準耐火構造でなく、かつ、不燃材料で造られていないものとする。)に関する次の記述のうち、建築基準法に適合しないものはどれか。ただし、各階を当該用途に供するものとし、避難階は1階とする。",
    "choices": {
      "ア": "基礎を鉄筋コンクリート造のべた基礎としたので、1階の居室における外壁の床下部分には、壁の長さ5mごとに、面積200cm²の換気孔を設けた。",
      "イ": "便所の天井の高さを、2.0mとした。",
      "ウ": "2階のバルコニーの手すりの高さを、バルコニーの床仕上げ面から1.1mとした。",
      "エ": "直通階段は、2階から1階に通ずるものを1か所設けた。",
      "オ": "高さ1m以下の階段の部分には、手すりを設けなかった。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。木造共同住宅は2階の居室床面積120 m²が所定の100 m²超となるため、原則2以上の直通階段が必要。1か所とする4は不適合。",
    "choiceExplanations": {
      "ア": "適合する。床下をべた基礎コンクリートで覆う場合は通常の床下換気孔規定の例外となり、5 mごと200 cm²でもこの規定に反しない。",
      "イ": "適合する。便所は通常居室ではないため、居室の天井高さ2.1 m以上の制限を受けず、2.0 mとできる。",
      "ウ": "適合する。2階バルコニーの手すりは1.1 m以上を要し、ちょうど1.1 mは下限を満たす。",
      "エ": "適合しない。2階居室面積120 m²は本問の構造で2以上の直通階段が必要となる100 m²超の規模。1か所では不足する。",
      "オ": "適合する。高さ1 m以下の階段部分には手すり設置義務の例外があり、設けなくてもよい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 12,
    "sourcePrintedPage": "法規 11",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q6",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 6,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "住宅換気",
    "topicTags": [
      "住宅換気"
    ],
    "difficulty": 3,
    "question": "木造2階建て、延べ面積150m²の一戸建て住宅(同一敷地内にある用途上不可分な関係にある建築物を含む。)に関する次の記述のうち、建築基準法に適合しないものはどれか。ただし、国土交通大臣の認定は考慮しないものとする。",
    "choices": {
      "ア": "寝室には換気上有効な窓を設け、その換気に有効な部分の面積を、その寝室の床面積の1/20とした。",
      "イ": "居室の換気のための窓の換気に有効な部分の面積の算定に当たっては、ふすまで仕切られた2室の居室を1室とみなした。",
      "ウ": "別棟の物置(延べ面積10m²)の内装の仕上げに、「第三種ホルムアルデヒド発散建築材料」を使用した。",
      "エ": "調理室において、発熱量の合計が5kWの密閉式燃焼器具等に該当しない火を使用する器具のみを設けたので、換気設備を設けなかった。",
      "オ": "浴室(常時開放された開口部はないものとする。)には、密閉式燃焼器具のみを設けたので、換気設備を設けなかった。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。発熱量6 kW以下の換気例外は調理室を除く等の条件がある。150 m²住宅の調理室で5 kWだから不要とはできない。",
    "choiceExplanations": {
      "ア": "適合する。居室の換気に有効な開口面積は床面積の1/20以上。寝室にちょうど1/20を設ければこの要件を満たす。",
      "イ": "適合する。随時開放できるふすま等で区画した2室は、換気上も1室とみなして有効開口面積を算定できる。",
      "ウ": "適合する。同一敷地の所定の10 m²以下の別棟物置は、ホルムアルデヒド発散建材使用制限の例外を適用できる。",
      "エ": "適合しない。発熱量5 kWだけを理由に調理室の換気設備を省略できない。100 m²以下住宅の所定の例外にも当たらない。",
      "オ": "適合する。密閉式燃焼器具のみの室は、その器具を理由とする火気使用室の換気義務の対象から除かれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 12,
    "sourcePrintedPage": "法規 11",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q7",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 7,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "採光計算",
    "topicTags": [
      "採光計算"
    ],
    "difficulty": 3,
    "question": "第一種住居地域内において、川に面して図のような断面を有する住宅の1階の居室の開口部(幅3.0m、面積6.0m²)の「採光に有効な部分の面積」として、建築基準法上、正しいものは、次のうちどれか。ただし、図に記載されていないことについては、考慮しないものとする。",
    "choices": {
      "ア": "0.6m²",
      "イ": "2.4m²",
      "ウ": "3.6m²",
      "エ": "6.6m²",
      "オ": "9.6m²"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。川幅2 mの1/2=1 mを境界外側へ加える。軒先まで水平距離1+0.5=1.5 m、開口中心から軒まで垂直5 m。採光補正係数1.5/5×6−1.4=0.4、有効面積6×0.4=2.4 m²。",
    "choiceExplanations": {
      "ア": "不正解。川幅の半分を有効な水平距離へ加え、開口中心を基準に垂直距離を取る。係数は0.1ではなく0.4。",
      "イ": "正解。水平距離1.5 m、垂直距離5 mから補正係数0.4を求め、開口面積6 m²に乗じて2.4 m²となる。",
      "ウ": "不正解。開口中心から軒までの垂直距離は5 mで、補正係数は0.4。3.6 m²となる係数0.6ではない。",
      "エ": "不正解。川幅全体を境界外側の距離へ加えるのではなく、幅の1/2だけ外側にあるとみなす。",
      "オ": "不正解。軒の水平張出しと開口中心の位置を反映すると係数0.4。開口面積へ1.6を掛ける計算にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 13,
    "sourcePrintedPage": "法規 12",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q7.png"
    ],
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "第一種住居地域の住宅断面。川幅2 m、境界から壁まで1 m、境界から軒先まで0.5 m。1階開口高さ2 m・幅3 m、面積6 m²。開口上端から軒先高さ4 m。開口下端から床0.5 m、床から地盤0.5 m。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q8",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 8,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "平均天井高さ",
    "topicTags": [
      "平均天井高さ"
    ],
    "difficulty": 3,
    "question": "図のような一様に傾斜した勾配天井をもつ居室の天井の高さとして、建築基準法上、正しいものは、次のうちどれか。",
    "choices": {
      "ア": "3.00 m",
      "イ": "3.25 m",
      "ウ": "3.50 m",
      "エ": "3.75 m",
      "オ": "4.00 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。下段床基準の天井平均は(3.5+4)/2=3.75 m。半分の床が0.5 m高いので、平均高さは3.75−0.5×1/2=3.50 m。",
    "choiceExplanations": {
      "ア": "不正解。3.00 mは図の一部の天井高さで、室全体の平均ではない。室容積を床面積で除して求める。",
      "イ": "不正解。床が高い部分は全体の半分。全体の天井平均3.75 mから0.5 mを一律に引くと過小になる。",
      "ウ": "正解。面積40 m²、下段床基準の容積150 m³から高床20 m²×0.5=10 m³を引き、140/40=3.50 m。",
      "エ": "不正解。3.75 mは床上げを無視した天井平均。半分の床が0.5 m高いので、室容積の減少を考慮する。",
      "オ": "不正解。4.00 mは高い側の天井高さ。勾配と床段差を含めて平均すると3.50 mとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 14,
    "sourcePrintedPage": "法規 13",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q8.png"
    ],
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "居室平面8×5 m。左側4 m幅のみ床が0.5 m高い。右側下段床基準の勾配天井は奥行方向に3.5 mから4 mへ上がる。B-B断面では左の高床から天井3 m、右の下段床から3.5 m。選択肢3.00/3.25/3.50/3.75/4.00 mも同じ画像に保持。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q9",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 9,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "木造仕様",
    "topicTags": [
      "木造仕様"
    ],
    "difficulty": 3,
    "question": "木造平家建て、延べ面積120m²の一戸建て住宅の構造耐力上主要な部分に関する次の記述のうち、建築基準法に適合しないものはどれか。ただし、構造計算等による安全性の確認は行わないものとする。また、地盤が軟弱な区域として特定行政庁が国土交通大臣の定める基準に基づいて規則で指定する区域ではないものとする。",
    "choices": {
      "ア": "基礎に使用した木ぐいを、必ずしも常水面下にあるようにしなかった。",
      "イ": "筋かいの両端の端部を柱又ははりその他の横架材と金物で緊結したので、そのいずれか一方の端部を緊結する位置は、当該柱と当該横架材との仕口の部分とした。",
      "ウ": "政令の規定による柱の小径に基づいて算定した柱の所要断面積の1/3を欠き取ったので、その部分を補強した。",
      "エ": "足固めを使用したので、柱の下部に土台を設けなかった。",
      "オ": "圧縮力を負担する筋かいに、厚さ1.5cmで幅9cmの木材を使用した。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。圧縮力を負担する木製筋かいは厚さ3 cm以上・幅9 cm以上が必要。厚1.5 cmは引張筋かいの仕様との混同。",
    "choiceExplanations": {
      "ア": "適合する。木ぐいは原則常水面下だが、平家木造に使用する場合の例外があり、本問では必ずしも常水面下としなくてよい。",
      "イ": "適合する。筋かい端部の一方を柱・横架材の仕口に緊結し、他方を柱又は横架材へ緊結する所定の方法を用いることができる。",
      "ウ": "適合する。所要柱断面積の1/3を欠き取る場合は必要な補強を行う。この選択肢は補強したとしている。",
      "エ": "適合する。平家建てで足固めを使用する場合は、柱下部の土台設置規定の例外に当たる。",
      "オ": "適合しない。圧縮筋かいは厚さ3 cm以上・幅9 cm以上。厚1.5 cmの木材では所定の圧縮用寸法を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 14,
    "sourcePrintedPage": "法規 13",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q10",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 10,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "構造耐久・欠込み",
    "topicTags": [
      "構造耐久・欠込み"
    ],
    "difficulty": 3,
    "question": "木造建築物の構造耐力上主要な部分に関するイ～ニの記述について、建築基準法上、誤っているもののみの組合せは、次のうちどれか。ただし、構造計算等による安全性の確認は行わないものとする。イ.木造2階建て、延べ面積150m²の一戸建て住宅の構造耐力上主要な部分であるはりの中央部附近の下側に、やむを得ず耐力上支障のある欠込みをした場合は、必要な補強をしなければならない。ロ.木造平家建て、延べ面積50m²の倉庫の構造耐力上主要な部分で特に腐食、腐朽又は摩損のおそれのあるものには、腐食、腐朽若しくは摩損しにくい材料又は有効なさび止め、防腐若しくは摩損防止のための措置をした材料を使用しなければならない。ハ.木造平家建て、延べ面積18m²のあずまやの構造耐力上主要な部分である柱のうち、地面から1m以内の部分には有効な防腐措置を講じなければならない。ニ.木造2階建て、延べ面積120m²の一戸建て住宅の屋根ふき材、内装材、外装材、帳壁その他これらに類する建築物の部分は、風圧並びに地震その他の震動及び衝撃によって脱落しないようにしなければならない。",
    "choices": {
      "ア": "イとロ",
      "イ": "イとハ",
      "ウ": "イとニ",
      "エ": "ロとハ",
      "オ": "ハとニ"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。イは梁中央下側の有害な欠込みの禁止を補強で置き換えている。ハはあずまや等の木造仕様規定の適用除外を見落としている。誤りはイとハ。",
    "choiceExplanations": {
      "ア": "不正解。イは誤りだがロは正しい。特に腐朽等のおそれがある主要構造部分は、規模だけで除外せず材料・保護措置を要する。",
      "イ": "正解。イの耐力上有害な梁の欠込みは禁止。ハのあずまやは所定の木造仕様規定の適用除外で、一律の防腐義務とはならない。",
      "ウ": "不正解。イは誤りだがニは正しい。屋根材・外装材等は風や地震等で脱落しないようにする必要がある。",
      "エ": "不正解。ハは誤りだがロは正しい。小規模倉庫でも腐食・腐朽等のおそれがある部材へ所定の措置を講じる。",
      "オ": "不正解。ハは誤りだがニは正しい。構造材以外の仕上げ等の部分にも脱落防止の安全性が求められる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 15,
    "sourcePrintedPage": "法規 14",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q11",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 11,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "防火性能",
    "topicTags": [
      "防火性能"
    ],
    "difficulty": 3,
    "question": "建築物の防火性能等に関する次の記述のうち、建築基準法上、誤っているものはどれか。ただし、防火地域及び準防火地域の指定はないものとする。また、天井は強化天井ではなく、界壁及び間仕切壁は自動スプリンクラー設備等設置部分その他防火上支障がないものとして国土交通大臣が定める部分には該当しないものとする。",
    "choices": {
      "ア": "木造2階建て、延べ面積180m²の診療所(患者の収容施設を有しないものを除く。)を新築する場合、当該用途に供する部分については、その防火上主要な間仕切壁を防火構造とし、小屋裏又は天井裏に達せしめなければならない。",
      "イ": "平家建て、延べ面積140m²の自動車車庫を新築する場合、耐火建築物又は準耐火建築物としなくてもよい。",
      "ウ": "建築物が建築基準法第22条第1項の市街地の区域の内外にわたる場合においては、その全部について同項の市街地の区域内の建築物に関する規定が適用される。",
      "エ": "建築基準法第22条第1項の市街地の区域内に延べ面積8m²の木造の物置を新築する場合、延焼のおそれのある部分の外壁は、準防火性能に関して政令で定める技術的基準に適合する所定の構造としなければならない。",
      "オ": "木造平家建て、延べ面積140m²の長屋を新築する場合、各戸の界壁は、準耐火構造とし、小屋裏又は天井裏に達せしめなければならない。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。患者収容施設のある診療所の防火上主要な間仕切壁は、原則準耐火構造とする。防火構造だけとする1が誤り。",
    "choiceExplanations": {
      "ア": "誤り。病院・有床診療所等の防火上主要な間仕切壁は原則準耐火構造とし、小屋裏等まで達せしめる。防火構造では不足。",
      "イ": "正しい。平家140 m²の自動車車庫は、耐火・準耐火建築物とする法第27条等の該当規模に達しない。",
      "ウ": "正しい。建物が法第22条区域の内外をまたぐ場合は、建物全部へ区域内の規定を適用する。",
      "エ": "正しい。独立の木造物置も法第22条区域の外壁規定の対象となり、延焼のおそれのある部分は所定の準防火性能を満たす。",
      "オ": "正しい。長屋の界壁は原則準耐火構造として小屋裏等まで達せしめる。本問では所定の天井等の例外を除いている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 16,
    "sourcePrintedPage": "法規 15",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q12",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 12,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "内装制限",
    "topicTags": [
      "内装制限"
    ],
    "difficulty": 3,
    "question": "建築基準法第35条の2の規定による内装の制限に関する次の記述のうち、誤っているものはどれか。ただし、建築物は、建築基準法第2条第九号の三イ又はロのいずれにも該当しないものとし、主要構造部は、耐火構造でなく、居室は、内装の制限を受ける「窓その他の開口部を有しない居室」及び「内装の制限を受ける調理室等」はないものとする。また、火災が発生した場合に避難上支障のある高さまで煙又はガスの降下が生じない建築物の部分として、国土交通大臣が定めるものはないものとする。",
    "choices": {
      "ア": "客席の床面積の合計が120m²の集会場の当該用途に供する居室から地上に通ずる廊下は、その壁の室内に面する部分の仕上げを準不燃材料とすることができる。",
      "イ": "木造2階建て、延べ面積230m²の患者の収容施設を有しない診療所は、内装の制限を受けない。",
      "ウ": "内装の制限を受ける居室の天井の回り縁は、内装の制限の対象とはならない。",
      "エ": "木造平家建て、延べ面積180m²の物品販売業を営む店舗は、内装の制限を受ける。",
      "オ": "自動車車庫は、その構造及び規模にかかわらず、内装の制限を受ける。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。木造平家180 m²の物販店舗は、所定の200 m²超という内装制限の規模に達しない。無窓・火気室等の条件も設問で除かれる。",
    "choiceExplanations": {
      "ア": "正しい。制限対象居室から地上へ通じる主たる避難廊下は、壁・天井の仕上げを原則準不燃材料とする。",
      "イ": "正しい。患者収容施設のない診療所230 m²は、所定の無窓・火気等を除いた本問では内装制限の対象外。",
      "ウ": "正しい。回り縁等の部分は内装制限の仕上げ対象から除かれる。壁・天井の一般部分と区別する。",
      "エ": "誤り。平家の物販店舗180 m²は200 m²超の所定規模に達せず、他の対象条件もないため内装制限を受けない。",
      "オ": "正しい。自動車車庫は構造・規模にかかわらず内装制限の対象として扱う用途である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 16,
    "sourcePrintedPage": "法規 15",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "sourceRubies": [
      {
        "base": "縁",
        "reading": "ぶち"
      }
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q13",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 13,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "2項道路後退",
    "topicTags": [
      "2項道路後退"
    ],
    "difficulty": 3,
    "question": "都市計画区域内にある、図のような斜線部分の土地に関する次の記述のうち、建築基準法上、誤っているものはどれか。ただし、特定行政庁による道路幅員に関する区域の指定はないものとし、図に示す範囲に高低差はないものとする。",
    "choices": {
      "ア": "敷地面積に算入することができない。",
      "イ": "建築物に附属する門や塀を設けることができない。",
      "ウ": "軒やひさし部分の一部であっても突き出すことはできない。",
      "エ": "敷地を造成するための擁壁を築造することができる。",
      "オ": "砂利敷にすることができる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。斜線部分は2項道路の後退部分で道路とみなす土地。擁壁を造成のため自由に設けることはできない。",
    "choiceExplanations": {
      "ア": "正しい。道路とみなす後退部分は建築敷地面積へ算入せず、建蔽率等は後退後の面積で算定する。",
      "イ": "正しい。建物附属の門や塀も道路内建築制限の対象となり、後退部分へ設けることはできない。",
      "ウ": "正しい。軒・ひさしも建物の一部なので、後退部分の道路内へ突き出すことはできない。",
      "エ": "誤り。造成用擁壁を築いて後退部分の道路機能を妨げることはできず、築造できるという記述は不適当。",
      "オ": "正しい。砂利敷は建築物や道路を塞ぐ工作物とは異なり、道路としての機能を妨げない範囲で行える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 17,
    "sourcePrintedPage": "法規 16",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q13.png"
    ],
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "建物敷地の南側に幅2 mの2項道路。道の中心線から北側へ2 mの線が後退境界。現在敷地南端とこの線の間の帯状部分が斜線。南側は宅地、北東西は隣地。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q14",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 14,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "低層用途制限",
    "topicTags": [
      "低層用途制限"
    ],
    "difficulty": 3,
    "question": "次の建築物のうち、第二種低層住居専用地域内において、建築基準法上、新築してはならないものはどれか。ただし、特定行政庁の許可は受けないものとし、用途地域以外の地域、地区等は考慮しないものとする。",
    "choices": {
      "ア": "平家建て、延べ面積50m²の近隣に居住する者の利用に供する公園に設けられる休憩所",
      "イ": "平家建て、延べ面積120m²の工芸品を製作するための工房で、原動機の出力の合計が0.75kWのもの",
      "ウ": "2階建て、延べ面積180m²のクリーニング取次店兼用住宅で、クリーニング取次店の部分の床面積が50m²のもの",
      "エ": "2階建て、延べ面積270m²の共同住宅に附属する平家建ての自動車車庫で、床面積が80m²のもの",
      "オ": "2階建て、延べ面積550m²の地方公共団体の支所"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。独立した工芸品製作工房120 m²は第二種低層住居専用地域に許容される用途ではない。兼用住宅の小規模作業場等と区別する。",
    "choiceExplanations": {
      "ア": "新築できる。近隣住民が利用する公園内の平家50 m²の休憩所は、所定の公益的施設として認められる。",
      "イ": "新築できない。独立した120 m²の工芸品工房は、第二種低層住居専用地域で認める用途・規模の範囲外。",
      "ウ": "新築できる。住宅部分が過半で取次店部分50 m²の兼用住宅は、所定の小規模兼用住宅の条件を満たす。",
      "エ": "新築できる。共同住宅に附属する所定の車庫で平家80 m²は、附属車庫の面積等の範囲内に収まる。",
      "オ": "新築できる。地方公共団体の支所は所定の公益上必要な建築物として、この地域でも認められる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 17,
    "sourcePrintedPage": "法規 16",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q15",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 15,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "用途地域",
    "topicTags": [
      "用途地域"
    ],
    "difficulty": 3,
    "question": "用途地域内の建築物の制限に関する次の記述のうち、建築基準法上、誤っているものはどれか。ただし、特定行政庁の許可は受けないものとし、用途地域以外の地域、地区等は考慮しないものとする。",
    "choices": {
      "ア": "第一種中高層住居専用地域内においては、2階建て、延べ面積210m²の宅地建物取引業を営む店舗を新築することができる。",
      "イ": "第一種住居地域内においては、2階建て、延べ面積300m²の旅館を新築することができる。",
      "ウ": "準住居地域内においては、2階建て、延べ面積300m²の劇場(客席の部分の床面積の合計が200m²)を新築することができる。",
      "エ": "商業地域内においては、平家建て、延べ面積130m²の料理店を新築することができる。",
      "オ": "工業地域内においては、2階建て、延べ面積270m²の共同住宅を新築することができる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。準住居地域で劇場等は客席200 m²未満等の条件がある。ちょうど200 m²の劇場は許容範囲外。",
    "choiceExplanations": {
      "ア": "正しい。所定の宅地建物取引業店舗は第一種中高層住居専用地域でも認められ、2階210 m²は該当範囲内。",
      "イ": "正しい。第一種住居地域で旅館は所定の3,000 m²以下等の規模なら建築でき、300 m²は範囲内。",
      "ウ": "誤り。準住居地域の劇場は客席200 m²未満等の条件。客席がちょうど200 m²では新築できない。",
      "エ": "正しい。商業地域では料理店を建築でき、提示された平家130 m²の条件に禁止理由はない。",
      "オ": "正しい。工業地域では共同住宅を建築できる。住宅を原則認めない工業専用地域と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 18,
    "sourcePrintedPage": "法規 17",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q16",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 16,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "建蔽率",
    "topicTags": [
      "建蔽率"
    ],
    "difficulty": 3,
    "question": "図のような敷地において、建築基準法上、新築することができる木造住宅(「耐火建築物等」又は「準耐火建築物等」ではない)の建築面積の最高限度は、次のうちどれか。ただし、図に記載されているものを除き、地域、地区等及び特定行政庁の指定・許可等はないものとし、図に示す範囲に高低差はないものとする。",
    "choices": {
      "ア": "104.0m²",
      "イ": "118.5m²",
      "ウ": "123.0m²",
      "エ": "127.0m²",
      "オ": "133.0m²"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。西側幅3 mの2項道路で敷地側へ0.5 m後退。近隣商業部分は(9−0.5)×10=85 m²、住居部分60 m²。木造なので準防火の構造加算はなく、角地加算で0.9と0.7。85×0.9+60×0.7=118.5 m²。",
    "choiceExplanations": {
      "ア": "不正解。角地指定による各地域1/10加算を考慮しない値に相当する。指定角地なので後退後面積へ0.9と0.7を適用する。",
      "イ": "正解。西側の後退0.5 mを近隣商業部分から除き、85×0.9+60×0.7=76.5+42=118.5 m²となる。",
      "ウ": "不正解。現況幅9 mの近隣商業部分をそのまま使うと過大。2項道路の後退0.5 mを除く必要がある。",
      "エ": "不正解。準防火地域でも本問の建物は耐火・準耐火建築物等ではないため、防火性能による建蔽率加算は適用しない。",
      "オ": "不正解。道路後退を除外し、構造による不適用の加算は行わない。角地加算のみで118.5 m²を求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 18,
    "sourcePrintedPage": "法規 17",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q16.png"
    ],
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "南側道路幅6 m、西側2項道路幅3 mで反対側は宅地。敷地奥行10 m、現況幅15 m。西9 mが近隣商業・準防火・指定建蔽率8/10で角地指定あり。東6 mが第二種住居・指定6/10。北東は隣地。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q17",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 17,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "容積率",
    "topicTags": [
      "容積率"
    ],
    "difficulty": 3,
    "question": "図のような敷地において、建築基準法上、新築することができる建築物の延べ面積(同法第52条第1項に規定する容積率の算定の基礎となる延べ面積)の最高限度は、次のうちどれか。ただし、特定道路の影響はないものとする。また、図に記載されているものを除き、地域、地区等及び特定行政庁の指定・許可等はないものとし、図に示す範囲に高低差はないものとする。",
    "choices": {
      "ア": "112m²",
      "イ": "219m²",
      "ウ": "224m²",
      "エ": "255m²",
      "オ": "260m²"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。幅2 mの2項道路を4 mとみなし敷地側1 m後退。中高層側面積90 m²、道路容積率4×0.4=1.6。低層側50 m²は指定1.5のほうが厳しい。90×1.6+50×1.5=219 m²。",
    "choiceExplanations": {
      "ア": "不正解。各地域の後退後面積へそれぞれの容積率限度を適用して合算する。112 m²では両部分の合計にならない。",
      "イ": "正解。第一種中高層部分90 m²に1.6、第二種低層部分50 m²に1.5を掛け、144+75=219 m²となる。",
      "ウ": "不正解。低層部分は指定容積率1.5が道路幅による1.6より厳しい。全体140 m²へ一律1.6を掛けない。",
      "エ": "不正解。指定率だけでなく道路幅による1.6の制限が中高層部分に適用されるため、255 m²は過大。",
      "オ": "不正解。2項道路の後退分を敷地面積から除き、地域ごとに道路幅と指定率を比較する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 19,
    "sourcePrintedPage": "法規 18",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q17.png"
    ],
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "北側幅2 mの2項道路、対向側は宅地。敷地幅10 m・奥行15 m。北側10 mは第一種中高層住居専用地域・指定容積率20/10、南側5 mは第二種低層住居専用地域・指定15/10。西東南は隣地。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q18",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 18,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "高さ制限",
    "topicTags": [
      "高さ制限"
    ],
    "difficulty": 3,
    "question": "図のような敷地において、建築物を新築する場合、建築基準法上、A点における地盤面からの建築物の高さの最高限度は、次のうちどれか。ただし、敷地は平坦で、敷地及び隣地の相互間に高低差はなく、道路の路面の中心の高さは敷地の地盤面より0.5m低い位置にあるものとし、図に記載されているものを除き、地域、地区等及び特定行政庁の指定・許可等はないものとする。また、日影による中高層の建築物の高さの制限及び天空率は考慮しないものとする。",
    "choices": {
      "ア": "2×1.25+5 ／ 7.50 m",
      "イ": "(6+1)×1.25−0.5 ／ 8.25 m",
      "ウ": "(2+1)×1.25+5 ／ 8.75 m",
      "エ": "(1+6+1)×1.25−0.5 ／ 9.50 m",
      "オ": "(1+6+1)×1.25 ／ 10.00 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。A点は北境界から2+1=3 mで、北側高さ制限は5+3×1.25=8.75 m。道路制限は(1+6+1)×1.25−0.5=9.50 mなので北側の8.75 mが最高限度。",
    "choiceExplanations": {
      "ア": "不正解。北側高さ制限の距離は建物北辺の2 mではなく、A点までの2+1=3 mを用いる。",
      "イ": "不正解。道路制限には敷地側最小後退1 mを反対側にも加える。さらに本問は北側制限8.75 mとの比較が必要。",
      "ウ": "正解。A点の真北方向の境界距離3 mから5+3×1.25=8.75 m。道路制限9.50 mより低いのでこれが支配する。",
      "エ": "不正解。道路制限9.50 mの式自体は妥当だが、北側制限8.75 mのほうが厳しく、両方を満たす必要がある。",
      "オ": "不正解。道路面が地盤面より0.5 m低い分を反映し、北側制限とも比較する。最高限度は8.75 m。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 20,
    "sourcePrintedPage": "法規 19",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q18.png"
    ],
    "originalContent": {
      "body": "図のような敷地において、建築物を新築する場合、建築基準法上、A点における地盤面からの建築物の高さの最高限度は、次のうちどれか。ただし、敷地は平坦で、敷地及び隣地の相互間に高低差はなく、道路の路面の中心の高さは敷地の地盤面より0.5m低い位置にあるものとし、図に記載されているものを除き、地域、地区等及び特定行政庁の指定・許可等はないものとする。また、日影による中高層の建築物の高さの制限及び天空率は考慮しないものとする。",
      "tables": [
        {
          "caption": "計算式と高さの最高限度（選択肢1～5の順）",
          "rows": [
            [
              "計算式",
              "高さの最高限度"
            ],
            [
              "2×1.25+5",
              "7.50 m"
            ],
            [
              "(6+1)×1.25−0.5",
              "8.25 m"
            ],
            [
              "(2+1)×1.25+5",
              "8.75 m"
            ],
            [
              "(1+6+1)×1.25−0.5",
              "9.50 m"
            ],
            [
              "(1+6+1)×1.25",
              "10.00 m"
            ]
          ]
        }
      ]
    },
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "第二種低層住居専用地域・指定容積率20/10。西道路幅6 m、道路中心は地盤より0.5 m低い。敷地幅11 m（1+9+1）、奥行13 m（2+8+3）。建物西・東後退各1 m、北後退2 m。Aは北辺より南へ1 mで北境界まで3 m。真北は図上。門塀なし。計算式表は構造化データも保持。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q19",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 19,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "防火地域",
    "topicTags": [
      "防火地域"
    ],
    "difficulty": 3,
    "question": "防火地域又は準防火地域に関する次の記述のうち、建築基準法上、誤っているものはどれか。",
    "choices": {
      "ア": "準防火地域内において、外壁が準耐火構造の建築物は、その外壁を隣地境界線に接して設けることができる。",
      "イ": "建築物の敷地が「準防火地域」と「防火地域又は準防火地域として指定されていない区域」にわたる場合において、「防火地域又は準防火地域として指定されていない区域」内のみにある建築物については、準防火地域内の建築物に関する規定は適用されない。",
      "ウ": "防火地域内において、2階建て、延べ面積110m²の一戸建て住宅を新築する場合、耐火建築物又はこれと同等以上の延焼防止時間となる建築物としなければならない。",
      "エ": "防火地域内において、建築物に附属する高さ2mの塀は、延焼防止上支障のない構造としなくてもよい。",
      "オ": "防火地域内において、高さ2.2mの看板で建築物の屋上に設けるものは、その主要な部分を不燃材料で造り、又は覆わなければならない。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。隣地境界へ接して外壁を設けられる特例は外壁が耐火構造の場合。準耐火構造でよいとする1は誤り。",
    "choiceExplanations": {
      "ア": "誤り。防火・準防火地域で境界へ接して設ける特例は外壁が耐火構造の場合。準耐火構造だけではこの特例に該当しない。",
      "イ": "正しい。敷地だけが準防火区域をまたいでも、建物自体が区域外だけにあるなら区域内建物の規定は適用されない。",
      "ウ": "正しい。防火地域内の2階110 m²は100 m²超で、所定の耐火建築物等とする必要がある。",
      "エ": "正しい。塀の延焼防止構造の規定は高さ2 mを超える附属塀が対象。ちょうど2 mはこの高さ条件を外れる。",
      "オ": "正しい。屋上の高さ2.2 mの看板は所定の対象となり、主要部分を不燃材料で造るか覆う必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 21,
    "sourcePrintedPage": "法規 20",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q20",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 20,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "建築基準法制度",
    "topicTags": [
      "建築基準法制度"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、建築基準法上、誤っているものはどれか。",
    "choices": {
      "ア": "一団地内に建築される1又は2以上の構えを成す建築物のうち、特定行政庁がその位置及び構造が安全上、防火上及び衛生上支障がないと認めるものに対する敷地等と道路との関係の規定の適用については、当該一団地を当該1又は2以上の建築物の一の敷地とみなす。",
      "イ": "市町村が、地区整備計画等が定められている地区計画等の区域内において、建築物の敷地、構造、建築設備又は用途に関する事項で当該地区計画等の内容として定められたものを、これらに関する制限として定めた条例は、建築基準関係規定である。",
      "ウ": "災害があった場合において公益上必要な用途に供する応急仮設建築物を建築した者は、その建築工事を完了した後1年を超えて当該建築物を存続しようとする場合においては、その超えることとなる日前に、特定行政庁の許可を受けなければならない。",
      "エ": "確認済証の交付を受けた後でなければすることができない建築物の新築の工事を、確認済証の交付を受けないでした工事施工者は、1年以下の懲役又は100万円以下の罰金に処せられる。",
      "オ": "道路に2m以上接していない都市計画区域内の敷地において、その敷地が幅員4m以上の道に2m以上接する建築物のうち、利用者が少数であるものとして、特定行政庁が交通上、安全上、防火上及び衛生上支障がないと認めたものについては、建築することができる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。災害時の所定の応急仮設建築物は、完了後3か月を超えて存続させる場合に事前の許可が必要。1年という3が誤り。",
    "choiceExplanations": {
      "ア": "正しい。一団地認定の所定の建物は、接道等の規定について一団地を一つの敷地とみなす特例がある。",
      "イ": "正しい。地区計画等に基づいて法第68条の2等により定める条例の所定の制限は、建築基準関係規定に含まれる。",
      "ウ": "誤り。公益上必要な応急仮設建物でも工事完了後3か月を超えて存続させる場合は、その前に特定行政庁の許可が必要。",
      "エ": "正しい。本問の2025年1月の基準では、無確認着工の施工者の罰則は1年以下の懲役又は100万円以下の罰金。後の拘禁刑への変更を混入しない。",
      "オ": "正しい。所定の道へ2 m以上接し少数利用等の条件を満たす建物は、特定行政庁の認定による接道義務の例外を受けられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 21,
    "sourcePrintedPage": "法規 20",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC0000000201_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/325AC0000000201_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20241101_506CO0000000312",
      "https://laws.e-gov.go.jp/law/325CO0000000338_20250401_506CO0000000172"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q21",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 21,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "木造建築士業務",
    "topicTags": [
      "木造建築士業務"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、建築士法上、誤っているものはどれか。",
    "choices": {
      "ア": "木造建築士は、木造2階建て、高さ16m、延べ面積300m²の店舗の新築の設計及び工事監理をすることができる。",
      "イ": "建築士事務所に継続して所属する木造建築士は、直近の木造建築士定期講習を受けた日の属する年度の翌年度の開始の日から起算して3年以内に、木造建築士定期講習を受けなければならない。",
      "ウ": "木造建築士は、工事監理を終了したときは、直ちに、国土交通省令で定めるところにより、その結果を文書で建築主に報告しなければならない。",
      "エ": "木造建築士は、都道府県の区域を異にして住所を変更したときは、その旨を、免許を受けた都道府県知事、変更前の住所地の都道府県知事及び変更後の住所地の都道府県知事に届け出なければならない。",
      "オ": "木造建築士は、建築物の構造によらず、建築物の建築に関する法令又は条例の規定に基づく手続の代理を行うことができる。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。木造建築士のその他業務は木造建築物に関するものに限られる。法令等の手続代理を構造によらず行えるという5が誤り。",
    "choiceExplanations": {
      "ア": "正しい。表紙指定の改正後基準では、木造2階・高さ16 m・延べ300 m²の店舗は木造建築士の業務範囲に含まれる。",
      "イ": "正しい。継続所属する建築士は、直近受講年度の翌年度開始から3年以内に所定の定期講習を受ける。",
      "ウ": "正しい。工事監理を終えたときは直ちに所定の結果を文書で建築主へ報告する。建築主事への報告ではない。",
      "エ": "正しい。都道府県を異にする住所変更では、免許知事と変更前後の住所地知事へ所定の届出を行う。",
      "オ": "誤り。手続代理を含むその他業務は木造建築士の場合、木造建築物に関するものに限る。構造を問わずとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 22,
    "sourcePrintedPage": "法規 21",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC1000000202_20240401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325AC1000000202_20250401_504AC0000000069"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q22",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 22,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "建築士事務所",
    "topicTags": [
      "建築士事務所"
    ],
    "difficulty": 3,
    "question": "木造建築士事務所に関する次の記述のうち、建築士法上、正しいものはどれか。",
    "choices": {
      "ア": "木造建築士事務所の開設者は、工事監理受託契約を締結したときは、書面の交付に代えて、委託者の承諾を得て、当該書面に記載すべき事項を電子情報処理組織を使用する方法等により提供することができる。",
      "イ": "木造建築士事務所に属する建築士が当該木造建築士事務所の業務として作成した設計図書又は工事監理報告書で、木造建築士事務所の開設者が保存しなければならないものの保存期間は、当該図書を作成した日から起算して10年間である。",
      "ウ": "木造建築士事務所の開設者は、設計受託契約を建築主と締結しようとするときは、あらかじめ、当該建築主に対し、当該建築士事務所に属する木造建築士に設計受託契約の内容及びその履行に関する事項について、口頭での説明をさせることにより、書面の交付を省略することができる。",
      "エ": "木造建築士は、他人の求めに応じ報酬を得て、建築物に関する調査又は鑑定の業務のみを業として行おうとする場合であれば、木造建築士事務所の登録を受けなくてもよい。",
      "オ": "木造建築士は、2か所に限り、開設者の異なる木造建築士事務所の管理建築士を兼ねることができる。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。契約後書面の交付は、委託者の承諾を得て所定の電磁的方法で提供できる。保存15年、重要事項書面、事務所登録、専任管理の条件を区別する。",
    "choiceExplanations": {
      "ア": "正しい。監理受託契約後の書面は、委託者の承諾を得れば所定の電磁的方法による提供に代えることができる。",
      "イ": "誤り。保存すべき設計図書・工事監理報告書等の保存期間は作成日から15年間。10年間ではない。",
      "ウ": "誤り。契約前の重要事項説明は所定の書面を交付して行う。口頭説明だけで書面を省略することはできない。",
      "エ": "誤り。調査又は鑑定だけを他人の求めで報酬を得て業として行う場合も、建築士事務所登録が必要となる。",
      "オ": "誤り。管理建築士は事務所へ専任で置くため、別開設者の2事務所を兼ねるという扱いは認められない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 22,
    "sourcePrintedPage": "法規 21",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325AC1000000202_20240401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/325AC1000000202_20250401_504AC0000000069"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q23",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 23,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "都市計画施設",
    "topicTags": [
      "都市計画施設"
    ],
    "difficulty": 3,
    "question": "都市計画施設の区域内における次の行為のうち、都市計画法上、都道府県知事等の許可を受けなければならないものはどれか。ただし、いずれの建築物も地階を有さないものとする。",
    "choices": {
      "ア": "木造平家建ての住宅の新築",
      "イ": "木造平家建ての店舗の改築",
      "ウ": "木造平家建ての診療所の移転",
      "エ": "木造2階建ての住宅の大規模の修繕",
      "オ": "木造2階建ての保育所の大規模の模様替"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。都市計画施設区域内の建築物の建築は原則許可を要する。小規模木造でも新築は対象で、所定の改築・移転等の例外と区別する。",
    "choiceExplanations": {
      "ア": "許可が必要。住宅の新築は区域内の建築行為として原則許可対象。木造平家なら許可基準に適合しやすいことと、許可不要とは別。",
      "イ": "許可不要。地階がなく木造2階以下等の所定の条件に合う改築は、軽易な行為として許可対象から除かれる。",
      "ウ": "許可不要。地階のない木造平家の移転は、所定の軽易な建築行為の例外に該当する。",
      "エ": "許可不要。大規模修繕は都市計画法第53条の建築許可対象となる建築行為ではない。",
      "オ": "許可不要。大規模模様替は都市計画法第53条の建築許可の対象に当たらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 23,
    "sourcePrintedPage": "法規 22",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/343AC0000000100"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q24",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 24,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "法の目的",
    "topicTags": [
      "法の目的"
    ],
    "difficulty": 3,
    "question": "法律とその目的に含まれる事項との組合せとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "建築物の耐震改修の促進に関する法律／建築物の地震に対する安全性の向上",
      "イ": "宅地造成及び特定盛土等規制法／宅地造成、特定盛土等又は土石の堆積に伴う崖崩れ又は土砂の流出による災害の防止のため必要な規制",
      "ウ": "建築物のエネルギー消費性能の向上等に関する法律／建築物のエネルギー消費性能の向上",
      "エ": "長期優良住宅の普及の促進に関する法律／長期優良住宅建築等計画に基づき建築及び維持保全が行われている住宅についての住宅性能評価に関する措置",
      "オ": "文化財保護法／美しく風格のある国土の形成、豊かな生活環境の創造"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。美しく風格のある国土の形成、豊かな生活環境の創造は景観法の目的に対応する。文化財保護法との組合せが誤り。",
    "choiceExplanations": {
      "ア": "適当。耐震改修促進法は建物の地震に対する安全性の向上を図るため、耐震改修等を促進する法律。",
      "イ": "適当。盛土規制法は造成・盛土等・土石堆積による崖崩れや土砂流出災害を防ぐため、必要な規制を行う。",
      "ウ": "適当。建築物省エネ法は建物のエネルギー消費性能の向上等を図ることを目的に含む。",
      "エ": "適当。長期優良住宅法には認定計画による建築・維持保全のほか、所定の住宅性能評価に関する措置も定められる。",
      "オ": "不適当。示された目的は景観法に対応する。文化財保護法は文化財の保存・活用を通じ文化向上等に寄与する法律。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 23,
    "sourcePrintedPage": "法規 22",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-II-q24.png"
    ],
    "originalContent": {
      "body": "法律とその目的に含まれる事項との組合せとして、最も不適当なものは、次のうちどれか。",
      "tables": [
        {
          "caption": "法律と目的（選択肢1～5の順）",
          "rows": [
            [
              "法律",
              "目的に含まれる事項"
            ],
            [
              "建築物の耐震改修の促進に関する法律",
              "建築物の地震に対する安全性の向上"
            ],
            [
              "宅地造成及び特定盛土等規制法",
              "宅地造成、特定盛土等又は土石の堆積に伴う崖崩れ又は土砂の流出による災害の防止のため必要な規制"
            ],
            [
              "建築物のエネルギー消費性能の向上等に関する法律",
              "建築物のエネルギー消費性能の向上"
            ],
            [
              "長期優良住宅の普及の促進に関する法律",
              "長期優良住宅建築等計画に基づき建築及び維持保全が行われている住宅についての住宅性能評価に関する措置"
            ],
            [
              "文化財保護法",
              "美しく風格のある国土の形成、豊かな生活環境の創造"
            ]
          ]
        }
      ]
    },
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "imageAltTexts": [
      "法律と目的の組合せ5行。耐震改修促進法／地震安全性、盛土規制法／造成等の災害防止、省エネ法／消費性能向上、長期優良住宅法／認定住宅の性能評価措置、文化財保護法／美しく風格のある国土・豊かな生活環境。全セルは構造化表にも保持。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/427AC0000000053_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/427AC0000000053_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/418AC0000000091_20241101_506AC0000000053"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-II-q25",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-II",
    "year": 2025,
    "season": "annual",
    "qNumber": 25,
    "subject": "学科Ⅱ（建築法規）",
    "type": "multiple-choice",
    "category": "関連法令",
    "topicTags": [
      "関連法令"
    ],
    "difficulty": 3,
    "question": "次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "「高齢者、障害者等の移動等の円滑化の促進に関する法律」上、建築主等は、共同住宅の建築をしようとするときは、当該共同住宅を建築物移動等円滑化基準に適合させるために必要な措置を講ずるよう努めなければならない。",
      "イ": "「労働安全衛生法」上、建設工事の注文者等仕事を他人に請け負わせる者は、施工方法、工期等について、安全で衛生的な作業の遂行をそこなうおそれのある条件を附さないように配慮しなければならない。",
      "ウ": "「建築物のエネルギー消費性能の向上等に関する法律」上、建築主は、建築物の新築(エネルギー消費性能に及ぼす影響が少ないものとして政令で定める規模以下のものを除く。)をしようとするときは、当該建築物を建築物エネルギー消費性能基準に適合させなければならない。",
      "エ": "「消防法」上、住宅の用途に供される防火対象物の関係者は、原則として、建築基準法に定める基準に従い、住宅用防災警報器又は住宅用防災報知設備を設置し、及び維持しなければならない。",
      "オ": "「廃棄物の処理及び清掃に関する法律」上、事業者は、その事業活動に伴って生じた廃棄物を自らの責任において適正に処理しなければならない。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。住宅用防災警報器等は消防法と市町村条例の基準に従う。建築基準法に定める基準という4が誤り。",
    "choiceExplanations": {
      "ア": "正しい。共同住宅は所定の特定建築物であり、建築主等には移動等円滑化基準に適合させる措置の努力義務がある。",
      "イ": "正しい。注文者等は、安全・衛生を損なう施工方法や工期等の条件を付けないよう配慮する必要がある。",
      "ウ": "正しい。表紙が指定する2025年4月施行規定により、所定の除外を除く新築は原則省エネ基準適合義務の対象となる。",
      "エ": "誤り。住宅用防災機器は消防法の定め及びこれに基づく市町村条例等に従って設置・維持する。建築基準法の基準ではない。",
      "オ": "正しい。事業者は事業活動で生じた廃棄物を自らの責任で適正に処理する義務がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅱ（建築法規）",
    "sourcePage": 23,
    "sourcePrintedPage": "法規 22",
    "questionNotice": "適用法令は原則2025年1月1日施行。表紙指定の令和4年法律第69号、令和6年政令第172号及び令和6年国土交通省令第68号に基づく規定は2025年4月1日施行時点を適用。",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/427AC0000000053_20241101_506AC0000000053",
      "https://laws.e-gov.go.jp/law/427AC0000000053_20250401_504AC0000000069",
      "https://laws.e-gov.go.jp/law/418AC0000000091_20241101_506AC0000000053"
    ]
  }
];
