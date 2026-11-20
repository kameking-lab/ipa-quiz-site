import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2024_SENMON_KAGAKU: Question[] = [
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q10",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "マクスウェル分布の平均速さと最頻値",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "気体分子運動論に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n質量mの気体分子について、ある温度Tにおいて、その速さ（速度ベクトルの大きさ）がvとv＋dvの間にある確率f(v)dvは、次の式①で表される。ただし、k_Bはボルツマン定数である。\n① f(v)dv＝4π[m/(2πk_B T)]^(3/2)v² exp[−mv²/(2k_B T)]dv\n平均速さを求めるには、積分㋐を計算すればよい。必要に応じて積分公式②、③を用い計算すると、平均速さ㋑が求められる。また、f(v)が極大となるときの速さは平均速さより㋒。\n② ∫₀^∞ x²e^(−ax²)dx＝(1/4)(π/a³)^(1/2)\n③ ∫₀^∞ x³e^(−ax²)dx＝1/(2a²)",
    "choices": {
      "ア": "㋐：∫₀^∞ f(v)dv、㋑：√(2k_B T/m)、㋒：小さい",
      "イ": "㋐：∫₀^∞ f(v)dv、㋑：√[8k_B T/(πm)]、㋒：大きい",
      "ウ": "㋐：∫₀^∞ v f(v)dv、㋑：√(2k_B T/m)、㋒：小さい",
      "エ": "㋐：∫₀^∞ v f(v)dv、㋑：√(2k_B T/m)、㋒：大きい",
      "オ": "㋐：∫₀^∞ v f(v)dv、㋑：√[8k_B T/(πm)]、㋒：小さい"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "平均は∫₀^∞ v f(v)dvであり、式③から√[8k_B T/(πm)]になる。最頻の速さはf′(v)＝0から√(2k_B T/m)となり、8/π＞2なので平均より小さい。",
    "choiceExplanations": {
      "ア": "f(v)を積分するだけでは全確率1になる。平均では各速さvに確率密度を掛けて積分し、√(2k_B T/m)は分布の最頻の速さである。",
      "イ": "示された平均速さの式は妥当であるが、積分の被積分関数にはvが必要である。最頻値の平方に対する平均速さの平方の比は4/π＞1なので、最頻値の方が小さい。",
      "ウ": "平均の積分と最頻値が小さいという関係は妥当である。ただし、√(2k_B T/m)はf′(v)＝0から求める最頻値で、平均には係数8/πを用いる。",
      "エ": "平均はv f(v)を積分し、③を用いて√[8k_B T/(πm)]となる。分布を微分して求める最頻値√(2k_B T/m)は、これより小さい。",
      "オ": "平均は∫₀^∞ v f(v)dvであり、式③から√[8k_B T/(πm)]になる。最頻の速さはf′(v)＝0から√(2k_B T/m)となり、8/π＞2なので平均より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q11",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "理想気体の可逆等温膨張の仕事",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような、ピストンの付いたシリンダー内の1.00 Lの空間に、理想気体が1.01×10⁶ Paの圧力で入っている。この気体が、温度一定の下で、圧力が1.01×10⁵ Paになるまで可逆的に膨張するとき、系が外界にする仕事として最も妥当なのはどれか。なお、必要に応じてln 10＝2.30を用いてもよい。",
    "choices": {
      "ア": "2.3×10³ J",
      "イ": "9.1×10³ J",
      "ウ": "9.1×10⁴ J",
      "エ": "2.3×10⁶ J",
      "オ": "9.1×10⁶ J"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "等温なので体積比は初期圧力と最終圧力の比10で、nRT＝p₁V₁＝1.01×10⁶×10⁻³＝1010 Jである。可逆仕事はnRT ln 10≃2.3×10³ Jとなる。",
    "choiceExplanations": {
      "ア": "等温なので体積比は初期圧力と最終圧力の比10で、nRT＝p₁V₁＝1.01×10⁶×10⁻³＝1010 Jである。可逆仕事はnRT ln 10≃2.3×10³ Jとなる。",
      "イ": "初期圧力を体積差9.00 Lに掛けるとおよそ9.1×10³ Jになる。可逆等温膨張では圧力が体積の逆数に従って下がるため、圧力を体積について積分する。",
      "ウ": "圧力Paに体積を掛けて仕事を得るには、体積をm³に直す。等温で一定のpVは1010 Jなので、ln 10を掛けても9.1×10⁴ Jにはならない。",
      "エ": "1.00 L＝10⁻³ m³である。体積1.00をそのままm³として扱うと、nRTと仕事を1000倍に見積もる。",
      "オ": "初期圧力を固定して体積差9 Lを換算せずに掛けると、この程度の値になる。体積をm³で扱い、変化中の圧力p＝nRT/Vを積分する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q11.webp"
    ],
    "imageAltTexts": [
      "ピストン付きシリンダー内に理想気体があり、ピストンを左右に動かすと圧縮・膨張する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q12",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "異なる理想気体の混合ギブズエネルギー",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ギブズエネルギーに関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n図のような仕切りで隔てられた二つの部屋のうち、一方に気体1、もう一方に気体2が入っており、これらはいずれも理想気体である。両室はいずれも圧力P、温度Tであり、部屋の体積をそれぞれV₁、V₂、気体分子の物質量をそれぞれn₁、n₂とする。気体1の標準化学ポテンシャルをμ₁°としたとき、気体1のギブズエネルギーG₁は、気体定数R、標準圧力P°とPを用いてG₁＝n₁[μ₁°＋RT ln(P/P°)]と表される。\n次に、この仕切りを取り外し、平衡に達し、気体分子が混合することによる混合ギブズエネルギー変化Δ_mix Gは、気体1の分圧P₁と気体2の分圧P₂を用いてΔ_mix G＝㋐と表される。このΔ_mix Gは㋑であるので、二つの気体分子は自発的に混合㋒ことが分かる。",
    "choices": {
      "ア": "㋐：−n₁RT ln(P₁/P)−n₂RT ln(P₂/P)、㋑：正、㋒：しない",
      "イ": "㋐：−n₁RT ln(P₁/P)−n₂RT ln(P₂/P)、㋑：負、㋒：する",
      "ウ": "㋐：n₁RT ln(P₁/P)＋n₂RT ln(P₂/P)、㋑：正、㋒：する",
      "エ": "㋐：n₁RT ln(P₁/P)＋n₂RT ln(P₂/P)、㋑：負、㋒：しない",
      "オ": "㋐：n₁RT ln(P₁/P)＋n₂RT ln(P₂/P)、㋑：負、㋒：する"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "混合の前後で各成分の化学ポテンシャル差はRT ln(Pᵢ/P)となる。両成分について物質量を掛けて足すと、二つの対数がともに負でΔ_mix G＜0となるため、自発的に混ざる。",
    "choiceExplanations": {
      "ア": "混合後は各成分の分圧が混合前の圧力Pより低く、化学ポテンシャルが下がる。混合後から混合前を引くので、対数の前に余分な負号は付かない。",
      "イ": "混合が自発的でΔ_mix Gが負になる点は妥当である。ただしこの候補の式では1未満の分圧比の対数の前に負号があり、計算すると正になる。",
      "ウ": "式の形は妥当であり、P₁/PとP₂/Pはいずれも1未満なので各対数は負である。したがってΔ_mix Gの符号は正ではない。",
      "エ": "Δ_mix Gの式と負の符号は妥当である。一定温度・圧力でギブズエネルギーが減る過程は自発的に進むので、混合する。",
      "オ": "混合の前後で各成分の化学ポテンシャル差はRT ln(Pᵢ/P)となる。両成分について物質量を掛けて足すと、二つの対数がともに負でΔ_mix G＜0となるため、自発的に混ざる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q12.webp"
    ],
    "imageAltTexts": [
      "同じ温度T・圧力Pで区切られた気体1と2。仕切りを除くと全体積V₁＋V₂を両気体が占める。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q13",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "二成分系の共融点と包晶分解",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "相図に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\nAとBの2成分系の相図において、点eを通る定組成線は㋐組成に相当し、最も低い凝固点をもつ混合物となる。Cの組成になるように、化合物A及びBを秤量混合し、これを温度T₀から図中の点aまで加熱すると、温度がT_㋑となったとき分解して化合物Bと包晶点㋑に相当する組成の融解体となる。更に温度を上げていくと、融解体の組成は次第に㋒の多いものになり、p–T_B曲線とぶつかったところで完全に融解し、Cの組成の融解体だけとなる。",
    "choices": {
      "ア": "㋐：共融、㋑：e、㋒：A",
      "イ": "㋐：共融、㋑：e、㋒：B",
      "ウ": "㋐：共融、㋑：p、㋒：B",
      "エ": "㋐：共沸、㋑：e、㋒：A",
      "オ": "㋐：共沸、㋑：p、㋒：B"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "eで液相線が最も低くなるので、その組成は共融組成である。Cの加熱ではT_pでBの固相とp組成の液相が生じ、さらに加熱すると液相の組成がB側へ移動する。",
    "choiceExplanations": {
      "ア": "点eが共融点であるのは妥当である。Cの組成で現れる分解はT_pで起こり、その後の液相線は加熱につれてB側へ寄る。",
      "イ": "共融とBは妥当である。Cの組成は点eと異なり、化合物Bと液相の組合せが生じるのは包晶温度T_pである。",
      "ウ": "eで液相線が最も低くなるので、その組成は共融組成である。Cの加熱ではT_pでBの固相とp組成の液相が生じ、さらに加熱すると液相の組成がB側へ移動する。",
      "エ": "共沸は液相と気相の組成が一致する現象である。この図では固液平衡を扱い、eは共融点、Cの分解で生じる液相の組成はpである。",
      "オ": "pとBは妥当である。液相線の谷底eは最低凝固点を示し、固液平衡の共融組成に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q13.webp"
    ],
    "imageAltTexts": [
      "A–B二成分の温度・組成図。液相線の最低点e、温度T_p上の点p、固体Cの組成と加熱経路を示す。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q14",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "一次反応の半減期",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "A→Bで表される反応があり、この反応の反応速度式がv＝k[A]で表されるとする。このとき、この反応の半減期として最も妥当なのはどれか。ただし、vは反応速度、kは反応の速度定数を表すとする。",
    "choices": {
      "ア": "k ln 2",
      "イ": "(ln 2)/k",
      "ウ": "(ln 2)/(2k)",
      "エ": "1/(k ln 2)",
      "オ": "2/(k ln 2)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "速度式−d[A]/dt＝k[A]を積分すると[A]＝[A]₀e^(−kt)になる。半減時のe^(−kt)＝1/2を解くとt＝(ln 2)/kである。",
    "choiceExplanations": {
      "ア": "kの単位は時間の逆数なので、kを掛けた量は半減期の時間の単位を持たない。一次反応で濃度を半分にする条件はkt＝ln 2である。",
      "イ": "速度式−d[A]/dt＝k[A]を積分すると[A]＝[A]₀e^(−kt)になる。半減時のe^(−kt)＝1/2を解くとt＝(ln 2)/kである。",
      "ウ": "速度式の反応物Aの係数は1なので、濃度の減少式は−d[A]/dt＝k[A]である。指数の係数を2kにする根拠はない。",
      "エ": "対数を取ると−kt＝ln(1/2)＝−ln 2になる。したがってln 2は分母ではなく分子に入る。",
      "オ": "濃度が半分になるという条件は指数関数e^(−kt)＝1/2で表す。ここで必要なのはln 2であり、2/ln 2を用いる計算にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q15",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "弱酸の解離度から求める酸解離定数",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ある1価の酸が25℃、0.10 mol/Lの水溶液中で1.6%解離するとき、この酸の25℃における酸解離定数Kₐとして最も妥当なのはどれか。",
    "choices": {
      "ア": "2.6×10⁻⁵ mol/L",
      "イ": "2.1×10⁻⁴ mol/L",
      "ウ": "2.6×10⁻⁴ mol/L",
      "エ": "2.1×10⁻³ mol/L",
      "オ": "2.6×10⁻³ mol/L"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "解離度0.016から[H⁺]と[A⁻]はそれぞれ0.0016 mol/L、未解離酸は0.0984 mol/Lとなる。Kₐ＝[H⁺][A⁻]/[HA]に代入すると約2.6×10⁻⁵ mol/Lになる。",
    "choiceExplanations": {
      "ア": "解離度0.016から[H⁺]と[A⁻]はそれぞれ0.0016 mol/L、未解離酸は0.0984 mol/Lとなる。Kₐ＝[H⁺][A⁻]/[HA]に代入すると約2.6×10⁻⁵ mol/Lになる。",
      "イ": "解離したH⁺とA⁻の濃度は等しく、濃度積は(0.0016)²である。これをほぼ0.10 mol/Lで割ると数×10⁻⁵ mol/Lの大きさになる。",
      "ウ": "解離度0.016の二乗は約2.6×10⁻⁴である。Kₐにはこれに初濃度0.10 mol/Lを掛け、1−0.016で割る操作も必要である。",
      "エ": "1.6%を小数にして初濃度に掛けると、解離したイオンそれぞれの濃度は1.6×10⁻³ mol/Lである。酸解離定数を求めるには、両方の濃度を掛けて未解離分の濃度で割る。",
      "オ": "酸は大部分が未解離であり、分母には初濃度に近い0.0984 mol/Lを使う。分子の値が2.56×10⁻⁶ (mol/L)²なので、解離定数は10⁻³の桁より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q16",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "水中での有機塩基の比較",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "a、b、cのそれぞれの化合物㋐、㋑のうち、水中でより強い塩基となる化合物を選び出したものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "a：㋐、b：㋐、c：㋑",
      "イ": "a：㋐、b：㋑、c：㋐",
      "ウ": "a：㋐、b：㋑、c：㋑",
      "エ": "a：㋑、b：㋐、c：㋐",
      "オ": "a：㋑、b：㋐、c：㋑"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ピリジンの孤立電子対は芳香族π電子系に入らず、グアニジンは共役酸の正電荷を共鳴で分散できる。アルキルアミン同士では水中での共役酸の溶媒和も効き、ジメチルアミンの方が強い。",
    "choiceExplanations": {
      "ア": "aのピリジンとcのジメチルアミンは妥当である。bでは、共役酸の正電荷を三つの窒素に分散できるグアニジンの方が強い塩基である。",
      "イ": "aとbは妥当である。水中ではジメチルアミンの共役酸の方が溶媒和しやすく、トリメチルアミンより強い塩基となる。",
      "ウ": "ピリジンの孤立電子対は芳香族π電子系に入らず、グアニジンは共役酸の正電荷を共鳴で分散できる。アルキルアミン同士では水中での共役酸の溶媒和も効き、ジメチルアミンの方が強い。",
      "エ": "ピロールの窒素の孤立電子対は芳香族性に関与するので、ピリジンよりプロトンを受け取りにくい。bのグアニジンとcのジメチルアミンの方が各組で強い。",
      "オ": "cではジメチルアミンが妥当である。aではピリジン、bではプロトン化したとき共鳴安定化が大きいグアニジンが強い塩基になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q16.webp"
    ],
    "imageAltTexts": [
      "二つずつの構造式。aはピリジンとピロール、bは尿素とグアニジン、cはトリメチルアミンとジメチルアミン。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q17",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "水分子の結合双極子のベクトル合成",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "H₂O分子の永久双極子モーメントμ_H₂Oを1.85 D（debye）、結合角∠HOHを104°とする。このとき、O–H結合1個の永久双極子モーメントμ_O–Hとして最も妥当なのはどれか。ただし、μ_H₂Oはμ_O–Hのベクトル合成により得られるものとし、sin 52°＝0.79、cos 52°＝0.62とする。",
    "choices": {
      "ア": "0.57 D",
      "イ": "0.73 D",
      "ウ": "1.17 D",
      "エ": "1.49 D",
      "オ": "2.29 D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "二本のO–H結合は二等分線にいずれも52°傾くため、垂直な成分は相殺される。1.85＝2μ_O–H cos 52°から、μ_O–H＝1.85/(2×0.62)≃1.49 Dである。",
    "choiceExplanations": {
      "ア": "分子の双極子は二本の結合の角の二等分線方向に向く。既知の分子の値に余弦を掛けるのではなく、2 cos 52°で割って各結合の値を求める。",
      "イ": "結合ごとのモーメントの二等分線への射影がμ_O–H cos 52°である。二つの射影の和が1.85 Dなので、μ_O–Hは1.85×0.79/2にはならない。",
      "ウ": "二本の成分の合計を求める際、角の二等分線との角度52°の余弦を用いる。正弦を用いると、二等分線に垂直で相殺される方向への射影になる。",
      "エ": "二本のO–H結合は二等分線にいずれも52°傾くため、垂直な成分は相殺される。1.85＝2μ_O–H cos 52°から、μ_O–H＝1.85/(2×0.62)≃1.49 Dである。",
      "オ": "分子全体のモーメントは一方の結合だけから生じるのではなく、二つの結合の二等分線成分を足す。したがって合成の係数は2 cos 52°になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q18",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "水素原子軌道の動径分布と節",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰ～Ⅳは、水素原子の1s、2s、2p、3s軌道のいずれかの動径分布関数D(r)のグラフの概形を表したものである。このとき、2s、2p軌道の動径分布関数を表している図の組合せとして最も妥当なのはどれか。ただし、rは原子核と電子の距離を表しており、縦軸のスケールは図によって異なる。",
    "choices": {
      "ア": "2s：図Ⅱ、2p：図Ⅰ",
      "イ": "2s：図Ⅱ、2p：図Ⅲ",
      "ウ": "2s：図Ⅲ、2p：図Ⅰ",
      "エ": "2s：図Ⅲ、2p：図Ⅳ",
      "オ": "2s：図Ⅳ、2p：図Ⅱ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "動径節の数は主量子数nと方位量子数lからn−l−1で求められ、2sは1個なので図Ⅱである。2pは動径節が0個で、1sに相当する図Ⅳより外側にピークがある図Ⅲに対応する。",
    "choiceExplanations": {
      "ア": "2sに図Ⅱを対応させる点は妥当である。図Ⅰは正の距離で二つ節があり、動径節のない2pより3sに対応する。",
      "イ": "動径節の数は主量子数nと方位量子数lからn−l−1で求められ、2sは1個なので図Ⅱである。2pは動径節が0個で、1sに相当する図Ⅳより外側にピークがある図Ⅲに対応する。",
      "ウ": "図Ⅲは正の距離で節を持たず、節を一つ持つ2sとは合わない。図Ⅰの二つの節を持つ分布は3sである。",
      "エ": "図Ⅲ、Ⅳは正の距離で節を持たない。図Ⅳは原子核の近くにピークがある1sで、2sには動径節を一つ持つ図Ⅱが対応する。",
      "オ": "図Ⅱの曲線は正の距離で一度0になるので2sに対応する。図Ⅳと図Ⅲには節がなく、このうち核に近い図Ⅳは1s、より外側に広がる図Ⅲは2pである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q18.webp"
    ],
    "imageAltTexts": [
      "水素原子の動径分布関数の図Ⅰ～Ⅳ。曲線の節や原子核からの距離の目盛が示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q19",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "希薄溶液の束一的性質",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "希薄溶液の束一的性質に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 浸透圧、表面張力、沸点上昇、凝固点降下は、希薄溶液では溶質粒子の数だけに依存し、粒子の性質には関係しない。\n㋑ 希薄溶液の浸透圧は、温度の上昇とともに低下する。\n㋒ 束一的性質は全て、溶質が存在するために液相の溶媒の化学ポテンシャルが減少することに起因する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "溶質を加えると液相の溶媒のモル分率は1未満になり、理想希薄溶液ではRT ln xの寄与で溶媒の化学ポテンシャルが低下する。この変化が蒸気圧降下や凝固点降下、浸透圧などにつながる。",
    "choiceExplanations": {
      "ア": "浸透圧、沸点上昇、凝固点降下は理想希薄溶液の束一的性質である。一方、表面張力は溶質と界面の相互作用などにも左右される。",
      "イ": "表面張力は溶質の種類に依存し得る。また一定濃度の希薄溶液では、浸透圧は温度とともに上がる。",
      "ウ": "理想希薄溶液の浸透圧はファントホッフの式Π＝cRTに従う。濃度cが一定なら絶対温度Tに比例するので、低下はしない。",
      "エ": "溶媒の化学ポテンシャル低下を述べた㋒は妥当である。浸透圧は一定濃度で絶対温度に比例するため、㋑は合わない。",
      "オ": "溶質を加えると液相の溶媒のモル分率は1未満になり、理想希薄溶液ではRT ln xの寄与で溶媒の化学ポテンシャルが低下する。この変化が蒸気圧降下や凝固点降下、浸透圧などにつながる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q20",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "電気化学",
    "topicTags": [
      "クロムの標準電極電位と自由エネルギー",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "Crの酸化還元反応とそれらの標準電極電位に関する次の式の空欄に当てはまるものとして最も妥当なのはどれか。\nCr³⁺＋3e⁻→Cr：E₁＝−0.74 V\nCr²⁺＋2e⁻→Cr：E₂＝−0.91 V\nCr³⁺＋e⁻→Cr²⁺：E₃＝［空欄］V",
    "choices": {
      "ア": "−1.25",
      "イ": "−0.81",
      "ウ": "−0.40",
      "エ": "＋0.40",
      "オ": "＋1.25"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Cr³⁺を金属Crに還元する反応は、Cr³⁺をCr²⁺にする反応と、それをさらに還元する反応の和である。ΔG°＝−nFE°の加法性からE₃＝3E₁−2E₂＝−2.22＋1.82＝−0.40 Vになる。",
    "choiceExplanations": {
      "ア": "反応を組み合わせるときに加減できるのは標準自由エネルギーである。電子数を掛けた量で3E₁＝E₃＋2E₂となるため、結果は−1.25 Vにはならない。",
      "イ": "二つの電位を単純に平均すると、電子数が異なることを反映できない。3電子の反応から2電子の反応を引くには、それぞれnEに直す必要がある。",
      "ウ": "Cr³⁺を金属Crに還元する反応は、Cr³⁺をCr²⁺にする反応と、それをさらに還元する反応の和である。ΔG°＝−nFE°の加法性からE₃＝3E₁−2E₂＝−2.22＋1.82＝−0.40 Vになる。",
      "エ": "電子数で重み付けした標準電位の差は3(−0.74)−2(−0.91)である。求める還元反応ではこの順に引くので、電位は負になる。",
      "オ": "求める反応はCr³⁺からCr²⁺への1電子還元である。全還元からCr²⁺の還元を差し引いた標準自由エネルギーに対応し、−0.40 Vとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q21",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "2p軌道からできる結合性π分子軌道",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "2p軌道の1次結合から成る分子軌道において、結合性π_u軌道として最も妥当なのはどれか。ただし、色の違いは波動関数の正負の違いを表している。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "π軌道を作るには二つの2p軌道が核間軸に垂直で、側面同士が重なる必要がある。図5は隣り合う上下それぞれの領域が同位相で強め合い、反転で符号が変わる結合性π_u軌道である。",
    "choiceExplanations": {
      "ア": "二つの2p軌道の向きが互いに直交している。この配置では片方の正負の領域が相殺し、結合性π軌道を生む同位相の側面重なりにならない。",
      "イ": "核間軸zに沿って向き合う2p軌道はσ軌道を作る。さらに向かい合う部分が逆位相なので、結合性のπ軌道にはならない。",
      "ウ": "向かい合う部分が同位相で結合性になるが、軌道は核間軸に沿って重なっている。これは結合性σ軌道であり、π結合の側面重なりではない。",
      "エ": "二つの2p軌道は核間軸に垂直で、π型の重なりを持つ。一方、上下の各側で隣り合う部分が逆位相なので、結合性のπ_uではなく反結合性になる。",
      "オ": "π軌道を作るには二つの2p軌道が核間軸に垂直で、側面同士が重なる必要がある。図5は隣り合う上下それぞれの領域が同位相で強め合い、反転で符号が変わる結合性π_u軌道である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q21-1.webp",
      "イ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q21-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q21-3.webp",
      "エ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q21-4.webp",
      "オ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q21-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q22",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "ボルン・ハーバーサイクルによる格子エンタルピー",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "表のデータに基づいて計算したKClの格子エンタルピーの値として最も妥当なのはどれか。",
    "choices": {
      "ア": "−157 kJ/mol",
      "イ": "−35 kJ/mol",
      "ウ": "719 kJ/mol",
      "エ": "841 kJ/mol",
      "オ": "1551 kJ/mol"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "構成元素から気相イオンまでの変化は89＋425＋122−355＝281 kJ/molである。固体KClの生成エンタルピーは−438 kJ/molだから、固体を気相イオンに分けるには281−(−438)＝719 kJ/molを要する。",
    "choiceExplanations": {
      "ア": "格子エンタルピーは固体から気相のイオンに分ける方向で正になる。気相イオンを構成元素から作る変化は89＋425＋244/2−355＝281 kJ/molで、固体の生成エンタルピーとの差を求める。",
      "イ": "塩素分子の解離エンタルピーはCl₂ 1 mol当たりなので、KCl 1 molの生成には半分だけ使う。気相イオンの生成と固体の生成のエンタルピーを比較すると正の値になる。",
      "ウ": "構成元素から気相イオンまでの変化は89＋425＋122−355＝281 kJ/molである。固体KClの生成エンタルピーは−438 kJ/molだから、固体を気相イオンに分けるには281−(−438)＝719 kJ/molを要する。",
      "エ": "この値は塩素分子の解離に244 kJを全量加えると得られる。KCl 1 molにCl₂は1/2 molしか必要ないので、解離の寄与は122 kJ/molになる。",
      "オ": "塩素原子への電子付加ではエンタルピーが355 kJ/mol減少する。さらに塩素分子の解離は半分の122 kJ/molのみを使うので、各項を全て正で加える計算にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q22.webp"
    ],
    "imageAltTexts": [
      "Kの昇華89、イオン化425、Cl₂の解離244、Clへの電子付加−355、KClの生成−438。単位はkJ/mol。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q23",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "八面体と四面体錯体の配位子場安定化",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "金属錯体におけるd軌道の分裂に基づく配位子場安定化エネルギーに関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n図は配位子場安定化エネルギー（LFSE）をd電子数に対してプロットしたグラフである。線A及び線Bはそれぞれ、㋐及び㋑のLFSEの変化を示している。",
    "choices": {
      "ア": "㋐：平面四角形錯体、㋑：高スピン八面体錯体",
      "イ": "㋐：四面体錯体、㋑：高スピン八面体錯体",
      "ウ": "㋐：四面体錯体、㋑：平面四角形錯体",
      "エ": "㋐：高スピン八面体錯体、㋑：四面体錯体",
      "オ": "㋐：高スピン八面体錯体、㋑：平面四角形錯体"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "高スピン八面体の最初の三電子は低いt₂gに一つずつ入るため、Aはd³で山になる。四面体は低いe軌道が二つで、Bはd²で山になる。",
    "choiceExplanations": {
      "ア": "八面体高スピンでは下位のt₂g軌道が三つあるため、d³で安定化が大きくなる。したがって八面体高スピンはd²に山を持つBではなくAである。",
      "イ": "四面体では低い側のe軌道が二つなので、d²で第一の山が現れ、線Bに対応する。高スピン八面体にはd³で山を持つ線Aが対応する。",
      "ウ": "四面体錯体の低い側には二つの軌道がある。d³で最初の山を持つ線Aは四面体ではなく、三つのt₂g軌道が低い八面体である。",
      "エ": "高スピン八面体の最初の三電子は低いt₂gに一つずつ入るため、Aはd³で山になる。四面体は低いe軌道が二つで、Bはd²で山になる。",
      "オ": "線Aは高スピン八面体で妥当である。Bは低い二軌道を先に占有した後に安定化の増加が止まる四面体のパターンである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q23.webp"
    ],
    "imageAltTexts": [
      "d電子数に対する配位子場安定化エネルギーのグラフ。線Aの山はd³とd⁸、線Bはd²とd⁷にあり、両方ともd⁵で0。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q24",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "工業化学",
    "topicTags": [
      "合成ガスと食塩水電解の生成物",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "水素製造に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n水素を製造する方法として、天然ガス、石油、石炭などの炭化水素を分解する方法や電力を利用して食塩水を電気分解する方法が挙げられる。天然ガスをはじめとする炭化水素から水素を製造する場合、中間物として水素や㋐が発生する。水素と㋐の混合ガスは主にアンモニアやメタノールなどの合成に使用されており、そのため合成ガスと呼ばれている。電力を利用して食塩水を電気分解し水素を製造する場合、イオン交換膜法では㋑側から水素と㋒が得られる。",
    "choices": {
      "ア": "㋐：一酸化炭素、㋑：陰極、㋒：水酸化ナトリウム水溶液",
      "イ": "㋐：一酸化炭素、㋑：陽極、㋒：塩素",
      "ウ": "㋐：二酸化炭素、㋑：陰極、㋒：水酸化ナトリウム水溶液",
      "エ": "㋐：二酸化炭素、㋑：陰極、㋒：塩素",
      "オ": "㋐：二酸化炭素、㋑：陽極、㋒：水酸化ナトリウム水溶液"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "炭化水素由来の合成ガスの主要成分は水素と一酸化炭素である。食塩水電解では陰極で水が還元されて水素とOH⁻が生じ、移動してきたNa⁺とともに水酸化ナトリウム水溶液になる。",
    "choiceExplanations": {
      "ア": "炭化水素由来の合成ガスの主要成分は水素と一酸化炭素である。食塩水電解では陰極で水が還元されて水素とOH⁻が生じ、移動してきたNa⁺とともに水酸化ナトリウム水溶液になる。",
      "イ": "㋐は妥当である。陽極で生成するのは塩素で、設問の水素と水酸化ナトリウム水溶液は陰極側で得られる。",
      "ウ": "陰極側の生成物は妥当である。水素とともに合成ガスの基本成分となる炭素酸化物は一酸化炭素である。",
      "エ": "水素と一酸化炭素が合成ガスを構成する。食塩水電解では陰極で水素と水酸化物イオンが生じ、塩化物イオンが酸化される陽極で塩素が出る。",
      "オ": "水酸化ナトリウム水溶液は陰極側で得られる。合成ガスの水素と組み合わさる炭素酸化物は一酸化炭素である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q25",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "ガスクロマトグラフィーの分離と理論段相当高さ",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ガスクロマトグラフィー（GC）に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ タンパク質や塩化ナトリウムは、一般にGCで分析できる。\n㋑ 分配GCでは、無極性のカラムを用いると、一般に沸点が小さい化合物から順に溶出する。\n㋒ キャリアガスの線速度を変化させたとき、理論段相当高さが最も大きくなる線速度では、分離度が最も大きくなる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "無極性の固定相では、似た化合物の分離には揮発性の違いが効きやすい。一般に低沸点の成分ほど気相にとどまりやすく、先に溶出する。",
    "choiceExplanations": {
      "ア": "GCは気化できる成分の分離に用いられる。タンパク質は加熱で分解しやすく、塩化ナトリウムも一般的なGCの条件では揮発しにくい。",
      "イ": "㋑は無極性カラムの一般的な溶出順を述べている。タンパク質や塩化ナトリウムは、通常の条件で揮発する成分を対象とするGCには適さない。",
      "ウ": "一般的なGCでは測定する成分が気化する必要がある。分離効率についても理論段相当高さが小さいほど、同じ長さのカラムの理論段数が多くなる。",
      "エ": "無極性の固定相では、似た化合物の分離には揮発性の違いが効きやすい。一般に低沸点の成分ほど気相にとどまりやすく、先に溶出する。",
      "オ": "㋑は妥当である。理論段相当高さが大きいほど同じ長さのカラムの段数が少なく、帯が広がるため、㋒の関係は逆になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q26",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "セリウムと鉄の酸化還元反応後の電位",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "0.10 mol/LのCe⁴⁺溶液10 mLを0.30 mol/LのFe²⁺溶液10 mLに加え、平衡に達したとき、この溶液中に浸した白金電極の電位として最も妥当なのはどれか。\nただし、セリウムイオンと鉄イオンの半反応式は、Ce⁴⁺＋e⁻→Ce³⁺（E°＝1.61 V）、Fe³⁺＋e⁻→Fe²⁺（E°＝0.771 V）である。反応の酸化還元電位EはE＝E°−(0.059/n)log₁₀([Red]/[Ox])で示される。ここで、E°は標準電極電位、nは反応電子数、OxとRedはそれぞれ酸化体と還元体である。また、必要に応じてlog₁₀2.0＝0.30を用いてもよい。",
    "choices": {
      "ア": "0.75 V",
      "イ": "0.79 V",
      "ウ": "0.84 V",
      "エ": "1.5 V",
      "オ": "2.4 V"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Ce⁴⁺が1.0 mmol、Fe²⁺が3.0 mmolあり、1対1で反応するとFe³⁺が1.0 mmol、Fe²⁺が2.0 mmol残る。Feの酸化還元対についてE＝0.771−0.059×0.30≃0.75 Vとなる。",
    "choiceExplanations": {
      "ア": "Ce⁴⁺が1.0 mmol、Fe²⁺が3.0 mmolあり、1対1で反応するとFe³⁺が1.0 mmol、Fe²⁺が2.0 mmol残る。Feの酸化還元対についてE＝0.771−0.059×0.30≃0.75 Vとなる。",
      "イ": "0.79 Vはネルンスト式で濃度比の向きを逆にした値に近い。還元体Fe²⁺の方が多いので、標準電位より低くなる。",
      "ウ": "反応後のFe²⁺とFe³⁺の物質量の比は2：1になる。両方の濃度は同じ体積で割るため、ネルンスト式の補正に使うのはlog₁₀2.0である。",
      "エ": "Ce⁴⁺はFe²⁺より少ないためほぼ消費され、溶液中の鉄の酸化体と還元体の比で電位を計算できる。セリウム対の標準電位に近い値にはならない。",
      "オ": "二つの標準電極電位を足して溶液中の電位を求めることはできない。反応後に共存するFe²⁺とFe³⁺の比に応じて、Fe対の標準電位を補正する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q27",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "原子吸光・原子発光・原子蛍光分析",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "原子分光分析法に関する記述㋐、㋑、㋒と、その概略図a、b、cの組合せとして最も妥当なのはどれか。\n㋐ 熱エネルギーにより原子化された元素が外部光源からの特定の波長の光を吸収し、基底状態から励起状態に移るときの吸収量を測定する。\n㋑ 熱エネルギーにより励起状態になった電子が基底状態に戻るときに出す発光を測定する。\n㋒ 原子吸光で励起状態になった電子が直ちに発光して基底状態に戻る共鳴発光現象（蛍光）を利用し測定する。",
    "choices": {
      "ア": "㋐：a、㋑：c、㋒：b",
      "イ": "㋐：b、㋑：a、㋒：c",
      "ウ": "㋐：b、㋑：c、㋒：a",
      "エ": "㋐：c、㋑：a、㋒：b",
      "オ": "㋐：c、㋑：b、㋒：a"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "吸光は光源と検出器が直線上にあるbで透過光を測り、発光は外部光源のないaで熱励起後の光を測る。蛍光は励起光と検出方向を直角にして散乱などの影響を抑えるcに対応する。",
    "choiceExplanations": {
      "ア": "吸収量の測定では外部光源が必要なので、光源を持たないaは原子発光に当たる。蛍光の測定では励起光の経路を外れた方向に検出器を置く。",
      "イ": "吸光は光源と検出器が直線上にあるbで透過光を測り、発光は外部光源のないaで熱励起後の光を測る。蛍光は励起光と検出方向を直角にして散乱などの影響を抑えるcに対応する。",
      "ウ": "bは外部光源と検出器が一直線上にあるため、吸光に対応して妥当である。熱励起で生じる発光は外部光源のないaで測り、光励起を用いる蛍光はcになる。",
      "エ": "㋑がaである点は妥当である。透過光を測る原子吸光はbで、直角方向に放出される光を拾う蛍光はcである。",
      "オ": "原子吸光では直進する光の減少を測るのでbである。aは熱励起した原子の発光を測り、外部励起光を要する原子蛍光はcに対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q27.webp"
    ],
    "imageAltTexts": [
      "三つの分光分析の概略図a、b、c。aには外部光源がなく、bには一直線上に光源と検出器、cには直角方向に光源と検出器がある。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q28",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "NMR・質量・赤外スペクトルによる構造決定",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図は、ある化合物の¹H NMRスペクトル、MSスペクトル及びIRスペクトルである。なお、NMRはジメチルスルホキシド-d₆を溶媒として、またMSスペクトルは電子イオン化法により測定されている。この化合物の構造式として最も妥当なのはどれか。",
    "choices": {
      "ア": "構造式1",
      "イ": "構造式2",
      "ウ": "構造式3",
      "エ": "構造式4",
      "オ": "構造式5"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "2HずつのNMRシグナルはパラ二置換ベンゼンに対応し、約13 ppmの1Hはカルボキシ基、IRの約2100 cm⁻¹の吸収はアジド基に合う。p-アジド安息香酸の分子イオンもm/z 163となる。",
    "choiceExplanations": {
      "ア": "構造式1はニトロ基を含む縮合複素環であり、分子イオンの質量だけでは除外できない。芳香族の水素が2Hずつ等価になる対称性がなく、IRのアジド基に対応する吸収も説明できない。",
      "イ": "構造式2の複素環は水素の環境が複数に分かれる。図では芳香族側の積分比が2：2であり、対称なパラ二置換ベンゼンに対応する。",
      "ウ": "アジド基とカルボキシ基を含む点はIRや分子イオンに合う。二つの置換基がメタ位にあるため、芳香族水素は2Hずつの等価な二組にならない。",
      "エ": "2HずつのNMRシグナルはパラ二置換ベンゼンに対応し、約13 ppmの1Hはカルボキシ基、IRの約2100 cm⁻¹の吸収はアジド基に合う。p-アジド安息香酸の分子イオンもm/z 163となる。",
      "オ": "パラ二置換で芳香族水素が2Hずつになる点は妥当である。ただし、p-フルオロ安息香酸の分子量は約140で、図の分子イオン163とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q28.webp"
    ],
    "imageAltTexts": [
      "プロトンNMRの積分比はA：B：C＝1：2：2。質量スペクトルの分子イオンはm/z 163で、赤外スペクトルを下に示す。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q28-1.webp",
      "イ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q28-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q28-3.webp",
      "エ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q28-4.webp",
      "オ": "/questions/kokka-ippan-dai/2024/senmon-kagaku/q28-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q29",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "メソ化合物と内部対称性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "化合物A～Dのうち、メソ化合物のみを挙げているのはどれか。",
    "choices": {
      "ア": "A、C",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Bは二つの炭素の置換基が両端で等しく、一方の立体中心がR、もう一方がSになって全体が鏡像と重なる。Cはシス-1,3-ジクロロシクロヘキサンで位置の対称性があり、これもメソ化合物である。",
    "choiceExplanations": {
      "ア": "二つの塩素がシスのCは内部対称性があり、妥当である。Aは二つの立体中心が同じ配置の酒石酸で、鏡像と一致しない。",
      "イ": "Aは二つの不斉中心の配置が同じ側にそろうため、メソ体ではない。Dもトランス-1,2-ジメチルシクロヘキサンで、二つの中心は鏡像を打ち消す配置にならない。",
      "ウ": "Bは二つの炭素の置換基が両端で等しく、一方の立体中心がR、もう一方がSになって全体が鏡像と重なる。Cはシス-1,3-ジクロロシクロヘキサンで位置の対称性があり、これもメソ化合物である。",
      "エ": "Bは内部対称性のあるメソ体である。Dは隣り合う炭素上のメチル基がトランスの配置で、鏡像と重ならない。",
      "オ": "Cのシス-1,3-置換では等しい塩素置換基が対称な位置にある。Dは異なる相対配置を取り、トランス-1,2-置換のためメソ体に当たらない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q29.webp"
    ],
    "imageAltTexts": [
      "A～Dの立体構造。AとBは二つの不斉炭素のくさび形表示、CとDはシクロヘキサンのいす形配座。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q30",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "芳香族求電子置換のオルト・パラ配向性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "㋐～㋓の置換基のうち、一置換ベンゼン誘導体（C₆H₅–X）の芳香族求電子置換反応においてオルト-パラ配向性を示すもののみを挙げているのはどれか。\n㋐ X＝−COCH₃\n㋑ X＝−Cl\n㋒ X＝−CN\n㋓ X＝−OCH₃",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "塩素とメトキシ基はどちらも環に結合する原子に孤立電子対があり、オルト・パラ位置での中間体を共鳴で安定化できる。塩素は環を不活性化するが、配向性はオルト・パラである。",
    "choiceExplanations": {
      "ア": "塩素は反応性を下げるが、孤立電子対の共鳴供与によりオルト・パラ配向性を示す。アセチル基のカルボニルは電子求引性で、一般にメタ配向性を示す。",
      "イ": "アセチル基とシアノ基はいずれも芳香環から共鳴で電子を引く。このため両方ともオルト・パラ配向性よりメタ配向性を示す。",
      "ウ": "メトキシ基は酸素の孤立電子対を共鳴供与し、オルトとパラの置換を促す。アセチル基は逆に電子を引くカルボニル基を通じてメタ配向性になる。",
      "エ": "塩素はオルト・パラ配向性で妥当である。シアノ基は電子を引き、一般にメタ配向性を示す。",
      "オ": "塩素とメトキシ基はどちらも環に結合する原子に孤立電子対があり、オルト・パラ位置での中間体を共鳴で安定化できる。塩素は環を不活性化するが、配向性はオルト・パラである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q31",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "メタノールとフェノール誘導体のpKₐ",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "化合物A、B、Cを、pKₐの値の大きい順に並べたものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "A＞B＞C",
      "イ": "A＞C＞B",
      "ウ": "B＞A＞C",
      "エ": "C＞A＞B",
      "オ": "C＞B＞A"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "メタノールの共役塩基は負電荷を酸素上に持ち、フェノールの共役塩基は共鳴で安定化する。Aはパラニトロ基の電子求引効果でさらに酸性が強まるため、pKₐはC＞B＞Aになる。",
    "choiceExplanations": {
      "ア": "パラニトロ基はフェノキシドイオンの負電荷を分散させ、酸性を強める。pKₐが大きいのは反対に弱酸側であり、Aが最小になる。",
      "イ": "ニトロ基の電子求引効果で、AはBよりも解離しやすい。メタノールの共役塩基には芳香族の共鳴安定化がないため、Cは最も酸性が弱くpKₐが大きい。",
      "ウ": "BのpKₐがAより大きい点は妥当である。メタノールの共役塩基はフェノキシドのような共鳴安定化を受けないので、CのpKₐが最大となる。",
      "エ": "Cが最大である点は妥当である。ニトロ基が共役塩基をさらに安定化するため、AのpKₐは無置換のBより小さい。",
      "オ": "メタノールの共役塩基は負電荷を酸素上に持ち、フェノールの共役塩基は共鳴で安定化する。Aはパラニトロ基の電子求引効果でさらに酸性が強まるため、pKₐはC＞B＞Aになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q31.webp"
    ],
    "imageAltTexts": [
      "Aはパラニトロフェノール、Bはフェノール、Cはメタノールの構造式。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q32",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "求核アシル置換反応の反応性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "化合物A、B、Cを、求核アシル置換反応における反応性の高い順に並べたものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "A＞B＞C",
      "イ": "B＞A＞C",
      "ウ": "B＞C＞A",
      "エ": "C＞B＞A",
      "オ": "C＞A＞B"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "塩化アシルBは脱離基Cl⁻が安定で反応しやすく、エステルAが続く。アミドCでは窒素からカルボニルへの共鳴供与が強く、脱離もしにくいため反応性が最も低い。",
    "choiceExplanations": {
      "ア": "Cのアミドは最も反応しにくい。塩化アシルBはCl⁻が離れやすくカルボニル炭素の反応性も高いので、エステルAより上になる。",
      "イ": "塩化アシルBは脱離基Cl⁻が安定で反応しやすく、エステルAが続く。アミドCでは窒素からカルボニルへの共鳴供与が強く、脱離もしにくいため反応性が最も低い。",
      "ウ": "Bが最も高いのは妥当である。アミドの窒素の強い共鳴供与と脱離しにくさにより、CはエステルAより低い。",
      "エ": "アミドCのC–N結合は共鳴で部分的な二重結合性を持つ。求核アシル置換では塩化アシルBの方が反応しやすく、Cを先頭には置かない。",
      "オ": "塩化アシルはカルボニル炭素が求電子性を示し、塩化物イオンが脱離しやすい。アミドは求核置換されにくく、C＞A＞Bの順は逆になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q32.webp"
    ],
    "imageAltTexts": [
      "Aは酢酸メチル、Bは塩化アセチル、Cはアセトアミドの構造式。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q33",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "マロン酸エステル合成の生成物",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "化合物A、B、Cのうち、図の反応により合成できるものとして妥当なもののみを全て挙げているのはどれか。ただし、RClは塩化アルキル化合物を表す。",
    "choices": {
      "ア": "A",
      "イ": "A、B",
      "ウ": "A、B、C",
      "エ": "B、C",
      "オ": "C"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "一回のアルキル化でRを導入し、加水分解と脱炭酸を行うとR–CH₂–COOHの骨格になる。AとBはこの形で、カルボキシ基に隣接する炭素にメチル基三つが直結したCはこの反応からは得られない。",
    "choiceExplanations": {
      "ア": "直鎖のAは、マロン酸エステルの中央炭素に直鎖アルキル基が導入された場合に得られる。Bも分枝したアルキル基が同じ炭素に結合する構造で説明できる。",
      "イ": "一回のアルキル化でRを導入し、加水分解と脱炭酸を行うとR–CH₂–COOHの骨格になる。AとBはこの形で、カルボキシ基に隣接する炭素にメチル基三つが直結したCはこの反応からは得られない。",
      "ウ": "AとBはR–CH₂–COOHの形を持つ。Cではカルボキシ基の隣の炭素が三つのメチル基を持つため、示された一回のアルキル化の生成物にはならない。",
      "エ": "分枝がカルボキシ基の隣の炭素より先にあるBは該当する。直鎖のAも該当し、Cのようにカルボキシ基のすぐ隣が四置換された骨格は得られない。",
      "オ": "反応でRを導入する炭素は、脱炭酸後にはカルボキシ基の隣のCH₂になる。Cの同じ位置は水素のない炭素なので、示された生成物の形に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q33.webp"
    ],
    "imageAltTexts": [
      "マロン酸エステルを塩基で処理し、RClとの反応を経て、加水分解と加熱を行う反応式。候補A～Cのカルボン酸の構造を示す。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q34",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "環状アルケンのsyn付加とanti付加",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "反応A～Dのうち、主生成物の立体化学を正しく表したものとして妥当なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "A、B、C",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C、D",
      "オ": "B、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aでは同じ面に二つのOHが加わり、シスジオールになる。Dでは中間体の反対面から開環するためOHとClが互いに反対側に入り、図のトランスの生成物が得られる。",
    "choiceExplanations": {
      "ア": "Aでは二つのOHが同じ面に付くため、図のシスの生成物が妥当である。Bの開環とCの臭素付加はどちらも反対側からの攻撃を含むので、図の同じ面の生成物は妥当でない。",
      "イ": "Aのジオールはsyn付加のため妥当である。Cでは環状のブロモニウムイオンの反対面から攻撃が起こるので、二つのBrはトランスになる。",
      "ウ": "Aでは同じ面に二つのOHが加わり、シスジオールになる。Dでは中間体の反対面から開環するためOHとClが互いに反対側に入り、図のトランスの生成物が得られる。",
      "エ": "Dは妥当である。Bのエポキシド開環もCの臭素付加も、攻撃が中間体の結合の反対側から起こり、図のシス体ではなくトランス体を与える。",
      "オ": "Dのクロロヒドリンの立体配置は妥当である。Bのエポキシドを開く反応は反対面から進むため、二つのOHは図のようなシス配置にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q34.webp"
    ],
    "imageAltTexts": [
      "四つの反応A～Dと生成物の立体構造。Aは環状アルケンのジオール生成、Bはエポキシド開環、Cは臭素付加、Dはクロロヒドリン生成。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q35",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "高分子化学",
    "topicTags": [
      "天然高分子と無機網目構造",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "天然高分子に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ エビ、カニ、昆虫類などの殻をつくるキチンは多糖類である。\n㋑ ゴムの木から取り出した天然ゴムは、加硫することでゴム弾性が高まる。\n㋒ 水晶は正四面体形のSiO₄が、互いに頂点にある酸素を共有して規則的に配列した二酸化ケイ素から成る高分子である。\n㋓ ゼラチンは、ゲル化しやすい性質をもつ多糖類を主成分とする。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "キチンは糖の誘導体が多数つながった多糖類で、天然ゴムは加硫で分子鎖間に架橋ができ、ゴム弾性を示しやすくなる。水晶ではSiO₄四面体が酸素を共有して三次元の網目を作る。",
    "choiceExplanations": {
      "ア": "キチンが多糖類である点と、加硫により弾性が高まる点は妥当である。酸素を共有して連続するSiO₄の網目でできた水晶の記述も含める。",
      "イ": "キチンは糖の誘導体が多数つながった多糖類で、天然ゴムは加硫で分子鎖間に架橋ができ、ゴム弾性を示しやすくなる。水晶ではSiO₄四面体が酸素を共有して三次元の網目を作る。",
      "ウ": "㋐と㋒は妥当である。ゼラチンはコラーゲンに由来するタンパク質成分であり、加硫による架橋を述べた㋑は妥当である。",
      "エ": "㋑と㋒は妥当である。キチンはN-アセチルグルコサミンを繰り返し単位とする多糖なので、㋐も含める。",
      "オ": "ゼラチンはコラーゲンを処理して得られるタンパク質であり、多糖類ではない。一方、甲殻や昆虫の外骨格を構成するキチンは多糖に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q36",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "高分子化学",
    "topicTags": [
      "カチオン界面活性剤の親水基",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "界面活性剤㋐、㋑、㋒のうち、カチオン界面活性剤として妥当なもののみを全て挙げているのはどれか。\n㋐ ポリオキシエチレンアルキルエーテル\n㋑ アルキル硫酸エステルナトリウム\n㋒ アルキルトリメチルアンモニウムクロリド",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋒では疎水性のアルキル鎖を持つ第四級アンモニウムが陽イオンで、塩化物はその対イオンである。㋐は非イオン型、㋑はアニオン型なので該当するのは㋒のみである。",
    "choiceExplanations": {
      "ア": "ポリオキシエチレン鎖のエーテル酸素が水と相互作用するが、親水部は電荷を持たない。したがって㋐は非イオン性界面活性剤である。",
      "イ": "㋐は非イオン性で、㋑ではアルキル硫酸エステルの部分が負電荷を持つ。親水部が正電荷の界面活性剤はこの二つに含まれない。",
      "ウ": "アルキル硫酸エステルナトリウムでは、ナトリウムイオンは対イオンである。疎水性のアルキル鎖を持つ界面活性剤本体は陰イオンになる。",
      "エ": "㋒の第四級アンモニウムは正電荷を持つが、㋑の疎水鎖に結合した硫酸エステル基は負電荷を持つ。㋑はアニオン型なので含めない。",
      "オ": "㋒では疎水性のアルキル鎖を持つ第四級アンモニウムが陽イオンで、塩化物はその対イオンである。㋐は非イオン型、㋑はアニオン型なので該当するのは㋒のみである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q37",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "ヒスチジン側鎖と酵素の酸塩基触媒",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "タンパク質を構成する塩基性アミノ酸に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n塩基性アミノ酸である㋐は、正電荷をもつことのできる芳香環である㋑基を含む。㋑基はpKₐ値が6に近いため、中性pH近くでは局所環境に応じて電荷をもたないか正電荷をもつようになる。㋐はしばしば酵素の活性部位に見いだされ、そこでは㋑環は酵素反応の過程で㋒と結合したり解離したりする。",
    "choices": {
      "ア": "㋐：アルギニン、㋑：グアニジウム、㋒：プロトン",
      "イ": "㋐：ヒスチジン、㋑：インドール、㋒：アミン",
      "ウ": "㋐：ヒスチジン、㋑：イミダゾール、㋒：プロトン",
      "エ": "㋐：リシン、㋑：イミダゾール、㋒：アミン",
      "オ": "㋐：リシン、㋑：グアニジウム、㋒：アミン"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ヒスチジン側鎖のイミダゾールはpKₐが6付近であり、中性付近で環境に応じてプロトン化の状態が変わる。このため酵素の活性部位でプロトンを受け渡す役割を担える。",
    "choiceExplanations": {
      "ア": "アルギニンのグアニジノ基の共役酸は通常の中性付近で正電荷を保ちやすく、pKₐは6よりかなり高い。イミダゾール環を持つヒスチジンがこの条件に合う。",
      "イ": "ヒスチジンは妥当であるが、インドール環を持つアミノ酸はトリプトファンである。酸塩基触媒で結合したり解離したりするのはプロトンである。",
      "ウ": "ヒスチジン側鎖のイミダゾールはpKₐが6付近であり、中性付近で環境に応じてプロトン化の状態が変わる。このため酵素の活性部位でプロトンを受け渡す役割を担える。",
      "エ": "イミダゾール環が入る点は妥当である。リシン側鎖にあるのは末端のアミノ基で、イミダゾール環を持つのはヒスチジンである。",
      "オ": "リシンは側鎖に末端アミノ基を持ち、アルギニンはグアニジノ基を持つ。中性付近の酵素反応でプロトンを受け渡すイミダゾール環はヒスチジンにある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q38",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "ラインウィーバー・バークプロットと競合阻害",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "グラフは、酵素の阻害剤が一定濃度で含まれる場合と含まれない場合について、酵素の反応速度Vと基質濃度[S]の実験データをラインウィーバー・バークプロットで表したものである。この酵素反応に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\nこの酵素の最大反応速度V_maxは㋐ µmol/minであり、阻害剤のない場合のミカエリス定数Kₘは㋑ µmol/Lである。また、この阻害剤の阻害形式は㋒である。",
    "choices": {
      "ア": "㋐：0.02、㋑：0.1、㋒：競合阻害",
      "イ": "㋐：0.02、㋑：10、㋒：非競合阻害",
      "ウ": "㋐：0.1、㋑：50、㋒：非競合阻害",
      "エ": "㋐：50、㋑：0.1、㋒：非競合阻害",
      "オ": "㋐：50、㋑：10、㋒：競合阻害"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "縦軸切片1/V_max＝0.02からV_max＝50 µmol/min、阻害剤なしの横軸切片−1/Kₘ＝−0.1からKₘ＝10 µmol/Lである。阻害剤添加で縦軸切片は同じまま傾きが増えるので、競合阻害となる。",
    "choiceExplanations": {
      "ア": "競合阻害という判断は妥当である。ただし、縦軸切片は1/V_max、横軸切片は−1/Kₘなので、読み取った数の逆数を取って定数を求める。",
      "イ": "阻害剤なしのKₘは10 µmol/Lで妥当である。縦軸切片は逆速度なのでV_maxは50 µmol/minとなり、この切片が変わらないのは競合阻害の特徴である。",
      "ウ": "0.1は阻害剤なしの場合の横軸切片の絶対値で、反応速度ではない。横軸切片からKₘは10、共通の縦軸切片からV_maxは50となる。",
      "エ": "V_maxは50で妥当である。横軸切片−0.1からKₘは10となり、阻害剤があってもV_maxが同じで見かけのKₘだけが増えるので競合阻害である。",
      "オ": "縦軸切片1/V_max＝0.02からV_max＝50 µmol/min、阻害剤なしの横軸切片−1/Kₘ＝−0.1からKₘ＝10 µmol/Lである。阻害剤添加で縦軸切片は同じまま傾きが増えるので、競合阻害となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q38.webp"
    ],
    "imageAltTexts": [
      "阻害剤ありの破線となしの実線の1/V対1/[S]プロット。縦軸切片はほぼ共通の0.02で、阻害剤なしの横軸切片は−0.1。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q39",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "RNAの触媒作用と核酸の構成単位",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "核酸に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ RNAの中には、酵素のように触媒作用をもつものがある。\n㋑ DNAは2′位にヒドロキシ基がないため塩基触媒による加水分解を受けにくく、RNAより化学的に安定である。\n㋒ 核酸は糖、リン酸、塩基が1分子ずつ結合したヌクレオシドという単位から成る。\n㋓ 2′,3′-ジデオキシヌクレオシド三リン酸はDNAの配列解析に利用される。",
    "choices": {
      "ア": "㋐、㋑、㋓",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "触媒作用を持つRNAはリボザイムと呼ばれ、DNAは2′-OHがないためRNAより塩基性条件で加水分解されにくい。ジデオキシヌクレオシド三リン酸はDNA鎖の伸長を止めるため、配列決定に用いられる。",
    "choiceExplanations": {
      "ア": "触媒作用を持つRNAはリボザイムと呼ばれ、DNAは2′-OHがないためRNAより塩基性条件で加水分解されにくい。ジデオキシヌクレオシド三リン酸はDNA鎖の伸長を止めるため、配列決定に用いられる。",
      "イ": "触媒作用を持つRNAがある点は妥当である。糖と塩基からなるヌクレオシドにリン酸が結合したものがヌクレオチドで、核酸はその繰り返しでできる。",
      "ウ": "㋐と㋓は妥当である。DNAは2′-OHを持たないためRNAより塩基性条件で切断されにくく、リン酸を含む構成単位をヌクレオシドと呼ぶ㋒は誤りである。",
      "エ": "DNAが塩基触媒による加水分解を受けにくい㋑は妥当である。糖と塩基にリン酸もついた単位はヌクレオチドと呼ばれる。",
      "オ": "㋑と㋓は妥当である。RNAにも特定の化学反応を促進するリボザイムがあるので、㋐も含める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q40",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "脂質二重層の面積から求める分子数",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある細胞膜のリン脂質二重層の表面において、リン脂質1分子が0.70 nm²の面積を占めるとする。このリン脂質二重層を1 µm²切り取ってできたリン脂質二重層に含まれるリン脂質分子の数として最も妥当なのはどれか。\nただし、このリン脂質二重層はリン脂質のみで構成されているものとする。",
    "choices": {
      "ア": "1.4×10³",
      "イ": "2.9×10³",
      "ウ": "1.4×10⁶",
      "エ": "2.9×10⁶",
      "オ": "1.4×10⁷"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "面積1 µm²は10⁶ nm²なので、一層の分子数は10⁶/0.70となる。二つの層があるので全体は2×10⁶/0.70≃2.9×10⁶である。",
    "choiceExplanations": {
      "ア": "1 µm＝1000 nmであり、面積では換算比を二乗する。1 µm²は10³ nm²ではなく10⁶ nm²なので、分子数は千個の桁より大きい。",
      "イ": "二層の分を二倍する点は必要である。各層の面積は10⁶ nm²であり、面積の換算を長さの場合と同じ10³倍にはしない。",
      "ウ": "この数は10⁶ nm²を0.70 nm²で割った片側の層の分子数に当たる。二重層全体では分子数を二倍する。",
      "エ": "面積1 µm²は10⁶ nm²なので、一層の分子数は10⁶/0.70となる。二つの層があるので全体は2×10⁶/0.70≃2.9×10⁶である。",
      "オ": "一層は10⁶/0.70≃1.4×10⁶分子である。二層の合計では二倍するため、10⁷の桁には達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q41",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "食塩をトレーサーとする流量の物質収支",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "水路を流れる水の流量を測定するため、15 wt%の食塩水を毎分1 kgの割合で注いだところ、十分長い時間が経過したのち、下流における食塩の濃度は0.2 wt%となった。このとき、食塩水を注ぐ前の水路の水の流量（kg/min）として最も妥当なのはどれか。",
    "choices": {
      "ア": "26",
      "イ": "38",
      "ウ": "50",
      "エ": "62",
      "オ": "74"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "元の水路の流量をW kg/minとすると、食塩の流量は0.15 kg/min、混合後の流量はW＋1である。0.002(W＋1)＝0.15からW＝74 kg/minとなる。",
    "choiceExplanations": {
      "ア": "添加した食塩は毎分0.15 kgである。元の流量が26 kg/minだと混合後は27 kg/minとなり、濃度は約0.56 wt%になる。",
      "イ": "元の水と添加液を合わせた質量流量に0.002を掛けると、食塩流量0.15 kg/minに等しくなる。したがって混合後の流量は75 kg/minとなる。",
      "ウ": "元の流量50 kg/minなら混合後は51 kg/minとなる。毎分0.15 kgの食塩をこの流量で割ると約0.29 wt%であり、測定値より高い。",
      "エ": "元の流量62 kg/minでは、注入分を含む流量は63 kg/minとなる。食塩の質量分率は0.15/63≃0.00238で、0.002より大きい。",
      "オ": "元の水路の流量をW kg/minとすると、食塩の流量は0.15 kg/min、混合後の流量はW＋1である。0.002(W＋1)＝0.15からW＝74 kg/minとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q42",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "円筒壁の定常熱伝導",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "内半径r₁ [m]、外半径r₂ [m]、長さL [m]の円筒について考える。内表面での温度をT₁ [K]、外表面での温度をT₂ [K]とすると、T₁＞T₂のとき、熱は内表面から外表面に向かって移動する。このとき、単位時間当たりに移動する熱量q [W]として最も妥当なのはどれか。\nただし、円筒内は定常状態であるものとし、熱伝導度をk [W/(m·K)]とする。",
    "choices": {
      "ア": "(π/2)kL(T₁−T₂)ln(r₂/r₁)",
      "イ": "πkL(T₁−T₂)ln(r₂/r₁)",
      "ウ": "2πkL(T₁−T₂)ln(r₂/r₁)",
      "エ": "πkL(T₁−T₂)/ln(r₂/r₁)",
      "オ": "2πkL(T₁−T₂)/ln(r₂/r₁)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "定常伝導の式はq＝−k(2πrL)dT/drである。r₁からr₂まで積分するとq ln(r₂/r₁)＝2πkL(T₁−T₂)となるので、この式を得る。",
    "choiceExplanations": {
      "ア": "円筒の熱抵抗は半径方向にdr/(2πrkL)を積分して求める。半径比の対数は抵抗の側に出るので、伝熱量はその対数で割る。",
      "イ": "半径rで熱の通過する面積は2πrLである。定常伝熱の抵抗を求めると、熱量の式では2πが分子に、半径比の対数が分母に現れる。",
      "ウ": "係数2πは円周の長さから現れる。ただし半径比の対数は熱抵抗に比例し、同じ温度差で円筒壁が厚くなると熱量は小さくなる。",
      "エ": "対数で割る点は妥当である。円筒の側面積は半径rで2πrLとなるため、式の分子はπではなく2πを含む。",
      "オ": "定常伝導の式はq＝−k(2πrL)dT/drである。r₁からr₂まで積分するとq ln(r₂/r₁)＝2πkL(T₁−T₂)となるので、この式を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q43",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "沈降・ろ過・晶析における固液分離",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "固液分離に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 沈降分離において、スラリーの固体濃度が低い場合、懸濁粒子は自由沈降する。濃度が高いと粒子の沈降は周りの他の粒子の影響を受け、一般にその沈降速度は自由沈降の場合より小さくなる。\n㋑ ろ過において、一定圧力でろ過を行うと、スラリーの固体濃度が高い場合には、ろ材面上にろ過ケークが形成され、ケークの成長につれろ過速度は次第に減少する。\n㋒ 晶析において、晶析現象は、液相内における結晶核の発生とそれに続いて生じる結晶核の成長とから成る。結晶核の発生は飽和濃度以上の濃度である必要があるが、結晶核の成長は飽和濃度以上の濃度である必要はない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "粒子が多いスラリーでは干渉沈降によって個々の沈降速度が低下しやすい。定圧ろ過ではケークが厚くなると抵抗が増し、速度が下がる。",
    "choiceExplanations": {
      "ア": "粒子濃度が高いと互いの影響で沈降が妨げられるので、㋐は妥当である。定圧ろ過で積もったケークの抵抗が増え、速度が下がる㋑も妥当である。",
      "イ": "粒子が多いスラリーでは干渉沈降によって個々の沈降速度が低下しやすい。定圧ろ過ではケークが厚くなると抵抗が増し、速度が下がる。",
      "ウ": "ろ材にケークが積み重なると同じ圧力差で流れにくくなる。濃度の高いスラリーで粒子が互いに影響し沈降が遅くなる㋐も妥当である。",
      "エ": "定圧ろ過でケークの発達によりろ過速度が落ちる㋑は妥当である。結晶が正味で成長するには通常、溶液中の溶質が過飽和であることを要する。",
      "オ": "核生成や結晶の成長は、溶液が平衡溶解度を超えた過飽和を駆動力とする。飽和未満の溶液では、結晶は成長するより溶解に向かう。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-kagaku-q44",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "併発反応の転化率・収率と反応エンタルピー",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "原料ガスとして化学種A（モル流量100 mol/min）と化学種B（モル流量600 mol/min）を流通式反応器に供給する。このとき、式①及び②の気相反応により気体の主生成物Cと気体の副生成物Dが生成し、式①、②以外の反応は起きないものとする。\n① A＋2B→C\n② A＋B→D\n化学種Aはこれらの反応により、反応器において100%転化した。また、反応器出口における主生成物Cの収率は、供給される化学種Aに対して80.0%であった。このとき、原料ガスを反応器に供給したときの、反応器全体での1分間当たりのエンタルピー変化（kJ/min）として最も妥当なのはどれか。\nただし、各化学種A～Dの標準生成エンタルピーは表のとおりである。また、反応器内の温度は298 Kであり、圧力は一定と見なしてよいものとし、流通式反応器の外部との熱エネルギーのやり取りはないものとする。",
    "choices": {
      "ア": "−8410 kJ/min",
      "イ": "−7590 kJ/min",
      "ウ": "−6360 kJ/min",
      "エ": "−3590 kJ/min",
      "オ": "−3360 kJ/min"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "毎分Cが80 mol、Dが20 mol生成するため、表から求める298 Kでの反応エンタルピー変化は80×(−100)＋20×20.5＝−7590 kJ/minである。断熱運転の全エネルギー収支を取る場合は、流入・流出の温度差による顕熱の変化も考慮する。",
    "choiceExplanations": {
      "ア": "主反応は毎分80 mol進み、その寄与は−8000 kJ/minである。副反応は1 mol当たり−79.5−(−100)＝＋20.5 kJの吸熱なので、全体に＋410 kJ/minを足す。",
      "イ": "毎分Cが80 mol、Dが20 mol生成するため、表から求める298 Kでの反応エンタルピー変化は80×(−100)＋20×20.5＝−7590 kJ/minである。断熱運転の全エネルギー収支を取る場合は、流入・流出の温度差による顕熱の変化も考慮する。",
      "ウ": "Cの収率80%を使うと毎分80 molが主反応に、残り20 molが副反応に向かう。副反応の正の寄与は20×20.5＝410 kJ/minに限られる。",
      "エ": "主反応のエンタルピーは生成物Cの−200から反応物Aの−100を差し引いた−100 kJ/molである。毎分80 molがこの反応をするので、その寄与だけで−8000 kJ/minとなる。",
      "オ": "Aは全量転化する一方、Cは供給したAの80%だけ生成する。二つの反応を同じ進行量として計算せず、各反応の標準反応エンタルピーに80と20 mol/minをそれぞれ掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007510.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-kagaku/q44.webp"
    ],
    "imageAltTexts": [
      "298 Kの標準生成エンタルピーの表。Aは−100、Bは0、Cは−200、Dは−79.5 kJ/mol。"
    ]
  }
];
