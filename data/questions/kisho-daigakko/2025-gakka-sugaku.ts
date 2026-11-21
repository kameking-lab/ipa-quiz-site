import type { Question } from "@/lib/questions/types";

export const KISHO_DAIGAKKO_2025_GAKKA_SUGAKU: Question[] = [
  {
    "id": "kisho-daigakko-2025-annual-gakka-sugaku-q01",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "三次方程式の解の積"
    ],
    "difficulty": 3,
    "question": "実数 a、b を定数とする3次方程式 x³＋ax²−4x＋b＝0 が x＝1＋i を解にもつとき、この方程式の3つの解の積はいくらか。ただし、i は虚数単位とする。",
    "choices": {
      "ア": "−6",
      "イ": "−3",
      "ウ": "−1",
      "エ": "1",
      "オ": "6"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "実係数なので 1−i も解であり、この2根の積は2である。残りの根を t とすると、一次の係数から 2＋2t＝−4 より t＝−3 となり、3根の積は −6 である。",
    "choiceExplanations": {
      "ア": "実係数なので 1−i も解であり、この2根の積は2である。残りの根を t とすると、一次の係数から 2＋2t＝−4 より t＝−3 となり、3根の積は −6 である。",
      "イ": "−3 は残る実数解である。ほかの2根を掛けると2になるため、3根の積は実数解の2倍である。",
      "ウ": "x³＋ax²−4x＋b の一次係数は根の2個ずつの積の和であり、これを 2＋2t＝−4 と書くと t＝−3 になる。",
      "エ": "共役な2根を掛けた値は2であり、実数解は −3 なので、3根の積は負になる。",
      "オ": "展開したときの定数項 b は6であり、モニックな三次式の3根の積は −b となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-sugaku-q06",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "データ修正と相関係数"
    ],
    "difficulty": 3,
    "question": "ある学校で、2つのテスト A、B を実施した。図Ⅰは、生徒の A の得点を 0～10点、11～20点、…、91～100点の10階級に分けて作成したヒストグラムであり、図Ⅱは B の得点を横軸、A の得点を縦軸とした散布図である。これらの図を作成して結果を確認したところ、B において40点だった生徒一人の A の採点に誤りが見つかったため、採点し直した。その結果、この生徒の A の正しい得点は46点であることがわかった。このとき、次の記述の㋐、㋑に当てはまるものの組合せとして正しいのはどれか。\n「正しい数値に直すと、テスト A の修正後の平均は、修正前より［㋐］なり、A と B の得点の修正後の相関係数は、修正前より［㋑］なる。」",
    "choices": {
      "ア": "㋐ 0.125点高く、㋑ 小さく",
      "イ": "㋐ 0.125点低く、㋑ 大きく",
      "ウ": "㋐ 0.125点低く、㋑ 小さく",
      "エ": "㋐ 0.75点高く、㋑ 大きく",
      "オ": "㋐ 0.75点高く、㋑ 小さく"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "度数の合計は48で、(B, A)＝(40, 10) を (40, 46) に修正すると平均は 36/48＝0.75 点上がる。右上がりの点群から外れていた点が点群に近づき、図から読み取った相関係数は約0.94から約0.95に上がる。",
    "choiceExplanations": {
      "ア": "散布図の該当点は (40, 10) なので、A の増加は6点でなく36点である。",
      "イ": "A の得点を10点から46点に上げると、全体の得点の合計も上がるため、平均点は下がらない。",
      "ウ": "修正の前後で人数は同じで、合計点が36点上がるため平均点も上がる。",
      "エ": "度数の合計は48で、(B, A)＝(40, 10) を (40, 46) に修正すると平均は 36/48＝0.75 点上がる。右上がりの点群から外れていた点が点群に近づき、図から読み取った相関係数は約0.94から約0.95に上がる。",
      "オ": "平均の増加は正しいが、A が10点だった外れた点は修正後には点群に近づき、相関係数は上がる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 6。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-sugaku/q06.webp"
    ],
    "imageAltTexts": [
      "図Ⅰ テスト A の度数分布、図Ⅱ 横軸 B の得点・縦軸 A の得点の散布図"
    ]
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-sugaku-q07",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "有理式の命題の真偽"
    ],
    "difficulty": 3,
    "question": "命題 A～D のうち真であるもののみを全て挙げているのはどれか。\nA．実数 x について、x＋1/x≠2 ならば、x≠1 である。\nB．全ての正の実数 x に対し、x＋1/x＞1 である。\nC．x＜0 のとき、x＋1/x の最小値は −2 である。\nD．x についての方程式 x＋1/x＝k は任意の実数 k に対して実数解をもつ。",
    "choices": {
      "ア": "A、B",
      "イ": "A、B、C",
      "ウ": "A、D",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "A は対偶「x＝1 なら x＋1/x＝2」が成り立つので真である。正の x では相加平均・相乗平均の関係で x＋1/x≧2 となるため、B も真である。",
    "choiceExplanations": {
      "ア": "A は対偶「x＝1 なら x＋1/x＝2」が成り立つので真である。正の x では相加平均・相乗平均の関係で x＋1/x≧2 となるため、B も真である。",
      "イ": "C は x＝−2 で和が −2.5 になるので偽である。−2 は x＜0 における最大値である。",
      "ウ": "A は真だが、k＝0 では実数解がなく D は偽である。この組合せは真である B も含んでいない。",
      "エ": "B は真だが、D は |k|＜2 で二次方程式の判別式 k²−4 が負になるため偽である。",
      "オ": "C は最大値を最小値と取り違えており、D は k＝0 で反例がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-sugaku-q11",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "放物線による円の面積の二等分"
    ],
    "difficulty": 3,
    "question": "a を定数とする。xy 平面上において、2次関数 y＝ax²−a−1 のグラフが不等式 x²＋y²≦2 の表す領域を面積の等しい2つの図形に分けるとき、a の値はいくらか。",
    "choices": {
      "ア": "−3(π＋8)/16",
      "イ": "−3(π＋2)/8",
      "ウ": "−3(π＋6)/16",
      "エ": "−3(π＋4)/16",
      "オ": "−(π＋4)/6"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "両曲線の交点 (±1, −1) の間で放物線と下半円の差を積分すると、面積は −4a/3−1＋π/2 となる。これを円の半分 π とおくと a＝−3(π＋2)/8 である。",
    "choiceExplanations": {
      "ア": "この値を放物線の下の面積 −4a/3−1＋π/2 に入れると 1＋3π/4 となり、円の半分の π より大きい。",
      "イ": "両曲線の交点 (±1, −1) の間で放物線と下半円の差を積分すると、面積は −4a/3−1＋π/2 となる。これを円の半分 π とおくと a＝−3(π＋2)/8 である。",
      "ウ": "この値での放物線の下の面積は 1/2＋3π/4 で、π より小さい。",
      "エ": "この値では放物線の下の面積が 3π/4 となり、円全体の面積 2π の半分に届かない。",
      "オ": "この値は −3(π＋2)/8 より大きく、−1＜x＜1 で放物線がより低くなるため、下側の面積は π より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-sugaku-q12",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "二階漸化式と等比・等差数列"
    ],
    "difficulty": 3,
    "question": "次の漸化式を満たす数列 {aₙ} と、初項 p、公差 d の等差数列 {bₙ} に対し、cₙ＝aₙ−bₙ で定まる数列 {cₙ} が初項 q、公比 r の等比数列となった。このとき、d と r の値の組合せとして正しいのはどれか。ただし、q≠0、r≠0, 1 とする。\naₙ₊₂＝(8aₙ₊₁−5aₙ−7)/3（n＝1、2、3、…）",
    "choices": {
      "ア": "d＝−7/3、r＝8/3",
      "イ": "d＝7/3、r＝−5/3",
      "ウ": "d＝7/3、r＝8/3",
      "エ": "d＝7/2、r＝−5/3",
      "オ": "d＝7/2、r＝5/3"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "aₙ＝bₙ＋qrⁿ⁻¹ を移項後の式に入れると −2d＋qrⁿ⁻¹(3r²−8r＋5)＝−7 となる。q≠0、r≠0, 1 なので −2d＝−7、(r−1)(3r−5)＝0 より d＝7/2、r＝5/3 である。",
    "choiceExplanations": {
      "ア": "等差数列を左辺 3bₙ₊₂−8bₙ₊₁＋5bₙ に代入すると −2d なので、d は正になる。等比部分の特性方程式に 8/3 を代入しても0にならない。",
      "イ": "定数項との比較から −2d＝−7 である。公比を求める特性方程式の根は 1 と 5/3 であり、−5/3 は根ではない。",
      "ウ": "分母の3だけに注目するのではなく、等差数列の項を各係数でまとめて公差を求める。8/3 は特性方程式の根ではない。",
      "エ": "公差は正しいが、3r²−8r＋5＝(r−1)(3r−5) より、r≠1 の根は正の 5/3 である。",
      "オ": "aₙ＝bₙ＋qrⁿ⁻¹ を移項後の式に入れると −2d＋qrⁿ⁻¹(3r²−8r＋5)＝−7 となる。q≠0、r≠0, 1 なので −2d＝−7、(r−1)(3r−5)＝0 より d＝7/2、r＝5/3 である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kisho-daigakko-2025-annual-gakka-sugaku-q13",
    "exam": "kisho-daigakko",
    "year": 2025,
    "season": "annual",
    "session": "gakka-sugaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "正四面体の高さと重心"
    ],
    "difficulty": 3,
    "question": "図のように、平行六面体 ABCD−EFGH において、四面体 ABDG は一辺の長さが1の正四面体となっている。平面 BDG と線分 CE の交点を P とするとき、線分 AP の長さはいくらか。",
    "choices": {
      "ア": "1/2",
      "イ": "√3/3",
      "ウ": "√6/3",
      "エ": "√3/2",
      "オ": "√2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "A を原点としてベクトル AB、AD、AG を使うと、C＝AB＋AD、E＝AG−AB−AD なので P＝(AB＋AD＋AG)/3 は面 BDG の重心である。正四面体の高さは √(1−(1/√3)²)＝√6/3 となる。",
    "choiceExplanations": {
      "ア": "CE 上の P は CE の中点ではなく、C から 1/3 進んだ点である。正四面体の高さは 1/2 より長い。",
      "イ": "√3/3 は正三角形 BDG の重心から頂点までの距離であり、A から P までの高さは √(1−1/3) である。",
      "ウ": "A を原点としてベクトル AB、AD、AG を使うと、C＝AB＋AD、E＝AG−AB−AD なので P＝(AB＋AD＋AG)/3 は面 BDG の重心である。正四面体の高さは √(1−(1/√3)²)＝√6/3 となる。",
      "エ": "√3/2 は一辺1の正三角形の高さである。求める線分は一辺1の正四面体の高さなので、底面の重心から頂点までの距離 1/√3 を使う。",
      "オ": "底面 BDG の重心 P から A までは一辺1より短い。辺 AB が直角三角形 ABP の斜辺となるためである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016403.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 気象大学校学生採用試験 学科試験」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kisho-daigakko/2025/gakka-sugaku/q13.webp"
    ],
    "imageAltTexts": [
      "四面体 ABDG を含む平行六面体 ABCD−EFGH"
    ]
  }
];
