import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2025_SENMON_DOBOKU: Question[] = [
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q21",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "静定ラーメンの曲げモーメント",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、静定ラーメンの点Bに水平集中荷重Q、点Cに鉛直集中荷重Pが作用している。点Cでの曲げモーメントが0となるときのQの値として最も妥当なのはどれか。\nただし、梁の自重は無視するものとする。",
    "choices": {
      "ア": "(1/3)P",
      "イ": "(1/2)P",
      "ウ": "(2/3)P",
      "エ": "P",
      "オ": "2P"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "AまわりのモーメントよりEの鉛直反力は(2P＋Q)/3で、Aの鉛直反力は(P−Q)/3になる。点Cの左側ではQの作用線がCを通るため、曲げモーメントが0となるのはAの反力が0、すなわちQ＝Pのときである。",
    "choiceExplanations": {
      "ア": "QがPより小さい場合、左支点Aの鉛直反力は上向きに残る。この反力が点Cまわりに曲げモーメントを生じさせるため、Q＝P/3では0にならない。",
      "イ": "QとPのモーメントはそれぞれ腕の長さがlと2lである。全体の反力を計算したうえでCの左側のつり合いを考えると、QがPの半分では足りない。",
      "ウ": "2P/3はQを含めず、荷重Pだけを作用させた場合の右支点Eの鉛直反力である。水平荷重による反力の変化を含めると、左支点反力が0になるQはPである。",
      "エ": "AまわりのモーメントよりEの鉛直反力は(2P＋Q)/3で、Aの鉛直反力は(P−Q)/3になる。点Cの左側ではQの作用線がCを通るため、曲げモーメントが0となるのはAの反力が0、すなわちQ＝Pのときである。",
      "オ": "Q＝2Pとすると左支点反力は(P−2P)/3になり、0にはならない。点Cの左側ではその反力が2lの腕を持つので、曲げモーメントが残る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-doboku/q21.webp"
    ],
    "imageAltTexts": [
      "水平荷重Qが左柱の上端Bに、下向き荷重Pが梁上の点Cにかかる門形ラーメン。左支点AからCまでの水平距離は2l。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q22",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "トラスの節点法と零部材",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、トラスの節点Eに鉛直集中荷重Pが作用するとき、部材ACと部材BCに生じる部材力の大きさの組合せとして最も妥当なのはどれか。\nただし、全ての部材の軸方向剛性は等しいものとし、部材の自重は無視するものとする。",
    "choices": {
      "ア": "0、(3/5)P",
      "イ": "0、(5/3)P",
      "ウ": "(3/4)P、(5/3)P",
      "エ": "(4/5)P、(3/5)P",
      "オ": "(4/5)P、(4/3)P"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "節点EとDのつり合いから、CにはCEから右向き4P/3、CDから下向きPが作用する。BCの引張力5P/3だけで左向き4P/3、上向きPを出せるのでACの軸力は0である。",
    "choiceExplanations": {
      "ア": "ACが零部材となる点は合っている。BCの鉛直成分は軸力の3/5に当たり、これがPとなるため軸力の大きさは(5/3)Pになる。",
      "イ": "節点EとDのつり合いから、CにはCEから右向き4P/3、CDから下向きPが作用する。BCの引張力5P/3だけで左向き4P/3、上向きPを出せるのでACの軸力は0である。",
      "ウ": "BCの軸力5P/3は正しい。Cでこれを水平と鉛直に分解するとCEとCDに釣り合うため、ACに力を割り当てる必要はない。",
      "エ": "4/5と3/5は斜材を水平と鉛直成分に分解する係数であり、それぞれをPに掛けるだけで部材力が出るわけではない。節点Cをつり合わせるとACは0となる。",
      "オ": "4P/3は節点Eのつり合いから求まる水平材CEの軸力である。BCの力は、対応する水平成分が4P/3になるように4/5で割り戻す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-doboku/q22.webp"
    ],
    "imageAltTexts": [
      "壁面上の支点A・Bから右に張り出すトラス。点Eに荷重Pが作用し、斜材は3・4・5の寸法比を持つ。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q23",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "異なる軸力を受ける鋼棒の伸縮",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、軸剛性がEAの鋼棒ADの点B、C、Dに水平集中荷重がそれぞれ作用するとき、ADの伸縮量として最も妥当なのはどれか。\nなお、ADの左端は鉛直壁に固定され、右端は自由端であり、荷重は棒断面の図心に作用するものとする。また、鋼棒の自重は無視するものとし、伸縮量の符号は伸びを正、縮みを負とする。",
    "choices": {
      "ア": "−2Pl/(EA)",
      "イ": "−Pl/(EA)",
      "ウ": "0",
      "エ": "＋Pl/(EA)",
      "オ": "＋2Pl/(EA)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "断面から右にある荷重を足すと、AB、BC、CDの軸力は−P、0、2Pである。各軸力に区間長を掛けEAで割ると、全体の伸縮量は(−2Pl＋0＋2Pl)/(EA)＝0になる。",
    "choiceExplanations": {
      "ア": "−2Pl/(EA)はAB区間だけの縮みである。CD区間には2Pの引張力が加わり、同じ大きさの伸びが生じる。",
      "イ": "BCではCの左向き2PとDの右向き2Pが相殺し、軸力は0である。ABの縮みとCDの伸びも相殺するため、負の伸縮量は残らない。",
      "ウ": "断面から右にある荷重を足すと、AB、BC、CDの軸力は−P、0、2Pである。各軸力に区間長を掛けEAで割ると、全体の伸縮量は(−2Pl＋0＋2Pl)/(EA)＝0になる。",
      "エ": "伸縮量を足す前に、各区間の長さを軸力に掛ける必要がある。ABは2lなので、軸力Pの圧縮で生じる縮みはCDの引張りによる伸びに等しい。",
      "オ": "＋2Pl/(EA)はCDの伸びである。ABでは長さ2lにわたって圧縮力Pが働くため、その縮みを加えると0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-doboku/q23.webp"
    ],
    "imageAltTexts": [
      "左端Aを固定した鋼棒AD。長さ2l、l、lの区間があり、BとCに左向きPと2P、Dに右向き2Pが作用する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q24",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "等分布荷重と中央集中荷重の重ね合わせ",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、曲げ剛性がEIである単純梁ABに荷重強度qの等分布荷重と、梁のスパン中央に鉛直集中荷重Rが作用し、この箇所でたわみが生じていないとき、Rの大きさとして最も妥当なのはどれか。\nなお、図Ⅱのような長さl、曲げ剛性EIの単純梁に荷重強度qの等分布荷重が作用したときの梁の中点のたわみδは次式で示される。\nδ＝5ql⁴/(384EI)\nまた、梁の自重は無視するものとする。",
    "choices": {
      "ア": "(5/64)ql",
      "イ": "(5/32)ql",
      "ウ": "(5/8)ql",
      "エ": "(5/4)ql",
      "オ": "(5/2)ql"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "図ⅠのスパンをL＝4lとすると、等分布荷重の下向きたわみは5qL⁴/(384EI)、Rによる上向きたわみはRL³/(48EI)である。相殺する条件よりR＝(5/8)qL＝(5/2)qlになる。",
    "choiceExplanations": {
      "ア": "等分布荷重のたわみ式のスパンは、図Ⅰでは4lに置き換える。集中荷重のたわみも同じ長さを用いるため、5/64にはならない。",
      "イ": "上向きRは等分布荷重と逆向きに中央をたわませる。両者で用いるスパンを4lに統一してたわみを等しく置くと、5/32より大きい値になる。",
      "ウ": "5/8は実際のスパンをLとして表したR/(qL)の値である。図ⅠではL＝4lなので、R＝(5/8)q×4lとなる。",
      "エ": "(5/4)qlはスパンを2lとした場合の値である。図の2lは左支点から中央までであり、全スパンは4lである。",
      "オ": "図ⅠのスパンをL＝4lとすると、等分布荷重の下向きたわみは5qL⁴/(384EI)、Rによる上向きたわみはRL³/(48EI)である。相殺する条件よりR＝(5/8)qL＝(5/2)qlになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-doboku/q24.webp"
    ],
    "imageAltTexts": [
      "スパン4lの梁に等分布荷重qと中央に上向きRがかかる図Ⅰと、等分布荷重だけを受ける梁の図Ⅱ。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q25",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "隔壁の開口部での流速",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、水槽が、開口部を有する板によって仕切られている。このとき、開口部直下流の流速Vとして最も妥当なのはどれか。\nただし、エネルギー損失は無視するものとし、重力加速度の大きさをgとする。また、水槽の断面積は開口部の断面積に比べ十分大きく、水位の変動はないものとする。",
    "choices": {
      "ア": "√[g(H₁−H₂)]",
      "イ": "√[2g(H₁−H₂)]",
      "ウ": "√(2gH₁)",
      "エ": "√(2gH₁/H₂)",
      "オ": "√(2gH₂/H₁)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "水面の速度は槽の断面積が大きいので無視でき、開口の下流にはH₂に相当する圧力水頭がある。ベルヌーイの式H₁＝H₂＋V²/(2g)からV＝√[2g(H₁−H₂)]となる。",
    "choiceExplanations": {
      "ア": "流速水頭はV²/(2g)である。水位差にこの水頭を等しく置くと、平方根の中に2が必要になる。",
      "イ": "水面の速度は槽の断面積が大きいので無視でき、開口の下流にはH₂に相当する圧力水頭がある。ベルヌーイの式H₁＝H₂＋V²/(2g)からV＝√[2g(H₁−H₂)]となる。",
      "ウ": "これは開口の下流が大気に開いているときに、深さH₁だけを駆動水頭とした式である。設問は下流側にも水深H₂があるので、水位差を用いる。",
      "エ": "H₁/H₂は無次元であり、gとの積の平方根は速度の次元にならない。駆動する水頭は深さの比ではなく、H₁とH₂の差である。",
      "オ": "H₁とH₂が等しければ両側の水位差がなくなり、流速は0になるはずである。水深の比を用いるこの式ではその条件を満たせない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-doboku/q25.webp"
    ],
    "imageAltTexts": [
      "水位H₁とH₂の二つの槽が隔壁の下部の開口でつながり、開口直下流に速度Vが示される。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q26",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "広幅水路の等流水深",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "粗度係数及び水路勾配が一定の広幅長方形断面水路において、単位幅当たりの流量がqのときの等流水深をhとする。同じ水路において、単位幅当たりの流量が2qのときの等流水深として最も妥当なのはどれか。",
    "choices": {
      "ア": "2^(1/2)h",
      "イ": "2^(3/5)h",
      "ウ": "2^(2/3)h",
      "エ": "2h",
      "オ": "2^(5/3)h"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "広幅長方形水路では径深を水深hで近似でき、マニング式から流速はh^(2/3)に比例する。単位幅流量はh×流速でh^(5/3)に比例するため、流量を2倍にする水深は2^(3/5)hである。",
    "choiceExplanations": {
      "ア": "マニング式では速度が径深の2/3乗に比例する。これに単位幅当たりの断面積hを掛けるため、流量は水深の二乗には比例しない。",
      "イ": "広幅長方形水路では径深を水深hで近似でき、マニング式から流速はh^(2/3)に比例する。単位幅流量はh×流速でh^(5/3)に比例するため、流量を2倍にする水深は2^(3/5)hである。",
      "ウ": "水深を求める指数は流速と水深を関係付ける2/3ではない。流量には断面積の効果もあり、5/3の逆数である3/5を用いる。",
      "エ": "流量が2倍になっても流速が一定とは限らない。水深が増えると径深と流速も増えるので、水深の倍率は2より小さい。",
      "オ": "5/3は水深の変化から単位幅流量の変化を求める指数である。与えられた流量の比から水深の比を求める場合は、逆の指数3/5を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q27",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "傾斜板の静水圧の作用点",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "図のように、十分な高さを有する傾斜した長方形のせき板で水を支えたとき、せき板を倒すことなく上昇させ得る最大水深として最も妥当なのはどれか。\nただし、A点は固定されておらず、B、C点はヒンジ構造とし、せき板の自重は無視するものとする。",
    "choices": {
      "ア": "√2 m",
      "イ": "2 m",
      "ウ": "(3/2)√2 m",
      "エ": "2√2 m",
      "オ": "3 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "板に沿った接水長は、水深をHとしてH/sin 45°である。圧力分布は三角形なので合力はAから接水長の1/3に作用し、それがBに達するH/(3 sin 45°)＝1 mが転倒限界である。",
    "choiceExplanations": {
      "ア": "水深√2 mなら斜面上の接水長は2 mである。三角形の圧力分布の合力位置はAから2/3 mで、Bに達していない。",
      "イ": "2 mの水深に対する接水長は2√2 mとなる。圧力合力の作用点はAからその1/3なので、Bまでの1 mに達しない。",
      "ウ": "板に沿った接水長は、水深をHとしてH/sin 45°である。圧力分布は三角形なので合力はAから接水長の1/3に作用し、それがBに達するH/(3 sin 45°)＝1 mが転倒限界である。",
      "エ": "2√2 mまで水深が増すと接水長4 mとなり、合力作用点はAから4/3 mである。作用点は既にBより上なので、この水深まで板がもつとはいえない。",
      "オ": "転倒限界で3 mになるのは、鉛直方向の水深ではなく板に沿った接水長である。その鉛直成分を取ると3 sin 45° mとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-doboku/q27.webp"
    ],
    "imageAltTexts": [
      "水平床に接する点Aから上に45度傾けたせき板。Aから板に沿って1 mの点Bが、別の斜材で点Cへ接続する。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q28",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "土の含水比と水の質量",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "含水比が15.0％の土が250 kgある。この土に含まれる水の質量として最も妥当なのはどれか。",
    "choices": {
      "ア": "6.00 kg",
      "イ": "6.90 kg",
      "ウ": "32.6 kg",
      "エ": "34.6 kg",
      "オ": "37.5 kg"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "乾燥土の質量をmとすると、水は0.15m、全土は1.15mで250 kgである。したがって水の質量は250×0.15/1.15＝約32.6 kgとなる。",
    "choiceExplanations": {
      "ア": "含水比は水の質量を乾燥土の質量で割った値である。水が6.00 kgなら乾燥土244 kgに対する比は約2.5％であり、15.0％に達しない。",
      "イ": "水が6.90 kgなら含水比は6.90/(250−6.90)で約2.8％になる。全質量のうち水が占める割合と乾燥土に対する含水比を区別する。",
      "ウ": "乾燥土の質量をmとすると、水は0.15m、全土は1.15mで250 kgである。したがって水の質量は250×0.15/1.15＝約32.6 kgとなる。",
      "エ": "34.6 kgの水を仮定すると、乾燥質量215.4 kgに対する比が約16.1％になる。指定された15.0％を満たす水の質量はこれより小さい。",
      "オ": "37.5 kgは湿った土全体の質量250 kgに0.15を掛けた値である。含水比の分母は水を除いた乾燥土の質量なので、この計算では水を過大に見積もる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q29",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "定水位透水試験",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "長さ15 cm、直径10 cmの円柱形に締め固められた砂質土の供試体について、水頭差を8 cmに保って定水位透水試験を行ったところ、5分間に200 cm³の透水量が確認された。この供試体の透水係数として最も妥当なのはどれか。",
    "choices": {
      "ア": "1.59×10⁻⁴ m/s",
      "イ": "1.59×10⁻³ m/s",
      "ウ": "1.59×10⁻² m/s",
      "エ": "4.52×10⁻⁴ m/s",
      "オ": "4.52×10⁻² m/s"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ダルシー則によりk＝(Q/t)/(Ai)である。Q/t＝0.0002/300 m³/s、A＝π(0.05)² m²、i＝0.08/0.15を代入すると、約1.59×10⁻⁴ m/sになる。",
    "choiceExplanations": {
      "ア": "ダルシー則によりk＝(Q/t)/(Ai)である。Q/t＝0.0002/300 m³/s、A＝π(0.05)² m²、i＝0.08/0.15を代入すると、約1.59×10⁻⁴ m/sになる。",
      "イ": "200 cm³は0.0002 m³で、試験時間5分は300秒である。これらをそろえて計算すると、透水係数の桁は10⁻³ではなく10⁻⁴になる。",
      "ウ": "直径10 cmは0.10 mで、断面積には半径0.05 mを使う。透水量もm³に直すと、10⁻² m/sという大きさにはならない。",
      "エ": "動水勾配は水頭差8 cmを供試体の長さ15 cmで割った8/15である。流量を断面積とこの勾配で割ると4.52×10⁻⁴ m/sより小さい。",
      "オ": "200 cm³は瞬間の流量ではなく、5分間の体積である。秒当たりに直してからダルシー則に入れるので、10⁻² m/sの桁にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q30",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "一面せん断試験の強度定数",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "ある土について供試体を作成して、一面せん断試験を行ったところ、表のような結果を得た。この土の粘着力と内部摩擦角の組合せとして最も妥当なのはどれか。\nなお、選択肢の内部摩擦角はおおよその値を示しており、√2＝1.41、√3＝1.73であることを用いてもよい。",
    "choices": {
      "ア": "26.7 kN/m²、30°",
      "イ": "26.7 kN/m²、45°",
      "ウ": "35.2 kN/m²、30°",
      "エ": "35.2 kN/m²、45°",
      "オ": "35.2 kN/m²、60°"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "せん断強さをτ＝c＋σ tan φとすると、傾きは(58.4−46.8)/(40−20)＝0.58でtan 30°に近い。切片は46.8−20×0.58＝35.2 kN/m²になる。",
    "choiceExplanations": {
      "ア": "内部摩擦角が約30°という点は合っている。粘着力はせん断強さの切片で、46.8−20×0.58＝35.2 kN/m²である。",
      "イ": "45°ならせん断応力は垂直応力と同じ増分になる。表では垂直応力が20増えたときせん断応力は11.6だけ増えるため、傾きは1より小さい。",
      "ウ": "せん断強さをτ＝c＋σ tan φとすると、傾きは(58.4−46.8)/(40−20)＝0.58でtan 30°に近い。切片は46.8−20×0.58＝35.2 kN/m²になる。",
      "エ": "粘着力は35.2 kN/m²で合っているが、内部摩擦角45°では傾きが1となる。実験の傾き0.58はtan 30°に近い。",
      "オ": "内部摩擦角60°では、傾きtan 60°は約1.73になる。表の測定値が示す傾き0.58とは大きく異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2025/senmon-doboku/q30.webp"
    ],
    "imageAltTexts": [
      "鉛直応力20、40、50 kN/m²に対し、せん断応力が46.8、58.4、64.2 kN/m²となる試験結果の表。"
    ]
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q31",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "残差・測量機器・地理情報",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "測量に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n・測定値と最確値の差を［㋐］という。\n・［㋑］は、1台の器械で測角及び測距を行うものであり、電子的に処理された測定データの記録や出力が可能である。\n・GNSS測量において、［㋒］とは、1台の受信機で4個以上の衛星から電波を捕捉することで、測点の位置を求める方法である。\n・地理情報システム（GIS）において、［㋓］形式は、図形情報を点、線分、面によって近似的に定義し、属性情報を付与するデータモデル形式である。",
    "choices": {
      "ア": "誤差、トータルステーション、干渉測位、ベクタデータ",
      "イ": "誤差、レベル、単独測位、ベクタデータ",
      "ウ": "残差、トータルステーション、干渉測位、ラスタデータ",
      "エ": "残差、トータルステーション、単独測位、ベクタデータ",
      "オ": "残差、レベル、単独測位、ラスタデータ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "測定値と最確値との差は残差で、角度と距離を1台で測る機器はトータルステーションである。GNSSの受信機1台で位置を出すのは単独測位、点・線・面で形を表すのはベクタデータである。",
    "choiceExplanations": {
      "ア": "測定値と最確値との差は残差である。また、衛星の信号を受信機1台で受けて位置を出すのは単独測位であり、干渉測位と区別される。",
      "イ": "1台の受信機を使う単独測位と、点・線・面によるベクタデータは正しい。角度と距離を測る機器は、主に高低差を測るレベルではなくトータルステーションである。",
      "ウ": "残差とトータルステーションは正しい。受信機1台で行うのは単独測位であり、点・線・面で地物を表すのはベクタデータである。",
      "エ": "測定値と最確値との差は残差で、角度と距離を1台で測る機器はトータルステーションである。GNSSの受信機1台で位置を出すのは単独測位、点・線・面で形を表すのはベクタデータである。",
      "オ": "レベルは水準測量で標尺を視準して標高差を求めるために使う。ラスタは格子状のセルに値を持たせる形式で、点・線・面で表す形式とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q32",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "コンクリート",
    "topicTags": [
      "材料の時間依存性と舗装",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "土木材料に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ ひずみ一定の下で、時間の経過とともに応力が減少する現象をリラクセーションという。\n㋑ コンクリートの材料分離が起こる際に生じる、相対的に比重の小さい水が表面に達する現象をレイタンスという。\n㋒ アスファルト舗装では、車両が低速で走行する交差点や駐車場の方が、車両が高速で走行する区間よりもわだち掘れが発生しやすい。\n㋓ 我が国では、アスファルト舗装の修繕工事などに伴って発生するアスファルト・コンクリート塊の再資源化は一切認められていない。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ひずみが一定のときに応力が時間とともに下がるのがリラクセーションである。低速走行ではタイヤの荷重が舗装に作用する時間が長くなるので、アスファルトに永久変形が蓄積しやすい。",
    "choiceExplanations": {
      "ア": "ひずみが一定のときに応力が時間とともに下がるのがリラクセーションである。低速走行ではタイヤの荷重が舗装に作用する時間が長くなるので、アスファルトに永久変形が蓄積しやすい。",
      "イ": "㋐は妥当である。舗装の撤去で生じたアスファルト・コンクリート塊は再生骨材などに利用され、再資源化が一律に禁止されているわけではない。",
      "ウ": "㋒のように低速や停止の多い場所はわだち掘れが発生しやすい。水が浮き上がる現象はブリーディングで、レイタンスは表面に残る脆弱な微粒子層である。",
      "エ": "㋑の水が上に移動する現象はブリーディングである。㋓も、アスファルト塊は再生合材などの原料にできる点で誤りである。",
      "オ": "㋒は妥当である。アスファルト・コンクリート塊の回収と再利用は行われているため、㋓の説明は合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q33",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "耐震工学",
    "topicTags": [
      "道路橋の耐震設計",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の道路橋の耐震設計に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 橋の設計で用いる地震動のうち、レベル2地震動とは、橋の設計供用期間中に発生することは極めて稀であるが、一旦生じると橋に及ぼす影響が甚大であると考えられる地震動のことを指す。\n㋑ 地震に伴う津波、斜面崩壊等及び断層変位の影響については、現在のところ計算で評価できる手法が確立されていないため、耐震設計上考慮する必要はない。\n㋒ 落橋防止システムは、支承部の破壊を想定したとしても、上部構造が下部構造から容易には落下しないようにすることを目的としている。\n㋓ 免震構造は、免震支承による橋の固有周期の長周期化及びエネルギー吸収による減衰性の向上によって、上部構造の慣性力及び応答変位の低減を図る構造である。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "レベル2地震動は、橋の設計供用期間に生じる可能性が極めて低くても、影響が大きい地震動として扱う。落橋防止システムは、支承が壊れた場合にも上部構造を落下させにくくする。",
    "choiceExplanations": {
      "ア": "レベル2地震動は、橋の設計供用期間に生じる可能性が極めて低くても、影響が大きい地震動として扱う。落橋防止システムは、支承が壊れた場合にも上部構造を落下させにくくする。",
      "イ": "レベル2地震動についての㋐は妥当である。免震で固有周期を長くすると変形を支承側に集めるため、上部構造の応答変位も一般に低減するとはいえない。",
      "ウ": "㋒の落橋防止システムの目的は正しい。津波、斜面崩壊、断層変位の影響についても、架橋位置などに応じて考慮する必要がある。",
      "エ": "計算手法が確立していなくても、津波や斜面崩壊による影響を検討から外してよいわけではない。免震構造の主目的は地震時の慣性力を抑えることで、上部構造の変位を一律に減らすことではない。",
      "オ": "落橋防止システムについて述べる㋒は正しい。免震支承の変形と減衰を利用する構造では、地震時に生じる変位も別途確認する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q34",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "基礎工学",
    "topicTags": [
      "トンネルの施工法",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "トンネルの施工法に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「［㋐］は、掘削機を地中で前進させ、後方にセグメントを組み立てていく工法であり、軟弱地盤でも適用することが可能である。また、［㋑］は、海底や川底に溝を掘り込み、陸上で製作したトンネルエレメントを溝に設置し、埋め戻すことでトンネルを構築する工法である。山岳トンネルの代表的な工法としては、吹付けコンクリートとロックボルトで補強した地山自体の支持力を利用する［㋒］が挙げられる。」",
    "choices": {
      "ア": "推進工法、開削工法、矢板工法",
      "イ": "推進工法、開削工法、NATM",
      "ウ": "シールド工法、開削工法、矢板工法",
      "エ": "シールド工法、沈埋工法、矢板工法",
      "オ": "シールド工法、沈埋工法、NATM"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "掘進に合わせてセグメントを組むのはシールド工法で、陸上で造ったエレメントを水底の溝へ設置するのは沈埋工法である。地山を吹付けコンクリートとロックボルトで補強し、その支持力を使う工法はNATMである。",
    "choiceExplanations": {
      "ア": "シールド工法では掘削機の後方でセグメントを組み立てる。水底の溝に陸上で造ったトンネルを沈めて接続する方法は沈埋工法である。",
      "イ": "NATMが地山の支持力を利用するという点は正しい。最初のセグメント組立てはシールド工法、水底の溝への設置は沈埋工法である。",
      "ウ": "セグメントを用いるシールド工法は妥当である。二番目は地上から掘って現場で構築する開削工法ではなく、水底に完成部材を据える沈埋工法である。",
      "エ": "シールド工法と沈埋工法は合っている。吹付けコンクリートとロックボルトで地山の支持力を活用するのはNATMである。",
      "オ": "掘進に合わせてセグメントを組むのはシールド工法で、陸上で造ったエレメントを水底の溝へ設置するのは沈埋工法である。地山を吹付けコンクリートとロックボルトで補強し、その支持力を使う工法はNATMである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q35",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "都市計画",
    "topicTags": [
      "コンパクトシティと3D都市モデル",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の都市計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 都市計画は、おおむね5年先の見通しの下に作成され、この間、定期的に都市化の動向等を把握し、計画を見直していく必要がある。\n㋑ コンパクトシティ政策は、将来の都市構造を、都市機能の誘導等により再編していくことで、公共交通の利便性向上や都市の低炭素化など、分野横断的な課題解決を図るものである。\n㋒ 都市計画法における都市計画施設の区域内であれば、建築物の建築をしようとする者は、都道府県知事等の許可を受ける必要がある。\n㋓ Project PLATEAU（プラトー）は、都市計画基礎調査等のデータを用いて3D都市モデルを整備し、都市のデジタルツインの実現を図るものである。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "コンパクトシティ政策は都市の施設や居住の配置を誘導し、公共交通との連携や低炭素化を進める。PLATEAUは3D都市モデルを整備し、都市情報をデジタル空間で利用しやすくする取組である。",
    "choiceExplanations": {
      "ア": "都市計画は5年先だけを想定するのではなく、より長期の見通しを踏まえて定める。都市計画施設の区域内での建築許可にも、非常災害時の応急措置などの例外がある。",
      "イ": "㋓のPLATEAUの説明は正しい。都市計画基礎調査におおむね5年ごとの実施時期が定められていても、計画の見通し自体が5年ということにはならない。",
      "ウ": "㋑は妥当である。都市計画法第53条の建築許可には一定の例外があり、都市計画施設の区域内という理由だけですべての建築に許可を要するわけではない。",
      "エ": "コンパクトシティ政策は都市の施設や居住の配置を誘導し、公共交通との連携や低炭素化を進める。PLATEAUは3D都市モデルを整備し、都市情報をデジタル空間で利用しやすくする取組である。",
      "オ": "㋓は妥当である。㋒について、都市計画法第53条は建築許可を原則とする一方、政令で定める軽易な行為などを除外している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q36",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "道路工学",
    "topicTags": [
      "都市交通調査と需要マネジメント",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の交通に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ パーソントリップ調査の特徴としては、交通発生の主体である人の移動について、出発地から目的地までの、乗継ぎを含めた一連の移動を交通手段も含めて把握していることが挙げられる。\n㋑ 交通需要マネジメント（TDM）とは、交通渋滞を緩和するため、公共交通への利用転換、自動車の効率的な利用などによって交通行動の変更を促して、交通需要を調整する手法である。\n㋒ LRT（Light Rail Transit）は、利用者からの要請に応じて運行時間やルートを柔軟に変化させるもので、需要に見合った運行が可能となる。\n㋓ 「高齢者、障害者等の移動等の円滑化の促進に関する法律（バリアフリー法）」では、公共交通機関のうち、駅等の旅客施設に対してはバリアフリーに必要な移動等円滑化基準が設けられているが、車両に対しては設けられていない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "パーソントリップ調査は人の移動を対象とし、目的や手段、出発地と目的地、乗継ぎなどを把握する。TDMは交通手段や時間帯の変更を促すなど、移動需要の側に働き掛ける手法である。",
    "choiceExplanations": {
      "ア": "パーソントリップ調査は人の移動を対象とし、目的や手段、出発地と目的地、乗継ぎなどを把握する。TDMは交通手段や時間帯の変更を促すなど、移動需要の側に働き掛ける手法である。",
      "イ": "㋐のパーソントリップ調査は妥当である。LRTは軽量軌道交通であり、利用者の予約等に応じて経路を変えるのは一般にデマンド型交通である。",
      "ウ": "㋐は妥当である。バリアフリー法に基づく移動等円滑化基準は旅客施設だけでなく、鉄道車両やバス車両などにも設けられている。",
      "エ": "公共交通への転換などによって需要を調整する㋑は正しい。LRTは軌道を使う交通システムで、乗車要請に応じて任意に経路を変える交通ではない。",
      "オ": "LRTは軌道路線を使うため、㋒の記述は当てはまらない。㋓も、公共交通車両には移動等円滑化の基準が設けられている点で誤る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q37",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "河川工学",
    "topicTags": [
      "河川整備基本方針と整備計画",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の河川計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 河川計画の策定・変更に当たっては、河川の有する治水機能、利水機能、環境機能の調和に配慮しつつ、総合的な土砂管理等についても必要に応じて配慮するものとする。\n㋑ 河川整備基本方針は、国土交通大臣が管理する河川についてのみ定められる。\n㋒ 河川整備計画においては、おおよそ20～30年間に行われる具体的な整備の内容を定めなければならない。\n㋓ 河川計画の基本となる洪水のハイドログラフの検討に用いる対象降雨は、降雨量と降雨量の時間分布の二つの要素で表される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "河川計画は治水・利水・環境の調和や土砂の動きを考慮する。河川整備計画にはおおよそ20～30年を対象として具体的な河川工事などを定める。",
    "choiceExplanations": {
      "ア": "㋐は治水・利水・環境の調和を扱っており妥当である。河川整備基本方針は都道府県知事が管理する河川でも作成される。",
      "イ": "河川計画は治水・利水・環境の調和や土砂の動きを考慮する。河川整備計画にはおおよそ20～30年を対象として具体的な河川工事などを定める。",
      "ウ": "㋐は妥当である。洪水流量は同じ雨量と時間経過でも流域内の降る場所で変わるため、対象降雨は空間分布も考慮する。",
      "エ": "㋒は具体的な河川整備計画の説明に当たる。㋑について、河川整備基本方針は河川管理者が定めるため、国土交通大臣の管理に限られない。",
      "オ": "㋒は妥当である。㋓は、対象降雨を記述する要素から流域内の空間分布を落としている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q38",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "河川工学",
    "topicTags": [
      "沿岸の潮位変化と津波",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "潮汐や津波に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 月と太陽からの起潮力によって生じる天文潮の振幅は、日本沿岸でほぼ一定である。\n㋑ 日本沿岸の潮位にみられる季節変化として、夏から秋にかけて潮位が高くなる傾向がある。\n㋒ 一回の地震で複数回の津波が沿岸部に来襲する場合、津波の高さは第一波が必ず最大となる。\n㋓ 水深が深い海域から浅い海域に津波が伝播する場合、水深が浅くなるにつれて津波の高さは高くなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "日本沿岸の平均的な潮位は夏から秋に高くなる傾向がある。また、津波は水深が浅くなると伝播速度が落ち、波高が増す傾向がある。",
    "choiceExplanations": {
      "ア": "夏から秋にかけて潮位が高くなる傾向は妥当である。天文潮の振幅は海岸形状や海の深さにも影響され、日本沿岸で一様ではない。",
      "イ": "潮汐の振幅は一様ではない。津波でも、海岸への反射や波源などの影響により、後から来た波の方が大きくなる場合がある。",
      "ウ": "浅い海に入った津波が高くなる傾向は妥当である。天文潮の振幅は、湾の形状などの違いから地域差がある。",
      "エ": "夏から秋の季節的な潮位の傾向は正しい。津波は波が繰り返し来襲し、第一波が常に最大になるわけではない。",
      "オ": "日本沿岸の平均的な潮位は夏から秋に高くなる傾向がある。また、津波は水深が浅くなると伝播速度が落ち、波高が増す傾向がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q39",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "環境工学",
    "topicTags": [
      "環境基準・騒音・都市気候",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の環境に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 大気汚染対策の行政上の政策目標として、SO₂、NO₂、浮遊粒子状物質等の大気中の濃度について、環境基準が設けられている。\n㋑ 等価騒音レベルとは、ある時間範囲において変動する騒音レベルの最大値を測定したものである。\n㋒ 都市における快適な気候を実現する手法として、建物や緑地の配置・形態を工夫し、自然界のポテンシャルにより発生する空気の循環系を活用するものがある。\n㋓ カーボンニュートラルとは、CO₂等の温室効果ガスについて、人為的な発生源による排出量をゼロにすることである。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "SO₂やNO₂などには環境基準が設定されている。また、都市の建物や緑地の配置を工夫して風の通り道を確保し、熱がこもりにくい環境をつくる方法がある。",
    "choiceExplanations": {
      "ア": "大気汚染物質には行政上の目標となる環境基準が定められている。等価騒音レベルは測定期間の音のエネルギーに相当する一定騒音を表し、最大値ではない。",
      "イ": "SO₂やNO₂などには環境基準が設定されている。また、都市の建物や緑地の配置を工夫して風の通り道を確保し、熱がこもりにくい環境をつくる方法がある。",
      "ウ": "㋐は妥当である。カーボンニュートラルは吸収・除去まで含めた正味の排出をゼロにすることをいう。",
      "エ": "風の流れを利用する都市の環境設計は行われている。㋑は騒音の最大値と、一定時間における音のエネルギーに基づく等価騒音レベルを混同している。",
      "オ": "㋒は妥当である。温室効果ガスの排出量から吸収・除去量を差し引いた値をゼロにするのがカーボンニュートラルである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2025-annual-senmon-doboku-q40",
    "exam": "kokka-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-doboku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "環境工学",
    "topicTags": [
      "上下水道の処理と施設利用",
      "土木区分"
    ],
    "difficulty": 3,
    "question": "我が国の上下水道に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 下水道法では、流域下水道の設置、改築、修繕、維持その他の管理は、国が行うものとされている。\n㋑ 都市における下水道施設は、下水処理場の上部を運動施設として利用するほか、下水道管の中に光ファイバーケーブルを通して通信に利用する等、様々な有効利用が図られている。\n㋒ 浄水場の原水処理過程において、原水中に含まれるコロイド状の懸濁物は、主にプラスの荷電をしているため、マイナスの荷電をしている凝集剤を加えることで、表面電荷を中和させる。\n㋓ 水中に存在する有機物が微生物により酸化分解される際の酸素消費量をBOD（生物化学的酸素要求量）という。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "処理施設の上部空間や下水道管の内部は、条件に応じて運動施設や通信設備などに活用される。BODは微生物による有機物の分解に必要な酸素量を示す指標である。",
    "choiceExplanations": {
      "ア": "下水道施設の空間を活用する㋑は妥当である。下水道法では、流域下水道の設置や管理は原則として都道府県が行う。",
      "イ": "流域下水道の管理主体は原則として都道府県である。浄水の凝集では、一般的に負に帯電した懸濁粒子の電荷を凝集剤で中和しやすくするので、㋒は電荷を逆にしている。",
      "ウ": "㋑は妥当である。原水中のコロイド状粒子は一般に負に帯電し、アルミニウム塩などの凝集剤から生じる正に帯電した成分が電荷の中和に働く。",
      "エ": "処理施設の上部空間や下水道管の内部は、条件に応じて運動施設や通信設備などに活用される。BODは微生物による有機物の分解に必要な酸素量を示す指標である。",
      "オ": "BODが微生物の分解に伴う酸素量を示すという㋓は妥当である。㋒はコロイド粒子と凝集剤の働きについて、電荷の正負を逆にしている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016349.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用一般職試験（大卒程度） 土木区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  }
];
