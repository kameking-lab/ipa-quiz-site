import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2024_SENMON_NOSON: Question[] = [
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q01",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "工学基礎",
    "topicTags": [
      "線形微分方程式",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次の与えられた初期条件における微分方程式の解として最も妥当なのはどれか。ただし、eは自然対数の底とする。\n微分方程式：d²y/dx² − 3dy/dx − 10y = 0\n初期条件：dy/dx (x = 0) = 3、y(x = 0) = 0",
    "choices": {
      "ア": "y = −e^(−3x) + 1",
      "イ": "y = −(3/7)(e^(−5x) − e^(2x))",
      "ウ": "y = (3/7)(e^(5x) − e^(−2x))",
      "エ": "y = (1/2)e^x(cos 5x − sin 2x) − 1/2",
      "オ": "y = e^x(5 cos x − 2 sin x) − 1"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "特性方程式は(r−5)(r＋2)＝0です。一般解Ae^(5x)＋Be^(−2x)に初期条件を入れるとA＋B＝0、5A−2B＝3となり、A＝3/7、B＝−3/7を得ます。",
    "choiceExplanations": {
      "ア": "初期値と初期傾きは満たしますが、e^(−3x)の指数−3は特性方程式r²−3r−10＝0の根ではなく、非零の定数項もこの同次方程式の解には含まれません。",
      "イ": "この式も初期条件は満たしますが、特性根は−5と2ではなく、符号の異なる5と−2です。",
      "ウ": "特性方程式は(r−5)(r＋2)＝0です。一般解Ae^(5x)＋Be^(−2x)に初期条件を入れるとA＋B＝0、5A−2B＝3となり、A＝3/7、B＝−3/7を得ます。",
      "エ": "y(0)は0ですが、微分してx＝0を代入すると−1/2です。特性根が実数なので三角関数も不要です。",
      "オ": "x＝0でy＝4となり初期値に反します。特性方程式は二つの実根を持つため、この振動形は方程式の一般解にも含まれません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q02",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "工学基礎",
    "topicTags": [
      "関数の値域",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "関数 y = (x² − 3)/e^x のとき、yの値の範囲として最も妥当なのはどれか。ただし、eは自然対数の底とする。",
    "choices": {
      "ア": "−2e ≤ y",
      "イ": "−2e ≤ y ≤ 6e^(−3)",
      "ウ": "−3 ≤ y",
      "エ": "0 ≤ y",
      "オ": "0 ≤ y ≤ 6e^(−3)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "y′＝−e^(−x)(x−3)(x＋1)より極小点x＝−1ではy＝−2eです。x→−∞でy→＋∞となるので、上限はありません。",
    "choiceExplanations": {
      "ア": "y′＝−e^(−x)(x−3)(x＋1)より極小点x＝−1ではy＝−2eです。x→−∞でy→＋∞となるので、上限はありません。",
      "イ": "x＝3の6e^(−3)は局所的な極大値です。xが十分小さい負の数ならe^(−x)とx²−3の双方が大きくなり、この値を超えます。",
      "ウ": "−3はx＝0での値です。x＝−1では−2eとなり、−3より小さい値を取ります。",
      "エ": "e^xは常に正ですが、分子x²−3は例えばx＝0で−3になるため、yは負にもなります。",
      "オ": "yはx＝0で−3であり、負の値も取ります。さらにx→−∞で発散するため、有限の上限もありません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q03",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "工学基礎",
    "topicTags": [
      "組合せと確率",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "赤玉7個、白玉5個、青玉3個の合計15個の玉が入った箱の中から、無作為に5個の玉を同時に取り出したとき、赤玉2個、白玉2個、青玉1個が出る確率として最も妥当なのはどれか。",
    "choices": {
      "ア": "1/3",
      "イ": "4/105",
      "ウ": "1/143",
      "エ": "30/143",
      "オ": "34/3003"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全体は₁₅C₅＝3,003通りで、有利な場合は₇C₂×₅C₂×₃C₁＝21×10×3＝630通りです。したがって630/3,003＝30/143です。",
    "choiceExplanations": {
      "ア": "全ての取り出し方3,003通りの3分の1なら1,001通りですが、色ごとの選び方を掛けると630通りです。",
      "イ": "赤2個と白2個の組合せ数はそれぞれ21と10で、青1個の3通りも掛けた630を全体3,003で割ります。",
      "ウ": "1/143は21/3,003です。21は赤玉2個の選び方だけで、白玉と青玉の組合せも数える必要があります。",
      "エ": "全体は₁₅C₅＝3,003通りで、有利な場合は₇C₂×₅C₂×₃C₁＝21×10×3＝630通りです。したがって630/3,003＝30/143です。",
      "オ": "色ごとの組合せ数は足し合わせるのではなく掛け合わせます。赤・白・青を合わせた選び方は630通りです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q04",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "トラスの部材力",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような荷重を受けるトラスにおいて、部材EFに生じる部材力として最も妥当なのはどれか。ただし、部材力は「＋」を引張力、「−」を圧縮力とし、部材の自重は考慮しないものとする。",
    "choices": {
      "ア": "−25√2 kN",
      "イ": "−15√2 kN",
      "ウ": "−10√2 kN",
      "エ": "＋10√2 kN",
      "オ": "＋15√2 kN"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Bの反力は25 kNで、節点Bの鉛直方向の釣合いからBE＝−25√2 kNです。Eで引張を正として釣合いを取るとED＋EF＝−25√2、EF−ED＝−5√2となるので、EF＝−15√2 kNです。",
    "choiceExplanations": {
      "ア": "AまわりのモーメントからBの反力は25 kNです。−25√2 kNは節点Bで得られる部材BEの力で、EFはEでの釣合いを取って求めます。",
      "イ": "Bの反力は25 kNで、節点Bの鉛直方向の釣合いからBE＝−25√2 kNです。Eで引張を正として釣合いを取るとED＋EF＝−25√2、EF−ED＝−5√2となるので、EF＝−15√2 kNです。",
      "ウ": "−10√2 kNは節点Eの二つの釣合い式から求まるEDの圧縮力です。EFはEDより圧縮力の絶対値が大きくなります。",
      "エ": "節点Eで各部材が節点を引く向きを正とすると、EFは−15√2 kNです。正の値は引張を表し、実際の圧縮と逆です。",
      "オ": "大きさ15√2 kNは合っていますが、EFは節点を押す圧縮部材です。設問の符号では負になります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q04.webp"
    ],
    "imageAltTexts": [
      "支点・荷重・節点間距離と角度を示すトラスの原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q05",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "単純梁のせん断力と曲げ",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような集中荷重と等分布荷重が作用する単純梁において、左側の支点Aから右に6 m離れた点Cにおけるせん断力及び曲げモーメントの組合せとして最も妥当なのはどれか。ただし、せん断力は断面の左側に上向きの力を生じるものを正、曲げモーメントは梁の上側に圧縮応力を生じるものを正とし、梁の自重は考慮しないものとする。",
    "choices": {
      "ア": "−20 kN／200 kN·m",
      "イ": "−20 kN／160 kN·m",
      "ウ": "0 kN／200 kN·m",
      "エ": "20 kN／200 kN·m",
      "オ": "20 kN／160 kN·m"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "全体の釣合いからAの上向き反力は140 kNで、Cより左の等分布荷重は40 kNです。左側の合力は140−120−40＝−20 kN、曲げは140×6−120×5−40×1＝200 kN·mです。",
    "choiceExplanations": {
      "ア": "全体の釣合いからAの上向き反力は140 kNで、Cより左の等分布荷重は40 kNです。左側の合力は140−120−40＝−20 kN、曲げは140×6−120×5−40×1＝200 kN·mです。",
      "イ": "せん断力は合いますが、Cより左の長さ2 mの等分布荷重の合力はCの左1 mに作用するので、そのモーメントは40 kN·mです。",
      "ウ": "曲げモーメントは合いますが、左側では反力140 kNに対し下向き荷重は120＋40＝160 kNとなり、せん断力は−20 kNです。",
      "エ": "曲げモーメントは合いますが、設問で正とする左側の上向き合力は140−160＝−20 kNです。",
      "オ": "せん断力の符号は負です。40 kNの分布荷重合力の腕の長さは2 mではなく1 mなので、曲げモーメントは200 kN·mです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q05.webp"
    ],
    "imageAltTexts": [
      "単純梁の支点と120 kNの集中荷重・20 kN/mの等分布荷重を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q06",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "切欠き図形の図心",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような半径10.0の円から内接する直角二等辺三角形ABCを切り取った図形（網掛け部分）の図心の座標(x₀, y₀)として最も妥当なのはどれか。ただし、円周率は3.14、√2は1.41とし、線分ABはx軸に対して平行である。",
    "choices": {
      "ア": "(7.65, 7.65)",
      "イ": "(10.0, 10.0)",
      "ウ": "(11.1, 11.1)",
      "エ": "(11.6, 11.6)",
      "オ": "(12.2, 12.2)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "円の面積は314、三角形は斜辺20で面積100、図心は(7.65, 7.65)です。面積一次モーメントを差し引くと、両座標は(314×10−100×7.65)/(314−100)≒11.1です。",
    "choiceExplanations": {
      "ア": "7.65は取り除く三角形の図心座標です。残る図形の図心は、円の中心から切取り部分と反対側へ移ります。",
      "イ": "(10.0, 10.0)は切り取る前の円の中心です。左下側に偏った三角形を除くので、残る図形の両座標は10.0より大きくなります。",
      "ウ": "円の面積は314、三角形は斜辺20で面積100、図心は(7.65, 7.65)です。面積一次モーメントを差し引くと、両座標は(314×10−100×7.65)/(314−100)≒11.1です。",
      "エ": "除いた面積は斜辺20を底辺、その中点から直角頂点までの距離10を高さとして100になります。この面積と三角形の図心を使うと11.6ではなく11.1です。",
      "オ": "面積100の三角形が円の図心から座標方向に約2.35離れているため、残る面積214で割った補正は約1.10です。元の円の座標10.0に足して11.1になります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q06.webp"
    ],
    "imageAltTexts": [
      "半径10.0の円と円に内接する直角二等辺三角形ABCを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q07",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "鋼材の引張と伸び",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "直径30 cmの円形断面で長さが3.0 mの材質が一様な鋼材を、長さ方向に0.10 cm伸ばすのに要する引張力として最も妥当なのはどれか。ただし、この鋼材の縦弾性係数は2.0×10⁵ N/mm²、円周率は3.1とし、鋼材の伸びは比例限度内にあるものとする。",
    "choices": {
      "ア": "1.1×10³ N",
      "イ": "4.7×10⁶ N",
      "ウ": "1.9×10⁷ N",
      "エ": "4.7×10⁹ N",
      "オ": "1.4×10¹⁰ N"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "応力は2.0×10⁵×(1.0/3,000) N/mm²で、半径150 mmの断面積は3.1×150²＝69,750 mm²です。積を取ると約4.7×10⁶ Nです。",
    "choiceExplanations": {
      "ア": "ひずみは1.0/3,000で応力は約66.7 N/mm²です。これを約69,750 mm²の断面全体に掛けるので、力は10³ N台にとどまりません。",
      "イ": "応力は2.0×10⁵×(1.0/3,000) N/mm²で、半径150 mmの断面積は3.1×150²＝69,750 mm²です。積を取ると約4.7×10⁶ Nです。",
      "ウ": "直径300 mmを半径に用いると面積を4倍にして約1.9×10⁷ Nとなります。正しい半径は150 mmです。",
      "エ": "0.10 cmは1.0 mm、3.0 mは3,000 mmなので、ひずみは約0.000333です。長さの換算をそろえると4.7×10⁹ Nより千分の一になります。",
      "オ": "伸びを元の長さで割ってから縦弾性係数と断面積を掛けます。元の長さ3,000 mmで割る前の値は約1.4×10¹⁰ Nに相当します。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q08",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "円管の層流と損失水頭",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、管水路の流れに関する記述であるが、ア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\nただし、円周率を3、重力加速度の大きさを10 m/s²、水の動粘性係数を0.01 cm²/sとする。\n「内径10 cmの円管に毎秒0.075 Lの水が流れている。この流れのレイノルズ数（Re）から、流れは［ア］であると判断される。流れが［ア］のとき、水路における摩擦損失水頭を表す［イ］の式に含まれる摩擦損失係数fは、レイノルズ数を用いて f = 64/Re のように表されることが知られている。この式から予測される摩擦損失係数を用いると、この水路3000 mに対する摩擦損失水頭は［ウ］cmと求められる。」",
    "choices": {
      "ア": "層流／ダルシー・ワイズバッハ（Darcy-Weisbach）／0.01",
      "イ": "層流／ダルシー・ワイズバッハ（Darcy-Weisbach）／1.0",
      "ウ": "層流／マニング（Manning）／10",
      "エ": "乱流／マニング（Manning）／1.0",
      "オ": "乱流／マニング（Manning）／0.01"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "断面積75 cm²に75 cm³/sが流れるので流速は1 cm/s、Reは1,000で層流です。ダルシー・ワイズバッハ式にf＝0.064を代入すると0.064×(3,000/0.10)×(0.01²/20)＝0.0096 mです。",
    "choiceExplanations": {
      "ア": "摩擦損失水頭は0.0096 mで、メートルで表せば約0.01です。空欄の単位はcmなので0.96 cmを約1.0 cmとします。",
      "イ": "断面積75 cm²に75 cm³/sが流れるので流速は1 cm/s、Reは1,000で層流です。ダルシー・ワイズバッハ式にf＝0.064を代入すると0.064×(3,000/0.10)×(0.01²/20)＝0.0096 mです。",
      "ウ": "層流の判定は合いますが、f＝64/Reを使うのはダルシー・ワイズバッハ式です。損失水頭は0.96 cmです。",
      "エ": "Reは1,000なので層流と判断されます。約1.0 cmの損失水頭はダルシー・ワイズバッハ式から求まります。",
      "オ": "1 cm/sの流速と内径10 cmからRe＝1,000となり、乱流を仮定する理由はありません。空欄はcmなので約1.0です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q09",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "フルード相似則",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "河川の縮尺1/25の水理模型において、ある測定地点の流速及び流量がそれぞれ0.40 m/s、0.0064 m³/sとする。フルード相似則を適用した場合の実河川の対応地点における流速及び流量の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "2.0 m/s／0.16 m³/s",
      "イ": "2.0 m/s／0.80 m³/s",
      "ウ": "2.0 m/s／20 m³/s",
      "エ": "10 m/s／0.16 m³/s",
      "オ": "10 m/s／20 m³/s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "重力加速度が同じならフルード数を等しくする流速比は√25＝5です。断面積比25²も掛けて、流速0.40×5＝2.0 m/s、流量0.0064×25²×5＝20 m³/sを得ます。",
    "choiceExplanations": {
      "ア": "流速は合っていますが、実河川の流量は長さの比25をそのまま掛けるのではなく、断面積比625と流速比5の積を掛けて求めます。",
      "イ": "流速は相似則により2.0 m/sです。流量は断面積に流速を掛ける量なので、縮尺から求めた流量比は25²×5＝3,125です。",
      "ウ": "重力加速度が同じならフルード数を等しくする流速比は√25＝5です。断面積比25²も掛けて、流速0.40×5＝2.0 m/s、流量0.0064×25²×5＝20 m³/sを得ます。",
      "エ": "流速と流量のどちらも長さの比25をそのまま掛ける量ではありません。流速比は5で、流量比は3,125です。",
      "オ": "流量は合っていますが、フルード相似における流速比は長さの比の平方根です。実流速は0.40×5＝2.0 m/sです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q10",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "連通容器の静水圧",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような変形しない容器において、閉じ込められた空気の気圧p_Aとして最も妥当なのはどれか。ただし、容器内は静水圧平衡状態にあり、大気圧p₀は100 kPa、重力加速度の大きさは10 m/s²、水の密度は1000 kg/m³とし、空気成分の水への溶解は無視できるものとする。",
    "choices": {
      "ア": "70 kPa",
      "イ": "100 kPa",
      "ウ": "130 kPa",
      "エ": "140 kPa",
      "オ": "150 kPa"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "空気側水面は大気側より3＋2＝5 m低く、同じ水の中で圧力はρgh＝1,000×10×5＝50 kPa増えます。この水面に接する空気の圧力は100＋50＝150 kPaです。",
    "choiceExplanations": {
      "ア": "閉じ込めた空気側の水面は大気開放側より低い位置です。連通する水では深くなるほど圧力が増すので、大気圧を下回りません。",
      "イ": "水面が同じ高さなら100 kPaになりますが、図の水面には5 mの高低差があり、それに対応する圧力を加えます。",
      "ウ": "図の3 mは大気側水面から途中の位置までの距離です。空気側水面までの高低差はその下の2 mも足した5 mです。",
      "エ": "水面の高低差は縦の寸法3 mと2 mの和です。4 mとしたときの40 kPaではなく50 kPaを加えます。",
      "オ": "空気側水面は大気側より3＋2＝5 m低く、同じ水の中で圧力はρgh＝1,000×10×5＝50 kPa増えます。この水面に接する空気の圧力は100＋50＝150 kPaです。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q10.webp"
    ],
    "imageAltTexts": [
      "大気開放側の水面と閉じ込めた空気側の水面の高さを示す容器の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q11",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "ベンチュリー管",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のようなベンチュリー管において、管を流れる水の流量Qが0.64 m³/sのとき、マノメータAとマノメータBの圧力水頭差hとして最も妥当なのはどれか。ただし、水の密度を1000 kg/m³、重力加速度の大きさを9.8 m/s²、円周率を3.1、マノメータAが接続されている地点の管の直径を0.80 m、マノメータBが接続されている地点の管の直径を0.40 mとし、損失水頭は無視するものとする。",
    "choices": {
      "ア": "3.1×10⁻⁴ m",
      "イ": "9.6×10⁻² m",
      "ウ": "1.1×10⁻¹ m",
      "エ": "1.3 m",
      "オ": "2.2 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "流速はAで0.64/(3.1×0.40²)≒1.29 m/s、Bで約5.16 m/sです。高さが同じなので、ベルヌーイ式からh＝(5.16²−1.29²)/(2×9.8)≒1.3 mです。",
    "choiceExplanations": {
      "ア": "管の速度は流量を断面積で割って求め、Bでは約5.16 m/sになります。この速度の水頭だけで1 mを超えるため、差が10⁻⁴ m台にはなりません。",
      "イ": "断面積の比は4対1なので、Bの速度はAの4倍です。水頭は速度に比例するのではなく、速度の二乗を2gで割ります。",
      "ウ": "Aの速度水頭は約0.085 mですが、Bでは流速4倍のため速度水頭は16倍です。差は約0.11 mより大きくなります。",
      "エ": "流速はAで0.64/(3.1×0.40²)≒1.29 m/s、Bで約5.16 m/sです。高さが同じなので、ベルヌーイ式からh＝(5.16²−1.29²)/(2×9.8)≒1.3 mです。",
      "オ": "流量と二つの断面積で決まる流速を使うと、Bの速度水頭は約1.36 mです。そこからAの約0.085 mを引くので2.2 mには達しません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q11.webp"
    ],
    "imageAltTexts": [
      "径0.80 mと0.40 mのベンチュリー管および圧力水頭差hを示す原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q12",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "土の三相と間隙率",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "農地において円筒サンプラーを用いて採取した不攪乱状態の土壌について、次の測定値を得た。現場における土壌の間隙率と気相率の組合せとして最も妥当なのはどれか。ただし、水の密度は1.0 g/cm³とし、炉乾燥後の土壌質量は105 ℃で24時間乾燥させた後の質量とする。",
    "choices": {
      "ア": "40％／15％",
      "イ": "50％／15％",
      "ウ": "50％／25％",
      "エ": "60％／25％",
      "オ": "60％／35％"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "固相は420/2.6≒162 cm³、液相は(520−420)/1.0＝100 cm³です。総体積400 cm³から、間隙率は(400−162)/400≒60％、気相率は(400−162−100)/400≒35％です。",
    "choiceExplanations": {
      "ア": "約40％は土粒子の体積割合です。間隙率は全体から固相を引いた約60％です。",
      "イ": "固相の体積は420/2.6≒162 cm³なので、400 cm³のうち間隙は約238 cm³です。気相はここから水100 cm³を引いた約138 cm³で、全体の約35％です。",
      "ウ": "乾燥による減量100 gが示す体積割合25％は液相率です。間隙率約60％との差が気相率になります。",
      "エ": "間隙率は合っていますが、25％は乾燥で失われた水100 cm³の体積割合です。気相率は間隙率から液相率を引きます。",
      "オ": "固相は420/2.6≒162 cm³、液相は(520−420)/1.0＝100 cm³です。総体積400 cm³から、間隙率は(400−162)/400≒60％、気相率は(400−162−100)/400≒35％です。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q12.webp"
    ],
    "imageAltTexts": [
      "サンプラー容積・乾燥前後の土壌質量・土粒子密度を示す原表"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q13",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "ダルシーの法則",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような砂が充填された水平方向のパイプを通過する水について、流量Qとして最も妥当なのはどれか。ただし、充填された砂の透水係数は1.0×10⁻³ cm/s、有効間隙率は30％、水平方向のパイプの断面積は20 cm²とし、定常状態であるものとする。",
    "choices": {
      "ア": "2.7×10⁻⁴ cm³/s",
      "イ": "9.0×10⁻⁴ cm³/s",
      "ウ": "3.0×10⁻³ cm³/s",
      "エ": "2.7×10⁻² cm³/s",
      "オ": "1.3×10⁻¹ cm³/s"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "動水勾配は水位差9.0 cmを長さ200 cmで割った0.045です。ダルシーの法則からQ＝k i A＝(1.0×10⁻³)×0.045×20＝9.0×10⁻⁴ cm³/sです。",
    "choiceExplanations": {
      "ア": "ダルシー流速に掛けるのは管の全断面積です。ここでさらに有効間隙率0.30を掛けると、流量を過小評価します。",
      "イ": "動水勾配は水位差9.0 cmを長さ200 cmで割った0.045です。ダルシーの法則からQ＝k i A＝(1.0×10⁻³)×0.045×20＝9.0×10⁻⁴ cm³/sです。",
      "ウ": "この値は流量の計算に有効間隙率で割る操作を加えたものに相当します。間隙率による補正は間隙内の平均流速を求める場合に用います。",
      "エ": "水頭差は9.0 cm、管の長さは200 cmなので、動水勾配は0.045です。単位をそろえて比を取ると10⁻² cm³/s台にはなりません。",
      "オ": "流量を決めるのは上流側水位の絶対値ではなく、両端の水頭差9.0 cmを200 cmで割った勾配です。これに透水係数と断面積を掛けます。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q13.webp"
    ],
    "imageAltTexts": [
      "水位30 cm・21 cmの両端と長さ2.0 mの砂層を示す原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q14",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "地理情報とレーザ測量",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "測量・地理情報に関する記述として最も妥当なのはどれか。\n注：GNSS/IMUはGlobal Navigation Satellite System / Inertial Measurement Unitの略である。",
    "choices": {
      "ア": "GIS（地理情報システム）において、図形要素（空間オブジェクト）間の位置関係を検索する機能をジオリファレンスといい、ある図形要素から一定距離帯のポリゴンを生成する機能をクラスタリングという。",
      "イ": "現在、我が国で採用されている世界測地系は、ジオイドという地球楕円体に準拠している。世界測地系（JGD2011）と旧日本測地系（Tokyo Datum）では、例えば東京（経緯度原点）で約50 mの位置ずれが生じるため、測地系の異なる地図をGISで扱う場合には補正が必要である。",
      "ウ": "地理情報の所在・内容・品質・利用条件などが記述されたジオタグを検索することにより、インターネット上に分散・点在する地理情報を一斉に検索するためのシステムをWebGISという。",
      "エ": "SAR（合成開口レーダ）は、地球観測衛星に搭載されている受動（パッシブ）センサの一種であり、電波が減衰されるため雲の下は観測できないが、昼夜を問わず地表面を観測できる。",
      "オ": "レーザスキャナは、レーザ光を照射し、その反射光により距離を計測する機器である。公共測量では、レーザスキャナやGNSS/IMU装置などで構成される測量システムが航空レーザ測量や車載写真レーザ測量に用いられている。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "レーザスキャナで対象までの距離を測り、GNSSで位置、IMUで姿勢を求めると、移動する航空機や車両からでも地物の座標を算出できます。",
    "choiceExplanations": {
      "ア": "ジオリファレンスは画像や地図を地上の座標に対応させる操作です。地物の周囲に一定距離の領域を作るのはバッファ処理です。",
      "イ": "ジオイドは平均海面を延長して考えた重力の等ポテンシャル面です。東京付近で世界測地系と旧日本測地系を換算すると、同じ緯度経度の地点同士は数百メートル離れます。",
      "ウ": "内容や品質、利用条件を記録するのはメタデータです。WebGISはブラウザなどから地理情報の表示・検索・分析を使える仕組みを広く指します。",
      "エ": "SARは自ら電波を出して反射波を測る能動センサです。マイクロ波を使うため、夜間や雲に覆われたときにも地表を観測できます。",
      "オ": "レーザスキャナで対象までの距離を測り、GNSSで位置、IMUで姿勢を求めると、移動する航空機や車両からでも地物の座標を算出できます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q15",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "重み付き平均",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "表は、ある測線長を測定して得られた結果である。測線長の最確値として最も妥当なのはどれか。",
    "choices": {
      "ア": "24.83 m",
      "イ": "24.88 m",
      "ウ": "25.01 m",
      "エ": "25.03 m",
      "オ": "25.06 m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "分散の逆数を重みとすると16対4対1となります。加重平均は(16×25.03＋4×25.10＋24.75)/21＝25.03 mです。",
    "choiceExplanations": {
      "ア": "標準偏差が最大の24.75 mは最も重みが小さい値です。最も精密な25.03 mに重みを置くと、最確値は25 mを上回ります。",
      "イ": "標準偏差の大きな測定ほど重みを小さくします。標準偏差が0.02、0.04、0.08 mなので重みの比は16対4対1です。",
      "ウ": "標準偏差の逆数を重みとする4対2対1では、この値に近づきます。最確値では分散の逆数を使うので重みの比は16対4対1です。",
      "エ": "分散の逆数を重みとすると16対4対1となります。加重平均は(16×25.03＋4×25.10＋24.75)/21＝25.03 mです。",
      "オ": "25.10 mは最も精密な測定の4分の1の重みしかなく、24.75 mの低い値も加味するため、平均は25.06 mに達しません。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q15.webp"
    ],
    "imageAltTexts": [
      "3回の測線長の測定値と標準偏差を示す原表"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q16",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "かんがい",
    "topicTags": [
      "畑地かんがい",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "畑地灌漑に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 水源から取水した全水量に対する、畑地圃場で作物に有効利用される水量の総和の割合を、一般に搬送効率という。ある圃場において作物に有効利用される水量は、一般にその場所の蒸発散量に降雨量を加えたものとなる。\nB. 圃場内に灌水された水量のうち、有効土層内にとどまる水量の割合を適用効率という。適用効率は灌漑方法によって異なり、一般に地表灌漑ではスプリンクラ灌漑に比べて適用効率が低い。\nC. 灌漑水や雨水が地表面から単位時間当たりに浸入する量をインテークレート（浸入速度）という。現場でインテークレートを測定すると、浸入開始より、時間とともにインテークレートは増加する。初期の2倍の大きさになったときのインテークレートをベーシックインテークレートといい、灌漑方法決定の指標に用いる。\nD. スプリンクラ灌漑は圧力をかけた水を散水する方法で、比較的広い範囲に降雨状の散水が可能であり、地形や土壌による制約が少ないという利点を有する。一方、圧力水を通すためのパイプラインや加圧施設を要することから、施設費や維持管理費がかかることに留意する必要がある。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "適用効率は圃場に入れた水のうち有効土層に残る割合です。スプリンクラは散水範囲や適用地形に利点がありますが、加圧・配水の設備費と維持費を伴います。",
    "choiceExplanations": {
      "ア": "Bの適用効率は妥当ですが、搬送効率は取水から圃場に届くまでの効率です。作物に利用される量まで含めた割合は適用段階の損失も反映します。",
      "イ": "有効な降雨は灌漑で補うべき水量を減らします。インテークレートは一般に時間とともに低下し、次第に安定します。",
      "ウ": "Bは妥当ですが、ベーシックインテークレートは土壌が湿るにつれて浸入速度が低下し、ほぼ一定になったときの値です。",
      "エ": "適用効率は圃場に入れた水のうち有効土層に残る割合です。スプリンクラは散水範囲や適用地形に利点がありますが、加圧・配水の設備費と維持費を伴います。",
      "オ": "Dは妥当ですが、Cは浸入速度の時間変化を逆に述べています。灌漑方法の判断には浸入速度が安定した値を使えます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q17",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "かんがい",
    "topicTags": [
      "水田の減水深",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "連続した5日間において、ある一筆の水田の湛水深を計測したところ、測定開始時は150 mm、測定終了時は140 mmであった。この5日間の合計値として、図のような水田の水収支のデータが得られたとき、この期間の当該水田における減水深の日平均の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "14 mm",
      "イ": "18 mm",
      "ウ": "20 mm",
      "エ": "30 mm",
      "オ": "100 mm"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水収支より、5日間の減水深は取水120と降水20から地表排水50を引き、貯留の減少10を足した100 mmです。5日で割ると20 mmです。",
    "choiceExplanations": {
      "ア": "14 mmは畦畔浸透10 mmと降下浸透60 mmの合計を5で割った値です。減水深には蒸発散も含まれます。",
      "イ": "取水・降水の合計140 mmから地表排水50 mmを引くと90 mmですが、水位も10 mm低下したので減水深の合計は100 mmです。",
      "ウ": "水収支より、5日間の減水深は取水120と降水20から地表排水50を引き、貯留の減少10を足した100 mmです。5日で割ると20 mmです。",
      "エ": "150 mmは取水・降水と貯留低下の合計です。減水深を求めるには地表排水50 mmを除くため、一日平均は20 mmです。",
      "オ": "100 mmは5日間の減水深の合計です。一日平均を求めるには測定期間の5日で割ります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q17.webp"
    ],
    "imageAltTexts": [
      "取水・降水・地表排水・畦畔浸透・降下浸透の5日間合計を示す水田の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q18",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "農業気象",
    "topicTags": [
      "降水と蒸発散の観測",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "降水と蒸発散の観測に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "転倒ます型雨量計は、内部に設置された転倒ますに雨水が流れ込むことで、ますが傾き、その傾斜角を計測することにより雨量を観測するものである。転倒ます型雨量計は、構造上、降雪による降水量を観測できないため、降雪時は積雪観測による降水量への換算が不可欠である。",
      "イ": "レーダ雨量計は、アンテナから指向性を持った電波をパルス状に発射し、空中の雨滴や雪片で反射して戻ってくる電波を受信することにより雨量を観測するものである。",
      "ウ": "ティーセン法は、地点降水量をもとに地形特性や気象特性を勘案して等雨量線を描き、対象地域内の隣り合う等雨量線に挟まれた面積を計上することにより面積降水量を推定する手法である。",
      "エ": "蒸発散とは、蒸発と蒸散を合わせた現象の総称である。このうち、蒸発は、気孔を通じた植物体内の水の気化を指す。蒸発散によって、水と同時に熱エネルギーが顕熱という形で大気に放出される。",
      "オ": "アメダス（Automated Meteorological Data Acquisition System：AMeDAS）は、気象衛星などによって気象現象を面的に監視する目的で整備されている。アメダス観測システムでは、降水量、気温、風向風速、実蒸発散量の4要素が観測され、一部の地点では積雪深も併せて観測されている。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "電波パルスを送信して降水粒子からの反射を受信し、その位置や反射の強さを求めます。反射の強さを降水強度に換算して雨量を推定します。",
    "choiceExplanations": {
      "ア": "一定量の水が入るたびにますが転倒するので、転倒回数から降水量を求めます。雪は融かして水として測れる装置もあります。",
      "イ": "電波パルスを送信して降水粒子からの反射を受信し、その位置や反射の強さを求めます。反射の強さを降水強度に換算して雨量を推定します。",
      "ウ": "説明は等雨量線法です。ティーセン法は各観測点に最も近い領域に分け、各領域の面積を重みとして地点雨量を平均します。",
      "エ": "植物体内の水が気孔などから出る現象は蒸散です。水の気化に使われる熱は潜熱として扱います。",
      "オ": "アメダスは地上の観測所を使う自動気象観測網です。実蒸発散量は通常の観測要素に含まれません。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q19",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "かんがい",
    "topicTags": [
      "水田用水の計画",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の水田灌漑計画に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "寒冷地帯においては、冷害対策として、幼穂を水面下に隠し、気温の低下から保護する掛流しや、冷水障害対策として、夜間のみ給水し、昼間は落水させる止め水灌漑が有効である。",
      "イ": "水田灌漑用水量は、粗用水量に補助水源量や反復利用水量からなる地区内利用可能水量を加えて算定する。なお、粗用水量とは、圃場へ灌漑すべき純用水量に栽培管理用水量を加えたものである。",
      "ウ": "移植栽培における代かき期用水量は、普通期用水量の全体に比べて総量としては小さいが、代かきの実施が休日に集中しやすく、代かき期間中に用水需要のピークとなることが多い。なお、乾田直播栽培の場合、代かき期用水量は必要ないが、初期灌水量を確保する必要がある。",
      "エ": "用水計画における有効雨量とは、灌漑期間中に耕地に降った雨水のうち、作物の栽培に利用できる量のことであり、一般に、日雨量が50 mm未満の場合はその全量、50 mm以上の場合はその90％程度である。",
      "オ": "田畑輪換とは、水田に夏作として水稲と畑作物を交互に作付けることである。水田を畑地転換することにより土層が乾燥して締まることから、水稲作に戻した際に代かき期用水量及び普通期用水量が減少する。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "短期間に代かきが重なると日当たりの用水需要が大きくなります。乾田直播でも播種後の生育に合わせて初期に入水するための用水が必要です。",
    "choiceExplanations": {
      "ア": "幼穂を水中に入れて低温から守るのは深水管理です。冷水を使う場合の止め水灌漑では、日中に水をとどめて水温の上昇を図ります。",
      "イ": "地区内の水を利用できる分は外部からの必要取水量から差し引きます。粗用水量には水路での搬送損失なども見込みます。",
      "ウ": "短期間に代かきが重なると日当たりの用水需要が大きくなります。乾田直播でも播種後の生育に合わせて初期に入水するための用水が必要です。",
      "エ": "有効雨量は排水や湛水できる容量にも左右されます。日雨量が少なくても全て利用できるとは限らず、大雨では余剰水が流出します。",
      "オ": "田畑輪換では乾燥によるひび割れや透水性の変化が起こり得ます。水田に戻したときに代かきや湛水維持の水量が増える場合があります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q20",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "排水",
    "topicTags": [
      "農地排水の計画",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における農用地の排水事業の計画に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 水田の排水計画における計画基準内水位では湛水を許容しており、水稲の穂ばらみ期の草丈を基準に許容湛水深は30 cmを標準としている。また、湛水深が許容湛水深を超える場合、湛水の継続時間は24時間以内としている。\nB. 排水方式には自然排水方式と機械排水方式の二つがあり、排水計画の策定に当たっては、経済性の観点から、可能な限り自然排水方式を活用することが望ましい。\nC. 常時排水は、圃場の湛水深を制御し、土地生産性を向上させる目的で行われる。常時排水計画では、地下水流出量、灌漑用水量、宅地等からの排出量等により計画基準排水量を設定し、降雨による流出量は考慮しない。\nD. 計画基準降雨は、計画排水量の算定の根拠とする降雨のことである。農用地を対象とした排水計画における計画基準降雨は、既往最大又は50～100年に1回程度の降雨量を用いることが多い。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "C、D"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "水田は短時間の湛水を見込んだ水位と継続時間で計画します。自然流下が可能な場所では、ポンプの設置費や運転費を抑えるため自然排水を活用します。",
    "choiceExplanations": {
      "ア": "水田は短時間の湛水を見込んだ水位と継続時間で計画します。自然流下が可能な場所では、ポンプの設置費や運転費を抑えるため自然排水を活用します。",
      "イ": "Aは妥当です。常時排水で扱うのは地下水位などの日常の排水条件であり、設定する排水量から降雨流出を一律に除くとはいえません。",
      "ウ": "Aは妥当ですが、農用地の排水では一般に10年に1回程度の降雨などが基準となり、50～100年程度を通常の基準とはしません。",
      "エ": "Bは妥当です。常時排水には適正な地下水位の維持などの目的があり、圃場の湛水深の制御とだけ捉えるのは適切ではありません。",
      "オ": "Cは常時排水の目的と降雨流出の扱いを誤っています。Dの50～100年は農用地の一般的な排水計画で想定する規模より大きい値です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q21",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "農地整備",
    "topicTags": [
      "畑地の造成",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "畑地の整備に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 改良山成畑工は、大幅に地形を修正するため、造成時に大量の土の移動を伴う。このため施工時は土壌保全等に十分配慮するとともに、栽培技術体系による農地保全や造成コストと営農効果との関係についても考慮しなければならない。\nB. 斜面畑工は、主に急傾斜地に適用され、平坦な畑面と、この畑面を保護及び維持するための法面で構成される。土工量が少ないという長所がある反面、段差斜面による潰れ地率が大きいという短所がある。\nC. 造成計画においては将来的な営農計画とともに、機械化作業や農地の保全に関係する地形や傾斜度などの項目の確認が重要である。一方、近年は大型機械による施工が中心となっているため、一般に、土性や地質の特性、大雨の時期などの気象特性に関する検討については省略される。\nD. 造成対象地において、ササ、ヨシなどが密生している場合、刈払い及び火入れだけでなく除草剤の散布により植生の地上部や根、地下茎を枯死させる方法が採られることがある。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "C、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "改良山成畑は地形を大きく変えるため、土壌保全と造成の費用対効果を検討します。地下茎で再生する植生の処理には、現場の条件に応じて除草剤を選ぶ場合があります。",
    "choiceExplanations": {
      "ア": "Aは妥当です。畑面を平坦にして段差ごとに法面で支える構造は階段畑で、斜面畑は畑面に傾斜が残ります。",
      "イ": "Aは妥当ですが、工事で重機を用いる場合も土質・地質や豪雨期から侵食や施工のリスクを検討する必要があります。",
      "ウ": "改良山成畑は地形を大きく変えるため、土壌保全と造成の費用対効果を検討します。地下茎で再生する植生の処理には、現場の条件に応じて除草剤を選ぶ場合があります。",
      "エ": "Bは階段畑の形状を斜面畑に当てはめています。Cも土性や気象条件が施工方法や保全対策に関わる点を見落としています。",
      "オ": "Dは妥当です。Cは大雨時の施工による侵食や、地質による造成の安定性などを検討対象から外している点が誤りです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q22",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "農地保全",
    "topicTags": [
      "農地の水食",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の農地における水食に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "面状侵食が発生した圃場における薄層流は、流下するにつれて流速が大きくなり、侵食によって地表面に凹凸が生じる。そのため流れの集中が起こり、ガリと呼ばれる細い溝が形成される。ガリは発達すると、リルと呼ばれる幅や深さが共に大きい溝となる。",
      "イ": "土壌侵食の程度は土壌の粒度組成、団粒化の程度によって異なり、土壌固有の侵食への抵抗性を侵食能という。黒ボク土は浸透能が大きいが、容積重が大きいため、土粒子の剥離や流出に留意する必要はない。",
      "ウ": "水食の土木的抑制対策の一つである畦畔工は、表面流が集中しやすい凸型の地形に対して、基盤の切り盛りによって傾斜を緩やかにする工法である。",
      "エ": "水食の営農的抑制対策の一つである等高線栽培は等高線に沿う方向に畝立てを行う対策であり、傾斜地において採用されているが、降雨量が多いときには畝が決壊して大規模な侵食が発生する場合もある。",
      "オ": "土壌侵食を予測するモデルとして最も適用事例が多いUSLEは、表面流の発生や土粒子の剥離、運搬の機構の物理則を数式化したモデルであり、降雨ごとの侵食量を、降雨量、土壌、地形など五つの係数の和によって求めることができる。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "等高線に沿った畝は斜面に沿う流れを抑え、土の流出を減らします。雨量が多く畝が決壊すると、たまった水が集中して大きな侵食を起こすことがあります。",
    "choiceExplanations": {
      "ア": "水が集中して最初にできる細溝がリルで、それより幅も深さも大きく発達した溝がガリです。",
      "イ": "黒ボク土は一般に多孔質で容積重が小さく、土粒子の移動にも注意が必要です。侵食能は一般に雨や流れが侵食を起こす力を指します。",
      "ウ": "畦畔工では畦などを設け、斜面方向の流れを抑えたり安全な方向へ導いたりします。切り盛りで地形の傾斜を変える手法とは区別します。",
      "エ": "等高線に沿った畝は斜面に沿う流れを抑え、土の流出を減らします。雨量が多く畝が決壊すると、たまった水が集中して大きな侵食を起こすことがあります。",
      "オ": "USLEは観測に基づく経験式で、長期間の平均的な土壌流亡量を推定するのに使います。降雨、土壌、斜面、土地利用などの係数は加算せず乗算します。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q23",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "農地整備",
    "topicTags": [
      "圃場整備",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "圃場整備に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。なお、データは「令和5年版 食料・農業・農村白書」による。\nA. 圃場整備には、荒廃農地の発生防止や農地集積の効果があるとされ、圃場整備事業の取組の効果等により、令和4年の農地面積は全国で前年に比べ約3万ha増加するとともに、農地集積率も上昇し、令和3年度の担い手への農地集積率は約80％となった。\nB. 畦畔は、土やコンクリートによって区画の境界を設けるためなどに設置するものであり、圃場管理のための通路等として使用する場合もあるため、上幅30 cm、高さ30 cmを標準としている。\nC. 表土扱いは、基盤切盛前に従前の水田の表土部分をはぎ集める表土はぎと、基盤の切盛・均平整地後に表土を戻す表土戻しからなる。運土量が大きく整地工事費に占める費用の割合が高いため、表土扱いを省略することも検討する。\nD. 暗渠排水は、作土層に停滞又は表層に湛水した過剰水の排除のために地中に埋設する暗渠等の組織からなっており、一般に水田における湛水管理を目的に適用されることから、畑地では適用されない。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "B、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "畦畔は区画の境界や管理用の通路として機能し、標準の寸法は上幅・高さともに30 cmです。表土扱いは表土を一旦はぎ取って整地後に戻す作業で、工事費と営農条件を見て省略も検討します。",
    "choiceExplanations": {
      "ア": "Bは妥当ですが、令和4年の全国の耕地面積は前年から減少しました。令和3年度の担い手への農地集積率も約6割です。",
      "イ": "Cは表土扱いの正しい説明ですが、Aは農地面積の増減と担い手への集積率の両方を誤っています。",
      "ウ": "Aは白書にある耕地面積や農地集積率の値と一致しません。Dの暗渠排水は過湿な畑地にも用います。",
      "エ": "畦畔は区画の境界や管理用の通路として機能し、標準の寸法は上幅・高さともに30 cmです。表土扱いは表土を一旦はぎ取って整地後に戻す作業で、工事費と営農条件を見て省略も検討します。",
      "オ": "Bは妥当です。Dと異なり、暗渠排水は地下水位を調節し、畑地で作物の生育を妨げる過剰水を取り除くためにも使われます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q24",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "農地整備",
    "topicTags": [
      "農道の区分・管理",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "農道に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 農道は、一般に幹線農道、支線農道、圃場内農道の三つに分類される。これらのうち、幹線農道は、圃区、耕区に連結する農道で、圃場作業のための往来や肥料・農薬などの営農資材の搬入、圃場からの収穫物の搬出などに用いる。\nB. 農道整備事業等によって整備した農道には、その位置、構造、利用の状況等それぞれの実態により、市町村道に認定され市町村が管理するもの、農道として市町村が管理するもの、農道として土地改良区が管理するもの等がある。\nC. 農道の舗装のうちアスファルト舗装は、コンクリート舗装と比較して、工事費が高く破損した場合の修理が困難であることから、一般に、地形勾配や構造上の条件がコンクリート舗装に適さない場合や耐摩耗性が要求される場合などに施工される。\nD. 農道の設計速度は、運転者が円滑かつ安全に走行できる速度であり、農道の種類及び機能に応じて、50 km/h、40 km/h、30 km/hのいずれかの値で適切に決定する。ただし、地形の状況やその他やむを得ない場合は20 km/hとする。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "B、D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "農道は利用実態に応じて市町村や土地改良区などが管理します。設計速度も役割に応じて設定し、やむを得ない地形条件などでは20 km/hを用いる場合があります。",
    "choiceExplanations": {
      "ア": "Bは妥当ですが、圃区や耕区へ直接つながって個々の農作業を支える役割は圃場内農道のものです。",
      "イ": "Aは圃場内農道の役割を幹線に当てはめています。Cもアスファルト舗装の補修のしやすさなどを逆に述べています。",
      "ウ": "Dは妥当です。Aの幹線農道は、集落や集出荷施設、主要な道路などを結び、農道網の骨格を構成します。",
      "エ": "Bは妥当ですが、アスファルト舗装は一般に初期施工費を抑えやすく、局部補修も行いやすい舗装です。",
      "オ": "農道は利用実態に応じて市町村や土地改良区などが管理します。設計速度も役割に応じて設定し、やむを得ない地形条件などでは20 km/hを用いる場合があります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q25",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "農業政策",
    "topicTags": [
      "土地改良長期計画",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、土地改良長期計画に関する記述であるが、A～Dに当てはまるものの組合せとして最も妥当なのはどれか。\n「土地改良事業が計画的に実施されるよう、［A］では、［B］年を一期として土地改良長期計画を立て、土地改良事業の実施の目標及び事業量を定めることとしている。令和3年3月に策定された土地改良長期計画では、［C］農業や［D］農村を農業・農村が目指す姿とし、インフラ整備を通じ農業・農村を下支えする役割を担う土地改良事業を推進していくことが重要であるとされている。」",
    "choices": {
      "ア": "土地改良法／5／人口減少下で持続的に発展する／多様な人が住み続けられる",
      "イ": "土地改良法／5／成長産業としての力強い／美しく活力ある",
      "ウ": "土地改良法／10／人口減少下で持続的に発展する／美しく活力ある",
      "エ": "食料・農業・農村基本法／5／成長産業としての力強い／多様な人が住み続けられる",
      "オ": "食料・農業・農村基本法／10／人口減少下で持続的に発展する／個性豊かで活力ある"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "土地改良法に基づく計画の期間は5年です。令和3年3月の計画では、人口減少下でも持続的に発展する農業と、多様な人が住み続けられる農村を掲げています。",
    "choiceExplanations": {
      "ア": "土地改良法に基づく計画の期間は5年です。令和3年3月の計画では、人口減少下でも持続的に発展する農業と、多様な人が住み続けられる農村を掲げています。",
      "イ": "土地改良法と5年間は合っていますが、令和3年の計画が掲げる農業・農村の姿は、人口減少下で持続的に発展する農業と多様な人が住み続けられる農村です。",
      "ウ": "根拠法と農業の姿は合っていますが、計画期間は5年です。農村の姿は「多様な人が住み続けられる農村」です。",
      "エ": "5年と農村像は合っていますが、根拠法は土地改良法です。農業像では人口減少下における持続的な発展を掲げています。",
      "オ": "根拠法は土地改良法で期間は5年です。農村像に当たるのは「多様な人が住み続けられる農村」です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q26",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "農村環境",
    "topicTags": [
      "生態系に配慮した整備",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "生態系配慮に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "湛水面積100 ha以上のダム・堰の新築や改築、面積50 ha超の干拓は環境影響評価法の第1種事業であり、規模が大きく環境に大きな影響を及ぼすおそれがあるため、環境アセスメントの手続を行わなければならない。",
      "イ": "ミティゲーションは、開発による自然環境、生態系への悪影響を軽減するために採る補償措置や代償措置である。生態系配慮を行う上でのミティゲーション5原則には、影響の回避、最小化、矯正、保全、創造といった種類がある。",
      "ウ": "事業による生態系への影響の予測に当たっては、生態系の指標性などを踏まえて注目すべき生物を選定する。この指標性のうち、上位性とはレッドリストの上位のカテゴリーに位置するという性質、特殊性とは共生などの特殊な種間関係を有するという性質をいう。",
      "エ": "自然界の水には、生物由来のDNAが含まれている。イオンクロマトグラフ法又はガスクロマトグラフ法によりこのDNAを分析することで、水域に生息する生物の種類や、保全対象種などの生息の有無を知ることができる。",
      "オ": "HEP（Habitat Evaluation Procedure）は開発事業の影響やミティゲーションの効果を評価する手法であり、評価対象種にとってのハビタットの質をHU（Habitat Unit）、ハビタットの価値をHSI（Habitat Suitability Index）で表す。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "所定の湛水面積を持つダム・堰の新築などや50 haを超える干拓は第1種事業に当たります。第1種事業では環境影響評価の手続が義務づけられます。",
    "choiceExplanations": {
      "ア": "所定の湛水面積を持つダム・堰の新築などや50 haを超える干拓は第1種事業に当たります。第1種事業では環境影響評価の手続が義務づけられます。",
      "イ": "ミティゲーションは初めに影響を回避・最小化することも含みます。五つの原則の最後は、残る影響を補う代償です。",
      "ウ": "上位性は生態系の食物連鎖などで上位に位置することを指します。特殊性は地域の特殊な環境を指標とする性質で、共生関係だけで決まりません。",
      "エ": "環境DNAでは対象のDNA配列をPCRやシーケンシングなどで検出します。クロマトグラフィーで成分を分離して種を調べる説明は不適切です。",
      "オ": "HSIは対象種にとっての生息環境の適性、つまり質の指標です。HUはHSIと面積を掛けて得られる生息環境の量と質を合わせた指標です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q27",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "農村環境",
    "topicTags": [
      "農村景観の形成と評価",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、農村景観に関する記述であるが、A～Eに当てはまるものの組合せとして最も妥当なのはどれか。\n「景観法に基づき、良好な景観の形成を促進するための景観計画を策定すること、さらに景観計画区域（以下「区域」という。）内の農業振興地域において［A］を定めることにより、区域内において景観と調和のとれた良好な営農条件を確保することが可能である。\n整備対象施設を周辺景観とどのように調和させるかを検討する上では、［B］又は［C］という考え方が基本となる。例えば、［C］の観点から、タワー型のサイロやファームポンドなどの規模が大きく高さもある施設については、施設の周りに高木を施し、遮蔽を図る。\n景観を評価する方法には、多元的評価尺度を用いて平均的な人間の価値観から評価する［D］や、人々に直接景観の金銭的価値を尋ねる［E］などがある。」",
    "choices": {
      "ア": "重要文化的景観／融合調和／対比調和／KJ法／ヘドニック法",
      "イ": "重要文化的景観／対比調和／融合調和／SD法／CVM",
      "ウ": "景観農業振興地域整備計画／融合調和／対比調和／KJ法／ヘドニック法",
      "エ": "景観農業振興地域整備計画／対比調和／融合調和／KJ法／ヘドニック法",
      "オ": "景観農業振興地域整備計画／対比調和／融合調和／SD法／CVM"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "景観農業振興地域整備計画で景観と営農の調和を図り、施設を高木で隠すのは融合調和です。SD法では形容対による尺度で印象を測り、CVMでは金銭的価値を質問で評価します。",
    "choiceExplanations": {
      "ア": "景観法の計画は景観農業振興地域整備計画で、高木で隠すのは融合調和です。形容尺度による評価はSD法で、支払意思額を直接尋ねるのはCVMです。",
      "イ": "B～Eは合っていますが、区域内の農業振興地域に設けるのは景観農業振興地域整備計画です。重要文化的景観は文化財保護法上の制度です。",
      "ウ": "Aは合っていますが、施設を遮蔽して背景になじませる方法は融合調和に当たります。評価方法はSD法とCVMです。",
      "エ": "A～Cは合っていますが、KJ法は意見などの整理手法です。ヘドニック法は地価などを用いる間接評価で、景観に対する支払意思額を直接聞く方法はCVMです。",
      "オ": "景観農業振興地域整備計画で景観と営農の調和を図り、施設を高木で隠すのは融合調和です。SD法では形容対による尺度で印象を測り、CVMでは金銭的価値を質問で評価します。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q28",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "農業政策",
    "topicTags": [
      "農業・農村の多面的機能",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "農業・農村の多面的機能に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。なお、データは「令和5年版 食料・農業・農村白書」による。\nA. 農業・農村の多面的機能の維持・発揮を図るため、「農業の有する多面的機能の発揮の促進に関する法律」に基づき、日本型直接支払制度が実施されている。同制度は、多面的機能支払制度、中山間地域等直接支払制度、環境保全型農業直接支払制度の三つから構成されている。\nB. 多面的機能支払制度は、多面的機能を支える共同活動を支援する農地維持支払と地域資源の質的向上を図る共同活動を支援する資源向上支払の二つから構成され、令和3年度の多面的機能支払制度の認定農用地面積は、平成25年度に比べ増加している。\nC. 多面的機能支払交付金のカバー率が高い市町村では、集落内で寄り合いを開催する回数の多い集落の割合が高い傾向にある。また、同カバー率が高い市町村ほど経営耕地面積の減少割合が高く、農地利用集積割合が低くなっている。\nD. 世界農業遺産は、社会や環境に適応しながら何世代にもわたり継承されてきた独自性のある伝統的な農林水産業システムをUNESCO（国際連合教育科学文化機関）が認定する制度であり、令和4年7月現在で、我が国の認定地域は50地域を超えている。\n注：カバー率は令和元年度の農用地面積に対する多面的機能支払制度の認定農用地面積の割合。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "B、D"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "日本型直接支払には多面的機能、中山間地域等、環境保全型農業の三制度があります。多面的機能支払には共同管理を支える農地維持支払と地域資源の質の向上を支える資源向上支払があります。",
    "choiceExplanations": {
      "ア": "日本型直接支払には多面的機能、中山間地域等、環境保全型農業の三制度があります。多面的機能支払には共同管理を支える農地維持支払と地域資源の質の向上を支える資源向上支払があります。",
      "イ": "Aは妥当ですが、白書ではカバー率の高い市町村ほど経営耕地の減少割合が小さく、農地の集積割合が高い傾向が示されています。",
      "ウ": "Aは妥当ですが、世界農業遺産の認定を行うのは国連食糧農業機関（FAO）で、国内の認定地域は令和4年7月時点で50に達していません。",
      "エ": "Bは妥当です。Cは寄り合いの傾向を述べていますが、経営耕地の減少割合と農地の集積割合の傾向を逆にしています。",
      "オ": "Bは妥当ですが、世界農業遺産はFAOが認定します。Dは認定主体も当時の国内認定数も誤っています。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q29",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "農地保全",
    "topicTags": [
      "農地の地すべり",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "農地地すべり対策に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 山地斜面の崩壊現象を山崩れ（崖崩れ）と地すべりに区分する場合、地すべりは、比較的緩斜面で多く発生し、滑動する土塊の下面に砂礫からなるすべり面を形成し、土塊が著しく攪乱され原形をとどめず急速に崩壊する特徴がある。\nB. 地すべり対策の計画を策定する上で、すべり面の形状を把握する必要がある。すべり面の位置を特定するための調査には、ボーリング調査によって得られたボーリングコアの観察や孔内傾斜計・歪み計による観測などが含まれる。\nC. 地すべり防止対策工法のうち、抑制工は、すべり面における荷重を付加して摩擦力を増加させる工法であり、地すべり土塊の重さを増加させるために地下止水壁を設置して地すべりブロック内に地下水を蓄える方法が含まれる。\nD. 地すべり対策における侵食防止工は、流水等による地すべりブロック末端部の侵食を防止するものである。このうち、堰堤工は、下流への土砂流出を防止するとともに堆砂が地すべりの押さえ盛り土として機能する。コンクリート製の堰堤については堤体に水抜き工が必要である。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "B、D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "コアや孔内の変位観測などはすべり面の位置と形状をつかむ方法です。堰堤は土砂流出を抑え、たまった土砂が地すべり末端を押さえる効果も持ちます。",
    "choiceExplanations": {
      "ア": "Bの調査方法は妥当です。地すべりでは粘土などを含むすべり面に沿って土塊がまとまって動く場合があり、Aの急速な崩壊は主に崖崩れの特徴です。",
      "イ": "土塊が原形を失って急速に落ちるのは崖崩れに近い説明です。地下水の貯留は間隙水圧を上げ、地すべりを助長する場合があります。",
      "ウ": "Dの堰堤工は妥当です。Aが述べるように地すべりのすべり面が常に砂礫でできるわけではなく、表面の形状を保つ緩慢な移動も起こります。",
      "エ": "Bは妥当ですが、抑制工では地下水を排除するなどしてすべり面の間隙水圧を低下させ、滑りにくくします。",
      "オ": "コアや孔内の変位観測などはすべり面の位置と形状をつかむ方法です。堰堤は土砂流出を抑え、たまった土砂が地すべり末端を押さえる効果も持ちます。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q30",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "農業施設",
    "topicTags": [
      "ため池の構造と防災",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "ため池に関する記述として最も妥当なのはどれか。なお、データは「令和5年版 食料・農業・農村白書」による。\n注：ため池工事特措法は「防災重点農業用ため池に係る防災工事等の推進に関する特別措置法」を指す。",
    "choices": {
      "ア": "ため池の形態は、その立地条件によって「谷池」と「皿池」に区分されており、皿池は山間部や丘陵地などの比較的上流部に立地し、多くが沢などを堰き止めて貯水機能を確保するために造られたものである。",
      "イ": "ため池は、降水量が少なく、大きな河川に恵まれない地域などで農業用水を確保するために築造されたもので、多くは東日本を中心に分布し、そのほとんどが戦後の食糧難の時代に築造された。",
      "ウ": "ため池の洪水吐は、流入部、導流部及び減勢部から構成され、ため池に流入する流水から堤体を保護するとともに、流水を下流河道へ安全に流下させる放流施設である。",
      "エ": "斜樋は、ため池に貯水した農業用水を取水するため、堤体下流部法面に沿って埋設された管に取水孔を開けた施設であり、鉛直に建っているものは底樋という。",
      "オ": "市町村長は、ため池工事特措法に基づき、「防災重点農業用ため池」を指定し、防災工事等を集中的・計画的に進めるために防災工事等推進計画を策定しており、令和3年7月末時点で指定された防災重点農業用ため池は全国で約1万か所となっている。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "洪水吐は流入部で余剰水を受け、導流部で下流へ導き、減勢部で流れのエネルギーを落とします。堤体の上を水が越えて損傷するのを防ぐ施設です。",
    "choiceExplanations": {
      "ア": "沢などを堰き止めて造るのが谷池です。皿池は平地などで周囲を堤で囲って貯水する形態です。",
      "イ": "ため池は瀬戸内地域など西日本に多く、江戸時代以前に築造されたものも多くあります。",
      "ウ": "洪水吐は流入部で余剰水を受け、導流部で下流へ導き、減勢部で流れのエネルギーを落とします。堤体の上を水が越えて損傷するのを防ぐ施設です。",
      "エ": "斜樋は貯水側の上流法面に沿って設けます。鉛直に設けるものは竪樋で、底樋は堤体下部を通って水を下流へ導きます。",
      "オ": "指定と推進計画の主体は都道府県知事です。白書に掲載された防災重点農業用ため池の件数も、全国約1万か所より多くなっています。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q31",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "農業施設",
    "topicTags": [
      "農業水利施設の機能保全",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の農業水利施設の機能保全管理に関する記述A～Dのうち、妥当なもののみを全て挙げているのはどれか。なお、データは「令和5年版 食料・農業・農村白書」による。\nA. 農業水利施設におけるストックマネジメントとは、施設の耐用年数が超過したタイミングで機能診断を行い、その結果に基づき機能保全計画を策定し、機能保全対策を実施することで、農業水利施設の長寿命化とライフサイクルコストの維持を図る取組である。\nB. 施設の機能保全は、施設に求められる性能が管理水準以下に低下した段階で実施する事後保全と、性能が管理水準以下になる前に実施する予防保全に大別される。なお、機能保全計画の策定に当たっては、経済性を考慮して、事後保全の考え方を基本とする。\nC. 機能保全対策には、耐久性、通水性及び水密性の回復又は向上を目的とする補修や、施設の構造的耐力の回復又は向上を目的とする補強があり、これらは機能診断評価の結果に基づいて適切に選定する。補修には表面被覆工法や断面修復工法、補強にはコンクリート増厚工法や部分打換え工法がある。\nD. 農業水利施設の漏水等の突発事故の発生件数は、平成22年度から減少傾向にあるが、継続して発生している。突発事故の発生要因は、豪雨・地盤沈下等の災害によるものが最も多く、次いで経年劣化及び局部的な劣化によるものとなっている。",
    "choices": {
      "ア": "A",
      "イ": "C",
      "ウ": "A、B",
      "エ": "B、D",
      "オ": "A、C、D"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "補修では水密性や耐久性などを回復させ、補強では荷重に抵抗する構造的な耐力を回復・向上させます。診断した性能と劣化の状況を基に工法を選定します。",
    "choiceExplanations": {
      "ア": "ストックマネジメントでは施設の状態を継続的に把握し、耐用年数を超える前から状態を診断します。目的には施設の長寿命化とライフサイクルコストの低減があります。",
      "イ": "補修では水密性や耐久性などを回復させ、補強では荷重に抵抗する構造的な耐力を回復・向上させます。診断した性能と劣化の状況を基に工法を選定します。",
      "ウ": "Aは耐用年数超過まで診断を待つ点が誤りです。Bも、事後保全を基本とする点が逆で、計画的な予防保全を重視します。",
      "エ": "事後保全を一般原則とするBは誤りです。白書には突発事故の増加傾向が示され、経年劣化や局部的な劣化も主な発生要因です。",
      "オ": "補修と補強を説明するCは妥当です。Aの診断時期は耐用年数超過後に限らず、Dの事故件数の傾向も逆です。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q32",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "農業施設",
    "topicTags": [
      "農業用ダムの設計",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "農業用ダムに関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "ダムの利用目的による分類では、農業用水などの用水補給を目的にした利水ダム、洪水調整を目的とした治水ダム、土砂の流出の防止や調節を目的とした防災ダム、二つ以上の用途に使用される複合ダムなどがある。",
      "イ": "一般に、コンクリートダムとフィルダムを比較すると、コンクリートダムはフィルダムに比べて地盤に与える負荷が小さいので、基礎地盤に対する適応の幅が広い。また、コンクリートダムは、全体工事費に占める洪水吐の工事費の割合が大きくなる。",
      "ウ": "ダムの設計に当たり、農業用水の利水容量は、一般に30年に1回程度の渇水を対象として計算し、堆砂量は原則として50年間の堆砂量を推定して定める。",
      "エ": "コンクリートダムに用いられるコンクリートでは、水和熱によるコンクリートの温度上昇量を抑制するため、所要のワーカビリティ、強度及び単位体積重量が得られる範囲内で可能な限り単位セメント量を少なくする。",
      "オ": "フィルダムにおいては、堤体及び基礎地盤の安全管理等を目的として、遮水ゾーン上部に監査廊を設置する場合が多い。監査廊の設計に当たっては、監査廊のひび割れの防止を目的とした温度応力解析を行って、監査廊内の応力状態を把握する必要がある。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "大断面のダムでは水和熱が内部にこもり、冷える際の温度差などでひび割れが生じやすくなります。施工性や強度などを満たす範囲でセメント量を抑えます。",
    "choiceExplanations": {
      "ア": "土砂の流出防止・調節を主目的とするものは砂防堰堤です。利水と治水など複数の目的を持つものは多目的ダムと呼ばれます。",
      "イ": "フィルダムは底面が広く基礎地盤に作用する荷重を分散しやすい形です。洪水吐を堤体と別に設けることが多いのもフィルダムです。",
      "ウ": "農業用水の利水容量は一般に10年に1回程度の渇水を基準とし、堆砂容量には原則として100年間にたまると予想される土砂量を見込みます。",
      "エ": "大断面のダムでは水和熱が内部にこもり、冷える際の温度差などでひび割れが生じやすくなります。施工性や強度などを満たす範囲でセメント量を抑えます。",
      "オ": "フィルダムの監査廊は、設ける場合には基礎の処理や観測などができる基礎近くの位置が一般的です。遮水ゾーン上部に多く設けるという説明が誤りです。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q33",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "建設材料",
    "topicTags": [
      "コンクリートの劣化と材料特性",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "コンクリートに関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 中性化とは、コンクリートが空気中の二酸化炭素の影響を受けてアルカリ性に保てなくなり、鉄筋を腐食させる劣化のことで、一般に、無筋コンクリートでは中性化により所要の性能を損なうことはない。\nB. アルカリシリカ反応とは、コンクリート中に溶解したアルカリ成分と、セメントに含まれるシリカ成分が反応することで、コンクリートに生成物の溶脱による多孔化を発生させる現象である。\nC. プラスティシティーとは、フレッシュコンクリートの変形や流動性に対する抵抗性のことであり、スランプ試験、フロー試験及び締固め係数試験等で測定できる。\nD. ブリーディングとは、フレッシュコンクリートにおいて、練混ぜ水の一部が分離し上昇する現象のことで、ブリーディングによって表面に形成されるレイタンスは、コンクリートどうしの接着を悪くするため、打継ぎを行う際には取り除く必要がある。",
    "choices": {
      "ア": "A、B",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "中性化はコンクリートのアルカリ性を低下させ、鉄筋の不動態皮膜を失わせます。打継ぎ面ではブリーディングによる弱いレイタンスを除き、付着を確保します。",
    "choiceExplanations": {
      "ア": "Aは妥当ですが、アルカリシリカ反応では主に骨材中の反応性シリカとアルカリが反応し、吸水して膨張するゲルを生じます。",
      "イ": "中性化はコンクリートのアルカリ性を低下させ、鉄筋の不動態皮膜を失わせます。打継ぎ面ではブリーディングによる弱いレイタンスを除き、付着を確保します。",
      "ウ": "Bは骨材中のシリカやゲルの膨張を誤っています。Cが挙げるスランプなどで評価する硬さの程度にはコンシステンシーという語を使います。",
      "エ": "Dは妥当です。アルカリシリカ反応では生成物が吸水して膨張するためひび割れが生じ、生成物が溶け出して多孔化する現象とする説明は誤りです。",
      "オ": "Dは妥当ですが、プラスティシティーは材料分離や崩れを起こさず形を変えられる性質です。Cはコンシステンシーの説明に当たります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q34",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "工程・品質・出来形管理",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "土木工事の施工管理に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 工程管理の目的は、契約条件に基づき、効率的、経済的かつ安全に施工工程の各段階を計画、管理することである。単に時間管理を行い、工期を守るだけでなく、経済的な施工速度を踏まえることが望ましい。\nB. 横線式工程表には、横軸に各作業の達成度をとったバー・チャート方式と、横軸に日数をとって各作業の流れを図示したガント・チャート方式がある。これらの方法は、各工程間の順序や工期に影響する作業が明確化されることから、総合的な工程管理に適している。\nC. 統計的品質管理においては、製品又は完成した構造物が規格を満足していること、工程が安定していることの2条件が成り立っている必要がある。前者は管理図によって、後者はヒストグラムによって確認する。\nD. 出来形管理には、直接測定によるもの及び撮影記録によるものがある。前者は工事の出来形が設計図書に示された形状・寸法を満足しているかを確認するものであり、後者は地中埋設物等施工後に確認できない箇所の出来形や数量等の確認、施工段階ごとの進行過程を管理するために行う。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Bの横線式工程表は作業間の依存関係を十分に表しにくく、クリティカルパスの把握にはネットワーク式が向きます。Cは管理図とヒストグラムの用途を逆にしています。",
    "choiceExplanations": {
      "ア": "Aは妥当です。Bは進捗度と日数の軸の説明を取り違え、工程相互の依存関係や工期を左右する作業が明確になるという特徴もネットワーク式に当たります。",
      "イ": "Aは妥当ですが、規格との関係はヒストグラム、時系列での工程の安定性は管理図で確認するので、Cは対応が逆です。",
      "ウ": "工程管理では工期とともに経済性や安全を考慮します。出来形管理では寸法などを実測し、埋戻しで見えなくなる箇所は施工段階で写真などに記録します。",
      "エ": "Bの横線式工程表は作業間の依存関係を十分に表しにくく、クリティカルパスの把握にはネットワーク式が向きます。Cは管理図とヒストグラムの用途を逆にしています。",
      "オ": "Dは妥当です。Cと異なり、工程が統計的に安定しているかは、時系列のデータと管理限界を示す管理図で判断します。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q35",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "粒径組成と粒度曲線",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、図に示される土の粒径組成に関する記述であるが、ア～エに当てはまるものの組合せとして最も妥当なのはどれか。\n「土の粒径組成について、0.075 mm未満が細粒分と呼ばれる。細粒分の粒径組成はストークスの法則を利用した［ア］によって求められる。図の試料AとBの細粒分の質量百分率はそれぞれ［イ］、［ウ］である。土の粒度分布の特徴について、通過質量百分率がx％の粒径をDₓ（mm）とすると、曲率係数 U′c = (D₃₀)²/(D₁₀ × D₆₀) が1～3の範囲にある場合に『粒径幅が広い』と判断されることがある。この判断基準に従えば、図の試料AとBについて、［エ］と判断される。」",
    "choices": {
      "ア": "ふるい分け／75％／90％／試料Bのみ粒径幅が広い",
      "イ": "ふるい分け／25％／10％／試料Aのみ粒径幅が広い",
      "ウ": "沈降分析／75％／90％／試料A、Bはいずれも粒径幅が広い",
      "エ": "沈降分析／25％／10％／試料Aのみ粒径幅が広い",
      "オ": "沈降分析／25％／10％／試料Bのみ粒径幅が広い"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "細粒分は沈降速度を使って粒径を求め、0.075 mmでの通過率はAが約25％、Bが約10％です。D₁₀、D₃₀、D₆₀はAが約0.01、0.10、0.20 mmで曲率係数は約5、Bが約0.075、0.20、0.30 mmで約1.8なので、Bだけが1～3に入ります。",
    "choiceExplanations": {
      "ア": "ストークスの法則を用いるのは沈降分析です。75％と90％は0.075 mmでふるいを通過しない割合に相当します。",
      "イ": "通過率25％と10％は合っていますが、試験法は沈降分析です。D₁₀、D₃₀、D₆₀を図から読んで計算すると、Bの曲率係数が1～3に入ります。",
      "ウ": "試験法は合っていますが、細粒分含有率は0.075 mmでの通過率で、Aは約25％、Bは約10％です。Aの曲率係数は1～3を外れます。",
      "エ": "試験法と細粒分含有率は合っていますが、曲率係数はAが3を上回る一方、Bは1～3に入ります。",
      "オ": "細粒分は沈降速度を使って粒径を求め、0.075 mmでの通過率はAが約25％、Bが約10％です。D₁₀、D₃₀、D₆₀はAが約0.01、0.10、0.20 mmで曲率係数は約5、Bが約0.075、0.20、0.30 mmで約1.8なので、Bだけが1～3に入ります。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2024/senmon-noson/q35.webp"
    ],
    "imageAltTexts": [
      "試料AとBの粒径と通過質量百分率を示す粒度曲線の原図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q37",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "農業施設",
    "topicTags": [
      "農業用ポンプの選定",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、我が国の農業用ポンプに関する記述であるが、A～Dに当てはまるものの組合せとして最も妥当なのはどれか。\n「ポンプの吐出し水位と吸込水位の水位差に、摩擦損失、流入・流出損失等のポンプの運転によって生じる諸損失水頭を加えたものを［A］という。\n吸込圧が低いときにインペラの入口で無数の気泡が生じ、インペラの中で流れに沿って圧力が上昇したところで、気泡が押しつぶされて消滅する現象をキャビテーションという。この現象は吸込揚程が確保できない場合やポンプの回転速度を［B］場合に発生しやすく、ポンプに有害である。主に低揚程大水量ポンプに使用される［C］は、他のポンプ形式と比較してキャビテーションが発生しやすい。\nまた、ポンプの原動機は、常時運転を必要とする場合は一般に［D］を選定する。」",
    "choices": {
      "ア": "全揚程／上げ過ぎた／渦巻ポンプ／内燃機関",
      "イ": "全揚程／上げ過ぎた／軸流ポンプ／電動機",
      "ウ": "全揚程／下げ過ぎた／渦巻ポンプ／電動機",
      "エ": "実揚程／上げ過ぎた／渦巻ポンプ／内燃機関",
      "オ": "実揚程／下げ過ぎた／軸流ポンプ／電動機"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "水位差と諸損失水頭の和が全揚程です。回転速度が高いと入口で必要な吸込水頭が増し、低揚程で大流量の軸流ポンプではキャビテーションに注意し、常時運転には通常電動機を使います。",
    "choiceExplanations": {
      "ア": "全揚程と回転速度上昇の説明は合っています。低揚程・大流量の用途には軸流ポンプが適し、常時運転には電動機が一般的です。",
      "イ": "水位差と諸損失水頭の和が全揚程です。回転速度が高いと入口で必要な吸込水頭が増し、低揚程で大流量の軸流ポンプではキャビテーションに注意し、常時運転には通常電動機を使います。",
      "ウ": "全揚程と電動機は合っています。ただし、回転速度を上げ過ぎた場合にキャビテーションが起きやすく、低揚程・大流量の用途には軸流ポンプが適します。",
      "エ": "実揚程は水位差分で、損失を足すと全揚程です。低揚程の大流量には軸流ポンプ、常時運転には電動機を選ぶのが一般的です。",
      "オ": "軸流ポンプと電動機は合っていますが、損失を含むのは全揚程です。回転速度を上げ過ぎると吸込側でキャビテーションが生じやすくなります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q38",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "農業環境",
    "topicTags": [
      "農業と気候変動",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "気候変動に関する記述として最も妥当なのはどれか。なお、データは「令和5年版 食料・農業・農村白書」による。",
    "choices": {
      "ア": "令和3年に決定された「みどりの食料システム戦略」では、令和53年の目指す姿として、農林水産業のCO₂ゼロエミッション化の実現、ブルーカーボンの普及等の数値目標（KPI）を掲げている。",
      "イ": "我が国の農林水産分野における令和2年度の二酸化炭素換算の温室効果ガス排出量は、前年度から減少し、その排出量の内訳は多い順に二酸化炭素、一酸化二窒素、メタンであった。",
      "ウ": "令和4年にフランスで開催された国連気候変動枠組条約第27回締約国会議（COP27）では、「パリ協定」が締結され、気候変動による食料危機の深刻化などの内容が盛り込まれた。",
      "エ": "農林水産省では、農地土壌から排出される温室効果ガスを削減するため、水田作における中干しの中止や春耕といったメタンの発生抑制に資する栽培技術について、それぞれの産地で定着を図る取組を支援している。",
      "オ": "農業生産は気候変動の影響を受けやすく、水稲における白未熟粒や、ぶどうの着色不良等、各品目で生育障害や品質低下等の影響が現れていることから、この影響を回避・軽減するための品種や技術の開発、普及が進められている。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "高温で水稲の登熟が影響を受けて白未熟粒が増えたり、ブドウの色づきが悪くなったりします。高温に強い品種の育成と栽培方法の改善が対策になります。",
    "choiceExplanations": {
      "ア": "戦略の長期目標は2050年、元号では令和32年を見据えます。令和53年とする記述は目標時期が誤っています。",
      "イ": "令和2年度の農林水産分野の排出量の内訳では、メタンが一酸化二窒素を上回りました。設問は両者の順を逆にしています。",
      "ウ": "COP27は2022年にエジプトで開催されました。パリ協定は2015年のCOP21で採択されています。",
      "エ": "水田でメタンを抑える取組には、中干しを中止する方法ではなく、その期間を延長して土壌への酸素供給を増やす方法があります。",
      "オ": "高温で水稲の登熟が影響を受けて白未熟粒が増えたり、ブドウの色づきが悪くなったりします。高温に強い品種の育成と栽培方法の改善が対策になります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2024-annual-senmon-noson-q39",
    "exam": "kokka-ippan-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "農業政策",
    "topicTags": [
      "野生鳥獣被害とジビエ",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の野生鳥獣に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。なお、データは「令和5年版 食料・農業・農村白書」による。\nA. 野生鳥獣による農作物被害額は、平成22年度から一貫して増加しており、令和3年度は約155億円となった。この期間における、鳥獣種類別の農作物被害額の内訳は、大きい順にイノシシ、シカ、サルであった。\nB. 鳥獣被害を防止するため、市町村は鳥獣被害防止特措法に基づき被害防止計画を策定し、鳥獣捕獲や侵入防止柵の設置等の被害防止施策を実施する鳥獣被害対策実施隊を設置している。その実施隊員は、銃刀法に基づく技能講習の一部が免除されるほか、狩猟税の免除措置等の対象となっている。\nC. 近年野生鳥獣のジビエ需要が高まっており、捕獲鳥獣はジビエの原料としておおむね全て利活用されている。令和3年度のジビエ利用量を重量ベースでみると、ペットフードへの利用が最も多く、次いで食肉利用となっている。\nD. 国産ジビエ認証制度では、安全なジビエの提供と消費者のジビエに対する安心の確保を図るため、厚生労働省のガイドラインに基づく衛生管理の遵守やトレーサビリティの確保に取り組むジビエの食肉処理施設を認証している。\n注：鳥獣被害防止特措法は「鳥獣による農林水産業等に係る被害の防止のための特別措置に関する法律」、銃刀法は「銃砲刀剣類所持等取締法」を指す。",
    "choices": {
      "ア": "A、B",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "市町村の被害防止計画と実施隊は同法に基づく取組です。国産ジビエ認証は衛生管理や個体の追跡ができる仕組みを整えた食肉処理施設を対象とします。",
    "choiceExplanations": {
      "ア": "Bは妥当ですが、農作物被害額は平成22年度の水準から長期的には減っており、Aの一貫して増加したという記述は誤りです。",
      "イ": "Dは妥当です。Aの約155億円は令和3年度の被害額に近い値ですが、平成22年度から増加し続けたわけではありません。",
      "ウ": "Bは妥当です。捕獲個体のうちジビエとして利用されるのは一部で、令和3年度は食肉向けの重量がペットフード向けより多くなっています。",
      "エ": "市町村の被害防止計画と実施隊は同法に基づく取組です。国産ジビエ認証は衛生管理や個体の追跡ができる仕組みを整えた食肉処理施設を対象とします。",
      "オ": "Dは妥当ですが、Cのように捕獲した鳥獣のほぼ全てがジビエに使われているわけではありません。用途の重量も食肉向けがペットフード向けを上回ります。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007514.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  }
];
