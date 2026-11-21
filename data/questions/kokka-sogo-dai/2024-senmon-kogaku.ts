import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2024_SENMON_KOGAKU: Question[] = [
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q001",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "中央値と範囲",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "次の表は、6人の生徒A～F のある教科のテストの得点である。\n\na の値が分からないとき、この6人の得点の中央値は何通りあり得るか。\nただし、a は整数である。なお、この場合の中央値は、得点を小さい順に左から並べたとき、左からそれぞれ第3番目と第4番目の得点の平均値である。",
    "choices": {
      "ア": "6通り",
      "イ": "8通り",
      "ウ": "10通り",
      "エ": "12通り",
      "オ": "14通り"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "aが66から75までなら中央の2点は71とaである。範囲外では端のaと同じ中央値になるため、68.5から73までの10通りである。",
    "choiceExplanations": {
      "ア": "固定された得点だけを用いて中央値を考えると、未知の得点aが中央に入る場合が抜ける。aが66から75までの整数なら、中央値は0.5刻みで変わる。",
      "イ": "aが66以下、75以上の場合の中央値はそれぞれ68.5、73である。この両端とその間の0.5刻みの値を合わせると8通りを超える。",
      "ウ": "aが66から75までなら中央の2点は71とaである。範囲外では端のaと同じ中央値になるため、68.5から73までの10通りである。",
      "エ": "aを66未満又は75超に動かしても、その値は中央の2点にならない。端の外側に新たな中央値は生じない。",
      "オ": "中央値を変えるのはaが66から75まで動く部分である。aは整数なので、中央値が取り得る範囲の半点刻みを数える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 1。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q001.webp"
    ],
    "imageAltTexts": [
      "生徒ＡからＦのテスト得点を並べた表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q002",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "奇素数の平方と合同式",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "m が24より大きな素数であるとき、m⁶ − m²を24で割ったときの余りはいくらか。",
    "choices": {
      "ア": "0",
      "イ": "2",
      "ウ": "4",
      "エ": "6",
      "オ": "12"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "mは2でも3でも割り切れず、m²は8を法としても3を法としても1である。したがってm⁶とm²はいずれも24を法として1であり、差の余りは0である。",
    "choiceExplanations": {
      "ア": "mは2でも3でも割り切れず、m²は8を法としても3を法としても1である。したがってm⁶とm²はいずれも24を法として1であり、差の余りは0である。",
      "イ": "奇数の平方は8を法として1なので、m⁶ − m²は8の倍数である。余り2はこの条件と合わない。",
      "ウ": "mが3の倍数でないため、m²とm⁶はどちらも3を法として1になる。差は3の倍数で、余り4にはならない。",
      "エ": "m²とm⁶はどちらも8を法として1になる。差も24で割った余りも8の倍数なので、6は合わない。",
      "オ": "mが2と3で割り切れないことを合わせると、m² ≡ 1（mod 24）である。したがってm⁶ − m²も24の倍数になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q003",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "ベクトルの内積と三角形の面積",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "点Oを中心とする半径1の円があり、その円周上に3OA⃗ + 7OB⃗ + 8OC⃗ = 0⃗を満たすよう点A，B，Cを配置した。このときの△AOBの面積はいくらか。",
    "choices": {
      "ア": "1／7",
      "イ": "√3／4",
      "ウ": "2√3／7",
      "エ": "1／2",
      "オ": "4√3／7"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "3OA⃗ + 7OB⃗の長さは8なので、64 = 9 + 49 + 42cos∠ＡＯＢとなる。余弦が1／7、正弦が4√3／7なので、面積は2√3／7である。",
    "choiceExplanations": {
      "ア": "三角形の面積は内積から分かる余弦の半分ではなく、角ＡＯＢの正弦の半分である。余弦は1／7だが、正弦は4√3／7になる。",
      "イ": "この面積は二辺が1でなす角の正弦が√3／2のときの値である。ベクトルの条件から余弦を求めると1／7となり、その角の正弦は異なる。",
      "ウ": "3OA⃗ + 7OB⃗の長さは8なので、64 = 9 + 49 + 42cos∠ＡＯＢとなる。余弦が1／7、正弦が4√3／7なので、面積は2√3／7である。",
      "エ": "1／2は単位長の二辺が直角をなすときの面積である。係数を含むベクトルの長さから得る余弦はゼロではない。",
      "オ": "4√3／7は角ＡＯＢの正弦である。三角形の面積は二辺の長さの積に正弦を掛けて半分にする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 3。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q004",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "逆正接関数の微分",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "f(x) = 4tan⁻¹ xであるとき、f′(1)はいくらか。ただし、tan⁻¹ xは−π／2 < tan⁻¹ x < π／2を満たすtan xの逆関数、f′(x)はf(x)の導関数である。",
    "choices": {
      "ア": "−1",
      "イ": "4／17",
      "ウ": "1",
      "エ": "18／17",
      "オ": "2"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "逆正接の導関数を用いるとf′(x) = 4／(1 + x²)となる。x = 1では4／2 = 2である。",
    "choiceExplanations": {
      "ア": "逆正接の導関数は正の1／(1 + x²)である。4を掛けても正なので、f′(1)が負になることはない。",
      "イ": "1 + 4²という分母は4xを逆正接の引数とするときに現れる。ここで4は逆正接の外にあり、分母は1 + 1²である。",
      "ウ": "逆正接のx = 1での導関数は1／2である。fはその関数の4倍なので、導関数も4倍になる。",
      "エ": "逆正接の内側にはxだけがあり、連鎖律で係数を重ねて掛ける形ではない。導関数4／(1 + x²)に1を代入する。",
      "オ": "逆正接の導関数を用いるとf′(x) = 4／(1 + x²)となる。x = 1では4／2 = 2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 4。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q005",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "媒介変数と囲まれた面積",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "xy平面において、媒介変数tを用いて次式で表される曲線に囲まれる図形の面積はいくらか。\n\nx = 2t²\ny = 2t − t³",
    "choices": {
      "ア": "1",
      "イ": "16√2／15",
      "ウ": "2",
      "エ": "32√2／15",
      "オ": "64√2／15"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "上側はtが0から√2、下側はそのx軸対称である。2∫₀^√2 (2t − t³)4t dtを計算すると64√2／15になる。",
    "choiceExplanations": {
      "ア": "閉じた曲線の上半分だけでも、0から√2までy (dx/dt)を積分すると32√2／15になる。上下を合わせるため、面積は1を上回る。",
      "イ": "媒介変数微分ではdx/dt = 4tとなる。上下の境界の差2(2t − t³)にこれを掛けて積分するため、16√2／15にはならない。",
      "ウ": "曲線がx軸と交わるのはt = 0又は±√2で、閉曲線の左右端のx座標は0と4になる。高さが変化するので、面積は切片だけからは求められない。",
      "エ": "32√2／15はtが0から√2の上半分の面積である。負のtが描く下半分も同じ面積を持つ。",
      "オ": "上側はtが0から√2、下側はそのx軸対称である。2∫₀^√2 (2t − t³)4t dtを計算すると64√2／15になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 5。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q006",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "ベイズの定理と独立試行",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "それぞれ10本のくじが入った、タイプA の箱が三つとタイプB の箱が一つある。A の箱には当たりが1本、外れが9本入っており、B の箱には当たりが7本、外れが3本入っている。1回のくじ引きでは、四つの箱から無作為に一つの箱を選び出し、その箱からくじを1本引き、引いたくじを元の箱に戻し、選んだ箱を他の箱と区別がつかないように戻す。2回のくじ引きで2回とも当たりを引いたとき、どちらの当たりもA の箱から引いていた確率はいくらか。",
    "choices": {
      "ア": "1／16",
      "イ": "9／100",
      "ウ": "9／79",
      "エ": "49／100",
      "オ": "9／16"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "1回でＡから当たりを引く確率は(3／4)×(1／10) = 3／40、当たり全体の確率は1／4である。条件付き確率3／10を二乗すると9／100になる。",
    "choiceExplanations": {
      "ア": "当たりを引いたときにＡの箱だった条件付き確率は3／10で、1／4ではない。2回独立に繰り返すので3／10を二乗する。",
      "イ": "1回でＡから当たりを引く確率は(3／4)×(1／10) = 3／40、当たり全体の確率は1／4である。条件付き確率3／10を二乗すると9／100になる。",
      "ウ": "各回について当たり全体にはＡの箱とＢの箱からの当たりが含まれる。この割合を計算すると条件付き確率は各回3／10で、2回の条件は試行ごとに独立である。",
      "エ": "49／100は2回ともＢの箱だった条件付き確率である。当たりの中でＡの箱が占める割合は7／10ではなく3／10である。",
      "オ": "9／16は当たりを条件にせず、2回とも型Ａの箱を選ぶ確率である。当たりが出る割合は箱の型で異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q007",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "行列の逆行列と転置",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "行列AをA = ((a, b), (c, d))とし、Aの行列式|A|が|A| = −1であるとする。さらに、Aの逆行列A⁻¹がA⁻¹ = ((a, c), (b, d))を満たすとき、A²として正しいのはどれか。",
    "choices": {
      "ア": "((−1, 0), (0, −1))",
      "イ": "((−1, 1), (1, −1))",
      "ウ": "((0, −1), (1, 0))",
      "エ": "((1, 1), (0, 1))",
      "オ": "((1, 0), (0, 1))"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "A⁻¹ = Aᵀであり、行列式−1の2次直交行列は、一方の方向を保ち、その垂直方向を反転する。二乗するとどちらの方向も元に戻るため単位行列となる。",
    "choiceExplanations": {
      "ア": "A⁻¹ = AᵀよりAは直交行列で、行列式−1の2次直交行列は直線に関する反射である。反射を二度行うと負の単位行列ではなく単位行列になる。",
      "イ": "2次直交行列で行列式−1なら固有値は1と−1である。二乗の固有値はともに1となり、この行列の固有値とは合わない。",
      "ウ": "この行列は二乗すると負の単位行列になる90度回転である。Aは行列式−1の直交行列なので、その二乗では回転が残らない。",
      "エ": "直交行列の積であるA²も直交行列である。この行列の列ベクトルは互いに直交せず、条件に合わない。",
      "オ": "A⁻¹ = Aᵀであり、行列式−1の2次直交行列は、一方の方向を保ち、その垂直方向を反転する。二乗するとどちらの方向も元に戻るため単位行列となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 7。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q008",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "連長圧縮のフローチャート",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "配列要素I[0]，I[1]，…，I[9] から成る配列I が定義され、各配列要素に次のように文字が格納されている。\n\n図は、配列I に格納されている文字列を圧縮した結果を配列O に格納するフローチャートである。このフローチャートを実行したとき、最後に出力される値はいくらか。ただし、配列O には文字列を圧縮した結果を格納する十分な領域が確保されている。",
    "choices": {
      "ア": "4",
      "イ": "5",
      "ウ": "6",
      "エ": "7",
      "オ": "8"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "文字が切り替わる3回にＡ4、Ｂ2、Ｃ1を書き込み、jは6になる。ループを抜けてＡ3を追加し、j + 2 = 8を出力する。",
    "choiceExplanations": {
      "ア": "圧縮後には文字の連続区間が4区間あるが、各区間について文字と長さの2要素を書き込む。出力値は区間数そのものではない。",
      "イ": "文字が切り替わるたびjは2ずつ増え、終了時もjに2を加える。初期値jが0なので、出力は奇数にならない。",
      "ウ": "6は三つの区間を格納した直後のjである。ループの後に最後のＡの区間も格納し、その分を加えて出力する。",
      "エ": "jは2ずつ増加し、最後に出力されるのもjに2を加えた値である。最終区間の文字と個数の両方を数える。",
      "オ": "文字が切り替わる3回にＡ4、Ｂ2、Ｃ1を書き込み、jは6になる。ループを抜けてＡ3を追加し、j + 2 = 8を出力する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 8。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q008-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q008-2.webp"
    ],
    "imageAltTexts": [
      "文字が格納された配列Ｉの表",
      "配列Ｉの文字列を連長圧縮するフローチャート"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q009",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "一様到着と待ち時間の期待値",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "あるバス停の発車時刻は表のとおりとなっており、バスは定刻どおりに発車している。A さんがこのバス停に到着する時刻が9時から10時の間で一様であるとき、A さんが次のバスの発車までに待つ時間の期待値は何分か。",
    "choices": {
      "ア": "5",
      "イ": "20／3",
      "ウ": "25／3",
      "エ": "10",
      "オ": "35／3"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "9時台の区間長は10、20、10、20分なので、区間内の平均待ち時間は5、10、5、10分である。到着確率を区間長／60で重み付けすると25／3分になる。",
    "choiceExplanations": {
      "ア": "10分間隔の中だけで平均を取れば5分になる。20分間隔もあり、その中に到着する確率も考慮する。",
      "イ": "20分の区間は二つあり、各区間内の平均待ち時間は10分である。短い10分区間の平均5分も、区間長に比例する重みで加える。",
      "ウ": "9時台の区間長は10、20、10、20分なので、区間内の平均待ち時間は5、10、5、10分である。到着確率を区間長／60で重み付けすると25／3分になる。",
      "エ": "10分は長さ20分の区間に到着した場合の平均である。長さ10分の区間もあるため、9時台の平均はこれより短くなる。",
      "オ": "35／3分は、最長の20分区間に限った平均待ち時間10分を超える。短い区間も含めて重み付けすると25／3分になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 9。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q009.webp"
    ],
    "imageAltTexts": [
      "6時から11時のバスの発車時刻表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q010",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "反発係数と力学的エネルギー",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、水平面と曲面から成る滑らかな床の上に静止している質量m の小球A に向かって、質量m の小球B を速さv で等速直線運動させたところ、A とB は非弾性衝突した。その後、A は曲面を通過し、図Ⅱのように鉛直上向きに飛び出し、最高点に達した。このとき、最高点の水平面からの高さとして最も妥当なのはどれか。ただし、重力加速度の大きさをg、A とB の間の反発係数をe とする。",
    "choices": {
      "ア": "(1 − e)²v²／(8g)",
      "イ": "(1 + e)²v²／(8g)",
      "ウ": "(1 + e)²v²／(8e²g)",
      "エ": "e²v²／(2g)",
      "オ": "v²／(2e²g)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "運動量保存と反発係数から衝突後のＡの速さは(1 + e)v／2となる。滑らかな床ではその運動エネルギーが位置エネルギーになり、高さは(1 + e)²v²／(8g)となる。",
    "choiceExplanations": {
      "ア": "(1 − e)v／2は衝突後のＢの速さである。高さへの換算に用いるのは、曲面を上るＡの衝突直後の速さである。",
      "イ": "運動量保存と反発係数から衝突後のＡの速さは(1 + e)v／2となる。滑らかな床ではその運動エネルギーが位置エネルギーになり、高さは(1 + e)²v²／(8g)となる。",
      "ウ": "反発係数は衝突前後の相対速度を結び付ける。衝突後のＡの速さを求めた後、曲面を上る過程でさらにe²で割る理由はない。",
      "エ": "evは衝突後のＡとＢの速さの差である。Ａ単体の速さは、その差と二つの速さの和vを組み合わせて求める。",
      "オ": "eで割る式は、衝突後の相対速度を反発係数の逆数で扱っている。実際には分離の相対速度がevとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q010.webp"
    ],
    "imageAltTexts": [
      "小球が衝突する前と小球Ａが曲面から飛び出した後の模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q011",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "斜面上の直方体の転倒条件",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、水平面と角θ の傾きをなす粗い斜面の上に、幅b、高さh、質量m の一様な直方体が静止している。この直方体の点A に斜面と平行に大きさF の力を静かに作用させるとき、直方体を倒すためにF が満たすべき条件として最も妥当なのはどれか。ただし、重力加速度の大きさをg とし、直方体は斜面上を滑らないものとする。",
    "choices": {
      "ア": "F > (h cosθ − b sinθ)mg／(4h)",
      "イ": "F > (b cosθ − h sinθ)mg／(2h)",
      "ウ": "F > (h cosθ − b sinθ)mg／(2h)",
      "エ": "F > (b cosθ − h sinθ)mg／h",
      "オ": "F > (h cosθ − b sinθ)mg／h"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "下側の角を支点とすると転倒方向の力のモーメントはFhで、重力が作る逆向きの合計はmg(b cosθ − h sinθ)／2である。前者が後者を上回るのが転倒条件である。",
    "choiceExplanations": {
      "ア": "斜面の下側の角を支点にすると、重力の斜面垂直成分の腕はb／2で、重力の斜面方向成分の腕はh／2である。この式では両方の長さを逆に置いている。",
      "イ": "下側の角を支点とすると転倒方向の力のモーメントはFhで、重力が作る逆向きの合計はmg(b cosθ − h sinθ)／2である。前者が後者を上回るのが転倒条件である。",
      "ウ": "力のモーメントの腕はhである。重力の成分を分けると、垂直成分mg cosθに対応する腕はh／2ではなくb／2となる。",
      "エ": "b cosθ − h sinθという組合せは合う。重心は断面の中央にあり、各成分の腕はbとhのそれぞれ半分なので、右辺にも1／2が付く。",
      "オ": "重力の斜面方向成分mg sinθは下向きに働き、その腕はh／2である。幅と高さを入れ替えず、力Fの腕にhを使って比較する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q011.webp"
    ],
    "imageAltTexts": [
      "斜面上の直方体と点Ａに斜面と平行に働く力Ｆ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q012",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "ばねの直列・並列と周期",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰ，Ⅱ，Ⅲのように、水平かつ滑らかな床上で、質量m の一様な小物体A，B，C それぞれにばね定数k の同じ軽いばね2本を組み合わせ、全てのばねが自然長となる箇所で、剛体壁と接続した。A，B，C をそれぞれ図の左右方向に変位させ、静かに放したところ、単振動を始めた。このときのA，B，C の単振動の周期の比として最も妥当なのはどれか。ただし、小物体は壁と衝突しないものとし、全てのばねは床と平行であるものとする。",
    "choices": {
      "ア": "1：2：1",
      "イ": "1：4：4",
      "ウ": "2：1：1",
      "エ": "2：1：2",
      "オ": "4：1：1"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Ａの合成ばね定数はk／2、Ｂは2kである。Ｃも二本の力が同じ復元方向に働いて2kなので、周期比は2：1：1になる。",
    "choiceExplanations": {
      "ア": "Ａは直列なのでばね定数が最も小さく、周期が最も長くなる。Ｂは並列で、Ａより長くなることはない。",
      "イ": "ＢとＣでは変位に対する復元力の係数がともに2kとなる。直列のＡはk／2であり、周期はばね定数の逆平方根に比例する。",
      "ウ": "Ａの合成ばね定数はk／2、Ｂは2kである。Ｃも二本の力が同じ復元方向に働いて2kなので、周期比は2：1：1になる。",
      "エ": "Ｃを動かすと片方は伸び、片方は縮むが、二本とも物体を平衡位置に戻す向きに力を及ぼす。Ｃの周期はＡではなくＢと等しい。",
      "オ": "ＡとＢの合成ばね定数の比は1：4だが、周期はその逆平方根の比になる。従ってＡの周期はＢの4倍にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q012.webp"
    ],
    "imageAltTexts": [
      "同じばね二本を直列又は並列に組み合わせた小物体Ａ、Ｂ、Ｃ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q013",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "円軌道と脱出エネルギー",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "質量M の惑星を中心として半径r の等速円運動をしている質量m の人工衛星P がある。 P を加速させて無限遠まで飛ばすために加えるべき最小のエネルギーとして最も妥当なのはどれか。ただし、惑星の自転及び公転の影響、他の天体の影響は無視できるものとし、惑星の密度は一様であるものとする。また、万有引力定数をG とする。なお、万有引力による位置エネルギーU は、質量m₁の惑星と質量m₂の物体が距離R だけ離れているとき、 \n\nU = −Gm₁m₂／R\n\nである。",
    "choices": {
      "ア": "GMm／(2r)",
      "イ": "GMm／r",
      "ウ": "3GMm／(2r)",
      "エ": "2GMm／r",
      "オ": "3GMm／r"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "円運動の向心力から速度の二乗はGM／rとなる。運動エネルギーGMm／(2r)と位置エネルギー−GMm／rの和をゼロまで上げるには、GMm／(2r)を加えればよい。",
    "choiceExplanations": {
      "ア": "円運動の向心力から速度の二乗はGM／rとなる。運動エネルギーGMm／(2r)と位置エネルギー−GMm／rの和をゼロまで上げるには、GMm／(2r)を加えればよい。",
      "イ": "GMm／rは初めの位置エネルギーの絶対値である。衛星はすでに円運動の運動エネルギーを持つため、加える量はその分だけ小さい。",
      "ウ": "円軌道での全エネルギーは、位置エネルギーに運動エネルギーを加えた負の値である。二つの絶対値を足した3GMm／(2r)では過大になる。",
      "エ": "無限遠に速度ゼロで達する最小の場合、最終的な力学的エネルギーはゼロである。初めの全エネルギーの絶対値は2GMm／rより小さい。",
      "オ": "衛星の速さは円軌道の条件で決まり、すでに運動エネルギーを持つ。初期エネルギーをゼロにするために加える量は位置エネルギーの絶対値の半分である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q014",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "定積加熱とピストン上昇後の膨張",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "熱力学に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。「図のように、ヒーターと、滑らかに動く質量M のピストンがついた円筒形の容器が、ピストンが鉛直方向に動く向きで、大気中に置かれている。初め、ピストンは、容器の底から高さL の位置に設けられたストッパーによって止まっている。また、容器内には、 n〔mol〕の単原子分子の理想気体が封入されており、容器内の圧力及び温度は、大気圧及び大気の温度に等しい。気体定数をR、重力加速度の大きさをg、大気の温度をT₀、理想気体の定積モル比熱をCᵥ = (3／2)R とする。まず、ヒーターのスイッチを入れて容器内の気体を加熱したところ、気体の温度がT₁になったとき、ピストンが上昇を始めた。このときまでに気体に加えられた熱量Q₁は ㋐ である。その後、加熱を続けたところ、ピストンが (1／2)Lだけ上昇した。このときの気体の温度T₂は ㋑ である。ただし、ピストン及び容器は断熱性であるものとする。」",
    "choices": {
      "ア": "(1／2)MgL ／ (1／2)(T₀ + MgL／(nR))",
      "イ": "(1／2)MgL ／ (3／2)(T₀ + MgL／(nR))",
      "ウ": "(3／2)MgL ／ (1／2)(T₀ + MgL／(nR))",
      "エ": "(3／2)MgL ／ (3／2)(T₀ + MgL／(nR))",
      "オ": "(5／2)MgL ／ (1／2)(T₀ + MgL／(nR))"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "断面積をSとすると、動き始めるまでに圧力はMg／S上昇し、定積でT₁ = T₀ + MgL／(nR)になる。Q₁は(3／2)MgLで、その後は定圧で体積が3／2倍となるためT₂ = (3／2)T₁である。",
    "choiceExplanations": {
      "ア": "ピストンが動き始めるまでは体積一定で、気体に必要な温度上昇はMgL／(nR)である。定積モル比熱3R／2を用いるため、熱量はMgL／2より大きい。",
      "イ": "上昇後の体積が最初の3／2になるので、㋑の係数は合う。動き始める前の加熱には定積モル比熱を用い、㋐は(3／2)MgLとなる。",
      "ウ": "㋐は動き始めるまでの熱量として正しい。ピストンがL／2だけ上昇すると気体の高さは3L／2なので、一定圧力下で温度はT₁の3／2倍になる。",
      "エ": "断面積をSとすると、動き始めるまでに圧力はMg／S上昇し、定積でT₁ = T₀ + MgL／(nR)になる。Q₁は(3／2)MgLで、その後は定圧で体積が3／2倍となるためT₂ = (3／2)T₁である。",
      "オ": "5R／2は単原子理想気体の定圧モル比熱である。動き始める前は定積、その後の温度は体積に比例して高くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q014.webp"
    ],
    "imageAltTexts": [
      "ピストン、ストッパーの位置、加熱後の上昇距離を示した容器の模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q015",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "プリズムとスネルの法則",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、空気中の水平な床の上に置かれた直角三角形のプリズムに、単色光を水平に照射したところ、プリズムを通過した光の水平面に対する角度は60° となった。空気の絶対屈折率を1とするとき、この単色光に対するプリズムの絶対屈折率はいくらか。",
    "choices": {
      "ア": "2",
      "イ": "√5",
      "ウ": "√6",
      "エ": "√7",
      "オ": "2√2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "内部角をα、βとするとα + β = 30°で、n sinα = 1／2、n sinβ = √3／2となる。加法定理からn cosα = 3√3／2なので、n² = 7である。",
    "choiceExplanations": {
      "ア": "初めの入射角は法線に対して30°、最後の出射角は法線に対して60°である。屈折率を2として両界面のスネルの法則を満たす内部角を求めると、その和が30°にならない。",
      "イ": "プリズム内での二つの法線から測った角の和は30°である。光の入出射角を両方用いると、屈折率の二乗は5より大きい。",
      "ウ": "最初の内部屈折角をαとすると、n sinα = 1／2とn sin(30° − α) = √3／2が同時に必要である。この二式ではn² = 6にならない。",
      "エ": "内部角をα、βとするとα + β = 30°で、n sinα = 1／2、n sinβ = √3／2となる。加法定理からn cosα = 3√3／2なので、n² = 7である。",
      "オ": "2√2なら屈折率の二乗は8である。二つの界面での屈折角を加法定理で結ぶとn²は7になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q015.webp"
    ],
    "imageAltTexts": [
      "空気からプリズムへ入射し再び空気へ出る光の経路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q016",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "円運動の音源のドップラー効果",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "ドップラー効果に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。「図のように、振動数fₒ の音を出す音源S が、原点O を中心とした半径r の円上を反時計回りに速さvₛ で等速円運動しており、観測者P は、点（2r，0）に静止している。このとき、P が観測する最大の振動数fₕ と最小の振動数fₗ の差は ㋐ であり、fₕ を観測してからfₗ を観測するまでの時間は ㋑ である。ただし、音速をV とし、vₛ はV よりも小さいものとする。」",
    "choices": {
      "ア": "(2vₛ／V)fₒ ／ 2πr／(3vₛ)",
      "イ": "(2vₛ／V)fₒ ／ πr／vₛ",
      "ウ": "[2Vvₛ／(V² − vₛ²)]fₒ ／ 2πr／(3vₛ)",
      "エ": "[2Vvₛ／(V² − vₛ²)]fₒ ／ πr／vₛ",
      "オ": "[2Vvₛ／(V² − vₛ²)]fₒ ／ 4πr／(3vₛ)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "接近時と遠ざかる時の最大速度成分はともにvₛなので、観測周波数はVfₒ／(V − vₛ)とVfₒ／(V + vₛ)になる。両接点はＰまで等距離で、反時計回りに移る角度は2π／3だから観測時間差は2πr／(3vₛ)である。",
    "choiceExplanations": {
      "ア": "最大と最小を生む点までの道のりから観測時間差は合う。周波数差の2vₛfₒ／VはvₛがVより十分小さい場合の近似である。",
      "イ": "音源速度が視線方向に一致するのはＰから円への接点で、両点の中心角はπではなく2π／3である。周波数差にはV² − vₛ²の分母が必要になる。",
      "ウ": "接近時と遠ざかる時の最大速度成分はともにvₛなので、観測周波数はVfₒ／(V − vₛ)とVfₒ／(V + vₛ)になる。両接点はＰまで等距離で、反時計回りに移る角度は2π／3だから観測時間差は2πr／(3vₛ)である。",
      "エ": "㋐はドップラー式の差として正しい。最大から最小までの移動は円の半周より短く、中心角2π／3の分である。",
      "オ": "4πr／(3vₛ)は残りの長い円弧を進む時間である。音源は最大周波数を生む接点から最小周波数を生む接点まで、短い方の円弧を反時計回りに進む。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q016.webp"
    ],
    "imageAltTexts": [
      "円運動する音源Ｓと静止している観測者Ｐの位置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q017",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "平行平板間の電界と力のつり合い",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、1.5 × 10⁻¹ mの間隔を空けて平行に配置した2枚の平板電極に電圧をかけ、これらの間に電気量1.0 × 10⁻¹¹ Cの電荷をもつ質量4.0 × 10⁻⁹ kgの小物体を静かに放したところ、小物体は空中で静止した。このとき、平板電極にかけた電圧として最も妥当なのはどれか。\nただし、平板電極は水平に配置されており、その大きさは平板電極の間隔に対して十分に大きいものとする。また、重力加速度の大きさを10 m/s²とする。",
    "choices": {
      "ア": "3.0 × 10 V",
      "イ": "6.0 × 10 V",
      "ウ": "3.0 × 10² V",
      "エ": "6.0 × 10² V",
      "オ": "9.0 × 10² V"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "重力4.0×10⁻⁸ Nを電荷1.0×10⁻¹¹ Cで割ると、必要な電界は4.0×10³ V/mである。板間距離0.15 mを掛けると6.0×10² Vになる。",
    "choiceExplanations": {
      "ア": "静止するためにはqV／d = mgが必要である。30 Vを代入すると電気力は重力の20分の1しかない。",
      "イ": "6.0×10 Vは必要な電界を板間距離で電圧に直すときに、距離の指数を一桁小さくした場合の値である。板間距離は0.15 mである。",
      "ウ": "300 Vでは板間の電界は2.0×10³ V/mである。その電界による力は重力の半分にとどまる。",
      "エ": "重力4.0×10⁻⁸ Nを電荷1.0×10⁻¹¹ Cで割ると、必要な電界は4.0×10³ V/mである。板間距離0.15 mを掛けると6.0×10² Vになる。",
      "オ": "900 Vでは電界が6.0×10³ V/mとなり、電気力は重力の1.5倍になる。小物体が静止するには両方の大きさが等しくなければならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q017.webp"
    ],
    "imageAltTexts": [
      "帯電した小物体を挟む二枚の平板電極と電源"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q018",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "電磁誘導とレンツの法則",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "磁界中を運動するコイルに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。「図Ⅰのように、xy 平面上には1辺の長さがa の正方形コイルABCD が置かれている。また、 a < x < 3a の領域には、紙面の裏から表に向かう磁束密度の大きさB の一様な磁界がある。いま、この正方形コイルを、辺AB がx = 0の位置からx = 4a の位置まで、x 軸の正の向きに時刻t = 0から一定の速さv で平行移動させたとき、コイルに生じる誘導起電力V の時間変化を定性的に表したグラフは図Ⅱの ㋐ となり、コイルが磁界から受ける力f の時間変化を定性的に表したグラフは図Ⅱの ㋑ となる。ただし、V はABCD の向きに電流を流す向きを正とし、f はx 軸の正の向きを正とする。」",
    "choices": {
      "ア": "①／①",
      "イ": "①／③",
      "ウ": "②／②",
      "エ": "④／②",
      "オ": "④／④"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "進入時には手前向きの磁束が増え、正の周回方向と反対の起電力が生じる。退出時には符号が逆になる一方、力は両区間とも移動を妨げるので、①と③になる。",
    "choiceExplanations": {
      "ア": "コイルが領域に入る際の負、出る際の正という起電力の符号の変化は①と合う。移動を妨げる磁力は進入時も退出時も負の向きである。",
      "イ": "進入時には手前向きの磁束が増え、正の周回方向と反対の起電力が生じる。退出時には符号が逆になる一方、力は両区間とも移動を妨げるので、①と③になる。",
      "ウ": "②は進入時にも退出時にも値が正になる形である。起電力は二つの区間で逆符号、磁力はどちらでも負になる。",
      "エ": "④は進入時の起電力が正だが、このときは正に取った面を貫く磁束が増えるので起電力は負である。②の正の力はレンツの法則に合わない。",
      "オ": "正の周回で見た磁束が進入時に増えるため、起電力の符号は④の逆になる。退出時も磁力は運動を妨げる方向で、符号は切り替わらない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q018-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q018-2.webp"
    ],
    "imageAltTexts": [
      "正方形コイルと紙面の手前向きの一様磁界の範囲",
      "誘導起電力と力の時間変化の候補を表す四つのグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q019",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "電位差計と内部抵抗",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような回路において、PQ はまっすぐに張った長さ100 cm、抵抗値4 Ω の一様な抵抗線で、C はこの抵抗線上を滑り動く接点である。ここで、PQ に1 A の電流を流した状態で、スイッチS₁を閉じ、スイッチS₂は開いたままでC を動かすと、ℓ = 40 cm のところで検流計G に電流が流れなくなった。さらに、 S₂を閉じてC を左に動かしたところ、ℓ = 39 cm のところでG に電流が流れなくなった。このとき、抵抗に流れる電流の大きさとして最も妥当なのはどれか。ただし、電池の内部抵抗の抵抗値を0.5 Ω とする。",
    "choices": {
      "ア": "0.01 A",
      "イ": "0.02 A",
      "ウ": "0.04 A",
      "エ": "0.08 A",
      "オ": "0.1 A"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "開回路の起電力は1×4×40／100 = 1.60 V、抵抗を接続した端子電圧は1.56 Vである。差の0.04 Vを内部抵抗0.5 Ωで割ると0.08 Aになる。",
    "choiceExplanations": {
      "ア": "抵抗線の1 cm当たりの電位差は0.04 Vである。長さが1 cm短くなったので、電池の内部抵抗での降下は0.04 Vとなり、0.01 Aでは不足する。",
      "イ": "端子電圧の低下は電位差計の読みの差1 cmを電圧に換算して求める。内部抵抗0.5 Ωで0.02 Aなら降下は0.01 Vで、測定値に一致しない。",
      "ウ": "0.04は電池の端子電圧が低下した量をVで表した数値である。電流値への換算には内部抵抗0.5 Ωで割る必要がある。",
      "エ": "開回路の起電力は1×4×40／100 = 1.60 V、抵抗を接続した端子電圧は1.56 Vである。差の0.04 Vを内部抵抗0.5 Ωで割ると0.08 Aになる。",
      "オ": "0.1 Aなら電池内部で0.05 V低下し、測定された長さの差1 cmに対応する0.04 Vと合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q019.webp"
    ],
    "imageAltTexts": [
      "一様な抵抗線と検流計を用いた電位差計の回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q020",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "交流での位相と回路の過渡応答",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような回路において、A，B，C の箇所には、抵抗、コイル、コンデンサのいずれか一つずつが接続されている。回路を流れる電流I 及びA の両端にかかる電圧（点Q に対する点P の電位）V_A の時間変化は図Ⅱのようになった。なお、図Ⅰの矢印の向きに流れる電流を正とする。次に、図ⅢのようにA，B，C をつなぎ替え、直流電源に接続した。初めコンデンサには電荷は蓄えられておらず、スイッチS を閉じた直後、S にはある大きさの電流が流れた。S を流れる電流は時間とともに変化し、十分に時間が経過した後は、S を閉じた直後と同じ大きさの電流が流れるようになった。このとき、A とB の箇所に接続されているものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "コイル／コンデンサ",
      "イ": "コイル／抵抗",
      "ウ": "コンデンサ／コイル",
      "エ": "コンデンサ／抵抗",
      "オ": "抵抗／コイル"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "図ⅡでＡの電圧が電流に対して先行するのでＡはコイルである。Ｂがコンデンサなら、投入直後はＢ、十分後はＡが短絡に相当し、どちらも直列抵抗Ｃだけで電流が決まる。",
    "choiceExplanations": {
      "ア": "図ⅡでＡの電圧が電流に対して先行するのでＡはコイルである。Ｂがコンデンサなら、投入直後はＢ、十分後はＡが短絡に相当し、どちらも直列抵抗Ｃだけで電流が決まる。",
      "イ": "Ａがコイルであることは位相と合う。Ｂが抵抗でＣがコンデンサなら、直流定常状態ではＣが開回路となり、投入直後に流れた電流がゼロになる。",
      "ウ": "コンデンサなら電圧は電流より遅れる。図ⅡではＡの電圧が電流より先行しており、コンデンサをＡに置けない。",
      "エ": "Ａの位相は誘導性素子を示している。また直流でＢが抵抗、Ｃがコイルなら、投入直後は直列のＣに電流が流れない。",
      "オ": "抵抗では電圧と電流が同位相である。図Ⅱで示されたＡの電圧の先行を説明するにはコイルが必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q020.webp"
    ],
    "imageAltTexts": [
      "交流回路と位相のグラフ、素子をつなぎ替えた直流回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q021",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "人工知能の研究史",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "人工知能に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「人工知能（AI）と呼ばれる研究領域は、主に計算機科学の一分野である。1940年代に数学者 ㋐ によって提唱された「サイバネティクス」と呼ばれる研究運動の中にその源流があり、これまでに大きく三度の研究ブームがあった。1960年代に起きた第一次ブームでは、自然言語処理や推論・探索といった演繹的アプローチによる研究、人工ニューラルネットワークの基礎的研究が行われた。第二次ブームは1980年代に起こり、特定の専門領域に関して推論・回答を行う ㋑ の開発が積極的に行われ、産業界において実用化が進んだ。21世紀に入り、インターネット上での情報の蓄積とコンピュータの計算能力の向上を背景にビッグデータを利用できるようになると、そのデータを利用した機械学習の研究が進んだ。2010年代に始まった第三次ブームでは、機械学習の一種である ㋒ に注目が集まり、機械学習を用いた様々な製品が実用化されることとなった。」",
    "choices": {
      "ア": "クロード・シャノン／AI型チャットボット／データマイニング",
      "イ": "クロード・シャノン／エキスパートシステム／ディープラーニング",
      "ウ": "クロード・シャノン／エキスパートシステム／データマイニング",
      "エ": "ノーバート・ウィーナー／AI型チャットボット／ディープラーニング",
      "オ": "ノーバート・ウィーナー／エキスパートシステム／ディープラーニング"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ウィーナーは制御と通信を扱うサイバネティクスを提唱した。第二次では専門知識を使うエキスパートシステム、第三次では階層的なニューラルネットワークを使うディープラーニングが注目された。",
    "choiceExplanations": {
      "ア": "シャノンは情報理論の研究で知られ、サイバネティクスを提唱したのはウィーナーである。第二次ブームでは専門家の知識を用いるエキスパートシステムが研究された。",
      "イ": "エキスパートシステムとディープラーニングはそれぞれ第二次と第三次のブームに対応する。㋐に入るのはサイバネティクスを論じたウィーナーである。",
      "ウ": "第二次ブームにエキスパートシステムを置く点は合う。㋐はウィーナーで、第三次ブームで注目された機械学習の手法はディープラーニングである。",
      "エ": "ウィーナーとディープラーニングは対応する。第二次ブームで特定の専門領域について推論と回答を行ったのはエキスパートシステムである。",
      "オ": "ウィーナーは制御と通信を扱うサイバネティクスを提唱した。第二次では専門知識を使うエキスパートシステム、第三次では階層的なニューラルネットワークを使うディープラーニングが注目された。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q022",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "放射能の発見と原子力の平和利用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "原子力開発に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「今日核兵器や原子力発電の燃料の原料としてよく知られるウラン鉱石はもともと蛍光ガラスの染料程度にしか利用されていなかった。しかし、1789年にM．H．クラップロートによって元素としてのウラニウムが発見されると、1896年に ㋐ はそれが放射性物質であることを特定した。米ソ間で核開発競争が始まると、ウラニウムは単なる天然鉱物資源とは異なるものであるとされ、保有量等の情報は核開発技術とともに国家機密として秘匿されることになる。一方で、1953年のアイゼンハワー米大統領による「平和のための原子力」演説を契機に、 ㋑ の主導で原子力発電の世界的な普及戦略が展開された。そこでは、燃料としてのウラニウムは、ほかのエネルギー資源と同じ単なる商品としてみなされ、一定の管理下に置かれながらも需要と供給に基づく市場原理が適用される国際取引が可能になった。核エネルギーが軍事利用としての「核」と平和利用としての「原子力」という二面性を持つようになる。 ㋒ は、1940年にアメリカ・カリフォルニア州バークレーの実験室で人工的に合成され発見された核分裂性物質である。 ㋒ は自然界にほとんど存在しないが、ウラン燃料を用いて発電を行えば必然的に生成される。この副産物を含んだ使用済み燃料を再処理して軽水炉や高速増殖炉で燃料として再度利用しようとすることを核燃料サイクル構想と呼ぶ。」",
    "choices": {
      "ア": "アンリ・ベクレル／IAEA／プルトニウム",
      "イ": "アンリ・ベクレル／IAEA／劣化ウラン",
      "ウ": "アンリ・ベクレル／WTO／劣化ウラン",
      "エ": "ヴィルヘルム・レントゲン／IAEA／プルトニウム",
      "オ": "ヴィルヘルム・レントゲン／WTO／劣化ウラン"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ベクレルはウランの放射能を発見した。ＩＡＥＡは原子力の平和利用に関わる国際機関で、設問の人工元素はプルトニウムである。",
    "choiceExplanations": {
      "ア": "ベクレルはウランの放射能を発見した。ＩＡＥＡは原子力の平和利用に関わる国際機関で、設問の人工元素はプルトニウムである。",
      "イ": "ベクレルとＩＡＥＡの組合せは合う。劣化ウランはウラン濃縮でウラン235の割合が低くなったウランで、設問の人工元素とは異なる。",
      "ウ": "ウランの放射能の発見者はベクレルである。ＷＴＯは貿易ルールを扱う機関で、設問の原子力分野の国際機関はＩＡＥＡである。",
      "エ": "レントゲンはＸ線の発見で知られる。ウランの放射能を確認した人物はベクレルである。",
      "オ": "原子力の平和利用に関わる機関はＩＡＥＡである。設問が述べる人工元素と、同位体の構成が変化した劣化ウランも区別される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q023",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "合成燃料・バイオものづくり・DAO",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "科学技術の動向に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．DAO は、「偽造・改ざん不能のデジタルデータ」である。このDAO により、ブロックチェーン上での原本の唯一性・真正性の証明、二次流通時でも作者が収益を得られるような設計が実現可能となることが期待されており、社会課題解決や共生社会実現に向けた取組も進められている。\n㋑．合成燃料は、二酸化炭素と水素を合成して製造される複数の炭化水素化合物の集合体で、「人工的な原油」ともいわれている。また、液体の合成燃料はエネルギー密度が高く、少ないエネルギー資源量でも多くのエネルギーに変換することができ、既存の内燃機関や燃料インフラ（タンクローリー・ガソリンスタンド等）の活用が可能であることから、商用車などの代替燃料としての利用が期待されている。\n㋒．バイオものづくりは、遺伝子技術により、微生物が生成する目的物質の生産量を増加させたり、新しい物質を生産するテクノロジーである。また、生分解性製品の普及による海洋汚染の減少や細胞性食品の普及による食糧の増産・国内自給率の向上など地球規模での社会的課題の解決と、経済成長との両立を可能とする研究分野である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "㋑は二酸化炭素と水素から得る液体燃料と既存設備の活用を述べている。㋒も生物の働きを利用する生産とその応用を述べており妥当である。",
    "choiceExplanations": {
      "ア": "㋐はDAOをＮＦＴのようなデジタル資産の識別に関する概念と混同している。DAOは分散型自律組織を意味する。",
      "イ": "㋒のバイオものづくりの説明は妥当である。㋐のDAOは組織の運営方式を表すので、データの唯一性を示す仕組みの説明とは対応しない。",
      "ウ": "㋑の合成燃料は既存の内燃機関や燃料供給設備を活用できる点が期待されている。㋒も妥当なので㋑だけでは不足する。",
      "エ": "㋑は二酸化炭素と水素から得る液体燃料と既存設備の活用を述べている。㋒も生物の働きを利用する生産とその応用を述べており妥当である。",
      "オ": "㋒は妥当である。㋑も、液体合成燃料のエネルギー密度や既存インフラへの適合性を述べているので含める必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q024",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "科学技術の法令と倫理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "科学技術の倫理等に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．害虫に強くする、冷害への耐性を強めるなどの品種改良では、遺伝子組換えを行う必要があるため、人体や環境への影響などに懸念がある。\n㋑．著作権法及びプログラムの著作物に係る登録の特例に関する法律の一部を改正する法律により、令和3年1月から、違法にインターネット上に掲載された著作物のダウンロード規制の対象が、音楽・映像から著作物全般に拡大された。\n㋒．我が国では、公の秩序、善良の風俗又は公衆の衛生を害するおそれがある発明については、特許を受けることができない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "㋑は2021年から違法ダウンロードの規制対象が著作物全般に広がったことを述べている。㋒は公序良俗や公衆衛生を害するおそれのある発明に関する特許法第32条に合う。",
    "choiceExplanations": {
      "ア": "耐病性や耐冷性の品種は、遺伝子組換え技術のほか、交配や選抜などの方法でも育成できる。㋐は遺伝子組換えが必須としている点が誤りである。",
      "イ": "㋑の違法ダウンロード規制の対象拡大は合う。㋐は遺伝子組換え以外の育種法を考慮していない。",
      "ウ": "㋑と㋒は法令の内容に合うが、㋐は組換えが必要だと限定している。耐性を持つ個体を交配・選抜する品種改良も可能である。",
      "エ": "㋑は2021年から違法ダウンロードの規制対象が著作物全般に広がったことを述べている。㋒は公序良俗や公衆衛生を害するおそれのある発明に関する特許法第32条に合う。",
      "オ": "㋒の特許に関する制限は妥当である。㋑も2021年施行の著作権法改正の内容を説明している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q025",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "製造物責任と公務員・技術士の倫理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "現代社会においては個人、法人によらずあらゆる社会的主体がそれぞれに倫理観を求められる。倫理観に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．製造物責任法における製造物をその製造業者等が引き渡した時における科学又は技術に関する知見では欠陥を発見できない危険を、「開発危険」という。同法では、開発危険についてまで製造業者が責任を負うことになると、技術革新や研究開発が阻害され、国民経済の健全な発展が阻害されかねないことに配慮して、当該製造業者が一定の事情を立証することにより、免責事由に開発危険の抗弁を認めている。\n㋑．国家公務員が利害関係者から贈与を受けるなどの行為は、公正な職務の遂行に対する国民の疑惑や不信を招くものであるため、国家公務員倫理規程で制限されている。このうち、補助金等の交付をする職員と交付の対象となる事業者は利害関係者に当たるが、交付の申請をしている段階では利害関係者に当たらない。\n㋒．技術士法において、技術士又は技術士補は「信用失墜行為の禁止」、「秘密保持義務」、「公益確保の義務」などの義務が課されている。また、専門職として高い倫理観に基づいて、自律的に社会規範を遵守することが求められており、違反した場合における罰則の規定は無いが、自主的な登録の辞退や名称使用の自粛が求められている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "製造物責任法は、引渡し時の科学・技術の知見では欠陥を認識できなかったことを立証した場合の免責を認める。これが開発危険の抗弁である。",
    "choiceExplanations": {
      "ア": "製造物責任法は、引渡し時の科学・技術の知見では欠陥を認識できなかったことを立証した場合の免責を認める。これが開発危険の抗弁である。",
      "イ": "㋐の開発危険の説明は妥当である。㋑では、補助金を申請中の事業者もその事務の利害関係者に該当しうる点を見落としている。",
      "ウ": "㋐は妥当である。㋒について、技術士法では秘密保持義務に違反した場合などの罰則も定められている。",
      "エ": "国家公務員倫理規程は、補助金等の交付の申請をしている事業者等も利害関係者として挙げる。㋑の申請段階を除く説明は誤りである。",
      "オ": "技術士や技術士補には秘密保持など法律上の義務がある。違反時の対応が自主的な辞退や自粛だけとする説明は合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q026",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "ファントホッフの式とギブズエネルギー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ファントホッフの式に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「ある気体の反応に関して、標準反応ギブズエネルギーをΔᵣG°、標準反応エンタルピーをΔᵣH°、気体定数をR、絶対温度をT、圧平衡定数をK_P、圧力をPとする。\nこのとき、次の式①の関係が成り立つ。\n\nΔᵣG° = ㋐　……①\n\nまた、ギブズエネルギーをG、エンタルピーをHとすると、ギブズ－ヘルムホルツの式は式②のように表せる。\n\n（∂G／∂T）_P = ㋑　……②\n\n式①と式②より、ファントホッフの式が次の式③のように導ける。\n\nd logₑ K_P／dT = ㋒　……③」",
    "choices": {
      "ア": "RT logₑ K_P ／ (G − H)／T ／ −ΔᵣH°／(RT²)",
      "イ": "RT logₑ K_P ／ (H − G)／T ／ −ΔᵣH°／(RT²)",
      "ウ": "−RT logₑ K_P ／ (G − H)／T ／ ΔᵣH°／(RT²)",
      "エ": "−RT logₑ K_P ／ (H − G)／T ／ ΔᵣH°／(RT²)",
      "オ": "−RT logₑ K_P ／ (H − G)／T ／ −ΔᵣH°／(RT²)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ΔᵣG° = −RT logₑ K_Pであり、(∂G／∂T)_P = (G − H)／Tである。これらを組み合わせるとd logₑ K_P／dT = ΔᵣH°／(RT²)となる。",
    "choiceExplanations": {
      "ア": "㋑はH = G + TSと(∂G／∂T)_P = −Sから得られる。㋐は−RT logₑ K_Pであり、微分した㋒の符号も逆である。",
      "イ": "標準反応ギブズエネルギーは−RT logₑ K_Pである。また、(∂G／∂T)_Pは(G − H)／Tとなる。",
      "ウ": "ΔᵣG° = −RT logₑ K_Pであり、(∂G／∂T)_P = (G − H)／Tである。これらを組み合わせるとd logₑ K_P／dT = ΔᵣH°／(RT²)となる。",
      "エ": "㋐と㋒は妥当である。㋑では(∂G／∂T)_P = −Sより、H − Gの前に負の符号が必要になる。",
      "オ": "㋐は合う。㋑はエントロピーの負値で、そこから導かれる㋒は反応エンタルピーと同符号になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q027",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "酸化還元反応の電位と平衡定数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の反応の298 Kにおける平衡定数をKとするとき、logₑ Kの値として最も妥当なのはどれか。\n\n6Br⁻（aq）+ Cr₂O₇²⁻（aq）+ 14H⁺（aq）⇄ 3Br₂（aq）+ 2Cr³⁺（aq）+ 7H₂O（l）\n\nただし、ファラデー定数を9.65 × 10⁴ C・mol⁻¹、気体定数を8.31 J・K⁻¹・mol⁻¹とし、標準電極電位は以下の表の値を用いよ。",
    "choices": {
      "ア": "12",
      "イ": "70",
      "ウ": "97",
      "エ": "440",
      "オ": "580"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二クロム酸イオンの還元と臭化物イオンの酸化を合わせると、反応1回に電子6個が移動し、起電力は1.4 − 1.1 = 0.3 Vである。logₑ K = 6F×0.3／(RT) ≈ 70となる。",
    "choiceExplanations": {
      "ア": "標準起電力0.3 VをRTで割るだけでは足りず、電子移動数6とファラデー定数を含める必要がある。12は電子数を1として求めた値に近い。",
      "イ": "二クロム酸イオンの還元と臭化物イオンの酸化を合わせると、反応1回に電子6個が移動し、起電力は1.4 − 1.1 = 0.3 Vである。logₑ K = 6F×0.3／(RT) ≈ 70となる。",
      "ウ": "起電力は表中の二つの還元電位の差0.3 Vである。電子数6を反映しても、298 Kで計算した自然対数は97に届かない。",
      "エ": "1.4 Vと1.1 Vは両方とも還元電位なので、片方を酸化に反転させて差を取る。足し合わせた電位を使うと平衡定数の自然対数が大きくなりすぎる。",
      "オ": "臭素の半反応を3倍して電子数を合わせても、標準電極電位は3倍にならない。全反応の起電力0.3 Vと適切な電子数を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q027.webp"
    ],
    "imageAltTexts": [
      "二クロム酸イオンと臭素の還元の半反応及び298 Kでの標準電極電位の表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q028",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "二次反応の積分速度式",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "以下に示す反応は二次反応である。 \n\nNOBr（気体）→ NO（気体）+ (1／2)Br₂（気体）\n\n NOBr の初期濃度が2.5 × 10⁻² mol・L⁻¹のとき、この反応を開始してから1.0分後のNOBr の濃度として最も妥当なのはどれか。ただし、反応容器の体積は一定であるものとし、この温度における速度定数は2.0 mol⁻¹・L・s⁻¹であるとする。",
    "choices": {
      "ア": "2.4 × 10⁻² mol・L⁻¹",
      "イ": "8.1 × 10⁻³ mol・L⁻¹",
      "ウ": "6.3 × 10⁻³ mol・L⁻¹",
      "エ": "1.9 × 10⁻³ mol・L⁻¹",
      "オ": "8.1 × 10⁻⁴ mol・L⁻¹"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "濃度をCとすると二次反応では1／C = 1／C₀ + ktとなる。40 + 2.0×60 = 160の逆数を取って有効数字をそろえると6.3×10⁻³ mol・L⁻¹である。",
    "choiceExplanations": {
      "ア": "反応時間を1秒と取り違えると2.4×10⁻² mol・L⁻¹に近い値が得られる。速度定数は秒を単位にしているため、1.0分は60秒に換算する。",
      "イ": "初濃度の逆数は40 L・mol⁻¹で、60秒の反応でこれに120 L・mol⁻¹を加える。8.1×10⁻³ mol・L⁻¹では、逆数の増加が120にならない。",
      "ウ": "濃度をCとすると二次反応では1／C = 1／C₀ + ktとなる。40 + 2.0×60 = 160の逆数を取って有効数字をそろえると6.3×10⁻³ mol・L⁻¹である。",
      "エ": "濃度が1.9×10⁻³ mol・L⁻¹になるには、逆数が約526 L・mol⁻¹まで増える必要がある。60秒で求まる逆数は160 L・mol⁻¹である。",
      "オ": "速度式を濃度の逆数に変形すると、反応時間に比例して増える量はkt = 120である。初期の40を足すと、その逆数は8.1×10⁻⁴より大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q029",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "酸解離平衡と指示薬の存在比",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある指示薬は水中で以下の反応式のような平衡状態をとる。pH が3.7及び5.7の水溶液に、この指示薬をそれぞれ少量加えた場合、HIn に対するIn⁻ の存在比の組合せとして最も妥当なのはどれか。 HIn + H₂O ⇄ In⁻ + H₃O⁺　　……① ただし、HIn とIn⁻ はそれぞれこの指示薬の分子型とイオン型であり、反応式①の平衡定数は10^(−4.7)である。また、指示薬を加えることによる体積変化は無視できるものとする。",
    "choices": {
      "ア": "1／10 と 10",
      "イ": "1／5 と 5",
      "ウ": "1／2 と 2",
      "エ": "5 と 1／5",
      "オ": "10 と 1／10"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "存在比[In⁻]／[HIn]はKₐ／[H₃O⁺] = 10^(pH − 4.7)である。pH 3.7では10⁻¹、pH 5.7では10¹となる。",
    "choiceExplanations": {
      "ア": "存在比[In⁻]／[HIn]はKₐ／[H₃O⁺] = 10^(pH − 4.7)である。pH 3.7では10⁻¹、pH 5.7では10¹となる。",
      "イ": "pHとpKₐの差が±1のとき、比の変化は5倍又は5分の1ではなく10倍又は10分の1である。",
      "ウ": "存在比はpH差の指数関数として変わる。pHがpKₐより1高いとイオン型は分子型の10倍になる。",
      "エ": "pHが高いほど[H₃O⁺]は小さくなり、酸の解離したイオン型の割合が増す。pH 5.7で比が1未満になる並びは合わない。",
      "オ": "設問が求めるのは分子型HInに対するイオン型In⁻の比である。この並びは分子型とイオン型の比を逆にしている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q030",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "分子結晶とフラーレンの構造",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "結晶に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．一般に、無極性分子からなる分子結晶は電気伝導率が低いが、極性分子からなる分子結晶は導体となる。\n㋑．水の結晶では、1個の水分子に対して近接した6個の水分子が正八面体の頂点方向から水素結合で結合している。\n㋒．フラーレンC₆₀の結晶は、C₆₀を一つの粒子とみなすと、常温では面心立方構造が最も安定となる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "常温でC₆₀を粒子とみなしたときの結晶は面心立方構造をとる。極性分子が一般に導体になるという説明と、氷の六配位はいずれも合わない。",
    "choiceExplanations": {
      "ア": "極性分子からなる結晶でも、電荷を運ぶ粒子が自由に移動できなければ導体にならない。分子が極性を持つことと導電性は別である。",
      "イ": "㋐の極性だけで導電性が決まるという説明は誤りである。㋑の通常の氷では、水分子は主に四面体型に四つの水素結合を作る。",
      "ウ": "㋒は妥当である。㋐の分子結晶では極性の有無だけから高い電気伝導性を導けない。",
      "エ": "㋒はフラーレンの常温での結晶構造に合う。通常の氷の近接水分子は四面体型であり、㋑の六配位ではない。",
      "オ": "常温でC₆₀を粒子とみなしたときの結晶は面心立方構造をとる。極性分子が一般に導体になるという説明と、氷の六配位はいずれも合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q031",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "オシロスコープのＸＹ表示とリサージュ図",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "オシロスコープに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「オシロスコープは、時間に対する入力信号（電圧）の波形を観察するだけでなく、二つのチャネルの入力信号をそれぞれ水平軸（X 軸）、垂直軸（Y 軸）に表示させることができる。X 軸、Y 軸のスケールを同一にし、正弦波交流電圧を入力信号とすると、オシロスコープには ㋐ 図と呼ばれる図形が表示される。この図形は二つの入力信号の ㋑ の比が整数となるときに静止した図形となる。二つの入力信号の周波数と振幅を同一にし、位相差をπ／2〔rad〕とすると、オシロスコープの画面には ㋒ 形の波形が表示される。」",
    "choices": {
      "ア": "リサージュ／周波数／円",
      "イ": "リサージュ／周波数／直線",
      "ウ": "リサージュ／振幅／直線",
      "エ": "サイクロイド／周波数／直線",
      "オ": "サイクロイド／振幅／円"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "二つの正弦波をＸ軸とＹ軸に割り当てるとリサージュ図が現れ、周波数比が整数のとき静止して見える。同じ周波数と振幅で位相差がπ／2なら、円になる。",
    "choiceExplanations": {
      "ア": "二つの正弦波をＸ軸とＹ軸に割り当てるとリサージュ図が現れ、周波数比が整数のとき静止して見える。同じ周波数と振幅で位相差がπ／2なら、円になる。",
      "イ": "同じ周波数と振幅でも、位相差がπ／2なら二つの成分は正弦と余弦となる。直線は同位相や逆位相のときに現れる。",
      "ウ": "静止したリサージュ図の形を決める条件の一つは周波数の比である。振幅の比だけでは、図形が繰り返して同じ軌跡を描くとは限らない。",
      "エ": "この観測図はリサージュ図である。サイクロイドは円が直線上を転がるとき円周上の点が描く軌跡である。",
      "オ": "等周波数、等振幅、位相差π／2で円になる点は合う。図形の呼称はリサージュ図で、静止条件に関わるのは振幅比より周波数比である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q032",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "走査型電子顕微鏡と元素分析",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "走査型電子顕微鏡に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．走査型電子顕微鏡は、細く絞られた電子線を走査しながら試料に照射し、二次電子あるいは反射電子を検出して試料表面の形態を観察する装置である。\n㋑．特性X 線検出器を備えた走査型電子顕微鏡を用いると、試料表面近傍の元素分析を行うことができる。\n㋒．走査型電子顕微鏡で金属試料を観察する場合には、電子線照射による帯電（チャージアップ）を抑えるための前処理を行うのが一般的である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "㋐のように電子線で表面を走査して表面形態を観察できる。㋑のように特性Ｘ線を検出すれば、その発生部位付近の元素分析もできる。",
    "choiceExplanations": {
      "ア": "細く絞った電子線で表面を走査し、二次電子や反射電子を検出する㋐は合う。特性Ｘ線を利用して元素を同定する㋑も成立する。",
      "イ": "㋐のように電子線で表面を走査して表面形態を観察できる。㋑のように特性Ｘ線を検出すれば、その発生部位付近の元素分析もできる。",
      "ウ": "㋐は合う。金属試料は電荷を逃がしやすいため、帯電防止のための導電性被覆が一般に必要になるのは非導電性試料である。",
      "エ": "特性Ｘ線のエネルギーは元素に固有なので、㋑の分析は可能である。形態観察の原理を述べた㋐も妥当である。",
      "オ": "特性Ｘ線による元素分析は妥当である。導電性の高い金属は導電接触を確保すれば帯電しにくく、絶縁体と同様の前処理を通常必要とするわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q033",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "両対数グラフの指数と係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "計測の結果得られた値X，Y に図のような関係があるとき、図示された範囲において X とY の関係を表す近似式として最も妥当なのはどれか。",
    "choices": {
      "ア": "Y = 4X",
      "イ": "Y = 5X",
      "ウ": "Y = (X／2)²",
      "エ": "Y = X²／3",
      "オ": "Y = X²／2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "図の点列はＸが10倍になるとＹが約100倍となり、二乗に比例する。X = 20付近でY ≈ 100となる係数は1／4で、Y = (X／2)²である。",
    "choiceExplanations": {
      "ア": "両対数グラフでY = 4Xを表す直線の傾きは1である。測定点はＸが一桁増えるとＹが約二桁増える傾向を示す。",
      "イ": "比例式Y = 5Xでは、Ｘが10倍になるとＹも10倍になる。両対数図の点列はそれより急な傾きを持つ。",
      "ウ": "図の点列はＸが10倍になるとＹが約100倍となり、二乗に比例する。X = 20付近でY ≈ 100となる係数は1／4で、Y = (X／2)²である。",
      "エ": "二乗に比例するとした点は合う。Y = X²／3ならX = 20で約133となり、図の測定点に比べ高めになる。",
      "オ": "Y = X²／2は傾きが合う一方、係数が大きい。X = 20で200となり図の約100とは合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q033.webp"
    ],
    "imageAltTexts": [
      "測定値ＸとＹの関係の両対数散布図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q034",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "熱陰極電離真空計の原理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "熱陰極電離真空計に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。「気体の電離現象を利用した真空計の一つに、熱陰極電離真空計がある。熱陰極電離真空計は10⁻³～10⁻⁹ Pa の広い圧力範囲で使用できることから真空計として広く用いられている。図に、多くの熱陰極電離真空計に採用されているベヤード‒アルパート型の電極配置を示す。加熱された ㋐ から電子が放出され、陰極－陽極間の電位差により電子が加速される。加速された電子が気体分子と衝突し、気体分子を電離する。電離によって生成された ㋑ はイオンコレクターにより収集される。熱陰極からの電子電流Iₑ が一定とすれば、イオンコレクターに流れるイオン電流Iᵢ は気体の分子密度n に比例する。すなわち Iᵢ = σℓnIₑ である。ここで、ℓは電子の走る距離、σは比例定数である。k をボルツマン定数、T を絶対温度とすると、気体の分子密度n と圧力p の間には p = ㋒ の関係があるので Iᵢ = ㋓ となり、イオン電流の大きさから圧力を求めることができる。」",
    "choices": {
      "ア": "陰極／正イオン／kT／n ／ σℓkTIₑ／p",
      "イ": "陰極／正イオン／nkT ／ σℓIₑp／(kT)",
      "ウ": "陰極／電子／kT／n ／ σℓkTIₑ／p",
      "エ": "陽極／正イオン／nkT ／ σℓIₑp／(kT)",
      "オ": "陽極／電子／kT／n ／ σℓkTIₑ／p"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "熱陰極から出た電子が気体分子に衝突し、正イオンが集められる。p = nkTをIᵢ = σℓnIₑに代入するとIᵢ = σℓIₑp／(kT)となる。",
    "choiceExplanations": {
      "ア": "電子が熱陰極から出て正イオンを作る点は合う。理想気体の関係はp = nkTなので圧力が上がるとイオン電流は増加する。",
      "イ": "熱陰極から出た電子が気体分子に衝突し、正イオンが集められる。p = nkTをIᵢ = σℓnIₑに代入するとIᵢ = σℓIₑp／(kT)となる。",
      "ウ": "熱陰極から電子が放出される点は合う。気体の電離で発生した正イオンをコレクターで回収し、その電流を測る。",
      "エ": "圧力とイオン電流の式は妥当である。加熱で電子を放出する電極は陽極ではなく陰極である。",
      "オ": "電子を放出するのは陰極で、コレクターに集めるのは正イオンである。また、この条件では圧力が高いほどイオン電流が大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q034.webp"
    ],
    "imageAltTexts": [
      "ベヤード・アルパート型電離真空計の陰極、陽極とイオンコレクター"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q035",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "二重スリットの光路差と明線",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "光の干渉に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「図Ⅰのように、距離d離れた位置にある二つのスリット（S₁、S₂）を平行光が通過すると、スリットから十分離れた位置（距離L）にあるスクリーンには明るい部分と暗い部分とが観察される。\nただし、スリットはいずれも十分小さく、dはLに比べて十分小さく、光は波長λの単色光とする。\n\nこのような明暗は、波の干渉で説明できる。スリットS₁及びS₂からスクリーン上の位置Pまでの距離は、図Ⅱのような幾何学的関係からそれぞれ、\n\nS₁P = √［L² + (x − d／2)²］ = L√［1 + ((x − d／2)／L)²］\nS₂P = √［L² + (x + d／2)²］ = L√［1 + ((x + d／2)／L)²］\n\nと表せる。スクリーン中央付近（x ≪ L）では近似的に |x ± d／2| ≪ Lが成立するため、S₂P − S₁P ≈ ㋐ となる。これが波長λの整数倍のとき、二つのスリットを通過した光の ㋑ によりスクリーンが ㋒ 見える。このことから、明線はx = ㋓（nは整数）の位置に観察される。」",
    "choices": {
      "ア": "dL／x ／ 強め合い ／ 明るく ／ dL／(nλ)",
      "イ": "dL／x ／ 弱め合い ／ 暗く ／ dL／(nλ)",
      "ウ": "xd／L ／ 強め合い ／ 明るく ／ nLλ／d",
      "エ": "xd／L ／ 弱め合い ／ 暗く ／ nLλ／d",
      "オ": "xL／d ／ 弱め合い ／ 暗く ／ ndλ／L"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "二つの平方根を近似すると、光路差は［(x + d／2)² − (x − d／2)²］／(2L) = xd／Lとなる。これがnλなら強め合って明るくなり、明線はx = nLλ／dに現れる。",
    "choiceExplanations": {
      "ア": "光路差が波長の整数倍なら強め合って明線となる。光路差はスクリーン中心からの距離xに比例し、dL／xのように反比例しない。",
      "イ": "スクリーン中央では二つの経路の長さが等しく、光路差はゼロになる。波長の整数倍の光路差では波の位相がそろい、強め合う。",
      "ウ": "二つの平方根を近似すると、光路差は［(x + d／2)² − (x − d／2)²］／(2L) = xd／Lとなる。これがnλなら強め合って明るくなり、明線はx = nLλ／dに現れる。",
      "エ": "㋐の光路差と㋓の位置の式は合っている。光路差が整数波長になると二つの光は同位相となり、弱め合うことはない。",
      "オ": "光路差は二つのスリットの間隔dに比例し、スクリーンまでの距離Lに反比例する。整数波長の光路差では明線が生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q035.webp"
    ],
    "imageAltTexts": [
      "二つのスリットとスクリーンの配置及び各スリットから点Ｐまでの光路の模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q036",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "二進数加算の範囲と桁の条件",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の符号なし２進数加算の筆算を満たす㋐～㋕の組合せは何通りあるか。",
    "choices": {
      "ア": "1通り",
      "イ": "2通り",
      "ウ": "3通り",
      "エ": "4通り",
      "オ": "6通り"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "結果の候補11㋔1㋕は十進数で26、27、30、31である。15との差が4桁で表せる最大値15以下になるのは11、12、15の三つである。",
    "choiceExplanations": {
      "ア": "結果は26、27、30のいずれかなら、15に4桁の非負二進数を足して表現できる。したがって一つだけには定まらない。",
      "イ": "㋔が0なら結果は26又は27で、どちらも作れる。㋔が1でも㋕が0なら30となり、4桁の加数15で作れる。",
      "ウ": "結果の候補11㋔1㋕は十進数で26、27、30、31である。15との差が4桁で表せる最大値15以下になるのは11、12、15の三つである。",
      "エ": "最後の二つの空欄を任意に選ぶと結果の形は四つできる。そのうち31の場合は加える数が16となり、4桁では表せない。",
      "オ": "二つの空欄に各0か1を入れる結果の形は最大でも四つである。4桁の加数の上限を使えばそこからさらに一つ減る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q036.webp"
    ],
    "imageAltTexts": [
      "一部の桁を伏せた符号なし二進数の加算の筆算"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q037",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "半順序関係と推移律",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "集合S = {a，b，c，d，e} に対し、半順序関係R を定義する。ここで、aRb，cRb，cRd， bRe，dRe が成り立っているとき、次のうちで成り立つものはいくつあるか。 aRc，aRd，aRe，bRd，cRe",
    "choices": {
      "ア": "1個",
      "イ": "2個",
      "ウ": "3個",
      "エ": "4個",
      "オ": "5個"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "aRbとbReからaRe、cRbとbReからcReが推移律により成立する。ほかの三つは、与えられた関係だけからは導けない。",
    "choiceExplanations": {
      "ア": "aRbとbReからaReが従う。cRbとbReからcReも従うので、一つに限られない。",
      "イ": "aRbとbReからaRe、cRbとbReからcReが推移律により成立する。ほかの三つは、与えられた関係だけからは導けない。",
      "ウ": "aReとcReは推移律で成立する。bとdが共にeに関係していることからbRdを導くことはできない。",
      "エ": "aからb、さらにeに至る関係はあるが、aからcやdに至る関係は与えられていない。成立が保証されるのはaReとcReである。",
      "オ": "半順序は全順序とは異なり、任意の二元が比較可能であることを要求しない。与えられた関係をつないで保証できるのは二つである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q038",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "シャノンエントロピー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ある日の天気について、晴れである確率は0.5、曇りである確率は0.3、雨である確率は0.2と予想されている。この日の天気についてのエントロピーとして最も妥当なのはどれか。ただし、log₂ 3 = 1.585，log₂ 5 = 2.322とする。",
    "choices": {
      "ア": "1.00ビット",
      "イ": "1.49ビット",
      "ウ": "2.64ビット",
      "エ": "4.91ビット",
      "オ": "5.06ビット"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "各事象の情報量をその確率で重み付けすると、−0.5 log₂0.5 − 0.3 log₂0.3 − 0.2 log₂0.2 ≈ 1.49ビットである。",
    "choiceExplanations": {
      "ア": "1.00ビットは二つの等確率な状態のエントロピーである。この分布には曇りと雨が別々の事象として含まれるため、晴れか否かだけで計算できない。",
      "イ": "各事象の情報量をその確率で重み付けすると、−0.5 log₂0.5 − 0.3 log₂0.3 − 0.2 log₂0.2 ≈ 1.49ビットである。",
      "ウ": "三つの事象からなる分布のエントロピーの上限はlog₂3 ≈ 1.585ビットである。2.64ビットはこの上限を超える。",
      "エ": "各天気の情報量を単純に足すのではなく、確率で重み付けする必要がある。4.91ビットは三事象の最大値を超える。",
      "オ": "エントロピーは−log₂ pの平均である。5.06ビットは重みを使った平均として取り得ない値である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q039",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "命題論理の恒真式",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "記号¬，→はそれぞれ否定、含意を表す論理記号とし、X，Yは命題記号とする。次の論理式のうち、トートロジー（恒真式）であるものはどれか。",
    "choices": {
      "ア": "((X → Y) → Y) → X",
      "イ": "¬X → (¬Y → X)",
      "ウ": "X → (Y → (Y → X))",
      "エ": "(¬(X → Y)) → ¬X",
      "オ": "(X → Y) → (Y → X)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Xが偽なら最も外側の含意は真である。Xが真ならY→Xが真になり、その外側の含意も真になるため、Xがどちらでも成立する。",
    "choiceExplanations": {
      "ア": "Xが偽、Yが真ならX→Yも(X→Y)→Yも真になる。最後の含意は真から偽への含意なので式全体は偽になる。",
      "イ": "XもYも偽なら¬Xと¬Yは真である。そのとき真の前件¬Yに対する後件Xが偽なので、外側の含意も偽になる。",
      "ウ": "Xが偽なら最も外側の含意は真である。Xが真ならY→Xが真になり、その外側の含意も真になるため、Xがどちらでも成立する。",
      "エ": "Xが真でYが偽ならX→Yは偽なので、前件¬(X→Y)は真である。後件¬Xが偽なので全体は偽になる。",
      "オ": "Xが偽でYが真ならX→Yは真であり、Y→Xは偽になる。この場合に全体が偽なので恒真式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q040",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "最大流と最小カット",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、頂点集合V = {s, 1, 2, 3, 4, t}と枝集合E ⊂ V × Vをもつ有向ネットワークG =（V，E）があり、各枝（i，j）∈ Eには単位時間当たりの流量の最大容量が設定されている。このとき、単位時間当たりに頂点sから頂点tに流すことが可能な最大流量はいくらか。",
    "choices": {
      "ア": "40",
      "イ": "45",
      "ウ": "50",
      "エ": "55",
      "オ": "60"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "三つの経路に10、15、20を流して計45を実現できる。頂点集合{s, 3}から外へ出る枝の容量合計も10 + 15 + 20 = 45なので、これが最大である。",
    "choiceExplanations": {
      "ア": "40の流れは作れるが、そこが上限ではない。s→1→2→tに10、s→3→2→tに15、s→3→4→tに20を流せる。",
      "イ": "三つの経路に10、15、20を流して計45を実現できる。頂点集合{s, 3}から外へ出る枝の容量合計も10 + 15 + 20 = 45なので、これが最大である。",
      "ウ": "50はsから出る二つの枝の容量合計である。ただし頂点3から次へ出られる容量は計35なので、この上限には達しない。",
      "エ": "sから直接出る枝の容量を全部足しても10 + 40 = 50である。55を送る流れは出発点の時点で成立しない。",
      "オ": "60はtに入る二つの枝の容量合計である。ネットワーク内部のカットには容量合計45のものがあるため、60は実現できない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q040.webp"
    ],
    "imageAltTexts": [
      "頂点ｓから頂点ｔへつながる有向ネットワークと各枝の容量"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q041",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "一様に帯電した円板の軸上電界",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "真空中に置かれた半径a の薄い円板に面密度σ で電荷が一様に分布している。このとき、円板の中心軸上にある円板からの距離がz である点での電界の大きさとして最も妥当なのはどれか。ただし、真空の誘電率をε₀とする。",
    "choices": {
      "ア": "[σ／(2ε₀)] z／√(a² + z²)",
      "イ": "[σa／(2ε₀)] z／(a² + z²)^(3／2)",
      "ウ": "[σ／(4ε₀)](z／√(a² + z²) − 1)",
      "エ": "[σ／(2ε₀)](1 − z／√(a² + z²))",
      "オ": "[σ／(2ε₀)](z／√(a² + z²) − 1)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "半径r、幅drの環状要素から、軸方向にσrz dr／[2ε₀(r² + z²)^(3／2)]が加わる。rを0からaまで積分するとσ[1 − z／√(a² + z²)]／(2ε₀)になる。",
    "choiceExplanations": {
      "ア": "z／√(a² + z²)は遠く離れるほど1に近づく。この選択肢の式では円板から無限に離れても電界が消えない。",
      "イ": "半径aの位置の一つのリングだけで円板全体を置き換えることはできない。半径0からaまで、各環状要素の寄与を面積で重み付けして積分する。",
      "ウ": "σを正として電界の大きさを求めるなら、括弧は1 − z／√(a² + z²)の順になる。また、円板直前の極限の係数はσ／(2ε₀)である。",
      "エ": "半径r、幅drの環状要素から、軸方向にσrz dr／[2ε₀(r² + z²)^(3／2)]が加わる。rを0からaまで積分するとσ[1 − z／√(a² + z²)]／(2ε₀)になる。",
      "オ": "zが正ならz／√(a² + z²)は1より小さい。この式はσが正のとき負になり、電界の大きさを表さない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q042",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "誘電体を挿入した平行平板コンデンサ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "平行平板コンデンサに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「真空中に置かれた面積S、極板間隔d の平行平板コンデンサに、極板と同じ面積である厚さ d／4で誘電率ε₁の誘電体板と厚さd／4で誘電率ε₂の誘電体板を、それぞれ極板に平行に挿入したとき、その静電容量は ㋐ である。誘電体を挿入したまま、両極板に一定電圧V を与えたとき、蓄えられる静電エネルギーは ㋑ であり、極板間に作用する引き合う力は、誘電体を挿入していない場合に両極板に一定電圧V を与えたときと比較して ㋒ 。ただし、真空の誘電率をε₀とし、ε₁，ε₂ > ε₀を満たすものとする。また、端効果は無視できるものとする。」",
    "choices": {
      "ア": "4S／{d(2／ε₀ + 1／ε₁ + 1／ε₂)} ／ 2SV²／{d(2／ε₀ + 1／ε₁ + 1／ε₂)} ／ 大きくなる",
      "イ": "4S／{d(2／ε₀ + 1／ε₁ + 1／ε₂)} ／ 2SV²／{d(2／ε₀ + 1／ε₁ + 1／ε₂)} ／ 小さくなる",
      "ウ": "4S／{d[1／ε₀ + 1／(2ε₁) + 1／(2ε₂)]} ／ 2SV²／{d[1／ε₀ + 1／(2ε₁) + 1／(2ε₂)]} ／ 大きくなる",
      "エ": "4S／{d[1／ε₀ + 1／(2ε₁) + 1／(2ε₂)]} ／ 2SV²／{d[1／ε₀ + 1／(2ε₁) + 1／(2ε₂)]} ／ 小さくなる",
      "オ": "4S／{d[1／ε₀ + 1／(2ε₁) + 1／(2ε₂)]} ／ [dV²／(2S)][1／ε₀ + 1／(2ε₁) + 1／(2ε₂)] ／ 大きくなる"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "真空層の合計厚さはd／2、各誘電体層はd／4なので、三層を直列に扱うと㋐の容量を得る。エネルギーはCV²／2で、容量が増すと一定電圧での極板の電荷と引力も増す。",
    "choiceExplanations": {
      "ア": "真空層の合計厚さはd／2、各誘電体層はd／4なので、三層を直列に扱うと㋐の容量を得る。エネルギーはCV²／2で、容量が増すと一定電圧での極板の電荷と引力も増す。",
      "イ": "容量とエネルギーは正しく求められている。一定電圧では電荷Q = CVが増え、真空層に接する極板の引力は小さくならない。",
      "ウ": "引力が増すという向きは合う。この容量式は、各層の厚さを直列和に入れると分母が正しい式の半分であり、容量が2倍に過大評価される。",
      "エ": "誘電体層を含めた直列和から求める容量はこの値より小さい。容量が挿入前より増すため、一定電圧での引力は増す。",
      "オ": "このエネルギー式は容量を分母に置いた形であり、一定電圧に対するCV²／2とは異なる。真空層厚d／2と誘電体層厚d／4ずつを使った直列和が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q043",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "巻数比と直列接続したコイル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "コイルのインダクタンスに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「環状鉄心に、コイル1及びコイル2が図のように巻かれている。コイル1の巻き数及び自己インダクタンスをN₁，L₁、コイル2の巻き数N₂をN₁の2倍とした場合、コイル2の自己インダクタンスL₂は ㋐ 、コイル1及びコイル2の相互インダクタンスは ㋑ である。 ⒷⒹ間を短絡して接続したコイルのⒶⒸ間の自己インダクタンスは ㋒ である。ただし、鉄心の飽和及び漏れ磁束は無視できるものとする。」",
    "choices": {
      "ア": "2L₁／L₁／L₁",
      "イ": "2L₁／L₁／4L₁",
      "ウ": "4L₁／2L₁／L₁",
      "エ": "4L₁／2L₁／3L₁",
      "オ": "4L₁／2L₁／9L₁"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "L₂ = 4L₁で、漏れ磁束を無視すると相互インダクタンスの大きさは2L₁である。図の接続では二つの起磁力が打ち消し合う向きなので、合成はL₁ + 4L₁ − 4L₁ = L₁となる。",
    "choiceExplanations": {
      "ア": "同じ鉄心で自己インダクタンスは巻数の二乗に比例する。コイル2の巻数は2倍なので、自己インダクタンスも2倍ではなく4倍になる。",
      "イ": "巻数比が2なら自己インダクタンスの比は4である。完全結合では相互インダクタンスの大きさも√(L₁L₂) = 2L₁となる。",
      "ウ": "L₂ = 4L₁で、漏れ磁束を無視すると相互インダクタンスの大きさは2L₁である。図の接続では二つの起磁力が打ち消し合う向きなので、合成はL₁ + 4L₁ − 4L₁ = L₁となる。",
      "エ": "最初の二つの値は合う。逆向きの直列接続に対して5L₁から差し引くのは相互インダクタンスの2倍で、3L₁にはならない。",
      "オ": "9L₁は二つの巻線が同じ向きの磁束をつくるよう直列接続した場合の値である。図の接続では逆向きに起磁力が働く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q043.webp"
    ],
    "imageAltTexts": [
      "環状鉄心に二つのコイルを巻いたときの巻き方向と端子配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q044",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "磁性体と空隙の境界条件",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、幅が一定である空隙を持つ無限に広い比透磁率μᵣ の磁性体がある。磁性体内に空隙の法線に対してなす角がθ となる方向に大きさがH である一様な磁界をかけたとき、空隙中の磁界の大きさとして最も妥当なのはどれか。ただし、空隙は真空であるものとする。",
    "choices": {
      "ア": "H",
      "イ": "μᵣH",
      "ウ": "μᵣH／cosθ",
      "エ": "H√[1 + (μᵣ² − 1)cos²θ]",
      "オ": "H√[1 + (μᵣ² − 1)sin²θ]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "法線方向ではBが連続なので空隙中のH成分はμᵣH cosθ、接線方向ではHが連続なのでH sinθである。二乗和の平方根を取るとこの式になる。",
    "choiceExplanations": {
      "ア": "境界に垂直な成分は磁束密度Bが連続なので、透磁率の変化に応じて磁界Hの垂直成分が変化する。全成分をそのままHに保つことはできない。",
      "イ": "μᵣHは磁界が法線方向を向くθ = 0での値である。斜めにかかる磁界には、連続のまま残る接線成分もある。",
      "ウ": "この式はθが90°に近づくと発散する。磁界が境界に平行なら接線方向のHが連続なので、空隙中の大きさもHである。",
      "エ": "法線方向ではBが連続なので空隙中のH成分はμᵣH cosθ、接線方向ではHが連続なのでH sinθである。二乗和の平方根を取るとこの式になる。",
      "オ": "比透磁率が掛かるのは境界の法線方向の成分である。θは法線から測るので、その成分に掛かるのはsinθではなくcosθである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q044.webp"
    ],
    "imageAltTexts": [
      "斜めの空隙を持つ磁性体に加えた磁界と空隙の法線の角度"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q045",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "円柱導体に流入する電力とジュール熱",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、十分に長い円柱形導体があり、円柱の中心軸方向の電流が均一に流れている。\n導体表面上の点における電界をE、磁界をH、導体の単位長さ当たりの側面積をAとしたとき、この導体から単位長さ当たり生じるジュール熱を表した式として最も妥当なのは次のうちではどれか。\nなお、導体の半径をa、抵抗率をρ、流れている電流の大きさをIとすると、E及びHの大きさは次式で表される。\n\n|E| = ρI／(πa²)\n|H| = I／(2πa)",
    "choices": {
      "ア": "|E|²",
      "イ": "|E||H|",
      "ウ": "|E|A",
      "エ": "|E × H|A",
      "オ": "(E・H)A"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "E × Hは導体内へ向かう電力流密度であり、単位長さ当たりの側面積Aとの積が発熱率になる。式にA = 2πaを入れると抵抗損失ρI²／(πa²)が得られる。",
    "choiceExplanations": {
      "ア": "局所的な体積当たりの発熱率は電界二乗を抵抗率で割った値である。単位長さ当たりの発熱には断面積も掛ける必要がある。",
      "イ": "導体表面でEとHが直交するとき、その大きさの積は面積当たりの電力流密度である。単位長さ当たりの電力にするにはその側面積が必要である。",
      "ウ": "電界と面積を掛けただけでは電力の次元にならない。電磁場から導体へ流入する電力密度には磁界も関わる。",
      "エ": "E × Hは導体内へ向かう電力流密度であり、単位長さ当たりの側面積Aとの積が発熱率になる。式にA = 2πaを入れると抵抗損失ρI²／(πa²)が得られる。",
      "オ": "軸方向の電界と周方向の磁界は直交するので内積はゼロである。発熱に対応するのは外積の大きさと側面積の積である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q045.webp"
    ],
    "imageAltTexts": [
      "円柱導体を流れる電流と表面での電界と磁界の向き"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q046",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "テブナン等価回路と負荷電流",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような回路の端子対a‒b に対して、抵抗値が0.5 Ω の抵抗を接続したとき、この抵抗を流れる電流I の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "0.5 A",
      "イ": "1.0 A",
      "ウ": "1.5 A",
      "エ": "2.0 A",
      "オ": "2.5 A"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "開放時に電流源の9 Aは上側の10 Ωへ4 A、下側の8 Ωへ5 Aに分かれ、1 Vの電源も合わせて端子電圧が10 Vになる。等価抵抗4.5 Ωに負荷0.5 Ωを直列に加えるとI = 10／5 = 2 Aである。",
    "choiceExplanations": {
      "ア": "開放端子電圧は1 Vの電源だけでは決まらず、9 Aの電流源による電位差も加わる。等価回路の全抵抗5 Ωに対する0.5 Aとはつり合わない。",
      "イ": "電源を無効化したときの端子間抵抗は、9 Ωの二枝の並列で4.5 Ωとなる。負荷を含む5 Ωにかかる等価電圧は5 Vではなく10 Vである。",
      "ウ": "負荷接続時の電流を1.5 Aとすると、等価回路の直列抵抗5 Ωには7.5 Vしかかからない。二つの電源がつくる開放端子電圧は10 Vである。",
      "エ": "開放時に電流源の9 Aは上側の10 Ωへ4 A、下側の8 Ωへ5 Aに分かれ、1 Vの電源も合わせて端子電圧が10 Vになる。等価抵抗4.5 Ωに負荷0.5 Ωを直列に加えるとI = 10／5 = 2 Aである。",
      "オ": "負荷を含めた直列抵抗は5 Ωであり、2.5 Aには12.5 Vが必要である。回路の開放端子電圧はこの値より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q046.webp"
    ],
    "imageAltTexts": [
      "二つの電源と抵抗を含む回路の端子間に接続された0.5オームの抵抗"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q047",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "ＲＬ回路の過渡電流と発生熱",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "過渡現象に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。「自己インダクタンスL のコイル、抵抗値R₁，R₂の二つの抵抗、電圧E の電源、スイッチS から構成される図のような回路において、コイルに電流が流れていない状態からスイッチS を閉じて電源から回路に電流を流した。スイッチS を閉じた直後の時刻t を0とした場合、抵抗値R₁の抵抗に流れる電流i_R₁は ㋐ である。その後、十分に時間が経過するとi_R₁は0 A になる。この間、抵抗値R₁の抵抗で発生するジュール熱は ㋑ である。ただし、閉じたスイッチS の抵抗値は無視するものとする。」",
    "choices": {
      "ア": "(E／R₂)exp(−R₁t／L) ／ LE²／(2R₂²)",
      "イ": "[E／(R₁ + R₂)]exp[−(R₁ + R₂)t／L] ／ LE²／[2R₁(R₁ + R₂)]",
      "ウ": "[E／(R₁ + R₂)]exp[−(R₁ + R₂)t／L] ／ R₁LE²／[2(R₁ + R₂)³]",
      "エ": "[E／(R₁ + R₂)]exp[−R₁R₂t／{L(R₁ + R₂)}] ／ LE²／[2R₂(R₁ + R₂)]",
      "オ": "[E／(R₁ + R₂)]exp[−R₁R₂t／{L(R₁ + R₂)}] ／ LE²／[2(R₁ + R₂)²]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "初期電流はE／(R₁ + R₂)、指数減衰の係数はコイルから見た並列抵抗R₁R₂／(R₁ + R₂)をLで割った値である。i_R₁²R₁を時間で積分するとLE²／[2R₂(R₁ + R₂)]になる。",
    "choiceExplanations": {
      "ア": "投入直後のコイル電流はゼロで、抵抗R₁とR₂の直列経路に電流が流れる。R₁の電流の初期値はE／(R₁ + R₂)である。",
      "イ": "初期電流は合うが、時定数に用いるのは電源を短絡してコイルの端子から見た等価抵抗である。R₁とR₂はその端子からは並列になる。",
      "ウ": "この熱量はR₁とR₂を直列にした値を指数の係数として積分した場合に対応する。コイルから見た抵抗はR₁R₂／(R₁ + R₂)なので、実際の減衰はより遅い。",
      "エ": "初期電流はE／(R₁ + R₂)、指数減衰の係数はコイルから見た並列抵抗R₁R₂／(R₁ + R₂)をLで割った値である。i_R₁²R₁を時間で積分するとLE²／[2R₂(R₁ + R₂)]になる。",
      "オ": "㋐の指数減衰の係数は合う。発熱を積分する際には発熱する側のR₁を掛けるので、分母にはR₂(R₁ + R₂)が残る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q047.webp"
    ],
    "imageAltTexts": [
      "コイルと二つの抵抗、電源とスイッチからなる過渡現象の回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q048",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "縦続した二端子対回路のインピーダンス行列",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "二端子対回路において、図Ⅰに示す電流と電圧の関係が［V₁，V₂］ᵀ = ((Zₐ, Zᵦ), (Z꜀, Zᵈ))［I₁，I₂］ᵀにあるとき、行列((Zₐ, Zᵦ), (Z꜀, Zᵈ))をインピーダンス行列（Z行列）と呼ぶ。図Ⅱのように、インピーダンス行列がそれぞれ((2 − j, 1), (1, 1))と((−j, −j), (−j, −j))である二つの二端子対回路を縦続接続したとき、この回路全体のインピーダンス行列として最も妥当なのはどれか。\nただし、jは虚数単位である。",
    "choices": {
      "ア": "((2 − 2j, 1 − j), (1 − j, 1 − j))",
      "イ": "((−1 − 3j, −1 − 3j), (−2j, −2j))",
      "ウ": "(1／2)((−1 − 3j, −2j), (−1 − 3j, −2j))",
      "エ": "(1／2)((3 − 3j, 1 − j), (1 − j, 1 − j))",
      "オ": "(1／2)((3 − j, −1 − j), (1 + j, −3 + j))"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "内部で左回路に流れ込む電流をi、右側外部端子電流をI₂とすると、V₂の接続条件から(1 − j)i = −I₁ − jI₂を得る。これを両外部端子の電圧式に入れると、この行列が得られる。",
    "choiceExplanations": {
      "ア": "この行列は二つのインピーダンス行列を足した値である。縦続接続では内部端子の電圧を等しくし、二つの向きの電流を逆にして消去する。",
      "イ": "各回路のインピーダンス行列の非対角成分は等しく、相反性は縦続接続でも保たれる。全体の非対角成分が一致しないためこの行列は合わない。",
      "ウ": "左側と右側の外部端子は異なる回路につながり、同じ電圧を持つとは限らない。内部端子の電圧の連続性を使って消去すると、対角成分も二つの行で異なる。",
      "エ": "内部で左回路に流れ込む電流をi、右側外部端子電流をI₂とすると、V₂の接続条件から(1 − j)i = −I₁ − jI₂を得る。これを両外部端子の電圧式に入れると、この行列が得られる。",
      "オ": "元の二回路はどちらも非対角成分が等しい相反回路である。接続後に二つの非対角成分が互いに符号反転した行列にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q048.webp"
    ],
    "imageAltTexts": [
      "二端子対回路の電圧と電流の定義及び二回路の縦続接続"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q049",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "単相交流の電圧降下と力率改善",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような電圧源、電線路及び負荷で構成される単相交流の電力系統において、次の①，②の値の組合せとして最も妥当なのはどれか。ただし、電圧源の電圧の実効値Eₛ〔V〕、電線路のリアクタンスx = 1 Ω、端子対a‒b における電圧の実効値Vₐᵦ = 100 V、負荷抵抗R = 4 Ω、負荷コイルのリアクタンスX_L = 3 Ω とする。\n\n① 電圧源の電圧の実効値Eₛ〔V〕\n②  端子対a‒b にコンデンサを挿入すると、負荷の力率が1となり、端子対a‒b の電圧が、 Vₐᵦ = 75√2 V となった。このときのコンデンサの無効電力〔var〕",
    "choices": {
      "ア": "113 V／689 var",
      "イ": "113 V／1350 var",
      "ウ": "124 V／689 var",
      "エ": "124 V／1350 var",
      "オ": "141 V／689 var"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "接続前の負荷電流は100／(4 + 3j) = 16 − 12jで、電源電圧の大きさは|100 + j(16 − 12j)| ≈ 113 Vである。接続後は負荷の無効電力を相殺するので、コンデンサは(75√2)²×3／25 = 1350 varを供給する。",
    "choiceExplanations": {
      "ア": "コンデンサ接続前の電圧源の実効値113 Vは合う。無効電力は接続後の負荷電圧75√2 Vで、負荷コイルの消費する無効電力を打ち消す量になる。",
      "イ": "接続前の負荷電流は100／(4 + 3j) = 16 − 12jで、電源電圧の大きさは|100 + j(16 − 12j)| ≈ 113 Vである。接続後は負荷の無効電力を相殺するので、コンデンサは(75√2)²×3／25 = 1350 varを供給する。",
      "ウ": "線路リアクタンスと負荷電流を掛けた複素電圧を加えると、電源電圧は112 + 16j Vである。その実効値は124 Vにならない。",
      "エ": "コンデンサの無効電力の大きさ1350 varは合う。接続前の電源電圧は線路の複素電圧降下と100 Vの負荷電圧をベクトルで足した大きさで求める。",
      "オ": "電圧の大きさだけを個別に加えると、位相を無視することになる。無効電力も接続後の負荷電圧に対して求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q049.webp"
    ],
    "imageAltTexts": [
      "単相交流における電圧源、線路リアクタンスと負荷"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q050",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "理想変圧器のインピーダンス換算",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような理想変圧器を含む回路において、一次側と二次側の電流İ₁，İ₂〔A〕及び二次側で消費される電力P〔W〕の組合せとして最も妥当なのはどれか。\nただし、単相交流電圧源の電圧V̇₁ = 100 V、一次側の抵抗R₁ = 12 Ω、二次側の抵抗R₂ = 2 Ω、コイルのリアクタンスX_L = 5 Ω、変圧器一次側巻数N₁ = 100、二次側巻数N₂ = 50とする。また、jは虚数単位とする。",
    "choices": {
      "ア": "2.5 − j2.5 ／ 5.0 − j5.0 ／ 100",
      "イ": "2.5 − j2.5 ／ 5.0 − j5.0 ／ 100 + j250",
      "ウ": "2.5 − j2.5 ／ 10 − j10 ／ 400",
      "エ": "4.5 − j2.8 ／ 9.0 − j5.6 ／ 225",
      "オ": "4.5 − j2.8 ／ 9.0 − j5.6 ／ 225 + j562"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "二次側インピーダンスを巻数比の二乗4倍で一次側へ換算すると、全体は20 + 20j Ωになる。I₁は2.5 − 2.5j A、I₂はその2倍で、有効電力は|I₂|²×2 = 100 Wである。",
    "choiceExplanations": {
      "ア": "二次側インピーダンスを巻数比の二乗4倍で一次側へ換算すると、全体は20 + 20j Ωになる。I₁は2.5 − 2.5j A、I₂はその2倍で、有効電力は|I₂|²×2 = 100 Wである。",
      "イ": "二つの電流は合う。100 + 250jは二次側の複素電力であり、Wで表す消費電力はその実部の100である。",
      "ウ": "巻数比の二乗4はインピーダンスの換算に使う。電流の二次側への換算は一次側電流の2倍なので、I₂は10 − 10jにはならない。",
      "エ": "二次側の抵抗だけでなくコイルのリアクタンスも4倍して一次側へ換算する。一次に見える全体のインピーダンスの大きさを使うと、この電流値にはならない。",
      "オ": "この電流値は巻数比で二次側のインピーダンスを換算した結果に合わない。また、二次側の消費電力は複素電力の実部に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q050.webp"
    ],
    "imageAltTexts": [
      "理想変圧器の一次側と二次側の結線、巻数及び各素子"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q051",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "打抜き時のせん断面積",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、直径d が20 mm である円形パンチを用いて厚さが一定の板を打ち抜くことを考える。パンチに作用する荷重W の最大値が60 kN であるとき、このパンチで打ち抜くことのできる板の厚さt の最大値として最も妥当なのはどれか。ただし、板のせん断強さを200 MPa、円周率を3とする。",
    "choices": {
      "ア": "1 mm",
      "イ": "2 mm",
      "ウ": "3 mm",
      "エ": "5 mm",
      "オ": "10 mm"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "せん断面は直径20 mmの穴の周に沿うので、面積はπdt = 60t mm²である。せん断強さ200 N/mm²を掛けた荷重が60000 Nになるtは5 mmである。",
    "choiceExplanations": {
      "ア": "せん断面積は円周πdと板厚の積である。1 mmの板に必要な荷重は200×60×1 = 12 kNであり、最大荷重には余裕がある。",
      "イ": "2 mmなら円筒状のせん断面積が120 mm²で、必要な荷重は24 kNとなる。上限の60 kNまで厚くすることができる。",
      "ウ": "3 mmの板を打ち抜く荷重は200×60×3 = 36 kNで、60 kNに達しない。ここで問われるのは打抜き可能な最大厚さである。",
      "エ": "せん断面は直径20 mmの穴の周に沿うので、面積はπdt = 60t mm²である。せん断強さ200 N/mm²を掛けた荷重が60000 Nになるtは5 mmである。",
      "オ": "10 mmではせん断面積が600 mm²で、必要荷重が120 kNになる。パンチが出せる最大荷重の2倍である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q051.webp"
    ],
    "imageAltTexts": [
      "円形パンチで板を打ち抜くときの直径、荷重と板厚"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q052",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "両端固定棒の軸方向剛性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、長さℓ（= a + b）、断面積A、ヤング率E の一様な棒の両端が、軸力が生じないように剛体壁に水平に固定されている。棒の点P（断面中心）に荷重W を軸方向に加えた時のP の変位量として最も妥当なのはどれか。ただし、棒の自重は無視できるものとする。",
    "choices": {
      "ア": "aW／(AE)",
      "イ": "bW／(AE)",
      "ウ": "aℓW／(AEb)",
      "エ": "abW／(AEℓ)",
      "オ": "bℓW／(AEa)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "左右の部分の軸方向剛性はAE／aとAE／bで、同じ変位に対して復元力を足せる。したがって変位はW／(AE／a + AE／b) = abW／(AEℓ)である。",
    "choiceExplanations": {
      "ア": "aW／(AE)は長さaの部分だけで荷重Wを受けた場合の変位である。実際には右側の部分にも軸力が生じる。",
      "イ": "長さbの部分だけを使った式である。点Ｐを変位させると両側の棒にひずみが生じ、復元力を分担する。",
      "ウ": "両側の部分は点Ｐの変位が同じなので、剛性を足してから全荷重を割る。この式は区間を左右入れ替えると異なり、対称な境界条件に合わない。",
      "エ": "左右の部分の軸方向剛性はAE／aとAE／bで、同じ変位に対して復元力を足せる。したがって変位はW／(AE／a + AE／b) = abW／(AEℓ)である。",
      "オ": "右側の長さbを基準とする式になっている。正しい変位式は両区間の長さaとbに対して対称である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q052.webp"
    ],
    "imageAltTexts": [
      "固定端を持つ棒、荷重を加える点Ｐと左右二つの区間"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q053",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "両端固定の段付き棒の熱応力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、BC 部分の長さℓ₁が0.6 m、断面積A₁が600 mm²、 CD 部分の長さℓ₂が0.4 m、断面積A₂が2000 mm²であり、20 ℃のときに軸力が生じないように両端が剛体壁に水平に固定された段付き棒BCD がある。この棒が一様に70 ℃まで上昇したときの剛体壁から受ける反力の大きさとして最も妥当なのはどれか。ただし、この棒材のヤング率を200 GPa、線膨張係数を10 × 10⁻⁶/K とし、A₁，A₂は温度の上昇による変化はないものとし、棒の自重を無視するものとする。また、BC 部とCD 部の断面に作用する応力はそれぞれ一様であるものとする。",
    "choices": {
      "ア": "33.3 kN",
      "イ": "66.7 kN",
      "ウ": "83.3 kN",
      "エ": "100.0 kN",
      "オ": "133.3 kN"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "自由熱膨張量は10×10⁻⁶×50×1 = 0.5 mmである。二部分の弾性収縮の和F[ℓ₁／(EA₁) + ℓ₂／(EA₂)]をこれに等置するとF ≈ 83.3 kNになる。",
    "choiceExplanations": {
      "ア": "自由熱膨張量は全長1 mに対して0.5 mmである。反力33.3 kNでは段付き棒の弾性収縮が約0.2 mmにとどまる。",
      "イ": "66.7 kNに対する弾性収縮は約0.4 mmである。固定長を保つには、温度上昇による自由熱膨張0.5 mmを相殺する必要がある。",
      "ウ": "自由熱膨張量は10×10⁻⁶×50×1 = 0.5 mmである。二部分の弾性収縮の和F[ℓ₁／(EA₁) + ℓ₂／(EA₂)]をこれに等置するとF ≈ 83.3 kNになる。",
      "エ": "断面積が異なるため、二部分の軸方向の柔らかさをそれぞれ計算する。100 kNでは弾性収縮の合計が0.6 mmになり、熱膨張量と合わない。",
      "オ": "133.3 kNなら弾性収縮の合計は約0.8 mmとなる。固定条件は、二部分を合わせた熱伸びの0.5 mmだけ縮ませる式で求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q053.webp"
    ],
    "imageAltTexts": [
      "固定された段付き棒ＢＣＤの区間長と断面積の表示"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q054",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "曲げとねじりを受ける軸",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような直径D が0.1 m、幅方向の中央面から軸受の中央面までの距離L が0.1 m であるベルト車において、引張側の張力の大きさP₁及びゆるみ側の張力の大きさP₂がそれぞれ900 N，100 N、ベルト車の重量W が100 N のとき、相当ねじりモーメントの大きさとして最も妥当なのはどれか。ただし、ベルトは水平に張られているものとする。なお、軸の許容せん断応力の大きさがτₐ のとき、相当ねじりモーメントをT とすると、軸径の最小値 dmin を求めるには次式が用いられる。 dₘᵢₙ = ∛(16T／(πτₐ))",
    "choices": {
      "ア": "40 Nm",
      "イ": "8√101 Nm",
      "ウ": "10√101 Nm",
      "エ": "16√13 Nm",
      "オ": "30√13 Nm"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "曲げは水平100 Nm、鉛直10 Nmで、ねじりは張力差に半径を掛けた40 Nmである。相当ねじりモーメントは√(100² + 10² + 40²) = 30√13 Nmになる。",
    "choiceExplanations": {
      "ア": "二つの張力の差800 Nに半径0.05 mを掛けると、ねじりモーメントは40 Nmになる。相当ねじりモーメントは曲げの寄与も含める。",
      "イ": "ベルトの張力の和1000 Nに加え、鉛直荷重100 Nの曲げも考える。さらに、曲げモーメントとねじりモーメントは二乗和で合成する。",
      "ウ": "10√101 Nmは水平荷重と鉛直荷重がつくる曲げモーメントの合成値である。ねじりモーメント40 Nmの寄与が含まれていない。",
      "エ": "重量とベルト張力による合成曲げモーメントだけで約100.5 Nmになる。16√13 Nmでは曲げだけの値よりも小さくなってしまう。",
      "オ": "曲げは水平100 Nm、鉛直10 Nmで、ねじりは張力差に半径を掛けた40 Nmである。相当ねじりモーメントは√(100² + 10² + 40²) = 30√13 Nmになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q054.webp"
    ],
    "imageAltTexts": [
      "ベルト車の直径、軸受までの距離とベルトの張力"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q055",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "クレーンの支点反力と部材力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような部材AB と部材AC のなす角θ₁が30°、部材BC と水平面のなす角 θ₂が60°、部材AB の長さL が10 m のクレーンを簡素化したモデルにおいて、点C に荷重P の吊荷がある場合、点B の反力の大きさF_B と軸BC の軸力の大きさN_BC の組合せとして最も妥当なのはどれか。ただし、各部材の自重は無視するものとする。",
    "choices": {
      "ア": "(3／2)P ／ (√3／2)P",
      "イ": "(3／2)P ／ √3P",
      "ウ": "(3／2)P ／ (5√3／4)P",
      "エ": "2P ／ √3P",
      "オ": "2P ／ (5√3／4)P"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ＣはＡから水平方向に3L／2離れているため、Ａ周りのモーメントからF_B = 3P／2である。Ｂの鉛直方向のつり合いからN_BC = F_B／sin60° = √3Pとなる。",
    "choiceExplanations": {
      "ア": "Ｃの水平位置から、Ｂの反力は3P／2で合う。部材ＢＣの鉛直成分がこの反力をつり合わせるので、部材力は反力をsin60°で割る。",
      "イ": "ＣはＡから水平方向に3L／2離れているため、Ａ周りのモーメントからF_B = 3P／2である。Ｂの鉛直方向のつり合いからN_BC = F_B／sin60° = √3Pとなる。",
      "ウ": "反力は3P／2で合うが、5√3P／4の鉛直成分は15P／8である。これは節点Ｂの鉛直反力とつり合わない。",
      "エ": "軸力√3Pは合う。Ｃの水平距離は2Lではなく、二本の傾斜から3L／2になるのでＢの反力は2Pにはならない。",
      "オ": "Ａ周りのモーメントに用いる腕はＣまでの水平距離3L／2である。Ｂの反力を2Pとした時点でつり合いを満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q055.webp"
    ],
    "imageAltTexts": [
      "クレーンを簡素化した三角形の部材と支点、吊荷"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q056",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "レイノルズ数と模型実験の相似",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "レイノルズ数に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「レイノルズ数は、流れの ㋐ と粘性力との比を表す無次元数であり、乱流と層流とを判別する指標として用いられる。例えば、水平に置かれた内径6 mm のまっすぐな円管内を平均流速0.34 m/s の水が流れているとき、この流れは ㋑ であると考えられる。また、レイノルズの相似則を用いて模型実験を行うと、実際の現象を予測できることが知られている。例えば、速度90 km/h で走行する自動車のまわりの流れを調べるためには、この自動車の模型を流速16 m/s の水中に入れて実験を行う場合、模型の代表長さは自動車の代表長さの ㋒ 倍でよいことになる。ただし、水及び空気の動粘度（動粘性係数）はそれぞれ1.0 mm²/s，15.6 mm²/s とし、臨界レイノルズ数は2300とする。」",
    "choices": {
      "ア": "圧力／層流／1／14",
      "イ": "圧力／乱流／1／12",
      "ウ": "慣性力／層流／1／10",
      "エ": "慣性力／層流／1／8",
      "オ": "慣性力／乱流／1／6"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "レイノルズ数は慣性力と粘性力の比で、管内流は2040なので層流である。実車を25 m/sとし、両者のレイノルズ数を等しくすると模型の代表長さは25／(16×15.6) ≈ 1／10倍になる。",
    "choiceExplanations": {
      "ア": "レイノルズ数は圧力そのものと粘性力の比ではなく、流れの慣性力と粘性力の比を示す。円管の例が層流になる点は合う。",
      "イ": "管内流のレイノルズ数は0.34×0.006／10⁻⁶ = 2040である。臨界値2300より小さいので乱流とは判定しない。",
      "ウ": "レイノルズ数は慣性力と粘性力の比で、管内流は2040なので層流である。実車を25 m/sとし、両者のレイノルズ数を等しくすると模型の代表長さは25／(16×15.6) ≈ 1／10倍になる。",
      "エ": "慣性力と層流は合う。水と空気の動粘度の比に実車と模型の流速比も掛けるため、長さの比は1／8にはならない。",
      "オ": "円管流の2040は臨界値を下回る。模型の比を求める際にも動粘度比だけでなく16 m/sと25 m/sの速度差を反映する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q057",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "平行壁面間を動く平板の粘性抵抗",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、間隔20 mm の固定された平行な二つの壁面があり、壁面の間は、比重0.8、動粘度（動粘性係数）3.4 × 10⁻⁴ m²/s の油で満たされている。下方の壁面から高さ8 mm の位置にある面積0.12 m²の薄い平板を、壁面と平行な方向に速さ0.3 m/s で動かすときに必要な力の大きさとして最も妥当なのはどれか。ただし、水の密度を1.0 × 10³ kg/m³とし、壁面の間の流れは層流かつ定常状態で、速度分布は直線的であり、速度勾配は一定とする。また、壁面の奥行きは十分に長いものとし、平板にはせん断力のみ作用するものとする。",
    "choices": {
      "ア": "0.2 N",
      "イ": "0.5 N",
      "ウ": "2 N",
      "エ": "4 N",
      "オ": "6 N"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "片側ごとの粘性応力は0.272×0.3をすきまの長さで割った値である。両側を合計して面積0.12 m²を掛けると、力は約2.04 Nになる。",
    "choiceExplanations": {
      "ア": "油の粘性係数は密度と動粘度の積なので0.272 Pa・sになる。密度に比重0.8だけを代入すると、粘性係数を過少に見積もる。",
      "イ": "薄い平板の両側で、壁から平板まで直線的に速度が変わる。上側のすきまは12 mm、下側は8 mmで、それぞれのせん断力を加える。",
      "ウ": "片側ごとの粘性応力は0.272×0.3をすきまの長さで割った値である。両側を合計して面積0.12 m²を掛けると、力は約2.04 Nになる。",
      "エ": "二つの壁面からの距離を反映して、せん断力は面積とすきまの逆数の和に比例する。同じすきま8 mmを両側に使うと、力を過大に見積もる。",
      "オ": "壁間の流れには平板の両面が関わるが、速度勾配ごとに一度ずつせん断を計算する。所与の粘性係数と速度では合計は約2 Nである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q057.webp"
    ],
    "imageAltTexts": [
      "二つの壁面間にある平板の位置と油の速度分布"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q058",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "傾斜マノメータの拡大率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような傾斜マノメータにおいて、密度ρ のマノメータ液に気体による圧力p_A，p_B が作用している。p_A，p_B が等しいとき、基準面O−O′において液面の高さが等しい状態で釣り合っていたが、p_A が高くなり、圧力差p_A - p_B が生じたところ、円筒容器の液面はh₁下降し、傾斜管の液面はh₂上昇して、マノメータの読み取り値はℓ を示した。ℓがどれだけ増幅されたかを示す指標である拡大率がℓ／[(p_A − p_B)／(ρg)] で定義されるとき、円筒容器の断面積A、傾斜管の断面積 a 及び傾斜管の傾き角度θ を用いて拡大率を表したものとして最も妥当なのはどれか。ただし、g は重力加速度の大きさを表し、0 < θ < π／2 とする。また、気体の重量による影響は無視できるものとする。",
    "choices": {
      "ア": "(a／A + sinθ)⁻¹",
      "イ": "[a／A + (sinθ + 1)／2]⁻¹",
      "ウ": "(a／A)² + sinθ",
      "エ": "(a／A + cosθ + 1)⁻¹",
      "オ": "(a／A)² + cosθ + 1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "液体の体積保存よりAh₁ = aℓ、傾斜管の鉛直上昇はh₂ = ℓ sinθである。圧力差の水頭h₁ + h₂に対する読みℓの比は(a／A + sinθ)⁻¹になる。",
    "choiceExplanations": {
      "ア": "液体の体積保存よりAh₁ = aℓ、傾斜管の鉛直上昇はh₂ = ℓ sinθである。圧力差の水頭h₁ + h₂に対する読みℓの比は(a／A + sinθ)⁻¹になる。",
      "イ": "傾斜管の鉛直上昇は傾斜方向の変位ℓにsinθを掛けたものである。読みを変換する係数を(1 + sinθ)／2と平均する根拠はない。",
      "ウ": "断面積の比a／Aは容器の液面降下を計算する際に一乗で現れる。拡大率は読みを高さの差で割るので、和の逆数である。",
      "エ": "傾斜角は水平から測るため鉛直成分はℓ sinθとなる。容器側の降下はaℓ／Aであり、cosθや独立した定数1は加えない。",
      "オ": "容器と管の間で移動する液体の体積が等しいので、h₁／ℓ = a／Aである。水平からの傾斜角を使うためh₂／ℓにはsinθが現れる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q058.webp"
    ],
    "imageAltTexts": [
      "傾斜マノメータの断面積、圧力と二液面の高さの変化"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q059",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "ピトー管の動圧と流速",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、先端と側面にそれぞれ全圧孔と静圧孔の開いたピトー管が、無風の中、速さv で水平に直進する自動車の先端に、自動車の移動方向に平行になるよう設置されている。ピトー管の全圧孔と静圧孔がU 字管で連結されており、U 字管の底部には水が入れられている。U 字管内の水の液面差h が300 mm、水の密度が981.2 kg/m³、重力加速度の大きさが10 m/s²である。また、大気圧が1033.2 hPa、気温が300 K、空気の気体定数が287 J/（kg・K）であるとき、 v として最も妥当なのはどれか。ただし、全圧孔はよどみ点となり、静圧孔にかかる圧力は大気圧と等しくなる。また、全圧孔と静圧孔の高低差は無視することができ、静圧孔付近の流れは管に平行でその速さはv に等しいものとする。さらに、空気は非圧縮非粘性流体とし、摩擦損失は無視できるものとする。",
    "choices": {
      "ア": "21 m/s",
      "イ": "35 m/s",
      "ウ": "35√2 m/s",
      "エ": "70 m/s",
      "オ": "700／√10 m/s"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "大気圧と気温から空気密度を求めると約1.2 kg/m³である。動圧は(981.2 − 1.2)×10×0.30 = 2940 Paなので、これを1.2v²／2に等置すると70 m/sになる。",
    "choiceExplanations": {
      "ア": "水柱の高さ300 mmは0.30 mで、全圧と静圧の差は約2940 Paになる。空気密度約1.2 kg/m³に対して21 m/sの動圧では足りない。",
      "イ": "流速35 m/sの動圧は70 m/sのときの4分の1である。液面差とつり合う圧力差はその値より大きい。",
      "ウ": "動圧はρ空気 v²／2である。水柱の静水圧差から得る値をこの式に入れるとv²は4900となり、35√2はその半分のv²に相当する。",
      "エ": "大気圧と気温から空気密度を求めると約1.2 kg/m³である。動圧は(981.2 − 1.2)×10×0.30 = 2940 Paなので、これを1.2v²／2に等置すると70 m/sになる。",
      "オ": "700／√10 m/sは70 m/sの√10倍である。液面差300 mmを3 mと換算するなどして圧力差を10倍にすると、この大きさになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q059.webp"
    ],
    "imageAltTexts": [
      "ピトー管の全圧孔・静圧孔とＵ字管内の液面差"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q060",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "ラバールノズルと垂直衝撃波",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "圧縮性流体（理想気体）に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「図のように、二つの大きな圧力タンクA と圧力タンクB に接続されたラバールノズルがある。 A 内には静止したよどみ圧力P_A の理想気体が存在しており、B 内の圧力P_B をP_A よりも下げていくとA からB に向かって流れが生じた。スロート部で流れの圧力が臨界に達した後、更にP_B を下げていくと、ラバールノズルの拡大管路において垂直衝撃波が生じた。このとき、ラバールノズルのスロート部におけるマッハ数M_T について ㋐ が成り立つ。また、スロート部の下流かつ衝撃波の上流におけるマッハ数M₁について ㋑ が成り立ち、ノズル出口におけるマッハ数M₂について ㋒ が成り立つ。」",
    "choices": {
      "ア": "M_T = 1 ／ M₁ > 1 ／ M₂ < 1",
      "イ": "M_T = 1 ／ M₁ < 1 ／ M₂ > 1",
      "ウ": "M_T = 1 ／ M₁ < 1 ／ M₂ < 1",
      "エ": "M_T > 1 ／ M₁ > 1 ／ M₂ < 1",
      "オ": "M_T > 1 ／ M₁ < 1 ／ M₂ > 1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "臨界状態ではスロートでM_T = 1になり、拡大部で衝撃波に入るまで超音速となる。垂直衝撃波で亜音速になって出口へ至るのでM₁ > 1、M₂ < 1である。",
    "choiceExplanations": {
      "ア": "臨界状態ではスロートでM_T = 1になり、拡大部で衝撃波に入るまで超音速となる。垂直衝撃波で亜音速になって出口へ至るのでM₁ > 1、M₂ < 1である。",
      "イ": "スロートのマッハ数1は合う。垂直衝撃波は超音速の上流から亜音速の下流への遷移であり、㋑と㋒が逆になる。",
      "ウ": "垂直衝撃波の直後は亜音速になるが、波の上流では超音速でなければならない。拡大部でM₁ < 1のままという組合せは合わない。",
      "エ": "衝撃波前後の超音速と亜音速は合う。スロートは臨界に達した位置なのでマッハ数は1である。",
      "オ": "臨界に達したノズルの最小断面でマッハ数は1となる。垂直衝撃波を通るとマッハ数は1より小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q060.webp"
    ],
    "imageAltTexts": [
      "ラバールノズルのスロート、垂直衝撃波と圧力タンク"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q061",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "両端固定棒の集中荷重と変位",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、一様な断面の長さ2L の棒を剛体壁間に初期応力ゼロで固定し、右向きの軸方向集中荷重P を断面の図心に作用させた。P の載荷位置がx = L のとき、載荷位置の変位は u であった。P の載荷位置がx = L／2 のときの載荷位置の変位として最も妥当なのはどれか。ただし、棒の自重は無視できるものとする。",
    "choices": {
      "ア": "(3／8)u",
      "イ": "(1／2)u",
      "ウ": "(5／8)u",
      "エ": "(3／4)u",
      "オ": "(7／8)u"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "載荷点の変位はP／[AE／x + AE／(2L − x)]で、x(2L − x)に比例する。中央のL²に対しx = L／2では3L²／4なので、変位は3u／4である。",
    "choiceExplanations": {
      "ア": "長さL／2の左側だけで変位を評価することはできない。長さ3L／2の右側の棒も同じ変位を受けて荷重を分担する。",
      "イ": "荷重位置を中央から半分に移しても、変位が単純に半分になるわけではない。両側の棒の剛性AE／xとAE／(2L − x)の和が変位を決める。",
      "ウ": "変位はx(2L − x)に比例する。x = L／2ではその積は5L²／8ではなく3L²／4である。",
      "エ": "載荷点の変位はP／[AE／x + AE／(2L − x)]で、x(2L − x)に比例する。中央のL²に対しx = L／2では3L²／4なので、変位は3u／4である。",
      "オ": "変位と載荷位置の関係は直線でなく、固定端の剛性を反映した二次式になる。中央からL／2へ移すと変位は4分の1だけ減少する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q061.webp"
    ],
    "imageAltTexts": [
      "剛体壁に固定された棒の長さ、座標と軸方向集中荷重"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q062",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "片端固定梁の曲率ゼロ点",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような右支点にモーメント荷重M₀を受ける梁において曲率がゼロになる点の x 座標として最も妥当なのはどれか。ただし、図Ⅱのような梁の左及び右支点のたわみ角の大きさと向きは図に示されているとおりであり、図Ⅰ，Ⅱの梁の断面は一様で等しく、曲げ剛性は共にEI であり、梁の自重は無視できるものとする。",
    "choices": {
      "ア": "0",
      "イ": "L／3",
      "ウ": "L／2",
      "エ": "2L／3",
      "オ": "L"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "左端角を打ち消すため、左端には右端モーメントに対して逆符号で半分のモーメントが作用する。曲げモーメントは−M₀／2からM₀まで直線的に変化し、x = L／3で曲率がゼロになる。",
    "choiceExplanations": {
      "ア": "左端では回転を拘束するため支点モーメントが生じる。左端が曲率ゼロになるのは、ここで与えられた固定支点とは異なる条件である。",
      "イ": "左端角を打ち消すため、左端には右端モーメントに対して逆符号で半分のモーメントが作用する。曲げモーメントは−M₀／2からM₀まで直線的に変化し、x = L／3で曲率がゼロになる。",
      "ウ": "中央断面の曲げモーメントがゼロになるには、両端のモーメントの大きさが等しく符号が逆でなければならない。左側の大きさは右側の半分である。",
      "エ": "2L／3はゼロ点から右端までの距離である。設問の座標xは固定された左端から測る。",
      "オ": "右端にはモーメント荷重M₀が直接作用している。その断面の曲率の絶対値は|M₀|／EIでゼロにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q062.webp"
    ],
    "imageAltTexts": [
      "図Ⅰの片端固定梁と図Ⅱの単純梁の端部モーメント及びたわみ角"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q063",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "梁の曲げと主応力方向",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような集中荷重P を受ける一様な断面の単純梁を考える。y 軸の原点は中立軸位置とする。図中の点A のy 座標はゼロであり、点B と点C のy 座標は等しく、かつ正である。A， B，C における主軸（最大主応力が作用する方向）がx 軸となす角をそれぞれθ_A，θ_B，θ_C としたとき、それらの大小関係として最も妥当なのはどれか。ただし、なす角は鋭角とし、梁の自重は無視できるものとする。",
    "choices": {
      "ア": "θ_A > θ_B > θ_C",
      "イ": "θ_A > θ_C > θ_B",
      "ウ": "θ_B > θ_A > θ_C",
      "エ": "θ_B > θ_C > θ_A",
      "オ": "θ_C > θ_A > θ_B"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "中立軸のＡは曲げ垂直応力がゼロなので、純せん断でθ_A = 45°となる。ＢとＣのせん断応力は等しい一方、Ｂの引張応力が大きく、θ_A > θ_C > θ_Bとなる。",
    "choiceExplanations": {
      "ア": "Ａは中立軸上の純せん断により45°となり最大である。ＢはＣより荷重点に近く、同じ高さでも曲げによる引張応力が大きいため、主軸はＣより水平に近い。",
      "イ": "中立軸のＡは曲げ垂直応力がゼロなので、純せん断でθ_A = 45°となる。ＢとＣのせん断応力は等しい一方、Ｂの引張応力が大きく、θ_A > θ_C > θ_Bとなる。",
      "ウ": "Ｂには引張曲げ応力があり、その分だけ最大主応力の方向は水平方向へ近づく。純せん断状態のＡより角度が大きくなることはない。",
      "エ": "中立軸上では垂直応力がゼロである。ＢとＣのように曲げによる水平方向の引張を受ける点は、中立軸のＡより角度が小さくなる。",
      "オ": "Ｃの点は下側にあり、曲げによる引張応力が作用する。純せん断のＡと比べて主軸の傾きは小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q063.webp"
    ],
    "imageAltTexts": [
      "集中荷重を受ける単純梁の点Ａ、Ｂ、Ｃと中立軸"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q064",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "コンクリートの配合と養生",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "コンクリートに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．粘りの少ないフレッシュコンクリート中では、材料どうしが分離しやすくなる。密度の小さい水がコンクリート表面に上昇してくる現象をレイタンスといい、過度のレイタンスはコンクリートの強度や耐久性を下げるため、ブリーディングを行うことで材料分離抵抗性を改善する。\n㋑．細骨材率とは、全骨材量に対する細骨材量の絶対容積比を百分率で表した値である。コンクリートの配合修正を行う際には、土木学会コンクリート標準示方書に示されている概略値よりコンクリートに含まれる空気量が大きい場合は、コンクリートの細骨材率を大きくする。\n㋒．コンクリートは水セメント比が低くなるほど、強度は高くなり、耐久性や水密性も高くなる。そのため、水セメント比を設定する際には、強度や耐久性、水密性を満足する水セメント比のうち、最も小さい値を選び、原則として65 ％以下の値にする。\n㋓．コンクリートの養生の基本的な目的には、湿潤状態に保つこと、温度を制御すること、有害な作用に対して保護することがある。使用するセメントに応じて標準養生日数は変化するが、普通ポルトランドセメントや混合セメントB 種、早強ポルトランドセメントのいずれのセメントを用いても、日平均気温が低くなるほど、養生の期間は長くなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋑、㋒、㋓",
      "エ": "㋒",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "強度、耐久性、水密性から定まる水セメント比の上限のうち、小さいものを採用する。養生では湿潤と温度を管理し、日平均気温が低いほど所定の期間が長くなる。",
    "choiceExplanations": {
      "ア": "水が表面へ上がる現象はブリーディングで、レイタンスは表面に残る脆弱層である。空気量が概略値より大きい場合は、指定の配合修正では細骨材率を下げる。",
      "イ": "㋓のように気温が低いほど湿潤養生は長くとる。㋐は用語が逆で、㋑は細骨材率の調整方向を逆にしている。",
      "ウ": "㋒と㋓は妥当である。㋑は細骨材率の定義は合うが、空気量が概略値を上回る場合の修正の向きが異なる。",
      "エ": "㋒の水セメント比の決め方は妥当である。また、硬化が遅くなる低温下で養生期間が延びるとする㋓も含める必要がある。",
      "オ": "強度、耐久性、水密性から定まる水セメント比の上限のうち、小さいものを採用する。養生では湿潤と温度を管理し、日平均気温が低いほど所定の期間が長くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q065",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "土留め壁の切梁と根入れ長さ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "土留め（山留め）壁に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「地下構造物の構築など地盤を掘削する際、周辺地盤の崩壊を防ぐために掘削面の周囲に設ける壁を土留め（山留め）壁という。土留め壁は、一般的には壁及び棒部材で構成される。壁部材によく用いられる矢板は鉛直に配置される板で、連続的に打ち込まれる。 ㋐ は正対する壁面に反力を伝えるための部材である。土留め壁は①下部が固定できていること、② ㋐ が土留め壁からの力を支持できること、 ③土留め壁が背面土圧による曲げ応力に対して降伏しないこと、が求められる。土留め壁の設計は、 ①の条件を満たすように必要な壁の ㋑ を求めた後、②及び③の条件を満たすように ㋐ の配置位置を決定する。矢板のようなたわみ性の壁に作用する土圧は、たわみの大きさや形状によって変化する。 ㋑ の算出にはRankine 土圧論の ㋒ 土圧値が、 ㋐ などの断面決定には経験的な土圧分布による土圧値が用いられている。」",
    "choices": {
      "ア": "腹起し／剛性／静止",
      "イ": "腹起し／根入れ長さ／主働及び受働",
      "ウ": "切梁／剛性／静止",
      "エ": "切梁／根入れ長さ／主働及び受働",
      "オ": "切梁／根入れ長さ／静止"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "切梁は対向する土留め壁間に設けて反力を伝える。壁下端に必要な根入れ長さは、主働土圧と受働土圧を用いて算定する。",
    "choiceExplanations": {
      "ア": "腹起しは壁に沿って配置し、土圧を切梁などへ伝える部材である。対向壁の間で反力を伝える部材は切梁である。",
      "イ": "根入れ長さと主働・受働土圧は関係する。正対する壁に反力を伝えるのは、各壁に沿う腹起しではなく、その間に設ける切梁である。",
      "ウ": "切梁が正対する壁面へ反力を伝える点は合う。壁下部の固定を確認する量は根入れ長さで、背面と掘削側の主働・受働土圧を考える。",
      "エ": "切梁は対向する土留め壁間に設けて反力を伝える。壁下端に必要な根入れ長さは、主働土圧と受働土圧を用いて算定する。",
      "オ": "㋐と㋑は妥当である。根入れ部の安定を検討するときは、背面から押される側と地盤の抵抗が働く側で異なる土圧状態を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q066",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "水深と絶対圧の補正",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "海底に圧力計を設置したところ、台風通過前後の圧力計の計測値p（絶対圧）と大気圧p₀の時間変化が図のように得られた。計測開始から12時間が経過し、最も大気圧が低下したときの水深として最も妥当なのはどれか。ただし、海水の密度ρₛ は1030 kg/m³、重力加速度の大きさg は9.81 m/s²とする。",
    "choices": {
      "ア": "5.30 m",
      "イ": "8.86 m",
      "ウ": "12.9 m",
      "エ": "21.7 m",
      "オ": "30.6 m"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "12時間時点の海底圧力は220 kPa、大気圧は895 hPa = 89.5 kPaである。差130.5 kPaを1030×9.81 Pa/mで割ると約12.9 mになる。",
    "choiceExplanations": {
      "ア": "5.30 mでは海水による圧力が約54 kPaになる。絶対圧220 kPaと大気圧89.5 kPaの差は130.5 kPaである。",
      "イ": "8.86 mは大気圧89.5 kPaを海水柱に換算した高さである。水深には、海底の絶対圧から大気圧を引いた分を用いる。",
      "ウ": "12時間時点の海底圧力は220 kPa、大気圧は895 hPa = 89.5 kPaである。差130.5 kPaを1030×9.81 Pa/mで割ると約12.9 mになる。",
      "エ": "21.7 mは海底の絶対圧220 kPaをそのまま海水柱の高さに換算した値に近い。圧力の基準となる海面の大気圧を引く必要がある。",
      "オ": "海底の圧力は海面の大気圧と水柱による圧力の和である。大気圧をさらに足して換算すると、水深を過大に見積もる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q066.webp"
    ],
    "imageAltTexts": [
      "海底圧力と大気圧の時間変化を示す二つのグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q067",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "断面縮小部の圧力と吸上げ高さ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように十分に大きな水槽から細い円管を通じて水が空中に放出されている。放出管の断面縮小部のC 点に取り付けられた小管を、下方にある別の水槽に図のように設置したところ、小管内の水位がΔh だけ上昇した。Δh を表す式として最も妥当なのはどれか。ただし、一切のエネルギー損失を無視するものとし、A 点、B 点、C 点の断面積をそれぞれ、A_A，A_B，A_C とする。また、図中の一点鎖線は放出管の中心軸であり、基準高とする。",
    "choices": {
      "ア": "H[1 − A_B²／A_C²]",
      "イ": "H[1 − A_C²／A_B²]",
      "ウ": "H[1 + A_C²／A_B²]",
      "エ": "H[A_B²／A_C² − 1]",
      "オ": "H[A_B²／A_C² + 1]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "水槽から放出口Ｂまでベルヌーイの式を適用すると、v_B²／(2g) = Hとなる。ＣとＢの速度水頭の差が吸上げ高さだから、Δh = H[(A_B／A_C)² − 1]である。",
    "choiceExplanations": {
      "ア": "この式は断面A_CがA_Bより小さいと負になる。実際の上昇量は、大気圧が断面縮小部の圧力を上回る分だけ正に取る。",
      "イ": "細いＣでは連続の式からv_C = (A_B／A_C)v_Bとなる。速度水頭に使う面積比を逆にすると圧力低下を求められない。",
      "ウ": "Ｃ点よりＢ点の流速が低く、圧力差は二つの速度水頭の差に等しい。面積が等しければ吸上げはゼロなので、常に正となる和は合わない。",
      "エ": "水槽から放出口Ｂまでベルヌーイの式を適用すると、v_B²／(2g) = Hとなる。ＣとＢの速度水頭の差が吸上げ高さだから、Δh = H[(A_B／A_C)² − 1]である。",
      "オ": "Ａ_B／Ａ_Cの向きは合うが、流速が等しいときには吸上げは生じない。二つの速度水頭は足すのではなく差を取る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q067.webp"
    ],
    "imageAltTexts": [
      "水槽と放出管の断面縮小部に取り付けた小管の液面上昇"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q068",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "分流位置と管摩擦による損失",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "水位が一定に保たれた二つの水槽を長さL、管径がd の円管で連結し、図のような二つの方法1 ，2で分流させた。流出流量Q₁とQ₂の比Q₁／Q₂として最も妥当なのはどれか。ただし、両方法とも同じ円管であり、摩擦損失以外の損失は無視できるものとする。",
    "choices": {
      "ア": "3／4",
      "イ": "√(2／3)",
      "ウ": "1",
      "エ": "√(3／2)",
      "オ": "4／3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "共通の管摩擦係数で比べると、長さで重み付けした流量二乗は方法1で(3／4)Q₁²、方法2で(1／2)Q₂²となる。両者の水頭差は等しいのでQ₁／Q₂ = √(2／3)である。",
    "choiceExplanations": {
      "ア": "支管より前は流量Q、後はQ／2なので、摩擦損失は流量の二乗と各区間の長さに比例する。3／4は方法1の長さで規格化した損失係数に当たる。",
      "イ": "共通の管摩擦係数で比べると、長さで重み付けした流量二乗は方法1で(3／4)Q₁²、方法2で(1／2)Q₂²となる。両者の水頭差は等しいのでQ₁／Q₂ = √(2／3)である。",
      "ウ": "大きい流量で流れる区間は、分流が遅い方法1の方が長い。等しい水頭差では方法1と2の入口流量が等しくならない。",
      "エ": "この値は比を逆にしたQ₂／Q₁に当たる。大流量の区間が長い方法1では管摩擦のため入口流量が小さくなる。",
      "オ": "同じ水頭差で摩擦係数を共通とすると、各区間の摩擦損失は流量二乗で決まる。長さや損失の比をそのまま流量比に使えない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q068.webp"
    ],
    "imageAltTexts": [
      "二つの水槽を連結する円管の二種類の分流位置と流量"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q069",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "成層地盤の等価透水係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のようなn 層の水平堆積層をもつ地盤の鉛直及び水平方向の流れを考える。各層の厚さをd₁，d₂，…，dₙ、透水係数をk₁，k₂，…，kₙ として、マクロ的に見たこの水平堆積地盤の鉛直方向透水係数kᵥ、水平方向透水係数kₕ の組合せとして最も妥当なのはどれか。ただし、各層の透水係数は等方的で流れの方向によらず一定値で、流れはDarcy の法則に従うものとする。",
    "choices": {
      "ア": "(d₁ + … + dₙ)／(d₁／k₁ + … + dₙ／kₙ) ／ (d₁k₁ + … + dₙkₙ)／(d₁ + … + dₙ)",
      "イ": "(d₁ + … + dₙ)／(d₁／k₁ + … + dₙ／kₙ) ／ (d₁k₁ + … + dₙkₙ)／[(1／n)(d₁ + … + dₙ)]",
      "ウ": "[(1／n)(d₁ + … + dₙ)]／(d₁／k₁ + … + dₙ／kₙ) ／ (d₁k₁ + … + dₙkₙ)／(d₁ + … + dₙ)",
      "エ": "[(1／n)(d₁ + … + dₙ)]／(d₁／k₁ + … + dₙ／kₙ) ／ [(1／n)(d₁ + … + dₙ)]／(d₁／k₁ + … + dₙ／kₙ)",
      "オ": "(d₁k₁ + … + dₙkₙ)／(d₁ + … + dₙ) ／ (d₁ + … + dₙ)／(d₁／k₁ + … + dₙ／kₙ)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "鉛直方向では各層で同じ流速のもと水頭損失を足し、層厚を重みとする調和平均を得る。水平方向では同じ動水勾配に対し各層の流量を足すので、層厚を重みとする算術平均になる。",
    "choiceExplanations": {
      "ア": "鉛直方向では各層で同じ流速のもと水頭損失を足し、層厚を重みとする調和平均を得る。水平方向では同じ動水勾配に対し各層の流量を足すので、層厚を重みとする算術平均になる。",
      "イ": "鉛直方向の調和平均は合う。水平方向の合計流量を層厚全体で割るため、分母を層厚の単純平均にするとn倍に過大評価される。",
      "ウ": "水平方向の式は妥当である。鉛直方向に水が通過する距離も全層の厚さの和なので、分子に1／nを掛けない。",
      "エ": "鉛直方向の式は層厚の和を使う必要がある。また水平方向では各層への流れが並列になり、逆数和で表す鉛直方向の式とは異なる。",
      "オ": "鉛直方向では透水性の低い層が全体の流れを強く制限するので、厚さを重みにした調和平均になる。水平方向の算術平均と入れ替えることはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q069.webp"
    ],
    "imageAltTexts": [
      "水平堆積層の厚さと透水係数、鉛直及び水平の流れ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q070",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "モール・クーロンの破壊条件",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "同じ密度状態の土に対して拘束圧を変えて計5回の三軸圧縮試験（CD 試験）を行ったところ、破壊状態として図のような線形関係が得られた。Mohr-Coulomb の破壊規準における粘着力c 及び内部摩擦角φ を図中のf₁，m₁で表現した組合せとして最も妥当なのはどれか。なお、σ₃は拘束圧（=最小主応力）、σ₁f はそのσ₃値における最大主応力σ₁の最大値である。",
    "choices": {
      "ア": "f₁／√(1 + m₁²) ／ sin⁻¹m₁",
      "イ": "f₁／√(1 + m₁²) ／ cos⁻¹m₁",
      "ウ": "f₁／√(1 + m₁²) ／ tan⁻¹m₁",
      "エ": "f₁／√(1 − m₁²) ／ sin⁻¹m₁",
      "オ": "f₁／√(1 − m₁²) ／ cos⁻¹m₁"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "モール円が破壊包絡線に接する条件は(σ₁f − σ₃)／2 = [(σ₁f + σ₃)／2] sinφ + c cosφである。よってm₁ = sinφ、f₁ = c cosφとなり、この式を得る。",
    "choiceExplanations": {
      "ア": "勾配がsinφとなる点は合う。切片はc cosφであり、cosφは√(1 − m₁²)なので分母の符号が異なる。",
      "イ": "勾配はcosφではなくsinφである。モール円と破壊包絡線の接触条件から、縦軸の切片はc cosφとなる。",
      "ウ": "破壊包絡線をτと垂直応力で描いた場合、傾きはtanφになる。設問の座標はモール円の半径と中心なので、そこでの勾配はsinφである。",
      "エ": "モール円が破壊包絡線に接する条件は(σ₁f − σ₃)／2 = [(σ₁f + σ₃)／2] sinφ + c cosφである。よってm₁ = sinφ、f₁ = c cosφとなり、この式を得る。",
      "オ": "粘着力の式は合うが、グラフの傾きは破壊時のモール円半径と中心の関係からsinφである。摩擦角はその逆正弦で求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q070.webp"
    ],
    "imageAltTexts": [
      "三軸圧縮試験の破壊時応力と勾配及び切片、試験の模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q071",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "上水道行政・計画取水量・消毒",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の上水道に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．令和5年5月に公布された「生活衛生等関係行政の機能強化のための関係法律の整備に関する法律」により、水道整備・管理行政は厚生労働省から国土交通省及び環境省へ移管されることとなった。\n㋑．計画取水量は、浄水過程の作業用水、除去される濁質分、導水時の漏水等を考慮して、計画一日平均給水量に10 ％程度の安全を見込んで決定することを標準としている。\n㋒．塩素による消毒効果は、残留塩素濃度及び塩素との接触時間に加え、水温及びpH 値による影響も受けるが、生物の種類及び存在状態による影響は受けない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "2023年に公布された法律により、厚生労働省が担っていた水道整備・管理行政を国土交通省と環境省へ移すことになった。水道整備・管理と水質・衛生はそれぞれの担当に分けられた。",
    "choiceExplanations": {
      "ア": "2023年に公布された法律により、厚生労働省が担っていた水道整備・管理行政を国土交通省と環境省へ移すことになった。水道整備・管理と水質・衛生はそれぞれの担当に分けられた。",
      "イ": "㋐は制度改正に合う。計画取水量を決める際の基準は計画一日最大給水量であり、㋑が挙げる平均給水量ではない。",
      "ウ": "㋐は妥当である。㋒について、病原体の種類や粒子に保護されているかどうかも、塩素消毒の効き方に影響する。",
      "エ": "㋑の取水量は一日最大給水量を基礎にする。㋒も、水中の生物の種類や存在状態が消毒効果に影響しないとする点が誤りである。",
      "オ": "残留塩素や接触時間に加え、微生物の塩素への感受性や凝集状態などで消毒効果は変化する。㋒だけを正しいとすることはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q072",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "下水道法・活性汚泥法・汚泥利用",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の下水道に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．下水道法の目的は、下水道の整備を図り、都市の健全な発達及び公衆衛生の向上に寄与し、あわせて公共用水域の水質の保全に資することである。\n㋑．合流式下水道は汚水と雨水を同一の管渠系統で排除する方式であり、汚濁対策と浸水対策を同時に講じることができるため、近年新設された下水道の多くが合流式下水道である。\n㋒．我が国の一般的な下水処理方式である標準活性汚泥法は、嫌気性微生物を利用して有機物質を安定化させる方法である。\n㋓．下水道法では、下水道管理者への発生汚泥等を処理する場合の減量化に係る努力義務に加え、発生汚泥等の燃料又は肥料としての再生利用に係る努力義務が規定されている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐は都市の健全な発達、公衆衛生、水質保全という法の目的を挙げている。㋓も下水汚泥の減量と燃料・肥料としての再生利用に関する努力義務に合う。",
    "choiceExplanations": {
      "ア": "㋐は下水道法の目的に合う。近年の新設では一般に汚水と雨水を別系統で集める分流式が採られ、㋑の説明は適切でない。",
      "イ": "下水道法の目的については㋐が妥当である。標準活性汚泥法では曝気を行って好気性微生物の働きで有機物を処理する。",
      "ウ": "㋐は都市の健全な発達、公衆衛生、水質保全という法の目的を挙げている。㋓も下水汚泥の減量と燃料・肥料としての再生利用に関する努力義務に合う。",
      "エ": "新設下水道の多くを合流式とする㋑は妥当でない。標準活性汚泥法は好気性の処理なので㋒も誤りである。",
      "オ": "㋓の努力義務は法に定められている。㋒は標準活性汚泥法で利用する微生物の環境を嫌気性としている点で誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q073",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "水質環境基準と総量規制",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の水環境に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．代表的な水質指標である生物化学的酸素要求量（BOD）は、水中の有機物が一定条件の下で好気性微生物によって生物化学的に分解されるときに消費される酸素量であり、河川における環境基準の指標とされている。\n㋑．海域は大量の汚濁物質が流入し、排水の濃度基準による規制のみでは、環境基準の達成・維持が困難であることから、流入する窒素、りん、水銀を対象に、それぞれ総量を規制している。\n㋒．湖沼や海域における生物の生息環境を保全するため、底層溶存酸素量（底層DO）が環境基準に設定され、類型指定がなされた湖沼や海域においては、定期的な測定が行われている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ＢＯＤは好気性微生物による分解で消費される酸素を測り、河川の環境基準に用いられる。底層ＤＯも湖沼や海域の底層における生物の生息条件を示す基準である。",
    "choiceExplanations": {
      "ア": "ＢＯＤを河川の水質指標とする㋐は妥当である。㋒の底層溶存酸素量に関する説明も妥当なので、㋐だけでは不足する。",
      "イ": "㋐はＢＯＤの定義と用途に合う。㋑について、対象海域の水質総量削減の対象にはＣＯＤ、窒素、りんがあり、水銀は含まれない。",
      "ウ": "ＢＯＤは好気性微生物による分解で消費される酸素を測り、河川の環境基準に用いられる。底層ＤＯも湖沼や海域の底層における生物の生息条件を示す基準である。",
      "エ": "閉鎖性海域で総量削減の対象とされる代表的な項目はＣＯＤ、窒素、りんである。㋑はＣＯＤを落として水銀を含めている。",
      "オ": "㋒の底層ＤＯは妥当である。㋑の水銀は下水や排水の規制対象になり得るが、ここで問う水質総量削減の指定項目とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q074",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "日本の2030年度脱炭素目標",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の地球温暖化対策に関する記述㋐、㋑、㋒のうち、下線部が妥当なもののみを全て挙げているのはどれか。\n\n㋐．2021年10月に閣議決定された「地球温暖化対策計画」において、2050年カーボンニュートラル目標と整合的で野心的な目標として、〔2030年度の温室効果ガス削減目標は、2013年度から26％削減することを目指し、さらに、30％の高みに向けて挑戦を続けていく〕とされている。\n㋑．「第6次エネルギー基本計画」において、再生可能エネルギーについては、国民負担の抑制と地域との共生を図りながら最大限の導入を促していくものと位置付けられており、〔2030年度の発電電力量に占める再生可能エネルギーの導入水準は10～20％程度〕とされている。\n㋒．地球温暖化対策の推進に関する法律の一部を改正する法律（令和3年法律第54号）において、再生可能エネルギーの利用と地域の脱炭素化の取組を一体的に行うプロジェクトである地域脱炭素化促進事業が円滑に推進されるよう、〔市町村が、再エネ促進区域や再エネ事業に求める環境保全・地域貢献の取組を自らの計画に位置付け、適合する事業計画を認定する〕仕組みが構築された。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "市町村は地方公共団体実行計画で促進区域や環境保全、地域貢献の取組を定め、適合する事業計画を認定できる。㋐と㋑の数値はそれぞれの計画と異なる。",
    "choiceExplanations": {
      "ア": "2021年の計画で掲げたのは2013年度比46％削減で、50％の高みに向けて挑戦を続けるという目標である。",
      "イ": "㋒の地域脱炭素化促進事業の認定制度は合う。㋐の26％・30％という数値は、2021年に決定された目標の46％・50％と異なる。",
      "ウ": "第6次エネルギー基本計画が見込む2030年度の電源構成で、再生可能エネルギーの割合は36～38％程度である。",
      "エ": "市町村による促進区域の設定や事業計画の認定は妥当である。一方、㋑の10～20％程度は当時の再生可能エネルギーの導入水準の見込みより小さい。",
      "オ": "市町村は地方公共団体実行計画で促進区域や環境保全、地域貢献の取組を定め、適合する事業計画を認定できる。㋐と㋑の数値はそれぞれの計画と異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q075",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "プラスチック資源循環と廃棄物処理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の循環型社会形成に関する記述㋐～㋓のうち、下線部が妥当なもののみを挙げているのはどれか。\n\n㋐．廃棄物は大きく一般廃棄物と〔有害廃棄物の二つに区分され、この有害廃棄物とは、事業活動に伴って生じた廃棄物のうち、廃棄物の処理及び清掃に関する法律（廃棄物処理法）施行令で定められた20種類のものと、廃棄物処理法に規定する「輸入された廃棄物」である〕。\n㋑．プラスチックに係る資源循環の促進等に関する法律は、〔プラスチックの使用製品の設計から廃棄物処理に至るまでのライフサイクル全般にわたって〕、3R+Renewable の原則にのっとり、あらゆる主体のプラスチックに係る資源循環の促進等を図ることを目的としている。\n㋒．建設工事に係る資材の再資源化等に関する法律では、〔全ての建築物の解体工事等から発生する〕特定建設資材（コンクリート、コンクリート及び鉄から成る建設資材、木材、アスファルト・コンクリートの4品目）の〔再資源化等が義務付けられている〕。\n㋓．福島県大熊町・双葉町に整備されている中間貯蔵施設は、福島県内の除染に伴い発生した放射性物質を含む土壌等及び福島県内に保管されている10万Bq/kg を超える指定廃棄物等を〔最終処分するまでの間、安全に集中的に管理・保管する施設〕である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "プラスチック資源循環は製品設計から廃棄物処理までのライフサイクルを対象とする。中間貯蔵施設で対象物を安全に管理・保管するという㋓も妥当である。",
    "choiceExplanations": {
      "ア": "廃棄物処理法の大きな区分は一般廃棄物と産業廃棄物である。㋑のプラスチックのライフサイクル全体を対象とする説明は合う。",
      "イ": "㋐の有害廃棄物という区分は産業廃棄物を取り違えている。㋒の再資源化義務には、工事の種類に応じた対象規模の基準がある。",
      "ウ": "㋑の設計から廃棄物処理までを扱う点は妥当である。㋒は全ての建築物の解体工事等に義務が適用されるとしている点が誤りである。",
      "エ": "プラスチック資源循環は製品設計から廃棄物処理までのライフサイクルを対象とする。中間貯蔵施設で対象物を安全に管理・保管するという㋓も妥当である。",
      "オ": "㋓は中間貯蔵施設の目的に合う。建設リサイクル法の再資源化等の義務は、規模などの要件を満たした対象建設工事に適用される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q076",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "断面係数と最大曲げ応力度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような断面A，B，C に、同じ大きさのX 軸まわりの曲げモーメントが作用したとき、各断面に生ずる最大曲げ応力度の大きさの大小関係として最も妥当なのはどれか。ただし、X 軸は各断面の重心を通る中立軸である。",
    "choices": {
      "ア": "A < B < C",
      "イ": "A < C < B",
      "ウ": "B < A < C",
      "エ": "B < C < A",
      "オ": "C < B < A"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "各断面の断面係数I／y_maxはＡがa³／4、Ｂが23a³／72、Ｃがa³／3となる。同じ曲げモーメントに対して応力度はこれらの逆順となり、Ｃ、Ｂ、Ａの順に大きくなる。",
    "choiceExplanations": {
      "ア": "同じ曲げモーメントでは、断面係数が小さいほど最大曲げ応力度は大きくなる。断面Ａは三つの中で断面係数が最も小さい。",
      "イ": "断面Ａの最大曲げ応力度は最小にはならない。Ａの断面係数はa³／4で、ＢとＣの値より小さい。",
      "ウ": "Ｃは高さが2aで、断面係数がa³／3となる。これは三断面の中で最も大きいため、同じモーメントで最大応力度は最も小さい。",
      "エ": "Ａの応力度が最大である点は合う。Ｂの断面係数は23a³／72であり、24a³／72になるＣよりわずかに小さいので、Ｂの応力度がＣより大きい。",
      "オ": "各断面の断面係数I／y_maxはＡがa³／4、Ｂが23a³／72、Ｃがa³／3となる。同じ曲げモーメントに対して応力度はこれらの逆順となり、Ｃ、Ｂ、Ａの順に大きくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q076.webp"
    ],
    "imageAltTexts": [
      "重心を通る中立軸と三種類の断面Ａ、Ｂ、Ｃの形状と寸法"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q077",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "中央で交差する二本の単純梁の荷重分担",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、単純梁A と単純梁B がそれぞれの中央で一体となっており、交点に鉛直下向きの集中荷重P が作用している。A の長さは3a、B の長さは2a であり、A とB のヤング係数はE、断面2次モーメントはI である。このとき、A とB の支点反力R_A，R_B の組合せとして最も妥当なのはどれか。ただし、A とB の自重は無視するものとする。なお、ヤング係数がE、断面2次モーメントがI、長さがa の単純梁の中央に鉛直集中荷重P を加えたときの中央部の鉛直たわみδ は、δ = Pa³／(48EI) で与えられる。",
    "choices": {
      "ア": "(4／35)P ／ (27／70)P",
      "イ": "(2／13)P ／ (9／26)P",
      "ウ": "(8／35)P ／ (27／35)P",
      "エ": "(4／13)P ／ (9／13)P",
      "オ": "(4／13)P ／ (27／26)P"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "共通の交点の変位が同じなので、分担荷重は梁長の三乗の逆比8：27となる。各分担を両支点で二等分すると、R_A = 4P／35、R_B = 27P／70である。",
    "choiceExplanations": {
      "ア": "共通の交点の変位が同じなので、分担荷重は梁長の三乗の逆比8：27となる。各分担を両支点で二等分すると、R_A = 4P／35、R_B = 27P／70である。",
      "イ": "この組合せは分担荷重を長さの二乗の逆比4：9としたときの結果である。設問のたわみ式では長さが三乗で効く。",
      "ウ": "8P／35と27P／35は梁Ａと梁Ｂがそれぞれ交点で受ける全荷重である。一つの端部での反力はそれぞれの半分になる。",
      "エ": "各梁には二つの支点があるので、全体の鉛直力のつり合いは2R_A + 2R_B = Pである。この組合せでは反力の総和が2Pになる。",
      "オ": "この組合せでは二本の梁の四つの支点の反力の合計がPを大幅に上回る。交点のたわみをそろえ、各梁の荷重を二つの支点に分配する必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q077.webp"
    ],
    "imageAltTexts": [
      "中央で交差する二本の単純梁、集中荷重と各支点反力"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q078",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "丸棒の曲げ剛性と固有周期",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような、丸棒で支持された質量m の質点に水平集中荷重P が作用したときの水平方向変位δがδ = Pℓ³／(3EI) （ℓ：丸棒の長さ、 E：丸棒のヤング係数、I：丸棒の断面2次モーメント）で与えられる1質点系振動モデルの固有周期をT とする。丸棒の直径を1／2倍に変えたとき、この振動モデルの固有周期として最も妥当なのはどれか。ただし、丸棒の質量は無視できるものとし、丸棒の断面は密実とする。",
    "choices": {
      "ア": "(1／4)T",
      "イ": "(√2／4)T",
      "ウ": "2T",
      "エ": "2√2 T",
      "オ": "4T"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "丸棒の断面二次モーメントは直径の四乗に比例するので、直径を半分にすると剛性は16分の1になる。周期は剛性の逆平方根に比例するため4Tである。",
    "choiceExplanations": {
      "ア": "直径を半分にすると剛性が下がり、元の質量のままなら振動周期は長くなる。周期が元の4分の1になることはない。",
      "イ": "曲げを支える断面二次モーメントは直径の四乗に比例する。直径を小さくすると、質点に対する復元剛性は低下する。",
      "ウ": "周期が2倍になるのは剛性が4分の1になる場合である。円形断面の二次モーメントは直径の二乗ではなく四乗に比例する。",
      "エ": "2√2倍という周期は、剛性を8分の1にした場合に対応する。密実な丸棒の剛性は直径半減で16分の1となる。",
      "オ": "丸棒の断面二次モーメントは直径の四乗に比例するので、直径を半分にすると剛性は16分の1になる。周期は剛性の逆平方根に比例するため4Tである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q078.webp"
    ],
    "imageAltTexts": [
      "質点を支持する丸棒、水平荷重と先端の変位"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q079",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "場所打ち杭の先端支持力と周面抵抗",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような地盤に施工された直径D = 1.0 mの場所打ちコンクリート杭の鉛直支持力として最も妥当なのはどれか。\nただし、杭の鉛直支持力は、先端支持力Rₚ〔kN〕、粘土層の周面抵抗力R_fc〔kN〕、砂礫層の周面抵抗力R_fs〔kN〕の総和とし、Rₚ，R_fc，R_fsは、それぞれ次式で与えられる。\n\nRₚ = 120 × Nₚ × Aₚ\nR_fc = cᵤ × L꜀ × ψ\nR_fs = 3.3 × Nₛ × Lₛ × ψ\n\nここで、Nₚは杭先端から上へ1D、下へ1Dの範囲における地盤の標準貫入試験の平均N値、Aₚは杭先端の断面積〔m²〕、cᵤは粘土層の非排水せん断強さ〔kN/m²〕、L꜀は杭（パイルキャップを含まない）が粘土層の中にある長さ〔m〕、ψは杭の周長〔m〕、Nₛは砂礫層の標準貫入試験の平均N値、Lₛは杭が砂礫層の中にある長さ〔m〕である。また、杭の水平断面は密実で円形とする。",
    "choices": {
      "ア": "1200π kN",
      "イ": "1431π kN",
      "ウ": "1650π kN",
      "エ": "1782π kN",
      "オ": "1842π kN"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "杭先端の上下1 mは砂礫層なので先端の平均Ｎ値は40で、先端支持力は1200π kNになる。粘土層の15 mで450π kN、砂礫層の1 mで132π kNを加え、合計1782π kNである。",
    "choiceExplanations": {
      "ア": "1200π kNは平均Ｎ値40と断面積π／4 m²から求める先端支持力である。粘土層と砂礫層で生じる周面抵抗も加える。",
      "イ": "杭の粘土層中の長さは、深さ17 mから杭頭までの2 mを引いた15 mである。先端支持力と粘土層の周面抵抗を足した時点で1650π kNとなり、この選択肢を上回る。",
      "ウ": "1650π kNは先端支持力1200πと粘土層の周面抵抗450πを足した値である。砂礫層内の1 mによる132π kNも加える必要がある。",
      "エ": "杭先端の上下1 mは砂礫層なので先端の平均Ｎ値は40で、先端支持力は1200π kNになる。粘土層の15 mで450π kN、砂礫層の1 mで132π kNを加え、合計1782π kNである。",
      "オ": "杭の周面抵抗を数える長さにはパイルキャップの2 mを含めない。これを粘土層中の杭長に加えると60π kNだけ過大になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q079.webp"
    ],
    "imageAltTexts": [
      "地盤の土質柱状図、平均Ｎ値と場所打ちコンクリート杭の寸法"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q080",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "斜材付き骨組みの柱の曲げモーメント",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような骨組みに水平集中荷重100 kN が作用したとき、部材BC の引張力は50 kN であった。このとき、柱AB の点A における曲げモーメントの大きさとして最も妥当なのはどれか。ただし、梁は剛体とし、柱AB 及び柱CD は等質等断面の弾性部材で曲げ変形のみ考慮するものとする。",
    "choices": {
      "ア": "50 kN・m",
      "イ": "70 kN・m",
      "ウ": "100 kN・m",
      "エ": "105 kN・m",
      "オ": "140 kN・m"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "斜材の水平成分は50×3／5 = 30 kNなので、残り70 kNを同じ二本の柱が35 kNずつ分担する。上下端で回転が拘束された柱の端部モーメントは35×4／2 = 70 kN・mである。",
    "choiceExplanations": {
      "ア": "斜材の引張力50 kNには鉛直成分がある。柱が分担する水平力を求めるには、50 kNをそのまま使わず水平成分30 kNを取り出す。",
      "イ": "斜材の水平成分は50×3／5 = 30 kNなので、残り70 kNを同じ二本の柱が35 kNずつ分担する。上下端で回転が拘束された柱の端部モーメントは35×4／2 = 70 kN・mである。",
      "ウ": "100 kNは作用する水平荷重であり、柱ＡＢの端部モーメントではない。斜材の水平力負担と、二本の柱のせん断力の分担を考慮する必要がある。",
      "エ": "斜材の水平成分は30 kNであり、残り70 kNを二本の柱で等分する。柱端ではせん断力35 kNと柱長4 mの積を二等分する。",
      "オ": "140 kN・mは柱ＡＢに沿った曲げモーメントの変化量35×4である。両端回転拘束の横移動では両端の曲げモーメントが等大逆符号なので、その片側は半分となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q080.webp"
    ],
    "imageAltTexts": [
      "斜材を持つ骨組みの寸法、水平集中荷重と斜材の引張力"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q081",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "鉄骨造の構造設計と許容応力度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の鉄骨造建築物の構造設計に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．短期許容圧縮応力度は、有効細長比が限界細長比より大きい場合には、安全率を見込んだ弾性座屈荷重（オイラー荷重）に基づいて定まっている。\n㋑．耐震性能が必要となる骨組みで、保有水平耐力の検討を行わない耐震計算ルート2などには柱及びはり材の幅厚比規定があり、所定の幅厚比より大きな板要素から構成される断面を用いなければならない。\n㋒．高力ボルト摩擦接合部の高力ボルトの軸断面に対する許容せん断応力度は、二面せん断であれば、一面せん断の2倍の数値を採用できる。\n㋓．許容応力度等計算における層間変形角の制限値は、変形により建築物の部分に著しい損傷が生ずるおそれのない場合には、1/100まで緩和できる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "限界細長比を超える部材では、弾性座屈荷重を基に安全率を見込んで許容圧縮応力度を求める。高力ボルトの二面せん断では二つの面で力を伝達できる。",
    "choiceExplanations": {
      "ア": "㋐の細長い部材に対する弾性座屈の考え方は妥当である。幅厚比規定は局部座屈を避けるため上限を設け、所定値より大きな幅厚比を要求しない。",
      "イ": "限界細長比を超える部材では、弾性座屈荷重を基に安全率を見込んで許容圧縮応力度を求める。高力ボルトの二面せん断では二つの面で力を伝達できる。",
      "ウ": "㋐は合う。層間変形角の原則は1／200以内で、著しい損傷のおそれがない場合の緩和は1／120以内である。",
      "エ": "㋒は妥当である。㋑の幅厚比は大きいほど板要素が局部座屈しやすく、規定で制限するのはその上限である。",
      "オ": "㋑は幅厚比制限の向きが逆である。㋓が挙げる1／100は層間変形角の緩和限度を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q082",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "建築基準法令の構造耐力・地震力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の建築基準法・同施行令とこれらに基づく告示に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．構造耐力に係る規定として、建築物は、自重、積載荷重、風圧、土圧及び水圧並びに地震その他の震動及び衝撃に対して安全な構造のものとして、建築物の規模等による五つの区分（第一号から第五号まで）に応じ、それぞれに定める基準に適合するものでなければならない。\n㋑．建築物の地上部分の地震力の計算に用いる標準せん断力係数は、原則として0.2以上としなければならない。ただし、必要保有水平耐力を計算する場合においては、標準せん断力係数は、1.0以上としなければならない。\n㋒．地震地域係数Z は、過去の地震記録等により得られた地震動の期待値の相対的な比を表す数値であり、地域ごとに0.7，0.8，0.9，1.0のいずれかの数値が規定されているが、 Z = 0.7の地域は沖縄県のみである。\n㋓．建築物の基礎について、異なる構造方法による基礎を併用してはならない。ただし、特定行政庁が定める基準に従った構造計算によって構造耐力上安全であることが確かめられた場合においては、この限りでない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "標準せん断力係数は原則0.2以上、必要保有水平耐力の計算では1.0以上である。地域ごとに定められた地震地域係数のうち、0.7が指定されているのは沖縄県である。",
    "choiceExplanations": {
      "ア": "㋑の標準せん断力係数は合う。㋐は当時の建築基準法第20条第1項の四つの区分を五つとしている点が誤りである。",
      "イ": "㋒の地震地域係数は規定に合う。㋐の構造耐力の条文は第一号から第四号までに区分され、第五号はない。",
      "ウ": "標準せん断力係数は原則0.2以上、必要保有水平耐力の計算では1.0以上である。地域ごとに定められた地震地域係数のうち、0.7が指定されているのは沖縄県である。",
      "エ": "㋑は妥当である。異なる構造方法の基礎を併用できる例外は、国土交通大臣が定める基準に従った構造計算で安全を確認する場合である。",
      "オ": "㋒は妥当である。㋓は併用の例外に用いる構造計算の基準を特定行政庁が定めるとした点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q083",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "建築材料と制振部材の性質",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "建築材料に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．オイルダンパーは、変形依存型の履歴特性を有し、その変形履歴に伴うエネルギー吸収能力を利用した部材である。\n㋑．コンクリートの中性化速度は、圧縮強度が大きいほど小さい。\n㋒．木材の腐朽は、木材腐朽菌の繁殖条件である酸素・温度・水分・栄養源のうち、いずれか一つでも欠くことによって防止することができる。\n㋓．冷間成形角形鋼管の角部は、成形前の素材と比べて、強度及び変形性能が高くなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "一般に圧縮強度が高く密実なコンクリートは中性化が進みにくい。木材腐朽菌の繁殖には酸素、適温、水分、栄養が必要なので、その一つを欠けば腐朽を防げる。",
    "choiceExplanations": {
      "ア": "圧縮強度が大きいコンクリートで中性化が進みにくいという㋑は妥当である。オイルダンパーは油の流動抵抗を利用し、主に速度に依存する。",
      "イ": "㋐はオイルダンパーを変形依存型としている。㋓の冷間成形角形鋼管の角部も、加工硬化により強度は増すものの変形能力は一般に低下する。",
      "ウ": "一般に圧縮強度が高く密実なコンクリートは中性化が進みにくい。木材腐朽菌の繁殖には酸素、適温、水分、栄養が必要なので、その一つを欠けば腐朽を防げる。",
      "エ": "㋑は妥当である。冷間成形による加工硬化は角部の強度を増す一方、その変形性能を向上させるとはいえない。",
      "オ": "腐朽菌が繁殖する条件を断つことは木材の腐朽防止に有効である。㋓は冷間成形後に角部の変形性能も向上するとした点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q084",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "内外装材料・石綿・防水層の脱気",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国における内外装材料等に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．JAS 及びJIS におけるホルムアルデヒド放散量（放散速度）の性能を表す記号について、「F ☆」より「F ☆☆☆☆」の方がホルムアルデヒドの放散量（放散速度）は大きい。\n㋑．ポリスチレンフォームは、発泡プラスチック系の断熱材で、板状の工場製品と現場で吹き付ける現場発泡品がある。\n㋒．石綿含有吹付け材は、石綿粉じんの飛散性が非常に高く、除去や囲い込み、封じ込めを行う際は、原則として、届出が必要となる。\n㋓．屋上露出防水絶縁工法に用いられる脱気装置は、下地水分の気化・膨張による防水層のふくれを低減するために設置される。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "石綿含有吹付け材の除去等では飛散防止のため原則として届出が要る。脱気装置は下地の水分が気化したときの圧力を逃がし、防水層のふくれを抑える。",
    "choiceExplanations": {
      "ア": "㋒の石綿含有吹付け材の規制は合う。Ｆ☆☆☆☆は星が少ない区分よりホルムアルデヒドの放散量が小さい材料に付される。",
      "イ": "㋓の脱気装置の目的は妥当である。㋐はホルムアルデヒド放散量と星の数の対応が逆である。",
      "ウ": "石綿含有吹付け材の処理には原則として届出が必要である。ポリスチレンフォームは主に工場で成形した板材であり、現場吹付け材の代表例は硬質ウレタンフォームである。",
      "エ": "防水層のふくれを抑えるための脱気装置は妥当である。㋑はポリスチレンフォームと現場発泡によく用いられる断熱材を混同している。",
      "オ": "石綿含有吹付け材の除去等では飛散防止のため原則として届出が要る。脱気装置は下地の水分が気化したときの圧力を逃がし、防水層のふくれを抑える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q085",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "建方と逆打ち工法",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "建築施工に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．土工事において、山留め壁を支持するのに地下躯体を使用する工法を逆打ち工法といい、地下の躯体が全て完成した後に地上の躯体工事を行うことから、工期が長期化しやすい。\n㋑．在来工法による木造の建築物の建方において、柱の傾きを直す建入れ直しは、斜材の取り付けにより骨組み全体を固める前に行う。\n㋒．鉄筋コンクリート造の建築物の鉄筋工事において、配筋検査は、配筋と型枠の組立てが終わった後に、型枠検査と同時に行う。\n㋓．鉄骨造の建築物の建方において、建築物の端部から数スパンずつ最上階まで建方を行い、順に手前に建てていく方式を建逃げ方式といい、一般に、移動式のクレーンが用いられる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "建入れ直しは斜材で骨組みを固める前に行う。建逃げ方式では端部から数スパンを最上階まで組み、移動式クレーンを後退させながら順に建てる。",
    "choiceExplanations": {
      "ア": "木造の建入れ直しを骨組みが固まる前に行うという㋑は妥当である。逆打ち工法は地上と地下の工事を並行できるため、㋐の工程の説明は異なる。",
      "イ": "逆打ち工法では地下躯体を山留めに使いつつ地上工事を進められる。鉄筋の配筋は型枠を全て閉じると確認できなくなる箇所もあり、型枠検査と常に同時ではない。",
      "ウ": "㋑は妥当である。配筋検査はかぶり厚さや継手などを確認できる状態で行う必要があり、型枠組立て完了後と一律には決まらない。",
      "エ": "建入れ直しは斜材で骨組みを固める前に行う。建逃げ方式では端部から数スパンを最上階まで組み、移動式クレーンを後退させながら順に建てる。",
      "オ": "㋓の建逃げ方式は妥当である。㋒は鉄筋の位置を確認できる工程と、型枠自体の検査を必ず同時に行うとしている点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q086",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "電気抵抗のＳＩ組立単位",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "国際単位系（SI）には固有の名称とその独自の記号で表されるSI 組立単位がある。電気抵抗のSI 組立単位であるオーム〔Ω〕をSI 基本単位で表したものとして最も妥当なのはどれか。ただし、s，m，kg，A は、それぞれ時間、長さ、質量、電流のSI 基本単位を表すものとする。",
    "choices": {
      "ア": "A・s",
      "イ": "kg⁻¹・m⁻²・s³・A²",
      "ウ": "kg・m²・s⁻²",
      "エ": "kg・m²・s⁻³・A⁻¹",
      "オ": "kg・m²・s⁻³・A⁻²"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "Ω = V／A = W／A²である。W = kg・m²・s⁻³を代入すると、kg・m²・s⁻³・A⁻²になる。",
    "choiceExplanations": {
      "ア": "A・sは電流と時間の積で、電荷のクーロンに当たる。抵抗を得るには電圧を電流で割る。",
      "イ": "これは正しい抵抗の組立単位の逆数である。抵抗の逆数であるコンダクタンスの単位ジーメンスを表す。",
      "ウ": "kg・m²・s⁻²は仕事やエネルギーのジュールである。抵抗の単位は電気的な電流の次元も含む。",
      "エ": "この式は電力の単位ワットをアンペアで割ったもので、電圧の単位ボルトである。オームにするにはさらにアンペアで割る。",
      "オ": "Ω = V／A = W／A²である。W = kg・m²・s⁻³を代入すると、kg・m²・s⁻³・A⁻²になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q087",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "光子計数率と背景補正の標準偏差",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "完全導体で作られた中空の円筒を用意し、底面に光子検出器を設置する。図Ⅰのように円筒と同じ材質である円板を上面に設置したところ、1時間の測定で576個の光子を検出した。次に図Ⅱのように微弱な単色光を放出する面発光素子を円板の替わりに設置して光子数を1時間測定したところ、1秒当たりの光子計数率は0.48 s⁻¹であった。面発光素子のみによる正味の光子計数率〔s⁻¹〕の標準偏差〔s⁻¹〕として最も妥当なのはどれか。ただし、光子検出器は入射した光子を全て数えることができ、面発光素子による光の吸収と円板による光の放射は無視できるものとする。また、計数の分散は計数に等しいとしてよい。",
    "choices": {
      "ア": "4.8 × 10⁻³ s⁻¹",
      "イ": "9.4 × 10⁻³ s⁻¹",
      "ウ": "1.3 × 10⁻² s⁻¹",
      "エ": "1.8 × 10⁻² s⁻¹",
      "オ": "3.2 × 10⁻¹ s⁻¹"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "光源ありの総計数は0.48×3600 = 1728個、背景は576個である。独立な計数の差の分散は2304なので、計数率の標準偏差は√2304／3600 ≈ 0.013 s⁻¹となる。",
    "choiceExplanations": {
      "ア": "二つの測定値を引くとき、それぞれの標準偏差をそのまま引くことはできない。独立な二つの計数の分散を足す。",
      "イ": "正味の計数を求めると1728 − 576 = 1152個になる。ただし、二つの計数の差の分散は1152ではなく、それぞれの分散の和である。",
      "ウ": "光源ありの総計数は0.48×3600 = 1728個、背景は576個である。独立な計数の差の分散は2304なので、計数率の標準偏差は√2304／3600 ≈ 0.013 s⁻¹となる。",
      "エ": "計数の差の分散は1728 + 576 = 2304で、標準偏差は48個である。1時間を秒に換算して割ると1.8×10⁻² s⁻¹にはならない。",
      "オ": "0.32 s⁻¹は背景を引いた正味の計数率そのものである。標準偏差を求めるには、両測定の分散を足して平方根を取る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q087.webp"
    ],
    "imageAltTexts": [
      "円筒上面に円板を取り付けた背景測定と面発光素子を取り付けた光子測定"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q088",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "ボード線図の極・零点とゲイン",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の伝達関数G(s)は安定であり、a，b，cは定数とする。\n\nG(s) = (as + b)／(cs + 1)\n\nG(s)におけるボード線図のうち、ゲイン線図が折れ線近似で図のように与えられているとき、a，b，cの値の組合せとして最も妥当なのは次のうちではどれか。なお、横軸は常用対数目盛である。",
    "choices": {
      "ア": "1000／10／0.1",
      "イ": "100／1／0.1",
      "ウ": "100／10／0.01",
      "エ": "0.1／10／10",
      "オ": "0.01／1／10"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "低周波の20 dBからb = 10、最初の折点0.1 rad/sからc = 10となる。高周波の−40 dBからa／c = 0.01なので、a = 0.1である。",
    "choiceExplanations": {
      "ア": "低周波のb = 10は合うが、このaとcでは高周波ゲインの比a／cが10000になる。図の高周波側は−40 dBで、ゲインは0.01である。",
      "イ": "b = 1なら低周波ゲインは0 dBである。図の低周波側では20 dBが示されている。",
      "ウ": "低周波ゲインのb = 10は合う。c = 0.01なら極の折点は100 rad/sになるが、図の傾きは0.1 rad/sで減少へ転じている。",
      "エ": "低周波の20 dBからb = 10、最初の折点0.1 rad/sからc = 10となる。高周波の−40 dBからa／c = 0.01なので、a = 0.1である。",
      "オ": "c = 10による最初の折点は合う。低周波側のbは1ではなく10であり、高周波側の比a／cも0.01でなければならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q088.webp"
    ],
    "imageAltTexts": [
      "低周波と高周波に平坦部を持つボード線図のゲイングラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q089",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "伝達関数の零点と定常応答",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "伝達関数がH(s) = (s − 1)／(s + 1)³のシステムに、入力u(t) = eᵗ + sin(t)を加えて、十分時間が経過したとき、出力の時間関数として最も妥当なのはどれか。",
    "choices": {
      "ア": "(1／2) sin(t − 3π／4)",
      "イ": "(1／2) sin(t − π／4)",
      "ウ": "(1／2) sin(t)",
      "エ": "1／2 + (1／2) sin(t)",
      "オ": "1 + (1／2) sin(t)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "eᵗのラプラス変換の極s = 1はHの零点で打ち消され、残る過渡項は減衰する。H(j) = 1／2なので、正弦波の出力は(1／2) sin(t)となる。",
    "choiceExplanations": {
      "ア": "周波数1におけるH(j)の偏角はゼロである。分母の位相だけを使うと、分子j − 1が持つ位相を見落とす。",
      "イ": "H(j)では分子と分母の偏角がともに3π／4であり、差はゼロになる。振幅は半分になるが位相のずれは残らない。",
      "ウ": "eᵗのラプラス変換の極s = 1はHの零点で打ち消され、残る過渡項は減衰する。H(j) = 1／2なので、正弦波の出力は(1／2) sin(t)となる。",
      "エ": "この入力には定数成分がなく、eᵗを加えたことによる応答も、H(s)との積では安定な極から生じる減衰項になる。",
      "オ": "指数入力で生じる項にはs = 0の極がないため、時間がたって定数1が残ることはない。正弦波への応答だけが残る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q090",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "観測外乱の前置補償",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のようなブロック線図で表されるシステムを考える。D(s)で表される信号が観測でき、十分な回数時間微分可能な関数であるときに、出力がY(s) = 0となるような入力U(s)として最も妥当なのはどれか。\nただし、伝達関数G₁(s)～G₅(s)は、全て不安定零点をもたないものとする。",
    "choices": {
      "ア": "−D(s)",
      "イ": "−D(s)／[G₁(s)G₂(s)]",
      "ウ": "0",
      "エ": "G₃(s)D(s)／[1 − G₃(s)G₄(s)]",
      "オ": "G₃(s)D(s)／[1 − G₃(s)G₄(s) − G₂(s)G₃(s)G₅(s)]"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "出力Ｙをゼロにすると、Ｙを帰還する二経路の信号もゼロになる。外乱の加算点でG₁G₂U + D = 0とすれば、指定の入力が得られる。",
    "choiceExplanations": {
      "ア": "外乱の加算点まで、入力ＵはG₁とG₂の両方を通る。単にＵ = −Dとしても、G₁G₂が1でなければ加算点で相殺しない。",
      "イ": "出力Ｙをゼロにすると、Ｙを帰還する二経路の信号もゼロになる。外乱の加算点でG₁G₂U + D = 0とすれば、指定の入力が得られる。",
      "ウ": "Ｕがゼロでも外乱Ｄは最後のG₃の経路を通って出力に現れる。観測したＤに応じて入力を変える必要がある。",
      "エ": "この式に含まれるG₄はＹを帰還する要素であり、Ｙをゼロにした条件では寄与しない。外乱加算点の前にあるG₁G₂の逆を使う。",
      "オ": "この式はＤから出力Ｙまでの閉ループの伝達を表す形である。求めるのはその出力ではなく、外乱を相殺するための入力Ｕである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q090.webp"
    ],
    "imageAltTexts": [
      "観測できる外乱入力を含む制御系のブロック線図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q091",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "シリコンの原子密度と不純物補償",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "シリコン半導体に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。「図のようなダイヤモンド構造をとるシリコン結晶では、シリコン原子が配位数4で共有結合しており、格子定数a は0.543 nm、原子密度は ㋐ cm⁻³となる。このシリコン結晶に、不純物としてヒ素とアルミニウムを混入した。ヒ素原子の濃度は8.0 × 10¹⁵ cm⁻³、アルミニウム原子の濃度は4.0 × 10¹⁵ cm⁻³、不純物原子は完全にイオン化しているものとすると、多数キャリア密度は ㋑ cm⁻³となる。」",
    "choices": {
      "ア": "3.7 × 10²² ／ 4.0 × 10¹⁵",
      "イ": "3.7 × 10²² ／ 1.2 × 10¹⁶",
      "ウ": "4.4 × 10²² ／ 1.2 × 10¹⁶",
      "エ": "5.0 × 10²² ／ 4.0 × 10¹⁵",
      "オ": "5.0 × 10²² ／ 1.2 × 10¹⁶"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ダイヤモンド構造の慣用単位格子には実効で8個の原子があるので、8／(5.43×10⁻⁸ cm)³ ≈ 5.0×10²² cm⁻³である。ヒ素8.0×10¹⁵からアルミニウム4.0×10¹⁵を引くと電子は4.0×10¹⁵ cm⁻³になる。",
    "choiceExplanations": {
      "ア": "ヒ素とアルミニウムの濃度差を用いるのでキャリア密度は合う。ダイヤモンド構造の慣用単位格子には実効で8個の原子があり、原子密度はこの値より大きい。",
      "イ": "格子定数0.543 nmをcmに直し、格子体積で実効原子数8を割る。またドナーとアクセプターの濃度は加えず、補償された差を用いる。",
      "ウ": "完全電離したヒ素は電子を供給し、アルミニウムはアクセプターとしてそれを補償する。多数キャリア密度が両者の和になることはない。",
      "エ": "ダイヤモンド構造の慣用単位格子には実効で8個の原子があるので、8／(5.43×10⁻⁸ cm)³ ≈ 5.0×10²² cm⁻³である。ヒ素8.0×10¹⁵からアルミニウム4.0×10¹⁵を引くと電子は4.0×10¹⁵ cm⁻³になる。",
      "オ": "シリコンの原子密度は合う。多数キャリアはドナーとアクセプターの和ではなく、それらが互いを補償した後の差で決まる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q091.webp"
    ],
    "imageAltTexts": [
      "シリコンのダイヤモンド構造の単位格子"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q092",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "ＭＯＳ構造のフラットバンド電圧",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図は、金属電極、絶縁膜、p 型シリコン半導体で構成されたMOS 構造のエネルギーバンド図を表している。E_fs はシリコン半導体のフェルミ準位、E꜀ は伝導帯下端のエネルギー準位、Eᵥ は価電子帯上端のエネルギー準位である。Eᵢ は真性フェルミ準位で、バンドギャップの中心に位置するものとする。E_fm は金属電極のフェルミ準位である。金属電極の電圧（ゲート電圧）V_g が0 V では、図のようにシリコン半導体表面付近に空乏層が形成され、シリコン半導体のバンドに曲がりが生じた。バンドが平坦になるV_g として最も妥当なのはどれか。ただし、シリコン半導体の電子親和力qχ = 4.05 eV、金属電極の仕事関数qφₘ = 4.7 eV、 Eᵢ - E_fs = 0.38 eV、シリコン半導体のバンドギャップE_g = 1.1 eV、q は電気素量で、絶縁膜の電気抵抗は十分に大きいものとする。",
    "choices": {
      "ア": "−0.38 V",
      "イ": "−0.28 V",
      "ウ": "−0.18 V",
      "エ": "+0.28 V",
      "オ": "+0.38 V"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "半導体の仕事関数は電子親和力4.05 eVと、伝導帯端からフェルミ準位までの0.55 + 0.38 eVの和で4.98 eVである。金属の4.70 eVから引いた差が−0.28 eVなので、V_gは−0.28 Vとなる。",
    "choiceExplanations": {
      "ア": "−0.38 Vは真性フェルミ準位と半導体のフェルミ準位の差だけを取った値である。フラットバンド条件には金属と半導体の仕事関数の差を使う。",
      "イ": "半導体の仕事関数は電子親和力4.05 eVと、伝導帯端からフェルミ準位までの0.55 + 0.38 eVの和で4.98 eVである。金属の4.70 eVから引いた差が−0.28 eVなので、V_gは−0.28 Vとなる。",
      "ウ": "シリコンのフェルミ準位はギャップ中央より0.38 eV低く、伝導帯端からは0.93 eV下にある。その全量を電子親和力に加えて仕事関数を比較する。",
      "エ": "仕事関数の差の大きさ0.28は合う。ゲート電圧は金属から半導体を引く符号で求めるため負である。",
      "オ": "0.38は半導体内での真性準位とフェルミ準位の間のエネルギー差である。ゲート電圧を求めるには金属を含む仕事関数差への換算が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q092.webp"
    ],
    "imageAltTexts": [
      "金属電極、絶縁膜とｐ型シリコン半導体のエネルギーバンド図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q093",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "コレクタ帰還バイアスの安定係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図の回路において、R_B は48 kΩ、R_C は2.4 kΩ の抵抗値をもつ抵抗であり、また、トランジスタの直流電流増幅率h_FE が100であるとき、V_BE に対する安定係数∂I_C／∂V_BE の値として最も妥当なのはどれか。",
    "choices": {
      "ア": "−2.1 × 10⁻⁴",
      "イ": "−3.4 × 10⁻⁴",
      "ウ": "−4.8 × 10⁻⁴",
      "エ": "−5.5 × 10⁻⁴",
      "オ": "−6.7 × 10⁻⁴"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "I_C = h_FE I_B、コレクタ抵抗の電流は(h_FE + 1)I_Bである。従って微分は−h_FE／[R_B + (h_FE + 1)R_C] ≈ −3.4×10⁻⁴となる。",
    "choiceExplanations": {
      "ア": "コレクタ抵抗にはコレクタ電流とベース電流の和が流れる。分母はR_B + (h_FE + 1)R_Cとなり、この値ほど安定係数の絶対値は小さくない。",
      "イ": "I_C = h_FE I_B、コレクタ抵抗の電流は(h_FE + 1)I_Bである。従って微分は−h_FE／[R_B + (h_FE + 1)R_C] ≈ −3.4×10⁻⁴となる。",
      "ウ": "ベースへの帰還のため、V_BEの変化はR_BだけでなくR_Cでの電圧降下にも影響する。それらを合わせた分母を使うと、係数の絶対値は4.8×10⁻⁴より小さい。",
      "エ": "トランジスタに流れ込む二つの電流を足したものがR_Cを流れるため、係数の分母には101R_Cが入る。ここを小さくすると係数を過大に見積もる。",
      "オ": "V_BEの増加がベース電流を減らすので符号は負である。コレクタ抵抗による帰還とベース抵抗を両方考えると、絶対値は6.7×10⁻⁴より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q093.webp"
    ],
    "imageAltTexts": [
      "コレクタ側からベースへ抵抗を接続したトランジスタ回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q094",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "理想演算増幅器の差動回路",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような演算増幅器及び抵抗値R の抵抗を用いた回路の入力に、それぞれ入力電圧 V₁，V₂を与えたとき、出力電圧V_out として最も妥当なのはどれか。ただし、演算増幅器は理想的なものとする。",
    "choices": {
      "ア": "V₁ + V₂",
      "イ": "V₁ + V₂／2",
      "ウ": "V₁ − V₂／2",
      "エ": "V₂ − V₁",
      "オ": "V₂ − V₁／2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "非反転端子はV₂／2であり、負帰還により反転端子も同電位となる。反転端子の電流のつり合いからV_out = 2(V₂／2) − V₁ = V₂ − V₁となる。",
    "choiceExplanations": {
      "ア": "V₁は反転入力側に加えられている。そのためV₁とV₂の同符号の和ではなく、V₁に負の符号が付く。",
      "イ": "非反転端子の電圧は分圧によりV₂／2だが、この入力に対する閉ループ利得は2である。出力のV₂成分はV₂、V₁成分は−V₁になる。",
      "ウ": "V₁は反転入力側にあって利得が−1である。V₂は半分になって非反転端子に入るが、そこから出力までの利得は2である。",
      "エ": "非反転端子はV₂／2であり、負帰還により反転端子も同電位となる。反転端子の電流のつり合いからV_out = 2(V₂／2) − V₁ = V₂ − V₁となる。",
      "オ": "V₂がそのまま出力に寄与する点は正しい。V₁の反転経路の入力抵抗と帰還抵抗が等しいので、V₁の係数の絶対値は1である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q094.webp"
    ],
    "imageAltTexts": [
      "二入力の差動増幅回路と四つの同じ抵抗"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q095",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "ＮＡＮＤだけで作る基本論理回路",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "NOT 回路、AND 回路、OR 回路は、それぞれNAND 回路のみを用いて構成することができる。このとき、それぞれに必要なNAND 回路の最小の個数の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "1個／2個／2個",
      "イ": "1個／2個／3個",
      "ウ": "2個／2個／2個",
      "エ": "2個／3個／2個",
      "オ": "2個／3個／3個"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ＮＡＮＤの両入力を同じ信号にすれば一個でＮＯＴが得られ、ＮＡＮＤの出力を反転すれば二個でＡＮＤになる。ＯＲは二入力をそれぞれ反転させ、ＮＡＮＤで合わせるので三個である。",
    "choiceExplanations": {
      "ア": "ＮＯＴとＡＮＤの個数は合う。ＯＲには二つの入力の否定を作る二個と、その二信号をＮＡＮＤで合成する一個を用いる。",
      "イ": "ＮＡＮＤの両入力を同じ信号にすれば一個でＮＯＴが得られ、ＮＡＮＤの出力を反転すれば二個でＡＮＤになる。ＯＲは二入力をそれぞれ反転させ、ＮＡＮＤで合わせるので三個である。",
      "ウ": "一個のＮＡＮＤの二つの入力を同じ信号につなげば、その信号の論理否定を得られる。ＮＯＴに二個は不要である。",
      "エ": "ＡＮＤは一個のＮＡＮＤの出力をもう一個のＮＡＮＤで反転させれば作れる。三個は最小個数ではない。",
      "オ": "ＯＲの三個は合うが、ＮＯＴは一個、ＡＮＤは二個で作れる。どちらにも余分なゲートが含まれている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q096",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "ＡＭ信号の側帯波と電力効率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "振幅変調（AM）に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「振幅変調（AM）信号は、一般に次式で表される。\n\ns(t) = A cos(2πf꜀t) + m(t) cos(2πf꜀t)\n\nここで、Aは振幅、f꜀は搬送波周波数、m(t)は変調信号である。いま、変調信号m(t)が、次式で表される単一正弦波の場合を考える。\n\nm(t) = αA cos(2πfₘt)\n\nここで、α（0 < α ≤ 1）は変調度である。このとき、AM信号は次式で表される。\n\ns(t) = A cos(2πf꜀t) + (αA／2)（㋐）\n\nこのとき、AM搬送波の電力は㋑である。一方、上下側帯波の電力和は㋒である。したがって、全電力に対する情報伝送に関係のある側帯波に含まれる電力の割合が最大になるのはα = ㋓のときである。」",
    "choices": {
      "ア": "cos(2π(f꜀ + fₘ)t) + cos(2π(f꜀ − fₘ)t) ／ A²／2 ／ (αA)²／4 ／ 1",
      "イ": "cos(2π(f꜀ + fₘ)t) + cos(2π(f꜀ − fₘ)t) ／ A² ／ (αA)² ／ 1／2",
      "ウ": "cos(2π(f꜀ + fₘ)t) + sin(2π(f꜀ − fₘ)t) ／ A²／2 ／ (αA)²／4 ／ 1",
      "エ": "cos(2π(f꜀ + fₘ)t) + sin(2π(f꜀ − fₘ)t) ／ A² ／ (αA)² ／ 1／2",
      "オ": "cos(2π(f꜀ − fₘ)t) ／ A² ／ (αA)²／4 ／ 1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "余弦の積を和にすると、搬送波の両側に振幅αA／2の余弦波が生じる。搬送波電力はA²／2、側帯波の和は(αA)²／4で、この割合はαとともに増え、α = 1で最大になる。",
    "choiceExplanations": {
      "ア": "余弦の積を和にすると、搬送波の両側に振幅αA／2の余弦波が生じる。搬送波電力はA²／2、側帯波の和は(αA)²／4で、この割合はαとともに増え、α = 1で最大になる。",
      "イ": "余弦二つの周波数は合うが、振幅Aの正弦波の平均電力はA²／2である。側帯波の電力割合はα = 1まで増え続ける。",
      "ウ": "平均電力や最大となる変調度は合う。二つの余弦の積から得られる上下側帯波はいずれも余弦である。",
      "エ": "余弦の積和公式により、差周波数の項にも余弦が現れる。また、電力は振幅の二乗の半分であって振幅二乗そのものではない。",
      "オ": "単一正弦波の通常の振幅変調では上下の側帯波が同時に生じる。下側の一項だけを残した形ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q097",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "四分の一波長のインピーダンス変換",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、特性インピーダンスがZ₀の高周波伝送線路と、インピーダンスがZ_Lの純抵抗とを、特性インピーダンスZ、長さℓの線路で接続し、インピーダンスを整合させた。ℓ，Zの組合せとして最も妥当なのは次のうちではどれか。\nただし、高周波信号の波長をλとする。\nなお、端子a−a′から負荷側をみたときのインピーダンスZ_Aは次式で与えられることを用いてよい（jは虚数単位）。\n\nZ_A = Z [Z_L cos(2πℓ／λ) + jZ sin(2πℓ／λ)]／[Z cos(2πℓ／λ) + jZ_L sin(2πℓ／λ)]",
    "choices": {
      "ア": "λ／2 ／ Z₀ + Z_L",
      "イ": "λ／2 ／ (Z₀ + Z_L)／2",
      "ウ": "λ／2 ／ √(Z₀Z_L)",
      "エ": "λ／4 ／ (Z₀ + Z_L)／2",
      "オ": "λ／4 ／ √(Z₀Z_L)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ℓ = λ／4なら余弦項がゼロになり、Z_A = Z²／Z_Lとなる。これをZ₀に等置すると整合線路の特性インピーダンスは√(Z₀Z_L)になる。",
    "choiceExplanations": {
      "ア": "線路長をλ／2にすると、入力インピーダンスは負荷と同じZ_Lになる。整合線路のインピーダンスをZ₀ + Z_Lにしても、異なる負荷をZ₀に変換できない。",
      "イ": "線路長が半波長のとき2πℓ／λ = πとなり、式の正弦項は消える。入力インピーダンスはZ_Lのままである。",
      "ウ": "幾何平均というインピーダンスの値は合う。長さが半波長では負荷のインピーダンスを変換できないため、四分の一波長にする。",
      "エ": "四分の一波長にすると入力インピーダンスはZ²／Z_Lとなる。一般にZ₀に整合するのは算術平均ではなく幾何平均である。",
      "オ": "ℓ = λ／4なら余弦項がゼロになり、Z_A = Z²／Z_Lとなる。これをZ₀に等置すると整合線路の特性インピーダンスは√(Z₀Z_L)になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q097.webp"
    ],
    "imageAltTexts": [
      "高周波伝送線路、整合線路及び純抵抗の接続"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q098",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "ＭＩＭＯと通信路容量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "アンテナ多重化に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「送信アンテナと受信アンテナの双方を多重化し、㋐ 多重伝送による高速伝送を実現する技術をMIMO（Multiple-Input Multiple-Output）という。\nここでは、MIMOによる伝送効率について考える。送信アンテナ数がNₜ、受信アンテナ数がNᵣのアンテナ対から成るNₜ × Nᵣ MIMOチャネルにおいて、通信路容量は\n\nlog det(I + (γ₀／Nₜ)H†H)\n\nで与えられる。ここで、Iは単位行列、γ₀はNₜ個の送信アンテナの全送信電力を単一のアンテナに集中して送信したときのSN比を表す。また、Hをチャネル行列といい、H†はHの複素共役転置を表す。\nいま、2 × 2 MIMOチャネルにおいて、SN比を10、チャネル行列Hを((1, 1), (−1, 1))としたときの通信路容量は、同一のSN比の単一アンテナ対における通信路容量の㋑倍になる。」",
    "choices": {
      "ア": "空間／2 log 11",
      "イ": "空間／2",
      "ウ": "空間／log 11",
      "エ": "時分割／2 log 11",
      "オ": "時分割／2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ＭＩＭＯは空間多重を利用する。この行列ではH†H = 2Iなので容量はlog(11²)となり、同じＳＮ比の単一アンテナ対のlog 11の2倍である。",
    "choiceExplanations": {
      "ア": "2 log 11は行列の行列式から求まるＭＩＭＯ容量の値である。倍数を求めるときは単一アンテナ対の容量log 11で割る。",
      "イ": "ＭＩＭＯは空間多重を利用する。この行列ではH†H = 2Iなので容量はlog(11²)となり、同じＳＮ比の単一アンテナ対のlog 11の2倍である。",
      "ウ": "空間多重である点は合う。log 11は単一アンテナ対の容量であり、二つの容量の比ではない。",
      "エ": "アンテナ系統を分けて同時伝送するため、使われているのは空間多重である。また2 log 11を単一アンテナ対の容量で割る必要がある。",
      "オ": "容量の比が2である点は合う。複数のアンテナを設け空間的に信号を分ける方式であり、時分割多重ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q099",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "方形パルス列のフーリエ係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "フーリエ級数に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「周期Tの周期波形は、次のフーリエ級数を用いて表される。\n\ns(t) = A₀ + Σₙ₌₁^∞ Aₙ cos(2nπt／T) + Σₙ₌₁^∞ Bₙ sin(2nπt／T)\n\nここで、係数A₀，Aₙ，Bₙはそれぞれ以下のように求められる。\n\nA₀ = (1／T)∫[−T／2, T／2] s(t) dt\nAₙ = (2／T)∫[−T／2, T／2] s(t) cos(2nπt／T) dt\nBₙ = (2／T)∫[−T／2, T／2] s(t) sin(2nπt／T) dt\n\n図に示すような振幅A、時間幅τ、周期T（0 < τ < T）の方形パルス列がある。この方形パルス列は㋐であり、各係数はA₀ = ㋑、Aₙ = ㋒、Bₙ = ㋓となる。」",
    "choices": {
      "ア": "奇関数 ／ Aτ／T ／ (Aτ／T)[sin(nπτ／T)／(nπτ／T)] ／ 0",
      "イ": "奇関数 ／ 2Aτ／T ／ 0 ／ (Aτ／T)[cos(nπτ／T)／(nπτ／T)]",
      "ウ": "偶関数 ／ Aτ／T ／ (2Aτ／T)[sin(nπτ／T)／(nπτ／T)] ／ 0",
      "エ": "偶関数 ／ Aτ／T ／ (Aτ／T)[sin(nπτ／T)／(nπτ／T)] ／ 0",
      "オ": "偶関数 ／ 2Aτ／T ／ 0 ／ (2Aτ／T)[sin(nπτ／T)／(nπτ／T)]"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "原点対称の位置に同じ高さのパルスがあるので偶関数でBₙ = 0である。平均はAτ／Tで、余弦項をパルス区間で積分すると(2Aτ／T)sin(nπτ／T)／(nπτ／T)になる。",
    "choiceExplanations": {
      "ア": "パルスは原点に対して左右対称なので偶関数である。また余弦係数の定義には2／Tがあり、係数に2が付く。",
      "イ": "奇関数なら平均値はゼロになるが、このパルス列は周期ごとに正の面積Aτを持つ。対称性から正弦係数がゼロになる。",
      "ウ": "原点対称の位置に同じ高さのパルスがあるので偶関数でBₙ = 0である。平均はAτ／Tで、余弦項をパルス区間で積分すると(2Aτ／T)sin(nπτ／T)／(nπτ／T)になる。",
      "エ": "パルスの偶対称性と平均値は合う。Aₙの定義には直流項A₀の倍の規格化係数があるので、余弦係数が半分に過小評価されている。",
      "オ": "偶関数であるため、正弦を掛けた積は奇関数になり、対称区間での積分はゼロになる。平均値もパルス面積を一周期で割ったAτ／Tである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q099.webp"
    ],
    "imageAltTexts": [
      "時刻ゼロを中心にした偶対称の方形パルス列"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q100",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "公開鍵暗号の入れ子と中間ノード",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "通信と暗号に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。「Alice がBob に対して、i，j，k の三つの中間ノードをこの順に経由して、メッセージm を送信したい。いま、ノードX におけるメッセージの送信先ノードY、送信するメッセージM に対し、これらの対を（Y，M）としたとき、公開鍵暗号におけるノードX の ㋐ による暗号化をEnc_X（Y，M）と書くこととし、Alice は、次の暗号文C をノードi に送信する。 \n\nC = Enc_i(j, Enc_j(k, Enc_k(Bob, m)))\n\n C を受け取ったノードi は、C を復号し、j に対して、 ㋑ を送信する。これを繰り返すことで、通信路上のノードに対し、その前後のノード以外の通信路を秘匿しながらメッセージを送信することができる。また、通信するメッセージの内容は、 ㋒ 。上記の通信では、暗号化方式として公開鍵暗号を用いているが、一般に公開鍵暗号には、共通鍵暗号と比較して、 ㋓ という特徴がある。」",
    "choices": {
      "ア": "秘密鍵 ／ Enc_j(Enc_k(m)) ／ 全ての中間ノードに対して秘匿される ／ 計算に時間がかかる",
      "イ": "秘密鍵 ／ Enc_j(k, Enc_k(Bob, m)) ／ 全ての中間ノードに対して秘匿される ／ 事前の鍵配送が必要である",
      "ウ": "公開鍵 ／ Enc_j(k, Enc_k(Bob, m)) ／ 全ての中間ノードに対して秘匿される ／ 計算に時間がかかる",
      "エ": "公開鍵 ／ Enc_j(Enc_k(m)) ／ ある中間ノードに対して秘匿されないことがある ／ 事前の鍵配送が必要である",
      "オ": "公開鍵 ／ Enc_j(k, Enc_k(Bob, m)) ／ ある中間ノードに対して秘匿されないことがある ／ 計算に時間がかかる"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "iは自分の秘密鍵で外側だけを復号し、残ったEnc_j(k, Enc_k(Bob, m))を送る。kはmを知ることができ、公開鍵暗号は一般に共通鍵暗号より計算負荷が大きい。",
    "choiceExplanations": {
      "ア": "秘匿のために暗号化する際には受け手の公開鍵を用い、受け手が秘密鍵で復号する。図式の送信先情報kとBobも内側の暗号文に含まれている。",
      "イ": "ノードiがjへ渡す暗号文の形は合う。暗号化に使うのは公開鍵であり、最後の中間ノードkは復号してBobへ送るmを得る。",
      "ウ": "公開鍵を使う点とiが転送する内容は合う。最後の暗号層を復号するkにはメッセージmが見えるため、全中間ノードから秘匿されるという部分が誤りである。",
      "エ": "kが内容を知り得るという点は合う。iからjへの暗号文には次の送信先kが含まれ、kが復号する層には最終送信先Bobが入っている。",
      "オ": "iは自分の秘密鍵で外側だけを復号し、残ったEnc_j(k, Enc_k(Bob, m))を送る。kはmを知ることができ、公開鍵暗号は一般に共通鍵暗号より計算負荷が大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q101",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "ばね振り子の位置エネルギー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、質量m の質点がばね定数k の軽いばねで天井に支持された振り子がある。この振り子の鉛直面内での振れ角をθ とし、振り子が真下（θ = 0）で静的に釣り合っている状態のばねの長さをℓ とする。この振り子を点O まわりに振動させたとき、釣合い状態からのばねの伸びをx とすると、ポテンシャルエネルギーの大きさとして最も妥当なのはどれか。ただし、重力によるポテンシャルエネルギーの基準は天井の高さとし、重力加速度の大きさをg とする。",
    "choices": {
      "ア": "kx²／2 − mg(ℓ + x)",
      "イ": "kx²／2 − mg(ℓ + x)cosθ",
      "ウ": "kx²／2 − mg(ℓ + x)(1 − cosθ)",
      "エ": "k(ℓ + x)²／2 − mg(ℓ + x)cosθ",
      "オ": "k(ℓ + x)²／2 − mg(ℓ + x)(1 − cosθ)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "公式正答の②は、天井を基準とした重力項−mg(ℓ + x)cosθにkx²／2を加えている。ただし設問どおりxを静的釣合いからの伸びとすれば、実際の弾性項は自然長からの伸びを使うk(x + mg／k)²／2で、選択肢にはない。",
    "choiceExplanations": {
      "ア": "重力項は質点の鉛直座標に依存する。伸びたばねの長さℓ + xを鉛直方向に射影するcosθが必要である。",
      "イ": "公式正答の②は、天井を基準とした重力項−mg(ℓ + x)cosθにkx²／2を加えている。ただし設問どおりxを静的釣合いからの伸びとすれば、実際の弾性項は自然長からの伸びを使うk(x + mg／k)²／2で、選択肢にはない。",
      "ウ": "角度による高さの変化を1 − cosθで表す式では基準の取り方が異なる。天井を基準とする重力項は、質点の鉛直座標である−(ℓ + x)cosθにmgを掛ける。",
      "エ": "重力項は天井基準と合う。ただしばねの弾性項に使うのはばねの全長ℓ + xではなく、自然長からの伸びである。",
      "オ": "ばねの全長を二乗した項は、自然長からの伸びを用いる弾性エネルギーとは異なる。重力項も天井からの鉛直座標に合わせる必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q101.webp"
    ],
    "imageAltTexts": [
      "ばねで天井に支持された質点の釣合い位置、伸びと振れ角"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q102",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "ばねで支持した倒立振り子の固有振動数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "xy 平面上に長さℓ の軽い棒の先端に質量m の質点が取り付けられた倒立振り子が、高さa でばね定数k の軽いばねで壁面に接続されて鉛直上向きに静止している。この状態から、図のように、この振り子の鉛直面内での振れ角（x 軸となす角）をθ とし、点O まわりにθ が微小となるよう滑らかに振動させた。このときの固有振動数として最も妥当なのはどれか。ただし、重力加速度の大きさをg とする。",
    "choices": {
      "ア": "√(k／m)／(2π)",
      "イ": "√[ka／(mℓ)]／(2π)",
      "ウ": "√[ka²／(mℓ²)]／(2π)",
      "エ": "√[(ka − mg)／(mℓ)]／(2π)",
      "オ": "√[(ka² − mgℓ)／(mℓ²)]／(2π)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "ばねは微小角θに対して−ka²θ、重力は不安定側にmgℓθのモーメントを与える。これを慣性モーメントmℓ²と組み合わせ、角振動数を2πで割った式が当てはまる。",
    "choiceExplanations": {
      "ア": "点質量をばねに直接取り付けた並進振動の式である。この振り子では、ばねの作用点の高さaと質点の距離ℓが異なり、重力によるモーメントも働く。",
      "イ": "ばねの伸びは微小角でaθとなり、モーメントの腕もaである。回転のばね定数にはaが二乗で含まれ、重力の寄与も必要である。",
      "ウ": "ばねだけなら回転方向の剛性ka²を慣性モーメントmℓ²で割る。この倒立配置では重力が回転を増やす向きに働くため、剛性からmgℓを引く。",
      "エ": "重力を差し引く方向は合う。ばねの伸びと作用腕の両方に高さaが効くため、回転剛性はka² − mgℓになる。",
      "オ": "ばねは微小角θに対して−ka²θ、重力は不安定側にmgℓθのモーメントを与える。これを慣性モーメントmℓ²と組み合わせ、角振動数を2πで割った式が当てはまる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q102.webp"
    ],
    "imageAltTexts": [
      "倒立振り子と壁に接続されたばねの高さ、微小な傾き"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q103",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "動滑車と定滑車の等価慣性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、質量m の小物体が、質量m／2で半径r の円板の定滑車と動滑車をそれぞれ一つずつ介して糸で天井につながれている。小物体が静止している状態から、静かに鉛直下向きに等加速度直線運動を始めたとき、小物体の加速度の大きさa として最も妥当なのはどれか。ただし、糸と滑車の間に滑りはなく、滑車の円板の慣性モーメントをmr²／4 、動滑車の加速度の大きさをa／2 、重力加速度の大きさをg、小物体と定滑車との間、定滑車と動滑車との間、動滑車と天井との間に作用する張力の大きさをそれぞれT₁，T₂，T₃、定滑車と動滑車の角速度の大きさをそれぞれω₁，ω₂とする。",
    "choices": {
      "ア": "(2／23)g",
      "イ": "(6／23)g",
      "ウ": "(8／23)g",
      "エ": "(9／23)g",
      "オ": "(12／23)g"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "物体の速さをvとすると、動滑車の並進速度はv／2、滑車の角速度はv／rとv／(2r)で、等価質量はm + m／8 + m／4 + m／16 = 23m／16となる。正味の重力仕事は単位下降距離当たり3mg／4なので、加速度は12g／23である。",
    "choiceExplanations": {
      "ア": "物体が下がると動滑車はその半分だけ上がる。重りの重力による仕事の一部は動滑車の位置エネルギーになるが、有効な下向き力は3mg／4ある。",
      "イ": "動滑車の上昇速度は物体の速さの半分であり、平行移動のエネルギーは速度二乗に比例する。このため動滑車の並進慣性の寄与はm／8になる。",
      "ウ": "糸が滑らないため、定滑車の角速度はv／r、動滑車はv／(2r)になる。転動のエネルギーも含めると、物体の速さに換算した等価質量は23m／16である。",
      "エ": "動滑車の重量が小物体の半分で、上昇距離も半分である。重力の正味の仕事は小物体の下降距離当たり3mg／4となり、この値から9g／23にはならない。",
      "オ": "物体の速さをvとすると、動滑車の並進速度はv／2、滑車の角速度はv／rとv／(2r)で、等価質量はm + m／8 + m／4 + m／16 = 23m／16となる。正味の重力仕事は単位下降距離当たり3mg／4なので、加速度は12g／23である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q103.webp"
    ],
    "imageAltTexts": [
      "定滑車・動滑車、重り、糸の張力と各部の加速度"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q104",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "物理振り子と平行軸の定理",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、軽い棒の先に取り付けられた球の微小振動を考える。この球を質量がM の質点とみなしたとき、原点O から質点までの距離がℓ の単振り子の微小振動の周期をT₀とする。一方、この球を質量がM、半径がr、球の中心まわりの慣性モーメントが2Mr²／5の一様な剛体球とみなしたとき、原点O から球の中心までの距離がℓ の微小振動の周期をT とする。この二つの微小振動の周期の関係T／T₀を表したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "√[1 + (2／5)(r／ℓ)²]",
      "イ": "√[1 + (3／2)(r／ℓ)²]",
      "ウ": "√[1 + (r／ℓ)²]",
      "エ": "√[1 + (2／3)(r／ℓ)²]",
      "オ": "√[1 + (5／2)(r／ℓ)²]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "球を剛体として扱うと支点周りの慣性モーメントはMℓ² + 2Mr²／5になる。重力の復元係数Mgℓは質点の場合と同じなので、周期比はその慣性モーメント比の平方根となる。",
    "choiceExplanations": {
      "ア": "球を剛体として扱うと支点周りの慣性モーメントはMℓ² + 2Mr²／5になる。重力の復元係数Mgℓは質点の場合と同じなので、周期比はその慣性モーメント比の平方根となる。",
      "イ": "球の中心周りの慣性モーメントは問題文で2Mr²／5と指定されている。慣性モーメントの比でr²の係数が3／2になることはない。",
      "ウ": "球の大きさに伴う慣性モーメントはMr²ではなく2Mr²／5である。支点周りへの換算でMℓ²を別に加える。",
      "エ": "重力は球の重心に作用するので、復元係数は質点の場合と同じである。変わる慣性モーメントは、球中心周りの2Mr²／5を加えた値となる。",
      "オ": "分数5／2は与えられた球の慣性モーメントの係数を逆にした値である。平行軸の定理では球中心周りの慣性を2Mr²／5のまま加える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q104.webp"
    ],
    "imageAltTexts": [
      "支点から距離ℓの位置に球を取り付けた振り子"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q105",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "揚力と水平定常旋回",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、航空機が半径R の円軌道上を、鉛直方向からの角θ が30°となるように機体を傾かせて一定の速さV で水平定常旋回している。このとき、R として最も妥当なのはどれか。ただし、L は揚力、W は重量をそれぞれ表し、重力加速度の大きさをg とする。",
    "choices": {
      "ア": "V²／(2g)",
      "イ": "√3 V²／(3g)",
      "ウ": "2V²／(3g)",
      "エ": "2√3 V²／(3g)",
      "オ": "√3 V²／g"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "鉛直のつり合いはL cos30° = W、水平方向の運動方程式はL sin30° = (W／g)V²／Rである。二式を割るとR = V²／(g tan30°) = √3 V²／gとなる。",
    "choiceExplanations": {
      "ア": "鉛直成分が重量とつり合うため、水平方向の加速度はg tan30°である。V²／(2g)では、水平方向の加速度が実際より大きくなりすぎる。",
      "イ": "√3／3はtan30°に当たる。旋回半径を求める式はV²をg tan30°で割るため、その逆数を使う。",
      "ウ": "向心加速度は揚力の水平成分から決まる。重量の鉛直つり合いも使うとg tan30°となり、半径の係数は2／3ではない。",
      "エ": "この半径では向心加速度がg tan30°より大きくなる。揚力の鉛直成分と水平方向の成分の比は傾斜角30°で決まる。",
      "オ": "鉛直のつり合いはL cos30° = W、水平方向の運動方程式はL sin30° = (W／g)V²／Rである。二式を割るとR = V²／(g tan30°) = √3 V²／gとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q105.webp"
    ],
    "imageAltTexts": [
      "水平定常旋回中の航空機に働く揚力、重量及び軌道半径"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q106",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "熱力学第二法則と理想気体の状態量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "熱力学に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．熱力学第一法則及び第二法則によれば、供給された全ての熱を仕事に変換することはできるが、供給された全ての仕事を熱に変換することはできない。\n㋑．孤立した系の内部で可逆変化のみが生じた場合、系全体のエントロピーは変化しない。\n㋒．理想気体の内部エネルギーは温度のみの関数であるため、理想気体を可逆的に等温膨張させた場合、内部エネルギーに変化はないが、エンタルピーは増大する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "孤立系には熱や物質によるエントロピーの出入りがなく、可逆変化なら内部での生成もゼロである。このため系全体のエントロピーは変わらない。",
    "choiceExplanations": {
      "ア": "㋑は妥当である。仕事は摩擦などで全て熱に変換できる一方、一つの熱源から得た熱を周期的に全て仕事に変える熱機関は第二法則に反する。",
      "イ": "㋐は熱と仕事の変換の制約を逆にしている。理想気体では内部エネルギーとともにエンタルピーも温度の関数なので、㋒も誤りである。",
      "ウ": "㋐は熱機関で熱を仕事に完全に換えることについて誤っている。㋒も、等温変化で理想気体のエンタルピーが増えるとしている点が誤りである。",
      "エ": "孤立系には熱や物質によるエントロピーの出入りがなく、可逆変化なら内部での生成もゼロである。このため系全体のエントロピーは変わらない。",
      "オ": "㋑は合う。理想気体のエンタルピーは内部エネルギーとpVの和で、pVも温度で決まるので、等温膨張で変化しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q107",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 107,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "工業仕事と絶対仕事の関係",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、理想気体が状態①から状態②に可逆変化をしたものとする。このとき、状態変化により理想気体から取り出せる工業仕事Wₜ を表す式と、絶対仕事W₁₂とWₜ の関係を表す式の組合せとして最も妥当なのはどれか。ただし、理想気体の圧力をp、体積をV とし、①のときの気体の圧力をp₁、体積をV₁、 ②のときの気体の圧力をp₂、体積をV₂とする。",
    "choices": {
      "ア": "Wₜ = ∫[②,①] V dp ／ Wₜ = W₁₂ + p₁V₁ − p₂V₂",
      "イ": "Wₜ = ∫[②,①] V dp ／ Wₜ = W₁₂ + p₁V₂ − p₂V₁",
      "ウ": "Wₜ = ∫[①,②] V dp ／ Wₜ = W₁₂ + p₂V₂ − p₁V₁",
      "エ": "Wₜ = ∫[①,②] p dV ／ Wₜ = W₁₂ + p₁V₁ − p₂V₂",
      "オ": "Wₜ = ∫[①,②] p dV ／ Wₜ = W₁₂ + p₂V₂ − p₁V₁"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "状態①から②に進む工業仕事は−∫[①,②] V dp = ∫[②,①] V dpである。部分積分すると∫p dV + p₁V₁ − p₂V₂となり、積分項は絶対仕事W₁₂である。",
    "choiceExplanations": {
      "ア": "状態①から②に進む工業仕事は−∫[①,②] V dp = ∫[②,①] V dpである。部分積分すると∫p dV + p₁V₁ − p₂V₂となり、積分項は絶対仕事W₁₂である。",
      "イ": "工業仕事の積分の向きは合う。境界項は各端点での圧力と同じ端点の体積の積なので、p₁V₂やp₂V₁は現れない。",
      "ウ": "変化中のdpは負であり、気体から取り出す工業仕事を正に取ると積分の前に負号が必要である。端点のpV差の符号も逆になる。",
      "エ": "∫[①,②] p dVは体積変化に伴う絶対仕事である。工業仕事にはこれに加えて流入と流出のpVの差が入る。",
      "オ": "工業仕事の微小量は−V dpである。p dVの積分を用いる場合は、流入側p₁V₁を加え、流出側p₂V₂を引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 107。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q107.webp"
    ],
    "imageAltTexts": [
      "理想気体が状態①から②へ変化する際の圧力と体積の関係"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q108",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 108,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "理想気体の定圧・定積エントロピー変化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "理想気体が、次のａ，ｂのように状態変化する場合を考える。それぞれの場合における理想気体の比エントロピー変化量をΔsₐ，Δsᵦ とするとき、Δsₐ／Δsᵦ の値として最も妥当なのはどれか。ただし、この理想気体の定積比熱をcᵥ、定圧比熱をcₚ とする。\n\nａ 圧力一定のもと、理想気体の温度が500 K から2000 K まで上昇する。\nｂ 体積一定のもと、理想気体の温度が250 K から500 K まで上昇する。",
    "choices": {
      "ア": "6cₚ／cᵥ",
      "イ": "6cᵥ／cₚ",
      "ウ": "2cₚ／cᵥ",
      "エ": "2cᵥ／cₚ",
      "オ": "(cₚ／cᵥ)ln 2"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "定圧ではΔsₐ = cₚ ln(2000／500) = cₚ ln 4、定積ではΔsᵦ = cᵥ ln(500／250) = cᵥ ln 2となる。ln 4 = 2 ln 2なので、比は2cₚ／cᵥである。",
    "choiceExplanations": {
      "ア": "エントロピー変化に使う温度の関数は温度差の比ではなく、温度比の自然対数である。ln 4とln 2の比は2であり、6にはならない。",
      "イ": "定圧の過程ａにはcₚ、定積の過程ｂにはcᵥを用いる。この並びは比熱の分子と分母を入れ替えている。",
      "ウ": "定圧ではΔsₐ = cₚ ln(2000／500) = cₚ ln 4、定積ではΔsᵦ = cᵥ ln(500／250) = cᵥ ln 2となる。ln 4 = 2 ln 2なので、比は2cₚ／cᵥである。",
      "エ": "温度比の対数から得る係数2は合う。定圧変化を分子に置くため、比熱の比はcₚ／cᵥである。",
      "オ": "定積の場合にもln 2が掛かっている。分子のln 4を2 ln 2と書けば対数は約分され、ln 2は結果に残らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 108。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q109",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 109,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "定常流の工業仕事とエンタルピー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "開いた系に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。「作動流体の位置エネルギー及び運動エネルギーの変化を無視でき、可逆変化する開いた系（以下「開いた系」という。）において、作動流体の比エンタルピーをh とする。開いた系に加えた単位質量当たりの熱量q 及び開いた系がする単位質量当たりの工業仕事wₜ を用いて、微小変化に対する熱力学第一法則はdq = dh + dwₜ と表すことができる。したがって、外部との熱交換がなく、開いた系である流体機械に圧力1.0 MPa、比体積0.54 m³/kg、比内部エネルギー600 kJ/kg の作動流体が定常的に流入し、この機械から圧力0.10 MPa、比体積2.4 m³/kg、比内部エネルギー200 kJ/kg の流体が定常的に流出する場合、質量流量が1.0 kg/s であるとすると、この機械の動力は ㋐ kW であり、流体機械は ㋑ ことを意味する。」",
    "choices": {
      "ア": "400 ／ 外部へ仕事をする",
      "イ": "430 ／ 外部から仕事をされる",
      "ウ": "430 ／ 外部へ仕事をする",
      "エ": "700 ／ 外部から仕事をされる",
      "オ": "700 ／ 外部へ仕事をする"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "入口は600 + 1000×0.54 = 1140 kJ/kg、出口は200 + 100×2.4 = 440 kJ/kgである。断熱かつ質量流量1 kg/sなので、差の700 kWを外部へ仕事として取り出す。",
    "choiceExplanations": {
      "ア": "400 kJ/kgは比内部エネルギーの減少分である。開いた系では圧力と比体積の積による流動仕事も含めた比エンタルピーを用いる。",
      "イ": "入口の比エンタルピーは1140 kJ/kg、出口は440 kJ/kgである。断熱の場合はその差が機械から外部へ出る仕事になる。",
      "ウ": "外部へ仕事をするという方向は合う。比エンタルピーを求める際に、1 kPa・m³ = 1 kJとして入口と出口それぞれのpvを加えると700 kJ/kgの差になる。",
      "エ": "動力の大きさ700 kWは合う。流体は機械を通るとき比エンタルピーを失っており、その分の仕事を外部へ渡す。",
      "オ": "入口は600 + 1000×0.54 = 1140 kJ/kg、出口は200 + 100×2.4 = 440 kJ/kgである。断熱かつ質量流量1 kg/sなので、差の700 kWを外部へ仕事として取り出す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 109。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q110",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 110,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "カルノーサイクルの放熱とエントロピー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "温度477 ℃の高温熱源から1サイクル当たり500 kJ の熱を受け仕事を行い、温度27 ℃の低温熱源に熱を排出して作動する可逆カルノーサイクルの熱機関がある。この熱機関の放熱過程における作動流体のエントロピー変化量として最も妥当なのはどれか。ただし、両熱源の温度は不変であり、熱源と熱機関との間の熱の授受を含め、全ての過程は可逆過程である。また、熱機関の作動流体は理想気体である。",
    "choices": {
      "ア": "-1.05 kJ/K",
      "イ": "-0.67 kJ/K",
      "ウ": "-0.10 kJ/K",
      "エ": "0.67 kJ/K",
      "オ": "1.33 kJ/K"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "高温側の可逆吸熱によるエントロピー増加は500／750 ≈ 0.67 kJ/Kである。可逆サイクルで断熱過程の変化はゼロなので、放熱過程は−0.67 kJ/Kになる。",
    "choiceExplanations": {
      "ア": "高温熱源の温度は477ではなく約750 Kに換算する。吸熱で増加したエントロピーと等しい大きさを、放熱過程で失う。",
      "イ": "高温側の可逆吸熱によるエントロピー増加は500／750 ≈ 0.67 kJ/Kである。可逆サイクルで断熱過程の変化はゼロなので、放熱過程は−0.67 kJ/Kになる。",
      "ウ": "放熱量と温度は低温側の値を使うが、放熱のエントロピーの絶対値は高温側の吸熱の値と等しい。500 kJを750 Kで割れば0.10 kJ/Kより大きくなる。",
      "エ": "+0.67 kJ/Kは作動流体が高温側で熱を受け取る過程の変化である。放熱時には作動流体から熱が出るため符号が負になる。",
      "オ": "低温側には高温側で受けた熱の一部を放出する。放熱過程でのエントロピー変化は正ではなく、吸熱過程の値と絶対値が等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 110。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q111",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 111,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "公共事業の純現在価値",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "公共事業においては、費用に対して十分な便益を得られることが求められる。その指標の一つとして純便益を社会的割引率を用いて現在価値に直した「純現在価値」（Net Present Value）があるが、これを表す式として最も妥当なのはどれか。ただし、t を時間（年次）、T を評価期間、r を社会的割引率、t 年次の便益と費用をそれぞれBₜ，Cₜ とする。",
    "choices": {
      "ア": "Σ[t=1…T](Bₜ + Cₜ)(1 + r)^(1 − t)",
      "イ": "Σ[t=1…T](Bₜ／Cₜ)(1 + r)^(1 − t)",
      "ウ": "Σ[t=1…T](Bₜ − Cₜ)(1 + r)^(1 − t)",
      "エ": "Σ[t=1…T](Bₜ − Cₜ)(1 − r)^(1 − t)",
      "オ": "Σ[t=1…T](Bₜ／Cₜ)(1 − r)^(1 − t)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "各年の純便益Bₜ − Cₜを、設問の基準年t = 1からの経過年数t − 1に応じて(1 + r)^(t − 1)で割る。それを評価期間全体にわたって足した式が純現在価値である。",
    "choiceExplanations": {
      "ア": "純便益とは便益から費用を引いたBₜ − Cₜである。便益と費用を足すと、費用が大きい事業ほど値が大きくなる。",
      "イ": "便益を費用で割った値は無次元である。純現在価値は便益と費用の金額の差を割り引いて合計した金額である。",
      "ウ": "各年の純便益Bₜ − Cₜを、設問の基準年t = 1からの経過年数t − 1に応じて(1 + r)^(t − 1)で割る。それを評価期間全体にわたって足した式が純現在価値である。",
      "エ": "分子を純便益にする点は合う。正の社会的割引率を用いると将来の価値が小さくなるよう、分母は1 − rではなく1 + rの累乗になる。",
      "オ": "純便益は比率ではなく便益と費用の差である。正の割引率で先の年度ほど重みを下げるには分母に1 + rを使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 111。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q112",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 112,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "公共交通指向型開発と都市交通調査",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の都市交通に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．TOD（公共交通指向型開発）は、1990年代にアメリカで提唱されたものであるが、我が国においてはそれ以前から実践されてきたものである。\n㋑．パーソントリップ調査は、人の移動に着目して、目的、時間帯、交通手段等を調査するものであるが、都市内での移動の実態を把握する必要があることから、複数の都道府県にまたがる区域が調査の対象となることはない。\n㋒．道路構造の技術的基準について、かつては道路構造令のほかに都市部の道路を対象とする街路構造令も存在していたが、現在では道路構造令に一元化されている。\n㋓．道路の無電柱化について、都市部では地下埋設物の存在など無電柱化に支障となる状況が多いことから、都道府県別の無電柱化率（総道路延長に対する無電柱化された道路延長の割合）は東京都が最も低い。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ＴＯＤという用語の提唱前から、日本では鉄道と駅周辺の開発が一体的に行われてきた。旧来の街路構造令の技術基準は、道路構造令に一元化された。",
    "choiceExplanations": {
      "ア": "㋐は妥当で、日本では鉄道会社による沿線開発などが早くから行われた。パーソントリップ調査は通勤圏などに合わせ、複数の都道府県をまたぐことがある。",
      "イ": "ＴＯＤという用語の提唱前から、日本では鉄道と駅周辺の開発が一体的に行われてきた。旧来の街路構造令の技術基準は、道路構造令に一元化された。",
      "ウ": "㋒の法令の整理は合う。㋑の調査は人の移動を扱い、行政界を越えて首都圏などを対象とすることがある。",
      "エ": "都市の移動を把握するための調査区域は、県境で必ず区切られるわけではない。東京都の無電柱化率は全国で最も低いという説明も誤りである。",
      "オ": "㋒は合う。都市部には施工上の制約もあるが、東京都は他の都道府県と比べ無電柱化が進んでいる地域である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 112。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q113",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 113,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "都市計画基礎調査と再開発",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の都市計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．都道府県は、都市計画区域について、都市計画に関する基礎調査として、人口規模、産業分類別の就業人口の規模、市街地の面積、土地利用、交通量等の現況及び将来の見通しについての調査をおおむね5年ごとに行うこととされている。\n㋑．都市計画区域については、無秩序な市街化を防止し、計画的な市街化を図るため、市街化区域と市街化調整区域との区分を定めなければならない。\n㋒．土地区画整理事業は、事業の施行により宅地の価額が増加することを前提として減歩を行うものであるため、施行後の宅地の価額の総額が施行前の宅地の価額の総額より減少する場合については適用することができない。\n㋓．市街地再開発事業は、都市における土地の合理的かつ健全な高度利用を図るものであるが、高度利用の趣旨に合致している限り、必ずしも施行前の建築物の容積率に比べて施行後の建築物の容積率を高くする必要はない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "都道府県は都市計画の基礎となる調査をおおむね5年ごとに実施する。市街地再開発における高度利用は、施行後の容積率を施行前より必ず上げるという単一の条件では判断しない。",
    "choiceExplanations": {
      "ア": "基礎調査をおおむね5年ごとに行う点は妥当である。区域区分は全ての都市計画区域で義務とされるわけではない。",
      "イ": "都道府県は都市計画の基礎となる調査をおおむね5年ごとに実施する。市街地再開発における高度利用は、施行後の容積率を施行前より必ず上げるという単一の条件では判断しない。",
      "ウ": "区域区分は対象区域により義務又は任意となる。事業前より宅地価額の総額が減った場合も、減価補償金の制度があるため、区画整理自体を一律に適用できないわけではない。",
      "エ": "㋓は妥当である。市街化区域と市街化調整区域の線引きが全ての都市計画区域で義務になるという㋑は誤りである。",
      "オ": "㋓の再開発に関する考え方は妥当である。区画整理で宅地の価額の合計が減少する場合も、事業を行った上で減価補償する扱いがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 113。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q114",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 114,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "河川整備基本方針と河川工事の代行",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の河川計画及び河川管理施設の構造に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．一級河川は、国土保全上又は国民経済上特に重要な水系であって、国によって指定された河川であり、その全ての区間を国が直接管理している。\n㋑．河川整備基本方針において、基本高水のピーク流量は、過去の降雨量の実績値を確率処理することにより設定していたが、気候変動の影響を踏まえ、将来の降雨量の増加を考慮して設定することとされた。\n㋒．都道府県等が管理する河川において、迅速な災害復旧やダム再開発等の高度な技術が必要とされる工事について、都道府県等の要請があり、その要請が適当と認められる場合は、国が都道府県等に代わって、工事を実施できる。\n㋓．護岸は、流水の作用からの堤防の保護や低水路河岸の侵食・洗堀の抑制を目的として設置される構造物であり、堤防や高水敷と一体となって洪水に対して安全な構造とするため、原則として土により築造される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "基本高水の設定で将来の降雨の増加を考慮する方針が採られた。都道府県などから要請があり条件を満たせば、国が高度な技術を要する工事を代行できる。",
    "choiceExplanations": {
      "ア": "気候変動による将来の降雨の変化を基本高水の設定に取り入れる㋑は妥当である。一級河川には都道府県が管理する指定区間もある。",
      "イ": "国が要請を受けて高度な工事を代行できる㋒は妥当である。㋐の一級河川を全区間で国が直接管理するという説明が誤りである。",
      "ウ": "一級河川でも区間によって管理者が異なる。護岸は流水に耐えるためコンクリートや石などを用い、堤防と同様に原則として土で築くという㋓は誤りである。",
      "エ": "基本高水の設定で将来の降雨の増加を考慮する方針が採られた。都道府県などから要請があり条件を満たせば、国が高度な技術を要する工事を代行できる。",
      "オ": "㋒の工事代行は妥当である。護岸は流れから堤防や河岸を保護する表面の施設であり、土を原則とする堤防本体の構造とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 114。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q115",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 115,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "高潮の三つの成因",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "高潮に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「高潮は、台風や発達した低気圧などの接近により海面にかかる大気圧が相対的に低下して海面が上昇する ㋐ 効果と、強風により海水が陸の方向に移動する ㋑ 効果を主な原因として、海面が異常に上昇する現象をいう。また、海岸線付近において砕波により海面が上昇する ㋒ も原因となることがある。」",
    "choices": {
      "ア": "押し上げ／引き寄せ／ウェーブセットアップ",
      "イ": "押し上げ／吹き寄せ／サンドウェーブ",
      "ウ": "吸い上げ／引き寄せ／サンドウェーブ",
      "エ": "吸い上げ／吹き寄せ／サンドウェーブ",
      "オ": "吸い上げ／吹き寄せ／ウェーブセットアップ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "気圧低下による海面上昇が吸い上げで、風によって岸へ水がたまるのが吹き寄せである。砕波の作用による平均水位の上昇をウェーブセットアップという。",
    "choiceExplanations": {
      "ア": "気圧が下がることで海面が持ち上がる現象は吸い上げという。陸向きの強風によって水が岸にたまるのは吹き寄せである。",
      "イ": "強風によって海水が陸側に移動する吹き寄せは合う。気圧の低下は吸い上げ、砕波による平均水位上昇はウェーブセットアップと呼ぶ。",
      "ウ": "低気圧の効果は吸い上げである。強風による陸側への海水の移動は引き寄せではなく吹き寄せである。",
      "エ": "吸い上げと吹き寄せは高潮の主要因である。砕波によって岸近くの平均水位が上がるのはサンドウェーブではなくウェーブセットアップである。",
      "オ": "気圧低下による海面上昇が吸い上げで、風によって岸へ水がたまるのが吹き寄せである。砕波の作用による平均水位の上昇をウェーブセットアップという。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 115。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q116",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 116,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "建築物の断熱性と熱容量による室温応答",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰは断熱性能及び熱容量の異なる建築物A～D を、図Ⅱは図Ⅰの建築物A～D のいずれかに対応する室内空間の暖房開始前から暖房停止後までの室温変動を模式的に表したものである。このとき、A～D と室温変動㋐～㋓の組合せとして最も妥当なのはどれか。ただし、断熱性能と熱容量以外の条件は等しいものとする。",
    "choices": {
      "ア": "㋑／㋐／㋓／㋒",
      "イ": "㋑／㋓／㋐／㋒",
      "ウ": "㋒／㋓／㋐／㋑",
      "エ": "㋓／㋑／㋒／㋐",
      "オ": "㋓／㋒／㋑／㋐"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "熱容量が小さいＡとＢは速く変化し、断熱性の高いＢの室温が高くなるため㋓と㋒である。熱容量が大きいＣとＤは緩やかに変化し、断熱性で比べると㋑と㋐になる。",
    "choiceExplanations": {
      "ア": "熱容量が小さいＡとＢでは、暖房を始めたときの温度変化が速い。Ａをゆっくり変動する㋑、Ｂを同じく遅い㋐に割り当てることはできない。",
      "イ": "㋑では暖房中の室温が徐々に変わるので、熱容量の大きい建物に合う。熱容量の小さいＢは速く温まり、高断熱による高い温度に達する。",
      "ウ": "太い変動のうち㋒と㋓はいずれも室温が速く変わり、熱容量の小さい建物に対応する。断熱性が高いＢの方が高い温度に達するので、㋒をＢに割り当てる。",
      "エ": "ＡとＤの対応は合う。㋑は温度が緩やかに変わり、高い室温に達しないため、低断熱で熱容量が大きいＣに対応する。",
      "オ": "熱容量が小さいＡとＢは速く変化し、断熱性の高いＢの室温が高くなるため㋓と㋒である。熱容量が大きいＣとＤは緩やかに変化し、断熱性で比べると㋑と㋐になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 116。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q116.webp"
    ],
    "imageAltTexts": [
      "断熱性と熱容量の異なる建築物四種類と、暖房開始・停止時の室温の変化"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q117",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 117,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "建築環境性能と熱源の効率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "建築物の環境性能や省エネルギー性能の評価に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．BEMS（ビルエネルギー管理システム）は、第三者評価機関が建築物の省エネルギー性能を評価し認証するもので、性能に応じて★の数により5段階で表示される。\n㋑．CASBEE（建築環境総合性能評価システム）は、建築物の環境性能を総合的に評価するシステムであり、建築物の環境品質と環境負荷から求められた環境効率BEE などにより格付けされる。\n㋒．COP（成績係数）は、熱源装置のエネルギー消費効率を表す指標で、冷・暖房能力を冷・暖房消費電力で除すことで求められる。\n㋓．PAL（年間熱負荷係数）は、建築物の断熱性や気密性などに関する指標で、建築物全体の年間熱負荷を建築物全体の延べ床面積で除すことで求められる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ＣＡＳＢＥＥは建築物の環境品質Ｑと環境負荷Ｌなどから環境効率ＢＥＥを評価する。ＣＯＰは冷暖房などで得られる能力を投入電力で割った値である。",
    "choiceExplanations": {
      "ア": "ＣＡＳＢＥＥは環境性能の評価手法である。第三者評価と星での表示はＢＥＬＳの特徴で、ＢＥＭＳは建物内のエネルギーを監視し管理する仕組みである。",
      "イ": "ＣＯＰは冷暖房能力と消費電力の比である。ＢＥＭＳはエネルギー使用を管理するためのシステムで、省エネ性能の格付け制度ではない。",
      "ウ": "ＣＡＳＢＥＥは建築物の環境品質Ｑと環境負荷Ｌなどから環境効率ＢＥＥを評価する。ＣＯＰは冷暖房などで得られる能力を投入電力で割った値である。",
      "エ": "ＣＡＳＢＥＥの説明は妥当である。ＰＡＬでは外周部の年間熱負荷と外周部の床面積を用い、建物全体の負荷を延べ床面積で割るのではない。",
      "オ": "ＣＯＰの定義は合う。外皮の熱的性能を示すＰＡＬは、外周部を対象とした指標である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 117。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q118",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 118,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "道路と敷地に関する建築基準法",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "建築基準法令に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．幅員4 m 未満の道路に面する敷地について、道路の中心線から2 m の範囲は、敷地面積に参入することができないことがある。\n㋑．隣地が道路の場合、道路境界線から、1階の場合は3 m 以下、2階以上の場合は5 m 以下の距離にある部分を延焼のおそれのある部分という。\n㋒．都市計画区域内及び準都市計画区域内において、建築物の敷地は、原則として、幅員4 m 以上の道路に2 m 以上接しなければならない。\n㋓．道路内の地盤面下に建築物を建築してはならない。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "いわゆる二項道路では、道路中心線から後退した範囲を敷地面積から除く場合がある。都市計画区域等での原則的な接道義務についての㋒も妥当である。",
    "choiceExplanations": {
      "ア": "いわゆる二項道路では、道路中心線から後退した範囲を敷地面積から除く場合がある。都市計画区域等での原則的な接道義務についての㋒も妥当である。",
      "イ": "㋐の後退に関する説明は妥当である。道路内での建築制限には地盤面下の建築物などに関する例外がある。",
      "ウ": "㋒は原則的な接道義務を説明している。道路に面している場合の延焼のおそれのある部分を判断する基準は、道路境界線ではなく道路中心線である。",
      "エ": "㋑の延焼のおそれのある部分では道路の中心線を基準とする。㋓も、道路の地盤面下に設ける建築物の例外を考慮していない。",
      "オ": "㋒は妥当である。道路内の建築制限においては地盤面下に設ける建築物が例外とされているため、㋓を含めることはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 118。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q119",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 119,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "美術館の鑑賞距離・収蔵動線・照明",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "美術館の建築計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．縦3 m × 横4 m の絵画を観賞するためのソファを、絵画の正面から7.5 m 離れた位置に配置した。\n㋑．収蔵品に付着した害虫等による被害を最小限に抑えるため、燻蒸室を荷解室及び収蔵庫からできるだけ離れた位置に配置した。\n㋒．休憩スペースを展示壁面の長さ600 m ごとに配置した。\n㋓．絵画を展示する壁面の照度を、日本画で150～300 lx、洋画で300～750 lx とし、日本画より洋画の方を高くした。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "幅4 mの絵画を正面から見渡せる鑑賞距離をとった配置である。照明の影響に配慮し、一般に日本画の展示照度を洋画より低くする考え方も妥当である。",
    "choiceExplanations": {
      "ア": "大きな絵画に鑑賞距離を確保する㋐は妥当である。600 mも展示壁面が続く間に休憩場所を設けない配置では、鑑賞者の疲労への配慮が不足する。",
      "イ": "幅4 mの絵画を正面から見渡せる鑑賞距離をとった配置である。照明の影響に配慮し、一般に日本画の展示照度を洋画より低くする考え方も妥当である。",
      "ウ": "荷解きした資料を点検し収蔵へ送る動線上に、必要な処理を行える空間を設ける。休憩スペースも歩行距離や滞在時間を考慮して配置する。",
      "エ": "展示照度の考え方は妥当である。燻蒸室は、害虫を収蔵部門へ持ち込まないよう、荷解きや点検の動線と関連付けて設ける。",
      "オ": "㋓は作品の種類に応じて照度を変える説明として合う。展示動線の休憩場所を600 mごととする㋒は間隔が長すぎる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 119。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q120",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 120,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "パッシブな蓄熱・自然換気・採光",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国における地球環境に配慮した建築物の整備に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．建築物が受ける日射量は、冬期においては水平面・東西面が多く、夏期においては南面が多いことから、窓を、南面で大きく、東西面で小さくすることが省エネルギー上有効である。\n㋑．ソーラーチムニーは、太陽熱と高低差による煙突効果を利用して、温度差による自然換気を積極的に活用する方法であり、建築物に設けたボイド（吹き抜け部分）の下部より排気し、上部より給気することで、省エネルギー化を図ることができる。\n㋒．ダイレクトゲインは、床や壁に蓄熱性の高い材料を用い、日射熱を蓄熱体に蓄える方法であり、日没後にも蓄熱体からの放射熱によって室内の温熱環境を良好に保つことで、省エネルギー化を図ることができる。\n㋓．光ダクトは、太陽からの自然光を外壁や屋上から建築物内に取り込み、内面を高反射率鏡面としたダクトの内部を反射させながら室内の必要な場所に導く方法で、自然採光利用による省エネルギー化を図ることができる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "室内へ入った日射熱を床や壁に蓄え、日没後に使うのがダイレクトゲインである。光ダクトは反射面で自然光を導き、照明の電力を抑えられる。",
    "choiceExplanations": {
      "ア": "南向き鉛直面は冬季に日射を得やすく、夏季には東西面などへの日射に注意する。ソーラーチムニーの通常の空気の流れも、下から入って上へ抜ける方向である。",
      "イ": "ダイレクトゲインでは日射熱を仕上げ材や躯体などに蓄える。㋐は季節と方位による日射の説明を取り違えている。",
      "ウ": "床や壁の蓄熱で夜間にも熱を利用する㋒は妥当である。ソーラーチムニーは温められた空気の上昇により、上部から排気する。",
      "エ": "光ダクトは反射を利用して日光を内部へ導く。㋑は太陽熱で上昇する空気の換気方向を逆にしている。",
      "オ": "室内へ入った日射熱を床や壁に蓄え、日没後に使うのがダイレクトゲインである。光ダクトは反射面で自然光を導き、照明の電力を抑えられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 120。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q121",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 121,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "ビザンチン、ローマ、ロマネスクとゴシック",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "西洋建築史に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．ハギア・ソフィア（アヤ・ソフィア）大聖堂（トルコ）は、中央の主ドームを左右の半ドームが支え、その半ドームをさらに小さな三つの半ドームが支える有機的な構造によって内部に広大な空間を有するビザンチン建築である。\n㋑．ケルン大聖堂（ドイツ）は、長大な身廊部、二重内陣、多塔形式、小アーケード帯などを有するロマネスク建築である。\n㋒．ローマのパンテオン（イタリア）は、ローマの神々を祭る神殿で、直径・高さともに約43 m の大ドームと直径約9 m の天窓を有するローマ建築である。\n㋓．ピサ大聖堂（イタリア）は、五廊式、総白色大理石張りで多数の小尖塔を有するゴシック建築である。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ハギア・ソフィアの主ドームと半ドームによる大空間はビザンチン建築を代表する。パンテオンも古代ローマのドーム建築で、頂部に円形の開口を持つ。",
    "choiceExplanations": {
      "ア": "ハギア・ソフィアの主ドームと半ドームによる大空間はビザンチン建築を代表する。パンテオンも古代ローマのドーム建築で、頂部に円形の開口を持つ。",
      "イ": "ハギア・ソフィアの説明は妥当である。ピサ大聖堂は、通常はピサのロマネスク様式を示す代表例に数えられる。",
      "ウ": "パンテオンのドームと天窓は記述に合う。ケルン大聖堂はドイツのゴシック建築であり、ロマネスクとする説明が異なる。",
      "エ": "ケルン大聖堂はゴシック建築、ピサ大聖堂はロマネスク建築に分類される。二つの記述は建築様式を取り違えている。",
      "オ": "パンテオンは古代ローマの建築で、頂部に円形の天窓を持つ。ピサ大聖堂はゴシック建築とする点が誤っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 121。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q122",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 122,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "マンション管理と住宅性能・金融支援",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の住宅行政に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．マンションの管理の適正化の推進に関する法律において、都道府県にマンション管理適正化推進計画の策定が義務化されている。\n㋑．ZEH とは、家の断熱性能や設備の効率を高めることにより家庭で使用するエネルギーを減らしつつ、太陽光などで創るエネルギーを導入して、1年間で消費するエネルギーの量の収支をゼロ以下とすることを目指した住宅のことである。\n㋒．住宅の品質確保の促進等に関する法律に基づく住宅性能表示制度において、構造の安定、火災時の安全、温熱環境・エネルギー消費量、空気環境等について、最大で5段階の等級による評価を行っている。これにより、断熱等性能等級については、ZEH 水準まで評価できる。\n㋓．独立行政法人住宅金融支援機構は、民間金融機関による住宅ローンの提供を支援する証券化支援業務を行うとともに、災害の被災者向けに住宅復旧等に関する直接融資を行っている。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ＺＥＨは断熱、省エネ設備、再生可能エネルギーなどで年間の一次エネルギー収支の実質ゼロ以下を目指す。住宅金融支援機構も証券化支援に加え災害復興住宅融資を取り扱う。",
    "choiceExplanations": {
      "ア": "マンション管理適正化推進計画は地方公共団体が作成できる計画で、都道府県に一律で義務付けられるものではない。断熱等性能等級も5段階を超える区分が設けられている。",
      "イ": "住宅金融支援機構による住宅ローンの証券化支援と災害復興住宅融資は妥当である。㋐はマンション管理の計画策定を義務とする点が誤りである。",
      "ウ": "ＺＥＨの省エネと創エネによる収支の説明は妥当である。断熱等性能等級には6や7も導入されており、最大5段階とする説明は合わない。",
      "エ": "ＺＥＨは断熱、省エネ設備、再生可能エネルギーなどで年間の一次エネルギー収支の実質ゼロ以下を目指す。住宅金融支援機構も証券化支援に加え災害復興住宅融資を取り扱う。",
      "オ": "住宅金融支援機構の業務については妥当である。住宅性能表示制度の断熱等性能等級はＺＥＨ水準に当たる等級5より上の区分も設けている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 122。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q123",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 123,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "災害レッドゾーン・盛土規制・立地適正化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国における都市行政に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．頻発・激甚化する自然災害に対応するため、都市計画法では、都市計画区域全域の災害レッドゾーンについて、自己居住の住宅のためのものを除き、開発行為は原則禁止されている。\n㋑．盛土の崩落による大規模な土石流災害の発生等を踏まえ改正された宅地造成及び特定盛土等規制法では、都市計画区域のみを対象に、都道府県知事は盛土等が行われれば人家に危害を及ぼしうる区域を規制区域として指定することができる。\n㋒．都市機能の高度化及び都市の居住環境の向上を図るため、都市再生特別措置法では、三大都市圏のみを対象に、都市開発事業等を通じて緊急かつ重点的に市街地の整備を推進すべき地域である「都市再生緊急整備地域」を定めることができる。\n㋓．人口の急激な減少と高齢化を背景として、「コンパクトシティ・プラス・ネットワーク」のまちづくりを進めるため、都市再生特別措置法では、都市計画区域のみを対象に、市町村は居住機能や医療・福祉、公共交通等の様々な都市機能の誘導を図る立地適正化計画を作成することができる。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "都市計画法は災害レッドゾーン内の開発行為を原則制限し、自己の居住用住宅などを例外とする。市町村は都市計画区域内の居住や都市機能を誘導する立地適正化計画を作成できる。",
    "choiceExplanations": {
      "ア": "災害レッドゾーンでの開発制限を述べた㋐は妥当である。都市再生緊急整備地域は三大都市圏以外の都市でも指定されている。",
      "イ": "都市計画法は災害レッドゾーン内の開発行為を原則制限し、自己の居住用住宅などを例外とする。市町村は都市計画区域内の居住や都市機能を誘導する立地適正化計画を作成できる。",
      "ウ": "盛土規制法の規制区域は都市計画区域に限られない。都市再生緊急整備地域も三大都市圏に限定されない。",
      "エ": "市町村が都市計画区域で立地適正化計画を作成できる点は妥当である。盛土等の危険がある区域の指定は、都市計画区域の内外を問わず行い得る。",
      "オ": "㋓はコンパクトシティと交通ネットワークを進めるための制度を述べている。㋒は指定対象を三大都市圏だけに限定している点で誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 123。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q124",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 124,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "非線引き区域・計画提案・建築許可",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の都市計画制度に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．市街化区域と市街化調整区域との区分を定めていない都市計画区域では、用途地域の指定は必要ない。\n㋑．都道府県又は市町村に対する都市計画の決定又は変更の提案について、当該提案の対象となる土地の所有者等は提案できるが、まちづくり団体は提案できない。\n㋒．都市計画施設の区域内において建築物の建築をする時は、原則、都道府県知事等の許可を受けなければならない。\n㋓．第一種低層住居専用地域において店舗兼用住宅ではない店舗の建築を行う場合、用途制限を緩和できる地域地区制度が無いので、必ず建築基準法に基づく特定行政庁の許可を受けなければならない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "都市計画区域でも区域区分を定めない場合には、用途地域を必ず指定する義務はない。都市計画施設の区域内での建築には、原則として都道府県知事等の許可が必要である。",
    "choiceExplanations": {
      "ア": "非線引き都市計画区域では用途地域の指定は必須ではない。一定の要件を満たすまちづくり団体も都市計画の提案を行える。",
      "イ": "都市計画区域でも区域区分を定めない場合には、用途地域を必ず指定する義務はない。都市計画施設の区域内での建築には、原則として都道府県知事等の許可が必要である。",
      "ウ": "㋒の許可は妥当である。都市計画法には土地所有者等だけでなく、一定の団体にも計画提案を認める仕組みがある。",
      "エ": "まちづくり団体なども要件を満たせば提案できる。用途制限には特別用途地区とその条例などによる緩和の仕組みがある。",
      "オ": "㋒は妥当である。一方、第一種低層住居専用地域でも、特別用途地区などを通じて用途制限の例外を設ける仕組みがあり、常に個別許可だけに限られない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 124。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q125",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 125,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "都市デザイン・公園ネットワーク・ＴＯＤ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "都市計画や都市デザインの理論・制度に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．街路の歩行安全性を確保するために、住宅街でも自動車を受け入れ、車道をわざと屈曲させるなど、自動車を低速走行させて歩車共存をさせる手法としてオランダで適用されたクルドサックがある。\n㋑．アメリカでは、公園整備の手法として、プロムナードから樹木と水辺を連続して整備することで、市街地の拡大に対して先行的な自然地の保全やレクリエーションのネットワークをつくるパークシステムが用いられた。\n㋒．市街地の開発などにおいて、地域のエリアの維持管理や価値向上を目指して、中心市街地における、小売商業の活性化を主眼としたまちづくりを運営する機関をエリアマネジメント組織という。\n㋓．公共交通のターミナル付近で高密度の都市開発を行い、鉄道等の大量高速輸送機関を整備し、各駅で徒歩圏の高密度居住を実現する手法を、TOD（公共交通指向型都市開発）という。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "パークシステムは緑地や水辺を連結し、自然保全とレクリエーションのネットワークを形成する。ＴＯＤは公共交通の駅の徒歩圏に住宅などを高密度に配置する考え方である。",
    "choiceExplanations": {
      "ア": "オランダで低速走行と歩車共存を図った手法はボンエルフである。クルドサックは行き止まりと転回空間を持つ道路の構成をいう。",
      "イ": "㋓は公共交通に近い場所への開発を進めるＴＯＤに合う。㋐の車道の屈曲などを用いる手法は、クルドサックよりボンエルフに当たる。",
      "ウ": "㋑は緑地などを結んで公園のネットワークを作るパークシステムを述べている。エリアマネジメントは地域の管理・価値向上を広く扱い、小売商業の活性化を主眼とする機関だけを指さない。",
      "エ": "パークシステムは緑地や水辺を連結し、自然保全とレクリエーションのネットワークを形成する。ＴＯＤは公共交通の駅の徒歩圏に住宅などを高密度に配置する考え方である。",
      "オ": "㋓は妥当である。㋒は中心市街地の小売商業の活性化に重点を置く組織と、用途や地区を限定しないエリアマネジメントを混同している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 125。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q126",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 126,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "半導体の温度依存性・不純物・接合",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "半導体のバンド構造、電気伝導に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．固体の導電率の温度依存性を調べることにより、その物質が金属か半導体かを区別することができる。\n㋑．シリコン単結晶に不純物として少量のリンを入れると、ドナー準位が生じる。ドナー準位の電子は僅かなエネルギーで伝導帯に飛び移り自由電子のように振る舞うため、n 型半導体となる。\n㋒．シリコン単結晶に不純物として少量のホウ素を入れると、アクセプタ準位が生じる。このアクセプタ準位にホールが生成されることでp 型半導体となる。\n㋓．p 型とn 型の半導体を接合すると、接合界面付近にキャリア密度が極めて小さな領域が形成される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "金属と半導体は典型的には温度による導電率の変化が異なり、リンを添加したシリコンではドナーが電子を供給する。ｐｎ接合付近ではキャリアが減少した空乏層が生じる。",
    "choiceExplanations": {
      "ア": "金属と半導体の導電率の温度依存性の違いと、リンがドナーになる点は妥当である。ｐｎ接合での空乏層を述べた㋓も妥当である。",
      "イ": "金属と半導体は典型的には温度による導電率の変化が異なり、リンを添加したシリコンではドナーが電子を供給する。ｐｎ接合付近ではキャリアが減少した空乏層が生じる。",
      "ウ": "㋐と㋓は合う。ホウ素のアクセプター準位は電子を受け取り、その結果として正孔が生成されるのは価電子帯である。",
      "エ": "リンによるｎ型化の説明は妥当である。正孔をアクセプター準位に生じるとする㋒は誤っている。",
      "オ": "ｐｎ接合の界面付近でキャリアが少なくなるという㋓は妥当である。ｐ型の正孔は価電子帯に生じ、アクセプター準位そのものに正孔が生じるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 126。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q127",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 127,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "面心立方格子と最密充填",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "立方最密充填構造に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「立方最密充填構造の単位格子は面心立方格子として知られ、最密充填層の積層方向はこの単位格子の ㋐ 方向である。また、配位数は ㋑ であり、四面体間隙の数は八面体間隙の数の ㋒ 倍である。」",
    "choices": {
      "ア": "［110］／8／2",
      "イ": "［110］／12／4",
      "ウ": "［111］／8／4",
      "エ": "［111］／12／2",
      "オ": "［111］／12／4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "面心立方格子の最密面は{111}面なので積層方向は［111］であり、配位数は12である。単位格子内には四面体間隙8個と八面体間隙4個がある。",
    "choiceExplanations": {
      "ア": "四面体間隙と八面体間隙の数の比2は合う。最密面は{111}面であり、一つの原子は12個の最近接原子に囲まれる。",
      "イ": "配位数12は妥当である。最密面の積層方向は［111］で、四面体間隙の数は八面体間隙の4倍ではない。",
      "ウ": "最密面の積層方向は［111］で合う。同じ層に6、上下の層に各3の最近接原子があり、配位数は12である。",
      "エ": "面心立方格子の最密面は{111}面なので積層方向は［111］であり、配位数は12である。単位格子内には四面体間隙8個と八面体間隙4個がある。",
      "オ": "［111］と配位数12は合う。単位格子当たりの四面体間隙は8個、八面体間隙は4個なので、その比は2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 127。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q128",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 128,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "二元系状態図の共晶・包晶・自由度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図に示す大気圧下のA‒B 二元系状態図（図Ⅰ）及びA‒C 二元系状態図（図Ⅱ）に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。ただし、各状態図において、L，α，β，γ は、それぞれ液相、α相、β相、γ相を示す。\n\n㋐．図Ⅰは共晶型状態図であり、α相中のB 元素が最大固溶度を有する状態はX 点で示される。図Ⅱは包晶型状態図であり、α相中のC 元素が最大固溶度を有する状態はY 点で示される。\n㋑．α + β 二相領域内にて平衡冷却した場合に生じるα相中のB 濃度の変化は、α + γ 二相領域内にて同一温度差の平衡冷却において生じるα相中のC 濃度の変化よりも大きい。\n㋒．A‒B 二元系又はA‒C 二元系の液相単相領域において任意に変化させ得る示強性状態変数の数は1個である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図Ⅰの共晶型でのα相の最大固溶度はＸ、図Ⅱの包晶型ではＹである。両図の低温側の固溶限を比較すると、同じ温度差で図Ⅰのα相の組成変化の方が大きい。",
    "choiceExplanations": {
      "ア": "ＸとＹがそれぞれのα相の固溶限を示すことは妥当である。低温側の固溶限の線を比較すると、同じ温度差での組成の変化は図Ⅰの方が大きいという㋑も成立する。",
      "イ": "図Ⅰの共晶型でのα相の最大固溶度はＸ、図Ⅱの包晶型ではＹである。両図の低温側の固溶限を比較すると、同じ温度差で図Ⅰのα相の組成変化の方が大きい。",
      "ウ": "㋑の固溶限の比較は合う。図ⅠのＸと図ⅡのＹがα相の最大固溶度を示すという㋐も妥当である。",
      "エ": "α相の固溶限の変化を比較した㋑は妥当である。圧力一定の二元系の液体単相領域では、温度と独立な組成の二つを変えられる。",
      "オ": "圧力を固定した二元系の単相では、相律から自由度は2 − 1 + 1 = 2である。温度に加え、二成分のうち一方の濃度を独立に変えられる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 128。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q128.webp"
    ],
    "imageAltTexts": [
      "Ａ－Ｂ系の共晶型とＡ－Ｃ系の包晶型の二元系状態図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q129",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 129,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "加工ひずみと再結晶温度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属材料の（一次）再結晶に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「ある一定以上の変形を受けた金属材料を加熱すると再結晶が生じ、格子欠陥密度の ㋐ 結晶粒が形成される。一般に、一定温度で1時間焼鈍したときに再結晶が完了する下限の温度は再結晶温度と呼ばれ、変形温度が一定の場合、変形量が ㋑ ほど再結晶温度は低温になり、再結晶粒径は微細になる傾向がある。また、変形量が一定の場合、変形温度が ㋒ ほど再結晶温度は高温になる。」",
    "choices": {
      "ア": "低い／小さい／低い",
      "イ": "低い／小さい／高い",
      "ウ": "低い／大きい／高い",
      "エ": "高い／小さい／高い",
      "オ": "高い／大きい／低い"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "再結晶で格子欠陥密度が低い新しい粒が生じ、変形量が大きいほど低温で進み、粒が微細になりやすい。変形温度が高いと回復で蓄積エネルギーが減るため、その後の再結晶温度が上がる。",
    "choiceExplanations": {
      "ア": "再結晶では欠陥密度が低い粒が形成される。加工の程度が大きいほど蓄積エネルギーが大きいので、再結晶は低い温度で進みやすい。",
      "イ": "㋒の高い変形温度は合う。㋑では、変形量が大きいと再結晶の駆動力と核生成箇所が増え、低温化や微細化につながりやすい。",
      "ウ": "再結晶で格子欠陥密度が低い新しい粒が生じ、変形量が大きいほど低温で進み、粒が微細になりやすい。変形温度が高いと回復で蓄積エネルギーが減るため、その後の再結晶温度が上がる。",
      "エ": "再結晶で生じる粒は、加工を受けた組織よりも転位などの格子欠陥が少ない。変形量の小ささを低温化の理由とする説明も逆である。",
      "オ": "変形量が大きいと再結晶しやすいという点は合う。ただし形成される粒の欠陥密度は低く、高い変形温度は回復を促して再結晶温度を上げやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 129。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q130",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 130,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "理想気体の等温膨張と理想溶液",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "化学熱力学に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．完全気体の等温膨張では、系になされる仕事w と系に輸送される熱q との間にq = -w の関係があり、膨張が可逆的であればw は最大となる。\n㋑．定容熱容量は、一定体積下で物質の温度を1 K 変化させたときのエンタルピー変化を表しており、一方、定圧熱容量は、一定圧力下で物質の温度を1 K 変化させたときの内部エネルギー変化を表している。\n㋒．等温定圧下で水素が燃焼して水が生じる反応の系のエンタルピー変化、系のエントロピー変化、系のギブズエネルギー変化はそれぞれ負の値、正の値、負の値となる。\n㋓．理想溶液中の溶媒の化学ポテンシャルは、純粋な溶媒の化学ポテンシャルよりも低く、平衡する溶媒の蒸気圧も、理想溶液中の溶媒の蒸気圧の方が純粋な溶媒の蒸気圧よりも小さくなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "公式正答は㋐、㋓で、可逆等温膨張では系が外部にする仕事の大きさが最大となり、系になされる仕事wの符号付きの値は最小になる。㋓の蒸気圧低下はラウールの法則に従う。",
    "choiceExplanations": {
      "ア": "㋑の二つの熱容量の定義は逆である。定容熱容量は内部エネルギー、定圧熱容量はエンタルピーの温度変化と対応する。",
      "イ": "理想気体の等温膨張では内部エネルギーが変わらずq = −wとなる。㋒は水素の燃焼における系のエントロピー変化を正としている点が誤りである。",
      "ウ": "公式正答は㋐、㋓で、可逆等温膨張では系が外部にする仕事の大きさが最大となり、系になされる仕事wの符号付きの値は最小になる。㋓の蒸気圧低下はラウールの法則に従う。",
      "エ": "㋓は妥当である。㋑では定容での内部エネルギー変化と、定圧でのエンタルピー変化の対応を取り違えている。",
      "オ": "溶媒の化学ポテンシャルと蒸気圧が低下する㋓は妥当である。水素の燃焼で水が生じるときの系のエントロピーは設問のように増加するとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 130。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q131",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 131,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "材料工学（金属材料・無機材料）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属材料の塑性変形に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。「純アルミニウムの単結晶の室温における塑性変形は、面内の ㋐ が最も大きい結晶面が特定の方向に互いにすべることにより生じる。この結晶面をすべり面と呼ぶ。図のように、断面積A の単結晶の丸棒に引張力F を加えたとき、すべり面の法線と引張方向のなす角をφ、すべり方向と引張方向のなす角をλ とすると、すべり面上ですべり方向に働く分解せん断応力は(F／A) × ㋑ で与えられる。現実の金属結晶がすべり変形を開始する臨界せん断応力は、転位が存在するため完全結晶の理想せん断応力よりも ㋒ なる。塑性変形中、転位密度は ㋓ する。」",
    "choices": {
      "ア": "原子間距離／sinφ cosλ／大きく／増加",
      "イ": "原子間距離／cosφ cosλ／小さく／減少",
      "ウ": "原子密度／sinφ cosλ／大きく／減少",
      "エ": "原子密度／cosφ cosλ／小さく／増加",
      "オ": "原子密度／cosφ cosλ／小さく／減少"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最密面での応力分解は(F／A)cosφ cosλである。転位はすべり開始に必要な応力を下げ、塑性変形とともに増殖する。",
    "choiceExplanations": {
      "ア": "すべりは原子密度の高い面で起こりやすく、面積への投影にはすべり面法線と引張方向の角φの余弦を用いる。",
      "イ": "二つの余弦を用いる点は合っているが、すべり面を決めるのは大きな原子間距離ではなく高い面内原子密度である。",
      "ウ": "分解せん断応力の因子はcosφ cosλであり、転位があると、すべり開始に必要な応力は理想値より小さくなる。",
      "エ": "最密面での応力分解は(F／A)cosφ cosλである。転位はすべり開始に必要な応力を下げ、塑性変形とともに増殖する。",
      "オ": "実結晶での臨界せん断応力が理想値より小さい点は合うが、通常の塑性変形では転位の増殖により密度が上がる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 131。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q131.webp"
    ],
    "imageAltTexts": [
      "引張力を受ける単結晶丸棒のすべり方向、すべり面法線と引張方向のなす角"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q132",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 132,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "材料工学（金属材料・無機材料）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属材料の強化機構に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．母相原子よりもサイズの大きい置換型溶質原子を固溶させると、刃状転位まわりの余計な原子半面のある側に溶質原子が拡散し、コットレル雰囲気を形成して固溶強化が発現する。\n㋑．面心立方構造をもつ金属単結晶を塑性変形させた際に得られる加工硬化曲線は、容易すべり領域、直線硬化領域、放物線硬化領域に分類でき、このうち放物線硬化領域で最も大きな加工硬化率を示す。\n㋒．室温において結晶粒微細化強化された金属材料であっても、粒界すべりが生じるような高温域では、結晶粒径が小さいほど強度が低下し、超塑性現象が発現する場合がある。\n㋓．析出相粒子による強化機構としては、粒子せん断機構と粒子バイパス機構があり、両者の兼ね合いによって、析出相形成のための時効処理に伴う強度変化、すなわち時効硬化曲線の形状を説明することができる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "微細粒の材料では高温で粒界すべりによる超塑性が生じ得る。時効硬化には析出物をせん断する機構と迂回する機構が関わる。",
    "choiceExplanations": {
      "ア": "㋐の大きい溶質原子は刃状転位の引張側に集まりやすい。㋑では直線硬化領域が最も高い加工硬化率を示す。",
      "イ": "㋒の高温での粒界すべりは妥当だが、㋐の余分な原子半面がある側は圧縮側で、大きい溶質原子が集まる側とは逆である。",
      "ウ": "㋓の析出強化機構は妥当だが、㋐の大きい置換型溶質原子は圧縮側よりも引張側に入る方がひずみを緩和しやすい。",
      "エ": "㋓は妥当だが、㋑の放物線硬化領域では動的回復により直線硬化領域より加工硬化率が低下する。",
      "オ": "微細粒の材料では高温で粒界すべりによる超塑性が生じ得る。時効硬化には析出物をせん断する機構と迂回する機構が関わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 132。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q133",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 133,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "材料工学（金属材料・無機材料）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属の破壊や変形に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．一定荷重下で連続的に変形が生じる金属のクリープ現象は、多くの場合、遷移クリープ、定常クリープ、加速クリープの3段階で進行する。\n㋑．室温で延性を示す金属でも使用温度によっては脆性破壊をすることがある。\n㋒．鋼は、室温で繰返し負荷を加えられることにより、負荷中に動的再結晶を生じ疲労破壊することがある。\n㋓．ビッカース硬さ試験は、球状圧子を材料表面に押し込み、できたくぼみの大きさから材料の硬さを評価する方法である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "クリープには遷移・定常・加速の各段階があり、金属によっては温度の低下に伴い延性破壊から脆性破壊に移行する。",
    "choiceExplanations": {
      "ア": "クリープには遷移・定常・加速の各段階があり、金属によっては温度の低下に伴い延性破壊から脆性破壊に移行する。",
      "イ": "㋐と㋑は妥当だが、㋒の疲労破壊は繰返しによるき裂の発生・進展で説明され、動的再結晶を前提としない。",
      "ウ": "㋐は妥当だが、㋓のビッカース試験では対面角が一定の四角すい形ダイヤモンド圧子を使用する。",
      "エ": "㋑は妥当だが、疲労は繰返し荷重によるき裂進展で生じ、ビッカース試験の圧子は球形ではない。",
      "オ": "㋒の室温疲労では繰返し荷重によるき裂の進展が重要であり、㋓の球状圧子はブリネル試験で用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 133。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q134",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 134,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "材料工学（金属材料・無機材料）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "チタン酸バリウムに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「チタン酸バリウムBaTiO₃は ㋐ 構造を有し、室温では正方晶であり強誘電体として知られる。BaTiO₃を室温から加熱するとキュリー点において正方晶から ㋑ への相転移が起こり、強誘電性が消失する。キュリー点では誘電率はピークを示し、それより ㋒ 温度では誘電率はキュリー‒ワイス則に従い変化する。」",
    "choices": {
      "ア": "イルメナイト／立方晶／低い",
      "イ": "イルメナイト／直方晶／高い",
      "ウ": "ペロブスカイト／立方晶／高い",
      "エ": "ペロブスカイト／立方晶／低い",
      "オ": "ペロブスカイト／直方晶／低い"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "BaTiO₃はペロブスカイト型で、キュリー点で正方晶から立方晶に転移する。誘電率のキュリー・ワイス則は高温の常誘電相で成り立つ。",
    "choiceExplanations": {
      "ア": "BaTiO₃はABO₃型のペロブスカイト構造をとる。キュリー・ワイス則を適用する常誘電相はキュリー点より高温側である。",
      "イ": "高温側という点は合うが、BaTiO₃はペロブスカイト型であり、加熱してキュリー点に達すると立方晶に変わる。",
      "ウ": "BaTiO₃はペロブスカイト型で、キュリー点で正方晶から立方晶に転移する。誘電率のキュリー・ワイス則は高温の常誘電相で成り立つ。",
      "エ": "ペロブスカイト型と立方晶への転移は合うが、誘電率がキュリー・ワイス則に従うのはキュリー点より高温側である。",
      "オ": "加熱時の転移先は立方晶であり、キュリー・ワイス則に従う常誘電相は高温側に現れる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 134。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q135",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 135,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "材料工学（金属材料・無機材料）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ナノ粒子に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「ナノ粒子の物性はバルクの物性と異なることがある。Au のナノ粒子では粒子径が小さくなるほど表面エネルギーが高くなるため、融点が ㋐ する。また、Au ナノ粒子は金属光沢を示さず、赤などの特定の色を示す。これはAu ナノ粒子の ㋑ が光の電場によって集団的な振動運動を起こし、特定の波長の光を ㋒ することによって生じる。」",
    "choices": {
      "ア": "増加／束縛電子／放出",
      "イ": "増加／自由電子／吸収",
      "ウ": "低下／束縛電子／放出",
      "エ": "低下／自由電子／放出",
      "オ": "低下／自由電子／吸収"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "粒子の小径化により融点が低下する。自由電子の集団振動による局在表面プラズモン共鳴で、特定の波長の光が吸収される。",
    "choiceExplanations": {
      "ア": "粒径が小さくなると表面の寄与が増して融点は下がり、色は自由電子の集団振動が特定の波長を吸収することで現れる。",
      "イ": "自由電子による特定波長の吸収は妥当である。Auの粒径が小さくなるほど融点は低くなる。",
      "ウ": "融点が下がる点は妥当である。局在表面プラズモン共鳴を生じるのは自由電子で、特定波長の光に吸収が現れる。",
      "エ": "融点の低下と自由電子の振動は妥当だが、この記述で特定の色を生じさせる過程は光の吸収である。",
      "オ": "粒子の小径化により融点が低下する。自由電子の集団振動による局在表面プラズモン共鳴で、特定の波長の光が吸収される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 135。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q136",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 136,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "原子核・放射線",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "²³⁵U（ウラン235）の核分裂断面積に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「²³⁵U の核分裂断面積は、低エネルギー領域では中性子の速さにおおむね ㋐ することが知られている。また、周囲の媒質と熱平衡状態又はそれに近い状態にある中性子は熱中性子と呼ばれ、媒質の温度が20 ℃の場合における熱中性子の平均エネルギーは約 ㋑ である。一方、熱中性子よりも高いエネルギーをもつ中性子に対する²³⁵U の核分裂断面積は、中性子エネルギーの変化に伴い大きな増減を繰り返す。この現象は、中性子のエネルギーが複合核の ㋒ と一致した時に核反応が起こりやすくなることを示している。」",
    "choices": {
      "ア": "反比例／0.025 eV／結合エネルギー",
      "イ": "反比例／0.025 eV／励起準位",
      "ウ": "反比例／2.5 eV／励起準位",
      "エ": "比例／2.5 eV／結合エネルギー",
      "オ": "比例／2.5 eV／励起準位"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "低速ではおおむね1/v則に従い、共鳴は複合核の励起準位に対応する。0.025 eVは20 ℃での代表値k_BTで、厳密なマクスウェル分布の平均運動エネルギー3k_BT／2は約0.038 eVである。",
    "choiceExplanations": {
      "ア": "低速では1/v則に従い、0.025 eVは熱中性子の代表値である。共鳴を決めるのは、入射により形成された複合核の励起準位である。",
      "イ": "低速ではおおむね1/v則に従い、共鳴は複合核の励起準位に対応する。0.025 eVは20 ℃での代表値k_BTで、厳密なマクスウェル分布の平均運動エネルギー3k_BT／2は約0.038 eVである。",
      "ウ": "1/v則と励起準位は合うが、20 ℃での熱中性子の代表エネルギーは2.5 eVの約100分の1である。",
      "エ": "速度への比例ではなく低速での反比例が近似として成り立つ。2.5 eVも20 ℃での熱中性子の代表値より大きい。",
      "オ": "共鳴は複合核の励起準位に対応するが、低速域では速度への反比例であり、熱中性子を代表する値は約0.025 eVである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 136。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q137",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 137,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "原子核・放射線",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射性核種の壊変に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．半減期T と壊変定数λ の間には、 λT = 1／ln 2 の関係がある。\n㋑．壊変定数λ の放射性核種の時刻0における放射能をA₀とすると、この放射性核種の時刻t における放射能A(t) は、A(t) = A₀e^(−λt) で表される。\n㋒．放射性核種の平均寿命τ は壊変定数λ の逆数に等しい。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "核種の放射能はA₀e^(−λt)で減少し、指数分布の平均寿命は1／λである。半減期は(ln 2)／λである。",
    "choiceExplanations": {
      "ア": "半減期ではA(T)／A₀ = 1／2となるため、e^(−λT) = 1／2を対数に取るとλT = ln 2となる。",
      "イ": "㋑の指数減衰式は妥当である。㋐のλTはln 2の逆数ではなく、ln 2に等しい。",
      "ウ": "㋒では平均寿命を1／λとする点が妥当である。㋐ではλTをln 2の逆数としており、半減期の式に合わない。",
      "エ": "放射能が指数関数的に減るという㋑は妥当で、指数分布に従う壊変までの時間の平均が1／λになるという㋒も妥当である。",
      "オ": "核種の放射能はA₀e^(−λt)で減少し、指数分布の平均寿命は1／λである。半減期は(ln 2)／λである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 137。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q138",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 138,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "原子核・放射線",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射線の線量に関する次の記述の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。「 ㋐ 線量は、X 線やγ線が空気を通過する際に引き起こす電離（イオン化）を電荷量として表したものである。 ㋑ 線量は、放射線がある物質を通過する際に、その物質に付与された放射線のエネルギーを表したものである。放射線の種類ごとに生体への影響が異なることを考慮し、 ㋑ 線量に重み付けしたものを ㋒ 線量という。人体は組織ごとに放射線感受性が異なるため、これを考慮して ㋒ 線量に重み付けして全身にわたって足し合わせたものを ㋓ 線量という。 ㋓ 線量は発がんなどの確率的影響を考慮する際に用い、その単位としては ㋔ を用いる。」",
    "choices": {
      "ア": "吸収／照射／実効／等価／Gy",
      "イ": "吸収／照射／等価／実効／Sv",
      "ウ": "照射／吸収／実効／等価／Gy",
      "エ": "照射／吸収／等価／実効／Gy",
      "オ": "照射／吸収／等価／実効／Sv"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "電離を照射線量、付与エネルギーを吸収線量で表す。放射線の種類と組織の感受性を順に反映するのが等価線量と実効線量で、後者の単位はSvである。",
    "choiceExplanations": {
      "ア": "空気中の電離による電荷を表すのは照射線量で、物質の単位質量に付与されるエネルギーを表すのが吸収線量である。",
      "イ": "等価線量、実効線量、Svは合うが、空気中の電離と物質へのエネルギー付与に対応する最初の二つの線量が逆である。",
      "ウ": "放射線の種類で吸収線量を重み付けすると等価線量となり、組織ごとに重み付けして合計すると実効線量となる。",
      "エ": "四つの線量の並びは合っている。Gyは吸収線量の単位で、人体への影響を評価する実効線量の単位はSvである。",
      "オ": "電離を照射線量、付与エネルギーを吸収線量で表す。放射線の種類と組織の感受性を順に反映するのが等価線量と実効線量で、後者の単位はSvである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 138。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q139",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 139,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "原子核・放射線",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "中性子の検出法に関する次の記述の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。「中性子は運動エネルギーによって検出法が異なる。 ㋐ は物質中の原子核との ㋑ により減速される際、物質を構成する元素の質量数が小さいほど、効率よく減速される。 ㋒ 原子を多く含むプラスチックシンチレータや有機液体シンチレータの中では ㋓ がはじき出され、この ㋓ によるシンチレーション（発光）を観測することで ㋐ を検出できる。一方、十分に減速された ㋔ では原子核反応が利用される。比例計数管にBF₃ガスや³Heガスを充填し、¹⁰B（n，α）⁷Li や³He（n，p）³H といった原子核反応で発生するα粒子などの荷電粒子を観測することで ㋔ を検出できる。また、¹⁹⁷Au（n，γ）¹⁹⁸Au という放射化を利用した検出法もある。」",
    "choices": {
      "ア": "高速中性子／クーロン力／水素／陽子／熱中性子",
      "イ": "高速中性子／弾性散乱／水素／陽子／熱中性子",
      "ウ": "高速中性子／弾性散乱／炭素／炭素イオン／熱中性子",
      "エ": "熱中性子／クーロン力／水素／陽子／高速中性子",
      "オ": "熱中性子／弾性散乱／炭素／炭素イオン／高速中性子"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "高速中性子を水素で散乱させ、反跳陽子による発光を観測する。熱中性子は原子核反応で生じる荷電粒子や放射化を利用して検出できる。",
    "choiceExplanations": {
      "ア": "中性子は電荷を持たず、物質の原子核との弾性散乱でエネルギーを失う。水素からは反跳陽子が生じる。",
      "イ": "高速中性子を水素で散乱させ、反跳陽子による発光を観測する。熱中性子は原子核反応で生じる荷電粒子や放射化を利用して検出できる。",
      "ウ": "水素核は中性子と質量が近いため大きなエネルギーを受け取れる。有機シンチレータで主に利用する荷電粒子は反跳陽子である。",
      "エ": "反跳陽子を利用する方式は高速中性子に適する。十分に減速された熱中性子に対しては、原子核反応を利用する方式が適する。",
      "オ": "高速中性子の散乱で水素の反跳陽子を検出し、減速後の熱中性子の検出では核反応を利用する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 139。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q140",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 140,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "原子核・放射線",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "核融合反応に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「現在開発中の核融合炉では、重水素（D）と三重水素（T）の核融合反応（DT 反応）からのエネルギーを取り出すことを目標としている。DT 反応は低エネルギーでの核融合反応断面積が大きく、また、1回の反応により17.6 MeV という大きなエネルギーを放出することから、最も有望な核融合反応と考えられている。DT 反応からは中性子とα粒子が放出され、放出エネルギーの約80 ％を ㋐ が担う。燃料となる三重水素は ㋑ の半減期をもつ放射性核種であり天然にはほとんど存在しないことから、中性子と ㋒ の核反応により製造する。」",
    "choices": {
      "ア": "α粒子／12.3年／リチウム",
      "イ": "α粒子／30.1年／ナトリウム",
      "ウ": "中性子／12.3年／ナトリウム",
      "エ": "中性子／12.3年／リチウム",
      "オ": "中性子／30.1年／ナトリウム"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "放出エネルギーの約80％に当たる14.1 MeVを中性子が持つ。半減期約12.3年の三重水素は、リチウムとの核反応で補う構想である。",
    "choiceExplanations": {
      "ア": "DT反応のα粒子は約3.5 MeVを担い、約14.1 MeVを担う中性子が全放出エネルギーの約80％に相当する。",
      "イ": "約80％のエネルギーを担うのは中性子であり、三重水素の半減期は約12.3年である。",
      "ウ": "中性子と12.3年は妥当である。民生用核融合炉で想定される三重水素の増殖には、リチウムとの核反応を利用する。",
      "エ": "放出エネルギーの約80％に当たる14.1 MeVを中性子が持つ。半減期約12.3年の三重水素は、リチウムとの核反応で補う構想である。",
      "オ": "中性子がエネルギーの約80％を担うが、三重水素の半減期は約12.3年であり、その増殖に利用するのはリチウムである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 140。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q141",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 141,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "原子炉・核燃料サイクル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "無限増倍率k∞を表す四因子公式は、中性子再生率をη、熱中性子利用率をf、共鳴吸収を逃れる確率をp、高速核分裂因子をε とすると、k∞ = ηfpεと表される。この四因子公式に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．η は、燃料が熱中性子1個を吸収したときに核分裂で生まれる次の世代の中性子の平均個数である。\n㋑．f は、体系内で吸収された熱中性子のうち、特に構造材に吸収されたものの割合である。\n㋒．p は、減速を始めた中性子のうち、共鳴吸収されずに熱中性子領域まで減速される割合である。\n㋓．ε は、高速中性子によって起こされる核分裂により中性子が増える効果の程度を表す。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒、㋓",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋒、㋓",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ηは燃料に吸収された熱中性子当たりの生成数、pは共鳴吸収を逃れる割合、εは高速核分裂で生成数が増える効果を表す。",
    "choiceExplanations": {
      "ア": "㋐の中性子再生率の説明は妥当である。㋑の熱中性子利用率が示すのは燃料への吸収の割合である。",
      "イ": "ηは燃料に吸収された熱中性子当たりの生成数、pは共鳴吸収を逃れる割合、εは高速核分裂で生成数が増える効果を表す。",
      "ウ": "中性子再生率と共鳴吸収を逃れる確率の記述は妥当であり、高速核分裂による増加を表す㋓も含める必要がある。",
      "エ": "㋒と㋓は妥当だが、㋑のfは全熱中性子吸収に占める燃料での吸収の割合であり、構造材の割合とは異なる。",
      "オ": "高速核分裂因子の㋓は合うが、㋑のfは全熱中性子吸収のうち燃料による吸収の割合を指す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 141。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q142",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 142,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "原子炉・核燃料サイクル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国における高レベル放射性廃棄物の最終処分に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐．高レベル放射性廃棄物は、最終処分前に崩壊熱を除去するため、3 ～5年程度は放射線遮蔽と熱除去を備えた施設で貯蔵される方針である。\n㋑．高レベル放射性廃棄物には、数十年程度の比較的短い半減期を持つ⁹⁰Sr（ストロンチウム90）や¹³⁷Cs（セシウム137）に加え、1万年以上の半減期を持つ¹²⁹I（ヨウ素129）や⁹⁹Tc（テクネチウム99）なども含まれる。\n㋒．最終処分で予定されている地層処分の多重バリアシステムとは、人工的に設けられる多層の安全防護系（人工バリア）と、種々の安全防護機能を本来的に備えている地層（天然バリア）との組合せによって構成される。\n㋓．高レベル放射性廃棄物を継続的に冷却するため、地層処分場は地下水の流速が速い帯水層付近に作ることが好ましい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "廃棄物には数十年の半減期を持つ核種と長寿命核種が含まれる。地層処分では人工バリアと天然の地層を組み合わせて核種の移行を抑制する。",
    "choiceExplanations": {
      "ア": "㋑の核種の説明は妥当だが、崩壊熱が下がるまでの貯蔵は通常30～50年程度が想定されている。",
      "イ": "㋒は妥当である。㋐では遮蔽下で熱を除く貯蔵期間を3～5年としており、計画で用いる目安より一桁短い。",
      "ウ": "㋐の貯蔵は約30～50年が目安である。㋓では核種の移行を抑える観点から、地下水の流動の小さい地層が望ましい。",
      "エ": "廃棄物には数十年の半減期を持つ核種と長寿命核種が含まれる。地層処分では人工バリアと天然の地層を組み合わせて核種の移行を抑制する。",
      "オ": "㋒の多重バリアの説明は妥当だが、㋓のような地下水の流れが速い帯水層は、核種の移行を抑えるには適さない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 142。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q143",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 143,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "原子炉・核燃料サイクル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "原子炉圧力容器に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「原子炉圧力容器（又は原子炉容器）は、主に ㋐ で構成されている。しかし、 ㋐ は耐食性が良くないため、これらの圧力容器の内面には ㋑ などによる内張りが行われ、腐食を抑制している。原子炉圧力容器の ㋐ は、中性子の照射を受けると、靱性が ㋒ 。」",
    "choices": {
      "ア": "ステンレス鋼／低合金鋼／低下する",
      "イ": "低合金鋼／ステンレス鋼／上昇する",
      "ウ": "低合金鋼／ステンレス鋼／低下する",
      "エ": "ニッケル合金／ステンレス鋼／上昇する",
      "オ": "ニッケル合金／低合金鋼／低下する"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "強度と靱性を備えた低合金鋼の容器に、耐食性を補うステンレス鋼などの内張りを施す。母材は中性子照射により脆化する。",
    "choiceExplanations": {
      "ア": "圧力を支える母材に低合金鋼、冷却水に接する内張りに耐食性の高いステンレス鋼などを用いる。",
      "イ": "母材と内張りの組合せは妥当である。中性子照射によって鋼が脆化するため、靱性は上昇せず低下する。",
      "ウ": "強度と靱性を備えた低合金鋼の容器に、耐食性を補うステンレス鋼などの内張りを施す。母材は中性子照射により脆化する。",
      "エ": "代表的な容器の母材は低合金鋼で、中性子照射で靱性は低下する。ステンレス鋼を内張りに用いる点は合う。",
      "オ": "靱性が低下する点は妥当である。容器母材は低合金鋼で、内張りにはより耐食性の高い材料を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 143。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q144",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 144,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "原子炉・核燃料サイクル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "原子炉の自己制御性に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「原子炉は、何らかの原因によって出力が上昇すると自動的に核分裂の割合を減少させ、出力の増加を抑制するように設計される。例えば、熱中性子炉では、燃料温度の上昇に伴い、 ㋐ の割合が増加し、それによって出力の上昇が抑制される。また、 ㋑ では、減速材の温度が上昇すると、水の密度が低下し、 ㋒ が弱まり、出力の上昇が抑制される。」",
    "choices": {
      "ア": "核分裂／軽水炉／減速する効果",
      "イ": "核分裂／高速炉／ドップラー効果",
      "ウ": "捕獲反応／軽水炉／減速する効果",
      "エ": "捕獲反応／軽水炉／ドップラー効果",
      "オ": "捕獲反応／高速炉／ドップラー効果"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "燃料温度上昇に伴う共鳴捕獲の増加が出力を抑える。軽水炉では水温上昇による密度低下で中性子を減速する効果が弱まる。",
    "choiceExplanations": {
      "ア": "軽水炉で減速効果が弱まる点は妥当である。燃料温度が上昇すると、共鳴のドップラー広がりにより中性子捕獲が増える。",
      "イ": "燃料温度のフィードバックを生じさせるのは共鳴捕獲の増加である。水の密度と減速能力の変化を用いた説明は軽水炉に当たる。",
      "ウ": "燃料温度上昇に伴う共鳴捕獲の増加が出力を抑える。軽水炉では水温上昇による密度低下で中性子を減速する効果が弱まる。",
      "エ": "捕獲と軽水炉は合うが、水の密度変化についての空欄は減速する効果である。ドップラー効果は、前段の燃料温度の説明に関係する。",
      "オ": "燃料温度の上昇で捕獲は増えるが、水を減速材に用いる例は軽水炉であり、水密度の低下で減速作用が弱くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 144。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q145",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 145,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "原子炉・核燃料サイクル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "BWR から改良型BWR（ABWR）への改良点について、妥当でないものはどれか。",
    "choices": {
      "ア": "制御棒駆動装置の位置が、原子炉圧力容器底部から上蓋部になった。",
      "イ": "制御棒駆動装置が、水圧駆動から、出力制御時は電動駆動に、スクラム時は水圧駆動になった。",
      "ウ": "原子炉冷却系ポンプが、外部再循環方式から内部再循環方式になった。",
      "エ": "原子炉格納容器が、鋼製から鉄筋コンクリート型になった。",
      "オ": "非常用炉心冷却系（ECCS）に、高圧系・低圧系の独立3系統構成を採用した。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "改良型沸騰水型炉でも、制御棒駆動装置は原子炉圧力容器下部にあり、炉心に制御棒を下から挿入するため、この記述が妥当でない。",
    "choiceExplanations": {
      "ア": "改良型沸騰水型炉でも、制御棒駆動装置は原子炉圧力容器下部にあり、炉心に制御棒を下から挿入するため、この記述が妥当でない。",
      "イ": "ABWRの改良型制御棒駆動装置では通常時の位置調整に電動を用い、緊急時のスクラムには水圧を用いる。",
      "ウ": "ABWRでは内部に設置したインターナルポンプで冷却材を再循環させ、外部再循環配管を省く構成が採られている。",
      "エ": "ABWRの設計では、鋼製ライナを備えた鉄筋コンクリート製の原子炉格納容器が採用されている。",
      "オ": "非常用炉心冷却系は高圧系と低圧系を含む独立した三つの区分に分けられ、系統の独立性を確保している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 145。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q146",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 146,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "船舶海洋工学（流体）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "比重がa の一様な氷山が静穏な海面に静かに浮いている。この氷山の海面下に沈んでいる部分の体積を海面上に出ている部分の体積で除した体積比として最も妥当なのはどれか。ただし、海水の比重をb とする。",
    "choices": {
      "ア": "b／(b − a)",
      "イ": "a／(b − a)",
      "ウ": "b／(b + a)",
      "エ": "(b − a)／(b + a)",
      "オ": "a／(b + a)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "浮力と重さの釣合いはb V_水没 = a V_全体となる。V_露出 = V_全体 − V_水没なので、比V_水没／V_露出はa／(b − a)となる。",
    "choiceExplanations": {
      "ア": "浮力と氷山の重さの釣合いから水没部の全体に対する比はa／bとなる。分子bを使った式は氷山全体を露出部で割る形である。",
      "イ": "浮力と重さの釣合いはb V_水没 = a V_全体となる。V_露出 = V_全体 − V_水没なので、比V_水没／V_露出はa／(b − a)となる。",
      "ウ": "全体から水没部を差し引いて露出部を求めるため、露出部の体積は(b − a)／bに比例する。",
      "エ": "求める分子は露出部に比例するb − aではなく、水没部に比例するaであり、分母のb + aも露出部に対応しない。",
      "オ": "水没部がaに比例する点は妥当である。露出部の比率は全体から水没部を差し引いた(b − a)／bである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 146。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q147",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 147,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "船舶海洋工学（流体）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "浮体の静的釣合いに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。「清水中で、一辺の長さがa の一様な正方形断面の角柱が図Ⅰのような状態で浮いている。この角柱の比重が0.5であるとき、この角柱は ㋐ である。一方、清水中で、同じ角柱が図Ⅱ のような状態で浮いているとき、メタセンタ高さGM は ㋑ である。ただし、角柱の奥行きは十分に長く、角柱の密度は一様であるものとする。」",
    "choices": {
      "ア": "不安定／−(√2／6)a",
      "イ": "不安定／(√2／6)a",
      "ウ": "不安定／(√2／3)a",
      "エ": "安定／(√2／6)a",
      "オ": "安定／(√2／3)a"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図ⅠではBM = a／6、BG = a／4でGMが負となる。図ⅡではBM = (√2／3)a、BG = (√2／6)aであり、GMは(√2／6)aとなる。",
    "choiceExplanations": {
      "ア": "図Ⅰが不安定という点は合うが、図Ⅱでは水線幅が√2 aに増え、メタセンタは重心より(√2／6)a上にある。",
      "イ": "図ⅠではBM = a／6、BG = a／4でGMが負となる。図ⅡではBM = (√2／3)a、BG = (√2／6)aであり、GMは(√2／6)aとなる。",
      "ウ": "図Ⅰは不安定である。図Ⅱの(√2／3)aは浮心BからメタセンタMまでの距離で、GMを求めるにはBGを差し引く。",
      "エ": "図ⅡのGMは合っている。図ⅠのGMはa／6 − a／4 = −a／12であり、微小な傾斜に対して不安定である。",
      "オ": "図Ⅰではメタセンタが重心より下にある。図Ⅱでは(√2／3)aのBMから(√2／6)aのBGを差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 147。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q147.webp"
    ],
    "imageAltTexts": [
      "正方形断面の角柱が水平な辺または対角線を水面に合わせて浮く二つの姿勢"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q148",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 148,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "船舶海洋工学（流体）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "推進効率に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「推進効率η は、船体抵抗の大きさR、船の前進する速さV 及びプロペラの駆動に必要な馬力P を用いて、次のように表すことができる。\n\nη = ㋐\n\nここで、プロペラが作動すると、摩擦抵抗の増加及びプロペラが船尾付近の水を後方に押して加速させることによる船体表面の圧力の ㋑ に伴い、R が増加する。また、プロペラの推力の大きさT に対して、船が前進するのに有効に作用するプロペラの推力が減少する割合として推力減少率t = (T − R)／T を考えると、造船設計を行う上でP をできるだけ小さくするには、t を ㋒ させればよい。」",
    "choices": {
      "ア": "P／(RV) ／ 増加 ／ 増加",
      "イ": "P／(RV) ／ 減少 ／ 増加",
      "ウ": "RV／P ／ 増加 ／ 減少",
      "エ": "RV／P ／ 減少 ／ 増加",
      "オ": "RV／P ／ 減少 ／ 減少"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "推進効率は有効出力RVと駆動動力Pの比RV／Pであり、船尾付近の圧力は下がる。推力減少率を下げると同じRに必要なTが小さくなる。",
    "choiceExplanations": {
      "ア": "推進効率は有効出力RVを駆動動力Pで割って求める。船尾付近ではプロペラの作動により船体表面の圧力が低下する。",
      "イ": "船尾付近の圧力は低下するが、推進効率の式が逆である。推力減少率を小さくすると、同じ有効推力に必要な推力を抑えられる。",
      "ウ": "推進効率の定義と推力減少率を小さくする点は合うが、プロペラは船尾付近の流れを吸い込むため船体表面の圧力が低下する。",
      "エ": "効率の定義と圧力低下は合う。所定のRに対しT = R／(1 − t)なので、必要な推力を抑えるにはtを小さくする。",
      "オ": "推進効率は有効出力RVと駆動動力Pの比RV／Pであり、船尾付近の圧力は下がる。推力減少率を下げると同じRに必要なTが小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 148。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q149",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 149,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "船舶海洋工学（流体）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船体抵抗の次元解析に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「船体抵抗の大きさR〔N〕は、流体の密度ρ〔kg/m³〕、船体の長さL〔m〕、船の前進する速さ V〔m/s〕、流体の粘性係数μ〔Pa・s〕、重力加速度の大きさg〔m/s²〕及び船体形状を表す無次元の係数K の関数として、次のように表すことができる。\n\nR = ΣKρᵃLᵇVᶜμᵈgᵉ\n\nただし、a，b，c，d，e は全て実数である。ここで、次元解析を行い、a，b，c，d，e の関係式を求めると、a = ㋐ ，b = 2 - d + e， c = 2 - d - 2e となることから、全抵抗係数 R／(ρL²V²) は次のように表すことができる。\n\nR／(ρL²V²) = ΣK(㋑)^(−d)[V／√(gL)]^(−2e)\n\nこれは、全抵抗係数が、 ㋑ で表されるレイノルズ数及び V／√(gL) で表される ㋒ の関数となることを意味する。」",
    "choices": {
      "ア": "1 − d ／ ρLV／μ ／ フルード数",
      "イ": "1 − d ／ μLV／ρ ／ フルード数",
      "ウ": "1 − d ／ μLV／ρ ／ ストローハル数",
      "エ": "1 + d ／ ρLV／μ ／ ストローハル数",
      "オ": "1 + d ／ μLV／ρ ／ フルード数"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "質量の指数を比較するとa + d = 1となる。慣性力と粘性力に関わる無次元数はρLV／μで、重力と慣性力に関わるV／√(gL)はフルード数である。",
    "choiceExplanations": {
      "ア": "質量の指数を比較するとa + d = 1となる。慣性力と粘性力に関わる無次元数はρLV／μで、重力と慣性力に関わるV／√(gL)はフルード数である。",
      "イ": "a = 1 − dとフルード数の記述は妥当だが、レイノルズ数は動粘性係数μ／ρでLVを割った値である。",
      "ウ": "質量の指数の関係は合うが、レイノルズ数にはρLV／μを用い、V／√(gL)はフルード数と呼ぶ。",
      "エ": "ρLV／μはレイノルズ数である。質量の次元には密度と粘性係数からa + dが寄与し、V／√(gL)はフルード数である。",
      "オ": "フルード数の記述は妥当だが、質量指数はa + d = 1を満たし、レイノルズ数の分母には粘性係数μが入る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 149。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q150",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 150,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "船舶海洋工学（流体）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船の操縦運動方程式に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。「船の操縦運動を1次系のモデルで表したものとして、次の式が用いられることがある。ここで、 r は回頭角速度、δは舵角、t は時間である。\n\nT・dr(t)／dt + r(t) = K・δ(t)\n\nT は ㋐ に関する時定数、K は ㋑ に関するゲイン定数を表す。これらの定数を実船について求めるための方法として ㋒ が知られている。いま、T = -1，K = -1のとき、船は針路不安定である。そこで、これを安定化するため、\n\nδ(t) = c・r(t)\n\nというような制御を行うことを考える。ここで、c は制御ゲインを表す係数である。このとき、 ㋓ とすれば船は針路安定になる。」",
    "choices": {
      "ア": "追従性や針路安定性／旋回力や旋回性／Z試験／c < −1",
      "イ": "追従性や針路安定性／旋回力や旋回性／旋回腕試験／c > 1",
      "ウ": "旋回力や旋回性／追従性や針路安定性／Z試験／c < −1",
      "エ": "旋回力や旋回性／追従性や針路安定性／Z試験／c > 1",
      "オ": "旋回力や旋回性／追従性や針路安定性／旋回腕試験／c < −1"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "Tは応答と針路安定性、Kは旋回性を表し、これらはZ試験で同定できる。式に代入するとdr／dt = (1 + c)rなので、安定条件はc < −1である。",
    "choiceExplanations": {
      "ア": "Tは応答と針路安定性、Kは旋回性を表し、これらはZ試験で同定できる。式に代入するとdr／dt = (1 + c)rなので、安定条件はc < −1である。",
      "イ": "TとKの意味は合うが、実船での同定にはZ試験が用いられる。c > 1では係数1 + cが正となり微小な回頭が増大する。",
      "ウ": "安定条件とZ試験は合っている。Tは応答速度や針路安定性に関係し、Kは舵角に対する旋回のゲインを表す。",
      "エ": "時定数TとゲインKの意味が入れ替わっている。c > 1のときも回頭角速度は指数的に増大する。",
      "オ": "制御ゲインの条件は合うが、時定数Tは追従性や針路安定性を示す。実船での操縦性の推定に使うのはZ試験である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 150。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q151",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 151,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "船舶海洋工学（構造）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、三つのひずみゲージを、x 軸が船の長手方向、 y 軸が船の幅方向を向くように船の上甲板に貼り付けた。これによりひずみを計測したところ、ε_x = 167 × 10⁻⁶，ε_y = 50.0 × 10⁻⁶，ε₄₅ = 99.0 × 10⁻⁶であった。このとき、計測箇所に作用している船の長手方向の垂直応力の大きさとして最も妥当なのはどれか。ただし、ヤング率をE = 206 GPa、ポアソン比をν = 0.300とし、板厚方向の応力は無視できるものとする。また、上甲板に用いられる材料は一様であり、等方性を有するものとする。",
    "choices": {
      "ア": "31.3 MPa",
      "イ": "34.4 MPa",
      "ウ": "37.5 MPa",
      "エ": "41.2 MPa",
      "オ": "48.8 MPa fy y x f45 45° fx O"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "平面応力ではσ_x = E(ε_x + νε_y)／(1 − ν²)であり、数値を代入すると約41.2 MPaとなる。45度方向のひずみは面内せん断ひずみを求めるときに使う。",
    "choiceExplanations": {
      "ア": "長手方向応力はε_xとε_yの両方を含む平面応力の式で計算する。E(167 + 0.300 × 50.0) × 10⁻⁶／0.91は約41.2 MPaになる。",
      "イ": "34.4 MPaはEε_xに相当する。幅方向の応力によるポアソン効果もε_xに含まれるため、一軸応力の式では評価できない。",
      "ウ": "E(ε_x + νε_y)は約37.5 MPaである。平面応力のひずみ式を連立してσ_xを解くと、さらに1 − ν²で割る必要がある。",
      "エ": "平面応力ではσ_x = E(ε_x + νε_y)／(1 − ν²)であり、数値を代入すると約41.2 MPaとなる。45度方向のひずみは面内せん断ひずみを求めるときに使う。",
      "オ": "平面応力の式ではε_yにνを掛けてε_xに加える。与えられた値で計算した垂直応力は約41.2 MPaとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 151。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q151.webp"
    ],
    "imageAltTexts": [
      "船の長手方向、幅方向及び45度方向に取り付けた三つのひずみゲージ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q152",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 152,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "船舶海洋工学（構造）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船舶の試運転においてマストが主機の起振力と共振し、激しく振動した。この対策としてマストを補強することが難しかったので、マストの上部におもりを搭載してマストの固有振動数を下げ、主機の起振振動数より小さくして共振を回避することを考えた。試運転時のマストの固有振動数が10 Hz であり、これを0.4 Hz 減じて9.6 Hz とすることを目標とした。質量1 t のおもりを搭載したとき、マストの固有振動数は9.8 Hz となった。目標の9.6 Hz とするために必要なおもりの質量の総量として最も妥当なのはどれか。ただし、マストの質量はおもりの質量に比べて十分に大きいものとする。また、マストの振動は図に示す1自由度振動系にモデル化できるものとする。",
    "choices": {
      "ア": "0.3 t",
      "イ": "0.5 t",
      "ウ": "2 t",
      "エ": "4 t",
      "オ": "8 t"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "振動数の二乗の逆数は質量に比例するため、必要な追加質量は[(10／9.6)² − 1]／[(10／9.8)² − 1] t ≈ 2.06 tとなる。最も近いのは2 tである。",
    "choiceExplanations": {
      "ア": "質量を増すと固有振動数は下がる。1 tを載せても9.8 Hzまでしか下がらないため、0.3 tでは9.6 Hzに達しない。",
      "イ": "0.5 tは最初に試した質量1 tより小さく、得られる固有振動数は9.8 Hzより高い。",
      "ウ": "振動数の二乗の逆数は質量に比例するため、必要な追加質量は[(10／9.6)² − 1]／[(10／9.8)² − 1] t ≈ 2.06 tとなる。最も近いのは2 tである。",
      "エ": "最初の1 tに対する必要質量の比は、振動数の逆二乗の増加量の比で約2.06である。4 tはこの目安を上回る。",
      "オ": "目標までの振動数低下は、1 tを載せたときの低下のほぼ2倍である。小さな変化の範囲で必要な追加質量は約2 tとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 152。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q152.webp"
    ],
    "imageAltTexts": [
      "上端固定のばねとその下端のおもりからなる1自由度振動系"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q153",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 153,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "船舶海洋工学（構造）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船体強度に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐．船体が重力や浮力等の外力を受けて曲げ変形するとき、図のように船底側が曲げの引張方向に変形する状態をホギング状態という。\n㋑．船体全体を1本の梁とみなしたときの曲げ、せん断、ねじりに抵抗する強度を縦強度という。\n㋒．船体の一部分のみに作用する力に抵抗する強度を局部強度という。例えば、船首部では、船底が海面上に露出したのち、海面に衝突するスロッシングと呼ばれる現象が生じ得るため、船首構造を検討する上で注意を払う必要がある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "船体を一本の梁として扱い、船体全体に生じる曲げ、せん断及びねじりへの抵抗を評価する強度が縦強度である。",
    "choiceExplanations": {
      "ア": "㋑は妥当だが、㋐の船底が引張りを受ける曲げはサギングである。ホギングでは船底が圧縮される。",
      "イ": "㋑は妥当である。㋐の状態はサギングであり、㋒で説明する船底の海面への衝突はスラミングである。",
      "ウ": "船体を一本の梁として扱い、船体全体に生じる曲げ、せん断及びねじりへの抵抗を評価する強度が縦強度である。",
      "エ": "㋑は妥当だが、㋒の海面への衝突はスラミングと呼ばれる。スロッシングはタンク等に入った液体の揺動を指す。",
      "オ": "㋒は衝撃現象の名称が異なる。船体全体の曲げなどに対する強度を縦強度とする㋑が妥当である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 153。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q153.webp"
    ],
    "imageAltTexts": [
      "船の両端に曲げモーメントが働き船体中央が下にたわむ模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q154",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 154,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "船舶海洋工学（構造）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船体構造設計における構造部材の許容応力として材料の降伏応力に安全率を考慮した値を設定し、発生応力がこの許容応力以下になるようにすることを考える。図のような幅w、深さd の矩形断面を有する一様な梁に、曲げモーメントM のみが作用するとき、梁の降伏応力をσ_Y、安全率を2とすると、この梁で許容される最大曲げモーメントとして最も妥当なのはどれか。ただし、梁の軸に垂直な断面は曲げモーメントが作用した後も梁の軸に垂直で、かつ、平面を保つものとする。",
    "choices": {
      "ア": "σ_Ywd²／3",
      "イ": "σ_Yw²d／6",
      "ウ": "σ_Ywd²／6",
      "エ": "σ_Yw²d／12",
      "オ": "σ_Ywd²／12"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "中立軸についてI = wd³／12なので断面係数はI／(d／2) = wd²／6である。許容応力σ_Y／2を掛けるとσ_Ywd²／12となる。",
    "choiceExplanations": {
      "ア": "深さdの矩形断面の断面係数はwd²／6である。さらに許容応力はσ_Y／2なので、最大値はσ_Ywd²／12となる。",
      "イ": "今回の曲げでは断面係数に幅ではなく深さの二乗が入る。応力の上限には安全率2による低減も必要である。",
      "ウ": "σ_Ywd²／6では表面の応力が降伏応力に到達する。安全率が2なので、許容できるモーメントはさらにその半分である。",
      "エ": "分母12は安全率を反映した値である。図の向きで曲げるとき断面係数の分子はw²dではなくwd²となる。",
      "オ": "中立軸についてI = wd³／12なので断面係数はI／(d／2) = wd²／6である。許容応力σ_Y／2を掛けるとσ_Ywd²／12となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 154。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-kogaku/q154.webp"
    ],
    "imageAltTexts": [
      "両端に曲げモーメントが作用する梁と幅w、深さdの矩形断面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-kogaku-q155",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 155,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "船舶海洋工学（構造）",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船体材料に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。「船体には、鉄に炭素が添加された鉄鋼材料が使用されることが多い。鉄鋼材料は、一般に、炭素の含有量が多くなるほど引張強さは ㋐ なり、引張試験を実施したときの破断時の伸びは ㋑ なる。また、高い耐食性が求められる箇所にはステンレス鋼が使用される。ステンレス鋼の耐食性が高くなるのは、合金元素の ㋒ が酸素と反応し、表面に不動態皮膜を形成するためである。」",
    "choices": {
      "ア": "大きく／大きく／クロム",
      "イ": "大きく／小さく／クロム",
      "ウ": "大きく／小さく／マンガン",
      "エ": "小さく／大きく／マンガン",
      "オ": "小さく／小さく／クロム"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "炭素の含有量が増えると一般に引張強さが増し、延性が低下して破断時の伸びは小さくなる。クロムは表面に酸化物を主体とする不動態皮膜を作る。",
    "choiceExplanations": {
      "ア": "炭素の増加に伴って引張強さが上がる傾向とクロムの説明は妥当である。一方、破断時の伸びは一般に小さくなる。",
      "イ": "炭素の含有量が増えると一般に引張強さが増し、延性が低下して破断時の伸びは小さくなる。クロムは表面に酸化物を主体とする不動態皮膜を作る。",
      "ウ": "炭素増加による強度と伸びの方向は正しい。ステンレス鋼に高い耐食性を与える不動態皮膜の形成にはクロムが寄与する。",
      "エ": "炭素の増加は通常、引張強さの増加と伸びの低下につながる。不動態皮膜の形成を担う主な元素はクロムである。",
      "オ": "破断伸びの低下とクロムは妥当である。炭素含有量の増加は一般に引張強さを大きくする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007475.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 155。解説は過去問AIの独自作成。"
  }
];
