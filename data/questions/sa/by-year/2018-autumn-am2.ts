// IPA公式冊子から転記。原典・照合記録: ../2018-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const SA_QUESTIONS_2018_AUTUMN_AM2: Question[] = [
  {
    "id": "sa-2018a-am2-q1",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "CRUDマトリクス",
    "topicTags": [
      "CRUDマトリクス"
    ],
    "difficulty": 3,
    "question": "CRUDマトリクスの説明はどれか。",
    "choices": {
      "ア": "ある問題に対して起こり得る全ての条件と，それに対する動作の関係を表形式で表現したものである。",
      "イ": "各機能が，どのエンティティに対して，どのような操作をするかを一覧化したものであり，操作の種類には生成，参照，更新及び削除がある。",
      "ウ": "システムやソフトウェアを構成する機能（又はプロセス）と入出力データとの関係を記述したものであり，データの流れを明確にすることができる。",
      "エ": "データをエンティティ，関連及び属性の三つの構成要素でモデル化したものであり，業務で扱うエンティティの相互関係を示すことができる。"
    },
    "answer": "イ",
    "explanation": "正解はイ。CRUDは生成・参照・更新・削除の四つの操作を表す。機能とエンティティを行と列に配置し，どの機能がどのデータを扱うかを確認することで，処理やデータ操作の漏れを見つけやすくする。",
    "choiceExplanations": {
      "ア": "条件の組合せと実行する動作を対応させる説明は決定表であり，機能とデータ操作の対応表ではない。",
      "イ": "機能ごとに各エンティティへの生成・参照・更新・削除を一覧にする説明が，CRUDマトリクスに一致する。",
      "ウ": "処理と入出力データの流れを記述する説明はDFDであり，データ操作の種類を対応させる表とは異なる。",
      "エ": "エンティティ，関連，属性でデータの構造を示す説明はE-Rモデルであり，CRUDの操作一覧ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q2",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "共通フレーム",
    "topicTags": [
      "共通フレーム"
    ],
    "difficulty": 3,
    "question": "共通フレーム2013によれば，システム要件の分析を供給者に委託した場合，要件の分析結果を承認する権限をもつのは誰か。",
    "choices": {
      "ア": "運用者",
      "イ": "開発者",
      "ウ": "企画者",
      "エ": "取得者"
    },
    "answer": "エ",
    "explanation": "正解はエ。要件の分析作業を供給者へ委託しても，取得するシステムの要件を承認する権限は取得者がもつ。作業を担当することと，分析結果を承認することを分けて考える。",
    "choiceExplanations": {
      "ア": "運用者は稼働後のシステム運用を担う立場であり，委託した要件分析の承認権限をもつ役割ではない。",
      "イ": "開発者が分析の作業を担当していても，委託した分析結果を承認する権限まで移るわけではない。",
      "ウ": "企画者はシステム化の構想などに関わるが，設問の委託と承認の関係では取得者が承認権限をもつ。",
      "エ": "分析を供給者に任せても，取得する側が要件分析結果を承認するという役割の区分が正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.ipa.go.jp/archive/files/000029060.pdf"
    ]
  },
  {
    "id": "sa-2018a-am2-q3",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "CMMI",
    "topicTags": [
      "CMMI"
    ],
    "difficulty": 3,
    "question": "開発のためのCMMI 1.3版のプロセス領域のうち，運用の考え方及び関連するシナリオを確立し保守するプラクティスを含むものはどれか。",
    "choices": {
      "ア": "技術解",
      "イ": "検証",
      "ウ": "成果物統合",
      "エ": "要件開発"
    },
    "answer": "エ",
    "explanation": "正解はエ。要件開発では，利用される状況や運用シナリオを具体化して，必要な振る舞いや条件を明らかにする。CMMI 1.3版の要件開発には，運用の考え方とシナリオを確立し維持するプラクティスが含まれる。",
    "choiceExplanations": {
      "ア": "技術解は要件を満たす解決策の選択や設計・実装を扱い，設問の運用シナリオを定めるプラクティスの所属先ではない。",
      "イ": "検証は成果物が指定した要件を満たすことの確認を扱い，必要な運用シナリオを明らかにする要件開発とは異なる。",
      "ウ": "成果物統合は構成要素を組み合わせて成果物にする活動を扱い，運用の考え方を定める領域とは異なる。",
      "エ": "利用状況を運用の考え方やシナリオに整理し，要求を具体化・分析する要件開発に該当する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.ipa.go.jp/archive/publish/qv6pgp0000000wrt-att/000079352.pdf"
    ]
  },
  {
    "id": "sa-2018a-am2-q4",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "アシュアランスケース",
    "topicTags": [
      "アシュアランスケース"
    ],
    "difficulty": 3,
    "question": "システムやソフトウェアの品質に関する主張の正当性を裏付ける文書である“アシュアランスケース”を導入する目的として，適切なものはどれか。",
    "choices": {
      "ア": "システムやソフトウェアの振る舞いをガイドワードを用いて分析して，システムやソフトウェアが意図する振る舞いから逸脱するケースを明らかにする。",
      "イ": "システムを階層構造の構成要素に分解し，下位レベルの要素から上位レベルの要素へボトムアップで解析して，システムに対する最終的な影響を明らかにする。",
      "ウ": "障害を発生させる要因を演えき的（トップダウン）に解析して，原因又は原因の組合せを正確に示す。",
      "エ": "証拠を示して論理的に説明することによって，システムやソフトウェアが目標の品質を達成できることを示す。"
    },
    "answer": "エ",
    "explanation": "正解はエ。アシュアランスケースは，品質に関する主張を根拠となる証拠と論理によって支える。故障原因を列挙するだけでなく，なぜ目標の品質を満たすといえるかを説明するために使う。",
    "choiceExplanations": {
      "ア": "ガイドワードによって意図からの逸脱を探す説明はHAZOPの考え方であり，主張を証拠で裏付ける目的とは異なる。",
      "イ": "下位要素の故障が上位へ与える影響を追う説明はFMEAの考え方であり，品質の主張を論証する文書とは異なる。",
      "ウ": "望ましくない事象の原因をトップダウンで分析する説明はFTAに当たり，アシュアランスケースの目的ではない。",
      "エ": "品質に関する主張と証拠を論理で結び付け，目標を達成できると説明することが目的に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.ipa.go.jp/archive/files/000049842.pdf"
    ]
  },
  {
    "id": "sa-2018a-am2-q5",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "ソフトウェア要件定義",
    "topicTags": [
      "ソフトウェア要件定義"
    ],
    "difficulty": 3,
    "question": "ソフトウェア要件定義プロセスで定義する内容の具体例として，適切なものはどれか。",
    "choices": {
      "ア": "基幹システムから利用者の所属情報を取得するために，全てのサブシステムで共通の通信プロトコルを使用する。",
      "イ": "データエントリ画面における応答時間は，3秒以内とする。",
      "ウ": "窓口業務は，ソフトウェアで実現することと人手で実施する作業を組み合わせて運用する。",
      "エ": "利用者の利便性を考えて，受付端末は店舗の入り口から5メートル以内に設置する。"
    },
    "answer": "ア",
    "explanation": "正解はア。ソフトウェア要件では，ソフトウェアが外部とどのように情報をやり取りするかも具体化する。所属情報を取得する際に使う通信プロトコルは，そのインタフェースに関する要求となる。",
    "choiceExplanations": {
      "ア": "外部の基幹システムと所属情報をやり取りするプロトコルの指定は，ソフトウェアのインタフェース要件に当たる。",
      "イ": "画面の応答時間は，通信や機器も含むシステム全体の性能要件として整理し，ソフトウェア間の通信方式とは区別する。",
      "ウ": "ソフトウェアで行う業務と人手で行う業務の分担は，業務・システム全体の実現方法に関わる内容である。",
      "エ": "受付端末の物理的な設置場所は利用環境や設備の要求であり，ソフトウェア自体の要件とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q6",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "ソフトウェア品質",
    "topicTags": [
      "ソフトウェア品質"
    ],
    "difficulty": 3,
    "question": "JIS X 25010:2013（システム及びソフトウェア製品の品質要求及び評価（SQuaRE）―システム及びソフトウェア品質モデル）で定義されたシステム及び／又はソフトウェア製品の品質特性に関する説明のうち，適切なものはどれか。",
    "choices": {
      "ア": "機能適合性とは，明示された状況で使用するとき，明示的ニーズ及び暗黙のニーズを満足させる機能を，製品又はシステムが提供する度合いのことである。",
      "イ": "信頼性とは，明示された状態（条件）で使用する資源の量に関係する性能の度合いのことである。",
      "ウ": "性能効率性とは，明示された利用状況において，有効性，効率性及び満足性をもって明示された目標を達成するために，明示された利用者が製品又はシステムを利用することができる度合いのことである。",
      "エ": "保守性とは，明示された時間帯で，明示された条件下に，システム，製品又は構成要素が明示された機能を実行する度合いのことである。"
    },
    "answer": "ア",
    "explanation": "正解はア。設問が指定する品質モデルでは，必要な機能を提供して明示的・暗黙のニーズを満たす度合いが機能適合性である。資源に対する性能，利用のしやすさ，機能を実行し続ける性質を区別する。",
    "choiceExplanations": {
      "ア": "利用する状況の下でニーズを満たす機能を提供する度合いという説明は，機能適合性に一致する。",
      "イ": "使用する資源の量に対する性能を述べているため，信頼性ではなく性能効率性の説明である。",
      "ウ": "利用者が有効性・効率性・満足性をもって目標を達成できるかという説明は，この品質モデルの使用性に当たる。",
      "エ": "指定された時間と条件の下で機能を実行する度合いは信頼性の説明であり，変更や修正のしやすさを扱う保守性ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q7",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "分析・設計技法",
    "topicTags": [
      "分析・設計技法"
    ],
    "difficulty": 3,
    "question": "ソフトウェアの要件定義や分析・設計で用いられる技法に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "決定表は，条件と処理を組み合わせた表の形式で論理を表現したものであり，条件や処理の組合せが複雑な要件定義の記述手段として有効である。",
      "イ": "構造化チャートは，システムの“状態”の種別とその状態が遷移する“要因”との関係を分かりやすく表現する手段として有効である。",
      "ウ": "状態遷移図は，DFDに“コントロール変換とコントロールフロー”を付加したものであり，制御系システムに特有な処理を表現する手段として有効である。",
      "エ": "制御フロー図は，データの“源泉，吸収，流れ，処理，格納”を基本要素としており，システム内のデータの流れを表現する手段である。"
    },
    "answer": "ア",
    "explanation": "正解はア。決定表は，条件が成立する組合せごとに行う処理を表にまとめる。複数の条件が重なる要件を整理し，条件の抜けや処理の矛盾を点検するために役立つ。",
    "choiceExplanations": {
      "ア": "条件と処理の組合せを表にして論理を整理するという説明が，決定表の使い方に一致する。",
      "イ": "状態の種類と遷移の要因との関係を表すのは状態遷移図であり，モジュールの構造を示す構造化チャートではない。",
      "ウ": "DFDに制御の変換や流れを加える説明であり，状態と遷移を表す状態遷移図そのものの説明ではない。",
      "エ": "源泉・吸収・処理・格納などによってデータの流れを表すのはDFDであり，制御フロー図の説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q8",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "ソフトウェア構築",
    "topicTags": [
      "ソフトウェア構築"
    ],
    "difficulty": 3,
    "question": "ソフトウェアを実装する一連のプロセスのアクティビティで実施するタスクの内容のうち，ソフトウェア構築プロセスのものはどれか。",
    "choices": {
      "ア": "ソフトウェアコンポーネントをコーディングできるレベルのソフトウェアユニットまで詳細化し，全てのソフトウェア要求事項をソフトウェアユニットに割り当てる。",
      "イ": "ソフトウェア品目の外部インタフェース，及びソフトウェアコンポーネント間のインタフェースの詳細な仕様を設計する。",
      "ウ": "ソフトウェアユニット及びデータベースを作成し，これらをテストするための手順とデータを作成する。",
      "エ": "ソフトウェアユニットとソフトウェアコンポーネントを結合し，集合体が作成されるごとにテストする。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ソフトウェア構築は，設計を基にソフトウェアユニットやデータベースを作成し，ユニットをテストするための手順・データなどを用意する段階である。詳細設計や結合の段階と区別する。",
    "choiceExplanations": {
      "ア": "コーディングできる単位へ詳細化して要求を割り当てる内容は，構築前のソフトウェア詳細設計に当たる。",
      "イ": "インタフェースの詳細仕様を定める内容もソフトウェア詳細設計であり，ユニットを実際に作る構築とは異なる。",
      "ウ": "ユニットとデータベースの作成，そのテスト手順とデータの作成が，ソフトウェア構築のタスクに当たる。",
      "エ": "ユニットやコンポーネントを組み合わせてテストするのはソフトウェア結合であり，構築の段階ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q9",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "ブラックボックステスト",
    "topicTags": [
      "ブラックボックステスト"
    ],
    "difficulty": 3,
    "question": "ブラックボックステストにおけるテストケースの設計に関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "実データからテストデータを無作為に抽出して，テストケースを設計する。",
      "イ": "実データのうち使用頻度が高いものを重点的に抽出して，テストケースを設計する。",
      "ウ": "プログラムがどのような機能を果たすのかを仕様書で調べて，テストケースを設計する。",
      "エ": "プログラムの全ての命令が少なくとも1回は実行されるように，テストケースを設計する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ブラックボックステストでは，内部の命令構造ではなく仕様で求める入出力や機能に基づいてケースを作る。正常時だけでなく，境界値や不正な入力なども仕様に照らして選ぶ。",
    "choiceExplanations": {
      "ア": "無作為の抽出だけでは，仕様で要求された機能や境界条件を適切に網羅するケースになるとは限らない。",
      "イ": "使用頻度の高いデータだけに偏ると，境界値や異常系など仕様上必要な確認が抜ける可能性がある。",
      "ウ": "内部の実装を前提とせず，仕様書で定めた機能を基準にテストケースを設計する点が正しい。",
      "エ": "全ての命令を実行するという基準は命令網羅であり，内部構造に着目するホワイトボックステストの観点である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q10",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "品質コスト",
    "topicTags": [
      "品質コスト"
    ],
    "difficulty": 3,
    "question": "製品を出荷前に全数検査することによって，出荷後の故障品数を減少させ，全体の費用を低減したい。次の条件で全数検査を行ったときに低減できる費用は何万円か。ここで，検査時に故障が発見された製品は修理して出荷するものとする。\n\n〔条件〕\n(1) 製造する個数：500個\n(2) 全数検査を実施しなかった場合の，出荷個数に対する故障品の発生率：3%\n(3) 全数検査における，製造個数に対する故障品の発見率：2%\n(4) 全数検査を実施した場合の，出荷個数に対する故障品の発生率：1%\n(5) 検査費用：1万円／個\n(6) 出荷前の故障品の修理費用：50万円／個\n(7) 出荷後の故障品の修理費用：200万円／個",
    "choices": {
      "ア": "1,000",
      "イ": "1,500",
      "ウ": "2,000",
      "エ": "2,250"
    },
    "answer": "ア",
    "explanation": "正解はア。検査なしの費用は500×0.03×200＝3,000万円。検査ありでは検査費500万円，出荷前の修理費500×0.02×50＝500万円，出荷後の修理費500×0.01×200＝1,000万円で合計2,000万円。差額1,000万円を低減できる。",
    "choiceExplanations": {
      "ア": "検査なし3,000万円から，検査・出荷前修理・出荷後修理の合計2,000万円を引くと1,000万円となる。",
      "イ": "1,500万円は検査後の出荷前・出荷後修理費の合計であり，検査費を含めた低減額ではない。",
      "ウ": "2,000万円は全数検査を行った場合の費用の合計であり，検査しない場合との差額ではない。",
      "エ": "検査費500万円と出荷前修理500万円，出荷後修理1,000万円を全て算入すると，低減額は2,250万円にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2018a-am2-q11",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "流れ図",
    "topicTags": [
      "流れ図"
    ],
    "difficulty": 3,
    "question": "次の流れ図において，\n① → ② → ③ → ⑤ → ② → ③ → ④ → ② → ⑥\nの順に実行させるために，①においてmとnに与えるべき初期値aとbの関係はどれか。ここで，a，bはともに正の整数とする。",
    "choices": {
      "ア": "a＝2b",
      "イ": "2a＝b",
      "ウ": "2a＝3b",
      "エ": "3a＝2b"
    },
    "answer": "エ",
    "explanation": "正解はエ。最初に⑤を通るのでa＜b，⑤の後はm＝a，n＝b−aである。次に④を通るとm＝a−(b−a)＝2a−bとなり，n＝b−aとの比較で等しくなる。2a−b＝b−aより3a＝2bを得る。例えばa＝2，b＝3なら，(2,3)→(2,1)→(1,1)となる。",
    "choiceExplanations": {
      "ア": "a＝2bでは最初からm＞nとなり，最初に⑤へ進むという指定された順序に一致しない。",
      "イ": "2a＝bでは⑤の後にm＝a，n＝aとなって終了するため，その後に④を通らない。",
      "ウ": "2a＝3bではa＞bとなるため，最初の比較で④へ進み，指定された⑤からの順序にならない。",
      "エ": "3a＝2bならa＜bかつa＞b−aとなり，⑤，④を一度ずつ実行した後にm＝nとなる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/sa/2018-autumn-am2-q11.png"
    ],
    "imageAltTexts": [
      "①でaをm，bをnに代入。②でmとnが等しければ⑥でmを印字して終了。異なれば③で大小を比較し，mが大きいと④でm−nをmへ，mが小さいと⑤でn−mをnへ代入して②へ戻る流れ図。"
    ]
  },
  {
    "id": "sa-2018a-am2-q12",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "適格性確認テスト",
    "topicTags": [
      "適格性確認テスト"
    ],
    "difficulty": 3,
    "question": "共通フレーム2013において，システム適格性確認テストで適合を評価する対象となるのは，どのアクティビティで定義又は設計した内容か。",
    "choices": {
      "ア": "システム方式設計",
      "イ": "システム要件定義",
      "ウ": "ソフトウェア方式設計",
      "エ": "ソフトウェア要件定義"
    },
    "answer": "イ",
    "explanation": "正解はイ。システム適格性確認テストでは，完成したシステムが定義したシステム要件を満たすかを評価する。設計どおりに組み合わせたか，ソフトウェアだけの要件を満たすかという評価とは対象が異なる。",
    "choiceExplanations": {
      "ア": "方式設計はシステムの構成や実現方法を定める内容であり，適格性確認の基準となるシステム要件そのものではない。",
      "イ": "システムとして満たすべき機能や性能などの要件に照らして適合を評価するため，システム要件定義が正しい。",
      "ウ": "ソフトウェア方式設計はソフトウェアの構造を定める内容であり，システム全体の適格性確認の基準とは異なる。",
      "エ": "ソフトウェア要件への適合を確認するのはソフトウェア適格性確認テストであり，設問のシステム全体とは区別する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q13",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "スクラム",
    "topicTags": [
      "スクラム"
    ],
    "difficulty": 3,
    "question": "スクラムを適用したアジャイル開発において，スクラムチームで何がうまくいき，何がうまくいかなかったのかを議論し，継続的なプロセス改善を促進するアクティビティはどれか。",
    "choices": {
      "ア": "スプリントプランニング",
      "イ": "スプリントレトロスペクティブ",
      "ウ": "スプリントレビュー",
      "エ": "デイリースクラム"
    },
    "answer": "イ",
    "explanation": "正解はイ。スプリントレトロスペクティブでは，チームの進め方や協働を振り返り，次のスプリントで取り組む改善を考える。成果物へのフィードバックを得るスプリントレビューとは目的が異なる。",
    "choiceExplanations": {
      "ア": "スプリントプランニングは次のスプリントの目標と取り組む内容・進め方を計画する場であり，振り返りそのものではない。",
      "イ": "うまくいったことや問題点をチームで振り返り，継続的な改善へつなげるイベントに該当する。",
      "ウ": "スプリントレビューは成果や状況をステークホルダーと検査し，今後の適応を考える場であり，チーム内の進め方の振り返りとは異なる。",
      "エ": "デイリースクラムはスプリントゴールへの進捗を検査し日々の計画を調整する場であり，スプリント全体の振り返りではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Japanese.pdf"
    ]
  },
  {
    "id": "sa-2018a-am2-q14",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "要件定義",
    "topicTags": [
      "要件定義"
    ],
    "difficulty": 3,
    "question": "共通フレーム2013によれば，要件定義プロセスの活動内容には，利害関係者の識別，要件の識別，要件の評価，要件の合意などがある。このうち要件の識別において実施する作業はどれか。",
    "choices": {
      "ア": "システムのライフサイクルの全期間を通して，どの工程でどの関係者が参画するのかを明確にする。",
      "イ": "抽出された要件を確認して，矛盾点や曖昧な点をなくし，一貫性がある要件の集合として整理する。",
      "ウ": "矛盾した要件，実現不可能な要件などの問題点に対する解決方法を利害関係者に説明し，合意を得る。",
      "エ": "利害関係者から要件を漏れなく引き出し，制約条件や運用シナリオなどを明らかにする。"
    },
    "answer": "エ",
    "explanation": "正解はエ。要件の識別では，利害関係者が必要とすることを引き出し，制約や利用時の活動の順序などを明らかにする。抽出した要件を評価したり，問題の解決方法について合意したりする活動と区別する。",
    "choiceExplanations": {
      "ア": "どの関係者がどの工程に関わるかを明確にするのは，利害関係者の識別の活動に対応する。",
      "イ": "抽出後の要件の矛盾や曖昧さ，一貫性を点検するのは要件の評価に対応し，抽出を行う識別とは異なる。",
      "ウ": "要件の問題を解決して利害関係者の了承を得る内容は，要件の合意の活動に対応する。",
      "エ": "要求を引き出し，制約条件や代表的な運用の流れを明らかにするという，要件の識別の内容に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.ipa.go.jp/archive/files/000029060.pdf"
    ]
  },
  {
    "id": "sa-2018a-am2-q15",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "政府調達協定",
    "topicTags": [
      "政府調達協定"
    ],
    "difficulty": 3,
    "question": "WTO政府調達協定の説明はどれか。",
    "choices": {
      "ア": "EU市場で扱われる電気・電子製品，医療機器などについて，一定基準値を超える特定有害物質（鉛，カドミウム，六価クロム，水銀など6物質）の使用を規制することを定めたものである。",
      "イ": "国などの公的機関が率先して，環境物品等（環境負荷低減に資する製品やサービス）の調達を推進し，環境物品等への需要の転換を促進するために必要な事項を定めたものである。",
      "ウ": "政府機関などによる物品・サービスの調達において，締約国に対する市場開放を進めて国際的な競争の機会を増大させるとともに，苦情申立て，協議及び紛争解決に関する実効的な手続を定めたものである。",
      "エ": "締約国に対して，工業所有権の保護に関するパリ条約や，著作権の保護に関するベルヌ条約などの主要条項を遵守することを義務付けるとともに，知的財産権の保護のための最恵国待遇などを定めたものである。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。WTO政府調達協定は，対象となる政府調達市場を締約国に開き，公平な競争機会を確保するための協定である。市場アクセスの規律に加え，苦情申立てや紛争解決などの手続も定める。",
    "choiceExplanations": {
      "ア": "電気・電子製品などの有害物質の使用制限を述べた内容であり，政府調達市場を開放する協定ではない。",
      "イ": "公的機関が環境に配慮した物品などの調達を進める制度の説明であり，締約国間の政府調達協定とは異なる。",
      "ウ": "政府調達における市場開放と競争機会の拡大，苦情や紛争への手続という協定の目的・内容が合う。",
      "エ": "知的財産の保護に関する国際的な規律の説明であり，物品やサービスの政府調達市場を扱う協定ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.mofa.go.jp/mofaj/gaiko/wto/chotatu.html"
    ]
  },
  {
    "id": "sa-2018a-am2-q16",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "NRE",
    "topicTags": [
      "NRE"
    ],
    "difficulty": 3,
    "question": "NRE（Non-Recurring Expense）の例として，適切なものはどれか。",
    "choices": {
      "ア": "機器やシステムの保守及び管理に必要な費用",
      "イ": "デバイスの設計，試作及び量産の準備に掛かる経費の総計",
      "ウ": "物理的な損害や精神的な損害を受けたときに発生する，当事者間での金銭のやり取り",
      "エ": "ライセンス契約に基づき，特許使用の対価として支払う代金"
    },
    "answer": "イ",
    "explanation": "正解はイ。NREは，設計や試作，量産準備などのために初期段階で必要となる一回限りの費用を指す。継続する保守費用や，製品の生産・販売の都度発生する費用とは区別する。",
    "choiceExplanations": {
      "ア": "保守や管理に継続して必要となる費用の説明であり，設計・試作などの一回限りの初期費用とは異なる。",
      "イ": "デバイスの設計・試作と量産準備にかかる費用が，生産に先立って必要となるNREの例に当たる。",
      "ウ": "損害に伴う当事者間の金銭のやり取りは，製品開発における一回限りの設計・準備費用の説明ではない。",
      "エ": "特許使用料というだけでは設計・試作・量産準備の初期費用を表さず，NREの例として適切ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q17",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "IT投資評価",
    "topicTags": [
      "IT投資評価"
    ],
    "difficulty": 3,
    "question": "IT投資の評価手法のうち，バランススコアカードを用いた手法を説明したものはどれか。",
    "choices": {
      "ア": "IT投資の効果をキャッシュフローから求めた正味現在価値を用いて評価することによって，他の投資案件との比較を容易にする。",
      "イ": "IT投資をその性質やリスクの共通性によってカテゴリに分類し，カテゴリ単位での投資割合を評価することによって，経営戦略とIT投資の整合性を確保する。",
      "ウ": "財務，顧客，内部業務プロセスなど複数の視点ごとにIT投資の業績評価指標を設定し，経営戦略との適合性を評価することで，IT投資効果を多面的に評価する。",
      "エ": "初期投資に対する価値に加えて，将来において選択可能な収益やリスクの期待値を，金融市場で使われるオプション価格付け理論に基づいて評価する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。バランススコアカードは，財務だけでなく顧客や内部業務プロセスなどの視点を組み合わせて戦略の達成を評価する。IT投資でも複数の視点から指標を設けることで，金額だけでは捉えにくい効果を評価できる。",
    "choiceExplanations": {
      "ア": "将来のキャッシュフローを現在価値に換算する正味現在価値法の説明であり，複数の視点を組み合わせる手法ではない。",
      "イ": "投資を種類やリスクで分類して配分を評価するIT投資ポートフォリオの考え方であり，業績指標の多面的評価とは異なる。",
      "ウ": "財務・顧客・内部プロセスなど複数の視点で指標を設定し，戦略との適合を評価する説明が正しい。",
      "エ": "将来の選択肢の価値を評価するリアルオプションの考え方であり，バランススコアカードではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q18",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "ファイバチャネル",
    "topicTags": [
      "ファイバチャネル"
    ],
    "difficulty": 3,
    "question": "ストレージのインタフェースとして用いられるFC（ファイバチャネル）の特徴として，適切なものはどれか。",
    "choices": {
      "ア": "TCP/IPの上位層として作られた規格である。",
      "イ": "接続形態は，スイッチを用いたn対n接続に限られる。",
      "ウ": "伝送媒体には電気ケーブル又は光ケーブルを用いることができる。",
      "エ": "物理層としてパラレルSCSIを用いることができる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。FCはストレージ接続などに使われる通信技術で，伝送媒体は光ファイバだけに限定されず，電気ケーブルも使える。名称から光に限ると思い込まないことがポイントとなる。",
    "choiceExplanations": {
      "ア": "FCはTCP/IPを必須の下位層として作られた方式ではなく，TCP/IP上でSCSIを扱う方式などとは区別する。",
      "イ": "スイッチを用いる形態だけでなく，ポイントツーポイントなどもあるため，n対n接続に限定する説明は誤りである。",
      "ウ": "電気ケーブルと光ケーブルのどちらも伝送媒体として利用できるため，この説明が正しい。",
      "エ": "FCの物理的な伝送方式とパラレルSCSIは異なり，SCSIコマンドを扱えることと物理層が同じことは別である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q19",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "並列処理性能",
    "topicTags": [
      "並列処理性能"
    ],
    "difficulty": 3,
    "question": "1台のCPUの性能を1とするとき，そのCPUをn台用いたマルチプロセッサの性能Pが，\n\nP＝n／{1＋(n−1)a}\n\nで表されるとする。ここで，aはオーバヘッドを表す定数である。例えば，a＝0.1，n＝4とすると，P≒3なので，4台のCPUから成るマルチプロセッサの性能は約3になる。この式で表されるマルチプロセッサの性能には上限があり，nを幾ら大きくしてもPはある値以上には大きくならない。a＝0.1の場合，Pの上限は幾らか。",
    "choices": {
      "ア": "5",
      "イ": "10",
      "ウ": "15",
      "エ": "20"
    },
    "answer": "イ",
    "explanation": "正解はイ。分子と分母をnで割ると，P＝1／{1/n＋(1−1/n)a}となる。nを大きくすると1/nは0に近づくため，Pは1/aに近づく。a＝0.1なら上限は1/0.1＝10である。",
    "choiceExplanations": {
      "ア": "nが増えると性能は1/a＝10へ近づくため，上限を5とすると大きなnで得られる性能より小さくなる。",
      "イ": "分母と分子をnで割って極限を考えると1/aとなり，a＝0.1のときは10が上限となる。",
      "ウ": "オーバヘッドがあるため，台数を増やしても性能は10へ近づく。15に達することはない。",
      "エ": "CPUの追加で性能を無制限に伸ばすことはできず，この式とa＝0.1では20に達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2018a-am2-q20",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "キャパシティ管理",
    "topicTags": [
      "キャパシティ管理"
    ],
    "difficulty": 3,
    "question": "ITインフラストラクチャのキャパシティプランニングの目的として，最も適切なものはどれか。",
    "choices": {
      "ア": "現行業務の業務負荷から新業務導入時の業務負荷を予測することによって，最適なパフォーマンスを実現する要因数を明確化する。",
      "イ": "情報セキュリティリスクが顕在化したときに適切な対応をとることを目的として，対応方針と対策を策定した後，サーバに必要な機能をインストールする。",
      "ウ": "将来導入が予定されている24時間365日稼働の実現に向けて，故障時に待機系への切替えが必要なサーバとそのスペックを明確化する。",
      "エ": "必要となるリソースを適切なタイミングで増強することによって，適正なコストで最適なパフォーマンスのサービスを提供する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。キャパシティプランニングは，現在と将来の需要に対し，必要な処理能力や容量を適切な時期と費用で確保する計画である。性能の確保と資源・コストの過不足の抑制を両立させる。",
    "choiceExplanations": {
      "ア": "負荷予測は計画のために行う分析の一つだが，要因数の明確化だけでは必要な容量を時期・費用と合わせて確保する目的を表さない。",
      "イ": "情報セキュリティリスクへの対応や対策機能の導入を述べており，処理能力・容量の計画とは目的が異なる。",
      "ウ": "故障時の切替えと待機系の用意は主に可用性の確保に関する内容であり，需要に応じた容量の確保とは異なる。",
      "エ": "需要に合わせたリソースの増強時期とコストを計画し，求められる性能を提供するという目的に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q21",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "関係データベース",
    "topicTags": [
      "関係データベース"
    ],
    "difficulty": 3,
    "question": "関係モデルの候補キーの説明のうち，適切なものはどれか。",
    "choices": {
      "ア": "関係Rの候補キーは関係Rの属性の中から選ばない。",
      "イ": "候補キーの取る値はタプルごとに異なる。",
      "ウ": "候補キーは主キーの中から選ぶ。",
      "エ": "一つの関係に候補キーが複数あってはならない。"
    },
    "answer": "イ",
    "explanation": "正解はイ。候補キーは各タプルを一意に識別できる最小の属性の組である。その値はタプルごとに異なる。候補キーが複数あるときは，その中から一つを主キーとして選べる。",
    "choiceExplanations": {
      "ア": "候補キーは関係の属性又は属性の組によって構成するため，関係の属性から選ばないという説明は誤りである。",
      "イ": "タプルを一意に識別する必要があるため，候補キーの値はタプル間で重複しない。",
      "ウ": "選ぶ向きが逆であり，候補キーの中から一つを主キーとして選ぶ。主キーの中から候補キーを選ぶのではない。",
      "エ": "一つの関係に複数の候補キーがあってもよく，それぞれが最小性と一意性を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q22",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "SAN",
    "topicTags": [
      "SAN"
    ],
    "difficulty": 3,
    "question": "磁気ディスク装置や磁気テープ装置などの外部記憶装置とサーバを，通常のLANとは別の高速な専用ネットワークで接続してシステムを構成するものはどれか。",
    "choices": {
      "ア": "DAFS",
      "イ": "DAS",
      "ウ": "NAS",
      "エ": "SAN"
    },
    "answer": "エ",
    "explanation": "正解はエ。SANは，サーバとストレージを接続するための専用ネットワークである。サーバに装置を直接つなぐDASや，通常のネットワークからファイルとして共有するNASと区別する。",
    "choiceExplanations": {
      "ア": "DAFSはネットワーク上のファイルアクセスのためのプロトコルであり，設問のストレージ専用ネットワークそのものではない。",
      "イ": "DASはサーバにストレージを直接接続する構成であり，専用ネットワークを介するという条件に合わない。",
      "ウ": "NASはネットワーク上でファイルを共有するストレージ装置であり，外部記憶装置とサーバを結ぶ専用網の名称ではない。",
      "エ": "通常のLANとは別にストレージ接続用の高速ネットワークを構成するSANが，設問の説明に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q23",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "クロスサイトスクリプティング",
    "topicTags": [
      "クロスサイトスクリプティング"
    ],
    "difficulty": 3,
    "question": "格納型クロスサイトスクリプティング（Stored XSS又はPersistent XSS）攻撃に該当するものはどれか。",
    "choices": {
      "ア": "Webサイト上の掲示板に攻撃用スクリプトを忍ばせた書込みを攻撃者が行い，その後に当該掲示板を閲覧した利用者のWebブラウザで，攻撃用スクリプトが実行された。",
      "イ": "Webブラウザへの応答を生成する処理に脆弱性のあるWebサイトに対して，不正なJavaScriptコードを含むリクエストを送信するリンクを攻撃者が用意し，そのリンクを利用者がクリックするように仕向けた。",
      "ウ": "攻撃者が，乗っ取った複数のPC上でスクリプトを実行して大量のリクエストを攻撃対象のWebサイトに送り付け，サービス不能状態にした。",
      "エ": "攻撃者がスクリプトを使って，送信元IPアドレスを攻撃対象のWebサイトのIPアドレスに偽装した大量のDNSリクエストを多数のDNSサーバに送信することによって，大量のDNSレスポンスを攻撃対象のWebサイトに送り付けるようにした。"
    },
    "answer": "ア",
    "explanation": "正解はア。格納型XSSでは，攻撃用の内容が掲示板などに保存され，それを後から表示した利用者のブラウザでスクリプトとして実行される。リクエストの内容が直ちに応答へ反映される反射型とは違い，保存された内容が起点となる。",
    "choiceExplanations": {
      "ア": "攻撃用スクリプトを含む投稿が保存され，後で閲覧した利用者側で実行されるため，格納型XSSの例に当たる。",
      "イ": "細工したリクエストに含まれるコードを応答で実行させる反射型XSSの説明であり，保存された投稿を利用する攻撃ではない。",
      "ウ": "複数の端末から大量のリクエストを送りサービスを停止させるDDoSの説明であり，利用者のブラウザ内でのXSSとは異なる。",
      "エ": "送信元を偽装してDNSの応答を対象へ集中させる反射を利用した攻撃であり，格納型XSSの説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2018a-am2-q24",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "コモンクライテリア",
    "topicTags": [
      "コモンクライテリア"
    ],
    "difficulty": 3,
    "question": "情報技術セキュリティ評価のための国際標準であり，コモンクライテリア（CC）と呼ばれるものはどれか。",
    "choices": {
      "ア": "ISO 9001",
      "イ": "ISO 14004",
      "ウ": "ISO/IEC 15408",
      "エ": "ISO/IEC 27005"
    },
    "answer": "ウ",
    "explanation": "正解はウ。コモンクライテリアは，IT製品などのセキュリティ機能と保証を評価するための基準であり，ISO/IEC 15408として国際標準化されている。品質管理・環境管理・情報セキュリティリスク管理の規格とは用途が異なる。",
    "choiceExplanations": {
      "ア": "ISO 9001は品質マネジメントシステムの要求事項を扱う規格であり，IT製品のセキュリティ評価基準ではない。",
      "イ": "ISO 14004は環境マネジメントシステムに関する指針を扱い，ITセキュリティの評価基準とは異なる。",
      "ウ": "ISO/IEC 15408はコモンクライテリアに対応する国際標準であり，情報技術セキュリティ評価を扱う。",
      "エ": "ISO/IEC 27005は情報セキュリティのリスク管理に関する規格であり，CCの規格番号ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.ipa.go.jp/security/jisec/cc/index.html"
    ]
  },
  {
    "id": "sa-2018a-am2-q25",
    "exam": "sa",
    "session": "am2",
    "year": 2018,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "Webセキュリティ",
    "topicTags": [
      "Webセキュリティ"
    ],
    "difficulty": 3,
    "question": "Webアプリケーションにおけるセキュリティ上の脅威とその対策に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "OSコマンドインジェクションを防ぐために，Webアプリケーションが発行するセッションIDに推測困難な乱数を使用する。",
      "イ": "SQLインジェクションを防ぐために，Webアプリケーション内でデータベースへの問合せを作成する際にプレースホルダを使用する。",
      "ウ": "クロスサイトスクリプティングを防ぐために，Webサーバ内のファイルを外部から直接参照できないようにする。",
      "エ": "セッションハイジャックを防ぐために，Webアプリケーションからシェルを起動できないようにする。"
    },
    "answer": "イ",
    "explanation": "正解はイ。SQLの文構造と入力値を分離し，プレースホルダへ値をバインドすることで，入力がSQL構文として解釈されることを防ぐ。単に文字列置換でSQLを組み立てる実装ではなく，データベースのパラメータ機構を適切に使う。",
    "choiceExplanations": {
      "ア": "推測困難なセッションIDはセッションの推測などへの対策であり，外部入力がOSコマンドとして実行される問題の対策ではない。",
      "イ": "プレースホルダへ値を適切にバインドしてSQL構文とデータを分離する方法は，SQLインジェクション対策として有効である。",
      "ウ": "ファイルの直接参照を制限するだけでは，表示した入力がブラウザでスクリプトとして解釈されるXSSを防げない。",
      "エ": "シェルを起動しない設計はOSコマンド実行の危険を抑えるが，セッションの盗用を防止する対策ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
