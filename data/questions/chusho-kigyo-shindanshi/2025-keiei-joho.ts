import type { Question } from "@/lib/questions/types";

export const CHUSHO_2025_F_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 1,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "USB",
    "topicTags": [
      "USB"
    ],
    "difficulty": 3,
    "question": "PC やスマートフォンなどに周辺機器を接続するUSB に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　USB は、上位規格のポートに下位規格のケーブルを介して下位規格の周辺機器を接続する場合、通信速度は最も上位の規格に依存する。ｂ　USB は、PC やスマートフォンなどの電源を入れたまま周辺機器が接続できるホットプラグ対応のシリアルインタフェースである。ｃ　USB Type-C のコネクタは、PC やスマートフォンなどのUSB Type-C のポートに上下どちらの向きでも差し込むことができる。ｄ　すべてのUSB Type-C のポートは、USB Power Delivery 規格に対応しているので、USB Type-C のケーブルを介して外部ディスプレイモニタに映像を出力することができる。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：正",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正　　ｄ：誤",
      "ウ": "ａ：誤　　ｂ：正　　ｃ：正　　ｄ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：誤　　ｄ：正",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正"
    },
    "answer": "ウ",
    "explanation": "a誤、b正、c正、d誤。Type-C形状だけでPDや映像出力は保証されない。\n\n他の選択肢との違い：\nア：aは誤り。USB速度はケーブル・機器など最も遅い対応規格に制限される。",
    "choiceExplanations": {
      "ア": "aは誤り。USB速度はケーブル・機器など最も遅い対応規格に制限される。",
      "イ": "bは正、cも正。aは誤り。",
      "ウ": "a誤、b正、c正、d誤。Type-C形状だけでPDや映像出力は保証されない。",
      "エ": "cは正で上下両向きに挿せる。dは誤り。",
      "オ": "bはホットプラグ対応で正、dは誤り。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 2,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "仮想化",
    "topicTags": [
      "仮想化"
    ],
    "difficulty": 3,
    "question": "クラウドコンピューティングにおいて、仮想化技術はIT リソースの効率的な活用を支えている。仮想化技術に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "コンテナは、物理マシン上に直接、仮想化ソフトウェアを動作させ、その上で1 つ以上のゲストOS を稼働させる技術である。",
      "イ": "コンテナは、ホストOS 上に仮想化ソフトウェアを動作させ、その上で1 つ以上のゲストOS を稼働させる技術である。",
      "ウ": "ハイパーバイザは、アプリケーションやライブラリなどをパッケージ化し、ホストOS のカーネルを直接利用することで、ゲストOS なしでアプリケーションを稼働させる技術である。",
      "エ": "ハイパーバイザは、単一の物理マシン上に1 つ以上の仮想マシンを稼働させる技術である。"
    },
    "answer": "エ",
    "explanation": "ハイパーバイザが単一物理機上で仮想マシンを稼働させる。\n\n他の選択肢との違い：\nア：ゲストOSを稼働させるのは仮想マシン方式。",
    "choiceExplanations": {
      "ア": "ゲストOSを稼働させるのは仮想マシン方式。",
      "イ": "ホストOS上に仮想化ソフトを置くホスト型仮想マシンの説明。",
      "ウ": "共通OSカーネルを使うのはコンテナ。",
      "エ": "ハイパーバイザが単一物理機上で仮想マシンを稼働させる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 3,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "RFID",
    "topicTags": [
      "RFID"
    ],
    "difficulty": 3,
    "question": "RFID は、検品や棚卸などの業務で商品の識別に用いられる技術である。RFIDに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "RF タグのメモリの型には、リードオンリー型、ライトワンス・リードメニー型、リード・ライト型がある。",
      "イ": "カメラによる画像処理を利用して、複数のRF タグのデータを一括して読み取ることができる。",
      "ウ": "赤外線を利用して、複数のRF タグのデータを一括して読み取ることができる。",
      "エ": "パッシブタグは、内蔵電源を用いて無線信号を発信できる。"
    },
    "answer": "ア",
    "explanation": "RFタグには読取専用、一度書込後読取専用、読書可能の型がある。\n\n他の選択肢との違い：\nイ：RFIDは電波を使い、画像処理でタグを読む方式ではない。",
    "choiceExplanations": {
      "ア": "RFタグには読取専用、一度書込後読取専用、読書可能の型がある。",
      "イ": "RFIDは電波を使い、画像処理でタグを読む方式ではない。",
      "ウ": "RFIDは赤外線でなく電波を使う。",
      "エ": "パッシブタグはリーダの電波から電力を得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 4,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "Web API",
    "topicTags": [
      "Web API"
    ],
    "difficulty": 3,
    "question": "Web アプリケーションにおいて、クライアントとサーバ間のデータ交換に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　REST は、HTTP メソッドを用いることなく、Web アプリケーションを通じてサーバOS が提供する各機能を利用する仕組みである。ｂ　Web API は、HTML とCSS を使用して、クライアント上で動的なWeb ページ表示を可能にする仕組みである。ｃ　JSON は、Web アプリケーションのデータ交換に使用されているデータ形式の1 つである。ｄ　HTTP は、リクエストを送信するクライアントとレスポンスを返すサーバが、HTML 文書などをやり取りするために用いられるプロトコルである。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：正",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正　　ｄ：正",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤　　ｄ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：正　　ｄ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正"
    },
    "answer": "オ",
    "explanation": "a誤、b誤、c正、d正。\n\n他の選択肢との違い：\nア：aはRESTを誤解し、cはJSON形式なので正。",
    "choiceExplanations": {
      "ア": "aはRESTを誤解し、cはJSON形式なので正。",
      "イ": "aは誤り。RESTはHTTPメソッドを用いる設計様式。",
      "ウ": "cは正、dもHTTPの説明として正。",
      "エ": "bは誤り。Web APIはアプリ間の機能・データの利用窓口。",
      "オ": "a誤、b誤、c正、d正。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 5,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "通信プロトコル",
    "topicTags": [
      "通信プロトコル"
    ],
    "difficulty": 3,
    "question": "情報ネットワークで用いられる通信プロトコルに関する記述とその用語の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　データ転送において信頼性よりも速度を重視し、通信の確認や再送制御を行わず、リアルタイム性が求められる場面で用いられる通信プロトコル。ｂ　ネットワークに接続する機器に、IP アドレスなど通信に必要な設定情報を自動的に割り当てるために用いられる通信プロトコル。ｃ　ネットワーク上で、正しい宛先にデータパケットを届けるために必要な経路選択およびアドレス指定を行うために用いられる通信プロトコル。",
    "choices": {
      "ア": "ａ：TCPｂ：SNMPｃ：ARP",
      "イ": "ａ：TCPｂ：SNMPｃ：IP",
      "ウ": "ａ：UDPｂ：DHCPｃ：ARP",
      "エ": "ａ：UDPｂ：DHCPｃ：IP",
      "オ": "ａ：UDPｂ：SNMPｃ：ARP"
    },
    "answer": "エ",
    "explanation": "UDP、DHCP、IPが各説明に対応する。\n\n他の選択肢との違い：\nア：aは速度優先のUDP、bはDHCP、cはIP。",
    "choiceExplanations": {
      "ア": "aは速度優先のUDP、bはDHCP、cはIP。",
      "イ": "aはUDPで、bはDHCP。",
      "ウ": "cの経路選択とアドレス指定はIP。ARPはIPからMACを解決する。",
      "エ": "UDP、DHCP、IPが各説明に対応する。",
      "オ": "bはDHCP、cはIP。SNMPはネットワーク管理用。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 6,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ブロックチェーン",
    "topicTags": [
      "ブロックチェーン"
    ],
    "difficulty": 3,
    "question": "ブロックチェーン技術に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　コンソーシアム型ブロックチェーンでは、誰もがブロックチェーン上のデータを読むことも書き込むこともできる。ｂ　パブリック型ブロックチェーンでは、ブロックチェーンにデータを書き込むために、コンセンサスアルゴリズムによる正当性の承認が必要になる。ｃ　プライベート型ブロックチェーンでは、ブロックチェーンにデータを書き込むために、ネットワーク参加者全員による承認が必ず必要になる。ｄ　NFT は、契約または合意の条件に基づき、ブロックチェーン上で自動的に取引を処理・実行・記録するコンピュータプログラムである。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：正　　ｄ：誤",
      "イ": "ａ：正　　ｂ：誤　　ｃ：誤　　ｄ：正",
      "ウ": "ａ：誤　　ｂ：正　　ｃ：誤　　ｄ：誤",
      "エ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：誤"
    },
    "answer": "ウ",
    "explanation": "a誤、b正、c誤、d誤。dの自動実行はスマートコントラクト。\n\n他の選択肢との違い：\nア：aは誤り。コンソーシアム型は参加者が制限される。",
    "choiceExplanations": {
      "ア": "aは誤り。コンソーシアム型は参加者が制限される。",
      "イ": "bは正。パブリック型でも合意形成が必要。",
      "ウ": "a誤、b正、c誤、d誤。dの自動実行はスマートコントラクト。",
      "エ": "cは誤り。プライベート型で全員承認が必須ではない。",
      "オ": "bは正で合意形成が必要。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 7,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ソフトウェアテスト",
    "topicTags": [
      "ソフトウェアテスト"
    ],
    "difficulty": 3,
    "question": "利用者に品質の高い情報システムを提供するために、ソフトウェアのテストは欠かせない。テストに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "アルファテストでは、システム開発の最終段階で、開発中のソフトウェアを利用者に提供し、実際に使用してもらって、システム要件を満たしているかを検証する。",
      "イ": "回帰テストでは、大量アクセスなどの負荷をかけて応答時間や資源利用状況などを測定し、高負荷状況でのソフトウェアの振る舞いを検証する。",
      "ウ": "境界値分析とは、データを有効値と無効値のグループに分け、おのおののグループから代表値を1 つずつ選んでテストする技法である。",
      "エ": "ドライバとは、上位モジュールから下位モジュールへと順に結合してテストを実施する際、呼び出し先の下位のモジュールが未完成の場合、その代わりとなるテスト用ダミーモジュールのことである。",
      "オ": "ホワイトボックステストでは、モジュール内の分岐や繰り返しなど、内部ロジックの正しさを検証する。"
    },
    "answer": "オ",
    "explanation": "内部の分岐や繰返しを検証するのがホワイトボックステスト。\n\n他の選択肢との違い：\nア：利用者による公開前評価は通常ベータテスト。",
    "choiceExplanations": {
      "ア": "利用者による公開前評価は通常ベータテスト。",
      "イ": "負荷に対する検証は性能・負荷テスト。",
      "ウ": "有効・無効の代表値抽出は同値分割法。",
      "エ": "下位未完成の代用はスタブ。ドライバは上位呼出し側の代用。",
      "オ": "内部の分岐や繰返しを検証するのがホワイトボックステスト。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 8,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "IoT",
    "topicTags": [
      "IoT"
    ],
    "difficulty": 3,
    "question": "IoT に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　エッジコンピューティングは、IoT 機器や、その近くに配置したコンピュータでデータを処理する技術である。ｂ　IoT 機器に使用されるすべてのワンボードマイコンには、OS としてLinux が組み込まれている。ｃ　IoT 機器の構成要素の1 つであるサーミスタは、方位センサーである。ｄ　LPWA（Low Power Wide Area）は、広範囲をカバーし、低消費電力で運用できる通信技術である。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：正",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正　　ｄ：誤",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤　　ｄ：正",
      "エ": "ａ：誤　　ｂ：正　　ｃ：誤　　ｄ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正"
    },
    "answer": "ウ",
    "explanation": "a正、b誤、c誤、d正。LPWAは低消費電力・広域通信。\n\n他の選択肢との違い：\nア：bは誤り。全ワンボードマイコンにLinuxが載るわけではない。",
    "choiceExplanations": {
      "ア": "bは誤り。全ワンボードマイコンにLinuxが載るわけではない。",
      "イ": "cは誤り。サーミスタは温度検出用。",
      "ウ": "a正、b誤、c誤、d正。LPWAは低消費電力・広域通信。",
      "エ": "aのエッジ処理は正しい。",
      "オ": "cは方位センサーではなく温度素子。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 9,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "稼働率",
    "topicTags": [
      "稼働率"
    ],
    "difficulty": 3,
    "question": "稼働率が同じ装置Ｘを3 台組み合わせたシステムを以下のａ～ｃに示す。システ\nム全体の稼働率を高い順に並べたものとして、最も適切なものを下記の解答群から\n選べ。\n　ただし、装置Ｘの稼働率は0 より大きく1 未満であり、直列で接続されている部\n分はそれらの装置が同時に稼働しているときだけ稼働しているとみなし、並列に接\n続されている部分はどちらか一方が稼働していれば稼働しているとみなす。\nａ　\nｂ　\nｃ",
    "choices": {
      "ア": "ａ、ｂ、ｃ",
      "イ": "ｂ、ａ、ｃ",
      "ウ": "ｂ、ｃ、ａ",
      "エ": "ｃ、ａ、ｂ",
      "オ": "ｃ、ｂ、ａ"
    },
    "answer": "オ",
    "explanation": "並列構成が最も高いc、次がb、最後がa。\n\n他の選択肢との違い：\nア：図の直列・並列構成を計算するとaが最下位。",
    "choiceExplanations": {
      "ア": "図の直列・並列構成を計算するとaが最下位。",
      "イ": "bとaの順位が逆。",
      "ウ": "cの順位はbより高い。",
      "エ": "aとbの順位が逆。",
      "オ": "並列構成が最も高いc、次がb、最後がa。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2025/keiei-joho/2025-F-q9-p9.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第9ページ。第9問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 10,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "信頼性設計",
    "topicTags": [
      "信頼性設計"
    ],
    "difficulty": 3,
    "question": "情報システムの信頼性設計に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "フェイルオーバとは、故障や障害が発生したときに、一部の機能を低下させても、限定的ながら重要な機能だけでも稼働し続けるように設計することである。",
      "イ": "フォールトアボイダンスとは、部品一つ一つの信頼性を高めることで、故障や障害が発生しないように設計することである。",
      "ウ": "フォールトトレランスとは、人為的な操作ミスがあっても危険が生じず、システムに異常が起こらないように設計することである。",
      "エ": "フォールトマスキングとは、故障や障害が発生したときに、システムの被害を最小限にとどめるように設計することである。",
      "オ": "フォールバックとは、故障や障害が発生したときに、待機系システムが処理を継続するように設計することである。"
    },
    "answer": "イ",
    "explanation": "部品の信頼性を上げて故障を避けるフォールトアボイダンス。\n\n他の選択肢との違い：\nア：機能を縮小して継続するのはフォールバック／フェイルソフト。",
    "choiceExplanations": {
      "ア": "機能を縮小して継続するのはフォールバック／フェイルソフト。",
      "イ": "部品の信頼性を上げて故障を避けるフォールトアボイダンス。",
      "ウ": "操作ミスを想定した安全設計はフールプルーフ。",
      "エ": "障害影響を隠すフォールトマスキングの定義と異なる。",
      "オ": "待機系への切替はフェイルオーバ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 11,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "正規化",
    "topicTags": [
      "正規化"
    ],
    "difficulty": 3,
    "question": "以下に示す表は、ある学校における特定の期間中の開講講座の一覧である。この\n表に関する正規化の観点からの記述の正誤の組み合わせとして、最も適切なものを\n下記の解答群から選べ。なお、この表の主キーは「開講コード」であり、また、それ\nぞれの講師は開講コードの異なる同一名の講座を担当することがある。\n開講コード\n講座コード\n講座名\n講師コード\n講師\nMIS01\nC01\n経営情報システム入門\nT01\n中小　太郎\nMIS02\nC01\n経営情報システム入門\nT01\n中小　太郎\nMIS03\nC01\n経営情報システム入門\nT02\n診断　次郎\nMIS04\nC01\n経営情報システム入門\nT02\n診断　次郎\nMIS05\nC01\n経営情報システム入門\nT03\n連合　三郎\nMIS06\nC01\n経営情報システム入門\nT03\n連合　三郎\nMIS07\nC02\n経営情報システム実践\nT01\n中小　太郎\nMIS08\nC02\n経営情報システム実践\nT02\n診断　次郎\nMIS09\nC02\n経営情報システム実践\nT03\n連合　三郎\nａ　第1 正規形である。\nｂ　第2 正規形である。\nｃ　第3 正規形である。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：正",
      "イ": "ａ：正　　ｂ：正　　ｃ：誤",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：正",
      "エ": "ａ：正　　ｂ：誤　　ｃ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：誤"
    },
    "answer": "イ",
    "explanation": "各値は原子で第1正規形、単一主キーで第2正規形。推移従属により第3ではない。\n\n他の選択肢との違い：\nア：講座コード→講座名、講師コード→講師という推移従属があるため第3正規形ではない。",
    "choiceExplanations": {
      "ア": "講座コード→講座名、講師コード→講師という推移従属があるため第3正規形ではない。",
      "イ": "各値は原子で第1正規形、単一主キーで第2正規形。推移従属により第3ではない。",
      "ウ": "第2正規形を満たさないのに第3正規形だけ満たすことはない。",
      "エ": "単一主キーに部分従属はないので第2正規形は満たす。",
      "オ": "各セルは原子的で第1正規形。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2025/keiei-joho/2025-F-q11-p11.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第11ページ。第11問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 12,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "SQL",
    "topicTags": [
      "SQL"
    ],
    "difficulty": 3,
    "question": "あるメーカーでは、カスタマーサポートや新製品のプロモーションなどのため\nに、Web サイトを通じて顧客にユーザ登録と購入した商品の登録を働きかけてい\nる。以下に示す「登録ユーザ」表は、ユーザ登録済みの顧客に関するデータを表し、\nまた「商品登録管理」表は、ユーザ登録済みの顧客が自身で登録した、購入済み商品\nに関するデータを表している。なお、ユーザ登録をしている顧客の中には、商品登\n録を行っていない者もいる。\n登録ユーザ\n顧客ID\nアカウント名\n氏名\nC0001\nkeizai.ichiro\n経済 一郎\nC0002\nseisaku.jiro\n政策 次郎\nC0003\nzaimu.saburo\n財務 三郎\nC0004\nkaikei.haruka\n会計 春香\nC0005\nkeiei.natsumi\n経営 夏美\nC0006\nun-ei.akiko\n運営 秋子\nC0007\nhomu.fuyumi\n法務 冬美\n…\n…\n…\n商品登録管理\n管理番号\n顧客ID\n商品コード\n製造番号\n1\nC0004\nP102\n2001U\n2\nC0003\nP103\n3020A\n3\nC0004\nP102\n2012X\n4\nC0006\nP101\n1098Z\n5\nC0001\nP101\n1051B\n6\nC0007\nP104\n4035K\n7\nC0006\nP103\n3077C\n8\nC0004\nP102\n2073Y\n9\nC0006\nP103\n3099G\n10\nC0004\nP101\n1022S\n…\n…\n…\n…\n　この2 つのデータから、登録ユーザごとの商品登録状況を確認するために、次に\n示す「購入商品登録状況」表を得ることを考える。\n\n購入商品登録状況\n顧客ID\nアカウント名\n商品コード\n登録台数\nC0001\nkeizai.ichiro\nP101\n1\nC0002\nseisaku.jiro\n0\nC0003\nzaimu.saburo\nP103\n1\nC0004\nkaikei.haruka\nP102\n3\nC0004\nkaikei.haruka\nP101\n1\nC0005\nkeiei.natsumi\n0\nC0006\nun-ei.akiko\nP103\n2\nC0006\nun-ei.akiko\nP101\n1\nC0007\nhomu.fuyumi\nP104\n1\n…\n…\n…\n…\n　以下のSQL 文の空欄①と②に入る語句の組み合わせとして、最も適切なものを\n下記の解答群から選べ。ただし、「購入商品登録状況」表の空欄は、データがないこ\nとを意味する。\n【SQL 文】\nSELECT\n　登録ユーザ. 顧客ID，\n　登録ユーザ. アカウント名，\n　商品登録管理. 商品コード，\n　COUNT（商品登録管理. 商品コード）　AS　登録台数\nFROM\n　登録ユーザ \n①\n 商品登録管理\n　　ON　登録ユーザ. 顧客ID = 商品登録管理. 顧客ID\nGROUP BY \n②\nORDER BY　登録ユーザ. 顧客ID　ASC，登録台数　DESC;",
    "choices": {
      "ア": "①：INNER JOIN　　②：登録ユーザ. 顧客ID，商品登録管理. 商品コード",
      "イ": "①：INNER JOIN　　②：登録ユーザ. 顧客ID，登録台数",
      "ウ": "①：RIGHT OUTER JOIN　　②：登録ユーザ. 顧客ID",
      "エ": "①：LEFT OUTER JOIN　　②：登録ユーザ. 顧客ID，商品登録管理. 商品コード",
      "オ": "①：LEFT OUTER JOIN　　②：登録ユーザ. 顧客ID，登録台数"
    },
    "answer": [
      "ア",
      "イ",
      "ウ",
      "エ",
      "オ"
    ],
    "explanation": "公式訂正版正答表と2025年9月2日付訂正告知により、問題として不適切のため全受験者の解答を正解とする。単一正答は設定しない。",
    "choiceExplanations": {
      "ア": "公式訂正により全受験者の解答を正解として扱う。",
      "イ": "公式訂正により全受験者の解答を正解として扱う。",
      "ウ": "公式訂正により全受験者の解答を正解として扱う。",
      "エ": "公式訂正により全受験者の解答を正解として扱う。",
      "オ": "公式訂正により全受験者の解答を正解として扱う。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "officialReferenceUrls": [
      "https://www.jf-cmca.jp/attach/test/r07/seikai_teisei_20250902.pdf"
    ],
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2025/keiei-joho/2025-F-q12-p12.png",
      "/images/questions/chusho-kigyo-shindanshi/2025/keiei-joho/2025-F-q12-p13.png",
      "/images/questions/chusho-kigyo-shindanshi/2025/keiei-joho/2025-F-q12-p14.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第12ページ。第12問の表・図・解答群を含む。",
      "公式問題PDFの第13ページ。第12問の表・図・解答群を含む。",
      "公式問題PDFの第14ページ。第12問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 13,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "開発手法",
    "topicTags": [
      "開発手法"
    ],
    "difficulty": 3,
    "question": "システム開発手法に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　デイリースクラムでは、スプリントの成果をステークホルダーに提示し、フィードバックを得る。ｂ　ローコード開発では、システムの全体像をモデル化し、優先度を付けた機能単位で計画、設計、構築を反復的に行う。ｃ　DevOps では、開発と運用のフェーズを明確に分離して、システムの導入や更新を柔軟かつ迅速に行う。ｄ　XP におけるペアプログラミングでは、2 人のプログラマがペアとなり、相談やレビューを行いながら、協力してプログラムの開発を行う。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：誤",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正　　ｄ：正",
      "ウ": "ａ：誤　　ｂ：正　　ｃ：誤　　ｄ：正",
      "エ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：誤　　ｄ：正"
    },
    "answer": "オ",
    "explanation": "a誤、b誤、c誤、d正。\n\n他の選択肢との違い：\nア：成果提示・フィードバックはスプリントレビューであり日次スクラムではない。",
    "choiceExplanations": {
      "ア": "成果提示・フィードバックはスプリントレビューであり日次スクラムではない。",
      "イ": "bは反復型開発の説明でローコードではない。",
      "ウ": "cは誤り。DevOpsは開発と運用の連携を重視する。",
      "エ": "dは正でXPのペアプログラミング。cは誤り。",
      "オ": "a誤、b誤、c誤、d正。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 14,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "情報倫理",
    "topicTags": [
      "情報倫理"
    ],
    "difficulty": 3,
    "question": "SNS などで見られるエコーチェンバーと呼ばれる現象に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "AI 技術を利用して本物そっくりの偽の映像や音声を作成することで、人々が虚偽の情報を真実と信じ込むリスクが高まることが懸念されている。",
      "イ": "Web サイト間で個人の閲覧履歴が共有、追跡される仕組みにより、意図しない形で広告や情報が提示されることが懸念されている。",
      "ウ": "オンライン活動への監視が広がる中で、個人の行動や発言が常に記録されることで、プライバシーの侵害や自由な発言の抑制が懸念されている。",
      "エ": "特定の意見や価値観を持つ集団内でのみ情報が共有されることで、異なる視点が排除され、偏った情報が強化されることが懸念されている。",
      "オ": "人の認知の隙を突き、熟考を妨げることで、不利な条件を見落とさせるリスクが懸念されている。"
    },
    "answer": "エ",
    "explanation": "同質集団内で意見が反響し偏りが強まるエコーチェンバー。\n\n他の選択肢との違い：\nア：偽映像・音声はディープフェイク。",
    "choiceExplanations": {
      "ア": "偽映像・音声はディープフェイク。",
      "イ": "履歴追跡と広告表示はトラッキング等の問題。",
      "ウ": "監視による萎縮は監視社会の問題。",
      "エ": "同質集団内で意見が反響し偏りが強まるエコーチェンバー。",
      "オ": "認知の隙を突く設計はダークパターン。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 15,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "システム監査",
    "topicTags": [
      "システム監査"
    ],
    "difficulty": 3,
    "question": "IT システムの信頼性などを確保することで企業の信用を高めることは重要である。　以下に示す、経済産業省の「システム監査基準」（2023 年4 月26 日改訂）の「システム監査の意義と目的」について、空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。　システム監査とは、専門性とＡを備えた監査人が、一定の基準に基づいてIT システムの利活用に係る検証・評価を行い、監査結果の利用者にこれらのガバナンス、マネジメント、Ｂの適切性等に対する保証を与える、又は改善のための助言を行う監査である。　また、システム監査の目的は、IT システムに係るＣに適切に対応しているかどうかについて、監査人が検証・評価し、もって保証や助言を行うことを通じて、組織体の経営活動と業務活動の効果的かつ効率的な遂行、さらにはそれらの変革を支援し、組織体の目標達成に寄与すること、及び利害関係者に対する説明責任を果たすことである。",
    "choices": {
      "ア": "Ａ：客観性　　Ｂ：コントロール　　　　Ｃ：セキュリティ",
      "イ": "Ａ：客観性　　Ｂ：コントロール　　　　Ｃ：リスク",
      "ウ": "Ａ：客観性　　Ｂ：コンプライアンス　　Ｃ：セキュリティ",
      "エ": "Ａ：倫理観　　Ｂ：コントロール　　　　Ｃ：セキュリティ",
      "オ": "Ａ：倫理観　　Ｂ：コンプライアンス　　Ｃ：リスク"
    },
    "answer": "イ",
    "explanation": "監査人の客観性、コントロールの適切性、リスク対応を評価する。\n\n他の選択肢との違い：\nア：Cはリスクでありセキュリティに限定されない。",
    "choiceExplanations": {
      "ア": "Cはリスクでありセキュリティに限定されない。",
      "イ": "監査人の客観性、コントロールの適切性、リスク対応を評価する。",
      "ウ": "Bはコンプライアンスでなくコントロール。",
      "エ": "Aは倫理観でなく客観性、Cはリスク。",
      "オ": "Aは客観性、Bはコントロール。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 16,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "データウェアハウス",
    "topicTags": [
      "データウェアハウス"
    ],
    "difficulty": 3,
    "question": "データウェアハウスに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "ETL とは、さまざまなデータソースからデータを抽出し、扱いやすいフォーマットに変換して、データウェアハウスに統合して格納する処理のことである。",
      "イ": "OLTP は、データウェアハウスに蓄積されたデータをスライシング、ドリルダウンなどの操作により多次元分析するために用いられる分析ツールである。",
      "ウ": "データウェアハウスは、データを主題ごとに分解・整理するオブジェクト指向という特性を持つデータベースである。",
      "エ": "データスワンプとは、データウェアハウスから必要なデータを抽出し、利用しやすい形式で格納したデータベースのことである。",
      "オ": "データマートとは、データウェアハウスに蓄積する構造化されたデータや、IoT 機器やSNS などからの構造化されていないデータを、そのままの形式で格納するデータベースのことである。"
    },
    "answer": "ア",
    "explanation": "ETLは抽出・変換・格納を行う。\n\n他の選択肢との違い：\nイ：多次元分析はOLAP、OLTPはトランザクション処理。",
    "choiceExplanations": {
      "ア": "ETLは抽出・変換・格納を行う。",
      "イ": "多次元分析はOLAP、OLTPはトランザクション処理。",
      "ウ": "DWHは主題指向・統合・時系列・非更新が代表的特性。",
      "エ": "部門別に必要データを切り出すのはデータマート。",
      "オ": "生データをそのまま蓄積するのはデータレイク。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 17,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "業務システム",
    "topicTags": [
      "業務システム"
    ],
    "difficulty": 3,
    "question": "情報システムの概念やそれに使われる技術に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "AR とは、現実世界をコンピュータによって創り出された仮想空間に完全に置き換えることで、あたかも現実であるかのように疑似体験できる技術のことである。",
      "イ": "CTI とは、クラウドコンピューティングを利用した財務会計専用システムのことである。",
      "ウ": "RPA とは、自律走行ロボットを使った工場・倉庫用の自動搬送システムのことである。",
      "エ": "SEO とは、顧客データを一元管理することで、顧客に合った商品やサービスを提案するOne to One マーケティングシステムのことである。",
      "オ": "SFA とは、営業支援システムのことであり、営業担当者の行動管理や商談の進捗状況管理などの機能を有する。"
    },
    "answer": "オ",
    "explanation": "SFAは営業活動や商談進捗を支援するシステム。\n\n他の選択肢との違い：\nア：現実を完全に置き換えるのはVR。ARは現実に情報を重ねる。",
    "choiceExplanations": {
      "ア": "現実を完全に置き換えるのはVR。ARは現実に情報を重ねる。",
      "イ": "CTIは電話とコンピュータの統合。",
      "ウ": "RPAはソフトウェアロボットによる定型業務自動化。",
      "エ": "SEOは検索エンジン最適化。",
      "オ": "SFAは営業活動や商談進捗を支援するシステム。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 18,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "WBS",
    "topicTags": [
      "WBS"
    ],
    "difficulty": 3,
    "question": "WBS（Work Breakdown Structure）に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。ａ　WBS 辞書とは、プロジェクト全体の範囲、成果物、前提条件や制約条件などを記述した文書のことである。ｂ　ワークパッケージとは、WBS の最下位レベルの作業群のことで、進捗状況などをコントロールする際の最小単位である。ｃ　100％ルールとは、WBS の階層構造において、上位の作業を過不足なく下位の複数の作業に展開するルールのことである。ｄ　イテレーションとは、WBS を作成する際、早期に完了しなければならない作業は詳細に計画し、将来の作業は概略にとどめておいて、時期がきたら詳細化を繰り返す反復計画技法のことである。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：正　　ｄ：誤",
      "イ": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：正",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤　　ｄ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：正　　ｄ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正"
    },
    "answer": "エ",
    "explanation": "a誤、b正、c正、d誤。dの説明はローリングウェーブ計画。\n\n他の選択肢との違い：\nア：aの説明はプロジェクトスコープ記述書等でWBS辞書とは異なる。",
    "choiceExplanations": {
      "ア": "aの説明はプロジェクトスコープ記述書等でWBS辞書とは異なる。",
      "イ": "cの100%ルールは正しい。",
      "ウ": "bはワークパッケージの説明として正しい。",
      "エ": "a誤、b正、c正、d誤。dの説明はローリングウェーブ計画。",
      "オ": "dはイテレーションではなく段階的詳細化。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 19,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ランサムウェア",
    "topicTags": [
      "ランサムウェア"
    ],
    "difficulty": 3,
    "question": "近年、中小企業においてもランサムウェアによる被害が増加している。ランサムウェアに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "EDR（Endpoint Detection and Response）は、マルウェア感染防止や外部からの攻撃通信ブロックなど、ランサムウェア攻撃による侵入の事前防止を担う。",
      "イ": "EPP（Endpoint Protection Platform）は、PC やサーバに侵入してしまったランサムウェアを検知し、異常や不審な挙動があればシステム担当者に通知するなど侵入後の事後対処を担う。",
      "ウ": "ランサムウェアに感染した際に早期復旧できるように、バックアップデータを保存した機器は、常にネットワークに接続しておく。",
      "エ": "ランサムウェアに感染した場合は、速やかに感染した端末の電源を切り、システム担当者やセキュリティベンダに報告する。",
      "オ": "ランサムウェアの主要な侵入経路は、VPN 機器、リモートデスクトップ、不審メールやその添付ファイルである。"
    },
    "answer": "オ",
    "explanation": "VPN機器、リモートデスクトップ、メールが主な侵入経路。\n\n他の選択肢との違い：\nア：EDRは侵入後の検知・対応に重点がある。",
    "choiceExplanations": {
      "ア": "EDRは侵入後の検知・対応に重点がある。",
      "イ": "EPPは侵入前の防御に重点がある。",
      "ウ": "常時接続のバックアップは感染・暗号化される危険がある。",
      "エ": "電源断は証拠保全や復旧を妨げ得る。隔離して担当者に連絡する。",
      "オ": "VPN機器、リモートデスクトップ、メールが主な侵入経路。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 20,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "AIセキュリティ",
    "topicTags": [
      "AIセキュリティ"
    ],
    "difficulty": 3,
    "question": "AI の普及に伴い、AI システムに対してさまざまな攻撃がなされるようになった。これらの攻撃に関する以下の文章の空欄Ａ～Ｃに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。　データポイズニング攻撃は、強いバイアス（偏り）を持ったデータを意図的に学習させることで、機械学習モデル自体を汚染させ、推論結果を誤らせる攻撃である。Ａは、機械学習済みモデルへの入力データに、攻撃者の意図した結果を引き起こすように計算されたノイズや微小な変化を含める攻撃である。そのため、データポイズニング攻撃と同様に、機械学習モデルの推論結果を操作することができる。Ｂは、機械学習済みモデルへの入力データと推論結果である出力データを分析することによって、当初の学習データを推測する攻撃である。　生成AI に対しては、特殊な指示を与えて、意図しない挙動を引き起こすＣという攻撃がある。この攻撃により、生成AI は不適切な回答をしたり、意図しない情報を開示してしまうことがある。",
    "choices": {
      "ア": "Ａ：敵対的サンプル攻撃　　　　　　　　　Ｂ：ブルートフォース攻撃　　Ｃ：プロンプト・インジェクション",
      "イ": "Ａ：敵対的サンプル攻撃　　　　　　　　　Ｂ：モデル反転攻撃　　Ｃ：クロスサイト・スクリプティング",
      "ウ": "Ａ：敵対的サンプル攻撃　　　　　　　　　Ｂ：モデル反転攻撃　　Ｃ：プロンプト・インジェクション",
      "エ": "Ａ：中間者攻撃　　　　　　　　　　　　　Ｂ：ブルートフォース攻撃　　Ｃ：クロスサイト・スクリプティング",
      "オ": "Ａ：中間者攻撃　　　　　　　　　　　　　Ｂ：モデル反転攻撃　　Ｃ：プロンプト・インジェクション"
    },
    "answer": "ウ",
    "explanation": "入力摂動は敵対的サンプル、学習データ推定はモデル反転、指示混入はプロンプト・インジェクション。\n\n他の選択肢との違い：\nア：Bは総当たりではなくモデル反転。",
    "choiceExplanations": {
      "ア": "Bは総当たりではなくモデル反転。",
      "イ": "CはXSSでなくプロンプト・インジェクション。",
      "ウ": "入力摂動は敵対的サンプル、学習データ推定はモデル反転、指示混入はプロンプト・インジェクション。",
      "エ": "Aは中間者攻撃ではない。",
      "オ": "Aは敵対的サンプル攻撃。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 21,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "DXガバナンス",
    "topicTags": [
      "DXガバナンス"
    ],
    "difficulty": 3,
    "question": "2024 年9 月に、経済産業省は「デジタルガバナンス・コード3.0 ～DX 経営による企業価値向上に向けて～」を公開した。デジタルガバナンス・コード3.0 では、デジタルガバナンス・コード2.0 の柱立てを見直し、DX（Digital Transformation）経営に求められる5 つの柱を示している。以下に示す5 つの柱の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。1 ．経営ビジョン・ビジネスモデルの策定2 ．DX 戦略の策定3 ．Ａ　3 －1 ．組織づくり　3 －2 ．Ｂ　3 －3 ．IT システム・サイバーセキュリティ4 ．成果指標の設定・DX 戦略の見直し5 ．Ｃ",
    "choices": {
      "ア": "Ａ：DX 戦略の推進　　　　　　　　　Ｂ：デジタル技術活用環境の整備　　　Ｃ：経営者の情報発信",
      "イ": "Ａ：DX 戦略の推進　　　　　　　　　Ｂ：デジタル技術活用環境の整備　　　Ｃ：ステークホルダーとの対話",
      "ウ": "Ａ：DX 戦略の推進　　　　　　　　　Ｂ：デジタル人材の育成・確保　　　Ｃ：ステークホルダーとの対話",
      "エ": "Ａ：企業文化に関する方策　　　　　Ｂ：DX 戦略の推進　　Ｃ：経営者の情報発信",
      "オ": "Ａ：企業文化に関する方策　　　　　Ｂ：デジタル人材の育成・確保　　Ｃ：経営者の情報発信"
    },
    "answer": "ウ",
    "explanation": "AはDX戦略の推進、Bはデジタル人材の育成・確保、Cはステークホルダーとの対話。\n\n他の選択肢との違い：\nイ：Bはデジタル人材の育成・確保。",
    "choiceExplanations": {
      "ア": "Bはデジタル人材の育成・確保、Cはステークホルダーとの対話。",
      "イ": "Bはデジタル人材の育成・確保。",
      "ウ": "AはDX戦略の推進、Bはデジタル人材の育成・確保、Cはステークホルダーとの対話。",
      "エ": "Aは企業文化に関する方策でない。",
      "オ": "AはDX戦略の推進、Cはステークホルダーとの対話。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 22,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "製造DX",
    "topicTags": [
      "製造DX"
    ],
    "difficulty": 3,
    "question": "情報処理推進機構（IPA）が公開している「中小規模製造業者の製造分野におけるデジタルトランスフォーメーション（DX）推進のためのガイド」では、自社の課題を把握し、その解決策を導くツールとして「製造分野DX 度チェック」が提供されている。このツールでは、以下に示す9 つのチェック項目について、レベル0 からレベル3 までの進展レベルで評価する。　9 つのチェック項目のいずれかに該当する進展レベル3 を表現している記述として、最も適切なものを下記の解答群から選べ。＜チェック項目＞＜DX 推進の進展レベル＞競争優位性の確立レベル0 ：取り組みができていない。業務プロセスの最適化レベル1 ：課題が明確になっている。システムの構築・見直しの中長期計画レベル2 ：取り組みを実行している。データの収集と可視化レベル3 ：変化に対応できる仕組みが構築できている。データ活用・分析データ連携プライバシー、データセキュリティ外部資源の活用人材の育成・確保",
    "choices": {
      "ア": "企業間でシステム・設備のデジタルデータのやり取りが可能な状態となっており、データを活用している。",
      "イ": "競争領域・協調領域の定義・特定ができ、さらに競争領域においてビジョン実現に向けた戦略が立てられている。",
      "ウ": "製造分野の業務プロセスの見直し・改善は実施しているが、部門や個人に閉じた範囲で個別に対応している。",
      "エ": "プライバシー、データセキュリティ等に関しての課題は明確になっている。",
      "オ": "変革に向け必要となるスキル、人的リソース、資金は明確になっている。"
    },
    "answer": "ア",
    "explanation": "企業間データ連携を実現し活用する仕組みは進展レベル3。\n\n他の選択肢との違い：\nイ：戦略策定段階で変化対応の仕組みが構築済みとはいえない。",
    "choiceExplanations": {
      "ア": "企業間データ連携を実現し活用する仕組みは進展レベル3。",
      "イ": "戦略策定段階で変化対応の仕組みが構築済みとはいえない。",
      "ウ": "部門内に閉じた個別改善で全体の変化対応に至らない。",
      "エ": "課題の明確化はレベル1。",
      "オ": "必要資源の明確化は計画段階。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 23,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "EVM",
    "topicTags": [
      "EVM"
    ],
    "difficulty": 3,
    "question": "ある中小企業では、完成時総予算が1,080 万円で、期間が半年の4 つのプロジェ\nクトＡ、Ｂ、Ｃ、Ｄが実施されている。プロジェクト期間がちょうど半分を経過し\nた時点で、各プロジェクトの進捗をまとめたところ、次の表が得られた。\n（単位：万円）\nプロジェクト\nＡ\nＢ\nＣ\nＤ\n完成時総予算（BAC）\n1,080\n1,080\n1,080\n1,080\n出来高計画値（PV）\n432\n450\n480\n500\nコスト実績値（AC）\n600\n400\n512\n512\n出来高実績値（EV）\n540\n432\n540\n480\n　このままのコスト効率でプロジェクトが進んでいくとすると、プロジェクト完了\n時の総コストは、いくらになると予測されるか。予測される総コストを小さい順に\n並べたものとして、最も適切なものを選べ。",
    "choices": {
      "ア": "Ａ、Ｂ、Ｃ、Ｄ",
      "イ": "Ａ、Ｂ、Ｄ、Ｃ",
      "ウ": "Ｂ、Ａ、Ｃ、Ｄ",
      "エ": "Ｂ、Ｃ、Ａ、Ｄ",
      "オ": "Ｂ、Ｃ、Ｄ、Ａ"
    },
    "answer": "オ",
    "explanation": "EACはB=1000、C=1024、D=1152、A=1200万円の順。\n\n他の選択肢との違い：\nア：AのEACは1080×600/540=1200、Bは1000、Cは1024、Dは1152。",
    "choiceExplanations": {
      "ア": "AのEACは1080×600/540=1200、Bは1000、Cは1024、Dは1152。",
      "イ": "Bは最小だがAは最大。",
      "ウ": "Cの方がAより小さい。",
      "エ": "DはAより小さい。",
      "オ": "EACはB=1000、C=1024、D=1152、A=1200万円の順。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2025/keiei-joho/2025-F-q23-p25.png"
    ],
    "imageAltTexts": [
      "公式問題PDFの第25ページ。第23問の表・図・解答群を含む。"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 24,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "SLA",
    "topicTags": [
      "SLA"
    ],
    "difficulty": 3,
    "question": "ある中小企業では、顧客企業からインターネット経由で注文を受け付けるシステムを開発し、IT サービスとして提供する計画を立てている。このIT サービスのサービスレベル項目の1 つである稼働率として、以下のようなサービスレベル目標を設定した。＜稼働率に関するサービスレベル目標＞　当該サービスは、基本的に常時利用可能とする。メンテナンスなどの計画停止は、毎月第1 土曜日と第3 土曜日の22 時から翌日曜日の8 時までとする。計画停止以外のサービス停止は、年間142 時間以内とする。　上記のサービスレベル目標を達成するための最低稼働率を、小数点以下第2 位を四捨五入して表したものはどれか。最も適切なものを選べ。ただし、1 年は365 日（8,760 時間）とし、また、計画停止時間は、合意済みサービス時間に含まれないものとする。",
    "choices": {
      "ア": "94.5％",
      "イ": "95.6％",
      "ウ": "97.3％",
      "エ": "98.3％",
      "オ": "99.8％"
    },
    "answer": "エ",
    "explanation": "(8520-142)/8520×100=98.333…%で小数第2位四捨五入98.3%。\n\n他の選択肢との違い：\nア：計画停止240時間を除いた8520時間が分母で、142時間停止時の稼働率は約98.3%。",
    "choiceExplanations": {
      "ア": "計画停止240時間を除いた8520時間が分母で、142時間停止時の稼働率は約98.3%。",
      "イ": "95.6%では停止142時間より多い。",
      "ウ": "97.3%ではない。",
      "エ": "(8520-142)/8520×100=98.333…%で小数第2位四捨五入98.3%。",
      "オ": "99.8%は許容停止142時間に対して高すぎる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2025-annual-keiei-joho-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2025,
    "qNumber": 25,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "機械学習評価",
    "topicTags": [
      "機械学習評価"
    ],
    "difficulty": 3,
    "question": "機械学習における回帰タスクに関する以下の記述の空欄①～④に入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。　機械学習における回帰タスクは、　　①　　学習に分類される。回帰タスクに対するモデルの評価指標には、誤差の二乗の平均である　　②　　や、その平方根である　　③　　、誤差の絶対値の平均である　　④　　などがある。",
    "choices": {
      "ア": "①：教師あり②：MAE③：RMSE④：MSE",
      "イ": "①：教師あり②：MSE③：RMSE④：MAE",
      "ウ": "①：教師なし②：MAPE③：WAPE④：MSE",
      "エ": "①：教師なし②：MSE③：MAPE④：MAE",
      "オ": "①：教師なし②：MSE③：RMSE④：MAE"
    },
    "answer": "イ",
    "explanation": "教師あり学習、MSE、RMSE、MAEが定義に合う。\n\n他の選択肢との違い：\nア：二乗誤差平均はMSEでMAEではない。",
    "choiceExplanations": {
      "ア": "二乗誤差平均はMSEでMAEではない。",
      "イ": "教師あり学習、MSE、RMSE、MAEが定義に合う。",
      "ウ": "回帰は教師なし学習ではなく教師あり学習。",
      "エ": "①と③が不一致。RMSEはMSEの平方根。",
      "オ": "①は教師あり学習。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2025/F1JI2025.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r07/1ji_seikai/f_v2_20250902.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和7年度第1次試験",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  }
];
