import type { Question } from "@/lib/questions/types";

export const SM_QUESTIONS_2018_AUTUMN_PM1: Question[] = [
  {
    "id": "sm-2018a-pm1-q1",
    "exam": "sm",
    "year": 2018,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "ITサービスの継続性"
    ],
    "difficulty": 4,
    "question": "問1　ITサービスの継続性",
    "answer": "問１\n                       出題趣旨\n  業務のIT への依存度が高くなる中，IT サービスマネージャには，自然災害などの発生時においてIT サービ\nスを速やかに回復し，IT サービスを提供する能力が求められている。\n 本問では，既存のIT インフラを活用した災害対策及び復旧訓練の実施を題材に，IT サービス継続マネジメ\nントの能力，サービス継続計画の訓練を通した課題発見能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) 本社サーバ室が被災するとバックアップを含むデータを喪失する。\n         (2) バックアップの磁気テープのコピーを関西地区のサーバ室にも保管する。\n         (3) 開始時刻   17:00\n       終了時刻  （翌日）0:00 又は  24:00\n 設問２(1) オンライン処理で入力した障害発生時点までの会計伝票の再入力が不要にな\n      る。\n         (2) DB 更新ログを支社の生産管理サーバのストレージにも取得する。\n 設問３(1) 複数の担当者の連絡先を登録するように変更する。\n         (2) 最新の連絡表の情報を支社ファイルサーバにも保存し，被災時でも参照可能に\n      する。",
    "explanation": "復旧時に使える設備と連絡手段を分け、訓練で判明した不足をサービス継続計画に反映します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sm/2018-autumn-pm1/page-03.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-04.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-05.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-06.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-07.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-08.webp"
    ],
    "imageAltTexts": [
      "ITサービスマネージャ 2018年度秋期 午後I 問1　ITサービスの継続性（公式問題PDF 3ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問1　ITサービスの継続性（公式問題PDF 4ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問1　ITサービスの継続性（公式問題PDF 5ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問1　ITサービスの継続性（公式問題PDF 6ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問1　ITサービスの継続性（公式問題PDF 7ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問1　ITサービスの継続性（公式問題PDF 8ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/sm/2018-autumn-pm1/answer-q1-p01.webp"
    ],
    "answerImageAltTexts": [
      "ITサービスマネージャ 2018年度秋期 午後I 問1　ITサービスの継続性 公式解答例（公式PDF 1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sm_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sm_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）ITサービスマネージャ 2018年度秋期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "sm-2018a-pm1-q2",
    "exam": "sm",
    "year": 2018,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "リリース及び展開管理"
    ],
    "difficulty": 4,
    "question": "問2　リリース及び展開管理",
    "answer": "問２\n                       出題趣旨\n 事業環境の迅速な変化に合わせて，ビルドやテストを反復的に行うシステム開発が増えている。これに伴っ\nて，リリース及び展開管理プロセスをシステム開発の変化に適合させていくことが，重要になってくる。\n 本問では，アプリケーションソフトウェアのリリースを題材に，リリース及び展開管理プロセスを実践する\n IT サービスマネージャを想定して，サービス利用者，システム開発者からの要求に対応する改善能力，適応保\n守や是正保守に対するシステム環境管理能力，リリース及び展開計画に関する能力などを問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１  稼働環境にデプロイするときにサービスを停止しなくて済む場合がある。\n 設問２(1) ・プログラムの不具合によって再度誤りが発生してしまうから\n        ・AP 展開ツールによってLB の閉塞解除が行われるから\n         (2) 欧州支社のサービス利用者が利用中の時間帯であり，業務に影響があるから\n 設問３(1) 売上プログラムと共通プログラムをテスト用サーバの開発環境にデプロイす\n      る。\n         (2) 共通プログラムの不具合修正内容を反映すること\n         (3) 不具合を修正することによって，想定外の影響が出ていないかどうかを確認す\n      る。\n\n\n\n\n\n                                                1/2\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "変更した業務ルールを展開する前に、影響する担当とテストする項目を、障害時の手順に対応付けます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sm/2018-autumn-pm1/page-09.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-10.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-11.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-12.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-13.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-14.webp"
    ],
    "imageAltTexts": [
      "ITサービスマネージャ 2018年度秋期 午後I 問2　リリース及び展開管理（公式問題PDF 9ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問2　リリース及び展開管理（公式問題PDF 10ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問2　リリース及び展開管理（公式問題PDF 11ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問2　リリース及び展開管理（公式問題PDF 12ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問2　リリース及び展開管理（公式問題PDF 13ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問2　リリース及び展開管理（公式問題PDF 14ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/sm/2018-autumn-pm1/answer-q2-p01.webp"
    ],
    "answerImageAltTexts": [
      "ITサービスマネージャ 2018年度秋期 午後I 問2　リリース及び展開管理 公式解答例（公式PDF 1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sm_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sm_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）ITサービスマネージャ 2018年度秋期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "sm-2018a-pm1-q3",
    "exam": "sm",
    "year": 2018,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "サービスデスク"
    ],
    "difficulty": 4,
    "question": "問3　サービスデスク",
    "answer": "問３\n                       出題趣旨\n サービスデスクでは，インシデント管理手順を着実に実施し，サービス目標の達成を図る。\n 本問では，インシデント管理手順における優先度の扱い，再発インシデントに備えた対応，サービスデスク\nにおける標準変更の対応などを題材に，IT サービスマネージャとして，インシデント管理手順を遂行する能\n力，プロセスを改善する能力などを問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) 技術課に対してインシデント対応を優先してもらうための依頼\n         (2) 作業計画策定のときに想定されるインシデント対応の作業時間を確保している\n      こと\n 設問２(1) サービスを変更した際に想定されるインシデントの解決手順\n         (2) 技術課が行うインシデント対応の作業負荷が低減するから\n 設問３(1) サービスデスクで実施できるように標準変更の手順を整備する。\n         (2) ・変更要求の依頼から実施までの期間が短くなる。\n      ・変更要求の依頼から実施までの期間が1 営業日以内となる。\n\n\n\n\n\n                                                2/2\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "エスカレーションの条件と担当を整理し、変更要求の優先度の判断と技術課への引継ぎを区別します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sm/2018-autumn-pm1/page-15.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-16.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-17.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-18.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-19.webp",
      "/questions/ipa/sm/2018-autumn-pm1/page-20.webp"
    ],
    "imageAltTexts": [
      "ITサービスマネージャ 2018年度秋期 午後I 問3　サービスデスク（公式問題PDF 15ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問3　サービスデスク（公式問題PDF 16ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問3　サービスデスク（公式問題PDF 17ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問3　サービスデスク（公式問題PDF 18ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問3　サービスデスク（公式問題PDF 19ページ）",
      "ITサービスマネージャ 2018年度秋期 午後I 問3　サービスデスク（公式問題PDF 20ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/sm/2018-autumn-pm1/answer-q3-p02.webp"
    ],
    "answerImageAltTexts": [
      "ITサービスマネージャ 2018年度秋期 午後I 問3　サービスデスク 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sm_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sm_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）ITサービスマネージャ 2018年度秋期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
