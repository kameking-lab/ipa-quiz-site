import type { Question } from "@/lib/questions/types";

export const NW_QUESTIONS_2022_SPRING_PM2: Question[] = [
  {
    "id": "nw-2022h-pm2-q1",
    "exam": "nw",
    "year": 2022,
    "season": "spring",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "SSL-VPN",
      "VDI",
      "VRRP"
    ],
    "difficulty": 4,
    "question": "問1　テレワーク環境の導入\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１  ア 改ざん検知\n       イ  L2 フォワーディング\n       ウ ポート\n       エ 公開\n       オ ポートフォワーディング\n       カ DHE\n 設問２(1) ① ・暗号化\n       ② ・メッセージ認証\n         (2) Subject\n 設問３(1) クライアント証明書の公開鍵に対する秘密鍵は本人しか保有していないから\n         (2) CA のルート証明書\n         (3) なりすまされたSSL-VPN 装置へ接続してしまうリスク\n         (4) 秘密鍵が漏えいする前に行われた通信のデータ\n         (5) 署名に用いる鍵    利用者の秘密鍵\n      署名の検証に用いる鍵 利用者の公開鍵\n         (6) シリアル番号\n 設問４(1) VDI 利用者の利用者ID とその利用者の仮想PC のIP アドレスの組\n         (2) 情報    クライアント証明書から得られる利用者ID 情報\n      タイミング Ⅷ\n 設問５(1) M 社とN 社の広域イーサネットの両方を利用すること\n         (2) 経路数  4\n      コスト  70\n         (3) フローモードはパケット到着順序の逆転が起こりにくいから\n         (4) 送信元IP アドレスと宛先IP アドレスから計算したハッシュ値が偏らないから\n         (5) インタフェースの障害を検知した時にL3SW31 のVRRP の優先度を下げる。",
    "modelAnswer": "```text\n設問１  ア 改ざん検知\n       イ  L2 フォワーディング\n       ウ ポート\n       エ 公開\n       オ ポートフォワーディング\n       カ DHE\n 設問２(1) ① ・暗号化\n       ② ・メッセージ認証\n         (2) Subject\n 設問３(1) クライアント証明書の公開鍵に対する秘密鍵は本人しか保有していないから\n         (2) CA のルート証明書\n         (3) なりすまされたSSL-VPN 装置へ接続してしまうリスク\n         (4) 秘密鍵が漏えいする前に行われた通信のデータ\n         (5) 署名に用いる鍵    利用者の秘密鍵\n      署名の検証に用いる鍵 利用者の公開鍵\n         (6) シリアル番号\n 設問４(1) VDI 利用者の利用者ID とその利用者の仮想PC のIP アドレスの組\n         (2) 情報    クライアント証明書から得られる利用者ID 情報\n      タイミング Ⅷ\n 設問５(1) M 社とN 社の広域イーサネットの両方を利用すること\n         (2) 経路数  4\n      コスト  70\n         (3) フローモードはパケット到着順序の逆転が起こりにくいから\n         (4) 送信元IP アドレスと宛先IP アドレスから計算したハッシュ値が偏らないから\n         (5) インタフェースの障害を検知した時にL3SW31 のVRRP の優先度を下げる。\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-02.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-03.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-04.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-05.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-06.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-07.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-08.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-09.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-10.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-11.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-12.webp"
    ],
    "imageAltTexts": [
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 2ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 3ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 4ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 5ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 6ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 7ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 8ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 9ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 10ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 11ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問1 本文・図表・設問（公式問題PDF 12ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/answer-page-01.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問1（公式PDF 1ページ）"
    ],
    "explanation": "証明書の署名を検証する鍵と本人が保持する秘密鍵を区別する。SSL-VPNの認証情報をVDIの接続先制御へ引き継ぎ、冗長化では経路・コスト・負荷分散単位と障害時の優先度変更を別々に追う。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2022年春期 ネットワークスペシャリスト 午後II",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "nw-2022h-pm2-q2",
    "exam": "nw",
    "year": 2022,
    "season": "spring",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "コンテナ",
      "リバースプロキシ",
      "監視"
    ],
    "difficulty": 4,
    "question": "問2　仮想化技術の導入\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１(1) ア ハイパーバイザ\n       イ VRID\n       ウ  255\n       エ A\n         (2) ホストサーバが停止した場合，AP 仮想サーバが2 台とも停止する。\n         (3) バックアップが，VRRP アドバタイズメントを決められた時間内に受信しなく\n      なる。\n 設問２(1) 外部ではコンテナサーバに付与したIP アドレスが利用されることはないから\n         (2) ホストヘッダフィールド\n         (3) オ  192.168.0.98\n       カ  8000\n         (4) 宛先IP アドレス172.16.0.16\n       宛先ポート番号  80\n 設問３(1) ① ・NAPT 機能\n       ② ・ポートフォワード機能\n         (2) 複数のIP アドレスを設定し，IP アドレスごとに専用AP を識別する仕組み\n 設問４(1) キ エコー応答\n       ク SYN/ACK\n       ケ GET\n         (2) コンテナサーバa\n         (3) WebAP コンテナ（AP0a）\n 設問５(1) AP のFQDN とIP アドレスをPC のhosts ファイルに記載する。\n         (2) AP サーバに対するPC からのアクセスがなくなっていることを確認する。\n         (3) キャッシュDNS サーバのDNS キャッシュを保持する時間が短くなる。\n         (4) ① ・WebAP コンテナ2 台が正しく構築されたことを確認するため\n       ② ・共用リバースプロキシの設定が正しく行われたことを確認するため",
    "modelAnswer": "```text\n設問１(1) ア ハイパーバイザ\n       イ VRID\n       ウ  255\n       エ A\n         (2) ホストサーバが停止した場合，AP 仮想サーバが2 台とも停止する。\n         (3) バックアップが，VRRP アドバタイズメントを決められた時間内に受信しなく\n      なる。\n 設問２(1) 外部ではコンテナサーバに付与したIP アドレスが利用されることはないから\n         (2) ホストヘッダフィールド\n         (3) オ  192.168.0.98\n       カ  8000\n         (4) 宛先IP アドレス172.16.0.16\n       宛先ポート番号  80\n 設問３(1) ① ・NAPT 機能\n       ② ・ポートフォワード機能\n         (2) 複数のIP アドレスを設定し，IP アドレスごとに専用AP を識別する仕組み\n 設問４(1) キ エコー応答\n       ク SYN/ACK\n       ケ GET\n         (2) コンテナサーバa\n         (3) WebAP コンテナ（AP0a）\n 設問５(1) AP のFQDN とIP アドレスをPC のhosts ファイルに記載する。\n         (2) AP サーバに対するPC からのアクセスがなくなっていることを確認する。\n         (3) キャッシュDNS サーバのDNS キャッシュを保持する時間が短くなる。\n         (4) ① ・WebAP コンテナ2 台が正しく構築されたことを確認するため\n       ② ・共用リバースプロキシの設定が正しく行われたことを確認するため\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-13.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-14.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-15.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-16.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-17.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-18.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-19.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-20.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-21.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-22.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-23.webp",
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/question-page-24.webp"
    ],
    "imageAltTexts": [
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 13ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 14ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 15ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 16ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 17ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 18ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 19ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 20ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 21ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 22ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 23ページ）",
      "ネットワークスペシャリスト 2022年春期 午後II 問2 本文・図表・設問（公式問題PDF 24ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/nw-2022h-pm2/answer-page-02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問2（公式PDF 2ページ）"
    ],
    "explanation": "仮想サーバが同じホストに集中すると、ホスト障害で同時停止する。コンテナ移行では外部公開アドレス、ポート転送、HTTPのホストヘッダを整理し、監視失敗の層と切替時のDNSキャッシュの影響を確認する。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_nw_pm2_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2022年春期 ネットワークスペシャリスト 午後II",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
