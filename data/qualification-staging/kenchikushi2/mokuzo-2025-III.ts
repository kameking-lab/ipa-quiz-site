import type { StagedKenchikushiQuestion } from "./types";

export const MOKUZO_2025_III: readonly StagedKenchikushiQuestion[] = [
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q1",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 1,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "荷重・外力",
    "topicTags": [
      "荷重・外力"
    ],
    "difficulty": 3,
    "question": "木造建築物に作用する荷重及び外力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "多雪区域における長期に生ずる力とは、固定荷重、積載荷重及び積雪荷重によって生ずる力の総和である。",
      "イ": "住宅の居室における床の積載荷重は、一般に、「大梁、柱又は基礎の構造計算をする場合」より「床の構造計算をする場合」のほうが大きい。",
      "ウ": "暴風時における短期に生ずる力は、一般に、固定荷重、積載荷重及び風圧力によって生ずる力の総和である。",
      "エ": "積雪荷重は、屋根面の積雪量が不均等になるおそれのある場合、その影響を考慮する。",
      "オ": "壁の仕上げの固定荷重は、一般に、「鉄網モルタル塗」より「木ずりしっくい塗」のほうが大きい。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。仕上げの固定荷重は一般に鉄網モルタル塗のほうが木ずりしっくい塗より大きく、5は大小関係が逆。",
    "choiceExplanations": {
      "ア": "適当。多雪区域では長期の荷重組合せにも積雪荷重を含め、固定荷重・積載荷重との総和を考える。",
      "イ": "適当。床の局部的な載荷を考える床用積載荷重は、大梁・柱・基礎用の低減した値より大きい。",
      "ウ": "適当。一般的な暴風時の短期組合せは固定荷重と積載荷重に風圧力を加える。多雪区域等の追加条件は別途考慮する。",
      "エ": "適当。吹きだまり等による不均等な積雪は荷重分布や部材応力に影響するため、偏りを考慮する。",
      "オ": "不適当。鉄網モルタル塗の標準的な固定荷重は木ずりしっくい塗より大きい。記述は両者の大小が逆。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q2",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 2,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "地震力と風荷重",
    "topicTags": [
      "地震力と風荷重"
    ],
    "difficulty": 3,
    "question": "木造2階建ての建築物に作用する地震力及び風による水平力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "地震力と風による水平力は、一般に、同時に作用しないものとして考える。",
      "イ": "地震力は、一般に、固定荷重及び積載荷重が大きいほど大きい。",
      "ウ": "風による水平力は、積載荷重が大きいほど大きい。",
      "エ": "1階に生ずる風による水平力は、2階より大きい。",
      "オ": "地震力は、建築物の部材に対して短期に生ずる力として考える。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。風荷重は速度圧、風力係数、受圧面積等で決まり、積載荷重に比例して増えるものではない。",
    "choiceExplanations": {
      "ア": "適当。地震と暴風の同時発生を通常の設計組合せには採らず、それぞれの短期外力として検討する。",
      "イ": "適当。地震時の慣性力は建物重量に関係し、固定荷重と地震用積載荷重が大きいほど一般に大きくなる。",
      "ウ": "不適当。風による水平力は風速・地表面粗度・建物形状や受圧面積等で決まる。積載荷重の増大を直接の要因としない。",
      "エ": "適当。1階は上部に作用する風力も支えるため、一般的な2階建てでは1階の負担する水平力が2階より大きい。",
      "オ": "適当。地震は継続的な常時荷重ではなく、構造設計では短期に生ずる力として取り扱う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q3",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 3,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木造部材名称",
    "topicTags": [
      "木造部材名称"
    ],
    "difficulty": 3,
    "question": "木造建築物における部材の名称とそれを使用する部位等との組合せとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "登り淀 ― 屋根",
      "イ": "鏡板 ― 天井",
      "ウ": "挟み束 ― 小屋組",
      "エ": "羽目板 ― 床組",
      "オ": "地貫 ― 軸組"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。羽目板は壁や天井などに張る仕上げ板。床組の構成部材との組合せが不適当。",
    "choiceExplanations": {
      "ア": "適当。登り淀はけらば等の登り方向に用いる屋根端部の部材で、使用部位を屋根とする対応は正しい。",
      "イ": "適当。鏡板は框等にはめる板の総称で、格天井など天井の板にも用いる。部位を天井とする対応は成立する。",
      "ウ": "適当。挟み束は小屋組において梁等を挟むように設ける束材で、小屋組の部材として用いられる。",
      "エ": "不適当。羽目板は壁や天井等に張る仕上げ板である。床組には根太・大引・床梁などを用いる。",
      "オ": "適当。地貫は柱をつなぐ低い位置の貫で、木造軸組を構成する部材に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1",
    "sourceRubies": [
      {
        "base": "淀",
        "reading": "よど"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q4",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 4,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "基礎・地盤",
    "topicTags": [
      "基礎・地盤"
    ],
    "difficulty": 3,
    "question": "木造2階建ての建築物における基礎又は地盤に関する次の記述のうち、最も不適当なものはどれか。ただし、基礎については構造計算を行わないものとする。",
    "choices": {
      "ア": "地盤の凍結のおそれのない地域であったので、布基礎の根入れ深さを180mmとした。",
      "イ": "基礎断熱工法を採用したので、床下換気孔を設けなかった。",
      "ウ": "基礎杭を鋼管杭としたので、杭の肉厚は、6mm以上、かつ、杭の直径の1/100以上とした。",
      "エ": "布基礎の底盤の幅を、地盤の長期許容応力度に応じて定めた。",
      "オ": "布基礎の立上り部分の高さを、地上部分で400mmとした。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。構造計算をしない布基礎の根入れは原則240 mm以上。凍結のおそれがなくても180 mmでは不足する。",
    "choiceExplanations": {
      "ア": "不適当。布基礎の根入れ深さは原則240 mm以上を確保する。凍結のおそれがないことだけで180 mmにはできない。",
      "イ": "適当。適切な基礎断熱工法では床下を室内側の環境として扱い、一般の床下換気孔を設けない構成を採用できる。",
      "ウ": "適当。鋼管杭の肉厚について6 mm以上かつ直径の1/100以上を確保するという仕様は、規定する最低寸法を満たす。",
      "エ": "適当。基礎底盤は上部荷重を地盤へ分散させる部分であり、地盤の長期許容応力度等に応じた幅が必要。",
      "オ": "適当。布基礎立上りの地上部分400 mmは、一般に求められる最低高さ300 mm以上を確保している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q5",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 5,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "アンカーボルト",
    "topicTags": [
      "アンカーボルト"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による2階建ての建築物における土台又はアンカーボルトに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "柱の断面寸法を120mm×120mmとしたので、土台の断面寸法を120mm×120mmとした。",
      "イ": "短期許容耐力20kNの引寄せ金物(ホールダウン金物)をアンカーボルトで基礎に緊結するので、コンクリートへのアンカーボルトの埋込み長さを200mmとした。",
      "ウ": "土台切れの箇所に、アンカーボルトを設置した。",
      "エ": "筋かいを設けた耐力壁部分に用いるアンカーボルトは、筋かい両端の柱の下部に近接した位置に設置した。",
      "オ": "アンカーボルトの土台への締付けに当たり、アンカーボルトの先端は、土台の上端において、ナットからねじが3山以上突き出るようにした。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。引寄せ金物のアンカーボルトは必要耐力を発揮できる定着が必要。20 kN級で埋込み200 mmは不足する。",
    "choiceExplanations": {
      "ア": "適当。土台は柱からの荷重を受けるため、柱と同じ120 mm角を用いる寸法設定は一般的に妥当。",
      "イ": "不適当。20 kNの引寄せ金物用アンカーボルトに200 mmの埋込みでは必要な定着が不足する。所定仕様の埋込み長さ等を確保する。",
      "ウ": "適当。土台が連続しない土台切れの部分にはアンカーボルトを設け、土台と基礎を適切に緊結する。",
      "エ": "適当。筋かいの両端で生じる力を基礎へ伝えるため、両端柱の下部に近接してアンカーボルトを配置する。",
      "オ": "適当。ナットからねじを3山以上突出させることで、ナットとねじ部のかかりを確保して締め付ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888858.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q6",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 6,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "柱・横架材",
    "topicTags": [
      "柱・横架材"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による2階建ての建築物における柱又は横架材に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "2階床梁や胴差には、一般に、マツなどが適している。",
      "イ": "鉛直荷重により曲げを受ける床梁は、その中央部付近の下側に引張応力が生じる。",
      "ウ": "隅柱を通し柱としない場合、上下階の管柱相互を引寄せ金物等で適切に補強しなければならない。",
      "エ": "親柱は、床の荷重を支える構造耐力上主要な部材である。",
      "オ": "頭つなぎは、柱上部をつなぐ部材であり、屋根の荷重を受けない。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。親柱は階段の手すり端部等に用いる柱であり、一般の床荷重を支える主要構造部材の名称ではない。",
    "choiceExplanations": {
      "ア": "適当。マツ類は梁等に適した曲げ性能を持ち、2階床梁や胴差など曲げを受ける横架材によく用いる。",
      "イ": "適当。通常の鉛直下向き荷重で単純梁に正曲げが生じると、中央付近の下縁は引張側となる。",
      "ウ": "適当。通し柱を用いない隅柱では、上下の管柱を適切な引寄せ金物等で緊結し、力を伝達させる必要がある。",
      "エ": "不適当。親柱は階段手すりの始終端等に置く柱の名称。床荷重を支える構造耐力上主要な柱をいうものではない。",
      "オ": "適当。頭つなぎは柱の上部を連結して軸組をまとめる部材であり、通常は屋根荷重を直接受ける桁等と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q7",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 7,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "梁の曲げ強さ",
    "topicTags": [
      "梁の曲げ強さ"
    ],
    "difficulty": 3,
    "question": "図のような断面を有する製材(木材)の梁A～Dに鉛直力が作用するときの曲げ強さの大小関係として、正しいものは、次のうちどれか。ただし、全ての梁の材質、支持条件及びスパンは同一とし、梁B～Dを構成する部材はそれぞれ相互に接合されていないものとする。",
    "choices": {
      "ア": "A=B=C=D",
      "イ": "A>B=C>D",
      "ウ": "A=B>C>D",
      "エ": "A>C>D>B",
      "オ": "D>C>A=B"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。独立材の断面係数を合計するとA:B:C:D＝4:2:2:4/3。同材質・同スパンではA＞B＝C＞D。",
    "choiceExplanations": {
      "ア": "不適当。Aはせい36 cmの一体断面で、独立した小断面の合計より曲げに強い。全て同じ強さにはならない。",
      "イ": "正しい。Z=bh²/6よりA=2592、B=1296、C=1296、D=864 cm³。接合されない部材のZを合計するとA＞B＝C＞D。",
      "ウ": "不適当。Bはせい18 cmの2材で、せい36 cmの一体材Aの半分の断面係数となる。AとBは等しくない。",
      "エ": "不適当。BとCは総幅12 cm・せい18 cmの独立材として断面係数の合計が等しく、Dはそれより小さい。",
      "オ": "不適当。Dはせい12 cmの3材で断面係数の合計が最小。Dを最も強いとする大小関係は逆。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 4,
    "sourcePrintedPage": "構造 3",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q7.png"
    ],
    "imageAltTexts": [
      "梁の断面。Aは幅12 cmせい36 cm一体。Bは幅12 cmせい18 cmを上下2材。Cは幅6 cmせい18 cmを左右上下4材。Dは幅12 cmせい12 cmを上下3材。B～Dの各材は相互に接合されていない。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q8",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 8,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "梁の孔・切欠き",
    "topicTags": [
      "梁の孔・切欠き"
    ],
    "difficulty": 3,
    "question": "等分布荷重wを受ける製材(木材)の梁(等質で等断面とする。)において、図のようにスパンに角孔又は切欠きを設けた場合、梁A～Cの曲げモーメントに対する強さの大小関係として、正しいものは、次のうちどれか。ただし、角孔及び切欠きの形状・寸法は、いずれも「b:1/10l、h:梁せいの1/4」とし、梁の自重は無視するものとする。",
    "choices": {
      "ア": "A>B>C",
      "イ": "A=B>C",
      "ウ": "B>C>A",
      "エ": "C>A=B",
      "オ": "C>A>B"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。Aの角孔は支点近くの中立軸付近、Bは中央上側、Cは中央下側の切欠き。曲げ強さはA＞B＞C。",
    "choiceExplanations": {
      "ア": "正しい。Aの孔は曲げの小さい支点近くの中立軸付近で影響が比較的小さい。中央の切欠きでは引張側のCが圧縮側Bより不利となる。",
      "イ": "不適当。中央の圧縮側を欠くBは、支点近く中立軸付近の角孔Aと同じ強さにはならない。Aのほうが有利。",
      "ウ": "不適当。Aは断面中央付近の孔で端部に近く、最大曲げ位置で上縁を欠くBより有利。Bを最大とする順序は異なる。",
      "エ": "不適当。Cは最大曲げが生じる中央の引張側を欠くため最も不利。Cを最も強いとすることはできない。",
      "オ": "不適当。中央下側を欠くCの引張側の欠損は特に不利であり、AやBより強いとはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 5,
    "sourcePrintedPage": "構造 4",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q8.png"
    ],
    "imageAltTexts": [
      "単純梁A～Cに等分布荷重w。Aは左支点からl/8付近の中立軸に角孔。Bは中央上端の切欠き。Cは中央下端の切欠き。孔・切欠き幅b=l/10、高さh=梁せいの1/4。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q9",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 9,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "存在壁量",
    "topicTags": [
      "存在壁量"
    ],
    "difficulty": 3,
    "question": "図のような平面形状を有する木造住宅の張り間方向の壁量(存在壁量)として、正しいものは、次のうちどれか。",
    "choices": {
      "ア": "14m",
      "イ": "18m",
      "ウ": "23m",
      "エ": "32m",
      "オ": "36m"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。張り間方向に平行な壁だけを数える。倍率2.5の壁6 m、倍率1.0の壁8 mで、6×2.5＋8×1.0＝23 m。",
    "choiceExplanations": {
      "ア": "不適当。14 mは張り間方向に平行な壁の実長の合計であり、倍率2.5の壁を換算する存在壁量ではない。",
      "イ": "不適当。張り間方向の壁について、倍率ごとの実長を正しく合計して掛けると18 mにはならない。",
      "ウ": "正しい。張り間方向の黒塗り壁は計6 m、斜線壁は計8 m。存在壁量は6×2.5＋8×1.0＝23 m。",
      "エ": "不適当。桁行方向に平行な壁を加えず、張り間方向の壁だけに各倍率を乗じると23 mとなる。",
      "オ": "不適当。存在壁量はすべての壁長を一律倍率で評価する値ではなく、図の方向と壁種別に合計して23 mとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 6,
    "sourcePrintedPage": "構造 5",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q9.png"
    ],
    "imageAltTexts": [
      "1 m格子の木造住宅平面図。縦が張り間方向、横が桁行方向。斜線の耐力壁は倍率1.0、黒塗り壁は倍率2.5。張り間方向に平行な黒塗り壁は計6 m、斜線壁は計8 m。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q10",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 10,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "耐力壁仕様",
    "topicTags": [
      "耐力壁仕様"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による2階建ての建築物の耐力壁に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "片面に構造用合板を釘打ち張りし、軸組内にたすき掛け筋かいを設けた耐力壁について、耐力壁の倍率の合計が7を超えた場合、その倍率は7を上限としなければならない。",
      "イ": "同じ耐力壁線内の筋かいは、傾きの方向が同じ向きとなるように配置する。",
      "ウ": "筋かいをたすき掛けにするために、やむを得ず筋かいを欠き込む場合は、必要な補強を行う。",
      "エ": "壁長910mmの筋かいについて、土台・桁等の横架材の上端の相互間の垂直距離が3.2mを超える場合は、筋かいの倍率を適切に低減する必要がある。",
      "オ": "所定の仕様を満たす垂れ壁・腰壁等は、存在壁量に算入することができる。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。筋かいは一方向へそろえず、水平力の両方向に対応できるよう釣合いよく配置する。",
    "choiceExplanations": {
      "ア": "適当。出題時点の改正後の仕様では、組合せ耐力壁の倍率の合計が7を超える場合は7を上限として扱う。",
      "イ": "不適当。同じ壁線の筋かいを同じ傾きばかりにすると方向による耐力の偏りが生じる。向きを釣合いよく配置する。",
      "ウ": "適当。たすき掛けの取合いでやむを得ず筋かいを欠く場合には、欠損による耐力低下を補う必要な補強を行う。",
      "エ": "適当。高さ3.2 mを超える幅910 mmの筋かいは傾斜が大きくなるため、所定の方法で壁倍率を低減する。",
      "オ": "適当。所定の面材・釘・寸法等の仕様を満たす垂れ壁や腰壁等は、改正後の規定により存在壁量へ算入できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 6,
    "sourcePrintedPage": "構造 5",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/jutakukentiku/build/content/001753393.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q11",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 11,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "軸組の軸力",
    "topicTags": [
      "軸組の軸力"
    ],
    "difficulty": 3,
    "question": "図のような水平力P及び2Pが作用する軸組の部材A～Eについて、部材に生じる軸力に関する次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "部材Aには、引張力が生じる。",
      "イ": "部材Bには、圧縮力が生じる。",
      "ウ": "部材Cには、圧縮力が生じる。",
      "エ": "部材Dには、引張力が生じる。",
      "オ": "部材Eには、圧縮力が生じる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。右上節点には外から鉛直力がなく、部材Cの軸力は0。Cを圧縮とする3が誤り。",
    "choiceExplanations": {
      "ア": "正しい。左上の水平力Pは斜材Bの圧縮で釣り合い、その鉛直成分と釣り合うため左上柱Aには引張力が生じる。",
      "イ": "正しい。左上節点で右向きPに抵抗するため、右下から左上へ押す斜材Bは圧縮材となる。",
      "ウ": "誤り。右上節点には水平材と鉛直材Cだけが接続し、鉛直外力がないためCの軸力は0で、圧縮力は生じない。",
      "エ": "正しい。中間階の水平力と上階からの力に対して左下から右中間へつながる斜材Dが引張で抵抗する。",
      "オ": "正しい。右中間節点で斜材B・Dからの鉛直成分を支えるため、下階右柱Eには圧縮力が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q11.png"
    ],
    "imageAltTexts": [
      "2層1スパンのピン軸組。左上に右向きP、左中間に右向き2P。Aは左上柱、Bは左上から右中間への斜材、Cは右上柱、Dは左下から右中間への斜材、Eは右下柱。左下ピン、右下ローラー。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q12",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 12,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "柱脚引抜き",
    "topicTags": [
      "柱脚引抜き"
    ],
    "difficulty": 3,
    "question": "図のような2階建ての木造建築物の耐力壁の配置において、水平力を受けたときに柱A～Eの脚部に生じる引抜き力が最も大きいものは、次のうちどれか。ただし、図中の各部材の接合部には、必要な金物が使用されているものとし、たすき掛け筋かい耐力壁はいずれも倍率を4.0とする。",
    "choices": {
      "ア": "A",
      "イ": "B",
      "ウ": "C",
      "エ": "D",
      "オ": "E"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。Eは外端の下階柱で、上下階の耐力壁による引抜きが重なり、隣接壁による相殺もないため最大となる。",
    "choiceExplanations": {
      "ア": "不適当。Aは上階の柱であり、上下階の壁の力が重なる外端の下階柱Eほど大きな柱脚引抜きにはならない。",
      "イ": "不適当。Bは上階の耐力壁端の柱。下階の転倒作用も加わる外端柱Eと比較すると引抜き力は小さい。",
      "ウ": "不適当。Cは下階柱だが、上階耐力壁の端部が直上にない配置で、上下階の作用が重なるEがより厳しい。",
      "エ": "不適当。Dは隣り合う下階耐力壁の中間側の柱で、両側壁の軸力が相殺するためEより引抜きが小さい。",
      "オ": "正しい。Eは上下階の同位置にある耐力壁の外端柱。下階の壁と上階からの力が重なり、外側に相殺する壁もなく最大。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q12.png"
    ],
    "imageAltTexts": [
      "2階建てのたすき掛け筋かい耐力壁配置。各壁倍率4.0、筋かい45×90 mm。上階に左右2壁、下階に左側2壁と右側1壁の計3壁。上左外柱A、上右内柱B、下左外柱C、下左内柱D、上下階が連なる右外柱E。全5選択肢A～Eも含む。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q13",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 13,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "小屋組",
    "topicTags": [
      "小屋組"
    ],
    "difficulty": 3,
    "question": "木造建築物の小屋組に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "和小屋は、小屋梁の上に小屋束を立て屋根荷重を支える構造であり、小屋梁のスパンが大きくなると、曲げモーメントは大きくなる。",
      "イ": "洋小屋は、比較的断面の小さな部材を組み合わせてトラスを構成する形式であり、スパンが大きな倉庫などに用いられる。",
      "ウ": "クィーンポストトラスとは、対束小屋組と呼ばれ、小屋裏に物置などを設ける場合や、腰折れ屋根などに用いられる洋小屋組である。",
      "エ": "京呂組は、軒桁に小屋梁をかける方式であり、柱の位置にかかわらず小屋梁を配置することができる。",
      "オ": "振れ隅木とは、勾配の異なる屋根面が取り合う部分にできる稜線に用いられる隅木であり、軒桁に対して45度をなす。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。異なる勾配面の取合いに生じる振れ隅木は、一般に軒桁と45度をなさない。等勾配の隅木との混同。",
    "choiceExplanations": {
      "ア": "適当。和小屋では小屋束の集中荷重を小屋梁が曲げで支える。同条件で梁スパンが大きくなると曲げも増大する。",
      "イ": "適当。洋小屋は小断面の材を三角形に組んで軸力で抵抗するトラスで、比較的大きなスパンに対応できる。",
      "ウ": "適当。クィーンポストトラスは2本の主要な束を持つ対束小屋組で、小屋裏空間や腰折れ屋根に対応する。",
      "エ": "適当。京呂組は軒桁上に小屋梁を載せる構成なので、小屋梁位置を必ずしも柱直上にそろえる必要はない。",
      "オ": "不適当。振れ隅木は屋根面の勾配が異なるため平面の振れ角も異なり、軒桁に一律45度をなすものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "sourceRubies": [
      {
        "base": "稜",
        "reading": "りょう"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q14",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 14,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "洋小屋トラス",
    "topicTags": [
      "洋小屋トラス"
    ],
    "difficulty": 3,
    "question": "図のような荷重が作用する小屋組(洋小屋組)に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "陸梁には、引張力が作用する。",
      "イ": "真束には、引張力が作用する。",
      "ウ": "吊束には、引張力が作用する。",
      "エ": "方づえには、圧縮力が作用する。",
      "オ": "合掌には、圧縮力が作用する。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。図の吊束下端には鉛直荷重がなく、接続する陸梁は水平なため、節点の鉛直方向の釣合いから吊束の軸力は0となる。",
    "choiceExplanations": {
      "ア": "適当。下弦材の陸梁は左右の支点を結び、合掌から外向きに開こうとする作用に引張で抵抗する。",
      "イ": "適当。中央の真束は中央下節点をつり上げるように働き、この荷重配置では引張力が生じる。",
      "ウ": "不適当。吊束の下端節点には鉛直外力がなく、接続する陸梁は水平である。鉛直方向の釣合いから吊束の軸力は0となり、引張力は生じない。",
      "エ": "適当。中央下節点から左右の上節点へ延びる方づえは、図の荷重に対し圧縮力で釣り合う。",
      "オ": "適当。屋根勾配に沿う上弦材の合掌は、図の下向き荷重を支える圧縮材として働く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q14.png"
    ],
    "imageAltTexts": [
      "洋小屋トラス。左右支点へP/2、左右上の中間節点へP、棟節点へPの下向き荷重。下弦陸梁、中央真束、左右の吊束、中央下節点から上へ延びる方づえ、勾配方向の合掌。左ピン、右ローラー。"
    ],
    "sourceRubies": [
      {
        "base": "陸",
        "reading": "ろく"
      },
      {
        "base": "吊",
        "reading": "つり"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q15",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 15,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "床組",
    "topicTags": [
      "床組"
    ],
    "difficulty": 3,
    "question": "木造軸組工法の建築物の2階床組に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "根太を用いず、床梁を910mm間隔に配置した床組であったので、厚さ24mmの構造用合板をCN75釘を用いて四周釘打ち張りした。",
      "イ": "床組を補強するために、断面寸法90mm×90mmの木製の火打梁を用い、横架材との仕口は傾ぎ大入れとし、M12の六角ボルトにより留め付けた。",
      "ウ": "厚さ24mmのスギの挽板を床下地材としたので、主要な横架材が交わる部分に火打梁を設けた。",
      "エ": "床梁については、その両端部を受ける横架材との仕口に、羽子板ボルトを用いた。",
      "オ": "床梁の間隔が1,820mmであったので、根太の断面寸法を幅45mm×せい60mmとした。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。支点間1,820 mmの根太に幅45 mm×せい60 mmでは小さすぎる。支点間距離に応じたせいを確保する。",
    "choiceExplanations": {
      "ア": "適当。910 mm間隔の梁に厚さ24 mmの構造用合板を所定のCN75釘で四周留めする根太省略床は、仕様に合う構成。",
      "イ": "適当。90 mm角の火打梁を傾ぎ大入れとM12ボルトで接合することは、床組の水平剛性を確保する一般的な仕様。",
      "ウ": "適当。スギ挽板の下地だけでは水平構面としての剛性が不足しやすく、主要な交差部へ火打梁を設けることが適切。",
      "エ": "適当。床梁端の仕口を羽子板ボルトで緊結すると、地震時等の梁の抜出しを防いで力を伝達できる。",
      "オ": "不適当。1,820 mmを飛ばす根太に45×60 mmはせいが不足する。荷重・材質と支点間距離に応じて十分な断面を選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "sourceRubies": [
      {
        "base": "挽",
        "reading": "ひき"
      }
    ],
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888858.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q16",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 16,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "枠組壁工法",
    "topicTags": [
      "枠組壁工法"
    ],
    "difficulty": 3,
    "question": "枠組壁工法による2階建ての建築物に関する次の記述のうち、最も不適当なものはどれか。ただし、構造計算は行わないものとする。",
    "choices": {
      "ア": "長さ6mの耐力壁線に、幅4mの開口部を設けた。",
      "イ": "耐力壁線相互の距離を12mとし、耐力壁線により囲まれた部分の水平投影面積を40m²とした。",
      "ウ": "たて枠と上枠とをCN90釘2本を用いて緊結した。",
      "エ": "径12mm、長さ400mmのアンカーボルトを4m間隔に配置し、かつ、建築物の隅角部と土台の継手部分に配置した。",
      "オ": "屋根を構成する垂木相互の間隔を455mmとし、屋根下地材として、JASに適合する1～3級の構造用パネルを用いた。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。土台アンカーボルトの配置間隔は2 m以下とする。4 m間隔は不適当。",
    "choiceExplanations": {
      "ア": "適当。耐力壁線の開口は原則として幅4 m以下、かつ壁線長の3/4以下。6 mの壁線に4 mの開口は両方を満たす。",
      "イ": "適当。耐力壁線間の距離12 m以下、囲まれる水平投影面積40 m²以下という仕様の上限をそれぞれ満たす。",
      "ウ": "適当。たて枠端部を上枠へCN90釘2本で緊結することは、所定の枠組材接合仕様に合う。",
      "エ": "不適当。径12 mm・長さ400 mmは寸法の条件を満たすが、間隔は2 m以下が必要。4 mは広すぎる。",
      "オ": "適当。455 mm間隔の垂木上にJASの1～3級構造用パネルを用いることは、所定の屋根下地材料の仕様に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001769650.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q17",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 17,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "構造計画",
    "topicTags": [
      "構造計画"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による2階建ての建築物の構造計画に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "2階の耐力壁と1階の耐力壁とを、市松状になるように配置した。",
      "イ": "四分割法における壁率比が0.4であったので、各側端部分の壁量充足率が1を超えることを確認した。",
      "ウ": "通し柱に横架材を取り付けるに当たり、所要断面積の4割を欠き取ったので、当該部分を補強した。",
      "エ": "地震時における建築物の平面的なねじれや折れ、はらみを防止するために、耐力壁を釣合いよく配置するとともに、床組の面内剛性を高くした。",
      "オ": "建築物の外周に接して吹抜けを設けたので、その部分の胴差の断面を小さくした。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。外周の吹抜けでは床による横拘束等が減り、胴差へ力が集中し得る。単に断面を小さくするのは不適当。",
    "choiceExplanations": {
      "ア": "適当。市松状の配置は床の水平構面を介して力を伝達する構成として採用できる。上下の壁を適切に配置して伝達を確保する。",
      "イ": "適当。壁率比が0.5未満でも両側端部分の壁量充足率がともに1を超える場合は、四分割法の条件を満たす。",
      "ウ": "適当。柱の所要断面積の1/3を超える欠込みには補強が必要。4割を欠くため補強した対応は正しい。",
      "エ": "適当。耐力壁の偏りを抑え、床面内剛性を高めることは、地震時のねじれや平面的な変形を抑える基本的な対策。",
      "オ": "不適当。吹抜け周囲の胴差は床構面の不連続や荷重伝達を考慮して十分な断面・接合を確保する。小さくする理由にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q18",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 18,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "耐震改修",
    "topicTags": [
      "耐震改修"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による2階建ての既存建築物の耐震性を向上させる方法として、一般に、最も効果の低いものは、次のうちどれか。",
    "choices": {
      "ア": "耐力壁を構成する柱の劣化部分を根継ぎにより交換し、当該接合部を接合金物で補強した。",
      "イ": "耐力壁が設置された下屋の屋根下地材を、小幅板から構造用合板に張り替えた。",
      "ウ": "1階床組の大引きを支持する床束の設置間隔を小さくした。",
      "エ": "無筋コンクリート造の布基礎であったので、これに鉄筋コンクリート造の布基礎を抱き合わせて補強した。",
      "オ": "2階建ての建築物を平家建ての建築物に減築した。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。床束間隔を狭くする対策は主に床の鉛直支持を改善し、建物全体の水平耐力の改善効果は低い。",
    "choiceExplanations": {
      "ア": "適当な耐震対策。柱の劣化を除去し根継ぎ部を金物で補強すると、耐力壁の端部に必要な軸力の伝達を回復できる。",
      "イ": "適当な耐震対策。下屋の屋根構面を構造用合板で補強すると、下屋の耐力壁から上部へ水平力を伝達しやすくなる。",
      "ウ": "効果が最も低い。床束を増やすと1階床のたわみ等には有効だが、主要な耐力壁・接合部の水平抵抗を直接増やさない。",
      "エ": "適当な耐震対策。無筋の布基礎に鉄筋コンクリート基礎を適切に一体化して抱き合わせると、基礎と壁端部の耐力を改善できる。",
      "オ": "適当な耐震対策。2階部分を減築すると建物重量と重心高さが低下し、地震力や転倒作用を低減できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q19",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 19,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鉛直荷重の伝達",
    "topicTags": [
      "鉛直荷重の伝達"
    ],
    "difficulty": 3,
    "question": "木造建築物の各部における鉛直荷重による力の流れとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "1階床荷重(束立て床) ― 床板→根太→大引→床束→束石",
      "イ": "1階天井荷重 ― 天井板→野縁受→野縁→吊木受→吊木→梁",
      "ウ": "2階床荷重(枠組壁工法) ― 床材→床根太→頭つなぎ→上枠→たて枠→下枠",
      "エ": "屋根荷重(和小屋寄棟) ― 野地板→配付け垂木→隅木→母屋→小屋束→飛梁→軒桁",
      "オ": "屋根荷重(洋小屋) ― 野地板→垂木→母屋→合掌→陸梁→敷桁→柱"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。天井板を直接支持するのは野縁、その上が野縁受。2は野縁と野縁受の順序が逆。",
    "choiceExplanations": {
      "ア": "適当。束立て床では床板の荷重を根太、大引、床束、束石の順に下へ伝える。各部材の支持関係に合う。",
      "イ": "不適当。正しくは天井板→野縁→野縁受→吊木→吊木受→梁等。野縁と野縁受の順序が逆で、吊木は吊木受からつり下げられる。",
      "ウ": "適当。枠組壁工法の床荷重は床根太を介し、頭つなぎ・上枠・たて枠・下枠の順に壁の枠組へ伝わる。",
      "エ": "適当。図示する和小屋寄棟の構成では配付け垂木や隅木から母屋・小屋束・飛梁を介して軒桁へ荷重を伝える。",
      "オ": "適当。洋小屋では野地板・垂木・母屋から合掌へ伝わる荷重をトラスで支え、陸梁端・敷桁を介して柱へ伝える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10",
    "sourceRubies": [
      {
        "base": "吊",
        "reading": "つり"
      },
      {
        "base": "母屋",
        "reading": "もや"
      },
      {
        "base": "陸",
        "reading": "ろく"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q20",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 20,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木材の乾燥収縮",
    "topicTags": [
      "木材の乾燥収縮"
    ],
    "difficulty": 3,
    "question": "図のような立方体の木材が乾燥して収縮する場合、繊維方向、半径方向及び接線方向の収縮率の比として、最も適当なものは、次のうちどれか。",
    "choices": {
      "ア": "繊維方向:半径方向:接線方向=1:2:20",
      "イ": "繊維方向:半径方向:接線方向=1:10:20",
      "ウ": "繊維方向:半径方向:接線方向=1:20:10",
      "エ": "繊維方向:半径方向:接線方向=10:2:1",
      "オ": "繊維方向:半径方向:接線方向=20:10:1"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。乾燥収縮は繊維方向が最小、接線方向が最大。代表的な比は繊維：半径：接線＝1：10：20。",
    "choiceExplanations": {
      "ア": "不適当。半径方向の収縮は接線方向のおよそ半分で、接線方向の1/10とする比は実際の一般的な比より小さすぎる。",
      "イ": "正しい。繊維方向の収縮を1とすると、半径方向約10、接線方向約20が一般的な目安。接線方向が最大。",
      "ウ": "不適当。半径方向と接線方向の大小関係が逆。木材の乾燥収縮は一般に接線方向のほうが大きい。",
      "エ": "不適当。繊維方向の収縮が最大とする点が逆。繊維方向は半径方向や接線方向に比べて非常に小さい。",
      "オ": "不適当。繊維方向が最大で接線方向が最小とする順序は、木材の乾燥収縮の一般的な性質と逆。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q20.png"
    ],
    "imageAltTexts": [
      "木材立方体の木口と年輪及び3方向。繊維方向は材長方向、半径方向は年輪の中心から外向き、接線方向は年輪に沿う方向を矢印で示す。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q21",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 21,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木材の基準強度",
    "topicTags": [
      "木材の基準強度"
    ],
    "difficulty": 3,
    "question": "木材の一般的な性質に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "実大材の木材の繊維方向の曲げ、引張り、圧縮、せん断、めり込みの基準強度の大小関係は、一般に、曲げ>引張り>圧縮>せん断>めり込みである。",
      "イ": "木材のクリープ変形を考慮した梁の変形増大係数は、一般に、2である。",
      "ウ": "土台の長期のめり込みの許容応力度は、当該土台のめり込みによって、他の部材の応力に変化が生じる場合と生じない場合とでその値は異なる。",
      "エ": "木材の断面が大きいと、燃焼部分に形成される炭化層により、燃焼速度は、深部に進むほど遅くなる。",
      "オ": "気乾状態の質量が575g、全乾状態の質量が500gの木材の気乾状態のときの含水率は、15%である。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。実大材の一般的な基準強度は曲げ＞圧縮＞引張り＞めり込み＞せん断。1は圧縮・引張りと、せん断・めり込みの順序が逆。",
    "choiceExplanations": {
      "ア": "不適当。一般的な実大材の基準強度は曲げ＞圧縮＞引張り＞めり込み＞せん断。無欠点小試験体の強さと区別する。",
      "イ": "適当。梁の長期変形にはクリープを見込み、木材では一般に変形増大係数2を用いて初期変形から評価する。",
      "ウ": "適当。土台のめり込みが他部材の応力を変えるか否かにより、長期許容めり込み応力度の取扱いが異なる。",
      "エ": "適当。厚い木材では炭化層が断熱層として内部を保護し、深部への燃焼や温度上昇の進行を遅らせる。",
      "オ": "適当。含水率は水分質量を全乾質量で除した割合。(575−500)/500×100＝15%となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "officialReferenceUrls": [
      "https://www.ffpri.go.jp/pubs/bulletin/445/documents/445-1.pdf",
      "https://www.mlit.go.jp/common/001131689.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q22",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 22,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木材の防腐・防蟻",
    "topicTags": [
      "木材の防腐・防蟻"
    ],
    "difficulty": 3,
    "question": "木造建築物の防腐・防蟻等に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "木材の腐朽菌は、酸素、温度、水分及び栄養素の全ての条件が満たされた状況下で繁殖する。",
      "イ": "床下の防蟻措置において、薬剤による土壌処理を行う場合、布基礎部分周辺及び束石の周囲に行うことが有効である。",
      "ウ": "ヒラタキクイムシは、ラワンなどの広葉樹を食害する。",
      "エ": "ヒノキやヒバの辺材は、一般に、耐腐朽性・耐蟻性に優れている。",
      "オ": "表面塗布による木材への防腐処理は、一般に、加圧式防腐処理に比べて、その効果の継続時間が短い。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。高い耐腐朽性・耐蟻性が期待できるのは一般にヒノキ・ヒバの心材。辺材とする4が不適当。",
    "choiceExplanations": {
      "ア": "適当。腐朽菌の繁殖には酸素、適当な温度、水分、栄養が必要で、どれかの条件を断つことが防腐につながる。",
      "イ": "適当。シロアリの侵入経路となる基礎周辺や束石周囲を土壌処理することは、防蟻上有効な方法。",
      "ウ": "適当。ヒラタキクイムシはラワンなどの広葉樹材の辺材等を食害し、針葉樹材を主に加害する虫とは区別される。",
      "エ": "不適当。ヒノキ・ヒバでも辺材は耐腐朽性・耐蟻性が低い。耐久性に優れるとされるのは主に抽出成分を含む心材。",
      "オ": "適当。塗布処理は薬剤の浸透が表面に限られるため、内部へ浸透させる加圧処理に比べ持続効果は一般に短い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q23",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 23,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木質材料",
    "topicTags": [
      "木質材料"
    ],
    "difficulty": 3,
    "question": "木質材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "「単板積層材の日本農林規格」におけるA種構造用単板積層材は、主繊維方向に直交する単板を入れないもの、又は、両最外層から2枚目のみに直交する単板を配置したものである。",
      "イ": "「合板の日本農林規格」における特類の構造用合板は、屋外又は常時湿潤状態となる環境下で使用することができる。",
      "ウ": "「枠組壁工法構造用製材及び枠組壁工法構造用たて継ぎ材の日本農林規格」における甲種枠組材は、主として高い曲げ性能を必要とする部分に使用する。",
      "エ": "木質断熱複合パネルは、製材、集成材等を使用した枠組に構造用合板等を接着剤により複合構成したパネルである。",
      "オ": "特定対称異等級構成集成材は、ラミナの品質の構成が中心軸に対して対称であり、かつ、曲げ性能を優先したラミナ構成とした集成材である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。枠組に面材を接着する記述は木質接着複合パネル。木質断熱複合パネルは有機発泡材を面材で挟む構成。",
    "choiceExplanations": {
      "ア": "適当。A種構造用単板積層材は、直交単板を入れない構成又は両最外層から2枚目だけに直交単板を配置する構成である。",
      "イ": "適当。特類の構造用合板は高い接着耐久性を持ち、屋外や常時湿潤状態となる環境下への使用に対応する。",
      "ウ": "適当。甲種枠組材は主として曲げ性能が必要な床根太・垂木等に用い、主に圧縮を受けるたて枠等の乙種と区別する。",
      "エ": "不適当。枠組に合板等を接着したものは木質接着複合パネル。木質断熱複合パネルは枠組なしで有機発泡材の両面に面材を接着する。",
      "オ": "適当。特定対称異等級構成集成材は、中心軸に対して対称の異等級ラミナを配置し、曲げ性能を優先した構成。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/pubcom/01/kekka/pubcomk40_.html"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q24",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 24,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鉄筋コンクリート材料",
    "topicTags": [
      "鉄筋コンクリート材料"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリートに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄筋の種類の記号について、異形棒鋼はSDで示し、その記号の後ろに、JISで規定された降伏点の平均値(N/mm²)をつけて表す。",
      "イ": "コンクリートの強度は、材齢と共に上昇し、その上昇速さは、セメントの種類によって異なる。",
      "ウ": "コンクリートの中性化とは、空気中の二酸化炭素等とコンクリートが反応することによって、コンクリートのアルカリ性が失われる現象のことである。",
      "エ": "コールドジョイントとは、コンクリートの打継ぎ部分に生じる一体化していない継ぎ目のことである。",
      "オ": "普通コンクリートの気乾単位容積質量は、一般に、2.2～2.4t/m³である。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。SDの後の数値は降伏点等の規定の下限値を示す。試験値や平均値を示すものではない。",
    "choiceExplanations": {
      "ア": "不適当。異形棒鋼のSDに続く数値は降伏点又は耐力の規定下限値を示す。例えばSD295の295は平均値ではない。",
      "イ": "適当。水和反応によって材齢とともに強度が発現し、早強・中庸熱などセメントの種類で強度発現の速さが異なる。",
      "ウ": "適当。二酸化炭素等が水酸化カルシウムなどと反応するとアルカリ性が低下し、鉄筋の不動態保護が失われやすくなる。",
      "エ": "適当。コールドジョイントは前後に打ち込んだコンクリートが十分一体化しない継ぎ目で、漏水や耐久性低下の原因となる。",
      "オ": "適当。普通コンクリートの気乾単位容積質量は一般に2.2～2.4 t/m³程度で、軽量コンクリートとは区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12"
  },
  {
    "id": "mokuzo-kenchikushi-2025-annual-III-q25",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2025,
    "season": "annual",
    "qNumber": 25,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "建築材料"
    ],
    "difficulty": 3,
    "question": "建築材料に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "花こう岩(御影石)は、圧縮強度や耐摩耗性が低い。",
      "イ": "アルミニウムは、鉄と接触すると腐食するので、鉄に亜鉛めっき又はアスファルト塗装などを施す。",
      "ウ": "ステンレス鋼は、主成分である鉄にクロムやニッケルなどを配合した合金であり、炭素鋼に比べて耐火性や溶接性が優れている。",
      "エ": "合わせガラスは、2枚以上の材料板ガラスで中間膜を挟み、全面接着したものである。",
      "オ": "粘土瓦は、耐久性、耐薬品性、耐摩耗性に優れている。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。花こう岩は一般に圧縮強度と耐摩耗性が高い石材。低いとする1は不適当。",
    "choiceExplanations": {
      "ア": "不適当。花こう岩は組織が緻密で、一般に圧縮強度・耐摩耗性が高い。記述の「低い」は反対の性質。",
      "イ": "適当。アルミニウムと鉄が湿潤状態等で接触すると異種金属接触腐食を生じるため、めっきや塗装等で接触・腐食を防ぐ。",
      "ウ": "適当。ステンレス鋼はクロム等を添加した鉄合金で、一般の炭素鋼との比較では耐熱・耐火上の性能や溶接性に優れるものがある。",
      "エ": "適当。合わせガラスは複数の板ガラスを中間膜で全面接着し、破損時の飛散や貫通を抑えるガラス。",
      "オ": "適当。粘土瓦は粘土を成形・焼成した材料で、一般に耐久性、耐薬品性、耐摩耗性に優れている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12"
  }
];
