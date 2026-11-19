// IPA公式冊子から転記。原典・照合記録: ../2013-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2013_AUTUMN_AM2: Question[] = [
  {
    "id": "nw-2013a-am2-q1",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "LANケーブル",
    "topicTags": [
      "LANケーブル"
    ],
    "difficulty": 3,
    "question": "LANケーブルに関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "LANケーブル内の対になった導線がより線となっているのは，導線に発生する外来ノイズを減らすためであり，ケーブル内の全ての対のピッチは均一の方が効果が高い。",
      "イ": "カテゴリ5eのUTPケーブルは1000BASE-Tで利用される非シールドより対線であり，2本の導線が4対収められている。",
      "ウ": "カテゴリ6のUTPケーブルを使用する1000BASE-TXでは，1対のより線で250Mビット/秒のデータを上り下り同時に送り，4対合計で1Gビット/秒の全二重通信を実現している。",
      "エ": "対線は2本の導線の電位差で情報を伝え，この対線に発生する外来ノイズの大きさは2本の導線の間隔に反比例する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。UTPはシールドのないより対線であり，1000BASE-Tでは4対を使う。カテゴリ5eのケーブルは2本一組の対を4組，計8本の導線として収めている。",
    "choiceExplanations": {
      "ア": "より合わせによってノイズを抑えるが，異なる対のよりピッチを全て同じにすると対間の漏話を抑える説明にならない。",
      "イ": "シールドのない2本一組のより対線を4対使用する構成が，カテゴリ5eのUTPケーブルに合う。",
      "ウ": "各対を上下同時に使い，4対で通信する説明は1000BASE-Tの方式であり，1000BASE-TXと混同している。",
      "エ": "2本の導線の差を利用して同相のノイズを打ち消す。外来ノイズが導線間隔に単純に反比例するとはいえない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.10gea.org/whitepapers/1000base-t/"
    ]
  },
  {
    "id": "nw-2013a-am2-q2",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "通信時間",
    "topicTags": [
      "通信時間"
    ],
    "difficulty": 3,
    "question": "伝送速度が128kビット/秒の回線を用いて，128×10^3バイトのデータを転送するために必要な時間はおよそ何秒か。ここで，転送するときの一つの電文の長さは128バイトであり，ヘッダなどのオーバヘッドを除いて送信できるデータは100バイトである。また，電文の送信間隔（電文の末尾から次の電文の始まりまで）は，平均1ミリ秒とする。",
    "choices": {
      "ア": "2.6",
      "イ": "8",
      "ウ": "10",
      "エ": "12"
    },
    "answer": "エ",
    "explanation": "正解はエ。必要な電文数は128,000÷100＝1,280個。電文1個の伝送には128×8÷128,000＝0.008秒かかる。送信間隔も含めると1,280×0.008＋1,279×0.001＝11.519秒なので，およそ12秒となる。",
    "choiceExplanations": {
      "ア": "1バイトを8ビットに換算し，オーバヘッドと送信間隔も含めると，2.6秒では送信を完了できない。",
      "イ": "8秒は128,000バイトのデータ本体だけの伝送時間であり，ヘッダや電文間隔を含んでいない。",
      "ウ": "電文全体の伝送には10.24秒かかるが，更に電文間の待ち時間が約1.28秒必要になる。",
      "エ": "電文全体の10.24秒と電文間隔の約1.28秒を足し，約11.52秒を最も近い12秒とする。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2013a-am2-q3",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "無線LAN",
    "topicTags": [
      "無線LAN"
    ],
    "difficulty": 3,
    "question": "無線LAN標準規格に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "IEEE 802.11aでは，周波数帯として2.4GHz帯を使用することが規定されている。",
      "イ": "IEEE 802.11bでは，変調方式としてOFDMを使用することが規定されている。",
      "ウ": "IEEE 802.11gでは，アンテナ技術としてMIMOが規定されている。",
      "エ": "IEEE 802.11nでは，20MHzと40MHzのチャネル幅が規定されている。"
    },
    "answer": "エ",
    "explanation": "正解はエ。IEEE 802.11nは20MHz幅に加えて40MHz幅を扱う。規格ごとの周波数帯，変調方式，複数アンテナの利用を混同しないことが要点である。",
    "choiceExplanations": {
      "ア": "IEEE 802.11aは5GHz帯を使う規格であり，2.4GHz帯を使用するという説明は合わない。",
      "イ": "IEEE 802.11bはOFDMを使用する規格ではない。OFDMは802.11aや802.11gなどで用いられる。",
      "ウ": "MIMOを特徴とするのは802.11nなどであり，802.11gの規格上のアンテナ技術とする説明は誤りである。",
      "エ": "20MHz幅と40MHz幅を規定する点は，IEEE 802.11nのチャネル幅の説明として正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q4",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "OSPF",
    "topicTags": [
      "OSPF"
    ],
    "difficulty": 3,
    "question": "図は，OSPFを使用するルータa〜iのネットワーク構成を示す。拠点1と拠点3の間の通信はWAN1を，拠点2と拠点3の間の通信はWAN2を通過するようにしたい。xとyに設定するコストとして，適切な組合せはどれか。ここで，図中の数字はOSPFコストを示す。",
    "choices": {
      "ア": "x：20，y：20",
      "イ": "x：30，y：30",
      "ウ": "x：40，y：40",
      "エ": "x：50，y：50"
    },
    "answer": "イ",
    "explanation": "正解はイ。eからiまでは小さい方のコスト30＋10＝40，gからiまではx＋10となる。拠点1では30＋100＋40＜40＋100＋x＋10よりx＞20。拠点2では40＋100＋x＋10＜50＋100＋40よりx＜40。選択肢で両方を満たすのはx＝y＝30である。",
    "choiceExplanations": {
      "ア": "x＝y＝20だと，拠点1から拠点3までのWAN1経由とWAN2経由のコストが同じになり，WAN1を選び切れない。",
      "イ": "x＝y＝30なら，拠点1ではWAN1経由170対WAN2経由180，拠点2ではWAN2経由180対WAN1経由190となる。",
      "ウ": "x＝y＝40だと，拠点2から拠点3までの両経路が同じコスト190になり，WAN2だけを選ぶ条件にならない。",
      "エ": "x＝y＝50だと，拠点2からもWAN1経由の方が小さいコストとなり，WAN2を使わせる条件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/nw/2013-autumn-am2-q4.png"
    ],
    "imageAltTexts": [
      "拠点1からa，拠点2からc，拠点3からiへ接続。a-bは30，a-dは40，c-bは50，c-dは40。b-eのWAN1とd-gのWAN2は各100。e-fは40，e-hは30，g-fはx，g-hはy，f-iとh-iは各10。"
    ]
  },
  {
    "id": "nw-2013a-am2-q5",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "リンクアグリゲーション",
    "topicTags": [
      "リンクアグリゲーション"
    ],
    "difficulty": 3,
    "question": "コンピュータとスイッチングハブ（レイヤ2スイッチ）の間，又は2台のスイッチングハブの間を接続する複数の物理回線を論理的に1本の回線に束ねる技術はどれか。",
    "choices": {
      "ア": "スパニングツリー",
      "イ": "ブリッジ",
      "ウ": "マルチホーミング",
      "エ": "リンクアグリゲーション"
    },
    "answer": "エ",
    "explanation": "正解はエ。リンクアグリゲーションは，複数の物理リンクをまとめて一つの論理リンクとして扱う技術である。設問の“物理回線を束ねる”が見分ける手掛かりになる。",
    "choiceExplanations": {
      "ア": "スパニングツリーは冗長経路の一部を転送に使わずループを防ぐ仕組みであり，回線を束ねる技術ではない。",
      "イ": "ブリッジはデータリンク層でフレームを中継する機能であり，複数回線の束ね方を表す名称ではない。",
      "ウ": "マルチホーミングは複数のネットワーク接続をもつ構成であり，物理リンクを一つの論理リンクへ束ねることとは異なる。",
      "エ": "複数の物理リンクを一つの論理リンクとして利用する説明が，リンクアグリゲーションに合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q6",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "ルーティング",
    "topicTags": [
      "ルーティング"
    ],
    "difficulty": 3,
    "question": "IPネットワークのルーティングプロトコルの一つであるBGP-4の説明として，適切なものはどれか。ここで，自律システムとは，単一のルーティングポリシによって管理されるネットワークを示す。",
    "choices": {
      "ア": "経由するルータの台数に従って最短経路を動的に決定する。サブネットマスクの情報を通知できないなどの理由で，大規模なネットワークに適用しにくい。",
      "イ": "自律システム間を接続するルーティングプロトコルとして規定され，経路が変化したときだけ，その差分を送信する。",
      "ウ": "自律システム内で使用され，距離ベクトルとリンクステートの両アルゴリズムを採用したルーティングプロトコルである。",
      "エ": "ネットワークをエリアと呼ぶ小さな単位に分割し，エリア間をバックボーンで結ぶ形態を採り，伝送路の帯域幅をパラメタとして組み込むことができる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。BGP-4は自律システム間の経路情報交換に用いる。初回の経路交換後は変更を増分で通知するため，経路表全体を定期的に送り直す説明とは区別する。",
    "choiceExplanations": {
      "ア": "ホップ数を尺度とし，サブネットマスクを通知しないという説明はRIP-1に相当し，BGP-4ではない。",
      "イ": "AS間で経路情報を交換し，初期交換後の変更を差分で通知するというBGP-4の性質に合う。",
      "ウ": "BGP-4はAS間で使用するパスベクタ方式であり，AS内で二つのアルゴリズムを併用する説明ではない。",
      "エ": "エリアとバックボーンによる階層構成はOSPFの特徴であり，BGP-4の説明とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q7",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "ストレージネットワーク",
    "topicTags": [
      "ストレージネットワーク"
    ],
    "difficulty": 3,
    "question": "FC（ファイバチャネル）フレームをイーサネットで通信するFCoEの説明のうち，適切なものはどれか。",
    "choices": {
      "ア": "イーサネットのパケットサイズに合わせて，FCフレームサイズが調整される。",
      "イ": "通信のオーバヘッドを小さくするために，UDPを用いる。",
      "ウ": "通信の信頼性を確保するために，TCPを用いる。",
      "エ": "転送ロスを発生させないための拡張がされたイーサネットで，FCフレームを通信する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。FCoEはFCフレームをイーサネットフレームに格納して運ぶ。FCの通信に適した転送を行うため，フロー制御などを拡張したイーサネットを使う。",
    "choiceExplanations": {
      "ア": "FCフレームをイーサネットへ格納する方式であり，通常のパケットサイズに合わせFCフレームを調整する説明ではない。",
      "イ": "FCoEはUDP上にFCを載せる方式ではなく，イーサネットでFCフレームを運ぶ方式である。",
      "ウ": "TCP上にFCを載せる方式と混同している。FCoEはイーサネット層でFCフレームを運ぶ。",
      "エ": "転送ロスを防ぐための拡張を備えたイーサネットを利用して，FCフレームを運ぶ点が正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q8",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "FTP",
    "topicTags": [
      "FTP"
    ],
    "difficulty": 3,
    "question": "1台のクライアントと1台のサーバ間でのFTPを用いたファイル転送では，二つのコネクションを用いてデータ転送を行う。これらのコネクションの説明として，適切なものはどれか。",
    "choices": {
      "ア": "二つのコネクションはデータ転送用と受領応答用に分かれており，高速な転送を行うことが可能である。",
      "イ": "二つのコネクションはデータ転送用と制御用に分かれており，データ転送中でも制御コマンドを送信することが可能である。",
      "ウ": "二つのコネクションはデータ転送用とチェックデータ転送用に分かれており，信頼性を向上させることが可能である。",
      "エ": "二つのコネクションはバイナリデータ転送用とテキストデータ転送用に分かれており，バイナリデータとテキストデータを効率的に転送することが可能である。"
    },
    "answer": "イ",
    "explanation": "正解はイ。FTPでは，コマンドや応答をやり取りする制御コネクションと，ファイルなどを運ぶデータコネクションを分ける。データ転送中も制御コマンドを扱える。",
    "choiceExplanations": {
      "ア": "受領応答だけの専用コネクションを分ける構成ではなく，制御コネクションとデータコネクションに分かれる。",
      "イ": "ファイル内容を運ぶデータ用と，コマンドや応答を扱う制御用を分離する説明が正しい。",
      "ウ": "二つのコネクションの区分はデータと検査用データではなく，データ転送用と制御用である。",
      "エ": "バイナリとテキストで専用コネクションを分けるわけではなく，転送形式は制御コマンドで指定する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q9",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "IPv6移行",
    "topicTags": [
      "IPv6移行"
    ],
    "difficulty": 3,
    "question": "IPv6プロトコルスタックしかもたないホストとIPv4プロトコルスタックしかもたないホストとの間で通信するための技術はどれか。",
    "choices": {
      "ア": "6to4",
      "イ": "IPv4/IPv6トランスレーション",
      "ウ": "Teredo",
      "エ": "キャリアグレードNAT"
    },
    "answer": "イ",
    "explanation": "正解はイ。IPv4とIPv6のプロトコルを変換するトランスレーションによって，異なるIPバージョンしか扱えないホスト間の通信を仲介する。トンネル方式とは目的が異なる。",
    "choiceExplanations": {
      "ア": "6to4はIPv6パケットをIPv4網を通して運ぶトンネル方式であり，IPv4専用ホストへの変換とは異なる。",
      "イ": "IPv4とIPv6のプロトコル変換を行うため，IPv6専用とIPv4専用のホスト間の通信を仲介できる。",
      "ウ": "TeredoはIPv6パケットをIPv4のUDPで運ぶトンネル方式であり，IPv4専用ホストとの変換そのものではない。",
      "エ": "キャリアグレードNATは大規模なIPv4アドレス変換であり，それだけでIPv4とIPv6のプロトコルを変換するものではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q10",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "マルチキャスト",
    "topicTags": [
      "マルチキャスト"
    ],
    "difficulty": 3,
    "question": "クラスDのIPアドレスを使用するのはどの場合か。",
    "choices": {
      "ア": "端末数が250台程度までの比較的小規模なホストアドレスを割り振る。",
      "イ": "端末数が65,000台程度の中規模なホストアドレスを割り振る。",
      "ウ": "プライベートアドレスを割り振る。",
      "エ": "マルチキャストアドレスを割り振る。"
    },
    "answer": "エ",
    "explanation": "正解はエ。クラスDはIPv4のマルチキャスト用のアドレス範囲である。ホスト台数に応じて通常のユニキャスト用アドレスを割り当てる分類とは役割が異なる。",
    "choiceExplanations": {
      "ア": "小規模なホストへのユニキャストアドレスの割当ては，マルチキャスト用のクラスDの用途ではない。",
      "イ": "中規模ネットワークの各ホストに割り当てるユニキャストアドレスは，クラスDの用途ではない。",
      "ウ": "プライベートアドレスはユニキャスト用の特定範囲であり，クラスDという分類とは異なる。",
      "エ": "クラスDの224.0.0.0/4はマルチキャストグループを識別するアドレスとして用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q11",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "PPP",
    "topicTags": [
      "PPP"
    ],
    "difficulty": 3,
    "question": "PPPに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "上位のプロトコルとして使用できるのは，IPに限られている。",
      "イ": "伝送モードは半二重方式である。",
      "ウ": "認証プロトコルや圧縮プロトコルが規定されている。",
      "エ": "ベーシック手順を基にしたプロトコルである。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。PPPはポイントツーポイントのリンクで用いる。認証や圧縮のためのプロトコルが用意されており，上位プロトコルもIPだけに限定されない。",
    "choiceExplanations": {
      "ア": "PPPは複数の上位ネットワーク層プロトコルを扱えるため，IPだけに限定する記述は誤りである。",
      "イ": "PPPは全二重のポイントツーポイントリンクを前提としており，半二重方式とする説明は合わない。",
      "ウ": "PPPにはPAPやCHAPなどの認証に関する規定や，圧縮を制御するための規定がある。",
      "エ": "PPPのカプセル化はHDLCに類似した形式を用いるため，ベーシック手順を基にするという説明は合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q12",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "アドレス解決",
    "topicTags": [
      "アドレス解決"
    ],
    "difficulty": 3,
    "question": "電源オフ時にIPアドレスを保持することができない装置が，電源オン時に自装置のMACアドレスから自装置に割り当てられているIPアドレスを知るために用いるデータリンク層のプロトコルであり，ブロードキャストを利用するものはどれか。",
    "choices": {
      "ア": "ARP",
      "イ": "DHCP",
      "ウ": "DNS",
      "エ": "RARP"
    },
    "answer": "エ",
    "explanation": "正解はエ。RARPはMACアドレスを手掛かりに自装置のIPv4アドレスを問い合わせる。設問では“MACアドレスからIPアドレス”という向きと，データリンク層という条件を確認する。",
    "choiceExplanations": {
      "ア": "ARPは既知のIPv4アドレスからMACアドレスを解決するため，設問とは対応付けを求める向きが逆である。",
      "イ": "DHCPもIP設定の取得に使うが，UDPを用いるため，データリンク層のプロトコルという条件に合わない。",
      "ウ": "DNSは名前とアドレスなどの対応を問い合わせる仕組みであり，設問のMACアドレスを使う要求とは異なる。",
      "エ": "RARPは自装置のMACアドレスを使って，対応付けられたIPv4アドレスをブロードキャストで問い合わせる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q13",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "TCP",
    "topicTags": [
      "TCP"
    ],
    "difficulty": 3,
    "question": "TCPのコネクション確立方式である3ウェイハンドシェイクを表す図はどれか。",
    "choices": {
      "ア": "図ア",
      "イ": "図イ",
      "ウ": "図ウ",
      "エ": "図エ"
    },
    "answer": "ア",
    "explanation": "正解はア。通常のTCP接続確立では，要求元のSYN，要求先のSYN＋ACK，要求元のACKの3段階で，双方のシーケンス番号を確認する。図アがこの順序を表す。",
    "choiceExplanations": {
      "ア": "要求元からSYN，要求先からSYN＋ACK，最後に要求元からACKという3段階になっている。",
      "イ": "SYNとACKを別々に繰り返しており，SYN＋ACKで応答する通常の3段階の接続確立を表していない。",
      "ウ": "要求元がSYNを繰り返して要求先がACKするだけでは，要求先のシーケンス番号を同期する手順が足りない。",
      "エ": "SYNとACKを繰り返す図であり，SYN・SYN＋ACK・ACKによる3段階の接続確立とは一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2013-autumn-am2-q13.png"
    ],
    "imageAltTexts": [
      "ア〜エの四つのシーケンス図。各図の左右はコネクション要求元と要求先。アはSYN，SYN＋ACK，ACKの3本，イ・ウ・エはSYNとACKを別々の矢印で示す。"
    ]
  },
  {
    "id": "nw-2013a-am2-q14",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "サブネット",
    "topicTags": [
      "サブネット"
    ],
    "difficulty": 3,
    "question": "サブネットの集約において，192.168.1.0/24〜192.168.15.0/24の15個のネットワークアドレスを集約したアドレスはどれか。",
    "choices": {
      "ア": "192.168.0.0/19",
      "イ": "192.168.0.0/20",
      "ウ": "192.168.0.0/21",
      "エ": "192.168.0.0/22"
    },
    "answer": "イ",
    "explanation": "正解はイ。第3オクテットの1〜15を全て含む最長の共通プレフィックスは/20で，192.168.0.0〜192.168.15.255を表す。集約した範囲には192.168.0.0/24も含まれる。",
    "choiceExplanations": {
      "ア": "/19では第3オクテット0〜31を含むため，15個のネットワークをまとめるのに必要な範囲より広い。",
      "イ": "/20は第3オクテット0〜15を含み，指定された1〜15のネットワークを全て収める最小の単一範囲となる。",
      "ウ": "/21で含められるのは第3オクテット0〜7までなので，8〜15のネットワークを収められない。",
      "エ": "/22で含められるのは第3オクテット0〜3までなので，4〜15のネットワークを収められない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2013a-am2-q15",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "HTTP",
    "topicTags": [
      "HTTP"
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
    "explanation": "正解はエ。URLのスキームはhttpsで，接続先ポートを明示する“:番号”はない。したがって既定の443を使う。“?port=123”はクエリ文字列であり，TCP接続先ポートの指定ではない。",
    "choiceExplanations": {
      "ア": "ホスト名がftpで始まっていても使用プロトコルはスキームで決まる。FTPの既定ポート21ではない。",
      "イ": "80はHTTPの既定ポートであり，httpsというスキームを指定したこのURLの接続先ではない。",
      "ウ": "port=123は疑問符以降のクエリ文字列である。ホスト名の後のコロンによるポート指定とは異なる。",
      "エ": "httpsで明示的なポート番号がないため，TCPの既定ポート番号443へ接続する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q16",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "電子メール",
    "topicTags": [
      "電子メール"
    ],
    "difficulty": 3,
    "question": "“情報太郎”はMIMEで“=?ISO-2022-JP?B?GyRCPnBKc0JATzobKEI=?=”と表される。情報太郎のメールアドレスをtaro@example.jpとするとき，メールアドレスと表示名（情報太郎）を指定する，メールヘッダのFromフィールドとして適切なものはどれか。",
    "choices": {
      "ア": "From: <=?ISO-2022-JP?B?GyRCPnBKc0JATzobKEI=?=> taro@example.jp",
      "イ": "From: <taro@example.jp> =?ISO-2022-JP?B?GyRCPnBKc0JATzobKEI=?=",
      "ウ": "From: =?ISO-2022-JP?B?GyRCPnBKc0JATzobKEI=?= <taro@example.jp>",
      "エ": "From: taro@example.jp <=?ISO-2022-JP?B?GyRCPnBKc0JATzobKEI=?=>"
    },
    "answer": "ウ",
    "explanation": "正解はウ。表示名を先に置き，その後にメールアドレスを山括弧で囲んで記述する。日本語の表示名はencoded-wordで表現し，アドレス自体を囲む括弧と区別する。",
    "choiceExplanations": {
      "ア": "山括弧内に置くべきなのはメールアドレスであり，この肢は表示名を括弧内に置いている。",
      "イ": "名前付きアドレスの書式は表示名が先，山括弧で囲むアドレスが後であり，この肢は順序が逆である。",
      "ウ": "encoded-wordの表示名を先に置き，その後に<taro@example.jp>を置く正しい構文になっている。",
      "エ": "表示名を山括弧内に置いており，メールアドレスを括弧で囲むべき名前付きアドレスの構文に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc2047.html"
    ]
  },
  {
    "id": "nw-2013a-am2-q17",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "電子メール",
    "topicTags": [
      "電子メール"
    ],
    "difficulty": 3,
    "question": "ISP“A”管理下のネットワークから別のISP“B”管理下の宛先へSMTPで電子メールを送信する。電子メール送信者がSMTP-AUTHを利用していない場合，スパムメール対策のOP25Bによって遮断される電子メールはどれか。",
    "choices": {
      "ア": "ISP“A”管理下の固定IPアドレスから送信しようとしたが，受信者の承諾を得ていない広告の電子メール",
      "イ": "ISP“A”管理下の固定IPアドレスから送信しようとしたが，送信元IPアドレスがDNSで逆引きできなかった電子メール",
      "ウ": "ISP“A”管理下の動的IPアドレスからISP“A”のメールサーバを経由して送信される電子メール",
      "エ": "ISP“A”管理下の動的IPアドレスからISP“A”のメールサーバを経由せずに送信される電子メール"
    },
    "answer": "エ",
    "explanation": "正解はエ。設問のOP25Bは，動的IPアドレスの端末からISP外への直接の25番ポート宛てSMTP通信を遮断する対策である。メール本文の内容ではなく通信経路に着目する。",
    "choiceExplanations": {
      "ア": "広告内容について受信者の承諾があるかどうかを，OP25Bがメール本文から判断して遮断するわけではない。",
      "イ": "DNSの逆引き可否による受信制御と，送信元からの外向き25番ポート通信を制限するOP25Bとは異なる。",
      "ウ": "自ISPのメールサーバを経由する送信は，設問のOP25Bで防ぐ外部への直接送信には該当しない。",
      "エ": "動的IPアドレスの端末が自ISPのメールサーバを使わず，外部へ直接SMTP送信する経路が遮断対象となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q18",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "暗号化",
    "topicTags": [
      "暗号化"
    ],
    "difficulty": 3,
    "question": "共通鍵暗号方式で，100人の送受信者のそれぞれが，相互に暗号化通信を行うときに必要な共通鍵の総数は幾つか。",
    "choices": {
      "ア": "200",
      "イ": "4,950",
      "ウ": "9,900",
      "エ": "10,000"
    },
    "answer": "イ",
    "explanation": "正解はイ。各2人の組合せごとに共通鍵を一つ用意するので，100人から2人を選ぶ組合せは100×99÷2＝4,950。送信方向と受信方向を別の組として二重に数えない。",
    "choiceExplanations": {
      "ア": "一人に2個ずつ配る計算では，相手ごとに異なる鍵を使う全ての2人組を網羅できない。",
      "イ": "100人から2人を選ぶ組合せ100×99÷2＝4,950だけ，ペアごとの共通鍵を用意する。",
      "ウ": "100×99では同じ2人組を送信方向ごとに二重計上しているため，2で割る必要がある。",
      "エ": "100×100では自分との組合せも含まれ，同じ2人組も重複する。鍵数は組合せで求める。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2013a-am2-q19",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "無線LANセキュリティ",
    "topicTags": [
      "無線LANセキュリティ"
    ],
    "difficulty": 3,
    "question": "無線LANにおけるWPA2の特徴はどれか。",
    "choices": {
      "ア": "AHとESPの機能によって認証と暗号化を実現する。",
      "イ": "暗号化アルゴリズムにAESを採用したCCMP（Counter-mode with CBC-MAC Protocol）を使用する。",
      "ウ": "端末とアクセスポイントの間で通信を行う際に，SSL Handshake Protocolを使用して，お互いが正当な相手かどうかを認証する。",
      "エ": "利用者が設定する秘密鍵と，製品で生成するIV（Initialization Vector）とを連結した値を基に，データをフレームごとにRC4で暗号化する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。WPA2ではAESを利用するCCMPによって無線LANの通信を保護する。IPsec，SSL，WEPなど別の方式の説明との区別が問われている。",
    "choiceExplanations": {
      "ア": "AHとESPはIPsecで使用するプロトコルであり，WPA2の無線LANフレーム保護の説明ではない。",
      "イ": "AESを使うCCMPによって暗号化と改ざん検出を行う点が，WPA2の特徴に合う。",
      "ウ": "SSL Handshake Protocolを端末とアクセスポイントの無線LAN認証方式とする説明は，WPA2の特徴ではない。",
      "エ": "固定の秘密鍵とIVを基にRC4を使う説明はWEPに相当し，WPA2のCCMPとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q20",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "VLAN",
    "topicTags": [
      "VLAN"
    ],
    "difficulty": 3,
    "question": "VLAN機能をもった1台のレイヤ3スイッチに複数のPCを接続している。スイッチのポートをグループ化して複数のセグメントに分けるとき，セグメントを分けない場合に比べて，どのようなセキュリティ上の効果が得られるか。",
    "choices": {
      "ア": "スイッチが，PCから送出されるICMPパケットを全て遮断するので，PC間のマルウェア感染のリスクを低減できる。",
      "イ": "スイッチが，PCからのブロードキャストパケットの到達範囲を制限するので，アドレス情報の不要な流出のリスクを低減できる。",
      "ウ": "スイッチが，PCのMACアドレスから接続可否を判別するので，PCの不正接続のリスクを低減できる。",
      "エ": "スイッチが，物理ポートごとに，決まったIPアドレスのPC接続だけを許可するので，不正接続のリスクを低減できる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ポートをVLANで分けるとブロードキャストドメインが分離される。そのため，不要なセグメントにアドレス情報などのブロードキャストが届く範囲を狭められる。",
    "choiceExplanations": {
      "ア": "VLANを設定するだけでICMPを全て遮断するわけではない。通信の許可・拒否には別の制御が必要である。",
      "イ": "VLANごとにブロードキャストの到達範囲を分けることで，不要な範囲へ情報が届くリスクを抑えられる。",
      "ウ": "ポートをVLANに分ける設定は，MACアドレスを認証して不正接続を拒む機能そのものではない。",
      "エ": "ポート単位のVLAN割当てだけで接続PCのIPアドレスを固定して検証するわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q21",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "DNSセキュリティ",
    "topicTags": [
      "DNSセキュリティ"
    ],
    "difficulty": 3,
    "question": "DNSの再帰的な問合せを使ったサービス不能攻撃（DNS amp）の踏み台にされることを防止する対策はどれか。",
    "choices": {
      "ア": "キャッシュサーバとコンテンツサーバに分離し，インターネット側からキャッシュサーバに問合せできないようにする。",
      "イ": "問合せがあったドメインに関する情報をWhoisデータベースで確認する。",
      "ウ": "一つのDNSレコードに複数のサーバのIPアドレスを割り当て，サーバへのアクセスを振り分けて分散させるように設定する。",
      "エ": "他のDNSサーバから送られてくるIPアドレスとホスト名の対応情報の信頼性をディジタル署名で確認するように設定する。"
    },
    "answer": "ア",
    "explanation": "正解はア。再帰問合せに誰からでも応答するキャッシュサーバは，送信元を偽装した増幅攻撃の踏み台になり得る。権威サーバと役割を分け，再帰問合せを受ける相手を制限する。",
    "choiceExplanations": {
      "ア": "公開する権威サーバと内部向けのキャッシュサーバを分け，再帰問合せの受付範囲を限定する対策である。",
      "イ": "Whoisでドメイン情報を調べても，キャッシュサーバが第三者の再帰問合せに応答する状態は防げない。",
      "ウ": "複数アドレスによる負荷分散は，送信元を偽装した再帰問合せを拒否する対策にはならない。",
      "エ": "DNSSECなどによる応答の署名検証はデータの真正性を確かめるもので，再帰問合せの受付制限とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q22",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "パイプライン",
    "topicTags": [
      "パイプライン"
    ],
    "difficulty": 3,
    "question": "パイプラインの深さをD，パイプラインピッチをP秒とすると，I個の命令をパイプラインで実行するのに要する時間を表す式はどれか。ここで，パイプラインは1本だけとし，全ての命令は処理にDステージ分の時間がかかり，各ステージは1ピッチで処理されるものとする。また，パイプラインハザードについては，考慮しなくてよい。",
    "choices": {
      "ア": "(I＋D)×P",
      "イ": "(I＋D−1)×P",
      "ウ": "(I×D)＋P",
      "エ": "(I×D−1)＋P"
    },
    "answer": "イ",
    "explanation": "正解はイ。最初の命令の完了までDピッチかかり，残るI−1個は1ピッチごとに完了する。合計はD＋I−1ピッチとなるので，時間は(I＋D−1)×P秒である。",
    "choiceExplanations": {
      "ア": "最初の命令がDピッチで完了した後に残るのはI−1個であるため，この式では1ピッチ多く数えている。",
      "イ": "初回のDピッチと，残るI−1個の各1ピッチを足し，P秒を掛ける式が正しい。",
      "ウ": "ステージ数と命令数の積に秒単位のPを足しており，パイプラインの所要時間の式になっていない。",
      "エ": "命令を重ねて実行する効果を表しておらず，ピッチ数と秒単位の量を加えている点も適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2013a-am2-q23",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "ストレージネットワーク",
    "topicTags": [
      "ストレージネットワーク"
    ],
    "difficulty": 3,
    "question": "SAN（Storage Area Network）におけるサーバとストレージの接続形態として，適切なものはどれか。",
    "choices": {
      "ア": "シリアルATAなどの接続方式によって内蔵ストレージとして1対1に接続する。",
      "イ": "ファイバチャネルなどによる専用ネットワークで接続する。",
      "ウ": "プロトコルはCIFS（Common Internet File System）を使用し，LANで接続する。",
      "エ": "プロトコルはNFS（Network File System）を使用し，LANで接続する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。SANはサーバとストレージを接続するためのネットワークであり，ファイバチャネルなどを使う。ファイルを共有するNASと，ブロック単位でストレージへアクセスする構成を区別する。",
    "choiceExplanations": {
      "ア": "内蔵ストレージを直接接続する形態は，サーバとストレージをネットワーク化するSANの説明ではない。",
      "イ": "ストレージ用の専用ネットワークで接続するという構成がSANに合い，ファイバチャネルはその方式の一つである。",
      "ウ": "CIFSによるファイル共有はNASの説明に当たり，SANの接続形態を表していない。",
      "エ": "NFSによるファイル共有はNASの説明に当たり，SANのブロックアクセスとは利用する層が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "nw-2013a-am2-q24",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "並列処理",
    "topicTags": [
      "並列処理"
    ],
    "difficulty": 3,
    "question": "1台のCPUの性能を1とするとき，そのCPUをn台用いたマルチプロセッサの性能Pが，\n\nP = n / {1＋(n−1)a}\n\nで表される。ここで，aはオーバヘッドを表す定数である。例えば，a＝0.1，n＝4とすると，P≒3なので，4台のCPUから成るマルチプロセッサの性能は約3になる。この式で表されるマルチプロセッサの性能には上限があり，nを幾ら大きくしてもPはある値以上には大きくならない。a＝0.1の場合，Pの上限は幾らか。",
    "choices": {
      "ア": "5",
      "イ": "10",
      "ウ": "15",
      "エ": "20"
    },
    "answer": "イ",
    "explanation": "正解はイ。分子と分母をnで割るとP＝1/{1/n＋(1−1/n)a}となる。nを十分大きくすると1/nは0に近づくので，上限は1/a＝1/0.1＝10となる。",
    "choiceExplanations": {
      "ア": "CPU台数を増やすと性能は5を超えられる。式の極限はオーバヘッド定数の逆数である10となる。",
      "イ": "nで分子・分母を割り，1/nを0に近づけると1/aとなるため，上限は10である。",
      "ウ": "与式の極限は1/0.1＝10であり，15まで性能を上げることはこのモデルではできない。",
      "エ": "CPU台数を増やしてもオーバヘッドにより上限10に近づくため，20には到達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "nw-2013a-am2-q25",
    "exam": "nw",
    "session": "am2",
    "year": 2013,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "オブジェクト指向",
    "topicTags": [
      "オブジェクト指向"
    ],
    "difficulty": 3,
    "question": "次のクラス図におけるクラス間の関係の説明のうち，適切なものはどれか。",
    "choices": {
      "ア": "“バス”，“トラック”などのクラスが“自動車”クラスの定義を引き継ぐことを，インスタンスという。",
      "イ": "“バス”，“トラック”などのクラスの共通部分を抽出し“自動車”クラスとして定義することを，汎化という。",
      "ウ": "“バス”，“トラック”などのクラスは，“自動車”クラスに対するオブジェクトという。",
      "エ": "“バス”，“トラック”などのそれぞれのクラスの違いを“自動車”クラスとして定義することを，特化という。"
    },
    "answer": "イ",
    "explanation": "正解はイ。共通の性質を抽出して上位のクラスを定義することを汎化という。逆に，上位クラスから個別の特徴をもつ下位クラスへ分類する方向が特化である。",
    "choiceExplanations": {
      "ア": "上位クラスの定義を引き継ぐ関係は継承である。インスタンスはクラスから生成される個々の実体を指す。",
      "イ": "バスやトラックなどに共通する性質をまとめて自動車クラスを定義する方向は汎化に当たる。",
      "ウ": "図のバスやトラックは下位のクラスであり，自動車クラスから生成した個々のオブジェクトではない。",
      "エ": "自動車という共通の上位概念にまとめるのは汎化であり，個別の違いをもつ下位クラスを作る特化とは方向が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_nw_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/nw/2013-autumn-am2-q25.png"
    ],
    "imageAltTexts": [
      "自動車を上位クラスとして，バス，トラック，セダン，バンを下位に並べ，白い三角形の矢印を自動車へ向けたクラス図。"
    ]
  }
];
