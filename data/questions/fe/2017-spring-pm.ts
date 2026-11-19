import type { Question } from "@/lib/questions/types";

export const FE_2017_SPRING_PM_QUESTIONS: Question[] = [
  {
    "id": "fe-2017h-pm-q1",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 1,
    "type": "descriptive",
    "category": "セキュリティ",
    "topicTags": [
      "暗号",
      "ファイル共有"
    ],
    "difficulty": 4,
    "question": "ファイルの安全な受渡し",
    "answer": "問1   設問1     エ\n     設問2  ａ  イ\n     設問3  ｂ  ウ\n         ｃ  ア\n         ｄ  オ",
    "modelAnswer": "```text\n問1   設問1     エ\n     設問2  ａ  イ\n     設問3  ｂ  ウ\n         ｃ  ア\n         ｄ  オ\n```",
    "explanation": "暗号化とディジタル署名で守る対象を区別する。各社が受け取るファイルの機密度と、費用の条件を併せて確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p05.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p06.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p07.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p08.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問1 ファイルの安全な受渡し（公式問題PDF 5ページ）",
      "2017年度春期 基本情報技術者 午後 問1 ファイルの安全な受渡し（公式問題PDF 6ページ）",
      "2017年度春期 基本情報技術者 午後 問1 ファイルの安全な受渡し（公式問題PDF 7ページ）",
      "2017年度春期 基本情報技術者 午後 問1 ファイルの安全な受渡し（公式問題PDF 8ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q1-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問1の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=5",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q2",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 2,
    "type": "descriptive",
    "category": "ハードウェア",
    "topicTags": [
      "A/D変換",
      "割込み"
    ],
    "difficulty": 4,
    "question": "温度モニタ",
    "answer": "問2   設問1  ａ  イ\n         ｂ  エ\n         ｃ  イ\n     設問2  ｄ  イ\n         ｅ  エ",
    "modelAnswer": "```text\n問2   設問1  ａ  イ\n         ｂ  エ\n         ｃ  イ\n     設問2  ｄ  イ\n         ｅ  エ\n```",
    "explanation": "A/D変換器が返す値と温度基準値の対応を確認する。割込みごとにレジスタと表示がどう変わるかを追う。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p09.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p10.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p11.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p12.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問2 温度モニタ（公式問題PDF 9ページ）",
      "2017年度春期 基本情報技術者 午後 問2 温度モニタ（公式問題PDF 10ページ）",
      "2017年度春期 基本情報技術者 午後 問2 温度モニタ（公式問題PDF 11ページ）",
      "2017年度春期 基本情報技術者 午後 問2 温度モニタ（公式問題PDF 12ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q2-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問2の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=9",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q3",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 3,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "関係データベース",
      "制約"
    ],
    "difficulty": 4,
    "question": "住民からの問合せに回答するためのデータベース",
    "answer": "問3   設問1     ア\n     設問2  ａ  エ\n         ｂ  ア\n     設問3  ｃ  ア\n         ｄ  ア",
    "modelAnswer": "```text\n問3   設問1     ア\n     設問2  ａ  エ\n         ｂ  ア\n     設問3  ｃ  ア\n         ｄ  ア\n```",
    "explanation": "主キー、参照制約、UNIQUE制約は防げる誤りが異なる。表に示された課題を、どの列の組合せで防ぐ必要があるか確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p13.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p14.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p15.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p16.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問3 住民からの問合せに回答するためのデータベース（公式問題PDF 13ページ）",
      "2017年度春期 基本情報技術者 午後 問3 住民からの問合せに回答するためのデータベース（公式問題PDF 14ページ）",
      "2017年度春期 基本情報技術者 午後 問3 住民からの問合せに回答するためのデータベース（公式問題PDF 15ページ）",
      "2017年度春期 基本情報技術者 午後 問3 住民からの問合せに回答するためのデータベース（公式問題PDF 16ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q3-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問3の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=13",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q4",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 4,
    "type": "descriptive",
    "category": "ネットワーク",
    "topicTags": [
      "無線LAN",
      "伝送効率"
    ],
    "difficulty": 4,
    "question": "無線LANにおけるデータの送信",
    "answer": "問4   設問1  ａ  ウ\n         ｂ  ア\n     設問2  ｃ  ア\n     設問3     イ",
    "modelAnswer": "```text\n問4   設問1  ａ  ウ\n         ｂ  ア\n     設問2  ｃ  ア\n     設問3     イ\n```",
    "explanation": "送信時間に待機時間と確認応答の時間を含め、送りたいデータ量をその合計時間で割る。物理層の速度とデータ送信速度を区別する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p17.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p18.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p19.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p20.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問4 無線LANにおけるデータの送信（公式問題PDF 17ページ）",
      "2017年度春期 基本情報技術者 午後 問4 無線LANにおけるデータの送信（公式問題PDF 18ページ）",
      "2017年度春期 基本情報技術者 午後 問4 無線LANにおけるデータの送信（公式問題PDF 19ページ）",
      "2017年度春期 基本情報技術者 午後 問4 無線LANにおけるデータの送信（公式問題PDF 20ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q4-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問4の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=17",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q5",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 5,
    "type": "descriptive",
    "category": "ソフトウェア設計",
    "topicTags": [
      "帳票出力",
      "境界値"
    ],
    "difficulty": 4,
    "question": "購買システムにおける注文書出力処理",
    "answer": "問5   設問1  ａ  イ\n         ｂ  カ\n     設問2  ｃ  ウ\n         ｄ  イ\n     設問3     ウ",
    "modelAnswer": "```text\n問5   設問1  ａ  イ\n         ｂ  カ\n     設問2  ｃ  ウ\n         ｄ  イ\n     設問3     ウ\n```",
    "explanation": "注文書のページが変わる条件と明細行の出力条件を区別する。テストでは、件数がページの境界に達する場合を確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p21.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p22.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p23.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p24.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p25.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p26.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問5 購買システムにおける注文書出力処理（公式問題PDF 21ページ）",
      "2017年度春期 基本情報技術者 午後 問5 購買システムにおける注文書出力処理（公式問題PDF 22ページ）",
      "2017年度春期 基本情報技術者 午後 問5 購買システムにおける注文書出力処理（公式問題PDF 23ページ）",
      "2017年度春期 基本情報技術者 午後 問5 購買システムにおける注文書出力処理（公式問題PDF 24ページ）",
      "2017年度春期 基本情報技術者 午後 問5 購買システムにおける注文書出力処理（公式問題PDF 25ページ）",
      "2017年度春期 基本情報技術者 午後 問5 購買システムにおける注文書出力処理（公式問題PDF 26ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q5-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問5の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=21",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q6",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 6,
    "type": "descriptive",
    "category": "プロジェクトマネジメント",
    "topicTags": [
      "工数",
      "要員計画"
    ],
    "difficulty": 4,
    "question": "プロジェクトの要員計画",
    "answer": "問6   設問1  ａ  エ\n         ｂ  ア\n         ｃ  ウ\n         ｄ  ウ\n     設問2  ｅ  ウ\n         ｆ  オ",
    "modelAnswer": "```text\n問6   設問1  ａ  エ\n         ｂ  ア\n         ｃ  ウ\n         ｄ  ウ\n     設問2  ｅ  ウ\n         ｆ  オ\n```",
    "explanation": "各工程に配分された工数を期間で割り、重なる工程の要員数を月ごとに足し合わせる。変更後も要員数の上限を満たすか確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p27.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p28.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p29.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p30.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問6 プロジェクトの要員計画（公式問題PDF 27ページ）",
      "2017年度春期 基本情報技術者 午後 問6 プロジェクトの要員計画（公式問題PDF 28ページ）",
      "2017年度春期 基本情報技術者 午後 問6 プロジェクトの要員計画（公式問題PDF 29ページ）",
      "2017年度春期 基本情報技術者 午後 問6 プロジェクトの要員計画（公式問題PDF 30ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q6-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問6の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=27",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q7",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 7,
    "type": "descriptive",
    "category": "ストラテジ",
    "topicTags": [
      "在庫管理",
      "補充方式"
    ],
    "difficulty": 4,
    "question": "在庫補充方法の変更",
    "answer": "問7   設問1  ａ  ウ\n         ｂ  ア\n         ｃ  ウ\n     設問2  ｄ  カ\n         ｅ  エ\n     設問3  ｆ  イ\n         ｇ  ア\n         ｈ  ケ",
    "modelAnswer": "```text\n問7   設問1  ａ  ウ\n         ｂ  ア\n         ｃ  ウ\n     設問2  ｄ  カ\n         ｅ  エ\n     設問3  ｆ  イ\n         ｇ  ア\n         ｈ  ケ\n```",
    "explanation": "出荷頻度と出荷量から商品群ごとの補充方法を決める。配送倉庫を変えた場合は、出荷量の変化と基準量を表で照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p31.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p32.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p33.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p34.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問7 在庫補充方法の変更（公式問題PDF 31ページ）",
      "2017年度春期 基本情報技術者 午後 問7 在庫補充方法の変更（公式問題PDF 32ページ）",
      "2017年度春期 基本情報技術者 午後 問7 在庫補充方法の変更（公式問題PDF 33ページ）",
      "2017年度春期 基本情報技術者 午後 問7 在庫補充方法の変更（公式問題PDF 34ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q7-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問7の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=31",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q8",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 8,
    "type": "descriptive",
    "category": "アルゴリズム",
    "topicTags": [
      "最短経路",
      "疑似言語"
    ],
    "difficulty": 4,
    "question": "最短経路を求めるプログラム",
    "answer": "問8   設問1  ａ  イ\n         ｂ  オ\n         ｃ  キ\n         ｄ  イ\n     設問2  ｅ  イ\n         ｆ  カ\n         ｇ  ア",
    "modelAnswer": "```text\n問8   設問1  ａ  イ\n         ｂ  オ\n         ｃ  キ\n         ｄ  イ\n     設問2  ｅ  イ\n         ｆ  カ\n         ｇ  ア\n```",
    "explanation": "未確定の地点の中から距離が最小の地点を選び、そこを経由すると短くなる経路を更新する。距離と経路の配列を区別する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p35.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p36.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p37.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p38.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p39.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p40.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p03.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p04.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問8 最短経路を求めるプログラム（公式問題PDF 35ページ）",
      "2017年度春期 基本情報技術者 午後 問8 最短経路を求めるプログラム（公式問題PDF 36ページ）",
      "2017年度春期 基本情報技術者 午後 問8 最短経路を求めるプログラム（公式問題PDF 37ページ）",
      "2017年度春期 基本情報技術者 午後 問8 最短経路を求めるプログラム（公式問題PDF 38ページ）",
      "2017年度春期 基本情報技術者 午後 問8 最短経路を求めるプログラム（公式問題PDF 39ページ）",
      "2017年度春期 基本情報技術者 午後 問8 最短経路を求めるプログラム（公式問題PDF 40ページ）",
      "2017年度春期 基本情報技術者 午後 共通事項（公式問題PDF 3ページ）",
      "2017年度春期 基本情報技術者 午後 共通事項（公式問題PDF 4ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q8-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問8の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=35",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q9",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 9,
    "type": "descriptive",
    "category": "プログラミング",
    "topicTags": [
      "C",
      "ビット演算"
    ],
    "difficulty": 4,
    "question": "Cプログラムによるマークシートの採点",
    "answer": "問9   設問1  ａ  カ\n         ｂ  キ\n         ｃ  エ\n     設問2  ｄ  イ\n         ｅ  イ\n     設問3  ｆ  ア\n         ｇ  イ",
    "modelAnswer": "```text\n問9   設問1  ａ  カ\n         ｂ  キ\n         ｃ  エ\n     設問2  ｄ  イ\n         ｅ  イ\n     設問3  ｆ  ア\n         ｇ  イ\n```",
    "explanation": "ビットの位置を選択肢の番号と対応させる。正解と解答の比較に加え、順不同で扱う一連の解答の範囲を確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p41.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p42.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p43.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p44.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p45.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p46.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問9 Cプログラムによるマークシートの採点（公式問題PDF 41ページ）",
      "2017年度春期 基本情報技術者 午後 問9 Cプログラムによるマークシートの採点（公式問題PDF 42ページ）",
      "2017年度春期 基本情報技術者 午後 問9 Cプログラムによるマークシートの採点（公式問題PDF 43ページ）",
      "2017年度春期 基本情報技術者 午後 問9 Cプログラムによるマークシートの採点（公式問題PDF 44ページ）",
      "2017年度春期 基本情報技術者 午後 問9 Cプログラムによるマークシートの採点（公式問題PDF 45ページ）",
      "2017年度春期 基本情報技術者 午後 問9 Cプログラムによるマークシートの採点（公式問題PDF 46ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q9-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問9の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=41",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q10",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 10,
    "type": "descriptive",
    "category": "プログラミング",
    "topicTags": [
      "COBOL",
      "集計処理"
    ],
    "difficulty": 4,
    "question": "COBOLプログラムによる売上集計",
    "answer": "問10  設問1  ａ  ウ\n         ｂ  イ\n         ｃ  エ\n         ｄ  ア\n     設問2  ｅ  エ\n         ｆ  エ\n         ｇ  ア",
    "modelAnswer": "```text\n問10  設問1  ａ  ウ\n         ｂ  イ\n         ｃ  エ\n         ｄ  ア\n     設問2  ｅ  エ\n         ｆ  エ\n         ｇ  ア\n```",
    "explanation": "並べ替えた明細の支店が変わる時点で集計を確定する。年度と月から四半期の添字を決める処理も追う。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p47.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p48.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p49.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p50.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p51.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問10 COBOLプログラムによる売上集計（公式問題PDF 47ページ）",
      "2017年度春期 基本情報技術者 午後 問10 COBOLプログラムによる売上集計（公式問題PDF 48ページ）",
      "2017年度春期 基本情報技術者 午後 問10 COBOLプログラムによる売上集計（公式問題PDF 49ページ）",
      "2017年度春期 基本情報技術者 午後 問10 COBOLプログラムによる売上集計（公式問題PDF 50ページ）",
      "2017年度春期 基本情報技術者 午後 問10 COBOLプログラムによる売上集計（公式問題PDF 51ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q10-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問10の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=47",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q11",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 11,
    "type": "descriptive",
    "category": "プログラミング",
    "topicTags": [
      "Java",
      "料金計算"
    ],
    "difficulty": 4,
    "question": "Javaプログラムによる電気料金の計算",
    "answer": "問11  設問1  ａ  ア\n         ｂ  エ\n         ｃ  ア\n         ｄ  エ\n     設問2  ｅ  ア\n         ｆ  ウ\n         ｇ  ウ",
    "modelAnswer": "```text\n問11  設問1  ａ  ア\n         ｂ  エ\n         ｃ  ア\n         ｄ  エ\n     設問2  ｅ  ア\n         ｆ  ウ\n         ｇ  ウ\n```",
    "explanation": "使用量を料金の段階ごとに分けて計算する。割引プランでは計算した料金にどの割引率を適用するかをクラスの呼出し順で確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p52.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p53.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p54.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p55.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p56.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p57.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問11 Javaプログラムによる電気料金の計算（公式問題PDF 52ページ）",
      "2017年度春期 基本情報技術者 午後 問11 Javaプログラムによる電気料金の計算（公式問題PDF 53ページ）",
      "2017年度春期 基本情報技術者 午後 問11 Javaプログラムによる電気料金の計算（公式問題PDF 54ページ）",
      "2017年度春期 基本情報技術者 午後 問11 Javaプログラムによる電気料金の計算（公式問題PDF 55ページ）",
      "2017年度春期 基本情報技術者 午後 問11 Javaプログラムによる電気料金の計算（公式問題PDF 56ページ）",
      "2017年度春期 基本情報技術者 午後 問11 Javaプログラムによる電気料金の計算（公式問題PDF 57ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q11-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問11の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=52",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q12",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 12,
    "type": "descriptive",
    "category": "プログラミング",
    "topicTags": [
      "CASL II",
      "桁上がり"
    ],
    "difficulty": 4,
    "question": "アセンブラプログラムによる多倍長整数の加算と乗算",
    "answer": "問12  設問1  ａ  オ\n         ｂ  ウ\n         ｃ  イ\n     設問2  ｄ  エ\n     設問3  ｅ  ア\n         ｆ  オ",
    "modelAnswer": "```text\n問12  設問1  ａ  オ\n         ｂ  ウ\n         ｃ  イ\n     設問2  ｄ  エ\n     設問3  ｅ  ア\n         ｆ  オ\n```",
    "explanation": "下位語の計算で発生した桁上がりを上位語へ反映する。レジスタが保持する値と、その値を格納するメモリの位置を区別する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p58.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p59.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p60.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p61.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p62.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p72.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p73.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p74.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p75.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p76.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p77.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 58ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 59ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 60ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 61ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 62ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 72ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 73ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 74ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 75ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 76ページ）",
      "2017年度春期 基本情報技術者 午後 問12 アセンブラプログラムによる多倍長整数の加算と乗算（公式問題PDF 77ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q12-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問12の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=58",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2017h-pm-q13",
    "exam": "fe",
    "year": 2017,
    "season": "spring",
    "session": "pm",
    "qNumber": 13,
    "type": "descriptive",
    "category": "表計算",
    "topicTags": [
      "表計算",
      "マクロ"
    ],
    "difficulty": 4,
    "question": "表計算による発送料金の計算",
    "answer": "問13  設問1  ａ  イ\n     設問2  ｂ  ア\n         ｃ  ウ\n         ｄ  ウ\n     設問3  ｅ  イ\n         ｆ  エ",
    "modelAnswer": "```text\n問13  設問1  ａ  イ\n     設問2  ｂ  ア\n         ｃ  ウ\n         ｄ  ウ\n     設問3  ｅ  イ\n         ｆ  エ\n```",
    "explanation": "発送先と重量区分から料金表を参照する。梱包の割当てでは、残り数量を更新する条件と処理を終える条件を追う。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/p63.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p64.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p65.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p66.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p67.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p68.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p69.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p70.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p71.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p78.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p79.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p80.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p81.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p82.webp",
      "/questions/ipa-official/fe/2017-spring-pm/p83.webp"
    ],
    "imageAltTexts": [
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 63ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 64ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 65ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 66ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 67ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 68ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 69ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 70ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 71ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 78ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 79ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 80ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 81ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 82ページ）",
      "2017年度春期 基本情報技術者 午後 問13 表計算による発送料金の計算（公式問題PDF 83ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/fe/2017-spring-pm/q13-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問13の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_qs.pdf#page=63",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_fe_pm_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2017年度春期 基本情報技術者 午後」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
