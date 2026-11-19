// IPA公式冊子から転記。原典・照合記録: ../2018-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2018_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2018a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 1,
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
    "explanation": "正解はウ。OFDMは互いに直交するサブキャリアを使い，複数の信号を並列に送る。符号で分けるCDM，時間で分けるTDMと区別する。",
    "choiceExplanations": {
      "ア": "CCKは補数符号を用いる変調方式であり，直交するサブキャリアへの分割を表す名称ではない。",
      "イ": "CDMは異なる符号で信号を分けて多重化する方式であり，サブキャリアの直交性による多重化とは異なる。",
      "ウ": "直交する多数のサブキャリアに信号を分配して送る，直交周波数分割多重である。",
      "エ": "TDMは時間を区切って信号を多重化する方式であり，周波数上にサブキャリアを並べる方式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "LAN",
    "topicTags": [
      "LAN"
    ],
    "difficulty": 3,
    "question": "CSMA/CAやCSMA/CDのLANの制御に共通しているCSMA方式に関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "キャリア信号を検出し，データの送信を制御する。",
      "イ": "送信権をもつメッセージ（トークン）を得た端末がデータを送信する。",
      "ウ": "データ送信中に衝突が起こった場合は，直ちに再送を行う。",
      "エ": "伝送路が使用中でもデータの送信はできる。"
    },
    "answer": "ア",
    "explanation": "正解はア。CSMAでは送信前に伝送路の状態を調べる。衝突を検出するCDと，衝突を回避するCAで動作は異なるが，キャリアを確認する点は共通する。",
    "choiceExplanations": {
      "ア": "Carrier Senseのとおり，伝送路が使用されているか確認して送信を制御する仕組みである。",
      "イ": "送信権のトークンを巡回させるのはトークンパッシング方式の説明である。",
      "ウ": "衝突時は待ち時間を設けて再試行する。直ちに再送すると再び衝突するおそれがある。",
      "エ": "他端末の信号を検知した場合は送信を待つ。使用中でも無条件に送る方式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 3,
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
    "explanation": "正解はア。アドミッション制御は通信の受入れ段階で資源を確認する。受入れ後の流量については，超過を取り締まるポリシングと，送出を平準化するシェーピングを使い分ける。",
    "choiceExplanations": {
      "ア": "必要な資源を確保できるか判断し，新しい通信を受け入れるか制御する方式である。",
      "イ": "超過したパケットの破棄や優先度変更はポリシングであり，シェーピングではない。",
      "ウ": "送出を待たせてトラフィックを平準化するのはシェーピングであり，ポリシングではない。",
      "エ": "優先度に応じた中継は優先制御である。ベストエフォートは品質の保証をしないサービスである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "LAN",
    "topicTags": [
      "LAN"
    ],
    "difficulty": 3,
    "question": "図のイーサネットパケットのMTU（Maximum Transmission Unit）は，どの部分の最大長のことか。",
    "choices": {
      "ア": "IPヘッダ＋TCPヘッダ＋データ",
      "イ": "MACヘッダ＋IPヘッダ＋TCPヘッダ＋データ",
      "ウ": "MACヘッダ＋IPヘッダ＋TCPヘッダ＋データ＋FCS",
      "エ": "プリアンブル＋MACヘッダ＋IPヘッダ＋TCPヘッダ＋データ＋FCS"
    },
    "answer": "ア",
    "explanation": "正解はア。MTUはリンクで運べる上位層パケットの最大長を指す。この図ではIPパケット全体，すなわちIPヘッダ・TCPヘッダ・データが対象である。",
    "choiceExplanations": {
      "ア": "イーサネットで運ぶ上位層のパケット全体が対象であり，図ではIPヘッダからデータまでである。",
      "イ": "MACヘッダはイーサネットのフレームに付く部分であり，MTUに含めない。",
      "ウ": "MACヘッダに加え末尾のFCSも含んでおり，MTUの範囲より広い。",
      "エ": "物理層のプリアンブルやフレームのヘッダ・FCSまで含むため，MTUの範囲ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2018-autumn-am2-q4.png"
    ],
    "imageAltTexts": [
      "左からプリアンブル，MACヘッダ，IPヘッダ，TCPヘッダ，データ，FCSが並ぶ。"
    ]
  },
  {
    "id": "nw-2018a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 3,
    "question": "インターネットにおいて，AS（Autonomous System）間の経路制御に用いられるプロトコルはどれか。",
    "choices": {
      "ア": "BGP",
      "イ": "IS-IS",
      "ウ": "OSPF",
      "エ": "RIP"
    },
    "answer": "ア",
    "explanation": "正解はア。BGPはAS間の経路交換に使う。AS内部を対象とするIS-IS，OSPF，RIPとは適用する範囲が異なる。",
    "choiceExplanations": {
      "ア": "自律システム間で経路を交換し，パス属性と運用ポリシーに基づいて経路を選択する。",
      "イ": "IS-ISは自律システム内部で利用するリンクステート型の経路制御プロトコルである。",
      "ウ": "OSPFは自律システム内部でコストを基に経路を求めるプロトコルである。",
      "エ": "RIPはホップ数を使う内部経路制御プロトコルであり，インターネットのAS間経路制御には用いない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "TCP/IP",
    "topicTags": [
      "TCP/IP"
    ],
    "difficulty": 3,
    "question": "図のような2台のレイヤ2スイッチ，1台のルータ，4台の端末から成るIPネットワークで，端末Aから端末Cに通信を行う際に，送付されるパケットの宛先IPアドレスである端末CのIPアドレスと，端末CのMACアドレスとを対応付けるのはどの機器か。ここで，ルータZにおいてプロキシARPは設定されていないものとする。",
    "choices": {
      "ア": "端末A",
      "イ": "ルータZ",
      "ウ": "レイヤ2スイッチX",
      "エ": "レイヤ2スイッチY"
    },
    "answer": "イ",
    "explanation": "正解はイ。異なるIPネットワーク宛てのパケットでは，各リンクで必要な宛先MACアドレスを解決する。AはルータZへ送り，ZがCのIPアドレスからMACアドレスを得て転送する。",
    "choiceExplanations": {
      "ア": "端末Aは別ネットワークの端末CのMACアドレスではなく，次の中継先であるルータZのMACアドレスを調べる。",
      "イ": "端末Cのネットワークへ直接接続するルータZがARPを用い，CのIPアドレスに対応するMACアドレスを得る。",
      "ウ": "レイヤ2スイッチXはMACアドレスと転送ポートを対応付ける。宛先CのIPとMACの解決を担当しない。",
      "エ": "レイヤ2スイッチYもMACアドレスでフレームを中継する。C宛てのIPパケットを送るためのARPを行う主体はルータZである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2018-autumn-am2-q6.png"
    ],
    "imageAltTexts": [
      "ルータZの下にレイヤ2スイッチXとY。Xに端末AとB，Yに端末CとDがつながる。"
    ]
  },
  {
    "id": "nw-2018a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "DNS",
    "topicTags": [
      "DNS"
    ],
    "difficulty": 3,
    "question": "DNSでのホスト名とIPアドレスの対応付けに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "一つのホスト名に複数のIPアドレスを対応させることはできるが，複数のホスト名に同一のIPアドレスを対応させることはできない。",
      "イ": "一つのホスト名に複数のIPアドレスを対応させることも，複数のホスト名に同一のIPアドレスを対応させることもできる。",
      "ウ": "複数のホスト名に同一のIPアドレスを対応させることはできるが，一つのホスト名に複数のIPアドレスを対応させることはできない。",
      "エ": "ホスト名とIPアドレスの対応は全て1対1である。"
    },
    "answer": "イ",
    "explanation": "正解はイ。同じホスト名に複数のAレコードなどを登録できる。また，異なる複数のホスト名が同じサーバのIPアドレスを指してもよい。",
    "choiceExplanations": {
      "ア": "複数の名前が同じIPアドレスを指す設定もできるため，後半の制限はない。",
      "イ": "同じ名前に複数のアドレスレコードを置くことも，異なる名前に同じアドレスを登録することもできる。",
      "ウ": "一つの名前に複数のIPアドレスを登録できるため，後半の制限はない。",
      "エ": "DNSの名前とアドレスは常に一対一ではなく，多対多の対応が可能である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "マルチキャスト",
    "topicTags": [
      "マルチキャスト"
    ],
    "difficulty": 3,
    "question": "IPv4ネットワークのマルチキャスト通信で，ローカルセグメントにおいて，配信を受けるホストのグループを管理するために用いられるプロトコルはどれか。",
    "choices": {
      "ア": "ICMP",
      "イ": "IGMP",
      "ウ": "RTP",
      "エ": "SDP"
    },
    "answer": "イ",
    "explanation": "正解はイ。IGMPはIPv4マルチキャストの受信グループを管理する。ルータは参加状況を基に，そのセグメントへどのグループのデータを配信するか判断する。",
    "choiceExplanations": {
      "ア": "ICMPはIP通信のエラー通知や診断などを扱い，マルチキャストグループ参加の管理を目的としない。",
      "イ": "ホストがグループへの参加状況をルータへ通知し，ローカルセグメントでの配信先管理に使う。",
      "ウ": "RTPは音声や映像などのリアルタイムデータを運ぶためのプロトコルである。",
      "エ": "SDPはメディアセッションの属性などを記述する形式であり，グループ参加管理ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "ディレクトリサービス",
    "topicTags": [
      "ディレクトリサービス"
    ],
    "difficulty": 3,
    "question": "LDAPの説明として，適切なものはどれか。",
    "choices": {
      "ア": "OSIのディレクトリサービスであるX.500シリーズに機能を追加して作成され，X.500シリーズのプロトコルを包含している。",
      "イ": "インターネット上のLDAPサーバの最上位サーバとしてルートDSEが設置されている。",
      "ウ": "ディレクトリツリーへのアクセス手順や，データ交換フォーマットが規定されている。",
      "エ": "問合せ処理を軽くするためにTCPは使わずUDPによって通信し，通信の信頼性はLDAPプロトコル自身で確保する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。LDAPはディレクトリへのアクセスに使うプロトコルで，検索，追加，変更などの操作を定める。ルートDSEは各サーバの情報を取得するためのエントリである。",
    "choiceExplanations": {
      "ア": "LDAPはX.500のモデルに基づく軽量なアクセス手段であり，X.500の全プロトコルを拡張して包含するものではない。",
      "イ": "ルートDSEは各LDAPサーバの機能などを表すエントリであり，インターネット全体の最上位サーバではない。",
      "ウ": "ツリー構造のディレクトリを検索・更新する操作と，メッセージの表現方法を規定する。",
      "エ": "LDAPはTCPを使えるため，TCPを使わずUDPだけで通信するという説明は誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "TCP/IP",
    "topicTags": [
      "TCP/IP"
    ],
    "difficulty": 3,
    "question": "クラスBのIPアドレスで，サブネットマスクが16進数のFFFFFF80である場合，利用可能なホスト数は最大幾つか。",
    "choices": {
      "ア": "126",
      "イ": "127",
      "ウ": "254",
      "エ": "255"
    },
    "answer": "ア",
    "explanation": "正解はア。末尾80は2進数で10000000なので，サブネットマスクの1は25個，ホスト部は7ビット。通常のサブネットでは2^7－2＝126台分となる。",
    "choiceExplanations": {
      "ア": "FFFFFF80は/25で，ホスト部は7ビット。2の7乗からネットワークとブロードキャストの2個を除くと126となる。",
      "イ": "128個から1個だけ除いた数であり，ネットワークアドレスとブロードキャストアドレスの両方を除いていない。",
      "ウ": "254はホスト部8ビットの/24での値であり，/25の設問とは異なる。",
      "エ": "/25の総アドレス数128を超えており，ホスト部のビット数が合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2018a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "マルチキャスト",
    "topicTags": [
      "マルチキャスト"
    ],
    "difficulty": 3,
    "question": "IPv4のマルチキャストに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "全てのマルチキャストアドレスは，アドレスごとにあらかじめ用途が固定的に決められている。",
      "イ": "マルチキャストアドレスには，クラスDのアドレスが使用される。",
      "ウ": "マルチキャストパケットは，TTL値に関係なくIPマルチキャスト対応ルータによって中継される。",
      "エ": "マルチキャストパケットは，ネットワーク上の全てのホストによって受信され，IPよりも上位の層で，必要なデータか否かが判断される。"
    },
    "answer": "イ",
    "explanation": "正解はイ。IPv4のマルチキャスト用アドレスは224.0.0.0/4で，従来のクラスDに当たる。グループへ参加したホストが配信対象となる。",
    "choiceExplanations": {
      "ア": "特定用途の予約範囲だけでなく，管理者がグループへ割り当てて使う範囲も存在する。",
      "イ": "IPv4では先頭ビットが1110のクラスDの範囲をマルチキャストに使う。",
      "ウ": "マルチキャストでもTTLによる中継範囲の制限を受けるため，TTLに関係なく転送されるわけではない。",
      "エ": "全ホストを対象とするブロードキャストとは異なり，特定のマルチキャストグループへの配信である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "無線通信",
    "topicTags": [
      "無線通信"
    ],
    "difficulty": 3,
    "question": "日本国内において，2.4GHz帯の周波数を使用しない無線通信の規格はどれか。",
    "choices": {
      "ア": "Bluetooth",
      "イ": "IEEE 802.11ac",
      "ウ": "IEEE 802.11b",
      "エ": "IEEE 802.11g"
    },
    "answer": "イ",
    "explanation": "正解はイ。802.11acは5GHz帯を利用する。2.4GHz帯を利用するBluetooth，802.11b，802.11gとの違いを押さえる。",
    "choiceExplanations": {
      "ア": "Bluetoothは2.4GHz帯を使用するため，設問の条件には合わない。",
      "イ": "IEEE 802.11acは5GHz帯を使用し，2.4GHz帯を使う規格ではない。",
      "ウ": "IEEE 802.11bは2.4GHz帯を使う無線LAN規格である。",
      "エ": "IEEE 802.11gも2.4GHz帯を使う無線LAN規格である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "SDN",
    "topicTags": [
      "SDN"
    ],
    "difficulty": 3,
    "question": "ONF（Open Networking Foundation）が定義するSDN（Software-Defined Networking）において，アプリケーション，コントローラ及びネットワーク機器に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "OpenFlowは，コントローラの処理フローを定義したものである。",
      "イ": "OpenFlowを用いたネットワークでは，ネットワーク機器がデータ転送を行うための情報はコントローラから提供される。",
      "ウ": "アプリケーションは，Data-Controller Plane Interface（サウスバウンドインタフェースとも呼ばれる）を介して，コントローラに指示を出す。",
      "エ": "アプリケーションは，ネットワーク機器に直接指示を出す。"
    },
    "answer": "イ",
    "explanation": "正解はイ。SDNでは転送処理と制御処理を分ける。OpenFlowを使う構成では，コントローラが転送規則を提供し，ネットワーク機器がその規則でパケットを転送する。",
    "choiceExplanations": {
      "ア": "OpenFlowはコントローラと転送機器との間の制御に使うプロトコルであり，プログラムの処理フロー定義ではない。",
      "イ": "コントローラがフローの転送規則を機器に設定し，機器はその規則に従ってデータを転送する。",
      "ウ": "アプリケーションとコントローラの間はノースバウンド側であり，転送機器との間のサウスバウンドではない。",
      "エ": "アプリケーションの要求はコントローラを介して反映する。転送機器へ直接指示する説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "Web",
    "topicTags": [
      "Web"
    ],
    "difficulty": 3,
    "question": "WebブラウザでURLにhttps://ftp.example.jp/index.cgi?port=123と指定したときに，Webブラウザが接続しにいくサーバのTCPポート番号はどれか。",
    "choices": {
      "ア": "21",
      "イ": "80",
      "ウ": "123",
      "エ": "443"
    },
    "answer": "エ",
    "explanation": "正解はエ。接続先のポートを明示するならホスト名の直後に「:番号」を置く。疑問符以降のport=123はアプリケーションへ渡すクエリなので，HTTPSの既定ポート443を変えない。",
    "choiceExplanations": {
      "ア": "21はFTP制御接続のポートである。ホスト名にftpが含まれても，URLのスキームはhttpsである。",
      "イ": "80はHTTPの既定ポートであり，HTTPSを指定している本問では選ばない。",
      "ウ": "port=123はクエリのデータであり，接続先のポートを指定する構文ではない。",
      "エ": "httpsスキームで接続先ポートが明示されていないため，既定のTCP 443へ接続する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "Web",
    "topicTags": [
      "Web"
    ],
    "difficulty": 3,
    "question": "WebSocketの説明として，適切なものはどれか。",
    "choices": {
      "ア": "HTTPを拡張したプロトコルであり，通信メッセージはXML形式で記述される。",
      "イ": "URIのスキームにhttp又はhttpsを使用し，HTTPやHTTPSと同じポート番号で通信する。",
      "ウ": "双方向通信を行う仕組みであり，サーバ側からもクライアントにWebSocketの接続開始を要求できる。",
      "エ": "通信はGETメソッドで始まり，クライアントとサーバ間でハンドシェイクをして接続が確立する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。本問はHTTP/1.1のGETとUpgradeを使う開始手順を問う。接続確立後は，同じ接続上でクライアントとサーバが双方向にメッセージを送れる。",
    "choiceExplanations": {
      "ア": "メッセージはテキストやバイナリを扱え，XMLに限定されない。HTTPによる開始手順とデータ形式を混同しない。",
      "イ": "WebSocketのURIスキームはws又はwssであり，http又はhttpsという記述は誤りである。",
      "ウ": "接続後は双方向に送信できるが，ブラウザからのWebSocket接続はクライアントが開始する。",
      "エ": "HTTP/1.1を使う開始手順ではクライアントがGETによるUpgrade要求を送り，応答を経て接続を確立する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "セキュリティ",
    "topicTags": [
      "セキュリティ"
    ],
    "difficulty": 3,
    "question": "ICMP Flood攻撃に該当するものはどれか。",
    "choices": {
      "ア": "HTTP GETリクエストを繰り返し送ることによって，攻撃対象のサーバにコンテンツ送信の負荷を掛ける。",
      "イ": "pingコマンドを用いて大量の要求パケットを発信することによって，攻撃対象のサーバに至るまでの回線を過負荷にしてアクセスを妨害する。",
      "ウ": "コネクション開始要求に当たるSYNパケットを大量に送ることによって，攻撃対象のサーバに，接続要求ごとに応答を返すための過大な負荷を掛ける。",
      "エ": "大量のTCPコネクションを確立し，攻撃対象のサーバに接続を維持させ続けることによって，リソースを枯渇させる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ICMPフラッドは，ICMPパケットを大量に送り付けて通信帯域や機器の処理を圧迫する。HTTPやTCPの接続処理を使う攻撃と，利用するプロトコルで区別する。",
    "choiceExplanations": {
      "ア": "HTTPリクエストによるフラッド攻撃であり，ICMPを使う攻撃ではない。",
      "イ": "pingで使うICMP Echo Requestを大量に送り，回線や処理能力を圧迫する攻撃である。",
      "ウ": "TCPのSYNを使うSYNフラッドの説明であり，ICMPフラッドではない。",
      "エ": "TCPの接続維持に必要な資源を消費させる攻撃であり，ICMPの大量送信とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "認証",
    "topicTags": [
      "認証"
    ],
    "difficulty": 3,
    "question": "認証にクライアント証明書を用いるプロトコルはどれか。",
    "choices": {
      "ア": "EAP-FAST",
      "イ": "EAP-MD5",
      "ウ": "EAP-TLS",
      "エ": "EAP-TTLS"
    },
    "answer": "ウ",
    "explanation": "正解はウ。EAP-TLSはクライアント証明書とサーバ証明書を使う。サーバ側だけの証明書でトンネルを作り，内部でパスワードなどを使う方式とは区別する。",
    "choiceExplanations": {
      "ア": "EAP-FASTはPACを用いてトンネルを構築する方式であり，クライアント証明書による相互認証を基本とする方式ではない。",
      "イ": "EAP-MD5はチャレンジレスポンスによる認証であり，クライアント証明書を使う方式ではない。",
      "ウ": "TLSでサーバとクライアントの証明書を使い，相互に認証する方式である。",
      "エ": "EAP-TTLSはサーバを証明書で認証し，トンネル内で別方式のクライアント認証を行える。クライアント証明書を必要とする方式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "Webセキュリティ",
    "topicTags": [
      "Webセキュリティ"
    ],
    "difficulty": 3,
    "question": "WebサイトがWebブラウザに対して，指定された期間において，当該Webサイトへのアクセスをhttpsで行うように指示するHTTPレスポンスヘッダフィールドはどれか。",
    "choices": {
      "ア": "Content-Security-Policy",
      "イ": "Strict-Transport-Security",
      "ウ": "X-Content-Type-Options",
      "エ": "X-XSS-Protection"
    },
    "answer": "イ",
    "explanation": "正解はイ。Strict-Transport-SecurityはHSTSのヘッダである。HTTPSで受信した指示を記憶したブラウザは，有効期間内の対象ホストへのアクセスをHTTPSで行う。",
    "choiceExplanations": {
      "ア": "CSPは読み込めるリソースやスクリプトの実行元などを制限する仕組みである。",
      "イ": "HSTSを設定するヘッダであり，max-ageで指定する期間，HTTPSでアクセスするようブラウザに伝える。",
      "ウ": "MIMEタイプの推測による解釈を抑止するためのヘッダであり，HTTPSへの固定ではない。",
      "エ": "旧来のブラウザのXSSフィルタに関するヘッダであり，HTTPS利用期間の指定ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "VPN",
    "topicTags": [
      "VPN"
    ],
    "difficulty": 3,
    "question": "IPsecに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "ESPのトンネルモードを使用すると，暗号化通信の区間において，エンドツーエンドの通信で用いる元のIPヘッダを含めて暗号化できる。",
      "イ": "IKEはIPsecの鍵交換のためのプロトコルであり，ポート番号80が使用される。",
      "ウ": "暗号化アルゴリズムとして，HMAC-SHA1が使用される。",
      "エ": "ホストAとホストBとの間でIPsecによる通信を行う場合，認証や暗号化アルゴリズムを両者で決めるためにESPヘッダではなくAHヘッダを使用する。"
    },
    "answer": "ア",
    "explanation": "正解はア。ESPのトンネルモードは元のIPヘッダも含めて包み，新たな外側IPヘッダで転送する。暗号化の対象となる元のヘッダと，中継に必要な外側ヘッダを分けて考える。",
    "choiceExplanations": {
      "ア": "トンネルモードでは元のIPパケット全体をESPの内側に入れるため，元のIPヘッダも暗号化の対象にできる。",
      "イ": "IKEは通常UDP 500を使い，NAT越えではUDP 4500も使う。HTTP用の80ではない。",
      "ウ": "HMAC-SHA1はメッセージ認証に用いる方式であり，データを暗号化するアルゴリズムではない。",
      "エ": "認証・暗号化方式などの合意はIKEによるSAの確立で行う。AHヘッダを交渉用に使うわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "TLS",
    "topicTags": [
      "TLS"
    ],
    "difficulty": 3,
    "question": "TLSに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "TLSで使用するWebサーバのディジタル証明書にはIPアドレスの組込みが必須なので，WebサーバのIPアドレスを変更する場合は，ディジタル証明書を再度取得する必要がある。",
      "イ": "TLSで使用する共通鍵の長さは，128ビット未満で任意に指定する。",
      "ウ": "TLSで使用する個人認証用のディジタル証明書は，ICカードにも格納することができ，利用するPCを特定のPCに限定する必要はない。",
      "エ": "TLSはWebサーバと特定の利用者が通信するためのプロトコルであり，Webサーバへの事前の利用者登録が不可欠である。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。クライアント認証用の証明書はICカードにも格納できる。TLSはサーバ認証だけでも使えるため，通信する全利用者の事前登録を必ず要求する仕組みではない。",
    "choiceExplanations": {
      "ア": "DNS名でサーバを識別する証明書もあるため，IPアドレスの組込みが常に必須とはいえない。",
      "イ": "鍵長は利用する暗号方式で定まり，128ビット未満で任意に指定するものではない。",
      "ウ": "ICカードなどに証明書と対応する秘密鍵を保持し，カードを使える複数のPCでクライアント認証を行う構成にできる。",
      "エ": "サーバ認証だけのTLS接続もあり，利用者の事前登録はTLS自体の必須条件ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "無線LAN認証",
    "topicTags": [
      "無線LAN認証"
    ],
    "difficulty": 3,
    "question": "利用者認証情報を管理するサーバ1台と複数のアクセスポイントで構成された無線LAN環境を実現したい。PCが無線LAN環境に接続するときの利用者認証とアクセス制御に，IEEE 802.1XとRADIUSを利用する場合の標準的な方法はどれか。",
    "choices": {
      "ア": "PCにはIEEE 802.1Xのサプリカントを実装し，かつ，RADIUSクライアントの機能をもたせる。",
      "イ": "アクセスポイントにはIEEE 802.1Xのオーセンティケータを実装し，かつ，RADIUSクライアントの機能をもたせる。",
      "ウ": "アクセスポイントにはIEEE 802.1Xのサプリカントを実装し，かつ，RADIUSサーバの機能をもたせる。",
      "エ": "サーバにはIEEE 802.1Xのオーセンティケータを実装し，かつ，RADIUSサーバの機能をもたせる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。PCがサプリカント，アクセスポイントがオーセンティケータ，認証情報を管理するサーバが認証サーバとなる。アクセスポイントからサーバへの認証要求にRADIUSを使う。",
    "choiceExplanations": {
      "ア": "PCはサプリカントだが，RADIUSクライアントとして認証サーバへ要求するのは通常アクセスポイントである。",
      "イ": "アクセスポイントは接続を制御するオーセンティケータであり，RADIUSクライアントとしてサーバに認証を依頼する。",
      "ウ": "アクセスポイントは利用者端末側のサプリカントではなく，接続を制御するオーセンティケータとなる。",
      "エ": "サーバは認証サーバであり，端末の接続を直接制御するオーセンティケータはアクセスポイントである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "ネットワーク冗長化",
    "topicTags": [
      "ネットワーク冗長化"
    ],
    "difficulty": 3,
    "question": "ネットワークインタフェースカード（NIC）のチーミングの説明として，適切なものはどれか。",
    "choices": {
      "ア": "処理能力を超えてフレームを受信する可能性があるとき，一時的に送信の中断を要求し，受信バッファがあふれないようにする。",
      "イ": "接続相手のNICが対応している通信規格又は通信モードの違いを自動的に認識し，最適な速度で通信を行うようにする。",
      "ウ": "ソフトウェアでNICをエミュレートし，1台のコンピュータに搭載している物理NICの数以上のネットワークインタフェースを使用できるようにする。",
      "エ": "一つのIPアドレスに複数のNICを割り当て，負荷分散，帯域の有効活用，及び耐障害性の向上を図る。"
    },
    "answer": "エ",
    "explanation": "正解はエ。NICチーミングは複数のNICをまとめて扱う構成である。帯域の利用効率を高めたり，一方のNICやリンクに障害が生じたときに別の経路で継続したりできる。",
    "choiceExplanations": {
      "ア": "受信側が送信を一時停止させるフロー制御の説明であり，複数NICをまとめるチーミングではない。",
      "イ": "通信速度や全二重・半二重などを調整するオートネゴシエーションの説明である。",
      "ウ": "仮想的なネットワークインタフェースを作る説明であり，物理NICを束ねるチーミングとは異なる。",
      "エ": "複数NICを論理的にまとめ，設定に応じて通信分散や障害時の切替えを行う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "コンピュータ構成",
    "topicTags": [
      "コンピュータ構成"
    ],
    "difficulty": 3,
    "question": "1台のCPUの性能を1とするとき，そのCPUをn台用いたマルチプロセッサの性能Pが，\n\nP＝n／{1＋(n－1)a}\n\nで表されるとする。ここで，aはオーバヘッドを表す定数である。例えば，a＝0.1，n＝4とすると，P≒3なので，4台のCPUから成るマルチプロセッサの性能は約3になる。この式で表されるマルチプロセッサの性能には上限があり，nを幾ら大きくしてもPはある値以上には大きくならない。a＝0.1の場合，Pの上限は幾らか。",
    "choices": {
      "ア": "5",
      "イ": "10",
      "ウ": "15",
      "エ": "20"
    },
    "answer": "イ",
    "explanation": "正解はイ。P＝n／(0.9＋0.1n)＝1／(0.1＋0.9/n)。CPU数nを大きくすると0.9/nが0に近づき，Pは1/0.1＝10に近づく。",
    "choiceExplanations": {
      "ア": "a＝0.1の逆数は10であり，5は与えられた式の極限値ではない。",
      "イ": "分母と分子をnで割るとP＝1／{a＋(1－a)/n}となり，nを大きくすると1/a＝10に近づく。",
      "ウ": "a＝0.1ではP＝1／{0.1＋0.9/n}なので，15へは到達できない。",
      "エ": "nを増やしても正のオーバヘッドaが残るため，上限20にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2018a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "信頼性",
    "topicTags": [
      "信頼性"
    ],
    "difficulty": 3,
    "question": "全国に分散しているシステムを構成する機器の保守に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "故障発生時に遠隔保守を実施することによって駆付け時間が不要になり，MTBFは長くなる。",
      "イ": "故障発生時に行う機器の修理によって，MTBFは長くなる。",
      "ウ": "保守センタを1か所集中から分散配置に変えて駆付け時間を短縮することによって，MTTRは短くなる。",
      "エ": "予防保守を実施することによって，MTTRは短くなる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。MTBFは平均故障間隔，MTTRは平均修復時間である。保守要員が早く到着できれば故障後の停止時間を短縮できるので，MTTRの改善に対応する。",
    "choiceExplanations": {
      "ア": "故障後の駆付け時間の短縮は修復時間に影響する。故障間隔を表すMTBFを直接長くする説明ではない。",
      "イ": "故障した機器の復旧は修理であり，それだけで平均故障間隔が長くなるとはいえない。",
      "ウ": "駆付けに要する時間を短縮すれば，故障から復旧までの平均修復時間MTTRを短くできる。",
      "エ": "予防保守は故障を未然に防ぐための活動であり，故障後の修復時間が短くなるとは限らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2018a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "システム開発",
    "topicTags": [
      "システム開発"
    ],
    "difficulty": 3,
    "question": "ソフトウェアのリファクタリングの説明はどれか。",
    "choices": {
      "ア": "外部から見た振る舞いを変更せずに保守性が高いプログラムに書き直す。",
      "イ": "ソースコードから設計書を再作成する。",
      "ウ": "ソフトウェア部品を組み合わせてシステムを開発する。",
      "エ": "プログラムの修正が他の部分に影響していないかどうかをテストする。"
    },
    "answer": "ア",
    "explanation": "正解はア。リファクタリングでは外から見える動作を保ちながら，重複の除去や責務の整理などで内部構造を改善する。変更の前後で同じ振る舞いを保てるか，テストで確かめる。",
    "choiceExplanations": {
      "ア": "外部仕様を保ったまま内部構造を改善し，読みやすさや変更のしやすさを高める。",
      "イ": "ソースコードから設計情報を取り出すのはリバースエンジニアリングの説明である。",
      "ウ": "既存の部品を組み合わせる開発の説明であり，既存コードの内部構造改善ではない。",
      "エ": "変更で既存機能が壊れていないか確認するのは回帰テストの説明である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
