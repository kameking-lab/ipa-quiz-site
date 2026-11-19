import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2022_SPRING_PM1: Question[] = [
  {
    "id": "nw-2022h-pm1-q1",
    "exam": "nw",
    "year": 2022,
    "season": "spring",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "ネットワーク設計",
      "認証・認可",
      "パケットキャプチャ"
    ],
    "difficulty": 4,
    "question": "問1　ネットワークの更改に関する次の記述を読んで，設問1〜3に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1)  a  Syslog\n             b ダイジェスト\n             c  CONNECT\n       (2) 社外からサーバに侵入されたときにOA セグメントの機器に侵入されるリスク\n設問２(1) LDAP サーバ\n       (2) 管理セグメント，OA セグメント\n       (3) 認証 FTA の利用者が本人であることを確認するため\n      認可 操作ごとに実行権限を有するかを確認するため\n設問３(1)  d フラッディング\n       (2) 送信側と受信側のトラフィックを合計1 G ビット／秒までしか取り込めない。\n       (3) 制御サーバ\n       (4) モード  プロミスキャス\n      フレーム 宛先MAC アドレスが自分のMAC アドレス以外のフレーム\n       (5) 1,080",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1)  a  Syslog\n             b ダイジェスト\n             c  CONNECT\n       (2) 社外からサーバに侵入されたときにOA セグメントの機器に侵入されるリスク\n設問２(1) LDAP サーバ\n       (2) 管理セグメント，OA セグメント\n       (3) 認証 FTA の利用者が本人であることを確認するため\n      認可 操作ごとに実行権限を有するかを確認するため\n設問３(1)  d フラッディング\n       (2) 送信側と受信側のトラフィックを合計1 G ビット／秒までしか取り込めない。\n       (3) 制御サーバ\n       (4) モード  プロミスキャス\n      フレーム 宛先MAC アドレスが自分のMAC アドレス以外のフレーム\n       (5) 1,080\n```",
    "explanation": "設問1・2：サーバを置く場所によって、侵害時に到達できる機器が変わる。外部公開サーバからOAセグメントへの侵入リスクを捉え、認証では利用者が本人か、認可では各操作の権限があるかを確認する。この二つを同じ目的として書かない。\n\n設問3：ミラーポートに送るトラフィックは、送信方向と受信方向を合計して帯域と比較する。キャプチャ用NICでは、自分宛て以外のフレームも受信するプロミスキャスモードが必要になる。スイッチのフラッディングとNICの受信モードは異なる動作である。\n\n容量計算は、原本のトラフィック量、測定時間、ビットからバイトへの換算をそろえて行う。公式解答例の1,080に至るまで、どの通信量を合算しているかを確認すると、片方向分だけで計算する誤りを防げる。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p3.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p4.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p5.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p6.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p7.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p8.webp"
    ],
    "imageAltTexts": [
      "2022年春期 NW 問1 本文・図表・設問（公式PDF 3ページ）",
      "2022年春期 NW 問1 本文・図表・設問（公式PDF 4ページ）",
      "2022年春期 NW 問1 本文・図表・設問（公式PDF 5ページ）",
      "2022年春期 NW 問1 本文・図表・設問（公式PDF 6ページ）",
      "2022年春期 NW 問1 本文・図表・設問（公式PDF 7ページ）",
      "2022年春期 NW 問1 本文・図表・設問（公式PDF 8ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/nw-2022h-pm1-q1-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "nw-2022h-pm1-q1 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "nw-2022h-pm1-q2",
    "exam": "nw",
    "year": 2022,
    "season": "spring",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "VRF",
      "IPsec",
      "セキュアゲートウェイ"
    ],
    "difficulty": 4,
    "question": "問2　セキュアゲートウェイサービスの導入に関する次の記述を読んで，設問1〜3に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1)  a.b.c.d\n       (2)  a ルーティング\n       (3)  b 本社のL3SW\n             c 静的経路制御\n             d 静的経路制御\n       (4)     VRF 識別子     65000:2\n      宛先ネットワーク  0.0.0.0/0\n       (5) ISP が割り当てる営業所のIPsec ルータのIP アドレスが動的だから\n       (6) 172.17.1.0/24 又は 営業所のLAN\n設問２(1)  e 暗号\n             f  IP\n             g   Child\n             h 鍵長\n       (2) ① ・IKE SA\n      ②  ・Child SA\n設問３(1) N 社専用のIP アドレスであること\n       (2) Q 社SGW サービスの経由によって発生する遅延",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1)  a.b.c.d\n       (2)  a ルーティング\n       (3)  b 本社のL3SW\n             c 静的経路制御\n             d 静的経路制御\n       (4)     VRF 識別子     65000:2\n      宛先ネットワーク  0.0.0.0/0\n       (5) ISP が割り当てる営業所のIPsec ルータのIP アドレスが動的だから\n       (6) 172.17.1.0/24 又は 営業所のLAN\n設問２(1)  e 暗号\n             f  IP\n             g   Child\n             h 鍵長\n       (2) ① ・IKE SA\n      ②  ・Child SA\n設問３(1) N 社専用のIP アドレスであること\n       (2) Q 社SGW サービスの経由によって発生する遅延\n```",
    "explanation": "設問1：VRFごとに経路表を分け、デフォルトルートをどのVRFに登録するかを確認する。相手側のIPアドレスが動的に割り当てられる場合、固定アドレスを前提にした設定とは扱いが異なる。ルータの外側のアドレスと、トンネルで運ぶ営業所LANのアドレスも区別する。\n\n設問2：IKE SAはIPsecの制御情報を安全に交換するための関係で、Child SAはデータ通信を保護するための関係である。暗号方式、IPアドレス、SAの種類、鍵長のどれを問われているかを、交換手順の位置から判断する。\n\n設問3：クラウド側で接続元を制限するときは、専用の送信元IPアドレスが識別に使われる。経由サービスの追加は通信経路を変えるため、セキュリティ機能だけでなく追加される遅延も確認する。\n\n公式正誤表：冊子11ページの図2、下から2行目の「P社営業支援システム」は「P社営業支援サービス」に訂正されています。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p9.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p10.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p11.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p12.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p13.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p14.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-errata.webp"
    ],
    "imageAltTexts": [
      "2022年春期 NW 問2 本文・図表・設問（公式PDF 9ページ）",
      "2022年春期 NW 問2 本文・図表・設問（公式PDF 10ページ）",
      "2022年春期 NW 問2 本文・図表・設問（公式PDF 11ページ）",
      "2022年春期 NW 問2 本文・図表・設問（公式PDF 12ページ）",
      "2022年春期 NW 問2 本文・図表・設問（公式PDF 13ページ）",
      "2022年春期 NW 問2 本文・図表・設問（公式PDF 14ページ）",
      "IPA公式正誤表：問2 図2のP社営業支援サービスの表記訂正"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/nw-2022h-pm1-q2-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "nw-2022h-pm1-q2 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "nw-2022h-pm1-q3",
    "exam": "nw",
    "year": 2022,
    "season": "spring",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "Kerberos",
      "DNS",
      "シングルサインオン"
    ],
    "difficulty": 4,
    "question": "問3　シングルサインオンの導入に関する次の記述を読んで，設問1〜3に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1) 業務サーバと営業支援サーバのFQDN を，プロキシ例外リストに登録する。\n       (2) ① ・社内DNS サーバのIP アドレス\n      ② ・デフォルトゲートウェイのIP アドレス\n       (3) ア 外部DNS サーバ\n      ウ 公開Web サーバ\n      エ プロキシサーバ\n      オ  any\n      カ 社内DNS サーバ\n       (4) イ  UDP/53\n設問２(1) ST を取り出せないから\n       (2) ①，②，⑤，⑥\n       (3) PC とサーバ間で時刻同期を行う。\n設問３(1) ケルベロス認証を行うサーバのFQDN\n       (2) 720\n       (3) ホスト名がDS に対して，add1 のA レコードを二つ，add2 のA レコードを一\n      つ記述する。",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1) 業務サーバと営業支援サーバのFQDN を，プロキシ例外リストに登録する。\n       (2) ① ・社内DNS サーバのIP アドレス\n      ② ・デフォルトゲートウェイのIP アドレス\n       (3) ア 外部DNS サーバ\n      ウ 公開Web サーバ\n      エ プロキシサーバ\n      オ  any\n      カ 社内DNS サーバ\n       (4) イ  UDP/53\n設問２(1) ST を取り出せないから\n       (2) ①，②，⑤，⑥\n       (3) PC とサーバ間で時刻同期を行う。\n設問３(1) ケルベロス認証を行うサーバのFQDN\n       (2) 720\n       (3) ホスト名がDS に対して，add1 のA レコードを二つ，add2 のA レコードを一\n      つ記述する。\n```",
    "explanation": "設問1：社内サーバへの通信をプロキシ経由にしないため、対象サーバのFQDNを例外リストへ登録する。DNSで使う通信、外部公開に必要な通信、社内で完結する通信を分けて、原本のフィルタリング表を埋める。\n\n設問2：Kerberos認証では、サービスチケットを取り出して対象サービスへ提示する手順を追う。チケットを利用するPCとサーバの時刻がずれていると認証に影響するため、時刻同期も構成の一部として考える。\n\n設問3：SRVレコードが指すサービス提供先の名前と、その名前をIPアドレスへ解決するAレコードを区別する。負荷配分の設問では、Weightの比とアクセス数の条件を原本どおりに当てはめる。DSの名前から複数のサーバへ対応付ける箇所では、必要なAレコード数まで確認する。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p15.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p16.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p17.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p18.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p19.webp",
      "/questions/ipa-plan5-qb8/2022r04h_nw_pm1-p20.webp"
    ],
    "imageAltTexts": [
      "2022年春期 NW 問3 本文・図表・設問（公式PDF 15ページ）",
      "2022年春期 NW 問3 本文・図表・設問（公式PDF 16ページ）",
      "2022年春期 NW 問3 本文・図表・設問（公式PDF 17ページ）",
      "2022年春期 NW 問3 本文・図表・設問（公式PDF 18ページ）",
      "2022年春期 NW 問3 本文・図表・設問（公式PDF 19ページ）",
      "2022年春期 NW 問3 本文・図表・設問（公式PDF 20ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/nw-2022h-pm1-q3-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "nw-2022h-pm1-q3 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
