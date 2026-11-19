// IPA公式冊子から転記。原典・照合記録: ../2012-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2012_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2012a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "BGP",
    "topicTags": [
      "BGP"
    ],
    "difficulty": 3,
    "question": "BGP-4におけるASに関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "あるルータが作成したRouter-LSAが伝播するルータの集合である。",
      "イ": "接続されるルータの数，ブロードキャストやマルチキャストの使用の有無，トポロジ種別などによって区分けされたネットワーク群であり，Helloプロトコルによって隣接関係を確立する。",
      "ウ": "同一の管理ポリシによって管理されるネットワーク群であり，2オクテット又は4オクテットのAS番号によって識別される。",
      "エ": "リンクステート型の共通のプロトコルを使用して，ルーティング情報を相互に交換するルータの集合である。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ASはAutonomous Systemの略で，同一の管理ポリシの下で運用するネットワーク群を指す。BGPではAS番号を使って，経路が通過するASなどを識別する。",
    "choiceExplanations": {
      "ア": "Router-LSAの伝播範囲はOSPFのエリアに関する説明であり，BGPで扱うASの定義ではない。",
      "イ": "Helloによる隣接関係や接続形態の説明はOSPFなどの動作に関するもので，ASそのものの定義とは異なる。",
      "ウ": "同一管理ポリシのネットワーク群をAS番号で識別する点が正しい。AS番号には2オクテットと4オクテットがある。",
      "エ": "ASの内部で必ず共通のリンクステート型プロトコルを使うわけではなく，管理ポリシのまとまりである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
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
    "explanation": "正解はウ。OFDMは直交周波数分割多重であり，多数のサブキャリアを互いに直交させて配置する。設問の“複数のサブキャリア”と“互いに干渉しない”が手掛かりになる。",
    "choiceExplanations": {
      "ア": "CCKは符号化に関する方式であり，多数の直交サブキャリアを並べる多重化の名称ではない。",
      "イ": "CDMは符号を使って通信を分離する多重方式であり，周波数を直交サブキャリアへ分ける説明ではない。",
      "ウ": "直交した複数のサブキャリアにデータを分けて伝送する方式がOFDMである。",
      "エ": "TDMは時間を区切って複数の信号を運ぶ方式であり，サブキャリアを直交配置する方式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "VoIP",
    "topicTags": [
      "VoIP"
    ],
    "difficulty": 3,
    "question": "CS-ACELP（G.729）による8kビット/秒の音声符号化を行うVoIPゲートウェイ装置において，パケットを生成する周期が20ミリ秒のとき，1パケットに含まれる音声ペイロードは何バイトか。",
    "choices": {
      "ア": "20",
      "イ": "160",
      "ウ": "200",
      "エ": "1,000"
    },
    "answer": "ア",
    "explanation": "正解はア。8,000ビット/秒の音声を0.02秒分まとめるので，1パケットの音声は160ビット。1バイトは8ビットなので160÷8＝20バイトとなる。",
    "choiceExplanations": {
      "ア": "8,000×0.02＝160ビットを8で割り，音声ペイロード20バイトを得る。ヘッダは設問の対象外である。",
      "イ": "160は20ミリ秒分のビット数であり，バイト数にするには更に8で割る必要がある。",
      "ウ": "20ミリ秒を0.02秒に換算して計算すると20バイトとなり，200バイトではない。",
      "エ": "1,000バイトは8kビットの1秒分に相当する。1パケットはそのうち20ミリ秒分である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2012a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "ネットワーク容量",
    "topicTags": [
      "ネットワーク容量"
    ],
    "difficulty": 3,
    "question": "図のネットワークで，数字は二つの地点間で同時に使用できる論理回線の多重度を示している。X地点からY地点までは同時に最大幾つの論理回線を使用することができるか。",
    "choices": {
      "ア": "8",
      "イ": "9",
      "ウ": "10",
      "エ": "11"
    },
    "answer": "ウ",
    "explanation": "正解はウ。X・A・Bの集合と残りの地点の間を横切る回線の容量はX-Cの3，B-Cの1，A-Dの1，B-Dの2，B-Eの3の計10で，これが上限になる。実際に容量内で計10の回線を通せるため，最大値は10である。",
    "choiceExplanations": {
      "ア": "容量制約を守りながら10本を通す経路の組合せが存在するため，8本は最大値ではない。",
      "イ": "X-A-D-Yに1，X-A-B-D-Yに2，X-B-E-Yに3などを流せば，更に他経路も使って10まで増やせる。",
      "ウ": "最小カットの容量10が上限であり，経路を配分してその10を実現できるので最大値は10となる。",
      "エ": "Xから出る容量の合計は11だが，その先のX・A・Bと残りを分ける切断面の容量が10に制限する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/nw/2012-autumn-am2-q4.png"
    ],
    "imageAltTexts": [
      "X・YとA〜Gを結ぶ容量ネットワーク。X-A4，X-B4，X-C3，A-B2，B-C1，A-D1，B-D2，B-E3，C-F4，F-E2，F-G3，D-E2，E-G4，D-Y3，E-Y3，G-Y6。"
    ]
  },
  {
    "id": "nw-2012a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "ADSL",
    "topicTags": [
      "ADSL"
    ],
    "difficulty": 3,
    "question": "ADSLの上りの伝送速度が下りよりも遅くなっていることの説明として，適切なものはどれか。",
    "choices": {
      "ア": "ISDNとの干渉を防止するためである。",
      "イ": "加入者宅のADSLモデムとその対向先であるADSL集合モデムとの間を流れるATMセル仕様で制限されているからである。",
      "ウ": "通信事業者やインターネットサービスプロバイダ側でセキュリティチェックを行うからである。",
      "エ": "上りの変調周波数帯域が，下りの変調周波数帯域と比べて狭いからである。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ADSLは上りと下りで非対称の速度を持ち，下りにより広い周波数帯域を割り当てる。上りが遅い理由は，セキュリティ処理時間ではなく利用する帯域幅の違いである。",
    "choiceExplanations": {
      "ア": "他方式との干渉は伝送品質に関係するが，設問の上下速度差を説明するのは割り当てる帯域幅の非対称性である。",
      "イ": "ATMセルの形式が上りだけの伝送速度を制限するのではなく，ADSLの周波数帯域の割当てによって差が生じる。",
      "ウ": "上りの物理的な伝送速度が低い理由はセキュリティチェックの処理時間ではなく，変調に使う帯域幅の違いである。",
      "エ": "上りに割り当てる周波数帯域が下りより狭いため，運べるデータ量も上りの方が小さくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "LANアクセス制御",
    "topicTags": [
      "LANアクセス制御"
    ],
    "difficulty": 3,
    "question": "CSMA方式のLAN制御に関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "キャリア信号を検出し，データの送信を制御する。",
      "イ": "送信権をもつメッセージ（トークン）を得た端末がデータを送信する。",
      "ウ": "データ送信中に衝突が起こった場合は，直ちに再送を行う。",
      "エ": "伝送路が使用中でもデータの送信はできる。"
    },
    "answer": "ア",
    "explanation": "正解はア。CSMAは搬送波を検出して伝送路の使用状態を調べるアクセス方式である。伝送路が空いていることを確認して送信するため，トークンによる送信権の受渡しとは異なる。",
    "choiceExplanations": {
      "ア": "Carrier Senseという名称のとおり，キャリアを検出して伝送路の状態に応じた送信制御を行う。",
      "イ": "トークンを取得した端末だけが送信する方式はトークンパッシングであり，CSMAではない。",
      "ウ": "衝突後に各端末が直ちに再送すると再び衝突しやすい。CSMA/CDでは待ち時間を設けてから再送する。",
      "エ": "CSMAはキャリアを検出して使用状態を確認する。使用中かどうかを無視して送信する方式ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "OSPF",
    "topicTags": [
      "OSPF"
    ],
    "difficulty": 3,
    "question": "IPネットワークのルーティングプロトコルの一つであるOSPFの説明として，適切なものはどれか。",
    "choices": {
      "ア": "自律システム間の接続に使用され，経路が変化したときだけ，その差分を送信する。",
      "イ": "自律システム内で使用され，距離ベクトルとリンクステートの両アルゴリズムを採用したルーティングプロトコルである。",
      "ウ": "ネットワークを，エリアと呼ぶ小さな単位に分割し，エリア間をバックボーンで結ぶ形態を採り，回線速度などを考慮した最小コストルーティングのプロトコルである。",
      "エ": "ホップ数に基づいて最短経路を動的に決定する。サブネット情報を通知できないので，大規模のネットワークには不向きである。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。OSPFはリンクステート型のAS内経路制御で，エリアによる階層化ができる。エリア間をバックボーンでつなぎ，コストが小さい経路を選択する。",
    "choiceExplanations": {
      "ア": "AS間で経路情報を交換する説明はBGPに相当する。OSPFは主にAS内の経路制御に用いる。",
      "イ": "OSPFはリンクステート方式であり，距離ベクトルとの両アルゴリズムを採用するという説明は合わない。",
      "ウ": "エリアとバックボーンによる階層構成，及びコストによる最短経路選択はOSPFの特徴である。",
      "エ": "ホップ数を使いサブネット情報を通知しないという説明はRIP-1に相当し，OSPFではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "誤り制御",
    "topicTags": [
      "誤り制御"
    ],
    "difficulty": 3,
    "question": "ハミング符号の用途の説明として，適切なものはどれか。",
    "choices": {
      "ア": "Bluetooth通信で，ビット誤りを訂正するために使われている。",
      "イ": "G3ファクシミリで画像データの圧縮に使われている。",
      "ウ": "HDLCフレーム内のビット誤りを検出するために使われている。",
      "エ": "MP3でオーディオデータの圧縮に使われている。"
    },
    "answer": "ア",
    "explanation": "正解はア。ハミング符号は冗長なビットを付けて誤りの位置を特定し，訂正するための符号である。選択肢のうち，Bluetoothにおけるビット誤りの訂正という用途が合う。",
    "choiceExplanations": {
      "ア": "Bluetooth通信での誤り訂正という用途が合う。ハミング符号は情報の圧縮ではなく誤り制御に使う。",
      "イ": "ファクシミリの画像圧縮で用いる符号化の説明であり，ハミング符号の誤り訂正という用途とは異なる。",
      "ウ": "HDLCフレームの誤り検出にはCRCを用いる。ハミング符号によるビット誤り訂正とは異なる。",
      "エ": "MP3のオーディオ圧縮はデータ量を減らす処理であり，冗長性を使って誤りを訂正するハミング符号とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "DNS",
    "topicTags": [
      "DNS"
    ],
    "difficulty": 3,
    "question": "DNSのAレコードに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "ゾーン内の登録データの開始マークである。",
      "イ": "ドメイン名とメールサーバの対応を示すものである。",
      "ウ": "ホスト名からIPアドレスへの対応を示すものである。",
      "エ": "ホスト名に別名を付けるためのものである。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。Aレコードはホスト名などのドメイン名とIPv4アドレスの対応を登録する。メール配送先のMXや，別名を登録するCNAMEなどと区別する。",
    "choiceExplanations": {
      "ア": "ゾーンの管理情報や開始に関する役割はSOAレコードに対応し，ホストのアドレスを登録するAとは異なる。",
      "イ": "ドメインのメール配送先を示すのはMXレコードであり，AレコードはIPv4アドレスを登録する。",
      "ウ": "名前からIPv4アドレスへの対応を記すレコードがAであり，選択肢の用途に一致する。",
      "エ": "別名を正規名へ対応付けるのはCNAMEレコードであり，Aレコードの役割ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "ICMP",
    "topicTags": [
      "ICMP"
    ],
    "difficulty": 3,
    "question": "IPv4におけるICMPのメッセージに関する説明として，適切なものはどれか。",
    "choices": {
      "ア": "送信元が設定したソースルーティングが失敗した場合は，Echo Replyを返す。",
      "イ": "転送されてきたデータグラムを受信したルータが，そのネットワークの最適なルータを送信元に通知して経路の変更を要請するには，Redirectを使用する。",
      "ウ": "フラグメントの再組立て中にタイムアウトが発生した場合は，データグラムを破棄してParameter Problemを返す。",
      "エ": "ルータでメッセージを転送する際に，受信側のバッファがあふれた場合にはTime Exceededを送り，送信ホストに送信を抑制することを促す。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ICMP Redirectは，送信元により適切な次ホップのルータを知らせるためのメッセージである。Echo Reply，Time Exceeded，Parameter Problemとは通知する状況が異なる。",
    "choiceExplanations": {
      "ア": "ソースルーティングの失敗は到達不能通知の対象であり，Echo Requestへの応答であるEcho Replyではない。",
      "イ": "受信したルータより適切な次ホップがあることを送信元へ知らせる用途に，Redirectを用いる。",
      "ウ": "フラグメント再組立ての時間切れはTime Exceededの対象であり，ヘッダ異常を知らせるParameter Problemではない。",
      "エ": "Time ExceededはTTLの超過や再組立ての時間切れを知らせるもので，バッファあふれによる送信抑制の通知ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "マルチキャスト",
    "topicTags": [
      "マルチキャスト"
    ],
    "difficulty": 3,
    "question": "マルチキャストグループへの参加や離脱をホストが通知したり，マルチキャストグループに参加しているホストの有無をルータがチェックするときに使用するプロトコルはどれか。",
    "choices": {
      "ア": "ARP",
      "イ": "IGMP",
      "ウ": "LDAP",
      "エ": "RIP"
    },
    "answer": "イ",
    "explanation": "正解はイ。IGMPはIPv4のマルチキャストグループへの参加状態をホストと隣接ルータの間で扱う。グループのメンバが存在するかどうかを確認するために使う。",
    "choiceExplanations": {
      "ア": "ARPはIPv4アドレスに対応するMACアドレスを求めるためのもので，マルチキャストの参加管理ではない。",
      "イ": "IGMPはホストのグループ参加状態の報告やルータからの問合せに用いるため，設問の用途に合う。",
      "ウ": "LDAPはディレクトリサービスへアクセスするためのプロトコルであり，マルチキャストの参加管理ではない。",
      "エ": "RIPはルータ間で経路情報を交換するプロトコルであり，ホストのマルチキャスト参加状態を調べるものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 12,
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
    "explanation": "正解はウ。トンネルモードでは元のIPパケット全体をESPの内側へ入れる。暗号化範囲はオリジナルIPヘッダからESPトレーラまでで，新IPヘッダ，ESPヘッダ，ESP認証データはこの範囲に含まれない。",
    "choiceExplanations": {
      "ア": "ESPヘッダは暗号化の対象外なので，ESPヘッダから始まるという範囲指定は合わない。",
      "イ": "トンネルモードではオリジナルIPヘッダも暗号化する。また，ESP認証データは暗号化範囲に含めない。",
      "ウ": "オリジナルIPヘッダ，TCPヘッダ，データ，ESPトレーラの範囲を暗号化する指定が正しい。",
      "エ": "外側の新IPヘッダはルータが転送に用いるため暗号化せず，ESP認証データもこの暗号化範囲の外である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2012-autumn-am2-q12.png"
    ],
    "imageAltTexts": [
      "左から新IPヘッダ，ESPヘッダ，オリジナルIPヘッダ，TCPヘッダ，データ，ESPトレーラ，ESP認証データの順に並ぶESPトンネルモードの電文形式。"
    ]
  },
  {
    "id": "nw-2012a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "IPv6",
    "topicTags": [
      "IPv6"
    ],
    "difficulty": 3,
    "question": "IPv4とIPv6の両方にある機能はどれか。",
    "choices": {
      "ア": "実時間処理用のパケットを処理するためのフローラベル",
      "イ": "パケットヘッダの誤りを検出するためのチェックサム",
      "ウ": "一つのパケットで複数のノードにデータを配送するマルチキャスト",
      "エ": "複数のノードのうち経路上最も近いノードにデータを配送するエニーキャスト"
    },
    "answer": "ウ",
    "explanation": "正解はウ。IPv4とIPv6はいずれもマルチキャストを扱う。注：エニーキャストもIPv4・IPv6双方で運用できることがRFC 4786に記載されている。",
    "choiceExplanations": {
      "ア": "フローラベルはIPv6ヘッダにあるフィールドであり，IPv4ヘッダには同じフィールドはない。",
      "イ": "IPv4ヘッダにはヘッダチェックサムがあるが，IPv6の基本ヘッダでは削除されている。",
      "ウ": "複数の受信ノードをグループとして扱うマルチキャストは，IPv4にもIPv6にもある。",
      "エ": "IPv6ではアドレス種別として規定されるが，IPv4でもエニーキャスト運用は可能である（RFC 4786）。本問の公式正答はウである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc4786.html#section-1",
      "https://www.rfc-editor.org/rfc/rfc4291.html#section-2.6"
    ]
  },
  {
    "id": "nw-2012a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "IPv6サブネット",
    "topicTags": [
      "IPv6サブネット"
    ],
    "difficulty": 3,
    "question": "2台のPCをIPv6ネットワークに接続するとき，2台ともプレフィックスが2001:db8:100:1000::/56のIPv6サブネットに入るようになるIPアドレスの組合せはどれか。",
    "choices": {
      "ア": "1台目のPC：2001:db8:100::aa:bb，2台目のPC：2001:db8:100::cc:dd",
      "イ": "1台目のPC：2001:db8:100:1000::aa:bb，2台目のPC：2001:db8:100:2000::cc:dd",
      "ウ": "1台目のPC：2001:db8:100:1010::aa:bb，2台目のPC：2001:db8:100:1020::cc:dd",
      "エ": "1台目のPC：2001:db8:100:1100::aa:bb，2台目のPC：2001:db8:100:1200::cc:dd"
    },
    "answer": "ウ",
    "explanation": "正解はウ。/56では先頭3ブロック48ビットに続く，第4ブロックの上位8ビットまでが共通になる。第4ブロックが16進数1000〜10ffなら範囲内なので，1010と1020の両方が入る。",
    "choiceExplanations": {
      "ア": "省略された第4ブロックは0000であり，上位8ビットが10ではないため指定プレフィックスには入らない。",
      "イ": "第4ブロック1000は範囲内だが，2000は上位8ビットが20なので，同じ/56の範囲から外れる。",
      "ウ": "1010と1020はいずれも第4ブロックの上位8ビットが10であり，指定された/56に含まれる。",
      "エ": "1100と1200は第4ブロックの上位8ビットが11と12なので，指定された10の範囲に含まれない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2012a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 15,
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
    "explanation": "正解はエ。MPLSではパケットに付けるラベルを手掛かりに転送する。中継時に毎回宛先IPアドレスだけを検索する方式とは異なり，ラベルに対応する転送処理を行う。",
    "choiceExplanations": {
      "ア": "IPに暗号化や認証を付け加える説明はIPsecであり，ラベルを使うMPLSとは異なる。",
      "イ": "L2FとPPTPを基にしたトンネリング方式の説明はL2TPに相当し，MPLSではない。",
      "ウ": "PPPフレームをIP網で運ぶトンネリングの説明であり，ラベルに基づくMPLSの転送ではない。",
      "エ": "パケットに付加した識別子であるラベルを使って転送する方式が，MPLSの説明に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "経路集約",
    "topicTags": [
      "経路集約"
    ],
    "difficulty": 3,
    "question": "IPv4アドレスが192.168.10.0/24〜192.168.58.0/24のネットワークを対象に経路を集約するとき，集約した経路のネットワークアドレスのビット数が最も多くなるものはどれか。",
    "choices": {
      "ア": "192.168.0.0/16",
      "イ": "192.168.0.0/17",
      "ウ": "192.168.0.0/18",
      "エ": "192.168.0.0/19"
    },
    "answer": "ウ",
    "explanation": "正解はウ。第3オクテット10は00001010，58は00111010で，共通する先頭は00の2ビット。先頭16ビットにこの2ビットを足して/18となり，192.168.0.0〜192.168.63.255を含む。",
    "choiceExplanations": {
      "ア": "/16でも対象範囲は含められるが，第3オクテットの共通する2ビットも固定できるため最長ではない。",
      "イ": "/17より長い/18でも10〜58の全範囲を含められるので，ビット数が最も多い選択肢ではない。",
      "ウ": "第3オクテットの上位2ビット00が共通するため，/18が対象全体を含む最長プレフィックスとなる。",
      "エ": "/19は第3オクテット0〜31までとなり，32〜58のネットワークを含められない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2012a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "HTTP認証",
    "topicTags": [
      "HTTP認証"
    ],
    "difficulty": 3,
    "question": "HTTPの認証機能を利用するクライアント側の処理として，適切なものはどれか。",
    "choices": {
      "ア": "ダイジェスト認証では，利用者IDとパスワードを“:”で連結したものを，MD5を使ってエンコードしAuthorizationヘッダで指定する。",
      "イ": "ダイジェスト認証では，利用者IDとパスワードを“:”で連結したものを，SHAを使ってエンコードしAuthorizationヘッダで指定する。",
      "ウ": "ベーシック認証では，利用者IDとパスワードを“:”で連結したものを，BASE64でエンコードしAuthorizationヘッダで指定する。",
      "エ": "ベーシック認証では，利用者IDとパスワードを“:”で連結したものを，エンコードせずにAuthorizationヘッダで指定する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。Basic認証では“利用者ID:パスワード”をBase64で符号化し，Authorizationヘッダに設定する。Base64は暗号化ではないので，通信路を保護する仕組みとは区別する。",
    "choiceExplanations": {
      "ア": "Digest認証は利用者IDとパスワードを単に連結してMD5に通すだけではなく，realmやnonceなども使って応答値を作る。",
      "イ": "Digest認証はIDとパスワードだけをSHAに通すという手順ではなく，サーバからのチャレンジなどを計算に含める。",
      "ウ": "利用者ID，コロン，パスワードを連結してBase64で表す手順が，HTTP Basic認証に合う。",
      "エ": "Basic認証でも利用者IDとパスワードをそのままの文字列で設定するのではなく，Base64で符号化する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc7617.html#section-2"
    ]
  },
  {
    "id": "nw-2012a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "WebDAV",
    "topicTags": [
      "WebDAV"
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
    "explanation": "正解はエ。WebDAVはHTTPを拡張し，Web上のリソースの作成や更新，管理などを行うためのプロトコルである。表示の装飾，データ形式，暗号化の仕組みとは役割が異なる。",
    "choiceExplanations": {
      "ア": "CSSは文書の表示や装飾を指定する仕組みであり，Webサーバのコンテンツ更新プロトコルではない。",
      "イ": "MIMEはデータの種類や符号化形式を表すための仕組みであり，サーバのコンテンツを編集するプロトコルではない。",
      "ウ": "SSLは通信の保護に関する仕組みであり，HTTPを拡張してリソースを編集するWebDAVとは異なる。",
      "エ": "HTTPにリソース管理のための機能を追加し，コンテンツのアップロードや更新を可能にする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "ディジタル証明書",
    "topicTags": [
      "ディジタル証明書"
    ],
    "difficulty": 3,
    "question": "CRL（Certificate Revocation List）はどれか。",
    "choices": {
      "ア": "有効期限切れになったディジタル証明書の公開鍵のリスト",
      "イ": "有効期限切れになったディジタル証明書のシリアル番号のリスト",
      "ウ": "有効期限内に失効したディジタル証明書の公開鍵のリスト",
      "エ": "有効期限内に失効したディジタル証明書のシリアル番号のリスト"
    },
    "answer": "エ",
    "explanation": "正解はエ。CRLは証明書失効リストであり，有効期限を迎える前に失効した証明書をシリアル番号で示す。公開鍵そのものの一覧や，単なる期限切れ証明書の一覧ではない。",
    "choiceExplanations": {
      "ア": "CRLの対象は期限前に失効した証明書であり，記載する識別情報も公開鍵そのものではない。",
      "イ": "有効期限を過ぎたという理由だけの一覧ではない。期限内に失効した証明書を知らせる点が異なる。",
      "ウ": "失効した証明書を列挙する点は合うが，公開鍵ではなく証明書のシリアル番号で示す。",
      "エ": "有効期限内に失効した証明書を，認証局が発行した証明書のシリアル番号によって示すリストである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "認証",
    "topicTags": [
      "認証"
    ],
    "difficulty": 3,
    "question": "チャレンジレスポンス認証の方式として，適切なものはどれか。",
    "choices": {
      "ア": "SSLによって，クライアント側で固定パスワードを暗号化して送信する。",
      "イ": "クライアント側で端末のシリアル番号を秘密鍵を使って暗号化して送信する。",
      "ウ": "トークンという装置が表示する毎回異なったデータを，パスワードとして送信する。",
      "エ": "利用者が入力したパスワードと，サーバから送られたランダムなデータとをクライアント側で演算し，その結果を送信する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。サーバからのチャレンジに対し，クライアントはパスワードなどの秘密情報を用いて応答を計算する。毎回異なるデータを材料にすることで，固定の応答値をそのまま再利用することを防ぐ。",
    "choiceExplanations": {
      "ア": "固定パスワードをSSLで保護して送る方式であり，サーバのチャレンジに対して応答を計算する説明ではない。",
      "イ": "端末のシリアル番号を暗号化するだけでは，サーバから毎回送られるチャレンジに応答する方式になっていない。",
      "ウ": "装置が表示するワンタイムパスワードの説明であり，サーバのチャレンジを入力として応答するという条件がない。",
      "エ": "サーバが送ったランダムなチャレンジと秘密情報を使い，計算結果を返すという方式が一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "無線LANセキュリティ",
    "topicTags": [
      "無線LANセキュリティ"
    ],
    "difficulty": 3,
    "question": "無線LANのセキュリティ対策に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "EAPは，クライアントPCとアクセスポイントとの間で，あらかじめ登録した共通鍵による暗号化通信を実現できる。",
      "イ": "RADIUSでは，クライアントPCとアクセスポイントとの間で公開鍵暗号方式による暗号化通信を実現できる。",
      "ウ": "SSIDは，クライアントPCごとの秘密鍵を定めたものであり，公開鍵暗号方式による暗号化通信を実現できる。",
      "エ": "WPA2では，IEEE 802.1Xの規格に準拠した利用者認証及び動的に更新される暗号化鍵を用いた暗号化通信を実現できる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。WPA2-EnterpriseではIEEE 802.1Xを利用する認証と，動的な鍵管理を組み合わせられる。注：WPA2-Personalは事前共有鍵を使うため，WPA2の全構成で802.1Xが必須という意味ではない。",
    "choiceExplanations": {
      "ア": "EAPは複数の認証方式を運ぶための枠組みであり，事前共通鍵による無線データ暗号化そのものではない。",
      "イ": "RADIUSは認証情報などをアクセスポイントと認証サーバの間で扱う仕組みで，PCとAP間の公開鍵暗号化方式ではない。",
      "ウ": "SSIDは無線LANを識別する名前であり，PCごとの秘密鍵や公開鍵暗号方式を定めるものではない。",
      "エ": "WPA2-Enterpriseの構成では802.1Xによる認証と動的な鍵管理を利用できる。Personal構成とは認証方式を区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-lan-wlan/67134-wpa2-config.html"
    ]
  },
  {
    "id": "nw-2012a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "ストレージ",
    "topicTags": [
      "ストレージ"
    ],
    "difficulty": 3,
    "question": "ストレージ技術におけるシン・プロビジョニングの説明として，適切なものはどれか。",
    "choices": {
      "ア": "同じデータを複数台のハードディスクに書き込み，冗長化する。",
      "イ": "一つのハードディスクを，OSをインストールする領域とデータを保存する領域とに分割する。",
      "ウ": "ファイバチャネルなどを用いてストレージをネットワーク化する。",
      "エ": "利用者の要求に対して仮想ボリュームを提供し，物理ディスクは実際の使用量に応じて割り当てる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。シン・プロビジョニングでは，利用者へ見せる論理容量と物理容量の割当てを分ける。仮想ボリュームを先に用意し，実際に書き込む量に応じて物理領域を割り当てる。",
    "choiceExplanations": {
      "ア": "同じデータを複数ディスクへ記録するのはミラーリングなどの冗長化であり，物理容量の割当ての遅延ではない。",
      "イ": "ディスクを用途ごとの領域に分けるパーティション分割の説明であり，シン・プロビジョニングではない。",
      "ウ": "ファイバチャネルなどによるストレージネットワークの構築はSANの説明であり，容量割当ての方法とは別である。",
      "エ": "要求された論理容量を仮想的に提供し，実使用量に合わせて物理領域を割り当てる方式が正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "並列処理",
    "topicTags": [
      "並列処理"
    ],
    "difficulty": 3,
    "question": "マルチプロセッサによる並列処理で得られる高速化率（単一プロセッサのときと比べた倍率）Eを，次の式によって評価する。r＝0.9のアプリケーションの高速化率がr＝0.3のものの3倍となるのは，プロセッサが何台のときか。\n\nE = 1 / (1−r＋r/n)\n\nここで，\nn：プロセッサの台数（1≦n）\nr：対象とする処理のうち，並列化が可能な部分の割合（0≦r≦1）\n\nとし，並列化に伴うオーバヘッドは考慮しなくてよいものとする。",
    "choices": {
      "ア": "3",
      "イ": "4",
      "ウ": "5",
      "エ": "6"
    },
    "answer": "エ",
    "explanation": "正解はエ。1/(0.1＋0.9/n)＝3/(0.7＋0.3/n)と置く。分母を払うと0.7＋0.3/n＝0.3＋2.7/nなので，0.4＝2.4/nからn＝6となる。",
    "choiceExplanations": {
      "ア": "n＝3では高速化率は2.5と1.25で，比は2倍となり，求める3倍にはならない。",
      "イ": "n＝4では高速化率の比は(0.7＋0.3/4)/(0.1＋0.9/4)≒2.38で，3倍にはならない。",
      "ウ": "n＝5では高速化率の比は0.76/0.28≒2.71であり，3倍となる条件に届かない。",
      "エ": "n＝6ではr＝0.9で4倍，r＝0.3で4/3倍となり，前者が後者の3倍になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2012a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "システム設計",
    "topicTags": [
      "システム設計"
    ],
    "difficulty": 3,
    "question": "通信プロトコルの記述などに使用される表記法であり，事象の発生と，そのときの状態に応じたシステムの動作を記述するのに，最も適切なものはどれか。",
    "choices": {
      "ア": "決定表",
      "イ": "状態遷移図",
      "ウ": "データフローダイアグラム",
      "エ": "特性要因図"
    },
    "answer": "イ",
    "explanation": "正解はイ。状態遷移図は，システムの状態と，事象によって状態がどう変わるかを示す。接続待ち・接続中など，通信プロトコルの状態に応じた動作を表す用途に適する。",
    "choiceExplanations": {
      "ア": "決定表は条件の組合せと実行する処理を表に整理する方法であり，状態の変化を図示する設問の用途とは異なる。",
      "イ": "現在の状態と発生した事象に応じた動作や次の状態を表すため，通信プロトコルの記述に適している。",
      "ウ": "データフローダイアグラムはデータの流れと処理を表し，事象による状態変化を中心に記述するものではない。",
      "エ": "特性要因図は結果と原因の関係を整理する図であり，通信プロトコルの状態遷移を表す図ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2012a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2012,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "モデル駆動開発",
    "topicTags": [
      "モデル駆動開発"
    ],
    "difficulty": 3,
    "question": "組込みソフトウェアなどの設計にも有効な技法であって，システムをプラットフォームに依存する部分と依存しない部分とに分けてモデル化することを特徴とする技法はどれか。",
    "choices": {
      "ア": "CSM",
      "イ": "MDA",
      "ウ": "OMT",
      "エ": "UML"
    },
    "answer": "イ",
    "explanation": "正解はイ。MDAはモデル駆動アーキテクチャであり，プラットフォーム独立モデルとプラットフォーム特化モデルなどを分けて扱う。実装基盤に依存しない設計から，基盤に合わせた設計へつなぐ。",
    "choiceExplanations": {
      "ア": "プラットフォーム独立モデルと依存モデルを分けて扱う設問の技法名はMDAであり，CSMではない。",
      "イ": "MDAはプラットフォームに依存しないモデルと特定プラットフォーム向けのモデルを分ける考え方である。",
      "ウ": "OMTはオブジェクト指向の分析・設計技法であり，設問のプラットフォーム独立性を軸とするMDAの名称ではない。",
      "エ": "UMLはモデルを記述するための統一モデリング言語である。UMLを使うことと，MDAという設計の考え方は区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.omg.org/mda/"
    ]
  }
];
