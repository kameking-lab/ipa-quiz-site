// IPA公式冊子から転記。原典・照合記録: ../2016-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const SA_QUESTIONS_2016_AUTUMN_AM2: Question[] = [
  {
    "id": "sa-2016a-am2-q1",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "要求分析",
    "topicTags": [
      "要求分析"
    ],
    "difficulty": 3,
    "question": "JIS X 0160で規定しているテクニカルプロセスにおける，システム要求事項分析プロセスの成果はどれか。",
    "choices": {
      "ア": "システムの要素を識別し，定義された要求事項を満たすシステム方式設計が定義されている。",
      "イ": "システム要求事項の優先度に従ってシステムを結合するための戦略が，作成されている。",
      "ウ": "システム要求事項は，影響のある全ての当事者へ伝えられ，ベースラインとなっている。",
      "エ": "システム要求事項への適合を評価するための基準が作成されている。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。システム要求事項分析では，利害関係者の要求をシステムに必要な要求事項へ整理する。関係する当事者に共有し，以後の作業や変更管理の基準となるベースラインを確立することが成果に含まれる。",
    "choiceExplanations": {
      "ア": "システム要素と方式を決めるシステム方式設計の成果であり，要求事項分析の成果とは段階が異なる。",
      "イ": "要素を組み合わせるシステム結合の戦略であり，要求事項を整理して共有する作業の成果ではない。",
      "ウ": "分析した要求事項を関係者へ伝え，合意した基準として確立するため，要求事項分析の成果に対応する。",
      "エ": "要求事項に適合するかを判定する評価基準に関する成果であり，本問の要求事項分析の成果ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q2",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "システム方式設計",
    "topicTags": [
      "システム方式設計"
    ],
    "difficulty": 3,
    "question": "共通フレームにおけるシステム方式設計プロセスで文書化する項目として，適切なものはどれか。",
    "choices": {
      "ア": "システム移行の移行要件",
      "イ": "システム構成要件",
      "ウ": "システムの機能及び能力",
      "エ": "システム方式及び品目に割り当てたシステム要件"
    },
    "answer": "エ",
    "explanation": "正解はエ。システム方式設計では，システム全体を構成するハードウェア，ソフトウェアなどの品目へ分け，各品目へ要求を割り当てる。全体の方式と，品目ごとの要件の割当てを文書化する。",
    "choiceExplanations": {
      "ア": "新システムへ切り替える際の要求事項であり，システム全体の方式と品目への割当てを表す項目ではない。",
      "イ": "構成に関する要求の整理であり，方式設計で具体化した品目への要件割当てを示していない。",
      "ウ": "システムに必要な機能や能力は要求事項の内容であり，それを実現する方式と品目の設計とは区別する。",
      "エ": "システムの構成方式を定め，必要な要件を各品目へ割り当てた結果を記録するという作業に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q3",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "DFD",
    "topicTags": [
      "DFD"
    ],
    "difficulty": 3,
    "question": "DFDで用いられる図形要素を列記したものはどれか。",
    "choices": {
      "ア": "関連，実体，データストア",
      "イ": "関連，データストア，データフロー",
      "ウ": "源泉と吸収，実体，プロセス",
      "エ": "源泉と吸収，データフロー，プロセス"
    },
    "answer": "エ",
    "explanation": "正解はエ。DFDは，外部のデータの源泉・吸収，データを処理するプロセス，データフロー，データストアを用いてデータの流れを表す。エに並ぶ三つはいずれもDFDの要素である。",
    "choiceExplanations": {
      "ア": "実体と関連はE-Rモデルで用いる要素であり，DFDの図形要素だけを挙げたものではない。",
      "イ": "データストアとデータフローはDFDの要素だが，関連はE-Rモデルなどで使う要素である。",
      "ウ": "源泉・吸収とプロセスはDFDの要素だが，実体はE-Rモデルの要素である。",
      "エ": "源泉・吸収，データフロー，プロセスはいずれもDFDの図形要素に含まれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q4",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "ペトリネット",
    "topicTags": [
      "ペトリネット"
    ],
    "difficulty": 3,
    "question": "並列に動作する事象間の同期を表現することが可能な，ソフトウェアの要求モデルはどれか。",
    "choices": {
      "ア": "E-Rモデル",
      "イ": "データフローモデル",
      "ウ": "ペトリネットモデル",
      "エ": "有限状態機械モデル"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ペトリネットは，プレース，トランジション，トークンによって状態と遷移を表す。複数の条件がそろって初めて遷移する構造などを記述でき，並行する動作の同期の表現に適している。",
    "choiceExplanations": {
      "ア": "データの実体と関連を表すモデルであり，並行動作の同期を表現するためのモデルではない。",
      "イ": "データの流れと変換を表すモデルであり，事象間の同期条件を主に表すものではない。",
      "ウ": "トークンの配置とトランジションの発火条件により，並行する事象の合流や同期を表現できる。",
      "エ": "状態と遷移を表せるが，本問の並列事象間の同期を表す要求モデルとしてはペトリネットを選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q5",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "論理データモデル",
    "topicTags": [
      "論理データモデル"
    ],
    "difficulty": 3,
    "question": "論理データモデル作成におけるトップダウンアプローチ，ボトムアップアプローチに関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "トップダウンアプローチでは，新規システムの利用者要求だけに基づいて論理データモデルを作成するので，現状業務の分析は行わない。",
      "イ": "トップダウンアプローチでもボトムアップアプローチでも，最終的な論理データモデルは正規化され，かつ，業務上の属性は全て備えていなければならない。",
      "ウ": "トップダウンアプローチでもボトムアップアプローチでも，利用者が使用する現状の画面や帳票を素材として分析を行うのは同じである。",
      "エ": "ボトムアップアプローチは現状業務の分析に限定して用いるものであり，新規システムの設計ではトップダウンアプローチを使用しなければならない。"
    },
    "answer": "イ",
    "explanation": "正解はイ。トップダウンは業務全体の概念から詳細化し，ボトムアップは個々のデータ項目などから統合する。出発点は異なっても，最終的には業務に必要な属性を備え，正規化された一貫した論理モデルへまとめる。",
    "choiceExplanations": {
      "ア": "トップダウンでも業務全体の理解が必要であり，現状業務の分析を行わないとはいえない。",
      "イ": "出発点が異なっても，必要な属性の網羅と正規化を満たす最終モデルが必要である点は共通する。",
      "ウ": "画面や帳票の具体的な項目からまとめるのはボトムアップの典型であり，両者の出発点が同じではない。",
      "エ": "ボトムアップで得たデータ構造も新システムの設計に利用でき，現状分析だけに用途を限定しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q6",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "構造化設計",
    "topicTags": [
      "構造化設計"
    ],
    "difficulty": 3,
    "question": "図は，デマルコの提唱による構造化技法を基本としたシステム開発プロジェクトのライフサイクルを表現したものである。図中のaに入れる適切なプロセスはどれか。",
    "choices": {
      "ア": "機能設計",
      "イ": "構造化設計",
      "ウ": "プログラム設計",
      "エ": "プロトタイピング"
    },
    "answer": "イ",
    "explanation": "正解はイ。構造化分析の結果である構造化仕様書とユーザの要求を受け，パッケージ化した設計やテスト計画へつなげる位置なので，構造化設計が入る。分析で明らかにした機能を実現する構造を定める工程である。",
    "choiceExplanations": {
      "ア": "機能の整理だけを指す名称では，図の構造化分析からパッケージ化した設計へ進む工程名に一致しない。",
      "イ": "構造化分析の結果を入力として，システム開発へ渡す設計を作る工程に当たる。",
      "ウ": "個別のプログラムの設計より広い，構造化分析とシステム開発をつなぐ工程が問われている。",
      "エ": "試作による要求や実現方法の確認を指し，図の構造化仕様書から設計を作る工程名ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2016-autumn-am2-q6.png"
    ],
    "imageAltTexts": [
      "調査，構造化分析，a，ハードウェアの調査，システム開発の関係と，構造化仕様書・テスト計画などの入出力を示すライフサイクル図。"
    ]
  },
  {
    "id": "sa-2016a-am2-q7",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "モジュール分割",
    "topicTags": [
      "モジュール分割"
    ],
    "difficulty": 3,
    "question": "プログラムの構造化設計におけるモジュール分割技法の説明のうち，適切なものはどれか。",
    "choices": {
      "ア": "STS分割は，データの流れに着目してプログラムを分割する技法であり，入力データの処理，入力から出力への変換処理及び出力データの処理の三つの部分で構成することによって，モジュールの独立性が高まる。",
      "イ": "TR分割は，データの構造に着目してプログラムを分割する技法であり，オンラインリアルタイム処理のように，入力トランザクションの種類に応じて処理が異なる場合に有効である。",
      "ウ": "共通機能分割は，データの構造に着目してプログラムを分割する技法であり，共通の処理を一つにまとめ，モジュール化する。",
      "エ": "ジャクソン法は，データの流れに着目してプログラムを分割する技法であり，バッチ処理プログラムの分割に適している。"
    },
    "answer": "ア",
    "explanation": "正解はア。STS分割は，入力を受ける部分，中心となる変換部分，出力する部分というデータの流れに着目して分割する。TR分割はトランザクションの種類，共通機能分割は共通処理，ジャクソン法はデータ構造に着目する。",
    "choiceExplanations": {
      "ア": "入力・変換・出力という流れで責務を分ける説明であり，STS分割の考え方に一致する。",
      "イ": "種類に応じた処理の振分けはTR分割の特徴だが，着目するのはデータ構造ではなくトランザクションである。",
      "ウ": "共通処理をまとめる点は合うが，データ構造に着目するという説明が共通機能分割に合わない。",
      "エ": "ジャクソン法は入出力データの構造を基にプログラムを構成するので，データの流れという説明が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q8",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "利用時の品質",
    "topicTags": [
      "利用時の品質"
    ],
    "difficulty": 3,
    "question": "JIS X 25010:2013におけるシステムの利用時の品質特性の一つである，効率性の説明はどれか。",
    "choices": {
      "ア": "製品又はシステムが，経済状況，人間の生活又は環境に対する潜在的なリスクを緩和する度合い",
      "イ": "製品又はシステムが明示された利用状況において使用されるとき，利用者ニーズが満足される度合い",
      "ウ": "明示された目標を利用者が達成する上での正確さ及び完全さの度合い",
      "エ": "利用者が特定の目標を達成するための正確さ及び完全さに関連して，使用した資源の度合い"
    },
    "answer": "エ",
    "explanation": "正解はエ。利用時の効率性は，目標の達成に対してどれだけの資源を使ったかという観点である。目標を正確かつ完全に達成できるかという有効性と，そのために使った資源を区別する。",
    "choiceExplanations": {
      "ア": "経済・健康・環境への潜在的なリスクを減らす観点であり，利用時のリスク回避性の説明である。",
      "イ": "利用者のニーズがどの程度満たされるかを表し，利用時の満足性の説明に当たる。",
      "ウ": "目標達成の正確さと完全さを表す有効性の説明であり，使用資源との関係が含まれない。",
      "エ": "目標達成の正確さ・完全さに対して使用した資源を評価しており，効率性の説明に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q9",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "コーディング規約",
    "topicTags": [
      "コーディング規約"
    ],
    "difficulty": 3,
    "question": "組込みシステムの開発におけるソースコードの品質向上のために，C言語のコーディング規則をまとめたものはどれか。",
    "choices": {
      "ア": "CSS",
      "イ": "GCC",
      "ウ": "MISRA-C",
      "エ": "SystemC"
    },
    "answer": "ウ",
    "explanation": "正解はウ。MISRA-Cは，C言語を用いる際のコーディング上の規則をまとめたものである。言語の曖昧な動作や誤りにつながる記述を避け，ソースコードの信頼性や保守性を高めるために用いる。",
    "choiceExplanations": {
      "ア": "CSSはWebページなどの表示形式を指定するスタイルシート言語であり，C言語の記述規則ではない。",
      "イ": "GCCはコンパイラの集合であり，ソースコードの記述規則をまとめたガイドラインではない。",
      "ウ": "C言語による開発で誤りを減らすためのコーディング規則を定めたものに該当する。",
      "エ": "SystemCはシステムのモデリングなどに用いるC++ベースのライブラリであり，Cの記述規則ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q10",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "ブラックボックステスト",
    "topicTags": [
      "ブラックボックステスト"
    ],
    "difficulty": 3,
    "question": "ブラックボックステストのテストデータの作成方法のうち，最も適切なものはどれか。",
    "choices": {
      "ア": "稼働中のシステムから実データを無作為に抽出し，テストデータを作成する。",
      "イ": "機能仕様から同値クラスや限界値を識別し，テストデータを作成する。",
      "ウ": "業務で発生するデータの発生頻度を分析し，テストデータを作成する。",
      "エ": "プログラムの流れ図から，分岐条件に基づいたテストデータを作成する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ブラックボックステストは，内部構造ではなく機能仕様の入力と出力に着目する。同じ振る舞いになる入力の同値クラスや，扱いが変わる境界の値を仕様から選ぶ方法が適している。",
    "choiceExplanations": {
      "ア": "実データの無作為抽出だけでは，仕様の条件や境界値を十分に確認できるとは限らない。",
      "イ": "機能仕様から入力の分類と境界を求めるため，内部実装に依存せず期待動作を確認できる。",
      "ウ": "発生頻度だけで選ぶと，まれに起きる境界条件や例外条件を十分に確認できないおそれがある。",
      "エ": "プログラム内部の分岐構造に着目する方法であり，ホワイトボックステストの考え方である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q11",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "エラー埋込み法",
    "topicTags": [
      "エラー埋込み法"
    ],
    "difficulty": 3,
    "question": "エラー埋込み法では，検出したエラー数を測定することによって，その時点での埋込みエラー数を除いた潜在エラー数Tを推定することができる。\n\nTを求める次の計算式の変数A，B，Cに対応する項目の適切な組合せはどれか。\n\n総エラー数＝A×B/C\n\nT＝総エラー数−A−(B−C)",
    "choices": {
      "ア": "A：埋込みエラー数，B：検出した埋込みエラー数，C：検出した総エラー数",
      "イ": "A：埋込みエラー数，B：検出した総エラー数，C：検出した埋込みエラー数",
      "ウ": "A：検出した埋込みエラー数，B：埋込みエラー数，C：検出した総エラー数",
      "エ": "A：検出した埋込みエラー数，B：検出した総エラー数，C：埋込みエラー数"
    },
    "answer": "イ",
    "explanation": "正解はイ。埋込みエラーの総数をA，発見した総エラー数をB，そのうち埋込み分をCとする。発見率C/Aが全エラーにも当てはまるとすると，推定総数はB÷（C/A）。そこから埋込み全数Aと，発見済みの元のエラーB−Cを除くとTになる。",
    "choiceExplanations": {
      "ア": "BとCが逆になっており，埋込みエラーの発見率を使って総数を推定する式にならない。",
      "イ": "推定総数から埋込み全数Aと，検出した元のエラーB−Cを除くことができ，両方の式を満たす。",
      "ウ": "Aが検出した埋込み数になっており，総数から全ての埋込みエラーを差し引くという式の意味に合わない。",
      "エ": "Cが埋込み総数になっており，B−Cが検出した元のエラーを表さないため，残存数を計算できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2016a-am2-q12",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "保守と信頼性",
    "topicTags": [
      "保守と信頼性"
    ],
    "difficulty": 3,
    "question": "全国に分散しているシステムの保守に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "故障発生時に遠隔保守を実施することによって駆付け時間が不要になり，MTBFは長くなる。",
      "イ": "故障発生時に行う是正保守によって，MTBFは長くなる。",
      "ウ": "保守センタを1か所集中から分散配置に変えて駆付け時間を短縮することによって，MTTRは短くなる。",
      "エ": "予防保守を実施することによって，MTTRは短くなる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。MTBFは故障と故障の間の平均稼働時間，MTTRは故障からの平均修復時間である。修理担当者が到着するまでの待ち時間を短縮すれば，故障後の復旧に必要な時間を短くできる。",
    "choiceExplanations": {
      "ア": "駆付け時間をなくすことは修復時間の短縮につながるが，故障間隔MTBFを直接長くするものではない。",
      "イ": "起きた故障を修正する行為だけから，故障間隔MTBFが必ず長くなるとはいえない。",
      "ウ": "故障後の移動待ち時間が減るため，平均修復時間MTTRの短縮につながる。",
      "エ": "予防保守は故障の発生を抑えるための活動であり，個々の故障の修復時間を直接短くする説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q13",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "ユースケース駆動開発",
    "topicTags": [
      "ユースケース駆動開発"
    ],
    "difficulty": 3,
    "question": "ユースケース駆動開発の利点はどれか。",
    "choices": {
      "ア": "開発を反復するので，新しい要求やビジネス目標の変化に柔軟に対応しやすい。",
      "イ": "開発を反復するので，リスクが高い部分に対して初期段階で対処しやすく，プロジェクト全体のリスクを減らすことができる。",
      "ウ": "基本となるアーキテクチャをプロジェクトの初期に決定するので，コンポーネントを再利用しやすくなる。",
      "エ": "ひとまとまりの要件を1単位として設計からテストまでを実施するので，要件ごとに開発状況が把握できる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ユースケースを要求のまとまりとして，分析・設計・実装・テストを一貫して関連付ける。どの要求がどこまで実現・検証されたかをユースケース単位で把握できる点が利点である。",
    "choiceExplanations": {
      "ア": "反復開発が変化へ対応しやすいという利点であり，ユースケースを軸に進めること固有の説明ではない。",
      "イ": "リスクの高い部分を先に扱う反復開発の利点であり，要求の単位で進捗を追う特徴とは異なる。",
      "ウ": "アーキテクチャ中心の開発に関する利点であり，ユースケースによる要求と工程の対応付けではない。",
      "エ": "要件のまとまりを各工程で追跡するため，ユースケース駆動開発の進捗把握の利点に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q14",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "プライバシーバイデザイン",
    "topicTags": [
      "プライバシーバイデザイン"
    ],
    "difficulty": 3,
    "question": "プライバシバイデザイン（Privacy by Design）の説明はどれか。",
    "choices": {
      "ア": "製品の開発工程で，利用者の個人情報が漏えいした場合に発見する方策を用意しておくこと",
      "イ": "製品の設計工程で，利用者の個人情報が適切に扱われるように考慮したシステムを設計すること",
      "ウ": "製品の設計工程で，利用者の個人情報が漏えいしないように管理する規則を策定すること",
      "エ": "製品の利用者の利便性を高めるために，登録した個人情報が他のサービスでも利用できるようにすること"
    },
    "answer": "イ",
    "explanation": "正解はイ。Privacy by Designでは，個人情報の保護を設計段階からシステムやサービスへ組み込む。漏えい後の発見や運用規則だけに任せず，情報の適切な取扱いを実現する構造を先に設計する。",
    "choiceExplanations": {
      "ア": "漏えいした後に発見する方策だけでは，設計段階から保護を組み込むという考え方を表さない。",
      "イ": "個人情報を適切に扱う仕組みを設計段階から組み込むため，Privacy by Designに該当する。",
      "ウ": "管理規則の策定だけでは，個人情報の保護をシステムの設計へ組み込むという説明にならない。",
      "エ": "他サービスでの利用可能性を広げること自体は，設計段階から個人情報を保護することを意味しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q15",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "グリーン購入法",
    "topicTags": [
      "グリーン購入法"
    ],
    "difficulty": 3,
    "question": "グリーン購入法において，“環境物品等”として規定されているものはどれか。",
    "choices": {
      "ア": "ISO 14001認証を取得した企業が製造又は提供する製品・サービス",
      "イ": "IT活用による省エネなど，グリーンITに関わる製品・サービス",
      "ウ": "環境への負荷低減に資する原材料・部品又は製品・サービス",
      "エ": "ユニバーサルデザイン対象の，環境配慮の製品・サービス"
    },
    "answer": "ウ",
    "explanation": "正解はウ。環境物品等は，環境への負荷の低減に役立つ原材料や部品，製品，役務を含む。企業の認証取得，IT分野への該当，ユニバーサルデザインの採用だけで対象を決める定義ではない。",
    "choiceExplanations": {
      "ア": "企業の環境マネジメントシステムの認証取得だけでは，その全製品が環境物品等になるわけではない。",
      "イ": "環境物品等はIT分野に限らず，環境負荷を低減する原材料・製品・役務を広く含む。",
      "ウ": "原材料・部品，製品，役務という区分と，環境負荷の低減という定義の要点に一致する。",
      "エ": "ユニバーサルデザインであることを環境物品等の定義上の必須条件としているわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.env.go.jp/content/000040689.pdf",
      "https://laws.e-gov.go.jp/law/412AC1000000100"
    ]
  },
  {
    "id": "sa-2016a-am2-q16",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "モデル取引契約",
    "topicTags": [
      "モデル取引契約"
    ],
    "difficulty": 3,
    "question": "“情報システム・モデル取引・契約書”によれば，ユーザ（取得者）とベンダ（供給者）間で請負型の契約が適切であるとされるフェーズはどれか。",
    "choices": {
      "ア": "システム化計画フェーズから導入・受入支援フェーズまで",
      "イ": "要件定義フェーズから導入・受入支援フェーズまで",
      "ウ": "要件定義フェーズからシステム結合フェーズまで",
      "エ": "システム内部設計フェーズからシステム結合フェーズまで"
    },
    "answer": "エ",
    "explanation": "正解はエ。本問が前提とするモデル取引・契約書では，作成すべき成果物が具体化されたシステム内部設計からシステム結合までを請負型の対象としている。要件を固める段階や，利用者による受入れを支援する段階と区別する。",
    "choiceExplanations": {
      "ア": "計画から受入支援まで全工程を一括して請負型とする範囲であり，本問の対象範囲より広い。",
      "イ": "要件を具体化する段階や受入支援まで含むため，本問で請負型とされる工程範囲とは異なる。",
      "ウ": "成果物を具体化する要件定義を含んでおり，システム内部設計からという開始点が合わない。",
      "エ": "システム内部設計からシステム結合までの範囲であり，本問のモデル契約の想定に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2016-autumn-am2-q16.png"
    ],
    "imageAltTexts": [
      "システム化計画から導入・受入支援までの各フェーズと，選択肢ア〜エが指す工程範囲。"
    ]
  },
  {
    "id": "sa-2016a-am2-q17",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "エンタープライズアーキテクチャ",
    "topicTags": [
      "エンタープライズアーキテクチャ"
    ],
    "difficulty": 3,
    "question": "エンタープライズアーキテクチャ（EA）における，ビジネスアーキテクチャの成果物である機能情報関連図（DFD）を説明したものはどれか。",
    "choices": {
      "ア": "業務・システムの処理過程において，情報システム間でやり取りされる情報の種類及び方向を図式化したものである。",
      "イ": "業務を構成する各種機能を，階層化した3行3列の格子様式に分類して整理し，業務・システムの対象範囲を明確化したものである。",
      "ウ": "最適化計画に基づき決定された業務対象領域の全情報（伝票，帳票，文書など）を整理し，各情報間の関連及び構造を明確化したものである。",
      "エ": "対象の業務機能に対して，情報の発生源と到達点，処理，保管，それらの間を流れる情報を，統一記述規則に基づいて表現したものである。"
    },
    "answer": "エ",
    "explanation": "正解はエ。DFDでは，外部の情報源・到達点，処理，データストアと，その間のデータフローを記述する。機能がどの情報を受け取り，処理・保管してどこへ渡すかを表す説明が該当する。",
    "choiceExplanations": {
      "ア": "情報システム間でやり取りする情報の種類と方向を示す情報システム関連図の説明である。",
      "イ": "機能を階層化した格子様式で整理する機能構成図の説明であり，データフローを示していない。",
      "ウ": "情報そのものの関連や構造を整理する説明であり，情報の処理と流れを示すDFDとは異なる。",
      "エ": "DFDを構成する外部実体・プロセス・データストア・データフローを列挙しており，説明に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q18",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "RAID",
    "topicTags": [
      "RAID"
    ],
    "difficulty": 3,
    "question": "RAID1〜5の方式の違いは，何に基づいているか。",
    "choices": {
      "ア": "構成する磁気ディスク装置のアクセス性能",
      "イ": "コンピュータ本体とのインタフェース",
      "ウ": "磁気ディスク装置の信頼性を示すMTBFの値",
      "エ": "データ及び冗長ビットの記録方法と記録位置との組合せ"
    },
    "answer": "エ",
    "explanation": "正解はエ。RAIDの方式は，データをどの単位で分割するか，複製や誤り訂正用の冗長情報をどのように記録するか，どのディスクに配置するかという構成上の違いで分類される。",
    "choiceExplanations": {
      "ア": "同じRAID方式でも用いるディスクのアクセス性能は異なり得るため，分類の基準ではない。",
      "イ": "接続インタフェースは構成条件の一つだが，RAIDのレベルを分ける基準ではない。",
      "ウ": "ディスク単体のMTBFの値で方式を分類するのではなく，データと冗長情報の配置で分類する。",
      "エ": "データの分割・複製や冗長情報の記録方法と配置の違いが，RAIDの各方式の違いに対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q19",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "分散透過性",
    "topicTags": [
      "分散透過性"
    ],
    "difficulty": 3,
    "question": "分散処理システムにおける障害透明性（透過性）の説明として，適切なものはどれか。",
    "choices": {
      "ア": "管理者が，システム全体の状況を常に把握でき，システムを構成する個々のコンピュータで起きた障害をリアルタイムに知ることができること",
      "イ": "個々のコンピュータでの障害がシステム全体に影響を及ぼすことを防ぐために，データを1か所に集中して管理すること",
      "ウ": "どのコンピュータで障害が起きてもすぐ対処できるように，均一なシステムとなっていること",
      "エ": "利用者が，個々のコンピュータに障害が起きていることを認識することなく，システムを利用できること"
    },
    "answer": "エ",
    "explanation": "正解はエ。透過性とは，分散している内部の事情を利用者が意識しなくてよい性質である。障害透過性は，一部で障害が発生しても，その影響を隠蔽して利用を継続できることを指す。",
    "choiceExplanations": {
      "ア": "障害の監視と可視化の説明であり，利用者に障害を意識させないという透過性ではない。",
      "イ": "データの集中管理という配置方式の説明であり，それだけで障害透過性を満たすとはいえない。",
      "ウ": "構成を均一にする運用上の設計であり，利用者から障害を隠蔽できるという性質を表していない。",
      "エ": "一部の故障を利用者が認識せずに利用できるため，障害透過性の意味に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q20",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "信頼性",
    "topicTags": [
      "信頼性"
    ],
    "difficulty": 3,
    "question": "グラフは，ある非修理系の製品の，時刻0から時刻tまでの間の累積故障率（全製品数を分母として，時刻0から時刻tまでに故障した製品数を分子とした割合）を表したものである。時刻0付近のグラフ形状からこの製品の故障率について読み取れるものはどれか。",
    "choices": {
      "ア": "故障率は，0に近い値からしばらくの間は時間とともに増加する。",
      "イ": "故障率は，ある時刻まで一定で，その後時間とともに減少する。",
      "ウ": "故障率は，ある正の値から時間とともに減少し，限りなく0に近づく。",
      "エ": "故障率は，時刻によって変化することなく，ある正の定数のまま一定である。"
    },
    "answer": "ア",
    "explanation": "正解はア。時刻0付近では，累積故障率のグラフはほぼ水平から始まり，次第に傾きが大きくなる。初期に故障する割合は小さく，その後しばらく増加する形である。グラフ全体が単調増加することだけでなく，時刻0付近の曲がり方に着目する。",
    "choiceExplanations": {
      "ア": "時刻0付近で傾きがほぼ0から大きくなる形なので，初期の故障率が増加するという読み方に合う。",
      "イ": "初めから一定の割合で増える直線部分はなく，初期の傾きは次第に大きくなっている。",
      "ウ": "初めの傾きが大きく次第に小さくなる形ではなく，時刻0付近では逆に傾きが大きくなる。",
      "エ": "故障率一定なら累積故障率は初めから正の傾きを持つが，提示図はほぼ水平から増加を始めている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2016-autumn-am2-q20.png"
    ],
    "imageAltTexts": [
      "縦軸を累積故障率，横軸を時刻tとするS字形の曲線。時刻0付近ではほぼ水平で，その後に傾きが増し，最終的に1へ近づく。"
    ]
  },
  {
    "id": "sa-2016a-am2-q21",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "トランザクション",
    "topicTags": [
      "トランザクション"
    ],
    "difficulty": 3,
    "question": "システム障害発生時には，データベースの整合性を保ち，かつ，最新のデータベース状態に復旧する必要がある。このために，DBMSがトランザクションのコミット処理を完了するタイミングとして，適切なものはどれか。",
    "choices": {
      "ア": "アプリケーションの更新命令完了時点",
      "イ": "チェックポイント処理完了時点",
      "ウ": "ログバッファへのコミット情報書込み完了時点",
      "エ": "ログファイルへのコミット情報書込み完了時点"
    },
    "answer": "エ",
    "explanation": "正解はエ。コミット完了後の結果を障害後にも復旧するには，コミットしたことを示す情報が永続化されている必要がある。メモリ上のログバッファでは失われるので，ログファイルへの書込みが完了してからコミット完了を通知する。",
    "choiceExplanations": {
      "ア": "更新命令が終わっただけでは，トランザクションの確定情報が永続化されたとは限らない。",
      "イ": "チェックポイントは復旧処理の起点を作るものであり，個々のトランザクションの確定時点とは異なる。",
      "ウ": "ログバッファはメモリ上の領域なので，システム障害でコミット情報を失う可能性が残る。",
      "エ": "コミット情報が永続的なログへ書き込まれれば，障害後に確定済みの処理を判別し復旧できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q22",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "ストレージネットワーク",
    "topicTags": [
      "ストレージネットワーク"
    ],
    "difficulty": 3,
    "question": "磁気ディスク装置や磁気テープ装置などの外部記憶装置を，通常のLANとは別の高速な専用ネットワークで構成したものはどれか。",
    "choices": {
      "ア": "DAFS",
      "イ": "DAS",
      "ウ": "NAS",
      "エ": "SAN"
    },
    "answer": "エ",
    "explanation": "正解はエ。SANはストレージを接続するための専用ネットワークである。通常のLANとは別の経路を設け，サーバと外部記憶装置の間で高速にデータを転送する構成に対応する。",
    "choiceExplanations": {
      "ア": "DAFSはネットワーク越しのファイルアクセスに関する仕組みであり，専用ストレージ網の名称ではない。",
      "イ": "DASはサーバなどへストレージを直接接続する構成であり，専用ネットワークではない。",
      "ウ": "NASはネットワークに接続してファイルを提供する装置であり，専用ストレージ網そのものではない。",
      "エ": "ストレージを通常のLANと分けた専用ネットワークに接続する構成であり，設問の説明に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q23",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "情報セキュリティガバナンス",
    "topicTags": [
      "情報セキュリティガバナンス"
    ],
    "difficulty": 3,
    "question": "JIS Q 27014:2015（情報セキュリティガバナンス）における，情報セキュリティを統治するために経営陣が実行するガバナンスプロセスのうちの“モニタ”はどれか。",
    "choices": {
      "ア": "情報セキュリティの目的及び戦略について，指示を与えるガバナンスプロセス",
      "イ": "戦略的目的の達成を評価することを可能にするガバナンスプロセス",
      "ウ": "独立した立場からの客観的な監査，レビュー又は認証を委託するガバナンスプロセス",
      "エ": "利害関係者との間で，特定のニーズに沿って情報セキュリティに関する情報を交換するガバナンスプロセス"
    },
    "answer": "イ",
    "explanation": "正解はイ。モニタは，目的や方針に沿って活動が進んでいるかを把握し，戦略的な目的の達成を評価できるようにするプロセスである。指示を出すこと，独立した保証を得ること，関係者と情報交換することとは役割が異なる。",
    "choiceExplanations": {
      "ア": "目的や戦略について指示を与えるのは，方向を示す指示のプロセスに当たる。",
      "イ": "進み具合や結果を把握し，戦略的目的の達成を評価できるようにするため，モニタに対応する。",
      "ウ": "独立した監査などを委託して客観的な確かさを得るのは，保証に関するプロセスである。",
      "エ": "利害関係者との情報交換を行うのは，コミュニケーションのプロセスに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2016a-am2-q24",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "Webセキュリティ",
    "topicTags": [
      "Webセキュリティ"
    ],
    "difficulty": 3,
    "question": "安全なWebアプリケーションの作り方について，攻撃と対策の適切な組合せはどれか。",
    "choices": {
      "ア": "攻撃：SQLインジェクション，対策：SQL文の組立てに静的プレースホルダを使用する。",
      "イ": "攻撃：クロスサイトスクリプティング，対策：任意の外部サイトのスタイルシートを取り込めるようにする。",
      "ウ": "攻撃：クロスサイトリクエストフォージェリ，対策：リクエストにGETメソッドを使用する。",
      "エ": "攻撃：セッションハイジャック，対策：利用者ごとに固定のセッションIDを使用する。"
    },
    "answer": "ア",
    "explanation": "正解はア。静的プレースホルダを使うと，SQLの構造を先に決め，利用者の入力を値としてバインドできる。入力をSQL文の構造として解釈させないことが，SQLインジェクション対策の要点となる。",
    "choiceExplanations": {
      "ア": "SQLの構造と入力値を分離し，入力に含まれる文字列をSQLの命令として扱わない対策に当たる。",
      "イ": "任意の外部コンテンツの取込みを認めることは，出力を適切にエスケープするなどのXSS対策にはならない。",
      "ウ": "GETに変えるだけでは正規の利用者による意図した操作かを確認できず，CSRF対策にならない。",
      "エ": "固定したセッションIDを使い続けることは安全な管理ではなく，推測困難なIDの生成や適切な更新が必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.ipa.go.jp/security/vuln/websecurity/sql.html"
    ]
  },
  {
    "id": "sa-2016a-am2-q25",
    "exam": "sa",
    "session": "am2",
    "year": 2016,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "無線LAN",
    "topicTags": [
      "無線LAN"
    ],
    "difficulty": 3,
    "question": "無線LANのセキュリティ方式としてWPA2を選択するとき，利用される暗号化アルゴリズムはどれか。",
    "choices": {
      "ア": "AES",
      "イ": "ECC",
      "ウ": "RC4",
      "エ": "RSA"
    },
    "answer": "ア",
    "explanation": "正解はア。本問ではWPA2の暗号化に用いるAESを選ぶ。AESを基礎とするCCMPに対応することが要点であり，公開鍵暗号のECCやRSAとは用途が異なる。",
    "choiceExplanations": {
      "ア": "WPA2で用いるCCMPはAESを基礎としており，本問の暗号化アルゴリズムに該当する。",
      "イ": "ECCは楕円曲線を用いる公開鍵暗号の方式であり，WPA2のデータ暗号化に用いる方式ではない。",
      "ウ": "RC4はWEPやTKIPに関係する方式であり，本問のWPA2の暗号化としてはAESを選ぶ。",
      "エ": "RSAは公開鍵暗号の方式であり，WPA2でデータを暗号化するためのAESとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
