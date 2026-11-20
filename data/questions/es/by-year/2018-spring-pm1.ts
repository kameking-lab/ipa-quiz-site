import type { Question } from "@/lib/questions/types";

export const ES_QUESTIONS_2018_SPRING_PM1: Question[] = [
  {
    "id": "es-2018h-pm1-q1",
    "exam": "es",
    "year": 2018,
    "season": "spring",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "組込み制御",
    "topicTags": [
      "静止画及び動画を撮影する，自撮り用の自律式小型マルチコプタ"
    ],
    "difficulty": 4,
    "question": "問1　静止画及び動画を撮影する，自撮り用の自律式小型マルチコプタ",
    "answer": "**設問１**\n\n- (1)　a　反対方向\n\n- b　揚力\n\n- c　重力\n\n- (2)　d　補正データ\n\n- e　回転数\n\n**設問２**\n\n- (1)　情報　水平発光位置情報\n\n- 制御　ずれを補正する方向へ回転させる。\n\n- (2)　f　9\n\n- g　11\n\n**設問３**\n\n- (1)　h　高度測定・障害物検知\n\n- i　無線信号の強度\n\n- j　障害物情報\n\n- (2)　k　移動方向に障害物がある\n\n- ホバリングに移行させる",
    "explanation": "センサが観測する量と、制御で変える量を区別します。シーケンス図では、撮影ユニットと本体のタスクの間で受け渡す情報とタイミングを追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2018-spring-pm1/q01-p02.webp",
      "/questions/ipa/es/2018-spring-pm1/q01-p03.webp",
      "/questions/ipa/es/2018-spring-pm1/q01-p04.webp",
      "/questions/ipa/es/2018-spring-pm1/q01-p05.webp",
      "/questions/ipa/es/2018-spring-pm1/q01-p06.webp"
    ],
    "imageAltTexts": [
      "問1 静止画及び動画を撮影する，自撮り用の自律式小型マルチコプタ（問題冊子 PDF 2ページ）",
      "問1 静止画及び動画を撮影する，自撮り用の自律式小型マルチコプタ（問題冊子 PDF 3ページ）",
      "問1 静止画及び動画を撮影する，自撮り用の自律式小型マルチコプタ（問題冊子 PDF 4ページ）",
      "問1 静止画及び動画を撮影する，自撮り用の自律式小型マルチコプタ（問題冊子 PDF 5ページ）",
      "問1 静止画及び動画を撮影する，自撮り用の自律式小型マルチコプタ（問題冊子 PDF 6ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm1_qs.pdf#page=2",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm1_ans.pdf#page=1",
    "sourceAttribution": "出典：情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2018年度春期 午後I",
    "license": "IPA-public"
  },
  {
    "id": "es-2018h-pm1-q2",
    "exam": "es",
    "year": 2018,
    "season": "spring",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "計測と制御",
    "topicTags": [
      "道路などの冠水を防ぐシステム"
    ],
    "difficulty": 4,
    "question": "問2　道路などの冠水を防ぐシステム",
    "answer": "**設問１**\n\n- (1)　停止指示の送信から停止までに水がない状態で 30 秒以上稼働して，ポンプが故障する可能性があるから\n\n- (2)　予測した貯水槽の水位と実際に計測した貯水槽の水位の差から判断する。\n\n- (3)　(a)　1.25\n\n- (b)　4.2\n\n**設問２**\n\n- (1)　メイン\n\n- (2)　a　指示を送信する時刻になったとき，ポンプの稼働指示又は停止指示をポンプ制御タスクに通知する\n\n- (3)　b　貯水槽の最新の水位　順不同\n\n- c　最新の貯水槽予測流入量\n\n- (4)　2,592\n\n**設問３**\n\n- (1)　d　予測雨水流入量\n\n- e　各水位センサの最新の計測値\n\n- (2)　雨水流入量予測タスクが最新データ及び履歴情報にアクセスするときに，履歴情報よりも先に最新データのセマフォを獲得するようにする。",
    "explanation": "水位とその変化率から、基準水位に達するまでの時間を求めます。ポンプの稼働指示、稼働確認、観測データの記録はそれぞれ別の処理として追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2018-spring-pm1/q02-p07.webp",
      "/questions/ipa/es/2018-spring-pm1/q02-p08.webp",
      "/questions/ipa/es/2018-spring-pm1/q02-p09.webp",
      "/questions/ipa/es/2018-spring-pm1/q02-p10.webp",
      "/questions/ipa/es/2018-spring-pm1/q02-p11.webp",
      "/questions/ipa/es/2018-spring-pm1/q02-p12.webp",
      "/questions/ipa/es/2018-spring-pm1/q02-p13.webp"
    ],
    "imageAltTexts": [
      "問2 道路などの冠水を防ぐシステム（問題冊子 PDF 7ページ）",
      "問2 道路などの冠水を防ぐシステム（問題冊子 PDF 8ページ）",
      "問2 道路などの冠水を防ぐシステム（問題冊子 PDF 9ページ）",
      "問2 道路などの冠水を防ぐシステム（問題冊子 PDF 10ページ）",
      "問2 道路などの冠水を防ぐシステム（問題冊子 PDF 11ページ）",
      "問2 道路などの冠水を防ぐシステム（問題冊子 PDF 12ページ）",
      "問2 道路などの冠水を防ぐシステム（問題冊子 PDF 13ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm1_qs.pdf#page=7",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm1_ans.pdf#page=2",
    "sourceAttribution": "出典：情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2018年度春期 午後I",
    "license": "IPA-public"
  },
  {
    "id": "es-2018h-pm1-q3",
    "exam": "es",
    "year": 2018,
    "season": "spring",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "組込みシステムの安全性",
    "topicTags": [
      "無人自動運転トラックを含むトラック隊列走行システム"
    ],
    "difficulty": 4,
    "question": "問3　無人自動運転トラックを含むトラック隊列走行システム",
    "answer": "**設問１**\n\n- (1)　43.6\n\n- (2)　(a)　55.1\n\n- (b)　3.25\n\n**設問２**\n\n- (1)　①②　・先頭車両の速度・先頭車両の加速度\n\n- (2)　a　周辺監視ミリ波\n\n- b　車車間通信\n\n- c　UI\n\n- d　隊列制御\n\n- e　ステアリング\n\n- f　前方3D レーザ\n\n- (3)　車線変更を行っている後方の車両を障害物として認識しないようにするため\n\n**設問３**\n\n- (1)　天候などの外乱要因の影響を受けても，異種方式であればシステムが正常に動作することが期待できるから\n\n- (2)　g　割込み\n\n- h　自己診断\n\n- i　バスの情報\n\n- j　5\n\n- (3)　影響　虚偽の指示によって，後続車両が意図しない車線変更を行う。\n\n- 対策　暗号技術を用いて発信元の真正性を確認する。",
    "explanation": "車両間の情報伝送に必要な時間を通信条件から求めます。車線変更の処理では、各車両の完了確認と、異常時に安全を保つ処理を区別します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2018-spring-pm1/q03-p14.webp",
      "/questions/ipa/es/2018-spring-pm1/q03-p15.webp",
      "/questions/ipa/es/2018-spring-pm1/q03-p16.webp",
      "/questions/ipa/es/2018-spring-pm1/q03-p17.webp",
      "/questions/ipa/es/2018-spring-pm1/q03-p18.webp",
      "/questions/ipa/es/2018-spring-pm1/q03-p19.webp",
      "/questions/ipa/es/2018-spring-pm1/q03-p20.webp"
    ],
    "imageAltTexts": [
      "問3 無人自動運転トラックを含むトラック隊列走行システム（問題冊子 PDF 14ページ）",
      "問3 無人自動運転トラックを含むトラック隊列走行システム（問題冊子 PDF 15ページ）",
      "問3 無人自動運転トラックを含むトラック隊列走行システム（問題冊子 PDF 16ページ）",
      "問3 無人自動運転トラックを含むトラック隊列走行システム（問題冊子 PDF 17ページ）",
      "問3 無人自動運転トラックを含むトラック隊列走行システム（問題冊子 PDF 18ページ）",
      "問3 無人自動運転トラックを含むトラック隊列走行システム（問題冊子 PDF 19ページ）",
      "問3 無人自動運転トラックを含むトラック隊列走行システム（問題冊子 PDF 20ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm1_qs.pdf#page=14",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm1_ans.pdf#page=3",
    "sourceAttribution": "出典：情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2018年度春期 午後I",
    "license": "IPA-public"
  }
];
