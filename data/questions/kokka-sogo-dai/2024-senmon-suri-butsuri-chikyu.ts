import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2024_SENMON_SURI_BUTSURI_CHIKYU: Question[] = [
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q001",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "基礎数学・情報数学",
    "topicTags": [
      "階乗と合同式",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "m = 2024! + 1 とするとき、m⁶ − m² を24で割ったときの余りはいくらか。",
    "choices": {
      "ア": "0",
      "イ": "2",
      "ウ": "4",
      "エ": "6",
      "オ": "12"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "2024! は24の倍数なので、m ≡ 1 (mod 24) となる。従って m⁶ − m² ≡ 1 − 1 = 0 (mod 24) である。",
    "choiceExplanations": {
      "ア": "2024! は24の倍数なので、m ≡ 1 (mod 24) となる。従って m⁶ − m² ≡ 1 − 1 = 0 (mod 24) である。",
      "イ": "m⁶ と m² はともに24で割った余りが1であり、差の余りは2にならない。",
      "ウ": "m ≡ 1 (mod 24) なので差の余りは0であり、4ではない。",
      "エ": "2024! が24の倍数であることを用いると、差は6を余すことなく24で割り切れる。",
      "オ": "m の合同類を1に置き換えると差は0となり、12は余らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q003",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "基礎数学・情報数学",
    "topicTags": [
      "逆正接の微分",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "f(x) = tan⁻¹(4x) であるとき、f′(1) はいくらか。",
    "choices": {
      "ア": "4/17",
      "イ": "4/5",
      "ウ": "16/17",
      "エ": "1",
      "オ": "2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "合成関数を微分すると f′(x) = 4/(1 + 16x²) となり、x = 1 で 4/17 になる。",
    "choiceExplanations": {
      "ア": "合成関数を微分すると f′(x) = 4/(1 + 16x²) となり、x = 1 で 4/17 になる。",
      "イ": "分母は 1 + (4x)² なので、x = 1 では5ではなく17になる。",
      "ウ": "内側の関数 4x の導関数は4であり、分子を16にはしない。",
      "エ": "x = 1 では分子が4、分母が17なので、導関数の値は1にならない。",
      "オ": "逆正接の導関数に連鎖律を適用して代入すると 4/17 となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q005",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "基礎数学・情報数学",
    "topicTags": [
      "連長圧縮",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "配列要素 I[0]、I[1]、…、I[9] から成る配列 I が定義され、各配列要素に次のように文字が格納されている。\n図は、配列 I に格納されている文字列を圧縮した結果を配列 O に格納するフローチャートである。このフローチャートを実行したとき、最後に出力される値はいくらか。\nただし、配列 O には文字列を圧縮した結果を格納する十分な領域が確保されている。",
    "choices": {
      "ア": "4",
      "イ": "5",
      "ウ": "6",
      "エ": "7",
      "オ": "8"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "連続する区間は A が4個、B が2個、C が1個、A が3個である。各区間を2要素に格納するので、最後の出力 j + 2 は8になる。",
    "choiceExplanations": {
      "ア": "同じ文字が続く区間は4個あるが、各区間は文字と個数の2要素で記録する。",
      "イ": "出力は初期値0から2ずつ増える j に2を加えた値であり、奇数の5にはならない。",
      "ウ": "途中で3個の区間を書き込んだ時点では j = 6 だが、ループ終了後に最後の区間も書き込む。",
      "エ": "文字と個数の組を記録するため、出力の値は偶数になり、7にはならない。",
      "オ": "連続する区間は A が4個、B が2個、C が1個、A が3個である。各区間を2要素に格納するので、最後の出力 j + 2 は8になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q005-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q005-2.webp"
    ],
    "imageAltTexts": [
      "配列 I の添字と各要素の文字",
      "配列の連続する文字を圧縮して出力するフローチャート"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q020",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "内惑星の満ち欠けと会合",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "天体の運動と見え方に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「ある日の夕方、西の空に、ちょうど半月の形をした金星が観測され、金星のすぐ近くには月が見えたとする。このとき、月は［㋐］である。また、この日以降、太陽―金星―地球が直線上に並ぶ最初の日は、およそ［㋑］日後である。\nただし、金星及び地球は同じ公転面を等速円運動しているものとする。また、金星の公転半径は 0.7 天文単位、金星の公転周期は 0.6 年とする。」",
    "choices": {
      "ア": "三日月の形／70",
      "イ": "三日月の形／140",
      "ウ": "半月の形／70",
      "エ": "半月の形／140",
      "オ": "半月の形／210"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "半月状の金星の太陽離角は arcsin(0.7) ≈ 44°で、近くに見える月は三日月の形となる。次の内合まで金星と地球の太陽中心角の差が約46°変化し、相対角速度は年240°なので約70日かかる。",
    "choiceExplanations": {
      "ア": "半月状の金星の太陽離角は arcsin(0.7) ≈ 44°で、近くに見える月は三日月の形となる。次の内合まで金星と地球の太陽中心角の差が約46°変化し、相対角速度は年240°なので約70日かかる。",
      "イ": "月の形は三日月でよいが、140日だと太陽中心角の差が約92°変化し、最初の内合を過ぎている。",
      "ウ": "70日は合うが、月が半月なら太陽から見かけ上およそ90°離れるため、最大離角約44°の金星のすぐ近くには見えない。",
      "エ": "離角約44°で月は半月にならず、角度約46°を変化するのに必要なのは約70日である。",
      "オ": "月は三日月の形であり、最初の一直線の配置は210日より早い約70日後の内合である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q021",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "台風の構造と風向",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "台風に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「熱帯低気圧は、南北両半球の緯度［㋐］付近の、海面水温の高い海域で発達した積乱雲の集合から発生することが多い。北太平洋西部に存在する熱帯低気圧のうち、10分間の平均風速の最大が約 17 m/s 以上になったものを、日本では台風と呼ぶ。\n台風に伴う風の強さは、一般に中心から 50～100 km のところで最も強く、それより中心に近づくと急に風が弱くなる。この中心部分は台風の目と呼ばれ、弱い［㋑］がある。\n図は、ある年の9月4日に日本に上陸した台風の経路図の一部であり、経路上の○印は、図中に記した日時の台風の中心位置を示す。また、表のⅠ、Ⅱは、地点 A 又は B における同日3時～18時の風向・風速［m/s］の観測データを示したものである。Ⅰ、Ⅱのうち、地点 A の観測データは［㋒］である。」",
    "choices": {
      "ア": "0～5度／上昇気流／Ⅰ",
      "イ": "0～5度／下降気流／Ⅱ",
      "ウ": "5～20度／上昇気流／Ⅰ",
      "エ": "5～20度／上昇気流／Ⅱ",
      "オ": "5～20度／下降気流／Ⅱ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "熱帯低気圧は緯度5～20度付近で生じやすく、目には弱い下降気流がある。北半球では風が中心に向かって反時計回りに吹くため、経路の西側にある地点 A で東寄りから西寄りに変わるⅡが該当する。",
    "choiceExplanations": {
      "ア": "赤道付近はコリオリの力が弱く、台風の目は対流の活発な目の壁とは異なり下降気流を伴う。",
      "イ": "下降気流と観測データⅡは合うが、赤道に近い緯度0～5度ではコリオリの力が弱く発生しにくい。",
      "ウ": "発生しやすい緯度は合っているが、目の中には下降気流があり、地点 A の東寄りから西寄りへの風向の変化はⅡに現れている。",
      "エ": "緯度と観測データは合うが、台風の目の中には弱い下降気流がある。",
      "オ": "熱帯低気圧は緯度5～20度付近で生じやすく、目には弱い下降気流がある。北半球では風が中心に向かって反時計回りに吹くため、経路の西側にある地点 A で東寄りから西寄りに変わるⅡが該当する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。 図の出典：気象庁ホームページの過去の台風資料を加工して作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q021-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q021-2.webp"
    ],
    "imageAltTexts": [
      "9月3日から5日までの台風の経路と観測地点 A、B",
      "観測データⅠ、Ⅱの3時から18時までの風向・風速"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q022",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "地震の規模と津波の伝播",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "地震及び津波に関する次の記述の㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 地震の規模はマグニチュードで表される。マグニチュード M が大きいほど、地震により発散されるエネルギー E も大きくなり、その関係は、定数 c を用いて M = (1/1.5) log₁₀ E + c のように表すことができる。すなわち、マグニチュードが1大きくなると、地震のエネルギーは約32倍になる。\n㋑ 地震動の強さを表す指標の一つが震度である。現在震度は計測震度計により観測しており、各地震において、必ず震源に最も近い観測点で最大の震度が観測される。なお、気象庁の震度階級では、震度は1～7の7階級に区分されており、2011年3月11日の東北地方太平洋沖地震などで震度7を観測した。\n㋒ 地震などに伴い海底地形が急激に変化すると、津波が発生する。津波は水深に比べて十分に波長が短く、このような波の進む速さ V は、水深を h、重力加速度の大きさを g として V = √(gh) で表すことができる。水深 4000 m の大洋における津波の速さは約 200 m/s にもなり、東北地方太平洋沖で発生する津波は、約48時間後に南アメリカの太平洋岸に到達する。\n㋓ 津波は、沿岸に近づき水深が浅くなるにつれ、波高が徐々に増大する。特に V 字型の湾の奥では、海水が集中して波高が高くなりやすい。一方、岬の先端のように海岸線や等深線が沖に向かって突き出た部分では、波が分散し、波高は低くなりやすい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "M が1大きくなると log₁₀ E が1.5増えるため、E は 10^1.5 ≈ 31.6 倍になる。従って、約32倍になると述べた㋐が妥当である。",
    "choiceExplanations": {
      "ア": "M が1大きくなると log₁₀ E が1.5増えるため、E は 10^1.5 ≈ 31.6 倍になる。従って、約32倍になると述べた㋐が妥当である。",
      "イ": "㋑の震度は地盤や伝播経路にも左右され、気象庁の区分は震度0と5・6の強弱を含む10階級である。㋓の岬付近では屈折で波が集中し得る。",
      "ウ": "㋒で用いた速度式は波長が水深より十分に長い津波に適用される。㋓も岬で波が分散するとしている点が適切でない。",
      "エ": "㋑では最大震度の観測点が震源に最も近いと断定しており、㋒では長波である津波の波長を短いとしている。",
      "オ": "V 字湾で高くなりやすいのは妥当だが、岬では波の屈折による集中が生じ得るため、㋓は全体として妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q023",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "地球内部と地震波",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "地球内部構造に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「図は、地球中心からの距離と地震波速度［km/s］又は密度［g/cm³］の関係を示したものである。実線 (x) は［㋐］を、点線 (y) は［㋑］を、破線 (z) は［㋒］を表し、層［㋓］は液体と考えられている。」\n（注）地球の標準モデルの一つである PREM (Dziewonski and Anderson, 1981) を基に作図",
    "choices": {
      "ア": "P波速度／密度／S波速度／A",
      "イ": "P波速度／密度／S波速度／B",
      "ウ": "S波速度／密度／P波速度／A",
      "エ": "密度／P波速度／S波速度／B",
      "オ": "密度／S波速度／P波速度／B"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "x は中心付近で大きい密度、外核も伝わる y は P波速度、外核でゼロになる z は S波速度である。S波が伝わらない B は液体の外核である。",
    "choiceExplanations": {
      "ア": "中心付近から概して低下する x が密度であり、S波の伝わらない外核 B が液体である。",
      "イ": "液体の層は B でよいが、x と y の割当てが逆で、x は密度、y は P波速度である。",
      "ウ": "液体を伝わらず B でゼロになるのは z なので、z が S波速度に当たる。A は地球中心側の固体内核である。",
      "エ": "x は中心付近で大きい密度、外核も伝わる y は P波速度、外核でゼロになる z は S波速度である。S波が伝わらない B は液体の外核である。",
      "オ": "x と B は合うが、S波は液体を伝わらないので y ではなく z である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q023.webp"
    ],
    "imageAltTexts": [
      "地球中心からの距離に対する曲線 x、y、z と層 A、B"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q024",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "プレート境界の地形",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "図は、海洋と大陸の典型的大地形とその断面の模式図である。図中に示した地域 A～D に関する記述の㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ A では、地殻が陥没しマントルに下降流が発生している。\n㋑ B は、沈み込み帯と呼ばれる領域で、プレートの沈み込みにより火山活動や地震が発生している。\n㋒ C はプレートの収束境界で、海洋底が隆起して山脈が形成されている。\n㋓ D の境界では、プレートがすれ違う方向に移動している。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "B では海洋プレートが沈み込み、地震や火山活動が生じる。D はプレートどうしが横にすれ違うトランスフォーム境界である。",
    "choiceExplanations": {
      "ア": "㋑は妥当だが、A は地殻が引き伸ばされる領域で、マントルの下降流で特徴付けられない。",
      "イ": "A と C はいずれもプレートが引き離される運動に対応し、㋐の下降流と㋒の収束境界は妥当でない。",
      "ウ": "B は沈み込み帯だが、C の海嶺ではプレートが左右に広がるので、収束境界とする㋒は誤りである。",
      "エ": "B では海洋プレートが沈み込み、地震や火山活動が生じる。D はプレートどうしが横にすれ違うトランスフォーム境界である。",
      "オ": "D の横ずれは妥当だが、C は海嶺でプレートが広がる発散境界である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。 図の出典：U.S. Geological Survey / illustration by Jose F. Vigil。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q024.webp"
    ],
    "imageAltTexts": [
      "海洋と大陸の地形・地下構造と地域 A～D"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q025",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "海洋の熱塩循環",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "海洋熱塩循環に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「海流には、沿岸表層で観測されるような速い流れと、海洋熱塩循環と呼ばれる、一周するのに［㋐］かかる大規模なゆっくりとした流れがある。海洋熱塩循環は、温度が低く塩分が［㋑］北大西洋北東部と南大西洋南極付近で水塊が沈み込むことにより始まり、そこで生成された深層水はゆっくりとしたスピードで海洋を一周する。一方で、太平洋でそのような水塊の沈み込みが見られないのは、大西洋と比べて流入する河川が［㋒］からだと考えられている。海洋熱塩循環は擾乱に対して不安定なシステムであり、大規模氷床が［㋓］することで循環が減衰あるいは停止した時期もあったと考えられる。」",
    "choices": {
      "ア": "約20年／低い／多い／発達",
      "イ": "約20年／低い／少ない／崩壊",
      "ウ": "約20年／高い／多い／崩壊",
      "エ": "約2000年／低い／少ない／発達",
      "オ": "約2000年／高い／多い／崩壊"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "低温かつ高塩分の水は密度が高く沈み込みやすく、海全体を巡る深層水の循環には約2000年かかる。河川や氷床崩壊から淡水が供給されると塩分と密度が下がり、沈み込みが抑えられる。",
    "choiceExplanations": {
      "ア": "深層循環の時間尺度は数千年で、塩分が高いほど海水の密度が増し、沈み込みやすくなる。",
      "イ": "氷床の崩壊は淡水を供給するが、循環は約20年よりはるかに遅く、低塩分の水は密度が小さく沈み込みにくい。",
      "ウ": "塩分、河川、氷床については合っているが、海洋全体を巡る時間は約2000年の規模である。",
      "エ": "約2000年の時間尺度は合うが、深層水は低温・高塩分で密度が高く、氷床崩壊による淡水の流入は沈み込みを弱める。",
      "オ": "低温かつ高塩分の水は密度が高く沈み込みやすく、海全体を巡る深層水の循環には約2000年かかる。河川や氷床崩壊から淡水が供給されると塩分と密度が下がり、沈み込みが抑えられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q026",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "対称群の置換の平方",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "n 次対称群 Sₙ の元 σ に対して、τ ∈ Sₙ が存在して、σ = τ∘τ と表せるとき、σ をスクエア置換という。次の㋐～㋓のうち、S₁₃ におけるスクエア置換のみを全て挙げているのはどれか。\nただし、∘ は置換の合成を表す。すなわち、α∘β(x) = α(β(x)) とする。\n㋐ (1, 3, 5, 2, 6) ∘ (4, 8, 13, 12) ∘ (7, 11, 10, 9)\n㋑ (1, 7, 2) ∘ (3, 13, 4, 5) ∘ (6, 12) ∘ (9, 8, 11, 10)\n㋒ (1, 12, 3, 4, 10) ∘ (2, 6, 13) ∘ (5, 8, 11, 9, 7)\n㋓ (1, 7) ∘ (2, 10, 3) ∘ (4, 11) ∘ (5, 12, 9, 8) ∘ (6, 13)",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒、㋓",
      "エ": "㋑、㋓",
      "オ": "㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "置換を平方にすると奇数長の巡回は同じ長さの巡回になり、偶数長の巡回は半分の長さの巡回2個に分かれる。㋐の4巡回2個は8巡回の平方から作ることができ、奇数長の巡回のみからなる㋒も平方である。",
    "choiceExplanations": {
      "ア": "㋑には2巡回が1個だけあり、同じ長さの偶数巡回が対で現れるという必要条件を満たさない。",
      "イ": "置換を平方にすると奇数長の巡回は同じ長さの巡回になり、偶数長の巡回は半分の長さの巡回2個に分かれる。㋐の4巡回2個は8巡回の平方から作ることができ、奇数長の巡回のみからなる㋒も平方である。",
      "ウ": "㋑の2巡回は1個、㋓の4巡回も1個だけなので、いずれも平方として表せない。",
      "エ": "㋑には2巡回、㋓には4巡回がそれぞれ1個だけあり、対応する同じ長さの巡回が不足している。",
      "オ": "㋓には4巡回が1個、2巡回が3個あり、偶数長の巡回はいずれの長さでも対にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q027",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "写像の像と逆像",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "f : X → Y を集合 X から集合 Y への写像とし、A、B を X の部分集合、C、D を Y の部分集合とする。次の㋐、㋑、㋒のうち、常に正しいもののみを全て挙げているのはどれか。\n㋐ f(A) ∩ f(B) ⊆ f(A ∩ B)\n㋑ f(f⁻¹(C)) = C ∩ f(X)\n㋒ f⁻¹(C) ∩ f⁻¹(D) = f⁻¹(C ∩ D)",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "C に属する像を集めると ㋑ の C ∩ f(X) になる。f(x) が C と D の双方に属するという条件は f(x) ∈ C ∩ D と同じなので㋒も成立する。",
    "choiceExplanations": {
      "ア": "㋐は、異なる元が同じ値に写り、A と B が交わらない場合にも左辺が空でないことがあるため成立しない。",
      "イ": "㋒は正しいが、㋐は一般に逆向きの包含しか保証されず、㋑も常に正しい。",
      "ウ": "㋑は値域に属する C の元を集めた等式として正しいが、逆像は交わりを保つので㋒も成立する。",
      "エ": "C に属する像を集めると ㋑ の C ∩ f(X) になる。f(x) が C と D の双方に属するという条件は f(x) ∈ C ∩ D と同じなので㋒も成立する。",
      "オ": "㋒に加え、C のうち X の点の像になるものに限れば f(f⁻¹(C)) に属するので㋑も成立する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q028",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "半順序集合と上界",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "{n ∈ ℤ : 1 ≤ n ≤ 12} の部分集合のうち、偶数個の元からなるもの全体を ℘ とする。℘ 上の半順序 ≦ を、X、Y ∈ ℘ に対して、X ≦ Y ⇔ X ⊆ Y で定める。このとき、{1, 2, 3, 5} と {1, 3, 5, 7} の上界は全部でいくつあるか。",
    "choices": {
      "ア": "8個",
      "イ": "16個",
      "ウ": "32個",
      "エ": "64個",
      "オ": "128個"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "二つの集合の和は {1, 2, 3, 5, 7} であり、上界を作るには残り7元から奇数個を加える。残りの特定の1元を入れ替える操作が奇数・偶数を一対一に対応させるので、個数は 2⁶ = 64 である。",
    "choiceExplanations": {
      "ア": "上界は和集合の5元を含み、残り7元のうち奇数個を選ぶので、8個より多い。",
      "イ": "残り7元の奇数個の選び方は C(7,1) + C(7,3) + C(7,5) + C(7,7) であり、16個ではない。",
      "ウ": "7元から選ぶ部分集合の半分が奇数個なので、32個ではなく64個である。",
      "エ": "二つの集合の和は {1, 2, 3, 5, 7} であり、上界を作るには残り7元から奇数個を加える。残りの特定の1元を入れ替える操作が奇数・偶数を一対一に対応させるので、個数は 2⁶ = 64 である。",
      "オ": "128個は残り7元の任意の部分集合を許す数であり、上界の要素数を偶数にする条件で半分に減る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q029",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "連続写像の特徴付け",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "X、Y を位相空間とし、f : X → Y を写像とする。次の命題㋐、㋑、㋒のうち、「f は連続写像である」と同値なもののみを全て挙げているのはどれか。\n㋐ Y の任意の閉集合 F に対して、f⁻¹(F) は X の閉集合である。\n㋑ X の任意の部分集合 A に対して、f(Int(A)) ⊆ Int(f(A)) が成り立つ。ただし、Int(A) は A の内部を表す。\n㋒ X の任意の部分集合 A に対して、f(Cl(A)) ⊆ Cl(f(A)) が成り立つ。ただし、Cl(A) は A の閉包を表す。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋐、㋒",
      "オ": "㋑、㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "開集合の逆像に対する連続性の定義を補集合で言い換えると㋐になる。㋒は連続性から従い、逆に閉集合 F に A = f⁻¹(F) を取ると Cl(A) ⊆ A を得て㋐が従う。",
    "choiceExplanations": {
      "ア": "㋐は連続性と同値であり、任意の部分集合についての閉包の包含㋒も同値になる。",
      "イ": "㋑は連続な定値写像 ℝ → ℝ に A = ℝ を取ると失敗する。",
      "ウ": "㋐と㋒は同値であるが、㋑は開集合の像が開くことを要請し、一般の連続写像には強すぎる。",
      "エ": "開集合の逆像に対する連続性の定義を補集合で言い換えると㋐になる。㋒は連続性から従い、逆に閉集合 F に A = f⁻¹(F) を取ると Cl(A) ⊆ A を得て㋐が従う。",
      "オ": "㋒は同値だが㋑は連続性から従わず、連続性を直接特徴付ける㋐が抜けている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q030",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "対称群の正規部分群",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "3次対称群 S₃ の正規部分群は全部でいくつあるか。",
    "choices": {
      "ア": "2個",
      "イ": "3個",
      "ウ": "4個",
      "エ": "5個",
      "オ": "6個"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "正規部分群は {e}、A₃、S₃ の3個である。位数2の部分群は互いに共役な三つの互換の一つしか含まないため正規ではない。",
    "choiceExplanations": {
      "ア": "単位群と全体に加え、3巡回と単位元からなる交代群 A₃ が正規部分群である。",
      "イ": "正規部分群は {e}、A₃、S₃ の3個である。位数2の部分群は互いに共役な三つの互換の一つしか含まないため正規ではない。",
      "ウ": "位数2の部分群を加えることはできず、正規部分群は3個である。",
      "エ": "部分群を全て数える場合にも、各互換が生成する部分群は正規性を満たさない。",
      "オ": "部分群全体は6個あるが、三つの位数2の部分群は共役によって互いに移り合うので正規部分群から除く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q031",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "極大イデアルと剰余体",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の可換環 R とその部分集合 I の組合せのうち、I が R の極大イデアルとなっているのはどれか。\nただし、F₂ は有限体 ℤ/2ℤ、X、Y は不定元である。",
    "choices": {
      "ア": "ℤ ／ {p ∈ R : p は素数} ∪ {0}",
      "イ": "ℝ ／ ℤ",
      "ウ": "F₂[X] ／ {(X² + 1)f(X) : f(X) ∈ R}",
      "エ": "ℤ[X] ／ {(X² + 1)f(X) : f(X) ∈ R}",
      "オ": "ℚ[X, Y] ／ {(X² + 1)f(X, Y) + Yg(X, Y) : f(X, Y), g(X, Y) ∈ R}"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Y = 0 とすると剰余環は ℚ[X]/(X² + 1) になり、この多項式は ℚ 上で既約である。剰余環が体 ℚ(i) だから I は極大イデアルである。",
    "choiceExplanations": {
      "ア": "素数と0の集合は、2 + 2 = 4 が含まれないため、加法について閉じていない。",
      "イ": "ℤ は ℝ の加法部分群だが、1 に実数 1/2 を掛けると ℤ の外に出るのでイデアルではない。",
      "ウ": "標数2では X² + 1 = (X + 1)² なので、このイデアルは真に大きいイデアル (X + 1) に含まれる。",
      "エ": "剰余環は ℤ[i] と同型であり、例えば2に逆元がないので体ではない。",
      "オ": "Y = 0 とすると剰余環は ℚ[X]/(X² + 1) になり、この多項式は ℚ 上で既約である。剰余環が体 ℚ(i) だから I は極大イデアルである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q032",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "ガロア拡大の次数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の有理数体 ℚ の拡大体について考える。これらの中で、ℚ のガロア拡大であるもののうち、ℚ 上の拡大次数が最大であるのはどれか。\nただし、i は虚数単位とする。",
    "choices": {
      "ア": "ℚ(¹⁰√2)",
      "イ": "ℚ(cos(2π/12) + i sin(2π/12))",
      "ウ": "ℚ(√3, √5)",
      "エ": "ℚ(∛2, (−1 + √3i)/2)",
      "オ": "ℚ(⁴√2, i)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "X⁴ − 2 のすべての根が含まれるのでガロア拡大である。実根による拡大は次数4で、さらに非実数 i を加えると二次拡大になるので次数は8である。",
    "choiceExplanations": {
      "ア": "X¹⁰ − 2 の実根 ¹⁰√2 が生成する体は実数体内にあり、この多項式の非実根を含まないので正規でない。",
      "イ": "12乗根の円分体はガロア拡大であるが、次数は φ(12) = 4 である。",
      "ウ": "平方根二つによる双二次ガロア拡大であり、次数は4である。",
      "エ": "X³ − 2 の分解体であり、実根を生成する3次拡大に原始3乗根を加えるので次数は6である。",
      "オ": "X⁴ − 2 のすべての根が含まれるのでガロア拡大である。実根による拡大は次数4で、さらに非実数 i を加えると二次拡大になるので次数は8である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q033",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "フレネ・セレの公式",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "3次元ユークリッド空間内の弧長 s をパラメータとする C³ 級曲線 c : I = [0, ℓ] → ℝ³ が I 上で ‖d²c/ds²(s)‖ ≠ 0 を満たすとする。I 上のベクトル関数 t(s)、n(s)、b(s) を t(s) = dc/ds(s)、n(s) = (dt/ds(s))/‖dt/ds(s)‖、b(s) = t(s) × n(s) とし、I 上の関数 κ(s)、τ(s) を κ(s) = ‖d²c/ds²(s)‖、τ(s) = −⟨db/ds(s), n(s)⟩ とする。このとき dn/ds(s) に等しいのは次のうちどれか。\nただし、⟨・, ・⟩ はユークリッド内積、‖・‖ はユークリッドノルム、× は外積を表す。",
    "choices": {
      "ア": "κ(s)t(s) + τ(s)b(s)",
      "イ": "κ(s)t(s) − τ(s)b(s)",
      "ウ": "−κ(s)t(s) + τ(s)b(s)",
      "エ": "−κ(s)t(s) − τ(s)b(s)",
      "オ": "−τ(s)b(s)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "正規直交性を微分すると ⟨n′, t⟩ = −⟨n, t′⟩ = −κ、⟨n′, b⟩ = −⟨n, b′⟩ = τ となる。n′ の n 成分は0であり、答えは −κt + τb になる。",
    "choiceExplanations": {
      "ア": "t ⟂ n を微分すると dn/ds の t 成分は −κ になるため、最初の符号が逆である。",
      "イ": "t 成分は −κ であり、b 成分は捩率の定義から +τ になる。",
      "ウ": "正規直交性を微分すると ⟨n′, t⟩ = −⟨n, t′⟩ = −κ、⟨n′, b⟩ = −⟨n, b′⟩ = τ となる。n′ の n 成分は0であり、答えは −κt + τb になる。",
      "エ": "曲率の符号は合うが、⟨n′, b⟩ = −⟨n, b′⟩ = τ なので捩率の符号が逆である。",
      "オ": "曲率がゼロでないため、n′ の接線方向の成分 −κt は省けない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q034",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "ホモロジー群の階数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "幅のない線で書かれた以下の25個のひらがなをそれぞれ平面上の図形として考える。図形 X の0次整数係数ホモロジー群の階数を m(X)、1次整数係数ホモロジー群の階数を n(X) とするとき、m(X) = n(X) を満たす図形 X は全部でいくつ存在するか。",
    "choices": {
      "ア": "1個",
      "イ": "2個",
      "ウ": "3個",
      "エ": "4個",
      "オ": "存在しない。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "0次の階数は連結成分数、1次の階数は独立な輪の数である。図の「す」と「の」はどちらも連結成分が一つで、独立な輪が一つだけある。",
    "choiceExplanations": {
      "ア": "「す」と「の」はいずれも一つにつながっていて独立な輪が一つあるので、該当する図形は1個より多い。",
      "イ": "0次の階数は連結成分数、1次の階数は独立な輪の数である。図の「す」と「の」はどちらも連結成分が一つで、独立な輪が一つだけある。",
      "ウ": "例えば「あ」は閉じた領域が二つあり、連結成分一つと同数にならない。",
      "エ": "線が交わっていても閉じた輪を作るとは限らず、連結成分数と輪の数が等しいのは二つである。",
      "オ": "少なくとも「す」は連結成分と独立な輪を一つずつ持つので、該当する図形は存在する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q034.webp"
    ],
    "imageAltTexts": [
      "25個のひらがなを幅のない線で表した図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q035",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "ベクトル場の交換子積",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "a、b、c、d を a + b + c + d = 1 を満たす実数とする。xy 平面 ℝ² 上の C∞ 級ベクトル場 X、Y を X = y∂/∂x − x∂/∂y、Y = (ax + by)∂/∂x + (cx + dy)∂/∂y で定める。X と Y の交換子積が [X, Y] = y∂/∂x + x∂/∂y となるような a の値として正しいのはどれか。\nただし、交換子積 [X, Y] は、ℝ² 上の任意の C∞ 級関数 f への作用として、[X, Y]f = X(Yf) − Y(Xf) で定義される C∞ 級ベクトル場とする。",
    "choices": {
      "ア": "0",
      "イ": "1/2",
      "ウ": "1",
      "エ": "2",
      "オ": "条件を満たす実数は存在しない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "交換子の成分は ((a − d)y − (b + c)x, (a − d)x + (b + c)y) である。a − d = 1、b + c = 0、a + d = 1 を解くと a = 1 になる。",
    "choiceExplanations": {
      "ア": "a = 0 だと交換子から d = −1 となる一方、b + c = 0 と係数和の条件から d = 1 が必要となり矛盾する。",
      "イ": "a = 1/2 は a + d = 1 を満たすなら d = 1/2 を要するが、交換子で要求される a − d = 1 を満たさない。",
      "ウ": "交換子の成分は ((a − d)y − (b + c)x, (a − d)x + (b + c)y) である。a − d = 1、b + c = 0、a + d = 1 を解くと a = 1 になる。",
      "エ": "a = 2 の場合、a − d = 1 を満たす d = 1 は a + d = 1 に合わない。",
      "オ": "a = 1、d = 0、b = c = 0 で、実際にすべての条件を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q036",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "べき級数の収束半径",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "べき級数 ∑_{n=1}^∞ ((n!)³/(3n)!)x^(3n) の収束半径はいくらか。",
    "choices": {
      "ア": "1/27",
      "イ": "1/3",
      "ウ": "1",
      "エ": "3",
      "オ": "27"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "隣接項の絶対値の比は (n + 1)³|x|³/((3n + 1)(3n + 2)(3n + 3)) → |x|³/27 となる。比の判定から半径は 27 の立方根である3になる。",
    "choiceExplanations": {
      "ア": "係数の比が近づく 1/27 を、そのまま変数 x の収束半径にはできない。",
      "イ": "比の判定で得られる条件は |x|³/27 < 1、すなわち |x| < 3 であり、1/3 ではない。",
      "ウ": "|x| = 1 のとき項の比は 1/27 に近づいて収束するが、さらに大きい |x| でも収束する。",
      "エ": "隣接項の絶対値の比は (n + 1)³|x|³/((3n + 1)(3n + 2)(3n + 3)) → |x|³/27 となる。比の判定から半径は 27 の立方根である3になる。",
      "オ": "変数 x では指数が3n なので、|x|³ に対する境目27の立方根を取る必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q037",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "二次形式の制約付き最大化",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xy 平面上の曲線 x² + 4y² = 1 上の関数 f(x, y) = x² + 4xy − 2y² の最大値はいくらか。",
    "choices": {
      "ア": "1",
      "イ": "5/4",
      "ウ": "3/2",
      "エ": "7/4",
      "オ": "2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "u = x、v = 2y と置くと二次形式の対称行列は ((1, 1), (1, −1/2)) となり、固有値は 3/2 と −1 である。単位円上では最大固有値 3/2 を取る。",
    "choiceExplanations": {
      "ア": "1 は (x, y) = (1, 0) で得られる値だが、xy の項が正になる点でより大きい値を取る。",
      "イ": "u = x、v = 2y と置くと、円 u² + v² = 1 上の二次形式の最大固有値は 3/2 になる。",
      "ウ": "u = x、v = 2y と置くと二次形式の対称行列は ((1, 1), (1, −1/2)) となり、固有値は 3/2 と −1 である。単位円上では最大固有値 3/2 を取る。",
      "エ": "3/2 − f は u = x、v = 2y を用いると (u − 2v)²/2 と書けるので、7/4 には達しない。",
      "オ": "制約上の最大固有値は 3/2 であり、2 には届かない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q039",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "留数定理による閉曲線積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "複素数平面 ℂ 内の閉曲線 Γ を、Γ = {z ∈ ℂ : |z − 2i| = √6}（i は虚数単位）とする。このとき、∫_Γ dz/(z⁴ − 2z³ + 2z² − 2z + 1) の値はいくらか。\nただし、積分の向きは反時計回りとする。",
    "choices": {
      "ア": "−πi/2",
      "イ": "0",
      "ウ": "πi/2",
      "エ": "πi",
      "オ": "3πi/2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "分母は (z − 1)²(z² + 1) で、Γ の内側の極は 1 と i である。留数は順に −1/2 と 1/4 だから、和 −1/4 に 2πi を掛けると −πi/2 になる。",
    "choiceExplanations": {
      "ア": "分母は (z − 1)²(z² + 1) で、Γ の内側の極は 1 と i である。留数は順に −1/2 と 1/4 だから、和 −1/4 に 2πi を掛けると −πi/2 になる。",
      "イ": "二つの極の留数は −1/2 と 1/4 なので打ち消し合わない。",
      "ウ": "i の極だけを数えると πi/2 になるが、閉曲線内の二位の極 z = 1 の寄与も加える必要がある。",
      "エ": "留数の和は −1/4 であり、πi を与える 1/2 ではない。",
      "オ": "z = −i の極は中心 2i から距離3で Γ の外にあり、内側の留数だけを合計すると −πi/2 になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q040",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "測度収束と L¹ 収束",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "正の整数 n に対して、2ᵏ ≤ n < 2ᵏ⁺¹ を満たす0以上の整数 k をとり、関数 fₙ : [0, 1] → ℝ を、区間 [(n − 2ᵏ)/2ᵏ, (n − 2ᵏ + 1)/2ᵏ] に x が属するとき fₙ(x) = 1、属さないとき fₙ(x) = 0 と定める。このとき、関数列 {fₙ} の収束に関する次の記述㋐、㋑、㋒のうち、正しいもののみを全て挙げているのはどれか。\n㋐ {fₙ} はほとんど至るところで0に収束する。すなわち、数列 {fₙ(x)} が0に収束するような x ∈ [0, 1] 全体の集合のルベーグ測度は1である。\n㋑ {fₙ} は0に測度収束する。すなわち、任意の ε > 0 に対して、|fₙ(x)| > ε を満たす x ∈ [0, 1] 全体の集合のルベーグ測度は n → ∞ のとき0に収束する。\n㋒ {fₙ} は0に L¹ 収束する。すなわち、ルベーグ積分 ∫₀¹ |fₙ(x)| dx は n → ∞ のとき0に収束する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各 k の区間の集まりは [0, 1] を覆うため各点で無限回1を取り、㋐は誤りである。一方、立っている区間の長さが 2⁻ᵏ → 0 なので、㋑と㋒が成り立つ。",
    "choiceExplanations": {
      "ア": "各 k に対し幅 2⁻ᵏ の区間は [0, 1] を覆うので、各点で無限に多くの項が1になり、㋐は成立しない。",
      "イ": "㋑は正しいが、各点で fₙ(x) = 1 が無限に起きるため㋐は誤りである。",
      "ウ": "㋑と㋒はいずれも区間の長さが0に近づくことで成立するが、㋐は成立しない。",
      "エ": "各 k の区間の集まりは [0, 1] を覆うため各点で無限回1を取り、㋐は誤りである。一方、立っている区間の長さが 2⁻ᵏ → 0 なので、㋑と㋒が成り立つ。",
      "オ": "㋒に加え、0 < ε < 1 では |fₙ| > ε となる集合の測度も 2⁻ᵏ なので㋑が成立する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q041",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "偏微分方程式への代入",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "a、b を正の定数とし、(0, ∞) × (0, ∞) 上の関数 f(t, x)、u(t, x) を f(t, x) = at^(1/2) + bt^(−1/2) logₑ x、u(t, x) = x ∫₀^{f(t,x)} e^(−y²) dy で定める。関数 u(t, x) が偏微分方程式 ∂u/∂t(t, x) − x²∂²u/∂x²(t, x) − 2x∂u/∂x(t, x) + 2u(t, x) = 0 の解であるとき、定数 a、b の値の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "1/2／1/2",
      "イ": "3/2／1/2",
      "ウ": "3/2／3/2",
      "エ": "5/2／3/2",
      "オ": "5/2／5/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "s = logₑ x、u = xG とすると方程式は Gₜ − Gₛₛ − 3Gₛ = 0 となる。代入後の s の係数により b = 1/2、定数項 a(1/2 + 2b²) − 3b = 0 により a = 3/2 となる。",
    "choiceExplanations": {
      "ア": "b = 1/2 のとき対数項は消えるが、残った定数項から a = 3/2 が必要になる。",
      "イ": "s = logₑ x、u = xG とすると方程式は Gₜ − Gₛₛ − 3Gₛ = 0 となる。代入後の s の係数により b = 1/2、定数項 a(1/2 + 2b²) − 3b = 0 により a = 3/2 となる。",
      "ウ": "a は合っているが、b = 3/2 では b(2b² − 1/2) がゼロにならず、logₑ x に依存する項が残る。",
      "エ": "b = 3/2 では、a の値に関係なく logₑ x の係数を消すことができない。",
      "オ": "b = 5/2 では logₑ x の係数がゼロにならないので、方程式を全域で満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q042",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "初期値問題の局所解の一意性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の性質をもつような正の実数 a 全体の集合として正しいのはどれか。\n【性質】1変数関数 x = x(t) に対する常微分方程式の初期値問題 x′(t) = |x(t)|ᵃ、x(0) = 0 は、ある ε > 0 について、区間 (−ε, ε) でただ一つの解をもつ。",
    "choices": {
      "ア": "(0, 1)",
      "イ": "(0, 1]",
      "ウ": "(0, ∞)",
      "エ": "(1, ∞)",
      "オ": "[1, ∞)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "a ≥ 1 では |x|ᵃ が初期値付近で局所リプシッツ連続なのでゼロ解が一意である。0 < a < 1 では正の t 側でべき関数の解を0につなげられるため一意でない。",
    "choiceExplanations": {
      "ア": "0 < a < 1 では t > 0 で ((1 − a)t)^(1/(1 − a))、t ≤ 0 で0とする解も存在する。",
      "イ": "a = 1 では一意だが、0 < a < 1 ではゼロ解のほかに非ゼロ解が存在し、a > 1 でも解は一意である。",
      "ウ": "すべての正の a でゼロ解は存在するが、0 < a < 1 では一意性が失われる。",
      "エ": "a = 1 の右辺 |x| もリプシッツ連続なので、1を除く必要はない。",
      "オ": "a ≥ 1 では |x|ᵃ が初期値付近で局所リプシッツ連続なのでゼロ解が一意である。0 < a < 1 では正の t 側でべき関数の解を0につなげられるため一意でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q043",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "フーリエ係数と直交性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "正の整数 n に対して aₙ = (1/π)∫₋π^π x sin(nx) dx とおく。N を正の整数とするとき、∫₋π^π (x − ∑_{n=1}ᴺ aₙ sin(nx))² dx と等しいのは次のうちどれか。",
    "choices": {
      "ア": "π³/6 − π∑_{n=1}ᴺ 1/n²",
      "イ": "π³/3 − 2π∑_{n=1}ᴺ 1/n²",
      "ウ": "π³/2 − 3π∑_{n=1}ᴺ 1/n²",
      "エ": "2π³/3 − 4π∑_{n=1}ᴺ 1/n²",
      "オ": "5π³/6 − 5π∑_{n=1}ᴺ 1/n²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "部分積分で aₙ = 2(−1)ⁿ⁺¹/n を得る。正弦の直交性により誤差二乗積分は ∫₋π^π x² dx − π∑ aₙ² となり、2π³/3 − 4π∑ 1/n² に等しい。",
    "choiceExplanations": {
      "ア": "区間が [−π, π] なので x² の積分は 2π³/3 であり、π³/6 にはならない。",
      "イ": "π³/3 は [0, π] だけの x² の積分であり、問題の区間は負の側も含む。",
      "ウ": "部分積分で |aₙ| = 2/n となるため、直交射影による減少分は 3π/n² ではなく 4π/n² である。",
      "エ": "部分積分で aₙ = 2(−1)ⁿ⁺¹/n を得る。正弦の直交性により誤差二乗積分は ∫₋π^π x² dx − π∑ aₙ² となり、2π³/3 − 4π∑ 1/n² に等しい。",
      "オ": "定数項は x² の積分 2π³/3 であり、正弦一項当たりの減少分は πaₙ² = 4π/n² である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q044",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "ベクトル場の面積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xyz 空間において、S = {(x, y, z) ∈ ℝ³ : z = 4 − x² − y²、z ≥ 0} とする。S は n(0, 0, 4) = (0, 0, 1) を満たす外向きの単位法線ベクトル場 n により向き付けられているとする。ℝ³ ∖ {(0, 0, 0)} のベクトル場 A を A(x, y, z) = (x, y, z)/(x² + y² + z²)^(3/2) で定める。このとき、面積分 ∬_S A・n dS の値はいくらか。",
    "choices": {
      "ア": "π/4",
      "イ": "π/2",
      "ウ": "π",
      "エ": "2π",
      "オ": "4π"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "原点から上半球に向かう各半直線は S と一度だけ交わる。逆二乗の放射状ベクトル場の流束は、その方向が覆う単位半球の面積 2π に等しい。",
    "choiceExplanations": {
      "ア": "曲面は原点から見て上半球全体の方向を覆うため、立体角は π/4 より大きい。",
      "イ": "流束は原点から見た立体角に等しく、上半空間に対応するので 2π になる。",
      "ウ": "z 軸を含む垂直面で曲面を二等分した片方の流束が π であり、全体ではその2倍である。",
      "エ": "原点から上半球に向かう各半直線は S と一度だけ交わる。逆二乗の放射状ベクトル場の流束は、その方向が覆う単位半球の面積 2π に等しい。",
      "オ": "4π は原点の周りの全方向に対応する流束であり、S が覆うのは上半分である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q045",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "抽出確率と確率の極限",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "n を正の整数とする。中身の見えない大きな袋に n 個の玉が入っており、このうち1個は赤玉で、他は黒玉である。また、袋の外にも予備の赤玉が n 個ある。この袋の中から無作為に1個の玉を取り出して色を調べ、黒玉の場合は取り出した黒玉を袋に戻し、赤玉の場合は取り出した赤玉を袋に戻すとともに予備の赤玉1個を袋に入れる。この操作を n 回繰り返したとき、赤玉を2回以上取り出す確率を pₙ とする。lim_{n→∞} pₙ はいくらか。",
    "choices": {
      "ア": "1 − 2e⁻¹ + e⁻²",
      "イ": "1 − e⁻¹ − e⁻²",
      "ウ": "e⁻¹ + e⁻²",
      "エ": "1 − e⁻¹ + e⁻²",
      "オ": "1 − e⁻¹ + 2e⁻²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "赤玉0回の確率は ((n−1)/n)ⁿ → e⁻¹ である。赤玉1回は出る時点について等比和を取ると極限が e⁻¹ − e⁻² となるので、両者を1から引いて 1 − 2e⁻¹ + e⁻² を得る。",
    "choiceExplanations": {
      "ア": "赤玉0回の確率は ((n−1)/n)ⁿ → e⁻¹ である。赤玉1回は出る時点について等比和を取ると極限が e⁻¹ − e⁻² となるので、両者を1から引いて 1 − 2e⁻¹ + e⁻² を得る。",
      "イ": "赤玉1回の確率は赤玉が増える前後で黒玉の確率が変わるため、極限は e⁻² 単独ではなく e⁻¹ − e⁻² になる。",
      "ウ": "赤玉0回と1回の確率の合計の極限は 2e⁻¹ − e⁻² であり、その余事象を取るとこの式にはならない。",
      "エ": "赤玉1回の極限 e⁻¹ − e⁻² と0回の極限 e⁻¹ を両方引くと、e⁻¹ の係数は −2 になる。",
      "オ": "追加後に黒玉を引く確率 (n−1)/(n+1) の n 乗は e⁻² に近づくが、1回の確率は e⁻¹ − e⁻² に近づく。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q046",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "独立な確率変数の最小値",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "二つの実数値確率変数 X、Y は独立で、それぞれの確率密度関数が f_X(x) = 4xe^(−2x)（x > 0）、0（x ≤ 0）、f_Y(y) = e^(−y)（y > 0）、0（y ≤ 0）で与えられるものとする。このとき、min{X, Y} の期待値はいくらか。",
    "choices": {
      "ア": "1/3",
      "イ": "4/9",
      "ウ": "5/9",
      "エ": "2/3",
      "オ": "7/9"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "独立性から P(min{X,Y} > t) = P(X > t)P(Y > t) = (1 + 2t)e^(−3t) となる。これを t = 0 から ∞ まで積分すると 1/3 + 2/9 = 5/9 になる。",
    "choiceExplanations": {
      "ア": "1/3 は生存確率 e^(−3t) の積分であり、X の生存確率に含まれる因子 (1 + 2t) の寄与を落としている。",
      "イ": "t を超える確率は (1 + 2t)e^(−3t) なので、積分は 1/3 + 2/9 になる。",
      "ウ": "独立性から P(min{X,Y} > t) = P(X > t)P(Y > t) = (1 + 2t)e^(−3t) となる。これを t = 0 から ∞ まで積分すると 1/3 + 2/9 = 5/9 になる。",
      "エ": "生存確率のうち 2te^(−3t) の積分は 2/9 なので、残りの 1/3 と足しても 2/3 にならない。",
      "オ": "t の項を含めて積分すると 1/3 + 2/9 となり、7/9 にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q047",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "独立な変数の線形結合の分散",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "確率変数 X₁、X₂、X₃ は独立で、k = 1、2、3 に対して確率変数 Xₖ は区間 [−k, k] 上の一様分布に従うとする。実数 a、b、c に対して S(a, b, c) = aX₁ + bX₂ + cX₃ とおくとき、a + b + c = 1 という条件の下で S(a, b, c) の分散が最小になるような (a, b, c) がただ一つ存在する。このときの a の値はいくらか。",
    "choices": {
      "ア": "2/11",
      "イ": "6/11",
      "ウ": "4/49",
      "エ": "24/49",
      "オ": "36/49"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "独立性により分散は (a² + 4b² + 9c²)/3 となる。和を1に固定して最小化すると (a, b, c) は (1, 1/4, 1/9) に比例し、a = 36/49 である。",
    "choiceExplanations": {
      "ア": "分散が最小の X₁ に最大の重みを割り当てるため、2/11 は小さすぎる。",
      "イ": "重みの比は一様分布の分散の逆数の比 36 : 9 : 4 であり、a は 6/11 にはならない。",
      "ウ": "4/49 は最も分散が大きい X₃ に対応する c の値である。",
      "エ": "分散の逆数で重み付けすると a : b : c = 36 : 9 : 4 になるので、a の分子は24ではない。",
      "オ": "独立性により分散は (a² + 4b² + 9c²)/3 となる。和を1に固定して最小化すると (a, b, c) は (1, 1/4, 1/9) に比例し、a = 36/49 である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q048",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "パレート分布の微分エントロピー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "α > 0 に対して、確率密度関数 p_α(x) を p_α(x) = αx^(−(α+1))（x ≥ 1）、0（x < 1）によって定義し、H(α) = ∫₁^∞ p_α(x) logₑ(1/p_α(x)) dx とする。H(n) < 0 となる正の整数 n のうち、最小のものはどれか。\nなお、必要ならば、次の不等式を用いてよい。\nx > 1 のとき 2(x − 1)(1/(3 + x) + 1/(1 + 3x)) < logₑ x < (x² − 1)/(2x)",
    "choices": {
      "ア": "2",
      "イ": "3",
      "ウ": "4",
      "エ": "5",
      "オ": "6"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "積分すると H(α) = 1 + 1/α − logₑ α となる。この関数は単調減少で、H(3) は正、H(4) は logₑ 4 > 5/4 により負である。",
    "choiceExplanations": {
      "ア": "H(2) = 3/2 − logₑ 2 であり、logₑ 2 < 3/4 なので正である。",
      "イ": "H(3) = 4/3 − logₑ 3 であり、不等式の上界 4/3 から正と分かる。",
      "ウ": "積分すると H(α) = 1 + 1/α − logₑ α となる。この関数は単調減少で、H(3) は正、H(4) は logₑ 4 > 5/4 により負である。",
      "エ": "H(5) は負だが、与えられた対数の下界を使うと H(4) が既に負であると分かる。",
      "オ": "H(6) は負だが、最初に負になる正整数は4である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q049",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "ラプラス分布の最尤推定",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "データ x₁、x₂、x₃、x₄、x₅（x₁ < x₂ < x₃ < x₄ < x₅）が得られたとする。パラメータ θ = (μ, λ)（λ > 0）をもつ確率密度関数 p_θ(x) = (λ/2)e^(−λ|x−μ|) を考え、最尤推定法 max_θ ∑_{i=1}⁵ logₑ p_θ(xᵢ) によってパラメータを推定する。最尤推定量 (μ̂, λ̂) の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "x₃ ／ (∑_{i=1}⁵ ∣xᵢ − μ̂∣)/5",
      "イ": "x₃ ／ 5/(∑_{i=1}⁵ ∣xᵢ − μ̂∣)",
      "ウ": "(∑_{i=1}⁵ ∣xᵢ∣)/5 ／ 5/(∑_{i=1}⁵ ∣xᵢ − μ̂∣)",
      "エ": "(∑_{i=1}⁵ xᵢ)/5 ／ (∑_{i=1}⁵ ∣xᵢ − μ̂∣)/5",
      "オ": "(∑_{i=1}⁵ xᵢ)/5 ／ 5/(∑_{i=1}⁵ ∣xᵢ − μ̂∣)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "対数尤度は 5 logₑ(λ/2) − λ∑|xᵢ − μ| であり、絶対偏差の和を最小にする μ は中央値 x₃ である。λ について微分してゼロとおくと λ̂ = 5/∑|xᵢ − μ̂| が得られる。",
    "choiceExplanations": {
      "ア": "中央値 x₃ は正しいが、λ は絶対偏差の平均の逆数である。",
      "イ": "対数尤度は 5 logₑ(λ/2) − λ∑|xᵢ − μ| であり、絶対偏差の和を最小にする μ は中央値 x₃ である。λ について微分してゼロとおくと λ̂ = 5/∑|xᵢ − μ̂| が得られる。",
      "ウ": "絶対偏差の和 ∑|xᵢ − μ| を最小化するのは、絶対値の平均ではなくデータの中央値である。",
      "エ": "μ は二乗偏差の和を最小にする平均とは異なり中央値であり、λ は絶対偏差の平均の逆数である。",
      "オ": "λ の式は μ を固定した場合に正しいが、一般に算術平均は絶対偏差の和の最小点にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q050",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "計算機数学",
    "topicTags": [
      "異なる基数の表記",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "3進数、8進数、16進数で表現された値が全て等しいものの組合せとして正しいのはどれか。",
    "choices": {
      "ア": "1121202／2235／49B",
      "イ": "1201200／2400／500",
      "ウ": "1210122／2441／521",
      "エ": "2000211／2720／5C8",
      "オ": "2011120／3073／A1A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各桁に基数のべき乗を掛けて足すと、3進数 1210122、8進数 2441、16進数 521 は全て十進で1313になる。",
    "choiceExplanations": {
      "ア": "3進数と8進数は十進で1181だが、16進数 49B は1179になる。",
      "イ": "8進数 2400 と16進数 500 は1280だが、3進数 1201200 は1260である。",
      "ウ": "各桁に基数のべき乗を掛けて足すと、3進数 1210122、8進数 2441、16進数 521 は全て十進で1313になる。",
      "エ": "3進数と16進数は十進で1480だが、8進数 2720 は1488になる。",
      "オ": "8進数 3073 は1595、16進数 A1A は2586 であり、すべて同じ値ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q051",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "情報理論",
    "topicTags": [
      "確率変数の変換とエントロピー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "U_X = {−1, 0, 1} 上に値をとる確率変数 X の確率分布が P(X = x) = 1/3（x ∈ U_X）で与えられるとする。また、確率変数 Y、Z を Y = sin (π/2)X、Z = cos πX で定義する。U_Y、U_Z をそれぞれ Y、Z の定義域とするとき、X、Y、Z のエントロピー\n・H(X) = −Σ_(x∈U_X) P(X = x) log₂ P(X = x)\n・H(Y) = −Σ_(y∈U_Y) P(Y = y) log₂ P(Y = y)\n・H(Z) = −Σ_(z∈U_Z) P(Z = z) log₂ P(Z = z)\nの大小関係として正しいのはどれか。",
    "choices": {
      "ア": "H(X) = H(Y) ＜ H(Z)",
      "イ": "H(Y) ＜ H(X) ＜ H(Z)",
      "ウ": "H(Y) ＜ H(Z) ＜ H(X)",
      "エ": "H(Z) ＜ H(X) = H(Y)",
      "オ": "H(Z) ＜ H(X) ＜ H(Y)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "三つの入力に対し Y = X なので H(X) = H(Y) = log₂ 3 である。Z は確率 2/3 と 1/3 の二値分布で、H(Z) = log₂ 3 − 2/3 となる。",
    "choiceExplanations": {
      "ア": "X と Y のエントロピーは等しいが、Z では X = −1 と X = 1 の確率が一つにまとまるため、H(Z) は小さくなる。",
      "イ": "この関係は同年のデジタル区分 No. 46 の正答番号表が示すが、数理科学・物理・地球科学区分では選択肢4が公式正答である。実際に Y = X であり、Z が三つの入力を二つの値にまとめるため H(Z) が小さい。",
      "ウ": "H(Y) と H(X) は等しいため、H(Z) が両者の間にある関係は成立しない。",
      "エ": "三つの入力に対し Y = X なので H(X) = H(Y) = log₂ 3 である。Z は確率 2/3 と 1/3 の二値分布で、H(Z) = log₂ 3 − 2/3 となる。",
      "オ": "H(Z) が最も小さい点は合うが、Y = X なので H(X) と H(Y) の大小は付かない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q052",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "計算機数学",
    "topicTags": [
      "有限オートマトンの部分集合構成",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図(a)で示される非決定性有限オートマトンと等価な決定性有限オートマトンは次のうちではどれか。\nただし、初期状態を ⇒、受理状態を ◎ で表すとする。",
    "choices": {
      "ア": "(b)",
      "イ": "(c)",
      "ウ": "(d)",
      "エ": "(e)",
      "オ": "(f)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "(a) の到達可能集合は初期状態のみ、両状態、非受理状態のみ、空集合の四つであり、(e) の左上、右上、左下、右下の各状態に対応する。両状態の集合と空集合は0でも1でもそれぞれ自分自身に移る。",
    "choiceExplanations": {
      "ア": "(b) は入力 011 で非受理状態に移るが、(a) は最初の0で両状態に到達でき、その後も受理可能である。",
      "イ": "(c) は 1011 を受理するが、(a) は先頭の10を読んだ段階で到達できる状態がなくなる。",
      "ウ": "(d) は 1001 を受理するが、(a) は初めの10で到達できる状態がなくなり、その後も受理できない。",
      "エ": "(a) の到達可能集合は初期状態のみ、両状態、非受理状態のみ、空集合の四つであり、(e) の左上、右上、左下、右下の各状態に対応する。両状態の集合と空集合は0でも1でもそれぞれ自分自身に移る。",
      "オ": "(f) は 001 で非受理状態に移るが、(a) は最初の0の後に両状態まで到達できる状態を保つ。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q052.webp"
    ],
    "imageAltTexts": [
      "非決定性オートマトン(a)と決定性オートマトン(b)～(f)の状態遷移図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q055",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "台形公式による数値積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次のプログラムを実行したときに表示される値に最も近い値は次のうちではどれか。\n#include<stdio.h>\nint main(void){\n  int i, T = 1000000;\n  double x1, x2, a;\n  a = 0;\n  for(i = 0; i < T; i++){\n    x1 = (double)i/T;\n    x2 = (double)(i+1)/T;\n    a = a + (1.0/(1+x1*x1) + 1.0/(1+x2*x2))/(double)T/2.0;\n  }\n  printf(\"%f\\n\", a);\n  return 0;\n}",
    "choices": {
      "ア": "0.523",
      "イ": "0.785",
      "ウ": "1.047",
      "エ": "1.570",
      "オ": "3.141"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "プログラムは区間 [0, 1] で 1/(1 + x²) の積分を台形公式で求めている。積分値は arctan(1) − arctan(0) = π/4 ≈ 0.785 になる。",
    "choiceExplanations": {
      "ア": "0.523 はおよそ π/6 だが、積分の上端1に対応する逆正接は π/4 である。",
      "イ": "プログラムは区間 [0, 1] で 1/(1 + x²) の積分を台形公式で求めている。積分値は arctan(1) − arctan(0) = π/4 ≈ 0.785 になる。",
      "ウ": "被積分関数は [0, 1] で1を超えないので、面積が 1.047 になることはない。",
      "エ": "1.570 は正の半直線全体での積分値 π/2 に近いが、計算は x = 1 で止まる。",
      "オ": "3.141 は実数全体での積分値 π に近いが、プログラムの積分区間は [0, 1] である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q056",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "包除原理",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "1000以下の正の自然数で、かつ、2、3、5、7 のいずれとも互いに素である数は全部でいくつあるか。",
    "choices": {
      "ア": "228個",
      "イ": "256個",
      "ウ": "275個",
      "エ": "294個",
      "オ": "299個"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "2、3、5、7 の倍数を包除原理で除くと228個になる。周期210ごとに φ(210) = 48 個あり、840までの192個と841～1000の36個を加えても確認できる。",
    "choiceExplanations": {
      "ア": "2、3、5、7 の倍数を包除原理で除くと228個になる。周期210ごとに φ(210) = 48 個あり、840までの192個と841～1000の36個を加えても確認できる。",
      "イ": "各整数を210を法とする剰余で数えると完全な四周期で192個、残りで36個なので、256個にはならない。",
      "ウ": "1～210には48個あり、残りの区間は210より短く48個以下なので、全体は240個以下である。",
      "エ": "2、3、5、7 のいずれかで割り切れる場合の重複を包除原理で調整すると772個であり、残るのは228個である。",
      "オ": "1～1000では210を法として互いに素な剰余類は48種類あり、当てはまる数は最多でも48 × 5 = 240個である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q057",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "グラフの彩色数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "グラフ G の隣接するどの二つの頂点も同じ色にならないように、各頂点に k 個の色の一つを割り当てることが可能であるとき、G は k-彩色可能であるという。k-彩色可能であるが (k − 1)-彩色可能でないとき、G の彩色数は k であるという。次に示すグラフ(a)～(e)のうち、彩色数が3であるもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "(a)、(b)、(c)",
      "イ": "(a)、(b)、(c)、(d)",
      "ウ": "(a)、(d)、(e)",
      "エ": "(b)、(d)",
      "オ": "(b)、(e)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "(b) と (d) は三角形を含むので3色以上が必要である。(b) の葉は接続先と異なる色にでき、(d) の四角形を2色で交互に塗って中心を3色目にすると足りる。",
    "choiceExplanations": {
      "ア": "(a) は木なので2色で足り、(c) は4頂点が互いに接続する完全グラフなので4色を要する。",
      "イ": "(b) と (d) は3色だが、(a) は2色、(c) は4色である。",
      "ウ": "(d) は3色を要するが、(a) は木、(e) は二部グラフで、いずれも2色で足りる。",
      "エ": "(b) と (d) は三角形を含むので3色以上が必要である。(b) の葉は接続先と異なる色にでき、(d) の四角形を2色で交互に塗って中心を3色目にすると足りる。",
      "オ": "(e) の両対角端点を同色、中点と残りの2頂点を別の色にすると2色で塗れる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q057.webp"
    ],
    "imageAltTexts": [
      "彩色数を比較する五つのグラフ(a)～(e)"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q058",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "点連結度と辺連結度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "頂点集合を V、枝集合を E とする無向グラフ G = (V, E) に対して、G から E の部分集合 E′ の全ての辺を除去して得られるグラフを G − E′ と書く。G から V の部分集合 V′ の全ての頂点とそれらに接続する全ての辺を除去して得られるグラフを G − V′ で表す。G の点連結度 κ(G) と辺連結度 λ(G) はそれぞれ次の式で定義される。\nκ(G) = min {n : n = |V′|、V′ ⊂ V、G − V′ が非連結又は自明グラフ}\nλ(G) = min {n : n = |E′|、E′ ⊂ E、G − E′ が非連結又は自明グラフ}\nG の任意の頂点 v ∈ V に対して、v と接続している辺の数を v の次数と呼び、deg(v) で表す。min_{v∈V}{deg(v)} を G の最小次数と呼び、δ(G) と記す。頂点の個数が2以上である任意のグラフに対して成り立つ不等式として正しいのはどれか。\nただし、G は連結かつ自明でないグラフであるとする。",
    "choices": {
      "ア": "κ(G) = λ(G) ≦ δ(G)",
      "イ": "κ(G) ≦ λ(G) ≦ δ(G)",
      "ウ": "δ(G) = λ(G) ≦ κ(G)",
      "エ": "δ(G) ≦ λ(G) = κ(G)",
      "オ": "δ(G) ≦ λ(G) ≦ κ(G)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "点素な道は辺素でもあるため、連結度の Menger の定理から κ(G) ≤ λ(G) となる。最小次数の頂点に接続する全辺を除けば非連結になるので λ(G) ≤ δ(G) である。",
    "choiceExplanations": {
      "ア": "二つの三角形が1頂点だけを共有するグラフでは、共有頂点の削除で分離できるが、分離には少なくとも辺2本の削除が要る。",
      "イ": "点素な道は辺素でもあるため、連結度の Menger の定理から κ(G) ≤ λ(G) となる。最小次数の頂点に接続する全辺を除けば非連結になるので λ(G) ≤ δ(G) である。",
      "ウ": "二つの三角形を1本の辺で結ぶと、最小次数は2だが辺連結度は1になるため、等号は常には成立しない。",
      "エ": "二つの三角形が1頂点だけを共有するとき δ(G) = λ(G) = 2、κ(G) = 1 なので、λ(G) と κ(G) は等しくない。",
      "オ": "例えば二つの三角形を橋1本で結ぶグラフでは δ(G) = 2 > λ(G) = 1 となり、最初の不等号が逆になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q059",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "ガウス・ザイデル法",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "連立一次方程式 2x + y = −2、−x + 5y + 2z = 1、y − 3z = −3 をガウス・ザイデル法で解く。方程式を上から順に用いて x、y、z の順に更新するときの漸化式を (xₖ₊₁, yₖ₊₁, zₖ₊₁)ᵀ = A(xₖ, yₖ, zₖ)ᵀ + b で表すとき、行列 A とベクトル b の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "A = ((0, −1/2, 0), (1/5, 0, −2/5), (0, 1/3, 0))、b = (−1, 1/5, 1)ᵀ",
      "イ": "A = ((2, 1, 0), (−1, 5, 2), (0, 1, −3))、b = (−2, 1, −3)ᵀ",
      "ウ": "A = ((0, −1/2, 0), (0, −1/10, −2/5), (0, −1/30, −2/15))、b = (−1, 0, 1)ᵀ",
      "エ": "A = ((1, 1/2, 0), (0, 1, 4/11), (0, 0, 1))、b = (−1, 0, 33/37)ᵀ",
      "オ": "A = ((0, −1/2, 0), (0, 0, −1/10), (0, 0, 1/15))、b = (−1, 1, 7/5)ᵀ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "xₖ₊₁ = −1 − yₖ/2 を yₖ₊₁ = (1 + xₖ₊₁ − 2zₖ)/5 に代入すると定数項が相殺される。さらに zₖ₊₁ = 1 + yₖ₊₁/3 に代入すると第3行の係数は (0, −1/30, −2/15) となる。",
    "choiceExplanations": {
      "ア": "各更新で古い x、y を使っているため、これはヤコビ法の形である。",
      "イ": "この組は連立方程式そのものの係数と右辺であり、各変数を順に更新する漸化式にはなっていない。",
      "ウ": "xₖ₊₁ = −1 − yₖ/2 を yₖ₊₁ = (1 + xₖ₊₁ − 2zₖ)/5 に代入すると定数項が相殺される。さらに zₖ₊₁ = 1 + yₖ₊₁/3 に代入すると第3行の係数は (0, −1/30, −2/15) となる。",
      "エ": "第1式から新しい x は古い x を含まず、古い y の係数も正ではなく −1/2 である。",
      "オ": "新しい y は古い y と z の両方に依存し、定数項は最初の更新を代入すると0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q060",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "最小二乗直線の傾き",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "二つの量 x、y を実験によって測定したところ、5組のデータ (xᵢ, yᵢ)（i = 1、2、3、4、5）が表のとおり得られた。x、y の関係を y = ax + b で近似したとき最小二乗法によって a、b を求める場合の a の値はいくらか。",
    "choices": {
      "ア": "0.17",
      "イ": "0.27",
      "ウ": "0.37",
      "エ": "0.47",
      "オ": "0.57"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最小二乗直線の傾きは ∑(xᵢ − x̄)yᵢ/∑(xᵢ − x̄)² である。x̄ = 40 を用いると分子は370、分母は1000となり、a = 0.37 である。",
    "choiceExplanations": {
      "ア": "x を平均40で中心化して掛け合わせた総和は370であり、170にはならない。",
      "イ": "分母は中心化した x の二乗和1000、分子は中心化した x と y の積の和370なので、0.27 にはならない。",
      "ウ": "最小二乗直線の傾きは ∑(xᵢ − x̄)yᵢ/∑(xᵢ − x̄)² である。x̄ = 40 を用いると分子は370、分母は1000となり、a = 0.37 である。",
      "エ": "x = 40 の点は中心化した x が0なので分子に寄与せず、残り4点の寄与は合計370である。",
      "オ": "平均を使った共分散と分散の比は 74/200 となるので、傾きは 0.57 より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q060.webp"
    ],
    "imageAltTexts": [
      "最小二乗法で近似する5組の測定データ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q066",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "物理数学",
    "topicTags": [
      "フーリエ余弦級数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "区間 [−π, π] において、関数 f(x) = |sin(x/2)| をフーリエ余弦級数に展開すると f(x) = a₀/2 + ∑_{n=1}^∞ aₙ cos(nx) となる。このとき、フーリエ係数 aₙ (n = 0, 1, 2, …) として正しいのはどれか。",
    "choices": {
      "ア": "−8n/(π(4n² − 1))",
      "イ": "−4/(π(4n² − 1))",
      "ウ": "−8n/(π(4n² + 1))",
      "エ": "−4/(π(4n² + 1))",
      "オ": "−4/(π(2n² + 1))"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "偶関数なので aₙ = (2/π)∫₀^π sin(x/2) cos(nx) dx となる。積和公式で得られる 1/2 ± n の項を積分して −4/(π(4n² − 1)) を得る。",
    "choiceExplanations": {
      "ア": "n = 0 を代入すると0になるが、a₀ は正の関数を積分して得られる 4/π である。",
      "イ": "偶関数なので aₙ = (2/π)∫₀^π sin(x/2) cos(nx) dx となる。積和公式で得られる 1/2 ± n の項を積分して −4/(π(4n² − 1)) を得る。",
      "ウ": "a₀ が0になっているが、[0, π] で sin(x/2) の積分は2であり、a₀ は 4/π である。",
      "エ": "積和公式の分母には (1/2 + n)(1/2 − n) が現れ、4n² と1を加えた式にはならない。",
      "オ": "n = 0 で係数が負になるが、a₀ は f の正の平均値の2倍である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q069",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "ばねで結ばれた二体の相対運動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "質量 m₁ の小球1と質量 m₂ の小球2をばね定数 k のばねの両端にそれぞれ固定し、小球1を手で持ち上げて図のように静止させた。この状態で小球1から静かに手を離したところ、二つの小球は相対的に単振動しながら落下した。この単振動の振幅と周期の組合せとして最も妥当なのはどれか。\nただし、重力加速度の大きさを g とし、ばねの質量及び空気抵抗は無視できるとする。",
    "choices": {
      "ア": "m₁g/k ／ 2π√(m₁/k)",
      "イ": "m₁g/k ／ 2π√(m₁m₂/((m₁ + m₂)k))",
      "ウ": "m₂g/k ／ 2π√(m₁/k)",
      "エ": "m₂g/k ／ 2π√(m₂/k)",
      "オ": "m₂g/k ／ 2π√(m₁m₂/((m₁ + m₂)k))"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "静止時の伸び m₂g/k が相対振動の振幅となる。自由落下中の相対運動は換算質量 m₁m₂/(m₁ + m₂) のばね振動なので、周期は 2π√(m₁m₂/((m₁ + m₂)k)) である。",
    "choiceExplanations": {
      "ア": "初期伸びは下側の小球2の重さで決まり、落下中は二つとも動くので周期にも両方の質量が入る。",
      "イ": "周期は換算質量を使うので合っているが、手を離す前にばねが支えるのは質量 m₂ の小球である。",
      "ウ": "振幅は合うが、相対運動の慣性には小球1だけでなく小球2も寄与する。",
      "エ": "上の小球も自由に動けるため、周期を下の小球一個の質量だけで決めることはできない。",
      "オ": "静止時の伸び m₂g/k が相対振動の振幅となる。自由落下中の相対運動は換算質量 m₁m₂/(m₁ + m₂) のばね振動なので、周期は 2π√(m₁m₂/((m₁ + m₂)k)) である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q069.webp"
    ],
    "imageAltTexts": [
      "上の小球1を手で支え、下に小球2が付いたばね"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q070",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "ハミルトンの正準運動方程式",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ハミルトンの正準運動方程式に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「質量が m₁ と m₂ の二つの粒子が位置 r₁ と r₂ にあり、ポテンシャル V(r₁, r₂) の中で運動している系を考える。粒子 i (i = 1, 2) の運動量を pᵢ とすると、ハミルトニアン H は［㋐］であり、それをもとにハミルトンの正準運動方程式［㋑］、［㋒］を組み合わせると、ニュートンの運動方程式を求めることができる。」",
    "choices": {
      "ア": "H = p₁²/(2m₁) + p₂²/(2m₂) + V(r₁, r₂) ／ drᵢ/dt = ∂H/∂pᵢ ／ dpᵢ/dt = −∂H/∂rᵢ",
      "イ": "H = p₁²/(2m₁) + p₂²/(2m₂) + V(r₁, r₂) ／ drᵢ/dt = −∂H/∂pᵢ ／ dpᵢ/dt = ∂H/∂rᵢ",
      "ウ": "H = p₁²/(2m₁) + p₂²/(2m₂) − V(r₁, r₂) ／ drᵢ/dt = ∂H/∂pᵢ ／ dpᵢ/dt = −∂H/∂rᵢ",
      "エ": "H = p₁²/(2m₁) + p₂²/(2m₂) − V(r₁, r₂) ／ drᵢ/dt = −∂H/∂pᵢ ／ dpᵢ/dt = ∂H/∂rᵢ",
      "オ": "H = −p₁²/(2m₁) − p₂²/(2m₂) − V(r₁, r₂) ／ drᵢ/dt = −∂H/∂pᵢ ／ dpᵢ/dt = ∂H/∂rᵢ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ハミルトニアンは運動エネルギーとポテンシャルエネルギーの和である。正準方程式は drᵢ/dt = ∂H/∂pᵢ と dpᵢ/dt = −∂H/∂rᵢ であり、後者は力がポテンシャルの負の勾配であることに対応する。",
    "choiceExplanations": {
      "ア": "ハミルトニアンは運動エネルギーとポテンシャルエネルギーの和である。正準方程式は drᵢ/dt = ∂H/∂pᵢ と dpᵢ/dt = −∂H/∂rᵢ であり、後者は力がポテンシャルの負の勾配であることに対応する。",
      "イ": "H は合っているが、位置と運動量の二つの運動方程式の符号が逆である。",
      "ウ": "正準運動方程式の符号は合っているが、ハミルトニアンにはポテンシャル V を加える。",
      "エ": "この H の V の符号と、正準方程式の両方の符号が合わない。",
      "オ": "この組は H と二つの正準方程式の符号をまとめて反転している。幾つかの運動は同じ形になるが、設問で求めるハミルトニアンは全エネルギーである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q071",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "中心力場の円運動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "原点からの距離を r として、中心力ポテンシャル U(r) 中を運動する粒子の角運動量は時間によらず一定である。質量 m の粒子の回転軸に垂直な平面内の運動を表すラグランジアンは、角運動量の大きさ l = mr²ω（ω は角速度）を用いて L = (m/2)ṙ² − U(r) − l²/(2mr²) のように与えられる。U(r) = kr⁴ に対して粒子が半径一定の円運動をするとき、その半径と周期の組合せとして最も妥当なのはどれか。\nただし、ṙ は r の時間微分を表し、k は正の定数である。",
    "choices": {
      "ア": "(l²/(2km))^(1/4) ／ 2π(m/(2k))^(1/2)",
      "イ": "(l²/(2km))^(1/4) ／ 2π(m²/(4kl))^(1/3)",
      "ウ": "(l²/(4km))^(1/6) ／ 2π(m/(2k))^(1/2)",
      "エ": "(l²/(4km))^(1/6) ／ 2π(m²/(4kl))^(1/3)",
      "オ": "(l²/(4km))^(1/6) ／ 2π(m²/(4kl))^(1/5)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "U′(r) = l²/(mr³) に 4kr³ を代入して r = (l²/(4km))^(1/6) を得る。周期は 2π/ω = 2πmr²/l なので、これに半径を代入すると 2π(m²/(4kl))^(1/3) となる。",
    "choiceExplanations": {
      "ア": "ポテンシャルの微分は 4kr³ なので、円運動で成り立つ式は r⁶ = l²/(4km) となる。",
      "イ": "周期の式は合うが、円運動の半径は r に関する6次の関係から求める。",
      "ウ": "半径は合うが、T = 2πmr²/l なので周期にも角運動量 l が入る。",
      "エ": "U′(r) = l²/(mr³) に 4kr³ を代入して r = (l²/(4km))^(1/6) を得る。周期は 2π/ω = 2πmr²/l なので、これに半径を代入すると 2π(m²/(4kl))^(1/3) となる。",
      "オ": "半径の二乗を周期の式に入れるので、括弧内の指数は 1/5 ではなく 1/3 になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q072",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "トリチェリの定理と水平到達距離",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図に示すように、円柱状の容器に地面から高さ H の位置まで水を入れ、側面に小さな孔を開けた。このとき、噴出した水の水平到達距離を最大にする孔の地面からの高さと、その水平到達距離の組合せとして最も妥当なのはどれか。\nただし、水は非圧縮非粘性流体とし、孔は容器の底面積に比べて十分小さく、その噴出速度はトリチェリの定理に従うとする。また、水は孔から水平方向に噴出し、抵抗のない落下運動をすると仮定してよい。",
    "choices": {
      "ア": "H/4 ／ H/2",
      "イ": "H/2 ／ H/2",
      "ウ": "H/2 ／ H",
      "エ": "3H/4 ／ H/2",
      "オ": "3H/4 ／ H"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "孔の高さ h で噴出速度は √(2g(H − h))、落下時間は √(2h/g) なので距離は 2√(h(H − h)) となる。この積は h = H/2 で最大になり、距離は H である。",
    "choiceExplanations": {
      "ア": "高さ H/4 では落下時間が短く、距離は √3H/2 となるため最大ではない。",
      "イ": "高さは合っているが、噴出速度も落下時間も水位差と重力加速度から求めると、距離は H になる。",
      "ウ": "孔の高さ h で噴出速度は √(2g(H − h))、落下時間は √(2h/g) なので距離は 2√(h(H − h)) となる。この積は h = H/2 で最大になり、距離は H である。",
      "エ": "高さ 3H/4 では飛行時間は長いが流速が小さく、水平到達距離は √3H/2 になる。",
      "オ": "最大到達距離 H に達するのは高さ H/2 のときだけで、3H/4 では距離が短くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q072.webp"
    ],
    "imageAltTexts": [
      "高さ H まで水の入った円柱状の容器と側面から出る水"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q073",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "理想気体の内部エネルギーとエントロピー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "単原子分子からなる理想気体1 mol当たりの内部エネルギーを、体積 V とエントロピー S の関数で表した式として最も妥当なのはどれか。\nただし、気体定数を R とし、この理想気体は、体積 V₀ でエントロピー S₀ のとき、内部エネルギー U₀ をもつとする。",
    "choices": {
      "ア": "U₀(V/V₀)^(2/5) exp[2(S − S₀)/(5R)]",
      "イ": "U₀(V/V₀)^(−2/5) exp[2(S − S₀)/(5R)]",
      "ウ": "U₀(V/V₀)^(2/3) exp[2(S − S₀)/(5R)]",
      "エ": "U₀(V/V₀)^(2/3) exp[2(S − S₀)/(3R)]",
      "オ": "U₀(V/V₀)^(−2/3) exp[2(S − S₀)/(3R)]"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "単原子気体では U = (3/2)RT であり、dS = (3R/2)dU/U + R dV/V が成り立つ。基準状態から積分し、U について解くとこの式になる。",
    "choiceExplanations": {
      "ア": "体積依存の符号が逆であり、エントロピー項の係数には定容熱容量 3R/2 の逆数を使う。",
      "イ": "体積が増すと内部エネルギーが下がる符号は合うが、体積指数は −R/Cᵥ = −2/3 である。",
      "ウ": "体積一定での dS に対応する係数は 2/(3R) であり、等エントロピーでの体積増加に対しては U が減少する。",
      "エ": "エントロピー依存は合っているが、指数が正だと断熱膨張で U が増えてしまう。",
      "オ": "単原子気体では U = (3/2)RT であり、dS = (3R/2)dU/U + R dV/V が成り立つ。基準状態から積分し、U について解くとこの式になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q074",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "クラペイロンの式",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "物質の異なる2相 A、B が圧力 p、温度 T で平衡状態にあるとき、2相の化学ポテンシャル（1 mol当たりのギブスの自由エネルギー）μ は等しい。このことから導かれる関係式として最も妥当なのはどれか。\nただし、V_A、V_B 及び S_A、S_B は各相の1 mol当たりの体積及びエントロピーである。",
    "choices": {
      "ア": "dp/dT = (S_A − S_B)/(V_A − V_B)",
      "イ": "dp/dT = (S_A + S_B)/(V_A + V_B)",
      "ウ": "dp/dT = ((S_A − S_B)/(V_A − V_B))(T/p)",
      "エ": "dμ/dT = S_A + S_B + (p/T)(V_A + V_B)",
      "オ": "dμ/dT = S_A − S_B + (p/T)(V_A − V_B)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "各相で dμ = V dp − S dT が成り立つ。平衡の曲線に沿って両相の変化を等置すると (V_A − V_B)dp = (S_A − S_B)dT になる。",
    "choiceExplanations": {
      "ア": "各相で dμ = V dp − S dT が成り立つ。平衡の曲線に沿って両相の変化を等置すると (V_A − V_B)dp = (S_A − S_B)dT になる。",
      "イ": "二相の dμ を等置した後に移項するので、体積とエントロピーはいずれも差になる。",
      "ウ": "相平衡から得られる dp/dT はエントロピー差と体積差の比であり、T/p は掛からない。",
      "エ": "同じ dμ を両相で比べると dμ が消え、得られるのは圧力の温度依存性である。",
      "オ": "dμ を等置して導く量は dp/dT であり、p/T と体積差の積を加える関係は得られない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q075",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "マクスウェル分布と分子の噴出流束",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "質量 m の単原子分子からなる理想気体が十分大きな容器の中にあり、数密度 n、温度 T に保たれている。図のように、容器に面積 S の小さな孔を開けたとき、単位時間に孔から噴出する分子数として最も妥当なのはどれか。\nただし、孔は容器の大きさや分子の平均自由行程よりも十分小さく、容器の外は真空とする。速度 v の分子の分布は、規格化されたマクスウェル速度分布則 f(v) = (m/(2πk_B T))^(3/2) exp[−mv²/(2k_B T)] に従う。k_B はボルツマン定数である。\nなお、必要ならば、a > 0 に対して成り立つ次の積分公式を用いてよい。\n∫₀^∞ exp(−ax²) dx = (1/2)√(π/a)\n∫₀^∞ x exp(−ax²) dx = 1/(2a)\n∫₀^∞ x² exp(−ax²) dx = (1/(4a))√(π/a)",
    "choices": {
      "ア": "Sn√(k_B T/(2πm))",
      "イ": "Sn√(k_B T/(πm))",
      "ウ": "Sn√(k_B T/(2m))",
      "エ": "(Sn/2)√(k_B T/m)",
      "オ": "(Sn/2)√(πk_B T/m)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "面に垂直で外向きの速度成分 vₓ > 0 を重みとして、一次元マクスウェル分布を積分する。∫₀^∞ vₓ√(m/(2πk_B T))exp(−mvₓ²/(2k_B T))dvₓ = √(k_B T/(2πm)) なので Sn を掛けるとよい。",
    "choiceExplanations": {
      "ア": "面に垂直で外向きの速度成分 vₓ > 0 を重みとして、一次元マクスウェル分布を積分する。∫₀^∞ vₓ√(m/(2πk_B T))exp(−mvₓ²/(2k_B T))dvₓ = √(k_B T/(2πm)) なので Sn を掛けるとよい。",
      "イ": "積分には垂直方向の一次元ガウス分布の規格化が残るため、分母は πm ではなく 2πm になる。",
      "ウ": "ガウス分布の規格化を含めると係数には π の平方根も入る。",
      "エ": "外向きの分子が半分でも、その平均垂直速度は √(k_B T/m) ではなく √(2k_B T/(πm)) となる。",
      "オ": "分子の噴出数は速度の面に垂直な成分を重み付けして求めるので、π は平方根の分母に入る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q075.webp"
    ],
    "imageAltTexts": [
      "気体の入った容器の孔と外に向かう分子"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q076",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "両端固定の弦の固有振動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "時刻 t、座標 x における弦の変位を u(t, x) とすると、弦の振動を表す波動方程式は ∂²u/∂t² − v²∂²u/∂x² = 0 で与えられる。ここで、v は弦の振動が伝播する速さである。弦の両端は、x = 0 と x = L で u(t, 0) = u(t, L) = 0 となるように固定されており、また、時刻 t = 0 で ∂u/∂t(0, x) = 0 とする。このとき u(t, x) の一般解として最も妥当なのはどれか。\nただし、Cₙ は任意の定数である。",
    "choices": {
      "ア": "∑_{n=1}^∞ Cₙ sin(πnx/L) cos(πnvt/L)",
      "イ": "∑_{n=1}^∞ Cₙ sin(πnx/L) cos(2πnvt/L)",
      "ウ": "∑_{n=1}^∞ Cₙ sin(πnx/L) cos(4πnvt/L)",
      "エ": "∑_{n=1}^∞ Cₙ sin(2πnx/L) cos(πnvt/L)",
      "オ": "∑_{n=1}^∞ Cₙ sin(2πnx/L) cos(2πnvt/L)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "両端固定から波数は πn/L であり、波動方程式により角振動数は πnv/L となる。初速度が0なので、各時間因子は余弦だけで表される。",
    "choiceExplanations": {
      "ア": "両端固定から波数は πn/L であり、波動方程式により角振動数は πnv/L となる。初速度が0なので、各時間因子は余弦だけで表される。",
      "イ": "空間の波数は合っているが、時間の角振動数が v と波数の積の2倍になっている。",
      "ウ": "波動方程式を満たす時間の角振動数は πnv/L であり、その4倍にはならない。",
      "エ": "空間波数 2πn/L と時間の角振動数 πnv/L が波動方程式の分散関係を満たしていない。",
      "オ": "個々の項は条件を満たすが、波数 π/L など奇数番目の固有モードが含まれず、一般解にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q078",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "ローレンツ変換と電磁場",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "慣性系 S の直交座標を (x, y, z) とし、慣性系 S′ の直交座標を (x′, y′, z′) とする。慣性系 S′ の原点は、慣性系 S において x 軸の正の向きに速さ v で等速直線運動をしている。慣性系 S において、電場は存在せず z 軸の向きに一様な磁場がかかっているとき、慣性系 S′ における電場 E′ と磁束密度 B′ はそれぞれ E′ = (0, E′, 0)、B′ = (0, 0, B′) となる。E′ と B′ の関係として最も妥当なのはどれか。\nただし、光速を c とし、ある時刻において S と S′ の座標軸は一致する。",
    "choices": {
      "ア": "E′ = vB′",
      "イ": "E′ = −vB′",
      "ウ": "E′ = vB′/√(1 − (v/c)²)",
      "エ": "E′ = −vB′/√(1 − (v/c)²)",
      "オ": "E′ = −v√(1 − (v/c)²)B′"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "S の磁束密度の z 成分を B とすれば、横方向の変換で E′ = −γvB、B′ = γB となる。同じローレンツ因子 γ が約分されて E′ = −vB′ である。",
    "choiceExplanations": {
      "ア": "速度の向きと元の磁場の向きの外積は −y 方向なので、符号は負になる。",
      "イ": "S の磁束密度の z 成分を B とすれば、横方向の変換で E′ = −γvB、B′ = γB となる。同じローレンツ因子 γ が約分されて E′ = −vB′ である。",
      "ウ": "外積の符号が逆であり、E′ と B′ の比を取るとローレンツ因子も消える。",
      "エ": "E′ = −γvB の右辺で使う B は S 系の値であり、B′ を使う場合は γ が約分される。",
      "オ": "どちらの場の変換にも同じ γ が現れるので、√(1 − (v/c)²) は比に残らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q079",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "接地導体と鏡像法",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "導体表面に誘起される電荷に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、接地されている半無限の大きさの導体が真空中にあり、その表面から距離 r の位置に点電荷が置かれている。その点電荷の電荷を q とする。このときの電場は、導体表面に［㋐］であり、その静電ポテンシャルは導体表面上で一定になるように、導体表面上に電荷が誘起される。したがって、点電荷は導体から［㋑］を受ける。その力の大きさは［㋒］である。\nただし、真空の誘電率を ε₀ とする。」",
    "choices": {
      "ア": "垂直／引力／q²/(16πε₀r²)",
      "イ": "垂直／引力／q²/(4πε₀r²)",
      "ウ": "垂直／斥力／q²/(4πε₀r²)",
      "エ": "平行／引力／q²/(16πε₀r²)",
      "オ": "平行／斥力／q²/(4πε₀r²)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "静電平衡で導体表面は等電位なので電場は垂直である。導体内の対称位置に鏡像電荷 −q を置くと、距離 2r を隔てたクーロン引力 q²/(16πε₀r²) が得られる。",
    "choiceExplanations": {
      "ア": "静電平衡で導体表面は等電位なので電場は垂直である。導体内の対称位置に鏡像電荷 −q を置くと、距離 2r を隔てたクーロン引力 q²/(16πε₀r²) が得られる。",
      "イ": "向きと力の性質は合うが、点電荷と鏡像の距離は r ではなく 2r なので力はこの値の4分の1になる。",
      "ウ": "鏡像電荷は元の電荷と逆符号なので、斥力は生じない。",
      "エ": "引力とその大きさは合うが、等電位面には接線方向の電場はない。",
      "オ": "表面は等電位で電場は垂直であり、鏡像電荷との相互作用は引力になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q079.webp"
    ],
    "imageAltTexts": [
      "接地した導体と、真空中で表面から距離 r にある点電荷"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q080",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "直交する電場と磁場内の電子運動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "間隔 d の2枚の無限に大きい平行板電極の間に電位差 V を与え、極板に平行に一様な磁場をかける。陰極板から飛び出した電子が陽極板に到達しないための磁束密度の大きさ B の条件として最も妥当なのはどれか。\nただし、陰極板を飛び出す電子の初速度は0としてよい。また、電子の質量を m、電荷を −e (e > 0) とする。",
    "choices": {
      "ア": "B > (1/d)√(mV/(2e))",
      "イ": "B > (1/d)√(mV/e)",
      "ウ": "B > (1/d)√(2mV/e)",
      "エ": "B > (2/d)√(mV/e)",
      "オ": "B > (2/d)√(2mV/e)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "極板に垂直な距離を x とすると、横速度の大きさは eBx/m、運動エネルギーは e(V/d)x である。垂直速度が再び0になる最大距離 2mV/(deB²) を d 未満とするとこの条件になる。",
    "choiceExplanations": {
      "ア": "この下限は到達を防ぐための臨界値の半分であり、条件を満たしても陽極板に届き得る。",
      "イ": "陰極から距離 x の位置で横速度の大きさは eBx/m であり、エネルギーとの比較から転回距離には係数2が入る。",
      "ウ": "極板に垂直な距離を x とすると、横速度の大きさは eBx/m、運動エネルギーは e(V/d)x である。垂直速度が再び0になる最大距離 2mV/(deB²) を d 未満とするとこの条件になる。",
      "エ": "この下限は正しい臨界値の √2 倍であり、陽極板に届かない条件に余分な制限がある。",
      "オ": "この下限は正しい臨界値の2倍であり、その中間の磁場でも陽極板には到達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q080.webp"
    ],
    "imageAltTexts": [
      "陰極板と陽極板、磁束密度 B、電子の軌道"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q081",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "原子モデルとリュードベリの式",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "原子モデルに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「［㋐］は、原子の中心にそのほとんどの質量をもつ極めて小さな原子核が存在し、その周りを電子が周回するという原子モデルを提唱したが、古典電磁気学では、その電子軌道の安定性を説明できなかった。一方、水素原子からの発光スペクトルがとびとびの輝線となっており、その輝線の光の波長 λ は、定数 R と正の整数 n、m を用いてリュードベリの式［㋑］で書けることが知られていた。そこで、［㋒］は、電子軌道が離散的なエネルギー値しかとらないという原子モデルを提唱した。それは、ド・ブロイが提唱した電子の波動性から、電子が定在波状態になって安定していると理解された。」",
    "choices": {
      "ア": "長岡半太郎／1/λ = R(1/n² − 1/m²)／ラザフォード",
      "イ": "長岡半太郎／1/λ = R(1/n² − 1/m²)／プランク",
      "ウ": "長岡半太郎／1/λ = R(n² − m²)／プランク",
      "エ": "ラザフォード／1/λ = R(1/n² − 1/m²)／ボーア",
      "オ": "ラザフォード／1/λ = R(n² − m²)／ボーア"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ラザフォードは散乱実験を踏まえて核をもつモデルを提唱した。水素スペクトルは波数が二乗の逆数の差になる式で記述され、ボーアは離散的エネルギーの定常軌道を導入した。",
    "choiceExplanations": {
      "ア": "波長の式は合うが、散乱実験から原子核の存在を示したのがラザフォードで、定常軌道を提唱したのがボーアである。",
      "イ": "プランクはエネルギー量子の考えを導入したが、ここで述べる水素原子の定常軌道モデルを立てたのはボーアである。",
      "ウ": "水素の束縛状態のエネルギーは主量子数の二乗の逆数に比例するため、波数には n² − m² は現れない。",
      "エ": "ラザフォードは散乱実験を踏まえて核をもつモデルを提唱した。水素スペクトルは波数が二乗の逆数の差になる式で記述され、ボーアは離散的エネルギーの定常軌道を導入した。",
      "オ": "二人の名前は合っているが、リュードベリの式は R(1/n² − 1/m²) である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q082",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "球面調和関数の磁気量子数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "球面調和関数を Y_l^m(θ, φ) とする。l は軌道角運動量量子数（方位量子数）、m は磁気量子数であり、角度 (θ, φ) の範囲は 0 ≤ θ < π、0 ≤ φ < 2π である。Y_l^(−l)(θ, φ) の表式として最も妥当なのはどれか。\nただし、i は虚数単位であり、C は定数とする。なお、角運動量演算子の昇降演算子 L̂_± 及び z 成分 L̂_z は、角度変数を用いて\nL̂_+ = ℏe^(iφ)(∂/∂θ + i(cos θ/sin θ)∂/∂φ)、L̂_− = −ℏe^(−iφ)(∂/∂θ − i(cos θ/sin θ)∂/∂φ)、L̂_z = −iℏ∂/∂φ\nと表される。",
    "choices": {
      "ア": "C",
      "イ": "C(sin θ)^l e^(ilφ)",
      "ウ": "C(sin θ)^l e^(−ilφ)",
      "エ": "C(sin θ)^(2l) e^(ilφ)",
      "オ": "C(sin θ)^(2l) e^(−ilφ)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "磁気量子数 −l から φ 依存性は e^(−ilφ) になる。最低状態を L̂_− が消す条件から θ 依存性は (sin θ)^l に決まる。",
    "choiceExplanations": {
      "ア": "定数関数は l = 0 の場合だけ当てはまり、一般の l では z 成分の固有値 −lℏ を得られない。",
      "イ": "指数が +ilφ だと L̂_z の固有値は +lℏ となる。",
      "ウ": "磁気量子数 −l から φ 依存性は e^(−ilφ) になる。最低状態を L̂_− が消す条件から θ 依存性は (sin θ)^l に決まる。",
      "エ": "位相因子から得る磁気量子数が +l であり、設問の −l とは符号が逆である。",
      "オ": "位相因子は合うが、L̂_− を作用させると θ に関する微分から 2l が出るため、l の係数と相殺しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q083",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "角運動量の交換関係",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "角運動量演算子の各成分を L̂_x、L̂_y、L̂_z とするとき、交換子 [L̂_z, L̂_x² − L̂_y²] の表式として最も妥当なのはどれか。\nただし、i は虚数単位である。",
    "choices": {
      "ア": "0",
      "イ": "2iℏL̂_z²",
      "ウ": "2iℏ(2L̂_z² − L̂_x² − L̂_y²)",
      "エ": "2iℏ(L̂_x² − L̂_y²)",
      "オ": "2iℏ(L̂_xL̂_y + L̂_yL̂_x)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "積の交換則により [L̂_z, L̂_x²] = iℏ(L̂_yL̂_x + L̂_xL̂_y) となる。[L̂_z, L̂_y²] はその負であり、差を取ると係数が2倍になる。",
    "choiceExplanations": {
      "ア": "[L̂_z, L̂_x] = iℏL̂_y と [L̂_z, L̂_y] = −iℏL̂_x を用いると、差の交換子では寄与が打ち消されずに加わる。",
      "イ": "基本交換関係を二乗の交換子に展開すると、L̂_x と L̂_y が異なる順序で並ぶ二項が現れる。",
      "ウ": "積の交換則は二乗の和を作る形ではなく、L̂_x と L̂_y の混合積を作る。",
      "エ": "L̂_z との交換子は L̂_x を L̂_y に、L̂_y を −L̂_x に移すので、元の二乗の差には比例しない。",
      "オ": "積の交換則により [L̂_z, L̂_x²] = iℏ(L̂_yL̂_x + L̂_xL̂_y) となる。[L̂_z, L̂_y²] はその負であり、差を取ると係数が2倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q084",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "無限深井戸の一次摂動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、1次元の無限に深い井戸型ポテンシャルが V(x) = V₀ (0 ≤ x ≤ δ)、0 (δ < x ≤ L)、∞ (x < 0、x > L) で与えられている。このポテンシャル中に閉じ込められた質量 m の粒子のエネルギー固有値として最も妥当なのはどれか。\nただし、δ は L より十分小さく、V₀ は正の一定値であるとして、V(x) のうち V₀ (0 ≤ x ≤ δ) の寄与を1次の摂動で扱ってよい。必要ならば、V₀ = 0 の無摂動系の規格化された固有関数 √(2/L) sin(nπx/L) と、エネルギー固有値 ℏ²π²n²/(2mL²) (n = 1, 2, 3, …) を用いてよい。",
    "choices": {
      "ア": "(ℏ²/(2mL²) + V₀δ/(3L))π²n²",
      "イ": "(ℏ²/(2mL²) + 2V₀δ/(3L))π²n²",
      "ウ": "(ℏ²/(2mL²) + V₀δ²/(3L²))π²n²",
      "エ": "(ℏ²/(2mL²) + V₀δ³/(3L³))π²n²",
      "オ": "(ℏ²/(2mL²) + 2V₀δ³/(3L³))π²n²"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "補正は V₀(2/L)∫₀^δ sin²(nπx/L) dx である。δ が十分小さいとして先頭項 (nπx/L)² を積分すると、補正は (2/3)V₀(δ/L)³π²n² になる。",
    "choiceExplanations": {
      "ア": "井戸の端で固有関数は0なので、一次のエネルギー補正は区間の幅 δ だけには比例しない。",
      "イ": "一次摂動では確率密度を掛けて積分するため、端で x² に比例する密度から δ³ が現れる。",
      "ウ": "振幅は x に比例するが、摂動の期待値に必要な確率密度は振幅の二乗であり、積分は δ² にならない。",
      "エ": "δ³ の次数は合っているが、波動関数の規格化から係数に 2/L が入るため、補正項はこの値の2倍である。",
      "オ": "補正は V₀(2/L)∫₀^δ sin²(nπx/L) dx である。δ が十分小さいとして先頭項 (nπx/L)² を積分すると、補正は (2/3)V₀(δ/L)³π²n² になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q084.webp"
    ],
    "imageAltTexts": [
      "無限深井戸と、端から幅 δ までにある高さ V₀ の段差"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q085",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "段差ポテンシャルでの反射",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "1次元のポテンシャルが、V(x) = 0 (x ≤ 0)、V₀ (x > 0) で与えられている。V₀ = −8 eV のポテンシャルに、エネルギー 0.1 eV の電子が x < 0 から x 軸の正の向きに入射するとき、電子の反射率として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.25",
      "イ": "0.36",
      "ウ": "0.49",
      "エ": "0.64",
      "オ": "0.81"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "入射側と透過側の運動エネルギーはそれぞれ 0.1 eV と 8.1 eV なので、波数比は9である。境界条件による反射率は ((1 − 9)/(1 + 9))² = 0.64 になる。",
    "choiceExplanations": {
      "ア": "反射率0.25には反射振幅の絶対値0.5が必要だが、実際の波数比は9で振幅は0.8である。",
      "イ": "波数比は √(8.1/0.1) = 9 で、振幅比の絶対値は (9 − 1)/(9 + 1) = 0.8 になる。",
      "ウ": "境界での波動関数と微分の連続性から振幅の絶対値は0.8と求まり、その二乗は0.49にならない。",
      "エ": "入射側と透過側の運動エネルギーはそれぞれ 0.1 eV と 8.1 eV なので、波数比は9である。境界条件による反射率は ((1 − 9)/(1 + 9))² = 0.64 になる。",
      "オ": "透過側の波数は入射側の9倍であるが、反射振幅の大きさは0.9ではなく0.8になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q086",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "金属の低温比熱",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、銀結晶の低温領域でのモル比熱 C の温度 T 依存性を測定し、その測定結果を、T² を横軸に、C/T を縦軸にとってプロットしたものである。この測定結果の説明として最も妥当なのはどれか。",
    "choices": {
      "ア": "C は T の3乗に比例して T の上昇とともに増加する。これは、低温では電子の励起が比熱にほとんど寄与せず、格子振動が主に寄与するためである。",
      "イ": "C は T の3乗に比例して T の上昇とともに増加する。これは、低温では格子振動は比熱にほとんど寄与せず、電子の励起が主に寄与するためである。",
      "ウ": "C は T の3乗に比例する項と T に比例する項により T の上昇とともに増加する。前者は電子の励起のためであり、後者は格子振動のためである。",
      "エ": "C は T の3乗に比例する項と T に比例する項により T の上昇とともに増加する。前者は格子振動のためであり、後者は電子の励起のためである。",
      "オ": "C は絶対零度においても有限の値をもつ。これは、絶対零度ではフェルミ縮退しているので電子励起は比熱に寄与しないが、格子振動の零点振動が寄与するためである。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "グラフの直線の傾きと切片はそれぞれ C = βT³ + γT の β、γ に当たる。低温での格子振動が βT³、フェルミ面付近の電子励起が γT を与える。",
    "choiceExplanations": {
      "ア": "C が T³ だけなら C/T 対 T² の直線は原点を通るが、図では正の切片がある。",
      "イ": "金属の電子励起による低温比熱は T に比例し、T³ の項は格子振動に由来する。",
      "ウ": "二つのべきは合うが、T に比例するのが伝導電子、T³ に比例するのが格子振動である。",
      "エ": "グラフの直線の傾きと切片はそれぞれ C = βT³ + γT の β、γ に当たる。低温での格子振動が βT³、フェルミ面付近の電子励起が γT を与える。",
      "オ": "有限の切片は C/T の極限であり、C 自体は0に近づく。零点振動のエネルギーは温度によらず、比熱への有限な寄与にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。 図の出典：Fig. 23 from Solid State Physics Course by Eugene Kogan。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q086.webp"
    ],
    "imageAltTexts": [
      "銀のモル比熱 C/T を T² に対して示した観測点と直線"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q087",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "n型半導体の伝導率と温度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "不純物半導体の電気伝導率に関する次の記述の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。\n「バンドギャップの大きさが E_G の半導体の中に、活性化エネルギー E_D のドナー不純物を入れた n 型半導体の電気伝導率 σ を考える。十分高温では、［㋐］から伝導バンドへのキャリア励起が支配的になるので、σ の温度依存性は［㋑］となる。一方、十分低温では、［㋒］から伝導バンドへのキャリア励起が支配的になるので、σ の温度依存性は［㋓］となる。よって、全温度領域にわたる σ の温度依存性の概略図は［㋔］となる。\nただし、T は温度、k_B はボルツマン定数である。」",
    "choices": {
      "ア": "価電子バンド／e^(−E_G/(2k_B T))／ドナー準位／e^(−E_D/(2k_B T))／図A",
      "イ": "価電子バンド／e^(−E_G/(2k_B T))／ドナー準位／e^(−E_D/(2k_B T))／図B",
      "ウ": "価電子バンド／e^(−E_G/(2k_B T))／ドナー準位／e^(−E_D/(2k_B T))／図C",
      "エ": "ドナー準位／e^(−E_D/(2k_B T))／価電子バンド／e^(−E_G/(2k_B T))／図A",
      "オ": "ドナー準位／e^(−E_D/(2k_B T))／価電子バンド／e^(−E_G/(2k_B T))／図C"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "高温では価電子バンドからの真性励起、低温ではドナー準位からの励起が支配的となり、それぞれ E_G/2 と E_D/2 の活性化エネルギーに対応する。E_G > E_D なので、1/T が小さい高温側の傾きの絶対値が大きい図Aになる。",
    "choiceExplanations": {
      "ア": "高温では価電子バンドからの真性励起、低温ではドナー準位からの励起が支配的となり、それぞれ E_G/2 と E_D/2 の活性化エネルギーに対応する。E_G > E_D なので、1/T が小さい高温側の傾きの絶対値が大きい図Aになる。",
      "イ": "励起元と指数因子は合うが、図Bでは高温側の傾きの絶対値が低温側より大きくなっていない。",
      "ウ": "図Cでは 1/T が大きい低温側の傾きの絶対値が大きく、E_G > E_D と逆の関係になる。",
      "エ": "十分高温ではバンド間の真性励起が支配的となり、ドナー準位の励起は十分低温で支配的になる。",
      "オ": "低温で価電子バンドからの励起を支配的としており、必要エネルギーが小さいドナー励起の寄与を取り違えている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q087.webp"
    ],
    "imageAltTexts": [
      "伝導率の対数と温度の逆数の関係を表す三つの候補図 A、B、C"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q088",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "一次元結晶の状態密度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "格子定数 a の1次元結晶中の波数 k の電子状態の分散関係が、飛び移り積分 t を用いて ε(k) = −2t cos(ka) のように与えられるとき、状態密度が最大となるエネルギーのみを全て挙げているのはどれか。",
    "choices": {
      "ア": "−t/2、t/2",
      "イ": "−t、t",
      "ウ": "−2t、2t",
      "エ": "−t、−t/2、t/2、t",
      "オ": "−2t、−t、t、2t"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一次元では状態密度が |dε/dk| の逆数に比例する。傾きが0となる ka = 0、π に対応するエネルギーは −2t、2t である。",
    "choiceExplanations": {
      "ア": "±t/2 はバンド内部にあり、そこで dε/dk はゼロにならない。",
      "イ": "±t に対応する傾きは有限であり、状態密度が発散するバンド端ではない。",
      "ウ": "一次元では状態密度が |dε/dk| の逆数に比例する。傾きが0となる ka = 0、π に対応するエネルギーは −2t、2t である。",
      "エ": "四つともバンド内部の点であり、傾きが消える端の二点が含まれていない。",
      "オ": "バンド端の ±2t は該当するが、バンド内の ±t では状態密度は最大にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q089",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "酸素原子の基底電子配置",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "酸素原子の基底状態の電子配置として最も妥当なのはどれか。",
    "choices": {
      "ア": "(1s)²(2s)²(2p)⁴",
      "イ": "(1s)²(2s)³(2p)³",
      "ウ": "(1s)²(2s)⁴(2p)²",
      "エ": "(1s)²(2s)²(2p)²(3s)²",
      "オ": "(1s)²(2s)²(2p)³(3s)¹"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "原子番号8の中性酸素は電子8個をもつ。基底状態では 1s と 2s に2個ずつ入り、残りの4個が 2p に入る。",
    "choiceExplanations": {
      "ア": "原子番号8の中性酸素は電子8個をもつ。基底状態では 1s と 2s に2個ずつ入り、残りの4個が 2p に入る。",
      "イ": "一つの s 軌道に入れる電子はスピンの異なる2個までなので、2s に3個は入れない。",
      "ウ": "2s は一つの軌道であり、パウリの排他原理から4個は収容できない。",
      "エ": "2p を埋める前に電子を二つ 3s に入れており、基底状態より高いエネルギーの配置である。",
      "オ": "3s の電子は基底状態ではエネルギーの低い 2p に配置される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q090",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "中立接地層の対数風速分布",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある地点で、地面からの高度 20 m における風速を観測したところ、7.0 m/s であった。同地点の地面からの高度 10 m における風速として最も妥当なのはどれか。\nただし、これらの高度は大気安定度が中立な接地境界層内にあるとし、地面からの高度を z として風速 u が次式に従うものとする。\ndu/dz = u_* /(κz)\nここで、カルマン定数 κ は 0.40 とし、摩擦速度 u_* は接地境界層内で一定値 0.60 m/s とする。また、ln 2 ≈ 0.69 とする。",
    "choices": {
      "ア": "3.5 m/s",
      "イ": "4.1 m/s",
      "ウ": "4.8 m/s",
      "エ": "6.0 m/s",
      "オ": "8.0 m/s"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "u(20) − u(10) = (u_*/κ)ln(20/10) = 1.5 × 0.69 ≈ 1.0 m/s である。20 m で 7.0 m/s なので10 m では約 6.0 m/s となる。",
    "choiceExplanations": {
      "ア": "風速は高さに比例せず、2地点の差は高さの比の自然対数で決まる。",
      "イ": "20 m と 10 m の風速差は約 1.0 m/s であり、2.9 m/s にはならない。",
      "ウ": "与えられた勾配を積分して得る風速差は (0.60/0.40)ln 2 ≈ 1.0 m/s である。",
      "エ": "u(20) − u(10) = (u_*/κ)ln(20/10) = 1.5 × 0.69 ≈ 1.0 m/s である。20 m で 7.0 m/s なので10 m では約 6.0 m/s となる。",
      "オ": "風速勾配は正であるため、より低い10 m では20 m の 7.0 m/s より小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q091",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "二次補間とテイラー展開の誤差",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "海洋の塩分輸送を計算する空間1次元モデルを考え、位置 x における塩分を S(x) で表す（図中破線）。\nいま、x = −3Δx、−Δx、Δx の3点のみで塩分が既知であり、x = 0 を通る塩分フラックスを計算するために同位置の塩分 S(0) を推定したい。図の実線のように、既知の3点を通る二次関数 S̃(x) により近傍の塩分分布を近似することにすると、S(0) は S̃(0) = (−S(−3Δx) + 6S(−Δx) + 3S(Δx))/8 と近似できる。ここで、~（チルダ）は近似値を表す。\nS(x) が十分滑らかな関数であり、Δx が十分小さい正の値であると仮定したとき、この近似の誤差 S̃(0) − S(0) の値として最も妥当なのはどれか。\nただし、x = 0 の近傍で S(x) をテイラー展開し、Δx の3次の項まで残して評価するものとする。なお、x = 0 の近傍におけるテイラー展開の公式は以下のとおりである。\nS(x) = ∑_{n=0}^∞ (xⁿ/n!) (dⁿS/dxⁿ)│ₓ₌₀",
    "choices": {
      "ア": "−(Δx³/2)(d³S/dx³)│ₓ₌₀",
      "イ": "−(Δx³/3)(d³S/dx³)│ₓ₌₀",
      "ウ": "(Δx³/3)(d³S/dx³)│ₓ₌₀",
      "エ": "(Δx³/2)(d³S/dx³)│ₓ₌₀",
      "オ": "Δx³(d³S/dx³)│ₓ₌₀"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "三点のテイラー展開を代入すると定数項は S(0)、1次と2次の項は0になる。3次の項は (27 − 6 + 3)/(8 × 6) = 1/2 を Δx³S‴(0) に掛けたものになる。",
    "choiceExplanations": {
      "ア": "この符号は逆向きの差 S(0) − S̃(0) を取った場合に対応する。",
      "イ": "3次の項を係数付きで加えると 27 − 6 + 3 = 24 となるため、係数は負にはならない。",
      "ウ": "3次の項の係数は各点の重みの分母8と階乗6を両方入れて 24/48 = 1/2 になる。",
      "エ": "三点のテイラー展開を代入すると定数項は S(0)、1次と2次の項は0になる。3次の項は (27 − 6 + 3)/(8 × 6) = 1/2 を Δx³S‴(0) に掛けたものになる。",
      "オ": "3次の寄与は Δx³S‴(0) に 24/(8 × 6) を掛けるため、係数1にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q091.webp"
    ],
    "imageAltTexts": [
      "三点での塩分、実際の分布の破線、二次近似の実線"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q092",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "温度風と気温の水平移流",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "水平風ベクトル V と気温 T の間に次のような温度風の関係が成り立っているとする。\n∂V/∂p = −(R/(fp))(k × ∇T)\nここで、p は気圧、R は気体定数、f はコリオリパラメータ、k は鉛直上向きの単位ベクトル、× は右手系での外積、∇ は気圧を一定にした水平微分を表す。\n二つの気圧面 p = p_B、p = p_T (p_B > p_T) に挟まれた薄い大気の層を考え、それぞれの気圧面における水平風ベクトルを V_B、V_T で表す。V_B と V_T のなす角を θ とし、高度が上がるにつれて風ベクトルが時計回りに変化するとき θ が正の値をとるように定義する（すなわち、k・(V_T × V_B) = |V_T||V_B| sin θ）。このとき、この層の下端付近における、水平移流による気温の時間変化率 −V_B・∇T として最も妥当なのはどれか。\nただし、この層の中では ∇T が一定であるとする。なお、必要ならば、以下の公式を用いてよい。\n任意のスカラー場 S に対して k × (k × ∇S) = −∇S\n任意のベクトル A、B、C に対して A・(B × C) = B・(C × A) = C・(A × B)\n特に、A・(B × A) = B・(A × A) = 0 である。",
    "choices": {
      "ア": "−2f∣V_T∣∣V_B∣ sin θ/(R ln(p_B/p_T))",
      "イ": "−f∣V_T∣∣V_B∣ sin θ/(R ln(p_B/p_T))",
      "ウ": "f∣V_T∣∣V_B∣ sin θ/(R ln(p_B/p_T))",
      "エ": "2f∣V_T∣∣V_B∣ sin θ/(R ln(p_B/p_T))",
      "オ": "4f∣V_T∣∣V_B∣ sin θ/(R ln(p_B/p_T))"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "気圧で積分すると V_T − V_B = (R/f)ln(p_B/p_T)(k × ∇T) となる。再び k との外積を取り、−V_B との内積を計算すると f[k・(V_T × V_B)]/(R ln(p_B/p_T)) を得る。",
    "choiceExplanations": {
      "ア": "下端から上端への気圧積分と外積の向きをそろえると、係数は負にならず、2倍にもならない。",
      "イ": "大きさの係数は合うが、三重積は k・(V_T × V_B) となるので、指定の正の θ で符号は正である。",
      "ウ": "気圧で積分すると V_T − V_B = (R/f)ln(p_B/p_T)(k × ∇T) となる。再び k との外積を取り、−V_B との内積を計算すると f[k・(V_T × V_B)]/(R ln(p_B/p_T)) を得る。",
      "エ": "∇T は層内で一定とされており、気圧で1回積分するので余分な係数2は生じない。",
      "オ": "積分の結果は ln(p_B/p_T) を分母に持つが、温度風の式の係数には4は現れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q093",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "乾湿計と相対湿度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "乾湿計は、乾球と湿球の温度差を利用して湿度を測定する装置である。いま、湿球表面において周囲の空気から受け取る顕熱と蒸発により失われる潜熱が釣り合い C_p(T − T_w)pM_d = L(e_s − e)M_v が成り立っているとする。ここで、C_p は乾燥空気の定圧比熱、T は周囲の気温（＝乾球温度）、T_w は湿球温度、p は気圧、M_d は乾燥大気の平均分子量、L は水の蒸発熱、e_s は T_w における飽和水蒸気圧、e は周囲の水蒸気分圧、M_v は水の分子量であり、水蒸気の存在による顕熱の変化は無視している。p = 1000 hPa の場所で T = 26.0 ℃、T_w = 20.0 ℃ と計測されたとき、この周囲の相対湿度として最も妥当なのはどれか。\nただし、飽和水蒸気圧等の値は以下のとおりとする。\n26.0 ℃ における飽和水蒸気圧 33.7 hPa\n20.0 ℃ における飽和水蒸気圧 23.4 hPa\nC_p = 1.0 × 10³ J/(kg・K)、L = 2.5 × 10⁶ J/kg、M_d/M_v = 1.6",
    "choices": {
      "ア": "33％",
      "イ": "49％",
      "ウ": "58％",
      "エ": "69％",
      "オ": "83％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "熱収支から e_s − e = C_p(26.0 − 20.0)p(M_d/M_v)/L = 3.84 hPa なので、e = 19.56 hPa となる。乾球温度での飽和水蒸気圧で割ると 19.56/33.7 ≈ 0.58 である。",
    "choiceExplanations": {
      "ア": "与えられた熱収支から実際の水蒸気圧は約 19.6 hPa となり、飽和水蒸気圧 33.7 hPa の約3分の1より大きい。",
      "イ": "湿球の飽和水蒸気圧 23.4 hPa から引く量は 3.84 hPa であり、この選択肢の相対湿度を与えるほど小さい水蒸気圧にはならない。",
      "ウ": "熱収支から e_s − e = C_p(26.0 − 20.0)p(M_d/M_v)/L = 3.84 hPa なので、e = 19.56 hPa となる。乾球温度での飽和水蒸気圧で割ると 19.56/33.7 ≈ 0.58 である。",
      "エ": "約69％は湿球の飽和水蒸気圧 23.4 hPa をそのまま使った比であり、蒸発に対応する差を引いていない。",
      "オ": "約83％は水蒸気圧を湿球温度での飽和水蒸気圧で割った値であり、周囲の相対湿度の分母は乾球温度での値である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q094",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "放射強制力と雲の効果",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球温暖化に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「図は、人為的に大気に排出された成分のそれぞれについて、1750年から2019年における有効放射強制力に対する直接的及び間接的な寄与の合計を気候モデルに基づいて見積もり、最良推定値及び90％信頼区間を棒グラフ及びエラーバーで示したものである。これら成分のうち、二酸化炭素（CO₂）に次いで人為的排出が温暖化に寄与したと考えられるのは［㋐］である。一方、人為的排出が温暖化の抑制に最も強く働いたと考えられる成分は［㋑］である。［㋑］の冷却効果の大部分は、［㋑］から生じたエーロゾルが凝結核となり雲の放射特性を変える間接効果であると見積もられている。\n雲は太陽からの放射を反射して地表を冷やす働きと、宇宙へ放出される赤外放射量を減らして地表を温める働きを併せもっているため、雲の正味の効果はこれら二つの働きの兼ね合いで決まる。一般に、上層の薄い氷晶雲は地表を［㋒］効果が卓越し、下層雲や中層雲は地表を［㋓］効果が卓越する。」\n（注）IPCC第6次評価報告書（IPCC, 2021）を基に作図。CFC：クロロフルオロカーボン、HCFC：ハイドロクロロフルオロカーボン、HFC：ハイドロフルオロカーボン、NMVOC：非メタン揮発性有機化合物。",
    "choices": {
      "ア": "二酸化硫黄（SO₂）／メタン（CH₄）／温める／冷やす",
      "イ": "水（H₂O）／メタン（CH₄）／冷やす／温める",
      "ウ": "水（H₂O）／二酸化硫黄（SO₂）／温める／冷やす",
      "エ": "メタン（CH₄）／二酸化硫黄（SO₂）／冷やす／温める",
      "オ": "メタン（CH₄）／二酸化硫黄（SO₂）／温める／冷やす"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "メタンの寄与が CO₂ に次いで大きく、二酸化硫黄由来の粒子は雲などを通じて冷却に働く。薄い上層氷晶雲では赤外放射を妨げる効果が大きく、下層雲や中層雲では日射を反射する効果が大きい。",
    "choiceExplanations": {
      "ア": "メタンの人為的排出は温暖化側に、二酸化硫黄由来の硫酸塩粒子は冷却側に寄与するため、最初の二つが逆である。",
      "イ": "排出成分別の評価で CO₂ に次ぐ温暖化要因はメタンであり、最も大きな冷却側の寄与は二酸化硫黄である。",
      "ウ": "二酸化硫黄と雲の効果は合うが、図で二酸化炭素に次ぐ正の寄与を持つ排出成分はメタンである。",
      "エ": "排出成分の対応は合うが、薄い上層雲では赤外放射を抑える温暖化効果が、下層雲や中層雲では太陽光を反射する冷却効果が卓越する。",
      "オ": "メタンの寄与が CO₂ に次いで大きく、二酸化硫黄由来の粒子は雲などを通じて冷却に働く。薄い上層氷晶雲では赤外放射を妨げる効果が大きく、下層雲や中層雲では日射を反射する効果が大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。 図はIPCC第6次評価報告書（IPCC, 2021）を基に作図。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q094.webp"
    ],
    "imageAltTexts": [
      "排出成分別の1750～2019年の有効放射強制力と90％信頼区間"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q095",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "震源メカニズムと地震波の放射",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある地震が図のような震源メカニズム解であった。このとき、震央の東側（紙面の右側）の方向に放射される P波と S波による地盤の最初のゆれの方向（運動方向）に関する記述の組合せとして最も妥当なのはどれか。\nただし、このメカニズム解は下半球投影で、震央を中心として描かれているとする。また、地盤は一様であるとし、地表面の影響は考えなくてよいとする。",
    "choices": {
      "ア": "上向き（押し）／図中（ア）の方向",
      "イ": "上向き（押し）／観測されない",
      "ウ": "下向き（引き）／図中（イ）の方向",
      "エ": "観測されない／図中（ア）の方向",
      "オ": "観測されない／図中（イ）の方向"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "真東は P波の節方向なので P波は観測されない。東向きの放射では北東側の圧縮と南東側の膨張に対応する横方向の初動は北向きとなり、図の（イ）に当たる。",
    "choiceExplanations": {
      "ア": "真東は黒と白の境界である節面上にあり、押しの P波は放射されない。",
      "イ": "東の節面で消えるのは P波の振幅であり、横方向に振動する S波は放射される。",
      "ウ": "S波の向きは合うが、真東は圧縮と膨張の境界なので P波の初動はない。",
      "エ": "P波の扱いは合っているが、圧縮域の北東と膨張域の南東からは真東方向の横ずれ成分は北向きと分かる。",
      "オ": "真東は P波の節方向なので P波は観測されない。東向きの放射では北東側の圧縮と南東側の膨張に対応する横方向の初動は北向きとなり、図の（イ）に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q095.webp"
    ],
    "imageAltTexts": [
      "東西・南北で区切られた震源メカニズム解と二つの矢印"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q096",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "重力と天体中心からの距離",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "自転をしていない一様な密度をもつ半径 R の球状の天体を考える。この天体の表面と、高度 h (> 0) の2点で重力を計測した。高度 h での重力加速度の大きさは、この天体の表面での重力加速度の大きさの99.98％であった。h と R の関係として最も妥当なのはどれか。",
    "choices": {
      "ア": "h : R = 1 : 10²",
      "イ": "h : R = 1 : 10³",
      "ウ": "h : R = 1 : 10⁴",
      "エ": "h : R = 1 : 10⁵",
      "オ": "h : R = 1 : 10⁶"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "球外の重力は中心からの距離の二乗に反比例するので、比は (1 + h/R)⁻² ≈ 1 − 2h/R である。比が0.9998だから h/R ≈ 10⁻⁴ となる。",
    "choiceExplanations": {
      "ア": "h/R = 0.01 では重力はおよそ2％低下し、0.02％の低下よりはるかに大きい。",
      "イ": "h/R = 0.001 では低下率は約0.2％で、与えられた低下率の約10倍である。",
      "ウ": "球外の重力は中心からの距離の二乗に反比例するので、比は (1 + h/R)⁻² ≈ 1 − 2h/R である。比が0.9998だから h/R ≈ 10⁻⁴ となる。",
      "エ": "h/R = 10⁻⁵ では重力の低下率は約0.002％となり、観測値の約10分の1である。",
      "オ": "h/R = 10⁻⁶ では重力の低下率は約0.0002％となり、観測値より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q097",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "周期的な地表温度の浸透深さ",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "時刻 t における地表 (z = 0) の温度 T(0, t) が、平均温度を T_s として、T(0, t) = T_s + T₀ cos(2πt/t₀) のように周期 t₀、振幅 T₀ の正弦振動をするとき、温度変化の振幅が 1/e となる深さ z (> 0) として最も妥当なのはどれか。\nただし、地盤は一様な熱拡散率 κ (> 0) の半無限媒質とし、温度分布 T(z, t) は1次元拡散方程式 ∂T/∂t = κ∂²T/∂z² に従うものとする。",
    "choices": {
      "ア": "κt₀/π",
      "イ": "π/(κt₀)",
      "ウ": "√(κt₀/π)",
      "エ": "√(π/(κt₀))",
      "オ": "√(κt₀/(2π))"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "角振動数 ω = 2π/t₀ の熱拡散解は、振幅が地表の exp[−z√(ω/(2κ))] 倍になる。地表振幅に対して 1/e になるのは z = √(κt₀/π) である。",
    "choiceExplanations": {
      "ア": "κt₀ の次元は長さの二乗なので、この式は深さを表せない。",
      "イ": "この式は長さの逆二乗の次元を持ち、深さの単位にならない。",
      "ウ": "角振動数 ω = 2π/t₀ の熱拡散解は、振幅が地表の exp[−z√(ω/(2κ))] 倍になる。地表振幅に対して 1/e になるのは z = √(κt₀/π) である。",
      "エ": "これは振幅の減衰定数 √(ω/(2κ)) であり、深さを得るには逆数を取る。",
      "オ": "複素数の平方根の実部を取ると減衰定数は √(ω/(2κ)) で、√(ω/κ) より 1/√2 倍小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q098",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "双極子地磁気の極と赤道",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球磁場のポテンシャルが、次のような地球の中心に置かれた双極子型のポテンシャル V = m cos θ/(4πr²) で表されるとする。\nここで、地球は球であるとし、θ は磁北からの余緯度（π/2 から、磁北を北極点とみなしたときの緯度を引いたもの）、r は地球の中心からの距離、m は磁気モーメントである。地表での全磁力を考えるとき、赤道における全磁力に対する北極における全磁力の比として最も妥当なのはどれか。\nなお、極座標系 (r, θ, φ) における勾配演算子 ∇ は ∇ = e_r ∂/∂r + e_θ (1/r)∂/∂θ + e_φ (1/(r sin θ))∂/∂φ で表される。ここで、(e_r, e_θ, e_φ) は極座標系の基底ベクトルを表す。",
    "choices": {
      "ア": "1",
      "イ": "2",
      "ウ": "3",
      "エ": "4",
      "オ": "5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "勾配を取ると半径方向の大きさは 2m|cos θ|/(4πr³)、余緯度方向の大きさは m|sin θ|/(4πr³) になる。θ = 0 と θ = π/2 でともに同じ r を使うので、全磁力の比は2である。",
    "choiceExplanations": {
      "ア": "北極では半径方向成分だけ、赤道では余緯度方向成分だけが残り、前者は後者の2倍である。",
      "イ": "勾配を取ると半径方向の大きさは 2m|cos θ|/(4πr³)、余緯度方向の大きさは m|sin θ|/(4πr³) になる。θ = 0 と θ = π/2 でともに同じ r を使うので、全磁力の比は2である。",
      "ウ": "r の微分では r⁻² から係数2が生じ、比を3にはしない。",
      "エ": "4は磁場の大きさを二乗した場合の比であり、求める全磁力の比は2である。",
      "オ": "全磁力の比は角度によって残る成分の係数の比 2 : 1 であり、5倍にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q099",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "球状圧力源による地表の変位",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "球状圧力源に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「地下にある球状圧力源によって生じる地表での鉛直方向と動径方向の変位は\nu_z(r) = ((1 − ν)a³Δp/μ) d/(r² + d²)^(3/2)\nu_r(r) = ((1 − ν)a³Δp/μ) r/(r² + d²)^(3/2)\nと表される。ここで、u_z、u_r はそれぞれ変位の鉛直成分、動径成分、d、a、Δp はそれぞれ球状圧力源の中心の深さ、半径、過剰圧、r は球状圧力源から観測点までの水平距離、ν、μ はそれぞれ媒質のポアソン比、剛性率である。\n変位の鉛直成分は、球状圧力源直上で最大であり、r ≈ 0.77d で球状圧力源直上の変位の鉛直成分の［㋐］になる。動径成分の大きさは r ≈ 0.71d で［㋑］となる。これらを用いることにより、観測データから球状圧力源の深さを大まかに推測することができる。」",
    "choices": {
      "ア": "1/4／最大",
      "イ": "1/3／最大",
      "ウ": "1/3／最小",
      "エ": "1/2／最大",
      "オ": "1/2／最小"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "鉛直変位の直上に対する比は (1 + (r/d)²)^(−3/2) で、r ≈ 0.77d なら約1/2である。動径変位の因子 r/(r² + d²)^(3/2) は r = d/√2 で増加から減少に転じて最大になる。",
    "choiceExplanations": {
      "ア": "動径成分は最大になるが、鉛直成分の比は (1 + 0.77²)^(−3/2) ≈ 0.50 である。",
      "イ": "動径成分の極値の種類は合うが、鉛直成分の比を式に代入すると約1/2になる。",
      "ウ": "鉛直の比は約1/2であり、動径成分は直上の0から増加して極大を取る。",
      "エ": "鉛直変位の直上に対する比は (1 + (r/d)²)^(−3/2) で、r ≈ 0.77d なら約1/2である。動径変位の因子 r/(r² + d²)^(3/2) は r = d/√2 で増加から減少に転じて最大になる。",
      "オ": "鉛直成分の比は合うが、動径成分の大きさは r = 0 で0であり、r ≈ 0.71d では最大になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q100",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "断層と褶曲の断面判読",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、X 地点の露頭において観察された断層（破線で示す）の走向と直交する方向に切った地質断面図である。X 地点の断層では条線も観察され、条線はこの地質断面とほぼ平行であった。また、この地域は全て堆積岩からなり、X 地点の断層の走向とほぼ同じ走向を示す a～f の6種類の凝灰岩層（実線で示す）が分布している。c 層と d 層の間の地層の堆積構造から、d 層よりも c 層の方が上位であることが分かっている。この地域の地質構造に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ X 地点を通る断層は正断層である。\n㋑ X 地点を通る断層のタイプは衝上断層とも呼ばれる。\n㋒ 二つの f 層の間に背斜の軸がある。\n㋓ 与えられた情報からだけでは応力の方向を絞り込むことはできない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "断面と条線は低角の断層で上盤が上昇したことを示しており、㋑の衝上断層に当たる。d 層より c 層が上位なので、両側の f 層にはさまれた古い地層が背斜の中心に当たり、㋒も妥当である。",
    "choiceExplanations": {
      "ア": "地層の並びを追うと低角の断層の上盤が相対的に上昇しているので、正断層ではない。",
      "イ": "衝上断層では上盤が上昇する逆断層型の変位が生じるため、同じ変位を正断層とは呼べない。",
      "ウ": "断面と条線は低角の断層で上盤が上昇したことを示しており、㋑の衝上断層に当たる。d 層より c 層が上位なので、両側の f 層にはさまれた古い地層が背斜の中心に当たり、㋒も妥当である。",
      "エ": "㋑は合うが、条線の向きと逆断層のずれから断層を生じた圧縮方向を絞り込める。",
      "オ": "背斜の軸の位置は合っているが、条線・再現したずれ・褶曲の向きは応力の方向を推定する手掛かりになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q100.webp"
    ],
    "imageAltTexts": [
      "X 地点の断層と凝灰岩層 a～f を含む地質断面図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q101",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "大陸移動・海洋底拡大と付加体",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "大陸と海洋底の歴史の証拠に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 大陸移動の証拠の一つに、岩石残留磁気の伏角の変化が挙げられる。\n㋑ プレートテクトニクスが受け入れられた後に、1980年代になって VLBI（超長基線電波干渉計）などの測地データを基に海洋底拡大説が提案された。\n㋒ 付加体は、過去の沈み込み帯の痕跡である。\n㋓ 大陸衝突帯には、衝突により形成された広域変成帯が分布し、変成岩と同時期に形成された大規模な火成岩体が伴われている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "残留磁気の伏角から形成当時の緯度を推定できるため、㋐は妥当である。付加体は沈み込むプレートからはぎ取られた物質が陸側に付加したもので、㋒も正しい。",
    "choiceExplanations": {
      "ア": "㋐は妥当だが、海洋底拡大説が提唱されたのは1960年代初頭で、1980年代の測地観測に先立つ。",
      "イ": "残留磁気の伏角から形成当時の緯度を推定できるため、㋐は妥当である。付加体は沈み込むプレートからはぎ取られた物質が陸側に付加したもので、㋒も正しい。",
      "ウ": "付加体の説明は合うが、海洋底拡大説はプレートテクトニクスの成立より前に提案された。",
      "エ": "㋑は提唱時期が誤っている。㋓のように同時期の大規模火成岩体が大陸衝突による変成帯に一律に伴うとはいえない。",
      "オ": "㋒は沈み込み帯の痕跡として妥当だが、広域変成作用への同時期の大規模火成活動は大陸衝突の必須条件ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q102",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "スレート劈開と褶曲軸面",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "岩石の面構造に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「粘板岩でよく見られるスレート劈開は主に、粘土鉱物などの微細な葉片状の鉱物粒子が最大圧縮応力に対し［㋐］方向に定向配列することで形成される。スレート劈開が［㋑］劈開として形成された場合、それは［㋑］に対しほぼ［㋒］姿勢をなすため、地質構造や地層の上下を判定することができる。\nある場所に粘板岩が広く分布するとして、図にその走向方向に対して垂直となる断面 X-Y を示す。地点 a～d の太実線と破線はそれぞれ、粘板岩に挟有される砂岩薄層の層理と粘板岩のスレート劈開の傾斜方向と角度を表している。この図のスレート劈開は［㋑］劈開であるので、X-Y 間の粘板岩からなる地層が示す地質構造は［㋓］であると判断される。」",
    "choices": {
      "ア": "垂直な／軸面／平行な／傾斜褶曲",
      "イ": "垂直な／軸面／垂直な／単斜構造",
      "ウ": "垂直な／層面／平行な／単斜構造",
      "エ": "平行な／軸面／垂直な／傾斜褶曲",
      "オ": "平行な／層面／平行な／単斜構造"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "葉片状鉱物の面は最大圧縮の方向にほぼ垂直に配列し、軸面劈開は褶曲の軸面にほぼ平行になる。傾いた劈開に対する層理の傾きの関係が途中で変わっており、傾斜褶曲と判断できる。",
    "choiceExplanations": {
      "ア": "葉片状鉱物の面は最大圧縮の方向にほぼ垂直に配列し、軸面劈開は褶曲の軸面にほぼ平行になる。傾いた劈開に対する層理の傾きの関係が途中で変わっており、傾斜褶曲と判断できる。",
      "イ": "軸面劈開は軸面に平行であり、層理と劈開の傾きの関係が変わることから単斜構造ともいえない。",
      "ウ": "破線で示す劈開は、各地点の実線で示す層理と平行に揃っていないため、層面劈開とは判断できない。",
      "エ": "傾斜褶曲は合うが、圧縮方向と粒子の配列、軸面と劈開の両方で、平行と垂直が逆になっている。",
      "オ": "鉱物の葉片面は通常最大圧縮方向に垂直で、図の劈開の傾きも各地点の層理と一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q102.webp"
    ],
    "imageAltTexts": [
      "断面 X-Y における砂岩の層理と粘板岩の劈開"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q103",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "ブーゲー補正と密度異常",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "重力異常と地下構造に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「ジオイド面と測定点の間にある物質の重力の影響を取り除く重力補正を、［㋐］補正という。Ⅰ、Ⅱのような地下構造断面図の場合には、地表面上の X-Y に沿ってそれぞれ［㋑］、［㋒］のようなパターンの［㋐］異常が観測される。」",
    "choices": {
      "ア": "フリーエア／A／A",
      "イ": "フリーエア／A／B",
      "ウ": "フリーエア／B／B",
      "エ": "ブーゲー／A／B",
      "オ": "ブーゲー／B／A"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "間にある物質の引力を取り除くのはブーゲー補正である。火山灰の低密度部は相対的に低い重力異常の A、金属鉱床の高密度部は相対的に高い重力異常の B を与える。",
    "choiceExplanations": {
      "ア": "測定点と基準面の間の物質の影響を補正するのはブーゲー補正であり、金属鉱床上の重力異常は高くなる。",
      "イ": "谷型と山型の対応は合うが、フリーエア補正は標高による距離差を扱い、間の物質の重力は取り除かない。",
      "ウ": "密度の小さい火山灰に覆われたカルデラの中央では重力異常が低くなるため、Ⅰは B ではなく A に対応する。",
      "エ": "間にある物質の引力を取り除くのはブーゲー補正である。火山灰の低密度部は相対的に低い重力異常の A、金属鉱床の高密度部は相対的に高い重力異常の B を与える。",
      "オ": "補正名は合うが、密度の低いカルデラで谷、高い金属鉱床で山になるため、グラフの対応が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q103.webp"
    ],
    "imageAltTexts": [
      "火山灰に覆われたカルデラと金属鉱床の断面、重力異常 A、B"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q104",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "接触変成・礫・示準化石による層序",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある地域の地質調査をしたところ、泥岩、シルト岩、石灰岩、花崗岩が分布することが判明したが、それぞれの層序関係を直接示す露頭は見いだせなかった。そこで、これらの岩石の産状・年代・産出化石を調べると、以下の記述㋐～㋓の結果が得られた。これらを基にすると、形成順序として最も妥当なのはどれか。\nただし、この地域には、上記の岩石以外は分布しないものとする。\n㋐ 石灰岩から貨幣石（ヌンムリテス）の化石が産出した。\n㋑ 泥岩は硬く緻密な岩石に変化している。肉眼で斑点状の菫青石が見られ、薄片観察では細粒の黒雲母が多く出現していることが確認された。\n㋒ シルト岩の基底部には花崗岩の礫が含まれ、上部ではアンモナイトやイノセラムスの化石が産出した。\n㋓ 花崗岩のジルコン U-Pb 年代を測定したところ、150 Ma の値を得た。",
    "choices": {
      "ア": "石灰岩 → 泥岩 → シルト岩 → 花崗岩",
      "イ": "石灰岩 → シルト岩 → 泥岩 → 花崗岩",
      "ウ": "泥岩 → 花崗岩 → シルト岩 → 石灰岩",
      "エ": "泥岩 → 花崗岩 → 石灰岩 → シルト岩",
      "オ": "花崗岩 → シルト岩 → 石灰岩 → 泥岩"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "泥岩の菫青石や黒雲母は花崗岩が貫入した際の接触変成を示し、花崗岩の礫を含むシルト岩はその花崗岩より新しい。アンモナイト・イノセラムスが示す中生代のシルト岩より古第三紀の貨幣石を含む石灰岩が後になる。",
    "choiceExplanations": {
      "ア": "シルト岩は花崗岩から生じた礫を含むため、花崗岩より前には形成されない。",
      "イ": "貨幣石は主に古第三紀の指標であり、アンモナイトやイノセラムスを含むシルト岩より石灰岩を古くする順序は合わない。",
      "ウ": "泥岩の菫青石や黒雲母は花崗岩が貫入した際の接触変成を示し、花崗岩の礫を含むシルト岩はその花崗岩より新しい。アンモナイト・イノセラムスが示す中生代のシルト岩より古第三紀の貨幣石を含む石灰岩が後になる。",
      "エ": "泥岩と花崗岩の順は合うが、化石の年代によると石灰岩はシルト岩より新しい。",
      "オ": "泥岩の変成鉱物は花崗岩による加熱で生じたと考えられるので、もとの泥岩は花崗岩の貫入前に存在した。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q105",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "柱状図の対比と海進",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、花崗岩を基盤として海成層が堆積した地域の柱状図である。この柱状図に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\nただし、堆積作用の中断は無かったものとする。\n㋐ 礫岩層あるいは泥岩層が見られない地点があるのは、それらが堆積しなかった場所があったからである。\n㋑ 不整合を形成しているのは礫岩層の基底のみであり、砂岩層、泥岩層、石灰岩層それぞれの基底は全て整合関係を示す。\n㋒ この地域ではどの地点でも、同時間には同一の地層が堆積していた。\n㋓ 石灰岩の堆積は、沖合ほど早期に始まった。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "堆積作用の中断がないので、地層が見られない箇所にはその岩相が堆積しなかったと分かる。同時面となる火山灰層 B と石灰岩基底の関係を見ると、石灰岩の堆積は沖合ほど早い。",
    "choiceExplanations": {
      "ア": "㋐は妥当だが、最も沖合の柱状図では砂岩層が花崗岩を直接覆い、この基底も不整合である。",
      "イ": "堆積作用の中断がないので、地層が見られない箇所にはその岩相が堆積しなかったと分かる。同時面となる火山灰層 B と石灰岩基底の関係を見ると、石灰岩の堆積は沖合ほど早い。",
      "ウ": "沖合では基盤直上の砂岩の基底が不整合であり、火山灰層 B のような同時面に沿って比較すると堆積物の種類も異なる。",
      "エ": "㋓は妥当だが、同時に降った火山灰層 A や B を対比すると同じ時間にも異なる地層が堆積していた。",
      "オ": "石灰岩の堆積開始は沖合ほど早いが、礫岩や泥岩が堆積しなかった地点があるという㋐も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q105.webp"
    ],
    "imageAltTexts": [
      "陸地から沖合に並ぶ4地点の地質柱状図と火山灰層 A、B、C"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q106",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "化学的風化と堆積物",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "風化作用に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 堆積岩が形成される最初のプロセスは、後背地での火成作用による既存の岩石の破壊である。この作用を火成的風化と呼ぶ。この作用により生成した砕屑物は、河川や風などによって運搬されて、堆積岩を形成する材料となる。\n㋑ 化学的風化作用で形成された溶存イオンは、河川や地下水などによって運搬され、溶液の化学組成、濃度、温度等の変化に伴って化学的に沈殿したり、生体に取り込まれて骨格や殻などの形成に使用され、堆積岩の材料となったりする。\n㋒ 化学的風化の一例として、大気中の CO₂ と雨水及び岩石中の珪酸塩鉱物の化学反応が挙げられる。反応により溶出した Ca²⁺ と HCO₃⁻ は、海洋における炭酸塩鉱物形成の材料となる。\n㋓ アルミニウムの原料であるボーキサイトは、化学的風化が進行した結果、岩石中のアルミニウムが地下水に溶出して、河口付近に水酸化物として沈殿して生成される。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "㋑のように化学的風化の溶存成分は沈殿や生物殻を通して堆積物になる。㋒の Ca²⁺ や HCO₃⁻ は河川で海に運ばれ、炭酸塩鉱物の形成に使われる。",
    "choiceExplanations": {
      "ア": "砕屑物を作る風化には温度変化や凍結などによる物理的風化もあり、火成作用で始まるとする㋐は誤りである。",
      "イ": "㋒は正しいが、砕屑物を生む岩石の破砕を火成的風化と呼ぶ㋐は妥当でない。",
      "ウ": "㋑に加え、ケイ酸塩の風化で溶出したイオンが炭酸塩の材料になるとする㋒も成立する。",
      "エ": "㋑のように化学的風化の溶存成分は沈殿や生物殻を通して堆積物になる。㋒の Ca²⁺ や HCO₃⁻ は河川で海に運ばれ、炭酸塩鉱物の形成に使われる。",
      "オ": "代表的なボーキサイトは強い風化で可溶成分が抜け、アルミニウムに富む相がその場に残留してできる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q107",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 107,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "顕生累代の地質年代区分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地質年代区分に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 新生代は、暁新世、始新世、漸新世、中新世、鮮新世、更新世、完新世の七つの世に区分される。\n㋑ 中生代のうち、三畳紀とジュラ紀は、前期、中期、後期の三つに区分されるが、白亜紀は前期と後期の二つに区分される。\n㋒ 古生代は、カンブリア紀、オルドビス紀、デボン紀、石炭紀、ペルム紀の五つの紀に区分される。\n㋓ 顕生累代（古生代、中生代、新生代）のうち、最も長い期間は中生代であり、顕生累代の全期間の50％を超える長さがあった。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋐は古第三紀の三つ、新第三紀の二つ、第四紀の二つの世を列挙している。㋑のとおり三畳紀・ジュラ紀は三分、白亜紀は二分される。",
    "choiceExplanations": {
      "ア": "新生代の七つの世に関する㋐は妥当だが、中生代の三つの紀の細区分を述べる㋑も妥当である。",
      "イ": "㋐は古第三紀の三つ、新第三紀の二つ、第四紀の二つの世を列挙している。㋑のとおり三畳紀・ジュラ紀は三分、白亜紀は二分される。",
      "ウ": "㋑は妥当だが、㋒はオルドビス紀とデボン紀の間のシルル紀を欠いている。",
      "エ": "㋓で最長とする中生代は約1.86億年であり、約2.87億年続いた古生代の方が長い。",
      "オ": "古生代はシルル紀を含む六つの紀に分かれ、顕生累代で最も長い代も中生代ではなく古生代である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 107。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q108",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 108,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "脊椎動物の陸上進出と大量絶滅",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "脊椎動物の進化史に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 古生代前半に生息していた初期の脊椎動物は顎関節や胸びれを欠いていた。この特徴をもつ脊椎動物はデボン紀末までに絶滅した。\n㋑ 脊椎動物の陸上進出は、植物や節足動物の陸上進出よりも後の時代に起こった。その過程では、まず空気中で呼吸ができる肺をもつ系統が現れ、その中から指を備えた手足を進化させた系統が陸上生活へ移行した。\n㋒ 脊椎動物は陸上進出後、爬虫類・鳥類の系統と哺乳類の系統に分かれた。その後、中生代の終わりまで、哺乳類の系統の種は、爬虫類・鳥類系統の種と比べて体サイズが非常に小型である時代が続いた。\n㋓ ジュラ紀に恐竜から鳥類が進化し、白亜紀にかけて多様化が進んだ。中生代の終わりに起こった大量絶滅では、恐竜だけでなく、鳥類の一部の系統も絶滅した。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "植物・節足動物が先に陸上へ進出し、肺を持つ脊椎動物から後に指を持つ四肢動物が現れた。鳥類はジュラ紀の獣脚類に由来し、白亜紀末には非鳥類型恐竜とともにエナンティオルニス類などの鳥類も絶滅した。",
    "choiceExplanations": {
      "ア": "顎や胸びれをもたない系統には、ヤツメウナギやヌタウナギなど現生の円口類がいる。",
      "イ": "㋑は妥当だが、㋐は顎をもたない脊椎動物の系統がデボン紀より後も存続したことを見落としている。",
      "ウ": "㋑は妥当だが、哺乳類につながる単弓類にはペルム紀や三畳紀の大型種もあり、系統分岐後に一貫して小型だったとはいえない。",
      "エ": "植物・節足動物が先に陸上へ進出し、肺を持つ脊椎動物から後に指を持つ四肢動物が現れた。鳥類はジュラ紀の獣脚類に由来し、白亜紀末には非鳥類型恐竜とともにエナンティオルニス類などの鳥類も絶滅した。",
      "オ": "㋓は妥当だが、哺乳類につながる系統もさまざまな体サイズを取り、大型の単弓類も地上で繁栄した時期がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 108。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q109",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 109,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "白亜紀末の天体衝突の証拠",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "白亜紀末に起こった地球外天体の地球への衝突に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「白亜紀末に地球外天体が地球に衝突した証拠の一つは、白亜紀と古第三紀の境界にあたる地層に、［㋐］が異常に高濃度で含まれていることである。この元素は地球の表面にはほとんど存在せず、隕石などに含まれている。また、同じ地層から、岩石が蒸発して［㋑］が再固結した特徴的な形状の粒子（スフェリュール）も見付かり、これも地球外天体が地球に衝突したことを支持している。この地球外天体衝突は、地球上の生物に非常に大きな影響を及ぼし、恐竜や［㋒］といった中生代を代表するような生物も絶滅した。衝突直後の地層には［㋓］が大量に見付かり、光合成による植物の生育が妨げられていたことが分かる。」",
    "choices": {
      "ア": "イリジウム／珪酸塩／アンモナイト／菌類の胞子",
      "イ": "イリジウム／珪酸塩／三葉虫／シダ植物の胞子",
      "ウ": "イリジウム／炭酸塩／アンモナイト／シダ植物の胞子",
      "エ": "ストロンチウム／珪酸塩／アンモナイト／シダ植物の胞子",
      "オ": "ストロンチウム／炭酸塩／三葉虫／菌類の胞子"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "隕石に多いイリジウムや再固結した珪酸塩の粒子が衝突の証拠であり、アンモナイトはこの境界で姿を消した。衝突直後に菌類の胞子が増えた記録は、日光の減少と植物の衰退に伴う環境変化を示す。",
    "choiceExplanations": {
      "ア": "隕石に多いイリジウムや再固結した珪酸塩の粒子が衝突の証拠であり、アンモナイトはこの境界で姿を消した。衝突直後に菌類の胞子が増えた記録は、日光の減少と植物の衰退に伴う環境変化を示す。",
      "イ": "三葉虫は古生代末のペルム紀末に絶滅しており、白亜紀末まで生存していない。",
      "ウ": "境界層の代表的な衝突由来の粒子は珪酸塩を含み、シダ植物の胞子の増加は主に攪乱後の植生回復を示す。",
      "エ": "境界層で隕石由来の物質を示す元素はイリジウムであり、ストロンチウムではない。",
      "オ": "隕石衝突の代表的指標はイリジウムで、三葉虫は白亜紀より前のペルム紀末に絶滅している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 109。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q110",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 110,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "マグマの組成と噴出形式",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "マグマの種類と性質に関する次の表の㋐～㋗に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "多い／少ない、高い／低い、白っぽい／黒っぽい、溶岩流／溶岩ドーム",
      "イ": "多い／少ない、低い／高い、黒っぽい／白っぽい、溶岩ドーム／溶岩流",
      "ウ": "少ない／多い、高い／低い、黒っぽい／白っぽい、溶岩流／溶岩ドーム",
      "エ": "少ない／多い、高い／低い、白っぽい／黒っぽい、溶岩ドーム／溶岩流",
      "オ": "少ない／多い、低い／高い、黒っぽい／白っぽい、溶岩流／溶岩ドーム"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "玄武岩質はケイ素が少なく、粘性が低いので暗色の溶岩流を作りやすい。流紋岩質はケイ素が多く、高粘性なので明色の溶岩ドームを作りやすい。",
    "choiceExplanations": {
      "ア": "玄武岩質と流紋岩質を比べると、玄武岩質の方がケイ素が少なく粘性が低い。",
      "イ": "粘性と色は合うが、玄武岩質は低ケイ素で流れやすく、流紋岩質の方が溶岩ドームを作りやすい。",
      "ウ": "ケイ素、色、噴出形式は合うが、ケイ素の少ない玄武岩質の方が流紋岩質よりも粘性が低い。",
      "エ": "玄武岩質は一般に暗色で低粘性のため流動しやすく、流紋岩質は比較的明るい色で粘性が高い。",
      "オ": "玄武岩質はケイ素が少なく、粘性が低いので暗色の溶岩流を作りやすい。流紋岩質はケイ素が多く、高粘性なので明色の溶岩ドームを作りやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 110。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q110.webp"
    ],
    "imageAltTexts": [
      "玄武岩質・安山岩質・流紋岩質のマグマの性質の表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q111",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 111,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "等高線で識別する火山地形",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地形図㋐、㋑、㋒はそれぞれ異なる火山地形を表している。㋐、㋑、㋒の地形のそれぞれの名称の組合せとして最も妥当なのはどれか。\nなお、㋐と㋑の等高線の間隔は 10 m、㋒の等高線の間隔は 100 m である。\n（注）「地理院地図／GSI Maps」（国土地理院）を基に作成",
    "choices": {
      "ア": "カルデラ／溶岩円頂丘／成層火山",
      "イ": "カルデラ／成層火山／火山砕屑丘",
      "ウ": "溶岩円頂丘／カルデラ／火山砕屑丘",
      "エ": "溶岩円頂丘／火山砕屑丘／成層火山",
      "オ": "火山砕屑丘／成層火山／カルデラ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "㋐は不規則な輪郭をもつ急峻な溶岩円頂丘、㋑は小規模で円形の火山砕屑丘である。㋒は比高・裾野ともに大きい円錐状の成層火山である。",
    "choiceExplanations": {
      "ア": "㋒は成層火山だが、㋐は中央が高い急峻な盛り上がりであり、大きな陥没地形ではない。",
      "イ": "㋐にはカルデラに特徴的な内側の大きな低地がなく、100 m 間隔の㋒は小規模な砕屑丘よりも大きな山体を示す。",
      "ウ": "㋐は合っているが、㋑は小規模な円錐丘でカルデラには当たらず、㋒は比高が大きい成層火山である。",
      "エ": "㋐は不規則な輪郭をもつ急峻な溶岩円頂丘、㋑は小規模で円形の火山砕屑丘である。㋒は比高・裾野ともに大きい円錐状の成層火山である。",
      "オ": "㋒は中央が高い大きな円錐で、中央部が大きく陥没するカルデラとは形が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 111。解説は過去問AIの独自作成。 図は「地理院地図／GSI Maps」（国土地理院）を基に作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q111-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q111-2.webp"
    ],
    "imageAltTexts": [
      "火山地形の地形図㋐、㋑。等高線の間隔は10 m",
      "火山地形の地形図㋒。等高線の間隔は100 m"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q112",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 112,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "偏光顕微鏡での消光",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "偏光顕微鏡による岩石薄片観察に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ ステージに何も置かずに直交ニコル（直交ポーラー）の状態で視野が暗黒となる場合には、ニコル（ポーラライザー）の角度の調整が必要である。\n㋑ 偏光顕微鏡の回転ステージは、単ニコル（単ポーラー）では固定して観察を行い、直交ニコルでは回転しながら観察を行う。\n㋒ 直交ニコルの状態で、多色性から鉱物の複屈折の程度を見積もることができる。\n㋓ 消光位にあるとき、鉱物を通過した偏光の振動方向は下方ニコルを通過できる光の振動方向に等しい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑、㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "消光位では鉱物中の一方の振動方向と下方ニコルの透過方向が一致する。鉱物を出た光はその方向に偏光したままなので、軸が直交する上方ニコルで遮られる。",
    "choiceExplanations": {
      "ア": "試料なしで視野が暗いのは、二つの偏光板の透過軸が直交していることを示す正常な状態である。",
      "イ": "直交ニコルで暗いことは調整不良を示さず、単ニコルでも多色性を確かめるには回転ステージを使う。",
      "ウ": "単ニコルでは回転して多色性を観察することがあり、直交ニコルで複屈折を見積もる指標は干渉色である。",
      "エ": "㋓は妥当だが、直交ニコルでは複屈折を干渉色から推定し、多色性は単ニコルで観察する。",
      "オ": "消光位では鉱物中の一方の振動方向と下方ニコルの透過方向が一致する。鉱物を出た光はその方向に偏光したままなので、軸が直交する上方ニコルで遮られる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 112。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q114",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 114,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "リチウムの濃集と鉱床",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "リチウム資源に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ リチウムは水への溶解度が高く、流体と共に移動しやすい元素であるため、液相に濃集するという特徴をもつ。\n㋑ 主なリチウム鉱床のタイプは、かん水とそれに付随する蒸発岩、ペグマタイト、堆積岩の3種類に分類される。\n㋒ ペグマタイト鉱床には、リチウムを濃集した特定の鉱物が存在するわけではなく、珪長質鉱物の微量成分として広く薄くリチウムが含有されている。\n㋓ 鉱床以外に、海水中のリチウム資源量も膨大であり、鉱床から採掘されるリチウム資源に匹敵する量のリチウムが海水から採取されている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "リチウムは Li⁺ として水に溶け、流体に移りやすい。主な資源には塩湖のかん水や蒸発岩、ペグマタイトのリチウム鉱物、堆積岩型鉱床がある。",
    "choiceExplanations": {
      "ア": "リチウムは Li⁺ として水に溶け、流体に移りやすい。主な資源には塩湖のかん水や蒸発岩、ペグマタイトのリチウム鉱物、堆積岩型鉱床がある。",
      "イ": "㋐は妥当だが、ペグマタイトにはリチウムを主成分に持つスポジュメンなどが存在する。",
      "ウ": "㋑の鉱床分類は妥当だが、ペグマタイトではスポジュメンや葉長石などの鉱物にリチウムが濃集する。",
      "エ": "㋑は妥当だが、海水は総量が多くても濃度が低く、鉱床に匹敵する規模で採取されていない。",
      "オ": "ペグマタイトにはリチウム鉱物があり、海水は総量が大きくても鉱床並みの生産には使われていない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 114。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-suri-butsuri-chikyu-q115",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 115,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "高度面積曲線と地殻の密度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球の地表面（海底面も含む）地形の特徴を示す高度面積曲線（図Ⅰ）と標高頻度分布（図Ⅱ）に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「図Ⅰからは、地表総面積の約［㋐］は陸地であることが読み取れる。図Ⅱで見られる二つのピークは図Ⅰで曲線の傾きが緩やかな部分に対応し、上のピークは平野に、下のピークは［㋑］に相当する。これら二つのピークをもつ地形が形成されたのは、［㋒］の異なる2種類の地殻が存在すること、すなわち、大陸地殻の方が海洋地殻より［㋒］が小さいことが要因の一つである。」",
    "choices": {
      "ア": "15％／大陸斜面／面積",
      "イ": "15％／深海平原／密度",
      "ウ": "30％／大陸斜面／面積",
      "エ": "30％／大陸斜面／密度",
      "オ": "30％／深海平原／密度"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "海水面より高い陸地は全体の約3割で、深い方のピークは広大で起伏の小さい深海平原に対応する。アイソスタシーにより、密度の小さい大陸地殻は密度の大きい海洋地殻より高い位置を占める。",
    "choiceExplanations": {
      "ア": "図Ⅰの海水準より上の累積面積は総面積の約30％であり、深い側のピークは広い深海平原に対応する。",
      "イ": "深海平原と密度は合うが、累積面積は海水面で約1.5億 km²、総面積は約5億 km² なので約30％である。",
      "ウ": "30％は合うが、深海のピークは急傾斜の大陸斜面に対応せず、高度の違いには地殻の密度が関係する。",
      "エ": "割合と密度は合うが、大陸斜面は広い深海平原ほど狭い水深帯に面積が集中しない。",
      "オ": "海水面より高い陸地は全体の約3割で、深い方のピークは広大で起伏の小さい深海平原に対応する。アイソスタシーにより、密度の小さい大陸地殻は密度の大きい海洋地殻より高い位置を占める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007477.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 115。解説は過去問AIの独自作成。 図の出典：沖野郷子「第1章 図1.2 地球のヒプソメトリックカーブ、地球の標高頻度分布、第4章 図4.1 太平洋と大西洋の海嶺を横切る地形断面図」（『海洋底地球科学』所収、東京大学出版会）。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-suri-butsuri-chikyu/q115.webp"
    ],
    "imageAltTexts": [
      "地球全体の高度面積曲線（図Ⅰ）と標高頻度分布（図Ⅱ）"
    ]
  }
];
