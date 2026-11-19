import type { Question } from "@/lib/questions/types";

export const NW_2019_AUTUMN_PM2_QUESTIONS: Question[] = [
  {
    "id": "nw-2019a-pm2-q1",
    "exam": "nw",
    "year": 2019,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "ネットワーク",
    "topicTags": [
      "クラウドPBX",
      "SIP",
      "NAT"
    ],
    "difficulty": 5,
    "question": "クラウドサービスへの移行",
    "answer": "設問１(1) ア PC\n       イ FW\n       カ  IP-PBX\n         (2) ウ REGISTER\n       エ  SIP UA\n       オ  200 OK\n         (3) ① ・インターネット及びIP 電話機とIP-PBX 間のSIP 通信\n       ② ・インターネットとIP 電話機間のRTP 通信\n 設問２(1) キ  MPLS（Multi-Protocol Label Switching）\n       ク フルメッシュ\n       ケ  Y-BBR\n         (2)  a 支店～Y-VPN～本社\n         (3) Y-GW の設置の有無によって，異なる経路が使われるから\n 設問３(1) コ 本社のスマホ\n         (2)  b 本社のIP 電話機の保留\n         (3) (5)，(16)\n         (4) 本社のIP 電話機は，(23)中のSDP の情報に従い保留音を出す。\n 設問４(1) L3SW のPoE-SW 収容ポートを新しいセグメントにして，L2SW 収容ポートと\n      のルーティングを禁止する。\n         (2)  c 公衆電話網の電話番号の移行\n              d 本社と社外の電話との発着信\n         (3) 設置場所 本社\n      変更内容  Web サーバのA レコードのIP アドレスを，X-DC のWeb サーバの\n                        IP アドレスに変える。\n         (4) サ  b2\n                                          順不同\n       シ  b3\n         (5) 時点 本社PC の切替期間が終了した時点\n      機器 本社のFW，本社のプロキシサーバ",
    "modelAnswer": "```text\n設問１(1) ア PC\n       イ FW\n       カ  IP-PBX\n         (2) ウ REGISTER\n       エ  SIP UA\n       オ  200 OK\n         (3) ① ・インターネット及びIP 電話機とIP-PBX 間のSIP 通信\n       ② ・インターネットとIP 電話機間のRTP 通信\n 設問２(1) キ  MPLS（Multi-Protocol Label Switching）\n       ク フルメッシュ\n       ケ  Y-BBR\n         (2)  a 支店～Y-VPN～本社\n         (3) Y-GW の設置の有無によって，異なる経路が使われるから\n 設問３(1) コ 本社のスマホ\n         (2)  b 本社のIP 電話機の保留\n         (3) (5)，(16)\n         (4) 本社のIP 電話機は，(23)中のSDP の情報に従い保留音を出す。\n 設問４(1) L3SW のPoE-SW 収容ポートを新しいセグメントにして，L2SW 収容ポートと\n      のルーティングを禁止する。\n         (2)  c 公衆電話網の電話番号の移行\n              d 本社と社外の電話との発着信\n         (3) 設置場所 本社\n      変更内容  Web サーバのA レコードのIP アドレスを，X-DC のWeb サーバの\n                        IP アドレスに変える。\n         (4) サ  b2\n                                          順不同\n       シ  b3\n         (5) 時点 本社PC の切替期間が終了した時点\n      機器 本社のFW，本社のプロキシサーバ\n```",
    "explanation": "移行の前後で通信経路とアドレス変換の位置を確認する。SIPの登録と呼制御を分け、切替手順では各拠点の移行と疎通確認の前後関係を追う。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/nw/2019-autumn-pm2/p02.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p03.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p04.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p05.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p06.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p07.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p08.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p09.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p10.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p11.webp",
      "/questions/ipa-official/nw/2019-autumn-pm2/p12.webp"
    ],
    "imageAltTexts": [
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 2ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 3ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 4ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 5ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 6ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 7ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 8ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 9ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 10ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 11ページ）",
      "2019年度秋期 ネットワークスペシャリスト 午後II 問1 クラウドサービスへの移行（公式問題PDF 12ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/nw/2019-autumn-pm2/q1-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問1の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_pm2_qs.pdf#page=2",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_nw_pm2_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2019年度秋期 ネットワークスペシャリスト 午後II」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
