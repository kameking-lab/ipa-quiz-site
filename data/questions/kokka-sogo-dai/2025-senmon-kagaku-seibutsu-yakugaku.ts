import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2025_SENMON_KAGAKU_SEIBUTSU_YAKUGAKU: Question[] = [
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q003",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "気相反応の平衡移動",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ピストン付きの密閉容器の中で、2NO₂(g) ⇄ N₂O₄(g) の反応が平衡状態にある。この平衡状態に対してそれぞれ次の操作 A、B を行ったときの平衡の移動の組合せとして最も妥当なのはどれか。\n操作 A：温度を一定に保ちながら圧力を増加させる\n操作 B：温度と体積を一定に保ちながらアルゴンを加える",
    "choices": {
      "ア": "右向きに移動する／右向きに移動する",
      "イ": "右向きに移動する／移動しない",
      "ウ": "左向きに移動する／右向きに移動する",
      "エ": "左向きに移動する／左向きに移動する",
      "オ": "移動しない／移動しない"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "A の圧縮では気体分子の物質量が少ない N₂O₄ 側に移動する。B で増えるのは全圧だけで、反応種の分圧と反応商は変わらない。",
    "choiceExplanations": {
      "ア": "A で右に進む点は合っているが、B では温度と体積が一定なので反応種の分圧に変化がない。",
      "イ": "A の圧縮では気体分子の物質量が少ない N₂O₄ 側に移動する。B で増えるのは全圧だけで、反応種の分圧と反応商は変わらない。",
      "ウ": "A で高圧になると、気体の物質量が増える左向きより、物質量が減る右向きが有利である。",
      "エ": "反応商 p(N₂O₄)/p(NO₂)² は、圧縮の直後には小さくなり、アルゴン添加で各分圧が一定なら変わらない。",
      "オ": "温度一定なら平衡定数は変わらないが、A の圧縮では反応商が平衡定数からずれるため平衡組成が変わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q004",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "初速度から求める反応次数",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の表は、A＋B→C で表される反応を、実験1〜4のとおりそれぞれ A と B の初期濃度を変えて行ったときの、反応初期の C の生成速度を表している。このとき、㋐に当てはまるものとして最も妥当なのはどれか。\nただし、この反応の反応速度式は、v を反応速度、k を反応速度定数、[A]、[B] をそれぞれ A、B の濃度、x、y を定数として、v＝k[A]ˣ[B]ʸ の形で表されるとする。",
    "choices": {
      "ア": "8.4×10⁻³",
      "イ": "9.0×10⁻³",
      "ウ": "9.6×10⁻³",
      "エ": "1.0×10⁻²",
      "オ": "1.1×10⁻²"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "実験2と3をそれぞれ実験1と比べると、速度比は 0.5×1.2²＝0.72 と 2.5×0.8²＝1.6 に一致する。x＝1、y＝2 なので実験4の速度は 5.0×10⁻³×3.2×0.75²＝9.0×10⁻³ である。",
    "choiceExplanations": {
      "ア": "実験3から実験4に移ると [A] は 1.28 倍、[B] は 0.9375 倍となるので、速度は約 1.125 倍である。",
      "イ": "実験2と3をそれぞれ実験1と比べると、速度比は 0.5×1.2²＝0.72 と 2.5×0.8²＝1.6 に一致する。x＝1、y＝2 なので実験4の速度は 5.0×10⁻³×3.2×0.75²＝9.0×10⁻³ である。",
      "ウ": "B の初期濃度の比 0.75 は二乗してかけるので、9.6×10⁻³ にはならない。",
      "エ": "実験4では A が3.2倍になる一方で B の濃度効果が 0.75² 倍になるため、実験1の速度のちょうど2倍より小さい。",
      "オ": "A の増加だけを見ると速度が上がるが、B の濃度低下も含めた速度比は 2.2 倍より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q004.webp"
    ],
    "imageAltTexts": [
      "反応A＋B→Cの四つの初期濃度条件と生成速度"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q005",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "燃焼分析による組成式",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "炭素 C、水素 H、酸素 O だけから成る化合物15 mgを完全燃焼させると、二酸化炭素33 mgと水18 mgが得られた。このとき、この化合物の組成式として最も妥当なのはどれか。\nただし、C、H、O の原子量をそれぞれ12、1.0、16とする。",
    "choices": {
      "ア": "CH₄O",
      "イ": "C₂H₆O",
      "ウ": "C₃H₈O",
      "エ": "C₄H₁₀O",
      "オ": "C₅H₁₂O"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二酸化炭素と水から C は 9 mg、H は 2 mg と分かり、O は残りの4 mgである。各質量を原子量で割ると 0.75：2.0：0.25＝3：8：1 となる。",
    "choiceExplanations": {
      "ア": "二酸化炭素から求めた炭素は 0.75 mmol、質量差から求めた酸素は 0.25 mmol であり、C と O は等モルではない。",
      "イ": "炭素と酸素の物質量比は 3：1 なので、この選択肢の 2：1 とは一致しない。",
      "ウ": "二酸化炭素と水から C は 9 mg、H は 2 mg と分かり、O は残りの4 mgである。各質量を原子量で割ると 0.75：2.0：0.25＝3：8：1 となる。",
      "エ": "酸素0.25 mmolに対応する炭素は0.75 mmolであり、4倍の1.00 mmolではない。",
      "オ": "この式の H と O の比は12：1だが、燃焼で得た水と酸素の質量差から求まる比は8：1である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q006",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "アルカリ金属と炭酸塩",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "アルカリ金属とその化合物に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ ナトリウムの単体を水に加えると、水がナトリウムによって酸化され、酸素が発生する。\n㋑ アルカリ金属の原子は、原子番号が大きくなるほどイオン化エネルギーが大きくなる。\n㋒ 炭酸ナトリウムの水溶液に塩酸を加えると、二酸化炭素が発生する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "炭酸イオンが塩酸の H⁺ を受け取ると炭酸となり、水と二酸化炭素に分かれる。単体ナトリウムの反応で発生する気体は水素で、第一イオン化エネルギーは族の下ほど小さい。",
    "choiceExplanations": {
      "ア": "ナトリウムは Na⁺ へ酸化され、水は還元されて水素を生じる。",
      "イ": "㋐の気体は酸素ではなく水素であり、㋑のイオン化エネルギーは族の下ほど小さくなる。",
      "ウ": "㋒は正しいが、㋐では酸化と還元の役割も発生する気体も誤っている。",
      "エ": "族の下に行くと外殻電子の遮蔽が大きく、電子は外れやすくなるため、㋑は妥当でない。",
      "オ": "炭酸イオンが塩酸の H⁺ を受け取ると炭酸となり、水と二酸化炭素に分かれる。単体ナトリウムの反応で発生する気体は水素で、第一イオン化エネルギーは族の下ほど小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q007",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "光合成の総量と呼吸",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図は、ある植物において、一定の温度で照度を変えたときの二酸化炭素吸収速度［mg/時間］を表したものである。この植物に2万ルクスの光を4時間照射し、固定された二酸化炭素をグルコースとして換算したとき、この植物が同化したグルコース量として最も妥当なのはどれか。\nただし、二酸化炭素濃度と水は十分であり、C、H、O の原子量はそれぞれ12、1、16とする。",
    "choices": {
      "ア": "約1.4 mg",
      "イ": "約2.7 mg",
      "ウ": "約5.5 mg",
      "エ": "約16.4 mg",
      "オ": "約32.7 mg"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "2万ルクスでの見かけの吸収速度は1 mg/時間で、暗所の呼吸速度1 mg/時間を加えると総固定量は4時間で8 mgになる。6分子の CO₂ から1分子のグルコースを生じるので、8×180/(6×44)≃5.5 mg である。",
    "choiceExplanations": {
      "ア": "1.4 mg は総光合成で1時間に固定される二酸化炭素2 mgから求まるグルコース量に近く、4時間分を数えていない。",
      "イ": "2.7 mg は見かけの吸収量1 mg/時間を4時間分換算する値で、呼吸で放出される分を加えていない。",
      "ウ": "2万ルクスでの見かけの吸収速度は1 mg/時間で、暗所の呼吸速度1 mg/時間を加えると総固定量は4時間で8 mgになる。6分子の CO₂ から1分子のグルコースを生じるので、8×180/(6×44)≃5.5 mg である。",
      "エ": "CO₂ の物質量からグルコースの物質量への換算では、グルコース1分子に炭素が6個含まれることを反映する必要がある。",
      "オ": "この量は CO₂ 1分子ごとにグルコース1分子が生じるとした場合に相当し、正しい化学量論の6倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q007.webp"
    ],
    "imageAltTexts": [
      "植物の二酸化炭素の見かけの吸収速度と照度のグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q008",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "真核生物の発現調節",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "真核生物の遺伝子の発現調節に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "1個の受精卵から体細胞が増殖する際、細胞は体細胞分裂と減数分裂を交互に繰り返す。このとき、異なる形や機能をもつ細胞に分化する過程で必要ない遺伝子を欠失させながら増殖する。",
      "イ": "ヒトの DNA は、ヌクレオソームなどのタンパク質と結合し、これが複雑に折りたたまれてヒストンと呼ばれる高次構造を形成している。外部刺激に応じてヒストンの高次構造がほどけると、mRNA の合成に必要なタンパク質が DNA に結合できる状態になる。",
      "ウ": "DNA 上のプロモーターとは別の領域に結合する発現調節に関わるタンパク質を、調節タンパク質と呼ぶ。ある調節タンパク質 X が、調節遺伝子 y の転写を促進するとともに調節遺伝子 z の転写を抑制することがある。",
      "エ": "ショウジョウバエの唾腺染色体のパフと呼ばれる膨らんで見える部分では、mRNA の合成が活発である。ショウジョウバエが幼虫から成虫へ発生するにつれて、徐々にパフの数が増え、大きくなる。",
      "オ": "筋細胞と水晶体細胞のように異なる細胞に分化すると、機能に応じて組織特異的な遺伝子のみが発現し、共通して発現する遺伝子は存在しない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "調節タンパク質はプロモーター以外の調節配列にも結合し、結合相手や標的領域の構造により作用が異なる。したがって、同じ因子が標的ごとに活性化と抑制を担う場合がある。",
    "choiceExplanations": {
      "ア": "体細胞の増殖は通常は体細胞分裂で行われる。分化は、多くの場合同じ遺伝情報のうちどの遺伝子を働かせるかの違いで起こる。",
      "イ": "タンパク質であるヒストンに DNA が巻きついた構造がヌクレオソームであり、記述では両者の関係が逆になっている。",
      "ウ": "調節タンパク質はプロモーター以外の調節配列にも結合し、結合相手や標的領域の構造により作用が異なる。したがって、同じ因子が標的ごとに活性化と抑制を担う場合がある。",
      "エ": "パフは転写が活発な領域だが、発生段階に応じて異なる遺伝子群が発現し、パフの位置や大きさが切り替わる。",
      "オ": "分化した細胞でも、転写・翻訳や基本的な代謝に必要な遺伝子の多くは共通して発現する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q009",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "自然免疫と獲得免疫",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "免疫に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 免疫の仕組みは自然免疫と獲得免疫に分けられ、両者は関わりあうことなく独自の方法で病原体の排除を行っている。自然免疫は無脊椎動物からヒトまで共通して存在する防御機構である。\n㋑ 獲得免疫のうち、細胞性免疫では、樹状細胞などが主要組織適合遺伝子複合体（MHC）分子と病原体のタンパク質断片との複合体を提示し、これを認識したキラーT細胞が、病原体に感染した細胞を攻撃する。\n㋒ 免疫グロブリンの可変部遺伝子領域は、H鎖では三つ、L鎖では二つの遺伝子群に分かれている。各遺伝子群から一つずつ選択された遺伝子断片が連結・再編成されるため、抗体の可変部の多様性が生み出される。\n㋓ 目的とする抗原で免疫した動物の血清をヒトに注射して人工的に免疫記憶を獲得させる血清療法は、毒ヘビにかまれた際の治療や臓器移植の拒絶反応の抑制に用いられる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "樹状細胞などの抗原提示で活性化されたキラーT細胞は、抗原ペプチドを提示する感染細胞を攻撃する。抗体可変部では H 鎖の V・D・J、L 鎖の V・J の組換えが多様性を生む。",
    "choiceExplanations": {
      "ア": "樹状細胞は自然免疫による異物認識を獲得免疫の誘導にも結び付けるため、両者は互いに関わる。",
      "イ": "可変部の再編成は妥当だが、自然免疫で作られたシグナルは獲得免疫の活性化にも影響する。",
      "ウ": "自然免疫と獲得免疫は連携し、血清療法で与える抗体は受動免疫であり、受け手に免疫記憶をつくらせるものではない。",
      "エ": "樹状細胞などの抗原提示で活性化されたキラーT細胞は、抗原ペプチドを提示する感染細胞を攻撃する。抗体可変部では H 鎖の V・D・J、L 鎖の V・J の組換えが多様性を生む。",
      "オ": "㋑は妥当だが、抗毒素血清で供給する抗体は即時の受動免疫に働くもので、免疫記憶を誘導する治療ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q010",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "基礎生物学",
    "topicTags": [
      "動物の呼吸・循環・排出",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "生物種㋐、㋑、㋒は、それぞれ表に示す呼吸系、循環系、排出器の特徴をもっている。生物種㋐、㋑、㋒に該当する生物として最も妥当なのは次のうちではどれか。",
    "choices": {
      "ア": "サンゴ／ナマコ／ヤモリ",
      "イ": "ミミズ／サメ／ハチ",
      "ウ": "クシクラゲ／エイ／カイチュウ",
      "エ": "プラナリア／コイ／ムカデ",
      "オ": "ヒル／ホヤ／バッタ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ミミズは皮膚呼吸・閉鎖血管系・腎管をもち、サメはえら呼吸・閉鎖血管系・腎臓をもつ。ハチは気管呼吸・開放血管系・マルピーギ管を備える。",
    "choiceExplanations": {
      "ア": "サンゴに閉鎖血管系はなく、ヤモリは気管系で直接組織に酸素を運ぶ昆虫型の呼吸をしない。",
      "イ": "ミミズは皮膚呼吸・閉鎖血管系・腎管をもち、サメはえら呼吸・閉鎖血管系・腎臓をもつ。ハチは気管呼吸・開放血管系・マルピーギ管を備える。",
      "ウ": "エイは魚類の特徴に合うが、クシクラゲは閉鎖血管系をもたず、カイチュウにマルピーギ管はない。",
      "エ": "コイは㋑に合うが、プラナリアには閉鎖血管系がなく、排出器は炎細胞をもつ原腎管である。",
      "オ": "バッタは㋒に合うが、ホヤにはサメなどの脊椎動物のような閉鎖血管系と腎臓の組合せはない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q010.webp"
    ],
    "imageAltTexts": [
      "三種の生物の呼吸系・循環系・排出器の特徴"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q017",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "基礎物理化学・基礎無機化学",
    "topicTags": [
      "熱力学の三法則",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述㋐、㋑、㋒は、熱力学第一法則、熱力学第二法則、熱力学第三法則のいずれかの表現である。このうち、熱力学第一法則と熱力学第二法則を選び出した組合せとして最も妥当なのはどれか。\n㋐ 自発変化は、孤立系のエントロピーが増大する方向に進む。\n㋑ 系の内部エネルギー変化は、外界と系との間でやりとりされる熱と仕事との和で記述される。\n㋒ 完全結晶になる全ての物質のエントロピーは、絶対零度においてゼロとなる。",
    "choices": {
      "ア": "㋐／㋑",
      "イ": "㋐／㋒",
      "ウ": "㋑／㋐",
      "エ": "㋑／㋒",
      "オ": "㋒／㋐"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "第一法則は熱と仕事を通した内部エネルギーの収支を与え、第二法則は孤立系の自発変化でエントロピーが増加する方向を定める。",
    "choiceExplanations": {
      "ア": "熱と仕事を含めたエネルギー保存が第一法則で、孤立系のエントロピーの変化が第二法則なので、順序が逆である。",
      "イ": "エントロピー増大は第二法則で、完全結晶の絶対零度のエントロピーは第三法則に対応する。",
      "ウ": "第一法則は熱と仕事を通した内部エネルギーの収支を与え、第二法則は孤立系の自発変化でエントロピーが増加する方向を定める。",
      "エ": "内部エネルギーについての㋑は合っているが、絶対零度についての㋒は第三法則である。",
      "オ": "㋐は第二法則に当たるが、㋒はエネルギー保存を述べた第一法則ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q020",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "基礎物理化学・基礎無機化学",
    "topicTags": [
      "酸の強さと共役塩基",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "酸の強さに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ フェノールとエタノールを比較すると、エタノールの方が強い酸である。\n㋑ 硫酸と硝酸を比較すると、硝酸の方が強い酸である。\n㋒ ブタン酸と2-クロロブタン酸を比較すると、2-クロロブタン酸の方が強い酸である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "2-クロロブタン酸ではカルボキシ基に隣接する塩素が電子を引くため、共役塩基が安定してブタン酸よりプロトンを放しやすい。",
    "choiceExplanations": {
      "ア": "フェノキシドイオンは負電荷が芳香環側に非局在化できるため、フェノールはエタノールより強い酸である。",
      "イ": "フェノールのほうがエタノールより強く、第一段階の酸解離を比べると硫酸は一般に硝酸より強い。",
      "ウ": "㋒は妥当だが、㋐はフェノールの共役塩基が共鳴で安定することを反映していない。",
      "エ": "塩素置換による酸性の増加は妥当だが、硫酸と硝酸の第一段階の酸性の順序が逆である。",
      "オ": "2-クロロブタン酸ではカルボキシ基に隣接する塩素が電子を引くため、共役塩基が安定してブタン酸よりプロトンを放しやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q021",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "基礎物理化学・基礎無機化学",
    "topicTags": [
      "共晶と共沸混合物",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "混合物に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ スズと鉛の共融組成の混合物である共晶ハンダは、共融温度で融解することを利用したハンダである。\n㋑ 単蒸留は、沸騰と凝縮の操作を繰り返して、複数の揮発性の液体を高い純度で分離する方法である。\n㋒ 共沸混合物である水とエタノールの二成分系では、1気圧下での蒸留によってエタノールの濃度を100%に濃縮することができない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "共晶組成のはんだは一定の共融温度で融ける。水とエタノールは共沸組成で気相と液相の組成が等しいので、通常の蒸留でそこを越えられない。",
    "choiceExplanations": {
      "ア": "共融温度を利用する説明は合っているが、1気圧で蒸留するとエタノールが共沸組成を超えて濃縮できない点も妥当である。",
      "イ": "気化と凝縮を繰り返して分離を高める方法は分留に当たり、単蒸留についての㋑は妥当でない。",
      "ウ": "共晶組成のはんだは一定の共融温度で融ける。水とエタノールは共沸組成で気相と液相の組成が等しいので、通常の蒸留でそこを越えられない。",
      "エ": "共沸による制約は正しいが、沸騰と凝縮を繰り返す高効率の分離は分留の説明である。",
      "オ": "㋒に加えて、スズと鉛の共晶はんだが共融温度で融けるとする㋐も正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q023",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "ディーテリチの状態方程式と臨界点",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の状態方程式に従う気体がある。\nP＝[RT/(V−b)]exp[−a/(RTV)]\nここで、V はモル体積、T は絶対温度、R は気体定数、a、b は定数である。この気体が臨界現象を示し、そのときの圧力を P_C、モル体積を V_C、温度を T_C とするとき、圧縮係数 P_C V_C/(RT_C) として最も妥当なのはどれか。",
    "choices": {
      "ア": "2/e²",
      "イ": "3/8",
      "ウ": "e²/8",
      "エ": "e²/2",
      "オ": "2e²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "臨界等温線で P の1階・2階の体積微分がともに零なので、log P の両微分も零となる。これを解くと V_C＝2b、a/(RT_C V_C)＝2 で、圧縮係数は [V_C/(V_C−b)]exp(−2)＝2/e² となる。",
    "choiceExplanations": {
      "ア": "臨界等温線で P の1階・2階の体積微分がともに零なので、log P の両微分も零となる。これを解くと V_C＝2b、a/(RT_C V_C)＝2 で、圧縮係数は [V_C/(V_C−b)]exp(−2)＝2/e² となる。",
      "イ": "3/8 はファンデルワールスの式の臨界圧縮係数に当たり、指数関数を含むこの状態方程式からは出てこない。",
      "ウ": "指数の符号は負であり、圧縮係数に掛かる因子は e² ではなく e⁻² である。",
      "エ": "V_C＝2b から前置因子 V_C/(V_C−b) は2で、これに e⁻² を掛ける必要がある。",
      "オ": "前置因子の2は合っているが、分子間引力を表す指数の符号が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q024",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "等核二原子分子の結合距離",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "等核二原子分子の結合距離に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「C₂、N₂、O₂、F₂ の中で、結合距離が最も長いのは［㋐］であり、結合距離が最も短いのは［㋑］である。」",
    "choices": {
      "ア": "N₂／C₂",
      "イ": "O₂／C₂",
      "ウ": "O₂／N₂",
      "エ": "F₂／C₂",
      "オ": "F₂／N₂"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "F₂ は反結合性軌道にも電子が入る結合次数1の分子で、結合距離は最長である。結合次数3の N₂ の結合距離は最も短い。",
    "choiceExplanations": {
      "ア": "N₂ の結合次数は3で、この中では結合距離が最も短い部類に入る。",
      "イ": "O₂ の結合距離は F₂ より短く、C₂ の結合距離は N₂ より長い。",
      "ウ": "N₂ が最短である点は合うが、O₂ より結合次数の低い F₂ のほうが長い。",
      "エ": "F₂ が最長である点は合うが、最短は C₂ ではなく N₂ である。",
      "オ": "F₂ は反結合性軌道にも電子が入る結合次数1の分子で、結合距離は最長である。結合次数3の N₂ の結合距離は最も短い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q025",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "分子の回転と振動自由度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "分子の運動自由度に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「二酸化炭素分子の運動自由度のうち、回転の自由度は［㋐］個である。また、ベンゼン分子の運動自由度のうち、回転の自由度は［㋑］個、振動の自由度は［㋒］個である。」",
    "choices": {
      "ア": "2／2／31",
      "イ": "2／3／30",
      "ウ": "2／3／31",
      "エ": "3／2／30",
      "オ": "3／2／31"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "直線分子の CO₂ では分子軸まわりの回転を除き2自由度となる。非直線形で12原子から成るベンゼンは並進3、回転3を全36自由度から引くと振動30である。",
    "choiceExplanations": {
      "ア": "二酸化炭素の回転は2自由度だが、ベンゼンは平面分子でも非直線形なので回転は3自由度ある。",
      "イ": "直線分子の CO₂ では分子軸まわりの回転を除き2自由度となる。非直線形で12原子から成るベンゼンは並進3、回転3を全36自由度から引くと振動30である。",
      "ウ": "回転の二つの値は合っているが、ベンゼンの振動は 36−3−3＝30 である。",
      "エ": "ベンゼンの振動は30でよいが、回転の自由度は直線形の CO₂ が2、非直線形のベンゼンが3である。",
      "オ": "非直線形のベンゼンから差し引くのは並進3と回転3であり、振動の自由度は31ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q027",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "物理化学・無機化学",
    "topicTags": [
      "表面自由エネルギーとぬれ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "界面に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「気相中の固体表面において、図のように液体が固体表面上でぬれ広がって薄膜を形成している。固体－気体間、固体－液体間、及び液体－気体間の界面張力をそれぞれ γ_SG、γ_SL、γ_LG とすると、表面自由エネルギーの減少量 S は、S＝γ_SG−(γ_SL＋γ_LG) で表される。\n図に示すように、固体表面にある液体がぬれ広がって、液体膜に覆われた部分が時間の経過とともに増えるときは［㋐］となり、液体薄膜が固体表面上で自発的にぬれ広がる。このようなぬれを［㋑］と呼ぶ。」",
    "choices": {
      "ア": "S＞0／拡張ぬれ",
      "イ": "S＞0／浸漬ぬれ",
      "ウ": "S＞0／付着ぬれ",
      "エ": "S＜0／拡張ぬれ",
      "オ": "S＜0／浸漬ぬれ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "液体が広がると固気界面が固液界面と液気界面に置換される。S＞0 なら単位面積あたりの自由エネルギーが下がり、薄膜が自発的に広がる拡張ぬれが起こる。",
    "choiceExplanations": {
      "ア": "液体が広がると固気界面が固液界面と液気界面に置換される。S＞0 なら単位面積あたりの自由エネルギーが下がり、薄膜が自発的に広がる拡張ぬれが起こる。",
      "イ": "自由エネルギーが減る条件は合っているが、図は物体を液中へ浸す浸漬ぬれの過程ではない。",
      "ウ": "付着ぬれでは液滴などが固体と接触することが中心で、この図のような薄膜の面積増加は拡張ぬれである。",
      "エ": "拡張ぬれという名称は合うが、S＜0 なら広がった後の単位面積あたりの自由エネルギーが高くなる。",
      "オ": "薄膜の拡張に対しては S＞0 が必要で、固体を液体内部に浸しているわけでもない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q027.webp"
    ],
    "imageAltTexts": [
      "液膜が固体表面に広がるときの三つの界面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q029",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "NMRと赤外吸収の解釈",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "有機化合物のスペクトルに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 図の化合物の ¹H NMR スペクトル（室温、溶媒 CDCl₃）の 3.4 ppm 付近には、四重線が観測される。\n㋑ 図の化合物の ¹³C NMR スペクトル（プロトンノイズデカップリング、室温、溶媒 CDCl₃）には、全部で4種類のシグナルが観測される。\n㋒ 図の化合物の IR スペクトル（室温、溶媒 CCl₄）の 3300〜3500 cm⁻¹ 付近には、2本の吸収が観測される。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋑では芳香環の置換炭素と水素結合炭素の2種類、および側鎖のメチンとメチルの2種類を数える。㋒の NH₂ は対称伸縮と逆対称伸縮に対応する吸収を示す。",
    "choiceExplanations": {
      "ア": "3.4 ppm 付近の O に隣接する CH₂ は隣の CH₂ の水素2個と結合するので、主に三重線となる。",
      "イ": "炭素のシグナル数は合うが、㋐の O–CH₂ は隣のメチル基の水素3個による四重線ではない。",
      "ウ": "㋒の第一級アミンの吸収は妥当だが、㋐のエーテルでは O–CH₂ の隣に CH₂ がある。",
      "エ": "対称なパラ二置換体では4種類に数えられるが、アニリンの NH₂ の伸縮振動も2本の吸収を与える。",
      "オ": "㋑では芳香環の置換炭素と水素結合炭素の2種類、および側鎖のメチンとメチルの2種類を数える。㋒の NH₂ は対称伸縮と逆対称伸縮に対応する吸収を示す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q029.webp"
    ],
    "imageAltTexts": [
      "㋐〜㋒の有機化合物の構造とスペクトルの記述"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q030",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "縮合環とスピロ化合物の立体化学",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "有機化合物の立体化学に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 図の二つの化合物は互いにジアステレオマーである。\n㋑ 図の化合物は E 体である。\n㋒ 図の化合物にはエナンチオマーが存在する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋐は環接合部の水素が trans と cis の関係にある二つのデカリンである。㋒のスピロ化合物では各環の二方向がカルボニル基の有無で区別されるため、鏡像を重ね合わせられない。",
    "choiceExplanations": {
      "ア": "㋐は妥当だが、㋑では左の二重結合炭素の Cl と右の炭素のメチル基が同じ側なので Z 体である。",
      "イ": "㋐は環接合部の水素が trans と cis の関係にある二つのデカリンである。㋒のスピロ化合物では各環の二方向がカルボニル基の有無で区別されるため、鏡像を重ね合わせられない。",
      "ウ": "E/Z は各炭素で優先順位の高い置換基を比べるので、炭化水素鎖だけの位置関係を見て E とは判定できない。",
      "エ": "㋒はキラルであるが、㋑の高順位基は同じ側にある。",
      "オ": "㋒に加えて㋐も妥当で、cis と trans の縮合環は配座を変えるだけでは互いに移り変わらない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q030.webp"
    ],
    "imageAltTexts": [
      "㋐の縮合環、㋑のアルケン、㋒のスピロ化合物の構造式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q031",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "アルケン異性体の水素化熱",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "アルケンを水素で水素化すると、発熱を伴いアルカンへと還元される（式①）。次のブテンの異性体㋐、㋑、㋒をそれぞれ水素化したときの1 mol当たりの発熱量を大きい順に並べたものとして最も妥当なのはどれか。ただし、㋐、㋑、㋒は水素化によっていずれもブタンに変換されるものとする。",
    "choices": {
      "ア": "㋐＞㋒＞㋑",
      "イ": "㋑＞㋐＞㋒",
      "ウ": "㋑＞㋒＞㋐",
      "エ": "㋒＞㋐＞㋑",
      "オ": "㋒＞㋑＞㋐"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "生成物がいずれもブタンなので、反応物として不安定なアルケンほど放出熱は大きい。末端の㋐が最も不安定で、2-ブテンでは立体反発のある cis 体㋒が trans 体㋑より不安定である。",
    "choiceExplanations": {
      "ア": "生成物がいずれもブタンなので、反応物として不安定なアルケンほど放出熱は大きい。末端の㋐が最も不安定で、2-ブテンでは立体反発のある cis 体㋒が trans 体㋑より不安定である。",
      "イ": "㋑は trans-2-ブテンで3種の中では最も安定し、水素化での発熱量は最小である。",
      "ウ": "㋐は二重結合の置換度が低い1-ブテンなので、最も大きな発熱量を与える。",
      "エ": "㋒よりも㋐のほうが二重結合の置換度が低く、同じ生成物へ進むときの発熱量は大きい。",
      "オ": "cis の㋒が trans の㋑より大きい点は合うが、発熱量最大の1-ブテン㋐を最後に置いている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q031.webp"
    ],
    "imageAltTexts": [
      "アルケンの水素化の式と三つのブテン異性体"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q032",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "有機金属試薬の1,2付加と1,4付加",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "有機金属反応剤による α,β-不飽和ケトンへの付加反応に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「3-ペンテン-2-オンにエチルリチウムを反応させると、エチルリチウムが3-ペンテン-2-オンに［㋐］攻撃して反応が進行し、［㋑］が優先的に得られる（式①）。また、3-ペンテン-2-オンにジエチル銅リチウムを反応させると、［㋒］が優先的に得られる（式②）。」",
    "choices": {
      "ア": "求核／A／B",
      "イ": "求核／B／A",
      "ウ": "求電子／A／A",
      "エ": "求電子／A／B",
      "オ": "求電子／B／B"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "エチルリチウムの炭素は求核的でカルボニル炭素に1,2付加し、処理後にアルコール A を与える。有機銅試薬は共役系の β 位に1,4付加し、ケトン B を与える。",
    "choiceExplanations": {
      "ア": "エチルリチウムの炭素は求核的でカルボニル炭素に1,2付加し、処理後にアルコール A を与える。有機銅試薬は共役系の β 位に1,4付加し、ケトン B を与える。",
      "イ": "求核攻撃は合っているが、リチウム試薬がカルボニルへ直接付加して A、有機銅試薬が共役付加して B を与えるので順序が逆である。",
      "ウ": "A はエチルリチウムからの生成物だが、その攻撃は求電子的でなく、有機銅試薬の優先生成物も A ではない。",
      "エ": "生成物の組合せは合っているが、カルボニル炭素を攻撃するエチルリチウムは電子対を供与する求核剤である。",
      "オ": "有機銅試薬から B ができるのは妥当だが、エチルリチウムは求核剤で、主に A を与える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q032.webp"
    ],
    "imageAltTexts": [
      "有機リチウムと有機銅の付加反応および生成物 A・B"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q033",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "カルボニル化合物の反応生成物",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の反応㋐、㋑、㋒のうち、主生成物が妥当なもののみを全て挙げているのはどれか。ただし、それぞれの反応で適切な後処理が行われたものとする。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐ではシクロヘキサノンとジメチルアミンから生じたイミニウムが還元される。㋑では酸触媒で生じるエノールが塩素化されて α-クロロケトンになる。",
    "choiceExplanations": {
      "ア": "㋐ではシクロヘキサノンとジメチルアミンから生じたイミニウムが還元される。㋑では酸触媒で生じるエノールが塩素化されて α-クロロケトンになる。",
      "イ": "㋐は妥当だが、㋒のヒドラジンと塩基を用いる反応ではカルボニル基がメチレンに変わる。",
      "ウ": "㋑に加えて、シアノ水素化ホウ素ナトリウムでイミニウムを還元する㋐も妥当である。",
      "エ": "㋑は妥当だが、㋒のウォルフ–キッシュナー還元はシクロヘキサノールを与えない。",
      "オ": "㋒ではヒドラゾンから窒素が脱離してシクロヘキサンになるので、図のアルコールは主生成物ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q033.webp"
    ],
    "imageAltTexts": [
      "シクロヘキサノンからの三つの反応と主生成物の候補"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q034",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "芳香族求電子置換の配向性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の有機合成反応の㋐、㋑に当てはまる生成物の組合せとして最も妥当なのはどれか。ただし、それぞれの反応で適切な後処理が行われたものとする。\n選択肢の置換位置は、アニソールのメトキシ基を1位として表す。",
    "choices": {
      "ア": "2-アセチルアニソール／2-アセチル-3-ニトロアニソール",
      "イ": "2-アセチルアニソール／2-アセチル-5-ニトロアニソール",
      "ウ": "3-アセチルアニソール／3-アセチル-4-ニトロアニソール",
      "エ": "4-アセチルアニソール／4-アセチル-2-ニトロアニソール",
      "オ": "4-アセチルアニソール／4-アセチル-3-ニトロアニソール"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "立体障害の小さいパラ位でアシル化される。次のニトロ化ではメトキシ基のオルト位とアセチル基のメタ位が同じ炭素になるので、図の㋑を与える。",
    "choiceExplanations": {
      "ア": "メトキシ基はオルト・パラ配向性だが、最初のアシル化では立体障害の少ないパラ位の生成物が優先する。",
      "イ": "オルト位への置換は可能でも、最も妥当な主生成物はパラ体である。また、この選択肢のニトロ基はメトキシ基に対してメタ位にある。",
      "ウ": "電子供与性のメトキシ基はフリーデル–クラフツアシル化をオルト・パラ位へ導き、メタ体は主生成物にはならない。",
      "エ": "立体障害の小さいパラ位でアシル化される。次のニトロ化ではメトキシ基のオルト位とアセチル基のメタ位が同じ炭素になるので、図の㋑を与える。",
      "オ": "㋐のパラ体は合っているが、㋑のニトロ基がメトキシ基のメタ位かつアセチル基のオルト位にあり、両置換基の配向と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q034.webp"
    ],
    "imageAltTexts": [
      "アニソールに対する二段階の芳香族求電子置換"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q034-1.webp",
      "イ": "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q034-2.webp",
      "ウ": "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q034-3.webp",
      "エ": "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q034-4.webp",
      "オ": "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q034-5.webp"
    },
    "choiceImageAltTexts": {
      "ア": "㋐のオルト置換体と㋑のニトロ化物",
      "イ": "オルト置換体と別の位置にニトロ基が入る生成物",
      "ウ": "メタ置換体とそのニトロ化物",
      "エ": "パラ置換体とそのニトロ化物",
      "オ": "パラ置換体と別の位置にニトロ基が入る生成物"
    }
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q035",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "油脂の乾性・水素添加・けん化価",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "油脂に関する次の記述の㋐〜㋓に当てはまる組合せとして最も妥当なのはどれか。\n「二重結合の多い不飽和脂肪酸の成分を多く含む油脂であり、空気中に放置すると酸化されて固化する性質をもつ油脂を［㋐］という。また、不飽和脂肪酸を多く含む油脂に水素を付加すると、不飽和脂肪酸の一部が飽和脂肪酸に変わり固化する。こうしてできた油脂を［㋑］という。\nまた、油脂を構成する脂肪酸の平均分子量の大小の目安となる指標として［㋒］が挙げられる。［㋒］が大きいほど、油脂を構成する脂肪酸の平均分子量は［㋓］なる。」",
    "choices": {
      "ア": "乾性油／硬化油／けん化価／小さく",
      "イ": "乾性油／硬化油／けん化価／大きく",
      "ウ": "乾性油／硬化油／ヨウ素価／小さく",
      "エ": "硬化油／乾性油／けん化価／小さく",
      "オ": "硬化油／乾性油／ヨウ素価／大きく"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "不飽和度が高く空気中で酸化・重合する油が乾性油で、水素添加で固化した油が硬化油である。けん化価が大きいと油脂1 g当たりのエステル結合数が多くなり、平均分子量が小さい。",
    "choiceExplanations": {
      "ア": "不飽和度が高く空気中で酸化・重合する油が乾性油で、水素添加で固化した油が硬化油である。けん化価が大きいと油脂1 g当たりのエステル結合数が多くなり、平均分子量が小さい。",
      "イ": "けん化価は油脂1 g当たりに必要な KOH の量であり、低分子量ほど1 g当たりの分子数が増えて値が上がる。",
      "ウ": "ヨウ素価は付加反応で消費するヨウ素の量から不飽和度をみる指標で、平均分子量の指標はけん化価である。",
      "エ": "けん化価と分子量の関係は合うが、空気中で固化する油が乾性油、水素添加によるものが硬化油である。",
      "オ": "固化に関わる二つの油脂の名称が逆で、ヨウ素価は主に二重結合の量を反映する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q036",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "硫黄と硫酸の性質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "硫黄とその化合物に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 斜方硫黄や単斜硫黄は主に鎖状分子で構成される一方、ゴム状硫黄は主に環状分子で構成される。\n㋑ 濃硫酸は不揮発性であるため、揮発性の酸の塩に濃硫酸を加えて加熱すると、揮発性の酸が遊離する。\n㋒ 接触法により硫酸を製造することができる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "不揮発性の硫酸は、塩から揮発性の酸を遊離させるのに使える。接触法では二酸化硫黄を触媒で三酸化硫黄に酸化して硫酸を製造する。",
    "choiceExplanations": {
      "ア": "斜方硫黄と単斜硫黄は主として環状 S₈ を含み、ゴム状硫黄は鎖状の成分を多く含む。",
      "イ": "㋑の硫酸の不揮発性は妥当だが、㋐の環状分子と鎖状分子の対応は逆である。",
      "ウ": "接触法は硫酸製造に用いられるが、斜方硫黄と単斜硫黄は環状分子で構成される。",
      "エ": "不揮発性の硫酸は、塩から揮発性の酸を遊離させるのに使える。接触法では二酸化硫黄を触媒で三酸化硫黄に酸化して硫酸を製造する。",
      "オ": "硫酸の工業製法だけでなく、不揮発性の濃硫酸による揮発性酸の遊離も正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q037",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "二段蒸留の物質収支",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "二段の精留塔に関する次の記述の空欄に当てはまるものとして最も妥当なのはどれか。\n「50 mol%のエタノール水溶液を第1精留塔に100 kmol·h⁻¹で供給し、塔頂より80 mol%のエタノール水溶液を50 kmol·h⁻¹で取り出した。塔底から取り出した液は、別系統から50 kmol·h⁻¹で送られてくる30 mol%のエタノール水溶液と混合され、第2精留塔へ原料として供給される。第2精留塔では、塔頂より60 mol%のエタノール水溶液を取り出し、塔底より10 mol%のエタノール水溶液を取り出した。このとき、第2精留塔の塔頂から取り出した液の流量は［　］kmol·h⁻¹である。」",
    "choices": {
      "ア": "30",
      "イ": "40",
      "ウ": "50",
      "エ": "60",
      "オ": "70"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "第1塔の塔底50 kmol/hにはエタノールが 50−40＝10 kmol/h 含まれ、別系統を混ぜると第2塔への供給は100 kmol/h、エタノールは25 kmol/hである。第2塔頂の流量を D とすると 0.60D＋0.10(100−D)＝25 なので D＝30 となる。",
    "choiceExplanations": {
      "ア": "第1塔の塔底50 kmol/hにはエタノールが 50−40＝10 kmol/h 含まれ、別系統を混ぜると第2塔への供給は100 kmol/h、エタノールは25 kmol/hである。第2塔頂の流量を D とすると 0.60D＋0.10(100−D)＝25 なので D＝30 となる。",
      "イ": "塔頂を40とするとエタノール流出量は 0.60×40＋0.10×60＝30 kmol/h で、供給される25より多い。",
      "ウ": "二つの流出流量を50ずつとすると、エタノール流出量は35 kmol/hとなり、原料に含まれる量を超える。",
      "エ": "塔頂濃度の 60 mol% は全原料流量の60%が塔頂へ出ることを意味しない。",
      "オ": "塔頂流量が70なら塔頂のエタノールだけで42 kmol/hとなり、第2塔全体に供給される25を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q038",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "乾量基準の含水率と乾燥速度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある湿り材料100 kgを無水材料（乾量）基準の含水率0.500［kg-H₂O/kg-無水材料］から0.200［kg-H₂O/kg-無水材料］まで乾燥させるのに3時間を要した。この乾燥が恒率乾燥であったとき、その乾燥速度［kg·h⁻¹］として最も妥当なのはどれか。",
    "choices": {
      "ア": "5.56 kg·h⁻¹",
      "イ": "6.67 kg·h⁻¹",
      "ウ": "7.41 kg·h⁻¹",
      "エ": "10.0 kg·h⁻¹",
      "オ": "13.3 kg·h⁻¹"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "湿り材料100 kgは乾燥固形分の1.500倍なので、固形分は約66.7 kgとなる。乾量基準の含水率が0.300減ると水の減少は20 kgとなり、3時間で割ると 6.67 kg/h である。",
    "choiceExplanations": {
      "ア": "この値を3倍すると約16.7 kgだが、含水率の差0.300と乾燥固形分66.7 kgの積は20 kgである。",
      "イ": "湿り材料100 kgは乾燥固形分の1.500倍なので、固形分は約66.7 kgとなる。乾量基準の含水率が0.300減ると水の減少は20 kgとなり、3時間で割ると 6.67 kg/h である。",
      "ウ": "含水率は湿り材料全体の質量に対する割合ではなく、乾燥固形分を基準にする必要がある。",
      "エ": "10.0 kg/h は湿り材料100 kgに含水率差を直接掛けて3時間で割った値であり、乾量基準の定義に合わない。",
      "オ": "13.3 kg/hとすると除かれる水は約40 kgで、初めに含まれる水約33.3 kgより多くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q039",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "円管流のレイノルズ数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "円管内の流れの状態に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「円管内の流れの状態が、層流、乱流のいずれであるかは、レイノルズ数 Re により判断できる。レイノルズ数は、次式のように㋐と㋑の比で表すことができる。\nRe＝［㋐］/［㋑］\n次のそれぞれの条件で円管内に流体を流すとする。\n条件1：流体の密度1000 kg·m⁻³、粘度1 mPa·s、体積流量1 m³·h⁻¹、円管の内径1 mm\n条件2：流体の密度1000 kg·m⁻³、粘度10 mPa·s、体積流量1 m³·h⁻¹、円管の内径10 mm\nこのとき、条件1におけるレイノルズ数は、条件2におけるレイノルズ数の［㋒］倍となる。」",
    "choices": {
      "ア": "粘性力／慣性力／1",
      "イ": "粘性力／慣性力／100",
      "ウ": "慣性力／粘性力／1",
      "エ": "慣性力／粘性力／10",
      "オ": "慣性力／粘性力／100"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "レイノルズ数は慣性力と粘性力の比で、円管では Re＝ρuD/μ である。流量 Q＝πD²u/4 により Re＝4ρQ/(πμD) となり、条件1は粘度も直径も条件2の1/10なので100倍になる。",
    "choiceExplanations": {
      "ア": "レイノルズ数の分子は慣性力であり、粘性の小さい条件1では条件2より大きくなる。",
      "イ": "倍率の100は合っているが、レイノルズ数は慣性力を粘性力で割って表される。",
      "ウ": "密度と体積流量が同じでも、粘度と管径が異なるのでレイノルズ数は同じにならない。",
      "エ": "粘度の比だけでなく、流量一定のもとで管径が変わることによる平均流速と代表長さの効果も入る。",
      "オ": "レイノルズ数は慣性力と粘性力の比で、円管では Re＝ρuD/μ である。流量 Q＝πD²u/4 により Re＝4ρQ/(πμD) となり、条件1は粘度も直径も条件2の1/10なので100倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q040",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "工業化学・化学工学",
    "topicTags": [
      "連続撹拌槽の単槽と直列槽",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "反応器に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「A から C が生成する反応は、次の反応で表される液相一次反応であるとする。\nA→C　−r_A＝kC_A、k＝1.00×10⁻²\nここで、r_A は A の反応速度［mol·m⁻³·s⁻¹］、k は反応速度定数［s⁻¹］、C_A は A の濃度［mol·m⁻³］を表す。\nこの反応を、（1）体積 3.00 m³ の1個の連続槽型反応器で行う場合と、（2）体積 1.00 m³ の連続槽型反応器を3個直列に接続して行う場合について考える。反応器に投入する原料は A のみで、その濃度が 2.00×10² mol·m⁻³、体積流量が 1.00×10⁻² m³·s⁻¹ であるとき、（1）での A の反応率は［㋐］、（2）での A の反応率は［㋑］となる。ただし、ここで用いた連続槽型反応器内は完全混合流れであるものとする。」",
    "choices": {
      "ア": "0.250／0.125",
      "イ": "0.250／0.875",
      "ウ": "0.750／0.125",
      "エ": "0.750／0.875",
      "オ": "0.750／1.00"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "完全混合槽の収支から各槽の出口と入口の濃度の比は 1/(1＋kV/Q) となる。単槽では1/4、直列3槽では (1/2)³ が未反応で残り、反応率は0.750と0.875となる。",
    "choiceExplanations": {
      "ア": "どちらの値も原料に対する未反応の割合であり、反応率は1からそれぞれを引く。",
      "イ": "単槽で出口濃度が入口の0.250倍になるので、A の反応率は 1−0.250＝0.750 である。",
      "ウ": "単槽の反応率は正しいが、直列槽の0.125は各槽通過後に残る割合 (1/2)³ である。",
      "エ": "完全混合槽の収支から各槽の出口と入口の濃度の比は 1/(1＋kV/Q) となる。単槽では1/4、直列3槽では (1/2)³ が未反応で残り、反応率は0.750と0.875となる。",
      "オ": "有限の滞留時間の完全混合槽では A の出口濃度は正であり、3槽を通っても反応率はちょうど1にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q041",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "EDTA逆滴定による酸化アルミニウム定量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ケイ酸アルミン酸マグネシウムは、酸化アルミニウム（Al₂O₃）、酸化マグネシウム（MgO）、二酸化ケイ素（SiO₂）を含み、制酸剤として用いられている。第十八改正日本薬局方では、ケイ酸アルミン酸マグネシウム中の酸化アルミニウムの定量法について、次のように規定されている。\n「定量法（1）酸化アルミニウム\n本品約1.25 gを精密に量り、3 mol/L塩酸試液10 mL及び水50 mLを加え、水浴上で15分間加熱する。この液に塩酸8 mLを加え、水浴上で10分間加熱する。冷後、250 mLのメスフラスコに移し、更に水で洗い込み、水を加えて250 mLとする。この液を遠心分離し、上澄液を試料溶液とする。試料溶液20 mLを正確に量り、0.05 mol/Lエチレンジアミン四酢酸二水素二ナトリウム液20 mLを正確に加える。この液にpH 4.8の酢酸・酢酸アンモニウム緩衝液15 mL及び水20 mLを加えた後、5分間煮沸する。冷後、エタノール50 mLを加え、0.05 mol/L硫酸亜鉛液で滴定する（指示薬：ジチゾン試液2 mL）。ただし、滴定の終点は液の淡暗緑色が淡赤色に変わるときとする。同様の方法で空試験を行う。」\nケイ酸アルミン酸マグネシウム1.250 gを精密に量り、上記の定量法を行った結果、本試験の滴定量は10.5 mL、空試験の滴定量は22.7 mLであった。この時、ケイ酸アルミン酸マグネシウム中の酸化アルミニウム（Al₂O₃：102.0）の含量［%］として最も妥当なのはどれか。\nただし、0.05 mol/Lエチレンジアミン四酢酸二水素二ナトリウム液のファクターを0.970、0.05 mol/L硫酸亜鉛液のファクターを1.030とする。",
    "choices": {
      "ア": "2.56",
      "イ": "16.0",
      "ウ": "30.2",
      "エ": "32.0",
      "オ": "64.1"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "公式正答は、亜鉛液の滴定量差から求まる Al 約0.628 mmol を 250/20 倍し、Al₂O₃ への換算で2で割ると、試料1.250 g中に約0.401 gとなることに対応する。提示された空試験の亜鉛液の当量は添加 EDTA の当量を上回るため、ここでは設問の滴定量差を用いた。",
    "choiceExplanations": {
      "ア": "2.56% は20 mLの分取液中の量を試料全体の質量と比べた値で、250/20 倍の換算が必要である。",
      "イ": "Al₂O₃ 1 mol は Al を2 mol含むのでアルミニウムの物質量を2で割るが、その係数を二重に適用する理由はない。",
      "ウ": "滴定量の差に掛けるのは滴定液である硫酸亜鉛液のファクター1.030であり、EDTA液の0.970ではない。",
      "エ": "公式正答は、亜鉛液の滴定量差から求まる Al 約0.628 mmol を 250/20 倍し、Al₂O₃ への換算で2で割ると、試料1.250 g中に約0.401 gとなることに対応する。提示された空試験の亜鉛液の当量は添加 EDTA の当量を上回るため、ここでは設問の滴定量差を用いた。",
      "オ": "差から求まるのは Al の物質量であり、Al₂O₃ の物質量へ直すときに Al 原子2個分で割らないと約2倍に見積もってしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q042",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "画像診断の物理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "物理的診断法（画像診断法）に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ MRI 診断法では、高磁場中でラーモア歳差運動と同じ周波数のラジオ波を試料に照射する。\n㋑ 超音波診断法では、人間の耳に聞こえない2〜10 kHzの超音波が用いられる。\n㋒ X線撮影法では、ヨウ素化合物やバリウム化合物を造影剤として用いることができる。\n㋓ PET 法では、標識薬物から放出された陽電子を直接検出する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "MRI は核スピンのラーモア周波数で共鳴させる。ヨウ素やバリウムはX線の吸収が比較的強く、造影のコントラストを高める。",
    "choiceExplanations": {
      "ア": "MRI の説明は合うが、画像診断に用いられる超音波は通常 MHz 帯で、2〜10 kHz は可聴帯域に含まれる。",
      "イ": "MRI は核スピンのラーモア周波数で共鳴させる。ヨウ素やバリウムはX線の吸収が比較的強く、造影のコントラストを高める。",
      "ウ": "X線の造影剤については妥当だが、2〜10 kHz は周波数が低すぎて医用画像の診断用超音波とはいえない。",
      "エ": "超音波診断には MHz 帯を使い、PET では陽電子が電子と消滅する際に出る2本のγ線を検出する。",
      "オ": "ヨウ素・バリウムは造影に使われるが、PET で直接検出するのは陽電子そのものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q043",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "クロマトグラフィーの分離係数と分離度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "同一の分離条件で二つの物質を分離した際の、クロマトグラフィーの分離パラメーターに関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 二つの物質の保持時間が等しいとき、分離係数（α）は1となる。\n㋑ 同じ保持時間ならば、ピークの幅が小さいほど理論段数（N）は小さくなる。\n㋒ 二つの物質の保持時間の差が同じならば、ピークの幅が小さいほど分離度（Rₛ）は大きくなる。\n㋓ 同じ理論段数のカラムであれば、カラムの長さが長いほど、理論段高さ（H）は大きくなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "公式正答は㋐と㋒で、保持係数の比は等しい保持時間で1になり、一定の保持時間差に対してピークが狭いほど分離度が上がる。ただし標準的な定義 H＝L/N を使えば、段数 N が同じときにカラム長 L とともに H が増える㋓も成り立つ。",
    "choiceExplanations": {
      "ア": "保持時間が等しく保持係数が正なら α は1だが、ピークが狭くなると理論段数は大きくなる。",
      "イ": "公式正答は㋐と㋒で、保持係数の比は等しい保持時間で1になり、一定の保持時間差に対してピークが狭いほど分離度が上がる。ただし標準的な定義 H＝L/N を使えば、段数 N が同じときにカラム長 L とともに H が増える㋓も成り立つ。",
      "ウ": "㋒は妥当だが、理論段数 N は保持時間が一定ならピーク幅の二乗に反比例する。",
      "エ": "㋑は幅の効果の向きが逆なので妥当でない。㋓は標準式 H＝L/N と整合するが、公式正答には入っていない。",
      "オ": "㋒と㋓はいずれも通常の定義と整合するが、保持係数が正で同じ保持時間なら㋐も成立するため、「妥当なもののみ」の全てを選ぶ組合せにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q044",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "芳香族置換とベックマン転位",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の反応㋐、㋑、㋒の生成物のうち、主生成物の構造として妥当なもののみを全て挙げているのはどれか。\nただし、各反応は必要に応じて適切な後処理を行ったものとする。\n㋐ 求電子置換\n㋑ Beckmann 転位\n㋒ エポキシドの開環",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "フランへの求電子置換は酸素に隣接する2位で起こりやすい。シクロヘキサノンオキシムの転位では環の一方の結合が窒素へ移動し、七員環の ε-カプロラクタムができる。",
    "choiceExplanations": {
      "ア": "フランの2位のアシル化は妥当であり、㋑の環拡大でラクタムを生じる反応も妥当である。",
      "イ": "フランへの求電子置換は酸素に隣接する2位で起こりやすい。シクロヘキサノンオキシムの転位では環の一方の結合が窒素へ移動し、七員環の ε-カプロラクタムができる。",
      "ウ": "ベックマン転位の生成物は正しいが、フランの隣接炭素が求電子アシル化される㋐も正しい。",
      "エ": "㋑は適切だが、ナフタレン1,2-オキシドの酸性条件下の転位では主に1-ナフトールが生成し、図の2-ナフトールは主生成物ではない。",
      "オ": "図の水酸基はナフタレンの2位にあるが、ナフタレン1,2-オキシドからは1位のフェノールが主に得られる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q044.webp"
    ],
    "imageAltTexts": [
      "フランの求電子置換、ベックマン転位、ナフタレンオキシドの開環の生成物候補"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q045",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "ビタミンK₁の構造と作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の構造式で表される生体関連物質に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\nただし、構造式中の番号は、炭素鎖の位置番号を示す。\n㋐ α-トコフェロールである。\n㋑ 破線で囲まれた部分はナフトキノンである。\n㋒ 生体内で酵素により酸化されて作用を示す。\n㋓ 炭素鎖の立体配置は (2E, 7R, 11R) である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "環は1,4-ナフトキノン骨格で、長鎖をもつフィロキノンの構造である。二重結合の高順位基は反対側で E、その後の二つの不斉炭素は図の結合方向からいずれも R となる。",
    "choiceExplanations": {
      "ア": "破線のナフトキノンは正しいが、この構造はビタミンEの α-トコフェロールではなく、ビタミンK₁である。",
      "イ": "α-トコフェロールの環構造とは異なり、このビタミンが補酵素として使われるときは還元型が作用する。",
      "ウ": "ナフトキノン環は妥当だが、γ-カルボキシ化に使われる活性型は還元型のヒドロキノンである。",
      "エ": "環は1,4-ナフトキノン骨格で、長鎖をもつフィロキノンの構造である。二重結合の高順位基は反対側で E、その後の二つの不斉炭素は図の結合方向からいずれも R となる。",
      "オ": "側鎖の配置は妥当だが、作用に使われるビタミンKの還元型は、反応に伴って酸化されエポキシドへ変わる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q045.webp"
    ],
    "imageAltTexts": [
      "ナフトキノン環と位置番号2、7、11を示すビタミンK₁の構造式"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q046",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "分析化学・薬化学",
    "topicTags": [
      "カテコールアミン生合成",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図はカテコールアミン類の生合成に関係する酵素による反応を表している。図中の㋐〜㋓について、当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "ヒドロキシ化／脱炭酸／ヒドロキシ化／N-メチル基転移",
      "イ": "ヒドロキシ化／アミノ化／N-メチル基転移／ヒドロキシ化",
      "ウ": "アミノ化／脱炭酸／ヒドロキシ化／N-メチル基転移",
      "エ": "アミノ化／ヒドロキシ化／脱炭酸／ヒドロキシ化",
      "オ": "脱炭酸／アミノ化／N-メチル基転移／ヒドロキシ化"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "チロシンは水酸化されて L-ドパとなり、L-ドパは脱炭酸されてドパミンとなる。続いて β 位の水酸化でノルアドレナリンができ、その窒素へのメチル基転移でアドレナリンができる。",
    "choiceExplanations": {
      "ア": "チロシンは水酸化されて L-ドパとなり、L-ドパは脱炭酸されてドパミンとなる。続いて β 位の水酸化でノルアドレナリンができ、その窒素へのメチル基転移でアドレナリンができる。",
      "イ": "L-ドパとドパミンの違いはカルボキシ基の有無であり、新たにアミノ基が入る反応ではない。",
      "ウ": "最初の反応は芳香環への水酸基の導入で、チロシンにもともと含まれるアミノ基を新たにつける反応ではない。",
      "エ": "ドパミンの側鎖に水酸基が導入されてノルアドレナリンになり、この段階で二酸化炭素は脱離しない。",
      "オ": "L-ドパにはカルボキシ基が残り、アドレナリンの生成ではアミノ基の窒素にメチル基が加わる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q046.webp"
    ],
    "imageAltTexts": [
      "チロシンからアドレナリンまでの四段階の生合成"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q047",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "心不全治療薬の作用機序",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "心不全とその治療薬に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 左室駆出率は、心臓の収縮力の指標の一つである。\n㋑ 収縮機能が低下した心不全の治療に、β遮断薬であるカルベジロールが用いられる。\n㋒ イバブラジンは、Na⁺/グルコース共輸送体2（SGLT2）を阻害する。\n㋓ ベルイシグアトは、細胞内カルシウム流入を介して収縮力を増強する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "左室駆出率は左室が拡張末期に収める血液のうち拍出した割合で、収縮機能の評価に用いられる。カルベジロールは β 遮断作用をもち、収縮機能が低下した慢性心不全に用いられる。",
    "choiceExplanations": {
      "ア": "左室駆出率は左室が拡張末期に収める血液のうち拍出した割合で、収縮機能の評価に用いられる。カルベジロールは β 遮断作用をもち、収縮機能が低下した慢性心不全に用いられる。",
      "イ": "駆出率については妥当だが、イバブラジンは洞結節の If 電流を阻害して心拍数を低下させる薬である。",
      "ウ": "ベルイシグアトは可溶性グアニル酸シクラーゼを刺激し、cGMP の産生を高める。",
      "エ": "カルベジロールの適応に関する記述は妥当である一方、ベルイシグアトはカルシウム流入による強心薬ではない。",
      "オ": "洞結節の If 電流を抑えるイバブラジンと、NO–sGC–cGMP 経路に作用するベルイシグアトの両方について機序が誤っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q048",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "アトピー性皮膚炎の標的治療",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "アトピー性皮膚炎とその治療薬に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ アトピー性皮膚炎は、皮膚のバリア機能が亢進しているため、それを抑制することにより治療する。\n㋑ デュピルマブ注射液は、IL-4、IL-13などのⅡ型アレルギー反応を阻害することにより炎症を抑制して治療する。\n㋒ バリシチニブ錠は、ヤヌスキナーゼ（JAK）を阻害することにより炎症を抑制して治療する。\n㋓ タクロリムス軟膏は、カルシニューリンを阻害することにより炎症を抑制して治療する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "バリシチニブは JAK1・JAK2 を阻害して炎症性のシグナル伝達を抑える。タクロリムスはカルシニューリン阻害によりT細胞の活性化や炎症性サイトカイン産生を抑える。",
    "choiceExplanations": {
      "ア": "皮膚バリアの機能は低下するので、保湿などで保護・補強する。また、デュピルマブが抑える IL-4・IL-13 の経路は2型炎症であり、Ⅱ型アレルギーとは異なる。",
      "イ": "バリシチニブの機序は妥当だが、皮膚のバリア機能は亢進するのでなく低下する。",
      "ウ": "タクロリムスの機序は合っているが、アトピー性皮膚炎では皮膚バリアを抑えることを治療の目的としない。",
      "エ": "デュピルマブは IL-4 受容体αを介する2型炎症を抑えるが、抗体が細胞表面を標的とする分類上のⅡ型アレルギーを抑えるという説明は妥当でない。",
      "オ": "バリシチニブは JAK1・JAK2 を阻害して炎症性のシグナル伝達を抑える。タクロリムスはカルシニューリン阻害によりT細胞の活性化や炎症性サイトカイン産生を抑える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q049",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "子宮がんとHPVワクチン",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "子宮がんとその治療薬に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 子宮体がんの主な原因は、ヒトパピローマウイルスである。\n㋑ 子宮体がんは腺がんであるのに対して、子宮頸がんの多くは扁平上皮がんである。\n㋒ ヒトパピローマウイルスワクチン（2価）は、16型と18型のヒトパピローマウイルスの感染を予防する。\n㋓ 子宮がんに対する薬物治療では、抗がん薬のシスプラチンと抗ウイルス薬のソホスブビルが併用されることがある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "子宮体がんの多くは子宮内膜由来の腺がんで、子宮頸がんでは扁平上皮がんが最も多い。2価ワクチンは発がん性が高い HPV 16型・18型を標的とする。",
    "choiceExplanations": {
      "ア": "子宮体がんの多くが腺がんなのは妥当だが、高リスク型 HPV の持続感染と強く関係するのは主に子宮頸がんである。",
      "イ": "2価 HPV ワクチンの型は合っているが、子宮内膜に生じる体がんの主な原因を HPV とする点が誤りである。",
      "ウ": "子宮体がんの多くは子宮内膜由来の腺がんで、子宮頸がんでは扁平上皮がんが最も多い。2価ワクチンは発がん性が高い HPV 16型・18型を標的とする。",
      "エ": "組織型については妥当だが、ソホスブビルはC型肝炎ウイルスの治療薬で、子宮がんのシスプラチン併用薬ではない。",
      "オ": "ワクチンに関する㋒は妥当だが、ソホスブビルは HPV や子宮がんの標準的な治療薬ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q050",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "緑内障治療薬と房水動態",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "緑内障とその治療薬に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 閉塞隅角緑内障においては、視神経の萎縮が生じているため、その伸長を促す硫酸アトロピンを投与する。\n㋑ ラタノプロストは、プロスタノイド受容体に作用し、ぶどう膜強膜流出路からの房水の流出を促進することにより、眼圧下降効果を示す。\n㋒ カルテオロールは、毛様体の β 受容体に作用し、眼圧下降効果を示すが、全身性の副作用を発現させる可能性がある。\n㋓ アセタゾラミドは、ぶどう膜のプロスタグランジン E2 受容体に作用し、線維柱帯流出路からの房水の流出を促進することにより、眼圧下降効果を示す。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ラタノプロストは FP 受容体を介してぶどう膜強膜流出を増やす。カルテオロールは毛様体の β 受容体を遮断して房水産生を抑え、吸収されると徐脈などの全身作用が起こり得る。",
    "choiceExplanations": {
      "ア": "ラタノプロストの作用は妥当だが、アトロピンによる散瞳は狭い隅角をさらに閉塞させる可能性がある。",
      "イ": "カルテオロールは β 遮断薬として房水の産生を減らすが、アトロピンは視神経の伸長を促す薬ではない。",
      "ウ": "ラタノプロストは FP 受容体を介してぶどう膜強膜流出を増やす。カルテオロールは毛様体の β 受容体を遮断して房水産生を抑え、吸収されると徐脈などの全身作用が起こり得る。",
      "エ": "ラタノプロストは合っているが、アセタゾラミドは炭酸脱水酵素を阻害して房水産生を減らす。",
      "オ": "カルテオロールの説明は妥当だが、アセタゾラミドによる眼圧低下は房水流出の促進ではなく産生抑制による。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q051",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "睡眠薬の受容体と作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "睡眠薬に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ ゾルピデムは、GABA_A 受容体を遮断し、その催眠作用は長時間持続する。\n㋑ スボレキサントは、オレキシン受容体を遮断し、中〜長時間覚醒状態を抑制する。\n㋒ ラメルテオンは、メラトニン受容体を遮断し、入眠困難を改善する。\n㋓ サリドマイドは、睡眠薬として開発されたが、催奇形性を示すことが分かり社会問題となった。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "スボレキサントは覚醒を維持するオレキシン受容体を遮断する。サリドマイドは鎮静・催眠薬として使われた時期があり、胎児への催奇形性が明らかになった。",
    "choiceExplanations": {
      "ア": "スボレキサントは妥当だが、ゾルピデムは GABA_A 受容体を遮断せず、抑制性の GABA 作用を強める短時間作用型の薬である。",
      "イ": "ゾルピデムは GABA の作用を増強し、ラメルテオンはメラトニン MT1・MT2 受容体を刺激する。",
      "ウ": "サリドマイドの歴史は合うが、ゾルピデムの機序も作用時間も㋐の説明とは異なる。",
      "エ": "スボレキサントは覚醒を維持するオレキシン受容体を遮断する。サリドマイドは鎮静・催眠薬として使われた時期があり、胎児への催奇形性が明らかになった。",
      "オ": "ラメルテオンはメラトニン受容体作動薬であり、遮断して入眠を改善する薬ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q052",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "薬理学",
    "topicTags": [
      "薬物輸送体と相互作用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "薬物トランスポーターに関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ グレープフルーツジュースには、P-糖タンパク質 MDR1 などのトランスポーターの機能を阻害する成分が含まれており、薬物の消化管吸収に影響を与える。\n㋑ 有機アニオントランスポーター OATP1B1 は、HMG-CoA 還元酵素阻害薬（スタチン系薬）の肝細胞への取り込みに関わるが、その低下につながる遺伝子多型がある。\n㋒ ベンズブロマロンは尿細管でトランスポーターを阻害して尿酸の再吸収と分泌を阻害するが、再吸収抑制作用がより強い。\n㋓ メトトレキサートはトランスポーターを介して胆汁排泄されるが、この排泄はピペラシリンにより競合的に阻害される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "グレープフルーツの成分は薬物によっては消化管の輸送体に作用して吸収を変える。OATP1B1 をコードする SLCO1B1 の多型には、スタチンの肝取り込みを低下させるものがある。",
    "choiceExplanations": {
      "ア": "グレープフルーツの成分は薬物によっては消化管の輸送体に作用して吸収を変える。OATP1B1 をコードする SLCO1B1 の多型には、スタチンの肝取り込みを低下させるものがある。",
      "イ": "ベンズブロマロンの臨床的な排泄促進作用は、主として近位尿細管で URAT1 が担う尿酸の再吸収の阻害で説明される。尿酸分泌も同時に阻害するという一般化は添付文書上の主作用の説明と異なる。",
      "ウ": "OATP1B1 の説明は正しいが、ベンズブロマロンの主な薬効は尿酸の再吸収を抑えることであり、尿酸分泌との強さの比較で規定されない。",
      "エ": "㋑は妥当だが、ピペラシリンとの相互作用で問題になるのはメトトレキサートの腎尿細管分泌の遅延である。",
      "オ": "ピペラシリンにより阻害されるとされる排泄経路は主に腎尿細管分泌であり、㋓が挙げる胆汁への競合的排泄阻害とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q053",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "製剤と試薬の保存容器",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "医薬品を保存する容器に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 水酸化ナトリウム（粒状）及び塩化カルシウム（粉末）は、密閉容器に保存する。\n㋑ 経口ゼリー剤は、水分の蒸散が品質に影響を与える場合には低水蒸気透過性の気密容器に保存する。\n㋒ 吸入エアゾール剤は、気密容器に保存する。\n㋓ チンキ剤は、気密容器に入れ、火気を避けて保存する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "日本薬局方では経口ゼリー剤は通常気密容器とし、水分の蒸散が品質に影響するときは低水蒸気透過性の容器や包装を用いる。エタノールなどを含むチンキ剤は気密容器で火気を避けて保存する。",
    "choiceExplanations": {
      "ア": "経口ゼリー剤については妥当だが、水酸化ナトリウムや塩化カルシウムは吸湿性があり、空気中の水分を防ぐには密閉容器より厳しい気密性が必要である。",
      "イ": "吸湿する固体の容器については水蒸気を防ぐ必要があり、吸入エアゾール剤には噴射剤を安全に保持する耐圧性の密封容器を用いる。",
      "ウ": "経口ゼリー剤の保管は妥当だが、加圧噴射剤を含む吸入エアゾール剤には耐圧性の密封容器が指定される。",
      "エ": "日本薬局方では経口ゼリー剤は通常気密容器とし、水分の蒸散が品質に影響するときは低水蒸気透過性の容器や包装を用いる。エタノールなどを含むチンキ剤は気密容器で火気を避けて保存する。",
      "オ": "チンキ剤の条件は合うが、吸入エアゾール剤の容器は気密容器というだけでは不十分で、通常は耐圧性の密封容器である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q054",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "放出制御製剤と腸溶性高分子",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "医薬品の放出制御に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 膜制御型（リザーバー型）放出制御システムでは、リザーバー内の薬物濃度が飽和状態にある期間は薬物放出速度が0次放出となるため、放出速度は膜の厚さで制御する。\n㋑ マトリックス型放出制御製剤からの薬物放出が Higuchi 式に従うとき、「マトリックス中に溶解している薬物と固体として分散している薬物の全濃度」＜「マトリックス中の薬物の溶解度」となっている。\n㋒ 乳酸・グリコール酸共重合体（PLGA）を利用した微粒子製剤は、持続型皮下注射剤として投与後、生体内で加水分解される。\n㋓ ヒプロメロースフタル酸エステルは、セラセフェートよりも高い pH で溶解する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "リザーバーの薬物濃度が飽和していれば濃度差をほぼ維持でき、膜厚で拡散速度を調節できる。PLGA はエステル結合が水で切断される生分解性高分子である。",
    "choiceExplanations": {
      "ア": "膜制御の説明は妥当だが、典型的な Higuchi モデルでは初期薬物濃度は溶解度より高く、未溶解の薬物が存在する。",
      "イ": "リザーバーの薬物濃度が飽和していれば濃度差をほぼ維持でき、膜厚で拡散速度を調節できる。PLGA はエステル結合が水で切断される生分解性高分子である。",
      "ウ": "PLGA の加水分解は妥当だが、固体薬物の分散を前提とする Higuchi 式では全濃度と溶解度の大小が逆である。",
      "エ": "薬物の全濃度が溶解度を上回る条件が典型的で、ヒプロメロースフタル酸エステルは一般にセラセフェートより低い pH で溶けるグレードがある。",
      "オ": "PLGA は妥当だが、腸溶性のヒプロメロースフタル酸エステルの溶解開始 pH をセラセフェートより高いとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q055",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "一次分解と飽和懸濁系の分解",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある医薬品の分解速度に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「医薬品 A は分解速度定数 k₁＝5.57×10⁻³［min⁻¹］で分解する。このとき、医薬品 A の半減期は［㋐］minである。\nまた、医薬品 B 720 mgを含む10.0 mLの水溶液を調製した。医薬品 B の水溶液中における分解は1次反応式（分解速度定数 k₂＝0.500［h⁻¹］）に従う。また、同一条件下において測定した医薬品 B の溶解度は4.00 w/v%であり、その溶解速度は分解速度に比べて十分に速かった。\n医薬品 B の濃度が溶解度に到達する時間は［㋑］hであり、医薬品 B の濃度が4.00 w/v%から1.00 w/v%にまで分解するのに要する時間は［㋒］hである。ただし、ln 2＝0.693、ln 10＝2.30 とする。」",
    "choices": {
      "ア": "93.4／1.60／2.77",
      "イ": "93.4／4.80／4.14",
      "ウ": "124／1.60／2.77",
      "エ": "124／3.20／1.38",
      "オ": "187／4.80／1.38"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "A の半減期は ln 2/k₁≃124 min である。B の初期量のうち溶解度を超える320 mgが 0.500×400 mg/h で減るのに1.60 hかかり、飽和後に濃度が1/4になるには ln 4/0.500≃2.77 hかかる。",
    "choiceExplanations": {
      "ア": "B の二つの時間は合っているが、A の半減期は 0.693/(5.57×10⁻³)≃124 min である。",
      "イ": "飽和時に溶けた B は400 mgで、分解が始まってから余分な固体320 mgが消えるまでの時間は4.80時間もかからない。",
      "ウ": "A の半減期は ln 2/k₁≃124 min である。B の初期量のうち溶解度を超える320 mgが 0.500×400 mg/h で減るのに1.60 hかかり、飽和後に濃度が1/4になるには ln 4/0.500≃2.77 hかかる。",
      "エ": "1.38 h は B の濃度が半分になる時間であり、4.00 w/v%から1.00 w/v%には半減期が2回分必要である。",
      "オ": "A の半減期には 1/k₁ そのものではなく ln 2/k₁ を使う。B も飽和している間と飽和を下回ってからで別々に計算する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q056",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "腎クリアランスと糸球体ろ過",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "医薬品の排泄に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 全身クリアランスにおいて、腎クリアランスと代謝クリアランスは相乗的に作用する。\n㋑ 健常人の1分間当たりの腎血流量は100〜130 mLである。\n㋒ 糸球体ろ過は、糸球体毛細血管内圧によって生じ、毛細血管内膠質浸透圧及びボーマン嚢内圧の影響を受ける。\n㋓ フェノバルビタールの腎クリアランスは、アセタゾラミドの併用により増大する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "糸球体の静水圧はろ過を進め、血漿膠質浸透圧やボーマン嚢内圧はこれに抗する。アセタゾラミドで尿がアルカリ性に傾くと弱酸性のフェノバルビタールがイオン化し、尿細管から再吸収されにくくなる。",
    "choiceExplanations": {
      "ア": "腎排泄と代謝による全身クリアランスへの寄与は基本的に加算される。また100〜130 mL/minは腎血流量ではなく糸球体ろ過量に近い。",
      "イ": "ろ過圧の説明は妥当だが、腎と代謝のクリアランスは並列の消失経路として足し合わせる。",
      "ウ": "100〜130 mL/minは成人の糸球体ろ過量の目安であり、腎血流量はその数倍から十倍程度である。",
      "エ": "フェノバルビタールの排泄については妥当だが、腎血流と、血漿からろ過される量は異なる指標である。",
      "オ": "糸球体の静水圧はろ過を進め、血漿膠質浸透圧やボーマン嚢内圧はこれに抗する。アセタゾラミドで尿がアルカリ性に傾くと弱酸性のフェノバルビタールがイオン化し、尿細管から再吸収されにくくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q057",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "化審法における化学物質の分類と試験",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "「化学物質の審査及び製造等の規制に関する法律」に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 難分解・高蓄積・人又は高次捕食動物への長期毒性がある化学物質は、第一種特定化学物質として規制される。\n㋑ ペルフルオロオクタン酸やペルフルオロ（オクタン-1-スルホン酸）は特定一般化学物質であり、必要不可欠な用途以外は、これを使用した製品の製造・輸入が禁止されている。\n㋒ 難分解・高蓄積ではあるが、人又は高次捕食動物への長期毒性が不明な化学物質は、第二種特定化学物質として規制され、試験研究以外の目的でこれを輸入した者は、毎年度輸入数量を経済産業大臣に届け出なければならない。\n㋓ 新規化学物質の判定に際し、微生物等による化学物質の分解度試験や、魚介類の体内における化学物質の濃縮度試験又は1-オクタノールと水との間の分配係数測定試験などが行われる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "第一種特定化学物質の要件には難分解性、高蓄積性、人または高次捕食動物への長期毒性がある。新規物質の審査では生分解性や生物濃縮性などを試験で評価する。",
    "choiceExplanations": {
      "ア": "㋐は妥当だが、PFOA や PFOS は規制対象となる第一種特定化学物質であり、㋑の区分が異なる。",
      "イ": "第一種特定化学物質の要件には難分解性、高蓄積性、人または高次捕食動物への長期毒性がある。新規物質の審査では生分解性や生物濃縮性などを試験で評価する。",
      "ウ": "PFOA・PFOS の区分が違い、難分解・高蓄積で長期毒性不明の物質は監視化学物質に指定され得る。",
      "エ": "新規物質の審査項目は妥当だが、PFOA・PFOS の法令上の区分は第一種特定化学物質である。",
      "オ": "㋓は妥当だが、㋒の性状は第二種特定化学物質ではなく監視化学物質に該当し得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q058",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "薬剤学・衛生化学",
    "topicTags": [
      "高齢者医療と介護保険制度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の老人保健に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 後期高齢者医療制度では、医療費の窓口負担割合は一律である。\n㋑ 総人口に占める65歳以上の人口の割合は、令和5年10月1日現在、25%を超えている。\n㋒ 令和元年度に、税金と50歳以上の人が支払う保険料で運営される介護保険制度が発足した。\n㋓ 介護保険制度における介護度認定について、要介護状態は5段階に、要支援状態は2段階に区分されている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "令和5年10月1日の65歳以上人口の割合は29.1%である。介護保険では要介護1〜5と要支援1・2を区分している。",
    "choiceExplanations": {
      "ア": "65歳以上の割合は25%を超えるが、後期高齢者医療の窓口負担は所得に応じて1割、2割、3割に分かれる。",
      "イ": "介護度の区分は妥当だが、窓口負担割合は一定ではなく所得で変わる。",
      "ウ": "介護保険制度は平成12年の2000年度に始まり、原則40歳以上が保険料を負担する。",
      "エ": "令和5年10月1日の65歳以上人口の割合は29.1%である。介護保険では要介護1〜5と要支援1・2を区分している。",
      "オ": "認定の区分は妥当だが、制度の開始年度も介護保険の加入・保険料負担が始まる年齢も㋒とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q059",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "食品多糖とタンパク質のゲル化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "食品のゲル化に関する記述㋐〜㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 寒天は、紅藻類の細胞壁成分を抽出したもので、ガラクトース及びその誘導体を基本単位とする。\n㋑ ゼラチンは、動物の皮膚、骨等に含まれるグリコーゲンを熱加水分解して可溶化して得る。\n㋒ グルコマンナンは、グルコースとマンノースで構成される。水を加えて糊状になったところに消石灰を加え加熱するとゲル化する。\n㋓ アルギン酸は、褐藻類に含有される多糖類で、カルシウムイオンを加えるとゲル化する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒、㋓",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "寒天は紅藻類から得られるガラクトース系の多糖類である。グルコマンナンはアルカリと加熱でゲル化し、アルギン酸はカルシウムイオンで分子鎖が架橋されてゲルになる。",
    "choiceExplanations": {
      "ア": "寒天の説明は妥当だが、ゼラチンの原料はグリコーゲンではなく構造タンパク質のコラーゲンである。",
      "イ": "寒天は紅藻類から得られるガラクトース系の多糖類である。グルコマンナンはアルカリと加熱でゲル化し、アルギン酸はカルシウムイオンで分子鎖が架橋されてゲルになる。",
      "ウ": "寒天とアルギン酸は妥当だが、こんにゃくのグルコマンナンを消石灰と加熱でゲル化する㋒も妥当である。",
      "エ": "㋒は妥当だが、グリコーゲンは貯蔵多糖であり、ゼラチンの原料にはならない。",
      "オ": "二つの多糖のゲル化は合っているが、㋑ではコラーゲンをグリコーゲンと取り違えている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q060",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "JAS・コーデックスと食品安全管理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "食品の規格に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「食品の規格には、“農林物資の規格化及び品質表示の適正化に関する法律”に基づいて決められている［㋐］、その他国際的な規格としては FAO（国連食糧農業機関）と WHO（世界保健機関）が合同で設置した国際食品規格委員会による［㋑］などがある。ISO 22000 は、食品安全マネジメントシステムの規格であり、［㋒］システムを国際標準化機構による ISO のシステムに組み込んだものである。」",
    "choices": {
      "ア": "CODEX／JAS／GAP",
      "イ": "CODEX／JAS／HACCP",
      "ウ": "JAS／CODEX／GAP",
      "エ": "JAS／CODEX／HACCP",
      "オ": "JAS／CODEX／PDCA"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "JAS は国内、CODEX は国際食品規格であり、ISO 22000 は HACCP の原則を食品安全マネジメントに組み込んでいる。設問が引用する国内法名は旧称で、現行名は「日本農林規格等に関する法律」である。",
    "choiceExplanations": {
      "ア": "JAS は国内の日本農林規格であり、CODEX は FAO・WHO の合同委員会による国際食品規格である。",
      "イ": "HACCP は妥当だが、国内の食品規格と国際食品規格の名称が逆である。",
      "ウ": "国内と国際の規格の対応は合うが、ISO 22000 が取り込む危害要因分析と重要管理点の考え方は HACCP である。",
      "エ": "JAS は国内、CODEX は国際食品規格であり、ISO 22000 は HACCP の原則を食品安全マネジメントに組み込んでいる。設問が引用する国内法名は旧称で、現行名は「日本農林規格等に関する法律」である。",
      "オ": "PDCA はマネジメントの運用サイクルであり、食品の危害要因を管理する手法として設問が問う HACCP とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q061",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "フックの法則と食品のせん断ひずみ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "食品の物性に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「食パンやゼリーなどのような弾性を有する物体（弾性体）に外力を加えると変形が生じ、外力を取り除くと元に戻る。変形が小さい場合、弾性体の単位面積当たりにかかる力（応力）と、弾性体の単位長さ当たりの変形量（ひずみ）の間には比例関係が成立し、これを［㋐］の法則という。このときの比例定数は、変形が伸び変形及び圧縮変形の場合［㋑］率といい、せん断変形の場合［㋒］率という。\n下図に示した、高さ13 mmのゼリーの底面を固定し、矢印の方向の外力を加えたとき、点線で表すように変形し、変形の大きさは5.2 mmであった。この変形によるせん断ひずみを計算すると［㋓］である。」",
    "choices": {
      "ア": "フック／ヤング／剛性／0.40",
      "イ": "フック／ヤング／剛性／2.5",
      "ウ": "フック／ヤング／抵抗／2.5",
      "エ": "ヤング／フック／剛性／2.5",
      "オ": "ヤング／フック／抵抗／0.40"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "線形弾性での比例関係をフックの法則と呼び、引張・圧縮ではヤング率、せん断では剛性率を用いる。せん断ひずみは変位を高さで割った 5.2/13＝0.40 である。",
    "choiceExplanations": {
      "ア": "線形弾性での比例関係をフックの法則と呼び、引張・圧縮ではヤング率、せん断では剛性率を用いる。せん断ひずみは変位を高さで割った 5.2/13＝0.40 である。",
      "イ": "名称は合うが、2.5 は高さを変位で割った値であり、せん断ひずみはその逆である。",
      "ウ": "せん断応力とせん断ひずみの比例定数は剛性率であり、ひずみは0.40である。",
      "エ": "法則の名前と引張弾性率の名前を入れ替えている。また、水平変位を高さで割る順序が逆である。",
      "オ": "ひずみは合うが、比例関係をフックの法則と呼び、引張にヤング率、せん断に剛性率を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q061.webp"
    ],
    "imageAltTexts": [
      "高さ13 mmのゼリーを水平方向に5.2 mmせん断した図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q062",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "野菜の含硫成分とカロテノイド",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の化合物㋐、㋑、㋒を多く含む野菜の組合せとして最も妥当なのは次のうちではどれか。",
    "choices": {
      "ア": "ダイコン／タマネギ／トマト",
      "イ": "ダイコン／トマト／タマネギ",
      "ウ": "タマネギ／ダイコン／トマト",
      "エ": "タマネギ／トマト／ダイコン",
      "オ": "トマト／ダイコン／タマネギ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐はタマネギの含硫成分である S-(1-プロペニル)システインスルホキシド、㋑はダイコンに含まれるグルコシノレートである。多数の共役二重結合が連なる㋒はトマトの赤色色素リコペンに当たる。",
    "choiceExplanations": {
      "ア": "トマトの色素は合うが、㋐はタマネギのアミノ酸誘導体で、㋑はダイコンのグルコシノレートである。",
      "イ": "トマトの主要な赤色色素は長い共役二重結合をもつ㋒であり、㋑の含硫配糖体ではない。",
      "ウ": "㋐はタマネギの含硫成分である S-(1-プロペニル)システインスルホキシド、㋑はダイコンに含まれるグルコシノレートである。多数の共役二重結合が連なる㋒はトマトの赤色色素リコペンに当たる。",
      "エ": "㋐の野菜は合うが、グルコシノレートはアブラナ科のダイコンに、リコペンはトマトに多い。",
      "オ": "ダイコンについては妥当だが、トマトに特徴的なものはスルホキシドの㋐ではなくリコペンの㋒である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q062.webp"
    ],
    "imageAltTexts": [
      "㋐の含硫アミノ酸誘導体、㋑の配糖体、㋒の共役ポリエンの構造"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q063",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "バター・チーズ・ヨーグルトの製造",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "乳製品に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ バターは、クリームに物理的な衝撃を与えて脂肪球皮膜を破壊するチャーニング工程を経て製造される油中水滴型（W/O型）のエマルションである。\n㋑ チーズ製造では、レンネットによって β-カゼインの特定の部位が加水分解されて乳が凝固する原理を利用している。\n㋒ ヨーグルト製造では、サーモフィルス菌の生成するギ酸と二酸化炭素がブルガリア菌の発育を促進する一方で、ブルガリア菌が供与するペプチドと遊離アミノ酸がサーモフィルス菌の発育を促進する共生関係にある。\n㋓ アイスミルクは、「乳及び乳製品の成分規格等に関する省令」（乳等省令）に基づき、乳固形分が15%以上、乳脂肪分が8%以上と定められている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "チャーニングで乳脂肪が連続相となるバターは W/O 型である。ヨーグルトでは、サーモフィルス菌が供給するギ酸などとブルガリア菌のタンパク質分解で生じる成分が、互いの増殖を助ける。",
    "choiceExplanations": {
      "ア": "バターの乳化型は合うが、レンネット中のキモシンが主に切断するのは β-カゼインではなく κ-カゼインである。",
      "イ": "チャーニングで乳脂肪が連続相となるバターは W/O 型である。ヨーグルトでは、サーモフィルス菌が供給するギ酸などとブルガリア菌のタンパク質分解で生じる成分が、互いの増殖を助ける。",
      "ウ": "バターの説明は妥当だが、乳固形分15%以上・乳脂肪分8%以上はアイスクリームの規格である。",
      "エ": "両菌が互いの生育を助ける関係は正しいが、チーズの乳凝固では κ-カゼインが切断されカゼインミセルが不安定化する。",
      "オ": "ヨーグルトの説明は妥当だが、アイスミルクは乳固形分10%以上、乳脂肪分3%以上である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q064",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "食品学",
    "topicTags": [
      "食品の脂質と脂溶性ビタミン",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "脂質や脂溶性ビタミンに関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 大豆や卵黄に多く含まれるホスファチジルコリンは、乳化剤として広く使用されている。\n㋑ β-シトステロールは、コレステロールに類似した構造であるため、血中コレステロール濃度を上昇させる働きがある。\n㋒ 多価不飽和脂肪酸が多い牛脂や豚脂は融点が高く室温では固体であるのに対して、長鎖飽和脂肪酸と一価不飽和脂肪酸が多い魚油や大豆油は融点が低く室温では液体である。\n㋓ 糸引き納豆に多く含まれるビタミン K₂ は、骨代謝に関連している。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ホスファチジルコリンは親水性・疎水性の両部位をもつため乳化に使われる。納豆のビタミンK₂は、オステオカルシンなどの γ-カルボキシ化を介して骨代謝に関わる。",
    "choiceExplanations": {
      "ア": "ホスファチジルコリンの用途は妥当だが、β-シトステロールなどの植物ステロールはコレステロールの腸管吸収を抑える方向に働く。",
      "イ": "乳化剤の記述は正しいが、不飽和結合が多い脂肪酸ほど一般に分子が密に並びにくく、融点が低くなる。",
      "ウ": "ホスファチジルコリンは親水性・疎水性の両部位をもつため乳化に使われる。納豆のビタミンK₂は、オステオカルシンなどの γ-カルボキシ化を介して骨代謝に関わる。",
      "エ": "β-シトステロールはコレステロール吸収を抑え、魚油や大豆油は多価不飽和脂肪酸を含むので融点が低い。",
      "オ": "ビタミンK₂の説明は妥当だが、脂の融点が高い理由を多価不飽和脂肪酸の多さに帰すことはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q065",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "土壌の地表熱収支",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "土壌の熱伝導に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「太陽からの純放射により地表で吸収された熱は、地表近傍の土壌水を蒸発させる［㋐］、大気－地表－土壌中の間の温度勾配によって生じる地表から大気への［㋑］、及び土壌中への熱移動の三つの主要な輸送経路がある。土壌中での熱の伝わり方は、熱伝導のしやすさを表す熱伝導率で決定される。一般に、鉱物粒子、土壌水、土壌空気を、熱伝導率が大きい順に並べると［㋒］のようになる。」",
    "choices": {
      "ア": "顕熱移動／潜熱移動／土壌空気＞土壌水＞鉱物粒子",
      "イ": "顕熱移動／潜熱移動／土壌水＞鉱物粒子＞土壌空気",
      "ウ": "顕熱移動／潜熱移動／鉱物粒子＞土壌水＞土壌空気",
      "エ": "潜熱移動／顕熱移動／土壌空気＞土壌水＞鉱物粒子",
      "オ": "潜熱移動／顕熱移動／鉱物粒子＞土壌水＞土壌空気"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "土壌水が気化すると潜熱を運び、温度差で空気が加熱されると顕熱を運ぶ。一般的な土壌中の熱伝導率は鉱物粒子が最も高く、その次が水、最も低いのが空気である。",
    "choiceExplanations": {
      "ア": "水の蒸発には相変化に伴う潜熱が使われ、空気の熱伝導率は三つの中で最も小さい。",
      "イ": "蒸発に伴う熱輸送は潜熱である。また一般に土壌の鉱物粒子は水より熱を通しやすい。",
      "ウ": "熱伝導率の順は合っているが、相変化に伴う潜熱移動と温度差に伴う顕熱移動を入れ替えている。",
      "エ": "熱輸送の種類は合うが、空気は鉱物粒子や水よりはるかに熱を伝えにくい。",
      "オ": "土壌水が気化すると潜熱を運び、温度差で空気が加熱されると顕熱を運ぶ。一般的な土壌中の熱伝導率は鉱物粒子が最も高く、その次が水、最も低いのが空気である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q066",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "土壌侵食と塩類集積",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "土壌侵食や塩類集積等の土壌劣化に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 植生のない地表面への雨滴の衝撃により、土壌団粒から土壌粒子が剝離・飛散してクラストが形成されると、土壌中への雨水の浸透が妨げられて土壌侵食が加速する。\n㋑ 乾燥・半乾燥地域の農地でかんがいなどにより生じるウォーターロギングは、地表に集積した塩類を洗い流す。\n㋒ 土壌に多量の可溶性塩類が含まれると、土壌水の浸透圧が増大することにより作物根の水分吸収が阻害される。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "雨滴で分散した粒子が表層の孔をふさぐと表面流出が増え、土壌侵食が進む。土壌水の塩濃度が増すと浸透ポテンシャルが低下し、根は水を取り込みにくくなる。",
    "choiceExplanations": {
      "ア": "表層がクラストで覆われると浸透が減るが、塩類濃度の上昇で根の吸水が妨げられる㋒も妥当である。",
      "イ": "㋐は妥当だが、排水不良による過湿では塩類が根域の外に流れにくくなる。",
      "ウ": "雨滴で分散した粒子が表層の孔をふさぐと表面流出が増え、土壌侵食が進む。土壌水の塩濃度が増すと浸透ポテンシャルが低下し、根は水を取り込みにくくなる。",
      "エ": "ウォーターロギングで地下水位が上がると、水が地表に移動して蒸発し、塩類が集積することがある。",
      "オ": "㋒は妥当だが、塩類を洗い流すには適切な浸透と排水が必要で、過湿そのものでは達成されない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q067",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "指定混合肥料と被覆肥料",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "肥料に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 肥料取締法から改正された「肥料の品質の確保等に関する法律」では、指定混合肥料制度が新設され、届出により普通肥料と特殊肥料を配合した肥料や、普通肥料と土壌改良資材を配合した肥料を生産できるようになった。\n㋑ 被覆肥料は、水溶性の粒状肥料を合成樹脂等でコーティングしたもので、被膜の微小孔隙や、吸水に伴う被膜の亀裂を利用して、肥料成分を徐々に放出する肥料である。\n㋒ 水稲栽培において、生育後期の穂揃期追肥は、コメの高温障害の一つである白未熟粒の発生を誘引する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "指定混合肥料は定められた原料を配合して届け出ることで生産できる。被覆肥料では水の浸入や溶出の速さが被膜により制御され、成分が徐々に放出される。",
    "choiceExplanations": {
      "ア": "指定混合肥料は定められた原料を配合して届け出ることで生産できる。被覆肥料では水の浸入や溶出の速さが被膜により制御され、成分が徐々に放出される。",
      "イ": "指定混合肥料の説明は合っているが、穂揃期の適切な窒素追肥は高温による白未熟粒を軽減することがある。",
      "ウ": "被覆肥料の放出特性に加え、指定混合肥料の届出制度を述べた㋐も妥当である。",
      "エ": "㋑は妥当だが、白未熟粒は登熟期の高温などで生じ、穂揃期の追肥が一律に発生を誘引するとはいえない。",
      "オ": "適切な追肥は登熟期の窒素不足を緩和するため、白未熟粒を増やすとする㋒は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q068",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "化学物質のリスク指標と閾値",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "化学物質のリスク評価に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 許容一日摂取量（ADI）は、人が生涯にわたり摂取し続けても健康上有害な影響が現れないと考えられる一日当たりの摂取量であり、通常は最小毒性量（LOAEL）を不確実係数で除して求める。\n㋑ リスクの定量的な評価に用いられるハザード比（HQ）が1以上であればリスクがあると判断でき、この値が大きいほど悪影響の発生確率は高くなるため優先的に対策を講じる必要がある。\n㋒ 遺伝毒性をもつ発がん物質は、非常に低い用量でもその影響がみられることから、一般に閾値をもたない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "DNAを直接傷つける遺伝毒性発がん物質では、安全な用量の下限を確認しにくいため、評価では一般に閾値なしと仮定する。",
    "choiceExplanations": {
      "ア": "ADI の出発点には通常、無毒性量（NOAEL）などを用いる。また HQ はばく露量を参照値と比べる指標であり、悪影響の発生確率そのものは示さない。",
      "イ": "遺伝毒性発がん物質の一般的な評価は妥当だが、ADI を通常 LOAEL から求めるとする点が誤りである。",
      "ウ": "HQ が1を超えることは詳しい評価の目安になるが、それだけで悪影響の発生やその確率を確定できない。",
      "エ": "㋒は妥当だが、HQ は基準に対するばく露の比なので、数値の高さを発生確率と直接対応させられない。",
      "オ": "DNAを直接傷つける遺伝毒性発がん物質では、安全な用量の下限を確認しにくいため、評価では一般に閾値なしと仮定する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q069",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "生物的防除と天敵農薬",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生物的防除に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 伝統的生物的防除は、害虫の原産地からその天敵生物を導入して定着させ、害虫の永続的な防除効果を期待する方法であるが、外来天敵の導入による土着生物への悪影響が指摘されている。\n㋑ BT剤は、カイコの卒倒病菌として発見された Bacillus thuringiensis の産生する毒素タンパク質がチョウ目やハエ目などの昆虫の幼虫に摂取され、消化管の細胞を破壊することで殺虫活性を示す。\n㋒ 日本では商業的に生産・販売される天敵は、農薬取締法によって農薬登録が義務付けられている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "伝統的方法では天敵の定着により長期効果を狙うが、非標的の在来種への影響も生じ得る。BT剤は感受性昆虫の消化管に作用し、商業的な天敵製剤も原則として農薬登録の対象になる。",
    "choiceExplanations": {
      "ア": "国外から天敵を導入する方法は妥当だが、BT剤の殺虫作用と市販天敵農薬の登録についても妥当である。",
      "イ": "㋐と㋑に加えて、防除目的で販売する天敵製剤が農薬の登録制度に服する㋒も妥当である。",
      "ウ": "伝統的方法では天敵の定着により長期効果を狙うが、非標的の在来種への影響も生じ得る。BT剤は感受性昆虫の消化管に作用し、商業的な天敵製剤も原則として農薬登録の対象になる。",
      "エ": "BT剤と天敵製剤の説明は合うが、外来天敵を導入する際の非標的生物への影響を述べた㋐も妥当である。",
      "オ": "㋒は妥当だが、㋐の導入方法と㋑の微生物由来製剤の作用も正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q070",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "土壌肥料学・環境科学・農薬",
    "topicTags": [
      "農薬の剤型と水田での施用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "農薬の製剤に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「農薬の有効成分の施用量は、一般に10アール当たり［㋐］と極めて少量であり、そのままでは均一な施用ができない。そこで、農薬を扱いやすくして、有効成分の効力を最大限に発揮させることが製剤の重要な役割である。また、農業従事者の減少や高齢化にともない農薬の施用作業の省力化が求められていることから、水田に入ることなく散布できるように水溶性フィルムにパックされた製剤として［㋑］などが開発されている。」",
    "choices": {
      "ア": "数g〜数百g／ジャンボ剤",
      "イ": "数g〜数百g／顆粒水和剤",
      "ウ": "数g〜数百g／サーフ剤",
      "エ": "数mg〜数百mg／ジャンボ剤",
      "オ": "数mg〜数百mg／サーフ剤"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "一般的な有効成分量は10アール当たり数gから数百g程度である。ジャンボ剤は水溶性の包材を用いる投げ込み剤で、水田の畦畔などから作業できる。",
    "choiceExplanations": {
      "ア": "一般的な有効成分量は10アール当たり数gから数百g程度である。ジャンボ剤は水溶性の包材を用いる投げ込み剤で、水田の畦畔などから作業できる。",
      "イ": "施用量の桁は妥当だが、顆粒水和剤は通常、水に分散させて用いる剤型である。",
      "ウ": "有効成分量は妥当だが、設問が描写する水溶性フィルムの投げ込み剤はジャンボ剤と呼ばれる。",
      "エ": "ジャンボ剤は妥当だが、有効成分の通常の施用量を mg 単位とする点が小さすぎる。",
      "オ": "通常の量の桁が合わず、水溶性フィルムを水田へ投げ込む剤型の名称も異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q071",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "ヘモグロビンの四次構造と酸素解離",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヘモグロビンに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「酸素結合タンパク質であるヘモグロビンは、代謝における酸化的反応に必須である酸素を供給している。ヘモグロビンは赤血球に存在する［㋐］タンパク質でありヘムを含むが、単離したヘムを酸素に晒すと［㋑］に不可逆的に変化し、酸素を結合できなくなる。横軸に酸素分圧（0〜100 mmHg）、縦軸に飽和度（0〜100%）を示した酸素解離曲線では、ヘモグロビンは［㋒］を示す。」",
    "choices": {
      "ア": "二量体／Fe(Ⅲ)→Fe(Ⅱ)／双曲線",
      "イ": "二量体／Fe(Ⅱ)→Fe(Ⅲ)／シグモイド型曲線",
      "ウ": "四量体／Fe(Ⅲ)→Fe(Ⅱ)／双曲線",
      "エ": "四量体／Fe(Ⅱ)→Fe(Ⅲ)／トロコイド型曲線",
      "オ": "四量体／Fe(Ⅱ)→Fe(Ⅲ)／シグモイド型曲線"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ヘモグロビンは4本のサブユニットをもち、単離したヘムの Fe(Ⅱ) は酸化されると Fe(Ⅲ) になる。ヘモグロビンでは酸素結合に正の協同性があるため、酸素解離曲線はシグモイド型である。",
    "choiceExplanations": {
      "ア": "ヘモグロビンは四量体で、ヘム鉄を酸素にさらして酸化されると鉄の酸化数は増える。",
      "イ": "鉄の酸化と曲線の形は合うが、成人の主なヘモグロビンは2本ずつの α 鎖と β 鎖から成る四量体である。",
      "ウ": "四量体は妥当だが、鉄は Fe(Ⅱ) から Fe(Ⅲ) へ酸化され、ヘモグロビンの曲線は協同性を反映して S 字形になる。",
      "エ": "四量体と酸化方向は合っているが、協同的な酸素結合による飽和曲線はトロコイド型ではない。",
      "オ": "ヘモグロビンは4本のサブユニットをもち、単離したヘムの Fe(Ⅱ) は酸化されると Fe(Ⅲ) になる。ヘモグロビンでは酸素結合に正の協同性があるため、酸素解離曲線はシグモイド型である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q072",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "ミトコンドリアの電子伝達系",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ミトコンドリアの ATP 合成における、電子伝達系と酸化的リン酸化に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 電子伝達において、H⁺ の濃度が低いマトリックスから膜間部にプロトンを汲み出す複合体は、複合体Ⅰ、Ⅲ、Ⅳである。\n㋑ ロテノンで電子伝達を止めたミトコンドリアにコハク酸を加えると電子伝達と O₂ 消費が回復することから、ロテノンは複合体Ⅲの電子伝達を阻害することが分かる。\n㋒ ATP シンターゼは膜貫通タンパク質（F₀）と膜面タンパク質（F₁）の二つの機能単位に分けられ、ATP 合成を行う膜面タンパク質（F₁）はミトコンドリアマトリックス側に飛び出している。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋐、㋒",
      "オ": "㋑、㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "複合体Ⅰ、Ⅲ、Ⅳがプロトン勾配を形成し、F₀ を通じてプロトンが戻るとマトリックス側の F₁ が ATP を合成する。コハク酸は複合体Ⅱから電子を供給するため、ロテノンによる複合体Ⅰの阻害を迂回できる。",
    "choiceExplanations": {
      "ア": "プロトン輸送を行う複合体は正しいが、ATP シンターゼの触媒部分がマトリックス側にある㋒も正しい。",
      "イ": "コハク酸が電子を渡す複合体Ⅱは複合体Ⅰを迂回できるが、複合体Ⅲを迂回できない。",
      "ウ": "F₁ はマトリックス側にあるが、ロテノンの阻害部位は複合体Ⅲではなく複合体Ⅰである。",
      "エ": "複合体Ⅰ、Ⅲ、Ⅳがプロトン勾配を形成し、F₀ を通じてプロトンが戻るとマトリックス側の F₁ が ATP を合成する。コハク酸は複合体Ⅱから電子を供給するため、ロテノンによる複合体Ⅰの阻害を迂回できる。",
      "オ": "㋒は妥当だが、複合体Ⅲが止まっているなら複合体Ⅱからコハク酸で電子を供給してもその先が遮断されたままである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q073",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "コラーゲンの三重らせんと壊血病",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "コラーゲンに関する記述㋐〜㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 典型的なコラーゲンのポリペプチド鎖は、Ala–X–Y という3アミノ酸配列の繰り返し構造をもつ。X は Pro、Y は Hyp（Hydroxyproline）のことが多い。\n㋑ コラーゲンのポリペプチド鎖は、左巻きヘリックス構造をとる。3本の左巻きポリペプチド鎖が並んでお互いに絡まり、右巻きにねじれ、コラーゲン分子の3本らせん構造ができる。\n㋒ コラーゲン分子内では、リシルオキシダーゼがジスルフィド結合を形成して隣り合うポリペプチド鎖間に共有結合性の架橋をつくる。\n㋓ 壊血病は、アスコルビン酸欠乏によるコラーゲンの構造異常に起因する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "各鎖は左巻きであり、3本が右巻きの三重らせんを形成する。アスコルビン酸不足ではプロリンなどの水酸化が不足し、健全なコラーゲン形成が妨げられて壊血病を生じる。",
    "choiceExplanations": {
      "ア": "らせんの説明は正しいが、3残基ごとに現れるのはアラニンではなく、側鎖が最小のグリシンである。",
      "イ": "繰り返しの先頭は Gly であり、リシルオキシダーゼによる架橋はシステインのジスルフィド結合ではない。",
      "ウ": "壊血病の説明は正しいが、典型配列は Gly–X–Y であり、リシルオキシダーゼはリシン残基などをアルデヒドに変える。",
      "エ": "左巻きの3本が右巻きの三重らせんを作るのは妥当だが、リシルオキシダーゼが直接ジスルフィド結合を作るわけではない。",
      "オ": "各鎖は左巻きであり、3本が右巻きの三重らせんを形成する。アスコルビン酸不足ではプロリンなどの水酸化が不足し、健全なコラーゲン形成が妨げられて壊血病を生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q074",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "真核生物の翻訳開始と終結",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "真核生物の翻訳に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ リボソームタンパク質が3分の2を占めるリボソームは、リボザイムの一種である。\n㋑ 翻訳の開始は、開始 tRNA がリボソームの P 部位に結合することから始まる。\n㋒ 翻訳中の mRNA 分子は、ポリソームの状態でタンパク質合成を行っている。\n㋓ 翻訳の終結は、終結 tRNA が A 部位の終止コドンと結合して起こる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "開始 tRNA は開始複合体で P 部位に配置される。複数のリボソームが同一 mRNA を同時に翻訳するとポリソームを形成する。",
    "choiceExplanations": {
      "ア": "開始 tRNA の位置は妥当だが、リボソームの触媒中心は rRNA であり、タンパク質が3分の2を占めるという説明は適切でない。",
      "イ": "ペプチド結合を作る触媒中心は rRNA による。また、終止コドンに対応するのは専用の tRNA ではなく放出因子である。",
      "ウ": "開始 tRNA は開始複合体で P 部位に配置される。複数のリボソームが同一 mRNA を同時に翻訳するとポリソームを形成する。",
      "エ": "㋑は妥当だが、停止コドンを A 部位で認識する因子は真核生物では eRF1 などの放出因子である。",
      "オ": "ポリソームの説明は妥当だが、終結は通常のアミノアシル tRNA による反応と異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q075",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "ラギング鎖のDNA複製",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "DNA 複製機構に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「DNA 複製フォークは非対称である。ラギング鎖合成では、［㋐］がプライマー RNA に結合し、岡崎フラグメントの合成を始め、新しい DNA 鎖は［㋑］方向につながれていく。断片の合成が完了すると、プライマー RNA が除去される。その後、［㋒］が切れ目をつなぎ全ての岡崎フラグメントが1本に連結される。」",
    "choices": {
      "ア": "DNAポリメラーゼ／5′→3′／RNアーゼH",
      "イ": "DNAポリメラーゼ／5′→3′／DNAリガーゼ",
      "ウ": "RNAポリメラーゼ／3′→5′／RNアーゼH",
      "エ": "RNAポリメラーゼ／3′→5′／DNAリガーゼ",
      "オ": "RNAポリメラーゼ／5′→3′／RNアーゼH"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "DNAポリメラーゼはプライマーの3′末端にヌクレオチドを加え、5′から3′へ伸ばす。プライマー除去後の隙間を DNA で埋めると、残る切れ目を DNAリガーゼがつなぐ。",
    "choiceExplanations": {
      "ア": "合成酵素と方向は正しいが、RNアーゼH は RNA の切断に関与し、DNA 断片は連結しない。",
      "イ": "DNAポリメラーゼはプライマーの3′末端にヌクレオチドを加え、5′から3′へ伸ばす。プライマー除去後の隙間を DNA で埋めると、残る切れ目を DNAリガーゼがつなぐ。",
      "ウ": "RNAポリメラーゼの役割と DNA の合成方向を取り違えている。切れ目をつなぐのも RNアーゼH ではない。",
      "エ": "最後の DNAリガーゼだけは合っているが、伸長には DNAポリメラーゼが働き、方向は5′から3′である。",
      "オ": "方向は合うが、新しい鎖は DNA なので DNAポリメラーゼが合成し、最後は DNAリガーゼがつなぐ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q076",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "生化学・分子生物学",
    "topicTags": [
      "大腸菌のlacオペロンとtrpオペロン",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "大腸菌のオペロンに関する記述㋐〜㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 染色体上でクラスターを作る遺伝子群が、1本の長い mRNA 分子として転写される。\n㋑ トリプトファン合成酵素遺伝子群は、三つの遺伝子で構成されている。\n㋒ ラクトースオペロンは誘導型、トリプトファンオペロンは抑制型である。\n㋓ 細胞内のトリプトファン濃度が低いときは、トリプトファン・リプレッサーが活性化する。",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "複数の構造遺伝子が一つのプロモーターの制御下で一続きの mRNA に転写される。ラクトースの代謝系では分解すべき物質の存在が発現を誘導し、トリプトファンの合成系では産物が多いと発現が抑制される。",
    "choiceExplanations": {
      "ア": "㋐と㋒は妥当だが、大腸菌の trp オペロンの合成系は trpE、trpD、trpC、trpB、trpA の5遺伝子から成る。",
      "イ": "ポリシストロニック mRNA の説明は妥当だが、trp の構造遺伝子は5つで、リプレッサーの働きはトリプトファンによって強まる。",
      "ウ": "複数の構造遺伝子が一つのプロモーターの制御下で一続きの mRNA に転写される。ラクトースの代謝系では分解すべき物質の存在が発現を誘導し、トリプトファンの合成系では産物が多いと発現が抑制される。",
      "エ": "トリプトファン合成に関わる構造遺伝子は5つで、低濃度のときはリプレッサーの作用が弱まり合成系が発現しやすい。",
      "オ": "㋒は妥当だが、トリプトファンはコリプレッサーなので、低濃度ではリプレッサーは活性化しにくくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q077",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "糸引き納豆と納豆菌",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "糸引き納豆の製造及び納豆菌に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 納豆菌は、グラム陽性の好気性の桿菌で、芽胞を形成する能力がある。\n㋑ 蒸煮大豆を冷却した後、納豆菌を散布し、20℃程度の低温で発酵させ、発酵後5℃以下に冷却してから出荷する。\n㋒ 納豆菌は分類学的に Bacillus subtilis に分類されるが、Bacillus subtilis var. natto はビタミンの一種の要求性やファージ感受性が異なる。\n㋓ 納豆菌が作る粘質物は、α-グルタミルトランスペプチダーゼの作用により生じる α-ポリグルタミン酸とフルクトースの混合物である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "納豆菌はグラム陽性で芽胞を作る枯草菌の一群である。多くの納豆菌株はビオチン要求性を示すなど、栄養要求性やファージ感受性で他の枯草菌と区別される。",
    "choiceExplanations": {
      "ア": "芽胞形成は妥当だが、一般的な納豆の主発酵は20℃より高い温度で進める。",
      "イ": "納豆菌はグラム陽性で芽胞を作る枯草菌の一群である。多くの納豆菌株はビオチン要求性を示すなど、栄養要求性やファージ感受性で他の枯草菌と区別される。",
      "ウ": "菌株の説明は妥当だが、20℃程度は糸引き納豆の一般的な主発酵に使う温度として低い。",
      "エ": "粘りの主成分は γ-ポリグルタミン酸である。温度に関しても、納豆菌を主発酵させるときに20℃程度を使う説明は妥当でない。",
      "オ": "㋒は妥当だが、糸を引く成分は α 型のポリグルタミン酸と遊離フルクトースではなく、主に γ-ポリグルタミン酸やフルクタンである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q078",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "グルタミン酸発酵と補酵素",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "アミノ酸発酵に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「グルタミン酸生産菌である Corynebacterium glutamicum は、TCA回路の中間体である2-オキソグルタル酸から、［㋐］を消費しグルタミン酸を生成する。この菌は［㋑］要求性であり、培地中の［㋑］量を制限することにより、コハク酸合成への代謝の流れが抑制されるとともに、［㋒］の産生抑制により脂肪酸の生成量が減少し、結果としてグルタミン酸が多量に生産・排出される。」",
    "choices": {
      "ア": "NADPH／ビオチン／マロニルCoA",
      "イ": "NADPH／ビオチン／アセチルCoA",
      "ウ": "NADPH／チアミン／マロニルCoA",
      "エ": "GTP／チアミン／アセチルCoA",
      "オ": "GTP／ビオチン／マロニルCoA"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "2-オキソグルタル酸は NADPH を使う還元的アミノ化でグルタミン酸となる。ビオチンはアセチルCoAカルボキシラーゼの補因子で、これが不足するとマロニルCoAの合成が抑えられる。",
    "choiceExplanations": {
      "ア": "2-オキソグルタル酸は NADPH を使う還元的アミノ化でグルタミン酸となる。ビオチンはアセチルCoAカルボキシラーゼの補因子で、これが不足するとマロニルCoAの合成が抑えられる。",
      "イ": "ビオチンに依存する反応で作られるのはマロニルCoAであり、アセチルCoAはその基質である。",
      "ウ": "グルタミン酸の還元的アミノ化には NADPH を使うが、脂肪酸合成の調節に関わる要求性はビオチンである。",
      "エ": "GTP には2-オキソグルタル酸の還元に必要な還元力を供給する役割はなく、脂肪酸合成で該当する補因子はビオチンである。",
      "オ": "ビオチンとマロニルCoAの関係は合うが、グルタミン酸を生成する反応には GTP ではなく NADPH を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q079",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "シアノバクテリアの光合成と窒素固定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "シアノバクテリア（ラン藻）に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 核 DNA は核膜で、細胞は細胞壁で覆われている。\n㋑ 光合成に関与する色素はクロロフィル a で、電子供与体は H₂O である。\n㋒ 膜で覆われたカルボキシソームによる還元的 TCA 回路により炭素固定を行う。\n㋓ ヘテロシストと呼ばれる分化した細胞は、窒素固定を行い、光化学系Ⅱを欠くため酸素を発生しない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "クロロフィル a で光を利用し、水を電子源として酸素を発生する。ヘテロシストは酸素に弱いニトロゲナーゼを働かせるため、酸素を発生する光化学系Ⅱを抑えている。",
    "choiceExplanations": {
      "ア": "クロロフィル a と水は妥当だが、シアノバクテリアの DNA は原核細胞内にあり、核膜に囲まれていない。",
      "イ": "核膜がなく、カルボキシソームは脂質膜ではなくタンパク質の殻をもつ。",
      "ウ": "㋑は妥当だが、カルボキシソームで働く RuBisCO は、還元的 TCA 回路ではなくカルビン回路の炭素固定を担う。",
      "エ": "クロロフィル a で光を利用し、水を電子源として酸素を発生する。ヘテロシストは酸素に弱いニトロゲナーゼを働かせるため、酸素を発生する光化学系Ⅱを抑えている。",
      "オ": "ヘテロシストについては妥当だが、炭素固定系とカルボキシソームの外殻についての㋒は誤っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q080",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "PCRの増幅原理とリアルタイム検出",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ポリメラーゼ連鎖反応（PCR）に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ PCR では、増幅したい二本鎖 DNA、耐熱性の DNA 合成酵素、4種類の制限酵素及び目的 DNA 領域を挟むように合成した短い塩基配列をもつプライマーを用いる。\n㋑ プライマーの融解温度（T_m）は、グアニン・シトシンの含まれる量が多くなるほど低くなる。T_m が低くなる要因としては、グアニン・シトシン塩基間の水素結合などによる安定化エネルギーがアデニン・チミン塩基間よりも小さいことが挙げられる。\n㋒ PCR は、特定の DNA 断片を指数関数的に増幅することができ、理論的には1本の二本鎖 DNA は n 回目のサイクル後に 2ⁿ 本の二本鎖 DNA に増幅されるため、10回目のサイクル後には1024本の二本鎖 DNA が生成する。\n㋓ リアルタイム PCR におけるインターカレーション法では、二本鎖となった DNA に結合して蛍光を発する蛍光色素を用い、PCR の1サイクルごとの増幅産物を測定する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "1サイクルごとに全分子が複製される理想モデルでは 2¹⁰＝1024 本になる。リアルタイム法では二本鎖 DNA に結合した色素の蛍光により、サイクルごとの産物量を追跡できる。",
    "choiceExplanations": {
      "ア": "DNA の構成材料は4種類のデオキシヌクレオチドで、制限酵素4種ではない。また、他の条件が同じなら GC が多いほうが融解温度は一般に高い。",
      "イ": "理想的な指数増幅は妥当だが、PCR は標的を制限酵素で切る反応ではない。",
      "ウ": "㋒は妥当だが、GC の増加は一般に塩基対と二本鎖を安定化させる方向に働く。",
      "エ": "二本鎖結合色素を使う説明は妥当だが、GC 含量と融解温度の関係を逆に述べている。",
      "オ": "1サイクルごとに全分子が複製される理想モデルでは 2¹⁰＝1024 本になる。リアルタイム法では二本鎖 DNA に結合した色素の蛍光により、サイクルごとの産物量を追跡できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q081",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "RNAの性質と遺伝子発現解析",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "RNA に関する記述㋐〜㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ リボースの2′位に結合しているのは、RNA では −OH、DNA では −H であり、この差によって RNA は一般に一本鎖であるなど DNA とは分子の性質が大きく異なる。\n㋑ RNA は、リボヌクレアーゼによる分解を受けやすい不安定な分子であるため、実験で取り扱う際には EDTA などのキレート試薬を用いることが必要である。\n㋒ RNA を利用した遺伝子発現制御の方法として、線虫に二本鎖 RNA を導入し、特定の遺伝子発現を抑制する RNA 干渉がある。\n㋓ トランスクリプトームの解析において、細胞から抽出した mRNA を逆転写酵素により相補的 DNA に変換し、その塩基配列を次世代シークエンサーにより決定することで細胞内の遺伝子発現を網羅的に調べることができる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒、㋓",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "RNA の糖には2′-OH があり、DNAより加水分解を受けやすい性質にも関わる。二本鎖 RNA による標的発現の抑制は RNA 干渉であり、mRNA を cDNA 化して配列を調べると発現解析ができる。",
    "choiceExplanations": {
      "ア": "糖の2′位の説明は妥当だが、金属イオンを必要としない RNase もあるため、EDTA の使用だけで RNA を保護できるとは限らない。",
      "イ": "RNA 干渉の例は妥当であり、転写産物を cDNA にして配列を読む㋓も妥当である。",
      "ウ": "RNA の糖には2′-OH があり、DNAより加水分解を受けやすい性質にも関わる。二本鎖 RNA による標的発現の抑制は RNA 干渉であり、mRNA を cDNA 化して配列を調べると発現解析ができる。",
      "エ": "㋒と㋓は妥当だが、RNA の保護でキレート剤の使用が必須とは限らず、金属非依存性の RNase には効かない。",
      "オ": "転写産物を網羅的に調べる方法は妥当だが、RNA の取り扱いで金属イオンのキレート化が常に必要とする㋑は適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q082",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "応用微生物学・生物工学",
    "topicTags": [
      "遺伝子改変マウスの分類",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝子操作に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ トランスジェニックマウスとは、ドナーの体細胞の核を、除核した未受精卵へ移植することにより作製される個体であり、ドナーと全ゲノム配列が同一なマウスのことをいう。\n㋑ キメラマウスとは、遺伝子改変された受精卵を野生型マウスに移植して生まれた子マウスの中で、全身の細胞に遺伝子改変をもつものである。\n㋒ 胚性幹細胞（ES細胞）を利用したノックアウトマウスの作製では、相同組換えによって標的遺伝子に変異が入った ES 細胞を胚盤胞に注入する。\n㋓ 組織特異的に標的遺伝子を欠損させる条件的遺伝子欠損マウスの作製においては、Cre 組換え酵素とその認識塩基配列（LoxP）が利用されることが多い。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "標的遺伝子の改変をもつ ES 細胞と宿主胚の組合せでは、両者由来の細胞が混在するキメラを経由する。組織で限定的に働く Cre は LoxP に挟まれた領域をその組織で組み換え、条件付き欠損をもたらす。",
    "choiceExplanations": {
      "ア": "㋐は体細胞核移植によるクローンの説明である。またキメラは異なる由来の細胞が混在する個体を指す。",
      "イ": "ES 細胞を使った標的改変は妥当だが、外来遺伝子をもつトランスジェニック個体と体細胞核移植で作る個体は区別される。",
      "ウ": "㋒は妥当だが、改変細胞と宿主胚由来の細胞の混在を示すのがキメラであり、全身の細胞が同じ改変をもつことを指さない。",
      "エ": "Cre と LoxP の説明は妥当だが、胚を野生型の母体に移すだけでは、母体と胚の細胞が混在するキメラを生むことにならない。",
      "オ": "標的遺伝子の改変をもつ ES 細胞と宿主胚の組合せでは、両者由来の細胞が混在するキメラを経由する。組織で限定的に働く Cre は LoxP に挟まれた領域をその組織で組み換え、条件付き欠損をもたらす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q083",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "Hox遺伝子とホメオドメイン",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "Hox 遺伝子に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 種を超えて相同性の高い180アミノ酸配列をもつ。\n㋑ ショウジョウバエでは、HOM-C複合体を形成している。\n㋒ 植物では ABC モデルを形成し、花形成を制御する。\n㋓ 翻訳産物は DNA と結合して転写調節因子として機能する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ショウジョウバエの体節の性質を指定するホメオティック遺伝子群は HOM-C と呼ばれる。Hox タンパク質はホメオドメインで標的 DNA に結合して転写を調節する。",
    "choiceExplanations": {
      "ア": "ショウジョウバエの HOM-C は妥当だが、ホメオボックスは約180塩基対で、約60アミノ酸の領域をコードする。",
      "イ": "180という数は塩基対の数であり、花器官の ABC モデルに関わる代表的な遺伝子は MADS ボックス遺伝子などである。",
      "ウ": "DNA 結合に関する説明は妥当だが、ホメオドメインの長さを180アミノ酸とするのは誤りである。",
      "エ": "HOM-C は妥当だが、植物の花器官の ABC モデルを動物の Hox 遺伝子が担うという記述は妥当でない。",
      "オ": "ショウジョウバエの体節の性質を指定するホメオティック遺伝子群は HOM-C と呼ばれる。Hox タンパク質はホメオドメインで標的 DNA に結合して転写を調節する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q084",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "両生類のオーガナイザー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "両生類の初期発生過程に特徴的なシュペーマンオーガナイザーの機能に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ Noggin を分泌し、背側中胚葉に分化する。\n㋑ Chordin を分泌し、外胚葉を背側化させ神経管へ誘導する。\n㋒ Nodal を分泌するニューコープセンターを誘導する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "オーガナイザーは背側中胚葉の形成に関わり、Noggin や Chordin を分泌する。これらが BMP の作用を抑えると、外胚葉で神経組織が誘導される。",
    "choiceExplanations": {
      "ア": "オーガナイザーは背側中胚葉の形成に関わり、Noggin や Chordin を分泌する。これらが BMP の作用を抑えると、外胚葉で神経組織が誘導される。",
      "イ": "Noggin と Chordin は妥当だが、オーガナイザーはニューコープセンターのシグナルを受けて形成される側である。",
      "ウ": "㋐は妥当だが、Nodal 関連のシグナルでオーガナイザーが誘導されるため、㋒は誘導する側とされる側が逆である。",
      "エ": "㋑は妥当であり、㋒のようにオーガナイザーからニューコープセンターが誘導されるわけではない。",
      "オ": "ニューコープセンターはオーガナイザーを誘導する上流の領域なので、㋒は逆の関係を述べている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q085",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "ヒトの減数分裂と配偶子",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの配偶子形成に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 精母細胞は、減数分裂を経て22本の染色体をもつ精細胞となる。\n㋑ 1個の一次卵母細胞は、減数分裂を経て4個の娘細胞を生じる。\n㋒ 相同染色体の対合とキアズマ形成は、減数分裂特有の現象である。\n㋓ 卵細胞や精細胞は、成熟して最終的に始原生殖細胞になる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "相同染色体の対合とキアズマ形成は減数分裂Ⅰに特徴的である。㋑は第一極体も分裂する模式図に相当し、卵細胞1個と極体3個を数えるが、ヒトで第一極体が常に分裂するわけではない。",
    "choiceExplanations": {
      "ア": "精細胞には常染色体22本に加えて性染色体1本があり、染色体は計23本になる。",
      "イ": "㋒は妥当だが、減数分裂後のヒトの精細胞の染色体数は性染色体を含めて23本である。",
      "ウ": "始原生殖細胞が配偶子形成の出発点であり、その逆ではない。また精細胞には性染色体もある。",
      "エ": "相同染色体の対合とキアズマ形成は減数分裂Ⅰに特徴的である。㋑は第一極体も分裂する模式図に相当し、卵細胞1個と極体3個を数えるが、ヒトで第一極体が常に分裂するわけではない。",
      "オ": "始原生殖細胞は卵細胞や精子へ分化する前段階であり、成熟した配偶子がこれに戻るわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q086",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "房室弁と半月弁の開閉",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの心臓の弁に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「心臓には弁が四つある。心房と心室の間にある左右の房室弁と、肺動脈弁及び大動脈弁である。房室弁は房室の境にある固い結合組織の枠から起こって心室の中へ伸び、その縁はパラシュートの紐のような腱索につながり、心室から突出した乳頭筋がこれを引っ張っている。［㋐］は三つの弁尖から成り三尖弁と呼ばれ、［㋑］は二つの弁尖から成り僧帽弁と呼ばれる。この四つの弁により、心房から心室、心室から動脈という向きにだけ血液が流れるようになっている。心臓の拡張期には三尖弁と僧帽弁が［㋒］。その際、［㋓］。」",
    "choices": {
      "ア": "右房室弁／左房室弁／閉じる／大動脈弁と肺動脈弁は開く",
      "イ": "右房室弁／左房室弁／開く／大動脈弁と肺動脈弁は閉じる",
      "ウ": "左房室弁／右房室弁／閉じる／大動脈弁と肺動脈弁も閉じる",
      "エ": "左房室弁／右房室弁／閉じる／大動脈弁と肺動脈弁は開く",
      "オ": "左房室弁／右房室弁／開く／大動脈弁と肺動脈弁も開く"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "三尖弁が右、僧帽弁が左の房室弁である。心室拡張期に心房圧が心室圧より高くなると房室弁が開き、動脈側の大動脈弁と肺動脈弁は閉じている。",
    "choiceExplanations": {
      "ア": "左右の弁名は合うが、心室への充満時には房室弁が開き、動脈からの逆流を防ぐ半月弁は閉じる。",
      "イ": "三尖弁が右、僧帽弁が左の房室弁である。心室拡張期に心房圧が心室圧より高くなると房室弁が開き、動脈側の大動脈弁と肺動脈弁は閉じている。",
      "ウ": "等容性弛緩期には全ての弁が閉じるが、その後の充満期には房室弁が開く。また左右の弁名が逆になっている。",
      "エ": "拡張中は動脈から心室へ逆流しないよう半月弁が閉じる。右房室弁は三尖弁であり、僧帽弁は左にある。",
      "オ": "房室弁が開く点は充満期に合うが、半月弁まで開くと動脈からの逆流を防げない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q087",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "血漿の組成と血流",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの血液に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 血漿は血液の細胞外液で、電解質、低分子の有機物、血漿タンパク質などを含む。電解質の組成は、組織の細胞外液（組織液）と似るが、タンパク質濃度が組織液より高いため、ドナン平衡により Na⁺ がやや低く、Cl⁻ がやや高い。\n㋑ 抗凝固物質と混和した血液を遠心分離すると、重い細胞成分と軽い液体成分に分離できる。白血球と血小板は、細胞成分と液体成分の境界面に白いバフィーコートとして得られ、DNA の抽出などに用いることができる。\n㋒ 直径100 μm以上の太い血管において、血液粘度と血流量との間にはポワズイユの法則 F＝πr⁴ΔP/(8ηL)（F は血流量、η は血液粘度、r は血管半径、L は血管長、ΔP は入口・出口間の圧力差）が成り立つ。\n㋓ 抗凝固物質と混和して細管に入れた血液を放置し、赤血球が自然に沈降していく速度を定められた方法で測定したものを赤血球沈降速度といい、炎症のマーカーの一つとして用いられる。急性炎症時には、正に荷電したグロブリン画分が増加するため、赤血球沈降速度は低下する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "白血球と血小板が集まるバフィーコートでは、白血球を由来とする核 DNA を得られる。血液をニュートン流体と近似できる比較的太い血管の定常層流では、流量が半径の4乗に比例するポワズイユ式を使える。",
    "choiceExplanations": {
      "ア": "バフィーコートは得られるが、陰性の血漿タンパク質によるドナン効果は、血漿で陽イオンをやや高く陰イオンをやや低くする向きである。",
      "イ": "ポワズイユ式は理想化した層流の説明として妥当だが、㋐の Na⁺ と Cl⁻ の増減は逆である。",
      "ウ": "白血球と血小板が集まるバフィーコートでは、白血球を由来とする核 DNA を得られる。血液をニュートン流体と近似できる比較的太い血管の定常層流では、流量が半径の4乗に比例するポワズイユ式を使える。",
      "エ": "㋑は妥当だが、急性炎症では血漿タンパク質の変化で赤血球が連銭を作りやすくなり、沈降速度は上がる傾向がある。",
      "オ": "㋒の流量の関係は妥当だが、炎症で赤血球沈降速度が低下するという説明が誤っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q088",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "発生生物学・生理学",
    "topicTags": [
      "自律神経の伝達物質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの自律神経系に関する次の記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "節前神経線維は無髄線維であるのに対して、節後神経線維は有髄線維であるため、節後神経線維の方が興奮を速く伝導するのに適している。",
      "イ": "交感神経節前線維はノルアドレナリン作動性ニューロンであり、副交感神経節前線維はコリン作動性ニューロンに分類される。",
      "ウ": "交感神経節後線維終末から遊離されたノルアドレナリンは、一般に汗腺にある受容体に作用して発汗を促す。",
      "エ": "副交感神経節後神経の支配を受ける効果器にあるアセチルコリン受容体の大部分は陽イオンチャネル内蔵型であり、アセチルコリン刺激によって細胞膜を脱分極させる。",
      "オ": "シナプス間隙に放出されたアセチルコリンは、効果器の受容体を刺激した後、直ちにアセチルコリンエステラーゼによってコリンと酢酸に分解される。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "アセチルコリンエステラーゼはアセチルコリンのエステル結合を速やかに加水分解する。生じるコリンは再取り込みされ、伝達物質の再合成に利用される。",
    "choiceExplanations": {
      "ア": "一般に節前線維は有髄で、節後線維は無髄であるため、髄鞘と伝導の速さの説明が逆である。",
      "イ": "交感神経でも副交感神経でも節前線維は通常アセチルコリンを放出する。",
      "ウ": "エクリン汗腺を支配する交感神経節後線維は例外的に主としてアセチルコリンを放出する。",
      "エ": "副交感神経の効果器の受容体は主にムスカリン性で、Gタンパク質共役型である。",
      "オ": "アセチルコリンエステラーゼはアセチルコリンのエステル結合を速やかに加水分解する。生じるコリンは再取り込みされ、伝達物質の再合成に利用される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q089",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "SDS-PAGEによるタンパク質の分離",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "SDS-PAGE（SDS：ドデシル硫酸ナトリウム、PAGE：ポリアクリルアミドゲル電気泳動）法に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ SDS 存在下の変性状態でタンパク質を分子量ごとに分離する方法である。一般に SDS は強力な変性作用をもつ界面活性剤である。\n㋑ 電気泳動の原理は、タンパク質自身がもつ正電荷が陰極に引き寄せられることによる。長いペプチド鎖ほど電荷数が多く泳動速度が速くなることで、分子量に応じて分離される。\n㋒ タンパク質を確実に変性状態にするために、システイン残基間のジスルフィド結合を切断するための還元処理を施すことが多い。\n㋓ 目的のタンパク質のみを特異的に検出するには、一般に CBB 染色法が用いられる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "SDS はタンパク質を変性させて質量あたりの電荷をほぼそろえるため、ゲルによる分子量依存の分離ができる。還元処理でジスルフィド結合を切ると、共有結合していた鎖も分離できる。",
    "choiceExplanations": {
      "ア": "SDS はタンパク質に負電荷を与え、電場では陽極へ向かう。ゲル中では小さいタンパク質ほど移動しやすい。",
      "イ": "SDS はタンパク質を変性させて質量あたりの電荷をほぼそろえるため、ゲルによる分子量依存の分離ができる。還元処理でジスルフィド結合を切ると、共有結合していた鎖も分離できる。",
      "ウ": "還元処理の説明は妥当だが、泳動を支配するのは主に SDS が与える負電荷とゲルによるふるい効果である。",
      "エ": "長いポリペプチドほど速く移動するとはいえず、CBB 染色も特定タンパク質だけを選択的に検出しない。",
      "オ": "ジスルフィド結合を切る処理は妥当だが、CBB は多種類のタンパク質を染める色素である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q090",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "ウイルス感染症とワクチンの原理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ウイルス感染症に対するワクチンに関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ ウイルスの増殖は宿主細胞の装置を利用するため、その増殖を阻害する薬剤の開発は困難であることから、ワクチンは宿主内でのウイルスの増殖を阻止するための唯一の手段である。\n㋑ ワクチンにより、事実上根絶することができたウイルス感染症がある。\n㋒ 近年 mRNA ワクチンが開発されたが、これは対象とするウイルスの mRNA に反応する抗体を誘導するワクチンである。\n㋓ 一般にインフルエンザウイルスなどの RNA ウイルスは DNA ウイルスと比べて、ワクチンにより獲得された免疫を回避する変異ウイルスが生まれる可能性が高い。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "天然痘はワクチン接種を含む公衆衛生対策によって根絶された。インフルエンザなど多くの RNA ウイルスでは変異に伴って抗原性が変わり、以前の免疫の効果が弱まることがある。",
    "choiceExplanations": {
      "ア": "ワクチンによる根絶例は妥当だが、ウイルスの増殖過程に作用する抗ウイルス薬もある。",
      "イ": "ワクチン以外にも抗ウイルス薬があり、mRNA ワクチンで免疫が認識する抗原は mRNA がコードするタンパク質である。",
      "ウ": "根絶例は妥当だが、mRNA は細胞に抗原タンパク質を作らせるために使われ、抗体の主な標的にはならない。",
      "エ": "天然痘はワクチン接種を含む公衆衛生対策によって根絶された。インフルエンザなど多くの RNA ウイルスでは変異に伴って抗原性が変わり、以前の免疫の効果が弱まることがある。",
      "オ": "抗原性が変わるという㋓の説明は妥当だが、mRNA ワクチンが作らせる抗体は基本的に抗原タンパク質を認識する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q091",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "糖鎖の合成とABO式血液型",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "糖鎖に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 糖鎖は、食物などで細胞外から取り込んだ様々な単糖を直接基質として利用するのではなく、ヌクレオチドとの結合で活性化された糖を基質として糖転移酵素により非還元末端に単糖が付加される形で伸長される。\n㋑ ヒトでは生育に必須であるが自身で合成できない単糖があり、必須脂肪酸や必須アミノ酸のように食物などから摂取する必要がある。そのような単糖を必須糖と呼ぶ。\n㋒ 糖鎖は、主に小胞体及びゴルジ体で伸長されるので、原核生物は糖鎖をもたない。\n㋓ 細胞表層に存在する糖鎖は生体内での分子認識などにも寄与していて、例えば ABO 式血液型抗原は糖鎖である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "糖転移酵素はヌクレオチド糖などの活性化された糖を供与体にして糖鎖を伸ばす。ABO 式血液型の違いは、赤血球表面などの糖鎖末端の構造により生じる。",
    "choiceExplanations": {
      "ア": "糖転移酵素の説明は妥当だが、ヒトに必須アミノ酸と同じ意味で食事から必ず摂る単糖は設定されていない。",
      "イ": "糖転移酵素はヌクレオチド糖などの活性化された糖を供与体にして糖鎖を伸ばす。ABO 式血液型の違いは、赤血球表面などの糖鎖末端の構造により生じる。",
      "ウ": "必須糖の説明は妥当でなく、原核生物にもリポ多糖などの糖鎖が存在する。",
      "エ": "ABO 抗原の記述は妥当だが、ヒトの糖鎖合成に必要な単糖の多くは代謝経路で作れる。",
      "オ": "㋓は妥当だが、小胞体やゴルジ体をもたない細菌も細胞表層の糖鎖を合成する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q092",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "肝小葉の類洞と細胞",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ヒトの肝臓に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「肝小葉は、肝細胞が並んだ肝細胞板で構成され、その間に管腔の広い特殊な血管である［㋐］が走っている。［㋐］に存在する食作用をもつ［㋑］細胞は、血中の細菌や異物を処理する。内皮細胞と肝細胞板の間隙のディッセ腔には、［㋒］貯蔵細胞である星細胞（伊東細胞）が存在する。」",
    "choices": {
      "ア": "小葉間静脈／クッパー／グリコーゲン",
      "イ": "小葉間静脈／グリソン／ビタミンA",
      "ウ": "洞様毛細血管／クッパー／ビタミンA",
      "エ": "洞様毛細血管／クッパー／グリコーゲン",
      "オ": "洞様毛細血管／グリソン／ビタミンA"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "肝細胞板の間を洞様毛細血管である肝類洞が通り、クッパー細胞が血中の異物を貪食する。類洞内皮の外側のディッセ腔では、伊東細胞がビタミンAを脂肪滴に貯える。",
    "choiceExplanations": {
      "ア": "クッパー細胞は正しいが、肝細胞板の間を走るのは類洞であり、伊東細胞の代表的な貯蔵物はビタミンAである。",
      "イ": "ビタミンAは正しいが、肝小葉内で血液から異物を処理する細胞はクッパー細胞である。",
      "ウ": "肝細胞板の間を洞様毛細血管である肝類洞が通り、クッパー細胞が血中の異物を貪食する。類洞内皮の外側のディッセ腔では、伊東細胞がビタミンAを脂肪滴に貯える。",
      "エ": "血管と貪食細胞は合うが、グリコーゲンは主に肝細胞が蓄え、伊東細胞の特徴はビタミンAの貯蔵である。",
      "オ": "グリソン鞘は門脈、肝動脈、胆管などを包む組織であり、類洞の貪食細胞を指す名称ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q093",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "放射線防護剤と増感剤",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射線防護剤及び増感剤に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 放射線防護剤であるラジカル消去剤は、放射線が DNA に直接引き起こす電離を阻害する。\n㋑ 放射線防護剤の評価指標である線量減少率は、ある生物効果を得るのに必要な線量について防護剤存在下での必要線量を非存在下での線量で割った値である。\n㋒ 放射線増感剤として用いられているミソニダゾールは、DNA に取り込まれることで放射線による DNA 切断反応を起こしやすくする。\n㋓ Wortmannin は DNA 二本鎖切断修復酵素である DNA-PK 触媒サブユニットの阻害薬として機能することで DNA 修復を抑制し、細胞の放射線感受性を上げる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "同じ効果を得るために防護剤ありで必要な線量を、なしの線量で割って線量減少率を求める。DNA-PK の阻害は二本鎖切断の非相同末端結合を妨げ、損傷の修復を低下させる。",
    "choiceExplanations": {
      "ア": "線量減少率の定義は正しいが、ラジカル消去剤が抑えるのは水の放射線分解などを介する間接作用である。",
      "イ": "ラジカルは電離後に形成される反応性種であり、消去剤が直接の電離そのものを止めるわけではない。",
      "ウ": "ミソニダゾールは低酸素で酸素のように放射線損傷を固定する増感剤であり、DNA に組み込まれるヌクレオシド類似体ではない。",
      "エ": "同じ効果を得るために防護剤ありで必要な線量を、なしの線量で割って線量減少率を求める。DNA-PK の阻害は二本鎖切断の非相同末端結合を妨げ、損傷の修復を低下させる。",
      "オ": "DNA-PK 阻害による増感は妥当だが、ミソニダゾールは DNA に取り込まれることで効果を示す薬剤ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q094",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "細胞生物学（形態学を含む。）・放射線生物学",
    "topicTags": [
      "DNA損傷と修復の経路",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "DNA 損傷の生成と修復に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ DNA 損傷のうち、塩基損傷は紫外線や化学物質など電離放射線以外のものでも生成するが、DNA 鎖切断は電離放射線のみで生成される。\n㋑ 真核細胞は、DNA 一本鎖切断の修復では遺伝情報を正確に保持できるが、DNA 二本鎖切断の修復では遺伝情報の欠損を避けることができない。\n㋒ 紫外線が形成したピリミジンダイマーを、可視光のエネルギーで開裂して元のピリミジンに復帰させる光回復は、有胎盤類を除く脊椎動物から細菌まで幅広く存在する。\n㋓ DNA 修復遺伝子の機能欠損を伴うヒト遺伝病として、色素性乾皮症、コケイン症候群、毛細血管拡張性運動失調症、ファンコニ貧血が挙げられる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "光回復では光で活性化された光回復酵素がピリミジンダイマーを分解し、その機構は生物界に広く分布する。挙げられた疾患は DNA 修復や損傷応答の遺伝的な異常に関連する。",
    "choiceExplanations": {
      "ア": "DNA鎖切断は化学物質や細胞内の反応でも生じる。また、二本鎖切断を相同組換えで忠実に修復できる場合がある。",
      "イ": "光回復は妥当だが、活性酸素や複製フォークの崩壊も鎖切断を生じさせ得る。",
      "ウ": "光回復は妥当だが、相同な姉妹染色分体を鋳型に使えば、二本鎖切断の修復で塩基配列を保持できる場合がある。",
      "エ": "挙げられた疾患は DNA 損傷への応答や修復の異常に関連するが、二本鎖切断の修復で必ず配列が欠失するわけではない。",
      "オ": "光回復では光で活性化された光回復酵素がピリミジンダイマーを分解し、その機構は生物界に広く分布する。挙げられた疾患は DNA 修復や損傷応答の遺伝的な異常に関連する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q095",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "ハーディ・ワインベルク平衡",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ショウジョウバエの眼の色は1対の対立遺伝子 R と r によって支配され、RR で赤色、Rr でオレンジ色、rr で白色となる。あるショウジョウバエの集団ではハーディ・ワインベルク平衡が成立しており、眼の色が赤色・オレンジ色・白色となる個体の比がそれぞれ 9：6：1 であった。このとき、R の対立遺伝子頻度として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.50",
      "イ": "0.75",
      "ウ": "0.875",
      "エ": "0.9375",
      "オ": "決定できない"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "赤色は RR なので R の頻度 p は p²＝9/16 を満たす。また Rr は R を1個だけもつので、R のコピーを16個体で直接数えても (2×9＋6)/(2×16)＝0.75 である。",
    "choiceExplanations": {
      "ア": "頻度が0.50なら、平衡状態での遺伝子型の比は1：2：1となり、9：6：1にはならない。",
      "イ": "赤色は RR なので R の頻度 p は p²＝9/16 を満たす。また Rr は R を1個だけもつので、R のコピーを16個体で直接数えても (2×9＋6)/(2×16)＝0.75 である。",
      "ウ": "頻度0.875に対応する rr の割合は (1−0.875)²＝1/64 で、白色の観測割合1/16より少ない。",
      "エ": "0.9375 は R を少なくとも1本もつ個体の割合15/16であり、対立遺伝子のコピーとしての頻度とは異なる。",
      "オ": "三つの表現型から三つの遺伝子型の割合が分かるので、R のコピー数を数えて頻度を決定できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q096",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "劣性上位とタマネギの色",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "タマネギの鱗茎色に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「タマネギの鱗茎色には赤色・黄色・白色の3色があり、2対の互いに独立した遺伝子座によって支配されている。鱗茎色が黄色の個体と白色の個体を交雑して得られた F₁ 世代の鱗茎色が全て赤色となったとき、この F₁ 個体どうしを交配して得られた F₂ 世代における鱗茎色の分離比は赤色・黄色・白色がそれぞれ［㋐］となる。これは、片方の遺伝子座における遺伝子型が潜性（劣性）ホモになると、もう一方の遺伝子座の遺伝子型に関係なく鱗茎色が［㋑］になるためである。」",
    "choices": {
      "ア": "12：3：1／赤色",
      "イ": "9：3：4／白色",
      "ウ": "9：0：7／白色",
      "エ": "13：3：0／赤色",
      "オ": "15：0：1／赤色"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "一方の遺伝子が劣性ホモのとき色素が作られず、通常の二遺伝子雑種の3と1が合わさって白色4になる。色素ができる残りの遺伝子型は、もう一方の遺伝子によって赤色9、黄色3に分かれる。",
    "choiceExplanations": {
      "ア": "12：3：1 は優性上位に対応する比の一つであり、劣性ホモの4区画が白色にまとまるこの場合とは異なる。",
      "イ": "一方の遺伝子が劣性ホモのとき色素が作られず、通常の二遺伝子雑種の3と1が合わさって白色4になる。色素ができる残りの遺伝子型は、もう一方の遺伝子によって赤色9、黄色3に分かれる。",
      "ウ": "この組合せだと黄色が消えるが、白色を決める座が優性型で色を決める座が劣性ホモなら黄色になる。",
      "エ": "一方の座の劣性ホモでは色素が作れないので、白色の分離数が0にはならない。",
      "オ": "15：0：1では黄色が出現しないが、劣性上位のこの例では赤色・黄色・白色の三つが分離する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q097",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "相補鎖とコドンの読み取り",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次に示した塩基配列は、あるタンパク質をコードする DNA 及びそこから転写された mRNA の部分配列であり、不明な箇所を「＿」で示す。この配列がコードするタンパク質の6番目のアミノ酸として最も妥当なのはどれか。なお、解答に当たっては以下のコドン表を参考にしてもよい。",
    "choices": {
      "ア": "バリン",
      "イ": "ヒスチジン",
      "ウ": "チロシン",
      "エ": "セリン",
      "オ": "ロイシン"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "相補性から mRNA の先頭1〜3塩基は AUG になる。第6コドンの16〜18塩基は、mRNA の C と鋳型鎖の A、T に対応する U、A を合わせて CUA となり、ロイシンを指定する。",
    "choiceExplanations": {
      "ア": "バリンのコドンは GU で始まるが、第6コドンの最初の塩基は mRNA に示されている C である。",
      "イ": "ヒスチジンのコドンは CAU または CAC であり、鋳型鎖から補った第2塩基 U と合わない。",
      "ウ": "チロシンは UAU または UAC に対応し、この位置のコドンの先頭 C と一致しない。",
      "エ": "セリンには UCN と AGU・AGC のコドンがあるが、示された配列から得られる CUA では指定されない。",
      "オ": "相補性から mRNA の先頭1〜3塩基は AUG になる。第6コドンの16〜18塩基は、mRNA の C と鋳型鎖の A、T に対応する U、A を合わせて CUA となり、ロイシンを指定する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q097.webp"
    ],
    "imageAltTexts": [
      "DNAの正鎖と負鎖、転写されたmRNAの部分配列、標準コドン表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q098",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "常染色体顕性遺伝と浸透率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "遺伝様式に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「ヒトの常染色体顕性（優性）の単一遺伝子疾患は、両親のどちらかが疾患対立遺伝子のヘテロ接合状態の患者で、もう一方が健常者であるとき、その単一遺伝子疾患を発症する子が生まれる確率は［㋐］となると予想できる。しかし、［㋑］が低い疾患では、発症確率が家系情報からの予想よりも低くなることがある。また、疾患対立遺伝子が特定の性別の親から伝達されたときにのみ発症する単一遺伝子疾患も存在し、これには［㋒］が関与していると考えられている。」",
    "choices": {
      "ア": "25%／浸透率（浸透度）／発現促進",
      "イ": "25%／表現度／インプリンティング（遺伝的刷り込み）",
      "ウ": "50%／浸透率（浸透度）／発現促進",
      "エ": "50%／浸透率（浸透度）／インプリンティング（遺伝的刷り込み）",
      "オ": "50%／表現度／発現促進"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "変異をもたない親との間では疾患対立遺伝子が2分の1の確率で伝わり、完全浸透なら発症も50%になる。浸透率が低いと発症の割合が下がり、アレルの親由来に依存する発現にはインプリンティングが関わる。",
    "choiceExplanations": {
      "ア": "ヘテロ接合の親から疾患対立遺伝子を受け取る確率は1/2である。また、親由来による発現差にはインプリンティングが関わる。",
      "イ": "インプリンティングは妥当だが、疾患対立遺伝子の伝達は50%であり、現れるかどうかの割合は表現度ではなく浸透率である。",
      "ウ": "伝達確率と浸透率は合うが、父由来か母由来かで発現が変わる仕組みはインプリンティングである。",
      "エ": "変異をもたない親との間では疾患対立遺伝子が2分の1の確率で伝わり、完全浸透なら発症も50%になる。浸透率が低いと発症の割合が下がり、アレルの親由来に依存する発現にはインプリンティングが関わる。",
      "オ": "表現度は発症した人での症状の程度を表し、変異を持つ人のうち症状が現れる割合は浸透率である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q099",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "哺乳類のX・Y染色体の進化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "一般的な哺乳動物の XY 型の性染色体の進化に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ Y 染色体が遺伝子重複を繰り返して多数の遺伝子を獲得することで X 染色体が生じた。\n㋑ Y 染色体の一部の遺伝子は、X 染色体上に相同な遺伝子をもつ。\n㋒ Y 染色体から見積もった有効な集団の大きさは、X 染色体のそれに比べて大きい。\n㋓ Y 染色体は X 染色体と比べて相同組換えの頻度が低いので、突然変異が蓄積しやすい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "X と Y が共通の祖先をもつため、Y には X と相同な遺伝子が残る。Y の大部分では X との組換えが抑えられ、連鎖した有害変異を選択で除きにくくなることがある。",
    "choiceExplanations": {
      "ア": "X と Y は祖先の一対の常染色体に由来し、Y の遺伝子重複で X が生じたわけではない。",
      "イ": "Y に由来して X ができたという説明は妥当でなく、一般に Y の有効集団サイズは X より小さい。",
      "ウ": "X と Y の相同遺伝子は残るが、Y は父から息子へのみ伝わり、標準的なモデルでは X より有効集団サイズが小さい。",
      "エ": "X と Y が共通の祖先をもつため、Y には X と相同な遺伝子が残る。Y の大部分では X との組換えが抑えられ、連鎖した有害変異を選択で除きにくくなることがある。",
      "オ": "Y の組換えが少ない点は妥当だが、性比などが同じ標準的条件では Y の有効集団サイズは X より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q100",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "遺伝学・進化学",
    "topicTags": [
      "動物の形態進化と系統",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "動物の形態の進化に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 幼形進化（幼形成熟）とは、生殖器官とそれ以外の器官の両方が発達しないまま成体になるような進化の仕方で、メキシコサンショウウオで見られる。\n㋑ ゴカイなどの環形動物は体節をもっており、センチュウなどの線形動物よりも節足動物に系統的に近縁である。\n㋒ ベルグマンの法則とは、恒温動物の同種や近縁種の間ではより寒冷な地域の個体ほど身体のサイズが大きくなるという法則である。\n㋓ 棘皮動物には放射相称のボディプランをもつ種が多いが、これらは左右相称のボディプランをもつ祖先種から進化した。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "寒冷な環境では大型の恒温動物ほど体積に対する表面積が小さく、体熱を失いにくい。棘皮動物の成体でみられる放射相称は左右相称の祖先に由来し、現生種でも幼生は左右相称を示す。",
    "choiceExplanations": {
      "ア": "幼形成熟でも生殖器官は成熟し、環形動物の体節だけから節足動物との近縁性は判断できない。",
      "イ": "ベルグマンの法則は妥当だが、幼形成熟では幼体の形態を保ちつつ繁殖可能な段階に達する。",
      "ウ": "㋒は妥当だが、節足動物と線形動物はいずれも脱皮動物に分類されるため、環形動物をより近縁とするのは妥当でない。",
      "エ": "棘皮動物は左右相称動物に由来するが、環形動物は節足動物・線形動物と同じ脱皮動物群には入らない。",
      "オ": "寒冷な環境では大型の恒温動物ほど体積に対する表面積が小さく、体熱を失いにくい。棘皮動物の成体でみられる放射相称は左右相称の祖先に由来し、現生種でも幼生は左右相称を示す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q101",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "湖の富栄養化と状態の急変",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "湖の富栄養化に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 富栄養化により生物の成長が促進されるが、環境収容力を超えた生物が密度効果により減少することが主な原因となり生物多様性が低下する。\n㋑ 栄養塩の外部負荷が増えたことで富栄養化が発生した場合、外部負荷を元の状態に戻しても富栄養化が解消されるとは限らない。\n㋒ 環境条件の変化がわずかであってもレジームシフトを起こし、生態系の状態が急激に変化して富栄養化の状態になる場合がある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "底泥からのリンの溶出などの内部負荷があると、外部負荷を減らしても富栄養な状態が維持され得る。生態系の正のフィードバックにより、条件の小さな変化で状態が急変する場合がある。",
    "choiceExplanations": {
      "ア": "㋑は妥当だが、富栄養化での多様性低下には、藻類の優占、遮光や分解に伴う低酸素などが関わる。",
      "イ": "急激な状態変化は妥当だが、富栄養化による種の減少を個体群が収容力を超えたことだけで主に説明するのは適切でない。",
      "ウ": "㋑は妥当であり、外部の栄養負荷などの変化が転換点を越えれば急変し得る㋒も妥当である。",
      "エ": "底泥からのリンの溶出などの内部負荷があると、外部負荷を減らしても富栄養な状態が維持され得る。生態系の正のフィードバックにより、条件の小さな変化で状態が急変する場合がある。",
      "オ": "㋒に加え、外部負荷を元に戻しても以前の状態に戻らない場合があるという㋑も正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q102",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "ロトカ–ヴォルテラ競争と種の共存",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "競争に関する次の記述の空欄に当てはまるものとして最も妥当なのはどれか。\n「競争関係にある種 A と種 B の密度をそれぞれ N_A、N_B とし、2種の密度が時刻 t により次式のロトカ・ヴォルテラの競争式に従って変化するとする。\ndN_A/dt＝r_A[1−(N_A＋α_AB N_B)/K_A]N_A\ndN_B/dt＝r_B[1−(N_B＋α_BA N_A)/K_B]N_B\nここで、r_A と r_B は種 A と種 B の内的自然増加率、K_A と K_B はそれぞれ種 A と種 B の環境収容力を表す。α_AB と α_BA は競争係数である。競争係数 α_ij は種 j が種 i に及ぼす影響の大きさを示しており、α_ij N_j はその影響を種 i の密度 N_i に換算したもので、この分だけ競争相手（種 j）から受ける密度効果の増分となる。\n2種の初期密度がそれぞれ0でないとき、2種の初期密度によらずに共存する条件は［　］である。」",
    "choices": {
      "ア": "r_A＝r_B かつ K_A＝K_B",
      "イ": "α_AB＝α_BA かつ K_A＝K_B",
      "ウ": "1/K_A＞α_BA/K_B かつ 1/K_B＞α_AB/K_A",
      "エ": "1/K_A＞α_BA/K_B かつ 1/K_B＜α_AB/K_A",
      "オ": "1/K_A＜α_BA/K_B かつ 1/K_B＜α_AB/K_A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "A がほとんどいないときに B が N_B＝K_B なら、A が増える条件は K_A＞α_AB K_B である。逆に B が増える条件は K_B＞α_BA K_A で、これらを各 K の逆数を用いて書くとこの組合せになる。",
    "choiceExplanations": {
      "ア": "増加率と収容力が同じでも、競争係数が大きく相互の侵入に失敗すると、初期密度によって一方が排除される。",
      "イ": "競争係数が互いに等しいことだけでは、相手が先に定着した場合に侵入できるかを決められない。",
      "ウ": "A がほとんどいないときに B が N_B＝K_B なら、A が増える条件は K_A＞α_AB K_B である。逆に B が増える条件は K_B＞α_BA K_A で、これらを各 K の逆数を用いて書くとこの組合せになる。",
      "エ": "B は A の単独平衡に侵入できるが、A は B の単独平衡に侵入できず、どの初期条件でも共存するとはいえない。",
      "オ": "互いに希少な側から侵入できない不等式なので、先に十分な個体数をもつ種に結果が依存する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q103",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "群落内の光消散と葉面積指数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "下の図は、ヌマガヤ群落とオオオナモミ群落の相対光強度と積算葉面積指数の関係を表している。葉の光合成に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ ヌマガヤ群落の方が下方の葉面積が大きい。\n㋑ 葉面積指数が大きいと、光合成量が大きくなる。\n㋒ オオオナモミの葉は光を効率よく吸収でき、下部に光を逃さない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ヌマガヤは上方での光の減衰が緩く、より大きな積算葉面積指数まで葉が分布する。一方、オオオナモミは同じ積算葉面積指数でも光強度が速く下がり、下部に光が届きにくい。",
    "choiceExplanations": {
      "ア": "㋐は図に合うが、葉が増えても下の葉が遮光されるため、光合成量が葉面積指数だけで増えるとは限らない。",
      "イ": "図から葉面積の分布と光の減衰は読めるが、葉面積指数と群落の光合成量が単調に対応するとは判断できない。",
      "ウ": "ヌマガヤは上方での光の減衰が緩く、より大きな積算葉面積指数まで葉が分布する。一方、オオオナモミは同じ積算葉面積指数でも光強度が速く下がり、下部に光が届きにくい。",
      "エ": "オオオナモミで光が速く弱まる点は合うが、葉の配置と各層の受光を考えずに葉面積指数だけから光合成量を断定できない。",
      "オ": "㋒に加えて、ヌマガヤがより大きな積算葉面積指数の範囲まで葉を維持していると読む㋐も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。 図の出典：彦坂幸毅「ヌマガヤ群落とオオオナモミ群落の相対光強度と積算葉面積指数図」（「光合成の生理生態学講座」掲載）。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q103.webp"
    ],
    "imageAltTexts": [
      "ヌマガヤ群落とオオオナモミ群落の相対光強度と積算葉面積指数"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q104",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "適応放散・収斂と安定化選択",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "適応進化に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 有袋類や有胎盤類のように全く異なる分類群に属するが、住む環境や食べる餌が似ているために、似た姿に進化した二つの種を互いに生態的同位種であるという。\n㋑ 表現型が中間の個体が、極端な個体よりも有利になる場合に起こる選択を、安定化選択という。\n㋒ 限られた祖先の種が、競争者のいない場所で極めて多様な種に分化する現象を適応放散という。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "異なる系統で似たニッチに適応した種が類似した形態を示すことがある。中間型を有利にする選択が安定化選択で、多様なニッチへ系統が分かれる現象が適応放散である。",
    "choiceExplanations": {
      "ア": "㋐のような類似に加え、中間型が有利な安定化選択や、多様な種への適応放散も妥当である。",
      "イ": "㋐と㋑は妥当だが、空いている生態的地位に適応して系統が分岐する㋒も妥当である。",
      "ウ": "異なる系統で似たニッチに適応した種が類似した形態を示すことがある。中間型を有利にする選択が安定化選択で、多様なニッチへ系統が分かれる現象が適応放散である。",
      "エ": "㋑と㋒は妥当だが、異なる地域や系統で類似する生態的役割を担う種を述べた㋐も妥当である。",
      "オ": "適応放散だけでなく、似た環境で生じる形態の収斂と中間型を有利にする選択の説明も合っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q105",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "動物の方向定位",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "動物による位置や方角の把握に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ ミツバチの8の字ダンスは、巣箱から蜜源までの方角と距離を示すが、蜜源の位置が変わらなければ8の字ダンスは時間とともに変わらない。\n㋑ ボボリンクは、越冬などのために移動する際に、地球の磁場を手がかりとして定位している。\n㋒ 昼間に移動する渡り鳥であるホシムクドリは、太陽コンパスと呼ばれる方位を知ることができる仕組みをもつ。太陽コンパスは鳥類に特有の仕組みである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "渡り鳥のボボリンクは移動方向を決める手掛かりとして地球の磁場を使う。太陽の位置を使うコンパスは一部の昆虫にもあり、鳥類に特有ではない。",
    "choiceExplanations": {
      "ア": "ダンスの方向は太陽の方位を基準にするので、同じ蜜源でも時刻による太陽の見かけの移動に応じて変わる。",
      "イ": "ボボリンクの地磁気利用は合っているが、㋐でダンスの方向が時刻によらないとしている点が誤りである。",
      "ウ": "太陽に対する方位は時刻で変わるので㋐は誤りで、太陽を方向の手掛かりにする動物は鳥類以外にもいる。",
      "エ": "渡り鳥のボボリンクは移動方向を決める手掛かりとして地球の磁場を使う。太陽の位置を使うコンパスは一部の昆虫にもあり、鳥類に特有ではない。",
      "オ": "ボボリンクについては妥当だが、太陽コンパスはミツバチなどでもみられるので㋒全体は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kagaku-seibutsu-yakugaku-q106",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku-seibutsu-yakugaku",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "生態学（動物行動学を含む。）・系統分類学",
    "topicTags": [
      "分子系統樹と植物の形質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "下の図は、スーパーマーケットで売られていたエノキタケ、カブ、マツの実、コンブ、ワラビから抽出した DNA の塩基配列に基づいて作成した系統樹である。㋐この系統樹の作成に用いた DNA 配列の由来、㋑ A の生物名、㋒ B と C を区別する形質の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "リボソームRNA遺伝子の一部／コンブ／子房の有無",
      "イ": "リボソームRNA遺伝子の一部／コンブ／維管束の有無",
      "ウ": "リボソームRNA遺伝子の一部／ワラビ／子房の有無",
      "エ": "葉緑体ゲノムの一部／コンブ／維管束の有無",
      "オ": "葉緑体ゲノムの一部／ワラビ／子房の有無"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "菌類から陸上植物までに共通して存在するリボソーム RNA 遺伝子の一部を比較できる。陸上植物の外で分岐する A はコンブで、姉妹群のカブとマツはどちらも維管束をもつが、被子植物のカブだけが子房をもつ。",
    "choiceExplanations": {
      "ア": "菌類から陸上植物までに共通して存在するリボソーム RNA 遺伝子の一部を比較できる。陸上植物の外で分岐する A はコンブで、姉妹群のカブとマツはどちらも維管束をもつが、被子植物のカブだけが子房をもつ。",
      "イ": "A をコンブとする点は妥当だが、B と C に対応するカブとマツはいずれも維管束をもつ。",
      "ウ": "ワラビはカブとマツにより近い維管束植物なので、陸上植物のまとまりから外側で分岐する A にはならない。",
      "エ": "エノキタケは菌類で葉緑体をもたないため、葉緑体ゲノムだけでは5種全てを比較できない。",
      "オ": "子房でカブとマツを区別できるが、エノキタケの葉緑体ゲノムは使えず、A にはワラビよりコンブが当てはまる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016304.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 化学・生物・薬学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kagaku-seibutsu-yakugaku/q106.webp"
    ],
    "imageAltTexts": [
      "エノキタケ、カブ、マツ、コンブ、ワラビの5種の分岐を示す系統樹"
    ]
  }
];
