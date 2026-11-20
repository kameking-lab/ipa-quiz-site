import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2025_SENMON_KAGAKU: Question[] = [
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q10",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "理想気体の状態方程式とグラフ",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "物質量が一定の理想気体について、圧力P、体積V、絶対温度Tの三つの変数のうち一つを一定とし、残り二つの変数の関係をグラフに表すことを考える。このとき、このグラフに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 縦軸にP、横軸に1/Vを取りプロットすると、Pと1/Vは図のような直線関係になる。直線Aは直線Bより温度が高い場合である。\n㋑ 縦軸にV、横軸にTを取りプロットすると、VとTは図のような直線関係になる。直線Aは直線Bより圧力が低い場合である。\n㋒ 縦軸にP、横軸にTを取りプロットすると、PとTは図のような直線関係になる。直線Aは直線Bより体積が小さい場合である。\n㋓ 縦軸にP、横軸にVを取りプロットすると、PとVは図のような直線関係になる。直線Aは直線Bより温度が高い場合である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "PV＝nRTより、Pを1/Vに対して描くと傾きnRT、VをTに対して描くとnR/P、PをTに対して描くとnR/Vとなる。したがって、Aの方が傾きが大きい条件は順に高温、低圧、小体積である。",
    "choiceExplanations": {
      "ア": "㋐ではP＝nRT(1/V)だから、温度が高いほど傾きが大きい。㋑ではV＝(nR/P)T、㋒ではP＝(nR/V)Tなので、二つとも妥当である。",
      "イ": "㋐の傾きは温度に比例し、㋑の傾きは圧力に反比例する。さらに㋒の傾きも体積に反比例するので、㋒を含める必要がある。",
      "ウ": "PV＝nRTより、Pを1/Vに対して描くと傾きnRT、VをTに対して描くとnR/P、PをTに対して描くとnR/Vとなる。したがって、Aの方が傾きが大きい条件は順に高温、低圧、小体積である。",
      "エ": "㋒は妥当であるが、㋓で固定温度ならP＝nRT/Vである。PをVに対して描くと直線ではなく、反比例の曲線になる。",
      "オ": "㋓のように横軸をVに取ると、定温でPはVに反比例する。直線になる横軸は㋐の1/Vである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q10.webp"
    ],
    "imageAltTexts": [
      "同じ原点側から右上へ延びる二つの直線。直線Aの傾きは直線Bより大きい。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q11",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "ダイヤモンドの結合と昇華",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ダイヤモンドの昇華エンタルピーは、ダイヤモンドのC−C単結合の結合エンタルピーのおよそ何倍と考えられるかを示したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1/4倍",
      "イ": "1/2倍",
      "ウ": "1倍",
      "エ": "2倍",
      "オ": "4倍"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各炭素原子は四本の単結合を持つが、一本の結合を両端の炭素が共有している。よって結合の本数は炭素原子数の4/2＝2倍であり、昇華エンタルピーもおよそ2倍になる。",
    "choiceExplanations": {
      "ア": "ダイヤモンドで一つの炭素原子は周囲の四つの炭素と結合している。結合を共有する両端での二重計数を避けても、原子一つ当たりに対応する結合は二本ある。",
      "イ": "結合を二つの原子で共有するので、各原子について4を2で割る。結合一つのエンタルピーに掛ける数は1/2ではなく2である。",
      "ウ": "結晶から気体の原子へ移る際は、原子1 mol当たりの結合をすべて切る。四配位の結晶では結合は原子1 molに対して約2 mol分になる。",
      "エ": "各炭素原子は四本の単結合を持つが、一本の結合を両端の炭素が共有している。よって結合の本数は炭素原子数の4/2＝2倍であり、昇華エンタルピーもおよそ2倍になる。",
      "オ": "四配位という点は合っているが、4倍とすると同じ結合を両方の炭素原子で数える。結晶全体では二重計数を取り除いて2倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q12",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "蒸発のエントロピー変化",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "1 molの水が1気圧、373 Kで液体から気体に変化するときのエントロピー変化として最も妥当なのはどれか。\nただし、水の373 Kにおける蒸発エンタルピーΔH_vapを40.67 kJ·mol⁻¹とする。",
    "choices": {
      "ア": "−109 J·K⁻¹·mol⁻¹",
      "イ": "−40.7 J·K⁻¹·mol⁻¹",
      "ウ": "0.4 J·K⁻¹·mol⁻¹",
      "エ": "40.7 J·K⁻¹·mol⁻¹",
      "オ": "109 J·K⁻¹·mol⁻¹"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "沸点での可逆的な蒸発では、モルエントロピー変化はΔH_vap/Tである。40,670 J/molを373 Kで割ると約109 J·K⁻¹·mol⁻¹になる。",
    "choiceExplanations": {
      "ア": "蒸発熱を絶対温度で割ると約109になる。水が液体から気体になるときは吸熱なので、エントロピー変化の符号は正になる。",
      "イ": "水の蒸発は吸熱過程であり、エントロピーは増える。さらにエンタルピーをJに直し、373 Kで割った値を用いる。",
      "ウ": "40.67 kJは40,670 Jである。373 Kで割る前にこの換算を行うと、モル当たりのエントロピー変化は約109 J/Kになる。",
      "エ": "40.7は蒸発熱をkJで表した数値に近い。エントロピー変化には、蒸発熱を絶対温度で割って単位を変える必要がある。",
      "オ": "沸点での可逆的な蒸発では、モルエントロピー変化はΔH_vap/Tである。40,670 J/molを373 Kで割ると約109 J·K⁻¹·mol⁻¹になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q13",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "二相領域のてこの法則",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の図は、ある圧力下における化合物Aと化合物Bから成る液体混合物の温度―組成図である。相分離に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「この混合物の化合物Aのモル分率が0.5である場合、290 KにおいてAを多く含む相のBのモル分率は［㋐］であり、Bを多く含む相のAのモル分率は［㋑］である。また、Aを多く含む相の物質量はBを多く含む相の物質量の［㋒］倍である。」",
    "choices": {
      "ア": "0.17、0.37、0.4",
      "イ": "0.17、0.37、2.5",
      "ウ": "0.5、0.5、1.0",
      "エ": "0.83、0.63、0.4",
      "オ": "0.83、0.63、2.5"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "290 Kで共存する相のAの分率は0.83と0.37なので、Aの多い相のBの分率は0.17である。てこの法則でAの多い相とBの多い相の物質量比は(0.50−0.37)/(0.83−0.50)≒0.4になる。",
    "choiceExplanations": {
      "ア": "290 Kで共存する相のAの分率は0.83と0.37なので、Aの多い相のBの分率は0.17である。てこの法則でAの多い相とBの多い相の物質量比は(0.50−0.37)/(0.83−0.50)≒0.4になる。",
      "イ": "両相の組成は合っている。Aの多い相の物質量を求めるときには、全体の組成0.5からBの多い側の端0.37までの長さを分子にするので、比は2.5ではなく約0.4になる。",
      "ウ": "全体のAのモル分率0.5は、290 Kで分離した各相の組成とは異なる。各相の組成は、その温度の水平線と相境界の交点から読む。",
      "エ": "物質量比の0.4は正しい。0.83はAの多い相のA、0.63はBの多い相のBのモル分率であり、設問では反対側の成分を尋ねている。",
      "オ": "相の組成はAの多い相でBが0.17、Bの多い相でAが0.37である。てこの法則でAの多い相を分子に置くと、物質量比は約0.4になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q13.webp"
    ],
    "imageAltTexts": [
      "温度とAのモル分率を軸にした相図。290 Kの水平線は二相境界とAの分率0.37、0.83で交わる。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q14",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "二次反応の積分速度式",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "2次反応である反応2A → Pについて考える。反応速度定数が5.4×10⁻³ L·mol⁻¹·s⁻¹、Aの初濃度が1.0 mol·L⁻¹であるとき、Aの濃度が0.8 mol·L⁻¹になるまでにかかる時間として最も妥当なのはどれか。",
    "choices": {
      "ア": "23 s",
      "イ": "35 s",
      "ウ": "47 s",
      "エ": "59 s",
      "オ": "71 s"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "化学量論係数を入れると、反応速度v＝−(1/2)d[A]/dt＝k[A]²である。積分するとt＝(1/0.8−1/1.0)/(2k)となり、約23 sである。",
    "choiceExplanations": {
      "ア": "化学量論係数を入れると、反応速度v＝−(1/2)d[A]/dt＝k[A]²である。積分するとt＝(1/0.8−1/1.0)/(2k)となり、約23 sである。",
      "イ": "Aは反応が一回進むごとに2分子消費されるため、Aの減少速度には係数2が付く。初濃度と終濃度の逆数の差0.25を2kで割ると約23 sになる。",
      "ウ": "約47 sは、Aの減少速度そのものをk[A]²とした場合の値に近い。この設問の反応速度は反応式の係数2で規格化される。",
      "エ": "二次反応では時間に比例するのは濃度ではなくその逆数である。[A]の逆数の差0.25を反応式の係数を含む2kで割るので、59 sにはならない。",
      "オ": "終濃度0.8での逆数は1.25、初濃度の逆数は1である。その差を2×5.4×10⁻³で割ると、71 sより小さい約23 sになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q15",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "o-ヒドロキシ安息香酸の酸性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ヒドロキシ安息香酸の2種類の構造異性体に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「o-ヒドロキシ安息香酸とp-ヒドロキシ安息香酸を比べると、［㋐］-ヒドロキシ安息香酸の方が酸性度が高い。酸解離定数をK_aとすると、［㋐］-ヒドロキシ安息香酸の−log₁₀ K_aの値は［㋑］であり、［㋒］-ヒドロキシ安息香酸の−log₁₀ K_aの値は［㋓］である。」",
    "choices": {
      "ア": "o、1.23、p、2.97",
      "イ": "o、2.97、p、4.54",
      "ウ": "o、4.54、p、2.97",
      "エ": "p、2.97、o、4.54",
      "オ": "p、4.54、o、2.97"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "o体は隣り合うヒドロキシ基の影響を受け、生成するカルボキシラートが分子内水素結合などで安定化する。pK_aはo体が約2.97、p体が約4.54なのでo体の方が強い酸である。",
    "choiceExplanations": {
      "ア": "酸性度が高いのがo体という点は合っている。o体のカルボキシ基のpK_aは約2.97であり、1.23ではない。",
      "イ": "o体は隣り合うヒドロキシ基の影響を受け、生成するカルボキシラートが分子内水素結合などで安定化する。pK_aはo体が約2.97、p体が約4.54なのでo体の方が強い酸である。",
      "ウ": "強い酸ほど酸解離定数K_aが大きく、−log₁₀K_aは小さくなる。o体が強いとしながら、o体に大きい方の値を割り当てている。",
      "エ": "o体で隣接基が解離後のカルボキシラートに影響するため、p体より酸性が強い。pK_aの大小関係もo体が小さくなる。",
      "オ": "pK_aの値の割当て自体は合っている。ただしpK_aが小さい方が強酸なので、酸性度が高いのはp体ではなくo体である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q16",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "ルイス酸塩基と電子対供与",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次に示す㋐、㋑、㋒のそれぞれの反応式において、ルイス塩基として働く化学種の組合せとして最も妥当なのはどれか。\n㋐ Ca²⁺＋4NH₃ → [Ca(NH₃)₄]²⁺\n㋑ Cl⁻＋AlCl₃ → AlCl₄⁻\n㋒ H⁺＋NO₂⁻ → HNO₂",
    "choices": {
      "ア": "Ca²⁺、AlCl₃、H⁺",
      "イ": "Ca²⁺、AlCl₃、HNO₂",
      "ウ": "[Ca(NH₃)₄]²⁺、AlCl₄⁻、HNO₂",
      "エ": "NH₃、AlCl₄⁻、NO₂⁻",
      "オ": "NH₃、Cl⁻、NO₂⁻"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "NH₃は窒素の非共有電子対をCa²⁺に供与し、Cl⁻はAlCl₃に電子対を供与する。NO₂⁻もH⁺との結合を作る際に電子対を与えるので、三つともルイス塩基である。",
    "choiceExplanations": {
      "ア": "この組合せの三つは、順にNH₃、Cl⁻、NO₂⁻から電子対を受け取る側である。ルイス塩基は反対に電子対を与える側を指す。",
      "イ": "Ca²⁺とAlCl₃は電子対を受け取るので、ルイス酸として働く。HNO₂は反応後にできる化合物で、反応前の供与体はNO₂⁻である。",
      "ウ": "挙げられた三つはいずれも反応の生成物である。電子対を与えるのは、反応物側のNH₃、Cl⁻、NO₂⁻である。",
      "エ": "NH₃とNO₂⁻は正しいが、AlCl₄⁻はCl⁻がAlCl₃に電子対を与えた結果生じる。電子対の供与体として選ぶべきなのはCl⁻である。",
      "オ": "NH₃は窒素の非共有電子対をCa²⁺に供与し、Cl⁻はAlCl₃に電子対を供与する。NO₂⁻もH⁺との結合を作る際に電子対を与えるので、三つともルイス塩基である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q17",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "点電荷のクーロンポテンシャル",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "気相中における塩化ナトリウムNaCl分子の、Na⁺イオンとCl⁻イオン間の距離を2.4×10⁻¹⁰ mとする。この距離における、NaCl分子1 mol当たりの、Na⁺イオンとCl⁻イオン間の電荷によるポテンシャルエネルギーとして最も妥当なのはどれか。\nただし、気相中における塩化カリウムKCl分子の、K⁺イオンとCl⁻イオン間の距離を2.7×10⁻¹⁰ mとし、この距離における、KCl分子1 mol当たりの、K⁺イオンとCl⁻イオン間の電荷によるポテンシャルエネルギーを−520 kJ·mol⁻¹とする。また、K⁺、Na⁺、Cl⁻は点電荷とし、それぞれの電荷の絶対値は電気素量とする。",
    "choices": {
      "ア": "−411 kJ·mol⁻¹",
      "イ": "−462 kJ·mol⁻¹",
      "ウ": "−585 kJ·mol⁻¹",
      "エ": "−658 kJ·mol⁻¹",
      "オ": "−740 kJ·mol⁻¹"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "異符号の点電荷のポテンシャルエネルギーは負で、大きさは距離に反比例する。電荷の大きさは等しいので、−520×2.7/2.4＝−585 kJ·mol⁻¹となる。",
    "choiceExplanations": {
      "ア": "電荷の積はNaClとKClで等しく、異符号のためエネルギーは負である。NaClの方がイオン間距離が短いので、エネルギーの絶対値は520より大きくなる。",
      "イ": "−462は距離の比を逆に掛けた値に近い。ポテンシャルエネルギーは距離に反比例するため、NaClでは−520に2.7/2.4を掛ける。",
      "ウ": "異符号の点電荷のポテンシャルエネルギーは負で、大きさは距離に反比例する。電荷の大きさは等しいので、−520×2.7/2.4＝−585 kJ·mol⁻¹となる。",
      "エ": "この候補は距離の比を二乗して掛けた値に近い。逆二乗に従うのは力であり、ここで求めるポテンシャルエネルギーは距離の逆数に比例する。",
      "オ": "距離の変化は2.7から2.4への減少なので、エネルギーの絶対値の倍率は2.7/2.4＝1.125である。絶対値は585で、740まで増加しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q18",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "p軌道の量子数と電子数",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "原子の3p軌道について、方位量子数l、磁気量子数mの取り得る値、全ての3p軌道に収容し得る電子の総数の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0、−1・0・＋1、6",
      "イ": "0、−2・−1・0・＋1・＋2、10",
      "ウ": "1、−1・0・＋1、6",
      "エ": "1、−1・0・＋1、8",
      "オ": "1、−2・−1・0・＋1・＋2、10"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "p軌道の方位量子数はl＝1であり、磁気量子数mは−1、0、＋1を取る。それぞれの軌道に異なるスピンの電子が2個入るため、全体で6個になる。",
    "choiceExplanations": {
      "ア": "mの範囲と収容電子数は3pについて正しい。p軌道では方位量子数l＝1であり、l＝0はs軌道に当たる。",
      "イ": "l＝0ならmは0だけである。mが五通りあり電子が10個入るのはl＝2のd軌道である。",
      "ウ": "p軌道の方位量子数はl＝1であり、磁気量子数mは−1、0、＋1を取る。それぞれの軌道に異なるスピンの電子が2個入るため、全体で6個になる。",
      "エ": "方位量子数と磁気量子数は正しい。三つの軌道に2個ずつ入るので、上限は8個ではなく6個である。",
      "オ": "mは−lから＋lまでの整数を取る。l＝1ならm＝±2にはならず、三つの軌道に6個まで電子が収容される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q19",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "物理化学",
    "topicTags": [
      "表面張力と界面を作る仕事",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "表面張力がγである液体に、半径の長さがaである球形の空洞をつくるときの仕事として最も妥当なのはどれか。",
    "choices": {
      "ア": "πa²γ",
      "イ": "4πa²γ/3",
      "ウ": "2πa²γ",
      "エ": "8πa²γ/3",
      "オ": "4πa²γ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "表面張力γは単位面積の界面を作る仕事に相当する。液体に球形の空洞を作ると界面が4πa²増えるため、必要な仕事は4πa²γになる。",
    "choiceExplanations": {
      "ア": "πa²は球を投影した円の面積である。新しく生じる界面は球の表面全体なので、面積は4πa²となる。",
      "イ": "界面を作る仕事は表面張力に新しい表面積を掛ける。球の表面積には球の体積公式にある1/3の因子は付かない。",
      "ウ": "2πa²は半球の曲面の面積である。空洞は球形なので、新しくできる界面を半球だけで数えることはできない。",
      "エ": "空洞の体積の変化を用いて求める場合でも、圧力差は半径に応じて変化する。表面張力に対応する仕事を直接求めると、球の表面積4πa²との積になる。",
      "オ": "表面張力γは単位面積の界面を作る仕事に相当する。液体に球形の空洞を作ると界面が4πa²増えるため、必要な仕事は4πa²γになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q20",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "フッ化バリウムの溶解度積",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "298 Kにおける、水を溶媒とした場合のフッ化バリウムの溶解度積をK_spとするとき、298 Kにおけるフッ化バリウムの飽和水溶液のモル濃度を表す式として最も妥当なのはどれか。",
    "choices": {
      "ア": "(0.25K_sp)^(1/2)",
      "イ": "(0.5K_sp)^(1/2)",
      "ウ": "(K_sp)^(1/2)",
      "エ": "(0.25K_sp)^(1/3)",
      "オ": "(K_sp)^(1/3)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "モル溶解度をsとすると、平衡で[Ba²⁺]＝s、[F⁻]＝2sである。K_sp＝s(2s)²＝4s³なので、s＝(0.25K_sp)^(1/3)となる。",
    "choiceExplanations": {
      "ア": "フッ化バリウム1 molからフッ化物イオンが2 mol出るため、溶解度積にはその濃度の二乗が入る。溶解度に対して三次式になるので、平方根ではなく立方根を取る。",
      "イ": "溶解度をsとすると、バリウムイオンはs、フッ化物イオンは2sである。フッ化物イオン濃度を二乗するので、係数は2でなく4になる。",
      "ウ": "平方根を取るのは、両イオンが1対1で生じる単純な塩の場合である。BaF₂ではフッ化物イオンが二つ出るため、K_sp＝4s³になる。",
      "エ": "モル溶解度をsとすると、平衡で[Ba²⁺]＝s、[F⁻]＝2sである。K_sp＝s(2s)²＝4s³なので、s＝(0.25K_sp)^(1/3)となる。",
      "オ": "立方根にする点は正しいが、フッ化物イオン濃度はsでなく2sである。K_spには係数4が付くので、立方根の中で4で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q21",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "分子形と双極子モーメント",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の化合物㋐、㋑、㋒を、双極子モーメントが大きい順に並べたものとして最も妥当なのはどれか。\n㋐ 三フッ化窒素\n㋑ 四フッ化ケイ素\n㋒ アンモニア",
    "choices": {
      "ア": "㋐＞㋒＞㋑",
      "イ": "㋐＞㋑＞㋒",
      "ウ": "㋑＞㋒＞㋐",
      "エ": "㋒＞㋐＞㋑",
      "オ": "㋒＞㋑＞㋐"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "NH₃とNF₃は三角錐形だが、N−Fの結合の極性は分子中で孤立電子対側の寄与を打ち消す向きになり、NF₃の双極子は小さい。正四面体形のSiF₄は結合の双極子が打ち消されるので0である。",
    "choiceExplanations": {
      "ア": "正四面体のSiF₄の双極子モーメントが最小という点は合っている。NH₃の双極子モーメントは、結合の向きが互いに打ち消しやすいNF₃より大きい。",
      "イ": "SiF₄は正四面体形で、結合の双極子が互いに打ち消し合う。アンモニアは三角錐形で双極子モーメントが残るため、SiF₄より大きい。",
      "ウ": "正四面体のSiF₄は対称性によって分子全体の双極子モーメントが0になる。三角錐形のNH₃とNF₃にはともに双極子モーメントがある。",
      "エ": "NH₃とNF₃は三角錐形だが、N−Fの結合の極性は分子中で孤立電子対側の寄与を打ち消す向きになり、NF₃の双極子は小さい。正四面体形のSiF₄は結合の双極子が打ち消されるので0である。",
      "オ": "NH₃が最も大きい点は正しい。NF₃は小さいが0ではなく、正四面体形のSiF₄の0より大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q22",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "塩化セシウム型の限界半径比",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "塩化セシウムのイオン結晶は配位数が8である。このイオン結晶の最小のイオン半径比（陽イオン半径／陰イオン半径）として最も妥当なのはどれか。ただし、√2＝1.414、√3＝1.732、√5＝2.236とする。",
    "choices": {
      "ア": "0.23",
      "イ": "0.32",
      "ウ": "0.41",
      "エ": "0.73",
      "オ": "0.88"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "陰イオン半径をr、陽イオン半径をRとすると、限界で立方体の稜は2r、体対角線は2(R＋r)＝2√3rとなる。したがってR/r＝√3−1＝0.732である。",
    "choiceExplanations": {
      "ア": "0.23は四面体型の配位数4の限界値に近い。配位数8では陽イオンの周りの陰イオンは立方体の8頂点に並ぶ。",
      "イ": "立方体の稜を陰イオンの直径2rとすると、稜上で陰イオンが接する場合、中心から頂点までは√3rとなる。中心の陽イオンの半径はこの距離からrを引くので、比は0.32より大きい。",
      "ウ": "0.41は正八面体型の配位数6に対応する限界値に近い。立方体型では陰イオンの隙間の大きさは体対角線から求める。",
      "エ": "陰イオン半径をr、陽イオン半径をRとすると、限界で立方体の稜は2r、体対角線は2(R＋r)＝2√3rとなる。したがってR/r＝√3−1＝0.732である。",
      "オ": "0.88では陽イオンは立方体型の隙間に入るが、配位数8を保てる最小の半径比は√3−1であり、これより小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q23",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "錯体のトランス効果",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ある特定の配位子のトランス位が優先的に置換反応を受ける現象をトランス効果という。配位子Br⁻、CN⁻、NH₃を、この効果が大きい順に並べたものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "Br⁻＞CN⁻＞NH₃",
      "イ": "CN⁻＞Br⁻＞NH₃",
      "ウ": "CN⁻＞NH₃＞Br⁻",
      "エ": "NH₃＞Br⁻＞CN⁻",
      "オ": "NH₃＞CN⁻＞Br⁻"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "CN⁻は強いトランス効果を示し、ハロゲン化物イオンのBr⁻がそれに続く。NH₃によるトランス位の置換促進はこの三種で最も弱い。",
    "choiceExplanations": {
      "ア": "Br⁻はNH₃より大きい効果を示すが、π受容性をもつCN⁻はBr⁻よりトランス位の置換を促進する。",
      "イ": "CN⁻は強いトランス効果を示し、ハロゲン化物イオンのBr⁻がそれに続く。NH₃によるトランス位の置換促進はこの三種で最も弱い。",
      "ウ": "CN⁻を先頭に置く点は妥当である。一方、Br⁻はNH₃より強いトランス効果を示すため、後二つは逆になる。",
      "エ": "NH₃は三種の中では最も弱い。最も強いCN⁻を末尾に置く点も、実際の効果の順序と逆になる。",
      "オ": "CN⁻をBr⁻より上に置く点は妥当である。NH₃のトランス効果はその両方より弱い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q24",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "無機化学",
    "topicTags": [
      "リン酸カルシウム材料とヤング率",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "材料に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ ヒドロキシアパタイトはCa₁₀(PO₄)₆(OH)₂で表すことができる。\n㋑ 物体に応力を与えひずみが発生するとき、物体のヤング率が大きいほどひずみが大きくなる。\n㋒ α型リン酸三カルシウム（α-TCP）とβ型リン酸三カルシウム（β-TCP）を比べた場合、生理食塩水環境下での溶解度はβ-TCPの方が大きい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ヒドロキシアパタイトはCa₁₀(PO₄)₆(OH)₂で表される。弾性域では同じ応力に対しヤング率が大きいほどひずみは小さく、TCPはα型の方がβ型より溶けやすい。",
    "choiceExplanations": {
      "ア": "ヒドロキシアパタイトはCa₁₀(PO₄)₆(OH)₂で表される。弾性域では同じ応力に対しヤング率が大きいほどひずみは小さく、TCPはα型の方がβ型より溶けやすい。",
      "イ": "㋐の組成式は正しいが、生理食塩水環境下でより溶けやすいのはα-TCPであり、㋒の向きは逆である。",
      "ウ": "弾性域の同じ応力σに対するひずみはσ/Eであり、ヤング率Eを大きくするとひずみは小さくなる。",
      "エ": "㋑のひずみは同じ応力でヤング率に反比例する。㋒の溶解度も、生理食塩水環境下ではα-TCPの方が大きい。",
      "オ": "α-TCPとβ-TCPは同じCa₃(PO₄)₂で表されるが結晶構造が異なる。生理食塩水環境下では、より溶けやすい相はα-TCPである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q25",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "二成分の吸光度による同時定量",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "化合物Xと化合物Yから成る混合水溶液の吸光度は、光路長1 cmの光学セルの中で、波長272 nmにおいて0.70、波長327 nmにおいて0.50であった。各波長におけるX、Yそれぞれの純粋な水溶液のモル吸光係数を表に示す。このとき、混合水溶液中におけるXとYの濃度の組合せとして最も妥当なのはどれか。\nただし、XとYは互いに反応せず、これらの測定においては光の吸収のみを考慮するものとする。",
    "choices": {
      "ア": "X：2.50×10⁻⁶ mol/L、Y：1.15×10⁻⁴ mol/L",
      "イ": "X：2.75×10⁻⁵ mol/L、Y：6.50×10⁻⁵ mol/L",
      "ウ": "X：6.50×10⁻⁵ mol/L、Y：2.75×10⁻⁵ mol/L",
      "エ": "X：1.15×10⁻⁴ mol/L、Y：2.50×10⁻⁶ mol/L",
      "オ": "X：1.15×10⁻⁴ mol/L、Y：2.75×10⁻⁵ mol/L"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "光路長が1 cmなので、濃度をx、yとすると16000x＋4000y＝0.70、4000x＋6000y＝0.50となる。連立するとx＝2.75×10⁻⁵ mol/L、y＝6.50×10⁻⁵ mol/Lで両方の吸光度を満たす。",
    "choiceExplanations": {
      "ア": "この組合せの272 nmでの吸光度は0.040＋0.460＝0.500になる。272 nmの測定値は0.70である。",
      "イ": "光路長が1 cmなので、濃度をx、yとすると16000x＋4000y＝0.70、4000x＋6000y＝0.50となる。連立するとx＝2.75×10⁻⁵ mol/L、y＝6.50×10⁻⁵ mol/Lで両方の吸光度を満たす。",
      "ウ": "272 nmにおけるXの寄与だけで16000×6.50×10⁻⁵＝1.04になる。Yの寄与を足す前に観測値0.70を超えている。",
      "エ": "このX濃度では272 nmにおけるXの寄与だけで1.84になる。Yが少量でも、吸光度の和は観測値を大きく上回る。",
      "オ": "この組合せでは327 nmの吸光度は0.460＋0.165＝0.625である。272 nmでも1.95になり、どちらも測定値と合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q25.webp"
    ],
    "imageAltTexts": [
      "モル吸光係数は272 nmでXが16000、Yが4000、327 nmでXが4000、Yが6000。単位はmol⁻¹・L・cm⁻¹。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q26",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "ハロゲン化銀の溶解度積と滴定曲線",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図中の曲線㋐、㋑、㋒は、Cl⁻、Br⁻、I⁻のいずれかのイオンを0.1 mol/L含む水溶液25 mLを、0.05 mol/Lの銀イオン（Ag⁺）を含む水溶液で滴定した結果である。曲線㋐、㋑、㋒それぞれに含まれているイオンの組合せとして最も妥当なのはどれか。\nただし、[Ag⁺]はCl⁻、Br⁻、I⁻のいずれかのイオンを含む水溶液中の銀イオンの濃度を表す。また、溶解度積は、AgCl：1.8×10⁻¹⁰ mol²/L²、AgBr：5.0×10⁻¹³ mol²/L²、AgI：8.3×10⁻¹⁷ mol²/L²とする。",
    "choices": {
      "ア": "㋐：Br⁻、㋑：Cl⁻、㋒：I⁻",
      "イ": "㋐：Br⁻、㋑：I⁻、㋒：Cl⁻",
      "ウ": "㋐：Cl⁻、㋑：Br⁻、㋒：I⁻",
      "エ": "㋐：I⁻、㋑：Cl⁻、㋒：Br⁻",
      "オ": "㋐：I⁻、㋑：Br⁻、㋒：Cl⁻"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "当量点前はハロゲン化物イオンX⁻が過剰で、[Ag⁺]はKsp/[X⁻]で見積もれる。Kspが小さいAgI、AgBr、AgClの順にpAgが大きいので、上からI⁻、Br⁻、Cl⁻である。",
    "choiceExplanations": {
      "ア": "最も溶けにくいAgIを生じる溶液では当量点前の遊離銀イオン濃度が最も小さい。よってI⁻は最下段の㋒ではなく最上段の㋐に対応する。",
      "イ": "㋒をCl⁻とする点は妥当であるが、AgIの溶解度積はAgBrより小さいので、I⁻を含む㋐のpAgはBr⁻を含む㋑より大きい。",
      "ウ": "AgClは三種で最も溶解度積が大きいので、当量点前で遊離銀イオン濃度が最大になる。縦軸は負の対数なので、Cl⁻は最下段の㋒になる。",
      "エ": "㋐はI⁻であるが、AgBrの溶解度積はAgClより小さい。よってpAgの値が中間になる曲線㋑はBr⁻、最小になる曲線㋒はCl⁻である。",
      "オ": "当量点前はハロゲン化物イオンX⁻が過剰で、[Ag⁺]はKsp/[X⁻]で見積もれる。Kspが小さいAgI、AgBr、AgClの順にpAgが大きいので、上からI⁻、Br⁻、Cl⁻である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q26.webp"
    ],
    "imageAltTexts": [
      "銀イオン溶液の滴下量と−log₁₀[Ag⁺]のグラフ。滴下量50 mLより手前では、上から㋐、㋑、㋒の順である。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q27",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "二酸化炭素の分子振動とラマン活性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図に示すCO₂分子振動の㋐、㋑、㋒のうち、ラマン活性であるもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ラマン活性には振動に伴う分極率の変化が必要であり、CO₂では㋐の対称伸縮がこれに当たる。㋑の逆対称伸縮と㋒の変角は双極子モーメントを変化させる赤外活性の振動である。",
    "choiceExplanations": {
      "ア": "ラマン活性には振動に伴う分極率の変化が必要であり、CO₂では㋐の対称伸縮がこれに当たる。㋑の逆対称伸縮と㋒の変角は双極子モーメントを変化させる赤外活性の振動である。",
      "イ": "㋐の対称伸縮は分極率を変えるが、㋑の逆対称伸縮は主に双極子モーメントを変えるため、CO₂ではラマン基本振動に含まれない。",
      "ウ": "㋐はラマン活性である。㋒の変角は直線構造の上下方向に双極子モーメントを生じ、赤外吸収の基本振動になる。",
      "エ": "㋑で左右のC–O結合が片方ずつ伸び縮みすると、結合軸方向に双極子モーメントが変化する。ラマン活性の対称伸縮は㋐である。",
      "オ": "逆対称伸縮㋑と変角㋒はいずれも中心対称な分子の反対称振動で、赤外活性である。分極率が変化する対称伸縮㋐だけを選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q27.webp"
    ],
    "imageAltTexts": [
      "㋐は二つのOが中心のCに対し逆向きに伸縮、㋑は二つのOが同じ軸方向に動く逆対称伸縮、㋒は分子軸に垂直な変角振動。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q28",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "分析化学",
    "topicTags": [
      "プロトンNMRと赤外スペクトルによる構造決定",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図は、ある化合物の¹H NMRスペクトルおよびIRスペクトルである。この化合物の構造式として最も妥当なのはどれか。",
    "choices": {
      "ア": "構造式1",
      "イ": "構造式2",
      "ウ": "構造式3",
      "エ": "構造式4",
      "オ": "構造式5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "芳香族の2H＋2Hはパラ二置換環、4 ppm付近の3Hと2Hは芳香環のメトキシ基とベンジル位CH₂、残りの3Hはアセチル基のメチルに対応する。IRのC＝O吸収も構造式5のケトンと合う。",
    "choiceExplanations": {
      "ア": "構造式1は芳香環がオルト二置換で、環上の水素4個が二組の等価な2Hに分かれる対称性をもたない。図の芳香族シグナルは2Hずつの二組である。",
      "イ": "構造式2のイソプロピル基には等価な二つのメチル基があり、6Hのシグナルが予想される。図にはその積分比がなく、IRにはカルボニルの吸収がある。",
      "ウ": "構造式3は末端にOHをもつアルコールで、図に示された強いカルボニル吸収に対応するC＝Oをもたない。",
      "エ": "構造式4のエトキシ基は2Hと3Hのシグナルを与えるが、芳香環に直結するメトキシ基はない。図の4 ppm付近にある3Hのシグナルはメトキシ基に対応する。",
      "オ": "芳香族の2H＋2Hはパラ二置換環、4 ppm付近の3Hと2Hは芳香環のメトキシ基とベンジル位CH₂、残りの3Hはアセチル基のメチルに対応する。IRのC＝O吸収も構造式5のケトンと合う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q28.webp"
    ],
    "imageAltTexts": [
      "プロトンNMRの積分比A：B：C：D：Eは2：2：3：2：3で、IRスペクトルも併記されている。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q28-1.webp",
      "イ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q28-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q28-3.webp",
      "エ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q28-4.webp",
      "オ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q28-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q29",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "ジクロロシクロヘキサンの立体異性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ジクロロシクロヘキサンの異性体A～Eに関する記述㋐～㋔のうち、妥当なもののみを挙げているのはどれか。\n㋐ AとBはジアステレオマーの関係にある。\n㋑ AとCはジアステレオマーの関係にある。\n㋒ Bはキラルであり、Dはアキラルである。\n㋓ AとEはエナンチオマーの関係にある。\n㋔ CとEはエナンチオマーの関係にある。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋓",
      "エ": "㋑、㋔",
      "オ": "㋒、㋔"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Bは対称性をもつ1,4-置換体なのでアキラルである。また、CとEの間にはcisとtransの違いがあるので、鏡像異性体ではない。",
    "choiceExplanations": {
      "ア": "AとBでは塩素の置換位置が1,2位と1,4位で異なるので立体異性体の関係にない。また、Bには対称性があり、キラルではない。",
      "イ": "AとEが鏡像異性体である点は妥当である。AとBの間では塩素の置換位置が異なるため、㋐は成立しない。",
      "ウ": "AとCは同じ1,2-置換でtransとcisの違いがあり、ジアステレオマーである。AとEでは隣接する二つの塩素の上下がともに逆で、重ね合わせられない鏡像の関係になる。",
      "エ": "AとCのジアステレオマーの関係は妥当である。CとEもcisとtransの違いがあり、鏡像を取ってもcisとtransは入れ替わらない。",
      "オ": "Bは対称性をもつ1,4-置換体なのでアキラルである。また、CとEの間にはcisとtransの違いがあるので、鏡像異性体ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q29.webp"
    ],
    "imageAltTexts": [
      "ジクロロシクロヘキサンの椅子形構造A～E。各構造で二つの塩素置換基と水素の向きを示す。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q30",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "カルボカチオンの安定性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "A、B、Cのそれぞれの化学種㋐、㋑のうち、より安定なカルボカチオンを選び出したものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "A：㋐、B：㋐、C：㋐",
      "イ": "A：㋐、B：㋐、C：㋑",
      "ウ": "A：㋐、B：㋑、C：㋐",
      "エ": "A：㋑、B：㋐、C：㋑",
      "オ": "A：㋑、B：㋑、C：㋐"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "BのベンジルカチオンとCの七員環は安定な方を選んでいる。Aでは正電荷をもつ炭素にアルキル基が三つ結合した㋑の方が安定である。",
    "choiceExplanations": {
      "ア": "Cで選ぶ七員環の㋐は6π電子で芳香族性をもつ。一方、Aの㋐は第二級であり、Bの㋐にはベンジル型の共鳴安定化がない。",
      "イ": "Aではアルキル置換の多い㋑、Bでは芳香環との共鳴がある㋑が安定になる。Cでも㋑の五員環は4π電子のため、6π電子の㋐が有利である。",
      "ウ": "BのベンジルカチオンとCの七員環は安定な方を選んでいる。Aでは正電荷をもつ炭素にアルキル基が三つ結合した㋑の方が安定である。",
      "エ": "Aの㋑は第三級で妥当だが、Bの㋐には芳香環に正電荷を分散させる共鳴がない。Cの㋑も4π電子の反芳香族性のため不利である。",
      "オ": "Aは超共役などで安定化する第三級の㋑、Bは共鳴するベンジル型の㋑である。Cの㋐は6π電子をもつ芳香族のトロピリウムカチオンで、4π電子の㋑より安定である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q30.webp"
    ],
    "imageAltTexts": [
      "カルボカチオンの組。Aは第二級と第三級、Bはエチルとベンジル、Cは七員環と五員環。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q31",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "パラ置換安息香酸エステルの加水分解",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図の反応において、パラ置換安息香酸メチルA、B、Cを加水分解のされやすい順に並べたものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "A＞B＞C",
      "イ": "A＞C＞B",
      "ウ": "B＞C＞A",
      "エ": "C＞A＞B",
      "オ": "C＞B＞A"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "電子求引性が強いとカルボニル炭素へのOH⁻の付加が進みやすい。パラ置換基の正味の効果はニトロ基、臭素、メトキシ基の順に電子を引くので、C＞A＞Bになる。",
    "choiceExplanations": {
      "ア": "ニトロ基の電子求引効果は三つの置換基で最も強く、カルボニルへのOH⁻の付加を促す。したがってCは末尾ではなく先頭になる。",
      "イ": "三つのうちメトキシ基は共鳴で芳香環へ電子を供与し、Bが最も加水分解されにくい。Aの臭素より電子求引性が強いCのニトロ基が先に来る。",
      "ウ": "Bのメトキシ基は共鳴で電子を供与する。カルボニルがOH⁻の攻撃を受けやすくなるのは、電子求引性のニトロ基をもつCの方である。",
      "エ": "電子求引性が強いとカルボニル炭素へのOH⁻の付加が進みやすい。パラ置換基の正味の効果はニトロ基、臭素、メトキシ基の順に電子を引くので、C＞A＞Bになる。",
      "オ": "最も反応しやすいCは合っている。パラ位の臭素は正味では電子求引性で、共鳴で電子を供与するメトキシ基をもつBよりAが反応しやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q31.webp"
    ],
    "imageAltTexts": [
      "エステルの塩基性加水分解。パラ置換基XはAがBr、BがOCH₃、CがNO₂。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q32",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "SN2反応と立体障害・脱離基",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "A、B、Cのそれぞれの化合物㋐、㋑のうち、よりSₙ2反応が起こりやすい化合物を選び出したものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "A：㋐、B：㋐、C：㋑",
      "イ": "A：㋐、B：㋑、C：㋐",
      "ウ": "A：㋐、B：㋑、C：㋑",
      "エ": "A：㋑、B：㋐、C：㋐",
      "オ": "A：㋑、B：㋐、C：㋑"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Aは立体障害が小さい第一級の㋐、BはBr⁻を脱離基にもつ㋑が反応しやすい。Cはsp³炭素の塩化メチル㋐が背面攻撃を受け、芳香環上の㋑では通常のSₙ2は起こりにくい。",
    "choiceExplanations": {
      "ア": "Aの第一級塩化物㋐は背面攻撃を受けやすい。Bではエーテルより臭化物㋑、Cでは芳香族塩化物より塩化メチル㋐がSₙ2に適する。",
      "イ": "Aは立体障害が小さい第一級の㋐、BはBr⁻を脱離基にもつ㋑が反応しやすい。Cはsp³炭素の塩化メチル㋐が背面攻撃を受け、芳香環上の㋑では通常のSₙ2は起こりにくい。",
      "ウ": "AとBの選択は妥当である。Cの㋑のC–Clは芳香環のsp²炭素上にあり、塩化メチル㋐と同じ背面攻撃はできない。",
      "エ": "Cの塩化メチル㋐は妥当だが、Aの第三級塩化物㋑では背面が混み合う。Bではエーテルのアルコキシ基より臭化物イオンが脱離しやすい。",
      "オ": "Aの第三級炭素は立体障害が大きく、Cの芳香族炭素も通常のSₙ2の基質になりにくい。Bではエーテルの㋐よりBr⁻を脱離基にもつ㋑が有利である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q32.webp"
    ],
    "imageAltTexts": [
      "Aは第一級塩化アルキルと第三級塩化アルキル、Bはエーテルと第一級臭化アルキル、Cは塩化メチルとクロロベンゼン。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q33",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "プロパナールのアルドール付加",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のアルドール反応で得られる主生成物として最も妥当なのはどれか。",
    "choices": {
      "ア": "構造式1",
      "イ": "構造式2",
      "ウ": "構造式3",
      "エ": "構造式4",
      "オ": "構造式5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "プロパナールのα炭素が別のプロパナールのカルボニル炭素に結合する。前者のCHOを残し、後者にOHを生じるためCH₃CH₂CH(OH)CH(CH₃)CHOとなる。",
    "choiceExplanations": {
      "ア": "構造式1はジオールで、アルデヒド基を残していない。アルドール付加では一方のカルボニル基だけがヒドロキシ基に変わる。",
      "イ": "構造式2にもヒドロキシ基とアルデヒド基があるが、OHはアルデヒド基に対してγ位にあり、α炭素にメチルの枝分かれがない。プロパナール同士の反応ではα位でC–C結合ができる。",
      "ウ": "構造式3はヒドロキシケトンで、OHがカルボニル基の隣にある。プロパナールの自己付加ではアルデヒド基が残り、OHはそのβ位に付く。",
      "エ": "構造式4は内部にケトンのカルボニル基をもち、ヒドロキシ基をもたない。低温でのアルドール付加はβ-ヒドロキシアルデヒドを与える。",
      "オ": "プロパナールのα炭素が別のプロパナールのカルボニル炭素に結合する。前者のCHOを残し、後者にOHを生じるためCH₃CH₂CH(OH)CH(CH₃)CHOとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q33.webp"
    ],
    "imageAltTexts": [
      "プロパナール2分子から、水酸化ナトリウム水溶液中、10℃でアルドール生成物が生じる反応式。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q33-1.webp",
      "イ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q33-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q33-3.webp",
      "エ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q33-4.webp",
      "オ": "/questions/kokka-ippan-dai/2025/senmon-kagaku/q33-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q34",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "有機化学",
    "topicTags": [
      "ディールス・アルダー反応の立体選択性",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図の各反応における主生成物㋐、㋑、㋒に当てはまる化合物A～Fの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "㋐：A、㋑：C、㋒：E",
      "イ": "㋐：A、㋑：D、㋒：F",
      "ウ": "㋐：B、㋑：C、㋒：E",
      "エ": "㋐：B、㋑：C、㋒：F",
      "オ": "㋐：B、㋑：D、㋒：F"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐ではジエノフィルのtrans配置が保存されてB、㋑ではジエン両端のメチル基が同じ面に来てCとなる。㋒では電子求引性のエステル基が残った二重結合の側に向くendo体Eが優先する。",
    "choiceExplanations": {
      "ア": "㋑の二つのメチル基は同じ面にあるC、㋒は電子求引基がendoのEである。㋐では出発アルケンの二つのエステル基がtransなのでBになる。",
      "イ": "㋐でエステル基を同じ面に置くAは、出発アルケンのtrans配置を保存しない。㋑はメチル基が同じ面のCで、㋒ではendo体のEが優先する。",
      "ウ": "㋐ではジエノフィルのtrans配置が保存されてB、㋑ではジエン両端のメチル基が同じ面に来てCとなる。㋒では電子求引性のエステル基が残った二重結合の側に向くendo体Eが優先する。",
      "エ": "㋐と㋑の配置は出発物質と合う。㋒のFはエステル基が残った二重結合と反対側に向くexo体で、主生成物はendo体Eとなる。",
      "オ": "㋐のBはtrans配置を保つが、㋑でジエン両端のメチルを反対の面に置くDは立体関係が合わない。㋒もendo選択性によりEが主となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q34.webp"
    ],
    "imageAltTexts": [
      "三つの環化付加反応㋐～㋒と生成物候補A～F。それぞれ置換基の立体配置が示されている。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q35",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "高分子化学",
    "topicTags": [
      "数平均分子量と重量平均分子量",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "単分散で分子量が2000、10000、30000の3種の高分子がある。これらの混合物に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n等モルで3種の全ての高分子を混合したときの数平均分子量は㋐であり、重量平均分子量は㋑である。",
    "choices": {
      "ア": "㋐：14000、㋑：14000",
      "イ": "㋐：14000、㋑：18800",
      "ウ": "㋐：14000、㋑：23900",
      "エ": "㋐：18800、㋑：14000",
      "オ": "㋐：18800、㋑：23900"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "等モルなので数平均は(2000＋10000＋30000)/3＝14000である。重量平均は(2000²＋10000²＋30000²)/(2000＋10000＋30000)で、約23900になる。",
    "choiceExplanations": {
      "ア": "数平均分子量は三種の算術平均で14000になる。重量平均は重い分子ほど寄与が大きいので、この混合物では数平均と同じにならない。",
      "イ": "数平均14000は妥当であるが、重量平均では各分子量を質量分率2000/42000、10000/42000、30000/42000で重み付けする。計算すると18800より大きい約23900になる。",
      "ウ": "等モルなので数平均は(2000＋10000＋30000)/3＝14000である。重量平均は(2000²＋10000²＋30000²)/(2000＋10000＋30000)で、約23900になる。",
      "エ": "数平均は重量平均より小さく、等モルのここでは14000になる。重量平均14000では質量の大部分を占める分子量30000の寄与を反映していない。",
      "オ": "重量平均23900は妥当である。等モル混合物では各成分の分子数が同じなので、数平均は三つの分子量を等しく重み付けした14000になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q36",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "工業化学",
    "topicTags": [
      "ソハイオ法",
      "化学区分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ソハイオ法に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ この方法は、プロピレンからアクリロニトリルを合成する方法である。\n㋑ この方法で用いられる触媒として、Mo–Bi系が挙げられる。\n㋒ この方法では、原料をアンモニア存在下で還元する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ソハイオ法はMo–Bi系などの触媒を用いてプロピレンからアクリロニトリルを製造する。アンモニアと酸素が関与するアンモ酸化なので、還元とする㋒は誤りである。",
    "choiceExplanations": {
      "ア": "プロピレンを原料とする点に加え、モリブデンとビスマスを含む酸化物が代表的な触媒であることも妥当である。",
      "イ": "ソハイオ法はMo–Bi系などの触媒を用いてプロピレンからアクリロニトリルを製造する。アンモニアと酸素が関与するアンモ酸化なので、還元とする㋒は誤りである。",
      "ウ": "プロピレンからアクリロニトリルを得る点は妥当である。窒素を導入する過程で酸素も関与するので、㋒の還元という記述は合わない。",
      "エ": "Mo–Bi系触媒を使う点は妥当である。一方、プロピレンからアクリロニトリルを合成する㋐を含め、還元とする㋒を外す必要がある。",
      "オ": "アンモニアはニトリルの窒素源で、酸素が関わる酸化反応である。アンモニアの存在だけをもって還元反応とは判断できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q37",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "脂肪酸のβ酸化",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "生体内における脂肪酸のβ酸化では、飽和アシルCoAは図に示す四つの反応の繰り返しで分解される。図中のX、Y、Zに当てはまる化合物㋐、㋑、㋒の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "X：㋐、Y：㋑、Z：㋒",
      "イ": "X：㋐、Y：㋒、Z：㋑",
      "ウ": "X：㋑、Y：㋒、Z：㋐",
      "エ": "X：㋒、Y：㋐、Z：㋑",
      "オ": "X：㋒、Y：㋑、Z：㋐"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "FAD依存性酸化で不飽和体㋒ができ、その二重結合に水が付加して㋑になる。NAD⁺依存性酸化でβ位のOHがカルボニル基に変わり、㋐となってチオール開裂を受ける。",
    "choiceExplanations": {
      "ア": "最初のFAD依存性酸化でできるのはα位とβ位の間に二重結合をもつ㋒である。㋐のβ-ケト体は二回目の酸化後にできる。",
      "イ": "第一の酸化で生じる㋒はXに入る。その二重結合への水付加でできる㋑がYであり、続く酸化で㋐になる。",
      "ウ": "Zのβ-ケト体㋐は妥当である。水付加では㋒の二重結合が消えてヒドロキシ基をもつ㋑が生じるため、XとYが逆である。",
      "エ": "Xはα、β間に二重結合をもつ㋒である。水付加の直後はβ-ヒドロキシ体㋑で、これを酸化してβ-ケト体㋐へ進む。",
      "オ": "FAD依存性酸化で不飽和体㋒ができ、その二重結合に水が付加して㋑になる。NAD⁺依存性酸化でβ位のOHがカルボニル基に変わり、㋐となってチオール開裂を受ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-kagaku/q37.webp"
    ],
    "imageAltTexts": [
      "脂肪酸のβ酸化の反応経路。二度の酸化の間に水付加があり、最後にチオール開裂する。候補㋐はβ-ケト、㋑はβ-ヒドロキシ、㋒は不飽和のアシルCoAである。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q38",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "アロステリック酵素と遷移状態",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "酵素反応に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ アロステリック酵素は、ミカエリス・メンテンの式には従わない。\n㋑ 酵素は、反応の平衡点をずらすことで反応速度を加速する。\n㋒ 酵素は、遷移状態の形成を容易にし、反応を加速する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "アロステリック酵素では、基質結合の協同性などにより単純なミカエリス・メンテン式から外れる。酵素は遷移状態を安定化して活性化障壁を下げ、平衡を変えずに反応を促進する。",
    "choiceExplanations": {
      "ア": "基質の結合に協同性がある場合、反応速度の基質濃度依存性は単純なミカエリス・メンテン式で表せない。遷移状態の形成を容易にする㋒も妥当である。",
      "イ": "㋐は妥当であるが、触媒は平衡定数を変えない。酵素によって変わるのは、正反応と逆反応が平衡に達するまでの速さである。",
      "ウ": "アロステリック酵素では、基質結合の協同性などにより単純なミカエリス・メンテン式から外れる。酵素は遷移状態を安定化して活性化障壁を下げ、平衡を変えずに反応を促進する。",
      "エ": "遷移状態の形成を容易にする㋒は正しい。㋑の平衡点は反応物と生成物の自由エネルギー差で決まるため、酵素の有無では変わらない。",
      "オ": "遷移状態を形成しやすくすることは酵素作用の説明である。協同的なアロステリック酵素は典型的にシグモイド型の速度曲線を示すため、㋐も含む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q39",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "ポリメラーゼ連鎖反応の基本要素",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "㋐～㋔のうち、ポリメラーゼ連鎖反応（PCR）による標的DNAの指数関数的増幅のために必要な試料・薬品として妥当なもののみを挙げているのはどれか。\n㋐ 標的DNA二本鎖の両側の配列と結合する1組のプライマー\n㋑ 標的DNAを含む鋳型二本鎖DNAに対して極少量のプライマー\n㋒ A、T、G、Cの4種類の各塩基\n㋓ 熱に安定なDNAポリメラーゼ\n㋔ Mg²⁺イオンを含む緩衝液",
    "choices": {
      "ア": "㋐、㋑、㋒",
      "イ": "㋐、㋒、㋓",
      "ウ": "㋐、㋓、㋔",
      "エ": "㋑、㋒、㋔",
      "オ": "㋑、㋓、㋔"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "標的の両側に結合する二種類のプライマーが新しい鎖の起点となる。加熱を伴うため耐熱性ポリメラーゼを用い、Mg²⁺はその反応で補因子として働く。",
    "choiceExplanations": {
      "ア": "両側に対応するプライマーの組は妥当である。一方、プライマーは伸長で消費され、取り込まれる基質は遊離塩基ではなくデオキシリボヌクレオシド三リン酸である。",
      "イ": "㋐と㋓は妥当である。㋒の遊離塩基だけではDNA鎖を伸長できず、㋔のMg²⁺はポリメラーゼの反応に関わる。",
      "ウ": "標的の両側に結合する二種類のプライマーが新しい鎖の起点となる。加熱を伴うため耐熱性ポリメラーゼを用い、Mg²⁺はその反応で補因子として働く。",
      "エ": "Mg²⁺を含む緩衝液は妥当である。プライマーは鋳型に対して極少量では増幅を続けられず、遊離塩基も伸長の基質にならない。",
      "オ": "耐熱性ポリメラーゼとMg²⁺を含む緩衝液は妥当である。各鎖の伸長でプライマーが消費されるため、鋳型に対し極少量を選ぶ㋑は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q40",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "生化学",
    "topicTags": [
      "解糖系とTCA回路",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "グルコースの代謝に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n解糖系ではグルコース1分子が一連の反応を経て2分子の㋐へと変換される。㋐はミトコンドリアマトリックスでアセチルCoAに変換され、これがTCA回路に入り㋑と縮合されてクエン酸となる。クエン酸はTCA回路の一連の反応を経て㋑に戻り回路が一回転する。この過程でアセチルCoA 1分子当たり3分子の㋒と1分子のFADH₂が産生される。得られた㋒とFADH₂は電子伝達系で大量のATPの産生に利用される。",
    "choices": {
      "ア": "㋐：オキサロ酢酸、㋑：ピルビン酸、㋒：ATP",
      "イ": "㋐：オキサロ酢酸、㋑：ピルビン酸、㋒：ADP",
      "ウ": "㋐：オキサロ酢酸、㋑：ピルビン酸、㋒：NADH",
      "エ": "㋐：ピルビン酸、㋑：オキサロ酢酸、㋒：ATP",
      "オ": "㋐：ピルビン酸、㋑：オキサロ酢酸、㋒：NADH"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "解糖系でピルビン酸が生じ、そこからできたアセチルCoAはオキサロ酢酸と縮合する。回路が一回転してオキサロ酢酸を再生する過程で、電子伝達系に供給されるNADHが三分子生じる。",
    "choiceExplanations": {
      "ア": "解糖系でグルコースからできるのはピルビン酸で、オキサロ酢酸はTCA回路で再生する。電子伝達系に電子を渡す三分子の産物はATPではなくNADHである。",
      "イ": "ADPは酸化的リン酸化でATPを作るための基質であり、TCA回路から電子を運ぶ還元型補酵素はNADHである。㋐と㋑もピルビン酸とオキサロ酢酸の順になる。",
      "ウ": "NADHはTCA回路で三分子生じるので㋒は妥当である。解糖系の生成物ピルビン酸とクエン酸合成に使うオキサロ酢酸の位置が逆である。",
      "エ": "㋐と㋑は妥当であるが、電子伝達系に電子を運ぶものはATPではない。回路一回転ではNAD⁺が還元されて三分子のNADHを生じる。",
      "オ": "解糖系でピルビン酸が生じ、そこからできたアセチルCoAはオキサロ酢酸と縮合する。回路が一回転してオキサロ酢酸を再生する過程で、電子伝達系に供給されるNADHが三分子生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q41",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "円管の流量と断面平均流速",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "内径5 mmの円管に、液体を毎分80 mLの流量で流した。このとき、この円管内を流れる液体の平均流速として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.068 m/s",
      "イ": "0.14 m/s",
      "ウ": "0.27 m/s",
      "エ": "0.68 m/s",
      "オ": "1.4 m/s"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "体積流量は80×10⁻⁶/60 m³/s、断面積はπ(2.5×10⁻³)² m²である。体積流量を断面積で割ると約0.068 m/sとなる。",
    "choiceExplanations": {
      "ア": "体積流量は80×10⁻⁶/60 m³/s、断面積はπ(2.5×10⁻³)² m²である。体積流量を断面積で割ると約0.068 m/sとなる。",
      "イ": "0.14 m/sでは内径5 mmの断面を毎分約165 mLが通過する。所定の流量80 mL/minのおよそ2倍になる。",
      "ウ": "平均流速は円管の全断面積で流量を割るので、断面積を求めるときの半径は内径の半分の2.5 mmである。0.27 m/sで逆算すると流量は毎分約318 mLになる。",
      "エ": "0.68 m/sでは必要な体積流量が毎分約800 mLになる。毎分80 mLを秒当たりに直し、断面積で割った値はこの約十分の一である。",
      "オ": "内径が一定なら流量は平均流速に比例する。1.4 m/sを用いると毎分約1650 mLとなり、与えられた毎分80 mLを大きく上回る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q42",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "温度と粘度およびレイノルズ数",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "流体に関する記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n粘度は、流体の流動のしにくさを示す値である。ニュートン流体において、液体は温度が上昇すると粘度が㋐し、気体は温度が上昇すると粘度が㋑する。\nまた、レイノルズ数は、流体の流れの状態が層流か乱流かを判別するのに用いることができる値である。層流の場合、乱流の場合よりもレイノルズ数は㋒なる。",
    "choices": {
      "ア": "㋐：増加、㋑：減少、㋒：大きく",
      "イ": "㋐：増加、㋑：減少、㋒：小さく",
      "ウ": "㋐：減少、㋑：増加、㋒：大きく",
      "エ": "㋐：減少、㋑：増加、㋒：小さく",
      "オ": "㋐：減少、㋑：減少、㋒：大きく"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "液体は昇温で分子が互いの引力を振り切って移動しやすくなり粘度が下がり、気体は分子運動による運動量輸送が増して粘度が上がる。層流は慣性力に対する粘性力の比が大きいため、レイノルズ数は乱流より小さい。",
    "choiceExplanations": {
      "ア": "一般に昇温すると液体は流れやすくなり粘度が下がるが、気体の粘度は上がる。粘性の影響が相対的に大きい層流ではレイノルズ数は小さい。",
      "イ": "層流のレイノルズ数が小さい点は妥当である。昇温に対して液体と気体の粘度が変わる向きは、この組合せと逆になる。",
      "ウ": "昇温で液体の粘度が減少し、気体の粘度が増加する点は妥当である。層流では慣性に比べて粘性が支配的なので、レイノルズ数は小さくなる。",
      "エ": "液体は昇温で分子が互いの引力を振り切って移動しやすくなり粘度が下がり、気体は分子運動による運動量輸送が増して粘度が上がる。層流は慣性力に対する粘性力の比が大きいため、レイノルズ数は乱流より小さい。",
      "オ": "液体の粘度減少は妥当だが、気体の粘度は昇温によって増加する。層流は慣性に対して粘性が相対的に強いため、レイノルズ数が小さい側に現れる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q43",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "平板壁を介する総括伝熱",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "対流伝熱に関する記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n1枚の平板固体壁の両側を温度の異なる流体が流れていると、壁を通して高温流体（温度T_H）から低温流体（温度T_C）へ熱の流れが生じる。平板固体壁の厚さをx、平板固体壁の熱伝導度をλ、高温流体および低温流体の境膜伝熱係数をそれぞれh_H、h_Cとすると、総括伝熱係数は㋐で表される。また、平板固体壁の伝熱面積をAとすると、単位時間当たりに移動する熱量は㋑で表される。",
    "choices": {
      "ア": "㋐：1/(1/h_H＋x/λ＋1/h_C)、㋑：A(T_H−T_C)/(1/h_H＋x/λ＋1/h_C)",
      "イ": "㋐：1/(1/h_H＋x/λ＋1/h_C)、㋑：A(T_H−T_C)²/(1/h_H＋x/λ＋1/h_C)",
      "ウ": "㋐：(T_H−T_C)/(1/h_H＋x/λ＋1/h_C)、㋑：A(T_H−T_C)/(1/h_H＋x/λ＋1/h_C)",
      "エ": "㋐：(T_H−T_C)/(1/h_H＋x/λ＋1/h_C)、㋑：A(T_H−T_C)²/(1/h_H＋x/λ＋1/h_C)",
      "オ": "㋐：(T_H−T_C)²/(1/h_H＋x/λ＋1/h_C)、㋑：A(T_H−T_C)²/(1/h_H＋x/λ＋1/h_C)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "単位面積当たりの熱抵抗は高温側の1/h_H、壁のx/λ、低温側の1/h_Cの直列和で、総括伝熱係数はその逆数である。伝熱量はその係数に面積Aと温度差T_H−T_Cを掛けて求める。",
    "choiceExplanations": {
      "ア": "単位面積当たりの熱抵抗は高温側の1/h_H、壁のx/λ、低温側の1/h_Cの直列和で、総括伝熱係数はその逆数である。伝熱量はその係数に面積Aと温度差T_H−T_Cを掛けて求める。",
      "イ": "熱抵抗の和の逆数を係数とする点は妥当である。単位時間当たりの移動熱量は同じ係数と面積のもとで温度差に比例し、温度差の二乗には比例しない。",
      "ウ": "㋑は妥当であるが、㋐は温度差を掛けているので単位面積当たりの伝熱量を表す。伝熱係数は各熱抵抗の和の逆数である。",
      "エ": "温度差を一度掛ける㋐の式は熱流束の式である。㋑の伝熱量を求めるにはこれに面積を掛けるので、温度差をもう一度掛ける必要はない。",
      "オ": "総括伝熱係数は二つの境膜と固体壁の熱抵抗から決まり、温度差の二乗を掛けない。移動熱量にも駆動力である温度差は一度だけ現れる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-kagaku-q44",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kagaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "化学工学",
    "topicTags": [
      "蒸留塔の全体と成分の物質収支",
      "化学区分",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "二塩化エチレン40 wt%とトルエン60 wt%から成る混合液を毎時100 kgの割合で蒸留塔に供給し、90 wt%の二塩化エチレンを含む塔頂物と15 wt%の二塩化エチレンを含む塔底物を得ている。このとき、1時間当たりに得られる塔底物の質量として最も妥当なのはどれか。",
    "choices": {
      "ア": "60 kg",
      "イ": "67 kg",
      "ウ": "74 kg",
      "エ": "81 kg",
      "オ": "88 kg"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "1時間当たりの塔頂をD kg、塔底をB kgとすると、D＋B＝100、0.90D＋0.15B＝40である。Dを消去すると0.75B＝50となり、Bは約67 kgである。",
    "choiceExplanations": {
      "ア": "塔底60 kgなら塔頂は40 kgである。二塩化エチレンの流出は0.15×60＋0.90×40＝45 kgとなり、供給される40 kgと一致しない。",
      "イ": "1時間当たりの塔頂をD kg、塔底をB kgとすると、D＋B＝100、0.90D＋0.15B＝40である。Dを消去すると0.75B＝50となり、Bは約67 kgである。",
      "ウ": "塔底74 kg、塔頂26 kgとすると二塩化エチレンは11.1＋23.4＝34.5 kgである。供給40 kgに対し流出が少なすぎる。",
      "エ": "塔底を81 kgとすると塔頂は19 kgで、二塩化エチレンは12.15＋17.10＝29.25 kgしか回収できない。定常時は供給と流出で成分質量が等しい。",
      "オ": "塔底88 kgでは、塔頂12 kgと合わせた二塩化エチレンの質量は13.2＋10.8＝24 kgである。供給の40 kgを満たすには、濃度の高い塔頂物をさらに多くする必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016355.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 化学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  }
];
