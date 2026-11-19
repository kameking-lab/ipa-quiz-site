import type { Question } from "@/lib/questions/types";

export const COURT_2025_KISO: Question[] = [
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-10",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "テニス、野球、サッカー、水泳、ゴルフの５つのスポーツの得意、不得意に関して、次のア～ウのことがいえるとする。\nア　テニスが得意な人はゴルフも得意である。\nイ　テニスが得意ではない人は水泳が得意である。\nウ　水泳かサッカーが得意な人は野球が得意ではない。\nいま、野球が得意なＡがいる。Ａについて確実にいえるのは次のうちどれか。",
    "choices": {
      "ア": "Ａは５つのスポーツのうち得意ではないものが３つある。",
      "イ": "Ａはテニスもサッカーも得意ではない。",
      "ウ": "Ａは水泳もゴルフも得意ではない。",
      "エ": "Ａはテニスもゴルフも得意である。",
      "オ": "Ａは水泳かサッカーのどちらか一方だけが得意ではない。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ウの対偶からＡは水泳・サッカーがともに不得意である。水泳が不得意ならイの対偶からテニスは得意となり、アからゴルフも得意となる。",
    "choiceExplanations": {
      "ア": "野球が得意ならウの対偶により水泳・サッカーは不得意だが、テニスとゴルフは得意である。不得意なのは2つである。",
      "イ": "水泳が不得意なので、イの対偶からテニスは得意である。サッカーは不得意だが、テニスまで不得意とはいえない。",
      "ウ": "水泳が不得意であることは確かだが、イの対偶とアによりテニスもゴルフも得意である。",
      "エ": "ウの対偶からＡは水泳・サッカーがともに不得意である。水泳が不得意ならイの対偶からテニスは得意となり、アからゴルフも得意となる。",
      "オ": "ウの対偶で、水泳かサッカーの少なくとも一方が得意だという条件全体が否定される。両方とも不得意である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問10。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-11",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "Ａ、Ｂ、Ｃ、Ｄ、Ｅの５人は現在、医師、教師、作家、会社員、画家のいずれかの職業に就いていて、５人の職業は異なっている。また、彼らについて次のア～ウのことがわかっている。\nア　５人のうちＡと教師の２人が女性であり、ほかの３人は男性である。\nイ　画家は会社員をしている娘と２人で暮らしている。画家には兄のＢがいる。\nウ　ＣとＤと医師は３人でよく山に登る。Ｄはかつて教師をしていたが、現在は別の職業に就いている。ＣとＤは２人とも子どもはいない。\nこのとき、確実にいえるのは次のうちどれか。",
    "choices": {
      "ア": "Ａは医師のめいにあたる。",
      "イ": "作家はＡのおじにあたる。",
      "ウ": "男性はＢ、Ｃ、Ｅの３人である。",
      "エ": "Ｄは画家である。",
      "オ": "Ｅは医師である。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "会社員で画家の娘なのは女性のＡであり、画家の兄ＢはＣ・Ｄと別人で医師になる。したがってＡは医師Ｂのめいである。",
    "choiceExplanations": {
      "ア": "会社員で画家の娘なのは女性のＡであり、画家の兄ＢはＣ・Ｄと別人で医師になる。したがってＡは医師Ｂのめいである。",
      "イ": "Ａのおじは画家の兄Ｂであり、Ｃ・Ｄと一緒に登山する医師でもあるため、作家ではない。",
      "ウ": "Ａは会社員、Ｃ・Ｄは子どもがいないため画家でなく、Ｂは画家の兄である。画家はＥになり、もう一人の女性である教師はＣなので、男性はＢ・Ｄ・Ｅである。",
      "エ": "Ｄには子どもがいないため、会社員の娘と同居する画家にはなれない。",
      "オ": "Ｅは画家で、Ｃ・Ｄ本人ではなくＣ・Ｄと登山する医師は、会社員Ａを除くとＢになる。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問11。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-12",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "下図のような組合せでＡ、Ｂ、Ｃ、Ｄ、Ｅ、Ｆ、Ｇ、Ｈの８人による剣道のトーナメント戦を行った。試合の結果がア～エであったとき、確実にいえるのは次のうちどれか。\nア　Ａは１回戦でＨに勝った。\nイ　Ｂは２回戦でＧに勝った。\nウ　試合数が３の選手が２人いて、そのうちの１人はＣである。\nエ　Ｄは決勝戦でＥと当たる予定だったが、Ｅ以外の選手と当たり、決勝戦で敗れた。",
    "choices": {
      "ア": "ＡはＤに敗れた。",
      "イ": "ＢはＥに敗れた。",
      "ウ": "ＣはＤに敗れた。",
      "エ": "Ｅは一度だけ勝った。",
      "オ": "Ｆは一度だけ勝った。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Ｂは2回戦から決勝に進んで3試合、Ｃは反対側の1回戦から3回戦までで3試合となる。Ｃは3回戦でＤに敗れ、Ｄは決勝でＢに敗れる。",
    "choiceExplanations": {
      "ア": "Ａは1回戦でＨに勝った後、同じ側のもう一つの1回戦に勝ったＣと2回戦で対戦し、Ｃに敗れる。",
      "イ": "ＢはＧに勝って3回戦に進み、そこでＥに勝つ。ＢはＥに敗れたのではなく、そのまま決勝戦に進んでいる。",
      "ウ": "Ｂは2回戦から決勝に進んで3試合、Ｃは反対側の1回戦から3回戦までで3試合となる。Ｃは3回戦でＤに敗れ、Ｄは決勝でＢに敗れる。",
      "エ": "決勝戦でＤと当たる予定だったＥは反対側で3回戦から出場し、Ｂに敗れるため、一度も勝たない。",
      "オ": "ＦはＡ・Ｈとは別の1回戦でＣと当たり、その試合で敗れるため、一度も勝たない。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問12。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed",
    "imageUrls": [
      "/questions/saibansho-ippan-dai/2025/kiso-12.webp"
    ],
    "imageAltTexts": [
      "8人のトーナメント表。左側は、1回戦をする2組が2回戦で対戦し、その勝者と3回戦から出る1人が対戦する。右側は、2回戦から出る2人の勝者と3回戦から出る1人が対戦する。左右の3回戦の勝者が決勝戦で対戦する。各枠に名前は書かれていない。"
    ]
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-13",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "ある暗号によると、「太陽」は「夏春冬　夏夏夏　冬秋」「バラ」は「夏春秋　冬冬　夏春冬　夏夏」で表されるという。\nでは「冬夏　夏　夏夏春　秋春」に最も関係がある言葉は次のうちどれか。",
    "choices": {
      "ア": "教科",
      "イ": "野球",
      "ウ": "料理",
      "エ": "電車",
      "オ": "都市"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "SUNとROSEの文字の順番を春＝0・夏＝1・秋＝2・冬＝3の四進数で表した暗号である。与えられた文字列は13・1・20・8、すなわちMATHとなり、数学は教科に当たる。",
    "choiceExplanations": {
      "ア": "SUNとROSEの文字の順番を春＝0・夏＝1・秋＝2・冬＝3の四進数で表した暗号である。与えられた文字列は13・1・20・8、すなわちMATHとなり、数学は教科に当たる。",
      "イ": "冬夏・夏・夏夏春・秋春を四進数で読むとMATHになり、野球を意味するBASEBALLとは一致しない。",
      "ウ": "SUNのＳが夏春冬＝19に対応する。同様に読むとMATHとなるため、料理とは結び付かない。",
      "エ": "ROSEのＯは冬冬＝15、Ｅは夏夏＝5と対応する。同じ規則で与えられた文字列を読むとMATHになり、電車を表す語ではない。",
      "オ": "秋春は四進数の20で十進数の8、すなわちＨである。残りを合わせてもMATHとなり、都市の意味にはならない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問13。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-14",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "Ａ、Ｂ、Ｃ、Ｄは年齢の異なる４人兄弟である。彼らは、年下の者について発言するときは本当のことを言うが、年上の者について発言するときは本当のこともウソも言う。以下は、彼らの発言である。\nＡ「Ｄは長男です」\nＢ「Ｃは四男です」\nＣ「Ｄは次男です」\nＤ「Ｂは長男です」このとき、正しくいえるのは次のうちどれか。",
    "choices": {
      "ア": "長男はＡ",
      "イ": "次男はＢ",
      "ウ": "次男はＣ",
      "エ": "三男はＡ",
      "オ": "四男はＤ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ＤがＢより年上なら、Ｄの発言でＢが長男になり矛盾する。ＢはＤより上で、Ｄが2番目でないとＡ・ＣのいずれかがＤより年上になって発言と矛盾し、Ｂ・Ｄ・Ａ・Ｃの順だけが成り立つ。",
    "choiceExplanations": {
      "ア": "Ａが長男なら、弟であるＤについての発言は真でなくてはならず、Ｄも長男となって矛盾する。",
      "イ": "Ｂが次男なら、ＤがＢより年上の長男である場合はＤの発言が偽になる。Ｄが年下ならＡかＣが長男になるが、いずれもＤについての発言と矛盾する。",
      "ウ": "Ｃが次男だと、ＤがＣより年下なら「Ｄは次男」との発言が偽になって矛盾する。Ｄを長男としても、Ｂの位置に関するＤの発言と両立しない。",
      "エ": "ＤがＢより年上なら、Ｄの発言でＢが長男になり矛盾する。ＢはＤより上で、Ｄが2番目でないとＡ・ＣのいずれかがＤより年上になって発言と矛盾し、Ｂ・Ｄ・Ａ・Ｃの順だけが成り立つ。",
      "オ": "Ｄが末弟ならＡとＣの発言が同時に真でなくてはならず、Ｄが長男であり次男でもあるという矛盾が生じる。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問14。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-15",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "Ａ、Ｂ、Ｃ、Ｄ、Ｅの５人がある選挙に立候補した。選挙戦の最中に予想されていたア～ウの予想はすべて的中し、５人のうちの３人が当選した。このとき、確実に当選した者をすべて挙げているのは次のうちどれか。\nア　Ａが当選するならＣは落選するだろう。\nイ　Ｃが落選するなら、ＢとＥの片方だけが当選するだろう。\nウ　ＡとＤの少なくとも１人が当選するならＢも当選するだろう。",
    "choices": {
      "ア": "ＡとＤ",
      "イ": "Ｂ",
      "ウ": "ＢとＣ",
      "エ": "ＣとＤ",
      "オ": "Ｄ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Ｂが落選ならウによりＡ・Ｄも落選してしまい、3人が当選できない。Ｂ・Ｃ・ＥとＡ・Ｂ・Ｄのどちらも可能なので、確実なのはＢだけである。",
    "choiceExplanations": {
      "ア": "Ｂ・Ｃ・Ｅが当選した場合も三つの予想が成り立つ。その場合ＡもＤも落選する。",
      "イ": "Ｂが落選ならウによりＡ・Ｄも落選してしまい、3人が当選できない。Ｂ・Ｃ・ＥとＡ・Ｂ・Ｄのどちらも可能なので、確実なのはＢだけである。",
      "ウ": "Ａ・Ｂ・Ｄが当選する組合せでは、三つの予想を満たしながらＣが落選する。",
      "エ": "Ａ・Ｂ・ＤならＣが落選し、Ｂ・Ｃ・ＥならＤが落選する場合がある。ＣもＤも当選確実ではない。",
      "オ": "Ｂ・Ｃ・Ｅが当選し、Ａ・Ｄが落選しても、ア～ウに反しない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問15。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-16",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "Ａとａ、Ｂとｂ、Ｃとｃはそれぞれ親子（大文字が親で小文字が子ども）である。\nこの６人が図のような座席に３人ずつ向かい合って座っている。男女は３人ずついて、交互に並んで座っている。親子は隣り合って座っていないし、正面にも座っていない。\nＡとＣの間に男性ｂが座っている。このとき、６人について確実にいえるのは次のうちどれか。",
    "choices": {
      "ア": "Ａとａは母と娘である。",
      "イ": "Ｂとｂは父と息子である。",
      "ウ": "Ｃとｃは母と息子である。",
      "エ": "Ａの正面にはｃが座っている。",
      "オ": "Ｃの正面にはａが座っている。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Ａ・ｂ・Ｃの列の両端は女性で、反対列の両端は男性となる。Ｂはｂと隣接も対面もしないため反対列の端に座り、Ｂ・ｂは父と息子である。",
    "choiceExplanations": {
      "ア": "ｂが男性なので、左右のＡ・Ｃは女性である。一方、ａは反対側中央なら女性で端なら男性であり、Ａの娘とまでは確定しない。",
      "イ": "Ａ・ｂ・Ｃの列の両端は女性で、反対列の両端は男性となる。Ｂはｂと隣接も対面もしないため反対列の端に座り、Ｂ・ｂは父と息子である。",
      "ウ": "Ｃは女性だが、ｃは反対側中央なら女性である。ｃが中央に座ってもＣとは隣り合ったり向かい合ったりしない。",
      "エ": "Ａの正面に配されるのはａ以外のＢ又はｃであり、ｃだけには決まらない。",
      "オ": "Ｃの正面はｃ以外のＢ又はａとなり、例えばＢをＣの正面、ａを中央に置くこともできる。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問16。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed",
    "imageUrls": [
      "/questions/saibansho-ippan-dai/2025/kiso-16.webp"
    ],
    "imageAltTexts": [
      "長方形のテーブルの長辺に3席ずつあり、向かいの列と各席が正対している。"
    ]
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-17",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "判断推理",
    "topicTags": [
      "判断推理"
    ],
    "difficulty": 3,
    "question": "図のような正方形と正三角形でできた立体（準正十四面体）の正三角形の面に２種類の印（⇒と☆）を付けた。\n右の展開図において、☆がマークされる位置として正しいものはどれか。",
    "choices": {
      "ア": "ア",
      "イ": "イ",
      "ウ": "ウ",
      "エ": "エ",
      "オ": "オ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "立体図で矢印のある三角形と星のある三角形は、中央の正方形の向かい合う辺を挟む。矢印の指す頂点から同じ側の端をたどって展開図に移すと、星はイの位置に来る。",
    "choiceExplanations": {
      "ア": "アとイは同じ三角形の異なる頂点付近を指す。矢印の向きから対応する辺をたどると、星が付くのはアではなく、その三角形の下側の頂点付近である。",
      "イ": "立体図で矢印のある三角形と星のある三角形は、中央の正方形の向かい合う辺を挟む。矢印の指す頂点から同じ側の端をたどって展開図に移すと、星はイの位置に来る。",
      "ウ": "ウは正方形の下辺につながる三角形を指す。星があるのはイが指す三角形である。",
      "エ": "エとイは上方の同じ正方形に接するが、反対側の辺につながった別の三角形である。矢印を基準に合わせるとエの面にはならない。",
      "オ": "オは右側の別の三角形にあり、矢印の面から立体図中央の正方形を挟んだ面と一致しない。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問17。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed",
    "imageUrls": [
      "/questions/saibansho-ippan-dai/2025/kiso-17.webp"
    ],
    "imageAltTexts": [
      "左は正三角形8面と正方形6面でできた準正十四面体の立体図。矢印と星がそれぞれ三角形の面にある。右は、矢印付きの面と星を付ける候補ア・イ・ウ・エ・オが示された展開図。"
    ]
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-19",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "数的推理",
    "topicTags": [
      "数的推理"
    ],
    "difficulty": 3,
    "question": "27²＋96²＝72²＋69²\n\n上の等式は、２桁の整数の平方の和が、それらの十の位と一の位を入れ替えた数の平方の和に等しくなる一つの例を示したものである。下の等式もその例である。\n\n15²＋（　）²＝51²＋（　）²\n\nこのとき、（　）内の整数の十の位の数と一の位の数の積として正しいものは、次のうちどれか。ただし、15²＋51²＝51²＋15²のように、同じ数字の組合せで順番を入れ替えただけのケースは除外する。",
    "choices": {
      "ア": "21",
      "イ": "27",
      "ウ": "35",
      "エ": "42",
      "オ": "54"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "2桁を10a＋bとすると、入れ替えた平方との差は99(a²−b²)で、51²−15²＝99×24である。(a−b)(a＋b)＝24から除外例の(5,1)以外は(7,5)となり、積は35である。",
    "choiceExplanations": {
      "ア": "十の位aと一の位bの差の平方ではなく、a²−b²＝24が条件となる。積21となる7と3では平方差は40である。",
      "イ": "積27を作る一桁の正の整数3と9では平方差が72となり、条件の24に一致しない。",
      "ウ": "2桁を10a＋bとすると、入れ替えた平方との差は99(a²−b²)で、51²−15²＝99×24である。(a−b)(a＋b)＝24から除外例の(5,1)以外は(7,5)となり、積は35である。",
      "エ": "積42は6と7などの組合せだが、7²−6²＝13で、必要な平方差24にはならない。",
      "オ": "積54は6と9の組合せで、9²−6²＝45である。数字を入れ替えた平方の差は99×24とはならない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問19。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-20",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "数的推理",
    "topicTags": [
      "数的推理"
    ],
    "difficulty": 3,
    "question": "電車の線路に沿った道を自転車に乗って時速 24km で走っている人がいる。電車は７分ごとに駅を出発し、自転車は９分ごとに電車に追い越される。電車は一定の速さで常に走っているとすると、電車の速さとして正しいものはどれか。",
    "choices": {
      "ア": "時速 102km",
      "イ": "時速 104km",
      "ウ": "時速 106km",
      "エ": "時速 108km",
      "オ": "時速 110km"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "列車間隔と9分間の相対移動距離が等しいので、7v＝9(v−24)となる。これを解くとv＝108km/hである。",
    "choiceExplanations": {
      "ア": "時速102kmと仮定すると、9分間の相対移動は11.7kmで、電車が7分で走る11.9kmに届かない。",
      "イ": "同じ方向に走るので相対速度は80km/hである。9分で12km縮まるが、時速104kmの列車どうしの間隔とは一致しない。",
      "ウ": "時速vとすると、列車の間隔は7v/60、9分間で自転車との間隔が縮む距離は9(v−24)/60となる。v＝106では両辺が一致しない。",
      "エ": "列車間隔と9分間の相対移動距離が等しいので、7v＝9(v−24)となる。これを解くとv＝108km/hである。",
      "オ": "時速110kmなら7分ぶんの車間距離より、9分ぶんの相対移動距離の方が長いので、追越し間隔は9分より短くなる。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問20。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-21",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "数的推理",
    "topicTags": [
      "数的推理"
    ],
    "difficulty": 3,
    "question": "ある作業をＡとＢが２人で行うと一定の日数で終了させることができるが、Ａだけで行うと２人で行うときよりも９日多くかかり、Ｂだけで行うと２人で行うときよりも 16 日多くかかることがわかっている。この作業をＡとＢの２人で行うと何日で終了させることができるか。ただし、ＡとＢそれぞれの１日当たりの仕事量は一定とする。",
    "choices": {
      "ア": "12 日",
      "イ": "13 日",
      "ウ": "14 日",
      "エ": "15 日",
      "オ": "16 日"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "共同作業をx日とすると、1/(x＋9)＋1/(x＋16)＝1/xとなる。整理するとx²＝9×16なので、xは正の12日である。",
    "choiceExplanations": {
      "ア": "共同作業をx日とすると、1/(x＋9)＋1/(x＋16)＝1/xとなる。整理するとx²＝9×16なので、xは正の12日である。",
      "イ": "共同作業日数は、二人の単独作業の日数の差の積9×16の平方根である。13²は144ではない。",
      "ウ": "14日で終えると仮定すると、単独の所要は23日と30日になり、その二人の1日当たりの作業率の和は1/14にならない。",
      "エ": "二人の作業率を足して式を整理するとx²＝144を得る。15日では平方が225となる。",
      "オ": "16日はＢ単独の場合に増える日数で、共同作業日数そのものではない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問21。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-22",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "数的推理",
    "topicTags": [
      "数的推理"
    ],
    "difficulty": 3,
    "question": "次のⅠ、Ⅱのルールにしたがって、10 段の石段を上ることにする。\nⅠ…石段の上り方は１段ずつ上る方法と２段ずつ上る方法（１段とばし）の２種類がある。ただし、１段とばしを３回以上連続して行うことはないものとする。\nⅡ…６段目の石段は必ず踏むものとする。\nこのとき 10 段を上る方法は何通りあるか。",
    "choices": {
      "ア": "55 通り",
      "イ": "56 通り",
      "ウ": "57 通り",
      "エ": "58 通り",
      "オ": "59 通り"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "6段目までに末尾の2段上りが0・1・2回連続する進み方はそれぞれ8・3・1通りである。その先4段の許容される進み方は各5・4・3通りなので、8×5＋3×4＋1×3＝55通りになる。",
    "choiceExplanations": {
      "ア": "6段目までに末尾の2段上りが0・1・2回連続する進み方はそれぞれ8・3・1通りである。その先4段の許容される進み方は各5・4・3通りなので、8×5＋3×4＋1×3＝55通りになる。",
      "イ": "末尾で2段上りが1回続いていると、残り4段を2・2で上ることはできない。したがって、末尾の状態を無視して全て加えると過大になる。",
      "ウ": "6段目までの最後が2段上り2回連続なら、次は1段上がる必要がある。その条件を使うと続きは3通りに限られる。",
      "エ": "6段目を踏んでも、その前後をまたいで2段上りが3回続く場合は除く必要がある。末尾の連続回数を使って数えると55通りになる。",
      "オ": "6段目までを末尾の2段上りの回数で分けると8・3・1通りで、残りの選択肢はそれぞれ5・4・3通りである。合計は59ではない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問22。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-23",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "数的推理",
    "topicTags": [
      "数的推理"
    ],
    "difficulty": 3,
    "question": "三辺の長さが４、５、６の三角形ＡＢＣがある。各辺を一辺とする正方形を作り、図のように線分 p 、q 、r を定めたとき、p²＋q²＋r² の値として正しいものはどれか。",
    "choices": {
      "ア": "222",
      "イ": "225",
      "ウ": "228",
      "エ": "231",
      "オ": "234"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各頂点で正方形の辺の間の角は三角形の内角の補角である。余弦定理から各平方は隣接2辺の平方の和の2倍から対辺の平方を引いた値となり、合計3(4²＋5²＋6²)＝231である。",
    "choiceExplanations": {
      "ア": "Ａに接する辺は4と5で対辺は6である。余弦定理を使うとq²＝2(4²＋5²)−6²＝46となり、他の頂点も同様に求めると222にはならない。",
      "イ": "正方形の辺が作る角は対応する三角形の内角の補角である。余弦の符号を反転して計算すると、3辺の平方和の3倍になり225ではない。",
      "ウ": "Ｂにおけるp²は2(4²＋6²)−5²＝79である。Ｃのr²＝106、Ａのq²＝46を加えると228ではない。",
      "エ": "各頂点で正方形の辺の間の角は三角形の内角の補角である。余弦定理から各平方は隣接2辺の平方の和の2倍から対辺の平方を引いた値となり、合計3(4²＋5²＋6²)＝231である。",
      "オ": "Ａ、Ｂ、Ｃで得られる平方はそれぞれ46、79、106なので、足しても234にはならない。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問23。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed",
    "imageUrls": [
      "/questions/saibansho-ippan-dai/2025/kiso-23.webp"
    ],
    "imageAltTexts": [
      "ＡＢが4、ＡＣが5、ＢＣが6の三角形の各辺の外側に正方形を描く。点Ｂから出る2本の外向きの辺の端点を結ぶ線分がp、Ａから出る2本の端点を結ぶ線分がq、Ｃから出る2本の端点を結ぶ線分がr。"
    ]
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-24",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "資料解釈",
    "topicTags": [
      "資料解釈"
    ],
    "difficulty": 3,
    "question": "下の表は、2019 年から 2023 年にかけての、日本国内におけるコード決済の利用状況の推移を示したものである。この表からいえることとして最も妥当なものはどれか。\nなお、「クレジットカードから」は店舗利用金額の内数である。",
    "choices": {
      "ア": "表に示された期間中、店舗利用金額に占める「クレジットカードから」の割合が 30％を超えた年は２回である。",
      "イ": "店舗利用金額を店舗利用件数で割った１件当たりの金額について 2023 年と2019 年を比較すると、2023 年は 2019 年より 1,000 円以上増加している。",
      "ウ": "送金金額の対前年比の伸び（増加率）についてみると、最も伸びが大きかったのは 2020 年で、２番目に伸びが大きかったのは 2022 年である。",
      "エ": "送金金額を送金件数で割った１件当たりの金額について比較すると、表中で最も金額が大きいのは 2023 年である。",
      "オ": "チャージ残高をユーザー数で割った１人当たりのチャージ残高について 2022年と 2023 年を比較すると、2022 年の方が 2023 年より 500 円以上大きい。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "1人当たりのチャージ残高は、単位換算すると2022年の5,060億円÷6,062.9万人が約8,346円、2023年の5,921億円÷7,557.3万人が約7,835円である。差は約511円となる。",
    "choiceExplanations": {
      "ア": "クレジットカード分の割合が最も高い2021年でも20,753÷73,487で約28.2％であり、30％を超えた年はない。",
      "イ": "店舗利用1件当たりは約1,373円から約1,586円になった。増加は約213円で、1,000円以上ではない。",
      "ウ": "最大は2020年の約248％増である。2番目は2021年の約114％増であり、2022年は約85％増である。",
      "エ": "送金1件当たりの2023年は約3,494円で、2020年の約3,748円より小さい。",
      "オ": "1人当たりのチャージ残高は、単位換算すると2022年の5,060億円÷6,062.9万人が約8,346円、2023年の5,921億円÷7,557.3万人が約7,835円である。差は約511円となる。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問24。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed",
    "imageUrls": [
      "/questions/saibansho-ippan-dai/2025/kiso-24.webp"
    ],
    "imageAltTexts": [
      "コード決済の利用状況。各行の数値は2019年から2023年の順。店舗利用金額（億円）は11,206、42,003、73,487、107,986、148,496。そのうちクレジットカードからは1,598、10,300、20,753、28,704、39,495。店舗利用件数（百万件）は816、2,718、4,895、7,040、9,361。送金金額（億円）は474、1,649、3,521、6,530、10,237。送金件数（百万件）は13、44、97、182、293。チャージ残高（億円）は1,123、2,474、3,380、5,060、5,921。ユーザー数（千人）は18,546、36,363、48,733、60,629、75,573。チャージ残高とユーザー数は各年12月末時点で、ユーザー数は各サービスの月間アクティブユーザー数の合計。"
    ]
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-25",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "社会事情",
    "topicTags": [
      "社会事情"
    ],
    "difficulty": 3,
    "question": "経済用語に関する次のＡ～Ｄの記述のうち、妥当なもののみを全て挙げているものはどれか。\nＡ　ＭＢＯとは Management Buyout の略で、企業の経営権取得などを目的として株の買い取りを希望する人が、買い付け期間や価格を公表し、不特定多数の株主から株式を買い取ることである。\nＢ　ＮＩＳＡとは、株式や投資信託の配当金や分配金、売却益が非課税になる少額投資非課税制度のことで、2024 年１月からは制度が拡充され、非課税保有限度額が無制限になった。\nＣ　ストックオプションとは、自社の株式を、会社があらかじめ決めた価格で購入できる権利を社員や役員に割り当てる仕組みのことで、一定の期間や定められた数量の範囲内で好きな時に自社株を購入することができる。\nＤ　年収の壁とは、家族の扶養に入っているパートやアルバイトで働く労働者が、一定の年収に達すると税金や社会保険料を負担しなければならなくなるため、手取り収入が減少しないように年収を抑えようとする基準となる額のことである。",
    "choices": {
      "ア": "Ａ、Ｂ",
      "イ": "Ａ、Ｃ",
      "ウ": "Ｂ、Ｃ",
      "エ": "Ｂ、Ｄ",
      "オ": "Ｃ、Ｄ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Ｃは役職員があらかじめ定めた価格で株式を取得できる権利、Ｄは税・社会保険料の負担が変わる年収の境目を説明している。",
    "choiceExplanations": {
      "ア": "Ａは公開買付け（TOB）の説明であり、ＭＢＯは経営陣による買収を指す。Ｂも非課税保有限度額を無制限としている点が誤りである。",
      "イ": "Ｃのストックオプションは妥当だが、Ａが説明する公表した条件での株式買付けはTOBである。",
      "ウ": "Ｃは妥当だが、2024年のＮＩＳＡでも生涯の非課税保有限度額は1,800万円に設定されている。",
      "エ": "Ｄの年収の壁は妥当だが、ＢのＮＩＳＡは非課税保有期間を無期限とする一方、保有限度額は無制限ではない。",
      "オ": "Ｃは役職員があらかじめ定めた価格で株式を取得できる権利、Ｄは税・社会保険料の負担が変わる年収の境目を説明している。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問25。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-26",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "社会事情",
    "topicTags": [
      "社会事情"
    ],
    "difficulty": 3,
    "question": "日本の国内事情に関する次のＡ～Ｄの記述の正誤の組合せとして最も妥当なものはどれか。\nＡ 2024 年 11 月に施行された、いわゆるフリーランスを保護する新法では、委託事業者は、フリーランスに対し業務を委託した場合、再委託の場合を除き、フリーランスから給付（成果物・役務）を受領した日から起算して 30 日以内に報酬支払期日を定め、その期日内に報酬を支払わなければならないとされている。\nＢ 2024 年 12 月の臨時国会で成立した改正政治資金規正法では、従来の規制である「外国人による献金の禁止」の抜け穴となっていた、「外国人及び外国法人による政治資金パーティー券の購入禁止」が盛り込まれた。\nＣ　財務省の発表によると、令和６年度の税収総額は約 70 兆円と過去最高を更新する見通しで、税収増の寄与分により、令和６年度末の国及び地方の長期債務残高は前年度より微減し 900 兆円程度となる見込みである。\nＤ　2024 年に国内で生まれた日本人の子どもの数は、68 万 7000 人程度と推計され、2022 年に初めて 80 万人を割ってからわずか２年で 70 万人を下回る見込みとなった。",
    "choices": {
      "ア": "Ａ：正　Ｂ：正　Ｃ：誤　Ｄ：誤",
      "イ": "Ａ：正　Ｂ：誤　Ｃ：正　Ｄ：誤",
      "ウ": "Ａ：誤　Ｂ：正　Ｃ：誤　Ｄ：正",
      "エ": "Ａ：誤　Ｂ：誤　Ｃ：正　Ｄ：正",
      "オ": "Ａ：誤　Ｂ：誤　Ｃ：正　Ｄ：誤"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "フリーランスへの支払期日は原則60日以内で、外国人などによる政治資金パーティー券の購入は禁止された。長期債務残高は900兆円程度を超えており、2024年の日本人出生数は推計で70万人を割った。",
    "choiceExplanations": {
      "ア": "フリーランス新法の報酬支払期日は受領日から原則60日以内であり、Ａの30日ではない。",
      "イ": "Ａの支払期日の原則は60日である。Ｃの国・地方の長期債務残高も900兆円程度を大幅に超える。",
      "ウ": "フリーランスへの支払期日は原則60日以内で、外国人などによる政治資金パーティー券の購入は禁止された。長期債務残高は900兆円程度を超えており、2024年の日本人出生数は推計で70万人を割った。",
      "エ": "Ｂが挙げる外国人や外国法人による政治資金パーティー券購入の規制は改正法に盛り込まれた。Ｃの長期債務残高の規模も公表資料とは異なる。",
      "オ": "2024年の日本人出生数は70万人を下回る見込みとなった。Ｄを誤りとするこの組合せは当てはまらない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問26。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-27",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "社会事情",
    "topicTags": [
      "社会事情"
    ],
    "difficulty": 3,
    "question": "世界の状況に関する次のＡ～Ｅの記述のうち、妥当なもののみを全て挙げているものはどれか。\nＡ　2024 年 12 月、シリアでは反政府勢力による攻撃を受けて政権が崩壊し、シリア解放機構が暫定政権を立ち上げ、バッシャール・アサド大統領はロシアに亡命した。\nＢ　2024 年６月にスイスで開かれた世界平和サミットには、世界 90 か国以上が出席したが、ロシアは招かれず、中国は欠席し、出席した国のうちでも、ブラジルやインドなど約 10 か国は共同声明への署名に応じなかった。\nＣ　2022 年２月のロシアによるウクライナ侵攻後、ウクライナ、モルドバ、ジョージアはＥＵに加盟を申請しており、2024 年６月からの加盟交渉の結果、12 月にウクライナとモルドバの正式加盟が認められた。\nＤ　2024 年９月、イスラエルのネタニヤフ政権は、隣接するヨルダンに軍事侵攻し、空爆を行うなどして武装組織ヒズボラの拠点を攻撃し、ヒズボラの指導者ハッサン・ナスララ師を殺害した。\nＥ　現在のインドネシアの首都はカリマンタン島にあるジャカルタであるが、人口集中や大気汚染などを理由に首都移転計画が進められており、2045 年頃にはジャワ島のヌサンタラが新首都となる予定である。",
    "choices": {
      "ア": "Ａ、Ｂ",
      "イ": "Ａ、Ｄ",
      "ウ": "Ｂ、Ｃ",
      "エ": "Ｃ、Ｅ",
      "オ": "Ｄ、Ｅ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Ａはシリアのアサド政権崩壊と暫定政権、Ｂはロシアが招かれず一部参加国が共同声明に署名しなかったスイスでの会合を正しく述べている。",
    "choiceExplanations": {
      "ア": "Ａはシリアのアサド政権崩壊と暫定政権、Ｂはロシアが招かれず一部参加国が共同声明に署名しなかったスイスでの会合を正しく述べている。",
      "イ": "Ａは適切だが、Ｄのヒズボラに対する作戦が行われたのはヨルダンではなくレバノンである。",
      "ウ": "Ｂは適切だが、ウクライナとモルドバはＥＵ加盟交渉に入った段階で、2024年12月に正式加盟していない。",
      "エ": "Ｃは交渉開始と正式加盟を混同している。Ｅのジャカルタはジャワ島、ヌサンタラはカリマンタン島にあり、島名が逆である。",
      "オ": "ヒズボラの活動拠点はレバノンにある。また、ジャカルタはジャワ島にあり、ヌサンタラはカリマンタン島に建設されている。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問27。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-28",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "社会事情",
    "topicTags": [
      "社会事情"
    ],
    "difficulty": 3,
    "question": "教育・文化・スポーツに関する次のＡ～Ｄの記述の正誤の組合せとして最も妥当なものはどれか。\nＡ　ユネスコの無形文化遺産は、芸能、儀式、社会的慣習、工芸技術など、形のない文化遺産を保護するもので、2024 年には日本の「伝統的酒造り」が登録された。\nＢ 2024 年、二曲一双の「竹鶏図屏風」と「梅鯉図屏風」が、これまでつながりを示す資料のなかった、絵師の尾形光琳と本阿弥光悦による合作であることが確認された。\nＣ 「大学ファンド」は、世界最高水準の研究大学の形成を目的として創設されたものであり、2025 年度から「国際卓越研究大学」に認定された東北大学に対し、このファンドから支援が行われる運びとなった。\nＤ　2028 年のロサンゼルスオリンピックからは、近代五種競技でオブスタクルに代わって馬術が取り入れられることとなっており、2024 年 11 月の近代五種全日本選手権大会でも、馬術が初めて行われた。",
    "choices": {
      "ア": "Ａ：正　Ｂ：正　Ｃ：誤　Ｄ：誤",
      "イ": "Ａ：正　Ｂ：誤　Ｃ：正　Ｄ：誤",
      "ウ": "Ａ：誤　Ｂ：正　Ｃ：誤　Ｄ：正",
      "エ": "Ａ：誤　Ｂ：誤　Ｃ：正　Ｄ：正",
      "オ": "Ａ：誤　Ｂ：誤　Ｃ：正　Ｄ：誤"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Ａの伝統的酒造りの登録と、Ｃの東北大学に対する大学ファンドからの支援は妥当である。Ｂは屏風の作者が異なり、Ｄは馬術とオブスタクルの導入・廃止が逆である。",
    "choiceExplanations": {
      "ア": "Ａは妥当だが、Ｂにいう屏風の作者は尾形光琳と本阿弥光悦ではない。東北大学が大学ファンドによる支援対象となったＣも妥当である。",
      "イ": "Ａの伝統的酒造りの登録と、Ｃの東北大学に対する大学ファンドからの支援は妥当である。Ｂは屏風の作者が異なり、Ｄは馬術とオブスタクルの導入・廃止が逆である。",
      "ウ": "2024年には日本の伝統的酒造りが登録され、Ｂの屏風も尾形光琳と本阿弥光悦の合作ではない。",
      "エ": "伝統的酒造りの登録は事実である。近代五種では馬術がオブスタクルに置き換えられる。",
      "オ": "Ｃは妥当だが、日本の伝統的酒造りは2024年にユネスコの無形文化遺産として登録されており、Ａを誤りとするのは適切でない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問28。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-29",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "社会事情",
    "topicTags": [
      "社会事情"
    ],
    "difficulty": 3,
    "question": "環境・科学に関する次のＡ～Ｄの記述のうち、妥当なもののみを全て挙げているものはどれか。\nＡ　2024 年９月、環境省は、鹿児島県奄美大島で駆除を進めてきた特定外来生物のアライグマの根絶を宣言した。\nＢ　2024 年 12 月、和歌山県串本町の発射場から民間ロケットの「カイロス」２号機が打ち上げられ、ロケットに積まれた実験用衛星を地球周回軌道に投入することに民間単独として初めて成功した。\nＣ　2024 年には太陽フレアの影響で地球の磁場が大きく乱れる磁気嵐が発生したことにより、日本でも低緯度オーロラが観測された。\nＤ　2024 年の国連環境計画（ＵＮＥＰ）の発表によると、2023 年の世界の温室効果ガスの排出量は 571 億トン（二酸化炭素換算）に及び、前年から 1.3％増加して過去最多になった。",
    "choices": {
      "ア": "Ａ、Ｂ",
      "イ": "Ａ、Ｃ",
      "ウ": "Ａ、Ｄ",
      "エ": "Ｂ、Ｃ",
      "オ": "Ｃ、Ｄ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "太陽活動に伴う磁気嵐で日本でも低緯度オーロラが観測され、ＵＮＥＰは2023年の世界の温室効果ガス排出量が571億トン相当で過去最大となったと報告している。",
    "choiceExplanations": {
      "ア": "奄美大島で根絶が宣言されたのはアライグマではなくマングースである。カイロス2号機も人工衛星の軌道投入には成功していない。",
      "イ": "Ｃは適切だが、奄美大島で環境省が根絶を宣言した対象はマングースである。",
      "ウ": "Ｄは適切だが、Ａは奄美大島で駆除を進めた外来種を取り違えている。",
      "エ": "低緯度オーロラは観測された一方で、カイロス2号機は衛星の投入に成功していない。",
      "オ": "太陽活動に伴う磁気嵐で日本でも低緯度オーロラが観測され、ＵＮＥＰは2023年の世界の温室効果ガス排出量が571億トン相当で過去最大となったと報告している。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問29。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  },
  {
    "id": "saibansho-ippan-dai-2025-annual-kiso-30",
    "exam": "saibansho-ippan-dai",
    "year": 2025,
    "season": "annual",
    "session": "kiso",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "社会事情",
    "topicTags": [
      "社会事情"
    ],
    "difficulty": 3,
    "question": "医療に関する次のＡ～Ｄの記述の正誤の組合せとして最も妥当なものはどれか。\nＡ 2024 年 10 月から開始された新型コロナワクチンの定期接種では、投与後に体内でｍＲＮＡを自己複製する「レプリコンワクチン」と呼ばれるタイプのワクチンも採用されている。\nＢ　ＡＩ創薬とは、人工知能を使って薬の研究・開発を進めることであり、長期にわたる実験を必要としないことから開発期間やコストの削減につながることが期待されるが、2024 年現在の日本では創薬におけるＡＩの導入が禁止されている。\nＣ　動物の臓器をヒトに移植する「異種移植」の研究は世界各国で進められており、日本でも 2024 年 11 月、大学発のベンチャー企業などのグループが、ヒトへの移植を想定して遺伝子操作されたブタの腎臓をサルに移植する試験に成功した。\nＤ　日本では医師が処方する医療用医薬品の価格は製薬メーカーが自由に設定してよいこととなっており、各社が価格競争を行うことで患者の負担や社会保障費が減ることが期待されている。",
    "choices": {
      "ア": "Ａ：正　Ｂ：正　Ｃ：誤　Ｄ：誤",
      "イ": "Ａ：正　Ｂ：誤　Ｃ：正　Ｄ：誤",
      "ウ": "Ａ：正　Ｂ：誤　Ｃ：誤　Ｄ：正",
      "エ": "Ａ：誤　Ｂ：正　Ｃ：誤　Ｄ：正",
      "オ": "Ａ：誤　Ｂ：誤　Ｃ：正　Ｄ：正"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "2024年の定期接種に自己増幅型ワクチンが含まれ、同年にブタの腎臓をサルに移植する研究成果が報告された。日本のＡＩ創薬は一律に禁止されておらず、保険診療で用いる薬価は公定価格である。",
    "choiceExplanations": {
      "ア": "Ａの自己増幅型ワクチンは定期接種に含まれたが、日本で創薬へのＡＩの導入が禁止されているというＢは誤りである。",
      "イ": "2024年の定期接種に自己増幅型ワクチンが含まれ、同年にブタの腎臓をサルに移植する研究成果が報告された。日本のＡＩ創薬は一律に禁止されておらず、保険診療で用いる薬価は公定価格である。",
      "ウ": "Ｃの動物間での異種移植研究の報告は妥当である。Ｄの保険診療に使われる医薬品の薬価を各企業が自由に決定できるとする点は誤りである。",
      "エ": "Ａにある種類のワクチンは定期接種に採用されている。一方、創薬へのＡＩ導入を禁じているというＢと薬価を自由に決めるというＤは適切でない。",
      "オ": "ＢとＤは誤りだが、Ａの自己増幅型ワクチンの定期接種への採用も妥当である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14mondai/01-XYC-14kiso.pdf",
    "sourceAnswerUrl": "https://www.courts.go.jp/saiyo/vc-files/saiyo/2025/saisi/XYC-14seitou/XYC-14kisoseitou.pdf",
    "sourceAttribution": "出典：裁判所 令和7年度裁判所職員採用一般職試験（裁判所事務官・大卒程度区分） 第1次試験 基礎能力試験 問30。解説は過去問AIの独自作成。",
    "license": "COURTS-attributed"
  }
];
