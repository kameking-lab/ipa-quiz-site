import type { Question } from "@/lib/questions/types";

export const AP_QUESTIONS_2018_SPRING_PM: Question[] = [
  {
    "id": "ap-2018s-pm-q1",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "マルウェア感染への対応"
    ],
    "difficulty": 4,
    "question": "問1　マルウェア感染への対応",
    "answer": "問１\n                       出題趣旨\n 昨今，ランサムウェアと呼ばれるPC などに特定の制限をかけ，その制限解除と引き換えに金銭（身代金）を\n要求するマルウェアによる被害が急増している。\n 本問では，ランサムウェアを題材に，マルウェアの脅威に関する基本的な理解，感染した場合に被害を最小\n限に抑えるための対策の理解について問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１     a ア\n              b ク\n              c サ\n              d オ\n  設問２  ・特定の文字列に変更された拡張子のファイルが他のPC やサーバにないこと\n      ・最新のウイルス定義ファイルで，当該マルウェアが他に検出されないこと\n       ・他のPC やサーバでマルウェアによる警告メッセージが表示されないこと\n 設問３(1) ・ウイルス定義ファイルのバージョンが最新であること\n      ・ウイルス定義ファイルの更新日時が最新であること\n       ・社内LAN に接続し，手動でウイルス定義ファイルを更新したこと\n         (2) ウ\n 設問４(1) ウ\n         (2) ・バックアップの時だけ共有ディスク装置を接続する。\n       ・バックアップ時以外は社内LAN から切り離す。",
    "explanation": "感染が疑われる端末を隔離してから、共有ファイルへの影響範囲を調べます。復旧には感染前のバックアップが必要なので、取得日だけでなく保存先への書込み権限も確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-04.webp",
      "/questions/ipa/ap/2018-spring-pm/page-05.webp",
      "/questions/ipa/ap/2018-spring-pm/page-06.webp",
      "/questions/ipa/ap/2018-spring-pm/page-07.webp",
      "/questions/ipa/ap/2018-spring-pm/page-08.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問1　マルウェア感染への対応（公式問題PDF 4ページ）",
      "応用情報技術者 2018年度春期 午後 問1　マルウェア感染への対応（公式問題PDF 5ページ）",
      "応用情報技術者 2018年度春期 午後 問1　マルウェア感染への対応（公式問題PDF 6ページ）",
      "応用情報技術者 2018年度春期 午後 問1　マルウェア感染への対応（公式問題PDF 7ページ）",
      "応用情報技術者 2018年度春期 午後 問1　マルウェア感染への対応（公式問題PDF 8ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q1-p01.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問1　マルウェア感染への対応 公式解答例（公式PDF 1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q2",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "事業戦略の策定"
    ],
    "difficulty": 4,
    "question": "問2　事業戦略の策定",
    "answer": "問２\n                       出題趣旨\n 昨今，企業間競争の激化や顧客ニーズの変化が加速しており，企業を発展させるためには，確たる事業戦略\nの策定が重要度を増している。\n 本問では，スーパーマーケットチェーンの中期事業戦略の策定を題材として，クロスSWOT 分析，ポジショ\nニング分析に関する知識，及び事業施策の策定の能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１     a 高付加価値食品\n              b スーパーマーケットチェーンのブランド\n 設問２(1)  c ニーズ\n              d 強い相関がある\n         (2) エ\n 設問３(1) 高級なおつまみ類の品ぞろえを増やす。\n         (2) ・実店舗とネット店舗の顧客ID を統合し，顧客ごとの購入額を集計する。\n      ・顧客の属性情報によって名寄せをし，顧客ごとの購入額を集計する。\n         (3)  e ウ\n              f ア\n\n\n\n\n\n                                                1/6\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "事例の施策を、顧客獲得、品ぞろえ、販売チャネルの役割に分類します。実店舗とネット店舗をまたぐ施策は、購買行動のどの段階を支えるかで判断します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-10.webp",
      "/questions/ipa/ap/2018-spring-pm/page-11.webp",
      "/questions/ipa/ap/2018-spring-pm/page-12.webp",
      "/questions/ipa/ap/2018-spring-pm/page-13.webp",
      "/questions/ipa/ap/2018-spring-pm/page-14.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問2　事業戦略の策定（公式問題PDF 10ページ）",
      "応用情報技術者 2018年度春期 午後 問2　事業戦略の策定（公式問題PDF 11ページ）",
      "応用情報技術者 2018年度春期 午後 問2　事業戦略の策定（公式問題PDF 12ページ）",
      "応用情報技術者 2018年度春期 午後 問2　事業戦略の策定（公式問題PDF 13ページ）",
      "応用情報技術者 2018年度春期 午後 問2　事業戦略の策定（公式問題PDF 14ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q2-p01.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問2　事業戦略の策定 公式解答例（公式PDF 1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q3",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "ナイトの巡歴問題"
    ],
    "difficulty": 4,
    "question": "問3　ナイトの巡歴問題",
    "answer": "問３\n                       出題趣旨\n 可能な組合せを順番に検証するような問題の解を求める場合，再帰関数を用いた実装は有効な方法の一つで\nある。\n 本問では，ナイトの巡歴問題を題材に，再帰関数を用いたプログラムや，データ構造を変更した際のプログ\nラムへの影響を理解する能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１  ア  2\n       イ －2\n  設問２  ウ  i が m×n\n       エ  i+1\n       オ  v+dv[j]\n       カ  h+dh[j]\n       キ  board[v][h] ← 0\n 設問３(1) ① 行番号              20\n        変更後のプログラム  for( v を3 からm+2 まで1 ずつ増やす )\n       ② 行番号              21\n        変更後のプログラム  for( h を3 からn+2 まで1 ずつ増やす )\n         (2) 行番号                  32\n      変更後のプログラム      search( 1, 3, 3 )\n         (3) 2，3，16，17",
    "explanation": "盤面上の未訪問マスを更新し、進めなくなったときに状態を戻す処理を追います。盤面を拡張する場合は、元の盤面の外を訪問不可として扱う点が要点です。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-16.webp",
      "/questions/ipa/ap/2018-spring-pm/page-17.webp",
      "/questions/ipa/ap/2018-spring-pm/page-18.webp",
      "/questions/ipa/ap/2018-spring-pm/page-19.webp",
      "/questions/ipa/ap/2018-spring-pm/page-20.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問3　ナイトの巡歴問題（公式問題PDF 16ページ）",
      "応用情報技術者 2018年度春期 午後 問3　ナイトの巡歴問題（公式問題PDF 17ページ）",
      "応用情報技術者 2018年度春期 午後 問3　ナイトの巡歴問題（公式問題PDF 18ページ）",
      "応用情報技術者 2018年度春期 午後 問3　ナイトの巡歴問題（公式問題PDF 19ページ）",
      "応用情報技術者 2018年度春期 午後 問3　ナイトの巡歴問題（公式問題PDF 20ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q3-p02.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問3　ナイトの巡歴問題 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q4",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 4,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "クラウドサービス"
    ],
    "difficulty": 4,
    "question": "問4　クラウドサービス",
    "answer": "問４\n                       出題趣旨\n クラウドサービスは，社内システムインフラとして多くの企業に導入され，利用されている。\n 本問では，現行のオンプレミス上で稼働している業務システムを，クラウドサービスに移行するに当たって，\nクラウドサービスの内容を理解し，業務要件に見合ったクラウドサービスのサービス形態（SaaS，PaaS，IaaS）\n及び提供形態（パブリッククラウド，プライベートクラウド）を選定する能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１  イ，エ\n  設問２     a ○\n              b ○\n              c ×\n              d ○\n  設問３     e プライベートクラウド\n              f  IaaS\n 設問４(1) サブシステムの名称 事務支援サブシステム\n      サービス形態        PaaS\n      提供形態      プライベートクラウド\n         (2) 販売管理サブシステムとのデータ連携が必要だから\n\n\n\n\n\n                                                2/6\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "クラウドのサービス形態によって、基盤とアプリケーションの管理範囲が変わります。各業務システムの制約と、表に示されたサービスの責任範囲を照合します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-22.webp",
      "/questions/ipa/ap/2018-spring-pm/page-23.webp",
      "/questions/ipa/ap/2018-spring-pm/page-24.webp",
      "/questions/ipa/ap/2018-spring-pm/page-25.webp",
      "/questions/ipa/ap/2018-spring-pm/page-26.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問4　クラウドサービス（公式問題PDF 22ページ）",
      "応用情報技術者 2018年度春期 午後 問4　クラウドサービス（公式問題PDF 23ページ）",
      "応用情報技術者 2018年度春期 午後 問4　クラウドサービス（公式問題PDF 24ページ）",
      "応用情報技術者 2018年度春期 午後 問4　クラウドサービス（公式問題PDF 25ページ）",
      "応用情報技術者 2018年度春期 午後 問4　クラウドサービス（公式問題PDF 26ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q4-p02.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問4　クラウドサービス 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q5",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 5,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "Webシステムの構成変更"
    ],
    "difficulty": 4,
    "question": "問5　Webシステムの構成変更",
    "answer": "問５\n                       出題趣旨\n  インターネット利用において，DNS の役割は大きい。DNS が適切に設定されないと，インターネット利用で\n思いがけない問題を発生させる可能性がある。\n  本問では，Web システムの構成変更を題材に，構成変更に合わせたDNS の基本的な設定変更の内容について\nの理解を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１     a ラウンドロビン\n              b  IP アドレス\n              c スレーブ\n  設問２     d カ\n              e ア\n              f エ\n 設問３(1) Web サイト利用時のURL\n         (2) 行番号        4\n      フィールド名  owner\n         (3) Web サイトへのアクセスをWAF サービスだけから許可する。",
    "explanation": "DNSの名前解決とWebサーバへの接続は別々に追います。構成図に沿って、平常時と障害時でそれぞれどのサーバが応答するかを確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-28.webp",
      "/questions/ipa/ap/2018-spring-pm/page-29.webp",
      "/questions/ipa/ap/2018-spring-pm/page-30.webp",
      "/questions/ipa/ap/2018-spring-pm/page-31.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問5　Webシステムの構成変更（公式問題PDF 28ページ）",
      "応用情報技術者 2018年度春期 午後 問5　Webシステムの構成変更（公式問題PDF 29ページ）",
      "応用情報技術者 2018年度春期 午後 問5　Webシステムの構成変更（公式問題PDF 30ページ）",
      "応用情報技術者 2018年度春期 午後 問5　Webシステムの構成変更（公式問題PDF 31ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q5-p03.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問5　Webシステムの構成変更 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q6",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 6,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "備品購買システムの設計と実装"
    ],
    "difficulty": 4,
    "question": "問6　備品購買システムの設計と実装",
    "answer": "問６\n                       出題趣旨\n データモデルの作成は，現在の対象業務を単に表現するだけではなく，将来の変化に対応するための柔軟性\nまで考える必要がある。\n  本問では，備品購買システムを題材に，E-R 図やSQL 文に関する基本的な理解，機能追加や仕様変更が発生\nした際のデータモデルへの対応に関する理解，能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１     a 希望回答日\n              b\n              c\n  設問２     d 見積依頼番号\n                                          順不同\n              e 取引先番号\n              f 見積依頼明細\n  設問３     g DLI.納品数量計\n              h OD.発注番号 = :発注番号\n              i  GROUP BY DE.発注番号, DD.商品番号\n              j  ORDER BY ORD.商品番号\n  設問４  返品した商品の数量をマイナスの値に設定したレコード\n\n\n\n\n\n                                                3/6\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "業務で使われる識別子をE-R図の関連と対応付けます。SQLでは、発注番号で対象を絞り、未入力時のNULLをCOALESCEがどう処理するかを追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-32.webp",
      "/questions/ipa/ap/2018-spring-pm/page-33.webp",
      "/questions/ipa/ap/2018-spring-pm/page-34.webp",
      "/questions/ipa/ap/2018-spring-pm/page-35.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問6　備品購買システムの設計と実装（公式問題PDF 32ページ）",
      "応用情報技術者 2018年度春期 午後 問6　備品購買システムの設計と実装（公式問題PDF 33ページ）",
      "応用情報技術者 2018年度春期 午後 問6　備品購買システムの設計と実装（公式問題PDF 34ページ）",
      "応用情報技術者 2018年度春期 午後 問6　備品購買システムの設計と実装（公式問題PDF 35ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q6-p03.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問6　備品購買システムの設計と実装 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q7",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 7,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "児童の見守り機能付き防犯ブザー"
    ],
    "difficulty": 4,
    "question": "問7　児童の見守り機能付き防犯ブザー",
    "answer": "問７\n                       出題趣旨\n バッテリを電源とする組込みシステムでは，動作時間を延ばすために，省電力を意識した設計・実装が求め\nられる。\n 本問では，児童の見守り機能付き防犯ブザーを題材に，仕様を把握する能力，省電力を意識した設計及び実\n装に対する基本的理解力を問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) 6\n         (2) 静止状態で位置登録を行った後，5 分経過する前に移動を検出したとき\n 設問２(1) 49,999\n         (2) 消費電力を小さくできるから\n 設問３(1)  a 位置登録\n              b 登録周期\n         (2) 登録周期の変更",
    "explanation": "ストラップの操作や移動検出を起点に、どの割込みハンドラが動くかを追います。ブザー、位置の取得、通知はそれぞれの動作条件を分けて読みます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-36.webp",
      "/questions/ipa/ap/2018-spring-pm/page-37.webp",
      "/questions/ipa/ap/2018-spring-pm/page-38.webp",
      "/questions/ipa/ap/2018-spring-pm/page-39.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問7　児童の見守り機能付き防犯ブザー（公式問題PDF 36ページ）",
      "応用情報技術者 2018年度春期 午後 問7　児童の見守り機能付き防犯ブザー（公式問題PDF 37ページ）",
      "応用情報技術者 2018年度春期 午後 問7　児童の見守り機能付き防犯ブザー（公式問題PDF 38ページ）",
      "応用情報技術者 2018年度春期 午後 問7　児童の見守り機能付き防犯ブザー（公式問題PDF 39ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q7-p04.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問7　児童の見守り機能付き防犯ブザー 公式解答例（公式PDF 4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q8",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 8,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "プログラムの品質評価"
    ],
    "difficulty": 4,
    "question": "問8　プログラムの品質評価",
    "answer": "問８\n                       出題趣旨\n  社会のインフラの中でIT システムは不可欠なものとなっている。業務運用に利用されるIT システムは，そ\nのときの業務要件や情勢の変化に応じて改修や修正が加えられる。したがって，初期開発だけではなく，運用\n開始後の保守性も見据えた品質評価を行う必要がある。\n 本問では，サイクロマティック複雑度の評価を題材に，プログラム品質を評価するメトリクスについての基\n本的な知識と応用能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１     a  2\n              b ホワイトボックステスト\n              c 条件網羅\n 設問２(1)  d リファクタリング\n         (2)  e\n\n\n              f  5\n 設問３(1)  g カ\n         (2) プログラムの改修や修正が継続的に発生することが想定されるから\n\n\n\n\n\n                                                4/6\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "命令、分岐、条件の各網羅基準が何を実行するかを区別します。プログラムの保守性を考える際は、改修を繰り返す前提で複雑さを抑える方法を確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-40.webp",
      "/questions/ipa/ap/2018-spring-pm/page-41.webp",
      "/questions/ipa/ap/2018-spring-pm/page-42.webp",
      "/questions/ipa/ap/2018-spring-pm/page-43.webp",
      "/questions/ipa/ap/2018-spring-pm/page-44.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問8　プログラムの品質評価（公式問題PDF 40ページ）",
      "応用情報技術者 2018年度春期 午後 問8　プログラムの品質評価（公式問題PDF 41ページ）",
      "応用情報技術者 2018年度春期 午後 問8　プログラムの品質評価（公式問題PDF 42ページ）",
      "応用情報技術者 2018年度春期 午後 問8　プログラムの品質評価（公式問題PDF 43ページ）",
      "応用情報技術者 2018年度春期 午後 問8　プログラムの品質評価（公式問題PDF 44ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q8-p04.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問8　プログラムの品質評価 公式解答例（公式PDF 4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q9",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 9,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "ERPソフトウェアパッケージ導入プロジェクト"
    ],
    "difficulty": 4,
    "question": "問9　ERPソフトウェアパッケージ導入プロジェクト",
    "answer": "問９\n                       出題趣旨\n   IT プロジェクトにおいては，様々なリスクがあり，リスクへの対処を誤ると，大きな損失に繋がるおそれが\nあるので，リスクに対する十分な備えが重要である。\n  本問では，中堅小売業でのERP パッケージ導入プロジェクトを題材に，プロジェクトで発生し得るリスクを\n特定し，適切な対応方法を検討，計画する能力について問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) デルファイ法\n         (2)  a エ\n 設問２(1)  b 重要度を評価するための社内基準\n         (2) 各店舗独自の販売管理手法が売上拡大に寄与しているから\n         (3)  c イ\n 設問３(1)  d  372\n         (2) スケジュールが遅延する。\n  設問４    IT 部門が案件の採否を決定する前に業務部門と調整する場を設ける。",
    "explanation": "リスクを洗い出した後、評価の基準をそろえます。店舗独自の業務が利益に結び付く場合は、標準化で得る効果と失う効果を比較します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-46.webp",
      "/questions/ipa/ap/2018-spring-pm/page-47.webp",
      "/questions/ipa/ap/2018-spring-pm/page-48.webp",
      "/questions/ipa/ap/2018-spring-pm/page-49.webp",
      "/questions/ipa/ap/2018-spring-pm/page-50.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問9　ERPソフトウェアパッケージ導入プロジェクト（公式問題PDF 46ページ）",
      "応用情報技術者 2018年度春期 午後 問9　ERPソフトウェアパッケージ導入プロジェクト（公式問題PDF 47ページ）",
      "応用情報技術者 2018年度春期 午後 問9　ERPソフトウェアパッケージ導入プロジェクト（公式問題PDF 48ページ）",
      "応用情報技術者 2018年度春期 午後 問9　ERPソフトウェアパッケージ導入プロジェクト（公式問題PDF 49ページ）",
      "応用情報技術者 2018年度春期 午後 問9　ERPソフトウェアパッケージ導入プロジェクト（公式問題PDF 50ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q9-p05.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問9　ERPソフトウェアパッケージ導入プロジェクト 公式解答例（公式PDF 5ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q10",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 10,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "データセンタで行うシステム運用"
    ],
    "difficulty": 4,
    "question": "問10　データセンタで行うシステム運用",
    "answer": "問10\n                       出題趣旨\n 昨今，企業は運用費用，信頼性，災害対策などの観点から自社のシステム機器やシステム自体を，データセ\nンタで運用するケースが増加している。\n 本問では，データセンタを利用したシステム運用を対象にインシデントの管理，災害対策，ファシリティ管\n理に関する実務管理能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) イ\n         (2)  a 冗長構成\n 設問２(1) 蓄電池の劣化を示すメッセージの種類を“警告”とする。\n         (2) 開発課にインシデントの対応を依頼する。\n         (3) イ\n 設問３(1) ・ディザスタリカバリプラン\n      ・緊急時対応計画\n         (2) 運用課から担当者を選定し，該当者に障害対策訓練に参加してもらう。\n\n\n\n\n\n                                                5/6\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "設備の冗長構成、警告の扱い、インシデントの引継ぎを区別します。災害時に備える計画は、復旧の手順と訓練に参加する担当者を確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-52.webp",
      "/questions/ipa/ap/2018-spring-pm/page-53.webp",
      "/questions/ipa/ap/2018-spring-pm/page-54.webp",
      "/questions/ipa/ap/2018-spring-pm/page-55.webp",
      "/questions/ipa/ap/2018-spring-pm/page-56.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問10　データセンタで行うシステム運用（公式問題PDF 52ページ）",
      "応用情報技術者 2018年度春期 午後 問10　データセンタで行うシステム運用（公式問題PDF 53ページ）",
      "応用情報技術者 2018年度春期 午後 問10　データセンタで行うシステム運用（公式問題PDF 54ページ）",
      "応用情報技術者 2018年度春期 午後 問10　データセンタで行うシステム運用（公式問題PDF 55ページ）",
      "応用情報技術者 2018年度春期 午後 問10　データセンタで行うシステム運用（公式問題PDF 56ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q10-p05.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問10　データセンタで行うシステム運用 公式解答例（公式PDF 5ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "ap-2018s-pm-q11",
    "exam": "ap",
    "year": 2018,
    "season": "spring",
    "session": "pm",
    "qNumber": 11,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "システム更改プロジェクトの監査"
    ],
    "difficulty": 4,
    "question": "問11　システム更改プロジェクトの監査",
    "answer": "問11\n                       出題趣旨\n 貸金業などの規制業務をサポートする情報システムは，関連法令で定められた要件を満たすことに加えて，\n組織体の業務運営方針に基づく要件も満たす必要がある。そのためには，関係者が適切にプロジェクトに関与\nすること，要件の根拠を明確にすること，要件間の整合性を確保することなどが重要である。\n 本問では，債権管理システムの更改プロジェクトを題材に，要件定義に関する監査において，問題点を識別\nする能力，監査手続を策定する能力などを問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１  イ，ウ\n  設問２     a イ\n  設問３     b 債権管理部及び法務部の要件定義メンバ\n              c 業務要件と根拠資料の内容との関係\n  設問４  エ\n  設問５     d 要件検討会の議事録\n              e 運営委員会の議事録                         順不同\n              f 課題管理表\n\n\n\n\n\n                                                6/6\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "要件と根拠資料の対応を確かめ、関係部門が検討に参加した記録を確認します。重要課題の報告は、会議の議事録と課題管理表で追跡できます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2018-spring-pm/page-58.webp",
      "/questions/ipa/ap/2018-spring-pm/page-59.webp",
      "/questions/ipa/ap/2018-spring-pm/page-60.webp",
      "/questions/ipa/ap/2018-spring-pm/page-61.webp"
    ],
    "imageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問11　システム更改プロジェクトの監査（公式問題PDF 58ページ）",
      "応用情報技術者 2018年度春期 午後 問11　システム更改プロジェクトの監査（公式問題PDF 59ページ）",
      "応用情報技術者 2018年度春期 午後 問11　システム更改プロジェクトの監査（公式問題PDF 60ページ）",
      "応用情報技術者 2018年度春期 午後 問11　システム更改プロジェクトの監査（公式問題PDF 61ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/ap/2018-spring-pm/answer-q11-p06.webp"
    ],
    "answerImageAltTexts": [
      "応用情報技術者 2018年度春期 午後 問11　システム更改プロジェクトの監査 公式解答例（公式PDF 6ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）応用情報技術者 2018年度春期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
