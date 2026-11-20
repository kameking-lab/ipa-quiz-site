import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2026_SENMON_KAGAKU_SEIBUTSU_YAKUGAKU: Question[] = [
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q003",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "凝固点降下から求める分子量",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ある純物質4.0 gを水250 gに溶かしたとき、この水溶液の凝固点は−0.37 ℃であった。このとき、この純物質の分子量として最も妥当なのはどれか。\nただし、この純物質は不揮発性の非電解質であり、水のモル凝固点降下を1.85 K・kg・mol⁻¹とする。",
    "choices": {
      "ア": "40",
      "イ": "50",
      "ウ": "60",
      "エ": "70",
      "オ": "80"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "溶質の質量モル濃度は0.37／1.85＝0.20 mol／kgで、水0.250 kgに溶けた量は0.050 molである。質量4.0 gをこの物質量で割ると80 g／molである。",
    "choiceExplanations": {
      "ア": "分子量40なら4.0 gは0.10 molであり、250 gの水に溶かすと質量モル濃度は0.40 mol／kgになる。予想される凝固点降下0.74 Kは観測値の二倍である。",
      "イ": "非電解質なので溶質一分子がそのまま一粒子として数えられる。凝固点降下0.37 Kを1.85で割ると0.20 mol／kgであり、4.0 gは0.05 molである。",
      "ウ": "分子量60では溶質が約0.067 molとなる。水0.250 kgに対して計算した凝固点降下は約0.49 Kになる。",
      "エ": "分子量70を使うと、質量モル濃度は約0.229 mol／kgである。観測値に対応する0.200 mol／kgより大きい。",
      "オ": "溶質の質量モル濃度は0.37／1.85＝0.20 mol／kgで、水0.250 kgに溶けた量は0.050 molである。質量4.0 gをこの物質量で割ると80 g／molである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q004",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "弱酸近似による酢酸水溶液のpH",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "25 ℃、0.030 mol・L⁻¹の酢酸水溶液のpHとして最も妥当なのはどれか。\nただし、25 ℃における酢酸の電離定数を2.7×10⁻⁵ mol・L⁻¹、log₁₀ 3＝0.477とし、酢酸の電離度は1に比べて十分小さいものとする。",
    "choices": {
      "ア": "2.5",
      "イ": "3.0",
      "ウ": "3.5",
      "エ": "4.0",
      "オ": "4.5"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "電離量をxとすると、電離度が小さいためK_a≈x²／0.030と置ける。x＝9.0×10⁻⁴ mol／LなのでpHは4−2×0.477＝3.046である。",
    "choiceExplanations": {
      "ア": "pH 2.5では水素イオン濃度が約3.2×10⁻³ mol／Lである。電離平衡から求めた約9.0×10⁻⁴ mol／Lより大きい。",
      "イ": "電離量をxとすると、電離度が小さいためK_a≈x²／0.030と置ける。x＝9.0×10⁻⁴ mol／LなのでpHは4−2×0.477＝3.046である。",
      "ウ": "pH 3.5に当たる濃度は約3.2×10⁻⁴ mol／Lである。与えられた電離定数と濃度の積の平方根より小さい。",
      "エ": "pH 4.0では濃度は10⁻⁴ mol／Lであるが、平衡計算ではその9倍になる。指数だけでなく係数9の対数も引く必要がある。",
      "オ": "電離定数の負の常用対数は約4.57だが、これはpK_aである。水溶液のpHには酢酸の初濃度も関係し、[H⁺]≈√(K_a C)を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q005",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "グアニジン、アミド、アルケンのプロトン化",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の分子㋐、㋑、㋒におけるそれぞれの原子a、bのうち、水素イオン（H⁺）の付加がより起こりやすい方を選び出したものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "a ／ a ／ b",
      "イ": "a ／ b ／ b",
      "ウ": "b ／ a ／ a",
      "エ": "b ／ b ／ a",
      "オ": "b ／ b ／ b"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐はイミン型のNに付加すると正電荷を三つのNで共鳴非局在化でき、㋑はアミドのカルボニルOが優先する。㋒は末端炭素bへの付加で、内部炭素により安定な第二級カルボカチオンができる。",
    "choiceExplanations": {
      "ア": "㋐はイミン型のNに付加すると正電荷を三つのNで共鳴非局在化でき、㋑はアミドのカルボニルOが優先する。㋒は末端炭素bへの付加で、内部炭素により安定な第二級カルボカチオンができる。",
      "イ": "㋐と㋒は妥当である。㋑のNの孤立電子対はカルボニルと共鳴しているので、優先的にプロトン化されるのはOである。",
      "ウ": "㋑のOは妥当だが、㋐のbは中央の炭素で、求電子的なプロトンは電子対を持つNのaに付加しやすい。㋒でaに付加すると末端に第一級カルボカチオンができる。",
      "エ": "㋐ではN上のプロトン化で共鳴安定化が得られる。㋑ではOへの付加、㋒ではより置換されたカルボカチオンを生むbへの付加が有利である。",
      "オ": "㋒は妥当である。㋐の中央Cよりイミン型N、㋑のアミドNよりカルボニルOがプロトン化を受けやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q005.webp"
    ],
    "imageAltTexts": [
      "グアニジン、アセトアミド及びプロペンの原子aとb"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q006",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "ハロゲン化合物の沸点と分子間力",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰ、Ⅱ、Ⅲは、ハロゲン分子（X₂）、ハロゲン化水素（HX）、ハロゲン化メチル（CH₃X）のいずれかの物質群について、それらを構成するハロゲンX（F、Cl、Br、I）と各物質の1気圧における沸点の関係を表したものである。それぞれの物質群の沸点を表している図の組合せとして最も妥当なのはどれか。\nなお、図中の太線は室温（25 ℃）を示している。",
    "choices": {
      "ア": "図Ⅰ ／ 図Ⅱ ／ 図Ⅲ",
      "イ": "図Ⅰ ／ 図Ⅲ ／ 図Ⅱ",
      "ウ": "図Ⅱ ／ 図Ⅰ ／ 図Ⅲ",
      "エ": "図Ⅱ ／ 図Ⅲ ／ 図Ⅰ",
      "オ": "図Ⅲ ／ 図Ⅱ ／ 図Ⅰ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "X₂はハロゲン分子が大きくなるほど分散力が強まり、図ⅠのようにF₂からI₂まで沸点が大きく上がる。HFが水素結合で突出するHXは図Ⅲで、単調に上がる残りの図ⅡがCH₃Xである。",
    "choiceExplanations": {
      "ア": "X₂は図Ⅰで妥当である。HXではHFだけが強い水素結合で高い沸点を示し、FからClに替えたときに大きく下がる図Ⅲに対応する。",
      "イ": "X₂はハロゲン分子が大きくなるほど分散力が強まり、図ⅠのようにF₂からI₂まで沸点が大きく上がる。HFが水素結合で突出するHXは図Ⅲで、単調に上がる残りの図ⅡがCH₃Xである。",
      "ウ": "図Ⅰは室温付近をまたいで幅広い沸点を示すX₂である。HXの識別にはHFとHClの間で沸点が逆転することを使う。",
      "エ": "HXは図Ⅲで妥当である。X₂のBr₂とI₂は室温より高い沸点を持つので、Brの点が室温線を上回る図Ⅰに当たる。",
      "オ": "X₂のF₂は分散力が弱く、Cl₂よりかなり低い沸点を示す。図ⅢのFでの上昇はHFの水素結合によるもので、X₂には対応しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q006.webp"
    ],
    "imageAltTexts": [
      "室温を基準とするハロゲン化合物の三つの沸点曲線"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q007",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "原形質分離と膨圧による浸透圧の釣り合い",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰ、Ⅱ、Ⅲは、植物細胞を様々な濃度のスクロース水溶液に浸し、十分な時間放置したときの細胞を模式的に表したものである。このとき、細胞内液の浸透圧と外部の液体の浸透圧が等しいと判断できるもののみを全て挙げているのはどれか。\n\n図Ⅰ　細胞膜と細胞壁との間に明らかな隙間が存在する。\n図Ⅱ　細胞膜が細胞壁から分離するかしないかの状態である。\n図Ⅲ　細胞が明らかに膨らんでいる状態である。",
    "choices": {
      "ア": "図Ⅰ、図Ⅱ",
      "イ": "図Ⅰ、図Ⅲ",
      "ウ": "図Ⅱ",
      "エ": "図Ⅱ、図Ⅲ",
      "オ": "図Ⅲ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Ⅰは原形質分離が進んでおり、Ⅱは細胞膜が壁から離れ始める限界で、どちらも膨圧がほぼ0である。十分に時間がたった水のつり合いでは、膨圧が0なら内外の浸透圧が等しい。",
    "choiceExplanations": {
      "ア": "Ⅰは原形質分離が進んでおり、Ⅱは細胞膜が壁から離れ始める限界で、どちらも膨圧がほぼ0である。十分に時間がたった水のつり合いでは、膨圧が0なら内外の浸透圧が等しい。",
      "イ": "Ⅰは膨圧が0なので含まれる。Ⅲでは膨圧が正であり、内外の水ポテンシャルが等しくても浸透圧には差がある。",
      "ウ": "Ⅱでは膨圧が消えるため該当する。Ⅰでも細胞膜が壁から離れて膨圧がなく、十分な時間の後には内外の浸透圧が等しくなる。",
      "エ": "Ⅱは妥当だが、Ⅲは膨圧がある。Ⅲでは浸透圧による水の流入傾向と、細胞壁による圧力が釣り合っている。",
      "オ": "膨らんだⅢは細胞壁が圧力を受けている状態である。細胞内液のより高い浸透圧と正の膨圧が釣り合う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q007.webp"
    ],
    "imageAltTexts": [
      "植物細胞の原形質分離前後と膨らんだ状態"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q008",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "分裂期細胞の割合から求めるM期の長さ",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "コルセミドという試薬は分裂期（M期）の中期で細胞周期を止めるはたらきがある。下図は、³Hチミジンとコルセミドを培養液に加え、時間を追って³Hで標識されたDNAをもつ細胞とM期の細胞の割合を調べた結果をグラフにしたものである。この細胞のM期に要する時間として最も妥当なのはどれか。\nただし、実験開始の時点で全ての細胞において、細胞周期は動いているものとする。また、M期のうち、後期と終期に要する時間は無視できるほど短いものとする。",
    "choices": {
      "ア": "0.1時間",
      "イ": "0.5時間",
      "ウ": "1時間",
      "エ": "1.5時間",
      "オ": "2時間"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図②から最初にM期の細胞が5％おり、コルセミドによる蓄積速度は毎時10パーセントポイントである。後期と終期を無視すると、M期の長さは5÷10＝0.5時間となる。",
    "choiceExplanations": {
      "ア": "図②ではM期細胞の割合が1時間に10パーセントポイント増える。初期のM期細胞は5％あり、0.1時間で流入する量の1％より多い。",
      "イ": "図②から最初にM期の細胞が5％おり、コルセミドによる蓄積速度は毎時10パーセントポイントである。後期と終期を無視すると、M期の長さは5÷10＝0.5時間となる。",
      "ウ": "M期の割合5％は、図②が1時間かけて増加する10ポイントの半分に当たる。初期割合を傾きで割ると0.5時間である。",
      "エ": "図③が増え始めるまでの約1.5時間は、標識され得る細胞がM期に達するまでの待ち時間を示す。M期そのものの長さには図②の最初の割合と増加速度を使う。",
      "オ": "2時間は図②と③の直線の間隔を傾きで割ったときの値に当たる。開始時にM期にいた細胞の通過時間は、図②の切片5を傾き10で割って求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q008.webp"
    ],
    "imageAltTexts": [
      "標識された細胞、M期細胞と両条件を満たす細胞の割合の時間変化"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q009",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "生体の主要元素と植物の炭水化物",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "生物を構成する物質に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ヒトの生体は主に約20種類の元素で構成されている。生体内の元素の割合（質量％）は、多い順に［㋐］であり、金属元素では［㋑］が最も多い。また、生物を構成する物質には水やタンパク質、炭水化物、脂質、核酸などがあるが、植物細胞では動物細胞に比べ、水に次いで［㋒］の割合が高いという特徴がある。」",
    "choices": {
      "ア": "C＞O＞H ／ Ca ／ タンパク質",
      "イ": "C＞O＞H ／ Fe ／ 炭水化物",
      "ウ": "O＞C＞H ／ Ca ／ 炭水化物",
      "エ": "O＞C＞H ／ Fe ／ タンパク質",
      "オ": "O＞H＞C ／ Na ／ タンパク質"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "人体の質量では水に含まれるOの寄与が大きく、O、C、Hの順になる。金属元素ではCaが多く、植物細胞では細胞壁のセルロースや貯蔵デンプンなどの炭水化物が多い。",
    "choiceExplanations": {
      "ア": "金属元素のうちカルシウムが多いことは妥当である。人体には水が多く質量比ではOがCより多く、植物にはセルロースなどの炭水化物が多い。",
      "イ": "植物細胞で炭水化物の割合が高いことは妥当である。人体で最も質量割合が高いのはOであり、金属では骨などに多いCaがFeを上回る。",
      "ウ": "人体の質量では水に含まれるOの寄与が大きく、O、C、Hの順になる。金属元素ではCaが多く、植物細胞では細胞壁のセルロースや貯蔵デンプンなどの炭水化物が多い。",
      "エ": "元素の順は妥当である。人体全体の金属元素では骨や歯に多いカルシウムが鉄より多く、植物の細胞壁には多量の炭水化物がある。",
      "オ": "水素は原子数では多くても質量比では炭素より少ない。金属ではナトリウムよりカルシウムが多く、植物で目立つ有機成分は炭水化物である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q010",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "肢芽でのZPA移植と指の前後パターン",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "四肢動物の肢芽の基部側の後方には、肢芽の前方に向かって、シグナルとなる分泌タンパク質を放出する領域がある。この領域は極性化活性帯（ZPA）と呼ばれ、肢芽の前後軸を決めている。\n図Ⅰのように、ニワトリの正常胚では、前肢は前方から2−3−4と名付けられた3本の指が形成されるが、図Ⅱのように、別個体から切り取ったZPA領域を宿主の肢芽の前方に移植すると前後に4−3−2−2−3−4の鏡像対称の重複指が形成される。\n次に、図Ⅲのように同じ胚発生時期の別個体から切り取ったZPA領域を、宿主の肢芽の中央部に移植した。このときに形成されると予想される指のパターンとして最も妥当なのはどれか。",
    "choices": {
      "ア": "前から2−3−3−3−2",
      "イ": "前から2−3−3−4−3",
      "ウ": "前から2−3−4−3−2",
      "エ": "前から2−3−4−3−4",
      "オ": "前から4−3−2−3−4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "指4はZPAに近い高シグナルの位置、指2は遠い低シグナルの位置に対応する。移植した中央部と元の後端で指4、その間で指3となり、前方の2−3を合わせると2−3−4−3−4になる。",
    "choiceExplanations": {
      "ア": "中央のZPAの近くには、強いシグナルに対応する指4の性質が現れる。元の後方のZPAも残るので、最後を指2とする組合せは適さない。",
      "イ": "最も前方には指2が残るが、移植した中央部に近づくと指4が現れる。元の後方のZPAの近くも指4である。",
      "ウ": "中央で指4、その両側に指3が形成される点までは妥当である。後端の近くには元のZPAがあるので、最後は指2ではなく指4になる。",
      "エ": "指4はZPAに近い高シグナルの位置、指2は遠い低シグナルの位置に対応する。移植した中央部と元の後端で指4、その間で指3となり、前方の2−3を合わせると2−3−4−3−4になる。",
      "オ": "最前方に指4ができるのは、図ⅡのようにZPAを前端へ移植したときである。図Ⅲでは中央に移植するので、指4が現れる位置も中央に移る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q010.webp"
    ],
    "imageAltTexts": [
      "ニワトリの肢芽での正常な指形成、前端への移植、中央への移植"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q015",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "数学・物理",
    "topicTags": [
      "波形と変位の時間変化から進行方向を求める",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "波に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「x軸上を進む正弦波がある。図Ⅰは、時刻t＝0［s］におけるこの波の波形を、図Ⅱは、位置x＝0［m］におけるこの波の変位y［m］の時間変化を表している。この波はx軸の［㋐］の向きに進んでおり、x＝2［m］におけるt＝4［s］のときの変位はy＝［㋑］［m］である。」",
    "choices": {
      "ア": "正 ／ −0.9",
      "イ": "正 ／ 0",
      "ウ": "正 ／ 0.9",
      "エ": "負 ／ −0.9",
      "オ": "負 ／ 0"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "原点で空間と時間の傾きが両方正なので負方向に進む。波長12 mと周期6 sから速さは2 m／sであり、t＝4のx＝2は初期波形のx＝10と同じで、波長を引いたx＝−2の変位は約−0.9 mである。",
    "choiceExplanations": {
      "ア": "変位の値は妥当だが、原点での空間の傾きと時間の傾きがともに正である。正方向への進行波なら、この二つは反対符号になる。",
      "イ": "図Ⅰでx＝2の変位が0なのはt＝0である。波は負方向へ動き、4秒後は初期波形のx＝10の変位に対応する。",
      "ウ": "正方向へ進むと原点で時間とともに初期波形の左側の値を観測するが、図Ⅱは増加を示している。4秒後のx＝2はx＝10の初期値となり、波長12 mを使うとx＝−2と同じ負の変位である。",
      "エ": "原点で空間と時間の傾きが両方正なので負方向に進む。波長12 mと周期6 sから速さは2 m／sであり、t＝4のx＝2は初期波形のx＝10と同じで、波長を引いたx＝−2の変位は約−0.9 mである。",
      "オ": "進行方向は妥当である。4秒で波形が8 m負方向へ移り、x＝2の変位は図Ⅰのx＝−2と同じになって0ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q015-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q015-2.webp"
    ],
    "imageAltTexts": [
      "時刻0における波の変位と位置の関係（図Ⅰ）",
      "位置0における波の変位と時間の関係（図Ⅱ）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q017",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "基礎物理化学・基礎無機化学",
    "topicTags": [
      "気体分子の速さ分布と平均自由行程",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "気体分子の運動に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、窒素の原子量を14とし、気体定数を8.31 J・K⁻¹・mol⁻¹とする。\n\n「気体分子の速さの分布は、マクスウェル・ボルツマン分布により表され、温度T₁、T₂、T₃（T₁＜T₂＜T₃）に対して図［㋐］のように変化する。\n1.0×10⁵ Pa、25 ℃において、窒素分子は、平均約［㋑］m・s⁻¹の速さで飛行し、平均自由行程約100 nmで他の分子と衝突を繰り返す。ある1個の窒素分子に着目すると、毎秒約5×10⁹回衝突する。温度一定の条件で、圧力を半分にすると、平均自由行程は［㋒］になる。」",
    "choices": {
      "ア": "Ⅰ ／ 50 ／ 2倍",
      "イ": "Ⅰ ／ 500 ／ 半分",
      "ウ": "Ⅱ ／ 50 ／ 半分",
      "エ": "Ⅱ ／ 50 ／ 2倍",
      "オ": "Ⅱ ／ 500 ／ 2倍"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "温度が高くなるほど分布は高い速さ側へ広がるので図Ⅱであり、窒素の平均の速さは室温で約500 m／sである。固定温度で圧力が半分になると数密度も半分になり、平均自由行程は二倍になる。",
    "choiceExplanations": {
      "ア": "圧力を半分にしたときの自由行程は妥当である。温度が上がると速さの分布は高い速さへ広がり、ピークは低くなるので図Ⅱが対応する。",
      "イ": "平均の速さ約500 m／sは妥当である。温度を一定にしたまま圧力を半分にすると気体の数密度も半分になり、衝突までの距離は増える。",
      "ウ": "図Ⅱは高温ほど分布が幅広くなるので妥当である。分子一つが約10⁻⁷ mずつ進んで毎秒約5×10⁹回衝突するなら、速さは約500 m／sである。",
      "エ": "分布と平均自由行程は妥当である。窒素のモル質量0.028 kg／molで√(8RT／(πM))を計算すると約475 m／sであり、50 m／sより500 m／sに近い。",
      "オ": "温度が高くなるほど分布は高い速さ側へ広がるので図Ⅱであり、窒素の平均の速さは室温で約500 m／sである。固定温度で圧力が半分になると数密度も半分になり、平均自由行程は二倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q017.webp"
    ],
    "imageAltTexts": [
      "温度T₁～T₃における分子の速さの分布の二つの候補"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q018",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "基礎物理化学・基礎無機化学",
    "topicTags": [
      "アンモニア合成の平衡定数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次に示す反応の平衡定数に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\nただし、気体は理想気体とし、アンモニアの標準生成エンタルピーを−46 kJ・mol⁻¹とする。\n\nN₂(g)＋3H₂(g) ⇄ 2NH₃(g)\n\n㋐　反応開始時の反応系の濃度を変化させると、濃度平衡定数の値は変化する。\n㋑　反応系の温度を変化させると、圧平衡定数の値は変化する。\n㋒　触媒を反応系に加えると、圧平衡定数の値は変化する。\n㋓　濃度平衡定数の値と圧平衡定数の値は常に等しい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "アンモニア合成は反応エンタルピーが−92 kJであり、圧平衡定数は温度とともに変わる。初期濃度や触媒では変わらず、濃度と分圧では定数の換算に気体のモル数変化が入る。",
    "choiceExplanations": {
      "ア": "初期濃度は到達する平衡組成に影響するが、温度が同じなら平衡定数は変わらない。変わるのは最初の反応商である。",
      "イ": "触媒は正逆両方向の反応を速め、到達時間に影響する。初期濃度や触媒の有無は、一定温度での平衡定数を決めない。",
      "ウ": "アンモニア合成は反応エンタルピーが−92 kJであり、圧平衡定数は温度とともに変わる。初期濃度や触媒では変わらず、濃度と分圧では定数の換算に気体のモル数変化が入る。",
      "エ": "㋑は妥当であるが、反応物と生成物の気体の化学量論係数の和が異なる。p＝cRTで換算すると、通常の定義でK_p＝K_c(RT)⁻²となる。",
      "オ": "触媒は平衡組成を変えず、濃度と分圧の平衡定数も一般には同じでない。この反応では気体の総モル数の変化が−2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q021",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "基礎物理化学・基礎無機化学",
    "topicTags": [
      "ギブズの相律と独立成分数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ギブズの相律に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　ギブズの相律では、系の自由度F、独立成分の数C、相の数Pとの間に、F＝C−P＋2の関係がある。\n㋑　塩化ナトリウムを水に完全に溶解させた系では、溶液中でNa⁺とCl⁻に電離するため、独立成分の数Cは3である。\n㋒　水だけから成る系において、水の三重点では系の自由度Fは1である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "温度と圧力を自由に取り得る系でギブズの相律はF＝C−P＋2である。食塩水では電気的中性の条件があり、水の三重点には三相が共存するため、㋑と㋒は成り立たない。",
    "choiceExplanations": {
      "ア": "温度と圧力を自由に取り得る系でギブズの相律はF＝C−P＋2である。食塩水では電気的中性の条件があり、水の三重点には三相が共存するため、㋑と㋒は成り立たない。",
      "イ": "㋐の式は妥当である。Na⁺とCl⁻を独立には増減できず、食塩水を記述する独立成分は水とNaClの二つである。",
      "ウ": "㋐は正しいが、三重点では一成分に対して固体、液体、気体の三相が存在する。式に代入すると自由度は1−3＋2＝0になる。",
      "エ": "塩化ナトリウムが電離しても、Na⁺とCl⁻の量には電荷の中性条件がある。種を数えるだけでは独立な成分数を求められない。",
      "オ": "食塩水の独立成分は水と塩化ナトリウムの二つである。また、純水の三相がつり合う温度と圧力は三重点で固定されている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q024",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "水とベンゼンの分子点群",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "分子の対称性に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「水（H₂O）分子が属する点群は［㋐］であり、ベンゼン（C₆H₆）分子が属する点群は［㋑］である。」",
    "choices": {
      "ア": "C₂ₕ ／ C₆ᵥ",
      "イ": "C₂ᵥ ／ C₆ᵥ",
      "ウ": "C₂ᵥ ／ D₆ₕ",
      "エ": "D₂ₕ ／ C₆ᵥ",
      "オ": "D₂ₕ ／ D₆ₕ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水は二回回転軸とこれを含む二つの鏡映面を持つのでC₂ᵥである。ベンゼンは六回回転軸、これに直交する二回回転軸群、分子面の鏡映を持つのでD₆ₕである。",
    "choiceExplanations": {
      "ア": "折れ線形の水ではH−O−H角を二等分する軸が二回回転軸であり、これを含む鏡映面が二つある。その軸に垂直な鏡映面を要するC₂ₕには当たらない。",
      "イ": "水の分類は妥当である。ベンゼンでは六回回転軸に直交する二回回転軸があり、分子面が水平鏡映面なのでD₆ₕである。",
      "ウ": "水は二回回転軸とこれを含む二つの鏡映面を持つのでC₂ᵥである。ベンゼンは六回回転軸、これに直交する二回回転軸群、分子面の鏡映を持つのでD₆ₕである。",
      "エ": "水には主軸と直交する複数の二回回転軸はなく、D₂ₕではない。ベンゼンの平面には水平鏡映対称性もある。",
      "オ": "ベンゼンの点群は妥当である。水では二つのH原子を交換する二回回転軸が一本あるだけなのでD₂ₕではなくC₂ᵥとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q025",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "純回転スペクトルを示す分子の永久双極子",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "H₂O、HCl、CH₄、N₂のうち、純回転スペクトルを示す分子として妥当なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "H₂O、HCl",
      "イ": "H₂O、CH₄",
      "ウ": "H₂O、N₂",
      "エ": "HCl",
      "オ": "CH₄、N₂"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "電気双極子による純回転吸収には永久双極子モーメントが必要である。折れ線形の水と異核二原子分子のHClは極性を持ち、正四面体のCH₄と同核二原子分子のN₂は持たない。",
    "choiceExplanations": {
      "ア": "電気双極子による純回転吸収には永久双極子モーメントが必要である。折れ線形の水と異核二原子分子のHClは極性を持ち、正四面体のCH₄と同核二原子分子のN₂は持たない。",
      "イ": "H₂Oは折れ線形なのでO−H結合の双極子が打ち消されない。CH₄ではC−H結合の双極子が正四面体対称性により打ち消される。",
      "ウ": "N₂は同じ原子二つでできており、電荷分布が対称なので永久双極子を持たない。H₂Oに加えるべきなのは異核のHClである。",
      "エ": "HClは二原子間の電気陰性度差により極性を持つ。水分子の二本の結合も角度をなしているので、全体に永久双極子が残る。",
      "オ": "どちらも電荷分布の対称性により永久双極子が0である。通常の純回転吸収を与えるのはH₂OとHClである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q026",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "リン酸型燃料電池の半反応と水生成量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "燃料電池に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「リン酸型燃料電池では、負極では［㋐］の反応、正極では［㋑］の反応が起こる。また、ある水素−酸素系燃料電池を用いた自動車は、水素を外部から供給するベンチテストでは、5.0 kgの水素で600 km走行できる。この燃料電池自動車が1.0 km走行した際に排出する水の質量は、［㋒］gとなる。ただし、水素は全て走行に使われるものとし、水素と酸素の原子量はそれぞれ1.0及び16とする。」",
    "choices": {
      "ア": "H₂＋2OH⁻→2H₂O＋2e⁻ ／ O₂＋2H₂O＋4e⁻→4OH⁻ ／ 75",
      "イ": "H₂＋2OH⁻→2H₂O＋2e⁻ ／ O₂＋2H₂O＋4e⁻→4OH⁻ ／ 150",
      "ウ": "H₂→2H⁺＋2e⁻ ／ O₂＋4H⁺＋4e⁻→2H₂O ／ 75",
      "エ": "H₂→2H⁺＋2e⁻ ／ O₂＋4H⁺＋4e⁻→2H₂O ／ 150",
      "オ": "O₂＋4H⁺＋4e⁻→2H₂O ／ H₂→2H⁺＋2e⁻ ／ 150"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "酸性電解質では負極で水素が酸化され、正極では酸素がH⁺と電子を受け取って水を生じる。H₂とH₂Oのモル比が1対1なので、水の質量は(5000／600)×(18／2)＝75 gとなる。",
    "choiceExplanations": {
      "ア": "水の質量は75 gで妥当である。OH⁻を含む二つの電極反応はアルカリ型であり、リン酸型ではH⁺が電解質中を移動する。",
      "イ": "リン酸型では負極でH⁺を生じ、正極でH⁺と酸素が反応する。消費したH₂と生成するH₂Oの物質量が同じなので、生成水の質量は水素の9倍である。",
      "ウ": "酸性電解質では負極で水素が酸化され、正極では酸素がH⁺と電子を受け取って水を生じる。H₂とH₂Oのモル比が1対1なので、水の質量は(5000／600)×(18／2)＝75 gとなる。",
      "エ": "電極反応の組合せは妥当である。水素分子1 molから水分子1 molができるため、質量比に2倍を余分に掛ける必要はない。",
      "オ": "電子を放出する水素の酸化が負極、電子を消費する酸素の還元が正極で起こる。水の生成量はH₂のモル質量2 gとH₂Oの18 gから75 gとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q028",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "正方晶の対称等価面と立方晶の面間隔",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "結晶格子に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「正方晶系において、(100)面と等価な面は、(100)面以外に［㋐］つある。また、格子定数がaの立方晶系において、(002)面の格子面間隔は［㋑］、(101)面の格子面間隔は［㋒］となる。」",
    "choices": {
      "ア": "三 ／ a／2 ／ (√3／3)a",
      "イ": "三 ／ a／2 ／ (√2／2)a",
      "ウ": "三 ／ 2a ／ (√3／3)a",
      "エ": "五 ／ a／2 ／ (√2／2)a",
      "オ": "五 ／ 2a ／ (√3／3)a"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "正方晶で(100)と対称等価なのは反対向きの面と、これらを90°回転した二面の計三面である。立方晶の面間隔d_(hkl)＝a／√(h²＋k²＋l²)から(002)はa／2、(101)はa／√2となる。",
    "choiceExplanations": {
      "ア": "等価な面の数と(002)の間隔は妥当である。(101)では指数の二乗和が1＋0＋1＝2なので、面間隔はa／√2となる。",
      "イ": "正方晶で(100)と対称等価なのは反対向きの面と、これらを90°回転した二面の計三面である。立方晶の面間隔d_(hkl)＝a／√(h²＋k²＋l²)から(002)はa／2、(101)はa／√2となる。",
      "ウ": "等価面の数は妥当である。(002)では指数の二乗和が4なので、格子定数を2倍するのではなく2で割る。",
      "エ": "立方晶についての二つの間隔は妥当である。正方晶ではc軸方向はa軸、b軸と等価でないので、(001)とその反対の面を数えない。",
      "オ": "五つの追加面は立方晶で全ての座標軸が等価な場合の数である。さらに(002)と(101)の間隔は、それぞれ指数の二乗和4と2の平方根でaを割って求める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q029",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "¹H NMRの積分値、多重度と構造",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "分子式C₅H₁₂Oで示されるある化合物の¹H NMRスペクトルデータを次に示す。この化合物の構造式として最も妥当なのはどれか。\n\n¹H NMRスペクトル（CDCl₃溶媒）\nδ 0.92（3H、三重線）、1.20（6H、一重線）、1.49（2H、四重線）、1.52（1H、一重線）",
    "choices": {
      "ア": "図の1（2-メチルブタン-2-オール）",
      "イ": "図の2（2,2-ジメチルプロパン-1-オール）",
      "ウ": "図の3（2-エトキシプロパン）",
      "エ": "図の4（3-メチルブタン-1-オール）",
      "オ": "図の5（1-メトキシ-2-メチルプロパン）"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "0.92と1.49の三重線と四重線はエチル基に対応する。OHを持つ炭素上の二つの等価なメチル基は隣に結合した水素がなく6Hの一重線を与え、残りの1HはOHである。",
    "choiceExplanations": {
      "ア": "0.92と1.49の三重線と四重線はエチル基に対応する。OHを持つ炭素上の二つの等価なメチル基は隣に結合した水素がなく6Hの一重線を与え、残りの1HはOHである。",
      "イ": "2,2-ジメチルプロパン-1-オールでは三つの等価なメチル基が合計9Hの一重線を与える。観測された3H三重線と2H四重線のエチル基は存在しない。",
      "ウ": "エトキシ基なら3Hの三重線と2Hの四重線を生じ得る。だがイソプロピル基の二つのメチルは隣のメチンと結合して二重線となり、OHの1Hもない。",
      "エ": "枝分かれした二つのメチルは隣のメチン水素により6Hの二重線となる。観測された6Hは一重線なのでこの構造とは合わない。",
      "オ": "メトキシ基は3Hの一重線を与える。残るイソブチル部分にはエチル基の3H三重線と2H四重線の対がなく、OHも存在しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q029.webp"
    ],
    "imageAltTexts": [
      "¹H NMRデータに対する五つの候補構造"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q030",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "構造異性体、エピマー、メソ化合物",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "有機化合物に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　図の二つの化合物は、互いに立体異性体である。\n㋑　Fischer投影式で示す図の二つの化合物は、互いにエナンチオマーである。\n㋒　Newman投影式で示す図の化合物は、メソ化合物である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋒のNewman投影では等しい置換基どうしが前後の炭素で互いに反対向きにあり、二つの立体中心は逆配置のメソ体となる。㋐は結合順序が異なり、㋑は一つの立体中心だけが異なる。",
    "choiceExplanations": {
      "ア": "㋐はメチル基のあるアミノ酸の並ぶ順序が違い、結合順序の異なる化合物である。㋑も全ての不斉中心が反転しているわけではない。",
      "イ": "㋒は妥当である。㋐の二つはアラニンとグリシンの順序が逆のため、立体配置だけの違いではない。",
      "ウ": "㋑で反転しているのは三つの不斉中心のうち中央だけである。エピマーであり、鏡像関係のエナンチオマーにはならない。",
      "エ": "㋒は対称性を持つメソ化合物である。㋑では上側と下側の不斉中心が同じなので、全中心が反転する鏡像異性体ではない。",
      "オ": "㋒のNewman投影では等しい置換基どうしが前後の炭素で互いに反対向きにあり、二つの立体中心は逆配置のメソ体となる。㋐は結合順序が異なり、㋑は一つの立体中心だけが異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q030-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q030-2.webp",
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q030-3.webp"
    ],
    "imageAltTexts": [
      "アラニンとグリシンからなる二つのジペプチド（㋐）",
      "三つの不斉中心を持つ二つのFischer投影式（㋑）",
      "二炭素を見通したNewman投影式（㋒）"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q031",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "シクロヘキサンのいす形とcis-1,4置換",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "置換シクロヘキサンに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「メチルシクロヘキサンのいす形配座には、メチル基がアキシアル位に位置したアキシアル配座異性体とエクアトリアル位に位置したエクアトリアル配座異性体がある。これらのうち［㋐］配座異性体の方がより安定である。\nまた、cis-1,4-ジメチルシクロヘキサンは、a、b、cのうち［㋑］で表すことができる。」",
    "choices": {
      "ア": "アキシアル ／ a",
      "イ": "アキシアル ／ b",
      "ウ": "アキシアル ／ c",
      "エ": "エクアトリアル ／ b",
      "オ": "エクアトリアル ／ c"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "メチル基はエクアトリアルなら1,3-ジアキシアル反発を避けられる。1位と4位で置換基を同じ側に向けるには片方をアキシアル、片方をエクアトリアルとするbの配座が必要である。",
    "choiceExplanations": {
      "ア": "アキシアルのメチル基は同じ側のアキシアル水素と1,3-ジアキシアル反発を生じる。aは二つのアキシアル基が上下反対を向くtrans体である。",
      "イ": "bは一方がアキシアルでもう一方がエクアトリアルとなるcis体である。メチル基が一つの場合は立体反発の小さいエクアトリアル配座が有利である。",
      "ウ": "アキシアル配座では環とメチル基の立体反発が増える。cも二つのメチルが反対側を向くtrans体である。",
      "エ": "メチル基はエクアトリアルなら1,3-ジアキシアル反発を避けられる。1位と4位で置換基を同じ側に向けるには片方をアキシアル、片方をエクアトリアルとするbの配座が必要である。",
      "オ": "エクアトリアル配座の選択は妥当である。cでは1位と4位のエクアトリアル基は上下で反対向きなのでtrans体になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q031.webp"
    ],
    "imageAltTexts": [
      "ジメチルシクロヘキサンのいす形a、b、c"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q032",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "水素化物還元剤とカルボン酸誘導体",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の還元反応㋐、㋑、㋒のうち、主生成物が妥当なもののみを全て挙げているのはどれか。\nただし、還元剤は十分な量が使われたものとし、また、それぞれの反応では適切な後処理が行われたものとする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐ではカルボン酸が水素化アルミニウムリチウムで還元され、後処理後に第一級アルコールとなる。㋑の条件でエステルは通常還元されず、㋒の強い還元条件では第一級アルコールまで進む。",
    "choiceExplanations": {
      "ア": "㋐ではカルボン酸が水素化アルミニウムリチウムで還元され、後処理後に第一級アルコールとなる。㋑の条件でエステルは通常還元されず、㋒の強い還元条件では第一級アルコールまで進む。",
      "イ": "㋐は妥当である。㋑の水素化ホウ素ナトリウムは通常の室温条件ではアルデヒドやケトンを還元するが、図のエステルをアルコールに変えるには反応性が不足する。",
      "ウ": "㋐は妥当である。㋒では中間にアルデヒドが生じても、十分なLiAlH₄があればさらに還元される。",
      "エ": "㋑ではエステルの還元が難しい。㋒は逆に還元力が強く、図にあるアルデヒドで止まらない。",
      "オ": "㋒のエステルは十分なLiAlH₄によって飽和アルコールまで還元される。アルデヒドはこの還元条件で持続する主生成物ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q032.webp"
    ],
    "imageAltTexts": [
      "カルボン酸とエステルの還元反応三つ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q033",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "アリル位臭素化、アミド還元と芳香族置換",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の反応㋐、㋑、㋒のうち、主生成物が妥当なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑ではLiAlH₄がアミドのカルボニルをメチレンに還元し、C−N結合を保った第一級アミンを得る。㋐はアリル位、㋒は主にパラ位が臭素化されるので、図と合わない。",
    "choiceExplanations": {
      "ア": "㋑は妥当である。㋐の光照射下のN-ブロモスクシンイミドはアリル位を臭素化し、図のように二重結合上の炭素に臭素を直接導入する反応ではない。",
      "イ": "㋐は二重結合の隣のアリル位に置換が起こる。㋒のアセトアミド基は芳香環のオルト・パラ配向性を示し、図のメタ生成物は主生成物に当たらない。",
      "ウ": "㋑ではLiAlH₄がアミドのカルボニルをメチレンに還元し、C−N結合を保った第一級アミンを得る。㋐はアリル位、㋒は主にパラ位が臭素化されるので、図と合わない。",
      "エ": "㋑のアミンは妥当である。㋒のアセトアミド基は芳香環へ電子を供与してオルト位とパラ位への置換を促し、立体的に混み合わないパラ位が主になる。",
      "オ": "㋒の図では臭素はアセトアミド基に対してメタ位にある。アミドのNが芳香環に結合した基はオルト・パラ配向性を示す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q033.webp"
    ],
    "imageAltTexts": [
      "光臭素化、アミド還元、芳香族臭素化の反応式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q034",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "マイケル付加と分子内アルドール縮合",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の有機合成反応の㋐、㋑に当てはまる主生成物の組合せとして最も妥当なのはどれか。\nただし、それぞれの反応では適切な後処理が行われたものとする。選択肢の構造式は図を参照。",
    "choices": {
      "ア": "図の組合せ1",
      "イ": "図の組合せ2",
      "ウ": "図の組合せ3",
      "エ": "図の組合せ4",
      "オ": "図の組合せ5"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ジケトンのカルボニル間で生じるエノラートが、エノンのβ炭素にマイケル付加して側鎖を伸ばす。続く分子内アルドール反応で六員環が閉じ、脱水でカルボニルと共役した二重結合ができる。",
    "choiceExplanations": {
      "ア": "最初に二つのカルボニル間にあるメチル置換炭素がエノラートになり、そこで共役付加が起きる。この図では側鎖がその炭素以外に結合している。",
      "イ": "加熱する二段目は、閉環の後に水が取れて共役エノンになる。この図ではアルドール付加のヒドロキシ基が残っている。",
      "ウ": "ジケトンのカルボニル間で生じるエノラートが、エノンのβ炭素にマイケル付加して側鎖を伸ばす。続く分子内アルドール反応で六員環が閉じ、脱水でカルボニルと共役した二重結合ができる。",
      "エ": "最初の共役付加物は妥当である。加熱条件でアルドール付加物が脱水して共役エノンになるので、生成物はヒドロキシ基を保たない。",
      "オ": "最初の生成物はエノンのカルボニル炭素への1,2-付加に相当する。安定なエノラートによる共役付加でできる1,5-ジカルボニルが、次の六員環形成に適する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q034-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q034-2.webp"
    ],
    "imageAltTexts": [
      "ジケトンとエノンの逐次反応の条件と生成物㋐、㋑",
      "二段階反応の生成物の組合せ五つ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q035",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "ラジカル重合速度と開始剤濃度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ラジカル重合に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「次に示すような素反応のみが重合速度に関与すると考える。\n開始反応　I→2R・、R・＋M→P・\n成長反応　P・＋M→PM・（≡P・）、速度定数k_p\n停止反応　P・＋P・→2P\nここで、Iは開始剤、R・は開始剤の分解により生じるラジカル種、Mはモノマー、P・はポリマーラジカル種、Pは生成ポリマーとする。また、ポリマーラジカル種の全濃度を［P・］、モノマーの濃度を［M］とする。成長反応速度R_pが次のように定義されるとき、\n\nR_p＝k_p［P・］［M］\n\nラジカル種の濃度が一定であるという定常状態近似を用いると、成長反応速度は開始剤濃度の［㋐］乗に［㋑］することが導かれる。\nただし、成長反応の速度定数k_pはポリマーラジカル種の分子量にかかわらず一定とする。」",
    "choices": {
      "ア": "1／2 ／ 比例",
      "イ": "1／2 ／ 反比例",
      "ウ": "1 ／ 比例",
      "エ": "2 ／ 比例",
      "オ": "2 ／ 反比例"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "開始によるラジカルの生成速度は［I］に比例し、二個のラジカルが関与する停止速度は［P・］²に比例する。両者を等置すると［P・］∝［I］^(1／2)となり、R_pにも同じ依存性が現れる。",
    "choiceExplanations": {
      "ア": "開始によるラジカルの生成速度は［I］に比例し、二個のラジカルが関与する停止速度は［P・］²に比例する。両者を等置すると［P・］∝［I］^(1／2)となり、R_pにも同じ依存性が現れる。",
      "イ": "開始剤が増えると定常状態のラジカル濃度も増える。平方根の依存性は妥当だが、成長速度は反比例ではなく比例する。",
      "ウ": "開始速度は開始剤濃度の一次だが、停止はラジカル濃度の二次である。定常状態のラジカル濃度から求める成長速度には1／2乗が残る。",
      "エ": "二乗になるのは停止反応のラジカル濃度への依存性である。生成と停止を等置して濃度を解くと、開始剤濃度の平方根となる。",
      "オ": "停止反応が二次なので、成長速度には逆二乗ではなく正の平方根が現れる。R_pはポリマーラジカル濃度に比例するためである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q036",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "硫酸工業の接触法と三酸化硫黄の吸収",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "硫酸製造に関する次の記述の下線部分㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n「原料の硫黄源には、硫化鉄鉱のばい焼、非鉄金属の精錬過程での排ガス、軽灯油・重油等の水素化脱硫装置で発生するガス等があるが、㋐［我が国では良質の硫化鉄鉱が豊富に産出することから、現在も硫化鉄鉱が主原料となっている］。\n硫酸製造の要点は、SO₂をSO₃に酸化することにあり、その方法には硝酸式と接触式がある。前者はNOとNO₂の混合物でSO₂を酸化後、水蒸気を吹き込んで硫酸とNOを回収するものであり、後者は触媒を用いてSO₂を酸化させるものである。\n接触式の触媒としては、白金が優れているが、高価であり、Asなどの触媒毒に弱いことから、㋑［現在はバナジウム系触媒が用いられている］。バナジウム系触媒は、V₂O₅を主触媒、K、Na、Ca、Feなどを助触媒として加えたものである。しかし、触媒を用いる接触式より、硝酸式の方がコストが低く、㋒［現在の硫酸製造は、硝酸式が主流となっている］。\nSO₃が水と反応すると硫酸が得られるが、SO₃を水と接触させても、ミストとなり容易に凝集しないため、㋓［濃硫酸が吸収剤として用いられる］。」",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "接触式のSO₂酸化では、白金に代わりバナジウム系触媒が広く用いられる。SO₃を水に直接吸収すると硫酸ミストが生じやすいので、吸収には濃硫酸を使う。",
    "choiceExplanations": {
      "ア": "接触式でバナジウム系触媒を使う点は妥当である。国内の硫黄源には製錬所のガスや石油脱硫で回収した硫黄が利用され、硫化鉄鉱が現在の主原料という説明は合わない。",
      "イ": "SO₃を濃硫酸に吸収させる点は妥当である。硫黄は主に製錬の副生ガスや回収硫黄を利用しており、良質な硫化鉄鉱が豊富という前提が違う。",
      "ウ": "㋑の触媒は妥当である。現在広く使われるのは触媒でSO₂を酸化する接触式であり、硝酸式を主流とする㋒は誤りである。",
      "エ": "接触式のSO₂酸化では、白金に代わりバナジウム系触媒が広く用いられる。SO₃を水に直接吸収すると硫酸ミストが生じやすいので、吸収には濃硫酸を使う。",
      "オ": "㋓は妥当であるが、硫酸工業の主流は接触式である。硝酸式が現在の主流という㋒は当てはまらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q037",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "過剰空気を使う燃焼の物質収支",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "燃焼プロセスに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「炭素84.0 wt％、水素12.0 wt％、硫黄4.00 wt％から成る燃料油100 kgを、20.0％の過剰空気率で完全燃焼させることを考える。このとき必要な空気は［㋐］kmolである。また、このとき発生する、水蒸気を除いた燃焼ガスのうち、二酸化炭素のモル分率は［㋑］である。\nただし、空気は窒素と酸素のみから構成され、空気中の窒素のモル分率を0.800、酸素のモル分率を0.200とする。また、原子量をH＝1.00、C＝12.0、S＝32.0とする。」",
    "choices": {
      "ア": "10.1 ／ 0.121",
      "イ": "10.1 ／ 0.190",
      "ウ": "12.1 ／ 0.190",
      "エ": "60.8 ／ 0.121",
      "オ": "60.8 ／ 0.190"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "理論酸素量は84／12＋12／4＋4／32＝10.125 kmolで、供給空気量は1.2×10.125／0.200＝60.75 kmolとなる。乾きガスはN₂ 48.6、残留O₂ 2.025、CO₂ 7、SO₂ 0.125 kmolなので、CO₂モル分率は7／57.75≈0.121である。",
    "choiceExplanations": {
      "ア": "10.1 kmolは燃焼で消費される理論酸素量である。20％過剰に供給した酸素を空気量に直すには、酸素のモル分率0.200で割る。",
      "イ": "酸素の理論量と空気供給量は異なる。乾きガスにはCO₂以外にN₂と余剰O₂、さらに少量のSO₂が残る。",
      "ウ": "12.1 kmolは過剰分を含む供給酸素の量である。これを含む空気はその5倍であり、多量のN₂が乾きガス中に入るためCO₂モル分率は0.190より低くなる。",
      "エ": "理論酸素量は84／12＋12／4＋4／32＝10.125 kmolで、供給空気量は1.2×10.125／0.200＝60.75 kmolとなる。乾きガスはN₂ 48.6、残留O₂ 2.025、CO₂ 7、SO₂ 0.125 kmolなので、CO₂モル分率は7／57.75≈0.121である。",
      "オ": "空気の量は妥当である。乾きガス全体には空気由来のN₂ 48.6 kmolと余剰のO₂があり、CO₂ 7 kmolを全量で割ると0.121となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q038",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "気液吸収塔のアンモニア物質収支",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "アンモニア10.0 mol％を含む空気を55.0 mol・s⁻¹で入口ガスとしてガス吸収塔に供給し、向流で水と接触させて入口ガス中のアンモニアの90.0％を液中に回収したい。このとき、ガス吸収塔出口液中のアンモニアの濃度を0.500 mol％とするために必要なガス吸収塔入口水の流量と、そのときのガス吸収塔出口ガス中のアンモニア濃度の組合せとして最も妥当なのはどれか。\nただし、水は気相中に移動しないものとする。",
    "choices": {
      "ア": "94.1 mol・s⁻¹ ／ 1.10 mol％",
      "イ": "985 mol・s⁻¹ ／ 1.00 mol％",
      "ウ": "985 mol・s⁻¹ ／ 1.10 mol％",
      "エ": "990 mol・s⁻¹ ／ 1.00 mol％",
      "オ": "990 mol・s⁻¹ ／ 1.10 mol％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "入口アンモニア5.50 mol・s⁻¹のうち4.95が液へ移り、出口液の合計は4.95／0.005＝990 mol・s⁻¹なので入口水は約985 mol・s⁻¹である。気相では0.55 mol・s⁻¹のアンモニアを出口の総流量50.05 mol・s⁻¹で割り、1.10 mol％となる。",
    "choiceExplanations": {
      "ア": "出口ガスの濃度は妥当である。液に入る4.95 mol・s⁻¹のアンモニアを0.500 mol％にするには、液全体を990 mol・s⁻¹にする必要がある。",
      "イ": "入口水流量は妥当である。気相の分母は入口の55.0ではなく、吸収されたアンモニア4.95を引いた50.05 mol・s⁻¹である。",
      "ウ": "入口アンモニア5.50 mol・s⁻¹のうち4.95が液へ移り、出口液の合計は4.95／0.005＝990 mol・s⁻¹なので入口水は約985 mol・s⁻¹である。気相では0.55 mol・s⁻¹のアンモニアを出口の総流量50.05 mol・s⁻¹で割り、1.10 mol％となる。",
      "エ": "990 mol・s⁻¹は溶質も含む出口液の総流量である。ガス側の濃度を求めるときも、溶質を失った分だけ出口の総流量を減らす。",
      "オ": "出口ガス濃度は妥当である。990 mol・s⁻¹から回収されるアンモニア4.95 mol・s⁻¹を引いた流量が、供給すべき水の量となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q039",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "ストークス域の球の抗力係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "流体中の物体に作用する力に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「内径D［m］の円筒内に満たされている密度ρ［kg・m⁻³］、粘度μ［Pa・s］の流体中を、直径d_p［m］の球が終末速度v［m・s⁻¹］で運動しているとき、球が流体から受ける抵抗力F［N］は、抵抗係数C_D［−］、運動方向の断面積、流体の運動エネルギーに比例することが知られている。ここで、抵抗係数は粒子レイノルズ数の関数となっている。このとき、レイノルズ数の代表長さには［㋐］を用いる。レイノルズ数が2以下のとき抵抗係数はレイノルズ数に［㋑］し、このレイノルズ数域を［㋒］と呼ぶ。」",
    "choices": {
      "ア": "円筒の内径 ／ 比例 ／ ニュートン域",
      "イ": "円筒の内径 ／ 反比例 ／ ストークス域",
      "ウ": "球の直径 ／ 比例 ／ ストークス域",
      "エ": "球の直径 ／ 比例 ／ ニュートン域",
      "オ": "球の直径 ／ 反比例 ／ ストークス域"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Re_p＝ρvd_p／μを使い、ストークス域の抗力はF＝3πμd_pvである。これを動圧ρv²／2と球の投影面積で規格化するとC_D＝24／Re_pとなる。",
    "choiceExplanations": {
      "ア": "対象は管路の流れではなく球のまわりの流れなので、代表長さは球の直径である。粘性が支配的な低レイノルズ数ではストークスの抗力になる。",
      "イ": "低レイノルズ数での逆比例と領域名は妥当である。粒子レイノルズ数の長さは円筒の内径ではなく粒子の直径である。",
      "ウ": "球の直径とストークス域は妥当である。抗力が速度に一次、動圧が速度に二次なので、抗力係数は速度とレイノルズ数に反比例する。",
      "エ": "球の直径を用いる点は正しい。ニュートン域では慣性が支配して抗力係数がほぼ一定になり、ここで問う低レイノルズ数域とは異なる。",
      "オ": "Re_p＝ρvd_p／μを使い、ストークス域の抗力はF＝3πμd_pvである。これを動圧ρv²／2と球の投影面積で規格化するとC_D＝24／Re_pとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q040",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "一次反応の三つの理想反応器",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "AからCが生成する反応が、次の反応で表される液相一次反応であるとする。\n\nA→C　−r_A＝kC_A、k＝2.00×10⁻³［s⁻¹］\n\nここで、r_AはAの反応速度［mol・m⁻³・s⁻¹］、kは反応速度定数［s⁻¹］、C_AはAの濃度［mol・m⁻³］を表す。\nこの反応を定容回分反応器、連続槽型反応器、管型反応器で行う。転化率が60％となるまでの定容回分反応器の反応時間をt_b［s］、連続槽型反応器及び管型反応器の平均滞在時間をそれぞれτ_c［s］、τ_p［s］としたとき、t_b、τ_c、τ_pの値の組合せとして最も妥当なのはどれか。\nただし、原料の初期濃度及び反応速度定数はそれぞれの反応器で等しいものとする。また、連続槽型反応器は定常状態で操作されており、連続槽型反応器内は完全混合流れ、管型反応器内は押し出し流れであるものとする。なお、計算に当たっては、logₑ 0.6＝−0.51、logₑ 0.4＝−0.92を用いてもよい。",
    "choices": {
      "ア": "2.6×10² ／ 7.5×10² ／ 2.6×10²",
      "イ": "2.6×10² ／ 7.5×10² ／ 4.6×10²",
      "ウ": "2.6×10² ／ 1.3×10³ ／ 2.6×10²",
      "エ": "4.6×10² ／ 7.5×10² ／ 4.6×10²",
      "オ": "4.6×10² ／ 1.3×10³ ／ 4.6×10²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "回分ではC_A／C_A0＝exp(−kt_b)であり、管型でも押し出し流れに沿って同じ濃度履歴をたどるので、双方460 sとなる。完全混合の連続槽型では転化率Xに対してτ_c＝X／[k(1−X)]であり、750 sとなる。",
    "choiceExplanations": {
      "ア": "転化率が60％なら未反応の濃度比は0.4である。回分と管型ではこの濃度比をexp(−kt)と置くので、logₑ 0.4を用いる。",
      "イ": "連続槽型と管型の値は妥当である。定容回分では濃度の一次減衰からt_b＝−logₑ(0.4)／kとなり、管型と一致する。",
      "ウ": "exp(−kt)の値に使うのは転化率0.6ではなく未反応割合0.4である。連続槽型では出口濃度一定の物質収支から0.6／(0.4k)を用いる。",
      "エ": "回分ではC_A／C_A0＝exp(−kt_b)であり、管型でも押し出し流れに沿って同じ濃度履歴をたどるので、双方460 sとなる。完全混合の連続槽型では転化率Xに対してτ_c＝X／[k(1−X)]であり、750 sとなる。",
      "オ": "回分と押し出し流れの時間は妥当である。連続槽型では濃度が槽内一様であり、流入と流出の濃度差0.6C_A0を槽内の反応速度k×0.4C_A0で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q041",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "日本薬局方の容量分析用標準液の標定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "容量分析用標準液とその標定に用いる標準試薬及び指示薬の組合せ㋐～㋔のうち、第十八改正日本薬局方に収載されているものとして妥当なもののみを挙げているのはどれか。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋔",
      "エ": "㋒、㋓",
      "オ": "㋓、㋔"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "第十八改正日本薬局方9.21では、チオ硫酸ナトリウム液はヨウ素酸カリウムを標準にして遊離したヨウ素をデンプン指示薬で滴定する。硝酸銀液には塩化ナトリウムを用い、指示薬法ではフルオレセインナトリウム試液を使う。",
    "choiceExplanations": {
      "ア": "㋐のヨウ素酸カリウムとデンプンは妥当である。㋑の塩酸の標定には水酸化ナトリウムではなく炭酸ナトリウムを使う。",
      "イ": "第十八改正日本薬局方9.21では、チオ硫酸ナトリウム液はヨウ素酸カリウムを標準にして遊離したヨウ素をデンプン指示薬で滴定する。硝酸銀液には塩化ナトリウムを用い、指示薬法ではフルオレセインナトリウム試液を使う。",
      "ウ": "塩酸の標準試薬は炭酸ナトリウムであり、メチルレッド試液は妥当である。指定濃度のEDTA液は、標準試薬として鉄ではなく亜鉛を用いる。",
      "エ": "㋒は妥当である。㋓の水酸化ナトリウム液の標定では、ブロモチモールブルー試液を用いる場合の標準試薬はアミド硫酸である。",
      "オ": "㋓で用いる標準試薬はアミド硫酸である。㋔のエリオクロムブラックT・塩化ナトリウム指示薬は妥当だが、標準試薬は亜鉛である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q041.webp"
    ],
    "imageAltTexts": [
      "容量分析用標準液、標準試薬と指示薬の組合せ五つ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q042",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "画像診断装置と電磁波の波長",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の㋐～㋔は、物理的エネルギーを用いて生体情報を得るための診断法・装置と、その診断法・装置で用いる電磁波の主な波長範囲（下図、A～E）の組合せである。この組合せのうち、妥当なもののみを挙げているのはどれか。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋓",
      "エ": "㋒、㋔",
      "オ": "㋓、㋔"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ファイバースコープは患部を照明して可視光域Cで観察する。MRIは磁気共鳴の励起・検出に波長が長い無線周波数帯の電磁波を使うのでEに対応する。",
    "choiceExplanations": {
      "ア": "診断用X線はAより長いB付近の波長を用いる。パルスオキシメーターの赤色光と近赤外光は、X線の帯域Bよりはるかに長い。",
      "イ": "ファイバースコープが可視光域Cを用いる点は妥当である。Aは高エネルギーのγ線の領域に対応し、診断用X線の主な波長域より短い。",
      "ウ": "パルスオキシメーターは赤と近赤外の吸収差を測り、SPECTは放射性核種から出るγ線を検出する。対応する表示はそれぞれBとDではない。",
      "エ": "ファイバースコープは患部を照明して可視光域Cで観察する。MRIは磁気共鳴の励起・検出に波長が長い無線周波数帯の電磁波を使うのでEに対応する。",
      "オ": "MRIで無線周波数帯Eを用いる点は妥当である。SPECTは単一光子のγ線を測定するので、可視光より波長の少し長いDではなく非常に短波長の領域に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q042-1.webp",
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q042-2.webp"
    ],
    "imageAltTexts": [
      "波長範囲A～Eを示す対数目盛",
      "五つの診断法・装置と波長範囲の候補"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q043",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "紫外吸光度と等量混合",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "紫外可視吸光度測定法に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ある薬物の、濃度が異なる二つの溶液Ⅰ及びⅡがある。紫外可視吸光度測定法を用いて、これらの溶液の波長254 nmにおける透過度及び吸光度を測定した。この測定に用いるセルは［㋐］製である。また、溶液Ⅰ及び溶液Ⅱの透過度はそれぞれ0.600、0.200であった。このとき、溶液Ⅰ及び溶液Ⅱを等量混合した溶液の吸光度は［㋑］である。ただし、log 2＝0.300、log 3＝0.477とする。」",
    "choices": {
      "ア": "ソーダ石灰ガラス ／ 0.400",
      "イ": "ソーダ石灰ガラス ／ 0.462",
      "ウ": "石英 ／ 0.400",
      "エ": "石英 ／ 0.462",
      "オ": "石英 ／ 0.720"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "254 nmでは紫外光を透過させるため石英セルを使う。等量混合の吸光度は各溶液の吸光度の平均−(log 0.600＋log 0.200)／2であり、与えられた対数で約0.462となる。",
    "choiceExplanations": {
      "ア": "254 nmは紫外域なので、この波長を透過しやすい石英セルを使う。透過度の単純平均0.400をそのまま吸光度としては扱わない。",
      "イ": "0.462は吸光度として妥当である。ソーダ石灰ガラスは254 nmの紫外光を強く吸収するので石英が適する。",
      "ウ": "石英セルは妥当であるが、0.400は透過度を平均した値である。同じ薬物の濃度に比例する吸光度を平均すると0.462になる。",
      "エ": "254 nmでは紫外光を透過させるため石英セルを使う。等量混合の吸光度は各溶液の吸光度の平均−(log 0.600＋log 0.200)／2であり、与えられた対数で約0.462となる。",
      "オ": "石英セルは妥当である。混合後の濃度は二つの濃度の平均なので、ランベルト・ベールの法則により吸光度も二つの値の平均になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q044",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "天然α-アミノ酸の側鎖と不斉中心",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "タンパク質を構成する天然のα-アミノ酸に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　プロリンのα-位のアミノ基は第二級である。\n㋑　メチオニンとシステインは、それぞれ側鎖にスルファニル基をもつ。\n㋒　リシンよりもアルギニンの方が、側鎖の置換基の共役酸のpK_a値が小さい。\n㋓　トレオニンとイソロイシンは、それぞれ不斉炭素を二つもつ。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "プロリンのα-窒素は環内で二つの炭素に結合するため第二級である。トレオニンとイソロイシンはどちらもα炭素とβ炭素に不斉中心をもつ。",
    "choiceExplanations": {
      "ア": "プロリンの窒素は環に組み込まれており第二級である。スルファニル基−SHを持つのはシステインで、メチオニンの硫黄はチオエーテルの一部である。",
      "イ": "プロリンについては妥当である。アルギニンのグアニジニウム共役酸は共鳴で安定化され、側鎖のpK_aはリシンの側鎖より高い。",
      "ウ": "プロリンのα-窒素は環内で二つの炭素に結合するため第二級である。トレオニンとイソロイシンはどちらもα炭素とβ炭素に不斉中心をもつ。",
      "エ": "メチオニンの側鎖は−S−CH₃を含むが−SHは含まない。アルギニン側鎖の共役酸のpK_aはリシンより大きく、二つの記述はともに合わない。",
      "オ": "二つの不斉炭素をもつという㋓は妥当である。共役酸のpK_aはアルギニン側鎖が約12.5、リシン側鎖が約10.5で、㋒とは大小が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q045",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "Fischer法とReissert法によるインドール骨格の形成",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の①、②の反応は、それぞれFischerインドール合成、Reissertインドール合成のいずれかを表したものである。これらの反応に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　①はFischerインドール合成、②はReissertインドール合成を表している。\n㋑　アの反応には、転位反応が含まれている。\n㋒　イの反応には、脱炭酸が含まれている。\n㋓　ウの反応において、Znはルイス酸としてはたらいている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "①はアリールヒドラジンとケトンからのFischer合成、②はオルトニトロトルエン誘導体とシュウ酸エステルからのReissert合成である。Fischer合成ではヒドラゾンから生じる中間体が転位して、環形成に必要な結合を作る。",
    "choiceExplanations": {
      "ア": "①はアリールヒドラジンとケトンからのFischer合成、②はオルトニトロトルエン誘導体とシュウ酸エステルからのReissert合成である。Fischer合成ではヒドラゾンから生じる中間体が転位して、環形成に必要な結合を作る。",
      "イ": "二つの反応名の対応は妥当である。イは塩基下でのシュウ酸エステルとの縮合で炭素鎖を伸ばす段階であり、脱炭酸の段階ではない。",
      "ウ": "アには転位が含まれる。イの縮合ではシュウ酸エステル由来の炭素が中間体に取り込まれるので、㋒は当てはまらない。",
      "エ": "アの転位は妥当である。ウで金属亜鉛は電子を供与してニトロ基を還元する役割を持つ。",
      "オ": "イは炭素間結合を作る縮合である。ウではZnがニトロ基の還元剤として働き、その後環化してインドール誘導体を生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q045.webp"
    ],
    "imageAltTexts": [
      "Fischer法とReissert法の基質、試薬と生成物"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q046",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "アセチルCoA合成でのアデニル化とアシル置換",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の反応式は、生体内でアセチルCoAが合成される反応を表したものである。これらの反応に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　1段階目の反応では、酢酸イオンが求核剤としてはたらいている。\n㋑　1段階目の反応では、ルイス酸としてナトリウムイオンが必要である。\n㋒　2段階目の反応は、S_N1反応機構により進行する。\n㋓　2段階目の反応において、化合物アはAMPである。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "酢酸イオンはATPのαリン酸を攻撃し、ピロリン酸が外れてアセチルAMPを作る。次にCoAの硫黄がアセチル基のカルボニルを攻撃して、AMPが脱離する。",
    "choiceExplanations": {
      "ア": "酢酸イオンがATPのリン原子に求核攻撃する点は妥当である。ATPのリン酸基を配位して反応に関わる代表的な金属イオンはMg²⁺であり、Na⁺を要するとする説明は誤りである。",
      "イ": "酢酸イオンはATPのαリン酸を攻撃し、ピロリン酸が外れてアセチルAMPを作る。次にCoAの硫黄がアセチル基のカルボニルを攻撃して、AMPが脱離する。",
      "ウ": "1段階目に必須のルイス酸をNa⁺とする説明が妥当でない。2段階目はアシル基への求核付加と脱離であって、S_N1型の反応ではない。",
      "エ": "AMPが遊離する点は妥当である。ATPを用いた酵素反応の金属補因子は一般にMg²⁺で、Na⁺が必要とする根拠はない。",
      "オ": "生成物アはAMPで妥当である。第2段階はカルボニル炭素へのCoAの求核攻撃で進み、カルボカチオンを経由するS_N1とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q046.webp"
    ],
    "imageAltTexts": [
      "ATPと酢酸からアセチルCoAができる二段階の反応式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q047",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "抗ウイルス薬の作用点",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ウイルス感染症治療薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　アシクロビルは、単純ヘルペスウイルスのチミジンキナーゼを阻害する。\n㋑　ラミブジンは、ヒト免疫不全ウイルスのインテグラーゼを阻害する。\n㋒　アマンタジンは、インフルエンザA型ウイルスの脱殻段階を阻害する。\n㋓　レムデシビルは、SARS-CoV-2のRNA依存性RNAポリメラーゼを阻害する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アマンタジンはA型インフルエンザウイルスのM2イオンチャネルを阻害して脱殻を妨げる。レムデシビルの活性代謝物はSARS-CoV-2のRNAポリメラーゼによるRNA合成を抑える。",
    "choiceExplanations": {
      "ア": "ウイルスのチミジンキナーゼはアシクロビルの活性化に関与するが、薬の主な作用標的はウイルスDNAポリメラーゼである。ラミブジンは逆転写酵素を阻害する。",
      "イ": "アマンタジンの脱殻阻害は妥当である。アシクロビルはチミジンキナーゼでリン酸化された後、最終的に活性体がDNA合成を妨げる。",
      "ウ": "レムデシビルのRNAポリメラーゼ阻害は妥当である。アシクロビルはウイルスのチミジンキナーゼを活性化に利用するので、その酵素を作用標的とする㋐は妥当でない。",
      "エ": "レムデシビルの作用点は妥当である。ラミブジンはヌクレオシド系逆転写酵素阻害薬であり、インテグラーゼ阻害薬には分類されない。",
      "オ": "アマンタジンはA型インフルエンザウイルスのM2イオンチャネルを阻害して脱殻を妨げる。レムデシビルの活性代謝物はSARS-CoV-2のRNAポリメラーゼによるRNA合成を抑える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q048",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "糖尿病治療薬と血糖低下の機序",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "糖尿病治療薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　イプラグリフロジンは、遠位尿細管に分布するナトリウム・グルコース共役輸送体2（SGLT2）を阻害し、グルコース再吸収を抑制する。\n㋑　グリメピリドは、膵β細胞のスルホニル尿素受容体に結合し、ATP感受性K⁺チャネルを開口し、インスリン分泌を促進する。\n㋒　メトホルミンは、AMP活性化プロテインキナーゼの活性化を介して肝糖新生を抑制する。\n㋓　ボグリボースは、小腸上皮細胞のα-グルコシダーゼを阻害することにより、グルコースの吸収を抑制する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "メトホルミンはAMP活性化プロテインキナーゼの関与などを通じて肝糖新生を抑える。ボグリボースは小腸のα-グルコシダーゼを阻害して糖質の消化とグルコースの吸収を遅らせる。",
    "choiceExplanations": {
      "ア": "SGLT2は主に腎臓の近位尿細管にある。グリメピリドはβ細胞のATP感受性K⁺チャネルを閉じて細胞膜を脱分極させる。",
      "イ": "メトホルミンの説明は妥当である。イプラグリフロジンが阻害するSGLT2による再吸収は、遠位ではなく近位尿細管で起こる。",
      "ウ": "ボグリボースは二糖類などからのグルコース生成を遅らせる。イプラグリフロジンの標的であるSGLT2の局在は近位尿細管である。",
      "エ": "ボグリボースの標的は妥当である。グリメピリドはK⁺の流出を減らすようにチャネルを閉じるため、「開口」は逆である。",
      "オ": "メトホルミンはAMP活性化プロテインキナーゼの関与などを通じて肝糖新生を抑える。ボグリボースは小腸のα-グルコシダーゼを阻害して糖質の消化とグルコースの吸収を遅らせる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q049",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "ヒスタミン受容体とH₁遮断薬の性質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒスタミン及び抗ヒスタミン薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　ジフェンヒドラミンは、ヒスタミンH₁受容体を遮断することから、酔い止め薬として使われるが、抗コリン作用はない。\n㋑　ヒスタミンH₁受容体は、G_q/11タンパク質共役型の受容体である。\n㋒　ヒスタミンが胃のヒスタミンH₂受容体に結合すると、細胞内cAMP濃度が上昇し、プロトンポンプが活性化される。\n㋓　フェキソフェナジンは、第一世代抗ヒスタミン薬であり、中枢抑制作用が強い。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "H₁受容体はG_q/11に共役し、ホスホリパーゼC経路を活性化する。胃壁細胞のH₂受容体はG_sに共役し、cAMPを上げてプロトンポンプによる胃酸分泌を促す。",
    "choiceExplanations": {
      "ア": "H₁受容体がG_q/11に共役する点は妥当である。ジフェンヒドラミンはムスカリン受容体も遮断するため、抗コリン作用がある。",
      "イ": "胃のH₂受容体の刺激でcAMPが増える点は妥当である。ジフェンヒドラミンには抗ムスカリン作用もある。",
      "ウ": "H₁受容体はG_q/11に共役し、ホスホリパーゼC経路を活性化する。胃壁細胞のH₂受容体はG_sに共役し、cAMPを上げてプロトンポンプによる胃酸分泌を促す。",
      "エ": "㋑は妥当である。フェキソフェナジンは血液脳関門を移行しにくい第二世代の抗ヒスタミン薬で、中枢抑制は比較的弱い。",
      "オ": "㋒は妥当である。㋓のフェキソフェナジンを第一世代とする分類と、強い中枢抑制を示すとする説明はいずれも合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q050",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "抗うつ薬の再取り込み阻害と副作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "抗うつ薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　エスシタロプラムは、神経終末においてセロトニントランスポーターに選択的に作用し、セロトニンの再取り込みを阻害する。\n㋑　パロキセチンによる薬物療法を終了する際には、離脱症候群の発生を防ぐため、直ちに服用をやめる必要がある。\n㋒　イミプラミンは、口渇、便秘、排尿障害等の抗コリン作用による副作用に注意する必要がある。\n㋓　ミアンセリンは、依存性があるため、継続的な服用は4週間以内にとどめる必要がある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "エスシタロプラムはセロトニン選択的再取り込み阻害薬で、セロトニントランスポーターが作用点である。三環系のイミプラミンではムスカリン受容体の遮断による口渇、便秘、尿閉などが起こり得る。",
    "choiceExplanations": {
      "ア": "エスシタロプラムの作用点は妥当である。パロキセチンの急な中止は中止症状を起こし得るため、添付文書は段階的な減量を用いる。",
      "イ": "エスシタロプラムはセロトニン選択的再取り込み阻害薬で、セロトニントランスポーターが作用点である。三環系のイミプラミンではムスカリン受容体の遮断による口渇、便秘、尿閉などが起こり得る。",
      "ウ": "㋒の抗コリン作用は妥当である。㋑の急な中止は中止症状の原因となり得るので、予防策としては妥当でない。",
      "エ": "パロキセチンの急な中止は中止症状を増やすおそれがある。ミアンセリンに依存性を理由とする一律の4週間の上限はない。",
      "オ": "イミプラミンの副作用は妥当である。ミアンセリンは四環系抗うつ薬であり、依存性を理由に4週間以内とする記載は当てはまらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q051",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "がん分子標的薬とキナーゼ阻害",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "がんの分子標的治療薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　フィラデルフィア染色体陽性でイマチニブ抵抗性の白血病において、アレクチニブはBCR–ABLのチロシンキナーゼ活性を阻害する。\n㋑　腎細胞がんにおいて、エベロリムスはFKBP12と結合してmTORのセリン・スレオニンキナーゼ活性を阻害する。\n㋒　ALK又はROS1融合遺伝子陽性の非小細胞肺がんにおいて、クリゾチニブはALKやROS1のチロシンキナーゼ活性を阻害する。\n㋓　EGFR遺伝子変異（L858R及びT790M）陽性の非小細胞肺がんにおいて、ゲフィチニブはEGFRのチロシンキナーゼ活性を阻害する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "エベロリムスはFKBP12と複合体を作ってmTORC1の活性を阻害する。クリゾチニブはALKやROS1のチロシンキナーゼ活性を抑える。",
    "choiceExplanations": {
      "ア": "エベロリムスとFKBP12の複合体がmTORを阻害する点は妥当である。アレクチニブの主な標的はALKであり、BCR–ABLを標的とする白血病治療薬ではない。",
      "イ": "クリゾチニブはALKやROS1のキナーゼを阻害する。フィラデルフィア染色体に由来するBCR–ABLを狙う薬剤にはダサチニブなどがあり、アレクチニブではない。",
      "ウ": "エベロリムスはFKBP12と複合体を作ってmTORC1の活性を阻害する。クリゾチニブはALKやROS1のチロシンキナーゼ活性を抑える。",
      "エ": "㋑は妥当である。EGFRのT790M変異はゲフィチニブなど第一世代のEGFR阻害薬への耐性に関わる。",
      "オ": "クリゾチニブの作用点は妥当である。L858RとともにT790Mが存在するとゲフィチニブへの感受性が低く、T790Mには第三世代のオシメルチニブなどが用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q052",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "オピオイドの受容体とコデインの代謝",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "麻薬性鎮痛薬に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「モルヒネとフェンタニルは、主にオピオイド［㋐］に作用して強い鎮痛作用を示すほか、呼吸抑制や連用による依存を生じることがある。これらの薬剤とオピオイド［㋐］拮抗薬である［㋑］を併用すると、その効果が競合的に阻害される。また、コデインは、［㋒］によるO-脱メチル化を受けてモルヒネに代謝されて鎮痛作用を示すので、遺伝的に［㋒］が高活性の患者においては薬理作用が強く発現するおそれがある。」",
    "choices": {
      "ア": "κ受容体 ／ ナルメフェン ／ CYP2C19",
      "イ": "δ受容体 ／ ナプロキセン ／ CYP2C19",
      "ウ": "δ受容体 ／ ナルメフェン ／ CYP2D6",
      "エ": "μ受容体 ／ ナプロキセン ／ CYP2C19",
      "オ": "μ受容体 ／ ナルメフェン ／ CYP2D6"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "モルヒネとフェンタニルは主にμ受容体を刺激し、ナルメフェンは同受容体に拮抗する。コデインのモルヒネへのO-脱メチル化はCYP2D6が担うため、活性が高い場合は作用も強く現れ得る。",
    "choiceExplanations": {
      "ア": "ナルメフェンの拮抗作用は妥当である。モルヒネとフェンタニルの主な標的はμ受容体であり、コデインからモルヒネを生成する酵素はCYP2D6である。",
      "イ": "モルヒネとフェンタニルは主にμ受容体を刺激する。ナプロキセンはシクロオキシゲナーゼを阻害する非ステロイド性抗炎症薬であり、オピオイド拮抗薬には当たらない。",
      "ウ": "ナルメフェンとCYP2D6は妥当である。強い鎮痛作用や呼吸抑制に主に関わるのはδ受容体ではなくμ受容体である。",
      "エ": "μ受容体は妥当である。ナプロキセンはオピオイド拮抗薬ではなく、コデインのO-脱メチル化にはCYP2D6が関与する。",
      "オ": "モルヒネとフェンタニルは主にμ受容体を刺激し、ナルメフェンは同受容体に拮抗する。コデインのモルヒネへのO-脱メチル化はCYP2D6が担うため、活性が高い場合は作用も強く現れ得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q053",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "製剤の粉砕と造粒の特徴",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "製剤の単位操作に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　ジェットミル粉砕では圧縮空気の断熱膨張により試料の温度が上昇するため、熱に不安定な医薬品には適さない。\n㋑　ボールミル粉砕は容器全体を滅菌できるので、注射剤や点眼剤の原薬の粉砕に用いることができる。\n㋒　押し出し造粒機により得られる造粒物は、一般に円柱状で軽質である。\n㋓　攪拌造粒機により得られる造粒物は、一般に球状で重質である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "閉じたボールミルは容器ごと滅菌可能であり、無菌製剤用の原薬の粉砕に使える。攪拌造粒は高速混合で粒を転がし、一般に球状で密度の高い粒を得る。",
    "choiceExplanations": {
      "ア": "ボールミルを容器ごと滅菌できる点は妥当である。ジェットミルでは圧縮空気の断熱膨張による冷却もあり、温度上昇を抑えやすい。",
      "イ": "ジェットミルで断熱膨張すると気体は冷える方向に変化する。押し出し造粒では湿った原料を孔から圧縮して成形するため、得られる円柱状の粒は一般に緻密である。",
      "ウ": "無菌製剤の原薬に滅菌可能なボールミルを使える点は妥当である。押し出し造粒の円柱状の粒は圧縮されるため、一般に軽質ではなく重質である。",
      "エ": "閉じたボールミルは容器ごと滅菌可能であり、無菌製剤用の原薬の粉砕に使える。攪拌造粒は高速混合で粒を転がし、一般に球状で密度の高い粒を得る。",
      "オ": "攪拌造粒の粒形と密度は妥当である。押し出し造粒の粒は円柱状だが、圧縮成形されるため一般に軽質とはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q054",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "BCS分類、過飽和と結晶多形の転移温度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "薬物の溶解性に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　BCS（Biopharmaceutics Classification System）において、薬物の溶解性、膜透過性ともに低い薬物はClassⅡに分類される。\n㋑　一般に無水物の水への溶解度は水和物に比べて大きく、溶液がその温度における溶解度以上の溶質を含む過飽和状態となるが、時間の経過とともに水和物の溶解度まで低下する。\n㋒　HLB（Hydrophile-Lipophile Balance）が4～6の界面活性剤は、親水性が高く、難水溶性医薬品の可溶化作用がある。\n㋓　結晶多形を示す薬物は、それぞれの結晶形の溶解度の温度依存性から転移温度を知ることができる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "無水物が先に溶けて生じる過飽和は、水和物が析出してその平衡溶解度に近づくと解消する。二つの結晶形の溶解度曲線が交わる温度では両者の安定性が等しく、転移温度を推定できる。",
    "choiceExplanations": {
      "ア": "無水物の溶解後により安定な水和物が析出すれば濃度が下がる点は妥当である。BCSでは溶解性も膜透過性も低い薬物はClassⅣである。",
      "イ": "ClassⅡは低溶解性でも膜透過性は高い。HLBが小さい界面活性剤は親油性が強く、4～6を高親水性として扱うのは妥当でない。",
      "ウ": "㋑の過飽和から平衡への変化は妥当である。HLB 4～6は比較的親油性が強く、水中での可溶化には一般にもっと大きいHLBが使われる。",
      "エ": "無水物が先に溶けて生じる過飽和は、水和物が析出してその平衡溶解度に近づくと解消する。二つの結晶形の溶解度曲線が交わる温度では両者の安定性が等しく、転移温度を推定できる。",
      "オ": "結晶形ごとの溶解度から転移温度を推定できる点は妥当である。HLBは値が大きいほど親水性が高い目安であり、4～6は小さい側である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q055",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "投与経路、腸内pHと薬物吸収",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "薬物の吸収に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　腹腔内投与では、門脈を経て全身循環に入るため、初回通過効果を受ける。\n㋑　プロパンテリンは消化管運動を促進し、胃内容排出速度を上昇させるため、併用薬の吸収が遅延する。\n㋒　小腸における吸収が薬物の生体膜透過におけるpH分配仮説に従わない理由の一つは、刷子縁膜上のNa⁺／H⁺交換輸送系により、小腸細胞内よりも管腔側が酸性に傾いているからである。\n㋓　薬物の肺吸収は薬物の粒子径に依存し、0.1 μmの粒子が最も効率よく吸収される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "腹腔内からの吸収では門脈経由で肝代謝を受ける場合がある。小腸上皮のNa⁺／H⁺交換で刷子縁に酸性の微小環境が生じ、管腔全体のpHだけでは薬物の解離と吸収を説明できないことがある。",
    "choiceExplanations": {
      "ア": "腹腔内に投与された薬物には内臓側の吸収部位から門脈を通る分があり、肝初回通過を受け得る。プロパンテリンは抗ムスカリン薬なので胃内容の排出を遅らせる側である。",
      "イ": "腹腔内からの吸収では門脈経由で肝代謝を受ける場合がある。小腸上皮のNa⁺／H⁺交換で刷子縁に酸性の微小環境が生じ、管腔全体のpHだけでは薬物の解離と吸収を説明できないことがある。",
      "ウ": "刷子縁膜のすぐ近くに酸性の微小環境ができる点は妥当である。プロパンテリンは消化管のムスカリン受容体を遮断して、運動を抑える。",
      "エ": "プロパンテリンは胃内容排出を促進する薬ではない。吸入粒子の沈着や吸収は空気力学的径に依存するが、0.1 μmを一般的な最適径とはいえない。",
      "オ": "小腸上皮表面のpHが薬物の解離に影響する点は妥当である。吸入薬の肺内送達に適した粒径は通常、標的とする部位や製剤によって異なり、0.1 μmが一律に最適ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q056",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "ミカエリス・メンテン消失における定常投与量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "15歳の男性が強直間代発作の再発を認めたため、フェニトイン（PHT）散剤をPHT量として1回80 mg、1日3回、朝昼夕食後に服用することになった。10日間投与したところ、眼振、構音障害及び運動失調が現れたので、PHTの平均血中濃度を測定したところ、48 μg／mLであったことから、15 μg／mLまで低下させることにした。同一処方で、1日当たりのPHT量［mg］の値として最も妥当なのはどれか。\nただし、測定したPHT濃度は定常状態における平均血中濃度であり、PHTの体内からの消失速度はMichaelis-Menten式で表され、Michaelis定数を5 μg／mL、バイオアベイラビリティを100％とする。",
    "choices": {
      "ア": "50",
      "イ": "90",
      "ウ": "150",
      "エ": "200",
      "オ": "220"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "元の定常状態では240＝V_max×48／(5＋48)なのでV_max＝265 mg／日である。目標濃度を同じ式に代入した265×15／(5＋15)＝198.75 mg／日が、試験の選択肢では200 mg／日に当たる。",
    "choiceExplanations": {
      "ア": "定常状態での投与速度はV_max C／(K_m＋C)であり、濃度に単純比例しない。与えられた濃度と投与量からV_maxを求めると約265 mg／日となる。",
      "イ": "濃度48の時点で消失は最大速度の48／53に近い。濃度を15まで下げても消失速度は最大の15／20で、90 mg／日より大きい。",
      "ウ": "濃度15はK_m＝5の三倍なので、消失速度はV_maxの75％である。元の濃度と240 mg／日からV_maxを求めると、75％は約200 mg／日になる。",
      "エ": "元の定常状態では240＝V_max×48／(5＋48)なのでV_max＝265 mg／日である。目標濃度を同じ式に代入した265×15／(5＋15)＝198.75 mg／日が、試験の選択肢では200 mg／日に当たる。",
      "オ": "220 mg／日ではV_maxの約83％となる。濃度15での比は15／(5＋15)＝75％なので、220より小さい値を選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q057",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "遺伝毒性試験とニトロソアミン混入対策",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝毒性試験の原理や発がん性物質に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　Ames試験は、アミノ酸非要求性のネズミチフス菌株に被験物質を作用させ、アミノ酸要求性になることを利用した、突然変異検出法である。\n㋑　げっ歯類を用いる小核試験は、被験物質を作用させた動物について、骨髄や末梢血中の幼若赤血球における小核をもった細胞の比率を調べることで、染色体への影響を判定する。\n㋒　アマニチンはカビ毒の一種であり、ビスフラン環が代謝されてエポキシドが形成されることで、肝がんを誘発する発がん性物質となる。\n㋓　一部の医薬品から発がん性物質ニトロソアミン類が検出されたことを受け、厚生労働省より、製造販売業者に対して医薬品におけるニトロソアミン類混入リスクに関する自主点検を行うように通知された。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "小核は分裂時に取り残された染色体断片などに由来するため、幼若赤血球の小核頻度から染色体に対する影響を評価できる。厚生労働省の通知は医薬品へのニトロソアミン類の混入リスクを自主点検するよう求めた。",
    "choiceExplanations": {
      "ア": "幼若赤血球の小核を数える㋑は妥当である。Ames試験ではアミノ酸を必要とする試験株が復帰変異で非要求性になる変化を見るため、㋐の方向は逆である。",
      "イ": "㋐はAmes試験で調べる復帰変異の向きを逆に述べている。㋒はアフラトキシンB₁の発がん機序をアマニチンと混同している。",
      "ウ": "混入リスクの自主点検を求めた㋓は妥当である。㋐はアミノ酸要求性から非要求性への復帰を見る試験である点を取り違えている。",
      "エ": "小核は分裂時に取り残された染色体断片などに由来するため、幼若赤血球の小核頻度から染色体に対する影響を評価できる。厚生労働省の通知は医薬品へのニトロソアミン類の混入リスクを自主点検するよう求めた。",
      "オ": "㋓は妥当である。アマニチンはキノコ毒でRNAポリメラーゼⅡの阻害で知られ、ビスフラン環の代謝的活性化を述べた㋒はアフラトキシンB₁に対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q058",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "弱毒生、不活化及びトキソイドの対象疾患",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "以下の表は、我が国の予防接種に用いられるワクチンの種類と主な特徴についてまとめたものである。ワクチンの種類㋐、㋑、㋒の対象疾患の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "麻疹 ／ 流行性耳下腺炎 ／ 結核",
      "イ": "風疹 ／ ロタウイルス ／ 破傷風",
      "ウ": "百日咳 ／ ポリオ ／ ヒトパピローマウイルス感染症",
      "エ": "水痘 ／ 日本脳炎 ／ ジフテリア",
      "オ": "B型肝炎 ／ 百日咳 ／ 肺炎球菌感染症"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "水痘には弱毒生ワクチン、日本脳炎には不活化ワクチンを用いる。ジフテリアでは毒素の抗原性を保って無毒化したトキソイドを用いる。",
    "choiceExplanations": {
      "ア": "麻疹には弱毒生ワクチンを用いる。流行性耳下腺炎も通常は生ワクチンで、結核には弱毒生のBCGを用いるのでそれぞれ㋑、㋒には当たらない。",
      "イ": "風疹の弱毒生ワクチンと破傷風トキソイドは妥当である。日本の定期接種で用いるロタウイルスワクチンも経口の生ワクチンである。",
      "ウ": "現在の国内定期接種に使うポリオワクチンは不活化である。百日咳には抗原成分、ヒトパピローマウイルスにはウイルス様粒子を利用し、示された㋐と㋒には当たらない。",
      "エ": "水痘には弱毒生ワクチン、日本脳炎には不活化ワクチンを用いる。ジフテリアでは毒素の抗原性を保って無毒化したトキソイドを用いる。",
      "オ": "百日咳の無細胞ワクチンは㋑の例である。B型肝炎は組換え抗原を使用し、肺炎球菌は莢膜の多糖抗原などを用いるため、㋐および㋒には当たらない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q058.webp"
    ],
    "imageAltTexts": [
      "生、不活化・抗原成分、トキソイドの三種類のワクチンの特徴"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q059",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "酵母の発酵、グルテンとパンの焼き色",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "製パンに関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「パンは代表的な発酵食品の一つであり、その製造過程では微生物が重要な役割を果たしている。製パン材料の一つである酵母は、一般に糖を分解してエタノールや二酸化炭素を発生させる。このうち、［㋐］はパンを膨らませることに大きく寄与する。これは、パン生地をよくこねると、小麦粉中の［㋑］とグルテニンが複合し、［㋒］と呼ばれる網目状の構造が形成されることによる。\nまた、パンを焼く際、生地に含まれる糖とアミノ酸が［㋓］反応を起こすことで、パンの外皮は褐色に色付く。」",
    "choices": {
      "ア": "エタノール ／ グルテン ／ グリアジン ／ カラメル化",
      "イ": "エタノール ／ グリアジン ／ グルテン ／ メイラード",
      "ウ": "二酸化炭素 ／ グルテン ／ グリアジン ／ メイラード",
      "エ": "二酸化炭素 ／ グリアジン ／ グルテン ／ カラメル化",
      "オ": "二酸化炭素 ／ グリアジン ／ グルテン ／ メイラード"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "酵母が生じる二酸化炭素を、グリアジンとグルテニンが作るグルテン網目が保持する。加熱時には還元糖とアミノ基が反応するメイラード反応で外皮に褐色が生じる。",
    "choiceExplanations": {
      "ア": "生地の中で気泡を作る主な物質は二酸化炭素である。グルテンはグリアジンとグルテニンを含む網目構造の名称である。",
      "イ": "グルテンの組成と褐色化の反応は妥当である。発酵で発生して生地の網目に保持される気体は二酸化炭素である。",
      "ウ": "二酸化炭素とメイラード反応は妥当である。小麦のグリアジンとグルテニンが混ざってできる構造がグルテンなので、成分と構造名が逆である。",
      "エ": "膨張と生地の構造の説明は妥当である。カラメル化は糖の加熱による反応で、糖とアミノ酸が関わる焼き色の反応はメイラード反応である。",
      "オ": "酵母が生じる二酸化炭素を、グリアジンとグルテニンが作るグルテン網目が保持する。加熱時には還元糖とアミノ基が反応するメイラード反応で外皮に褐色が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q060",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "コーヒーの苦味と抽出・乾燥の物質収支",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "コーヒー製品に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　コーヒーに含有されるカフェインは、苦味を呈する化合物である。\n㋑　100 kgの焙煎粉砕豆を使用し、温水を加えて200 kgの抽出液を得た。この抽出液中の可溶性成分の濃度が20 wt％であるとき、抽出で取り出された可溶性成分の質量は20 kgである。\n㋒　可溶性成分19 wt％の抽出液1000 kgから、水を蒸発させることで、含水率5 wt％の粉末製品を製造することを考える。このとき、蒸発させる水の質量は800 kgである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "カフェインはコーヒーの苦味に寄与する。㋒では固形分190 kgが製品の95％に当たるので製品質量200 kg、蒸発水量1000−200＝800 kgとなり、㋑の抽出成分量は200×0.20＝40 kgである。",
    "choiceExplanations": {
      "ア": "カフェインは苦味を持つので㋐は妥当である。㋒では製品中に190 kgの可溶性固形分が残り、製品200 kgとなるので蒸発量も妥当である。",
      "イ": "カフェインが苦味を示す点は妥当である。可溶性成分20％を掛けるべき質量は豆100 kgではなく抽出液200 kgであり、40 kgを得る。",
      "ウ": "カフェインはコーヒーの苦味に寄与する。㋒では固形分190 kgが製品の95％に当たるので製品質量200 kg、蒸発水量1000−200＝800 kgとなり、㋑の抽出成分量は200×0.20＝40 kgである。",
      "エ": "濃度20 wt％は得られた抽出液全体の質量を基準とする。200 kgの20％は40 kgなので、㋑は妥当でない。",
      "オ": "固形分を190 kgのまま濃縮する計算は妥当である。苦味を示すカフェインに関する㋐も含める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q061",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "乳化、コロイド粒子とダイラタント流体",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "コロイドに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　マヨネーズやバターは、分散媒と分散質が共に液体であるエマルションに分類される。マヨネーズはW／O型エマルション、バターはO／W型エマルションである。\n㋑　乳化剤は、分子内に疎水性部分と親水性部分の両方をもつ物質であり、この性質を利用してエマルションが形成される。\n㋒　コロイドは、10⁻¹¹ m以下の大きさの粒子が、他の物質中に均一に分散したものである。コロイド粒子は半透膜を通過せず、光を当てると光の乱反射によるブラウン運動という現象を示す。\n㋓　水や食用油では、ひずみ速度を変化させても粘度は変化せず一定であるが、デンプンを高濃度で水に分散させた流体では、ひずみ速度の増加とともに粘度が増加する。前者をニュートン流体、後者をダイラタント流体と呼ぶ。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "乳化剤は親水性部分と疎水性部分によって水と油の界面に集まり、分散を安定化する。ニュートン流体の粘度は一定で、ダイラタント流体の見かけの粘度はひずみ速度とともに増す。",
    "choiceExplanations": {
      "ア": "乳化剤が親水部と疎水部を持つ点は妥当である。マヨネーズは水中油滴のO／W型、バターは油中水滴のW／O型なので逆である。",
      "イ": "㋐は水相と油相の連続相を取り違えている。㋒のブラウン運動は周囲の分子の衝突による不規則運動で、光の散乱はチンダル現象である。",
      "ウ": "濃厚なデンプン懸濁液はせん断が強くなると見かけの粘度が上がる。㋐では油滴を水に分散させるマヨネーズがO／W型であり、記述の型が逆である。",
      "エ": "両親媒性の乳化剤については妥当である。コロイドの代表的な粒子は10⁻¹¹ mより大きく、光散乱とブラウン運動は異なる現象である。",
      "オ": "乳化剤は親水性部分と疎水性部分によって水と油の界面に集まり、分散を安定化する。ニュートン流体の粘度は一定で、ダイラタント流体の見かけの粘度はひずみ速度とともに増す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q062",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "食品タンパク質の等電点と豆腐の凝固",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "食品中のタンパク質等に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　大豆の主要タンパク質であるグリシニンは、酸性アミノ酸を多く含むため、塩基性タンパク質であるリゾチームより等電点が高い。\n㋑　グルタチオンは、グルタミン酸、システイン、グリシンがペプチド結合した含硫トリペプチドである。\n㋒　豆腐には、豆乳にCa²⁺やMg²⁺を加えることにより凝固する性質を利用して作られるものがある。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "グルタチオンはグルタミン酸のγ-カルボキシ基、システイン、グリシンから成る含硫トリペプチドである。豆腐ではCa²⁺やMg²⁺によって豆乳タンパク質を凝集させることができる。",
    "choiceExplanations": {
      "ア": "酸性側鎖が多いと、タンパク質はより低いpHで電荷が釣り合う。グリシニンの等電点は塩基性のリゾチームより低い。",
      "イ": "豆乳をカルシウム塩やマグネシウム塩で凝固させる㋒は妥当である。等電点の大小は㋐の記述と逆になる。",
      "ウ": "㋑のグルタチオンは三つのアミノ酸から成り、システインが硫黄を含む。豆乳の凝固に二価の金属イオンを使う㋒も妥当である。",
      "エ": "グルタチオンはグルタミン酸のγ-カルボキシ基、システイン、グリシンから成る含硫トリペプチドである。豆腐ではCa²⁺やMg²⁺によって豆乳タンパク質を凝集させることができる。",
      "オ": "豆腐を作るための二価陽イオンは妥当である。グルタチオンの構成アミノ酸についての㋑も含まれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q063",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "鉄、亜鉛、セレンの栄養上の役割",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の表は、日本人の食事摂取基準（2025年版）の一部である。ミネラルに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　Aはヘモグロビンやミオグロビンの構成成分である。\n㋑　Bは様々な酵素の構成成分である。Bが欠乏すると、発育遅延、味覚障害、皮膚障害などの症状がみられる。\n㋒　Cは甲状腺ホルモンの主な構成成分であり、食品では主に海藻に多く含まれる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Aは鉄で、ヘモグロビンとミオグロビンのヘム中に含まれる。Bは亜鉛であり、複数の酵素に含まれて欠乏時に味覚障害などが起こる。",
    "choiceExplanations": {
      "ア": "Aは鉄で、ヘモグロビンとミオグロビンのヘム中に含まれる。Bは亜鉛であり、複数の酵素に含まれて欠乏時に味覚障害などが起こる。",
      "イ": "鉄についての㋐は妥当である。甲状腺ホルモンの構成成分は表に名称があるヨウ素であり、Cのセレンではない。",
      "ウ": "亜鉛が酵素に関わり、欠乏時に味覚障害がみられる点は妥当である。鉄は赤血球と筋肉の酸素結合タンパク質に含まれるので㋐も加える。",
      "エ": "㋑は妥当であるが、Cはセレンであり、ヨウ素とは別の行に示されている。ヨウ素は甲状腺ホルモン分子に組み込まれる元素である。",
      "オ": "海藻に多く甲状腺ホルモンを構成するミネラルはヨウ素である。Cのセレンは一部の酵素の構成などに関わる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q063.webp"
    ],
    "imageAltTexts": [
      "18～29歳の男女のミネラル摂取基準の抜粋"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q064",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "香辛料の辛味成分の構造",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "香辛料に関する次の表の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "カプサイシン ／ ピペリン ／ ジンゲロール",
      "イ": "ピペリン ／ カプサイシン ／ ジンゲロール",
      "ウ": "ピペリン ／ ジンゲロール ／ カプサイシン",
      "エ": "ジンゲロール ／ カプサイシン ／ ピペリン",
      "オ": "ジンゲロール ／ ピペリン ／ カプサイシン"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋐はショウガのジンゲロールで、側鎖にケトンと水酸基を含む。㋑はピペリジン環を含むピペリン、㋒は不飽和側鎖を持つアミドのカプサイシンである。",
    "choiceExplanations": {
      "ア": "㋑のピペリンは妥当である。㋐に窒素を含むアミドがなく、ケトンとアルコールがあるのでカプサイシンではなくジンゲロールである。",
      "イ": "ピペリンの目印である窒素を含む六員環は㋑にある。㋒の芳香環を持つアミドはトウガラシのカプサイシンである。",
      "ウ": "㋒のカプサイシンは妥当である。ピペリンはコショウの辛味成分で、ピペリジン環を持つ㋑に対応する。",
      "エ": "㋐はショウガのジンゲロールである。㋑の窒素は環の一部でありピペリンを示し、㋒のアミド型の側鎖はカプサイシンである。",
      "オ": "㋐はショウガのジンゲロールで、側鎖にケトンと水酸基を含む。㋑はピペリジン環を含むピペリン、㋒は不飽和側鎖を持つアミドのカプサイシンである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q064.webp"
    ],
    "imageAltTexts": [
      "香辛料の辛味成分三つの構造式と主な作用"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q065",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "土壌の団粒、孔隙と耕盤層",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "土壌がもつ様々な物理的性質に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　土壌は保水性と透水性という一見矛盾する性質を併せもつ。これは土壌が団粒構造を形成し、団粒内や団粒間に様々な大きさの孔隙をもつためである。\n㋑　土壌水は、「毛管水」＞「膨潤水・吸湿水」＞「重力水」の順に土壌に強く吸着・保持される。「毛管水」は、植物が吸水できない無効水に相当し、「重力水」は、植物が容易に吸水可能な有効水に相当する。\n㋒　貫入式硬度計で土壌硬度を測定したところ、作土直下において急激に高くなった。ここに耕盤層が形成されていると判断し、透水性を上げるために、深耕や耕盤破砕を行った。\n㋓　土壌中の気相を満たす土壌空気では、微生物が排出した様々なガスが大気と速やかに交換し、大気とほぼ同じガス組成を保つ。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "団粒内の小孔隙は水を保ち、団粒間の大孔隙は水を通しやすい。硬い耕盤層は排水や根の伸長を妨げるため、深耕や耕盤破砕で孔隙の連続性を改善できる。",
    "choiceExplanations": {
      "ア": "団粒に大小の孔隙がある㋐は妥当である。強く保持される吸湿水を無効水として考え、保持力が中程度の毛管水には根が使える分がある。",
      "イ": "団粒内の小孔隙は水を保ち、団粒間の大孔隙は水を通しやすい。硬い耕盤層は排水や根の伸長を妨げるため、深耕や耕盤破砕で孔隙の連続性を改善できる。",
      "ウ": "㋐は妥当である。微生物や根の呼吸が酸素を消費して二酸化炭素を生じる一方、土壌中では拡散が制限されるため、気相の組成は大気と異なり得る。",
      "エ": "耕盤層の破砕で透水性を改善する㋒は妥当である。重力水は大孔隙を通って移動しやすく、植物にとって持続的に利用できる水は主に一部の毛管水である。",
      "オ": "吸湿水は土壌粒子に強く結合して植物が利用しにくい。土壌内の気体も大気と常に同じにはならず、呼吸によって酸素が少なく二酸化炭素が多くなることがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q066",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "土壌のpH、変異荷電と養分の可給性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "植物の必須元素の土壌溶液組成と吸着反応に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「［㋐］では無機態窒素の多くが硝酸イオンとして土壌溶液に存在するが、土壌への吸着は起きにくく、降水と共に容易に溶脱される。［㋑］に富む土壌では低pH領域で正電荷が発現し、硝酸イオンが吸着され得る。リン酸イオンは低pH領域で鉄や［㋒］との結合により不溶化し、植物による利用率は低い。微量必須元素である亜鉛や銅などはpHが［㋓］なるほど表面錯体を形成して不溶化するため、植物への欠乏症が出やすい。」",
    "choices": {
      "ア": "水田などの嫌気的条件 ／ 永久荷電 ／ カルシウム ／ 高く",
      "イ": "水田などの嫌気的条件 ／ 変異荷電 ／ アルミニウム ／ 高く",
      "ウ": "畑などの好気的条件 ／ 永久荷電 ／ アルミニウム ／ 低く",
      "エ": "畑などの好気的条件 ／ 変異荷電 ／ アルミニウム ／ 高く",
      "オ": "畑などの好気的条件 ／ 変異荷電 ／ カルシウム ／ 低く"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "好気的な畑では硝化で硝酸が生じ、低pHで変異荷電表面が正に帯電すると硝酸が吸着され得る。低pHでは鉄・アルミニウムにリン酸が固定されやすく、亜鉛や銅は高pHで可給性が低下しやすい。",
    "choiceExplanations": {
      "ア": "硝化は酸素がある条件で進みやすく、還元的な水田ではアンモニウムが残りやすい。酸性土壌でリン酸を固定する主要元素は鉄とアルミニウムである。",
      "イ": "変異荷電、アルミニウムと高pHの説明は妥当である。ただし硝酸イオンへの硝化は好気的な畑で進みやすい。",
      "ウ": "好気的条件と酸性でのアルミニウムによるリン固定は妥当である。低pHで正電荷が現れるのはpHに依存する変異荷電で、亜鉛や銅の不溶化は高pHで起きやすい。",
      "エ": "好気的な畑では硝化で硝酸が生じ、低pHで変異荷電表面が正に帯電すると硝酸が吸着され得る。低pHでは鉄・アルミニウムにリン酸が固定されやすく、亜鉛や銅は高pHで可給性が低下しやすい。",
      "オ": "好気的条件と変異荷電は妥当である。酸性側でのリン酸固定は鉄やアルミニウムが中心で、亜鉛や銅の欠乏は高pH側で起きやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q067",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "ミミズ、根粒菌と菌根菌の役割",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "土壌生物に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　ミミズは、粗大な有機物を破砕すると同時に土壌も摂食し、ふん塊を形成する。\n㋑　土壌有機物に含まれる有機態窒素の一部は、土壌動物による生物的窒素固定反応によって、硝酸イオンへ変えられる。\n㋒　根粒菌は、共生した植物から炭素化合物を受け取り、また土壌からリンを吸収し宿主植物に供給している。一方、菌根菌は、生物的窒素固定を行っている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ミミズは有機物と土壌粒子を摂食して破砕・混合し、ふん塊を作る。窒素固定は空気中のN₂の利用であり、共生根粒菌の役割である。",
    "choiceExplanations": {
      "ア": "ミミズは有機物と土壌粒子を摂食して破砕・混合し、ふん塊を作る。窒素固定は空気中のN₂の利用であり、共生根粒菌の役割である。",
      "イ": "ミミズのふん塊形成は妥当である。根粒菌が窒素固定を担い、菌根菌がリン吸収を助けるので㋒は役割が逆である。",
      "ウ": "有機態窒素がアンモニウムに変わるのは無機化で、そこから硝酸ができる段階は硝化である。生物的窒素固定は大気由来のN₂をアンモニアに変える反応である。",
      "エ": "㋑は窒素固定と有機態窒素の無機化・硝化を混同している。㋒は根粒菌と菌根菌の代表的な役割を入れ替えている。",
      "オ": "菌根菌の菌糸は根の周囲からリンなどを吸収して宿主に渡す。窒素固定を行う代表例はマメ科植物と共生する根粒菌である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q068",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "ジベレリンの発見と植物生長調節",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ジベレリンに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　ジベレリンは、ムギ馬鹿苗病菌から単離され、発見された。ジベレリンのうち、農薬として主に利用されているのは、ジベレリンA₁（GA₁）である。\n㋑　植物ホルモンとして知られているジベレリンは、植物の成長を促進又は抑制するはたらきがあり、植物成長調節剤として利用されている。\n㋒　ジベレリンは、ぶどうの栽培において、無種子化や可食部の肥大化の用途に利用されている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ジベレリンは伸長や生殖成長などに関わり、用途に応じた植物成長調節に使われる。ぶどうの種なし化や果粒の肥大への利用は、その例である。",
    "choiceExplanations": {
      "ア": "ジベレリンの発見につながったのはイネのばか苗病である。栽培でよく用いられる製剤の成分はGA₃で、GA₁とは異なる。",
      "イ": "ジベレリンが植物成長調節剤に使われることは妥当である。発見の由来と農業で広く利用されるジベレリン種の両方が㋐では異なる。",
      "ウ": "ぶどうへの利用は妥当であるが、ばか苗病の観察はイネに由来する。市販の代表的な有効成分もジベレリンA₃である。",
      "エ": "ジベレリンは伸長や生殖成長などに関わり、用途に応じた植物成長調節に使われる。ぶどうの種なし化や果粒の肥大への利用は、その例である。",
      "オ": "㋒のぶどうへの利用は妥当である。植物ホルモンとして成長を調整するために用いるという㋑も含める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q069",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "農薬の分解、吸着と環境中の移行",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "農薬の環境動態に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　土壌中における農薬の分解は、土壌表層又は田面水において太陽光によって引き起こされる光分解、土壌のpHや酸化還元等の化学的分解及び主に土壌微生物による生物的分解に大別される。\n㋑　農薬の水系への流出は、散布時の飛散を除けば、水田の場合は田面水への流出、畑の場合は降雨時の表流水と共に生じる場合が多く、疎水性が高い農薬ほど水系に流出しやすい。\n㋒　土壌中に粘土や有機物の含量が多いと、農薬が土壌に吸着保持されやすくなり、土壌中に農薬が残留する期間が長くなる傾向にある。\n㋓　農薬は、散布時の飛散や、農薬を散布した土壌や水中からの水蒸気蒸留や揮散等によって、大気へ移行する場合がある。大気中に移行した農薬は、紫外線によって分解されやすく、自然降下や雨水とともに降下する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "光、化学反応、微生物はそれぞれ分解経路になる。粘土や有機物への吸着により残留が長くなることがあり、揮散・飛散した分は大気で分解したり湿性・乾性沈着で戻ったりする。",
    "choiceExplanations": {
      "ア": "㋐の分解過程の分類は妥当である。疎水性の高い農薬は土壌有機物などに吸着されやすく、一般に溶存状態で流出しやすいとする㋑の方向は逆である。",
      "イ": "飛散や揮散の後に大気から分解・沈着する㋓は妥当である。㋑の疎水性の高いものは一般に水に溶けにくく、土粒子への吸着の影響が大きい。",
      "ウ": "光、化学反応、微生物はそれぞれ分解経路になる。粘土や有機物への吸着により残留が長くなることがあり、揮散・飛散した分は大気で分解したり湿性・乾性沈着で戻ったりする。",
      "エ": "粘土や有機物による保持は妥当である。一般には水に溶けやすい農薬が水と一緒に移動しやすく、疎水性の高いものの移動には粒子の流出など別の経路が関わる。",
      "オ": "土壌での吸着と大気を経由する移行は妥当である。分解を光・化学・生物の三経路に分ける㋐も加える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q070",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "残留性有機汚染物質と生物濃縮",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "残留性有機汚染物質（POPs：Persistent Organic Pollutants）に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　ポリ塩化ビフェニル（PCB）は、食物連鎖を通して高次栄養段階の生物に濃縮されることが知られている。\n㋑　有機塩素系殺虫剤のDDTは、残留性有機汚染物質に関するストックホルム条約により、製造・使用が全面的に禁止された。\n㋒　塩素数8以上のPCBは、塩素数4未満のPCBに比べて蒸気圧が高く、大気経由で拡散し、極地域に沈着・蓄積しやすい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "PCBは分解されにくく脂質に蓄積しやすいため、食物連鎖を上るほど濃度が高くなる場合がある。DDTには限定的な例外があり、PCBも塩素数の多いものほど一般に揮発しにくい。",
    "choiceExplanations": {
      "ア": "PCBは分解されにくく脂質に蓄積しやすいため、食物連鎖を上るほど濃度が高くなる場合がある。DDTには限定的な例外があり、PCBも塩素数の多いものほど一般に揮発しにくい。",
      "イ": "㋐の生物濃縮は妥当である。DDTはストックホルム条約の附属書Bで制限されるが、病気を媒介する昆虫の防除のための限定的な例外がある。",
      "ウ": "ストックホルム条約はDDTの製造と使用を制限する。代替手段が利用できない場合などの疾病媒介昆虫防除は、条件つきで認められている。",
      "エ": "DDTの規制には限定的な使用例外がある。PCBの蒸気圧は一般に塩素数の増加とともに下がるので、㋒の比較は逆である。",
      "オ": "塩素数が多いPCBは一般に揮発性が低く、より粒子や脂質に分配されやすい。大気中へ揮発しやすいのは相対的に塩素数が少ない側である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q071",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "脂質二重層の流動性、非対称性と薬剤排出",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "細胞膜に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　脂質二重層膜のリン脂質が不飽和脂肪酸を多く含む場合には、膜の流動性は低くなる。\n㋑　脂質分子が脂質二重層膜の反対面に動くことをフリップフロップと呼ぶが、その頻度は極めて低い。\n㋒　ホスファチジルコリンは、マクロファージが死細胞を認識するための目印として使われるが、それはホスファチジルコリンが通常時では細胞質側に局在していることを利用している。\n㋓　細胞膜にMDRトランスポーターが高発現するがん細胞では、抗がん薬に耐性を示すようになる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "リン脂質の極性頭部が二重層の疎水性内部を通るには障壁があるため、自発的なフリップフロップはまれである。MDRトランスポーターが薬物を細胞外へ排出すると、細胞内の薬物濃度が低下して耐性に寄与する。",
    "choiceExplanations": {
      "ア": "リン脂質の自発的なフリップフロップがまれである点は妥当である。不飽和脂肪酸の折れ曲がりは鎖の充填を妨げ、一般に膜の流動性を高める。",
      "イ": "不飽和脂肪酸が多いと膜脂質は密に詰まりにくい。死細胞の目印として外側に露出するのは、通常内側に多いホスファチジルセリンである。",
      "ウ": "自発的なフリップフロップは遅い。一方、死細胞の膜で目印となるリン脂質はホスファチジルセリンであり、㋒のホスファチジルコリンではない。",
      "エ": "リン脂質の極性頭部が二重層の疎水性内部を通るには障壁があるため、自発的なフリップフロップはまれである。MDRトランスポーターが薬物を細胞外へ排出すると、細胞内の薬物濃度が低下して耐性に寄与する。",
      "オ": "㋓の薬剤排出は妥当である。㋒は膜の細胞質側から外側へ出て認識される脂質の種類が異なり、ホスファチジルセリンが該当する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q072",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "逆転写酵素とcDNAの意味",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "逆転写に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　哺乳類のテロメラーゼは多酵素複合体で、逆転写酵素と似た反応を触媒する。\n㋑　ヒト免疫不全ウイルスⅠ型の逆転写酵素はDNAポリメラーゼとRNアーゼの両方のドメインをもち、RNA–DNA二本鎖のRNAを分解する。\n㋒　ヒトゲノム上に存在するレトロトランスポゾンのうち、LINE-1配列は逆転写による転移能を完全に失っている。\n㋓　分子生物学の実験において、逆転写反応によって合成されるDNAは、通常、cDNAと呼ばれるが、これはcompatible DNAの略語である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "テロメラーゼは自身のRNAを鋳型にしてDNAの末端を伸ばすRNA–タンパク質複合体である。逆転写酵素にはDNAを作る機能とRNA–DNA複合体のRNAを分解するRNase Hの機能がある。",
    "choiceExplanations": {
      "ア": "テロメラーゼは自身のRNAを鋳型にしてDNAの末端を伸ばすRNA–タンパク質複合体である。逆転写酵素にはDNAを作る機能とRNA–DNA複合体のRNAを分解するRNase Hの機能がある。",
      "イ": "テロメラーゼがRNAを鋳型にする点は妥当である。ヒトゲノム内のLINE-1の多くは不活性だが、一部には転移活性が残る。",
      "ウ": "逆転写酵素のRNase Hはハイブリッド中のRNAに作用する。LINE-1は全てが不活性というわけではなく、逆転写を介して転移可能な配列がある。",
      "エ": "㋑の二つの機能は妥当である。cDNAはRNAと相補的なDNAを指し、complementary DNAの略である。",
      "オ": "一部のLINE-1には転移能があり、完全に失われたわけではない。また、cDNAのcは相補性を表すcomplementaryに由来する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q073",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "シキミ酸経路と芳香族アミノ酸",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "芳香族アミノ酸の生合成に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「芳香族アミノ酸であるフェニルアラニン、チロシン、トリプトファンの生合成では、［㋐］で合成されるホスホエノールピルビン酸と、［㋑］で合成されるエリトロース4-リン酸が縮合する反応から始まり、シキミ酸を経て、共通の前駆体である［㋒］を生じる。［㋒］はトリプトファン合成へ進むか、フェニルアラニン、チロシン合成へ進むかの分岐点である。哺乳類はシキミ酸経路をもたないので、チロシンの合成は、フェニルアラニンを［㋓］することによって行われる。」",
    "choices": {
      "ア": "アミノ基転移 ／ β酸化 ／ インドール ／ アセチル化",
      "イ": "アミノ基転移 ／ ペントースリン酸経路 ／ プレフェン酸 ／ ヒドロキシ化",
      "ウ": "解糖系 ／ β酸化 ／ コリスミ酸 ／ リン酸化",
      "エ": "解糖系 ／ ペントースリン酸経路 ／ コリスミ酸 ／ ヒドロキシ化",
      "オ": "β酸化 ／ 解糖系 ／ インドール ／ アセチル化"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "解糖系のホスホエノールピルビン酸とペントースリン酸経路のエリトロース4-リン酸からシキミ酸経路が始まり、コリスミ酸で分岐する。哺乳類ではフェニルアラニンをヒドロキシ化してチロシンを作る。",
    "choiceExplanations": {
      "ア": "ホスホエノールピルビン酸は解糖系、エリトロース4-リン酸はペントースリン酸経路の中間体である。哺乳類のチロシンにはフェニルアラニンの芳香環への水酸基の導入が必要である。",
      "イ": "エリトロース4-リン酸の経路と、フェニルアラニンのヒドロキシ化は妥当である。プレフェン酸はコリスミ酸から分かれたフェニルアラニン・チロシン側の中間体である。",
      "ウ": "解糖系とコリスミ酸は妥当である。エリトロース4-リン酸はペントースリン酸経路ででき、チロシンには水酸基を付加する。",
      "エ": "解糖系のホスホエノールピルビン酸とペントースリン酸経路のエリトロース4-リン酸からシキミ酸経路が始まり、コリスミ酸で分岐する。哺乳類ではフェニルアラニンをヒドロキシ化してチロシンを作る。",
      "オ": "β酸化は脂肪酸分解の経路である。共通前駆体はコリスミ酸で、インドールはトリプトファン側のより後の段階に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q074",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "遺伝子ファミリーとrRNAの保存性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝子ファミリーに関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "一つのゲノム内で遺伝子重複によってできた類縁遺伝子をオルソログと呼び、例としてマウスのαグロビン遺伝子とβグロビン遺伝子がある。",
      "イ": "偽遺伝子は、機能的な遺伝子が重複して生じたコピー遺伝子に突然変異が起こることで生じるが、相同性を有するため機能的タンパク質RNAをコードする。",
      "ウ": "真核生物間で進化的に保存されているサイクリン依存性キナーゼは、細胞周期の主要制御因子であり、そのキナーゼ活性はサイクリンと複合体を形成することで不活性化される。",
      "エ": "免疫グロブリンスーパーファミリーは、哺乳類特有の多種多様なタンパク質群の総称で、抗体、MHC、CD4、T細胞受容体など様々な分子が含まれる。",
      "オ": "リボソームの小サブユニットのrRNAを構成する遺伝子配列は、真核生物、細菌、古細菌の間でよく保存されている。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "小サブユニットrRNAは翻訳に不可欠であり、三つのドメイン間で共通する構造と保存配列を持つ。その変異する領域と保存される領域の比較は系統の推定にも使われる。",
    "choiceExplanations": {
      "ア": "同じ祖先遺伝子から遺伝子重複で分かれたものはパラログである。オルソログは種分化で別の系統に分かれた対応遺伝子を指す。",
      "イ": "偽遺伝子は遺伝子に似た配列を保つが、変異などにより元のタンパク質を作る能力を失うことが多い。元の遺伝子との相同性だけで機能は保証されない。",
      "ウ": "サイクリン依存性キナーゼは細胞周期を制御する。サイクリンとの結合は活性化に必要であり、不活性化を引き起こすという説明は逆である。",
      "エ": "抗体やT細胞受容体は免疫グロブリン様ドメインを持つが、このドメインは哺乳類だけに限られない。ほかの動物の細胞接着分子などにも見られる。",
      "オ": "小サブユニットrRNAは翻訳に不可欠であり、三つのドメイン間で共通する構造と保存配列を持つ。その変異する領域と保存される領域の比較は系統の推定にも使われる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q075",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "ゲノムサイズと遺伝子数の関係",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生物のゲノムに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　生物のゲノムサイズを一倍体ゲノムに含まれる塩基対の数で比較したとき、ヒト＞ショウジョウバエ＞酵母＞大腸菌の順に大きい。\n㋑　原核生物は真核生物に比べてゲノムサイズが小さいが、原核生物のゲノムには調節DNA配列が大量にあるので、多様な遺伝子を時と場所に応じて働かせることができる。\n㋒　トラフグのゲノムは脊椎動物で知られている中では小さく、遺伝子間領域が小さいためヒトの約8分の1のゲノムサイズであるが、ヒトとほぼ同数の遺伝子をもつ。\n㋓　ヒトゲノムの約5％はタンパク質をコードしており、約45％は高頻度反復配列、残り約50％は特異的な配列からなるが、その機能はわかっていない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ヒト、ショウジョウバエ、酵母、大腸菌の例では、ゲノムの塩基対数はこの順に小さくなる。トラフグはヒトより非コード領域が小さいが、タンパク質をコードする遺伝子数は同程度である。",
    "choiceExplanations": {
      "ア": "㋐の代表例のゲノムサイズの順は正しい。原核生物では調節配列もあるが、一般に遺伝子の密度が高く、広い調節DNA領域が大量にあるという説明は合わない。",
      "イ": "ヒト、ショウジョウバエ、酵母、大腸菌の例では、ゲノムの塩基対数はこの順に小さくなる。トラフグはヒトより非コード領域が小さいが、タンパク質をコードする遺伝子数は同程度である。",
      "ウ": "トラフグが小さなゲノムでもヒトと同程度の遺伝子数を持つ点は妥当である。原核生物には調節の仕組みもあるが、一般に遺伝子間の領域は短く密に詰まる。",
      "エ": "原核生物についての調節DNAの説明は妥当でない。ヒトゲノムのうちタンパク質をコードする部分も約1～2％であって、5％より小さい。",
      "オ": "トラフグについての㋒は妥当である。ヒトの非コード部分の一部には調節配列や機能性RNAの遺伝子があり、残りの配列の機能が全て不明とはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q076",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "タンパク質の折りたたみと構造階層",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "タンパク質の基本構造に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「タンパク質を折りたたむ際の非共有結合には、［㋐］、イオン結合、ファンデルワールス引力がある。フェニルアラニン、ロイシンなどの［㋑］は、分子の内部に集まる傾向をもち、近接したペプチド結合間に生じる局所的な［㋐］でαヘリックスやβシート構造ができる。タンパク質の構造は四つの階層に分類され、アミノ酸配列は一次構造、αヘリックスやβシートは二次構造、複数のポリペプチド鎖からなる複合体は［㋒］で複数のサブユニットから構成される。」",
    "choices": {
      "ア": "水素結合 ／ 極性側鎖 ／ 三次構造",
      "イ": "水素結合 ／ 非極性側鎖 ／ 四次構造",
      "ウ": "ジスルフィド結合 ／ 極性側鎖 ／ 三次構造",
      "エ": "ジスルフィド結合 ／ 極性側鎖 ／ 四次構造",
      "オ": "疎水結合 ／ 非極性側鎖 ／ 三次構造"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ペプチド結合のC＝OとN−Hの間の水素結合が二次構造を支える。ロイシンなどの非極性側鎖は内部に集まりやすく、複数の鎖による複合体は四次構造である。",
    "choiceExplanations": {
      "ア": "主鎖の水素結合は妥当である。ロイシンやフェニルアラニンは非極性側鎖を持ち、複数鎖の組み合わせは四次構造に当たる。",
      "イ": "ペプチド結合のC＝OとN−Hの間の水素結合が二次構造を支える。ロイシンなどの非極性側鎖は内部に集まりやすく、複数の鎖による複合体は四次構造である。",
      "ウ": "ジスルフィド結合は二つのシステイン間の共有結合である。αヘリックスやβシートを作る主鎖の局所的な相互作用は水素結合である。",
      "エ": "四次構造は妥当である。ジスルフィド結合は非共有結合ではなく、フェニルアラニンとロイシンの側鎖は非極性である。",
      "オ": "側鎖の疎水性は内部に集まる理由になる。本文のペプチド主鎖の二次構造を支える結合は水素結合であり、複合体は四次構造である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q077",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "微生物の増殖、酸素耐性とグラム染色",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "微生物の分類や性状に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　微生物は、細菌、真核生物及び古細菌に分類され、そのうち、細菌と真核生物は有性生殖により増殖する。細菌の種の同定法には四分子分析法の連鎖解析が用いられる。\n㋑　微生物の培養は、水分や温度、pH、塩濃度、酸素濃度などの影響を受ける。通性嫌気性菌と偏性嫌気性菌の違いは、偏性嫌気性菌がカタラーゼとスーパーオキシドジスムターゼを共に欠くことによる。\n㋒　細菌は、グラム染色性の違いによりグラム陽性菌とグラム陰性菌に分類される。染色性の違いは細胞壁のペプチドグリカン構造に由来する。\n㋓　バクテリオファージのゲノムは、一本鎖あるいは二本鎖DNAから成る。ビルレントファージは宿主に感染後、そのDNAを宿主の微生物の染色体に組み込み、溶原化する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "本問では、酸素への耐性の違いをカタラーゼなどの活性酸素を処理する酵素と関連づけている。グラム陽性菌では厚いペプチドグリカンの層が一次染色の色素を保持し、陰性菌では脱色される。",
    "choiceExplanations": {
      "ア": "本問が想定する酸素感受性の違いには、活性酸素を処理する酵素の有無が関係する。㋐では細菌の増殖を有性生殖としているが、細菌は通常、二分裂で増える。",
      "イ": "グラム染色性は細胞壁の違いに由来する。四分子分析は酵母などの真核生物の減数分裂産物から遺伝を解析する手法で、細菌の種を同定する一般的な方法ではない。",
      "ウ": "本問では、酸素への耐性の違いをカタラーゼなどの活性酸素を処理する酵素と関連づけている。グラム陽性菌では厚いペプチドグリカンの層が一次染色の色素を保持し、陰性菌では脱色される。",
      "エ": "㋑は設問が想定する酸素感受性に対応する。溶原化は温和なファージの性質で、ビルレントファージは溶菌性の増殖をする。",
      "オ": "細胞壁の構造が染色性に関わる点は妥当である。ファージにはRNAをゲノムに持つ例もあり、ビルレントファージが溶原化するという記述も合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q078",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "清酒、味噌、チーズとビールの発酵",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "微生物を利用した飲食品の製造方法に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　清酒は原料である米、米麹及び水から並行複発酵により造られる。もろみは三段仕込みにより仕込まれ、酸や酵母密度が急激に希釈されないため、微生物汚染を防ぎながら製造される。\n㋑　豆味噌では、味噌玉の大きさは、Agaricus属である麹菌が多量に生成するプロテアーゼやペプチダーゼの酵素活性に影響を与える。味噌玉が大きいほどこれらの酵素活性が高い。\n㋒　ナチュラルチーズの製造は、原料乳を殺菌後、乳酸菌による発酵とレンネット（キモシン）の作用により、乳タンパク質中のカゼインを凝固させることから始まる。凝乳酵素としてはカビから調製されたレンネットが利用され、家畜由来のレンネットに頼らない方法が確立されている。\n㋓　ビールには上面発酵ビールと下面発酵ビールがある。一般的な製造では、上面発酵と下面発酵で使用される酵母は同じSaccharomyces属の酵母である。上面発酵の方が発酵温度は低く、後発酵もあるため発酵期間は長い。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "清酒のもろみでは麹による糖化と酵母によるアルコール発酵が並行し、三段仕込みで酸や酵母の急激な希釈を抑える。チーズでは乳酸発酵と凝乳酵素でカゼインを固め、動物由来以外の凝乳酵素も用いられる。",
    "choiceExplanations": {
      "ア": "清酒のもろみでは麹による糖化と酵母によるアルコール発酵が並行し、三段仕込みで酸や酵母の急激な希釈を抑える。チーズでは乳酸発酵と凝乳酵素でカゼインを固め、動物由来以外の凝乳酵素も用いられる。",
      "イ": "清酒の並行複発酵は妥当である。一般にエールを作る上面発酵の方が、ラガーの下面発酵より温度が高く、発酵期間も短い。",
      "ウ": "チーズでは乳酸発酵と凝乳酵素によってカードを作る点が妥当である。味噌を造る麹菌はAspergillus属で、マッシュルームなどを含むAgaricus属ではない。",
      "エ": "豆味噌の麹菌はAspergillus属に属する。上面発酵ビールは一般に下面発酵ビールより高い温度で発酵させるため、㋓の温度関係が逆である。",
      "オ": "動物由来以外の凝乳酵素を用いるチーズは妥当である。低温で時間をかけるのは一般に下面発酵のラガーであり、上面発酵についての㋓は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q079",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "増殖曲線と一次・二次代謝産物",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "微生物の生菌数と代謝産物量の変化について記載した図に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　点線①は一次代謝物の生産量を示し、例としてCorynebacterium glutamicumが生産するアミノ酸の一つであるグルタミン酸がある。このグルタミン酸が大量蓄積される要因としてビオチンの制限がある。\n㋑　破線②は二次代謝物の生産量を示し、例としてStreptomyces griseusが生産する抗生物質のエリスロマイシンがある。このエリスロマイシンの生産はβ-因子により制御される。\n㋒　微生物の増殖曲線の③期は静止期で、Bacillus subtilisでは静止期末期に芽胞の形成が開始される。⑥期は減少期で、静置培養ではコンタミネーションや変異菌の出現により目的とする生菌数が減少する。\n㋓　微生物の増殖曲線の④期は対数増殖期で、Escherichia coliでは世代時間を求めることができる。⑤期は定常期で、回分培養では栄養素の枯渇などにより生菌数が変化しなくなる。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "①は増殖に伴い生じる一次代謝物で、グルタミン酸はその例である。④では生菌数の対数と時間の関係の傾きから世代時間が求まり、⑤では増殖と死滅が釣り合って生菌数がほぼ一定となる。",
    "choiceExplanations": {
      "ア": "一次代謝物が早くから蓄積する㋐は妥当である。③は増殖前に環境へ適応する誘導期であり、定常期は⑤に当たる。",
      "イ": "①は増殖に伴い生じる一次代謝物で、グルタミン酸はその例である。④では生菌数の対数と時間の関係の傾きから世代時間が求まり、⑤では増殖と死滅が釣り合って生菌数がほぼ一定となる。",
      "ウ": "Streptomyces griseusで知られる抗生物質はストレプトマイシンであり、エリスロマイシンの例とは合わない。⑥で生菌数が減る主要因には栄養枯渇などがあり、他の菌の混入は必要ない。",
      "エ": "④と⑤の説明は妥当である。エリスロマイシンの代表的な生産菌はSaccharopolyspora erythraeaで、㋑は菌種が異なる。",
      "オ": "㋓は妥当である。③は増殖前の誘導期であり、⑥の減少は培養系の栄養不足や老廃物の蓄積によっても起こる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q079.webp"
    ],
    "imageAltTexts": [
      "生菌数と二種類の代謝産物量の曲線及び③～⑥の各時期"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q080",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "260 nmの吸光度から求める二本鎖DNA濃度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "純度が1.8（A₂₆₀／A₂₈₀比）の二本鎖DNAサンプルの濃度を求めるために、紫外線（260 nm）の吸光度（A₂₆₀）を測定したところ、値は0.75であった。測定には、1 cmの光路長のキュベットを使用した。このサンプルの二本鎖DNA濃度として最も妥当なのはどれか。\nただし、吸光度値の0.75は、ランベルト・ベールの法則に従った値として妥当であり、二本鎖DNA濃度の定量に適応可能である。",
    "choices": {
      "ア": "24.75 μg／mL",
      "イ": "30 μg／mL",
      "ウ": "37.5 μg／mL",
      "エ": "50 μg／mL",
      "オ": "67.5 μg／mL"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二本鎖DNAでは光路長1 cmでA₂₆₀＝1が約50 μg／mLに相当する。ランベルト・ベールの法則で濃度は吸光度に比例するので、0.75×50＝37.5 μg／mLである。",
    "choiceExplanations": {
      "ア": "吸光度の比1.8は純度の指標であり、濃度への換算係数ではない。光路長1 cmの二本鎖DNAではA₂₆₀を50 μg／mLに対応させる。",
      "イ": "係数40 μg／mLは通常RNAの換算に用いられる近似値である。ここでは二本鎖DNAなので50 μg／mLを用いる。",
      "ウ": "二本鎖DNAでは光路長1 cmでA₂₆₀＝1が約50 μg／mLに相当する。ランベルト・ベールの法則で濃度は吸光度に比例するので、0.75×50＝37.5 μg／mLである。",
      "エ": "50 μg／mLは同じ光路長で吸光度が1の場合の濃度である。サンプルの吸光度0.75を掛けて補正する。",
      "オ": "A₂₆₀／A₂₈₀＝1.8は核酸試料の純度を示す目安なので、濃度にさらに掛けない。二本鎖DNAの濃度は0.75×50で求まる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q081",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "制限酵素、付着末端とDNAに作用する酵素",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝子工学において、DNAの特定の配列を認識して切断する制限酵素は、遺伝子の組換えやクローニングに不可欠なツールである。制限酵素に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　制限酵素は、バクテリアが外来ウイルスDNAを切断する酵素として発見された。\n㋑　DNAの制限酵素による切断様式には、付着末端と平滑末端の2種類があり、付着末端の特徴は、両鎖が同じ位置で切断され、突出部をもたないことである。\n㋒　EcoRIやHindⅢは、DNAの特定の塩基配列を認識して、付着末端を生成するようにDNAを切断する。\n㋓　ヘリカーゼは、DNAの超らせん構造を解消するために、一時的にDNAを切断する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "細菌の制限系では外来DNAを切断する酵素が働く。EcoRIとHindⅢは両鎖をずらして切断する制限酵素で、短い一本鎖の突出末端を残す。",
    "choiceExplanations": {
      "ア": "制限酵素の発見は、細菌が外来DNAを制限する現象に由来する。㋑で述べる突出部のない切断末端は平滑末端である。",
      "イ": "細菌の制限系では外来DNAを切断する酵素が働く。EcoRIとHindⅢは両鎖をずらして切断する制限酵素で、短い一本鎖の突出末端を残す。",
      "ウ": "EcoRIとHindⅢが付着末端を作る点は妥当である。両鎖がそろって切れ突出部がないのは平滑末端なので、㋑の説明が逆である。",
      "エ": "付着末端には一本鎖の突出部がある。DNAの一時的な切断と再結合で超らせんを調整する酵素はトポイソメラーゼであり、ヘリカーゼは二本鎖をほどく。",
      "オ": "㋒は妥当である。ヘリカーゼは相補鎖を引き離すが、超らせんを解くためにDNAの骨格を切断する役割は担わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q082",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "カルタヘナ法の使用区分と対象",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝子組換え生物等の使用等の規制による生物の多様性の確保に関する法律（カルタヘナ法）に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　遺伝子組換え生物等の使用等に先立ち、使用形態に応じて、遺伝子組換え生物等の環境放出を伴う「第一種使用等」と環境放出を伴わない「第二種使用等」とに分け、それぞれの使用に応じて、とるべき措置を定めている。\n㋑　カルタヘナ法は、遺伝子組換え生物の国境を越える移動に焦点を当て、生物多様性の保全及び持続可能な利用に悪影響を及ぼさないよう、安全な移送、取扱い及び利用について、十分な保護を確保するための措置を規定した「生物の多様性に関する条約のバイオセーフティに関するカルタヘナ議定書」を適切に運用するための法律である。\n㋒　外来の核酸を導入して作製される遺伝子改変マウス（トランスジェニックマウス、ノックアウトマウス）のうち、繁殖能力のないものは、拡散防止処置は必要ない。\n㋓　カルタヘナ法では、「遺伝子組換え生物等」を「細胞外において核酸を加工する技術や異なる分類学上の科に属する生物の細胞を融合する技術により得られた核酸又はその複製物を有する生物」と定義しており、ウイルスは生物ではないため、遺伝子組換えウイルスはカルタヘナ法の対象外である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "カルタヘナ法は、拡散防止措置を執らずに行う第一種使用等と、措置を執って行う第二種使用等を区分する。この法律はカルタヘナ議定書の適確な実施を確保し、生物多様性の確保を図るために制定された。",
    "choiceExplanations": {
      "ア": "カルタヘナ法は、拡散防止措置を執らずに行う第一種使用等と、措置を執って行う第二種使用等を区分する。この法律はカルタヘナ議定書の適確な実施を確保し、生物多様性の確保を図るために制定された。",
      "イ": "使用形態の区分は妥当である。繁殖能力を欠くことだけを理由に、遺伝子組換えマウスの拡散防止措置が不要になるわけではない。",
      "ウ": "カルタヘナ議定書の国内実施に関する説明は妥当である。第二種使用等には定められた拡散防止措置が必要で、繁殖能力の有無だけで判断できない。",
      "エ": "議定書に対応する法律である点は妥当である。法第2条は対象とする生物にウイルス及びウイロイドを含めている。",
      "オ": "繁殖能力がない場合も、それだけで拡散防止措置が不要とはいえない。ウイルスも法律上の生物に含まれるため、遺伝子組換えウイルスは一律に対象外ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q083",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "卵形成過程における核相",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "哺乳類の細胞㋐～㋓のうち、核相が単相（n）であるもののみを挙げているのはどれか。\n㋐　卵子\n㋑　始原生殖細胞\n㋒　第一極体\n㋓　卵原細胞",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "卵子と第一極体はともに第一減数分裂による相同染色体の分離後の細胞である。第一極体は染色分体がまだ対でも、相同染色体は一組なので単相となる。",
    "choiceExplanations": {
      "ア": "卵子は減数分裂を経て単相となる。始原生殖細胞は生殖細胞の前駆体であり、その段階では染色体を二組持つ。",
      "イ": "卵子と第一極体はともに第一減数分裂による相同染色体の分離後の細胞である。第一極体は染色分体がまだ対でも、相同染色体は一組なので単相となる。",
      "ウ": "卵子は単相であるが、卵原細胞は減数分裂前の二倍体細胞である。単相となるのは相同染色体が分離した後である。",
      "エ": "第一極体は第一減数分裂で単相になる。始原生殖細胞は減数分裂をまだ行っていないため複相である。",
      "オ": "始原生殖細胞と卵原細胞はいずれも減数分裂前の細胞である。核相は二つとも2nである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q084",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "両生類の原口と予定運命の移植実験",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "両生類の初期発生過程に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　精子侵入点は、表層回転によって灰色三日月環を形成する。\n㋑　原口は、桑実胚期において原口背唇部近傍の植物極側に形成される。\n㋒　神経板は、外胚葉の表皮分化を抑制する脊索から分化する。\n㋓　シュペーマンは、イモリ胚の交換移植実験で外胚葉の予定運命を発見した。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "公式正答は㋑と㋓であり、㋓のイモリ胚移植は外胚葉の予定運命とその決定を調べた実験である。㋑の背側の位置は原口形成に対応するが、標準的な発生段階では原口背唇の形成を桑実胚期ではなく原腸胚形成の開始とする。",
    "choiceExplanations": {
      "ア": "表層回転で見える灰色三日月環は、精子侵入点側ではなくその反対側にできる。原口の背側はその灰色三日月環側に形成される。",
      "イ": "灰色三日月環は精子が入った場所の反対側に現れる。神経板は誘導を受けた外胚葉に由来し、脊索そのものが分化してできるのではない。",
      "ウ": "交換移植で外胚葉の発生運命を調べた㋓は妥当である。灰色三日月環は精子侵入点と同じ位置にはできない。",
      "エ": "脊索などの近くの組織は神経誘導に関わるが、神経板に分化する細胞は外胚葉に由来する。そのため㋒を含む組合せは選べない。",
      "オ": "公式正答は㋑と㋓であり、㋓のイモリ胚移植は外胚葉の予定運命とその決定を調べた実験である。㋑の背側の位置は原口形成に対応するが、標準的な発生段階では原口背唇の形成を桑実胚期ではなく原腸胚形成の開始とする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q085",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "ショウジョウバエの分節とホメオティック遺伝子",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ショウジョウバエの胚発生に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　胚の前後軸は、受精前に合成されたビコイド及びナノスタンパク質の濃度勾配によって決定される。\n㋑　分節遺伝子群は、ギャップ遺伝子→ペア・ルール遺伝子→セグメント・ポラリティ遺伝子の順番で発現する。\n㋒　分節遺伝子群によって14に区画化された各体節は、ホメオティック遺伝子の発現により特有の形態に分化する。\n㋓　バイソラックス遺伝子群は頭部構造の、アンテナペディア遺伝子群は胸部と尾部構造の決定に関わる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ギャップ遺伝子からペア・ルール、セグメント・ポラリティへと段階を追って体節の区画が精密化される。区画化された各体節はホメオティック遺伝子の発現により位置に応じた形に分化する。",
    "choiceExplanations": {
      "ア": "分節遺伝子の働く順序は妥当である。卵の前後に母性由来で配置される主なものはmRNAで、タンパク質の勾配は受精後の翻訳によって生じる。",
      "イ": "㋒は体節の位置ごとの形態を定める遺伝子群の説明で妥当である。㋐は受精前に配置されるmRNAを、受精前に合成されたタンパク質と取り違えている。",
      "ウ": "ビコイドやナノスのタンパク質勾配は母性mRNAから形成される。バイソラックス複合体は主に胸部後方と腹部の体節の性質を定める。",
      "エ": "ギャップ遺伝子からペア・ルール、セグメント・ポラリティへと段階を追って体節の区画が精密化される。区画化された各体節はホメオティック遺伝子の発現により位置に応じた形に分化する。",
      "オ": "㋑の発現順序は妥当である。バイソラックス複合体は頭部ではなく後方の体節を、アンテナペディア複合体は主に前方の体節の性質を規定する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q086",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "胃の壁細胞とビタミンB₁₂の吸収",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの胃に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「胃液には、胃酸、内因子や、消化酵素である［㋐］などが含まれている。胃酸と内因子は［㋑］から産生され、小腸における栄養素の吸収に影響を与える。例えば、胃を全摘出すると回腸における［㋒］吸収能が低下した結果、平均赤血球容積の［㋓］を伴う貧血を生じることがある。」",
    "choices": {
      "ア": "トリプシン ／ 主細胞 ／ 鉄 ／ 増大",
      "イ": "トリプシン ／ 壁細胞 ／ ビタミンB₁₂ ／ 減少",
      "ウ": "ペプシン ／ 主細胞 ／ 鉄 ／ 減少",
      "エ": "ペプシン ／ 壁細胞 ／ ビタミンB₁₂ ／ 増大",
      "オ": "ペプシン ／ 壁細胞 ／ 鉄 ／ 減少"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "胃では主細胞由来のペプシノーゲンが酸性環境でペプシンになり、胃酸と内因子は壁細胞から分泌される。内因子不足で回腸からのビタミンB₁₂吸収が低下すると、大球性の貧血を生じ得る。",
    "choiceExplanations": {
      "ア": "トリプシンは膵臓に由来し、胃で働くタンパク質分解酵素はペプシンである。胃酸と内因子を分泌するのは胃の壁細胞である。",
      "イ": "壁細胞とビタミンB₁₂は妥当である。B₁₂不足で生じる巨赤芽球性貧血では、平均赤血球容積は減少せず増大する。",
      "ウ": "胃液の酵素であるペプシンは妥当である。内因子と胃酸は壁細胞から分泌され、内因子の欠乏で回腸でのビタミンB₁₂吸収が低下する。",
      "エ": "胃では主細胞由来のペプシノーゲンが酸性環境でペプシンになり、胃酸と内因子は壁細胞から分泌される。内因子不足で回腸からのビタミンB₁₂吸収が低下すると、大球性の貧血を生じ得る。",
      "オ": "ペプシンと壁細胞は妥当である。内因子との結合が回腸での吸収に必要なのはビタミンB₁₂で、欠乏では赤血球は大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q087",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "横隔膜、肺活量と換気障害",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの呼吸に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　肋間筋の収縮・弛緩による呼吸を胸式呼吸といい、呼息時には外肋間筋が収縮し、吸息時には内肋間筋が収縮することで行われる。\n㋑　横隔膜は胸腔と腹腔とを隔てる筋組織であり、弛緩時には胸腔の方に持ち上げられ半球状の形になり、収縮時には下方に移動する。\n㋒　肺活量とは、最大吸気状態から呼気として吐き出すことのできる最大の呼気量のことを指し、予備吸気量、1回換気量、及び予備呼気量の和で表すことができる。\n㋓　Baldwinの予測式から算出された肺活量予測値に対する実際の肺活量が％肺活量であり、この値が80％未満となると、閉塞性肺疾患と診断される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "横隔膜が収縮すると平坦に近づいて下へ移動し、弛緩すると上にドーム状になる。最大の吸息から吐き出せる肺活量は、1回換気量と吸気・呼気の二つの予備量を足した値である。",
    "choiceExplanations": {
      "ア": "横隔膜の説明は妥当である。外肋間筋は肋骨を引き上げる吸息筋で、内肋間筋の肋骨間部は主に努力呼息時に働く。",
      "イ": "肺活量については妥当である。吸息時に収縮した横隔膜が下がって胸腔を広げるという㋑も妥当である。",
      "ウ": "横隔膜が収縮すると平坦に近づいて下へ移動し、弛緩すると上にドーム状になる。最大の吸息から吐き出せる肺活量は、1回換気量と吸気・呼気の二つの予備量を足した値である。",
      "エ": "㋑は妥当である。予測値に対する肺活量が低いことは拘束性換気障害の指標であり、閉塞性の評価には一秒率を使う。",
      "オ": "肺活量の計算は妥当である。％肺活量80％未満は拘束性換気障害を示唆し、これだけで閉塞性肺疾患とは診断できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q088",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "体温調節、皮膚血流と熱産生",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの体温調節に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "体温調節の最高位中枢は下垂体中葉であり、延髄、脊髄、腹部内臓、皮膚などからの情報を受けるが、またそれ自体も温度感受性を有する。",
      "イ": "皮膚には温受容器と冷受容器の2種類の温度受容器があり、いずれも閾値はなく温度変化の大きさに対して敏感に応答する。",
      "ウ": "寒冷条件下や低体温時に生じる熱産生反応としてふるえ熱産生があり、体温低下により褐色脂肪細胞内で発現が増大した脱共役タンパク質1（UCP1）が中心的な役割を果たす。",
      "エ": "暑熱環境下や高体温時には、四肢末端部の動静脈吻合が開大し、皮膚血流量が増加するため、熱放散は促進される。",
      "オ": "蒸散性熱放散反応において、汗腺からの温熱性発汗と浅速呼吸による熱放散が中心的な役割を担っている。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "暑熱時には皮膚血管が拡張し、手足などの動静脈吻合を介する皮膚血流も増える。皮膚表面に運ばれる熱が増えるため、放散が促進される。",
    "choiceExplanations": {
      "ア": "温度感覚の情報を統合する主要部位は視床下部の視索前野などである。下垂体中葉を最高位中枢とする説明は当てはまらない。",
      "イ": "皮膚には温度に応じて活動する温・冷受容器がある。受容器や関与する温度感受性チャネルには応答する温度域があり、閾値がないわけではない。",
      "ウ": "褐色脂肪のUCP1はミトコンドリアでプロトン勾配を熱に変える非ふるえ熱産生を担う。ふるえ熱産生には骨格筋の反復収縮が関わる。",
      "エ": "暑熱時には皮膚血管が拡張し、手足などの動静脈吻合を介する皮膚血流も増える。皮膚表面に運ばれる熱が増えるため、放散が促進される。",
      "オ": "ヒトでは汗が皮膚表面から蒸発することで熱を失う。浅速呼吸による放熱が中心になるのは、発汗の少ない多くの動物で見られる仕組みである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q089",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "ミトコンドリア呼吸のState 2～5",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ミトコンドリアの呼吸活性は、酸素電極により酸素消費速度を測定することで調べることができる。例えば、密閉した容器に精製した無傷のミトコンドリア懸濁液を入れ、ADPや呼吸基質を添加すると、溶存酸素の消費速度から図のように五つの状態（State）に分類される。これらの状態を説明している記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。なお、図中の矢印は物質が添加された時点を示す。\n㋐　State2では、ADPは存在するが呼吸基質が無く、酸素の消費が抑えられている。この状態に呼吸基質であるグルコースを加えると、活性状態であるState3に移行する。\n㋑　State3では、ADPのリン酸化と呼吸基質の酸化が共役して酸素を消費している状態である。この状態からADPが枯渇すると呼吸基質の酸化が停止しているState4に移行する。\n㋒　State4では、生産されたATPが電子伝達系を直接阻害する生成物阻害が起こっている。この阻害は基質であるADPを添加することで解消され、再びState3に移行する。\n㋓　State5では、酸素が無く呼吸鎖の電子伝達活性が停止している。この状態でも、ミトコンドリア内膜のプロトン濃度勾配を維持するために、ATP合成酵素が逆反応することはない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "公式正答は㋑と㋓で、State3から4への移行はADP枯渇、State5への移行は酸素枯渇に対応する。図ではState4に遅い酸素消費が残り、ATP合成酵素は条件によって逆にATPを加水分解できるため、両記述の「停止」「逆反応することはない」は一般化できない。",
    "choiceExplanations": {
      "ア": "グルコースは通常、細胞質の解糖を経てからミトコンドリアの呼吸に寄与する。精製したミトコンドリアに図の状態から直接与える呼吸基質には、ピルビン酸やコハク酸などが使われる。",
      "イ": "ADP添加後の急な酸素消費は酸化的リン酸化に対応する。一方、㋐では細胞質の解糖を必要とするグルコースを精製ミトコンドリアの直接の呼吸基質としている。",
      "ウ": "ADPが消費されると速い酸素消費から遅いState4へ移行する。人事院の正答はこの㋑と、酸素枯渇時に呼吸鎖が止まる㋓を含む組合せである。",
      "エ": "State4の呼吸の低下はADPが乏しく、酸化的リン酸化が進まなくなるためである。ATPが電子伝達系を直接阻害するという㋒は速度変化を説明しない。",
      "オ": "公式正答は㋑と㋓で、State3から4への移行はADP枯渇、State5への移行は酸素枯渇に対応する。図ではState4に遅い酸素消費が残り、ATP合成酵素は条件によって逆にATPを加水分解できるため、両記述の「停止」「逆反応することはない」は一般化できない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q089.webp"
    ],
    "imageAltTexts": [
      "ADP及び呼吸基質の添加とState 1～5での溶存酸素量"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q090",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "シトクロムP450のヘム、局在と誘導",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "シトクロムP450ファミリーに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　シトクロムP450ファミリーでは、それぞれの薬物に対して厳格な基質特異性をもつ50以上のアイソザイムが、翻訳後修飾により生み出されている。\n㋑　飲酒時のアルコールを分解する経路には、アルコール脱水素酵素とは別に、主にミトコンドリア画分に分画されるシトクロムP450ファミリーが分解する経路もある。\n㋒　シトクロムP450ファミリーは、ヘムを補欠分子族として保持するモノオキシゲナーゼで、様々な細胞障害の原因となる物質を生成させる恐れがある。\n㋓　シトクロムP450ファミリーは、アルコールやタバコなどの種々の物質で発現誘導がかかることが知られていて、その結果、様々な薬物の体内動態に影響する。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "P450はヘムを持つモノオキシゲナーゼで、基質によっては反応性の高い代謝物を生じる。飲酒や喫煙などによる特定のCYPの誘導は薬物の代謝速度を変え得る。",
    "choiceExplanations": {
      "ア": "ヘムを持つ酸素添加酵素だという㋒は妥当である。多くのP450アイソザイムは個別の遺伝子に由来し、それぞれの基質が完全に一対一対応するわけではない。",
      "イ": "P450の発現誘導が薬物の体内動態に影響する点は妥当である。多数のアイソザイムは翻訳後修飾だけで生まれるのではなく、異なるCYP遺伝子に由来する。",
      "ウ": "㋒と㋓は妥当である。エタノールを代謝するCYP2E1の代表的な経路は小胞体由来のミクロソームに局在する。",
      "エ": "誘導が体内動態に影響する点は妥当である。エタノールのミクロソーム酸化系では、主に小胞体のCYP2E1が働くため㋑の局在が合わない。",
      "オ": "P450はヘムを持つモノオキシゲナーゼで、基質によっては反応性の高い代謝物を生じる。飲酒や喫煙などによる特定のCYPの誘導は薬物の代謝速度を変え得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q091",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "多分子シグナル集積体の形成と制御",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "細胞膜上のラフトや、アダプタータンパク質などの足場の上に形成される多分子シグナル集積体は、シグナルに応答する多様な分子が集積した構造体である。多分子シグナル集積体の予想される効果や弊害に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　多くのシグナル伝達タンパク質が複数の結合モジュールをもっているが、多分子シグナル集積体では様々な組合せで相互作用することが可能となり、結果的に複雑なシグナル伝達回路を生み出すことができる。\n㋑　多分子シグナル集積体でのシグナル伝達経路は複雑であっても、その出発点は単純に単一の受容体とリガンドの結合であるため、出力されるシグナルが増幅されることはない。\n㋒　多分子シグナル集積体ではシグナル応答系が複雑であり、かつ、シグナルやその受容体も類似しているものもあり、シグナル経路上の干渉が起こる。\n㋓　シグナルに応答して、多分子シグナル集積体が形成したり解離したりする場合があり、この機構を基にシグナルに対する応答性のオンオフを調節することも可能である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "足場への集積で異なる結合モジュールを持つ分子が近接し、複数の経路を組み合わせられる。集積体の形成や解離は、伝達に必要な分子間の接触を切り替えて応答を制御できる。",
    "choiceExplanations": {
      "ア": "複数の結合モジュールが多様な組合せを作る点は妥当である。活性化酵素一分子が多くの下流分子に働けるため、入力が一つでも出力は増幅し得る。",
      "イ": "足場への集積で異なる結合モジュールを持つ分子が近接し、複数の経路を組み合わせられる。集積体の形成や解離は、伝達に必要な分子間の接触を切り替えて応答を制御できる。",
      "ウ": "受容体の刺激を起点とするカスケードでも、下流の酵素反応の連鎖でシグナルは増幅できる。また、経路間干渉は足場での選択的な分子配置により抑えられることもある。",
      "エ": "形成・解離による応答の切り替えは妥当である。単一の受容体から出発しても下流の多くの分子が活性化され得るため、増幅が起こらないとはいえない。",
      "オ": "㋓は妥当である。経路間干渉は複数経路を結合する場合に起こり得るが、集積体は選択した経路を局所的に隔離する役割も持つ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q092",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "神経系を支えるグリア細胞の役割",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの神経系に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　神経組織において神経細胞やその突起の支持や栄養に与かる細胞をグリア細胞と呼び、その数は神経細胞の10倍にも及ぶ。\n㋑　オリゴデンドログリアは、神経細胞と血液の間の物質輸送を担うことで、血液脳関門として機能する。\n㋒　アストログリアは、末梢神経において軸索を覆う髄鞘を形成することで、跳躍伝導による神経伝達速度の大幅な向上を実現する。\n㋓　ミクログリアは、中枢神経系における免疫機能を担い、変性したニューロンに対する食作用などを行う。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "公式正答は㋐と㋓で、グリアは神経細胞を支え、ミクログリアは中枢で免疫と貪食を担う。グリアと神経細胞の比率は部位により大きく異なり、脳全体で10対1を適用することはできない。",
    "choiceExplanations": {
      "ア": "グリアは神経組織の支持や代謝を担う。血液脳関門を作る主な構造は脳毛細血管の内皮細胞間の密着結合であり、オリゴデンドログリアは中枢の髄鞘形成を担う。",
      "イ": "グリアには神経細胞を支持し細胞外環境を整える働きがある。末梢神経の髄鞘を形成するのはシュワン細胞であり、アストログリアではない。",
      "ウ": "公式正答は㋐と㋓で、グリアは神経細胞を支え、ミクログリアは中枢で免疫と貪食を担う。グリアと神経細胞の比率は部位により大きく異なり、脳全体で10対1を適用することはできない。",
      "エ": "アストログリアは血液脳関門の維持に関わり、オリゴデンドログリアは中枢で髄鞘を作る。末梢で髄鞘を形成するのはシュワン細胞である。",
      "オ": "ミクログリアは変性細胞や細胞片を貪食するので㋓は妥当である。㋒の跳躍伝導には髄鞘が関わるが、末梢での形成を担う細胞が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q093",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "線エネルギー付与、生物学的効果比とDNA損傷",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射線の線質に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　RBE（生物学的効果比）とは、ある吸収線量で当該放射線が引き起こす生物応答現象の程度を、同じ吸収線量の基準放射線が引き起こす同じ現象の程度で割ったものである。\n㋑　放射線の線質を示す指標として用いられるLET（線エネルギー付与）は、荷電粒子が飛跡単位長さ当たりに照射対象物に付与するエネルギー量である。\n㋒　LETの高い重粒子線は、照射した細胞のDNAに局所的に多数の損傷を与えることで、修復が困難なクラスター損傷を生成する。\n㋓　培養した哺乳動物細胞において、照射する放射線のLETが増加するにつれ、その増殖死を指標として評価したときのRBEは直線的に大きくなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "LETは粒子の飛跡に沿って単位長さ当たりに与えられるエネルギーである。高LETでは近接した複数のDNA損傷が生じやすく、一つずつの孤立損傷より修復が難しい。",
    "choiceExplanations": {
      "ア": "㋑は妥当である。RBEは同じ生物学的効果を起こす基準線と対象線の吸収線量の比であり、同じ線量での効果の比ではない。",
      "イ": "クラスター損傷を生じやすいという㋒は妥当である。㋐はRBEで同じ値にそろえるものを効果ではなく吸収線量としており、定義と合わない。",
      "ウ": "LETは飛跡の単位長さ当たりのエネルギー付与を表す。高LETの放射線が近接したDNA損傷を作りやすいという㋒も妥当である。",
      "エ": "LETは粒子の飛跡に沿って単位長さ当たりに与えられるエネルギーである。高LETでは近接した複数のDNA損傷が生じやすく、一つずつの孤立損傷より修復が難しい。",
      "オ": "㋒のクラスター損傷は妥当である。RBEはLETの増加とともに上がる範囲があるが、極めて高LETでは効率が低下することもあり、直線的な増加ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q094",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "放射線の確率的影響と組織反応",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射線の生物影響に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　同じ実効線量の被ばくの場合、内部被ばくは外部被ばくと比べ人体への確率的影響が大きい。\n㋑　原子炉や加速器で合成された人工の放射性元素は、自然界で生成した同一核種の放射性元素よりも生物影響が大きい。\n㋒　放射線は、細胞のDNAに突然変異を誘発することでアポトーシスを誘導する。\n㋓　確定的影響には、ある線量を超えると症状が現れるしきい値がある。",
    "choices": {
      "ア": "㋐、㋓",
      "イ": "㋑、㋒",
      "ウ": "㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "確定的影響は現在の放射線防護で組織反応とも呼ばれ、一定以上の線量で臨床影響が現れる。しきい線量を超えると、線量とともに症状の重さが増すことがある。",
    "choiceExplanations": {
      "ア": "確定的影響にはしきい線量がある。実効線量は内部と外部の被ばくによる確率的影響を比較するための防護上の指標であり、同じ値で内部だけが一律に大きいとはいえない。",
      "イ": "同じ核種であれば、放射線の種類やエネルギーは人工か天然かで変わらない。アポトーシスにはDNA損傷への応答が関わり、固定された突然変異を必要としない。",
      "ウ": "放射線による修復困難なDNA損傷などが細胞死の応答を引き起こし得る。塩基配列の突然変異が固定されることと、DNA損傷に反応してアポトーシスが起きることは別の過程である。",
      "エ": "㋓は妥当である。DNAが損傷すると細胞死の経路が働くことはあるが、突然変異の成立を前提とする㋒の説明は適さない。",
      "オ": "確定的影響は現在の放射線防護で組織反応とも呼ばれ、一定以上の線量で臨床影響が現れる。しきい線量を超えると、線量とともに症状の重さが増すことがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q095",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "遺伝形式と親から子への伝達",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝病に関する記述として最も妥当なのはどれか。ただし、各疾患の責任遺伝子の突然変異は起こらないものとする。",
    "choices": {
      "ア": "X連鎖顕性遺伝する病気の場合、罹患女性の娘が罹患する確率は25％である。",
      "イ": "ハンチントン病の場合、罹患男性の息子に、疾患の責任遺伝子が伝達される確率は25％である。",
      "ウ": "血友病の場合、罹患男性の息子には疾患の責任遺伝子は伝達されない。",
      "エ": "ダウン症の場合、第21染色体に特徴的な欠失がある。",
      "オ": "フェニルケトン尿症の場合、罹患男性の息子には疾患の責任遺伝子は伝達されない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一般的な血友病A・BはX連鎖であり、父親が息子に渡す性染色体はYである。したがって父親のX染色体上の責任遺伝子の変異は、その息子には父親から伝わらない。",
    "choiceExplanations": {
      "ア": "母親がヘテロ接合なら、娘は変異のあるX染色体を母親から受け取る確率が1／2である。既に娘に限っているので、性別の確率をさらに掛けない。",
      "イ": "ハンチントン病は常染色体顕性遺伝である。ヘテロ接合の父親から変異を受け継ぐ確率は、子の性別にかかわらず1／2である。",
      "ウ": "一般的な血友病A・BはX連鎖であり、父親が息子に渡す性染色体はYである。したがって父親のX染色体上の責任遺伝子の変異は、その息子には父親から伝わらない。",
      "エ": "ダウン症候群の代表的な核型は21トリソミーである。第21染色体由来の遺伝物質が過剰であり、欠失ではない。",
      "オ": "フェニルケトン尿症は常染色体潜性遺伝である。発症男性は責任遺伝子の変異のある対立遺伝子を息子にも伝え、息子の発症には母親からの対立遺伝子も関わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q096",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "ABO式血液型の対立遺伝子頻度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトのABO式血液型に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。ただし、ハーディー・ワインベルグの法則が成立しているものとする。\n\n「ある集団ではA型、B型、AB型、O型の人がそれぞれ64人、30人、8人、98人であった。この集団におけるB型遺伝子の対立遺伝子頻度は［㋐］、O型遺伝子の対立遺伝子頻度は［㋑］である。」",
    "choices": {
      "ア": "0.10 ／ 0.35",
      "イ": "0.10 ／ 0.70",
      "ウ": "0.15 ／ 0.35",
      "エ": "0.20 ／ 0.70",
      "オ": "0.25 ／ 0.50"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Oの頻度rはr²＝98／200＝0.49より0.70である。B型とO型を合わせた頻度は(q＋r)²＝(30＋98)／200＝0.64なので、Bの頻度qは0.80−0.70＝0.10となる。",
    "choiceExplanations": {
      "ア": "Bの対立遺伝子頻度0.10は妥当である。O型はOのホモ接合なので、その頻度98／200＝0.49の平方根がOの頻度となる。",
      "イ": "Oの頻度rはr²＝98／200＝0.49より0.70である。B型とO型を合わせた頻度は(q＋r)²＝(30＋98)／200＝0.64なので、Bの頻度qは0.80−0.70＝0.10となる。",
      "ウ": "30／200＝0.15はB型の表現型頻度であり、BBとBOを含む。対立遺伝子頻度は表現型頻度と同じではない。",
      "エ": "Oの頻度は妥当である。Bを0.20とするとB型又はO型の頻度は(0.20＋0.70)²＝0.81となり、実際の128／200＝0.64と合わない。",
      "オ": "O型の頻度は0.49なので、Oの対立遺伝子頻度はその平方根0.70である。B型とO型を足した頻度から、BとOの頻度の和が0.80と分かる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q097",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "フレームシフト、染色体異常と同義置換",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "突然変異に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　一つの遺伝子の連続したヌクレオチドが6個欠失すると、フレームシフト変異は起こらない。\n㋑　染色体の構造自体の突然変異には欠失、逆位、縮退、重複、転座がある。\n㋒　アミノ酸のコドンが終止コドンに変わることを、ミスセンス変異と呼ぶ。\n㋓　一つの遺伝子内のヌクレオチドの同義置換では、遺伝子産物の機能に変化は現れない。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "6は3の倍数なので、コード領域での6塩基の欠失で下流の読み枠はずれず、同義置換ではコードされるアミノ酸も変わらない。同義置換でもスプライシングなどに影響する例があり、㋓はタンパク質配列への直接の影響を問う場合の説明である。",
    "choiceExplanations": {
      "ア": "6塩基の欠失で下流の読み枠がずれない点は妥当である。終止コドンに変わる置換はナンセンス変異であり、ミスセンス変異は別のアミノ酸への置換である。",
      "イ": "6は3の倍数なので、コード領域での6塩基の欠失で下流の読み枠はずれず、同義置換ではコードされるアミノ酸も変わらない。同義置換でもスプライシングなどに影響する例があり、㋓はタンパク質配列への直接の影響を問う場合の説明である。",
      "ウ": "染色体の構造変異には欠失、重複、逆位、転座などがあるが、縮退は標準的な分類名ではない。終止コドンを生じる㋒もナンセンス変異である。",
      "エ": "同義置換でコードされるアミノ酸は変わらない。㋑の縮退は通常、複数のコドンが同じアミノ酸をコードする性質などを指し、染色体の構造変異とは区別する。",
      "オ": "コドンが終止コドンになると、そこで翻訳が終わるためナンセンス変異と呼ぶ。アミノ酸を変えない同義置換と区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q098",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "酵母の四分子分析から求める地図距離",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "酵母について、ある二つの座位の遺伝子型がAABBの株とaabbの株を交配し四分子分析を行ったところ、両親型の四分子が157個、非両親型の四分子が0個、テトラタイプの四分子が15個得られた。座位Aと座位Bの地図距離［センチモルガン］として最も妥当なのはどれか。",
    "choices": {
      "ア": "2.2",
      "イ": "4.4",
      "ウ": "4.8",
      "エ": "8.7",
      "オ": "9.6"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "テトラタイプでは四胞子のうち二胞子が組換え型で、他の非両親型四分子は0個である。全172四分子を分母に取ると(15／2)／172×100≈4.4 cMとなる。",
    "choiceExplanations": {
      "ア": "テトラタイプの四胞子のうち組換え型はAB、abではない二つである。テトラタイプの割合だけを求め、そこに1／2を一度掛ける。",
      "イ": "テトラタイプでは四胞子のうち二胞子が組換え型で、他の非両親型四分子は0個である。全172四分子を分母に取ると(15／2)／172×100≈4.4 cMとなる。",
      "ウ": "分母は両親型157個だけではなく、テトラタイプ15個も含む172個である。7.5を172で割った割合を百分率に直す。",
      "エ": "8.7は15／172を百分率で表した値である。テトラタイプ内で組換え型は半分なので、その値をさらに二で割る。",
      "オ": "全四分子にはテトラタイプも含める。さらにテトラタイプでは半数だけが組換え型であるため、テトラタイプの四分子数をそのまま組換え数とはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q099",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "大量絶滅の時代と現代の絶滅速度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生物種の絶滅に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　生命史上最大の大量絶滅は、ペルム紀末期に起きた巨大な火山活動によって引き起こされた。\n㋑　アンモナイトは、デボン紀の大量絶滅で地球上から姿を消した生物の一つである。\n㋒　哺乳動物の適応放散は、白亜紀末期の隕石衝突による大量絶滅よりも先に始まった。\n㋓　現在、1年当たりに絶滅する種数は、中生代に起きた大量絶滅におけるそれよりもはるかに大きい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ペルム紀末の最大規模の大量絶滅は、シベリアの大規模火山活動に伴う環境変化と結び付けられている。公式正答は現在の年当たりの絶滅種数が過去の大量絶滅の期間平均より高いとする㋓も含むが、過去の年単位の率の推定は化石記録の時間分解能に左右される。",
    "choiceExplanations": {
      "ア": "ペルム紀末の大量絶滅と巨大な火山活動の関連は妥当である。アンモナイトはデボン紀以降も存続し、最後のグループは白亜紀末の大量絶滅で消えた。",
      "イ": "ペルム紀末の最大規模の大量絶滅は、シベリアの大規模火山活動に伴う環境変化と結び付けられている。公式正答は現在の年当たりの絶滅種数が過去の大量絶滅の期間平均より高いとする㋓も含むが、過去の年単位の率の推定は化石記録の時間分解能に左右される。",
      "ウ": "アンモナイトはデボン紀で全て消えたのではなく、中生代にも広く分布した。試験が対比する哺乳動物の大規模な適応放散は、白亜紀末の絶滅後に進んだ。",
      "エ": "㋓は公式正答に含まれる。アンモナイトの最終的な絶滅は白亜紀末であり、デボン紀ではない。",
      "オ": "哺乳類の一部は中生代にも多様化したが、白亜紀末の大量絶滅後には空いた生態的地位へ大規模に放散した。本問ではこの放散を指して㋒を誤りとし、㋐と㋓を正答としている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q100",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "ヒト属のアフリカ外への進出と古人類との交雑",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "人類の進化に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　現生類人猿との共通祖先からの分岐の後、直立二足歩行の成立に先立って大脳の巨大化が始まった。\n㋑　ヒト以外のホモ属の種も、アフリカ以外の地域に進出することができた。\n㋒　現代人のゲノムにネアンデルタール人に由来する塩基配列が認められることは、ネアンデルタール人がヒトの祖先種であることの証拠の一つである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "現生人類以外でも、ホモ・エレクトスなどの化石がアフリカ外で見つかっている。現代人に残るネアンデルタール人由来のDNAは主に分岐後の交雑を示す。",
    "choiceExplanations": {
      "ア": "初期の人類では、小さな脳のままで直立二足歩行を示す化石がある。大脳の顕著な拡大は二足歩行の獲得より後に進んだ。",
      "イ": "他のホモ属もアフリカ外へ進出した点は妥当である。アウストラロピテクスなどでは脳が大きくなる前に二足歩行の特徴が見られる。",
      "ウ": "現生人類以外でも、ホモ・エレクトスなどの化石がアフリカ外で見つかっている。現代人に残るネアンデルタール人由来のDNAは主に分岐後の交雑を示す。",
      "エ": "他のホモ属が大陸間を移動した㋑は妥当である。ネアンデルタール人由来のDNAは別系統間の交雑で入り、ネアンデルタール人を現生人類の直接の祖先種とする根拠にはならない。",
      "オ": "ネアンデルタール人と現生人類は共通祖先から分かれた系統である。現代人にその配列が残ることは、種としての直接の祖先関係ではなく交雑の痕跡である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q101",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "種分化とドブジャンスキー・マラー型不和合性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "種分化に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　生態的種分化とは、環境への適応の違いが原因で、集団間の遺伝子流動が減り、生殖隔離が強まって新しい種が形成される進化のプロセスである。\n㋑　側所的種分化は、完全に地理的に隔離された集団間で起こる種分化である。\n㋒　異所的種分化は、同所的種分化よりも起こりやすい。\n㋓　ドブジャンスキー・マラー型不和合性は、異なる集団で独立に進化した変異により、雑種の適応度が下がる接合後隔離を説明するメカニズムである。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒、㋓",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "異なる環境への適応で集団が分かれることがあり、地理的隔離がある異所的種分化は遺伝子流動を抑えやすい。独立に生じた変異が雑種で組み合わさって不適合を起こすことは、接合後隔離の一つの説明になる。",
    "choiceExplanations": {
      "ア": "生態的適応の違いが生殖隔離につながる㋐は妥当である。側所的種分化は隣接する集団間で起き、完全な地理的隔離は異所的種分化の特徴である。",
      "イ": "生態的な選択の違いと、遺伝子流動を妨げる地理的隔離はどちらも種分化を促し得る。独立に進化した遺伝子の組合せに起因する接合後隔離の㋓も妥当である。",
      "ウ": "異なる環境への適応で集団が分かれることがあり、地理的隔離がある異所的種分化は遺伝子流動を抑えやすい。独立に生じた変異が雑種で組み合わさって不適合を起こすことは、接合後隔離の一つの説明になる。",
      "エ": "㋒と㋓は妥当である。側所的種分化で集団は隣接する分布域を持ち、境界などでは遺伝子流動が残り得る。",
      "オ": "独立に進化した変異の組合せによる雑種の適応度低下は妥当である。㋑の完全に分かれた分布域は、側所的ではなく異所的な状況を述べている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q102",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "流出を含むロジスティック式の係数比較",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ロジスティック式に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ある液体培地にx個体の微生物がおり、液体培地が外部に流出しているとする。このとき、微生物の個体数の増殖は下記の式(1)に従う。\n\ndx／dt＝rx(1−x／K)−Dx　……(1)\n\nここで、rは内的自然増加率、Kは環境収容力である。また、Dは、液体培地の体積V mL、流量が毎分F mLとしたとき、D＝F／Vで表される。微生物が含まれない液体培地が毎分F mL流入し、同量の液体培地が流出する。このとき式(1)は、ロジスティック式\n\ndx／dt＝r′x(1−x／K′)　……(2)\n\nの形とみなすことができる。流出があることで、みかけの内的自然増加率r′は［㋐］、みかけの環境収容力K′は［㋑］となる。」",
    "choices": {
      "ア": "r−D ／ K(1−D／r)",
      "イ": "r−D ／ K(1−D)／r",
      "ウ": "r−D ／ K",
      "エ": "r−D／K ／ K(1−D／r)",
      "オ": "r−D／K ／ K(1−D)／r"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "式(1)を展開するとxの係数がr−D、x²の係数が−r／Kである。式(2)と係数を合わせるとr′＝r−D、K′＝K(r−D)／rとなる。",
    "choiceExplanations": {
      "ア": "式(1)を展開するとxの係数がr−D、x²の係数が−r／Kである。式(2)と係数を合わせるとr′＝r−D、K′＝K(r−D)／rとなる。",
      "イ": "一次係数r−Dは妥当である。二次係数の比較はr′／K′＝r／Kなので、K′の分子には1−Dではなくr−Dを用いる。",
      "ウ": "流出によって一次の係数r′はr−Dになる。二次の係数は変わらないため、流出があってr′が小さくなればK′も小さくなる。",
      "エ": "K′の表式は妥当である。xに比例する流出項は−Dxなので、rの補正は−D／Kではなく−Dである。",
      "オ": "式(1)の一次係数はxの項だけを足してr−Dである。残る二次係数と一致するにはK′＝K(r−D)／rとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q103",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "生命表から求める純増加率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生命表に関する次の記述の空欄に当てはまるものとして最も妥当なのはどれか。\n\n「表は、0齢の個体180匹について、毎年個体数を記録したある生物の生命表である。この生物の純増加率は［　］である。」",
    "choices": {
      "ア": "0.536",
      "イ": "0.799",
      "ウ": "0.850",
      "エ": "1.143",
      "オ": "2.006"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "各齢の生存割合は個体数を初期の180で割った値であり、これに出生率を掛けて足す。すなわち(45×1.143＋27×1.917＋16×2.533)／180で約0.7985となり、0.799が最も近い。",
    "choiceExplanations": {
      "ア": "純増加率は各齢の生存率と出生率の積を足した値である。出生がある一部の齢だけを取ると全体を過小評価する。",
      "イ": "各齢の生存割合は個体数を初期の180で割った値であり、これに出生率を掛けて足す。すなわち(45×1.143＋27×1.917＋16×2.533)／180で約0.7985となり、0.799が最も近い。",
      "ウ": "出生率に掛ける生存割合の分母は各齢の前の個体数ではなく、0齢の180である。全年齢の寄与を足すと約0.799になる。",
      "エ": "1.143は1齢における一個体当たりの出生率である。1齢の実際の寄与にするにはそこに45／180を掛け、他の齢の寄与も足す。",
      "オ": "年齢ごとに生存割合が異なるため、出生率の単純和や単純平均は純増加率を表さない。各齢の出生数を初期個体数180で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2026/senmon-kagaku-seibutsu-yakugaku/q103.webp"
    ],
    "imageAltTexts": [
      "0～3齢の個体数と年齢別出生率の生命表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q104",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "アンブレラ種、キーストーン種と象徴種",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "保全対象種に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐　個体数が少なくても、生態系全体に大きな影響を与える種をアンブレラ種という。\n㋑　広い生息環境を必要とするため、その種の保全が他の多くの生物を保全することにもなる生物種をキーストーン種という。\n㋒　ある地域の保全の重要性を広く社会に訴えるために選ばれる種を象徴種という。\n㋓　キーストーン種であるかどうかは、環境に依存するものであり、ある場所ではキーストーン種であっても、他の場所ではキーストーン種でない場合がある。",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "象徴種は保全への関心を喚起するために選ばれ、群集への影響度だけで決まらない。キーストーン種としての機能は、捕食者・被食者や環境条件が変わると場所によって異なり得る。",
    "choiceExplanations": {
      "ア": "保全を普及させる象徴種の説明は妥当である。㋐はキーストーン種、㋑はアンブレラ種の定義であり、名称が逆である。",
      "イ": "環境によって種の影響力が変わる点は妥当である。広い生息地を守ることで他種にも利益を及ぼすのはアンブレラ種である。",
      "ウ": "象徴種は保全の重要性を社会に伝えるために用いる。個体数や現存量のわりに生態系への影響が大きい種はキーストーン種と呼ぶ。",
      "エ": "㋓は妥当だが、㋑の定義に当たるのはアンブレラ種である。キーストーン種の定義は生息域の広さではなく生態系への不釣り合いに大きな影響に関わる。",
      "オ": "象徴種は保全への関心を喚起するために選ばれ、群集への影響度だけで決まらない。キーストーン種としての機能は、捕食者・被食者や環境条件が変わると場所によって異なり得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q105",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "配偶システム、スニーカーと精子競争",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "動物の配偶行動に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐　繁殖期になると、一頭のオスが複数のメスを自分の縄張りに引き寄せて守り、そのメスの集団とだけ交尾を行うような形態をレックと呼ぶ。\n㋑　縄張りをもつオスがメスと交尾している間に、その縄張り内のメスと交尾しようとする寄生的な行動を示すオスをスニーカーという。\n㋒　魚類などにみられるように、成長や社会環境に応じてオスからメス、あるいはメスからオスへと性転換を行う現象のことを、性的二型と呼ぶ。\n㋓　トンボの中にはオスが交尾器の先などについた釣り針の返しのようなもので、メスの精子貯蔵器官にためられていた他のオスの精子を排除する種があり、精子競争の一つである。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "スニーカーは縄張りを持つオスの配偶機会に便乗して、自ら受精させる機会を得る。先に交尾した他のオスの精子を排除する行動は、受精をめぐる交尾後の精子競争である。",
    "choiceExplanations": {
      "ア": "他のオスの縄張りで配偶機会を得る㋑は妥当である。レックでは複数のオスが集まって求愛し、メスがその中から相手を選ぶ。",
      "イ": "レックはオスが集まってディスプレイする場所または配偶様式であり、特定のオスが雌群を守る形態とは異なる。性的二型は雌雄の形態などの違いを指す。",
      "ウ": "スニーカーは縄張りを維持せずに他のオスの配偶に割り込む戦術をとる。成長後に性が変わる㋒は性転換であって、性的二型ではない。",
      "エ": "スニーカーは縄張りを持つオスの配偶機会に便乗して、自ら受精させる機会を得る。先に交尾した他のオスの精子を排除する行動は、受精をめぐる交尾後の精子競争である。",
      "オ": "トンボの他個体の精子の排除は妥当である。性的二型はオスとメスの形や色などの差であり、個体が性を変える現象を指さない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2026-annual-senmon-kagaku-seibutsu-yakugaku-q106",
    "exam": "kokka-sogo-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "シアノバクテリアの一次共生と真核藻類の二次共生",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "光合成をする原生生物の系統と進化に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「一部の原生生物の祖先は、光合成細菌との細胞内共生で光合成を獲得した。このときに取り込まれた光合成細菌はグラム［㋐］細菌であり、現在の緑藻類の葉緑体にみられる二枚の膜はその名残であると考えられる。さらに、緑藻類などとの細胞内共生によって光合成を獲得した原生生物もある。エクスカバータに分類される［㋑］や、ストラメノパイルに分類される［㋒］などである。」",
    "choices": {
      "ア": "陰性 ／ ミドリムシ ／ 珪藻",
      "イ": "陰性 ／ シャジクモ ／ 紅藻",
      "ウ": "陽性 ／ ミドリムシ ／ 珪藻",
      "エ": "陽性 ／ シャジクモ ／ 紅藻",
      "オ": "陽性 ／ シャジクモ ／ 珪藻"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "最初の葉緑体の起源とされるシアノバクテリアはグラム陰性型の細胞外被を持つ。ミドリムシは緑藻由来、ストラメノパイルの珪藻は紅藻由来の二次共生で得た色素体を持つ。",
    "choiceExplanations": {
      "ア": "最初の葉緑体の起源とされるシアノバクテリアはグラム陰性型の細胞外被を持つ。ミドリムシは緑藻由来、ストラメノパイルの珪藻は紅藻由来の二次共生で得た色素体を持つ。",
      "イ": "シアノバクテリアの陰性型は妥当である。シャジクモと紅藻は一次葉緑体を持つ系統であり、提示された二つの原生生物群とは異なる。",
      "ウ": "ミドリムシと珪藻は妥当である。シアノバクテリアの細胞外被は内膜と外膜を持つグラム陰性型である。",
      "エ": "シャジクモは緑色植物の系統で、エクスカバータには入らない。紅藻もストラメノパイルではなく、その一部の色素体の祖先となった系統である。",
      "オ": "珪藻がストラメノパイルである点は妥当である。ミドリムシがエクスカバータに当たり、一次共生のシアノバクテリアは陰性型である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018344.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。"
  }
];
