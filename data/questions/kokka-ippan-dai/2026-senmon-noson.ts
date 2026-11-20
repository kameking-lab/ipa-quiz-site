import type { Question } from "@/lib/questions/types";

export const KOKKA_IPPAN_DAI_2026_SENMON_NOSON: Question[] = [
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q01",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "極限",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "極限 lim（x→0）sin(1−cos x)/(2x²) の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "0",
      "イ": "1/12",
      "ウ": "1/4",
      "エ": "5/12",
      "オ": "1/2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "sin(1−cos x)/(1−cos x) は1に、(1−cos x)/x² は1/2に近づく。分母に2があるので極限は1/4である。",
    "choiceExplanations": {
      "ア": "分子は0に近づくが、分母も同じく0に近づく。2次の係数を比べると極限は0にならない。",
      "イ": "sin y/y は y→0 で1であり、(1−cos x)/x² は1/2に近づく。これらの係数から1/12は得られない。",
      "ウ": "sin(1−cos x)/(1−cos x) は1に、(1−cos x)/x² は1/2に近づく。分母に2があるので極限は1/4である。",
      "エ": "分子の最低次は x²/2 である。これを2x²で割るので5/12にはならない。",
      "オ": "1/2は (1−cos x)/x² の極限である。本問の分母にある2でさらに割る必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q02",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "行列式",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "行列の第1行が (a＋3, −2)、第2行が (2a, a−5) であるとき、この行列を列ベクトル (x, y) に掛けて零ベクトルとなる。x、y が同時には0とならない解が存在するような a の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "−10、6",
      "イ": "−5、3",
      "ウ": "−5、1",
      "エ": "−3、5",
      "オ": "1、3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "同次連立方程式に非零解があるには行列式 (a＋3)(a−5)＋4a が0であればよい。これを因数分解すると (a＋5)(a−3)＝0 となる。",
    "choiceExplanations": {
      "ア": "a＝−10および6では、行列式 (a＋5)(a−3) はいずれも0にならない。",
      "イ": "同次連立方程式に非零解があるには行列式 (a＋3)(a−5)＋4a が0であればよい。これを因数分解すると (a＋5)(a−3)＝0 となる。",
      "ウ": "−5では行列式が0になるが、a＝1では (1＋5)(1−3)＝−12 となる。",
      "エ": "−3と5は対角成分それぞれを0にする値である。非対角成分の積を含む行列式はどちらでも0にならない。",
      "オ": "a＝3は条件を満たすが、a＝1の行列式は0にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q03",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "部分積分",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "定積分 ∫₀^π x cos x dx の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "−2",
      "イ": "0",
      "ウ": "π−2",
      "エ": "2",
      "オ": "π＋2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "部分積分により原始関数は x sin x＋cos x となる。これを0からπまで評価すると −1−1＝−2 となる。",
    "choiceExplanations": {
      "ア": "部分積分により原始関数は x sin x＋cos x となる。これを0からπまで評価すると −1−1＝−2 となる。",
      "イ": "両端で x sin x は0になるが、cos x の値は1から−1へ変わる。したがって定積分は0にならない。",
      "ウ": "上端の項 π sin π は0であり、結果に π の項は残らない。",
      "エ": "上端の値−1から下端の値1を引くため、符号は負になる。",
      "オ": "上端で x sin x は消え、残る cos x の上下端の差は−2となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q04",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "せん断力と曲げモーメント",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような集中荷重と等分布荷重が作用する単純ばりにおいて、点Cにおけるせん断力及び曲げモーメントの組合せとして最も妥当なのはどれか。ただし、せん断力は断面の左側に上向きの力を生じるものを正、曲げモーメントは梁の上側に圧縮応力を生じるものを正とし、梁の自重は考慮しないものとする。",
    "choices": {
      "ア": "−45 kN、120 kN·m",
      "イ": "−15 kN、−150 kN·m",
      "ウ": "−15 kN、150 kN·m",
      "エ": "15 kN、−150 kN·m",
      "オ": "15 kN、150 kN·m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "左反力は35 kNで、C左側の鉛直力の合計は 35−20−30＝−15 kNとなる。C回りの曲げモーメントは 280−60−40−30＝150 kN·m である。",
    "choiceExplanations": {
      "ア": "Cの左側の分布荷重は2 m分の30 kNである。左反力35 kNから集中荷重20 kNと30 kNを引くと−15 kNとなる。",
      "イ": "せん断力の−15 kNは正しいが、C回りでは 35×8−10×6−10×4−30×1＝150 kN·m となる。",
      "ウ": "左反力は35 kNで、C左側の鉛直力の合計は 35−20−30＝−15 kNとなる。C回りの曲げモーメントは 280−60−40−30＝150 kN·m である。",
      "エ": "Cの左側には50 kNの下向き荷重があり、左反力35 kNとの差は−15 kNである。曲げも正の150 kN·mとなる。",
      "オ": "曲げモーメントは150 kN·mで合っているが、左反力から左側の荷重を引いたせん断力は−15 kNである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q04.webp"
    ],
    "imageAltTexts": [
      "単純ばりに作用する二つの集中荷重と分布荷重"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q05",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "断面係数",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような断面をもつ部材のX–X軸に関する断面係数として最も妥当なのはどれか。",
    "choices": {
      "ア": "1.7π cm³",
      "イ": "27.2π cm³",
      "ウ": "30.6π cm³",
      "エ": "54.4π cm³",
      "オ": "136.0π cm³"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "断面二次モーメントは π(5⁴−3⁴)/4＝136π cm⁴ である。X–X軸から最外縁までの5 cmで割ると27.2π cm³となる。",
    "choiceExplanations": {
      "ア": "円形断面の断面二次モーメントは半径の4乗に比例する。外円と内円を別々に計算すると1.7π cm³にはならない。",
      "イ": "断面二次モーメントは π(5⁴−3⁴)/4＝136π cm⁴ である。X–X軸から最外縁までの5 cmで割ると27.2π cm³となる。",
      "ウ": "外円から内円の断面二次モーメントを差し引く。その値を最外縁距離で割った値は30.6πではなく27.2πである。",
      "エ": "136π cm⁴を割る距離は外半径5 cmである。54.4π cm³ではこの距離を適切に反映していない。",
      "オ": "136π cm⁴は断面二次モーメントである。断面係数を得るにはさらに最外縁距離で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q05.webp"
    ],
    "imageAltTexts": [
      "外半径5 cm、内半径3 cmの中空円形断面"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q06",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "構造力学",
    "topicTags": [
      "ラーメンのモーメント",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような荷重Pを受けるラーメンの曲げモーメント図の概形として最も妥当なのはどれか。ただし、曲げモーメントの分布は、部材に引張が生じている側に描くものとする。また、ラーメンの自重は無視するものとする。",
    "choices": {
      "ア": "図1の曲げモーメント分布",
      "イ": "図2の曲げモーメント分布",
      "ウ": "図3の曲げモーメント分布",
      "エ": "図4の曲げモーメント分布",
      "オ": "図5の曲げモーメント分布"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Aの反力は鉛直のみでACの曲げは0となる。梁CDでは下側、柱BDでは左側が引張で、どちらもDに向けて曲げが直線的に増す。",
    "choiceExplanations": {
      "ア": "Aの反力は鉛直のみでACの曲げは0となる。梁CDでは下側、柱BDでは左側が引張で、どちらもDに向けて曲げが直線的に増す。",
      "イ": "Aは水平反力をもたないので柱ACに曲げは生じない。水平反力を受ける柱BDには曲げが生じる。",
      "ウ": "柱BDの分布は合っているが、梁CDの曲げはCで0になりDで最大となる。図ではこの梁の分布が逆向きである。",
      "エ": "柱BDの引張側は左側であり、Dに向けて曲げが増す。この図はBDの引張側を逆に描いている。",
      "オ": "ピン支点Bで曲げは0になる。梁CDも、左端Cで0となりDに向けて増す必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q06.webp"
    ],
    "imageAltTexts": [
      "左のAがローラー支点、右のBがピン支点で右上Dに左向きの水平荷重が作用するラーメン"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-ippan-dai/2026/senmon-noson/q6-1.webp",
      "イ": "/questions/kokka-ippan-dai/2026/senmon-noson/q6-2.webp",
      "ウ": "/questions/kokka-ippan-dai/2026/senmon-noson/q6-3.webp",
      "エ": "/questions/kokka-ippan-dai/2026/senmon-noson/q6-4.webp",
      "オ": "/questions/kokka-ippan-dai/2026/senmon-noson/q6-5.webp"
    }
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q07",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "材料力学",
    "topicTags": [
      "ポアソン比",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "直径20 mm、長さ1 mの一様な円柱の軸方向に100 kNの引張力が作用するとき、円柱の直径として最も妥当なのはどれか。ただし、弾性比例範囲内とし、ヤング率を8.0 kN/mm²、ポアソン比を0.3、円周率を3とする。円柱の自重は考慮しない。",
    "choices": {
      "ア": "16.00 mm",
      "イ": "17.23 mm",
      "ウ": "19.31 mm",
      "エ": "19.75 mm",
      "オ": "20.25 mm"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "引張力を断面積300 mm²とヤング率8.0 kN/mm²で順に割ると軸ひずみは1/24となる。横ひずみは−0.3/24なので、直径は 20×(1−0.0125)＝19.75 mm である。",
    "choiceExplanations": {
      "ア": "軸ひずみは 100/(300×8.0)＝1/24 である。横ひずみはその0.3倍の大きさなので、直径が4 mm縮むことはない。",
      "イ": "横ひずみは−0.0125である。20 mmに適用した直径の減少は2.77 mmではなく0.25 mmとなる。",
      "ウ": "断面積300 mm²から求める応力は1/3 kN/mm²である。ポアソン比を適用すると直径は0.69 mmも減らない。",
      "エ": "引張力を断面積300 mm²とヤング率8.0 kN/mm²で順に割ると軸ひずみは1/24となる。横ひずみは−0.3/24なので、直径は 20×(1−0.0125)＝19.75 mm である。",
      "オ": "軸方向に引っ張ると正のポアソン比をもつ円柱は横方向に縮む。20.25 mmは横ひずみの符号を逆にした値である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q08",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "開水路の流れ",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "開水路の流れに関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 流速などの流れの状態が時間経過に伴って変化しない流れを等流と呼ぶ。等流のうち、場所によって通水断面や流速が変わらない流れを定常流と呼ぶ。\nB. 限界水深は、流量が一定のときに比エネルギーを最小にする水深であり、比エネルギーが一定のときに流量を最大にする水深でもある。\nC. 水深が限界水深より大きく、フルード数が1より小さい流れであれば射流であり、水深が限界水深より小さく、フルード数が1より大きい流れであれば常流である。\nD. 流れが射流から常流に変化するとき、水面変化が不連続になって激しい渦が発生する現象を跳水と呼ぶ。また、跳水前後の射流水深と常流水深の一対の水深を共役水深と呼ぶ。",
    "choices": {
      "ア": "A、B",
      "イ": "A、D",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "限界水深では所定流量に対する比エネルギーが最小となる。跳水で前後する射流と常流の水深が共役水深である。",
    "choiceExplanations": {
      "ア": "Bは限界水深の性質を述べているが、Aは定常流と等流の名称を取り違えている。",
      "イ": "Dの共役水深の説明は妥当である。時間に関して流れが変わらないことを定常と呼ぶのでAは誤りである。",
      "ウ": "Bは正しいが、限界水深より深いのは常流、浅いのは射流であるためCは誤りである。",
      "エ": "限界水深では所定流量に対する比エネルギーが最小となる。跳水で前後する射流と常流の水深が共役水深である。",
      "オ": "Dは跳水を正しく述べているが、Cでは常流と射流の水深の関係が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q09",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "潜りオリフィス",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のように、二つの水槽がオリフィスでつながっているとき、オリフィスを通過する水の流量として最も妥当なのはどれか。\nただし、オリフィスの形状は、幅B＝0.25 m、高さL＝0.10 mの長方形とする。また、二つの水槽の水位は一定に保たれており、左側の水槽の水面からオリフィス中央までの水深はH₁＝3.2 m、右側の水槽の水面からオリフィス中央までの水深はH₂＝2.4 mとし、流量係数は0.62、重力加速度の大きさは10 m/s²とする。\nなお、オリフィスの流出部に向かって生じている流速（接近流速）は無視するものとし、オリフィスの鉛直断面における流速分布は一様で、オリフィス中央の流速を代表値として用いてよい。",
    "choices": {
      "ア": "0.0062 m³/s",
      "イ": "0.0079 m³/s",
      "ウ": "0.062 m³/s",
      "エ": "0.12 m³/s",
      "オ": "0.16 m³/s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "潜りオリフィスの流量は 0.62×0.25×0.10×√(2×10×(3.2−2.4))＝0.062 m³/s である。",
    "choiceExplanations": {
      "ア": "水位差0.8 mによる理論流速は4 m/sで、開口面積は0.025 m²である。流量係数を掛けた流量は0.0062 m³/sの10倍となる。",
      "イ": "左右の水位差に対応する理論流速は √(2×10×0.8)＝4 m/s である。開口面積と流量係数を用いると0.0079 m³/sにはならない。",
      "ウ": "潜りオリフィスの流量は 0.62×0.25×0.10×√(2×10×(3.2−2.4))＝0.062 m³/s である。",
      "エ": "上流側の水位3.2 mだけを駆動水頭とすることはできない。下流側にも水圧があるため、用いる水頭は差の0.8 mである。",
      "オ": "損失を無視しても流量は 0.025×4＝0.10 m³/s である。流量係数0.62を適用すると、それより小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q09.webp"
    ],
    "imageAltTexts": [
      "オリフィスで接続した水槽の側面図とオリフィスの正面図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q10",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "静水圧",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のように、水で満たされたU字管のピストン1及びピストン2が高低差3 cmの状態で静止している。ピストン1に力P₁＝3.0 Nが作用している場合、ピストン2に作用する力P₂［N］として最も妥当なのはどれか。\nただし、ピストン1及びピストン2は、それぞれ直径4 cm、6 cmの円形断面を有し、自重は考慮しないものとする。また、水の密度は998 kg/m³、重力加速度の大きさは9.8 m/s²、円周率は3とする。",
    "choices": {
      "ア": "2.2 N",
      "イ": "2.6 N",
      "ウ": "3.6 N",
      "エ": "6.0 N",
      "オ": "6.7 N"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ピストン1の圧力は 3.0/0.0012＝2500 Paで、ピストン2の圧力はこれから 998×9.8×0.03 を引いた値である。これにピストン2の断面積0.0027 m²を掛けると約6.0 Nとなる。",
    "choiceExplanations": {
      "ア": "ピストン2の断面積はピストン1の2.25倍である。高低差による圧力低下は約293 Paであり、力が2.2 Nまで小さくなることはない。",
      "イ": "高低差によるピストン2の力の補正は約0.79 Nである。同じ高さと見なした場合の6.75 Nから引くと約6.0 Nとなる。",
      "ウ": "ピストン2の圧力は約2207 Paである。断面積0.0027 m²を掛けると3.6 Nより大きくなる。",
      "エ": "ピストン1の圧力は 3.0/0.0012＝2500 Paで、ピストン2の圧力はこれから 998×9.8×0.03 を引いた値である。これにピストン2の断面積0.0027 m²を掛けると約6.0 Nとなる。",
      "オ": "6.7 Nは両ピストンを同じ高さとして計算した力に近い。高い位置にあるピストン2では水柱3 cm分の圧力を差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q10.webp"
    ],
    "imageAltTexts": [
      "U字管の左側に直径4 cmのピストン1と右側に3 cm高い直径6 cmのピストン2"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q11",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "水理学",
    "topicTags": [
      "運動量保存",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図は、ノズルから噴き出した水（噴流）が、大気圧下において羽根のような曲面に当たり、60°向きを変えて流れる様子を真上から見たものである。このとき、噴流が曲面に与える力として最も妥当なのはどれか。\nただし、ノズル、噴流、曲面はいずれも同一平面上にある。水は完全流体とみなしてよく、その密度は1.0×10³ kg/m³、噴流の断面積は0.040 m²で一定、噴流の流速は曲面への衝突前後で変化せず20 m/sで一定である。また、曲面と噴流の間に摩擦はなく、重力の影響は無視するものとする。",
    "choices": {
      "ア": "8 kN",
      "イ": "14 kN",
      "ウ": "16 kN",
      "エ": "20 kN",
      "オ": "22 kN"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "質量流量は1000×0.040×20＝800 kg/sである。向きが60°異なる二つの速度ベクトルの差の大きさは20 m/sなので、合力は16 kNとなる。",
    "choiceExplanations": {
      "ア": "8 kNは ρAv²(1−cos 60°) で求めた入射方向成分の大きさである。力の大きさにはこれと直交する成分も含める。",
      "イ": "14 kNは ρAv² sin 60° で求めた直交方向成分の大きさに近い。入射方向の成分もあるため、合力はさらに大きい。",
      "ウ": "質量流量は1000×0.040×20＝800 kg/sである。向きが60°異なる二つの速度ベクトルの差の大きさは20 m/sなので、合力は16 kNとなる。",
      "エ": "向きが60°変わるとき、速度差の大きさは 2×20×sin 30°＝20 m/sとなる。800 kg/sを掛けると16 kNである。",
      "オ": "入射方向と直交方向の運動量変化を二乗和で合成する。成分をそのまま足した約22 kNは合力の大きさにならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q11.webp"
    ],
    "imageAltTexts": [
      "水平方向に入射した噴流が曲面で60度向きを変える平面図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q12",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "土壌物理",
    "topicTags": [
      "土壌の三相",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "含水比55％の土壌65 gに水20 gを加えて均一に混ぜ合わせ、全て容器に充填したところ、土壌試料の体積は80 cm³となった。容器に充填した後の土壌試料の気相率として最も妥当なのはどれか。\nただし、この土壌の土粒子密度は2.5 g/cm³、水の密度は1.0 g/cm³である。",
    "choices": {
      "ア": "11％",
      "イ": "16％",
      "ウ": "20％",
      "エ": "25％",
      "オ": "40％"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "乾燥土は 65/1.55≒41.94 gで、固相は約16.77 cm³、加水後の液相は約43.06 cm³である。残り約20.16 cm³を80 cm³で割ると約25％となる。",
    "choiceExplanations": {
      "ア": "固相は約16.8 cm³、液相は約43.1 cm³である。80 cm³から両者を引くと空気は約20.2 cm³ある。",
      "イ": "含水比は湿った土壌全体の質量に対する比ではなく、乾燥土の質量に対する水の質量比である。この定義で固相と液相を求めると約25％になる。",
      "ウ": "約20は空気の体積をcm³で表した値である。80 cm³に対する割合に換算する必要がある。",
      "エ": "乾燥土は 65/1.55≒41.94 gで、固相は約16.77 cm³、加水後の液相は約43.06 cm³である。残り約20.16 cm³を80 cm³で割ると約25％となる。",
      "オ": "加水後の液相だけでも約43.1 cm³を占め、さらに固相が約16.8 cm³ある。気相が全体の40％を占める余地はない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q13",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "三軸圧縮試験",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、土の三軸圧縮試験に関する記述であるが、ア、イ、ウに当てはまるものの組合せとして最も妥当なのはどれか。\n「土のせん断強さを求める試験方法の一つとして、三軸圧縮試験がある。粘土地盤上に盛土荷重が比較的急速に作用する場合の地盤の安定など、地盤の短期的な安定性を評価するためには［ア］三軸圧縮試験が適しており、長期的な安定性を評価するためには［イ］三軸圧縮試験が適している。\nある土について円柱供試体を作成し、異なる拘束圧の下で三軸圧縮試験を実施したところ、この土のせん断抵抗角（内部摩擦角）φと粘着力cが得られた。図1に示すように、この土の円柱供試体が拘束圧σ₃、垂直応力σ₁で破壊され、破壊面と水平面の成す角度がαであるとき、αは、図2のモールの応力円と破壊包絡線の関係から理論的に［ウ］と求められる。」",
    "choices": {
      "ア": "非圧密非排水、圧密排水、π/4＋φ/2",
      "イ": "非圧密非排水、圧密排水、π/4＋φ/4",
      "ウ": "非圧密非排水、圧密非排水、π/4＋φ/2",
      "エ": "圧密非排水、圧密排水、π/4＋φ/2",
      "オ": "圧密非排水、非圧密非排水、π/4＋φ/4"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "急速載荷を受ける粘土の短期評価には非圧密非排水試験、長期評価には圧密排水試験が適している。接点に向かう半径は破壊包絡線に垂直なので 2α＝π/2＋φ となる。",
    "choiceExplanations": {
      "ア": "急速載荷を受ける粘土の短期評価には非圧密非排水試験、長期評価には圧密排水試験が適している。接点に向かう半径は破壊包絡線に垂直なので 2α＝π/2＋φ となる。",
      "イ": "二つの試験方法は適切である。破壊面の角度はモール円で示される角度の半分なので、加える項はφ/2となる。",
      "ウ": "短期試験と破壊面角度は合っている。長期評価ではせん断中にも排水を許す圧密排水試験が適している。",
      "エ": "長期試験と角度は正しいが、急速な盛土荷重に対応する短期条件では圧密させずにせん断する。",
      "オ": "急載荷の短期を非圧密非排水、排水の進む長期を圧密排水で評価する。角度の加算項もφ/4ではなくφ/2である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q13.webp"
    ],
    "imageAltTexts": [
      "三軸圧縮試験の円柱供試体とモールの応力円"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q14",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "トラバース測量",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "表は、閉合トラバース測量の結果である。この測量の閉合比として最も妥当なのはどれか。",
    "choices": {
      "ア": "約1/6100",
      "イ": "約1/2400",
      "ウ": "約1/2000",
      "エ": "約1/1200",
      "オ": "約1/870"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "緯距の差0.40 mと経距の差−0.30 mを合成すると閉合差は0.50 mである。総距離610.82 mで割ると約1/1200となる。",
    "choiceExplanations": {
      "ア": "総距離610.82 mに対して1/6100なら閉合差は約0.10 mとなる。実際には南北方向の差だけで0.40 mある。",
      "イ": "閉合差は0.40 mと0.30 mの直交成分を合成した0.50 mである。1/2400はこの閉合差に対して小さすぎる。",
      "ウ": "東西成分の0.30 mだけを使うと約1/2000になる。閉合差には南北方向の成分も含める。",
      "エ": "緯距の差0.40 mと経距の差−0.30 mを合成すると閉合差は0.50 mである。総距離610.82 mで割ると約1/1200となる。",
      "オ": "二方向の差の絶対値をそのまま足すと0.70 mになる。二つは直交するので閉合差は二乗和の平方根で求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q14.webp"
    ],
    "imageAltTexts": [
      "閉合トラバース測量の各測線の距離と方向別の緯距・経距を示した表"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q15",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "水準測量",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "水準測量に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. レベル（水準器）の視準軸と気泡管軸が平行でない場合には視準軸誤差が生じ、レベルの軸の摩耗などによって鉛直軸が鉛直でない場合には鉛直軸誤差が生じる。このうち、視準軸誤差は、前視と後視の視準距離を等しくすることで消去できる。\nB. 水準測量の許容誤差は、観測距離の2乗に定数を掛けたもので表される。公共測量では、水準測量の較差の許容誤差は、観測距離をS［km］とすると、3級水準測量では10×S²［mm］、2級水準測量では15×S²［mm］と定められている。\nC. 気差とは、光が大気密度の大きい方に屈折する性質によって生じる測量誤差である。地表面から離れるほど大気密度は大きくなり、測量誤差が大きくなるため、視準距離はなるべく長くとるようにする。\nD. 曲率誤差（球差）とは、地球表面の曲率によって生じる測量誤差であり、曲率誤差の大きさは観測距離の2乗に比例する。曲率誤差は、前視と後視の視準距離を等しくすることで消去できる。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "視準軸の傾きによる誤差は、等距離の前視と後視の差を取ると相殺できる。距離の2乗に比例する球差も同じ操作で相殺できる。",
    "choiceExplanations": {
      "ア": "Aは妥当であるが、公共測量の水準測量の許容誤差は距離の2乗に比例させるのではなく平方根に比例させる。",
      "イ": "Aは妥当であるが、Cのように視準距離を長くすると屈折による誤差を抑えられない。",
      "ウ": "視準軸の傾きによる誤差は、等距離の前視と後視の差を取ると相殺できる。距離の2乗に比例する球差も同じ操作で相殺できる。",
      "エ": "Dの球差は距離の2乗に比例するが、Bの許容誤差の基準に距離の2乗を用いる点は誤りである。",
      "オ": "Dは曲率誤差を正しく述べているが、Cのように視準距離を長く取ると気差の影響が増す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q16",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "水田用水量",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における水田の用水量に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "水田に供給された水のうち、土壌に浸入する水量を浸透量と呼び、そのうち、畦畔などを通じて隣接する排水路や水田に浸出する水量を横浸透量と呼ぶ。横浸透量は、畦畔を構成する土壌の透水性だけでなく、ザリガニなどの生物活動や農家の畦畔維持活動にも影響を受けて変化する。",
      "イ": "水路からの浸透、漏水、蒸発などによって失われる用水量を配水管理用水量と呼び、その量は、水路の様式、材料、延長、立地条件などによって影響を受ける。水路の様式で見た場合、配水管理用水量は、土水路で小さく、コンクリートライニング水路や管水路では大きくなる。",
      "ウ": "かんがい期において、開水路内の土砂の堆積や水の汚濁、管水路内の空気の滞留を回避するために流す用水量や、用水路の清掃、通水機能の確認などのために流す用水量を総称して、送水損失水量と呼ぶ。",
      "エ": "乾田直播栽培は、移植栽培同様に代かきを行うため、代かき用水が必要となる。かんがい期に、地下水位が高くなるような水田、あるいは心土層や耕盤などに著しく透水性の低い土層が存在するような水田では、乾田直播栽培の導入によって用水量が著しく変化する。",
      "オ": "一旦畑として利用された後に水田作に戻された水田を復元田と呼ぶ。畑としての利用により、土壌亀裂の閉鎖や耕盤層の緻密化が生じているため、復元田では、同じ地区で連続して水田として利用されてきた水田に比べて、代かき用水量、普通期用水量ともに減少することが一般的である。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "畦畔を横切って流出する量が横浸透量である。穴を掘る生物や畦畔の補修は、水が通り抜ける経路を変化させる。",
    "choiceExplanations": {
      "ア": "畦畔を横切って流出する量が横浸透量である。穴を掘る生物や畦畔の補修は、水が通り抜ける経路を変化させる。",
      "イ": "浸透や漏水などで失われるのは送水損失水量である。浸透を抑えるライニングや管路は、一般に土水路より損失を減らす。",
      "ウ": "施設の通水機能の確保や維持管理のため意図的に流す水量は配水管理用水量に当たる。送水損失は輸送中の漏水や蒸発などである。",
      "エ": "乾田直播は乾いた状態の田に播種する方式で、通常は代かきを省く。地下水位や土層の透水性は導入後の浸透量を左右する。",
      "オ": "畑として使うと、乾燥による亀裂や耕盤の変化によって水が浸透しやすくなる場合がある。水田に戻したことだけで用水量の減少は導けない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q17",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "水田の減水深",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "連続した10日間の無降雨期間において、ある一筆の水田において図のような測定結果が得られたとき、この期間の当該水田における減水深の日平均の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "10 mm",
      "イ": "18 mm",
      "ウ": "26 mm",
      "エ": "100 mm",
      "オ": "180 mm"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "取水200 mmに湛水深の減少60 mmを加え、排水路への地表流出80 mmを差し引くと期間の減水深は180 mmである。10日間の平均は18 mmとなる。",
    "choiceExplanations": {
      "ア": "10 mmは収支で逆算した蒸発散のみの日平均である。減水深には鉛直方向などへの浸透による損失も含む。",
      "イ": "取水200 mmに湛水深の減少60 mmを加え、排水路への地表流出80 mmを差し引くと期間の減水深は180 mmである。10日間の平均は18 mmとなる。",
      "ウ": "取水200 mmと湛水深の減少60 mmを足しただけでは、排水路への80 mmの流出を含んでしまう。",
      "エ": "100 mmは10日間の蒸発散量である。日平均に直し、土中への浸透分も含める必要がある。",
      "オ": "180 mmは期間全体の減水深である。問題が求める日平均はこの値を10で割る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q17.webp"
    ],
    "imageAltTexts": [
      "無降雨の水田の取水200 mm、地表流出80 mm、浸透80 mmと測定前後の湛水深"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q18",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "畑地かんがい",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の畑地かんがいに関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "総迅速有効水分量（TRAM）は、作物が生長阻害を起こさずに利用できる制限土層内の水分量であり、有効土層内の水分量が、初期しおれ点から生長阻害水分点まで低下した時点で、その間に制限土層内で消費された水分量として算定される。",
      "イ": "畑地かんがいに必要な用水量を構成する要素のうち、ほ場単位用水量とは、計画日消費水量に有効雨量を足し合わせて算出するものであり、純用水量とは、ほ場単位用水量にかんがい面積を乗じて算出するものである。",
      "ウ": "点滴かんがいとは、圧力をかけた水をノズルから円形に散水することで、比較的広い範囲に散水できる方式である。点滴かんがいは、畦間かんがいやボーダーかんがいと同様に、地表かんがいに分類されるものである。",
      "エ": "インテークレートとは、かんがい水や雨水が地表面から浸入した後の、単位時間当たりの地表面からの蒸発量のことをいう。インテークレートは時間とともに減少し、その減少率がそのときのインテークレートの1/2となるときのインテークレートをベーシックインテークレートと呼ぶ。",
      "オ": "蒸発散量とは、作物からの蒸散量と土壌表面からの蒸発量を合わせた水量のことである。蒸発散量の測定方法には、作物とその近傍の土壌面に、底のない円筒を被せて空気を通し、通気量と通気前後の絶対湿度差から求めるチャンバー法などがある。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "作物が蒸散させた水と土壌が蒸発させた水の合計が蒸発散量である。チャンバー法では通気による水蒸気量の増加からその量を求める。",
    "choiceExplanations": {
      "ア": "迅速有効水分量は、かんがいなどの後の湿った状態から生育を妨げる水分点までに利用できる水を考える。すでにしおれの始まる水分点を出発点にはしない。",
      "イ": "有効雨量は用水を補う量である。ほ場で必要となる補給水量を見積もるときは、計画日消費水量から差し引く。",
      "ウ": "円形に広く散水する説明はスプリンクラーに当たる。点滴かんがいでは吐出口の近くへ少量ずつ給水する。",
      "エ": "インテークレートは水が地表から土中に浸入する速さである。地表面から大気へ失われる蒸発量とは区別される。",
      "オ": "作物が蒸散させた水と土壌が蒸発させた水の合計が蒸発散量である。チャンバー法では通気による水蒸気量の増加からその量を求める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q19",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "農業排水",
    "topicTags": [
      "農用地の排水計画",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における農用地の排水計画に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "常時排水計画における基準内水位は、受益区域内の地下水位を最も低く保ちたい時期を考慮して選定する。また、常時排水計画は、受益区域内の暗渠排水計画と連携した計画とする必要がある。",
      "イ": "洪水時の排水方式は、自然排水方式よりも機械排水方式を優先する。また、洪水時排水計画策定に当たって、受益区域内の湛水を考慮する場合は、洪水ピーク流出量を用いて流出解析を行う。",
      "ウ": "洪水ピーク流出量を求める場合の計画基準降雨は連続降雨量を対象とし、洪水ハイドログラフを求める場合の計画基準降雨は短時間降雨強度を対象とする。",
      "エ": "排水水門は一般に、広い面積を排水できるよう、地区の最高位部に設ける。排水水門のうち、排水門とは、河川等の堤体内に暗渠を挿入して、内水側又は外水側にゲートを設置した施設である。",
      "オ": "排水路の勾配が緩すぎると、土砂堆積などによって通水障害を引き起こすことがあるため、落差工を設ける。落差工の設置に当たっては、直上流又は直下流に屈曲のある地点を選定する。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "作物の生育や農作業に必要な地下水位を維持できるよう、厳しい時期を踏まえて基準内水位を決める。地下水を排除する暗渠も、その排水先となる系統と一体で計画する。",
    "choiceExplanations": {
      "ア": "作物の生育や農作業に必要な地下水位を維持できるよう、厳しい時期を踏まえて基準内水位を決める。地下水を排除する暗渠も、その排水先となる系統と一体で計画する。",
      "イ": "自然排水が可能かを先に検討し、不足するときに機械排水を考える。区域内の湛水も扱うなら時々刻々の流入を示すハイドログラフが必要である。",
      "ウ": "ピーク流出量の推定には短時間の降雨強度が使われる。流出の全経過を求めるハイドログラフでは一連の降雨の時間分布が必要である。",
      "エ": "自然に水を集める排水施設は地区の低い所に置く。堤体を暗渠で貫いた施設は排水樋門の説明に当たる。",
      "オ": "落差工は高さの差を処理し、流速や水路勾配を調整する構造物である。設置部付近の急な屈曲は流れを乱すため避ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q20",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "水文学",
    "topicTags": [
      "降雨と流出",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "水文に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "洪水や渇水などの水文量について、ある特定の値を上回る又は下回る確率の逆数を、再現期間（リターンピリオド）と呼ぶ。再現期間は、治水計画や排水計画などの安全度を示す重要な指標であり、それぞれの計画で要求される安全度の水準に応じて決める必要がある。",
      "イ": "洪水時の洪水到達時間を推定する式を合理式と呼ぶ。洪水到達時間内の降雨強度と洪水ピーク流量の比であるピーク流出係数は、流域の地質などの諸条件によって異なるため、合理式を適用する流域における観測値に基づいて定めることが妥当である。",
      "ウ": "降雨が地下に浸入後、土層間の境界面上を斜面下端に向かって流下し、河道近傍で流水が現れる場合があり、この流れをパイプ流と呼ぶ。また、パイプ流によって斜面下端の河道付近で形成される飽和域で、地下に浸入せず直接地表を流下する流れをホートン型地表流と呼ぶ。",
      "エ": "森林において、樹冠通過雨と樹幹流のような、地表に到達する降水量のことを有効降雨量と呼び、地表に到達する前に蒸発する降水量を損失雨量と呼ぶ。有効降雨量に損失雨量を加えることで、森林における全体の降水量を求めることができる。",
      "オ": "地下水で飽和している地層のことを帯水層と呼ぶ。このうち、大気と直接つながっている自由地下水面をその上端とする帯水層を被圧帯水層と呼び、不透水層に挟まれて、大気圧よりも大きな圧力を受ける帯水層を不圧帯水層と呼ぶ。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "例として年超過確率1％の洪水規模は100年の再現期間に対応する。計画で対象とする事象の起こりにくさを表すため、安全度の目安となる。",
    "choiceExplanations": {
      "ア": "例として年超過確率1％の洪水規模は100年の再現期間に対応する。計画で対象とする事象の起こりにくさを表すため、安全度の目安となる。",
      "イ": "合理式が推定するのはピーク流量である。式には到達時間に対応した降雨強度だけでなく流域面積も入る。",
      "ウ": "ホートン型地表流は降雨強度が土壌の浸透能を超えて生じる。地下水の上昇などによって地表が飽和して生じる流出とは区別される。",
      "エ": "樹冠通過雨と樹幹流の合計は林床に届く雨量である。流出解析の有効降雨量は、そのうち浸透や貯留なども経て直接流出に寄与する量を指す。",
      "オ": "自由地下水面を上端に持つものは不圧帯水層である。上下を難透水層などで挟まれ圧力を受けるものが被圧帯水層となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q21",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "農村整備",
    "topicTags": [
      "土地改良法と土地改良事業",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "土地改良法及び土地改良事業に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 農村人口や農業者の減少が進む中、土地改良施設の老朽化や、自然災害の激甚化及び頻発化に対応していくため、令和7年4月に施行された改正土地改良法では、同法の目的及び原則として、農業生産基盤の整備に加えて、保全を図ることが明記された。\nB. 土地改良区は、理事の選出に当たって、年齢又は性別のいずれかに著しい偏りが生じないように配慮する必要がある。令和7年度策定の食料・農業・農村基本計画では、土地改良区理事に占める女性割合を令和5年の40％から2030年には50％とする目標が掲げられている。\nC. 国営土地改良事業を実施するためには、土地改良事業に参加する資格を有する15人以上の者が、受益地区内における事業参加資格者の2分の1以上の同意を得た上で、農林水産大臣に申請する必要がある。\nD. 農地中間管理機構関連農地整備事業では、都道府県又は市町村が事業実施主体となり、農地中間管理機構が農地中間管理権又は所有権を有する農用地で、一定の条件を満たすものを対象に、農業者の申請・同意・費用負担によらず、基盤整備することが可能である。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、C",
      "オ": "C、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "改正では施設を含む農業生産基盤の保全も目的に含めた。機構が権利を持つなど要件を満たす農地では、都道府県等が農業者の申請や費用負担によらず整備できる。",
    "choiceExplanations": {
      "ア": "Aの保全の明記は妥当である。Bは女性理事割合に関し、基本計画の実績と目標の水準を誤っている。",
      "イ": "Aは改正の内容を反映するが、Cの通常の申請に必要な同意は2分の1以上でなく3分の2以上である。",
      "ウ": "改正では施設を含む農業生産基盤の保全も目的に含めた。機構が権利を持つなど要件を満たす農地では、都道府県等が農業者の申請や費用負担によらず整備できる。",
      "エ": "Bは女性理事割合の数値、Cは事業参加資格者の同意割合を誤っている。",
      "オ": "Dの要件付きの基盤整備は妥当である。Cの2分の1という同意割合は、一般の申請要件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q22",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "農村整備",
    "topicTags": [
      "ほ場整備の換地",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国のほ場整備事業における換地に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "換地処分制度とは、測量法の立法目的に即して設けられた制度であり、換地計画を定めるに当たっては、従前の土地の用途によって、換地先を都市計画区域内と都市計画区域外に分けなければならない。",
      "イ": "換地を定めるに当たって、換地の面積は、換地交付基準地積に対する増減の割合が原則1割未満である必要があるが、事業実施地区の都道府県知事及び市町村長の同意があれば、その限りではない。",
      "ウ": "換地とは、工事前の土地に対応するものとして定められた工事後の土地を指すが、従前に土地が存在していない中において定める換地のことを、不換地と呼ぶ。不換地の用途は非農用地に限られ、農用地とすることは認められていない。",
      "エ": "特別減歩とは、従前の土地の所有者の申出又は同意によって行われる、従前の土地の一部を特別に減じて換地することを指し、この際に減じられた分の面積に対する清算は、金銭によって行う必要がある。",
      "オ": "公共施設が廃止され、工事後に代替の公共施設が設けられた際に、その施設の敷地を、工事前の施設の敷地を所有していた国又は地方公共団体に帰属させる処置を、異種目換地と呼ぶ。工事前後で公共施設の機能が同一であっても、敷地面積が増減した場合には、清算が必要となる。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "特別減歩は所有者の申出や同意を前提として、交付する換地を特別に減らす扱いである。減じた分に相当する権利は金銭で清算する。",
    "choiceExplanations": {
      "ア": "ほ場整備での換地処分は土地改良法に基づき、工事後の区画に権利を移す仕組みである。測量法による区域内外への振り分けではない。",
      "イ": "換地の面積は関係する土地所有者などの権利と結び付く。知事と市町村長の同意のみで地積の要件を外せるという説明は誤りである。",
      "ウ": "不換地は従前の土地に対して換地を定めない扱いである。従前地のない者に新たに換地を与える扱いとは区別される。",
      "エ": "特別減歩は所有者の申出や同意を前提として、交付する換地を特別に減らす扱いである。減じた分に相当する権利は金銭で清算する。",
      "オ": "従前の公共施設と代替施設の用地を対応させる仕組みと、異なる地目等の土地を割り当てる異種目換地は別である。同じ機能の公共施設用地では面積差だけで一律に清算が必要となるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q23",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "農村整備",
    "topicTags": [
      "水田のほ場整備",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における水田のほ場整備に関する記述として最も妥当なのはどれか。なお、データは「令和6年度 食料・農業・農村白書（令和7年5月30日公表）」による。",
    "choices": {
      "ア": "令和5年度時点における我が国の水田面積は約160万 haである。そのうち、約100万 ha（63％）は1 ha以上の大区画水田となっている。また、約5万 ha（3％）は暗渠排水などの整備が行われた汎用化水田となっている。",
      "イ": "水田の標準的な区画配置は、大きいものから順に、周囲が農道で囲まれた区画である「農区」、農区が小用排水路で分割された区画である「ほ区」、ほ区が畦畔で細分化された区画である「耕区」に区分される。",
      "ウ": "既存の道路や水路を利用して水田を再整備する方法として、畦畔を取り除いて区画を拡大する順送り工法がある。この方法は、水田を短辺方向に拡大するため、傾斜地において区画を拡大する場合に適している。",
      "エ": "整地工の仕上げに行う表土均平作業の精度は、水田一筆ごとに田面平均標高から±10 cm以内を目標とする。この際、地表排水を考慮して、水田表面の標高を全体で均一又は排水路側が高くなるように若干の傾斜を付ける。",
      "オ": "支線農道とは、集落間、集落とほ場区域間、ほ場区域間、一般道路とほ場区域間などを結ぶ農道であり、県道などの主要道路や集落道への接続にも便利なように計画する。支線農道から個々の農地への接続は、通作道と連絡道に分類される幹線農道によって結ばれる。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "農道が外周を区切る農区を、小用排水路でほ区に分ける。さらに畦畔で分けた区画が耕区であり、個々の水田を耕作する単位となる。",
    "choiceExplanations": {
      "ア": "約160万 haは水田総面積を示す値ではなく、一定以上の区画に整備された水田面積に近い。1 ha以上の大区画や汎用化水田の面積の説明も白書と合わない。",
      "イ": "農道が外周を区切る農区を、小用排水路でほ区に分ける。さらに畦畔で分けた区画が耕区であり、個々の水田を耕作する単位となる。",
      "ウ": "畦畔を除いて区画をまとめるだけでは、傾斜地の田面の標高差への対応とならない。順送り工法では表土の取扱いを順次進め、区画の拡大方向と地形条件も検討する。",
      "エ": "均平作業では田面の標高差を小さく保つ。地表排水のため傾斜を付ける場合、排水路側を高くすると水の流出を妨げる。",
      "オ": "集落やほ場区域を相互につなぐ道路は幹線農道に当たる。ほ場への取付けを担う道路は支線農道である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q24",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "農村整備",
    "topicTags": [
      "畑のほ場整備",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "畑のほ場整備に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 畑の法面は、崩壊や侵食を防止するため、土質、勾配などを考慮して適切に保護する必要がある。畑では、土質条件にもよるが、切土部の法面勾配は盛土部よりも緩くする。植生工による法面保護は、構造的な破壊である法面崩壊には効果があるが、侵食防止効果は期待できない。\nB. 一般に、新畑の土壌は地力が低いことが多いため、土壌改良資材を散布して土壌の理化学性を改善することを検討する。土壌が酸性の場合には炭酸カルシウムなどを、リン酸が欠乏している場合には溶性リン肥などを土壌改良資材として用いる。\nC. 草地の造成は、基盤造成と播種床造成に分けられる。基盤造成では、山成畑工、改良山成畑工、階段畑工のうち、階段畑工が用いられることが多い。播種床造成は耕起法と不耕起法に大別され、急傾斜地には耕起法が適している。\nD. 山成畑工は、現況地形勾配をそのままに、伐採、抜根を行い、耕起して畑面を仕上げる工法である。一方、改良山成畑工とは、複雑な地形の傾斜地を切盛土によって整形して、全体として傾斜の緩いほ場を造成する工法である。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "A、D",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "炭酸カルシウムは酸性の矯正に、溶性リン肥はリン酸の補給に用いる。山成畑工は現地形を生かし、改良山成畑工では切盛土で傾斜を調整する。",
    "choiceExplanations": {
      "ア": "Bは土壌改良資材の使い方として妥当である。植生は雨滴や流出水による表面侵食の抑制に役立つため、Aの説明は誤りである。",
      "イ": "Aは植生による侵食防止効果を否定している。Cも、侵食が懸念される急傾斜地に耕起法が適するとしており誤りである。",
      "ウ": "Dの二つの工法の説明は妥当である。Aは、表面を保護する植生工が侵食防止に役立つ点を取り違えている。",
      "エ": "炭酸カルシウムは酸性の矯正に、溶性リン肥はリン酸の補給に用いる。山成畑工は現地形を生かし、改良山成畑工では切盛土で傾斜を調整する。",
      "オ": "Dは妥当である。Cは、急傾斜地では地表を大きく乱さない不耕起法を検討する点を取り違えている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q25",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "農村整備",
    "topicTags": [
      "水田の床締め",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、我が国の水田における土層改良の一つである床締めに関する記述であるが、A、B、Cに当てはまるものの組合せとして最も妥当なのはどれか。\n「床締めは、転圧によって土層を締め固めて土の［A］を小さくすることで浸透を抑制する工法である。一般に、水田の浸透量は20 mm/d程度が適正とされているため、減水深30 mm/d以上の水田がその対象となる。土の締固め効果は、土の含水量によって変化し、締固めエネルギーが大きくなるほど最適含水比は［B］なる。\n床締めは、主に表土締めと心土締めの二つの工法に分類され、土壌調査結果に基づく土壌の物理性と現地での技術的可能性、経済性を踏まえ選定する。一般に、［C］の方が浸透抑制効果は大きい。」",
    "choices": {
      "ア": "間隙率、小さく、表土締め",
      "イ": "間隙率、小さく、心土締め",
      "ウ": "間隙率、大きく、心土締め",
      "エ": "乾燥密度、小さく、表土締め",
      "オ": "乾燥密度、大きく、表土締め"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "転圧で土の間隙率を下げると浸透が抑えられ、締固めエネルギーを増すと最適含水比は小さくなる。心土締めでは表土下に浸透を抑える層を設ける。",
    "choiceExplanations": {
      "ア": "間隙率と最適含水比の方向は合っている。浸透抑制効果は一般に表土締めより心土締めの方が大きい。",
      "イ": "転圧で土の間隙率を下げると浸透が抑えられ、締固めエネルギーを増すと最適含水比は小さくなる。心土締めでは表土下に浸透を抑える層を設ける。",
      "ウ": "間隙率と心土締めは合っているが、締固めエネルギーが大きくなると、最適含水比は通常小さくなる。",
      "エ": "転圧すると同じ土粒子の質量を占める体積が減り、乾燥密度は大きくなる。浸透を抑えるために減らすのは間隙率である。",
      "オ": "締固めは乾燥密度を増加させ、最適含水比は締固めエネルギーの増加に伴い低くなる。浸透抑制効果が一般に大きいのは心土締めである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q26",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "農業水利",
    "topicTags": [
      "流域治水",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における農業水利施設を活用した流域治水の取組に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 河川管理者が主体となって行う治水対策に加え、集水域から氾濫域にわたる範囲を一つの流域として捉え、その河川流域内において国、流域自治体、企業等が協働して流域全体で水害を軽減させる流域治水の取組が行われている。\nB. 田んぼダムとは、水田の給水口に小さな穴の開いた調整板などの簡易な器具を取り付けて、流出量のピークを抑えることにより、水田の雨水貯留機能の強化を図り、実施する地域の農地・集落や上流域の浸水被害リスクの低減を図る取組である。\nC. 農業用ダムも含め、既存ダムの有効貯水容量を洪水調節に最大限活用するため、河川管理者と関係利水者などが締結する治水協定には、洪水調節に利用可能な利水容量、緊急時の連絡体制、事前放流の実施方針などが定められる。\nD. ため池の洪水調節容量を確保するため、底樋に切り欠きを設けて水位を低下させる方法がある。この方法を用いる場合、流域比（流域面積／満水面積）が同じため池であれば、満水面積が小さいため池の方が洪水ピーク低減量は大きくなる。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "流域治水では河川区域に限らず、流域の関係者が協働して水害を軽減する。治水協定は事前放流で空けられる容量や実施方針などを明確にする。",
    "choiceExplanations": {
      "ア": "Aは妥当である。田んぼダムでは給水口ではなく排水口で水の流出を調整する。",
      "イ": "流域治水では河川区域に限らず、流域の関係者が協働して水害を軽減する。治水協定は事前放流で空けられる容量や実施方針などを明確にする。",
      "ウ": "Cの協定の内容は適切である。Bの調整器具は排水口に設け、一般に下流側の流出ピークを抑える。",
      "エ": "Bは器具の設置場所を誤っている。Dの切り欠きは通常、洪水吐に設けて洪水前の水位を下げる。",
      "オ": "Cはダムの事前放流に関する協定を正しく説明している。Dは、水位を低く保つ切り欠きの位置を底樋としている点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q27",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "農村政策",
    "topicTags": [
      "多面的機能支払",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、我が国における農業・農村の多面的機能に関する記述であるが、A～Dに当てはまるものの組合せとして最も妥当なのはどれか。\n「農業の多面的機能の発揮を促進するために実施されている日本型直接支払制度のうち、多面的機能支払制度は、『農地維持支払』と『［A］』で構成されている。これらのうち、『農地維持支払』では、［B］などの活動が支援対象となっており、これらの活動を行う組織において、非農業者の参加は［C］である。\n近年、多面的機能支払制度の認定農用地面積は、微増傾向で推移しており、全国の農用地面積のうち、同制度の認定農用地面積の割合は、令和5年度時点で［D］となっている。また、同年度における同制度の活動組織数は2万を超えている。」",
    "choices": {
      "ア": "資源向上支払、水路の泥上げ、可能、約6割",
      "イ": "資源向上支払、水路の泥上げ、原則不可能、約8割",
      "ウ": "資源向上支払、水路の軽微な補修、原則不可能、約6割",
      "エ": "水田活用直接支払、水路の泥上げ、可能、約6割",
      "オ": "水田活用直接支払、水路の軽微な補修、原則不可能、約8割"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "多面的機能支払は農地維持支払と資源向上支払からなり、泥上げなどの日常管理には非農業者も参加できる。令和5年度の認定面積は全国の農用地のおよそ6割である。",
    "choiceExplanations": {
      "ア": "多面的機能支払は農地維持支払と資源向上支払からなり、泥上げなどの日常管理には非農業者も参加できる。令和5年度の認定面積は全国の農用地のおよそ6割である。",
      "イ": "水路の泥上げは農地維持支払の対象となり、非農業者も活動組織に参加できる。令和5年度の面積割合は約8割ではなく約6割である。",
      "ウ": "軽微な補修は資源向上支払の活動の例である。農地維持支払の活動組織は非農業者の参加も認めている。",
      "エ": "水路の泥上げ、非農業者の参加、約6割は合っている。農地維持支払と組み合わされるのは資源向上支払である。",
      "オ": "水田活用の直接支払は多面的機能支払を構成する項目ではない。非農業者も農地維持活動に参加でき、認定面積は約6割である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q28",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "農村環境",
    "topicTags": [
      "生態系保全",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "農業農村整備事業における生態系保全に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "農業農村整備事業において生物を保全するためには、生物が生活史を全うするとともに、種が継続的に存続できるよう、良好な生息・生育環境であるコリドーと、生物が利用する移動経路であるハビタットとで構成される生物のネットワークを確保することが重要である。",
      "イ": "将来にわたって自然との共生を持続させるためには、環境調査、計画検討等の早い段階から、地域住民や有識者の参加を得て、関係団体や行政等との役割分担を明らかにし、合意形成を図ることが重要である。",
      "ウ": "生物生息空間の形態・配置に関する六つの原則のうち、団地化とは、生物生息空間はなるべく広い方が良いという原則であり、集合化とは、生物生息空間の面積が同じであれば、分割された状態よりも一つの方が良いという原則である。",
      "エ": "水路における生物のネットワークを確保するに当たっては、魚類等の移動経路を阻害しないよう、縦断方向の勾配をできるだけ緩やかにしつつ、縦断方向の落差が生じる場合は、1段の落差をできるだけ大きくするとともに、水深や流速が一様な流れを確保するなどの工夫が必要である。",
      "オ": "環境との調和に配慮した対策を選定する場合には、ミティゲーション5原則に基づき、まず代償を検討する。また、回避の具体例としては、落差工によって水路のネットワークが分断されている状況に対して、魚道を設置することが挙げられる。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "調査や計画の早期から知見と地域の意見を取り入れることで、保全すべき対象を把握できる。維持管理に関わる主体の役割も合意しやすくなる。",
    "choiceExplanations": {
      "ア": "生息・生育する場がハビタットであり、場を結ぶ移動経路がコリドーである。記述は両者を逆にしている。",
      "イ": "調査や計画の早期から知見と地域の意見を取り入れることで、保全すべき対象を把握できる。維持管理に関わる主体の役割も合意しやすくなる。",
      "ウ": "生息空間を大きく取る原則と、同じ総面積を分断せず一団にまとめる原則は区別する。後者が団地化であり、集合化は複数の空間を互いに近づける考え方である。",
      "エ": "魚類の通過を確保するためには、段差を小さくし、過大な流速を避ける。生物が利用できる水深や流速の変化も有用である。",
      "オ": "環境への影響はまず回避を検討し、残る影響に対して低減や代償を考える。落差工を残して魚道を設けるのは分断の影響を低減する例である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q29",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "農業水利施設",
    "topicTags": [
      "機能診断と劣化予測",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における農業水利施設の保全管理に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "農業水利施設の機能診断では、水利用機能、水理機能、構造機能などに着目して、各機能の性能を調査する。構造性能を示す指標には送配水性、分水制御性などがあり、構造性能の調査は、できる限り通水状態で行うことが望ましい。",
      "イ": "農業水利施設の機能低下の評価に当たっては、健全度指標を用いた定性的な評価が行われている。健全度指標は4段階となっており、このうち、変状がほとんど認められない状態をS-1、近い将来に施設機能が失われる又は著しく低下するリスクが高い状態をS-4としている。",
      "ウ": "コンクリート構造物の劣化予測では、コンクリート中の鉱物とアルカリ成分の化学反応による生成物が吸水して膨張することで発生するアルカリシリカ反応や、塩化物イオンによってコンクリート中の鋼材の腐食が促進される塩害などの劣化機構を推定しておくことが重要である。",
      "エ": "農業水利施設の機能保全対策は、耐荷力の向上を目的とした補修対策と、耐久性や水理性能の向上を目的とした補強対策に大別される。コンクリート開水路の補修対策のうち、ひび割れ補修工法とは、既設コンクリート部材をプレキャスト部材などで取り替える工法である。",
      "オ": "鉄筋コンクリート開水路では、二酸化炭素がコンクリート内に侵入してセメント水和物と反応する中性化が生じると、骨材が膨張し、コンクリートにひび割れや剥落が発生する。中性化速度を遅くするためには、水セメント比を大きくすることが効果的である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "アルカリシリカ反応では反応生成物の吸水膨張、塩害では塩化物イオンによる鋼材腐食が劣化を進める。機構を推定することで、進行予測に適した指標を選べる。",
    "choiceExplanations": {
      "ア": "送配水性や分水制御性は水利用機能の指標である。構造性能はひび割れや変形などから評価し、必要に応じて止水して水中に隠れる部位も調べる。",
      "イ": "健全度はS-5からS-1までの5段階であり、番号の大きい方が健全である。S-1は機能が失われているなど最も深刻な状態に当たる。",
      "ウ": "アルカリシリカ反応では反応生成物の吸水膨張、塩害では塩化物イオンによる鋼材腐食が劣化を進める。機構を推定することで、進行予測に適した指標を選べる。",
      "エ": "補強は主に耐荷力の回復・向上を目的とし、補修は耐久性や水理性能の回復などを担う。ひび割れを注入や充填で補修することと、部材の交換は異なる。",
      "オ": "中性化によってコンクリートのアルカリ性が低下すると鉄筋が腐食し、その膨張でひび割れや剥落が生じ得る。水セメント比を小さくして組織を緻密にすると、中性化の進行を抑えやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q30",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "農業水利施設",
    "topicTags": [
      "ため池の防災",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の農業用ため池に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 防災重点農業用ため池は、ため池工事特措法（防災重点農業用ため池に係る防災工事等の推進に関する特別措置法）に基づいて農林水産大臣が定める基本指針を踏まえ、市町村長が指定する。令和6年度末時点において、全国で約50万箇所の農業用ため池が防災重点農業用ため池として指定されている。\nB. 農業用ため池の多くは明治時代に築造されており、老朽化が進んでいる。老朽化した堤体の改修に当たっては、劣化状況評価等を行い、堤体断面の変形率が20％以上であることが改修の目安の一つとして挙げられる。\nC. レベル1地震動に対する農業用ため池の堤体の安定計算では、一般に、円形すべり面スライス法が用いられる。安定計算は、完成直後、常時満水位時、設計洪水位時、水位急降下時の四つのケースで行い、いずれも安全率が1.2以上である必要がある。\nD. 農業用ため池の監視・管理体制の強化のため、水位計や監視カメラなどの遠隔監視機器の導入が推進されている。これらの導入により、遠隔地からリアルタイムで、貯水位の水位データや洪水吐の状況等を把握することが可能となる。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "堤体は水位急降下なども含む条件で円形すべりに対する安定性を照査する。遠隔監視機器は現地に赴かず水位や越流の状況を確認する手段になる。",
    "choiceExplanations": {
      "ア": "防災重点農業用ため池は都道府県知事が指定する。築造年代は明治に限らず、江戸時代以前に築造されたものも多い。",
      "イ": "Cは堤体の安定計算を正しく述べている。Aは指定する主体と指定数の規模を誤っている。",
      "ウ": "Cの安定計算は妥当である。Bはため池の築造年代を明治時代に集中させ、改修評価も一律の変形率で説明している点が妥当でない。",
      "エ": "Dは遠隔監視の目的に合っている。Bのように多くのため池が明治時代の築造であるとはいえない。",
      "オ": "堤体は水位急降下なども含む条件で円形すべりに対する安定性を照査する。遠隔監視機器は現地に赴かず水位や越流の状況を確認する手段になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q31",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "農業水利施設",
    "topicTags": [
      "農業用管水路",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の農業用管水路に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "内水圧などによって発生する静水圧に抵抗するため、圧力管路の曲部にコンクリート製ブロックが打設されることがある。地震時は、コンクリート製ブロックが管体と異なる動きをして、管体の安全性を損なう可能性があるため、曲部を重量化することが有効な対策の一つとなる。",
      "イ": "管水路に用いられる管をとう性管と不とう性管に分類したとき、とう性管には遠心力鉄筋コンクリート管やコア式プレストレストコンクリート管があり、不とう性管にはダクタイル鋳鉄管、鋼管、硬質ポリ塩化ビニル管などがある。",
      "ウ": "管水路の劣化や損傷などの性能低下に対しては、様々な対策工法がある。このうち、管路更生工法は、既設管内面から新たに管を構築し、管路の耐荷性や通水性等を回復又は向上させる工法であり、反転工法、さや管工法などがある。",
      "エ": "地震が発生した際の管水路の被害の特徴として、長い直線部における管体の離脱や、周辺地盤の液状化による管体の変状等がある。周辺地盤の液状化対策の一つとして、地震時の過剰間隙水圧を上げるために、ドレーンを設置することが挙げられる。",
      "オ": "地中に埋設される管は、埋戻し土の剛性を下げることで、管の肉厚を減じることが可能となる。そのためには、良質な粘性土や改良土を埋戻し土として選定し、十分に締め固めることが重要である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "反転工法では既設管内にライナーを反転挿入し、さや管工法では既設管に新管を通して更生する。既設管を活用しながら通水性や耐荷性などの回復を図る工法である。",
    "choiceExplanations": {
      "ア": "曲部のブロックは通常時のスラスト力に抵抗するが、重くすると地震時の慣性力が大きくなる。曲部の軽量化や、曲部と管体の相対変位を抑える対策を検討する。",
      "イ": "コンクリート管は不とう性管に含まれる。鋼管やダクタイル鋳鉄管などは、たわみを利用して周囲の土と荷重を分担するとう性管である。",
      "ウ": "反転工法では既設管内にライナーを反転挿入し、さや管工法では既設管に新管を通して更生する。既設管を活用しながら通水性や耐荷性などの回復を図る工法である。",
      "エ": "ドレーンは地震時に生じる過剰間隙水圧を排水によって低下させるために設ける。水圧を高めると有効応力が低下し、液状化が起きやすくなる。",
      "オ": "埋戻し土を十分に締め固めるのは剛性を高め、管を側方から支持するためである。剛性低下はとくにとう性管の変形を増やす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q32",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "ランキン主働土圧",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のように、高さ6 mの鉛直で滑らかな背面を有する擁壁に、25 kN/m²の等分布荷重が載荷された背面土が作用する場合、単位奥行き当たりの擁壁に作用する主働土圧の値として最も妥当なのはどれか。\nただし、作用する土圧はランキンの土圧理論を用いて求めることとし、主働土圧係数を0.3とする。また、背面土は表面が水平で、粘着力のない礫質土、土の単位体積重量は20 kN/m³であり、地下水の影響は考慮しないものとする。",
    "choices": {
      "ア": "63 kN/m",
      "イ": "108 kN/m",
      "ウ": "131 kN/m",
      "エ": "153 kN/m",
      "オ": "243 kN/m"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "自重による土圧は 0.3×20×6²/2＝108 kN/m、上載荷重による土圧は 0.3×25×6＝45 kN/mである。両者の合計は153 kN/mとなる。",
    "choiceExplanations": {
      "ア": "土の自重分だけで主働土圧は108 kN/mに達する。上載荷重はこれをさらに45 kN/m増加させる。",
      "イ": "108 kN/mは高さとともに増える土の自重による三角形分布の合力である。上載荷重の長方形分布を加える必要がある。",
      "ウ": "上載荷重による圧力 0.3×25＝7.5 kN/m² は深さによらず一定である。その合力は7.5×6＝45 kN/mであり、これを自重分108 kN/mに加える。",
      "エ": "自重による土圧は 0.3×20×6²/2＝108 kN/m、上載荷重による土圧は 0.3×25×6＝45 kN/mである。両者の合計は153 kN/mとなる。",
      "オ": "土の自重による水平圧力は地表で0、底で36 kN/m²となる。最下端の圧力が全高に作用するものとして計算してはいけない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q32.webp"
    ],
    "imageAltTexts": [
      "高さ6 mの滑らかな鉛直擁壁に25 kN/m²の上載荷重がある背面土が作用する図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q33",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "施工管理",
    "topicTags": [
      "工程管理と出来形管理",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における土木工事の工程管理・品質管理に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "建設業法において、受注者は、作業従事者の安全を確保するための責任と義務を有することが規定されていることから、国営土地改良事業で行う工事の価格には、安全管理費用は含まれていない。",
      "イ": "横線式工程表には、横軸に日数をとって、各作業の流れを示したガント・チャート方式と、横軸に作業ごとに達成度をとったバー・チャート方式があり、両方式とも、大規模かつ複雑な工程に適している。",
      "ウ": "ネットワーク式工程表において、作業開始から完了に至る様々な経路のうち、最も時間の短い経路をクリティカルパスという。最早開始日程と最遅開始日程が異なる経路は、各作業に余裕がなく、クリティカルパスとなる。",
      "エ": "品質管理に用いられる管理図では、警戒限界と管理限界が記入されている。一般に、各測定値が警戒限界外であれば、安定した品質といえる。また、各測定値が管理限界内であることは許されない。",
      "オ": "国営土地改良事業で行う工事では、施工途中の構造物の寸法などが契約条件を満足する状態にあるかどうか把握するため、受注者は、直接測定や撮影記録による出来形管理を行うことになっている。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "出来形管理では、施工物の位置や寸法などを測って設計図書や規格値と照合する。施工途中に確認した結果は測定記録や写真で残す。",
    "choiceExplanations": {
      "ア": "受注者に安全確保の責任があることと、安全管理費を工事価格に計上することは両立する。安全に必要な費用は工事の積算に含まれる。",
      "イ": "日数を横軸に取る横線式の代表がバーチャートである。作業間の依存が多い工程では、関係を明示できるネットワーク式が適している。",
      "ウ": "クリティカルパスは工期を決める最も時間の長い経路である。その経路上で通常、最早開始時刻と最遅開始時刻の差は0である。",
      "エ": "管理限界を外れた測定値は工程の異常を疑う根拠になる。管理限界内であることは一般に許され、警戒限界外というだけで安定と判断しない。",
      "オ": "出来形管理では、施工物の位置や寸法などを測って設計図書や規格値と照合する。施工途中に確認した結果は測定記録や写真で残す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q34",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "測量",
    "topicTags": [
      "点高法による地ならし",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "図のような造成予定地（縦6 m、横10 mの七つの長方形で構成）を、切土量と盛土量を等しくして平坦な土地に地ならしするとき、地ならし後の地盤高として最も妥当なのはどれか。\nただし、図中の数字は各点の地ならし前の地盤高（単位はm）である。また、地ならし後の地盤高は、造成予定地を図のように面積の等しい三角形に区分して、点高法によって求めるものとする。",
    "choices": {
      "ア": "3.82 m",
      "イ": "3.84 m",
      "ウ": "3.86 m",
      "エ": "4.03 m",
      "オ": "4.06 m"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "等面積の14個の三角形について、各頂点の標高を重複も含めて足すと170.60 mとなる。これを14×3で割った約4.06 mが切土と盛土が釣り合う高さである。",
    "choiceExplanations": {
      "ア": "各頂点は、接する三角形の数に応じて重みが変わる。標高の高い内側の点も出現回数だけ含めると、平均は3.82 mより高くなる。",
      "イ": "等面積の各三角形について頂点標高の平均を求めてから全体を平均する。外周と内部の点を一律に扱う方法では必要な高さを得られない。",
      "ウ": "3.86 mは図の異なる頂点を同じ重みで平均した値に近い。点高法では同じ頂点が複数の三角形に属すれば、その回数だけ加算する。",
      "エ": "長方形の四頂点を一律に平均して各長方形を集計すると約4.03 mになる。指定の三角形区分では、各対角線上の頂点は同一長方形内で2回数える。",
      "オ": "等面積の14個の三角形について、各頂点の標高を重複も含めて足すと170.60 mとなる。これを14×3で割った約4.06 mが切土と盛土が釣り合う高さである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q34.webp"
    ],
    "imageAltTexts": [
      "縦6 m・横10 mの矩形七つを等積三角形に分け各頂点の地盤高を示した図"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q35",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "土質力学",
    "topicTags": [
      "間隙水圧と有効応力",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、土に働く応力等に関する記述であるが、A、B、Cに当てはまるものの組合せとして最も妥当なのはどれか。\n「図のように、地下水面が地表から深さ5.0 mに位置している一様な地盤において、地表から深さ12 mの地点における鉛直方向の間隙水圧uは［A］kN/m²であり、有効応力σ′₁は［B］kN/m²である。この状態から地下水面が地表から深さ8.0 mの地点まで低下したとき、地表から深さ12 mの地点における有効応力σ′₂は［C］kN/m²となる。\nただし、この地盤は、地下水面より上は湿潤状態、地下水面以下は飽和状態にあるものとする。また、水の単位体積重量を10 kN/m³、土の湿潤単位体積重量を18 kN/m³、土の飽和単位体積重量を20 kN/m³とする。」",
    "choices": {
      "ア": "50、230、216",
      "イ": "70、160、184",
      "ウ": "70、160、216",
      "エ": "70、230、216",
      "オ": "120、230、184"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "初期の水圧は 10×(12−5)＝70 kN/m²で、全応力 18×5＋20×7＝230 kN/m²から引くと有効応力は160 kN/m²となる。低下後の有効応力は 18×8＋20×4−10×4＝184 kN/m²である。",
    "choiceExplanations": {
      "ア": "水柱の高さは地下水面から着目点までの7 mで、間隙水圧は70 kN/m²となる。230 kN/m²は水圧を引く前の全応力である。",
      "イ": "初期の水圧は 10×(12−5)＝70 kN/m²で、全応力 18×5＋20×7＝230 kN/m²から引くと有効応力は160 kN/m²となる。低下後の有効応力は 18×8＋20×4−10×4＝184 kN/m²である。",
      "ウ": "初期の二値は合っている。低下後は8 mの湿潤層と4 mの飽和層から全応力を求め、さらに40 kN/m²の水圧を差し引く。",
      "エ": "水圧の70 kN/m²は合っているが、230 kN/m²は全応力である。有効応力を求めるには水圧を引かなければならない。",
      "オ": "地表から地下水面までの5 mは水圧を計算する水柱に含まれない。初期の全応力230 kN/m²から正しい水圧70 kN/m²を引く必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-ippan-dai/2026/senmon-noson/q35.webp"
    ],
    "imageAltTexts": [
      "地下水面が深さ5.0 mにあり深さ12 mの地点を示す地盤断面"
    ]
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q37",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "農業水利施設",
    "topicTags": [
      "農業用ポンプ",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国の農業用ポンプに関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. ポンプ場におけるポンプの設置台数は、ポンプ場の建設費及び管理費が最も経済的になるよう決定するが、基本的には1台とすることが望ましい。ただし、1台のポンプで揚水量が不足する場合はポンプを直列に、揚程が不足する場合はポンプを並列に設置する。\nB. キャビテーションとは、流水中に局部的な圧力上昇が生じることで水が急激に気化し、発生した気泡が、圧力低下によって急激に消滅する現象である。キャビテーションが発生すると、ポンプに騒音や振動を発生させるだけでなく、ポンプの羽根車を損傷させることがある。\nC. 一般に、用水機場のポンプは高揚程で年間を通じて定期的に運転され、排水機場のポンプは低揚程で不定期に運転されることが多いため、用水ポンプには渦巻又は高揚程斜流ポンプが、排水ポンプには軸流又は斜流ポンプが、それぞれ用いられる。\nD. 吐出水位と吸込水位の差を実揚程といい、実揚程に摩擦損失水頭や吐出し管損失水頭などの損失水頭を加えたものを全揚程という。損失水頭のうち摩擦損失水頭は、ポンプから接続される管路の管径が小さいほど大きくなる。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "高揚程の用水には渦巻や高揚程斜流、低揚程で大流量の排水には軸流や斜流が適している。実揚程に管路の損失を加えると全揚程となり、同じ流量なら管径が小さいほど摩擦損失は増す。",
    "choiceExplanations": {
      "ア": "Aは直列と並列の効果を取り違えている。Bも気泡が生じる際の圧力変化を逆に述べている。",
      "イ": "Cのポンプの選定は用途に応じたものである。Aでは、揚水量を増すときは並列、揚程を増すときは直列が基本となる。",
      "ウ": "Cは妥当であるが、Bのキャビテーションは局所的な圧力低下で気泡が生じ、その後圧力の高い所で崩壊する現象である。",
      "エ": "Dは妥当である。Bのように水が高圧側で気化するのではなく、局所圧力が蒸気圧を下回ると気泡が発生する。",
      "オ": "高揚程の用水には渦巻や高揚程斜流、低揚程で大流量の排水には軸流や斜流が適している。実揚程に管路の損失を加えると全揚程となり、同じ流量なら管径が小さいほど摩擦損失は増す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q38",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "農村政策",
    "topicTags": [
      "農地の集積・集約化",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "次は、我が国の農地の集積・集約に関する記述であるが、A、B、Cに当てはまるものの組合せとして最も妥当なのはどれか。\n「令和7年4月に策定された食料・農業・農村基本計画では、平時からの食料安全保障を実現する観点から、食料自給率やその他の食料安全保障の確保に関する様々な目標が定められている。このうち、農地に関するKPIとしては、2030年度における担い手への農地集積率を［A］とすることが掲げられている。\nまた、農地の集積・集約化に向けた取組を加速化するため、農業経営基盤強化促進法において、農業経営基盤強化促進基本構想を策定している市町村は、農業者等による話合いを踏まえて、将来の地域農業の在り方や目指すべき将来の農地の利用を明確化した『目標地図』を含めた［B］を策定することとなっている。［C］ごとに設置されている農地中間管理機構は、［B］に基づき、目標地図に位置付けられた担い手等に対して農地の貸付などを行い、農地の集積・集約化を推進している。」",
    "choices": {
      "ア": "7割、地域計画（地域農業経営基盤強化促進計画）、都道府県",
      "イ": "7割、人・農地プラン、市町村",
      "ウ": "9割、地域計画、都道府県",
      "エ": "9割、地域計画、市町村",
      "オ": "9割、人・農地プラン、市町村"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "基本計画が掲げる2030年度の集積率は7割である。市町村が策定する地域計画には目標地図が含まれ、都道府県ごとの農地中間管理機構が担い手への貸付を進める。",
    "choiceExplanations": {
      "ア": "基本計画が掲げる2030年度の集積率は7割である。市町村が策定する地域計画には目標地図が含まれ、都道府県ごとの農地中間管理機構が担い手への貸付を進める。",
      "イ": "7割は合っている。法律に基づく目標地図付きの計画は地域計画であり、機構は都道府県ごとに置かれる。",
      "ウ": "地域計画と都道府県は合っているが、令和7年の基本計画における2030年度の指標は9割ではなく7割である。",
      "エ": "地域計画の策定主体が市町村でも、農地中間管理機構は都道府県ごとに設置される。2030年度の集積率の目標も7割である。",
      "オ": "2030年度の集積率は7割であり、目標地図を含む法定計画が地域計画である。機構は市町村単位ではなく都道府県単位で置かれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-ippan-dai-2026-annual-senmon-noson-q39",
    "exam": "kokka-ippan-dai",
    "year": 2026,
    "season": "annual",
    "session": "senmon-noson",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "農村政策",
    "topicTags": [
      "食料と農業の現状",
      "農業農村工学区分"
    ],
    "difficulty": 3,
    "question": "我が国における食料と農業の現状に関する記述A～Dのうち、妥当なもののみを挙げているのはどれか。\nA. 令和5年度における我が国の供給熱量ベースの総合食料自給率は約60％となっている。令和7年度策定の食料・農業・農村基本計画（以下「基本計画」という。）では、2030年度における供給熱量ベースの総合食料自給率を90％にすることを目標としている。\nB. 食料・農業・農村基本法では、先端的な技術などを活用して農業の生産性向上を図ることを基本施策の一つとしており、スマート農業技術活用促進法（農業の生産性の向上のためのスマート農業技術の活用の促進に関する法律）では、スマート農業技術を活用した生産方式に取り組む農業者に対して、税制特例などの支援措置が講じられている。\nC. 令和6年における米及び米加工品の輸出額は、海外における日本食需要の高まりなどを背景に対前年比で2倍以上増加したが、基本計画では、国内の米不足を背景に2030年までに米の輸出量を対2023年比で半減することを目標としている。\nD. みどりの食料システム法（環境と調和のとれた食料システムの確立のための環境負荷低減事業活動の促進等に関する法律）において、都道府県は、化学肥料や化学農薬の使用低減、温室効果ガスの排出量削減などの環境負荷低減を図る生産者の実施計画を認定し、認定を受けた生産者は、税制特例などの支援措置を受けることができる。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "スマート農業技術活用促進法は、認定された生産方式革新実施計画などを通じ技術の導入を支援する。みどりの食料システム法も、都道府県による実施計画の認定を通じて環境負荷低減の活動を支援する。",
    "choiceExplanations": {
      "ア": "Bはスマート農業を促す制度を正しく述べている。Aの供給熱量ベースの食料自給率は令和5年度実績が38％であり、2030年度目標は45％である。",
      "イ": "Aの供給熱量ベースの率は実績も目標も高すぎる。Cも、基本計画が米の輸出量を半減させるとしている点が誤りである。",
      "ウ": "Bの支援措置は妥当であるが、Cは米の輸出拡大を図る基本計画の方向と逆である。",
      "エ": "スマート農業技術活用促進法は、認定された生産方式革新実施計画などを通じ技術の導入を支援する。みどりの食料システム法も、都道府県による実施計画の認定を通じて環境負荷低減の活動を支援する。",
      "オ": "Dの計画認定と支援は妥当である。Cのように米輸出の半減を目標にするのではなく、基本計画では輸出量の拡大を掲げる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000018484.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2026年度 国家公務員採用一般職試験（大卒程度） 農業農村工学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  }
];
