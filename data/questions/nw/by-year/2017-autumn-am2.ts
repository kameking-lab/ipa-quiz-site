// IPA公式冊子から転記。原典・照合記録: ../2017-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2017_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2017a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 1,
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
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 2,
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
    "explanation": "正解はエ。全体の呼の発生頻度は180÷180秒＝1回/秒。呼量は単位時間当たりの呼数×平均保留時間なので，1×80＝80アーランになる。",
    "choiceExplanations": {
      "ア": "電話機全体の呼数と平均保留時間を同じ時間単位で掛け合わせる必要があり，4にはならない。",
      "イ": "180台全体では毎秒1回の呼が発生するため，保留時間80秒を掛けた値は12ではない。",
      "ウ": "保留時間を分に直すと80/60分である。毎分60回の呼に掛けると80となり，45ではない。",
      "エ": "180台×1回/180秒×80秒＝80アーランとなる。発着呼の合計が与えられているので更に2倍にはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2017a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
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
      "ウ": "ルーティング情報の更新にマルチキャストを用いている。",
      "エ": "ルーティング情報の更新を30秒ごとに行う。"
    },
    "answer": "イ",
    "explanation": "正解はイ。OSPFはリンク状態型のルーティングプロトコルで，リンク状態のデータベースから経路を計算する。RIP-2は距離ベクトル型である。",
    "choiceExplanations": {
      "ア": "RIP-2もサブネットマスクを経路情報に含められるので，OSPFだけの特徴にはならない。",
      "イ": "リンク状態をデータベースとして保持して経路を計算するのは，リンク状態型のOSPFの特徴である。",
      "ウ": "RIP-2も更新情報の送信にマルチキャストを使うため，OSPFだけの特徴ではない。",
      "エ": "30秒ごとの定期的な経路情報の更新はRIPの特徴であり，OSPFだけに当てはまるものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "VLAN",
    "topicTags": [
      "VLAN"
    ],
    "difficulty": 2,
    "question": "IEEE 802.1Qで規定されたVLANのVID（VLAN Identifier）のビット長はどれか。",
    "choices": {
      "ア": "8",
      "イ": "10",
      "ウ": "12",
      "エ": "16"
    },
    "answer": "ウ",
    "explanation": "正解はウ。VLANを識別するVIDは12ビットである。タグ全体や，優先度なども含むフィールド全体の長さと混同しない。",
    "choiceExplanations": {
      "ア": "VIDの長さは12ビットであり，8ビットでは必要な識別範囲を表せない。",
      "イ": "10ビットではなく12ビットを用いてVLANの識別子を表す。",
      "ウ": "IEEE 802.1QのVIDは12ビットのフィールドであり，これが公式正答である。",
      "エ": "16ビットはVIDだけの長さではない。VID以外の制御情報も含めた長さと区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
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
    "explanation": "正解はエ。スパニングツリーはブリッジ間の冗長経路によるループを防ぐ。ルートブリッジは，優先順位とMACアドレスを含むブリッジIDで決める。",
    "choiceExplanations": {
      "ア": "ブリッジによるフレーム転送を制御する，データリンク層のプロトコルである。",
      "イ": "ループを避けるため一部の経路を遮断する。冗長な経路全てで同時に転送する仕組みではない。",
      "ウ": "ブロードキャスト自体は禁止せず，ループのない経路に沿って必要なブリッジへ転送する。",
      "エ": "優先順位とMACアドレスに基づくブリッジIDを比較してルートを決めるので，適切である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "DNS",
    "topicTags": [
      "DNS"
    ],
    "difficulty": 3,
    "question": "DNSゾーンデータファイルのMXレコードに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "先頭フィールド（NAMEフィールド）には，メールアドレスのドメイン名を記述する。",
      "イ": "プリファレンス値が大きい方が優先度は高い。",
      "ウ": "メール交換ホストをIPアドレスで指定する。",
      "エ": "メールサーバの別名を記述できる。"
    },
    "answer": "ア",
    "explanation": "正解はア。MXレコードは，メールアドレスのドメインに対する配送先メール交換ホストを示す。配送先はホスト名で指定し，プリファレンス値は小さい方を優先する。",
    "choiceExplanations": {
      "ア": "そのドメイン宛てのメール配送先を定義するため，NAMEにはメールアドレスのドメイン名を記述する。",
      "イ": "プリファレンス値は小さい方を優先する。数値の大小と優先順位が逆である。",
      "ウ": "配送先はIPアドレスではなくホスト名で指定し，そのホスト名からアドレスを解決する。",
      "エ": "配送先には正規のホスト名を指定する。CNAMEで定義した別名を配送先にする記述は適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
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
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "IPv6",
    "topicTags": [
      "IPv6"
    ],
    "difficulty": 3,
    "question": "IPv6のIPアドレスに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "IPv4に比べてアドレスフィールドが拡張されたので，ルータでの中継処理の遅延が増加する。",
      "イ": "IPアドレスは10進数を用いる表記が推奨されている。",
      "ウ": "上位96ビットを全て1としたアドレスはIPv4射影アドレスとして使用される。",
      "エ": "ホストはルータからの情報によって自分のIPアドレスを自動設定できる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。IPv6では，ルータ広告で通知されるプレフィックスなどを使ってホストがアドレスを自動設定できる。アドレス長が増えたことだけから中継遅延の増加は断定できない。",
    "choiceExplanations": {
      "ア": "アドレスの長さだけで処理遅延が増えるとはいえない。IPv6の基本ヘッダの構成も考慮する必要がある。",
      "イ": "IPv6アドレスは通常，16進数のグループをコロンで区切って表記する。10進数の推奨ではない。",
      "ウ": "IPv4射影アドレスは上位96ビット全てが1という形式ではないので，このビット列の説明は誤りである。",
      "エ": "ルータ広告のプレフィックス情報などを利用するステートレスアドレス自動設定が可能である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "SMTP",
    "topicTags": [
      "SMTP"
    ],
    "difficulty": 3,
    "question": "SMTPに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "SMTPサーバは，SMTPクライアントのHELOコマンドに対して利用できる拡張機能の一覧を応答する。",
      "イ": "宛先のメールアドレスが複数ある場合は，SMTPの一つのRCPTコマンドにまとめて指定する。",
      "ウ": "差出人のメールアドレスは，SMTPのDATAコマンドに指定する。",
      "エ": "迷惑メールの防止のために，メールクライアントからの電子メール送信とメールサーバ間での電子メール転送とで，異なるポート番号を利用できる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。利用者からのメール投稿とメールサーバ間の転送を別のポートで扱うと，投稿側に認証などの制御を適用しやすい。SMTPの宛先や差出人を伝えるコマンドも区別する。",
    "choiceExplanations": {
      "ア": "拡張機能の一覧を応答するのはEHLOに対する動作であり，HELOと混同している。",
      "イ": "RCPTは宛先ごとに発行する。複数の宛先を一つのRCPTにまとめる説明は適切でない。",
      "ウ": "エンベロープの差出人はMAIL FROMで指定する。DATAは本文などのメールデータを送るためのコマンドである。",
      "エ": "利用者のメール投稿とサーバ間の配送を分け，それぞれ異なるポート番号で受け付けられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 10,
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
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "フロー制御",
    "topicTags": [
      "フロー制御"
    ],
    "difficulty": 3,
    "question": "ネットワークの制御に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "TCPでは，ウィンドウサイズが固定で輻輳回避ができないので，輻輳が起きると，データに対してタイムアウト処理が必要になる。",
      "イ": "誤り制御方式の一つであるフォワード誤り訂正方式は，受信側で誤りを検出し，送信側にデータの再転送を要求する方式である。",
      "ウ": "ウィンドウによるフロー制御では，応答確認があったブロック数だけウィンドウをずらすことによって，複数のデータをまとめて送ることができる。",
      "エ": "データグラム方式では，両端を結ぶ仮想の通信路を確立し，以降は全てその経路を通すことによって，経路選択のオーバヘッドを小さくしている。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ウィンドウ制御では，一定量のデータを確認応答を待たずに送信できる。確認できた分だけ送信可能な範囲を先へ進め，効率よく連続送信する。",
    "choiceExplanations": {
      "ア": "TCPのウィンドウは固定ではなく，受信側の状態や輻輳への対処に応じて送信量を制御する。",
      "イ": "再送要求はARQの説明である。フォワード誤り訂正は冗長な情報を使って受信側で訂正する。",
      "ウ": "確認応答を受けたデータの分だけウィンドウを移動させ，複数データを連続して送れる。",
      "エ": "事前に仮想通信路を確立するのは仮想回線方式である。データグラム方式は個々のパケットを独立に扱う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "サブネット",
    "topicTags": [
      "サブネット"
    ],
    "difficulty": 3,
    "question": "ネットワークアドレス192.168.10.192/28のサブネットにおけるブロードキャストアドレスはどれか。",
    "choices": {
      "ア": "192.168.10.199",
      "イ": "192.168.10.207",
      "ウ": "192.168.10.223",
      "エ": "192.168.10.255"
    },
    "answer": "イ",
    "explanation": "正解はイ。/28ではホスト部が4ビットなので，1サブネットは16アドレス。192から207までが範囲となり，ホスト部を全て1にした207がブロードキャストアドレスである。",
    "choiceExplanations": {
      "ア": "199は192～207の範囲の途中にあり，ホスト部が全て1になっていない。",
      "イ": "開始値192に15を加えた207が，この/28サブネットの末尾のアドレスである。",
      "ウ": "223は208から始まる次の/28サブネットの末尾であり，指定のサブネットとは異なる。",
      "エ": "255はこの/28サブネットの範囲外であり，指定されたネットワークのブロードキャストではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2017a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "SDN",
    "topicTags": [
      "SDN"
    ],
    "difficulty": 3,
    "question": "SDN（Software-Defined Networking）で利用されるOpenFlowプロトコルの説明として，適切なものはどれか。ここで，ネットワーク機器はOpenFlowに対応しているものとする。",
    "choices": {
      "ア": "ネットワーク機器の制御のためのプロトコルであり，ネットワーク機器のフローテーブルの情報をコントローラから提供するときに使用される。",
      "イ": "ネットワークの構成管理や性能管理のためのプロトコルであり，管理マネージャと呼ばれるプログラムがネットワーク機器のMIBを取得するときに使用される。",
      "ウ": "ネットワークのトラフィックを分析するためのプロトコルであり，フロー（IPアドレスやポート番号の組合せ）ごとの統計情報を，ネットワーク機器がコレクタと呼ばれるサーバに送信するときに使用される。",
      "エ": "レイヤ2の冗長化のためのプロトコルであり，ネットワーク機器がループを検知するときや障害時の迂回ルートを決定するときなどに，ネットワーク機器間の通信に使用される。"
    },
    "answer": "ア",
    "explanation": "正解はア。OpenFlowは，コントローラから対応するスイッチなどのフローテーブルを制御するために使う。管理情報取得やフロー統計の収集だけを目的とするプロトコルとは異なる。",
    "choiceExplanations": {
      "ア": "パケットの一致条件と処理などを表すフローテーブルをコントローラが制御する説明に一致する。",
      "イ": "MIBの情報を管理側から取得するのはSNMPによる管理の説明であり，OpenFlowの説明ではない。",
      "ウ": "フロー統計をコレクタへ送るのはNetFlowやIPFIXなどの用途である。フローテーブルの制御とは区別する。",
      "エ": "レイヤ2のループ回避や障害時の経路切替えはスパニングツリー系のプロトコルの用途である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "FTP",
    "topicTags": [
      "FTP"
    ],
    "difficulty": 3,
    "question": "FTPによるファイル転送には，制御用とデータ転送用の二つのコネクションが用いられる。これらのコネクションに関する記述のうち，適切なものはどれか。ここで，FTPはパッシブモードで動作するものとする。",
    "choices": {
      "ア": "制御用コネクションの確立はクライアントからサーバに対して，データ転送用コネクションの確立はサーバからクライアントに対して行う。",
      "イ": "制御用コネクションの確立はサーバからクライアントに対して，データ転送用コネクションの確立はクライアントからサーバに対して行う。",
      "ウ": "どちらのコネクションの確立もクライアントからサーバに対して行う。",
      "エ": "どちらのコネクションの確立もサーバからクライアントに対して行う。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。パッシブモードでは，サーバがデータ接続の待受け先を通知し，クライアントからそこへ接続する。制御接続もクライアントが開始するため，両方ともクライアント起点となる。",
    "choiceExplanations": {
      "ア": "データ接続をサーバから開始するのはアクティブモードの動作であり，設問の条件に合わない。",
      "イ": "制御接続はクライアントから開始する。データ接続の向きだけが合っていても全体として誤りである。",
      "ウ": "パッシブモードでは制御用もデータ用もクライアントからサーバへ接続を開始する。",
      "エ": "制御接続をサーバから開始することも，パッシブモードでデータ接続をサーバから開始することも誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
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
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "マルウェア対策",
    "topicTags": [
      "マルウェア対策"
    ],
    "difficulty": 3,
    "question": "ウイルスの検出手法であるビヘイビア法を説明したものはどれか。",
    "choices": {
      "ア": "あらかじめ特徴的なコードをパターンとして登録したウイルス定義ファイルを用いてウイルス検査対象と比較し，同じパターンがあれば感染を検出する。",
      "イ": "ウイルスに感染していないことを保証する情報をあらかじめ検査対象に付加しておき，検査時に不整合があれば感染を検出する。",
      "ウ": "ウイルスの感染が疑わしい検査対象を，安全な場所に保管されている原本と比べ，異なっていれば感染を検出する。",
      "エ": "ウイルスの感染や発病によって生じるデータの読込みと書込み動作や通信などを監視して，感染を検出する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ビヘイビア法は，プログラムの振る舞いを監視して不審な動作を検出する。既知のコードパターンとの照合や，原本との差分検査とは観察する対象が異なる。",
    "choiceExplanations": {
      "ア": "既知の特徴的なコードとの一致を見るパターンマッチング法の説明であり，振る舞いの監視ではない。",
      "イ": "事前に付けた検証情報との整合性を調べる方法であり，実行中の振る舞いを監視する方法とは異なる。",
      "ウ": "保管してある正常な原本との比較による検出であり，動作や通信の監視ではない。",
      "エ": "読書きや通信などの行動を監視し，感染に伴う不審な振る舞いを見つける方法である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "攻撃の観測",
    "topicTags": [
      "攻撃の観測"
    ],
    "difficulty": 4,
    "question": "未使用のIPアドレス空間であるダークネットに到達する通信の観測において，送信元IPアドレスがA，送信元ポート番号が80/tcpのSYN/ACKパケットを受信した場合に想定できる攻撃はどれか。",
    "choices": {
      "ア": "IPアドレスAを攻撃先とするサービス妨害攻撃",
      "イ": "IPアドレスAを攻撃先とするパスワードリスト攻撃",
      "ウ": "IPアドレスAを攻撃元とするサービス妨害攻撃",
      "エ": "IPアドレスAを攻撃元とするパスワードリスト攻撃"
    },
    "answer": "ア",
    "explanation": "正解はア。未使用アドレスからSYNを送っていないのにAからSYN/ACKが届いたなら，攻撃者が送信元をその未使用アドレスに偽装してAへSYNを送った可能性がある。観測した通信はAへの攻撃の応答に当たる。",
    "choiceExplanations": {
      "ア": "Aが偽装されたSYNの送信先になり，Aからの応答がダークネットへ戻ったと考えると整合する。",
      "イ": "SYN/ACKはTCP接続確立時の応答であり，パスワード認証の試行を示す情報ではない。",
      "ウ": "この観測ではAからのSYN/ACKを応答と解釈するため，Aを攻撃元と決める説明は適切でない。",
      "エ": "パスワードの試行内容は観測されておらず，Aが攻撃元であることもこの応答だけからはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "デジタルフォレンジックス",
    "topicTags": [
      "デジタルフォレンジックス"
    ],
    "difficulty": 2,
    "question": "ディジタルフォレンジックスに該当するものはどれか。",
    "choices": {
      "ア": "画像や音楽などのディジタルコンテンツに著作権者などの情報を埋め込む。",
      "イ": "コンピュータやネットワークのセキュリティ上の弱点を発見するテスト手法の一つであり，システムを実際に攻撃して侵入を試みる。",
      "ウ": "ネットワークの管理者や利用者などから，巧みな話術や盗み聞き，盗み見などの手段によって，パスワードなどのセキュリティ上重要な情報を入手する。",
      "エ": "犯罪に関する証拠となり得るデータを保全し，その後の訴訟などに備える。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ディジタルフォレンジックスでは，電子的な証拠を適切に保全し，調査・分析して訴訟などに備える。侵入テストや情報の聞き出しとは目的が異なる。",
    "choiceExplanations": {
      "ア": "コンテンツに権利者などの情報を埋め込むのは電子透かしであり，証拠保全の説明ではない。",
      "イ": "実際に侵入を試みて弱点を調べるのはペネトレーションテストの説明である。",
      "ウ": "人の心理や行動を利用して情報を入手するソーシャルエンジニアリングの説明である。",
      "エ": "証拠となる電子データを保全して後の調査や訴訟に備える点がフォレンジックスに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "DNSSEC",
    "topicTags": [
      "DNSSEC"
    ],
    "difficulty": 3,
    "question": "DNSSECの機能はどれか。",
    "choices": {
      "ア": "DNSキャッシュサーバの設定によって再帰的な問合せを受け付ける送信元の範囲が最大になるようにする。",
      "イ": "DNSサーバから受け取るリソースレコードに対するディジタル署名を利用して，リソースレコードの送信者の正当性とデータの完全性を検証する。",
      "ウ": "ISPなどのセカンダリDNSサーバを利用してDNSコンテンツサーバを二重化することによって，名前解決の可用性を高める。",
      "エ": "共通鍵暗号技術とハッシュ関数を利用したセキュアな方法によって，DNS更新要求が許可されているエンドポイントを特定して認証する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。DNSSECはDNSのデータに付いたディジタル署名を検証し，応答の出所と改ざんの有無を確かめる。サーバの二重化や再帰問合せの許可範囲を決める機能ではない。",
    "choiceExplanations": {
      "ア": "再帰問合せの受付範囲はアクセス制御の設定であり，DNSSECの署名検証とは関係しない。",
      "イ": "リソースレコードの署名によってデータの真正性と完全性を検証する点がDNSSECの機能に一致する。",
      "ウ": "セカンダリDNSによる冗長化は可用性の対策であり，応答データの署名を検証するDNSSECとは別である。",
      "エ": "共通鍵とハッシュによる更新要求の認証はTSIGなどの用途であり，DNSSECの公開鍵署名による検証とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "ネットワーク分離",
    "topicTags": [
      "ネットワーク分離"
    ],
    "difficulty": 3,
    "question": "内部ネットワーク上のPCからインターネット上のWebサイトを参照するときは，DMZ上のVDI（Virtual Desktop Infrastructure）サーバにログインし，VDIサーバ上のWebブラウザを必ず利用するシステムを導入する。インターネット上のWebサイトから内部ネットワーク上のPCへのマルウェアの侵入，及びPCからインターネット上のWebサイトへのデータ流出を防止するのに効果がある条件はどれか。",
    "choices": {
      "ア": "PCとVDIサーバ間は，VDIの画面転送プロトコル及びファイル転送を利用する。",
      "イ": "PCとVDIサーバ間は，VDIの画面転送プロトコルだけを利用する。",
      "ウ": "VDIサーバが，プロキシサーバとしてHTTP通信を中継する。",
      "エ": "VDIサーバが，プロキシサーバとしてVDIの画面転送プロトコルだけを中継する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ブラウザをDMZ上で動かし，PCとの間を画面転送だけに制限すれば，ファイルを直接持ち込んだり持ち出したりする経路を減らせる。設問の構成ではPCとVDIサーバ間の制限が要点になる。",
    "choiceExplanations": {
      "ア": "ファイル転送も許可すると，マルウェアや内部データが移動する経路が残るため，条件として不十分である。",
      "イ": "PCとVDIサーバ間を画面転送だけに絞ることで，ファイルの直接的な受渡しを制限できる。",
      "ウ": "HTTPを単に中継するだけでは，内部PCを外部Webコンテンツから分離する条件にならない。",
      "エ": "VDIサーバ上のブラウザを使う設問であり，プロキシとして画面転送だけを中継する構成は条件と一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "DNS攻撃対策",
    "topicTags": [
      "DNS攻撃対策"
    ],
    "difficulty": 3,
    "question": "DNSの再帰的な問合せを使ったサービス不能攻撃（DNS amp攻撃）の踏み台にされることを防止する対策はどれか。",
    "choices": {
      "ア": "DNSサーバをキャッシュサーバとコンテンツサーバに分離し，インターネット側からキャッシュサーバに問合せできないようにする。",
      "イ": "問合せがあったドメインに関する情報をWhoisデータベースで確認してからキャッシュサーバに登録する。",
      "ウ": "一つのDNSレコードに複数のサーバのIPアドレスを割り当て，サーバへのアクセスを振り分けて分散させるように設定する。",
      "エ": "他のDNSサーバから送られてくるIPアドレスとホスト名の対応情報の信頼性を，ディジタル署名で確認するように設定する。"
    },
    "answer": "ア",
    "explanation": "正解はア。第三者から再帰問合せを受け付けるオープンリゾルバは，応答を被害者へ反射する踏み台にされ得る。キャッシュサーバを外部から利用できないように制限する。",
    "choiceExplanations": {
      "ア": "再帰問合せを処理するサーバへの外部からのアクセスを制限し，第三者に応答を反射させる経路を塞ぐ。",
      "イ": "Whoisの確認は，偽装された送信元を使う再帰問合せへのアクセス制限の代わりにはならない。",
      "ウ": "応答先を分散させる負荷分散の設定であり，再帰問合せの不正利用を止める対策ではない。",
      "エ": "署名検証はDNSデータの真正性を確認する対策であり，再帰問合せを悪用する踏み台化は防げない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "メモリ",
    "topicTags": [
      "メモリ"
    ],
    "difficulty": 2,
    "question": "MLC（Multi-Level Cell）フラッシュメモリの特徴として，適切なものはどれか。",
    "choices": {
      "ア": "コンデンサに蓄えた電荷を用いて，データを記憶する。",
      "イ": "電気抵抗の値を用いて，データを記憶する。",
      "ウ": "一つのメモリセルに2ビット以上のデータを記憶する。",
      "エ": "フリップフロップを利用して，データを記憶する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。MLCは一つのセルで複数の状態を区別し，2ビット以上の情報を記憶する。1セル1ビットの方式と比べ，セル当たりの記憶密度を高められる。",
    "choiceExplanations": {
      "ア": "コンデンサの電荷を用いて記憶するのはDRAMの説明であり，MLCの特徴を表していない。",
      "イ": "電気抵抗の状態を使う抵抗変化型メモリの説明であり，MLCフラッシュの特徴ではない。",
      "ウ": "一つのセルに複数ビットを保持することがMulti-Level Cellの特徴である。",
      "エ": "フリップフロップで記憶するのはSRAMの説明であり，フラッシュメモリのMLCとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "待ち行列",
    "topicTags": [
      "待ち行列"
    ],
    "difficulty": 4,
    "question": "複数台のPCで1台のプリンタを共有するシステムがある。このプリンタに対する平均印刷要求回数が毎分1回のとき，このプリンタの平均印刷時間（印刷を要求してから終了するまでの時間）は何秒か。ここで，プリンタは，平均が15秒の指数分布に従う時間で印刷要求を処理するものとし，プリンタに対する印刷要求はポアソン分布に従うものとする。",
    "choices": {
      "ア": "15",
      "イ": "18",
      "ウ": "20",
      "エ": "30"
    },
    "answer": "ウ",
    "explanation": "正解はウ。M/M/1の待ち行列として，利用率はρ＝15/60＝0.25。待ち時間を含む平均応答時間は平均処理時間÷(1−ρ)なので，15÷0.75＝20秒である。",
    "choiceExplanations": {
      "ア": "15秒は印刷処理そのものの平均である。設問は要求から完了までなので待ち時間を含める。",
      "イ": "平均応答時間は15÷(1−0.25)で求めるため18秒ではない。利用率を単純に足す計算はできない。",
      "ウ": "到着率1/60回/秒，平均処理時間15秒から，平均応答時間は15/(1−15/60)＝20秒となる。",
      "エ": "30秒になるのはこの計算で利用率が0.5のときである。与えられた条件での利用率は0.25である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2017a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "使用性",
    "topicTags": [
      "使用性"
    ],
    "difficulty": 2,
    "question": "ソフトウェアの使用性を向上させる施策として，適切なものはどれか。",
    "choices": {
      "ア": "オンラインヘルプを充実させ，利用方法を理解しやすくする。",
      "イ": "外部インタフェースを見直し，連携できる他システムを増やす。",
      "ウ": "機能を追加し，業務においてシステムが利用できる範囲を拡大する。",
      "エ": "ファイルの複製を分散して配置し，障害によるシステム停止のリスクを減らす。"
    },
    "answer": "ア",
    "explanation": "正解はア。使用性は，利用者にとっての理解しやすさや操作しやすさなどに関わる。オンラインヘルプで使い方を把握しやすくする施策が直接対応する。",
    "choiceExplanations": {
      "ア": "利用方法を理解しやすくする支援は，利用者がソフトウェアを使いやすくする施策に当たる。",
      "イ": "他システムと接続できる範囲を広げる施策であり，利用方法の理解しやすさを直接改善するものではない。",
      "ウ": "提供する機能の範囲を広げる施策であり，機能を増やしただけで使用性が向上するとは限らない。",
      "エ": "障害による停止を抑える施策は信頼性や可用性に関わり，使用性の改善とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2017a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "アジャイル開発",
    "topicTags": [
      "アジャイル開発"
    ],
    "difficulty": 2,
    "question": "XP（eXtreme Programming）のプラクティスの一つであるものはどれか。",
    "choices": {
      "ア": "構造化プログラミング",
      "イ": "コンポーネント指向プログラミング",
      "ウ": "ビジュアルプログラミング",
      "エ": "ペアプログラミング"
    },
    "answer": "エ",
    "explanation": "正解はエ。XPのペアプログラミングでは二人が一組で実装と確認を協力して進める。プログラムの構造や部品化，画面を使った記述方法を表す他の選択肢とは異なる。",
    "choiceExplanations": {
      "ア": "制御構造を整理してプログラムを組み立てる考え方であり，ここで問われるXP固有のプラクティスではない。",
      "イ": "部品として組み合わせられるコンポーネントを中心に構成する方法であり，XPのペア作業の実践とは異なる。",
      "ウ": "視覚的な表現を用いてプログラムを作成する方法であり，XPのプラクティスとしての正答ではない。",
      "エ": "二人が協力してコードを書き確認するペアプログラミングは，XPの代表的なプラクティスである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
