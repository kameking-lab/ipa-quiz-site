// IPA公式冊子から転記。原典・照合記録: ../2014-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const SA_QUESTIONS_2014_AUTUMN_AM2: Question[] = [
  {
    "id": "sa-2014a-am2-q1",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "要求分析モデル",
    "topicTags": [
      "要求分析モデル"
    ],
    "difficulty": 3,
    "question": "ソフトウェアの要求分析や設計に利用されるモデルに関する記述のうち，ペトリネットの説明として，適切なものはどれか。",
    "choices": {
      "ア": "外界の事象をデータ構造として表現する，データモデリングのアプローチをとる。その表現は，エンティティ，関連及び属性で構成される。",
      "イ": "システムの機能を入力データから出力データへの変換とみなすとともに，機能を段階的詳細化に基づき階層的に分割していく。",
      "ウ": "対象となる問題領域に対して，プロセスではなくオブジェクトを用いて解決を図るというアプローチをとる。",
      "エ": "並行して進行する事象間の同期を表す。その構造は2種類の節点をもつ有向2部グラフで表される。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ペトリネットは，プレースとトランジションという2種類の節点を使い，処理の並行動作や同期を表現するモデルである。トークンの配置と移動によって，どの処理が実行できるかを表せる。データの構造や機能の分割を中心とするモデルとは区別する。",
    "choiceExplanations": {
      "ア": "エンティティ・関連・属性によるデータモデリングなので，E-Rモデルの説明に当たる。",
      "イ": "入力から出力への変換として機能を捉え，段階的に分割する構造化分析の考え方に当たる。",
      "ウ": "対象領域をオブジェクトによってモデル化する，オブジェクト指向の分析の説明に当たる。",
      "エ": "2種類の節点で並行する事象や同期を表すという，ペトリネットの構造と用途を示している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q2",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "BPMN",
    "topicTags": [
      "BPMN"
    ],
    "difficulty": 3,
    "question": "要求分析・設計技法のうち，BPMNの説明はどれか。",
    "choices": {
      "ア": "イベント・アクティビティ・分岐・合流を示すオブジェクトと，フローを示す矢印などで構成された図によって，業務プロセスを表現する。",
      "イ": "木構造に基づいた構造化ダイアグラムであり，トップダウンでの機能分割やプログラム構造図，組織図などを表現する。",
      "ウ": "システムの状態が外部の信号や事象に対してどのように推移していくかを図で表現する。",
      "エ": "プログラムをモジュールに分割して表現し，モジュールの階層構造と編成，モジュール間のインタフェースを記述する。"
    },
    "answer": "ア",
    "explanation": "正解はア。BPMNは業務プロセスを表すための図の記法である。作業を示すアクティビティ，開始や終了などのイベント，分岐や合流を示すゲートウェイとフローを組み合わせ，業務の進め方を表現する。",
    "choiceExplanations": {
      "ア": "イベントやアクティビティ，分岐・合流とフローで業務の手順を表すという，BPMNの記法に一致する。",
      "イ": "木構造で機能や組織を階層化する図であり，業務プロセスの流れを表すBPMNの説明ではない。",
      "ウ": "外部の事象に応じた状態の変化を表す状態遷移図の説明であり，BPMNとは異なる。",
      "エ": "プログラムのモジュール構成とインタフェースを表す図の説明であり，業務プロセスの記法ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.omg.org/spec/BPMN/2.0.2/PDF"
    ]
  },
  {
    "id": "sa-2014a-am2-q3",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
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
      "イ": "オブジェクト指向開発のためのパターンとして生成，構造，振る舞いの3カテゴリから構成される。",
      "ウ": "構造，分散システム，対話型システム及び適合型システムの4カテゴリから構成される。",
      "エ": "抽象度が異なる要素を分割して階層化するためのLayers，コンポーネント分割のためのBrokerなどで構成される。"
    },
    "answer": "イ",
    "explanation": "正解はイ。GoFのデザインパターンは，オブジェクトの作り方を扱う生成，クラスやオブジェクトの組立て方を扱う構造，連携や責務の割当てを扱う振る舞いに分類する。特定のプログラミング言語だけに限定されたパターン集ではない。",
    "choiceExplanations": {
      "ア": "Javaに特化したパターンを挙げており，GoFの3カテゴリによる分類の説明ではない。",
      "イ": "生成・構造・振る舞いという，GoFのデザインパターンの分類を正しく挙げている。",
      "ウ": "構造や分散システムなどの分類はアーキテクチャパターンに関するもので，GoFの分類ではない。",
      "エ": "LayersやBrokerはシステムの大きな構成を扱うアーキテクチャパターンであり，GoFの説明とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q4",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "設計レビュー",
    "topicTags": [
      "設計レビュー"
    ],
    "difficulty": 3,
    "question": "内部設計書のデザインレビューを実施する目的として，最も適切なものはどれか。",
    "choices": {
      "ア": "外部設計書との一貫性の検証と要件定義の内容を満たしていることの確認",
      "イ": "設計記述規約の遵守性の評価と設計記述に関する標準化の見直し",
      "ウ": "要件定義の内容に関する妥当性の評価と外部設計指針の見直し",
      "エ": "論理データ設計で洗い出されたデータ項目の確認と物理データ構造の決定"
    },
    "answer": "ア",
    "explanation": "正解はア。内部設計のレビューでは，具体化した設計が上位の外部設計と矛盾せず，要件を満たしているかを確認する。記述規約への適合も確認対象にはなるが，それだけが目的ではない。また，レビューは物理構造を新たに設計する作業そのものではない。",
    "choiceExplanations": {
      "ア": "内部設計が上位の設計や要件と整合しているかを確かめることが，デザインレビューの中心的な目的である。",
      "イ": "記述規約への適合は確認事項の一部だが，規約の見直しだけでは設計内容の正しさを確認できない。",
      "ウ": "要件そのものや外部設計の方針を見直す説明であり，内部設計書を評価する目的とは焦点が異なる。",
      "エ": "データ項目の検討や物理構造の決定は設計作業であり，完成した設計内容をレビューする目的ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q5",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "モジュール強度",
    "topicTags": [
      "モジュール強度"
    ],
    "difficulty": 3,
    "question": "図は，商品の受注処理を行うプログラムのモジュール構成図である。a〜dのうち，機能的強度のモジュールはどれか。",
    "choices": {
      "ア": "a",
      "イ": "b",
      "ウ": "c",
      "エ": "d"
    },
    "answer": "ウ",
    "explanation": "正解はウ。機能的強度は，一つの明確な機能を実現するために要素がまとまっている状態である。cは顧客番号・氏名・住所を入力し，顧客レコードを更新するという一つの機能を行う。他の候補は，異なる処理を時点や実行順などでまとめている。",
    "choiceExplanations": {
      "ア": "初期設定とファイルを開く処理を開始時という同じ時点でまとめており，一つの機能だけへの凝集ではない。",
      "イ": "顧客情報の修正と販売レコードの作成という複数の処理を含んでおり，単一機能のまとまりではない。",
      "ウ": "顧客の各情報を入力して顧客レコードを更新するという，一つの明確な機能に要素がまとまっている。",
      "エ": "販売レコードの更新に加えて監査用の記録も取り，複数の処理を実行順にまとめている。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2014-autumn-am2-q5.png"
    ],
    "imageAltTexts": [
      "受注処理のモジュール構成図。aは初期設定とファイルを開く処理，bは顧客修正と販売レコード作成，cは顧客入力と更新，dは販売更新と監査記録"
    ]
  },
  {
    "id": "sa-2014a-am2-q6",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "レビュー技法",
    "topicTags": [
      "レビュー技法"
    ],
    "difficulty": 3,
    "question": "a〜cの説明に対応するレビューの名称として，適切な組合せはどれか。\n\na　参加者全員が持ち回りでレビュー責任者を務めながらレビューを行うので，参加者全員の参画意欲が高まる。\nb　レビュー対象物の作成者が説明者になり，入力データの値を仮定して，手続をステップごとに机上でシミュレーションしながらレビューを行う。\nc　あらかじめ参加者の役割を決めておくとともに，進行役の議長を固定し，レビューの焦点を絞って迅速にレビュー対象を評価する。",
    "choices": {
      "ア": "a：インスペクション，b：ウォークスルー，c：ラウンドロビン",
      "イ": "a：ウォークスルー，b：インスペクション，c：ラウンドロビン",
      "ウ": "a：ラウンドロビン，b：インスペクション，c：ウォークスルー",
      "エ": "a：ラウンドロビン，b：ウォークスルー，c：インスペクション"
    },
    "answer": "エ",
    "explanation": "正解はエ。責任者を持ち回りにするaはラウンドロビン，作成者の説明に沿って手続をたどるbはウォークスルー，役割や議長を定めて組織的に確認するcはインスペクションである。進行方法と役割の決め方から区別する。",
    "choiceExplanations": {
      "ア": "bは合っているが，責任者が持ち回りのaと，役割を固定して進めるcの名称が入れ替わっている。",
      "イ": "aはラウンドロビン，bはウォークスルー，cはインスペクションなので，この組合せではいずれも対応しない。",
      "ウ": "aは合っているが，作成者が手続を説明するbと，役割を決めるcの名称が逆になっている。",
      "エ": "aは持ち回り，bは作成者による手順の追跡，cは役割を決めた正式な評価であり，三つとも対応している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q7",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "分析設計技法",
    "topicTags": [
      "分析設計技法"
    ],
    "difficulty": 3,
    "question": "ソフトウェアの要件定義や分析・設計で用いられる技法に関する記述のうち，適切なものはどれか。",
    "choices": {
      "ア": "決定表は，条件と処理とを対応させた表形式で論理を表現したものであり，複雑な条件判定を伴う要件定義の記述手段として有効である。",
      "イ": "構造化チャートは，システムの“状態”の種別とその状態が遷移するための“要因”との関係を分かりやすく表現する手段として有効である。",
      "ウ": "状態遷移図は，DFDに“コントロール変換とコントロールフロー”を付加したものであり，制御系システムに特有な処理を表現する手段として有効である。",
      "エ": "制御フロー図は，データの“源泉，吸収，流れ，処理，格納”を基本要素としており，システム内のデータの流れを表現する手段として有効である。"
    },
    "answer": "ア",
    "explanation": "正解はア。決定表は，条件の組合せとそのときに実行する処理を表で整理する。条件が複数ある場合に，判定の抜けや矛盾を点検しやすい。状態の変化を表す図，モジュール構造を表す図，データの流れを表す図は，扱う対象が異なる。",
    "choiceExplanations": {
      "ア": "条件の成立の組合せと実行する処理を対応付けるという，決定表の用途を正しく述べている。",
      "イ": "状態と遷移要因の関係は状態遷移図で表す。構造化チャートはモジュールの構造などを表す。",
      "ウ": "コントロール変換やコントロールフローをDFDへ加える説明は，状態遷移図そのものの説明ではない。",
      "エ": "データの源泉・吸収・流れ・処理・格納を使ってデータの流れを示すのはDFDの説明である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q8",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "ソフトウェア品質",
    "topicTags": [
      "ソフトウェア品質"
    ],
    "difficulty": 3,
    "question": "ソフトウェアの使用性を評価する指標の目標設定の例として，適切なものはどれか。",
    "choices": {
      "ア": "ソフトウェアに障害が発生してから1時間以内に，利用者が使用できること",
      "イ": "利用者が使用したい機能の改善を，1週間以内に実装できること",
      "ウ": "利用者が使用したい機能を，100%提供できていること",
      "エ": "利用者が使用したいソフトウェアの使用方法を，1時間以内に習得できること"
    },
    "answer": "エ",
    "explanation": "正解はエ。使用性は，利用者がソフトウェアを理解し，操作を習得して使いやすいかという観点で評価する。使用方法を習得するまでの時間は，学習のしやすさを測る具体的な指標になる。障害からの復旧や機能の修正の速さとは区別する。",
    "choiceExplanations": {
      "ア": "障害から利用可能になるまでの時間は，信頼性のうち回復のしやすさに関する指標である。",
      "イ": "機能を改善して実装するまでの期間は，ソフトウェアの変更のしやすさという保守性に関する指標である。",
      "ウ": "必要な機能が提供されている割合は機能の充足に関する指標であり，使用方法の分かりやすさではない。",
      "エ": "利用者が操作を身に付けるまでの時間を測っており，使用性のうち習得のしやすさを評価できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q9",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "直交表",
    "topicTags": [
      "直交表"
    ],
    "difficulty": 3,
    "question": "プログラムテストに使用する入力データを，実験計画法に基づいて作成する。入力データには七つの項目があり，それぞれの項目は直交表の0又は1に対応する二者択一の値で構成する。入力データの全パターンをテストするときのテスト回数と，直交表を用いてテストケースを作成するときのテスト回数の組合せはどれか。ここで，直交表は，全ての2列間で0又は1が公平に出現するように作られている。\n\n直交表\n\n| 行番号／列番号 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |\n| 2 | 0 | 0 | 0 | 1 | 1 | 1 | 1 |\n| 3 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |\n| 4 | 0 | 1 | 1 | 1 | 1 | 0 | 0 |\n| 5 | 1 | 0 | 1 | 0 | 1 | 0 | 1 |\n| 6 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |\n| 7 | 1 | 1 | 0 | 0 | 1 | 1 | 0 |\n| 8 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |",
    "choices": {
      "ア": "全パターンのテスト回数：14，直交表でテストケースを作成するときのテスト回数：7",
      "イ": "全パターンのテスト回数：14，直交表でテストケースを作成するときのテスト回数：8",
      "ウ": "全パターンのテスト回数：128，直交表でテストケースを作成するときのテスト回数：7",
      "エ": "全パターンのテスト回数：128，直交表でテストケースを作成するときのテスト回数：8"
    },
    "answer": "エ",
    "explanation": "正解はエ。二者択一の項目が七つあるので，全ての組合せは2の7乗＝128通りである。直交表では1行が一つのテストケースを表し，掲載された8行を使うため8回となる。列は入力項目，行はテストケースという役割を区別する。",
    "choiceExplanations": {
      "ア": "全組合せは2×7ではなく2の7乗であり，直交表のテスト件数も列数の7ではなく行数の8である。",
      "イ": "直交表の8回は正しいが，七つの項目の全ての組合せを数えると128通りとなる。",
      "ウ": "全組合せの128回は正しいが，直交表の7列は入力項目の数であり，テストケースは8行ある。",
      "エ": "全組合せは128通り，直交表によるテストは掲載された8行を使う8回となり，両方とも正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2014a-am2-q10",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "流れ図",
    "topicTags": [
      "流れ図"
    ],
    "difficulty": 3,
    "question": "次の流れ図において，\n\n①→②→③→⑤→②→③→④→②→⑥\n\nの順に実行させるために，①においてmとnに与えるべき初期値aとbの関係はどれか。ここで，a，bはともに正の整数とする。",
    "choices": {
      "ア": "a＝2b",
      "イ": "2a＝b",
      "ウ": "2a＝3b",
      "エ": "3a＝2b"
    },
    "answer": "エ",
    "explanation": "正解はエ。最初に⑤へ進むのでa＜bであり，⑤の後はm＝a，n＝b−aとなる。次に④へ進むのでa＞b−aであり，④の後はm＝2a−b，n＝b−a。最後の②で等しくなるには2a−b＝b−a，すなわち3a＝2bが必要である。a＝2，b＝3なら指定順を確認できる。",
    "choiceExplanations": {
      "ア": "aがbより大きいので，最初の③で④へ進み，指定されている⑤への経路を通らない。",
      "イ": "b＝2aなら最初の⑤の後でmとnが等しくなり，次の③や④を通らずに終了してしまう。",
      "ウ": "a＝1.5bとなって最初からm＞nなので，最初に⑤を通るという条件を満たさない。",
      "エ": "a＝2k，b＝3kとすると，(m,n)は(2k,3k)→(2k,k)→(k,k)と変わり，指定された順に進む。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/sa/2014-autumn-am2-q10.png"
    ],
    "imageAltTexts": [
      "①aをm，bをnへ代入。②mとnが等しければ⑥でmを印字して終了。等しくなければ③で大小比較し，mが大きければ④m−nをm，小さければ⑤n−mをnへ代入し②へ戻る流れ図"
    ]
  },
  {
    "id": "sa-2014a-am2-q11",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "論理型プログラミング",
    "topicTags": [
      "論理型プログラミング"
    ],
    "difficulty": 3,
    "question": "論理型プログラミングにおいて，命題の証明を行うための基本的な操作はどれか。",
    "choices": {
      "ア": "オーバライド",
      "イ": "オーバロード",
      "ウ": "メッセージパッシング",
      "エ": "ユニフィケーション"
    },
    "answer": "エ",
    "explanation": "正解はエ。ユニフィケーションは，変数へ値や項を対応付け，二つの項が一致するようにする操作である。論理型プログラミングでは，問い合わせと規則などの対応を求め，推論を進める基礎になる。クラスのメソッド定義やオブジェクト間の通信とは異なる。",
    "choiceExplanations": {
      "ア": "継承したメソッドをサブクラスで再定義することを指し，項を一致させて推論する操作ではない。",
      "イ": "同じ名前の操作に引数などの異なる定義を用意することを指し，論理型の証明の基本操作ではない。",
      "ウ": "オブジェクトなどの間でメッセージを送り処理を依頼する方法であり，項の照合を行う操作ではない。",
      "エ": "変数への代入などによって項同士を一致させる操作で，規則を用いた推論を進める基礎となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q12",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "開発ライフサイクル",
    "topicTags": [
      "開発ライフサイクル"
    ],
    "difficulty": 3,
    "question": "開発ライフサイクルモデルとして，ウォータフォールモデル，進化的モデル，スパイラルモデルの三つを考える。ソフトウェア保守は，どのモデルを採用したときに必要か。",
    "choices": {
      "ア": "ウォータフォールモデルだけ",
      "イ": "ウォータフォールモデルと進化的モデルだけ",
      "ウ": "ウォータフォールモデルとスパイラルモデルだけ",
      "エ": "ウォータフォールモデル，進化的モデル，スパイラルモデルの全て"
    },
    "answer": "エ",
    "explanation": "正解はエ。開発の進め方がどのモデルであっても，運用開始後には不具合の修正，環境の変化への対応，機能の改善などが必要になる。反復的に開発するモデルでも，運用しているソフトウェアを維持・改善する保守の必要性はなくならない。",
    "choiceExplanations": {
      "ア": "順番に工程を進める開発だけに保守が必要なのではなく，反復的な開発でも運用後の修正や改善は必要となる。",
      "イ": "ウォータフォールと進化的モデルだけでなく，スパイラルモデルにも運用後の保守は必要となる。",
      "ウ": "ウォータフォールとスパイラルモデルだけでなく，進化的モデルでも運用中のソフトウェアの保守は必要である。",
      "エ": "どの開発モデルでも，運用開始後の修正や環境への適応などを行うソフトウェア保守が必要になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q13",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
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
      "エ": "ひとまとまりの要件を単位として設計からテストまでを実施するので，要件ごとに開発状況が把握できる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。ユースケース駆動開発では，利用者に価値をもたらす一連のやり取りを要件の単位とし，分析・設計・実装・テストへつなげる。要件の単位で成果を追えるので，何がどこまで実現できたかを把握しやすい。反復やアーキテクチャ中心の利点とは区別する。",
    "choiceExplanations": {
      "ア": "要求の変化へ対応しやすい点は反復型開発の利点であり，ユースケースを軸にすること固有の説明ではない。",
      "イ": "高いリスクへ早期に対処することは反復やリスクを重視する進め方の利点であり，要件単位の追跡とは異なる。",
      "ウ": "アーキテクチャを中心に据える利点であり，ユースケースに沿って開発を進める利点の説明ではない。",
      "エ": "要件のまとまりを設計からテストまで一貫して追えるため，要件ごとの進捗を把握できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q14",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "投資評価",
    "topicTags": [
      "投資評価"
    ],
    "difficulty": 3,
    "question": "投資効果を現在価値法で評価するとき，最も投資効果の大きい（又は損失の小さい）シナリオはどれか。ここで，期間は3年間，割引率は5%とし，各シナリオのキャッシュフローは表のとおりとする。\n\n単位　万円\n\n| シナリオ | 投資額 | 回収額1年目 | 回収額2年目 | 回収額3年目 |\n| --- | --- | --- | --- | --- |\n| A | 220 | 40 | 80 | 120 |\n| B | 220 | 120 | 80 | 40 |\n| C | 220 | 80 | 80 | 80 |\n| 投資をしない | 0 | 0 | 0 | 0 |",
    "choices": {
      "ア": "A",
      "イ": "B",
      "ウ": "C",
      "エ": "投資をしない"
    },
    "answer": "イ",
    "explanation": "正解はイ。現在価値法では，各年の回収額を(1.05)の年数乗で割って合計し，初期投資220万円を引く。Aは約−5.68万円，Bは約1.40万円，Cは約−2.14万円となる。Bは早い年の回収が多く，正味現在価値が最大で，投資しない場合の0も上回る。",
    "choiceExplanations": {
      "ア": "40／1.05＋80／1.05²＋120／1.05³−220は約−5.68万円であり，Bより小さい。",
      "イ": "120／1.05＋80／1.05²＋40／1.05³−220は約1.40万円で，候補の中で最大となる。",
      "ウ": "80／1.05＋80／1.05²＋80／1.05³−220は約−2.14万円であり，正の値になるBより小さい。",
      "エ": "投資も回収もないので正味現在価値は0である。Bは正の値になるため，Bの方が大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2014a-am2-q15",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "E-Rモデル",
    "topicTags": [
      "E-Rモデル"
    ],
    "difficulty": 3,
    "question": "情報システムの全体計画立案のためにE-Rモデルを用いて全社のデータモデルを作成する手順はどれか。",
    "choices": {
      "ア": "管理層の業務から機能を抽出し，機能をエンティティとする。次に，機能の相互関係に基づいてリレーションシップを定義する。さらに，全社の帳票類を調査して整理し，正規化された項目に基づいて属性を定義し，全社のデータモデルとする。",
      "イ": "企業の全体像を把握するために，主要なエンティティだけを抽出し，それらの相互のリレーションシップを含めて，鳥瞰図を作成する。次に，エンティティを詳細化し，全てのリレーションシップを明確にしたものを全社のデータモデルとする。",
      "ウ": "業務層の現状システムを分析し，エンティティとリレーションシップを抽出する。それぞれについて適切な属性を定め，これらを基にE-R図を作成し，それを抽象化して，全社のデータモデルを作成する。",
      "エ": "全社のデータとその処理過程を分析し，重要な処理を行っている業務を基本エンティティとする。次に，基本エンティティ相互のデータの流れをリレーションシップとして捉え，適切な識別名を与える。さらに，基本エンティティと関係のあるデータを属性とし，全社のデータモデルを作成する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。全社のデータモデルを作るときは，企業全体の主要なエンティティと関係を大きく把握し，そこから必要な詳細を加えていく。E-Rモデルのエンティティは管理対象となる実体であり，業務の機能や処理そのものをそのまま置き換えるものではない。",
    "choiceExplanations": {
      "ア": "業務の機能をそのままエンティティにしており，処理のモデルとデータのモデルを混同している。",
      "イ": "主要な実体と関係によって全体像を捉え，それを詳細化する手順なので，全社のデータモデルの作成に適している。",
      "ウ": "現状の業務層のシステムから出発して抽象化する手順であり，全社の全体像から詳細化する計画の手順ではない。",
      "エ": "処理を行う業務を実体，データの流れを関係としており，E-Rモデルと処理・データフローのモデルを混同している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q16",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "非機能要件",
    "topicTags": [
      "非機能要件"
    ],
    "difficulty": 3,
    "question": "非機能要件項目はどれか。",
    "choices": {
      "ア": "新しい業務の在り方や運用に関わる業務手順，入出力情報，組織，責任，権限，業務上の制約などの項目",
      "イ": "新しい業務の遂行に必要なアプリケーションシステムに関わる利用者の作業，システム機能の実現範囲，機能間の情報の流れなどの項目",
      "ウ": "経営戦略や情報戦略に関わる経営上のニーズ，システム化・システム改善を必要とする業務上の課題，求められる成果・目標などの項目",
      "エ": "システム基盤に関わる可用性，性能，拡張性，運用性，保守性，移行性，セキュリティ，システム環境などの項目"
    },
    "answer": "エ",
    "explanation": "正解はエ。非機能要件は，システムが提供する個別の機能に加えて，どの程度の性能や可用性を備えるか，どう運用・保守するかなどの品質や制約を定める。機能の内容，業務の進め方，経営上の目的を表す要求とは分けて整理する。",
    "choiceExplanations": {
      "ア": "業務の手順や組織・責任など，新しい業務をどのように実施するかという業務要件に関する項目である。",
      "イ": "利用者の作業やシステム機能の範囲など，アプリケーションが何を行うかを表す機能要件に関する項目である。",
      "ウ": "経営上のニーズやシステム化の目的・成果を示す項目であり，システムの品質や運用条件の項目ではない。",
      "エ": "可用性・性能・保守性・セキュリティなど，機能以外に満たすべき品質や条件を具体的に挙げている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q17",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "DFD",
    "topicTags": [
      "DFD"
    ],
    "difficulty": 3,
    "question": "エンタープライズアーキテクチャにおいて，ビジネスアーキテクチャの成果物である機能情報関連図（DFD）を説明したものはどれか。",
    "choices": {
      "ア": "業務・システムの処理過程において，情報システム間でやり取りされる情報の種類及び方向を図式化したものである。",
      "イ": "業務を構成する各種機能を，階層化した3行3列の格子様式に分類して整理し，業務・システムの対象範囲を明確化したものである。",
      "ウ": "最適化計画に基づき決定された業務対象領域の全情報（伝票，帳票，文書など）を整理し，各情報間の関連及び構造を明確化したものである。",
      "エ": "対象の業務機能に対して，情報の発生源と到達点，処理，保管，それらの間を流れる情報を，統一記述規則に基づいて表現したものである。"
    },
    "answer": "エ",
    "explanation": "正解はエ。DFDは，情報をどこから受け取り，どの処理を行い，どこへ保管・出力するかをデータの流れで表す。外部との接点，処理，データストア，データフローを使い，業務機能と情報の関係をモデル化する。",
    "choiceExplanations": {
      "ア": "情報システム間の情報交換の種類や方向を示す説明であり，業務機能の処理や保管まで表すDFDの説明ではない。",
      "イ": "機能を格子様式で分類し対象範囲を整理する機能構成図の説明であり，情報の流れを表す図ではない。",
      "ウ": "情報の関連や構造を整理する情報体系の説明であり，業務の処理を通じた情報の流れを表すDFDとは異なる。",
      "エ": "発生源・到達点・処理・保管とそれらの間の情報の流れという，DFDの構成要素を正しく示している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q18",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "業務モデリング",
    "topicTags": [
      "業務モデリング"
    ],
    "difficulty": 3,
    "question": "システム化計画立案時に，全社レベルの業務モデルを作成するときの留意点はどれか。",
    "choices": {
      "ア": "業務モデルとしてビジネスプロセスとデータクラスとの関係を明らかにするために，データクラスに含まれるデータ項目を詳細にしておく必要がある。",
      "イ": "業務モデルは企業活動のモデルでもあるので，ビジネスプロセスには，日常業務レベルの活動だけでなく意思決定活動や戦略計画活動も含む必要がある。",
      "ウ": "業務モデルは企業活動を正確に表現するので，データクラス間に存在しているデータの重複はそのまま反映しておく必要がある。",
      "エ": "業務モデルは全社情報システム構築の基本構造となるものなので，ビジネスプロセスはその企業の現行のプロセスをそのまま反映させる必要がある。"
    },
    "answer": "イ",
    "explanation": "正解はイ。全社レベルの業務モデルは，日常の処理だけでなく，企業として意思決定し戦略を立てる活動も対象にする。計画段階では企業全体の活動と情報の関係を捉え，個々のデータ項目の詳細や現行システムの都合にとらわれすぎないようにする。",
    "choiceExplanations": {
      "ア": "全社の概観を捉える段階で，データ項目を全て詳細化しておくことは必須ではない。",
      "イ": "企業全体の活動を表すには，現場の日常業務に加えて管理や戦略に関する活動も含める必要がある。",
      "ウ": "現行のデータの重複をそのままモデルへ残す必要はなく，業務上の意味に基づいて整理・統合する。",
      "エ": "将来のシステム化を計画するモデルなので，改善の余地がある現行プロセスをそのまま固定する必要はない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q19",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "キャッシュメモリ",
    "topicTags": [
      "キャッシュメモリ"
    ],
    "difficulty": 3,
    "question": "アクセス時間10ナノ秒のキャッシュメモリとアクセス時間50ナノ秒の主記憶を使用した処理装置において，主記憶の実効メモリアクセス時間が25ナノ秒以下になるためには，キャッシュメモリのヒット率が少なくとも何%あればよいか。",
    "choices": {
      "ア": "50",
      "イ": "60",
      "ウ": "70",
      "エ": "80"
    },
    "answer": "ウ",
    "explanation": "正解はウ。キャッシュを調べる10ナノ秒に加え，ミスしたときだけ主記憶の50ナノ秒が必要となる。ヒット率をhとすると，平均は10＋50(1−h)。これが25以下になる条件は50h≧35，つまりh≧0.7なので，少なくとも70%必要である。",
    "choiceExplanations": {
      "ア": "ヒット率50%なら10＋50×0.5＝35ナノ秒となり，目標の25ナノ秒を超える。",
      "イ": "ヒット率60%なら10＋50×0.4＝30ナノ秒となり，目標の25ナノ秒を超える。",
      "ウ": "ヒット率70%なら10＋50×0.3＝25ナノ秒となり，目標を満たす最小の割合となる。",
      "エ": "ヒット率80%なら20ナノ秒で目標を満たすが，70%でも満たすので最小ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2014a-am2-q20",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "RPC",
    "topicTags": [
      "RPC"
    ],
    "difficulty": 3,
    "question": "WebブラウザやHTTPを用いず，独自のGUIとデータ転送機構を用いた，ネットワーク対戦型のゲームを作成する。仕様の(2)の実現に用いることができる仕組みとして，適切なものはどれか。\n\n〔仕様〕\n(1) ゲームは囲碁や将棋のように2人のプレーヤの間で行われ，ゲームの状態はサーバで管理する。プレーヤはそれぞれクライアントプログラムを操作してゲームに参加する。\n(2) プレーヤが新たな手を打ったとき，クライアントプログラムはサーバにある関数を呼び出す。サーバにある関数は，その手がルールに従っているかどうかを調べて，ルールに従った手であればゲームの状態を変化させ，そうでなければその手が無効であることをクライアントプログラムに知らせる。\n(3) ゲームの状態に変化があれば，サーバは各クライアントプログラムにその旨を知らせることによってGUIに反映させる。",
    "choices": {
      "ア": "CGI",
      "イ": "PHP",
      "ウ": "RPC",
      "エ": "XML"
    },
    "answer": "ウ",
    "explanation": "正解はウ。RPCはRemote Procedure Callで，ネットワーク上の別の計算機の手続や関数を呼び出す仕組みである。クライアントからサーバ上の関数を呼び出し，そこで手の妥当性を検査して結果を返すという仕様(2)に適する。",
    "choiceExplanations": {
      "ア": "Webサーバから外部プログラムを呼び出すための仕組みであり，設問の独自の通信による遠隔関数呼出しとは異なる。",
      "イ": "プログラミング言語の名称であり，サーバの関数をネットワーク越しに呼び出す仕組みそのものではない。",
      "ウ": "別の計算機にある関数や手続を呼び出す仕組みなので，サーバ上の関数を呼ぶという仕様に対応する。",
      "エ": "データの構造を記述するためのマークアップ言語であり，遠隔の関数を実行する仕組みではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q21",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "UMLクラス図",
    "topicTags": [
      "UMLクラス図"
    ],
    "difficulty": 3,
    "question": "階層構造をもつ組織と社員の所属を表すUMLのクラス図のうち，“社員は組織階層中のどの組織にも所属できるが，兼務はしない”とするものはどれか。",
    "choices": {
      "ア": "アのクラス図",
      "イ": "イのクラス図",
      "ウ": "ウのクラス図",
      "エ": "エのクラス図"
    },
    "answer": "エ",
    "explanation": "正解はエ。社員から見た所属先の組織の多重度が1なら，一人の社員は一つの組織にだけ所属する。組織の自己関連は上位が0..1，下位が*なので，最上位の組織や複数の下位組織を表せる。所属を組織全体に関連付ければ，上位・末端を問わず所属先にできる。",
    "choiceExplanations": {
      "ア": "社員の所属先が末端組織だけに関連付けられており，上位組織にも所属できるという条件を満たさない。",
      "イ": "社員から見た組織側の多重度が*なので，複数の組織に所属できてしまい，兼務しないという条件に合わない。",
      "ウ": "社員から見た組織側の多重度が*で，兼務を許す。また，組織間の階層関係を表す自己関連もない。",
      "エ": "所属先の組織側が1で兼務を認めず，組織の自己関連で階層を表し，どの組織にも所属できる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2014-autumn-am2-q21.png"
    ],
    "imageAltTexts": [
      "ア〜エの四つのUMLクラス図。組織の階層関係，上位組織と末端組織の継承関係，組織と社員の所属関連，両端の多重度を示す"
    ]
  },
  {
    "id": "sa-2014a-am2-q22",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "データベース回復",
    "topicTags": [
      "データベース回復"
    ],
    "difficulty": 3,
    "question": "データベースに媒体障害が発生したときの回復法はどれか。",
    "choices": {
      "ア": "障害発生時，異常終了したトランザクションをロールバックする。",
      "イ": "障害発生時点でコミットしていたがデータベースの実更新がされていないトランザクションをロールフォワードする。",
      "ウ": "障害発生時点でまだコミットもアボートもしていなかった全てのトランザクションをロールバックする。",
      "エ": "バックアップコピーでデータベースを復元し，バックアップ取得以降にコミットした全てのトランザクションをロールフォワードする。"
    },
    "answer": "エ",
    "explanation": "正解はエ。記録媒体が壊れた場合は，まず別に保存したバックアップからデータベースを戻す。次にログを使い，バックアップ後に確定した更新を再実行するロールフォワードで，確定済みの状態まで回復する。未確定の更新は回復後の状態へ確定分として反映しない。",
    "choiceExplanations": {
      "ア": "一つの異常終了した処理を取り消すだけでは，媒体から失われたデータベース全体を復元できない。",
      "イ": "確定済み更新の再実行は回復処理の一部だが，媒体障害では元となるデータベースをバックアップから戻す必要がある。",
      "ウ": "未確定の更新を取り消すだけでは，故障した媒体にあった確定済みのデータを回復できない。",
      "エ": "バックアップによる復元と，その後の確定済み更新のログによる再実行を組み合わせた媒体障害の回復法である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q23",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 23,
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
    "explanation": "正解はア。既存の電話機は構内交換機であるPBXへ接続する。その音声や信号をVoIPゲートウェイでIP通信へ変換し，ルータを通してIPネットワークへ接続する。既存の電話網側とIP側の間に変換装置を置く順序を確認する。",
    "choiceExplanations": {
      "ア": "電話機からPBX，音声をIPへ変換するVoIPゲートウェイ，IP通信を転送するルータの順で接続する。",
      "イ": "ルータはIP通信を扱うので，電話網側からの通信は先にVoIPゲートウェイで変換してから渡す必要がある。",
      "ウ": "既存の電話機をPBXへ接続する構成が前提なので，aをゲートウェイ，bをPBXにする順序は合わない。",
      "エ": "電話網側のPBXをIPネットワークの直前へ置いており，既存の電話機とPBXを使う接続の順序に合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2014-autumn-am2-q23.png"
    ],
    "imageAltTexts": [
      "電話機からa，b，cを順に経由してIPネットワークへ接続する構成図"
    ]
  },
  {
    "id": "sa-2014a-am2-q24",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "WAF",
    "topicTags": [
      "WAF"
    ],
    "difficulty": 3,
    "question": "WAFに登録された検出パターンと判定の関係のうち，適切なものはどれか。",
    "choices": {
      "ア": "ブラックリスト方式では，正常な通信の検出パターンがブラックリストに登録されており，通信がブラックリストに該当しないとき，不正な通信と判定する。",
      "イ": "ブラックリスト方式では，不正な通信の検出パターンがブラックリストに登録されており，通信がブラックリストに該当しないとき，不正な通信と判定する。",
      "ウ": "ホワイトリスト方式では，正常な通信の検出パターンがホワイトリストに登録されており，通信がホワイトリストに該当しないとき，不正な通信と判定する。",
      "エ": "ホワイトリスト方式では，不正な通信の検出パターンがホワイトリストに登録されており，通信がホワイトリストに該当しないとき，正常な通信と判定する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ホワイトリスト方式は，許可する正常な通信のパターンを登録し，それに一致しない通信を不正として扱う。ブラックリスト方式は，既知の不正なパターンを登録し，それに一致する通信を不正とする。何を登録し，一致・不一致のどちらを拒否するかを整理する。",
    "choiceExplanations": {
      "ア": "ブラックリストに登録するのは不正なパターンであり，正常なパターンを登録するという前提が逆である。",
      "イ": "不正なパターンを登録する点は正しいが，不正と判定するのはそのパターンに一致したときである。",
      "ウ": "正常と認めるパターンだけを許可し，それに一致しないものを不正とするホワイトリストの判定に一致する。",
      "エ": "ホワイトリストは正常なパターンを登録する方式であり，不正なパターンを登録するという前提が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2014a-am2-q25",
    "exam": "sa",
    "session": "am2",
    "year": 2014,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "ファジング",
    "topicTags": [
      "ファジング"
    ],
    "difficulty": 3,
    "question": "脆弱性検査手法の一つであるファジングはどれか。",
    "choices": {
      "ア": "既知の脆弱性に対するシステムの対応状況に注目し，システムに導入されているソフトウェアのバージョン及びパッチの適用状況の検査を行う。",
      "イ": "ソフトウェアのデータの入出力に注目し，問題を引き起こしそうなデータを大量に多様なパターンで入力して挙動を観察し，脆弱性を見つける。",
      "ウ": "ソフトウェアの内部構造に注目し，ソースコードの構文を機械的にチェックするホワイトボックス検査を行うことによって脆弱性を見つける。",
      "エ": "ベンダや情報セキュリティ関連機関が提供するセキュリティアドバイザリなどの最新のセキュリティ情報に注目し，ソフトウェアの脆弱性の検査を行う。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ファジングは，想定外の値や形式などを含む多様な入力を与え，異常終了などの挙動を観察して問題を探す手法である。入力の処理に潜む不具合を実行によって見つける点で，バージョン照合やソースコードの静的な検査とは異なる。",
    "choiceExplanations": {
      "ア": "既知の脆弱性に対するバージョンや修正パッチの照合であり，多様な入力を実行して挙動を調べる手法ではない。",
      "イ": "問題を起こしそうな入力を多数与え，実際の挙動から脆弱性を見つけるというファジングの説明である。",
      "ウ": "ソースコードを静的に調べる検査の説明であり，入力を与えて動作を観察するファジングとは異なる。",
      "エ": "公開された脆弱性情報との照合に基づく検査であり，多様な入力を生成・実行して問題を探す手法ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
