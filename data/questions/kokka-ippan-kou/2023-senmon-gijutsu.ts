import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_KOU_2023_SENMON_GIJUTSU: Question[] = [
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q01",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "二次方程式の解の平行移動"
    ],
    "difficulty": 2,
    "question": "2次方程式x²＋ax＋b＝0の二つの解にそれぞれ3を足すとx²＋3x−10＝0の二つの解となるとき、定数a、bの組合せとして正しいのはどれか。",
    "choices": {
      "ア": "a＝6、b＝4",
      "イ": "a＝6、b＝5",
      "ウ": "a＝8、b＝6",
      "エ": "a＝9、b＝5",
      "オ": "a＝9、b＝8"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "移動先の式は（x−2）（x＋5）＝0である。両方の解から3を引くと−1と−8になり、それを解とする式は（x＋1）（x＋8）＝x²＋9x＋8＝0となる。",
    "choiceExplanations": {
      "ア": "解を3ずつ増やすと解の和は6増える。移動先の解の和が−3なので、元の解の和は−9でありa＝9となる。",
      "イ": "移動先を因数分解すると解は2と−5であり、元の解は−1と−8である。その和は−9である。",
      "ウ": "8は元の二つの解−1と−8の積に当たり、xの係数aではなく定数項bである。",
      "エ": "元の解の和が−9なのでaは合うが、二つの解−1と−8の積は5ではなく8である。",
      "オ": "移動先の式は（x−2）（x＋5）＝0である。両方の解から3を引くと−1と−8になり、それを解とする式は（x＋1）（x＋8）＝x²＋9x＋8＝0となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q02",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "直線と単位円の共有点"
    ],
    "difficulty": 2,
    "question": "直線y＝√3 x＋kが円x²＋y²＝1と共有点をもたないための定数kの値の範囲として正しいのはどれか。",
    "choices": {
      "ア": "−2√3/3＜k＜2√3/3",
      "イ": "−2＜k＜2",
      "ウ": "k＜−2√3/3、2√3/3＜k",
      "エ": "k≦−2、2≦k",
      "オ": "k＜−2、2＜k"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "円の中心である原点と直線の距離は∣k∣/√（3＋1）＝∣k∣/2である。共有点をもたないのは半径1より距離が大きいときなので、∣k∣＞2となる。",
    "choiceExplanations": {
      "ア": "k＝0では直線が円の中心を通り、円周と2点で交わるため、この範囲は条件を満たさない。",
      "イ": "この範囲では原点と直線の距離∣k∣/2が1より小さいので、円と異なる2点で交わる。",
      "ウ": "例えばk＝1.5はこの範囲に入るが、原点からの距離は0.75で、単位円と2点で交わる。",
      "エ": "k＝±2では原点と直線の距離が半径に等しくなり、接点が一つある。",
      "オ": "円の中心である原点と直線の距離は∣k∣/√（3＋1）＝∣k∣/2である。共有点をもたないのは半径1より距離が大きいときなので、∣k∣＞2となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q03",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "円に内接する四角形の対角"
    ],
    "difficulty": 2,
    "question": "図のように、円に内接する四角形ABCDにおいて、∠ABD＝45°、∠BDA＝35°であるとき、∠BCDはいくらか。",
    "choices": {
      "ア": "65°",
      "イ": "70°",
      "ウ": "75°",
      "エ": "80°",
      "オ": "85°"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "三角形ABDで∠BAD＝180°−45°−35°＝100°である。円に内接する四角形の対角の和は180°なので、∠BCD＝80°となる。",
    "choiceExplanations": {
      "ア": "三角形ABDで∠BADは100°となる。四角形の対角の和を180°にするには∠BCDが80°必要である。",
      "イ": "∠BCDを70°にすると対角∠BADとの和が170°にしかならず、円に内接する四角形の条件に合わない。",
      "ウ": "∠ABDと∠BDAを足すと45°＋35°＝80°であり、75°にはならない。",
      "エ": "三角形ABDで∠BAD＝180°−45°−35°＝100°である。円に内接する四角形の対角の和は180°なので、∠BCD＝80°となる。",
      "オ": "∠BCDを85°とすると100°の∠BADとの合計が185°となるため、円に内接する条件に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q03.webp"
    ],
    "imageAltTexts": [
      "円に内接する四角形ABCDと対角線BDならびに二つの角度を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q04",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "正多面体の辺・頂点・面"
    ],
    "difficulty": 2,
    "question": "表は、正四面体、正六面体、正八面体のそれぞれの面の数、辺の数、頂点の数、面の形を示したものである。表中の㋐、㋑、㋒に当てはまるものの組合せとして正しいのはどれか。",
    "choices": {
      "ア": "9・6・正方形",
      "イ": "9・12・正三角形",
      "ウ": "9・12・正方形",
      "エ": "12・6・正三角形",
      "オ": "12・12・正三角形"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "正六面体の辺は6面に4本ずつ付き、各辺を2面が共有するので6×4÷2＝12本である。正八面体には頂点が6個あり、正四面体の面は正三角形である。",
    "choiceExplanations": {
      "ア": "正八面体の頂点は6個だが、正四面体の面は正三角形である。正六面体の辺も9本ではなく12本ある。",
      "イ": "正四面体の面の形は合うが、正六面体の辺は12本であり、正八面体の頂点は6個である。",
      "ウ": "正六面体の辺は上下の各4本とそれをつなぐ4本で計12本である。正四面体は4枚の正三角形からなる。",
      "エ": "正六面体の辺は6面に4本ずつ付き、各辺を2面が共有するので6×4÷2＝12本である。正八面体には頂点が6個あり、正四面体の面は正三角形である。",
      "オ": "12本は正八面体の辺の数であり、頂点の数ではない。正八面体は二つの四角錐を底面で合わせた形で、頂点は6個である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q04.webp"
    ],
    "imageAltTexts": [
      "正四面体・正六面体・正八面体について面・辺・頂点の数と面の形を示した原表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q05",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "三次関数の重解と極値"
    ],
    "difficulty": 2,
    "question": "曲線y＝−x³−3x²のグラフの概形として最も妥当なのはどれか。",
    "choices": {
      "ア": "原点でx軸に接する極大をもつ曲線（原図1）",
      "イ": "原点を横切り右側に極大をもつ曲線（原図2）",
      "ウ": "原点でx軸に接する極小をもつ曲線（原図3）",
      "エ": "原点を横切り右側でx軸に接する曲線（原図4）",
      "オ": "右上がりの区間の左端に極小をもち原点を横切る曲線（原図5）"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "y＝−x²（x＋3）なのでx＝0は重解で、原点の近くでは両側でy≦0となる。左のx＝−3ではx軸を横切り、右端に向かってyは減少する。",
    "choiceExplanations": {
      "ア": "y＝−x²（x＋3）なのでx＝0は重解で、原点の近くでは両側でy≦0となる。左のx＝−3ではx軸を横切り、右端に向かってyは減少する。",
      "イ": "原点ではx＝0が重解なので曲線はx軸に接する。原点を横切る形にはならない。",
      "ウ": "原点の両側で−x²（x＋3）は負になるため、原点は極小ではなく極大である。",
      "エ": "x軸と接する重解はx＝0であり、図のように原点より右の点にはない。",
      "オ": "式の最高次係数は負なので、xが十分小さいとyは正で大きくなる。グラフの左端が下がる形は合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。",
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q05-1.webp",
      "イ": "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q05-2.webp",
      "ウ": "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q05-3.webp",
      "エ": "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q05-4.webp",
      "オ": "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q05-5.webp"
    }
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q06",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "導関数の二点における値"
    ],
    "difficulty": 2,
    "question": "関数f(x)＝x³−3x²−7x＋2について、f′(−2)＋f′(1)の値はいくらか。ただし、f(x)の導関数をf′(x)とする。",
    "choices": {
      "ア": "3",
      "イ": "4",
      "ウ": "5",
      "エ": "6",
      "オ": "7"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "微分するとf′(x)＝3x²−6x−7である。x＝−2で17、x＝1で−10となり、合計は17−10＝7である。",
    "choiceExplanations": {
      "ア": "定数項の導関数は0で、一次項−7xの導関数は−7である。これらを含む導関数に二点を代入すると和は7となる。",
      "イ": "負の数を代入すると（−2）²＝4である。f′(−2)は12＋12−7＝17となるため、和は4ではない。",
      "ウ": "f′(1)は3−6−7＝−10である。もう一方のf′(−2)＝17を加えると7になる。",
      "エ": "3x²を微分した項は係数に2を掛けるので、f′(x)には−6xが現れる。この項を含めて正確に代入すると和は6ではない。",
      "オ": "微分するとf′(x)＝3x²−6x−7である。x＝−2で17、x＝1で−10となり、合計は17−10＝7である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q07",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "導関数からの原始関数と初期条件"
    ],
    "difficulty": 2,
    "question": "関数f(x)が次の条件を満たすとき、f(x)として正しいのはどれか。\nf′(x)＝（3x−1）²、f(1)＝0\nただし、f(x)の導関数をf′(x)とする。",
    "choices": {
      "ア": "3x³−6x²＋x＋2",
      "イ": "3x³−6x²−x＋4",
      "ウ": "3x³−3x²＋x−1",
      "エ": "3x³＋3x²−x−5",
      "オ": "3x³＋6x²＋x−10"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "（3x−1）²＝9x²−6x＋1を積分すると3x³−3x²＋x＋Cとなる。f(1)＝1＋C＝0からC＝−1を得る。",
    "choiceExplanations": {
      "ア": "この関数を微分すると9x²−12x＋1となるが、条件の展開形ではxの係数は−6である。",
      "イ": "微分すると9x²−12x−1となるため、xの項と定数項がどちらも条件に合わない。",
      "ウ": "（3x−1）²＝9x²−6x＋1を積分すると3x³−3x²＋x＋Cとなる。f(1)＝1＋C＝0からC＝−1を得る。",
      "エ": "微分すると9x²＋6x−1である。条件はxの項が−6xで、定数項は＋1である。",
      "オ": "f(1)は0になるが、微分したときのxの係数が＋12なので、指定された導関数とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q08",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "放物線と接線で囲まれた面積"
    ],
    "difficulty": 2,
    "question": "放物線y＝x²−2x＋3、この放物線上の点（2, 3）における接線y＝2x−1及び直線x＝0で囲まれる部分の面積はいくらか。",
    "choices": {
      "ア": "2",
      "イ": "8/3",
      "ウ": "10/3",
      "エ": "4",
      "オ": "14/3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "上の放物線から下の直線を引くと（x−2）²になる。x＝0から2まで積分すれば［（x−2）³/3］₀²＝8/3を得る。",
    "choiceExplanations": {
      "ア": "領域の縦幅はxによって変わるため、直線で囲まれた三角形の面積だけでは求められない。",
      "イ": "上の放物線から下の直線を引くと（x−2）²になる。x＝0から2まで積分すれば［（x−2）³/3］₀²＝8/3を得る。",
      "ウ": "放物線だけを積分するのでなく、各xで接線のy座標を引いた式を積分する。積分値は10/3より小さい。",
      "エ": "x＝0の縦幅は4だが、x＝2で0まで減少する。幅を区間全体で積分して面積を出す。",
      "オ": "積分の上端は接する点のx座標2で、下端はx＝0である。差の式は（x−2）²となり、面積は14/3に達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q08.webp"
    ],
    "imageAltTexts": [
      "放物線と点（2, 3）での接線およびy軸で囲まれた斜線領域の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q09",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "特定の二人が隣り合う確率"
    ],
    "difficulty": 2,
    "question": "4人が1列に並ぶとき、特定の2人が隣り合う確率はいくらか。",
    "choices": {
      "ア": "1/6",
      "イ": "1/3",
      "ウ": "5/12",
      "エ": "1/2",
      "オ": "2/3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "特定の二人を一組と見なして残りの二人と並べると3!通りあり、組内の順を掛けて12通りある。全体は4!＝24通りなので確率は1/2である。",
    "choiceExplanations": {
      "ア": "隣り合う二人が入れる位置は端から数えて三組あり、いずれも二人の並び順が2通りある。",
      "イ": "二人を一組とすると三つのものの並べ方は3!通りであり、組の中の二人の順も2通りある。",
      "ウ": "隣り合う二人の順と残りの二人の順を区別すると、有利な並び方は5/12に対応する10通りではなく12通りである。",
      "エ": "特定の二人を一組と見なして残りの二人と並べると3!通りあり、組内の順を掛けて12通りある。全体は4!＝24通りなので確率は1/2である。",
      "オ": "二人の位置を選ぶ6通りのうち隣り合うのは（1, 2）、（2, 3）、（3, 4）の3通りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q10",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "必須問題",
      "等比数列の公比と部分和"
    ],
    "difficulty": 2,
    "question": "第3項が16、第6項が128である等比数列について、初項から第6項までの和はいくらか。",
    "choices": {
      "ア": "236",
      "イ": "244",
      "ウ": "252",
      "エ": "260",
      "オ": "268"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "公比rはr³＝128/16＝8から2となり、初項は16÷2²＝4である。和は4（2⁶−1）/（2−1）＝252となる。",
    "choiceExplanations": {
      "ア": "第6項までの和には初項4、第2項8、第3項16も含む。これらを含めた6項の和は236より大きい。",
      "イ": "公比は第6項と第3項の比8の立方根である。これを使って初項から6項を求めると244ではなく252となる。",
      "ウ": "公比rはr³＝128/16＝8から2となり、初項は16÷2²＝4である。和は4（2⁶−1）/（2−1）＝252となる。",
      "エ": "公比2に対して各項は4、8、16、32、64、128となるので、与えられた第3項と第6項を含む合計は260に達しない。",
      "オ": "第6項が128なので、第1項まで半分ずつ戻してからそれらを合計する。全て足した値は252である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q11",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "斜方投射の飛行時間"
    ],
    "difficulty": 2,
    "question": "水平な床の上で、小球を水平面となす角30°で発射したところ、小球はt秒後に発射地点から8.5 m先で初めて床に衝突した。このとき、tとして最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²、√3＝1.7とする。",
    "choices": {
      "ア": "0.50",
      "イ": "1.0",
      "ウ": "1.4",
      "エ": "1.7",
      "オ": "2.7"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "初速をvとすると鉛直変位は0＝v sin30°×t−5t²だからv＝10tである。水平距離はv cos30°×t＝5√3 t²で、8.5＝8.5t²からt＝1.0秒となる。",
    "choiceExplanations": {
      "ア": "0.50秒は正答の飛行時間の半分に当たる。最高点に達した後、同じ高さの床に戻るまでにも同じ時間が掛かる。",
      "イ": "初速をvとすると鉛直変位は0＝v sin30°×t−5t²だからv＝10tである。水平距離はv cos30°×t＝5√3 t²で、8.5＝8.5t²からt＝1.0秒となる。",
      "ウ": "床に戻る条件と水平方向の等速運動を合わせると、距離は8.5t² mとなる。t＝1.4秒では8.5 mを超える。",
      "エ": "1.7は√3の近似値で、水平速度成分を求めるときに使う。飛行時間はt²＝8.5/（5×1.7）から求める。",
      "オ": "床までの水平距離とt²の比例係数がともに8.5となるので、t²＝1である。2.7秒では与えられた距離を大幅に超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q12",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "二球の衝突と運動量保存"
    ],
    "difficulty": 2,
    "question": "図のように、滑らかな水平面の一直線上を速さ4vで運動している質量mの小球Aが、同一直線上を同じ向きに速さ2vで運動している質量3mの小球Bに衝突した。衝突後、Aは衝突前と同じ向きに速さvで、BはAと同じ向きに速さv′で運動した。このとき、v′として最も妥当なのはどれか。",
    "choices": {
      "ア": "v",
      "イ": "2v",
      "ウ": "3v",
      "エ": "4v",
      "オ": "5v"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水平方向の外力がないので衝突前後で運動量が保存される。m×4v＋3m×2v＝mv＋3mv′よりv′＝3vとなる。",
    "choiceExplanations": {
      "ア": "Bもvで動くと衝突後の全運動量が4mvとなるが、衝突前には10mvある。",
      "イ": "Bが2vのままでは、Aが失った3mvの運動量を受け取れない。",
      "ウ": "水平方向の外力がないので衝突前後で運動量が保存される。m×4v＋3m×2v＝mv＋3mv′よりv′＝3vとなる。",
      "エ": "4vの場合はBだけで12mvの運動量になり、衝突前の両球の合計10mvを超える。",
      "オ": "Bが獲得する運動量はAが失った3mvである。Bの質量は3mなので速度の増加はvであり、衝突後は3vである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q12.webp"
    ],
    "imageAltTexts": [
      "衝突前後での小球A・Bの質量と速度の関係を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q13",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "円板から一部を切り抜いた後の重心"
    ],
    "difficulty": 2,
    "question": "図のように、点Oを中心とする半径rの一様な円板から、Oよりr/2だけ離れた点O′を中心とする半径r/2の円板Aを切り抜き、残った板Bの重心をGとする。このとき、OG間の距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "r/8",
      "イ": "r/6",
      "ウ": "r/4",
      "エ": "r/3",
      "オ": "r/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "切り抜く円板は元の質量の1/4、残る板は3/4である。Oの両側のモーメントが釣り合うので、OG＝（1/4）×（r/2）÷（3/4）＝r/6となる。",
    "choiceExplanations": {
      "ア": "r/8は切り抜く部分の質量を元の円板の質量で割ってr/2を掛けた値である。重心の移動では残った板の質量で割る。",
      "イ": "切り抜く円板は元の質量の1/4、残る板は3/4である。Oの両側のモーメントが釣り合うので、OG＝（1/4）×（r/2）÷（3/4）＝r/6となる。",
      "ウ": "1/4は面積から求まる切り抜き部の質量比である。これに距離r/2を掛け、さらに残った板の質量比で割って距離を求める。",
      "エ": "切り抜き部分と残りの質量比は1対3である。距離の比も考慮するとr/2の3分の1になる。",
      "オ": "r/2はOから切り抜き円の中心O′までの距離である。残りの板の重心GはO′の反対側でOにより近い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q13.webp"
    ],
    "imageAltTexts": [
      "同一円板を半径r/2の円でくりぬいた位置と残った円板の重心を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q14",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "等温変化とボイルの法則"
    ],
    "difficulty": 2,
    "question": "圧力5.0×10⁵ Paのとき、30 m³の体積を占める理想気体がある。この理想気体の温度を一定に保ち、圧力1.0×10⁷ Paにしたときの体積として最も妥当なのはどれか。",
    "choices": {
      "ア": "1.5 m³",
      "イ": "6.0 m³",
      "ウ": "1.5×10² m³",
      "エ": "6.0×10² m³",
      "オ": "1.5×10³ m³"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "温度と気体の量が一定なら圧力と体積の積が一定である。圧力が1.0×10⁷÷（5.0×10⁵）＝20倍になるので体積は30÷20＝1.5 m³となる。",
    "choiceExplanations": {
      "ア": "温度と気体の量が一定なら圧力と体積の積が一定である。圧力が1.0×10⁷÷（5.0×10⁵）＝20倍になるので体積は30÷20＝1.5 m³となる。",
      "イ": "6.0 m³なら体積が5分の1となり圧力は5倍だが、実際には20倍になる。",
      "ウ": "一定温度で圧力を上げると体積は減少する。この体積は元の30 m³より大きい。",
      "エ": "600 m³は体積を20倍にした値である。等温圧縮なので20で割る。",
      "オ": "1,500 m³では元より50倍も大きくなり、圧力上昇に伴って体積が減る等温変化とは逆になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q15",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "ばねの弾性力による位置エネルギー"
    ],
    "difficulty": 2,
    "question": "水平で滑らかな床の上に置かれた小物体に、ばね定数4.0 N/mのばねの一端を取り付け、ばねの他端を壁に固定した。ばねを自然長から0.50 mだけ縮めたとき、小物体のもつ弾性力による位置エネルギーとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0.10 N·m",
      "イ": "0.20 N·m",
      "ウ": "0.50 N·m",
      "エ": "0.70 N·m",
      "オ": "1.0 N·m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "自然長からの縮みxに対する弾性エネルギーはkx²/2である。ばね定数4.0 N/m、縮み0.50 mより4.0×0.50²/2＝0.50 N·mとなる。",
    "choiceExplanations": {
      "ア": "力は変位に比例して0から2.0 Nまで増えるため、平均の力は1.0 Nである。これに変位0.50 mを掛けた値が蓄えられる。",
      "イ": "エネルギーはばね定数に変位の2乗を掛けて半分にする。4.0と0.50を代入すると0.20 N·mより大きくなる。",
      "ウ": "自然長からの縮みxに対する弾性エネルギーはkx²/2である。ばね定数4.0 N/m、縮み0.50 mより4.0×0.50²/2＝0.50 N·mとなる。",
      "エ": "弾性力の大きさと変位のグラフは原点からの直線で、エネルギーは三角形の面積として求まる。",
      "オ": "1.0 N·mは最終時の力2.0 Nを全変位に掛けた値である。押し縮める途中で力は0から増えるため、その半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q16",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "白色光・紫外線・光の散乱"
    ],
    "difficulty": 2,
    "question": "光に関する記述㋐、㋑、㋒のうち、【 】内が妥当なもののみを全て挙げているのはどれか。\n㋐ 可視光線の波長のほぼ全域を均等に含む光は、ヒトの肉眼では【白っぽく】見える。\n㋑ 太陽光には、可視光線よりも波長の【短い】紫外線が含まれている。\n㋒ 光が、その波長よりも小さな粒子に当たると、その粒子を中心とする球面波が生じ、周囲に広がっていく現象を【偏光】という。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "可視光の波長域を広く均等に含む混合光は白っぽく見え、紫外線の波長は可視光より短い。小さな粒子に光が当たり周囲に広がる現象は散乱である。",
    "choiceExplanations": {
      "ア": "可視光の波長域を広く均等に含む混合光は白っぽく見え、紫外線の波長は可視光より短い。小さな粒子に光が当たり周囲に広がる現象は散乱である。",
      "イ": "可視域全体の混合光に関する㋐は妥当だが、㋒が説明する光の広がりは散乱である。",
      "ウ": "紫外線の波長が短いという㋑は妥当である。可視光の各波長をほぼ均等に混ぜると白っぽく見えるので㋐も含む。",
      "エ": "㋑は妥当だが、偏光は光の電場の振動方向に関する性質であり、粒子を中心に光が広がる散乱とは異なる。",
      "オ": "㋒は偏光ではなく散乱の説明である。光の色と紫外線の波長を述べた㋐と㋑が妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q17",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "必須問題",
      "直列回路の抵抗と電圧"
    ],
    "difficulty": 2,
    "question": "図のような回路において、電流計が3 Aを示しているとき、電源の電圧Vの値として最も妥当なのはどれか。ただし、電流計と電源の内部抵抗は無視するものとする。",
    "choices": {
      "ア": "6 V",
      "イ": "9 V",
      "ウ": "12 V",
      "エ": "15 V",
      "オ": "18 V"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "直列回路の合成抵抗は2＋4＝6 Ωである。全体に3 Aが流れるので、オームの法則から電源電圧は3×6＝18 Vとなる。",
    "choiceExplanations": {
      "ア": "6 Vは2 Ωの抵抗での電圧降下である。電源電圧には4 Ωの抵抗での電圧降下も加える。",
      "イ": "この値は抵抗を3 Ωとした場合に相当する。直列なので2 Ωと4 Ωを足し合わせて6 Ωである。",
      "ウ": "12 Vは4 Ωの抵抗に掛かる電圧であり、2 Ω側にも6 Vが掛かる。",
      "エ": "両抵抗には同じ3 Aが流れる。電源電圧は3 Aに2 Ωと4 Ωの和を掛けるので15 Vにはならない。",
      "オ": "直列回路の合成抵抗は2＋4＝6 Ωである。全体に3 Aが流れるので、オームの法則から電源電圧は3×6＝18 Vとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q17.webp"
    ],
    "imageAltTexts": [
      "2 Ωと4 Ωの抵抗および電流計を直列に接続した公式の回路図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q18",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "必須問題",
      "二進数の減算と十進数への変換"
    ],
    "difficulty": 2,
    "question": "2進数で表された110110−1101の計算結果を、10進数で表したものとして正しいのはどれか。",
    "choices": {
      "ア": "38",
      "イ": "39",
      "ウ": "40",
      "エ": "41",
      "オ": "42"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "110110₂＝32＋16＋4＋2＝54で、1101₂＝8＋4＋1＝13である。十進数で引くと54−13＝41となる。",
    "choiceExplanations": {
      "ア": "110110₂は32＋16＋4＋2＝54である。引く数の1101₂は16ではなく13である。",
      "イ": "1101₂の1が立っている桁の重みは8、4、1である。その合計13を54から引く。",
      "ウ": "110110₂の末尾の0の一つ上は2の桁なので、値は53でなく54になる。54から13を引くと41である。",
      "エ": "110110₂＝32＋16＋4＋2＝54で、1101₂＝8＋4＋1＝13である。十進数で引くと54−13＝41となる。",
      "オ": "引く数には1の位があるため、1101₂は12ではなく13である。54−12とした場合より1小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q19",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "必須問題",
      "フローチャートによる約数の計数"
    ],
    "difficulty": 2,
    "question": "図のフローチャートを実行したとき、出力されるbの値はいくらか。",
    "choices": {
      "ア": "5",
      "イ": "6",
      "ウ": "7",
      "エ": "8",
      "オ": "9"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "iを1から20まで動かし、20を割り切るときだけbを1増やす。1、2、4、5、10、20の6個なので、出力は6となる。",
    "choiceExplanations": {
      "ア": "ループ条件はi≦aなので、iが20のときにも判定する。20自身で割り切れる場合を忘れると1つ少なくなる。",
      "イ": "iを1から20まで動かし、20を割り切るときだけbを1増やす。1、2、4、5、10、20の6個なので、出力は6となる。",
      "ウ": "bが増えるのは割り切れる場合に限られる。20の約数を列挙すると6個である。",
      "エ": "20＝2²×5なので、約数での2の指数は3通り、5の指数は2通りである。積を取ると6通りだから8にはならない。",
      "オ": "繰り返し回数とbの値は異なる。全20回を調べるが、割り切れる6回だけbを増やす。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q19.webp"
    ],
    "imageAltTexts": [
      "20を1から順に割り切れるか調べて変数bを加算する手順の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q20",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "必須問題",
      "AND・OR・NOTを用いた複合論理回路"
    ],
    "difficulty": 2,
    "question": "図のような入力A、B、C、出力Fの論理回路がある。この論理回路の真理値表である表Ⅰの㋐〜㋗のうち、値が1であるものはいくつあるか。\nなお、表Ⅱは、AND回路、OR回路、NOT回路の図記号と真理値表を示している。",
    "choices": {
      "ア": "1",
      "イ": "2",
      "ウ": "3",
      "エ": "4",
      "オ": "5"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "上側の枝はA＝1かつB＝0、下側の枝はB＝C＝1のとき1になる。それぞれ残りの入力が0または1で、重複しないため計4通りである。",
    "choiceExplanations": {
      "ア": "上側の枝が1となるのはA＝1かつB＝0で、Cが0でも1でも成立する。この枝だけで少なくとも2通りある。",
      "イ": "A＝1かつB＝0の2通りに加え、B＝C＝1の場合は下側の枝が1になる。",
      "ウ": "B＝C＝1のときはAが0でも1でも下側の枝が1になる。上側の枝で成立する場合とは重ならない。",
      "エ": "上側の枝はA＝1かつB＝0、下側の枝はB＝C＝1のとき1になる。それぞれ残りの入力が0または1で、重複しないため計4通りである。",
      "オ": "B＝0ならA＝1の2通り、B＝1ならC＝1の2通りで出力が1になる。したがって5通りより1通り少ない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q20.webp",
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q20-fig2.webp"
    ],
    "imageAltTexts": [
      "入力A・B・Cと出力Fを接続する論理素子の公式回路図",
      "出力欄の真理値表とAND・OR・NOT各素子の図記号・真理値表の原表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q21",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "並列回路と複数電源の電流"
    ],
    "difficulty": 2,
    "question": "図のような回路において、電流Iの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "2 A",
      "イ": "4 A",
      "ウ": "6 A",
      "エ": "8 A",
      "オ": "10 A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "上下の母線間の電圧は12 Vなので、3 Ω枝は12/3＝4 Aとなる。中央の抵抗に掛かる電圧は12−2＝10 Vで10/5＝2 Aが流れ、電源からは計6 Aが流れる。",
    "choiceExplanations": {
      "ア": "2 Aは2 V電源と5 Ω抵抗を通る枝の電流である。12 V電源の直後ではもう一方の枝の電流も合わせる。",
      "イ": "4 Aは3 Ω抵抗の枝の電流であり、5 Ω抵抗の枝にも電流が流れる。",
      "ウ": "上下の母線間の電圧は12 Vなので、3 Ω枝は12/3＝4 Aとなる。中央の抵抗に掛かる電圧は12−2＝10 Vで10/5＝2 Aが流れ、電源からは計6 Aが流れる。",
      "エ": "中央の枝の電源は12 Vと同じ向きの電位差を単独でつくるため、抵抗に掛かる電圧は14 Vでなく10 Vである。",
      "オ": "10は中央の5 Ω抵抗に掛かる電圧の数値である。電流はこれを抵抗値で割り、右枝の電流を足して求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q21.webp"
    ],
    "imageAltTexts": [
      "12 V電源と2 V電源および5 Ω・3 Ωの二枝からなる回路の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q22",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "ジュール熱と電力量の単位"
    ],
    "difficulty": 2,
    "question": "5 Ωの抵抗に2 Aの電流を2分間流したとき、この抵抗で消費される電力量として最も妥当なのはどれか。",
    "choices": {
      "ア": "1.2 kW·s",
      "イ": "2.4 kW·s",
      "ウ": "6 kW·s",
      "エ": "12 kW·s",
      "オ": "24 kW·s"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "消費電力は2²×5＝20 Wである。2分＝120秒を掛けると2,400 W·s、つまり2.4 kW·sになる。",
    "choiceExplanations": {
      "ア": "抵抗での消費電力はI²Rで求める。Iを二乗せずに掛けると、正しい値の半分になる。",
      "イ": "消費電力は2²×5＝20 Wである。2分＝120秒を掛けると2,400 W·s、つまり2.4 kW·sになる。",
      "ウ": "2 Aを流すと抵抗に10 Vが掛かる。電力VIは20 Wなので、120秒で6 kW·sにはならない。",
      "エ": "12 kW·sとなるには20 Wを600秒間消費する必要があるが、指定時間は120秒である。",
      "オ": "2分を秒に直した値は120である。20 Wを掛けた2,400 W·sをkW·sで表すには1,000で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q23",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "直列コンデンサの合成容量と電荷"
    ],
    "difficulty": 2,
    "question": "図のような回路において、回路全体に蓄えられる電荷として最も妥当なのはどれか。",
    "choices": {
      "ア": "8 µC",
      "イ": "12 µC",
      "ウ": "18 µC",
      "エ": "24 µC",
      "オ": "36 µC"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "直列の合成容量Cは1/C＝1/3＋1/6より2 µFである。両端の電圧4 Vを掛けると、各コンデンサに蓄えられる電荷は8 µCとなる。",
    "choiceExplanations": {
      "ア": "直列の合成容量Cは1/C＝1/3＋1/6より2 µFである。両端の電圧4 Vを掛けると、各コンデンサに蓄えられる電荷は8 µCとなる。",
      "イ": "12 µCは3 µFのコンデンサに4 Vが直接掛かる場合の値である。直列なので各コンデンサに電圧が分かれる。",
      "ウ": "6 µFと3 µFが直列なら合成容量はどちらよりも小さい。18 µCには合成容量4.5 µFが必要で、条件を満たさない。",
      "エ": "24 µCは6 µFに電源電圧4 Vが全て掛かる場合の値で、この回路には3 µFも直列に入っている。",
      "オ": "36 µCは3と6を足した9 µFに4 Vを掛けた値であり、容量を足せるのは並列接続の場合である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q23.webp"
    ],
    "imageAltTexts": [
      "3 µFと6 µFのコンデンサを4 V電源に直列接続した原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q24",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "RL直列回路のインピーダンス"
    ],
    "difficulty": 2,
    "question": "交流回路に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のようなRL直列回路において、実効値が70 Vで角周波数ωの正弦波交流電圧を加えたとき、抵抗値R＝4 Ωの抵抗、誘導性リアクタンスωL＝3 Ωのコイルの合成インピーダンスの大きさは［㋐］であり、回路に流れる電流の実効値は［㋑］である。」",
    "choices": {
      "ア": "5 Ω・10 A",
      "イ": "5 Ω・14 A",
      "ウ": "6 Ω・10 A",
      "エ": "7 Ω・10 A",
      "オ": "7 Ω・14 A"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "抵抗成分と誘導性リアクタンス成分には90°の位相差があるので、大きさは√（4²＋3²）＝5 Ωとなる。実効電流は70/5＝14 Aである。",
    "choiceExplanations": {
      "ア": "合成インピーダンスの大きさは合っている。電流の実効値は70 Vを5 Ωで割るので14 Aである。",
      "イ": "抵抗成分と誘導性リアクタンス成分には90°の位相差があるので、大きさは√（4²＋3²）＝5 Ωとなる。実効電流は70/5＝14 Aである。",
      "ウ": "二つの成分を直角に持つ複素インピーダンスの大きさは5 Ωであり、70 Vを割った電流も10 Aにはならない。",
      "エ": "7 Ωは4 Ωと3 Ωをそのまま足した値である。実部と虚部として合成し、大きさを平方根で求める。",
      "オ": "電流の14 Aは合うが、その電流を生む合成インピーダンスの大きさは70/14＝5 Ωである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q24.webp"
    ],
    "imageAltTexts": [
      "交流電源70 Vに抵抗4 Ωと誘導性リアクタンス3 Ωを直列に接続した原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q25",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "電力",
    "topicTags": [
      "選択A（電気・情報系）",
      "三相デルタ結線の線電流"
    ],
    "difficulty": 2,
    "question": "図のような三相交流回路において、線間電圧の大きさがV＝200 V、各相の負荷が抵抗値R＝20.0 Ωの抵抗であるとき、線電流Iₗの大きさとして最も妥当なのはどれか。なお、必要であれば√3＝1.73を用いてよい。",
    "choices": {
      "ア": "3.33 A",
      "イ": "5.78 A",
      "ウ": "15.0 A",
      "エ": "17.3 A",
      "オ": "30.0 A"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "デルタ結線では各相に線間電圧200 Vが掛かり、相電流は200/20.0＝10 Aである。二つの相電流のベクトル差の大きさは√3倍なので17.3 Aとなる。",
    "choiceExplanations": {
      "ア": "デルタ結線の相電圧は線間電圧と等しい。相電流の段階で200/20＝10 Aとなり、線電流はこれより大きい。",
      "イ": "5.78 Aは200 Vを√3で割ってから抵抗値で割った値で、デルタ結線の相電圧にこの割り算は不要である。",
      "ウ": "線電流と相電流の比は平衡デルタ結線では√3である。相電流10 Aに1.73を掛けるので15.0 Aとはならない。",
      "エ": "デルタ結線では各相に線間電圧200 Vが掛かり、相電流は200/20.0＝10 Aである。二つの相電流のベクトル差の大きさは√3倍なので17.3 Aとなる。",
      "オ": "線電流には三相分の相電流の単純和を用いない。接続点の二つの相電流の位相差を考慮すると相電流の√3倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q25.webp"
    ],
    "imageAltTexts": [
      "線間電圧と抵抗Rをデルタ結線した三相負荷を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q26",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "電子技術",
    "topicTags": [
      "選択A（電気・情報系）",
      "n形半導体とキャリヤの再結合"
    ],
    "difficulty": 2,
    "question": "半導体に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n・多数キャリヤが電子である半導体を［㋐］といい、シリコン単結晶に混入した、価電子が5個のヒ素などの不純物をドナーと呼ぶ。\n・熱や光などのエネルギーによって発生した半導体内の正孔と自由電子は、一定時間のうちに互いに結合して消滅する。この現象を［㋑］という。",
    "choices": {
      "ア": "p形半導体・拡散",
      "イ": "p形半導体・キャリヤの再結合",
      "ウ": "n形半導体・ドリフト",
      "エ": "n形半導体・拡散",
      "オ": "n形半導体・キャリヤの再結合"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "5価の不純物を加えると余分な電子を供給するため、電子が多数キャリヤとなるn形になる。自由電子が正孔に入り対が消滅する現象が再結合である。",
    "choiceExplanations": {
      "ア": "電子が多数キャリヤとなるのはn形である。拡散はキャリヤが濃度の高い領域から低い領域へ移動する現象である。",
      "イ": "再結合は妥当だが、p形で多数を占めるキャリヤは正孔である。",
      "ウ": "n形は合っている。ドリフトは電界によってキャリヤが移動することを指す。",
      "エ": "n形は合うが、自由電子と正孔が互いに消滅するのは再結合であり、濃度差による拡散とは異なる。",
      "オ": "5価の不純物を加えると余分な電子を供給するため、電子が多数キャリヤとなるn形になる。自由電子が正孔に入り対が消滅する現象が再結合である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q27",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "電子回路",
    "topicTags": [
      "選択A（電気・情報系）",
      "演算増幅器の反転増幅率"
    ],
    "difficulty": 2,
    "question": "図のような演算増幅器を用いた回路における電圧増幅度vₒ/vᵢとして最も妥当なのはどれか。ただし、演算増幅器は理想的なものであり、演算増幅器の入力端子間に電位差はなく、各入力端子には電流が流れ込まないものとする。",
    "choices": {
      "ア": "−25",
      "イ": "−20",
      "ウ": "−15",
      "エ": "−10",
      "オ": "−5"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "非反転入力は接地されているので反転入力も0 Vとなる。入力点での電流のつり合いからvₒ/vᵢ＝−300/20＝−15である。",
    "choiceExplanations": {
      "ア": "反転増幅率の絶対値は帰還抵抗を入力抵抗で割った値である。300/20は25に達しない。",
      "イ": "入力端子に電流が流れ込まないので、入力抵抗と帰還抵抗の電流の大きさは等しい。300 kΩと20 kΩの比は20ではない。",
      "ウ": "非反転入力は接地されているので反転入力も0 Vとなる。入力点での電流のつり合いからvₒ/vᵢ＝−300/20＝−15である。",
      "エ": "負号は入力を反転するため妥当だが、抵抗値の比は300/20＝15である。",
      "オ": "−5とするには帰還抵抗が入力抵抗の5倍である必要がある。図の帰還抵抗は入力抵抗の15倍である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q27.webp"
    ],
    "imageAltTexts": [
      "入力抵抗20 kΩと帰還抵抗300 kΩを接続した反転増幅回路の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q28",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "制御",
    "topicTags": [
      "選択A（電気・情報系）",
      "正帰還回路の伝達関数"
    ],
    "difficulty": 2,
    "question": "図Ⅰのブロック線図において、各部の信号は式①、②のように表される。\ne＝x−y ……①\ny＝Ge ……②\n式①に式②を代入してeを消去し整理すると、図Ⅰのブロック線図の伝達関数y/xは式③のように求めることができる。\ny/x＝G/（1＋G） ……③\n図Ⅱのブロック線図の伝達関数y/xとして最も妥当なのはどれか。\nなお、図Ⅰと違い、フィードバック信号と入力信号とが加算されていることに注意すること。",
    "choices": {
      "ア": "1/（1−GH）",
      "イ": "G/（1−GH）",
      "ウ": "GH/（1−GH）",
      "エ": "1/（1＋GH）",
      "オ": "G/（1＋GH）"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図Ⅱの加算点でxにHyが足され、Gを通過してy＝G（x＋Hy）となる。yの項を左側に集めて割るとy/x＝G/（1−GH）である。",
    "choiceExplanations": {
      "ア": "分母は正帰還に対応する。入力を出力に結ぶ順方向の要素がGなので、分子もGとなる。",
      "イ": "図Ⅱの加算点でxにHyが足され、Gを通過してy＝G（x＋Hy）となる。yの項を左側に集めて割るとy/x＝G/（1−GH）である。",
      "ウ": "GHはループを一周したときの積であり、入力xが直接通るのはGだけなので分子にHは入らない。",
      "エ": "図Ⅱでは帰還信号を加えるため、yの項を移項すると分母は1−GHとなる。順方向のGも分子に必要である。",
      "オ": "分子Gは合っているが、分母に＋GHが現れるのは帰還信号を引く場合である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q28.webp",
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q28-fig2.webp"
    ],
    "imageAltTexts": [
      "負帰還を説明する公式ブロック線図Ⅰ",
      "加算点にGと帰還要素Hを接続した公式ブロック線図Ⅱ"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q29",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択A（電気・情報系）",
      "直線電流の磁界と右ねじの法則"
    ],
    "difficulty": 2,
    "question": "図のような直線状導体に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「図のような長い直線状導体において、電流を流したとき、この導体のまわりに図の矢印の向きに磁界が生じた。このとき、電流の向きは、図中［㋐］の向きである。また、磁界の大きさは、電流の大きさに［㋑］し、導体からの距離に［㋒］する。」",
    "choices": {
      "ア": "①・比例・反比例",
      "イ": "①・反比例・比例",
      "ウ": "②・比例・比例",
      "エ": "②・比例・反比例",
      "オ": "②・反比例・比例"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "右手の指を図の磁界に沿って曲げると、親指は下向きの②を指す。長い直線導体の磁界の強さは電流に比例し、軸からの距離に反比例する。",
    "choiceExplanations": {
      "ア": "磁界の強さと電流・距離との関係は合っている。図の磁界の向きに右手の指を曲げると親指は②を向く。",
      "イ": "①の向きでは磁界の向きが逆になる。磁界は電流が大きいほど強く、導体から離れるほど弱い。",
      "ウ": "電流は②の向きで、磁界は電流の大きさに比例するが、導体からの距離が増すと弱くなる。",
      "エ": "右手の指を図の磁界に沿って曲げると、親指は下向きの②を指す。長い直線導体の磁界の強さは電流に比例し、軸からの距離に反比例する。",
      "オ": "電流の向きは合うが、電流を増やすと磁界も強くなり、導体から遠くなると弱くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q29.webp"
    ],
    "imageAltTexts": [
      "導体の上下方向と導体周りの円形の磁界を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q30",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "電力",
    "topicTags": [
      "選択A（電気・情報系）",
      "火力発電の熱効率と発生電力量"
    ],
    "difficulty": 2,
    "question": "発熱量が2.0×10⁴ kJ/kgの燃料を1日で4.0×10⁵ kg使用する、発電端熱効率が40％の火力発電所がある。この発電所により30日間で発生する電力量［kW·h］として最も妥当なのはどれか。",
    "choices": {
      "ア": "2.7×10⁷ kW·h",
      "イ": "9.6×10⁷ kW·h",
      "ウ": "2.7×10⁸ kW·h",
      "エ": "2.7×10¹⁰ kW·h",
      "オ": "9.6×10¹⁰ kW·h"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "30日分の発電エネルギーは2.0×10⁴×4.0×10⁵×30×0.40＝9.6×10¹⁰ kJである。1 kW·h＝3,600 kJなので割ると約2.7×10⁷ kW·hになる。",
    "choiceExplanations": {
      "ア": "30日分の発電エネルギーは2.0×10⁴×4.0×10⁵×30×0.40＝9.6×10¹⁰ kJである。1 kW·h＝3,600 kJなので割ると約2.7×10⁷ kW·hになる。",
      "イ": "9.6×10⁷は発電エネルギー9.6×10¹⁰ kJを1,000で割った数である。kW·hへの換算には3,600で割る必要がある。",
      "ウ": "燃料の30日間の使用量に発熱量を掛けてから効率の0.40を掛ける。得た9.6×10¹⁰ kJを3,600で割ると10⁷の桁である。",
      "エ": "1 kW·hは3,600,000 Jであり、問題のエネルギー単位はJではなくkJである。換算分母は3,600 kJである。",
      "オ": "9.6×10¹⁰は発電エネルギーをkJで表した数である。kW·hに直すと数値は3,600分の1になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q31",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "小数点を含む十六進数の変換"
    ],
    "difficulty": 2,
    "question": "16進数で表された2F.Cを10進数に変換した値として正しいのはどれか。",
    "choices": {
      "ア": "45.875",
      "イ": "46.75",
      "ウ": "46.875",
      "エ": "47.625",
      "オ": "47.75"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "2は16の位、Fは一の位で、整数部は2×16＋15＝47である。小数第1位のCは12/16＝0.75なので、全体は47.75となる。",
    "choiceExplanations": {
      "ア": "Fは十進数の15であり、整数部は2×16＋15＝47となるため、全体が45台にはならない。",
      "イ": "小数部は0.75で合っているが、整数部の一の位の数字Fは14でなく15である。",
      "ウ": "整数部は47であり、小数部のCは12/16＝0.75である。整数部と小数部がどちらもこの値とは異なる。",
      "エ": "整数部は合っている。小数第1位のCは十進数で12なので、小数部は12/16＝0.75となる。",
      "オ": "2は16の位、Fは一の位で、整数部は2×16＋15＝47である。小数第1位のCは12/16＝0.75なので、全体は47.75となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q32",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "論理式の整理と吸収則"
    ],
    "difficulty": 2,
    "question": "論理式A・B̄＋A・B＋Ā・Bと等価なものは次のうちではどれか。ただし、「P̄」は論理変数Pの否定を、「＋」は論理和を、「・」は論理積を表すものとする。",
    "choices": {
      "ア": "A",
      "イ": "B",
      "ウ": "Ā＋B",
      "エ": "A＋B̄",
      "オ": "A＋B"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "最初の2項はA・（B̄＋B）＝Aにまとまる。残るA＋Ā・Bは、A＝1またはB＝1のとき1になるためA＋Bと等価である。",
    "choiceExplanations": {
      "ア": "A＝0、B＝1のとき元の式はĀ・Bにより1となる。Aだけなら0となるため同値ではない。",
      "イ": "A＝1、B＝0では元の式のA・B̄が1になる。Bだけではこの場合を表せない。",
      "ウ": "A＝B＝0のときこの選択肢は1になるが、元の式では三つの積がすべて0である。",
      "エ": "A＝0、B＝1で元の式は1だが、A＋B̄では0になる。",
      "オ": "最初の2項はA・（B̄＋B）＝Aにまとまる。残るA＋Ā・Bは、A＝1またはB＝1のとき1になるためA＋Bと等価である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q33",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "半加算器二つによる全加算器"
    ],
    "difficulty": 2,
    "question": "1 bitの数A、Bを入力すると、その和Sと桁上がりCを出力する論理回路を半加算器という。図Ⅰは半加算器の論理回路を示し、表は半加算器の真理値表である。\nいま、半加算器とOR回路を用いて、図Ⅱのような全加算器を構成した。この全加算器に以下の①、②の値を入力した場合の出力Sₒ、Cₒの組合せとして正しいのはどれか。\n① Aᵢ＝0、Bᵢ＝0、Cᵢ＝1\n② Aᵢ＝1、Bᵢ＝1、Cᵢ＝0\nただし、図Ⅱの「HA」は図Ⅰで示した半加算器を示す。",
    "choices": {
      "ア": "① Cₒ＝1、Sₒ＝0　② Cₒ＝0、Sₒ＝1",
      "イ": "① Cₒ＝1、Sₒ＝0　② Cₒ＝1、Sₒ＝0",
      "ウ": "① Cₒ＝0、Sₒ＝1　② Cₒ＝0、Sₒ＝1",
      "エ": "① Cₒ＝0、Sₒ＝1　② Cₒ＝1、Sₒ＝0",
      "オ": "① Cₒ＝0、Sₒ＝1　② Cₒ＝1、Sₒ＝1"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "①は0＋0＋1＝1なのでCₒ＝0、Sₒ＝1になる。②は1＋1＋0＝2で二進数の10に当たるため、Cₒ＝1、Sₒ＝0となる。",
    "choiceExplanations": {
      "ア": "①の和は1で桁上がりがなく、②の和は2なので下位ビットが0で桁上がりが1になる。",
      "イ": "②は合っているが、①の最初の半加算器は和・桁上がりがともに0で、次の半加算器でCᵢ＝1が和に反映される。",
      "ウ": "①は合っている。②ではAᵢとBᵢがともに1なので、最初の半加算器で桁上がりが出る。",
      "エ": "①は0＋0＋1＝1なのでCₒ＝0、Sₒ＝1になる。②は1＋1＋0＝2で二進数の10に当たるため、Cₒ＝1、Sₒ＝0となる。",
      "オ": "①と②の桁上がりは合う。ただし、②で下位桁まで1なら二進数で11となり、入力3値の合計2に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q33.webp",
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q33-fig2.webp"
    ],
    "imageAltTexts": [
      "半加算器の論理回路と真理値表を並べた公式の図Ⅰと表",
      "二つの半加算器とOR回路を用いた全加算器の公式の図Ⅱ"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q34",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "主記憶装置・制御装置・演算装置"
    ],
    "difficulty": 2,
    "question": "コンピュータの基本構成に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「コンピュータで処理するプログラムは、入力装置により入力され、［㋐］に格納される。このプログラムは［㋑］によって［㋐］から順次取り出されて解読され、それに応じて各装置に動作指令が出される。この指令により、データは［㋒］に移されて演算が行われ、結果は必要に応じて出力装置に送られて外部に出力される。」",
    "choices": {
      "ア": "主記憶装置・制御装置・演算装置",
      "イ": "主記憶装置・補助記憶装置・演算装置",
      "ウ": "補助記憶装置・演算装置・制御装置",
      "エ": "補助記憶装置・制御装置・主記憶装置",
      "オ": "制御装置・演算装置・主記憶装置"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "実行中のプログラムは主記憶装置に置き、制御装置が命令を取り出して解読する。演算装置は指令に応じてデータの計算や論理演算などを行う。",
    "choiceExplanations": {
      "ア": "実行中のプログラムは主記憶装置に置き、制御装置が命令を取り出して解読する。演算装置は指令に応じてデータの計算や論理演算などを行う。",
      "イ": "㋐と㋒は合うが、補助記憶装置はデータを長期保存する装置で、実行する命令の解読は制御装置の役割である。",
      "ウ": "命令が順次取り出されるのは主記憶装置である。演算装置と制御装置の役割も逆になっている。",
      "エ": "制御装置は㋑に入るが、プログラムは主記憶装置から読み出し、実際の計算は演算装置で行う。",
      "オ": "制御装置は命令の読み出しと解読、主記憶装置は処理中の命令とデータの保持を担う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q35",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "通信",
    "topicTags": [
      "選択A（電気・情報系）",
      "ハブ・リング型LAN・ATM"
    ],
    "difficulty": 2,
    "question": "LANに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n・［㋐］は、ツイストペアケーブルを集める集線装置で、スイッチング［㋐］が主流である。\n・［㋑］LANでは、全てのコンピュータを環状に接続し、データが一方向に伝送されるので高速なデータのやり取りが可能である。\n・［㋒］方式は、情報をセルと呼ばれる固定長の伝送単位に分割して、ヘッダの宛先情報に基づいて伝送する方式である。",
    "choices": {
      "ア": "ルータ・リング型・TDMA",
      "イ": "ルータ・スター型・ATM",
      "ウ": "ハブ・リング型・ATM",
      "エ": "ハブ・スター型・TDMA",
      "オ": "LANアダプタ・バス型・ATM"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ケーブルを集める機器がハブ、端末を環状につなぐ形態がリング型LANである。固定長セルのヘッダに基づいて伝送する方式がATMである。",
    "choiceExplanations": {
      "ア": "リング型は環状の構成に合う。ルータはネットワーク間で通信を中継し、TDMAは時間を分けて通信路を共用する方式である。",
      "イ": "ATMは固定長セルを使うが、端末が環状に並ぶのはリング型で、スター型は中央の機器から放射状に接続する。",
      "ウ": "ケーブルを集める機器がハブ、端末を環状につなぐ形態がリング型LANである。固定長セルのヘッダに基づいて伝送する方式がATMである。",
      "エ": "ハブは妥当だが、環状はリング型である。TDMAは時間スロットを割り当てる多元接続方式である。",
      "オ": "ATMは妥当だが、LANアダプタは個々の端末をネットワークにつなぐ機器である。バス型は一本の共通伝送路を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q36",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "通信",
    "topicTags": [
      "選択A（電気・情報系）",
      "標本化周波数とサンプリング間隔"
    ],
    "difficulty": 2,
    "question": "アナログ信号の最高周波数の2倍以上のサンプリング周波数で標本化を行えば、標本化された信号から元のアナログ信号を再現できる。これを標本化定理という。\nいま、最高周波数が2500 Hzのアナログ信号を標本化することを考える。元のアナログ信号を再現するために満たすべきサンプリング時間の条件として最も妥当なのはどれか。\nただし、サンプリング時間とは、標本化を行う時間間隔であり、サンプリング周波数の逆数で表される。",
    "choices": {
      "ア": "2×10⁻⁴ s以上",
      "イ": "4×10⁻⁴ s以上",
      "ウ": "8×10⁻⁴ s以上",
      "エ": "2×10⁻⁴ s以下",
      "オ": "8×10⁻⁴ s以下"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "設問の条件では最高周波数2500 Hzの2倍である5000 Hz以上で標本化する。時間間隔はその逆数なので1/5000＝2×10⁻⁴ s以下である。",
    "choiceExplanations": {
      "ア": "2×10⁻⁴ sは5000 Hzに対応するが、間隔がこれより長いと周波数は5000 Hzを下回る。",
      "イ": "4×10⁻⁴ sの逆数は信号自体の最高周波数2500 Hzである。条件ではその2倍以上の周波数が必要である。",
      "ウ": "8×10⁻⁴ s以上の間隔ではサンプリング周波数は1250 Hz以下となり、最高周波数の2倍より低い。",
      "エ": "設問の条件では最高周波数2500 Hzの2倍である5000 Hz以上で標本化する。時間間隔はその逆数なので1/5000＝2×10⁻⁴ s以下である。",
      "オ": "8×10⁻⁴ sでも条件に含まれてしまうが、その間隔では1250 Hzでしか標本化できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q37",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報セキュリティ",
    "topicTags": [
      "選択A（電気・情報系）",
      "HTTPS・公開鍵暗号・放送の限定受信"
    ],
    "difficulty": 2,
    "question": "情報セキュリティに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n・インターネットでWWWを利用する際に、https://で始まるURLにアクセスすると、ウェブブラウザに鍵マークが表示される。これは、［㋐］と呼ばれる通信プロトコルにより、サーバとユーザとの間で安全が確保された通信が行われていることを示している。\n・公開鍵暗号方式は、暗号化と復号で用いる鍵が［㋑］方式であり、暗号鍵は、誰でも知ることができるようにサーバ上に公開されている。\n・我が国の地上デジタル放送の信号は、［㋒］により暗号化されている。",
    "choices": {
      "ア": "SSL・同じ・OFDM",
      "イ": "SSL・異なる・CAS",
      "ウ": "SSL・異なる・OFDM",
      "エ": "IPsec・同じ・CAS",
      "オ": "IPsec・異なる・OFDM"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "設問はHTTPSの暗号通信をSSLと表記しており、現在通常使われるプロトコルは後継のTLSである。公開鍵暗号は異なる鍵の組を使い、CASは放送を限定受信する仕組みである。",
    "choiceExplanations": {
      "ア": "暗号化と復号に同じ鍵を用いるのは共通鍵暗号である。OFDMは地上デジタル放送などに用いる変調方式である。",
      "イ": "設問はHTTPSの暗号通信をSSLと表記しており、現在通常使われるプロトコルは後継のTLSである。公開鍵暗号は異なる鍵の組を使い、CASは放送を限定受信する仕組みである。",
      "ウ": "公開鍵暗号では異なる鍵を使うが、OFDMはデータを複数の副搬送波で伝える方式で、放送の限定受信にはCASを用いる。",
      "エ": "CASは合うが、IPsecはIP層で通信を保護する仕組みである。公開鍵暗号では暗号化と復号の鍵が異なる。",
      "オ": "公開鍵暗号の特徴は合う。HTTPSの暗号通信は通常TLSで行い、OFDMは暗号化による限定受信とは別の技術である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q38",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "データベース",
    "topicTags": [
      "選択A（電気・情報系）",
      "SELECT・WHERE・ORDER BY"
    ],
    "difficulty": 2,
    "question": "次の文は、表Ⅰの関係データベースから表Ⅱのような表を取り出すSQL文である。㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのは次のうちではどれか。\n［㋐］ * FROM 表Ⅰ ［㋑］ ［㋒］ 年齢",
    "choices": {
      "ア": "CREATE ／ WHERE 職業 <> '会社員' AND 年齢 > 23 ／ ORDER BY",
      "イ": "CREATE ／ WHERE 住所 <> '埼玉県' AND 職業 <> '会社員' ／ GROUP BY",
      "ウ": "SELECT ／ WHERE 職業 <> '会社員' AND 年齢 > 23 ／ ORDER BY",
      "エ": "SELECT ／ WHERE 職業 <> '会社員' AND 年齢 > 23 ／ GROUP BY",
      "オ": "SELECT ／ WHERE 住所 <> '埼玉県' AND 職業 <> '会社員' ／ ORDER BY"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "SELECT *で全列を取り出し、WHEREで会社員以外かつ23歳より上の行を残す。ORDER BY 年齢で昇順に並び、24歳、30歳、61歳となる。",
    "choiceExplanations": {
      "ア": "行の抽出条件と並べ替えは合うが、既存の表からデータを取り出す命令はCREATEでなくSELECTである。",
      "イ": "CREATEは表などを作る命令であり、抽出にはSELECTを使う。表Ⅱでは住所でなく年齢で絞り、GROUP BYでなくORDER BYで順序を指定する。",
      "ウ": "SELECT *で全列を取り出し、WHEREで会社員以外かつ23歳より上の行を残す。ORDER BY 年齢で昇順に並び、24歳、30歳、61歳となる。",
      "エ": "抽出条件は合うが、GROUP BYは同じ値の行のグループ化に使う。年齢順に並べるにはORDER BYが必要である。",
      "オ": "埼玉県以外かつ会社員以外では、18歳の行なども残る。表Ⅱにするには職業に加えて23歳を超えるという条件を指定する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q38.webp"
    ],
    "imageAltTexts": [
      "抽出前の表Ⅰと抽出・整列後の表Ⅱを示した公式原表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q39",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "ループで求めるフィボナッチ数"
    ],
    "difficulty": 2,
    "question": "図のフローチャートを実行したとき、出力されるSの値はいくらか。",
    "choices": {
      "ア": "2",
      "イ": "5",
      "ウ": "8",
      "エ": "13",
      "オ": "17"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最初に0と1を足して1となり、その直後にaとbがともに1になる。iが0から4までの5回でSは1、2、3、5、8と変化するため、出力は8である。",
    "choiceExplanations": {
      "ア": "2は2回目の加算後の値である。ループ変数iは5になるまで増えるので、さらに3回加算する。",
      "イ": "5は4回目の加算後の値である。この時点ではi＝4でi＜nを満たすため、もう一度加算する。",
      "ウ": "最初に0と1を足して1となり、その直後にaとbがともに1になる。iが0から4までの5回でSは1、2、3、5、8と変化するため、出力は8である。",
      "エ": "13は6回目の加算を行った場合の値である。実際には5回目の後にi＝5となり、ループを出る。",
      "オ": "Sには更新前のaとbの和が入る。5回分を追うと1、2、3、5、8となり、17にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q39.webp"
    ],
    "imageAltTexts": [
      "二変数の和と値の更新を5回繰り返す公式フローチャート"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q40",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "情報",
    "topicTags": [
      "選択A（電気・情報系）",
      "二分探索の比較回数"
    ],
    "difficulty": 2,
    "question": "二分探索に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「二分探索とは、昇順又は降順に並んでいるデータを対象に、データを探し出す探索法である。図Ⅰは、7個のデータの中から『8』を二分探索で探す様子を示している。探索範囲の中央値と目的のデータとを比較し、一致していれば探索終了、一致していなければ、その大小関係に応じて、今回の探索範囲のうち比較対象としたデータより大きい又は小さいデータを次の探索範囲として、同様の処理を繰り返す。図Ⅰでは、3回の比較で探索が終了している。\nこのような二分探索を用いて、図Ⅱのような15個のデータから『2』を探す場合、探索が終了するまでの比較回数は［㋐］回である。\nまた、1023個のデータから同様に二分探索でデータを探す場合、探索が終了するまでの比較回数は最小で1回、最大で［㋑］回である（ただし、目的のデータは1023個のデータに含まれているものとする。）。」",
    "choices": {
      "ア": "2回・9回",
      "イ": "2回・10回",
      "ウ": "3回・9回",
      "エ": "3回・10回",
      "オ": "3回・11回"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "図Ⅱは19、6、2の順に比較するため3回で終わる。1023＝2¹⁰−1であり、最悪時は1要素になるまで範囲を9回絞って最後に比較するので最大10回である。",
    "choiceExplanations": {
      "ア": "図Ⅱの最初の中央値は19、次の中央値は6である。どちらも2より大きいため2回では探し出せない。",
      "イ": "最大10回は合うが、図Ⅱでは19と6を調べた後、残る1、2、4の中央にある2と比較する必要がある。",
      "ウ": "図Ⅱでは3回で見つかる。1023個は2¹⁰−1個なので、最悪時は9回の比較後にも最後の候補が残る。",
      "エ": "図Ⅱは19、6、2の順に比較するため3回で終わる。1023＝2¹⁰−1であり、最悪時は1要素になるまで範囲を9回絞って最後に比較するので最大10回である。",
      "オ": "3回は合うが、1023個なら最悪でも10回目に最後の一要素と比較する。11回目は不要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q40.webp",
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q40-fig2.webp"
    ],
    "imageAltTexts": [
      "七つの要素から8を見つける三段階の公式の図Ⅰ",
      "比較回数を問う15個の昇順データを並べた公式の図Ⅱ"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q41",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "引張試験・衝撃試験・疲労限度"
    ],
    "difficulty": 2,
    "question": "材料の機械的性質に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 材料の引張強さは引張試験によって知ることができ、引張試験において、試験片のくびれ部の試験開始時の断面積に対して破断後の断面積がどのくらい減少したかを表す値を伸び率という。\n㋑ 材料の粘り強さを脆性というのに対して、材料のもろさを靭性という。靭性はシャルピー衝撃試験やアイゾット衝撃試験のような衝撃試験を行って調べる。\n㋒ 材料の疲労に対する強度は疲労試験によって知ることができる。疲労試験において、繰返し数を増やしても破壊が起こらない応力振幅の上限値のことを疲労限又は疲労限度という。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "疲労試験では繰返し応力を与えて破壊までの回数を調べる。繰返しを増やしても疲労破壊が生じない応力振幅の上限が疲労限度である。",
    "choiceExplanations": {
      "ア": "破断部の断面積の減少率は絞りである。伸び率は標点間の長さがどれだけ増加したかで測る。",
      "イ": "㋐は長さの伸びと断面積の絞りを混同している。㋑は粘り強さと脆さの名称を逆にしている。",
      "ウ": "㋒は妥当だが、㋐の断面積に基づく割合は伸び率ではなく絞りである。",
      "エ": "㋒は妥当である。㋑の粘り強さは靭性であり、ほとんど変形せずに壊れやすい性質が脆性である。",
      "オ": "疲労試験では繰返し応力を与えて破壊までの回数を調べる。繰返しを増やしても疲労破壊が生じない応力振幅の上限が疲労限度である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q42",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "侵入形固溶体と置換形固溶体"
    ],
    "difficulty": 2,
    "question": "合金に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「液相状態の合金では、成分は互いによく溶け合う。しかし、凝固した固相状態の合金では、成分は溶け合うとは限らない。固相で溶け合っている状態を［㋐］といい、［㋐］をつくる主成分となる金属の原子を溶媒原子、その中で溶ける原子を溶質原子という。\n［㋐］には、溶質原子が溶媒原子のすき間に入り込んでつくられる［㋑］と溶質原子が溶媒原子と入れ替わってつくられる［㋒］がある。」",
    "choices": {
      "ア": "金属間化合物・置換形固溶体・侵入形固溶体",
      "イ": "金属間化合物・三元合金・四元合金",
      "ウ": "固溶体・侵入形固溶体・置換形固溶体",
      "エ": "二元合金・置換形固溶体・侵入形固溶体",
      "オ": "二元合金・三元合金・四元合金"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "成分原子が固相で溶け合う状態を固溶体という。溶質原子が結晶格子のすき間に入るのが侵入形、溶媒の格子点を占めるのが置換形である。",
    "choiceExplanations": {
      "ア": "固相で成分が溶け合うのが固溶体である。すき間に入る場合と原子が入れ替わる場合の名称もこの選択肢は逆である。",
      "イ": "金属間化合物は特定の元素間の規則的な配列を示す化合物である。三元や四元は成分元素の数による分類である。",
      "ウ": "成分原子が固相で溶け合う状態を固溶体という。溶質原子が結晶格子のすき間に入るのが侵入形、溶媒の格子点を占めるのが置換形である。",
      "エ": "二元合金とは成分が二つの合金を意味する。格子間に入る場合が侵入形で、格子点の原子を置き換える場合が置換形である。",
      "オ": "二元・三元・四元という区分は元素の数を示す。設問は固相での溶け合い方と、結晶中の原子の位置を問うている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q43",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "機械構造用炭素鋼の材料記号"
    ],
    "difficulty": 2,
    "question": "次の材料を表す記号のうち、機械構造用炭素鋼鋼材を表しているものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "SS400",
      "イ": "S45C",
      "ウ": "SK120",
      "エ": "SKH3",
      "オ": "FC200"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "S45Cは機械構造用炭素鋼鋼材の記号で、45は炭素含有量が質量比でおよそ0.45％であることを表す。",
    "choiceExplanations": {
      "ア": "SS400は一般構造用圧延鋼材であり、数字は引張強さの区分を表す。",
      "イ": "S45Cは機械構造用炭素鋼鋼材の記号で、45は炭素含有量が質量比でおよそ0.45％であることを表す。",
      "ウ": "SK120は炭素工具鋼鋼材であり、数字は炭素含有量の規格に対応している。",
      "エ": "SKH3は高速度工具鋼鋼材で、切削工具などに用いる種類である。",
      "オ": "FC200はねずみ鋳鉄品の記号であり、機械構造用の炭素鋼鋼材とは規格が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q44",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "機械材料",
    "topicTags": [
      "選択B（機械系）",
      "繊維強化プラスチックと繊維強化金属"
    ],
    "difficulty": 2,
    "question": "複合材料に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「複合材料は［㋐］種類以上の異なる材料を組み合わせて、それぞれの材料にはない優れた性質をもたせたものである。プラスチック系の母材（マトリックス）に強化材（強化繊維）を複合させたものは［㋑］と呼ばれており、比強度や耐食性に優れている。一方、アルミニウムやマグネシウム、チタンなどの母材に強化材を複合させたものは［㋒］と呼ばれており、航空機関係部品や自動車部品に利用されている。［㋒］は母材が金属であるため、［㋓］や高強度といった特徴をもつものがある。」",
    "choices": {
      "ア": "2・粒子分散強化複合材料・積層強化複合材料・耐熱性",
      "イ": "2・粒子分散強化複合材料・無アルカリ繊維・絶縁性",
      "ウ": "2・繊維強化プラスチック（FRP）・繊維強化金属（FRM）・耐熱性",
      "エ": "3・繊維強化プラスチック（FRP）・繊維強化金属（FRM）・絶縁性",
      "オ": "3・繊維強化プラスチック（FRP）・アラミド繊維・絶縁性"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "複合材料は二種類以上の材料で構成する。樹脂母材に繊維ならFRP、金属母材に繊維ならFRMであり、FRMには耐熱性と強度を兼ね備えるものがある。",
    "choiceExplanations": {
      "ア": "二種類以上という条件は合うが、㋑は繊維で強化された樹脂である。粒子を分散させる強化とは区別する。",
      "イ": "金属を母材とする複合材料は繊維強化金属などである。無アルカリ繊維は強化繊維の種類であり、金属を母材とする材料の名称にはならない。",
      "ウ": "複合材料は二種類以上の材料で構成する。樹脂母材に繊維ならFRP、金属母材に繊維ならFRMであり、FRMには耐熱性と強度を兼ね備えるものがある。",
      "エ": "FRPとFRMの名称は合うが、二種類でも複合材料は成り立つ。また、金属母材には一般に導電性がある。",
      "オ": "アラミド繊維は強化材に用いられることがある繊維の名である。金属母材を繊維で補強した製品はFRMという。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q45",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "機械加工",
    "topicTags": [
      "選択B（機械系）",
      "切りくずの流れ形とせん断形"
    ],
    "difficulty": 2,
    "question": "切削加工による切りくずに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 切削加工によって生じる切りくずの形は、切削条件の違いで変化することはない。\n㋑ 連続して流れるように出てくる切りくずのことを、流れ形切りくずという。\n㋒ せん断面に沿って生じる断続的なせん断によって生成される短い切りくずのことを、せん断形切りくずという。",
    "choices": {
      "ア": "㋐",
      "イ": "㋑",
      "ウ": "㋐、㋑",
      "エ": "㋑、㋒",
      "オ": "㋐、㋑、㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "流れ形は材料が連続的に変形して長く流れ出す。せん断形はせん断が断続的に起こり、短く分かれた切りくずになる。",
    "choiceExplanations": {
      "ア": "切りくずの形は切削速度、切込み、工具形状や被削材の性質などによって変わる。",
      "イ": "㋑は妥当だが、断続的なせん断で分かれ短くなる㋒のせん断形も妥当である。",
      "ウ": "㋑は妥当である。流れ形からせん断形に変わる場合もあり、条件で変化しないとする㋐は誤りである。",
      "エ": "流れ形は材料が連続的に変形して長く流れ出す。せん断形はせん断が断続的に起こり、短く分かれた切りくずになる。",
      "オ": "㋑と㋒は妥当だが、切削条件で切りくずの形は変わるので㋐を含めない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q46",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "機械加工",
    "topicTags": [
      "選択B（機械系）",
      "研削砥石の目こぼれ・目つぶれ・目づまり"
    ],
    "difficulty": 2,
    "question": "次の表は、砥石面の不具合について整理したものである。表中の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "目つぶれ・目こぼれ・目づまり",
      "イ": "目つぶれ・目づまり・目こぼれ",
      "ウ": "目こぼれ・目つぶれ・目づまり",
      "エ": "目こぼれ・目づまり・目つぶれ",
      "オ": "目づまり・目つぶれ・目こぼれ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "砥粒が過度に抜け落ちるのが目こぼれで、摩耗した砥粒が残って切れなくなるのが目つぶれである。気孔が切りくずでふさがるのが目づまりである。",
    "choiceExplanations": {
      "ア": "㋒は合うが、㋐では結合材が壊れて砥粒が脱落しており、目こぼれである。砥粒が摩耗しても残る㋑が目つぶれである。",
      "イ": "目つぶれは先端が摩耗した砥粒が残る状態をいう。気孔を切りくずが覆う現象は目づまりである。",
      "ウ": "砥粒が過度に抜け落ちるのが目こぼれで、摩耗した砥粒が残って切れなくなるのが目つぶれである。気孔が切りくずでふさがるのが目づまりである。",
      "エ": "㋐は合うが、㋑は砥粒が摩耗した目つぶれであり、㋒では切りくずが気孔を塞いでいるため目づまりである。",
      "オ": "㋑は合う。結合材の破損で砥粒が抜ける㋐が目こぼれ、切りくずが詰まる㋒が目づまりである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q46.webp"
    ],
    "imageAltTexts": [
      "砥粒の脱落・摩耗・切りくずの付着を対比する公式の表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q47",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "機械加工",
    "topicTags": [
      "選択B（機械系）",
      "放電・電子ビーム・液体ジェット・レーザ加工"
    ],
    "difficulty": 2,
    "question": "特殊加工に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n・放電加工は、絶縁性のある加工液中で［㋐］を繰り返し、それによって発生した熱を利用して工作物を溶融・蒸発させる加工方法である。\n・［㋑］は、真空中で高いエネルギーの電子ビームを工作物に照射し、電子のもつ運動エネルギーを熱エネルギーに変換させることで、工作物を加熱し、溶融・蒸発させる加工方法である。\n・［㋒］は、液体を高速で工作物に噴射し、その運動エネルギーを利用して切断や穴あけを行う加工方法である。\n・レーザ加工は、レーザ光の光エネルギーを利用する加工方法であり、［㋓］やCO₂レーザなどが用いられる。",
    "choices": {
      "ア": "アーク放電・電子ビーム加工・液体ジェット加工・YAGレーザ",
      "イ": "アーク放電・ショットピーニング加工・液体ジェット加工・YAGレーザ",
      "ウ": "アーク放電・ショットピーニング加工・熱間静水圧プレス法・イオンビーム",
      "エ": "振動・電子ビーム加工・熱間静水圧プレス法・YAGレーザ",
      "オ": "振動・ショットピーニング加工・液体ジェット加工・イオンビーム"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "放電加工は断続的な放電の熱を使い、電子ビーム加工は電子を照射する。高速の液体はジェット加工に、YAGレーザは光を使うレーザ加工に対応する。",
    "choiceExplanations": {
      "ア": "放電加工は断続的な放電の熱を使い、電子ビーム加工は電子を照射する。高速の液体はジェット加工に、YAGレーザは光を使うレーザ加工に対応する。",
      "イ": "ショットピーニング加工は粒を表面に衝突させる機械的処理である。㋑では電子ビームを照射して加熱する。",
      "ウ": "熱間静水圧プレス法は高温・高圧で材料を緻密化する方法である。液体を噴射する切断やレーザ光による加工とは原理が異なる。",
      "エ": "電子ビーム加工とYAGレーザは対応するが、放電加工は振動ではなく放電の熱を使い、㋒は液体ジェット加工である。",
      "オ": "液体ジェット加工は対応する。イオンビームは荷電粒子の流れで、YAGやCO₂のレーザ光とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q48",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "直交する力の合成"
    ],
    "difficulty": 2,
    "question": "図のように、大きさが60 Nと20 Nの二つの力が互いに垂直になるように点Oに作用しているとき、二つの力の合力の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "20√10 N",
      "イ": "80√3 N",
      "ウ": "120√2 N",
      "エ": "1.2×10³ N",
      "オ": "4.0×10³ N"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "二つの力は直交しているので、二乗和の平方根が合力になる。√（60²＋20²）＝√4000＝20√10 Nである。",
    "choiceExplanations": {
      "ア": "二つの力は直交しているので、二乗和の平方根が合力になる。√（60²＋20²）＝√4000＝20√10 Nである。",
      "イ": "80 Nは両者が同じ方向の場合の合計であり、これに√3を掛けると最大の80 Nを超える。",
      "ウ": "120√2 Nは二つの力の単純和80 Nより大きい。直交時は長方形の対角線の長さで求める。",
      "エ": "1,200は60×20の値であるが、力の大きさを掛け合わせても合力の大きさにはならない。",
      "オ": "4,000は60²＋20²の値であり、合力の大きさの二乗に当たる。平方根を取る必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q48.webp"
    ],
    "imageAltTexts": [
      "点Oに直交して作用する60 Nの水平力と20 Nの鉛直力を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q49",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "等加速度で減速する車の制動距離"
    ],
    "difficulty": 2,
    "question": "水平な道路上を時速72.0 kmで走る自動車にブレーキをかけたところ、20.0秒間で停止した。このとき、ブレーキをかけてから停止するまで一定の加速度が水平方向に生じていたものとすると、ブレーキをかけ始めた地点から、自動車が停止した地点までの距離として最も妥当なのはどれか。",
    "choices": {
      "ア": "50.0 m",
      "イ": "100 m",
      "ウ": "200 m",
      "エ": "300 m",
      "オ": "400 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "初速は72.0÷3.6＝20.0 m/sで、終速は0である。等加速度なので平均速度10.0 m/sに20.0秒を掛けて200 mとなる。",
    "choiceExplanations": {
      "ア": "初速72.0 km/hは20.0 m/sであり、一定の割合で速度が減ると20秒の平均速度は10.0 m/sになる。",
      "イ": "平均速度は初速と終速の平均である。10.0 m/sで20.0秒進んだ分に当たるので100 mより長い。",
      "ウ": "初速は72.0÷3.6＝20.0 m/sで、終速は0である。等加速度なので平均速度10.0 m/sに20.0秒を掛けて200 mとなる。",
      "エ": "300 mには20秒間の平均速度15 m/sが必要だが、等加速度で20 m/sから停止すると平均は10 m/sである。",
      "オ": "400 mは初速20 m/sのまま20秒進んだ距離である。速度が直線的に減るので距離はその半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q50",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "物体を引き上げる仕事率"
    ],
    "difficulty": 2,
    "question": "物体に1.5×10⁴ Nの力を加えて、30秒間で10 m引き上げるのに必要な動力の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "0.45 kW",
      "イ": "0.50 kW",
      "ウ": "4.5 kW",
      "エ": "5.0 kW",
      "オ": "45 kW"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "仕事は1.5×10⁴×10＝1.5×10⁵ Jである。30秒で割ると5.0×10³ Wとなり、5.0 kWである。",
    "choiceExplanations": {
      "ア": "力と距離の積は150,000 Jである。これを30秒で割った値は0.45 kWより大きい。",
      "イ": "1.5×10⁴ Nは15,000 Nである。10 mを掛けて30秒で割った結果をkWに直すと0.50 kWの10倍になる。",
      "ウ": "平均速度を10/30 m/sとして力を掛けると5,000 Wになる。0.3 m/sに丸めず分数のまま計算する。",
      "エ": "仕事は1.5×10⁴×10＝1.5×10⁵ Jである。30秒で割ると5.0×10³ Wとなり、5.0 kWである。",
      "オ": "力と移動距離から仕事を求め、時間で割る。投入する仕事は150 kJなので、30秒で45 kWにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q51",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "斜面上の静止摩擦力"
    ],
    "difficulty": 2,
    "question": "図のように、粗い斜面上にある質量60 kgの小物体に斜面に沿って下向きに20 Nの力を加えたが、小物体は静止し続けた。このとき、小物体に作用した静止摩擦力の大きさとして最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "20 N",
      "イ": "160 N",
      "ウ": "280 N",
      "エ": "300 N",
      "オ": "320 N"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "重力の斜面方向の成分は60×10×sin30°＝300 Nである。斜面下向きの20 Nを足した320 Nとつり合う静止摩擦力が斜面上向きに働く。",
    "choiceExplanations": {
      "ア": "20 Nは外から加えた力である。斜面下向きには重力の斜面に平行な成分も作用する。",
      "イ": "重力成分だけで60×10×sin30°＝300 Nが斜面下向きに掛かる。外力も同じ向きなので160 Nでは釣り合わない。",
      "ウ": "280 Nは300 Nと20 Nの差である。二つの力は斜面下向きにそろっているので足す。",
      "エ": "300 Nは重力の斜面方向の成分である。さらに20 Nの力が斜面下向きに掛かっている。",
      "オ": "重力の斜面方向の成分は60×10×sin30°＝300 Nである。斜面下向きの20 Nを足した320 Nとつり合う静止摩擦力が斜面上向きに働く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q51.webp"
    ],
    "imageAltTexts": [
      "水平面から30°の斜面にある60 kgの物体と斜面下方の20 Nを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q52",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "選択B（機械系）",
      "断面積と引張応力の反比例"
    ],
    "difficulty": 2,
    "question": "図のように、同じ材質の一様な円筒Aと円筒Bに荷重Wを円筒の軸方向に作用させる。軸に垂直なAの断面の断面積Sₐと軸に垂直なBの断面の断面積Sᵦの間に、Sᵦ＝2Sₐの関係があるとき、Aの断面にかかる応力σₐと、Bの断面にかかる応力σᵦの関係を表す式として最も妥当なのはどれか。ただし、AとBの自重は無視するものとする。",
    "choices": {
      "ア": "σᵦ＝σₐ/8",
      "イ": "σᵦ＝σₐ/4",
      "ウ": "σᵦ＝σₐ/2",
      "エ": "σᵦ＝σₐ",
      "オ": "σᵦ＝2σₐ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "軸方向の応力は荷重を断面積で割るので、σₐ＝W/Sₐ、σᵦ＝W/Sᵦである。Sᵦ＝2Sₐを代入するとσᵦ＝σₐ/2となる。",
    "choiceExplanations": {
      "ア": "荷重が同じなら応力は断面積に反比例する。Bの断面積はAの8倍ではなく2倍である。",
      "イ": "直径ではなく断面積自体が2倍と指定されている。さらに二乗して4倍とする必要はない。",
      "ウ": "軸方向の応力は荷重を断面積で割るので、σₐ＝W/Sₐ、σᵦ＝W/Sᵦである。Sᵦ＝2Sₐを代入するとσᵦ＝σₐ/2となる。",
      "エ": "軸荷重は同じでも、Bの断面積はAより大きいため、単位面積当たりの力は小さい。",
      "オ": "断面積を増やすと同じ軸荷重がより広い面に分散する。Bの応力は倍増せず半分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q52.webp"
    ],
    "imageAltTexts": [
      "同じ軸荷重Wを異なる断面積の円筒AとBに作用させた原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q53",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "選択B（機械系）",
      "棒の伸びと縦ひずみ"
    ],
    "difficulty": 2,
    "question": "長さ5 mの一様な棒を軸方向に引っ張ったところ、棒が0.1 mm伸びた。このときの縦ひずみの大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "2×10⁻⁵",
      "イ": "5×10⁻⁵",
      "ウ": "2×10⁻⁴",
      "エ": "5×10⁻⁴",
      "オ": "0.5"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "縦ひずみは長さの変化を元の長さで割った比である。5 mを5,000 mmに換算して0.1/5,000＝2×10⁻⁵となる。",
    "choiceExplanations": {
      "ア": "縦ひずみは長さの変化を元の長さで割った比である。5 mを5,000 mmに換算して0.1/5,000＝2×10⁻⁵となる。",
      "イ": "元の長さをミリメートルに直すと5,000 mmである。伸びをその値で割ると5×10⁻⁵より小さい。",
      "ウ": "2×10⁻⁴は元の長さを500 mmとして割った場合の結果である。5 mは5,000 mmである。",
      "エ": "伸び0.1 mmをメートルにすれば0.0001 mである。5を掛けるのでなく5で割ってひずみを求める。",
      "オ": "0.5は元の長さと伸びを単位をそろえず掛けた数値に当たる。単位をそろえた長さ同士の比で表す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q54",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "選択B（機械系）",
      "静荷重と時間で変動する荷重"
    ],
    "difficulty": 2,
    "question": "荷重と時間の関係を表すグラフ㋐〜㋓のうち、静荷重を表しているもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐では荷重が時間軸と平行な直線で表され、時間が経っても大きさが変化しない。したがって静荷重に該当するのは㋐だけである。",
    "choiceExplanations": {
      "ア": "㋐では荷重が時間軸と平行な直線で表され、時間が経っても大きさが変化しない。したがって静荷重に該当するのは㋐だけである。",
      "イ": "㋐は一定だが、㋑は荷重が正負の間で繰り返し変わるため静荷重ではない。",
      "ウ": "㋐は一定である。㋒では一時的に荷重が急増し再びゼロになるため、時間に依存する。",
      "エ": "㋑は繰返し変動、㋒は単発の変動を持ち、どちらも静荷重に該当しない。",
      "オ": "㋒は時間の短い単発の変動であり、㋓も周期的に荷重が変わる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q54.webp"
    ],
    "imageAltTexts": [
      "一定・繰返し・単発・周期変動の四つの荷重時刻歴を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q55",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "機械設計",
    "topicTags": [
      "選択B（機械系）",
      "プーリの直径とベルト伝動の回転比"
    ],
    "difficulty": 2,
    "question": "図のように、直径300 mm、回転速度800 min⁻¹の原動プーリから、直径1200 mm、回転速度200 min⁻¹の従動プーリにベルト伝動をさせるとき、回転比（速度伝達比）として最も妥当なのはどれか。ただし、ベルトは滑らないものとする。",
    "choices": {
      "ア": "6.3×10⁻²",
      "イ": "0.25",
      "ウ": "1.0",
      "エ": "4.0",
      "オ": "16"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "滑らなければ両プーリの周速度は等しく、回転数は直径に反比例する。設問の比は原動側÷従動側＝800/200＝4.0である。",
    "choiceExplanations": {
      "ア": "回転速度は直径に反比例し、原動側の直径は従動側の4分の1である。直径比を二乗して求める量ではない。",
      "イ": "0.25は従動側の速度を原動側の速度で割った値である。公式正答が用いる回転比はその逆である。",
      "ウ": "両プーリの周速度は等しいが、直径が異なるため回転速度の比は1にならない。",
      "エ": "滑らなければ両プーリの周速度は等しく、回転数は直径に反比例する。設問の比は原動側÷従動側＝800/200＝4.0である。",
      "オ": "従動側の直径は原動側の4倍であり、等しい周速度には回転数の比4が対応する。直径比は二乗しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q55.webp"
    ],
    "imageAltTexts": [
      "300 mmの原動プーリと1,200 mmの従動プーリの回転速度を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q56",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "流体力学",
    "topicTags": [
      "選択B（機械系）",
      "非圧縮流体の体積保存とピストン変位"
    ],
    "difficulty": 2,
    "question": "図のように、滑らかに動く断面積3Sの軽いピストンAを取り付けた容器と、滑らかに動く断面積Sの軽いピストンBを取り付けた容器を管で接続し、内部を非圧縮非粘性流体で満たした装置を用意する。この状態から、Aに力を加えたところ、Aは力を加える前の位置から鉛直下向きに長さ2lだけ押し込まれた。このとき、Bが力を加える前の位置から鉛直上向きに押し上げられた距離として最も妥当なのはどれか。\nただし、容器内の流体の温度は一定であり、流体は容器から漏れないものとする。",
    "choices": {
      "ア": "l",
      "イ": "2l",
      "ウ": "3l",
      "エ": "5l",
      "オ": "6l"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Aが排除する体積は3S×2l＝6Slである。非圧縮で漏れがなくB側で同じ体積が増えるので、Bの移動距離は6Sl/S＝6lとなる。",
    "choiceExplanations": {
      "ア": "B側の断面積はA側の3分の1なので、同じ体積を受け入れるにはA側より長く移動する。",
      "イ": "同じ距離だけ動くのは断面積が等しい場合である。B側は断面積が小さく、より大きく動く。",
      "ウ": "3はAとBの断面積の比である。Aの押込み量はlではなく2lなので、その3倍を取る。",
      "エ": "両側の排除体積が等しくなるには、B側での断面積Sと移動距離の積が3S×2lに等しくなる必要がある。",
      "オ": "Aが排除する体積は3S×2l＝6Slである。非圧縮で漏れがなくB側で同じ体積が増えるので、Bの移動距離は6Sl/S＝6lとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q56.webp"
    ],
    "imageAltTexts": [
      "ピストンAの断面積3Sと押込み2lおよびピストンBの断面積Sを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q57",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "熱力学",
    "topicTags": [
      "選択B（機械系）",
      "質量・比熱と加熱に必要な熱量"
    ],
    "difficulty": 2,
    "question": "2 Lの液体を300 Kから310 Kまで加熱するとき、必要となる熱量として最も妥当なのはどれか。ただし、液体の密度、比熱をそれぞれ1000 kg/m³、4.2 kJ/（kg·K）とする。",
    "choices": {
      "ア": "10 kJ",
      "イ": "21 kJ",
      "ウ": "42 kJ",
      "エ": "84 kJ",
      "オ": "95 kJ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "2 L＝0.002 m³に密度1000 kg/m³を掛けると質量2 kgである。温度上昇は10 Kなので、熱量は2×4.2×10＝84 kJとなる。",
    "choiceExplanations": {
      "ア": "温度上昇は10 Kだが、熱量を求めるには比熱と質量を掛ける必要がある。",
      "イ": "2 Lは0.002 m³なので、密度1,000 kg/m³の液体では質量2 kgになる。これに比熱と10 Kを掛ける。",
      "ウ": "42 kJは1 kgを10 Kだけ上げるときの熱量である。問題の液体は2 kgある。",
      "エ": "2 L＝0.002 m³に密度1000 kg/m³を掛けると質量2 kgである。温度上昇は10 Kなので、熱量は2×4.2×10＝84 kJとなる。",
      "オ": "温度差を求めると310−300＝10 Kである。質量2 kgと比熱4.2 kJ/（kg·K）を用いると95 kJにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q58",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択B（機械系）",
      "直流抵抗の消費電力"
    ],
    "difficulty": 2,
    "question": "図のような10 Ωの抵抗に2 Aの電流が流れる直流回路において、抵抗で消費する電力として最も妥当なのはどれか。ただし、電源の内部抵抗は無視するものとする。",
    "choices": {
      "ア": "20 W",
      "イ": "40 W",
      "ウ": "80 W",
      "エ": "100 W",
      "オ": "200 W"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "抵抗の両端の電圧は2 A×10 Ω＝20 Vである。消費電力は電圧と電流の積なので20 V×2 A＝40 Wになる。",
    "choiceExplanations": {
      "ア": "20は電流と抵抗の積であり、抵抗に掛かる電圧20 Vである。電力を求めるにはさらに電流を掛ける。",
      "イ": "抵抗の両端の電圧は2 A×10 Ω＝20 Vである。消費電力は電圧と電流の積なので20 V×2 A＝40 Wになる。",
      "ウ": "電力を抵抗と電流で表すとI²Rである。電流2 Aを二乗して10 Ωを掛けるので80 Wとはならない。",
      "エ": "10 Ωは抵抗値であり、電流と掛けて電圧を求める。抵抗値を二乗しても消費電力にはならない。",
      "オ": "10 Ωに2 Aが流れると、電圧は20 Vである。この電圧に抵抗値を掛けず、電流2 Aを掛けると電力になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q58.webp"
    ],
    "imageAltTexts": [
      "電源と10 Ωの抵抗をつなぎ2 Aが流れる直流回路の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q59",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択B（機械系）",
      "異符号の点電荷による電界の合成"
    ],
    "difficulty": 2,
    "question": "図のように、xy平面上の点（l, 0）に−Q［C］の点電荷が、点（−l, 0）に＋Q［C］の点電荷が置かれている。このとき、点A（0, l）での電界（電場）の向きと大きさの組合せとして最も妥当なのはどれか。ただし、kは比例定数とし、Qは正の値であるものとする。",
    "choices": {
      "ア": "−x方向・kQ/（2l²）",
      "イ": "−x方向・kQ/（√2 l²）",
      "ウ": "x方向・kQ/（2l²）",
      "エ": "x方向・kQ/（√2 l²）",
      "オ": "x方向・kQ/（√2 l）"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各電荷はAから√2 l離れ、各電界の大きさはkQ/（2l²）である。鉛直成分は相殺し、右向きの成分kQ/（2√2 l²）が二つ加わってkQ/（√2 l²）となる。",
    "choiceExplanations": {
      "ア": "正電荷は左に、負電荷は右にあるので、点Aで両方の電界の水平成分は右を向く。",
      "イ": "大きさは合っているが、点Aでは左の正電荷から遠ざかり、右の負電荷へ近づく向きになるので右向きである。",
      "ウ": "kQ/（2l²）は一つの電荷の電界の大きさである。二つの電界を成分に分け、水平成分を加える必要がある。",
      "エ": "各電荷はAから√2 l離れ、各電界の大きさはkQ/（2l²）である。鉛直成分は相殺し、右向きの成分kQ/（2√2 l²）が二つ加わってkQ/（√2 l²）となる。",
      "オ": "向きは合うが、点電荷の電界の大きさは距離の二乗に反比例するため、分母にはl²が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q59.webp"
    ],
    "imageAltTexts": [
      "原点の左右にある点電荷とy軸上の点Aの位置を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q60",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "電気基礎",
    "topicTags": [
      "選択B（機械系）",
      "フレミング左手則の三方向"
    ],
    "difficulty": 2,
    "question": "フレミングの左手の法則に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「左手の人差し指・中指・親指を、互いに垂直になるように開き、人差し指を［㋐］、中指を［㋑］に向けると、親指の向きは［㋒］と一致する。このことをフレミングの左手の法則という。」",
    "choices": {
      "ア": "磁界（磁場）の向き・電流の向き・電流が磁界から受ける力の向き",
      "イ": "磁界（磁場）の向き・電流が磁界から受ける力の向き・電流の向き",
      "ウ": "電流の向き・磁界（磁場）の向き・電流が磁界から受ける力の向き",
      "エ": "電流の向き・電流が磁界から受ける力の向き・磁界（磁場）の向き",
      "オ": "電流が磁界から受ける力の向き・磁界（磁場）の向き・電流の向き"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "左手の人差し指は磁界の向き、中指は電流の向きに合わせる。残る親指は電流が磁界から受ける力の向きを示す。",
    "choiceExplanations": {
      "ア": "左手の人差し指は磁界の向き、中指は電流の向きに合わせる。残る親指は電流が磁界から受ける力の向きを示す。",
      "イ": "人差し指に磁界を合わせるのは妥当である。中指は電流、親指は力の向きに対応する。",
      "ウ": "親指が力の向きなのは妥当だが、人差し指が磁界、中指が電流であり、二本の割当てが逆である。",
      "エ": "磁界は親指ではなく人差し指、電流が受ける力は中指ではなく親指に対応する。",
      "オ": "力の向きは親指で示す。電流は中指、磁界は人差し指に合わせてから力の向きを読む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q61",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "張出し梁の支点反力"
    ],
    "difficulty": 2,
    "question": "図のように、張出し梁に鉛直集中荷重と等分布荷重が作用しているとき、支点Bの鉛直反力の大きさとして最も妥当なのはどれか。ただし、梁の自重は無視するものとする。",
    "choices": {
      "ア": "20 kN",
      "イ": "25 kN",
      "ウ": "30 kN",
      "エ": "35 kN",
      "オ": "40 kN"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "等分布荷重を合力60 kNに置き換えると作用点はAの右0.5 mである。A周りのモーメントのつり合いから、Bの反力は（60×0.5＋10×5）/4＝20 kNとなる。",
    "choiceExplanations": {
      "ア": "等分布荷重を合力60 kNに置き換えると作用点はAの右0.5 mである。A周りのモーメントのつり合いから、Bの反力は（60×0.5＋10×5）/4＝20 kNとなる。",
      "イ": "等分布荷重の中心は分布範囲の中央であり、Aから右へ0.5 mにある。分布全体の長さ5 mと中心までの距離を区別する。",
      "ウ": "先端の点荷重10 kNはAから5 mに作用する。Bまでの4 mで割る前に等分布荷重によるモーメントも加える。",
      "エ": "等分布荷重の合力は60 kNだが、Aの近くに作用する。総荷重の半分をBの反力と見積もることはできない。",
      "オ": "支点Bまでの距離はAから4 mで、荷重によるA周りのモーメントは80 kN·mである。したがってBの反力は40 kNより小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q61.webp"
    ],
    "imageAltTexts": [
      "張出し梁の集中荷重・等分布荷重・支点間隔を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q62",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "単純梁の支点反力と曲げモーメント"
    ],
    "difficulty": 2,
    "question": "図Ⅰのように、単純梁に集中荷重が作用したとき、点Aに生じる曲げモーメントの大きさとして最も妥当なのはどれか。ただし、曲げモーメントの向きは、図Ⅱの向きを正とする。",
    "choices": {
      "ア": "10 kN·m",
      "イ": "15 kN·m",
      "ウ": "20 kN·m",
      "エ": "25 kN·m",
      "オ": "30 kN·m"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "荷重は右支点から1 m、支間は4 mなので、左反力は20×1/4＝5 kNである。点Aは左支点から2 mなので、その曲げモーメントは5×2＝10 kN·mである。",
    "choiceExplanations": {
      "ア": "荷重は右支点から1 m、支間は4 mなので、左反力は20×1/4＝5 kNである。点Aは左支点から2 mなので、その曲げモーメントは5×2＝10 kN·mである。",
      "イ": "15は右支点の反力の数値である。その右反力で計算するなら、点Aから右側にある荷重のモーメントも引く。",
      "ウ": "集中荷重は点Aより右にあるため、点Aより左側を切り出すと作用する鉛直力は左支点反力のみである。",
      "エ": "左支点から点Aまでの区間に分布荷重はない。左反力5 kNと距離2 mだけでモーメントを求められる。",
      "オ": "30 kN·mは右反力の点A周りのモーメントである。右側から求める場合は荷重の20 kN·mも差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q62.webp",
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q62-fig2.webp"
    ],
    "imageAltTexts": [
      "単純梁と荷重20 kNおよび曲げモーメントを求める点Aを示す公式図Ⅰ",
      "曲げモーメントの正方向を示す公式図Ⅱ"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q63",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択C（土木系）",
      "長方形断面の断面係数と曲げ応力"
    ],
    "difficulty": 2,
    "question": "図のように、高さ200 mm、幅60 mmの一様な長方形断面においてx軸まわりの曲げモーメント4.0×10⁶ N·mmが作用するときの縁応力の大きさとして最も妥当なのはどれか。\nただし、中立軸に対して上下対称断面の場合、縁応力をσ、曲げモーメントをM、断面係数をZとしたとき、次式が成り立つものとする。\nσ＝M/Z",
    "choices": {
      "ア": "10 N/mm²",
      "イ": "15 N/mm²",
      "ウ": "20 N/mm²",
      "エ": "25 N/mm²",
      "オ": "30 N/mm²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "長方形の中立軸まわりの断面係数はbh²/6であり、60×200²/6＝4.0×10⁵ mm³である。よって縁応力は4.0×10⁶/（4.0×10⁵）＝10 N/mm²である。",
    "choiceExplanations": {
      "ア": "長方形の中立軸まわりの断面係数はbh²/6であり、60×200²/6＝4.0×10⁵ mm³である。よって縁応力は4.0×10⁶/（4.0×10⁵）＝10 N/mm²である。",
      "イ": "断面係数を求めるときのhは中立軸から縁までの100 mmではなく、断面全体の高さ200 mmである。",
      "ウ": "曲げモーメントを割る断面係数は、断面二次モーメントbh³/12を縁までの距離h/2で割った値である。",
      "エ": "中立軸から最外縁までの距離は100 mmである。幅と高さを使いI＝bh³/12を出してM×100/Iで求める。",
      "オ": "長方形の断面係数は40万mm³になる。400万N·mmをこれで割ると30 N/mm²にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q63.webp"
    ],
    "imageAltTexts": [
      "幅60 mmと高さ200 mmで中央にx軸を取った長方形断面の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q64",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "水理",
    "topicTags": [
      "選択C（土木系）",
      "角材の浮力ときっ水"
    ],
    "difficulty": 2,
    "question": "図のように、一辺が0.20 mの正方形断面をもつ長さ2.0 mの一様な角材を水に浮かべたとき、きっ水dとして最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²、水の密度を1.0×10³ kg/m³、角材の密度を6.0×10² kg/m³とする。",
    "choices": {
      "ア": "0.10 m",
      "イ": "0.12 m",
      "ウ": "0.14 m",
      "エ": "0.16 m",
      "オ": "0.18 m"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "浮力と角材の重さがつり合うと、水中の体積は全体の600/1,000＝0.60倍になる。断面幅が一定なのでd＝0.20×0.60＝0.12 mとなる。",
    "choiceExplanations": {
      "ア": "0.10 mなら角材の半分だけが沈む。角材の密度は水の0.6倍なので、沈む割合は0.5より大きい。",
      "イ": "浮力と角材の重さがつり合うと、水中の体積は全体の600/1,000＝0.60倍になる。断面幅が一定なのでd＝0.20×0.60＝0.12 mとなる。",
      "ウ": "0.14 mでは全体の0.7が水中に入り、排水の重さが角材の重さを上回る。",
      "エ": "水の密度と角材の密度の比が決めるのは水中に入る体積の割合である。0.16 mでは0.8の割合になり大きすぎる。",
      "オ": "0.18 mまで沈めると0.9の体積が水中に入り、浮力は角材の重さより大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q64.webp"
    ],
    "imageAltTexts": [
      "水に浮く正方形断面の角材と水面下の深さdを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q65",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "水理",
    "topicTags": [
      "選択C（土木系）",
      "円管の摩擦損失水頭"
    ],
    "difficulty": 2,
    "question": "水平に置かれた内径1 m、水路長50 mの円形管水路において、流量が0.3 m³/sで水が流れているとき、摩擦損失水頭として最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²、円形管の摩擦損失係数を0.05、円周率を3とする。",
    "choices": {
      "ア": "0.002 m",
      "イ": "0.004 m",
      "ウ": "0.008 m",
      "エ": "0.02 m",
      "オ": "0.04 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "流速は0.3/（3×1²/4）＝0.40 m/sである。ダルシー・ワイスバッハ式より損失水頭は0.05×（50/1）×0.40²/（2×10）＝0.02 mとなる。",
    "choiceExplanations": {
      "ア": "管断面積は0.75 m²で、平均流速は0.40 m/sである。摩擦係数0.05と管長・直径の比50を速度水頭に掛けると0.002 mより大きい。",
      "イ": "速度水頭だけでも0.40²/20＝0.008 mとなる。摩擦損失にするにはさらに0.05×50＝2.5を掛ける。",
      "ウ": "0.008 mは速度水頭であり、管の摩擦による損失には管長と内径の比および摩擦係数が必要である。",
      "エ": "流速は0.3/（3×1²/4）＝0.40 m/sである。ダルシー・ワイスバッハ式より損失水頭は0.05×（50/1）×0.40²/（2×10）＝0.02 mとなる。",
      "オ": "速度水頭の分母は重力加速度gではなく2gである。分母をgにすると結果を2倍にしてしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q66",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "水理",
    "topicTags": [
      "選択C（土木系）",
      "ピトー管から求める平均流速"
    ],
    "difficulty": 2,
    "question": "図のように、円管にピトー管と静圧管を立てたところ、両管の水面差が80 cmであった。円管断面の平均流速と円管中心の最大流速の比が0.85のとき、平均流速として最も妥当なのはどれか。ただし、重力加速度の大きさを10 m/s²、ピトー管の補正係数を1.0とする。",
    "choices": {
      "ア": "0.24 m/s",
      "イ": "0.34 m/s",
      "ウ": "2.4 m/s",
      "エ": "2.9 m/s",
      "オ": "3.4 m/s"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "水面差0.80 mは中心の速度水頭なので、最大流速は√（2×10×0.80）＝4.0 m/sとなる。平均流速はこの0.85倍で3.4 m/sである。",
    "choiceExplanations": {
      "ア": "水面差80 cmは0.80 mであり、速度水頭と等しい。中心流速はこの水頭に2gを掛けて平方根を取る。",
      "イ": "0.34 m/sには中心流速0.40 m/sを用いているが、0.80 mの速度水頭からは4.0 m/sが得られる。",
      "ウ": "中心の速度は√（2×10×0.80）＝4.0 m/sである。平均流速にはこれに0.85を掛ける。",
      "エ": "0.85は平均流速と最大流速の比であり、水頭に適用する補正係数ではない。流速を求めてから掛ける。",
      "オ": "水面差0.80 mは中心の速度水頭なので、最大流速は√（2×10×0.80）＝4.0 m/sとなる。平均流速はこの0.85倍で3.4 m/sである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q66.webp"
    ],
    "imageAltTexts": [
      "円管に挿入したピトー管と静圧管および水面差80 cmを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q67",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "ピクノメーターによる土粒子密度"
    ],
    "difficulty": 2,
    "question": "ある土試料について、土粒子の密度試験を行ったところ、表の結果を得た。この土試料の密度として最も妥当なのはどれか。ただし、蒸留水の密度を1.0 g/cm³とする。",
    "choices": {
      "ア": "0.3 g/cm³",
      "イ": "1.5 g/cm³",
      "ウ": "3.0 g/cm³",
      "エ": "5.0 g/cm³",
      "オ": "5.7 g/cm³"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "乾燥土30 gを入れて全体の質量が150 gから170 gになったので、押しのけた水は30−20＝10 gである。体積10 cm³の土の密度は30/10＝3.0 g/cm³となる。",
    "choiceExplanations": {
      "ア": "土粒子の密度は乾燥質量を粒子の体積で割る。土粒子が押しのけた水の質量は10 gで、体積は10 cm³に相当する。",
      "イ": "20 gは試料を入れる前後の全質量の増加である。押しのけられた水の質量は乾燥試料30 gからこの20 gを引いた10 gである。",
      "ウ": "乾燥土30 gを入れて全体の質量が150 gから170 gになったので、押しのけた水は30−20＝10 gである。体積10 cm³の土の密度は30/10＝3.0 g/cm³となる。",
      "エ": "150 gにはピクノメーターの質量と蒸留水の質量が含まれる。この全質量を試料の体積や質量に直接置き換えることはできない。",
      "オ": "170 gは容器、水、試料の全体である。密度の分子に使う土粒子の乾燥質量は30 gである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q67.webp"
    ],
    "imageAltTexts": [
      "蒸留水・ピクノメーター・乾燥土試料の質量を示す原表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q68",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "液性限界と塑性指数"
    ],
    "difficulty": 2,
    "question": "ある土試料について、土の液性限界・塑性限界試験を行ったところ、液性限界の含水比は55％、塑性限界の含水比は35％であった。このとき、塑性指数として最も妥当なのはどれか。",
    "choices": {
      "ア": "20",
      "イ": "35",
      "ウ": "45",
      "エ": "55",
      "オ": "90"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "塑性指数は土が塑性状態を示す含水比の幅であり、液性限界から塑性限界を引く。与えられた含水比の差55−35＝20が塑性指数である。",
    "choiceExplanations": {
      "ア": "塑性指数は土が塑性状態を示す含水比の幅であり、液性限界から塑性限界を引く。与えられた含水比の差55−35＝20が塑性指数である。",
      "イ": "35は塑性限界の含水比である。塑性指数は液性限界からこの値を差し引いて求める。",
      "ウ": "45は二つの限界の平均である。指数は平均ではなく塑性を保つ範囲の幅で表す。",
      "エ": "55は液性限界であり、土が液状に移る境界の含水比である。もう一方の境界である塑性限界を引く。",
      "オ": "90は二つの限界の合計である。土が塑性状態でいられる含水比の幅は、上下の限界の差となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q69",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "選択C（土木系）",
      "流線網に基づく浸透流量"
    ],
    "difficulty": 2,
    "question": "図は、ある地盤の透水層の一部に止水壁を打ち込み、止水しているときの流線網を描いたものである。この透水層の透水係数が2.0×10⁻⁴ m/s、水頭差が5.0 mであるとき、止水壁の下をまわって浸透する単位奥行き（1.0 m）当たりの1時間の透水量として最も妥当なのはどれか。ただし、水位は変化しないものとする。\nまた、単位奥行き（1.0 m）当たりの透水量をq、透水係数をk、水頭差をh、流線ではさまれる帯の数をN𝒻、等ポテンシャル線ではさまれる帯の数をN𝒹とすると、次式が成り立つものとする。\nq＝kh N𝒻/N𝒹",
    "choices": {
      "ア": "1.4 m³",
      "イ": "1.8 m³",
      "ウ": "3.6 m³",
      "エ": "7.2 m³",
      "オ": "9.6 m³"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図の流路は3帯で、水頭降下は6区間なので比は1/2である。2.0×10⁻⁴×5.0×（3/6）×3,600＝1.8 m³となる。",
    "choiceExplanations": {
      "ア": "透水係数と水頭差の積に、各線そのものの本数ではなく、線にはさまれた流路と水頭降下の区間数の比を掛ける。",
      "イ": "図の流路は3帯で、水頭降下は6区間なので比は1/2である。2.0×10⁻⁴×5.0×（3/6）×3,600＝1.8 m³となる。",
      "ウ": "3.6 m³はkhに1時間の秒数を掛けた値である。流線網から得る帯の数の比1/2も掛ける必要がある。",
      "エ": "流路の帯数は水頭降下の区間数より少ない。逆比の6/3でなく、3/6を掛ける。",
      "オ": "1時間の透水量に直すには秒当たりの量を3,600倍する。図から読んだ帯の比は1より小さく、3.6 m³を超えない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q69.webp"
    ],
    "imageAltTexts": [
      "止水壁の下を通る流線・等ポテンシャル線と5.0 mの水頭差を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q70",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "結合トラバースの角度閉合差"
    ],
    "difficulty": 2,
    "question": "図のように、既知点Aから既知点Bに結合トラバース測量を行ったところ、表の結果を得た。Aの既知方位角αₐが330°25′05″であり、Bの既知方位角αᵦが60°35′45″であるとき、測角の誤差（閉合誤差）として最も妥当なのはどれか。",
    "choices": {
      "ア": "−15″",
      "イ": "−5″",
      "ウ": "＋5″",
      "エ": "＋10″",
      "オ": "＋20″"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "三つの測角を足し、途中二点の方向反転分の360°を引く。出発方位角に加えて一周分を除くと60°36′05″なので、既知値との差は＋20″である。",
    "choiceExplanations": {
      "ア": "βの秒の合計は10″＋15″＋35″＝60″であり、分へ繰り上げる。得られた方位角はBの既知値より大きい。",
      "イ": "角度を足すときに分と秒を60進法で繰り上げる。Bの到達値60°36′05″と既知値60°35′45″の差は負ではない。",
      "ウ": "到達値の秒は05″だが、分の位も既知値とは異なる。36′05″と35′45″の差は＋20″になる。",
      "エ": "β₁、β₂、β₃の合計は450°11′00″である。出発方位角への加算と0〜360°への整理後に既知値と比較する。",
      "オ": "三つの測角を足し、途中二点の方向反転分の360°を引く。出発方位角に加えて一周分を除くと60°36′05″なので、既知値との差は＋20″である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q70.webp"
    ],
    "imageAltTexts": [
      "既知点A・Bを結ぶトラバースと三つの測角値を示す原図・原表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q71",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "選択C（土木系）",
      "水準測量の距離による加重平均"
    ],
    "difficulty": 2,
    "question": "未知点Pの標高を求めるため、水準点A、B、Cから水準測量を行ったところ、表の結果を得た。このとき、Pの標高の最確値として最も妥当なのはどれか。",
    "choices": {
      "ア": "15.437 m",
      "イ": "15.440 m",
      "ウ": "15.443 m",
      "エ": "15.446 m",
      "オ": "15.449 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Pの標高はAから15.451 m、Bから15.447 m、Cから15.436 mになる。距離8、10、5 kmの逆数に比例する5、4、8を重みにして平均すると約15.443 mとなる。",
    "choiceExplanations": {
      "ア": "最も短いCからの測定だけなら15.436 mになる。最確値にはA、Bから得た値も距離に応じて加える。",
      "イ": "CはAとBより測量距離が短いので大きな重みを持つが、距離に反比例する重みを全てに適用すると15.440 mより大きい。",
      "ウ": "Pの標高はAから15.451 m、Bから15.447 m、Cから15.436 mになる。距離8、10、5 kmの逆数に比例する5、4、8を重みにして平均すると約15.443 mとなる。",
      "エ": "距離の長い観測ほど誤差が大きくなりやすいので、距離が短いCの結果に最も大きな重みを掛ける。",
      "オ": "AとBだけの平均は15.449 mである。最確値の計算では短距離のCから得た15.436 mも含める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q71.webp",
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q71-fig2.webp"
    ],
    "imageAltTexts": [
      "水準点A・B・Cの標高と距離およびPへの高低差を示す原表",
      "三つの水準点とPの位置・距離を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q72",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "選択C（土木系）",
      "両端断面平均法による盛土と切土の差"
    ],
    "difficulty": 2,
    "question": "図は、ある路線の横断測量によって得られたNo.1、No.2、No.3の断面図とその断面におけるCA（切取り断面積）及びBA（盛土断面積）を表している。測点はNo.1、No.2、No.3の順であり、各測点間の距離はそれぞれ20.0 mである。この区間の土量を両端断面平均法で求めたとき、盛土の土量から切土の土量を引いた量として最も妥当なのはどれか。",
    "choices": {
      "ア": "45.0 m³",
      "イ": "90.0 m³",
      "ウ": "110 m³",
      "エ": "150 m³",
      "オ": "180 m³"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "各断面のBA−CAは1.95、2.55、1.95 m²である。各20.0 mの区間で両端の面積差を平均して掛けると45.0 m³ずつとなり、合計は90.0 m³である。",
    "choiceExplanations": {
      "ア": "45.0 m³は断面No.1からNo.2までの差である。No.2からNo.3の同じ差も加える。",
      "イ": "各断面のBA−CAは1.95、2.55、1.95 m²である。各20.0 mの区間で両端の面積差を平均して掛けると45.0 m³ずつとなり、合計は90.0 m³である。",
      "ウ": "中央のNo.2は隣り合う二つの区間の端点となる。No.1とNo.3は各一度だけ使って断面積差を積算する。",
      "エ": "面積差はどの測点でも2.55 m²以下である。全長40 mを全て2.55 m²と仮定した102 m³でも150 m³より小さい。",
      "オ": "各区間で両端の面積差を足した後、2で割って平均断面積を求める。平均せずに距離を掛けると2倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q72.webp"
    ],
    "imageAltTexts": [
      "測点No.1から3までの切取り断面積と盛土断面積を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q73",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "建設材料",
    "topicTags": [
      "選択C（土木系）",
      "骨材の絶乾・気乾・湿潤状態"
    ],
    "difficulty": 2,
    "question": "図は、骨材の含水状態の4段階のうち、3段階の含水状態を表している。㋐、㋑、㋒の名称の組合せとして最も妥当なのはどれか。ただし、図中の網掛け部分は水分を表している。",
    "choices": {
      "ア": "気乾状態・絶乾状態・表乾状態",
      "イ": "気乾状態・表乾状態・湿潤状態",
      "ウ": "絶乾状態・気乾状態・湿潤状態",
      "エ": "絶乾状態・気乾状態・表乾状態",
      "オ": "絶乾状態・表乾状態・湿潤状態"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐は内部に水分がない絶乾、㋑は一部の水分が内部に残る気乾である。表面にも水が付いた㋒が湿潤であり、表乾状態と区別される。",
    "choiceExplanations": {
      "ア": "㋐は内部にも水分がないため絶乾である。少量の水が内部に残る㋑は気乾である。",
      "イ": "㋒は湿潤で合うが、㋐は水がない絶乾状態である。㋑には内部の一部にだけ水分が残っている。",
      "ウ": "㋐は内部に水分がない絶乾、㋑は一部の水分が内部に残る気乾である。表面にも水が付いた㋒が湿潤であり、表乾状態と区別される。",
      "エ": "㋐と㋑は合う。表乾状態は内部が飽水しても表面は乾いており、図の㋒では表面にも水がある。",
      "オ": "㋐と㋒は合うが、㋑は内部が完全には水で満たされていないので表乾状態ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q73.webp"
    ],
    "imageAltTexts": [
      "水分を灰色で示した三つの骨材粒子の公式図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q74",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "土木構造",
    "topicTags": [
      "選択C（土木系）",
      "直接基礎と杭・ケーソン基礎"
    ],
    "difficulty": 2,
    "question": "次の基礎の種類㋐〜㋓のうち、直接基礎として妥当なもののみを挙げているのはどれか。\n㋐ ニューマチックケーソン\n㋑ 場所打ちコンクリート杭基礎\n㋒ フーチング基礎\n㋓ べた基礎",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "フーチング基礎は基礎底面から支持地盤へ荷重を直接伝える。べた基礎も建物全体の底面で荷重を支える直接基礎である。",
    "choiceExplanations": {
      "ア": "ケーソンも杭も、一般に地表より深い支持層に荷重を伝える形式である。",
      "イ": "べた基礎は直接基礎である。一方、ニューマチックケーソンは作業室を持つ構造体を沈設する深い基礎である。",
      "ウ": "フーチング基礎は地盤へ直接荷重を伝える。場所打ちコンクリート杭は深部へ荷重を伝える杭基礎である。",
      "エ": "べた基礎は面で地盤に荷重を伝えるが、場所打ちコンクリート杭を使う場合は杭基礎になる。",
      "オ": "フーチング基礎は基礎底面から支持地盤へ荷重を直接伝える。べた基礎も建物全体の底面で荷重を支える直接基礎である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q75",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "選択C（土木系）",
      "工程ネットワークのクリティカルパス"
    ],
    "difficulty": 2,
    "question": "図のようなネットワーク式工程表で作業A〜Iを実施するとき、クリティカルパスの所要日数として最も妥当なのはどれか。\nただし、図中の矢印の下の数字は所要日数を、丸の中の数字は結合点番号を、破線はダミーをそれぞれ表している。",
    "choices": {
      "ア": "30日",
      "イ": "35日",
      "ウ": "40日",
      "エ": "45日",
      "オ": "50日"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "作業A・C・Eで結合点6に達するまでが35日である。そこからダミーを経てHとIを通る最長経路は35＋0＋10＋5＝50日になる。",
    "choiceExplanations": {
      "ア": "作業A・C・Eまでの到達に5＋10＋20＝35日を要し、さらに結合点6から9までの作業が残る。",
      "イ": "35日は作業A・C・Eを経て結合点6に着くまでの日数である。その先の作業HとIの合計15日も必要となる。",
      "ウ": "結合点6から9へは作業Gだけで10日だが、7と8を経る経路には15日必要である。",
      "エ": "作業A・C・E・Gを通る経路は45日である。結合点6からHとIを経るほうが時間が掛かる。",
      "オ": "作業A・C・Eで結合点6に達するまでが35日である。そこからダミーを経てHとIを通る最長経路は35＋0＋10＋5＝50日になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q75.webp"
    ],
    "imageAltTexts": [
      "作業A〜Iの所要日数とダミーを示す公式ネットワーク工程表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q76",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "橋梁",
    "topicTags": [
      "選択C（土木系）",
      "橋台・橋脚・上部構造の区別"
    ],
    "difficulty": 2,
    "question": "図は、橋の構造を表している。図中の㋐、㋑、㋒のうち、橋台に該当するものとして妥当なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "橋台は橋の両端で上部構造を支持し、背後の盛土も支える。図で左右の岸に接している下部構造㋐だけが橋台に該当する。",
    "choiceExplanations": {
      "ア": "橋台は橋の両端で上部構造を支持し、背後の盛土も支える。図で左右の岸に接している下部構造㋐だけが橋台に該当する。",
      "イ": "㋐は橋台だが、中央で両側の桁を支える㋑は橋脚である。",
      "ウ": "㋐が橋台、中央の㋑が橋脚である。㋒は下部構造の上に載る桁である。",
      "エ": "㋑は橋の途中にある橋脚で、橋と取付け道路の境界にある橋台とは位置と役割が異なる。",
      "オ": "㋑は桁を支える橋脚であり、㋒は桁そのものである。どちらも橋の端部を支える橋台ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q76.webp"
    ],
    "imageAltTexts": [
      "橋の両端の支持部・中央の支持部・上部の桁を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q77",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "建設材料",
    "topicTags": [
      "選択C（土木系）",
      "鉄筋とコンクリートのヤング係数比"
    ],
    "difficulty": 2,
    "question": "鉄筋コンクリート構造物において、鉄筋の弾性係数が2.1×10⁶ N/mm²、ヤング係数比が15であるとき、コンクリートの弾性係数として最も妥当なのはどれか。",
    "choices": {
      "ア": "7.1×10⁻⁶ N/mm²",
      "イ": "1.4×10⁵ N/mm²",
      "ウ": "1.4×10⁶ N/mm²",
      "エ": "3.2×10⁶ N/mm²",
      "オ": "3.2×10⁷ N/mm²"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ヤング係数比は鉄筋の係数をコンクリートの係数で割った値なので、設問の数値では2.1×10⁶/15＝1.4×10⁵ N/mm²となる。一般的な鋼の弾性係数は約2.0×10⁵ N/mm²である。",
    "choiceExplanations": {
      "ア": "7.1×10⁻⁶は15を鉄筋の弾性係数で割った数値である。コンクリートの弾性係数は逆に鉄筋の値を15で割る。",
      "イ": "ヤング係数比は鉄筋の係数をコンクリートの係数で割った値なので、設問の数値では2.1×10⁶/15＝1.4×10⁵ N/mm²となる。一般的な鋼の弾性係数は約2.0×10⁵ N/mm²である。",
      "ウ": "この値では鉄筋の係数との比が1.5にしかならない。指定された15で割った結果は10⁵の桁になる。",
      "エ": "ヤング係数比が15なのでコンクリートの係数は鉄筋の係数より小さい。3.2×10⁶は鉄筋の指定値を上回る。",
      "オ": "3.2×10⁷は鉄筋の指定値に15を掛けた値に近い。鉄筋の係数をコンクリートの係数で割った比なので、15で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q78",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "河川工学",
    "topicTags": [
      "選択C（土木系）",
      "輪中堤とかすみ堤"
    ],
    "difficulty": 2,
    "question": "図は、堤防の模式図であり、次の文は図中㋐、㋑の堤防について説明した記述である。㋐、㋑の名称の組合せとして最も妥当なのはどれか。\n㋐ ある特定の区域を洪水による氾濫から防護するため、その周囲を囲んで設けられた堤防である。\n㋑ 急流河川に設けられる不連続な堤防である。",
    "choices": {
      "ア": "輪中堤・かすみ堤",
      "イ": "輪中堤・背割堤",
      "ウ": "越流堤・かすみ堤",
      "エ": "越流堤・輪中堤",
      "オ": "かすみ堤・背割堤"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "特定の区域を取り囲んで洪水を防ぐ堤防は輪中堤である。急流河川などで堤防を不連続に配置したものはかすみ堤である。",
    "choiceExplanations": {
      "ア": "特定の区域を取り囲んで洪水を防ぐ堤防は輪中堤である。急流河川などで堤防を不連続に配置したものはかすみ堤である。",
      "イ": "輪中堤は㋐に合うが、背割堤は合流部などで並ぶ二つの流れを隔てる。㋑は開口部を持つかすみ堤である。",
      "ウ": "㋑は合う。遊水地などに洪水を流入させるために水が越える越流堤と、区域を取り囲む輪中堤は異なる。",
      "エ": "輪中堤は取り囲む㋐に当たる。急流河川の不連続な堤防を指す㋑はかすみ堤である。",
      "オ": "かすみ堤は㋑の不連続な堤防である。㋐は特定区域を囲む輪中堤に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q78.webp"
    ],
    "imageAltTexts": [
      "本川・支川の周りの堤防と、囲み型および不連続型の位置を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q79",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "斜面防災",
    "topicTags": [
      "選択C（土木系）",
      "地すべりの抑制工・抑止工・杭工"
    ],
    "difficulty": 2,
    "question": "地すべり対策工に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「地すべり対策工は、［㋐］と［㋑］に大別されている。［㋐］は、地形や地下水状態などの自然条件を変化させ、地すべりの滑動を停止又は緩和させようとする工法である。［㋑］は、構造物を設けることでその抵抗を利用し、地すべりの滑動を停止させようとする工法である。［㋑］のうち、［㋒］は、地すべり斜面の下部に、すべり面の下の安定した岩盤深くまで達する孔をボーリングで掘り、その孔へ鋼管杭などを挿入する工法である。」",
    "choices": {
      "ア": "抑止工・抑制工・押え盛土工",
      "イ": "抑止工・抑制工・杭工",
      "ウ": "抑制工・抑止工・押え盛土工",
      "エ": "抑制工・抑止工・杭工",
      "オ": "抑制工・抑止工・擁壁工"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "地形や地下水を変えて滑動の原因を抑えるのが抑制工で、構造物で直接抵抗するのが抑止工である。安定した地層まで杭を打ち込んで支える方式が杭工である。",
    "choiceExplanations": {
      "ア": "地下水や地形を変えるのが抑制工である。押え盛土工は斜面下部の盛土を使い、鋼管杭を差し込む工法とは異なる。",
      "イ": "杭工は合うが、原因を減らすのが抑制工で、構造物の抵抗で止めるのが抑止工である。",
      "ウ": "㋐と㋑は合う。ボーリングした孔へ鋼管杭を挿入して抵抗力を与えるのは杭工である。",
      "エ": "地形や地下水を変えて滑動の原因を抑えるのが抑制工で、構造物で直接抵抗するのが抑止工である。安定した地層まで杭を打ち込んで支える方式が杭工である。",
      "オ": "擁壁工では壁体で土を支える。㋒は杭をすべり面より深い岩盤へ入れて抵抗させる工法である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q80",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "道路工学",
    "topicTags": [
      "選択C（土木系）",
      "道路の交通機能と空間機能"
    ],
    "difficulty": 2,
    "question": "表は、道路の機能とその効果を示したものである。表中の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "空間機能・トラフィック機能・アクセス機能・交通機能",
      "イ": "交通機能・アクセス機能・トラフィック機能・空間機能",
      "ウ": "交通機能・トラフィック機能・アクセス機能・空間機能",
      "エ": "アクセス機能・空間機能・交通機能・トラフィック機能",
      "オ": "アクセス機能・交通機能・空間機能・トラフィック機能"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "道路の交通機能は、移動のための通行と沿道へ出入りする機能に分かれる。ライフラインの収容、防災や居住環境の確保は空間機能である。",
    "choiceExplanations": {
      "ア": "トラフィック機能とアクセス機能は、まとめて交通機能と呼ぶ。ライフラインの収容などが空間機能である。",
      "イ": "交通機能と空間機能の区分は合うが、移動のための通行はトラフィック機能で、沿道へ出入りするのがアクセス機能である。",
      "ウ": "道路の交通機能は、移動のための通行と沿道へ出入りする機能に分かれる。ライフラインの収容、防災や居住環境の確保は空間機能である。",
      "エ": "アクセス機能は沿道へ出入りするための交通機能の一部である。空間機能を通行の項目に入れるのは誤りである。",
      "オ": "通行と出入りはいずれも交通機能に属する。公共施設の収容などのために空間を提供するのが㋓である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q80.webp"
    ],
    "imageAltTexts": [
      "道路の通行・出入り・公共施設の収容などと効果を示す公式表"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q81",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択D（建築系）",
      "張出し梁の曲げモーメント"
    ],
    "difficulty": 2,
    "question": "図のような荷重を受ける梁において、点Aにおける曲げモーメントの大きさとして最も妥当なのはどれか。ただし、部材の自重は無視するものとする。",
    "choices": {
      "ア": "0 kN·m",
      "イ": "1 kN·m",
      "ウ": "2 kN·m",
      "エ": "3 kN·m",
      "オ": "4 kN·m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "左支点周りのつり合いから右支点反力は下向き1 kNである。点Aから右支点まで3 mなので、曲げモーメントの大きさは1×3＝3 kN·mとなる。",
    "choiceExplanations": {
      "ア": "点Aに外力は直接掛かっていないが、右支点の反力による曲げモーメントは作用する。",
      "イ": "1 kNは右支点の反力の大きさである。Aから右支点までの3 mを掛けてモーメントを求める。",
      "ウ": "荷重の2 kNは力であり、点Aでの曲げモーメントを求めるには支点反力と腕の長さを使う。",
      "エ": "左支点周りのつり合いから右支点反力は下向き1 kNである。点Aから右支点まで3 mなので、曲げモーメントの大きさは1×3＝3 kN·mとなる。",
      "オ": "4 kN·mは2 kNの荷重による左支点周りのモーメントである。点Aでは右支点までの距離3 mを使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q81.webp"
    ],
    "imageAltTexts": [
      "2 kNの先端荷重、二つの支点と点Aを示す張出し梁の原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q82",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "選択D（建築系）",
      "水平力がある構造物の鉛直反力"
    ],
    "difficulty": 2,
    "question": "図のような荷重を受ける構造物において、支点Aと支点Bにおけるそれぞれの鉛直方向の反力Vₐと反力Vᵦの大きさの組合せとして最も妥当なのはどれか。ただし、部材の自重は無視するものとする。",
    "choices": {
      "ア": "Vₐ＝2 kN、Vᵦ＝4 kN",
      "イ": "Vₐ＝2 kN、Vᵦ＝7 kN",
      "ウ": "Vₐ＝3 kN、Vᵦ＝3 kN",
      "エ": "Vₐ＝3 kN、Vᵦ＝6 kN",
      "オ": "Vₐ＝4 kN、Vᵦ＝2 kN"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aに関するモーメントのつり合いは3Vᵦ−6×2＋3×1＝0なのでVᵦ＝3 kNとなる。鉛直の合力6 kNを支えるためVₐも3 kNである。",
    "choiceExplanations": {
      "ア": "鉛直6 kNだけなら反力は2 kNと4 kNになるが、高さ1 mで作用する水平力のモーメントも考慮する。",
      "イ": "反力の合計が9 kNになってしまう。水平3 kNは鉛直力のつり合いには直接加わらない。",
      "ウ": "Aに関するモーメントのつり合いは3Vᵦ−6×2＋3×1＝0なのでVᵦ＝3 kNとなる。鉛直の合力6 kNを支えるためVₐも3 kNである。",
      "エ": "二つの鉛直反力の合計は、下向きの荷重6 kNと等しくなければならない。",
      "オ": "Bの反力が2 kNなら、そのA周りのモーメントは6 kN·mである。外力による正味9 kN·mとつり合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q82.webp"
    ],
    "imageAltTexts": [
      "支点A・Bと鉛直6 kN・水平3 kNの作用点および距離を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q83",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "木材の乾燥収縮・炭化・腐朽"
    ],
    "difficulty": 2,
    "question": "木材に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 木材の乾燥収縮の比率は、年輪の接線方向、半径方向、繊維方向によって異なり、年輪の接線方向が最も大きく、繊維方向が最も小さい。\n㋑ 断面の大きな木材を燃焼させると、完全に燃焼する前に、表面部分に炭化層が出来る。炭化層は酸素の供給を遮るとともに、内部への熱を伝わりにくくして熱分解を抑制する。\n㋒ 木材の腐朽は、菌類などの影響によって起こり、菌類の成育には水分・適温・二酸化炭素・日光が必要である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "木材の収縮は接線方向で大きく、繊維方向では小さい。太い木材の表面に生じる炭化層は、内部に熱や酸素が届きにくくする。",
    "choiceExplanations": {
      "ア": "㋐の方向別収縮は妥当である。加えて㋑のように、火を受けた木材の表面の炭化層が内部への熱を抑える。",
      "イ": "木材の収縮は接線方向で大きく、繊維方向では小さい。太い木材の表面に生じる炭化層は、内部に熱や酸素が届きにくくする。",
      "ウ": "㋑は妥当だが、木材は含水率が下がると繊維方向よりも年輪の接線方向に大きく縮むので㋐も妥当である。",
      "エ": "炭化層の説明は妥当である。腐朽菌は水分、温度、酸素などが適した環境で活動し、日光を必要としない。",
      "オ": "腐朽菌の生育は水分・適温・酸素と木材などの養分に左右される。二酸化炭素や日光を必要条件とする㋒は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q84",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "豆板・コールドジョイント・ブリーディング"
    ],
    "difficulty": 2,
    "question": "コンクリートに関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 豆板とは、コンクリートの表面で、骨材が塊状に集まってできた空隙の多い欠陥部分をいう。\n㋑ コールドジョイントとは、コンクリート中に浸透した水分が凍結と融解を繰り返すことにより、コンクリートが劣化する現象をいう。\n㋒ ブリーディングとは、フレッシュコンクリートの打込み直後から、練混ぜ水の一部が分離して、コンクリートの上面に上昇する現象をいう。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "骨材の周りにモルタルが十分に回らず空隙が残る部分を豆板と呼ぶ。打込み後に材料が沈んで水が上面に出る現象がブリーディングである。",
    "choiceExplanations": {
      "ア": "㋐は妥当である。㋒のような打込み直後の水分の分離・上昇も生じ、これをブリーディングと呼ぶ。",
      "イ": "㋐は妥当だが、凍結と融解の繰返しによる劣化は凍害である。",
      "ウ": "骨材の周りにモルタルが十分に回らず空隙が残る部分を豆板と呼ぶ。打込み後に材料が沈んで水が上面に出る現象がブリーディングである。",
      "エ": "㋒は妥当である。コールドジョイントは打重ねが遅れて新旧コンクリートが一体化しにくくなった継ぎ目を指す。",
      "オ": "㋒は正しいが、㋐も豆板の説明に合う。豆板では空隙の間に粗骨材が露出していることが多い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q85",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "建築材料",
    "topicTags": [
      "選択D（建築系）",
      "鋼の腐食防止と温度・炭素の影響"
    ],
    "difficulty": 2,
    "question": "鋼に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 鋼をモルタルやコンクリートで覆うことは、さびの発生を防ぐ上で有効である。\n㋑ 鋼の引張強さは、200〜300 ℃でほとんどゼロになる。\n㋒ 化学的に純粋な鉄は硬く、鉄に炭素が含まれると軟らかくなる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "モルタルやコンクリートのアルカリ性によって、内部の鋼には腐食を抑える不動態皮膜ができる。十分なかぶりは劣化因子の浸入も抑える。",
    "choiceExplanations": {
      "ア": "モルタルやコンクリートのアルカリ性によって、内部の鋼には腐食を抑える不動態皮膜ができる。十分なかぶりは劣化因子の浸入も抑える。",
      "イ": "㋐は妥当だが、鋼は200〜300 ℃で引張強さがほとんどゼロになるわけではない。",
      "ウ": "鋼材の力学的な性質は温度により変わるが、200〜300 ℃で強さをほぼ失うという記述は誤りである。",
      "エ": "200〜300 ℃では引張強さがほぼゼロにはならない。炭素を含有すると純鉄に比べて一般に硬さが増す。",
      "オ": "化学的に純粋な鉄は比較的軟らかい。炭素の含有量や熱処理の違いによって、鋼の硬さや強度が変わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q86",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "木造軸組の通し柱と床高"
    ],
    "difficulty": 2,
    "question": "在来軸組構法による木構造の建築物に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 瓦葺の屋根の勾配は、一般に、8/10以上である。\n㋑ 2階建てでは、軸組を堅固に組み固めるため、隅や軸組の交差部などの要所に通し柱を配置する。\n㋒ 最下階の居室の床が木造で、床下がコンクリート等で覆われていない場合、床の高さは、直下の地面からその床の上面まで10 cm以内としなければならない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "2階建てでは隅などの要所に上下階を貫く通し柱を配置すると、上下階の軸組をつなげられる。㋐の勾配と㋒の床高は誤りである。",
    "choiceExplanations": {
      "ア": "瓦屋根に必要な勾配は瓦の種類や工法によって異なり、一般に8/10以上とするものではない。",
      "イ": "㋑は妥当である。瓦屋根には8/10より緩い勾配も一般に使われるため、㋐を含まない。",
      "ウ": "2階建てでは隅などの要所に上下階を貫く通し柱を配置すると、上下階の軸組をつなげられる。㋐の勾配と㋒の床高は誤りである。",
      "エ": "㋑は妥当だが、法令で定める当該の木造床の高さは、直下の地面から床の上面まで原則45 cm以上である。",
      "オ": "床下をコンクリートなどで覆わない場合の床高の規定は、10 cm以内ではなく原則45 cm以上である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q87",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "鉄筋の定着・かぶり・あき"
    ],
    "difficulty": 2,
    "question": "鉄筋コンクリート構造に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 大梁主筋の柱への必要定着長さは、柱のコンクリート強度が高いほど短くなる。\n㋑ 鉄筋のかぶり厚さは、一般に、柱や梁より基礎の方が大きい。\n㋒ 鉄筋間の距離（あき）は、粗骨材が鉄筋間に引っ掛かるように25 mmより小さくする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "強度の高いコンクリートは主筋からの応力を付着で伝えやすく、必要な定着長さは短くできる。基礎では一般に柱や梁より大きなかぶりを確保する。",
    "choiceExplanations": {
      "ア": "㋐は妥当である。耐久性が必要で土に接する基礎では一般に鉄筋のかぶりを大きくするため、㋑も妥当である。",
      "イ": "強度の高いコンクリートは主筋からの応力を付着で伝えやすく、必要な定着長さは短くできる。基礎では一般に柱や梁より大きなかぶりを確保する。",
      "ウ": "㋐は妥当である。鉄筋間には粗骨材が通り、コンクリートが充填できるだけのあきを確保する。",
      "エ": "㋑は妥当である。さらに、コンクリート強度が高いほど一般に付着による伝達がしやすくなり、定着長さを短くできる。",
      "オ": "㋑は妥当だが、鉄筋間のあきは粗骨材の通過を妨げないよう、鉄筋径や粗骨材の最大寸法も考えて確保する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q88",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "建築構造",
    "topicTags": [
      "選択D（建築系）",
      "プレート梁のフランジ・ウェブ・補剛材"
    ],
    "difficulty": 2,
    "question": "図のような鋼構造のプレート梁における部材㋐〜㋓の名称の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "ウェブ・フランジ・スカラップ・スチフナー",
      "イ": "ウェブ・フランジ・スチフナー・スカラップ",
      "ウ": "スカラップ・ウェブ・フランジ・スチフナー",
      "エ": "フランジ・ウェブ・スチフナー・スカラップ",
      "オ": "フランジ・スチフナー・スカラップ・ウェブ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "梁の上下の板がフランジ、間をつなぐ縦板がウェブである。ウェブに付く補剛板がスチフナーで、溶接部付近の切欠きがスカラップである。",
    "choiceExplanations": {
      "ア": "㋐は梁上部の水平板でフランジに当たる。上下のフランジをつなぐ縦板が㋑のウェブである。",
      "イ": "㋒と㋓は合うが、㋐と㋑が逆である。上面の水平板がフランジ、梁せい方向の板がウェブである。",
      "ウ": "㋑はウェブで合っている。㋐の上の板はフランジで、溶接部付近に設ける切欠きがスカラップである。",
      "エ": "梁の上下の板がフランジ、間をつなぐ縦板がウェブである。ウェブに付く補剛板がスチフナーで、溶接部付近の切欠きがスカラップである。",
      "オ": "㋐はフランジで合うが、㋑の広い縦板はウェブである。㋒が追加の補剛板で、㋓は切欠きである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q88.webp"
    ],
    "imageAltTexts": [
      "鋼製プレート梁を斜めから見た部材㋐〜㋓の公式図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q89",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "建築施工",
    "topicTags": [
      "選択D（建築系）",
      "ベンチマーク・防護棚・仮囲い"
    ],
    "difficulty": 2,
    "question": "仮設工事に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 建築物の高さ及び位置の基準点となるベンチマークは、工事中に動くことのないよう、工事に支障がなく、また、工事の影響を受けるおそれのない位置に設ける。\n㋑ 落下物から通行人や作業員などを守るために外部足場の壁面に設けるはね出しの棚のことを、防護棚（朝顔）という。\n㋒ 建築物を新築する場合は、建築物の位置、規模、構造にかかわらず、工事期間中、現場周囲に地盤面からの高さが3.0 m以上の仮囲いを設けなければならない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "測量の基準点は施工で動くおそれのない位置に確保する。朝顔は足場などの外側に張り出して落下物を受け、人を守る仮設設備である。",
    "choiceExplanations": {
      "ア": "㋐は妥当である。㋑も足場から張り出す落下物対策の防護棚を正しく説明している。",
      "イ": "測量の基準点は施工で動くおそれのない位置に確保する。朝顔は足場などの外側に張り出して落下物を受け、人を守る仮設設備である。",
      "ウ": "㋑は正しいが、工事の影響で位置が変わらない場所に測量の基準点を設ける㋐も正しい。",
      "エ": "㋑は正しい。一方、所定の工事に設ける仮囲いの高さは建築基準法施行令で原則1.8 m以上であり、一律3.0 mではない。",
      "オ": "仮囲いの必要性は建築物の規模などの条件で決まる。全ての新築工事に一律3.0 m以上を求める記述は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q90",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "建築施工",
    "topicTags": [
      "選択D（建築系）",
      "筋かいの欠込み・支保工・高力ボルト"
    ],
    "difficulty": 2,
    "question": "各種工事に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 木構造の建築物の工事において、筋かいと間柱が交差する部分は、たすき掛けにする場合を除き、筋かいを欠き取らずに間柱を切り欠く。\n㋑ 鉄筋コンクリート構造の建築物の工事において、スラブ下及び梁下の支保工の存置期間は、コンクリートの圧縮強度が5 N/mm²以上となるまでとする。\n㋒ 鋼構造の建築物の工事において、トルシア形高力ボルトを用いる場合、検査では、ピンテールが破断していないものを合格とする。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "筋かいは水平力に抵抗する部材なので、間柱との交差部では筋かいの断面を保つ。必要な欠込みは間柱側で行う。",
    "choiceExplanations": {
      "ア": "筋かいは水平力に抵抗する部材なので、間柱との交差部では筋かいの断面を保つ。必要な欠込みは間柱側で行う。",
      "イ": "㋐は妥当だが、スラブや梁の下の支保工は荷重を支えるため、一律に圧縮強度5 N/mm²で取り外すわけではない。",
      "ウ": "㋐は妥当である。トルシア形高力ボルトでは所定の締付けでピンテールが破断する方式を用いる。",
      "エ": "支保工の取り外しは部材の所要強度や荷重などを考慮して決める。トルシア形高力ボルトは締付け後にピンテールの破断を確認する。",
      "オ": "通常の施工では所定の締付けに達するとピンテールが破断する。破断していないものを一律に合格とするのは誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q91",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "選択D（建築系）",
      "色彩の面積効果・膨張色・安全色"
    ],
    "difficulty": 2,
    "question": "色彩に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 同一色が面積の大小によって明度、彩度が異なって見えることを面積効果といい、一般に、面積が大きい色は明度、彩度とも高く見える。\n㋑ 見かけの大きさが実際の大きさよりも大きく見える色を膨張色といい、一般に、明度、彩度とも低いほど膨張して見える。\n㋒ JISに定められている安全色のうち、黄色は注意を意味する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "広い面では、同じ色でも明るく鮮やかに見える面積効果がある。また、JISの安全色では黄色は注意を促す色として使う。",
    "choiceExplanations": {
      "ア": "㋐は面積効果を説明しているが、膨張色は一般に明度が高いほうが大きく見える。",
      "イ": "広い面では、同じ色でも明るく鮮やかに見える面積効果がある。また、JISの安全色では黄色は注意を促す色として使う。",
      "ウ": "膨張色の定義は合うが、一般に白など明度の高い色のほうが暗い色より大きく見える。",
      "エ": "黄色が注意を表すという㋒は妥当である。㋑では明度の低い色ほど膨張して見えるという部分が誤っている。",
      "オ": "黄色は注意を表す。加えて、面積が大きいほど明度や彩度が高く見えやすいとする㋐も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q92",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "建築環境",
    "topicTags": [
      "選択D（建築系）",
      "壁を通る熱伝達・熱伝導・熱貫流"
    ],
    "difficulty": 2,
    "question": "伝熱に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「壁体を通して熱が伝わる過程を考える。高温側の空気の熱は、壁体の表面に［㋐］し、壁体内を［㋑］した後に、再び壁体の表面から低温側の空気へ［㋐］する。この伝熱過程の全体を［㋒］という。」",
    "choices": {
      "ア": "熱貫流・熱伝達・熱伝導",
      "イ": "熱貫流・熱伝導・熱伝達",
      "ウ": "熱伝達・熱貫流・熱伝導",
      "エ": "熱伝達・熱伝導・熱貫流",
      "オ": "熱伝導・熱貫流・熱伝達"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "空気から壁の表面への移動と壁表面から空気への移動は熱伝達で、固体の壁の中では熱伝導である。両方を含む全体は熱貫流という。",
    "choiceExplanations": {
      "ア": "空気と壁表面の間は熱伝達である。熱貫流は両側の空気を隔てる壁を通して熱が移る全過程をいう。",
      "イ": "熱伝導は壁体内の移動に当たる。熱が空気と壁表面の間を移るのを熱伝達、全体を熱貫流と呼ぶ。",
      "ウ": "㋐は熱伝達で合う。壁の材料内部で熱が移るのが熱伝導で、壁全体を横断する過程が熱貫流である。",
      "エ": "空気から壁の表面への移動と壁表面から空気への移動は熱伝達で、固体の壁の中では熱伝導である。両方を含む全体は熱貫流という。",
      "オ": "空気と壁表面の間は熱伝達であり、熱伝導は壁の内部に該当する。全体の呼び名は熱貫流である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q93",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "建築設備",
    "topicTags": [
      "選択D（建築系）",
      "飲料用受水槽の点検空間と給水量"
    ],
    "difficulty": 2,
    "question": "給水設備に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 飲料用の受水槽は、保守・点検を容易に行うことができるように、その周囲に所定の寸法以上の空間を確保する必要がある。\n㋑ 受水槽の有効容量は、一般に、1日の予想給水量の3倍程度として計画する。\n㋒ 独立住宅における1日当たりの給水量は、一般に、居住者1人当たり20〜40 Lである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "飲料水の衛生を保つため、受水槽の周囲に点検、保守、清掃に必要な空間を設ける。㋑は容量を過大に見積もり、㋒は給水量を過小に見積もっている。",
    "choiceExplanations": {
      "ア": "飲料水の衛生を保つため、受水槽の周囲に点検、保守、清掃に必要な空間を設ける。㋑は容量を過大に見積もり、㋒は給水量を過小に見積もっている。",
      "イ": "㋐は妥当だが、受水槽の容量は利用状況に応じて計画し、日給水量の3日分を一般的な基準とはしない。",
      "ウ": "㋐は妥当である。住宅の1人1日当たりの計画給水量は一般に数百Lの規模であり、20〜40 Lでは小さすぎる。",
      "エ": "容量は予想給水量を踏まえて定めるが、一律にその3倍とするわけではない。住宅の1人1日当たり20〜40 Lも小さすぎる。",
      "オ": "20〜40 Lでは台所、浴室、洗濯、便所などを合計した1日分の給水量として過小である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q94",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "建築設備",
    "topicTags": [
      "選択D（建築系）",
      "都市ガス・LPガスと開放式燃焼器具"
    ],
    "difficulty": 2,
    "question": "ガス設備に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「ガスの供給方式には、地中に埋設された導管から供給される［㋐］を、敷地内に引き込んで必要な箇所に供給する方式と、［㋑］を充填したボンベを配置して供給する方式がある。\nガスなどを熱源とする燃焼器具のうち、［㋒］は、燃焼後の排気ガスを室内に排出することから、設置に当たっては十分な換気が得られるよう注意が必要である。」",
    "choices": {
      "ア": "液化石油ガス（LPガス）・液化天然ガス（都市ガス）・開放式燃焼器具",
      "イ": "液化石油ガス（LPガス）・液化天然ガス（都市ガス）・半密閉式燃焼器具",
      "ウ": "液化石油ガス（LPガス）・液化天然ガス（都市ガス）・密閉式燃焼器具",
      "エ": "液化天然ガス（都市ガス）・液化石油ガス（LPガス）・開放式燃焼器具",
      "オ": "液化天然ガス（都市ガス）・液化石油ガス（LPガス）・密閉式燃焼器具"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "都市ガスは気化した天然ガスなどを導管で供給し、個別のボンベにはLPガスを充填する。開放式燃焼器具は室内で給排気するため換気が必要である。",
    "choiceExplanations": {
      "ア": "開放式は適切だが、一般的な導管供給は都市ガスで、個別のボンベで受け取るのはLPガスである。",
      "イ": "ガスの供給方法の組合せが逆である。半密閉式は室内から給気しても燃焼排気は屋外へ出す。",
      "ウ": "導管は都市ガス、ボンベはLPガスの説明である。密閉式は燃焼用の給排気経路が室内と分離されている。",
      "エ": "都市ガスは気化した天然ガスなどを導管で供給し、個別のボンベにはLPガスを充填する。開放式燃焼器具は室内で給排気するため換気が必要である。",
      "オ": "ガス供給方式は合うが、密閉式は燃焼排気を屋外へ出す。設問のように室内に排出するのは開放式である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q95",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "選択D（建築系）",
      "センターコア型事務所の配置と避難"
    ],
    "difficulty": 2,
    "question": "センターコア型の事務所建築の特徴に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 比較的面積が小さい基準階に適している。\n㋑ 高いレンタブル比が得られる。\n㋒ 二方向避難の計画が難しい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "中央に設備や縦動線をまとめると周囲の執務空間を効率的に取れる。避難階段がコア周辺に集まるため、二方向に分かれた避難経路の計画には工夫が要る。",
    "choiceExplanations": {
      "ア": "中央に階段や設備をまとめる方式は、基準階の面積が比較的大きい場合に採用しやすい。",
      "イ": "㋑は妥当だが、床面積が小さいと中央のコアの比率が大きくなり、有効な執務空間を確保しにくい。",
      "ウ": "二方向避難を計画しにくいという㋒は妥当である。小規模な基準階向けとする㋐は合わない。",
      "エ": "㋑の高いレンタブル比は妥当である。コアに避難階段が集まると、別方向への独立した避難経路を確保することが課題となる。",
      "オ": "中央に設備や縦動線をまとめると周囲の執務空間を効率的に取れる。避難階段がコア周辺に集まるため、二方向に分かれた避難経路の計画には工夫が要る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q96",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "建築計画",
    "topicTags": [
      "選択D（建築系）",
      "小学校の教室方式と保健室の配置"
    ],
    "difficulty": 2,
    "question": "小学校の建築計画に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 総合教室型は、普通教科の授業は普通教室で行い、特別教科の授業は専用の設備などを備えた特別教室又は教科教室で行う運営方式である。\n㋑ 普通教室の大きさは、40人学級の場合、40 m²程度が標準である。\n㋒ 保健室の位置は、1階で、運動場の近くが望ましい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "運動場でけがや体調不良が起きたときに速やかに対応できるよう、保健室は運動場に近い1階に設けることが望ましい。",
    "choiceExplanations": {
      "ア": "普通教室と専用の特別教室を使い分ける方式は特別教室型である。総合教室型は学級の教室で多くの教科を学ぶ。",
      "イ": "㋐は特別教室型の説明である。普通教室も40人分の机や通路などを確保するには通常40 m²より広い。",
      "ウ": "40人学級で40 m²とすると1人当たり1 m²しかなく、机の間の動線や教員のスペースを取りにくい。",
      "エ": "運動場近くの1階に保健室を置くのは妥当である。40人学級の普通教室を40 m²程度とする㋑は誤りである。",
      "オ": "運動場でけがや体調不良が起きたときに速やかに対応できるよう、保健室は運動場に近い1階に設けることが望ましい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q97",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "建築史",
    "topicTags": [
      "選択D（建築系）",
      "近代建築の作品と設計者"
    ],
    "difficulty": 2,
    "question": "建築物とその設計者の組合せ㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 国際連合本部ビル ― ルートヴィッヒ・ミース・ファン・デル・ローエ\n㋑ レイクショア・ドライブ・アパート ― ル・コルビュジエ\n㋒ AT&Tビル ― フィリップ・ジョンソン",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ニューヨークのAT&Tビルはフィリップ・ジョンソンとジョン・バーギーの設計である。建物上部に特徴的な切欠きがある。",
    "choiceExplanations": {
      "ア": "ニューヨークの国連本部は複数国の建築家が参加した設計で、ル・コルビュジエやオスカー・ニーマイヤーらが関わった。",
      "イ": "レイクショア・ドライブ・アパートを設計したのはミースである。㋐と㋑はいずれも設計者の対応が違う。",
      "ウ": "フィリップ・ジョンソンはAT&Tビルに対応する。ミースを国連本部の設計者とした㋐は妥当でない。",
      "エ": "㋒は妥当だが、レイクショア・ドライブ・アパートはル・コルビュジエではなくミースが設計した。",
      "オ": "ニューヨークのAT&Tビルはフィリップ・ジョンソンとジョン・バーギーの設計である。建物上部に特徴的な切欠きがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q98",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "都市計画",
    "topicTags": [
      "選択D（建築系）",
      "市街化区域と市街化調整区域"
    ],
    "difficulty": 2,
    "question": "図は、都市計画区域、準都市計画区域、市街化区域、市街化調整区域の位置関係を模式的に表したものである。㋒が「市街化を抑制すべき区域」、㋓が「すでに市街地を形成している区域及びおおむね10年以内に優先的かつ計画的に市街化を図るべき区域」であるとき、㋐〜㋓の名称の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "市街化区域・市街化調整区域・準都市計画区域・都市計画区域",
      "イ": "市街化区域・市街化調整区域・都市計画区域・準都市計画区域",
      "ウ": "準都市計画区域・都市計画区域・市街化調整区域・市街化区域",
      "エ": "都市計画区域・準都市計画区域・市街化区域・市街化調整区域",
      "オ": "都市計画区域・準都市計画区域・市街化調整区域・市街化区域"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "線引きを行う㋐は都市計画区域で、別枠の㋑は準都市計画区域である。抑制する㋒が市街化調整区域で、市街地を形成・整備する㋓が市街化区域である。",
    "choiceExplanations": {
      "ア": "市街化区域と市街化調整区域は、線引きされた都市計画区域の内部にある。全体を指す㋐は都市計画区域である。",
      "イ": "市街化を抑制する㋒が市街化調整区域であり、都市計画区域はそれと市街化区域を囲む側にある。",
      "ウ": "㋒と㋓は合うが、線引きを行う左の㋐が都市計画区域で、別枠の㋑が準都市計画区域である。",
      "エ": "㋐と㋑は合う。計画的に市街化を進める区域が市街化区域なので、㋒と㋓が逆である。",
      "オ": "線引きを行う㋐は都市計画区域で、別枠の㋑は準都市計画区域である。抑制する㋒が市街化調整区域で、市街地を形成・整備する㋓が市街化区域である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q98.webp"
    ],
    "imageAltTexts": [
      "二つの計画区域と左側内部の二区域を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q99",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "選択D（建築系）",
      "建築面積・地盤面・階数の算定"
    ],
    "difficulty": 2,
    "question": "建築基準法令に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 外壁等の中心線から1 m以上突き出た庇がある建築物においては、庇の先端から1 m以内の部分は建築面積に算入しない。\n㋑ 建築物の高さの算定における地盤面とは、建築物が周囲の地面と接する最も低い位置を含む水平面をいう。\n㋒ 水平投影面積が建築面積の1/8以下の塔屋は、階数に算入しない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "建築面積では、対象となる庇の先端から1 m後退した線を用いる。法令が列挙する屋上部分の水平投影面積の合計が建築面積の1/8以下なら、階数に算入しない。",
    "choiceExplanations": {
      "ア": "庇の先端から1 m以内の部分を除く建築面積の扱いは妥当である。一定の面積以下の塔屋を階数から外す規定もある。",
      "イ": "㋐は妥当である。地盤面は建物が周囲の地面と接する位置の平均の高さの水平面を基準とする。",
      "ウ": "建築面積では、対象となる庇の先端から1 m後退した線を用いる。法令が列挙する屋上部分の水平投影面積の合計が建築面積の1/8以下なら、階数に算入しない。",
      "エ": "塔屋に関する㋒は妥当だが、地盤面を最も低い接地点で一律に決める㋑は誤りである。",
      "オ": "㋒は妥当である。外壁等の中心線から1 m以上突き出る庇について先端から1 mを除く㋐も妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-kou-2023-annual-senmon-gijutsu-q100",
    "exam": "kokka-ippan-kou",
    "year": 2023,
    "season": "annual",
    "session": "senmon-gijutsu",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "建築法規",
    "topicTags": [
      "選択D（建築系）",
      "防火地域の境界と防火壁による区画"
    ],
    "difficulty": 2,
    "question": "図のように、建築物が防火地域と準防火地域にまたがっているとき、建築基準法上、建築物㋐及び建築物の部分㋑、㋒はどちらの地域の規定が適用されるか、その組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "準防火地域・準防火地域・準防火地域",
      "イ": "準防火地域・防火地域・防火地域",
      "ウ": "防火地域・準防火地域・準防火地域",
      "エ": "防火地域・防火地域・準防火地域",
      "オ": "防火地域・防火地域・防火地域"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "防火壁による区画のない㋐は全体が防火地域の規定を受ける。防火壁の防火地域側㋑には防火地域の規定、区画された準防火地域側㋒には準防火地域の規定が適用される。",
    "choiceExplanations": {
      "ア": "㋐は区画なしに防火地域へかかっているため、建築物全体に防火地域の規定が適用される。㋑も防火地域側にある。",
      "イ": "㋐は防火地域にもまたがるため、防火地域の規定が適用される。㋒は準防火地域内にあり、図の防火壁で区画されている。",
      "ウ": "㋐と㋒は合う。㋑は防火地域内にある部分なので防火地域の規定が適用される。",
      "エ": "防火壁による区画のない㋐は全体が防火地域の規定を受ける。防火壁の防火地域側㋑には防火地域の規定、区画された準防火地域側㋒には準防火地域の規定が適用される。",
      "オ": "㋐と㋑は合うが、準防火地域内で防火壁により区画された㋒には準防火地域の規定が適用される。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000010527.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2023年度 国家公務員採用一般職試験（高卒者試験） 技術区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-kou/2023/senmon-gijutsu/q100.webp"
    ],
    "imageAltTexts": [
      "防火地域と準防火地域の境界をまたぐ二棟と防火壁の位置を示す原図"
    ]
  }
];
