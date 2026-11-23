import type { Question } from "@/lib/questions/types";

export const FE_QUESTIONS_2018_AUTUMN_PM: Question[] = [
  {
    "id": "fe-2018a-pm-q1",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "情報セキュリティ事故と対策"
    ],
    "difficulty": 4,
    "question": "問1　情報セキュリティ事故と対策",
    "answer": "問1   設問1     ウ\n     設問2  ａ  エ\n         ｂ  ア\n         ｃ  エ\n     設問3     イ\n\n問１\n                       出題趣旨\n  情報セキュリティ事故発生時には，被害の拡大を防止するとともに，原因を速やかに特定して適切な再発防\n 止策を施す必要がある。中でも，外部からの攻撃によるセキュリティ事故の場合は，事故の原因となり得る脆\n 弱性の内容や攻撃の手口を理解しておくことは，攻撃からの防御，原因の特定及び再発防止策の実施において\n 重要である。\n  本問は，インターネットを経由した攻撃を題材に，公開しているWeb サイトで情報セキュリティ事故が発生\n した場合の，原因の特定と適切な対策の立案を主題としている。\n  本問では，Web サイトへの攻撃手法の理解及び事故を踏まえたシステム面での適切な対策を立案する能力を\n 評価する。",
    "explanation": "事故を起こした処理を確認し、SQLに入力値を渡す対策と、DBアカウントの権限を絞る対策を分けます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-06.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-07.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-08.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-09.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問1　情報セキュリティ事故と対策（公式問題PDF 6ページ）",
      "基本情報技術者 2018年度秋期 午後 問1　情報セキュリティ事故と対策（公式問題PDF 7ページ）",
      "基本情報技術者 2018年度秋期 午後 問1　情報セキュリティ事故と対策（公式問題PDF 8ページ）",
      "基本情報技術者 2018年度秋期 午後 問1　情報セキュリティ事故と対策（公式問題PDF 9ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q1-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q1-p02.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問1　情報セキュリティ事故と対策 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問1　情報セキュリティ事故と対策 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q2",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "プロセスのスケジューリング"
    ],
    "difficulty": 4,
    "question": "問2　プロセスのスケジューリング",
    "answer": "問2   設問1     オ\n     設問2  ａ  イ\n         ｂ  イ\n         ｃ  キ\n\n問２\n                       出題趣旨\n  ソフトウェアに関する技術として，OS の機能の一つである，プロセスをCPU に割り当てる順序を決定する\n 方式（プロセスのスケジューリング）を理解しておくことは重要である。\n  本問は，プロセスの状態遷移，代表的なプロセスのスケジューリングであるラウンドロビン方式及び優先度\n 順方式についての理解を主題としている。\n  本問では，入出力処理を含んだプロセスの状態遷移や，優先度順方式における優先度の推移やプロセスの実\n 行順序を理解する能力を評価する。",
    "explanation": "各時点で実行可能なプロセスを書き出し、割当て時間の満了と優先度による切替えを追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-10.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-11.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-12.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-13.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-14.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問2　プロセスのスケジューリング（公式問題PDF 10ページ）",
      "基本情報技術者 2018年度秋期 午後 問2　プロセスのスケジューリング（公式問題PDF 11ページ）",
      "基本情報技術者 2018年度秋期 午後 問2　プロセスのスケジューリング（公式問題PDF 12ページ）",
      "基本情報技術者 2018年度秋期 午後 問2　プロセスのスケジューリング（公式問題PDF 13ページ）",
      "基本情報技術者 2018年度秋期 午後 問2　プロセスのスケジューリング（公式問題PDF 14ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q2-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q2-p02.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問2　プロセスのスケジューリング 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問2　プロセスのスケジューリング 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q3",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "コンサートチケット販売サイトの関係データベースの設計及び運用"
    ],
    "difficulty": 4,
    "question": "問3　コンサートチケット販売サイトの関係データベースの設計及び運用",
    "answer": "問3   設問1     ア\n     設問2  ａ  エ\n     設問3  ｂ  ア\n     設問4     ウ\n\n問３\n                       出題趣旨\n   Web 上の販売サイトでBtoC サービスを提供する場合，サイトの構築に当たっては関係データベースを用いる\n ことが多く，関係データベースの設計，運用を理解することは重要である。\n  本問は，コンサートチケット販売サイトを題材に，関係データベースからの必要な情報の抽出と，新たなサ\n ービスの導入に伴って修正した表の利用を主題としている。\n  本問では，表の制約，表の結合を用いた情報の抽出，及び表の更新処理を問うことによって，関係データベ\n ースの設計，運用に関する能力を評価する。",
    "explanation": "SQLの抽出条件を、販売できない席の定義と照合してから集計します。予約と座席の関連も確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-15.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-16.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-17.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-18.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-19.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問3　コンサートチケット販売サイトの関係データベースの設計及び運用（公式問題PDF 15ページ）",
      "基本情報技術者 2018年度秋期 午後 問3　コンサートチケット販売サイトの関係データベースの設計及び運用（公式問題PDF 16ページ）",
      "基本情報技術者 2018年度秋期 午後 問3　コンサートチケット販売サイトの関係データベースの設計及び運用（公式問題PDF 17ページ）",
      "基本情報技術者 2018年度秋期 午後 問3　コンサートチケット販売サイトの関係データベースの設計及び運用（公式問題PDF 18ページ）",
      "基本情報技術者 2018年度秋期 午後 問3　コンサートチケット販売サイトの関係データベースの設計及び運用（公式問題PDF 19ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q3-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q3-p02.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問3　コンサートチケット販売サイトの関係データベースの設計及び運用 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問3　コンサートチケット販売サイトの関係データベースの設計及び運用 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q4",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 4,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "ネットワークの障害分析と対策"
    ],
    "difficulty": 4,
    "question": "問4　ネットワークの障害分析と対策",
    "answer": "問4       ａ  イ\n               順不同\n         ｂ  オ\n         ｃ  ウ\n         ｄ  ア\n               順不同\n         ｅ  カ\n\n問４\n                       出題趣旨\n  ネットワークの運用業務では，障害が発生したときの原因の特定や，障害発生の予防のための対策を施すこ\n とは重要である。\n  本問は，社内ネットワークの運用を題材に，障害の原因の切り分けと，障害発生の予防策の検討を主題とし\n ている。\n  本問では，障害の内容と，その後に実施した障害箇所特定のための切り分け作業の結果から，障害の原因と\n して考えられる箇所を絞り込む能力や，障害発生の予防を目的とした機器の増設において，機器構成による効\n 果の違いを検証する能力などを評価する。",
    "explanation": "確認できた疎通結果から、原因となり得る経路を絞ります。冗長化した場合は系の切替え条件を追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-20.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-21.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-22.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-23.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問4　ネットワークの障害分析と対策（公式問題PDF 20ページ）",
      "基本情報技術者 2018年度秋期 午後 問4　ネットワークの障害分析と対策（公式問題PDF 21ページ）",
      "基本情報技術者 2018年度秋期 午後 問4　ネットワークの障害分析と対策（公式問題PDF 22ページ）",
      "基本情報技術者 2018年度秋期 午後 問4　ネットワークの障害分析と対策（公式問題PDF 23ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q4-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q4-p02.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問4　ネットワークの障害分析と対策 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問4　ネットワークの障害分析と対策 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q5",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 5,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "購買管理システムで行う処理"
    ],
    "difficulty": 4,
    "question": "問5　購買管理システムで行う処理",
    "answer": "問5   設問1  ａ  ア\n     設問2  ｂ  ア\n         ｃ  オ\n     設問3  ｄ  イ\n         ｅ  ア\n\n問５\n                       出題趣旨\n  ソフトウェアの設計に際しては，処理における判定条件とそれに伴う動作を明確に示しておくことが求めら\n れる。\n  本問は，購買管理システムにおける購買ファイル更新可否チェック処理を題材に，チェック処理の設計とテ\n ストケースの設計を主題としている。\n  本問では，求められる処理の要件に基づいた流れ図を作成する能力と，出力するファイルに着目して決定表\n を作成する能力を評価する。\n\n\n                                                 2/4\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "更新可否の条件を決定表として整理し、各テスト用レコードがどの分岐を通るか確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-24.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-25.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-26.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-27.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-28.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-29.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理（公式問題PDF 24ページ）",
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理（公式問題PDF 25ページ）",
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理（公式問題PDF 26ページ）",
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理（公式問題PDF 27ページ）",
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理（公式問題PDF 28ページ）",
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理（公式問題PDF 29ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q5-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q5-p02.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問5　購買管理システムで行う処理 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q6",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 6,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "プロジェクトのスケジュール作成"
    ],
    "difficulty": 4,
    "question": "問6　プロジェクトのスケジュール作成",
    "answer": "問6   設問1  ａ  ウ\n         ｂ  エ\n         ｃ  オ\n         ｄ  エ\n     設問2  ｅ  ウ\n               順不同\n         ｆ  ク\n         ｇ  オ\n\n問６\n                       出題趣旨\n  プロジェクトを円滑に進めるためには，スケジュール作成が重要である。\n  本問は，りん議書電子化プロジェクトを題材に，アローダイアグラムを用いたスケジュールの作成を主題と\n している。\n  本問では，アローダイアグラムを用いて，作業全体及び作業間の依存関係を把握し，整合性のあるスケジュ\n ールを作成する能力を評価する。",
    "explanation": "作業の前後関係と所要時間を図に置き、開始時刻の制約が完了日へどう影響するかを追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-30.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-31.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-32.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-33.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問6　プロジェクトのスケジュール作成（公式問題PDF 30ページ）",
      "基本情報技術者 2018年度秋期 午後 問6　プロジェクトのスケジュール作成（公式問題PDF 31ページ）",
      "基本情報技術者 2018年度秋期 午後 問6　プロジェクトのスケジュール作成（公式問題PDF 32ページ）",
      "基本情報技術者 2018年度秋期 午後 問6　プロジェクトのスケジュール作成（公式問題PDF 33ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q6-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q6-p03.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問6　プロジェクトのスケジュール作成 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問6　プロジェクトのスケジュール作成 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q7",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 7,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "広告制作業務の現状把握と改善"
    ],
    "difficulty": 4,
    "question": "問7　広告制作業務の現状把握と改善",
    "answer": "問7   設問1     ア\n     設問2    イウ\n     設問3  ａ  イ\n         ｂ  エ\n\n問７\n                       出題趣旨\n  企業にとって，業務の問題点を追及し，改善を図ることは重要であり，そのために業務の現状を把握し，継\n 続的に改善していくことが求められる。\n  本問は，広告制作会社の制作部門における作業の流れを題材に，広告原稿や作成済広告などの受渡し及び保\n 管時における現状の問題点の分析，さらに電子化による改善効果の算出に関する理解を主題としている。\n  本問では，作業の流れを正確に把握し，問題点を摘出する能力や，改善効果の算出を的確に行える能力など\n を評価する。",
    "explanation": "部署間の作業や原稿の受渡しを時系列に整理し、発覚した問題とその背景にある業務上の課題を分けます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-34.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-35.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-36.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-37.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-38.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問7　広告制作業務の現状把握と改善（公式問題PDF 34ページ）",
      "基本情報技術者 2018年度秋期 午後 問7　広告制作業務の現状把握と改善（公式問題PDF 35ページ）",
      "基本情報技術者 2018年度秋期 午後 問7　広告制作業務の現状把握と改善（公式問題PDF 36ページ）",
      "基本情報技術者 2018年度秋期 午後 問7　広告制作業務の現状把握と改善（公式問題PDF 37ページ）",
      "基本情報技術者 2018年度秋期 午後 問7　広告制作業務の現状把握と改善（公式問題PDF 38ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q7-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q7-p03.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問7　広告制作業務の現状把握と改善 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問7　広告制作業務の現状把握と改善 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q8",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 8,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "整数式を評価するプログラム"
    ],
    "difficulty": 4,
    "question": "問8　整数式を評価するプログラム",
    "answer": "問8   設問1  ａ  イ\n         ｂ  エ\n     設問2  ｃ  エ\n         ｄ  ア\n     設問3  ｅ  エ\n         ｆ  イ\n         ｇ  エ\n\n問８\n                       出題趣旨\n  データ構造のうち，配列は最も基本的なものであり利用範囲が広い。\n  本問は，整数式を受け取って，その値を返すプログラムを題材に，配列を用いた基本的な文字処理及び数値\n 処理を主題としている。\n  本問では，プログラムの処理内容の理解に加えて，プログラム中の定数のより一般的な表現への拡張，四則\n 演算の基本的な理解と演算の実行順序が計算結果に及ぼす影響，符号付き整定数の扱いなどに関して，プログ\n ラムの読解力と論理的な思考力を評価する。",
    "explanation": "解析と評価の処理を分け、括弧、演算子の優先順位、符号を含む定数の扱いを順に追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-39.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-40.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-41.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-42.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-43.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-44.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム（公式問題PDF 39ページ）",
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム（公式問題PDF 40ページ）",
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム（公式問題PDF 41ページ）",
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム（公式問題PDF 42ページ）",
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム（公式問題PDF 43ページ）",
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム（公式問題PDF 44ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q8-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q8-p03.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問8　整数式を評価するプログラム 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q9",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 9,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "列車の運行をシミュレートするCプログラム"
    ],
    "difficulty": 4,
    "question": "問9　列車の運行をシミュレートするCプログラム",
    "answer": "問9   設問1  ａ  カ\n     設問2  ｂ  ウ\n         ｃ  ア\n         ｄ  オ\n     設問3  ｅ  イ\n         ｆ  ア\n\n問９\n                       出題趣旨\n  構造体は，C プログラム内で，複数のデータを関連性の観点でまとめる場合によく用いられる。\n  本問は，鉄道模型における列車の運行シミュレーションを題材に，構造体を用いた基本的な処理の理解を主\n 題としている。\n  本問では，鉄道模型の路線を構成する区間の情報及び区間内にいる列車の情報を，構造体で表現する。これ\n らの構造体を扱うプログラムを通して，鉄道模型とこれらのデータ構造を正しく結び付ける能力や，構造体を\n 操作するプログラムの作成能力を評価する。また，プログラムを実行したときの状態を問うことによって，プ\n ログラムの動作を追跡する能力を評価する。",
    "explanation": "列車が占有する区画と次に進む区画を区別して、移動条件と配列の更新順序を追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-45.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-46.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-47.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-48.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-49.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-50.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-51.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム（公式問題PDF 45ページ）",
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム（公式問題PDF 46ページ）",
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム（公式問題PDF 47ページ）",
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム（公式問題PDF 48ページ）",
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム（公式問題PDF 49ページ）",
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム（公式問題PDF 50ページ）",
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム（公式問題PDF 51ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q9-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q9-p03.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問9　列車の運行をシミュレートするCプログラム 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q10",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 10,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "COBOLプログラム"
    ],
    "difficulty": 4,
    "question": "問10　COBOLプログラム",
    "answer": "問10  設問1  ａ  ウ\n         ｂ  エ\n         ｃ  イ\n     設問2  ｄ  エ\n         ｅ  エ\n     設問3     ア\n\n問10\n                       出題趣旨\n  順ファイルに格納したトランザクションデータを，索引ファイルに格納してあるマスタデータに反映する処\n 理は，COBOL で記述された業務プログラムで多用される。\n  本問は，従業員が取得した社内資格の管理を題材に，新たに取得した資格をマスタデータに反映する処理を\n 主題としている。\n  本問では，ファイル入出力の基本操作に加えて，整列，添字付けなどの実装を問うことによって，COBOL プ\n ログラムの作成能力を評価する。また，追加した処理の内容を把握する能力を評価する。\n\n\n\n\n\n                                                 3/4\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "入力レコードを1件ずつ追い、集計対象が切り替わるときの更新と、繰返しが終わった後の出力を確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-52.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-53.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-54.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-55.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-56.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問10　COBOLプログラム（公式問題PDF 52ページ）",
      "基本情報技術者 2018年度秋期 午後 問10　COBOLプログラム（公式問題PDF 53ページ）",
      "基本情報技術者 2018年度秋期 午後 問10　COBOLプログラム（公式問題PDF 54ページ）",
      "基本情報技術者 2018年度秋期 午後 問10　COBOLプログラム（公式問題PDF 55ページ）",
      "基本情報技術者 2018年度秋期 午後 問10　COBOLプログラム（公式問題PDF 56ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q10-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q10-p03.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問10　COBOLプログラム 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問10　COBOLプログラム 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q11",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 11,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "Javaプログラム"
    ],
    "difficulty": 4,
    "question": "問11　Javaプログラム",
    "answer": "問11  設問1  ａ  ウ\n         ｂ  ウ\n         ｃ  オ\n         ｄ  ウ\n         ｅ  エ\n     設問2  ｆ  オ\n\n問11\n                       出題趣旨\n  文書の書式を表すひな形を用意しておき，これに任意の情報を埋め込むことによって，電子メールで送信す\n る文書やHTML 文書などを完成させるプログラムは，テンプレートエンジンとして広く利用されている。\n  本問は，ひな形に置換表を適用して出力文書を得るプログラムを題材に，ひな形を解析するプログラムと，\n ひな形に置換表を適用するプログラムの完成を主題としている。\n  本問では，Java プログラム作成においてのインスタンスの生成や同じインタフェースを実装した複数のクラ\n スの利用についての理解，メソッドに渡す引数を適切に選択する能力などを評価する。",
    "explanation": "データを格納するコレクションと反復処理で取り出す値を確認し、クラスやメソッドの役割を整理します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-57.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-58.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-59.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-60.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-61.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-62.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-75.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-76.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-77.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 57ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 58ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 59ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 60ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 61ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 62ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 75ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 76ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム（公式問題PDF 77ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q11-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q11-p04.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問11　Javaプログラム 公式解答例（公式PDF 4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q12",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 12,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "アセンブラプログラム"
    ],
    "difficulty": 4,
    "question": "問12　アセンブラプログラム",
    "answer": "問12  設問1  ａ  イ\n         ｂ  カ\n         ｃ  イ\n         ｄ  カ\n     設問2  ｅ  エ\n         ｆ  ウ\n\n問12\n                       出題趣旨\n  多くのOS や言語処理系では，1970 年1 月1 日を基準日として日付や時刻の計算を行っている。\n  本問は，基準日から指定された日付までの日数を求めるプログラムを完成させることを主題としている。\n  本問では，うるう年を判定する方法，日数のデータを保持するテーブルを参照する方法に関わるアセンブラ\n プログラムの作成能力，さらに，あふれを処理する能力などを評価する。",
    "explanation": "各命令の実行前後で、レジスタ、メモリ、フラグのどれが変わるかを記録し、分岐を追います。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-63.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-64.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-65.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-66.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-78.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-79.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-80.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-81.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-82.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-83.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 63ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 64ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 65ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 66ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 78ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 79ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 80ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 81ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 82ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム（公式問題PDF 83ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q12-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q12-p04.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問12　アセンブラプログラム 公式解答例（公式PDF 4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "fe-2018a-pm-q13",
    "exam": "fe",
    "year": 2018,
    "season": "autumn",
    "session": "pm",
    "qNumber": 13,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "表計算のワークシート及びマクロ"
    ],
    "difficulty": 4,
    "question": "問13　表計算のワークシート及びマクロ",
    "answer": "問13  設問1 ａ正解なし\n     設問2  ｂ  オ\n         ｃ  イ\n         ｄ  イ\n     設問3  ｅ  エ\n         ｆ  エ\n         ｇ  ウ\n\n問13\n                       出題趣旨\n  現状の分析に必要なデータを得ることや，条件を変えたときの変化をシミュレーションして業務改善に生か\n すなどの実用的な用途に，表計算ソフトが利用できる。\n  本問は，サービス窓口の待ち行列を題材に，来店状況を示すワークシート，来店状況を分析するためのワー\n クシート及び待ち時間の短縮を検討するためのマクロの作成を主題としている。\n  本問では，表計算ソフトの関数を利用して，平均値や度数分布などを適切に求める能力，条件に応じてデー\n タを加工する能力，検索によって必要なデータを求める能力などを評価する。また，処理手順の記述や配列の\n 利用に関する基礎的な知識の理解と，設定された条件を理解してマクロを作成する能力を評価する。\n\n\n\n\n\n                                                 4/4\n\n                                                                   ©2018 独立行政法人情報処理推進機構",
    "explanation": "公式解答表では設問1のaは「正解なし」です。残りの設問では、式のコピーで変わる参照と、待ち行列の状態を更新するマクロの順序を確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/page-67.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-68.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-69.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-70.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-71.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-72.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-73.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-74.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-84.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-85.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-86.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-87.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-88.webp",
      "/questions/ipa/fe/2018-autumn-pm/page-89.webp"
    ],
    "imageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 67ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 68ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 69ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 70ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 71ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 72ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 73ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 74ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 84ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 85ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 86ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 87ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 88ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ（公式問題PDF 89ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/fe/2018-autumn-pm/answer-q13-p01.webp",
      "/questions/ipa/fe/2018-autumn-pm/answer-q13-p04.webp"
    ],
    "answerImageAltTexts": [
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ 公式解答例（公式PDF 1ページ）",
      "基本情報技術者 2018年度秋期 午後 問13　表計算のワークシート及びマクロ 公式解答例（公式PDF 4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_fe_pm_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）基本情報技術者 2018年度秋期 午後",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
