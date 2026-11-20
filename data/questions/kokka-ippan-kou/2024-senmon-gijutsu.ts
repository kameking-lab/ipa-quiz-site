import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_KOU_2024_SENMON_GIJUTSU: Question[] = [
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q01",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "二次関数の最小値"
    ],
    "difficulty": 2,
    "question": "関数 f(x) = 2x² − 2ax + b² − 6b は、x = 2で最小値−17をとる。a、bが共に定数であるとき、bの値はいくらか。",
    "choices": {
      "ア": "−1",
      "イ": "0",
      "ウ": "1",
      "エ": "2",
      "オ": "3"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "最小となるxはa/2なのでa＝4です。f(2)＝−8＋b²−6b＝−17から(b−3)²＝0となり、b＝3です。",
    "choiceExplanations": {
      "ア": "x＝2が頂点になるにはa＝4が必要です。b＝−1ではf(2)＝−8＋1＋6＝−1で、−17になりません。",
      "イ": "x＝2で最小となるaは4で、b＝0ならf(2)＝−8です。指定された最小値にはさらに−9が必要です。",
      "ウ": "a＝4、b＝1ではf(2)＝−8＋1−6＝−13です。b²−6bが−9になる値を選びます。",
      "エ": "a＝4、b＝2とするとf(2)＝−8＋4−12＝−16です。最小値として求められているのは−17です。",
      "オ": "最小となるxはa/2なのでa＝4です。f(2)＝−8＋b²−6b＝−17から(b−3)²＝0となり、b＝3です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q02",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "放物線の平行移動"
    ],
    "difficulty": 2,
    "question": "放物線 y = x² − 4x + 5 をx軸方向にa、y軸方向にbだけ平行移動させたところ、y = x² + 6x + 8 となった。このとき、a、bの値の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "−10／−3",
      "イ": "−5／−2",
      "ウ": "−5／3",
      "エ": "10／−2",
      "オ": "10／3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "平方完成すると元の式はy＝(x−2)²＋1、移動後はy＝(x＋3)²−1です。頂点の移動量は(−3−2, −1−1)＝(−5, −2)です。",
    "choiceExplanations": {
      "ア": "移動前の頂点は(2, 1)、移動後は(−3, −1)です。横方向の移動量は頂点のx座標の差で−5です。",
      "イ": "平方完成すると元の式はy＝(x−2)²＋1、移動後はy＝(x＋3)²−1です。頂点の移動量は(−3−2, −1−1)＝(−5, −2)です。",
      "ウ": "横方向は−5で合っていますが、頂点の高さは1から−1へ変わるので、縦方向は−2です。",
      "エ": "縦方向の移動量は−2で合っています。横方向はxの一次係数の変化6−(−4)ではなく、頂点の座標の差−3−2で求めます。",
      "オ": "頂点は(2, 1)から(−3, −1)へ移ります。左右・上下のどちらにも負の向きに移動しています。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q03",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "内接円と三角形の面積"
    ],
    "difficulty": 2,
    "question": "図のように、AB = AC = 8、BC = 4 の△ABCが円Pに外接している。このとき、図の網掛け部分の面積はいくらか。",
    "choices": {
      "ア": "2√15 − (6/5)π",
      "イ": "2√15 − (12/5)π",
      "ウ": "4√15 − (6/5)π",
      "エ": "4√15 − (12/5)π",
      "オ": "8√15 − (6/5)π"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "三角形の面積は4×√(8²−2²)/2＝4√15、半周長は10なので内接円の半径は4√15/10です。三角形から円の面積π×(4√15/10)²を引くと4√15−(12/5)πです。",
    "choiceExplanations": {
      "ア": "高さは√(8²−2²)＝2√15で、底辺4を掛けて半分にすると三角形の面積は4√15です。円の面積は(12/5)πです。",
      "イ": "円の面積は合っていますが、2√15は三角形の高さです。底辺4を使うと三角形の面積は4√15です。",
      "ウ": "三角形の面積は合っていますが、半周長10から内接円の半径は(2/5)√15です。これを二乗すると12/5になります。",
      "エ": "三角形の面積は4×√(8²−2²)/2＝4√15、半周長は10なので内接円の半径は4√15/10です。三角形から円の面積π×(4√15/10)²を引くと4√15−(12/5)πです。",
      "オ": "三角形の面積は底辺と高さの積を2で割るので4√15です。内接円を除くときも、半径を二乗した12/5にπを掛けます。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q03.webp"
    ],
    "imageAltTexts": [
      "二等辺三角形ABCと内接円Pおよびその外側の網掛け部分の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q04",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "正四角錐と三角比"
    ],
    "difficulty": 2,
    "question": "図のように、1辺の長さが2である正方形ABCDを底面に持ち、OA = OB = OC = OD = 4である正四角錐OABCDにおいて、頂点Oから面ABCDに下ろした垂線の足を点Hとする。OHの中点をEとし、線分EAと線分AHとのなす角をθとするとき、tan θの値はいくらか。",
    "choices": {
      "ア": "√7/2",
      "イ": "√7",
      "ウ": "√14/2",
      "エ": "√14",
      "オ": "2√5"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Hは底面の中心なのでAH＝√2、OH＝√(4²−2)＝√14です。EH＝√14/2をAHで割ると√7/2になります。",
    "choiceExplanations": {
      "ア": "Hは底面の中心なのでAH＝√2、OH＝√(4²−2)＝√14です。EH＝√14/2をAHで割ると√7/2になります。",
      "イ": "√7はOHをAHで割った値です。角θは中点Eを使うので、分子を高さの半分にします。",
      "ウ": "√14/2はEHの長さです。正接は対辺EHだけではなく、隣辺AH＝√2で割って求めます。",
      "エ": "√14は四角錐全体の高さOHです。Eは高さの中点であり、tan θはEH/AHです。",
      "オ": "底面の対角線2√2の半分がAHです。斜辺OA＝4から高さを求め、EH/AHを計算すると2√5にはなりません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q04.webp"
    ],
    "imageAltTexts": [
      "正四角錐OABCDの高さOH・中点E・角θを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q05",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "三次方程式の重解"
    ],
    "difficulty": 2,
    "question": "方程式 x³ − 12x − a = 0 が異なる二つの実数解をもつとき、正の定数aの値はいくらか。",
    "choices": {
      "ア": "4",
      "イ": "9",
      "ウ": "16",
      "エ": "24",
      "オ": "32"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二つの異なる実数解を持つ三次方程式では一方が重解です。導関数が0のx＝−2、2を代入して得られるaは16、−16なので、正の値は16です。",
    "choiceExplanations": {
      "ア": "異なる実数解が二つだけなら一方が重解です。重解候補は導関数が0になる±2で、a＝4のときどちらも根になりません。",
      "イ": "重解は3x²−12＝0の解でなければなりません。候補を代入するとa＝±16であり、9にはなりません。",
      "ウ": "二つの異なる実数解を持つ三次方程式では一方が重解です。導関数が0のx＝−2、2を代入して得られるaは16、−16なので、正の値は16です。",
      "エ": "x＝−2で x³−12x＝16 です。a＝24では極大値が−8で、グラフはx軸にそこで接しません。",
      "オ": "a＝32では導関数が0になるx＝±2のどちらでも左辺が0になりません。正のaで重解を持つのはa＝16です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q06",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "極小値と導関数"
    ],
    "difficulty": 2,
    "question": "関数 f(x) = ax³ + bx² + 18x は、x = −1で極小値−8をとる。a、bが共に定数であるとき、bの値はいくらか。",
    "choices": {
      "ア": "2",
      "イ": "6",
      "ウ": "12",
      "エ": "18",
      "オ": "20"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "f(−1)＝−8からb−a＝10、f′(−1)＝0から3a−2b＋18＝0です。連立するとa＝2、b＝12で、このときf″(−1)＝12は正です。",
    "choiceExplanations": {
      "ア": "2は連立方程式から求まるaの値です。f(−1)＝−8よりbはaより10大きくなります。",
      "イ": "b＝6ならf(−1)＝−8からa＝−4です。このときf′(−1)＝−6で、極小点の傾きが0になる条件を満たしません。",
      "ウ": "f(−1)＝−8からb−a＝10、f′(−1)＝0から3a−2b＋18＝0です。連立するとa＝2、b＝12で、このときf″(−1)＝12は正です。",
      "エ": "18はxの一次係数です。b＝18としf(−1)＝−8を満たすa＝8を取ると、f′(−1)は6となります。",
      "オ": "b＝20ならa＝10となり、f′(−1)＝8で0になりません。極値には関数値と傾きの両条件が必要です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q07",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "多項式の定積分"
    ],
    "difficulty": 2,
    "question": "次の定積分の値はいくらか。\n∫₁² (2x − 3)(x − 1)² dx",
    "choices": {
      "ア": "1/6",
      "イ": "1/3",
      "ウ": "1/2",
      "エ": "2/3",
      "オ": "5/6"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "t＝x−1と置くと区間は0から1、被積分関数は2t³−t²です。積分は1/2−1/3＝1/6になります。",
    "choiceExplanations": {
      "ア": "t＝x−1と置くと区間は0から1、被積分関数は2t³−t²です。積分は1/2−1/3＝1/6になります。",
      "イ": "1/3はt²だけを0から1まで積分した絶対値です。2t³の積分1/2からこれを引きます。",
      "ウ": "1/2は2t³の積分です。展開に含まれる−t²の積分−1/3も加えます。",
      "エ": "t＝x−1とすると2x−3＝2t−1になります。項を別々に積分して1/2−1/3とするので2/3にはなりません。",
      "オ": "5/6は1/2と1/3を足した値です。被積分関数は2t³−t²なので、二つの積分値の差を取ります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q08",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "曲線と直線で囲まれた面積"
    ],
    "difficulty": 2,
    "question": "xy平面において曲線 y = x² + x − 1 と直線 y = 2x + 1 で囲まれた領域の面積はいくらか。",
    "choices": {
      "ア": "5/2",
      "イ": "8/3",
      "ウ": "10/3",
      "エ": "9/2",
      "オ": "17/3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "連立して( x＋1 )( x−2 )＝0を得ます。直線が上なので、∫₋₁² (−x²＋x＋2) dx＝9/2です。",
    "choiceExplanations": {
      "ア": "交点はx＝−1とx＝2です。この全区間で直線から放物線を引いて積分すると、面積は5/2より大きくなります。",
      "イ": "直線と放物線はx＝−1と2で交わります。高さの差をこの二つの交点の間で積分すると、8/3ではなく9/2です。",
      "ウ": "10/3はx＝0から2までの積分です。左の交点x＝−1から0までの領域も含めます。",
      "エ": "連立して( x＋1 )( x−2 )＝0を得ます。直線が上なので、∫₋₁² (−x²＋x＋2) dx＝9/2です。",
      "オ": "面積は交点より外側を含めず、x＝−1から2の間の高さの差を積分します。その積分値は17/3になりません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q08.webp"
    ],
    "imageAltTexts": [
      "放物線と直線の交点および間の網掛け領域を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q09",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "回転と反転を含む色分け"
    ],
    "difficulty": 2,
    "question": "図のような透明な板を、領域ごとに、異なる5色を全て使って塗り分ける方法は何通りあるか。ただし、回転して同じになる場合、裏返して同じになる場合は同じ塗り分け方とみなすものとする。",
    "choices": {
      "ア": "20通り",
      "イ": "30通り",
      "ウ": "40通り",
      "エ": "60通り",
      "オ": "120通り"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "中央の円に5通り、その外の分割されていない輪に残り4通りが選べます。外周の3領域への残り3色の配置は回転と裏返しで全て一致するので、5×4＝20通りです。",
    "choiceExplanations": {
      "ア": "中央の円に5通り、その外の分割されていない輪に残り4通りが選べます。外周の3領域への残り3色の配置は回転と裏返しで全て一致するので、5×4＝20通りです。",
      "イ": "中央の円と、その外の分割されていない輪の色だけで区別できます。二つに異なる色を選ぶと5×4＝20通りです。",
      "ウ": "40通りは回転だけを同一視した場合です。外周で色が並ぶ向きが逆の二つも、裏返しによって重なります。",
      "エ": "60通りは全てを区別した5!を2で割った数です。裏返しに加え、三つの外周領域を入れ替える回転も同一視します。",
      "オ": "120通りは全て別の配置として数えた値です。外周の残り3色の並べ方はすべて同じとみなされます。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q09.webp"
    ],
    "imageAltTexts": [
      "円板の中央・内側の輪・外側の三つの扇形を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q10",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "部分分数と級数"
    ],
    "difficulty": 2,
    "question": "数列 {aₙ} の一般項aₙが次式で表され、初項から第n項までの和をSₙとする。このとき、lim (n→∞) Sₙの値はいくらか。\naₙ = 1/((2n − 1)(2n + 1))",
    "choices": {
      "ア": "1/5",
      "イ": "1/4",
      "ウ": "1/3",
      "エ": "1/2",
      "オ": "1"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "aₙ＝(1/2)(1/(2n−1)−1/(2n＋1))と分解します。途中の項が打ち消し合い、Sₙ＝(1/2)(1−1/(2n＋1))から1/2になります。",
    "choiceExplanations": {
      "ア": "部分分数によりSₙ＝(1/2)(1−1/(2n＋1))です。nを無限大にすると末尾の項が0になるので1/5にはなりません。",
      "イ": "差の形に直す際の係数1/2は一度だけ掛けます。打ち消し後の括弧内の極限は1です。",
      "ウ": "1/3は初項a₁です。その後の項はどれも正なので、和の極限は初項より大きくなります。",
      "エ": "aₙ＝(1/2)(1/(2n−1)−1/(2n＋1))と分解します。途中の項が打ち消し合い、Sₙ＝(1/2)(1−1/(2n＋1))から1/2になります。",
      "オ": "括弧の中の和は1に近づきますが、元の一般項に合わせるための係数1/2が必要です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q11",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "相対速度と等加速度運動"
    ],
    "difficulty": 2,
    "question": "図のように、一直線上の水平な道路を走る車A、Bがある。Aは速さ72 km/hで走行しており、BはAとは逆向きに速さ36 km/hで走行している。いま、Aが加速度2 m/s²でブレーキをかけた。ブレーキをかけ始めてから5秒後のAから見たBの速さとして最も妥当なのはどれか。",
    "choices": {
      "ア": "36 km/h",
      "イ": "62 km/h",
      "ウ": "72 km/h",
      "エ": "98 km/h",
      "オ": "108 km/h"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aの初速は20 m/sで、5秒後は20−2×5＝10 m/sです。逆向きのBも10 m/sなので、相対速度の大きさは20 m/s＝72 km/hです。",
    "choiceExplanations": {
      "ア": "36 km/hはBの対地速度の大きさです。このときAも同じ36 km/hで逆向きに走っているので、相対速度は72 km/hです。",
      "イ": "5秒間の減速量は10 m/sで、36 km/hに相当します。単位を揃えるとAとBの対地速度の大きさはともに36 km/hです。",
      "ウ": "Aの初速は20 m/sで、5秒後は20−2×5＝10 m/sです。逆向きのBも10 m/sなので、相対速度の大きさは20 m/s＝72 km/hです。",
      "エ": "10はAの減速量をm/sで示した値です。72＋36から引くなら、同じ単位に換算した36 km/hを引きます。",
      "オ": "108 km/hはブレーキをかけ始めた時の相対速度です。5秒後はAが36 km/h減速した分だけ小さくなります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q11.webp"
    ],
    "imageAltTexts": [
      "互いに逆向きに進む車AとBの速さを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q12",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "動摩擦と停止距離"
    ],
    "difficulty": 2,
    "question": "図のように、質量1 kgの物体を初速度10 m/sで水平に打ち出して、水平な粗い床の上を滑らせた。動摩擦係数が0.1のとき、物体が停止するまでに動いた距離として最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "5 m",
      "イ": "10 m",
      "ウ": "25 m",
      "エ": "50 m",
      "オ": "100 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "減速度の大きさは0.1×10＝1 m/s²です。速さの二乗の関係0＝10²−2×1×sから、停止までの距離は50 mです。",
    "choiceExplanations": {
      "ア": "重力加速度10 m/s²がそのまま水平の減速度になるわけではありません。動摩擦係数を掛けた水平の減速度は1 m/s²です。",
      "イ": "停止まで10秒ですが、これは時間です。初速10 m/sから0まで等減速する間の平均速度5 m/sを掛けると50 mです。",
      "ウ": "初速10 m/sの運動エネルギーは50 Jです。動摩擦力は1 Nなので、25 mではその半分しか失われません。",
      "エ": "減速度の大きさは0.1×10＝1 m/s²です。速さの二乗の関係0＝10²−2×1×sから、停止までの距離は50 mです。",
      "オ": "100 mは初速10 m/sのまま10秒間進んだ値です。停止まで速さは減って平均5 m/sなので、距離は50 mです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q12.webp"
    ],
    "imageAltTexts": [
      "水平な粗い床の上を初速度10 m/sで滑る質量1 kgの物体の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q13",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "滑車の運動と鉛直投げ上げ"
    ],
    "difficulty": 2,
    "question": "図のように、滑らかに回転する軽い定滑車に糸をかけ、糸の一端に質量mの小球Aを、他端に質量2mの小球Bをそれぞれ取り付けて、二つの小球を静かに放したところ、Aは上昇、Bは下降を始めた。A、Bが動き出してから3秒後に糸を切断したところ、Aは鉛直上向きに投げ上げられた。鉛直上向きを正としたとき、糸を切断してから1秒後のAの速度として最も妥当なのはどれか。ただし、糸は十分に長いものとし、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "−20 m/s",
      "イ": "−10 m/s",
      "ウ": "0 m/s",
      "エ": "10 m/s",
      "オ": "20 m/s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "連結中は重力の差mgが合計質量3mを加速するので、Aの加速度はg/3、3秒後の速さは10 m/sです。切断後は加速度−10 m/s²なので1秒後の速度は0です。",
    "choiceExplanations": {
      "ア": "糸を切る前のAは上向きに加速して速度が正になります。切断後1秒間に10 m/s減速するので、−20 m/sにはなりません。",
      "イ": "−10 m/sは切断直後の速さが0とした場合の値です。実際にはAは切断時に上向き10 m/sで動いています。",
      "ウ": "連結中は重力の差mgが合計質量3mを加速するので、Aの加速度はg/3、3秒後の速さは10 m/sです。切断後は加速度−10 m/s²なので1秒後の速度は0です。",
      "エ": "10 m/sは糸を切った瞬間の上向き速度です。以後は重力で減速するため、1秒後には0になります。",
      "オ": "切断後、Aに働く重力は下向きです。切断時の上向き10 m/sに10 m/sを足さず、引く必要があります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q13.webp"
    ],
    "imageAltTexts": [
      "定滑車で連結した小球A・Bと糸を切断した直後を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q14",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "ばねの弾性エネルギー"
    ],
    "difficulty": 2,
    "question": "図のように、ばね定数kのばねに軽い板を取り付け、板に質量mの小球を接触させたまま、ばねを自然長からlだけ縮ませてから静かに放した。その後、小球は板から離れ、滑らかな曲面を上がっていった。このとき、小球が達する最高点の高さhとして最も妥当なのはどれか。ただし、重力加速度の大きさをgとし、摩擦の影響は無視するものとする。",
    "choices": {
      "ア": "kl/(2mg)",
      "イ": "kl/(mg)",
      "ウ": "kl²/(2mg)",
      "エ": "kl²/(mg)",
      "オ": "2kl²/(mg)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "蓄えたばねのエネルギーkl²/2は小球の運動エネルギーに移り、最高点では位置エネルギーmghになります。等式を解くとh＝kl²/(2mg)です。",
    "choiceExplanations": {
      "ア": "ばねの弾性エネルギーは変位lの二乗に比例します。lが一乗の式では高さの次元にもなりません。",
      "イ": "klはばねが最も縮んだときの力です。高さは力の比ではなく、力を変位について積分した蓄積エネルギーから求めます。",
      "ウ": "蓄えたばねのエネルギーkl²/2は小球の運動エネルギーに移り、最高点では位置エネルギーmghになります。等式を解くとh＝kl²/(2mg)です。",
      "エ": "縮みが0になるまでばねの力はklから0へ変化します。力を一定のklとして掛けるとエネルギーを2倍に数えてしまいます。",
      "オ": "ばねの力を変位について積分するとkl²/2で、2kl²ではありません。求める高さもこのエネルギーをmgで割った値です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q14.webp"
    ],
    "imageAltTexts": [
      "縮めたばねと曲面を上る小球の高さを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q15",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "圧力と体積による気体の仕事"
    ],
    "difficulty": 2,
    "question": "図のように、単原子分子理想気体を状態A（圧力3P、体積V）から状態B（圧力2P、体積3V）まで直線的に変化させた。このとき、この気体が行った仕事として最も妥当なのはどれか。",
    "choices": {
      "ア": "PV",
      "イ": "2PV",
      "ウ": "(7/2)PV",
      "エ": "4PV",
      "オ": "5PV"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "体積の増加は3V−V＝2Vです。圧力は線形に変わるから平均圧力(3P＋2P)/2を掛けて、仕事は5PVです。",
    "choiceExplanations": {
      "ア": "圧力の変化の大きさPを使っても仕事は求まりません。体積が増える間の圧力自体を積分する必要があります。",
      "イ": "体積変化は2Vですが、膨張中の平均圧力はPではなく(3P＋2P)/2です。",
      "ウ": "仕事はP–V図の線分A–Bの下の台形の面積です。平均圧力5P/2と体積増加2Vの積は5PVです。",
      "エ": "4PVは終状態の圧力2Pを体積変化2V全体に適用した値です。途中の圧力は2Pより高いので仕事はこれを上回ります。",
      "オ": "体積の増加は3V−V＝2Vです。圧力は線形に変わるから平均圧力(3P＋2P)/2を掛けて、仕事は5PVです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q15.webp"
    ],
    "imageAltTexts": [
      "気体の状態A・Bを結んだ圧力・体積グラフの原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q16",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "ドップラー効果"
    ],
    "difficulty": 2,
    "question": "振動数680 Hzの静止している音源に向かって、観測者が速さ15 m/sで近づいている。このとき、観測者が聞く音の振動数として最も妥当なのはどれか。ただし、音速を340 m/sとする。",
    "choices": {
      "ア": "650 Hz",
      "イ": "651 Hz",
      "ウ": "680 Hz",
      "エ": "710 Hz",
      "オ": "711 Hz"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "音源が静止しているため波長は340/680＝0.5 mです。観測者に対する波面の進む速さは340＋15＝355 m/sなので、聞く振動数は355/0.5＝710 Hzです。",
    "choiceExplanations": {
      "ア": "650 Hzは観測者が音源から遠ざかる場合の値です。近づくので波面と出会う頻度が上がります。",
      "イ": "音源へ近づくときは音と観測者の相対速度が355 m/sになります。振動数は650 Hz付近に下がらず、上がります。",
      "ウ": "680 Hzは静止した音源が出す振動数で、静止した観測者が聞く値です。観測者が近づくと波面をより頻繁に受け取ります。",
      "エ": "音源が静止しているため波長は340/680＝0.5 mです。観測者に対する波面の進む速さは340＋15＝355 m/sなので、聞く振動数は355/0.5＝710 Hzです。",
      "オ": "711 Hzは音源が動く場合の式に近い値です。ここでは音源が静止しており、変わるのは観測者と波面の相対速度です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q17",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "必須問題",
      "直流回路の起電力と電流"
    ],
    "difficulty": 2,
    "question": "図のように、電圧がそれぞれ10 V、20 Vの電源と抵抗値が5 Ωの抵抗から成る回路において、流れる電流の向きと大きさの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "時計回り／6 A",
      "イ": "時計回り／2 A",
      "ウ": "時計回り／1 A",
      "エ": "反時計回り／6 A",
      "オ": "反時計回り／2 A"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "反時計回りに一周すると20 Vの上昇と10 Vの降下になるので、抵抗にかかる電圧は10 Vです。オームの法則から電流はその向きに10/5＝2 Aです。",
    "choiceExplanations": {
      "ア": "時計回りには20 Vの電源を正極から負極へ通るため、20 Vの降下があります。二つの起電力は周回方向に対して同じ向きには加わりません。",
      "イ": "大きさは(20−10)/5＝2 Aですが、20 Vの電源の正極側から抵抗へ流れ出るので反時計回りです。",
      "ウ": "二つの電源がつくる合計の起電力の大きさは10 Vです。抵抗5 Ωに対して1 Aではなく2 Aで、向きは反時計回りです。",
      "エ": "向きは合っていますが、20 Vの電源と10 Vの電源は周回上逆向きに作用します。起電力を30 Vとして計算することはできません。",
      "オ": "反時計回りに一周すると20 Vの上昇と10 Vの降下になるので、抵抗にかかる電圧は10 Vです。オームの法則から電流はその向きに10/5＝2 Aです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q17.webp"
    ],
    "imageAltTexts": [
      "向きが同じ二つの電源と抵抗5Ωを含む閉回路の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q18",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "必須問題",
      "8進数の桁数"
    ],
    "difficulty": 2,
    "question": "8進数で100以上1000未満で表される整数はいくつあるか。ただし、選択肢は10進数で表されている。",
    "choices": {
      "ア": "364個",
      "イ": "448個",
      "ウ": "512個",
      "エ": "700個",
      "オ": "777個"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "8進数の100は10進数の64、1000は512です。64以上512未満の整数は512−64＝448個です。",
    "choiceExplanations": {
      "ア": "この範囲には先頭の桁が1～7の全ての三桁の8進数が含まれます。後ろの二桁は各8通りなので、364個ではありません。",
      "イ": "8進数の100は10進数の64、1000は512です。64以上512未満の整数は512−64＝448個です。",
      "ウ": "512個は0以上で8進数の1000未満の全整数を数えた値です。下限100未満の64個を除きます。",
      "エ": "700は100と1000を10進数のように扱っても差にはなりません。8進数では下限が64、上限が512に当たるので差は448です。",
      "オ": "8進数の777は範囲内で最大の表記で、10進数では511です。個数は511−64＋1で求めます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q19",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "必須問題",
      "フローチャートの繰返し"
    ],
    "difficulty": 2,
    "question": "図のフローチャートを実行したとき、出力されるaの値はいくらか。",
    "choices": {
      "ア": "108",
      "イ": "216",
      "ウ": "240",
      "エ": "512",
      "オ": "768"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "i＝1から6のうち奇数は3回でaを3倍し、偶数も3回で2倍します。初期値1から最終値は3³×2³＝216です。",
    "choiceExplanations": {
      "ア": "108はi＝5まで終了した時点の値です。i＝6の偶数による2倍の更新をもう一度行います。",
      "イ": "i＝1から6のうち奇数は3回でaを3倍し、偶数も3回で2倍します。初期値1から最終値は3³×2³＝216です。",
      "ウ": "掛ける数は奇数回の3と偶数回の2だけで、5を素因数に含む240は生じません。",
      "エ": "偶数の分岐だけを通るわけではなく、iが1、3、5のときに3倍します。結果は2の累乗にはなりません。",
      "オ": "i≤6の間だけ更新し、偶数時の2倍と奇数時の3倍は各3回です。768に必要な2の因数の個数より少なくなります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q19.webp"
    ],
    "imageAltTexts": [
      "偶奇に応じてaを更新し出力するフローチャートの原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q20",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "必須問題",
      "論理回路と真理値表"
    ],
    "difficulty": 2,
    "question": "図のような入力X、Y、出力Zの論理回路がある。この論理回路の真理値表である表Ⅰの㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。なお、表Ⅱは、AND回路、OR回路、NOT回路の図記号と真理値表を表している。",
    "choices": {
      "ア": "0／0／0",
      "イ": "0／0／1",
      "ウ": "0／1／1",
      "エ": "1／1／0",
      "オ": "1／1／1"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "上段のANDはXを反転してYと取り、下段はYを反転してXと取ります。二つのORを最後に反転するため、XとYが一致したときに1となり、順に0、0、1です。",
    "choiceExplanations": {
      "ア": "入力が異なる場合に出力が0となる最初の二つは合います。入力がともに1では両方のAND出力が0で、最後のNOTによってZは1です。",
      "イ": "上段のANDはXを反転してYと取り、下段はYを反転してXと取ります。二つのORを最後に反転するため、XとYが一致したときに1となり、順に0、0、1です。",
      "ウ": "X＝1、Y＝0なら下段のANDが1です。OR後の値を反転するとZ＝0なので、㋑＝1は誤りです。",
      "エ": "これは最後のNOTを通す前の値です。最終出力Zでは各値が反転し、0、0、1となります。",
      "オ": "XとYが異なると、上下のAND出力の片方が1です。ORを通してから反転するので、前二つの出力は0です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q20.webp"
    ],
    "imageAltTexts": [
      "二入力の論理回路、穴埋めする真理値表、三種類のゲートの表を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q21",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "直並列回路の合成抵抗"
    ],
    "difficulty": 2,
    "question": "図のような回路において、電源の電圧の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "5 V",
      "イ": "9 V",
      "ウ": "10 V",
      "エ": "30 V",
      "オ": "45 V"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "2 Ωと4 Ωの並列合成は4/3 Ω、3 Ωと6 Ωの並列合成は2 Ωです。二組は直列なので3×(4/3＋2)＝10 Vです。",
    "choiceExplanations": {
      "ア": "5 Vでは合成抵抗10/3 Ωに流れる電流は1.5 Aです。設問の3 Aにするにはさらに大きな電圧が必要です。",
      "イ": "並列部の抵抗は左が4/3 Ω、右が2 Ωです。合計は3 Ωより大きいので、3 Aに必要な電圧は9 Vより大きくなります。",
      "ウ": "2 Ωと4 Ωの並列合成は4/3 Ω、3 Ωと6 Ωの並列合成は2 Ωです。二組は直列なので3×(4/3＋2)＝10 Vです。",
      "エ": "30 Vは抵抗値を別の接続として加えた結果に相当します。並列の各組はどの枝の抵抗よりも小さくなり、電源電圧は10 Vです。",
      "オ": "45 Vは四つの抵抗を直列とした場合の15 Ω×3 Aです。この回路は二組の並列回路を直列にしたものです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q21.webp"
    ],
    "imageAltTexts": [
      "2Ωと4Ωの並列部、3Ωと6Ωの並列部、3 Aの電流を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q22",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "電流計の分流器"
    ],
    "difficulty": 2,
    "question": "電流計と分流に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、抵抗値Rₛ［Ω］の抵抗を、分流器として内部抵抗が9 Ωの電流計と並列に接続した。このとき、負荷に流れる電流の大きさをIとすると、電流計に流れる電流の大きさIₐは［㋐］となる。これを利用すると、電流計の測定範囲を拡大することができる。例えば、電流計の最大目盛が20 mAであるとき、Rₛを［㋑］とすれば、I = 200 mAまで測定範囲を拡大できる。」",
    "choices": {
      "ア": "RₛI/(Rₛ＋9)／1 Ω",
      "イ": "RₛI/(Rₛ＋9)／81 Ω",
      "ウ": "9I/(Rₛ＋9)／1 Ω",
      "エ": "9I/(Rₛ＋9)／81 Ω",
      "オ": "(Rₛ＋9)I/Rₛ／81 Ω"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "並列の両枝に同じ電圧がかかるので、9Iₐ＝Rₛ(I−Iₐ)となります。Iₐが全電流の1/10となる条件Rₛ/(Rₛ＋9)＝1/10からRₛ＝1 Ωです。",
    "choiceExplanations": {
      "ア": "並列の両枝に同じ電圧がかかるので、9Iₐ＝Rₛ(I−Iₐ)となります。Iₐが全電流の1/10となる条件Rₛ/(Rₛ＋9)＝1/10からRₛ＝1 Ωです。",
      "イ": "分流式は合いますが、Rₛ＝81 Ωでは全電流の9割が電流計を通ります。必要なのは逆に全電流の1割が電流計を通ることです。",
      "ウ": "Rₛ＝1 Ωは適切です。ただし9/(Rₛ＋9)を掛けた値は分流器側の電流で、電流計側の係数はRₛ/(Rₛ＋9)です。",
      "エ": "9/(Rₛ＋9)は分流器に流れる電流の割合です。電流計に20 mA、分流器に180 mAを流すにはRₛを1 Ωにします。",
      "オ": "式の係数が1を超えるため、枝を通る電流が全電流より大きくなってしまいます。両枝の電圧を等しくすればRₛ＝1 Ωになります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q22.webp"
    ],
    "imageAltTexts": [
      "内部抵抗9Ωの電流計に並列の分流器と負荷を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q23",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "コンデンサの充電と電荷"
    ],
    "difficulty": 2,
    "question": "図のような回路において、十分に時間が経過した後にコンデンサに蓄えられている電荷の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "50 μC",
      "イ": "100 μC",
      "ウ": "200 μC",
      "エ": "500 μC",
      "オ": "1,000 μC"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "定常状態では直流電流が0となって抵抗の電圧降下が消えます。Q＝CV＝10 μF×10 V＝100 μCです。",
    "choiceExplanations": {
      "ア": "容量10 μFに50 μCを蓄えると両端電圧は5 Vです。充電後には抵抗の電圧降下がなくなり、電源の10 Vがかかります。",
      "イ": "定常状態では直流電流が0となって抵抗の電圧降下が消えます。Q＝CV＝10 μF×10 V＝100 μCです。",
      "ウ": "200 μCにするには10 μFのコンデンサに20 Vをかける必要があります。十分に充電しても端子電圧は電源の10 Vです。",
      "エ": "500 μCならコンデンサ電圧は50 Vです。直流の定常状態ではコンデンサには電源の10 Vがかかります。",
      "オ": "蓄積電荷は静電容量と端子電圧の積です。定常状態では抵抗値を電荷の計算に掛ける必要はありません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q23.webp"
    ],
    "imageAltTexts": [
      "10 V電源・10Ω抵抗・10 μFコンデンサの直列回路の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q24",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "RLC直列共振"
    ],
    "difficulty": 2,
    "question": "図のようなRLC直列回路が共振している（電流iと電圧Vが同相である）とき、電源の角周波数ω、コイルの自己インダクタンスL、コンデンサの静電容量Cの組合せとして最も妥当なのは次のうちどれか。",
    "choices": {
      "ア": "2×10³ rad/s／50 mH／0.5 μF",
      "イ": "2×10³ rad/s／100 mH／2 μF",
      "ウ": "1×10⁴ rad/s／25 mH／2 μF",
      "エ": "1×10⁴ rad/s／50 mH／0.4 μF",
      "オ": "2×10⁴ rad/s／25 mH／0.1 μF"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "共振時はωL＝1/(ωC)です。L＝0.025 H、C＝10⁻⁷ Fとすると(2×10⁴)²LC＝1で、二つのリアクタンスが相殺します。",
    "choiceExplanations": {
      "ア": "共振条件はω²LC＝1です。この組合せでSI単位に換算すると積は0.10となり、容量性のリアクタンスが勝ります。",
      "イ": "100 mHと2 μFならLC＝2×10⁻⁷で、ω²を掛けると0.80です。共振させるには積が1になる角周波数が必要です。",
      "ウ": "この組合せのLCは5×10⁻⁸です。ω²LC＝5なので、誘導性と容量性のリアクタンスは等しくなりません。",
      "エ": "L＝0.050 H、C＝0.4×10⁻⁶ Fなのでω²LC＝2になります。共振時はこの値が1です。",
      "オ": "共振時はωL＝1/(ωC)です。L＝0.025 H、C＝10⁻⁷ Fとすると(2×10⁴)²LC＝1で、二つのリアクタンスが相殺します。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q24.webp"
    ],
    "imageAltTexts": [
      "電源と抵抗R・コイルL・コンデンサCから成る直列回路の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q25",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "対称三相交流と平衡負荷"
    ],
    "difficulty": 2,
    "question": "対称三相交流に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「三相交流のうち、三つの起電力の大きさが等しく、位相差が互いに［㋐］の三相交流を対称三相交流という。図のような、各相の起電力の実効値がEの対称三相交流電源に、各相のインピーダンスの大きさがZの平衡負荷を接続したY–Y回路において、三相の相電流の和は常に［㋑］である。」",
    "choices": {
      "ア": "60°／0",
      "イ": "60°／E/Z",
      "ウ": "60°／3E/Z",
      "エ": "120°／0",
      "オ": "120°／3E/Z"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "相間は360°を三等分した120°です。平衡負荷では各相電流が等しい大きさで120°ずつ離れ、瞬時値を足しても常に0です。",
    "choiceExplanations": {
      "ア": "相電流の和が0となる点は合っています。等間隔の三相を一周360°に配置すると位相差は120°です。",
      "イ": "E/Zは各相の電流の実効値の大きさです。相ごとに120°ずれているので、瞬時電流やベクトルの和は0になります。",
      "ウ": "各相の実効値の大きさを単純に3倍すると、位相差による相殺が反映されません。対称三相交流の位相間隔は120°です。",
      "エ": "相間は360°を三等分した120°です。平衡負荷では各相電流が等しい大きさで120°ずつ離れ、瞬時値を足しても常に0です。",
      "オ": "位相差は120°で合っていますが、3E/Zは各相の大きさをそのまま足した値です。位相を含めて足すと0になります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q25.webp"
    ],
    "imageAltTexts": [
      "対称三相電源と平衡負荷のY–Y結線を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q26",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "NPNトランジスタの動作"
    ],
    "difficulty": 2,
    "question": "図Ⅰ、図Ⅱはnpn形のトランジスタを用いた回路である。それぞれの回路におけるコレクタ電流の流れ方の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "①の向きに流れる／①の向きに流れる",
      "イ": "①の向きに流れる／②の向きに流れる",
      "ウ": "①の向きに流れる／流れない",
      "エ": "流れない／①の向きに流れる",
      "オ": "流れない／②の向きに流れる"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "図Ⅰではベース・エミッタ間に電圧がなく、コレクタ電流は流れません。図Ⅱではベースが順方向に駆動され、コレクタへ入る①の向きに流れます。",
    "choiceExplanations": {
      "ア": "図Ⅱではベースに電流が流れ、コレクタ電流は①となります。図Ⅰはベースとエミッタが同電位で、トランジスタはオフです。",
      "イ": "図Ⅰにはベース電流がありません。図Ⅱの慣用電流は正電源からコレクタへ入るので、②とは逆です。",
      "ウ": "図Ⅰはベースがエミッタと同電位のためオフです。図Ⅱはベース・エミッタ間が順方向になり、コレクタに電流が流れます。",
      "エ": "図Ⅰではベース・エミッタ間に電圧がなく、コレクタ電流は流れません。図Ⅱではベースが順方向に駆動され、コレクタへ入る①の向きに流れます。",
      "オ": "図Ⅰで流れない点は合っています。図Ⅱは正電源からコレクタへ電流が入るため、向きは①です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q26.webp"
    ],
    "imageAltTexts": [
      "ベースの接続が異なる二つのnpnトランジスタとコレクタ電流の向きを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q27",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "バイアス付きダイオードのリミッタ"
    ],
    "difficulty": 2,
    "question": "図Ⅰに示す回路において、入力電圧Vᵢが図Ⅱのように時間変化するとき、出力電圧Vₒの時間変化の概形として最も妥当なのはどれか。ただし、V＜Vₘであり、ダイオードの特性は理想的であるとする。",
    "choices": {
      "ア": "図の1",
      "イ": "図の2",
      "ウ": "図の3",
      "エ": "図の4",
      "オ": "図の5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "正側ではダイオードがオフで抵抗に電流が流れず、Vₒ＝Vᵢです。入力が−Vを下回ろうとするとダイオードが導通し、負のピークは−Vで止まります。",
    "choiceExplanations": {
      "ア": "正の入力ではダイオードは逆バイアスで電流が流れず、抵抗での電圧降下もありません。正のパルスはVₘのままです。",
      "イ": "正のパルスVₘはそのままです。負のパルスはVだけ加算するのではなく、ダイオードが導通して−Vに制限されます。",
      "ウ": "負のピークが−Vとなる点は合っています。ダイオードが逆バイアスになる正のピークはVではなくVₘです。",
      "エ": "回路のダイオードは負方向の電圧を制限します。正のパルスをVにして負のパルスを−Vₘのまま通す波形とは逆です。",
      "オ": "正側ではダイオードがオフで抵抗に電流が流れず、Vₒ＝Vᵢです。入力が−Vを下回ろうとするとダイオードが導通し、負のピークは−Vで止まります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q27.webp"
    ],
    "imageAltTexts": [
      "図Ⅰのダイオード回路と図Ⅱの正負の入力パルスを示す原図"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q27-1.webp",
      "イ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q27-2.webp",
      "ウ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q27-3.webp",
      "エ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q27-4.webp",
      "オ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q27-5.webp"
    }
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q28",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "有効数字"
    ],
    "difficulty": 2,
    "question": "次の計測値①、②、③の有効数字の桁数の組合せとして最も妥当なのはどれか。\n① 1.01×10⁴\n② 0.010\n③ 0.1",
    "choices": {
      "ア": "3桁／2桁／1桁",
      "イ": "3桁／4桁／2桁",
      "ウ": "4桁／2桁／1桁",
      "エ": "4桁／3桁／1桁",
      "オ": "4桁／4桁／2桁"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "①は1、0、1の3桁です。②は最初に現れる1から末尾の0までの2桁、③は小数点より後の1だけで1桁です。",
    "choiceExplanations": {
      "ア": "①は1、0、1の3桁です。②は最初に現れる1から末尾の0までの2桁、③は小数点より後の1だけで1桁です。",
      "イ": "①の3桁は正しいです。②と③で、最初の非ゼロの数字より前に置かれた0は桁の位置を示すだけです。",
      "ウ": "②と③は正しいです。①の10⁴は数の大きさを表す係数で、有効数字は1.01の3桁です。",
      "エ": "①では指数を有効数字に数えません。②は小数点の位置を示す先頭の0を除き、10の二つの数字を数えます。",
      "オ": "指数や先頭の0は精度を示す有効数字には含めません。①は3桁、②は2桁、③は1桁です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q29",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "理想変圧器の巻数比"
    ],
    "difficulty": 2,
    "question": "一次側の巻数が2000、二次側の巻数が100の理想変圧器の一次側に、実効値4000 Vの交流電源を接続した。このとき、二次側に生じる電圧の実効値として最も妥当なのはどれか。",
    "choices": {
      "ア": "10 V",
      "イ": "100 V",
      "ウ": "200 V",
      "エ": "40,000 V",
      "オ": "80,000 V"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "理想変圧器では実効値の比が巻数の比に等しくなります。二次側は4,000×(100/2,000)＝200 Vです。",
    "choiceExplanations": {
      "ア": "巻数の比は100/2,000＝1/20です。一次側の4,000 Vを20で割るので、10 Vより大きくなります。",
      "イ": "100は二次巻線の巻数です。電圧は巻数比を一次の電圧に掛けた4,000×100/2,000で求めます。",
      "ウ": "理想変圧器では実効値の比が巻数の比に等しくなります。二次側は4,000×(100/2,000)＝200 Vです。",
      "エ": "二次側の巻数は一次側より少ないため、電圧は上がりません。巻数が1/20なら電圧も1/20です。",
      "オ": "80,000 Vは巻数の比を逆にして20倍した結果です。二次側の電圧には二次巻数を一次巻数で割った比を掛けます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q30",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "kWhとジュールの換算"
    ],
    "difficulty": 2,
    "question": "1 kW·hは何Jか。",
    "choices": {
      "ア": "1.0×10⁻³ J",
      "イ": "2.8×10⁻² J",
      "ウ": "2.8×10³ J",
      "エ": "3.6×10³ J",
      "オ": "3.6×10⁶ J"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "1 kW＝10³ J/s、1 h＝3.6×10³ sです。積を取ると1 kW·h＝3.6×10⁶ Jになります。",
    "choiceExplanations": {
      "ア": "kWはWの千倍です。その電力が1時間続いて行う仕事は、秒へ換算した時間も掛けるので10⁻³ Jにはなりません。",
      "イ": "1 Wは1 J/sです。電力を1,000 J/s、時間を3,600 sとそろえてから掛けます。",
      "ウ": "1 kWの電力は1秒だけで1,000 Jの仕事をします。1時間は3,600秒なので、この値は小さ過ぎます。",
      "エ": "3.6×10³ Jは1 Wを1時間使うときの仕事です。1 kWは1,000 Wなのでさらに千倍します。",
      "オ": "1 kW＝10³ J/s、1 h＝3.6×10³ sです。積を取ると1 kW·h＝3.6×10⁶ Jになります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q31",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "2進数から16進数への変換"
    ],
    "difficulty": 2,
    "question": "2進数1001010110111111を16進数に変換した値として正しいのはどれか。",
    "choices": {
      "ア": "8AAD",
      "イ": "94AF",
      "ウ": "95BF",
      "エ": "A590",
      "オ": "A7FF"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "4ビットずつ1001、0101、1011、1111に区切ります。それぞれ9、5、B、Fに対応するので95BFです。",
    "choiceExplanations": {
      "ア": "先頭の4ビット1001は8＋1＝9です。8に対応するのは1000なので先頭から一致しません。",
      "イ": "先頭の1001と末尾の1111は9とFですが、中央の0101と1011は4とAではなく5とBです。",
      "ウ": "4ビットずつ1001、0101、1011、1111に区切ります。それぞれ9、5、B、Fに対応するので95BFです。",
      "エ": "先頭の1001は9で、Aは1010です。末尾の1111も0ではなくFに対応します。",
      "オ": "先頭は9で、次の0101は5です。1011はBなので、末尾を二桁ともFにすることもできません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q32",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "論理式の恒等性"
    ],
    "difficulty": 2,
    "question": "論理式 A + B + ¬(A·B) と等価なものは次のうちではどれか。ただし、「¬P」は論理変数Pの否定を、「＋」は論理和を、「·」は論理積を表すものとする。",
    "choices": {
      "ア": "0",
      "イ": "1",
      "ウ": "A＋B",
      "エ": "¬A＋¬B",
      "オ": "A·B"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "AとBが共に0のときは¬(A·B)が1で、それ以外ではA＋Bが1です。どの入力でも全体が1になります。",
    "choiceExplanations": {
      "ア": "AかBが1なら最初の論理和が1です。両方が0でも最後の項が1になるので、出力は0になりません。",
      "イ": "AとBが共に0のときは¬(A·B)が1で、それ以外ではA＋Bが1です。どの入力でも全体が1になります。",
      "ウ": "A＋Bは両方0のときに0です。元の式では最後の¬(A·B)が1になるため、等価ではありません。",
      "エ": "¬A＋¬Bはド・モルガンの法則により末尾の項と等価です。ただし両方1のときに0となり、元の式の1と異なります。",
      "オ": "A·Bは両方が1のときにしか1になりません。元の式はどちらかが0でも論理和のいずれかの項が1です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q33",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "キャッシュメモリとヒット率"
    ],
    "difficulty": 2,
    "question": "コンピュータの記憶階層に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「主記憶装置へのアクセス時間を高速化するために設ける、主記憶装置とレジスタの間の階層の記憶装置を［㋐］という。［㋐］のアクセス時間が20 ns、主記憶装置のアクセス時間が100 ns、ヒット率が95％であるとすると、主記憶装置への実効アクセス時間は、［㋑］である。」",
    "choices": {
      "ア": "補助記憶装置／19 ns",
      "イ": "補助記憶装置／24 ns",
      "ウ": "補助記憶装置／96 ns",
      "エ": "キャッシュメモリ／24 ns",
      "オ": "キャッシュメモリ／96 ns"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "レジスタと主記憶の間にキャッシュメモリを置きます。公式正答が採る計算では、ヒット時20 ns、ミス時100 nsを確率で重み付けし、20×0.95＋100×0.05＝24 nsです。",
    "choiceExplanations": {
      "ア": "レジスタと主記憶の間にある高速な記憶はキャッシュメモリです。19 nsには主記憶へアクセスする5％の場合が含まれていません。",
      "イ": "24 nsは設問の想定する加重平均と一致します。この階層の記憶装置は補助記憶装置ではなくキャッシュメモリです。",
      "ウ": "補助記憶装置は主記憶より低い階層で、永続的な保存などに使います。96 nsは時間の長い方に95％を掛けており、ヒットの意味を取り違えています。",
      "エ": "レジスタと主記憶の間にキャッシュメモリを置きます。公式正答が採る計算では、ヒット時20 ns、ミス時100 nsを確率で重み付けし、20×0.95＋100×0.05＝24 nsです。",
      "オ": "キャッシュメモリの名称は合っています。時間の短い20 nsの方が95％なので、設問の平均は100 nsに近い96 nsにはなりません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q34",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "IPv4のネットワーク部"
    ],
    "difficulty": 2,
    "question": "IPアドレスに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「IPv4において、IPアドレスは［㋐］ビットで構成され、上位をネットワーク部、下位を［㋑］部という。ネットワーク部と［㋑］部は［㋒］で切り分けられる。」",
    "choices": {
      "ア": "32／ホスト／サブネットマスク",
      "イ": "32／クラス／サブネットマスク",
      "ウ": "32／クラス／ブロードキャスト",
      "エ": "128／ホスト／ブロードキャスト",
      "オ": "128／クラス／サブネットマスク"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "IPv4アドレスは32ビットで、上位のネットワーク部と下位のホスト部から成ります。サブネットマスクではネットワーク部に対応するビットが1です。",
    "choiceExplanations": {
      "ア": "IPv4アドレスは32ビットで、上位のネットワーク部と下位のホスト部から成ります。サブネットマスクではネットワーク部に対応するビットが1です。",
      "イ": "ビット数とサブネットマスクは合っています。下位で個々の機器などを区別する部分はホスト部と呼びます。",
      "ウ": "IPv4の32ビットは合っています。範囲の区切りを示すのはサブネットマスクで、ブロードキャストは宛先の指定などに使う概念です。",
      "エ": "下位をホスト部とする点は合っています。128ビットはIPv6で、IPv4の境界はサブネットマスクで表します。",
      "オ": "サブネットマスクは合っていますが、IPv4は32ビットです。下位をクラス部ではなくホスト部と呼びます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q35",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択A（電気・情報系）",
      "デジタル信号の変調方式"
    ],
    "difficulty": 2,
    "question": "図は、デジタル信号を振幅偏移変調（ASK）、周波数偏移変調（FSK）、位相偏移変調（PSK）したときの波形を模式的に表したものである。変調方式と㋐、㋑、㋒の波形の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "㋐／㋑／㋒",
      "イ": "㋐／㋒／㋑",
      "ウ": "㋑／㋐／㋒",
      "エ": "㋑／㋒／㋐",
      "オ": "㋒／㋑／㋐"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑は信号に応じて振幅を切り替えるASK、㋐は周期の違いで周波数を切り替えるFSKです。㋒は同じ振幅・周波数で位相が変わるPSKです。",
    "choiceExplanations": {
      "ア": "㋐はビットごとに周期が変わるのでFSKです。信号に対応して振幅が消える㋑がASKです。",
      "イ": "㋐では振幅がほぼ一定で周波数が切り替わります。位相が切り替わる㋒はPSKです。",
      "ウ": "㋑は信号に応じて振幅を切り替えるASK、㋐は周期の違いで周波数を切り替えるFSKです。㋒は同じ振幅・周波数で位相が変わるPSKです。",
      "エ": "㋑がASKである点は合っています。㋒は位相が切り替わるPSKで、周波数が変わる㋐がFSKです。",
      "オ": "㋒は振幅が一定で位相を変えるPSKです。㋑で変わっているのは振幅なので、FSKではありません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q35.webp"
    ],
    "imageAltTexts": [
      "デジタル信号と三つの変調波形を上下に並べた原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q36",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "OSのプロセス状態遷移"
    ],
    "difficulty": 2,
    "question": "オペレーティングシステム（OS）の機能の一つに、プロセス（タスク）の管理がある。図は、プロセス（タスク）の状態遷移を表している。図中の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。なお、図中の空欄X、Yにも状態遷移を表す語が入るが、設問の都合上伏せてある。",
    "choices": {
      "ア": "待ち状態／実行可能状態／入出力開始／入出力完了",
      "イ": "待ち状態／実行可能状態／入出力完了／入出力開始",
      "ウ": "待ち状態／実行可能状態／CPU割当て（ディスパッチング）／CPU解放（プリエンプション）",
      "エ": "実行可能状態／待ち状態／入出力完了／入出力開始",
      "オ": "実行可能状態／待ち状態／CPU割当て（ディスパッチング）／CPU解放（プリエンプション）"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "生成直後に㋐の実行可能状態に入り、CPU割当てで実行します。実行中にCPUを明け渡して再び実行可能となるのが㋓で、入出力を待つ間は㋑に移ります。",
    "choiceExplanations": {
      "ア": "生成したプロセスは通常、入出力待ちではなくCPUの割当てを待つ実行可能状態に入ります。㋒は割当てによって実行状態へ移る矢印です。",
      "イ": "入出力が終わると待ち状態から実行可能状態へ移ります。㋒はそこからCPUを与えられて実行を始める遷移です。",
      "ウ": "㋒と㋓のCPU割当て・解放は合っています。新規プロセスが入る㋐が実行可能状態で、入出力などを待つ㋑が待ち状態です。",
      "エ": "状態の対応は合っていますが、実行可能と実行中の間の遷移はCPU割当てとプリエンプションです。入出力の遷移は図のXやYに対応します。",
      "オ": "生成直後に㋐の実行可能状態に入り、CPU割当てで実行します。実行中にCPUを明け渡して再び実行可能となるのが㋓で、入出力を待つ間は㋑に移ります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q36.webp"
    ],
    "imageAltTexts": [
      "プロセスの生成から実行・待ち・終了までの状態遷移の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q37",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "ソフトウェアの法的保護"
    ],
    "difficulty": 2,
    "question": "我が国におけるソフトウェアの法的保護に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 特許権は、発明をした時点で発生する。\n㋑ 著作権は、著作物を創作した時点で発生する。\n㋒ 無償で利用可能ないわゆるフリーソフトウェアは、著作権が放棄されており、自由にコピーや改変等をすることができる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "著作権は著作物を創作した時点で発生し、登録手続は発生要件ではありません。特許権の登録とは扱いが異なります。",
    "choiceExplanations": {
      "ア": "特許権は発明しただけで発生するわけではありません。出願後の審査を経て、設定登録によって発生します。",
      "イ": "㋑は正しいですが、㋐の発明の時点では特許権はまだありません。特許権には設定登録が必要です。",
      "ウ": "著作権は著作物を創作した時点で発生し、登録手続は発生要件ではありません。特許権の登録とは扱いが異なります。",
      "エ": "㋑は正しいです。無償利用が可能でも著作権は通常残り、複製や改変はライセンスの条件に従います。",
      "オ": "利用料金が無料であることと、著作権が放棄されることは別です。コピーや改変がどこまで許されるかはライセンス次第です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q38",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "データベースの障害回復"
    ],
    "difficulty": 2,
    "question": "データベースの障害回復に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「データベースにトランザクション障害が発生した場合、データベース管理システムは、ログファイルを使って、データベースをトランザクション実行前の状態に戻す処理を行う。これを［㋐］という。一方、データベースにシステム障害やハードウェア障害が発生した場合、データベース管理システムは、障害が発生する前に保存されたバックアップファイルを使ってデータベースを復元し、さらに復元されたデータベースを障害が発生する直前の状態にするために、ログファイルを参照してそれまでに実行されたものと同じトランザクションを実行する処理を行う。これを［㋑］という。」",
    "choices": {
      "ア": "ロールバック／ロールフォワード",
      "イ": "ロールバック／ロック",
      "ウ": "ロック／ロールバック",
      "エ": "ロック／ロールフォワード",
      "オ": "コミット／ロールバック"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ロールバックは障害を起こしたトランザクションの変更を取り消して開始前に戻します。ロールフォワードはバックアップ後の変更をログから適用して状態を進めます。",
    "choiceExplanations": {
      "ア": "ロールバックは障害を起こしたトランザクションの変更を取り消して開始前に戻します。ロールフォワードはバックアップ後の変更をログから適用して状態を進めます。",
      "イ": "㋐はロールバックです。ロックは同時アクセスを制御するしくみで、ログから変更を再適用する処理ではありません。",
      "ウ": "ロックは他の処理との同時更新などを制御します。バックアップ後の変更を再適用して状態を進める㋑はロールフォワードです。",
      "エ": "㋑のロールフォワードは合っています。実行前まで状態を戻す㋐はロックではなくロールバックです。",
      "オ": "コミットは変更を確定する処理です。変更を取り消すのはロールバック、保存した状態から変更を再適用するのはロールフォワードです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q39",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "フローチャートによる日数計算"
    ],
    "difficulty": 2,
    "question": "図のフローチャートを実行したとき、出力されるSの値はいくらか。",
    "choices": {
      "ア": "507",
      "イ": "520",
      "ウ": "554",
      "エ": "566",
      "オ": "585"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "2023年4月1日から12月31日までは275日です。2024年1月1日から9月1日までは閏年の2月29日と最後の9月1日を含む245日で、和は520日です。",
    "choiceExplanations": {
      "ア": "2023年の4月から12月だけで275日あります。2024年側も閏年の2月を29日として計算すると、全体は507日より長くなります。",
      "イ": "2023年4月1日から12月31日までは275日です。2024年1月1日から9月1日までは閏年の2月29日と最後の9月1日を含む245日で、和は520日です。",
      "ウ": "終了判定は2024年9月に入った時点で成立し、その月の加算は9月1日分だけです。これより後の日数を足しません。",
      "エ": "2023年側で加算するのは開始月の4月から12月までです。2024年9月の分は1日だけなので、合計は520日になります。",
      "オ": "2024年側は1月から8月の244日に9月1日の1日を加えます。2023年の275日と足しても585日にはなりません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q39.webp"
    ],
    "imageAltTexts": [
      "年月日から月末までの日数を積み上げるフローチャートの原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q40",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "状態空間の幅優先探索"
    ],
    "difficulty": 2,
    "question": "次の問題を考える。\n容器A、B、Cがあり、容積はそれぞれ3 L、5 L、8 Lである。いま、容器A、Bは空で、容器Cは水で満たされている。容器間で、移動元の容器が空になるか、移動先の容器が満杯になるまで水を移動させる操作を繰り返し、いずれかの容器にちょうど4 Lの水が入った状態を作りたい。最短で何回の操作が必要か。\n次の記述は、この問題の解法に関する記述である。［　］に当てはまるものとして最も妥当なのはどれか。\n「容器A、B、Cに入っている水の量がa、b、cの状態を(abc)と表し、容器XからYへ水を移動させる操作をX→Yと表すことにする。初期状態は(008)である。初期状態(008)から出発して、1回の操作で実現可能な状態を下に順次つなげることで、図のような木構造を作ることを考える。例えば、図の点線部分は、初期状態からC→Bの操作をすることで(053)の状態が実現することを表す。最短の操作回数を求めるため、自身よりも上か左に登場する状態と同じ状態は、それ以上の操作を考えないこととする（図中では×印で表されている。）。いま、図には4回の操作で実現する状態までが表されているが、これを更に続けることで、初期状態から最短［　］の操作で状態(341)が実現することが分かる。」",
    "choices": {
      "ア": "5回",
      "イ": "6回",
      "ウ": "7回",
      "エ": "8回",
      "オ": "9回"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "最短経路の一例は(008)→(053)→(323)→(026)→(206)→(251)→(341)です。5回以内の状態に4 Lはなく、初めて到達するのは6回目です。",
    "choiceExplanations": {
      "ア": "5回目で新しく現れるのは(107)と(251)です。どちらも水が4 L入った容器はなく、もう1回の操作が必要です。",
      "イ": "最短経路の一例は(008)→(053)→(323)→(026)→(206)→(251)→(341)です。5回以内の状態に4 Lはなく、初めて到達するのは6回目です。",
      "ウ": "7回目にも4 Lを含む別の状態が見つかりますが、5回目の(251)からB→Aで1 L移すと6回で(341)になります。",
      "エ": "状態(206)は4回の操作で得られます。そこからC→B、B→Aの2回だけで(341)に達するため、8回は最短ではありません。",
      "オ": "同じ状態への再訪を避け、段ごとに調べます。すでに6回目で(341)が得られるので、9回を選ぶ必要はありません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q40.webp"
    ],
    "imageAltTexts": [
      "三つの容器間で水を移す最初の4操作までの状態遷移の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q41",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "金属の結晶構造と性質"
    ],
    "difficulty": 2,
    "question": "金属の性質に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 金属は多数の原子から構成されており、金属の結晶構造は必ず体心立方格子又は面心立方格子となる。\n㋑ 一般に、金属は光沢があり、展延性に富み、電気や熱を伝えやすい性質をもつ。\n㋒ 金属は、熱を加えたり、圧力を加えたりすることで塑性変形させ、成形することができる有機高分子材料である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "金属では自由に動ける電子が電気や熱の輸送に寄与します。光沢や、たたいて広げたり引き伸ばしたりできる性質も一般的な特徴です。",
    "choiceExplanations": {
      "ア": "金属には最密六方格子の結晶もあります。例えばマグネシウムは常温でその構造をとります。",
      "イ": "金属の光沢や伝導性を述べる㋑は妥当ですが、結晶構造を二種類の立方格子に限る㋐は誤りです。",
      "ウ": "金属では自由に動ける電子が電気や熱の輸送に寄与します。光沢や、たたいて広げたり引き伸ばしたりできる性質も一般的な特徴です。",
      "エ": "㋑は妥当です。金属を塑性変形させて成形することはできますが、金属は有機高分子材料に当たりません。",
      "オ": "金属は金属原子を主体とする材料です。熱や力で成形できる材料には有機高分子もありますが、金属とは組成や結合が異なります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q42",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "金属の融解と凝固"
    ],
    "difficulty": 2,
    "question": "金属の状態変化に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「金属を加熱すると、原子の動きが活発になり、特定の温度で原子の配列が崩れ、固体から液体（融液）に変化する。この現象を［㋐］といい、このときの温度を［㋐］点という。溶けた金属を徐々に冷却させ、ある温度に達すると、結晶の核が各所にでき、その核が成長して全てが固体となる。融液から固体に変わるときの温度を［㋑］点という。一般に、冷却速度が［㋒］と結晶粒は小さく、［㋓］と結晶粒は大きくなる。」",
    "choices": {
      "ア": "融解／凝固／遅い／速い",
      "イ": "融解／凝固／速い／遅い",
      "ウ": "融解／共晶／遅い／速い",
      "エ": "変態／凝固／遅い／速い",
      "オ": "変態／共晶／速い／遅い"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "固体が液体になるのは融解、融液から固体が生じるのは凝固です。一般に速い冷却では核が多く成長時間が短いため粒が細かくなり、遅い冷却では粒が大きくなります。",
    "choiceExplanations": {
      "ア": "固体から液体を融解、液体から固体を凝固と呼ぶ点は合っています。一般には速く冷やすと細かい結晶粒になります。",
      "イ": "固体が液体になるのは融解、融液から固体が生じるのは凝固です。一般に速い冷却では核が多く成長時間が短いため粒が細かくなり、遅い冷却では粒が大きくなります。",
      "ウ": "共晶は液相から複数の固相が同時に生じる特定の条件を指します。一般の液体から固体への変化は凝固です。",
      "エ": "液化を述べる㋐は融解です。遅い冷却では結晶が成長する時間が長くなるので、一般には粗い粒になります。",
      "オ": "冷却速度と粒径の対応は合っています。状態変化とその温度を指す用語は融解と凝固です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q43",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "鋼の焼入れと焼戻し"
    ],
    "difficulty": 2,
    "question": "鋼の熱処理に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「鋼を適当な温度に加熱してオーステナイトにしたのち、急冷させてマルテンサイト変態を起こさせ、鋼を硬くする熱処理のことを［㋐］という。また、［㋐］により得られた組織を適当な温度に加熱し、適切な速度で冷却して安定した組織にする熱処理のことを［㋑］という。」",
    "choices": {
      "ア": "焼なまし／焼戻し",
      "イ": "焼なまし／焼ならし",
      "ウ": "焼入れ／焼戻し",
      "エ": "焼ならし／焼なまし",
      "オ": "焼ならし／焼戻し"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "オーステナイトを急冷して硬いマルテンサイトを得るのが焼入れです。これを適切な温度に再加熱する焼戻しで組織を安定させ、必要な靱性を得ます。",
    "choiceExplanations": {
      "ア": "㋑の焼戻しは正しいです。焼なましは一般に緩やかに冷やす処理であり、急冷で硬くする㋐は焼入れです。",
      "イ": "焼なましは軟化や残留応力の低減などを目的とします。加熱後に急冷し、その組織を再加熱する組合せは焼入れと焼戻しです。",
      "ウ": "オーステナイトを急冷して硬いマルテンサイトを得るのが焼入れです。これを適切な温度に再加熱する焼戻しで組織を安定させ、必要な靱性を得ます。",
      "エ": "焼ならしでは通常、加熱後に空冷して組織を整えます。マルテンサイトを作るための急冷は焼入れで、その後の処理は焼戻しです。",
      "オ": "再加熱して組織を安定させる㋑は焼戻しです。その前の急冷による硬化は焼ならしではなく焼入れです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q44",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "ガラス・樹脂・セラミックス"
    ],
    "difficulty": 2,
    "question": "セラミックスに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ セラミックスの一種であるガラスの主原料は窒化ケイ素であり、窓ガラスに使われるソーダ石灰ガラスは、窒化ケイ素に酸化鉛を配合し、溶解してつくられる。\n㋑ セラミックスの一種であるメラミン樹脂は、ベークライトとも呼ばれ、電気絶縁性にすぐれている。\n㋒ 窒化ケイ素や炭化ケイ素は、ガスタービンの部品や切削工具などに用いられるセラミックスである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "窒化ケイ素と炭化ケイ素は耐熱性や硬さに優れた非酸化物系のセラミックスです。高温部品や切削工具などに利用されます。",
    "choiceExplanations": {
      "ア": "ソーダ石灰ガラスの主成分は二酸化ケイ素で、ソーダや石灰に由来する成分も含みます。酸化鉛を加えた窒化ケイ素から作るわけではありません。",
      "イ": "㋐のガラスの主原料は二酸化ケイ素です。㋑のメラミン樹脂は有機高分子で、ベークライトはフェノール樹脂の名称です。",
      "ウ": "㋒は妥当ですが、窓ガラスに用いるソーダ石灰ガラスと、窒化ケイ素を主成分とする材料は別の種類です。",
      "エ": "㋒は妥当です。メラミン樹脂の分類とベークライトの名称を同一視する㋑は誤りです。",
      "オ": "窒化ケイ素と炭化ケイ素は耐熱性や硬さに優れた非酸化物系のセラミックスです。高温部品や切削工具などに利用されます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q45",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "旋削の切削速度と主軸回転数"
    ],
    "difficulty": 2,
    "question": "直径80 mmの工作物を切削速度90 m/minで外丸削りするとき、旋盤の主軸の回転速度として最も妥当なのはどれか。ただし、円周率を3とする。",
    "choices": {
      "ア": "296 min⁻¹",
      "イ": "375 min⁻¹",
      "ウ": "417 min⁻¹",
      "エ": "512 min⁻¹",
      "オ": "750 min⁻¹"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "工作物の外周は3×0.080＝0.24 mです。切削点が1分間で90 m進むには90/0.24＝375回転が必要です。",
    "choiceExplanations": {
      "ア": "外周は0.08×3＝0.24 mです。296回転では毎分約71 mしか進まず、指定の90 m/minに達しません。",
      "イ": "工作物の外周は3×0.080＝0.24 mです。切削点が1分間で90 m進むには90/0.24＝375回転が必要です。",
      "ウ": "417 min⁻¹なら外周0.24 mを掛けた速度は約100 m/minとなります。指定値90 m/minには375 min⁻¹です。",
      "エ": "切削速度は1回転当たりの移動距離に1分間の回転数を掛けたものです。512回転では約123 m/minになり、速過ぎます。",
      "オ": "750 min⁻¹は半径40 mmを円周計算の直径として使った場合の値です。円周はπ×80 mmで求めます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q46",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "電気めっきの電極"
    ],
    "difficulty": 2,
    "question": "電気めっきに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「電気めっきは、めっきする金属のイオンを含む溶液中で、［㋐］を被覆される材料、［㋑］をめっきする金属又は不溶性の電極として［㋒］を加え、被覆される材料の表面でめっきする金属を析出させる方法である。」",
    "choices": {
      "ア": "陽極／陰極／熱",
      "イ": "陽極／陰極／光",
      "ウ": "陽極／陰極／電圧",
      "エ": "陰極／陽極／熱",
      "オ": "陰極／陽極／電圧"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "被覆する材料を陰極とし、めっき金属や不溶性の電極を陽極とします。電圧を加えることで陰極で金属イオンが電子を受け取って析出します。",
    "choiceExplanations": {
      "ア": "金属イオンが電子を受け取って析出するので、被覆したい材料を陰極にします。電気めっきでは電圧を加えてこの反応を進めます。",
      "イ": "被覆される材料は、金属イオンが還元する陰極です。光ではなく電極間の電圧を使います。",
      "ウ": "電圧を加える点は合いますが、電極の配置が逆です。金属が析出する側は陰極です。",
      "エ": "陰極と陽極の配置は合っています。ただし電気めっきの電極反応を進めるのは、熱ではなく電圧です。",
      "オ": "被覆する材料を陰極とし、めっき金属や不溶性の電極を陽極とします。電圧を加えることで陰極で金属イオンが電子を受け取って析出します。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q47",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "機械工作",
    "topicTags": [
      "選択B（機械系）",
      "電子ビーム・微細加工・レーザ"
    ],
    "difficulty": 2,
    "question": "特殊加工に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 電子ビームを照射すると、工作物は瞬間的に加熱され、照射を停止すると自己冷却が起こり、狭い領域で薄い硬化層が得られる。これを表面硬化という。\n㋑ 集積回路をつくる微細加工には、写真技術を応用したエッチングと、腐食を利用したリソグラフィーの技術が使われている。\n㋒ レーザ加工の発振形式には、出力が時間的に一定な連続発振と、発振・停止を繰り返すパルス発振がある。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "電子ビームを局所に照射して急速に加熱し、内部への熱伝導で冷却すると表面の薄い層を硬化させられます。レーザには連続発振と短時間の発振を繰り返すパルス発振があります。",
    "choiceExplanations": {
      "ア": "電子ビームによる局所加熱・自己冷却は表面硬化に使えます。レーザを連続発振とパルス発振に分ける㋒も妥当です。",
      "イ": "㋐は妥当です。写真技術でパターンを形成するリソグラフィーと、不要部を除去するエッチングの説明が㋑では逆です。",
      "ウ": "電子ビームを局所に照射して急速に加熱し、内部への熱伝導で冷却すると表面の薄い層を硬化させられます。レーザには連続発振と短時間の発振を繰り返すパルス発振があります。",
      "エ": "㋒は妥当ですが、パターンを露光などで作るのがリソグラフィーで、それを用いて対象材料を除去するのがエッチングです。",
      "オ": "㋒に加えて㋐も妥当です。電子ビームで加熱を局所に限定すると、照射停止後に周囲へ熱が逃げて急冷されます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q48",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "穴を開けた円板の重心"
    ],
    "difficulty": 2,
    "question": "図のように、xy平面において、直径200の一様な円板から、直径40の円板を切り抜いたとき、残りの部分の重心のx座標の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "−5/3",
      "イ": "−5/6",
      "ウ": "0",
      "エ": "5/6",
      "オ": "5/3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "元の円の面積は10,000πで重心座標は0です。切り抜く円は面積400π、中心座標20なので、残りは(0−400π×20)/(10,000π−400π)＝−5/6です。",
    "choiceExplanations": {
      "ア": "切り抜く円の中心はx＝40ではなく、図の直径40の半分のx＝20です。面積一次モーメントの計算ではその中心座標を使います。",
      "イ": "元の円の面積は10,000πで重心座標は0です。切り抜く円は面積400π、中心座標20なので、残りは(0−400π×20)/(10,000π−400π)＝−5/6です。",
      "ウ": "元は原点に重心がありますが、正のx側だけの面積を切り取ると対称性が失われます。重心はxの負の側にずれます。",
      "エ": "絶対値は合っていますが、右側の質量を切り離した後の重心は左へ移るので符号は負です。",
      "オ": "切り取る円の中心はx＝20で、切取りによる重心の移動は負方向です。直径40を中心の位置に用いると二倍の大きさになります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q48.webp"
    ],
    "imageAltTexts": [
      "直径200の円板とx正方向に中心がずれた直径40の穴を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q49",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "等速円運動の遠心力"
    ],
    "difficulty": 2,
    "question": "半径100 mの円形で水平な道路を時速36.0 kmで走っている質量900 kgの自動車に作用する遠心力の大きさとして最も妥当なのはどれか。ただし、自動車の速さは一定であるものとする。",
    "choices": {
      "ア": "90 N",
      "イ": "320 N",
      "ウ": "450 N",
      "エ": "900 N",
      "オ": "1,200 N"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "速さ36.0 km/hは10 m/sです。回転する車から見た遠心力の大きさは向心力と同じmv²/r＝900×10²/100＝900 Nです。",
    "choiceExplanations": {
      "ア": "速度は10 m/sで、円運動の加速度の大きさは10²/100＝1 m/s²です。質量900 kgを掛けるので90 Nではありません。",
      "イ": "遠心力の大きさを出すには走行速度の二乗を半径で割ります。時速36.0 kmを10 m/sに換算すると900 Nです。",
      "ウ": "遠心力の式mv²/rに1/2は付きません。質量900 kg、速さ10 m/s、半径100 mで900 Nになります。",
      "エ": "速さ36.0 km/hは10 m/sです。回転する車から見た遠心力の大きさは向心力と同じmv²/r＝900×10²/100＝900 Nです。",
      "オ": "半径100 mと換算後の速度10 m/sで得る加速度は1 m/s²です。1,200 Nを生じる加速度はこの値より大きくなります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q50",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "下降するエレベータの垂直抗力"
    ],
    "difficulty": 2,
    "question": "鉛直下向きに加速度3 m/s²で下降しているエレベータに乗っている質量70 kgの人がエレベータの床を押す力の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "490 N",
      "イ": "630 N",
      "ウ": "700 N",
      "エ": "840 N",
      "オ": "910 N"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "人に働く力は重力700 Nと上向きの垂直抗力です。下向きの合力が70×3＝210 Nなので抗力は490 Nで、人が床を押す力も同じ大きさです。",
    "choiceExplanations": {
      "ア": "人に働く力は重力700 Nと上向きの垂直抗力です。下向きの合力が70×3＝210 Nなので抗力は490 Nで、人が床を押す力も同じ大きさです。",
      "イ": "630 Nなら重力との差は70 Nで、下向き加速度は1 m/s²となります。指定された3 m/s²には不足します。",
      "ウ": "700 Nは重力の大きさです。床から同じ大きさを受けると合力が0となり、下向きに加速しません。",
      "エ": "840 Nの抗力は重力700 Nを上回るので、加速度が上向きになります。設問では下向きに加速しています。",
      "オ": "910 Nは重力700 Nに210 Nを加えた値です。下向きに加速する場合、抗力は重力から210 Nを引きます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q51",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "機械の仕事効率"
    ],
    "difficulty": 2,
    "question": "ある機械が実際にする有効仕事が30 kJ、外部から与えられた仕事が120 kJであるとき、この機械の効率として最も妥当なのはどれか。",
    "choices": {
      "ア": "25％",
      "イ": "40％",
      "ウ": "50％",
      "エ": "75％",
      "オ": "90％"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "機械の効率は、有効な出力仕事を与えた仕事で割った比です。30/120＝0.25なので、百分率では25％です。",
    "choiceExplanations": {
      "ア": "機械の効率は、有効な出力仕事を与えた仕事で割った比です。30/120＝0.25なので、百分率では25％です。",
      "イ": "40％なら入力120 kJに対して48 kJが有効に使われます。設問の有効仕事は30 kJです。",
      "ウ": "50％は投入した仕事の半分、すなわち60 kJが有効に使われた場合です。設問ではそれより少なくなります。",
      "エ": "75％は120 kJのうち有効にならなかった90 kJの割合です。有効に使われた割合は残る25％です。",
      "オ": "90は有効仕事を差し引いた損失の大きさをkJで表した値です。効率は30 kJを120 kJで割って求めます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q52",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "選択B（機械系）",
      "ヤング率と軸方向の伸び"
    ],
    "difficulty": 2,
    "question": "図のように、長さ10 m、断面積1.0 m²、ヤング率（縦弾性係数）4.0×10¹⁰ Paの一様な中実丸棒に、軸方向に一様な引張荷重1.6×10⁶ Nを負荷したとき、棒の伸びとして最も妥当なのはどれか。ただし、荷重は断面に一様にかかるものとし、断面積の変化は無視するものとする。",
    "choices": {
      "ア": "0.25 mm",
      "イ": "0.40 mm",
      "ウ": "0.80 mm",
      "エ": "2.5 mm",
      "オ": "4.0 mm"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "棒の引張応力は荷重を断面積で割った1.6×10⁶ Paです。これをヤング率で割ったひずみ4.0×10⁻⁵に10 mを掛けると4.0×10⁻⁴ m＝0.40 mmです。",
    "choiceExplanations": {
      "ア": "引張応力1.6×10⁶ Paをヤング率4.0×10¹⁰ Paで割ると、ひずみは4.0×10⁻⁵です。長さ10 mを掛けると0.40 mmになります。",
      "イ": "棒の引張応力は荷重を断面積で割った1.6×10⁶ Paです。これをヤング率で割ったひずみ4.0×10⁻⁵に10 mを掛けると4.0×10⁻⁴ m＝0.40 mmです。",
      "ウ": "両端に矢印がありますが、つり合う引張荷重の大きさは1.6×10⁶ Nです。二つの荷重を足して内力を2倍とはしません。",
      "エ": "伸びは荷重と長さに比例し、ヤング率と断面積に反比例します。SI単位で荷重×長さ/(ヤング率×断面積)を計算すると0.0004 mです。",
      "オ": "ひずみ4.0×10⁻⁵に10 mを掛けてから、mで得た値を1,000倍してmmに換算します。正しい換算は0.40 mmです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q52.webp"
    ],
    "imageAltTexts": [
      "一定断面の中実丸棒と両端の引張荷重を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q53",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "選択B（機械系）",
      "疲労とクリープ"
    ],
    "difficulty": 2,
    "question": "材料の破壊に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「材料は、引張りや圧縮などの荷重を繰り返し受け、その繰返し数によって静荷重を受けるときより小さな荷重であっても破壊することがある。これは、材料が［㋐］を起こすためであり、このような現象を［㋐］破壊という。一方、材料に一定の荷重が長時間加わると、時間の経過とともにひずみが増加することがある。このような現象を［㋑］といい、高温で使用される金属材料は、［㋑］によって破壊することがある。」",
    "choices": {
      "ア": "疲労／クリープ",
      "イ": "疲労／衝撃",
      "ウ": "衝撃／疲労",
      "エ": "衝撃／クリープ",
      "オ": "クリープ／疲労"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "小さな荷重でも繰り返し受けるとき裂が発生・進展して疲労破壊する場合があります。一定荷重の下で時間とともにひずみが増す現象はクリープです。",
    "choiceExplanations": {
      "ア": "小さな荷重でも繰り返し受けるとき裂が発生・進展して疲労破壊する場合があります。一定荷重の下で時間とともにひずみが増す現象はクリープです。",
      "イ": "疲労は繰返し荷重によるので㋐は合います。衝撃は短時間の負荷で、長時間の一定荷重による変形はクリープです。",
      "ウ": "㋐は繰返しによる疲労です。㋑では繰返しを前提とせず、一定荷重下で変形が進むクリープを説明しています。",
      "エ": "㋑のクリープは合います。㋐は急激な衝撃ではなく、静的な強度を下回る荷重でも繰返しにより起こる疲労です。",
      "オ": "クリープと疲労の対応が逆です。前者は時間依存の変形、後者は荷重の繰返しによる損傷です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q54",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択B（機械系）",
      "単純支持ばりの支点反力"
    ],
    "difficulty": 2,
    "question": "図のように、単純支持ばりABが30 N、120 Nの集中荷重をそれぞれ受けているとき、端点Bに生じる反力の大きさとして最も妥当なのはどれか。ただし、はりの自重は無視するものとする。",
    "choices": {
      "ア": "60 N",
      "イ": "65 N",
      "ウ": "70 N",
      "エ": "75 N",
      "オ": "80 N"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aまわりのモーメントの釣合いは6R_B＝30×2＋120×3です。右辺は420 N·mなので、支点Bの上向き反力は70 Nです。",
    "choiceExplanations": {
      "ア": "60 Nは120 Nの荷重だけを支点Aまわりに計算したときのB側の分担です。Aから2 mに作用する30 Nによる10 Nも加えます。",
      "イ": "Bの反力は、Aまわりで30×2＋120×3のモーメントを打ち消します。腕の長さは6 mなので65 Nにはなりません。",
      "ウ": "Aまわりのモーメントの釣合いは6R_B＝30×2＋120×3です。右辺は420 N·mなので、支点Bの上向き反力は70 Nです。",
      "エ": "全荷重150 Nを半分ずつ受けるのは荷重の合力が梁の中央に作用する場合です。30 NがA寄りにあるのでBの分担は75 Nより小さくなります。",
      "オ": "80 Nは全荷重150 NからBの70 Nを引いたA側の反力です。設問はB側の値を求めています。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q54.webp"
    ],
    "imageAltTexts": [
      "両端支持の梁と二つの集中荷重の大きさ・位置を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q55",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "機械設計",
    "topicTags": [
      "選択B（機械系）",
      "平歯車のモジュールと軸間距離"
    ],
    "difficulty": 2,
    "question": "モジュールが3 mm、歯数がそれぞれ25と35である二つの平歯車の中心距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "10 mm",
      "イ": "30 mm",
      "ウ": "60 mm",
      "エ": "90 mm",
      "オ": "180 mm"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ピッチ円の直径はモジュールと歯数の積で、それぞれ75 mmと105 mmです。外接するピッチ円の半径を足して(75＋105)/2＝90 mmです。",
    "choiceExplanations": {
      "ア": "10は歯数の差であり、長さではありません。中心距離は二つのピッチ円半径を足して求めます。",
      "イ": "30 mmはモジュールと歯数の差を掛けたピッチ円直径の差です。外接してかみ合うので使うのは半径の和です。",
      "ウ": "60は歯数の和です。これにモジュール3 mmを掛けたピッチ円直径の和を半分にします。",
      "エ": "ピッチ円の直径はモジュールと歯数の積で、それぞれ75 mmと105 mmです。外接するピッチ円の半径を足して(75＋105)/2＝90 mmです。",
      "オ": "180 mmはピッチ円直径の和です。中心距離は半径の和なので、その半分になります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q56",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "選択B（機械系）",
      "質量保存と連続の式"
    ],
    "difficulty": 2,
    "question": "図のように、断面積が滑らかに変化する管路の流れを考える。断面①における流速、密度をそれぞれv₁、ρ₁、断面②における密度をρ₂とし、断面①、②における断面積をそれぞれA₁、A₂とするとき、断面②における流速v₂として最も妥当なのはどれか。ただし、流体は非粘性であり、流体の温度は一定であるものとする。",
    "choices": {
      "ア": "A₁A₂v₁/(ρ₁ρ₂)",
      "イ": "ρ₁ρ₂v₁/(A₁A₂)",
      "ウ": "A₁A₂v₁/(ρ₂A₁)",
      "エ": "ρ₂A₁v₁/(ρ₁A₂)",
      "オ": "ρ₁A₁v₁/(ρ₂A₂)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "管内に質量が蓄積しない定常流では、両断面の質量流量が等しくρ₁A₁v₁＝ρ₂A₂v₂です。v₂について解くとρ₁A₁v₁/(ρ₂A₂)です。",
    "choiceExplanations": {
      "ア": "断面を通る質量流量は密度・断面積・流速の積です。面積や密度はそれぞれの断面で一つずつ用い、両断面の面積を同時に掛けません。",
      "イ": "断面①の質量流量はρ₁A₁v₁です。断面②の流速を求めるにはこれをρ₂A₂で割るので、密度同士を掛けることはありません。",
      "ウ": "面積も密度も適切な比になっておらず、この式は速度の次元を持ちません。断面①での質量流量にはρ₁を用います。",
      "エ": "両断面の質量流量を等しくすると、流速比の密度の因子はρ₁/ρ₂です。式では分子と分母の密度が逆です。",
      "オ": "管内に質量が蓄積しない定常流では、両断面の質量流量が等しくρ₁A₁v₁＝ρ₂A₂v₂です。v₂について解くとρ₁A₁v₁/(ρ₂A₂)です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q56.webp"
    ],
    "imageAltTexts": [
      "断面積と密度が異なる管路の断面①および②を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q57",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "選択B（機械系）",
      "熱機関の仕事と効率"
    ],
    "difficulty": 2,
    "question": "1サイクルごとに、高熱源から15 kJの熱量を得て、低熱源に9 kJを放熱する熱機関があるとき、この機関の1サイクル当たりの仕事と熱効率の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "6 kJ／40％",
      "イ": "6 kJ／60％",
      "ウ": "9 kJ／60％",
      "エ": "24 kJ／38％",
      "オ": "24 kJ／63％"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "サイクル全体で内部エネルギーは元に戻るので、外部にする仕事は15−9＝6 kJです。供給熱15 kJに対する仕事の比は6/15＝40％です。",
    "choiceExplanations": {
      "ア": "サイクル全体で内部エネルギーは元に戻るので、外部にする仕事は15−9＝6 kJです。供給熱15 kJに対する仕事の比は6/15＝40％です。",
      "イ": "仕事6 kJは合っていますが、60％は低熱源に放出した9 kJを受熱15 kJで割った割合です。",
      "ウ": "9 kJは低熱源に放出する熱量です。外部へ取り出せる仕事は受熱15 kJからこの放熱を差し引いた6 kJです。",
      "エ": "24 kJは受熱と放熱の大きさを足した数です。機関から出る熱を差し引かなければ仕事は求まりません。",
      "オ": "熱効率は仕事を高熱源から受け取る熱で割るので、分母は15 kJです。仕事は放熱を引いた6 kJになります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q58",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択B（機械系）",
      "直列抵抗と並列抵抗の電流"
    ],
    "difficulty": 2,
    "question": "図のような2 Ω、4 Ωの抵抗と8 Vの電源から構成される直流回路のうち、2 Ωの抵抗に流れる電流の大きさとして最も妥当なのはどれか。ただし、電源の内部抵抗は無視するものとする。",
    "choices": {
      "ア": "0.8 A",
      "イ": "2 A",
      "ウ": "5 A",
      "エ": "8 A",
      "オ": "10 A"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二つの4 Ωを並列にすると2 Ωで、直列の2 Ωを加えると全抵抗は4 Ωです。2 Ωの抵抗は分岐の前にあるので、全電流8/4＝2 Aが流れます。",
    "choiceExplanations": {
      "ア": "0.8 Aは全ての抵抗を直列として8/(2＋4＋4)を計算した値です。二つの4 Ωは並列なので合成は2 Ωです。",
      "イ": "二つの4 Ωを並列にすると2 Ωで、直列の2 Ωを加えると全抵抗は4 Ωです。2 Ωの抵抗は分岐の前にあるので、全電流8/4＝2 Aが流れます。",
      "ウ": "2 Ωの抵抗に5 Aが流れるには、その抵抗だけに10 Vの電圧降下が必要です。電源電圧は8 Vで、残りの並列部にも電圧がかかります。",
      "エ": "8は電源電圧をVで表した値です。直列・並列を整理した全抵抗4 Ωで割ってから電流の単位Aになります。",
      "オ": "2 Ω、4 Ω、4 Ωを足した10は、全部を直列と仮定したときの抵抗値です。この回路の電流は抵抗配置を反映し、8/4で求めます。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q58.webp"
    ],
    "imageAltTexts": [
      "抵抗2Ωと二つの4Ω抵抗および8 V電源を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q59",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択B（機械系）",
      "平行板間の電界"
    ],
    "difficulty": 2,
    "question": "2枚の平行な金属板の間の距離を0.5 cm、電位差を20 Vとするときの両板間の電界の大きさとして最も妥当なのはどれか。ただし、金属板の大きさに比べて両板間の距離は十分に小さいものとする。",
    "choices": {
      "ア": "10 V/m",
      "イ": "40 V/m",
      "ウ": "100 V/m",
      "エ": "2,000 V/m",
      "オ": "4,000 V/m"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "端の効果を無視すると板間の電界はほぼ一様で、E＝電位差/距離です。0.5 cm＝0.005 mなので、20/0.005＝4,000 V/mです。",
    "choiceExplanations": {
      "ア": "電界は電位差を距離で割るので、20と0.5を掛けることはありません。距離をmに換算した0.005で割ります。",
      "イ": "20/0.5＝40は距離をcmで扱った値で、単位はV/cmです。V/mに換算するには100倍します。",
      "ウ": "0.5 cmの板間隔に対して、100 V/mなら電位差は0.5 Vです。問題の20 Vを得るにはさらに大きい電界が必要です。",
      "エ": "2,000 V/mは板間隔を1 cmとした場合です。距離はその半分の0.5 cmなので電界は2倍になります。",
      "オ": "端の効果を無視すると板間の電界はほぼ一様で、E＝電位差/距離です。0.5 cm＝0.005 mなので、20/0.005＝4,000 V/mです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q60",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "電気",
    "topicTags": [
      "選択B（機械系）",
      "直線電流の磁界"
    ],
    "difficulty": 2,
    "question": "図のような270 Aの電流が流れる細い直線状導体から5 m離れた点Pにおける磁界の大きさとして最も妥当なのはどれか。ただし、円周率を3とし、導体は十分に長いものとする。",
    "choices": {
      "ア": "4 A/m",
      "イ": "6 A/m",
      "ウ": "9 A/m",
      "エ": "18 A/m",
      "オ": "90 A/m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "十分に長い直線導体のまわりでは、半径rの円に沿って磁界の大きさHが一定です。H×2πr＝Iより270/(2×3×5)＝9 A/mです。",
    "choiceExplanations": {
      "ア": "アンペールの法則では半径5 mの円周に沿う磁界の積分が270 Aになります。円周長30 mで割ると4 A/mにはなりません。",
      "イ": "半径5 m、円周率3で円周長は2×3×5＝30 mです。270 Aを30 mで割ると6 A/mより大きくなります。",
      "ウ": "十分に長い直線導体のまわりでは、半径rの円に沿って磁界の大きさHが一定です。H×2πr＝Iより270/(2×3×5)＝9 A/mです。",
      "エ": "18 A/mは分母をπrとした場合に得られます。円周長は2πrなので、この値の半分です。",
      "オ": "電流の値を円周率だけで割っても磁界の強さは求まりません。半径5 mを反映し、分母には2πrを用います。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q60.webp"
    ],
    "imageAltTexts": [
      "直線導体と5 m離れた点Pを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q61",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "片持ち梁の固定端モーメント"
    ],
    "difficulty": 2,
    "question": "図Ⅰのように、長さ10 mである片持ち梁の点A、Bにそれぞれ大きさ5.0 kNの集中荷重が作用するとき、壁側の支点に生じる曲げモーメントの反力の大きさMとして最も妥当なのはどれか。ただし、曲げモーメントの向きは、図Ⅱの向きを正とする。",
    "choices": {
      "ア": "30 kN·m",
      "イ": "50 kN·m",
      "ウ": "60 kN·m",
      "エ": "200 kN·m",
      "オ": "500 kN·m"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "壁側支点から荷重の作用点までの距離は4.0 mと6.0 mです。荷重によるモーメントはいずれも同じ向きなので、大きさの和は5.0×4.0＋5.0×6.0＝50 kN·mです。",
    "choiceExplanations": {
      "ア": "30 kN·mは支点から6 mのBの荷重だけのモーメントです。Aの荷重による5.0×4.0＝20 kN·mも加えます。",
      "イ": "壁側支点から荷重の作用点までの距離は4.0 mと6.0 mです。荷重によるモーメントはいずれも同じ向きなので、大きさの和は5.0×4.0＋5.0×6.0＝50 kN·mです。",
      "ウ": "二つの荷重を両方とも6 mの位置にあるものとして計算すると60 kN·mです。手前のAまでの距離は4 mです。",
      "エ": "固定端のモーメントは荷重の大きさに支点からの水平距離を掛けて足します。支点からの全長10 mを各荷重の位置とすることはできません。",
      "オ": "5.0 kNを4.0 mと6.0 mにそれぞれ掛ければ、固定端で打ち消す曲げの合計は50 kN·mです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q61.webp"
    ],
    "imageAltTexts": [
      "片持ち梁の二つの集中荷重と正とする曲げの向きを示す図Ⅰ・Ⅱ"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q62",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "T形断面の図心"
    ],
    "difficulty": 2,
    "question": "図のようなT形断面の図心から下端までの距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "43 mm",
      "イ": "48 mm",
      "ウ": "52 mm",
      "エ": "54 mm",
      "オ": "59 mm"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "上側は面積50×20＝1,000 mm²で図心が下端から90 mm、下側は面積20×80＝1,600 mm²で図心が40 mmです。加重平均は(90×1,000＋40×1,600)/2,600≒59 mmです。",
    "choiceExplanations": {
      "ア": "縦の部分だけなら図心は下端から40 mmです。上部の幅50 mmの板を含めるとその上側に移り、43 mmより大きくなります。",
      "イ": "下端からの重み付き平均には、板の中心90 mmと縦の部分の中心40 mmを使います。板の面積も大きく、平均は48 mmを超えます。",
      "ウ": "上下の矩形の面積は1,000 mm²と1,600 mm²です。各図心までの距離90 mmと40 mmで一次モーメントを計算すると52 mmにはなりません。",
      "エ": "図心は上下の矩形の一次モーメントの和を面積2,600 mm²で割った値です。上側の矩形の中心が下端から90 mmにあることを反映します。",
      "オ": "上側は面積50×20＝1,000 mm²で図心が下端から90 mm、下側は面積20×80＝1,600 mm²で図心が40 mmです。加重平均は(90×1,000＋40×1,600)/2,600≒59 mmです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q62.webp"
    ],
    "imageAltTexts": [
      "T形断面の幅50 mm、フランジ厚20 mm、ウェブ高さ80 mmを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q63",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "選択C（土木系）",
      "軸方向荷重によるひずみ"
    ],
    "difficulty": 2,
    "question": "図のように、断面積200 mm²、弾性係数2.5×10⁵ N/mm²、長さ2.0 mの棒材に50 kNの軸方向引張力を加えたとき、この棒材のひずみの大きさとして最も妥当なのはどれか。ただし、棒材は一様であり、作用する軸方向引張応力は、比例限度を超えないものとする。",
    "choices": {
      "ア": "1.0×10⁻⁵",
      "イ": "4.0×10⁻⁵",
      "ウ": "1.0×10⁻⁴",
      "エ": "4.0×10⁻⁴",
      "オ": "1.0×10⁻³"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "引張応力は50,000/200＝250 N/mm²です。比例範囲では応力を弾性係数で割って、ひずみ250/(2.5×10⁵)＝1.0×10⁻³を得ます。",
    "choiceExplanations": {
      "ア": "50 kNは50,000 Nです。断面積200 mm²で割ると250 N/mm²になり、弾性係数で割ったひずみは10⁻³です。",
      "イ": "弾性係数で割る前に、力を断面積で割って応力を求めます。指定の力と断面積に対応する応力は250 N/mm²です。",
      "ウ": "このひずみでは弾性係数から逆算した応力が25 N/mm²となります。指定の50 kNに対する応力はその十倍です。",
      "エ": "ひずみを4.0×10⁻⁴とすると応力は100 N/mm²です。50,000 Nを200 mm²で割った250 N/mm²には達しません。",
      "オ": "引張応力は50,000/200＝250 N/mm²です。比例範囲では応力を弾性係数で割って、ひずみ250/(2.5×10⁵)＝1.0×10⁻³を得ます。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q63.webp"
    ],
    "imageAltTexts": [
      "断面積200 mm²の棒に両側から50 kNの引張力を加える原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q64",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "選択C（土木系）",
      "水中の側面に働く全水圧"
    ],
    "difficulty": 2,
    "question": "図のように、水深3.0 mの海底に1辺の長さ1.0 mの立方体状のコンクリートブロックを水平に沈めたとき、コンクリートブロックの1側面に作用する全水圧の大きさとして最も妥当なのはどれか。ただし、水の密度を1000 kg/m³、重力加速度の大きさを10 m/s²とし、コンクリートブロックを沈める前後での水深の変化はないものとする。",
    "choices": {
      "ア": "10 kN",
      "イ": "15 kN",
      "ウ": "20 kN",
      "エ": "25 kN",
      "オ": "30 kN"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "側面の図心は水深2.5 mにあり、平均圧力はρgh＝1,000×10×2.5＝25,000 Paです。面積は1 m²なので全水圧は25 kNです。",
    "choiceExplanations": {
      "ア": "1.0 mはブロックの辺の長さで、側面の平均水深ではありません。側面の中心は水面から2.5 mにあります。",
      "イ": "側面の上端は水面から2.0 m、下端は3.0 mです。15 kNに相当する1.5 mは、どちらよりも浅い位置です。",
      "ウ": "20 kPaは上端の圧力です。側面では深さとともに圧力が増すので、上端の値を面全体に用いると過小になります。",
      "エ": "側面の図心は水深2.5 mにあり、平均圧力はρgh＝1,000×10×2.5＝25,000 Paです。面積は1 m²なので全水圧は25 kNです。",
      "オ": "30 kPaはブロックの下端の圧力です。圧力は上端では小さく、側面全体では中心の25 kPaを使います。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q64.webp"
    ],
    "imageAltTexts": [
      "水深3.0 mの底に置いた立方体ブロックに水圧が作用する原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q65",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "選択C（土木系）",
      "トリチェリの定理"
    ],
    "difficulty": 2,
    "question": "図のように、水深Hまで水の入った水槽の水深(2/3)Hの位置の側面に穴を開けた。このとき、穴から噴出した水の流速として最も妥当なのはどれか。ただし、水槽の水深は常に一定とし、エネルギー損失は無視し、流速係数は1と考えてよい。また、重力加速度の大きさをgとする。",
    "choices": {
      "ア": "√(gH/3)",
      "イ": "√(2gH/3)",
      "ウ": "√(gH)",
      "エ": "√(4gH/3)",
      "オ": "√(2gH)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "本文の「水深」に対し、図の2H/3は底から穴までの高さです。水面から穴までの落差はH/3なので、v＝√(2g×H/3)＝√(2gH/3)です。",
    "choiceExplanations": {
      "ア": "図が示す水面から開口までの落差はH/3です。ベルヌーイの式で落差gH/3をv²/2と等しくするので、平方根の中は2gH/3です。",
      "イ": "本文の「水深」に対し、図の2H/3は底から穴までの高さです。水面から穴までの落差はH/3なので、v＝√(2g×H/3)＝√(2gH/3)です。",
      "ウ": "√(gH)は水面から穴までの落差がH/2の場合です。図では穴は底から2H/3の高さにあるため落差はH/3です。",
      "エ": "√(4gH/3)は2H/3を水面からの深さと読んだ場合の値です。公式正答は図のように2H/3を底からの高さとして求めています。",
      "オ": "√(2gH)は穴が水槽の底の高さにある場合です。実際の穴は底から2H/3の高さにあるため、落差はHより小さくなります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q65.webp"
    ],
    "imageAltTexts": [
      "水槽の全水深Hと底から開口までの高さ2H/3を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q66",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "選択C（土木系）",
      "マニング式と開水路の流量"
    ],
    "difficulty": 2,
    "question": "図のように、動水勾配1/10000、幅80 mの長方形断面の水路を、水が深さ10 mで流れている。この水路のマニングの粗度係数が0.02であるとき、この水路の流量として最も妥当なのはどれか。ただし、水深は一定であるものとする。",
    "choices": {
      "ア": "400 m³/s",
      "イ": "800 m³/s",
      "ウ": "1,200 m³/s",
      "エ": "1,600 m³/s",
      "オ": "2,000 m³/s"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "径深は800/(80＋2×10)＝8 mです。流速は(1/0.02)×8^(2/3)×(1/10000)^(1/2)＝2 m/sで、断面積を掛けると1,600 m³/sです。",
    "choiceExplanations": {
      "ア": "水路の断面積は800 m²で、1/nと勾配の平方根の積は0.5となります。流速にはさらに径深8 mの2/3乗である4を掛けます。",
      "イ": "800は水路の流水断面積の数値です。流量は面積に平均流速2 m/sを掛けたものになります。",
      "ウ": "径深は断面積800 m²を底と両側壁の潤辺100 mで割った8 mです。マニング式ではこの2/3乗を使うので、流量は1,200 m³/sにはなりません。",
      "エ": "径深は800/(80＋2×10)＝8 mです。流速は(1/0.02)×8^(2/3)×(1/10000)^(1/2)＝2 m/sで、断面積を掛けると1,600 m³/sです。",
      "オ": "径深は水深の10 mそのものではありません。両側壁も含む潤辺100 mから求めた8 mを使うと、流量は2,000 m³/sより小さくなります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q66.webp"
    ],
    "imageAltTexts": [
      "水深10 m・幅80 m・動水勾配1/10000の長方形水路の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q67",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "土の含水比"
    ],
    "difficulty": 2,
    "question": "体積90 cm³、質量150 gの土試料を乾燥状態にしたところ、質量が125 gとなった。この土試料の含水比として最も妥当なのはどれか。",
    "choices": {
      "ア": "20％",
      "イ": "30％",
      "ウ": "40％",
      "エ": "50％",
      "オ": "60％"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "乾燥による質量の減少150−125＝25 gが水の質量です。含水比は水の質量を乾燥した土粒子の質量で割るので25/125＝20％です。",
    "choiceExplanations": {
      "ア": "乾燥による質量の減少150−125＝25 gが水の質量です。含水比は水の質量を乾燥した土粒子の質量で割るので25/125＝20％です。",
      "イ": "試料の体積90 cm³は含水比の分母ではありません。水25 gを乾燥した土試料125 gで割ります。",
      "ウ": "含水比が40％なら乾燥質量125 gに対して水50 gが必要です。乾燥時の減少は25 gしかありません。",
      "エ": "50％は水の質量が土粒子の質量の半分である場合です。ここでは25 gは125 gの5分の1です。",
      "オ": "水は25 g、乾燥した土は125 gです。湿った土の質量や体積ではなく乾燥質量を分母に用いるので60％にはなりません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q68",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "一面せん断試験と粘着力"
    ],
    "difficulty": 2,
    "question": "ある土試料について、一面せん断試験を行ったところ、表の結果を得た。この土試料の粘着力として最も妥当なのはどれか。",
    "choices": {
      "ア": "5 kN/m²",
      "イ": "10 kN/m²",
      "ウ": "15 kN/m²",
      "エ": "20 kN/m²",
      "オ": "25 kN/m²"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "モール・クーロンの式の傾きは(125−70)/(200−100)＝0.55です。垂直応力ゼロでの切片が粘着力で、70−100×0.55＝15 kN/m²です。",
    "choiceExplanations": {
      "ア": "せん断強さは垂直応力が100 kN/m²増えるごとに55 kN/m²増加しています。最初の70から55を引いた垂直応力ゼロでの値は15 kN/m²です。",
      "イ": "粘着力が10 kN/m²で傾き0.55なら垂直応力100 kN/m²でのせん断強さは65 kN/m²です。表に示された70 kN/m²とは合いません。",
      "ウ": "モール・クーロンの式の傾きは(125−70)/(200−100)＝0.55です。垂直応力ゼロでの切片が粘着力で、70−100×0.55＝15 kN/m²です。",
      "エ": "20 kN/m²を切片として傾き0.55で計算すると、最初のせん断強さが75 kN/m²になります。表では70 kN/m²です。",
      "オ": "粘着力は表にあるせん断強さをそのまま読む値ではなく、垂直応力を0まで延長した切片です。300 kN/m²の行からも180−0.55×300＝15になります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q68.webp"
    ],
    "imageAltTexts": [
      "垂直応力100・200・300 kN/m²に対するせん断強さを示す原表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q69",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "地盤の鉛直全応力"
    ],
    "difficulty": 2,
    "question": "図のような土の単位体積重量γ₁ = 17.5 kN/m³、高さ2 mである層1、土の単位体積重量γ₂ = 18.0 kN/m³、高さ3 mである層2、土の単位体積重量γ₃ = 18.5 kN/m³、高さ4 mである層3の三層から成る地盤において、地表面から深さ7 mの位置における全応力の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "122.5 kN/m²",
      "イ": "126.0 kN/m²",
      "ウ": "129.5 kN/m²",
      "エ": "1,260 kN/m²",
      "オ": "1,295 kN/m²"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "深さ7 mまでに層1が2 m、層2が3 m、層3が2 mあります。合計は17.5×2＋18.0×3＋18.5×2＝126.0 kN/m²です。",
    "choiceExplanations": {
      "ア": "122.5 kN/m²は最上層の17.5 kN/m³を深さ7 m全てに適用した値です。各層の単位体積重量を別々に掛けます。",
      "イ": "深さ7 mまでに層1が2 m、層2が3 m、層3が2 mあります。合計は17.5×2＋18.0×3＋18.5×2＝126.0 kN/m²です。",
      "ウ": "129.5 kN/m²は最下層の18.5 kN/m³を7 m全てに適用した値です。上の二層の単位体積重量はこれより小さくなります。",
      "エ": "単位体積重量には既に重力が反映されています。kN/m³にmを掛ければ応力のkN/m²となるので、gをもう一度掛けません。",
      "オ": "重力加速度を再度掛ける必要はありません。上載する層ごとに、単位体積重量と深さ7 mまでの厚さの積を足します。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q69.webp"
    ],
    "imageAltTexts": [
      "三層の地盤の厚さと単位体積重量および深さ7 mの位置を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q70",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "閉合トラバースの方位角"
    ],
    "difficulty": 2,
    "question": "図のような、地点A～Eに対して、閉合トラバース測量を行った。図のように、測線ABの方位角と各地点の内角がそれぞれ分かっているとき、測線CDの方位角として最も妥当なのはどれか。",
    "choices": {
      "ア": "20°18′30″",
      "イ": "29°22′00″",
      "ウ": "38°03′30″",
      "エ": "42°36′00″",
      "オ": "46°55′30″"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Bの外角は180°−88°55′00″＝91°05′00″、Cの外角は180°−116°28′00″＝63°32′00″です。ABの方位角192°40′30″から両方を引くと38°03′30″です。",
    "choiceExplanations": {
      "ア": "BとCで進行方向が曲がる角度は、それぞれ180°からその地点の内角を引いた値です。図では二つの外角をABの方位角から差し引きます。",
      "イ": "ABの方位角192°40′30″からBの外角91°05′00″を引くとBCは101°35′30″です。ここからCの外角63°32′00″を引きます。",
      "ウ": "Bの外角は180°−88°55′00″＝91°05′00″、Cの外角は180°−116°28′00″＝63°32′00″です。ABの方位角192°40′30″から両方を引くと38°03′30″です。",
      "エ": "Cの内角116°28′00″をそのまま方位角の差とせず、補角63°32′00″を使います。BCの101°35′30″から引いた結果は38°03′30″です。",
      "オ": "CDを求めるまでに進行方向が変わる点はBとCです。AやDの内角を途中の偏角に混ぜず、BとCの外角だけを使います。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q70.webp"
    ],
    "imageAltTexts": [
      "閉合トラバースの方位角と五つの内角を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q71",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "等高線の間隔と比例"
    ],
    "difficulty": 2,
    "question": "点Aの標高が42 m、点Bの標高が56 m、ある地図におけるAB間の図上距離が10 cmであるとき、Aと標高45 mの等高線との図上距離a、Bと標高55 mの等高線との図上距離bの組合せとして最も妥当なのはどれか。ただし、AとBの斜面の傾斜は一定であるものとし、図の点線は等高線を表す。",
    "choices": {
      "ア": "0.63 cm／0.21 cm",
      "イ": "1.34 cm／0.45 cm",
      "ウ": "2.14 cm／0.71 cm",
      "エ": "2.72 cm／0.91 cm",
      "オ": "3.14 cm／0.71 cm"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "斜面の傾斜が一定なら図上距離は標高差に比例します。全体の高低差14 mに対して、a＝10×3/14≒2.14 cm、b＝10×1/14≒0.71 cmです。",
    "choiceExplanations": {
      "ア": "各点から最も近い等高線までの標高差は3 mと1 mです。全体の標高差14 mに対する比を図上の10 cmに掛けるので、この二つの値は小さ過ぎます。",
      "イ": "距離の比がおよそ3対1という点は合っています。ただし1 mの標高差に当たる図上距離は10/14 cmなので、bは約0.71 cmです。",
      "ウ": "斜面の傾斜が一定なら図上距離は標高差に比例します。全体の高低差14 mに対して、a＝10×3/14≒2.14 cm、b＝10×1/14≒0.71 cmです。",
      "エ": "ABの標高差は56−42＝14 mです。1 m分が約0.71 cmになるため、bは0.91 cmになりません。",
      "オ": "bは合っています。aに対応する標高差は45−42＝3 mなので、aはbの3倍となる約2.14 cmです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q71.webp"
    ],
    "imageAltTexts": [
      "標高42 mの点Aと56 mの点Bおよび途中の等高線の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q72",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "GNSSと電子基準点"
    ],
    "difficulty": 2,
    "question": "GNSS及びGNSS測量をはじめとした衛星測位に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ GNSSは、位置を知るために打ち上げられた人工衛星から発信される電波を受信し、その受信している地点の位置情報などを知ることができるシステムの総称である。\n㋑ 電子基準点とは、衛星測位を連続して行う基準点で、現在では各種測量や地殻変動の連続監視に利用されている。\n㋒ マルチパスとは、GNSS衛星から発射される電波が受信機周辺の地物の材質により反射せず、透過することによって発生する誤差である。\n㋓ GNSS測量の相対測位方式は、スタティック法とキネマティック法に分類され、移動局を用いるのはスタティック法である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "GNSSは測位衛星の信号を受けて位置などを求めるシステムの総称です。電子基準点の連続観測は基準点測量や地殻変動の監視に用いられます。",
    "choiceExplanations": {
      "ア": "GNSSは測位衛星の信号を受けて位置などを求めるシステムの総称です。電子基準点の連続観測は基準点測量や地殻変動の監視に用いられます。",
      "イ": "㋐は合いますが、マルチパスとは直接波に周囲で反射した別経路の電波などが加わって、測位に誤差が出る現象です。",
      "ウ": "電子基準点の㋑は合います。マルチパスを反射せずに透過することに限定する㋒は誤りで、反射した信号などが直接波と重なる現象です。",
      "エ": "㋑は妥当です。㋓は観測中に受信機を固定するスタティック法と、移動局を使うキネマティック法を取り違えています。",
      "オ": "㋒はマルチパスが反射などによる複数の経路に生じる点を誤っています。㋓も移動局を使う方式の名称が誤りです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q73",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "鉄筋コンクリート梁の応力分布"
    ],
    "difficulty": 2,
    "question": "図のように、幅がb［mm］、有効高さがd［mm］の単鉄筋長方形梁の断面に曲げモーメントM［N·mm］が作用するとき、コンクリートには圧縮力C［N］、鉄筋には引張力T［N］が作用する。コンクリートの圧縮応力をσc［N/mm²］、鉄筋の引張応力をσs［N/mm²］、図に示す断面の鉄筋の断面積の合計をAs［mm²］、梁の上面からの中立軸位置をx［mm］とするとき、圧縮力C［N］、引張力T［N］の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "σc·b·x/2／σs·b·(d−x)/2",
      "イ": "σc·b·x/2／σs·As",
      "ウ": "σc·b·x／σs·b·(d−x)/2",
      "エ": "σc·b·x／σs·As",
      "オ": "σc·b·d／σs·As"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "上縁の圧縮応力σcから中立軸の0まで直線的に変化するため、コンクリートの平均応力はσc/2です。圧縮域の面積bxを掛けたCと、鉄筋断面積を掛けたT＝σsAsの組合せになります。",
    "choiceExplanations": {
      "ア": "コンクリートの三角形の応力分布から求めたCは合っています。Tは引張側コンクリートの面積ではなく、鉄筋の断面積Asを使います。",
      "イ": "上縁の圧縮応力σcから中立軸の0まで直線的に変化するため、コンクリートの平均応力はσc/2です。圧縮域の面積bxを掛けたCと、鉄筋断面積を掛けたT＝σsAsの組合せになります。",
      "ウ": "コンクリートの応力は圧縮域全体でσcではなく三角形状です。引張力にも鉄筋の断面積を使うため、両式とも修正が必要です。",
      "エ": "Tは鉄筋の引張応力と断面積の積で合っています。コンクリートのCは三角形の応力分布のため、σc·b·xの半分です。",
      "オ": "Tは合いますが、コンクリート圧縮域の高さはdではなく中立軸までのxです。さらに平均圧縮応力は最大値σcの半分です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q73.webp"
    ],
    "imageAltTexts": [
      "単鉄筋梁の断面・中立軸とコンクリートおよび鉄筋の応力分布を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q74",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "建設材料",
    "topicTags": [
      "選択C（土木系）",
      "プレストレスの導入と損失"
    ],
    "difficulty": 2,
    "question": "プレストレスコンクリートに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「コンクリートへのプレストレスの与え方には、PC鋼材の緊張時期に応じて、［㋐］方式と［㋑］方式がある。［㋐］方式はコンクリートを打設する前にPC鋼材を緊張する方式であり、［㋑］方式はコンクリートを打設し硬化した後にPC鋼材を緊張する方式である。一定荷重を長時間作用させたときに時間の経過とともにコンクリートのひずみが増加する［㋒］現象などにより、コンクリートに与えられたプレストレスは減少する。」",
    "choices": {
      "ア": "プレテンション／ポストテンション／クリープ",
      "イ": "プレテンション／ポストテンション／ブリーディング",
      "ウ": "プレテンション／ポストテンション／リラクセーション",
      "エ": "ポストテンション／プレテンション／クリープ",
      "オ": "ポストテンション／プレテンション／リラクセーション"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "打設前にPC鋼材を緊張するのがプレテンション、硬化後に緊張するのがポストテンションです。継続荷重でコンクリートのひずみが増すのはクリープです。",
    "choiceExplanations": {
      "ア": "打設前にPC鋼材を緊張するのがプレテンション、硬化後に緊張するのがポストテンションです。継続荷重でコンクリートのひずみが増すのはクリープです。",
      "イ": "鋼材を緊張する時期の対応は合っています。ブリーディングは未硬化のコンクリートで練混ぜ水が上昇する現象です。",
      "ウ": "緊張の方式名は合っています。リラクセーションはひずみをほぼ一定に保ったときの応力低下で、持続荷重下でひずみが増す現象はクリープです。",
      "エ": "㋒はクリープで正しいですが、打設前に鋼材を緊張するのはプレテンションで、硬化後の方式がポストテンションです。",
      "オ": "前・後の方式が逆です。一定の荷重を長くかけるとコンクリートのひずみが増す性質はクリープと呼びます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q75",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "標準貫入試験とN値"
    ],
    "difficulty": 2,
    "question": "標準貫入試験に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「一般に、標準貫入試験は、［㋐］と併用して実施され、地盤の深い箇所の相対的な強さや乱した状態の土試料が同時に得られることから、広く用いられる調査である。標準貫入試験で求まる［㋑］とは、63.5 kg±0.5 kgのハンマーを高さ76 cm±1 cmから落下させ、サンプラーを［㋒］cm貫入させるのに要する打撃回数である。」",
    "choices": {
      "ア": "圧密試験／K値／30",
      "イ": "圧密試験／N値／100",
      "ウ": "圧密試験／N値／30",
      "エ": "ボーリング／K値／100",
      "オ": "ボーリング／N値／30"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ボーリング孔の所定深度でサンプラーを打ち込みます。規定重量のハンマーを規定高さから落とし、予備打ち後の30 cmの貫入に必要な打撃回数がN値です。",
    "choiceExplanations": {
      "ア": "貫入距離30 cmは合います。ボーリング孔で試験を行い、規定の距離を貫入させる打撃数をN値とします。",
      "イ": "打撃回数を表すのはN値ですが、本打ちで貫入させる距離は30 cmです。圧密試験を併用することが定義ではありません。",
      "ウ": "N値と30 cmは合っています。地盤深部にサンプラーを入れる調査ではボーリング孔を用います。",
      "エ": "ボーリングは合っていますが、標準貫入試験の指標はK値ではなくN値です。規定の貫入距離は30 cmです。",
      "オ": "ボーリング孔の所定深度でサンプラーを打ち込みます。規定重量のハンマーを規定高さから落とし、予備打ち後の30 cmの貫入に必要な打撃回数がN値です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q76",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "土木施工",
    "topicTags": [
      "選択C（土木系）",
      "防波堤の形式"
    ],
    "difficulty": 2,
    "question": "防波堤に関する次の表の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "背割堤／傾斜堤／混成堤",
      "イ": "背割堤／混成堤／直立堤",
      "ウ": "直立堤／混成堤／傾斜堤",
      "エ": "直立堤／傾斜堤／混成堤",
      "オ": "直立堤／傾斜堤／背割堤"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "直立した堤体が㋐の直立堤で、石やブロックを傾斜させて積むのが㋑の傾斜堤です。傾斜した基部に直立部を載せた㋒は混成堤です。",
    "choiceExplanations": {
      "ア": "㋑と㋒は合っています。断面の側面が直立した㋐は直立堤です。",
      "イ": "㋐の側面は直立しています。石などを傾斜させて積む㋑が傾斜堤で、捨石マウンドに直立部を載せた㋒は混成堤です。",
      "ウ": "㋐は直立堤で合っています。㋑は傾斜面を持つ構造、㋒は二つの構造を組み合わせる形式なので、後二つが逆です。",
      "エ": "直立した堤体が㋐の直立堤で、石やブロックを傾斜させて積むのが㋑の傾斜堤です。傾斜した基部に直立部を載せた㋒は混成堤です。",
      "オ": "㋐と㋑は合っています。基礎の傾斜部と堤体の直立部から成る㋒の断面は混成堤です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q76.webp"
    ],
    "imageAltTexts": [
      "直立堤・傾斜堤・混成堤の構造と特徴を比較する原表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q77",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "建設材料",
    "topicTags": [
      "選択C（土木系）",
      "モルタルとポルトランドセメント"
    ],
    "difficulty": 2,
    "question": "コンクリートに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ モルタルとは、セメントに水のみを混ぜたものである。\n㋑ 普通ポルトランドセメントと中庸熱ポルトランドセメントでは、中庸熱ポルトランドセメントの方が水和熱が低い。\n㋒ 早強ポルトランドセメントは、強度の発現が早く、コンクリート工事の工期を短縮させたい場合や気温が高い中での工事の際に用いられる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "中庸熱ポルトランドセメントは普通品より水和熱を抑えたセメントです。部材の温度上昇や温度ひび割れを抑えたい場合などに用いられます。",
    "choiceExplanations": {
      "ア": "セメントと水だけを合わせたものはセメントペーストです。モルタルにするには砂などの細骨材も混ぜます。",
      "イ": "㋑は妥当です。㋐はセメントペーストの説明で、モルタルには細骨材が入ります。",
      "ウ": "中庸熱ポルトランドセメントは普通品より水和熱を抑えたセメントです。部材の温度上昇や温度ひび割れを抑えたい場合などに用いられます。",
      "エ": "㋑は妥当です。早強品は工期短縮や低温時の強度確保などに用いられ、気温が高い場合を代表的な用途とする㋒は誤りです。",
      "オ": "早強品は初期強度を速く得られるので、低温期の施工や工期短縮に向きます。高温の中での施工を代表用途とする説明は適切ではありません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q78",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "都市計画",
    "topicTags": [
      "選択C（土木系）",
      "区域区分・用途地域・容積率"
    ],
    "difficulty": 2,
    "question": "都市計画に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 市街化調整区域とは、おおむね10年以内に優先的かつ計画的に市街化を図るべき地域である。\n㋑ 用途地域のうち準住居地域とは、低層住宅に係る良好な住居の環境を保護するために定める地域である。\n㋒ 容積率とは、敷地面積に対する建築物の延べ面積の割合を百分率で表したものであり、用途地域での建築物への規制として用いられる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "容積率は建築物の延べ面積を敷地面積で割り、百分率で示します。敷地面積に対する建築面積を扱う建蔽率とは、分子が異なります。",
    "choiceExplanations": {
      "ア": "おおむね10年以内に優先的に市街化を図るのは市街化区域です。市街化調整区域では市街化を抑制します。",
      "イ": "㋒は妥当です。㋐は市街化を進める市街化区域の説明で、市街化調整区域では市街化を抑制します。",
      "ウ": "準住居地域は道路の沿道にふさわしい施設の利便を増進しつつ、住居環境を保護します。低層住宅の良好な環境に重点を置くのは低層住居専用地域などです。",
      "エ": "㋒は妥当ですが、準住居地域は沿道の施設と住居環境の調和を図る地域です。低層住宅だけを念頭に置く制度ではありません。",
      "オ": "容積率は建築物の延べ面積を敷地面積で割り、百分率で示します。敷地面積に対する建築面積を扱う建蔽率とは、分子が異なります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q79",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "上下水道",
    "topicTags": [
      "選択C（土木系）",
      "活性汚泥法と下水道方式"
    ],
    "difficulty": 2,
    "question": "下水道に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 活性汚泥法は、下水に空気を送り込み、活性汚泥という微生物集団の生物的な働きにより、有機物を分解し、下水を浄化する方法である。\n㋑ 合流式下水道は、大雨時に一部汚水を処理せずに雨水によって薄めて河川へ放流するため、水質汚濁を防止する観点で好ましくない。\n㋒ 分流式下水道では、汚水管を通ってきた汚水を下水処理場にて処理し、雨水管を通ってきた雨水を浄水施設にて処理し、それぞれ河川などに放流する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "活性汚泥法ではばっ気した下水中で微生物が有機物を分解します。合流式では大雨時に雨水と汚水が混じった水が越流し、水質汚濁の原因になることがあります。",
    "choiceExplanations": {
      "ア": "活性汚泥法の㋐は妥当です。大雨時に合流式下水道から未処理の汚水が流出して水質に影響することを述べる㋑も妥当です。",
      "イ": "活性汚泥法ではばっ気した下水中で微生物が有機物を分解します。合流式では大雨時に雨水と汚水が混じった水が越流し、水質汚濁の原因になることがあります。",
      "ウ": "合流式の越流の記述は妥当です。㋐の活性汚泥法も、酸素を供給して微生物に有機物を分解させる方法です。",
      "エ": "㋑は妥当ですが、分流式で雨水管に集めた雨水は、一般に河川などへ放流されます。浄水施設で処理するという㋒は誤りです。",
      "オ": "分流式では汚水と雨水は別の管で集めます。雨水を通常、飲料水などをつくる浄水施設に送ってから放流するわけではありません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q80",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "都市計画",
    "topicTags": [
      "選択C（土木系）",
      "街路網の機能別分類"
    ],
    "difficulty": 2,
    "question": "街路の機能的な分類について、交通量の多いものから順に並べたものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "主要幹線街路 ＞ 幹線街路 ＞ 補助幹線街路 ＞ 区画街路",
      "イ": "主要幹線街路 ＞ 幹線街路 ＞ 区画街路 ＞ 補助幹線街路",
      "ウ": "幹線街路 ＞ 主要幹線街路 ＞ 補助幹線街路 ＞ 区画街路",
      "エ": "幹線街路 ＞ 主要幹線街路 ＞ 区画街路 ＞ 補助幹線街路",
      "オ": "区画街路 ＞ 主要幹線街路 ＞ 幹線街路 ＞ 補助幹線街路"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "都市の主要な交通を担う主要幹線街路が最上位です。幹線街路、地区内の交通を集める補助幹線街路、沿道の宅地などに出入りする区画街路の順です。",
    "choiceExplanations": {
      "ア": "都市の主要な交通を担う主要幹線街路が最上位です。幹線街路、地区内の交通を集める補助幹線街路、沿道の宅地などに出入りする区画街路の順です。",
      "イ": "主要幹線と幹線の順は合っています。地区内の交通を集める補助幹線街路の方が、個々の敷地への出入りが中心の区画街路より上位です。",
      "ウ": "補助幹線街路と区画街路の順は合っています。広域的な大量の交通を処理する主要幹線街路が、通常の幹線街路より上位です。",
      "エ": "都市の骨格となる主要幹線街路を幹線街路より上位に置きます。区画街路は補助幹線街路に交通を集める側で、さらに下位です。",
      "オ": "区画街路は個々の敷地に接続し、通過交通を主に処理する街路ではありません。最上位は主要幹線街路です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q81",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択D（建築系）",
      "中央の集中モーメントによる曲げ"
    ],
    "difficulty": 2,
    "question": "図のようなモーメント荷重を受ける単純梁について、曲げモーメント図を定性的に表したものとして最も妥当なのはどれか。ただし、部材の自重は無視するものとし、曲げモーメントは部材の引張側に描くものとする。",
    "choices": {
      "ア": "図の1",
      "イ": "図の2",
      "ウ": "図の3",
      "エ": "図の4",
      "オ": "図の5"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "集中モーメントと釣り合う反力は左が下向き、右が上向きで、大きさが等しくなります。支点で曲げが0、中央でMだけ跳び、左右で引張側が上と下に分かれます。",
    "choiceExplanations": {
      "ア": "集中モーメントと釣り合う反力は左が下向き、右が上向きで、大きさが等しくなります。支点で曲げが0、中央でMだけ跳び、左右で引張側が上と下に分かれます。",
      "イ": "両端の支点は回転を拘束しないので、曲げモーメントは端で0です。端で最大となるこの図は境界条件に合いません。",
      "ウ": "左右とも引張側が下に描かれた三角形は中央の集中鉛直荷重などに対応します。集中モーメントの位置では符号の違う値へ不連続に変わります。",
      "エ": "曲げモーメント図が曲線になるのはせん断力が位置によって変わる場合です。この梁では中央以外に鉛直荷重がなく、各区間で直線です。",
      "オ": "一定の曲げモーメントはその区間のせん断力が0である場合です。ここでは単純支持の反力が生じるので、モーメントは支点から直線的に変化します。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q81.webp"
    ],
    "imageAltTexts": [
      "単純梁の中央に時計回りのモーメントMが働く原図"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q81-1.webp",
      "イ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q81-2.webp",
      "ウ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q81-3.webp",
      "エ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q81-4.webp",
      "オ": "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q81-5.webp"
    }
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q82",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択D（建築系）",
      "静定トラスの軸力"
    ],
    "difficulty": 2,
    "question": "図のような荷重を受ける静定トラスにおいて、部材A、Bに生ずる軸方向力の組合せとして最も妥当なのはどれか。ただし、軸方向力は、「＋」を引張力、「−」を圧縮力、軸方向力が生じない場合は「0」とし、部材の自重は無視するものとする。",
    "choices": {
      "ア": "−P／−P",
      "イ": "−P／＋P",
      "ウ": "0／−P",
      "エ": "0／＋P",
      "オ": "＋P／0"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "全体のモーメントの釣合いから右下支点の反力は上向きにPです。右下の節点では水平のAは軸力0で、鉛直のBは節点を下向きに押すため−Pになります。",
    "choiceExplanations": {
      "ア": "右下の支点は水平反力を持ちません。その節点で水平方向に効く部材はAだけなので、Aの軸力は0です。",
      "イ": "右下支点の鉛直反力は上向きのPです。部材Bはこれを打ち消す下向きの力を節点に与えるので圧縮です。",
      "ウ": "全体のモーメントの釣合いから右下支点の反力は上向きにPです。右下の節点では水平のAは軸力0で、鉛直のBは節点を下向きに押すため−Pになります。",
      "エ": "Aは0で合っています。Bが引張なら節点を上向きに引いて支点反力と同じ向きになるので、釣合いません。",
      "オ": "右下の節点には支点から上向きPが作用します。Aには水平方向の反力が対応せず軸力がなく、Bには圧縮が生じます。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q82.webp"
    ],
    "imageAltTexts": [
      "水平荷重Pを受ける正方形の静定トラスと部材A・Bを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q83",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "木材の含水率と強度"
    ],
    "difficulty": 2,
    "question": "木材に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 繊維飽和点における含水率は、一般に、90％程度である。\n㋑ 含水率が繊維飽和点以上では、伸縮は起こらない。\n㋒ 同一乾燥状態では、一般に、密度の小さいものほど強度が大きい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "繊維飽和点以上では細胞壁が既に飽和し、増減するのは主に細胞内腔などの自由水です。細胞壁の寸法がほとんど変わらないので、材の伸縮も生じません。",
    "choiceExplanations": {
      "ア": "木材の細胞壁が結合水で飽和する含水率は一般に約30％です。90％は細胞の内部にも自由水を含む場合に達する値です。",
      "イ": "㋑は妥当ですが、㋐の90％は高過ぎます。繊維飽和点の含水率は樹種などで異なるものの、一般に30％前後です。",
      "ウ": "繊維飽和点以上では細胞壁が既に飽和し、増減するのは主に細胞内腔などの自由水です。細胞壁の寸法がほとんど変わらないので、材の伸縮も生じません。",
      "エ": "㋑は妥当です。同じ含水状態で比べると、一般には密度が大きい材の方が強度も高くなります。",
      "オ": "密度が低いほど強度が増すという関係は一般的ではありません。同じ含水状態では密度の高い材ほど、単位体積中に荷重を負担する細胞壁が多くなります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q84",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "コンクリートの流動性と混和剤"
    ],
    "difficulty": 2,
    "question": "コンクリートに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ スランプ値が大きいほど流動性は大きい。\n㋑ 寒中コンクリートには、AE剤やAE減水剤を使用しない。\n㋒ コンクリートとは、セメントペーストに細骨材のみを練り混ぜたものをいう。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "新鮮なコンクリートからスランプコーンを外したとき、大きく沈下するほど流動しやすいと判断します。スランプ値はその沈下量です。",
    "choiceExplanations": {
      "ア": "新鮮なコンクリートからスランプコーンを外したとき、大きく沈下するほど流動しやすいと判断します。スランプ値はその沈下量です。",
      "イ": "㋐のスランプ値は妥当ですが、㋒のセメントペーストに細骨材だけを加えた材料はモルタルです。通常のコンクリートは粗骨材も含みます。",
      "ウ": "AE剤は細かな空気泡を連行し、凍結融解の影響などを緩和します。寒中に使わないとする㋑は誤りです。",
      "エ": "㋑の混和剤は寒中にも使われ、㋒で述べた細骨材だけを加えた材料はモルタルです。通常のコンクリートには粗骨材も入ります。",
      "オ": "セメントペーストに砂などの細骨材を混ぜたものはモルタルです。コンクリートには通常、砂利や砕石などの粗骨材も加えます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q85",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "鋼の黒皮・溶接性・熱伝導率"
    ],
    "difficulty": 2,
    "question": "鋼に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 鋼表面の黒皮には、内部への腐食を抑える効果がある。\n㋑ 鋼は、炭素含有量が多くなると溶接性が低下する。\n㋒ 鋼は、木材やコンクリートに比べ、密度は大きいが、熱伝導率は小さい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "黒皮は熱間加工でできた酸化被膜で、健全な被膜は内部への腐食を抑えます。炭素が多い鋼では溶接で硬い組織が生じやすく、溶接性は低下します。",
    "choiceExplanations": {
      "ア": "健全な黒皮について述べる㋐に加え、炭素含有量が増すほど溶接部の割れなどが生じやすくなる㋑も妥当です。",
      "イ": "黒皮は熱間加工でできた酸化被膜で、健全な被膜は内部への腐食を抑えます。炭素が多い鋼では溶接で硬い組織が生じやすく、溶接性は低下します。",
      "ウ": "㋐は妥当ですが、鋼は木材やコンクリートに比べて熱をよく伝えます。熱伝導率は小さいとする㋒が誤りです。",
      "エ": "㋑は妥当ですが、鋼の熱伝導率は木材やコンクリートより高くなります。密度が大きい点だけでは㋒全体は正しくなりません。",
      "オ": "鋼は密度だけでなく熱伝導率も、木材やコンクリートより一般に大きい材料です。従って㋒は誤りです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q86",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "木造の部材名称"
    ],
    "difficulty": 2,
    "question": "図のような木構造における部材㋐～㋔の名称の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "垂木／軒桁／敷居／かもい／土台",
      "イ": "垂木／軒桁／かもい／敷居／土台",
      "ウ": "軒桁／垂木／敷居／土台／かもい",
      "エ": "軒桁／垂木／かもい／敷居／土台",
      "オ": "軒桁／垂木／かもい／土台／敷居"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "屋根勾配に沿う㋐が垂木で、それを軒で支える水平材㋑が軒桁です。開口の上・下はかもいと敷居、基礎上の㋔は土台です。",
    "choiceExplanations": {
      "ア": "屋根と土台の名称は合いますが、開口上部がかもいで下部が敷居です。選択肢の㋒と㋓が逆です。",
      "イ": "屋根勾配に沿う㋐が垂木で、それを軒で支える水平材㋑が軒桁です。開口の上・下はかもいと敷居、基礎上の㋔は土台です。",
      "ウ": "㋐は勾配に沿う垂木、㋑は垂木を受ける軒桁です。基礎上の㋔には柱を受ける土台が設けられます。",
      "エ": "開口と基礎上の名称は合っていますが、傾いた屋根材の㋐は垂木で、水平に受ける㋑が軒桁です。",
      "オ": "㋒のかもいは合っています。開口下部㋓が敷居、基礎に接する㋔が土台で、屋根部材の順も逆です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q86.webp"
    ],
    "imageAltTexts": [
      "木造断面で屋根・開口・土台に付した五つの部材記号を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q87",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "鉄筋の継手・付着・定着"
    ],
    "difficulty": 2,
    "question": "鉄筋コンクリート構造に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 鉄筋の継手は、なるべく応力の大きいところを避け、かつ、同一箇所に集中しないようにする。\n㋑ 鉄筋とコンクリートの付着強度は、同じ引張強さの場合、異形棒鋼よりも丸鋼を鉄筋として用いた方が大きい。\n㋒ 鉄筋の末端は、かぎ状に折り曲げた方が、切断したままの状態よりも定着がよい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "継手は応力の集中を避けて分散させます。鉄筋の末端にフックを設ければコンクリートに引っ掛かり、定着力を高められます。",
    "choiceExplanations": {
      "ア": "㋐は妥当です。鉄筋末端にフックを設けると引抜きへの抵抗が増すため、㋒も妥当です。",
      "イ": "㋐は妥当ですが、付着力を確保しやすいのは節やリブが周囲のコンクリートにかみ合う異形棒鋼です。",
      "ウ": "継手は応力の集中を避けて分散させます。鉄筋の末端にフックを設ければコンクリートに引っ掛かり、定着力を高められます。",
      "エ": "異形棒鋼は表面の突起がコンクリートにかみ合い、一般に丸鋼より付着力を確保しやすくなります。㋑はこの関係を逆にしています。",
      "オ": "㋒の定着の説明は正しいです。継手の設置位置を応力の小さい箇所に分散する㋐も妥当です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q88",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "鉄骨造の接合・床・柱脚"
    ],
    "difficulty": 2,
    "question": "鋼構造の部材に関する記述㋐、㋑、㋒とその名称の組合せとして最も妥当なのはどれか。\n㋐ 鋼管柱と梁の仕口において、柱内部又は外周部を補強するために設ける。\n㋑ 鋼板を折り曲げて剛性を高めたもので、床組に使用され、鉄骨ばりの上に敷いてコンクリートを打つ。\n㋒ 柱材を基礎に定着するため、柱材の端部に取り付けられる鋼板であり、アンカーボルトを用いて基礎に固定する。",
    "choices": {
      "ア": "ダイアフラム／ベースプレート／スチフナー",
      "イ": "ダイアフラム／デッキプレート／ベースプレート",
      "ウ": "スチフナー／ベースプレート／デッキプレート",
      "エ": "スチフナー／デッキプレート／ベースプレート",
      "オ": "デッキプレート／ダイアフラム／スチフナー"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ダイアフラムは鋼管柱と梁の仕口で力を柱に伝える補強板です。床の型枠などになる折板がデッキプレートで、柱脚をアンカーボルトで固定する鋼板がベースプレートです。",
    "choiceExplanations": {
      "ア": "㋐の名称は合いますが、床用の折り曲げた鋼板はデッキプレートです。柱脚を基礎に固定する鋼板はベースプレートです。",
      "イ": "ダイアフラムは鋼管柱と梁の仕口で力を柱に伝える補強板です。床の型枠などになる折板がデッキプレートで、柱脚をアンカーボルトで固定する鋼板がベースプレートです。",
      "ウ": "床に敷く折板はデッキプレートで、ベースプレートは基礎に柱を取り付ける鋼板です。柱と梁の仕口を補強する㋐にはダイアフラムが当てはまります。",
      "エ": "後の二つは正しいです。鋼管柱の梁仕口に設けて梁の力を伝える板を、設問ではダイアフラムと呼びます。",
      "オ": "デッキプレートは鉄骨梁の上に敷く床用の部材です。鋼管柱の仕口の補強板はダイアフラムで、柱脚はベースプレートです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q89",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "選択D（建築系）",
      "クリティカルパスの所要日数"
    ],
    "difficulty": 2,
    "question": "図のようなネットワーク工程表において、Aから作業を始めてFで作業を完了するまでのクリティカルパスの所要日数として最も妥当なのはどれか。",
    "choices": {
      "ア": "15日",
      "イ": "16日",
      "ウ": "17日",
      "エ": "18日",
      "オ": "19日"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "C経由は2＋7＋4＋3＝16日で、D経由は2＋5＋8＋3＝18日です。長いD経由がクリティカルパスであり、所要日数は18日です。",
    "choiceExplanations": {
      "ア": "A→B→C→E→Fでも2＋7＋4＋3＝16日必要です。Fに達するにはさらに長いD経由の作業も終わる必要があります。",
      "イ": "16日はCを経由する上側の経路の所要日数です。D経由はより長い18日なので、それが最短の工期を決めます。",
      "ウ": "二つの経路の長さは16日と18日です。合流点Eでは両方の作業を待つため、平均の17日にはなりません。",
      "エ": "C経由は2＋7＋4＋3＝16日で、D経由は2＋5＋8＋3＝18日です。長いD経由がクリティカルパスであり、所要日数は18日です。",
      "オ": "図の経路ではA→Bの2日とE→Fの3日に、B→D→Eの5日と8日を加えると最大です。合計は19日ではなく18日です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q89.webp"
    ],
    "imageAltTexts": [
      "AからFまでに分岐と合流があるネットワーク工程表の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q90",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "建築施工",
    "topicTags": [
      "選択D（建築系）",
      "ガスケット・アースアンカー・ミルシート"
    ],
    "difficulty": 2,
    "question": "建築工事に関する用語とそれに対応する工事名の組合せ㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ ガスケット ― 型枠工事\n㋑ アースアンカー ― コンクリート工事\n㋒ ミルシート ― 鉄骨工事",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ミルシートは鋼材メーカーが鋼材の化学成分や機械的性質などを証明する検査証明書です。鉄骨工事で使用材料が規格に適合するかの確認に使います。",
    "choiceExplanations": {
      "ア": "建築でガスケットはガラスや建具などの隙間をふさぐ部材です。型枠工事の代表的な用語ではありません。",
      "イ": "ガスケットはガラスなどの取付けや目地の気密・水密確保に使います。アースアンカーは一般に掘削時の山留めなどを地盤に固定する工事に関わります。",
      "ウ": "ミルシートを鉄骨工事とする㋒は妥当です。ガスケットは型枠ではなく、ガラスや建具まわりなどのシールに使用します。",
      "エ": "㋒は妥当ですが、アースアンカーは地盤の抵抗を利用して山留めなどを安定させる工法です。コンクリート工事との組合せは適切ではありません。",
      "オ": "ミルシートは鋼材メーカーが鋼材の化学成分や機械的性質などを証明する検査証明書です。鉄骨工事で使用材料が規格に適合するかの確認に使います。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q91",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "選択D（建築系）",
      "マンセル表色系と補色"
    ],
    "difficulty": 2,
    "question": "マンセル表色系に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 2.5Y8/12と表される色は青である。\n㋑ N9.5と表される色は赤である。\n㋒ 色相環において、中心を挟んで相対する色は補色の関係にある。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "色相環で中心を挟んで向かい合う色相は補色です。一方、㋐のYは黄の色相で、㋑のNは色相や彩度を持たない無彩色です。",
    "choiceExplanations": {
      "ア": "最初の2.5Yが色相で、YはYellowの黄色系です。青の色相を表す記号はBです。",
      "イ": "2.5Yは黄系の色相です。Nは色相を持たない無彩色の記号なので、N9.5も赤ではありません。",
      "ウ": "Nは無彩色を表し、9.5は明るさを表します。N9.5は白に近く、赤の色相は持ちません。",
      "エ": "㋒は妥当ですが、N9.5は明度が高い無彩色です。赤色を表すには色相Rなどを使います。",
      "オ": "色相環で中心を挟んで向かい合う色相は補色です。一方、㋐のYは黄の色相で、㋑のNは色相や彩度を持たない無彩色です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q92",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "選択D（建築系）",
      "住宅の作業別推奨照度"
    ],
    "difficulty": 2,
    "question": "JISに定められた照度基準に基づき、住宅の各室や生活行為の㋐、㋑、㋒に推奨される照度の値を大きいものから順に並べたものとして最も妥当なのはどれか。\n㋐ 書斎における読書\n㋑ 家事室における手芸\n㋒ 台所における調理",
    "choices": {
      "ア": "㋐ ＞ ㋑ ＞ ㋒",
      "イ": "㋒ ＞ ㋐ ＞ ㋑",
      "ウ": "㋑ ＞ ㋐ ＞ ㋒",
      "エ": "㋐ ＞ ㋒ ＞ ㋑",
      "オ": "㋒ ＞ ㋑ ＞ ㋐"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "細かな針仕事などをする手芸では特に高い照度が必要です。書斎での読書がこれに続き、台所での調理は三つの中で最も低い値です。",
    "choiceExplanations": {
      "ア": "読書の照度は調理より高いものの、細部を見分ける手芸の方が、読書よりも高い照度が推奨されます。",
      "イ": "三つのうち推奨照度が最も高いのは手芸です。調理は手芸や書斎での読書より低い順になります。",
      "ウ": "細かな針仕事などをする手芸では特に高い照度が必要です。書斎での読書がこれに続き、台所での調理は三つの中で最も低い値です。",
      "エ": "書斎での読書は調理より高い点では合っています。最も高い照度が求められるのは、細かい手作業をする家事室の手芸です。",
      "オ": "手芸は読書より高い照度を必要としますが、調理を手芸より先には置きません。順に手芸、読書、調理となります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q93",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "建築設備",
    "topicTags": [
      "選択D（建築系）",
      "機械換気の方式と用途"
    ],
    "difficulty": 2,
    "question": "機械換気設備に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 屋内駐車場に第一種機械換気設備を採用した。\n㋑ 便所に第二種機械換気設備を採用した。\n㋒ ボイラー室に第三種機械換気設備を採用した。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "第一種では給気と排気をいずれもファンで行い、屋内駐車場の必要換気量を確保できます。便所には排気を機械で行う第三種が向き、燃焼用の給気が必要なボイラー室を第三種とする説明は適切ではありません。",
    "choiceExplanations": {
      "ア": "第一種では給気と排気をいずれもファンで行い、屋内駐車場の必要換気量を確保できます。便所には排気を機械で行う第三種が向き、燃焼用の給気が必要なボイラー室を第三種とする説明は適切ではありません。",
      "イ": "㋐は妥当ですが、第三種は機械排気で室内が負圧になりやすい方式です。ボイラー室には必要な燃焼空気を確保する給気方式を選びます。",
      "ウ": "第二種は機械給気で室内が正圧になりやすく、便所の臭気が周囲へ流出しやすくなります。便所では一般に機械排気で負圧を保ちます。",
      "エ": "㋑の第二種は汚れた空気を周囲へ押し出しやすく、便所には適しません。㋒の第三種ではボイラーに必要な燃焼用空気の確保や逆流への配慮が不足します。",
      "オ": "第三種は機械排気によって負圧になりやすく、燃焼用空気の確保が必要なボイラー室の代表的な方式ではありません。十分な給気を行う方式を検討します。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q94",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "建築設備",
    "topicTags": [
      "選択D（建築系）",
      "排水トラップの用途"
    ],
    "difficulty": 2,
    "question": "トラップの名称とその使用する場所の組合せ㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ Uトラップ ― 床排水\n㋑ ドラムトラップ ― 厨房用流し\n㋒ わんトラップ ― 横走管",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ドラムトラップはドラム状の部分に封水を保持する形式です。厨房用流しなどに設け、下水側から臭気が上がるのを防ぎます。",
    "choiceExplanations": {
      "ア": "Uトラップは排水の横走管などに設ける管トラップの一つです。床の排水口に用いられる代表例はわんトラップです。",
      "イ": "厨房用流しにドラムトラップを使う㋑は妥当です。床の排水口に使う代表的な形式としてはわんトラップがあります。",
      "ウ": "Uトラップは排水管の途中で用い、わんトラップは床排水などの排水口に組み込みます。設問は代表的な使用場所を入れ替えています。",
      "エ": "ドラムトラップはドラム状の部分に封水を保持する形式です。厨房用流しなどに設け、下水側から臭気が上がるのを防ぎます。",
      "オ": "わんトラップは床などの排水口で使う形式です。横走管に設ける管トラップの例はUトラップです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q95",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "選択D（建築系）",
      "階段の踏面と蹴上げ"
    ],
    "difficulty": 2,
    "question": "平面図で示される階段の踏面及び蹴上げの組合せとして最も妥当なのはどれか。ただし、階段は各階同一形状であり、階高は3 mとする。",
    "choices": {
      "ア": "26.25 cm／18.75 cm",
      "イ": "26.25 cm／20.00 cm",
      "ウ": "30.00 cm／18.75 cm",
      "エ": "30.00 cm／20.00 cm",
      "オ": "30.00 cm／21.43 cm"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "平面図の210 cmには七つの踏面があるので、一段の踏面は30 cmです。片側は八つの蹴上げで、上下二列で16段になるため300÷16＝18.75 cmです。",
    "choiceExplanations": {
      "ア": "蹴上げは合っていますが、210 cmの間にある踏面は8つではなく7つです。踏面は210÷7＝30 cmです。",
      "イ": "210 cmにある踏面は7つです。片側の蹴上げは踏面より一つ多い8段で、折返し全体で16段あります。",
      "ウ": "平面図の210 cmには七つの踏面があるので、一段の踏面は30 cmです。片側は八つの蹴上げで、上下二列で16段になるため300÷16＝18.75 cmです。",
      "エ": "踏面は合っていますが、階全体の蹴上げ数は15ではなく16です。階高300 cmを16で割ります。",
      "オ": "14は上下各7つの踏面を足した値です。水平の踏面より各階段で蹴上げが一つ多いので、300 cmは16で割ります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q95.webp"
    ],
    "imageAltTexts": [
      "折返し階段の平面図と一方の階段の水平寸法210 cmを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q96",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "選択D（建築系）",
      "事務所の机の配置形式"
    ],
    "difficulty": 2,
    "question": "事務所における机の配置形式に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ スタッグ式は、一人当たりの所要面積が最も小さい配置形式である。\n㋑ 並行式は、対面する視線がないため、比較的プライバシーが要求される業務に適している。\n㋒ 対向式は、並行式に比べて一人当たりの所要面積が増加する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "並行式では各列の机を同じ方向に向けるため、向かいの席と視線を直接合わせずに済みます。個人作業で比較的プライバシーを確保したい場合に適します。",
    "choiceExplanations": {
      "ア": "㋑のプライバシーに関する説明は妥当です。スタッグ式は机をずらして配置するため、所要面積が最も小さいとはいえません。",
      "イ": "㋐のスタッグ式が最小面積という根拠はありません。対向式では机を向かい合わせてまとめ、並行式より床面積を効率良く使える場合があります。",
      "ウ": "並行式では各列の机を同じ方向に向けるため、向かいの席と視線を直接合わせずに済みます。個人作業で比較的プライバシーを確保したい場合に適します。",
      "エ": "㋑は妥当ですが、対向式は向かい合う机を組にして配置することで、一般に並行式より一人当たりの面積を抑えやすくなります。",
      "オ": "対向式では机をまとめて共有する動線を短くでき、並行式より面積を増やすとは限りません。対向式の長所には場所を効率良く使えることがあります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q97",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "建築史",
    "topicTags": [
      "選択D（建築系）",
      "建築家と代表作"
    ],
    "difficulty": 2,
    "question": "建築家とその作品の組合せ㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ フランク・ロイド・ライト ― カサ・ミラ\n㋑ ワルター・グロピウス ― バウハウス校舎\n㋒ レンゾ・ピアノ ― 関西国際空港旅客ターミナルビル",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "デッサウのバウハウス校舎はワルター・グロピウスの作品です。レンゾ・ピアノは関西国際空港の旅客ターミナルビルを設計しました。",
    "choiceExplanations": {
      "ア": "バルセロナのカサ・ミラはアントニ・ガウディの作品です。ライトの代表作には落水荘があります。",
      "イ": "グロピウスとバウハウス校舎の組合せは妥当です。カサ・ミラを設計したのはライトではなくガウディです。",
      "ウ": "関西国際空港旅客ターミナルビルはレンゾ・ピアノが設計に関わっています。カサ・ミラはガウディの作品です。",
      "エ": "デッサウのバウハウス校舎はワルター・グロピウスの作品です。レンゾ・ピアノは関西国際空港の旅客ターミナルビルを設計しました。",
      "オ": "レンゾ・ピアノと関西国際空港の組合せは妥当です。グロピウスとバウハウス校舎の組合せも妥当です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q98",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "都市計画",
    "topicTags": [
      "選択D（建築系）",
      "近隣住区の施設"
    ],
    "difficulty": 2,
    "question": "図は、近隣住区の構成をモデルで表したものである。このとき、※に入る施設の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "近隣センター、小学校、地区公園",
      "イ": "近隣センター、小学校、近隣公園",
      "ウ": "地区センター、中学校、地区公園",
      "エ": "地区センター、中学校、近隣公園",
      "オ": "地区センター、小学校、地区公園"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "複数の近隣分区に共通する近隣住区の中心に、近隣センター、小学校、近隣公園を置くモデルです。幼稚園や児童公園などは各近隣分区に配置されています。",
    "choiceExplanations": {
      "ア": "近隣センターと小学校は合っています。住区の公園は図の規模では地区公園ではなく近隣公園です。",
      "イ": "複数の近隣分区に共通する近隣住区の中心に、近隣センター、小学校、近隣公園を置くモデルです。幼稚園や児童公園などは各近隣分区に配置されています。",
      "ウ": "中学校などは個々の近隣住区より広い圏域を想定した施設です。空欄は近隣住区の施設である小学校などの組合せです。",
      "エ": "近隣公園は合っていますが、住区の中心に配置するのは近隣センターと小学校です。中学校・地区センターを置く規模とは異なります。",
      "オ": "小学校は合っています。近隣住区で共有する施設としては、地区センターや地区公園ではなく近隣センターや近隣公園が当てはまります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2024/senmon-gijutsu/q98.webp"
    ],
    "imageAltTexts": [
      "近隣住区・近隣分区と中央の空欄を示すモデルの原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q99",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "選択D（建築系）",
      "単体規定と集団規定"
    ],
    "difficulty": 2,
    "question": "建築基準法上の規定㋐、㋑、㋒のうち、単体規定に関するもののみを全て挙げているのはどれか。\n㋐ 道路斜線制限に関する規定\n㋑ 内装制限に関する規定\n㋒ 避難施設に関する規定",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "内装制限は建築物ごとの内装の防火性能に、避難施設の規定は建築物ごとの避難安全性に関わります。いずれも単体規定です。",
    "choiceExplanations": {
      "ア": "道路斜線制限は道路と周辺建築物との関係を調整して採光などを確保する規定です。市街地の環境に関する集団規定に当たります。",
      "イ": "㋑の内装制限は単体規定です。㋐は道路との関係から建物の高さを制限する集団規定です。",
      "ウ": "㋒の避難施設は単体規定に当たります。道路斜線制限は建築物と道路の関係を扱うため集団規定です。",
      "エ": "内装制限は単体規定で合っています。避難経路などを建築物内に確保する避難施設の規定も単体規定です。",
      "オ": "内装制限は建築物ごとの内装の防火性能に、避難施設の規定は建築物ごとの避難安全性に関わります。いずれも単体規定です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2024-annual-senmon-gijutsu-q100",
    "exam": "kokka-ippan-kou",
    "year": 2024,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "選択D（建築系）",
      "建築基準法の目的"
    ],
    "difficulty": 2,
    "question": "建築基準法第一条（目的）の条文のうち㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「この法律は、建築物の敷地、［㋐］、設備及び用途に関する［㋑］を定めて、国民の生命、健康及び財産の保護を図り、もつて［㋒］の増進に資することを目的とする。」",
    "choices": {
      "ア": "主要構造部／安全基準／公共の福祉",
      "イ": "形状／最低の基準／住環境",
      "ウ": "形状／一般的な基準／都市環境",
      "エ": "構造／最低の基準／公共の福祉",
      "オ": "構造／安全基準／住環境"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "第一条は建築物の敷地、構造、設備及び用途に関する最低の基準を定めるとしています。国民の生命などを保護し、公共の福祉の増進に資することが目的です。",
    "choiceExplanations": {
      "ア": "公共の福祉は合いますが、条文は主要構造部に限らず「構造」と記しています。「安全基準」ではなく「最低の基準」です。",
      "イ": "最低の基準は合っています。ほかの空欄には建築物の「構造」と「公共の福祉」が入ります。",
      "ウ": "第一条は形状と一般的な基準という表現を用いません。敷地・構造・設備・用途に関する最低の基準を定めるとしています。",
      "エ": "第一条は建築物の敷地、構造、設備及び用途に関する最低の基準を定めるとしています。国民の生命などを保護し、公共の福祉の増進に資することが目的です。",
      "オ": "構造は合っていますが、法律が定めるのは「最低の基準」です。条文の最後は「公共の福祉の増進に資する」となります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000002374.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。"
  }
];
