import type { Question } from "@/lib/questions/types";

export const CHUSHO_2022_F_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 1,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "無線LAN",
    "topicTags": [
      "無線LAN"
    ],
    "difficulty": 3,
    "question": "インターネットへの接続やデジタル機器同士のデータ交換の際に用いる無線通信技術にはさまざまな種類があり、それぞれの特徴を理解する必要がある。無線通信技術に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 無線 LAN 規格 IEEE802.11n に対応する機器は、IEEE802.11ac に対応する機器と通信が可能である。\nｂ 無線 LAN 規格 IEEE802.11g に対応する機器は、 5 GHz 帯を利用するので電子レンジなどの家電製品から電波干渉を受ける。\nｃ Bluetooth に対応する機器は、周波数ホッピング機能により電子レンジなどの家電製品からの電波干渉を軽減できる。\nｄ Bluetooth に対応する機器は、 5 GHz 帯を利用するので電子レンジなどの家電製品から電波干渉を受ける。\nｅ Bluetooth に対応する機器は、2.4 GHz 帯と 5 GHz 帯を切り替えて通信を行うことができるので、電子レンジなどの家電製品からの電波干渉を軽減できる。",
    "choices": {
      "ア": "ａとｃ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｂとｄ",
      "オ": "ｂとｅ"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "11ac対応機器が共通する5 GHz帯の11nにも対応していれば互換動作が可能である。Bluetoothは周波数を切り替えて干渉を抑える。",
    "choiceExplanations": {
      "ア": "11ac対応機器が共通する5 GHz帯の11nにも対応していれば互換動作が可能である。Bluetoothは周波数を切り替えて干渉を抑える。",
      "イ": "ａは共通モードで通信できるが、Bluetoothが5 GHz帯と2.4 GHz帯を切り替えるとするｅは誤りである。",
      "ウ": "Bluetoothの周波数ホッピングの説明は合うが、802.11gが使うのは2.4 GHz帯である。",
      "エ": "802.11gもBluetoothも、この設問の通信では2.4 GHz帯を使う。どちらも5 GHz帯とする説明は誤りである。",
      "オ": "802.11gは2.4 GHz帯を使い、Bluetoothは同じ帯域内で周波数を切り替える。5 GHz帯への切替えを行うわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 2,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "Pythonの辞書",
    "topicTags": [
      "Pythonの辞書"
    ],
    "difficulty": 3,
    "question": "ある値（value）を何らかのキー（key）を付けて記憶するデータ構造は、さまざまなプログラミング言語で利用可能である。Python においては、辞書（dictionary）と呼ばれるデータ型が組み込まれている。辞書は、「キー： 値」という形のペアの集合であり、\n{キー 1： 値 1, キー 2： 値 2, …, キー n： 値 n}\n\nのように、「キー： 値」の各ペアをカンマで区切り、{ } で囲むことで定義できる。例えば、\nmis = {\"科目名\"：\"経営情報システム\", \"試験時間\"：\"60 分\"}\n\nとして辞書 mis を定義でき、mis[\"科目名\"] でキー \"科目名\" に対応する値である\"経営情報システム\" を、また、mis[\"試験時間\"] でキー \"試験時間\" に対応する値である \"60 分\" を参照することができる。なお、次のように、値には辞書型のデータも指定することができる。\nemployee = {\"E001\"：{\"氏名\"：\"中小太郎\", \"部門\"：\"財務部\"}, \"E002\"：{\"氏名\"：\"診断次郎\", \"部門\"：\"総務部\"}}\n\nこの場合、employee[\"E001\"][\"氏名\"] で \"中小太郎\" を参照することができる。いま、次のように exam を定義するとき、値の参照に関する記述として、最も不適切なものを下記の解答群から選べ。\n\nexam = {\n       \"Ａ\"：{\"科目名\"：\"科目Ａ\", \"試験時間\"：\"60 分\", \"配点\"：\"100 点\"},\n       \"Ｂ\"：{\"科目名\"：\"科目Ｂ\", \"試験時間\"：\"60 分\", \"配点\"：\"100 点\"},\n       \"Ｃ\"：{\"科目名\"：\"科目Ｃ\", \"試験時間\"：\"90 分\", \"配点\"：\"100 点\"},\n       \"Ｄ\"：{\"科目名\"：\"科目Ｄ\", \"試験時間\"：\"90 分\"},\n       \"Ｅ\"：{\"科目名\"：\"科目Ｅ\", \"試験時間\"：\"60 分\", \"配点\"：\"100 点\"},\n       \"Ｆ\"：{\"科目名\"：\"科目Ｆ\", \"試験時間\"：\"60 分\", \"配点\"：\"100 点\"},\n       \"Ｇ\"：{\"科目名\"：\"科目Ｇ\", \"試験時間\"：\"90 分\"}\n  }",
    "choices": {
      "ア": "exam[\"Ａ\"][\"試験時間\"] の値と exam[\"Ｂ\"][\"試験時間\"] の値は等しい。",
      "イ": "exam[\"Ｃ\"][\"配点\"] の値は、\"100 点\" である。",
      "ウ": "exam[\"Ｄ\"] に、キー \"配点\" は存在しない。",
      "エ": "exam[\"Ｅ\"][\"試験時間\"] の値と exam[\"Ｇ\"][\"試験時間\"] の値は等しい。",
      "オ": "exam[\"Ｆ\"][\"科目名\"] の値は、\"科目Ｆ\" である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "Ｅの試験時間は「60 分」で、Ｇの試験時間は「90 分」である。従って等しくない。Ｆの内側の辞書で「科目名」を参照すると「科目Ｆ」を取得する。",
    "choiceExplanations": {
      "ア": "ＡとＢの辞書にはどちらも試験時間として「60 分」が格納されている。",
      "イ": "Ｃの内側の辞書にはキー「配点」があり、値は「100 点」である。",
      "ウ": "Ｄの内側の辞書にあるのは科目名と試験時間だけであり、「配点」はない。",
      "エ": "Ｅの試験時間は「60 分」で、Ｇの試験時間は「90 分」である。従って等しくない。",
      "オ": "Ｆの内側の辞書で「科目名」を参照すると「科目Ｆ」を取得する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 3,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "プログラミング言語",
    "topicTags": [
      "プログラミング言語"
    ],
    "difficulty": 3,
    "question": "プログラミング言語には多くの種類があり、目的に応じて適切な選択を行う必要がある。プログラミング言語に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "JavaScript は Java のサブセットであり、HTML ファイルの中で記述され、動的な Web ページを作成するために用いられる。",
      "イ": "Perl は日本人が開発したオブジェクト指向言語であり、国際規格として承認されている。",
      "ウ": "Python は LISP と互換性があり、機械学習などのモジュールが充実している。",
      "エ": "R は統計解析向けのプログラミング言語であり、オープンソースとして提供されている。",
      "オ": "Ruby はビジュアルプログラミング言語であり、ノーコードでアプリケーションソフトウェアを開発することができる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "Rは統計解析、データ可視化などに用いるオープンソースのプログラミング言語である。Rubyはテキストでプログラムを書く汎用言語であり、ビジュアルなノーコード開発言語ではない。",
    "choiceExplanations": {
      "ア": "JavaScriptは動的なWebページなどに利用されるが、Javaのサブセットではない。",
      "イ": "Perlの開発者はラリー・ウォールである。日本人によって開発され国際規格化された言語という説明は合わない。",
      "ウ": "Pythonには機械学習などのライブラリがあるが、LISPと互換性があるわけではない。",
      "エ": "Rは統計解析、データ可視化などに用いるオープンソースのプログラミング言語である。",
      "オ": "Rubyはテキストでプログラムを書く汎用言語であり、ビジュアルなノーコード開発言語ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 4,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "データレイク",
    "topicTags": [
      "データレイク"
    ],
    "difficulty": 3,
    "question": "データを格納する考え方としてデータレイクが注目されている。データレイクに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "組織内で運用される複数のリレーショナルデータベースからデータを集めて格納する。",
      "イ": "組織内の構造化されたデータや、IoT 機器や SNS などからの構造化されていないデータをそのままの形式で格納する。",
      "ウ": "データウェアハウスから特定の用途に必要なデータを抽出し、キー・バリュー型の形式で格納する。",
      "エ": "データ利用や分析に適したスキーマをあらかじめ定義して、その形式にしたがってデータを格納する。",
      "オ": "テキスト形式のデータと画像・音声・動画などのバイナリ形式のデータをそれぞれ加工し、構造化したうえで格納する。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "データレイクは構造化データも非構造化データも元の形式で蓄え、用途に応じて読み出し時に整形できる。データウェアハウスから特定用途向けに絞り込む仕組みはデータマートに近い。データレイクにキー・バリュー形式の指定はない。",
    "choiceExplanations": {
      "ア": "複数の業務DBを統合して分析用に整理する考え方はデータウェアハウスに近く、データレイクは非構造化データも取り込む。",
      "イ": "データレイクは構造化データも非構造化データも元の形式で蓄え、用途に応じて読み出し時に整形できる。",
      "ウ": "データウェアハウスから特定用途向けに絞り込む仕組みはデータマートに近い。データレイクにキー・バリュー形式の指定はない。",
      "エ": "先に統一スキーマを定義して格納するのはデータウェアハウスの典型である。データレイクでは読み出す際に構造を与えられる。",
      "オ": "格納前にデータをすべて加工して構造化する必要はない。テキスト以外の画像や音声も元の形式で保持できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 5,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "SQL",
    "topicTags": [
      "SQL"
    ],
    "difficulty": 3,
    "question": "「アルバイト担当者」表から電話番号が「03‑3」から始まる担当者を探すためにSQL 文を用いる。以下の SQL 文の空欄に指定する文字列として、最も適切なものを下記の解答群から選べ。なお、電話番号は「アルバイト担当者」表の「電話番号」列に格納されているものとする。\nSELECT ＊ FROM アルバイト担当者 WHERE ［空欄］；",
    "choices": {
      "ア": "LIKE 電話番号 '= 03‑3％'",
      "イ": "LIKE 電話番号 = '03‑3％'",
      "ウ": "電話番号 = 'LIKE 03‑3％'",
      "エ": "電話番号 'LIKE 03‑3％'",
      "オ": "電話番号 LIKE '03‑3％'"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "列「電話番号」にLIKEを適用し、先頭が03-3であるパターンを書く。末尾の%は0文字以上の任意の文字列を表す。",
    "choiceExplanations": {
      "ア": "LIKEは列名の後に置く演算子であり、等号を文字列に入れても電話番号の条件として機能しない。",
      "イ": "LIKEの左に検索する列、右にパターンを書く。LIKEの後にさらに等号を置く書式は使わない。",
      "ウ": "等号で引用符内の文字列と比較すると、LIKEも含めた単なる文字列との完全一致になってしまう。",
      "エ": "引用符内のLIKEは演算子として働かない。列名とパターンの間にLIKEを記述する。",
      "オ": "列「電話番号」にLIKEを適用し、先頭が03-3であるパターンを書く。末尾の%は0文字以上の任意の文字列を表す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 6,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "相対パス",
    "topicTags": [
      "相対パス"
    ],
    "difficulty": 3,
    "question": "コンピュータ内で特定のファイルの所在を表す際に相対パスが用いられる。相対パスに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "親ディレクトリから対象ファイルに至るパスである。",
      "イ": "仮想ディレクトリから対象ファイルに至るパスである。",
      "ウ": "カレントディレクトから対象ファイルに至るパスである。",
      "エ": "ホームディレクトリから対象ファイルに至るパスである。",
      "オ": "ルートディレクトリから対象ファイルに至るパスである。"
    },
    "answer": [],
    "officialAnswerNumber": null,
    "explanation": "協会は2022年8月30日付の訂正通知で、公表した選択肢が不適切であったため全員を正解として扱うと発表した。",
    "choiceExplanations": {
      "ア": "親ディレクトリは状況によって参照先の一部になり得るが、相対パスの基準が常に親というわけではない。",
      "イ": "仮想ディレクトリは一部の環境の機能で、相対パスの一般的な基準を表さない。",
      "ウ": "カレントディレクトリは相対パスの典型的な基準の一つだが、プログラムや文書などでは別の基準を指定できる。公式訂正で本問は全員加点となった。",
      "エ": "ホームディレクトリは利用者のための所定の場所で、相対パスが常にそこを基準とするわけではない。",
      "オ": "ルートから対象までの経路は絶対パスの考え方である。相対パスは指定された基準からの経路として表す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "officialScoring": {
      "kind": "credit-for-all",
      "reason": "協会は2022年8月30日付の訂正通知で、公表した選択肢が不適切であったため全員を正解として扱うと発表した。"
    },
    "officialReferenceUrls": [
      "https://www.jf-cmca.jp/attach/test/r04/seikai_teisei.pdf"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 7,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "通信プロトコル",
    "topicTags": [
      "通信プロトコル"
    ],
    "difficulty": 3,
    "question": "ネットワーク上では多様な通信プロトコルが用いられている。通信プロトコルに関する記述とその用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\n① Web ブラウザと Web サーバ間でデータを送受信する際に用いられる。\n② 電子メールクライアントソフトが、メールサーバに保存されている電子メールを取得する際に用いられる。\n③ 電子メールの送受信において、テキストとともに画像・音声・動画などのデータを扱う際に用いられる。\n④ クライアントとサーバ間で送受信されるデータを暗号化する際に用いられる。",
    "choices": {
      "ア": "①：HTTP ②：POP3 ③：MIME ④：SSL/TLS",
      "イ": "①：HTTP ②：SMTP ③：IMAP ④：UDP",
      "ウ": "①：NTP ②：POP3 ③：IMAP ④：UDP",
      "エ": "①：NTP ②：POP3 ③：MIME ④：UDP",
      "オ": "①：NTP ②：SMTP ③：IMAP ④：SSL/TLS"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "Web通信にはHTTP、メールの取得にはPOP3、多様な形式でのメール送受信にはMIMEが対応する。通信の暗号化にはTLSなどが用いられる。",
    "choiceExplanations": {
      "ア": "Web通信にはHTTP、メールの取得にはPOP3、多様な形式でのメール送受信にはMIMEが対応する。通信の暗号化にはTLSなどが用いられる。",
      "イ": "①は合うが、SMTPはメール送信のためのプロトコルである。UDPは通信内容を暗号化する仕組みではない。",
      "ウ": "NTPは時計の同期、IMAPはサーバ上のメールにアクセスするためのプロトコルである。Web通信や添付データの形式の説明には合わない。",
      "エ": "POP3とMIMEは適切だが、①のWeb通信にはHTTP、④の暗号化にはTLSなどが対応する。",
      "オ": "NTPは時刻同期、SMTPはメール送信用である。受信やメールの多様なデータ形式を表す項目と入れ替わっている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 8,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "IPアドレス",
    "topicTags": [
      "IPアドレス"
    ],
    "difficulty": 3,
    "question": "IP アドレスやドメインに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "DHCP は、ネットワークに接続するノードへの IP アドレスの割り当てを自動的に行うプロトコルであり、サブネットマスクやデフォルトゲートウェイのアドレスは自動設定できない。",
      "イ": "IPv4 と IPv6 の間には互換性があるので、IPv4 アドレスを割り当てられた機器と IPv6 アドレスを割り当てられた機器は直接通信できる。",
      "ウ": "NAT は、ドメイン名と IP アドレスを動的に対応づけるシステムである。",
      "エ": "トップレベルドメインは、分野別トップレベルドメイン（gTLD）と国別トップレベルドメイン（ccTLD）に大別される。",
      "オ": "ルータの持つ DNS 機能によって、LAN 内の機器に割り当てられたプライベート IP アドレスをグローバル IP アドレスに変換し、インターネットへのアクセスが可能になる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "トップレベルドメインは、.comなどのgTLDと、.jpなどの国・地域コードのccTLDに大別される。",
    "choiceExplanations": {
      "ア": "DHCPはIPアドレスだけでなく、サブネットマスクやデフォルトゲートウェイの情報も配布できる。",
      "イ": "IPv4とIPv6はアドレス形式などが異なる。片方の方式しか使えない機器間では、変換などを介さずにそのまま通信できない。",
      "ウ": "NATはIPアドレスを変換する仕組みである。ドメイン名とIPアドレスの対応を扱うのはDNSである。",
      "エ": "トップレベルドメインは、.comなどのgTLDと、.jpなどの国・地域コードのccTLDに大別される。",
      "オ": "プライベートIPアドレスからグローバルIPアドレスへの変換はNATの役割である。DNSは名前解決を行う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 9,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "DXレポート",
    "topicTags": [
      "DXレポート"
    ],
    "difficulty": 3,
    "question": "経済産業省が 2021 年 8 月に公表した「DX レポート 2.1」（DX レポート 2 追補版）では、デジタル変革後の新たな産業の姿やその中での企業の姿が提示されている。デジタル社会の実現に必要となる機能を社会にもたらすのがデジタル産業であるとしている。「DX レポート 2.1」におけるデジタル産業を構成する企業の類型として、最も不適切なものはどれか。",
    "choices": {
      "ア": "DX に必要な技術を提供するパートナー",
      "イ": "企業の変革を共に推進するパートナー",
      "ウ": "共通プラットフォームの提供主体",
      "エ": "新ビジネス・サービスの提供主体",
      "オ": "デジタル化を外部委託してコスト削減を図る企業群"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "外部委託によるコスト削減にとどまる企業群は、レポートが示すデジタル産業の企業類型に含まれない。技術の提供を通じて他社のDXを支えるパートナーは、レポートが示すデジタル産業の類型に含まれる。",
    "choiceExplanations": {
      "ア": "技術の提供を通じて他社のDXを支えるパートナーは、レポートが示すデジタル産業の類型に含まれる。",
      "イ": "利用企業とともに変革を進めるパートナーは、レポートが列挙する企業類型の一つである。",
      "ウ": "企業が共通で使えるプラットフォームの提供主体も、デジタル産業を構成する類型に含まれる。",
      "エ": "デジタル技術を用いた新しい事業やサービスの提供主体は、レポートの企業類型に含まれる。",
      "オ": "外部委託によるコスト削減にとどまる企業群は、レポートが示すデジタル産業の企業類型に含まれない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 10,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "オープンデータ",
    "topicTags": [
      "オープンデータ"
    ],
    "difficulty": 3,
    "question": "中小企業においても、オープンデータの活用は競争力向上の重要な要因となり得る。オープンデータに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "売上データや人流データなどに匿名加工を施したうえで第三者に販売されるデータ。",
      "イ": "行政の透明化を図るために、条例に基づいて住民からの公開請求の手続きにより住民に公開されるデータ。",
      "ウ": "公開の有無にかかわらず、OpenDocument フォーマットで保管されるデータ。",
      "エ": "政府や企業が公式に発表する統計データや決算データではなく、インターネットのログや SNS の投稿などから得られるデータ。",
      "オ": "二次利用が可能な利用ルールが適用され、機械判読に適し、無償で利用できる形で公開されるデータ。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "二次利用できるルールに基づき、機械で読み取れる形式で無償公開されていることが要点である。匿名加工の有無だけでオープンデータにはならない。第三者に販売するデータは、ここで問われる無償で利用できる公開データの条件に合わない。",
    "choiceExplanations": {
      "ア": "匿名加工の有無だけでオープンデータにはならない。第三者に販売するデータは、ここで問われる無償で利用できる公開データの条件に合わない。",
      "イ": "個別の開示請求に基づく提供だけでは、誰でも二次利用できる形で公開する条件を満たさない。",
      "ウ": "ファイル形式の特性だけではオープンデータかどうかは決まらない。公開の有無や利用条件も重要である。",
      "エ": "オープンデータは情報の出所で定義しない。政府の統計なども利用条件を満たした形で公開されればオープンデータになる。",
      "オ": "二次利用できるルールに基づき、機械で読み取れる形式で無償公開されていることが要点である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 11,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "UML",
    "topicTags": [
      "UML"
    ],
    "difficulty": 3,
    "question": "製品修理を専門に行う中小企業がある。下図は、この企業の修理業務の一部をUML のクラス図として描いたものである。この図の解釈として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "いずれの従業員も、少なくとも 1 つ以上の修理を担当する。",
      "イ": "いずれの従業員も、複数の修理を担当することは許されない。",
      "ウ": "各修理に対して、担当する従業員は 1 人以上である。",
      "エ": "各修理に対して、担当する従業員は必ず 1 人である。",
      "オ": "担当する従業員が存在しない修理もあり得る。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "従業員側に多重度1が付いているため、一件の修理には必ず一人の従業員が対応する。従業員側の多重度1には0が含まれない。担当者のない修理はこのモデルでは認められない。",
    "choiceExplanations": {
      "ア": "修理側の多重度0..*は、従業員が修理を一件も担当しないことも許す。",
      "イ": "修理側の多重度の上限は*であり、一人の従業員が複数の修理を担当できる。",
      "ウ": "従業員側の多重度は1なので、担当者は一人であり、二人以上も含む「1人以上」とするのは範囲が広すぎる。",
      "エ": "従業員側に多重度1が付いているため、一件の修理には必ず一人の従業員が対応する。",
      "オ": "従業員側の多重度1には0が含まれない。担当者のない修理はこのモデルでは認められない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2022-keiei-joho-q11.png"
    ],
    "imageAltTexts": [
      "クラス図では修理と従業員を「担当」で結び、修理側の多重度を0..*、従業員側を1と示す。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 12,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "スケーリングと移行",
    "topicTags": [
      "スケーリングと移行"
    ],
    "difficulty": 3,
    "question": "企業は環境変化に対応するために、コンピュータシステムの処理能力を弾力的に増減させたり、より処理能力の高いシステムに移行させたりする必要がある。以下の記述のうち、最も適切な組み合わせを下記の解答群から選べ。\nａ システムを構成するサーバの台数を増やすことでシステム全体の処理能力を高めることを、スケールアウトという。\nｂ システムを構成するサーバを高性能なものに取り替えることでシステム全体の処理能力を高めることを、スケールアップという。\nｃ 既存のハードウェアやソフトウェアを同等のシステム基盤へと移すことを、リファクタリングという。\nｄ パッケージソフトウェアを新しいバージョンに移行する時などに行われ、データやファイルを別の形式に変換することを、リフト＆シフトという。\nｅ 情報システムをクラウドに移行する手法の 1 つで、既存のシステムをそのままクラウドに移し、漸進的にクラウド環境に最適化していく方法を、コンバージョンという。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｃとｄ",
      "オ": "ｄとｅ"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "台数を増やすことがスケールアウトで、個々のサーバの性能を上げることがスケールアップである。ａは正しいが、既存システムをクラウドに移して最適化する方法は、データ変換を指すコンバージョンとは異なる。",
    "choiceExplanations": {
      "ア": "台数を増やすことがスケールアウトで、個々のサーバの性能を上げることがスケールアップである。",
      "イ": "ａは正しいが、既存システムをクラウドに移して最適化する方法は、データ変換を指すコンバージョンとは異なる。",
      "ウ": "ｂは正しいが、リファクタリングは外部動作を変えずにコード内部の構造を改善することである。",
      "エ": "同等の基盤へ移すことと、データ形式の変換を、いずれも異なる移行手法の名称と取り違えている。",
      "オ": "ｄのデータ形式の変換がコンバージョンで、ｅのような既存環境からの移行はリフト＆シフトに関係する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 13,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "開発方法論",
    "topicTags": [
      "開発方法論"
    ],
    "difficulty": 3,
    "question": "システム開発の方法論は多様である。システム開発に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "DevOps は、開発側と運用側とが密接に連携して、システムの導入や更新を柔軟かつ迅速に行う開発の方法論である。",
      "イ": "XP は、開発の基幹手法としてペアプログラミングを用いる方法論であり、ウォーターフォール型開発を改善したものである。",
      "ウ": "ウォーターフォール型開発は、全体的なモデルを作成した上で、ユーザにとって価値ある機能のまとまりを単位として、計画、設計、構築を繰り返す方法論である。",
      "エ": "スクラムは、動いているシステムを壊さずに、ソフトウェアを高速に、着実に、自動的に機能を増幅させ、本番環境にリリース可能な状態にする方法論である。",
      "オ": "フィーチャ駆動開発は、開発工程を上流工程から下流工程へと順次移行し、後戻りはシステムの完成後にのみ許される方法論である。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "DevOpsでは開発と運用が協働し、自動化や短いフィードバックを用いて、変更のリリースや運用を継続的に改善する。",
    "choiceExplanations": {
      "ア": "DevOpsでは開発と運用が協働し、自動化や短いフィードバックを用いて、変更のリリースや運用を継続的に改善する。",
      "イ": "ペアプログラミングはXPの実践の一つだが、XPはアジャイルの手法であり、ウォーターフォールの改善型という説明は合わない。",
      "ウ": "機能単位で計画・設計・構築を反復する説明はフィーチャ駆動型に近い。ウォーターフォールでは工程を段階的に進める。",
      "エ": "記述は継続的デリバリーの説明に近い。スクラムでは短いスプリントごとに成果を作り、検査と適応を繰り返す。",
      "オ": "上流から下流に順次進める説明はウォーターフォール型に近い。フィーチャ駆動開発は機能単位の反復が特徴である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 14,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "データベース",
    "topicTags": [
      "データベース"
    ],
    "difficulty": 3,
    "question": "情報システムにおいてデータベースは要となるものである。データベースに関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ リポジトリとは、データベース全体の構造や仕様を定義したものであり、外部・概念・内部の三層構造で捉える。\nｂ NoSQL とは、DBMS が管理するデータ・利用者・プログラムに関する情報やこれらの間の関係を保存したデータベースである。\nｃ ロールフォワードとは、データベースシステムなどに障害が発生した時に、更新前のトランザクションログを使ってトランザクション実行前の状態に復元する処理である。\nｄ カラムナー（列指向）データベースは、列方向のデータの高速な取得に向けて最適化されているので、大量の行に対する少数の列方向の集計を効率化できる。\nｅ インメモリデータベースは、データを全てメインメモリ上に格納する方式で構築されたデータベースであり、ディスクにアクセスする必要がないので、応答時間を最小限にすることが可能になる。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｃとｄ",
      "オ": "ｄとｅ"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "列指向は必要な列だけを効率的に取得して集計できる。インメモリ方式は主記憶にデータを置いてディスクへのアクセスを減らす。",
    "choiceExplanations": {
      "ア": "三層構造はデータベースのスキーマの考え方を指す。記述ｂもNoSQLではなく、データ辞書に近い説明である。",
      "イ": "ｅのインメモリの利点は合っているが、ａの三層スキーマの説明をそのままリポジトリの定義とはしない。",
      "ウ": "ｂはメタデータの格納先についての説明である。ｃの更新前の状態に戻す処理はロールバックに当たる。",
      "エ": "ｄは正しいが、ロールフォワードでは復旧用の状態に更新後のログを適用する。更新前に戻すｃの説明はロールバックである。",
      "オ": "列指向は必要な列だけを効率的に取得して集計できる。インメモリ方式は主記憶にデータを置いてディスクへのアクセスを減らす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 15,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "機械学習",
    "topicTags": [
      "機械学習"
    ],
    "difficulty": 3,
    "question": "機械学習の手法に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ クラスタリングはカテゴリ型変数を予測する手法であり、教師あり学習に含まれる。\nｂ クラスタリングはデータをグループに分ける手法であり、教師なし学習に含まれる。\nｃ 分類はカテゴリ型変数を予測する手法であり、教師あり学習に含まれる。\nｄ 分類はデータをグループに分ける手法であり、教師あり学習に含まれる。\nｅ 回帰はデータをグループに分ける手法であり、教師なし学習に含まれる。",
    "choices": {
      "ア": "ａとｄ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｂとｄ",
      "オ": "ｃとｅ"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "クラスタリングは教師なしでデータをグループに分け、分類は教師ありでカテゴリ型の目的変数を予測する。ｂは正しいが、ｄはあらかじめ定めたカテゴリを予測する分類の特徴を説明していない。",
    "choiceExplanations": {
      "ア": "ラベルなしで似たデータをまとめるのがクラスタリングであり、カテゴリの予測を行う分類とは区別する。",
      "イ": "クラスタリングは教師なし学習である。回帰は一般に教師あり学習で連続値などを予測する。",
      "ウ": "クラスタリングは教師なしでデータをグループに分け、分類は教師ありでカテゴリ型の目的変数を予測する。",
      "エ": "ｂは正しいが、ｄはあらかじめ定めたカテゴリを予測する分類の特徴を説明していない。",
      "オ": "ｃは正しいが、回帰はデータのグループ分けではなく、数値の予測に用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 16,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "パスワード管理",
    "topicTags": [
      "パスワード管理"
    ],
    "difficulty": 3,
    "question": "パスワードを適切に設定して管理することは、ネットワーク社会でセキュリティを守るための基本である。総務省は、「ID とパスワードの設定と管理のあり方（国民のための情報セキュリティサイト）」でパスワードの設定と管理についての留意点をあげている。パスワードの漏洩リスクを低減するための個人や組織の対策として、最も不適切なものはどれか。",
    "choices": {
      "ア": "アカウントの乗っ取りやパスワード流出の事実がなくとも、管理者がユーザにパスワードの定期的変更を要求すること。",
      "イ": "パスワードのメモをディスプレイなど他人の目に触れる場所に貼ったりしないこと。",
      "ウ": "パスワードを電子メールでやりとりしないこと。",
      "エ": "パスワードを複数のサービスで使い回さないこと。",
      "オ": "やむを得ずパスワードをメモなどに記載した場合は、鍵のかかる机や金庫など安全な方法で保管すること。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "漏えいが起きていないときの一律の定期変更は、推測されやすい変更や使い回しを招くおそれがある。漏えいの疑いがある場合は変更する。",
    "choiceExplanations": {
      "ア": "漏えいが起きていないときの一律の定期変更は、推測されやすい変更や使い回しを招くおそれがある。漏えいの疑いがある場合は変更する。",
      "イ": "他人の目に触れないようにすることで、書き留めたパスワードの漏えいを防ぎやすい。",
      "ウ": "メールは保存や転送によって広がり得るため、パスワードを送らないのは漏えい対策になる。",
      "エ": "使い回さなければ、一つのサービスで流出した情報が別のサービスへのログインに使われる被害を抑えられる。",
      "オ": "メモが必要な場合は、他者が閲覧できない施錠場所などで保管する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 17,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "リスク対応",
    "topicTags": [
      "リスク対応"
    ],
    "difficulty": 3,
    "question": "情報セキュリティマネジメントにおいては、情報セキュリティリスクアセスメントの結果に基づいて、リスク対応のプロセスを決定する必要がある。リスク対応に関する記述とその用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ リスクを伴う活動の停止やリスク要因の根本的排除により、当該リスクが発生しない状態にする。\nｂ リスク要因の予防や被害拡大防止措置を講じることにより、当該リスクの発生確率や損失を減じる。\nｃ リスクが受容可能な場合や対策費用が損害額を上回るような場合には、あえて何も対策を講じない。\nｄ 保険に加入したり、業務をアウトソーシングするなどして、他者との間でリスクを分散する。",
    "choices": {
      "ア": "ａ：リスク移転 ｂ：リスク低減 ｃ：リスク回避 ｄ：リスク保有",
      "イ": "ａ：リスク移転 ｂ：リスク保有 ｃ：リスク回避 ｄ：リスク低減",
      "ウ": "ａ：リスク回避 ｂ：リスク移転 ｃ：リスク保有 ｄ：リスク低減",
      "エ": "ａ：リスク回避 ｂ：リスク低減 ｃ：リスク保有 ｄ：リスク移転",
      "オ": "ａ：リスク低減 ｂ：リスク回避 ｃ：リスク移転 ｄ：リスク保有"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "活動停止は回避、予防や被害軽減は低減である。リスクの受容は保有、保険や外部委託による負担の分散は移転である。",
    "choiceExplanations": {
      "ア": "活動を止めてリスクの発生をなくすａは、移転ではなく回避である。",
      "イ": "対策なしで受容するｃが保有であり、業務停止などで発生を防ぐａが回避である。",
      "ウ": "ａとｃは適切だが、損失や発生確率を抑えるｂが低減で、保険等で他者と負担を分けるｄが移転である。",
      "エ": "活動停止は回避、予防や被害軽減は低減である。リスクの受容は保有、保険や外部委託による負担の分散は移転である。",
      "オ": "ａはリスク自体をなくす回避、ｂは残るリスクを抑える低減であり、回避と低減の割当てが逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 18,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "サービスマネジメント",
    "topicTags": [
      "サービスマネジメント"
    ],
    "difficulty": 3,
    "question": "IT サービスマネジメントとは、IT サービス提供者が、提供する IT サービスを効率的かつ効果的に運営管理するための枠組みである。IT サービスマネジメントに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "COSO は、IT サービスマネジメントのベストプラクティス集である。",
      "イ": "IT サービスマネジメントシステムの構築に経営者が深く関与することは、避けた方が良い。",
      "ウ": "IT サービスマネジメントシステムの認証を受けると P マークを取得できる。",
      "エ": "IT サービスマネジメントにおけるインシデントとは、顧客情報の流出によってセキュリティ上の脅威となる事象のことをいう。",
      "オ": "SLA は、サービス内容およびサービス目標値に関するサービス提供者と顧客間の合意である。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "SLAは提供されるサービスと、その稼働率や応答時間などの目標水準について、提供者と顧客が合意したものである。",
    "choiceExplanations": {
      "ア": "COSOは内部統制などの枠組みである。ITサービスマネジメントの実務指針として知られるものにはITILがある。",
      "イ": "経営者の関与は、方針や責任、必要な資源を確保して仕組みを運用するうえで重要である。",
      "ウ": "Pマークは個人情報の保護体制に関する制度で、ITサービスマネジメントシステムの認証とは別である。",
      "エ": "インシデントにはITサービスの中断や品質の低下が含まれる。顧客情報の流出だけを指すわけではない。",
      "オ": "SLAは提供されるサービスと、その稼働率や応答時間などの目標水準について、提供者と顧客が合意したものである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 19,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "EVM",
    "topicTags": [
      "EVM"
    ],
    "difficulty": 3,
    "question": "中小企業Ａ社では、基幹業務系システムの刷新プロジェクトを進めている。先月のプロジェクト会議で、PV（出来高計画値）が 1,200 万円、AC（コスト実績値）が800 万円、EV（出来高実績値）が 600 万円であることが報告された。このとき、コスト効率指数（CPI）とスケジュール効率指数（SPI）に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "CPI は 0.50 であり、SPI は 0.67 である。",
      "イ": "CPI は 0.50 であり、SPI は 0.75 である。",
      "ウ": "CPI は 0.67 であり、SPI は 0.50 である。",
      "エ": "CPI は 0.67 であり、SPI は 0.75 である。",
      "オ": "CPI は 0.75 であり、SPI は 0.50 である。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "CPIはEV÷AC＝600÷800＝0.75である。SPIはEV÷PV＝600÷1 200＝0.50となる。",
    "choiceExplanations": {
      "ア": "0.50はEV÷PVで求めるSPIである。CPIはEV÷ACで計算する。",
      "イ": "CPIとSPIの値が入れ替わっている。コストはAC、スケジュールはPVをそれぞれ分母とする。",
      "ウ": "SPIの0.50は合うが、CPIは600÷800で0.75になる。",
      "エ": "どちらも出来高実績値EVを分子にする。CPIは0.75、SPIは0.50である。",
      "オ": "CPIはEV÷AC＝600÷800＝0.75である。SPIはEV÷PV＝600÷1 200＝0.50となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 20,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "デジタル署名",
    "topicTags": [
      "デジタル署名"
    ],
    "difficulty": 3,
    "question": "デジタル署名に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 送信者のなりすましを防ぎ、本人が送信したメッセージであることを証明できる。\nｂ 送信されたメッセージが改変（改ざん）されていないことを検知できる。\nｃ 送信されたメッセージが傍受（盗聴）されていないことを証明できる。\nｄ 送信者はメッセージのダイジェストを公開鍵で暗号化し、受信者は秘密鍵で復号する。\nｅ 電子証明書は、秘密鍵の所有者を証明するものである。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｃとｄ",
      "オ": "ｄとｅ"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "デジタル署名は署名者の公開鍵で検証でき、署名されたデータの改ざんを検知できる。ａは正しいが、証明書が結び付けるのは公開鍵とその主体の情報である。秘密鍵を証明書で開示したり証明したりしない。",
    "choiceExplanations": {
      "ア": "デジタル署名は署名者の公開鍵で検証でき、署名されたデータの改ざんを検知できる。",
      "イ": "ａは正しいが、証明書が結び付けるのは公開鍵とその主体の情報である。秘密鍵を証明書で開示したり証明したりしない。",
      "ウ": "ｂは正しいが、署名だけでは内容の秘匿や盗聴の有無の証明はできない。",
      "エ": "ｃは機密性と署名を混同している。署名する際には署名者の秘密鍵を使い、検証には公開鍵を使う。",
      "オ": "署名と検証の鍵の役割が逆であり、電子証明書の対象も秘密鍵ではなく公開鍵である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 21,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "システムの評価",
    "topicTags": [
      "システムの評価"
    ],
    "difficulty": 3,
    "question": "情報システムの信頼性や性能を正しく評価することは重要である。情報システムの評価に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 可用性とは、高い稼働率を維持できることを意味し、ターンアラウンドタイムで測定する。\nｂ 完全性とは、データが矛盾を起こさずに一貫性を保っていることを意味する。\nｃ スループットとは、単位時間当たりに処理できる処理件数を意味する。\nｄ レスポンスタイムとは、システムに処理要求を送ってから結果の出力が終了するまでの時間を意味する。\nｅ RASIS とは、可用性・完全性・機密性の 3 つを指している。",
    "choices": {
      "ア": "ａとｄ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｂとｄ",
      "オ": "ｃとｅ"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "完全性はデータの一貫性や正確さに関わる。スループットは単位時間当たりに処理できる量である。ｂは正しいが、要求からすべての出力が終わるまでの時間はターンアラウンドタイムに当たる。",
    "choiceExplanations": {
      "ア": "可用性は利用できる状態を維持する性質で、処理の完了までの時間を直接の尺度にはしない。ｄは結果全体の出力が終わるまでを述べている。",
      "イ": "可用性をターンアラウンドタイムで測定する説明は誤りである。RASISは信頼性、可用性、保守性、完全性、機密性の五つを指す。",
      "ウ": "完全性はデータの一貫性や正確さに関わる。スループットは単位時間当たりに処理できる量である。",
      "エ": "ｂは正しいが、要求からすべての出力が終わるまでの時間はターンアラウンドタイムに当たる。",
      "オ": "ｃは正しいが、三つの性質は情報セキュリティの基本要素であり、RASISは信頼性や保守性も含む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 22,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "クラウド",
    "topicTags": [
      "クラウド"
    ],
    "difficulty": 3,
    "question": "情報システムを利用するには、ハードウェアやソフトウェアを何らかの形で準備する必要がある。コンピュータ資源の利用の仕方に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ クラウドコンピューティングとは、データやアプリケーションなどのコンピュータ資源をネットワーク経由で利用する仕組みのことである。\nｂ CaaS（Cloud as a Service）とは、クラウドサービスの類型の 1 つで、クラウド上で他のクラウドサービスを提供するハイブリッド型を指す。\nｃ ホスティングとは、データセンターが提供するサービスの 1 つで、ユーザはサーバなどの必要な機器を用意して設置し、遠隔から利用する。\nｄ ハウジングとは、データセンターが提供するサービスの 1 つで、事業者が提供するサーバを借りて遠隔から利用する。\nｅ コロケーションとは、サーバを意識せずにシステムを構築・運用するという考え方に基づいており、システムの実行時間に応じて課金される。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｃとｄ",
      "オ": "ｄとｅ"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "ａはネットワーク経由での計算資源の利用を説明している。ｂは、この問題でCloud as a Serviceと表記されたクラウド提供形態の説明として公式正答に含まれる。",
    "choiceExplanations": {
      "ア": "ａはネットワーク経由での計算資源の利用を説明している。ｂは、この問題でCloud as a Serviceと表記されたクラウド提供形態の説明として公式正答に含まれる。",
      "イ": "ａは適切だが、コロケーションは利用者の機器をデータセンター等の設備に設置するサービスであり、実行時間課金の方式を指さない。",
      "ウ": "ｃは利用者が自分で用意した機器を預ける説明であり、ホスティングではなくハウジングなどに当たる。",
      "エ": "事業者が用意したサーバを借りるのがホスティングで、利用者の機器を預けるのがハウジングである。",
      "オ": "ｄは事業者の機器を使うホスティングの説明である。ｅのサーバを意識せず実行する方式はサーバーレスに近い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 23,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "仮説検定",
    "topicTags": [
      "仮説検定"
    ],
    "difficulty": 3,
    "question": "統計的仮説検定に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 第 1 種の過誤とは、帰無仮説が真であるにもかかわらず帰無仮説を棄却してしまう誤りをいう。\nｂ 第 1 種の過誤とは、帰無仮説が偽であるにもかかわらず帰無仮説を採択してしまう誤りをいう。\nｃ 第 2 種の過誤とは、帰無仮説が偽であるにもかかわらず帰無仮説を採択してしまう誤りをいう。\nｄ 第 2 種の過誤とは、帰無仮説が真であるにもかかわらず帰無仮説を棄却してしまう誤りをいう。\nｅ 有意水準（危険率）とは、第 1 種の過誤を犯す確率のことである。\nｆ 有意水準（危険率）とは、第 2 種の過誤を犯す確率のことである。\nｇ 検定力（検出力）とは、第 1 種の過誤を犯す確率のことである。",
    "choices": {
      "ア": "ａとｃとｅ",
      "イ": "ａとｃとｆ",
      "ウ": "ａとｆとｇ",
      "エ": "ｂとｄとｅ",
      "オ": "ｂとｄとｇ"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "第1種の過誤は真の帰無仮説を棄却し、第2種の過誤は偽の帰無仮説を棄却できないことである。有意水準は第1種の過誤に対して設定する。",
    "choiceExplanations": {
      "ア": "第1種の過誤は真の帰無仮説を棄却し、第2種の過誤は偽の帰無仮説を棄却できないことである。有意水準は第1種の過誤に対して設定する。",
      "イ": "ａとｃは合うが、有意水準が対応するのは第2種でなく第1種の過誤である。",
      "ウ": "有意水準は第1種の過誤に関わり、検定力は偽の帰無仮説を正しく棄却する確率である。",
      "エ": "ｅは合うが、ｂは第2種、ｄは第1種の過誤の記述であり、名称が入れ替わっている。",
      "オ": "ｂとｄは過誤の種類が逆である。検定力は第2種の過誤を犯さない確率である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 24,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "推定",
    "topicTags": [
      "推定"
    ],
    "difficulty": 3,
    "question": "200 人が受験した試験結果から 10 人の得点を無作為に抽出して並べ替えたところ、以下のとおりであった。\n2 2 4 5 5 7 8 8 9 10\n\n点推定による母平均と母分散の推定値に関する記述として、最も適切なものはどれか。なお、母分散の推定には不偏分散を用いることとする。",
    "choices": {
      "ア": "母平均の推定値は 6.0 であり、母分散の推定値は 6.5 である。",
      "イ": "母平均の推定値は 6.0 であり、母分散の推定値は 7.2 である。",
      "ウ": "母平均の推定値は 6.0 であり、母分散の推定値は 8.0 である。",
      "エ": "母平均の推定値は 6.7 であり、母分散の推定値は 7.2 である。",
      "オ": "母平均の推定値は 6.7 であり、母分散の推定値は 8.5 である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "得点の合計は60なので標本平均は6.0である。偏差平方和72を自由度9で割ると不偏分散は8.0となる。",
    "choiceExplanations": {
      "ア": "平均6.0は合うが、偏差平方和は72となる。不偏分散では9で割る。",
      "イ": "7.2は偏差平方和72を標本の数10で割った値であり、不偏分散には標本の数から1を引いた値を使う。",
      "ウ": "得点の合計は60なので標本平均は6.0である。偏差平方和72を自由度9で割ると不偏分散は8.0となる。",
      "エ": "平均は60÷10＝6.0である。不偏分散の分母は10でなく9なので、7.2ともならない。",
      "オ": "標本平均は6.0となり、偏差平方和72から計算する不偏分散は8.0である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2022-annual-keiei-joho-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2022,
    "qNumber": 25,
    "examDate": "2022-08-07",
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ブロックチェーン",
    "topicTags": [
      "ブロックチェーン"
    ],
    "difficulty": 3,
    "question": "ブロックチェーン技術に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "NFT（Non‑Fungible Token）は、ブロックチェーン技術を基に作られた一意で代替不可能なトークンであり、デジタルコンテンツに対応した NFT を発行することにより唯一性・真正性を証明できる。",
      "イ": "PoW（Proof of Work）とは、ブロックチェーン上に新たなトランザクションを追加するための合意形成メカニズムの 1 つで、承認権限を持つ人のコンセンサスで決める。",
      "ウ": "スマートコントラクトは、ブロックチェーン上に保存されたプログラムコードのことであり、暗号資産の取引に限定して利用される。",
      "エ": "ブロックチェーンネットワークでは、パブリック型、コンソーシアム型、プライベート型のいずれにおいても中央管理者を置くことはない。",
      "オ": "ブロックチェーンはブロック間のデータの連続性を保証する技術の 1 つであり、追加されたブロックが前のブロックのナンス値を保持することによって連続性が確保されている。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "NFTは個別に識別できる非代替性トークンである。対応するコンテンツとの関係を記録することで、トークンの唯一性や来歴の確認に用いられる。",
    "choiceExplanations": {
      "ア": "NFTは個別に識別できる非代替性トークンである。対応するコンテンツとの関係を記録することで、トークンの唯一性や来歴の確認に用いられる。",
      "イ": "PoWでは計算課題を解いたことを根拠にブロックの作成を競う。承認権限者の投票などで決める方式ではない。",
      "ウ": "スマートコントラクトは条件に応じた処理を実行するコードで、暗号資産のほかにも契約処理や来歴管理などに応用される。",
      "エ": "プライベート型などでは、特定組織が参加権限や運用を管理する形態がある。すべてで中央管理主体が存在しないわけではない。",
      "オ": "各ブロックは前のブロックのハッシュ値を使って連結される。前のブロックのナンス値で連結するわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2022/F1ji2022.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r04/1j_seikai/2022fv2.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和4年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  }
];
