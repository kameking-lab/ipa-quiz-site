import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2025_SENMON_KOGAKU: Question[] = [
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q010",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "斜面に沿った投射距離の最大化",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、水平面から30°をなす斜面上から、小球を斜面から角度 θ の方向に、初速度の大きさ v₀ で投げる。小球を投げた位置から小球が初めて斜面に衝突する位置までの距離 L が最大となる θ として最も妥当なのはどれか。",
    "choices": {
      "ア": "30°",
      "イ": "45°",
      "ウ": "60°",
      "エ": "90°",
      "オ": "105°"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "飛行時間は 2v₀ sin θ/(g cos 30°) で、水平到達距離を cos 30° で割れば L となる。したがって L は sin θ cos(θ−30°)＝[sin(2θ−30°)＋sin 30°]/2 に比例し、θ＝60°で最大になる。",
    "choiceExplanations": {
      "ア": "斜面に垂直な初速度 v₀ sin θ が小さく、飛行時間が短い。距離に比例する sin θ cos(θ−30°) は、この角度では1/2にとどまる。",
      "イ": "45°は斜面が水平なときの最適角である。30°の下り斜面では距離が sin(2θ−30°) に従って変わり、θ＝45°ではこの正弦がまだ最大にならない。",
      "ウ": "飛行時間は 2v₀ sin θ/(g cos 30°) で、水平到達距離を cos 30° で割れば L となる。したがって L は sin θ cos(θ−30°)＝[sin(2θ−30°)＋sin 30°]/2 に比例し、θ＝60°で最大になる。",
      "エ": "斜面に垂直に投げると滞空時間は長いが、水平初速度が v₀/2 になる。距離に比例する因子の積は1/2で、60°の3/4を下回る。",
      "オ": "水平から75°方向への投射となり、水平速度が小さい。距離の角度依存を与える sin(2θ−30°) はこの角度で0になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 10。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q010.webp"
    ],
    "imageAltTexts": [
      "30度の斜面に対して角度θで投げた小球の経路と距離L"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q011",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "張力と棒のモーメントの釣合い",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "一様な重力下で、図のように、質量 2m の一様な剛体棒の一端が、点 A で鉛直な壁面に取り付けられている。また、剛体棒のもう一端は糸で壁面と結ばれ、糸の途中に質量 m の小球が取り付けられている。剛体棒が水平な状態で静止し、剛体棒と糸のなす角 α が tan α＝3/4 を満たすとき、壁面と糸のなす角を β とすると、tan β の値として最も妥当なのはどれか。ただし、剛体棒は点 A を中心として自由に回転できるものとする。",
    "choices": {
      "ア": "1/2",
      "イ": "3/5",
      "ウ": "2/3",
      "エ": "3/4",
      "オ": "4/5"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Aまわりのモーメントから、棒側の張力の鉛直成分は mg、水平成分は mg/tan α＝4mg/3 である。小球には重力 mg も働くので、壁側の張力の鉛直成分は 2mg、水平成分は 4mg/3 となり、tan β＝2/3 を得る。",
    "choiceExplanations": {
      "ア": "壁側の糸の鉛直成分は 2mg だが、水平成分は mg ではなく 4mg/3 である。そのため水平成分と鉛直成分の比は1/2より大きい。",
      "イ": "3/5は tan α＝3/4 から求まる sin α の値である。β は小球の両側の糸の張力と小球の重力を釣り合わせて求める。",
      "ウ": "Aまわりのモーメントから、棒側の張力の鉛直成分は mg、水平成分は mg/tan α＝4mg/3 である。小球には重力 mg も働くので、壁側の張力の鉛直成分は 2mg、水平成分は 4mg/3 となり、tan β＝2/3 を得る。",
      "エ": "3/4は棒に接する糸の角 α の正接である。壁側の糸は棒側張力の鉛直成分に加えて小球の重力も支える。",
      "オ": "4/5は棒側の糸で張力に占める水平成分の割合 cos α である。β の正接は、壁側の糸の水平成分を鉛直成分で割った比で求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q011.webp"
    ],
    "imageAltTexts": [
      "壁の点Aで支えられた剛体棒、糸と小球の配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q012",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "自重による棒の縮みと長さの二乗",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、長さ L、断面積 A、密度 ρ の一様な棒 P と、長さ 2L、断面積 A/2、密度 3ρ の一様な棒 Q を水平な床に置いたところ、自重によりそれぞれ ΔLₚ、ΔLᵩ だけ縮んだ。このとき、ΔLₚ と ΔLᵩ の比として最も妥当なのはどれか。\n\nただし、P、Qは鉛直方向にのみ変形し、断面積は変化しないものとする。また、図Ⅱのように、長さ方向の微小区間 dx において、断面に働く力を F、断面積を A、F により生じる dx の縮みを du とすると、P、Qに共通な比例定数を E として、F＝EA du/dx が成り立つものとする。",
    "choices": {
      "ア": "1：2",
      "イ": "1：3",
      "ウ": "1：4",
      "エ": "1：6",
      "オ": "1：12"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "上端から距離 x の断面には上部の重量 ρAgx が作用し、du/dx＝ρgx/E となる。長さ ℓ 全体で積分すると ρgℓ²/(2E) なので、密度3倍、長さ2倍のQはPの12倍縮む。",
    "choiceExplanations": {
      "ア": "縮みは長さの比だけでは決まらない。棒が長くなると積分する区間だけでなく、各断面が支える上部の重さも増す。",
      "イ": "密度の差だけを反映した値である。Qは長さも2倍なので、長さの二乗に対応する4倍の効果をさらに掛ける。",
      "ウ": "この比は長さの二乗の変化だけを考えている。Qでは密度が3倍であるため、上部の重さによるひずみもその分大きい。",
      "エ": "長さの2倍と密度の3倍を掛けても、自重の縮みを求められない。平均圧縮応力が長さに比例し、それを棒全体にわたって積分するため長さがもう一度掛かる。",
      "オ": "上端から距離 x の断面には上部の重量 ρAgx が作用し、du/dx＝ρgx/E となる。長さ ℓ 全体で積分すると ρgℓ²/(2E) なので、密度3倍、長さ2倍のQはPの12倍縮む。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 12。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q012.webp"
    ],
    "imageAltTexts": [
      "二本の棒の縮みと、微小区間の変形を示す図Ⅰ・Ⅱ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q013",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "摩擦のある斜面と反発係数",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、水平面から傾き θ をなす粗い斜面と、滑らかで水平な床が点 P でつながっており、点 Q で質量 M の小物体 A が静止している。点 R から質量 m の小物体 B を静かに放したところ、B は回転することなく斜面上を滑り、A に非弾性衝突した。衝突後の A の速さとして最も妥当なのはどれか。\n\nただし、PR間の距離を d、AとBとの間の反発係数を e、Bと斜面との間の動摩擦係数を μ′、重力加速度の大きさを g とする。また、斜面と床は滑らかにつながっているものとする。",
    "choices": {
      "ア": "[(1−e)m/(m＋M)]√[2gd(sin θ−μ′ cos θ)]",
      "イ": "[(m＋eM)/(m＋M)]√[2gd(cos θ−μ′ sin θ)]",
      "ウ": "[(m＋eM)/(m＋M)]√[2gd(sin θ−μ′ cos θ)]",
      "エ": "[(1＋e)m/(m＋M)]√[2gd(sin θ−μ′ cos θ)]",
      "オ": "[(1＋e)m/(m＋M)]√[2gd(cos θ−μ′ sin θ)]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "斜面の仕事とエネルギーの関係から、Bが衝突する直前の速さ u は √[2gd(sin θ−μ′ cos θ)] である。運動量保存 mu＝mvᵦ＋Mvₐ と vₐ−vᵦ＝eu を連立すると vₐ＝(1＋e)mu/(m＋M) となる。",
    "choiceExplanations": {
      "ア": "衝突後の離れる相対速度は、衝突前に近づく速度に e を掛けた値である。この関係と運動量保存を合わせるとAの速度の係数は 1−e でなく 1＋e を含む。",
      "イ": "重力の斜面方向成分は mg sin θ、垂直成分は mg cos θ なので、平方根の sin と cos の位置が逆である。前の係数も運動量と反発係数の式から得られる値と異なる。",
      "ウ": "斜面を滑り終えたBの速さの式は正しい。衝突時にAに移る速度は、入射側の質量 m と反発係数から (1＋e)m/(m＋M) 倍になる。",
      "エ": "斜面の仕事とエネルギーの関係から、Bが衝突する直前の速さ u は √[2gd(sin θ−μ′ cos θ)] である。運動量保存 mu＝mvᵦ＋Mvₐ と vₐ−vᵦ＝eu を連立すると vₐ＝(1＋e)mu/(m＋M) となる。",
      "オ": "衝突による速度の係数は合っている。Bの斜面方向の加速度は g(sin θ−μ′ cos θ) なので、平方根内の三角関数が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 13。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q013.webp"
    ],
    "imageAltTexts": [
      "点Rの物体Bが斜面を滑り、水平面の点Qの物体Aに衝突する配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q014",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "断熱容器内の理想気体の圧力平衡",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、断熱材で囲まれた容積 2V の容器 A と、容積 3V の容器 B が細い管で連結されている。A、Bにはそれぞれ同じ理想気体が封入されており、Aは温度 2T、圧力 3P、Bは温度 T、圧力 P であった。この状態から、コックを開き、十分に時間が経ったときの理想気体の圧力と内部エネルギーの組合せとして最も妥当なのはどれか。\n\nただし、気体定数を R、定積モル比熱を Cᵥ とし、細い管の体積及び管と周囲との熱の交換は無視できるものとする。",
    "choices": {
      "ア": "(6/5)P、3PVCᵥ/R",
      "イ": "(6/5)P、9PVCᵥ/R",
      "ウ": "(9/5)P、3PVCᵥ/R",
      "エ": "(9/5)P、9PVCᵥ/R",
      "オ": "(12/5)P、12PVCᵥ/R"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "全体は剛体・断熱なので、初期の内部エネルギー (Cᵥ/R)(3P×2V＋P×3V) が保存される。平衡時の内部エネルギーは (Cᵥ/R)p×5V だから、p＝(9/5)P である。",
    "choiceExplanations": {
      "ア": "断熱の固定容器では、内部エネルギーは二つの容器の初期値の合計になる。3PVCᵥ/R はBの初期値のみであり、Aの寄与が抜けている。",
      "イ": "内部エネルギーの合計は正しい。圧力は p(5V)＝9PV を満たすため、(6/5)P ではない。",
      "ウ": "圧力は合っているが、内部エネルギーには容器Aの 6PVCᵥ/R を含める。Bの分を加えると 9PVCᵥ/R になる。",
      "エ": "全体は剛体・断熱なので、初期の内部エネルギー (Cᵥ/R)(3P×2V＋P×3V) が保存される。平衡時の内部エネルギーは (Cᵥ/R)p×5V だから、p＝(9/5)P である。",
      "オ": "初期の pV の寄与はAが 6PV、Bが 3PV で、合計は 9PV である。12PV を使うと圧力と内部エネルギーをともに過大に見積もる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q014.webp"
    ],
    "imageAltTexts": [
      "断熱容器A・Bの初期状態と両容器をつなぐコック"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q015",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "固定端・自由端反射とパルスの重ね合わせ",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような波形の減衰しないパルス波が x 軸上を速さ4 m/sで進み、x＝20 mの点で固定端反射した後、x＝0 mの点で自由端反射し、これらの反射を繰り返す。図Ⅰの波形が観察されてから、初めて図Ⅱの波形が観察されるまでに経過した時間として最も妥当なのはどれか。なお、図の y 軸はパルス波の変位を表している。",
    "choices": {
      "ア": "3.50秒",
      "イ": "4.25秒",
      "ウ": "4.50秒",
      "エ": "14.25秒",
      "オ": "14.50秒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "固定端では変位が反転し、自由端では反転しないため、往復10秒後は最初の波形の符号が逆になる。その後4.50秒進めると、進行波と反射波の和が x＝18 mで−5 m、x＝19 mで−4 mとなり、初めて図Ⅱに一致する。",
    "choiceExplanations": {
      "ア": "3.50秒ではパルスが14 m進み、右端は x＝19 m にある。固定端にまだ達していないため、図Ⅰの形のままである。",
      "イ": "4.25秒では最初の固定端反射との重ね合わせが起きているが、x＝18 m の変位は＋3 mである。図Ⅱの同じ位置の変位は−5 mである。",
      "ウ": "4.50秒に x＝18 m に来るのは、元の x＝4 m にあった−5 mの変位を固定端で反転した成分である。進行波を足してもここでは＋5 mとなり、図Ⅱと上下が逆になる。",
      "エ": "往復1回の10秒を経た後は最初の周期の波形と符号が逆になる。14.25秒での x＝18 m の変位は−3 mであり、図Ⅱの−5 mと合わない。",
      "オ": "固定端では変位が反転し、自由端では反転しないため、往復10秒後は最初の波形の符号が逆になる。その後4.50秒進めると、進行波と反射波の和が x＝18 mで−5 m、x＝19 mで−4 mとなり、初めて図Ⅱに一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q015.webp"
    ],
    "imageAltTexts": [
      "パルスの初期波形と反射の途中で観測された波形"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q016",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "波面の角度と全反射の条件",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図は、媒質Ⅰ又は媒質Ⅱのいずれかから発された平面波の波面を表しており、媒質Ⅰの波面と境界面との角度は θ、媒質Ⅱの波面と境界面との角度は60°、Ⅰに対するⅡの相対屈折率は0.5である。この波が全反射するような入射角が存在するとき、波が進行する向きと sin θ の値の組合せとして最も妥当なのはどれか。ただし、0°＜θ＜60°とする。",
    "choices": {
      "ア": "媒質Ⅰから媒質Ⅱへ進行する、√3/4",
      "イ": "媒質Ⅰから媒質Ⅱへ進行する、1/2",
      "ウ": "媒質Ⅱから媒質Ⅰへ進行する、√3/4",
      "エ": "媒質Ⅱから媒質Ⅰへ進行する、1/2",
      "オ": "媒質Ⅱから媒質Ⅰへ進行する、√3/2"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "全反射が起こり得るのは、屈折率の大きいⅠから小さいⅡに進むときである。波面と境界の角は進行方向と法線の角に等しいので、スネルの法則から sin θ＝0.5 sin 60°＝√3/4 となる。",
    "choiceExplanations": {
      "ア": "全反射が起こり得るのは、屈折率の大きいⅠから小さいⅡに進むときである。波面と境界の角は進行方向と法線の角に等しいので、スネルの法則から sin θ＝0.5 sin 60°＝√3/4 となる。",
      "イ": "進行方向は正しいが、1/2 は屈折角が90°になる臨界角の正弦である。図では媒質Ⅱの角度は60°なので、さらに sin 60° を掛ける。",
      "ウ": "√3/4という値は波面の角度と整合する。媒質Ⅱからより屈折率の高いⅠへ進む場合には、全反射は起きない。",
      "エ": "全反射が可能な向きが逆である。1/2もこの図の θ の正弦ではなく、ⅠからⅡに向かう場合の臨界角の正弦である。",
      "オ": "√3/2 は媒質Ⅱの60°の正弦である。媒質Ⅰの角には屈折率比0.5を掛け、進行方向はⅠからⅡとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q016.webp"
    ],
    "imageAltTexts": [
      "媒質Ⅰと媒質Ⅱの境界および各媒質内の波面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q017",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "クーロン力の位置エネルギー保存",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のように、真空中の xy 平面上の (0, 3d) 及び (0, −3d) に電気量 Q の点電荷がそれぞれ固定されている。この状態で、質量 m、電気量 q の荷電粒子を原点 O で静かに放したところ、荷電粒子は x 軸の正の向きに動き始め、(4d, 0) を通過した。荷電粒子が (4d, 0) を通過するときの速さとして最も妥当なのはどれか。ただし、Q＞0、q＞0とし、真空の誘電率を ε₀ とする。",
    "choices": {
      "ア": "√[Qq/(15πε₀md)]",
      "イ": "√[Qq/(10πε₀md)]",
      "ウ": "√[2Qq/(15πε₀md)]",
      "エ": "(2/5d)√[Qq/(5πε₀m)]",
      "オ": "(1/5d)√[Qq/(πε₀m)]"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "原点と通過点の位置エネルギーの差 2Qq/(4πε₀)×[1/(3d)−1/(5d)] を mv²/2 に等置する。原点の合力は厳密には0なので、設問が仮定する正方向への運動は微小な変位からの極限として扱う。",
    "choiceExplanations": {
      "ア": "この式は、移動による位置エネルギーの減少を片方の固定電荷だけで計算した速さである。固定電荷は二つあり、同じ量ずつ寄与する。",
      "イ": "どちらの固定電荷からも、荷電粒子までの距離は 3d から 5d に変わる。減少する位置エネルギーは逆距離の差 1/(3d)−1/(5d) を二つ分足して求める。",
      "ウ": "原点と通過点の位置エネルギーの差 2Qq/(4πε₀)×[1/(3d)−1/(5d)] を mv²/2 に等置する。原点の合力は厳密には0なので、設問が仮定する正方向への運動は微小な変位からの極限として扱う。",
      "エ": "クーロンの位置エネルギーは距離の逆数に比例するので、速さは d の平方根の逆数に比例する。平方根の外に 1/d があるこの式は次元も合わない。",
      "オ": "位置エネルギーの差を求める際には二つの電荷までの距離 3d と 5d の両方が必要である。この式では速さが 1/d に比例しており、位置エネルギー保存から得られる依存性と異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q017.webp"
    ],
    "imageAltTexts": [
      "二つの点電荷と原点からx軸正方向へ動く荷電粒子"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q019",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "キルヒホッフ則と節点電圧",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図のような、抵抗値が4 Ω、6 Ω、8 Ωの抵抗と電圧が10 V、34 Vの電源からなる回路において、抵抗値が6 Ωの抵抗に流れる電流の大きさとして最も妥当なのはどれか。ただし、電源の内部抵抗は無視するものとする。",
    "choices": {
      "ア": "2.4 A",
      "イ": "3.0 A",
      "ウ": "3.4 A",
      "エ": "4.2 A",
      "オ": "9.7 A"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "下側を0 V、上側の節点を V とすると、節点で (34−V)/4＋(10−V)/8＝V/6 となる。これから V＝18 V、6 Ωに流れる電流は 18/6＝3.0 A である。",
    "choiceExplanations": {
      "ア": "6 Ωの枝の電圧が14.4 Vだと仮定すると、左右の枝から流れ込む電流の和は 4.9−0.55＝4.35 A となる。6 Ωの枝を流れる2.4 Aと一致しない。",
      "イ": "下側を0 V、上側の節点を V とすると、節点で (34−V)/4＋(10−V)/8＝V/6 となる。これから V＝18 V、6 Ωに流れる電流は 18/6＝3.0 A である。",
      "ウ": "6 Ωの電流が3.4 Aなら節点は20.4 Vになる。この場合、左右の枝から流れ込む正味の電流は2.1 Aであり、節点で電流が保存されない。",
      "エ": "4.2 Aの場合は6 Ωに25.2 Vがかかる。左右の枝から流れ込む正味電流は0.3 Aにしかならず、この仮定を満たさない。",
      "オ": "9.7 Aを6 Ωに流すには58.2 Vが必要である。両電源の正極の電圧を上回るので、それらから節点に電流が流入する条件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q019.webp"
    ],
    "imageAltTexts": [
      "4 Ω、6 Ω、8 Ωの抵抗と二つの直流電源からなる回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q020",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "工学に関する基礎",
    "topicTags": [
      "非オーム性電球のグラフと並列回路",
      "必須問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような電流と電圧の関係を示す電球 X がある。図Ⅱのように、この電球 X 二つと、抵抗 R、100 Vの電源を直列につないだとき、二つの電球 X にかかる電圧はそれぞれ40 Vであった。次に、図Ⅲのように電球 X を並列につなぎ替え、電源電圧を105 Vに変えた。このとき、抵抗 R の消費電力として最も妥当なのはどれか。ただし、電源の内部抵抗は無視するものとする。",
    "choices": {
      "ア": "80 W",
      "イ": "101 W",
      "ウ": "225 W",
      "エ": "245 W",
      "オ": "405 W"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "直列時は図Ⅰから4 Aなので、R＝(100−2×40)/4＝5 Ωである。並列時は各電球が60 Vで4.5 Aずつ、Rの電圧降下が 5×9＝45 Vとなって105 Vを満たし、電力は 5×9²＝405 Wとなる。",
    "choiceExplanations": {
      "ア": "80 Wは、直列時に R にかかる20 Vと4 Aを掛けた値である。並列に変えると、Rを流れる電流は二つの電球に流れる電流の和になる。",
      "イ": "R＝5 Ωで101 Wを消費するとすれば、Rを流れる電流は約4.5 Aである。約4.5 Aは並列時の電球1個分の電流であり、Rにはその約2倍が流れる。",
      "ウ": "225 Wは、R＝5 Ωに対して電圧降下を出すと約33.5 Vに相当する。並列時に電球の電流の和9 Aが流れる場合の電圧降下は45 Vである。",
      "エ": "245 Wとすると R の電流は7 Aで電圧降下は35 Vになる。電球がそれぞれ70 Vを受けると流れる電流の和は7 Aを超えるため、回路の条件と合わない。",
      "オ": "直列時は図Ⅰから4 Aなので、R＝(100−2×40)/4＝5 Ωである。並列時は各電球が60 Vで4.5 Aずつ、Rの電圧降下が 5×9＝45 Vとなって105 Vを満たし、電力は 5×9²＝405 Wとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q020.webp"
    ],
    "imageAltTexts": [
      "電球Xの電圧・電流特性と直列および並列回路を示す図Ⅰ～Ⅲ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q021",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "モールス、ベル、マルコーニと通信史",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "テレコミュニケーションに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「テレコミュニケーションとは、一般的に遠隔地間のコミュニケーションを指す。\nアメリカの【㋐】は、電流が流れると強力電磁石でペン先を引き付けて記号を紙に記録する方式の電話機を実用化し、1837年には、伝送路途中で信号を増幅する継電器を採用して、伝送距離16 kmの電信に成功した。その後、実業家のヴェイルの支援で【㋐】符号が発明され、全米規模の電信線を敷設する基礎を築いた。\nアメリカの【㋑】は、1876年、振動膜に鉄片を取り付けて電磁石のそばに置き、送信側ではこの振動膜を震わせて電磁石の近傍で鉄片を動かして電流を変化させて電気信号に変え、受信側では電流の変化で電磁石の磁界が変化することで鉄片が動き振動膜を振動させ音声に変換する方式で、電話を実現した。\n1880年代後半、ドイツのヘルツが実験によって電磁波を発見し、後にイタリアの【㋒】によって無線通信として利用されることとなった。」",
    "choices": {
      "ア": "モールス、ベル、マクスウェル",
      "イ": "モールス、ベル、マルコーニ",
      "ウ": "モールス、エジソン、マルコーニ",
      "エ": "ベル、エジソン、マクスウェル",
      "オ": "ベル、エジソン、マルコーニ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "記号を紙に記録する㋐の装置は、設問で「電話機」とあるものの、モールスが開発した電信機を指す。㋑の音声を送る電話はベル、㋒の無線通信はマルコーニに結び付く。",
    "choiceExplanations": {
      "ア": "㋐と㋑は合うが、マクスウェルは電磁波の存在を理論的に示した物理学者である。ヘルツの実験の後に無線通信を実用化したのはマルコーニである。",
      "イ": "記号を紙に記録する㋐の装置は、設問で「電話機」とあるものの、モールスが開発した電信機を指す。㋑の音声を送る電話はベル、㋒の無線通信はマルコーニに結び付く。",
      "ウ": "㋐と㋒は合っている。エジソンは電話送信機を改良したが、1876年の電話はベルに対応する。",
      "エ": "記号を紙に刻む方式とヴェイルの協力は、ベルでなくモールスの電信を指す。電磁波を無線通信に利用したイタリアの人物はマルコーニである。",
      "オ": "㋒は正しい。㋐はヴェイルと協力したモールス、㋑は音声の電気伝送を実現したベルである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q022",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "熱気球、自動車、蒸気船の歴史",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "移動手段の歴史に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 人類初の有人気球は、1783年にライト兄弟が作成した熱気球で、温めることで外気よりも比重の軽くなった空気を用いていた。また、1900年には、ツェッペリンが、金属製の骨格をもつ硬式飛行船の飛行に成功した。\n㋑ 欧州で生まれた自動車は20世紀初めまでは貴族と富裕層の趣味の乗り物であったが、国土と経済が急速に拡大するアメリカに市場が移ると実用的な乗り物となった。ゼネラルモーターズ社が「モデルT」の生産で大量生産技術を確立し、自動車は庶民の乗り物へと性格を大きく変えた。\n㋒ 世界で最初に商業的に成功した蒸気船は、1807年にアメリカのフルトンが建造したボールトン＆ワット社の蒸気機関を搭載した外輪船「クラーモント号」であった。貨物輸送が可能な蒸気船が現れるまで、海運需要と輸送期間の短縮に応えたのがクリッパーと呼ばれる快速帆船であった。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "フルトンの外輪蒸気船は1807年にハドソン川の商業航路に就いた。クリッパーは風力を利用する高速の帆船で、輸送時間の短縮に使われた。",
    "choiceExplanations": {
      "ア": "1783年の有人熱気球は、フランスのモンゴルフィエ兄弟が開発したものである。ライト兄弟は1903年の動力飛行で知られる。",
      "イ": "㋐の有人熱気球はモンゴルフィエ兄弟による。㋑でモデルTの量産を進めたのは、ゼネラルモーターズではなくフォードである。",
      "ウ": "モデルTはフォードの自動車である。組立ラインなどの導入によって生産台数が増え、価格が下がった。",
      "エ": "㋒のフルトンの蒸気船は妥当である。㋑に挙げるモデルTの製造元はフォードなので、㋑を含めると誤りになる。",
      "オ": "フルトンの外輪蒸気船は1807年にハドソン川の商業航路に就いた。クリッパーは風力を利用する高速の帆船で、輸送時間の短縮に使われた。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q023",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "月探査、量子ドット、太陽活動",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "科学技術の動向等に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ NASAによって開発された小型月着陸実証機SLIMは、アポロ11号が月面着陸して以降、小型月面探索機として初めて月面着陸に成功した。この実証機による計画は、月のほか、比較的重力のある天体の探査への基礎にもなるため、将来の太陽系科学探査の要求に応えることができるとされている。\n㋑ 量子ドットとは、赤外線を照射すると発光する非常に小さな半導体微粒子のことであり、2023年のノーベル物理学賞を受賞したテーマである。この微粒子を大きくしたり小さくしたりすることで、発光する色を変えることができることに加え、色ごとに発光させることができるため、美しい画面が作れるという特徴があり、液晶パネルに用いられている。\n㋒ 太陽フレアと呼ばれる太陽面爆発が発生すると、一時的に非常に速度が速く密度の高いガス（プラズマ）が噴出され、磁場を伴い地球に到達することで、地球の磁気が乱されることがある。これにより、電離圏を通過する電波の伝わり方が変化し、衛星通信等に悪影響を及ぼす。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "太陽フレアに伴ってコロナ質量放出が生じ、磁場を伴うプラズマが地球に到達すると磁気嵐を引き起こす場合がある。電離圏の変化は電波の伝搬や衛星通信に影響する。",
    "choiceExplanations": {
      "ア": "SLIMは日本のJAXAが開発した探査機である。月面では目標地点に近い着陸を実証した。",
      "イ": "㋐の開発機関はJAXAである。㋑も、量子ドットの発光を赤外線照射で定義し、2023年の受賞分野を物理学賞とする点が誤っている。",
      "ウ": "2023年の量子ドット研究への授賞はノーベル化学賞である。ディスプレイ用途では青色光で励起して別の色に変換する例がある。",
      "エ": "㋒の太陽活動が通信に影響する記述は妥当である。㋑は量子ドットの大きさと発光色の関係を述べているが、賞の分野が違う。",
      "オ": "太陽フレアに伴ってコロナ質量放出が生じ、磁場を伴うプラズマが地球に到達すると磁気嵐を引き起こす場合がある。電離圏の変化は電波の伝搬や衛星通信に影響する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q024",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "型式指定、フェイルセーフ、医療行為の特許",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "科学技術の倫理等に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 我が国の自動車の型式指定制度は、自動車メーカーなどが自動車等の生産や販売を行う前に、ブレーキや排出ガスなどの試験を行い、保安基準への適合性等について審査を受ける制度である。\n㋑ 動力や安全関連構成部分に故障が生じたときに圧倒的に安全な方向に故障するように設計する考え方をフールプルーフという。\n㋒ 我が国の医療分野における特許法の運用において、新薬の開発等と同様に、医療行為の発明にも「方法の特許」として特許権が与えられている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "型式指定では、生産・販売に先立ち、車両の構造や装置が保安基準に適合するかなどが型式ごとに審査される。制動装置や排出ガス性能が試験の対象となる。",
    "choiceExplanations": {
      "ア": "型式指定では、生産・販売に先立ち、車両の構造や装置が保安基準に適合するかなどが型式ごとに審査される。制動装置や排出ガス性能が試験の対象となる。",
      "イ": "㋐は型式指定の説明に合う。故障時に安全側へ移るようにする㋑の設計は、フェイルセーフと呼ばれる。",
      "ウ": "フールプルーフは、操作の誤りが起きにくく、起きても危険につながりにくいようにする設計である。㋑が述べる対象は機器の故障なのでフェイルセーフである。",
      "エ": "㋑はフェイルセーフの説明である。また、人を手術・治療・診断する方法は、日本の特許審査では産業上利用できる発明に該当しないと扱われる。",
      "オ": "医薬品や医療機器は要件を満たせば特許の対象になり得る。これに対し、人を手術・治療・診断する方法そのものは特許審査で産業上の利用可能性が否定される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q025",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "技術論",
    "topicTags": [
      "ESG投資、公害紛争、公益通報者保護",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "現代社会においては個人、法人によらずあらゆる社会的主体がそれぞれに倫理観を求められる。倫理観に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ ESG投資の考え方が広まり、企業はこれまで以上に環境や社会、ガバナンスの課題を経営に取り込むことで、機会損失や機会費用を回避できるだけでなく、増収増益も見込めるようになる。\n㋑ 公害紛争処理法は、公害に係る紛争について、あっせん、調停、仲裁及び裁定の制度を設けること等により、迅速かつ適正な解決を図ることを目的として制定された。\n㋒ 公益通報者保護法では、職場での不正や法令違反を監督官庁や報道機関に知らせる内部告発を行う者が、その告発内容にかかわらず解雇等の不利益を被らないとしている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "環境、社会、ガバナンスの課題を経営に組み込むことは、中長期の事業機会や業績の改善につながり得る。公害紛争処理法は、あっせん、調停、仲裁及び裁定を通じて適正で迅速な解決を図る。",
    "choiceExplanations": {
      "ア": "ESG課題への対応はリスク管理や事業機会の獲得につながり得る。公害紛争のために複数の手続を用意する㋑も妥当なので、㋐だけでは不足する。",
      "イ": "環境、社会、ガバナンスの課題を経営に組み込むことは、中長期の事業機会や業績の改善につながり得る。公害紛争処理法は、あっせん、調停、仲裁及び裁定を通じて適正で迅速な解決を図る。",
      "ウ": "㋑は公害紛争処理法の目的に沿うが、㋐も妥当である。ESGへの対応は、リスクへの備えに加えて新たな投資や取引の機会につながる場合がある。",
      "エ": "㋑は正しい。公益通報者保護法による保護には通報対象事実や通報先に応じた要件があるため、㋒の「告発内容にかかわらず」は誤りである。",
      "オ": "あらゆる内部告発が自動的に同法の保護を受けるわけではない。通報の内容が法律上の対象に当たり、通報先ごとの保護要件を満たす必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q026",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "燃料電池の起電力とギブズエネルギー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "燃料電池の中で下記の反応が起こっているとき、25℃における標準状態での起電力として最も妥当なのはどれか。\nH₂(g)＋(1/2)O₂(g) → H₂O(l)\nただし、H₂O(l) の標準生成ギブズエネルギーを−237 kJ/mol、ファラデー定数を96500 C/molとする。",
    "choices": {
      "ア": "0.41 V",
      "イ": "0.61 V",
      "ウ": "0.82 V",
      "エ": "1.2 V",
      "オ": "2.5 V"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "標準状態の H₂ と O₂ の生成ギブズエネルギーは0なので、反応の ΔG° は−237 kJ/molである。ΔG°＝−2FE° より、E°＝237000/(2×96500)≒1.23 Vとなる。",
    "choiceExplanations": {
      "ア": "0.41 Vは、237 kJを電子6 mol分の電荷で割った場合に近い。水1 molの生成に対応する移動電子は2 molである。",
      "イ": "約0.61 Vは酸素1 molが受け取る電子4 molを分母にした値である。設問の反応式では酸素は1/2 molなので、分母は2Fとなる。",
      "ウ": "電子3 mol分の電荷で割るとこの数値に近いが、酸素分子の係数を踏まえると電子は2 mol移動する。反応1 mol当たりのエネルギーと電子数を同じ基準にそろえる。",
      "エ": "標準状態の H₂ と O₂ の生成ギブズエネルギーは0なので、反応の ΔG° は−237 kJ/molである。ΔG°＝−2FE° より、E°＝237000/(2×96500)≒1.23 Vとなる。",
      "オ": "2.5 Vは電子を1 molだけ移動すると考えた値に近い。H₂ が酸化され水1 molが生じるときの移動電子数は2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q027",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "一次反応の積分速度式",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "一次反応 A → B の反応速度定数は 1.53×10⁻³ s⁻¹ である。Aの初期濃度 [A]₀ が 2.56×10⁻³ mol/L であるとき、反応開始時からAの濃度 [A] が 1.60×10⁻⁴ mol/L になるまでの時間として最も妥当なのはどれか。ただし、log₁₀ 2＝0.30、logₑ 2＝0.69 とする。",
    "choices": {
      "ア": "7.5分",
      "イ": "13分",
      "ウ": "23分",
      "エ": "30分",
      "オ": "70分"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "初期濃度と最終濃度の比は16なので、t＝ln 16/k＝4×0.69/(1.53×10⁻³)≒1804秒である。60で割ると約30分になる。",
    "choiceExplanations": {
      "ア": "半減期は ln 2/k≒451秒、すなわち約7.5分である。濃度を16分の1にするには、半減期が4回必要である。",
      "イ": "13分では半減期2回分の約15分に達しない。指定濃度は初期値の16分の1なので、半減期4回に相当する。",
      "ウ": "約23分は半減期を3回経過する時間に近く、濃度が初期値の8分の1になる。設問ではその半分まで減る時間が必要である。",
      "エ": "初期濃度と最終濃度の比は16なので、t＝ln 16/k＝4×0.69/(1.53×10⁻³)≒1804秒である。60で割ると約30分になる。",
      "オ": "70分では半減期を9回以上経過する。必要な濃度比は2⁻⁴なので、そこまで長い時間はかからない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q028",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "ヨウ化水素の平衡組成",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次に示す反応は平衡反応である。\nH₂(g)＋I₂(g) ⇄ 2HI(g)\n水素3.0 molとヨウ素2.0 molが体積一定の容器内で反応し平衡状態に達したときの、ヨウ化水素の物質量として最も妥当なのはどれか。ただし、この平衡状態での温度における濃度平衡定数 K꜀ を2.0とする。",
    "choices": {
      "ア": "0.50 mol",
      "イ": "1.0 mol",
      "ウ": "2.0 mol",
      "エ": "3.0 mol",
      "オ": "3.5 mol"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "反応進行量を x molとすると、組成は H₂ が3−x、I₂ が2−x、HIが2xとなる。4x²/[(3−x)(2−x)]＝2 の物理的な解は x＝1 なので、HIは2.0 molである。",
    "choiceExplanations": {
      "ア": "HIが0.50 molなら、水素とヨウ素はそれぞれ0.25 mol消費する。反応商は 0.50²/(2.75×1.75)≒0.052 で、平衡定数2.0より小さい。",
      "イ": "HIが1.0 molなら、水素2.5 mol、ヨウ素1.5 molが残る。反応商は約0.27であり、平衡に達するまでさらに右向きに進む。",
      "ウ": "反応進行量を x molとすると、組成は H₂ が3−x、I₂ が2−x、HIが2xとなる。4x²/[(3−x)(2−x)]＝2 の物理的な解は x＝1 なので、HIは2.0 molである。",
      "エ": "HIが3.0 molなら、残る H₂、I₂ は1.5 molと0.5 molで、反応商は12となる。平衡定数2.0を上回るため、HIを減らす向きに進む。",
      "オ": "HIが3.5 molの組成では、反応商は 3.5²/(1.25×0.25)＝39.2 になる。これは平衡値より大きく、HIが過剰である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q029",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "四面体形錯体のd軌道分裂と安定化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "結晶場安定化エネルギーに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「遷移金属イオンが等方的な結晶場に置かれているとき、その3d軌道は五重に縮退しているが、四面体形錯体ではそのd軌道が二組に分裂する。この際、エネルギーが低い組の軌道の数と、高い組の軌道の数の比は【㋐】となる。四面体形錯体ではこの分裂幅のエネルギー Δₜ はそれほど大きくないため、一般に【㋑】状態のみを考えればよい。このとき、d電子の配置が d⁶ である場合の結晶場安定化エネルギーは【㋒】Δₜ となる。」",
    "choices": {
      "ア": "2：3、高スピン、−0.6",
      "イ": "2：3、高スピン、−1.6",
      "ウ": "2：3、低スピン、−0.6",
      "エ": "3：2、高スピン、−1.6",
      "オ": "3：2、低スピン、−0.6"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "四面体場では低いe軌道は2個、高いt₂軌道は3個で、分裂が小さいので高スピンになりやすい。高スピンd⁶では e³t₂³ となり、(3×−0.6＋3×0.4)Δₜ＝−0.6Δₜ である。",
    "choiceExplanations": {
      "ア": "四面体場では低いe軌道は2個、高いt₂軌道は3個で、分裂が小さいので高スピンになりやすい。高スピンd⁶では e³t₂³ となり、(3×−0.6＋3×0.4)Δₜ＝−0.6Δₜ である。",
      "イ": "軌道数とスピンは正しい。eとt₂に3電子ずつ入るので、各準位の寄与を足すと−1.6ではなく−0.6になる。",
      "ウ": "四面体場では分裂幅が小さく、上の軌道に入るのに必要なエネルギーより、対形成の負担が大きいことが多い。設問で扱うのは高スピン配置である。",
      "エ": "低い側が3個、高い側が2個という順は、典型的な八面体場の分裂に対応する。四面体場では順が逆で、安定化エネルギーも−1.6Δₜではない。",
      "オ": "四面体場の低いe軌道は2個で、上側のt₂軌道は3個である。分裂が小さいので低スピンを一般的な配置として選ばない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q030",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "基礎化学",
    "topicTags": [
      "金・銀・銅の伝導率と反応性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "11族元素の単体に関する次の記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 銀は希硫酸とは反応しないが、塩酸とは容易に反応して塩化銀となる。\n㋑ 金、銀、銅のうち、常温常圧で最も電気伝導率が高いのは金である。\n㋒ 金、銀、銅のうち、最も展性・延性に富むのは金である。\n㋓ 銅は湿った空気中で徐々に酸化され、青銅の被膜が形成される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "金は薄く延ばして金箔にしたり、細い線に引き延ばしたりできる。三金属の比較では展性・延性に特に富むため、㋒だけが妥当である。",
    "choiceExplanations": {
      "ア": "銀の単体は、通常の非酸化性の塩酸に容易には溶けない。常温でこの三金属の中で最も導電率が高いのは銀であり、金ではない。",
      "イ": "㋒の金の展性・延性は正しい。塩化銀の沈殿を生じるのは銀イオンに塩化物イオンを加えた場合で、銀の単体が塩酸と容易に反応するという㋐とは異なる。",
      "ウ": "金は薄く延ばして金箔にしたり、細い線に引き延ばしたりできる。三金属の比較では展性・延性に特に富むため、㋒だけが妥当である。",
      "エ": "金についての㋒は正しいが、湿った空気にさらされた銅の表面に生じるのは緑青などの腐食生成物である。青銅は銅とスズを主成分とする合金である。",
      "オ": "銅の大気腐食でできる緑青は、環境に応じた塩基性炭酸塩や塩基性硫酸塩などを含む。青銅の被膜という説明は当たらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q031",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "真空排気ポンプの機構",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "真空排気ポンプに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 油回転ポンプは、シリンダー内でローターが回転しながら吸気を圧縮して排気するが、油はローター回転の潤滑に加え、気密性を保つ役割も果たす。\n㋑ 油拡散ポンプの内部では、ノズルから低速で噴出させた油滴により、気体分子を排気側に圧縮する。\n㋒ ターボ分子ポンプの内部では、固定翼と回転翼が、傾斜角が逆向きになるように交互に組み合わされており、回転翼を音速に近い速度で駆動させて、気体分子を排気側に圧縮する。\n㋓ ターボ分子ポンプの回転翼の駆動は大気圧下では困難なため、補助ポンプによる真空容器の粗排気が必要になるが、油拡散ポンプには駆動部品がないため粗排気は不要である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "油回転ポンプでは油が潤滑とシールの両方を担う。ターボ分子ポンプでは高速の回転翼が気体分子に運動量を与え、固定翼を介して排気側へ送り出す。",
    "choiceExplanations": {
      "ア": "油回転ポンプで油が隙間を封じる㋐は妥当である。油拡散ポンプは低速の液滴ではなく、高速の油蒸気の噴流で気体分子を排気側へ運ぶ。",
      "イ": "油回転ポンプでは油が潤滑とシールの両方を担う。ターボ分子ポンプでは高速の回転翼が気体分子に運動量を与え、固定翼を介して排気側へ送り出す。",
      "ウ": "㋐は正しいが、油拡散ポンプにも粗排気や背圧を下げる補助ポンプが必要である。可動部品がないことから、大気圧で使用できるとはいえない。",
      "エ": "回転翼で気体分子を送る㋒は妥当である。油拡散ポンプは作動油を加熱・蒸発させ、ノズルで高速の蒸気流を作るため、㋑の油滴という説明は誤りである。",
      "オ": "油拡散ポンプの作動は高速の油蒸気による。蒸気噴流で排気するためには入口や排気側を所定の低圧に保つ必要があり、粗排気を省くことはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q032",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "シュウ酸カルシウムの熱分解",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "シュウ酸カルシウム一水和物（CaC₂O₄・H₂O）を対象として熱重量・示差熱分析（TG-DTA）を行ったところ図のような結果を得た。このとき、次の記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。なお、原子量は H＝1.0、C＝12、O＝16、Ca＝40 である。\n\n㋐ シュウ酸カルシウム一水和物が無水塩に変化する過程で発熱する。\n㋑ 500℃付近の重量減少は、二酸化炭素の脱離によるものである。\n㋒ 950℃では酸化カルシウムが安定である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋑",
      "ウ": "㋒",
      "エ": "㋐、㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "水とCOの脱離で生じた CaCO₃ が、さらに CO₂ を放出して CaO になる。950℃付近に残る CaO の質量56は、一水和物の式量146に対して約38％で、図の最終段階に合う。",
    "choiceExplanations": {
      "ア": "最初の重量減少は結晶水の脱離に当たる。対応する示差熱のピークは吸熱側へ向いているため、発熱とは判断できない。",
      "イ": "500℃付近では、シュウ酸カルシウムが炭酸カルシウムになり、COに相当する質量が減る。CO₂の脱離は後の炭酸塩の分解に対応する。",
      "ウ": "水とCOの脱離で生じた CaCO₃ が、さらに CO₂ を放出して CaO になる。950℃付近に残る CaO の質量56は、一水和物の式量146に対して約38％で、図の最終段階に合う。",
      "エ": "㋐の脱水に対応するピークは吸熱側である。㋑の段階の質量減少はCOの式量28に相当し、CO₂の式量44に相当する段階はより高温側にある。",
      "オ": "950℃で残るのが CaO である点は合っている。500℃付近では CaC₂O₄ から CaCO₃ への変化に伴ってCOが脱離するため、㋑は含めない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q032.webp"
    ],
    "imageAltTexts": [
      "試料の温度に対する質量減少率と示差熱のグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q033",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "ファラドのSI基本単位",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "静電容量の単位 F をSI基本単位で表したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "m⁻²·kg⁻¹·s³·A²",
      "イ": "m⁻²·kg⁻¹·s³·A⁻²",
      "ウ": "m⁻²·kg⁻¹·s⁴·A²",
      "エ": "m²·kg·s³·A⁻²",
      "オ": "m²·kg·s⁴·A²"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "容量は電荷/電圧なので、F＝(A·s)/(kg·m²·s⁻³·A⁻¹) である。指数を整理すると m⁻²·kg⁻¹·s⁴·A² になる。",
    "choiceExplanations": {
      "ア": "電荷の単位は A·s である。電圧の s⁻³ を分母から移すだけでなく、電荷分にも s があるため、時間の指数は4になる。",
      "イ": "電圧の単位には A⁻¹ が含まれ、逆数を取ると A になる。分子の電荷にも A が含まれるため、電流の指数は2である。",
      "ウ": "容量は電荷/電圧なので、F＝(A·s)/(kg·m²·s⁻³·A⁻¹) である。指数を整理すると m⁻²·kg⁻¹·s⁴·A² になる。",
      "エ": "質量と長さの因子は電圧の側にあるため、容量では kg と m² の逆数になる。電流も電荷と電圧の因子を合わせると A² となる。",
      "オ": "時間と電流の指数は合うが、電圧で割るので m² と kg は分母に入る。長さと質量の指数はそれぞれ−2、−1である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q034",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "GM計数管の電場と電子なだれ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ガイガー・ミュラー計数管（GM計数管）に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「GM計数管は、放射線の数を計測するために用いられる検出器の一つである。GM計数管の構造を図に示す。中心にある細い導線（タングステン線）を陽極とし、金属円筒を陰極としている。陽極には1 kV程度の電圧が印加される。管内にはアルゴン等の不活性ガスが主成分として充填される。さらに消滅ガスと呼ばれる無水アルコール等の有機分子ガスが5～10％の割合で添加されている。ベータ線等の放射線が管内に入射すると、その経路に沿って気体原子が電離される。この電離作用によって生じた電子及び陽イオンは、電界から力を受け、それぞれ陽極、陰極の方向に動き出す。電子は気体原子と衝突を繰り返しながら陽極へと移動する。管内の電界は陽極からの距離に【㋐】しているため、電子は電界で加速され平均自由行程当たりに得るエネルギーは陽極に近付くにつれて大きくなる。そのため、陽極近傍では、電子は大きなエネルギーを得て、衝突により気体原子を電離・励起する。励起された気体原子は【㋑】を放出し、この【㋑】は消滅ガス分子に吸収され、電離又は解離が起こる。このようにして陽極近傍に電子と陽イオンが連鎖的に作られ、電子と陽イオンの数が増大する。この現象を【㋒】と呼ぶ。この現象を利用してGM計数管は信号を増幅する。」",
    "choices": {
      "ア": "比例、陽電子、電子なだれ",
      "イ": "比例、紫外線、電子対生成",
      "ウ": "反比例、陽電子、電子対生成",
      "エ": "反比例、紫外線、電子対生成",
      "オ": "反比例、紫外線、電子なだれ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "円筒形の電極にはさまれた電界は軸からの距離に反比例し、陽極付近で大きくなる。励起原子の放つ紫外線は消滅ガスに吸収され、衝突電離の連鎖で信号を増幅する現象が電子なだれである。",
    "choiceExplanations": {
      "ア": "連鎖的な電子の増加は電子なだれである。電場は細い陽極に近いほど強く、励起原子から放出されるのは陽電子ではなく紫外光である。",
      "イ": "原子から紫外線が放出される点は合う。円筒形電極での電場は半径方向の距離に反比例し、衝突電離による増幅は電子対生成と区別される。",
      "ウ": "陽極の近くで電界が強くなる反比例の関係は正しい。励起原子の発光は紫外線であり、連鎖的に気体が電離する現象は電子なだれである。",
      "エ": "距離への反比例と紫外線は正しい。ここで増えるのは気体原子が電離して生じる電子と陽イオンで、電子・陽電子の対生成ではない。",
      "オ": "円筒形の電極にはさまれた電界は軸からの距離に反比例し、陽極付近で大きくなる。励起原子の放つ紫外線は消滅ガスに吸収され、衝突電離の連鎖で信号を増幅する現象が電子なだれである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q034.webp"
    ],
    "imageAltTexts": [
      "ガイガー・ミュラー計数管の電極、電源と測定回路の模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q035",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "工学基礎実験",
    "topicTags": [
      "X線管の特性X線と制動X線",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "X線管に関する次の記述の㋐～㋔に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「X線管の構造を模式的に図(a)に示す。X線管では、フィラメントを加熱してまず電子を発生させる。この電子は真空管内の電場で加速され、標的と呼ばれる部分に衝突する。標的には【㋐】が用いられることが多い。この衝突により、標的原子の内殻電子がたたき出されることがある。標的原子の内殻準位に空孔ができるため、その後、外側の軌道から別の電子が遷移する。この際、軌道間のエネルギー差に相当する光子エネルギーをもつX線が発生する。これを【㋑】と呼ぶ。内殻電子がたたき出されない場合にもX線は発生する。標的に衝突した電子は、標的中で減速され、この際に失うエネルギーを【㋒】として放出する。図(b)はX線の強度を波長に対してグラフにしたものである。このグラフにみられる【㋓】と【㋔】はそれぞれ【㋑】と【㋒】に対応する。」",
    "choices": {
      "ア": "タングステン、制動X線、特性X線、線スペクトル、連続スペクトル",
      "イ": "タングステン、特性X線、制動X線、線スペクトル、連続スペクトル",
      "ウ": "タングステン、特性X線、制動X線、連続スペクトル、線スペクトル",
      "エ": "ポリエチレン、制動X線、特性X線、線スペクトル、連続スペクトル",
      "オ": "ポリエチレン、特性X線、制動X線、連続スペクトル、線スペクトル"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "タングステンは原子番号と融点が高く、一般的なX線管の標的に用いられる。内殻の電子遷移による特性X線は線スペクトルとなり、減速による制動X線は連続スペクトルになる。",
    "choiceExplanations": {
      "ア": "標的原子の内殻の空孔を外側の電子が埋める際に出るのは特性X線である。電子が標的内で減速して連続的なエネルギー分布を作るのが制動X線である。",
      "イ": "タングステンは原子番号と融点が高く、一般的なX線管の標的に用いられる。内殻の電子遷移による特性X線は線スペクトルとなり、減速による制動X線は連続スペクトルになる。",
      "ウ": "㋐から㋒は合うが、二つのスペクトルの対応が逆である。原子の軌道間のエネルギー差は離散的なので、特性X線が線スペクトルに現れる。",
      "エ": "標的にはタングステンなどの金属が用いられる。内殻準位への電子の遷移は特性X線、加速した電子の減速は制動X線を生じる。",
      "オ": "特性X線と制動X線の説明の順序は合っている。標的の材料が誤りであり、特性X線と制動X線のスペクトルの順序も逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q035.webp"
    ],
    "imageAltTexts": [
      "X線管の模式図と、X線の波長に対する強度のグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q041",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "二つの等しい点電荷が作る電界",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、真空中の xy 平面上の点 (−d, 0) と点 (d, 0) それぞれに＋Q の点電荷が置かれているとする（0＜d、0＜Q）。このとき、y 軸上の点 (0, b)（0＜b）における電界の大きさとして最も妥当なのはどれか。ただし、真空の誘電率を ε₀ とする。",
    "choices": {
      "ア": "[Q/(2πε₀)]·b²/(b²＋d²)²",
      "イ": "[Q/(2πε₀)]·d²/(b²＋d²)²",
      "ウ": "[Q/(2πε₀)]·d/(b²＋d²)^(3/2)",
      "エ": "[Q/(2πε₀)]·(b＋d)/(b²＋d²)^(3/2)",
      "オ": "[Q/(2πε₀)]·b/(b²＋d²)^(3/2)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "各電荷までの距離は r＝√(b²＋d²) で、x 成分が相殺される。各電界の大きさ Q/(4πε₀r²) に y 方向の比 b/r を掛け、二つ分を足すと Qb/(2πε₀r³) となる。",
    "choiceExplanations": {
      "ア": "電界の y 成分への射影では、方向余弦 b/√(b²＋d²) を一度だけ掛ける。b²/(b²＋d²) を掛けると、射影を二重に行ったことになる。",
      "イ": "d は電荷から点 (0, b) までの変位の x 成分の大きさである。対称な配置なので、電界の x 成分は二つの電荷の間で打ち消し合う。",
      "ウ": "二つの電荷の電界ベクトルには、互いに逆向きで等しい x 成分がある。加算される y 成分の分子には d でなく b が現れる。",
      "エ": "二つの方向成分の大きさを b＋d として合成することはできない。この配置では x 成分が消え、残る y 成分だけを合計する。",
      "オ": "各電荷までの距離は r＝√(b²＋d²) で、x 成分が相殺される。各電界の大きさ Q/(4πε₀r²) に y 方向の比 b/r を掛け、二つ分を足すと Qb/(2πε₀r³) となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q041.webp"
    ],
    "imageAltTexts": [
      "x軸の左右に対称に置かれた二つの正電荷"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q043",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "直線電流から遠ざかるコイルの誘導起電力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、真空中の xy 平面において、y 軸上に無限に長い導線があり、図の矢印の向きに電流 I が流れている。また、1辺の長さ a の正方形コイルが一定速度 v で図の向きに移動している。このとき、時刻 t（＞0）における、コイルに発生する誘導起電力として最も妥当なのはどれか。\n\nただし、正方形のコイルは xy 平面上にあり、コイルの左辺が x＝0 の時刻を t＝0 とする。また、誘導起電力は時計回りの方向を正とし、真空の透磁率を μ₀ とする。",
    "choices": {
      "ア": "μ₀Ia²/[π(vt＋a)t]",
      "イ": "−μ₀Ia²/[π(vt＋a)t]",
      "ウ": "μ₀Ia²/[2π(vt＋a)t]",
      "エ": "−μ₀Ia²/[2π(vt＋a)t]",
      "オ": "μ₀Ia²/(2πvt²)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "紙面奥向きの磁束は Φ＝μ₀Ia/(2π) ln[(vt＋a)/(vt)] である。時計回りを正として −dΦ/dt を取ると、μ₀Ia²/[2π(vt＋a)t] が得られる。",
    "choiceExplanations": {
      "ア": "離れるコイルには、紙面の奥向きの磁束を保つ時計回りの起電力が生じる。磁束の計算に使う直線導線の磁場は μ₀I/(2πx) なので、正しい値の2倍になっている。",
      "イ": "符号が負だと、減少する紙面奥向きの磁束をさらに弱める向きになる。磁場の係数 1/(2π) に対して、分母の2も欠けている。",
      "ウ": "紙面奥向きの磁束は Φ＝μ₀Ia/(2π) ln[(vt＋a)/(vt)] である。時計回りを正として −dΦ/dt を取ると、μ₀Ia²/[2π(vt＋a)t] が得られる。",
      "エ": "大きさは磁束の時間変化と一致している。コイルは奥向きに減っている磁束を補うので、誘導起電力の向きは正の時計回りである。",
      "オ": "この式は vt＋a を vt と近似した遠方での値に当たる。時刻 t＞0 全般では、コイルの左右の辺から導線までの距離の差 a を残す必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q043.webp"
    ],
    "imageAltTexts": [
      "直線導線に上向きの電流が流れ、その右側の正方形コイルが右へ移動する配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q044",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "中空円筒導体内部のアンペールの法則",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、外半径 a、内半径 b の無限に長い中空同軸円筒導体に、電流密度の大きさ（単位面積当たりの電流の大きさ）i の定常電流が、円筒の中心軸に平行に、一様に流れている。円筒の中心軸から距離 r（a＞r＞b）の点における磁界の大きさとして最も妥当なのはどれか。",
    "choices": {
      "ア": "[(a＋b)(r−b)/(2πr)]i",
      "イ": "[(a＋b)(r−b)/(2r)]i",
      "ウ": "[(r²−b²)/(2a)]i",
      "エ": "[(r²−b²)/(2πr)]i",
      "オ": "[(r²−b²)/(2r)]i"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "円筒対称性から、半径 r の円周に沿って磁界 H は一定である。アンペールの法則 2πrH＝iπ(r²−b²) より、H＝i(r²−b²)/(2r) となる。",
    "choiceExplanations": {
      "ア": "半径 r の円で囲む導体の面積は π(r²−b²) であり、外半径 a は入らない。積分経路の長さの π と面積の π は約分される。",
      "イ": "この式では r²−b²＝(r＋b)(r−b) の r＋b が a＋b に置き換わっている。磁界を求める円の内側だけの電流を使う。",
      "ウ": "囲まれる電流は iπ(r²−b²) であるが、積分経路の半径は導体の外半径 a ではなく r である。周長 2πr で割る。",
      "エ": "中心の空洞を除いた面積には、π(r²−b²) の π が含まれる。経路の周長 2πr で割ると π が消える。",
      "オ": "円筒対称性から、半径 r の円周に沿って磁界 H は一定である。アンペールの法則 2πrH＝iπ(r²−b²) より、H＝i(r²−b²)/(2r) となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q044.webp"
    ],
    "imageAltTexts": [
      "中空円筒導体の断面と中心軸に平行な電流の模式図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q045",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "電磁気学",
    "topicTags": [
      "平面電磁波の磁束密度とポインティングベクトル",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "電磁波に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\nただし、真空中の電磁波の速さを c、真空の誘電率を ε₀、真空の透磁率を μ₀ とする。また、時刻を t とし、f(z−ct) は z 及び t について微分可能な任意の関数である。\n\n「図のように、真空中において電界 E の x 成分が Eₓ＝f(z−ct)、y 成分が Eᵧ＝−f(z−ct) で与えられ、z 軸の正の方向に伝搬する電磁波がある。このとき、磁束密度 B の x 成分 Bₓ は【㋐】、y 成分 Bᵧ は【㋑】である。また、ポインティングベクトル S＝(1/μ₀)E×B の大きさは【㋒】である。」\n\nなお、必要であれば、c＝1/√(ε₀μ₀) の関係と、以下に示す真空中のマクスウェル方程式の一部を用いてよい。\n∇×E＋∂B/∂t＝0\n(1/μ₀)∇×B−ε₀∂E/∂t＝0",
    "choices": {
      "ア": "√(ε₀μ₀)f(z−ct)、−√(ε₀μ₀)f(z−ct)、2√(ε₀/μ₀)f(z−ct)²",
      "イ": "√(ε₀μ₀)f(z−ct)、−√(ε₀μ₀)f(z−ct)、4√(ε₀/μ₀)f(z−ct)²",
      "ウ": "√(ε₀μ₀)f(z−ct)、√(ε₀μ₀)f(z−ct)、2√(ε₀/μ₀)f(z−ct)²",
      "エ": "√(ε₀μ₀)f(z−ct)、√(ε₀μ₀)f(z−ct)、4√(ε₀/μ₀)f(z−ct)²",
      "オ": "−√(ε₀μ₀)f(z−ct)、√(ε₀μ₀)f(z−ct)、2√(ε₀/μ₀)f(z−ct)²"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "正の z 方向へ進む平面波では B＝(e_z×E)/c なので、Bₓ＝Bᵧ＝f/c である。E×B の z 成分は 2f²/c となり、μ₀ で割れば 2√(ε₀/μ₀)f² を得る。",
    "choiceExplanations": {
      "ア": "この B は E と同じ向きになり、外積 E×B は0になる。正の z 方向に伝搬する横波で B は E に垂直である。",
      "イ": "磁束密度の y 成分も f/c と同じ符号になる。この選択肢の成分から外積を計算すると0になり、示されているポインティングベクトルとも矛盾する。",
      "ウ": "正の z 方向へ進む平面波では B＝(e_z×E)/c なので、Bₓ＝Bᵧ＝f/c である。E×B の z 成分は 2f²/c となり、μ₀ で割れば 2√(ε₀/μ₀)f² を得る。",
      "エ": "磁束密度の両成分は正しい。電界の二成分が外積に与える項はそれぞれ f²/c なので、総和の係数は4でなく2である。",
      "オ": "この B は E と反対方向に平行で、その外積は0になる。z 方向に進む波の Bₓ は −Eᵧ/c＝f/c である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q045.webp"
    ],
    "imageAltTexts": [
      "平面電磁波の進行方向と電界ベクトルの向き"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q048",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "二端子対回路とアドミタンス行列",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "二端子対回路に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図Ⅰの回路において、電流と電圧の関係を [İ₁, İ₂]ᵀ＝Y[V̇₁, V̇₂]ᵀ と表したときの Y＝[[Y₁₁, Y₁₂], [Y₂₁, Y₂₂]] をアドミタンス行列と呼ぶ。このとき、アドミタンス行列 Y は【㋐】である。また、図Ⅱの回路のアドミタンス行列が【㋐】であるとき、図Ⅱの R は【㋑】である。」",
    "choices": {
      "ア": "[[1, −2], [−2, 1]]、1/3",
      "イ": "[[1, −2], [−2, 1]]、2/3",
      "ウ": "[[2, −1], [−1, 2]]、1/3",
      "エ": "[[2, −1], [−1, 2]]、2/3",
      "オ": "[[−1, 2], [2, −1]]、1/3"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "図Ⅰでは İ₁＝2V̇₁−V̇₂、İ₂＝2V̇₂−V̇₁ となる。三つの抵抗がいずれも1 ΩのΔ形をY形に直すと、各抵抗は1×1/(1＋1＋1)＝1/3 Ωである。",
    "choiceExplanations": {
      "ア": "V̇₂＝0にすると、端子1から見える二つの1 Ωの抵抗は並列になる。İ₁＝2V̇₁ なので、行列の左上の要素は1ではなく2である。",
      "イ": "二つの端子間の1 Ωを流れる電流は V̇₁−V̇₂ なので、非対角項は−1である。図Ⅱを等価にする値も、等抵抗のΔ–Y変換から1/3 Ωになる。",
      "ウ": "図Ⅰでは İ₁＝2V̇₁−V̇₂、İ₂＝2V̇₂−V̇₁ となる。三つの抵抗がいずれも1 ΩのΔ形をY形に直すと、各抵抗は1×1/(1＋1＋1)＝1/3 Ωである。",
      "エ": "行列は正しいが、R はY形の1枝分なので1/3 Ωである。図Ⅰで、端子の一方と共通端子の間の合成抵抗をもう一方の端子を開放して測ると2/3 Ωになるが、これはY形の2枝分である。",
      "オ": "自己アドミタンスは、それぞれの端子で他方の電圧を0にしたときの電流を電圧で割るので正になる。図Ⅰでは対角項2、非対角項−1である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q048.webp"
    ],
    "imageAltTexts": [
      "1 Ωの三つの抵抗でできた図Ⅰと、三つの抵抗Rからなる図Ⅱ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q050",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "電気工学",
    "topicTags": [
      "三相誘導電動機の極数・すべり・二次銅損",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "三相誘導電動機に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「50 Hz の交流電源に接続された同期速度が3000 min⁻¹の三相誘導電動機について考える。このとき、極数は【㋐】である。ここで、すべりが2％である場合、回転子の回転速度は【㋑】である。また、機械的出力が1960 Wである場合、二次銅損は【㋒】である。」",
    "choices": {
      "ア": "2、2880 min⁻¹、40 W",
      "イ": "2、2940 min⁻¹、40 W",
      "ウ": "2、3060 min⁻¹、80 W",
      "エ": "4、2940 min⁻¹、40 W",
      "オ": "4、3060 min⁻¹、80 W"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "同期速度120f/p＝3000から極数 p＝2、回転速度は3000×0.98＝2940 min⁻¹である。回転子入力に対して機械的出力を1−s、二次銅損を s の割合とすれば、銅損は1960×0.02/0.98＝40 Wとなる。",
    "choiceExplanations": {
      "ア": "2880 min⁻¹は、3000 min⁻¹より4％低い速度である。すべりは2％なので差は60 min⁻¹となる。",
      "イ": "同期速度120f/p＝3000から極数 p＝2、回転速度は3000×0.98＝2940 min⁻¹である。回転子入力に対して機械的出力を1−s、二次銅損を s の割合とすれば、銅損は1960×0.02/0.98＝40 Wとなる。",
      "ウ": "正のすべりでは回転子は同期速度より遅く、3060 min⁻¹にはならない。出力1960 Wとすべりから求まる二次銅損は40 Wである。",
      "エ": "回転速度と銅損は正しい。4極のときは50 Hzでの同期速度が1500 min⁻¹となり、問題文の3000 min⁻¹と合わない。",
      "オ": "4極の同期速度は50 Hzで1500 min⁻¹である。正のすべりを同期速度に加えて回転子を速くする計算も誤りになる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q051",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "引張りによる丸棒の伸びと断面積変化",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、直径20 mm、長さ2.0 mの丸棒を31.4 kNの荷重で引っ張る。このとき、この棒の伸び δ、断面積変化の大きさ ΔA の組合せとして最も妥当なのはどれか。ただし、丸棒のヤング率を200 GPa、ポアソン比を0.30、円周率を3.14とする。",
    "choices": {
      "ア": "0.25 mm、0.047 mm²",
      "イ": "0.25 mm、0.094 mm²",
      "ウ": "0.25 mm、0.19 mm²",
      "エ": "1.0 mm、0.047 mm²",
      "オ": "1.0 mm、0.094 mm²"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "断面積314 mm²より軸応力は100 MPa、軸ひずみは0.0005で、伸びは1.0 mmである。横ひずみは−0.30×0.0005なので、面積の減少量は約 2×0.00015×314＝0.094 mm²となる。",
    "choiceExplanations": {
      "ア": "軸の応力は31.4 kNを314 mm²で割った100 MPaなので、長さ2000 mmの伸びは1.0 mmである。断面積の相対変化は微小変形の範囲で直径の相対変化の2倍になる。",
      "イ": "0.094 mm²の断面積変化は正しい。直径20 mmを半径として断面積を計算すると応力と伸びを4分の1にしてしまう。",
      "ウ": "ヤング率と軸応力から軸ひずみは0.0005であり、伸びは0.25 mmにはならない。直径の縮みは軸ひずみにポアソン比0.30を掛けて求めるため、面積変化も0.19 mm²より小さい。",
      "エ": "伸びは合っている。0.047 mm²は断面積に横ひずみの大きさ0.00015を一度掛けた値だが、面積は直径の二乗に比例する。",
      "オ": "断面積314 mm²より軸応力は100 MPa、軸ひずみは0.0005で、伸びは1.0 mmである。横ひずみは−0.30×0.0005なので、面積の減少量は約 2×0.00015×314＝0.094 mm²となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q051.webp"
    ],
    "imageAltTexts": [
      "両端から引っ張られる直径20 mm、長さ2.0 mの丸棒"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q052",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "ボルト軸の引張りと頭部のせん断",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、直径 d、頭部の高さ h のボルトが31.4 kNの荷重で下方向に引っ張られている。ボルトの直径 d が最低限必要な寸法であるとき、最低限必要なボルト頭部の高さ h として最も妥当なのはどれか。ただし、ボルト材料の許容引張応力を100 MPa、許容せん断応力を80.0 MPa、円周率を3.14とする。",
    "choices": {
      "ア": "5.00 mm",
      "イ": "6.25 mm",
      "ウ": "7.50 mm",
      "エ": "8.75 mm",
      "オ": "10.0 mm"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "軸断面の条件 31400/(πd²/4)＝100 から d＝20 mmである。次に頭部を貫く円筒面のせん断条件 31400/(πdh)＝80.0 より h＝6.25 mmである。",
    "choiceExplanations": {
      "ア": "高さ5.00 mmでは、直径20 mmの周りのせん断面に100 MPaの応力が生じる。この値は引張りの許容値であり、せん断には80.0 MPaの上限を適用する。",
      "イ": "軸断面の条件 31400/(πd²/4)＝100 から d＝20 mmである。次に頭部を貫く円筒面のせん断条件 31400/(πdh)＝80.0 より h＝6.25 mmである。",
      "ウ": "高さ7.50 mmならせん断応力は約66.7 MPaとなって許容値を下回る。条件を満たすが、必要最小の高さはこれより小さい。",
      "エ": "8.75 mmを採用するとせん断面積は約550 mm²となる。必要面積は31400/80.0＝392.5 mm²なので、高さを小さくできる。",
      "オ": "高さ10.0 mmでのせん断応力は50.0 MPaである。許容せん断応力80.0 MPaに達するまで必要高さを下げると6.25 mmになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q052.webp"
    ],
    "imageAltTexts": [
      "ボルト軸と頭部、および下向きに作用する荷重"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q053",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "軸荷重と一様な棒の弾性ひずみエネルギー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、断面積が A、長さが l の一様な棒が軸荷重 P を受けている。この棒のヤング率を E、応力を σ、ひずみを ε、伸びを λ とするとき、この棒の弾性ひずみエネルギーを表す式として妥当でないものはどれか。",
    "choices": {
      "ア": "Pλ/2",
      "イ": "P²/(2El)",
      "ウ": "σεAl/2",
      "エ": "σ²Al/(2E)",
      "オ": "Eε²Al/2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "伸びは λ＝Pl/(EA) なので、荷重と伸びで表すエネルギーは P²l/(2EA) になる。提示式は断面積 A を含まず、次元もエネルギーと一致しない。",
    "choiceExplanations": {
      "ア": "線形弾性では、力が0から P まで伸びに比例して増加する。荷重と伸びのグラフの三角形の面積 Pλ/2 は、加えられた仕事に等しい。",
      "イ": "伸びは λ＝Pl/(EA) なので、荷重と伸びで表すエネルギーは P²l/(2EA) になる。提示式は断面積 A を含まず、次元もエネルギーと一致しない。",
      "ウ": "単位体積に蓄えられるひずみエネルギーは応力とひずみの積の半分である。体積 Al を掛けたこの式は妥当である。",
      "エ": "フックの法則から ε＝σ/E なので、単位体積当たりのエネルギーは σ²/(2E) になる。体積 Al を掛ければ棒全体のエネルギーを求められる。",
      "オ": "応力 σ を Eε に置き換えると、エネルギー密度 σε/2 は Eε²/2 になる。体積を掛けたこの式は正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q053.webp"
    ],
    "imageAltTexts": [
      "断面積A、長さlの棒に軸方向の荷重Pが働く配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q054",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "二つの角孔と断面二次モーメント",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、一辺 a の正方形断面の図心を通る y 軸から b の場所に一辺 b の角孔を2箇所有する梁がある。この断面の y 軸に関する断面二次モーメントとして最も妥当なのはどれか。",
    "choices": {
      "ア": "a⁴/12−b⁴/12",
      "イ": "a⁴/12−b⁴/6",
      "ウ": "a⁴/12−b⁴/2",
      "エ": "a⁴/12−13b⁴/12",
      "オ": "a⁴/12−13b⁴/6"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "正方形は図心を通る直交軸の断面二次モーメントが等しく、断面相乗モーメントも0なので、角孔を回転しても図心まわりの値は b⁴/12 である。平行軸の定理より、全体の a⁴/12 から二孔の 2(b⁴/12＋b⁴)＝13b⁴/6 を引く。",
    "choiceExplanations": {
      "ア": "差し引いた b⁴/12 は、角孔1個の図心を通る軸の値である。この断面では二つの孔があり、それぞれ中心から y 軸までの距離 b も考慮する。",
      "イ": "両孔の図心まわりの値を合計すると b⁴/6 になる。y 軸については図心からの距離 b により、各孔の分に面積 b² と距離の二乗 b² の積を加える。",
      "ウ": "この式の差し引き分は、各孔の図心まわりの項と平行軸の補正を足した値より小さい。孔1個の移動項だけでも b⁴ なので、両孔の減少分は b⁴/2 より大きい。",
      "エ": "一つの孔については、図心まわりの b⁴/12 と平行軸の補正 b⁴ を合わせて 13b⁴/12 となる。左右に二孔あるので、その2倍を差し引く。",
      "オ": "正方形は図心を通る直交軸の断面二次モーメントが等しく、断面相乗モーメントも0なので、角孔を回転しても図心まわりの値は b⁴/12 である。平行軸の定理より、全体の a⁴/12 から二孔の 2(b⁴/12＋b⁴)＝13b⁴/6 を引く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q054.webp"
    ],
    "imageAltTexts": [
      "一辺aの正方形断面の内部に左右対称に空いた二つの角孔"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q055",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 55,
    "type": "multiple-choice",
    "category": "材料力学［機械系］",
    "topicTags": [
      "段付き丸棒のねじれ角",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、長さ L、直径 d の部分と、長さ L/2、直径 2d/3 の部分から成る円形断面をもつ均質な段付き中実丸棒の一端 A を剛体壁に固定し、他端 C に大きさが T のトルクを作用させた。このとき、端部 C に発生するねじれ角として最も妥当なのはどれか。\n\nただし、この棒のせん断弾性係数を G とし、ABの部分の中心軸とBCの部分の中心軸は同一直線上にあるものとする。なお、直径 d の丸棒の断面極慣性モーメントが πd⁴/32 で与えられることを用いてよい。",
    "choices": {
      "ア": "64TL/(Gπd⁴)",
      "イ": "113TL/(Gπd⁴)",
      "ウ": "162TL/(Gπd⁴)",
      "エ": "194TL/(Gπd⁴)",
      "オ": "226TL/(Gπd⁴)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "各区間のねじれ角 TLᵢ/(GJᵢ) を足すと、太い区間の係数は32、細い区間は (32/2)(3/2)⁴＝81である。和は113となる。",
    "choiceExplanations": {
      "ア": "太い部分の係数は32である。細い部分では直径比による増加が四乗で効き、長さが半分でも係数が32ではなく81になる。",
      "イ": "各区間のねじれ角 TLᵢ/(GJᵢ) を足すと、太い区間の係数は32、細い区間は (32/2)(3/2)⁴＝81である。和は113となる。",
      "ウ": "162は、細い部分の長さを L とした場合の係数である。実際の細い区間は L/2 で、その寄与81に太い区間の32を足す。",
      "エ": "194は、太い部分の32に、細い部分を長さ L と置いた162を足した値である。BCの実際の長さは半分なので細い部分の寄与も半分になる。",
      "オ": "各断面を通るトルクは同じ T で、棒全体のねじれは各区間の寄与を一度ずつ足す。226は、正しい和113をさらに2倍した値である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 55。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q055.webp"
    ],
    "imageAltTexts": [
      "端Aが固定され、端Cにトルクが作用する段付き丸棒"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q056",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "平行平板間の毛管上昇",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、大気圧下において静止した水面に平行平板を鉛直に立てると、平板間の水面が表面張力のために周りの水面より平均高さ h だけ上昇して静止した。平板間の距離を a、平板の幅を b、水の密度を ρ、平板間の水面と平板内面の交わりに沿って働く表面張力（単位長さ当たりの力）の大きさを σ、表面張力の働く方向と平板の成す角（接触角）を θ（0°＜θ＜90°）、重力加速度の大きさを g とするとき、h として最も妥当なのはどれか。\n\nただし、空気の密度は水の密度に比べて十分小さいため、無視できるものとする。また、a は b に比べて十分小さく、平板の奥行き方向の端面における影響は無視できるものとする。",
    "choices": {
      "ア": "σ cos θ/(ρag)",
      "イ": "σ cos θ/(ρabg)",
      "ウ": "2σ sin θ/(ρag)",
      "エ": "2σ cos θ/(ρag)",
      "オ": "2σ cos θ/(ρabg)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "両平板の接触線に沿う表面張力の鉛直成分は合計 2σb cos θ である。これを上昇した水の重さ ρgabh に等置すると、h＝2σ cos θ/(ρag) になる。",
    "choiceExplanations": {
      "ア": "片側の平板だけであれば、上向きの力は σb cos θ である。両側の板に働くので、上昇した水を支える力はその2倍になる。",
      "イ": "単位長さ当たりの張力に接触線の長さ b を掛けて力にする。分母の水柱重量にも b が含まれるため、最終式の分母に b は残らない。",
      "ウ": "接触角は鉛直な平板と表面張力の方向の間にある。上向き成分には sin θ でなく cos θ を掛ける。",
      "エ": "両平板の接触線に沿う表面張力の鉛直成分は合計 2σb cos θ である。これを上昇した水の重さ ρgabh に等置すると、h＝2σ cos θ/(ρag) になる。",
      "オ": "両側の張力を使う点は合っている。張力の合力に含まれる b と水柱断面積に含まれる b が消えるので、上昇高さは b で割らない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q056.webp"
    ],
    "imageAltTexts": [
      "鉛直な二枚の平板の間での水面上昇と表面張力の向き"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q057",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "油膜の速度勾配と粘性せん断応力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、内径40.5 mmの固定されたスリーブ内に直径40.0 mm、長さ30.0 mmのピストンを配置し、スリーブとピストンの隙間が粘度 2.50×10⁻² Pa·s の油で満ちるようスリーブ内面に油膜を形成した。スリーブとピストンの隙間は0.250 mmで一定である。この状態でピストンを毎秒5回転で一方向に回転させたとき、ピストンの周面が油膜から受ける、粘性摩擦によるせん断応力の大きさとして最も妥当なのはどれか。\n\nただし、スリーブとピストンの隙間における流れは一様な層流であり、その速度分布は直線的であるものとする。また、円周率を3.14とする。",
    "choices": {
      "ア": "3.14 Pa",
      "イ": "6.28 Pa",
      "ウ": "15.7 Pa",
      "エ": "31.4 Pa",
      "オ": "62.8 Pa"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "周面速度は 3.14×0.0400×5＝0.628 m/s、固定壁の速度は0である。直線分布から τ＝0.0250×0.628/0.000250＝62.8 Paとなる。",
    "choiceExplanations": {
      "ア": "3.14 Paでは、粘度で割って得る速度勾配は125.6 s⁻¹である。実際の油膜は薄く、0.628 m/sの速度差が0.250 mmの間にあるため、勾配はその20倍になる。",
      "イ": "周面の速度は直径に π と1秒当たりの回転数を掛けた0.628 m/sである。応力を求めるには、この速度を油膜厚さ0.000250 mで割ってから粘度を掛ける。",
      "ウ": "速度勾配は固定スリーブと動く周面との速度差を、片側の隙間0.250 mmで割る。周面の直径や軸方向の長さで割っても、油膜を横切る勾配にはならない。",
      "エ": "直径の差0.500 mmを使うと、この値になる。周面から固定壁までの距離はその半分の0.250 mmなので、応力は2倍になる。",
      "オ": "周面速度は 3.14×0.0400×5＝0.628 m/s、固定壁の速度は0である。直線分布から τ＝0.0250×0.628/0.000250＝62.8 Paとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q057.webp"
    ],
    "imageAltTexts": [
      "固定したスリーブと回転するピストンの間の油膜の寸法"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q058",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "固定・移動円板に衝突する噴流の力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、断面積 A の円形ノズルから密度 ρ、流速 v の噴流が、固定されている円板に対して垂直に衝突したところ、角度 θ で放射状に広がって流れた。このとき、噴流が円板に及ぼす力を F₁ とする。\n\n同じ噴流が、流れと同じ方向に速さ U で移動する円板に対して垂直に衝突したところ、角度 φ で放射状に広がって流れた。このとき、噴流が円板に及ぼす力を F₂ とする。このとき、F₁ と F₂ の組合せとして最も妥当なのはどれか。\n\nただし、流体は非圧縮性流体であるものとし、流体の粘性及び重力の影響は無視できるものとする。また、U＜vであるものとする。",
    "choices": {
      "ア": "ρAv²(1−cos θ)、ρA(v−U)²(1−cos φ)",
      "イ": "ρAv²(1−cos θ)、ρA(v＋U)²(1−cos φ)",
      "ウ": "ρAv²(1＋cos θ)、ρA(v−U)²(1＋cos φ)",
      "エ": "ρAv²(1＋cos θ)、ρA(v＋U)²(1＋cos φ)",
      "オ": "ρAv²(1−sin θ)、ρA(v−U)²(1−sin φ)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "円板から見た流入速度を w とすると、流入質量は毎秒 ρAw、流れ方向の速度の減少は w(1−cos α) である。固定円板では w＝v、移動円板では w＝v−U なので、それぞれを当てはめるとこの組合せになる。",
    "choiceExplanations": {
      "ア": "円板から見た流入速度を w とすると、流入質量は毎秒 ρAw、流れ方向の速度の減少は w(1−cos α) である。固定円板では w＝v、移動円板では w＝v−U なので、それぞれを当てはめるとこの組合せになる。",
      "イ": "固定円板の式は正しい。移動円板は噴流と同じ方向に動くため、円板から見た速度は v＋U ではなく v−U である。",
      "ウ": "速度の差 v−U は正しいが、噴流が円板から離れるときも流れ方向に正の成分を持つ。入口の軸方向運動量から、出口の cos を含む軸方向運動量を差し引く。",
      "エ": "噴流を逆向きに跳ね返すと仮定した場合は、軸方向の速度変化に余弦の加算が現れ得る。図では出口の軸方向成分は正であり、円板も噴流と同じ向きに進む。",
      "オ": "角度 θ、φ は流れ方向と出口の速度との間の角度である。軸方向の射影に使うのは正弦ではなく余弦である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q058.webp"
    ],
    "imageAltTexts": [
      "固定および移動する円板に噴流が衝突する二つの配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q059",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "管路の急拡大による力と損失水頭",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、断面積 A₁＝100 mm² から断面積 A₂＝200 mm² に急拡大する、水平に置かれた管路内を空気が流れている。拡大前の管路内における空気が流速 V₁＝10.0 m/s、圧力 p₁＝100 kPa であるとき、管に作用する管軸方向の力の大きさ F_w と急拡大部の損失水頭（ヘッド）Δh の組合せとして最も妥当なのはどれか。\n\nただし、重力加速度の大きさ g＝10.0 m/s² とし、摩擦力と体積力は無視でき、空気は密度 ρ の非圧縮性流体であるものとする。\nなお、必要に応じて以下の式を用いてよい。ここで、V₂、p₂ はそれぞれ拡大後の管路内における空気の流速、圧力である。\np₁/(ρg)＋V₁²/(2g)＝p₂/(ρg)＋V₂²/(2g)＋Δh",
    "choices": {
      "ア": "10.0 N、1.25 m",
      "イ": "10.0 N、2.50 m",
      "ウ": "10.0 N、5.00 m",
      "エ": "20.0 N、2.50 m",
      "オ": "20.0 N、5.00 m"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "急拡大面の圧力を上流圧 p₁ とする通常の近似では、管への力は p₁(A₂−A₁)＝10.0 Nである。連続式から V₂＝5.0 m/sで、急拡大損失は (V₁−V₂)²/(2g)＝1.25 mになる。",
    "choiceExplanations": {
      "ア": "急拡大面の圧力を上流圧 p₁ とする通常の近似では、管への力は p₁(A₂−A₁)＝10.0 Nである。連続式から V₂＝5.0 m/sで、急拡大損失は (V₁−V₂)²/(2g)＝1.25 mになる。",
      "イ": "力は正しい。速度差の二乗25を 2g＝20 m/s² で割るので、損失水頭は2.50 mの半分になる。",
      "ウ": "5.00 mは上流の速度水頭 V₁²/(2g) である。急拡大の損失は速度の全てではなく、上流と下流の速度の差を使って求める。",
      "エ": "管に軸方向の圧力がかかる段差面の面積は、出口断面積全体ではなく A₂−A₁ である。損失水頭の分母は g ではなく 2g となる。",
      "オ": "圧力に掛けるのは出口面積ではなく段差面積100 mm²である。急拡大による損失も上流速度水頭全部ではなく、速度差5 m/sに対応する1.25 mである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q059.webp"
    ],
    "imageAltTexts": [
      "断面が急拡大する管路と上流・下流の断面積、速度、圧力"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q060",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "流体力学［機械系］",
    "topicTags": [
      "検査領域の運動量収支と抗力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "一様流中に置かれた物体に働く抗力に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\nただし、流体は非圧縮性流体であるものとし、重力及び摩擦の影響は無視するものとする。\n\n「図のように、流体が速さ U で流れている一様流中において、流れの方向に x 軸を、それとは垂直な方向に y 軸をとり、二次元物体をこの流れの中の原点付近に置いたところ、物体下流の速度分布に変化が生じ定常状態となった。このとき、この物体の奥行き方向の単位長さ当たりに働く抗力の大きさを、十分大きい検査領域を用いて考える。検査領域は、図に示す断面①、②及び壁面で囲まれた、奥行き方向が単位長さである領域とし、断面①、②の y 軸方向の長さは L である。また、断面①における圧力を p₁、断面②における圧力を p₂、断面①、②を単位時間当たりに通過する流体の運動量の大きさをそれぞれ M₁、M₂ とする。定常流れでは、検査領域の境界面を通って単位時間当たりに流出する【㋐】と流入する【㋐】との差は、検査領域に作用する外力の和に等しいため、F＝【㋑】のように表せる。」",
    "choices": {
      "ア": "運動量、M₁−M₂＋L(p₁−p₂)",
      "イ": "運動量、M₁−M₂−L(p₁−p₂)",
      "ウ": "運動量、−M₁＋M₂−L(p₁−p₂)",
      "エ": "質量流量、(M₁−M₂)/U−L(p₁−p₂)",
      "オ": "質量流量、−(M₁−M₂)/U−L(p₁−p₂)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "断面を通る運動量流量の差 M₂−M₁ は、検査領域の流体に働く外力 L(p₁−p₂)−F に等しい。整理すると F＝M₁−M₂＋L(p₁−p₂) になる。",
    "choiceExplanations": {
      "ア": "断面を通る運動量流量の差 M₂−M₁ は、検査領域の流体に働く外力 L(p₁−p₂)−F に等しい。整理すると F＝M₁−M₂＋L(p₁−p₂) になる。",
      "イ": "運動量を使う点は正しい。入口の圧力は流体を右へ、出口の圧力は左へ押すので、差し引き L(p₁−p₂) が抗力の式に加わる。",
      "ウ": "この値は、流体が物体に及ぼす抗力ではなく、物体が流体に及ぼす力の x 成分である。物体への力はその反作用なので符号を反転する。",
      "エ": "力と等しい次元なのは、単位時間当たりの運動量の変化である。M₁とM₂を速度で割ると質量流量の次元になり、圧力による力と足し引きできない。",
      "オ": "質量保存は定常流の流入量と流出量の関係を与えるが、外力と直接結び付くのは運動量収支である。速度 U で除した項を圧力による力と合成することはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q060.webp"
    ],
    "imageAltTexts": [
      "物体の上流断面と下流断面の速度分布、抗力Fの向き"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q061",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 61,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "ワーレントラスの軸力と荷重",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "トラス橋に関する次の記述のうち、最も妥当なのはどれか。ただし、図に示すトラスの全ての部材の長さは L とし、自重は無視するものとする。",
    "choices": {
      "ア": "図に示すトラスにおいて軸力の絶対値が最大となっている部材は、CDである。",
      "イ": "図に示す荷重 P のように格点に作用する集中荷重は、間接荷重と呼ばれる。",
      "ウ": "図に示すトラスにおいて圧縮軸力が発生する部材は、AE、BG、CE、DGである。",
      "エ": "図に示すトラスは曲弦ワーレントラスであり、部材 CE は腹材である。",
      "オ": "トラスは引張部材、圧縮部材及び曲げ部材を組み合わせて、全体として荷重に抵抗させる構造である。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "左右反力は P/2 で、Fを通る切断面のモーメントから CD の引張力は (P/2)(3L/2)/(L sin 60°)＝√3P/2 となる。各格点の釣合いで、ほかの部材の軸力の絶対値は最大でも P/√3 である。",
    "choiceExplanations": {
      "ア": "左右反力は P/2 で、Fを通る切断面のモーメントから CD の引張力は (P/2)(3L/2)/(L sin 60°)＝√3P/2 となる。各格点の釣合いで、ほかの部材の軸力の絶対値は最大でも P/√3 である。",
      "イ": "荷重 P は格点Fに直接加わる。床組や分配部材を通じて格点へ伝達される場合の間接載荷と区別する。",
      "ウ": "AEとBGは圧縮だが、格点E、Gの鉛直方向の釣合いを取るとCEとDGは引張になる。上弦材EF、FGや中央寄りの斜材CF、DFにも圧縮が生じる。",
      "エ": "CEは上下の弦材をつなぐ腹材である。図の上弦・下弦はそれぞれ直線なので、曲弦ワーレントラスという分類は当たらない。",
      "オ": "理想的なピン接合のトラスでは、荷重は格点に働き、各部材は端部の軸力を受ける。引張と圧縮で抵抗する模型であり、棒の曲げを主要な抵抗機構としない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 61。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q061.webp"
    ],
    "imageAltTexts": [
      "点A・Bで支持されたトラスの部材と点Fに働く荷重"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q062",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 62,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "交差する単純支持梁のたわみ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、スパンが 2L の梁 AB と CD がそれぞれのスパン中央の点 G で接している。この構造系 ABCD が点 G において荷重 P を受けることによって点 G に生じるたわみの大きさとして最も妥当なのはどれか。\n\nただし、梁 AB と CD の曲げ剛性はそれぞれ 2EI、EI であるとし、自重及び点 G における摩擦力は無視するものとする。",
    "choices": {
      "ア": "PL³/(24EI)",
      "イ": "PL³/(18EI)",
      "ウ": "5PL³/(24EI)",
      "エ": "2PL³/(9EI)",
      "オ": "8PL³/(9EI)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "二本の梁は接点Gでたわみが等しく、中央荷重を曲げ剛性の比2：1で分担する。合成ばね定数は 48(2EI＋EI)/(2L)³＝18EI/L³ だから、たわみは PL³/(18EI) である。",
    "choiceExplanations": {
      "ア": "中央点のたわみに対する合成剛性を 24EI/L³ とみなした値である。各梁の中央ばね定数は 48EIᵢ/(2L)³ なので、二本を足しても 18EI/L³ である。",
      "イ": "二本の梁は接点Gでたわみが等しく、中央荷重を曲げ剛性の比2：1で分担する。合成ばね定数は 48(2EI＋EI)/(2L)³＝18EI/L³ だから、たわみは PL³/(18EI) である。",
      "ウ": "接点は同じ量だけ下がり、梁の荷重分担の合計が P になる。二本の変形量を加えるのではなく、たわみに対応する剛性を加える。",
      "エ": "この値は、共通たわみに対する剛性を約 4.5EI/L³ とした場合に当たる。各梁の中央点の剛性の和は 18EI/L³ である。",
      "オ": "荷重 P を柔らかい EI の梁一つだけに載せた場合でも、中央たわみは PL³/(6EI) である。剛な梁も接点を支持するため、二本の構造系のたわみはそれより小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 62。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q062.webp"
    ],
    "imageAltTexts": [
      "中央の点Gで接する二本の単純支持梁と荷重P"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q063",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 63,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "支持条件と断面から比べるオイラー座屈荷重",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図に示す矩形断面柱 A、B、C に関する Euler の座屈荷重 Pₐ、Pᵦ、P꜀ の大小関係として最も妥当なのはどれか。\n\nただし、図のように各柱は弾性係数が E 又は 3E の均質な材料から成り、自重は無視するものとする。また、材端は荷重直角方向への移動を拘束されており、ピン支持は1方向に回転を許容するよう断面図に示す回転軸を有するものとする。",
    "choices": {
      "ア": "Pₐ＜Pᵦ＜P꜀",
      "イ": "Pₐ＜P꜀＜Pᵦ",
      "ウ": "Pᵦ＜Pₐ＜P꜀",
      "エ": "Pᵦ＜P꜀＜Pₐ",
      "オ": "P꜀＜Pₐ＜Pᵦ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "正方形の断面二次モーメント a⁴/12 と π²E/L² の積を基準にすると、Aは4倍、Bは弱軸と有効長 L から2倍である。Cは E が3倍で、有効長は約0.70Lなので、約6.1倍となる。",
    "choiceExplanations": {
      "ア": "Cが最大である点は正しい。Bは両端固定でも部材が長く、弱軸の断面二次モーメントを使うとAより座屈荷重が小さい。",
      "イ": "Bが両端固定であることだけで最大とは判断できない。Aの有効長 L/2 に対し、長さ 2L のBの有効長は L である。",
      "ウ": "正方形の断面二次モーメント a⁴/12 と π²E/L² の積を基準にすると、Aは4倍、Bは弱軸と有効長 L から2倍である。Cは E が3倍で、有効長は約0.70Lなので、約6.1倍となる。",
      "エ": "Bが最小である点は合っている。CはAより有効長が長いものの、弾性係数の3倍が効いて座屈荷重がAを上回る。",
      "オ": "Cは片端固定・片端ピンで、弱い方に座屈するときの有効長が約0.70Lである。Aより高い弾性係数を合わせると、Cが三本の中で最大になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 63。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q063.webp"
    ],
    "imageAltTexts": [
      "三本の柱の長さ、端部条件、断面とピン支持の回転軸"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q064",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 64,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "コンクリートの乾燥収縮・クリープと単位水量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "コンクリートに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ コンクリートから水分が蒸発するときに生じる体積変化を乾燥収縮といい、乾燥時間が同じであるとき、コンクリートの体積に対する表面積の比が大きいほど、乾燥収縮による収縮量は大きくなる。\n㋑ 一定の荷重が長時間作用した際に、時間の経過とともにひずみが増大する現象をクリープといい、水セメント比が一定の場合において単位セメント量が大きいほど、クリープひずみは小さくなる。\n㋒ 一般に、高炉セメントを使用したコンクリートは、普通ポルトランドセメントを使用したコンクリートよりも初期強度及び長期強度が高く、耐海水性に優れている。\n㋓ 粗骨材の最大寸法を大きくする、細骨材率を低くするなどにより、コンクリートの単位体積当たりの使用骨材の表面積を小さくすると、同じスランプのコンクリートを得るのに必要な単位水量は減少する。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "単位体積に比べて露出する表面が大きければ水分が抜けやすく、同じ乾燥時間での収縮が大きくなる。骨材表面を小さくして潤すのに必要な水を減らせば、同じスランプを得るための単位水量を下げられる。",
    "choiceExplanations": {
      "ア": "㋐は水分が蒸発する面積が相対的に大きいという説明で妥当である。水セメント比が一定のまま単位セメント量を増やすと変形しやすいペースト分が増え、クリープが小さくなるという㋑とは逆の傾向になる。",
      "イ": "㋐は正しいが、高炉セメントは一般に初期の強度発現が普通ポルトランドセメントより遅い。長期強度や耐海水性の利点から、初期強度も高いとはいえない。",
      "ウ": "単位体積に比べて露出する表面が大きければ水分が抜けやすく、同じ乾燥時間での収縮が大きくなる。骨材表面を小さくして潤すのに必要な水を減らせば、同じスランプを得るための単位水量を下げられる。",
      "エ": "骨材よりクリープ変形の大きいペーストが増えると、一般にクリープひずみは増える。高炉セメントの初期強度についても、選択肢の説明とは反対に発現が遅い傾向がある。",
      "オ": "㋓は必要な単位水量の傾向の説明として妥当である。㋑は、単位セメント量を増やしてペーストの体積割合を増やすとクリープが小さくなるとしている点が誤っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 64。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q065",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "構造力学（土木）・土木材料・土木施工",
    "topicTags": [
      "地盤液状化の対策工法",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "液状化対策に用いられる工法に関する記述㋐～㋓の正誤の組合せとして最も妥当なのはどれか。\n\n㋐ サンドコンパクションパイル（SCP）工法は、「密度増大工法」の一つであり、大型バイブロハンマーを使用してケーシングを地中に貫入させ、管内に投入した砂に振動と圧力を加えて締め固め、砂杭を造成する工法である。この工法は、施工時に大きな振動や騒音を伴い、特に海上での施工には適していないため、施工実績は多くはない。\n㋑ 「固結工法」である薬液注入工法は、薬液を注入することによって、地盤の透水性を下げるとともに地盤を固結させて強化する工法である。事前の調査が必要ではあるが、地盤条件によって使用する薬液を選定できるため、対策の確実性が高く、他の液状化対策工法より優先して採用されることが多い。\n㋒ 「間隙水圧消散工法」であるグラベルドレーン工法は、砂地盤中に礫を柱状に配置して水平方向の排水経路を短縮することで排水効果を高め、地震時の過剰間隙水圧の上昇を抑制することを目的としている。また、ドレーン工の配置の仕方によっては、下方や側方地盤に発生した過剰間隙水圧が非液状化地盤へ伝播するのを防止する効果が期待できる。\n㋓ 「地下水位低下工法」は、地下水位を下げることで上部の不飽和状態の領域を増やすとともに、地下水面以下の飽和砂として残る深い部分の有効応力を増加させることで液状化を抑制する。この工法は、地下水位が高い地盤に適した工法であるが、地下水位低下によって生じる地盤沈下には注意する必要がある。",
    "choices": {
      "ア": "正、正、正、誤",
      "イ": "正、正、誤、誤",
      "ウ": "正、誤、誤、正",
      "エ": "誤、誤、正、正",
      "オ": "誤、正、誤、正"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "SCP工法は海上でも施工され、薬液注入は条件に応じて選ぶため㋐、㋑は誤りである。礫による排水促進と、地下水位低下での不飽和領域・有効応力の増加はどちらも液状化を抑える。",
    "choiceExplanations": {
      "ア": "SCP工法は海上施工の実績も多く、㋐は誤りである。地下水位低下が液状化を抑える一方、地盤沈下を引き起こし得るという㋓は妥当である。",
      "イ": "薬液注入の適用は地盤や施工条件によって判断し、他工法に常に優先するものではない。礫の柱で過剰間隙水圧を逃がす㋒はグラベルドレーン工法の説明に合う。",
      "ウ": "㋓が正しいことは合っているが、SCP工法は海上にも使われる。㋒も礫による透水経路で過剰間隙水圧を抑える説明なので正しい。",
      "エ": "SCP工法は海上でも施工され、薬液注入は条件に応じて選ぶため㋐、㋑は誤りである。礫による排水促進と、地下水位低下での不飽和領域・有効応力の増加はどちらも液状化を抑える。",
      "オ": "薬液注入で固結を図れるかは薬液の浸透性や地盤条件に依存し、他工法に優先すると一般化できない。グラベルドレーン工法は排水経路を短くし、過剰間隙水圧の上昇を抑えるので㋒は正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q066",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "回転する円筒容器の自由水面",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "水平面上に置かれた半径 R の円柱形の容器に、水深が H となるように水を入れ、中心軸回りに一定の角速度 ω で回転させたところ、容器の中心部における水深に対して、外縁部における水深が2倍となった。このときの ω として最も妥当なのはどれか。ただし、重力加速度の大きさを g とする。",
    "choices": {
      "ア": "(1/R)√(gH/3)",
      "イ": "(2/R)√(gH/3)",
      "ウ": "(4/R)√(gH/3)",
      "エ": "(8/R)√(gH/3)",
      "オ": "(16/R)√(gH/3)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "回転時の水面は z(r)＝z(0)＋ω²r²/(2g) であり、平均水深は z(0) と z(R) の平均である。z(R)＝2z(0)、平均 H から高低差が 2H/3 となり、ω＝(2/R)√(gH/3) を得る。",
    "choiceExplanations": {
      "ア": "この角速度なら中心と外縁の高低差は H/6 にすぎない。水量を保ったまま外縁の水深が中心の2倍になるには、高低差が 2H/3 必要である。",
      "イ": "回転時の水面は z(r)＝z(0)＋ω²r²/(2g) であり、平均水深は z(0) と z(R) の平均である。z(R)＝2z(0)、平均 H から高低差が 2H/3 となり、ω＝(2/R)√(gH/3) を得る。",
      "ウ": "角速度をこの値にすると、水面の高低差は必要な 2H/3 の4倍になる。自由表面の曲率は角速度の二乗に比例する。",
      "エ": "係数8は必要な係数2の4倍で、高低差を16倍にしてしまう。外側の水深が中心の2倍という条件からは、中心水深は 2H/3 になる。",
      "オ": "水面の高低差と結び付くのは ω 自体ではなく ω² である。体積保存で求まる差を ω²R²/(2g) に等置し、二乗根をとると係数は2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q067",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 67,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "中空円柱の浮力と中立安定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、外周の直径 D、内周の直径 d、高さ H、密度 ρ の中空円柱の断面が水面に平行となった状態で浮かんでいる。この浮体が中立であるとき、H として最も妥当なのはどれか。ただし、周囲の水の密度を ρ_w とし、ρ_w＞ρとする。",
    "choices": {
      "ア": "√[(D²＋d²)/(16(ρ/ρ_w)(1−ρ/ρ_w))]",
      "イ": "√[(D²−d²)/(16(ρ/ρ_w)(1−ρ/ρ_w))]",
      "ウ": "√[(D²＋d²)/(8(ρ/ρ_w)(1−ρ/ρ_w))]",
      "エ": "√[(D²−d²)/(8(ρ/ρ_w)(1−ρ/ρ_w))]",
      "オ": "√[(D²＋d²)/(4(ρ/ρ_w)(1−ρ/ρ_w))]"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "喫水は kH（k＝ρ/ρ_w）なので、浮心から重心までの距離は (1−k)H/2 である。水線面の断面二次モーメントを排水容積で割った (D²＋d²)/(16kH) と等置すると、H²＝(D²＋d²)/[8k(1−k)] となる。",
    "choiceExplanations": {
      "ア": "水線面の断面二次モーメントを排水容積で割ると、分子には D²＋d² が現れる。一方、重心と浮心の差は高さと喫水の差の半分なので、最終式の分母の係数は16でなく8である。",
      "イ": "円環断面のモーメントの D⁴−d⁴ を面積の D²−d² で割ると、D²＋d² が残る。喫水と高さの差を用いるときも半分を取る必要がある。",
      "ウ": "喫水は kH（k＝ρ/ρ_w）なので、浮心から重心までの距離は (1−k)H/2 である。水線面の断面二次モーメントを排水容積で割った (D²＋d²)/(16kH) と等置すると、H²＝(D²＋d²)/[8k(1−k)] となる。",
      "エ": "分母の係数8は合っているが、断面二次モーメントは直径の四乗の差に比例する。これを円環の面積に比例する二乗の差で割るので、分子は D²−d² ではなく D²＋d² になる。",
      "オ": "中立ではメタセンタと重心の位置が一致する。水線面のモーメントから求めた浮心―メタセンタ間距離と浮心―重心間距離を等置して整理すると、分母は4でなく8になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 67。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q067.webp"
    ],
    "imageAltTexts": [
      "水に浮く中空円柱の高さ、外周・内周の直径"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q068",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 68,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "跳水前後の比エネルギー損失",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、水路幅 B の開水路に設置されたゲートから流量 Q で水が放出されており、水路の途中で跳水が生じている。ここで、跳水発生前の断面1での水深が h、跳水から十分離れた断面2での水深が 3h のとき、跳水によるエネルギー損失水頭 ΔE として最も妥当なのはどれか。ただし、両断面において静水圧分布が仮定できるものとする。",
    "choices": {
      "ア": "(2/3)h",
      "イ": "(3/4)h",
      "ウ": "(4/5)h",
      "エ": "(4/3)h",
      "オ": "(5/2)h"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "矩形水路では、連続式と静水圧を用いた運動量収支を比エネルギー差に代入すると、ΔE＝(h₂−h₁)³/(4h₁h₂) となる。h₁＝h、h₂＝3h を代入すると 8h³/(12h²)＝2h/3 である。",
    "choiceExplanations": {
      "ア": "矩形水路では、連続式と静水圧を用いた運動量収支を比エネルギー差に代入すると、ΔE＝(h₂−h₁)³/(4h₁h₂) となる。h₁＝h、h₂＝3h を代入すると 8h³/(12h²)＝2h/3 である。",
      "イ": "損失水頭には水深の差 2h だけでなく、流速が下がることによる速度水頭の差が含まれる。単位幅流量を使って運動量式から流速を消去すると、係数は3/4でなく2/3になる。",
      "ウ": "跳水前後は、流量が一定なので流速の比が3：1となる。静水圧による力と運動量の変化を合わせて得る比エネルギー差は4h/5を下回る。",
      "エ": "跳水の損失式にこの水深を入れると、分母は 4×h×3h＝12h² である。これを半分の6h²にしてしまうと、損失を2倍に数えることになる。",
      "オ": "深さが 2h 増す一方、速度水頭は 8h/3 減る。全水頭の損失は差の 2h/3 であり、5h/2ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 68。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q068.webp"
    ],
    "imageAltTexts": [
      "開水路のゲートと跳水、その前後の水深を示す図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q069",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "掘削の除荷と正規圧密粘土上の階数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、地盤を5 mの深さまで掘削して構造物を建てることを考える。構造物は1階当たりの高さが5 m、1階当たりの載荷圧が14 kN/m²である。このとき、圧密沈下を生じさせずに築造可能な最大の階数として最も妥当なのはどれか。\n\nただし、建物の階数については最下階の地下室を1階と数えることとする。また、掘削前の飽和粘土層は正規圧密状態にあるものとし、構造物の圧密沈下に対する安全率は1.0とする。さらに、砂層の湿潤単位体積重量は γₜ＝18 kN/m³、粘土層の飽和単位体積重量は γₛₐₜ＝20 kN/m³ であるとする。",
    "choices": {
      "ア": "6階",
      "イ": "7階",
      "ウ": "8階",
      "エ": "9階",
      "オ": "10階"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "掘削で取り除く砂層の上載圧は 18×5＝90 kN/m² である。建物の載荷圧をこの値までに抑えると、14×6＝84 kN/m² までは許容され、7階では超過する。",
    "choiceExplanations": {
      "ア": "掘削で取り除く砂層の上載圧は 18×5＝90 kN/m² である。建物の載荷圧をこの値までに抑えると、14×6＝84 kN/m² までは許容され、7階では超過する。",
      "イ": "7階の載荷圧は 14×7＝98 kN/m² である。掘削で減った上載圧90 kN/m²を超えるため、粘土層の有効応力を増加させる。",
      "ウ": "8階では112 kN/m²の載荷圧がかかる。取り除くのは砂層だけなので、粘土層の自重を追加で除荷として数えることはできない。",
      "エ": "9階の載荷圧は126 kN/m²となり、除荷量90 kN/m²を大きく超える。地下室も一階分なので、階数から除外しない。",
      "オ": "10階では140 kN/m²となる。正規圧密粘土はこれまで受けた有効応力を超えると圧密が進むため、除荷量に合わせて6階以下にする必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q069.webp"
    ],
    "imageAltTexts": [
      "地盤を掘削して建てる構造物と砂層・飽和粘土層の断面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q070",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "土質力学・水理学",
    "topicTags": [
      "地表面荷重の分散と自重による鉛直応力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、湿潤単位体積重量 γₜ＝20 kN/m³ である水平な地盤の地表面において、幅20 m、奥行き25 mの範囲に等分布荷重 q＝200 kN/m² が作用している。深さ5 mの位置における鉛直方向応力を σₐ、深さ10 mの位置における鉛直方向応力を σᵦ としたとき、σₐ/σᵦ の値として最も妥当なのはどれか。\n\nただし、q による増加応力は45°の角度で地盤内を伝播し、σₐ と σᵦ は共に q により応力の増加が発生している範囲内とする。",
    "choices": {
      "ア": "0.5",
      "イ": "0.6",
      "ウ": "0.8",
      "エ": "1.4",
      "オ": "1.7"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "荷重の合計10万 kNを5 mでは(20＋10)(25＋10) m²、10 mでは(20＋20)(25＋20) m²で割って分散分を求める。自重を足すと約195 kPaと256 kPaなので比は約0.76、最も近い選択肢は0.8である。",
    "choiceExplanations": {
      "ア": "0.5は地盤の自重による応力の比 100/200 に当たる。地表面荷重による増加応力も両方の深さで加える。",
      "イ": "深さ5 mでは、地表面荷重は30 m×35 mの範囲に分散する。自重のみの100 kPaに約95 kPaを加えるため、深さ10 mの全応力との比は0.6より大きい。",
      "ウ": "荷重の合計10万 kNを5 mでは(20＋10)(25＋10) m²、10 mでは(20＋20)(25＋20) m²で割って分散分を求める。自重を足すと約195 kPaと256 kPaなので比は約0.76、最も近い選択肢は0.8である。",
      "エ": "自重を含めると、5 mの合計応力は10 mの合計応力より小さい。分散した荷重の項だけで比較したり、分子と分母を入れ替えたりすると、この大小関係を見失う。",
      "オ": "増加応力だけの比は約95/56≒1.7である。問題の鉛直応力にはそれぞれの深さまでの地盤の自重も含まれる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q070.webp"
    ],
    "imageAltTexts": [
      "地表面の長方形載荷域と深さ5 m・10 mへの応力の広がり"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q071",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "上水道の水質基準とろ過方式",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の上水道に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ トリハロメタンは、水道原水中に含まれるフミン質等の有機物質が、浄水処理の過程で注入される塩素と反応して生じる発がん性のおそれのある物質であり、水道水質基準において検出されないこととされている。\n㋑ 水道水質基準において味と臭気は、共に異常でないこととされており、異臭味の原因物質は活性炭処理やオゾン処理によって除去可能である。\n㋒ 緩速ろ過方式は、ろ層の表面近くに棲息した微生物が普通沈殿池で除去できない懸濁物質を捕捉除去する方法であり、構造が簡単なため維持管理が容易である。\n㋓ 急速ろ過方式において、必要な水量又は水質の確保が維持できなくなった場合は、ろ過を停止し、ろ層表面を1～2 cm程度削り取ることでろ過機能を回復させ、削り取りによりろ層厚さが薄くなれば補砂を行う。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "味・臭気は異常でないことが求められ、活性炭による吸着やオゾンによる分解で原因物質を減らせる。緩速ろ過は砂層の表面にできる生物膜とろ層を利用する。",
    "choiceExplanations": {
      "ア": "緩速ろ過で微生物が関わる点は妥当である。総トリハロメタンの水質基準は0.1 mg/L以下であり、検出されないことを求めているわけではない。",
      "イ": "トリハロメタンは、検出の有無ではなく濃度の上限で管理される。ろ層表面を削る方法は緩速ろ過に用いられる。",
      "ウ": "味・臭気は異常でないことが求められ、活性炭による吸着やオゾンによる分解で原因物質を減らせる。緩速ろ過は砂層の表面にできる生物膜とろ層を利用する。",
      "エ": "㋑の味と臭気についての記載は正しい。急速ろ過のろ層を再生する際は、一般に水や空気で逆洗する。",
      "オ": "緩速ろ過の構成に関する㋒は妥当である。㋓にある表層の削り取りと補砂は緩速ろ過で行う管理方法である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q072",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "下水道の計画汚水量と雨水の流達時間",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の下水道に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 下水道の雨水管理計画について、計画降雨に採用する確率年は、流域治水の観点から、その流域の河川整備基本方針で採用される降雨の確率年とすることとされている。\n㋑ 下水処理施設の規模の設計に必要な計画汚水量を求めるために、計画目標年次時点における計画人口を推定する必要がある。\n㋒ 計画汚水量は計画家庭汚水量と計画工場排水量の和で求められ、管渠施設や汚水ポンプの容量は、計画1日最大汚水量を基に決定されている。\n㋓ 流達時間は、雨水が降雨地点から下水管渠に流入するまでの時間と下水管渠内を流下するのに要する時間の和で求まる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "計画汚水量のうち生活に由来する分は、目標年次の人口などを基に見積もる。雨水の流達時間は管渠への流入時間と、管渠内の流下時間の和である。",
    "choiceExplanations": {
      "ア": "将来の人口を見込んで汚水量を計画する㋑は正しい。雨水管理の計画降雨は、下水道の浸水対策水準などに即して設定され、河川側の確率年と同一にする一律の規則はない。",
      "イ": "下水道の計画降雨は、浸水リスクや対策目標なども踏まえて設定する。汚水管渠やポンプの容量はピーク時の汚水量を踏まえて決める。",
      "ウ": "人口推計を用いる点は合っている。計画汚水量には地下水等の流入を考慮し、管渠や汚水ポンプは計画時間最大汚水量を基にする。",
      "エ": "計画汚水量のうち生活に由来する分は、目標年次の人口などを基に見積もる。雨水の流達時間は管渠への流入時間と、管渠内の流下時間の和である。",
      "オ": "㋓の流達時間の定義は正しい。㋒の二項だけで汚水量を見積もり、1日最大汚水量だけで管渠やポンプを計画する説明は適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q073",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "公共用水域の環境基準と施設の届出",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の水環境に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 環境基本法に基づく公共用水域の水質汚濁に係る環境基準として、「人の健康の保護に関する環境基準」及び「生活環境の保全に関する環境基準」が定められているが、これらの基準に違反した場合の罰則はない。\n㋑ 令和4年度公共用水域水質測定結果によると、湖沼水質保全特別措置法に基づく、琵琶湖、霞ヶ浦等の11の指定湖沼の全てにおいて、化学的酸素要求量（COD）の環境基準を達成していない。\n㋒ 水質汚濁防止法では、公共用水域に水を排出する事業者が法で定める特定施設を設置する場合に、特定施設の構造や汚水処理の方法等について事前に環境大臣へ届け出ることを義務付けている。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "水質の環境基準は保全すべき目標であり、個別事業者に罰則付きで適用される排水基準とは区別される。2022年度の測定結果では、指定湖沼11すべてがCODの環境基準を湖沼全体として達成していなかった。",
    "choiceExplanations": {
      "ア": "環境基準は行政が維持・達成を目指す環境上の目標である。2022年度に指定湖沼11すべてでCODの環境基準が未達だったという㋑も含める必要がある。",
      "イ": "水質の環境基準は保全すべき目標であり、個別事業者に罰則付きで適用される排水基準とは区別される。2022年度の測定結果では、指定湖沼11すべてがCODの環境基準を湖沼全体として達成していなかった。",
      "ウ": "環境基準と排水基準の区別を述べる㋐は妥当である。特定施設設置の届出先は環境大臣ではなく、法令で権限を持つ都道府県知事等である。",
      "エ": "指定湖沼のCODに関する㋑は妥当である。水質環境基準は行政上の目標で、未達成に直接罰則を課すものではないため、㋐も該当する。",
      "オ": "㋑は測定結果に沿っている。㋒は特定施設の届出を環境大臣に行うとしており、法の規定と異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q074",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "再生可能発電と環境影響評価",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の地球温暖化及び環境影響評価制度に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 2022年度の温室効果ガス排出量について、二酸化炭素換算で多い順に並べると、二酸化炭素、ハイドロフルオロカーボン類（HFCs）、メタン、一酸化二窒素の順であり、これら全てにおいて、排出量は2013年度に比べて減少している。\n㋑ 2022年度の再生可能エネルギー発電電力量のうち、最も発電電力量が多いのは太陽光発電であり、その次に多いのは水力発電である。\n㋒ 発電所の開発事業のうち、水力、火力、地熱、原子力、太陽電池（太陽光）、風力が、環境影響評価法の対象となっており、全ての規模の開発事業において、環境影響評価法に基づく環境影響評価の手続が義務付けられている。\n㋓ 環境影響評価制度は、事業が環境に及ぼす影響について、あらかじめ事業者自らが調査、予測、評価を行い、その結果を公表して国民や地方公共団体等から意見を聴き、それらを踏まえて環境保全の観点からより良い事業計画を作り上げていく制度である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "2022年度の再生可能エネルギー発電では、太陽光が水力を上回った。環境影響評価は事業の影響を事前に把握し、公表した評価と寄せられた意見を事業の計画に反映する手続である。",
    "choiceExplanations": {
      "ア": "太陽光、水力の順という㋑は正しい。HFCsの排出量は2013年度から2022年度にかけて増えており、列挙したガスがすべて減ったわけではない。",
      "イ": "HFCsは代替冷媒などの利用に伴い、設問の期間では増加した。評価法による対象事業には規模等の要件もあり、全規模の発電所が一律に対象になるわけではない。",
      "ウ": "発電量の順位は合っている。環境影響評価法は発電の方式だけでなく事業規模なども踏まえて対象を定めるため、㋒は妥当でない。",
      "エ": "2022年度の再生可能エネルギー発電では、太陽光が水力を上回った。環境影響評価は事業の影響を事前に把握し、公表した評価と寄せられた意見を事業の計画に反映する手続である。",
      "オ": "事業者が事前に評価し関係者の意見を聴く㋓は正しい。㋒の「全ての規模」は、法令の対象区分と一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q075",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "環境工学（土木）・衛生工学",
    "topicTags": [
      "土壌汚染対策と石綿の事前調査",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の環境問題に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 新幹線鉄道騒音に係る環境基準の達成状況について、2022年度は、測定地点のうち9割以上の地点で環境基準を達成している。\n㋑ 土壌汚染による健康リスクを減らすためには、土壌に含まれる有害物質の人間への摂取経路を遮断することが重要であることから、土壌に含まれる有害物質を口や肌などから直接摂取するリスクのみを考慮して対策する必要がある。\n㋒ バイオレメディエーションとは、微生物等の働きを利用して汚染物質を分解等することにより、土壌、地下水の環境汚染の浄化を図る技術手法である。\n㋓ アスベスト（石綿）飛散防止対策のため、大気汚染防止法において、全ての建築物の解体工事について、当該建築物の石綿の有無を事前調査で確認し、石綿が使用されている場合は、作業基準を遵守すること等を求めている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "微生物の分解作用などを利用して汚染土壌や地下水を浄化する手法がバイオレメディエーションである。石綿の飛散を防ぐため、建築物の解体前に石綿の有無を調べ、石綿があれば作業基準に従う。",
    "choiceExplanations": {
      "ア": "新幹線鉄道騒音の2022年度の測定で、基準達成地点は9割に及ばない。土壌汚染では地下水の飲用による摂取など、直接接触以外の経路も考慮する。",
      "イ": "微生物等を利用する㋒は正しい。㋐の9割以上という値は、新幹線鉄道騒音の測定結果と一致しない。",
      "ウ": "汚染物質の分解に生物を使う㋒は妥当である。汚染土壌から地下水に溶出した物質を摂取する経路もあるので、㋑の限定は不適切である。",
      "エ": "石綿の有無を事前調査で確認する㋓は妥当である。土壌汚染の健康影響では、直接摂取と地下水の摂取を区別して評価する。",
      "オ": "微生物の分解作用などを利用して汚染土壌や地下水を浄化する手法がバイオレメディエーションである。石綿の飛散を防ぐため、建築物の解体前に石綿の有無を調べ、石綿があれば作業基準に従う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q076",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "単純梁の曲げ応力と軸圧縮応力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのように、長さ 15a の単純梁の点 A に鉛直下向きの集中荷重 P、ローラー支持端側の断面中央に水平左向きの集中荷重 2P が作用している。部材断面は、図Ⅱのような幅 a、高さ 2a の矩形断面である。この単純梁の曲げモーメントが最大となる点で生ずる断面下端の垂直応力度として最も妥当なのはどれか。\n\nただし、垂直応力度は、引張を「＋」、圧縮を「−」とする。また、単純梁は座屈しないものとし、自重は無視するものとする。",
    "choices": {
      "ア": "−6P/a²",
      "イ": "−2P/(3a²)",
      "ウ": "0",
      "エ": "4P/a²",
      "オ": "5P/a²"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "左支点の鉛直反力が P/3 なので、A点で最大曲げモーメントは 10Pa/3、断面係数は 2a³/3 である。下端の曲げ引張り 5P/a² に、軸圧縮 −2P/(2a²) を加えると 4P/a² になる。",
    "choiceExplanations": {
      "ア": "最大の正曲げの位置では、断面下端の曲げ応力は引張側である。圧縮の軸応力は −P/a² なので、両方を圧縮としてはならない。",
      "イ": "断面下端には曲げによる +5P/a² と軸力による −P/a² が重なる。圧縮だけが残るこの値とは一致しない。",
      "ウ": "下端の曲げによる引張りと軸力による圧縮は相殺し切らない。曲げ応力の絶対値は軸応力の5倍で、引張側の値が残る。",
      "エ": "左支点の鉛直反力が P/3 なので、A点で最大曲げモーメントは 10Pa/3、断面係数は 2a³/3 である。下端の曲げ引張り 5P/a² に、軸圧縮 −2P/(2a²) を加えると 4P/a² になる。",
      "オ": "5P/a²は最大曲げモーメントによる下端の応力だけを表す。水平から 2P で押されるため、断面全体に −P/a² の軸応力も生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q076.webp"
    ],
    "imageAltTexts": [
      "点Aに鉛直集中荷重が作用する梁と矩形断面の寸法"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q077",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 77,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "横移動の可否と架構の座屈荷重",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような構造物 A、B、C が柱上端に中心圧縮力を受けて座屈するとき、A、B、C における弾性座屈荷重の理論値 Pₐ、Pᵦ、P꜀ の大小関係として妥当なのはどれか。\n\nただし、柱は全長にわたって等質等断面とし、梁は剛体とする。また、梁、柱の自重は無視するものとする。",
    "choices": {
      "ア": "Pₐ＜Pᵦ＜P꜀",
      "イ": "Pₐ＝Pᵦ＜P꜀",
      "ウ": "Pₐ＝P꜀＜Pᵦ",
      "エ": "P꜀＜Pₐ＜Pᵦ",
      "オ": "P꜀＜Pᵦ＜Pₐ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "横移動できるAのピン―固定柱は有効長 2h、横移動できるCの両端回転拘束柱も有効長 2h になる。横移動を拘束したBのピン―固定柱は有効長約 0.7×2h＝1.4h なので、座屈荷重はBが最大となる。",
    "choiceExplanations": {
      "ア": "Cは両端の回転が拘束されるが、上部は横移動できる。Bは上部を横に支えているため、Cより有効座屈長が短くなる。",
      "イ": "AとBはともに柱脚がピンだが、Aは上部が横移動し、Bは横移動を止められている。有効座屈長はAの 2h よりBの約1.4hの方が短い。",
      "ウ": "横移動できるAのピン―固定柱は有効長 2h、横移動できるCの両端回転拘束柱も有効長 2h になる。横移動を拘束したBのピン―固定柱は有効長約 0.7×2h＝1.4h なので、座屈荷重はBが最大となる。",
      "エ": "Bが最大である点は正しい。Aは柱が短い一方、横移動と柱脚回転の影響で有効長が 2h になり、Cと同じ座屈荷重になる。",
      "オ": "Aは実際の柱長が最短でも、横移動できるピン―固定の条件で有効長は実長の2倍となる。Bの方が有効長が短く、座屈荷重は大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 77。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q077.webp"
    ],
    "imageAltTexts": [
      "柱脚条件と上部の横移動の可否が異なる三つの架構"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q078",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "一質点系の固有振動数と最大速度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような、質量 m、2m、m の質点と、剛性 k、k、2k のばねで構成される、水平方向のみ1自由度の1質点系振動モデル A、B、C の非減衰自由振動を考える。いずれの系も、質点の変位振幅が同一の単振動（調和振動）をしているとき、質点の最大速度 V_A、V_B、V_C の大小関係として妥当なのはどれか。ただし、ばねの変形は弾性の範囲内とする。",
    "choices": {
      "ア": "V_A＝V_B＝V_C",
      "イ": "V_A＜V_B＜V_C",
      "ウ": "V_B＜V_A＜V_C",
      "エ": "V_C＜V_A＜V_B",
      "オ": "V_C＜V_B＜V_A"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最大速度は同じ振幅に √(ばね剛性/質量) を掛けて比べられる。BはAの 1/√2 倍、CはAの √2 倍なので、V_B＜V_A＜V_C となる。",
    "choiceExplanations": {
      "ア": "同じ変位振幅でも、単位時間に進む振動の位相が違えば最大速度は変わる。最大速度は振幅に固有角振動数を掛けて求める。",
      "イ": "Cが最も速いことは正しい。BはAと同じばね剛性で質量が2倍なので、固有角振動数はAの 1/√2 倍になる。",
      "ウ": "最大速度は同じ振幅に √(ばね剛性/質量) を掛けて比べられる。BはAの 1/√2 倍、CはAの √2 倍なので、V_B＜V_A＜V_C となる。",
      "エ": "CはAと同じ質量でばね剛性が2倍なので、最も速い。Bは質量が大きくなり、最も遅い。",
      "オ": "BよりAが速いという点は合うが、CはAの半分の質量ではなく同じ質量で、剛性が2倍である。より高い角振動数になるため、Cを最小にするのは誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q078.webp"
    ],
    "imageAltTexts": [
      "質量とばね剛性が異なる三つの一質点系振動モデル"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q079",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "独立フーチング基礎の即時沈下",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のような砂地盤に支持された1辺2.0 mの正方形独立フーチング基礎の中心に P＝360 kN の鉛直荷重が作用した場合の即時沈下量 Sₑ として最も妥当なのはどれか。\n\nただし、地下水位は十分に深く、基礎の剛性は十分に高いものとする。なお、即時沈下量 Sₑ [m] は、次式で与えられる。\nSₑ＝qB(1−ν²)Iₛ/E\nここで、q は基礎に作用する平均荷重度（平均接地圧）[kN/m²]、B は基礎の短辺長さ [m]、Iₛ は基礎の形状と剛性によって決まる沈下係数で0.88とする。また、E は地盤の変形係数 [kN/m²]、ν は地盤のポアソン比で、それぞれ図中の値とする。",
    "choices": {
      "ア": "2.0×10⁻⁶ m",
      "イ": "4.0×10⁻⁶ m",
      "ウ": "8.0×10⁻⁶ m",
      "エ": "4.0×10⁻³ m",
      "オ": "8.0×10⁻³ m"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "q＝360/(2.0×2.0)＝90 kN/m²、E＝18,000 kN/m²である。式に B＝2.0、ν＝0.3、Iₛ＝0.88 を入れると約0.0080 mになる。",
    "choiceExplanations": {
      "ア": "荷重を2 m×2 mの底面で割った接地圧は90 kN/m²である。変形係数も同じ単位の18,000 kN/m²とすれば、沈下はマイクロメートルではなくミリメートルの規模になる。",
      "イ": "指数を10⁻⁶とすると、荷重と変形係数の力の単位が一致しているかを確認する必要がある。接地圧と変形係数の比は90/18000＝0.005で、短辺長さ2 mを掛けると補正前で0.01 mとなる。",
      "ウ": "この値は、正しい数値を1000分の1にしたものである。18 MN/m²は18,000 kN/m²であり、荷重をkNで扱う式に18,000,000を入れない。",
      "エ": "平均接地圧は90 kN/m²で、式の B は半幅ではなく短辺長さ2.0 mである。Bを1.0 mにすると沈下を半分に見積もる。",
      "オ": "q＝360/(2.0×2.0)＝90 kN/m²、E＝18,000 kN/m²である。式に B＝2.0、ν＝0.3、Iₛ＝0.88 を入れると約0.0080 mになる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q079.webp"
    ],
    "imageAltTexts": [
      "砂地盤と独立フーチング基礎の断面・底面および地盤の定数"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q080",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "構造力学（建築）",
    "topicTags": [
      "三支点梁の中央変位条件と支点反力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰのような不静定梁について、A点の鉛直反力 Vₐ として最も妥当なのはどれか。\n\nただし、図Ⅱのような単純梁が等分布荷重 w 及び集中荷重 P を受ける場合の単純梁の中央鉛直変位は、それぞれ αwl⁴/(EI)、βPl³/(EI) で与えられるものとする。また、図Ⅰ及び図Ⅱの梁は曲げ変形のみ生ずる曲げ剛性 EI の弾性部材であり、部材の自重は無視するものとする。",
    "choices": {
      "ア": "βwl/α",
      "イ": "(α−β)wl/(2α)",
      "ウ": "(α−β)wl/α",
      "エ": "(β−α)wl/(2β)",
      "オ": "(β−α)wl/β"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Bを外した単純梁に対し、等分布荷重による中央変位を上向きの Vᵦ で打ち消すと Vᵦ＝αwl/β である。対称性から Vₐ＝(wl−Vᵦ)/2＝(β−α)wl/(2β) となる。",
    "choiceExplanations": {
      "ア": "点Bで変位を0とする条件では、等分布荷重による変位とBの上向き反力による変位を等しく置く。得られる反力は Vᵦ＝αwl/β であり、そのままAの反力にはならない。",
      "イ": "Vᵦ を求める際は、集中荷重に付く変位係数 β で割る。力の釣合いと対称性から、A点の反力は残りの荷重の半分である。",
      "ウ": "係数の比 α/β は中央支点の反力に現れるが、端の反力では全荷重との差を取る。左右の支点反力が等しいので、その差を2で割る必要もある。",
      "エ": "Bを外した単純梁に対し、等分布荷重による中央変位を上向きの Vᵦ で打ち消すと Vᵦ＝αwl/β である。対称性から Vₐ＝(wl−Vᵦ)/2＝(β−α)wl/(2β) となる。",
      "オ": "(β−α)wl/β は両端の反力の合計である。AとCは荷重・支持配置が対称なので、Aの反力はこの半分である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q080.webp"
    ],
    "imageAltTexts": [
      "三支点に等分布荷重が作用する梁、比較する二つの単純梁"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q081",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "RC梁の許容曲げと柱のじん性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の鉄筋コンクリート造建築物の構造設計に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 梁の許容曲げモーメントは、圧縮側最外縁のコンクリートの応力度が許容圧縮応力度に達したときに求まる値と、引張側主筋の応力度が許容引張応力度に達したときに求まる値のうち、いずれか小さい方の値とする。\n㋑ 柱は、負担している軸方向圧縮力が大きい方が、一般に、靭性は低くなる。\n㋒ 梁のあばら筋は、曲げひび割れ後の急激な靭性低下を防止するために配筋される。\n㋓ 柱梁接合部は、取り付く梁の主筋量が多くなるほど、許容せん断力が大きくなる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "梁は圧縮側コンクリートと引張側鉄筋がそれぞれの許容応力度以内となるように、先に達する方で許容曲げを決める。柱の軸圧縮力が大きいとコンクリートの圧壊が早まりやすく、変形能力が低下する。",
    "choiceExplanations": {
      "ア": "梁は圧縮側コンクリートと引張側鉄筋がそれぞれの許容応力度以内となるように、先に達する方で許容曲げを決める。柱の軸圧縮力が大きいとコンクリートの圧壊が早まりやすく、変形能力が低下する。",
      "イ": "㋐は許容曲げモーメントの決め方として妥当である。あばら筋の主な役割は斜めひび割れ後にもせん断力を負担し、せん断破壊を防ぐことである。",
      "ウ": "大きな軸圧縮力で柱の変形能力が低下しやすい点は正しい。梁のあばら筋はせん断補強筋であり、曲げひび割れへの対応を主目的とする説明は合わない。",
      "エ": "柱についての㋑は正しい。接合部の許容せん断力はコンクリートの強度、接合部の有効断面や形状などで評価され、梁主筋量を増すだけでは大きくならない。",
      "オ": "あばら筋はせん断ひび割れに対して機能する。梁主筋量が増えると接合部に伝達される力は増し得るが、接合部の許容せん断力が同様に増えるとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q082",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "建築基準法令の地震力・速度圧・積載荷重",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "建築基準法、建築基準法施行令及びこれらに基づく告示に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 地盤の種別として、第一種地盤から第四種地盤まで定められており、軟弱地盤は第一種地盤に分類される。\n㋑ 建築物の地下部分の地震力に対しては、許容応力度計算のみが課されている。\n㋒ 風圧力の速度圧は、風速の平方根に比例する関係にある。\n㋓ 地震力を計算する場合の積載荷重の値は、床の構造計算をする場合の積載荷重の値よりも小さい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "地下部分は所定の地震力を用いて許容応力度を照査する。施行令の積載荷重の表では、地震力の計算に用いる値は床の構造計算用より小さい。",
    "choiceExplanations": {
      "ア": "地下部分の地震力に対する許容応力度計算を述べた㋑は妥当である。地盤は第一種から第三種までで、軟弱地盤は第三種に分類される。",
      "イ": "地盤種別は軟らかい側を第三種とする三種である。風圧力を算定する速度圧は、施行令の式で基準風速の二乗に比例する。",
      "ウ": "地震力計算用の積載荷重を定める㋓は妥当である。第一種地盤は岩盤等の堅固な地盤に対応し、軟弱地盤ではない。",
      "エ": "地下部分の地震力についての㋑は正しい。速度圧は q＝0.6EV₀² の形で定められ、風速に対する指数は2である。",
      "オ": "地下部分は所定の地震力を用いて許容応力度を照査する。施行令の積載荷重の表では、地震力の計算に用いる値は床の構造計算用より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q083",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "コンクリートの変形と異形鉄筋の規格",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "建築構造材料に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 普通コンクリートの引張強度は、圧縮強度の3分の2程度である。\n㋑ 普通コンクリートは、軽量コンクリートに比べて、同じ強度・同じ応力度でのひずみ度が小さい。\n㋒ 鉄筋コンクリート用異形棒鋼 SD295 は、降伏点の下限値が295 N/mm²である。\n\n㋓ 降伏比（降伏点/引張強さ）が高い方が、より粘りのある鋼材である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "普通コンクリートは同じ強度の軽量コンクリートより一般に弾性係数が大きいため、同じ応力度でのひずみが小さい。SD295の規格では降伏点または耐力の下限が295 N/mm²である。",
    "choiceExplanations": {
      "ア": "軽量コンクリートの変形が大きいという㋑は妥当である。普通コンクリートの引張強度は圧縮強度よりかなり低く、一般に圧縮強度の1割程度である。",
      "イ": "SD295の下限値は295 N/mm²である。㋐の3分の2は、コンクリートの引張強度を過大に評価している。",
      "ウ": "普通コンクリートは同じ強度の軽量コンクリートより一般に弾性係数が大きいため、同じ応力度でのひずみが小さい。SD295の規格では降伏点または耐力の下限が295 N/mm²である。",
      "エ": "㋑は正しい。降伏比が高いと降伏点から引張強さまでの余裕が小さくなるため、降伏比が高いほど粘りがあるという説明は妥当でない。",
      "オ": "異形棒鋼の規格値を述べた㋒は正しい。塑性変形を期待する鋼材では、引張強さに対する降伏点の比を低く抑えることが重視される。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q084",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "シート・塗膜・アスファルト防水",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "防水材料に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ シート防水は、常温で施工が可能で伸び能力があるが、シートが薄いため、下地に高い平滑度が要求される。\n\n㋑ 塗膜防水は、複雑な平面形状の場所での施工は困難であるが、下地のひび割れなどの変形に追従しやすい。\n\n㋒ アスファルト防水は、アスファルトルーフィング類を溶融したアスファルトで接着しながら積層して防水層を形成するもので、アスファルトの引火に注意が必要である。\n\n㋓ 不定形シーリング材は、充填箇所の断面が一定である場合に、目地材料に密着させる成形品である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "シート防水では、薄い材料を敷く下地の凹凸を抑えることが重要である。㋒の熱工法は溶融アスファルトでルーフィング類を積層するため、加熱時の引火に注意する。",
    "choiceExplanations": {
      "ア": "㋐のシート防水における下地の平滑性は妥当である。塗膜防水は液状材料を塗って連続した層を作るため、複雑な形にも適用しやすい。",
      "イ": "シート防水では、薄い材料を敷く下地の凹凸を抑えることが重要である。㋒の熱工法は溶融アスファルトでルーフィング類を積層するため、加熱時の引火に注意する。",
      "ウ": "アスファルト防水の熱工法を述べる㋒は妥当である。㋑の塗膜防水は、液状で施工するので複雑な形状への対応を得意とする。",
      "エ": "塗膜防水は、複雑な形の部分にも材料を塗り広げて防水層にできる。不定形シーリング材は目地に充填して使用する材料で、あらかじめ成形された目地材とは区別される。",
      "オ": "㋒にある熱工法では溶融材を使う。㋓の成形品は定形シーリング材に当たり、不定形材は施工時に目地に合わせて充填する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q085",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "建築構造・建築材料・建築施工",
    "topicTags": [
      "完全溶込み溶接と高力ボルトの施工",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国における建築物の鉄骨工事に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 裏当て金を完全溶込み溶接において用いる場合は、一般に、あらかじめ母材に溶接で取り付ける。\n\n㋑ トルシア形高力ボルトの締付け完了後の検査において、全てのボルトについて「共回り又は軸回りがないこと」、「ナット回転量及びナット面から突き出したボルトの余長が十分であること」及び「ピンテールが破断していること」を目視で確認し、異常のないものを合格とする。\n\n㋒ 高力ボルトの締付けは、一般に、一つのボルト群ごとに継手の端部から中央部に向かう順序で行う。\n\n㋓ 高力ボルトと溶接の混用接合は、溶接を先に行う。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "裏当て金は完全溶込みを確保するため所定の位置に取り付ける。トルシア形高力ボルトの締付け後は、マーキングや余長、ピンテールの破断を全数で確認する。",
    "choiceExplanations": {
      "ア": "裏当て金は完全溶込みを確保するため所定の位置に取り付ける。トルシア形高力ボルトの締付け後は、マーキングや余長、ピンテールの破断を全数で確認する。",
      "イ": "裏当て金を使う場合の㋐は妥当である。高力ボルトは、継手中央部から端部へ向けて順次締めるのが一般的である。",
      "ウ": "トルシア形高力ボルトの検査は㋑のとおりである。締付け順序を問う㋒は、一般的な中央から端への方向を逆にしている。",
      "エ": "㋑の目視検査は正しい。高力ボルトと溶接の混用接合では、原則としてボルトの本締めを先に行い、その後に溶接する。",
      "オ": "ボルト群は一般に中央側から締めて接合面のなじみを確保する。混用接合でも、標準的な施工順序では先にボルトを締め付ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q086",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "連続一様分布の標準偏差",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、ある確率変数 x の取り得る値が、μₓ−a から μₓ＋a の区間において一様な確率で分布し、その期待値は μₓ であり、この区間以外で x が観測される確率は0（ゼロ）であるとする。このとき、x の標準偏差 σ(x) として最も妥当なのはどれか。\n\nただし、x の確率密度関数を p(x) とすると、その分散は次の式で与えられるものとする。\nσ²(x)＝∫₋∞^∞ (x−μₓ)²p(x) dx",
    "choices": {
      "ア": "a/3",
      "イ": "a/√6",
      "ウ": "a/2",
      "エ": "a/√3",
      "オ": "a/√2"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "区間内の密度は 1/(2a) なので、中心からの偏差 u を使うと分散は (1/(2a))∫₋ₐ^ₐ u² du＝a²/3 である。平方根を取れば標準偏差は a/√3 となる。",
    "choiceExplanations": {
      "ア": "積分から得る分散は a²/3 である。標準偏差を出すときは分母にも平方根を適用するので a/√3 になる。",
      "イ": "密度が 1/(2a) でも、偏差の二乗の積分は負側と正側の両方を含む。片側だけで計算すると分散を半分にしてしまう。",
      "ウ": "a/2は中心からの絶対偏差の平均である。標準偏差では偏差の二乗を平均してから平方根を取る。",
      "エ": "区間内の密度は 1/(2a) なので、中心からの偏差 u を使うと分散は (1/(2a))∫₋ₐ^ₐ u² du＝a²/3 である。平方根を取れば標準偏差は a/√3 となる。",
      "オ": "偏差の二乗は区間内で0から a² まで変化するが、その二乗値が一様に分布するわけではない。もとの偏差について平均するため、分散は a²/3 になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q086.webp"
    ],
    "imageAltTexts": [
      "確率変数xが区間μₓ−aからμₓ＋aで一様に分布するグラフ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q087",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "バックグラウンド補正後の計数率の不確かさ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "パルス型粒子線測定装置の検出器は、光を入射すると、その入射光による粒子1個を検出するごとにパルス信号1個を出力する。一定時間内に出力されたパルス信号の個数を測定した値を計数値又は計数という。\n\nこの装置の検出器に20秒間光を入射し、出力されたパルス信号を測定したところ、計数値は3600であった。また、この装置の検出器は、入射光がない場合でも電子回路の雑音等によりパルス信号を出力する。入射光がない状態で10秒間出力されたパルス信号を測定したところ、バックグラウンドの計数値は124であった。バックグラウンドの影響を除いた正味の計数率 [s⁻¹] とその標準偏差 [s⁻¹] の組合せとして最も妥当なのはどれか。\n\nただし、計数率は1秒当たりの計数値である。また、計数値の分散は計数値に等しいとしてよい。",
    "choices": {
      "ア": "167.6 s⁻¹、2.8 s⁻¹",
      "イ": "167.6 s⁻¹、3.2 s⁻¹",
      "ウ": "180.0 s⁻¹、2.8 s⁻¹",
      "エ": "192.4 s⁻¹、2.8 s⁻¹",
      "オ": "192.4 s⁻¹、3.2 s⁻¹"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "正味の計数率は 3600/20−124/10＝167.6 s⁻¹ になる。独立な計数の分散は差でも加算されるため、標準偏差は √(3600/20²＋124/10²)≒3.2 s⁻¹ である。",
    "choiceExplanations": {
      "ア": "正味の平均値は合っているが、独立な測定値の差の分散では二つの分散を足す。計数率の分散を引くと約2.8 s⁻¹になり、不確かさを過小評価する。",
      "イ": "正味の計数率は 3600/20−124/10＝167.6 s⁻¹ になる。独立な計数の分散は差でも加算されるため、標準偏差は √(3600/20²＋124/10²)≒3.2 s⁻¹ である。",
      "ウ": "180.0 s⁻¹ はバックグラウンドを含む計数率である。補正後の不確かさには、別に測ったバックグラウンドの分散も加える。",
      "エ": "192.4 s⁻¹ は照射時の180.0 s⁻¹に背景12.4 s⁻¹を加えた値である。平均値の補正は減算、二回の独立測定の分散は加算となる。",
      "オ": "標準偏差3.2 s⁻¹ は、二つの分散を加えて計算した値に合う。背景を除くには、180.0 s⁻¹から12.4 s⁻¹を差し引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q090",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "計測工学・制御工学",
    "topicTags": [
      "重複極を含む逆ラプラス変換",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の関数 F(s) の逆ラプラス変換として最も妥当なのはどれか。ただし、s はラプラス演算子とする。\nF(s)＝1/[(s＋1)³(s＋2)]",
    "choices": {
      "ア": "(−t²＋t−2)e⁻ᵗ−e⁻²ᵗ",
      "イ": "(−t²/2＋t−1)e⁻ᵗ−e⁻²ᵗ",
      "ウ": "(t²/2−t＋1)e⁻ᵗ−e⁻²ᵗ",
      "エ": "(t²/2−t＋2)e⁻ᵗ−e⁻²ᵗ",
      "オ": "(t²−t＋1)e⁻ᵗ−e⁻²ᵗ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "部分分数に分けると 1/(s＋1)³−1/(s＋1)²＋1/(s＋1)−1/(s＋2) である。それぞれを逆変換して (t²/2−t＋1)e⁻ᵗ−e⁻²ᵗ を得る。",
    "choiceExplanations": {
      "ア": "s＝−1の三重極の最上位項の係数は lim[(s＋1)³F(s)]＝1 である。このため t²e⁻ᵗ の係数は−1でなく＋1/2になる。",
      "イ": "三重極の逆変換では、(s＋1)⁻³の係数1が t²e⁻ᵗ/2 に対応する。t の係数も部分分数分解では−1となる。",
      "ウ": "部分分数に分けると 1/(s＋1)³−1/(s＋1)²＋1/(s＋1)−1/(s＋2) である。それぞれを逆変換して (t²/2−t＋1)e⁻ᵗ−e⁻²ᵗ を得る。",
      "エ": "e⁻ᵗの定数係数は、部分分数の 1/(s＋1) の係数1から来る。定数を2にすると、変換結果に余分な 1/(s＋1) が加わる。",
      "オ": "1/(s＋1)³に対応するのは t²e⁻ᵗ/2 である。t²の係数を1にすると、ラプラス変換で三重極の係数が2になってしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q091",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "真性半導体の抵抗率とキャリアの移動度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "電子の移動度が1400 cm²/(V·s)、正孔の移動度が400 cm²/(V·s)、真性キャリア密度が 1.5×10¹⁰ cm⁻³ である真性半導体の抵抗率として最も妥当なのはどれか。ただし、電気素量を 1.6×10⁻¹⁹ C とする。",
    "choices": {
      "ア": "2.4×10⁻⁶ Ω·cm",
      "イ": "4.3×10⁻⁶ Ω·cm",
      "ウ": "2.3×10⁵ Ω·cm",
      "エ": "2.5×10⁵ Ω·cm",
      "オ": "4.2×10⁵ Ω·cm"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "真性半導体では電子も正孔も密度は 1.5×10¹⁰ cm⁻³ で、導電率の寄与を加える。抵抗率は 1/[1.6×10⁻¹⁹×1.5×10¹⁰×(1400＋400)]≒2.3×10⁵ Ω·cm である。",
    "choiceExplanations": {
      "ア": "真性キャリア密度と移動度から算出した電気伝導率は 4.32×10⁻⁶ S/cm である。その逆数の抵抗率は 10⁵ Ω·cm の桁になる。",
      "イ": "4.3×10⁻⁶は、電気伝導率を S/cm で示したときの値に近い。抵抗率ではその逆数を取るので桁が変わる。",
      "ウ": "真性半導体では電子も正孔も密度は 1.5×10¹⁰ cm⁻³ で、導電率の寄与を加える。抵抗率は 1/[1.6×10⁻¹⁹×1.5×10¹⁰×(1400＋400)]≒2.3×10⁵ Ω·cm である。",
      "エ": "移動度を足した値は1800 cm²/(V·s)である。導電率を4.32×10⁻⁶ S/cmまで求めてから逆数を取ると、2.5×10⁵より2.3×10⁵に近い。",
      "オ": "真性半導体では、正孔も電子も同じ向きの慣用電流に寄与する。移動度の差でなく和を使うので、伝導率が高くなり抵抗率はこの値より小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q093",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "電子工学",
    "topicTags": [
      "トランジスタの小信号等価回路と電圧利得",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰはトランジスタを用いた増幅回路であり、図Ⅱはこの回路全体の小信号等価回路である。この回路の電圧増幅率 vₒ/vᵢ として最も妥当なのはどれか。ただし、コンデンサのインピーダンスは無視できるほど小さいものとする。",
    "choices": {
      "ア": "h_fe R₂/R₃",
      "イ": "h_fe R₂/(R₁＋h_ie)",
      "ウ": "h_fe R₂/h_ie",
      "エ": "R₂/R₃",
      "オ": "(R₁＋h_ie＋R₃)R₂/[(R₁＋h_ie)R₃]"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "等価回路で i_b は図の向きに −vᵢ/(R₁＋h_ie) となる。コレクタでは vₒ＝−h_fe i_b R₂ なので、利得は h_fe R₂/(R₁＋h_ie) となる。",
    "choiceExplanations": {
      "ア": "R₃は入力電圧 vᵢ を定める理想電圧源と並列につながっている。ベース電流を決める抵抗は、接地とエミッタを結ぶ R₁＋h_ie である。",
      "イ": "等価回路で i_b は図の向きに −vᵢ/(R₁＋h_ie) となる。コレクタでは vₒ＝−h_fe i_b R₂ なので、利得は h_fe R₂/(R₁＋h_ie) となる。",
      "ウ": "ベース側には h_ie に加えて R₁ が接地との間に直列に入る。h_ie だけで電流を計算すると大きく見積もり過ぎる。",
      "エ": "R₂/R₃の比だけでは、従属電流源がベース電流の h_fe 倍を流すことを反映できない。利得は出力が R₂ に流す電流とベース側の抵抗で決まる。",
      "オ": "図Ⅱで vᵢ はエミッタ電圧そのものなので、R₃との分圧で求める必要はない。電圧利得は R₃ を含まず、従属電流源の倍率 h_fe を含む。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q093.webp"
    ],
    "imageAltTexts": [
      "トランジスタ増幅回路とその小信号等価回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q097",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "遅延プロファイルのモーメントとコヒーレント帯域",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "正規化遅延プロファイル及びコヒーレント帯域に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。ただし、√0.141＝0.375とする。\n\n「図に示す正規化遅延プロファイルをもつ通信路がある。このとき、平均遅延量はおよそ【㋐】μs、遅延量の二乗平均はおよそ【㋑】μs²である。周波数領域で正規化された周波数伝達関数の相関が0.5までの帯域をコヒーレント帯域 B꜀ とする。コヒーレント帯域 B꜀ は、遅延量の標準偏差である遅延スプレッド σ_τ を用いて B꜀≒1/(5σ_τ) と表される。図に示す正規化遅延プロファイルをもつ通信路の場合、コヒーレント帯域 B꜀ は【㋒】kHzである。」",
    "choices": {
      "ア": "0.040、0.047、375",
      "イ": "0.040、0.126、592",
      "ウ": "0.108、0.047、375",
      "エ": "0.108、0.126、592",
      "オ": "0.108、0.126、375"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "各経路の相対電力1、0.1、0.01を総和1.11で正規化すると、遅延の一次モーメントは約0.108 μs、二次モーメントは約0.126 μs²となる。分散は約 0.126−0.108² で、B꜀ はその平方根を秒に直し、5倍した値の逆数を取ると約592 kHzである。",
    "choiceExplanations": {
      "ア": "受信電力を線形値にすると遅延0、1、2 μsの重みは1、0.1、0.01である。加重平均には、遅延1 μsの成分も必ず含める。",
      "イ": "二乗平均と帯域の数値は合っているが、一次の加重平均は (0.1＋2×0.01)/1.11≒0.108 μsである。遅延2 μsには電力0.01の重みを掛ける。",
      "ウ": "平均遅延は正しい。二乗平均では1 μsに対して1、2 μsに対して4を重みに掛けるため、(0.1＋0.04)/1.11≒0.126 μs² になる。",
      "エ": "各経路の相対電力1、0.1、0.01を総和1.11で正規化すると、遅延の一次モーメントは約0.108 μs、二次モーメントは約0.126 μs²となる。分散は約 0.126−0.108² で、B꜀ はその平方根を秒に直し、5倍した値の逆数を取ると約592 kHzである。",
      "オ": "平均と二乗平均は正しい。帯域の式に入れるのは標準偏差で、約0.338 μsの5倍の逆数は約0.592 MHzである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q097.webp"
    ],
    "imageAltTexts": [
      "0、1、2 μsの経路の相対受信電力を示す遅延プロファイル"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q098",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "通信工学",
    "topicTags": [
      "TCPのコネクション確立と確認応答番号",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "TCP/IPモデルに関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「TCPプロトコルにおいては、送受信者間で仮想的なコネクションを確立した上でデータ転送を行うことで、信頼性を保証したデータ送信を実現する。\nまず、3ウェイハンドシェイクと呼ばれる、送信者及び受信者でタイミングを同期しない手続きに従ってセッションを確立する。最初に、SYNセグメント SYN_i を受け取った受信者は、【㋐】を送信者へ返送する。また、【㋐】を受け取った送信者は、さらに【㋑】を受信者へ返送することで、コネクションを確立させる。\nコネクション確立後のデータ転送において、送信者は、送信したいデータをいくつかのデータセグメントに分割して順次これを送信する。送信者のシーケンス番号及びサイズ d のデータを受け取った受信者は、【㋒】を送信者へ返送する。これを繰り返すことで、データセグメントを本来の順序どおりに受信できていない場合であっても、元の順序に並び替える順序制御が可能になる。」",
    "choices": {
      "ア": "ACK_(i＋1)・SYN_(i＋1)、ACK_(i＋2)、ACK_(n＋d)",
      "イ": "ACK_(i＋1)・SYN_(i＋1)、ACK_(i＋2)、ACK_(m＋d)",
      "ウ": "ACK_(i＋1)・SYN_j、ACK_(j＋1)、ACK_(n＋d)",
      "エ": "ACK_(i＋1)・SYN_j、ACK_(j＋1)、ACK_(m＋d)",
      "オ": "ACK_(i＋1)・SYN_j、ACK_(j＋1)、ACK_d"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "最初の応答は、相手のSYNに対する ACK_(i＋1) と自分の SYN_j を一つのセグメントに載せ、次の応答は ACK_(j＋1) となる。順に届いた m からの d バイトを確認するときは、次に期待する m＋d を知らせる。",
    "choiceExplanations": {
      "ア": "受信者側のSYNは、送信側の番号 i＋1 とは別に受信側が選んだ j を番号とする。データの確認応答も、受信側の n ではなく到着したデータの番号 m を基準にする。",
      "イ": "データの確認応答 m＋d は正しい。受信者は自分のSYNを j で送り、これに対する確認応答は j＋1 になる。",
      "ウ": "接続確立の応答番号は正しい。受け取ったデータは送信者側のシーケンス空間に属するので、確認応答は受信者の n ではなくデータの m に基づく。",
      "エ": "最初の応答は、相手のSYNに対する ACK_(i＋1) と自分の SYN_j を一つのセグメントに載せ、次の応答は ACK_(j＋1) となる。順に届いた m からの d バイトを確認するときは、次に期待する m＋d を知らせる。",
      "オ": "接続時の二つの値は合っているが、データの確認応答番号は受け取った長さだけを返す値ではない。図の開始シーケンス番号 m にデータ長 d を足す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q098.webp"
    ],
    "imageAltTexts": [
      "TCPのコネクション確立とデータ転送のシーケンス図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q101",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "直列・並列に働くばねの固有振動数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰ及び図Ⅱのように、質量 m の質点がばね定数 k の二つのばねにつながれて支持されている。図Ⅰ、Ⅱの系の固有振動数をそれぞれ f₁、f₂ とするとき、f₁/f₂ として最も妥当なのはどれか。ただし、質点は鉛直方向のみに振動するものとする。",
    "choices": {
      "ア": "1/4",
      "イ": "1/2",
      "ウ": "1",
      "エ": "2",
      "オ": "4"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "図Ⅰは直列で合成ばね定数 k/2、図Ⅱは質点を動かすと二つのばねの復元力が加わるため 2k である。振動数は合成ばね定数の平方根に比例するので、f₁/f₂＝√[(k/2)/(2k)]＝1/2 となる。",
    "choiceExplanations": {
      "ア": "1/4は、直列の合成ばね定数 k/2 と並列の 2k の比である。振動数の比はばね定数の比の平方根を取る。",
      "イ": "図Ⅰは直列で合成ばね定数 k/2、図Ⅱは質点を動かすと二つのばねの復元力が加わるため 2k である。振動数は合成ばね定数の平方根に比例するので、f₁/f₂＝√[(k/2)/(2k)]＝1/2 となる。",
      "ウ": "質量は同じだが、ばねが力を伝える経路が異なる。直列の図Ⅰの方が同じ変位に対する復元力が弱い。",
      "エ": "2は f₂/f₁ の値である。設問は、合成ばね定数の小さい図Ⅰを分子にしている。",
      "オ": "4は図Ⅱと図Ⅰの合成ばね定数を並び替えて比べた値である。ここでは f₁/f₂ を求めるため、その逆の比を取り、さらに平方根に直す。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q101.webp"
    ],
    "imageAltTexts": [
      "同じ質量を二本のばねにつないだ二種類の支持方法"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q102",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "摩擦が異なる二物体の連結と張力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、水平面に対して角度 θ（0＜θ＜π/2）の傾きをもつ斜面上を、質量がそれぞれ mₐ、mᵦ である物体 A、B が糸でつながれて滑り降りている。物体 A と斜面との間に摩擦はなく、物体 B と斜面との間の動摩擦係数が μ であるとき、糸の張力として最も妥当なのはどれか。\n\nただし、重力加速度の大きさを g とし、物体 A、B が滑り降りている間、糸の張力は一定であるものとする。",
    "choices": {
      "ア": "[μmₐmᵦ/(mₐ＋mᵦ)]g cos θ",
      "イ": "μ(mₐ＋mᵦ)g cos θ",
      "ウ": "[μ(mₐ＋mᵦ)/(mₐmᵦ)]g cos θ",
      "エ": "[μmᵦ/(mₐ＋mᵦ)]g cos θ",
      "オ": "mₐg sin θ＋μmᵦg cos θ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "二物体を合わせた下向き加速度は g sin θ−μmᵦg cos θ/(mₐ＋mᵦ) である。Aには斜面下向きの重力成分と上向きの張力が働くので、重力成分と mₐ 倍した加速度の差が [μmₐmᵦ/(mₐ＋mᵦ)]g cos θ となる。",
    "choiceExplanations": {
      "ア": "二物体を合わせた下向き加速度は g sin θ−μmᵦg cos θ/(mₐ＋mᵦ) である。Aには斜面下向きの重力成分と上向きの張力が働くので、重力成分と mₐ 倍した加速度の差が [μmₐmᵦ/(mₐ＋mᵦ)]g cos θ となる。",
      "イ": "摩擦力が作用するのは質量 mᵦ のBだけである。張力はこの摩擦力に mₐ/(mₐ＋mᵦ) を掛けた値で、二物体の全質量に摩擦係数を掛ける式とは異なる。",
      "ウ": "(mₐ＋mᵦ)/(mₐmᵦ) は質量の逆数の次元を持つ。力の式には、二物体の連結運動から得られる逆の質量因子 mₐmᵦ/(mₐ＋mᵦ) が入る。",
      "エ": "この式で表される量は、摩擦による加速度の低下分である。張力を求めるには、その低下分にAの質量 mₐ を掛ける。",
      "オ": "Aの重力成分の一部はA自身を加速するため、重力成分をそのまま張力に入れない。連成方程式では mₐg sin θ の項が消え、張力はBの動摩擦に応じて生じる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q102.webp"
    ],
    "imageAltTexts": [
      "斜面上で糸で結ばれた二物体A、Bの位置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q103",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "一様な剛体棒の物理振り子",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "長さ l、質量 m の一様な剛体棒の上端を水平軸につるして振り子を作った。この振り子を微小振動させたときの周期として最も妥当なのはどれか。\n\nただし、重力加速度の大きさを g とし、棒の運動は鉛直面内で行われるものとする。また、空気抵抗及び水平軸まわりの摩擦は無視できるものとする。なお、この剛体棒の重心まわりの慣性モーメントが ml²/12 であることを用いてよい。",
    "choices": {
      "ア": "π√(l/(3g))",
      "イ": "π√(2l/(3g))",
      "ウ": "π√(3l/g)",
      "エ": "2π√(2l/(3g))",
      "オ": "2π√(l/g)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "平行軸の定理より回転軸まわりの慣性モーメントは ml²/3 である。微小角で復元モーメントは −mg(l/2)θ なので、周期は 2π√[(ml²/3)/(mgl/2)]＝2π√(2l/(3g)) となる。",
    "choiceExplanations": {
      "ア": "振り子は重心を軸に回転しないため、慣性モーメント ml²/12 に平行軸の補正 m(l/2)² を加える。周期は上端まわりの慣性モーメントを使って計算する。",
      "イ": "根号内の 2l/(3g) は角振動数の逆二乗として合っている。周期は半往復の π/ω ではなく、一往復の 2π/ω である。",
      "ウ": "慣性モーメントは上端まわりで ml²/3 となり、重力による復元モーメントの腕は l/2 である。この二つを使うと周期の係数は π√3 にならない。",
      "エ": "平行軸の定理より回転軸まわりの慣性モーメントは ml²/3 である。微小角で復元モーメントは −mg(l/2)θ なので、周期は 2π√[(ml²/3)/(mgl/2)]＝2π√(2l/(3g)) となる。",
      "オ": "この値は、長さ l の軽い糸の先に質点を付けた単振り子の周期に当たる。一様な棒では質量が分布し、重心は上端から l/2 の位置にある。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q103.webp"
    ],
    "imageAltTexts": [
      "水平軸Oに上端をつるした長さlの一様な棒"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q104",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "斜面を転がる円板のエネルギー保存",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、粗い斜面に半径 r、質量 m の一様な円板を、重心の高さが h となる位置に静かに置いたところ、円板は斜面を滑らずにゆっくりと転がり始めた。円板が斜面を降りきったときの速度 v として最も妥当なのはどれか。\n\nただし、重力加速度の大きさを g とし、円板の運動は鉛直面内で行われるものとする。また、空気抵抗は無視できるものとする。",
    "choices": {
      "ア": "2√[g(h−r)/7]",
      "イ": "2√[g(h−r)/5]",
      "ウ": "2√[g(h−r)/3]",
      "エ": "√[2g(h−r)]",
      "オ": "2√[g(h−r)]"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "重心は h から r に下がり、回転角速度は v/r となる。mg(h−r)＝mv²/2＋(mr²/2)(v/r)²/2＝3mv²/4 より、v＝2√[g(h−r)/3] を得る。",
    "choiceExplanations": {
      "ア": "この値を並進と回転のエネルギーの和 3mv²/4 に代入すると、位置エネルギーの減少の3/7しか得られない。一様な円板の回転慣性は mr²/2 である。",
      "イ": "この速さでは運動エネルギーが減少した位置エネルギーの3/5しか占めない。滑らない接触点は床に対して瞬間的に静止しており、このモデルで摩擦が残りを散逸させるわけではない。",
      "ウ": "重心は h から r に下がり、回転角速度は v/r となる。mg(h−r)＝mv²/2＋(mr²/2)(v/r)²/2＝3mv²/4 より、v＝2√[g(h−r)/3] を得る。",
      "エ": "この値では位置エネルギーの減少を並進エネルギーだけに変換している。円板では回転エネルギー mv²/4 にも配分される。",
      "オ": "この値を運動エネルギー 3mv²/4 に入れると、位置エネルギーの減少の3倍になる。円板の速度は並進・回転の両方のエネルギーを含む保存式で決まる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q104.webp"
    ],
    "imageAltTexts": [
      "円板の初期の重心高さと斜面を降り終えた状態"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q105",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "機械力学",
    "topicTags": [
      "無推力滑空の最適な揚力係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、一定の速度 V、降下角 γ で無推力定常降下飛行する航空機がある。この航空機には鉛直下向きに重力 W、進行方向に対して垂直上向きに揚力 L、進行方向と逆向きに抗力 D が作用している。揚力及び抗力はそれぞれ、\nL＝(1/2)ρV²SC_L\nD＝(1/2)ρV²S(C_D0＋KC_L²)\nで表すことができる。ここで、ρ は大気密度、S は翼面積、C_L は揚力係数、C_D0 は形状抗力係数、K は翼の縦横比に関係する定数である。このとき、地上到達までの滑空距離 l を最大にする揚力係数として最も妥当なのはどれか。ただし、大気密度は高度によらず一定で、風の影響はないものとする。",
    "choices": {
      "ア": "1",
      "イ": "√(C_D0)/K",
      "ウ": "√[C_D0/(2K)]",
      "エ": "√(C_D0/K)",
      "オ": "√(2C_D0/K)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "定常滑空では水平距離と降下高度の比が L/D に等しい。C_L/(C_D0＋KC_L²) を最大化すると C_D0−KC_L²＝0 となるので、C_L＝√(C_D0/K) である。",
    "choiceExplanations": {
      "ア": "滑空距離は一定の高度差に対して揚抗比 L/D に比例する。最大となる揚力係数が1になるのは、形状抗力係数と K が等しい特別な場合である。",
      "イ": "揚抗比の微分が0となる条件は KC_L²＝C_D0 である。C_L を求める際には K に対しても平方根が必要になる。",
      "ウ": "この値では誘導抗力の係数 KC_L² は C_D0/2 にとどまる。揚抗比が最大になる点では、二つの抗力係数が等しい。",
      "エ": "定常滑空では水平距離と降下高度の比が L/D に等しい。C_L/(C_D0＋KC_L²) を最大化すると C_D0−KC_L²＝0 となるので、C_L＝√(C_D0/K) である。",
      "オ": "形状抗力の2倍まで誘導抗力が大きくなるこの値では、揚抗比はすでに減少している。最大となるのは誘導抗力と形状抗力が等しくなる点である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q105.webp"
    ],
    "imageAltTexts": [
      "降下飛行する航空機に作用する揚力・抗力・重力と滑空距離"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q106",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "熱力学第一法則で求める気体の仕事",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "気体定数0.250 kJ/(kg·K)、温度320 Kの理想気体1.0 kgに仕事を220 kJ、熱を650 kJ加えたところ、外界に対して180 kJの放熱があり、温度は480 Kになった。このとき、この気体が外部にした仕事として最も妥当なのはどれか。ただし、比熱比を1.40とする。",
    "choices": {
      "ア": "90 kJ",
      "イ": "150 kJ",
      "ウ": "330 kJ",
      "エ": "590 kJ",
      "オ": "790 kJ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "cᵥ＝R/(κ−1)＝0.625 kJ/(kg·K) なので、内部エネルギーは1.0×0.625×160＝100 kJ増える。外部への仕事は正味の熱 650−180 と入力仕事220を足して、内部エネルギー増加100を引いた590 kJである。",
    "choiceExplanations": {
      "ア": "内部エネルギー増加は加えたエネルギーの全てではなく、定積比熱と温度差から100 kJと求まる。正味の熱470 kJと入力仕事220 kJの合計からその100 kJを差し引く。",
      "イ": "加えられた220 kJの仕事は、気体へのエネルギー入力である。外部への仕事とは別の項として熱力学第一法則に入れる。",
      "ウ": "外部へ逃げた180 kJは熱移動なので、気体がした仕事の項に含めない。熱と仕事を別々の入出力として整理すると、外部への仕事は330 kJより大きい。",
      "エ": "cᵥ＝R/(κ−1)＝0.625 kJ/(kg·K) なので、内部エネルギーは1.0×0.625×160＝100 kJ増える。外部への仕事は正味の熱 650−180 と入力仕事220を足して、内部エネルギー増加100を引いた590 kJである。",
      "オ": "790 kJは、内部エネルギーの変化100 kJを入力に足した場合の値である。温度が上がってエネルギーが気体に残るため、外部仕事を求めるときは引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q107",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 107,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "断熱自由膨張のエネルギーとエントロピー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、閉じられたコックでつながれた二つの断熱容器がある。容器 A 内には理想気体が封入されており、容器 B 内は真空である。ここで、コックを開き、十分に時間が経過し平衡状態となった。この過程に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 気体は外部へ仕事を行わず、熱の出入りもないため、内部エネルギーは変化しない。\n㋑ この過程で気体の体積は膨張し、気体の温度は変化しないため、理想気体の内部エネルギーは体積のみの関数であることが分かる。\n㋒ この過程は断熱過程であることから、エントロピーは変化しない。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "外側の容器は固定され、真空への膨張で外部へ仕事をせず、断熱なので熱も出入りしない。第一法則から内部エネルギーは一定となる。",
    "choiceExplanations": {
      "ア": "外側の容器は固定され、真空への膨張で外部へ仕事をせず、断熱なので熱も出入りしない。第一法則から内部エネルギーは一定となる。",
      "イ": "㋐のエネルギー保存は正しい。理想気体の内部エネルギーは温度だけの関数で、体積が変わっても温度一定なら変化しない。",
      "ウ": "㋐は妥当だが、自由膨張は不可逆過程である。熱によるエントロピーの移動がなくても、内部でエントロピーが生成する。",
      "エ": "体積が増加しても理想気体の内部エネルギーは一定である。このことは、内部エネルギーが体積にのみ依存するという㋑の説明を支持しない。",
      "オ": "断熱なら外部との熱交換が0になる。エントロピーが一定になるのは断熱で可逆の場合であり、真空への自由膨張では増加する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 107。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q107.webp"
    ],
    "imageAltTexts": [
      "コックでつながれた断熱容器Aの理想気体と容器Bの真空"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q108",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 108,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "圧力と比体積で表す理想気体の比エントロピー",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "理想気体が、圧力 p₁、比体積 v₁ の状態①から圧力 p₂、比体積 v₂ の状態②へ可逆的に変化する。このとき、比エントロピーの変化量として最も妥当なのはどれか。ただし、理想気体の定圧比熱を cₚ、定積比熱を cᵥ とする。",
    "choices": {
      "ア": "cₚ ln(p₂/p₁)−cᵥ ln(v₂/v₁)",
      "イ": "cₚ ln(p₂/p₁)＋cᵥ ln(v₂/v₁)",
      "ウ": "(cₚ−cᵥ)[ln(v₂/v₁)＋ln(p₂/p₁)]",
      "エ": "cₚ ln(v₂/v₁)−cᵥ ln(p₂/p₁)",
      "オ": "cₚ ln(v₂/v₁)＋cᵥ ln(p₂/p₁)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "理想気体では Δs＝cᵥ ln(T₂/T₁)＋R ln(v₂/v₁) である。T₂/T₁＝(p₂/p₁)(v₂/v₁) と cₚ＝cᵥ＋R を用いると、圧力の対数に cᵥ、比体積の対数に cₚ が掛かる。",
    "choiceExplanations": {
      "ア": "圧力一定なら温度は比体積に比例し、エントロピー変化は cₚ ln(v₂/v₁) になる。この式は圧力一定で −cᵥ ln(v₂/v₁) となり、符号と係数が合わない。",
      "イ": "定積変化の場合、圧力に比例する温度の対数比に掛ける係数は cᵥ である。この式は圧力の項と体積の項に対応する比熱を取り違えている。",
      "ウ": "cₚ−cᵥ＝R を二つの対数に同じように掛けると、温度比に R を掛けた式になる。比エントロピーには、温度の変化と体積の変化の両方を適切な係数で入れる必要がある。",
      "エ": "圧力一定での体積の項は正しい。一方で比体積一定の加熱では圧力が増え、比エントロピーも cᵥ ln(p₂/p₁) だけ増える。",
      "オ": "理想気体では Δs＝cᵥ ln(T₂/T₁)＋R ln(v₂/v₁) である。T₂/T₁＝(p₂/p₁)(v₂/v₁) と cₚ＝cᵥ＋R を用いると、圧力の対数に cᵥ、比体積の対数に cₚ が掛かる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 108。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q109",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 109,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "カルノー効率と断熱膨張後の圧力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "カルノーサイクルに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「低温熱源の温度を300 Kとしたカルノーサイクルの理論熱効率を40.0％にするには、高温熱源の温度を【㋐】Kにする必要がある。このカルノーサイクルにおける理想気体の圧力は断熱膨張によって【㋑】倍になる。なお、理想気体の断熱変化では、理想気体の圧力を p、比体積を v として、pv^κ＝（一定）の関係が成り立ち、κ＝1.5とする。」",
    "choices": {
      "ア": "500、0.216",
      "イ": "500、0.843",
      "ウ": "750、0.064",
      "エ": "750、0.632",
      "オ": "750、0.737"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "効率 1−300/T_H＝0.4 より高温熱源は500 Kとなる。断熱式と状態方程式から圧力比は (300/500)^[κ/(κ−1)]＝0.6³＝0.216 である。",
    "choiceExplanations": {
      "ア": "効率 1−300/T_H＝0.4 より高温熱源は500 Kとなる。断熱式と状態方程式から圧力比は (300/500)^[κ/(κ−1)]＝0.6³＝0.216 である。",
      "イ": "高温熱源の温度は500 Kで合う。膨張後と膨張前の比を取ると、断熱の圧力比は温度比0.6の三乗になる。",
      "ウ": "750 Kでは効率が 1−300/750＝0.6 となる。0.064は、この誤った温度での温度比0.4を三乗した値である。",
      "エ": "効率40％では、低温と高温の温度比は0.6である。750 Kはその条件を満たさず、圧力比も温度比の三乗で0.216となる。",
      "オ": "高温熱源の温度は 300/(1−0.4) から求める。膨張での圧力変化には温度比を三乗するので0.737にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 109。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q110",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 110,
    "type": "multiple-choice",
    "category": "熱力学・熱機関［機械系］",
    "topicTags": [
      "厚肉円筒の定常熱伝導",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "熱伝導に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図のように、内半径 r₁、外半径 r₂、長さ L で、熱伝導率が λ の均質な厚肉円筒がある。この円筒の内側から外側への定常熱伝導を考える。r＝r₁ の面における温度は T₁ で、r＝r₂ の面における温度は T₂（T₂＜T₁）で一定に保たれ、長さ方向の両端面は断熱されている。円筒の中心軸から半径 r の仮想円筒面における温度を T とし、単位時間当たりに仮想円筒面を伝わる熱量を Q̇ とすると、Q̇＝【㋐】×2πrL の関係が成り立ち、これを解くと Q̇＝【㋑】となる。」",
    "choices": {
      "ア": "λ dT/dr、2πλL(T₁−T₂)/ln(r₂/r₁)",
      "イ": "λ dT/dr、2πλL(T₂−T₁)/ln(r₂/r₁)",
      "ウ": "λ dT/dr、2πλL(T₁−T₂)/ln(r₂−r₁)",
      "エ": "−λ dT/dr、2πλL(T₁−T₂)/ln(r₂/r₁)",
      "オ": "−λ dT/dr、2πλL(T₂−T₁)/ln(r₂−r₁)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "外向き熱流束は −λ dT/dr であり、円筒面積を掛けると Q̇＝−2πrLλ dT/dr となる。この一定の Q̇ を用いて積分すると、Q̇＝2πλL(T₁−T₂)/ln(r₂/r₁) である。",
    "choiceExplanations": {
      "ア": "熱の流れる外向きを正にすると、外側ほど低温なので dT/dr は負である。正の熱流束を得るフーリエの法則には、熱伝導率の前に負号が付く。",
      "イ": "この組合せは、外向きに流れる熱を負にしてしまう。温度が低下する方向への伝導を外向きの正の流れとして扱う。",
      "ウ": "半径 r に比例して伝熱面積が増えるので、半径方向の積分は ∫dr/r＝ln(r₂/r₁) になる。半径差そのものの対数は、この積分から得られない。",
      "エ": "外向き熱流束は −λ dT/dr であり、円筒面積を掛けると Q̇＝−2πrLλ dT/dr となる。この一定の Q̇ を用いて積分すると、Q̇＝2πλL(T₁−T₂)/ln(r₂/r₁) である。",
      "オ": "㋐はフーリエの法則の向きに合う。外向きの熱量は正であり、半径についての積分の分母は半径差ではなく半径比の対数である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 110。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q110.webp"
    ],
    "imageAltTexts": [
      "厚肉円筒の内外半径・長さと温度、仮想円筒面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q111",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 111,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "土木計画の多目的性と国土形成計画",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の土木計画に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 土木計画において、計画の目的を一つに定めることは容易ではなく、複数の目的間で一方を満足させるために他方を犠牲にしなければならないトレードオフの関係が発生することがある。\n㋑ 国土形成計画は、全国計画と広域地方計画で構成されており、全国計画の案の作成に当たっては、都道府県及び指定都市の意見を聴くことを省略することができる。\n㋒ PFIとは、計画策定段階で幅広く市民の意見を聴く機会を設けて、計画の内容への反映を行うことである。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "事業の利便性を高める案が費用や環境面の負担を増す場合など、複数の目標を同時に満たせないことがある。計画では、そうしたトレードオフを明示し、案を比較する。",
    "choiceExplanations": {
      "ア": "事業の利便性を高める案が費用や環境面の負担を増す場合など、複数の目標を同時に満たせないことがある。計画では、そうしたトレードオフを明示し、案を比較する。",
      "イ": "目的間のトレードオフを述べる㋐は妥当である。全国計画の案を作る際には、関係する都道府県や指定都市の意見を聴く手続がある。",
      "ウ": "国土形成計画は全国計画と広域地方計画から構成される。全国計画案の作成に当たって、都道府県と指定都市の意見聴取を省略できるという部分が誤りである。",
      "エ": "全国計画案には法定の意見聴取が必要である。また、PFIは民間の資金や経営・技術能力を公共施設の整備・運営等に活用する手法である。",
      "オ": "計画策定に市民の意見を取り入れる方法としては、パブリック・インボルブメントがある。PFIの目的は、公共事業に民間の資金やノウハウを活用することである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 111。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q112",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 112,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "道路の機能・交差点の車線・交通容量",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の都市交通に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 道路の機能は、通行サービスを提供するトラフィック機能と出入サービスを提供するアクセス機能の二つに大別される。\n㋑ 交差点流出部の車線数は、原則として、流入部の直進車線数（流入部の全車線数から右折専用車線、左折専用車線を除いた数）と同一又はそれ以上でなければならない。\n㋒ 基本交通容量は、車線の幅員が交通容量に影響を及ぼさない3.5 m以上であることなど、理想的な条件下での道路の交通処理能力である。\n\n㋓ パーソントリップ調査において、一つのトリップが複数の交通手段で成り立っている場合、代表交通手段を決定する際の優先順位は、一般的に鉄道、自動車、バス、二輪車、徒歩の順である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "交差点の流出側では、通過した直進車を受け入れる車線を確保する。基本交通容量は、車線の幅員などの制約がない理想的条件で見積もる処理能力である。",
    "choiceExplanations": {
      "ア": "直進車が流出側で絞られないようにする㋑は妥当である。道路には通行・沿道アクセスに加え、都市の空間や施設の収容を担う空間機能もある。",
      "イ": "基本交通容量は道路の理想的な条件で定める。㋐は通行と出入の機能だけで道路の機能全体を説明しており、空間機能を含まない。",
      "ウ": "交差点の流出側では、通過した直進車を受け入れる車線を確保する。基本交通容量は、車線の幅員などの制約がない理想的条件で見積もる処理能力である。",
      "エ": "㋑の車線数の条件は妥当である。パーソントリップ調査で代表手段を選ぶ標準的な順位では、鉄道の次にバスを置き、自動車はその後である。",
      "オ": "理想条件を基にする㋒は正しい。代表交通手段の優先順位は一般に鉄道、バス、自動車、二輪車、徒歩の順である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 112。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q113",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 113,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "都市計画決定と市街化区域",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の都市計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 組合施行による土地区画整理事業を都市計画決定せずに施行する場合、関係権利者全員の同意が必要となる。\n\n㋑ 組合施行により市街地再開発事業を施行する場合には、全ての事業で都市計画決定が必要となる。\n\n㋒ 市街化区域は、既に市街地を形成している区域及びおおむね10年以内に優先的かつ計画的に市街化を図るべき区域とされている。\n\n㋓ 都市計画は、都道府県又は市町村が定めることとされているが、2以上の都府県の区域に係る都市計画を定めることはできない。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "組合が施行する市街地再開発事業では施行区域の都市計画決定が必要である。市街化区域には既成市街地と、おおむね10年以内に計画的に市街化を進める区域を指定する。",
    "choiceExplanations": {
      "ア": "組合による土地区画整理では、所有者・借地権者の人数及び一定の地積について法定の同意割合を満たす。都市計画決定を伴わない場合に常に全員同意を要するという制度ではない。",
      "イ": "市街化区域についての㋒は妥当である。組合設立に必要な同意は、法律が定める一定の割合を基準に判断する。",
      "ウ": "組合が施行する市街地再開発事業では施行区域の都市計画決定が必要である。市街化区域には既成市街地と、おおむね10年以内に計画的に市街化を進める区域を指定する。",
      "エ": "㋑は妥当である。都市計画には複数の都府県にまたがる区域を扱う手続もあり、行政境界で計画の内容を一律に限る仕組みではない。",
      "オ": "市街化区域の説明は正しい。2以上の都府県にまたがる区域に関する都市計画も、関係機関の手続によって定めることができる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 113。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q114",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 114,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "河川計画、流出係数とダムの事前放流",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の河川計画及び河川管理施設に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 計画高水位は、堤防等の河川構造物を計画、設計する際の基本となる水位であり、河川の主要な地点における計画高水位は河川整備計画において定められる。\n\n㋑ 河川堤防の決壊の要因としては、「浸透」が最も多く、河川堤防の浸透対策として、堤防の表法面の被覆工や、裏法尻へのドレーン工が実施される。\n\n㋒ 流出係数は、降雨量に対する、地下浸透や蒸発せずに河川等へ流出する雨水量の比率であり、一般に、宅地とゴルフ場では宅地の方が流出係数は大きい。\n\n㋓ 台風の接近などにより大雨となることが見込まれる場合は、多目的ダム・利水ダムにおいて「事前放流」を実施しており、水力発電、農業用水、水道等のために確保されている利水容量についても洪水調節に一部活用することができる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "舗装や建物の多い宅地では、芝地等の多いゴルフ場より降雨が流出しやすい。ダムでは大雨の前に水位を下げることで、利水容量の一部を洪水調節に充てられる。",
    "choiceExplanations": {
      "ア": "主要地点の計画高水位は河川整備基本方針に含まれる。堤防の決壊は越水が多く、浸透が最多とする㋑も適切でない。",
      "イ": "宅地の不浸透面によって流出係数が大きくなるという㋒は妥当である。主要地点の計画高水位を定めるのは河川整備基本方針である。",
      "ウ": "事前放流で利水容量の一部を活用する㋓は正しい。㋐は河川整備基本方針に示す内容を河川整備計画に割り当てている。",
      "エ": "被覆工やドレーン工は堤防への浸透に対する工法である。ただし、決壊の原因のうち浸透が最も多いという説明は当たらず、㋑は含められない。",
      "オ": "舗装や建物の多い宅地では、芝地等の多いゴルフ場より降雨が流出しやすい。ダムでは大雨の前に水位を下げることで、利水容量の一部を洪水調節に充てられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 114。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q115",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 115,
    "type": "multiple-choice",
    "category": "土木計画",
    "topicTags": [
      "潮汐、うねり、津波の伝わり方",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "海における様々な周期の波に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 潮汐は、地球に対する月及び太陽の引力と地球の公転による慣性力との差によって生じており、満月では潮位差が最も大きくなり、新月では潮位差が最も小さくなる。\n\n㋑ うねりは、風波を発達させていた風域を離脱した波のことである。風からのエネルギー供給が無くなることで、周期の短い波は急速に減衰し、波高は減少する。\n\n㋒ 津波は、沖から岸に向かって水深が浅くなるにつれて、波高は高くなり、波速は速くなる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "発生域を離れた風波は、風から十分なエネルギーを受けなくなる。短い周期の成分が減衰しやすく、遠くへ進む波には比較的長い周期のうねりが残る。",
    "choiceExplanations": {
      "ア": "新月と満月の頃はいずれも太陽と月の潮汐効果が重なり、大潮になる。潮位差が小さくなる小潮は上弦と下弦の頃に起こる。",
      "イ": "新月も満月も潮位差が大きくなる。また、浅水域の津波の伝播速度は水深の平方根におおむね比例するので、岸に近く水深が浅いほど遅い。",
      "ウ": "発生域を離れた風波は、風から十分なエネルギーを受けなくなる。短い周期の成分が減衰しやすく、遠くへ進む波には比較的長い周期のうねりが残る。",
      "エ": "うねりを説明する㋑は妥当である。津波は水深が浅くなると波高が増す場合がある一方、波速は低下する。",
      "オ": "津波の波高が浅海で増すことと、波速が増すことは別である。水深 h の浅水波の速さはおおむね √(gh) なので、浅くなるほど遅い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 115。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q116",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 116,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "色の面積効果・誘目性・視感度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "色彩に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 同じ色であっても、面積が小さいほど明度・彩度が高く見える効果を面積効果という。一般に、施工後の壁面の色は、色見本で見るよりも明度・彩度共に低く見える。\n\n㋑ 目を引きやすいかどうかという特性を誘目性という。一般に、低彩度色は誘目性が高い。また、色光の誘目性は、一般に、色相においては赤が最も高い。\n\n㋒ 明所視と暗所視における視感度の違いによって、暗い場所では赤が暗く、青が明るく見える。\n\n㋓ 彩度の高い色を背景として彩度の低い色を見ると、一般に、彩度の低い色は濁って見える。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "暗所視では短波長側への相対感度が高まり、青が赤より相対的に明るく見える。彩度対比では、高彩度色に囲まれた低彩度色はよりくすんで見える。",
    "choiceExplanations": {
      "ア": "広い面では小さな色見本より明るく鮮やかに見えることがあり、㋐は効果の方向を逆にしている。また、色の鮮やかさは誘目性を高める要因になり得る。",
      "イ": "暗いときの視感度についての㋒は正しい。面積効果では、一般に小さな見本より大きな面に塗った方が色が明るく鮮やかに見える。",
      "ウ": "彩度が高い色は、周囲との対比により目を引きやすい。暗所で視感度が短波長側に移るという㋒は妥当である。",
      "エ": "㋓のような見え方は、色の対比によって生じ得る。低彩度の色が一般に高い誘目性を持つとする㋑は適切でない。",
      "オ": "暗所視では短波長側への相対感度が高まり、青が赤より相対的に明るく見える。彩度対比では、高彩度色に囲まれた低彩度色はよりくすんで見える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 116。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q117",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 117,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "給排水設備の水撃とトラップ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "給排水衛生設備に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ ウォーターハンマーとは、水栓などの急激な閉止により、配管を叩くような騒音や振動を生じる現象のことである。\n\n㋑ 上水系統と雑用水系統とを別系統とすることにより、雑用水系統の受水槽は、鉄筋コンクリート造の床下ピットを利用することができる。\n\n㋒ 厨房排水において、グリース阻集器に設けられたトラップは油脂により機能が保てなくなる可能性があるため、一般に、臭気防止用のUトラップを併設する。\n\n㋓ 排水トラップの封水深は、排水管内の臭気、衛生害虫等の移動を防止するため、一般に、100 mm以上200 mm以下とする。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "流水を急停止すると圧力波が発生し、配管で騒音や振動が生じる。上水から系統を分離した雑用水の貯留には、所要の衛生・維持管理条件を満たす床下ピットを利用できる。",
    "choiceExplanations": {
      "ア": "流水を急停止すると圧力波が発生し、配管で騒音や振動が生じる。上水から系統を分離した雑用水の貯留には、所要の衛生・維持管理条件を満たす床下ピットを利用できる。",
      "イ": "水撃現象の説明は正しい。阻集器にトラップ機能がある配管に別のトラップを直列に加えると、空気や排水の流れを妨げることがある。",
      "ウ": "㋑のように独立した雑用水系統では、飲料水とは異なる貯留方法を採れる。グリース阻集器に臭気防止のトラップが備わる場合、一般に二重トラップは避ける。",
      "エ": "雑用水の受水槽に関する㋑は妥当である。排水トラップの一般的な封水深は50～100 mm程度であり、100～200 mmではない。",
      "オ": "グリース阻集器のトラップと別のトラップを直列に入れると排水に支障が出ることがある。一般的な排水トラップの封水深は、選択肢に挙げる範囲より浅い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 117。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q118",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 118,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "建築面積と避難階の法令上の扱い",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "建築基準法及び建築基準法施行令に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 建築物に附属する、土地に定着する門や塀は、「建築物」に含まれない。\n\n㋑ 国土交通大臣が高い開放性を有すると認めて指定する構造の建築物又はその部分において、当該建築物又はその部分の端から水平距離1 m以内の部分の水平投影面積は、当該建築物の建築面積に算入しない。\n\n㋒ 防火壁の屋上突出部は、当該建築物の高さに算入される。\n\n㋓ 避難階とは、直接地上へ通ずる出入口のある階をいい、敷地に高低差がある場合は、建築物の避難階が複数となることがある。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "施行令は大臣指定の開放性が高い部分について、端から水平距離1 m以内を建築面積に算入しないと定める。避難階は直接地上へ出られる階で、傾斜地などでは複数設けられる。",
    "choiceExplanations": {
      "ア": "開放性の高い構造についての㋑は妥当である。建築基準法の建築物の定義には、建築物に付属する門や塀が含まれる。",
      "イ": "付属する門や塀は、土地に定着していれば建築物の定義に含まれる。また、壁の屋上突出部は施行令の高さの算定で除かれる。",
      "ウ": "高い開放性を有する構造の端から1 m以内を面積に含めない㋑は正しい。防火壁の屋上突出部は高さの算定に算入しない。",
      "エ": "施行令は大臣指定の開放性が高い部分について、端から水平距離1 m以内を建築面積に算入しないと定める。避難階は直接地上へ出られる階で、傾斜地などでは複数設けられる。",
      "オ": "敷地に高低差があれば、複数の階に地上への直接の出入口を設けられる。防火壁の屋上突出部を高さに含めるという㋒は合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 118。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q119",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 119,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "ホテルの客室・直通階段・用途地域",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "ホテルの建築計画に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ ビジネスホテルにおけるシングルルームを8 m²、ツインルームを16 m²の広さとした。\n\n㋑ 延べ面積に対する客室部分の床面積の合計の割合は、一般に、ビジネスホテルよりシティホテルの方が大きい。\n\n㋒ 建築基準法上、1階が避難階であり、3階の宿泊室の床面積の合計が300 m²である3階建てのホテルを計画する際には、避難のための直通階段を二つ以上設置しなければならない。\n\n㋓ 第二種住居地域において延べ面積1,000 m²のホテルを計画した。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "避難階でない3階に合計300 m²の宿泊室があるので、直通階段を二つ以上設ける必要がある。第二種住居地域では、延べ面積1,000 m²のホテルを計画できる。",
    "choiceExplanations": {
      "ア": "洋式の寝台を置くホテル客室の最低床面積は、旅館業法施行令で9 m²であり、8 m²では足りない。㋑も、シティホテルは宴会場や飲食施設などに多くの面積を使うことを見落としている。",
      "イ": "第二種住居地域に延べ面積1,000 m²のホテルを計画することは可能である。一方、シングルルームを8 m²とする㋐は、寝台を置く客室の最低床面積を下回る。",
      "ウ": "3階からの直通階段の条件を述べた㋒は妥当である。一般に客室以外の用途面積の割合が大きいのは、宴会場などを備えるシティホテルである。",
      "エ": "用途地域に関する㋓は正しい。ビジネスホテルは客室を中心にした施設構成が多く、客室部分の割合をシティホテルより小さいとは一般化できない。",
      "オ": "避難階でない3階に合計300 m²の宿泊室があるので、直通階段を二つ以上設ける必要がある。第二種住居地域では、延べ面積1,000 m²のホテルを計画できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 119。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q120",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 120,
    "type": "multiple-choice",
    "category": "建築計画・建築法規・建築設備",
    "topicTags": [
      "方位による日射とタスク・アンビエント照明",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "採光・照明に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 我が国においては、北向き鉛直面は直達日射を受けない。\n\n㋑ タスク・アンビエント照明では、一般に、アンビエント照度をタスク照度の10分の1以上確保することが望ましい。\n\n㋒ 窓面における日照・日射の調整のために設けるルーバーは、一般に、南向き窓面には水平のものが、西向き窓面には垂直のものが有効である。\n\n㋓ 設計用全天空照度は、「快晴の青空の日」より「薄曇りの日」の方が小さな値となる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "作業面の明るさに合わせて周囲にも一定の照度を確保すると、視野内の強い明暗差を抑えられる。南面の高い太陽には水平ルーバー、西面の低い斜めの日射には垂直ルーバーが役立つ。",
    "choiceExplanations": {
      "ア": "周辺と作業面の明るさに極端な差を作らないという㋑は妥当である。北向きの壁も、夏の早朝や夕方には北寄りからの直達日射を受けることがある。",
      "イ": "夏には日の出・日没の方位が北寄りになり、北向き鉛直面でも直達日射を受け得る。薄曇りでは雲が光を散乱するため、全天空照度を快晴の青空より小さいとはいえない。",
      "ウ": "作業面の明るさに合わせて周囲にも一定の照度を確保すると、視野内の強い明暗差を抑えられる。南面の高い太陽には水平ルーバー、西面の低い斜めの日射には垂直ルーバーが役立つ。",
      "エ": "アンビエント照度を確保する㋑は妥当である。設計でいう全天空照度は直達日射分を含まないため、雲による散乱で薄曇りの天空の方が明るいことがある。",
      "オ": "方位に応じてルーバーの向きを変える㋒は正しい。全天空照度は天空全体からの光を扱うので、青空の日の直達日射が強いことを理由に㋓を選べない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 120。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q121",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 121,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "山本理顕が設計した公共建築",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "次の㋐～㋓の建築物のうち、「地域社会圏」の発想をもち、2024年にプリツカー賞を受けた山本理顕氏が設計したものとして妥当なもののみを挙げているのはどれか。\n\n㋐ 「無限発展の美術館」というコンセプトを踏襲した神奈川県立近代美術館\n㋑ 「互いが見える」キャンパスを意識した公立はこだて未来大学\n㋒ 「職・住・学・遊」の集積が進んだ幕張新都心にある複合コンベンション施設の幕張メッセ\n㋓ ガラスで仕切られた空間で構成された外観が特徴の広島市西消防署",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "山本理顕は、学ぶ人の活動が見える公立はこだて未来大学と、ガラスを用いた広島市西消防署を設計した。いずれも、施設内部の活動を空間のつくり方によって周囲と結び付けている。",
    "choiceExplanations": {
      "ア": "公立はこだて未来大学は山本の設計で、開放的な学習空間を設けている。神奈川県立近代美術館の旧鎌倉館の設計は坂倉準三である。",
      "イ": "広島市西消防署は山本の設計で、活動の様子と市街地を視覚的につなぐ空間を備える。神奈川県立近代美術館の旧鎌倉館は坂倉の設計である。",
      "ウ": "公立はこだて未来大学は山本理顕の作品である。幕張メッセの主要施設は槇文彦の設計である。",
      "エ": "山本理顕は、学ぶ人の活動が見える公立はこだて未来大学と、ガラスを用いた広島市西消防署を設計した。いずれも、施設内部の活動を空間のつくり方によって周囲と結び付けている。",
      "オ": "消防署は山本の作品である。幕張メッセの設計には槇文彦が関わり、山本が設計したものは㋑と㋓である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 121。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q122",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 122,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "管理不全空家等と住宅セーフティネット",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国における住宅行政に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 「空家等対策の推進に関する特別措置法」に基づく管理不全空家等とは、適切な管理が行われていないことにより、そのまま放置すれば特定空家等（注）に該当するおそれがあると市町村長が認める空家等を指す。\n\n㋑ 「建築物のエネルギー消費性能の向上等に関する法律」に基づき、令和6年4月から住宅・建築物を販売・賃貸する事業者、不動産仲介事業者を対象に、住宅・建築物の省エネ性能ラベルの表示が義務付けられている。\n\n㋒ 応急仮設住宅は、期間を定めて被災者に供与されるもので、新たに建設して提供されるものである。そのため、民間賃貸住宅や空き家を応急仮設住宅として活用することはできない。\n\n㋓ 住宅セーフティネット制度では、低額所得者、高齢者、障害者、子育て世帯等の住宅の確保に配慮が必要な者向けの民間賃貸住宅を対象に、改修費や家賃の補助等による支援を実施している。\n\n（注）特定空家等とは、「そのまま放置すれば倒壊等著しく保安上危険となるおそれのある状態又は著しく衛生上有害となるおそれのある状態、適切な管理が行われていないことにより著しく景観を損なっている状態その他周辺の生活環境の保全を図るために放置することが不適切である状態にあると認められる空家等」を指す。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "空家の管理不全を把握して特定空家等になることを防ぐ仕組みと、住宅確保要配慮者の入居を支える制度を正しく述べている。住宅セーフティネットでは、制度の要件に応じて賃貸住宅への改修費補助や家賃低廉化の支援が行われる。",
    "choiceExplanations": {
      "ア": "管理不全空家等は、放置により特定空家等になるおそれがある段階の空家等である。応急仮設住宅には、民間の賃貸住宅等を活用する賃貸型もある。",
      "イ": "空家の管理不全を把握して特定空家等になることを防ぐ仕組みと、住宅確保要配慮者の入居を支える制度を正しく述べている。住宅セーフティネットでは、制度の要件に応じて賃貸住宅への改修費補助や家賃低廉化の支援が行われる。",
      "ウ": "省エネ性能表示は、2024年4月の制度開始時点では販売・賃貸事業者に対する努力義務として導入された。応急仮設住宅は、新設する建設型と既存住宅を活用する賃貸型がある。",
      "エ": "改修費や家賃等の支援を述べる㋓は妥当である。新築建築物の広告などで用いる省エネ性能表示は、販売・賃貸事業者が努めることとされた。",
      "オ": "住宅確保要配慮者向けの住宅を支援する㋓は正しい。㋒は既存の民間賃貸住宅を借り上げて被災者に供与できることを見落としている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 122。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q123",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 123,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "景観行政団体・盛土規制・スマートシティ",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国における都市行政に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 「景観法」に基づき景観計画を定めることができる景観行政団体は、都道府県、政令指定都市、中核市であり、その他の市町村は景観行政団体となって景観計画を定めることはできない。\n\n㋑ 「宅地造成及び特定盛土等規制法」により、規制区域内で盛土等を行う場合は、あらかじめ都道府県及び市町村の許可が必要となるが、許可が必要な行為には、一定規模以上の土砂のストックヤードにおける仮置きが含まれる。\n\n㋒ スマートシティとは、都市や地域の抱える諸課題の解決等を目指して、ICT等の新技術や官民各種のデータを有効に活用した各種分野におけるマネジメントが行われ、社会、経済、環境の側面から、現在及び将来にわたって、人々により良いサービスや生活の質を提供する都市又は地域のことで、現在、これを推進する様々な施策が各地で行われている。\n\n㋓ 「都市再生特別措置法」に基づき、市町村は「居心地が良く歩きたくなる」まちなかの創出を目指す区域として、滞在快適性等向上区域（まちなかウォーカブル区域）を都市計画区域の全域において定めることができる。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "盛土規制では、規制区域内で所定規模の土石を仮置きする行為も許可の対象となり得る。スマートシティは、技術やデータを使って都市・地域のサービスや生活の質を向上させる取組である。",
    "choiceExplanations": {
      "ア": "ICTやデータで都市課題に対応する㋒は妥当である。政令指定都市と中核市以外の市町村も、都道府県知事との協議・同意により景観行政団体になれる。",
      "イ": "その他の市町村にも景観行政団体になる手続がある。滞在快適性等向上区域は都市再生整備計画の区域内で定められる。",
      "ウ": "盛土規制では、規制区域内で所定規模の土石を仮置きする行為も許可の対象となり得る。スマートシティは、技術やデータを使って都市・地域のサービスや生活の質を向上させる取組である。",
      "エ": "一定の土砂の堆積を含む㋑は妥当である。滞在快適性等向上区域は歩行者の回遊や滞在の改善を図る場所を計画で定めるもので、都市計画区域の全域に一般的に指定できるわけではない。",
      "オ": "都市にデータを生かす㋒は正しい。ウォーカブル区域を指定するには、都市再生整備計画の区域との関係などの法定条件がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 123。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q124",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 124,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "地区計画と総合設計制度",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国のまちづくりに係る規制誘導制度に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 都市再生特別地区は、都市再生緊急整備地域において、都市の再生に貢献し、土地の合理的かつ健全な高度利用を図ることを目的として、都市計画に定めるものである。\n\n㋑ 地区計画は、一体としてそれぞれの区域の特性にふさわしい態様を備えた良好な環境の各街区を整備し、開発し、及び保全することを目的として、都市計画に定めるものである。\n\n㋒ 高度地区は、用途地域内の土地の高度利用と都市機能の更新を図ることを目的として、都市計画に定めるものであり、市街地再開発事業の区域要件の一つとなっている。\n\n㋓ 総合設計制度は、市街地の環境の整備改善を図ることを目的として、市町村の建築主事の有無によらず都道府県が交通上、安全上、防火上及び衛生上支障がなく、かつ、建築計画について総合的な配慮がなされていると許可した場合、容積率や高さを緩和する制度である。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "都市再生特別地区は、都市再生緊急整備地域の土地の高度利用を図る制度である。地区計画は街区の特性にふさわしい良好な環境の形成・維持のために定める。",
    "choiceExplanations": {
      "ア": "都市再生特別地区は、都市再生緊急整備地域の土地の高度利用を図る制度である。地区計画は街区の特性にふさわしい良好な環境の形成・維持のために定める。",
      "イ": "都市再生特別地区の説明は妥当である。㋒は高度利用地区の土地利用・都市機能の説明であり、高さの最高限度や最低限度を定める高度地区と区別する。",
      "ウ": "地区に合った環境を整える㋑は正しい。高度地区は建築物の高さを誘導する制度で、用途地域内で土地の高度利用と都市機能の更新を図るのは高度利用地区である。",
      "エ": "地区計画の目的を述べた㋑は妥当である。総合設計の許可をするのは特定行政庁で、建築主事を置く市町村などにもその権限がある。",
      "オ": "高さの限度を指定する高度地区と、土地の高度利用を図る高度利用地区を区別する。総合設計制度の許可権限は、建築主事の有無にかかわらず都道府県だけにあるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 124。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q125",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 125,
    "type": "multiple-choice",
    "category": "建築史・都市計画",
    "topicTags": [
      "市街化調整区域と大ロンドン計画",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "都市計画や都市デザインの理論・制度に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 市街化調整区域は、都市計画区域の一つで、市街化を抑制すべき区域である。市街化調整区域内の開発行為は原則的に禁止され、地方公共団体による公共投資も市街化区域と比較すると抑制される。\n\n㋑ 風致地区は、都市環境の保全を図る区域であり、建築行為などを行う際は地方公共団体が定める条例の基準に基づいて、あらかじめ届け出なければならない。\n\n㋒ パトリック・アバークロンビーによって1944年に作成された大ロンドン計画は、緑地帯を設けてそこでの開発を禁止するなどにより都市の密度の適正化を企図し、我が国における首都圏整備計画に影響を与えた。\n\n㋓ 復興計画において、第一段階として施行区域、道路等をまず都市計画決定し、その後に、地区ごとに街区道路等を都市計画決定する二段階都市計画の手法が東日本大震災から使われた。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "市街化調整区域は、都市計画区域を線引きした際に市街化を抑制する区域であり、開発が制限される。大ロンドン計画はグリーンベルト等で都市の広がりを抑える考え方を示し、日本の首都圏整備にも影響した。",
    "choiceExplanations": {
      "ア": "市街化調整区域で市街化を抑えるという㋐は妥当である。風致地区内の一定の建築行為等には、条例に基づく事前の許可が必要になる。",
      "イ": "市街化調整区域は、都市計画区域を線引きした際に市街化を抑制する区域であり、開発が制限される。大ロンドン計画はグリーンベルト等で都市の広がりを抑える考え方を示し、日本の首都圏整備にも影響した。",
      "ウ": "大ロンドン計画に関する㋒は妥当である。風致地区では、条例に沿うかを確認する事前の許可手続が用いられる。",
      "エ": "風致地区の規制は事前の届出だけを求めるものではない。また、復興での二段階都市計画は阪神・淡路大震災後にも使われた。",
      "オ": "大ロンドン計画の緑地帯は都市の外への無秩序な拡大を抑える狙いがあった。二段階都市計画の活用は東日本大震災より前にも例がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 125。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q126",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 126,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "周期ポテンシャル中のブロッホ波とバンド境界",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属結晶中の自由電子に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「金属原子は結晶を構成すると、伝導電子を放出してイオンとなり、伝導電子はイオンによる周期的ポテンシャル中を運動する自由電子として進行波になる。この進行波の位相は、【㋐】で記述され、ポテンシャルの周期性を反映する。【㋑】の境界では、位相が【㋒】の条件を満たし、進行波とイオンに反射された反射波が重なって定在波となり、自由電子の伝導が禁制される。」",
    "choices": {
      "ア": "ブロッホの定理、ブリルアンゾーン、ブラッグ散乱",
      "イ": "ブロッホの定理、ブリルアンゾーン、不確定性原理",
      "ウ": "ブロッホの定理、フェルミ波数、不確定性原理",
      "エ": "ド・ブロイの関係、ブリルアンゾーン、ブラッグ散乱",
      "オ": "ド・ブロイの関係、フェルミ波数、不確定性原理"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "結晶の周期ポテンシャル中の電子波はブロッホの定理で記述する。ブリルアンゾーン境界ではブラッグ散乱により反対方向の波が結び付き、定在波とエネルギーの分裂が生じる。",
    "choiceExplanations": {
      "ア": "結晶の周期ポテンシャル中の電子波はブロッホの定理で記述する。ブリルアンゾーン境界ではブラッグ散乱により反対方向の波が結び付き、定在波とエネルギーの分裂が生じる。",
      "イ": "周期性と波数空間の境界を説明する最初の二つは正しい。反射が起きる位相条件はブラッグ散乱から得られる。",
      "ウ": "フェルミ波数はフェルミ面を特徴付ける量であり、結晶の逆格子で定まる境界とは一致するとは限らない。境界の散乱条件はブラッグ条件である。",
      "エ": "ゾーン境界でブラッグ散乱が起こる二つの空欄は合う。格子の周期性を含む電子波の位相は、運動量と波長を結ぶド・ブロイの関係だけでは記述できない。",
      "オ": "周期結晶中の波動関数には格子の周期をもつ部分があり、それはブロッホの定理に従う。反対向きの波が結合するのはブリルアンゾーン境界でブラッグ条件が成立するときである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 126。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q127",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 127,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "体心立方格子の原子間距離と充填率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "体心立方構造に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「体心立方格子の格子点上に原子が存在するとき、単位格子の【㋐】の上には3個の原子が接しているので、原子間距離は【㋐】の長さの1/2になり、格子定数を a とすると【㋑】である。原子を剛体球とみなし、その球直径が原子間距離に等しいとして求めた球体積から原子の充填率が計算できる。単位格子に2個の原子が含まれるので、原子の充填率は約【㋒】となる。」",
    "choices": {
      "ア": "体対角線、√3a/2、68％",
      "イ": "体対角線、√3a/2、74％",
      "ウ": "体対角線、√2a/2、74％",
      "エ": "面対角線、√3a/2、68％",
      "オ": "面対角線、√2a/2、74％"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "立方体の体対角線 √3a 上で隅の原子と体心の原子が接するので、最近接距離は √3a/2 である。半径 √3a/4 の球2個分を a³ で割ると、充填率は π√3/8≒68％になる。",
    "choiceExplanations": {
      "ア": "立方体の体対角線 √3a 上で隅の原子と体心の原子が接するので、最近接距離は √3a/2 である。半径 √3a/4 の球2個分を a³ で割ると、充填率は π√3/8≒68％になる。",
      "イ": "接触する方向と最近接距離は合っている。充填率が約74％となるのは面心立方などの最密充填構造で、体心立方では約68％である。",
      "ウ": "体対角線は立方体の三辺を使うため長さは √3a である。√2a は一つの面だけの対角線なので、最近接距離の計算には使わない。",
      "エ": "最近接距離と充填率は体心立方の値である。中心を通って原子が接する方向は、面対角線ではなく体対角線となる。",
      "オ": "面対角線で接触し充填率が約74％となるのは面心立方構造に対応する。体心立方の単位格子には、隅を合わせて1個と体心の1個が入る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 127。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q128",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 128,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "拡散係数のアレニウス式",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "拡散現象に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「金属中の原子の拡散係数 D は、熱活性化過程で成り立つアレニウスの式 D＝D₀ exp[−Q/(RT)] で表せる。そのため、拡散の活性化エネルギー Q は、様々な絶対温度 T で実測した ln D を【㋐】に対してプロットし、その傾き【㋑】から評価することができる。さらに、D₀ は物質固有の振動数因子、R は気体定数であるので、T が2倍になると D は【㋒】倍になることが分かる。」",
    "choices": {
      "ア": "T、−Q/R、exp[Q/(2RT)]",
      "イ": "T、Q/R、exp[−Q/(2RT)]",
      "ウ": "T⁻¹、−Q/R、exp[Q/(2RT)]",
      "エ": "T⁻¹、−Q/R、exp[−Q/(2RT)]",
      "オ": "T⁻¹、Q/R、exp[−Q/(2RT)]"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ln D＝ln D₀−(Q/R)T⁻¹ から、横軸は T⁻¹、傾きは−Q/Rである。D(2T)/D(T) では指数の差が −Q/(2RT)−[−Q/(RT)]＝Q/(2RT) になる。",
    "choiceExplanations": {
      "ア": "負の傾きと温度上昇時の倍率は合う。対数を取った式で温度が現れる項は 1/T なので、T に対して描くと直線にはならない。",
      "イ": "ln D は 1/T を横軸としたとき負の傾きで直線となる。温度が上がると指数は0に近付いて D が大きくなり、倍率の指数は正である。",
      "ウ": "ln D＝ln D₀−(Q/R)T⁻¹ から、横軸は T⁻¹、傾きは−Q/Rである。D(2T)/D(T) では指数の差が −Q/(2RT)−[−Q/(RT)]＝Q/(2RT) になる。",
      "エ": "直線の変数と傾きは正しいが、拡散係数の比の指数は二つの指数の差である。−Q/(2RT) は D(2T) 単独の指数に当たる。",
      "オ": "T⁻¹が増えると温度が下がるため、拡散係数の対数は小さくなる。傾きは負で、T を2倍にしたときの拡散係数は増える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 128。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q129",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 129,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "二元合金の非平衡凝固と分配係数",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のようなA–B二元系平衡状態図（成分A側）において、B濃度 c₀ の合金が凝固する場合を考える。通常の凝固過程では冷却が早いために平衡凝固は生じない。次の記述㋐～㋓のうち、通常の凝固過程の説明として妥当なもののみを全て挙げているのはどれか。\n\n㋐ 凝固開始直前、系の温度は液相線温度以下に過冷却する。\n㋑ 凝固開始直後、凝固潜熱の発生により系の温度が上昇し、一時的に液相線温度以上になる。\n㋒ 凝固中、固相と液相のB濃度比である分配係数は1より大きくなる。\n㋓ 凝固終了温度は固相線温度よりも高くなる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋐、㋓",
      "オ": "㋑、㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "核が生じるまでには駆動力が必要なため、平衡液相線を下回ってから凝固が始まり得る。図では同じ温度で固相のB濃度が液相より低く、分配係数は1未満である。",
    "choiceExplanations": {
      "ア": "核が生じるまでには駆動力が必要なため、平衡液相線を下回ってから凝固が始まり得る。図では同じ温度で固相のB濃度が液相より低く、分配係数は1未満である。",
      "イ": "凝固潜熱によって温度が一時的に戻ることはある。通常の凝固では、過冷却から戻って平衡液相線の温度に近付くので、これを上回るという㋑は妥当でない。",
      "ウ": "温度を固定して図の両境界を横切ると、固相線との交点は液相線よりB濃度の低い側にある。したがって固相濃度を液相濃度で割る分配係数は1未満となる。",
      "エ": "固相に入りきらないBが残液に濃縮されると、その液相はより低温まで残り得る。非平衡凝固の終了温度が c₀ の平衡固相線より高くなるという説明は適切でない。",
      "オ": "凝固潜熱による昇温は過冷却を減らすが、液相線を超えるとはいえない。図から固相の方がBに乏しく、㋒の分配係数の大小も逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 129。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q129.webp"
    ],
    "imageAltTexts": [
      "A–B二元系のA側での液相線と固相線、および組成c₀"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q130",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 130,
    "type": "multiple-choice",
    "category": "材料工学（材料科学）",
    "topicTags": [
      "二元系共晶状態図と相律",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図Ⅰは、典型的なA–B二元系共晶型状態図の簡略図である。図Ⅱの㋐、㋑、㋒は図Ⅰの類型であるが、熱力学的に妥当でないものが含まれている。図Ⅱの㋐、㋑、㋒のうち、熱力学的に妥当なもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑、㋒",
      "エ": "㋒",
      "オ": "妥当なものはない。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "二元系の共晶で液相と二固相が共存する温度は、圧力一定なら相律により定まる。㋐のように共晶線が水平で、片方の固相への固溶がほぼない状態図は成立し得る。",
    "choiceExplanations": {
      "ア": "二元系の共晶で液相と二固相が共存する温度は、圧力一定なら相律により定まる。㋐のように共晶線が水平で、片方の固相への固溶がほぼない状態図は成立し得る。",
      "イ": "㋐は共晶温度を水平に示している。㋑では液相と二固相の共存線が傾いており、三相が平衡する温度が一定となる条件に反する。",
      "ウ": "温度が変わる共晶線を描く㋑は、圧力一定の二元三相平衡では成立しない。㋒では、中間化合物が同じ組成の液相になる点で液相線が滑らかな極大となる条件が満たされていない。",
      "エ": "中間化合物を含む二元系で左右に共晶が生じることはある。㋒のように一致融解点で液相線が尖る形は、固相と液相の組成が一致する点の平衡に適合しない。",
      "オ": "㋐の水平線では固定温度で共晶反応が起きる。成分Bが成分Aの固相にほとんど固溶しない場合にも、このような形があり得る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 130。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q130-1.webp",
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q130-2.webp"
    ],
    "imageAltTexts": [
      "図Ⅰの典型的な二元系共晶状態図",
      "図Ⅱに示された三つの二元系状態図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q131",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 131,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "転位の運動と金属の強化機構",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属の強化機構に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n・金属を強化するには、欠陥の全くない完全結晶にする方法と、結晶の中にできるだけ多くの不完全性（格子欠陥）を導入する方法の二つの方法があるが、現実的には後者の方法が用いられる。多くの不完全性（格子欠陥）を導入することで、【㋐】の移動が抑制され、金属の強化が実現される。\n・一般に純金属は軟らかいが、合金になると硬くて強くなる。合金元素を添加して強化する方法には【㋑】や析出強化がある。\n・金属の結晶粒を微細にすることによって強化する方法を結晶粒微細化強化と呼ぶ。降伏応力は、平均結晶粒径の1/2乗に【㋒】して増加することが経験的に知られているが、これは運動する【㋐】の障害物となる結晶粒界の総面積が微細化により【㋓】することに起因する。",
    "choices": {
      "ア": "粒子、加工強化、比例、低下",
      "イ": "粒子、加工強化、反比例、増加",
      "ウ": "転位、加工強化、比例、低下",
      "エ": "転位、固溶強化、反比例、増加",
      "オ": "転位、固溶強化、比例、低下"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "固溶元素などの格子欠陥は転位の移動を妨げる。粒径 d が小さくなると粒界の総面積が増え、降伏応力に k/√d の項が加わる。",
    "choiceExplanations": {
      "ア": "格子欠陥によって移動が妨げられるのは、塑性変形を担う転位である。平均粒径が小さくなると結晶粒界が増え、粒界の障害が強まる。",
      "イ": "粒径の逆平方根と粒界の増加については合っている。合金元素を溶かし込むことによる強化は固溶強化であり、塑性加工で強くなる加工強化と区別する。",
      "ウ": "転位の移動を抑える点は正しい。結晶粒を細かくして粒界を増やすと、Hall–Petchの関係に従って粒径の逆平方根に比例する増分が生じる。",
      "エ": "固溶元素などの格子欠陥は転位の移動を妨げる。粒径 d が小さくなると粒界の総面積が増え、降伏応力に k/√d の項が加わる。",
      "オ": "最初の二つは合うが、粒界は粒径が小さいほど増える。降伏応力を増加させる項は結晶粒径の平方根ではなくその逆数に比例する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 131。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q132",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 132,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "金属の硬さ・疲労・ヤング率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "金属の変形、強度、破壊に関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 金属において、引張試験等で得られる強度とビッカース試験等で得られる硬さの間には良い相関があるため、引張試験片を採取できない場合には、硬さ試験によって強度を推定することが行われる。\n\n㋑ き裂の進展に対する材料の抵抗性を靭性という。一般に、強度の高い金属ほど伸びが大きく、靭性も大きくなる傾向がある。\n\n㋒ 静的破壊を引き起こす荷重よりはるかに低い荷重が繰り返し金属に加わった場合に生じる破壊現象を、クリープ破壊という。\n\n㋓ 引張試験の変形初期で得られる応力―ひずみ曲線の勾配を、ヤング率あるいは縦弾性係数といい、金属の変形のしにくさを測る指標として用いられる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "金属の硬さと引張強度の相関を利用して、適切な換算で強度を推定できる。弾性域での応力をひずみで割った勾配はヤング率である。",
    "choiceExplanations": {
      "ア": "硬さを強度の推定に使う㋐は妥当である。強度と延性や靱性には両立しにくい場合もあり、高強度ほど必ず伸びが大きいとはいえない。",
      "イ": "繰り返し荷重により微小なき裂が進展して生じる破壊は疲労破壊である。㋑も強度が高まるほど延性や靱性が高まると一般化している点が誤っている。",
      "ウ": "金属の硬さと引張強度の相関を利用して、適切な換算で強度を推定できる。弾性域での応力をひずみで割った勾配はヤング率である。",
      "エ": "応力―ひずみ曲線の初期勾配を説明する㋓は正しい。クリープは一定応力が長く作用する場合の時間依存変形であり、繰り返し荷重をいう㋒は疲労の説明である。",
      "オ": "㋓の弾性応答の説明は正しい。静的破壊荷重より低くても、繰り返しで破損する現象は疲労破壊であり、㋒は該当しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 132。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q133",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 133,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "共析鋼のパーライト・マルテンサイト・焼戻し",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "炭素鋼に関する次の記述の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「共析組成をもつ Fe–0.765 mass％C 合金を共析温度よりも高い温度に保持した後に室温まで徐冷すると、【㋐】と呼ばれる層状組織が得られる。一方、室温まで急冷すると【㋑】と呼ばれる硬くてもろい組織が得られ、これを共析温度よりも低い600℃で長時間焼もどし処理すると、【㋐】と同様に、【㋒】と【㋓】から成る二相組織が得られる。」",
    "choices": {
      "ア": "パーライト、マルテンサイト、フェライト、セメンタイト",
      "イ": "パーライト、マルテンサイト、オーステナイト、ベイナイト",
      "ウ": "パーライト、セメンタイト、フェライト、セメンタイト",
      "エ": "ベイナイト、マルテンサイト、セメンタイト、パーライト",
      "オ": "ベイナイト、セメンタイト、フェライト、パーライト"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "徐冷で共析変態させると、フェライトとセメンタイトが層を作るパーライトになる。急冷で得るマルテンサイトを十分焼き戻すと、組織の形態は異なるが、相としてはフェライトとセメンタイトになる。",
    "choiceExplanations": {
      "ア": "徐冷で共析変態させると、フェライトとセメンタイトが層を作るパーライトになる。急冷で得るマルテンサイトを十分焼き戻すと、組織の形態は異なるが、相としてはフェライトとセメンタイトになる。",
      "イ": "徐冷と急冷でできる組織名は合っている。共析温度以下の十分な焼戻しで得られる二相は、フェライトとセメンタイトである。",
      "ウ": "セメンタイトは炭化鉄の相で、徐冷したパーライトや焼戻し組織に含まれる。急冷で生成する硬い組織は、炭素を過飽和に含むマルテンサイトである。",
      "エ": "急冷のマルテンサイトは正しいが、共析鋼の徐冷で生じる層状組織はパーライトである。パーライトは二相の組織名なので、焼戻し後の一つの相として列挙できない。",
      "オ": "徐冷の層状組織がパーライトで、急冷による硬い組織はマルテンサイトである。焼戻し後はフェライトと炭化物であるセメンタイトの二相になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 133。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q134",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 134,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "マグネタイトの逆スピネル構造とフェリ磁性",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "磁性材料に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「マグネタイト（Fe₃O₄）は古くから利用されてきた磁性材料である。Fe₃O₄ の結晶構造は、4配位位置を【㋐】が、6配位位置を Fe²⁺ と Fe³⁺ が半分ずつを占めた【㋑】である。4配位位置のイオンと6配位位置のイオンの磁気モーメントは反対方向で、その大きさが異なるため、Fe₃O₄ は【㋒】を示す。」",
    "choices": {
      "ア": "Fe²⁺、正スピネル型、反強磁性",
      "イ": "Fe²⁺、逆スピネル型、フェリ磁性",
      "ウ": "Fe³⁺、正スピネル型、反強磁性",
      "エ": "Fe³⁺、逆スピネル型、反強磁性",
      "オ": "Fe³⁺、逆スピネル型、フェリ磁性"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "逆スピネル型では、4配位サイトに Fe³⁺、6配位サイトに Fe²⁺ と Fe³⁺ が入る。両サイト群の磁化が反平行でも大きさが違うので、自発磁化が残るフェリ磁性となる。",
    "choiceExplanations": {
      "ア": "マグネタイトでは4配位サイトに Fe³⁺ が入る。6配位には Fe²⁺ と Fe³⁺ が入り、異なる大きさの反平行な磁化が打ち消し切らない。",
      "イ": "構造名と磁性は正しいが、4配位の位置に入るのは Fe³⁺ である。Fe²⁺ は6配位位置に含まれる。",
      "ウ": "4配位のイオンは確かに Fe³⁺ である。Fe²⁺ が6配位に入るため逆スピネル型であり、反対向きの磁化の差が残るフェリ磁性を示す。",
      "エ": "逆スピネル型と4配位の Fe³⁺ は合っている。二つの副格子の磁化が完全には相殺されない性質をフェリ磁性という。",
      "オ": "逆スピネル型では、4配位サイトに Fe³⁺、6配位サイトに Fe²⁺ と Fe³⁺ が入る。両サイト群の磁化が反平行でも大きさが違うので、自発磁化が残るフェリ磁性となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 134。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q135",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 135,
    "type": "multiple-choice",
    "category": "材料工学（金属材料・無機材料）",
    "topicTags": [
      "ランタノイドの4f電子と永久磁石",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "希土類元素の原子番号58番から71番のランタノイドに関する記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 原子番号とともに増加するのは4f電子であるが、結晶中で伝導電子になるのは6s及び5d電子であり、3価になることが多い。\n\n㋑ 4f電子は、伝導や結合に寄与し、他の電子軌道から混成などの影響を強く受ける。\n\n㋒ 4f電子は、不完全殻を形成するため、軌道角運動量が打ち消され、反磁性になる。\n\n㋓ ランタノイドと遷移金属から成る金属間化合物は、永久磁石に利用される。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒、㋓",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "ランタノイドでは4f軌道が順次満たされ、多くの元素が3価の状態を取る。サマリウム・コバルト系など、ランタノイドと遷移金属の組合せは永久磁石に用いられる。",
    "choiceExplanations": {
      "ア": "ランタノイドでは内側の4f軌道に電子が入っていく。4f電子は外側の殻に遮蔽されるので、伝導や結合に影響する軌道と強く混成するという㋑は当たらない。",
      "イ": "4f電子は局在性が高く、他の軌道との混成が比較的小さい。不完全な4f殻の電子は磁気モーメントを持ち得るので、それだけで反磁性とはいえない。",
      "ウ": "ランタノイドでは4f軌道が順次満たされ、多くの元素が3価の状態を取る。サマリウム・コバルト系など、ランタノイドと遷移金属の組合せは永久磁石に用いられる。",
      "エ": "永久磁石についての㋓は妥当である。4f軌道は局在性が高く、不対電子を含む場合には磁気モーメントが残るため、㋑と㋒は適切でない。",
      "オ": "ランタノイドと遷移金属の化合物は永久磁石に用いられる。4f電子は外側の電子に遮蔽されており、伝導は主に外側の電子が担う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 135。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q136",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 136,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "中性子捕獲と弾性散乱",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "中性子と物質の相互作用に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「原子核に中性子が捕獲されると【㋐】が1だけ増加した原子核が生成される。中性子捕獲反応は【㋑】反応であり、エネルギーの低い中性子の捕獲反応によりエネルギーの高い励起状態の原子核が形成される。また、中性子が原子核に衝突する際、方向が変わるだけで核反応を起こさない衝突があり、これを【㋒】という。」",
    "choices": {
      "ア": "質量数、吸熱、弾性散乱",
      "イ": "質量数、発熱、弾性散乱",
      "ウ": "質量数、発熱、非弾性散乱",
      "エ": "原子番号、吸熱、弾性散乱",
      "オ": "原子番号、吸熱、非弾性散乱"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "中性子の捕獲では陽子数は同じで核子数が1増え、結合によるエネルギーが放出される。核の内部状態を変えず、系の運動エネルギーが保存される散乱は弾性散乱である。",
    "choiceExplanations": {
      "ア": "中性子1個を付け加えるため、質量数は1増える。捕獲に伴い結合エネルギーが励起や放出される放射線に分配されるので、吸熱という組合せは合わない。",
      "イ": "中性子の捕獲では陽子数は同じで核子数が1増え、結合によるエネルギーが放出される。核の内部状態を変えず、系の運動エネルギーが保存される散乱は弾性散乱である。",
      "ウ": "捕獲で質量数が増えることと、捕獲反応が発熱であることは正しい。非弾性散乱では、原子核の励起などに運動エネルギーの一部が移る。",
      "エ": "中性子は電荷を持たないため、捕獲によって原子番号を決める陽子数は増えない。捕獲後の核は結合エネルギーに対応するエネルギーを放出できる。",
      "オ": "捕獲で増えるのは原子番号ではなく質量数である。標的核の励起を伴わない散乱は弾性散乱に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 136。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q137",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 137,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "放射性核種の壊変系列",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "放射性核種の壊変系列に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「【㋐】系列は、各核種の質量数を4で割ると2余ることから（4n＋2）系列とも呼ばれており、最後は【㋑】（安定核種）で終わる。【㋒】系列は、地球ができた46億年前には存在していたが、現在は自然界に存在しないとされている。」",
    "choices": {
      "ア": "ウラン、²⁰⁶Pb、ネプツニウム",
      "イ": "ウラン、²⁰⁶Pb、トリウム",
      "ウ": "ウラン、²⁰⁵Tl、ネプツニウム",
      "エ": "アクチニウム、²⁰⁶Pb、トリウム",
      "オ": "アクチニウム、²⁰⁵Tl、トリウム"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "²³⁸U から ²⁰⁶Pb に至るウラン系列は、質量数が4で割って2余る。ネプツニウム系列の親核種は地球の年齢に比べて半減期が短く、地球形成時からあった系列は実質的に残っていない。",
    "choiceExplanations": {
      "ア": "²³⁸U から ²⁰⁶Pb に至るウラン系列は、質量数が4で割って2余る。ネプツニウム系列の親核種は地球の年齢に比べて半減期が短く、地球形成時からあった系列は実質的に残っていない。",
      "イ": "ウラン系列と終端核種は正しい。親核種 ²³²Th が長い半減期をもつトリウム系列は、現在も自然界に存在する。",
      "ウ": "ウラン系列ではα壊変で質量数が4減り、β壊変では質量数が変わらない。²⁰⁵Tl の質量数は4で割ると1余るので、この系列の終端にはならない。",
      "エ": "アクチニウム系列は ²³⁵U を始点とするため、質量数が4で割って3余る系列である。また、トリウム系列には現在も天然に存在する核種がある。",
      "オ": "アクチニウム系列が終わる安定核種は ²⁰⁷Pb であり、²⁰⁵Tl ではない。トリウム系列も地球形成時からの親核種が残っている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 137。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q138",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 138,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "物理学的・生物学的半減期から求める有効半減期",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "¹³¹I（ヨウ素131）と ¹³⁷Cs（セシウム137）が体内に取り込まれたとき、¹³⁷Cs の有効半減期は ¹³¹I の有効半減期のおよそ何倍か。\n\nただし、化学形態等に依存する生物（学）的半減期は ¹³¹I と ¹³⁷Cs でそれぞれ11日と91日であったとする。また、¹³¹I と ¹³⁷Cs の物理（学）的半減期はそれぞれ8日と30年とする。\nなお、体内に取り込まれた放射性核種の有効半減期 T_E は、この放射性核種の物理（学）的半減期 T_P 及び体内に取り込まれた際の化学形態等に依存する生物（学）的半減期 T_B によって決まり、1/T_E＝1/T_P＋1/T_B なる関係が成立する。",
    "choices": {
      "ア": "0.05倍",
      "イ": "1倍",
      "ウ": "8倍",
      "エ": "20倍",
      "オ": "1000倍"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ヨウ素の有効半減期は (1/8＋1/11)⁻¹≒4.63日である。セシウムは物理学的半減期が91日より十分長く、有効半減期は約90日なので、およそ20倍となる。",
    "choiceExplanations": {
      "ア": "約0.05はヨウ素の有効半減期をセシウムの有効半減期で割ると得られる。問題はセシウムを分子にした倍率を問うている。",
      "イ": "両核種とも有効半減期はそれぞれ物理・生物半減期の短い方より小さい。ヨウ素は約4.6日、セシウムは約90日なので、等しくはない。",
      "ウ": "8倍は、生物学的半減期の比 91/11 に近い。ヨウ素では物理学的半減期も短く、体内からの排出と放射壊変の両方が有効半減期を短くする。",
      "エ": "ヨウ素の有効半減期は (1/8＋1/11)⁻¹≒4.63日である。セシウムは物理学的半減期が91日より十分長く、有効半減期は約90日なので、およそ20倍となる。",
      "オ": "30年と8日をそのまま比べると比は千の桁になる。体内での有効半減期を求めるには、排出等による生物学的半減期も考慮する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 138。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q139",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 139,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "フリッケ線量計の吸収線量とG値",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "フリッケ線量計は、硫酸と2価の鉄イオン Fe²⁺ をそれぞれ0.4 mol/Lと 1×10⁻³ mol/L の濃度で含む水溶液である。フリッケ線量計に放射線が当たると、Fe²⁺ から Fe³⁺ への酸化が起こり、この酸化を利用して吸収線量を測定できる。フリッケ線量計で測定した吸収線量が7.0 Gyであったとき、生成した Fe³⁺ の濃度として最も妥当なのはどれか。\n\nただし、フリッケ線量計の密度は1.0 kg/L、酸化の効率を表すG値は 1.6×10⁻⁶ mol/J であったとする。",
    "choices": {
      "ア": "1.6×10⁻⁶ mol/L",
      "イ": "1.1×10⁻⁵ mol/L",
      "ウ": "4.4×10⁻³ mol/L",
      "エ": "7.0×10⁻³ mol/L",
      "オ": "1.0×10⁻² mol/L"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "7.0 Gyは1 kg当たり7.0 Jを吸収したことを示し、密度1.0 kg/Lなら7.0 J/Lとなる。G値を掛けると生成量は 7.0×1.6×10⁻⁶≒1.1×10⁻⁵ mol/L である。",
    "choiceExplanations": {
      "ア": "G値をそのまま濃度とみなしているが、単位は mol/J である。1 Lの溶液が吸収した7.0 Jを掛ける必要がある。",
      "イ": "7.0 Gyは1 kg当たり7.0 Jを吸収したことを示し、密度1.0 kg/Lなら7.0 J/Lとなる。G値を掛けると生成量は 7.0×1.6×10⁻⁶≒1.1×10⁻⁵ mol/L である。",
      "ウ": "酸の濃度は、吸収エネルギー当たりの生成量を表すG値とは異なる。この選択肢の濃度は、酸化前の Fe²⁺ が 1×10⁻³ mol/L しかない条件にも反する。",
      "エ": "吸収線量の値を濃度へ換算するには、密度と mol/J のG値を掛ける。7.0に初期の Fe²⁺ 濃度を掛ける計算では、生成濃度を求められない。",
      "オ": "初期 Fe²⁺ の全量が酸化された場合でも Fe³⁺ の増加は 1×10⁻³ mol/L までである。実際の線量とG値で計算すると約 1.1×10⁻⁵ mol/L である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 139。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q140",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 140,
    "type": "multiple-choice",
    "category": "原子力工学（原子核・放射線）",
    "topicTags": [
      "磁場閉込め核融合炉とブランケット",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "核融合炉に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「磁場閉込め核融合炉では、炉心プラズマを取り囲むようにブランケットを配置する。ブランケットの役割は、【㋐】のエネルギーを熱に変換して、冷却材を発電可能な高温にすること、【㋐】とリチウムとの原子核反応により【㋑】を生産・回収すること、放射線を遮蔽することが挙げられる。ブランケットには、プラズマからの放射線や高熱が直接入射するとともに大きな電磁力が発生するため、これらに耐える除熱性能と強固な構造をもつことが要求される。特にプラズマに面するブランケット前面の【㋒】は大きな負荷にさらされる。」",
    "choices": {
      "ア": "中性子、トリチウム、第一壁",
      "イ": "中性子、トリチウム、ダイバータ",
      "ウ": "中性子、重水素、第一壁",
      "エ": "α粒子、トリチウム、ダイバータ",
      "オ": "α粒子、重水素、ダイバータ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "核融合で生じた中性子は磁場で閉じ込められず、ブランケットで熱に変換される。リチウムとの反応で生じる燃料はトリチウムであり、プラズマに面するブランケット表面は第一壁である。",
    "choiceExplanations": {
      "ア": "核融合で生じた中性子は磁場で閉じ込められず、ブランケットで熱に変換される。リチウムとの反応で生じる燃料はトリチウムであり、プラズマに面するブランケット表面は第一壁である。",
      "イ": "中性子とトリチウムの組合せは合っている。ダイバータはプラズマから熱や粒子を取り出す部分で、ブランケット前面を呼ぶ名前は第一壁である。",
      "ウ": "中性子のエネルギーを受け、第一壁がプラズマに面する点は正しい。リチウムとの反応で再生する核融合燃料は、重水素ではなくトリチウムである。",
      "エ": "電荷を持つα粒子は主にプラズマにエネルギーを与える。ブランケットまで主にエネルギーを運ぶ核融合生成物は中性子である。",
      "オ": "㋐には、中性で磁場を横切ってブランケットに到達する中性子が入る。リチウムとの反応で生じる燃料はトリチウムである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 140。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q141",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 141,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "加圧水型と沸騰水型の発電用軽水炉",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国において発電用原子炉施設として導入されている軽水炉には加圧水型原子炉（PWR）と沸騰水型原子炉（BWR）がある。これらの運転・制御の違いに関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ BWRでは、炉心上部で蒸気が発生し、減速材による中性子減速効果が減り、炉心軸方向の出力が上部で相対的に低くなる。そのため、燃料棒上部に相対的に濃縮度の高い燃料ペレットを配置している。\n\n㋑ BWRでは、気水分離器等の上部構造物が比較的少ないため、炉心上部から制御棒を挿入することができる。\n\n㋒ PWRでは、炉心内の冷却材の再循環流量を調整することにより、ボイド量が増減して減速材の密度が変化する。これにより中性子減速効果が増減するため、出力及び反応度を制御することができる。\n\n㋓ PWRでは、炉心で加熱されて高温高圧になった冷却水を蒸気発生器に導き、蒸気発生器の伝熱管の内側（一次系）から外側（二次系）に熱を伝え、二次系に蒸気を発生させる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "BWRでは炉心上部の蒸気が減速を弱めるため、出力分布を整える燃料配置が使われる。PWRでは加圧して液体に保つ一次系の水が、蒸気発生器で二次系の水へ熱を伝える。",
    "choiceExplanations": {
      "ア": "炉心上部に向かってボイド割合が増えるBWRの特徴は㋐に合う。BWRの上部には気水分離器などがあり、制御棒は一般に炉心下部から入る。",
      "イ": "BWRの出力の軸方向分布に関する㋐は妥当である。再循環流量によってボイド割合を変える出力制御もBWRに対応する。",
      "ウ": "BWRでは炉心上部の蒸気が減速を弱めるため、出力分布を整える燃料配置が使われる。PWRでは加圧して液体に保つ一次系の水が、蒸気発生器で二次系の水へ熱を伝える。",
      "エ": "BWRは上部に気水分離器や蒸気乾燥器を持つ形式が一般的で、制御棒は炉心下部から挿入される。炉内で沸騰を抑えるPWRに、ボイド量を調整するBWRの方式を適用する説明は当たらない。",
      "オ": "一次系から二次系を加熱するPWRについての㋓は正しい。BWRの炉心上部には蒸気を扱う設備があるため、選択肢の制御棒の向きは逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 141。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q142",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 142,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "発電用軽水炉の燃料と核分裂生成ガス",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "我が国の軽水炉で用いられる核燃料に関する記述㋐～㋓のうち、妥当なもののみを挙げているのはどれか。\n\n㋐ 冷却材喪失により燃料が高温になると、被覆管と水の反応によって酸素が発生する。\n\n㋑ 原子炉の運転に伴い、キセノンやクリプトンなどの気体状の核分裂生成物による燃料内圧上昇が起きる。\n\n㋒ 燃料としては、融点が約2,800℃と高いこと等の理由から、六フッ化ウランを焼結したものが採用されている。\n\n㋓ 燃料には、ウラン235の割合を3～5％に高めた低濃縮ウランを用いている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "核分裂で生じるキセノンやクリプトンの一部は、燃料ペレットから放出されて燃料棒内圧を上げる。通常の軽水炉用ウラン燃料には、ウラン235を3～5％程度とした低濃縮ウランが使われる。",
    "choiceExplanations": {
      "ア": "核分裂生成ガスで内圧が上がる点は妥当である。高温のジルコニウム系被覆管が水蒸気と反応すると、発生する気体は水素である。",
      "イ": "冷却材喪失時の被覆管の反応では、水蒸気から水素が生じる。また、一般的な軽水炉の燃料ペレットは二酸化ウランを焼結したものである。",
      "ウ": "一般的なウラン燃料でウラン235の割合を高める㋓は妥当である。水蒸気との反応で、被覆管の酸化に伴って放出されるのは水素である。",
      "エ": "キセノンやクリプトンなどが燃料棒内部の圧力上昇に寄与する点は正しい。燃料として焼結される物質は二酸化ウランであり、六フッ化ウランではない。",
      "オ": "核分裂で生じるキセノンやクリプトンの一部は、燃料ペレットから放出されて燃料棒内圧を上げる。通常の軽水炉用ウラン燃料には、ウラン235を3～5％程度とした低濃縮ウランが使われる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 142。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q143",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 143,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "原子炉の用途に応じた被覆管材料",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "表は、原子炉の被覆管に用いることがある材料の物性である。㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "試験研究炉、軽水炉、高速炉",
      "イ": "試験研究炉、高速炉、軽水炉",
      "ウ": "軽水炉、試験研究炉、高速炉",
      "エ": "軽水炉、高速炉、試験研究炉",
      "オ": "高速炉、試験研究炉、軽水炉"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ジルコニウム合金は熱中性子吸収が小さく軽水炉の燃料被覆に使われる。高速炉では高温等に耐える鋼が、試験研究炉では熱伝導の良いアルミニウム合金が使われる場合がある。",
    "choiceExplanations": {
      "ア": "軽水炉の燃料被覆管には、熱中性子を吸収しにくいジルコニウム合金が広く使われる。アルミニウム合金は高速炉より温度が低い試験研究炉の被覆材などに使われる。",
      "イ": "ステンレス鋼を高速炉に対応させる点は合っている。軽水炉の運転温度と中性子吸収の条件にはジルコニウム合金が適している。",
      "ウ": "ジルコニウム合金を軽水炉とした点は正しい。高温や照射条件に耐えるステンレス鋼は高速炉の候補で、低い融点のアルミニウム合金をそこに割り当てない。",
      "エ": "ジルコニウム合金は熱中性子吸収が小さく軽水炉の燃料被覆に使われる。高速炉では高温等に耐える鋼が、試験研究炉では熱伝導の良いアルミニウム合金が使われる場合がある。",
      "オ": "ジルコニウム合金の熱中性子吸収の小ささは、熱中性子を利用する軽水炉で利点となる。ステンレス鋼は高速炉、アルミニウム合金は試験研究炉に対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 143。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q143.webp"
    ],
    "imageAltTexts": [
      "三種類の被覆管材料の融点、熱伝導度と熱中性子吸収断面積の比較表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q144",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 144,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "軽水・重水・黒鉛による中性子の減速",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "中性子の減速及び拡散に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「中性子が ²³⁵U 等の核分裂性物質と核反応して核分裂を起こすと、平均エネルギー約2 MeVの高速中性子が発生する。熱中性子炉では、この高速中性子を減速材と呼ばれる物質により熱エネルギーまで減速させる。中性子は減速材中の原子核と衝突を繰り返し、運動エネルギーを失う。減速には軽水、重水、黒鉛等の軽核を含む物質を用いるのが効率的である。軽水、重水、黒鉛の中で、高速中性子が1 eV以下のエネルギーになるまでの平均衝突回数は、【㋐】が最も多い。熱中性子となった中性子は減速材中を拡散する。拡散する平均距離は、軽水より黒鉛の方が【㋑】。これは、炭素の熱中性子吸収断面積が水素に比べて【㋒】ためである。」",
    "choices": {
      "ア": "黒鉛、短い、大きい",
      "イ": "黒鉛、短い、小さい",
      "ウ": "黒鉛、長い、小さい",
      "エ": "軽水、短い、大きい",
      "オ": "軽水、長い、小さい"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "炭素核は水素や重水素より重く、一回当たりに中性子のエネルギーを減らしにくいため、多くの衝突を要する。熱中性子の炭素への吸収は水素より小さく、軽水より黒鉛で拡散距離が長い。",
    "choiceExplanations": {
      "ア": "黒鉛は炭素核が水素核より重いので、一回の衝突で中性子が失う割合が小さい。炭素の吸収断面積は小さく、熱中性子は軽水中より長く拡散する。",
      "イ": "黒鉛の衝突回数が多く、炭素の吸収断面積が小さい点は正しい。吸収されにくい熱中性子は、黒鉛中の方がより遠くまで拡散する。",
      "ウ": "炭素核は水素や重水素より重く、一回当たりに中性子のエネルギーを減らしにくいため、多くの衝突を要する。熱中性子の炭素への吸収は水素より小さく、軽水より黒鉛で拡散距離が長い。",
      "エ": "軽水の水素核は中性子と質量が近く、一回の衝突での減速が効率的である。炭素は水素に比べて熱中性子を吸収しにくい。",
      "オ": "拡散距離と吸収断面積の比較は正しい。軽水は水素核が軽いため減速に少ない衝突で済み、最も多くの衝突が必要なのは黒鉛である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 144。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q145",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 145,
    "type": "multiple-choice",
    "category": "原子力工学（原子炉・核燃料サイクル）",
    "topicTags": [
      "正の反応度パルスに対する原子炉出力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、原子炉に正の反応度が印加されるとき、原子炉の出力変化の概形として最も妥当なのはどれか。\n\nただし、原子炉出力から反応度に対するフィードバックは無いものとする。なお、臨界で出力 n₀ の定常状態にある原子炉に反応度 ρ［$］が加えられると、即発跳躍によって出力は n₀/(1−ρ) に急変し、その後、指数関数的に増加する。",
    "choices": {
      "ア": "選択肢1の図",
      "イ": "選択肢2の図",
      "ウ": "選択肢3の図",
      "エ": "選択肢4の図",
      "オ": "選択肢5の図"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "反応度の印加で出力は即発跳躍し、正の反応度が続く間は増加する。反応度をゼロに戻すと即発成分で出力が急減するが、遅発中性子の前駆体が増えた分、印加前より高い出力に落ち着く。",
    "choiceExplanations": {
      "ア": "正の反応度を印加したときには即発跳躍があるが、その後も出力は上昇する。段差の間で一定出力とする波形は、その増加を表していない。",
      "イ": "反応度が正の間の出力上昇は表しているが、印加する瞬間に出力が急増する部分がない。反応度を戻すときにも、即発成分による急な低下が起こる。",
      "ウ": "反応度を加えるときと除くときには変化の速い成分があり、図のような連続した変化だけにはならない。成長した遅発中性子の前駆体が残るため、初期の出力に戻るとも限らない。",
      "エ": "正の反応度により増えた遅発中性子の前駆体は、反応度がゼロに戻った瞬間に消えるわけではない。図のように印加前と同じ出力まで直ちに戻すのは適切でない。",
      "オ": "反応度の印加で出力は即発跳躍し、正の反応度が続く間は増加する。反応度をゼロに戻すと即発成分で出力が急減するが、遅発中性子の前駆体が増えた分、印加前より高い出力に落ち着く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 145。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q145.webp"
    ],
    "imageAltTexts": [
      "一定時間だけ0.3ドルの正の反応度を印加する入力波形"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kokka-sogo-dai/2025/senmon-kogaku/q145-choice-1.webp",
      "イ": "/questions/kokka-sogo-dai/2025/senmon-kogaku/q145-choice-2.webp",
      "ウ": "/questions/kokka-sogo-dai/2025/senmon-kogaku/q145-choice-3.webp",
      "エ": "/questions/kokka-sogo-dai/2025/senmon-kogaku/q145-choice-4.webp",
      "オ": "/questions/kokka-sogo-dai/2025/senmon-kogaku/q145-choice-5.webp"
    }
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q146",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 146,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "淡水と海水で変わる船の喫水",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "比重1の真水上に、水線面積 A_W、喫水 d、排水容積 ∇ の船がある。ここで、竪柱形係数とは C_VP＝∇/(A_W d) として定義されるものであり、この船の真水上での竪柱形係数が C_VP＝C であるとする。この船が、真水上から比重 γ（γ＞1）の海洋上に移動したとき、喫水が Δd だけ減少する。このとき、Δd/d を表す式として最も妥当なのはどれか。ただし、この喫水の変化に伴う水線面積の変化及び移動に伴う船の重量の変化はないものとする。",
    "choices": {
      "ア": "C(γ−1)/γ",
      "イ": "C²(γ−1)/γ",
      "ウ": "(γ−1)/(γC)",
      "エ": "(γ−1)/(γC²)",
      "オ": "γ/[C(γ−1)]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "海水の密度が γ 倍なので、船の重さを支える排水容積は ∇/γ になる。減った容積は A_W Δd であり、これを A_W d で割ると C(γ−1)/γ になる。",
    "choiceExplanations": {
      "ア": "海水の密度が γ 倍なので、船の重さを支える排水容積は ∇/γ になる。減った容積は A_W Δd であり、これを A_W d で割ると C(γ−1)/γ になる。",
      "イ": "排水容積を A_W d で割る操作は一度だけで、その比が C である。C をもう一度掛ける理由はない。",
      "ウ": "喫水の減少率には ∇/(A_W d) が掛かる。この比は C の定義そのものであり、C の逆数を掛ける式とは合わない。",
      "エ": "船の排水容積が同じ水線面積・喫水の直方体より小さいとき、係数 C も小さくなる。喫水の変化は元の排水量に比例するので、C が分母には入らない。",
      "オ": "真水と海水の密度が等しくなる極限では、喫水の変化は0に近付く。この式は γ が1に近付くと発散し、浮力の釣合いと一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 146。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q147",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 147,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "中実円柱の浮遊安定条件",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船舶算法に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図のように、比重1.0の真水上で直立する、一様な材質でできた、比重0.5の中実円柱について考える。この円柱の直径は2r、高さは H である。この円柱の水線面である円の中心を通る軸についての水線面積二次モーメントは【㋐】である。また、この円柱が直立して安定に浮かぶための条件は【㋑】である。」",
    "choices": {
      "ア": "πr⁴/4、H＜√2r",
      "イ": "πr⁴/4、H＜2√2r",
      "ウ": "πr⁴/2、H＜√2r",
      "エ": "πr⁴/2、H＜2√2r",
      "オ": "πr⁴、H＜2√2r"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "円の直径軸まわりの面積二次モーメントは πr⁴/4 である。排水容積 πr²H/2 で割った浮心―メタセンタ間距離 r²/(2H) が浮心―重心間距離 H/4 より大きいとき安定し、H＜√2r となる。",
    "choiceExplanations": {
      "ア": "円の直径軸まわりの面積二次モーメントは πr⁴/4 である。排水容積 πr²H/2 で割った浮心―メタセンタ間距離 r²/(2H) が浮心―重心間距離 H/4 より大きいとき安定し、H＜√2r となる。",
      "イ": "円の面積二次モーメントは合う。安定条件は r²/(2H)＞H/4 なので、H の上限は2√2rより小さい。",
      "ウ": "高さの条件は合っているが、πr⁴/2 は円の直交する二つの直径軸の二次モーメントを足した極二次モーメントである。傾斜軸の計算には一軸分を使う。",
      "エ": "一軸まわりの二次モーメントは、極二次モーメント πr⁴/2 の半分である。また、浮心の高さは H/4、重心は H/2 なので、両者の差は H/4 である。",
      "オ": "面積が πr² の円では、軸からの距離の二乗を積分して πr⁴/4 を得る。浮力で支えられるのは全容積の半分なので、排水容積にもその比を使う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 147。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q147.webp"
    ],
    "imageAltTexts": [
      "真水に直立して浮かぶ中実円柱の水線面、直径と高さ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q148",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 148,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "模型船の抵抗試験から実船への三次元外挿",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "一隻の模型船を用いて、フルード数0.100及び0.200で抵抗試験を行った結果を以下の表に示す。\n\n3次元外挿法で解析するとき、フルード数0.200における実船の全抵抗係数の推定値として最も妥当なのはどれか。ただし、フルード数0.100の抵抗試験結果を用いて形状影響係数を決定することとし、粗度修正係数は考慮しないものとする。",
    "choices": {
      "ア": "1.68×10⁻³",
      "イ": "1.92×10⁻³",
      "ウ": "2.10×10⁻³",
      "エ": "2.52×10⁻³",
      "オ": "2.80×10⁻³"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "0.100では造波抵抗を無視し、形状の補正は 3.60/3.00＝1.20 となる。0.200での造波成分は (4.20−1.20×2.80)×10⁻³＝0.84×10⁻³ であり、実船全抵抗は (1.20×1.40＋0.84)×10⁻³＝2.52×10⁻³ となる。",
    "choiceExplanations": {
      "ア": "1.68×10⁻³ は、0.200での実船摩擦抵抗に形状の補正1.20を掛けた値である。同じフルード数で模型から推定した造波抵抗分も加える。",
      "イ": "1.92×10⁻³ は、形状係数を掛けたフルード数0.100での実船摩擦抵抗に当たる。求めるフルード数は0.200なので、対応する摩擦抵抗と造波抵抗を使う。",
      "ウ": "実船摩擦抵抗1.40×10⁻³に、フルード数0.100を使って求めた形状の補正を掛ける。模型の残差抵抗分も足すため、2.10×10⁻³では小さい。",
      "エ": "0.100では造波抵抗を無視し、形状の補正は 3.60/3.00＝1.20 となる。0.200での造波成分は (4.20−1.20×2.80)×10⁻³＝0.84×10⁻³ であり、実船全抵抗は (1.20×1.40＋0.84)×10⁻³＝2.52×10⁻³ となる。",
      "オ": "2.80×10⁻³ は、フルード数0.200の模型側の平板摩擦抵抗係数である。求めるのは実船の摩擦に形状補正をかけ、造波成分を加えた値である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 148。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q148.webp"
    ],
    "imageAltTexts": [
      "二つのフルード数での模型船の抵抗係数と模型・実船の平板摩擦抵抗係数"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q149",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 149,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "プロペラ単独試験の推力係数と伴流率",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "直径 D が0.15 mのプロペラ模型を用いてプロペラ単独試験を行った結果、推力係数 K_T が前進係数 J の関数として次のように得られた。\nK_T＝−0.20J²−0.20J＋0.40\nこのプロペラ模型を模型船に取り付けて自航試験を行った結果、n＝8.0、K_T＝0.25となった。推力一致法により得られた伴流率 w が0.40であるとき、模型船が前進する速さとして最も妥当なのはどれか。\n\nただし、前進係数は J＝Vₐ/(nD) で与えられ、n は1秒当たりのプロペラ回転数、Vₐ [m/s] はプロペラ前進速度の大きさである。",
    "choices": {
      "ア": "0.60 m/s",
      "イ": "0.72 m/s",
      "ウ": "1.0 m/s",
      "エ": "1.5 m/s",
      "オ": "2.0 m/s"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "K_T＝0.25 とすると J²＋J−0.75＝0 で、物理的な正の解は J＝0.50 である。Vₐ＝0.50×8.0×0.15＝0.60 m/s を (1−0.40) で割ると船速は1.0 m/sである。",
    "choiceExplanations": {
      "ア": "0.60 m/s は、推力係数に合う J＝0.50 を使って求めたプロペラ前進速度である。船速は、伴流により遅くなるこの速度を 1−w で割って求める。",
      "イ": "前進係数は推力係数の二次式から J＝0.50 と求まる。速度はプロペラ前進速度0.60 m/sを基に、伴流率0.40を補正する。",
      "ウ": "K_T＝0.25 とすると J²＋J−0.75＝0 で、物理的な正の解は J＝0.50 である。Vₐ＝0.50×8.0×0.15＝0.60 m/s を (1−0.40) で割ると船速は1.0 m/sである。",
      "エ": "0.60 m/sを伴流率 w＝0.40 そのもので割ると1.5 m/sになる。プロペラに流入する速度と船速の比は w ではなく 1−w である。",
      "オ": "船速2.0 m/sならプロペラ前進速度は1.20 m/s、Jは1.0となる。その J を推力係数の式に入れると K_T＝0 となり、自航試験の0.25に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 149。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q150",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 150,
    "type": "multiple-choice",
    "category": "船舶海洋工学（流体）",
    "topicTags": [
      "復原力消失角と面積による転覆判定",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船の復原性に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「ある船の横傾斜モーメントレバー GZ [m] が、横揺れ角 φ [rad] の関数として、以下のように表されるものとする。\nGZ(φ)＝φ−aφ³\nただし、定数 a は a＞0 を満たすものとする。このとき、φ が正の領域に存在する、復原力がゼロとなる角度（復原力消失角）は【㋐】[rad]である。\nいま、図Ⅰのように、定常風によるレバー D [m]（D＞0）の横傾斜モーメントのみが作用するとき、D [m]の大きさが【㋑】を超えると船は転覆する。\n次に、図Ⅱのように、D [m]の大きさが【㋑】より小さいとき、船は φ₀（φ₀＞0）で定常傾斜する。その上で、波による影響で船が φ₁（φ₁＜0）まで瞬間的に傾斜させられたとする。その後 φ が正の方向に傾斜するとき、船が転覆しないための面積 A と面積 B に関する条件は【㋒】となる。ただし、φ が正の方向に船が傾斜するときの波の影響並びに海水流入角及び船の横揺れ減衰力は無視してよい。」",
    "choices": {
      "ア": "1/√a、1/(3√(3a))、A＜B",
      "イ": "1/√a、2/(3√(3a))、A＜B",
      "ウ": "1/√a、2/(3√(3a))、A＞B",
      "エ": "2/√a、1/(3√(3a))、A＞B",
      "オ": "2/√a、2/(3√(3a))、A＜B"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "GZ＝0 の正の解は 1/√a であり、GZ′＝1−3aφ²＝0 を使うと最大値は 2/[3√(3a)] になる。回復する側の仕事 B が横揺れで得たエネルギーに当たる A を上回ると、不安定な角度に到達せず A＜B となる。",
    "choiceExplanations": {
      "ア": "正の零点と面積条件は合っている。最大点 φ＝1/√(3a) で GZ＝φ(1−aφ²) に代入すると、因子は1−1/3＝2/3になる。",
      "イ": "GZ＝0 の正の解は 1/√a であり、GZ′＝1−3aφ²＝0 を使うと最大値は 2/[3√(3a)] になる。回復する側の仕事 B が横揺れで得たエネルギーに当たる A を上回ると、不安定な角度に到達せず A＜B となる。",
      "ウ": "復原力消失角と最大値は合っている。AがBより大きいと、復原力で吸収できる仕事だけでは横揺れを止められず、転覆の側へ進む。",
      "エ": "GZ＝φ(1−aφ²) が正の角度で0になるのは 1/√a である。面積の比較では、回復のためのエネルギー容量 B が A より大きい必要がある。",
      "オ": "最大値と面積条件は正しい。正の根は 1−aφ²＝0 で決まるので、係数2は付かない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 150。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q150.webp"
    ],
    "imageAltTexts": [
      "定常風によるモーメントレバーと復原力の曲線、および面積A・B"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q151",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 151,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "船体の縦式構造と二重底",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "一般的な船体の構造様式に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 船底外板に付く肋板（フロア）、船側外板に付く肋骨（フレーム）、甲板に付く梁（ビーム）が相互に結合された骨組みを中心とし、これに縦強度部材を配置して各部材の機能を発揮できるようにした構造を横式構造という。この構造様式は、構造が簡単で特に大型の船に採用されている。\n\n㋑ 横隔壁と横隔壁との間に等間隔で配置された横桁のほかは、縦通隔壁、縦桁、縦通小骨などの部材を船の長さ方向に配置する構造を縦式構造という。縦式構造は、横式構造に比べて構造部材の数が増えて複雑な構造となる。\n\n㋒ 小型船を除き、多くの船の船底部は二重底構造（船首部と船尾部は除く。）となっている。これは、座礁した場合に船の中央部の重要な区画に海水が侵入することなどを防ぐためである。この部分はタンク構造となっていて、バラスト水などを積むことができる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋑",
      "ウ": "㋒",
      "エ": "㋐、㋒",
      "オ": "㋑、㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "縦式構造は縦通小骨や縦桁などを船の長さ方向に配置して、船体の縦方向の強度を確保する。二重底は損傷時の浸水防止に寄与し、その内部はバラスト水などのタンクとして利用できる。",
    "choiceExplanations": {
      "ア": "横式構造で船体横断方向の骨組みが中心になる点は正しい。大型船では、船体の長さ方向の曲げに抵抗しやすい縦式構造などが多く使われる。",
      "イ": "㋑は縦通部材を多数配置する縦式構造の特徴を述べている。船底の安全性とタンクとしての使用を説明する㋒も妥当である。",
      "ウ": "二重底は、外板が損傷したときに上の区画への浸水を抑え、内部をタンクにも使える。ただし、縦通部材を中心とする㋑も妥当である。",
      "エ": "二重底の説明は妥当である。㋐は横式構造を特に大型船向けとする点が誤っている。",
      "オ": "縦式構造は縦通小骨や縦桁などを船の長さ方向に配置して、船体の縦方向の強度を確保する。二重底は損傷時の浸水防止に寄与し、その内部はバラスト水などのタンクとして利用できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 151。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q152",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 152,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "船の上下揺れを表す運動方程式",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船の上下揺れ（Heave）による変動圧力とバネ・マス・ダンパー系の運動方程式の相関関係を表した図の㋐～㋓に当てはまるものの組合せとして最も妥当なのはどれか。ただし、他の自由度との連成や粘性減衰力は考慮しないものとする。",
    "choices": {
      "ア": "ラディエイション力、復原力、ディフラクション力、波浪強制力",
      "イ": "ラディエイション力、復原力、波浪強制力、ディフラクション力",
      "ウ": "ディフラクション力、復原力、ラディエイション力、波浪強制力",
      "エ": "ディフラクション力、ラディエイション力、復原力、波浪強制力",
      "オ": "ディフラクション力、ラディエイション力、波浪強制力、復原力"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "船体自身が動くことで生じる流体力がラディエイション力で、付加質量と造波減衰を含む。変位に比例する項が復原力であり、入射波の力とディフラクション力の和が波浪強制力となる。",
    "choiceExplanations": {
      "ア": "船体自身が動くことで生じる流体力がラディエイション力で、付加質量と造波減衰を含む。変位に比例する項が復原力であり、入射波の力とディフラクション力の和が波浪強制力となる。",
      "イ": "付加質量・減衰と復原力の対応は正しい。波浪強制力はフルード・クリロフ力とディフラクション力を加えた全体なので、㋒と㋓の対応は逆である。",
      "ウ": "ディフラクション力は、固定した船体が入射波を乱すことで生じる。船体の加速度や速度に応じて現れる付加質量・減衰の力はラディエイション力である。",
      "エ": "船体の変位で変わる静水圧の効果は復原力であり、kz(t)に対応する。ディフラクション力は、入射波の影響を表す外力側に含まれる。",
      "オ": "付加質量と減衰の項は、船体運動が作る流体の応答である。図の右辺は入射波による波浪強制力で、復原力は左辺の変位に比例する項になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 152。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q152.webp"
    ],
    "imageAltTexts": [
      "船の上下揺れの力とバネ・マス・ダンパー系の運動方程式の対応"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q153",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 153,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "薄板箱形断面の縦曲げ応力",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "船の縦曲げ強度に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\n「図の(a)、(b)、(c)に示すように、断面を構成する板の幅の合計がいずれも10となる十分に長い三つの箱船に対して、それぞれ同じ大きさの縦曲げモーメントを作用させる。このとき、最大曲げ応力が最も高くなる箱船の断面は【㋐】であり、最も低くなる箱船の断面は【㋑】となる。\nただし、縦曲げモーメントによって箱船に生じる変形は微小であり、材料は全て同じ均質な鋼材であるものとする。また、板厚は全て同じで、板幅に対して十分に薄く、自重は無視できるものとする。」",
    "choices": {
      "ア": "(a)、(b)",
      "イ": "(a)、(c)",
      "ウ": "(b)、(a)",
      "エ": "(b)、(c)",
      "オ": "(c)、(a)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "板厚を t とすると、中立軸まわりの断面二次モーメントは薄板近似で(a)が 16t/3、(b)が 6t、(c)が 22t/3 である。全断面で曲げモーメントと中立軸から最外縁までの距離が同じなので、最大曲げ応力は(a)で最大、(c)で最小となる。",
    "choiceExplanations": {
      "ア": "最大応力が(a)で最も高いことは合っている。(c)は(b)より上下端の板幅が大きい分、断面二次モーメントが大きく、応力はさらに低くなる。",
      "イ": "板厚を t とすると、中立軸まわりの断面二次モーメントは薄板近似で(a)が 16t/3、(b)が 6t、(c)が 22t/3 である。全断面で曲げモーメントと中立軸から最外縁までの距離が同じなので、最大曲げ応力は(a)で最大、(c)で最小となる。",
      "ウ": "(a)の水平な中仕切りは中立軸上にあり、曲げに対する寄与が小さい。そのため(a)は(b)より応力が高く、最小にはならない。",
      "エ": "(c)が最低応力となることは正しい。(b)には鉛直の中仕切りが追加され、その寄与がほぼない(a)の中央水平板より断面二次モーメントを大きくする。",
      "オ": "(c)は上下端に最も幅広い板を持ち、最大曲げ応力を小さくする。最大応力が大きいのは、中仕切りが中立軸に重なる(a)である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 153。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q153.webp"
    ],
    "imageAltTexts": [
      "板幅の合計が等しく、中仕切りと外板の配置が異なる三つの箱船断面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q154",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 154,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "集中荷重と等分布荷重の中央曲げモーメント",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "長さが 2L の単純梁がある。ここで、図Ⅰのように、中央に大きさ W の集中荷重が作用している場合と、図Ⅱのように、単位長さ当たりの大きさが W/(2L) の等分布荷重が梁全体にわたり作用している場合を考える。それぞれの場合について、梁の長さ方向中央部における曲げモーメントの大きさを M_Ⅰ、M_Ⅱ としたとき、その比率 M_Ⅰ/M_Ⅱ の値として最も妥当なのはどれか。ただし、荷重によって梁に生じる変形は微小であり、梁の自重は無視できるものとする。",
    "choices": {
      "ア": "1/4",
      "イ": "1/3",
      "ウ": "1/√2",
      "エ": "1",
      "オ": "2"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "集中荷重では M_Ⅰ＝(W/2)L＝WL/2 である。等分布荷重では左半分の合力 W/2 の作用点が中央から L/2 にあるため M_Ⅱ＝WL/2−WL/4＝WL/4 となり、比は2である。",
    "choiceExplanations": {
      "ア": "集中荷重の場合、左支点の反力 W/2 に中央までの腕 L を掛ける。等分布の場合は左半分の荷重による逆向きの曲げも生じるので、比は1より大きい。",
      "イ": "等分布荷重の左側半分の合力は W/2 であり、作用点は左支点と中央の間の中点にある。中央まわりにこの力のモーメントを差し引いて求める。",
      "ウ": "この比は荷重の合計だけからは決まらない。長さ方向の分布ごとに腕を掛けると、中央の集中荷重によるモーメントの方が大きい。",
      "エ": "両方の荷重の合計と支点反力は同じである。等分布荷重では左側の荷重も中央断面の曲げに関与するため、中央の曲げモーメントは同じにならない。",
      "オ": "集中荷重では M_Ⅰ＝(W/2)L＝WL/2 である。等分布荷重では左半分の合力 W/2 の作用点が中央から L/2 にあるため M_Ⅱ＝WL/2−WL/4＝WL/4 となり、比は2である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 154。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-kogaku/q154.webp"
    ],
    "imageAltTexts": [
      "中央集中荷重と等分布荷重が作用する単純支持梁"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-kogaku-q155",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-kogaku",
    "qNumber": 155,
    "type": "multiple-choice",
    "category": "船舶海洋工学（構造）",
    "topicTags": [
      "炭素・リン・クロムが鋼の性質に与える影響",
      "選択問題"
    ],
    "difficulty": 3,
    "question": "鋼に含まれる化学成分に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐ 炭素の含有量が増すと、鋼の引張強さ、硬さ及び衝撃値は高くなる。\n\n㋑ リンの含有量が増すと、鋼はもろくなる。\n\n㋒ クロムは、その酸化作用によって、鋼を内部にわたってさびやすくする。クロムの含有量を10％以下に抑え、さびにくくしたものをステンレス鋼と呼ぶ。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "リンは粒界に偏析しやすく、含有量が高いと靱性が低下して鋼が脆くなる。炭素とクロムについての他の二記述には、それぞれ衝撃値と耐食性の説明に誤りがある。",
    "choiceExplanations": {
      "ア": "炭素量を増すと一般に鋼の硬さや強度は増すが、延性や衝撃に対する靱性は低下する傾向にある。衝撃値まで高くなるという㋐は適切でない。",
      "イ": "リンが増えると脆くなりやすいという㋑は正しい。炭素を増やすと硬さや強度が増す一方、衝撃値も上がるとはいえない。",
      "ウ": "リンは粒界に偏析しやすく、含有量が高いと靱性が低下して鋼が脆くなる。炭素とクロムについての他の二記述には、それぞれ衝撃値と耐食性の説明に誤りがある。",
      "エ": "リンの影響については正しい。クロムは表面に不動態皮膜を作って耐食性を高め、ステンレス鋼には一定量以上のクロムを含ませる。",
      "オ": "ステンレス鋼はクロム量を一定値以下に抑えて作るものではない。例えばJISの定義では、クロムを10.5％以上含むことが要件の一つである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016305.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 工学区分 専門試験（多肢選択式）」No. 155。解説は過去問AIの独自作成。"
  }
];
