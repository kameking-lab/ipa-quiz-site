import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2026_SENMON_DIGITAL: Question[] = [
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q01",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "二次方程式の解と係数",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "二次方程式 x²−x−1＝0 の異なる2つの実数解をそれぞれα、βとする。このとき、α³＋β³はいくらか。",
    "choices": {
      "ア": "−4",
      "イ": "−2",
      "ウ": "1",
      "エ": "2",
      "オ": "4"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "解と係数の関係よりα＋β＝1、αβ＝−1である。よってα³＋β³＝（α＋β）³−3αβ（α＋β）＝1＋3＝4となる。",
    "choiceExplanations": {
      "ア": "根の和は1、積は−1である。3乗和から積の項を引くときはマイナスの値を引くため、答えは負にならない。",
      "イ": "α³＋β³＝（α＋β）³−3αβ（α＋β）で求める。積αβ＝−1を入れると差ではなく1＋3になる。",
      "ウ": "1は和α＋βの3乗である。α³＋β³を得るには積に関わる項−3αβ（α＋β）も加える必要がある。",
      "エ": "α²＝α＋1、β²＝β＋1なので、α³＝2α＋1、β³＝2β＋1となる。両式の定数項も含めると和は4である。",
      "オ": "解と係数の関係よりα＋β＝1、αβ＝−1である。よってα³＋β³＝（α＋β）³−3αβ（α＋β）＝1＋3＝4となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q02",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "立方体の対角線と球の接触",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "図Iのように、立方体に2つの球が入っており、2つの球はそれぞれ立方体の異なる3面に接し、かつ互いに接している。このとき、立方体の1辺の長さlはいくらか。ただし、球の半径はそれぞれ4√3と3√3であるとする。なお、図IIは点A、B、C、Dを通る平面による立方体と2つの球の切断面を示しており、図のように、2つの球の中心は線分BD上にある。",
    "choices": {
      "ア": "14",
      "イ": "7＋7√2",
      "ウ": "7√6",
      "エ": "7＋7√3",
      "オ": "7√2＋7√3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "空間対角線上の中心間距離は半径の和7√3なので、各座標方向での中心間隔は7となる。各中心はそれぞれ端の面から半径分離れており、辺長は7＋4√3＋3√3である。",
    "choiceExplanations": {
      "ア": "球の半径の和は7√3であり、これが球の中心間の距離である。立方体の辺の長さは、中心間距離に√3での換算と両端の位置の調整が必要となる。",
      "イ": "中心間距離を各座標方向の距離に換算するには、面対角線の√2ではなく、空間対角線の√3で割る。",
      "ウ": "中心間距離は7√3であり、各座標方向では7である。辺長はその7に両球の半径を足して求める。",
      "エ": "空間対角線上の中心間距離は半径の和7√3なので、各座標方向での中心間隔は7となる。各中心はそれぞれ端の面から半径分離れており、辺長は7＋4√3＋3√3である。",
      "オ": "両端の中心と面との距離の合計は7√3だが、中心間の空間距離を辺方向に換算した値は7である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q02.webp"
    ],
    "imageAltTexts": [
      "立方体の内部の二つの球と、両球の中心を通る断面（図I・図II）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q03",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "曲線の接点と導関数",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "2つの曲線 C₁：y＝x³−x、C₂：y＝x²−a が、x≧0において共有点をもち、その共有点におけるそれぞれの接線が一致するとき、aの値はいくらか。",
    "choices": {
      "ア": "0",
      "イ": "1",
      "ウ": "2",
      "エ": "3",
      "オ": "4"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "共有点の傾きが一致するので3x²−1＝2xとなり、非負の解はx＝1である。そこで高さは0と1−aなのでa＝1となる。",
    "choiceExplanations": {
      "ア": "a＝0なら両曲線は原点で交わるが、そこでの傾きはそれぞれ−1と0で一致しない。傾きが一致する非負のxは1である。",
      "イ": "共有点の傾きが一致するので3x²−1＝2xとなり、非負の解はx＝1である。そこで高さは0と1−aなのでa＝1となる。",
      "ウ": "傾きの一致からx＝1に限られる。a＝2ならC₂上での高さは−1となり、C₁上での高さ0とは一致しない。",
      "エ": "接点候補x＝1にa＝3を代入すると、C₂の高さは−2となる。C₁の高さは0なので共有点にはならない。",
      "オ": "傾きが一致する非負のxは1だけである。その点でa＝4とするとC₂の高さは−3となり、C₁と一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q04",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "対数を含む定積分",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "次の定積分の値はいくらか。\n\n∫₀¹ x logₑ（x²＋1） dx",
    "choices": {
      "ア": "−1／2 logₑ 2＋1／2",
      "イ": "−1／2 logₑ 2＋1",
      "ウ": "1／2 logₑ 2−1／4",
      "エ": "logₑ 2−1／2",
      "オ": "logₑ 2−1／4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "t＝x²＋1と置くと、元の積分は（1／2）∫₁² logₑ t dtとなる。（1／2）［t logₑ t−t］₁²＝logₑ 2−1／2である。",
    "choiceExplanations": {
      "ア": "t＝x²＋1とおくと上端は2であり、原始関数t logₑ t−tの対数項は上端で2 logₑ 2となる。符号も係数もこの形とは一致しない。",
      "イ": "積分区間を1から2に変えれば、原始関数t logₑ t−tの上端と下端の差を取る。対数項の符号は正となる。",
      "ウ": "置換による係数1／2は原始関数全体に掛かるが、上端でt＝2なので対数項の最終的な係数は1である。",
      "エ": "t＝x²＋1と置くと、元の積分は（1／2）∫₁² logₑ t dtとなる。（1／2）［t logₑ t−t］₁²＝logₑ 2−1／2である。",
      "オ": "対数項の係数は1だが、原始関数の−tが区間1から2で与える差は−1である。置換の係数1／2を掛けると定数項は−1／2となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q05",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "正規分布と不良品数",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "ある工場では、1個当たりの重さが100 gの製品を製造しており、製造された製品のうち、98 g未満の製品及び102 gを超える製品を不良品としている。この製品10,000個の重さの分布を平均100 g、標準偏差1 gの正規分布で近似するとき、製品10,000個中に含まれる不良品の個数として最も妥当なのはどれか。\n\nなお、ある確率変数Xが平均m、標準偏差σの正規分布N（m, σ²）に従うとき、Z＝（X−m）／σは標準正規分布N（0, 1）に従うことを用いてよい。図は標準正規分布の確率密度関数のグラフであり、斜線部の面積p（u）の値は標準正規分布表（一部抜粋）を参照すること。行がuの小数第1位まで、列がuの小数第2位に対応しており、例えばp（0.38）＝0.14803であることが読み取れる。",
    "choices": {
      "ア": "25",
      "イ": "105",
      "ウ": "225",
      "エ": "455",
      "オ": "1025"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "98 g、102 gに対応する値は−2、2である。図表より両端の面積は2×（0.5−0.47725）＝0.04550なので、10,000個中455個となる。",
    "choiceExplanations": {
      "ア": "標準化すると不良品はZ＜−2又はZ＞2である。両端の面積は合わせて約4.55％なので、10,000個中の件数は25ではない。",
      "イ": "105個は1.05％に当たるが、表から片側の端だけでも0.5−0.47725＝0.02275で、それを上回る。",
      "ウ": "約225個は片側だけを考えた数に近い。98 g未満と102 g超の両方を不良とするため、対称な二つの端を足す。",
      "エ": "98 g、102 gに対応する値は−2、2である。図表より両端の面積は2×（0.5−0.47725）＝0.04550なので、10,000個中455個となる。",
      "オ": "1025個は10.25％に当たる。平均から2標準偏差を超える二つの端の確率は合計約4.55％である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q05-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-digital/q05-2.webp"
    ],
    "imageAltTexts": [
      "標準正規分布の確率密度と斜線部p(u)",
      "標準正規分布表の抜粋"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q06",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "対称移動の行列",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "xy平面上の直線 y＝√3x に関する点の対称移動を表す行列として正しいのはどれか。なお、原点を中心に反時計回りに角θだけ回転する移動が R（θ）＝［cos θ, −sin θ；sin θ, cos θ］で表されることを用いてよい。",
    "choices": {
      "ア": "［−√3／2, −1／2；−1／2, −√3／2］",
      "イ": "［−√3／2, −1／2；1／2, √3／2］",
      "ウ": "［−1／2, −√3／2；−√3／2, −1／2］",
      "エ": "［−1／2, −1／2；−√3／2, −√3／2］",
      "オ": "［−1／2, √3／2；√3／2, 1／2］"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "鏡映の軸はx軸と60度をなすので、R（60度）［1, 0；0, −1］R（−60度）を求める。対角成分はcos 120度とその逆符号、非対角成分はともにsin 120度である。",
    "choiceExplanations": {
      "ア": "直線上の点（1, √3）は鏡映で動かない。この行列を掛けると第1成分が−√3になり、条件を満たさない。",
      "イ": "鏡映は長さを保存するので、行列の2列は互いに直交する単位ベクトルになる。この行列では列の内積が0でない。",
      "ウ": "正しい鏡映行列の非対角成分はsin（2π／3）＝√3／2である。この選択肢では非対角成分の符号が逆となっている。",
      "エ": "この行列は2列が同じなので逆行列を持たない。鏡映を2回行うと元の点に戻るため、鏡映行列には逆行列がある。",
      "オ": "鏡映の軸はx軸と60度をなすので、R（60度）［1, 0；0, −1］R（−60度）を求める。対角成分はcos 120度とその逆符号、非対角成分はともにsin 120度である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q07",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "複素数のべきと複素数平面",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "a、bを実数とし、複素数 z＝a＋bi が z²−z＋1＝0 を満たすとする。このとき、z⁴を表したものとして正しいのは、図の複素数平面上の点A～Eのうちではどれか。ただし、iは虚数単位とし、図のx軸は実軸を、y軸は虚軸を表すものとする。",
    "choices": {
      "ア": "A",
      "イ": "B",
      "ウ": "C",
      "エ": "D",
      "オ": "E"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "z＝（1±√3i）／2の偏角は±60度で、4乗の偏角は240度又は120度となる。選択肢では240度に対応するDが該当する。",
    "choiceExplanations": {
      "ア": "Aは実数1を表す。方程式の根の偏角は±60度で、その4倍は360度の整数倍にはならない。",
      "イ": "Bは偏角45度の点である。z⁴が取り得る偏角は240度又は120度なので、Bには当たらない。",
      "ウ": "Cの偏角は150度である。z⁴は実部が−1／2で虚部が±√3／2となるため、実部が−√3／2のCとは異なる。",
      "エ": "z＝（1±√3i）／2の偏角は±60度で、4乗の偏角は240度又は120度となる。選択肢では240度に対応するDが該当する。",
      "オ": "Eは偏角270度の点で、実部は0である。z⁴の偏角は240度又は120度で、実部はどちらも−1／2である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q07.webp"
    ],
    "imageAltTexts": [
      "複素数平面上の点A～E"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q08",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "ロジスティック方程式",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "ある微分方程式に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ある生物の個体数の変化が、個体数に比例する増加要因と、個体数の2乗に比例する減少要因のみによるとき、時刻tにおける個体数 y＝y（t）は、微分方程式 dy／dt＝py−qy² を満たす。ここで、p、qは正の比例定数である。したがって、個体数yは r＝［㋐］とおくと、0＜y＜r において［㋑］であり、r＜y において［㋒］となる。」\n\n各選択肢は㋐、㋑、㋒の順。",
    "choices": {
      "ア": "p／q ／ 単調増加 ／ 単調減少",
      "イ": "p／q ／ 単調減少 ／ 単調増加",
      "ウ": "pq ／ 単調減少 ／ 単調増加",
      "エ": "p−q ／ 単調増加 ／ 単調減少",
      "オ": "p−q ／ 単調減少 ／ 単調増加"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "dy／dt＝y（p−qy）となり、正の平衡値はr＝p／qである。0＜y＜rでは微分係数が正、y＞rでは負となり、順に単調増加、単調減少である。",
    "choiceExplanations": {
      "ア": "dy／dt＝y（p−qy）となり、正の平衡値はr＝p／qである。0＜y＜rでは微分係数が正、y＞rでは負となり、順に単調増加、単調減少である。",
      "イ": "しきい値のp／qは合っている。0＜y＜p／qではp−qyが正、y＞p／qでは負になるので、増減の順が逆である。",
      "ウ": "正の平衡値はp−qy＝0を解いて求める。pとqを掛けるのではなく割り、しきい値より小さい正の個体数では増加する。",
      "エ": "しきい値の前後で増加から減少に変わる点は正しい。しきい値はp−qではなく、pyとqy²が等しくなるp／qである。",
      "オ": "p−qはy＝1での微分係数に相当する。平衡値はp／qであり、その下側では増加し、上側では減少する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q09",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "勾配降下法と停留点",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "p＜q＜r＜s＜Aを正の定数とする。図Iは、x＝rで最小値をとる関数 f（x）＝（x−p）²（x−q）（x−s）のグラフである。図IIのフローチャートは、α、εを正の定数、x₀∈［0, A］を初期値とする、ある処理を示したものである。このとき、p、q、r、sのうち、α、εの値によらず、x₀の取り方により出力値となり得るもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "p",
      "イ": "p、q、s",
      "ウ": "p、r",
      "エ": "q、s",
      "オ": "r"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "f′（p）＝f′（r）＝0なので、どちらも初期値とすれば更新せずに出力される。q、sでは導関数が0でなく、固定したαに対してεを十分小さくすると、それらに更新して停止することもできない。",
    "choiceExplanations": {
      "ア": "pは重根で導関数が0となるため、初期値をpとすると停止する。極小点rも同じ理由で出力され得る。",
      "イ": "pは停留点だが、qとsはグラフがx軸を横切る単根で導関数が0でない。任意のα、εについて両点を出力できるとはいえない。",
      "ウ": "f′（p）＝f′（r）＝0なので、どちらも初期値とすれば更新せずに出力される。q、sでは導関数が0でなく、固定したαに対してεを十分小さくすると、それらに更新して停止することもできない。",
      "エ": "qとsは零点だが傾きが0ではない。停止判定に用いるのは関数値f（x）ではなく導関数の値である。",
      "オ": "最小値をとるrは出力され得るが、pも導関数が0となる点である。pを初期値とした場合はそのまま停止する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q09-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-digital/q09-2.webp"
    ],
    "imageAltTexts": [
      "関数f(x)のグラフ（図I）",
      "勾配による反復更新のフローチャート（図II）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q10",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "基数と有限小数",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "12進法（Duodecimal）の小数で表したときに有限小数にならないのは次のうちではどれか。",
    "choices": {
      "ア": "1／2",
      "イ": "2／3",
      "ウ": "3／4",
      "エ": "4／5",
      "オ": "5／6"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "既約分数の分母5は12のどの累乗も割り切れない。12進法で有限小数になる分母の素因数は2と3だけである。",
    "choiceExplanations": {
      "ア": "12は2で割り切れるので、1／2は6／12と表せる。したがって12進法では小数第1位で終わる。",
      "イ": "2／3は8／12と表せる。分母の3は12の素因数なので、12進法の有限小数になる。",
      "ウ": "3／4は9／12と表せる。分母4は12の約数なので、12進法の小数第1位で表現できる。",
      "エ": "既約分数の分母5は12のどの累乗も割り切れない。12進法で有限小数になる分母の素因数は2と3だけである。",
      "オ": "5／6は10／12と表せるので、12進法の小数第1位だけで表現できる。10を表す一桁の数字を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q11",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "フリップフロップの定常状態",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "次の回路において、クロック入力が印加された場合でも、二つのフリップフロップの値がともに変化しないときのフリップフロップの初期値Q₁、Q₂の組合せとして最も妥当なのはどれか。ただし、配線やゲートの遅延は0とみなしてよいものとする。",
    "choices": {
      "ア": "（0, 0）",
      "イ": "（0, 1）",
      "ウ": "（1, 0）",
      "エ": "（1, 1）",
      "オ": "条件を満たすような初期値はない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Q₁＝1、Q₂＝0なら反転値は順に0、1で、その排他的論理和は1になる。第2入力はQ₁の反転値0なので、次の状態も（1, 0）になる。",
    "choiceExplanations": {
      "ア": "Q₁の反転出力が第2フリップフロップへの入力なので、Q₁＝0のとき次のQ₂は1となる。したがって状態は不変ではない。",
      "イ": "Q₁＝0、Q₂＝1なら反転出力は順に1、0で、第1入力の排他的論理和は1になる。次のQ₁が0のままにならない。",
      "ウ": "Q₁＝1、Q₂＝0なら反転値は順に0、1で、その排他的論理和は1になる。第2入力はQ₁の反転値0なので、次の状態も（1, 0）になる。",
      "エ": "Q₁＝1なら第2入力は0である。Q₂が1のままにならないため、不変状態にはならない。",
      "オ": "（1, 0）と置けば、回路の第1入力は1、第2入力は0となる。クロックが入っても各出力は対応する初期値と等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q11.webp"
    ],
    "imageAltTexts": [
      "二つのDフリップフロップとゲートをつないだ回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q12",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "直列・並列システムの稼働率",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、稼働率が全て等しい装置X₁～X₄を接続したシステムA、B、Cについて、稼働率が高いものから順に並べたものとして最も妥当なのはどれか。ただし、稼働率は0より大きく1未満であるものとする。また、システム全体が稼働するには、どの装置を用いるかに関わりなく、並列に接続されている部分はどちらかの部分が稼働していればよく、直列に接続されている部分は両方の部分が稼働していなければならないものとする。",
    "choices": {
      "ア": "A＞B＞C",
      "イ": "A＞C＞B",
      "ウ": "B＞A＞C",
      "エ": "B＞C＞A",
      "オ": "C＞B＞A"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "装置が独立に稼働し、その稼働率をpとすると、A、B、Cの稼働率は2p−p²、2p²−p⁴、2p²−p³である。BはCよりp³（1−p）大きく、AはBより大きい。",
    "choiceExplanations": {
      "ア": "装置が独立に稼働し、その稼働率をpとすると、A、B、Cの稼働率は2p−p²、2p²−p⁴、2p²−p³である。BはCよりp³（1−p）大きく、AはBより大きい。",
      "イ": "Aは最大だが、Bの二つの分岐は独立した装置を使う。数式で比較するとB−C＝p³（1−p）＞0である。",
      "ウ": "BはAの各並列経路に装置を1台直列に加えた形である。分岐ごとの稼働率がpからp²に下がるので、全体の稼働率もAより低い。",
      "エ": "BがCを上回る点は正しいが、Aの各並列経路は装置1台で構成される。各経路で装置2台が必要となるBより稼働率が高い。",
      "オ": "CはX₁が停止すると並列部が稼働していても全体が停止する。比較するとA、Bより稼働率が低い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q12.webp"
    ],
    "imageAltTexts": [
      "システムA、B、Cの直列・並列接続図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q13",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "命題論理の恒真式",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "P、Qを命題とするとき、トートロジー（恒真式）は次のうちどれか。ただし、¬Xは命題Xの否定を表す。なお、表は、P→Qの真理値表である。",
    "choices": {
      "ア": "（P→Q）∧（Q→P）",
      "イ": "（P→Q）∨（¬Q→¬P）",
      "ウ": "（P→Q）∨（¬P∧Q）",
      "エ": "（P→Q）∨（P∧¬Q）",
      "オ": "（P∨Q）∨（P∧Q）"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "P→Qが偽なのはP＝1、Q＝0のときだけで、そのとき第2項のP∧¬Qが真になる。すべての真理値の組合せで全体が真である。",
    "choiceExplanations": {
      "ア": "P、Qの真理値が同じときだけ両向きの含意が成り立つ。例えばP＝1、Q＝0では第1項が偽になる。",
      "イ": "二つの項は互いに対偶なので常に同じ真理値になる。P＝1、Q＝0のときは両方とも偽である。",
      "ウ": "P＝1、Q＝0のとき、P→Qは偽になる。¬P∧Qもこの組合せでは偽のため、全体が恒真式にはならない。",
      "エ": "P→Qが偽なのはP＝1、Q＝0のときだけで、そのとき第2項のP∧¬Qが真になる。すべての真理値の組合せで全体が真である。",
      "オ": "第2項が真なら第1項も真なので、この式はP∨Qと同じ真理値を持つ。P＝Q＝0では偽となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q13.webp"
    ],
    "imageAltTexts": [
      "命題P→Qの真理値表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q14",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "再帰関数と整数除算",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次の関数funcにおいて、引数nを1、2、3、……と増加させながら呼び出したとき、戻り値が初めて50より大きくなるnの値はいくらか。\n\nint func(int n) {\n    if (n <= 0) return 1;\n    return func(n - 1) + func(n / 2);\n}",
    "choices": {
      "ア": "10",
      "イ": "11",
      "ウ": "12",
      "エ": "13",
      "オ": "14"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Cの整数除算を用いるとfunc（9）＝46、func（5）＝14であり、func（10）＝60となる。戻り値はnに対して増加するため、初めて50を超えるnは10である。",
    "choiceExplanations": {
      "ア": "Cの整数除算を用いるとfunc（9）＝46、func（5）＝14であり、func（10）＝60となる。戻り値はnに対して増加するため、初めて50を超えるnは10である。",
      "イ": "func（11）の戻り値は74で50より大きいが、一つ前のfunc（10）は既に60である。したがって11は最初の値ではない。",
      "ウ": "func（12）の戻り値は94だが、func（10）で既に60に達しているため、最初に50より大きくなるのは12ではない。",
      "エ": "func（13）は114を返す。各再帰で足す値は正で、func（9）＝46からfunc（10）＝60になった時点で既に50を超える。",
      "オ": "func（14）は140を返すが、求めるのは50を初めて上回る引数である。14より前の10で戻り値は60となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q15",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "条件付きエントロピー",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "表は、A市とB市の100日分の天気を調査して集計したものである。A市の天気が分かったときのB市の天気についての条件付きエントロピーとして最も妥当なのはどれか。ただし、log₂ 3＝1.585、log₂ 5＝2.322、log₂ 7＝2.807とする。",
    "choices": {
      "ア": "0.612ビット",
      "イ": "0.754ビット",
      "ウ": "1.242ビット",
      "エ": "1.491ビット",
      "オ": "2.996ビット"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Aが晴れの場合のBの二値分布は（6／7, 1／7）、それ以外は（1／6, 5／6）である。それぞれのエントロピーを0.7と0.3で重み付けすると約0.609ビットとなり、最も近いのは0.612である。",
    "choiceExplanations": {
      "ア": "Aが晴れの場合のBの二値分布は（6／7, 1／7）、それ以外は（1／6, 5／6）である。それぞれのエントロピーを0.7と0.3で重み付けすると約0.609ビットとなり、最も近いのは0.612である。",
      "イ": "二つの条件付き分布のエントロピーはそれぞれ約0.592と0.650ビットであり、その重み付き平均は0.754ビットにはならない。",
      "ウ": "A市の天気ごとにB市のエントロピーを求め、A市が各状態になる確率で重み付けする必要がある。条件別の値を単純に足し合わせてはいけない。",
      "エ": "B市の状態は晴れと晴れ以外の二つである。二値のエントロピーは1ビット以下なので、その条件付き平均も1.491ビットにはならない。",
      "オ": "対数の各項を対応する確率で重み付けする。B市に取り得る状態が二つしかないので条件付きエントロピーは1ビットを超えない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q15.webp"
    ],
    "imageAltTexts": [
      "A市とB市の天気を100日分集計した表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q16",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "繰返し符号とZ通信路",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "符号の誤り確率に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「『是』又は『非』を、3回繰り返し符号を用いて符号化し、エラーのある通信路で送信する。3回繰り返し符号では、『是』は3ビットの符号語111に符号化し、『非』は000に符号化する。通信路はビット誤り率が0.1のZ通信路、すなわち、ビット0を送信したときには必ず0を受信できるが、ビット1を送信したときには確率0.1でビットが反転する。復号は、復号を誤る確率を最小にするように定める。このとき、受信語010は［㋐］と復号すればよい。また、『是』が送信される確率が0.6であるとき、復号が誤る確率は［㋑］である。」",
    "choices": {
      "ア": "是 ／ 0.0006",
      "イ": "是 ／ 0.001",
      "ウ": "非 ／ 0.0006",
      "エ": "非 ／ 0.001",
      "オ": "非 ／ 0.1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "0は反転しないため、1を含む010は111を送信した場合にしか起きない。誤るのは送信111の全ビットが反転する場合だけで、確率は0.6×0.1³＝0.0006である。",
    "choiceExplanations": {
      "ア": "0は反転しないため、1を含む010は111を送信した場合にしか起きない。誤るのは送信111の全ビットが反転する場合だけで、確率は0.6×0.1³＝0.0006である。",
      "イ": "010を「是」と読む点は正しいが、0.001は「是」を送ったとき全ビットが反転する条件付き確率であり、送信確率0.6も掛ける。",
      "ウ": "誤り確率は0.0006だが、0から1への反転は起きない。1を含む受信語を「非」と復号する根拠はない。",
      "エ": "010は「非」の符号語000から発生し得ない。さらに全ビットの反転確率だけでなく「是」の送信確率0.6を考える必要がある。",
      "オ": "010は「是」であり、0.1は単独の1ビットの反転確率である。復号誤りには111を送った上で3ビットすべてが反転する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q17",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "リレーショナルデータベースの第3正規形",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "次は、リレーショナルデータベースのリレーションを表している。第3正規形になっているのは次のうちではどれか。ただし、原表の下線部は主キーを表している。",
    "choices": {
      "ア": "社員番号を主キーとする、社員番号・名前・部門コード・部門名の表",
      "イ": "社員番号を主キーとする、社員番号・名前・部門コード・役職の表",
      "ウ": "顧客番号と担当者番号を主キーとする、顧客番号・顧客名・担当者番号・担当者名の表",
      "エ": "顧客番号と担当者番号を主キーとする、顧客番号・担当者番号・担当者名の表",
      "オ": "顧客番号と担当者番号を主キーとする、顧客番号・担当者番号・顧客名の表"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "名前、部門コード、役職は社員番号に依存する。部門コードだけでは役職が決まらず、主キーの一部への依存や非キー属性間の推移的な依存がない。",
    "choiceExplanations": {
      "ア": "部門名は部門コードで決まり、社員番号から部門コードを経由して推移的に求まる。非キー属性はこのような依存関係を持っている。",
      "イ": "名前、部門コード、役職は社員番号に依存する。部門コードだけでは役職が決まらず、主キーの一部への依存や非キー属性間の推移的な依存がない。",
      "ウ": "顧客名は顧客番号のみ、担当者名は担当者番号のみに依存する。どちらも複合主キー全体に依存しないため、第2正規形の要件も満たさない。",
      "エ": "担当者名は担当者番号だけで決まる。担当者番号は複合主キーの一部分であり、部分関数従属が残っている。",
      "オ": "顧客名は複合主キー全体を必要とせず、顧客番号だけで決まる。そのため部分関数従属があり、第3正規形ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q17-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-digital/q17-2.webp"
    ],
    "imageAltTexts": [
      "選択肢1～3のリレーションの原表",
      "選択肢4～5のリレーションの原表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q18",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "AI法と研究開発の推進",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "我が国におけるAI（人工知能）に関する法律に関する次の記述のうち、最も妥当なのはどれか。",
    "choices": {
      "ア": "AIは、日本の産業発展のために重要であり、国が積極的に開発促進を図ることが求められるが、「産業競争力強化法」や「デジタル社会形成基本法」を根拠に対処できるため、AIに特化した法律は制定されていない。",
      "イ": "AI導入によるリスクを低減し適切な規制を行うことが必要であるが、「個人情報保護法」、「著作権法」、「サイバーセキュリティ基本法」などの既存の法律で対応可能なため、AIに特化した法律は制定されていない。",
      "ウ": "信頼できるAIの導入を促進するとともに、AIシステムの有害な影響に対して、健康や安全、環境保護などの基本的権利の保護を確保するために、「人工知能規制に関する法律」が制定され、リスクベースアプローチを採用し、リスクに応じた規制が定められている。",
      "エ": "「人工知能関連技術の研究開発及び活用の推進に関する法律」が制定され、ディープフェイクや権利侵害など、事業者がAIを開発又は活用することにより提供した製品やサービスがその利用者に深刻な被害を与えた場合に、事業者に課せられる罰則が規定されている。",
      "オ": "「人工知能関連技術の研究開発及び活用の推進に関する法律」が制定され、国がAIの研究開発の推進、AIの適正な研究開発及び活用のための指針の整備、人材の確保などの施策を講じることが規定されている。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "日本では2025年にAI関連技術の研究開発及び活用を推進する法律が制定された。国の施策として研究開発の推進や指針の整備、人材の確保などが定められている。",
    "choiceExplanations": {
      "ア": "デジタル社会形成基本法などに加え、2025年に人工知能関連技術の研究開発及び活用の推進に関する法律が成立している。",
      "イ": "個人情報保護法や著作権法は個別のリスクに引き続き適用される。一方、AI関連技術の研究開発と活用を進めるための独立した法律も制定された。",
      "ウ": "リスクの程度によって規制を区分する説明は欧州連合のAI規則に近い。日本の法律の名称と制度の内容はいずれもこの肢の説明とは異なる。",
      "エ": "同法は国の施策や事業者の責務を定めているが、この肢が挙げた深刻な被害について事業者に科す独自の罰則は定めていない。",
      "オ": "日本では2025年にAI関連技術の研究開発及び活用を推進する法律が制定された。国の施策として研究開発の推進や指針の整備、人材の確保などが定められている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q19",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "政府のサイバーセキュリティ統一基準群",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "サイバーセキュリティ基本法に基づいて策定された「政府機関等のサイバーセキュリティ対策のための統一基準群」（以下、統一基準群）に関する次の記述のうち、最も妥当なのはどれか。",
    "choices": {
      "ア": "統一基準群において適用対象とする者は、各機関が指定する情報セキュリティ担当者及び情報セキュリティ責任者である。",
      "イ": "情報の格付の区分として、機密性が3分類、完全性が2分類、可用性が2分類で定義されている。",
      "ウ": "「.go.jp」で終わるドメイン名は、日本国の政府機関と独立行政法人のみが登録（取得）することができる。",
      "エ": "「CSIRT」は、機関等においてセキュリティ上の業務課題を解決するため外部委託したシステム開発についての窓口となるよう、当該機関等に設置された体制をいい、Computer System Integration Response Teamの略である。",
      "オ": "統一基準群は、政府機関等の情報セキュリティの基準を統一することで、調達コストを下げ、セキュリティインシデントに対して一貫した対応をとるために策定されたものである。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "情報の取扱いに必要な保護の水準を示すため、機密性は3区分、完全性と可用性はそれぞれ2区分で格付けされている。",
    "choiceExplanations": {
      "ア": "適用対象は情報セキュリティの担当者や責任者だけではない。政府機関等において情報や情報システムを取り扱う職員などにも関係する。",
      "イ": "情報の取扱いに必要な保護の水準を示すため、機密性は3区分、完全性と可用性はそれぞれ2区分で格付けされている。",
      "ウ": "政府機関と独立行政法人のほか、法律で設立された特殊法人で所定の条件を満たす法人などにも登録資格がある。",
      "エ": "CSIRTはComputer Security Incident Response Teamの略である。組織で発生したセキュリティインシデントを受け付け、対応を調整する体制を指す。",
      "オ": "統一基準群は政府機関等全体のサイバーセキュリティ水準の向上を目的とする。調達コストの削減を策定目的の中心には置いていない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q20",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "生体認証の特徴",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "次の特性を全てもつ生体認証として最も妥当なのは次のうちではどれか。\n\n・非接触である。\n・一卵性双生児でも識別できる。\n・生涯で不変である。\n・なりすましが困難である。\n・体調に影響されにくい。",
    "choices": {
      "ア": "指紋認証",
      "イ": "顔認証",
      "ウ": "静脈認証",
      "エ": "虹彩認証",
      "オ": "声紋認証"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "虹彩の模様は双生児でも異なり、成長後は長期間安定する。カメラで非接触に取得でき、体調による影響も受けにくい。",
    "choiceExplanations": {
      "ア": "指紋は双生児でも異なる一方、一般的な指紋認証では読み取り面に指を当てる。非接触という条件を典型的に満たすものは虹彩認証である。",
      "イ": "顔認証は非接触で使えるが、一卵性双生児の区別や、年齢などによる顔の変化への対応が難しい場合がある。",
      "ウ": "静脈認証は指や手の静脈のパターンを用いる。方式によって接触が必要で、読み取りは血流の状態などの影響も受け得る。",
      "エ": "虹彩の模様は双生児でも異なり、成長後は長期間安定する。カメラで非接触に取得でき、体調による影響も受けにくい。",
      "オ": "声紋はマイクで取得できるが、喉の状態や加齢で変化し得る。録音などへの対策も要するため、提示された特徴をすべては満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q21",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "計算機科学",
    "topicTags": [
      "ハミルトン閉路の数え上げ",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "6頂点から成る完全無向グラフから、辺を1本取り除いて得られるグラフをGとする。Gにおいて全頂点をちょうど1回訪問するような閉路は何通りあるか。ただし、閉路はそこに含まれる辺の集合で表されるものとし、異なる辺集合で表される閉路を異なる閉路とみなすものとする。",
    "choices": {
      "ア": "12通り",
      "イ": "36通り",
      "ウ": "60通り",
      "エ": "72通り",
      "オ": "96通り"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "始点を固定し、逆向きの重複を除くと完全グラフでは5！／2＝60通りである。除いた辺の端点を一つの組にするとその辺を含む閉路は4！＝24通りなので、残るのは36通りとなる。",
    "choiceExplanations": {
      "ア": "完全グラフの閉路は60通りあり、取り除く辺を含む閉路は24通りである。残りは12通りではなく36通りとなる。",
      "イ": "始点を固定し、逆向きの重複を除くと完全グラフでは5！／2＝60通りである。除いた辺の端点を一つの組にするとその辺を含む閉路は4！＝24通りなので、残るのは36通りとなる。",
      "ウ": "60通りは辺を除く前の完全グラフについての値である。指定された辺を使う24通りを差し引く必要がある。",
      "エ": "72通りは取り除いた後の閉路を両方向から別々に数えた値である。問題では辺集合が同じなら一つの閉路として数える。",
      "オ": "6頂点の完全無向グラフにおいても、辺集合の異なる閉路は60通りである。辺を取り除くことでその数が96通りに増えることはない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q22",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "計算機科学",
    "topicTags": [
      "有限オートマトンの最小化",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "図のような決定性有限オートマトンと等価なオートマトンのうち、状態数が最小であるものの一つをMₘᵢₙで表すとする。Mₘᵢₙの状態数はいくらか。",
    "choices": {
      "ア": "4",
      "イ": "5",
      "ウ": "6",
      "エ": "7",
      "オ": "8"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "初期状態aからdに到達できないためdを削除する。到達可能な状態のうち0でg、1でcに移るbとhを統合すると、互いに区別できる6状態が残る。",
    "choiceExplanations": {
      "ア": "到達不能なdを取り除き、遷移が一致するbとhを一つにまとめられる。それ以外の到達可能な状態は受理される入力列で区別でき、4状態にはならない。",
      "イ": "cは入力0で受理状態aに遷移する。cを他の非受理状態と同一視することはできず、分割を続けると計6状態が残る。",
      "ウ": "初期状態aからdに到達できないためdを削除する。到達可能な状態のうち0でg、1でcに移るbとhを統合すると、互いに区別できる6状態が残る。",
      "エ": "7は到達不能状態dだけを取り除いた後の数である。bとhは各入力に対する遷移先が一致し、どちらも非受理状態なので統合できる。",
      "オ": "8は図に描かれた状態の数である。初期状態から到達しないdと、同じ振る舞いをするb、hの重複を除く必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q22.webp"
    ],
    "imageAltTexts": [
      "初期状態aを含む8状態の決定性有限オートマトン"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q23",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "計算機科学",
    "topicTags": [
      "半順序と内積",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "Pを、各成分が非負整数であるような2次元ベクトル全てから成る集合とする。x、y∈Pに対して、〈x, y〉はxとyの内積を表すものとする。z∈Pによって決まるP上の半順序≺（z）を次のように定める。\n\np ≺（z） q ⇔ 〈p, z〉＜〈q, z〉\n\na＝（0, 1）、b＝（1, 1）としたとき、（2, 3）≺（a）p かつ p≺（b）（4, 6）を満たすp∈Pはいくつあるか。",
    "choices": {
      "ア": "2個",
      "イ": "12個",
      "ウ": "15個",
      "エ": "21個",
      "オ": "38個"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "p＝（u, v）とすると内積の条件はv＞3とu＋v＜10になる。vを4から9まで動かすとuは順に6、5、4、3、2、1通りで、合計21通りとなる。",
    "choiceExplanations": {
      "ア": "pの第2成分は3より大きく、二つの成分の和は10より小さい。第2成分が4の場合だけでも、第1成分には0から5までの6通りある。",
      "イ": "成分ごとの上限を別々に読むのではなく、第1成分と第2成分の和を9以下にする。第2成分が4から9の各場合を合計すると12を上回る。",
      "ウ": "第2成分は4から9まで、その各場合に第1成分は0を含む。条件を満たす数は6＋5＋4＋3＋2＋1である。",
      "エ": "p＝（u, v）とすると内積の条件はv＞3とu＋v＜10になる。vを4から9まで動かすとuは順に6、5、4、3、2、1通りで、合計21通りとなる。",
      "オ": "二つの条件はいずれも不等号が厳密なので、v＝3やu＋v＝10の組を数えてはいけない。許される組は38より少ない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q24",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "プルアップと論理式",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "a～dを入力、zを出力とする、図のような回路の働きを表した論理式として最も妥当なのは次のうちではどれか。",
    "choices": {
      "ア": "z＝¬（a・b）＋¬（c・d）",
      "イ": "z＝（¬a＋¬b）・（¬c＋¬d）",
      "ウ": "z＝（a＋b）・（c＋d）",
      "エ": "z＝a＋b＋c＋d",
      "オ": "この中にはない。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "aとbがともに1、又はcとdがともに1のときに出力端が接地される。したがって z＝¬（ab＋cd）＝（¬a＋¬b）・（¬c＋¬d）である。",
    "choiceExplanations": {
      "ア": "この式では一方の直列経路が遮断されれば出力が1になる。実際には他方の経路が通じていれば出力端が接地され、0となる。",
      "イ": "aとbがともに1、又はcとdがともに1のときに出力端が接地される。したがって z＝¬（ab＋cd）＝（¬a＋¬b）・（¬c＋¬d）である。",
      "ウ": "a、b、c、dがすべて0ならこの式は0となるが、実際の回路では接地経路がなく、プルアップ抵抗により出力は1となる。",
      "エ": "入力がすべて0なら出力端は電源側に引き上げられ1になる。この論理和の式では同じ入力に対する出力が0となる。",
      "オ": "接地経路はab又はcdが1のときに成立する。これを否定してド・モルガンの法則で変形すると選択肢2の式になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q24.webp"
    ],
    "imageAltTexts": [
      "入力a～dによる、プルアップ抵抗と二つの直列経路をもつ回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q25",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "ラッチの次状態",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "図のようなラッチ回路の次状態Q⁺を表す特性方程式として最も妥当なのはどれか。",
    "choices": {
      "ア": "Q⁺＝RH＋Q",
      "イ": "Q⁺＝R（H＋Q）",
      "ウ": "Q⁺＝R＋H",
      "エ": "Q⁺＝R＋HQ",
      "オ": "Q⁺＝H（R＋Q）"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "下側のANDゲートの出力はHと現在のQの論理積HQである。これがRとともに上側のORゲートに入るため、Q⁺＝R＋HQとなる。",
    "choiceExplanations": {
      "ア": "R＝0、H＝0では帰還が遮断され、次状態は0になる。この式はQ＝1の場合に以前の状態をそのまま保持してしまう。",
      "イ": "R＝0、H＝1では帰還路が有効なので、次状態は現在のQに従う。この式ではR＝0なら常に0となる。",
      "ウ": "H＝1だけでは次状態が必ず1になるわけではない。R＝0なら、H＝1では現在のQを保持する。",
      "エ": "下側のANDゲートの出力はHと現在のQの論理積HQである。これがRとともに上側のORゲートに入るため、Q⁺＝R＋HQとなる。",
      "オ": "R＝1であれば上側のORゲートの出力はHにかかわらず1になる。この式ではH＝0のときに0となるため一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q25.webp"
    ],
    "imageAltTexts": [
      "ORゲートとANDゲートが帰還で接続されたラッチ回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q26",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "分岐予測と投機実行",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "分岐予測ミスによるペナルティを軽減するための技術や戦略に関する次の記述のうち妥当でないものはどれか。",
    "choices": {
      "ア": "スーパスカラプロセッサにおける命令レベル並列性（ILP）の追求は、分岐予測ミスの影響を緩和することも目的の一つであり、より多くの実行ユニットで独立した命令を並行処理することを可能にする。",
      "イ": "分岐予測が外れた場合、リオーダバッファ（ROB）などの機構を用いて、誤ったパスで実行された命令の副作用をコミットさせずに破棄することで、プログラムの誤動作を防ぎつつ、誤った投機による効率低下から迅速に回復することを可能にする。",
      "ウ": "ループ検出器やループ予測器は、プログラム内のループ構造を特定し、特にループ終了時の分岐予測ミス（ループ終了ミス）の発生を抑制することを目的とする。",
      "エ": "Branch Target Buffer（BTB）は、分岐の方向（taken/not-taken）予測と同時に、命令自体が分岐命令であるかどうか及び分岐がtakenになった場合のターゲットアドレスを予測することで、パイプラインのストールを抑制する。",
      "オ": "プログラマが分岐予測のヒント情報をCPUに伝達する仕組みが存在しており、CPUによってはこれを分岐予測に利用して精度向上を図る場合がある。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "命令レベル並列性を利用する目的は、独立した命令を並行して実行し処理量を上げることである。並列の実行ユニットを増やすこと自体は、誤った分岐先の命令を処理した際の回復を実現しない。",
    "choiceExplanations": {
      "ア": "命令レベル並列性を利用する目的は、独立した命令を並行して実行し処理量を上げることである。並列の実行ユニットを増やすこと自体は、誤った分岐先の命令を処理した際の回復を実現しない。",
      "イ": "ROBにある投機実行の結果は、確定するまでアーキテクチャ上の状態に反映しない。分岐予測が外れた場合は誤った経路の結果を破棄して回復できる。",
      "ウ": "ループの反復回数などを予測できれば、反復中とループ終了時の分岐を区別できる。その分、終了時に起こりやすい予測ミスを減らせる。",
      "エ": "BTBは分岐命令のアドレスから、その分岐の行き先を早く得るために用いられる。方向予測と組み合わせると分岐先からの命令取得を早く始められる。",
      "オ": "分岐の起こりやすさをヒントとして伝えられる命令セットなどがある。CPUがその情報を用いるかは処理系や機種による。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q27",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "浮動小数点表現とバイアス",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "IEEE 754標準規格で定められた単精度浮動小数点フォーマットにならい、指数部を3ビット、仮数部を4ビットとする、符号ビットを含めて全長8ビットの浮動小数点フォーマットを新たに考えた。−12をこのフォーマットで表現したものとして最も妥当なのは次のうちではどれか。ただし、IEEE 754標準規格で定められた単精度浮動小数点における指数部のバイアスは127であるのに対し、本フォーマットの指数部のバイアスは3であるとする。",
    "choices": {
      "ア": "1 110 1000",
      "イ": "1 110 1100",
      "ウ": "1 011 1000",
      "エ": "1 011 1100",
      "オ": "1 011 0110"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "12は2進数で1100、正規化すると1.1000×2³である。符号は1、指数はバイアスを加えた6＝110、仮数の小数部は1000となる。",
    "choiceExplanations": {
      "ア": "12は2進数で1100、正規化すると1.1000×2³である。符号は1、指数はバイアスを加えた6＝110、仮数の小数部は1000となる。",
      "イ": "符号と指数は合うが、仮数部1100は暗黙の先頭の1を補うと1.1100となる。この指数で表す値は−14になる。",
      "ウ": "仮数部1000は合うが、指数部011はバイアス3を引くと0を表す。したがって値は−1.5となる。",
      "エ": "指数部011は指数0、仮数部1100は1.75を表す。この組合せは−12を表さない。",
      "オ": "指数部011では指数は0で、仮数部0110も12を正規化して得る1000と異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q28",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "IPv4のサブネットマスク",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "クラスBのIPアドレスで、サブネットマスクを16進法で表したものが FFFFFFC0 であるとき、利用可能なホスト数を10進法で表したものとして正しいのはどれか。",
    "choices": {
      "ア": "62",
      "イ": "63",
      "ウ": "64",
      "エ": "126",
      "オ": "127"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "マスクは末尾6ビットが0なのでホスト部は6ビットである。2⁶＝64からネットワークアドレスとブロードキャストアドレスを除くと62になる。",
    "choiceExplanations": {
      "ア": "マスクは末尾6ビットが0なのでホスト部は6ビットである。2⁶＝64からネットワークアドレスとブロードキャストアドレスを除くと62になる。",
      "イ": "63は64通りから一つだけを除いた数である。全ビット0のネットワークアドレスと全ビット1のブロードキャストアドレスの両方を外す。",
      "ウ": "ホスト部のビット列自体は64通りあるが、その全部がホストに使えるわけではない。予約された2アドレスを除く。",
      "エ": "126はホスト部が7ビットのときの利用可能数である。末尾のC0は11000000なので、0は6ビットである。",
      "オ": "127は7ビットのアドレスのうち一つだけを除いた数に当たる。このマスクのホスト部は6ビットで、除外するアドレスも2個である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q29",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "安定な挿入ソート",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次の関数insSortは、配列a内のn個の整数を安定な挿入ソートにより昇順に整列させるものである。㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\nvoid insSort(int a[], int n) {\n    int i, j, t;\n    for (i = 1; i < n; i++) {\n        t = a[i];\n        for (j = i - 1; j >= 0 && ［㋐］; j--) {\n            a[j + 1] = a[j];\n        }\n        ［㋑］ = t;\n    }\n}",
    "choices": {
      "ア": "a[j] > t ／ a[j + 1]",
      "イ": "a[j] > t ／ a[j]",
      "ウ": "a[j] > t ／ a[j − 1]",
      "エ": "a[j] >= t ／ a[j + 1]",
      "オ": "a[j] >= t ／ a[j]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "tより大きい要素だけを右に移すので、等しい値同士の順序は変わらない。ループ終了時のjの次の位置が空いているため、a[j＋1]にtを入れる。",
    "choiceExplanations": {
      "ア": "tより大きい要素だけを右に移すので、等しい値同士の順序は変わらない。ループ終了時のjの次の位置が空いているため、a[j＋1]にtを入れる。",
      "イ": "大きい要素だけを動かす条件は正しい。停止時のjはtより大きくない要素の位置か−1なので、そこへ直接代入してはいけない。",
      "ウ": "tを入れる位置は、最後に条件が成立しなかったjのすぐ右である。a[j−1]では既存の要素を上書きするか、範囲外に書き込む。",
      "エ": "挿入位置は正しいが、比較に等号を含めると同じ値を持つ先行要素も右に移動する。安定なソートに必要な順序が保たれない。",
      "オ": "等号を含めると等しい要素の相対順序が変わる。さらにjに代入すると、空いた位置j＋1に値を入れられない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q30",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "キューによるトポロジカルソート",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "タスクA～Fがあるとき、その依存関係が、図のような有向グラフで表されるとする（CはAとBに依存しているなど）。その処理順を求めるため、次のPythonスクリプトを使用したときに出力される結果として最も妥当なのはどれか。\n\ngraph = {\"A\": [\"C\", \"D\"], \"B\": [\"C\"], \"C\": [\"E\"], \"D\": [\"F\"], \"E\": [], \"F\": []}\nindegree = {u: 0 for u in graph}\nfor u in graph:\n    for v in graph[u]:\n        indegree[v] += 1\norder = []\nqueue = [u for u in indegree if indegree[u] == 0]\nwhile queue:\n    u = queue.pop(0)\n    order.append(u)\n    for v in graph[u]:\n        indegree[v] -= 1\n        if indegree[v] == 0:\n            queue.append(v)\nprint(order)",
    "choices": {
      "ア": "['A', 'B', 'C', 'D', 'E', 'F']",
      "イ": "['A', 'B', 'C', 'E', 'D', 'F']",
      "ウ": "['A', 'B', 'D', 'C', 'E', 'F']",
      "エ": "['A', 'B', 'D', 'F', 'C', 'E']",
      "オ": "['A', 'B', 'D', 'C', 'F', 'E']"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "初期キューはA、Bで、Aの処理でD、Bの処理でCが順に末尾に入る。続いてDからF、CからEが追加され、取り出し順はA、B、D、C、F、Eとなる。",
    "choiceExplanations": {
      "ア": "Aを取り出すとDの入次数は0になるが、CにはBからの辺が残る。Cがキューに入るのはBの処理後なので、DがCより先になる。",
      "イ": "Eが可能になるのはCの処理後である。DはAの直後にキュー入りしているので、CとEよりも先に処理される。",
      "ウ": "A、B、D、Cまでは合う。Dが先に処理されFが先にキューに入るので、EよりもFが先になる。",
      "エ": "Dを処理するとFが末尾に入るが、その時点でCはすでにキューにある。先入れ先出しのためFがCを追い越すことはない。",
      "オ": "初期キューはA、Bで、Aの処理でD、Bの処理でCが順に末尾に入る。続いてDからF、CからEが追加され、取り出し順はA、B、D、C、F、Eとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q30.webp"
    ],
    "imageAltTexts": [
      "タスクA～Fの依存関係を示す有向グラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q31",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "UMLの構造図と振る舞い図",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "ソフトウェアの振る舞いを記述するために用いるのが妥当でないのは次のうちではどれか。",
    "choices": {
      "ア": "アクティビティ図",
      "イ": "クラス図",
      "ウ": "コミュニケーション図",
      "エ": "シーケンス図",
      "オ": "ステートマシン図"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "クラス図はクラスの属性や操作、クラス間の関連や継承など、システムの静的な構造を示す。振る舞いを表す図には分類されない。",
    "choiceExplanations": {
      "ア": "アクティビティ図は処理の順序や分岐、並行処理を表す。ワークフローや処理手順などの振る舞いに用いられる。",
      "イ": "クラス図はクラスの属性や操作、クラス間の関連や継承など、システムの静的な構造を示す。振る舞いを表す図には分類されない。",
      "ウ": "コミュニケーション図はオブジェクト間の関係に沿って、どのようなメッセージがやり取りされるかを表す相互作用図である。",
      "エ": "シーケンス図は、オブジェクトなどの間のメッセージの順序を時間軸に沿って記述する。振る舞いを表現する用途に当てはまる。",
      "オ": "ステートマシン図は、イベントに応じてオブジェクトなどがある状態から別の状態に移る様子を表す。状態に依存する振る舞いを記述できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q32",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "TLSの鍵交換・認証・暗号化",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "インターネットにおける通信の安全性を保つために用いられるTLSでは、まず、サーバ・クライアント間で鍵交換及びサーバ認証が行われ、次に、アプリケーションデータの暗号化通信が行われる。TLSに関する次の記述の㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　鍵交換には、一般に、楕円曲線DH鍵交換方式や、RSA暗号などの公開鍵暗号が用いられるが、秘密鍵が後に漏えいし得ることを考慮すると、楕円曲線DH鍵交換方式を用いる方が安全性が高い。\n㋑　サーバ認証には、一般に、PKIが用いられる。この場合、サーバはあらかじめ証明書を発行しなければならない。\n㋒　アプリケーションデータの暗号化通信においては、鍵交換で定まった鍵を用いた暗号化によってデータの秘匿性を検出し、また、デジタル署名によってデータの改ざんを検出する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "一時鍵を使う楕円曲線DH鍵交換では、認証の長期秘密鍵が後に漏れても過去の通信のセッション鍵を復元しにくい。この性質を前方秘匿性という。",
    "choiceExplanations": {
      "ア": "一時鍵を使う楕円曲線DH鍵交換では、認証の長期秘密鍵が後に漏れても過去の通信のセッション鍵を復元しにくい。この性質を前方秘匿性という。",
      "イ": "㋐は一時鍵を使う鍵交換について妥当である。公開鍵基盤でサーバの証明書を発行するのは、通常は認証局である。",
      "ウ": "サーバは認証局が発行した証明書をクライアントに提示する。証明書の発行主体と、その証明書を使うサーバを区別する必要がある。",
      "エ": "㋑は証明書の発行主体が誤っている。㋒も暗号化の役割は秘匿性の確保であり、TLSのデータの改ざん検出に主に用いるのは認証付き暗号やMACである。",
      "オ": "データを暗号化する目的は第三者に内容を読ませないことである。TLSのアプリケーションデータは通常、レコードごとのデジタル署名によって改ざんを検出するわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q33",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "ネットワークセキュリティの用語",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "ネットワークセキュリティに関する次の記述のうち、妥当でないのはどれか。",
    "choices": {
      "ア": "クロスサイトスクリプティングとは、悪意のあるスクリプトをサーバ側に実行させることにより、クライアント側の情報漏えいやサイトの改ざんを誘発する攻撃である。",
      "イ": "リフレクション攻撃とは、DDoS攻撃の一種であり、送信元IPアドレスを攻撃対象のIPアドレスに偽装したリクエストを多数のサーバなどに送信することで、攻撃対象に応答を集中させるものである。",
      "ウ": "パスワードリスト攻撃とは、漏えいしたIDとパスワードのリストを用いて、別のサービスへの不正ログインを試みるものである。",
      "エ": "バッファオーバーフローとは、サーバが用意している入力用バッファを超えるサイズの入力を与えることで、想定外の動きをさせる攻撃である。",
      "オ": "ドライブバイダウンロードとは、悪意のあるウェブサイトを閲覧しただけで、マルウェアが閲覧者自身のコンピュータにダウンロードされる攻撃である。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "クロスサイトスクリプティングでスクリプトが実行されるのは、典型的には利用者のブラウザ側である。サーバ側で実行させるという説明が誤っている。",
    "choiceExplanations": {
      "ア": "クロスサイトスクリプティングでスクリプトが実行されるのは、典型的には利用者のブラウザ側である。サーバ側で実行させるという説明が誤っている。",
      "イ": "リフレクション攻撃では第三者のサーバなどが返す応答が標的に集中し、通信量が増える。応答が第三者を経由する点が特徴である。",
      "ウ": "パスワードリスト攻撃は、既に漏えいした認証情報が別のサービスでも使い回されていることを狙う。サービスごとに異なるパスワードを使うことが対策になる。",
      "エ": "バッファオーバーフローは確保された領域の外までデータが書かれ、隣接したメモリの内容などに影響する現象である。境界を確認する処理が重要となる。",
      "オ": "ドライブバイダウンロードは、利用者が意図してファイルを選ばなくても、ページを表示したことを契機に不正なファイルが取得される点が特徴である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q34",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "基盤モデルと事前学習",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "次の記述を全て満たす人工知能モデルの名称として最も妥当なのはどれか。\n\n・タスクごとに独自のモデルをつくるのではなく巨大で汎用的な基盤を作り、それを各応用に適応させるという、2021年に提唱された汎用的人工知能の概念モデルで、具体的なアーキテクチャや手法の名前ではない。\n・非常に大規模なデータを用いて、自己教師あり学習によって事前学習（pretraining）されている。\n・少量の追加データや自然言語プロンプトで、多様でクロスモーダルな下流タスク（翻訳、要約、画像生成、コード生成など）に転用することができる。\n・非常に大規模なデータを利用し、計算コストが大きいので、開発できるのは主に大企業や巨大研究施設で、データの偏りによるバイアスや偽情報を生成するような倫理性や安全性のリスクがある。",
    "choices": {
      "ア": "large language models",
      "イ": "diffusion models",
      "ウ": "transformer models",
      "エ": "multimodal models",
      "オ": "foundation models"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "基盤モデルは大規模なデータで事前学習し、個々の用途に適応できる汎用的な基盤をいう。特定のモデル構造や生成手法に限定されない。",
    "choiceExplanations": {
      "ア": "大規模言語モデルは言語データを主に扱う。言語以外も含む多様な用途に共通する事前学習基盤を指す名称は基盤モデルである。",
      "イ": "拡散モデルはノイズからデータを生成する具体的な手法に基づく。手法を問わず、大規模な事前学習済みの基盤をいう名称ではない。",
      "ウ": "Transformerはアテンション機構を使う特定のアーキテクチャである。問題文にある、アーキテクチャを指定しない概念には当たらない。",
      "エ": "マルチモーダルモデルは複数種類のデータを扱うモデルを指す。規模や自己教師ありの事前学習、さまざまな下流用途への適応は定義に含まれない。",
      "オ": "基盤モデルは大規模なデータで事前学習し、個々の用途に適応できる汎用的な基盤をいう。特定のモデル構造や生成手法に限定されない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q35",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "RGBからYCbCrへの変換",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "赤の成分（R）、緑の成分（G）、及び青の成分（B）で色を表すRGB色空間から、輝度の成分（Y）と二つの色差（Cb、Cr）で色を表すYCbCr色空間への変換は、ある行列Xを用いて（Y, Cb, Cr）ᵀ＝X（R, G, B）ᵀと表せる。Xとして最も妥当なのはどれか。",
    "choices": {
      "ア": "［0.114, 0.299, 0.587；0.5, −0.169, −0.331；−0.813, 0.5, −0.419］",
      "イ": "［0.114, 0.587, 0.299；0.5, −0.331, −0.169；−0.813, −0.419, 0.5］",
      "ウ": "［0.299, 0.144, 0.587；−0.169, 0.5, −0.331；0.5, −0.813, −0.419］",
      "エ": "［0.299, 0.587, 0.114；−0.169, −0.331, 0.5；0.5, −0.419, −0.081］",
      "オ": "［0.587, 0.144, 0.299；−0.331, 0.5, −0.169；−0.419, −0.813, 0.5］"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "この変換では輝度への係数がR、G、Bの順に0.299、0.587、0.114となる。Cbは青との差、Crは赤との差を表すので、第2行はB、第3行はRの係数が0.5になる。",
    "choiceExplanations": {
      "ア": "輝度Yでは緑に最大の係数0.587が掛かる。この行列は青に最大の係数を掛け、CbとCrの構成も標準的な青と赤の色差に対応していない。",
      "イ": "緑の係数が最大である点は合うが、赤の係数は青より大きい。またCbの正の係数は青、Crの正の係数は赤に対応する。",
      "ウ": "緑よりも青に大きな重みを置いている。さらに第2行で正の係数0.5を緑に掛けており、青に基づく色差Cbとして適切ではない。",
      "エ": "この変換では輝度への係数がR、G、Bの順に0.299、0.587、0.114となる。Cbは青との差、Crは赤との差を表すので、第2行はB、第3行はRの係数が0.5になる。",
      "オ": "輝度に掛かる最大の係数は赤ではなく緑である。また、青に対応する第2行の係数が負になっており、Cbの符号が合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q36",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "二値分類の評価指標",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "二値分類の予測の指標に関する次の記述のうち、妥当でないのはどれか。",
    "choices": {
      "ア": "100枚の紙幣のうち、99枚の真贋を正しく判定できた場合、正解率（accuracy）は99％である。",
      "イ": "迷惑メール判定ソフトが迷惑メールと予測したメールのうち、実際に迷惑メールであったものの割合が適合率（precision）である。",
      "ウ": "病気の検出システムが、実際に病気である患者のうち、陽性と正しく予測できた割合が再現率（recall）である。",
      "エ": "正解率（accuracy）と再現率（recall）はトレードオフの関係にあり、両方とも高くすることはできない。",
      "オ": "陽性のデータが非常に少ないなど、データセットに極端な偏りがある場合、正解率（accuracy）だけでは二値分類モデルの性能を正確に評価できない。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "正解率と再現率は同時に高くできる。例えば偽陽性と偽陰性がともに0で陽性例が存在すれば、正解率も再現率も100％になる。",
    "choiceExplanations": {
      "ア": "正解率は全件数に占める正しい判定の割合である。真と偽のいずれも正しく判定した件数に含め、99／100＝99％となる。",
      "イ": "適合率の分母は迷惑メールと予測した件数である。その中で実際にも迷惑メールだった件数を分子とするので、この説明は妥当である。",
      "ウ": "再現率は実際の陽性をどれだけ取りこぼさなかったかを示す。実際に病気の患者を分母とし、正しく陽性とした患者を分子とする。",
      "エ": "正解率と再現率は同時に高くできる。例えば偽陽性と偽陰性がともに0で陽性例が存在すれば、正解率も再現率も100％になる。",
      "オ": "陽性が少ないと、すべて陰性と予測しても高い正解率になる場合がある。陽性の検出も評価するには再現率や適合率などを併用する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q37",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "ガボールフィルタの方向選択性",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "図IIの（a）～（d）のそれぞれの画像は、図Iのような入力画像に対して、図IIIに示す二次元ガボールフィルタ㋐～㋔のうちいずれか一つをかけたときに得られたものである。このとき、フィルタとして使用されなかったのはどれか。ただし、白の画素は大きな画素値、黒の画素は小さな画素値を表しているとする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋑",
      "ウ": "㋒",
      "エ": "㋓",
      "オ": "㋔"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋔の帯は水平方向に延びており、縦方向の濃淡の変化を強調する。図IIの4画像にはこの水平方向の強調に対応する出力がない。",
    "choiceExplanations": {
      "ア": "㋐の明暗の帯は縦方向に延び、横方向の濃淡変化に反応する。図II（a）の右端など、縦に伸びる構造が強く出ている。",
      "イ": "㋑は斜め方向の明暗の変化に反応する小さなフィルタである。図IIの斜めの建物の輪郭や細かなパターンを強調した出力に対応する。",
      "ウ": "㋒は斜めの帯がより広い範囲に延びるフィルタである。図II（d）のように、斜めの輪郭を太い応答として捉えた出力と対応する。",
      "エ": "㋓も㋑とは異なる向きの斜めの構造を拾う。図IIには、建物の斜めの稜線のうち異なる側が強く出た細かな応答がある。",
      "オ": "㋔の帯は水平方向に延びており、縦方向の濃淡の変化を強調する。図IIの4画像にはこの水平方向の強調に対応する出力がない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q37.webp"
    ],
    "imageAltTexts": [
      "図Iの入力画像、図IIの4種類の処理結果、および図IIIの5種類のガボールフィルタ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q38",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "部分空間の次元公式",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "aを実数とし、ℝ³の実線形部分空間であって、（1, 0, 5）ᵀ、（2, 1, −3）ᵀの生成するものをV、（1, 0, a＋5）ᵀ、（0, 1, 7a−13）ᵀ、（−5, 3, a²）ᵀの生成するものをWとする。V∩Wの次元が1であり、V＋W＝ℝ³であるとき、Wの次元dim W及びaの値の組合せとして正しいのはどれか。ただし、V＋W＝｛v＋w∈ℝ³｜v∈V、w∈W｝とする。",
    "choices": {
      "ア": "（2, −11）",
      "イ": "（2, 0）",
      "ウ": "（2, 8）",
      "エ": "（3, −5）",
      "オ": "（3, 0）"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "dim V＝2なので次元公式より3＝2＋dim W−1、すなわちdim W＝2である。第三のベクトルが最初の二つの−5倍と3倍の和で表せる条件はa²＝16a−64で、a＝8となる。",
    "choiceExplanations": {
      "ア": "次元2は妥当だが、a＝−11ではWの第3ベクトルは最初の二つの線形結合で表せない。その場合は実際にはWの次元が3になる。",
      "イ": "a＝0のとき、最初の二つで第1、第2成分を−5、3にそろえると、第3成分は−64になる。第3ベクトルの第3成分0とは異なる。",
      "ウ": "dim V＝2なので次元公式より3＝2＋dim W−1、すなわちdim W＝2である。第三のベクトルが最初の二つの−5倍と3倍の和で表せる条件はa²＝16a−64で、a＝8となる。",
      "エ": "Wの次元が3ならW＝ℝ³となり、そのVとの共通部分はVなので次元は2になる。共通部分の次元が1という条件を満たさない。",
      "オ": "a＝0でWの次元が3だと、V全体がWに含まれる。したがってV∩Wの次元が1にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q39",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "基底と線形写像の表現行列",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "線形写像 f：ℝ⁴→ℝ² を f（（1, 1, 1, 1）ᵀ）＝（37, 10）ᵀ、f（（1, 1, 1, 0）ᵀ）＝（22, 4）ᵀ、f（（1, 1, 0, 1）ᵀ）＝（32, 8）ᵀ、f（（1, 0, 1, 1）ᵀ）＝（30, 10）ᵀで定義する。このとき、ℝ²の基底｛（1, 1）ᵀ、（1, 0）ᵀ｝とℝ⁴の標準基底に関する線形写像fの表現行列の（2, 1）成分はいくらか。",
    "choices": {
      "ア": "2",
      "イ": "4",
      "ウ": "6",
      "エ": "8",
      "オ": "10"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各ベクトルの差からf（e₄）＝（15, 6）、f（e₃）＝（5, 2）、f（e₂）＝（7, 0）であり、f（e₁）＝（10, 2）になる。これは（1, 1）の2倍と（1, 0）の8倍の和なので、第2行第1列は8である。",
    "choiceExplanations": {
      "ア": "2はf（e₁）の第2成分であり、指定された基底における第1係数である。求める第2係数は第1成分10との差の8となる。",
      "イ": "行列の第1列は標準基底の最初のベクトルe₁の像を表す。像（10, 2）を指定の基底で表示すると、係数の第2成分は4ではない。",
      "ウ": "6はf（e₄）の通常の第2成分に当たるが、求めるのは第1列である。f（e₁）を基底に沿って分解する必要がある。",
      "エ": "各ベクトルの差からf（e₄）＝（15, 6）、f（e₃）＝（5, 2）、f（e₂）＝（7, 0）であり、f（e₁）＝（10, 2）になる。これは（1, 1）の2倍と（1, 0）の8倍の和なので、第2行第1列は8である。",
      "オ": "10はf（e₁）の標準座標での第1成分である。指定の第1基底ベクトルがそのうち2を担うので、第2基底ベクトルの係数は8となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q40",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "行列式の余因子展開",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "4次正方行列 A＝［0, 0, 0, −1；−sin θ, 1／tan θ, 1, cos θ；cos θ, −1, tan θ, −sin θ；1, 1／cos θ, −1／sin θ, tan θ］（0＜θ＜π／2）の行列式det Aと等しいのは次のうちではどれか。",
    "choices": {
      "ア": "4／（sin 2θ）²",
      "イ": "−4／（sin 2θ）²",
      "ウ": "4 cos 2θ／（sin 2θ）²",
      "エ": "−4 cos 2θ／（sin 2θ）²",
      "オ": "0"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "第1行で余因子展開すると符号が相殺され、左下の3×3部分の行列式になる。s＝sin θ、c＝cos θとするとその値は（s²＋c²）²／（s²c²）＝4／（sin 2θ）²である。",
    "choiceExplanations": {
      "ア": "第1行で余因子展開すると符号が相殺され、左下の3×3部分の行列式になる。s＝sin θ、c＝cos θとするとその値は（s²＋c²）²／（s²c²）＝4／（sin 2θ）²である。",
      "イ": "第1行第4列の要素−1と余因子の符号（−1）⁵を掛けると正になる。そのため全体の行列式に負号は付かない。",
      "ウ": "3×3の行列式の分子は（sin² θ＋cos² θ）²である。差から生じるcos 2θの因子は含まれない。",
      "エ": "第1行の展開における負号は相殺される。さらに分子は三角関数の二乗の和から得られるため、cos 2θで符号が変わらない。",
      "オ": "例えばθ＝π／4なら、余因子展開した3×3行列式は4になる。指定範囲ではsin θ、cos θがともに正なので常に非零である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q41",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "立方体を保つ線形変換",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "a、b、cを実数とし、次の行列Aが f（v）＝Av（v∈ℝ³）によって定めるユークリッド空間ℝ³上の線形変換fを考える。\n\nA＝［a＋1, √3, c；b−3, （b−5）√3, c；2, （a＋4）√3, c］\n\nℝ³内の8点（p, q, r）ᵀ（p、q、r＝0、1）を頂点とする立方体のfによる像が、再びℝ³内の立方体となるとき、aはいくらか。",
    "choices": {
      "ア": "−8",
      "イ": "−4",
      "ウ": "−3",
      "エ": "−1",
      "オ": "3"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "立方体の辺に対応する3列は互いに直交し、長さが等しい。第3列との直交よりb＝−a、第1・第2列の直交より（a＋3）（a＋8）＝0となり、二つの列の長さが等しいのはa＝−8の方である。",
    "choiceExplanations": {
      "ア": "立方体の辺に対応する3列は互いに直交し、長さが等しい。第3列との直交よりb＝−a、第1・第2列の直交より（a＋3）（a＋8）＝0となり、二つの列の長さが等しいのはa＝−8の方である。",
      "イ": "cは0ではなく、第3列との直交からb＝−aとなる。a＝−4をこの条件で代入すると第1、第2列の内積が0にならない。",
      "ウ": "a＝−3では第1、第2列は直交するが、長さの二乗はそれぞれ8、18である。像の辺の長さがそろわない。",
      "エ": "第1、第3列の直交からb＝−aとすると、第1、第2列の内積は√3（a＋3）（a＋8）となる。a＝−1ではこれが0でない。",
      "オ": "a＝3なら第3列との直交に必要なb＝−3を入れても、第1列と第2列が直交しない。したがって像を立方体にできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q42",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "三角関数のテイラー展開",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "0＜x＜π／2で定義された関数 f（x）＝√（1＋sin 2x）をx＝π／4のまわりでテイラー展開したとき、（x−π／4）⁴の係数はいくらか。",
    "choices": {
      "ア": "√2／6",
      "イ": "√2／24",
      "ウ": "0",
      "エ": "−√2／24",
      "オ": "−√2／6"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "h＝x−π／4とすると、1＋sin 2x＝1＋cos 2h＝2 cos² hである。この範囲でcos h＞0なので、√2 cos hの4次項の係数は√2／4！＝√2／24となる。",
    "choiceExplanations": {
      "ア": "余弦の4次項の分母は3！ではなく4！である。√2を掛けると√2／24となる。",
      "イ": "h＝x−π／4とすると、1＋sin 2x＝1＋cos 2h＝2 cos² hである。この範囲でcos h＞0なので、√2 cos hの4次項の係数は√2／4！＝√2／24となる。",
      "ウ": "中心の周りで偶関数になるため消えるのは奇数次の係数である。4次は偶数次なので係数は0にならない。",
      "エ": "余弦の展開は1−h²／2！＋h⁴／4！と符号が交替する。4次項は正なので、−√2／24にはならない。",
      "オ": "√2 cos hの4次項は正で、分母は4！である。この選択肢は符号と分母のいずれも一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q43",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "リーマン和と円の面積",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "極限値 lim（n→∞）［（1／n²）∑（k＝1～n）√（n²−k²）］はいくらか。",
    "choices": {
      "ア": "logₑ 2",
      "イ": "1−logₑ 2",
      "ウ": "π／4",
      "エ": "1",
      "オ": "π／2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各項を（1／n）√（1−（k／n）²）と書くと、［0, 1］でのリーマン和である。求める積分は半径1の円の4分の1の面積でπ／4となる。",
    "choiceExplanations": {
      "ア": "平方根からnをくくり出すと、和は√（1−x²）のリーマン和になる。被積分関数は円弧を表し、ここでは対数で積分を評価する形ではない。",
      "イ": "リーマン和が表すのは第1象限の単位円の面積である。区間［0, 1］の円弧の下側は1−logₑ 2にはならない。",
      "ウ": "各項を（1／n）√（1−（k／n）²）と書くと、［0, 1］でのリーマン和である。求める積分は半径1の円の4分の1の面積でπ／4となる。",
      "エ": "区間の幅は1で被積分関数は1以下だが、区間の内部では1より小さい。したがって面積が単位正方形の1に等しくなることはない。",
      "オ": "π／2は単位半円の面積に当たる。この和はxが0から1まで、yが0以上の領域だけを対象としている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q44",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "フィボナッチ数列と収束半径",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の式により定義される数列｛Fₙ｝はフィボナッチ数列と呼ばれている。\n\nF₀＝0、F₁＝1、Fₙ₊₂＝Fₙ₊₁＋Fₙ（n≧0）\n\nこのとき、整級数∑（n＝0～∞）Fₙxⁿの収束半径はいくらか。なお、必要であれば、フィボナッチ数列｛Fₙ｝の一般項は Fₙ＝（1／√5）｛［（1＋√5）／2］ⁿ−［（1−√5）／2］ⁿ｝と表されることを用いてよい。",
    "choices": {
      "ア": "（5−√5）／10",
      "イ": "（3−√5）／2",
      "ウ": "（√5−1）／2",
      "エ": "（5＋√5）／10",
      "オ": "（1＋√5）／2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一般項では（1＋√5）／2の累乗が支配的なので、Fₙのn乗根は（1＋√5）／2に収束する。その逆数を有理化すると（√5−1）／2である。",
    "choiceExplanations": {
      "ア": "一般項の係数1／√5は、n乗根を取ると極限で1になる。収束半径を求める際には指数的な増加率だけを用いる。",
      "イ": "この数は収束半径（√5−1）／2を二乗した値である。係数Fₙのn乗根の極限の逆数を一度取ればよい。",
      "ウ": "一般項では（1＋√5）／2の累乗が支配的なので、Fₙのn乗根は（1＋√5）／2に収束する。その逆数を有理化すると（√5−1）／2である。",
      "エ": "一般項の前に掛かる定数は収束半径を変えない。大きい方の指数の底の逆数を取ると、（5＋√5）／10にはならない。",
      "オ": "これはFₙのn乗根の極限である。整級数の収束半径は増加率そのものではなく、その逆数となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q45",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "多項分布と条件付き確率",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある部署では、各営業日において、業務A、B、Cのうちの1つのみが、それぞれ確率1／2、1／3、1／6で発生する。この部署に新規に配属された職員が、配属後6営業日目までは、毎日上司の指導を受けつつ、この部署での業務に携わる。A、B、Cの個々の業務について、上司の指導の下で通算して2営業日以上経験した場合に限り、その業務を単独で遂行できる。このとき、配属後7営業日目に業務を単独で遂行できる確率pは、最初の6営業日の間に発生した業務の履歴に依存する確率変数とみなせる。事象｛p＞3／5｝の確率P（p＞3／5）はいくらか。ただし、各営業日に発生する業務の種類は、他の営業日に発生する業務の種類とは独立であるとする。また、各業務は発生した日のうちに終了するものとする。",
    "choices": {
      "ア": "25／96",
      "イ": "31／96",
      "ウ": "25／64",
      "エ": "25／48",
      "オ": "65／96"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Aの経験が2回以上となる確率は57／64である。そこからB、Cの経験がともに1回以下となる組（A、B、C）＝（6, 0, 0）、（5, 1, 0）、（5, 0, 1）、（4, 1, 1）の確率41／192を引くと、65／96となる。",
    "choiceExplanations": {
      "ア": "AとBを習得するとp＝5／6以上になる。AとCを習得した場合もp＝2／3以上なので、両方の場合を数える必要がある。",
      "イ": "BとCだけを習得した場合のpは1／2で、閾値を超えない。数えるのはAを2回以上経験し、BかCも2回以上経験する場合である。",
      "ウ": "Aを2回以上経験しても、B、Cがともに1回以下ならp＝1／2にとどまる。この除外分も含めて発生回数の組合せを数えると25／64にはならない。",
      "エ": "AとBを習得する場合に加え、Bを習得していなくてもAとCを習得すればよい。この場合を加えた確率は25／48を上回る。",
      "オ": "Aの経験が2回以上となる確率は57／64である。そこからB、Cの経験がともに1回以下となる組（A、B、C）＝（6, 0, 0）、（5, 1, 0）、（5, 0, 1）、（4, 1, 1）の確率41／192を引くと、65／96となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q46",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "数学モデル",
    "topicTags": [
      "グラフ上のランダムウォーク",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のようなv₁～v₄を頂点としてもつグラフの下で、隣接している頂点のいずれかに遷移するランダムウォークを考える。ここで、各頂点におけるそれぞれの隣接頂点への遷移確率は、隣接している頂点数の逆数とする。v₁から遷移を始めるとして、4回の遷移後にv₂、v₄に到達する確率をそれぞれp₂、p₄とするとき、p₂、p₄の値の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "（5／24, 1／18）",
      "イ": "（11／36, 2／9）",
      "ウ": "（197／864, 19／216）",
      "エ": "（1／4, 1／4）",
      "オ": "（121／432, 19／108）"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "3回後の（v₁、v₂、v₃、v₄）の分布は（1／6, 11／36, 11／36, 2／9）である。4回目にv₂にはv₁から1／3、v₃から1／2で移り、v₄にはv₁からだけ1／3で移るので（5／24, 1／18）となる。",
    "choiceExplanations": {
      "ア": "3回後の（v₁、v₂、v₃、v₄）の分布は（1／6, 11／36, 11／36, 2／9）である。4回目にv₂にはv₁から1／3、v₃から1／2で移り、v₄にはv₁からだけ1／3で移るので（5／24, 1／18）となる。",
      "イ": "これは3回後のv₂、v₄にいる確率に当たる。問題ではさらに1回遷移した時点の値を求める。",
      "ウ": "v₄にはv₁からしか移れないので、4回目にv₄に着く確率は3回後のv₁の確率1／6を3で割る。19／216にはならない。",
      "エ": "v₁の隣接先は3つ、v₂とv₃の隣接先は2つ、v₄の隣接先は1つで、次の位置への確率が一様ではない。4回後の分布も一様ではない。",
      "オ": "19／108は4回後のv₁の確率19／36をさらに3で割った値で、5回後にv₄にいる確率に当たる。4回後のp₄は1／18である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q46.webp"
    ],
    "imageAltTexts": [
      "v₁～v₄を頂点とする無向グラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q47",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "オペレーションズ・リサーチ",
    "topicTags": [
      "線形計画の双対性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の線形計画問題の双対問題として正しいのはどれか。\n\nmaximize 4x₁＋3x₂＋5x₃\nsubject to x₁＋2x₂＋3x₃≦6、6x₁−5x₂＋4x₃≦1、x₁、x₂、x₃≧0",
    "choices": {
      "ア": "minimize 4y₁＋3y₂＋5y₃\nsubject to y₁＋2y₂＋3y₃≧6、6y₁−5y₂＋4y₃≧1、y₁、y₂、y₃≧0",
      "イ": "minimize −6y₁−y₂\nsubject to y₁＋6y₂≧4、2y₁−5y₂≧3、3y₁＋4y₂≧5、y₁、y₂≧0",
      "ウ": "minimize −6y₁−y₂\nsubject to −y₁−6y₂≧4、−2y₁＋5y₂≧3、−3y₁−4y₂≧5、y₁、y₂≧0",
      "エ": "minimize 6y₁＋y₂\nsubject to −y₁−6y₂≧4、−2y₁＋5y₂≧3、−3y₁−4y₂≧5、y₁、y₂≧0",
      "オ": "minimize 6y₁＋y₂\nsubject to y₁＋6y₂≧4、2y₁−5y₂≧3、3y₁＋4y₂≧5、y₁、y₂≧0"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "max｛cᵀx｜Ax≦b、x≧0｝の双対はmin｛bᵀy｜Aᵀy≧c、y≧0｝である。b＝（6, 1）ᵀを目的に用い、転置した行列の三つの条件を置いたこの選択肢が当てはまる。",
    "choiceExplanations": {
      "ア": "双対変数は元の二つの制約に一つずつ対応する。主問題と同じ3変数・2制約の形は双対問題にならない。",
      "イ": "転置された制約は合っているが、双対目的関数の係数は主問題の制約の右辺6、1である。負号を付けると別の問題となる。",
      "ウ": "主問題の制約行列を転置する際に符号は反転させない。目的関数の係数にも負号は付かない。",
      "エ": "目的関数は妥当だが、制約の左辺は元の制約行列の転置であり、各係数を負にしてはならない。",
      "オ": "max｛cᵀx｜Ax≦b、x≧0｝の双対はmin｛bᵀy｜Aᵀy≧c、y≧0｝である。b＝（6, 1）ᵀを目的に用い、転置した行列の三つの条件を置いたこの選択肢が当てはまる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q48",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "オペレーションズ・リサーチ",
    "topicTags": [
      "停留点と局所最小",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の最小化問題の局所的最適解のうち、目的関数の値が正であるものはいくつあるか。\n\nminimize e^(x²＋y²)−2x²−y²−1\n\nただし、x、yは実数変数とする。",
    "choices": {
      "ア": "0個",
      "イ": "1個",
      "ウ": "2個",
      "エ": "3個",
      "オ": "4個"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "偏微分がともに0の点は原点と（±√ln 2, 0）である。原点は鞍点で、残る二つの局所最小値はどちらも1−2 ln 2＜0であり、正のものはない。",
    "choiceExplanations": {
      "ア": "偏微分がともに0の点は原点と（±√ln 2, 0）である。原点は鞍点で、残る二つの局所最小値はどちらも1−2 ln 2＜0であり、正のものはない。",
      "イ": "y方向に対称なだけでなくxを−xにしても値が等しい。唯一の対称な候補である原点は、x軸方向に近づくと値が下がるので局所最小ではない。",
      "ウ": "（±√ln 2, 0）は二つの局所最小点だが、両方の目的関数値は1−2 ln 2で負である。正の値を取る点としては数えない。",
      "エ": "停留点は三つあるが、原点は鞍点である。また、二つの局所最小点の目的関数値はいずれも正ではない。",
      "オ": "局所最小には偏微分が0であることが必要であり、その条件を満たす点は三つしかない。このうち正の値を取る局所最小点はない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q49",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "経営工学",
    "topicTags": [
      "作業工程のクリティカルパス",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の作業工程表で定められた、作業A～Mによって構成されるプロジェクトを考える。このプロジェクトの全工程を完了させるための最小所要時間はいくらか。",
    "choices": {
      "ア": "70分",
      "イ": "110分",
      "ウ": "120分",
      "エ": "160分",
      "オ": "410分"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各作業を先行作業がすべて終了した時点で始めると、Lの最早終了は110分、Iは90分、Mは120分である。最長の経路C→G→J→Mが全体の最小所要時間を決める。",
    "choiceExplanations": {
      "ア": "BからEに至るだけでも20＋80＝100分を要する。70分ではEに依存するLも、プロジェクト全体も終えられない。",
      "イ": "LはBからEを経て110分で終わるが、これとは別にC、G、J、Mの順で進む工程に120分を要する。",
      "ウ": "各作業を先行作業がすべて終了した時点で始めると、Lの最早終了は110分、Iは90分、Mは120分である。最長の経路C→G→J→Mが全体の最小所要時間を決める。",
      "エ": "Gの前にはCとDの両方が終わる必要があるが、CとDは並行できる。先行作業の時間をすべて足すのではなく、遅い方の終了時刻を使う。",
      "オ": "先行関係で結ばれていない作業は並行して行える。全作業の所要時間を単純に足すと、プロジェクトを終える最短時間を過大に見積もる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q49.webp"
    ],
    "imageAltTexts": [
      "作業A～Mの所要時間と先行作業の工程表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q50",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "経営工学",
    "topicTags": [
      "巡回セールスマン問題の定式化",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "頂点集合V＝｛1, 2, …, n｝と枝集合E＝｛（i, j）∈V²｜i≠j｝に対して、各頂点i、j間の距離がdᵢⱼ（＞0）で与えられているとする。ある頂点から出発し、全ての頂点を一度だけ通りながら元の頂点に戻ってくる巡回路のうち、巡回路の長さが最小であるものを求めるために、次の整数計画問題を解くことを考える。この問題の制約条件Aとして最も妥当なのはどれか。\n\nただし、各（i, j）∈Eについてxᵢⱼを決定変数とし、頂点iからその直後に頂点jに向かうならばxᵢⱼ＝1、そうでないときxᵢⱼ＝0とする。\n\nminimize ∑（（i, j）∈E）dᵢⱼxᵢⱼ\nsubject to xᵢⱼ∈｛0, 1｝（すべての（i, j）∈E）\n∑（i∈S）∑（j∈V＼S）xᵢⱼ≧1（すべての空でない真部分集合S⊂V）\n∑（j∈V＼｛i｝）xᵢⱼ＝1（すべてのi∈V）\n［A］",
    "choices": {
      "ア": "∑（i∈V＼｛j｝）xᵢⱼ＝1（すべてのj∈V）",
      "イ": "∑（i∈V＼｛j｝）xⱼᵢ＝1（すべてのj∈V）",
      "ウ": "∑（i∈V＼｛j｝）xᵢⱼ≧1（すべてのj∈V）",
      "エ": "xᵢⱼ＋xⱼᵢ≦1（すべての（i, j）∈E）",
      "オ": "∑（（i, j）∈E）xᵢⱼ≦｜S｜−1（すべての空でない真部分集合S⊂V）"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "jを固定し、着点jへの枝を始点iについて合計すると入次数になる。入次数をちょうど1と明示することで、各頂点に一度だけ入る巡回路の条件を直接表せる。",
    "choiceExplanations": {
      "ア": "jを固定し、着点jへの枝を始点iについて合計すると入次数になる。入次数をちょうど1と明示することで、各頂点に一度だけ入る巡回路の条件を直接表せる。",
      "イ": "添字がxⱼᵢでjを固定するので、入る枝ではなくjから出る枝を数える。既出の出次数の条件を繰り返している。",
      "ウ": "各頂点への入次数を少なくとも1とする式である。既出の出次数制約と組み合わせれば入次数の合計はnなので等号になるが、公式正答は各頂点への到着がちょうど1回と直接明示する式を採っている。",
      "エ": "反対方向の2枝を同時に選ぶことを禁じる式である。個々の頂点への入次数を1と表す式ではない。",
      "オ": "左辺はS内の枝だけでなく、選んだ全枝を数える。この合計は既出条件からnとなるので、真部分集合に対する右辺｜S｜−1以下にはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q51",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "制御工学",
    "topicTags": [
      "共振と時間応答",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "伝達関数が H（s）＝1／（s²＋1）のシステムに、入力u（t）＝sin（t）を加えて、十分時間が経過したときの出力の挙動に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "ゼロに収束する。",
      "イ": "有界振幅の周期信号になる。",
      "ウ": "正に発散する。",
      "エ": "負に発散する。",
      "オ": "正負の値を取りながら発散する。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "入力のラプラス変換は1／（s²＋1）なので、出力の変換は1／（s²＋1）²となる。時間応答は（sin t−t cos t）／2で、符号を交互に変えながら振幅が増える。",
    "choiceExplanations": {
      "ア": "系の固有角周波数と入力の角周波数がともに1となる。この共振では振動の振幅が時間とともに増え、ゼロに収束しない。",
      "イ": "入力自体の振幅は一定だが、減衰のない系に同じ固有角周波数の入力を重ねると共振する。出力には振幅が増える項が現れる。",
      "ウ": "大きくなる項は時間に比例する振幅とcos tとの積である。cos tが符号を変えるので、出力が正の方向だけに発散するわけではない。",
      "エ": "時間とともに増える振動項は正負を繰り返す。出力が負の方向だけに発散するという説明には当たらない。",
      "オ": "入力のラプラス変換は1／（s²＋1）なので、出力の変換は1／（s²＋1）²となる。時間応答は（sin t−t cos t）／2で、符号を交互に変えながら振幅が増える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q52",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "制御工学",
    "topicTags": [
      "ブロック線図の伝達関数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次のブロック線図において入力uから出力yまでの伝達関数を表したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "（−2G₁G₃＋2G₂G₃）／（1−2G₁G₃＋2G₂G₃）",
      "イ": "（−G₁G₃＋G₂G₃）／（1＋G₂−G₁G₃＋G₂G₃）",
      "ウ": "（−2G₁G₃＋2G₂G₃）／（1＋2G₂−2G₁G₃＋2G₂G₃）",
      "エ": "（−G₁G₃＋G₂G₃−4G₁G₂G₃）／（1＋G₂−G₁G₃＋G₂G₃−4G₁G₂G₃）",
      "オ": "（−2G₁G₃＋2G₂G₃−8G₁G₂G₃）／（1＋2G₂−2G₁G₃＋2G₂G₃−8G₁G₂G₃）"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "G₃に入る左右の共通信号をhとすると、h＝−G₁（u−y）＋G₂（u−y−2h）となる。y＝2G₃hを代入して整理すると、分母は1＋2G₂−2G₁G₃＋2G₂G₃となる。",
    "choiceExplanations": {
      "ア": "二つの対称経路の寄与を足すため分子の係数2は妥当である。ただし内側の負帰還により、分母には2G₂も加わる。",
      "イ": "図の左右に同じ経路があり、中心への帰還と出力への加算には両方が寄与する。一つの経路とみなすと係数2を落とすことになる。",
      "ウ": "G₃に入る左右の共通信号をhとすると、h＝−G₁（u−y）＋G₂（u−y−2h）となる。y＝2G₃hを代入して整理すると、分母は1＋2G₂−2G₁G₃＋2G₂G₃となる。",
      "エ": "G₁とG₂は各側面の加算点に別々の入力を与える。正しく整理すると、分子にG₁G₂G₃の積の項は現れない。",
      "オ": "左右経路の寄与は2倍だが、h（1＋2G₂）＝（G₂−G₁）（u−y）である。分子に−8G₁G₂G₃を加える根拠はない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q52.webp"
    ],
    "imageAltTexts": [
      "G₁、G₂、G₃の対称な経路を含む負帰還系のブロック線図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q53",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "ローレンツ力と円運動の周期",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、磁束密度の大きさがBの一様な磁界中を、質量m、電気量q（q＞0）の荷電粒子が反時計回りに等速円運動をしている。この荷電粒子が、磁界以外から力を受けていないとき、磁界の向きと等速円運動の周期の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "紙面の表から裏に向かう向き ／ 2π√（m／qB）",
      "イ": "紙面の表から裏に向かう向き ／ 2πm／（qB）",
      "ウ": "紙面の表から裏に向かう向き ／ 2πqB／m",
      "エ": "紙面の裏から表に向かう向き ／ 2π√（m／qB）",
      "オ": "紙面の裏から表に向かう向き ／ 2πm／（qB）"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "円の右端で正電荷の速度は上向きであり、力は左向きなので、磁界は紙面の奥向きである。qvB＝mv²／rよりr／v＝m／（qB）となり、周期は2πm／（qB）である。",
    "choiceExplanations": {
      "ア": "磁界の向きは合っているが、qvB＝mv²／rからr／v＝m／（qB）となる。周期に平方根は付かない。",
      "イ": "円の右端で正電荷の速度は上向きであり、力は左向きなので、磁界は紙面の奥向きである。qvB＝mv²／rよりr／v＝m／（qB）となり、周期は2πm／（qB）である。",
      "ウ": "qB／mは単位時間当たりの角度である角周波数に当たる。周期は角周波数の逆数に2πを掛けて得る。",
      "エ": "磁界が手前向きなら、右端で上向きの速度を持つ正電荷への力は右向きとなる。運動を保つ左向きの力が得られず、周期の式にも平方根は不要である。",
      "オ": "周期の式は合っているが、磁界の向きが逆である。正電荷の右端での力を内向きにするには、磁束は紙面を表から裏へ貫く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q53.webp"
    ],
    "imageAltTexts": [
      "正電荷が反時計回りに進む円軌道の図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q54",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "部分挿入した誘電体の容量と力",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "平行平板コンデンサに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図のように、真空中に置かれた、面積a²の正方形、かつ、極板間隔2bの平行平板コンデンサに、極板と同形で厚さb、比誘電率εᵣ＝2の誘電体板を、片面のみ極板に接するようにa／3だけ平行に挿入したとき、その静電容量は［㋐］である。また、誘電体板を挿入したまま電圧Vの電源を接続した際に、この誘電体板に働く極板と平行な力Fは［㋑］となる。\nただし、真空の誘電率はε₀であり、Fは極板に引き込まれる方向に働く力を正とする。また、極板の面積は極板間隔に対して十分に大きいものとする。」",
    "choices": {
      "ア": "ε₀a²／（3b） ／ −ε₀aV²／（12b）",
      "イ": "ε₀a²／（3b） ／ ε₀aV²／（12b）",
      "ウ": "5ε₀a²／（9b） ／ −ε₀aV²／（12b）",
      "エ": "5ε₀a²／（9b） ／ ε₀aV²／（12b）",
      "オ": "5ε₀a²／（9b） ／ ε₀aV²／（6b）"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "未挿入部はε₀（2a²／3）／（2b）、挿入部はε₀（a²／3）／（b＋b／2）なので、合計は5ε₀a²／（9b）である。挿入長xに対するdC／dx＝ε₀a／（6b）より、F＝（V²／2）dC／dx＝ε₀aV²／（12b）となる。",
    "choiceExplanations": {
      "ア": "ε₀a²／（3b）は誘電体が入らない側だけの容量である。誘電体を含む側の容量も加え、力は容量が増す引込み方向になる。",
      "イ": "力の式は妥当である。容量には、真空と誘電体の厚さ方向の直列合成を用いた挿入部の2ε₀a²／（9b）も加える。",
      "ウ": "容量は妥当だが、誘電体が入り込むと容量は増加する。電圧が一定ならその方向に力が生じるので符号は正である。",
      "エ": "未挿入部はε₀（2a²／3）／（2b）、挿入部はε₀（a²／3）／（b＋b／2）なので、合計は5ε₀a²／（9b）である。挿入長xに対するdC／dx＝ε₀a／（6b）より、F＝（V²／2）dC／dx＝ε₀aV²／（12b）となる。",
      "オ": "容量は妥当である。力は容量の挿入長に対する変化率にV²を掛けた値の半分なので、係数は1／6ではなく1／12になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q54.webp"
    ],
    "imageAltTexts": [
      "平行平板コンデンサへの誘電体板の部分挿入"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q55",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "節点法による抵抗電流",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、2 Ωの抵抗に流れる電流Iの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0 A",
      "イ": "1／2 A",
      "ウ": "1 A",
      "エ": "7／6 A",
      "オ": "4／3 A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "中央下を0 Vとすると両電圧源の外側はそれぞれ3 Vと1 Vである。理想電流源も含めて各節点で電流を釣り合わせると、中央上は2 Vで、I＝2／2＝1 Aとなる。",
    "choiceExplanations": {
      "ア": "2 Ωの抵抗の上下の節点は等電位ではない。中央下を0 Vとして節点法を適用すると、中央上は2 Vになる。",
      "イ": "1／2 Aが流れるためには抵抗の両端に1 Vの差が必要である。各枝の抵抗と電源を含めた節点方程式では電位差は2 Vとなる。",
      "ウ": "中央下を0 Vとすると両電圧源の外側はそれぞれ3 Vと1 Vである。理想電流源も含めて各節点で電流を釣り合わせると、中央上は2 Vで、I＝2／2＝1 Aとなる。",
      "エ": "7／6 Aに対応する抵抗両端の電位差は7／3 Vである。中央上と下の電位差は2 Vであり、その値とは異なる。",
      "オ": "この電流値は2 Ωの抵抗に8／3 Vの電位差があるときの値である。節点電位を求めると電位差は2 Vになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q55.webp"
    ],
    "imageAltTexts": [
      "二つの電圧源と一つの理想電流源をもつ抵抗回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q56",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "RC回路の放電",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、初めにスイッチSを閉じて、十分に時間が経過した後に、スイッチSを開いた。スイッチSを開いてからコンデンサ電圧v꜀が5 Vになるまでにかかる時間として最も妥当なのはどれか。ただし、ln 2＝0.693、ln 3＝1.10、ln 5＝1.61とする。",
    "choices": {
      "ア": "1.41 s",
      "イ": "1.88 s",
      "ウ": "2.35 s",
      "エ": "2.77 s",
      "オ": "4.00 s"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "開く前の直流定常状態では、コンデンサ電圧は10×4／（1＋4）＝8 Vである。開いた後は4 Ωを通じて放電し、v꜀＝8e^(−t／4)よりt＝4 ln（8／5）≒1.88 sとなる。",
    "choiceExplanations": {
      "ア": "開く直前のコンデンサ電圧は分圧された8 Vである。スイッチを開いた後の抵抗は4 Ωなので、1.41 sでは電圧が5 Vまで下がらない。",
      "イ": "開く前の直流定常状態では、コンデンサ電圧は10×4／（1＋4）＝8 Vである。開いた後は4 Ωを通じて放電し、v꜀＝8e^(−t／4)よりt＝4 ln（8／5）≒1.88 sとなる。",
      "ウ": "放電経路には4 Ωの抵抗がある。開いたスイッチにつながる1 Ωも放電抵抗に加えると時定数を5 sと見積もり、時間を長く計算してしまう。",
      "エ": "2.77 sは4 ln 2に近く、電圧が初期値の半分になる時間である。初期電圧は10 Vではなく8 Vで、5 Vはその半分ではない。",
      "オ": "4.00 sはこの放電回路の時定数である。目標電圧に至る時間は時定数にln（8／5）を掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q56.webp"
    ],
    "imageAltTexts": [
      "スイッチS、抵抗および1 Fのコンデンサの回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q57",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "縦続行列と電圧伝送比",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、縦続行列［A, B；C, D］で表される回路に、電源電圧Vₛ、出力インピーダンスRₛの信号源と負荷抵抗Rₗが接続されている。ここで、電圧V₁、V₂及び電流I₁、I₂を図の向きにとったとき、それらの関係式は縦続行列により（V₁, I₁）ᵀ＝［A, B；C, D］（V₂, I₂）ᵀで表される。このときの電源電圧Vₛに対する負荷両端の電圧V₂の伝送比V₂／Vₛとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1／（A＋B／Rₗ＋RₛC＋RₛD／Rₗ）",
      "イ": "1／（A＋B／Rₛ＋RₛC＋RₗD／Rₛ）",
      "ウ": "1／（A＋B／Rₗ＋RₛC＋RₗD／Rₛ）",
      "エ": "Rₗ／（A＋B／Rₗ＋RₛC＋RₛD／Rₗ）",
      "オ": "Rₗ／（A＋B／Rₛ＋RₛC＋RₗD／Rₛ）"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "I₂＝V₂／Rₗを縦続行列の式に代入してV₁とI₁をV₂で表す。電源側の関係Vₛ＝V₁＋RₛI₁に入れ、その係数の逆数を取るとこの式になる。",
    "choiceExplanations": {
      "ア": "I₂＝V₂／Rₗを縦続行列の式に代入してV₁とI₁をV₂で表す。電源側の関係Vₛ＝V₁＋RₛI₁に入れ、その係数の逆数を取るとこの式になる。",
      "イ": "BI₂はB V₂／Rₗであり、ここでは信号源の出力抵抗Rₛで割らない。Dの項でも分母と分子の抵抗が逆である。",
      "ウ": "Bの項は負荷抵抗Rₗで割るため正しいが、Dの項はRₛDI₂から生じる。係数はRₛD／Rₗとなる。",
      "エ": "分母はVₛをV₂で割った量である。逆数にすれば伝送比となるため、分子に負荷抵抗Rₗは不要である。",
      "オ": "V₂とI₂の関係からBの項の分母はRₗとなり、Dの項にもRₛ／Rₗを掛ける。分子にRₗを置く形でもない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q57.webp"
    ],
    "imageAltTexts": [
      "信号源、縦続行列で表される回路および負荷抵抗の接続"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q58",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "半導体レーザと誘導放出",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "半導体レーザ（レーザダイオード）に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「半導体レーザは、入射光によって［㋐］の電子が［㋑］に遷移し、入射光と同一の周波数及び同一の位相の光が発生する、［㋒］を利用する発光素子である。半導体レーザは、光を発生する活性層よりもバンドギャップの大きいp型半導体層とn型半導体層で活性層を挟んだ［㋓］構造によって共振器を構成し、共振器に設けた鏡によって光の反射を繰り返すことで、光増幅を行う。」",
    "choices": {
      "ア": "伝導帯 ／ 価電子帯 ／ 誘導放出 ／ ダブルヘテロ",
      "イ": "伝導帯 ／ 価電子帯 ／ 自然放出 ／ MIS",
      "ウ": "価電子帯 ／ 伝導帯 ／ 誘導放出 ／ ダブルヘテロ",
      "エ": "価電子帯 ／ 伝導帯 ／ 誘導放出 ／ MIS",
      "オ": "価電子帯 ／ 伝導帯 ／ 自然放出 ／ ダブルヘテロ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "電子が伝導帯から価電子帯に遷移するとき、入射光と同じ周波数と位相の光を生じるのが誘導放出である。活性層を異種の半導体層で両側から挟むのはダブルヘテロ構造である。",
    "choiceExplanations": {
      "ア": "電子が伝導帯から価電子帯に遷移するとき、入射光と同じ周波数と位相の光を生じるのが誘導放出である。活性層を異種の半導体層で両側から挟むのはダブルヘテロ構造である。",
      "イ": "伝導帯から価電子帯への遷移は合っている。入射光に誘われて位相のそろった光が出るのは自然放出ではなく、構造もMISではない。",
      "ウ": "誘導放出とダブルヘテロの組合せは妥当だが、電子が価電子帯から伝導帯へ移るのは光を吸収する向きである。",
      "エ": "誘導放出では電子が高いエネルギー準位から低い準位へ移る。MISは金属・絶縁体・半導体の構造で、活性層を両側から挟む構造の名称とは異なる。",
      "オ": "活性層を挟む構造はダブルヘテロだが、遷移の向きが逆である。入射光と位相のそろった光の発生には自然放出より誘導放出が対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q59",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "論理回路の冗長なゲート",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のような論理回路において、㋐～㋔の素子のうち、ある一つの素子が故障して、その素子の出力が常に1になってしまった。しかし、回路の出力Xは、入力A、B、Cにどのような値を入力しても、故障前と変化がなかった。故障した素子として最も妥当なのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋑",
      "ウ": "㋒",
      "エ": "㋓",
      "オ": "㋔"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "上段（¬A∨B）と下段（¬B∨C）がともに真なら、Aが偽か、Bを経てCが真になる。よって中央の（¬A∨C）も必ず真であり、㋓を常に1にしてもXは変わらない。",
    "choiceExplanations": {
      "ア": "㋐が常に1だと上と中央のゲートがともに1になる。A＝1、B＝0、C＝1のとき、故障前は0だが故障後は1となる。",
      "イ": "㋑の出力が常に1だと最下段の論理和が常に真になる。A＝0、B＝1、C＝0で、故障前はX＝0、故障後はX＝1になる。",
      "ウ": "上段の㋒を常に1とすると、A＝1、B＝0、C＝1の場合に出力が変わる。故障前はこの上段の出力が0だからである。",
      "エ": "上段（¬A∨B）と下段（¬B∨C）がともに真なら、Aが偽か、Bを経てCが真になる。よって中央の（¬A∨C）も必ず真であり、㋓を常に1にしてもXは変わらない。",
      "オ": "下段の㋔を常に1にすると、A＝0、B＝1、C＝0で出力は1になる。この入力では故障前は下段が0なので、全体の出力も0である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q59.webp"
    ],
    "imageAltTexts": [
      "入力A、B、Cと素子㋐～㋔を含む論理回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q60",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "2値FSKの同期検波と変調指数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "デジタル通信に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「2値FSKの変調波は、一般に、次式で表される。\n\ns（t）＝A cos［2π（f꜀＋（Δf／2）u（t））t］\n\nここで、Aは振幅であり、データが1のときu（t）＝1、送信周波数f₁＝f꜀＋Δf／2、データが0のときu（t）＝−1、送信周波数f₂＝f꜀−Δf／2である。この2値FSKの復調方式は、例えば、図のブロック図のように表され、［㋐］方式と呼ばれる。ここで、中心周波数f₁、f₂の各帯域通過フィルタ（BPF）の出力に、cos（2πf₁t）、cos（2πf₂t）をそれぞれ乗算した後、［㋑］を通して余分な周波数成分を除去する。そして、各［㋑］出力を比較して最大値判別することで、検波出力を得る。f₁とf₂が十分に離れている場合、データ1を2値FSKで送信すると、下のBPFから信号成分は出力されないが、近すぎると、下のBPFからも信号成分が出力される。2値FSKの変調指数mはビット周期Tを用いてm＝［㋒］と定義され、二つの周波数間の干渉なしに情報を検出する変調指数mの最小値は［㋓］となる。」",
    "choices": {
      "ア": "同期検波 ／ BPF ／ Δf／T ／ 1",
      "イ": "同期検波 ／ LPF（低域通過フィルタ） ／ ΔfT ／ 0.5",
      "ウ": "同期検波 ／ LPF（低域通過フィルタ） ／ Δf／T ／ 0.5",
      "エ": "包絡線検波 ／ BPF ／ Δf／T ／ 1",
      "オ": "包絡線検波 ／ LPF（低域通過フィルタ） ／ ΔfT ／ 0.5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "基準の搬送波で乗算する同期検波では、LPFで高周波成分を除く。変調指数m＝ΔfTで、同期検波で直交条件を満たす最小の周波数間隔は1／（2T）なので、最小値は0.5である。",
    "choiceExplanations": {
      "ア": "基準となる同じ周波数の正弦波と乗算するため同期検波である。ただし、乗算後は高い周波数成分を除くLPFを用い、変調指数はΔfとTの積になる。",
      "イ": "基準の搬送波で乗算する同期検波では、LPFで高周波成分を除く。変調指数m＝ΔfTで、同期検波で直交条件を満たす最小の周波数間隔は1／（2T）なので、最小値は0.5である。",
      "ウ": "同期検波、LPF、最小値0.5は妥当である。変調指数は無次元なので、周波数差を周期で割るのではなく掛ける。",
      "エ": "図では周波数と位相の基準を用いて受信信号を乗算する。包絡線検波ではなく同期検波であり、その乗算後にはLPFを用いる。",
      "オ": "変調指数の式と最小値は合っているが、図は各枝で同期した基準信号と乗算している。そのため検波方式の名称は同期検波である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-digital/q60.webp"
    ],
    "imageAltTexts": [
      "二つの周波数に対応する2値FSKの復調ブロック図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q61",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "衛星通信の多元接続と降雨減衰",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "衛星通信システムに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「衛星通信システムでは、単一又は複数の通信衛星の中継器を用いて、多数の地球局に同時に通信回線を設定する。このとき、FDMA、［㋐］等の多元接続方式が必要となる。FDMA方式は、［㋑］を分割して各地球局に回線を割り当てる。なお、衛星通信では、10 GHz以上の電波を使用する場合、［㋒］による信号の減衰を受けやすい。」",
    "choices": {
      "ア": "QPSK ／ 周波数 ／ 降雨",
      "イ": "QPSK ／ 符号 ／ 電離層反射",
      "ウ": "TDMA ／ 周波数 ／ 電離層反射",
      "エ": "TDMA ／ 周波数 ／ 降雨",
      "オ": "TDMA ／ 符号 ／ 電離層反射"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "TDMAは時間を、FDMAは周波数帯を分けて複数の局に割り当てる。10 GHz以上の電波では雨粒による吸収や散乱で信号が減衰しやすい。",
    "choiceExplanations": {
      "ア": "FDMAの周波数分割と高周波数帯での降雨減衰は妥当である。QPSKは4種類の位相で情報を表す変調方式で、多元接続方式の名称ではない。",
      "イ": "QPSKは変調方式であり、符号で利用者を区別するのはCDMAである。10 GHz以上を用いる衛星回線で特に考慮される減衰には降雨がある。",
      "ウ": "TDMAは時間分割、FDMAは周波数分割であり、初めの二つは妥当である。高周波の衛星回線では電離層反射より降雨による減衰が問題となる。",
      "エ": "TDMAは時間を、FDMAは周波数帯を分けて複数の局に割り当てる。10 GHz以上の電波では雨粒による吸収や散乱で信号が減衰しやすい。",
      "オ": "TDMAは多元接続方式に当たるが、FDMAが分割するのは符号ではなく周波数である。衛星通信での高い周波数帯の減衰には降雨が関係する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q62",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "標本化定理と伝送レート",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "デジタル通信に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「任意の時点tで任意の振幅を取り得るアナログ信号は、そのスペクトルがfₘに帯域制限されているとき、［㋐］ごとに抽出した振幅標本の時系列に等価である。この標本化周期を［㋑］という。また、振幅標本の時系列を離散的な振幅レベルに変換して表す処理を、量子化という。いま、アナログ信号を0.125 msごとに標本化し、128レベルで量子化した後、7ビット符号へ符号化する場合、伝送レートは［㋒］になる。」",
    "choices": {
      "ア": "2／fₘ ／ ナイキスト間隔 ／ 56 kbps",
      "イ": "2／fₘ ／ ナイキスト間隔 ／ 72 kbps",
      "ウ": "2／fₘ ／ ハミング距離 ／ 72 kbps",
      "エ": "1／（2fₘ） ／ ナイキスト間隔 ／ 56 kbps",
      "オ": "1／（2fₘ） ／ ハミング距離 ／ 56 kbps"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最大周波数fₘの信号に対するナイキスト間隔は1／（2fₘ）である。0.125 msごとの標本に7ビットを割り当てるので、8,000×7＝56,000ビット毎秒となる。",
    "choiceExplanations": {
      "ア": "伝送レートは56 kbpsだが、最大周波数fₘに対し必要な標本化周波数は2fₘ以上である。ナイキスト間隔はその逆数1／（2fₘ）となる。",
      "イ": "標本化周期は2／fₘより短い1／（2fₘ）が上限となる。0.125 msは毎秒8,000回の標本化に当たり、7ビットずつで56 kbpsになる。",
      "ウ": "ハミング距離は同じ長さの二つの符号語の間で値が異なる位置の個数である。標本化周期や1秒当たりのビット数を指さない。",
      "エ": "最大周波数fₘの信号に対するナイキスト間隔は1／（2fₘ）である。0.125 msごとの標本に7ビットを割り当てるので、8,000×7＝56,000ビット毎秒となる。",
      "オ": "標本化周期と伝送レートは妥当だが、周期の名称はナイキスト間隔である。ハミング距離は符号語の間の差異を数える量である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-digital-q63",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "フラットフェージングと平均ビット誤り率",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "移動通信に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「移動通信では、受信信号の振幅や位相の変動を引き起こすフェージング現象が知られている。利用する周波数帯域全体に均一な周波数特性を持つ［㋐］環境での、ある変調方式のビット誤り率特性について考える。このとき、位相変動の影響は無視できると仮定する。［㋐］環境における瞬時SNRをγ、瞬時SNRの確率密度関数をp（γ）とする。ここで、γは、受信信号と熱雑音の［㋑］で表される。加法性白色ガウス雑音通信路において、瞬時SNRがγのときの、ある変調方式のビット誤り率をPₑ（γ）とする。ここで、加法性白色ガウス雑音は、周波数領域で［㋒］が一定の雑音である。このとき、［㋐］環境での、ある変調方式の長時間区間にわたる平均ビット誤り率Pᵦは、Pᵦ＝［㋓］で与えられる。」",
    "choices": {
      "ア": "周波数選択性フェージング ／ 電圧比 ／ 電圧 ／ ∫₀∞ Pₑ（γ）p（γ） dγ",
      "イ": "周波数選択性フェージング ／ 電力比 ／ 電力スペクトル密度 ／ ∫₀∞ Pₑ（γ）p（γ） dγ",
      "ウ": "フラットフェージング ／ 電圧比 ／ 電圧 ／ Pₑ（γ）p（γ）",
      "エ": "フラットフェージング ／ 電力比 ／ 電力スペクトル密度 ／ Pₑ（γ）p（γ）",
      "オ": "フラットフェージング ／ 電力比 ／ 電力スペクトル密度 ／ ∫₀∞ Pₑ（γ）p（γ） dγ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "帯域全体に同じ特性が及ぶのはフラットフェージングであり、SNRは電力比、白色性は電力スペクトル密度が一定であることをいう。平均誤り率はPₑ（γ）をp（γ）で重み付けして0から∞まで積分して求める。",
    "choiceExplanations": {
      "ア": "積分は平均の求め方として合っている。すべての周波数にほぼ同じ特性がかかるのはフラットフェージングで、SNRは電力の比である。",
      "イ": "電力比、電力スペクトル密度及び積分は適切である。帯域内で周波数により受ける影響が異なるときに周波数選択性フェージングと呼ぶ。",
      "ウ": "帯域にわたって特性が均一なのはフラットフェージングである。SNRは電圧比ではなく電力比であり、誤り率を平均するには密度との積を積分する必要がある。",
      "エ": "最初の三つは妥当である。Pₑ（γ）p（γ）だけでは各γでの重みにすぎず、全てのγの寄与を積分する必要がある。",
      "オ": "帯域全体に同じ特性が及ぶのはフラットフェージングであり、SNRは電力比、白色性は電力スペクトル密度が一定であることをいう。平均誤り率はPₑ（γ）をp（γ）で重み付けして0から∞まで積分して求める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018341.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。"
  }
];
