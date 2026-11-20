import type { Question } from "@/lib/questions/types";

export const CHUSHO_2023_F_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 1,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "フラッシュメモリ",
    "topicTags": [
      "フラッシュメモリ"
    ],
    "difficulty": 3,
    "question": "フラッシュメモリに関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ 揮発性メモリであるので、紫外線を照射することでデータを消去できる。\nｂ 不揮発性メモリであるので、電源を切っても記憶していたデータを保持できる。\nｃ NAND 型と NOR 型を比べると、読み出し速度は NAND 型の方が速い。\nｄ NAND 型と NOR 型を比べると、書き込み速度は NAND 型の方が速い。\nｅ NOR 型は、USB メモリや SSD などの外部記憶装置に用いられている。",
    "choices": {
      "ア": "ａとｄ",
      "イ": "ａとｅ",
      "ウ": "ｂとｃ",
      "エ": "ｂとｄ",
      "オ": "ｃとｅ"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ｂのとおり電源を切っても内容を保持でき、ｄのとおり一般にNAND型はNOR型より書込みが速い。ｃの読出し特性は逆であり、ｅに挙げられたUSBメモリやSSDの主流はNAND型である。",
    "choiceExplanations": {
      "ア": "フラッシュメモリは不揮発性で、書込み内容は電気的に消去するため、ａが誤りである。",
      "イ": "ａは紫外線による消去と取り違え、ｅの外部記憶装置には通常NAND型が使われる。",
      "ウ": "ｂは正しいが、一般にランダム読出しに優れるのはNOR型なのでｃは誤りである。",
      "エ": "ｂのとおり電源を切っても内容を保持でき、ｄのとおり一般にNAND型はNOR型より書込みが速い。",
      "オ": "ｃの読出し特性は逆であり、ｅに挙げられたUSBメモリやSSDの主流はNAND型である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 2,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "正規表現",
    "topicTags": [
      "正規表現"
    ],
    "difficulty": 3,
    "question": "正規表現は、さまざまな文字列を汎用的な形式で表現する方法の 1 つであり、テキストエディタ、プログラミング言語、検索エンジンなどで利用可能になっている。正規表現の用途に関する記述として、最も不適切なものはどれか。",
    "choices": {
      "ア": "顧客名簿の電子メールアドレスから＠より前の部分（ユーザ名）を取得する。",
      "イ": "店舗別売上高一覧から売上高の大きい上位 5 店舗を抽出する。",
      "ウ": "文章中の「METI」を「経済産業省」に置き換える。",
      "エ": "報告書の「3/31/2023」の形式で表記されている日付を「2023-3-31」の形式に変換する。",
      "オ": "領収書に記載するクレジットカード番号の一部を「＊」で伏字にする。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "店舗別売上高の上位5件を得るには、数値を比較して並べ替える処理が必要である。正規表現は文字列の照合に用いる。",
    "choiceExplanations": {
      "ア": "メールアドレスの＠より前の文字列をパターンで捕捉すれば、ユーザ名を取り出せる。",
      "イ": "店舗別売上高の上位5件を得るには、数値を比較して並べ替える処理が必要である。正規表現は文字列の照合に用いる。",
      "ウ": "METIに一致する文字列を検索し、日本語の省名に置き換える処理に利用できる。",
      "エ": "月・日・年をそれぞれ捕捉し、置換時に年・月・日の順に並べ直すことができる。",
      "オ": "カード番号のうち指定の桁を正規表現で捕捉し、その部分を＊に置換できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 3,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "深層学習",
    "topicTags": [
      "深層学習"
    ],
    "difficulty": 3,
    "question": "深層学習（ディープラーニング）に関する以下の文章の空欄Ａ～Ｄに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。深層学習は、ディープニューラルネットワークを用いた学習方法のことである。ニューラルネットワークは、入力層、 Ａ 、出力層の 3 つの層から構成されるが、特に Ａ が複数あるニューラルネットワークはディープニューラルネットワークと呼ばれる。また、ニューラルネットワークの中の Ｂ において、複数の入力の重み付け総和などの値から、その出力を決定するための関数は Ｃ と呼ばれる。代表的な Ｃ には、 Ｄ 、双曲線正接関数、ReLU などがあり、これらは目的に応じて使い分けられる。",
    "choices": {
      "ア": "Ａ：畳み込み層 Ｂ：シナプス Ｃ：誤差関数 Ｄ：シグモイド関数",
      "イ": "Ａ：畳み込み層 Ｂ：ニューロン Ｃ：活性化関数 Ｄ：ハッシュ関数",
      "ウ": "Ａ：隠れ層 Ｂ：シナプス Ｃ：誤差関数 Ｄ：シグモイド関数",
      "エ": "Ａ：隠れ層 Ｂ：ニューロン Ｃ：活性化関数 Ｄ：シグモイド関数",
      "オ": "Ａ：隠れ層 Ｂ：ニューロン Ｃ：誤差関数 Ｄ：ハッシュ関数"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "隠れ層が複数あるネットワークで、各ニューロンは活性化関数を通して出力する。シグモイド関数がその一例である。",
    "choiceExplanations": {
      "ア": "入力層と出力層の間を一般に隠れ層と呼ぶ。誤差関数は学習結果のずれを評価するための関数である。",
      "イ": "畳み込み層は特定の処理を行う層で、隠れ層全体の呼称ではない。ハッシュ関数も代表的な活性化関数には当たらない。",
      "ウ": "シナプスはニューロン間の結合に相当し、重み付き総和から出力を決める単位はニューロンである。",
      "エ": "隠れ層が複数あるネットワークで、各ニューロンは活性化関数を通して出力する。シグモイド関数がその一例である。",
      "オ": "出力を変換するのは活性化関数で、誤差関数は予測のずれを測る。ハッシュ関数は通常この出力変換に使われない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 4,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "半構造化データ",
    "topicTags": [
      "半構造化データ"
    ],
    "difficulty": 3,
    "question": "近年、デジタルデータの多様化に伴い、構造化データに加えて半構造化データならびに非構造化データの利活用の重要性が高まっている。半構造化データの例として、最も適切な組み合わせを下記の解答群から選べ。なお、ここで半構造化データとは、あらかじめスキーマを定義せず、データにキーやタグなどを付加することで、データ構造を柔軟に定義できるデータをいう。\nａ 音・画像・動画データ\nｂ リレーショナルデータベースの表\nｃ JSON 形式のデータ\nｄ XML 形式のデータ\nｅ YAML 形式のデータ",
    "choices": {
      "ア": "ａとｂとｅ",
      "イ": "ａとｃとｄ",
      "ウ": "ａとｃとｅ",
      "エ": "ｂとｄとｅ",
      "オ": "ｃとｄとｅ"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "JSONとYAMLはキーや階層、XMLはタグなどで柔軟に構造を表せるため、三つとも半構造化データの例である。",
    "choiceExplanations": {
      "ア": "音・画像・動画は一般に非構造化であり、リレーショナル表はあらかじめ列などが定義された構造化データである。",
      "イ": "JSONとXMLは半構造化データとして利用できるが、音・画像・動画の本体は一般に非構造化データである。",
      "ウ": "JSONとYAMLの組合せに音・画像・動画を加えているが、媒体の本体は一般にキーやタグで構造化されたデータではない。",
      "エ": "XMLやYAMLではデータ自体がタグやキーで構造を示せるが、リレーショナル表は列の定義に従う構造化データである。",
      "オ": "JSONとYAMLはキーや階層、XMLはタグなどで柔軟に構造を表せるため、三つとも半構造化データの例である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 5,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "DBMS",
    "topicTags": [
      "DBMS"
    ],
    "difficulty": 3,
    "question": "データベース管理システム（DBMS）に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "インデックス法とは、プログラムが DBMS へアクセスする際に、一度確立したコネクションを維持して再利用するための仕組みをいう。",
      "イ": "ストアドプロシージャとは、表やビューに対する一連の処理を 1 つのプログラムとしてまとめ、DBMS に格納したものをいう。",
      "ウ": "トリガとは、SQL の問い合わせによって得られた結果セットのレコードを 1つずつ読み込んで行う処理をいう。",
      "エ": "レプリケーションとは、IoT 機器などから連続的に発生するデータをリアルタイムに収集、分析、検出、加工する処理をいう。",
      "オ": "ロールフォワードとは、表のフィールド値を更新すると、関連づけられている他の表のフィールド値も同時に更新させるための仕組みをいう。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "ストアドプロシージャは複数のSQL処理などをまとめてDBMSに保存し、呼び出して実行する仕組みである。",
    "choiceExplanations": {
      "ア": "確立した接続を再利用するのはコネクションプーリングである。インデックスは検索を効率化する索引を指す。",
      "イ": "ストアドプロシージャは複数のSQL処理などをまとめてDBMSに保存し、呼び出して実行する仕組みである。",
      "ウ": "結果集合を一行ずつたどるのはカーソルである。トリガは更新などの所定の事象に応じて自動実行される。",
      "エ": "リアルタイムに連続データを処理するのはストリーム処理である。レプリケーションはデータの複製を維持することをいう。",
      "オ": "関連する行を連動更新するのは参照整合性のカスケードなどである。ロールフォワードは更新ログを順に適用して復元する処理を指す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 6,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "負荷分散",
    "topicTags": [
      "負荷分散"
    ],
    "difficulty": 3,
    "question": "サーバへのアクセス集中はサーバのレスポンス低下を招き、著しく利便性を損なう可能性がある。そこで、ロードバランサ（負荷分散装置）を設置するなどして、適切に負荷を分散させる必要がある。負荷分散に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "DNS ラウンドロビン方式とは、ロードバランサが DNS（Domain Name Server）の機能を持つことによってクライアントのリクエストを振り分ける方式のことである。",
      "イ": "DSR（Direct Server Return）とは、クライアントからサーバへのリクエスト時にはロードバランサを経由させるが、サーバからクライアントへのレスポンス時にはロードバランサを経由せずに、クライアントにパケットを直接送る仕組みのことである。",
      "ウ": "アダプティブ方式とは、事前に設定された割り当て比率に応じて、クライアントからのリクエストを振り分ける方式のことである。",
      "エ": "最速応答時間方式とは、接続数が最も少ないサーバに、クライアントからのリクエストを振り分ける方式のことである。",
      "オ": "マルチホーミングとは、複数の ISP（Internet Service Provider）と契約してインターネット接続回線を複数持つことであり、アクセスが集中してある回線で通信障害が発生したときに、ロードバランサが他の回線に切り替える仕組みのことである。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "DSRでは要求を負荷分散装置で振り分け、応答は処理したサーバからクライアントへ直接返して負荷分散装置を経由しない。",
    "choiceExplanations": {
      "ア": "DNSラウンドロビンではDNSが同じ名前に対して複数のIPアドレスを順に返す。専用のロードバランサがDNS機能を内蔵することは要件ではない。",
      "イ": "DSRでは要求を負荷分散装置で振り分け、応答は処理したサーバからクライアントへ直接返して負荷分散装置を経由しない。",
      "ウ": "事前に固定した比率で配分するのは重み付きの方式であり、アダプティブ方式は測定した負荷などに応じて配分を変える。",
      "エ": "接続数が最少のサーバを選ぶ方式と、測定した応答時間が最短のサーバを選ぶ方式は判断する指標が異なる。",
      "オ": "マルチホーミングは複数の接続経路を持つ構成である。経路を別の回線に切り替える仕組みをロードバランサに限定する説明は適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 7,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ファイル形式",
    "topicTags": [
      "ファイル形式"
    ],
    "difficulty": 3,
    "question": "Web サイトを構築する場合などにおいては、音・画像・動画データを利用することが多い。これらの保存にはさまざまなファイル形式が利用される。これらのファイル形式に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "AVI は、ストリーミング配信向けの動画データのファイル形式であり、動画データの再生や複製、変更を制限することができる。",
      "イ": "BMP と JPEG は、可逆圧縮方式による画像データのファイル形式であり、フルカラーで画像データを保存できる。",
      "ウ": "GIF と PNG は、非可逆圧縮方式による画像データのファイル形式であり、フルカラーで画像データを保存できる。",
      "エ": "MP3 は、可逆圧縮方式による音データのファイル形式であり、音楽 CD 並みの音質を保ちながら音データを保存できる。",
      "オ": "MP4 は、音・画像・動画などの複数データをまとめて格納することができるファイル形式である。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "MP4は映像・音声・字幕などの複数のストリームをまとめて格納できるコンテナ形式である。AVIは映像と音声などの格納形式で、配信向けの著作権管理や再生・複製制限を標準の特徴とする形式ではない。",
    "choiceExplanations": {
      "ア": "AVIは映像と音声などの格納形式で、配信向けの著作権管理や再生・複製制限を標準の特徴とする形式ではない。",
      "イ": "BMPは通常無圧縮などで保存され、一般に使われるJPEGの圧縮は非可逆である。",
      "ウ": "GIFとPNGはいずれも可逆圧縮を利用し、GIFの1画像は通常256色までのパレットで表現する。",
      "エ": "MP3は聴覚の特性を利用して削減した情報を元に戻せない非可逆圧縮方式を採用する。",
      "オ": "MP4は映像・音声・字幕などの複数のストリームをまとめて格納できるコンテナ形式である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 8,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "正規化",
    "topicTags": [
      "正規化"
    ],
    "difficulty": 3,
    "question": "以下に示す表は、ある小売店が利用している受注管理表の一部である。この表に関する正規化の観点からの記述として、最も適切なものを下記の解答群から選べ。ただし、枝番は 1 回の受注で商品コード別に連番で発行される番号であるとし、単価は商品コードによって一意に定まるものとする。",
    "choices": {
      "ア": "第 1 正規形であるが、第 2 正規形ではない。",
      "イ": "第 1 正規形ではない。",
      "ウ": "第 2 正規形であるが、第 1 正規形ではない。",
      "エ": "第 2 正規形であるが、第 3 正規形ではない。",
      "オ": "第 3 正規形である。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "各欄は単一値なので第1正規形である。複合キーの一部である受注番号だけで受注日や得意先コードが定まるため、第2正規形ではない。",
    "choiceExplanations": {
      "ア": "各欄は単一値なので第1正規形である。複合キーの一部である受注番号だけで受注日や得意先コードが定まるため、第2正規形ではない。",
      "イ": "同じ受注番号が複数行に登場しても、各行の欄に繰返しグループはなく、各欄の値は単一である。",
      "ウ": "第2正規形は第1正規形であることを前提とするので、この組合せは成り立たない。",
      "エ": "受注日や得意先コードが受注番号だけで定まる部分関数従属性があり、第2正規形の要件を満たさない。",
      "オ": "第3正規形以前に、複合キーの一部だけで決まる受注日などがあり、第2正規形の条件を満たしていない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-keiei-joho-q8.png"
    ],
    "imageAltTexts": [
      "受注明細5行の表。列は受注番号、枝番、受注日、得意先コード、商品コード、販売数量、単価。各受注番号に複数の枝番がある。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 9,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "SQL",
    "topicTags": [
      "SQL"
    ],
    "difficulty": 3,
    "question": "以下に示す、ある小売店における販売データ「取引記録」から併売分析を行いたい。異なる 2 つの商品の組み合わせに対して、それらが同時に取引された件数を求める「集計結果」を得るための SQL 文を考える。以下の SQL 文の空欄①～③に入る記述の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n【SQL 文】\nSELECT A.商品ID AS 商品1, B.商品ID AS 商品2, COUNT(*) AS 件数\nFROM 取引記録 AS A, 取引記録 AS B\nWHERE ① AND ②\nGROUP BY A.商品ID, B.商品ID\nORDER BY 件数 ③;",
    "choices": {
      "ア": "①：A. 取引 ID ＝ B. 取引 ID ②：A. 商品 ID ＜ B. 商品 ID ③：DESC",
      "イ": "①：A. 取引 ID ＝ B. 取引 ID ②：A. 商品 ID ＜ B. 商品 ID ③：ASC",
      "ウ": "①：A. 取引 ID ＝ B. 取引 ID ②：A. 商品 ID ＜＞ B. 商品 ID ③：ASC",
      "エ": "①：A. 取引 ID ＜ B. 取引 ID ②：A. 商品 ID ＝ B. 商品 ID ③：DESC",
      "オ": "①：A. 取引 ID ＜ B. 取引 ID ②：A. 商品 ID ＜＞ B. 商品 ID ③：ASC"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "取引IDの一致で同じ取引だけを結合し、商品IDの大小で同一商品と重複する順序を除く。件数はDESCで降順になる。",
    "choiceExplanations": {
      "ア": "取引IDの一致で同じ取引だけを結合し、商品IDの大小で同一商品と重複する順序を除く。件数はDESCで降順になる。",
      "イ": "商品ペアを求める条件は合っているが、ASCでは件数の小さい順となり、提示された集計結果と逆になる。",
      "ウ": "商品IDの不一致だけでは商品PとQの組合せを順序を入れ替えて二重に集計する。ASCも提示結果の件数順に合わない。",
      "エ": "取引IDの大小は別の取引を結合し、商品IDの一致は同一商品だけを選ぶので、設問の同時購入の定義に合わない。",
      "オ": "取引IDの大小を用いると、同一取引内の商品ペアを集計できない。商品IDの不一致だけでは組合せの順序も固定できない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-keiei-joho-q9.png"
    ],
    "imageAltTexts": [
      "取引記録と集計結果の表。取引記録は管理番号、取引ID、商品ID、数量を持ち、集計結果は異なる商品1と商品2の組合せと件数を件数の降順で示している。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 10,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ストレージ",
    "topicTags": [
      "ストレージ"
    ],
    "difficulty": 3,
    "question": "ストレージ技術に関する以下のａ～ｅの記述とその用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ RAID 技術の 1 つで、ストライピングによって管理する方式。\nｂ RAID 技術の 1 つで、ミラーリングによって管理する方式。\nｃ ファイバチャネルや TCP/IP などの転送方式を利用して構築されたストレージ専用のネットワーク。\nｄ 既存のネットワーク (LAN) に直接接続し、コンピュータなどからネットワークを通じてアクセスできるストレージ。\nｅ ストレージを仮想化して割り当てておき、実データの増加に応じて物理的なストレージを増設する管理技術。",
    "choices": {
      "ア": "ａ：RAID0 ｂ：RAID1 ｃ：NAS ｄ：SAN ｅ：シンプロビジョニング",
      "イ": "ａ：RAID0 ｂ：RAID1 ｃ：SAN ｄ：NAS ｅ：シンプロビジョニング",
      "ウ": "ａ：RAID0 ｂ：RAID5 ｃ：SAN ｄ：DAS ｅ：シックプロビジョニング",
      "エ": "ａ：RAID1 ｂ：RAID0 ｃ：DAS ｄ：NAS ｅ：シックプロビジョニング",
      "オ": "ａ：RAID1 ｂ：RAID5 ｃ：NAS ｄ：SAN ｅ：シックプロビジョニング"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "ストライピングはRAID0、ミラーリングはRAID1である。SAN・NASと、物理容量を使う分だけ割り当てるシンプロビジョニングも対応する。",
    "choiceExplanations": {
      "ア": "専用ネットワークはSAN、通常のLANに接続するストレージ機器はNASであり、ｃとｄを逆にしている。",
      "イ": "ストライピングはRAID0、ミラーリングはRAID1である。SAN・NASと、物理容量を使う分だけ割り当てるシンプロビジョニングも対応する。",
      "ウ": "RAID5はパリティを使い、ミラーリングはRAID1である。DASは機器に直接接続するストレージを指す。",
      "エ": "RAID0とRAID1の説明が逆である。専用ネットワークは、直接接続方式のDASではなくSANである。",
      "オ": "ミラーリングはRAID1で、RAID5ではない。またLAN接続型の機器はNASで、SANとは区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 11,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "IPv4",
    "topicTags": [
      "IPv4"
    ],
    "difficulty": 3,
    "question": "IPv4 ネットワークにおいては、ネットワークが使用する IP アドレスの範囲を指定するのにサブネットマスクが利用される。以下のネットワークにおいて、ホストとして使用できる IP アドレスの個数は最大いくつになるか。最も適切なものを下記の解答群から選べ。ネットワークアドレス 172.16.16.32/27サブネットマスク 255.255.255.224なお、これを 2 進法で表すと次のようになる。ネットワークアドレス 10101100 00010000 00010000 00100000サブネットマスク 11111111 11111111 11111111 11100000",
    "choices": {
      "ア": "14",
      "イ": "16",
      "ウ": "24",
      "エ": "30",
      "オ": "32"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ホスト部は5ビットで32通りあり、すべて0とすべて1を除いた32−2＝30個をホストが使える。32個はサブネット内の全アドレス数で、ネットワークアドレスとブロードキャストアドレスを含む。",
    "choiceExplanations": {
      "ア": "14個はホスト部4ビットの場合の2⁴−2である。/27ではホスト部が32−27＝5ビットある。",
      "イ": "16は2⁴であるが、このサブネットにはホスト部が5ビットあり、さらに予約された二つのアドレスを除く。",
      "ウ": "/27に残る5ビットから32個のアドレスが得られ、通常除くのはネットワークとブロードキャストの二つである。",
      "エ": "ホスト部は5ビットで32通りあり、すべて0とすべて1を除いた32−2＝30個をホストが使える。",
      "オ": "32個はサブネット内の全アドレス数で、ネットワークアドレスとブロードキャストアドレスを含む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 12,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "LAN機器",
    "topicTags": [
      "LAN機器"
    ],
    "difficulty": 3,
    "question": "LAN を構成するために必要な装置に関する以下のａ～ｅの記述とその装置名の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ OSI 基本参照モデルの物理層で電気信号を中継する装置。\nｂ OSI 基本参照モデルのデータリンク層の宛先情報を参照してデータフレームを中継する装置。\nｃ OSI 基本参照モデルのネットワーク層のプロトコルに基づいてデータパケットを中継する装置。\nｄ OSI 基本参照モデルのトランスポート層以上で使用されるプロトコルが異なるLAN 同士を接続する装置。\nｅ 無線 LAN を構成する機器の 1 つで、コンピュータなどの端末からの接続要求を受け付けてネットワークに中継する装置。",
    "choices": {
      "ア": "ａ：ブリッジ ｂ：リピータ ｃ：ルータ ｄ：ゲートウェイ ｅ：アクセスポイント",
      "イ": "ａ：リピータ ｂ：アクセスポイント ｃ：ゲートウェイ ｄ：ルータ ｅ：ブリッジ",
      "ウ": "ａ：リピータ ｂ：ブリッジ ｃ：ルータ ｄ：ゲートウェイ ｅ：アクセスポイント",
      "エ": "ａ：リピータ ｂ：ルータ ｃ：ゲートウェイ ｄ：ブリッジ ｅ：アクセスポイント",
      "オ": "ａ：ルータ ｂ：ブリッジ ｃ：アクセスポイント ｄ：ゲートウェイ ｅ：リピータ"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "物理層はリピータ、データリンク層はブリッジ、ネットワーク層はルータで中継する。上位プロトコル間はゲートウェイ、無線接続はアクセスポイントが担当する。",
    "choiceExplanations": {
      "ア": "物理層で中継するのはリピータで、データリンク層でフレームを中継するのがブリッジである。",
      "イ": "無線端末を受け付けるのはアクセスポイントであり、ｂのブリッジやｃのルータとは区別する。",
      "ウ": "物理層はリピータ、データリンク層はブリッジ、ネットワーク層はルータで中継する。上位プロトコル間はゲートウェイ、無線接続はアクセスポイントが担当する。",
      "エ": "フレームを扱うｂはブリッジで、ｃではネットワーク層のパケットを扱うルータが使われる。",
      "オ": "ルータはネットワーク層で動作し、ａのような物理信号の中継にはリピータを用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 13,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "ネットワーク性能",
    "topicTags": [
      "ネットワーク性能"
    ],
    "difficulty": 3,
    "question": "ネットワークシステムの性能に関する以下の文章の空欄Ａ～Ｅに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。単位時間当たりに伝送可能なデータの最大容量を Ａ という。 Ｂなどが原因で、単位時間当たりの実際のデータ伝送量である Ｃ が低下する。伝送の速さは Ｃ だけでは決まらず、転送要求を出してから実際にデータが送られてくるまでに生じる通信の遅延時間である Ｄ が影響する。また、パケットロスや Ｅ は音声や映像の乱れを生じさせる。",
    "choices": {
      "ア": "Ａ：帯域幅 Ｂ：ジッタ Ｃ：ping 値 Ｄ：レイテンシ Ｅ：輻輳（ふくそう）",
      "イ": "Ａ：帯域幅 Ｂ：輻輳（ふくそう） Ｃ：スループット Ｄ：ping 値 Ｅ：ジッタ",
      "ウ": "Ａ：帯域幅 Ｂ：輻輳（ふくそう） Ｃ：スループット Ｄ：レイテンシ Ｅ：ジッタ",
      "エ": "Ａ：トラフィック Ｂ：ジッタ Ｃ：ping 値 Ｄ：輻輳（ふくそう） Ｅ：レイテンシ",
      "オ": "Ａ：トラフィック Ｂ：輻輳（ふくそう） Ｃ：スループット Ｄ：ping 値 Ｅ：レイテンシ"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "上限は帯域幅、実際の伝送量はスループットである。輻輳で実効量が下がり、レイテンシとジッタはそれぞれ遅延とその変動を表す。",
    "choiceExplanations": {
      "ア": "実際の伝送量はスループットであり、往復の応答時間を測るping値の説明ではない。伝送遅延のばらつきはジッタである。",
      "イ": "Ｄは通信の遅延を表す一般名詞のレイテンシである。ping値は特定の測定で得た往復時間を指す。",
      "ウ": "上限は帯域幅、実際の伝送量はスループットである。輻輳で実効量が下がり、レイテンシとジッタはそれぞれ遅延とその変動を表す。",
      "エ": "トラフィックは流れるデータ量を指し、伝送容量の上限は帯域幅である。ping値も実際の伝送量の尺度ではない。",
      "オ": "伝送可能な容量の上限は帯域幅であり、到着遅延のばらつきが音声等を乱すのはジッタの説明である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 14,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "PCM",
    "topicTags": [
      "PCM"
    ],
    "difficulty": 3,
    "question": "コンピュータで音・画像・動画を利用するには、アナログデータをデジタル化する必要がある。音をデジタルデータに変換することを考える。PCM（パルス符号変調）方式でアナログ音声データをデジタルデータに変換する。量子化ビット数 16 ビット、サンプリング周波数 44,100 Hz でステレオ（ 2 チャンネル）の音の 5 分間のデータ量は何バイトか。最も適切な計算式を選べ。ただし、データの圧縮は行わないものとする。",
    "choices": {
      "ア": "（44,100 × 16 × 2）×（5 × 60）× 8",
      "イ": "（44,100 × 16 × 2）×（5 × 60）÷ 8",
      "ウ": "（44,100 × 16 ÷ 2）×（5 × 60）÷ 8",
      "エ": "｛（44,100 ÷ 16）÷ 2 ｝×（5 × 60）× 8",
      "オ": "｛（44,100 ÷ 16）÷ 2 ｝×（5 × 60）÷ 8"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "毎秒44,100サンプルに16ビットと2チャンネルを掛け、300秒分にしてから8で割る。ステレオでは2チャンネルを同時に記録するので、片チャンネルのデータ量に2を掛ける。",
    "choiceExplanations": {
      "ア": "各チャンネルのビット数を合算するところまではよいが、ビットからバイトに直すときは8で割る。",
      "イ": "毎秒44,100サンプルに16ビットと2チャンネルを掛け、300秒分にしてから8で割る。",
      "ウ": "ステレオでは2チャンネルを同時に記録するので、片チャンネルのデータ量に2を掛ける。",
      "エ": "1サンプル当たり16ビットと2チャンネルは乗じる。ビットをバイトに換算するときも8倍せず8で割る。",
      "オ": "最終的なビットからバイトへの換算は合っているが、量子化ビット数とチャンネル数は両方とも掛ける。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 15,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "情報化社会",
    "topicTags": [
      "情報化社会"
    ],
    "difficulty": 3,
    "question": "情報化社会の将来像に関する考え方についての記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "「DX」とは、人件費削減を目的として、企業組織内のビジネスプロセスのデジタル化を進め、人間の仕事を AI やロボットに行わせることを指している。",
      "イ": "「Society5.0」とは、サイバー空間（仮想空間）とフィジカル空間（現実空間）を高度に融合させたシステムにより、経済発展と社会的課題の解決を両立させる人間中心の社会を指している。",
      "ウ": "「Web3.0」とは、情報の送り手と受け手が固定されて送り手から受け手への一方的な流れであった状態が、送り手と受け手が流動化して誰でも Web を通じて情報を受発信できるようになった状態を指している。",
      "エ": "「インダストリー 4.0」とは、ドイツ政府が提唱した構想であり、AI を活用して人間の頭脳をロボットの頭脳に代替させることを指している。",
      "オ": "「第三の波」とは、農業革命（第一の波）、産業革命（第二の波）に続いて、第三の波としてシンギュラリティが訪れるとする考え方を指している。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "Society 5.0は仮想空間と現実空間を高度に融合させ、経済発展と社会課題の解決を両立する人間中心の社会を目指す。",
    "choiceExplanations": {
      "ア": "DXはデジタル技術で事業や組織を変革し価値を生み出す取組で、人件費削減を目的とする自動化だけではない。",
      "イ": "Society 5.0は仮想空間と現実空間を高度に融合させ、経済発展と社会課題の解決を両立する人間中心の社会を目指す。",
      "ウ": "利用者が発信にも参加するWebへの変化はWeb 2.0に当たる。Web 3.0の説明としては適切でない。",
      "エ": "インダストリー4.0は製造現場のデジタル化や機器のネットワーク化を通じた変革で、人間の頭脳の代替だけを意味しない。",
      "オ": "トフラーの第三の波は情報化社会への移行を指し、AIが人間を超えるという技術的特異点を意味しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 16,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "OLAP",
    "topicTags": [
      "OLAP"
    ],
    "difficulty": 3,
    "question": "OLAP は、ビジネスインテリジェンス（BI）に用いられる主要な技術の 1 つである。OLAP に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "HOLAP とは、Hadoop と呼ばれる分散処理技術を用いたものをいう。",
      "イ": "MOLAP とは、多次元データを格納するのにリレーショナルデータベースを用いたものをいう。",
      "ウ": "ROLAP とは、多数のトランザクションをリアルタイムに実行するものをいう。",
      "エ": "ダイシングとは、多次元データの分析軸を入れ替えて、データの切り口を変えることをいう。",
      "オ": "ドリルスルーとは、データ集計レベルを変更して異なる階層の集計値を参照することをいう。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "ダイシングでは分析の軸や切り口を切り替え、多次元の集計結果を別の視点から確認する。階層を切り替えて細かい集計を見るのはドリルダウンなどである。ドリルスルーは集計の根拠となる明細等に進む操作を指す。",
    "choiceExplanations": {
      "ア": "HOLAPはリレーショナル型と多次元型のOLAPを組み合わせるもので、Hadoopの使用を定義とはしない。",
      "イ": "MOLAPは多次元データを専用の多次元形式で格納する。リレーショナル表を利用する形式はROLAPである。",
      "ウ": "リアルタイムで多くの更新系トランザクションを処理するのはOLTPの説明である。ROLAPはリレーショナルDB上のデータの多次元分析を指す。",
      "エ": "ダイシングでは分析の軸や切り口を切り替え、多次元の集計結果を別の視点から確認する。",
      "オ": "階層を切り替えて細かい集計を見るのはドリルダウンなどである。ドリルスルーは集計の根拠となる明細等に進む操作を指す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 17,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "モデリング",
    "topicTags": [
      "モデリング"
    ],
    "difficulty": 3,
    "question": "システム開発に利用されるモデリング手法には、DFD、ER 図、UML などがある。それぞれの手法に関する記述として、最も適切な組み合わせを下記の解答群から選べ。\nａ DFD は、データの流れに着目して対象業務のデータの流れと処理の関係を記述する。\nｂ ER 図は、システムの状態とその遷移を記述する。\nｃ UML におけるアクティビティ図は、システムが提供する機能を記述する。\nｄ UML におけるシーケンス図は、オブジェクト間の相互作用を時系列に記述する。\nｅ UML におけるユースケース図は、業務や処理の実行順序を記述する。",
    "choices": {
      "ア": "ａとｃ",
      "イ": "ａとｄ",
      "ウ": "ｂとｄ",
      "エ": "ｂとｅ",
      "オ": "ｄとｅ"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "DFDはデータの流れと処理を、シーケンス図はオブジェクト間の相互作用の時系列を表す。ｄは正しいが、ER図はデータの実体と関連を示し、状態の遷移を扱う図ではない。",
    "choiceExplanations": {
      "ア": "ａは正しいが、アクティビティ図は処理の流れを示す。システムの提供機能を利用者の視点で記述するのはユースケース図である。",
      "イ": "DFDはデータの流れと処理を、シーケンス図はオブジェクト間の相互作用の時系列を表す。",
      "ウ": "ｄは正しいが、ER図はデータの実体と関連を示し、状態の遷移を扱う図ではない。",
      "エ": "ｂは状態遷移図、ｅは活動の順序を記述するアクティビティ図の説明に近く、どちらも名称が合わない。",
      "オ": "シーケンス図に関するｄは正しいが、ユースケース図は利用者とシステム機能の関係を扱い、実行順序を記述しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 18,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "エラー埋め込み法",
    "topicTags": [
      "エラー埋め込み法"
    ],
    "difficulty": 3,
    "question": "あるソフトウェア開発において、エラー埋め込み法を用いてソフトウェアのエラー数を推定することにした。検査対象プログラムに、意図的に 100 件のエラーを埋め込み、そのことを知らない検査担当者に検査させたところ、50 件のエラーを発見することができた。そのうち 40 件は、意図的に埋め込んだエラーであった。埋め込みエラーを除く検査開始前の潜在エラーの件数として、最も適切なものはどれか。",
    "choices": {
      "ア": "10",
      "イ": "15",
      "ウ": "20",
      "エ": "25",
      "オ": "30"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "埋め込みエラーの発見率は40/100＝40％で、既存エラーは50−40＝10件見つかった。同じ発見率とみて10/0.4＝25件と推定する。",
    "choiceExplanations": {
      "ア": "10件は発見した既存エラーの件数であり、未発見の既存エラーを含まない。",
      "イ": "発見率40％の前提で既存エラー10件から推定するには、10を0.4で割る必要があり15件にはならない。",
      "ウ": "全体が20件なら発見率40％で8件の発見となり、実際に発見した既存エラー10件と一致しない。",
      "エ": "埋め込みエラーの発見率は40/100＝40％で、既存エラーは50−40＝10件見つかった。同じ発見率とみて10/0.4＝25件と推定する。",
      "オ": "全体が30件なら発見率40％で12件の発見を見込むが、実際は10件である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 19,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "サービスマネジメント",
    "topicTags": [
      "サービスマネジメント"
    ],
    "difficulty": 3,
    "question": "IT サービスマネジメントにおいて、サービス内容およびサービス目標値に関して、サービス提供者は組織内外の関係者とさまざまな合意書や契約書を取り交わす。それらの文書に関する以下の①～③の記述とその用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\n① サービス提供者が組織外部の供給者と取り交わす文書\n② サービス提供者が組織内部の供給者と取り交わす文書\n③ サービス提供者が顧客と取り交わす文書",
    "choices": {
      "ア": "①：NDA ②：SLA ③：OLA",
      "イ": "①：OLA ②：NDA ③：UC",
      "ウ": "①：OLA ②：UC ③：SLA",
      "エ": "①：SLA ②：UC ③：OLA",
      "オ": "①：UC ②：OLA ③：SLA"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "外部供給者とはUC、内部の供給者とはOLAを取り交わし、顧客とサービス目標を合意する文書はSLAである。",
    "choiceExplanations": {
      "ア": "NDAは秘密保持契約を指す。顧客とのサービス合意は③のSLA、組織内部の運用上の合意は②のOLAである。",
      "イ": "OLAは組織内部との合意に使う。外部供給者との契約はUC、顧客との合意はSLAである。",
      "ウ": "顧客との③はSLAで合っているが、①の外部供給者にはUC、②の内部供給者にはOLAを対応させる。",
      "エ": "SLAは顧客との合意であって外部供給者との契約ではない。組織内の合意はOLAである。",
      "オ": "外部供給者とはUC、内部の供給者とはOLAを取り交わし、顧客とサービス目標を合意する文書はSLAである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 20,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "EVM",
    "topicTags": [
      "EVM"
    ],
    "difficulty": 3,
    "question": "プロジェクト管理では、コストやスケジュールを適切に管理するためにさまざまな指標や手法が用いられる。それらに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "CPI（コスト効率指数）とは、実コストが計画コストより多いか少ないかを見る指標で、PV（出来高計画値）を AC（コスト実績値）で除して算出する。",
      "イ": "EV（出来高実績値）とは、ある時点までに実際にかかったコストの累積値のことである。",
      "ウ": "SPI（スケジュール効率指数）とは、スケジュールの進捗具合を示す指標で、EV（出来高実績値）を PV（出来高計画値）で除して算出する。",
      "エ": "クラッシングとは、順次行う予定のアクティビティを並行して実行することによって作業期間を短縮することである。",
      "オ": "ファストトラッキングとは、クリティカルパス上のアクティビティに資源を投入して作業期間を短縮することである。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "SPI＝EV/PVは、計画していた出来高に対してどこまで実際に進んだかを測る比率である。作業を重ねて並行化するのがファストトラッキングで、クラッシングでは追加資源を投じて期間を縮める。",
    "choiceExplanations": {
      "ア": "CPIは完成した作業の予算上の価値であるEVをACで割る。PVを用いると計画上の出来高と実コストを比較することになる。",
      "イ": "ある時点までに実際かかったコストはACである。EVは完了済み作業の予算上の価値を指す。",
      "ウ": "SPI＝EV/PVは、計画していた出来高に対してどこまで実際に進んだかを測る比率である。",
      "エ": "作業を重ねて並行化するのがファストトラッキングで、クラッシングでは追加資源を投じて期間を縮める。",
      "オ": "追加資源を投入してクリティカルパス上の作業を短縮するのはクラッシングである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 21,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "モバイル端末管理",
    "topicTags": [
      "モバイル端末管理"
    ],
    "difficulty": 3,
    "question": "テレワークで利用するモバイル端末に対して、安全かつ効率的な管理が求められている。この管理に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "BYOD（Bring Your Own Device）は、組織の公式的な許可を得ずに組織が所有するモバイル端末を社員が私的に利用することである。",
      "イ": "COPE（Corporate Owned, Personally Enabled）は、モバイル端末利用ポリシーに従って社員が所有するモバイル端末を業務で利用することである。",
      "ウ": "MCM（Mobile Content Management）は、社員が利用するモバイル端末内の業務データを管理するシステムや技術である。",
      "エ": "MFA（Multi-Factor Authentication）は、社員が所有する複数のモバイル端末によって認証を行うシステムや技術である。",
      "オ": "SSO（Single Sign-On）は、社員が利用するモバイル端末には最低限の機能しか持たせず、サーバ側でアプリケーションやファイルなどの資源を管理するシステムや技術である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "MCMは配布・利用制御などを通じて、モバイル端末から扱う業務コンテンツやデータを管理する。MFAは知識・所持・生体など異なる種類の認証要素を組み合わせる。所有する端末の台数を意味しない。",
    "choiceExplanations": {
      "ア": "BYODは個人所有の端末を組織の業務に使うことを指す。組織所有の端末の無断私用を指す用語ではない。",
      "イ": "COPEでは企業が端末を所有し、従業員による私的利用も規定の範囲で認める。",
      "ウ": "MCMは配布・利用制御などを通じて、モバイル端末から扱う業務コンテンツやデータを管理する。",
      "エ": "MFAは知識・所持・生体など異なる種類の認証要素を組み合わせる。所有する端末の台数を意味しない。",
      "オ": "SSOは一度の認証で複数のサービスを利用できる仕組みで、記述はシンクライアントに近い。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 22,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "セキュリティ機器",
    "topicTags": [
      "セキュリティ機器"
    ],
    "difficulty": 3,
    "question": "ネットワークのセキュリティを確保することは重要である。ネットワークセキュリティに関する以下のａ～ｅの記述とその用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ ネットワークへの不正侵入を監視し、不正侵入を検知した場合に管理者に通知するシステム。\nｂ ネットワークへの不正侵入を監視し、不正侵入を検知した場合にその通信を遮断するシステム。\nｃ SQL インジェクションなどの Web アプリケーションへの攻撃を検知し、防御するシステム。\nｄ インターネット上に公開されたサーバへの不正アクセスを防ぐため、外部ネットワークと内部ネットワークの中間に設けられたネットワーク上のセグメント。\nｅ 機器やソフトウェアの動作状況のログを一元的に管理し、セキュリティ上の脅威となる事象をいち早く検知して分析できるようにするシステム。",
    "choices": {
      "ア": "ａ：IDS ｂ：IPS ｃ：DMZ ｄ：SIEM ｅ：WAF",
      "イ": "ａ：IDS ｂ：IPS ｃ：WAF ｄ：DMZ ｅ：SIEM",
      "ウ": "ａ：IPS ｂ：IDS ｃ：WAF ｄ：DMZ ｅ：SIEM",
      "エ": "ａ：IPS ｂ：WAF ｃ：SIEM ｄ：DMZ ｅ：IDS",
      "オ": "ａ：SIEM ｂ：IDS ｃ：WAF ｄ：SIEM ｅ：DMZ"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "IDSは検知・通知し、IPSは通信を遮断できる。WebアプリにはWAF、境界区画にはDMZ、ログの相関分析にはSIEMが対応する。",
    "choiceExplanations": {
      "ア": "Webアプリケーションへの攻撃を防御するｃはWAF、分離したネットワーク区画のｄはDMZ、ログを分析するｅはSIEMである。",
      "イ": "IDSは検知・通知し、IPSは通信を遮断できる。WebアプリにはWAF、境界区画にはDMZ、ログの相関分析にはSIEMが対応する。",
      "ウ": "ｃ～ｅは合っているが、検知・通知のIDSと検知・遮断のIPSを逆にしている。",
      "エ": "ａの通知はIDS、ｂの通信遮断はIPSである。Webアプリケーション向け防御を指すｃはWAFに当たる。",
      "オ": "SIEMはログを集約・分析するシステムで、外部と内部の間のネットワーク区画を示すｄはDMZである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 23,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "リスクマネジメント",
    "topicTags": [
      "リスクマネジメント"
    ],
    "difficulty": 3,
    "question": "JIS Q 27000：2019（情報セキュリティマネジメントシステム－用語）におけるリスクに関する以下の記述の空欄Ａ～Ｅに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\n・リスク Ａ とは、結果とその起こりやすさの組み合わせとして表現されるリスクの大きさのことである。\n・リスク Ｂ とは、リスクの特質を理解し、リスクレベルを決定するプロセスのことである。\n・リスク Ｃ とは、リスクの重大性を評価するための目安とする条件のことである。\n・リスク Ｄ とは、リスクの大きさが受容可能かを決定するために、リスク分析の結果をリスク基準と比較するプロセスのことである。\n・リスク Ｅ とは、リスクを発見、認識および記述するプロセスのことである。",
    "choices": {
      "ア": "Ａ：基準 Ｂ：特定 Ｃ：レベル Ｄ：評価 Ｅ：分析",
      "イ": "Ａ：基準 Ｂ：分析 Ｃ：レベル Ｄ：特定 Ｅ：評価",
      "ウ": "Ａ：レベル Ｂ：特定 Ｃ：基準 Ｄ：評価 Ｅ：分析",
      "エ": "Ａ：レベル Ｂ：分析 Ｃ：基準 Ｄ：特定 Ｅ：評価",
      "オ": "Ａ：レベル Ｂ：分析 Ｃ：基準 Ｄ：評価 Ｅ：特定"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "大きさはレベル、その決定は分析、判断の目安は基準である。基準との比較は評価、発見や記述は特定に当たる。",
    "choiceExplanations": {
      "ア": "リスクの大きさはレベル、評価の目安が基準である。リスクを見つけて記述するＥには特定が入る。",
      "イ": "リスクの大きさを基準ではなくレベルと呼ぶ。分析結果を基準と比べるＤは評価に当たる。",
      "ウ": "Ｂのレベルを決める作業は分析であり、Ｅのリスクを発見・記述する作業は特定である。",
      "エ": "Ｄは基準との比較による評価、Ｅはリスクを発見・認識する特定であり、順序が逆である。",
      "オ": "大きさはレベル、その決定は分析、判断の目安は基準である。基準との比較は評価、発見や記述は特定に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 24,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "混同行列",
    "topicTags": [
      "混同行列"
    ],
    "difficulty": 3,
    "question": "機械学習において、陽性（Positive）と陰性（Negative）のどちらかに分類する二値分類タスクに対する性能評価を行う際に、次のような混同行列と呼ばれる分割表が用いられる。二値分類タスクに対する評価は、上記の TP、FP、FN、TN から計算される評価指標を用いて行われる。評価指標に関する以下の①～③の記述とその計算式の組み合わせとして、最も適切なものを下記の解答群から選べ。\n① 正解率とは、全体の件数のうち、陽性と陰性を正しく予測した割合のことである。\n② 適合率とは、陽性と予測した件数のうち、実際も陽性である割合のことである。\n③ 再現率とは、実際に陽性である件数のうち、陽性と予測した割合のことである。",
    "choices": {
      "ア": "① (FP＋FN)/(TP＋FP＋FN＋TN)、② TP/(TP＋FP)、③ FP/(TP＋FN)",
      "イ": "① (TP＋TN)/(TP＋FP＋FN＋TN)、② TP/(TP＋FN)、③ TP/(TP＋FP)",
      "ウ": "① (TP＋TN)/(TP＋FP＋FN＋TN)、② TP/(TP＋FP)、③ TP/(TP＋FN)",
      "エ": "① (TP＋TN)/(TP＋FP＋FN＋TN)、② TP/(TP＋TN)、③ FP/(TP＋FN)",
      "オ": "① (TP＋TN)/(TP＋FP＋FN＋TN)、② TP/(TP＋TN)、③ TP/(TP＋FN)"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "正解率は全件のうちTP＋TNの割合である。適合率は予測陽性、再現率は実際陽性をそれぞれ分母として、TPの割合を求める。",
    "choiceExplanations": {
      "ア": "正解率の分子は正しく分類したTP＋TNであり、FP＋FNは誤りの件数である。",
      "イ": "適合率の分母は予測陽性のTP＋FP、再現率は実際陽性のTP＋FNであり、②と③の分母が逆である。",
      "ウ": "正解率は全件のうちTP＋TNの割合である。適合率は予測陽性、再現率は実際陽性をそれぞれ分母として、TPの割合を求める。",
      "エ": "適合率の分母に真陰性を含めない。また再現率の分子は偽陽性FPではなく真陽性TPである。",
      "オ": "適合率の分母は陽性と予測した件数TP＋FPである。TP＋TNは正解件数であり適合率の分母にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-keiei-joho-q24.png"
    ],
    "imageAltTexts": [
      "混同行列。実際が陽性で予測が陽性ならTP、予測が陰性ならFN。実際が陰性で予測が陽性ならFP、予測が陰性ならTN。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-annual-keiei-joho-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "keiei-joho",
    "season": "annual",
    "year": 2023,
    "qNumber": 25,
    "subject": "経営情報システム",
    "type": "multiple-choice",
    "category": "インターネットの情報流通",
    "topicTags": [
      "インターネットの情報流通"
    ],
    "difficulty": 3,
    "question": "インターネット上での情報流通の特徴に関する以下の文章の空欄Ａ～Ｄに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。人間は集団になると、個人でいるときよりも極端な方向に走りやすくなるという心理的傾向は Ａ と呼ばれている。キャス・サンスティーンは、インターネットでも Ａ を引き起こしやすくなる Ｂ という現象が見られると指摘した。こうした人間の心理的傾向とネットメディアの特性の相互作用による現象に、次のようなものが挙げられる。1 つは、SNS などを利用する際、人間は自分と似た興味や関心を持つユーザをフォローする傾向があるので、自分と似た意見が返ってくる Ｃ と呼ばれる現象である。もう 1 つは、アルゴリズムが利用者の検索履歴などを学習することで利用者にとって好ましい情報が表示されるようになり、その結果、利用者が見たい情報しか見えなくなるという Ｄ と呼ばれる現象である。これら 2 つの現象は、インターネット上で偽情報が顕在化する背景の 1 つであると考えられている。",
    "choices": {
      "ア": "Ａ：集団極性化 Ｂ：サイバーカスケード Ｃ：エコーチェンバー Ｄ：フィルターバブル",
      "イ": "Ａ：集団極性化 Ｂ：サイバーカスケード Ｃ：バックファイア効果 Ｄ：エゴサーチ",
      "ウ": "Ａ：ハロー効果 Ｂ：サイバーカスケード Ｃ：バックファイア効果 Ｄ：エゴサーチ",
      "エ": "Ａ：ハロー効果 Ｂ：ナッジ Ｃ：エコーチェンバー Ｄ：フィルターバブル",
      "オ": "Ａ：ハロー効果 Ｂ：ナッジ Ｃ：バックファイア効果 Ｄ：フィルターバブル"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "集団極性化がネット上で連鎖しやすくなるのがサイバーカスケードである。似た意見の反響はエコーチェンバー、アルゴリズムによる情報の偏りはフィルターバブルと呼ぶ。",
    "choiceExplanations": {
      "ア": "集団極性化がネット上で連鎖しやすくなるのがサイバーカスケードである。似た意見の反響はエコーチェンバー、アルゴリズムによる情報の偏りはフィルターバブルと呼ぶ。",
      "イ": "反証に触れて信念を強めるバックファイア効果や、自分の評判を検索するエゴサーチは、ＣやＤで説明している現象と異なる。",
      "ウ": "ハロー効果は目立つ特徴が他の評価にも影響することであり、集団で判断が極端になる傾向は集団極性化である。",
      "エ": "Ｃ・Ｄは合っているが、Ａは集団極性化である。Ｂは行動を促す設計を指すナッジではなくサイバーカスケードである。",
      "オ": "似た関心の人同士で情報が繰り返されるＣはエコーチェンバーである。集団の判断が極端になるＡをハロー効果とは呼ばない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2023/F1JI2023.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji_seikai/2023f.pdf",
    "sourceAttribution": "出典：一般社団法人日本中小企業診断士協会連合会 令和5年度第1次試験 F 経営情報システム",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  }
];
