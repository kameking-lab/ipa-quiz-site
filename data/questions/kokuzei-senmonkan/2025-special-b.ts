import type { Question } from "@/lib/questions/types";

export const KOKUZEI_2025_SPECIAL_B_QUESTIONS: Question[] = [
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q01",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "循環小数",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "x、yを相異なる0から9までのいずれかの整数とし、循環小数 C(x,y)＝0.xyxyxy… を考える。例えば C(2,3)＝0.232323…、2C(2,3)＝0.464646…である。このとき、99C(x,y)に関する記述として正しいのはどれか。",
    "choices": {
      "ア": "0である。",
      "イ": "正の整数である。",
      "ウ": "正の整数ではないが正の実数であり、循環小数である。",
      "エ": "正の整数ではないが正の実数であり、循環小数ではない。",
      "オ": "いずれでもない。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "100CからCを引くと、小数部分が相殺されて10x＋yが残る。x、yの少なくとも一方は0でないので、この値は正の整数である。",
    "choiceExplanations": {
      "ア": "99Cは10x＋yになる。x、yは相異なり、ともに0にはならないため、積は0より大きい。",
      "イ": "100CからCを引くと、小数部分が相殺されて10x＋yが残る。x、yの少なくとも一方は0でないので、この値は正の整数である。",
      "ウ": "100CとCは小数部分が一致する。差である99Cには小数部分が残らず、整数になる。",
      "エ": "C＝（10x＋y）/99である。99倍すれば分母が消え、正の整数になる。",
      "オ": "例えばx＝2、y＝3なら99C＝23になる。一般にも同様に10x＋yとなり、選択肢2の条件を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q02",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "二次不等式",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "xについての二次不等式 x²−2ax＋2a²−2a−3＞0 の解が全ての実数となるような定数aの値の範囲として正しいのはどれか。",
    "choices": {
      "ア": "a＜−1、3＜a",
      "イ": "a＜(1−√7)/2、(1＋√7)/2＜a",
      "ウ": "−3/4＜a＜2",
      "エ": "(1−√7)/2＜a＜(1＋√7)/2",
      "オ": "−1＜a＜3"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "平方完成すると (x−a)²＋a²−2a−3 になる。最小値 (a＋1)(a−3) が正なのは−1より小さいか3より大きいときである。",
    "choiceExplanations": {
      "ア": "平方完成すると (x−a)²＋a²−2a−3 になる。最小値 (a＋1)(a−3) が正なのは−1より小さいか3より大きいときである。",
      "イ": "最小値が0となる境界は a²−2a−3＝0 の二根−1と3である。この式の根は(1±√7)/2にはならない。",
      "ウ": "例えばa＝0はこの範囲に入るが、そのときx＝0で左辺は−3になる。",
      "エ": "a＝1ではx＝1のとき左辺は−4になる。全実数で正とするには二次式a²−2a−3が正でなければならない。",
      "オ": "−1と3の間では (a＋1)(a−3) が負になる。x＝aのとき不等式は成り立たない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q03",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "半加算器",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "X及びYは、それぞれ0又は1の値をとる論理変数である。表はXとYを加算する半加算器の真理値表で、Sは和の1桁目、Cは桁上げの数を表す。図のように二つの回路で半加算器を実現し、Bの論理式をX・Yとするとき、Aの論理式として正しいのはどれか。ここで、・は論理積、＋は論理和、¬は否定を表す。",
    "choices": {
      "ア": "(X・Y)＋(¬X・¬Y)",
      "イ": "(X＋¬Y)・(¬X＋Y)",
      "ウ": "(¬X・Y)＋(X・¬Y)",
      "エ": "¬X・¬Y",
      "オ": "¬(X＋Y)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "X＝0、Y＝1またはX＝1、Y＝0のときだけ1となる。他の二通りでは0となり、半加算器のSの列と一致する。",
    "choiceExplanations": {
      "ア": "XとYが等しいときに1を返す式である。半加算器のSは、二つの入力が異なるときだけ1になる。",
      "イ": "X＝Y＝0なら二つの括弧がともに1になり、出力も1である。真理値表のSはこのとき0である。",
      "ウ": "X＝0、Y＝1またはX＝1、Y＝0のときだけ1となる。他の二通りでは0となり、半加算器のSの列と一致する。",
      "エ": "この式はXもYも0のときだけ1になる。半加算器のSは両方が0なら0になる。",
      "オ": "論理和を否定すると、少なくとも一方が1なら0になる。例えばX＝0、Y＝1のとき、Sは1である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokuzei-senmonkan/2025/special-b/q03-1.webp",
      "/questions/kokuzei-senmonkan/2025/special-b/q03-2.webp"
    ],
    "imageAltTexts": [
      "半加算器の真理値表。入力が異なるときだけSが1で、両方の入力が1のときだけCが1になる。",
      "二つの入力XとYが回路AとBに入り、それぞれがSとCを出力する配線図。"
    ]
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q04",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "数列の桁数",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "数列 {aₙ} が a₁＝100、aₙ₊₁＝aₙ＋n/10（n＝1、2、3、…）を満たすとき、a₁₀₀₁の整数部分の桁数はいくらか。",
    "choices": {
      "ア": "4",
      "イ": "5",
      "ウ": "6",
      "エ": "7",
      "オ": "8"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "a₁₀₀₁＝100＋(1＋2＋…＋1,000)/10＝50,150である。1万以上10万未満なので5桁である。",
    "choiceExplanations": {
      "ア": "増分の合計は1から1,000までの和を10で割った50,050である。これだけで1万を超えるので、4桁ではない。",
      "イ": "a₁₀₀₁＝100＋(1＋2＋…＋1,000)/10＝50,150である。1万以上10万未満なので5桁である。",
      "ウ": "初項と1,000回分の増分を加えると50,150になる。6桁となる最小値100,000には届かない。",
      "エ": "等差的に増える項は増分n/10である。これを1,000項足しても50,050なので、7桁にはならない。",
      "オ": "漸化式は各項を掛け合わせる形ではなく、増分を足し上げる形である。整数部分は50,150である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q05",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "角の二等分線と面積",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "三角形ABCにおいて、AB＝4、AC＝2とする。∠BACの二等分線と辺BCの交点をDとする。AD＝BDとなるとき、三角形ABCの面積はいくらか。",
    "choices": {
      "ア": "√6",
      "イ": "2√2",
      "ウ": "2√3",
      "エ": "3√2",
      "オ": "2√6"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "DC＝tとするとBD＝2tで、角の二等分線の長さの関係からAD²＝8−2t²＝4t²となる。BC²＝12より∠BAC＝60°で、面積は4sin60°＝2√3である。",
    "choiceExplanations": {
      "ア": "角の二等分線からBD：DC＝2：1であり、AD＝BDから∠BACは60°に定まる。面積は4sin60°で、√6より大きい。",
      "イ": "余弦定理を使うとBC＝2√3に対して cos∠BAC＝1/2となる。sin∠BACは√2/2ではなく√3/2である。",
      "ウ": "DC＝tとするとBD＝2tで、角の二等分線の長さの関係からAD²＝8−2t²＝4t²となる。BC²＝12より∠BAC＝60°で、面積は4sin60°＝2√3である。",
      "エ": "長さ4と2の辺に挟まれた角で面積を求めると上限は4である。3√2は4より大きく、面積にはならない。",
      "オ": "面積は (4×2/2)sin∠BAC であり、sinは1を超えない。2√6は面積の上限4を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q06",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "ベクトルの内積",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "xy平面上の二つのベクトル OA＝(3,1) と OB＝(1,3) のなす角をθとする。このとき、cosθはいくらか。",
    "choices": {
      "ア": "1/2",
      "イ": "3/5",
      "ウ": "√2/2",
      "エ": "4/5",
      "オ": "√3/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二つのベクトルの内積は6で、長さはいずれも√10である。したがって cosθ＝6/10＝3/5 となる。",
    "choiceExplanations": {
      "ア": "成分ごとの積を合計すると3×1＋1×3＝6である。長さの積は10なので、比は1/2ではない。",
      "イ": "二つのベクトルの内積は6で、長さはいずれも√10である。したがって cosθ＝6/10＝3/5 となる。",
      "ウ": "√2/2は45°の余弦である。ここでは内積6を長さの積10で割り、0.6となる。",
      "エ": "長さの積が10なので、4/5なら内積は8となるはずである。実際の内積は6である。",
      "オ": "二つのベクトルの長さの積は10である。6を10で割った値は、30°の余弦である√3/2とは一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q07",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "対数関数の最小値",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "関数 y＝x logₑx の x＞0 における最小値はいくらか。ただし、eは自然対数の底とする。",
    "choices": {
      "ア": "0",
      "イ": "−1/e",
      "ウ": "−1",
      "エ": "−e logₑ2",
      "オ": "−e"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "導関数は logₑx＋1 で、x＝1/eを境に負から正へ変わる。その点の元の関数の値は−1/eである。",
    "choiceExplanations": {
      "ア": "x＝1では0であるが、0＜x＜1では logₑx が負である。例えばx＝1/eでは値が−1/eとなる。",
      "イ": "導関数は logₑx＋1 で、x＝1/eを境に負から正へ変わる。その点の元の関数の値は−1/eである。",
      "ウ": "最小点では logₑx＝−1 であるが、関数はxとの積である。x＝1/eを掛けると−1/eになる。",
      "エ": "最小点は導関数が0になるx＝1/eである。この点の対数は−1なので、logₑ2を含む数にはならない。",
      "オ": "導関数が0となるのはx＝eではなくx＝1/eである。logₑ(1/e)＝−1を掛けると−1/eが得られる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q08",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "三角関数の定積分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "−π/2からπ/2までの cos³θ の定積分の値はいくらか。",
    "choices": {
      "ア": "0",
      "イ": "1/8",
      "ウ": "1/2",
      "エ": "2/3",
      "オ": "4/3"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "偶関数なので、0からπ/2までの積分の2倍である。u＝sinθを代入すると2∫₀¹(1−u²)du＝4/3となる。",
    "choiceExplanations": {
      "ア": "cos³θはこの区間で非負であり、区間の内側では正である。奇関数のように正負の面積が打ち消し合うことはない。",
      "イ": "u＝sinθと置くと積分区間は−1から1になり、被積分関数は1−u²となる。0から1まででも2/3あり、1/8より大きい。",
      "ウ": "cos³θ＝cosθ(1−sin²θ)である。u＝sinθと置いて0から1まで積分した積分値は1−1/3＝2/3で、さらに2倍する。",
      "エ": "2/3は0からπ/2までの積分値である。cos³θは偶関数なので、負の側の区間の値も足す。",
      "オ": "偶関数なので、0からπ/2までの積分の2倍である。u＝sinθを代入すると2∫₀¹(1−u²)du＝4/3となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q09",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "三次関数の接線",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "3次関数 f(x)＝x³/3＋4x²＋6x＋8 に点P(5,−64)から引ける接線の本数はいくらか。",
    "choices": {
      "ア": "0本",
      "イ": "1本",
      "ウ": "2本",
      "エ": "3本",
      "オ": "4本"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "接点tに対し g(t)＝f(t)＋f′(t)(5−t) と置くと、g′(t)＝(2t＋8)(5−t)である。極小値g(−4)＝−190/3も−64より大きく、g(t)＝−64はt＞5で1回だけ成り立つ。",
    "choiceExplanations": {
      "ア": "接点をtとすると、接線のx＝5での値はtを変えると連続的に変化する。t＝5で−64より大きく、tを正の無限大へ近づけると−∞へ下がるので、少なくとも1本存在する。",
      "イ": "接点tに対し g(t)＝f(t)＋f′(t)(5−t) と置くと、g′(t)＝(2t＋8)(5−t)である。極小値g(−4)＝−190/3も−64より大きく、g(t)＝−64はt＞5で1回だけ成り立つ。",
      "ウ": "g(t)の極小値は−190/3で、求める高さ−64を下回らない。t≦5の範囲では条件を満たす接点が現れない。",
      "エ": "三次式でも、目標値が極小値と極大値の間にあれば3根となる。ここでは−64が極小値より小さいので1根にとどまる。",
      "オ": "接線条件は接点tについて三次方程式となるため、異なる解は最大3個である。この問題では区間ごとの増減から1個になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q10",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "曲線間の面積",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "xy平面において、曲線 y＝x³−x と直線 y＝x によって囲まれる図形の面積はいくらか。",
    "choices": {
      "ア": "0",
      "イ": "1/2",
      "ウ": "√2",
      "エ": "3/2",
      "オ": "2"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "交点はx＝−√2、0、√2である。正の半区間の面積は [x²−x⁴/4]₀^√2＝1で、原点対称な二領域を足すと2になる。",
    "choiceExplanations": {
      "ア": "正と負の区間を符号付きで積分すると相殺されるが、面積には各区間の絶対値を足す。二つの領域はいずれも正の面積を持つ。",
      "イ": "0から√2までの領域だけでも面積は1である。さらに−√2から0までの対称な領域がある。",
      "ウ": "√2は正の交点のx座標である。面積は高さの差2x−x³を積分して求め、交点の座標そのものにはならない。",
      "エ": "二つの領域は原点について対称である。片側の面積は1なので、合計は3/2より大きい。",
      "オ": "交点はx＝−√2、0、√2である。正の半区間の面積は [x²−x⁴/4]₀^√2＝1で、原点対称な二領域を足すと2になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q11",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "常用対数と桁数",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "6³⁰を10進法で表したときの桁数はいくらか。ただし、log₁₀2＝0.301、log₁₀3＝0.477とする。",
    "choices": {
      "ア": "10",
      "イ": "15",
      "ウ": "20",
      "エ": "24",
      "オ": "28"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "常用対数は30(0.301＋0.477)＝23.34である。数は10²³以上10²⁴未満なので、桁数は23＋1＝24である。",
    "choiceExplanations": {
      "ア": "30 log₁₀6＝30(0.301＋0.477)＝23.34であり、6³⁰は10⁹よりはるかに大きい。",
      "イ": "指数30をそのまま半分にすると桁数は求まらない。常用対数を取ると23.34になるため、15桁を超える。",
      "ウ": "6³⁰の常用対数は23.34である。20桁の整数は10²⁰未満だが、6³⁰は10²³を超える。",
      "エ": "常用対数は30(0.301＋0.477)＝23.34である。数は10²³以上10²⁴未満なので、桁数は23＋1＝24である。",
      "オ": "28桁となるのは常用対数が27以上28未満の場合である。ここでは23.34なので、その範囲には入らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q12",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "基礎数学",
    "topicTags": [
      "1の三乗根",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "3次方程式 z³＝1 の相異なる三つの複素数解のうち、1でないものの一つをωとする。このとき、ω⁵＋ω⁴＋ω³＋ω²＋ωと等しいものはどれか。",
    "choices": {
      "ア": "−1",
      "イ": "0",
      "ウ": "1",
      "エ": "ω",
      "オ": "ω²"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ω³＝1なので全体は1＋2(ω＋ω²)になる。ω²＋ω＋1＝0からω＋ω²＝−1で、答えは−1である。",
    "choiceExplanations": {
      "ア": "ω³＝1なので全体は1＋2(ω＋ω²)になる。ω²＋ω＋1＝0からω＋ω²＝−1で、答えは−1である。",
      "イ": "1＋ω＋ω²のまとまり一つは0であるが、全体にはさらにω＋ω²が残る。この残りは−1である。",
      "ウ": "ω³は1であるが、残りの四項の和は2(ω＋ω²)＝−2である。全体は1のままではない。",
      "エ": "次数を3で割った余りで整理すると、ωとω²が2項ずつ出る。ω＋ω²＝−1により全体は実数になる。",
      "オ": "ω²だけが残るのではなく、ω⁴＝ωとω⁵＝ω²も含めて整理する。実数−1になり、非実数のω²とは一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q17",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "基数変換",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "8進法で0.65と表される数を16進法で表したものとして正しいのはどれか。",
    "choices": {
      "ア": "0.C14",
      "イ": "0.C4",
      "ウ": "0.CE",
      "エ": "0.D4",
      "オ": "0.DE"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "8進法の6と5を2進法で表すと0.110101となる。4ビットずつに区切って0.1101 0100とすれば、16進法では0.D4である。",
    "choiceExplanations": {
      "ア": "16進法のCは2進法の1100に対応する。元の8進小数を変換した最初の4ビットは1101である。",
      "イ": "末尾の0100は合うが、最初の4ビット1101はCではなくDになる。",
      "ウ": "CEを2進法に戻すと1100 1110である。8進法の6と5を3ビットずつ並べた110 101とは一致しない。",
      "エ": "8進法の6と5を2進法で表すと0.110101となる。4ビットずつに区切って0.1101 0100とすれば、16進法では0.D4である。",
      "オ": "最初の1101はDでよいが、残ったビット01の後ろに0を補った0100はEではなく4である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q18",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "行列式",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "a、bを定数とし、4次正方行列Mの各行を (2,1,1,a)、(1,2,1,1)、(1,1,2,1)、(1,1,1,b) とする。このとき、Mの行列式が0となるようなa、bの値の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "a＝−2、b＝−1",
      "イ": "a＝−2、b＝6",
      "ウ": "a＝0、b＝0",
      "エ": "a＝1、b＝2",
      "オ": "a＝6、b＝2"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "第4行から上3行の和の1/4を引くと、第4行の先頭3成分が消えて、残りはb−(a＋2)/4となる。a＝6、b＝2なら第4行が零行となるので行列式は0である。",
    "choiceExplanations": {
      "ア": "行列式は4b−a−2となる。a＝−2ではb＝0が必要であり、b＝−1を入れると−4となる。",
      "イ": "行列の第4行から最初の3行の和の1/4倍を引くと、最後の成分はb−(a＋2)/4となる。この選択肢では6で、0にならない。",
      "ウ": "a＝0では最後の成分がb−1/2になる。b＝0を代入すると、行列式は−2である。",
      "エ": "a＝1のとき、行列式が0となる条件はb＝3/4である。b＝2では最後の成分が5/4となる。",
      "オ": "第4行から上3行の和の1/4を引くと、第4行の先頭3成分が消えて、残りはb−(a＋2)/4となる。a＝6、b＝2なら第4行が零行となるので行列式は0である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q19",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "行列のべき乗",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "行列Aの第1行を (2,0)、第2行を (1,3) とする。このとき、A²⁰²⁵−3A²⁰²⁴＋6A²⁰²³と等しいものはどれか。ただし、Oは零行列とする。",
    "choices": {
      "ア": "O",
      "イ": "A²⁰²³",
      "ウ": "2A²⁰²³",
      "エ": "A²⁰²⁴",
      "オ": "2A²⁰²⁴"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Aの特性多項式は(t−2)(t−3)なので、ケーリー・ハミルトンの定理よりA²−5A＋6I＝Oとなる。A²⁰²³(A²−3A＋6I)＝A²⁰²³・2A＝2A²⁰²⁴である。",
    "choiceExplanations": {
      "ア": "A²−5A＋6Iは零行列になるが、与式の係数は−3である。A²−3A＋6Iは2Aとなるため、与式は零行列ではない。",
      "イ": "A²⁰²³でくくった後に残る行列は単位行列ではなく2Aである。元の式はA²⁰²³だけにはならない。",
      "ウ": "係数2にはもう一つのAが伴う。2AをA²⁰²³に掛けるため、指数は2,024に増える。",
      "エ": "括弧の中はAではなく2Aになる。したがってA²⁰²⁴の2倍が必要である。",
      "オ": "Aの特性多項式は(t−2)(t−3)なので、ケーリー・ハミルトンの定理よりA²−5A＋6I＝Oとなる。A²⁰²³(A²−3A＋6I)＝A²⁰²³・2A＝2A²⁰²⁴である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q20",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "計算量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "n個の数値データ {xᵢ}（i＝1、2、…、n）に対して、平均を求める計算量のオーダは［ア］であり、分散を求める計算量のオーダは［イ］である。ア、イに当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "ア：O(n)、イ：O(n)",
      "イ": "ア：O(n)、イ：O(n²)",
      "ウ": "ア：O(n)、イ：O(n log n)",
      "エ": "ア：O(n²)、イ：O(n²)",
      "オ": "ア：O(n²)、イ：O(n log n)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "平均ではn個の値を1回ずつ足す。分散も平均を求めた後に各値の偏差の二乗を1回ずつ加えればよく、どちらも計算量はnに比例する。",
    "choiceExplanations": {
      "ア": "平均ではn個の値を1回ずつ足す。分散も平均を求めた後に各値の偏差の二乗を1回ずつ加えればよく、どちらも計算量はnに比例する。",
      "イ": "平均を求めた後は各値について一つの偏差だけを計算すればよい。全ての二つ組を比較する必要はない。",
      "ウ": "分散は値の順序に依存せず、並べ替えを要しない。和と二乗の和を逐次加えるだけで求められる。",
      "エ": "平均を出すには、順にn個の値を加えてnで割ればよい。分散も二回の走査で計算でき、二重反復は要らない。",
      "オ": "平均も分散も値を一つずつ読みながら集計できる。総当たりの比較もソートも不要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q21",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "情報セキュリティの用語",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "JIS Q 27000:2019（情報セキュリティマネジメントシステム―用語）における情報セキュリティの用語と定義の組合せのうち、最も妥当なのはどれか。",
    "choices": {
      "ア": "可用性：認可されたエンティティが要求したときに、アクセス及び使用が可能である特性。",
      "イ": "機密性：主張された事象又は処置の発生、及びそれらを引き起こしたエンティティを証明する能力。",
      "ウ": "真正性：意図する行動と結果とが一貫しているという特性。",
      "エ": "信頼性：エンティティは、それが主張するとおりのものであるという特性。",
      "オ": "否認防止：認可されていない個人、エンティティ又はプロセスに対して、情報を使用させず、また、開示しない特性。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "認可された利用者やシステムが、必要なときに情報やサービスを使えることを指す。これは可用性の定義に当たる。",
    "choiceExplanations": {
      "ア": "認可された利用者やシステムが、必要なときに情報やサービスを使えることを指す。これは可用性の定義に当たる。",
      "イ": "事象の発生や、その当事者を証明できる能力は否認防止である。機密性は認可されていない相手への開示や使用を防ぐことを指す。",
      "ウ": "意図する行動と結果が一貫する特性は信頼性である。真正性は、対象の身元や性質が主張どおりであることを指す。",
      "エ": "対象が主張どおりのものである特性は真正性である。信頼性の定義では、意図した動作と結果との一貫性を扱う。",
      "オ": "認可されていない相手に情報を開示しない特性は機密性である。否認防止には事象や行為の発生と当事者を証明する能力が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q22",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "ハミング符号",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "4ビットの情報 X₁、X₂、X₃、X₄ に3ビットの検査ビット P₃、P₂、P₁ を付加し、X₁X₂X₃P₃X₄P₂P₁ の順に並べる。検査ビットは、以下の式が成り立つように定める。\n\nX₁ ⊕ X₃ ⊕ X₄ ⊕ P₁＝0\nX₁ ⊕ X₂ ⊕ X₄ ⊕ P₂＝0\nX₁ ⊕ X₂ ⊕ X₃ ⊕ P₃＝0\n\n符号0110111に存在する1ビットの誤りを訂正した符号はどれか。ただし、⊕は排他的論理和を表す。",
    "choices": {
      "ア": "1110111",
      "イ": "0010111",
      "ウ": "0100111",
      "エ": "0111111",
      "オ": "0110011"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "元の符号では三つの検査式が順に1、1、0になる。第1式と第2式にだけ含まれるX₄、つまり第5ビットを1から0にすれば三式とも0になる。",
    "choiceExplanations": {
      "ア": "先頭のX₁は三つの検査式全てに含まれる。反転すると第1・第2式は0になるが、もとから0だった第3式が1になってしまう。",
      "イ": "第2ビットX₂を反転すると、第2式と第3式の値が変わる。第1式の1がそのまま残るため訂正できていない。",
      "ウ": "第3ビットX₃は第1式と第3式に含まれる。第2式にも誤りが出ているため、このビットの反転だけでは足りない。",
      "エ": "第4ビットP₃を変えると第3式だけが変わる。初めに1だった第1・第2式は1のままである。",
      "オ": "元の符号では三つの検査式が順に1、1、0になる。第1式と第2式にだけ含まれるX₄、つまり第5ビットを1から0にすれば三式とも0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q23",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "直列・並列の稼働率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように稼働率90％の装置R1と稼働率80％の装置R2を接続したシステムA、B、Cについて、システム全体の稼働率を高い順に並べたものはどれか。並列部分はどちらか一方、直列部分は両方の装置が稼働する必要があるものとする。",
    "choices": {
      "ア": "A＞B＞C",
      "イ": "A＞C＞B",
      "ウ": "B＞A＞C",
      "エ": "B＞C＞A",
      "オ": "C＞A＞B"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "Aは1−(1−0.8²)(1−0.9)＝0.964、Bは1−(1−0.9×0.8)(1−0.8)＝0.944となる。Cは(1−0.1×0.2)²＝0.9604なので、A、C、Bの順である。",
    "choiceExplanations": {
      "ア": "Bは1−(1−0.9×0.8)(1−0.8)＝0.944である。Cは0.98のブロック二つが直列になって0.9604なので、Cの方が高い。",
      "イ": "Aは1−(1−0.8²)(1−0.9)＝0.964、Bは1−(1−0.9×0.8)(1−0.8)＝0.944となる。Cは(1−0.1×0.2)²＝0.9604なので、A、C、Bの順である。",
      "ウ": "Aの片方の枝のR1は稼働率0.9である。並列全体ではAが0.964、Bが0.944で、BはAより低い。",
      "エ": "Bは0.72の枝と0.8の枝が並列で0.944となる。これはCの0.9604より低い。",
      "オ": "Cは各ブロックだけなら0.98だが、両ブロックが直列なので全体は0.9604である。Aの0.964を下回る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokuzei-senmonkan/2025/special-b/q23-1.webp"
    ],
    "imageAltTexts": [
      "装置R1とR2の直列・並列の接続の組み方が異なる三つのシステムA、B、Cの回路図。"
    ]
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q24",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "修正費用の期待値",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の条件を満たすアプリケーションプログラムについて、初年度の修正費用の期待値はいくらか。\n\n・プログラムの規模：3,000キロステップ\n・潜在不良の割合：0.04件/キロステップ\n・潜在不良の年間発見率：30％/年\n・発見された不良の分類：影響度大が20％、影響度小が80％\n・不良1件当たりの修正費用：影響度大が300万円、影響度小が100万円\n・修正対象：影響度大の不良のみ",
    "choices": {
      "ア": "720万円",
      "イ": "1,440万円",
      "ウ": "2,160万円",
      "エ": "2,880万円",
      "オ": "3,600万円"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "潜在不良は3,000×0.04＝120件で、初年度に見つかる影響度大は120×0.30×0.20＝7.2件である。これに300万円を掛けると2,160万円となる。",
    "choiceExplanations": {
      "ア": "7.2は修正する不良件数の期待値である。対象はいずれも影響度大なので、1件当たりの費用は100万円ではなく300万円である。",
      "イ": "3,000×0.04＝120件の潜在不良のうち、初年度に発見する影響度大は平均7.2件である。7.2件を300万円で修正するため、期待額は1,440万円を超える。",
      "ウ": "潜在不良は3,000×0.04＝120件で、初年度に見つかる影響度大は120×0.30×0.20＝7.2件である。これに300万円を掛けると2,160万円となる。",
      "エ": "影響度小の不良に相当する期待件数は36×0.80＝28.8件で、100万円を掛けると2,880万円になる。しかし、影響度小は修正対象に含まれない。",
      "オ": "3,600万円は発見する全36件に100万円を掛けた値である。発見した不良のうち、修正対象となる影響度大だけを抽出する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q25",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "回線利用率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "20 Mビット/秒の回線で接続された端末間で、平均1 Mバイト（オクテット）のファイルを20秒ごとに転送する。制御情報として転送データ量の20％が付加されるとき、回線利用率は何％か。ただし、1 Mビット＝10⁶ビットとする。",
    "choices": {
      "ア": "0.3％",
      "イ": "1.2％",
      "ウ": "2.4％",
      "エ": "4.8％",
      "オ": "7.2％"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "1回の転送量は8 Mビットに制御情報を足した9.6 Mビットである。20秒間に転送できる400 Mビットで割ると、回線利用率は2.4％となる。",
    "choiceExplanations": {
      "ア": "ファイルの1 Mバイトは8 Mビットに当たる。バイトをビットに換算せず計算すると、転送量を1/8に見積もってしまう。",
      "イ": "制御情報を含めた1回の転送量は9.6 Mビットである。20秒の回線容量は400 Mビットなので、比は0.012ではなく0.024になる。",
      "ウ": "1回の転送量は8 Mビットに制御情報を足した9.6 Mビットである。20秒間に転送できる400 Mビットで割ると、回線利用率は2.4％となる。",
      "エ": "4.8％は同じ量を10秒ごとに送った場合の利用率に相当する。実際の転送間隔は20秒で、利用率はその半分になる。",
      "オ": "20秒で送れる容量は400 Mビットである。1ファイルと制御情報の合計は9.6 Mビットなので、7.2％を占めることはない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q26",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "電子メールのセキュリティ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "S/MIME、SMTP-AUTH及びOP25Bに該当する説明をそれぞれ選んで列挙した組合せはどれか。記号は順不同とする。\n\nア　ISP管理下のIPアドレスから管理外のメールサーバへのSMTP通信を禁止し、ISPのメールサーバを介さない迷惑メールの送信を防ぐ。\nイ　通信の暗号化、デジタル証明書を利用した改ざんの検出、ノード認証を含む統合的なセキュリティの仕組みである。\nウ　送信元IPアドレスを送信側ドメインのDNSで確認し、正規のメールサーバから送られたかを検証する。\nエ　公開鍵暗号技術を使用し、認証、改ざん検出、暗号化などの機能をメールソフトに提供する。\nオ　送信メールサーバで、ユーザー名とパスワードなどを用いてユーザーを認証する。",
    "choices": {
      "ア": "ア、イ、オ",
      "イ": "ア、ウ、エ",
      "ウ": "ア、エ、オ",
      "エ": "イ、ウ、エ",
      "オ": "イ、ウ、オ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "OP25Bは外部メールサーバへの直接送信を制限するア、S/MIMEはメールの署名・暗号化を行うエである。SMTP-AUTHは送信サーバでユーザーを認証するオに当たる。",
    "choiceExplanations": {
      "ア": "アはOP25B、オはSMTP-AUTHに当たる。イは通信路を保護する仕組みの説明で、メールそのものを暗号化・署名するS/MIMEはエである。",
      "イ": "ウは送信側ドメインのDNS情報で送信元を検証する仕組みである。SMTP-AUTHはメールサーバに接続する利用者を認証するオに当たる。",
      "ウ": "OP25Bは外部メールサーバへの直接送信を制限するア、S/MIMEはメールの署名・暗号化を行うエである。SMTP-AUTHは送信サーバでユーザーを認証するオに当たる。",
      "エ": "エはS/MIMEであるが、ウは送信元ドメインを検証する仕組みでありSMTP-AUTHではない。外部宛てSMTPを制限するOP25Bはアである。",
      "オ": "オはSMTP-AUTHである。S/MIMEはメールソフトに暗号化や署名を提供するエ、OP25Bは直接の送信を制限するアなので、どちらも抜けている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q27",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "統計学",
    "topicTags": [
      "相関係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある小学校の4人の生徒A、B、C、Dが国語と算数のテストを受けた。A、B、C、Dの国語の得点は順に60、76、92、76、算数の得点は順に40、48、48、56だった。国語と算数の得点の相関係数として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.5",
      "イ": "0.55",
      "ウ": "0.6",
      "エ": "0.65",
      "オ": "0.7"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "平均との差の積の和は128、二乗和は国語512、算数128になる。相関係数は128/√(512×128)＝0.5である。",
    "choiceExplanations": {
      "ア": "平均との差の積の和は128、二乗和は国語512、算数128になる。相関係数は128/√(512×128)＝0.5である。",
      "イ": "両科目とも平均との差が0でない組のうち、積に寄与するのはAの (−16)×(−8) だけである。分子は128、分母は256なので0.55にはならない。",
      "ウ": "相関係数は平均との差の積を足し、二つの偏差平方和の積の平方根で割る。ここでは128/256なので0.6より小さい。",
      "エ": "算数の偏差は−8、0、0、8で、二乗和は128である。国語の二乗和512と合わせて分母は256になり、相関係数は0.5となる。",
      "オ": "国語の平均76、算数の平均48を引いた偏差から計算する。分子128は分母256の半分であり、0.7には達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q28",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "統計学",
    "topicTags": [
      "条件付き確率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "表が出る確率が51/100であるコインを10回投げたところ、9回表が出た。9回表が出たことが分かっているとき、9回連続で表が出た条件付き確率として最も妥当なのはどれか。",
    "choices": {
      "ア": "1/10",
      "イ": "1/5",
      "ウ": "1/3",
      "エ": "2/5",
      "オ": "4/9"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "表が9回、裏が1回という並びは、裏の位置によらず同じ確率である。裏が端に来る2通りだけが連続条件を満たすため、条件付き確率は2/10＝1/5である。",
    "choiceExplanations": {
      "ア": "裏が出る場所は10通りあり、そのうち最初に裏が出る場合と最後に裏が出る場合の両方が条件を満たす。1通りだけを数えると不足する。",
      "イ": "表が9回、裏が1回という並びは、裏の位置によらず同じ確率である。裏が端に来る2通りだけが連続条件を満たすため、条件付き確率は2/10＝1/5である。",
      "ウ": "裏の位置は最初から最後までの10通りである。どの位置を選んだ並びも表9回・裏1回の同じ積を持つので、分母は3にはならない。",
      "エ": "9回の表が連続するのは裏が第1回または第10回の場合である。条件付き標本空間は全部で10通りなので、2を5ではなく10で割る。",
      "オ": "表9回という情報の下で区別するのは、表の数ではなく裏1回の位置である。等確率な10通り中で成功は2通りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q29",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "統計学",
    "topicTags": [
      "期待値の加法性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "1から6までの数字のいずれかが各面に書かれたサイコロを3回投げる。各回に出た数字の和の期待値として最も妥当なのはどれか。",
    "choices": {
      "ア": "7/2",
      "イ": "7",
      "ウ": "21/2",
      "エ": "49/4",
      "オ": "14"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "1回当たりの期待値は (1＋2＋3＋4＋5＋6)/6＝7/2 である。期待値の加法性から、3回の和は3×7/2＝21/2となる。",
    "choiceExplanations": {
      "ア": "7/2は1回の期待値である。3回の目の和を問うため、各回の期待値を合わせる。",
      "イ": "1回の期待値は3.5なので、7は2回分の期待値に当たる。実際は3回投げる。",
      "ウ": "1回当たりの期待値は (1＋2＋3＋4＋5＋6)/6＝7/2 である。期待値の加法性から、3回の和は3×7/2＝21/2となる。",
      "エ": "49/4は7/2を二乗した値である。目の和では期待値を掛け合わせず、3回分を足す。",
      "オ": "14は平均3.5を4回分足した値である。3回では3×3.5＝10.5となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q30",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "統計学",
    "topicTags": [
      "余事象",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "1から6までの数字のいずれかが各面に書かれたサイコロを繰り返し投げ、6の目が少なくとも1回出る確率を80％以上にしたい。必要な試行回数の最小値はいくつか。ただし、log₁₀2＝0.30、log₁₀3＝0.48、log₁₀5＝0.70とする。",
    "choices": {
      "ア": "5",
      "イ": "6",
      "ウ": "7",
      "エ": "8",
      "オ": "9"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "n回全てで6が出ない確率は (5/6)ⁿ である。n＝8では約0.233で0.2を上回り、n＝9では約0.194で下回るため、最小は9回である。",
    "choiceExplanations": {
      "ア": "5回全てで6が出ない確率は (5/6)⁵ で約0.402である。少なくとも1回出る確率は約0.598で、80％には届かない。",
      "イ": "試行回数が6であっても、6の目が必ず出るわけではない。少なくとも1回出る確率は1−(5/6)⁶で、約0.665である。",
      "ウ": "7回全てで6以外になる確率は約0.279である。残りの約0.721だけが6を含むため、80％未満である。",
      "エ": "8回で6が1回以上出る確率は約0.767である。外れ続ける確率が0.2より大きいので、さらに投げる必要がある。",
      "オ": "n回全てで6が出ない確率は (5/6)ⁿ である。n＝8では約0.233で0.2を上回り、n＝9では約0.194で下回るため、最小は9回である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q31",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "統計学",
    "topicTags": [
      "信頼区間の幅",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある地域の各世帯の年間医療費は、平均μ円、標準偏差7,500円の正規分布に従う。無作為に世帯を抽出し、年間医療費の平均μについて95％信頼区間の幅を500円以下にするには、最低何世帯が必要か。標準正規分布の上側5％点は1.64、上側2.5％点は1.96とする。",
    "choices": {
      "ア": "606",
      "イ": "865",
      "ウ": "2,421",
      "エ": "3,458",
      "オ": "4,832"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "95％信頼区間の幅は 2×1.96×7,500/√n である。500以下にするにはn≧3,457.44が必要なので、整数の最小値は3,458になる。",
    "choiceExplanations": {
      "ア": "606世帯では 2×1.96×7,500/√606 が約1,194円になる。幅は500円を大きく上回る。",
      "イ": "865世帯は半幅を約500円にする程度である。問題の500円は両側を合わせた幅の上限なので、半幅は250円以下にする。",
      "ウ": "1.64は上側5％点であり、この値を使うと両側95％にはならない。両端に2.5％ずつ残すため、係数は1.96である。",
      "エ": "95％信頼区間の幅は 2×1.96×7,500/√n である。500以下にするにはn≧3,457.44が必要なので、整数の最小値は3,458になる。",
      "オ": "4,832世帯でも幅は500円より小さくなるが、最小値ではない。条件式の下限3,457.44を切り上げた3,458世帯で足りる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q32",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "統計学",
    "topicTags": [
      "片側t検定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "1袋120 gとして売られているスナック菓子を無作為に9袋選んだ結果、標本平均は119 g、不偏標本分散は1.6²であった。重量は正規分布に従うとし、帰無仮説 H₀：μ＝120、対立仮説 H₁：μ＜120 を有意水準5％で検定する。t値と帰無仮説の判定の妥当な組合せはどれか。\n\n自由度8のt分布の上側5％点は1.860、上側2.5％点は2.306である。自由度9の上側5％点は1.833、上側2.5％点は2.262である。",
    "choices": {
      "ア": "−2.348、棄却される",
      "イ": "−2.348、棄却されない",
      "ウ": "−1.875、棄却される",
      "エ": "−1.875、棄却されない",
      "オ": "−1.684、棄却される"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "t＝(119−120)/(1.6/√9)＝−1.875である。自由度8の下側5％点−1.860より小さいので、帰無仮説は棄却される。",
    "choiceExplanations": {
      "ア": "判定は棄却であるが、標準誤差は1.6/√9である。平均の差−1をこの標準誤差で割ると−1.875になる。",
      "イ": "標本平均を標準化したt値は−1.875である。対立仮説が小さい側にある片側検定で、自由度8の下側5％点−1.860より小さいため棄却される。",
      "ウ": "t＝(119−120)/(1.6/√9)＝−1.875である。自由度8の下側5％点−1.860より小さいので、帰無仮説は棄却される。",
      "エ": "t値は合うが、対立仮説はμ＜120なので比較すべきなのは下側5％点である。−1.875は−1.860より小さく、棄却域に入る。",
      "オ": "1.6は標本標準偏差であり、9袋の平均の標準誤差は1.6/3になる。これを用いたt値は−1.875である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q33",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "摩擦と等加速度運動",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "傾斜角θの粗い斜面上を、物体が初速0で滑り落ちた。斜面上を距離Lだけ滑り落ちた瞬間の速さとして最も妥当なものはどれか。重力加速度の大きさをg、動摩擦係数をμとする。",
    "choices": {
      "ア": "√[2gL(sinθ−μcosθ)]",
      "イ": "√[2gL(sinθ＋μcosθ)]",
      "ウ": "√[2gL(cosθ−μsinθ)]",
      "エ": "2gL(sinθ−μcosθ)",
      "オ": "2gL(cosθ−μsinθ)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "斜面に沿う加速度は、重力の成分g sinθから摩擦の成分μg cosθを引いたものである。初速0なので v²＝2gL(sinθ−μcosθ) となる。",
    "choiceExplanations": {
      "ア": "斜面に沿う加速度は、重力の成分g sinθから摩擦の成分μg cosθを引いたものである。初速0なので v²＝2gL(sinθ−μcosθ) となる。",
      "イ": "動摩擦力は斜面を滑り落ちる向きに逆らう。加速度を求めるときに摩擦の項を足すのではなく引く。",
      "ウ": "斜面に沿う重力成分はmg sinθであり、垂直抗力はmg cosθである。この式はそれぞれの三角関数が逆になっている。",
      "エ": "これは速度の二乗 v² の式である。求めるのは速さなので、正の平方根を取る。",
      "オ": "斜面に沿う成分にはsinθ、斜面に垂直な成分にはcosθを用いる。2倍の加速度と距離の積は速度の二乗になるため、さらに平方根が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokuzei-senmonkan/2025/special-b/q33-1.webp"
    ],
    "imageAltTexts": [
      "傾斜角θの斜面に沿って物体が距離Lだけ下へ移動した図。"
    ]
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q34",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "鉛直面の円運動",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "糸の一端が支点Oで固定され、もう一端に小球が付いている。最下点に静止している小球に水平な初速度を与えると、初速度の大きさがある値v₀を超えたとき、糸がたるまず円運動を続けた。糸の長さをL、重力加速度をgとするとき、v₀として最も妥当なのはどれか。",
    "choices": {
      "ア": "√(2gL)",
      "イ": "√(3gL)",
      "ウ": "2√(gL)",
      "エ": "√(5gL)",
      "オ": "√(6gL)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最上点で張力が0となる限界は、重力だけが向心力を与える v²＝gL のときである。最下点からの高さ差2Lをエネルギー保存に入れると v₀²＝gL＋4gL＝5gL となる。",
    "choiceExplanations": {
      "ア": "この速さでは初めの運動エネルギーがmgLであり、最上点まで重力による位置エネルギーを2mgL増やすこともできない。",
      "イ": "最下点から最上点までは高さが2L上がるため、速さの二乗は4gL減る。初速が√(3gL)では最上点まで達しない。",
      "ウ": "この初速では力学的エネルギーの式から、最上点で速さが0になる。糸がたるまないためには、最上点でも速さが√(gL)以上必要である。",
      "エ": "最上点で張力が0となる限界は、重力だけが向心力を与える v²＝gL のときである。最下点からの高さ差2Lをエネルギー保存に入れると v₀²＝gL＋4gL＝5gL となる。",
      "オ": "この初速なら最上点の速さの二乗は2gLであり、糸にまだ張力がある。限界では最上点の張力が0になるので、そこまで大きい初速は不要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokuzei-senmonkan/2025/special-b/q34-1.webp"
    ],
    "imageAltTexts": [
      "支点Oに長さLの糸でつられた小球が、最下点から水平方向へ初速度を得て円を描く図。"
    ]
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q35",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "ばねと弾性衝突",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "壁に固定されたばねの端に質量mの小球Aを取り付け、右に質量2mの小球Bを置く。ばねが自然長のときの小球間の距離はdである。Aを自然長の位置からばねが縮む向きに距離s（s＞d）だけ動かして放すと、AがBに弾性衝突した。衝突直後のBの速さとして最も妥当なのはどれか。床は滑らかな水平面で、ばね定数はkとする。",
    "choices": {
      "ア": "(1/2)√[k(s²＋d²)/m]",
      "イ": "(1/2)√[k(s²−d²)/m]",
      "ウ": "(2/3)√[k(s²−d²)/m]",
      "エ": "√[k(s²−d²)/m]",
      "オ": "(4/3)√[k(s²−d²)/m]"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ばねのエネルギー差から、Aの速さは√[k(s²−d²)/m]となる。質量mと2mの弾性衝突では、静止していたBの速さはAの衝突直前の速さの2/3になる。",
    "choiceExplanations": {
      "ア": "衝突時にもばねは自然長からdだけ伸びており、弾性エネルギーが残る。運動エネルギーへ移る分は、二乗の和ではなく差に比例する。",
      "イ": "衝突前のAの速さは平方根の部分である。運動量と運動エネルギーを保存する弾性衝突の式では、Bの速さはこの1/2ではなく2/3になる。",
      "ウ": "ばねのエネルギー差から、Aの速さは√[k(s²−d²)/m]となる。質量mと2mの弾性衝突では、静止していたBの速さはAの衝突直前の速さの2/3になる。",
      "エ": "これはAが衝突する直前の速さである。質量2mのBが受け取る速さは、弾性衝突の関係からその2/3である。",
      "オ": "静止しているBの衝突後の速さの係数は、入射するAの質量を用いて2m/(m＋2m)となる。Bの質量2mを分子に入れると係数を2倍にしてしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokuzei-senmonkan/2025/special-b/q35-1.webp"
    ],
    "imageAltTexts": [
      "ばねが自然長のときの小球の位置と、ばねをsだけ縮めて小球Aを放す前の位置の図。"
    ]
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q36",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "浮力と密度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "体積の等しい二つの球A、Bを糸でつないで水に入れると、図のようにAのちょうど半分が水面から上に出て、糸がたるまずに浮かんだ。水の密度をρ、Aの密度をρ/10とするとき、Bの密度として最も妥当なのはどれか。",
    "choices": {
      "ア": "(2/5)ρ",
      "イ": "(4/3)ρ",
      "ウ": "(7/5)ρ",
      "エ": "(3/2)ρ",
      "オ": "2ρ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各球の体積をVとすると、沈んでいる合計体積はV/2＋Vである。重力と浮力のつり合いより (ρ/10＋ρ_B)Vg＝1.5ρVg なので、ρ_B＝7ρ/5である。",
    "choiceExplanations": {
      "ア": "Aが受ける浮力とAの重力の差が、糸の張力 (ρ/2−ρ/10)Vg＝(2/5)ρVg である。Bには糸の張力と水の浮力の両方が上向きに働く。",
      "イ": "二球の重力の合計は、沈んだ体積1.5Vに働く浮力と等しい。Aの密度ρ/10を差し引くと、4ρ/3ではなく1.4ρになる。",
      "ウ": "各球の体積をVとすると、沈んでいる合計体積はV/2＋Vである。重力と浮力のつり合いより (ρ/10＋ρ_B)Vg＝1.5ρVg なので、ρ_B＝7ρ/5である。",
      "エ": "1.5ρは二球の密度の和である。Bだけの密度を求めるには、これからAのρ/10を引く。",
      "オ": "2ρは二つの球が全て沈んだときの浮力に相当する。Aは半分だけ水中にあるため、二球の密度の和が2ρにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokuzei-senmonkan/2025/special-b/q36-1.webp"
    ],
    "imageAltTexts": [
      "球Aの上半分は水面より上、下半分は水中にある。球Bは全面が水中にあり、二球は鉛直の糸でつながっている。"
    ]
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q37",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "人工衛星の軌道エネルギー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "人工衛星が地球を中心とする半径rの円軌道を一定の速さvで回る。衛星の質量をm、地球の半径をR、地球の質量をM、万有引力定数をGとする。衛星の位置エネルギー、運動エネルギー、力学的エネルギーと軌道半径rとの関係を表すグラフとして最も妥当なのはどれか。位置エネルギーは無限遠で0とする。",
    "choices": {
      "ア": "図1",
      "イ": "図2",
      "ウ": "図3",
      "エ": "図4",
      "オ": "図5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "円運動の条件 mv²/r＝GMm/r² から、運動エネルギーは GMm/(2r) となる。位置エネルギーは −GMm/r、両者の和は −GMm/(2r) なので、図5の順と符号に一致する。",
    "choiceExplanations": {
      "ア": "円軌道では運動エネルギーは正だが、その大きさは負の位置エネルギーの半分しかない。合計の力学的エネルギーは、図1のように正にはならない。",
      "イ": "運動エネルギー GMm/(2r) と位置エネルギー −GMm/r は大きさが異なる。和である力学的エネルギーがずっと0になることはない。",
      "ウ": "位置エネルギーは −GMm/r であり、有限のrでは負である。図3のように位置エネルギーを正の側に置くのは誤りである。",
      "エ": "力学的エネルギーは運動エネルギーに負の位置エネルギーを足した値である。したがって図4と異なり、運動エネルギーより小さくなる。",
      "オ": "円運動の条件 mv²/r＝GMm/r² から、運動エネルギーは GMm/(2r) となる。位置エネルギーは −GMm/r、両者の和は −GMm/(2r) なので、図5の順と符号に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokuzei-senmonkan/2025/special-b/q37-1.webp",
      "/questions/kokuzei-senmonkan/2025/special-b/q37-2.webp"
    ],
    "imageAltTexts": [
      "地球の中心から距離rの円軌道に、質量mの人工衛星がある。衛星の速さvの方向は円軌道の接線方向。",
      "横軸を軌道半径、縦軸をエネルギーとして、位置、運動、力学的エネルギーの関係を示す五つの選択肢。"
    ]
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q38",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "放射性崩壊と保存則",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ウラン238（原子番号92）がα崩壊とβ崩壊を繰り返して、タリウム206（原子番号81）になった。このとき起きたα崩壊とβ崩壊の回数の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "α崩壊4回、β崩壊8回",
      "イ": "α崩壊8回、β崩壊5回",
      "ウ": "α崩壊8回、β崩壊6回",
      "エ": "α崩壊16回、β崩壊11回",
      "オ": "α崩壊32回、β崩壊11回"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "質量数の差32は、質量数が4ずつ減るα崩壊8回で生じる。原子番号はα崩壊で92−16＝76となり、β⁻崩壊5回で81になる。",
    "choiceExplanations": {
      "ア": "α崩壊4回で減る質量数は4×4＝16である。質量数238から206へ移るには32減る必要がある。",
      "イ": "質量数の差32は、質量数が4ずつ減るα崩壊8回で生じる。原子番号はα崩壊で92−16＝76となり、β⁻崩壊5回で81になる。",
      "ウ": "α崩壊8回の後の原子番号は76である。β⁻崩壊が6回なら82となり、原子番号81を一つ超える。",
      "エ": "α崩壊16回では質量数が64減って174になる。β崩壊で質量数は変化しないので206にはならない。",
      "オ": "32は減少した質量数であり、α崩壊の回数ではない。α崩壊1回で質量数は4減るので、回数は32/4である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q39",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "比熱と潜熱",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "−20 ℃の氷を全て100 ℃の水蒸気にするためには620,400 Jが必要である。このときの氷の質量として最も妥当なのはどれか。熱は外へ逃げず、氷の融解熱を340 J/g、水の蒸発熱を2,300 J/g、氷の比熱を2.1 J/(g・K)、水の比熱を4.2 J/(g・K)とする。融解は0 ℃、蒸発は100 ℃で起こる。",
    "choices": {
      "ア": "50 g",
      "イ": "100 g",
      "ウ": "150 g",
      "エ": "200 g",
      "オ": "300 g"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "1 g当たりの熱は2.1×20＋340＋4.2×100＋2,300＝3,102 Jである。620,400を3,102で割ると、質量は200 gになる。",
    "choiceExplanations": {
      "ア": "1 g当たり必要なのは、昇温と相変化を合わせて3,102 Jである。50 gでは155,100 Jしか必要にならない。",
      "イ": "0 ℃まで温める分や水を昇温させる分も含めると、100 gで310,200 Jを要する。与えられた熱量はその2倍である。",
      "ウ": "150 gでは必要熱量は3,102×150＝465,300 Jで、620,400 Jに達しない。",
      "エ": "1 g当たりの熱は2.1×20＋340＋4.2×100＋2,300＝3,102 Jである。620,400を3,102で割ると、質量は200 gになる。",
      "オ": "蒸発熱だけでも300×2,300＝690,000 Jになる。昇温や融解を加えるまでもなく、与えられた熱量を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q40",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "物理",
    "topicTags": [
      "うなりと振動数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "振動数がそれぞれ330 Hzと335 Hzの二つの音源A、Bがある。別の音源CをAと同時に鳴らすとうなりが毎秒3回、Bと同時に鳴らすとうなりが毎秒2回生じた。Cの振動数はどれか。",
    "choices": {
      "ア": "327 Hz",
      "イ": "333 Hz",
      "ウ": "335 Hz",
      "エ": "337 Hz",
      "オ": "340 Hz"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "うなりの振動数は二つの音の振動数の差の絶対値である。333 Hzなら330 Hzと3 Hz差、335 Hzと2 Hz差になり、両方の条件を満たす。",
    "choiceExplanations": {
      "ア": "327 Hzは330 Hzとの差が3 Hzだが、335 Hzとの差は8 Hzになる。Bとのうなりが毎秒2回という条件を満たさない。",
      "イ": "うなりの振動数は二つの音の振動数の差の絶対値である。333 Hzなら330 Hzと3 Hz差、335 Hzと2 Hz差になり、両方の条件を満たす。",
      "ウ": "335 HzはBと同じ振動数なので、振動数の差によるうなりは生じない。",
      "エ": "337 HzはBとの差が2 Hzであるが、Aとの差は7 Hzになる。Aと鳴らしたときに毎秒3回という条件に合わない。",
      "オ": "340 HzはAともBとも大きく離れている。Aとの差は10 Hz、Bとの差は5 Hzになり、どちらのうなりにも一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q41",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "化学",
    "topicTags": [
      "酸化と還元",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "酸化還元反応に関するA～Dの記述のうち、妥当なもののみを挙げているのはどれか。\n\nA　過マンガン酸カリウム KMnO₄ は代表的な還元剤である。\nB　水素が関与する反応において、物質が水素を失う変化を酸化という。\nC　二酸化硫黄 SO₂ は、硫化水素 H₂S に対しては還元剤として働く。\nD　窒素分子 N₂ 中の窒素原子の酸化数はゼロである。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "水素を失う変化は酸化に当たる。また窒素分子は単体なので、その構成原子の酸化数は0である。",
    "choiceExplanations": {
      "ア": "Bは正しいが、過マンガン酸カリウムは相手を酸化する代表的な酸化剤である。Aが誤りなのでこの組合せは成立しない。",
      "イ": "過マンガン酸カリウムは酸化剤である。二酸化硫黄は硫化水素を酸化して硫黄にするため、この反応では二酸化硫黄も酸化剤として働く。",
      "ウ": "物質が水素を失う反応は酸化なのでBは正しい。硫化水素との反応では二酸化硫黄中の硫黄の酸化数が＋4から0へ下がるため、Cは誤りである。",
      "エ": "水素を失う変化は酸化に当たる。また窒素分子は単体なので、その構成原子の酸化数は0である。",
      "オ": "単体の窒素の酸化数は0なのでDは正しい。一方、二酸化硫黄が硫化水素に対して働くときは酸化剤となるため、Cは誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q42",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "化学",
    "topicTags": [
      "中和滴定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "濃度不明の食酢6.00 mLを0.100 mol/Lの水酸化ナトリウム水溶液で中和滴定すると、50.0 mLを要した。食酢6.00 mLに含まれる酢酸の質量はどれか。ただし、酢酸 CH₃COOH の分子量は60.0とする。",
    "choices": {
      "ア": "1.50×10² mg",
      "イ": "3.00×10² mg",
      "ウ": "3.60×10² mg",
      "エ": "1.50×10³ mg",
      "オ": "3.00×10³ mg"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "水酸化ナトリウムは0.100×0.0500＝0.00500 molであり、酢酸も同じ物質量である。酢酸の質量は0.00500×60.0＝0.300 g＝300 mgになる。",
    "choiceExplanations": {
      "ア": "酢酸と水酸化ナトリウムの反応比は1：1である。水酸化ナトリウムが0.00500 molなので、酢酸がその半分の0.00250 molになることはない。",
      "イ": "水酸化ナトリウムは0.100×0.0500＝0.00500 molであり、酢酸も同じ物質量である。酢酸の質量は0.00500×60.0＝0.300 g＝300 mgになる。",
      "ウ": "滴定で求めるのは食酢6.00 mLに入っている酢酸の全物質量である。反応した0.00500 molに60.0を掛けると360 mgではなく300 mgになる。",
      "エ": "1.50 gの酢酸は0.0250 molに当たる。使用した塩基0.00500 molの5倍なので、1：1で中和できない。",
      "オ": "3.00 gなら酢酸の物質量は0.0500 molである。50.0 mLは0.0500 Lであり、濃度0.100 mol/Lを掛けた0.00500 molが実際の量である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q43",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "化学",
    "topicTags": [
      "有機化合物の性質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "有機反応に関するA～Dの記述のうち、妥当なもののみを挙げているのはどれか。\n\nA　酢酸はヨードホルム反応を示す。\nB　炭素、水素、酸素のみから成る有機化合物の元素分析において、試料を完全燃焼させて発生した二酸化炭素を吸収するソーダ石灰管は、水を吸収する塩化カルシウム管の後に置く。\nC　エタノールは金属ナトリウムと反応して水素を発生させる。\nD　マルトースとラクトースは非還元糖だが、スクロースは還元糖なのでスクロース水溶液は銀鏡反応を示す。",
    "choices": {
      "ア": "A、B",
      "イ": "A、C",
      "ウ": "B、C",
      "エ": "B、D",
      "オ": "C、D"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "元素分析では塩化カルシウム管で水を除いてからソーダ石灰管で二酸化炭素を吸収する。エタノールのヒドロキシ基はナトリウムと反応し、アルコキシドと水素を生じる。",
    "choiceExplanations": {
      "ア": "Bの順序なら先に水を取り除ける。酢酸はヨードホルム反応を示さないため、Aは含められない。",
      "イ": "Cは正しいが、カルボン酸である酢酸はこの反応の対象にならない。ヨードホルム反応を示す代表的な構造にはメチルケトンがある。",
      "ウ": "元素分析では塩化カルシウム管で水を除いてからソーダ石灰管で二酸化炭素を吸収する。エタノールのヒドロキシ基はナトリウムと反応し、アルコキシドと水素を生じる。",
      "エ": "Bは正しいが、マルトースとラクトースは還元糖である。スクロースは非還元糖で、加水分解していない水溶液は銀鏡反応を示さない。",
      "オ": "エタノールの反応についてのCは正しい。Dはマルトース・ラクトースとスクロースの還元性を逆に述べている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q44",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "化学",
    "topicTags": [
      "完全燃焼と物質量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "フェノールを完全燃焼させたところ、二酸化炭素79.2 mg、水16.2 mgを得た。燃焼前のフェノールの質量はおよそいくらか。原子量をH＝1.00、C＝12.0、O＝16.0とする。",
    "choices": {
      "ア": "18.8 mg",
      "イ": "23.4 mg",
      "ウ": "28.2 mg",
      "エ": "46.2 mg",
      "オ": "56.4 mg"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "フェノール C₆H₆O 1 molは、完全燃焼で二酸化炭素6 molと水3 molを生じる。79.2 mgの二酸化炭素は1.80 mmolなので、フェノール0.300 mmolに94 mg/mmolを掛けると28.2 mgになる。",
    "choiceExplanations": {
      "ア": "フェノールのモル質量は94 g/molであり、18.8 mgは0.200 mmolに当たる。この量から生じる二酸化炭素は6倍の1.20 mmolで、実際より少ない。",
      "イ": "二酸化炭素79.2 mgは1.80 mmolである。フェノールの量はその1/6の0.300 mmolであり、質量23.4 mgに相当する量より多い。",
      "ウ": "フェノール C₆H₆O 1 molは、完全燃焼で二酸化炭素6 molと水3 molを生じる。79.2 mgの二酸化炭素は1.80 mmolなので、フェノール0.300 mmolに94 mg/mmolを掛けると28.2 mgになる。",
      "エ": "水の量は16.2/18.0＝0.900 mmolである。フェノール1 molにつき水3 molを生じるため、フェノールは0.300 mmol、28.2 mgとなる。",
      "オ": "56.4 mgはフェノール0.600 mmolに当たり、燃やすと二酸化炭素を3.60 mmol生じる。観測された1.80 mmolの2倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q45",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "化学",
    "topicTags": [
      "炭素の同素体と一酸化炭素",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の記述の空欄①～③に当てはまる語の組合せはどれか。\n\nダイヤモンドと黒鉛（グラファイト）は互いに［①］である。一酸化炭素は工業的にコークスと水蒸気からつくられて［②］に利用される。有毒な無色無臭の気体で、中毒事故の原因となることがある。実験室での調製では［③］の脱水で得られる。",
    "choices": {
      "ア": "①同素体、②製鉄、③ギ酸",
      "イ": "①同素体、②製鉄、③酢酸",
      "ウ": "①同素体、②原子力発電、③ギ酸",
      "エ": "①同位体、②製鉄、③ギ酸",
      "オ": "①同位体、②原子力発電、③酢酸"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "同じ炭素元素の異なる構造をとるダイヤモンドと黒鉛は同素体である。一酸化炭素は製鉄で鉄鉱石を還元し、ギ酸の脱水でも生じる。",
    "choiceExplanations": {
      "ア": "同じ炭素元素の異なる構造をとるダイヤモンドと黒鉛は同素体である。一酸化炭素は製鉄で鉄鉱石を還元し、ギ酸の脱水でも生じる。",
      "イ": "炭素の同素体と製鉄での利用は合う。脱水により一酸化炭素を生じるのは酢酸ではなくギ酸である。",
      "ウ": "ダイヤモンドと黒鉛は同素体で、ギ酸の脱水では一酸化炭素を生じる。一酸化炭素を還元剤として使う用途は製鉄である。",
      "エ": "原子核の中性子数が異なる同一元素の原子を同位体と呼ぶ。ダイヤモンドと黒鉛の違いは炭素原子の結び付き方にあるため、同素体である。",
      "オ": "ダイヤモンドと黒鉛は、原子の並び方が異なる炭素の同素体である。一酸化炭素は製鉄に使われ、酢酸ではなくギ酸の脱水で生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokuzei-senmonkan-2025-annual-special-b-q46",
    "exam": "kokuzei-senmonkan",
    "year": 2025,
    "season": "annual",
    "session": "special-b",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "化学",
    "topicTags": [
      "電気分解とファラデーの法則",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "十分な濃度の硝酸銀水溶液を、白金電極を用いて10 Aで12分52秒間電気分解した。陰極に析出した銀の質量はどれか。銀の原子量を108、ファラデー定数を9.65×10⁴ C/molとする。",
    "choices": {
      "ア": "2.9 g",
      "イ": "4.3 g",
      "ウ": "8.6 g",
      "エ": "17 g",
      "オ": "43 g"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "電気量は10×772＝7,720 Cなので電子は0.0800 molである。Ag⁺と電子は1：1で反応し、銀の質量は0.0800×108＝8.64 gになる。",
    "choiceExplanations": {
      "ア": "12分52秒は772秒で、通過した電気量は7,720 Cになる。電子は0.0800 molであり、銀は2.9 gより多く析出する。",
      "イ": "4.3 gは銀約0.040 molに当たる。Ag⁺が銀1個になるのに電子1個を要するため、0.0800 molの電子ではその約2倍の銀が析出する。",
      "ウ": "電気量は10×772＝7,720 Cなので電子は0.0800 molである。Ag⁺と電子は1：1で反応し、銀の質量は0.0800×108＝8.64 gになる。",
      "エ": "17 gは銀約0.16 molであり、同じ物質量の電子が必要になる。実際に通過した電子は約0.0800 molなので、この値の半分程度になる。",
      "オ": "43 gは銀約0.40 molで、必要な電気量は約38,600 Cになる。この電気分解の電気量7,720 Cより約5倍大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016239.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国税専門官採用試験（国税専門B） 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  }
];
