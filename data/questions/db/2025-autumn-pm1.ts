import type { Question } from "@/lib/questions/types";

/** Full official originals and answer figures, with independently authored explanations. */
export const DB_2025_AUTUMN_PM1_QUESTIONS: Question[] = [
  {
    "id": "db-2025a-pm1-q1",
    "exam": "db",
    "year": 2025,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "概念データモデル",
      "関係スキーマ",
      "汎化",
      "講義受講管理"
    ],
    "difficulty": 5,
    "question": "問1 大学の学習管理システムの概念データモデリングに関する次の記述を読んで，設問に答えよ。",
    "answer": "| 設問 | 解答例・解答の要点 |\n| --- | --- |\n| 設問1(1) a | 教員講義補助 |\n| 設問1(2) | リレーションシップは公式解答例の原本画像を参照 |\n| 設問1(3) ア | 接続先URL，担当教員番号 |\n| イ | 開講年月日，[開講形態区分] |\n| ウ | [開講形態区分] |\n| エ | 開講場所 |\n| オ | オンライン教室ID |\n| カ | 動画視聴ファイル名，公開開始年月日時分，公開終了年月日時分 |\n| キ | 学科コード，科目ID，年度，学期，講義番号 |\n| ク | 公開開始年月日，公開終了年月日 |\n| ケ | 解答期限時刻，解答入力ページURL |\n| コ | 学科コード，科目ID，年度，学期，学籍番号，成績 |\n| サ | 受講年月日 |\n| シ | 遅刻フラグ，早退フラグ |\n| ス | 受講完了年月日 |\n| 設問2 セ | 課題観点記述 |\n| ソ | レポート提出先URL，提出開始年月日，提出終了年月日 |\n| タ | 評価年月日 |\n| チ | 得点 |\n| ツ | レポート評価 |\n\nリレーションシップと実線・破線の下線は、以下の公式解答例の原本画像で確認できる。",
    "modelAnswer": "| 設問 | 解答例・解答の要点 |\n| --- | --- |\n| 設問1(1) a | 教員講義補助 |\n| 設問1(2) | リレーションシップは公式解答例の原本画像を参照 |\n| 設問1(3) ア | 接続先URL，担当教員番号 |\n| イ | 開講年月日，[開講形態区分] |\n| ウ | [開講形態区分] |\n| エ | 開講場所 |\n| オ | オンライン教室ID |\n| カ | 動画視聴ファイル名，公開開始年月日時分，公開終了年月日時分 |\n| キ | 学科コード，科目ID，年度，学期，講義番号 |\n| ク | 公開開始年月日，公開終了年月日 |\n| ケ | 解答期限時刻，解答入力ページURL |\n| コ | 学科コード，科目ID，年度，学期，学籍番号，成績 |\n| サ | 受講年月日 |\n| シ | 遅刻フラグ，早退フラグ |\n| ス | 受講完了年月日 |\n| 設問2 セ | 課題観点記述 |\n| ソ | レポート提出先URL，提出開始年月日，提出終了年月日 |\n| タ | 評価年月日 |\n| チ | 得点 |\n| ツ | レポート評価 |\n\nリレーションシップと実線・破線の下線は、以下の公式解答例の原本画像で確認できる。",
    "explanation": "設問1は、講義そのもの、学生による履修登録、個々の講義の受講を分けてモデルを読む。時間固定講義とオンデマンド型講義では、保持する日時や受講状況が異なる。共通する情報を上位のエンティティに置き、開講場所や視聴ファイル名など方式ごとに異なる情報を対応する下位のエンティティへ配置する。担当教員と講義を補助する教員の役割も区別する。\n\n関係スキーマのキには、講義を識別するために学科・科目だけでなく年度・学期・講義番号までが必要になる。コは学生の科目履修登録なので、講義番号ではなく学籍番号と成績を対応させる。似た名称のエンティティでも、何を1件として記録するかを先に確かめると、外部キーの組合せを追いやすい。\n\n設問2では、レポート課題について、課題そのものの観点、提出を受け付ける場所と期間、評価した日、評価結果を分ける。観点の記述と、提出物ごとの得点や評価を同じ属性として扱わず、新しい業務要件がどの管理対象に追加されるかを確認する。\n\n出典：[IPAの公式問題PDF](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_qs.pdf)・[公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_ans.pdf)。",
    "hasImage": true,
    "imageUrls": [
      "/questions/db/2025-autumn-pm1/original-p03.jpeg",
      "/questions/db/2025-autumn-pm1/original-p04.jpeg",
      "/questions/db/2025-autumn-pm1/original-p05.jpeg",
      "/questions/db/2025-autumn-pm1/original-p06.jpeg",
      "/questions/db/2025-autumn-pm1/original-p07.jpeg",
      "/questions/db/2025-autumn-pm1/original-p08.jpeg",
      "/questions/db/2025-autumn-pm1/original-p09.jpeg",
      "/questions/db/2025-autumn-pm1/original-p10.jpeg",
      "/questions/db/2025-autumn-pm1/original-p11.jpeg"
    ],
    "imageAltTexts": [
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子3ページ）",
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子4ページ）",
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子5ページ）",
      "2025年度秋期 DB 午後I 問1の本文・図表・設問（冊子6ページ）",
      "2025年度秋期 DB 午後I 問1の本文・図表・設問（冊子7ページ）",
      "2025年度秋期 DB 午後I 問1の本文・図表・設問（冊子8ページ）",
      "2025年度秋期 DB 午後I 問1の本文・図表・設問（冊子9ページ）",
      "2025年度秋期 DB 午後I 問1の本文・図表・設問（冊子10ページ）",
      "2025年度秋期 DB 午後I 問1の本文・図表・設問（冊子11ページ）"
    ],
    "answerImageUrls": [
      "/questions/db/2025-autumn-pm1/q1-answer-p01.png",
      "/questions/db/2025-autumn-pm1/q1-answer-p02.png"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 DB 2025年度秋期 午後I 問1（解答例1ページ）",
      "IPA公式解答例 DB 2025年度秋期 午後I 問1（解答例2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2025年度秋期 データベーススペシャリスト試験 午後I 問題・解答例」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "db-2025a-pm1-q2",
    "exam": "db",
    "year": 2025,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "関数従属性",
      "正規化",
      "データモデル",
      "販売管理"
    ],
    "difficulty": 5,
    "question": "問2 化学メーカーの営業販売管理システムの概念データモデリングに関する次の記述を読んで，設問に答えよ。",
    "answer": "| 設問 | 解答例・解答の要点 |\n| --- | --- |\n| 設問1(1) | {案件コード，従業員コード，商談開始年月日時分} |\n| 設問1(2)(a) | 第1正規形 |\n| 設問1(2)(b) 根拠 | 全ての属性が単一値をとり，候補キーの一部である“従業員コード”に関数従属する“従業員氏名”があるから |\n| 関係スキーマ：従業員 | 従業員（従業員コード，従業員氏名） |\n| 関係スキーマ：案件担当従業員 | 案件担当従業員（案件コード，従業員コード，案件担当開始年月日，案件担当終了年月日，担当業務内容） |\n| 関係スキーマ：商談参加従業員 | 商談参加従業員（案件コード，商談開始年月日時分，従業員コード） |\n| 設問2(1) | リレーションシップは公式解答例の原本画像を参照 |\n| 設問2(2) a | 公表仕様 |\n| b | 得意先コード，製品型番 |\n| c | 案件コード，商談開始年月日時分 |\n| d | 案件コード，合計金額 |\n| 設問3(1) | リレーションシップは公式解答例の原本画像を参照 |\n| 設問3(2) 納期調整 | 納期調整（契約番号，要求番号，納期調整番号，出荷番号，納品可能年月日時分，納品可能数量，確定フラグ） |\n| 設問3(2) 出荷 | 出荷（出荷番号，出荷数量，出荷年月日時分） |\n\nリレーションシップと実線・破線の下線は、以下の公式解答例の原本画像で確認できる。",
    "modelAnswer": "| 設問 | 解答例・解答の要点 |\n| --- | --- |\n| 設問1(1) | {案件コード，従業員コード，商談開始年月日時分} |\n| 設問1(2)(a) | 第1正規形 |\n| 設問1(2)(b) 根拠 | 全ての属性が単一値をとり，候補キーの一部である“従業員コード”に関数従属する“従業員氏名”があるから |\n| 関係スキーマ：従業員 | 従業員（従業員コード，従業員氏名） |\n| 関係スキーマ：案件担当従業員 | 案件担当従業員（案件コード，従業員コード，案件担当開始年月日，案件担当終了年月日，担当業務内容） |\n| 関係スキーマ：商談参加従業員 | 商談参加従業員（案件コード，商談開始年月日時分，従業員コード） |\n| 設問2(1) | リレーションシップは公式解答例の原本画像を参照 |\n| 設問2(2) a | 公表仕様 |\n| b | 得意先コード，製品型番 |\n| c | 案件コード，商談開始年月日時分 |\n| d | 案件コード，合計金額 |\n| 設問3(1) | リレーションシップは公式解答例の原本画像を参照 |\n| 設問3(2) 納期調整 | 納期調整（契約番号，要求番号，納期調整番号，出荷番号，納品可能年月日時分，納品可能数量，確定フラグ） |\n| 設問3(2) 出荷 | 出荷（出荷番号，出荷数量，出荷年月日時分） |\n\nリレーションシップと実線・破線の下線は、以下の公式解答例の原本画像で確認できる。",
    "explanation": "設問1では、案件・従業員・商談のどの組合せで1件が識別されるかを調べる。従業員氏名は従業員コードだけで決まるため、複合キー全体に対して完全関数従属していない。各属性が単一値であることと、この部分関数従属性を分けて考えると、第1正規形とする根拠が説明できる。分解後は、従業員の情報、案件の担当情報、商談への参加情報をそれぞれの関係で保持する。\n\n設問2は、現実の業務で何と何が対応するかを、得意先・製品・案件・商談・見積り・契約の関係として整理する。商談は案件内での開始年月日時分も必要なので、cの識別情報に案件コードと商談開始年月日時分を対応させる。\n\n設問3では、得意先納品要求と出荷を直接同一の管理単位とせず、その間の納期調整を独立した管理対象として扱う。納期調整には契約・要求・調整番号に加え、対応する出荷と、納品可能日時・数量・確定状態を持たせる。図の向きや多重度、キーの実線・破線の下線は、共通の表記ルールと公式解答図を対応させて確認する。\n\n出典：[IPAの公式問題PDF](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_qs.pdf)・[公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_ans.pdf)。",
    "hasImage": true,
    "imageUrls": [
      "/questions/db/2025-autumn-pm1/original-p03.jpeg",
      "/questions/db/2025-autumn-pm1/original-p04.jpeg",
      "/questions/db/2025-autumn-pm1/original-p05.jpeg",
      "/questions/db/2025-autumn-pm1/original-p12.jpeg",
      "/questions/db/2025-autumn-pm1/original-p13.jpeg",
      "/questions/db/2025-autumn-pm1/original-p14.jpeg",
      "/questions/db/2025-autumn-pm1/original-p15.jpeg",
      "/questions/db/2025-autumn-pm1/original-p16.jpeg",
      "/questions/db/2025-autumn-pm1/original-p17.jpeg"
    ],
    "imageAltTexts": [
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子3ページ）",
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子4ページ）",
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子5ページ）",
      "2025年度秋期 DB 午後I 問2の本文・図表・設問（冊子12ページ）",
      "2025年度秋期 DB 午後I 問2の本文・図表・設問（冊子13ページ）",
      "2025年度秋期 DB 午後I 問2の本文・図表・設問（冊子14ページ）",
      "2025年度秋期 DB 午後I 問2の本文・図表・設問（冊子15ページ）",
      "2025年度秋期 DB 午後I 問2の本文・図表・設問（冊子16ページ）",
      "2025年度秋期 DB 午後I 問2の本文・図表・設問（冊子17ページ）"
    ],
    "answerImageUrls": [
      "/questions/db/2025-autumn-pm1/q2-answer-p03.png"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 DB 2025年度秋期 午後I 問2（解答例3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2025年度秋期 データベーススペシャリスト試験 午後I 問題・解答例」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "db-2025a-pm1-q3",
    "exam": "db",
    "year": 2025,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "SQL",
      "移動平均",
      "排他制御",
      "トランザクション",
      "索引"
    ],
    "difficulty": 5,
    "question": "問3 オフィスじゅう器メーカーの在庫管理システムのデータベース実装に関する次の記述を読んで，設問に答えよ。",
    "answer": "| 設問 | 解答例・解答の要点 |\n| --- | --- |\n| 設問1(1) a | SUM(出庫数量) |\n| b | SUM(入庫数量) |\n| c | 当日出庫数量 |\n| d | 当日入庫数量 |\n| e | AVG(在庫数量) |\n| f | 倉庫コード, 部品番号 |\n| g | 履歴年月日 |\n| h | 3 |\n| i | 3 |\n| 設問1(2) | 計7日間のデータがそろわない期間は対象外だから |\n| 設問2(1) j | ① |\n| k | ② |\n| 設問2(2) l | 最終更新TS列の値も取得 |\n| m | 最終更新TS列が①で取得した値と一致する |\n| n | ① |\n| 設問2(3) o | 出庫可能在庫数量を超過 |\n| 設問2(4) p | FOR UPDATE句を指定 |\n| 設問3(1) q | 出庫 |\n| r | 出庫倉庫コード |\n| s | 部品番号 |\n| t | 更新 |\n| u | ロックの解放待ち |\n| v | 処理状況 |\n| 設問3(2) | 出庫の処理が進むたびに索引キーの値が変わるから |\n\nリレーションシップと実線・破線の下線は、以下の公式解答例の原本画像で確認できる。",
    "modelAnswer": "| 設問 | 解答例・解答の要点 |\n| --- | --- |\n| 設問1(1) a | SUM(出庫数量) |\n| b | SUM(入庫数量) |\n| c | 当日出庫数量 |\n| d | 当日入庫数量 |\n| e | AVG(在庫数量) |\n| f | 倉庫コード, 部品番号 |\n| g | 履歴年月日 |\n| h | 3 |\n| i | 3 |\n| 設問1(2) | 計7日間のデータがそろわない期間は対象外だから |\n| 設問2(1) j | ① |\n| k | ② |\n| 設問2(2) l | 最終更新TS列の値も取得 |\n| m | 最終更新TS列が①で取得した値と一致する |\n| n | ① |\n| 設問2(3) o | 出庫可能在庫数量を超過 |\n| 設問2(4) p | FOR UPDATE句を指定 |\n| 設問3(1) q | 出庫 |\n| r | 出庫倉庫コード |\n| s | 部品番号 |\n| t | 更新 |\n| u | ロックの解放待ち |\n| v | 処理状況 |\n| 設問3(2) | 出庫の処理が進むたびに索引キーの値が変わるから |\n\nリレーションシップと実線・破線の下線は、以下の公式解答例の原本画像で確認できる。",
    "explanation": "設問1のSQLは、倉庫コードと部品番号ごとに入出庫数量を集計し、履歴年月日で並べた在庫数量から中央移動平均を求める。中央移動平均は当日と前後3日ずつの計7日分を使うので、hとiはいずれも3となる。データの端で必要な7日分がそろわない期間は、同じ条件で平均を求められないため除く。\n\n設問2では、在庫を読んでから更新するまでの間に、別のトランザクションが同じ在庫を変更する場合を考える。最終更新TSを読取時にも取得し、更新条件としてその値の一致を確かめれば、読取後の変更を検出できる。再試行する箇所、出庫可能数量の超過を判定する箇所、FOR UPDATEでロックする箇所を、SQL番号と処理順に沿って対応させる。\n\n設問3は、同じ倉庫・同じ部品に対する複数処理のロック取得順を追う。更新しようとする行について他の処理がロックを保持していれば、解放待ちが生じる。処理状況を索引キーに含めると、出庫処理が進んで値が変わるたびに索引の更新も必要になるため、検索だけでなく更新の負担も検討する。\n\n出典：[IPAの公式問題PDF](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_qs.pdf)・[公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_ans.pdf)。",
    "hasImage": true,
    "imageUrls": [
      "/questions/db/2025-autumn-pm1/original-p03.jpeg",
      "/questions/db/2025-autumn-pm1/original-p04.jpeg",
      "/questions/db/2025-autumn-pm1/original-p05.jpeg",
      "/questions/db/2025-autumn-pm1/original-p18.jpeg",
      "/questions/db/2025-autumn-pm1/original-p19.jpeg",
      "/questions/db/2025-autumn-pm1/original-p20.jpeg",
      "/questions/db/2025-autumn-pm1/original-p21.jpeg",
      "/questions/db/2025-autumn-pm1/original-p22.jpeg",
      "/questions/db/2025-autumn-pm1/original-p23.jpeg",
      "/questions/db/2025-autumn-pm1/original-p24.jpeg"
    ],
    "imageAltTexts": [
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子3ページ）",
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子4ページ）",
      "2025年度秋期 DB 午後I 共通の表記ルール（冊子5ページ）",
      "2025年度秋期 DB 午後I 問3の本文・図表・設問（冊子18ページ）",
      "2025年度秋期 DB 午後I 問3の本文・図表・設問（冊子19ページ）",
      "2025年度秋期 DB 午後I 問3の本文・図表・設問（冊子20ページ）",
      "2025年度秋期 DB 午後I 問3の本文・図表・設問（冊子21ページ）",
      "2025年度秋期 DB 午後I 問3の本文・図表・設問（冊子22ページ）",
      "2025年度秋期 DB 午後I 問3の本文・図表・設問（冊子23ページ）",
      "2025年度秋期 DB 午後I 問3の本文・図表・設問（冊子24ページ）"
    ],
    "answerImageUrls": [
      "/questions/db/2025-autumn-pm1/q3-answer-p04.png"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 DB 2025年度秋期 午後I 問3（解答例4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2025年度秋期 データベーススペシャリスト試験 午後I 問題・解答例」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
