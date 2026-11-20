import type { Question } from "@/lib/questions/types";

export const ES_QUESTIONS_2018_SPRING_PM2: Question[] = [
  {
    "id": "es-2018h-pm2-q1",
    "exam": "es",
    "year": 2018,
    "season": "spring",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "組込みネットワーク",
    "topicTags": [
      "缶飲料を製造するスマート工場"
    ],
    "difficulty": 4,
    "question": "問1　缶飲料を製造するスマート工場",
    "answer": "**設問１**\n\n- (1)　装置の増設，配置変更に対して柔軟に対応できるから\n\n- (2)　後工程の装置からの補給要求が減るから\n\n- (3)　送信要求ノード数にかかわらず，全IoT ノードが一定時間内に送信できる。\n\n- (4)　順次ポーリング方式　最小値　1\n\n- 最大値　1,024\n\n- バイナリツリー方式　最小値　1\n\n- 最大値　2\n\n**設問２**\n\n- (1)　(a)　511\n\n- (b)　10.4\n\n- (2)　方法1　コントローラは全 AGV の位置を把握しているので，最適な AGV を選択できる。\n\n- 方法2　AP とコントローラ間の通信が不要であり，LAN における通信負荷を軽減できる。\n\n- (3)　(a)　景品取付ステーションの位置を設定する。\n\n- (b)　景品の種類　検査装置\n\n- 缶のデザインの種類　缶詰装置，検査装置\n\n**設問３**\n\n- (1)　コントローラ側でのデータ処理の負荷を軽減できる。\n\n- (2)　(a)　①②　・電池残量の低下が速い。・ユニット温度の温度上昇が速い。\n\n- (b)　AGV の稼働状況を記録する周期を短くする。\n\n- (c)　150 秒後には，ユニット温度が収束していたから",
    "explanation": "コントローラで一括して行う処理と、装置やAGVが自律的に行う処理を分けます。通信の所要時間は、処理の順序と最も長い場合の待ち時間を含めて考えます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2018-spring-pm2/q01-p02.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p03.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p04.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p05.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p06.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p07.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p08.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p09.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p10.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p11.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p12.webp",
      "/questions/ipa/es/2018-spring-pm2/q01-p13.webp"
    ],
    "imageAltTexts": [
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 2ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 3ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 4ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 5ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 6ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 7ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 8ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 9ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 10ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 11ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 12ページ）",
      "問1 缶飲料を製造するスマート工場（問題冊子 PDF 13ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm2_qs.pdf#page=2",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm2_ans.pdf#page=1",
    "sourceAttribution": "出典：情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2018年度春期 午後II",
    "license": "IPA-public"
  },
  {
    "id": "es-2018h-pm2-q2",
    "exam": "es",
    "year": 2018,
    "season": "spring",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "組込みシステム設計",
    "topicTags": [
      "卸売市場の自動競りシステム"
    ],
    "difficulty": 4,
    "question": "問2　卸売市場の自動競りシステム",
    "answer": "**設問１**\n\n- (1)　(a)　商品の口数　3\n\n- 販売した口数　3\n\n- (b)　c　競り休止\n\n- (c)　d　スクリーン表示指示メッセージで，運用状態を休止中に，販売可能な口数を0 で表示する。\n\n- (2)　競り開始価格で競りを開始する場合\n\n- (3)　29\n\n**設問２**\n\n- (1)　(a)　スクリーンと台端末への，休止中及び新たな販売可能な口数の表示\n\n- (b)　最初に取引が成立してから，一定時間経過するまでの間\n\n- (2)　(a)　①②　・買参人番号・口数\n\n- (b)　b　該当する買参人端末に，買参人端末表示指示メッセージを送信\n\n- (3)　(a)　a　購入履歴情報の中から，該当する買参人の最後のレコード番号を求め，前回レコード番号として記憶\n\n- (b)　追加したレコードには－1 を，前回レコード番号のレコードには追加したレコードのレコード番号を，それぞれ書き込む。\n\n**設問３**\n\n- (1)　e　商品追加完了\n\n- f　移動処理\n\n- g　商品追加許可\n\n- (2)　h　指定された商品情報を競り待ちテーブルの末尾に追加\n\n- (3)　i　商品追加要求　順不同\n\n- j　商品移動指示\n\n- k　商品移動完了\n\n- 商品追加許可\n\n- m　競り制御タスク及び進行監視タスクがデッドロック状態になる",
    "explanation": "競りの状態がどのメッセージで切り替わるかを対応付けます。複数の競り台を扱う場合は、進行状況の差と、同時に発生する処理の重なりを確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2018-spring-pm2/q02-p14.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p15.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p16.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p17.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p18.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p19.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p20.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p21.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p22.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p23.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p24.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p25.webp",
      "/questions/ipa/es/2018-spring-pm2/q02-p26.webp"
    ],
    "imageAltTexts": [
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 14ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 15ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 16ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 17ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 18ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 19ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 20ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 21ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 22ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 23ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 24ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 25ページ）",
      "問2 卸売市場の自動競りシステム（問題冊子 PDF 26ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm2_qs.pdf#page=14",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_es_pm2_ans.pdf#page=2",
    "sourceAttribution": "出典：情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2018年度春期 午後II",
    "license": "IPA-public"
  }
];
