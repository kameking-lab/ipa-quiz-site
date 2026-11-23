// IPA公式冊子から転記。原典・照合記録: ../2014-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2014_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2014a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "IPv6",
    "topicTags": [
      "IPv6"
    ],
    "difficulty": 3,
    "question": "IPv6が利用できるネットワークに接続したPCにおいて，二つのIPv6アドレスが割り当てられていた。\n\n(1) 2001:db8::b083:ba94:60c7:7c36\n(2) fe80::200:c0ff:fea8:2\n\nこのうち，(2)はリンクローカルユニキャストアドレスである。この説明として適切なものはどれか。",
    "choices": {
      "ア": "下位のビットにこのPCのIPv4アドレスを埋め込み，IPv6アドレスとIPv4アドレスを関連付けて管理を容易にするアドレスである。",
      "イ": "グローバルユニキャストアドレスが取得できなかったときだけに有効なアドレスである。",
      "ウ": "このアドレスを使った場合，パケットはネットワークには送信されず，自分自身のPC内で動作しているプログラムとだけ通信できる。",
      "エ": "このアドレスをもつネットワークインタフェースからルータを介さずに直接接続できる相手との通信にだけ使用できるアドレスである。"
    },
    "answer": "エ",
    "explanation": "正解はエ。リンクローカルアドレスの有効範囲は同一リンク内であり，ルータを越えて転送する通信には使わない。",
    "choiceExplanations": {
      "ア": "リンクローカルアドレスはIPv4アドレスとの対応を埋め込むためのアドレスではなく，同一リンク内の通信に使う。",
      "イ": "グローバルアドレスと併存できる。グローバルアドレスを取得できない場合だけに限定されない。",
      "ウ": "自分自身との通信だけに使うのはループバックアドレスであり，リンクローカルとは範囲が異なる。",
      "エ": "ルータを介さず到達できる同一リンク内の相手との通信に使う，というスコープの説明に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "伝送技術",
    "topicTags": [
      "伝送技術"
    ],
    "difficulty": 3,
    "question": "通信技術の一つであるPLCの説明として，適切なものはどれか。",
    "choices": {
      "ア": "音声データをIPネットワークで伝送する技術",
      "イ": "電力線を通信回線として利用する技術",
      "ウ": "無線LANの標準規格であるIEEE 802.11シリーズの総称",
      "エ": "無線通信における暗号化技術"
    },
    "answer": "イ",
    "explanation": "正解はイ。PLCはPower Line Communicationの略で，電力線をデータ通信の伝送路として利用する。",
    "choiceExplanations": {
      "ア": "IPネットワークで音声を伝える技術はVoIPであり，電力線を利用するPLCの定義とは異なる。",
      "イ": "PLCは電力線通信を意味し，電力を供給する配線を通信にも利用する技術である。",
      "ウ": "IEEE 802.11シリーズは無線LANの規格であり，電力線を伝送路にするPLCとは異なる。",
      "エ": "PLCは伝送路を表す技術であり，無線通信の暗号化方式の名称ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "トラフィック理論",
    "topicTags": [
      "トラフィック理論"
    ],
    "difficulty": 3,
    "question": "180台の電話機のトラフィックを調べたところ，電話機1台当たりの呼の発生頻度（発着呼の合計）は3分に1回，平均回線保留時間は80秒であった。このときの呼量は何アーランか。",
    "choices": {
      "ア": "4",
      "イ": "12",
      "ウ": "45",
      "エ": "80"
    },
    "answer": "エ",
    "explanation": "正解はエ。全体の呼の発生頻度は180台÷180秒＝1回/秒。平均保留時間80秒を掛けると，呼量は80アーランになる。",
    "choiceExplanations": {
      "ア": "呼量は呼の発生頻度と平均保留時間の積であり，180台分を計算すると4にはならない。",
      "イ": "3分を180秒にそろえて計算する。180÷180×80＝80であり，12ではない。",
      "ウ": "発着呼の合計頻度が既に与えられている。全体で毎秒1回の呼に80秒を掛ける。",
      "エ": "180台×1回/180秒×80秒＝80アーラン。発着呼を改めて2倍にする必要はない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2014a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 4,
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
      "エ": "マルチキャストパケットは，ネットワーク上の全てのホストによって受信され，IPより上位の層で，必要なデータか否かが判断される。"
    },
    "answer": "イ",
    "explanation": "正解はイ。IPv4のクラスD，224.0.0.0/4がマルチキャスト用のアドレス範囲である。一つのグループに所属する複数ホスト宛ての通信に使う。",
    "choiceExplanations": {
      "ア": "用途が予約されたアドレスはあるが，全てのマルチキャストアドレスの用途が固定されているわけではない。",
      "イ": "IPv4のマルチキャストにはクラスDに相当する224.0.0.0〜239.255.255.255を使う。",
      "ウ": "マルチキャストでもTTLによって転送範囲を制御するため，TTLに関係なく中継されるとはいえない。",
      "エ": "IP層などで参加グループに応じた受信処理を行う。全ホストで上位層だけが選別する仕組みではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "スパニングツリー",
    "topicTags": [
      "スパニングツリー"
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
    "explanation": "正解はエ。スパニングツリーはブリッジ間のループを防ぐ。ルートブリッジの選出には，優先順位やMACアドレスからなるブリッジIDを使う。",
    "choiceExplanations": {
      "ア": "ブリッジによるフレーム転送を制御するデータリンク層のプロトコルであり，ネットワーク層ではない。",
      "イ": "冗長経路の一部を転送に使わない状態にし，ループのない構成を作る点が主目的である。",
      "ウ": "ブロードキャストを一切転送しなくする仕組みではなく，ループによるフレームの循環を防ぐ。",
      "エ": "優先順位とMACアドレスを含むブリッジIDを比較して，ルートとなるブリッジを決める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "DNS",
    "topicTags": [
      "DNS"
    ],
    "difficulty": 3,
    "question": "DNSサーバにおいて，IPv6のアドレス情報を登録するレコードはどれか。",
    "choices": {
      "ア": "AAAAレコード",
      "イ": "CNAMEレコード",
      "ウ": "MXレコード",
      "エ": "SOAレコード"
    },
    "answer": "ア",
    "explanation": "正解はア。AAAAレコードは，ドメイン名に対応するIPv6アドレスを登録するためのレコードである。IPv4アドレスを登録するAレコードと区別する。",
    "choiceExplanations": {
      "ア": "AAAAレコードにはIPv6アドレスを格納するため，設問のアドレス情報の登録に用いる。",
      "イ": "CNAMEレコードは別名から正規名への対応を記すもので，IPv6アドレスを直接登録するものではない。",
      "ウ": "MXレコードはメール配送先となるサーバの情報を記すもので，IPv6アドレス自体の登録ではない。",
      "エ": "SOAレコードはゾーンの管理情報を記すもので，個別のホストのIPv6アドレスはAAAAで登録する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 3,
    "question": "ルーティングプロトコルであるBGP-4の説明として，適切なものはどれか。",
    "choices": {
      "ア": "自律システム間で，経路情報に付加されたパス属性を使用し，ポリシに基づいて経路を選択するパスベクタ方式のプロトコルである。",
      "イ": "全てのノードが同一のリンク状態データベースを用い，コストが最小となる経路を最適経路とするプロトコルである。",
      "ウ": "到達可能な宛先アドレスまでのホップ数が最小となる経路を，最適経路とするプロトコルである。",
      "エ": "パケットが転送される経路のノードを，送信元ノードが明示的に指定するプロトコルである。"
    },
    "answer": "ア",
    "explanation": "正解はア。BGP-4はAS間で経路情報を交換し，AS_PATHなどのパス属性と運用ポリシに基づいて経路を選択する。",
    "choiceExplanations": {
      "ア": "AS間の経路選択でパス属性とポリシを使うパスベクタ方式，という説明がBGP-4に合う。",
      "イ": "リンク状態データベースを使って最短経路を計算する説明は，OSPFなどのリンクステート方式に当たる。",
      "ウ": "ホップ数を主な尺度として経路を選ぶ説明はRIPに相当し，BGP-4の選択基準を表していない。",
      "エ": "送信元が経路を明示指定するのはソースルーティングの考え方であり，BGP-4の説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 8,
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
    "explanation": "正解はイ。DNSでは一つの名前に複数のアドレスレコードを持てる。また，異なる名前のアドレスレコードに同じIPアドレスを設定することもできる。",
    "choiceExplanations": {
      "ア": "一つの名前に複数アドレスを登録できる前半は正しいが，複数名を同じアドレスに対応させることも可能である。",
      "イ": "一つの名前から複数のIPアドレスへの対応も，複数の名前から一つのIPアドレスへの対応も可能である。",
      "ウ": "複数の名前に同一アドレスを設定できるが，一つの名前に複数アドレスを設定できないという後半が誤りである。",
      "エ": "DNSの名前とアドレスの関係は1対1に限定されず，複数のレコードを用いて対応付けられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "IPv6",
    "topicTags": [
      "IPv6"
    ],
    "difficulty": 3,
    "question": "IPv4におけるARPのMACアドレス解決機能をIPv6で実現するプロトコルはどれか。",
    "choices": {
      "ア": "DHCPv6",
      "イ": "ICMPv6",
      "ウ": "IGMPv2",
      "エ": "RIPng"
    },
    "answer": "イ",
    "explanation": "正解はイ。IPv6ではICMPv6を利用する近隣探索によって，同一リンクの相手のリンク層アドレスを解決する。",
    "choiceExplanations": {
      "ア": "DHCPv6はアドレスなどの構成情報を提供する仕組みであり，ARPに相当するMACアドレス解決ではない。",
      "イ": "ICMPv6の近隣要請・近隣広告メッセージなどを使って，近隣ノードのリンク層アドレスを解決する。",
      "ウ": "IGMPv2はIPv4のマルチキャストグループ管理に使うもので，IPv6のアドレス解決ではない。",
      "エ": "RIPngはIPv6用の経路制御プロトコルであり，同一リンク上のMACアドレス解決とは役割が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "サブネット",
    "topicTags": [
      "サブネット"
    ],
    "difficulty": 3,
    "question": "可変長サブネットマスクを利用できるルータを用いた図のネットワークにおいて，全てのセグメント間で通信を可能としたい。セグメントAに割り当てるサブネットワークアドレスとして，適切なものはどれか。ここで，図中の各セグメントの数値は，上段がネットワークアドレス，下段がサブネットマスクを表す。",
    "choices": {
      "ア": "ネットワークアドレス：172.16.1.0，サブネットマスク：255.255.255.128",
      "イ": "ネットワークアドレス：172.16.1.128，サブネットマスク：255.255.255.128",
      "ウ": "ネットワークアドレス：172.16.1.128，サブネットマスク：255.255.255.192",
      "エ": "ネットワークアドレス：172.16.1.192，サブネットマスク：255.255.255.192"
    },
    "answer": "ウ",
    "explanation": "正解はウ。Bは172.16.1.32/27，Cは172.16.1.224/30，Dは172.16.1.64/26を使う。172.16.1.128/26の範囲は末尾128〜191で，これらと重ならない。",
    "choiceExplanations": {
      "ア": "末尾0〜127を含む/25なので，Bの32〜63とDの64〜127のアドレス範囲に重なる。",
      "イ": "末尾128〜255を含む/25なので，Cの224〜227のアドレス範囲に重なる。",
      "ウ": "末尾128〜191の/26であり，B・C・Dのどのアドレス範囲とも重ならずに割り当てられる。",
      "エ": "末尾192〜255を含む/26なので，Cの224〜227のアドレス範囲に重なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/nw/2014-autumn-am2-q10.png"
    ],
    "imageAltTexts": [
      "セグメントA・Bを左のルータ，セグメントDを右のルータに接続し，ルータ間をCで結ぶ。Bは172.16.1.32/27，Cは172.16.1.224/30，Dは172.16.1.64/26。"
    ]
  },
  {
    "id": "nw-2014a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 3,
    "question": "RIP（Routing Information Protocol）における，宛先に到達可能な最大ホップ数は幾つか。",
    "choices": {
      "ア": "15",
      "イ": "31",
      "ウ": "63",
      "エ": "127"
    },
    "answer": "ア",
    "explanation": "正解はア。RIPではメトリック16を到達不能として扱うので，到達可能な経路の最大ホップ数は15である。",
    "choiceExplanations": {
      "ア": "RIPでは16を到達不能の値と定めるため，到達可能として扱える最大値はその一つ手前の15である。",
      "イ": "RIPで31ホップを到達可能とは扱わない。16以上になる経路は到達可能な経路の範囲外である。",
      "ウ": "RIPの有効なホップ数上限は15なので，63ホップという値はこの上限を超える。",
      "エ": "RIPのメトリックで到達可能とされるのは15までであり，127ホップは利用できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "QoS",
    "topicTags": [
      "QoS"
    ],
    "difficulty": 3,
    "question": "RSVPの説明として，適切なものはどれか。",
    "choices": {
      "ア": "QoSを実現するために，IPパケットに優先度情報を付加することによって，インターネットを流れるトラフィックを制御する。",
      "イ": "オーディオ情報・ビジュアル情報などの連続した情報の発生源を遠隔制御する。",
      "ウ": "シーケンス番号とタイムスタンプを付加することによって，リアルタイム情報を伝送するパケット間の時間差を保証する。",
      "エ": "ネットワーク資源の予約を行い，ノード間でのマルチメディア情報などのリアルタイム通信を実現する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。RSVPはResource ReSerVation Protocolであり，通信フローが必要とするネットワーク資源を予約するためのプロトコルである。",
    "choiceExplanations": {
      "ア": "パケットに優先度を付ける方式の説明であり，資源予約のためにシグナリングを行うRSVPの説明ではない。",
      "イ": "情報の発生源の遠隔制御は，通信フローの帯域などを予約するRSVPの役割とは異なる。",
      "ウ": "シーケンス番号やタイムスタンプはRTPなどで使う情報であり，付加するだけで伝送時間差は保証できない。",
      "エ": "ネットワーク資源を予約してリアルタイム通信の品質確保を支援する，というRSVPの役割に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "サブネット",
    "topicTags": [
      "サブネット"
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
    "explanation": "正解はア。FFFFFF80は255.255.255.128，すなわち/25。ホスト部は7ビットなので，ネットワークアドレスとブロードキャストアドレスを除いて2^7−2＝126台になる。",
    "choiceExplanations": {
      "ア": "ホスト部7ビットの128通りからネットワーク用とブロードキャスト用の2通りを除き，126台となる。",
      "イ": "128通りから除くのは1通りではなく2通りなので，利用可能なホスト数は127台ではない。",
      "ウ": "254台になるのは一般的な/24のホスト数であり，設問の/25よりホスト部が1ビット多い。",
      "エ": "255台という値は/25の全アドレス数128も超えており，ホスト数にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2014a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 14,
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
      "エ": "データグラム方式では，両端を結ぶ仮想の通信路を確立し，以降は全てその経路を通過させて，経路選択のオーバヘッドを小さくしている。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。スライディングウィンドウ方式は，確認済みの分だけ送信可能な範囲を先へ進める。確認を一つ受けるたびに一つだけ送る方式より，複数データを連続送信できる。",
    "choiceExplanations": {
      "ア": "TCPのウィンドウは固定ではなく，受信側の状態や輻輳に応じた送信量の制御を行える。",
      "イ": "再送要求による訂正はARQの説明である。FECは冗長な情報を使って受信側で誤りを訂正する。",
      "ウ": "確認が届いた分だけウィンドウを進めることで，複数のデータを確認待ちの範囲内で送信できる。",
      "エ": "仮想通信路を確立するのは仮想回線方式の説明であり，データグラム方式の説明とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "DNS",
    "topicTags": [
      "DNS"
    ],
    "difficulty": 3,
    "question": "インターネットの国際化ドメイン名（IDN：Internationalized Domain Name）の説明として，適切なものはどれか。",
    "choices": {
      "ア": "IDNでは，全角英数字を含むドメイン名（例：ＥＸＡＭＰＬＥ１.jp）と半角英数字によるドメイン名（例：EXAMPLE1.jp）は異なるドメイン名として扱われる。",
      "イ": "IDNでは，通信する際に，漢字やアラビア文字などのドメイン名を，ASCII文字だけから成る文字列のドメイン名に一定の規則で変換する。",
      "ウ": "IDNとは，“.com”や“.net”などの，どの国からも取得できるトップレベルドメイン名のことである。",
      "エ": "IDNとは，“.jp”や“.uk”などの，国別トップレベルドメインを使ったドメイン名のことである。"
    },
    "answer": "イ",
    "explanation": "正解はイ。国際化ドメイン名では，非ASCII文字を含むラベルをASCII互換の表現に変換する。文字の国・地域ではなく，名前の表現方法が論点になる。",
    "choiceExplanations": {
      "ア": "出題当時のIDNA2003では全角英数字を半角へ正規化するため，例の二つを別ドメインとする説明は誤りである。",
      "イ": "漢字などを含むラベルを一定の規則でASCII互換の形式に変換する，という国際化ドメイン名の説明である。",
      "ウ": ".comや.netというトップレベルドメインの分類は，国際化ドメイン名かどうかとは別の観点である。",
      "エ": ".jpや.ukという国別トップレベルドメインの分類は，文字列の国際化そのものを意味しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc3490.html",
      "https://www.rfc-editor.org/rfc/rfc3491.html"
    ]
  },
  {
    "id": "nw-2014a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "DNSSEC",
    "topicTags": [
      "DNSSEC"
    ],
    "difficulty": 3,
    "question": "DNSSECの機能はどれか。",
    "choices": {
      "ア": "DNSキャッシュサーバの設定によって再帰的な問合せの受付範囲が最大になるようにする。",
      "イ": "DNSサーバから受け取るリソースレコードに対するディジタル署名を利用して，リソースレコードの送信者の正当性とデータの完全性を検証する。",
      "ウ": "ISPなどのセカンダリDNSサーバを利用してDNSコンテンツサーバを二重化することによって名前解決の可用性を高める。",
      "エ": "共通鍵暗号技術とハッシュ関数を利用したセキュアな方法によって，DNS更新要求が許可されているエンドポイントを特定し認証する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。DNSSECはDNSデータのディジタル署名を検証し，正当な出所のデータか，改ざんされていないかを確認する。",
    "choiceExplanations": {
      "ア": "再帰問合せを受け付けるクライアントの範囲の設定は，DNSSECの署名検証の機能とは異なる。",
      "イ": "署名によってDNSデータの出所の正当性と完全性を検証する点が，DNSSECの機能に一致する。",
      "ウ": "DNSサーバの冗長化は可用性を高める運用であり，DNSSECによる署名検証とは別の仕組みである。",
      "エ": "共通鍵とハッシュを利用して更新要求などを認証する仕組みの説明であり，DNSSECの公開鍵署名検証とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "ディジタル証明書",
    "topicTags": [
      "ディジタル証明書"
    ],
    "difficulty": 3,
    "question": "ディジタル証明書に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "S/MIMEやTLSで利用するディジタル証明書の規格は，ITU-T X.400で規定されている。",
      "イ": "ディジタル証明書は，SSL/TLSプロトコルにおいて通信データの暗号化のための鍵交換や通信相手の認証に利用されている。",
      "ウ": "認証局が発行するディジタル証明書は，申請者の秘密鍵に対して認証局がディジタル署名したものである。",
      "エ": "ルート認証局は，下位の認証局の公開鍵にルート認証局の公開鍵でディジタル署名したディジタル証明書を発行する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ディジタル証明書は公開鍵とその主体との結び付きを確認するための情報で，SSL/TLSの相手認証や鍵交換の認証を支える。",
    "choiceExplanations": {
      "ア": "公開鍵証明書の規格はX.509であり，X.400を証明書の規格とする説明は誤りである。",
      "イ": "証明書によって通信相手と公開鍵の対応を確かめ，認証や暗号化通信に必要な鍵交換を支える。",
      "ウ": "証明書に含めるのは公開鍵などの情報であり，申請者の秘密鍵を認証局が証明するものではない。",
      "エ": "認証局の署名は認証局の秘密鍵で作成する。認証局の公開鍵は署名を検証する側が使う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "無線LAN認証",
    "topicTags": [
      "無線LAN認証"
    ],
    "difficulty": 3,
    "question": "利用者認証情報を管理するサーバ1台と複数のアクセスポイントで構成された無線LAN環境がある。PCが無線LANに接続されるときの利用者認証とアクセス制御に，IEEE 802.1XとRADIUSを利用する場合の実装方法はどれか。",
    "choices": {
      "ア": "PCにはIEEE 802.1Xのサプリカントを実装し，かつ，RADIUSクライアントの機能をもたせる。",
      "イ": "アクセスポイントにはIEEE 802.1Xのオーセンティケータを実装し，かつ，RADIUSクライアントの機能をもたせる。",
      "ウ": "アクセスポイントにはIEEE 802.1Xのサプリカントを実装し，かつ，RADIUSサーバの機能をもたせる。",
      "エ": "サーバにはIEEE 802.1Xのオーセンティケータを実装し，かつ，RADIUSサーバの機能をもたせる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。PCはサプリカント，アクセスポイントはオーセンティケータ，認証情報を管理するサーバは認証サーバとなる。アクセスポイントからサーバへの認証要求にはRADIUSを使う。",
    "choiceExplanations": {
      "ア": "PCはサプリカントとなるが，この構成でRADIUSクライアントとなるのはPCではなくアクセスポイントである。",
      "イ": "アクセスポイントが接続を制御するオーセンティケータとなり，RADIUSクライアントとして認証要求をサーバへ送る。",
      "ウ": "アクセスポイントは利用者として認証を受けるサプリカントではなく，接続を制御するオーセンティケータである。",
      "エ": "認証情報を管理するサーバは認証サーバとなる。無線LANの接続を制御するオーセンティケータはアクセスポイントである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "インシデント対応",
    "topicTags": [
      "インシデント対応"
    ],
    "difficulty": 3,
    "question": "CSIRTの説明として，適切なものはどれか。",
    "choices": {
      "ア": "IPアドレスの割当て方針の決定，DNSルートサーバの運用監視，DNS管理に関する調整などを世界規模で行う組織である。",
      "イ": "インターネットに関する技術文書を作成し，標準化のための検討を行う組織である。",
      "ウ": "企業・組織内や政府機関に設置され，コンピュータセキュリティインシデントに関する報告を受け取り，調査し，対応活動を行う組織の総称である。",
      "エ": "情報技術を利用し，宗教的又は政治的な目標を達成するという目的をもった人や組織の総称である。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。CSIRTは，セキュリティインシデントの報告受付，調査，対応や関係者との調整などを担う組織を指す。",
    "choiceExplanations": {
      "ア": "インターネットのアドレス資源や名前空間の管理・調整の説明であり，インシデント対応を担うCSIRTとは役割が異なる。",
      "イ": "インターネット技術の標準化に取り組む組織の説明であり，インシデント対応を担うCSIRTではない。",
      "ウ": "セキュリティインシデントに関する報告を受け付け，調査・対応する組織というCSIRTの役割に合う。",
      "エ": "政治的・宗教的目的をもつ行為主体の説明であり，組織のセキュリティ対応を担うCSIRTの定義ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "マルウェア対策",
    "topicTags": [
      "マルウェア対策"
    ],
    "difficulty": 3,
    "question": "ウイルス検知手法の一つであるビヘイビア法を説明したものはどれか。",
    "choices": {
      "ア": "ウイルスの特徴的なコード列が検査対象プログラム内に存在するかどうかを調べて，もし存在していればウイルスとして検知する。",
      "イ": "各ファイルに，チェックサム値などウイルスではないことを保証する情報を付加しておき，もし保証する情報が検査対象ファイルに付加されていないか無効ならば，ウイルスとして検知する。",
      "ウ": "検査対象ファイルのハッシュ値と，安全な場所に保管してあるその対象の原本のハッシュ値を比較して，もし異なっていればウイルスとして検知する。",
      "エ": "検査対象プログラムを動作させてその挙動を観察し，もしウイルスによく見られる行動を起こせばウイルスとして検知する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ビヘイビア法はプログラムの振る舞いに着目する。既知のコード列との一致ではなく，不審な動作を観察して検知する。",
    "choiceExplanations": {
      "ア": "特徴的なコード列との照合はシグネチャによる検知であり，動作を観察するビヘイビア法とは異なる。",
      "イ": "正常性を示す情報の有無や有効性を確認する方式であり，実行中の挙動に着目した説明ではない。",
      "ウ": "原本とのハッシュ値の違いで変更を検出する方法であり，プログラムの行動を観察する方式ではない。",
      "エ": "実行中の振る舞いを観察し，ウイルスに特徴的な動作から検知する点がビヘイビア法に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "電子メール",
    "topicTags": [
      "電子メール"
    ],
    "difficulty": 3,
    "question": "利用者が別の機能によって認証された後，一定時間に限ってメールの送信を許可する仕組みはどれか。",
    "choices": {
      "ア": "DKIM",
      "イ": "MIME",
      "ウ": "POP before SMTP",
      "エ": "SMTP-AUTH"
    },
    "answer": "ウ",
    "explanation": "正解はウ。POP before SMTPは，先にPOPによる受信の認証を行った利用者に，その後の一定時間だけSMTP送信を許可する仕組みである。",
    "choiceExplanations": {
      "ア": "DKIMはメールに付けた署名を検証する仕組みであり，利用者の受信認証後に送信を許可する方式ではない。",
      "イ": "MIMEはメールで扱うデータ形式を拡張する仕組みであり，送信を許可するための利用者認証ではない。",
      "ウ": "POPの認証に成功した後，一定時間SMTPによる送信を許可するという順序が設問に一致する。",
      "エ": "SMTP-AUTHはSMTPの通信内で利用者認証を行うため，別の機能による事前認証とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "コンピュータ構成",
    "topicTags": [
      "コンピュータ構成"
    ],
    "difficulty": 3,
    "question": "メモリインタリーブの説明として，適切なものはどれか。",
    "choices": {
      "ア": "主記憶と外部記憶を一元的にアドレス付けし，主記憶の物理容量を超えるメモリ空間を提供する。",
      "イ": "主記憶と磁気ディスク装置との間にバッファメモリを置いて，双方のアクセス速度の差を補う。",
      "ウ": "主記憶と入出力装置との間でCPUとは独立にデータ転送を行う。",
      "エ": "主記憶の連続したアドレスを複数のブロックに分けて，並列的にアクセスすることでアクセスを高速化する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。メモリインタリーブは，連続するアドレスを複数のメモリバンクへ振り分け，アクセスを重ね合わせて高速化する方式である。",
    "choiceExplanations": {
      "ア": "物理容量を超えるアドレス空間を提供する説明は仮想記憶であり，メモリインタリーブではない。",
      "イ": "記憶装置間の速度差をバッファで吸収する方法であり，複数バンクを使うインタリーブとは異なる。",
      "ウ": "CPUとは独立して主記憶と入出力装置の間を転送する説明はDMAに相当する。",
      "エ": "連続アドレスを複数のブロックへ分散し，並列的なアクセスで実効速度を高める説明に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2014a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "通信時間",
    "topicTags": [
      "通信時間"
    ],
    "difficulty": 3,
    "question": "端末から400バイトの電文を送信し，ホストコンピュータが600バイトの電文を返すトランザクション処理システムがある。回線速度を1×10^6ビット/秒，回線の伝送効率を80%，ホストコンピュータのトランザクション当たりの処理時間を40ミリ秒とする。ホストコンピュータでの処理待ち時間，伝送制御のための処理時間などは無視できる場合，端末における電文の送信開始から受信完了までの時間は何ミリ秒か。ここで，1バイトは8ビットであるものとする。",
    "choices": {
      "ア": "10",
      "イ": "44",
      "ウ": "46",
      "エ": "50"
    },
    "answer": "エ",
    "explanation": "正解はエ。送受信の合計は(400＋600)×8＝8,000ビット。有効速度は1,000,000×0.8＝800,000ビット/秒なので通信に10ミリ秒かかる。処理時間40ミリ秒を足して50ミリ秒となる。",
    "choiceExplanations": {
      "ア": "10ミリ秒は送受信の通信時間だけであり，ホストコンピュータでの処理時間40ミリ秒が含まれていない。",
      "イ": "400バイト分だけなら4ミリ秒だが，返信600バイトも伝送するため，44ミリ秒では足りない。",
      "ウ": "返信600バイト分だけなら6ミリ秒だが，送信400バイト分も必要なので46ミリ秒ではない。",
      "エ": "送信4ミリ秒，処理40ミリ秒，返信6ミリ秒を合計して50ミリ秒となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2014a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "ソフトウェアテスト",
    "topicTags": [
      "ソフトウェアテスト"
    ],
    "difficulty": 3,
    "question": "エラー埋込み法において，埋め込まれたエラー数をS，埋め込まれたエラーのうち発見されたエラー数をm，埋め込まれたエラーを含まないテスト開始前の潜在エラー数をT，発見された総エラー数をnとしたとき，S，T，m，nの関係を表す式はどれか。",
    "choices": {
      "ア": "m/S = (n−m)/T",
      "イ": "m/S = T/(n−m)",
      "ウ": "m/S = n/T",
      "エ": "m/S = T/n"
    },
    "answer": "ア",
    "explanation": "正解はア。埋め込んだエラーの発見率m/Sと，元から存在したエラーの発見率(n−m)/Tが同程度だと仮定する。総発見数nには埋込み分mも含まれるので，元のエラーの発見数はn−mとなる。",
    "choiceExplanations": {
      "ア": "埋込みエラーの発見率m/Sと，元のエラーの発見率(n−m)/Tを等しいとする関係を表している。",
      "イ": "元のエラーの発見率は(n−m)/Tである。T/(n−m)では分子と分母が逆になる。",
      "ウ": "総発見数nには埋込みエラーmが含まれるので，元のエラーの発見率に使うにはmを引く必要がある。",
      "エ": "元のエラーの発見率は(n−m)/Tであり，T/nでは逆数である上に埋込み分も取り除けていない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2014a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "ソフトウェア開発",
    "topicTags": [
      "ソフトウェア開発"
    ],
    "difficulty": 3,
    "question": "ソフトウェアのリバースエンジニアリングの説明はどれか。",
    "choices": {
      "ア": "開発支援ツールなどを用いて，設計情報からソースコードを自動生成する。",
      "イ": "外部から見たときの振る舞いを変えずに，ソフトウェアの内部構造を変える。",
      "ウ": "既存のソフトウェアを解析して，その仕様や構造を明らかにする。",
      "エ": "既存のソフトウェアを分析し理解した上で，ソフトウェア全体を新しく構築し直す。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。リバースエンジニアリングは，既存のソフトウェアを出発点として，仕様・構造・設計などの情報を取り出す解析である。",
    "choiceExplanations": {
      "ア": "設計からコードを作るのは通常の開発方向であり，既存ソフトウェアから仕様を読み解く方向とは逆である。",
      "イ": "外部への振る舞いを保ちながら内部構造を改善する説明はリファクタリングに相当する。",
      "ウ": "既存ソフトウェアを解析し，仕様や構造を明らかにするというリバースエンジニアリングの説明に合う。",
      "エ": "解析した上で全体を再構築する説明はリエンジニアリングに相当し，解析そのものより範囲が広い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
