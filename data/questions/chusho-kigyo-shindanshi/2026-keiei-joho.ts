import type { Question } from "@/lib/questions/types";

export const CHUSHO_2026_F_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 1,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "NFC",
    "topicTags": [
      "NFC"
    ],
    "difficulty": 3,
    "question": "無線通信技術は、日常生活のさまざまな場面で活用されている。そのような無線通信技術の1 つにNFC がある。NFC の特徴や応用例に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "IC 運転免許証（IC カード免許証）やマイナンバーカードのIC チップの情報を読み取るのに用いられている。",
      "イ": "広範囲通信が可能な低消費電力の無線通信方式で、大量のIoT デバイスを接続して運用ができる。",
      "ウ": "赤外線方式のタッチセンサーで、位置情報を検出するために用いられている。",
      "エ": "センサーネットワークの構築に適した無線通信方式で、通信距離は10 m から75 m 程度である。",
      "オ": "店舗決済において、支払者がQR コードを表示して店舗側の処理端末に読み取らせるのに用いられている。"
    },
    "answer": "ア",
    "explanation": "NFCは近距離のICカード読取に使う。\n\n他の選択肢との違い：\nイ：広域・低消費電力通信はLPWAの説明。",
    "choiceExplanations": {
      "ア": "NFCは近距離のICカード読取に使う。",
      "イ": "広域・低消費電力通信はLPWAの説明。",
      "ウ": "赤外線タッチセンサーはNFCではない。",
      "エ": "数十mのセンサーネットワークはZigbee等の説明。",
      "オ": "QRコードは光学的に読む方式。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 2,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "RAID",
    "topicTags": [
      "RAID"
    ],
    "difficulty": 3,
    "question": "データの信頼性向上やアクセスの高速化を目的として、複数のHDD やSSD を組み合わせ、RAID を構成することがある。RAID に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "RAID 0 は、ミラーリングと呼ばれる方式で、複数のディスクに同じ内容を書き込み、信頼性を向上させる。",
      "イ": "RAID 1 は、最低3 台のディスクで構成され、そのうち1 台が故障してもリアルタイムにデータの復元ができる。",
      "ウ": "RAID 1 は、ストライピングと呼ばれる方式で、データをブロック単位で複数のディスクに分散することで、アクセスを高速化する。",
      "エ": "RAID 5 は、パリティ付きストライピングと呼ばれる方式で、ディスクが2 台同時に故障してもリアルタイムにデータの復元ができる。",
      "オ": "RAID 10 は、ミラーリングとストライピングを組み合わせた方式で、信頼性の向上と高速化の両方を実現できる。"
    },
    "answer": "オ",
    "explanation": "RAID 10はミラーリングとストライピングを併用する。\n\n他の選択肢との違い：\nア：RAID 0はストライピングで冗長性がない。",
    "choiceExplanations": {
      "ア": "RAID 0はストライピングで冗長性がない。",
      "イ": "RAID 1は2台からのミラーリング。",
      "ウ": "ストライピングはRAID 0。",
      "エ": "RAID 5が通常耐えられるディスク故障は1台。",
      "オ": "RAID 10はミラーリングとストライピングを併用する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 3,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "仮想化",
    "topicTags": [
      "仮想化"
    ],
    "difficulty": 3,
    "question": "仮想化技術は、種々の物理的なコンピュータ資源に対して用いられている。仮想\n化技術に関する記述の組み合わせとして、最も適切なものを下記の解答群から選\nべ。\nａ　1 台のコンピュータに複数のOS を導入しておき、コンピュータの電源投入後、\nOS を1 つだけ選択して使用できるようにする技術。\nｂ　サーバ上にユーザ専用の仮想マシンを割り当て、ユーザが社内だけでなく、自\n宅や外出先にある端末からネットワーク経由でデスクトップ環境を利用できるよ\nうにする技術。\nｃ　コンピュータの処理時間を短い時間単位に分割し、CPU などの資源を複数の\nユーザやタスクに割り当てることで、連続的・並行的に処理が行われているよう\nに見せる技術。\nｄ　複数の物理ストレージ装置を論理的に統合し、1 つの記憶領域（ストレージ\nプール）として管理する技術。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｄ",
      "ウ": "ｂとｃ",
      "エ": "ｂとｄ",
      "オ": "ｃとｄ"
    },
    "answer": "エ",
    "explanation": "bの仮想デスクトップとdのストレージ統合はいずれも仮想化技術。\n\n他の選択肢との違い：\nア：aのマルチブートは起動OSの選択であり、仮想化技術ではない。bはVDIで該当する。",
    "choiceExplanations": {
      "ア": "aのマルチブートは起動OSの選択であり、仮想化技術ではない。bはVDIで該当する。",
      "イ": "aのマルチブートは仮想化技術ではない。dのストレージ仮想化のみ該当する。",
      "ウ": "bのVDIは該当するが、cの時分割処理はマルチタスクで仮想化技術として問われていない。",
      "エ": "bの仮想デスクトップとdのストレージ統合はいずれも仮想化技術。",
      "オ": "dのストレージ仮想化は該当するが、cは時分割処理。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/keiei-joho/2026-F-q3-p3.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第3ページ。第3問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 4,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "コード体系",
    "topicTags": [
      "コード体系"
    ],
    "difficulty": 3,
    "question": "入力・検索・集計などの処理の効率化とデータの統一的な管理のために、使用するコード体系や表記ルールを定めておく必要がある。ニモニックコードに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "Ａ事業部の社員番号を1001 ～1999、Ｂ事業部の社員番号を2001 ～2999 というように、グループごとに定められた範囲内で、連続した番号を付与するコードのことである。",
      "イ": "上1 桁目を本支店コード（Ａ：東京本社、Ｂ：大阪支店）、上2 桁目を部署コード（1 ：営業部、2 ：経理部）というように、コードの1 桁ごとに意味を持たせたコードのことである。",
      "ウ": "注文番号を0001、0002 というように、レコードの発生順に基づいて順番に番号を付与するコードのことである。",
      "エ": "図書の日本十進分類法（NDC）のように、上位桁から下位桁にそれぞれ0 ～9の数字を付与し、階層的にデータを分類するコードのことである。",
      "オ": "日本をJP、米国をUS というように、対象を容易に連想できる略称などを用いて、英数字や記号で表したコードのことである。"
    },
    "answer": "オ",
    "explanation": "連想しやすい文字を用いるニモニックコード。\n\n他の選択肢との違い：\nア：意味を持つ番号帯は区分コードでありニモニックではない。",
    "choiceExplanations": {
      "ア": "意味を持つ番号帯は区分コードでありニモニックではない。",
      "イ": "各桁に意味を割り当てる桁別コード。",
      "ウ": "順に付番する順次コード。",
      "エ": "階層を数字で表現する階層コード。",
      "オ": "連想しやすい文字を用いるニモニックコード。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 5,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "UI・UX",
    "topicTags": [
      "UI・UX"
    ],
    "difficulty": 3,
    "question": "利用者視点に立ったWeb サイトを設計・開発することは重要である。UX/UI に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "アダプティブデザインとは、すべての人が、年齢や障がいの有無にかかわらず、Web サイトで提供されている機能や情報に容易にアクセスできるようにする設計方法のことである。",
      "イ": "ページネーションとは、Web ページの画面イメージを作成する際に用いられる、線と枠で構成された図面のことである。",
      "ウ": "メディアクエリとは、CSS の仕様の1 つで、利用者のデバイスや画面サイズなどの環境条件に応じて、適用するスタイルを切り替える仕組みのことである。",
      "エ": "レスポンシブデザインとは、Web サイト内のコンテンツを階層的に整理し、上位から下位へと段階的にたどり着けるようにする設計方法のことである。",
      "オ": "ワイヤーフレームとは、利用者のデバイスや画面サイズなどの環境条件に応じて、事前に用意した複数の固定レイアウトの中から最適なものを切り替えて表示する手法のことである。"
    },
    "answer": "ウ",
    "explanation": "メディアクエリは表示環境に応じCSSを適用する。\n\n他の選択肢との違い：\nア：これはアクセシビリティやユニバーサルデザインの説明。",
    "choiceExplanations": {
      "ア": "これはアクセシビリティやユニバーサルデザインの説明。",
      "イ": "ページネーションは複数ページへの分割と移動。",
      "ウ": "メディアクエリは表示環境に応じCSSを適用する。",
      "エ": "これは階層的な情報設計でありレスポンシブの定義ではない。",
      "オ": "環境別の固定レイアウト選択はアダプティブデザイン。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 6,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "クラウド",
    "topicTags": [
      "クラウド"
    ],
    "difficulty": 3,
    "question": "中小企業においてクラウドサービスの活用は有効な施策の1 つである。クラウドサービスの利用に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "IaaS を利用する場合、OS だけでなくミドルウェアの最新化もサービス利用者が責任を負う。",
      "イ": "PaaS を利用する場合、サービス利用者がハードウェアを自ら調達する必要がある。",
      "ウ": "SaaS を利用する場合、業務で入力されたデータの品質はサービス事業者によって保証される。",
      "エ": "SaaS を利用する場合、個人情報の漏えいに対してはサービス事業者が責任を負うためサービス利用者への影響はない。",
      "オ": "SaaS を利用する場合、サービス利用者はOS 管理者の権限について管理を行う。"
    },
    "answer": "ア",
    "explanation": "IaaSでは利用者がOSとミドルウェアを管理する。\n\n他の選択肢との違い：\nイ：PaaSでは基盤の調達・運用を事業者が担う。",
    "choiceExplanations": {
      "ア": "IaaSでは利用者がOSとミドルウェアを管理する。",
      "イ": "PaaSでは基盤の調達・運用を事業者が担う。",
      "ウ": "データ品質は利用者の入力・管理にも依存する。",
      "エ": "個人情報の法的責任は利用者側にも残る。",
      "オ": "SaaSではOSの管理・更新は通常サービス提供者が担う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 7,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "正規化",
    "topicTags": [
      "正規化"
    ],
    "difficulty": 3,
    "question": "次の表Ａ～Ｄのうち、第1 正規形であるが第2 正規形ではない表の組み合わせと\nして、最も適切なものを下記の解答群から選べ。項目名の下線は、その項目が主\nキーであることを表す。また、研修ID、部署ID、メンター社員ID に対して、そ\nれぞれ、研修名、部署名、メンター社員氏名は、一意に定まるものとする。\nＡ\n社員ID\n社員氏名\n入社日\n出身\n2511001\n情報 葉月\n2025-04-01\n東京都\nＢ\n社員ID\n研修ID\n研修名\n評価\n2511001\n3422\nビジネスマナー\nＳ\nＣ\n社員ID\n社員氏名\n部署ID\n部署名\n2511001\n情報 葉月\nU302\n情報システム部\nＤ\n社員ID\nメンター社員ID\n社員氏名\nメンター社員氏名\n2511001\n2012345\n情報 葉月\n中小 博士",
    "choices": {
      "ア": "ＡとＢ",
      "イ": "ＡとＣ",
      "ウ": "ＡとＤ",
      "エ": "ＢとＣ",
      "オ": "ＢとＤ"
    },
    "answer": "オ",
    "explanation": "Bは複合キーの研修IDだけで研修名が定まり、Dは複合キーのメンター社員IDだけでメンター氏名が定まる。",
    "choiceExplanations": {
      "ア": "Aは単一キーで部分関数従属がない。Bだけが該当。",
      "イ": "Aは第2正規形を満たし、Cも社員IDが主キーなので部分従属はない。",
      "ウ": "Aは第2正規形を満たす。Dだけが該当。",
      "エ": "Bは該当するが、Cは社員IDが主キーで第2正規形を満たす。",
      "オ": "Bは複合キーの研修IDだけで研修名が定まり、Dは複合キーのメンター社員IDだけでメンター氏名が定まる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/keiei-joho/2026-F-q7-p7.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第7ページ。第7問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 8,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "SQL",
    "topicTags": [
      "SQL"
    ],
    "difficulty": 3,
    "question": "ある小売店では、以下に示す「販売記録」表を用いて販売管理を行っている。\n販売記録\n管理ID\n注文ID\n日付\n顧客ID\n顧客名\n商品ID\n数量\n販売金額\n1\nTK-10001\n2026-04-01\nC-0003\n会計 春香\nP-101\n2\n36000\n2\nTK-10001\n2026-04-01\nC-0003\n会計 春香\nP-102\n1\n25000\n3\nTK-10002\n2026-04-02\nC-0006\n法務 冬美\nP-102\n3\n75000\n4\nTK-10003\n2026-04-03\nC-0002\n政策 次郎\nP-101\n3\n54000\n5\nTK-10003\n2026-04-03\nC-0002\n政策 次郎\nP-103\n5\n60000\n6\nTK-10004\n2026-04-06\nC-0005\n運営 秋子\nP-102\n2\n50000\n7\nTK-10005\n2026-04-06\nC-0004\n経営 夏美\nP-101\n1\n18000\n8\nTK-10005\n2026-04-06\nC-0004\n経営 夏美\nP-102\n1\n25000\n9\nTK-10005\n2026-04-06\nC-0004\n経営 夏美\nP-103\n1\n12000\n10\nTK-10006\n2026-04-07\nC-0001\n経済 一郎\nP-102\n2\n50000\n…\n…\n…\n…\n…\n…\n…\n…\n　顧客や商品の販売傾向を分析するために、この「販売記録」表からいくつかの表を\n作成するSQL 文を考えた。次のSQL 文①とSQL 文②に対する説明文ａ～ｆの組\nみ合わせとして、最も適切なものを下記の解答群から選べ。\n【SQL 文①】\n　SELECT　顧客ID，SUM（販売金額）　AS　合計\n　FROM　販売記録　GROUP BY　顧客ID　ORDER BY　合計　DESC;\n【SQL 文②】\n　SELECT　商品ID，COUNT（顧客ID）　AS　総数\n　FROM　販売記録　GROUP BY　商品ID　ORDER BY　総数　ASC;\n\n［説明文］\nａ　顧客ID、および顧客ID ごとの販売金額の合計を、合計額の小さい順に表示\nする。\nｂ　顧客ID、および顧客ID ごとの販売金額の合計を、合計額の大きい順に表示\nする。\nｃ　顧客ID、および顧客ID ごとの販売商品数の合計を、合計数の多い順に表示\nする。\nｄ　商品ID、および商品ID ごとに販売したユニーク顧客数（同一顧客ID の重\n複を除く）の総数を、総数の多い順に表示する。\nｅ　商品ID、および商品ID ごとに販売したユニーク顧客数（同一顧客ID の重\n複を除く）の総数を、総数の少ない順に表示する。\nｆ　商品ID、および商品ID ごとに販売した延べ顧客数（同一顧客ID の重複を\n含む）の総数を、総数の少ない順に表示する。",
    "choices": {
      "ア": "SQL 文①：ａ　　SQL 文②：ｄ",
      "イ": "SQL 文①：ａ　　SQL 文②：ｅ",
      "ウ": "SQL 文①：ｂ　　SQL 文②：ｅ",
      "エ": "SQL 文①：ｂ　　SQL 文②：ｆ",
      "オ": "SQL 文①：ｃ　　SQL 文②：ｆ"
    },
    "answer": "エ",
    "explanation": "①はSUMを降順、②はCOUNTを昇順で延べ顧客数を示す。\n\n他の選択肢との違い：\nア：①は降順なのでaではなくb、②も重複を数える。",
    "choiceExplanations": {
      "ア": "①は降順なのでaではなくb、②も重複を数える。",
      "イ": "①は降順でb、②は延べ件数でf。",
      "ウ": "②はDISTINCTがなくユニーク数ではない。",
      "エ": "①はSUMを降順、②はCOUNTを昇順で延べ顧客数を示す。",
      "オ": "①は数量合計ではなく販売金額合計。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/keiei-joho/2026-F-q8-p8.png",
      "/images/questions/chusho-kigyo-shindanshi/2026/keiei-joho/2026-F-q8-p9.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第8ページ。第8問の表・図・解答群を含む。",
      "公式問題PDFの第9ページ。第8問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 9,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "通信プロトコル",
    "topicTags": [
      "通信プロトコル"
    ],
    "difficulty": 3,
    "question": "ネットワークの通信プロトコルに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "ICMP とは、IP アドレスから対応するMAC アドレスを調べるためのプロトコルのことである。",
      "イ": "IMAP とは、電子メールをサーバに保存したまま、複数の端末から管理・閲覧するためのプロトコルのことである。",
      "ウ": "NTP とは、ネットワークに接続されている機器の情報を収集し、監視・制御するためのプロトコルのことである。",
      "エ": "SOAP とは、2 台の機器の間で仮想的な専用の伝送路を確立して、データ転送を行うためのプロトコルのことである。",
      "オ": "UDP とは、データ転送において速度よりも信頼性を重視し、通信相手と接続してから通信を行うコネクション型のプロトコルのことである。"
    },
    "answer": "イ",
    "explanation": "IMAPはメールをサーバ上で管理・閲覧する。\n\n他の選択肢との違い：\nア：IPからMACを調べるのはARP。",
    "choiceExplanations": {
      "ア": "IPからMACを調べるのはARP。",
      "イ": "IMAPはメールをサーバ上で管理・閲覧する。",
      "ウ": "機器監視・管理はSNMPでありNTPは時刻同期。",
      "エ": "SOAPはXMLベースのメッセージ交換仕様。",
      "オ": "UDPは接続を確立しない方式。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 10,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "RASIS",
    "topicTags": [
      "RASIS"
    ],
    "difficulty": 3,
    "question": "情報システムの非機能要件を定める際の指標にRASIS がある。RASIS に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "信頼性（Reliability）とは、誤操作や障害などによるデータの喪失や不整合の起こりにくさのことをいう。",
      "イ": "可用性（Availability）とは、データ量の変動に対する拡張のしやすさのことをいう。",
      "ウ": "保守性（Serviceability）とは、メンテナンスや障害からの復旧のしやすさのことをいう。",
      "エ": "完全性（Integrity）とは、機器の故障など、障害発生の起こりにくさのことをいう。",
      "オ": "安全性（Security）とは、システムの稼働が期待される時間に対する実際の稼働時間の割合のことをいう。"
    },
    "answer": "ウ",
    "explanation": "Serviceabilityは保守や復旧の容易さ。\n\n他の選択肢との違い：\nア：RASISのReliabilityは故障しにくさ。",
    "choiceExplanations": {
      "ア": "RASISのReliabilityは故障しにくさ。",
      "イ": "Availabilityは稼働可能な状態の割合。",
      "ウ": "Serviceabilityは保守や復旧の容易さ。",
      "エ": "Integrityはデータの完全性・整合性。",
      "オ": "Securityは不正アクセス等への安全性。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 11,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "IT投資評価",
    "topicTags": [
      "IT投資評価"
    ],
    "difficulty": 3,
    "question": "IT 投資対象には、基幹業務システムやIT 基盤の整備、また、新事業創出に向けた情報システム構築のようにさまざまなものがある。そのため、IT 投資評価の視点は、個別プロジェクトの評価、投資案件全体の評価、ならびにIT 組織の成熟度評価など多岐にわたる。下記の記述のうち、最も適切なものはどれか。",
    "choices": {
      "ア": "BSC の4 つの視点の因果関係を視覚化したフレームワークに戦略マップがあり、「財務→内部プロセス→顧客→学習と成長」の順にパスを描くことで、個別プロジェクトと財務成果の因果関係を視覚化できる。",
      "イ": "CMMI に基づく組織成熟度の第4 段階は、業務やプロジェクトを遂行する際のプロセスが最適化されてはいないものの、定量的な管理がなされている状態である。",
      "ウ": "COBIT において、EDM（Evaluate, Direct and Monitor）は個別プロジェクトのIT 投資評価手法である。",
      "エ": "ISMS は情報システムが企画・開発されてから、運用・保守を経て、最終的に廃棄されるまでのシステムライフサイクル全体における、IT 投資の財務的評価を行うフレームワークである。"
    },
    "answer": "イ",
    "explanation": "CMMIレベル4は定量的に管理され、最適化はレベル5。\n\n他の選択肢との違い：\nア：戦略マップは学習と成長から内部プロセス、顧客、財務へつなぐ。",
    "choiceExplanations": {
      "ア": "戦略マップは学習と成長から内部プロセス、顧客、財務へつなぐ。",
      "イ": "CMMIレベル4は定量的に管理され、最適化はレベル5。",
      "ウ": "COBITのEDMはガバナンス領域。",
      "エ": "ISMSは情報セキュリティ管理の仕組み。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 12,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "デジタル技術",
    "topicTags": [
      "デジタル技術"
    ],
    "difficulty": 3,
    "question": "デジタル空間と現実世界の融合を支える基盤技術に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "DAO とは、ユーザ間でコミュニケーションが可能な、インターネットを通じてアクセスできる、仮想的なデジタル空間のことである。",
      "イ": "サイバーフィジカルシステムとは、サイバー攻撃を防ぐための物理レイヤ暗号技術を用いたシステムのことである。",
      "ウ": "スマートコントラクトとは、契約または合意の条件が満たされると契約内容を自動的に実行・記録する、ブロックチェーン上に保存されたプログラムのことである。",
      "エ": "デジタルツインとは、ロボットなどの移動体が移動しながら自分の位置を推定し、同時に周囲の環境地図を作成する技術のことである。",
      "オ": "ブロックチェーンとは、現実世界のデータの整合性を維持する台帳を、1 つのサーバで一元的に管理する技術のことである。"
    },
    "answer": "ウ",
    "explanation": "スマートコントラクトは条件成立時に自動実行されるプログラム。\n\n他の選択肢との違い：\nア：DAOは分散型自律組織。",
    "choiceExplanations": {
      "ア": "DAOは分散型自律組織。",
      "イ": "サイバーフィジカルシステムは現実世界のデータとサイバー空間の分析を連携する。",
      "ウ": "スマートコントラクトは条件成立時に自動実行されるプログラム。",
      "エ": "位置推定と地図作成はSLAM。",
      "オ": "ブロックチェーンは分散型台帳。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 13,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "開発手法",
    "topicTags": [
      "開発手法"
    ],
    "difficulty": 3,
    "question": "IT エンジニアでなくても、さまざまなアプリケーションの導入や開発が可能となりつつある。　それらに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "AI の民主化とは、AI の利用や開発などのプロセスにおいて、専門家でなくても誰もが参画できるようにするという考え方のことである。",
      "イ": "API とは、企業内で生成AI 利用時に、内部の資料などを参照して回答精度を向上させる手法のことである。",
      "ウ": "シャドーIT とは、情報システム部に申請しなくても利用できる、安全性の確認が終わっているアプリケーションのことである。",
      "エ": "モダナイゼーションとは、これまで人間がパソコン上で行ってきた作業をソフトウェアロボットにより自動化する手法のことである。",
      "オ": "ローコード開発とは、必要最小限のソースコードでアプリケーションを開発する手法で、AI 開発でよく利用されるPython はその一例である。"
    },
    "answer": "ア",
    "explanation": "専門家以外にもAI利用・開発を開く概念。\n\n他の選択肢との違い：\nイ：APIはソフトウェア間の機能・データ連携の窓口。資料検索を伴う生成AIはRAG。",
    "choiceExplanations": {
      "ア": "専門家以外にもAI利用・開発を開く概念。",
      "イ": "APIはソフトウェア間の機能・データ連携の窓口。資料検索を伴う生成AIはRAG。",
      "ウ": "シャドーITは組織が把握・承認しないIT利用。",
      "エ": "定型操作のソフトウェア自動化はRPA。",
      "オ": "Pythonはプログラミング言語で、ローコードの例ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 14,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "不正防止",
    "topicTags": [
      "不正防止"
    ],
    "difficulty": 3,
    "question": "不正のトライアングルとは、「機会」と「正当化」と「動機」の3 要因がそろったときに不正が発生しやすくなるという考え方である。中小企業においてもコンピュータ犯罪を含む内部不正を防止するには、これらの要因を適切に管理し、不正発生のリスクを低減させることが重要となる。不正のトライアングルの要因である「機会」に関する対策の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　アクセスログを監視する。ｂ　過度なノルマや業績プレッシャーを緩和する。ｃ　情報システムへの適切なアクセス権限を付与する。ｄ　従業員の個人的な問題解決を支援する制度を導入する。ｅ　情報倫理教育を徹底する。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｃ",
      "ウ": "ｂとｄ",
      "エ": "ｃとｅ",
      "オ": "ｄとｅ"
    },
    "answer": "イ",
    "explanation": "aのログ監視とcの権限管理は不正の機会を減らす。\n\n他の選択肢との違い：\nア：aは機会を減らすがbは動機の緩和。",
    "choiceExplanations": {
      "ア": "aは機会を減らすがbは動機の緩和。",
      "イ": "aのログ監視とcの権限管理は不正の機会を減らす。",
      "ウ": "bとdは主に動機への対応。",
      "エ": "cは機会だがeは正当化への対応。",
      "オ": "dは動機、eは正当化への対応。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 15,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ソフトウェアテスト",
    "topicTags": [
      "ソフトウェアテスト"
    ],
    "difficulty": 3,
    "question": "情報システムの品質を確保・向上させるために、ソフトウェアのテストは重要である。テストに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "A/B テストとは、2 つのパラメータ間の組み合わせを網羅して行うテストのことである。",
      "イ": "回帰（リグレッション）テストとは、プログラムを修正した場合、修正していない他の部分に影響が現れていないかどうかを確認するテストのことである。",
      "ウ": "同値分割法とは、テスト対象の仕様の中で示される値を境にして処理内容が変わる場合に、境界付近の値でテストケースを作成する方法のことである。",
      "エ": "ブランチテストとは、入力条件の組み合わせと対応する出力結果を決定表に整理して行うテストのことである。",
      "オ": "ホワイトボックステストとは、プログラムの内部構造やコードを考慮せず、外部からの入力と出力だけに着目して行うテストのことである。"
    },
    "answer": "イ",
    "explanation": "回帰テストは変更が既存機能に与えた影響を調べる。\n\n他の選択肢との違い：\nア：A/Bテストは2案の成果比較。",
    "choiceExplanations": {
      "ア": "A/Bテストは2案の成果比較。",
      "イ": "回帰テストは変更が既存機能に与えた影響を調べる。",
      "ウ": "これは境界値分析の説明。同値分割は同等の振る舞いをする値を群に分ける。",
      "エ": "これは決定表テスト。ブランチテストは分岐の実行を確認する。",
      "オ": "これはブラックボックステスト。ホワイトボックスは内部構造を見る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 16,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "アジャイル",
    "topicTags": [
      "アジャイル"
    ],
    "difficulty": 3,
    "question": "2001 年にソフトウェア開発の専門家により作成された「アジャイルソフトウェア開発宣言」では、ソフトウェア開発を進めるうえでの価値観を「～よりも～を価値とする」という形式で表現している。この宣言に当てはまる記述の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　個人との対話よりもプロセスの自動化を価値とする。ｂ　包括的なドキュメントよりも動くソフトウェアを価値とする。ｃ　契約交渉よりも顧客との協調を価値とする。ｄ　変化への対応よりも計画に従うことを価値とする。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｃ",
      "ウ": "ａとｄ",
      "エ": "ｂとｃ",
      "オ": "ｂとｄ"
    },
    "answer": "エ",
    "explanation": "bの動くソフトウェアとcの顧客との協調を重視するのが宣言の内容。\n\n他の選択肢との違い：\nア：aは個人と対話よりプロセス自動化を重視しており宣言と逆。bだけ正しい。",
    "choiceExplanations": {
      "ア": "aは個人と対話よりプロセス自動化を重視しており宣言と逆。bだけ正しい。",
      "イ": "aは個人と対話よりプロセス自動化を重視しており宣言と逆。cだけ正しい。",
      "ウ": "aは個人との対話、dは変化への対応を宣言とは逆の位置に置いている。",
      "エ": "bの動くソフトウェアとcの顧客との協調を重視するのが宣言の内容。",
      "オ": "bは正しいがdは計画に従うことを変化への対応より重視しており逆。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 17,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ソフトウェアライセンス",
    "topicTags": [
      "ソフトウェアライセンス"
    ],
    "difficulty": 3,
    "question": "デジタル著作物のライセンスに関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　シェアウェアライセンスとは、コピーレフトライセンスの1 つで、誰もが共有できるようにソースコードを公開する義務がある。ｂ　クリエイティブ・コモンズ・ライセンスとは、著作物の利用条件を作者が明示するための標準化されたライセンス体系であり、提示された条件の範囲で利用できることを示すための仕組みである。ｃ　クリックラップ契約とは、ソフトウェアのインストールやWeb サービスを利用・購入するにあたって、「承認」などのボタンをクリックすることで一連の契約条件に同意したことを示す契約方式である。ｄ　フリーソフトウェアライセンスとは、開発者が著作権を放棄したソフトウェアのライセンスであり、誰でも自由に利用や改変、再配布を行うことができる。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：正　　ｄ：誤",
      "イ": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：正",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤　　ｄ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：正　　ｄ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正"
    },
    "answer": "エ",
    "explanation": "a誤・b正・c正・d誤。クリックによる同意はクリックラップ。\n\n他の選択肢との違い：\nア：aは誤りでシェアウェアにソース公開義務はない。",
    "choiceExplanations": {
      "ア": "aは誤りでシェアウェアにソース公開義務はない。",
      "イ": "aは誤り、dも著作権放棄を意味しない。",
      "ウ": "bは正しく利用条件の標準的表示。",
      "エ": "a誤・b正・c正・d誤。クリックによる同意はクリックラップ。",
      "オ": "bは正、dは誤。フリーソフトウェアにも著作権はある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 18,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "TCO",
    "topicTags": [
      "TCO"
    ],
    "difficulty": 3,
    "question": "従業員数200 名のある企業では、新規ビジネスのために情報システムの導入・開\n発を計画している。SaaS を利用する計画Ａ、IaaS とオンプレミスを連動させる計\n画Ｂ、オンプレミスのみで運用する計画Ｃの3 つの案に対して費用を見積もったと\nころ、以下に示す表のとおりとなった。\n計画案　（単位：百万円）\n費用\n計画Ａ\n計画Ｂ\n計画Ｃ\n基盤整備費用\n 1\n 1\n 5\nシステム導入・開発費用\n10\n30\n30\n導入教育費用\n 5\n 5\n 5\nネットワーク通信費用／年\n 3\n 1\n 1\n保守費用／年\n 0\n 4\n 7\nシステム運用費用／年\n 3\n 5\n 7\nクラウドサービス利用料／年\n※\n 6\n 0\n　※　契約するサービスの月額料金と契約アカウント数によって変動する。\n　次の文章の空欄①～③に入る語句の組み合わせとして、最も適切なものを下記の\n解答群から選べ。なお、このシステムは導入・開発後、5 年間使用されるものとす\nる。\n　計画Ａにおいて、1 アカウント当たり月額10,000 円のサービスを100 アカウン\nト契約する場合、年間のクラウドサービス利用料は　　①　　百万円となる。この\n場合、5 年間の総費用が最も高いのは、計画　　②　　である。また、計画Ａにお\nいて、1 アカウント当たり月額10,000 円のサービスを契約する場合、5 年間の総\n費用が、計画Ｃと同じになる契約アカウント数は　　③　　である。",
    "choices": {
      "ア": "①：10　　②：Ａ　　③：115",
      "イ": "①：10　　②：Ｃ　　③：120",
      "ウ": "①：12　　②：Ａ　　③：115",
      "エ": "①：12　　②：Ｂ　　③：115",
      "オ": "①：12　　②：Ｂ　　③：120"
    },
    "answer": "エ",
    "explanation": "Aの年額12、Bの5年総費用が最大、Cと等しいAの契約数は115。\n\n他の選択肢との違い：\nア：100アカウントの年額は12百万円。",
    "choiceExplanations": {
      "ア": "100アカウントの年額は12百万円。",
      "イ": "年額は12百万円。",
      "ウ": "5年総費用最大はBでありAではない。",
      "エ": "Aの年額12、Bの5年総費用が最大、Cと等しいAの契約数は115。",
      "オ": "Cとの等価アカウント数は115。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/keiei-joho/2026-F-q18-p18.png",
      "/images/questions/chusho-kigyo-shindanshi/2026/keiei-joho/2026-F-q18-p19.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第18ページ。第18問の表・図・解答群を含む。",
      "公式問題PDFの第19ページ。第18問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 19,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "EVM",
    "topicTags": [
      "EVM"
    ],
    "difficulty": 3,
    "question": "Ａ社では、BAC（完成時総予算）が1,200 万円のシステム開発プロジェクトが進行中である。プロジェクト期間は4 カ月である。このプロジェクトに関する以下の文章の空欄①～③に入る数値の組み合わせとして、最も適切なものを下記の解答群から選べ。　プロジェクト開始から2 カ月経過した時点で進捗を把握したところ、AC（コスト実績値）が500 万円、EV（出来高実績値）が480 万円であった。したがって、この時点でのCPI（コスト効率指数）は　　①　　である。　4 カ月のうち3 カ月経過した時点での出来高計画値（PV）は900 万円に設定されている。この時点でのSPI（スケジュール効率指数）が0.9 以上となるためには、EV は　　②　　万円以上でなければならない。　3 カ月経過した時点で進捗を確認したところ、EV は　　②　　万円であり、AC は、729 万円であった。このままのコスト効率でプロジェクトが進んでいくと、予測される完成時の総コストは　　③　　万円である。",
    "choices": {
      "ア": "①：0.96　　②：800　　③：1,080",
      "イ": "①：0.96　　②：810　　③：1,080",
      "ウ": "①：0.96　　②：810　　③：1,333",
      "エ": "①：1.04　　②：800　　③：1,333",
      "オ": "①：1.04　　②：810　　③：1,080"
    },
    "answer": "イ",
    "explanation": "AC729÷EV810=0.9、EAC=1200÷0.9=約1333。\n\n他の選択肢との違い：\nア：SPI0.9に必要なEVは900×0.9=810。",
    "choiceExplanations": {
      "ア": "SPI0.9に必要なEVは900×0.9=810。",
      "イ": "AC729÷EV810=0.9、EAC=1200÷0.9=約1333。",
      "ウ": "2カ月時CPI=480÷500=0.96、3カ月時EV810、EAC約1333。",
      "エ": "2カ月時CPIは1.04ではない。",
      "オ": "2カ月時CPIは1.04ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 20,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "DX人材",
    "topicTags": [
      "DX人材"
    ],
    "difficulty": 3,
    "question": "独立行政法人情報処理推進機構（IPA）と経済産業省は、DX 推進における人材育成の重要性を踏まえて2026 年4 月に「デジタルスキル標準」（ver. 2.0）を公表し、その中で6 つの人材類型を定義している。本類型の1 つである「ビジネスアーキテクト」がDX 推進において担う役割に含まれるものとして、最も適切なものはどれか。",
    "choices": {
      "ア": "情報システムの構築に際し、求められる品質・コスト・納期で必要となる機能を実現するために、リソースや進捗の管理、また、プロジェクト推進上の問題への対応を行う。",
      "イ": "情報システムのユーザから業務内容や要望を確認し、情報システムの機能設計を担う。",
      "ウ": "データを活用した業務変革や新規ビジネスの実現に向けて、データ解析やAIシステムに関する仕組みの設計・実装・運用を担う。",
      "エ": "ビジネスや業務の変革で実現したい目的を定義したうえで、経営視点で最適なビジネスモデルなどを設計し、関係者をコーディネートしプロセス全体を牽引して成果を創出する。",
      "オ": "ユーザの課題や行動から顧客価値を定義し、製品・サービスのありかたのデザインを担う。"
    },
    "answer": "エ",
    "explanation": "経営視点で目的・ビジネスモデルを設計し関係者を牽引する役割。\n\n他の選択肢との違い：\nア：プロジェクトマネジメント職の説明。",
    "choiceExplanations": {
      "ア": "プロジェクトマネジメント職の説明。",
      "イ": "情報システムの機能設計に寄った役割。",
      "ウ": "データサイエンティスト等の役割。",
      "エ": "経営視点で目的・ビジネスモデルを設計し関係者を牽引する役割。",
      "オ": "UXデザイナー等の役割。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 21,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "システム調達",
    "topicTags": [
      "システム調達"
    ],
    "difficulty": 3,
    "question": "中小企業では情報システムの調達や開発を外部に委託することが多い。契約に先駆けて行う、仕様の策定からベンダー選定までのシステム開発の上流工程に関する以下の文章の空欄Ａ～Ｃに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。　業務システムの導入検討では、まず現場の業務フローをヒアリングし、課題や改善ニーズを整理する。システム導入の目的に適合している製品やサービスが分からない場合は、必要に応じてＡを作成し、ベンダーから調達や開発に必要な情報を収集する。次にシステム開発の背景や現状の課題、機能面の仕様、予算や希望納期などをまとめておき、適任のベンダーを選定するために複数のベンダーに対してＢを配付する。各ベンダーから提案を受け取り、デモンストレーションやヒアリングを通じて比較検討を行う。ベンダー選定にあたっては、コストだけでなく、導入実績、サポート体制、与信情報、将来的な拡張性なども重要な評価視点となる。選定後は、納期や契約条件について詳細な調整を行い、正式な契約締結へと進む。　なお、AI のような新しい技術の導入に関して技術的実現性を確認したい場合には、ベンダーとＣを実施することもある。",
    "choices": {
      "ア": "Ａ：RFIＢ：RFPＣ：PoB",
      "イ": "Ａ：RFIＢ：RFPＣ：PoC",
      "ウ": "Ａ：RFPＢ：RFIＣ：PoB",
      "エ": "Ａ：RFPＢ：RFIＣ：PoC",
      "オ": "Ａ：RFPＢ：RFQＣ：PoV"
    },
    "answer": "イ",
    "explanation": "情報収集RFI、提案依頼RFP、概念実証PoCの順。\n\n他の選択肢との違い：\nア：実現可能性の確認はPoC。",
    "choiceExplanations": {
      "ア": "実現可能性の確認はPoC。",
      "イ": "情報収集RFI、提案依頼RFP、概念実証PoCの順。",
      "ウ": "RFPとRFIが逆。",
      "エ": "RFPとRFIが逆。",
      "オ": "初期の情報収集はRFI、提案依頼はRFP。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 22,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "サイバー攻撃",
    "topicTags": [
      "サイバー攻撃"
    ],
    "difficulty": 3,
    "question": "企業はさまざまなサイバー攻撃の脅威にさらされている。サイバー攻撃に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "DDoS 攻撃とは、標的のサーバやネットワークに対して、複数のコンピュータから大量のリクエストを集中させて過負荷状態にし、正常なサービスの継続を妨害する攻撃である。",
      "イ": "中間者攻撃とは、悪意のあるコードがソフトウェア内に埋め込まれ、通常の認証手順を迂回してシステムやネットワークにアクセスできるようにする攻撃である。",
      "ウ": "バックドアとは、標的とする企業ではなく取引先などを狙い、そこを踏み台にして攻撃を行うことである。",
      "エ": "バッファオーバーランとは、修正パッチが存在しない未知の脆ぜい弱じゃく性を突く攻撃である。",
      "オ": "フィッシングとは、他人のコンピュータのファイルを暗号化することで正常にアクセスできない状態にし、元に戻すために身代金の支払いが要求される攻撃である。"
    },
    "answer": "ア",
    "explanation": "DDoSは分散した送信元で標的を過負荷にする。\n\n他の選択肢との違い：\nイ：記述はバックドアで中間者攻撃ではない。",
    "choiceExplanations": {
      "ア": "DDoSは分散した送信元で標的を過負荷にする。",
      "イ": "記述はバックドアで中間者攻撃ではない。",
      "ウ": "記述はサプライチェーン攻撃。",
      "エ": "未知の脆弱性を突くのはゼロデイ攻撃。",
      "オ": "暗号化と身代金要求はランサムウェア。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 23,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ネットワーク防御",
    "topicTags": [
      "ネットワーク防御"
    ],
    "difficulty": 3,
    "question": "社内にある情報システムをインターネットに接続して運用する場合、セキュリティ面の対策が必要となる。　この対策に関する記述の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　自社が運用するEC サイトへの社外からの攻撃に備えるため、Web アプリケーションサーバとデータベースサーバをDMZ に配置している。ｂ　Web アプリケーションサーバへの攻撃を防御するため、WAF によって受信したデータのチェックを行っている。ｃ　社外ネットワークからDMZ サーバ群への不正なアクセスを遮断するため、ファイアウォールにおいて接続時のポート番号を制限している。ｄ　社外ネットワークからのメールを受信する際、社内のファイルサーバ内に設置したサンドボックスの環境を用いて、メールにマルウェアなどが含まれていないか確認している。",
    "choices": {
      "ア": "ａとｃ",
      "イ": "ａとｄ",
      "ウ": "ｂとｃ",
      "エ": "ｂとｄ",
      "オ": "ｃとｄ"
    },
    "answer": "ウ",
    "explanation": "bのWAFによるWeb通信検査とcのFWのポート制限は適切。\n\n他の選択肢との違い：\nア：aはDBを外部に近いDMZに置く点が危険。cのポート制限のみ適切。",
    "choiceExplanations": {
      "ア": "aはDBを外部に近いDMZに置く点が危険。cのポート制限のみ適切。",
      "イ": "aのDBをDMZに置く点とdの社内ファイルサーバ内で検査する点が不適切。",
      "ウ": "bのWAFによるWeb通信検査とcのFWのポート制限は適切。",
      "エ": "bは正しいがdの社内ファイルサーバ内のサンドボックス配置は不適切。",
      "オ": "cは適切だがdは社内ファイルサーバに疑わしいメールを持ち込む構成。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 24,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "機械学習評価",
    "topicTags": [
      "機械学習評価"
    ],
    "difficulty": 3,
    "question": "ある二値分類問題に対する2 つの予測モデルＡとＢに対して、1,000 件のデータ\nを用いて性能評価を行ったところ、以下の混同行列が得られた。\nモデルＡ\nモデルＢ\n予測：陽性\n予測：陰性\n予測：陽性\n予測：陰性\n実際：陽性\n480\n270\n実際：陽性\n420\n80\n実際：陰性\n120\n130\n実際：陰性\n280\n220\n　モデルＡとＢの性能評価に関する以下の説明文の空欄①～④に入る語句の組み合\nわせとして、最も適切なものを下記の解答群から選べ。ただし、適合率、再現率、\nＦ値は、次のように定義される。\n・適合率：陽性と予測した件数のうち、実際も陽性である割合\n・再現率：実際に陽性である件数のうち、陽性と予測した割合\n・Ｆ値：2 ×適合率×再現率÷（適合率＋再現率）で計算される値\n［説明文］\n　モデルＡとモデルＢを比較したとき、適合率が大きいのは　　①　　である。ま\nた、再現率が大きいのは　　②　　である。一方、　　③　　を意味するＦ値が大\nきいのは　　④　　である。",
    "choices": {
      "ア": "①：モデルＡ　　②：モデルＡ　　③：幾何平均　　④：モデルＢ",
      "イ": "①：モデルＡ　　②：モデルＢ　　③：調和平均　　④：モデルＡ",
      "ウ": "①：モデルＡ　　②：モデルＢ　　③：調和平均　　④：モデルＢ",
      "エ": "①：モデルＢ　　②：モデルＡ　　③：調和平均　　④：モデルＡ",
      "オ": "①：モデルＢ　　②：モデルＡ　　③：幾何平均　　④：モデルＢ"
    },
    "answer": "イ",
    "explanation": "Aの再現率は480/750=0.64、Bは420/500=0.84。F値はAの方が大きい。\n\n他の選択肢との違い：\nア：F値は調和平均で幾何平均ではない。",
    "choiceExplanations": {
      "ア": "F値は調和平均で幾何平均ではない。",
      "イ": "Aの再現率は480/750=0.64、Bは420/500=0.84。F値はAの方が大きい。",
      "ウ": "Aの適合率0.8、Bは0.6。再現率はBが大きく、F値はA約0.711、B約0.700。",
      "エ": "適合率はAが大きい。",
      "オ": "適合率はAが大きく、F値は調和平均。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/keiei-joho/2026-F-q24-p25.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第25ページ。第24問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-keiei-joho-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2026,
    "qNumber": 25,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "AIガバナンス",
    "topicTags": [
      "AIガバナンス"
    ],
    "difficulty": 3,
    "question": "総務省と経済産業省は、AI 開発・提供・利用にあたって必要な取り組みについての基本的な考え方を示す「AI 事業者ガイドライン」（第1.2 版）を令和8 年3 月に公開した。このガイドラインでは、AI の事業活動を担う主体として、「AI 開発者」、「AI 提供者」及び「AI 利用者」を想定し、各主体に対する共通の指針の1 つとして、公平性を掲げている。各主体は、AI システム・サービスの開発・提供・利用において、特定の個人ないし集団への人種、性別、国籍、年齢、政治的信念、宗教等の多様な背景を理由とした不当で有害な偏見及び差別をなくすよう努め、それでも回避できないバイアスがあることを認識しつつ、この回避できないバイアスが人権及び多様な文化を尊重する観点から許容可能か評価することが重要であると指摘している。　このガイドラインにおいて、公平性に関して「AI 利用者」にとって重要となる事項として、最も適切なものを下記の解答群から選べ。なお、AI の事業活動を担う主体は、次のように定義されている。＜AI の事業活動を担う主体＞・AI 開発者 ：AI システムを開発する事業者（AI を研究開発する事業者を含む）・AI 提供者 ：AI システムをアプリケーション、製品、既存のシステム、ビジネスプロセス等に組み込んだサービスとしてAI 利用者、場合によっては業務外利用者に提供する事業者・AI 利用者 ：事業活動において、AI システム又はAI サービスを利用する事業者（注）AI の活用方法によっては、同一の事業者がAI 開発者、AI 提供者、又はAI利用者の複数を兼ねる場合もある。",
    "choices": {
      "ア": "AI システム・サービスの構成及びデータに含まれるバイアスへの配慮",
      "イ": "AI モデルのアルゴリズム等に含まれるバイアスへの配慮",
      "ウ": "セキュリティ対策のための仕組みの導入",
      "エ": "入力データ又はプロンプトに含まれるバイアスへの配慮"
    },
    "answer": "エ",
    "explanation": "利用者は入力データやプロンプトに偏りが含まれないよう配慮する。\n\n他の選択肢との違い：\nア：システム構成・データのバイアスは主に提供者の設計段階で扱う。",
    "choiceExplanations": {
      "ア": "システム構成・データのバイアスは主に提供者の設計段階で扱う。",
      "イ": "モデル・アルゴリズムのバイアスは主に開発者が扱う。",
      "ウ": "セキュリティ対策は公平性の項目への直接の回答ではない。",
      "エ": "利用者は入力データやプロンプトに偏りが含まれないよう配慮する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/F1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026F.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  }
];
