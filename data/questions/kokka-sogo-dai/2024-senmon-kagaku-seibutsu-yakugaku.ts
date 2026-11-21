import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2024_SENMON_KAGAKU_SEIBUTSU_YAKUGAKU: Question[] = [
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q003",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "メタノールの標準生成エンタルピー",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "298 Kにおいて、メタノール（液体）の標準燃焼エンタルピーを−726 kJ・mol⁻¹、二酸化炭素（気体）の標準生成エンタルピーを−394 kJ・mol⁻¹、水（液体）の標準生成エンタルピーを−286 kJ・mol⁻¹とする。このとき、298 Kにおけるメタノール（液体）の標準生成エンタルピーとして最も妥当なのはどれか。",
    "choices": {
      "ア": "−1692 kJ・mol⁻¹",
      "イ": "−240 kJ・mol⁻¹",
      "ウ": "−46 kJ・mol⁻¹",
      "エ": "46 kJ・mol⁻¹",
      "オ": "1692 kJ・mol⁻¹"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "メタノール1 molの燃焼ではCO₂ 1 molとH₂O 2 molが生じる。ヘスの法則より、メタノールの標準生成エンタルピーは−394＋2×(−286)−(−726)＝−240 kJ・mol⁻¹である。",
    "choiceExplanations": {
      "ア": "この値は二酸化炭素と水の生成エンタルピーの和に燃焼エンタルピーを加えた値である。反応物の生成エンタルピーを出すには燃焼エンタルピーを差し引く。",
      "イ": "メタノール1 molの燃焼ではCO₂ 1 molとH₂O 2 molが生じる。ヘスの法則より、メタノールの標準生成エンタルピーは−394＋2×(−286)−(−726)＝−240 kJ・mol⁻¹である。",
      "ウ": "水が1 molだと仮定しても計算値は正の46 kJ・mol⁻¹になる。正しい係数は水2 molなので、生成物の和には水の生成エンタルピーを2回加える。",
      "エ": "反応熱は生成物と反応物の生成エンタルピーの差である。生成物の合計−966 kJ・mol⁻¹から燃焼エンタルピー−726 kJ・mol⁻¹を引くと負の値になる。",
      "オ": "メタノールの生成エンタルピーを求めるには、生成物の合計と燃焼エンタルピーの差を取る。負の符号を一律に正にして足し合わせる値ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q004",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "鉛蓄電池の放電と硫酸濃度",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "鉛蓄電池は、希硫酸（電解液）に鉛の電極と酸化鉛（Ⅳ）の電極を浸した電池であり、放電時、負極ではPbがPbSO₄に、正極ではPbO₂がPbSO₄になる電極反応が起こる。ある鉛蓄電池において、放電前、電解液の液量及び硫酸の濃度がそれぞれ500 mL、4.50 mol・L⁻¹であった。この蓄電池から1.93 Aの電流を1.00×10⁴秒間取り出したとき、放電後の電解液の硫酸の濃度として最も妥当なのはどれか。ただし、放電の前後で電解液の体積変化は無視できるものとし、ファラデー定数を9.65×10⁴ C・mol⁻¹とする。",
    "choices": {
      "ア": "3.50 mol・L⁻¹",
      "イ": "3.70 mol・L⁻¹",
      "ウ": "3.90 mol・L⁻¹",
      "エ": "4.10 mol・L⁻¹",
      "オ": "4.30 mol・L⁻¹"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "流れた電子は1.93×10⁴÷(9.65×10⁴)＝0.200 molで、全反応で同量の硫酸を消費する。0.500 L当たりの濃度低下は0.400 mol・L⁻¹なので、放電後は4.10 mol・L⁻¹である。",
    "choiceExplanations": {
      "ア": "3.50 mol・L⁻¹とするには、0.500 L中で0.500 molの硫酸が減る必要がある。今回の電気量に対応する消費量は0.200 molである。",
      "イ": "濃度が0.80 mol・L⁻¹下がるとすると、硫酸の消費は0.400 molになる。両極を合わせた反応では電子2 molにつき硫酸2 molを消費するので0.200 molである。",
      "ウ": "3.90 mol・L⁻¹は硫酸を0.300 mol消費した場合に相当する。電流と時間から得る電気量は1.93×10⁴ Cで、移動した電子は0.200 molである。",
      "エ": "流れた電子は1.93×10⁴÷(9.65×10⁴)＝0.200 molで、全反応で同量の硫酸を消費する。0.500 L当たりの濃度低下は0.400 mol・L⁻¹なので、放電後は4.10 mol・L⁻¹である。",
      "オ": "4.30 mol・L⁻¹は硫酸の消費を0.100 molとした値である。両極で硫酸鉛が生じるため、全反応における硫酸の消費量は0.200 molになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q005",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "C₄H₁₀Oの構造異性体と鏡像異性",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "分子式がC₄H₁₀Oで表される、互いに異なる化合物A～Eがある。これらについて、次の㋐～㋓のことが分かっている。このとき、A～Eのうち鏡像異性体が存在するものとして妥当なもののみを全て挙げているのはどれか。\n\n㋐ ナトリウムを加えると、A～Dからは水素が発生した。\n㋑ A～Eに二クロム酸カリウムの硫酸酸性溶液を加えて穏やかに加熱したところ、C，Eは変化せず、A，B，Dは酸化物に変化した。このうち、B，Dの酸化物は銀鏡反応を呈した。\n㋒ Eはエタノールに濃硫酸を加え、130 ℃に保ったとき得られる化合物である。\n㋓ A～Dに濃硫酸を加え、170 ℃に加熱したところ、全てC₄H₈で表される化合物となった。この得られた化合物にそれぞれ水素付加を行ったところ、C，Dは最終的に同じ化合物に変化した。",
    "choices": {
      "ア": "A",
      "イ": "A，D",
      "ウ": "B，C",
      "エ": "D",
      "オ": "E"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Aは酸化でケトンを生じる第二級アルコールの2-ブタノールである。ヒドロキシ基の結合する炭素に4種類の置換基が結合するため、鏡像異性体がある。",
    "choiceExplanations": {
      "ア": "Aは酸化でケトンを生じる第二級アルコールの2-ブタノールである。ヒドロキシ基の結合する炭素に4種類の置換基が結合するため、鏡像異性体がある。",
      "イ": "Aは不斉炭素を持つ。Dの2-メチル-1-プロパノールの分岐炭素には同じメチル基が二つ結合している。",
      "ウ": "BとCは、それぞれ1-ブタノールと2-メチル-2-プロパノールである。いずれにも4種類の異なる置換基が結合した炭素がない。",
      "エ": "Dは第一級アルコールであり、脱水と水素付加を経てCと同じ2-メチルプロパンになる。Dの分岐炭素には同じメチル基が二つあるため、鏡像異性体はない。",
      "オ": "Eは二つのエチル基を持つジエチルエーテルである。酸素に結合する各炭素はCH₂で、立体中心を持たない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q006",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "ハロゲン単体とハロゲン化物",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ハロゲンの単体及び化合物に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 単体の沸点は、Cl₂ ＜ Br₂ ＜ I₂の順に高くなる。\n㋑ 単体の酸化力は、Cl₂ ＜ Br₂ ＜ I₂の順に強くなる。\n㋒ AgCl、AgBr、AgIは、いずれも水に溶けにくい。\n㋓ HCl、HBr、HIの水溶液の酸の強さは、HI ＜ HBr ＜ HClの順に強くなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "単体では分極率が大きくなるほど分散力が強まり、Cl₂、Br₂、I₂の順に沸点が上がる。AgCl、AgBr、AgIはいずれも難溶性の銀塩である。",
    "choiceExplanations": {
      "ア": "単体の沸点の順は㋐のとおりである。単体の酸化力はこの3種では塩素が最も強く、㋑の順は逆である。",
      "イ": "単体では分極率が大きくなるほど分散力が強まり、Cl₂、Br₂、I₂の順に沸点が上がる。AgCl、AgBr、AgIはいずれも難溶性の銀塩である。",
      "ウ": "単体の沸点の順は正しい。ハロゲン化水素の酸の強さの一般的な傾向は、結合が切れやすくなるHCl、HBr、HIの順に強い。",
      "エ": "㋑は塩素、臭素、ヨウ素の酸化力の強い順を逆にしている。㋓もハロゲン化水素の酸の強さの順が逆である。",
      "オ": "㋒は妥当である。㋓の3種は水中ではいずれも強酸で、固有の酸性度の傾向はHClよりHBr、さらにHIが強い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q007",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "植物の細胞壁・チラコイド・液胞",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "植物細胞に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．細胞壁は、細胞膜の内側に存在し、アクチンやペクチンを主な成分とする。\n㋑．低張液に入れると、多量の水が細胞内から細胞外に移動して膨圧が低下するため、原形質分離が起こる。\n㋒．葉緑体の中のチラコイドの膜は、クロロフィルなどの色素を含み、ここで光化学反応が起こる。\n㋓．液胞は、一重膜の細胞小器官で無機塩類などを含み、細胞が成長すると多くの体積を占めるようになる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "チラコイド膜には光化学反応を担う色素や光化学系がある。液胞は一重膜で囲まれ、植物細胞の成長に伴って大きな体積を占める。",
    "choiceExplanations": {
      "ア": "細胞壁は細胞膜の外側にあり、セルロースなどを含む。低張液では細胞に水が入り、膨圧は上がる。",
      "イ": "チラコイド膜に光合成の色素が存在するという㋒は正しい。㋐の細胞壁は細胞膜の外側にあり、アクチンを主成分とする構造ではない。",
      "ウ": "チラコイド膜では光化学反応が起こる。原形質分離は㋑の低張液ではなく、高張液で細胞から水が出たときに起こる。",
      "エ": "液胞の説明は正しい。低張液では水が細胞外へ出るという㋑の説明が逆である。",
      "オ": "チラコイド膜には光化学反応を担う色素や光化学系がある。液胞は一重膜で囲まれ、植物細胞の成長に伴って大きな体積を占める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q008",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "動物の卵割と卵黄の分布",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図は、二つの動物の受精卵の8細胞期を模式的に表したものである。この図及び動物の発生に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 発生初期に見られる細胞分裂を卵割といい、これによって生じた細胞を割球という。\n㋑ ショウジョウバエの卵は等黄卵に分類され、発生初期は細胞質分裂のみが進行する。\n㋒ Aは、ニワトリの胚であり、中心部に卵割腔が形成されている。\n㋓ Bは、卵黄が植物極側に多く含まれ、4細胞期の後に不等割が起こり生じる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "卵割によって生じる細胞を割球という。Bでは卵黄の多い植物極側の割球が大きく、卵割の結果として上下の割球の大きさが異なる。",
    "choiceExplanations": {
      "ア": "㋐の用語は妥当である。ショウジョウバエでは初期に核分裂が進んで多核の状態になり、後から細胞化が起こる。",
      "イ": "㋐は正しい。ニワトリは卵黄が多く、Aのように卵全体が分かれる全割ではなく、動物極側の胚盤で盤割する。",
      "ウ": "卵割によって生じる細胞を割球という。Bでは卵黄の多い植物極側の割球が大きく、卵割の結果として上下の割球の大きさが異なる。",
      "エ": "ショウジョウバエは卵黄が中心部に集まる中黄卵で、初期には核が分裂する。ニワトリで起こるのは胚盤に限られる盤割である。",
      "オ": "Bに関する㋓は妥当である。ショウジョウバエの卵を等黄卵とし、初期の分裂を細胞質分裂だけとする㋑は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q008.webp"
    ],
    "imageAltTexts": [
      "2種類の動物の胚AとBの8細胞期の模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q009",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "ホウレンソウの花芽形成と限界暗期",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "植物の花芽の形成に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「植物には、日長の変化に応答して花芽を形成するものがある。図は、植物の栽培における光の照射及び遮断の条件を模式的に表したものである。ホウレンソウは、図の条件［㋐］のときに花芽の形成が促進される植物であり、［㋑］植物と呼ばれる。なお、照射する光以外に光がない環境であり、光以外の条件及び照射する光の強さは花芽の形成に十分であるものとする。」",
    "choices": {
      "ア": "A、B ／ 長日",
      "イ": "A、D ／ 短日",
      "ウ": "A、D ／ 長日",
      "エ": "B、C ／ 短日",
      "オ": "B、C ／ 長日"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "長日植物のホウレンソウは、途切れずに続く暗期が限界暗期より短いと花芽形成が進む。Aは最初から暗期が短く、Dでは暗期の途中に光が入って長い暗期が二つに分かれる。",
    "choiceExplanations": {
      "ア": "ホウレンソウは長日植物で、Aの連続した暗期は限界暗期より短い。Bでは短時間の照射の後にも、限界暗期より長い暗期が残る。",
      "イ": "AとDはいずれも連続した暗期が限界暗期より短い。これは長日植物の花芽形成を促す条件である。",
      "ウ": "長日植物のホウレンソウは、途切れずに続く暗期が限界暗期より短いと花芽形成が進む。Aは最初から暗期が短く、Dでは暗期の途中に光が入って長い暗期が二つに分かれる。",
      "エ": "BとCには限界暗期を超える連続した暗期がある。ホウレンソウは短日植物ではなく、こうした条件では花芽形成が促進されない。",
      "オ": "長日植物という分類は合っているが、BとCの連続した暗期は限界暗期を超えている。暗期を短くできているのはAとDである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q009.webp"
    ],
    "imageAltTexts": [
      "条件A～Dの光照射と遮光の時間及びホウレンソウの限界暗期を示す図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q010",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "生産者から一次消費者へのエネルギー効率",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図は、ある生態系における生産者と一次消費者の有機物の収支を模式的に表したものである。この一次消費者のエネルギー効率〔％〕として最も妥当なのはどれか。",
    "choices": {
      "ア": "約10.9 ％",
      "イ": "約13.0 ％",
      "ウ": "約16.7 ％",
      "エ": "約23.3 ％",
      "オ": "約41.7 ％"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "一次消費者の同化量は成長量、被食量、死亡量、呼吸量を足した50.0で、摂食量は不消化排出量も足した60.0である。この設問の公式正答に対応する比は、一次消費者の同化量を生産者の総生産量290＋60＋10＋100＝460で割った50÷460×100≒10.9％である。",
    "choiceExplanations": {
      "ア": "一次消費者の同化量は成長量、被食量、死亡量、呼吸量を足した50.0で、摂食量は不消化排出量も足した60.0である。この設問の公式正答に対応する比は、一次消費者の同化量を生産者の総生産量290＋60＋10＋100＝460で割った50÷460×100≒10.9％である。",
      "イ": "13.0％は一次消費者の摂食量60.0を生産者の総生産量460で割った値である。今回の分子には不消化排出量を除いた同化量50.0を用いる。",
      "ウ": "16.7％は摂食量60.0を生産者の純生産量360で割った値である。公式正答の算出に用いるのは、一次消費者の同化量と生産者の総生産量の比である。",
      "エ": "23.3％は一次消費者の呼吸量14.0を摂食量60.0で割った値である。生産者から移ったエネルギーの効率を表す比ではない。",
      "オ": "41.7％は一次消費者の成長量25.0を摂食量60.0で割った値である。この問では一次消費者の同化量全体を生産者の総生産量と比較する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q010.webp"
    ],
    "imageAltTexts": [
      "生産者と一次消費者における有機物の収支を示す図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q017",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "基礎物理化学・基礎無機化学",
    "topicTags": [
      "理想気体の仕事・熱容量・定圧過程",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "理想気体の熱力学に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。ただし、気体定数を8.31 J・K⁻¹・mol⁻¹とする。\n\n㋐ 1 molの理想気体を熱膨張させたところ、気体の体積はΔV増加した。このとき、定圧過程と等温可逆過程では、気体のした仕事は等温可逆過程の方が大きい。\n㋑ アルゴンを理想気体と考えたとき、その1 molの定圧熱容量は室温で約21 J・K⁻¹・mol⁻¹である。\n㋒ 理想気体からなる系の定圧過程では、系に出入りする熱qが内部エネルギー変化ΔUに等しい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "アルゴンは単原子理想気体としてCₚ＝5R/2≒21 J・K⁻¹・mol⁻¹となる。㋐は等温可逆過程の終点の圧力を定圧過程の圧力とする比較で成り立ち、定圧過程の圧力の選び方で仕事の大小は変わる。",
    "choiceExplanations": {
      "ア": "アルゴンは単原子理想気体としてCₚ＝5R/2≒21 J・K⁻¹・mol⁻¹となる。㋐は等温可逆過程の終点の圧力を定圧過程の圧力とする比較で成り立ち、定圧過程の圧力の選び方で仕事の大小は変わる。",
      "イ": "㋐は定圧過程の圧力を等温可逆過程の終点の圧力とする場合に成り立つ。㋒の定圧での加熱量はエンタルピー変化に等しい。",
      "ウ": "単原子気体の定圧熱容量を述べた㋑は妥当である。公式正答では㋐も、一定の外圧を等温可逆過程の終点の圧力とする場合の比較として含まれる。",
      "エ": "アルゴンの定圧熱容量の値は正しい。膨張仕事を含む等圧過程での熱qₚはΔHに等しく、一般にΔUとは異なる。",
      "オ": "圧力と体積の仕事だけを考えると、理想気体の等圧過程ではqₚ＝ΔU＋pΔVである。㋒は膨張に使われるエネルギーを落としている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q021",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "化学ポテンシャル・活量・フガシティー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "化学ポテンシャルに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．束一的性質は、溶質の存在によって溶液の化学ポテンシャルが増大することから生じる性質である。\n㋑．活量とフガシティーはいずれも無次元の物理量である。\n㋒．化学ポテンシャルは部分モル量の一つである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "各成分の化学ポテンシャルは、温度、圧力及び他成分の物質量を固定したときのギブズエネルギーの物質量による偏微分である。このため部分モルギブズエネルギーに当たる。",
    "choiceExplanations": {
      "ア": "溶質を加えると、理想溶液の溶媒の活量が低下し、溶媒の化学ポテンシャルも低下する。増大すると述べる㋐は誤りである。",
      "イ": "㋐では溶媒の化学ポテンシャルの変化の向きが逆である。また、活量は無次元だがフガシティーは圧力と同じ次元を持つ。",
      "ウ": "化学ポテンシャルは部分モルギブズエネルギーなので㋒は正しい。束一的性質は溶媒の化学ポテンシャル低下と関係するので㋐は誤りである。",
      "エ": "㋒は妥当である。フガシティー自体は圧力の次元を持ち、フガシティーを基準値で割って得る活量が無次元である。",
      "オ": "各成分の化学ポテンシャルは、温度、圧力及び他成分の物質量を固定したときのギブズエネルギーの物質量による偏微分である。このため部分モルギブズエネルギーに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q022",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "アルカリ土類金属化合物の性質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "2族元素の化合物に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ バリウムの塩は一般的に毒性が高いが、炭酸バリウムBaCO₃は水に難溶で毒性も低いため、消化器のX線画像診断の造影剤として用いられる。\n㋑ にがりの主成分である塩化マグネシウムMgCl₂は、潮解性をもつ。\n㋒ 酸化マグネシウムMgOの結晶は、塩化ナトリウム構造をとる。\n㋓ 酸化カルシウムCaOは消石灰とも呼ばれ、吸湿性が高いことから乾燥剤として用いられる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑、㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "塩化マグネシウムは空気中の水分を取り込んで溶液になる潮解性を示す。酸化マグネシウムの結晶は、各イオンが異種イオン6個に囲まれる塩化ナトリウム型である。",
    "choiceExplanations": {
      "ア": "消化器のX線画像診断の造影剤には硫酸バリウムが用いられる。炭酸バリウムは酸性条件で溶けるため、造影剤としての説明は誤りである。",
      "イ": "塩化マグネシウムの潮解性を述べた㋑は妥当である。㋐の造影剤は炭酸バリウムではなく硫酸バリウムである。",
      "ウ": "塩化マグネシウムは空気中の水分を取り込んで溶液になる潮解性を示す。酸化マグネシウムの結晶は、各イオンが異種イオン6個に囲まれる塩化ナトリウム型である。",
      "エ": "酸化マグネシウムの結晶構造は正しい。㋓の酸化カルシウムは生石灰であり、水と反応して消石灰である水酸化カルシウムになる。",
      "オ": "酸化カルシウムは乾燥剤に使われるが、名称は生石灰である。消石灰はCa(OH)₂を指す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q023",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "実在気体の圧縮因子",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "圧力p、モル体積Vₘ、温度Tにおける気体分子の圧縮因子（圧縮率因子）Zは以下のように表される。\n\nZ＝pVₘ/(RT)\n\nここで、Rは気体定数である。273.15 Kにおける各気体分子（H₂、CH₄、C₂H₄、NH₃）のZとpの関係を示す以下の図において、①～④に当てはまる気体分子の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "CH₄ ／ C₂H₄ ／ H₂ ／ NH₃",
      "イ": "CH₄ ／ C₂H₄ ／ NH₃ ／ H₂",
      "ウ": "CH₄ ／ NH₃ ／ H₂ ／ C₂H₄",
      "エ": "C₂H₄ ／ CH₄ ／ H₂ ／ NH₃",
      "オ": "NH₃ ／ H₂ ／ C₂H₄ ／ CH₄"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "③のH₂は分子間引力の影響が小さく、④のNH₃は低圧側でZが急減する。CH₄より引力の影響が大きいC₂H₄が①、CH₄が②となる。",
    "choiceExplanations": {
      "ア": "③と④の対応は合っている。CH₄とC₂H₄では分子間の引力による下振れがC₂H₄の方で大きく、低圧側の谷が深い①に当たる。",
      "イ": "NH₃は分子間引力が強く、低圧側でZが急に下がる④に当たる。理想気体からの負のずれが小さいH₂は③に当たる。",
      "ウ": "③はH₂である。NH₃は強い分子間引力をもつ④であり、C₂H₄にはCH₄より深い谷がある①が対応する。",
      "エ": "③のH₂は分子間引力の影響が小さく、④のNH₃は低圧側でZが急減する。CH₄より引力の影響が大きいC₂H₄が①、CH₄が②となる。",
      "オ": "H₂はこの温度で低圧からZが1より大きい③に対応する。NH₃の強い引力は、低圧側の急な下落を示す④に対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q023.webp"
    ],
    "imageAltTexts": [
      "273.15 Kでの4種類の気体について、圧力と圧縮因子の関係を①～④で表したグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q024",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "分子軌道と常磁性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "等核二原子分子B₂、C₂、O₂のうち、常磁性である分子のみを全て挙げているのはどれか。",
    "choices": {
      "ア": "B₂",
      "イ": "B₂、C₂、O₂",
      "ウ": "B₂、O₂",
      "エ": "C₂",
      "オ": "O₂"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "B₂の二つのπ結合性軌道と、O₂の二つのπ反結合性軌道には、それぞれ不対電子が入る。C₂の価電子は対になっているため、常磁性を示すのはB₂とO₂である。",
    "choiceExplanations": {
      "ア": "B₂には不対電子があるため常磁性を示す。O₂も二つのπ反結合性軌道に不対電子を一つずつ持つ。",
      "イ": "B₂とO₂には不対電子がある。C₂では標準的な分子軌道の電子配置で価電子が対を作っており、反磁性を示す。",
      "ウ": "B₂の二つのπ結合性軌道と、O₂の二つのπ反結合性軌道には、それぞれ不対電子が入る。C₂の価電子は対になっているため、常磁性を示すのはB₂とO₂である。",
      "エ": "C₂のπ結合性軌道は電子で満たされ、他の占有軌道も電子対を持つ。常磁性の原因になる不対電子がない。",
      "オ": "O₂が常磁性を示すという判断は妥当である。B₂にも二つのπ結合性軌道に不対電子が一つずつある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q025",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "COの回転スペクトルと回転定数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "CO分子の回転遷移に伴うマイクロ波吸収スペクトルを7 cm⁻¹から16 cm⁻¹の範囲で測定したところ、7.69 cm⁻¹、11.53 cm⁻¹、15.37 cm⁻¹に吸収線が観測された。回転量子数J＝0，1，2，…におけるCO分子の回転エネルギーEⱼは、回転定数Bを用いてEⱼ＝BJ(J＋1)によって与えられる。このとき、回転定数Bの値として最も妥当なのはどれか。",
    "choices": {
      "ア": "1.92 cm⁻¹",
      "イ": "3.84 cm⁻¹",
      "ウ": "7.69 cm⁻¹",
      "エ": "11.53 cm⁻¹",
      "オ": "15.37 cm⁻¹"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "吸収でJからJ＋1に移るときの波数は2B(J＋1)であり、連続する吸収線の間隔は2Bになる。観測された間隔は3.84 cm⁻¹なので、B＝1.92 cm⁻¹である。",
    "choiceExplanations": {
      "ア": "吸収でJからJ＋1に移るときの波数は2B(J＋1)であり、連続する吸収線の間隔は2Bになる。観測された間隔は3.84 cm⁻¹なので、B＝1.92 cm⁻¹である。",
      "イ": "3.84 cm⁻¹は連続する吸収線の間隔である。間隔は回転定数Bの2倍なので、Bはその半分になる。",
      "ウ": "7.69 cm⁻¹は測定範囲にある一本の吸収線の波数である。回転定数は各線の波数そのものからではなく、線間隔の半分から求められる。",
      "エ": "11.53 cm⁻¹は測定範囲の中央の吸収線であり、回転定数ではない。両隣との間隔が各3.84 cm⁻¹なので、その半分を取る。",
      "オ": "15.37 cm⁻¹は測定範囲で観測した最大の波数である。回転定数Bは吸収線を二つ取って波数差を求め、その半分として得られる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q027",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "Wilhelmy法の表面張力測定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "液体の表面張力測定に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「液体の表面張力測定法としてよく用いられるWilhelmy法は、固体プレートの一端を被測定液面に接触させたときに、プレートが液面から受ける力から、表面張力を測定する方法である。Wilhelmy法による液体の表面張力測定の原理を図に示す。液体の表面張力をγ、重力加速度の大きさをg、液体に接しているプレートの長さをl、厚さをd、質量をm、プレートと液体のなす接触角をθとする。プレートにかかる浮力を無視すると、重力方向における力のつり合いより、プレートにかかる力fは以下のように表される。\n\nf＝mg＋［㋐］\n\nプレートが液体によくぬれて一様にθ＝［㋑］であるときのfを測定することで、γを求めることができる。」",
    "choices": {
      "ア": "(l＋d)γ sin θ ／ π/2",
      "イ": "2(l＋d)γ sin θ ／ π/2",
      "ウ": "(l＋d)γ cos θ ／ 0",
      "エ": "2(l＋d)γ cos θ ／ 0",
      "オ": "(l＋d)γ tan θ ／ π/4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "表面張力の鉛直成分は、単位長さ当たりγ cos θで、接触線全体では2(l＋d)γ cos θとなる。プレートが完全にぬれると接触角は0になる。",
    "choiceExplanations": {
      "ア": "接触線の長さはプレートの長方形断面の全周2(l＋d)である。図のθは鉛直方向と表面張力の向きの角度なので、鉛直成分にはcos θを用いる。",
      "イ": "接触線の周長は合っている。完全にぬれる場合の接触角は0で、表面張力の鉛直成分はγ cos θとなる。",
      "ウ": "鉛直成分にcos θを用いる点と、完全にぬれるときの角度0は合っている。断面の接触線は長辺と短辺が二つずつあるため、周長に2を掛ける必要がある。",
      "エ": "表面張力の鉛直成分は、単位長さ当たりγ cos θで、接触線全体では2(l＋d)γ cos θとなる。プレートが完全にぬれると接触角は0になる。",
      "オ": "表面張力の鉛直成分は投影を取って求めるので、tan θでは表せない。完全にぬれるプレートに対応する角度もπ/4ではなく0である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q027.webp"
    ],
    "imageAltTexts": [
      "Wilhelmy法で用いる固体プレートと液面の接触角、力の向き、プレートの寸法を示す模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q029",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "プロトンNMR・炭素NMR・IRによる構造決定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "分子式C₈H₈O₂で示される化合物の¹H NMR、¹³C NMR及びIRスペクトルのデータを以下に示す。この化合物の構造式として最も妥当なのはどれか。\n\n¹H NMR（CDCl₃）：\nδ 2.61（3H，一重線），6.89（1H，三重線，J＝8.0 Hz），6.96（1H，二重線，J＝8.0 Hz），7.44（1H，三重線，J＝8.0 Hz），7.71（1H，二重線，J＝8.0 Hz），12.25（1H，一重線）\n\n¹³C NMR（CDCl₃）：\nδ 26.5，118.3，118.9，119.7，130.8，136.4，162.4，204.6\n\nIR（液膜）：\n3500–2500（幅広い），1643，1488，1448，1368，1323 cm⁻¹（特徴的な吸収のみ）",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "δ 204.6はアセチル基のカルボニル炭素、δ 2.61の3Hはそのメチル基に対応する。オルト位のフェノール性OHはカルボニル酸素と分子内水素結合を作るため、そのプロトンはδ 12.25に現れる。",
    "choiceExplanations": {
      "ア": "メチル安息香酸ではカルボキシ基の炭素がケトンのカルボニル炭素の領域δ 204.6に現れにくい。メタ置換では隣接する芳香族プロトンがない位置もあり、図のカップリングとも合いにくい。",
      "イ": "メトキシ基のメチル炭素は酸素に直接結合するため、δ 26.5より低磁場側に現れる。δ 2.61の3Hも、メトキシ基よりアセチル基に適合する。",
      "ウ": "オルト置換は芳香環上のシグナルの並びに合う。メトキシ基の3Hとアルデヒド基の1Hでは、δ 2.61と12.25の組合せを説明できない。",
      "エ": "オルト置換の芳香環と酸性のOHは、データの一部を説明できる。ただしδ 204.6の炭素はカルボン酸より芳香族ケトンに対応する。",
      "オ": "δ 204.6はアセチル基のカルボニル炭素、δ 2.61の3Hはそのメチル基に対応する。オルト位のフェノール性OHはカルボニル酸素と分子内水素結合を作るため、そのプロトンはδ 12.25に現れる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "choiceImageUrls": {
      "ア": "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q029-1.webp",
      "イ": "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q029-2.webp",
      "ウ": "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q029-3.webp",
      "エ": "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q029-4.webp",
      "オ": "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q029-5.webp"
    },
    "choiceImageAltTexts": {
      "ア": "メタ位にメチル基とカルボキシ基を持つベンゼン環の構造式",
      "イ": "メタ位にメトキシ基とホルミル基を持つベンゼン環の構造式",
      "ウ": "オルト位にメトキシ基とホルミル基を持つベンゼン環の構造式",
      "エ": "オルト位にメチル基とカルボキシ基を持つベンゼン環の構造式",
      "オ": "オルト位にアセチル基とヒドロキシ基を持つベンゼン環の構造式"
    }
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q030",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "絶対配置・配座のキラリティー・メソ体",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "有機化合物の立体化学に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 次の化合物の立体配置はSである。\n㋑ Newman投影図で示す次のブタンのゴーシュ配座はキラルである。\n㋒ 2,3,4-トリクロロペンタンには3種類のメソ体がある。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋐の不斉炭素では窒素、カルボニル炭素、フェニル基、エチル基の順に置換基の優先順位が高く、最下位を奥にして読むとSになる。ブタンの二つのゴーシュ配座は互いに鏡像関係にある。",
    "choiceExplanations": {
      "ア": "㋐の絶対配置はSである。㋑のゴーシュ配座にも鏡像と重ならない二つの形があるので、㋐だけでは不足する。",
      "イ": "㋐の不斉炭素では窒素、カルボニル炭素、フェニル基、エチル基の順に置換基の優先順位が高く、最下位を奥にして読むとSになる。ブタンの二つのゴーシュ配座は互いに鏡像関係にある。",
      "ウ": "㋐は妥当である。2,3,4-トリクロロペンタンのメソ体は、両端の不斉中心が逆の配置で中央の配置が異なる2種類である。",
      "エ": "メチル基の二面角が約60°と約−60°のゴーシュ配座は鏡像関係にあり、㋑は妥当である。図㋐のS配置も妥当である。",
      "オ": "㋑は正しいが、㋒のメソ体を3種類とする説明が誤っている。両端の配置が互いに逆であるときに、中央で異なる2種類がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q030-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q030-2.webp"
    ],
    "imageAltTexts": [
      "㋐の不斉中心の周囲をくさび線と破線で示す構造式",
      "㋑のブタンのゴーシュ配座を示すNewman投影図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q031",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "第一級アリルアルコールの酸化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "アリルアルコールを酸化させてアクロレインを主成分として得たい。このとき、次の ㋐～㋓のうち、使用できる反応剤として妥当なもののみを挙げているのはどれか。\n\n㋐．酸化クロム（Ⅵ）、硫酸及び水\n㋑．クロロクロム酸ピリジニウム\n㋒．二酸化マンガン\n㋓．トリクロロエタナール及びアルミナ",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "㋑のクロロクロム酸ピリジニウムは第一級アルコールをアルデヒドに酸化できる。㋒の二酸化マンガンはアリル位のアルコールを酸化できるので、両方を選ぶ。",
    "choiceExplanations": {
      "ア": "㋑はアルコールをアルデヒドの段階まで酸化する試薬である。㋐のような水を含む強い酸化条件では、アルデヒドがさらに酸化され得る。",
      "イ": "㋒はアリル位のアルコールを酸化するのに適している。㋐は第一級アルコールをカルボン酸まで酸化し得る条件である。",
      "ウ": "㋐では過剰酸化を避けにくい。公式正答では、第一級アリルアルコールをアルデヒドに酸化できる㋑と㋒が該当する。",
      "エ": "㋑のクロロクロム酸ピリジニウムは第一級アルコールをアルデヒドに酸化できる。㋒の二酸化マンガンはアリル位のアルコールを酸化できるので、両方を選ぶ。",
      "オ": "㋑は妥当である。公式正答では、アリル位のアルコールの選択的酸化に用いられる㋒の二酸化マンガンも該当する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q032",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "芳香族求電子置換の反応分類",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の㋐～㋓の反応のうち、芳香族求電子置換反応として妥当なもののみを挙げているのはどれか。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐と㋑では求電子種が芳香環の水素の位置に入り、芳香族性が回復する。㋐は芳香環のアルキル化、㋑は芳香環の臭素化である。",
    "choiceExplanations": {
      "ア": "㋐と㋑では求電子種が芳香環の水素の位置に入り、芳香族性が回復する。㋐は芳香環のアルキル化、㋑は芳香環の臭素化である。",
      "イ": "㋐のアルキル化は芳香族求電子置換反応である。㋒は光で誘起されるフリース転位で、ラジカル機構で進行する。",
      "ウ": "㋑の臭素化は芳香族求電子置換反応に当たる。㋒は光による転位であり、同じ機構には分類されない。",
      "エ": "㋑は芳香環上の水素を臭素に置き換える求電子置換である。㋓はアミノ基をジアゾ化した後にヒドロキシ基に置き換える反応である。",
      "オ": "㋒は光によるフリース転位、㋓はジアゾ化を経た置換である。芳香環の水素に対する求電子置換は㋐と㋑である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q032.webp"
    ],
    "imageAltTexts": [
      "㋐～㋓の出発物質、試薬及び生成物の構造式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q033",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "有機反応の立体選択性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の反応㋐、㋑、㋒のうち、主生成物が妥当なもののみを全て挙げているのはどれか。ただし、生成物に鏡像異性体が存在する場合は、生成物はラセミ体であるものとする。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋒は6π電子系の熱による逆回転の電子環状反応であり、図の二つのメチル基が同じ側に向く。㋐と㋑の図は、それぞれアンチ付加とシン付加で得られる立体配置と異なる。",
    "choiceExplanations": {
      "ア": "㋐ではtrans-2-ブテンへの臭素のアンチ付加でメソ体が生じる。㋑では二つのOHが同じ側に付くため、図のtrans体とは異なる。",
      "イ": "㋒の熱環化は図の立体配置を与える。㋐のtrans-2-ブテンへの臭素のアンチ付加で生じるのは、図の立体配置と異なるメソ体である。",
      "ウ": "㋑ではアルケンの同じ面に二つのOHが付加する。図ではそれらのOHが環の反対側を向いている。",
      "エ": "㋒の環化は妥当である。㋑の反応はシン付加で進むため、図に示すtrans-1,2-ジオールは主生成物にならない。",
      "オ": "㋒は6π電子系の熱による逆回転の電子環状反応であり、図の二つのメチル基が同じ側に向く。㋐と㋑の図は、それぞれアンチ付加とシン付加で得られる立体配置と異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q033.webp"
    ],
    "imageAltTexts": [
      "㋐～㋒の出発物質、反応条件及び主生成物の構造式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q034",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "カルボニル化合物の炭素骨格と置換位置",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の㋐、㋑、㋒のうち、化合物AからBを選択的に合成する方法として妥当なもののみを全て挙げているのはどれか。ただし、各反応では、適切な後処理が行われたものとする。\n\n（ただし、LDAはリチウムジイソプロピルアミドを表す。）",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋐はジチオアセタールでカルボニル炭素の極性を転換し、メチル基を導入してケトンを得る。㋒はメチル基の反対側のα位が塩素化される場合に図Bへ進むが、直接塩素化では両α位の生成物が生じ得る。",
    "choiceExplanations": {
      "ア": "㋐はアルデヒドのカルボニル炭素に相当する位置へメチル基を導入し、カルボニル基を復元する経路である。公式正答では㋒も、図Bの位置に塩素が入る経路として含める。",
      "イ": "㋐はジチオアセタールでカルボニル炭素の極性を転換し、メチル基を導入してケトンを得る。㋒はメチル基の反対側のα位が塩素化される場合に図Bへ進むが、直接塩素化では両α位の生成物が生じ得る。",
      "ウ": "㋑ではクライゼン縮合が進んだとしても、生成したβ-ケトエステルの二つのカルボニル基の間に水素が残らない。通常のクライゼン縮合を進める、生成物の脱プロトン化による駆動力が得られない。",
      "エ": "㋒は、図Bに対応する位置で塩素化が起きるとして公式正答に含まれる。㋑は縮合生成物の中央炭素に水素がなく、通常のクライゼン縮合の条件では平衡を大きく生成物側へ移しにくい。",
      "オ": "㋒は公式正答に含まれる。㋐も、アルデヒドのカルボニル炭素を一時的に求核的にしてメチル基を付けることで、図Bのケトンを得られる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q034.webp"
    ],
    "imageAltTexts": [
      "㋐～㋒の化合物A、反応条件及び化合物Bの構造式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q035",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "プラスチックの熱可塑性と立体規則性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "プラスチックに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 熱を加えると軟らかくなり冷やすと硬くなるが、再び加熱すれば軟らかくなる性質を熱可塑性という。熱可塑性樹脂の例として、ポリエチレンやポリ塩化ビニルが挙げられる。\n㋑ トリエチルアルミニウムと四塩化チタンを組み合わせた触媒（チーグラー触媒）を用いることにより、枝分かれの少ないポリエチレンを従来の製造法より低圧で製造できるようになった。\n㋒ エチレン以外のビニル単量体CH₂＝CHXを重合した際、置換基Xが炭素鎖に対して全て同じ側で規則正しく結合している構造をアタクチック構造という。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ポリエチレンやポリ塩化ビニルは加熱によって再び軟らかくなる熱可塑性樹脂である。チーグラー触媒は、枝分かれの少ないポリエチレンを比較的低い圧力で製造するのに役立つ。",
    "choiceExplanations": {
      "ア": "㋐の熱可塑性の説明は正しい。チーグラー触媒による比較的低圧の重合を述べた㋑も正しい。",
      "イ": "ポリエチレンやポリ塩化ビニルは加熱によって再び軟らかくなる熱可塑性樹脂である。チーグラー触媒は、枝分かれの少ないポリエチレンを比較的低い圧力で製造するのに役立つ。",
      "ウ": "㋐と㋑は正しい。㋒の置換基が全て同じ向きに並ぶ配置は、イソタクチックと呼ばれる。",
      "エ": "㋑の重合に関する説明は正しい。㋒はイソタクチックとアタクチックを取り違えている。",
      "オ": "アタクチックは置換基の立体配置に規則性がない構造を指す。各置換基が規則的に同じ向きに並ぶ場合はイソタクチックである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q036",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "半導体の温度特性とpn接合",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "半導体に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．p 型とn 型の半導体を接合し、その両端に電極をつけたものをpn 接合ダイオードという。 pn 接合ダイオードのp 型側に負、n 型側に正の電圧を加えると、p 型側の電子はn 型側に移動し電流が流れ続ける。\n㋑．一般に、金属では温度が上昇すると電気伝導率が減少するが、半導体では温度が上昇すると電気伝導率が増加する。\n㋒．太陽電池に用いられる材料の例として、アモルファスシリコンが挙げられる。p 型及びn 型アモルファスシリコン薄膜がpn 接合を形成していると、光照射により電流を取り出すことができる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "金属では温度上昇で散乱が増え、半導体では一般に電荷を運ぶキャリアが増える。アモルファスシリコンの光起電力を利用する太陽電池もある。",
    "choiceExplanations": {
      "ア": "p型側を負、n型側を正とするのは逆バイアスである。空乏層が広がり、通常の順方向のような大きな電流は流れない。",
      "イ": "半導体の電気伝導率の温度依存性を述べた㋑は妥当である。㋐の接続は逆バイアスなので、大きな順方向電流は流れない。",
      "ウ": "㋑と㋒は妥当である。㋐では正負の接続が順方向の場合と逆である。",
      "エ": "金属では温度上昇で散乱が増え、半導体では一般に電荷を運ぶキャリアが増える。アモルファスシリコンの光起電力を利用する太陽電池もある。",
      "オ": "光で生じた電子と正孔は接合部の電場で分離されるため、㋒は妥当である。㋑の金属と半導体の一般的な温度特性も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q037",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "エチレン循環プロセスの物質収支",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「エチレンを水和してエタノールを製造するプロセスを考える。\n\nC₂H₄＋H₂O → C₂H₅OH\n\nこの反応は触媒反応器を1回通過するだけでは完結せず、水及び生成したエタノールを凝縮分離した後、未反応エチレンのみを循環させている。反応器入口のエチレンに対する水の物質量比は0.60に保たれており、エチレンの単通転化率は10％である。このとき、エチレンの循環比は［㋐］、エチレンの総括転化率は［㋑］％となる。ただし、エチレンの循環比は、（循環原料中のエチレンの物質量）/（補給原料中のエチレンの物質量）で表される。」",
    "choices": {
      "ア": "6.0 ／ 10",
      "イ": "6.0 ／ 100",
      "ウ": "9.0 ／ 10",
      "エ": "9.0 ／ 100",
      "オ": "10 ／ 100"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "反応器入口のエチレンを1 molとすると0.10 molが反応し、0.90 molが再び入口に戻る。定常時の補給は反応量0.10 molに等しく、循環比は9.0、総括転化率は100％である。",
    "choiceExplanations": {
      "ア": "10％は反応器を1回通るときの転化率であり、全工程では未反応エチレンを全量循環する。循環比には水の比0.60でなく、循環エチレンと補給エチレンの比を用いる。",
      "イ": "未反応のエチレンを全量循環するので、総括転化率は100％である。反応器入口を1とすると循環量0.90、補給量0.10なので、循環比は9.0となる。",
      "ウ": "循環比9.0は合っている。総括転化率には循環後の反応も含めるため、単通転化率10％ではなく100％である。",
      "エ": "反応器入口のエチレンを1 molとすると0.10 molが反応し、0.90 molが再び入口に戻る。定常時の補給は反応量0.10 molに等しく、循環比は9.0、総括転化率は100％である。",
      "オ": "10は反応器入口の全エチレン量を補給量で割った比である。循環比では入口量から補給分を除いて割るので9.0である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q038",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "液液抽出のタイラインとてこの法則",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "酢酸－水－シクロヘキサノール系は、300 Kで、ある濃度領域において図のような2相系をつくる。この図で縦軸は酢酸の、横軸はシクロヘキサノールのwt％をそれぞれ示す。同じ図には、この温度における液－液平衡データ（酢酸濃度〔wt％〕）とタイラインも示す。\n\n25.0 wt％の酢酸水溶液100 kgを、シクロヘキサノール150 kgを用いて300 Kで抽出した。この操作後の水相の重量として最も妥当なのはどれか。",
    "choices": {
      "ア": "39.5 kg",
      "イ": "50.0 kg",
      "ウ": "62.5 kg",
      "エ": "200 kg",
      "オ": "210 kg"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "混合物250 kgに酢酸25 kgが含まれるので、全体濃度は10.00 wt％である。対応するタイラインの両端は有機相10.40、水相8.40 wt％で、水相の重量は250×(10.40−10.00)/(10.40−8.40)＝50.0 kgである。",
    "choiceExplanations": {
      "ア": "混合物全体の酢酸濃度10.00 wt％を、対応するタイライン上の両相の濃度と比較する。水相の質量分率は0.20であり、39.5 kgにはならない。",
      "イ": "混合物250 kgに酢酸25 kgが含まれるので、全体濃度は10.00 wt％である。対応するタイラインの両端は有機相10.40、水相8.40 wt％で、水相の重量は250×(10.40−10.00)/(10.40−8.40)＝50.0 kgである。",
      "ウ": "水相の重量は全体の250 kgに、水相側の質量分率0.20を掛けて求める。62.5 kgは水相を全体の4分の1とした値である。",
      "エ": "200 kgは平衡時のシクロヘキサノール相の重量である。問われている水相は全体の250 kgからこれを引いた50 kgである。",
      "オ": "有機相の重量は、てこの法則で約200 kgになる。水相の重量を求めるには、全体組成と水相の組成でなく、有機相の組成との差を分子に用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q038.webp"
    ],
    "imageAltTexts": [
      "300 Kにおける酢酸・水・シクロヘキサノール系の液液平衡線とタイライン、両相の酢酸濃度の表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q039",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "向流式と並流式の熱交換器",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「二重管式熱交換器の設計を考える。高温流体は内管側を流れ、入口温度Tₕ₁〔K〕から出口温度Tₕ₂〔K〕まで冷却される。低温流体は円環部を流れ、入口温度T꜀₁〔K〕から出口温度T꜀₂〔K〕まで加熱される。向流式の熱交換器では、対数平均温度差は［㋐］のように表される。また、同じ性能の熱交換器を並流式で設計したとき、必要な伝熱面積は向流式［㋑］。」",
    "choices": {
      "ア": "[(Tₕ₁−T꜀₁)−(Tₕ₂−T꜀₂)]/ln[(Tₕ₁−T꜀₁)/(Tₕ₂−T꜀₂)] ／ より小さい",
      "イ": "[(Tₕ₁−T꜀₁)−(Tₕ₂−T꜀₂)]/ln[(Tₕ₁−T꜀₁)/(Tₕ₂−T꜀₂)] ／ と等しい",
      "ウ": "[(Tₕ₁−T꜀₁)−(Tₕ₂−T꜀₂)]/ln[(Tₕ₁−T꜀₁)/(Tₕ₂−T꜀₂)] ／ より大きい",
      "エ": "[(Tₕ₁−T꜀₂)−(Tₕ₂−T꜀₁)]/ln[(Tₕ₁−T꜀₂)/(Tₕ₂−T꜀₁)] ／ より小さい",
      "オ": "[(Tₕ₁−T꜀₂)−(Tₕ₂−T꜀₁)]/ln[(Tₕ₁−T꜀₂)/(Tₕ₂−T꜀₁)] ／ より大きい"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "向流では高温流体入口が低温流体出口と、高温流体出口が低温流体入口と同じ端にある。同じ熱交換量と伝熱係数で比べると、対数平均温度差の小さい並流式ほど必要な伝熱面積が大きくなる。",
    "choiceExplanations": {
      "ア": "入口同士と出口同士の温度差を取る式は並流式に対応する。対数平均温度差は一般に向流式で大きく、必要面積は並流式で大きくなる。",
      "イ": "この式は両流体が同じ端から入る並流式の温度差を用いている。並流式は有効な温度差が小さいため、同じ熱交換量にはより大きな面積が要る。",
      "ウ": "必要面積が並流式で大きいという判断は妥当である。㋐は向流式なので、各端で一方の入口と他方の出口の温度差を取る。",
      "エ": "向流での両端の温度差は合っている。同じ伝熱係数と熱交換量であれば、対数平均温度差が小さい並流式の方が大きな伝熱面積を要する。",
      "オ": "向流では高温流体入口が低温流体出口と、高温流体出口が低温流体入口と同じ端にある。同じ熱交換量と伝熱係数で比べると、対数平均温度差の小さい並流式ほど必要な伝熱面積が大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q040",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "連続槽型反応器の転化率と流量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "AとBからCが生成する反応は、次の反応で表される液相二次反応である。\n\nA＋2B → C　　−r_A＝kC_AC_B\n\nここで、r_AはAの反応速度、kは反応速度定数、C_A及びC_BはそれぞれA及びBの濃度を表す。この反応を連続槽型反応器で行う。原料を体積流量v₀、AとBの物質量比を1：3で供給したとき、反応物の反応率（転化率）は50％であった。同じ原料を同じ物質量比で同じ反応器に供給し、反応率を75％にするための原料の体積流量として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.17 v₀",
      "イ": "0.25 v₀",
      "ウ": "0.53 v₀",
      "エ": "1.9 v₀",
      "オ": "4.0 v₀"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "入口のA濃度をC₀、転化率をXとすると、槽内濃度はAがC₀(1−X)、BがC₀(3−2X)である。定常収支より流量は(1−X)(3−2X)/Xに比例するので、流量比は[(0.25×1.5)/0.75]/[(0.50×2)/0.50]＝0.25である。",
    "choiceExplanations": {
      "ア": "流量は反応速度を転化率で割った値に比例する。転化率を50％から75％にすると、速度比0.375に転化率の逆比0.50/0.75を掛けるので、流量比は0.25である。",
      "イ": "入口のA濃度をC₀、転化率をXとすると、槽内濃度はAがC₀(1−X)、BがC₀(3−2X)である。定常収支より流量は(1−X)(3−2X)/Xに比例するので、流量比は[(0.25×1.5)/0.75]/[(0.50×2)/0.50]＝0.25である。",
      "ウ": "濃度の積は50％から75％に上げると0.375倍になる。流量比にはさらに、転化率の比0.50/0.75を掛ける必要がある。",
      "エ": "流量を増やすと、同じ大きさの槽での滞留時間が短くなる。今回は転化率を上げるので、流量はv₀より小さくする。",
      "オ": "4.0は求めた新旧の流量比を逆にした値である。槽内濃度と転化率を定常収支に入れると、新しい流量はv₀の4分の1になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q041",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "弱酸性薬物の液液分配係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "フェニトインは、弱酸性化合物（pKₐ値8.3）であり、イオン形であるフェニトインナトリウムとして溶解して注射剤等として用いられる。10 mmol/L フェニトインナトリウム水溶液100 mLを分液ロートに入れ、希塩酸を加えてpHを4.0にした後、クロロホルム50 mLを加えて振とうした結果、下層中のフェニトイン量は800 μmolであった。このとき、フェニトインの分配係数K_dの値として最も妥当なのはどれか。ただし、フェニトインナトリウムはクロロホルム相に移行しないものとし、加える希塩酸の体積は無視するものとする。また、K_dは水相中の薬物濃度に対する有機溶媒相中の濃度の比を表す。",
    "choices": {
      "ア": "0.13",
      "イ": "0.25",
      "ウ": "4.0",
      "エ": "8.0",
      "オ": "10"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全量は10 mmol/L×0.100 L＝1.00 mmolで、有機相に0.800 mmol、水相に0.200 mmolがある。有機相は16.0 mmol/L、水相は2.00 mmol/Lなので、分配係数は8.0である。",
    "choiceExplanations": {
      "ア": "0.13は水相の濃度2 mmol/Lを有機相の濃度16 mmol/Lで割った値を丸めたものである。定義の分子は有機相の濃度である。",
      "イ": "0.25は水相に残る200 μmolを有機相の800 μmolで割った比である。両相の体積は異なるため、係数はそれぞれの濃度から求める。",
      "ウ": "4.0は有機相と水相の物質量比である。有機相の体積は水相の半分なので、濃度比はさらに2倍となる。",
      "エ": "全量は10 mmol/L×0.100 L＝1.00 mmolで、有機相に0.800 mmol、水相に0.200 mmolがある。有機相は16.0 mmol/L、水相は2.00 mmol/Lなので、分配係数は8.0である。",
      "オ": "分配後の水相には0.200 mmol、有機相には0.800 mmolがある。それぞれを0.100 Lと0.050 Lで割って濃度比を取ると、10ではなく8.0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q042",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "比吸光度とモル吸光係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "カルバマゼピン（C₁₅H₁₂N₂O：分子量236）50.0 mgをエタノールに溶かし、正確に250 mLとした。この液5 mLを正確に量り、エタノールを加えて正確に100 mLにした。この溶液の測定波長285 nmにおける吸光度は、0.490であった。\n\nこのとき、カルバマゼピンの比吸光度（E¹ᶜᵐ₁％）とモル吸光係数（ε）の組合せとして最も妥当なのはどれか。ただし、層長は1 cmとし、濃度1 w/v％溶液の吸光度を層長1 cmのセルで測定したときの吸光度を比吸光度とする。",
    "choices": {
      "ア": "24.0 ／ 7.20×10²",
      "イ": "240 ／ 7.20×10³",
      "ウ": "240 ／ 7.20×10⁴",
      "エ": "490 ／ 1.16×10⁴",
      "オ": "490 ／ 1.16×10⁵"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "測定液は0.00100 w/v％なので比吸光度は0.490/0.00100＝490である。質量濃度0.0100 g/Lを236で割ったモル濃度と層長1 cmで吸光度を割ると、εは約1.16×10⁴ L・mol⁻¹・cm⁻¹となる。",
    "choiceExplanations": {
      "ア": "比吸光度は、0.490を測定液の濃度0.001 w/v％で割って求める。希釈後の濃度は0.020 w/v％の原液の20分の1である。",
      "イ": "希釈液100 mLにカルバマゼピンは1.00 mgあり、比吸光度は490になる。モル吸光係数には、濃度を分子量236で割ってモル濃度にした値を用いる。",
      "ウ": "比吸光度は240でなく490である。測定液のモル濃度は約4.24×10⁻⁵ mol/Lなので、モル吸光係数は約1.16×10⁴ L・mol⁻¹・cm⁻¹になる。",
      "エ": "測定液は0.00100 w/v％なので比吸光度は0.490/0.00100＝490である。質量濃度0.0100 g/Lを236で割ったモル濃度と層長1 cmで吸光度を割ると、εは約1.16×10⁴ L・mol⁻¹・cm⁻¹となる。",
      "オ": "490は比吸光度として妥当である。1.16×10⁵とするにはモル濃度が実際の10分の1になり、希釈量と対応しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q043",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "日本薬局方の容量分析法",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "第十八改正日本薬局方に記載されている薬物とその容量分析法の組合せ㋐～㋓のうち、妥当なもののみを挙げているのはどれか。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "クロロブタノールの定量は銀イオンを使った沈殿滴定、フェニレフリン塩酸塩の定量は臭素酸カリウムを使った酸化還元滴定である。従って㋐と㋒が妥当である。",
    "choiceExplanations": {
      "ア": "クロロブタノールの定量に沈殿滴定を使う点は妥当である。スクラルファート水和物中のアルミニウムの定量には錯体形成を用いる。",
      "イ": "クロロブタノールの定量は銀イオンを使った沈殿滴定、フェニレフリン塩酸塩の定量は臭素酸カリウムを使った酸化還元滴定である。従って㋐と㋒が妥当である。",
      "ウ": "クロロブタノールの沈殿滴定は妥当である。塩化カリウムも塩化物イオンと銀イオンを利用する沈殿滴定で定量する。",
      "エ": "フェニレフリン塩酸塩には酸化還元滴定を用いる。スクラルファート水和物中のアルミニウムはキレート滴定で定量され、中和を利用する滴定ではない。",
      "オ": "フェニレフリン塩酸塩には酸化還元滴定を用いる。塩化カリウムの定量は塩化銀の生成を利用するので、㋓のキレート滴定は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q043.webp"
    ],
    "imageAltTexts": [
      "クロロブタノールなどの薬物の構造式と容量分析法の組合せ表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q044",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "芳香族置換・環化付加・Fischerインドール合成",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の反応㋐、㋑、㋒の生成物のうち、主生成物の構造として妥当なもののみを全て挙げているのはどれか。ただし、各反応は必要に応じて適切な後処理を行ったものとする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "フランはジエンとして反応し、㋑の酸素架橋を持つ環化付加物を与える。求ジエン体の隣接する二つの置換基の相対配置も保持される。",
    "choiceExplanations": {
      "ア": "ピリジンは芳香環の求電子置換を受けにくく、置換が起きる場合も一般に窒素の隣の2位は不利である。図㋐の生成物の位置は適切でない。",
      "イ": "㋑はフランの環化付加でできる架橋構造を妥当に示している。㋐の求電子置換で図のピリジン2位の生成物は主生成物になりにくい。",
      "ウ": "フランはジエンとして反応し、㋑の酸素架橋を持つ環化付加物を与える。求ジエン体の隣接する二つの置換基の相対配置も保持される。",
      "エ": "㋑の環化付加物は妥当である。㋒でプロパナールを用いた場合、元のα炭素に結合するメチル基はインドールの3位に現れる。",
      "オ": "㋒のプロパナールのカルボニル炭素はインドールの2位になる。図ではメチル基が2位にあるが、プロパナールのメチル基は元のα炭素を経て3位に残る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q044.webp"
    ],
    "imageAltTexts": [
      "㋐～㋒のピリジン、ディールス・アルダー反応及びインドール合成の反応式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q045",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "フラビンアデニンジヌクレオチドの構造",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の構造式で表される生体関連物質に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 生体内で還元剤として働く。\n㋑ 核酸塩基としてグアニンを含む。\n㋒ 破線で囲まれた部分は、D-リボフラノシドである。\n㋓ 矢印で示した不斉炭素の絶対配置はSである。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "破線内はD-リボフラノシドである。矢印の炭素ではOH、隣にOHを持つ炭素鎖、窒素につながる炭素鎖、水素の順に優先し、水素を奥に見て反時計回りなのでSである。",
    "choiceExplanations": {
      "ア": "図は酸化型のFADで、電子を受け取る側として機能する。糖に結合している塩基はグアニンではなくアデニンである。",
      "イ": "破線で囲んだ糖部分はD-リボフラノシドである。酸化型FADが電子を受け取ることと、還元型FADH₂が電子供与体になることを区別する。",
      "ウ": "㋒は正しい。図のプリン塩基には6位のアミノ基があり、グアニンではなくアデニンである。",
      "エ": "矢印の不斉中心をSとする判断は合っている。㋑のプリン塩基の名称が誤っており、アデニンが含まれている。",
      "オ": "破線内はD-リボフラノシドである。矢印の炭素ではOH、隣にOHを持つ炭素鎖、窒素につながる炭素鎖、水素の順に優先し、水素を奥に見て反時計回りなのでSである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q045.webp"
    ],
    "imageAltTexts": [
      "生体関連物質の構造式、破線で囲まれた糖部分及び矢印で示す不斉炭素"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q046",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "カルボキシ基の生物学的等価体",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の化合物㋐、㋑、㋒のうち、カルボキシ基の生物学的等価体（バイオアイソスター）を含むものとして妥当なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐のテトラゾール環は酸性で、脱プロトン化すると負電荷が環内に分散する。カルボキシ基と似た性質を与える置換基として使われる。",
    "choiceExplanations": {
      "ア": "㋐のテトラゾール環は酸性で、脱プロトン化すると負電荷が環内に分散する。カルボキシ基と似た性質を与える置換基として使われる。",
      "イ": "㋐はテトラゾール環を含む。㋑のアミド基とアミノ基には、㋐と同じカルボキシ基の生物学的等価体はない。",
      "ウ": "㋐のテトラゾール環は妥当である。㋒のエチルエステルは加水分解されるとカルボキシ基を生じるため、カルボキシ基を一時的に覆う構造である。",
      "エ": "㋑の塩酸や㋒のリン酸は塩を形成する対イオン側の成分である。カルボキシ基を置換する構造は㋐のテトラゾール環にある。",
      "オ": "㋒はカルボン酸エステルを含むプロドラッグである。エステルによるカルボキシ基の一時的な修飾と、別の構造を使う生物学的等価体を区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q046.webp"
    ],
    "imageAltTexts": [
      "オルメサルタン メドキソミル、ミドドリン塩酸塩、オセルタミビルリン酸塩の構造式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q047",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "心機能曲線と心不全治療薬の作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "心不全とその治療薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 正常な状態で拡張末期圧が増加すると一回拍出量が増加することを、スターリングの心臓の法則と呼ぶ。\n㋑ 図に示す心機能曲線において、破線の心不全の状態でジゴキシンを投与すると、矢印Bのように心機能曲線に効果を及ぼす。\n㋒ バルサルタンは、ナトリウム・グルコース共輸送体（SGLT）2を阻害して血圧を低下させることにより心不全に有効である。\n㋓ エンパグリフロジンはネプリライシンを阻害して前負荷を抑制することにより心不全に有効である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "前負荷が増すと一定の範囲で一回拍出量が増えるのがスターリングの心臓の法則である。ジゴキシンの収縮力増強作用は、同じ前負荷で拍出量が増える矢印Bに対応する。",
    "choiceExplanations": {
      "ア": "前負荷が増すと一定の範囲で一回拍出量が増えるのがスターリングの心臓の法則である。ジゴキシンの収縮力増強作用は、同じ前負荷で拍出量が増える矢印Bに対応する。",
      "イ": "㋐は妥当である。バルサルタンはアンジオテンシンⅡのAT₁受容体を遮断する薬で、SGLT2阻害薬ではない。",
      "ウ": "心臓のスターリングの法則に関する㋐は正しい。エンパグリフロジンが作用するのはSGLT2であり、ネプリライシンの阻害はサクビトリルの作用に当たる。",
      "エ": "ジゴキシンに関する㋑は妥当である。バルサルタンの作用機序はアンジオテンシンⅡのAT₁受容体の遮断である。",
      "オ": "バルサルタンはAT₁受容体拮抗薬、エンパグリフロジンはSGLT2阻害薬である。㋒と㋓はいずれも作用する標的を取り違えている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q047.webp"
    ],
    "imageAltTexts": [
      "正常心、不全心、薬物治療時の心機能曲線及び矢印AとB"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q048",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "抗精神病薬と神経伝達物質受容体",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "抗精神病薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ ハロペリドールは、黒質線条体におけるドパミン神経系を介する過剰な神経伝達を抑制することで、統合失調症の陽性症状を改善する。\n㋑ ペロスピロンは、セロトニン5-HT₂A受容体を遮断するため、統合失調症の陰性症状を改善する。\n㋒ リスペリドンは、ドパミンD₂受容体を活性化するため、錐体外路症状を引き起こすことがある。\n㋓ オランザピンは、多元受容体作用抗精神病薬（MARTA）に分類され、セロトニン5-HT₂A受容体やドパミンD₂受容体にも作用する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ペロスピロンは5-HT₂A受容体を遮断し、陰性症状の改善に関係する。オランザピンはD₂受容体や5-HT₂A受容体など複数の受容体に作用するMARTAである。",
    "choiceExplanations": {
      "ア": "ペロスピロンの5-HT₂A受容体遮断は㋑の説明に合う。ハロペリドールの陽性症状に対する作用は主に中脳辺縁系でのD₂受容体遮断と関連する。",
      "イ": "陽性症状の改善と関連するのは主に中脳辺縁系のドパミン伝達である。リスペリドンもD₂受容体の遮断薬であり、活性化によって錐体外路症状を起こすわけではない。",
      "ウ": "オランザピンの受容体作用を述べた㋓は妥当である。黒質線条体でのD₂受容体遮断は主に錐体外路症状と関係する。",
      "エ": "ペロスピロンは5-HT₂A受容体を遮断し、陰性症状の改善に関係する。オランザピンはD₂受容体や5-HT₂A受容体など複数の受容体に作用するMARTAである。",
      "オ": "オランザピンの分類は合っている。リスペリドンの錐体外路症状は、D₂受容体の活性化ではなく遮断と関係する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q049",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "梅毒の病原体と薬の分類",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "梅毒とその治療薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 梅毒の病原体は、梅毒トレポネーマである。\n㋑ 梅毒はウイルス感染症で、感染症法＊において5類感染症に指定されており全数把握が必要である。\n㋒ 梅毒の治療には、DNA複製の阻害作用を有するアシクロビルが用いられる。\n㋓ 梅毒の治療には、ペニシリン系抗生物質が用いられる。\n\n＊ 感染症の予防及び感染症の患者に対する医療に関する法律",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "梅毒はスピロヘータの一種である梅毒トレポネーマによる細菌感染症である。治療にはペニシリン系抗菌薬が用いられるため、㋐と㋓が妥当である。",
    "choiceExplanations": {
      "ア": "原因が梅毒トレポネーマであることは正しい。梅毒は全数把握の対象である5類感染症だが、原因はスピロヘータの一種の細菌である。",
      "イ": "梅毒トレポネーマは細菌である。アシクロビルは主にヘルペスウイルス感染症に使う抗ウイルス薬で、梅毒の治療薬ではない。",
      "ウ": "梅毒はスピロヘータの一種である梅毒トレポネーマによる細菌感染症である。治療にはペニシリン系抗菌薬が用いられるため、㋐と㋓が妥当である。",
      "エ": "㋑は梅毒の原因をウイルスとした点が誤りである。㋒のアシクロビルも梅毒トレポネーマを対象とする薬ではない。",
      "オ": "ペニシリン系抗菌薬を用いることは妥当である。㋑にある5類感染症という分類は合っているが、ウイルス感染症という説明は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q050",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "高尿酸血症・痛風治療薬の作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "高尿酸血症・痛風とその治療薬に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．高尿酸血症は、男女問わず血清尿酸値が7.0 mg/dL を超える状態をいう。\n㋑．コルヒチンを投与する際は、グレープフルーツジュースとの相互作用に注意が必要である。\n㋒．アロプリノールはモノアミンオキシダーゼを阻害し、尿酸の産生を抑制させる。\n㋓．プロベネシドは尿酸の糸球体ろ過を促進し、尿酸の排泄を増加させる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "高尿酸血症は、性別にかかわらず血清尿酸値が7.0 mg/dLを超える状態と定義される。グレープフルーツジュースはコルヒチンの代謝に影響し、薬への曝露を増やすことがある。",
    "choiceExplanations": {
      "ア": "高尿酸血症は、性別にかかわらず血清尿酸値が7.0 mg/dLを超える状態と定義される。グレープフルーツジュースはコルヒチンの代謝に影響し、薬への曝露を増やすことがある。",
      "イ": "血清尿酸値の基準は妥当である。プロベネシドは近位尿細管での尿酸の再吸収を抑え、尿酸の排泄を増やす。",
      "ウ": "コルヒチンとグレープフルーツジュースの相互作用には注意が必要である。アロプリノールが阻害するのは尿酸を産生するキサンチンオキシダーゼである。",
      "エ": "㋑の相互作用は妥当である。㋓は尿酸の糸球体ろ過を増やすとしているが、プロベネシドは尿細管での尿酸再吸収を阻害する。",
      "オ": "アロプリノールはキサンチンオキシダーゼを阻害して尿酸産生を抑える。プロベネシドは尿酸の再吸収を阻害して排泄を増加させる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q051",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "ピロリ菌感染の病態と検査",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヘリコバクター・ピロリに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．ヘリコバクター・ピロリによる慢性胃炎は、胃がんの発症原因の一つとなる。\n㋑．ヘリコバクター・ピロリは、尿素を産生して胃酸を中和することでヒトの胃に生息できる。\n㋒．ヘリコバクター・ピロリの感染の診断は、鏡検法、培養法、便中ヘリコバクター・ピロリ抗原検査などにより行われる。\n㋓．オメプラゾール、バンコマイシン及びクラリスロマイシンの三剤併用療法は、ヘリコバクター・ピロリの標準的な除菌治療の一つである。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ピロリ菌による慢性胃炎は胃がんの発症に関与する。感染の検査には生検検体の鏡検や培養、便中抗原検査などがあり、㋐と㋒は妥当である。",
    "choiceExplanations": {
      "ア": "感染に伴う慢性胃炎は胃がんのリスク因子である。ピロリ菌は宿主側の尿素をウレアーゼで分解し、生じたアンモニアで菌の周囲の酸性を弱める。",
      "イ": "ピロリ菌による慢性胃炎は胃がんの発症に関与する。感染の検査には生検検体の鏡検や培養、便中抗原検査などがあり、㋐と㋒は妥当である。",
      "ウ": "慢性胃炎と胃がんの関係を述べた㋐は正しい。㋓の組合せではバンコマイシンが標準的な除菌治療に使われるとしている点が誤りである。",
      "エ": "鏡検や便中抗原検査は感染診断に用いられる。胃の酸性への適応にはピロリ菌による尿素の分解が関わり、尿素の産生とする㋑は誤りである。",
      "オ": "ウレアーゼが分解する基質は尿素であり、産物のアンモニアが胃酸の影響を和らげる。バンコマイシンを含む㋓の処方は標準的な組合せに当たらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q052",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "GABA・グルタミン酸・グリシンの作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "神経性アミノ酸に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ γ-アミノ酪酸（GABA）は、抑制性の神経伝達物質である。ジアゼパムがGABA_A受容体に作用すると、GABAによる抑制作用が促進される。\n㋑ γ-アミノ酪酸（GABA）はGABAトランスアミナーゼによって分解され、コハク酸セミアルデヒドが生成される。バルプロ酸は、このGABAトランスアミナーゼを活性化する。\n㋒ グルタミン酸は、興奮性の神経伝達物質である。ケタミンは、イオンチャネル型のNMDA型グルタミン酸受容体拮抗作用を示す。\n㋓ グリシンは、抑制性の神経伝達物質である。ストリキニーネは、グリシン受容体の作動薬として働く。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ジアゼパムはGABA_A受容体の働きを増強し、GABAによる抑制性伝達を強める。ケタミンはグルタミン酸受容体の一つであるNMDA受容体のチャネルを阻害する。",
    "choiceExplanations": {
      "ア": "ジアゼパムはGABA_A受容体におけるGABAの抑制作用を増強する。バルプロ酸がGABAトランスアミナーゼを活性化するという説明は誤りである。",
      "イ": "ジアゼパムはGABA_A受容体の働きを増強し、GABAによる抑制性伝達を強める。ケタミンはグルタミン酸受容体の一つであるNMDA受容体のチャネルを阻害する。",
      "ウ": "ケタミンのNMDA受容体阻害は妥当である。バルプロ酸はGABAの分解を促進するとする㋑は誤りである。",
      "エ": "バルプロ酸のGABAへの作用は抑制性伝達を増強する方向に働く。ストリキニーネはグリシン受容体の拮抗薬である。",
      "オ": "ケタミンはNMDA受容体を阻害するので㋒は妥当である。ストリキニーネはグリシン受容体を遮断するため、作動薬とする㋓は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q053",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "懸濁液の沈降・再分散・ケーキング",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "懸濁液の性質に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．懸濁液において凝集沈降した懸濁粒子は、再分散させやすい。\n㋑．懸濁液の懸濁粒子が自由沈降して沈積層を形成することを、ケーキングという。\n㋒．凝集沈降する粒子の沈降速度は、ストークスの式に従う。\n㋓．ストークスの式では、沈降速度は懸濁粒子の半径の3乗に比例する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "凝集粒子の沈積物は通常かさ高く、再分散しやすい。㋑は自由沈降した粒子が密に固まり、再分散しにくい沈積層を作る状態を指すと読む。",
    "choiceExplanations": {
      "ア": "凝集粒子の沈積物は通常かさ高く、再分散しやすい。㋑は自由沈降した粒子が密に固まり、再分散しにくい沈積層を作る状態を指すと読む。",
      "イ": "凝集した沈積物は再分散しやすいため、㋐は妥当である。ストークスの式は、凝集の影響を受けない孤立した球形粒子の沈降に適用する。",
      "ウ": "公式正答で㋑は、自由沈降した粒子が固い沈積層を作るケーキングを指す。凝集粒子が一体として沈む過程には、孤立粒子を仮定した式をそのまま適用できない。",
      "エ": "ケーキングは沈殿が密に固まり、容易に再分散しなくなる現象である。ストークスの式で沈降速度に関係するのは粒子半径の2乗である。",
      "オ": "ストークスの式は、粘性流体中の孤立した球形粒子の沈降に使われる。沈降速度が粒子半径の3乗に比例するという説明も誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q054",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "注射剤の無菌操作とエンドトキシン除去",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "注射剤の滅菌に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 高周波滅菌法は、通例2,450±50 MHzの高周波を直接照射して生じる熱により微生物を殺滅する方法で、水分含量の少ない固体の滅菌に適している。\n㋑ 無菌操作法は、原料を加熱滅菌した後、一連の無菌工程により製剤を製造する方法である。\n㋒ 超ろ過法に用いられる膜には、全ての種類の微生物及びエンドトキシンを除去できる能力を有する逆浸透膜又は限外ろ過膜がある。\n㋓ エンドトキシンは250 ℃、30分間以上の乾熱滅菌により不活化できる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "用途に適合した逆浸透膜や限外ろ過膜で、微生物とエンドトキシンを除去する方法がある。エンドトキシンの不活化には、微生物を殺滅する条件とは別に高温の乾熱処理が用いられる。",
    "choiceExplanations": {
      "ア": "高周波加熱は対象物の誘電加熱を利用し、水分の乏しい固体に適するとした説明は誤りである。無菌操作法で原料の滅菌方法を加熱に限定する必要はない。",
      "イ": "㋒には微生物とエンドトキシンの除去に用いる膜が挙げられている。㋐の高周波滅菌が水分の乏しい固体に適するという点が誤っている。",
      "ウ": "㋒の膜による除去は妥当である。無菌操作法では、原料や器具の性質に合った方法であらかじめ滅菌したものを扱う。",
      "エ": "エンドトキシンを不活化する乾熱処理の説明は妥当である。㋑は無菌工程で製造することに加えて、原料の滅菌方法を加熱に限定している点が誤りである。",
      "オ": "用途に適合した逆浸透膜や限外ろ過膜で、微生物とエンドトキシンを除去する方法がある。エンドトキシンの不活化には、微生物を殺滅する条件とは別に高温の乾熱処理が用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q055",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "Scatchardプロットと競合結合",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "薬物のタンパク結合に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「薬物のタンパク結合を可逆的平衡反応と考え、タンパク質1分子中の薬物の結合部位がn個あり、どの部位も薬物に対して同一の親和性をもち、かつ、結合部位は互いに独立して干渉し合わないと仮定する。このとき、タンパク質1分子当たりに結合している薬物分子数rは、式①で表される。\n\nr＝n・K・［D_f］/(1＋K・［D_f］) ……①\nK：結合定数\n［D_f］：非結合形薬物濃度\n\n式①を変形して得られるScatchardプロットは、rの変化に対する［㋐］の変化をプロットしたもので、図の実線のように傾き−Kの直線が得られる。このとき横軸との切片は［㋑］で表される。\n図において、二つの薬物を併用して実線から破線のように変化した場合、［㋒］阻害が起こったことが分かる。」",
    "choices": {
      "ア": "［D_f］/r ／ 1/n ／ 非競合",
      "イ": "r/［D_f］ ／ n ／ 非競合",
      "ウ": "r/［D_f］ ／ n ／ 競合",
      "エ": "1/r ／ 1/n ／ 競合",
      "オ": "1/r ／ 1/n ／ 非競合"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "変形するとr/［D_f］＝nK−Krとなり、縦軸はr/［D_f］、横軸との切片はnである。破線の切片nは変わらず見かけの結合定数だけが小さくなるので、競合阻害に当たる。",
    "choiceExplanations": {
      "ア": "元の式を整理するとr/［D_f］＝nK−Krである。非結合形濃度を分子に置く逆数を使うと、rに対して示された直線にはならない。",
      "イ": "軸と切片は合っているが、破線でも横軸との切片nが変わっていない。見かけの親和性だけが低下するため競合阻害に対応する。",
      "ウ": "変形するとr/［D_f］＝nK−Krとなり、縦軸はr/［D_f］、横軸との切片はnである。破線の切片nは変わらず見かけの結合定数だけが小さくなるので、競合阻害に当たる。",
      "エ": "競合阻害という判断は合っている。原式を変形して得る直線の縦軸はr/［D_f］となり、横軸との切片は1/nではなくnである。",
      "オ": "横軸のrに対し、r/［D_f］が傾き−Kの直線を作る。同じ横軸切片で傾きの絶対値が小さくなる破線は、競合阻害を示す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q055.webp"
    ],
    "imageAltTexts": [
      "薬物の結合について実線と破線で示したScatchardプロット"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q056",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "薬物の薬力学的相互作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「薬力学的相互作用は、作用部位や血中の薬物濃度の変化に［㋐］相互作用である。薬力学的相互作用として、ワルファリンとアスピリンの併用によりワルファリンの抗血液凝固作用が［㋑］される例、セレギリンとイミプラミンの併用により脳内モノアミン濃度が［㋒］する例などが知られている。」",
    "choices": {
      "ア": "起因する ／ 促進 ／ 上昇",
      "イ": "起因する ／ 抑制 ／ 低下",
      "ウ": "起因しない ／ 促進 ／ 上昇",
      "エ": "起因しない ／ 抑制 ／ 上昇",
      "オ": "起因しない ／ 抑制 ／ 低下"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "薬力学的相互作用は、薬物の作用が重なることで生じる。ワルファリンの抗凝固作用にアスピリンの抗血小板作用が加わり、セレギリンによる分解阻害とイミプラミンによる再取り込み阻害ではモノアミン濃度が上がる。",
    "choiceExplanations": {
      "ア": "出血傾向の増強とモノアミン濃度上昇の方向は合っている。薬物濃度の変化そのものに起因する場合は、薬物動態学的相互作用に分類される。",
      "イ": "薬力学的な相互作用は、薬物の血中濃度が変わらなくても生じる。ワルファリンとアスピリンでは止血への作用が重なり、出血の危険が高まる。",
      "ウ": "薬力学的相互作用は、薬物の作用が重なることで生じる。ワルファリンの抗凝固作用にアスピリンの抗血小板作用が加わり、セレギリンによる分解阻害とイミプラミンによる再取り込み阻害ではモノアミン濃度が上がる。",
      "エ": "薬力学的相互作用が薬物濃度の変化に起因しないという点と、モノアミン濃度上昇は妥当である。抗凝固作用と抗血小板作用が重なると、出血リスクは抑制されず高まる。",
      "オ": "薬物濃度の変化に起因しない点は妥当である。二つの例ではそれぞれ止血への作用が強まり、脳内のモノアミン濃度が上昇する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q057",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "水銀・カドミウム・鉛・ヒ素の慢性毒性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属の慢性毒性に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 無機水銀とメチル水銀の消化管吸収は同程度だが、主要な毒性については無機水銀が腎障害、メチル水銀が神経障害である。\n㋑ カドミウムは、近位尿細管においてカルシウムとリンの再吸収を阻害し、骨軟化症を引き起こす。\n㋒ 鉛は、δ-アミノレブリン酸脱水酵素の活性化と三価鉄から二価鉄への還元反応の活性化によりヘム合成を阻害し、貧血を引き起こす。\n㋓ ヒ素化合物は、皮膚の色素沈着や角化症を引き起こす。また、ヒ素汚染地域では皮膚がんが多発している。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "カドミウムが近位尿細管を障害すると、リンなどが尿へ失われやすくなり、骨軟化症につながる。ヒ素への慢性曝露では皮膚の色素沈着や角化が起こり、皮膚がんのリスクも高まる。",
    "choiceExplanations": {
      "ア": "カドミウムの腎障害と骨軟化症を述べた㋑は妥当である。経口摂取時の吸収率は、一般にメチル水銀の方が無機水銀より高い。",
      "イ": "慢性のヒ素曝露は皮膚の色素沈着などを引き起こす。無機水銀とメチル水銀は、主な標的臓器に加えて消化管からの吸収されやすさも異なる。",
      "ウ": "カドミウムによる近位尿細管の障害は妥当である。鉛はδ-アミノレブリン酸脱水酵素などを阻害してヘム合成を妨げる。",
      "エ": "カドミウムが近位尿細管を障害すると、リンなどが尿へ失われやすくなり、骨軟化症につながる。ヒ素への慢性曝露では皮膚の色素沈着や角化が起こり、皮膚がんのリスクも高まる。",
      "オ": "ヒ素の皮膚への影響を述べた㋓は妥当である。鉛はヘム合成経路の酵素を活性化するのでなく、その酵素の働きを妨げる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q058",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "母子保健・国勢調査・新生児検査",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の母子保健に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．母子保健政策にも利用される国勢調査は、日本に住んでいる全ての人と世帯を対象とする国の統計調査であり、5年ごとに実施される。\n㋑．合計特殊出生率は、2000（平成12）年以降、一貫して減少傾向である。\n㋒．母子保健法では、妊娠した者は速やかに妊娠の届出を行い母子健康手帳の交付を受けることとなっている。\n㋓．Ⅰ型糖尿病等の病気を早期に発見するために、新生児の尿を用いて新生児マススクリーニング検査が行われている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "国勢調査は5年ごとに行われる全数調査である。母子保健法では妊娠の届出を定め、届出を受けた市町村が母子健康手帳を交付する。",
    "choiceExplanations": {
      "ア": "国勢調査は国内に住む人と世帯を対象に5年ごとに行われる。合計特殊出生率は2005年の1.26から2015年の1.45に上昇しており、2000年以降一貫して低下したわけではない。",
      "イ": "国勢調査は5年ごとに行われる全数調査である。母子保健法では妊娠の届出を定め、届出を受けた市町村が母子健康手帳を交付する。",
      "ウ": "妊娠の届出と母子健康手帳に関する㋒は正しい。出生率には低下した時期と上昇した時期があり、㋑の記述は誤りである。",
      "エ": "合計特殊出生率は2000年以降に上昇した時期もある。新生児マススクリーニングは通常、尿ではなく、ろ紙に採取した血液を用いる。",
      "オ": "妊娠の届出により母子健康手帳が交付される。新生児マススクリーニングでは、先天性代謝異常症などを対象に血液検査を行う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q059",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "アミノ酸の電荷・電気泳動・尿素回路",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「α-アミノ酸は、分子内の同一の炭素にカルボキシ基とアミノ基が結合している。ヒトのタンパク質を構成するα-アミノ酸20種のうち、［㋐］のみは第一級アミンではなく第二級アミンである。α-アミノ酸は、中性の水中で双性イオンとして存在する。カルボキシ基、アミノ基、側鎖のpKₐがそれぞれ以下のとおりであるアミノ酸A、B、Cの混合物をpH 7.0の緩衝液中で等電点電気泳動する実験を考える。\n\n泳動後、これらのアミノ酸は陰極側にアミノ酸［㋑］、陽極側にアミノ酸［㋒］のように分離される。生体内には、タンパク質を構成しないアミノ酸も存在する。［㋓］はヒトの尿素回路の中間体であり、食品ではウリ科の植物に多く含有される。」",
    "choices": {
      "ア": "トリプトファン ／ A ／ B、C ／ オルニチン",
      "イ": "トリプトファン ／ B、C ／ A ／ シトルリン",
      "ウ": "プロリン ／ A、C ／ B ／ オルニチン",
      "エ": "プロリン ／ B ／ A、C ／ シトルリン",
      "オ": "プロリン ／ B、C ／ A ／ シトルリン"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "第二級アミンはプロリン、尿素回路の中間体でウリ科に多いのはシトルリンである。固定pH 7での電気泳動として電荷を判定すると、等電点より低いpHにあるBとCは陰極側、等電点より高いpHにあるAは陽極側に移動する。",
    "choiceExplanations": {
      "ア": "第二級アミンを持つのは環構造を持つプロリンである。pH 7では酸性の側鎖を持つAが負に帯電し、陽極側に移動する。",
      "イ": "陽極側にA、陰極側にBとCという分離は合っている。トリプトファンのα-アミノ基は第一級アミンであり、第二級アミンを持つのはプロリンである。",
      "ウ": "プロリンは合っている。AはpH 7で負に、BとCは正に帯電し、ウリ科植物に含まれるものとして当てはまるのはシトルリンである。",
      "エ": "プロリンとシトルリンは合っている。Cの等電点は(6.04＋9.33)/2≒7.69なので、pH 7では正に帯電して陰極側へ移動する。",
      "オ": "第二級アミンはプロリン、尿素回路の中間体でウリ科に多いのはシトルリンである。固定pH 7での電気泳動として電荷を判定すると、等電点より低いpHにあるBとCは陰極側、等電点より高いpHにあるAは陽極側に移動する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q059.webp"
    ],
    "imageAltTexts": [
      "アミノ酸A、B、Cのカルボキシ基、アミノ基及び側鎖のpKaの表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q060",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "フラボノイドの構造と呈色",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "以下に図示するフラボノイドのうち、色を呈するものとして妥当なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋔",
      "オ": "㋒、㋔"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋐のフラボノールと㋓のフラボンは、中央の環の二重結合とカルボニル基が共役して黄色を呈する。㋑のアントシアニジンも広がった共役系を持ち、赤などの色を呈する。",
    "choiceExplanations": {
      "ア": "㋐のフラボノールと㋑のアントシアニジンは色を呈する。㋒のフラバン-3-オールには中央の環を通る共役構造がなく、図の形では無色である。",
      "イ": "㋐のフラボノールと㋓のフラボンは、中央の環の二重結合とカルボニル基が共役して黄色を呈する。㋑のアントシアニジンも広がった共役系を持ち、赤などの色を呈する。",
      "ウ": "㋐と㋓は黄色を呈する。㋑もフラビリウムイオンの共役構造を持つため、色を呈するものに含まれる。",
      "エ": "㋑は呈色するが、㋔のフラバノンでは中央の環の炭素間二重結合がない。㋐や㋓のような広い共役系を持たない。",
      "オ": "㋒のフラバン-3-オールも㋔のフラバノンも、中央の環にフラボン類のような共役系がない。呈色する㋐、㋑、㋓とは構造が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q060.webp"
    ],
    "imageAltTexts": [
      "㋐～㋔の5種類のフラボノイドの構造式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q061",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "麹菌を使う発酵食品",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "以下に示す発酵食品のうち、製造の過程でコウジカビ（麹菌）を使用するものとして妥当なもののみを全て挙げているのはどれか。\n\n㋐．味噌\n㋑．米酢\n㋒．日本酒\n㋓．糸引き納豆",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒、㋓",
      "オ": "㋑、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "麹菌の酵素は味噌と日本酒の製造で原料を分解し、米酢の製造でも米のデンプンの糖化に使われる。糸引き納豆の発酵を担うのは納豆菌である。",
    "choiceExplanations": {
      "ア": "麹菌の酵素は味噌と日本酒の製造で原料を分解し、米酢の製造でも米のデンプンの糖化に使われる。糸引き納豆の発酵を担うのは納豆菌である。",
      "イ": "味噌と日本酒では麹菌が利用される。米酢では酢酸菌による酢酸発酵に先立つ糖化の段階で、麹菌が利用される。",
      "ウ": "味噌には米麹などが利用される。糸引き納豆の粘りなどを生み出す発酵微生物は、麹菌ではなく納豆菌である。",
      "エ": "米酢と日本酒には麹菌が使われる。糸引き納豆を作るのは納豆菌であり、味噌にも麹菌が用いられる。",
      "オ": "米酢では麹菌の酵素が米のデンプンを糖に変える。納豆の発酵で用いる種菌は納豆菌である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q062",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "食品の光酸化・脂質酸化・褐変",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "食品の酸化に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 植物油に含まれるクロロフィルは、光が当たるとそのエネルギーを吸収して不安定な三重項状態になる。クロロフィルが三重項状態から基底状態に戻るとき、エネルギーを基底状態の酸素に与えて三重項酸素を生じ、植物油の酸化反応が進む。\n㋑ β-カロテン、リコピンなどのカロテノイドやα-トコフェロールは、高エネルギー状態の酸素を基底状態に戻すことによって、酸化を抑制する作用がある。\n㋒ 油脂の自動酸化の速度は、油脂を構成する脂肪酸の活性メチレン基の数に左右されるため、魚油は酸化されにくい油である。\n㋓ グルコースやフルクトースなどのカルボニル基をもつ単糖やオリゴ糖は、アミノ基をもつ化合物とメイラード反応を起こし、褐色化合物を生じる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋒、㋓",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "カロテノイドなどは反応性の高い一重項酸素を消光し、光酸化を抑える。還元糖などのカルボニル基とアミノ基の反応では、メイラード反応によって褐色の化合物が生じる。",
    "choiceExplanations": {
      "ア": "カロテノイドの抗酸化作用は妥当である。クロロフィルがエネルギーを渡す相手は基底状態の三重項酸素であり、反応性の高い一重項酸素が生じる。",
      "イ": "抗酸化成分を挙げる㋑とメイラード反応の㋓は妥当である。㋐では光増感で生じる一重項酸素を三重項酸素としている。",
      "ウ": "カロテノイドなどは一重項酸素を消光して酸化を抑える。魚油は高度不飽和脂肪酸が多く、酸化を受けやすい。",
      "エ": "㋑と㋓は正しい。魚油には二重結合に挟まれたメチレン基を複数持つ脂肪酸が多く、㋒の酸化されにくいという結論は逆である。",
      "オ": "カロテノイドなどは反応性の高い一重項酸素を消光し、光酸化を抑える。還元糖などのカルボニル基とアミノ基の反応では、メイラード反応によって褐色の化合物が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q063",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "食品中の有害成分と異常プリオン",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "食品の有害成分に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．ジャガイモの新芽や緑化部に含まれるソラニンは、加熱に対して安定であり、頭痛やめまいなどの急性中毒症状を引き起こす。\n㋑．バラ科植物の種子などに含まれる青酸配糖体は、アミラーゼにより糖鎖部分が外れると、最終的に猛毒の青酸を生じる。\n㋒．豆類や麦類などに含まれるプロテアーゼインヒビターは低分子化合物であることが多く、加熱に対して安定であり、下痢などを引き起こす。\n㋓．ウシ海綿状脳症（BSE）の病因物質は、異常プリオンタンパク質とされている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋐、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ジャガイモの芽や緑化部に含まれるソラニンなどは通常の加熱で除去しにくく、食中毒の原因となる。BSEの病因物質は、正常なタンパク質と立体構造の異なる異常プリオンタンパク質である。",
    "choiceExplanations": {
      "ア": "ソラニンなどのグリコアルカロイドはジャガイモの芽や緑化部に蓄積し、通常の加熱で十分には除かれない。青酸配糖体の糖の部分を切るのはアミラーゼではなく、配糖体に作用する酵素である。",
      "イ": "ソラニンの毒性とBSEの原因を述べた㋐と㋓は妥当である。㋑は青酸配糖体の分解酵素をアミラーゼとしている点が誤りである。",
      "ウ": "㋐と㋓は正しい。豆類などの代表的なプロテアーゼ阻害成分はタンパク質で、一般に加熱によって活性が下がる。",
      "エ": "ジャガイモの芽や緑化部に含まれるソラニンなどは通常の加熱で除去しにくく、食中毒の原因となる。BSEの病因物質は、正常なタンパク質と立体構造の異なる異常プリオンタンパク質である。",
      "オ": "BSEの病因に関する㋓は妥当である。豆類のトリプシン阻害物質などを低分子で熱に安定とする㋒は、代表的な性質と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q064",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "食肉の死後硬直と色素",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "食肉に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 死後硬直は、筋肉中におけるATPの減少や、乳酸の蓄積によるpHの低下に伴い、筋原繊維を構成するアクチンとミオシンが結合してアクトミオシンを形成するために起こる。\n㋑ ミオグロビンに亜硝酸塩を作用させると、亜硝酸塩が還元されて生成した一酸化窒素がミオグロビンと結合し、安定な鮮赤色のメトミオクロモーゲンを生じる。\n㋒ 鶏肉にはビタミンB₁が他の動物肉の数倍含まれ、ビタミンB₁のよい給源となる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "死後にATPが減少すると、結合したアクチンとミオシンが解離しにくくなる。これにより生じたアクトミオシンによって筋肉が硬直する。",
    "choiceExplanations": {
      "ア": "死後にATPが減少すると、結合したアクチンとミオシンが解離しにくくなる。これにより生じたアクトミオシンによって筋肉が硬直する。",
      "イ": "死後硬直の説明は妥当である。一酸化窒素とミオグロビンが結合してできるのはニトロソミオグロビンであり、加熱後の色素にも㋑の名称は当てはまらない。",
      "ウ": "ATPの減少に伴うアクトミオシンの形成を述べた㋐は妥当である。ビタミンB₁を比較的多く含む代表的な肉は豚肉である。",
      "エ": "発色に関わる一酸化窒素との結合物はニトロソミオグロビンである。ビタミンB₁は豚肉に多く、鶏肉が一般に他の肉より数倍多いとする記述は誤りである。",
      "オ": "鶏肉が他の肉より数倍のビタミンB₁を含むという説明は誤りである。肉類では豚肉がビタミンB₁の主な供給源の一つである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q065",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "気候と土壌の生成",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "土壌生成と環境に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．土壌に大量に含まれる銅が還元銅として安定し青灰色や青緑色になるグライ層の存在は、この土層が常に地下水位の下にあったことを示す。\n㋑．やや乾燥状態にある中緯度の草原地帯では、黒々とした厚い表層をもつ耕しやすい土壌が生成される。この代表的な土壌がチェルノーゼムである。\n㋒．高温多湿の熱帯地方では、微生物の活発な活動により有機物が急速に分解されるとともに、鉱物も激しい化学的風化を受け、オキシソルという灰白色の土壌が生成される。\n㋓．乾燥地帯では、塩基類の濃度が高い堆積物が母材であることが多く、土壌水は下から上に移動するため、塩類集積が進みやすい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "チェルノーゼムは温帯の草原で発達し、有機物に富む厚い黒色の表層を持つ。乾燥地では水が毛管作用で上昇し、地表付近で蒸発して溶けていた塩類が集積しやすい。",
    "choiceExplanations": {
      "ア": "グライ層の灰青色などは、水で飽和した還元的な環境で起こる鉄の還元に関係する。草原のチェルノーゼムを述べた㋑は妥当である。",
      "イ": "グライ層の発色には主に鉄の酸化還元状態が関わる。熱帯で強く風化したオキシソルは、鉄酸化物のため赤色や黄色を示すことが多い。",
      "ウ": "草原地帯にできるチェルノーゼムの説明は合っている。オキシソルを一律に灰白色とする㋒は誤りである。",
      "エ": "チェルノーゼムは温帯の草原で発達し、有機物に富む厚い黒色の表層を持つ。乾燥地では水が毛管作用で上昇し、地表付近で蒸発して溶けていた塩類が集積しやすい。",
      "オ": "乾燥地での塩類集積を述べた㋓は妥当である。強く風化したオキシソルは鉄やアルミニウムの酸化物などを含み、灰白色という説明は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q066",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "土壌の養分保持・硝化・脱窒",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "作物生産に関わる土壌の働きに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．土壌有機物の腐植物質は永久荷電を有しており、土壌中の陽イオンを吸着保持することで、作物に必要な養分を供給している。この能力は土壌pH の変化の影響を受けない。\n㋑．田面水に覆われた水田土壌の最表層では硝化作用が進むため、土壌表面に散布した硫酸アンモニウム肥料に含まれる窒素は脱窒により利用効率が低下する。\n㋒．土壌が酸性化しpH が5以下になると、溶解性が高まった鉄とリンが作物に多く吸収される。\n㋓．土壌粒子間にできる孔隙のサイズが大きいほど、水を排水する力と保持する力の両方が強くなり、作物の水ストレスが起こりにくい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒、㋓",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水田の表面の酸素がある層では硝化が進み、アンモニウムから硝酸が生じる。その硝酸がより下の還元的な層で脱窒されると、窒素がガスとして失われる。",
    "choiceExplanations": {
      "ア": "水田で硝化と脱窒により窒素が失われることはある。腐植物質の負電荷は酸性の官能基の解離によるものが多く、pHによって変化する。",
      "イ": "腐植物質の荷電はpHに依存する。酸性土壌ではリン酸が鉄やアルミニウムに固定されやすく、大きな孔隙は排水には役立つが水の保持力を強めない。",
      "ウ": "水田の表面の酸素がある層では硝化が進み、アンモニウムから硝酸が生じる。その硝酸がより下の還元的な層で脱窒されると、窒素がガスとして失われる。",
      "エ": "㋑の硝化・脱窒に関する説明は正しい。酸性が強くなるとリンは鉄やアルミニウムに固定されやすく、植物に利用されやすくなるとは限らない。",
      "オ": "大きな孔隙は水が流れやすい一方、水を引き留める毛管力は小さい。水の排出と保持がともに強まるという㋓は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q067",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "無施肥区との差で求める窒素利用率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "イネの窒素肥料の利用率に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「肥料による窒素施用量を変えてイネの品種A及び品種Bを栽培した際のイネの窒素吸収量が図のとおりであるとき、品種Aは肥料由来の窒素の利用率が品種Bよりも［㋐］。1 m²当たりの肥料による窒素施用量を5 gから12 gに増やした場合、窒素の利用率は品種Aでは［㋑］し、品種Bでは［㋒］。」",
    "choices": {
      "ア": "高い ／ 上昇 ／ 上昇する",
      "イ": "高い ／ 低下 ／ 変化しない",
      "ウ": "低い ／ 上昇 ／ 上昇する",
      "エ": "低い ／ 低下 ／ 変化しない",
      "オ": "低い ／ 低下 ／ 上昇する"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "利用率は無施肥区からの窒素吸収の増分を施用量で割って求める。Aは(9−7)/5＝40％から(11−7)/12≒33％に下がり、Bは(6.5−4)/5と(10−4)/12がともに50％である。",
    "choiceExplanations": {
      "ア": "品種Aの吸収量そのものは大きいが、無施肥での吸収量も大きい。無施肥区からの増分で比較するとAの利用率はBより低い。",
      "イ": "Aの利用率は施用量の増加で下がり、Bはほぼ変わらない。無施肥での吸収量を差し引いた同じ施用量での利用率は、Aの方が低い。",
      "ウ": "同じ施用量でAの利用率が低いという判断は合っている。Aの利用率は40％から約33％に下がり、Bは50％のままである。",
      "エ": "利用率は無施肥区からの窒素吸収の増分を施用量で割って求める。Aは(9−7)/5＝40％から(11−7)/12≒33％に下がり、Bは(6.5−4)/5と(10−4)/12がともに50％である。",
      "オ": "Aの利用率が低下する点は正しい。Bでは吸収の増分が施用量に比例し、5 gでも12 gでも利用率は同じである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q067.webp"
    ],
    "imageAltTexts": [
      "肥料による窒素施用量とイネの品種A及びBの窒素吸収量を示すグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q068",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "揮発性有機化合物の汚染土壌修復",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "揮発性有機化合物による汚染土壌の修復技術に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ホットソイル法（若しくはLAIM工法）は、土壌中の水分と反応して発熱する［㋐］を土壌に添加・混合して揮発性有機化合物を分離する手法である。また、揮発性有機塩素系化合物に対しては、土壌と［㋑］を混合し還元反応により［㋒］作用を誘導する［㋓］が適用できる。」",
    "choices": {
      "ア": "活性炭 ／ 過マンガン酸塩 ／ 熱分解 ／ 触媒燃焼法",
      "イ": "活性炭 ／ 鉄粉 ／ 脱塩素 ／ 鉄粉還元法",
      "ウ": "生石灰 ／ 過マンガン酸塩 ／ 脱塩素 ／ 触媒燃焼法",
      "エ": "生石灰 ／ 鉄粉 ／ 脱塩素 ／ 鉄粉還元法",
      "オ": "生石灰 ／ 鉄粉 ／ 熱分解 ／ 触媒燃焼法"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "生石灰は水和すると熱を発生し、その熱で汚染物質の揮発を促す。鉄粉還元法では、鉄を電子の供与体として有機塩素化合物を還元し、塩素を外す。",
    "choiceExplanations": {
      "ア": "ホットソイル法で水分との反応により発熱するのは生石灰である。過マンガン酸塩は酸化剤であり、本文後半の還元処理には合わない。",
      "イ": "後半の鉄粉還元法と脱塩素は妥当である。ホットソイル法で利用するのは活性炭の吸着作用ではなく、生石灰の水和熱である。",
      "ウ": "ホットソイル法に用いる生石灰は正しい。揮発性有機塩素系化合物の還元的な脱塩素処理には鉄粉を使う。",
      "エ": "生石灰は水和すると熱を発生し、その熱で汚染物質の揮発を促す。鉄粉還元法では、鉄を電子の供与体として有機塩素化合物を還元し、塩素を外す。",
      "オ": "生石灰と鉄粉はそれぞれの手法に使われる。後半で問われているのは還元反応による脱塩素であり、熱分解や触媒燃焼ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q069",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "無機銅剤と殺菌剤の作用点",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "殺菌剤に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．古くから使用されてきた硫酸銅やボルドー液は、解糖系やクエン酸回路上の複数の酵素反応を阻害する。\n㋑．チオファネートメチルとベノミルは、植物体内でカルベンダジム（MBC）に代謝され殺菌作用を発現することから、ベンズイミダゾール系薬剤とも総称される。\n㋒．放線菌が産生するバリダマイシンは、菌類の細胞壁構成成分であるキチンの合成を阻害する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "銅剤は代謝系の複数の酵素の働きを妨げる。チオファネートメチルとベノミルはいずれもカルベンダジムに変化し、微小管の形成に関わるβ-チューブリンに作用する。",
    "choiceExplanations": {
      "ア": "銅剤が複数の酵素反応を阻害するという㋐は妥当である。チオファネートメチルとベノミルに関する㋑も妥当である。",
      "イ": "銅剤は代謝系の複数の酵素の働きを妨げる。チオファネートメチルとベノミルはいずれもカルベンダジムに変化し、微小管の形成に関わるβ-チューブリンに作用する。",
      "ウ": "銅剤の多作用点性を述べた㋐は妥当である。バリダマイシンはキチン合成ではなく、トレハロースを分解するトレハラーゼを阻害する。",
      "エ": "カルベンダジムに関する㋑は正しい。㋐の銅剤も多くの酵素に作用するため、含める必要がある。",
      "オ": "チオファネートメチルとベノミルはMBCに変化する。バリダマイシンの標的はトレハラーゼであり、キチン合成酵素ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q070",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "イネとヒエの除草剤感受性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "除草剤の選択性に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「プロパニルを茎葉処理すると、イネ体内ではプロパニルのアミド結合が速やかに［㋐］され不活化される。しかし、ヒエはこの反応を触媒する酵素である［㋑］を欠くためにプロパニルは不活化されず、除草剤の作用を受ける。また、［㋑］の活性は有機リン系及び［㋒］殺虫剤により阻害されるため、これらの殺虫剤と同時にプロパニルを茎葉処理すると、イネもプロパニルによる薬害を受ける。」",
    "choices": {
      "ア": "加水分解 ／ アリルアシルアミダーゼ ／ カーバメート系",
      "イ": "加水分解 ／ アリルアシルアミダーゼ ／ フェニルピラゾール系",
      "ウ": "加水分解 ／ シトクロムP450 ／ カーバメート系",
      "エ": "酸化 ／ アリルアシルアミダーゼ ／ フェニルピラゾール系",
      "オ": "酸化 ／ シトクロムP450 ／ カーバメート系"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "イネではアリルアシルアミダーゼがプロパニルのアミド結合を加水分解する。この酵素を阻害し得る殺虫剤の群には、有機リン系やカーバメート系が挙げられる。",
    "choiceExplanations": {
      "ア": "イネではアリルアシルアミダーゼがプロパニルのアミド結合を加水分解する。この酵素を阻害し得る殺虫剤の群には、有機リン系やカーバメート系が挙げられる。",
      "イ": "加水分解とそれを担う酵素は合っている。この設問で酵素阻害を起こす群として挙げられるのはカーバメート系である。",
      "ウ": "アミド結合が加水分解される点は妥当である。その反応を触媒するのはシトクロムP450ではなく、アリルアシルアミダーゼである。",
      "エ": "アリルアシルアミダーゼが触媒するのは酸化ではなく加水分解である。本文が指す殺虫剤の群はカーバメート系である。",
      "オ": "カーバメート系は妥当である。イネでのプロパニルの不活化はシトクロムP450による酸化ではなく、アミダーゼによる結合の加水分解で進む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q071",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "界面活性剤のミセルとタンパク質変性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "界面活性剤に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「界面活性剤は薄い溶液中では単量体だが、ある濃度を超えると、一部がミセルを形成する。ミセルは脂溶性物質を［㋐］させる。また、タンパク質の実験によく用いられるドデシル硫酸ナトリウムは［㋑］イオン性の界面活性剤で、その分子の［㋒］がタンパク質に結合してタンパク質の立体構造をほどく。」",
    "choices": {
      "ア": "けん化 ／ 陰 ／ ドデシル基",
      "イ": "けん化 ／ 陰 ／ 硫酸基",
      "ウ": "けん化 ／ 陽 ／ 硫酸基",
      "エ": "乳化 ／ 陰 ／ ドデシル基",
      "オ": "乳化 ／ 陽 ／ 硫酸基"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ミセルは疎水性の内部に脂溶性物質を取り込み、水中に分散しやすくする。ドデシル硫酸ナトリウムは陰イオン性で、疎水性のドデシル基がタンパク質に結合する。",
    "choiceExplanations": {
      "ア": "陰イオン性で、疎水性のドデシル基がタンパク質に結合する点は正しい。けん化はエステルの加水分解であり、ミセルによる分散の効果とは異なる。",
      "イ": "ドデシル硫酸ナトリウムは陰イオン性である。ミセルは疎水性物質を水に分散させ、タンパク質の疎水部にはドデシル基が結合する。",
      "ウ": "けん化は化学反応であり、ミセルによる乳化や可溶化とは異なる。硫酸エステル部分は負に帯電しており、界面活性剤は陰イオン性である。",
      "エ": "ミセルは疎水性の内部に脂溶性物質を取り込み、水中に分散しやすくする。ドデシル硫酸ナトリウムは陰イオン性で、疎水性のドデシル基がタンパク質に結合する。",
      "オ": "脂溶性物質の乳化・分散に関する㋐は合っている。硫酸エステル部が負に帯電し、タンパク質と相互作用する疎水部はドデシル基である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q072",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "ミカエリス・メンテン式の両逆数表示",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ミカエリス・メンテンの式における、ミカエリス定数（Kₘ）と最大速度（Vₘₐₓ）に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 基質濃度がKₘに等しい場合、反応速度はVₘₐₓに等しい。\n㋑ 酵素の基質に対する親和性が高いほど、Kₘはより大きい。\n㋒ ラインウィーバー・バークプロットではグラフの傾きがKₘ/Vₘₐₓに等しい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ミカエリス・メンテン式の逆数を取ると1/v＝(Kₘ/Vₘₐₓ)(1/［S］)＋1/Vₘₐₓとなる。したがって、1/［S］に対する1/vの傾きはKₘ/Vₘₐₓである。",
    "choiceExplanations": {
      "ア": "ミカエリス・メンテン式に［S］＝Kₘを代入すると、分母は2Kₘとなる。反応速度は最大速度の半分である。",
      "イ": "基質濃度がKₘに等しいときの速度は最大速度の半分である。一般にKₘの小さい方が低濃度で半最大速度に達し、見かけの親和性が高いと解釈される。",
      "ウ": "Kₘは半最大速度を与える基質濃度であり、高い親和性を示す場合に大きくなるという説明は妥当でない。Kₘは反応速度定数にも依存するため、常に解離定数と一致するわけではない。",
      "エ": "両逆数プロットの傾きがKₘ/Vₘₐₓになる㋒は正しい。㋑は通常の見かけの親和性とKₘの関係を逆にしている。",
      "オ": "ミカエリス・メンテン式の逆数を取ると1/v＝(Kₘ/Vₘₐₓ)(1/［S］)＋1/Vₘₐₓとなる。したがって、1/［S］に対する1/vの傾きはKₘ/Vₘₐₓである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q073",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "血液・細胞小器官のpH調整",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生体におけるpH調整に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 血液中の酸性の代謝物濃度が上昇するとHCO₃⁻が還元され、生成した過剰のCO₂は呼気として吐き出される。\n㋑ ヘモグロビンや血清アルブミンなどの血液中のタンパク質は、血液のpH調整に寄与している。\n㋒ ミトコンドリアは、電子伝達系でマトリックスにH⁺が取り込まれるため、マトリックスのpHが酸性に傾いている。\n㋓ エンドソーム内腔はトランスゴルジ網内腔に比べてpHが高いため、COPⅡ被覆小胞でトランスゴルジ網から運搬されてきたリソソームの加水分解酵素がその受容体から解離する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "公式正答の㋐は、HCO₃⁻がH⁺を受け取って炭酸を経てCO₂になり、呼気から排出される過程を指すが、この反応は酸化還元ではない。㋑のヘモグロビンや血清アルブミンも緩衝に寄与する。",
    "choiceExplanations": {
      "ア": "公式正答の㋐は、HCO₃⁻がH⁺を受け取って炭酸を経てCO₂になり、呼気から排出される過程を指すが、この反応は酸化還元ではない。㋑のヘモグロビンや血清アルブミンも緩衝に寄与する。",
      "イ": "㋐のCO₂の生成は、重炭酸イオンによる酸塩基の緩衝反応である。電子伝達系はH⁺をマトリックスから膜間腔へ輸送するため、㋒の向きは逆である。",
      "ウ": "リソソームの加水分解酵素は、より酸性のエンドソームでマンノース6-リン酸受容体から解離する。COPⅡ小胞は主に小胞体からゴルジ体への輸送を担う。",
      "エ": "㋑の血液タンパク質はH⁺を受け渡しして緩衝に寄与する。呼吸鎖がH⁺をくみ出すことで、マトリックスは膜間腔に比べてアルカリ性側に傾く。",
      "オ": "呼吸鎖によるH⁺の輸送はマトリックスから膜間腔へ向かう。エンドソームでの酵素の受容体からの解離には、エンドソーム内腔の酸性化が関わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q074",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "RNAの結合とステムループによる転写終結",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "RNAの構造と機能に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「一本鎖RNA分子は、ヌクレオチドが［㋐］結合でつながった直鎖状の重合体である。分子内に二つの相補的な配列が近接して存在すると［㋑］と呼ばれる構造をとる。この構造は、細菌の転写終結因子であるρ［㋒］型の転写終結において特に重要な役割を果たす。」",
    "choices": {
      "ア": "チオエステル ／ シュードノット ／ 依存",
      "イ": "チオエステル ／ ステムループ ／ 非依存",
      "ウ": "ホスホジエステル ／ シュードノット ／ 依存",
      "エ": "ホスホジエステル ／ ステムループ ／ 依存",
      "オ": "ホスホジエステル ／ ステムループ ／ 非依存"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "RNAの骨格ではヌクレオチドがホスホジエステル結合でつながる。相補的な領域が作るステムループは、細菌のρ非依存型転写終結で重要である。",
    "choiceExplanations": {
      "ア": "RNAの主鎖はチオエステル結合ではなく、リン酸を介したホスホジエステル結合でつながる。近接する相補配列の塩基対形成でステムループができる。",
      "イ": "ステムループとρ非依存という組合せは正しい。ヌクレオチドをつなぐのはホスホジエステル結合である。",
      "ウ": "リン酸を介する共有結合は合っている。近接した相補配列によるヘアピン状構造はステムループであり、細菌のρ非依存型終結で働く。",
      "エ": "ホスホジエステル結合とステムループは妥当である。RNA自体の構造が終結に働く型は、ρ因子に依存しない。",
      "オ": "RNAの骨格ではヌクレオチドがホスホジエステル結合でつながる。相補的な領域が作るステムループは、細菌のρ非依存型転写終結で重要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q075",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "ウイルス粒子の構造とゲノム",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "真核生物に感染するウイルスのゲノムに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．エンベロープがあるウイルスのゲノムは、タンパク質のエンベロープと、その外側にある脂質二重層のカプシドから成る二つの構造体に包まれる。\n㋑．ウイルスのゲノムはDNA 又はRNA から成り、インフルエンザウイルスは一本鎖RNA から成るゲノムをもつ。\n㋒．ゲノム1 Mb 当たりに換算した平均遺伝子数をウイルスとヒトで比較すると、一般にウイルスの方が多い。\n㋓．DNA ウイルスのゲノムDNA の合成は主に細胞質で、RNA ウイルスのゲノムRNA の合成は主に核で行われる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "インフルエンザウイルスのゲノムは一本鎖RNAである。ウイルスのゲノムは一般に小さく、ヒトゲノムよりも単位長さ当たりの遺伝子数が多い。",
    "choiceExplanations": {
      "ア": "インフルエンザウイルスがRNAゲノムを持つ点は妥当である。カプシドはタンパク質から成り、その外側に脂質二重層のエンベロープがある。",
      "イ": "遺伝子密度がヒトより高いという㋒は一般に妥当である。㋐はタンパク質のカプシドと、脂質二重層のエンベロープを逆にしている。",
      "ウ": "インフルエンザウイルスのゲノムは一本鎖RNAである。ウイルスのゲノムは一般に小さく、ヒトゲノムよりも単位長さ当たりの遺伝子数が多い。",
      "エ": "インフルエンザウイルスが一本鎖RNAを持つ点は合っている。一般には多くのDNAウイルスの複製は核内で、多くのRNAウイルスの複製は細胞質で行われる。",
      "オ": "㋒のゲノムの遺伝子密度に関する傾向は正しい。㋓は、多くのDNAウイルスとRNAウイルスの増殖における核と細胞質の役割を逆にしている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q076",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "真核生物のRNAポリメラーゼ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "RNAポリメラーゼに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「真核生物のRNAポリメラーゼであるPolⅠ、PolⅡ、PolⅢは、存在部位や転写産物が異なる。これらのRNAポリメラーゼは核内に存在し、［㋐］は核小体で、他の二つは核質で働く。また、mRNAの前駆体の合成にはPolⅡが、rRNAの合成には［㋑］とPolⅢが、tRNAの合成には［㋒］が関与する。」",
    "choices": {
      "ア": "PolⅠ ／ PolⅠ ／ PolⅢ",
      "イ": "PolⅠ ／ PolⅡ ／ PolⅠ",
      "ウ": "PolⅢ ／ PolⅠ ／ PolⅠ",
      "エ": "PolⅢ ／ PolⅠ ／ PolⅢ",
      "オ": "PolⅢ ／ PolⅡ ／ PolⅢ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "PolⅠは核小体で大部分のrRNAの前駆体を合成する。PolⅢは5S rRNAとtRNAなどを合成し、PolⅡは主にmRNAの前駆体を合成する。",
    "choiceExplanations": {
      "ア": "PolⅠは核小体で大部分のrRNAの前駆体を合成する。PolⅢは5S rRNAとtRNAなどを合成し、PolⅡは主にmRNAの前駆体を合成する。",
      "イ": "核小体で働くPolⅠは合っている。大部分のrRNAの前駆体にもPolⅠが、tRNAにはPolⅢが関与する。",
      "ウ": "rRNAの一部をPolⅠが合成する点は合っている。核小体で働くのもPolⅠであり、tRNAを転写するのはPolⅢである。",
      "エ": "rRNAの前駆体にPolⅠが、tRNAにPolⅢが関わる点は妥当である。核小体で主に働く㋐はPolⅢではなくPolⅠである。",
      "オ": "tRNAを合成するPolⅢは正しい。核小体でrRNAの前駆体を作る酵素はPolⅠであり、PolⅡは主にmRNAの前駆体を作る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q077",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "ワインの発酵・貴腐・マロラクティック発酵",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ワインに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．ワインの発酵形式は、糖化と発酵が別々の工程であることから単行複発酵と呼ばれる。\n㋑．一般に、赤ワインでは果皮や種子と共に果汁を発酵させ、白ワインでは果汁のみを発酵させる。\n㋒．貴腐ワインでは、カビの一種が果皮に生育し糖分が濃縮したブドウを原料として使用する。\n㋓．赤ワインの貯蔵中に酵母が生育することにより、マロラクティック発酵が起こり、リンゴ酸が減少する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "赤ワインは一般に果皮や種子も一緒に発酵させ、白ワインは通常、果汁を分離して発酵させる。貴腐ワインには、果皮にカビが生育して糖分が濃縮したブドウを用いる。",
    "choiceExplanations": {
      "ア": "赤ワインは一般に果皮などとともに発酵させる。ワインでは果汁中にすでに糖があり、デンプンの糖化を伴わない単発酵である。",
      "イ": "貴腐ブドウでは果皮にカビが生育し、水分が失われて糖分が濃縮する。ぶどう果汁は発酵性の糖を含むため、ワインの発酵は単発酵である。",
      "ウ": "ワインでは果汁に含まれる糖がそのまま発酵に使われる。リンゴ酸を減らすマロラクティック発酵を担うのは主に乳酸菌である。",
      "エ": "赤ワインは一般に果皮や種子も一緒に発酵させ、白ワインは通常、果汁を分離して発酵させる。貴腐ワインには、果皮にカビが生育して糖分が濃縮したブドウを用いる。",
      "オ": "赤と白の一般的な醸造の違いを述べた㋑は妥当である。マロラクティック発酵でリンゴ酸を乳酸に変える主な微生物は、酵母ではなく乳酸菌である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q078",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "メタン発酵とメタン生成古細菌",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "微生物によるメタン発酵に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．メタン発酵は、有機物からの酸生成と生成した酸からのメタン生成を、同じ微生物群が行う。\n㋑．メタン生成は、嫌気的な環境下で古細菌だけにみられる代謝機能である。\n㋒．メタン生成菌が利用できる基質は、メタノール、ギ酸、水素・二酸化炭素など限定されている。\n㋓．メタン生成菌では、解糖系における基質レベルのリン酸化によるATP 生成が行われている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "メタン生成は嫌気的な条件で一部の古細菌が行う。利用する基質は系統によって異なるが、水素と二酸化炭素、ギ酸、メタノールなどに限られる。",
    "choiceExplanations": {
      "ア": "メタンを生成する代謝を行うのは嫌気性の古細菌である。有機物から有機酸を作る段階には、別の微生物群が関わる。",
      "イ": "メタン生成菌が利用できる基質が限られるという㋒は妥当である。発酵槽全体では有機酸を作る微生物と、メタンを生成する微生物が分担している。",
      "ウ": "メタン生成は嫌気的な条件で一部の古細菌が行う。利用する基質は系統によって異なるが、水素と二酸化炭素、ギ酸、メタノールなどに限られる。",
      "エ": "メタンを生成する古細菌についての㋑は正しい。典型的なメタン生成菌は解糖系の基質レベルのリン酸化ではなく、膜を隔てたイオン勾配を利用してATPを作る。",
      "オ": "メタン生成菌の基質を述べた㋒は妥当である。メタン生成によるエネルギー保存を解糖系での基質レベルのリン酸化とする㋓は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q079",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "マクロライド系抗生物質と二次代謝",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "抗生物質に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「抗生物質のうち、エリスロマイシンやオレアンドマイシンなどは［㋐］系抗生物質と呼ばれ、これらの微生物に対する作用機構は［㋑］合成阻害である。抗生物質は［㋒］代謝産物であり、一般に、菌体の増殖に遅れて生産されることが多い。」",
    "choices": {
      "ア": "β-ラクタム ／ 細胞壁 ／ 一次",
      "イ": "β-ラクタム ／ タンパク質 ／ 二次",
      "ウ": "マクロライド ／ 細胞壁 ／ 一次",
      "エ": "マクロライド ／ 細胞壁 ／ 二次",
      "オ": "マクロライド ／ タンパク質 ／ 二次"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "エリスロマイシンなどのマクロライドは細菌のリボソームに作用してタンパク質合成を阻害する。抗生物質の多くは、活発な増殖の段階より後に作られる二次代謝産物である。",
    "choiceExplanations": {
      "ア": "β-ラクタム系の代表的な作用は細胞壁合成阻害である。本文の二つの薬はマクロライド系で、タンパク質合成を阻害する。",
      "イ": "タンパク質合成を阻害する点と、二次代謝産物という分類は合っている。エリスロマイシンなどはマクロライド系である。",
      "ウ": "マクロライド系という分類は妥当である。これらの薬はリボソームに作用し、抗生物質は一般に二次代謝産物に分類される。",
      "エ": "マクロライド系と二次代謝産物という分類は合っている。作用点は細菌のリボソームであり、細胞壁の合成を阻害する薬ではない。",
      "オ": "エリスロマイシンなどのマクロライドは細菌のリボソームに作用してタンパク質合成を阻害する。抗生物質の多くは、活発な増殖の段階より後に作られる二次代謝産物である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q080",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "DNAのゲル電気泳動",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "DNA の電気泳動に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．パルスフィールドゲル電気泳動法では、1 Mbp 以上の大きさのDNA の分離が可能である。\n㋑．アガロースゲル電気泳動法では、二本鎖DNA の荷電を利用してプラス極側からマイナス極側の方向に泳動する。\n㋒．同じ大きさのプラスミドDNA を、電気泳動により開環状DNA、閉環状DNA、直鎖状 DNA に分離するとき、最も泳動距離が長いのは閉環状DNA である。\n㋓．泳動により分離されたDNA は、赤外線照射下で強い蛍光を発する臭化エチジウムを利用して検出できる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "パルスフィールド法では、電場の方向を変えることで通常のゲルでは分離しにくい大きなDNAを分離できる。同じ長さのプラスミドDNAでは、通常、コンパクトな超らせん状の閉環状DNAが遠くまで移動する。",
    "choiceExplanations": {
      "ア": "大きなDNAの分離にパルスフィールドゲル電気泳動を用いる点は妥当である。DNAはリン酸基により負に帯電し、正極側へ移動する。",
      "イ": "パルスフィールド法では、電場の方向を変えることで通常のゲルでは分離しにくい大きなDNAを分離できる。同じ長さのプラスミドDNAでは、通常、コンパクトな超らせん状の閉環状DNAが遠くまで移動する。",
      "ウ": "大きなDNAの分離に関する㋐は正しい。臭化エチジウムで染色したDNAの検出には通常、紫外線照射により励起される蛍光を用いる。",
      "エ": "閉環状の超らせんDNAは、一般的な条件で開環状DNAなどより遠くまで移動する。負に帯電したDNAの移動方向を正極から負極としている㋑は誤りである。",
      "オ": "DNAは負極側から正極側へ移動する。臭化エチジウムで染色したDNAは、通常、赤外線ではなく紫外線で励起して検出する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q081",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "ブルー・ホワイトセレクションと蛍光タンパク質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝子導入実験に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「大腸菌でのクローニングの際に利用されるブルー・ホワイトセレクションでは、プラスミドDNAに含まれるlacZ遺伝子内部に目的DNAフラグメントが挿入された場合に［㋐］活性がなくなり、コロニーが［㋑］になることを利用している。また、哺乳動物細胞に蛍光タンパク質の遺伝子を導入し、その蛍光を利用してクローニングすることも可能であり、最も汎用される緑色蛍光タンパク質GFPは［㋒］に由来する。」",
    "choices": {
      "ア": "α-アミラーゼ ／ 青色 ／ ホタル",
      "イ": "α-アミラーゼ ／ 白色 ／ オワンクラゲ",
      "ウ": "β-ガラクトシダーゼ ／ 青色 ／ オワンクラゲ",
      "エ": "β-ガラクトシダーゼ ／ 青色 ／ ホタル",
      "オ": "β-ガラクトシダーゼ ／ 白色 ／ オワンクラゲ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "lacZの働きが失われると、β-ガラクトシダーゼによる発色が起こらずコロニーは白色になる。GFPはオワンクラゲから発見された緑色蛍光タンパク質である。",
    "choiceExplanations": {
      "ア": "lacZの機能に関わる酵素はβ-ガラクトシダーゼである。この酵素活性が失われると青色の発色が起こらず、GFPの由来もホタルではない。",
      "イ": "活性が失われると白色になり、GFPがオワンクラゲに由来する点は妥当である。lacZが関わる酵素はα-アミラーゼではない。",
      "ウ": "酵素とGFPの由来は合っている。青色に発色するのはβ-ガラクトシダーゼの活性がある場合で、設問では活性が失われている。",
      "エ": "酵素の名称は合っている。活性を失ったコロニーは白色で、代表的なGFPはオワンクラゲに由来する。",
      "オ": "lacZの働きが失われると、β-ガラクトシダーゼによる発色が起こらずコロニーは白色になる。GFPはオワンクラゲから発見された緑色蛍光タンパク質である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q082",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "放射性同位体の放出線と検出法",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生命科学実験に利用される放射性同位体（RI）に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ RIから放出されるα線、β線、γ線のうち、γ線は最も組織透過性が高い。\n㋑ 液体シンチレーションカウンターでは、β線を放出するRIを測定可能である。\n㋒ RI元素である³H、¹⁴C、³²Pは、α線を放出する。\n㋓ オートラジオグラフィーは、放射線による気体の電離を測定する方法である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "一般に、γ線はα線やβ線より組織に対する透過性が高い。液体シンチレーションでは、β線などが液体中で起こす微弱な発光を検出できる。",
    "choiceExplanations": {
      "ア": "一般に、γ線はα線やβ線より組織に対する透過性が高い。液体シンチレーションでは、β線などが液体中で起こす微弱な発光を検出できる。",
      "イ": "γ線は一般に高い透過性を示す。³H、¹⁴C、³²Pはいずれもβ⁻線を放出する核種である。",
      "ウ": "液体シンチレーションによってβ線を測定する点は妥当である。挙げられた核種はα線を放出するのではなく、β⁻崩壊する。",
      "エ": "液体シンチレーションによるβ線の測定は妥当である。オートラジオグラフィーでは、フィルムなどに放射線の分布を画像として記録する。",
      "オ": "列挙された核種はβ⁻線を放出する。オートラジオグラフィーは気体の電離の測定ではなく、放射性物質の分布を画像にする方法である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q083",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "カエル胚の原腸形成と胚葉誘導",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "カエル胚の初期発生過程に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．灰色三日月環の領域の細胞集団は、胚内部に移動して将来の背側構造を形成する。\n㋑．原口背唇部を構成し最初に胚内部に移動する細胞群は、予定咽頭内胚葉である。\n㋒．予定内胚葉の細胞は、隣接する予定外胚葉の細胞の働きにより、中胚葉へと分化する。\n㋓．アクチビンは、高濃度で表皮を誘導し、低濃度で脊索を誘導する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "灰色三日月環は将来の背側を示し、その領域に原口背唇が形成される。原腸形成の初期には、将来の咽頭内胚葉となる細胞が背唇から内部へ移動する。",
    "choiceExplanations": {
      "ア": "灰色三日月環は将来の背側を示し、その領域に原口背唇が形成される。原腸形成の初期には、将来の咽頭内胚葉となる細胞が背唇から内部へ移動する。",
      "イ": "背側構造に関する㋐は妥当である。中胚葉誘導の古典的な説明では、予定内胚葉側のシグナルが周辺の予定領域に働き、中胚葉の分化を誘導する。",
      "ウ": "㋐の灰色三日月環は将来の背側に対応する。アクチビンによる胚細胞の分化では、高い濃度で背側中胚葉系などの運命が誘導され得る。",
      "エ": "原口背唇から初期に内部へ入る細胞に関する㋑は妥当である。㋒は中胚葉を誘導する側と誘導を受ける側の関係を取り違えている。",
      "オ": "中胚葉誘導には予定内胚葉側からのシグナルが関わる。アクチビンでは高濃度ほど表皮が誘導されるという㋓の説明も誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q084",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "発生生物学に関するノーベル生理学・医学賞",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "発生学領域と関連のあるノーベル生理学・医学賞受賞者について、各研究者の受賞内容に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．エドワード・B・ルイス：ゼブラフィッシュ胚から相同性の高い塩基配列をもったホメオティック遺伝子群を発見した。\n㋑．シドニー・ブレナー：ショウジョウバエの胚発生過程において遺伝的に制御された細胞死であるアポトーシスを発見した。\n㋒．マリオ・R・カペッキ：遺伝子の相同組換え技術を発展させ、特異的なノックアウトマウスの作製法を確立した。\n㋓．ジョン・B・ガードン：カエルの小腸由来の核を用いて、成熟した細胞由来の核における分化全能性を証明した。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "カペッキらは相同組換えを利用して、マウスの特定遺伝子を改変する技術を確立した。ガードンは、分化したカエルの細胞の核にも個体発生を支える情報が残ることを示した。",
    "choiceExplanations": {
      "ア": "ルイスはショウジョウバエの体節の運命を決める遺伝子群を研究した。ブレナーらの発生と細胞死に関する研究のモデルは、線虫のC. elegansである。",
      "イ": "カペッキの遺伝子標的化への貢献を述べた㋒は妥当である。㋐のルイスが研究したモデルはゼブラフィッシュではなくショウジョウバエである。",
      "ウ": "ガードンが分化したカエル細胞の核の発生能力を示したことは正しい。ルイスが用いたモデルはショウジョウバエである。",
      "エ": "ガードンに関する㋓は妥当である。ブレナーの受賞につながったのは、線虫を用いた器官発生やプログラム細胞死の研究である。",
      "オ": "カペッキらは相同組換えを利用して、マウスの特定遺伝子を改変する技術を確立した。ガードンは、分化したカエルの細胞の核にも個体発生を支える情報が残ることを示した。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q085",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "胚発生のシグナル伝達経路",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "脊椎動物の胚発生には、様々なシグナル因子が重要な役割を担っている。各因子のシグナル伝達経路のリガンド、受容体、胚発生における機能の組合せ㋐～㋓のうち、妥当なもののみを挙げているのはどれか。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Delta-likeはNotchに結合し、内皮細胞の分化などを制御する。WntはFrizzledを受容体として、胚の背腹軸の形成などに関わる。",
    "choiceExplanations": {
      "ア": "Delta-likeとNotchによる血管内皮の分化制御は妥当である。胚の外胚葉の神経分化には一般にBMPシグナルの抑制が関与する。",
      "イ": "Delta-likeはNotchに結合し、内皮細胞の分化などを制御する。WntはFrizzledを受容体として、胚の背腹軸の形成などに関わる。",
      "ウ": "㋐の受容体とリガンドの組合せは正しい。Patchedは主にHedgehogの受容体であり、Nodalの受容体とする㋓は誤りである。",
      "エ": "㋒のWntとFrizzledは妥当である。BMPによって外胚葉からの神経分化が誘導されるとする説明は妥当でない。",
      "オ": "外胚葉の神経分化にはBMPシグナルの抑制が関係する。NodalはTGF-βスーパーファミリーのシグナルであり、Patchedが受容体となる経路ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q085.webp"
    ],
    "imageAltTexts": [
      "発生シグナルのリガンド、受容体及び胚発生での機能の組合せ表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q086",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "エクリン汗腺とアポクリン汗腺",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトにおける汗腺及び発汗に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．エクリン汗腺は交感神経の支配を受け、アセチルコリンにより汗分泌が調節されている。\n㋑．アポクリン汗腺はほぼ全身の皮膚に分布し、皮膚表面に汗孔として開口する。\n㋒．温熱性発汗とは、暑いときや運動時などにみられる熱放散のためのアポクリン汗腺からの発汗である。\n㋓．精神（感情）性発汗とは、極度の緊張時にみられる手掌や足底からの発汗であり、主にエクリン汗腺が関与する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "エクリン汗腺の汗分泌には、交感神経から放出されるアセチルコリンが作用する。緊張したときの手掌や足底の発汗も主にエクリン汗腺が担う。",
    "choiceExplanations": {
      "ア": "エクリン汗腺の交感神経支配ではアセチルコリンが分泌の調節を担う。アポクリン汗腺の分布は腋窩などに限られ、主に毛包に開口する。",
      "イ": "エクリン汗腺の神経性調節を述べた㋐は正しい。体温を下げるための発汗も、主にエクリン汗腺による。",
      "ウ": "エクリン汗腺の汗分泌には、交感神経から放出されるアセチルコリンが作用する。緊張したときの手掌や足底の発汗も主にエクリン汗腺が担う。",
      "エ": "アポクリン汗腺は全身に広く分布するわけではなく、主に毛包に開く。体温調節に関わる温熱性発汗は主にエクリン汗腺から起こる。",
      "オ": "手掌や足底の精神性発汗がエクリン汗腺による点は妥当である。㋑は全身の分布や皮膚表面の汗孔への開口をアポクリン汗腺の特徴としている点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q087",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "血糖上昇に応答するインスリン分泌",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの血糖値上昇によるインスリン分泌機構に関する記述のうち、最も妥当なのはどれか。",
    "choices": {
      "ア": "血糖値が上昇すると、血中のグルコースはグルコース輸送体4（GLUT4）により膵β細胞内に取り込まれて解糖系やクエン酸回路で代謝を受け、その結果ATPが産生される。",
      "イ": "膵β細胞内でATPが増大すると、通常は閉じているATP感受性K⁺チャネルが開口して細胞膜の脱分極が惹起される。",
      "ウ": "膵β細胞の細胞膜脱分極により電位依存性Na⁺チャネルが開口して細胞外からのNa⁺流入が生じる。これが引き金となり、インスリンが分泌される。",
      "エ": "インスリンは、21個のアミノ酸残基から成るA鎖と、30個のアミノ酸残基から成るB鎖が2か所のエステル結合で架橋されたペプチドホルモンである。",
      "オ": "小腸から分泌されるインクレチンは、インクレチン受容体を介した膵β細胞内のcAMP濃度上昇により、インスリン分泌を促進する。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "消化管から分泌されるインクレチンが膵β細胞の受容体を刺激すると、細胞内のcAMPが増加する。このシグナルは血糖に応じたインスリン分泌を増強する。",
    "choiceExplanations": {
      "ア": "ヒトの膵β細胞のグルコース取り込みには主にGLUT1やGLUT3が関わる。GLUT4は骨格筋や脂肪組織などでインスリンに応答する輸送体である。",
      "イ": "グルコースの代謝でATPが増えると、ATP感受性K⁺チャネルは閉じる。K⁺の流出が減る結果、細胞膜が脱分極する。",
      "ウ": "膜の脱分極により開く電位依存性Ca²⁺チャネルが分泌に重要である。細胞内のCa²⁺濃度が上がるとインスリンを含む顆粒が放出される。",
      "エ": "A鎖21残基とB鎖30残基という長さは正しい。二つの鎖はシステインの間のジスルフィド結合でつながっている。",
      "オ": "消化管から分泌されるインクレチンが膵β細胞の受容体を刺激すると、細胞内のcAMPが増加する。このシグナルは血糖に応じたインスリン分泌を増強する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q088",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "ストレス応答とコルチゾル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "コルチゾルに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ヒトにおいて身体的又は精神的なストレスは、視床下部からの［㋐］分泌を急激に増加させ、結果として血中コルチゾル濃度を上昇させる。また、こうしたストレスは交感神経を興奮させ、血中カテコールアミン濃度の上昇をもたらす。カテコールアミンは、血圧上昇や脂肪分解などを引き起こすが、これらの作用の発現にはコルチゾルの存在が必要である。このように、あるホルモンが効果を発揮するために他のホルモンの存在を必要とすることを［㋑］という。慢性的なコルチゾル過剰分泌状態である［㋒］は、特徴的な肥満、耐糖能異常、高血圧、骨粗鬆症などを来す。」",
    "choices": {
      "ア": "ACTH（副腎皮質刺激ホルモン） ／ 許容作用 ／ クッシング症候群",
      "イ": "ACTH（副腎皮質刺激ホルモン） ／ フィードバック ／ アジソン病",
      "ウ": "ACTH（副腎皮質刺激ホルモン） ／ フィードバック ／ クッシング症候群",
      "エ": "CRH（副腎皮質刺激ホルモン放出ホルモン） ／ 許容作用 ／ アジソン病",
      "オ": "CRH（副腎皮質刺激ホルモン放出ホルモン） ／ 許容作用 ／ クッシング症候群"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ストレスにより視床下部のCRHが増え、下垂体前葉のACTHを介してコルチゾル分泌が高まる。コルチゾルが他のホルモンの効果の発現を助けるのは許容作用で、慢性の過剰はクッシング症候群を起こす。",
    "choiceExplanations": {
      "ア": "許容作用とクッシング症候群は合っている。ACTHは下垂体前葉から分泌され、その分泌を促す視床下部ホルモンはCRHである。",
      "イ": "視床下部から分泌されるのはCRHである。アジソン病は原発性の副腎皮質機能低下症なので、コルチゾル過剰の状態には当てはまらない。",
      "ウ": "クッシング症候群はコルチゾル作用の過剰で起きる。視床下部からはCRHが分泌され、別のホルモンが存在して初めて作用を十分に示せる関係を許容作用という。",
      "エ": "視床下部のCRHと許容作用は合っている。コルチゾルが過剰な状態に当てはまるのはクッシング症候群である。",
      "オ": "ストレスにより視床下部のCRHが増え、下垂体前葉のACTHを介してコルチゾル分泌が高まる。コルチゾルが他のホルモンの効果の発現を助けるのは許容作用で、慢性の過剰はクッシング症候群を起こす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q089",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "生体膜の脂質の運動と核膜孔",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生体膜に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 細胞膜の基本構造は脂質二重層で、主にリン脂質や糖脂質から構成されているが、Ca²⁺、水等はこの脂質二重層を容易に透過する。\n㋑ ヒトの細胞膜にはコレステロールはほとんど含まれていない。コレステロールの含有率が膜総重量の約10％を超えると構造が不安定化する。\n㋒ 細胞膜の基本構造である脂質二重層は流動的で、膜を構成している脂質分子は側方には容易に移動するが、一方の層ともう一方の層の間の移動は限定的である。\n㋓ 真核細胞の核膜の基本構造は細胞膜と同じであるが、核膜にはヌクレオポリンなどの固有の膜タンパク質が存在している。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "脂質は同じ層の中を移動しやすい一方、極性の頭部が二重層の疎水性内部を横切る層間移動は起こりにくい。核膜には、核膜孔複合体を構成するヌクレオポリンがある。",
    "choiceExplanations": {
      "ア": "Ca²⁺などのイオンは、疎水性の高い脂質二重層を容易には通れない。コレステロールはヒトの細胞膜に含まれ、その流動性などに影響する。",
      "イ": "脂質の側方移動が容易という㋒は妥当である。Ca²⁺のような荷電したイオンが膜を通るときは、チャネルなどの膜タンパク質が関わる。",
      "ウ": "脂質分子の側方拡散は速く、自発的な層間移動は一般に遅い。ヒトの細胞膜にはコレステロールが相当量含まれる。",
      "エ": "核膜孔複合体を成すヌクレオポリンについての㋓は妥当である。コレステロールはヒトの細胞膜の主要な脂質の一つである。",
      "オ": "脂質は同じ層の中を移動しやすい一方、極性の頭部が二重層の疎水性内部を横切る層間移動は起こりにくい。核膜には、核膜孔複合体を構成するヌクレオポリンがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q090",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "タンパク質の細胞内輸送",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "真核細胞の細胞内の物質輸送に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．小胞体シグナル配列をもつタンパク質は、細胞質のリボソームで合成され小胞体に取り込まれる。正しく折りたたまれなかったタンパク質は細胞質に戻され、分解される。\n㋑．ミトコンドリア内で機能する大部分のタンパク質は、細胞質のリボソームで合成され小胞体に取り込まれ、輸送小胞によりミトコンドリア内に輸送される。\n㋒．核内で機能するタンパク質は細胞質のリボソームで合成され、その核局在化シグナルによりインポーチンと結合し、核膜孔を通って核内に輸送される。\n㋓．細胞膜の膜貫通型タンパク質は、小胞体には取り込まれず、細胞膜の内側表面に結合しているリボソームによって合成されて細胞膜に挿入される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "小胞体の品質管理では、不良タンパク質を細胞質側へ戻して分解する経路がある。核局在化シグナルを持つタンパク質はインポーチンなどを介し、核膜孔を通って核に入る。",
    "choiceExplanations": {
      "ア": "小胞体で正しく折りたたまれなかったタンパク質は細胞質側に移され、分解されることがある。多くのミトコンドリアタンパク質は、小胞体を経ずに細胞質から取り込まれる。",
      "イ": "小胞体の品質管理では、不良タンパク質を細胞質側へ戻して分解する経路がある。核局在化シグナルを持つタンパク質はインポーチンなどを介し、核膜孔を通って核に入る。",
      "ウ": "核への輸送を述べた㋒は正しい。多くのミトコンドリアタンパク質は、移行シグナルなどを認識するミトコンドリア膜の装置で直接取り込まれる。",
      "エ": "ミトコンドリアへのタンパク質輸送は一般に小胞を介さない。細胞膜の多くの膜貫通タンパク質は小胞体膜に挿入され、ゴルジ体などを経由して細胞膜へ運ばれる。",
      "オ": "核局在化シグナルによる㋒の輸送は妥当である。膜貫通タンパク質の多くは小胞体に結合したリボソームで合成され、細胞膜へ輸送される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q091",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "アポトーシスの誘導と死細胞の除去",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "アポトーシスに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．マウスの発生段階において、指の間の不要な細胞は、アポトーシスによって除去される。\n㋑．Fas リガンドが受容体と結合しリン酸化カスケードが活性化されると、ミトコンドリアからカスパーゼが放出されてアポトーシスが起こる。\n㋒．p53は、核内DNA の損傷が修復できない場合、アポトーシスを誘導する。\n㋓．アポトーシスが起こると、隣接する細胞がそれを感知してカスパーゼを分泌し、アポトーシスを起こした細胞を分解するため、炎症反応が起こらない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "発生において、アポトーシスはマウスの指の間の不要な細胞を除く。p53はDNA損傷に応答し、修復できないときは細胞死の誘導に関与する。",
    "choiceExplanations": {
      "ア": "発生中の指の間の細胞はアポトーシスで除かれる。Fasシグナルは受容体にアダプターを集め、カスパーゼを活性化する。",
      "イ": "発生において、アポトーシスはマウスの指の間の不要な細胞を除く。p53はDNA損傷に応答し、修復できないときは細胞死の誘導に関与する。",
      "ウ": "p53が重度のDNA損傷に応答してアポトーシスを誘導することは妥当である。ミトコンドリアから放出される代表的な因子はシトクロムcであり、カスパーゼではない。",
      "エ": "Fas受容体のシグナルではカスパーゼが細胞内で活性化される。死細胞は貪食で除去され、隣接細胞から分泌されたカスパーゼで消化されるという説明は誤りである。",
      "オ": "p53はDNAに重い損傷がある場合にアポトーシスを誘導し得る。細胞の残骸は一般にマクロファージなどの貪食で除かれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q092",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "胃腺の細胞と分泌物",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの胃に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．粘液を分泌して胃粘膜を保護する胃腺には、胃底腺、幽門腺、噴門腺の3種類がある。\n㋑．G 細胞は、胃酸分泌を促進するガストリンを血中に分泌する。\n㋒．壁細胞は、噴門腺の腺底部に分布し胃酸を分泌する。\n㋓．副細胞が分泌するペプシノーゲンは、胃酸に触れるとタンパク質分解酵素ペプシンに変化する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "胃腺は主に胃底腺、幽門腺、噴門腺に分けられ、胃腺の粘液細胞は胃粘膜の保護に関与する。G細胞が分泌するガストリンは胃酸分泌を促す。",
    "choiceExplanations": {
      "ア": "胃腺は主に胃底腺、幽門腺、噴門腺に分けられ、胃腺の粘液細胞は胃粘膜の保護に関与する。G細胞が分泌するガストリンは胃酸分泌を促す。",
      "イ": "胃腺の分類は妥当である。ペプシノーゲンは主細胞が分泌し、副細胞は粘液を分泌する。",
      "ウ": "ガストリンを分泌するG細胞についての説明は正しい。胃酸を分泌する壁細胞は主に胃底腺に分布する。",
      "エ": "胃酸分泌を促すガストリンはG細胞から分泌される。ペプシノーゲンを出すのは主細胞であり、副細胞ではない。",
      "オ": "胃酸を分泌する壁細胞は主に胃底腺に、ペプシノーゲンを分泌する主細胞も胃底腺に分布する。㋒は分布、㋓は細胞の種類を取り違えている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q093",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "放射能・吸収線量・線量当量の単位",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射線に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．放射能とは放射線そのものの強さを示すもので、単位はレントゲン（R）である。\n㋑．吸収線量とは照射された対象へのエネルギー付与の程度を示すもので、単位はグレイ（Gy）である。\n㋒．照射線量とは単位面積当たりの透過する放射線数を示すもので、単位はベクレル（Bq）である。\n㋓．線量当量とは放射線が人体に及ぼす影響の程度を示すもので、単位はシーベルト（Sv）である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "吸収線量は単位質量当たりの吸収エネルギーで、単位はGyである。線量当量には放射線の種類などによる影響の違いが考慮され、単位はSvである。",
    "choiceExplanations": {
      "ア": "吸収線量の単位がGyであることは妥当である。放射能は単位時間当たりの壊変数で表し、SI単位はBqである。",
      "イ": "放射能は壊変率を表す量である。照射線量は空気中の電離によって生じる電荷量を用いて表し、単位面積を通過した放射線の数ではない。",
      "ウ": "吸収線量は物質の単位質量に吸収されたエネルギーである。Bqは放射能の単位で、照射線量の単位ではない。",
      "エ": "吸収線量は単位質量当たりの吸収エネルギーで、単位はGyである。線量当量には放射線の種類などによる影響の違いが考慮され、単位はSvである。",
      "オ": "線量当量の単位がSvであることは正しい。照射線量はX線やγ線などが空気を電離して生じる電荷の量を基準にし、SI単位はC/kgである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q094",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "内部被ばくの有効半減期と全身被ばく",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射線の人体への影響に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．体内に取り込まれた放射性核種による内部被ばくの線量の減少率は、核種の物理学的半減期と生物学的半減期から算出される有効半減期で決まる。\n㋑．日本人の年間平均被ばく線量において、大気中の放射性核種の吸入による被ばくは、医療放射線による被ばくよりも大きい。\n㋒．放射線に全身被ばくすると引き起こされる急性死は、線量の低い方から順に骨髄死、消化管死、中枢神経死である。\n㋓．放射線被ばくによる変化が次世代に遺伝する放射線影響は、原爆被爆者集団の疫学調査で確認されている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "内部被ばくの線量率の低下には核種の壊変と生物学的排出が関わり、有効半減期には両方を含める。急性の全身被ばくでは、線量が高いほど骨髄、消化管、中枢神経の順に主な致死的障害が現れる。",
    "choiceExplanations": {
      "ア": "物理学的な壊変と体外への排出の両方があるので、体内に残る核種の量は有効半減期に従う。日本の平均では放射性核種の吸入による被ばくより医療被ばくの方が大きい。",
      "イ": "内部被ばくの線量率の低下には核種の壊変と生物学的排出が関わり、有効半減期には両方を含める。急性の全身被ばくでは、線量が高いほど骨髄、消化管、中枢神経の順に主な致死的障害が現れる。",
      "ウ": "全身被ばくの線量に応じて、造血器、消化管、中枢神経の順に致死的障害が現れるという㋒は妥当である。日本人の平均で医療被ばくを大気からの吸入被ばくより小さいとする㋑は誤りである。",
      "エ": "日本人の平均では医療による被ばくの寄与が比較的大きい。原爆被爆者の子に関する疫学調査では、被ばくに起因する遺伝的影響の増加は確認されていない。",
      "オ": "線量が増えるにつれ急性死の主な障害が変わるという㋒は妥当である。原爆被爆者の調査で次世代への影響が確認されたとする㋓は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q095",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "減数分裂の乗換えと不等交差",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "乗換えに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．乗換えは、第二分裂前期に形成される二価染色体で起きる。\n㋑．乗換えは、二価染色体を形成する4本の姉妹染色分体のうち2本の間でのみ生じる。\n㋒．不等交差は遺伝子の重複や欠失の原因になりやすい。\n㋓．同一染色体上に2か所以上のキアズマが形成されることはない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "㋑は二価染色体の二組の姉妹染色分体の計4本のうち、各乗換えに相同染色体間の非姉妹染色分体2本が関わることを指す。不等交差では一方に遺伝子の重複が、他方に欠失が生じ得る。",
    "choiceExplanations": {
      "ア": "二価染色体を形成する相同染色体が対合し乗換えをするのは、減数第一分裂の前期である。第二分裂前期とする㋐は誤りである。",
      "イ": "㋒の不等交差は、位置がずれてDNAが交換されることにより重複や欠失を生じさせる。㋐は第二分裂前期とする点が誤りである。",
      "ウ": "二価染色体が形成されるのは第一分裂前期である。一つの二価染色体に複数のキアズマが現れることもある。",
      "エ": "㋑は二価染色体の二組の姉妹染色分体の計4本のうち、各乗換えに相同染色体間の非姉妹染色分体2本が関わることを指す。不等交差では一方に遺伝子の重複が、他方に欠失が生じ得る。",
      "オ": "一回の乗換えには通常、相同染色体に属する非姉妹染色分体2本が関わる。同じ二価染色体上で複数回の乗換えが起きれば、複数のキアズマが形成される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q096",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "連鎖する2遺伝子とF₂の確率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある作物の品質を決める遺伝子座と病害耐性を決める遺伝子座が同一染色体上に座乗しており、その組換え価は1％であったとする。高品質・低病害耐性の純系品種と低品質・高病害耐性の純系品種を交配して得られるF₁個体が低品質・高病害耐性であったとき、このF₁個体どうしを交配して得られたF₂個体が高品質・高病害耐性となる確率はおよそいくらか。ただし、品質、病害耐性はそれぞれ単一の遺伝子座に支配されるものとする。",
    "choices": {
      "ア": "0.01％",
      "イ": "0.1％",
      "ウ": "0.5％",
      "エ": "1％",
      "オ": "5％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "高品質をa、高耐性をBとすると、F₁が作るaBは0.005、abは0.495である。F₂のaaのうち少なくとも一方がaBである確率は(0.005＋0.495)²−0.495²となり、約0.5％である。",
    "choiceExplanations": {
      "ア": "高品質と高耐性の対立遺伝子を持つ組換え配偶子は、両親から同時に受け取る必要はない。一方からそれを、もう一方から高品質・低耐性の配偶子を受け取っても目的の表現型になる。",
      "イ": "高品質をa、高耐性をBとすると、aB配偶子の割合は0.005、abは0.495である。aBとabの組合せは両親を入れ替えた場合も含めて2×0.005×0.495となる。",
      "ウ": "高品質をa、高耐性をBとすると、F₁が作るaBは0.005、abは0.495である。F₂のaaのうち少なくとも一方がaBである確率は(0.005＋0.495)²−0.495²となり、約0.5％である。",
      "エ": "1％は二種類の組換え配偶子を合わせた割合である。目的の表現型には高品質・高耐性の組換え配偶子が少なくとも一つと、もう一方から高品質の対立遺伝子が必要である。",
      "オ": "高品質・高耐性の組換え配偶子自体が全配偶子の0.5％であり、両親の両方を数えても約1％である。もう一方も高品質の対立遺伝子を持つ必要があるため、子の該当割合は約0.5％になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q097",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "X連鎖潜性形質の頻度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "伴性遺伝に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ヒトの色覚多型（赤緑色盲）はX染色体上の遺伝子座に支配される潜性（劣性）の形質で、ある集団では、女性の約400人に1人が色覚多型となる。この集団において、色覚多型の原因となる対立遺伝子の頻度は約［㋐］であり、性染色体が［㋑］の男性では約［㋒］人に1人が色覚多型となる。」",
    "choices": {
      "ア": "0.0025 ／ ヘミ接合 ／ 400",
      "イ": "0.0025 ／ ホモ接合 ／ 160000",
      "ウ": "0.05 ／ ヘミ接合 ／ 20",
      "エ": "0.05 ／ ヘミ接合 ／ 200",
      "オ": "0.05 ／ ホモ接合 ／ 400"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "集団の対立遺伝子頻度をqとし、女性の発現頻度をq²とすると、q＝√(1/400)＝0.05である。対象の座位がヘミ接合となる男性での発現頻度はqであり、約20人に1人である。",
    "choiceExplanations": {
      "ア": "1/400は女性の表現型の頻度であり、対立遺伝子の頻度の二乗に相当する。男性での頻度は平方根の1/20である。",
      "イ": "女性の頻度から対立遺伝子頻度を求めるには平方根を取る。男性では原因となるX染色体上の座位を一コピー持つため、ヘミ接合である。",
      "ウ": "集団の対立遺伝子頻度をqとし、女性の発現頻度をq²とすると、q＝√(1/400)＝0.05である。対象の座位がヘミ接合となる男性での発現頻度はqであり、約20人に1人である。",
      "エ": "頻度0.05とヘミ接合は妥当である。0.05は1/20なので、男性での発現は約200人に1人ではなく20人に1人である。",
      "オ": "対立遺伝子頻度0.05は妥当である。典型的なXYの男性は対象のX連鎖座位を一コピー持ち、表現型の頻度は0.05になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q098",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "ハプロ不全・多面発現・染色体転座",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ゲノムの変異・多型に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．ハプロ不全とは、機能喪失変異がヘテロ接合状態で顕性（優性）表現型を示すことである。\n㋑．多面発現（多面効果）とは、一つの形質が多数の多型に影響されることである。\n㋒．染色体の転座は、ダウン症候群の原因の一つである。\n㋓．イントロン内に生じた変異は、タンパク質の構造に変化を及ぼさない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ハプロ不全では、機能する対立遺伝子が一つだけでは必要な量に足りず、ヘテロ接合体で表現型が現れる。21番染色体の長腕などを含むロバートソン転座はダウン症候群の原因の一つになる。",
    "choiceExplanations": {
      "ア": "機能を持つ遺伝子が一コピーだけでは必要な働きを満たせないと、ヘテロ接合体でもハプロ不全の表現型を示す。多面発現は一つの遺伝子が複数の形質に影響することである。",
      "イ": "ハプロ不全では、機能する対立遺伝子が一つだけでは必要な量に足りず、ヘテロ接合体で表現型が現れる。21番染色体の長腕などを含むロバートソン転座はダウン症候群の原因の一つになる。",
      "ウ": "転座によって21番染色体の遺伝情報が余分になるとダウン症候群を生じ得る。㋑は多面発現でなく、一つの形質に複数の遺伝的要因が関わる場合を説明している。",
      "エ": "多面発現では一つの遺伝子が複数の形質に影響する。イントロンの変異でもスプライシングが変われば、タンパク質の構造に影響することがある。",
      "オ": "転座型のダウン症候群がある点は正しい。イントロンの変異がエクソンの選択などに影響すると、翻訳産物の構造も変わり得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q099",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "哺乳類の系統と収斂進化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "哺乳類の進化に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．真獣類のモモンガと有袋類のフクロモモンガの飛膜は、収斂（収束）進化の例である。\n㋑．胎盤は、哺乳類の全ての種が備えている特徴ではない。\n㋒．カモノハシなどの単孔類は、真獣類の一部の種から進化した。\n㋓．有袋類は、現在のオーストラリア大陸に当たる地域でのみ進化した。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "モモンガとフクロモモンガの飛膜は、異なる系統で滑空に適応して独立に生じた収斂進化の例である。単孔類は卵生で、胎盤を備えない。",
    "choiceExplanations": {
      "ア": "モモンガとフクロモモンガの飛膜は、異なる系統で滑空に適応して独立に生じた収斂進化の例である。単孔類は卵生で、胎盤を備えない。",
      "イ": "モモンガとフクロモモンガの飛膜についての㋐は妥当である。単孔類は真獣類とは早期に分岐した系統である。",
      "ウ": "胎盤を持たない哺乳類がいるという㋑は正しい。現生の真獣類の一部から単孔類が進化したという説明は系統関係と合わない。",
      "エ": "単孔類がいるため、胎盤は全ての哺乳類に共通の特徴ではない。有袋類の系統はオーストラリアの外でも進化し、現在もアメリカ大陸に有袋類が分布する。",
      "オ": "単孔類は真獣類から派生した系統ではない。有袋類の化石と現生種の分布からも、その進化がオーストラリアだけで起きたとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q100",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "安定化選択・負の選択・性選択",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "自然選択と性選択に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．ヒトの新生児で、極端に体重が小さい者や大きい者の死亡率が平均的な体重の者のそれよりも高いことは、方向性選択の例である。\n㋑．負の自然選択の結果、同義置換の率に比べて非同義置換の率が著しく低くなることが予想される。\n㋒．性選択で有利となる特徴が、個体の生存に不利に働くこともある。\n㋓．ホモ接合に比べてヘテロ接合の適応度が高い多型は、速やかに集団中で固定される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "負の選択では、タンパク質の機能を損なう非同義置換が集団に残りにくい。性選択で交配の機会を増やす特徴でも、維持の負担などで生存に不利になることがある。",
    "choiceExplanations": {
      "ア": "有害なアミノ酸置換が除かれるという㋑は妥当である。体重の両極端で不利になる㋐の例は、平均付近を有利にする安定化選択である。",
      "イ": "繁殖に有利な特徴が生存には不利となることはある。小さすぎる体重と大きすぎる体重の双方が不利なら、選択は一方向への変化を促すものではない。",
      "ウ": "負の選択では、タンパク質の機能を損なう非同義置換が集団に残りにくい。性選択で交配の機会を増やす特徴でも、維持の負担などで生存に不利になることがある。",
      "エ": "負の選択により非同義置換の率が下がるという㋑は正しい。ヘテロ接合体が有利な場合、対立遺伝子は集団中に維持されやすい。",
      "オ": "性選択に有利な形質が生存に不利となることはある。ヘテロ接合体が有利な多型は、一般にどちらか一方の対立遺伝子が直ちに固定されるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q101",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "海洋の補償深度・湧昇・元素組成",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "海洋生態学に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．植物プランクトンが光合成によって呼吸量を補償できる光量が到達する最大水深を、臨界深度という。\n㋑．湧昇域は、表層水がエクマン輸送によって沖側に移動することにより、中深層から栄養塩が供給されるために生産性の高い海域となる。\n㋒．好適な生育条件下における植物プランクトンなどの藻類の炭素、窒素、リンのモル比はほぼ一定の値になり、この比をレッドフィールド比という。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "沖向きのエクマン輸送を補う湧昇は、深い層から表層に栄養塩を供給し、生物生産を高める。海洋の植物プランクトンの代表的なC：N：Pモル比は約106：16：1である。",
    "choiceExplanations": {
      "ア": "ある深さで光合成量と呼吸量がつり合うのは補償深度である。臨界深度は、表層から積算した水柱全体の光合成と呼吸がつり合う深さを指す。",
      "イ": "湧昇によって中深層の栄養塩が浮上するという㋑は妥当である。㋐は局所的なつり合いを述べているので、臨界深度ではなく補償深度である。",
      "ウ": "炭素、窒素、リンの代表的な比をレッドフィールド比と呼ぶ㋒は妥当である。㋐の深さの名称は補償深度である。",
      "エ": "㋑の湧昇域の説明は正しい。植物プランクトンの平均的な元素組成を表すレッドフィールド比も妥当である。",
      "オ": "沖向きのエクマン輸送を補う湧昇は、深い層から表層に栄養塩を供給し、生物生産を高める。海洋の植物プランクトンの代表的なC：N：Pモル比は約106：16：1である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q102",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "暖かさの指数と日本のバイオーム",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "植生分布に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．月平均気温が5 ℃以上の月の月平均気温から5 ℃を引いたものの積算値を暖かさの指数と呼び、日本の植生の分布域を区別する場合に使われる。\n㋑．陸上の生物群集は、森林や疎林、草原、ツンドラなどの相観に大別でき、そのように区別される生物群集の単位を、バイオームという。\n㋒．日本のバイオームは、亜熱帯多雨林、照葉樹林、夏緑樹林、針葉樹林の四つに大別でき、代表樹種は、それぞれガジュマル、アラカシ、ブナ、エゾマツなどである。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "暖かさの指数は、月平均気温が5 ℃を超える月について5 ℃からの差を積算し、植生分布を考える指標である。㋑はバイオームの概要を、㋒は日本に見られる代表的な森林バイオームと樹種を示す。",
    "choiceExplanations": {
      "ア": "暖かさの指数とバイオームの説明は妥当である。日本の森林に見られる主なバイオームと代表樹種を示した㋒も妥当である。",
      "イ": "暖かさの指数は、月平均気温が5 ℃を超える月について5 ℃からの差を積算し、植生分布を考える指標である。㋑はバイオームの概要を、㋒は日本に見られる代表的な森林バイオームと樹種を示す。",
      "ウ": "暖かさの指数と代表樹種の対応は正しい。森林や草原などの相観による生物群集の区分を説明した㋑も妥当である。",
      "エ": "相観に基づくバイオームの説明は妥当である。暖かさの指数の算出法と日本の代表的森林の樹種の対応も妥当である。",
      "オ": "㋑と㋒は妥当である。㋐の暖かさの指数も、植生の分布と各地の熱量の関係を考える指標である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q103",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "血縁度・包括適応度・真社会性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "血縁選択に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．生物種にかかわらず、ある個体とその子との血縁度は、ある個体とその兄弟姉妹との血縁度と同じである。\n㋑．包括適応度は、ある個体が自分の子を残すことを通じた適応度と、さらにその子孫の適応度を合わせた適応度のことである。\n㋒．集団中に不妊カーストをもつ真社会性の生物は昆虫に限らず、哺乳類にも存在する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "哺乳類のハダカデバネズミなどにも、繁殖個体と通常は繁殖しない個体の分業を伴う真社会性がみられる。したがって、そのような社会構造は昆虫に限られない。",
    "choiceExplanations": {
      "ア": "血縁度は生物の性決定の方式や血縁関係によって変わる。半倍数性の種では、同じ両親から生まれた雌同士の血縁度が母と娘の血縁度を上回る場合がある。",
      "イ": "親子ときょうだいの血縁度が常に同じとは限らない。包括適応度には、自分の繁殖への寄与に加え、自分の行動が血縁者の繁殖に与える影響も含める。",
      "ウ": "包括適応度は子や孫の適応度だけを足した量ではない。血縁者の繁殖成功への自分の影響を、血縁度に応じて重み付けして考える。",
      "エ": "㋒は妥当である。㋑は包括適応度に含まれる、自分の行動による他の血縁者の繁殖成功への寄与を捉えていない。",
      "オ": "哺乳類のハダカデバネズミなどにも、繁殖個体と通常は繁殖しない個体の分業を伴う真社会性がみられる。したがって、そのような社会構造は昆虫に限られない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q104",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "繁殖投資と最適な卵サイズ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "数理モデルから導出される最適な卵サイズに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。ただし、f′(q)はf(q)の導関数とする。\n\n「繁殖投資エネルギーをE、卵サイズをqとすると、産卵数はE/qとなる。卵が大きくなるほど生存率が高くなると仮定し、子供の生存率f(q)は図のような卵サイズqの増加関数とする。このとき、生存する子供の数は［E×f(q)］/qとなる。生存する子供の数の期待値が最大になる最適な卵サイズqは、q＝［㋐］という条件を満たし、［㋑］といえる。」",
    "choices": {
      "ア": "E×f(q)×f′(q) ／ 繁殖投資エネルギーが大きくなるほど大きくなる",
      "イ": "f(q)×f′(q) ／ 繁殖投資エネルギーとは無関係",
      "ウ": "f(q)×f′(q) ／ 繁殖投資エネルギーが大きくなるほど大きくなる",
      "エ": "f(q)/f′(q) ／ 繁殖投資エネルギーとは無関係",
      "オ": "f(q)/f′(q) ／ 繁殖投資エネルギーが大きくなるほど大きくなる"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "E×f(q)/qをqで微分して0とおくと、qf′(q)−f(q)＝0なのでq＝f(q)/f′(q)となる。Eは正の定数として全体に掛かるため、最適な卵サイズに影響しない。",
    "choiceExplanations": {
      "ア": "Eは生存する子供の数の全体に掛かる正の定数である。qで微分した式を0と置くと消えるので、最大となるqを変えない。",
      "イ": "最適なqがEと無関係である点は妥当である。f(q)/qの商の微分から得る条件はqf′(q)＝f(q)であって、二つの関数の積ではない。",
      "ウ": "生存する子供の数をqで微分すると、E［qf′(q)−f(q)］/q²となる。内部で最大となる点ではq＝f(q)/f′(q)で、Eは条件に残らない。",
      "エ": "E×f(q)/qをqで微分して0とおくと、qf′(q)−f(q)＝0なのでq＝f(q)/f′(q)となる。Eは正の定数として全体に掛かるため、最適な卵サイズに影響しない。",
      "オ": "最適条件q＝f(q)/f′(q)は正しい。Eを増やせば最適なqでの産卵数は増えるが、qを選ぶ条件は変わらない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kagaku-seibutsu-yakugaku/q104.webp"
    ],
    "imageAltTexts": [
      "卵サイズqの増加に伴って子供の生存率f(q)が上昇し、次第に頭打ちになるグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q105",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "走性・フェロモン・刷込み",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生得的行動・学習に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．化学物質や光などの刺激に対して、一定の方向に移動する行動を走性といい、生得的行動の一つである。\n㋑．体内で合成された化学物質が体外に分泌され、それがカギ刺激となり、同種の個体に対してある決まった行動を引き起こす物質を、フェロモンという。\n㋒．カモやアヒルのひなは、ふ化後間もない時期に見たものを記憶して追うようになる。このように発育初期の感受期に行動の対象を記憶することを刷込みといい、学習の一つである。",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "刺激に対する方向性のある移動は走性で、同種個体に作用する化学信号がフェロモンである。発育初期の感受期に追従する対象を記憶する刷込みも、学習の一例である。",
    "choiceExplanations": {
      "ア": "刺激に対する方向性のある移動は走性で、同種個体に作用する化学信号がフェロモンである。発育初期の感受期に追従する対象を記憶する刷込みも、学習の一例である。",
      "イ": "㋐と㋑は妥当である。孵化後の限られた時期に追う対象を覚える㋒の刷込みも妥当である。",
      "ウ": "走性と刷込みを説明した㋐と㋒は正しい。同種個体の行動を変える化学信号を説明した㋑も妥当である。",
      "エ": "同種の個体間の化学信号であるフェロモンの説明は正しい。刺激に応じる走性と、感受期の経験に基づく刷込みも正しく説明されている。",
      "オ": "㋑のフェロモンと㋒の刷込みは妥当である。光などの刺激に向かったり遠ざかったりする方向性のある移動も、走性の説明に当てはまる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kagaku-seibutsu-yakugaku-q106",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "3ドメイン説と細胞の特徴",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "3ドメイン説に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．3ドメイン説は、ミトコンドリアDNA の塩基配列比較に基づいて提唱された。\n㋑．真核生物の葉緑体は、真正細菌に由来すると考えられている。\n㋒．真核生物のmRNA は、シャイン・ダルガーノ配列でリボソームと結合する。\n㋓．古細菌の細胞膜は、エーテル脂質から構成される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "葉緑体はシアノバクテリア系統の真正細菌の細胞内共生に由来する。古細菌の膜脂質では、炭化水素鎖がグリセロールにエーテル結合している。",
    "choiceExplanations": {
      "ア": "葉緑体が真正細菌に由来するという㋑は正しい。3ドメイン説の基になったのは、ミトコンドリアDNAではなくリボソームRNAの配列比較である。",
      "イ": "3ドメイン説は小サブユニットのrRNA配列などの比較に基づく。シャイン・ダルガーノ配列は、主に細菌などの翻訳開始に関わる。",
      "ウ": "葉緑体の起源に関する㋑は妥当である。真核生物の細胞質では、多くの場合、mRNAの5′末端のキャップを認識して翻訳が開始される。",
      "エ": "葉緑体はシアノバクテリア系統の真正細菌の細胞内共生に由来する。古細菌の膜脂質では、炭化水素鎖がグリセロールにエーテル結合している。",
      "オ": "古細菌の膜のエーテル結合を述べた㋓は妥当である。シャイン・ダルガーノ配列を真核生物の細胞質での翻訳開始に一般化した㋒は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007479.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。"
  }
];
