// IPA公式冊子から転記。原典・照合記録: ../2015-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2015_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2015a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "DNS",
    "topicTags": [
      "DNS"
    ],
    "difficulty": 3,
    "question": "DNSの資源レコード（リソースレコード，RR）に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "CNAMEレコードは，他のDNSサーバのキャッシュ領域に情報を残す許可時間や，ゾーン情報の更新をチェックする間隔などを指定するレコードである。",
      "イ": "MXレコードは，電子メールの送り先となるサーバのIPアドレスを指定するレコードである。",
      "ウ": "NSレコードは，そのゾーン自身や下位ドメインに関するDNSサーバのホスト名を指定するレコードである。",
      "エ": "PTRレコードは，名前に対応するIPアドレスを指定するレコードである。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。NSレコードは，そのゾーンの権威DNSサーバなどをホスト名で指定する。MXも配送先をホスト名で指定し，アドレスから名前を引く逆引きにはPTRを使う。",
    "choiceExplanations": {
      "ア": "CNAMEは別名に対応する正規名を指定する。ゾーンの更新確認間隔などはSOAの情報である。",
      "イ": "MXの配送先はIPアドレスではなくホスト名で指定し，そのホスト名のアドレスを別途解決する。",
      "ウ": "ゾーン自身や委任する下位ドメインのDNSサーバをホスト名で示すのがNSレコードである。",
      "エ": "PTRは逆引きなどで名前を示す。ホスト名に対応するIPv4アドレスを示すのはAレコードである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "無線通信",
    "topicTags": [
      "無線通信"
    ],
    "difficulty": 3,
    "question": "ZigBeeの特徴はどれか。",
    "choices": {
      "ア": "2.4GHz帯を使用する無線通信方式であり，一つのマスタと最大七つのスレーブから成るスター型ネットワークを構成する。",
      "イ": "5.8GHz帯を使用する近距離の無線通信方式であり，有料道路の料金所のETCなどで利用されている。",
      "ウ": "下位層にIEEE 802.15.4を使用する低消費電力の無線通信方式であり，センサネットワークやスマートメータなどへの応用が進められている。",
      "エ": "広い周波数帯にデータを拡散することによって高速な伝送を行う無線通信方式であり，近距離での映像や音楽配信に利用されている。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ZigBeeは少量のデータを低消費電力でやり取りする用途に向く。下位層にIEEE 802.15.4を使う点が見分ける手掛かりになる。",
    "choiceExplanations": {
      "ア": "一つのマスタと最大七つのスレーブを結ぶ構成は，Bluetoothのピコネットの説明である。",
      "イ": "ETCに用いる5.8GHz帯の狭域通信はDSRCの説明であり，ZigBeeとは異なる。",
      "ウ": "低消費電力のセンサ通信などに用い，下位層にIEEE 802.15.4を採用する点がZigBeeに一致する。",
      "エ": "広い周波数帯を使う高速な近距離通信の説明であり，低消費電力のセンサ通信を主用途とするZigBeeとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "OSI基本参照モデル",
    "topicTags": [
      "OSI基本参照モデル"
    ],
    "difficulty": 3,
    "question": "OSI基本参照モデルのトランスポート層の機能として，適切なものはどれか。",
    "choices": {
      "ア": "経路選択機能や中継機能をもち，透過的なデータ転送を行う。",
      "イ": "情報をフレーム化し，伝送誤りを検出するためのビット列を付加する。",
      "ウ": "伝送をつかさどる各種通信網の品質の差を補完し，透過的なデータ転送を行う。",
      "エ": "ルータにおいてパケット中継処理を行う。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。トランスポート層は通信の両端でデータ転送を扱い，下位のネットワークが提供する品質の違いを補う。経路選択やフレーム化は別の層の機能である。",
    "choiceExplanations": {
      "ア": "経路選択やネットワーク間の中継はネットワーク層の機能であり，トランスポート層ではない。",
      "イ": "フレームを作って伝送誤り検出用の情報を付加するのはデータリンク層の機能である。",
      "ウ": "下位の通信網の違いを吸収して両端間の透過的な転送を提供する点が，トランスポート層に対応する。",
      "エ": "ルータで宛先に応じてパケットを中継するのはネットワーク層の処理である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "OSPF",
    "topicTags": [
      "OSPF"
    ],
    "difficulty": 3,
    "question": "IPv4ネットワークにおけるOSPFの仕様に当てはまるものはどれか。",
    "choices": {
      "ア": "経路選択に距離ベクトルアルゴリズムを用いる。",
      "イ": "異なる自律システム（ルーティングドメイン）間でのルーティング情報交換プロトコルである。",
      "ウ": "サブネットマスク情報を伝達する機能があり，可変長サブネットに対応している。",
      "エ": "到達可能なネットワークは最大ホップ数15という制限がある。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。OSPFはリンク状態型の経路制御を行う自律システム内のプロトコルである。サブネットマスク情報を扱うため，可変長サブネットに対応できる。",
    "choiceExplanations": {
      "ア": "OSPFはリンク状態型であり，距離ベクトル型の経路制御とは異なる。",
      "イ": "OSPFは自律システム内で使う。自律システム間の経路情報交換はBGPなどの役割である。",
      "ウ": "経路のマスク情報を伝えられるため，ネットワークごとに異なる長さのサブネットマスクを扱える。",
      "エ": "最大ホップ数15という制約はRIPの特徴であり，OSPFにそのまま当てはまらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "伝送誤り",
    "topicTags": [
      "伝送誤り"
    ],
    "difficulty": 4,
    "question": "平均ビット誤り率が1×10⁻⁵の回線を用いて，200,000バイトのデータを100バイトずつの電文に分けて送信する。送信電文のうち，誤りが発生する電文の個数は平均して幾つか。",
    "choices": {
      "ア": "2",
      "イ": "4",
      "ウ": "8",
      "エ": "16"
    },
    "answer": "エ",
    "explanation": "正解はエ。電文数は200,000÷100＝2,000個で，1電文は800ビット。低い誤り率なので，電文に誤りがある確率を800×10⁻⁵≒0.008と近似すると，2,000×0.008＝16個となる。",
    "choiceExplanations": {
      "ア": "200,000バイトに誤り率を掛けるだけでは，ビット単位の確率をバイトに適用してしまう。8倍の換算が必要である。",
      "イ": "1バイトは8ビットなので，全体のビット数は1,600,000。誤りを含む電文数は約16個であり4個ではない。",
      "ウ": "電文は800ビットあり，電文数2,000に約0.008を掛けるので，8個ではなく約16個となる。",
      "エ": "2,000×{1−(1−10⁻⁵)⁸⁰⁰}は約15.94。選択肢では16個が該当する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2015a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "HDLC",
    "topicTags": [
      "HDLC"
    ],
    "difficulty": 2,
    "question": "HDLC手順で用いられるフレーム中のフラグシーケンスの役割として，適切なものはどれか。",
    "choices": {
      "ア": "受信確認を待たずに複数フレームの送信を可能にする。",
      "イ": "フレームの開始と終了を示す。",
      "ウ": "フレームの転送順序を制御する。",
      "エ": "フレームの伝送誤りを検出する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。HDLCのフラグシーケンスは，フレームの区切りを示すビット列である。フレームの先頭と末尾を受信側が識別するために使う。",
    "choiceExplanations": {
      "ア": "確認応答を待たずに送れる範囲はウィンドウなどのフロー制御で決め，フラグシーケンスの役割ではない。",
      "イ": "フレームの境界を示すことで，データのどこからどこまでが一つのフレームか識別できる。",
      "ウ": "フレームの順序制御には制御情報や番号を用いる。フラグシーケンスは境界を示す。",
      "エ": "伝送誤りの検出はFCSなどの役割であり，フレームの境界を示すフラグとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "ICMP",
    "topicTags": [
      "ICMP"
    ],
    "difficulty": 3,
    "question": "IPv4におけるICMPのメッセージに関する説明として，適切なものはどれか。",
    "choices": {
      "ア": "送信元が設定したソースルーティングが失敗した場合は，Echo Replyを返す。",
      "イ": "転送されてきたデータグラムを受信したルータが，そのネットワーク上の最適なルータを送信元に通知して経路の変更を要請するには，Redirectを使用する。",
      "ウ": "フラグメントの再組立て中にタイムアウトが発生した場合は，データグラムを破棄してParameter Problemを返す。",
      "エ": "ルータでメッセージを転送する際に，受信側のバッファがあふれた場合はTime Exceededを送り，送信ホストに送信を抑制することを促す。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ICMP Redirectは，送信元により適切な次ホップのルータを知らせるためのメッセージである。Echo ReplyやTime Exceededなどとは目的が異なる。",
    "choiceExplanations": {
      "ア": "Echo ReplyはEcho Requestへの応答である。ソースルーティングの失敗を通知するメッセージではない。",
      "イ": "同じネットワーク上のより適切なルータを送信元へ知らせる動作はRedirectの用途に一致する。",
      "ウ": "フラグメント再組立ての時間切れはTime Exceededで通知し，Parameter Problemとは区別する。",
      "エ": "Time Exceededは寿命や再組立て時間の超過を知らせる。バッファあふれによる送信抑制を促す説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "マルチキャスト",
    "topicTags": [
      "マルチキャスト"
    ],
    "difficulty": 3,
    "question": "マルチキャストグループへの参加や離脱をホストが通知したり，マルチキャストグループに参加しているホストの有無をルータがチェックしたりするときに使用するプロトコルはどれか。",
    "choices": {
      "ア": "ARP",
      "イ": "IGMP",
      "ウ": "LDAP",
      "エ": "RIP"
    },
    "answer": "イ",
    "explanation": "正解はイ。IGMPはIPv4マルチキャストで，ホストのグループ参加状況をルータとやり取りするプロトコルである。ルータはその情報を使い，必要なネットワークへ転送する。",
    "choiceExplanations": {
      "ア": "ARPはIPv4アドレスに対応するMACアドレスを解決するために使い，マルチキャストグループの参加管理ではない。",
      "イ": "IGMPはマルチキャストグループの参加状況の通知や問合せを行うため，設問に一致する。",
      "ウ": "LDAPはディレクトリ情報へアクセスするためのプロトコルであり，グループ参加管理には使わない。",
      "エ": "RIPはルータ間で経路情報を交換するプロトコルであり，ホストのマルチキャスト参加通知ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "IPv6",
    "topicTags": [
      "IPv6"
    ],
    "difficulty": 3,
    "question": "IPv6においてIPv4から仕様変更された内容の説明として，適切なものはどれか。",
    "choices": {
      "ア": "IPヘッダのTOSフィールドを使用し，特定のクラスのパケットに対する資源予約ができるようになった。",
      "イ": "IPヘッダのアドレス空間が，32ビットから64ビットに拡張されている。",
      "ウ": "IPヘッダのチェックサムフィールドを追加し，誤り検出機能を強化している。",
      "エ": "IPレベルのセキュリティ機能（IPsec）である認証と改ざん検出機能のサポートが必須となり，パケットを暗号化したり送信元を認証したりすることができる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。IPsecによる認証・改ざん検出・暗号化に着目した選択肢である。ただし，RFC 8504のIPv6ノード要件ではIPsecのサポートはSHOULD（推奨）であり，現在の必須要件とは区別する。",
    "choiceExplanations": {
      "ア": "TOSはIPv4のフィールドであり，IPv6への変更でそれを使用した資源予約が可能になったという説明ではない。",
      "イ": "IPv6アドレスは128ビットである。64ビットへの拡張という説明は誤りである。",
      "ウ": "IPv6の基本ヘッダにはチェックサムがない。チェックサムフィールドを追加したという説明は誤りである。",
      "エ": "IPsecで認証や改ざん検出，暗号化を行える。公式正答はこの肢だが，サポート必須という部分はRFC 8504の推奨要件とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "帯域予約",
    "topicTags": [
      "帯域予約"
    ],
    "difficulty": 3,
    "question": "RSVPの説明として，適切なものはどれか。",
    "choices": {
      "ア": "IPネットワークにおいて，ホスト間通信の伝送帯域を管理するためのプロトコルである。",
      "イ": "LANシステムにおいて，物理的なケーブルやノードの接続形態に依存せず，ノードを任意に論理的なグループに分ける技術である。",
      "ウ": "PPPによるデータリンクを複数束ねることができるように拡張したプロトコルである。",
      "エ": "リモートアクセスを利用する利用者の認証を行うためのプロトコルである。"
    },
    "answer": "ア",
    "explanation": "正解はア。RSVPは，通信経路上のルータに帯域などの資源を予約するための制御を行うプロトコルである。ホスト間通信に必要な資源の確保に使う。",
    "choiceExplanations": {
      "ア": "通信に必要な帯域などの資源を経路上で予約・管理するためのプロトコルであり，適切である。",
      "イ": "物理的な接続から独立した論理グループを作るのはVLANの説明であり，RSVPではない。",
      "ウ": "複数のPPPリンクを束ねるのはマルチリンクPPPの説明であり，資源予約のRSVPとは異なる。",
      "エ": "リモートアクセス利用者の認証はRADIUSなどの用途であり，帯域予約とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "UDP",
    "topicTags": [
      "UDP"
    ],
    "difficulty": 2,
    "question": "UDPを使用するプロトコルはどれか。",
    "choices": {
      "ア": "DHCP",
      "イ": "FTP",
      "ウ": "HTTP",
      "エ": "SMTP"
    },
    "answer": "ア",
    "explanation": "正解はア。DHCPは，アドレスがまだ設定されていない端末の設定情報取得にUDPを用いる。この設問のFTP，HTTP，SMTPと対比して覚える。",
    "choiceExplanations": {
      "ア": "DHCPは端末へのIP設定の配布にUDPを使用するため，この選択肢が適切である。",
      "イ": "FTPは制御用とデータ転送用の接続にTCPを使用するため，該当しない。",
      "ウ": "出題当時はHTTP/1.1・HTTP/2を前提とする。HTTP/3ではQUICを介してUDPを使用する。",
      "エ": "SMTPは信頼性のあるメール配送のためにTCPを使用するので，この設問の正答ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "冗長化",
    "topicTags": [
      "冗長化"
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
    "explanation": "正解はエ。VRRPは複数のルータで仮想ルータを構成し，ゲートウェイの障害時に役割を引き継ぐ。クライアントは同じ仮想IPアドレスをゲートウェイとして利用し続けられる。",
    "choiceExplanations": {
      "ア": "RARPはMACアドレスを基にIPアドレスを求めるためのプロトコルであり，ゲートウェイの冗長化ではない。",
      "イ": "RSTPはレイヤ2のループ回避や経路切替えのための仕組みであり，仮想ゲートウェイを提供するものではない。",
      "ウ": "RTSPはストリーミングのセッション制御に使うプロトコルであり，ゲートウェイの障害回避ではない。",
      "エ": "仮想IPアドレスを複数ルータで共有し，稼働ルータの役割を引き継ぐVRRPが該当する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "サブネット",
    "topicTags": [
      "サブネット"
    ],
    "difficulty": 3,
    "question": "ネットワークに接続されているホストのIPアドレスが212.62.31.90で，サブネットマスクが255.255.255.224のとき，ホストアドレスはどれか。",
    "choices": {
      "ア": "10",
      "イ": "26",
      "ウ": "90",
      "エ": "212"
    },
    "answer": "イ",
    "explanation": "正解はイ。255.255.255.224は/27で，ホスト部は末尾5ビット。最終オクテット90から，サブネット先頭の64を引くとホスト部は26になる。",
    "choiceExplanations": {
      "ア": "ホスト部は90の下位5ビットであり，10にはならない。ネットワーク部と分けて計算する。",
      "イ": "90は2進数で01011010。下位5ビット11010は10進数で26になる。",
      "ウ": "90は最終オクテット全体の値であり，このうち上位3ビットはネットワーク部に含まれる。",
      "エ": "212は先頭オクテットの値であり，/27のホスト部を表す値ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2015a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "CIDR",
    "topicTags": [
      "CIDR"
    ],
    "difficulty": 3,
    "question": "サブネットマスクが255.255.255.0である四つのネットワーク192.168.32.0，192.168.33.0，192.168.34.0，192.168.35.0を，CIDRを使ってスーパーネット化したときのネットワーク番号とサブネットマスクの組合せとして，適切なものはどれか。",
    "choices": {
      "ア": "ネットワーク番号：192.168.32.0，サブネットマスク：255.255.248.0",
      "イ": "ネットワーク番号：192.168.32.0，サブネットマスク：255.255.252.0",
      "ウ": "ネットワーク番号：192.168.35.0，サブネットマスク：255.255.248.0",
      "エ": "ネットワーク番号：192.168.35.0，サブネットマスク：255.255.252.0"
    },
    "answer": "イ",
    "explanation": "正解はイ。連続する四つの/24をまとめると，共通するプレフィックスは/22になる。192.168.32.0を先頭とし，マスク255.255.252.0で第3オクテット32～35を表す。",
    "choiceExplanations": {
      "ア": "255.255.248.0は/21であり，第3オクテット32～39までの8ネットワークをまとめる範囲になる。",
      "イ": "先頭192.168.32.0と/22のマスク255.255.252.0で，指定の四つのネットワークをまとめられる。",
      "ウ": "/21では範囲が広すぎるうえ，35.0はそのマスクに対するネットワークの先頭ではない。",
      "エ": "マスクの長さは合っているが，/22の先頭は32.0であり35.0ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2015a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "音声品質",
    "topicTags": [
      "音声品質"
    ],
    "difficulty": 3,
    "question": "IP電話の音声品質を表す指標のうち，ノイズ，エコー，遅延などから算出されるものはどれか。",
    "choices": {
      "ア": "MOS値",
      "イ": "R値",
      "ウ": "ジッタ",
      "エ": "パケット損失率"
    },
    "answer": "イ",
    "explanation": "正解はイ。R値は，ノイズやエコー，遅延などの劣化要因をモデルで評価して算出する音声品質の指標である。単独の通信特性であるジッタや損失率とは区別する。",
    "choiceExplanations": {
      "ア": "MOS値は聴取者による主観的な評価の平均を表す指標であり，設問の算出指標はR値である。",
      "イ": "ノイズ，エコー，遅延などを使って算出する総合的な音声品質指標がR値である。",
      "ウ": "ジッタはパケットの到着間隔などの揺らぎであり，複数の劣化要因から算出する総合指標ではない。",
      "エ": "パケット損失率は送ったパケットのうち失われた割合であり，ノイズやエコーを含めた総合指標ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "メッセージ認証",
    "topicTags": [
      "メッセージ認証"
    ],
    "difficulty": 3,
    "question": "送信者Aが，受信者Bと共有している鍵を用いて，メッセージからメッセージ認証符号を生成し，そのメッセージ認証符号とメッセージを受信者Bに送信する。このとき，メッセージとメッセージ認証符号を用いて，受信者Bができることはどれか。",
    "choices": {
      "ア": "通信路上でのメッセージの伝送誤りを訂正できる。",
      "イ": "通信路上でのメッセージの複製の有無を検知できる。",
      "ウ": "メッセージの改ざんがないことを判定できる。",
      "エ": "メッセージの盗聴の有無を検知できる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。受信者は同じ鍵と受信メッセージから認証符号を再計算し，届いた符号と比較できる。改ざんによる不一致は検出できるが，元の内容の復元や盗聴の検出はできない。",
    "choiceExplanations": {
      "ア": "認証符号は変更を検出するためのものであり，誤ったビットを元に戻す誤り訂正符号ではない。",
      "イ": "同じメッセージと認証符号が複製された場合，符号の照合だけでは複製や再送を見分けられない。",
      "ウ": "共有鍵で計算した符号を照合し，受信メッセージが改ざんされていないか確認できる。",
      "エ": "途中で内容を読み取られてもメッセージと符号が変わるとは限らず，盗聴そのものは検知できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "無線LAN暗号化",
    "topicTags": [
      "無線LAN暗号化"
    ],
    "difficulty": 3,
    "question": "無線LANにおけるWPA2の特徴はどれか。",
    "choices": {
      "ア": "AHとESPの機能によって認証と暗号化を実現する。",
      "イ": "暗号化アルゴリズムにAESを採用したCCMP（Counter-mode with CBC-MAC Protocol）を使用する。",
      "ウ": "端末とアクセスポイントの間で通信を行う際に，TLS Handshake Protocolを使用して，互いが正当な相手かどうかを認証する。",
      "エ": "利用者が設定する秘密鍵と，製品で生成するIV（Initialization Vector）とを連結した数を基に，データをフレームごとにRC4で暗号化する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。WPA2は無線LANの保護にAESを用いたCCMPを使用する。AH・ESPによるIP層の保護や，RC4を用いる方式と区別する。",
    "choiceExplanations": {
      "ア": "AHとESPはIPsecを構成するプロトコルであり，無線LANのWPA2の暗号化方式の説明ではない。",
      "イ": "AESを基礎に暗号化と完全性保護を行うCCMPを使う点が，WPA2の特徴に一致する。",
      "ウ": "認証方法としてTLSを利用する場合はあるが，全てのWPA2で端末とアクセスポイントがこの手順を使うわけではない。",
      "エ": "秘密鍵とIVを基にRC4でフレームを暗号化するのはWEPの説明であり，WPA2のCCMPとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "プロキシ",
    "topicTags": [
      "プロキシ"
    ],
    "difficulty": 3,
    "question": "プロキシサーバ又はリバースプロキシサーバを新たにDMZに導入するセキュリティ強化策のうち，導入によるセキュリティ上の効果が最も高いものはどれか。",
    "choices": {
      "ア": "DMZ上の公開用Webサーバとしてリバースプロキシサーバを設置し，その参照先のWebサーバを，外部からアクセスできない別のDMZに移設することによって，外部のPCとの通信におけるインターネット上での盗聴を防ぐ。",
      "イ": "DMZ上の公開用Webサーバとしてリバースプロキシサーバを設置し，その参照先のWebサーバを，外部からアクセスできない別のDMZに移設することによって，外部から直接Webサーバのコンテンツが改ざんされることを防ぐ。",
      "ウ": "社内PCからインターネット上のWebサーバにアクセスするときの中継サーバとしてプロキシサーバをDMZに設置することによって，参照先のWebサーバと社内PC間の通信におけるインターネット上での盗聴を防ぐ。",
      "エ": "社内PCからインターネット上のWebサーバにアクセスするときの中継サーバとしてプロキシサーバをDMZに設置することによって，参照するコンテンツのインターネット上での改ざんを防ぐ。"
    },
    "answer": "イ",
    "explanation": "正解はイ。リバースプロキシだけを外部へ公開し，実コンテンツをもつWebサーバへの外部からの直接接続を遮断すれば，直接的な改ざんの経路を減らせる。中継サーバの設置だけで通信が暗号化されるわけではない。",
    "choiceExplanations": {
      "ア": "リバースプロキシへの通信自体はインターネットを通るため，設置だけで盗聴を防ぐことにはならない。",
      "イ": "実体のWebサーバを外部から直接アクセスできない場所へ置くことで，直接的な改ざんの経路を遮断できる。",
      "ウ": "通常のプロキシを挟むだけではインターネット上の通信の機密性は保証されず，盗聴防止にはならない。",
      "エ": "プロキシの導入自体は通信の完全性を保証しないため，途中でのコンテンツ改ざんを防ぐ根拠にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "迷惑メール対策",
    "topicTags": [
      "迷惑メール対策"
    ],
    "difficulty": 3,
    "question": "インターネットサービスプロバイダ（ISP）が，OP25Bを導入することで得られるセキュリティ上の効果はどれか。",
    "choices": {
      "ア": "ISP管理下のネットワークからISP管理外のネットワークに対するICMPパケットによるDDoS攻撃を遮断できる。",
      "イ": "ISP管理下のネットワークからISP管理外のネットワークに向けて送信されるスパムメールを制限できる。",
      "ウ": "ISP管理下のネットワークに対するISP管理外のネットワークからのICMPパケットによるDDoS攻撃を遮断できる。",
      "エ": "ISP管理下のネットワークに向けてISP管理外のネットワークから送信されるスパムメールを制限できる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。OP25BはOutbound Port 25 Blockingであり，外向きの25番ポートへの通信を制限する。感染端末などから外部のメールサーバへ直接送るスパムを抑える対策になる。",
    "choiceExplanations": {
      "ア": "OP25Bが対象とするのは外向きのTCP25番への接続であり，ICMPによる攻撃を遮断する機能ではない。",
      "イ": "管理下の端末から外部のメールサーバへ直接送る通信を制限し，外向きのスパム送信を抑える。",
      "ウ": "ICMPの着信制限ではなく，外部へのSMTP接続を制限する対策なので，向きも対象も異なる。",
      "エ": "OP25Bは外向きの通信に対する対策であり，外部から届くスパムの受信を直接制限するものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "Webセキュリティ",
    "topicTags": [
      "Webセキュリティ"
    ],
    "difficulty": 3,
    "question": "Webアプリケーションの脆弱性を悪用する攻撃手法のうち，Webページ上で入力した文字列がPerlのsystem関数やPHPのexec関数などに渡されることを利用し，不正にシェルスクリプトや実行形式のファイルを実行させるものは，どれに分類されるか。",
    "choices": {
      "ア": "HTTPヘッダインジェクション",
      "イ": "OSコマンドインジェクション",
      "ウ": "クロスサイトリクエストフォージェリ",
      "エ": "セッションハイジャック"
    },
    "answer": "イ",
    "explanation": "正解はイ。外部入力がOSのコマンド実行機能に渡され，意図しないコマンドが実行される攻撃はOSコマンドインジェクションである。入力がどこで解釈されるかに着目する。",
    "choiceExplanations": {
      "ア": "HTTPレスポンスのヘッダなどへ不正な文字列を挿入する攻撃であり，OSのコマンド実行とは異なる。",
      "イ": "systemやexecなどを介して入力がシェルの命令として解釈されるため，OSコマンドインジェクションに当たる。",
      "ウ": "利用者の認証状態を悪用して意図しないリクエストを送らせる攻撃であり，OSコマンドの注入ではない。",
      "エ": "他人のセッションを乗っ取る攻撃であり，入力文字列をコマンドとして実行させる設問とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "TLS",
    "topicTags": [
      "TLS"
    ],
    "difficulty": 3,
    "question": "TLSに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "TLSで使用するWebサーバのディジタル証明書にはIPアドレスの組込みが必須なので，WebサーバのIPアドレスを変更する場合は，ディジタル証明書を再度取得する必要がある。",
      "イ": "TLSで使用する個人認証用のディジタル証明書は，ICカードなどに格納できるので，格納場所を特定のPCに限定する必要はない。",
      "ウ": "TLSはWebサーバを経由した特定の利用者間の通信のために開発されたプロトコルであり，Webサーバ提供者への事前の利用者登録が不可欠である。",
      "エ": "日本国内では，TLSで使用する共通鍵の長さは，128ビット未満に制限されている。"
    },
    "answer": "イ",
    "explanation": "正解はイ。個人認証用の証明書はICカードなどの媒体でも保持でき，特定のPCに固定して保存する必要はない。TLSは事前登録された特定利用者間だけに限定される仕組みでもない。",
    "choiceExplanations": {
      "ア": "サーバ証明書はDNS名を使って検証でき，IPアドレスの組込みが全てのサーバ証明書に必須という前提は誤りである。",
      "イ": "個人認証に使う証明書をICカードなどに保持できるので，利用するPCだけに格納場所を限定する必要はない。",
      "ウ": "TLSは事前の利用者登録を必須とするプロトコルではなく，Web以外の用途にも利用される。",
      "エ": "TLSの共通鍵の長さを128ビット未満に限定するという説明は誤りであり，TLSの一般的な制約ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "RAID",
    "topicTags": [
      "RAID"
    ],
    "difficulty": 2,
    "question": "パリティ専用の磁気ディスク装置をもち，ブロック単位のストライピングを行うRAIDの方式はどれか。",
    "choices": {
      "ア": "RAID1",
      "イ": "RAID3",
      "ウ": "RAID4",
      "エ": "RAID5"
    },
    "answer": "ウ",
    "explanation": "正解はウ。RAID4はブロック単位でデータを分散し，専用のディスクにパリティを保持する。RAID5もブロック単位だが，パリティの置き場所を分散する点が異なる。",
    "choiceExplanations": {
      "ア": "RAID1は同じデータを複数のディスクへ書くミラーリングであり，パリティ専用ディスクを使う方式ではない。",
      "イ": "RAID3はパリティ専用ディスクをもつが，ブロック単位のストライピングという条件にはRAID4が該当する。",
      "ウ": "ブロック単位のストライピングとパリティ専用ディスクの組合せが，RAID4の特徴である。",
      "エ": "RAID5はパリティを複数ディスクに分散して置くので，パリティ専用ディスクという条件に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2015a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "並列処理",
    "topicTags": [
      "並列処理"
    ],
    "difficulty": 4,
    "question": "マルチプロセッサによる並列処理において，1プロセッサのときに対する性能向上比はアムダールの法則で説明することができる。性能向上比に関する記述のうち，適切なものはどれか。\n\n〔アムダールの法則〕\n性能向上比＝1÷{(1−並列化可能部の割合)＋並列化可能部の割合÷プロセッサ数}",
    "choices": {
      "ア": "プロセッサ数が一定の場合，性能向上比は並列化可能部の割合に比例する。",
      "イ": "プロセッサ数を増やした場合，性能向上比は並列化可能部の割合に反比例する。",
      "ウ": "並列化可能部の割合が0.5の場合，プロセッサ数をいくら増やしても性能向上比が2を超えることはない。",
      "エ": "並列化可能部の割合が最低0.9以上であれば，性能向上比はプロセッサ数の半分以上の値となる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。並列化できる割合をp，プロセッサ数をNとすると向上比は1/{(1−p)＋p/N}。p＝0.5ではNを増やしても分母が0.5を下回らず，向上比は2を超えない。",
    "choiceExplanations": {
      "ア": "割合pは分母の中に入るため，向上比がpに単純に比例する関係にはならない。",
      "イ": "並列化可能な部分が多いほど性能向上の余地が大きいので，割合に反比例する説明は適切でない。",
      "ウ": "p＝0.5なら1/(0.5＋0.5/N)で，Nがどれだけ大きくても2を上回らない。",
      "エ": "p＝0.9，N＝100では向上比は約9.17であり，プロセッサ数の半分の50以上にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2015a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "オブジェクト指向",
    "topicTags": [
      "オブジェクト指向"
    ],
    "difficulty": 3,
    "question": "オブジェクト間のis-a関係を表す図はどれか。",
    "choices": {
      "ア": "図ア",
      "イ": "図イ",
      "ウ": "図ウ",
      "エ": "図エ"
    },
    "answer": "ウ",
    "explanation": "正解はウ。is-aは「あるものは別のものの一種である」という一般化・特殊化の関係を示す。乗用車とトラックはいずれも自動車の一種なので，図ウが該当する。",
    "choiceExplanations": {
      "ア": "拡大・縮小は画像に対する操作を表しており，画像の種類を表すものではない。",
      "イ": "氏名と生年月日は社員の属性であり，社員の一種という関係にはならない。",
      "ウ": "乗用車は自動車の一種，トラックも自動車の一種であるため，is-a関係を表している。",
      "エ": "受話器やプッシュボタンは電話機を構成する部品であり，電話機の一種という関係ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2015-autumn-am2-q24.png"
    ],
    "imageAltTexts": [
      "選択肢ア～エの関係図。画像と拡大・縮小，社員と氏名・生年月日，自動車と乗用車・トラック，電話機と受話器・プッシュボタン。"
    ]
  },
  {
    "id": "nw-2015a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "SOA",
    "topicTags": [
      "SOA"
    ],
    "difficulty": 3,
    "question": "SOA（Service Oriented Architecture）でサービスを設計する際の注意点のうち，適切なものはどれか。",
    "choices": {
      "ア": "可用性を高めるために，ステートフルなインタフェースとする。",
      "イ": "業務からの独立性を確保するために，サービスの命名は役割を表すものとする。",
      "ウ": "業務の変化に対応しやすくするために，サービス間の関係は疎結合にする。",
      "エ": "セキュリティを高めるために，一度開発したサービスは再利用しない方がよい。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。サービス間を疎結合にすると，一方の変更が他方へ及ぼす影響を抑えやすい。業務の変化に合わせてサービスを組み替えたり，個別に変更したりしやすくなる。",
    "choiceExplanations": {
      "ア": "状態を保持するインタフェースにすることだけで可用性は高まらない。状態の引継ぎなどが必要になる場合もある。",
      "イ": "命名は役割を表すとしても，それだけで業務からの独立性を確保することにはならない。",
      "ウ": "サービス間の依存を抑える疎結合は，業務の変化に合わせた変更の影響を小さくする。",
      "エ": "サービスの再利用を避けること自体はセキュリティ向上の要件ではなく，SOAでは再利用も重要になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
