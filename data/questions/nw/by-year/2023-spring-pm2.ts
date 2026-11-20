import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2023_SPRING_PM2: Question[] = [
  {
    "id": "nw-2023h-pm2-q1",
    "exam": "nw",
    "year": 2023,
    "season": "spring",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "マルチクラウド利用による可用性向上"
    ],
    "difficulty": 4,
    "question": "問1　マルチクラウド利用による可用性向上に関する次の記述を読んで、設問に答えよ。",
    "answer": "令和5 年度 春期 ネットワークスペシャリスト試験 解答例\n\n午後Ⅱ試験\n\n問１\n\n                       出題趣旨\n オンプレミスからクラウドサービスへの移行が進み，クラウドサービスを利用する企業はますます増えてい\nる。業務環境の可用性についてクラウド事業者に依存する傾向が強くなり，事業継続性の観点から対策が必要\nとなっている。また，企業の情報システム部門が，企業内部のクラウドサービス利用を全て把握することが困\n難なケースも想定される。\n 本問では，マルチクラウド利用による可用性向上を題材として，BGP やVRRP を利用した可用性向上，これら\nを組み合わせたネットワーク構成の考慮点及びインターネット接続の変更に伴うグローバルIP アドレスの変\n更による影響と対策について問う。\n\n\n  設問                解答例・解答の要点                 備考\n 設問１(1) DNS ラウンドロビン\n         (2) プロキシサーバのアプリケーションプロセスが停止した場合に検知できないか\n      ら\n         (3) 192.168.2.145\n         (4) キャッシュDNS サーバがキャッシュを保持する時間を短くするため\n         (5)  方法  プロキシ自動設定機能を利用する。\n       制限事項 対応するPC やサーバでしか利用できない。\n 設問２(1)  a  AS\n              b ピア\n              c  UPDATE\n              d  KEEPALIVE\n              e ルーティングテーブル\n              f 大きい\n         (2) 自身のIP アドレス\n         (3) タイプ  4\n       動作   BGP 接続を切断し，経路情報がクリアされる。\n         (4) VRRP マスターになったR13 が経路情報を保持していないと受信したパケットを\n      転送できないから\n         (5) 確認すべき内容 パケットロスが発生しないこと\n       ① 送信元  R13            宛先   FW10\n                        又は\n         送信元  FW10            宛先   R13\n                        又は\n         送信元  R13            宛先   R11\n                                          ①と②は順不同\n                        又は\n         送信元  R11            宛先   R13\n       ② 送信元  R13            宛先   R14\n                        又は\n         送信元  R14            宛先   R13\n         (6) 経路情報は，BGP と比較して静的経路制御の方が優先されるから\n\n\n\n\n\n                                                1/3\n\n                                                                            ©2023 独立行政法人情報処理推進機構       (7) ① ・R11\n      ② ・R13\n      ③ ・R11 とR12 とを接続する回線\n      ④ ・R13 とR14 とを接続する回線\n      ⑤ ・R11 とL2SW10 とを接続する回線\n      ⑥ ・R13 とL2SW10 とを接続する回線\n設問３(1) ルーティングのループが発生する。\n       (2) 送信元IP アドレスが変わるから\n       (3) 送信元IP アドレスがプロキシサーバA で宛先IP アドレスがインターネットで\n      あった場合にネクストホップをR10 とする設定\n       (4) SaaS の送信元IP アドレスによるアクセス制限の設定変更\n\n\n\n\n\n                                               2/3\n\n                                                                           ©2023 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "経路制御による到達可能性と、アプリケーションが利用できることを分けて確認します。\n\n- 設問1：DNSで複数の接続先を返す方式と、実際のサービス監視は別です。プロキシのプロセス停止まで検出できる監視か、DNSキャッシュの保持時間が切替えにどう影響するかを確認します。\n- 設問2：BGPの隣接関係、経路の広告、接続維持を対応付けます。VRRPでマスターになっても経路情報がそろっていなければ転送できません。切替え試験では、機器の状態だけでなく該当区間でパケットロスがないことを確認します。また、本文の静的経路とBGP経路の優先関係を踏まえます。\n- 設問3：複数経路を組み合わせるときはループと送信元IPアドレスの変化を追います。プロキシからインターネットへの通信に用いるネクストホップを条件付きで設定し、SaaS側の送信元IPアドレスによる許可設定も新しい経路と対応させます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_ans.pdf)",
    "scoringCriteria": "経路制御による到達可能性と、アプリケーションが利用できることを分けて確認します。\n\n- 設問1：DNSで複数の接続先を返す方式と、実際のサービス監視は別です。プロキシのプロセス停止まで検出できる監視か、DNSキャッシュの保持時間が切替えにどう影響するかを確認します。\n- 設問2：BGPの隣接関係、経路の広告、接続維持を対応付けます。VRRPでマスターになっても経路情報がそろっていなければ転送できません。切替え試験では、機器の状態だけでなく該当区間でパケットロスがないことを確認します。また、本文の静的経路とBGP経路の優先関係を踏まえます。\n- 設問3：複数経路を組み合わせるときはループと送信元IPアドレスの変化を追います。プロキシからインターネットへの通信に用いるネクストホップを条件付きで設定し、SaaS側の送信元IPアドレスによる許可設定も新しい経路と対応させます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p02.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p03.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p04.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p05.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p06.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p07.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p08.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p09.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p10.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p11.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 2ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 3ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 4ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 5ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 6ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 7ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 8ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 9ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 10ページ）",
      "IPA公式問題 問1 マルチクラウド利用による可用性向上（PDF 11ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/nw/2023-spring-pm2/q1-answer-p01.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/q1-answer-p02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問1（PDF 1ページ）",
      "IPA公式解答例 問1（PDF 2ページ）"
    ]
  },
  {
    "id": "nw-2023h-pm2-q2",
    "exam": "nw",
    "year": 2023,
    "season": "spring",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "ECサーバの増強"
    ],
    "difficulty": 4,
    "question": "問2　ECサーバの増強に関する次の記述を読んで、設問に答えよ。",
    "answer": "問２\n\n                       出題趣旨\n インターネット上でサービスを提供するシステムは，顧客数の変化に対応して適切な処理能力をもつ構成を\n維持することが重要である。また，登録する顧客数の増加によって，顧客のアカウント情報の管理負荷も増大\nするので，異なるドメイン間で認証，認可情報の交換が可能な認証連携技術の活用も求められる。\n このような状況を基に，本問では，サーバ負荷分散装置（以下，LB という）によってシステムの処理能力を\n 増強させる構成設計と，SAML2.0 を利用するための方式検討を事例として取り上げた。\n  本問では，EC サーバの増強を題材として，LB 導入に伴う構成設計及びSAML2.0 を利用するための方式検討\nにおいて，受験者が習得した技術が活用できる水準かどうかを問う。\n\n\n  設問                解答例・解答の要点                 備考\n  設問１     a  NS\n              b  MX\n              c  100.α.β.1\n              d  100.α.β.3\n              e  192.168.1.1\n              f  192.168.1.3\n 設問２(1) コモン名とURL のドメインとが異なるから\n         (2) L3SW，FWｚ，L2SW\n 設問３(1)  g アップ\n              h アウト\n         (2) 1 台故障時にも，EC サイトの応答速度の低下を発生させないため\n         (3)  i  100.α.β.2\n              j  192.168.1.2\n              k  192.168.1.4\n 設問４(1)   どの機器      LB\n             IP アドレスの呼称仮想IP アドレス\n         (2) （自身の）IP アドレス\n         (3) FWz から  LB に変更\n         (4) EC サーバに，アクセス元PC のIP アドレスを通知するため\n         (5) 既設EC サーバにインストールされているサーバ証明書と秘密鍵のペアを，LB\n      に移す。\n 設問５(1) TCP コネクションが再設定されるたびに，ポート番号が変わる可能性があるか\n      ら\n         (2) サーバからの応答に含まれるCookie 中のセッションID が，セッション管理テ\n      ーブルに存在しない場合\n         (3) サービスが稼働しているかどうか検査しないから\n 設問６(1) アクセス元の購買担当者が所属している会員企業の情報\n         (2) IdP の公開鍵証明書\n         (3) IdP の鍵を所有していないから\n         (4) ① ・信頼関係のあるIdP が生成したものであること\n       ② ・SAML アサーションが改ざんされていないこと\n\n\n\n\n\n                                                3/3\n\n                                                                            ©2023 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "LBの導入前後で、接続先、TLSの終端、セッションの対応先を追い直します。\n\n- 設問1・2：DNSのレコード種別と各機器のIPアドレスを構成図に対応付け、証明書に記載された名前とURLのドメインを比較します。\n- 設問3・4：1台の故障時にも必要な性能を保てる台数を考えます。利用者が接続する仮想IPアドレスとサーバ側のアドレスを区別し、TLSをLBで終端する構成では、証明書と秘密鍵の組もその終端に配置します。アクセス元情報の通知は、LBのアドレスだけがサーバに見える問題への対応です。\n- 設問5：接続を作り直すと変わり得るポート番号と、Cookieに保持するセッションIDの性質を区別します。機器への疎通確認だけでは、サービスが応答できるかまでは確認できません。\n- 設問6：SAML連携では所属企業を特定した上で信頼するIdPを選び、その公開鍵証明書によって発行元と改ざんの有無を検証します。公開鍵による検証と、IdPの秘密鍵による署名の生成を混同しないことが大切です。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_ans.pdf)",
    "scoringCriteria": "LBの導入前後で、接続先、TLSの終端、セッションの対応先を追い直します。\n\n- 設問1・2：DNSのレコード種別と各機器のIPアドレスを構成図に対応付け、証明書に記載された名前とURLのドメインを比較します。\n- 設問3・4：1台の故障時にも必要な性能を保てる台数を考えます。利用者が接続する仮想IPアドレスとサーバ側のアドレスを区別し、TLSをLBで終端する構成では、証明書と秘密鍵の組もその終端に配置します。アクセス元情報の通知は、LBのアドレスだけがサーバに見える問題への対応です。\n- 設問5：接続を作り直すと変わり得るポート番号と、Cookieに保持するセッションIDの性質を区別します。機器への疎通確認だけでは、サービスが応答できるかまでは確認できません。\n- 設問6：SAML連携では所属企業を特定した上で信頼するIdPを選び、その公開鍵証明書によって発行元と改ざんの有無を検証します。公開鍵による検証と、IdPの秘密鍵による署名の生成を混同しないことが大切です。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p12.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p13.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p14.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p15.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p16.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p17.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p18.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p19.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p20.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p21.webp",
      "/images/ipa-written-qb7/nw/2023-spring-pm2/question-p22.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問2 ECサーバの増強（PDF 12ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 13ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 14ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 15ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 16ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 17ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 18ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 19ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 20ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 21ページ）",
      "IPA公式問題 問2 ECサーバの増強（PDF 22ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_nw_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/nw/2023-spring-pm2/q2-answer-p03.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問2（PDF 3ページ）"
    ]
  }
];
