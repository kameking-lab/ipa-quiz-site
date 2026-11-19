// IPA公式冊子から転記。原典・照合記録: ../2019-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2019_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2019a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "VPN",
    "topicTags": [
      "VPN"
    ],
    "difficulty": 3,
    "question": "ネットワーク層のパケットを対象としてIPパケットでカプセル化し，トンネリングを行えるプロトコルはどれか。",
    "choices": {
      "ア": "IPsec",
      "イ": "L2TP",
      "ウ": "PPTP",
      "エ": "RSTP"
    },
    "answer": "ア",
    "explanation": "正解はア。IPsecのトンネルモードは，元のIPパケットを内側に保持して，新しいIPヘッダでカプセル化する。トンネルの入口と出口の間で元の通信を運べる。",
    "choiceExplanations": {
      "ア": "トンネルモードでは元のIPパケット全体を包み，外側に新しいIPヘッダを付けて転送する。",
      "イ": "L2TPはPPPなどのデータリンク層のフレームを運ぶトンネルを作る。設問はネットワーク層のIPパケットが対象である。",
      "ウ": "PPTPはPPPフレームをトンネルで運ぶ方式であり，設問のネットワーク層を対象とする方式とは異なる。",
      "エ": "RSTPはスイッチ間のループを防いで経路を切り替える仕組みであり，IPトンネルを作らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 3,
    "question": "図は，OSPFを使用するルータa～iのネットワーク構成を示す。拠点1と拠点3の間の通信はWAN1を，拠点2と拠点3の間の通信はWAN2を通過するようにしたい。xとyに設定するコストとして，適切な組合せはどれか。ここで，図中の数字はOSPFコストを示す。",
    "choices": {
      "ア": "x：20，y：20",
      "イ": "x：30，y：30",
      "ウ": "x：40，y：40",
      "エ": "x：50，y：50"
    },
    "answer": "イ",
    "explanation": "正解はイ。OSPFは経路上のコストの合計が小さい経路を選ぶ。eからiへの最小コストは40，gからiへはmin(x，y)＋10である。拠点1にはmin(x，y)＞20，拠点2にはmin(x，y)＜40が必要なので，候補では30と30が適切である。",
    "choiceExplanations": {
      "ア": "拠点1ではWAN1経由が30＋100＋30＋10＝170，WAN2経由も40＋100＋20＋10＝170となり，WAN1に限定できない。",
      "イ": "拠点1のWAN1経由は170でWAN2経由180より小さい。拠点2のWAN2経由は180でWAN1経由190より小さく，両条件を満たす。",
      "ウ": "拠点2ではWAN1経由もWAN2経由も190となる。同一コストになり，WAN2だけを選ぶ条件を満たさない。",
      "エ": "拠点2ではWAN1経由が190，WAN2経由が200となり，希望するWAN2よりWAN1が選ばれる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/nw/2019-autumn-am2-q2.png"
    ],
    "imageAltTexts": [
      "拠点1―a，拠点2―c，拠点3―i。a-b：30，a-d：40，c-b：50，c-d：40，b-e（WAN1）：100，d-g（WAN2）：100，e-f：40，e-h：30，g-f：x，g-h：y，f-i：10，h-i：10。"
    ]
  },
  {
    "id": "nw-2019a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 3,
    "question": "二つのルーティングプロトコルRIP-2とOSPFを比較したとき，OSPFだけに当てはまる特徴はどれか。",
    "choices": {
      "ア": "可変長サブネットマスクに対応している。",
      "イ": "リンク状態のデータベースを使用している。",
      "ウ": "ルーティング情報の更新にマルチキャストを使用している。",
      "エ": "ルーティング情報の更新を30秒ごとに行う。"
    },
    "answer": "イ",
    "explanation": "正解はイ。RIP-2は距離ベクトル型，OSPFはリンクステート型である。OSPFではルータがリンク状態データベースを共有し，そこから経路を計算する。",
    "choiceExplanations": {
      "ア": "RIP-2も経路情報にサブネットマスクを含めるため，可変長サブネットマスクに対応できる。",
      "イ": "OSPFはリンク状態を共有してデータベースを構築し，最短経路を計算するリンクステート型である。",
      "ウ": "RIP-2もマルチキャストを利用するため，OSPFだけの特徴ではない。",
      "エ": "30秒を基本周期とする経路情報の定期更新はRIPの特徴であり，OSPF固有の動作ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "LAN",
    "topicTags": [
      "LAN"
    ],
    "difficulty": 3,
    "question": "スパニングツリープロトコルに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "OSI基本参照モデルにおけるネットワーク層のプロトコルである。",
      "イ": "ブリッジ間に複数経路がある場合，同時にフレーム転送することを可能にするプロトコルである。",
      "ウ": "ブロードキャストフレームを，ブリッジ間で転送しない利点がある。",
      "エ": "ルートブリッジの決定には，ブリッジの優先順位とMACアドレスが使用される。"
    },
    "answer": "エ",
    "explanation": "正解はエ。STPはブリッジIDを使ってルートブリッジを選び，ルートへ向かう木構造の転送経路を作る。冗長配線を残しつつ，通常の転送経路でループが生じないようにする。",
    "choiceExplanations": {
      "ア": "ブリッジが扱うデータリンク層の制御であり，ネットワーク層の経路制御ではない。",
      "イ": "冗長経路の一部を転送しない状態にし，フレームが循環するループを防ぐ。全経路で同時転送する仕組みではない。",
      "ウ": "ブロードキャストを一律に遮断するのではなく，ループのない有効な経路上では転送する。",
      "エ": "優先順位とMACアドレスを含むブリッジIDを比較し，最小のIDをもつブリッジをルートに選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 3,
    "question": "ルーティングプロトコルであるBGP-4の説明として，適切なものはどれか。",
    "choices": {
      "ア": "自律システム間で，経路情報に付加されたパス属性を使用し，ポリシーに基づいて経路を選択するパスベクタ方式のプロトコルである。",
      "イ": "全てのノードが同一のリンク状態データベースを用い，コストが最小となる経路を最適経路とするプロトコルである。",
      "ウ": "到達可能な宛先アドレスまでのホップ数が最小となる経路を，最適経路とするプロトコルである。",
      "エ": "パケットが転送される経路のノードを，送信元ノードが明示的に指定するプロトコルである。"
    },
    "answer": "ア",
    "explanation": "正解はア。BGP-4は自律システム間の経路交換に使う。AS_PATHをはじめとする属性を基に，単純な最短距離だけでなく経路の受入れ・優先などのポリシーを反映する。",
    "choiceExplanations": {
      "ア": "BGPはAS_PATHなどのパス属性を運び，運用者の経路選択ポリシーを反映できる。",
      "イ": "リンク状態データベースと最短経路計算を使うのはOSPFなどのリンクステート型の説明である。",
      "ウ": "ホップ数を経路選択の尺度にするのはRIPの説明であり，BGPはホップ数だけで経路を選ばない。",
      "エ": "送信元が中継ノード列を指定するソースルーティングの説明であり，BGPの経路交換とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "TCP/IP",
    "topicTags": [
      "TCP/IP"
    ],
    "difficulty": 3,
    "question": "IPv4のアドレス割当てを行う際に，クラスA～Cといった区分にとらわれずに，ネットワークアドレス部とホストアドレス部を任意のブロック単位に区切り，IPアドレスを無駄なく効率的に割り当てる方式はどれか。",
    "choices": {
      "ア": "CIDR",
      "イ": "DHCP",
      "ウ": "DNS",
      "エ": "NAPT"
    },
    "answer": "ア",
    "explanation": "正解はア。CIDRはクラスに代えてプレフィックス長を用いる。例えば/24は先頭24ビットをネットワーク部分として扱い，必要なアドレス数に応じて範囲を設計できる。",
    "choiceExplanations": {
      "ア": "プレフィックス長でアドレス範囲を表し，従来のクラスに縛られずに割り当てる方式である。",
      "イ": "DHCPは端末にアドレスや設定情報を配布する仕組みであり，クラスによらない割当て方式の名称ではない。",
      "ウ": "DNSはドメイン名に対応する情報を検索する仕組みであり，アドレス範囲の区切り方ではない。",
      "エ": "NAPTはアドレスとポート番号を変換して通信を多重化する仕組みである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "TCP/IP",
    "topicTags": [
      "TCP/IP"
    ],
    "difficulty": 3,
    "question": "DHCPを用いるネットワーク構成において，DHCPリレーエージェントが必要になるのは，ネットワーク間がどの機器で接続されている場合か。",
    "choices": {
      "ア": "スイッチングハブ",
      "イ": "ブリッジ",
      "ウ": "リピータ",
      "エ": "ルータ"
    },
    "answer": "エ",
    "explanation": "正解はエ。アドレス取得開始時のDHCP要求はブロードキャストを使う。サーバがルータの先にある場合，リレーエージェントが要求をサーバへ中継する。",
    "choiceExplanations": {
      "ア": "通常のスイッチングハブは同じブロードキャストドメイン内でフレームを転送する。",
      "イ": "ブリッジはデータリンク層で接続し，同一ブロードキャストドメインのDHCP要求を転送できる。",
      "ウ": "リピータは信号を中継するため，IPネットワーク境界を越えるためのリレー処理は行わない。",
      "エ": "ルータは通常IPブロードキャストを別ネットワークへ転送しないため，別ネットワークのDHCPサーバへの中継が必要になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "DNS",
    "topicTags": [
      "DNS"
    ],
    "difficulty": 3,
    "question": "DNSゾーンデータファイルのNSレコードに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "先頭フィールドには，ネームサーバのホスト名を記述する。",
      "イ": "ゾーン分割を行ってサブドメインに権限委譲する場合は，そのネームサーバをNSレコードで指定する。",
      "ウ": "データ部（RDATA）には，ゾーンのドメイン名を記述する。",
      "エ": "データ部（RDATA）には，ネームサーバの正規のホスト名と別名のいずれも記述できる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。NSレコードは，対象ドメインの権威ネームサーバを指定する。親から子へゾーンの管理権限を委譲する場面でも使われる。",
    "choiceExplanations": {
      "ア": "先頭の所有者名はゾーンなどのドメイン名であり，ネームサーバ名はRDATAに記す。",
      "イ": "親ゾーンに委譲先の権威ネームサーバをNSレコードとして記載し，子ゾーンへの問い合わせにつなげる。",
      "ウ": "RDATAに記すのはそのドメインを担当するネームサーバのドメイン名である。",
      "エ": "NSレコードの参照先には正規名を使い，CNAMEによる別名を指定しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "電子メール",
    "topicTags": [
      "電子メール"
    ],
    "difficulty": 3,
    "question": "SMTP（ESMTPを含む）のセッション開始を表すコマンドはどれか。",
    "choices": {
      "ア": "DATA",
      "イ": "EHLO",
      "ウ": "MAIL",
      "エ": "RCPT"
    },
    "answer": "イ",
    "explanation": "正解はイ。ESMTPでは接続後にEHLOであいさつし，利用可能な拡張機能を確認する。その後，MAIL，RCPT，DATAでメールを転送する。",
    "choiceExplanations": {
      "ア": "DATAはメッセージ本文の転送を開始するコマンドであり，セッション開始のあいさつではない。",
      "イ": "EHLOは拡張SMTPのあいさつであり，クライアントの識別とサーバの拡張機能の確認を行う。",
      "ウ": "MAILはメールトランザクションを開始して送信者を指定する。EHLOの後に使う。",
      "エ": "RCPTはメッセージの受信者を指定するコマンドである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "ネットワーク冗長化",
    "topicTags": [
      "ネットワーク冗長化"
    ],
    "difficulty": 3,
    "question": "IPネットワークにおいて，クライアントの設定を変えることなくデフォルトゲートウェイの障害を回避するために用いられるプロトコルはどれか。",
    "choices": {
      "ア": "RARP",
      "イ": "RSTP",
      "ウ": "RTSP",
      "エ": "VRRP"
    },
    "answer": "エ",
    "explanation": "正解はエ。VRRPで共通の仮想IPアドレスをデフォルトゲートウェイに設定しておけば，担当ルータが故障しても別ルータが引き継ぐため，端末の設定変更を避けられる。",
    "choiceExplanations": {
      "ア": "RARPはMACアドレスを基にIPアドレスを得るための仕組みで，ゲートウェイ冗長化ではない。",
      "イ": "RSTPはブリッジの冗長経路を制御する。端末のデフォルトゲートウェイを仮想化する機能ではない。",
      "ウ": "RTSPはストリーミング配信の再生などを制御するプロトコルである。",
      "エ": "複数ルータで仮想ルータを構成し，同じ仮想IPアドレスを使ったまま担当ルータを切り替える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "通信制御",
    "topicTags": [
      "通信制御"
    ],
    "difficulty": 3,
    "question": "ネットワークの制御に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "TCPでは，ウィンドウサイズが固定で輻輳回避ができないので，輻輳が起きると，データに対してタイムアウト処理が必要になる。",
      "イ": "誤り制御方式の一つであるフォワード誤り訂正方式は，受信側で誤りを検出し，送信側にデータの再送を要求する方式である。",
      "ウ": "ウィンドウによるフロー制御では，応答確認があったブロック数だけウィンドウをずらすことによって，複数のデータをまとめて送ることができる。",
      "エ": "データグラム方式では，両端を結ぶ仮想の通信路を確立し，以降は全てその経路を通すことによって，経路選択のオーバヘッドを小さくしている。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。スライディングウィンドウでは，確認応答を受けるたびに窓を進め，未確認データの量を制限しながら連続送信できる。",
    "choiceExplanations": {
      "ア": "TCPの送信量は固定ではなく，受信ウィンドウや輻輳ウィンドウによって調整される。",
      "イ": "再送を要求する方式はARQである。フォワード誤り訂正は付加された冗長情報で受信側が誤りを訂正する。",
      "ウ": "確認済みの範囲だけ送信可能な窓を進めることで，個々のデータごとに応答を待たず連続送信できる。",
      "エ": "仮想通信路を確立するのは仮想回線方式である。データグラム方式は各パケットを独立に転送する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "SDN",
    "topicTags": [
      "SDN"
    ],
    "difficulty": 3,
    "question": "OpenFlowプロトコルを使用するSDN（Software-Defined Networking）において，コントローラとOpenFlowスイッチ間の通信に関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "オーバヘッドを避けるためにUDPやTCPは使用せずIPを直接使用する。",
      "イ": "信頼性や安全性を確保するためにTCPやTLSを使用する。",
      "ウ": "パラレル伝送を行うためにSANで利用されるファイバチャネル上のSCSIを使用する。",
      "エ": "リアルタイム性に関する要求を満たすためにUDPを使用する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。OpenFlowはコントローラとスイッチの間でフロー設定や状態情報を交換する。制御チャネルにはTCPやTLSを利用する。",
    "choiceExplanations": {
      "ア": "OpenFlowの制御通信はIPを直接使う独自転送ではなく，TCPなどを使ったチャネルを通す。",
      "イ": "TCPの信頼性と，必要に応じてTLSの認証・暗号化を使い，制御メッセージを交換する。",
      "ウ": "ファイバチャネル上のSCSIはストレージ接続の技術であり，OpenFlowの制御チャネルではない。",
      "エ": "UDPで遅延だけを優先する方式ではなく，制御情報を確実に交換するためTCPやTLSを使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "アプリケーションプロトコル",
    "topicTags": [
      "アプリケーションプロトコル"
    ],
    "difficulty": 3,
    "question": "FTPを使ったファイル転送でクライアントが使用するコマンドのうち，データ転送用コネクションをクライアント側から接続するために，サーバ側のデータ転送ポートを要求するものはどれか。",
    "choices": {
      "ア": "ACCT",
      "イ": "MODE",
      "ウ": "PASV",
      "エ": "PORT"
    },
    "answer": "ウ",
    "explanation": "正解はウ。パッシブモードではクライアントがPASVを送り，サーバの待受けポートを取得する。制御接続とは別に，クライアントからそのポートへデータ接続する。",
    "choiceExplanations": {
      "ア": "ACCTはアカウントに関する情報を送るコマンドで，データ接続先ポートの要求ではない。",
      "イ": "MODEはデータの転送モードを指定するコマンドである。",
      "ウ": "PASVでサーバに待受けを要求し，応答されたサーバのアドレスとポートへクライアントが接続する。",
      "エ": "PORTはクライアント側の接続先をサーバへ知らせ，サーバ側からデータ接続させる方式で使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "Web",
    "topicTags": [
      "Web"
    ],
    "difficulty": 3,
    "question": "HTTPを使って，Webサーバのコンテンツのアップロードや更新を可能にするプロトコルはどれか。",
    "choices": {
      "ア": "CSS",
      "イ": "MIME",
      "ウ": "SSL",
      "エ": "WebDAV"
    },
    "answer": "エ",
    "explanation": "正解はエ。WebDAVはHTTP上でサーバのリソースを共同編集・管理するための拡張である。コンテンツの更新に加え，プロパティやロックを扱う。",
    "choiceExplanations": {
      "ア": "CSSはWebページの表示スタイルを記述する言語であり，サーバ上のファイル更新プロトコルではない。",
      "イ": "MIMEは本文の形式や添付データなどを表現する仕組みであり，ファイル操作の拡張ではない。",
      "ウ": "SSLは通信の暗号化などを担う。コンテンツ管理の操作をHTTPに追加するものではない。",
      "エ": "HTTPを拡張してリソースの作成・更新，プロパティ管理やロックなどを扱えるようにする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "無線通信",
    "topicTags": [
      "無線通信"
    ],
    "difficulty": 3,
    "question": "IoT向けの省電力の無線機器で使用される無線通信に関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "BLE（Bluetooth Low Energy）は従来のBluetoothとの互換性を維持しながら，低消費電力での動作を可能にするために5GHz帯を使用する拡張がされている。",
      "イ": "IEEE 802.11acではIoT向けに920MHz帯が割り当てられている。",
      "ウ": "Wi-SUNではマルチホップを使用して500mを超える通信が可能である。",
      "エ": "ZigBeeでは一つの親ノードに対して最大7個の子ノードをスター型に配置したネットワークを使用する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。Wi-SUNでは複数ノードを経由して通信でき，マルチホップで到達範囲を広げられる。周波数帯とネットワーク構造を各方式で取り違えないことがポイントである。",
    "choiceExplanations": {
      "ア": "BLEは2.4GHz帯を使う。5GHz帯への拡張によって省電力化したという説明は誤りである。",
      "イ": "IEEE 802.11acが使用するのは5GHz帯であり，920MHz帯ではない。",
      "ウ": "中継ノードを経由するマルチホップによって，単一リンクより広い範囲をカバーできる。",
      "エ": "親に最大7台という説明はBluetoothのピコネットに対応する。ZigBeeはスター型だけでなくメッシュ型なども扱う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "セキュリティ",
    "topicTags": [
      "セキュリティ"
    ],
    "difficulty": 3,
    "question": "SSL/TLSのダウングレード攻撃に該当するものはどれか。",
    "choices": {
      "ア": "暗号化通信が確立された後に，暗号鍵候補を総当たりで試すことによって暗号化されたデータを解読する。",
      "イ": "暗号化通信中にクライアントPCからサーバに送信するデータを操作して，強制的にサーバのディジタル証明書を失効させる。",
      "ウ": "暗号化通信中にサーバからクライアントPCに送信するデータを操作して，クライアントPCのWebブラウザを古いバージョンのものにする。",
      "エ": "暗号化通信を確立するとき，弱い暗号スイートの使用を強制することによって，解読しやすい暗号化通信を行わせる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ダウングレード攻撃は，双方がより安全な方式を使えるにもかかわらず，古い方式や弱い暗号で接続するよう誘導する。通信確立後の総当たりとは区別する。",
    "choiceExplanations": {
      "ア": "鍵候補を順に試す総当たり攻撃の説明であり，ネゴシエーションの安全性を引き下げる攻撃ではない。",
      "イ": "証明書の失効は発行者の管理手続や失効情報による。通信内容の変更で強制失効させるという説明ではない。",
      "ウ": "ブラウザソフト自体を古くする意味ではなく，接続で選ぶプロトコルや暗号の強度を低下させる攻撃である。",
      "エ": "接続確立時の選択に干渉し，弱い暗号などを利用させることがダウングレード攻撃に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "Webセキュリティ",
    "topicTags": [
      "Webセキュリティ"
    ],
    "difficulty": 3,
    "question": "CookieにSecure属性を設定しなかったときと比較した，設定したときの動作として，適切なものはどれか。",
    "choices": {
      "ア": "Cookieに設定された有効期間を過ぎると，Cookieが無効化される。",
      "イ": "JavaScriptによるCookieの読出しが禁止される。",
      "ウ": "URL内のスキームがhttpsのときだけ，WebブラウザからCookieが送出される。",
      "エ": "WebブラウザがアクセスするURL内のパスとCookieに設定されたパスのプレフィックスが一致するときだけ，WebブラウザからCookieが送出される。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。SecureはCookieの送出をHTTPSの通信に制限する属性である。スクリプトからの読出しを制限したい場合はHttpOnlyも別に考える。",
    "choiceExplanations": {
      "ア": "有効期間はExpiresやMax-Ageによる制御であり，Secure属性の有無とは別である。",
      "イ": "JavaScriptからの読出しを制限する属性はHttpOnlyであり，Secureとは異なる。",
      "ウ": "Secure属性は，Cookieを安全な通信路でだけ送るようにする。設問ではHTTPSの場合に送出する。",
      "エ": "送出対象のパスの範囲はPath属性の役割であり，Secure属性の役割ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "セキュリティ",
    "topicTags": [
      "セキュリティ"
    ],
    "difficulty": 3,
    "question": "送信元IPアドレスがA，送信元ポート番号が80/tcpのSYN/ACKパケットを，未使用のIPアドレス空間であるダークネットにおいて大量に観測した場合，推定できる攻撃はどれか。",
    "choices": {
      "ア": "IPアドレスAを攻撃先とするサービス妨害攻撃",
      "イ": "IPアドレスAを攻撃先とするパスワードリスト攻撃",
      "ウ": "IPアドレスAを攻撃元とするサービス妨害攻撃",
      "エ": "IPアドレスAを攻撃元とするパスワードリスト攻撃"
    },
    "answer": "ア",
    "explanation": "正解はア。送信元を詐称した大量のSYNがAへ届くと，AのSYN/ACKは詐称されたアドレスへ返る。未使用アドレスに届くこの応答はバック散乱として観測され，AへのSYNフラッドなどが推定できる。",
    "choiceExplanations": {
      "ア": "Aが受け取ったSYNの送信元を攻撃者が詐称していたため，AからのSYN/ACK応答が未使用アドレスへ返ったと考えられる。",
      "イ": "パスワードリスト攻撃にはログイン試行の観測が必要であり，SYN/ACKだけではその根拠にならない。",
      "ウ": "SYN/ACKの送信元Aは応答している側と推定する。観測された送信元をそのまま攻撃元とは判断しない。",
      "エ": "SYN/ACKはTCP接続確立の応答であり，Aからのパスワード試行を示す情報ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "セキュリティ",
    "topicTags": [
      "セキュリティ"
    ],
    "difficulty": 3,
    "question": "脆弱性検査で，対象ホストに対してポートスキャンを行った。対象ポートの状態を判定する方法のうち，適切なものはどれか。",
    "choices": {
      "ア": "対象ポートにSYNパケットを送信し，対象ホストから“RST/ACK”パケットを受信するとき，接続要求が許可されたと判定する。",
      "イ": "対象ポートにSYNパケットを送信し，対象ホストから“SYN/ACK”パケットを受信するとき，接続要求が中断又は拒否されたと判定する。",
      "ウ": "対象ポートにUDPパケットを送信し，対象ホストからメッセージ“ICMP port unreachable”を受信するとき，対象ポートが閉じていると判定する。",
      "エ": "対象ポートにUDPパケットを送信し，対象ホストからメッセージ“ICMP port unreachable”を受信するとき，対象ポートが開いていると判定する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。UDPにはTCPのような接続確立手順がないため，ICMPのエラー応答が手掛かりになる。無応答だけでは，開放されているのかフィルタで破棄されたのか区別できない場合もある。",
    "choiceExplanations": {
      "ア": "SYNへのRST/ACKは通常接続拒否を示す。接続要求を受け入れる応答ではない。",
      "イ": "SYN/ACKはTCP接続確立の応答であり，対象ポートが接続を受け入れられることを示す。",
      "ウ": "UDPの宛先ポートに対応する受信先がない場合，ICMPのport unreachableが返るため，閉じていると判定できる。",
      "エ": "port unreachableは宛先ポートへ届けられないという応答であり，開いていることを示さない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "セキュリティ",
    "topicTags": [
      "セキュリティ"
    ],
    "difficulty": 3,
    "question": "ルートキットの特徴はどれか。",
    "choices": {
      "ア": "OSなどに不正に組み込んだツールを隠蔽する。",
      "イ": "OSの中核であるカーネル部分の脆弱性を分析する。",
      "ウ": "コンピュータがウイルスやワームに感染していないことをチェックする。",
      "エ": "コンピュータやルータのアクセス可能な通信ポートを外部から調査する。"
    },
    "answer": "ア",
    "explanation": "正解はア。ルートキットは侵入の痕跡や不正ツールを隠すために使われる。OSの機能に介入するなどして，通常の確認操作で不正な活動を見つけにくくする。",
    "choiceExplanations": {
      "ア": "プロセスやファイル，通信などを見えにくくし，侵入後に不正なツールや活動の発見を妨げる。",
      "イ": "カーネルの脆弱性分析は検査や研究の作業であり，不正ツールの隠蔽というルートキットの特徴とは異なる。",
      "ウ": "感染をチェックするのはマルウェア対策製品などの機能であり，ルートキットは検知を回避する側である。",
      "エ": "外部から通信ポートを調べるのはポートスキャンであり，ルートキット固有の機能ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "DNSセキュリティ",
    "topicTags": [
      "DNSセキュリティ"
    ],
    "difficulty": 3,
    "question": "DNSの再帰的な問合せを使ったサービス妨害攻撃（DNSリフレクタ攻撃）の踏み台にされることを防止する対策はどれか。",
    "choices": {
      "ア": "DNSサーバをキャッシュサーバとコンテンツサーバに分離し，インターネット側からキャッシュサーバに問合せできないようにする。",
      "イ": "問合せがあったドメインに関する情報をWhoisデータベースで確認してからキャッシュサーバに登録する。",
      "ウ": "一つのDNSレコードに複数サーバのIPアドレスを割り当て，サーバへのアクセスを振り分けて分散させるように設定する。",
      "エ": "ほかのDNSサーバから送られてくるIPアドレスとホスト名の対応情報の信頼性を，ディジタル署名で確認するように設定する。"
    },
    "answer": "ア",
    "explanation": "正解はア。再帰問い合わせを誰からでも受け付けるDNSサーバは，送信元を詐称した問い合わせへの応答で攻撃に加担し得る。権威サーバと役割を分け，再帰サービスの利用元を制限する。",
    "choiceExplanations": {
      "ア": "再帰問い合わせを内部などの許可した利用者だけに制限することで，外部の攻撃者が反射先として使うことを防ぐ。",
      "イ": "Whoisは登録情報を確認するものであり，不特定の第三者による再帰問い合わせを止めない。",
      "ウ": "アクセス分散は負荷を分ける対策であり，公開再帰サーバの悪用を防ぐものではない。",
      "エ": "DNSSECによるデータの真正性確認は改ざん対策であり，再帰問い合わせの利用元制限とは別である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "コンピュータ構成",
    "topicTags": [
      "コンピュータ構成"
    ],
    "difficulty": 3,
    "question": "図はプロセッサによってフェッチされた命令の格納順序を表している。aに該当するプロセッサの構成要素はどれか。",
    "choices": {
      "ア": "アキュムレータ",
      "イ": "データキャッシュ",
      "ウ": "プログラムレジスタ（プログラムカウンタ）",
      "エ": "命令レジスタ"
    },
    "answer": "エ",
    "explanation": "正解はエ。命令フェッチではプログラムカウンタを基に主記憶から命令を読み出し，命令レジスタに格納する。命令デコーダはその内容を解読する。",
    "choiceExplanations": {
      "ア": "アキュムレータは演算のオペランドや結果を保持する。命令デコーダへ渡す命令の格納先ではない。",
      "イ": "データキャッシュは主にデータへのアクセスを高速化する。図の命令デコーダ直前の構成要素ではない。",
      "ウ": "プログラムカウンタは次に実行する命令のアドレスを保持し，フェッチ済み命令そのものは保持しない。",
      "エ": "主記憶から読み出した命令を保持し，命令デコーダへ渡すのが命令レジスタである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2019-autumn-am2-q22.png"
    ],
    "imageAltTexts": [
      "主記憶からプロセッサ内部のaへ，aから命令デコーダへ順に矢印がつながる。"
    ]
  },
  {
    "id": "nw-2019a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "システム構成",
    "topicTags": [
      "システム構成"
    ],
    "difficulty": 3,
    "question": "ピアツーピアシステムの特徴として，適切なものはどれか。",
    "choices": {
      "ア": "アカウントの管理やセキュリティの管理をすることが難しく，不特定多数の利用者が匿名で接続利用できるなどの隠匿性が高い。",
      "イ": "サービスの提供や管理を特定のコンピュータが行い，他のコンピュータはそのサービスを利用するという，役割分担を明確にしたシステムを簡単に作成できる。",
      "ウ": "システム利用者の拡大に伴い，データアクセスの負荷がシステム全体を監視するコンピュータに集中するために，高性能なコンピュータが必要である。",
      "エ": "目的のデータの存在場所が明確なので，高速なデータ検索や，目的とするデータの更新や削除も容易である。"
    },
    "answer": "ア",
    "explanation": "正解はア。ピアツーピアでは各参加端末がサービスの提供側にも利用側にもなる。集中管理しにくい点を問う選択肢である。匿名性は全てのP2P方式に必須の性質ではなく，認証を設けた構成も可能である。",
    "choiceExplanations": {
      "ア": "各端末が対等に参加するため，集中管理型と比べてアカウントやセキュリティの統一管理が難しい。匿名参加できる構成についての記述が本問の正答である。",
      "イ": "専用の提供側と利用側に役割を分けるのはクライアントサーバ型の説明である。",
      "ウ": "ピア間で資源を提供し合う構成なので，全アクセスが中央の監視コンピュータへ集中することは前提でない。",
      "エ": "データが各ピアに分散するため，存在場所の探索や整合性管理が必要になる。常に検索や更新が容易とはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "システム開発",
    "topicTags": [
      "システム開発"
    ],
    "difficulty": 3,
    "question": "UMLのユースケース図の説明はどれか。",
    "choices": {
      "ア": "外部からのトリガに応じて，オブジェクトの状態がどのように遷移するかを表現する。",
      "イ": "クラスと関連から構成され，システムの静的な構造を表現する。",
      "ウ": "システムとアクタの相互作用を表現する。",
      "エ": "データの流れに注目してシステムの機能を表現する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ユースケース図は，利用者や外部システムなどのアクタが，対象システムのどの機能を利用するかを表す。内部のクラス構造や状態の変化を表す図とは目的が異なる。",
    "choiceExplanations": {
      "ア": "状態とイベントによる遷移を表すのはステートマシン図の説明である。",
      "イ": "クラスとその関連で静的な構造を示すのはクラス図の説明である。",
      "ウ": "システムの外にいるアクタと，システムが提供するユースケースとの関係を表す。",
      "エ": "データの流れを中心に機能を表すのはデータフロー図の説明であり，ユースケース図ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2019a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "著作権保護技術",
    "topicTags": [
      "著作権保護技術"
    ],
    "difficulty": 3,
    "question": "SDメモリカードに使用される著作権保護技術はどれか。",
    "choices": {
      "ア": "CPPM（Content Protection for Pre-Recorded Media）",
      "イ": "CPRM（Content Protection for Recordable Media）",
      "ウ": "DTCP（Digital Transmission Content Protection）",
      "エ": "HDCP（High-bandwidth Digital Content Protection）"
    },
    "answer": "イ",
    "explanation": "正解はイ。CPRMは記録可能な媒体でコンテンツを保護する技術で，SDメモリカードにも用いられる。媒体への記録を保護する方式と，機器間の伝送を保護する方式を区別する。",
    "choiceExplanations": {
      "ア": "CPPMはあらかじめ記録された媒体向けの保護方式であり，SDメモリカード向けの選択肢ではない。",
      "イ": "記録可能な媒体向けの保護技術であり，本問ではSDメモリカードに対応する。",
      "ウ": "DTCPはデジタル機器間のコンテンツ伝送を保護する技術である。",
      "エ": "HDCPは映像などのデジタル伝送路でコンテンツを保護する技術である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
