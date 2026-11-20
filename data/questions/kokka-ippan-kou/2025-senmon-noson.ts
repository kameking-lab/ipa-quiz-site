import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_KOU_2025_SENMON_NOSON: Question[] = [
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q01",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "断面一次モーメント"
    ],
    "difficulty": 2,
    "question": "図のような長方形のX軸に関する断面一次モーメントとして最も妥当なのはどれか。",
    "choices": {
      "ア": "162 cm³",
      "イ": "324 cm³",
      "ウ": "486 cm³",
      "エ": "648 cm³",
      "オ": "2268 cm³"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図心は長方形の下縁から6 cm、X軸は下縁から3 cmにある。断面一次モーメントは面積108 cm²に図心の高さ3 cmを掛けた324 cm³である。",
    "choiceExplanations": {
      "ア": "面積は9×12＝108 cm²である。図心からX軸までの距離は1.5 cmではなく3 cmである。",
      "イ": "図心は長方形の下縁から6 cm、X軸は下縁から3 cmにある。断面一次モーメントは面積108 cm²に図心の高さ3 cmを掛けた324 cm³である。",
      "ウ": "4.5 cmは長方形の幅の半分である。X軸まわりの一次モーメントに必要なのは、図心までの鉛直距離である。",
      "エ": "648 cm³は長方形の下縁から図心までの6 cmを使った値である。測る基準は下縁ではなく、そこから3 cm上にあるX軸である。",
      "オ": "一次モーメントは各微小面積にX軸からの符号付き距離を掛けた和である。長方形全体では面積と図心までの距離の積324 cm³になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q01.webp"
    ],
    "imageAltTexts": [
      "幅9 cm、高さ12 cmの長方形とX軸・Y軸。長方形の下縁はX軸より3 cm下にある。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q02",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "力のベクトルの合成"
    ],
    "difficulty": 2,
    "question": "図のような四つの力P₁～P₄の合力の大きさとして最も妥当なのはどれか。\nただし、√2＝1.4、√3＝1.7とする。",
    "choices": {
      "ア": "0 N",
      "イ": "7 N",
      "ウ": "12 N",
      "エ": "32 N",
      "オ": "34 N"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "水平成分は40−17−28＝−5 N、鉛直成分は68＋10−28−45＝5 Nである。合力は√(5²＋5²)＝5√2≒7 Nになる。",
    "choiceExplanations": {
      "ア": "右向きと上向きを正にすると、成分の合計はそれぞれ−5 N、5 Nである。互いに直交するので、合力は0にはならない。",
      "イ": "水平成分は40−17−28＝−5 N、鉛直成分は68＋10−28−45＝5 Nである。合力は√(5²＋5²)＝5√2≒7 Nになる。",
      "ウ": "水平成分と鉛直成分をそれぞれ合計してから大きさを求める。成分の絶対値をそのまま足したり、個々の角度を無視したりしてはいけない。",
      "エ": "80 Nの力の鉛直成分から、40 Nの力の下向き成分と45 Nの力を引く。20 Nの力の上向き成分も入れると、鉛直合計は5 Nとなる。",
      "オ": "この四力では水平方向・鉛直方向とも相殺が大きい。各方向の合計の大きさは5 Nなので、合力は34 Nより小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q02.webp"
    ],
    "imageAltTexts": [
      "原点に作用する四つの力P₁～P₄の大きさと角度。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q03",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "丸鋼の許容応力と許容荷重"
    ],
    "difficulty": 2,
    "question": "直径20 mmの丸鋼の一端を固定し、他端を長さ方向に引っ張るとき、この丸鋼の許容応力として最も妥当なのはどれか。\nただし、この丸鋼の基準強さを500 MPa、安全率を5とする。また、円周率を3とする。",
    "choices": {
      "ア": "1 kN",
      "イ": "8 kN",
      "ウ": "30 kN",
      "エ": "120 kN",
      "オ": "750 kN"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "問題文は「許容応力」だが、選択肢と公式正答は荷重の単位kNである。許容応力は500/5＝100 N/mm²で、断面積300 mm²を掛けた許容荷重は30 kNとなる。",
    "choiceExplanations": {
      "ア": "安全率を考慮した許容応力は500/5＝100 N/mm²である。丸鋼の断面積300 mm²を掛けると、荷重は1 kNより大きくなる。",
      "イ": "直径20 mmの半分が半径であり、断面積は3×10²＝300 mm²である。許容応力100 N/mm²にこの面積を掛けて許容荷重を求める。",
      "ウ": "問題文は「許容応力」だが、選択肢と公式正答は荷重の単位kNである。許容応力は500/5＝100 N/mm²で、断面積300 mm²を掛けた許容荷重は30 kNとなる。",
      "エ": "120 kNは半径の代わりに直径20 mmを用い、断面積を4倍にした値である。正しくは半径10 mmを使う。",
      "オ": "安全率は基準強さを割って許容応力を求めるために用いる。500 N/mm²に5を掛けて許容荷重を計算することはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q04",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "対称なトラスの軸力"
    ],
    "difficulty": 2,
    "question": "図のような荷重を受ける正三角形状のトラスにおいて、部材AB及びACの軸力の組合せとして最も妥当なのはどれか。\nただし、軸力は「＋」を引張力、「−」を圧縮力とし、部材の自重は考慮しないものとする。また、√3＝1.7とする。",
    "choices": {
      "ア": "−9 kN、10 kN",
      "イ": "−3 kN、6 kN",
      "ウ": "3 kN、−6 kN",
      "エ": "3 kN、6 kN",
      "オ": "9 kN、−10 kN"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Cでは左右の斜材が鉛直荷重を半分ずつ支えるため、ACの軸力は −5/sin 60°≒−6 kNである。Aでの水平力のつり合いから、ABは約3 kNの引張となる。",
    "choiceExplanations": {
      "ア": "Cに作用する鉛直荷重を、左右対称な斜材ACとBCが分担する。斜材には圧縮が生じ、ACを正の引張力とはできない。",
      "イ": "斜材ACはCを押し上げる圧縮材である。Aでその水平成分を打ち消すABには引張が生じるので、二つの符号が逆である。",
      "ウ": "Cでは左右の斜材が鉛直荷重を半分ずつ支えるため、ACの軸力は −5/sin 60°≒−6 kNである。Aでの水平力のつり合いから、ABは約3 kNの引張となる。",
      "エ": "ABが約3 kNの引張となる点は正しい。ACはCを支えるため正の引張力ではなく負の圧縮力を受ける。",
      "オ": "軸力の符号は妥当である。Cの荷重は両方の斜材が分担するため、ACの軸力の大きさは10 kNではなく約6 kNである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q04.webp"
    ],
    "imageAltTexts": [
      "辺長5 mの正三角形のトラス。頂点Cに下向き10 kNの荷重が加わる。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q05",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "銑鉄・鋳鉄と鋼の熱処理"
    ],
    "difficulty": 2,
    "question": "鋼材に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 鉄鉱石、窒素、石灰石などを溶鉱炉で融解還元して得られたものを鋳鉄といい、鋳鉄にくず鉄及びくず鋼などを加えて融解して作ったものを銑鉄という。\nB. 銑鉄を転炉などで精製したものを鋼という。鋼の硬さは炭素含有量に関係し、炭素含有量が多くなるほど硬くなる。\nC. 鋼に対する熱処理のうち、焼きならしとは鋼を高温に熱して油中、水中で急冷することであり、焼入れとは鋼を高温に熱した後に空気中で徐冷することである。\nD. 鋼材の記号は、材質、形状・用途、材料の種類・鋼種等を表す値又は強度の最低値を表す。SS400は、材質が鋼（Steel）、用途が構造用圧延材（Structural）、強度の最低値が400 N/mm²を表す。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "銑鉄を転炉などで精製して鋼にし、炭素含有量が増すと一般に鋼は硬くなる。SS400の400は、この鋼材の引張強さの下限400 N/mm²を表す。",
    "choiceExplanations": {
      "ア": "銑鉄を精製して鋼を得るBは妥当である。高炉で鉄鉱石を還元して最初に得るのが銑鉄であり、Aでは銑鉄と鋳鉄の順が逆である。",
      "イ": "Aの銑鉄と鋳鉄の順序は逆である。Cも焼入れの急冷と焼きならしの空冷を取り違えている。",
      "ウ": "Bの鋼と炭素量の説明は妥当である。焼きならしは空冷、焼入れは水や油などによる急冷を伴うため、Cは誤りである。",
      "エ": "銑鉄を転炉などで精製して鋼にし、炭素含有量が増すと一般に鋼は硬くなる。SS400の400は、この鋼材の引張強さの下限400 N/mm²を表す。",
      "オ": "鋼材の記号を説明したDは妥当である。Cでは急冷する焼入れと、空冷する焼きならしを逆にしている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q06",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "農村整備",
    "topicTags": [
      "農道の区分と車道幅員"
    ],
    "difficulty": 2,
    "question": "農道に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "農道は、農業生産基盤及び社会生活基盤としての役割を併せ持っており、その機能で分類した場合、基幹的農道と広域農道に大別される。",
      "イ": "支線農道における路面高は、農業機械の出入りを考慮し、水田地帯では田面より50 cm以上高くし、畑地帯では畑面より30 cm以上高くすることが望ましい。",
      "ウ": "コンクリート舗装は、路体上にコンクリート版を舗装したものであり、路体の支持力と計画交通量に基づき設計する。コンクリート舗装は、一般にアスファルト舗装よりも工事費が安い。",
      "エ": "路体は、舗装及び路面上の荷重を支えるための支持力を必要とし、支持力の大きさはCBR試験又はスランプ試験によって求める。",
      "オ": "農道の車道幅員は一般に、計画交通量により決定される。計画交通量は、将来目標時点の交通量を表すものであり、計画農業交通量と計画一般交通量の合計から成る。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "車道の幅員は、予測した計画交通量などを踏まえて決める。計画交通量には、将来の農業交通と一般交通の両方を含める。",
    "choiceExplanations": {
      "ア": "機能で分類する場合、農道は基幹的農道とほ場内農道に大別される。広域農道は基幹的な農道の整備区分の一つである。",
      "イ": "支線農道の路面高はほ場への出入りや排水を踏まえて計画する。水田で50 cm以上、畑で30 cm以上という高さを一律の望ましい基準としていない。",
      "ウ": "コンクリート舗装とアスファルト舗装は施工条件や維持費などを含めて比較する。コンクリート舗装の初期工事費が一般に安いとする記述は妥当でない。",
      "エ": "土の支持力の評価にはCBR試験が使われる。スランプ試験はフレッシュコンクリートの軟らかさを調べるもので、路体の支持力試験ではない。",
      "オ": "車道の幅員は、予測した計画交通量などを踏まえて決める。計画交通量には、将来の農業交通と一般交通の両方を含める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q07",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "頭首工の施設配置"
    ],
    "difficulty": 2,
    "question": "図は、上から見た頭首工の概略図を示したものであるが、A～Fに当てはまるものの組合せとして最も妥当なのはどれか。\nただし、Aには河川水の流れる向きを示す矢印が入る。",
    "choices": {
      "ア": "↓、魚道、取入れ口、洪水吐、土砂吐、エプロン",
      "イ": "↓、取入れ口、土砂吐、洪水吐、魚道、護床工",
      "ウ": "↓、取入れ口、洪水吐、土砂吐、魚道、エプロン",
      "エ": "↑、魚道、土砂吐、洪水吐、取入れ口、護床工",
      "オ": "↑、取入れ口、洪水吐、土砂吐、魚道、護床工"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図の流れは下向きで、Bは取入れ口である。取入れ口近くに土砂吐C、その隣に洪水吐Dがあり、左端のEは魚道、下流のFは護床工である。",
    "choiceExplanations": {
      "ア": "取入れ口Bは上流側から用水を取り込む位置にある。Eは魚道であり、Fは下流の河床を守る護床工である。",
      "イ": "図の流れは下向きで、Bは取入れ口である。取入れ口近くに土砂吐C、その隣に洪水吐Dがあり、左端のEは魚道、下流のFは護床工である。",
      "ウ": "流れと取入れ口、魚道の位置は妥当である。取入れ口近くのCが土砂吐で、広いDが洪水吐になり、Fは護床工である。",
      "エ": "土砂吐、洪水吐、護床工の位置は妥当である。Fは下流に設けられるので流れは下向きであり、Bが取入れ口、Eが魚道である。",
      "オ": "取入れ口の位置は合っているが、下流の護床工から水の流れは下向きと分かる。Cの土砂吐とDの洪水吐も逆になっている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q07.webp"
    ],
    "imageAltTexts": [
      "頭首工を上から見た概略図で、河川の流れと五つの施設の位置が空欄になっている。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q08",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "流れの性質と損失水頭"
    ],
    "difficulty": 2,
    "question": "水の基本的性質に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "水の密度は、気圧、温度、水の純度などによって変わり、1気圧（大気圧）での純水の密度は約4 ℃のときに最小となる。",
      "イ": "水の分子間には圧力が働いており、各分子を引き離そうとするときに水の圧力により生じる抵抗力を表面張力という。",
      "ウ": "開水路において、フルード数が1より大きい水の流れを常流、フルード数が1より小さい水の流れを射流という。",
      "エ": "水粒子がそれぞれの位置関係を乱すことなく整然と層を成す流れを層流、水粒子が入り乱れて渦を巻く状態の流れを不等流といい、層流か不等流かは、ウェーバー数により識別できる。",
      "オ": "水は完全流体ではないため、流動する際に粘性による摩擦などによってエネルギーを失う。この失われたエネルギーを水頭で表したものを損失水頭という。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "粘性や摩擦などによって流れの力学的エネルギーが失われる。その損失を単位重量当たりの高さに換算した量が損失水頭である。",
    "choiceExplanations": {
      "ア": "温度によって純水の密度は変化する。1気圧では約4 ℃において密度が最小ではなく最大となる。",
      "イ": "表面張力は、液体の表面積を小さくしようとする分子の凝集力に由来する。液体内部の圧力で分子を引き離す際の抵抗の名称ではない。",
      "ウ": "フルード数が1未満の開水路流れは常流、1を超える流れは射流である。説明では大小の対応が逆である。",
      "エ": "流体が渦を含み不規則に混ざる状態は乱流である。層流か乱流かの判定には、主としてレイノルズ数を用いる。",
      "オ": "粘性や摩擦などによって流れの力学的エネルギーが失われる。その損失を単位重量当たりの高さに換算した量が損失水頭である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q09",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "差圧計と静水圧"
    ],
    "difficulty": 2,
    "question": "図のような差圧計におけるA側の圧力（P_A）とB側の圧力（P_B）の差の絶対値として最も妥当なのはどれか。\nただし、重力加速度の大きさを10 m/s²、水の密度（ρ_w）を1.0 g/cm³、水銀の密度（ρ_m）を13.6 g/cm³とする。",
    "choices": {
      "ア": "3.4 kPa",
      "イ": "4.0 kPa",
      "ウ": "4.8 kPa",
      "エ": "34 kPa",
      "オ": "48 kPa"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "左側水銀面での圧力を両側から表すと、P_A＋ρ_w g×0.9＝P_B＋ρ_w g×0.2＋ρ_m g×0.3である。整理するとP_A−P_B＝33.8 kPaで、約34 kPaとなる。",
    "choiceExplanations": {
      "ア": "水銀の密度は13.6 g/cm³、すなわち13,600 kg/m³である。密度の単位をそろえて計算すると、圧力差は3.4 kPaより一桁大きい。",
      "イ": "4.0 kPaはA・Bの高さの差0.4 mに対応する水の圧力差である。水銀面の高さの差による寄与も考慮する。",
      "ウ": "圧力差は容器の高さだけでは決まらない。水銀面の高さの差30 cmと、水銀と水の密度差を使う必要がある。",
      "エ": "左側水銀面での圧力を両側から表すと、P_A＋ρ_w g×0.9＝P_B＋ρ_w g×0.2＋ρ_m g×0.3である。整理するとP_A−P_B＝33.8 kPaで、約34 kPaとなる。",
      "オ": "A側とB側で水柱の長さが異なるので、同じ高さで圧力を比較する。水銀の圧力増分だけでなく水柱の分を符号付きで差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q09.webp"
    ],
    "imageAltTexts": [
      "水と水銀を使う差圧計。A・Bの高さ、および左右の水銀面の位置を示す。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q10",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "台形開水路の径深"
    ],
    "difficulty": 2,
    "question": "図のような台形断面の開水路に水が流れているとき、径深として最も妥当なのはどれか。\nただし、√3＝1.7とする。",
    "choices": {
      "ア": "0.31 m",
      "イ": "0.45 m",
      "ウ": "0.62 m",
      "エ": "0.90 m",
      "オ": "1.0 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水深1 mで各斜面の水平長は√3 m、斜面長は2 mなので、流水断面積は2＋√3≒3.7 m²、潤辺は2＋2×2＝6 mである。径深は3.7/6≒0.62 mとなる。",
    "choiceExplanations": {
      "ア": "径深は流水断面積を潤辺で割った値である。断面積は約3.7 m²、潤辺は6 mなので0.31 mにはならない。",
      "イ": "水に接しているのは底幅2 mと斜面2本である。水面の長さは潤辺に加えない。",
      "ウ": "水深1 mで各斜面の水平長は√3 m、斜面長は2 mなので、流水断面積は2＋√3≒3.7 m²、潤辺は2＋2×2＝6 mである。径深は3.7/6≒0.62 mとなる。",
      "エ": "流水断面積は下底2 m、上底約5.4 m、高さ1 mの台形の面積である。側面と底面を合わせた6 mで割ると0.90 mより小さい。",
      "オ": "1.0 mは水深そのものである。径深は流水断面積を潤辺で割った量であり、この断面では水深とは一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q10.webp"
    ],
    "imageAltTexts": [
      "法面の角度が30度、底幅2 m、水深1 mの台形断面の開水路。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q11",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "土のせん断強さ"
    ],
    "difficulty": 2,
    "question": "次は、土のせん断強さに関する記述であるが、A、B、Cに当てはまるものの組合せとして最も妥当なのはどれか。\n\n「盛土した場合など土に外力が作用すると、土中にせん断応力が発生し、ある面でせん断応力がその抵抗力よりも大きくなると、その面に沿って滑りが生じて破壊することがある。このせん断抵抗の最大値をせん断強さという。\nここで、\nc：粘着力［kN/m²］\nσ：破壊面に働く垂直応力［kN/m²］\nφ：せん断抵抗角（内部摩擦角）［°］\nとするとき、土のせん断強さτ［kN/m²］は、クーロンの式［A］により表すことができる。\nいま、ある土の供試体を用いて一面せん断試験を行ったところ、表のような測定結果が得られた。このとき、この土の粘着力は［B］［kN/m²］、せん断抵抗角の正接（tan φ）は［C］となる。」",
    "choices": {
      "ア": "τ＝c＋σ/tan φ、−33、0.6",
      "イ": "τ＝c＋σ/tan φ、20、1.7",
      "ウ": "τ＝c＋σ/tan φ、30、1.7",
      "エ": "τ＝c＋σtan φ、−33、1.7",
      "オ": "τ＝c＋σtan φ、20、0.6"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "クーロンの式は τ＝c＋σtan φ である。測定した二点の差からtan φ＝0.6、これを一点に代入してc＝20 kN/m²を得る。",
    "choiceExplanations": {
      "ア": "0.6は測定値から求まる勾配である。垂直応力に掛けるのはtan φであり、それで割る式ではない。",
      "イ": "粘着力20 kN/m²は正しい。一方、垂直応力が100 kN/m²増すとせん断強さが60 kN/m²増すので、正接は1.7ではなく0.6である。",
      "ウ": "せん断強さは垂直応力とtan φの積に粘着力を加えて表す。表の二点の傾きは0.6で、切片は30ではなく20になる。",
      "エ": "式の形は正しいが、表の二点を結んだ傾きは(140−80)/(200−100)＝0.6である。切片も80−100×0.6＝20になる。",
      "オ": "クーロンの式は τ＝c＋σtan φ である。測定した二点の差からtan φ＝0.6、これを一点に代入してc＝20 kN/m²を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q11.webp"
    ],
    "imageAltTexts": [
      "一面せん断試験の測定値。垂直応力100、200 kN/m²に対して、せん断強さは80、140 kN/m²。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q12",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "粒径加積曲線と均等係数"
    ],
    "difficulty": 2,
    "question": "次は、土の粒度に関する記述であるが、A～Dに当てはまるものの組合せとして最も妥当なのはどれか。\n\n「粒度試験の結果を用いて、横軸に対数目盛で粒径を、縦軸に普通目盛で通過質量百分率をとり、プロットして曲線で結んだものを粒径加積曲線という。図の①、②、③の曲線を比較すると、①は［A］粒子が多く、②は［B］粒子が多く、③は各粒径の土粒子を広範囲に含んでいることが分かる。\n一方、粒度の特徴を表す指数として有効径、均等係数、曲率係数がある。このうち、均等係数U_cは、粒径加積曲線の傾きを表すものであり、通過質量百分率60％の粒径に相当するD₆₀と通過質量百分率10％の粒径に相当するD₁₀を用いて、U_c＝［C］のように表され、一般に、U_c≧10の土は［D］としている。」",
    "choices": {
      "ア": "細かい、粗い、D₆₀/D₁₀、粒度が良い",
      "イ": "細かい、粗い、D₆₀/D₁₀、粒度が悪い",
      "ウ": "細かい、粗い、D₁₀/D₆₀、粒度が良い",
      "エ": "粗い、細かい、D₆₀/D₁₀、粒度が良い",
      "オ": "粗い、細かい、D₁₀/D₆₀、粒度が悪い"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "右にある①は粗い粒子、左にある②は細かい粒子が多い。均等係数D₆₀/D₁₀が十分に大きい土は、幅広い粒径を含み粒度が良いとされる。",
    "choiceExplanations": {
      "ア": "均等係数の式は妥当である。右に寄っている①は同じ通過割合での粒径が大きく、粗い粒子が多い。",
      "イ": "①の方が粗い粒子が多い。D₆₀/D₁₀が大きいと粒径の範囲が広いため、一般に粒度は良いと判断する。",
      "ウ": "①では同じ通過割合でも②より横軸の粒径が大きい。均等係数は大きい方の粒径D₆₀をD₁₀で割る。",
      "エ": "右にある①は粗い粒子、左にある②は細かい粒子が多い。均等係数D₆₀/D₁₀が十分に大きい土は、幅広い粒径を含み粒度が良いとされる。",
      "オ": "粒子の粗細は合っている。均等係数の分子はD₆₀であり、10以上の土をこの設問では粒度が良いとしている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q12.webp"
    ],
    "imageAltTexts": [
      "通過質量百分率と粒径の関係を示す三本の粒径加積曲線。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q13",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "定水位透水試験"
    ],
    "difficulty": 2,
    "question": "次は、土の透水性に関する記述であるが、A、Bに当てはまるものの組合せとして最も妥当なのはどれか。\nただし、円周率は3とする。\n\n「定水位透水試験において、透水係数kは、ダルシーの法則により以下の式で表される。式中のQは透水量、Aは土試料の断面積、tは透水時間、Iは［A］である。\nk＝Q/(A×t×I)\n図のように、高さが15 cm、直径が10 cmの円筒形の土の供試体を用いて、水位差を5 cmに保って、定水位透水試験を行ったところ、5分間で450 cm³の透水量が測定された。この土の飽和透水係数は［B］となる。」",
    "choices": {
      "ア": "動水勾配、6.7×10⁻³ cm/s",
      "イ": "動水勾配、1.5×10⁻² cm/s",
      "ウ": "動水勾配、6.0×10⁻² cm/s",
      "エ": "限界勾配、1.5×10⁻² cm/s",
      "オ": "限界勾配、6.0×10⁻² cm/s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Iは水頭差を試料長で割る動水勾配である。450/(75×300×(5/15))＝0.060 cm/sとなる。",
    "choiceExplanations": {
      "ア": "Iは動水勾配である。水位差5 cmを試料長15 cmで割った1/3を使い、450 cm³を断面積、時間、勾配の積で割る。",
      "イ": "断面積に使うのは直径の半分の5 cmである。断面積75 cm²を使うと透水係数は1.5×10⁻² cm/sより大きい。",
      "ウ": "Iは水頭差を試料長で割る動水勾配である。450/(75×300×(5/15))＝0.060 cm/sとなる。",
      "エ": "限界勾配は、浸透力で土粒子が不安定になるときの勾配である。ダルシーの式に入るIは、試験時にかかっている動水勾配である。",
      "オ": "透水係数の値は正しい。Iに当たるのは水頭差5 cmを試料長15 cmで割った動水勾配である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q13.webp"
    ],
    "imageAltTexts": [
      "定水位透水試験の模式図。供試体の高さ15 cm、直径10 cm、水位差5 cm。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q14",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "農地保全",
    "topicTags": [
      "水食・風食・地すべり"
    ],
    "difficulty": 2,
    "question": "農地保全に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 水食は、主に傾斜地において、雨水・雪解け水及び凍結土の融解水により土粒子が運び去られる現象であり、リル侵食、ガリ侵食、面状侵食と進むにつれて、侵食の程度が大きくなる。\nB. 地表流出水を集水路で遮断、捕捉して承水路に導き、承水路から支線排水路へ排出するなど排水路網を合理的に配置することは、水食を防止する上で有効な対策の一つである。\nC. 風食は、強風によって地表の土粒子が移動、飛散する現象である。火山灰・砂質土壌は、乾燥しやすく、風食の影響を受けやすい。\nD. 地すべり防止対策工には、地すべりを促す要因となるものを除去又は軽減することで間接的に安定させる抑制工と、地すべりに抵抗力を加えることで直接的に安定させる抑止工がある。",
    "choices": {
      "ア": "A、C",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "乾きやすい火山灰土や砂質土は風で運ばれやすい。地すべり対策では排水などの抑制工が移動を促す要因を減らし、杭などの抑止工が直接抵抗力を与える。",
    "choiceExplanations": {
      "ア": "Cは妥当である。水食の程度は一般に面状侵食、リル侵食、ガリ侵食の順に大きくなり、Aはその順が違う。",
      "イ": "Dは妥当である。面状侵食は地表が薄く削られる段階であり、ガリ侵食の後の段階とするAは誤りである。",
      "ウ": "火山灰や砂質土が風食を受けやすいというCは妥当である。承水路は斜面の表面流を受け止めて排水へ導くため、Bは集水路と承水路の役割の順を誤っている。",
      "エ": "表面流をさえぎる施設は承水路である。地すべり要因を除く抑制工と、抵抗を加える抑止工を区別したDは正しい。",
      "オ": "乾きやすい火山灰土や砂質土は風で運ばれやすい。地すべり対策では排水などの抑制工が移動を促す要因を減らし、杭などの抑止工が直接抵抗力を与える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q15",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "農村環境",
    "topicTags": [
      "環境影響のミティゲーション"
    ],
    "difficulty": 2,
    "question": "環境への影響を緩和するための手段（ミティゲーション）5原則に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 農業農村整備事業を実施するに当たっては、事業の実施による環境への影響を考慮し、5原則のうち、まずは「最小化」の原則に基づき、検討を行う。\nB. 用水路の整備に当たって、水辺の生物が生息・生育可能な自然石や自然木を利用することは、「代償」の原則に基づくものである。\nC. 水路のネットワークを分断している落差工を改修する際に、魚道を新たに設置することは、「修正」の原則に基づくものである。\nD. 魚類の越冬場所になっているようなため池を現況のまま保全することは、「回避」の原則に基づくものである。",
    "choices": {
      "ア": "A、C",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "落差工で分断されていた移動経路を魚道でつなぐのは修正に当たる。越冬場所のため池をそのまま残し、改変による影響を避けるのは回避である。",
    "choiceExplanations": {
      "ア": "魚の移動経路を魚道で回復するCは修正に当たる。最初に検討するのは影響を避けられるかどうかである。",
      "イ": "現状のため池を残すDは回避である。まず回避を検討し、それができない場合に最小化を考える。",
      "ウ": "魚道を設けて分断された移動経路を回復するのは修正による対策である。水路に自然素材を用いて改変の影響を抑えるBは代償ではない。",
      "エ": "ため池を改変せず残すDは妥当である。自然素材を使うBは現地の影響を小さくする方法であり、失われる環境の代わりを設ける代償とは異なる。",
      "オ": "落差工で分断されていた移動経路を魚道でつなぐのは修正に当たる。越冬場所のため池をそのまま残し、改変による影響を避けるのは回避である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q16",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "農地整備",
    "topicTags": [
      "農地の土層改良"
    ],
    "difficulty": 2,
    "question": "農地の土層改良に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "床締めは、レーキドーザやリッパドーザを用いて土層を締め固め、浸透を抑制する工法である。床締めの工法は、大きく表土締めと心土締めに分けられ、締固め効果は表土締めの方が大きい。",
      "イ": "心土破砕耕は、火山灰質土や砂質土のように透水性が大きい土層を破砕し、膨満にして、透水性を小さくする工法である。",
      "ウ": "混層耕は、肥沃な作土と劣悪な下層土がある場合に、これらに耕起、混和、反転などを行って、作土の理化学性を改良する工法である。",
      "エ": "湛水埋込み工法とは、除れき工法の一種であり、水田を湛水してストーンピッカーで石れきを細かく破砕し、ストーンクラッシャーで石れきを下層に沈積させる工法である。",
      "オ": "客土は、他の場所からほ場へ土壌を運搬して作土に混ぜ、土層の理化学性を改良する工法であり、作土の厚さが不足しているとき、土性が不適当なときや水田の漏水が大きいときなどに行う。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "客土はほ場外から運んだ適切な土を使って作土を改良する。作土が薄い、土性が不適切、漏水が大きいといった条件への対策となる。",
    "choiceExplanations": {
      "ア": "床締めは浸透を抑えるための工法だが、心土締めは下層に締め固めた層を設ける。表土締めの方が締固め効果が大きいとする説明は妥当でない。",
      "イ": "心土破砕は、締まって透水性の低い心土などをほぐすことで、透水性や根の伸長を改善する。透水性の高い土を破砕して透水性を落とす手法ではない。",
      "ウ": "劣悪な下層土を良質な作土にそのまま混ぜると、作土を劣化させるおそれがある。混層耕は混ぜる土層の性質を考慮して行う。",
      "エ": "石を破砕する機械はストーンクラッシャーで、ストーンピッカーは石を拾い集める機械である。記述の二機種の役割は取り違えられている。",
      "オ": "客土はほ場外から運んだ適切な土を使って作土を改良する。作土が薄い、土性が不適切、漏水が大きいといった条件への対策となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q17",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "基礎工学",
    "topicTags": [
      "基礎の種類と杭の圧入"
    ],
    "difficulty": 2,
    "question": "基礎工に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "基礎工の設計に当たっては、上部構造物の自重に相当する活荷重や列車など時間の経過とともに変動する死荷重のほか、地震の影響や洪水などによる一時的な偶発荷重などを考える必要がある。",
      "イ": "基礎工は、支持力がある基礎地盤が浅い場合は杭基礎やケーソン基礎が、基礎地盤が深い場合には直接基礎が、それぞれ用いられることが一般的である。",
      "ウ": "杭基礎は、場所打ち（現場打ち）コンクリート杭を用いる支持杭と、鋼管杭などの鋼製の既製杭を用いる摩擦杭に分けられ、どちらも強固な地盤まで杭を打ち込んで構造物を支える基礎である。",
      "エ": "既製杭の打込み工法の一つである圧入工法は、オイルジャッキで杭を圧入するため、無騒音・無振動であるが、大きな押込み反力を得るために機械重量が大きくなる。",
      "オ": "べた基礎はフーチング基礎とも呼ばれ、中空の構造物を地上で構築し、その内部の土砂を掘削・排土しながら地中に沈下させ、支持力がある基礎地盤に到達させる基礎である。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "圧入工法では油圧ジャッキで静的に杭を押し込み、打撃による騒音や振動を抑えられる。押込みのための大きな反力を確保する必要がある。",
    "choiceExplanations": {
      "ア": "構造物の自重は死荷重に当たる。列車など時間とともに位置や大きさが変わる荷重の方が活荷重である。",
      "イ": "浅い位置に十分な支持地盤があるなら直接基礎を使える。基礎地盤が深い場合の杭基礎やケーソン基礎と、対応が逆になっている。",
      "ウ": "支持杭と摩擦杭は材質ではなく荷重を支持する仕組みで区別する。摩擦杭は杭周面と地盤との摩擦を利用する。",
      "エ": "圧入工法では油圧ジャッキで静的に杭を押し込み、打撃による騒音や振動を抑えられる。押込みのための大きな反力を確保する必要がある。",
      "オ": "地上で作った中空の構造体を掘削とともに沈下させるのはケーソン基礎である。べた基礎は建物の底面全体で荷重を受ける直接基礎である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q18",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "コンクリートの施工と材料"
    ],
    "difficulty": 2,
    "question": "コンクリートに関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "AEコンクリートは、内部に微小な空気泡を含んでいるため、凍結融解の繰り返しにより発生する凍害に対する耐久性が高い。",
      "イ": "日平均気温が35 ℃以上の場合に施工するコンクリートを、暑中コンクリートという。フレッシュコンクリートは高温になると凝結・硬化が遅くなるため、練混ぜ水に冷水や氷を加える。",
      "ウ": "PC鋼材にあらかじめ圧縮力を与えて、その鋼材が元に戻ろうとする力を利用してコンクリート中に圧縮応力を導入するものを、プレパックドコンクリートという。",
      "エ": "鋼製型枠は、水密性が良いため良質なコンクリートができるが、変形しやすいため、転用回数が少ない。一方、木製型枠は、加工がしやすく、軽量で組立解体が容易なため、転用回数が多い。",
      "オ": "コンクリートを連続して打ち込むことが不可能な場合は、硬化したコンクリートの表面を清掃し、減水剤で十分乾燥させた上で、直接、新しいコンクリートを打ち継がなければならない。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "AEコンクリートに含まれる微細な独立気泡は、水の凍結で生じる圧力を逃がす。そのため凍結融解の繰返しに対する耐久性が高い。",
    "choiceExplanations": {
      "ア": "AEコンクリートに含まれる微細な独立気泡は、水の凍結で生じる圧力を逃がす。そのため凍結融解の繰返しに対する耐久性が高い。",
      "イ": "暑中コンクリートの扱いは一般に日平均気温が25 ℃を超えるような条件で検討される。高温では凝結が遅くなるのではなく速く進むので、打込み温度を管理する。",
      "ウ": "PC鋼材に引張力を導入してコンクリートを締め付けるのはプレストレストコンクリートである。プレパックドコンクリートは、先に置いた骨材の間にモルタルを注入して作る。",
      "エ": "鋼製型枠は剛性と耐久性が高く、繰り返し使用しやすい。木製型枠は加工しやすいが、転用回数が鋼製より多いという説明は一般的でない。",
      "オ": "打継ぎでは古い表面の脆弱な部分を除き、清掃などの処理をする。減水剤で表面を乾燥させるという手順ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q19",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "地山と締固め後の土量変化"
    ],
    "difficulty": 2,
    "question": "砂質土を締め固めて1000 m³の盛土を造成する際に必要となる地山土量V₁［m³］及びほぐした土量V₂［m³］の組合せとして最も妥当なのはどれか。\nただし、この砂質土のほぐし率を1.200、締固め率を0.900とする。",
    "choices": {
      "ア": "833 m³、926 m³",
      "イ": "833 m³、750 m³",
      "ウ": "900 m³、1080 m³",
      "エ": "1111 m³、1200 m³",
      "オ": "1111 m³、1333 m³"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "地山での体積は1000/0.900≒1111 m³となる。その1.200倍がほぐした土量なので約1333 m³となる。",
    "choiceExplanations": {
      "ア": "締固め率0.900は締固め後の体積を地山の体積で割った値である。造成したい体積1000 m³をこの値で割るので、地山土量は833 m³ではない。",
      "イ": "ほぐした土量を求めるときは地山土量に1.200を掛ける。ほぐした後の土は地山より体積が大きくなる。",
      "ウ": "900 m³は求める盛土量に締固め率を掛けた値である。盛土量から必要な地山土量に戻すには、0.900で割る。",
      "エ": "地山土量約1111 m³は妥当である。これにほぐし率1.200を掛けるので、ほぐした土量は1200 m³ではない。",
      "オ": "地山での体積は1000/0.900≒1111 m³となる。その1.200倍がほぐした土量なので約1333 m³となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q20",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "トンネルの施工法"
    ],
    "difficulty": 2,
    "question": "トンネル工に関する記述のうち最も妥当なのはどれか。",
    "choices": {
      "ア": "矢板工法は、トンネルを掘削した後、トンネルが崩れないよう、FRPと硬質塩化ビニル管を用いた支保工でトンネル壁面を押さえ、その内側を鋼製矢板で覆う工法である。",
      "イ": "シールド工法は、トンネルを掘削した後、鋼製支保工で壁面を押さえ付け、コンクリートを吹き付け、ロックボルトを打ち込む工法である。",
      "ウ": "沈埋工法は、水底をトンネルの深さ分だけ掘り下げ、地上で構築したボックスカルバートなどを水中に沈めて接続した後、埋め戻す工法である。",
      "エ": "NATM工法は、カッターの付いた円筒状の機械で土中を掘削しながら、機械内部から鋼製又はコンクリート製ブロックを組み立て、覆工や裏込剤の注入を行い、トンネルを構築する工法である。",
      "オ": "開削工法は、地表面から掘削してトンネルを構築し、埋め戻す工法であり、一般に、都市部や平野部の比較的深い部分でのトンネル構築に採用されるため、特殊な掘削機械を必要とする。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水底に溝を掘り、陸上で製作した函体を水中に沈めて結合するのが沈埋工法である。構造体の接続後に周囲を埋め戻す。",
    "choiceExplanations": {
      "ア": "矢板工法は支保工と矢板で掘削面を支える工法である。FRPと硬質塩化ビニル管を支保工に用いることが工法の定義ではない。",
      "イ": "吹付けコンクリートやロックボルトを組み合わせ、周囲の地山を安定させる方法はNATMである。シールドは筒状の掘削機を使って進む。",
      "ウ": "水底に溝を掘り、陸上で製作した函体を水中に沈めて結合するのが沈埋工法である。構造体の接続後に周囲を埋め戻す。",
      "エ": "筒状の機械で掘削し、内部でセグメントを組み立てる方法はシールド工法である。NATMは地山を吹付けコンクリートやロックボルトで補強する。",
      "オ": "地表から掘削して構造物を造り埋め戻す点は妥当である。開削工法は比較的浅い場所で採用されることが多く、特殊な深部掘削機械を前提にしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q21",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "バックホウの掘削作業量"
    ],
    "difficulty": 2,
    "question": "バケット容量0.8 m³のバックホウで地山を掘削する場合の1時間当たりの作業量（地山換算）として最も妥当なのはどれか。\nただし、土質は粘性土で、ほぐし率を1.30とし、作業効率を0.55、バケット係数を0.60、サイクルタイムを30秒とする。",
    "choices": {
      "ア": "12.2 m³/h",
      "イ": "24.4 m³/h",
      "ウ": "55.4 m³/h",
      "エ": "67.8 m³/h",
      "オ": "80.6 m³/h"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "1時間のサイクル数は3600/30＝120である。容量、係数、効率を掛けた0.8×120×0.60×0.55をほぐし率1.30で割り、約24.4 m³/hとなる。",
    "choiceExplanations": {
      "ア": "1時間に120サイクルあり、効率とバケット係数で補正しても、ほぐした状態では31.68 m³となる。地山換算で1.30で割ると12.2 m³/hより大きい。",
      "イ": "1時間のサイクル数は3600/30＝120である。容量、係数、効率を掛けた0.8×120×0.60×0.55をほぐし率1.30で割り、約24.4 m³/hとなる。",
      "ウ": "実際の掘削量には、バケット係数だけでなく作業効率も掛ける必要がある。地山の体積へ直すときは、さらにほぐし率で割る。",
      "エ": "バケット容量を全サイクルにそのまま掛けると過大になる。充填の程度と有効に作業できる時間の割合を両方反映する。",
      "オ": "地山換算では、ほぐした状態の体積にほぐし率を掛けずに割る。換算後の体積はほぐした体積より小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q22",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "変動係数による品質比較"
    ],
    "difficulty": 2,
    "question": "次は、品質管理に関する記述であるが、A、Bに当てはまるものの組合せとして最も妥当なのはどれか。\n\n「標準偏差を［A］で除した値を変動係数という。ある工場でコンクリート側溝と鋼管を製造しており、それぞれからサンプルを三つずつ抜き出してコンクリート側溝の圧縮強度と鋼管の内径を測定したところ、表のような結果が得られた。それぞれの変動係数を計算すると、［B］の方が、測定結果のばらつきが小さいといえる。」",
    "choices": {
      "ア": "最大値、鋼管の内径",
      "イ": "最大値、コンクリート側溝の圧縮強度",
      "ウ": "最小値、鋼管の内径",
      "エ": "平均値、鋼管の内径",
      "オ": "平均値、コンクリート側溝の圧縮強度"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "変動係数は標準偏差を平均値で割った値である。平均25のコンクリート側溝は約0.098、平均1000の鋼管は約0.051となるので、鋼管の内径の方が小さい。",
    "choiceExplanations": {
      "ア": "鋼管の内径の方が、測定値の大きさに対する相対的なばらつきは小さい。変動係数の分母は最大値ではなく平均値である。",
      "イ": "分母に使うのは平均値である。無次元の変動係数で比較すると、コンクリート側溝の圧縮強度の方が相対的なばらつきは大きい。",
      "ウ": "鋼管の内径を選ぶ点は妥当である。データの規模をそろえるには、標準偏差を最小値ではなく平均値で割る。",
      "エ": "変動係数は標準偏差を平均値で割った値である。平均25のコンクリート側溝は約0.098、平均1000の鋼管は約0.051となるので、鋼管の内径の方が小さい。",
      "オ": "分母に平均値を使う点は正しい。相対的なばらつきは、コンクリート側溝の圧縮強度より鋼管の内径の方が小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q22.webp"
    ],
    "imageAltTexts": [
      "コンクリート側溝三試料の圧縮強度と、鋼管三試料の内径の測定結果。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q23",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "請負工事費の内訳"
    ],
    "difficulty": 2,
    "question": "図は、一般的な請負工事費の構成について示したものである。A～Dに当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "一般管理費等、直接工事費、間接工事費、現場管理費",
      "イ": "一般管理費等、間接工事費、直接工事費、現場管理費",
      "ウ": "現場管理費、直接工事費、間接工事費、一般管理費等",
      "エ": "現場管理費、間接工事費、直接工事費、一般管理費等",
      "オ": "間接工事費、現場管理費、直接工事費、一般管理費等"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "工事価格は工事原価に一般管理費等を加えたものである。工事原価は直接工事費と間接工事費から成り、後者は共通仮設費と現場管理費に分かれる。",
    "choiceExplanations": {
      "ア": "工事価格は工事原価に一般管理費等を加えたものである。工事原価は直接工事費と間接工事費から成り、後者は共通仮設費と現場管理費に分かれる。",
      "イ": "AとDは妥当である。純工事費は直接工事費に共通仮設費を加えたものであり、BとCは逆である。",
      "ウ": "BとCは妥当である。工事原価に加えて工事価格を構成するAは一般管理費等であり、現場管理費はDに入る。",
      "エ": "工事原価と合算するAは一般管理費等である。共通仮設費と現場管理費の合計が間接工事費となりCに入る。",
      "オ": "間接工事費は工事価格のAに直接入るのではなく、工事原価の一部になる。工事原価に足すAは一般管理費等である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q23.webp"
    ],
    "imageAltTexts": [
      "請負工事費から工事価格、工事原価および各費目に分岐する構成図。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q24",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "管水路と開水路"
    ],
    "difficulty": 2,
    "question": "農業用水路に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "管水路は、圧力管による水路形式であり、流量が少なく地形が複雑な場合などに用いられる。圧送の方法は、自然落差を利用する場合又はポンプを用いる場合がある。",
      "イ": "管水路のうち、オープンタイプとは、上流から末端まで連続した閉管水路で構成された管路であり、末端の給水管を開くことにより、所要の水量及び水圧を得ることができる形式である。",
      "ウ": "管水路のうち、クローズドタイプとは、水路中の水頭が低下しても、分水位が得られるように、一定区間ごとに自由水面を持つ分水スタンドを配置し、これを分水工又は放流工とする形式である。",
      "エ": "開水路は、流況が安定していることから、途中で越流するリスクは少なく、フリーボード（余裕高）を設ける必要はないが、水撃圧の発生に備えて、保護施設が必要となる。",
      "オ": "開水路は、地盤のせん断抵抗角が小さい場合、長方形又はそれに近い断面形とすることが多い。また、流速が遅すぎると、土砂の堆積など流水障害が生じるため、必要に応じて落差工を設置する。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "圧力管を用いると複雑な地形をまたぐ場合にも水を送れる。圧力を得る方法には標高差を使う方法とポンプを使う方法がある。",
    "choiceExplanations": {
      "ア": "圧力管を用いると複雑な地形をまたぐ場合にも水を送れる。圧力を得る方法には標高差を使う方法とポンプを使う方法がある。",
      "イ": "自由水面を持たず末端まで連続する管水路はクローズドタイプである。記述はオープンタイプと取り違えている。",
      "ウ": "途中に自由水面を持つ分水スタンドを設けるのはオープンタイプに当たる。クローズドタイプは上流から下流まで閉管が連続する。",
      "エ": "開水路では水位変動や波を考えて水面上に余裕高を取る。管内の急な流速変化に伴う水撃は、主に閉じた圧力管で問題になる。",
      "オ": "地盤のせん断抵抗が小さい場合、側面の安定を確保するために斜面を設ける断面などを検討する。低流速への対策として落差工を設けるという一般化も適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q25",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "ダムの構造と用途"
    ],
    "difficulty": 2,
    "question": "ダムの種類と特徴に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "複合ダムとは、農業、上水道、工業用水、発電、防災など複数の用途に使用するために建設されるダムである。",
      "イ": "フィルダムは、土砂や岩塊などの自然材料を盛り上げてつくった部分を主体とするダムであるが、変形に対する追随性が悪いため、コンクリートダムに比べて基礎地盤が強固である必要がある。",
      "ウ": "表面遮水壁型フィルダムは、堤体の下流斜面を土質材料以外の遮水材料で舗装した形式のダムである。",
      "エ": "重力式コンクリートダムは、堤体への水圧やその他の荷重を、水平なアーチ作用と鉛直な片持ちばり作用により、両岸と下方の岩盤に伝達し抵抗する構造のダムである。",
      "オ": "地下ダムは、地下水流のある空隙率の大きい地層に止水壁を設置して、地下水の流れをせき止めて貯留し、地下水を安定的に利用するダムである。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "地下ダムは透水性のある地層に止水壁を設ける。地下水の流れを止めて貯留し、必要時に利用しやすくする施設である。",
    "choiceExplanations": {
      "ア": "複数の使い道に供するダムは多目的ダムである。複合ダムという名称は異なる構造形式を組み合わせたものに使う。",
      "イ": "自然の土や岩を盛り立てるフィルダムは、比較的変形に追随しやすい。コンクリートダムより常に強固な基礎地盤を要するという関係ではない。",
      "ウ": "貯水と接する上流斜面を遮水材料で覆うのが表面遮水壁型である。遮水面を下流とする記述が誤りである。",
      "エ": "アーチ作用で水圧を両岸へ伝えるのはアーチダムの説明である。重力式コンクリートダムでは、主に堤体の自重で荷重に抵抗する。",
      "オ": "地下ダムは透水性のある地層に止水壁を設ける。地下水の流れを止めて貯留し、必要時に利用しやすくする施設である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q26",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "ウォーターフットプリント"
    ],
    "difficulty": 2,
    "question": "水資源・農業用水に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "地球上に存在する水の量の約7割が海水等、約3割が淡水となっている。淡水の大部分は、河川や湖沼の水として存在している。",
      "イ": "ある製品が生産されてから消費されるまでのライフサイクルにおいて、直接的、間接的に消費又は汚染された水の総合計量をウォーターフットプリントという。",
      "ウ": "我が国の水使用量（取水量ベース）のうち、農業用水は約3割を占めており、水田の大区画化や畑地かんがい施設の整備が進むに伴い、農業用水の水使用量は増加傾向となっている。",
      "エ": "我が国は、多雨地帯であるアジアモンスーン地帯に位置し、年平均降水量は3,000 mmとなっており、これは世界の年平均降水量の約30倍である。",
      "オ": "ため池は、降水量が少ない地域などで農業用水を確保するため人工的に造成された池である。我が国のため池は、主に東日本に分布しており、その多くは高度経済成長期にかけて造成された。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ウォーターフットプリントは製品などのライフサイクルにわたる水の消費や汚染の量を示す。直接使用した水に加え、原材料の生産などに伴う間接的な使用も含める。",
    "choiceExplanations": {
      "ア": "地球上の水の大部分は海水で、淡水は数％にすぎない。その淡水の多くは氷河や地下水として存在する。",
      "イ": "ウォーターフットプリントは製品などのライフサイクルにわたる水の消費や汚染の量を示す。直接使用した水に加え、原材料の生産などに伴う間接的な使用も含める。",
      "ウ": "日本では取水量のうち農業用水が大きな割合を占め、約3割より高い。農業用水量が近年一貫して増加しているという記述も当たらない。",
      "エ": "日本の平均降水量は世界平均より多いが、30倍には達しない。日本の年平均を3,000 mmとする値も過大である。",
      "オ": "ため池は、降水の少ない地域で農業用水を確保するために古くから造成されてきた。分布は西日本にも多く、その多くを高度経済成長期の造成とする記述は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q27",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "水田かんがいの計画取水量"
    ],
    "difficulty": 2,
    "question": "図は、水田かんがい用水量（計画取水量）の構成を示したものであるが、A～Eに当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "地区内利用可能量、純用水量、粗用水量、有効雨量、施設管理用水量",
      "イ": "地区内利用可能量、粗用水量、純用水量、施設管理用水量、有効雨量",
      "ウ": "有効雨量、純用水量、粗用水量、地区内利用可能量、施設管理用水量",
      "エ": "有効雨量、粗用水量、純用水量、施設管理用水量、地区内利用可能量",
      "オ": "施設管理用水量、粗用水量、純用水量、地区内利用可能量、有効雨量"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ほ場単位用水量から有効雨量Eを引いたCが純用水量である。これに施設管理用水量Dを加えて粗用水量Bを求め、地区内利用可能量Aを差し引く。",
    "choiceExplanations": {
      "ア": "計画取水量から差し引くAは地区内利用可能量である。Bは施設管理用水量を含む粗用水量で、Cが純用水量となる。",
      "イ": "ほ場単位用水量から有効雨量Eを引いたCが純用水量である。これに施設管理用水量Dを加えて粗用水量Bを求め、地区内利用可能量Aを差し引く。",
      "ウ": "有効雨量はほ場で必要となる水量を減らすのでEに入る。粗用水量Bから差し引くAは、地区内で利用できる水の量である。",
      "エ": "粗用水量と純用水量、施設管理用水量の位置は合っている。有効雨量はほ場単位で差し引き、最終的な取水量から差し引く方は地区内利用可能量である。",
      "オ": "有効雨量をEとする点は正しい。粗用水量を増やす量Dが施設管理用水量であり、地区内利用可能量はAに入る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q27.webp"
    ],
    "imageAltTexts": [
      "水田かんがいの計画取水量を求めるための構成図。五つの用水・雨水の項目が空欄になっている。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q28",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "農業排水",
    "topicTags": [
      "暗きょ排水の構成"
    ],
    "difficulty": 2,
    "question": "暗きょ排水に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 暗きょ管内の平均流速は、管周辺の土砂の吸出しや泥土の堆積などが生じない流速を確保することが望ましい。\nB. 排水口は、暗きょ排水の吐け口であり、その位置と構造が排水の効果に大きく影響を与えるため、地形や勾配などを考えて配置する必要がある。\nC. 吸水きょは、地区外から浸入する地下水を集めるため、地区の周辺に設ける暗きょで、集水きょに接続するか、直接排水路に排水する。\nD. 承水きょは、排水対象地区全域にまんべんなく配置されて、地下停滞水を直接収容させる部分であり、この部分の排水能力の良否が排水の効果を支配する。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "B、D"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "暗きょ管は、堆積や周辺の土砂の吸出しを起こさない流速になるようにする。吐け口の位置や構造も地形と勾配に応じて決める必要がある。",
    "choiceExplanations": {
      "ア": "暗きょ管は、堆積や周辺の土砂の吸出しを起こさない流速になるようにする。吐け口の位置や構造も地形と勾配に応じて決める必要がある。",
      "イ": "管内の流速に関するAは妥当である。地区外から入る地下水をさえぎるのは承水きょであり、吸水きょではない。",
      "ウ": "流速を適切に確保するAは妥当である。地区に広く配置して地下水を直接集めるのは、Dが挙げた承水きょではなく吸水きょである。",
      "エ": "排水口の位置と構造についてのBは妥当である。地区周辺で外からの水を受ける役割は承水きょに当たる。",
      "オ": "排水口の説明は正しい。地区全域の地下停滞水を集める機能を持つのは吸水きょなので、Dが誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q29",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "農業排水",
    "topicTags": [
      "水田の浸水被害と計画基準内水位"
    ],
    "difficulty": 2,
    "question": "次は、排水計画に関する記述であるが、A～Eに当てはまるものの組合せとして最も妥当なのはどれか。\n\n「水稲の浸水被害が最も大きい時期は、一般に［A］頃であり、浸水期間が［B］までであれば、被害は比較的軽いが、これを超えると急に大きくなるといわれている。洪水時排水計画における計画基準内水位は、洪水のピーク水位時における許容上限水位である。水田の排水計画では、たん水を許容しているため、原則として受益区域内の［C］ほ場面標高に許容たん水深を加えた高さを計画基準内水位としている。このときの許容たん水深は［D］を標準としており、これを超えてたん水する場合、その継続時間は［E］以内としている。」",
    "choices": {
      "ア": "穂ばらみ期、1～2日、最高、60 cm、48時間",
      "イ": "穂ばらみ期、1～2日、最低、30 cm、24時間",
      "ウ": "穂ばらみ期、3～4日、最低、60 cm、72時間",
      "エ": "分げつ期、1～2日、最高、10 cm、24時間",
      "オ": "分げつ期、3～4日、最低、30 cm、72時間"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "浸水の影響は穂ばらみの頃に大きく、一般に1～2日までなら比較的軽い。受益区域の最低ほ場面に30 cmを加えて基準とし、それを超えるたん水は24時間以内とする。",
    "choiceExplanations": {
      "ア": "穂ばらみ期と浸水期間1～2日の組合せは妥当である。基準に使うのは区域内で最も低いほ場で、標準の許容たん水深は30 cmである。",
      "イ": "浸水の影響は穂ばらみの頃に大きく、一般に1～2日までなら比較的軽い。受益区域の最低ほ場面に30 cmを加えて基準とし、それを超えるたん水は24時間以内とする。",
      "ウ": "穂ばらみ期と最低ほ場面は妥当である。被害が比較的軽い期間を3～4日、標準の水深を60 cmとするのは長過ぎ、大き過ぎる。",
      "エ": "水稲が特に浸水の影響を受けるのは穂ばらみの頃である。水位の基準も最高ほ場面ではなく最低ほ場面から設定する。",
      "オ": "最低ほ場面と30 cmは妥当である。被害を受けやすい時期は分げつ期ではなく穂ばらみ期で、標準水深を超える場合は24時間以内とする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q30",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "GNSS測量の仕組みと誤差"
    ],
    "difficulty": 2,
    "question": "GNSS測量に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. GNSSは、宇宙空間から電波を発信するGPSなどの人工衛星、人工衛星の軌道の監視と制御を行う地上の管制制御システム、現在の位置を決定するための受信機から構成される。\nB. GNSS測量では、GNSS衛星からの電波を受信するため、測点相互間の視通と上空視界の確保が必要となることから、測量は昼間のみ可能である。\nC. GNSS測量は、単独測位法と相対測位法に大別される。測量に当たって、単独測位法ではGNSS衛星1台、相対測位法では最低2台のGNSS衛星からの電波の受信が必要となる。\nD. GNSS測量で生じる誤差の一つであるマルチパスとは、GNSS衛星から発射される電波が受信機周辺の地物に反射して発生する誤差である。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "C、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "人工衛星の電波を受信し、その衛星を地上の管制設備が監視する。周囲の地物で反射した信号も届いて誤差が生じる現象がマルチパスである。",
    "choiceExplanations": {
      "ア": "衛星、地上の管制設備、受信機というAの構成は妥当である。衛星からの電波を受信するので、測点同士が見通せることや昼間であることは必要ない。",
      "イ": "GNSSを構成する要素の説明は正しい。単独と相対の区別は受信機の数や観測方法によるもので、衛星の数を1台と2台とするCは誤りである。",
      "ウ": "人工衛星の電波を受信し、その衛星を地上の管制設備が監視する。周囲の地物で反射した信号も届いて誤差が生じる現象がマルチパスである。",
      "エ": "GNSSは夜間でも観測でき、測点間の見通しも必要としない。通常の三次元測位には、1台や2台ではなく複数の衛星からの電波を用いる。",
      "オ": "反射波で生じるマルチパスの説明は正しい。三次元の単独測位でも位置と受信機の時計のずれを求めるため、通常4機以上の衛星を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q31",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "縮尺と面積の換算"
    ],
    "difficulty": 2,
    "question": "縮尺1：2000の図上で、三角形の3辺の長さがそれぞれ8 cm、15 cm、17 cmであった場合、実際の三角形の面積として最も妥当なのはどれか。",
    "choices": {
      "ア": "6.0×10³ m²",
      "イ": "8.3×10³ m²",
      "ウ": "1.2×10⁴ m²",
      "エ": "2.4×10⁴ m²",
      "オ": "4.8×10⁴ m²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "8、15、17は三平方の関係を満たす。実際の直角を挟む辺は160 mと300 mなので、面積は160×300/2＝2.4×10⁴ m²である。",
    "choiceExplanations": {
      "ア": "図上の面積は、8×15/2＝60 cm²である。実際の面積に直すには長さの倍率2000の二乗を使う。",
      "イ": "8²＋15²＝17²なので、図上の底辺と高さを8 cmと15 cmとして面積を求められる。面積換算には縮尺の分母の二乗が必要である。",
      "ウ": "実際の直角を挟む二辺は160 mと300 mになる。両者の積の半分は1.2×10⁴ m²ではなく2.4×10⁴ m²である。",
      "エ": "8、15、17は三平方の関係を満たす。実際の直角を挟む辺は160 mと300 mなので、面積は160×300/2＝2.4×10⁴ m²である。",
      "オ": "4.8×10⁴ m²は160 mと300 mの積、すなわち長方形の面積である。三角形の面積はその半分である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q32",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "水準測量の重量平均"
    ],
    "difficulty": 2,
    "question": "図のように、既知点A～Dの4点から未知点Pの標高を求めるために水準測量を行い、表のような観測結果を得た。未知点Pの標高の最確値として最も妥当なのはどれか。\nただし、既知点A～Dの標高は、それぞれH_A＝20.000 m、H_B＝25.000 m、H_C＝30.000 m、H_D＝50.000 mとする。",
    "choices": {
      "ア": "25.835 m",
      "イ": "26.267 m",
      "ウ": "26.312 m",
      "エ": "48.673 m",
      "オ": "49.105 m"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Pの標高の推定値は、A、B、C、Dの順に26.302、26.350、26.315、26.210 mである。それぞれを距離の逆数1/2、1/3、1/4、1で重み付けして平均すると約26.267 mになる。",
    "choiceExplanations": {
      "ア": "各ルートについて、観測の向きを考慮してPの標高を求める。四つの推定値はいずれも26.2～26.4 mなので、25.835 mにはならない。",
      "イ": "Pの標高の推定値は、A、B、C、Dの順に26.302、26.350、26.315、26.210 mである。それぞれを距離の逆数1/2、1/3、1/4、1で重み付けして平均すると約26.267 mになる。",
      "ウ": "四つの値を同じ重さで平均するのではなく、距離が短い路線ほど大きい重みを付ける。最短のDとの路線の推定値26.210 mが、平均に強く効く。",
      "エ": "PからDの高低差は＋23.790 mなので、Dの標高から23.790 mを引いてPの値を求める。Pが50 mに近いという計算にはならない。",
      "オ": "BやDに向かう矢印では、終点の標高から高低差を引いてPの標高を求める。すべての路線から得るPの値は26 m台になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q32.webp"
    ],
    "imageAltTexts": [
      "既知点A～Dから未知点Pに至る四つの路線と、各路線の距離・観測高低差の表。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q33",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "閉合トラバースの角度の補正"
    ],
    "difficulty": 2,
    "question": "図のような五角形の閉合トラバースの交角を測定した結果、表のような測定値が得られた。この測定値を点検して、測角誤差を補正したとき、補正後の測点Aの内角として最も妥当なのはどれか。",
    "choices": {
      "ア": "108°55′07″",
      "イ": "108°55′23″",
      "ウ": "108°55′27″",
      "エ": "108°55′31″",
      "オ": "108°55′47″"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "五角形の内角和は540°で、測定値の合計は539°59′40″である。不足の20秒を5点に割り振り、Aの測定値に4秒を加える。",
    "choiceExplanations": {
      "ア": "測定内角の合計は理論値より20秒小さい。20秒を一つの測点だけから引くのではなく、五つの角に均等に補正を加える。",
      "イ": "五角形の理論上の内角和は540°で、測定値の合計は20秒不足している。各測点の角は4秒ずつ増やすため、23秒にはならない。",
      "ウ": "108°55′27″はAでの測定値そのものである。他の内角も加えたときの閉合差を分配して補正する必要がある。",
      "エ": "五角形の内角和は540°で、測定値の合計は539°59′40″である。不足の20秒を5点に割り振り、Aの測定値に4秒を加える。",
      "オ": "20秒は内角和全体の不足であり、Aだけに加える補正量ではない。各内角に同じ4秒ずつを加える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2025/senmon-noson/q33.webp"
    ],
    "imageAltTexts": [
      "五角形の閉合トラバースと、各測点A～Eの測定内角を示す表。"
    ]
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q34",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "通信速度と伝送効率"
    ],
    "difficulty": 2,
    "question": "伝送速度が3Mbps（メガビット／秒）、伝送効率が70 ％である通信回線において、100 M（メガ）バイトの画像データを伝送するのに要する時間として最も妥当なのはどれか。",
    "choices": {
      "ア": "23秒",
      "イ": "48秒",
      "ウ": "187秒",
      "エ": "381秒",
      "オ": "12190秒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "100 Mバイトは800 Mビットである。実効速度は3×0.70＝2.1 Mbit/sなので、800/2.1≒381秒かかる。",
    "choiceExplanations": {
      "ア": "通信速度の単位はビット毎秒である。必要時間を求める前に、画像のバイト数を8倍してビット数に直す。",
      "イ": "48秒は100 MBの数値をそのまま100 Mbitとして扱った場合に近い。1バイトは8ビットなので、実際には8倍のデータ量である。",
      "ウ": "効率70％なら、回線速度3 Mbit/sのうちデータ転送に使えるのは2.1 Mbit/sである。800 Mbitをこの速度で送る時間は187秒より長い。",
      "エ": "100 Mバイトは800 Mビットである。実効速度は3×0.70＝2.1 Mbit/sなので、800/2.1≒381秒かかる。",
      "オ": "メガという接頭語はデータ量と通信速度の両方に付いているので、除算で打ち消し合う。ビットへ直してから実効速度で割ると、約381秒になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q35",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "暗号方式とセキュリティの用語"
    ],
    "difficulty": 2,
    "question": "情報セキュリティに関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 公開鍵暗号方式は、データの暗号化には秘密鍵、復号には公開鍵、という一対の鍵を使う方式であり、秘密鍵暗号方式は、暗号化と復号に同じ鍵を使う方式である。\nB. 情報を受信する際に、必要なもののみを選ぶというファイアウォールの機能をデバッグという。\nC. コンピュータウイルスは、Webページや電子メールを介して感染するだけでなく、USBメモリなどの記憶媒体を介して感染するものもある。\nD. プログラムの不具合や設計上のミスが原因となって発生する情報セキュリティ上の欠陥のことをセキュリティホールという。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "C、D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ウイルスはネットワークだけでなく、USBメモリなどの記憶媒体を介しても広がり得る。ソフトウェアの設計や実装の不備がセキュリティ上の欠陥となる場合、それをセキュリティホールと呼ぶ。",
    "choiceExplanations": {
      "ア": "受信者の機密性を守る公開鍵暗号では、受信者の公開鍵で暗号化し秘密鍵で復号する。通信を条件で選別する機能はフィルタリングと呼び、デバッグではない。",
      "イ": "USBメモリなどもウイルスの感染経路になり得るためCは妥当である。Aは機密性を得るための公開鍵と秘密鍵の役割を逆にしている。",
      "ウ": "セキュリティ上の欠陥を述べたDは妥当である。共通鍵暗号の説明は合っているが、Aでは公開鍵暗号の暗号化と復号で使う鍵が逆である。",
      "エ": "記憶媒体を介した感染を述べるCは妥当である。デバッグはプログラムの不具合を見つけて修正する作業で、通信を選別する機能とは異なる。",
      "オ": "ウイルスはネットワークだけでなく、USBメモリなどの記憶媒体を介しても広がり得る。ソフトウェアの設計や実装の不備がセキュリティ上の欠陥となる場合、それをセキュリティホールと呼ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q36",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "土壌肥料",
    "topicTags": [
      "陽イオン交換容量と土壌の指標"
    ],
    "difficulty": 2,
    "question": "土壌と肥料に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "肥料の三要素のみから成る化学肥料を単肥といい、三要素のほかに複数の成分を含む肥料を複合肥料という。",
      "イ": "ホウ素、カリウム、マンガンなどの元素は、微量元素と呼ばれ、土中に少しでも存在すると作物の生育を阻害するため、多量の水で洗い流して除去することが、作物の生育に有効である。",
      "ウ": "土が陽イオンを保持することができる量を陽イオン交換容量という。一般に、土壌有機物の多い土は陽イオン交換容量が大きく、肥沃な土とされる。",
      "エ": "土は水溶液と同じように、酸性、中性、アルカリ性の性質を示し、pHが7未満の土をアルカリ性土、7を超える土を酸性土という。",
      "オ": "土中の溶存酸素の量を示す指標である電気伝導度（EC）は、土中の肥料分（塩類）が多くなるほど、電気が流れにくくなる性質を利用している。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "陽イオン交換容量は土が保持し、交換できる陽イオンの量を表す。土壌有機物の多い土は、一般にこの容量が大きい。",
    "choiceExplanations": {
      "ア": "肥料の三要素は窒素、リン酸、カリである。単肥は通常このうち一成分を主とし、複合肥料は二成分以上を含む。",
      "イ": "微量元素の一部は少量であれば作物の生育に必要である。カリウムはそもそも微量要素ではなく、主要な肥料成分である。",
      "ウ": "陽イオン交換容量は土が保持し、交換できる陽イオンの量を表す。土壌有機物の多い土は、一般にこの容量が大きい。",
      "エ": "pHが7未満なら酸性、7を超えるとアルカリ性である。記述では二つの名称が逆である。",
      "オ": "ECは溶存酸素の量ではなく、水に溶けたイオンによる電気の通しやすさの指標である。一般に可溶性の塩類が多いほど、ECは高くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q37",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "作物学",
    "topicTags": [
      "水稲の代かき・中干しと生育期"
    ],
    "difficulty": 2,
    "question": "水稲栽培に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 代かきは、イネを植え付けやすいように土を軟らかくする、土の表面を平らにして水の深さを一様にする、水もちを良くする、雑草の発生を抑えることなどを目的に行われる。\nB. 田面を乾かすため、1週間程度水を抜くことを中干しという。中干しによって、土の中に酸素が入り、根が健全に生育できるようになる。\nC. 水稲栽培では、田植え後のイネの生育期は、分げつ期、幼穂発育期、出穂・開花期、活着期、登熟期の順であり、その後収穫が行われる。\nD. 水稲は、品種や生育期によって異なるが、水温が20 ℃以下又は40 ℃以上になると生育が阻害されるため、冷水温障害には掛流しかんがいが、高温障害には深水かんがいが、それぞれ有効である。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "代かきは土を軟らかくして均平にし、漏水や雑草の発生も抑える。中干しではいったん水を抜き、土壌へ酸素が入りやすくする。",
    "choiceExplanations": {
      "ア": "代かきは土を軟らかくして均平にし、漏水や雑草の発生も抑える。中干しではいったん水を抜き、土壌へ酸素が入りやすくする。",
      "イ": "代かきの働きを述べたAは妥当である。活着は田植え後まもなく起き、分げつ期より前なので、Cの生育順序は誤りである。",
      "ウ": "Bの中干しの働きは正しい。出穂・開花の後に活着するのではなく、田植え後にまず苗が活着する。",
      "エ": "Bは妥当である。冷水の掛流しは水温を上げる対策にならず、高温時には水の入替えなどで水温を下げることがある。",
      "オ": "活着を出穂・開花の後としたCは誤りである。Dも低温と高温へのかんがい対策の対応が妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q38",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "農業気象",
    "topicTags": [
      "農作物の気象災害"
    ],
    "difficulty": 2,
    "question": "農業気象災害に関する記述人A人-～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 干害は、夏季に多日照で降水量が少なく、干天が続くときに見られ、土壌が乾燥により風などで流亡することで発生する災害である。特に東日本で干害の発生の危険性が大きい。\nB. 霜害は、霜による細胞の凍死が原因で起こる。細胞の凍死は、厳冬期の低温によっても起こることがあり、これを凍害と呼ぶ。霜害と凍害を合わせて凍霜害という。\nC. 風害は、台風などの一時的な強風がもたらす強風害と低温や乾燥を伴う冬季の季節風による常習的な強風がもたらす寒風害とに分けられる。\nD. 冷害は、春や秋の夜間から早朝に気温が急に低下したときに生じる農作物の障害である。特にイネの場合、冷害を受けると胴割米が発生しやすくなる。",
    "choices": {
      "ア": "A、C",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "霜害と凍害はいずれも低温による細胞の凍結に関係し、合わせて凍霜害という。風害には台風などの一時的な強風害と、冬季の冷たく乾燥した強風による寒風害がある。",
    "choiceExplanations": {
      "ア": "強風害と寒風害を区別したCは妥当である。土の粒子が風で運ばれる現象は風食であり、水分不足で作物が傷む干害とは区別する。",
      "イ": "Aは、干害の原因に土壌の風による流亡を挙げている点が誤りである。春秋の夜から明け方に短時間の冷え込みで起こる被害は、典型的には霜害である。",
      "ウ": "霜害と凍害はいずれも低温による細胞の凍結に関係し、合わせて凍霜害という。風害には台風などの一時的な強風害と、冬季の冷たく乾燥した強風による寒風害がある。",
      "エ": "凍霜害について述べたBは妥当である。イネの冷害には生育の遅れや不稔があり、夜間の短期的な冷え込みと胴割米で特定できない。",
      "オ": "風害の分類を述べたCは妥当である。冷害を春秋の夜から早朝に急に冷え込む場合に限っている点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q39",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "農村環境",
    "topicTags": [
      "生態系の窒素循環"
    ],
    "difficulty": 2,
    "question": "次は、生態系における窒素循環に関する記述であるが、A～Eに当てはまるものの組合せとして最も妥当なのはどれか。\n\n「大気の約［A］％を占める窒素ガスは、一般に、そのままの形では植物にほとんど利用されないが、マメ科植物の根に共生する根粒菌や一部の細菌類は、大気中の窒素ガスを［B］し、植物に供給している。一方、生物の死がいや排出物に含まれている有機態の窒素は、土壌中の小動物や微生物によって分解され、［C］窒素を経て［D］窒素となり、これらは植物に吸収されるが、一部は地下水に溶け出す。また、［D］窒素は、土壌微生物などの働きによって窒素ガスになる。この過程は［E］と呼ばれ、特に水田土壌で盛んである。」",
    "choices": {
      "ア": "80、固定、アンモニア態、硝酸態、脱窒",
      "イ": "80、固定、硝酸態、アンモニア態、溶脱",
      "ウ": "80、同化、アンモニア態、硝酸態、溶脱",
      "エ": "20、固定、アンモニア態、硝酸態、脱窒",
      "オ": "20、同化、硝酸態、アンモニア態、溶脱"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "大気の約8割は窒素であり、根粒菌などは窒素を固定する。有機態窒素はアンモニア態を経て硝酸態になり、硝酸態から窒素ガスに戻る過程を脱窒という。",
    "choiceExplanations": {
      "ア": "大気の約8割は窒素であり、根粒菌などは窒素を固定する。有機態窒素はアンモニア態を経て硝酸態になり、硝酸態から窒素ガスに戻る過程を脱窒という。",
      "イ": "大気の窒素割合と窒素固定は合っている。有機態からまずアンモニア態が生じ、ガスに戻る過程は溶脱ではなく脱窒である。",
      "ウ": "アンモニア態から硝酸態になる順序は妥当である。大気の窒素を利用可能な形にする働きは固定で、硝酸が窒素ガスに戻る働きは脱窒である。",
      "エ": "窒素固定や土壌中での変化の順序は妥当である。大気中の窒素の割合は約20％ではなく約80％である。",
      "オ": "大気中の約20％を占める主な気体は酸素である。窒素は約80％で、有機態窒素の分解では硝酸態より先にアンモニア態が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2025-annual-senmon-noson-q40",
    "exam": "kokka-ippan-kou",
    "year": 2025,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "農業政策",
    "topicTags": [
      "食料自給率と農福連携"
    ],
    "difficulty": 2,
    "question": "我が国の食料・農業・農村に関する記述として最も妥当なのはどれか。なお、データは「令和5年度食料・農業・農村白書（令和6年5月31日公表）」による。",
    "choices": {
      "ア": "令和4年度の我が国における総合食料自給率は、供給熱量ベースで58 ％、生産額ベースで38 ％となっている。",
      "イ": "我が国の農地面積は年々減少し、令和5年度は約430万haで、国土総面積の約3割を占める。また、同年の農地面積における水田の割合は約7割となっている。",
      "ウ": "農村から利便性の高い都市部への人口移動に伴い、一つの農業集落の総戸数に占める農家の割合は年々上昇しており、混住化が解消されつつある。",
      "エ": "農地中間管理機構（農地バンク）は、増大する耕作放棄地や過疎化などによる農業従事者の減少に対応するため、都道府県職員自らが耕作し、農地を適切に管理する機関である。",
      "オ": "近年、農業分野で障がい者などの就労や社会参画を促進する農福連携の取組が盛んになっており、障がい者などの自信や生きがい創出、農業分野の担い手確保につながることが期待されている。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "農福連携は、農業の現場に障がい者などが参加する機会をつくる取組である。就労や社会参加を支えながら、農業の担い手を確保する効果も期待される。",
    "choiceExplanations": {
      "ア": "令和4年度のカロリーベースの自給率は38％である。58％と38％をそれぞれ供給熱量と生産額に対応させる記述は誤りである。",
      "イ": "農地面積が約430万 haで減少傾向という点はおおむね妥当である。ただし、日本の国土面積に対して約3割ではなく、1割強に当たる。",
      "ウ": "農業集落における総戸数に占める農家の割合は、長期的に低下してきた。農家と非農家の混住が進んでいる。",
      "エ": "農地バンクは農地を借り受け、担い手への貸付けなどにより農地の集積・集約化を進める。都道府県職員が自ら耕作することが役割ではない。",
      "オ": "農福連携は、農業の現場に障がい者などが参加する機会をつくる取組である。就労や社会参加を支えながら、農業の担い手を確保する効果も期待される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016209.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（高卒者試験） 農業土木区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  }
];
