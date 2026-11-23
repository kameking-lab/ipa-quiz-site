import type { Question } from "@/lib/questions/types";

export const DB_QUESTIONS_2024_AUTUMN_PM1: Question[] = [
  {
    "id": "db-2024a-pm1-q1",
    "exam": "db",
    "year": 2024,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "オンライン学習プラットフォームのデータベース設計"
    ],
    "difficulty": 4,
    "question": "問1　オンライン学習プラットフォームのデータベース設計に関する次の記述を読んで、設問に答えよ。",
    "answer": "令和６年度 秋期 データベーススペシャリスト試験 解答例\n\n午後Ⅰ試験\n\n問１\n\n                       出題趣旨\n データベースの設計では，業務内容や業務で取り扱うデータなどの実世界の情報を総合的に理解し，データ\nモデルに反映することが求められる。\n 本問では，オンライン学習プラットフォームのデータベース設計を題材として，業務要件をデータモデルに\n反映する能力，新規要件の追加によるデータモデル及び関係スキーマの適切な変更を行う能力を問う。\n\n\n  設問                解答例・解答の要点                 備考\n 設問１(1)          アカウント\n\n\n\n                      講師           受講生\n\n\n\n\n\n                      コース\n\n\n\n\n                  クーポン  セクション                コース受講\n\n\n\n                                             セクション\n                             コンテンツ                                             受講\n\n\n\n           コース                               コンテンツ\n                  講義動画   テスト    質問    コメント           購入                                受講\n\n\n\n                        テスト設問                    テスト結果\n\n\n\n                        テスト設問                 テスト結果 テスト結果\n                         選択肢                   詳細    履歴\n\n         (2)  a クーポン#，受講生アカウント#，プレゼント相手アカウント#\n\n              b 設問#，選択肢#\n\n 設問２(1)\n                コース            企業            テスト\n\n\n\n                                      研修                      法人受講生   グループ                                     カリキュラム\n\n\n\n\n\n                あ      い      う      え      お\n\n         (2)  c 研修カリキュラム#，受講順\n\n              d グループ#\n\n              e 研修カリキュラム#，受講開始可能年月日，受講完了期限年月日\n\n              f アカウント#，研修カリキュラム#\n\n              g 研修カリキュラム#，合格基準点\n\n\n\n                                                1/3\n\n                                                                        ©2024 独立行政法人情報処理推進機構設問３  (1) 質問とコメントとの間のリレーションシップを1 対1 から1 対多に変更する。\n\n\n       (2) ① ・アカウントとコメントとの間に1 対多のリレーションシップを追加す\n         る。\n      ② ・コメントに自己参照型の1 対多のリレーションシップを追加する。",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "業務上の同一性と繰返しの単位を、エンティティ、リレーションシップ、関係スキーマのキーに対応付けます。\n\n- 設問1：アカウントから講師と受講生への区分、コースからセクション・コンテンツへの構造を業務記述と照合します。複数のアカウントを参照する属性は、利用目的を区別して列挙します。\n- 設問2：法人向けの研修を追加したときに、企業、グループ、研修カリキュラムと受講生がどの単位で関連するかを追います。受講順や受講期間、合格基準点を、所属すべき関係に置くことが重要です。\n- 設問3：質問に対する複数のコメント、コメントの投稿者、返信関係という三つの変更を区別します。返信は同じコメント同士の自己参照です。\n\n解答図では線の接続先と多重度も答案の一部です。掲載した公式解答例の図と比較してください。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf)",
    "scoringCriteria": "業務上の同一性と繰返しの単位を、エンティティ、リレーションシップ、関係スキーマのキーに対応付けます。\n\n- 設問1：アカウントから講師と受講生への区分、コースからセクション・コンテンツへの構造を業務記述と照合します。複数のアカウントを参照する属性は、利用目的を区別して列挙します。\n- 設問2：法人向けの研修を追加したときに、企業、グループ、研修カリキュラムと受講生がどの単位で関連するかを追います。受講順や受講期間、合格基準点を、所属すべき関係に置くことが重要です。\n- 設問3：質問に対する複数のコメント、コメントの投稿者、返信関係という三つの変更を区別します。返信は同じコメント同士の自己参照です。\n\n解答図では線の接続先と多重度も答案の一部です。掲載した公式解答例の図と比較してください。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p03.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p04.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p05.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p07.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p08.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p09.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p10.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p11.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p12.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p13.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 3ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 4ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 5ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 7ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 8ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 9ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 10ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 11ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 12ページ）",
      "IPA公式問題 問1 オンライン学習プラットフォームのデータベース設計（PDF 13ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/db/2024-autumn-pm1/q1-answer-p01.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/q1-answer-p02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問1（PDF 1ページ）",
      "IPA公式解答例 問1（PDF 2ページ）"
    ]
  },
  {
    "id": "db-2024a-pm1-q2",
    "exam": "db",
    "year": 2024,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "労務管理システムのデータベース実装"
    ],
    "difficulty": 4,
    "question": "問2　労務管理システムのデータベース実装に関する次の記述を読んで、設問に答えよ。",
    "answer": "問２\n\n                       出題趣旨\n オンラインシステムでは，同時実行されるトランザクションの多重度や，処理時間によるトランザクション\n間の影響を考慮して，トランザクションの処理内容を注意深く設計する必要がある。\n 本問では，労務管理システムのデータベース実装を題材として，SQL の設計能力に加えて，トランザクショ\nン制御及び排他制御を理解して，適切な同時実行性を満たす設計能力を問う。\n\n\n  設問                解答例・解答の要点                 備考\n 設問１(1)  a  SUM\n\n              b 入退室区分 = 'I'\n\n              c 入退室区分 = 'O'\n\n              d  MAX(ログID)\n\n         (2)                                      時系列3 と4 は\n         時系列  テーブル名 ロックを掛けるトランザクション  ロック種別   ロック状態  順不同\n\n                        所在情報更新      共有ロック   ロック済み\n                    1   エリア状況\n                        入退室ログ登録      専有ロック  ロック解放待ち\n\n\n                        所在情報更新      共有ロック   ロック済み\n                    2    所在情報\n                        入退室ログ登録      専有ロック  ロック解放待ち\n\n\n                        所在情報更新      共有ロック   ロック済み\n                    3   エリア状況\n                        入退室ログ登録      専有ロック  ロック解放待ち\n\n\n                        所在情報更新      共有ロック   ロック済み\n                    4    所在情報\n                        入退室ログ登録      専有ロック  ロック解放待ち\n\n\n         (3) ②と③の処理順序を入れ替える。\n\n 設問２(1)  e  :HTARGETID\n              f  :HENDID\n              g  IS NULL\n              h 従業員番号\n         (2) ア “再開位置”テーブルからジョブID がHJOBID の行を削除する。\n         (3)  A の対象となる処理 ⑩\n             B の対象となる処理 ⑤，⑥，⑦，⑧，⑨\n\n\n\n\n\n                                                2/3\n\n                                                                        ©2024 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "SQLの結果だけでなく、同時実行中のロックの保持順序とコミット境界を追う問題です。\n\n- 設問1：入室と退室を区別して集計し、最新のログを特定する処理を確認します。二つのトランザクションについて、どの表の共有・専有ロックを取得済みで、何を待っているかを時系列に書き出すと、処理順序の問題が明確になります。\n- 設問2：再開位置、今回処理する範囲の終端、未処理行の条件を分けて確認します。正常終了時は再開位置の情報を残す必要がなくなります。異常時の再実行で、既に反映済みの更新を重ねたり、未反映の範囲を飛ばしたりしないよう、業務データ更新と再開位置の確定の範囲を対応付けます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf)",
    "scoringCriteria": "SQLの結果だけでなく、同時実行中のロックの保持順序とコミット境界を追う問題です。\n\n- 設問1：入室と退室を区別して集計し、最新のログを特定する処理を確認します。二つのトランザクションについて、どの表の共有・専有ロックを取得済みで、何を待っているかを時系列に書き出すと、処理順序の問題が明確になります。\n- 設問2：再開位置、今回処理する範囲の終端、未処理行の条件を分けて確認します。正常終了時は再開位置の情報を残す必要がなくなります。異常時の再実行で、既に反映済みの更新を重ねたり、未反映の範囲を飛ばしたりしないよう、業務データ更新と再開位置の確定の範囲を対応付けます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p03.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p04.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p05.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p14.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p15.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p16.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p17.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p18.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p19.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 3ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 4ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 5ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 14ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 15ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 16ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 17ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 18ページ）",
      "IPA公式問題 問2 労務管理システムのデータベース実装（PDF 19ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/db/2024-autumn-pm1/q2-answer-p02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問2（PDF 2ページ）"
    ]
  },
  {
    "id": "db-2024a-pm1-q3",
    "exam": "db",
    "year": 2024,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "プロジェクト稼働管理システムのデータベース設計"
    ],
    "difficulty": 4,
    "question": "問3　プロジェクト稼働管理システムのデータベース設計に関する次の記述を読んで、設問に答えよ。",
    "answer": "問３\n\n                       出題趣旨\n データベース設計において参照制約，索引のクラスター性などは初歩の概念である一方，他に及ぼす影響を\n正しく理解した上で実装することが求められる。\n 本問では，プロジェクト稼働管理システムのデータベース設計を題材として，制約の設定によって実装にど\nのような影響が生じるか理解する能力，クラスター性など索引や表の特性を理解し性能見積りにつなげる能力\nを問う。\n\n\n  設問                解答例・解答の要点                 備考\n 設問１(1)  a 組織長従業員コード\n              b ランク\n              c 時間単価\n              d 従業員\n              e  ALTER TABLE\n         (2) 組織長従業員コード 挿入時にNULL を設定しておくこと\n        上位組織コード  最上位組織から上位順に組織を登録すること\n         (3)   SET NULL の場合  “時間単価”テーブルの組織コードは主キーの一部であ\n                         りNULL に変更できないから\n               RESTRICT の場合  “時間単価”テーブルに同じ組織コードの行が存在する\n                場合があるから\n  設問２  ア 組織コード\n       イ COALESCE(SUM(計画時間),0)\n       ウ 従業員\n       エ 稼働計画\n 設問３(1) PJ に参加していない従業員も一部いるから\n         (2)  f  22\n         (3) 従業員は同じ日に複数PJ の稼働時間を入力できるから\n         (4)  g  24\n              h  20\n              i  480\n              j  2,000\n              k  50\n\n\n\n\n\n                                                3/3\n\n                                                                        ©2024 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "参照制約の意味、SQLの外部結合、索引のクラスター性を分けて検討します。\n\n- 設問1：参照される行を登録する順序と、NULLを許せる列かを確認します。時間単価の組織コードは主キーの一部なのでSET NULLでの変更はできず、RESTRICTでは参照する行が残っている場合に削除できません。\n- 設問2：稼働計画が存在しない従業員も残す結合と、集計結果がNULLになる場合を0に置き換える処理を確認します。\n- 設問3：同日に複数プロジェクトへ稼働時間を入力できる条件を、表の行数とアクセス数に反映します。公式解答の22、24、20、480、2,000、50は、それぞれ何を数えた値かを元の表と対応付けて確かめてください。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf)",
    "scoringCriteria": "参照制約の意味、SQLの外部結合、索引のクラスター性を分けて検討します。\n\n- 設問1：参照される行を登録する順序と、NULLを許せる列かを確認します。時間単価の組織コードは主キーの一部なのでSET NULLでの変更はできず、RESTRICTでは参照する行が残っている場合に削除できません。\n- 設問2：稼働計画が存在しない従業員も残す結合と、集計結果がNULLになる場合を0に置き換える処理を確認します。\n- 設問3：同日に複数プロジェクトへ稼働時間を入力できる条件を、表の行数とアクセス数に反映します。公式解答の22、24、20、480、2,000、50は、それぞれ何を数えた値かを元の表と対応付けて確かめてください。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p03.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p04.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p05.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p20.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p21.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p22.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p23.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p24.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p25.webp",
      "/images/ipa-written-qb7/db/2024-autumn-pm1/question-p26.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 3ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 4ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 5ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 20ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 21ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 22ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 23ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 24ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 25ページ）",
      "IPA公式問題 問3 プロジェクト稼働管理システムのデータベース設計（PDF 26ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/db/2024-autumn-pm1/q3-answer-p03.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問3（PDF 3ページ）"
    ]
  }
];
