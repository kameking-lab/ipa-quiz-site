// IPA公式冊子から転記。原典・照合記録: ../2016-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2016_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2016a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "イーサネット",
    "topicTags": [
      "イーサネット"
    ],
    "difficulty": 2,
    "question": "ネットワーク機器のイーサネットポートがもつ機能であるAutomatic MDI/MDI-Xの説明として，適切なものはどれか。",
    "choices": {
      "ア": "接続先ポートの受信不可状態を自動判別して，それを基に自装置からの送信を止める機能",
      "イ": "接続先ポートの全二重・半二重を自動判別して，それを基に自装置の全二重・半二重を変更する機能",
      "ウ": "接続先ポートの速度を自動判別して，それを基に自装置のポートの速度を変更する機能",
      "エ": "接続先ポートのピン割当てを自動判別して，ストレートケーブル又はクロスケーブルのいずれでも接続できる機能"
    },
    "answer": "エ",
    "explanation": "正解はエ。Automatic MDI/MDI-Xは送受信に使う線の対応を自動で切り替える。ストレートとクロスのどちらのケーブルでも接続できるようにする機能である。",
    "choiceExplanations": {
      "ア": "相手の受信状態に応じた送信停止はフロー制御の説明であり，ピン割当ての自動切替えではない。",
      "イ": "全二重・半二重の動作モードの調整はオートネゴシエーションに関わり，MDI/MDI-Xの説明ではない。",
      "ウ": "ポート速度の自動調整はオートネゴシエーションに関わり，配線の対応を切り替える機能とは異なる。",
      "エ": "送信線と受信線の対応を自動で合わせ，ストレート・クロスのどちらでも接続できる機能に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "無線通信",
    "topicTags": [
      "無線通信"
    ],
    "difficulty": 3,
    "question": "高速無線通信で使われている多重化方式であり，データ信号を複数のサブキャリアに分割し，各サブキャリアが互いに干渉しないように配置する方式はどれか。",
    "choices": {
      "ア": "CCK",
      "イ": "CDM",
      "ウ": "OFDM",
      "エ": "TDM"
    },
    "answer": "ウ",
    "explanation": "正解はウ。OFDMは互いに直交する複数のサブキャリアにデータを分けて伝送する。符号で分けるCDMや時間で分けるTDMとは，多重化の方法が異なる。",
    "choiceExplanations": {
      "ア": "CCKは補数符号を用いた変調方式であり，直交するサブキャリアに分割する多重化方式ではない。",
      "イ": "CDMは異なる符号で信号を分離する符号分割多重であり，設問のサブキャリアの説明とは異なる。",
      "ウ": "直交するサブキャリアを用いる直交周波数分割多重がOFDMであり，設問に一致する。",
      "エ": "TDMは信号ごとに時間を分ける時分割多重であり，周波数上のサブキャリアを分ける方式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "ネットワークの最大流",
    "topicTags": [
      "ネットワークの最大流"
    ],
    "difficulty": 4,
    "question": "図のネットワークで，数字は二つの地点間で同時に使用できる論理回線の多重度を示している。X地点からY地点までは同時に最大幾つの論理回線を使用することができるか。",
    "choices": {
      "ア": "8",
      "イ": "9",
      "ウ": "10",
      "エ": "11"
    },
    "answer": "ウ",
    "explanation": "正解はウ。X・A・B・Cの組と，D・E・F・G・Yの組を分ける切断面に着目する。境界の容量はA-Dの1，B-Dの2，B-Eの3，C-Fの4で合計10。この上限を満たす経路配分ができるので最大10回線となる。",
    "choiceExplanations": {
      "ア": "境界容量10を使い切る経路配分が可能なので，8回線では最大値を表せない。",
      "イ": "途中の枝の容量制約を守ったまま10回線まで流せるため，9回線は最大ではない。",
      "ウ": "X側をX・A・B・Cとした切断面の合計容量は1＋2＋3＋4＝10で，その容量を実現できる。",
      "エ": "Xから出る容量だけなら11だが，途中の切断面が10に制限するので11回線は通せない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/nw/2016-autumn-am2-q3.png"
    ],
    "imageAltTexts": [
      "X，A～G，Yを結ぶネットワーク。各線の数字は同時に使用できる論理回線の多重度。"
    ]
  },
  {
    "id": "nw-2016a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "OSPF",
    "topicTags": [
      "OSPF"
    ],
    "difficulty": 4,
    "question": "図は，OSPFを使用するルータa～iのネットワーク構成を示す。拠点1と拠点3の間の通信はWAN1を，拠点2と拠点3の間の通信はWAN2を通過するようにしたい。xとyに設定するコストとして，適切な組合せはどれか。ここで，図中の数字はOSPFコストを示す。",
    "choices": {
      "ア": "x：20，y：20",
      "イ": "x：30，y：30",
      "ウ": "x：40，y：40",
      "エ": "x：50，y：50"
    },
    "answer": "イ",
    "explanation": "正解はイ。x＝y＝30なら，拠点1からはWAN1経由が30＋100＋30＋10＝170，WAN2経由が40＋100＋30＋10＝180。拠点2からはWAN1経由が50＋100＋30＋10＝190，WAN2経由が40＋100＋30＋10＝180となり，指定どおりの経路を優先できる。",
    "choiceExplanations": {
      "ア": "20では拠点1のWAN1経由とWAN2経由がともに170となり，WAN1を優先する条件を満たせない。",
      "イ": "30では拠点1は170対180でWAN1，拠点2は190対180でWAN2が低コストとなる。",
      "ウ": "40では拠点2のWAN1経由とWAN2経由がともに190となり，WAN2を優先できない。",
      "エ": "50では拠点2のWAN2経由が200で，WAN1経由の190より大きくなってしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/nw/2016-autumn-am2-q4.png"
    ],
    "imageAltTexts": [
      "OSPFルータa～iの構成。拠点1はa，拠点2はc，拠点3はiに接続し，b-eがWAN1，d-gがWAN2。g-fのコストがx，g-hがy。"
    ]
  },
  {
    "id": "nw-2016a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "QoS",
    "topicTags": [
      "QoS"
    ],
    "difficulty": 3,
    "question": "ネットワークのQoSを実現するために使用されるトラフィック制御方式に関する説明のうち，適切なものはどれか。",
    "choices": {
      "ア": "通信を開始する前にネットワークに対して帯域などのリソースを要求し，確保の状況に応じて通信を制御することを，アドミッション制御という。",
      "イ": "入力されたトラフィックが規定された最大速度を超過しないか監視し，超過分のパケットを破棄するか優先度を下げる制御を，シェーピングという。",
      "ウ": "パケットの送出間隔を調整することによって，規定された最大速度を超過しないようにトラフィックを平準化する制御を，ポリシングという。",
      "エ": "フレームの種類や宛先に応じて優先度を変えて中継することを，ベストエフォートという。"
    },
    "answer": "ア",
    "explanation": "正解はア。アドミッション制御は通信の受入れ時に必要な資源を確保できるか判断する。ポリシングは超過分の取締り，シェーピングは送出の平準化と対応させる。",
    "choiceExplanations": {
      "ア": "通信を開始する前に資源の確保状況を確認し，受入れを制御する動作がアドミッション制御である。",
      "イ": "超過パケットの破棄や優先度の引下げはポリシングの説明であり，シェーピングではない。",
      "ウ": "送信を待たせて流量を平準化する動作はシェーピングであり，ポリシングではない。",
      "エ": "優先度を変えた中継は優先制御である。ベストエフォートは特定の品質を保証する方式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "ARP",
    "topicTags": [
      "ARP"
    ],
    "difficulty": 3,
    "question": "IPv4でのARPを利用したGratuitous ARPの説明として，適切なものはどれか。",
    "choices": {
      "ア": "ターゲットIPアドレスフィールドに自端末が使用するIPアドレスを入れて，MACアドレスを問い合わせる。",
      "イ": "ターゲットIPアドレスフィールドに通信したい相手のIPアドレスを入れて，MACアドレスを問い合わせる。",
      "ウ": "ターゲットMACアドレスフィールドに自端末が使用するMACアドレスを入れて，IPアドレスを問い合わせる。",
      "エ": "ターゲットMACアドレスフィールドに通信したい相手のMACアドレスを入れて，IPアドレスを問い合わせる。"
    },
    "answer": "ア",
    "explanation": "正解はア。Gratuitous ARPでは，自分のIPアドレスを対象としてARPを送る。通常の通信相手のMACアドレス解決と違い，アドレスの重複確認や対応情報の通知などに利用する。",
    "choiceExplanations": {
      "ア": "自分が使うIPアドレスを対象に問い合わせる点がGratuitous ARPの特徴に一致する。",
      "イ": "相手のIPアドレスから相手のMACアドレスを調べるのは，通常のARP要求の説明である。",
      "ウ": "ARPはIPアドレスに対応するMACアドレスを調べる。MACアドレスからIPアドレスを問い合わせる説明ではない。",
      "エ": "調べる方向が逆であり，さらに自分のIPアドレスを対象とするGratuitous ARPの説明にもならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "IPsec",
    "topicTags": [
      "IPsec"
    ],
    "difficulty": 3,
    "question": "図はIPv4におけるIPsecのデータ形式を示している。ESPトンネルモードの電文中で，暗号化されているのはどの部分か。",
    "choices": {
      "ア": "ESPヘッダからESPトレーラまで",
      "イ": "TCPヘッダからESP認証データまで",
      "ウ": "オリジナルIPヘッダからESPトレーラまで",
      "エ": "新IPヘッダからESP認証データまで"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ESPトンネルモードでは元のIPパケット全体を包み，オリジナルIPヘッダからESPトレーラまでを暗号化する。新IPヘッダ，ESPヘッダ，ESP認証データはその暗号化範囲に入らない。",
    "choiceExplanations": {
      "ア": "ESPヘッダは暗号化範囲の外にあり，ここを起点にする説明は適切でない。",
      "イ": "オリジナルIPヘッダも暗号化される一方，ESP認証データは暗号化範囲に含まれない。",
      "ウ": "元のIPパケットとESPトレーラを暗号化するので，この起点と終点が適切である。",
      "エ": "経路制御に使う新IPヘッダまで暗号化することはなく，ESP認証データも範囲外である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2016-autumn-am2-q7.png"
    ],
    "imageAltTexts": [
      "新IPヘッダ，ESPヘッダ，オリジナルIPヘッダ，TCPヘッダ，データ，ESPトレーラ，ESP認証データの順に並ぶESPトンネルモードの電文。"
    ]
  },
  {
    "id": "nw-2016a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "IPv4",
    "topicTags": [
      "IPv4"
    ],
    "difficulty": 2,
    "question": "クラスDのIPアドレスを使用するのはどの場合か。",
    "choices": {
      "ア": "端末数が250台程度までの比較的小規模なホストアドレスを割り振る。",
      "イ": "端末数が65,000台程度の中規模なホストアドレスを割り振る。",
      "ウ": "プライベートアドレスを割り振る。",
      "エ": "マルチキャストアドレスを割り振る。"
    },
    "answer": "エ",
    "explanation": "正解はエ。クラスDはIPv4のマルチキャストに使うアドレス範囲である。個別のホストへ通常のユニキャストアドレスを割り振るためのクラスではない。",
    "choiceExplanations": {
      "ア": "小規模なネットワークのホスト用アドレスを表す説明であり，マルチキャスト用のクラスDではない。",
      "イ": "中規模なネットワークのホスト用アドレスを表す説明であり，クラスDの用途とは異なる。",
      "ウ": "プライベートアドレスの割当てはクラスDの用途ではなく，ユニキャストの私用範囲を使う。",
      "エ": "クラスDのアドレスは，複数の受信者からなるグループ宛てのマルチキャストで使用する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "MPLS",
    "topicTags": [
      "MPLS"
    ],
    "difficulty": 3,
    "question": "MPLSの説明として，適切なものはどれか。",
    "choices": {
      "ア": "IPプロトコルに暗号化や認証などのセキュリティ機能を付加するための規格である。",
      "イ": "L2FとPPTPを統合して改良したデータリンク層のトンネリングプロトコルである。",
      "ウ": "PPPデータフレームをIPパケットでカプセル化して，インターネットを通過させるためのトンネリングプロトコルである。",
      "エ": "ラベルと呼ばれる識別子を挿入することによって，IPアドレスに依存しないルーティングを実現する，ラベルスイッチング方式を用いたパケット転送技術である。"
    },
    "answer": "エ",
    "explanation": "正解はエ。MPLSはパケットに付けたラベルを使って転送先を決める技術である。各中継点でIPアドレスだけを基に経路を選ぶ処理とは区別する。",
    "choiceExplanations": {
      "ア": "IP通信に暗号化や認証を付加するのはIPsecの説明であり，MPLS自体の説明ではない。",
      "イ": "L2FとPPTPを基にしたトンネリング方式はL2TPの説明である。ラベル転送とは異なる。",
      "ウ": "PPPフレームを包んで運ぶトンネリング方式の説明であり，MPLSのラベルスイッチングではない。",
      "エ": "ラベルという識別子によるスイッチングでパケットを転送する点がMPLSに一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "TCP・UDP",
    "topicTags": [
      "TCP・UDP"
    ],
    "difficulty": 2,
    "question": "インターネットプロトコルのTCPとUDP両方のヘッダに存在するものはどれか。",
    "choices": {
      "ア": "宛先IPアドレス",
      "イ": "宛先MACアドレス",
      "ウ": "生存時間（TTL）",
      "エ": "送信元ポート番号"
    },
    "answer": "エ",
    "explanation": "正解はエ。TCPとUDPはいずれも，アプリケーションの通信を識別する送信元・宛先ポート番号をヘッダにもつ。IPアドレスやTTLはIPヘッダ，MACアドレスはフレーム側の情報である。",
    "choiceExplanations": {
      "ア": "宛先IPアドレスはIPヘッダに含まれる情報であり，TCP・UDP自身のヘッダのフィールドではない。",
      "イ": "宛先MACアドレスはデータリンク層のフレームで扱い，TCP・UDPヘッダには含めない。",
      "ウ": "TTLはIPv4ヘッダの情報であり，TCP・UDPのヘッダに共通する項目ではない。",
      "エ": "送信元ポート番号はTCPとUDPの双方がもち，送信元アプリケーションの識別に用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "経路集約",
    "topicTags": [
      "経路集約"
    ],
    "difficulty": 3,
    "question": "IPv4アドレスが192.168.10.0/24～192.168.58.0/24のネットワークを対象に経路を集約するとき，集約した経路のネットワークアドレスのビット数が最も多くなるものはどれか。",
    "choices": {
      "ア": "192.168.0.0/16",
      "イ": "192.168.0.0/17",
      "ウ": "192.168.0.0/18",
      "エ": "192.168.0.0/19"
    },
    "answer": "ウ",
    "explanation": "正解はウ。第3オクテットの10は00001010，58は00111010で，共通する先頭は00の2ビット。先頭16ビットと合わせて/18が最長となり，第3オクテット0～63を包含する。",
    "choiceExplanations": {
      "ア": "/16なら範囲を含められるが，共通部分を更に2ビット長く取れるので最長ではない。",
      "イ": "/17も全範囲を含むが，第3オクテットの先頭2ビットが共通するため/18まで集約できる。",
      "ウ": "/18は第3オクテット0～63を含み，10～58の全ネットワークを包含する最長のプレフィックスである。",
      "エ": "/19は第3オクテット0～31の範囲なので，58までの全ネットワークを含められない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2016a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "TCP",
    "topicTags": [
      "TCP"
    ],
    "difficulty": 3,
    "question": "TCPヘッダ中のウィンドウサイズの説明として，適切なものはどれか。",
    "choices": {
      "ア": "受信エラー時の再送に備えて送信側が保持しているデータのサイズを受信側に知らせるために使用される。",
      "イ": "受信側からの確認応答を待たずに，データを続けて送信できるかどうかの判断に使用される。",
      "ウ": "送信側と受信側の最適なバッファサイズを接続開始時のハンドシェイクで決定するために使用される。",
      "エ": "複数セグメントから成るデータの送信時，後続するセグメント数を受信側に知らせるために使用される。"
    },
    "answer": "イ",
    "explanation": "正解はイ。TCPのウィンドウサイズは受信側が受け入れられるデータ量を通知する。送信側はその範囲などを考慮し，確認応答を待たずに続けて送れる量を判断する。",
    "choiceExplanations": {
      "ア": "受信側へ送信側の再送用保管量を知らせるものではなく，受信側が受入れ可能な量を知らせる。",
      "イ": "受信側が広告したウィンドウによって，確認応答を待たずに送れる範囲を判断する。",
      "ウ": "最初に双方の最適バッファ量を固定するものではなく，受信状況に応じたフロー制御に使う。",
      "エ": "後続セグメントの個数を予告する値ではなく，受信できるデータ量を示すフィールドである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 4,
    "question": "図のようなルータ6台から成るネットワークにおいて，宛先IPアドレス10.100.100.1のIPパケットをルータYから受け取ったルータZは，どのルータに転送するか。ここで，ルータZは次に示すルーティングテーブルを用い，最長一致法（longest-match algorithm）によってルーティングするものとする。",
    "choices": {
      "ア": "ルータA",
      "イ": "ルータB",
      "ウ": "ルータC",
      "エ": "ルータD"
    },
    "answer": "ア",
    "explanation": "正解はア。10.100.100.1は10.0.0.0/8には一致する。一方，表の10.64.0.0/11は第2オクテット64～95，10.96.0.0/14は96～99，10.128.0.0/9は128～255なので一致しない。従って/8のネクストホップ192.168.1.254，ルータAへ送る。",
    "choiceExplanations": {
      "ア": "宛先に一致する経路は10.0.0.0/8とデフォルト経路であり，より長い/8に対応するルータAを選ぶ。",
      "イ": "255.224.0.0は/11で，この行が表す範囲は10.64.0.0～10.95.255.255。宛先の第2オクテット100は含まない。",
      "ウ": "255.252.0.0は/14で，10.96.0.0～10.99.255.255を表す。10.100.100.1はこの範囲の外である。",
      "エ": "10.128.0.0/9は第2オクテットが128以上の範囲であり，100の宛先には一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/nw/2016-autumn-am2-q13.png"
    ],
    "imageAltTexts": [
      "ルータY，Z，A～Dの接続図と，ルータZの宛先アドレス，サブネットマスク，ネクストホップを示すルーティングテーブル。"
    ]
  },
  {
    "id": "nw-2016a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "WebDAV",
    "topicTags": [
      "WebDAV"
    ],
    "difficulty": 3,
    "question": "WebDAVの特徴はどれか。",
    "choices": {
      "ア": "HTTP上のSOAPによってソフトウェア同士が通信して，ネットワーク上に分散したアプリケーションを連携させることができる。",
      "イ": "HTTPを拡張したプロトコルを使って，サーバ上のファイルの参照や作成，削除及びバージョン管理が行える。",
      "ウ": "WebアプリケーションからIMAPサーバにアクセスして，ブラウザから添付ファイルを含む電子メールの操作ができる。",
      "エ": "ブラウザで“ftp://”から始まるURLを指定して，ソフトウェアなどの大容量ファイルのダウンロードができる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。WebDAVはHTTPを拡張し，Web上の資源を共同で編集・管理するための仕組みである。サーバ上のファイルの参照や作成，削除などを行い，関連する拡張で版管理も扱う。",
    "choiceExplanations": {
      "ア": "SOAPによる分散アプリケーション連携の説明であり，WebDAVのファイル管理の説明ではない。",
      "イ": "HTTPの拡張によるサーバ上のファイル操作や，版管理の拡張を含む説明が適切である。",
      "ウ": "ブラウザからメールを操作するWebメールの説明であり，WebDAVの特徴ではない。",
      "エ": "FTPによるファイル取得の説明であり，HTTPを拡張したWebDAVとはプロトコルが異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "WebSocket",
    "topicTags": [
      "WebSocket"
    ],
    "difficulty": 3,
    "question": "チャットアプリケーションのようなWebブラウザとWebサーバ間でのリアルタイム性の高い双方向通信に利用されているWebSocketプロトコルの特徴はどれか。",
    "choices": {
      "ア": "WebブラウザとWebサーバ間で双方向通信を行うためのデータ形式はXMLを使って定義されている。",
      "イ": "WebブラウザとWebサーバ間でリアルタイム性の高い通信を実現するためにRTPを使用する。",
      "ウ": "WebブラウザとWebサーバとの非同期通信にはXMLHttpRequestオブジェクトを利用する。",
      "エ": "Webブラウザは最初にHTTPを使ってWebサーバにハンドシェイクの要求を送る。"
    },
    "answer": "エ",
    "explanation": "正解はエ。WebSocketは，最初にHTTPを使うハンドシェイクで接続を確立し，その後は双方向にメッセージを送れる。XMLへの固定やRTPの使用を前提とする仕組みではない。",
    "choiceExplanations": {
      "ア": "メッセージの内容をXMLに限定するプロトコルではなく，テキストやバイナリのデータを扱える。",
      "イ": "WebSocketのリアルタイム通信のためにRTPを使うわけではない。別の通信プロトコルである。",
      "ウ": "XMLHttpRequestはHTTPを用いた非同期リクエストのためのAPIであり，WebSocketの送受信とは異なる。",
      "エ": "接続開始時にHTTPでハンドシェイク要求を送り，WebSocketの通信へ移る点が適切である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "認証連携",
    "topicTags": [
      "認証連携"
    ],
    "difficulty": 3,
    "question": "SAML（Security Assertion Markup Language）の説明として，最も適切なものはどれか。",
    "choices": {
      "ア": "Webサービスに関する情報を広く公開し，それらが提供する機能などを検索可能にするための仕様",
      "イ": "権限がない利用者による傍受，読取り，改ざんから電子メールを保護して送信するための仕様",
      "ウ": "ディジタル署名に使われる鍵情報を効率よく管理するためのWebサービスの仕様",
      "エ": "認証情報に加え，属性情報とアクセス制御情報を異なるドメインに伝達するためのWebサービスの仕様"
    },
    "answer": "エ",
    "explanation": "正解はエ。SAMLは認証や属性，認可に関する情報を異なる主体間でやり取りするための仕様である。ドメインをまたぐ認証連携で利用する。",
    "choiceExplanations": {
      "ア": "Webサービスを登録・検索するための仕様の説明であり，認証情報を連携するSAMLの説明ではない。",
      "イ": "電子メールの機密性や完全性を保護する仕様の説明であり，SAMLの用途とは異なる。",
      "ウ": "鍵情報の管理に関するWebサービスの説明であり，認証・属性情報の交換とは目的が異なる。",
      "エ": "認証や属性，アクセス制御に関わる情報をドメイン間で伝える説明がSAMLに一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "無線LAN認証",
    "topicTags": [
      "無線LAN認証"
    ],
    "difficulty": 3,
    "question": "無線LANで使用される規格IEEE802.1Xが定めているものはどれか。",
    "choices": {
      "ア": "アクセスポイントがEAPを使用して，利用者を認証する枠組み",
      "イ": "アクセスポイントが認証局と連携し，パスワードをセッションごとに生成する仕組み",
      "ウ": "無線LANに接続する機器のセキュリティ対策に関するWPSの仕様",
      "エ": "無線LANの信号レベルで衝突を検知するCSMA/CD方式"
    },
    "answer": "ア",
    "explanation": "正解はア。IEEE 802.1Xは，ネットワークへの接続時に認証を行う枠組みを定める。無線LANではアクセスポイントが認証の中継を担い，EAPを利用する。",
    "choiceExplanations": {
      "ア": "EAPを用いて接続する利用者の認証を行う枠組みであり，IEEE 802.1Xの説明に一致する。",
      "イ": "認証局と連携して毎回パスワードを生成することを定めた規格ではない。",
      "ウ": "WPSは無線LANの接続設定に関する別の仕組みであり，802.1Xの認証枠組みではない。",
      "エ": "CSMA/CDは衝突検出を行う方式であり，802.1Xのアクセス認証の規格とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "DDoS対策",
    "topicTags": [
      "DDoS対策"
    ],
    "difficulty": 3,
    "question": "NTPを使った増幅型のDDoS攻撃に対して，NTPサーバが踏み台にされることを防止する対策として，適切なものはどれか。",
    "choices": {
      "ア": "NTPサーバの設定変更によって，NTPサーバの状態確認機能（monlist）を無効にする。",
      "イ": "NTPサーバの設定変更によって，自ネットワーク外のNTPサーバへの時刻問合せができないようにする。",
      "ウ": "ファイアウォールの設定変更によって，NTPサーバが存在するネットワークのブロードキャストアドレス宛てのパケットを拒否する。",
      "エ": "ファイアウォールの設定変更によって，自ネットワーク外からの，NTP以外のUDPサービスへのアクセスを拒否する。"
    },
    "answer": "ア",
    "explanation": "正解はア。NTPのmonlistによる大きな応答は，送信元を偽装した増幅攻撃に悪用され得る。踏み台化を防ぐため，この状態確認機能を無効化する対策が有効である。",
    "choiceExplanations": {
      "ア": "増幅に悪用されるmonlistの応答を止めることで，この機能を使う踏み台化を防ぐ。",
      "イ": "外部の時刻サーバへの問合せを止めても，自サーバへのmonlist要求への応答は止まらない。",
      "ウ": "この攻撃はNTPサーバ自身への要求で成立し，ブロードキャスト宛ての拒否だけでは防げない。",
      "エ": "攻撃で使われるのはNTPなので，NTP以外のUDPサービスだけを拒否しても対策にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "電磁波対策",
    "topicTags": [
      "電磁波対策"
    ],
    "difficulty": 3,
    "question": "テンペスト技術の説明とその対策として，適切なものはどれか。",
    "choices": {
      "ア": "ディスプレイなどから放射される電磁波を傍受し，表示内容などを盗み見る技術であり，その対策としては，電磁波を遮断する。",
      "イ": "データ通信の途中でパケットを横取りし，内容を改ざんする技術であり，その対策としては，ディジタル署名を利用して改ざんを検知する。",
      "ウ": "マクロウイルスにおいて使われる技術であり，その対策としては，ウイルス対策ソフトを導入し，最新の定義ファイルを適用する。",
      "エ": "無線LANの信号を傍受し，通信内容を解析する技術であり，その対策としては，通信パケットを暗号化する。"
    },
    "answer": "ア",
    "explanation": "正解はア。テンペストは機器から漏れる電磁波を手掛かりに情報を読み取る技術に関わる。遮蔽などで電磁波の漏えいを抑える対策が対応する。",
    "choiceExplanations": {
      "ア": "ディスプレイなどの漏えい電磁波を利用した盗み見と，電磁波の遮断という対策の組合せが適切である。",
      "イ": "通信途中の改ざんとその検出の説明であり，機器から漏れる電磁波の解析とは異なる。",
      "ウ": "マクロによるマルウェアとその対策であり，テンペストの電磁波による情報取得の説明ではない。",
      "エ": "無線LANの通信信号そのものの盗聴であり，ディスプレイなどの漏えい電磁波の利用とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "ファイアウォール",
    "topicTags": [
      "ファイアウォール"
    ],
    "difficulty": 3,
    "question": "社内ネットワークとインターネットの接続点に，ステートフルインスペクション機能をもっていない，静的なパケットフィルタリング型のファイアウォールを設置している。このネットワーク構成において，社内のPCからインターネット上のSMTPサーバに電子メールを送信できるようにするとき，ファイアウォールで通過許可するTCPパケットのポート番号の組合せはどれか。",
    "choices": {
      "ア": "PC→SMTPサーバ：送信元25，宛先1024以上。SMTPサーバ→PC：送信元1024以上，宛先25。",
      "イ": "PC→SMTPサーバ：送信元110，宛先1024以上。SMTPサーバ→PC：送信元1024以上，宛先110。",
      "ウ": "PC→SMTPサーバ：送信元1024以上，宛先25。SMTPサーバ→PC：送信元25，宛先1024以上。",
      "エ": "PC→SMTPサーバ：送信元1024以上，宛先110。SMTPサーバ→PC：送信元110，宛先1024以上。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。この設問のSMTPサーバは25番で接続を受け，PCは1024以上のポートを送信元に使う。応答では送信元と宛先のポートが逆になる。静的フィルタなので往復の通信を許可する組合せを見る。",
    "choiceExplanations": {
      "ア": "クライアントとサーバのポートの向きが逆である。SMTPサーバ側が25番で接続を受け付ける。",
      "イ": "110番はこの設問のSMTPのポートではなく，さらに送信元と宛先のポートの向きも逆である。",
      "ウ": "往路はPCの1024以上からサーバの25へ，復路はサーバの25からPCの同じポートへ戻る。",
      "エ": "110番はPOP3のためのポートであり，この設問のSMTPによる送信を許可する条件にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "無線LAN",
    "topicTags": [
      "無線LAN"
    ],
    "difficulty": 3,
    "question": "無線LANのアクセスポイントがもつプライバシセパレータ機能（アクセスポイントアイソレーション）の説明はどれか。",
    "choices": {
      "ア": "アクセスポイントの識別子を知っている利用者だけに機器の接続を許可する。",
      "イ": "同じ無線LANのアクセスポイントに接続している機器同士の直接通信を禁止する。",
      "ウ": "事前に登録されたMACアドレスをもつ機器だけに無線LANへの接続を許可する。",
      "エ": "建物外への無線LAN電波の漏れを防ぐことによって第三者による盗聴を防止する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。プライバシセパレータは，同じアクセスポイントにつながった端末同士の通信を制限する。SSIDの通知やMACアドレスによる接続制限とは別の機能である。",
    "choiceExplanations": {
      "ア": "アクセスポイントの識別子を使った接続条件の説明であり，接続済みの端末間の通信制限ではない。",
      "イ": "同じアクセスポイントに接続する端末同士を分離し，直接通信を禁止する機能に一致する。",
      "ウ": "登録したMACアドレスに基づく接続制限であり，端末同士の通信を分離する機能とは異なる。",
      "エ": "電波を建物内に閉じ込める機能ではない。電波の到達範囲と端末間の分離は別の問題である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "割込み",
    "topicTags": [
      "割込み"
    ],
    "difficulty": 3,
    "question": "ユーザプログラムの実行中に割込みが発生した場合のプロセッサの処理として，適切なものはどれか。\n\n① プログラムレジスタ（プログラムカウンタ）などの退避\n② ユーザモードから特権モードへの移行\n③ 割込み処理ルーチンの開始番地の決定\n④ 割込み処理ルーチンの実行",
    "choices": {
      "ア": "①→③→④→②",
      "イ": "②→①→③→④",
      "ウ": "②→③→④→①",
      "エ": "③→④→①→②"
    },
    "answer": "イ",
    "explanation": "正解はイ。まず割込みを処理できる特権モードへ移行し，元のプログラムに戻るための状態を退避する。その後，割込み処理ルーチンの開始番地を決めて実行するので，②→①→③→④となる。",
    "choiceExplanations": {
      "ア": "ユーザモードのまま割込み処理ルーチンを実行する順序になっており，適切でない。",
      "イ": "特権モードへ移行し，復帰用の状態を退避してから，処理先を決定して実行する順序である。",
      "ウ": "処理を実行した後に元の状態を退避しても復帰に必要な情報を保持できないため，順序が逆である。",
      "エ": "特権モードへの移行や元の状態の退避に先立ってルーチンを実行する順序は適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "タイムアウト設計",
    "topicTags": [
      "タイムアウト設計"
    ],
    "difficulty": 3,
    "question": "Webサーバ，アプリケーション（AP）サーバ及びDBサーバ各1台で構成されるWebシステムにおいて，次の3種類のタイムアウトを設定した。タイムアウトに設定する時間の長い順に並べたものはどれか。ここで，トランザクションはWebリクエスト内で処理を完了するものとする。\n\n〔タイムアウトの種類〕\n① APサーバのAPが，処理を開始してから終了するまで\n② APサーバのAPにおいて，DBアクセスなどのトランザクションを開始してから終了するまで\n③ Webサーバが，APサーバにリクエストを送信してから返信を受けるまで",
    "choices": {
      "ア": "①，③，②",
      "イ": "②，①，③",
      "ウ": "③，①，②",
      "エ": "③，②，①"
    },
    "answer": "ウ",
    "explanation": "正解はウ。DBのトランザクションはAPの処理内で完了し，WebサーバはそのAPの応答を待つ。内側の処理から先にタイムアウトを検知できるよう，外側の待ち時間ほど長くするため③＞①＞②となる。",
    "choiceExplanations": {
      "ア": "AP処理全体よりも，その処理と応答を待つWebサーバ側のタイムアウトを長くする必要がある。",
      "イ": "トランザクションはAP処理の内側なので，②を①や③より長くする順序は適切でない。",
      "ウ": "外側のWebサーバの待ち③，AP全体①，内部のトランザクション②の順に長くする。",
      "エ": "トランザクション②よりもAPの処理全体①を長くする必要があり，内側と外側の順序が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "ソフトウェアテスト",
    "topicTags": [
      "ソフトウェアテスト"
    ],
    "difficulty": 3,
    "question": "システム開発で行うテストについて，テスト要求事項を定義するアクティビティと対応するテストの組合せのうち，適切なものはどれか。",
    "choices": {
      "ア": "システム方式設計：運用テスト。ソフトウェア方式設計：システム結合テスト。ソフトウェア詳細設計：ソフトウェア結合テスト。",
      "イ": "システム方式設計：運用テスト。ソフトウェア方式設計：ソフトウェア結合テスト。ソフトウェア詳細設計：ソフトウェアユニットテスト。",
      "ウ": "システム方式設計：システム結合テスト。ソフトウェア方式設計：ソフトウェア結合テスト。ソフトウェア詳細設計：ソフトウェアユニットテスト。",
      "エ": "システム方式設計：システム結合テスト。ソフトウェア方式設計：ソフトウェアユニットテスト。ソフトウェア詳細設計：ソフトウェア結合テスト。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。システムの構成を決める方式設計にはシステム結合テスト，ソフトウェアの構成を決める方式設計にはソフトウェア結合テスト，個々の詳細設計にはユニットテストが対応する。",
    "choiceExplanations": {
      "ア": "システム方式設計を運用テストに対応させ，更にソフトウェア方式・詳細と結合テストの対応もずれている。",
      "イ": "ソフトウェア側の二つの対応は合うが，システム方式設計に対応するのはシステム結合テストである。",
      "ウ": "全体の方式，ソフトウェアの方式，個々の詳細という設計の粒度と，結合・ユニットの確認範囲が一致する。",
      "エ": "ソフトウェア方式設計には結合テスト，詳細設計にはユニットテストが対応する。二つが逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2016a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "SOA",
    "topicTags": [
      "SOA"
    ],
    "difficulty": 2,
    "question": "SOA（Service Oriented Architecture）の説明はどれか。",
    "choices": {
      "ア": "Webサービスを利用するためのインタフェースやプロトコルを規定したものである。",
      "イ": "XMLを利用して，インターネット上に存在するWebサービスを検索できる仕組みである。",
      "ウ": "業務機能を提供するサービスを組み合わせることによって，システムを構築する考え方である。",
      "エ": "サービス提供者と顧客との間でサービスの内容，範囲及び品質に関する要求水準を明確にして，あらかじめ合意を得ておくことである。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。SOAは業務機能をサービスとして分け，必要なサービスを組み合わせてシステムを作る設計の考え方である。特定の通信規約やサービス品質の合意そのものを指す言葉ではない。",
    "choiceExplanations": {
      "ア": "インタフェースや通信プロトコルを定める仕様の説明であり，SOAという構成上の考え方とは異なる。",
      "イ": "Webサービスを発見・検索するための仕組みの説明であり，サービスを組み合わせる設計の説明ではない。",
      "ウ": "業務機能を提供するサービスの組合せでシステムを構成する点がSOAに一致する。",
      "エ": "サービスの内容や品質水準についてあらかじめ合意するSLAの説明であり，SOAとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
