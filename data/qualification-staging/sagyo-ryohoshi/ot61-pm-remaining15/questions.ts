import type { Question } from "@/lib/questions/types";

/** 独立候補。公開レジストリへの登録は統合担当が行う。 */
export const OT61_PM_REMAINING14_QUESTIONS: Question[] = [
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q1",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 1,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "作業療法評価学",
    "topicTags": [
      "関節可動域",
      "1995年基準",
      "基本軸",
      "移動軸"
    ],
    "difficulty": 3,
    "question": "関節可動域測定法（日本整形外科学会、日本リハビリテーション医学会基準1995\n年）を図に示す。\n　測定法で正しいのはどれか。2 つ選べ。",
    "choices": {
      "ア": "肩外旋",
      "イ": "前腕回外",
      "ウ": "母指橈側外転",
      "エ": "股外転",
      "オ": "膝伸展"
    },
    "answer": [
      "イ",
      "エ"
    ],
    "requiredSelections": 2,
    "officialAnswerNumber": "24",
    "explanation": "正答は2・4。問題は1995年の関節可動域測定法を指定しており、図の太線が基本軸、細線が移動軸である。前腕回外は肘を90度屈曲し、上腕骨を基本軸、手指を伸展した手掌面を移動軸として測定する。股外転は両側上前腸骨棘を結ぶ線への垂線が基本軸、大腿骨が移動軸である。肩外旋の基本軸、母指の運動面、膝の基本軸と移動軸の対応を区別する。運動名だけでなく、測定肢位と両軸を原図で確認する必要がある。",
    "choiceExplanations": {
      "ア": "誤り。1995年基準では肩外旋の基本軸は肘を通る前額面への垂直線、移動軸は尺骨である。図1は基本軸を上腕の長軸方向に置いており、外旋角を測る軸の組合せが基準と一致しない。",
      "イ": "正しい。前腕回外は肘関節90度屈曲位で測定する。図2では基本軸が上腕骨、移動軸が手指を伸展した手掌面に対応しており、前腕の回旋角を測る軸の組合せになっている。",
      "ウ": "誤り。母指橈側外転は手掌面内で母指を示指から離す運動で、基本軸は示指、移動軸は母指である。図3のように母指を手掌面から持ち上げる方向は掌側外転に相当し、橈側外転の運動面ではない。",
      "エ": "正しい。股外転では両側の上前腸骨棘を結ぶ線に直交する線が基本軸、大腿骨が移動軸となる。図4は骨盤を基準に大腿の外転を示しており、体幹や骨盤の代償運動を除いて測定する。",
      "オ": "誤り。膝伸展は大腿骨を基本軸、腓骨を移動軸として測定する。図5では太線が下腿側、細線が大腿側に置かれ、基本軸と移動軸が逆になっている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://doi.org/10.2490/jjrm1963.32.207"
    ],
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q1-figure.png"
    ],
    "imageAltTexts": [
      "厚生労働省第61回作業療法士午後1の原図。1から5の順に、肩外旋、前腕回外、母指橈側外転、股外転、膝伸展。太線は基本軸、細線は移動軸。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q1-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q1-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q1-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q1-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q1-choice-5.png"
    }
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q2",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 2,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "半側空間無視",
      "右頭頂葉",
      "BIT",
      "車椅子"
    ],
    "difficulty": 3,
    "question": "次の文により、2 、3 の問いに答えよ。\n　65 歳の男性。右利き。右頭頂葉の脳梗塞による片麻痺。MMSE 19/30 点。\nBrunnstrom 法ステージは上肢・手指、下肢ともにⅢ。回復期リハビリテーション病\n棟で作業療法が開始された。検査結果（別冊No. 1）を別に示す。\n\nこの患者が作業療法を開始したときに観察されるのはどれか。",
    "choices": {
      "ア": "皿の右側の食物を残す。",
      "イ": "左側からが起き上がりやすい。",
      "ウ": "車椅子駆動の際に左側によくぶつかる。",
      "エ": "介助者が左側から誘導すると反応が良い。",
      "オ": "作業療法室で人が多いと左側へ注意がそれる。"
    },
    "answer": "ウ",
    "requiredSelections": 1,
    "officialAnswerNumber": "3",
    "explanation": "正答は3。右頭頂葉の脳梗塞と、別冊のBIT通常検査32/146点から左半側空間無視が示唆される。これは視力だけの障害ではなく、左側の刺激に注意を向け、探索して行動することが難しい状態である。車椅子駆動では左側の障害物を見落として衝突しやすい。食事でも残しやすいのは皿の左側であり、右側ではない。麻痺の程度だけで移動の安全性を判断せず、左側への探索、車椅子と周囲との位置関係、移乗時の注意などを確認する。",
    "choiceExplanations": {
      "ア": "誤り。左半側空間無視で見落としやすいのは皿の左側の食物である。右頭頂葉病変の症例に対し、皿の右側を残すという左右の対応は逆である。",
      "イ": "誤り。左片麻痺と左半側空間無視があるため、左側の確認や左側を介した起き上がりには困難が生じうる。左側からの起き上がりが容易だと判断できる情報はない。",
      "ウ": "正しい。左側空間への注意・探索が低下すると、車椅子で左側の壁や物に接近しても気づかず衝突しやすい。別冊のBIT成績と右頭頂葉病変に合致する行動である。",
      "エ": "誤り。左側からの呼びかけや誘導を見落としやすいのが左半側空間無視である。左側から誘導すれば反応が良いと一律に考えず、気づきやすい位置から注意を促す工夫が必要である。",
      "オ": "誤り。周囲の刺激が多いと注意が分散しやすいが、その結果として無視側の左へ自然に注意が向きやすくなるわけではない。右側への偏りや左側の見落としが問題となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_02.pdf"
    ],
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot61-pm-remaining15/no1-bit.png"
    ],
    "imageAltTexts": [
      "別冊No.1のBIT通常検査成績。線分抹消14/36、文字抹消3/40、星印抹消12/54、模写1/4、線分二等分2/9、描画0/3、合計32/146点。"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q3",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 3,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "半側空間無視",
      "プリズム適応",
      "高次脳機能"
    ],
    "difficulty": 3,
    "question": "次の文により、2 、3 の問いに答えよ。\n　65 歳の男性。右利き。右頭頂葉の脳梗塞による片麻痺。MMSE 19/30 点。\nBrunnstrom 法ステージは上肢・手指、下肢ともにⅢ。回復期リハビリテーション病\n棟で作業療法が開始された。検査結果（別冊No. 1）を別に示す。\n\nこの患者の作業療法で最も適切なのはどれか。",
    "choices": {
      "ア": "ペグ法",
      "イ": "間隔伸長法",
      "ウ": "自己教示法",
      "エ": "問題解決訓練",
      "オ": "プリズム適応療法"
    },
    "answer": "オ",
    "requiredSelections": 1,
    "officialAnswerNumber": "5",
    "explanation": "正答は5。共通症例の右頭頂葉病変とBIT成績は左半側空間無視に合致する。プリズム適応療法では視野を右へずらすプリズム眼鏡を装着して指さしなどの反復課題を行い、視覚と運動のずれへの適応を利用する。眼鏡を外した後の左方向への後効果などを介して無視の改善を図る方法である。記憶に対するペグ法・間隔伸長法、自己教示や問題解決訓練より、本問の主な障害に直接対応する。ただし効果には個人差があり、実生活での安全確認や他の介入と組み合わせて評価する。",
    "choiceExplanations": {
      "ア": "誤り。ペグ法は覚えたい情報を既知の手掛かりと結び付ける記憶方略である。右頭頂葉病変による左半側空間無視を主な標的とする本問で、最も直接的な選択とはならない。",
      "イ": "誤り。間隔伸長法は同じ情報を再生する間隔を段階的に延ばす記憶訓練である。記憶障害への活用は考えられるが、左側空間の見落としに特化した方法ではない。",
      "ウ": "誤り。自己教示法は手順や行動の目標を言葉で確認しながら遂行する方略で、行動の統制や遂行機能の支援に用いる。左半側空間無視への直接的介入としては5が適切である。",
      "エ": "誤り。問題解決訓練は課題の把握、選択肢の検討、計画と結果の評価を練習する。遂行機能障害への支援として有用だが、症例の半側空間無視に最も対応する選択ではない。",
      "オ": "正しい。プリズムによる視覚の偏位下で反復して到達運動を行い、視覚と運動の適応を利用して無視側への反応を改善する。左半側空間無視に対する介入として研究されている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_02.pdf",
      "https://pubmed.ncbi.nlm.nih.gov/29558241/"
    ],
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot61-pm-remaining15/no1-bit.png"
    ],
    "imageAltTexts": [
      "別冊No.1のBIT通常検査成績。線分抹消14/36、文字抹消3/40、星印抹消12/54、模写1/4、線分二等分2/9、描画0/3、合計32/146点。"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q4",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 4,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "作業療法評価学",
    "topicTags": [
      "遂行機能障害",
      "BADS",
      "高次脳機能評価"
    ],
    "difficulty": 3,
    "question": "45 歳の男性。交通事故による外傷性脳損傷で入院中である。運動麻痺はないが、\n会話中の内容が急に変わったり、段取り良く片付けができない。\n　作業療法士が高次脳機能障害の有無や程度を把握するために初期に行う評価で最\nも適切なのはどれか。",
    "choices": {
      "ア": "BIT",
      "イ": "CAS",
      "ウ": "BADS",
      "エ": "SLTA",
      "オ": "HDS-R"
    },
    "answer": "ウ",
    "requiredSelections": 1,
    "officialAnswerNumber": "3",
    "explanation": "正答は3のBADS。会話の話題が急に変わることや、段取り良く片付けられないことは、目的を保ち、行動を計画・順序化・修正する遂行機能の障害を疑う所見である。BADSは日常生活で問題になる遂行機能を課題と質問紙で評価する。初期には本人の課題遂行の観察や家族からの情報も合わせ、注意障害や記憶障害との関係を整理する。BITは半側空間無視、SLTAは失語、HDS-Rは認知症スクリーニングなど、検査が主に対象とする機能を区別する。",
    "choiceExplanations": {
      "ア": "誤り。BITは線分抹消や模写などを用いて半側空間無視を評価する検査である。本問では左右の空間の見落としより、段取りや行動の統制の障害が主な所見である。",
      "イ": "誤り。CASは標準意欲評価法で、意欲・自発性低下の程度を捉える。段取りを立てて活動する能力を直接評価する検査としては、遂行機能を扱うBADSが適切である。",
      "ウ": "正しい。BADSは遂行機能障害の行動評価を目的とし、計画や規則の切り替えなど日常場面に近い課題を用いる。会話の統制や片付けの段取りの問題に対応する。",
      "エ": "誤り。SLTAは標準失語症検査で、聴く・話す・読む・書くなどの言語機能を評価する。会話中の話題転換だけから失語を主障害と考えることはできない。",
      "オ": "誤り。HDS-Rは見当識や記憶などを調べる改訂長谷川式簡易知能評価スケールである。遂行機能の問題を日常課題に即して把握するという本問の目的にはBADSが合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.pearsonassessments.com/en-us/Store/Professional-Assessments/Cognition-%26-Neuro/Behavioural-Assessment-of-the-Dysexecutive-Syndrome/p/100000427"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q5",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 5,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "発達障害作業療法",
    "topicTags": [
      "PEDI",
      "小児ADL",
      "脳性麻痺"
    ],
    "difficulty": 3,
    "question": "5 歳の男児。痙直型両麻痺の脳性麻痺と診断されており、保育園での着替えや遊\nびへの参加が制限されている。自宅でも食事やトイレなどの身辺動作で介助を要し\nている。\n　この児のADL 評価で最も適切なのはどれか。",
    "choices": {
      "ア": "MAS",
      "イ": "MACS",
      "ウ": "PEDI",
      "エ": "GMFCS",
      "オ": "Southern California Sensory Integration Test〈SCSIT〉"
    },
    "answer": "ウ",
    "requiredSelections": 1,
    "officialAnswerNumber": "3",
    "explanation": "正答は3のPEDI。5歳児の食事、着替え、トイレなどの身辺動作と、保育園での活動への参加が問題になっている。PEDIは子どものセルフケア、移動、社会的機能に関する能力や実際の遂行、介助や環境調整を捉える評価であり、ADL上の支援を計画する目的に合う。痙縮、手の使用、粗大運動の分類も補助情報になるが、それらだけでは身辺活動全体と必要な介助量を十分に評価できない。評価対象が機能・能力の分類か、日常生活での遂行かを区別する。",
    "choiceExplanations": {
      "ア": "誤り。MASはModified Ashworth Scaleとして筋緊張・痙縮を評価する尺度である。痙直型脳性麻痺の身体所見には用いられるが、食事や着替えなどADL全体を評価する尺度ではない。",
      "イ": "誤り。MACSは脳性麻痺児が日常活動で物を扱う際の手の使用能力を分類する。手の機能はADLに関係するが、身辺活動の遂行や介助を広く評価する目的ではPEDIが適切である。",
      "ウ": "正しい。PEDIはセルフケア、移動、社会的機能を対象とし、子どもの日常生活能力と実際の遂行を評価する。食事・着替え・トイレで必要となる支援を把握する本問に合う。",
      "エ": "誤り。GMFCSは脳性麻痺の粗大運動能力を分類し、座位や歩行、移動方法などを捉える。移動以外の身辺動作を含むADLを直接評価する検査ではない。",
      "オ": "誤り。SCSITは感覚統合機能を検討する検査で、感覚処理や運動の計画などを調べる。日常の身辺活動と介助の必要性を評価するという目的にはPEDIが合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.pearsonassessments.com/en-us/Store/Professional-Assessments/Developmental-Early-Childhood/Pediatric-Evaluation-of-Disability-Inventory/p/100000505"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q6",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 6,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "がんリハビリテーション",
      "倦怠感",
      "活動と休息",
      "ストーマ"
    ],
    "difficulty": 3,
    "question": "60 歳の男性。会社員。直腸癌の術後で人工肛門を造設した。現在、抗がん剤治\n療中で倦怠感と下肢筋力低下があるが、病棟内での歩行は見守りレベルで可能。人\n工肛門のパウチ交換手順のトレーニングを始めた。入院前と同じ部署への復帰を希\n望している。\n　この患者に対する作業療法の初期対応で最も適切なのはどれか。",
    "choices": {
      "ア": "高負荷の持久力訓練を行う。",
      "イ": "食事摂取量を半分に減らすように助言する。",
      "ウ": "人工肛門の自己管理指導は看護師に任せる。",
      "エ": "早期復職に向けて作業環境の現地評価を行う。",
      "オ": "活動と休息のバランスを考慮したプログラムを行う。"
    },
    "answer": "オ",
    "requiredSelections": 1,
    "officialAnswerNumber": "5",
    "explanation": "正答は5。術後で抗がん剤治療中の患者には倦怠感と筋力低下があり、まず現在の体力に合わせて必要な活動を続けられるよう支援する。パウチ交換などのセルフケアを、姿勢、手順、物品配置、休息の取り方を工夫して練習する。長期的な復職の希望は尊重しつつ、初期には日々の活動と休息を調整し、過負荷を避けて廃用も防ぐ。活動を全面的に止めるのでも、本人の状態を無視して高負荷を与えるのでもない。栄養やストーマ管理は他職種と協力する。",
    "choiceExplanations": {
      "ア": "誤り。抗がん剤治療中で倦怠感・筋力低下がある初期段階に、高負荷の持久力訓練を一律に行うのは適切でない。症状や全身状態を評価し、本人が続けられる負荷に調整する。",
      "イ": "誤り。食事量を理由なく半分に減らすと、低栄養や筋力低下を悪化させるおそれがある。摂取に問題があれば医師・管理栄養士と連携し、必要な栄養を確保する。",
      "ウ": "誤り。人工肛門管理は看護師と連携するが、作業療法士もパウチ交換の手順、姿勢、巧緻動作、物品配置などのセルフケア遂行を支援できる。看護師へ全面的に任せる対応は不適切である。",
      "エ": "誤り。職場の評価は復職準備の過程で重要だが、初期には倦怠感を調整しセルフケアを安定させる支援が優先される。早期復職を前提に現地評価を先行する段階ではない。",
      "オ": "正しい。活動を小分けにし、症状に応じた休息と優先順位を組み込むと、必要な生活活動を維持しやすい。全身状態に合わせた運動も含め、過負荷と不活動の両方を避ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.cancer.gov/about-cancer/treatment/side-effects/fatigue"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q7",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 7,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "人工骨頭置換術",
      "後方進入",
      "脱臼予防",
      "ADL"
    ],
    "difficulty": 3,
    "question": "65 歳の女性。台所の段差でつまずき転倒し、左大腿骨近位部骨折。後方進入法\nにて人工骨頭置換術を施行し、自宅退院に向けて作業療法を開始した。\n　この患者のADL 指導の内容で適切なのはどれか。",
    "choices": {
      "ア": "靴下を履く。",
      "イ": "足の爪を切る。",
      "ウ": "階段を上がる。",
      "エ": "杖を使用する。",
      "オ": "床の物を拾う。"
    },
    "answer": "イ",
    "requiredSelections": 1,
    "officialAnswerNumber": "2",
    "explanation": "正答は2。後方進入による左人工骨頭置換術後は、特に股関節の強い屈曲、内転、内旋が組み合わさる動作を避ける。図2は左足を外側へ開いて爪に届く方法で、図1・5のように体幹を強く前へ倒す方法より股関節の深い屈曲を避けられる。図3は階段を患側から上がり、図4は杖を患側に持っているため適切でない。実際の許容肢位や荷重は術式・術後経過に応じた医師の指示を確認し、安全な動作や自助具の使用を個別に指導する。",
    "choiceExplanations": {
      "ア": "誤り。図1では体幹を前へ大きく倒して靴下を履き、股関節の深い屈曲を生じやすい。術後の制限に合わせ、長柄の自助具や介助などで危険肢位を避ける。",
      "イ": "正しい。図2は患側の足を外側へ開き、股関節の外転・外旋を利用して爪に届く姿勢である。強い前屈、内転、内旋を避ける点で、提示された方法の中では適切である。",
      "ウ": "誤り。図3は左の患側を先に上段へ出している。術後の階段昇降では通常、上りは健側から、下りは杖・患側から進め、荷重とバランスを安全に保つ。",
      "エ": "誤り。図4では杖を左の患側に持っている。左股関節の負担を軽減する歩行では、通常は反対側の右手で杖を持ち、患側下肢と杖を合わせて進める。",
      "オ": "誤り。図5は床の物へ前屈して手を伸ばし、股関節の深い屈曲を生じやすい。長柄のリーチャーなどを使い、術後に制限された肢位を避ける方法を指導する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.niams.nih.gov/health-topics/hip-replacement-surgery"
    ],
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q7-figure.png"
    ],
    "imageAltTexts": [
      "厚生労働省第61回作業療法士午後7の原図。1から5の順に、靴下を履く。、足の爪を切る。、階段を上がる。、杖を使用する。、床の物を拾う。。動作・配置は各選択肢の原図を参照。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q7-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q7-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q7-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q7-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q7-choice-5.png"
    }
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q8",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 8,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "脳卒中",
      "復職支援",
      "職業評価",
      "職場環境"
    ],
    "difficulty": 3,
    "question": "46 歳の男性。脳梗塞による右片麻痺。Brunnstrom 法ステージは上肢Ⅴ、手指\nⅤ、下肢Ⅴ。発症後7 か月が経過し、認知機能はMMSE が27 点。既に退院し、\n父母と同居している。発症前は内装業に従事していたが、同職での復職が困難であ\nるため、外来での復職支援を行うことになった。\n　作業療法士の対応で最も適切なのはどれか。",
    "choices": {
      "ア": "運動機能の改善を目指す。",
      "イ": "雇用されたら支援を終了する。",
      "ウ": "職場環境での職業評価を行う。",
      "エ": "通勤には家族の付き添いを薦める。",
      "オ": "就労準備は課題がなくなるまで続ける。"
    },
    "answer": "ウ",
    "requiredSelections": 1,
    "officialAnswerNumber": "3",
    "explanation": "正答は3。発症前の内装業への復職が難しい患者に対し、運動機能の改善だけを待つのではなく、現実の仕事の要求と現在の能力を照合する。職場での職業評価により、作業内容、必要な姿勢・動作、作業速度、安全性、勤務時間、支援や環境調整の可能性を検討する。本人の希望を踏まえ、配置転換や作業方法の変更なども関係者と協議する。雇用後も定着に向けた支援が必要となる場合があり、全ての課題の消失を復職の条件にすることは適切でない。",
    "choiceExplanations": {
      "ア": "誤り。運動機能の改善は支援の一部だが、発症後7か月で既に外来復職支援の段階にある。機能訓練だけでなく、現在の能力と仕事の要求の適合を評価する必要がある。",
      "イ": "誤り。雇用された時点で課題が全て解消するとは限らない。実際の勤務で疲労、安全性、作業の難しさを確認し、必要に応じて職場定着に向けた支援を続ける。",
      "ウ": "正しい。職場環境で作業の要求と本人の遂行能力を評価すると、仕事内容の変更や道具・配置の工夫、合理的配慮の検討につながる。本人の希望に沿った実際的な復職支援である。",
      "エ": "誤り。通勤に家族の付き添いが必要かは、経路、移動能力、安全性などを評価して決める。MMSEや運動ステージのみから、付き添いを一律に勧めることはできない。",
      "オ": "誤り。全ての機能的課題がなくなるまで就労準備だけを続けると、復職の機会を狭める。残る課題を支援や環境調整で補う可能性を含め、段階的に就労を検討する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q9",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 9,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "変形性膝関節症",
      "水中歩行",
      "関節裂隙",
      "運動指導"
    ],
    "difficulty": 3,
    "question": "73 歳の女性。3 年前から特に誘因なく歩行時の左膝痛が出現し、徐々に悪化し\nてきたため外来を受診した。左膝の熱感、腫脹なく関節裂隙の圧痛を軽度に認め\nた。立位のX 線写真（別冊No. 2）を別に示す。\n　この患者の指導で推奨されるのはどれか。",
    "choices": {
      "ア": "安　静",
      "イ": "正　座",
      "ウ": "階段昇降",
      "エ": "水中歩行",
      "オ": "ジョギング"
    },
    "answer": "エ",
    "requiredSelections": 1,
    "officialAnswerNumber": "4",
    "explanation": "正答は4。慢性の膝痛と、立位X線でみられる内側関節裂隙の狭小化や骨の変化は変形性膝関節症を示唆する。水中歩行は浮力によって膝への荷重を減らしながら、筋活動や歩行運動を行える。痛みに合わせた活動量の調整は必要だが、長期間の安静は筋力低下を招きやすい。正座は深い膝屈曲を要し、階段昇降やジョギングは膝の負担が大きくなりやすい。症状と全身状態を確認し、負担の少ない運動を継続するという視点で選ぶ。",
    "choiceExplanations": {
      "ア": "誤り。疼痛が強いときは活動量を調整するが、安静を主な指導として続けると筋力や活動性を低下させやすい。症状に合わせて負担の少ない運動を続けることが重要である。",
      "イ": "誤り。正座は膝を深く屈曲する姿勢で、変形性膝関節症では痛みや動作の困難を生じやすい。生活動作の工夫として椅子の使用などを検討する。",
      "ウ": "誤り。階段昇降は平地歩行より大きな膝への負荷を要し、痛みを誘発しやすい。症例の運動として最も推奨されるのは、荷重を軽減できる水中歩行である。",
      "エ": "正しい。水中では浮力で下肢への荷重が軽減され、膝への負担を抑えて歩行運動を行える。疼痛や体調を確認しながら筋活動や移動能力の維持に利用できる。",
      "オ": "誤り。ジョギングは着地を繰り返すため膝への衝撃が大きくなりやすい。慢性の膝痛があり関節の変性を示す本症例に、最初に推奨する運動とはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_02.pdf",
      "https://www.niams.nih.gov/health-topics/osteoarthritis"
    ],
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot61-pm-remaining15/no2-knee.png"
    ],
    "imageAltTexts": [
      "別冊No.2、左膝立位X線正面像。原画像に内側関節裂隙の狭小化を認める。"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q10",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 10,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "Parkinson病",
      "住環境",
      "洋式便座",
      "転倒予防"
    ],
    "difficulty": 3,
    "question": "70 歳の男性。5 年前にParkinson 病と診断。現在はHoehn ＆Yahr ステージ\nⅢ。歩行は自立しているが、すくみ足、動作緩慢、姿勢反射障害を認め、屋内移動\nでバランスを崩すことがある。しゃがみ込みで後方への転倒歴あり。自宅は築30\n年の木造平屋である。\n　最優先して取り組むべき住環境整備はどれか。",
    "choices": {
      "ア": "浴槽の左側へのバスボードの設置",
      "イ": "上がり框の壁への手すりの設置",
      "ウ": "すり付け板の設置（段差は4 cm）",
      "エ": "簡易取り付け型洋式便座の設置",
      "オ": "畳を毛足の長いじゅうたんに変更"
    },
    "answer": "エ",
    "requiredSelections": 1,
    "officialAnswerNumber": "4",
    "explanation": "正答は4。Parkinson病の姿勢反射障害があり、しゃがみ込みで後方へ転倒した既往があるため、和式トイレでの深いしゃがみ込みを避けることが優先される。簡易取り付け型の洋式便座により座位で排泄し、必要に応じて手すりなども検討する。住宅改修は歩行しやすさだけでなく、本人が実際に転倒した動作を特定して優先順位を付ける。玄関や浴室の設備も必要に応じて評価するが、本問で直接示された危険は排泄時などのしゃがみ込みである。",
    "choiceExplanations": {
      "ア": "誤り。バスボードは浴槽への出入りを補助する設備だが、症例にはしゃがみ込みでの後方転倒が明示されている。提示情報から最優先するのは、深いしゃがみ込みを減らす洋式便座である。",
      "イ": "誤り。上がり框の手すりは玄関昇降の安定に役立つ場合がある。ただし本問では玄関での転倒より、しゃがみ込みによる後方転倒が具体的に示され、4の整備が優先される。",
      "ウ": "誤り。すり付け板は段差をなだらかにするが、すくみ足や姿勢反射障害への適合を別に評価する必要がある。しゃがみ込みでの転倒を直接避ける整備としては4が適切である。",
      "エ": "正しい。和式便器に取り付ける洋式便座を用いれば深いしゃがみ込みを避けられ、座位で排泄できる。症例の転倒歴と姿勢反射障害に対して直接的な環境調整である。",
      "オ": "誤り。毛足の長いじゅうたんは足や杖が引っ掛かり、歩き始めや方向転換を妨げるおそれがある。すくみ足のある患者では、段差や不安定な敷物を減らす視点が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q10-figure.png"
    ],
    "imageAltTexts": [
      "厚生労働省第61回作業療法士午後10の原図。1から5の順に、浴槽の左側へのバスボードの設置、上がり框の壁への手すりの設置、すり付け板の設置（段差は4 cm）、簡易取り付け型洋式便座の設置、畳を毛足の長いじゅうたんに変更。動作・配置は各選択肢の原図を参照。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q10-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q10-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q10-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q10-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q10-choice-5.png"
    }
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q11",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 11,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "身体障害作業療法",
    "topicTags": [
      "Parkinson病",
      "輪の移動",
      "運動機能",
      "作業活動"
    ],
    "difficulty": 3,
    "question": "64 歳の女性。Parkinson 病。Hoehn&Yahr の重症度分類ステージⅢ。薬物コン\nトロールで、屋内での伝い歩きはできている。\n　運動機能の維持を目的とした作業療法で最も適切なのはどれか。",
    "choices": {
      "ア": "卓 球",
      "イ": "刺し子",
      "ウ": "塗り絵",
      "エ": "ペグ移動",
      "オ": "輪の移動"
    },
    "answer": "オ",
    "requiredSelections": 1,
    "officialAnswerNumber": "5",
    "explanation": "正答は5。Hoehn＆YahrステージIIIでは姿勢保持の問題を考慮しながら、残っている運動機能を使う活動を選ぶ。図5の輪の移動は座位で支持面を保ちつつ、上肢を大きく伸ばして対象に到達する反復運動を行える。刺し子・塗り絵・ペグ移動は主に手指の細かな操作が中心であり、輪の移動ほど大きな運動を引き出しにくい。卓球は立位で素早い反応や姿勢の変化を要する。活動の意味や本人の好みも大切だが、本問では運動機能維持と安全な課題設定に注目する。",
    "choiceExplanations": {
      "ア": "誤り。卓球は立位での素早い反応や方向転換、バランス調整を求める。屋内で伝い歩きの状態にあるステージIIIの症例では、提示された活動の中で最も安全に選べる課題ではない。",
      "イ": "誤り。刺し子は手指の巧緻性や集中を使う活動だが、比較的小さな動作を続ける課題である。大きな上肢運動を繰り返して運動機能を維持するという本問の狙いでは5が優れる。",
      "ウ": "誤り。塗り絵は手指の操作や視覚と運動の協応を用いるが、動作が机上の小さな範囲に限られやすい。上肢の大きなリーチを引き出す輪の移動が、本問の目的により合う。",
      "エ": "誤り。ペグ移動はつまみや手指の巧緻動作を練習する課題である。使用目的として不適切とは限らないが、ステージIIIの症例で広い範囲の運動を引き出す選択としては5が適切である。",
      "オ": "正しい。図5では座位で姿勢を安定させながら、輪を持ち上げて上肢を大きく伸ばす動作を反復できる。能力に応じて位置や範囲を調整し、運動機能の維持を図る活動である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q11-figure.png"
    ],
    "imageAltTexts": [
      "厚生労働省第61回作業療法士午後11の原図。1から5の順に、卓 球、刺し子、塗り絵、ペグ移動、輪の移動。動作・配置は各選択肢の原図を参照。"
    ],
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q11-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q11-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q11-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q11-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot61-pm-remaining15/q11-choice-5.png"
    }
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q57",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 57,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "解剖学",
    "topicTags": [
      "尿路",
      "膀胱三角",
      "代替単独正答"
    ],
    "difficulty": 3,
    "question": "尿路で正しいのはどれか。",
    "choices": {
      "ア": "男性の尿道は前立腺を貫く。",
      "イ": "内尿道口は膀胱尖部に開く。",
      "ウ": "内尿道括約筋は横紋筋である。",
      "エ": "尿管口は膀胱底部に開口する。",
      "オ": "膀胱の粘膜は線毛上皮である。"
    },
    "answer": [
      "ア",
      "エ"
    ],
    "requiredSelections": 1,
    "officialAnswerNumber": "1・4",
    "explanation": "公式の採点上、1または4を単独で選ぶと正解になる。男性尿道の前立腺部は前立腺を通り、尿管は膀胱底部の尿管口へ開くため、両者とも正しい記述である。原問には二つ選ぶ指示がなく、公式通知は複数の選択肢を正解として採点するとしている。1と4を同時に選ぶ複数選択問題へ変更してはならない。内尿道口は膀胱頸部にあり、内尿道括約筋は平滑筋である。膀胱粘膜の上皮は尿量の変化に対応する尿路上皮で、線毛上皮ではない。",
    "choiceExplanations": {
      "ア": "正しい。男性尿道には前立腺を通る前立腺部があり、その後に膜様部、海綿体部へ続く。公式正答1として、この肢を単独で選ぶ場合に正解と認められる。",
      "イ": "誤り。内尿道口は尿が膀胱から尿道へ出る膀胱頸部に位置する。膀胱尖部は前方に向かう部分であり、内尿道口がそこに開くという位置関係は正しくない。",
      "ウ": "誤り。内尿道括約筋は平滑筋で、自律神経による調節を受ける。横紋筋からなり随意的な制御に関係するのは外尿道括約筋で、両者を区別する。",
      "エ": "正しい。左右の尿管口は膀胱底部に開き、内尿道口とともに膀胱三角の頂点を形成する。公式正答4として、この肢を単独で選んでも正解と認められる。",
      "オ": "誤り。膀胱粘膜は伸展に対応する尿路上皮、すなわち移行上皮で覆われる。線毛によって内容物を送る上皮ではなく、線毛上皮という記述は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken08_09/dl/kyoutu_PM57.pdf",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/25-2-gross-anatomy-of-urine-transport"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q68",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 68,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "生理学",
    "topicTags": [
      "男性生殖器",
      "自律神経",
      "代替単独正答"
    ],
    "difficulty": 3,
    "question": "男性生殖器で正しいのはどれか。",
    "choices": {
      "ア": "勃起中枢は腰髄にある。",
      "イ": "射精は交感神経の作用による。",
      "ウ": "機能的な精子形成は50 日かかる。",
      "エ": "射精時は膀胱内括約筋が収縮する。",
      "オ": "精子の射精後腟内での寿命は12 時間である。"
    },
    "answer": [
      "イ",
      "エ"
    ],
    "requiredSelections": 1,
    "officialAnswerNumber": "2・4",
    "explanation": "公式の採点上、2または4を単独で選ぶと正解になる。射精では交感神経が精液の尿道への送り込みや膀胱頸部の閉鎖に関与する。膀胱内括約筋の収縮は、精液が膀胱へ逆流することを防ぐ。精液の体外への射出には体性神経による筋収縮も関係するため、射精の全過程が交感神経だけで完結すると解釈しない。勃起の副交感神経中枢は仙髄である。精子形成に要する期間や女性生殖路内での生存期間も、肢に示された数値とは異なる。二肢同時選択へ変更しない。",
    "choiceExplanations": {
      "ア": "誤り。反射性勃起に関与する副交感神経中枢は仙髄S2～S4にある。射精に関係する胸腰髄の交感神経系と、勃起の仙髄中枢を取り違えない。",
      "イ": "正しい。交感神経は精管などの収縮による精液の送り込みや膀胱頸部の閉鎖に関与する。射出には体性神経も関係するが、公式はこの肢を単独の正答2として認めている。",
      "ウ": "誤り。精巣での精子形成には一般に約2か月以上を要し、精巣上体での成熟・輸送も関係する。機能的な精子形成を50日で完了するとする記述は、本問の公式正答ではない。",
      "エ": "正しい。射精時には膀胱頸部の内括約筋が収縮して、精液の膀胱への逆流を防ぐ。この肢も公式正答4として単独選択で正解と認められている。",
      "オ": "誤り。射精後の精子の生存は環境に左右され、女性生殖路内では条件が整うと数日間生存し得る。腟内での寿命を一律に12時間とする記述は、公式正答として採用されていない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken08_09/dl/kyoutu_PM68.pdf"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-pm-q75",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2025,
    "season": "annual",
    "qNumber": 75,
    "examDate": "2026-02-23",
    "type": "multiple-choice",
    "category": "臨床医学",
    "topicTags": [
      "ショック",
      "呼吸促迫",
      "徐脈",
      "代替単独正答"
    ],
    "difficulty": 3,
    "question": "ショックの症状はどれか。",
    "choices": {
      "ア": "血圧上昇",
      "イ": "呼吸促迫",
      "ウ": "徐　脈",
      "エ": "多　尿",
      "オ": "皮膚紅潮"
    },
    "answer": [
      "イ",
      "ウ"
    ],
    "requiredSelections": 1,
    "officialAnswerNumber": "2・3",
    "explanation": "公式の採点上、2または3を単独で選ぶと正解になる。ショックは全身の組織への灌流が不足した状態で、呼吸促迫はその際にみられる。多くのショックでは頻脈を呈するが、神経原性ショックなどでは徐脈がみられるため、徐脈を一律に否定できない。公式通知は複数の正解があるとして採点上の取扱いを示した。血圧・尿量・皮膚所見は病型や時期によって異なるので、低血圧や冷汗が全ての例で必須と断定しない。原問は一つ選ぶ形式であり、2と3の同時選択を正解にしない。",
    "choiceExplanations": {
      "ア": "公式正答ではない。ショックでは有効な循環・組織灌流が不足し、低血圧が問題となることが多い。初期に血圧が保たれる場合はあるが、血圧上昇を一般的なショック症状として選ぶ肢ではない。",
      "イ": "正しい。組織への酸素供給低下や代謝性アシドーシスなどに伴い、呼吸数が増える呼吸促迫を呈し得る。公式正答2として、この肢を単独で選ぶ場合に正解と認められる。",
      "ウ": "正しい。ショックを常に頻脈と限定することはできず、交感神経活動が低下する神経原性ショックなどでは徐脈を呈し得る。公式正答3として単独選択でも正解と認められる。",
      "エ": "公式正答ではない。腎への灌流が低下すると通常は尿量が減少し、乏尿が重症度評価の一つとなる。多尿は本問でショックの正答症状として認められていない。",
      "オ": "公式正答ではない。循環不全では蒼白や冷感がみられる一方、血管分布異常性ショックでは温かい皮膚や紅潮もあり得る。本問の公式正答は2・3であり、紅潮が全病型で起こらないと断言はしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午後）。正答・採点上の取扱いは公式発表に照合。",
    "license": "MHLW-attributed",
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken08_09/dl/kyoutu_PM75.pdf",
      "https://benthamopenarchives.com/abstract.php?ArticleCode=TOPEDJ-7-16"
    ]
  }
];
