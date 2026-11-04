import type { StagedKenchikushiQuestion } from "./types";

export const MOKUZO_2026_III: readonly StagedKenchikushiQuestion[] = [
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q1",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "積載荷重は、人間や移動がそれほど困難でない家具・調度・物品等の荷重をいう。",
      "イ": "住宅の居室における床の積載荷重は、一般に、「地震力を計算する場合」より「大梁・柱又は基礎の構造計算をする場合」のほうが大きい。",
      "ウ": "多雪区域における地震時の短期に生ずる力は、固定荷重、積載荷重、積雪荷重及び地震力によって生ずる力の総和である。",
      "エ": "積雪荷重は、一般に、積雪量1cmごとに1m²につき20N以上の単位荷重に、屋根の水平投影面積及びその地方における垂直積雪量を乗じて計算する。",
      "オ": "瓦葺屋根の固定荷重の値は、葺土の有無によって変化しない。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。瓦屋根は葺土があるとその重量が加わり固定荷重が大きくなる。葺土の有無で変わらないとする5が誤り。",
    "choiceExplanations": {
      "ア": "適当。積載荷重は人や容易に移動できる家具・物品等による荷重で、建物自体の固定荷重とは区別する。",
      "イ": "適当。住宅の積載荷重は地震力用より大梁・柱・基礎用のほうが大きい値を用いるのが一般的。",
      "ウ": "適当。多雪区域では地震時の短期荷重組合せに、固定・積載・地震力のほか所定の積雪荷重も考慮する。",
      "エ": "適当。積雪単位荷重は原則1 cm当たり20 N/m²以上で、水平投影面積と垂直積雪量を乗じて求める。",
      "オ": "不適当。葺土の重量を含むため、葺土ありの瓦屋根は葺土なしより固定荷重が大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q2",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 2,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "地震・風",
    "topicTags": [
      "地震・風"
    ],
    "difficulty": 3,
    "question": "木造建築物に作用する地震力及び風による水平力に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "地震力及び風による水平力は、建築物に対して、短期に生ずる力として考える。",
      "イ": "地震時の建築物の揺れは、一般に、地上部分より地下部分のほうが大きい。",
      "ウ": "地震力の計算に用いる設計用一次固有周期(単位秒)は、一般に、建築物の高さ(単位メートル)に係数0.03を乗じて求める。",
      "エ": "風圧力は、建築物の形状、高さ及び建設地域を考慮して求める。",
      "オ": "地震力に対する検討は、一般に、張り間方向と桁行方向について行う。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。地震時の揺れは一般に地下より地上部分で大きくなる。高さによる応答増幅を考慮する必要がある。",
    "choiceExplanations": {
      "ア": "適当。地震及び風による水平力は、構造設計では短期に生じる荷重・外力として扱う。",
      "イ": "不適当。一般に地上部分の揺れが地下部分より大きい。地盤に拘束された地下のほうが大きいという関係は逆。",
      "ウ": "適当。木造建物の設計用一次固有周期の略算では、通常高さhに0.03を乗じたT=0.03hを用いる。",
      "エ": "適当。風圧力は地域の基準風速に加え、建物高さ、地表面粗度、建物形状等を反映して算定する。",
      "オ": "適当。水平力への安全性は張り間・桁行の両方向をそれぞれ検討し、一方向だけで済ませない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q3",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "鼻隠 ― 屋根",
      "イ": "格縁 ― 天井",
      "ウ": "方立 ― 開口部",
      "エ": "長押 ― 床",
      "オ": "敷目板 ― 壁"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。長押は柱間に水平に取り付ける壁面等の部材であり、床に用いるという組合せは不適当。",
    "choiceExplanations": {
      "ア": "適当。鼻隠は軒先で垂木の先端等を隠す部材で、屋根の部位に使用する。",
      "イ": "適当。格縁は格天井の格子を構成する部材であり、天井との組合せが正しい。",
      "ウ": "適当。方立は開口を左右に区切る縦材等として用い、開口部に関する部材である。",
      "エ": "不適当。長押は柱を横につなぐ壁面の横材等であり、床組を構成する床用部材ではない。",
      "オ": "適当。敷目板は縦板張り等の目地の内側に入れ、隙間をふさぐため壁に用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 2,
    "sourcePrintedPage": "構造 1",
    "sourceRubies": [
      {
        "base": "格",
        "reading": "ごう"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q4",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 4,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "地盤・基礎",
    "topicTags": [
      "地盤・基礎"
    ],
    "difficulty": 3,
    "question": "木造2階建ての建築物における基礎又は地盤に関する次の記述のうち、最も不適当なものはどれか。ただし、基礎については構造計算を行わないものとする。",
    "choices": {
      "ア": "地盤の長期許容応力度が20kN/m²であったので、べた基礎の底盤の厚さを100mmとした。",
      "イ": "塩害のおそれのある地域であったので、基礎の鉄筋に対するコンクリートのかぶり厚さを大きくした。",
      "ウ": "地盤の凍結のおそれのない地域であったので、べた基礎の根入れ深さを180mmとした。",
      "エ": "地盤の長期許容応力度を設定するために、計画された建築物の中央及び四隅付近の5箇所において、地盤調査を行った。",
      "オ": "切土及び盛土を行った造成地盤において、建築物は盛土側に設置した擁壁からできるだけ離して計画した。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。構造計算を省略する所定のべた基礎は底盤厚150 mm以上が必要。地盤20 kN/m²でも100 mmにはできない。",
    "choiceExplanations": {
      "ア": "不適当。所定の仕様規定によるべた基礎の底盤厚は150 mm以上。地盤の長期許容応力度20 kN/m²でも100 mmでは不足。",
      "イ": "適当。塩害地域では塩化物による鉄筋腐食への抵抗を高めるため、通常よりかぶり厚さを大きくする。",
      "ウ": "適当。べた基礎の根入れは原則120 mm以上等の条件があり、凍結のおそれがない場合の180 mmは妥当。",
      "エ": "適当。建物の四隅と中央の計5点で地盤調査を行うと、地盤の硬軟や不同沈下に関するばらつきを把握できる。",
      "オ": "適当。造成盛土や擁壁近傍は変形・沈下等の影響を受けやすいので、建物を擁壁からできるだけ離す計画が望ましい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q5",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 5,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "土台・アンカーボルト",
    "topicTags": [
      "土台・アンカーボルト"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による2階建ての建築物における土台又はアンカーボルトに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "建築物に地震力及び風による水平力が作用すると、土台には曲げ応力が生じる場合がある。",
      "イ": "同じ大きさの鉛直荷重が作用する柱の土台へのめり込み量は、一般に、土台の材端部より材中間部のほうが大きくなる。",
      "ウ": "アンカーボルトのねじ部は、損傷、錆の発生、汚損を防止するために、布、ビニルテープ等を用いて養生を行う。",
      "エ": "アンカーボルト(M12)のコンクリートへの埋込み長さは、250mm以上とする。",
      "オ": "アンカーボルトに用いる角座金の寸法は、土台へのめり込みを考慮して決定する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。木材の部分圧縮では周囲の木部の拘束を受ける材中間部より材端部のめり込みが大きくなりやすい。2は大小が逆。",
    "choiceExplanations": {
      "ア": "適当。地震・風の水平力で柱脚に引抜き等が生じると、土台にアンカーボルトとの間の曲げが生じる場合がある。",
      "イ": "不適当。同じ鉛直荷重では一般に材端部のほうが拘束が弱く、めり込みが大きくなる。材中間部のほうが大きいという関係は逆。",
      "ウ": "適当。アンカーボルトのねじ部は傷、錆、モルタル等の汚れを防ぐよう、布やテープ等で養生する。",
      "エ": "適当。通常のM12アンカーボルトはコンクリートへの埋込み長さ250 mm以上を確保する。",
      "オ": "適当。座金は引張力等を土台へ伝えるため、木材のめり込み応力を考慮して必要な大きさを決める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "sourceRubies": [
      {
        "base": "錆",
        "reading": "さび"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q6",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "管柱は、構造耐力上主要な部材である。",
      "イ": "針葉樹は堅木と呼ばれ、一般に、広葉樹よりも強度が高いので、柱・梁等に用いられる。",
      "ウ": "横架材のスパン表は、あらかじめ所要の構造計算等を行い作成された、断面寸法を求めるための早見表である。",
      "エ": "柱の断面寸法は、横架材間の垂直距離に基づき所定の方法により決定するか、若しくは構造計算によって決定する。",
      "オ": "床梁の中央部付近の下端に、耐力上支障のある欠込みをしてはならない。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。一般に軟材と呼ぶのは針葉樹、堅木と呼ぶのは広葉樹。樹種区分だけで強度を一律に比較できず、材種や等級等で設計する。",
    "choiceExplanations": {
      "ア": "適当。管柱は各階の横架材間に設ける柱で、鉛直・水平荷重を伝える構造耐力上主要な部材である。",
      "イ": "不適当。針葉樹は一般に軟材、広葉樹は堅木と呼ばれる。針葉樹が一律に高強度という説明も正しくない。",
      "ウ": "適当。スパン表は所定の荷重や材料等の条件で構造計算した必要断面の早見表。適用条件を確認して用いる。",
      "エ": "適当。柱断面は横架材間の垂直距離や所定の荷重等による方法、又は構造計算により決定する。",
      "オ": "適当。床梁中央部下端は通常曲げ引張応力が大きく、耐力を損なう欠込みを設けてはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 3,
    "sourcePrintedPage": "構造 2",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q7",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 7,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "柱の座屈",
    "topicTags": [
      "柱の座屈"
    ],
    "difficulty": 3,
    "question": "図のような両端から荷重を受ける木造の柱A、B及びCの座屈のしにくさの大小関係として、正しいものは、次のうちどれか。ただし、全ての柱の材質、支持条件は同一とし、荷重は断面の図心にかかるものとする。",
    "choices": {
      "ア": "A>B=C",
      "イ": "A>B>C",
      "ウ": "B=C>A",
      "エ": "C>B>A",
      "オ": "C>A>B"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。長さ・材料・支持が同じなので座屈荷重は最小Iに比例。I比は1:1.5:2、作用荷重は1:2:3なので余裕比は1:0.75:2/3。座屈しにくさはA>B>C。",
    "choiceExplanations": {
      "ア": "不正解。荷重は同じではない。Bの座屈荷重はAの1.5倍でも作用荷重は2倍、Cは座屈荷重2倍に対して荷重3倍。",
      "イ": "正解。最小Iは短辺12 cmの3乗と長辺に比例し、I/作用荷重はA:B:C=1:0.75:2/3。よってA>B>C。",
      "ウ": "不正解。B・Cは断面が大きいが作用荷重の増加がより大きい。座屈への余裕はAが最大でBとCも同じではない。",
      "エ": "不正解。断面二次モーメントの大小だけならC>B>Aだが、作用荷重P・2P・3Pも比較する必要がある。",
      "オ": "不正解。CはAの2倍の最小Iを持つが荷重は3倍なので、Aより座屈余裕が小さい。正しくはA>B>C。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 4,
    "sourcePrintedPage": "構造 3",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2026-III-q7.png"
    ],
    "imageAltTexts": [
      "柱長全て3.0 m。A断面12×12 cm・両端圧縮荷重P、B断面12×18 cm・荷重2P、C断面12×24 cm・荷重3P。各端荷重は断面図心に作用。材料・支持条件は共通。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q8",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 8,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "梁端の欠込み",
    "topicTags": [
      "梁端の欠込み"
    ],
    "difficulty": 3,
    "question": "図のような木造の梁A、B及びCの端部におけるせん断強さの大小関係として、正しいものは、次のうちどれか。ただし、全ての梁の材質及び幅は同じものとする。",
    "choices": {
      "ア": "A=B>C",
      "イ": "B>A>C",
      "ウ": "B>C>A",
      "エ": "C=A>B",
      "オ": "C>B>A"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。欠込みなしCが最大。下端に欠込みのあるAは応力集中等の影響が大きく、同じ残りせい27 cmでも上端欠込みBより不利。C>B>A。",
    "choiceExplanations": {
      "ア": "不正解。欠込みのあるA・Bは無欠込みCよりせん断に不利。下端欠込みAと上端欠込みBも同等にはならない。",
      "イ": "不正解。BはAより有利だが、欠込みのないCが最も強い。B>A>Cという順位ではない。",
      "ウ": "不正解。Aが最小なのは正しいが、上端を欠き込んだBより、せい30 cmの無欠込みCのほうが強い。",
      "エ": "不正解。下端欠込みAは無欠込みCと同等ではなく、上端欠込みBよりも不利となる。",
      "オ": "正解。無欠込みC、上端3 cm欠込みで残りせい27 cmのB、下端3 cm欠込みのAの順でせん断強さが小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 5,
    "sourcePrintedPage": "構造 4",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2026-III-q8.png"
    ],
    "imageAltTexts": [
      "同じ幅の梁端。Aは梁せい30 cmに対し下端側を3 cm欠き込み支持部せい27 cm。Bは上端側を3 cm欠き込み支持部せい27 cm。Cは欠込みなしでせい30 cm。全て左側柱が支持。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q9",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 9,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "風圧用見付面積",
    "topicTags": [
      "風圧用見付面積"
    ],
    "difficulty": 3,
    "question": "図のような立面をもつ木造建築物において、1階及び2階に必要な軸組(耐力壁)の長さを計算する場合の見付面積(斜線部分)の組合せとして、正しいものは、次のうちどれか。",
    "choices": {
      "ア": "2階用：A、1階用：D",
      "イ": "2階用：B、1階用：E",
      "ウ": "2階用：B、1階用：F",
      "エ": "2階用：C、1階用：E",
      "オ": "2階用：C、1階用：F"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。風圧に対する壁量は、各階床面から1.35 mを超える部分の屋根を含む見付面積で算定する。2階はC、1階はF。",
    "choiceExplanations": {
      "ア": "不正解。AとDは床面からの壁部分だけを対象としており、1.35 mの基準と屋根部分の扱いが正しくない。",
      "イ": "不正解。BとEは屋根を含むが、各階床面から1.35 mまでの下部も算入しているため過大となる。",
      "ウ": "不正解。1階用Fは正しいが、2階用Bは2階床面から1.35 mまでの部分を除いておらず、正しくはC。",
      "エ": "不正解。2階用Cは正しいが、1階用Eは1階床面から1.35 mまでの部分を除いていない。",
      "オ": "正解。各階床面より1.35 m上の線を下端とし、屋根を含む上方の見付面積を採るため、CとFの組合せとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 6,
    "sourcePrintedPage": "構造 5",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2026-III-q9.png"
    ],
    "originalContent": {
      "body": "図のような立面をもつ木造建築物において、1階及び2階に必要な軸組(耐力壁)の長さを計算する場合の見付面積(斜線部分)の組合せとして、正しいものは、次のうちどれか。",
      "tables": [
        {
          "caption": "見付面積候補の組合せ（選択肢1～5の順）",
          "rows": [
            [
              "2階用",
              "1階用"
            ],
            [
              "A",
              "D"
            ],
            [
              "B",
              "E"
            ],
            [
              "B",
              "F"
            ],
            [
              "C",
              "E"
            ],
            [
              "C",
              "F"
            ]
          ]
        }
      ]
    },
    "imageAltTexts": [
      "2階建て切妻建物、1階床から2階床3 m、2階床から軒3 m、軒から棟1 m。2階候補Aは2階床から軒まで、Bは2階床から棟まで、Cは2階床+1.35 mから棟まで。1階候補Dは1階床から軒まで、Eは1階床から棟まで、Fは1階床+1.35 mから棟までを網掛け。選択肢表はA-D,B-E,B-F,C-E,C-F。"
    ],
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q10",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 10,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "耐力壁",
    "topicTags": [
      "耐力壁"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による2階建ての建築物の耐力壁に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "大壁仕様の耐力壁において、構造用合板(910mm×1,820mm)を縦張りする場合、その継目部分には、断面45mm×100mm以上の胴つなぎを設けて釘打ち接合する。",
      "イ": "断面寸法が4.5cm×9cmの木材の筋かいの端部を、筋かい金物(BP-2と同等の耐力が認められた金物)を用いて、軸組に緊結する。",
      "ウ": "同じ構面内の筋かいは、傾きが右上がりのものと左上がりのものとが、対になるように配置する。",
      "エ": "片面に大壁仕様で構造用面材を釘打ち張りし、他の面に真壁仕様で構造用面材を釘打ち張りした耐力壁の倍率は、5倍を限度として、それぞれの倍率を合計した値とすることができる。",
      "オ": "耐力壁は、平面的な剛性分布のバランスの指標である偏心率ができるだけ小さくなるように配置する。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。両面の所定の面材耐力壁を併用する場合の倍率は、改正後は原則7倍を上限に加算する。5倍という旧上限を用いる4が不適当。",
    "choiceExplanations": {
      "ア": "適当。縦張り合板の継目部分には所定の胴つなぎを設け、面材周辺を支持して釘の力を確実に伝える。",
      "イ": "適当。断面4.5 cm×9 cmの筋かい端部は、BP-2相当以上の所定の接合耐力を持つ金物で軸組へ緊結する。",
      "ウ": "適当。筋かいの向きを対にすると、水平力の正負いずれにも抵抗しやすく、接合部等への偏った力を抑えられる。",
      "エ": "不適当。改正後の倍率加算の上限は原則7倍。両面面材の倍率を合計する際の限度を5倍とする記述は旧基準との混同。",
      "オ": "適当。偏心率が小さいほどねじれが生じにくいので、耐力壁を釣合いよく配置して偏心を抑える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6",
    "officialReferenceUrls": [
      "https://www.meti.go.jp/shingikai/enecho/denryoku_gas/saisei_kano/pdf/073_02_00.pdf",
      "https://www.mlit.go.jp/jutakukentiku/build/jutakukentiku_house_tk_000166.html"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q11",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 11,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "軸組の軸力",
    "topicTags": [
      "軸組の軸力"
    ],
    "difficulty": 3,
    "question": "図のような軸組に、水平力P又は水平力P’のどちらか一方が作用する場合、部材A～Eに生じる軸力についての次の記述のうち、誤っているものはどれか。",
    "choices": {
      "ア": "部材Aには、水平力Pによって、引張力が生じる。",
      "イ": "部材Bには、水平力P’によって、圧縮力が生じる。",
      "ウ": "部材Cには、水平力P’によって、引張力が生じる。",
      "エ": "部材Dには、水平力Pによって、圧縮力が生じる。",
      "オ": "部材Eには、水平力Pによって、圧縮力が生じる。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。左上節点では鉛直方向の外力がなく、その節点に接する柱Aは水平荷重Pで軸力0となる。引張力とする1が誤り。他部材は節点の力のつり合いで判定する。",
    "choiceExplanations": {
      "ア": "誤り。P作用時の左上節点には鉛直外力がなく、柱Aの軸力は0。引張力が生じるという記述は正しくない。",
      "イ": "正しい。P′は右上節点を左へ押すため、斜材Bは上右節点から下左節点を押し広げる圧縮となる。",
      "ウ": "正しい。P′によりBが右上節点へ上向き成分を与え、そのつり合いで右上柱Cは引張力を負担する。",
      "エ": "正しい。Pの下層への水平伝達によって、左中節点から右下節点の斜材Dは圧縮力を負担する。",
      "オ": "正しい。P作用時、上層の力のつり合いと右中節点の鉛直つり合いから右下柱Eには圧縮力が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 7,
    "sourcePrintedPage": "構造 6",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2026-III-q11.png"
    ],
    "imageAltTexts": [
      "2層1スパンのピン接合軸組、左脚ピン・右脚ローラー。左上柱A、左中から右上への斜材B、右上柱C、左中から右下への斜材D、右下柱E。左上節点に右向きP又は右上節点に左向きP′のいずれか一方が作用。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q12",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 12,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "柱脚引抜き",
    "topicTags": [
      "柱脚引抜き"
    ],
    "difficulty": 3,
    "question": "図のような2階建ての木造建築物の耐力壁の配置において、水平力を受けたときに柱A～Eの脚部に生じる引抜き力が最も大きいものは、次のうちどれか。ただし、図中の各部材の接合部には、必要な金物が使用されているものとする。また、耐力壁は面材張り(■部分)で、倍率は2.5とする。",
    "choices": {
      "ア": "A",
      "イ": "B",
      "ウ": "C",
      "エ": "D",
      "オ": "E"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。上階耐力壁の引抜き成分は下階へ伝わり、下階自身の耐力壁の引抜き成分と重なる。上下で端部がそろう左端の1階柱Dが最大となる。",
    "choiceExplanations": {
      "ア": "不正解。Aは上階左端の柱で上階分の引抜きは生じるが、下階の壁による引抜き成分を加える柱Dほど大きくない。",
      "イ": "不正解。Bは上階左側壁の反対側端部であり、両方向の力を比較しても、上下の引抜きが累積する1階Dが支配する。",
      "ウ": "不正解。Cは上階右側の端部柱。上下の耐力壁配置による引抜き力の伝達を含めると、1階左端Dが最大となる。",
      "エ": "正解。左端は上下の耐力壁端部がそろい、上階から伝わる引抜きと1階耐力壁による引抜きが柱D脚部で重なる。",
      "オ": "不正解。Eは1階右端だが、上階右端と水平位置が異なる配置。上下の壁端がそろって累積する左端Dがより大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2026-III-q12.png"
    ],
    "imageAltTexts": [
      "灰色が倍率2.5の面材耐力壁（本文の■に対応）。上階は左端と右側に各1枚、下階は左端1枚と右側に連続2枚。柱Aは上階左壁左端、Bはその右端、Cは上階右壁右端。Dは下階左壁左端でAと同軸、Eは下階連続壁右端でCより右。土台・柱・梁は図示位置で接合。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q13",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "京呂組は、軒桁に小屋梁をかける方式であり、柱の位置にかかわらず小屋梁を配置することができるので、住宅などに広く用いられている。",
      "イ": "さす組は、2本の斜材と小屋梁等で三角形の骨組を構成する小屋組である。",
      "ウ": "小屋組の部材及び接合部の剛性と耐力は、建方中に生じる応力に対して十分に安全なものとする。",
      "エ": "桔木は、軒の出を深くするために、てこの原理を使って鼻母屋・茅負を先端で支える部材である。",
      "オ": "配付け垂木は、切妻屋根において、棟木の側面へ斜めに取り付ける部材である。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。配付け垂木は寄棟等の隅木へ斜めに取り付く短い垂木。切妻屋根で棟木の側面へ斜めに付くとする5が誤り。",
    "choiceExplanations": {
      "ア": "適当。京呂組は柱上の軒桁に小屋梁を架けるので、柱の直上だけに小屋梁位置を限定せず配置できる。",
      "イ": "適当。さす組は二本の斜材と小屋梁等で三角形を構成し、屋根荷重を支持する小屋組形式である。",
      "ウ": "適当。小屋組は完成後だけでなく、建方中の不安定な状態で生じる荷重や応力にも安全でなければならない。",
      "エ": "適当。桔木はてこの原理で軒先の鼻母屋・茅負等を支え、深い軒の出を実現するための部材。",
      "オ": "不適当。配付け垂木は隅木等へ斜めに取り付く短い垂木。切妻の棟木側面へ斜めに付くという説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 8,
    "sourcePrintedPage": "構造 7",
    "sourceRubies": [
      {
        "base": "桔",
        "reading": "はね"
      },
      {
        "base": "母屋",
        "reading": "もや"
      },
      {
        "base": "茅負",
        "reading": "かやおい"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q14",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 14,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "洋小屋組",
    "topicTags": [
      "洋小屋組"
    ],
    "difficulty": 3,
    "question": "図のような荷重が作用する洋小屋組に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "屋根勾配にかかわらず、支点に作用する力は変わらない。",
      "イ": "屋根勾配にかかわらず、真束に作用する力は変わらない。",
      "ウ": "屋根勾配が大きくなると、合掌に作用する力は小さくなる。",
      "エ": "屋根勾配が小さくなると、陸梁に作用する力は小さくなる。",
      "オ": "屋根勾配が小さくなると、方づえに作用する力は大きくなる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。同じ鉛直荷重で屋根勾配を小さくすると、合掌の水平成分が増え、陸梁の引張力は大きくなる。小さくなるとする4が逆。",
    "choiceExplanations": {
      "ア": "適当。図の鉛直荷重の合計と左右対称性から支点反力が決まり、屋根勾配が変わっても反力は変わらない。",
      "イ": "適当。真束の軸力は図の節点荷重と鉛直方向のつり合いで定まり、同じ荷重条件では屋根勾配で変わらない。",
      "ウ": "適当。勾配が大きいほど合掌の鉛直方向成分の割合が大きくなり、同じ鉛直荷重を負担する軸力は小さくなる。",
      "エ": "不適当。勾配が小さいほど同じ鉛直力に対する水平成分が大きくなり、陸梁の引張力は大きくなる。",
      "オ": "適当。屋根勾配が小さいほど斜材の鉛直成分が小さくなるため、同じ荷重を伝える方づえの軸力は大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/mokuzo-2026-III-q14.png"
    ],
    "sourceRubies": [
      {
        "base": "陸",
        "reading": "ろく"
      }
    ],
    "imageAltTexts": [
      "左右対称の洋小屋トラス。両端支点に下向きP/2、左右斜屋根中間節点及び棟に下向きPずつ。棟から陸梁中央へ真束、左右斜屋根中間節点から陸梁中央へ方づえ、同中間点には鉛直材。左ピン・右ローラー。"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q15",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 15,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "2階床組",
    "topicTags": [
      "2階床組"
    ],
    "difficulty": 3,
    "question": "木造軸組工法による建築物の2階床組に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "火打梁を用いた床の水平剛性を確保するために、床梁のせいを240mmとし、床面積に対する火打梁1本当たりの負担面積が2.5m²以下となるようにした。",
      "イ": "下地板に用いる厚さ15mmの構造用合板は、床梁、根太等の横架材に、N50釘を用いて所定の間隔で固定した。",
      "ウ": "床梁の間隔が1.82mであったので、根太床とし、断面寸法45mm×60mmの根太を間隔455mmに配置した。",
      "エ": "床梁については、その両端部を受ける横架材との仕口に、羽子板ボルトを用いた。",
      "オ": "床の水平剛性を確保するために、根太の間隔を303mmとして床梁及び胴差に落とし込み、曲げ性能の等級が2級の構造用パネルを所定の方法により留め付けた。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。床梁間隔1.82 mに対して45×60 mmの根太は小さすぎる。根太の支点間距離に応じた十分なせいを持つ断面を用いる。",
    "choiceExplanations": {
      "ア": "適当。梁せい240 mmとし火打梁の負担面積を2.5 m²以下に抑える配置は、所定の床水平剛性を確保する仕様。",
      "イ": "適当。厚15 mmの構造用合板は所定のN50釘と釘間隔で床組へ固定する仕様として用いられる。",
      "ウ": "不適当。支点間距離1.82 mに対し45×60 mmは根太せいが不足する。荷重、間隔、スパンに応じた断面が必要。",
      "エ": "適当。床梁両端の仕口を羽子板ボルトで補強し、横架材相互の引張力の伝達や外れ防止を確保する。",
      "オ": "適当。所定の根太落込みと303 mm間隔、構造用パネルの等級・留付け仕様を組み合わせて床水平剛性を確保できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 9,
    "sourcePrintedPage": "構造 8",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888858.pdf",
      "https://jpma.jp/data/kouzou-3/kouzou-3-1_pr.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q16",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "耐力壁線に設ける2つの開口部の幅をそれぞれ3mとしたので、その幅の合計が当該耐力壁線の長さの3/4以下であることを確認した。",
      "イ": "耐力壁に設ける幅1.8mの開口部の上部にはまぐさを設け、たて枠と同じ寸法型式のまぐさ受けで支えた。",
      "ウ": "せっこうボード張り耐力壁について、せっこうボードを枠材に留め付けるのに、CN50釘を用いた。",
      "エ": "耐力壁に使用する下枠及びたて枠として、日本農林規格に規定されている寸法型式204の枠組壁工法構造用製材を用いた。",
      "オ": "耐力壁の上部には、耐力壁の上枠と同じ寸法型式の頭つなぎを設け、耐力壁相互を構造耐力上有効に緊結した。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。せっこうボードの留付けには所定のせっこうボード用釘等を用いる。CN50は構造用面材等の留付けに用いる釘で、そのまま置換できない。",
    "choiceExplanations": {
      "ア": "適当。開口幅各3 mとし、その合計を耐力壁線長さの3/4以下に抑える条件は、枠組壁工法の所定の制限に適合する。",
      "イ": "適当。幅1.8 mの開口上部のまぐさは、たて枠と同じ寸法型式の所定のまぐさ受けで支持する。",
      "ウ": "不適当。せっこうボード耐力壁には所定のボード用釘等を使用する。CN50を使うという仕様は所定の留付け方法と異なる。",
      "エ": "適当。所定の2階建ての耐力壁には、寸法型式204の枠組壁工法構造用製材を下枠・たて枠として使用できる。",
      "オ": "適当。上枠と同じ寸法型式の頭つなぎを設け、耐力壁同士を有効に緊結して力を伝達する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/common/001855621.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q17",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "軸組に方づえを設けて水平力に抵抗させることとしたので、柱が先行破壊しないことを確認した。",
      "イ": "用途が物置の小屋裏の床面積が、その小屋裏が存する階の床面積の1/4であったので、壁量計算用の床面積を算定するに当たり、その小屋裏の面積を考慮した。",
      "ウ": "2階に吹抜けを有する建築物において、2階の壁量計算用の床面積を算定するに当たり、床面積に吹抜け部分の面積を加算した。",
      "エ": "敷地が軟弱な地盤であったので、建築物に配置する耐力壁の量を減らした。",
      "オ": "横架材の上端の相互間の垂直距離が3.5m、柱間の距離が910mmであったので、断面寸法が3cm×9cmの木材の筋かいを入れた軸組の倍率を、1.5よりも小さい値とした。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。軟弱地盤では地震時の影響を考慮し必要壁量を増す等の対策が必要。耐力壁の量を減らす4は逆。",
    "choiceExplanations": {
      "ア": "適当。方づえは柱へ曲げ等を生じさせるため、水平力に抵抗させる場合は柱の先行破壊を防ぐ検討が必要。",
      "イ": "適当。物置用小屋裏が階床面積の1/4ある場合、その荷重等を無視せず、所定の方法で壁量計算用面積へ反映する。",
      "ウ": "適当。吹抜けも外周等から水平力を受けるため、所定の壁量算定では吹抜け面積を床面積へ加えて扱う。",
      "エ": "不適当。軟弱地盤では地震の影響が大きくなる場合があり、必要耐力壁を減らす理由にはならない。",
      "オ": "適当。高い軸組に細長い筋かいを配置する条件では、所定の高さ等に応じて倍率を低減し、通常1.5倍より小さくする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 10,
    "sourcePrintedPage": "構造 9",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q18",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "耐力壁を構成する1階柱の柱脚と土台とを、金物により緊結した。",
      "イ": "屋根葺材を、日本瓦から金属板に葺き替えた。",
      "ウ": "鉄筋コンクリート造のべた基礎を有する1階の床組において、床下地材を小幅板から構造用合板に張り替えた。",
      "エ": "2階の耐力壁の直下に柱がないので、当該柱を受ける梁を補強し、その曲げ剛性を高くした。",
      "オ": "土塗り壁の外壁を、構造用合板による大壁に変更した。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。べた基礎で支持された1階床の面材化は、一般に2階床等の水平構面の補強ほど建物全体の耐震性へ寄与しない。選択肢中では3の効果が低い。",
    "choiceExplanations": {
      "ア": "効果が高い。1階耐力壁柱脚と土台の緊結は、壁の引抜きや接合部破壊を防ぎ、壁の耐力を発揮させる。",
      "イ": "効果が高い。重い瓦から軽い金属板へ葺き替えると建物上部の質量が減り、地震力や転倒モーメントを低減できる。",
      "ウ": "効果が最も低い。べた基礎で支持される1階床の面材化は、上階の水平力を各壁へ伝える床の補強等に比べ、全体の耐震性改善が小さい。",
      "エ": "効果が高い。上階壁の下の梁の曲げ剛性を高めると、壁脚部の変形を抑え上階耐力壁の性能を発揮しやすくなる。",
      "オ": "効果が高い。所定の仕様の構造用合板張り大壁へ変更すると、壁の水平耐力を高めることができる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10"
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q19",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 19,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鉛直荷重の流れ",
    "topicTags": [
      "鉛直荷重の流れ"
    ],
    "difficulty": 3,
    "question": "木造建築物の各部における鉛直荷重による力の流れとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "1階床荷重(束立て床・べた基礎)床板→根太→大引→鋼製床束→基礎スラブ",
      "イ": "2階床荷重(梁床)床板→根太→床梁→胴差→柱",
      "ウ": "2階天井荷重天井板→吊木→吊木受→野縁→野縁受→小屋梁",
      "エ": "屋根荷重(和小屋折置組)野地板→垂木→母屋→小屋束→小屋梁→柱",
      "オ": "屋根荷重(洋小屋)野地板→垂木→母屋→合掌→陸梁→敷桁→柱"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。天井荷重は天井板→野縁→野縁受→吊木→吊木受→小屋梁の順に伝わる。3は野縁類と吊木類の順序が逆。",
    "choiceExplanations": {
      "ア": "適当。束立て1階床では床板、根太、大引、床束の順に荷重を伝え、べた基礎のスラブへ支持させる。",
      "イ": "適当。梁床の2階床は床板から根太・床梁・胴差等を介して柱へ鉛直荷重を伝える。",
      "ウ": "不適当。天井板はまず野縁で受け、野縁受、吊木、吊木受等を経て小屋梁へ伝える。吊木を最初にする順序が誤り。",
      "エ": "適当。折置組では野地板、垂木、母屋、小屋束、小屋梁を経て、柱上に架かる小屋梁から柱へ荷重を伝える。",
      "オ": "適当。洋小屋では野地板・垂木・母屋から合掌等へ伝え、小屋組と敷桁を経て柱へ支持させる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
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
    "id": "mokuzo-kenchikushi-2026-annual-III-q20",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 20,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木材の性質",
    "topicTags": [
      "木材の性質"
    ],
    "difficulty": 3,
    "question": "木材の一般的な性質に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "「製材の日本農林規格」における乙種構造材は、主として高い曲げ性能を必要とする部分に使用する目視等級区分構造用製材である。",
      "イ": "木材の熱伝導率は、普通コンクリートの熱伝導率に比べて小さい。",
      "ウ": "断面が大きい集成材の炭化速度は、1分間に0.6mm程度である。",
      "エ": "荷重を分散して負担する目的で根太を並列して設けた場合、その根太の基準強度を割り増しすることができる。",
      "オ": "クリープによる木材の曲げ変形の増加量は、一般に、乾燥材より未乾燥材のほうが大きい。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。目視等級区分構造用製材の甲種は主に高い曲げ性能、乙種は主に圧縮性能を必要とする部分に用いる。1は甲乙の取り違え。",
    "choiceExplanations": {
      "ア": "不適当。乙種構造材は主として圧縮性能を必要とする部分に用いる。高い曲げ性能を重視するものは甲種構造材。",
      "イ": "適当。木材は多孔質で熱を伝えにくく、普通コンクリートより熱伝導率が小さい。",
      "ウ": "適当。大断面集成材の炭化速度の一般的な目安は約0.6 mm/分で、燃えしろ等の検討に用いる。",
      "エ": "適当。所定の並列材は荷重分散を期待できるため、適用条件に従って基準強度の割増しが認められる。",
      "オ": "適当。未乾燥材は乾燥進行等の影響もあり、一般に乾燥材よりクリープ変形の増加が大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 11,
    "sourcePrintedPage": "構造 10",
    "officialReferenceUrls": [
      "https://www.maff.go.jp/j/jas/jas_kikaku/pdf/kikaku_40.pdf"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q21",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 21,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "木材強度",
    "topicTags": [
      "木材強度"
    ],
    "difficulty": 3,
    "question": "木材の強度等に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "材面に占める節の割合が大きい製材の圧縮強度は、節の割合が小さい製材の圧縮強度よりも小さい。",
      "イ": "枠組壁工法構造用製材の曲げ強度は、一般に、梁せいが大きいほど大きくなる。",
      "ウ": "一般に、木材の含水率が概ね30%以下の場合、含水率が高いほど強度は小さくなる。",
      "エ": "木材の長期に生ずる力に対する許容応力度は、短期に生ずる力に対する許容応力度の0.55倍である。",
      "オ": "木材のめり込みとせん断に対する基準強度は、樹種によってそれぞれ規定されている。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。曲げ強度には寸法効果があり、一般に梁せいが大きいほど公称の曲げ強度は低下する。断面が大きいほど強度が大きいという2は不適当。",
    "choiceExplanations": {
      "ア": "適当。節の割合が大きいと有効な繊維の連続性等が損なわれ、同条件の節の少ない材より強度が低くなる。",
      "イ": "不適当。梁せいが大きい材では寸法効果により一般に曲げ強度が低くなる。断面全体の耐力と材料の強度を区別する。",
      "ウ": "適当。繊維飽和点付近の約30%以下では、一般に含水率が高いほど木材強度は小さくなる。",
      "エ": "適当。通常の木材許容応力度の長期と短期の係数の比から、長期は短期の0.55倍となる。",
      "オ": "適当。木材のめり込み・せん断の基準強度は樹種等に応じて規定され、一律の値ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "officialReferenceUrls": [
      "https://laws.e-gov.go.jp/law/325CO0000000338_20251201_507CO0000000377"
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q22",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 22,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "防腐・防蟻",
    "topicTags": [
      "防腐・防蟻"
    ],
    "difficulty": 3,
    "question": "木造建築物の防腐・防蟻等に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "外壁をモルタル塗り仕上げとする場合の軸組の腐朽防止には、外壁通気構法が有効である。",
      "イ": "接合金物の腐食による強度低下を防止するためには、溶融亜鉛めっき等の防錆処理を施した金物を使用する。",
      "ウ": "木材腐朽菌は、水分がなくても十分に繁殖する。",
      "エ": "イエシロアリは、乾燥した木材であっても食するので、建築物の小屋組のような上部の構造材にも被害が及ぶことがある。",
      "オ": "加圧式防腐処理木材を現場で切断加工した場合、切断面については再度防腐処理を行う必要がある。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。木材腐朽菌の繁殖には水分が必要。水分がなくても繁殖するという3が誤り。乾燥と通気で腐朽しにくい環境を作る。",
    "choiceExplanations": {
      "ア": "適当。外壁通気構法は壁内の湿気を排出し、モルタル外壁の軸組の腐朽リスクを下げる。",
      "イ": "適当。溶融亜鉛めっき等の防錆処理をした金物を使うと、腐食による断面減少・接合耐力低下を抑えられる。",
      "ウ": "不適当。腐朽菌は繁殖に水分を必要とする。木材を乾燥状態に保つことは腐朽防止の重要な対策。",
      "エ": "適当。イエシロアリは水分を運ぶ等により上部材にも被害を及ぼすため、乾いて見える小屋組も無条件に安全ではない。",
      "オ": "適当。現場切断で未処理部が露出するため、切断面へ所定の防腐処理を追加する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "sourceRubies": [
      {
        "base": "錆",
        "reading": "せい"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q23",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "「構造用パネルの日本農林規格」における構造用パネルは、切削機械により切削された単板の繊維方向を互いにほぼ平行にして積層接着したものである。",
      "イ": "「集成材の日本農林規格」における接着の程度の表示が「使用環境A」である集成材は、直接外気にさらされる環境で使用することができる。",
      "ウ": "「合板の日本農林規格」における化粧ばり構造用合板は、構造用合板の表面又は裏面に、木材質特有の美観を表すことを主な目的とした単板をはり合わせたものである。",
      "エ": "「直交集成板の日本農林規格」における直交集成板は、挽板等をその繊維方向を互いにほぼ平行にして幅方向に並べたものを、主としてその繊維方向を互いにほぼ直角にして、3層以上積層接着したものである。",
      "オ": "MDF(ミディアムデンシティファイバーボード)は、主に木材等の植物繊維を成形した繊維板である。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。構造用パネルは木材の薄片を配向又は無配向に積層接着した板等。単板の繊維を平行に積層する説明は単板積層材に対応する。",
    "choiceExplanations": {
      "ア": "不適当。単板を繊維方向に平行に積層するものはLVL等の説明。構造用パネルは薄片を配向又は無配向に積層接着した材料である。",
      "イ": "適当。接着の使用環境Aは直接外気にさらされる厳しい使用環境等を想定した区分で、所定の条件下で使用できる。",
      "ウ": "適当。化粧ばり構造用合板は構造用合板に美観を目的とする化粧単板を貼ったもので、構造用としての品質も満たす。",
      "エ": "適当。CLTは繊維を平行に並べた板の層を主に直交方向に3層以上積層接着した直交集成板である。",
      "オ": "適当。MDFは木材等の植物繊維を原料に成形した中密度繊維板で、木片を主原料にするパーティクルボードと異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 12,
    "sourcePrintedPage": "構造 11",
    "sourceRubies": [
      {
        "base": "挽",
        "reading": "ひき"
      }
    ]
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q24",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
    "season": "annual",
    "qNumber": 24,
    "subject": "学科Ⅲ（建築構造）",
    "type": "multiple-choice",
    "category": "鉄筋コンクリート",
    "topicTags": [
      "鉄筋コンクリート"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリートに関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "コンクリートの乾燥収縮は、一般に、水セメント比の大きなコンクリートほど小さくなる。",
      "イ": "コンクリートの引張強度・せん断強度・付着強度は、圧縮強度から推定できる。",
      "ウ": "AE剤などの混和剤は、ワーカビリティーの向上など、コンクリートの品質を改善する目的で使用する。",
      "エ": "高強度コンクリートとは、設計基準強度が48N/mm²を超えるコンクリートをいう。",
      "オ": "コンクリートは、アルカリ骨材反応を起こすと、骨材が膨張し、ひび割れが発生する。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。一般に水セメント比が大きいと乾燥収縮も大きくなる。小さくなるとする1が誤り。",
    "choiceExplanations": {
      "ア": "不適当。一般に水セメント比が大きいほど乾燥収縮は大きくなりやすい。小さくなるという傾向が逆。",
      "イ": "適当。コンクリートの引張・せん断・付着等の強度には圧縮強度との相関があり、経験式等で推定する。",
      "ウ": "適当。AE剤等の混和剤は微細な気泡等によって施工性や耐凍害性などの品質を改善するために用いる。",
      "エ": "適当。本問の区分では設計基準強度48 N/mm²を超えるコンクリートを高強度コンクリートとする。",
      "オ": "適当。アルカリ骨材反応では反応生成物の吸水膨張等により内部応力が生じ、コンクリートにひび割れを起こす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12"
  },
  {
    "id": "mokuzo-kenchikushi-2026-annual-III-q25",
    "exam": "mokuzo-kenchikushi",
    "session": "gakka-III",
    "year": 2026,
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
      "ア": "グラスウール断熱材は、ガラス原料及びガラスを溶融し繊維化したものを、バインダを用いて成形したものである。",
      "イ": "合成樹脂エマルションペイントの「2種」は、主に屋外や湿気が発生する箇所に用いられる。",
      "ウ": "発泡プラスチック系断熱材には、あらかじめ発泡させて板状とした製品と、施工現場で発泡させて用いるものとがある。",
      "エ": "セラミックタイルは耐久性、防水性及び防火性に優れた建築材料であり、建築物の壁や床を保護する機能を有している。",
      "オ": "ALCパネルは、軽量で耐火性及び断熱性に優れているが、吸水性が高いので、寒冷地では凍害を受けるおそれがある。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。合成樹脂エマルションペイント2種は主に屋内用。屋外や湿潤部には通常耐水性・耐候性を備える1種を用いる。",
    "choiceExplanations": {
      "ア": "適当。グラスウールはガラス原料や再生ガラス等を溶融して繊維化し、バインダで成形した繊維系断熱材。",
      "イ": "不適当。2種は主に屋内に用いる区分。屋外や湿気の多い箇所には通常1種を選び、用途を取り違えない。",
      "ウ": "適当。発泡プラスチック系断熱材には工場発泡のボード製品と、現場で発泡させて施工するものがある。",
      "エ": "適当。セラミックタイルは耐久・防水・防火に優れ、壁や床の保護と仕上げに利用される。",
      "オ": "適当。ALCは軽量で耐火・断熱性に優れる一方吸水しやすく、寒冷地で含水状態になると凍害の危険がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2026-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和8年木造建築士試験 学科Ⅲ（建築構造）",
    "sourcePage": 13,
    "sourcePrintedPage": "構造 12"
  }
];
