import type { Question } from "@/lib/questions/types";

export const CHUSHO_2023_D_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 1,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産活動の評価指標",
    "topicTags": [
      "生産活動の評価指標"
    ],
    "difficulty": 3,
    "question": "生産活動における評価指標の算出に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 単位時間当たりに処理される仕事量を測る尺度として、歩留りを求めた。\nｂ 生産可能量に対する実際生産量の比率として、操業度を求めた。\nｃ 産出量に対する投入量の比率として、生産性を求めた。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正",
      "ウ": "ａ：誤 ｂ：正 ｃ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "歩留りは投入に対し有効な産出がどれだけ得られたかを表す。操業度は実際生産量÷生産可能量で、生産性は産出量÷投入量である。",
    "choiceExplanations": {
      "ア": "歩留りは投入量に対する良品や有効な産出量の割合である。単位時間当たりの処理量を表すａは誤りである。",
      "イ": "操業度は生産可能量に対する実際生産量の割合なのでｂは正しい。生産性は産出量を投入量で除した値である。",
      "ウ": "ａの歩留りは時間当たりの処理量ではない。ｃも生産性の分母と分子を逆にしている。",
      "エ": "歩留りは投入に対し有効な産出がどれだけ得られたかを表す。操業度は実際生産量÷生産可能量で、生産性は産出量÷投入量である。",
      "オ": "生産可能量のどれだけを実際に生産したかを示すｂは操業度である。ｃは生産性の定義と分子・分母が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 2,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "工場レイアウト",
    "topicTags": [
      "工場レイアウト"
    ],
    "difficulty": 3,
    "question": "工場レイアウトに関する以下の文章の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。工場レイアウトの設計や分析のための代表的な手法として、SLP と DI 分析がある。SLP は、施設（工場）に配置される対象をアクティビティと定義し、そのアクティビティ間の Ａ と Ｂ に基づいてレイアウトを設計する手法である。DI 分析は、施設（工場）のレイアウトを運搬に着目して分析し、 Ｃ と運搬回数や物流量などの強度を ２ 次元平面上にプロットすることにより、運搬の無駄によるレイアウトの課題を発見する手法である。",
    "choices": {
      "ア": "Ａ：作業の流れ Ｂ：関連性の強さ Ｃ：運搬距離",
      "イ": "Ａ：作業の流れ Ｂ：信頼性の強さ Ｃ：運搬時間",
      "ウ": "Ａ：物の流れ Ｂ：関連性の強さ Ｃ：運搬距離",
      "エ": "Ａ：物の流れ Ｂ：関連性の強さ Ｃ：運搬時間",
      "オ": "Ａ：物の流れ Ｂ：信頼性の強さ Ｃ：運搬距離"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "SLPは物の流れと活動間の関連性から配置を決める。DI分析では運搬距離と運搬頻度・量などの強度を組み合わせ、改善すべき運搬を見つける。",
    "choiceExplanations": {
      "ア": "関連性の強さと運搬距離は合っている。SLPでは物の流れを分析して、配置すべき活動の相互関係を調べる。",
      "イ": "DI分析のDはDistanceで、運搬時間ではなく距離である。SLPでは活動間の関連性の強さを用いる。",
      "ウ": "SLPは物の流れと活動間の関連性から配置を決める。DI分析では運搬距離と運搬頻度・量などの強度を組み合わせ、改善すべき運搬を見つける。",
      "エ": "SLPの二つの観点は正しい。DI分析で強度に対応させるのは運搬距離である。",
      "オ": "活動の近接がどれだけ必要かを表すのが関連性の強さである。信頼性の強さを分析する手法ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 3,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "バリュー・エンジニアリング",
    "topicTags": [
      "バリュー・エンジニアリング"
    ],
    "difficulty": 3,
    "question": "VE における製品の機能に関する以下の文章の空欄Ａ～Ｄに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。VE では機能を、性質、重要度、必要性など使用者の視点から分類している。機能の性質から見ると、製品やサービスの使用目的に関わる Ａ 機能と、製品の形や色彩、つまりデザイン的な特徴からくる Ｂ 機能に分類される。機能の重要度から見ると、果たすべき複数の機能のうち最も目的的な Ｃ 機能と、 Ｃ 機能を達成するための手段的かつ補助的な Ｄ 機能に分類される。機能の必要性から見ると、使用者や顧客が必要とする必要機能と、使用者や顧客が必要としない不必要機能に分類される。",
    "choices": {
      "ア": "Ａ：基本 Ｂ：二次 Ｃ：使用 Ｄ：魅力（貴重）",
      "イ": "Ａ：基本 Ｂ：二次 Ｃ：魅力（貴重） Ｄ：使用",
      "ウ": "Ａ：使用 Ｂ：二次 Ｃ：基本 Ｄ：魅力（貴重）",
      "エ": "Ａ：使用 Ｂ：魅力（貴重） Ｃ：基本 Ｄ：二次",
      "オ": "Ａ：魅力（貴重） Ｂ：使用 Ｃ：基本 Ｄ：二次"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "性質では目的に関わる使用機能と形や色の魅力機能に分ける。重要度では目的を担う基本機能とその補助手段の二次機能に分ける。",
    "choiceExplanations": {
      "ア": "機能の性質を分けるのは使用機能と魅力機能である。基本と二次は重要度による区分である。",
      "イ": "基本機能と二次機能は目的と手段の関係を表す。使用目的とデザイン上の価値を分けるときの用語ではない。",
      "ウ": "Ａの使用機能とＣの基本機能は正しい。デザインによる特徴は魅力機能、基本機能を助けるものは二次機能である。",
      "エ": "性質では目的に関わる使用機能と形や色の魅力機能に分ける。重要度では目的を担う基本機能とその補助手段の二次機能に分ける。",
      "オ": "重要度の分類は合っている。性質の分類では使用目的に関わるのが使用機能、形・色などがもたらすのが魅力機能である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 4,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "製品開発と製品設計",
    "topicTags": [
      "製品開発と製品設計"
    ],
    "difficulty": 3,
    "question": "製品開発・製品設計の活動に関する以下のａ～ｃの記述と用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 製品における部品構成や部品表などの情報を一元的に管理し、設計の変更と履歴を追跡した。\nｂ 生産工程の合理化・簡素化を期待し、あらかじめ準備したユニットを要求仕様に合わせて組み合わせる製品を開発した。\nｃ 新製品の設計段階で、関連するさまざまな部門からの代表者などが検討することにより、設計の矛盾や誤りを排除した。",
    "choices": {
      "ア": "ａ：CAM ｂ：アジャイル開発 ｃ：コンカレントエンジニアリング",
      "イ": "ａ：CAM ｂ：モジュール設計 ｃ：デザインレビュー",
      "ウ": "ａ：PDM ｂ：アジャイル開発 ｃ：コンカレントエンジニアリング",
      "エ": "ａ：PDM ｂ：モジュール設計 ｃ：デザインレビュー"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "部品表などの情報管理はPDM、ユニットの組合せはモジュール設計、設計段階での関係部門による審査はデザインレビューに当たる。",
    "choiceExplanations": {
      "ア": "CAMはコンピューターで製造を支援する仕組みである。部品構成や設計変更履歴の一元管理はPDMが担う。",
      "イ": "ユニットを組み合せるのはモジュール設計である。部品表や設計変更履歴の管理はCAMではなくPDMである。",
      "ウ": "ａのPDMは正しい。要求に応じて既存ユニットを構成するのはモジュール設計で、関係者が設計を検証するのはデザインレビューである。",
      "エ": "部品表などの情報管理はPDM、ユニットの組合せはモジュール設計、設計段階での関係部門による審査はデザインレビューに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 5,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "循環型社会と再使用",
    "topicTags": [
      "循環型社会と再使用"
    ],
    "difficulty": 3,
    "question": "循環型社会形成推進基本法における再使用の定義に区分される記述の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ インクジェットプリンタのカートリッジを回収して洗浄し、インクを充填して販売した。\nｂ 飲み終わったビール瓶を回収し、溶解して再生した。\nｃ ペットボトルを回収して衣類の原料として活用した。\nｄ 回収されたテレビを分解して一部の部品を取り出し、他のテレビの修理に使用した。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｂとｄ",
      "ウ": "ａとｄ",
      "エ": "ｂとｃとｄ",
      "オ": "ｃとｄ"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "容器を洗って詰め直すａと、回収した機器の一部を部品として用いるｄは再使用である。ｂとｃは原材料として使う再生利用である。",
    "choiceExplanations": {
      "ア": "カートリッジを再利用するａは再使用に当たる。ビール瓶を溶解して再生するｂは素材としての再生利用である。",
      "イ": "ａとｄでは製品や部品をその形を保って利用する。瓶を溶かすｂは原材料として利用するため再使用から外れる。",
      "ウ": "容器を洗って詰め直すａと、回収した機器の一部を部品として用いるｄは再使用である。ｂとｃは原材料として使う再生利用である。",
      "エ": "ｂの溶解とｃの衣類原料への利用は、いずれも回収品を原材料として使う再生利用に当たる。",
      "オ": "回収したペットボトルを衣類原料にするｃは再生利用である。製品として再度使うａと部品を使うｄが再使用である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 6,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ラインバランス",
    "topicTags": [
      "ラインバランス"
    ],
    "difficulty": 3,
    "question": "下表のように設定されたライン生産の状況から計算された、⒜バランスロスと⒝１ 時間当たりの生産量の値（個）として、最も適切な組み合わせを下記の解答群から選べ。ただし、サイクルタイムは 30 秒とし、生産立ち上げ期間は考慮しない。",
    "choices": {
      "ア": "⒜：12.5 ％ ⒝： 30 個",
      "イ": "⒜：12.5 ％ ⒝：120 個",
      "ウ": "⒜：26.5 ％ ⒝： 30 個",
      "エ": "⒜：87.5 ％ ⒝： 30 個",
      "オ": "⒜：87.5 ％ ⒝：120 個"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "総作業時間は105秒で、4工程×30秒の120秒に対し15秒が余る。バランスロスは12.5％、1時間当たりの生産量は3,600÷30＝120個である。",
    "choiceExplanations": {
      "ア": "バランスロス12.5％は正しい。30はサイクルの秒数なので、1時間当たり数量は3,600秒÷30秒となる。",
      "イ": "総作業時間は105秒で、4工程×30秒の120秒に対し15秒が余る。バランスロスは12.5％、1時間当たりの生産量は3,600÷30＝120個である。",
      "ウ": "用意された120秒から正味の作業時間105秒を引くと15秒なので、ロスは15÷120である。1時間の経過秒数から生産数も計算する。",
      "エ": "87.5％は120秒に占める正味作業の割合で、ライン効率である。ロスは1からこれを引く。",
      "オ": "120個という数量は正しい。87.5％は効率であり、バランスロスは残りの12.5％である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q6.png"
    ],
    "imageAltTexts": [
      "工程1はＡ10秒とＢ15秒、工程2はＣ28秒、工程3はＤ10秒・Ｅ15秒・Ｆ5秒、工程4はＧ18秒とＨ4秒を担当する。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 7,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ストラクチャ型部品表",
    "topicTags": [
      "ストラクチャ型部品表"
    ],
    "difficulty": 3,
    "question": "以下のストラクチャ型部品表に基づいた記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "製品Ｘを 10 個生産するために、部品Ｂは 10 個必要である。",
      "イ": "製品Ｘを 10 個生産するために、部品Ｃは 40 個必要である。",
      "ウ": "製品Ｘを 10 個生産するために、部品Ｄは 40 個必要である。",
      "エ": "部品Ｂを 20 個生産するために、部品Ｃは 40 個必要である。",
      "オ": "部品Ｂを 20 個生産するために、部品Ｄは 60 個必要である。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "ＣはＸに直接2個必要になり、Ｘに必要なＢ2個も各1個のＣを使う。Ｘ10個で直接分20個とＢ向け20個の計40個となる。",
    "choiceExplanations": {
      "ア": "製品Ｘ1個にＢが2個必要である。Ｘを10個作るときはＢを20個用意する。",
      "イ": "ＣはＸに直接2個必要になり、Ｘに必要なＢ2個も各1個のＣを使う。Ｘ10個で直接分20個とＢ向け20個の計40個となる。",
      "ウ": "Ｘ1個に直接使うＤは2個で、Ｂ2個にもＤが各2個必要になる。Ｘ10個でのＤの合計は60個である。",
      "エ": "Ｂ1個につきＣは1個である。Ｂ20個を作る分のＣは20個となる。",
      "オ": "Ｂ20個にはＤが40個必要である。60個はＸ10個に直接使うＤ20個まで含めた数量である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q7.png"
    ],
    "imageAltTexts": [
      "製品Ｘ1個にＡ1個、Ｂ2個、Ｃ2個、Ｄ2個を直接使用する。部品Ｂ1個にはＣ1個とＤ2個を使用する。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 8,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "PERT",
    "topicTags": [
      "PERT"
    ],
    "difficulty": 3,
    "question": "以下は、あるプロジェクトにおける PERT 図であり、各作業の作業所要時間の予定が記載されている。この図のプロジェクトに関する記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "作業Ｃの終了時刻が ２ 時間早くなった場合、プロジェクトの完了時刻が ２ 時間早くなる。",
      "イ": "作業Ｅの開始時刻が ２ 時間早くなった場合、プロジェクトの完了時刻が ２ 時間早くなる。",
      "ウ": "作業Ｆの作業所要時間が １ 時間短くなった場合、プロジェクトの完了時刻は変わらない。",
      "エ": "作業Ｆの作業所要時間が ２ 時間短くなった場合、クリティカルパスは変わらない。",
      "オ": "作業Ｈの作業所要時間が ２ 時間長くなった場合、クリティカルパスは変わらない。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "当初の最長経路はＣ・Ｆ・Ｈ・Ｉで19時間である。ここに含まれるＨを2時間長くしても、この経路が引き続き最長になる。",
    "choiceExplanations": {
      "ア": "Ｃに続くＣ・Ｆ・Ｈ・Ｉの経路は当初19時間である。Ｃが2時間短縮されてもＢ・Ｅ・Ｇ・Ｉの18時間が残るため、全体の短縮は1時間である。",
      "イ": "Ｅを含むＢ・Ｅ・Ｇ・Ｉの経路は18時間である。Ｅの開始を早めても別経路のＣ・Ｆ・Ｈ・Ｉの19時間は変わらない。",
      "ウ": "Ｆを1時間短縮するとＣ・Ｆ・Ｈ・Ｉの所要時間は19時間から18時間になる。他の経路の最長も18時間なので全体は1時間短くなる。",
      "エ": "Ｆを2時間短縮するとＣ経由は17時間になる。Ｂ・Ｅ・Ｇ・Ｉの18時間が最長となってクリティカルパスが変わる。",
      "オ": "当初の最長経路はＣ・Ｆ・Ｈ・Ｉで19時間である。ここに含まれるＨを2時間長くしても、この経路が引き続き最長になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q8.png"
    ],
    "imageAltTexts": [
      "PERT図。節点1から2へＡが3時間、1から3へＢが4時間、1から5へＣが5時間、2から4へＤが5時間、3から4へＥが6時間、5から6へＦが6時間、4から7へＧが5時間、6から7へＨが5時間、7から8へＩが3時間。3から6に所要時間0の破線がある。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 9,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ディスパッチングルール",
    "topicTags": [
      "ディスパッチングルール"
    ],
    "difficulty": 3,
    "question": "下表の ５ つの Job が、ある １ つの設備で作業を実施されるために、順番に到着して待機している。ただし、納期は最初の作業を開始する時刻を起点とした値である。また、 ５ つの Job は連続して処理される。最初の作業が開始されてからすべての Job の作業が完了するまでの期間において、各 Job の作業待ち時間の合計値が最小になるディスパッチングルールを、下記の解答群から選べ。",
    "choices": {
      "ア": "作業時間が長い順に作業する。",
      "イ": "作業時間が短い順に作業する。",
      "ウ": "到着が遅い順に作業する。",
      "エ": "到着が早い順に作業する。",
      "オ": "納期が早い順に作業する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "全作業が待機しているので、短い作業を先に処理すると後続作業の待ち時間が短くなる。J2、J1、J3、J5、J4の順で合計50時間である。",
    "choiceExplanations": {
      "ア": "作業時間が長い仕事を先にすると、多くの仕事を待たせる。長い順では合計70時間となり、短い順の50時間を上回る。",
      "イ": "全作業が待機しているので、短い作業を先に処理すると後続作業の待ち時間が短くなる。J2、J1、J3、J5、J4の順で合計50時間である。",
      "ウ": "到着と逆のJ5、J4、J3、J2、J1の順では待ち時間の合計が68時間になる。作業時間が短い順より大きい。",
      "エ": "到着順ではJ4がJ5より先だが、J4の処理時間の方が長い。この二つを入れ替え、先頭も短いJ2にすれば、合計を52時間から50時間に減らせる。",
      "オ": "早い納期の順は納期の遅れに着目するルールである。設問のデータでの待ち時間合計は62時間となり最小ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q9.png"
    ],
    "imageAltTexts": [
      "到着順に作業時間、納期を示す。J1は5時間、30時間後。J2は4時間、45時間後。J3は6時間、25時間後。J4は8時間、35時間後。J5は7時間、40時間後。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 10,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "工数管理と余力管理",
    "topicTags": [
      "工数管理と余力管理"
    ],
    "difficulty": 3,
    "question": "工数管理や余力管理に関する以下のａ～ｄの記述と用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 仕事量の全体を表す尺度で、仕事を １ 人の作業者で遂行するのに要する時間。\nｂ 各工程または個々の作業者における、現在の作業負荷状態と現有作業能力の差。\nｃ 作業習熟や改善活動、設計改良などによって作業時間を減らすこと。\nｄ 作業の実施時期をずらすなどにより生産の負荷平準化を行うこと。",
    "choices": {
      "ア": "ａ：工数 ｂ：作業余裕 ｃ：工数低減ｄ：工程編成",
      "イ": "ａ：工数 ｂ：余力 ｃ：工数低減ｄ：工数の山積山崩",
      "ウ": "ａ：工程能力 ｂ：工程能力指数 ｃ：工程分割ｄ：工数低減",
      "エ": "ａ：標準時間 ｂ：作業余裕 ｃ：工程分割ｄ：工数の山積山崩",
      "オ": "ａ：標準時間 ｂ：余力 ｃ：工数の山積山崩ｄ：工程編成"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "1人当たりの所要時間で示す仕事量が工数、能力と負荷の差が余力である。作業時間の削減は工数低減で、負荷の時期を調整するのは工数の山積山崩である。",
    "choiceExplanations": {
      "ア": "ｂは能力から負荷を差し引いた余力である。ｄの時期を移す作業は工数の山積山崩に当たる。",
      "イ": "1人当たりの所要時間で示す仕事量が工数、能力と負荷の差が余力である。作業時間の削減は工数低減で、負荷の時期を調整するのは工数の山積山崩である。",
      "ウ": "工程能力は所定の品質を安定して出せる能力に関わる。ａのように必要な作業量を人時で測る指標は工数である。",
      "エ": "ｄの山積山崩は正しい。習熟や改善による作業時間の短縮は工程分割ではなく工数低減である。",
      "オ": "ｂの余力は正しい。ｃは1件当たりの所要工数を減らす活動で、負荷を時期ごとに平準化する山積山崩とは別である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 11,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "経済的発注量",
    "topicTags": [
      "経済的発注量"
    ],
    "difficulty": 3,
    "question": "経済的発注量に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "１ 個 １ 期当たりの在庫保管費が増え、 １ 回当たりの発注費が減少した場合、経済的発注量は増える。",
      "イ": "１ 個 １ 期当たりの在庫保管費が変化せず、 １ 回当たりの発注費が増えた場合、経済的発注量は減る。",
      "ウ": "経済的発注量で発注する場合、在庫保管費用と発注費用が等しくなる。",
      "エ": "経済的発注量で発注する場合、在庫保管費用より発注費用が高くなる。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "標準の経済的発注量では、1回の数量を増やすと発注費の合計が減り、平均在庫の保管費が増える。合計を最小にする数量ではこの二つの費用が等しい。",
    "choiceExplanations": {
      "ア": "経済的発注量は発注費が減るほど小さくなり、単位当たり保管費が増えるほど小さくなる。両方とも発注量の減少方向に働く。",
      "イ": "1回当たりの発注費が高いと、1回の発注量を増やして発注回数を減らすのが有利になる。保管費が一定なら最適発注量は大きくなる。",
      "ウ": "標準の経済的発注量では、1回の数量を増やすと発注費の合計が減り、平均在庫の保管費が増える。合計を最小にする数量ではこの二つの費用が等しい。",
      "エ": "経済的発注量より発注量が少なければ、発注費の方が高くなる。最適数量においては両者が等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 12,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "品質改善の技法",
    "topicTags": [
      "品質改善の技法"
    ],
    "difficulty": 3,
    "question": "品質改善に関する以下の文章において、空欄Ａ～Ｃに入る品質管理に用いる技法の組み合わせとして、最も適切なものを下記の解答群から選べ。ある職場において不適合品の多発という問題が起きている。問題とその要因の関係を明らかにするために Ａ を作成した。その結果から、問題を解決するための手段の候補を明らかにすることで、 Ｂ を作成した。実際に、問題解決に向けた対策の実行スケジュールを決めるためにアローダイアグラムを作成し、さらに、想定外の事態などが起きた場合に備えて Ｃ を用いた検討を行った。",
    "choices": {
      "ア": "Ａ：親和図 Ｂ：系統図 Ｃ：PDPC 法",
      "イ": "Ａ：親和図 Ｂ：系統図 Ｃ：マトリックス図",
      "ウ": "Ａ：親和図 Ｂ：散布図 Ｃ：管理図",
      "エ": "Ａ：連関図 Ｂ：系統図 Ｃ：PDPC 法",
      "オ": "Ａ：連関図 Ｂ：散布図 Ｃ：マトリックス図"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "連関図で問題と要因のつながりを捉え、系統図で目的を達成する手段を展開する。PDPC法では想定外の事態とその代替手段を洗い出す。",
    "choiceExplanations": {
      "ア": "親和図は雑多な言語情報を似た内容ごとにまとめる。複雑な因果や相互関係の整理に使うＡは連関図である。",
      "イ": "Ｂの系統図は合っている。想定外の事態を予測して対応を検討するＣにはPDPC法を使う。",
      "ウ": "散布図は二つの値の関係、管理図は工程変動の監視に使う。対策候補の展開と不測事態への備えには系統図とPDPC法が適する。",
      "エ": "連関図で問題と要因のつながりを捉え、系統図で目的を達成する手段を展開する。PDPC法では想定外の事態とその代替手段を洗い出す。",
      "オ": "Ａの連関図は正しい。Ｂには手段の階層を表す系統図、Ｃには望ましくない事態への対応を検討するPDPC法が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 13,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "進捗管理",
    "topicTags": [
      "進捗管理"
    ],
    "difficulty": 3,
    "question": "個別生産における進捗管理手法の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 差立て板\nｂ カムアップシステム\nｃ 製造三角図\nｄ 追番管理\nｅ ガントチャート",
    "choices": {
      "ア": "ａとｂとｃとｅ",
      "イ": "ａとｂとｅ",
      "ウ": "ａとｃ",
      "エ": "ｃとｄ",
      "オ": "ｄとｅ"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "差立て板は仕事を割り当て、カムアップシステムで組み立てに必要な部品の進み具合を把握する。ガントチャートは作業ごとの予定と実績の比較に使える。",
    "choiceExplanations": {
      "ア": "差立て板、カムアップシステム、ガントチャートは、個別の作業や部品の進捗を把握するのに使える。製造三角図は定常的な生産の管理に用いられる。",
      "イ": "差立て板は仕事を割り当て、カムアップシステムで組み立てに必要な部品の進み具合を把握する。ガントチャートは作業ごとの予定と実績の比較に使える。",
      "ウ": "個別生産では、複数部品の進み具合の確認や作業ごとの日程管理が必要となる。カムアップシステムやガントチャートがこれに使われる。",
      "エ": "同じ製品を繰り返す生産では、製造三角図や追番管理で予定数量と実績などの差を追える。個別の注文・作業には別の方法が適する。",
      "オ": "ガントチャートは個別生産にも使える。追番管理は反復生産の数量や順序を追うときに用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 14,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "運搬活性示数",
    "topicTags": [
      "運搬活性示数"
    ],
    "difficulty": 3,
    "question": "運搬活性示数は、対象品が置かれている状態から運び出されるまでに必要な取り扱いの手間数を表したものである。この運搬活性示数を、金属部品の加工職場で調査したところ、下表に示す分析結果が得られた。表内の空欄Ａ～Ｃの運搬活性示数を求め、この職場の平均活性示数の値として、最も近いものを下記の解答群から選べ。",
    "choices": {
      "ア": "0.75",
      "イ": "1.00",
      "ウ": "1.25",
      "エ": "1.50",
      "オ": "1.75"
    },
    "answer": [],
    "officialAnswerNumber": null,
    "explanation": "中小企業診断協会は2023年9月5日付の公式訂正で、この設問を不適切とし、受験者全員の解答を正解扱いにした。",
    "choiceExplanations": {
      "ア": "ばら置きと容器、パレット、台車に載った状態では、運び出しまでの手間が異なる。この設問は公式訂正で選択肢を問わず加点された。",
      "イ": "運搬活性示数は停滞状態から運び出しやすいほど大きくなる。公式では設問を不適切として全員を正解とした。",
      "ウ": "表では停滞している状態に示数が付され、移動中の項目との区別が必要になる。この設問は特定の数値が公式正答として指定されていない。",
      "エ": "パレット、容器、台車などの置き方を示数で区別する設問である。公表時の正答は公式訂正により取り消され、全員が加点された。",
      "オ": "平均値の算定では、どういう状態の項目を平均に含めるかを確認する必要がある。公式訂正で設問自体が不適切とされ、全員が正解扱いになった。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "officialScoring": {
      "kind": "credit-for-all",
      "reason": "中小企業診断協会は2023年9月5日付の公式訂正で、この設問を不適切とし、受験者全員の解答を正解扱いにした。"
    },
    "officialReferenceUrls": [
      "https://www.jf-cmca.jp/attach/test/r05/seikai_teisei_20230905.pdf"
    ],
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q14.png"
    ],
    "imageAltTexts": [
      "工程1ではパレット上の部品箱内で保管し、停滞時の活性示数はＡ。2ではフォークリフトで運搬する。3で設備前にばら置きし、4で加工を待つときの示数はＢ。5で加工し、6で設備前の容器に入れる。7で容器内で移動を待つときの示数は1。8で容器を台車に載せ、9で移動待ちとなったときの示数はＣ。10で次工程へ移動する。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q15-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 15,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "標準時間と余裕率",
    "topicTags": [
      "標準時間と余裕率"
    ],
    "difficulty": 3,
    "question": "金属部品を人手で加工する作業の標準時間を計算するためのデータとして、\n正味作業の観測時間： ５ 分／個\nレイティング係数：120\n内掛け法による余裕率：0.20の値を得た。このとき、下記の設問に答えよ。\n\n（設問1）\nこの作業に対する外掛け法による余裕率の値として、最も近いものはどれか。",
    "choices": {
      "ア": "0.15",
      "イ": "0.20",
      "ウ": "0.25",
      "エ": "0.30",
      "オ": "0.35"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "内掛けでは余裕時間を標準時間で割る。外掛けはそれを正味時間で割るので、0.20÷(1－0.20)＝0.25になる。",
    "choiceExplanations": {
      "ア": "内掛け0.20は余裕時間が標準時間の20％であることを示す。余裕時間を正味時間で割ると値は0.20より大きくなる。",
      "イ": "0.20は余裕時間を標準時間で割った内掛け値である。外掛けは残る標準時間の80％に当たる正味時間を分母にする。",
      "ウ": "内掛けでは余裕時間を標準時間で割る。外掛けはそれを正味時間で割るので、0.20÷(1－0.20)＝0.25になる。",
      "エ": "外掛けを0.30とすると内掛けは0.30÷1.30で約0.231になる。与えられた0.20とは異なる。",
      "オ": "外掛け0.35では、標準時間に占める余裕は0.35÷1.35で約0.259になる。内掛け0.20の換算値ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q15-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 15,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "標準時間と余裕率",
    "topicTags": [
      "標準時間と余裕率"
    ],
    "difficulty": 3,
    "question": "金属部品を人手で加工する作業の標準時間を計算するためのデータとして、\n正味作業の観測時間： ５ 分／個\nレイティング係数：120\n内掛け法による余裕率：0.20の値を得た。このとき、下記の設問に答えよ。\n\n（設問2）\nこの作業の標準時間として、最も近いものはどれか（単位：分／個）。",
    "choices": {
      "ア": "6.25",
      "イ": "6.50",
      "ウ": "7.00",
      "エ": "7.50",
      "オ": "7.75"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "レイティングを補正した正味時間は5×1.20＝6分である。これが標準時間の80％なので、6÷0.80＝7.50分となる。",
    "choiceExplanations": {
      "ア": "6.25分は観測時間5分に外掛け係数1.25を掛けた値である。正味時間にはレイティング120を反映する必要がある。",
      "イ": "正味時間は観測5分に1.2を掛けた6分である。外掛け余裕率0.25を適用すると、6.5分より大きくなる。",
      "ウ": "内掛け余裕率0.20の分母は標準時間である。正味6分を標準時間の80％として計算する必要がある。",
      "エ": "レイティングを補正した正味時間は5×1.20＝6分である。これが標準時間の80％なので、6÷0.80＝7.50分となる。",
      "オ": "標準時間から内掛け余裕分を除くと、正味時間6分に一致する必要がある。7.75×0.8は6.2分となり一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 16,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "作業者工程分析",
    "topicTags": [
      "作業者工程分析"
    ],
    "difficulty": 3,
    "question": "JIS で定義される作業者工程分析に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 作業者および作業者が取り扱う物を、工程図記号を使って分析する。\nｂ 「作業」、「検査」、「移動」、「手待ち」、「余裕」の ５ つの工程図記号が使われる。\nｃ 複合記号では、主となる工程を内側に、従となる工程を外側に書き表す。\nｄ 作業者が部品を組み立てる工程は、流れ線を合流させて書き表す。\nｅ 運搬作業者が物の運搬を行う工程は、「作業」の工程図記号を使って書き表す。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤 ｅ：正",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：正 ｅ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正 ｅ：誤",
      "エ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正 ｅ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：誤 ｄ：誤 ｅ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "作業者工程分析は人の行動を追うので、物の合流を示す図とは異なる。余裕は基本記号に含まれず、複合記号の主工程は外側で、運搬を担当する人の運搬はその人の作業に当たる。",
    "choiceExplanations": {
      "ア": "作業者工程分析は作業者の行動を追い、取り扱う物の流れと区別する。余裕はここに挙げる基本の工程図記号には含めない。",
      "イ": "組み立てでも作業者の流れは一つであり、製品工程分析のように部品の流れ線を合流させない。複合記号の主な工程と従う工程の位置も逆である。",
      "ウ": "作業者の流れを追う方法なので、組み立てを部品の流れ線の合流として描かない。通常業務として物を運ぶ作業者については、運搬がその人の作業である。",
      "エ": "複合記号では主な工程を外側に表す。製品を構成する部品の合流は製品工程分析で扱う。",
      "オ": "作業者工程分析は人の行動を追うので、物の合流を示す図とは異なる。余裕は基本記号に含まれず、複合記号の主工程は外側で、運搬を担当する人の運搬はその人の作業に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 17,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "割引回収期間",
    "topicTags": [
      "割引回収期間"
    ],
    "difficulty": 3,
    "question": "設備自動化のための投資案Ａ、Ｂ、Ｃの割引回収期間を計算したところ、表 １ の結果が得られた。さらに、投資案を分析するために、投資案Ａ、Ｂ、Ｃの中から任意の ２ つ（例えば、案Ａと案Ｂ）を選んで初期投資額の差と経費節減額の差をとった追加投資案の割引回収期間を計算したところ、表 ２ の結果が得られた。各投資案の正味現在価値利益 PA、PB、PC を大きい順に並べたときの順序として、最も適切なものを下記の解答群から選べ。投資の計画期間は 10 年間とする。",
    "choices": {
      "ア": "PA ＞ PB ＞ PC",
      "イ": "PA ＞ PC ＞ PB",
      "ウ": "PB ＞ PA ＞ PC",
      "エ": "PC ＞ PA ＞ PB",
      "オ": "PC ＞ PB ＞ PA"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "Ｂ－Ａは11年で計画の10年を超えるためＡがＢより大きい。Ｃ－Ａは9.0年で回収でき、正味現在価値の順はＣ、Ａ、Ｂとなる。",
    "choiceExplanations": {
      "ア": "Ｃ－Ａの追加投資は9.0年で割引回収できる。計画期間の10年より短いのでＣの現在価値がＡより大きい。",
      "イ": "Ｂ－Ａは10年で回収できずＡがＢを上回る。一方Ｃ－Ａは9.0年で回収でき、ＣはＡを上回る。",
      "ウ": "Ｂ－Ａの割引回収期間は11年である。10年の計画期間では追加分の正味現在価値が負になり、ＢはＡを下回る。",
      "エ": "Ｂ－Ａは11年で計画の10年を超えるためＡがＢより大きい。Ｃ－Ａは9.0年で回収でき、正味現在価値の順はＣ、Ａ、Ｂとなる。",
      "オ": "ＣはＢとＡのいずれに対しても追加投資を期間内に回収できる。ＢはＡに対する追加分を回収できないのでＡを下回る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q17.png"
    ],
    "imageAltTexts": [
      "各案の初期投資額、年間節減額、割引回収期間は、Ａが1,500万円、380万円、4.9年。Ｂが2,000万円、450万円、5.7年。Ｃが3,500万円、700万円、6.6年。追加投資案も同じ順で、Ｂ－Ａは500万円、70万円、11.0年。Ｃ－Ｂは1,500万円、250万円、8.5年。Ｃ－Ａは2,000万円、320万円、9.0年。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 18,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "工程改善",
    "topicTags": [
      "工程改善"
    ],
    "difficulty": 3,
    "question": "生産ラインでの改善活動に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "工程間での物の運搬回数を抑制するために、「運搬ロットサイズ」を削減した。",
      "イ": "工程が統計的管理状態にあるかどうかを評価するために、「解析用管理図」を作成した。",
      "ウ": "生産ラインでのボトルネック作業を特定するために、「ECRS の原則」を適用した。",
      "エ": "生産ライン内での物の移動距離を短縮するために、生産ラインを「Ｕ字化」した。",
      "オ": "設備の誤操作による労働災害を防ぐために、「フェイルセーフ」の仕組みを取り入れた。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "解析用管理図は、過去に観測したデータから工程が統計的管理状態にあるかを調べるために使う。管理状態が分かれば維持や改善に利用できる。",
    "choiceExplanations": {
      "ア": "運搬量が同じであれば、1回のロットを小さくすると必要な運搬回数は多くなる。回数削減が目的なら、ロット縮小だけでは逆効果になる。",
      "イ": "解析用管理図は、過去に観測したデータから工程が統計的管理状態にあるかを調べるために使う。管理状態が分かれば維持や改善に利用できる。",
      "ウ": "ECRSは排除、結合、順序や配置の変更、簡素化という改善の着眼点である。処理能力から制約工程を見つける分析とは目的が異なる。",
      "エ": "Ｕ字ラインは入口と出口を近付け、作業者が複数工程を担当しやすくする。製品の流れる工程間の移動距離まで必ず短くなるわけではない。",
      "オ": "誤操作を起こせないようにする設計はフールプルーフと呼ばれる。フェイルセーフは故障などが起きたときに安全側へ移行させる設計である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 19,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "TPMの自主保全",
    "topicTags": [
      "TPMの自主保全"
    ],
    "difficulty": 3,
    "question": "TPM の自主保全に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 点検を除いた、清掃、給油、増し締めの ３ 項目は、自主保全で設備劣化を防ぐための基本条件と呼ばれる。\nｂ 自主保全は、設備を使用するオペレーター自身が保全活動を行って、設備の自然劣化を抑制する活動である。\nｃ 「自主保全の ７ ステップ」の中の最初のステップは、自主保全の仮基準を作成することである。\nｄ 自主保全活動の中には、清掃や検査等の保全が困難な箇所を特定し、これらを効率化する活動が含まれる。\nｅ 自主保全では、改良保全の考え方を積極的に取り入れて、設備故障を抑制する。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：正 ｄ：誤 ｅ：誤",
      "イ": "ａ：正 ｂ：正 ｃ：誤 ｄ：正 ｅ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：正 ｅ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：正 ｄ：誤 ｅ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：誤 ｄ：正 ｅ：誤"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "清掃・給油・増し締めで劣化を予防し、最初のステップでは初期清掃を行う。自主保全では強制劣化を抑え、清掃などの困難箇所も改善する。",
    "choiceExplanations": {
      "ア": "清掃などの基本条件は設備の強制劣化を防ぐために行う。自主保全の最初のステップは初期清掃である。",
      "イ": "清掃・給油・増し締めは基本条件である。自主保全は主に強制劣化を防ぎ、設備の信頼性等を変える改良保全を中心とはしない。",
      "ウ": "清掃・給油・増し締めで劣化を予防し、最初のステップでは初期清掃を行う。自主保全では強制劣化を抑え、清掃などの困難箇所も改善する。",
      "エ": "清掃・給油・増し締めは劣化予防の基本条件である。仮基準は初期清掃などの後に作成する。",
      "オ": "清掃や点検の難しい場所を改善する点は正しい。清掃・給油・増し締めの基本条件を否定するａの判定が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 20,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "省エネ法",
    "topicTags": [
      "省エネ法"
    ],
    "difficulty": 3,
    "question": "「エネルギーの使用の合理化及び非化石エネルギーへの転換等に関する法律」に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ この法律に規定されている管理の対象となるエネルギーは、化石燃料と非化石燃料の ２ つである。\nｂ 非化石燃料の中には、水素およびアンモニアが含まれる。\nｃ エネルギー使用量が一定以上の特定事業者は、中長期計画で定めたエネルギーの削減目標の達成が義務付けられている。\nｄ 認定を受けた事業者は、複数事業者の連携により削減したエネルギーの量を、事業者間に分配して報告することができる。\nｅ 工場等におけるエネルギー使用の合理化措置の中には、「化石燃料及び非化石燃料の燃焼の合理化」や「放射、伝導、抵抗等によるエネルギーの損失の防止」が含まれる。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤 ｅ：正",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤 ｅ：誤",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：正 ｅ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：正 ｄ：誤 ｅ：誤",
      "オ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正 ｅ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "対象には燃料のほか熱や電気があり、非化石燃料には水素やアンモニアが含まれる。計画目標の達成自体は義務ではなく、認定事業者の削減量分配や損失防止に関する仕組みがある。",
    "choiceExplanations": {
      "ア": "管理対象のエネルギーは化石燃料と非化石燃料に限られず、それらから得られる熱や電気も含む。連携で削減した量を分配して報告できる制度がある。",
      "イ": "水素とアンモニアは非化石燃料に含まれる。計画で定めた削減目標の達成自体を一律の義務としているわけではない。",
      "ウ": "事業者間で削減量を分配して報告できる。燃焼やエネルギー損失の防止に関する合理化措置も規定されるが、対象は燃料だけではない。",
      "エ": "削減目標の達成が一律に義務付けられるわけではない。連携省エネルギー計画の認定制度では削減量を分配して報告できる。",
      "オ": "対象には燃料のほか熱や電気があり、非化石燃料には水素やアンモニアが含まれる。計画目標の達成自体は義務ではなく、認定事業者の削減量分配や損失防止に関する仕組みがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 21,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産職場の管理指標",
    "topicTags": [
      "生産職場の管理指標"
    ],
    "difficulty": 3,
    "question": "生産職場の管理指標に関して、「その値が大きいほど、職場が良好な状態にあることを示す指標」の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 強度率（労働災害に関する）\nｂ 工程能力指数\nｃ MTTR\nｄ 偶発故障期間\nｅ 歩留り",
    "choices": {
      "ア": "ａとｂとｅ",
      "イ": "ａとｃ",
      "ウ": "ａとｃとｄ",
      "エ": "ｂとｃとｅ",
      "オ": "ｂとｄとｅ"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "工程能力指数と歩留りは高いほど規格内の製品を安定して得やすい。偶発故障期間が長ければ、故障率が低く安定した期間も長くなる。",
    "choiceExplanations": {
      "ア": "労働災害の強度率は延べ労働時間当たりの労働損失日数の大きさを表す。災害による損失が大きいほど悪化するので低い方がよい。",
      "イ": "強度率とMTTRはいずれも値が低い方が望ましい。MTTRが長いと復旧に時間がかかり設備の利用可能時間が減る。",
      "ウ": "偶発故障期間が長ければ故障率が低く安定する期間が長い。強度率と平均修復時間は逆に短い方が望ましい。",
      "エ": "工程能力指数と歩留りは高い方がよい。MTTRは平均修復時間なので、小さいほど修理が速い。",
      "オ": "工程能力指数と歩留りは高いほど規格内の製品を安定して得やすい。偶発故障期間が長ければ、故障率が低く安定した期間も長くなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 22,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "ショッピングセンター",
    "topicTags": [
      "ショッピングセンター"
    ],
    "difficulty": 3,
    "question": "わが国のショッピングセンター（SC）の現況（2022 年末時点で営業中の SC）について、一般社団法人日本ショッピングセンター協会が公表している『SC 白書 2023（デジタル版）』から確認できる記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "１ SC 当たりの平均テナント数は約 100 店舗である。",
      "イ": "１ SC 当たりの平均店舗面積は約 50,000 m2 である。",
      "ウ": "2022 年に開設された SC の立地は、「中心地域」よりも「周辺地域」の方が多い。",
      "エ": "業種別テナント数は、「物販店」よりも「飲食店」の方が多い。",
      "オ": "ビル形態別 SC 数は、「商業ビル」よりも「駅ビル」の方が多い。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "2022年に新設されたSCは「中心地域」より「周辺地域」への立地が多い。新規開設施設の立地別集計による比較である。",
    "choiceExplanations": {
      "ア": "白書の平均テナント数は1施設当たり100店舗より少ない。大規模施設の店舗数を施設全体の平均と混同しない。",
      "イ": "白書で集計される1施設当たり店舗面積の平均は約5万平方メートルより小さい。",
      "ウ": "2022年に新設されたSCは「中心地域」より「周辺地域」への立地が多い。新規開設施設の立地別集計による比較である。",
      "エ": "業種別テナント数では物販店が飲食店を上回る。テナント数と店舗面積は別の集計である。",
      "オ": "施設の建物形態別の数では、商業ビルの方が駅ビルより多い。選択肢の関係は逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 23,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "商店街実態調査",
    "topicTags": [
      "商店街実態調査"
    ],
    "difficulty": 3,
    "question": "中小企業庁が公表している『令和 ３ 年度商店街実態調査』に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "１ 商店街当たりのチェーン店舗率は、前回調査（平成 30 年度調査）よりも減少している。",
      "イ": "キャッシュレス決済の取組については、80 ％ 以上の店舗で導入している商店街が 50 ％ を超えている。",
      "ウ": "新型コロナウイルス感染症のまん延による影響を踏まえた商店街の新たな取組は、「インターネット販売に対応した」よりも「テイクアウト販売に対応した」と回答した割合が高い。",
      "エ": "全国の商店街における業種別の店舗数では、「飲食店」よりも「サービス店」の方が多い。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "コロナ禍を踏まえた新しい取組では、テイクアウト対応の回答率がインターネット販売対応より高かった。業種別の店舗数では飲食店がサービス店よりも多い。選択肢はその大小を逆にしている。",
    "choiceExplanations": {
      "ア": "令和3年度の調査ではチェーン店舗率が前回の平成30年度を上回る。減少という記述は逆である。",
      "イ": "ほとんどの店舗がキャッシュレス決済を導入している商店街が全体の半数を超えたという結果ではない。",
      "ウ": "コロナ禍を踏まえた新しい取組では、テイクアウト対応の回答率がインターネット販売対応より高かった。",
      "エ": "業種別の店舗数では飲食店がサービス店よりも多い。選択肢はその大小を逆にしている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 24,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "食品リサイクル法",
    "topicTags": [
      "食品リサイクル法"
    ],
    "difficulty": 3,
    "question": "食品リサイクル法およびその基本方針に関する以下の文章の空欄Ａ～Ｃに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。食品リサイクル法では、食品循環資源の再生利用等を総合的かつ計画的に推進するために、主務大臣が基本方針を定めている。この基本方針では、再生利用等を実施すべき量に関する目標が、業種別（食品製造業、食品小売業、食品卸売業、外食産業）に定められている。2024 年度までに達成すべき再生利用等実施率の目標値は、Ａ （95 ％）が最も高く、 Ｂ （50 ％）が最も低い。また、国と地方公共団体が連携して地域ごとの食品循環資源の再生利用等を促進するために、 Ｃ は主務大臣に食品廃棄物等の発生量および食品循環資源の再生利用等の実施量を、都道府県別および市町村別に報告しなければならない。",
    "choices": {
      "ア": "Ａ：外食産業 Ｂ：食品小売業 Ｃ：食品廃棄物等多量発生事業者",
      "イ": "Ａ：外食産業 Ｂ：食品製造業 Ｃ：すべての食品関連事業者",
      "ウ": "Ａ：食品小売業 Ｂ：外食産業 Ｃ：すべての食品関連事業者",
      "エ": "Ａ：食品製造業 Ｂ：外食産業 Ｃ：食品廃棄物等多量発生事業者",
      "オ": "Ａ：食品製造業 Ｂ：食品小売業 Ｃ：すべての食品関連事業者"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "試験が扱う目標は食品製造業95％、外食産業50％である。発生量や再生利用量などの報告は食品廃棄物等の多量発生事業者に求められる。",
    "choiceExplanations": {
      "ア": "目標の最上位は食品製造業の95％、最下位は外食産業の50％である。報告主体となる多量発生事業者は合っている。",
      "イ": "外食産業は最も低く、食品製造業が最も高い。量等の報告は法の定める多量発生事業者に求められる。",
      "ウ": "最下位が外食産業である点は正しい。最上位は食品製造業で、発生量等の報告はすべての事業者に一律に求めるものではない。",
      "エ": "試験が扱う目標は食品製造業95％、外食産業50％である。発生量や再生利用量などの報告は食品廃棄物等の多量発生事業者に求められる。",
      "オ": "食品製造業が最高の目標値である点は正しい。最も低いのは外食産業で、報告主体は多量発生事業者である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 25,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "大規模小売店舗立地法",
    "topicTags": [
      "大規模小売店舗立地法"
    ],
    "difficulty": 3,
    "question": "大規模小売店舗立地法に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "この法律の主な目的は、大規模小売店舗における小売業の事業活動を調整することにより、その周辺の中小小売業の事業活動の機会を適正に確保することである。",
      "イ": "この法律の施行に伴い、地域商業の活性化を図ることを目的として大規模小売店舗法の規制が強化された。",
      "ウ": "この法律の対象は、店舗面積が 1,000 m2 を超える小売業を営む店舗であり、飲食店業を営む店舗は含まれない。",
      "エ": "この法律の役割は、商店街が地域コミュニティの担い手として行う地域住民の生活の利便を高める試みを支援することである。",
      "オ": "大規模小売店舗を新設する場合、開店後 １ カ月以内に新設に関する届出をしなければならない。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "基準面積1,000平方メートルを超える小売店舗が立地法の対象である。飲食店の面積は、ここでいう小売業用の店舗面積に含めない。",
    "choiceExplanations": {
      "ア": "中小小売業の事業機会の確保は旧大規模小売店舗法の目的である。大規模小売店舗立地法は周辺地域の生活環境の保持を目的とする。",
      "イ": "規制を強化して旧法を存続させたわけではない。旧法に代わり、交通、騒音、廃棄物などの生活環境への配慮を求める制度になった。",
      "ウ": "基準面積1,000平方メートルを超える小売店舗が立地法の対象である。飲食店の面積は、ここでいう小売業用の店舗面積に含めない。",
      "エ": "商店街が住民の利便性を高める事業への支援とは目的が異なる。大規模店舗の立地に伴う周辺環境への配慮を求める法律である。",
      "オ": "新設の届出は開店後に行うものではない。届出後には原則8か月の新設制限期間が設けられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q26",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 26,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗の防火管理",
    "topicTags": [
      "店舗の防火管理"
    ],
    "difficulty": 3,
    "question": "小売店舗などの店舗施設（一般住宅と併用するものは除く）における防火管理に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "飲食店とカラオケボックスは特定防火対象物ではない。",
      "イ": "商店街に設置された延長 30 m のアーケードは、防火対象物である。",
      "ウ": "店舗に設置されている消火器具や火災報知設備などの機器点検は、毎月行わなければならない。",
      "エ": "店舗面積 1,500 m2 のスーパーマーケットでは、防火管理者を定めなければならない。",
      "オ": "防火地域内で建築物の屋上に看板を設置する場合、看板の主要部分を不燃材料で造る必要はなく、不燃材料で覆う必要もない。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "物品販売店舗は特定防火対象物で、収容人員30人以上なら防火管理者が必要である。通常の用途区分で店舗面積1,500平方メートルのスーパーは該当する。",
    "choiceExplanations": {
      "ア": "飲食店やカラオケボックスは不特定多数の人が利用するため、消防法令上の特定防火対象物に当たる。",
      "イ": "消防法施行令の別表第一でアーケードが当たる定義には延長50m以上という条件がある。設問の30mではこの条件を満たさない。",
      "ウ": "消防用設備等の機器点検の周期は原則6か月に1回である。総合点検は原則1年に1回で、毎月の点検ではない。",
      "エ": "物品販売店舗は特定防火対象物で、収容人員30人以上なら防火管理者が必要である。通常の用途区分で店舗面積1,500平方メートルのスーパーは該当する。",
      "オ": "防火地域内で屋上に設ける看板などには防火上の規制がある。対象の工作物の主要部は不燃材料で造るか覆う必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q27",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 27,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "立地適正化計画",
    "topicTags": [
      "立地適正化計画"
    ],
    "difficulty": 3,
    "question": "都市再生特別措置法における立地適正化計画に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 複数の市町村にまたがる広域都市計画の場合、都道府県が主体となって立地適正化計画を作成することが望ましい。\nｂ 都市機能増進施設とはスーパーマーケットやショッピングセンターなどの商業施設であり、医療施設や教育施設は含まれない。\nｃ １ つの市町村内に複数の都市計画区域がある場合には、すべての都市計画区域を対象として立地適正化計画を作成することが基本となる。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "計画の作成主体は市町村で、対象施設は商業に限らず医療や教育なども含む。市町村内に複数の都市計画区域があれば、原則としてすべてを計画対象とする。",
    "choiceExplanations": {
      "ア": "立地適正化計画は市町村が作成する。広域の調整が必要な場合も都道府県を計画の作成主体とするものではない。",
      "イ": "医療施設や教育施設も都市機能を増進する施設になり得る。複数の都市計画区域がある場合は、その全体を対象とするのが基本である。",
      "ウ": "ａは誤りだが、都市機能増進施設には商業施設に加え、医療施設や教育施設なども含まれる。",
      "エ": "ｃは正しい。都市機能増進施設に商業以外の医療施設や教育施設が含まれないとするｂは誤りである。",
      "オ": "計画の作成主体は市町村で、対象施設は商業に限らず医療や教育なども含む。市町村内に複数の都市計画区域があれば、原則としてすべてを計画対象とする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q28-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 28,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "商品別粗利益と相乗積",
    "topicTags": [
      "商品別粗利益と相乗積"
    ],
    "difficulty": 3,
    "question": "下表は、店舗Ｘにおける、ある期間の商品カテゴリー別の売上高と粗利益率、相乗積を示したものである。この表を見て、下記の設問に答えよ。なお、表内の（値１）～（値 ３ ）については、必要に応じて計算すること。\n\n（設問1）\n店舗Ｘにおいて、表に示した販売期間の粗利益高が ２ 番目に小さい商品カテゴリーはどれか。",
    "choices": {
      "ア": "カテゴリーＡ",
      "イ": "カテゴリーＢ",
      "ウ": "カテゴリーＣ",
      "エ": "カテゴリーＤ",
      "オ": "カテゴリーＥ"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "粗利益高はＡ95、Ｂ42、Ｃ36、Ｄ48、Ｅ18万円になる。Ｅに次いで小さいのは、90万円×40％＝36万円のＣである。",
    "choiceExplanations": {
      "ア": "Ａの粗利益高は380万円×25％＝95万円であり、5分類で最も大きい。",
      "イ": "Ｂの粗利益高は140万円×30％＝42万円である。18万円のＥ、36万円のＣに次いで3番目に小さい。",
      "ウ": "粗利益高はＡ95、Ｂ42、Ｃ36、Ｄ48、Ｅ18万円になる。Ｅに次いで小さいのは、90万円×40％＝36万円のＣである。",
      "エ": "Ｄの粗利益高は全売上高1,000万円に相乗積4.8％を掛けた48万円である。小さい方から2番目ではない。",
      "オ": "Ｅの粗利益高は150万円×12％＝18万円で最小である。2番目は36万円のＣとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q28.png"
    ],
    "imageAltTexts": [
      "売上高、粗利益率、相乗積の順。Ａは380万円、25.0％、値1。Ｂは140万円、30.0％、4.2％。Ｃは90万円、40.0％、値2。Ｄは240万円、値3、4.8％。Ｅは150万円、12.0％、1.8％。全体は1,000万円、23.9％。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q28-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 28,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "商品別粗利益と相乗積",
    "topicTags": [
      "商品別粗利益と相乗積"
    ],
    "difficulty": 3,
    "question": "下表は、店舗Ｘにおける、ある期間の商品カテゴリー別の売上高と粗利益率、相乗積を示したものである。この表を見て、下記の設問に答えよ。なお、表内の（値１）～（値 ３ ）については、必要に応じて計算すること。\n\n（設問2）\n店舗Ｘにおける販売計画の考え方に関する記述として、最も適切なものはどれか。ただし、商品カテゴリーごとの粗利益率は一定で、それぞれの商品カテゴリーの売上は他の商品カテゴリーの売上に影響しないものとする。",
    "choices": {
      "ア": "カテゴリーＡの取り扱いをやめると、全体の粗利益率は上昇する。",
      "イ": "カテゴリーＢの売上高が ２ 倍になると、全体の粗利益率は上昇する。",
      "ウ": "カテゴリーＣの売上高が ２ 倍になった場合は、カテゴリーＢの売上高が ２ 倍になった場合よりも全体の粗利益高の増加額が大きい。",
      "エ": "カテゴリーＤの売上高が半分になると、全体の粗利益率は低下する。",
      "オ": "カテゴリーＥの売上高が 10 倍になると、全体の粗利益高は ２ 倍以上に増加する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "Ｂの粗利益率は30％で全体の23.9％より高い。Ｂの売上構成比が高まると、売上で加重した全体の粗利益率は上昇する。",
    "choiceExplanations": {
      "ア": "Ａの25％は全体の23.9％を上回る。Ａを除くと平均を引き上げていた部分がなくなり、全体の粗利益率は下がる。",
      "イ": "Ｂの粗利益率は30％で全体の23.9％より高い。Ｂの売上構成比が高まると、売上で加重した全体の粗利益率は上昇する。",
      "ウ": "Ｃの追加売上から得る粗利益は36万円である。Ｂの売上が倍になると42万円増えるため、Ｂの方が増加額は大きい。",
      "エ": "Ｄの粗利益率は48÷240＝20％で、全体の23.9％より低い。Ｄの売上比重が下がると、全体の粗利益率は上昇する。",
      "オ": "Ｅの粗利益は18万円であり、9倍分の追加は162万円である。全体は239万円から401万円になり、2倍の478万円には届かない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q28.png"
    ],
    "imageAltTexts": [
      "売上高、粗利益率、相乗積の順。Ａは380万円、25.0％、値1。Ｂは140万円、30.0％、4.2％。Ｃは90万円、40.0％、値2。Ｄは240万円、値3、4.8％。Ｅは150万円、12.0％、1.8％。全体は1,000万円、23.9％。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q29-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 29,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗の商品配置",
    "topicTags": [
      "店舗の商品配置"
    ],
    "difficulty": 3,
    "question": "以下は、酒販店の店主と中小企業診断士（以下「診断士」という。）との間で行われた売場づくりに関する会話である。この会話を読んで、下記の設問に答えよ。\n店主：「売場を改善して客単価を上げたいのですが、今の売場をどのように変えるのが良いでしょうか。」\n診断士：「それでは、まず、売場における商品配置について考えてみましょう。インストア・マーチャンダイジングの考え方によると、計画購買されやすい商品を Ａ に配置することで、来店した顧客の買上点数増加につながりやすくなります。また、 Ｂ を促すように商品配置をすることが、買上点数を増やすためには効果的です。」\n店主：「 Ｂ は、おつまみなどをお酒と一緒に買ってもらうようなことですね。」\n診断士：「お客様が商品を選ぶ際に、もう １ 品買ってもらうためには、商品のグルーピングも重要です。特に【下線部】バラエティ・シーキングされやすい商品カテゴリー【下線ここまで】は、同じ売場にまとめて陳列することで複数の商品を同時に買ってもらえる機会が増えると考えられます。」\n店主：「それでは、さっそく売場を変えてみたいと思います。」\n\n（設問1）\n会話の中の空欄ＡとＢに入る語句の組み合わせとして、最も適切なものはどれか。",
    "choices": {
      "ア": "Ａ：入口付近 Ｂ：関連購買",
      "イ": "Ａ：入口付近 Ｂ：条件購買",
      "ウ": "Ａ：売場の奥 Ｂ：関連購買",
      "エ": "Ａ：売場の奥 Ｂ：条件購買",
      "オ": "Ａ：売場の中心 Ｂ：条件購買"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "目当ての商品を売場の奥に置くと、途中で別商品に触れて買上点数を増やす機会ができる。酒とおつまみを一緒に買うのは関連購買である。",
    "choiceExplanations": {
      "ア": "酒とおつまみを合わせて買うのは関連購買である。計画購買の商品を奥に置く方が、途中の売場で別商品を見る機会を作れる。",
      "イ": "入口に目当ての商品を置くと短い動線で買物が完了しやすい。酒とおつまみを組み合わせるのは関連購買に当たる。",
      "ウ": "目当ての商品を売場の奥に置くと、途中で別商品に触れて買上点数を増やす機会ができる。酒とおつまみを一緒に買うのは関連購買である。",
      "エ": "Ａは売場の奥で正しい。会話のＢは関連する商品を一緒に買う関連購買を指す。",
      "オ": "計画購買の商品を売場の奥に置くと、移動距離が伸びて商品との接触が増える。補完的な商品の同時購入を促すのは関連購買である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q29-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 29,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗の商品配置",
    "topicTags": [
      "店舗の商品配置"
    ],
    "difficulty": 3,
    "question": "以下は、酒販店の店主と中小企業診断士（以下「診断士」という。）との間で行われた売場づくりに関する会話である。この会話を読んで、下記の設問に答えよ。\n店主：「売場を改善して客単価を上げたいのですが、今の売場をどのように変えるのが良いでしょうか。」\n診断士：「それでは、まず、売場における商品配置について考えてみましょう。インストア・マーチャンダイジングの考え方によると、計画購買されやすい商品を Ａ に配置することで、来店した顧客の買上点数増加につながりやすくなります。また、 Ｂ を促すように商品配置をすることが、買上点数を増やすためには効果的です。」\n店主：「 Ｂ は、おつまみなどをお酒と一緒に買ってもらうようなことですね。」\n診断士：「お客様が商品を選ぶ際に、もう １ 品買ってもらうためには、商品のグルーピングも重要です。特に【下線部】バラエティ・シーキングされやすい商品カテゴリー【下線ここまで】は、同じ売場にまとめて陳列することで複数の商品を同時に買ってもらえる機会が増えると考えられます。」\n店主：「それでは、さっそく売場を変えてみたいと思います。」\n\n（設問2）\n会話の中の下線部に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ バラエティ・シーキングされやすい商品カテゴリーは、当該カテゴリーの品揃え商品数を増やすと総合的な品揃えとなる。\nｂ バラエティ・シーキングされやすい商品カテゴリーに含まれる商品は、相互に代替性がない。\nｃ バラエティ・シーキングされやすい商品カテゴリーは、品揃えしている商品カテゴリー間の相対的な比較で決まる。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正",
      "ウ": "ａ：誤 ｂ：正 ｃ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "同一カテゴリーの商品数は品揃えの奥行きに関係する。バラエティ・シーキングでは代替可能な商品を試し替える傾向を、他カテゴリーと比べて判断する。",
    "choiceExplanations": {
      "ア": "一つのカテゴリー内の商品を増やすことは品揃えの奥行きに関わる。カテゴリー内の商品には互いに代替できるものがある。",
      "イ": "カテゴリー内の選択肢を増やすことは奥行きを深めることに当たる。ａのように総合的になるとする説明は適切でない。",
      "ウ": "同じカテゴリーの商品から異なる銘柄などを試す場合、商品は目的の面で代替し得る。ｂは誤りである。",
      "エ": "異なる商品を試す場合も、同じ用途で選び替えられる代替性がある。カテゴリーによる差を相対的に捉えるｃも正しい。",
      "オ": "同一カテゴリーの商品数は品揃えの奥行きに関係する。バラエティ・シーキングでは代替可能な商品を試し替える傾向を、他カテゴリーと比べて判断する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q30",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 30,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "食品表示",
    "topicTags": [
      "食品表示"
    ],
    "difficulty": 3,
    "question": "食品表示法および食品表示基準に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 異なる都道府県で生産された同じ種類の農産物を混合して販売する場合は、全体重量に占める割合が最も高い農産物の都道府県（原産地）を代表して表示すればよい。\nｂ 特定の保健の目的が期待できるという機能性の表示をすることができる食品は、特定保健用食品だけである。\nｃ 製造または加工した日から賞味期限までの期間が ３ カ月を超える加工食品は、賞味期限を年月表示とすることができる。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "同種の農産物を複数産地から混ぜても、最多産地だけの表示では足りない。機能性表示食品にも表示制度があり、賞味期間が3か月を超えると年月表示ができる場合がある。",
    "choiceExplanations": {
      "ア": "異なる産地の同種農産物を混ぜるときは、原産地を占める重量の割合などに従って表示する。最も多い産地だけの代表表示では足りない。",
      "イ": "機能性表示食品なども要件の下で機能性を表示できるのでｂは誤りである。ｃの賞味期限の年月表示は所定の条件で認められる。",
      "ウ": "加工食品の賞味期間が製造または加工日から3か月を超える場合、賞味期限を年月で示すことができる。",
      "エ": "特定保健用食品だけでなく、機能性表示食品でも機能性の表示が可能である。ｂは誤りで、ｃの年月表示の要件は正しい。",
      "オ": "同種の農産物を複数産地から混ぜても、最多産地だけの表示では足りない。機能性表示食品にも表示制度があり、賞味期間が3か月を超えると年月表示ができる場合がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q31",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 31,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "安全在庫と発注方式",
    "topicTags": [
      "安全在庫と発注方式"
    ],
    "difficulty": 3,
    "question": "小売店舗における在庫管理に関する以下の文章の空欄Ａ～Ｃに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。小売店舗では、在庫を管理するうえで安全在庫を設定している。例えば、発注点を用いた定量発注方式を採用する場合、その発注点は安全在庫に Ａ 中の推定需要量を加算して設定される。また、定期発注方式を採用する場合の発注量は、一定期間の推定需要量から安全在庫量と有効在庫量を減じて算出される。この定期発注方式における安全在庫を計算する際に考慮する需要変動の期間は、 Ｂである。欠品のリスクを小さくするためには、いずれの発注方式においても、安全在庫の安全係数を Ｃ 設定する必要がある。",
    "choices": {
      "ア": "Ａ：調達期間\nＢ：調達期間と発注間隔の合計期間\nＣ：高く",
      "イ": "Ａ：調達期間\nＢ：調達期間と発注間隔の合計期間\nＣ：低く",
      "ウ": "Ａ：調達期間と発注間隔の合計期間\nＢ：調達期間\nＣ：高く",
      "エ": "Ａ：調達期間と発注間隔の合計期間\nＢ：調達期間\nＣ：低く"
    },
    "answer": [],
    "officialAnswerNumber": null,
    "explanation": "中小企業診断協会は2023年9月5日付の公式訂正で、この設問を不適切とし、受験者全員の解答を正解扱いにした。",
    "choiceExplanations": {
      "ア": "調達期間と発注間隔に着目する整理には意味があるが、問題文は定期発注量の式で安全在庫を減じている。公式訂正で全員加点になった。",
      "イ": "安全係数を低く設定すると、他の条件が一定なら安全在庫は少なくなる。この設問は訂正により全員正解扱いである。",
      "ウ": "定量発注では通常、発注後の調達期間を保護する。定期発注では次の発注機会までの期間も考慮するが、本問は全員加点である。",
      "エ": "定期発注方式での一般的な計算は、保護期間の推定需要量に安全在庫を足し、有効在庫を引く。問題文が不適切とされ、特定の肢は公式に指定されなかった。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "officialScoring": {
      "kind": "credit-for-all",
      "reason": "中小企業診断協会は2023年9月5日付の公式訂正で、この設問を不適切とし、受験者全員の解答を正解扱いにした。"
    },
    "officialReferenceUrls": [
      "https://www.jf-cmca.jp/attach/test/r05/seikai_teisei_20230905.pdf"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q32",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 32,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "季節変動",
    "topicTags": [
      "季節変動"
    ],
    "difficulty": 3,
    "question": "時系列データを用いた需要予測を行う際には、時系列データの変動要素を理解することが重要である。十分な期間が存在する時系列データの変動は、傾向変動、循環変動、季節変動、不規則変動の ４ 種類の要素に分解することができる。これらの変動要素のうち、季節変動に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "季節調整値は、原数値に季節変動を付加した値である。",
      "イ": "季節変動の要因の １ つは、景気の好況あるいは不況によって繰り返される変動である。",
      "ウ": "季節変動の要因の １ つは、突発的な需要変動である。",
      "エ": "季節変動は、 １ 年を周期とする変動である。",
      "オ": "季節変動は、長期間にわたって一方的な増加または減少の方向を持続する変動である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "季節変動は、気候や年間行事などによりおおむね1年の周期で繰り返す変動である。長期間の一方向の増加・減少は傾向変動である。季節変動は1年の中で繰り返す増減をいう。",
    "choiceExplanations": {
      "ア": "季節調整値は、原数値から季節的な影響を取り除いて比較しやすくした値である。季節変動を加えるのではない。",
      "イ": "好況や不況を繰り返す変化は年ごとに規則的に生じるとは限らない。景気による波は循環変動に当たる。",
      "ウ": "偶発的な突発需要は不規則変動に含まれる。毎年の時期に対応して繰り返す季節変動とは異なる。",
      "エ": "季節変動は、気候や年間行事などによりおおむね1年の周期で繰り返す変動である。",
      "オ": "長期間の一方向の増加・減少は傾向変動である。季節変動は1年の中で繰り返す増減をいう。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q33",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 33,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "輸送手段とネットワーク",
    "topicTags": [
      "輸送手段とネットワーク"
    ],
    "difficulty": 3,
    "question": "輸送手段と輸送ネットワークの特徴に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "鉄道貨物駅における着発線荷役（Ｅ＆Ｓ：Effective & Speedy）方式は、貨車を架線のある着発線から架線のない荷役線に移動させてからコンテナを積み卸す荷役方式である。",
      "イ": "トラック輸送の契約に関する「標準貨物自動車運送約款」では、運賃を積込みや取卸しを含む運送の対価であると規定している。",
      "ウ": "日本全体の二酸化炭素排出量は鉄道輸送よりもトラック輸送の方が多いが、輸送トンキロ当たりの二酸化炭素排出量は鉄道輸送よりもトラック輸送の方が少ない。",
      "エ": "ハブ・アンド・スポーク型の輸送ネットワークの特徴は、最終目的地まで直行輸送することである。",
      "オ": "複合一貫輸送の例として、トラックと RORO 船を利用して陸路と海路を組み合わせる輸送形態がある。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "トラックをRORO船に積んで海上区間を運び、陸上区間は自走する一連の輸送は、異なる輸送機関を組み合わせる複合一貫輸送である。",
    "choiceExplanations": {
      "ア": "着発線荷役方式では着発線で直接コンテナを荷役する。貨車を別の荷役線へ移動させる手間を省く方式である。",
      "イ": "標準貨物自動車運送約款では運送の対価である運賃と、積込み・取卸しなどの作業の対価である料金を区分する。",
      "ウ": "一般に貨物のトンキロ当たりの二酸化炭素排出量は、鉄道よりトラックの方が多い。輸送手段ごとの輸送量も別に考える。",
      "エ": "ハブ・アンド・スポークは貨物を拠点に集め、仕分けて複数の行先に分けるネットワークである。すべての区間を直行させる設計とは異なる。",
      "オ": "トラックをRORO船に積んで海上区間を運び、陸上区間は自走する一連の輸送は、異なる輸送機関を組み合わせる複合一貫輸送である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q34",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 34,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "中継輸送",
    "topicTags": [
      "中継輸送"
    ],
    "difficulty": 3,
    "question": "Ａ社とＢ社は、それぞれＸ県とＹ県の間でトラックの長距離輸送を行っており、このたび中継輸送の取組を行った。この取組前と取組後の比較に関する記述として、最も適切なものを次ページの解答群から選べ。なお、次ページの条件のみを踏まえて解答すること。\n【中継輸送の取組前】Ａ社のトラックは、Ｘ県の倉庫 Ax からＹ県の倉庫 Ay へ貨物を積載して走行（実車走行）した後に、倉庫 Ay から倉庫 Ax へ貨物を積載せずに走行（空車走行）していた。Ｂ社のトラックは、Ｙ県の倉庫 By からＸ県の倉庫 Bx へ実車走行した後に、倉庫 Bx から倉庫 By へ空車走行していた。\n【中継輸送の取組後】Ａ社のトラックは倉庫 Ax から中継拠点へ、Ｂ社のトラックは倉庫 By から中継拠点へそれぞれ実車走行した。それから中継拠点で互いの貨物を積み替えた後に、Ａ社のトラックは倉庫 Bx へＢ社の貨物を積載して走行し、Ｂ社のトラックは倉庫Ay へＡ社の貨物を積載して走行した（下図参照）。\n【解答に当たっての条件】\n・トラックの最大積載量と台数は、取組前と取組後のＡ社とＢ社においてすべて同じである。\n・トラックの実車率と積載率は、Ａ社とＢ社を合わせた全体でそれぞれ計算する。\n・同一県内の A 社と B 社の倉庫は隣接しており、その間の距離は ０ とする。\n・トラックの積載率は、空車を含めずに計算する。",
    "choices": {
      "ア": "トラックの実車率と積載率は変わらなかった。",
      "イ": "トラックの実車率は変わらなかったが、積載率は上昇した。",
      "ウ": "トラックの実車率は上昇し、積載率も上昇した。",
      "エ": "トラックの実車率は上昇したが、積載率は変わらなかった。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "行き帰りとも貨物を載せるため実車率は上がる。積載率の算定に空車を含めず、貨物と車両の最大積載量は同じなので積載率は不変である。",
    "choiceExplanations": {
      "ア": "取組後は帰りに相手の荷物を積んで走るため、従来の空車区間が実車に変わる。実車率は上昇する。",
      "イ": "中継で空車走行を減らすので実車率は上がる。積載率は空車を分母から除外するため、同じ荷物を同じ最大積載量の車が運ぶ条件では変わらない。",
      "ウ": "実車率の上昇は正しい。積載率の計算は実車だけが対象であり、取組後も荷物の量と最大積載量が同じなので変わらない。",
      "エ": "行き帰りとも貨物を載せるため実車率は上がる。積載率の算定に空車を含めず、貨物と車両の最大積載量は同じなので積載率は不変である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q34.png"
    ],
    "imageAltTexts": [
      "Ｘ県の倉庫Axから中継拠点に向かうトラックは積み替え後にＸ県の倉庫Bxへ戻る。Ｙ県の倉庫Byから中継拠点に向かうトラックは積み替え後にＹ県の倉庫Ayへ戻る。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q35",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 35,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "物流センター運営",
    "topicTags": [
      "物流センター運営"
    ],
    "difficulty": 3,
    "question": "物流センターの運営に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "ASN を用いた入荷検品は、荷受側が事前に受信した入荷予定商品の情報と入荷した商品を照合することで完了する。",
      "イ": "トラック予約受付システムは、荷送側の物流センターで配車業務の効率化のために導入されるシステムである。",
      "ウ": "マテハン機器のうち、DPS（Digital Picking System）は種まき方式ピッキングで利用され、DAS（Digital Assorting System）は摘み取り方式ピッキングで利用される機器である。",
      "エ": "ロールボックスパレットを利用した運搬には、フォークリフトが必要である。",
      "オ": "ロケーション管理の方法の １ つであるフリーロケーション管理は、入庫の都度、空いている場所に商品を格納し、保管する商品とその場所を紐づけずに管理する方法である。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "ASNは出荷前に荷受側に送る出荷明細である。荷受側で実物や物流ラベルと明細情報を照合して入荷検品できる。",
    "choiceExplanations": {
      "ア": "ASNは出荷前に荷受側に送る出荷明細である。荷受側で実物や物流ラベルと明細情報を照合して入荷検品できる。",
      "イ": "トラックの予約受付は主に受入側のバースや作業時間を調整し、待機を減らす。荷送側の配車管理とは役割が異なる。",
      "ウ": "DPSでは保管場所から注文分を摘み取り、DASでは取り出した商品を行先別に種まきする。選択肢の対応は逆である。",
      "エ": "ロールボックスパレットは車輪が付いたかご台車なので、人が押して移動できる。通常の移動にフォークリフトは必須ではない。",
      "オ": "フリーロケーションでは入荷ごとに空き場所へ格納する。探し出せるように商品の所在と保管場所を記録して紐付ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q36",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 36,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "JANシンボル",
    "topicTags": [
      "JANシンボル"
    ],
    "difficulty": 3,
    "question": "JAN シンボルに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "JAN シンボルとは、日本独自の呼び方であり、国際的には EAN シンボルと呼ばれている。",
      "イ": "JAN シンボルのマーキングの際には、左右における余白の大きさに、定められた決まりはない。",
      "ウ": "赤色の照射光を使用するバーコードスキャナーでは、黒色よりも赤色でマーキングされた JAN シンボルの方が、読み取りエラーが少ない。",
      "エ": "トランケーションとは JAN シンボルのバーの高さを削ることをいい、JIS で定められている規格であり、海外に輸出する商品でも用いることができる。",
      "オ": "汎用プリンターでマーキングした JAN シンボルは、バーコードスキャナーで読み取ることができない。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "JANシンボルは日本での呼称であり、国際標準では同じ形式をEANシンボルと呼ぶ。バーコード左右の余白は読み取りの開始・終了を認識するために必要であり、規格で最小幅が定められている。",
    "choiceExplanations": {
      "ア": "JANシンボルは日本での呼称であり、国際標準では同じ形式をEANシンボルと呼ぶ。",
      "イ": "バーコード左右の余白は読み取りの開始・終了を認識するために必要であり、規格で最小幅が定められている。",
      "ウ": "赤いバーは赤色の照明を反射して空白部分と区別しづらい。黒いバーを使う方が赤色光で反射率の差を得やすい。",
      "エ": "トランケーションはバーの高さを削ることであり、読取性が損なわれる。特に輸出用商品への使用を規格が一律に認めるわけではない。",
      "オ": "汎用プリンターでも、コントラストや寸法などの品質要件を満たせば読み取り可能である。専用機器だけで作る必要はない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q37",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 37,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "GTINとインストアコード",
    "topicTags": [
      "GTINとインストアコード"
    ],
    "difficulty": 3,
    "question": "商品コード（GTIN）に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "GTIN-13 が設定されていない商品に対して、事業者が社内管理のために、国コードに当たる部分に 20～29 を用いて設定するコードをインストアコードという。",
      "イ": "GTIN-13 が設定されている商品を複数個まとめて包装したパッケージにGTIN-14 を設定する場合、元の GTIN-13 と設定後の GTIN-14 で異なるのは先頭の １ 桁のみである。",
      "ウ": "GTIN-13 は、インジケータ、GS1 事業者コード、商品アイテムコード、チェックデジットで構成されている。",
      "エ": "GTIN は GS1 標準の商品識別コードの総称であり、GTIN- ８ 、GTIN-10、GTIN-12、GTIN-13、GTIN-14 の ５ つの種類がある。",
      "オ": "日本の事業者に貸与される GS1 事業者コードは、先頭の ２ 桁が 45、47 または49 で始まる。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "20〜29の先頭番号は店舗内など限られた範囲で使うコードに利用される。標準商品コードがない商品にも事業者がインストアコードを付けられる。",
    "choiceExplanations": {
      "ア": "20〜29の先頭番号は店舗内など限られた範囲で使うコードに利用される。標準商品コードがない商品にも事業者がインストアコードを付けられる。",
      "イ": "集合包装用のGTIN-14では先頭にインジケータを置き、最後のチェックデジットを計算し直す。先頭の1桁だけが違うわけではない。",
      "ウ": "GTIN-13はGS1事業者コードと商品アイテムコードおよびチェックデジットで構成し、集合包装用のインジケータはGTIN-14で使う。",
      "エ": "標準で使われる桁数は8、12、13、14である。GTIN-10はこの分類に存在しない。",
      "オ": "日本のGS1事業者コードの先頭は45または49である。47を含める点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q38-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 38,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "アソシエーション分析",
    "topicTags": [
      "アソシエーション分析"
    ],
    "difficulty": 3,
    "question": "次の文章を読んで、下記の設問に答えよ。独自のオンラインサイトでネットショップを運営している、ある小売業の一定期間における顧客の購買状況を確認したところ、この期間におけるユニークな全購買者数は 144 人であった。当該ネットショップの取り扱い商品のうち、Ａ～Ｄの ４ つの商品についてのみ考慮すると、その購買状況は下表のとおりであった。また、商品Ａまたは商品Ｂを購買している顧客は、商品Ｃや商品Ｄの購買はなかったとする。この小売業では商品Ａ～Ｄについて、全購買者数をベースとした商品購買における相関ルールを検討し、今後の商品プロモーションに活用したいと考えている。\n\n（設問1）\n以下の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "支持度（サポート）の値は、商品Ａと商品Ｄで同じである。",
      "イ": "商品Ａからみた商品Ｂの信頼度（コンフィデンス）は、商品Ｂからみた商品Ａの信頼度（コンフィデンス）より大きい。",
      "ウ": "商品Ａと商品Ｂのジャッカード係数は、商品Ｃと商品Ｄのジャッカード係数より小さい。",
      "エ": "商品Ｂの支持度（サポート）の値は、 ４ つの商品の中で最小である。",
      "オ": "商品Ｃからみた商品Ｄの信頼度（コンフィデンス）は、商品Ｄからみた商品Ｃの信頼度（コンフィデンス）より小さい。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "単独と併買を合計するとＡ36人、Ｂ24人、Ｃ26人、Ｄ34人である。いずれも144人が分母であり、支持度が最も小さいのはＢとなる。",
    "choiceExplanations": {
      "ア": "Ａの購買者は26＋10＝36人、Ｄは26＋8＝34人である。全144人に占める割合は等しくない。",
      "イ": "ＡからＢの信頼度は10/36で、ＢからＡは10/24である。Ｂを起点とした方が大きい。",
      "ウ": "Ａ・Ｂのジャッカード係数は10/(26＋14＋10)＝0.20である。Ｃ・Ｄは8/(18＋26＋8)で約0.154となり、Ａ・Ｂの方が大きい。",
      "エ": "単独と併買を合計するとＡ36人、Ｂ24人、Ｃ26人、Ｄ34人である。いずれも144人が分母であり、支持度が最も小さいのはＢとなる。",
      "オ": "ＣからＤは8/26、ＤからＣは8/34である。同じ併買者数を小さい母数で割るＣからの信頼度の方が大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "1",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q38.png"
    ],
    "imageAltTexts": [
      "購買者数は、Ａのみ26人、Ｂのみ14人、ＡとＢの両方10人、Ｃのみ18人、Ｄのみ26人、ＣとＤの両方8人。表の人数はすべてユニークである。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q38-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 38,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "アソシエーション分析",
    "topicTags": [
      "アソシエーション分析"
    ],
    "difficulty": 3,
    "question": "次の文章を読んで、下記の設問に答えよ。独自のオンラインサイトでネットショップを運営している、ある小売業の一定期間における顧客の購買状況を確認したところ、この期間におけるユニークな全購買者数は 144 人であった。当該ネットショップの取り扱い商品のうち、Ａ～Ｄの ４ つの商品についてのみ考慮すると、その購買状況は下表のとおりであった。また、商品Ａまたは商品Ｂを購買している顧客は、商品Ｃや商品Ｄの購買はなかったとする。この小売業では商品Ａ～Ｄについて、全購買者数をベースとした商品購買における相関ルールを検討し、今後の商品プロモーションに活用したいと考えている。\n\n（設問2）\n商品Ａと商品Ｂを併買した購買パターンのリフト値として、最も適切なものはどれか。",
    "choices": {
      "ア": "1/4",
      "イ": "5/12",
      "ウ": "5/4",
      "エ": "3/2",
      "オ": "5/3"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "Ａを買った人のうちＢを買った割合は10/36で、全体のＢ購買率は24/144である。前者を後者で割るとリフト値は5/3になる。",
    "choiceExplanations": {
      "ア": "1/4は商品Ａ単体の支持度36/144である。リフトはＢの購買率がＡの購買で何倍になるかを表す。",
      "イ": "5/12はＢからＡへの信頼度10/24である。リフト値はそれをＡ全体の支持度36/144で割って求める。",
      "ウ": "併買の支持度10/144を、単独支持度36/144と24/144の積で割る。結果は5/4にはならない。",
      "エ": "3/2では、Ａ購入者のＢ購入率をＢ全体の購入率で割った値と一致しない。両者は10/36と24/144であり、比は5/3になる。",
      "オ": "Ａを買った人のうちＢを買った割合は10/36で、全体のＢ購買率は24/144である。前者を後者で割るとリフト値は5/3になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20",
    "part": "2",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-unei-q38.png"
    ],
    "imageAltTexts": [
      "購買者数は、Ａのみ26人、Ｂのみ14人、ＡとＢの両方10人、Ｃのみ18人、Ｄのみ26人、ＣとＤの両方8人。表の人数はすべてユニークである。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q39",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 39,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "HACCP",
    "topicTags": [
      "HACCP"
    ],
    "difficulty": 3,
    "question": "平成 30 年に食品衛生法が改正され、令和 ３ 年 ６ 月 １ 日から、原則すべての食品等事業者は「HACCP に沿った衛生管理」を行うことが義務化されている。HACCP では、その導入に対して 12 の手順が定められており、そのうちの ７ つは、 ７ 原則と呼ばれている。この ７ 原則に含まれている手順として、最も適切なものはどれか。",
    "choices": {
      "ア": "HACCP のチーム編成",
      "イ": "製造工程一覧図の現場確認",
      "ウ": "製造工程一覧図の作成",
      "エ": "製品説明書の作成",
      "オ": "モニタリング方法の設定"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "重要管理点が管理基準内にあるか監視するため、モニタリング方法を設定する。この設定はHACCPの12手順のうち7原則の一つである。",
    "choiceExplanations": {
      "ア": "HACCPチームの編成は分析を始める前の準備手順である。7原則は危害要因分析や重要管理点の決定から始まる。",
      "イ": "工程図が現場に合っているかを確認するのは、危害要因を分析するための準備手順である。",
      "ウ": "工程図の作成は、後に危害や管理点を検討するために行う準備に当たる。7原則に直接含まれる手順ではない。",
      "エ": "製品説明書は製品の特性を理解するために作る準備資料である。HACCPの7原則そのものには含まれない。",
      "オ": "重要管理点が管理基準内にあるか監視するため、モニタリング方法を設定する。この設定はHACCPの12手順のうち7原則の一つである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-unei-q40",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "annual",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-08-05",
    "qNumber": 40,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "RFM分析",
    "topicTags": [
      "RFM分析"
    ],
    "difficulty": 3,
    "question": "あるスーパーマーケットでは、直近 ３ 年分の ID-POS データ、およびそれに連動した顧客属性データを蓄積している。いま、このスーパーマーケットでは、CRM を強化するため、購買金額や購買頻度などからロイヤルカスタマーを定義したいと考えている。このとき、ロイヤルカスタマーを定義する方法に関する記述として、最も適切なものはどれか。なお、以下の方法を実行する際に必要となるデータ項目は、すべて利用可能であるとする。",
    "choices": {
      "ア": "ID-POS データから RFM 分析を行い、適切な分割数を設定していずれの項目でもランクの高い顧客をロイヤルカスタマーとして定義する。",
      "イ": "ID-POS データから、各商品の売上金額ベースの ABC 分析を行い、Ａランクの商品のみを購買している顧客をロイヤルカスタマーとして定義する。",
      "ウ": "各顧客について日別の購買金額を算出し、全期間における標準偏差を計算する。この標準偏差の値でデシル分析を行い、最も標準偏差の大きな顧客群をロイヤルカスタマーとして定義する。",
      "エ": "顧客属性データから、顧客の年齢と性別のデータを用いて、ｋ平均法で 10 のクラスターを形成し、顧客の所属が最も多いクラスターをロイヤルカスタマーとして定義する。",
      "オ": "顧客属性データから、顧客の年齢のデータを用いてデシル分析を行い、年代層が一番高い顧客群をロイヤルカスタマーとして定義する。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "RFM分析は最終購入時期、購入頻度、購入金額の三つを顧客ごとに評価する。いずれも上位なら最近も頻繁に多く買っている顧客を抽出できる。",
    "choiceExplanations": {
      "ア": "RFM分析は最終購入時期、購入頻度、購入金額の三つを顧客ごとに評価する。いずれも上位なら最近も頻繁に多く買っている顧客を抽出できる。",
      "イ": "商品のABC分析は、どの商品が売上に大きく貢献しているかを分類する。Ａランクの商品を買うことだけでは顧客の購入頻度や金額は分からない。",
      "ウ": "購入額の日別標準偏差は利用額のばらつきを示す。ばらつきが大きいからといって、安定して多く購入する顧客とは限らない。",
      "エ": "年齢や性別は顧客属性であり、頻度や購買金額を直接示さない。人数の多い属性群が高い購買実績を持つとは限らない。",
      "オ": "年齢のデシル分析は年齢の順位で顧客を区切る。購買金額や頻度に基づくロイヤルカスタマーの評価とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/D1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023dv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験 D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-20"
  }
];
