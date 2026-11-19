// IPA公式冊子から転記。原典・照合記録: ../2019-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const SA_QUESTIONS_2019_AUTUMN_AM2: Question[] = [
  {
    "id": "sa-2019a-am2-q1",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "DFD",
    "topicTags": [
      "DFD"
    ],
    "difficulty": 3,
    "question": "図は，階層化されたDFDにおける，あるレベルのDFDの一部である。プロセス1を子プロセスに分割して詳細化したDFDのうち，適切なものはどれか。ここで，プロセス1の子プロセスは，プロセス1−1，1−2及び1−3とする。",
    "choices": {
      "ア": "図ア",
      "イ": "図イ",
      "ウ": "図ウ",
      "エ": "図エ"
    },
    "answer": "イ",
    "explanation": "正解はイ。DFDを詳細化しても，元のプロセスの外部との入出力を保つ必要がある。親のプロセス1は外部入力が2本，外部出力が2本であり，イはこれを保ちながら子プロセス間の処理を表している。",
    "choiceExplanations": {
      "ア": "親プロセスには外部からの入力が2本あるが，アでは子プロセス全体への外部入力が1本になっている。",
      "イ": "外部入力2本と外部出力2本が保たれ，入力を受けた子プロセスの処理結果を出力する構成となっている。",
      "ウ": "外部入力は2本あるが，子プロセス1−2から外部への出力がなく，親にあった外部出力2本を保てていない。",
      "エ": "子プロセス1−2には入力がないのに出力があり，データを処理して出力するというDFDの関係を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2019-autumn-am2-q1.png"
    ],
    "imageAltTexts": [
      "上段の親DFDはプロセス1への入力2本と，プロセス2及び3への出力各1本。下段に子プロセス1−1，1−2，1−3の分割案ア〜エを示し，各案で外部入出力の本数と内部の矢印が異なる。"
    ]
  },
  {
    "id": "sa-2019a-am2-q2",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "要求モデル",
    "topicTags": [
      "要求モデル"
    ],
    "difficulty": 3,
    "question": "並列に生起する事象間の同期を表現することが可能な，ソフトウェアの要求モデルはどれか。",
    "choices": {
      "ア": "E-Rモデル",
      "イ": "データフローモデル",
      "ウ": "ペトリネットモデル",
      "エ": "有限状態機械モデル"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ペトリネットはプレース，トランジション，トークンなどを使って，並行する処理の状態や同期を表す。複数の事象がそろってから次へ進む条件もモデル化できる。",
    "choiceExplanations": {
      "ア": "E-Rモデルはエンティティとその関係などのデータ構造を表し，並行事象の同期を中心とするモデルではない。",
      "イ": "データフローモデルはデータと処理の流れを表すが，並行する事象間の同期を表すためのモデルとは異なる。",
      "ウ": "トークンの配置とトランジションの発火条件によって，並行処理や複数事象の同期を表現できる。",
      "エ": "有限状態機械は状態と遷移を表すが，並行する事象間の同期を直接表すモデルとしてはペトリネットが適する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q3",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "デザインパターン",
    "topicTags": [
      "デザインパターン"
    ],
    "difficulty": 3,
    "question": "ソフトウェアパターンのうち，GoFのデザインパターンの説明はどれか。",
    "choices": {
      "ア": "Javaのパターンとして引数オブジェクト，オブジェクトの可変性などで構成される。",
      "イ": "オブジェクト指向開発のためのパターンとして生成，構造，振る舞いの三つのカテゴリに分類される。",
      "ウ": "構造，分散システム，対話型システム及び適合型システムの四つのカテゴリに分類される。",
      "エ": "抽象度が異なる要素を分割して階層化するためのLayers，コンポーネント分割のためのBrokerなどで構成される。"
    },
    "answer": "イ",
    "explanation": "正解はイ。GoFのデザインパターンは，オブジェクトの生成，クラスやオブジェクトの構造，それらの振る舞いの三つに分類される。アーキテクチャ全体のパターンとは区別する。",
    "choiceExplanations": {
      "ア": "特定言語での設計上の扱いをまとめたパターンの説明であり，GoFの三分類の説明ではない。",
      "イ": "生成・構造・振る舞いという三つの分類が，GoFのデザインパターンの整理に一致する。",
      "ウ": "構造・分散システム・対話型システム・適合型システムという分類は，GoFの三分類ではない。",
      "エ": "LayersやBrokerはシステム全体の構成を扱うアーキテクチャパターンであり，GoFの分類とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q4",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "オブジェクト指向",
    "topicTags": [
      "オブジェクト指向"
    ],
    "difficulty": 3,
    "question": "Javaサーブレットを用いたWebアプリケーションソフトウェアの開発では，例えば，doGetやdoPostなどのメソッドを，シグネチャ（メソッド名，引数の型と個数）は変えずに，目的とする機能を実現するための処理に置き換える。このメソッドの置き換えを何と呼ぶか。",
    "choices": {
      "ア": "オーバーライド",
      "イ": "オーバーロード",
      "ウ": "カプセル化",
      "エ": "継承"
    },
    "answer": "ア",
    "explanation": "正解はア。スーパークラスで定義されたメソッドと同じシグネチャを用い，サブクラスで処理を再定義するのがオーバーライドである。引数の型や個数を変えるオーバーロードとは区別する。",
    "choiceExplanations": {
      "ア": "同じシグネチャのメソッドをサブクラスで再定義するため，設問の処理の置き換えはオーバーライドに当たる。",
      "イ": "オーバーロードは同じメソッド名で引数の型や個数が異なる複数のメソッドを用意することで，条件と異なる。",
      "ウ": "カプセル化は内部のデータや実装を隠し，定めた操作を通じて扱う考え方であり，メソッド再定義の名称ではない。",
      "エ": "継承は上位クラスの性質を引き継ぐ仕組み全体を指し，継承したメソッドの処理を置き換える操作はオーバーライドという。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q5",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "モジュール結合",
    "topicTags": [
      "モジュール結合"
    ],
    "difficulty": 3,
    "question": "あるプログラム言語によるプログラミングの解説書の中に次の記述がある。この記述中の“良いプログラム”がもっている特性はどれか。\n\nこのプログラム言語では，関数を呼び出すときに引数を保持するためにスタックが使用される。オプションの指定によって，引数で受け渡すデータをどの関数からでも参照できる共通域に移して，スタックの使用量を減らすことは可能だが，“良いプログラム”とは見なされないこともある。",
    "choices": {
      "ア": "実行するときのメモリの使用量が，一定以下に必ず収まる。",
      "イ": "実行速度が高速になる。",
      "ウ": "プログラムの一部（関数）を変更しても，他の関数への影響が少ない。",
      "エ": "プログラムのステップ数が少なく，分かりやすい。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。共通域を通して関数が同じデータを参照すると，ある関数での変更が他へ波及しやすい。必要なデータを引数で受け渡し，関数間の依存を小さくすることで変更の影響を抑えられる。",
    "choiceExplanations": {
      "ア": "記述はスタック使用量を減らせても良いとは限らないと述べており，一定以下のメモリ使用量が主題ではない。",
      "イ": "速度の向上を保証する記述ではなく，共通データへの依存によって変更が波及することが問題となる。",
      "ウ": "引数によるデータ受渡しで関数間の結合を弱くすると，関数の変更が他へ与える影響を小さくできる。",
      "エ": "共有領域へ移すだけでステップ数が減ったり理解しやすくなったりするとは限らず，設問の特性を説明しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q6",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "ソフトウェア品質",
    "topicTags": [
      "ソフトウェア品質"
    ],
    "difficulty": 3,
    "question": "ソフトウェアの使用性を向上させる施策として，適切なものはどれか。",
    "choices": {
      "ア": "オンラインヘルプを充実させ，利用方法を理解しやすくする。",
      "イ": "外部インタフェースを見直し，連携できる他システムを増やす。",
      "ウ": "機能を追加し，業務の遂行においてシステムを利用できる範囲を拡大する。",
      "エ": "ファイルの複製を分散して配置し，装置の故障によるファイル損失のリスクを減らす。"
    },
    "answer": "ア",
    "explanation": "正解はア。使用性は，利用者がシステムの使い方を理解し，習得し，操作しやすいかという観点である。オンラインヘルプの充実は，使い方の理解や習得を直接助ける。",
    "choiceExplanations": {
      "ア": "ヘルプで操作方法を理解しやすくすることで，使い方の習得や利用のしやすさという使用性を改善できる。",
      "イ": "他システムとの接続先を増やすことは相互運用などの機能面の改善であり，操作の分かりやすさとは別である。",
      "ウ": "利用できる業務範囲を増やすことは機能面の拡張であり，利用方法を理解しやすくする施策とは異なる。",
      "エ": "複製を分散してデータ損失を防ぐのは信頼性や可用性の改善であり，使用性の改善とは観点が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q7",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "テスト設計",
    "topicTags": [
      "テスト設計"
    ],
    "difficulty": 3,
    "question": "データが昇順に並ぶようにリストへデータを挿入するサブルーチンを作成した。このサブルーチンのテストに用いるデータの組合せのうち，網羅性の観点から適切なものはどれか。ここで，データは左側から順にサブルーチンへ入力する。",
    "choices": {
      "ア": "1，3，2，4",
      "イ": "3，1，4，2",
      "ウ": "3，4，2，1",
      "エ": "4，3，2，1"
    },
    "answer": "イ",
    "explanation": "正解はイ。3で空リストへの挿入，1で先頭への挿入，4で末尾への挿入，2で中間への挿入を試せる。入力の並びを選ぶことで，挿入位置ごとの処理を網羅する。",
    "choiceExplanations": {
      "ア": "空リスト，末尾，中間への挿入は試せるが，既存の先頭より小さい値を入れる先頭挿入が含まれない。",
      "イ": "空リストへの3，先頭への1，末尾への4，中間への2という四つの挿入位置を全て試せる。",
      "ウ": "空リストへの3，末尾への4，先頭への2と1となり，既存データの間に入れる中間挿入がない。",
      "エ": "最初の空リストへの挿入以外は全て先頭挿入になるため，末尾や中間への挿入を試せない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2019a-am2-q8",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "ソフトウェアテスト",
    "topicTags": [
      "ソフトウェアテスト"
    ],
    "difficulty": 3,
    "question": "プログラム実行中の特定の時点で成立すべき変数間の関係や条件を記述した論理式を埋め込んで，そのプログラムの正当性を検証する手法はどれか。",
    "choices": {
      "ア": "アサーションチェック",
      "イ": "コード追跡",
      "ウ": "スナップショットダンプ",
      "エ": "テストカバレッジ分析"
    },
    "answer": "ア",
    "explanation": "正解はア。アサーションは，その時点で成立すべき条件をプログラムに記述するもの。実行時に条件が満たされるかを検査し，不整合や前提違反を検出する。",
    "choiceExplanations": {
      "ア": "成立すべき条件を論理式として埋め込み，実行時に確認する方法がアサーションチェックに合う。",
      "イ": "コード追跡は命令の実行経路や変数の変化をたどる方法であり，条件式を埋め込む手法の名称ではない。",
      "ウ": "スナップショットダンプは特定時点の記憶内容などを記録する方法であり，成立条件を検査する方法とは異なる。",
      "エ": "テストカバレッジ分析は処理や分岐をどの程度実行したかを調べる方法であり，埋込み論理式の検査ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q9",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "リグレッションテスト",
    "topicTags": [
      "リグレッションテスト"
    ],
    "difficulty": 3,
    "question": "組込みシステムのソフトウェア開発におけるリグレッションテストの役割として，適切なものはどれか。",
    "choices": {
      "ア": "実行タイミングや処理性能に対する要件が満たされていることを検証する。",
      "イ": "ソフトウェアのユニットに不具合がないことを確認する。",
      "ウ": "ハードウェアの入手が困難な場合に，シミュレータを用いて検証する。",
      "エ": "プログラムの変更によって，想定外の影響が出ていないかどうかを確認する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。リグレッションテストは，修正や機能追加の後に既存の動作が損なわれていないかを確かめる。変更した箇所以外への副作用や退行を検出することが目的である。",
    "choiceExplanations": {
      "ア": "タイミングや性能の要件を確かめるのは性能面の検証であり，変更後の退行確認というリグレッションの役割とは異なる。",
      "イ": "ユニット内の動作を確認するのはユニットテストの観点であり，変更の副作用を検出する役割の説明ではない。",
      "ウ": "シミュレータの使用はテスト環境の選択であり，リグレッションテストの目的を表していない。",
      "エ": "変更によって既存機能などへ想定外の影響がないかを確かめる点が，リグレッションテストの役割に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q10",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "テスト工程",
    "topicTags": [
      "テスト工程"
    ],
    "difficulty": 3,
    "question": "ソフトウェアライフサイクルプロセスに基づいて実施するシステム開発において，次の実施条件に従って行うテストはどれか。\n\n〔実施条件〕\n①テストの対象\n・構成部品（ユニット，コンポーネント）を結合したソフトウェア品目\n②テスト結果の評価時に考慮する主な基準\n・ソフトウェア品目への要求事項に対するテスト網羅性\n・システム結合及びテストの実現可能性",
    "choices": {
      "ア": "システム結合テスト",
      "イ": "システム適格性確認テスト",
      "ウ": "ソフトウェア結合テスト",
      "エ": "ソフトウェア適格性確認テスト"
    },
    "answer": "エ",
    "explanation": "正解はエ。構成部品を結合したソフトウェア品目について，その要求事項を満たすかを確認する段階なので，ソフトウェア適格性確認テストに当たる。“結合したもの”だけでなく評価基準に着目する。",
    "choiceExplanations": {
      "ア": "システム結合テストはソフトウェア以外も含むシステム要素の結合を扱い，設問の対象と異なる。",
      "イ": "システム全体の要求を満たすかではなく，ソフトウェア品目への要求に対する網羅性を評価している。",
      "ウ": "部品間のインタフェースなどを確認する結合テストではなく，結合後のソフトウェア品目の要求適合を確認している。",
      "エ": "結合済みのソフトウェア品目を対象に，要求事項を満たすかと次のシステム結合への実現可能性を確認する段階である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q11",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "バグ管理",
    "topicTags": [
      "バグ管理"
    ],
    "difficulty": 3,
    "question": "ソフトウェアのテスト工程において，バグ管理図を用いて，テストの進捗状況とソフトウェアの品質を判断したい。このときの考え方のうち，最も適切なものはどれか。",
    "choices": {
      "ア": "テスト工程の前半で予想以上にバグが摘出され，スケジュールが遅れたので，スケジュールの見直しを行い，数日遅れでテスト終了の判断をした。",
      "イ": "テスト項目がスケジュールどおりに消化され，かつ，バグ摘出の累積件数が増加しなければ，ソフトウェアの品質は高いと判断できる。",
      "ウ": "テスト項目消化の累積件数，バグ摘出の累積件数及び未解決バグの件数が変化しなくなった場合は，解決困難なバグに直面しているかどうかを確認する必要がある。",
      "エ": "バグ摘出の累積件数の推移とテスト項目の未消化件数の推移から，テスト終了の時期をほぼ正確に予測できる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。テスト消化もバグ摘出も未解決件数も止まっている場合，品質が安定したとは限らず，障害によって先へ進めない可能性がある。件数の停滞の理由を調べる必要がある。",
    "choiceExplanations": {
      "ア": "スケジュールの見直しと数日の経過だけでは，残る不具合やテスト網羅性を確認できず，終了判断の根拠にならない。",
      "イ": "バグが増えない理由にはテストの観点不足などもあり，予定どおりの消化だけで品質が高いとは断定できない。",
      "ウ": "全ての件数が動かない場合は，解決できない不具合でテストが停滞している可能性を確認する必要がある。",
      "エ": "バグの難しさや残るテストの性質は件数の推移だけでは分からず，終了時期をほぼ正確には予測できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q12",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "人工知能",
    "topicTags": [
      "人工知能"
    ],
    "difficulty": 3,
    "question": "ある通信販売事業者は，人工知能技術を利用して人間のように受け答えする，Webのチャットをインタフェースとしたユーザサポートシステムを開発している。テスト工程では，次の方法でテストする手法を採用した。このような，人工知能に関するテスト手法を何というか。\n\n〔テストの方法〕\n・判定者は，このシステムと人間の二者を相手に自然言語によるチャットを行う。このとき，判定者はどちらがこのシステムで，どちらが人間なのかは知らされていない。\n・判定者が一連のチャットを行った後に，チャットの相手のどちらがこのシステムで，どちらが人間かを判別できるかどうかを確認する。",
    "choices": {
      "ア": "実験計画法",
      "イ": "チューリングテスト",
      "ウ": "ファジング",
      "エ": "ロードテスト"
    },
    "answer": "イ",
    "explanation": "正解はイ。チューリングテストは，相手を直接見ずに対話し，人間と機械を区別できるかを調べる考え方である。設問では正体を伏せたチャットによって識別できるかを確認している。",
    "choiceExplanations": {
      "ア": "実験計画法は要因と結果の関係を効率よく調べる実験の設計方法であり，人間と機械の識別テストではない。",
      "イ": "人間か機械かを伏せた自然言語の対話で，判定者が両者を区別できるかを調べる方法が一致する。",
      "ウ": "ファジングは多様な入力などを与えて異常を検出する方法であり，人間らしい対話の判別を目的としない。",
      "エ": "ロードテストは負荷をかけて性能や動作を確認するテストであり，人間とシステムの識別とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q13",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "アジャイル開発",
    "topicTags": [
      "アジャイル開発"
    ],
    "difficulty": 3,
    "question": "アジャイル開発手法の一つであるスクラムを適用したソフトウェア開発プロジェクトにおいて，KPT手法を用いてレトロスペクティブを行った。KPTにおける三つの視点の組はどれか。",
    "choices": {
      "ア": "Kaizen，Persona，Try",
      "イ": "Keep，Problem，Try",
      "ウ": "Knowledge，Persona，Test",
      "エ": "Knowledge，Practice，Team"
    },
    "answer": "イ",
    "explanation": "正解はイ。KPTは，継続したいことをKeep，問題点をProblem，次に試すことをTryとして整理する振り返りの方法である。良かった点と課題を次の行動へ結び付ける。",
    "choiceExplanations": {
      "ア": "KPTのKはKaizenではなくKeep，PはPersonaではなくProblemを表すため，この組合せではない。",
      "イ": "Keepで続けたいこと，Problemで問題点，Tryで次に試すことを整理する三つの視点が正しい。",
      "ウ": "Knowledge・Persona・Testは，KPTによる振り返りの三つの視点の正式な組合せではない。",
      "エ": "Knowledge・Practice・Teamではなく，継続・問題・試行を表すKeep・Problem・TryがKPTである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q14",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "UML",
    "topicTags": [
      "UML"
    ],
    "difficulty": 3,
    "question": "UMLの図のうち，業務要件定義において，業務フローを記述する際に使用する，処理の分岐や並行処理，処理の同期などを表現できる図はどれか。",
    "choices": {
      "ア": "アクティビティ図",
      "イ": "クラス図",
      "ウ": "状態マシン図",
      "エ": "ユースケース図"
    },
    "answer": "ア",
    "explanation": "正解はア。アクティビティ図は処理の流れを表し，条件分岐や並行する処理，同期なども記述できる。業務をどの順番や条件で進めるかを表す用途に合う。",
    "choiceExplanations": {
      "ア": "業務や処理の流れ，分岐，並行処理の開始や同期を表現するため，業務フローの記述に適している。",
      "イ": "クラス図はクラスの属性や操作，クラス間の関係などの静的構造を表す図であり，業務フローではない。",
      "ウ": "状態マシン図は対象の状態と事象による遷移を中心に示す。設問の業務処理の流れを表す図はアクティビティ図である。",
      "エ": "ユースケース図はアクタとシステムが提供する機能の関係を示し，処理の詳細な分岐や同期を表す図ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q15",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "知的財産契約",
    "topicTags": [
      "知的財産契約"
    ],
    "difficulty": 3,
    "question": "知的財産権使用許諾契約の中で規定する，ランニングロイヤリティの説明はどれか。",
    "choices": {
      "ア": "技術サポートを受ける際に課される料金",
      "イ": "特許技術の開示を受ける際に，最初に課される料金",
      "ウ": "特許の実施実績に応じて額が決まる料金",
      "エ": "毎年メンテナンス費用として一定額課される料金"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ランニングロイヤリティは，特許技術を使った製品の販売数量や売上など，実施実績に応じて算定する使用料である。契約当初の一時金や毎年の定額費用とは区別する。",
    "choiceExplanations": {
      "ア": "技術サポートを受ける対価の説明であり，特許の実施実績に応じて発生する使用料とは異なる。",
      "イ": "技術開示の際の初期の一時金に当たる説明であり，実施実績に応じて算定するランニング方式ではない。",
      "ウ": "特許を実施した実績に連動して料金を決めるという，ランニングロイヤリティの特徴に一致する。",
      "エ": "毎年一定額のメンテナンス費用は，実施実績に応じて料金が変わるランニング方式の説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://tenkai.jaea.go.jp/achievement/warrant/"
    ]
  },
  {
    "id": "sa-2019a-am2-q16",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "知的財産契約",
    "topicTags": [
      "知的財産契約"
    ],
    "difficulty": 3,
    "question": "グラントバックの説明はどれか。",
    "choices": {
      "ア": "異なる分野で特許技術をもつ事業者同士が技術供与協定を締結し，互いに無償で特許の実施権を許諾すること",
      "イ": "自社固有のビジネスモデルに関してビジネスモデル特許を取得した上で，無償で広くその利用を許諾すること",
      "ウ": "ライセンスを受けた者が特許技術を改良して，新たに取得した特許について，ライセンスを与えた者へ譲渡する義務を課すこと",
      "エ": "ライセンスを受けた者が特許技術を改良して，新たに取得した特許は，ライセンスを与えた者に実施権が許諾されること"
    },
    "answer": "エ",
    "explanation": "正解はエ。グラントバックは，ライセンシーの改良技術について，元のライセンサーへ実施を許諾する取決めである。特許権そのものを相手へ譲渡することと，利用を許諾することを区別する。",
    "choiceExplanations": {
      "ア": "事業者が互いの技術を利用できるよう許諾し合うのはクロスライセンスの説明であり，改良技術の許諾とは異なる。",
      "イ": "自社の特許を広く無償で開放する説明であり，許諾を受けた者の改良技術を元の許諾者へ利用させる取決めではない。",
      "ウ": "改良技術の特許権そのものを移転する譲渡義務の説明であり，実施を許諾するという選択肢エとの違いがある。",
      "エ": "ライセンシーの改良技術を元のライセンサーにも利用させる実施許諾の取決めが，グラントバックに合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.jftc.go.jp/dk/guideline/unyoukijun/chitekizaisan_files/chitekizaisangl.pdf"
    ]
  },
  {
    "id": "sa-2019a-am2-q17",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "人工知能",
    "topicTags": [
      "人工知能"
    ],
    "difficulty": 3,
    "question": "ディープラーニングに該当するものはどれか。",
    "choices": {
      "ア": "従来の集合教育に，eラーニングや動画配信などのICT技術を活用した教育を組み合わせて，より深い理解を狙う。",
      "イ": "深層心理学の理論をコンピュータ上のプログラムに実装して，人の行動特性分析や性格診断を行う。",
      "ウ": "多次元データベースにおけるデータ分析の過程で，集計結果を下位レベルに掘り下げてデータ内容を確認し，更に精緻な分析を行う。",
      "エ": "多層構造のニューラルネットワークにおいて，大量のデータを入力することによって，各層での学習を繰り返し，推論や判断を実現する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ディープラーニングは多層のニューラルネットワークを使う機械学習である。学習データから各層のパラメータを調整し，入力から推論や分類などを行う仕組みを得る。",
    "choiceExplanations": {
      "ア": "集合教育とオンライン学習を組み合わせる教育方法の説明であり，機械学習のディープラーニングではない。",
      "イ": "名称の“深層”は深層心理学を指すのではなく，ニューラルネットワークの層の深さに関係する。",
      "ウ": "集計結果を詳細な階層へ掘り下げる操作はドリルダウンであり，ニューラルネットワークの学習とは異なる。",
      "エ": "多層のニューラルネットワークをデータで学習させ，推論や判断に用いるという説明が正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q18",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "プロセッサ",
    "topicTags": [
      "プロセッサ"
    ],
    "difficulty": 3,
    "question": "図はプロセッサによってフェッチされた命令の格納順序を表している。aに該当するプロセッサの構成要素はどれか。",
    "choices": {
      "ア": "アキュムレータ",
      "イ": "データキャッシュ",
      "ウ": "プログラムレジスタ（プログラムカウンタ）",
      "エ": "命令レジスタ"
    },
    "answer": "エ",
    "explanation": "正解はエ。主記憶から取り出した命令は命令レジスタに置かれ，命令デコーダへ渡される。次に取り出す命令のアドレスを保持するプログラムカウンタと，命令そのものを保持するレジスタを区別する。",
    "choiceExplanations": {
      "ア": "アキュムレータは演算結果などを保持するレジスタであり，取り出した命令をデコーダへ渡す場所ではない。",
      "イ": "データキャッシュは主記憶のデータを一時保持してアクセスを高速化するもので，命令を保持するレジスタではない。",
      "ウ": "プログラムカウンタは次に実行する命令のアドレスを保持するもので，フェッチ済みの命令そのものとは異なる。",
      "エ": "フェッチされた命令を一時的に保持し，命令デコーダへ渡す構成要素が命令レジスタである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2019-autumn-am2-q18.png"
    ],
    "imageAltTexts": [
      "主記憶からプロセッサ内のaへ矢印が入り，aから命令デコーダへ矢印が進む構成図。"
    ]
  },
  {
    "id": "sa-2019a-am2-q19",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "仮想記憶",
    "topicTags": [
      "仮想記憶"
    ],
    "difficulty": 3,
    "question": "ページング方式の仮想記憶において，主記憶の1回のアクセス時間が300ナノ秒で，主記憶アクセス100万回に1回の割合でページフォールトが発生し，ページフォールト1回当たり200ミリ秒のオーバヘッドを伴うコンピュータがある。主記憶の平均アクセス時間を短縮させる改善策を，効果の高い順に並べたものはどれか。\n\n〔改善策〕\na 主記憶の1回のアクセス時間はそのままで，ページフォールト発生時の1回当たりのオーバヘッド時間を1/5に短縮する。\nb 主記憶の1回のアクセス時間を1/4に短縮する。ただし，ページフォールトの発生率は1.2倍となる。\nc 主記憶の1回のアクセス時間を1/3に短縮する。この場合，ページフォールトの発生率は変化しない。",
    "choices": {
      "ア": "a，b，c",
      "イ": "a，c，b",
      "ウ": "b，a，c",
      "エ": "c，b，a"
    },
    "answer": "エ",
    "explanation": "正解はエ。元のフォールト負担の平均は200ミリ秒÷100万＝200ナノ秒。aは300＋200/5＝340，bは300/4＋200×1.2＝315，cは300/3＋200＝300ナノ秒。短い順，すなわち改善効果の高い順はc，b，aとなる。",
    "choiceExplanations": {
      "ア": "aの平均340ナノ秒は三案の中で最も長いため，aを最も効果が高いとする並びは誤りである。",
      "イ": "aは340ナノ秒，cは300ナノ秒なので，aをcより効果が高いとする順序は逆になる。",
      "ウ": "bは315ナノ秒だがcは300ナノ秒である。また，aは340ナノ秒なのでcより後になる。",
      "エ": "cが300ナノ秒，bが315ナノ秒，aが340ナノ秒となり，平均時間が短い順のc，b，aが正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2019a-am2-q20",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "システム信頼性",
    "topicTags": [
      "システム信頼性"
    ],
    "difficulty": 3,
    "question": "ホストコンピュータとそれを使用するための2台の端末を接続したシステムがある。ホストコンピュータの故障率をa，端末の故障率をbとするとき，このシステムが故障によって使えなくなる確率はどれか。ここで，端末は1台以上が稼働していればよく，通信回線など他の部分の故障は発生しないものとする。",
    "choices": {
      "ア": "1−(1−a)(1−b²)",
      "イ": "1−(1−a)(1−b)²",
      "ウ": "(1−a)(1−b²)",
      "エ": "(1−a)(1−b)²"
    },
    "answer": "ア",
    "explanation": "正解はア。各機器の故障を独立とみなす設問の計算では，2台の端末が同時に使えない確率はb²。使える確率は，ホストが使える1−aと，端末が1台以上使える1−b²の積になる。その補数が故障確率なので1−(1−a)(1−b²)となる。",
    "choiceExplanations": {
      "ア": "ホストが稼働し，端末が少なくとも1台稼働する確率を全体の1から引くので，この式が故障確率となる。",
      "イ": "(1−b)²は端末2台が両方稼働する確率であり，1台以上が稼働すればよいという条件より厳しい。",
      "ウ": "この式はホストと少なくとも1台の端末が稼働する確率であり，求める使用不能確率の補数である。",
      "エ": "ホストと端末2台が全て稼働する確率であり，端末が1台以上でよい条件にも，使用不能という問いにも合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2019a-am2-q21",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "データベース設計",
    "topicTags": [
      "データベース設計"
    ],
    "difficulty": 3,
    "question": "関数従属{A，B}→Cが完全関数従属性を満たすための条件はどれか。",
    "choices": {
      "ア": "{A，B}→B又は{A，B}→Aが成立していること",
      "イ": "A→B→C又はB→A→Cが成立していること",
      "ウ": "A→C及びB→Cのいずれも成立しないこと",
      "エ": "C→{A，B}が成立しないこと"
    },
    "answer": "ウ",
    "explanation": "正解はウ。CがAとBの組合せに従属していても，Aだけ又はBだけでCが決まるなら部分関数従属となる。完全関数従属となるには，どちらか一方だけではCが決まらないことが必要である。",
    "choiceExplanations": {
      "ア": "属性の組がその構成要素を決めるのは自明な従属であり，Cが組全体を必要とするかどうかを保証しない。",
      "イ": "Aから又はBからCへ従属がたどれるなら，一方だけでCを決められ，完全関数従属の条件に合わない。",
      "ウ": "AだけでもBだけでもCが決まらず，{A，B}全体を使って初めてCが決まるという条件が正しい。",
      "エ": "CからAとBを逆に決められるかどうかは，A又はBの一方だけでCが決まるかという条件とは別である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q22",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "VoIP",
    "topicTags": [
      "VoIP"
    ],
    "difficulty": 3,
    "question": "図は，既存の電話機とPBXを使用した企業内の内線網を，IPネットワークに統合する場合の接続構成を示している。図中のa〜cに該当する装置の適切な組合せはどれか。",
    "choices": {
      "ア": "a：PBX，b：VoIPゲートウェイ，c：ルータ",
      "イ": "a：PBX，b：ルータ，c：VoIPゲートウェイ",
      "ウ": "a：VoIPゲートウェイ，b：PBX，c：ルータ",
      "エ": "a：VoIPゲートウェイ，b：ルータ，c：PBX"
    },
    "answer": "ア",
    "explanation": "正解はア。既存の電話機をまずPBXで収容し，VoIPゲートウェイで音声をIP網に適した形式へ変換する。その先をルータでIPネットワークへ接続するため，aからPBX，VoIPゲートウェイ，ルータの順になる。",
    "choiceExplanations": {
      "ア": "既存の内線をPBXで収容し，VoIPゲートウェイでIP音声へ変換してから，ルータでIP網へ接続する順序が正しい。",
      "イ": "PBXの出力をIP音声へ変換するVoIPゲートウェイより先にルータを置いており，変換の順序が逆である。",
      "ウ": "既存電話機を収容するPBXをVoIPゲートウェイより後に置いており，既存内線網からIP網への接続順序に合わない。",
      "エ": "既存電話機を収容するPBXがIPネットワークの直前になっており，IP音声変換とルーティングの順序に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2019-autumn-am2-q22.png"
    ],
    "imageAltTexts": [
      "電話機からa，b，cの三つの装置を順に経由し，IPネットワークへ接続する図。"
    ]
  },
  {
    "id": "sa-2019a-am2-q23",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "コード署名",
    "topicTags": [
      "コード署名"
    ],
    "difficulty": 3,
    "question": "ディジタル署名のあるソフトウェアをインストールするときに，そのソフトウェアの開発元又は発行元を確認するために使用する証明書はどれか。",
    "choices": {
      "ア": "EV SSL証明書",
      "イ": "クライアント証明書",
      "ウ": "コードサイニング証明書",
      "エ": "サーバ証明書"
    },
    "answer": "ウ",
    "explanation": "正解はウ。コードサイニング証明書は，ソフトウェアの署名に使う公開鍵と発行元の主体との対応を確認するための証明書である。署名を検証し，発行元や改変の有無を確かめる。",
    "choiceExplanations": {
      "ア": "EV SSL証明書はWebサーバなどの主体確認を伴うTLS向けの証明書であり，ソフトウェア署名用とは用途が異なる。",
      "イ": "クライアント証明書は接続してきた利用者や端末などの認証に用いるもので，ソフトウェア発行元の署名用ではない。",
      "ウ": "ソフトウェアのディジタル署名に使う公開鍵と発行元の情報を結び付けるため，設問の確認に用いる。",
      "エ": "サーバ証明書は通信相手のサーバを認証するためのもので，ソフトウェアのコード署名に用いる証明書とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q24",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "暗号化",
    "topicTags": [
      "暗号化"
    ],
    "difficulty": 3,
    "question": "暗号技術のうち，共通鍵暗号方式はどれか。",
    "choices": {
      "ア": "AES",
      "イ": "ElGamal暗号",
      "ウ": "RSA",
      "エ": "楕円曲線暗号"
    },
    "answer": "ア",
    "explanation": "正解はア。AESは暗号化と復号に同じ共通鍵を使う対称鍵暗号である。ElGamal，RSA，楕円曲線暗号は公開鍵暗号の側に分類されるため区別する。",
    "choiceExplanations": {
      "ア": "AESは共通鍵を用いて暗号化・復号を行う方式であり，設問の共通鍵暗号に該当する。",
      "イ": "ElGamal暗号は公開鍵と秘密鍵を使う公開鍵暗号方式であり，共通鍵暗号のAESとは異なる。",
      "ウ": "RSAは公開鍵と秘密鍵の組を使う公開鍵暗号方式であり，共通鍵暗号方式ではない。",
      "エ": "楕円曲線暗号は楕円曲線上の数学的性質を使う公開鍵暗号の技術であり，共通鍵方式とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2019a-am2-q25",
    "exam": "sa",
    "session": "am2",
    "year": 2019,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "OSセキュリティ",
    "topicTags": [
      "OSセキュリティ"
    ],
    "difficulty": 3,
    "question": "セキュアOSを利用することによって期待できるセキュリティ上の効果はどれか。",
    "choices": {
      "ア": "1回の利用者認証で複数のシステムを利用できるので，強固なパスワードを一つだけ管理すればよくなり，脆弱なパスワードを設定しにくくなる。",
      "イ": "Webサイトへの通信路上に配置して通信を解析し，攻撃をブロックすることによって，Webアプリケーションソフトウェアの脆弱性を突く攻撃からWebサイトを保護できる。",
      "ウ": "強制アクセス制御の設定によって，ファイルの更新が禁止されていれば，システムに侵入されてもファイルの改ざんを防止できる。",
      "エ": "システムへのログイン時には，パスワードのほかに専用トークンを用いた認証が行われるので，パスワードが漏えいしても，システムへの侵入を防止できる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。セキュアOSの強制アクセス制御は，管理されたポリシに基づいてファイルなどへの操作を制限する。更新を禁止した対象について，侵入したプロセスの権限による不正な書換えも制限できる。",
    "choiceExplanations": {
      "ア": "一度の認証で複数システムを利用できる説明はシングルサインオンであり，セキュアOSの強制アクセス制御とは異なる。",
      "イ": "通信路上でWebへの攻撃を検査し遮断する説明はWAFであり，OS内でファイル操作を制限する仕組みとは異なる。",
      "ウ": "強制アクセス制御で更新を許さないポリシを適用することで，侵入後のプロセスによる対象ファイルの改ざんを抑止できる。",
      "エ": "パスワードに専用トークンを組み合わせるのは複数要素認証の説明であり，セキュアOS自体の効果ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
