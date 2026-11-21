import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2024_SENMON_DIGITAL: Question[] = [
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q11",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "複合主キーとデータベースの正規形",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "次の表は、どのレベルまでの正規形の条件を満たしているか。\n\nただし、下線で示しているのは主キーである。",
    "choices": {
      "ア": "第一正規形",
      "イ": "第二正規形",
      "ウ": "第三正規形",
      "エ": "第四正規形",
      "オ": "いずれの条件も満たさない。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "伝票番号と明細番号の組が品番などを決め、主キーの一部への依存はないため、第二正規形を満たす。品名が品番を介して主キーに推移的に依存するので、第三正規形には達しない。",
    "choiceExplanations": {
      "ア": "各欄に値が一つずつ入っているため、第一正規形を満たす。非キー属性は伝票番号と明細番号の組に依存し、主キーの一部だけで決まらないので、第二正規形も満たす。",
      "イ": "伝票番号と明細番号の組が品番などを決め、主キーの一部への依存はないため、第二正規形を満たす。品名が品番を介して主キーに推移的に依存するので、第三正規形には達しない。",
      "ウ": "品名は伝票番号と明細番号の組から直接というより、非キー属性である品番で決まる。この推移的な関数従属性が残るため、第三正規形を満たさない。",
      "エ": "第四正規形では、候補キーで決まらない非自明な多値従属性を排除する。ここではその前に、品番から品名が決まる非キー属性間の関数従属性が残っている。",
      "オ": "表の各欄は品番や数量など単一の値を持ち、同一欄に値の集合を入れていない。このため少なくとも第一正規形を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 11。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-digital/q11.webp"
    ],
    "imageAltTexts": [
      "伝票番号、明細番号、品番、品名、数量の表。伝票番号と明細番号に主キーを示す下線がある"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q14",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "オーダ記法と漸近的な上界",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "漸近的記法（オーダ記法）に関する次の記述又は式のうち、成立しない場合があるものはどれか。\nただし、選択肢中に表れる f(n)、g(n) はいずれも実関数であり、a と b はいずれも n に依存しない正の整数とする。",
    "choices": {
      "ア": "f(n) = O(f(n))",
      "イ": "f(n) = O(n^a) ならば f(n) = O(n^(a+1))",
      "ウ": "f(n) = O(n^a) かつ g(n) = O(n^b) ならば f(n)・g(n) = O(n^(a+b))",
      "エ": "f(n) + g(n) = O(max{f(n), g(n)})",
      "オ": "f(n) − g(n) = O(f(n))"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "公式正答はこの肢であり、例えば f(n) = n、g(n) = n² とすると、差の絶対値は n² − n となる。nをどれだけ大きな固定定数倍にしても、この差を上から抑えられない。",
    "choiceExplanations": {
      "ア": "f(n)の絶対値は、自身の絶対値の1倍以下である。そのため定数倍による漸近上界の定義を満たす。",
      "イ": "n ≥ 1で n^a ≤ n^(a+1) なので、n^aの定数倍で抑えられる関数は、同じ定数を使って n^(a+1) でも抑えられる。",
      "ウ": "fとgがそれぞれ n^a と n^b の定数倍で抑えられるなら、積の絶対値は二つの定数の積を用いて n^(a+b) の定数倍で抑えられる。",
      "エ": "公式正答ではこの肢は選ばれておらず、fとgが非負なら f + g ≤ 2 max{f, g} により成立する。問題文どおり負の値を取る実関数まで許すと、f(n) = −n、g(n) = −1 の場合は通常の絶対値による定義で成立しない。",
      "オ": "公式正答はこの肢であり、例えば f(n) = n、g(n) = n² とすると、差の絶対値は n² − n となる。nをどれだけ大きな固定定数倍にしても、この差を上から抑えられない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 14。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q15",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "C言語の再帰呼出し",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次の関数 f について、f(4, 1, 2) の戻り値はいくらか。\n\nint f(int a, int b, int c) {\n    if (a == 0) return b;\n    return f(a - 1, b + 2 * c, b);\n}",
    "choices": {
      "ア": "10",
      "イ": "11",
      "ウ": "17",
      "エ": "21",
      "オ": "31"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "呼出しは f(4, 1, 2) → f(3, 5, 1) → f(2, 7, 5) → f(1, 17, 7) → f(0, 31, 17) と進む。a が0になった最後の呼出しが b の31を返す。",
    "choiceExplanations": {
      "ア": "再帰呼出しごとに a は1減り、引数 b は1、5、7、17、31と更新される。a が0になったときの b は10ではない。",
      "イ": "第3引数には、その回で更新される前の b が渡る。たとえば f(3, 5, 1) の次は f(2, 7, 5) になるので、更新後の値を戻してはいけない。",
      "ウ": "17は f(1, 17, 7) の第2引数として途中に現れる。a がまだ1なので、もう一度呼び出してから値を返す。",
      "エ": "終了の直前は f(1, 17, 7) である。次の b は17に7の2倍を加えた31であり、21にはならない。",
      "オ": "呼出しは f(4, 1, 2) → f(3, 5, 1) → f(2, 7, 5) → f(1, 17, 7) → f(0, 31, 17) と進む。a が0になった最後の呼出しが b の31を返す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 15。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q16",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "XORゲートの段数と否定",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "図のような、入力として a と1をもつ35個の XOR ゲートがカスケード状に接続された回路において、出力 z を表した論理式として正しいのはどれか。",
    "choices": {
      "ア": "z = a",
      "イ": "z = ā",
      "ウ": "z = 0",
      "エ": "z = 1",
      "オ": "出力が発振するため、論理式で表せない。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "XORでは a ⊕ a = 0 であり、同じaの入力が2回なら互いに打ち消す。35回ではaが1回ぶん残るので、出力は 1 ⊕ a = ā となる。",
    "choiceExplanations": {
      "ア": "aとのXORは、a = 0なら出力を保ち、a = 1なら反転する。段数が35と奇数なので、最初の1とのXORの結果が最後に残り、aの否定となる。",
      "イ": "XORでは a ⊕ a = 0 であり、同じaの入力が2回なら互いに打ち消す。35回ではaが1回ぶん残るので、出力は 1 ⊕ a = ā となる。",
      "ウ": "出力が0となるのは a = 1 の場合である。a = 0 なら各段で前段の値が保たれ、最初の1がそのまま出力される。",
      "エ": "a = 0 のときは1が出力されるが、a = 1 のときは各段で反転する。35回は奇数なので、a = 1 なら出力は0になる。",
      "オ": "各段の出力は次の段に進むだけで、出力を入力に戻す経路はない。入力が一定であれば回路は論理式に従う値を出力する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 16。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-digital/q16.webp"
    ],
    "imageAltTexts": [
      "最初に1が入り、各段のもう一方の入力にaが入る35段のXORゲート回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q17",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "情報基礎",
    "topicTags": [
      "ANSI/SPARCの三層スキーマ",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "外部スキーマ、概念スキーマ、内部スキーマから成る ANSI/SPARC 3層スキーマモデルに関する次の記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　データベース管理システムがサポートすべきアーキテクチャを示す。\n㋑　実世界をデータモデリングした結果得られるものが外部スキーマである。\n㋒　データモデリングの結果得られたデータモデルを記憶装置上にどのような形式で格納するかを表現したものが内部スキーマである。\n㋓　データベース管理システムがこの3層スキーマを堅持することにより、物理的データ、論理的データの独立を達成することができる。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒、㋓",
      "エ": "㋑、㋒",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐・㋒・㋓が妥当である。三層に分けて利用者からの見え方、データ全体の論理構造、物理的な格納方法を区別するため、各層の変更が他の層へ波及しにくい。",
    "choiceExplanations": {
      "ア": "㋐は正しいが、実世界をモデル化したデータ全体の構造は概念スキーマで表す。外部スキーマは利用者やアプリケーションごとの見え方を定義する。",
      "イ": "㋐と㋓は妥当である。㋑の内容は概念スキーマに当たり、内部スキーマによる格納形式を述べた㋒も含める必要がある。",
      "ウ": "㋐・㋒・㋓が妥当である。三層に分けて利用者からの見え方、データ全体の論理構造、物理的な格納方法を区別するため、各層の変更が他の層へ波及しにくい。",
      "エ": "㋒の内部スキーマは記憶装置への格納方法を示すため妥当である。㋑は概念スキーマと外部スキーマを取り違えている。",
      "オ": "㋒は格納方法、㋓はデータ独立性の説明として妥当である。このモデルがデータベース管理システムのアーキテクチャを示すという㋐も正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 17。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q18",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "デジタル署名・証明書・署名鍵",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "デジタル署名とその応用に関する次の記述㋐～㋓のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　代表的なデジタル署名方式としては、素因数分解の困難性に基づく RSA 署名や、離散対数問題の困難性に基づく DSA 署名がある。\n㋑　署名に用いる秘密鍵は署名者が、署名の検証に用いる公開鍵は検証者が生成する。\n㋒　PKI においては、サーバ証明書の改ざんを防ぐため、サーバ証明書にはサーバがデジタル署名を付加する。\n㋓　ある契約書にデジタル署名を付加すると、用いられるハッシュ関数の一方向性により、その契約書の内容を秘匿することができる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑、㋓",
      "ウ": "㋐、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐のみ妥当である。RSA署名とDSA署名は代表的な公開鍵署名方式で、整数の素因数分解や離散対数に関連する計算上の困難性を前提としている。",
    "choiceExplanations": {
      "ア": "㋐のみ妥当である。RSA署名とDSA署名は代表的な公開鍵署名方式で、整数の素因数分解や離散対数に関連する計算上の困難性を前提としている。",
      "イ": "㋐は妥当だが、㋑では署名鍵と検証鍵を別々の人が生成するとしている。これらは対応する鍵の組であり、㋓にいう契約書の秘匿も署名の機能には含まれない。",
      "ウ": "㋐の署名方式の説明は妥当である。PKIのサーバ証明書には発行する認証局が署名するので、㋒でいうサーバ自身による署名は一般の認証局発行の証明書とは異なる。",
      "エ": "公開鍵は署名に使う秘密鍵と対になっており、検証者が独自に生成するものではない。デジタル署名付きの契約書も暗号化しなければ、内容を読むことができる。",
      "オ": "認証局は発行するサーバ証明書に署名し、検証者はその署名を確認できる。契約書への署名は改変の検出などに使うもので、内容の秘匿には暗号化などが必要である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 18。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q19",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "サイバーフィジカルシステム",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "次の記述で説明されるものとして最も妥当なのはどれか。\n\n「実世界に存在する様々なデータをセンサ・ネットワーク等で収集し、コンピュータの計算能力を用いたデータ処理技術によってそれを定量的に分析・解析し、その結果を実世界にフィードバックすることで産業の活性化や社会問題の解決などを図る。」",
    "choices": {
      "ア": "Digital Twin",
      "イ": "Internet of Things（IoT）",
      "ウ": "Digital Transformation（DX）",
      "エ": "Cyber-Physical System（CPS）",
      "オ": "FinTech"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "CPSはセンサ等で現実空間のデータを収集し、サイバー空間で分析した結果を現実へ還元するシステムである。この両方向の連携が記述に当てはまる。",
    "choiceExplanations": {
      "ア": "デジタルツインは、現実の設備や現象をデータで仮想空間に再現するモデルを指す。記述は計算と現実へのフィードバックを連携させる仕組み全体を説明している。",
      "イ": "IoTは機器やセンサなどの物をネットワークにつなぐ仕組みである。データによる分析と、その結果を現実の制御や改善に戻す機能までをまとめた概念はCPSである。",
      "ウ": "DXは、デジタル技術を使って業務や事業、社会の仕組みを変える取組を広く指す。記述はその中でも現実空間と計算処理を結び付けて循環させる仕組みを述べている。",
      "エ": "CPSはセンサ等で現実空間のデータを収集し、サイバー空間で分析した結果を現実へ還元するシステムである。この両方向の連携が記述に当てはまる。",
      "オ": "FinTechはデジタル技術を活用した金融サービスやその革新を指す。記述は金融に限らず、実世界で収集したデータを分析して戻す仕組みに着目している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 19。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q20",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "情報と社会",
    "topicTags": [
      "マイナンバーの検査用数字",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "マイナンバーでは11桁の番号について、次の規則で検査用数字 C を決めている。\n\n・Pₙ：11桁の番号を右から数えたときの n 桁目の数字\n・Qₙ = { 1 ≤ n ≤ 6 のとき n + 1、7 ≤ n ≤ 11 のとき n − 5 }\n・C = 11 − (Σₙ₌₁¹¹ (Pₙ × Qₙ) mod 11)\n　ただし、(Σₙ₌₁¹¹ (Pₙ × Qₙ) mod 11) ≤ 1 の場合は、C = 0 とする。\n\nこの規則に従うと、例えば11桁の番号が 89001234567 のとき、C = 0 となる。\nこのとき、C = 0 とならないのは次のうちではどれか。",
    "choices": {
      "ア": "89001234267",
      "イ": "89001234527",
      "ウ": "89001234561",
      "エ": "89001235567",
      "オ": "89001236567"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "例に比べて右から4桁目が4から5に変わり、この桁の重みは5である。加重和は 199 + 5 = 204、11で割った余りは6なので C = 11 − 6 = 5 となる。",
    "choiceExplanations": {
      "ア": "例から変わったのは右から3桁目で、重みは4である。加重和は 199 + (2 − 5) × 4 = 187 となり、11で割り切れるので C = 0 である。",
      "イ": "例に比べ、右から2桁目が6から2へ変わっている。重みは3なので加重和は 199 − 12 = 187 となり、余り0から C = 0 となる。",
      "ウ": "例に比べて一の位が7から1に変わり、重みは2である。このため加重和は 199 − 12 = 187 となり、余り0なので C = 0 である。",
      "エ": "例に比べて右から4桁目が4から5に変わり、この桁の重みは5である。加重和は 199 + 5 = 204、11で割った余りは6なので C = 11 − 6 = 5 となる。",
      "オ": "例に比べて右から4桁目が4から6へ変わっている。加重和は 199 + 2 × 5 = 209 であり、11で割り切れるため C = 0 となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q23",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "計算機科学",
    "topicTags": [
      "形式文法と生成できる語",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "{a} を終端記号の集合、{S, T, U} を非終端記号の集合、R を生成規則の集合、S を始記号とした形式文法 G = ({S, T, U}, {a}, R, S) を考える。また、R は以下の規則からなるものとする。\n\nR = { S → aaTaa, T → S, T → aU, T → aUa, U → a }\n\n次に示す語㋐～㋓のうち、文法 G により生成される語のみを挙げているのはどれか。\n㋐　aaaaa\n㋑　aaaaaa\n㋒　aaaaaaa\n㋓　aaaaaaaa",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "S → aaTaa のあと T → aU または T → aUa を選び、U → a とすると、aがそれぞれ6個または7個の語となる。T → S で再帰すると長さは4ずつ増えるため、候補では㋑と㋒が生成できる。",
    "choiceExplanations": {
      "ア": "㋑は T → aU と U → a を使うと生成できる。最初の S → aaTaa でaが4個付き、Tから終端記号を少なくとも2個生成するため、5文字の㋐は生成できない。",
      "イ": "㋒は T → aUa によって生成できる。Tは少なくとも2文字分になるので、Sから始めた語は最短でも6文字となり、㋐は生成できない。",
      "ウ": "㋐は最短の6文字より短い。㋓について、再帰しない場合は6か7文字、T → S で再帰した場合は少なくとも10文字になるため、8文字は作れない。",
      "エ": "S → aaTaa のあと T → aU または T → aUa を選び、U → a とすると、aがそれぞれ6個または7個の語となる。T → S で再帰すると長さは4ずつ増えるため、候補では㋑と㋒が生成できる。",
      "オ": "㋑は再帰せずに生成できる。再帰しない場合に作れる語は6文字か7文字で、再帰すると4文字以上増えるので、8文字の㋓は作れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q24",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "CMOSスイッチと入力の選択",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "デジタル回路において、単純な回路や論理素子そのものは、図Ⅰに示す n 型と p 型の MOSFET（それぞれ nMOS、pMOS と呼ぶ。）を相補的に利用した CMOS（complementary MOS）によって構成される。nMOS はゲート端子の電位が高いとき、また pMOS はゲート端子の電位が低いときに、ソース端子とドレイン端子間が導通する。\n\nこの CMOS を用いて構築された、A、B、C を入力、X を出力とする図Ⅱの回路の働きを表した論理式として最も妥当なのはどれか。\nただし、高電位を1、低電位を0とする正論理を前提とする。また、選択肢中の「・」は論理積、「＋」は論理和をそれぞれ表す。",
    "choices": {
      "ア": "A・B ＋ C",
      "イ": "A・C ＋ B・C̄",
      "ウ": "A・C̄ ＋ B・C",
      "エ": "(A ＋ C)・(B ＋ C̄)",
      "オ": "(A ＋ C̄)・(B ＋ C)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "公式正答は、C = 0 でA、C = 1 でBを選ぶ A・C̄ ＋ B・C である。選択肢4もCに0と1を代入するとそれぞれAとBになり、論理的に同値である。",
    "choiceExplanations": {
      "ア": "この式は C = 1 ならAとBの値にかかわらず1となる。回路では C = 1 のときBの経路が導通し、出力はBになる。",
      "イ": "この式は C = 0 でB、C = 1 でAを選ぶ。図の回路は逆に、C = 0 で上側のA、C = 1 で下側のBを選ぶ。",
      "ウ": "公式正答は、C = 0 でA、C = 1 でBを選ぶ A・C̄ ＋ B・C である。選択肢4もCに0と1を代入するとそれぞれAとBになり、論理的に同値である。",
      "エ": "C = 0 を代入するとA、C = 1 を代入するとBになり、この式は公式正答の選択肢3と論理的に同値である。公開冊子の正答番号表には3が掲載されている。",
      "オ": "この式は C = 0 でB、C = 1 でAになる。図の回路では C = 0 でA、C = 1 でBになるため、選ぶ入力が逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-digital/q24-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-digital/q24-2.webp"
    ],
    "imageAltTexts": [
      "図Ⅰ、nMOSとpMOSのゲート、ソース、ドレインを記した回路記号",
      "図Ⅱ、三つの入力A・B・Cから出力Xを得るCMOS回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q25",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "フリップフロップの状態遷移",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "二つの D フリップフロップ、OR ゲート、XOR ゲートを図のように結線した順序回路があり、D フリップフロップの初期状態が Q₀ = 0、Q₁ = 0 であるとする。この順序回路にクロックパルスを入力していくとき、D フリップフロップの状態が Q₀ = 0、Q₁ = 0 に戻る最少のクロックパルスの入力回数に関する記述として最も妥当なのはどれか。",
    "choices": {
      "ア": "最少の入力回数は1回である。",
      "イ": "最少の入力回数は2回である。",
      "ウ": "最少の入力回数は3回である。",
      "エ": "最少の入力回数は4回である。",
      "オ": "何回入力しても Q₀ = 0、Q₁ = 0 には戻らない。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "各パルスで次の Q₀ は Q₁ と Q₀ の否定のOR、次の Q₁ は Q₀ と Q₁ のXORで決まる。状態は (0, 0) → (1, 0) → (0, 1) → (1, 1) → (1, 0) と進むため、初期状態へ戻らない。",
    "choiceExplanations": {
      "ア": "初期状態では Q₀ の否定が1で Q₁ が0なので、ORの出力は1となる。1回目のクロックで (Q₀, Q₁) は (1, 0) となる。",
      "イ": "1回目の (1, 0) では、次の Q₀ に入るORの出力は0、次の Q₁ に入るXORの出力は1である。2回目の状態は (0, 1) となる。",
      "ウ": "2回目の (0, 1) では、ORの入力の少なくとも一方が1で、XORの二入力は異なる。このため3回目の状態は (1, 1) となる。",
      "エ": "3回目の (1, 1) では、ORの出力は1、XORの出力は0になる。4回目は (1, 0) に戻り、それ以降は同じ遷移を繰り返す。",
      "オ": "各パルスで次の Q₀ は Q₁ と Q₀ の否定のOR、次の Q₁ は Q₀ と Q₁ のXORで決まる。状態は (0, 0) → (1, 0) → (0, 1) → (1, 1) → (1, 0) と進むため、初期状態へ戻らない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-digital/q25.webp"
    ],
    "imageAltTexts": [
      "二つのDフリップフロップにORゲートとXORゲートを接続した順序回路"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q26",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "DRAM・SRAMとフラッシュメモリ",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "メモリに関する記述として、誤っているのはどれか。",
    "choices": {
      "ア": "主記憶には DRAM、キャッシュメモリには SRAM がそれぞれ用いられる場合が多い。",
      "イ": "SRAM は、データ保持のためリフレッシュと呼ばれる操作が定期的に必要である。",
      "ウ": "フラッシュメモリは、電源の供給が途絶えてもデータが保持される。",
      "エ": "NAND 型と NOR 型のフラッシュメモリでは、NAND 型の方が実装密度が高い。",
      "オ": "フラッシュメモリには、一つのメモリセルで2ビット以上の値（多値）を記録する実装もある。"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "定期的なリフレッシュが必要なのは、コンデンサに蓄えた電荷が時間とともに漏れるDRAMである。SRAMは回路の安定状態を利用するため、電源が供給されている間はリフレッシュなしで値を保持する。",
    "choiceExplanations": {
      "ア": "DRAMは回路が比較的単純で高密度化しやすく、主記憶によく使われる。アクセスが速いSRAMは、プロセッサと主記憶の間にあるキャッシュに適している。",
      "イ": "定期的なリフレッシュが必要なのは、コンデンサに蓄えた電荷が時間とともに漏れるDRAMである。SRAMは回路の安定状態を利用するため、電源が供給されている間はリフレッシュなしで値を保持する。",
      "ウ": "フラッシュメモリは不揮発性メモリに分類される。電源が途絶えても、セルに記録した状態を保持する。",
      "エ": "NAND型は複数のメモリセルを直列につないで配線や接点を減らせる。NOR型に比べて高密度に実装しやすく、記憶容量の大きな装置に適する。",
      "オ": "セルが区別できる状態を4段階にすれば、1セルで2ビットを表せる。さらに多くの段階を使って3ビット以上を記録するフラッシュメモリもある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q27",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "情報工学（ハードウェア）",
    "topicTags": [
      "2の補数とビットシフト",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "A が n 桁の2の補数表現で表された、2^(n−2) 未満の任意の正の数であるとき、A − Ā と同じ結果が得られる演算として最も妥当なのはどれか。\n\nただし、Ā は A をビット反転したものを表すものとする。また、減算は2の補数表現で表された負値の加算により行うものとし、演算結果は A と同じく n 桁の2の補数で表すものとする。なお、選択肢中の「≪」、「≫」はシフト演算子であり、「x ≪ m」及び「x ≫ m」はそれぞれ、x の m ビット左シフト、m ビット右シフトを表すものとする。",
    "choices": {
      "ア": "(A ≫ 1) − 1",
      "イ": "A ≫ 1",
      "ウ": "(A ≫ 1) ＋ 1",
      "エ": "(A ≪ 1) − 1",
      "オ": "(A ≪ 1) ＋ 1"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "2の補数表現で Ā = −A − 1 だから、A − Ā = 2A ＋ 1 である。条件により符号付きn桁で表せる範囲に収まり、左シフトした値に1を加えれば得られる。",
    "choiceExplanations": {
      "ア": "正の整数を右に1ビットシフトすると2で割った商になる。ビット反転した Ā は −A − 1 なので、求める結果は 2A ＋ 1 であり、右シフトでは得られない。",
      "イ": "A ≫ 1 は正の数Aを2で割った整数商である。A − Ā は A ＋ (A ＋ 1) になるため、Aを2倍するには左シフトを使う。",
      "ウ": "1を足す操作は合っているが、先にAを2倍にする必要がある。右シフトの商に1を足しても、求める 2A ＋ 1 とは異なる。",
      "エ": "左シフトで2Aになる点は合っている。ビット反転した数は −A − 1 なので、それを引くと定数項は −1 ではなく ＋1 になる。",
      "オ": "2の補数表現で Ā = −A − 1 だから、A − Ā = 2A ＋ 1 である。条件により符号付きn桁で表せる範囲に収まり、左シフトした値に1を加えれば得られる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q28",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "ストアアンドフォワードとスループット",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "ホスト X 及び Y がルータ R を介して接続されているとする。X-R 間のバンド幅が10 Mbps、R-Y 間のバンド幅が5 Mbpsであり、各リンクのレイテンシは22 msであるとする。\nいま、X から Y に30 KBのサイズのデータを伝送するに当たり、このファイルを二つのパケット a、b に分割して送信するものとし、a のパケット長が10 KBであるとする。このとき、X-Y 間の実効スループットとして最も妥当なのはどれか。\nただし、ルータはストアアンドフォワード方式であるとする。また、使用するプロトコル等によるデータサイズ及びメッセージ数の増加やオーバーヘッドは考慮しなくてよいものとする。",
    "choices": {
      "ア": "1.5 Mbps",
      "イ": "1.7 Mbps",
      "ウ": "2.07 Mbps",
      "エ": "2.4 Mbps",
      "オ": "2.6 Mbps"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "aは30 msでRに全部届き、RからYへの送信は16 msを要する。Rでbの受信が完了する46 msから32 msかけてbを送り、伝搬の22 msを加えた時刻100 msまでにYへ240 kbitが届くので、2.4 Mbpsとなる。",
    "choiceExplanations": {
      "ア": "二つのパケットの伝送は、別々のリンク上で一部並行する。受信終了までの所要時間は100 msであり、240 kbitを1.5 Mbpsで送る場合の160 msもかからない。",
      "イ": "XからRへの送信は10 KBに8 ms、20 KBに16 msを要する。Rにはそれぞれ30 ms、46 msで全体が届き、それに合わせて次のリンクへ転送できる。",
      "ウ": "2.07 Mbpsは、各リンクの伝送時間を全て直列に足し、伝搬遅延44 msを加えた116 msで割った値に近い。実際には最初のパケットのRからYへの伝送と、次のパケットのXからRへの伝送が並行する。",
      "エ": "aは30 msでRに全部届き、RからYへの送信は16 msを要する。Rでbの受信が完了する46 msから32 msかけてbを送り、伝搬の22 msを加えた時刻100 msまでにYへ240 kbitが届くので、2.4 Mbpsとなる。",
      "オ": "仮に2.6 Mbpsなら240 kbitを受け取るまで約92 msとなる。最初のパケットをRで全部受け取る時間や、次のパケットのRからYへの伝搬時間を含めると100 msかかる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q29",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "信号処理における線形性",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "ある四つのシステムに、信号 x(t) を入力したとき、それぞれ次の出力㋐～㋓が得られた。このうち、線形システムとして妥当なもののみを挙げているのはどれか。\n\n㋐　x(t) ＋ 1\n㋑　2x(t)\n㋒　{x(t)}²\n㋓　dx(t)/dt",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋒",
      "オ": "㋑、㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "定数倍の㋑と微分の㋓は、入力の線形結合に対して出力も同じ係数の線形結合になる。定数の加算や入力を二乗する処理はこの条件を満たさない。",
    "choiceExplanations": {
      "ア": "㋑の定数倍は線形である。㋐はゼロの信号を入力しても定数1を返すので、線形写像であるための条件を満たさない。",
      "イ": "㋐は定数を加えるため、入力をゼロにしても出力がゼロにならない。㋒では入力を2倍にすると出力が4倍となり、同次性を満たさない。",
      "ウ": "微分である㋓は線形であるが、㋐は定数項を含む。ゼロ信号の入力に対してゼロ信号が出力されないため、㋐は線形ではない。",
      "エ": "㋑の2倍は加法性と同次性を満たす。㋒の二乗では、信号の和を二乗したときに交差項が生じるため、加法性を満たさない。",
      "オ": "定数倍の㋑と微分の㋓は、入力の線形結合に対して出力も同じ係数の線形結合になる。定数の加算や入力を二乗する処理はこの条件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q30",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "C言語での回文判定",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次の関数は、与えられた（'\\0' で終端された）空でない文字列について、それが回文であれば非ゼロを、回文でなければゼロを返す関数である。㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n\nint isPalindrome(const char *s) {\n    char *p;\n\n    for (p = s; *p; p++)\n        ;\n    for (p--; s < p ［㋐］ *s == *p; s++, p--)\n        ;\n    return ［㋑］;\n}",
    "choices": {
      "ア": "㋐：&&　㋑：s > p",
      "イ": "㋐：&&　㋑：s >= p",
      "ウ": "㋐：&&　㋑：s == p",
      "エ": "㋐：||　㋑：s > p",
      "オ": "㋐：||　㋑：s >= p"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "s < p の間だけ左右の文字を比べ、一致した場合だけ内側に進むので条件は && となる。奇数長では中央で一致し、偶数長では交差するため、判定は s >= p である。",
    "choiceExplanations": {
      "ア": "奇数文字の回文では、左右から比較したポインタが中央の同じ文字に達する。そこで s == p となるため、s > p だけでは回文を検出できない。",
      "イ": "s < p の間だけ左右の文字を比べ、一致した場合だけ内側に進むので条件は && となる。奇数長では中央で一致し、偶数長では交差するため、判定は s >= p である。",
      "ウ": "s == p だけを判定すると、奇数文字の回文には対応できるが、偶数文字の回文では中央でポインタが交差する。例えば「aa」は回文でも s == p を満たさない。",
      "エ": "論理和では s < p であれば二つの文字が違っていてもループが続く。また、奇数文字の回文で中央に達すると s == p となるので、s > p だけでは足りない。",
      "オ": "s >= p はポインタが中央で出会う場合と交差する場合を捉えられる。ループ条件が論理和だと左右の文字が異なっても続くため、論理積で両条件を同時に確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q31",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "Pythonのリストと排他的論理和",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "Pythonで記述された次のプログラムによって出力される値はいくらか。\n\nm = [False, False, False, True]\nn = len(m)\n\ndef f(a):\n    global n\n    s = a[-n] ^ a[-1]\n    a.append(s)\n\nfor i in range(2**n-n-1):\n    f(m)\n\nprint(sum(m))",
    "choices": {
      "ア": "6",
      "イ": "7",
      "ウ": "8",
      "エ": "9",
      "オ": "10"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "n が4なので関数は11回呼ばれ、Trueを1とすると追加される値は順に 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1 である。ここに初期リストのTrueを一つ加えると、sum(m) は8になる。",
    "choiceExplanations": {
      "ア": "n は最初のリスト長4で、その後も変わらない。各回で末尾と末尾から4番目の排他的論理和を加えると、最終的なTrueの個数は6ではなく8になる。",
      "イ": "初期状態ですでにTrueが一つ含まれる。新しく追加される11個のうちTrueは7個なので、リスト全体の和は8である。",
      "ウ": "n が4なので関数は11回呼ばれ、Trueを1とすると追加される値は順に 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1 である。ここに初期リストのTrueを一つ加えると、sum(m) は8になる。",
      "エ": "Falseを0、Trueを1として合計する。追加されるのはTrueが7個、Falseが4個で、初期リストのTrueは1個なので9にはならない。",
      "オ": "計算は二つの値の排他的論理和なので、どちらもTrueのときはFalseが追加される。実際に11回の追加を追うとTrueは7個で、全体では8個である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q32",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "情報工学（ソフトウェア）",
    "topicTags": [
      "アジャイル開発の価値と反復",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "アジャイル開発に関する記述㋐～㋓のうち、誤っているのはどれか。\n\n㋐　アジャイル開発とは、変化に迅速に対応するための軽量な開発プロセスの総称であり、特定の一つの開発手法を指すものではない。\n㋑　アジャイル開発においては、包括的な文書よりも動くソフトウェアにより価値を置く。\n㋒　アジャイル開発には顧客のニーズに応えやすいというメリットがある。\n㋓　アジャイル開発では計画・設計・実行・テストの工程を短い開発期間に反復する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋑",
      "ウ": "㋒",
      "エ": "㋓",
      "オ": "該当なし"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "㋐から㋓は、いずれもアジャイル開発の考え方や一般的な進め方として妥当である。誤りに当たる記述がないので「該当なし」を選ぶ。",
    "choiceExplanations": {
      "ア": "アジャイル開発は変化に対応する開発の考え方や実践の総称である。特定の手法だけを指さないという㋐に誤りはない。",
      "イ": "「包括的なドキュメントよりも動くソフトウェア」はアジャイルソフトウェア開発宣言に示された価値である。動く成果を優先するとした㋑は妥当である。",
      "ウ": "短い間隔で成果を示し、顧客から反応を得て開発に反映できる。顧客ニーズの変化に対応しやすいという㋒は利点の一つである。",
      "エ": "短い間隔で計画や開発、テストを繰り返すのは、反復型のアジャイル開発でよく見られる進め方である。したがって㋓は妥当である。",
      "オ": "㋐から㋓は、いずれもアジャイル開発の考え方や一般的な進め方として妥当である。誤りに当たる記述がないので「該当なし」を選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q33",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "ハミング符号とシンドローム",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "誤り訂正符号の一つであるハミング符号に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　（7, 4）ハミング符号は組織符号であり、必ず符号語の先頭に情報ビットが並ぶ。\n㋑　（7, 4）ハミング符号では、符号語7ビットのうち1ビットの誤りが生じた場合に、これを検出し訂正することができる。（15, 11）ハミング符号では、符号語15ビットのうち高々2ビットの誤りが生じた場合に、これを検出し訂正することができる。\n㋒　パリティ検査行列が次式で与えられる（15, 11）ハミング符号において、受信語が（111000000000001）であるとき、送信した符号語は（110000000000001）であったと推定される。\n\nH =\n［1 1 1 1 0 1 1 1 0 0 0 1 0 0 0］\n［1 1 1 0 1 1 0 0 1 1 0 0 1 0 0］\n［1 1 0 1 1 0 1 0 1 0 1 0 0 1 0］\n［1 0 1 1 1 0 0 1 0 1 1 0 0 0 1］",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "受信語で1になっている第1・2・3・15列をビットごとの排他的論理和で加えると、Hの第3列と同じ (1, 1, 0, 1) になる。1ビット誤りと仮定して第3ビットを反転すると、㋒の符号語が得られる。",
    "choiceExplanations": {
      "ア": "ハミング符号は情報ビットをそのまま含む組織符号として構成できる。情報ビットの位置は構成に依存するので、必ず先頭に並ぶという記述は異なる。",
      "イ": "㋐では情報ビットが先頭に並ぶと限定している点が誤りである。㋑の（15, 11）ハミング符号も、2ビット誤りまで訂正できるわけではない。",
      "ウ": "（7, 4）ハミング符号の1ビット誤り訂正の説明は妥当である。（15, 11）も最小距離が3なので、確実に訂正できるのは1ビット誤りまでである。",
      "エ": "㋒は妥当だが、㋑は（15, 11）の訂正能力を過大に述べている。2ビット誤りで生じたシンドロームが別の1ビット誤りと同じになる場合がある。",
      "オ": "受信語で1になっている第1・2・3・15列をビットごとの排他的論理和で加えると、Hの第3列と同じ (1, 1, 0, 1) になる。1ビット誤りと仮定して第3ビットを反転すると、㋒の符号語が得られる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q34",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "画像の射影変換と座標の倍率",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "2次元画像が与えられたとき、画像上の点 (x, y) は次式で表される射影変換によって他の画像上の点 (x′, y′) に変換される。\n\ns［x′, y′, 1］ᵀ = H［x, y, 1］ᵀ = ［［h₁₁, h₁₂, h₁₃］, ［h₂₁, h₂₂, h₂₃］, ［h₃₁, h₃₂, h₃₃］］［x, y, 1］ᵀ\n\nこの変換はスケール s について不定性があるため、(x′, y′) は次の式で求められる。\n\nx′ = (h₁₁x ＋ h₁₂y ＋ h₁₃)/(h₃₁x ＋ h₃₂y ＋ h₃₃)、y′ = (h₂₁x ＋ h₂₂y ＋ h₂₃)/(h₃₁x ＋ h₃₂y ＋ h₃₃)\n\n図Ⅰの画像を行列 H₁、H₂、H₃ で変換すると図Ⅱ、Ⅲ、Ⅳのいずれかの画像に変換される。このとき、行列と図の対応関係として最も妥当なのはどれか。\nなお、変換後の画像中で元画像の領域外に対応する画素は黒で表されている。",
    "choices": {
      "ア": "H₁：図Ⅱ　H₂：図Ⅲ　H₃：図Ⅳ",
      "イ": "H₁：図Ⅱ　H₂：図Ⅳ　H₃：図Ⅲ",
      "ウ": "H₁：図Ⅲ　H₂：図Ⅱ　H₃：図Ⅳ",
      "エ": "H₁：図Ⅲ　H₂：図Ⅳ　H₃：図Ⅱ",
      "オ": "H₁：図Ⅳ　H₂：図Ⅱ　H₃：図Ⅲ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "H₂ではH₁に対して第2行だけがほぼ半分となり、縦方向が縮む図Ⅳになる。H₃では第2・3行がほぼ2倍で第1行は同じなので、横方向が縮む図Ⅱとなり、H₁は図Ⅲである。",
    "choiceExplanations": {
      "ア": "H₁を基準にすると、H₃では第1行は同じで第2・3行がおおむね2倍になる。分母も2倍になるため横方向が半分となり、右に黒い領域がある図ⅡがH₃に当たる。",
      "イ": "H₂の第2行はH₁のおおむね半分で、第1・3行は同じなので、縦方向だけが圧縮された図Ⅳに当たる。一方、右に黒い領域がある図Ⅱは、横方向が圧縮されたH₃である。",
      "ウ": "H₁の図Ⅲは合っている。H₂では分母が変わらず y′ の分子だけがほぼ半分になるため、横に縮んだ図Ⅱではなく縦に縮んだ図Ⅳに対応する。",
      "エ": "H₂ではH₁に対して第2行だけがほぼ半分となり、縦方向が縮む図Ⅳになる。H₃では第2・3行がほぼ2倍で第1行は同じなので、横方向が縮む図Ⅱとなり、H₁は図Ⅲである。",
      "オ": "H₃ではH₁に比べて分母と y′ の分子がほぼ2倍で、x′ の分子は同じである。したがって横だけ縮み、右が黒くなる図ⅡにH₃が対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-digital/q34-1.webp",
      "/questions/kokka-sogo-dai/2024/senmon-digital/q34-2.webp",
      "/questions/kokka-sogo-dai/2024/senmon-digital/q34-3.webp"
    ],
    "imageAltTexts": [
      "図Ⅰ、変換前の建物の画像",
      "図Ⅱ、図Ⅲ、図Ⅳの変換後画像",
      "射影変換に用いる3つの行列H₁、H₂、H₃"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q35",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "ハイブリッド暗号の処理速度と暗号文",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "公開鍵暗号と共通鍵暗号を併用するハイブリッド暗号に関する記述㋐、㋑、㋒のうち、妥当なもののみを全て挙げているのはどれか。\n\n㋐　公開鍵暗号のみを用いるよりも、暗号化のスピードが速い。\n㋑　共通鍵暗号のみを用いるよりも、暗号化に必要な鍵が短い。\n㋒　共通鍵暗号のみを用いるよりも、暗号文が長い。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐と㋒が妥当である。大量のデータは共通鍵で速く暗号化できる一方、共通鍵を保護して届けるための暗号文などが加わり、共通鍵暗号単独より全体が長くなる。",
    "choiceExplanations": {
      "ア": "データ本体を高速な共通鍵暗号で処理するので、㋐は妥当である。暗号化した共通鍵なども送るため、共通鍵暗号だけの場合より暗号文が長くなるという㋒も妥当である。",
      "イ": "㋐は妥当だが、共通鍵暗号部分に必要な鍵の長さが短くなるわけではない。ハイブリッド方式ではこの共通鍵に加え、鍵の保護に公開鍵暗号の鍵が必要である。",
      "ウ": "㋐と㋒が妥当である。大量のデータは共通鍵で速く暗号化できる一方、共通鍵を保護して届けるための暗号文などが加わり、共通鍵暗号単独より全体が長くなる。",
      "エ": "ハイブリッド暗号では共通鍵を公開鍵で保護するので、共通鍵が短くなるという関係はない。鍵長は用いる方式と必要な安全性に応じて選ぶ。",
      "オ": "㋒の追加データによる長さの増加は妥当である。㋑は共通鍵暗号の鍵がハイブリッド化によって短くなるとしている点で異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q36",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "クラウドサービスのIaaS・PaaS・SaaS",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "企業におけるクラウドサービスの利用における事例㋐、㋑、㋒のうち、各事例においてそれぞれの企業が採用するクラウドアーキテクチャの組合せとして最も妥当なのはどれか。\n\n㋐　販売履歴をもとに需要予測を行う社内向け分析ツールを既存の機械学習ライブラリを用いて内製し、各販売店で利用可能なサービスとしてクラウドを介して展開した。\n㋑　自社で開発したゲームエンジンをミドルウェアとしてクラウド上に配備し、その上で新作のオンラインゲームをリリースした。\n㋒　経理業務の効率化のために、ネットワークを介して提供されるクラウド型会計ソフトウェアを導入した。",
    "choices": {
      "ア": "㋐：IaaS　㋑：SaaS　㋒：PaaS",
      "イ": "㋐：PaaS　㋑：IaaS　㋒：SaaS",
      "ウ": "㋐：PaaS　㋑：SaaS　㋒：IaaS",
      "エ": "㋐：SaaS　㋑：IaaS　㋒：PaaS",
      "オ": "㋐：SaaS　㋑：PaaS　㋒：IaaS"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "問われるのは各企業がクラウドから何を利用するかである。㋐は開発・実行基盤に自作アプリを置くPaaS、㋑は自社でミドルウェアを置けるIaaS、㋒は完成したアプリを利用するSaaSに当たる。",
    "choiceExplanations": {
      "ア": "㋑では既製のアプリを使うのではなく、基盤に自社のゲームエンジンを配備するため、SaaSは妥当でない。㋒では開発基盤を使うのではなく、提供済みの会計アプリを使う。",
      "イ": "問われるのは各企業がクラウドから何を利用するかである。㋐は開発・実行基盤に自作アプリを置くPaaS、㋑は自社でミドルウェアを置けるIaaS、㋒は完成したアプリを利用するSaaSに当たる。",
      "ウ": "㋐では実行基盤に自社で作った分析ツールを置くPaaSが妥当である。㋑はゲームエンジンを自社で載せるIaaS、㋒は会計ソフトをそのまま使うSaaSに当たる。",
      "エ": "㋑は自社のミドルウェアを配備するIaaSに適する。㋐は分析ツールを自社で作っており、㋒こそ完成した会計ソフトを使うSaaSである。",
      "オ": "㋐は企業が分析ツールを開発する側なので、利用者として完成品を導入するSaaSではない。㋒はサーバ等を借りるIaaSではなく、会計ソフト自体を利用するSaaSである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q37",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "情報技術",
    "topicTags": [
      "線形SVMとマージン最大化",
      "Ⅱ部・選択必須問題"
    ],
    "difficulty": 3,
    "question": "xy 平面上の点として、正例である点 P₁、P₂、…、Pₘ（m個）と、負例である点 N₁、N₂、…、Nₙ（n個）が教師データとして与えられた。これより、未知データとして与えられた点が正例・負例のいずれのグループに属するかを分類するサポートベクタマシンを構成したい。\n\nただし、関数 f(x, y) = ax ＋ by ＋ c として、教師データの全ての正例の点が f(x, y) ＞ 0 と、全ての負例の点が f(x, y) ＜ 0 となるような定数 a、b、c が存在するとする。\n\nこのとき、\n・正例の点のうち関数 f(x, y) の値を最小にする Pᵢ = (xᵢ, yᵢ) について f(xᵢ, yᵢ) = 1\n・負例の点のうち関数 f(x, y) の値を最大にする Nⱼ = (xⱼ, yⱼ) について f(xⱼ, yⱼ) = −1\nとなるように a、b、c を定めると、未知の点が正例・負例のいずれのグループに属するかを f(x, y) の符号で分類できる。ここで、Pᵢ、Nⱼ はサポートベクタと呼ばれる。\n\nサポートベクタマシンを適切に構成するには、直線 f(x, y) = 0 とサポートベクタとの距離をできるだけ大きく取るのがよい。すると、この問題は、正例の点について f(x, y) ≥ 1、負例の点について f(x, y) ≤ −1 を満たす変数 a、b、c の最適化問題に帰着する。帰着される問題として最も妥当なのはどれか。",
    "choices": {
      "ア": "a² ＋ b² を最小化するように、a、b、c を定める。",
      "イ": "a² ＋ b² を最大化するように、a、b、c を定める。",
      "ウ": "a² ＋ b² ＋ c² を最小化するように、a、b、c を定める。",
      "エ": "a² ＋ b² ＋ c² を最大化するように、a、b、c を定める。",
      "オ": "(a ＋ b)² ＋ c² を最大化するように、a、b、c を定める。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "サポートベクタは条件により直線から距離 1/√(a² ＋ b²) の位置にある。この距離を最大にするため、制約を満たす a、b、c の中で a² ＋ b² を最小にする。",
    "choiceExplanations": {
      "ア": "サポートベクタは条件により直線から距離 1/√(a² ＋ b²) の位置にある。この距離を最大にするため、制約を満たす a、b、c の中で a² ＋ b² を最小にする。",
      "イ": "サポートベクタと直線の距離は、法線ベクトル (a, b) の長さの逆数となる。a² ＋ b² を大きくすると、この距離は小さくなる。",
      "ウ": "c は分離直線をどこに置くかに関わり、分類の制約には必要である。距離の分母は法線の長さ √(a² ＋ b²) なので、目的関数に c² は含まれない。",
      "エ": "距離の分母を小さくするため、a² ＋ b² は最小化する。また、c は直線を平行移動する定数なので、法線ベクトルの長さに含めない。",
      "オ": "直線とサポートベクタの距離に使うのは、法線 (a, b) のユークリッド長 √(a² ＋ b²) である。(a ＋ b)² と c² の和を最大化しても、その距離の最大化にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q38",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 38,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "行列指数関数の積",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "実正方行列 X に対して、exp(X) = Σₙ₌₀^∞ Xⁿ/n! と定める。ただし、X⁰ は単位行列とする。\n\nA = ［［1, 1］, ［0, 1］］、B = ［［−1, 0］, ［0, 1］］に対して、exp(A)exp(B) として正しいのはどれか。",
    "choices": {
      "ア": "［［1, e²］, ［0, e²］］",
      "イ": "［［1, e²/2］, ［0, e²］］",
      "ウ": "［［0, e²］, ［0, e²］］",
      "エ": "［［0, (e² − 1)/2］, ［0, e²］］",
      "オ": "［［1, (e² − 1)/2］, ［0, e²］］"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "A = I ＋ N とおくと N² = 0 なので exp(A) = e(I ＋ N) となる。右から対角行列 exp(B) = diag(e⁻¹, e) を掛けると、第1列は (1, 0)ᵀ、第2列は (e², e²)ᵀ になる。",
    "choiceExplanations": {
      "ア": "A = I ＋ N とおくと N² = 0 なので exp(A) = e(I ＋ N) となる。右から対角行列 exp(B) = diag(e⁻¹, e) を掛けると、第1列は (1, 0)ᵀ、第2列は (e², e²)ᵀ になる。",
      "イ": "exp(A) の右上成分は e である。exp(B) を右から掛けると第2列全体がe倍されるため、右上成分は e² となる。",
      "ウ": "左上成分は exp(A) の e と exp(B) の e⁻¹ の積である。その積は1であり、ゼロにはならない。",
      "エ": "左上の成分は e × e⁻¹ = 1 である。右上成分も exp(A) の右上の e に、exp(B) の第2対角成分eを掛けた e² になる。",
      "オ": "この式は exp(A ＋ B) を求めた場合に得られるが、問われているのは exp(A)exp(B) である。AとBが可換でないので両者は一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 38。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q39",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "行基本変形による行列式計算",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の行列式の値はいくらか。\n\n｜  1　 2　 1　 2｜\n｜−2　 1　 2　−1｜\n｜−1　−2　 1　 2｜\n｜−2　 1　−2　 1｜",
    "choices": {
      "ア": "−100",
      "イ": "−60",
      "ウ": "−20",
      "エ": "60",
      "オ": "100"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "第3行に第1行を足し、第4行から第2行を引くと左下の2行2列がゼロになる。左上の行列式は5、右下は20なので、全体の行列式は100になる。",
    "choiceExplanations": {
      "ア": "第3行に第1行を足し、第4行から第2行を引く操作は、行列式の符号を変えない。対角にできる二つの2次行列の行列式はいずれも正である。",
      "イ": "左下の2行2列をゼロにすると、左上の2次行列の行列式は 1 × 1 − 2 × (−2) = 5 である。右下は20なので、負の値にはならない。",
      "ウ": "右下の2行2列の行列式は、行基本変形の後で 2 × 2 − 4 × (−4) = 20 である。これだけで全体の値を決めず、左上の行列式5も掛ける。",
      "エ": "第3行と第4行を変形すると、右下の2次行列は ［［2, 4］, ［−4, 2］］ になる。その行列式20に左上の行列式5を掛けた値は60ではない。",
      "オ": "第3行に第1行を足し、第4行から第2行を引くと左下の2行2列がゼロになる。左上の行列式は5、右下は20なので、全体の行列式は100になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q40",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "生成部分空間の直交補",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ℝ³ において、(0, 1, 3)ᵀ、(1, 2, 0)ᵀ が生成する線形部分空間の直交補空間として正しいのは次のうちではどれか。",
    "choices": {
      "ア": "{(x, y, z)ᵀ ∈ ℝ³ ｜ x = −(1/2)y = (1/6)z}",
      "イ": "{(x, y, z)ᵀ ∈ ℝ³ ｜ x − (1/2)y ＋ (1/6)z = 0}",
      "ウ": "{(x, y, z)ᵀ ∈ ℝ³ ｜ x = −(2/3)y = 4z}",
      "エ": "{(x, y, z)ᵀ ∈ ℝ³ ｜ x = −2y = 6z}",
      "オ": "{(x, y, z)ᵀ ∈ ℝ³ ｜ x − 2y ＋ 6z = 0}"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "それぞれとの内積をゼロとすると y ＋ 3z = 0 と x ＋ 2y = 0 を得る。よって y = −3z、x = 6z となり、x = −2y = 6z と表せる。",
    "choiceExplanations": {
      "ア": "二つ目のベクトルとの内積がゼロであるためには、x ＋ 2y = 0 でなければならない。従って x = −2y となり、x = −(1/2)y ではない。",
      "イ": "元の二つのベクトルは一次独立なので、その生成空間は2次元で、直交補空間は1次元となる。この選択肢は条件式が一つしかなく、2次元の平面を表す。",
      "ウ": "この条件には例えば (4, −6, 1)ᵀ が当てはまる。このベクトルと (0, 1, 3)ᵀ の内積は−3となるので、求める空間には含まれない。",
      "エ": "それぞれとの内積をゼロとすると y ＋ 3z = 0 と x ＋ 2y = 0 を得る。よって y = −3z、x = 6z となり、x = −2y = 6z と表せる。",
      "オ": "直交補空間では二つの生成ベクトルの両方との内積がゼロでなければならない。この条件式が一つの集合は2次元であり、求める1次元の空間とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q41",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "線形代数",
    "topicTags": [
      "固有値に対応する固有空間",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "複素行列 ［［6, −3, 2］, ［12, −7, 6］, ［8, −6, 6］］ の固有値と、それに対応する固有空間の組合せとして正しいのは次のうちではどれか。",
    "choices": {
      "ア": "固有値1　固有空間：{(x, y, z)ᵀ ∈ ℂ³ ｜ x − y ＋ z = 0}",
      "イ": "固有値1　固有空間：{(x, y, z)ᵀ ∈ ℂ³ ｜ x = (1/3)y = (1/2)z}",
      "ウ": "固有値2　固有空間：{(x, y, z)ᵀ ∈ ℂ³ ｜ 4x − 3y − 2z = 0}",
      "エ": "固有値2　固有空間：{(x, y, z)ᵀ ∈ ℂ³ ｜ 4x = 3y、z = 0}",
      "オ": "固有値2　固有空間：{(x, y, z)ᵀ ∈ ℂ³ ｜ 2x = −z、y = 0}"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "元の行列から単位行列を引いた連立方程式は y = 3x、z = 2x を与える。例えば (1, 3, 2)ᵀ に元の行列を掛けると同じベクトルが得られ、これが固有値1の固有空間を生成する。",
    "choiceExplanations": {
      "ア": "固有値1に対応するには、行列から単位行列を引いたときの全ての行とベクトルの積がゼロになる必要がある。例えば (1, 1, 0)ᵀ はこの肢の条件を満たすが、第1行と掛けると2になる。",
      "イ": "元の行列から単位行列を引いた連立方程式は y = 3x、z = 2x を与える。例えば (1, 3, 2)ᵀ に元の行列を掛けると同じベクトルが得られ、これが固有値1の固有空間を生成する。",
      "ウ": "元の行列から2倍の単位行列を引くと、各行は (4, −3, 2) の定数倍となる。したがって固有空間は 4x − 3y ＋ 2z = 0 であり、z の符号が異なる。",
      "エ": "4x = 3y、z = 0 は固有値2の条件 4x − 3y ＋ 2z = 0 を満たす。それでも z が0でない解を除いているため、固有空間全体にはならない。",
      "オ": "2x = −z、y = 0 は固有値2の固有空間に含まれる1次元の部分空間である。実際の固有空間は 4x − 3y ＋ 2z = 0 の1条件で定まり、2次元である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q42",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "数列の収束と算術平均",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "{aₙ}、{bₙ} を実数列とし、全ての正の整数 n に対し bₙ ≠ 0 とする。次の記述㋐、㋑、㋒のうち、常に正しいもののみを全て挙げているのはどれか。\n\n㋐　数列 {aₙ ＋ bₙ}、{aₙ − bₙ} が共に収束するならば、数列 {aₙ}、{bₙ} は共に収束する。\n㋑　数列 {aₙ ＋ bₙ}、{aₙ/bₙ} が共に収束するならば、数列 {aₙ}、{bₙ} は共に収束する。\n㋒　正の整数 n に対し cₙ = (a₁ ＋ … ＋ aₙ)/n とする。数列 {cₙ} が収束するならば、数列 {aₙ} は収束する。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "㋐のみ正しい。二つの収束数列 aₙ ＋ bₙ と aₙ − bₙ の和の半分が aₙ、差の半分が bₙ となるので、どちらも収束する。",
    "choiceExplanations": {
      "ア": "㋐のみ正しい。二つの収束数列 aₙ ＋ bₙ と aₙ − bₙ の和の半分が aₙ、差の半分が bₙ となるので、どちらも収束する。",
      "イ": "㋐は正しいが、aₙ = n、bₙ = −n では和と比が定数になっても元の数列は発散する。また、aₙ = (−1)ⁿ の平均は0に収束するが、aₙ 自体は収束しない。",
      "ウ": "㋐の和と差はいずれも収束するなら、それらの線形結合も収束する。㋒には aₙ = (−1)ⁿ の反例があり、平均が収束しても元の数列は振動する。",
      "エ": "aₙ = n、bₙ = −n とおくと和は0、比は−1で、ともに収束する。ところが aₙ、bₙ はともに発散するため、㋑は常に正しいとはいえない。",
      "オ": "㋑では aₙ = n、bₙ = −n を選ぶと和と比が収束しても個々の数列は発散する。㋒では aₙ = (−1)ⁿ とすれば平均だけが0へ収束する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q43",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "二階微分方程式と初期条件",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ℝ 上の C² 級関数 f(x) が微分方程式\n\nd²f/dx² (x) − f(x) = 0\n\nの解であり、初期条件 f(0) = 1、df/dx (0) = 0 を満たすとする。\nこのとき、{f(2)}² − {df/dx (2)}² はいくらか。",
    "choices": {
      "ア": "0",
      "イ": "1",
      "ウ": "2",
      "エ": "3",
      "オ": "4"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "f″ = f を使うと、f² − (f′)² を微分した式は 2f′(f − f″) = 0 となる。よって x = 2 での値は x = 0 での 1² − 0² = 1 に等しい。",
    "choiceExplanations": {
      "ア": "f² − (f′)² の導関数は 2f′(f − f″) = 0 だから、この式の値は x によらず一定である。初期値で計算すると1となり、0ではない。",
      "イ": "f″ = f を使うと、f² − (f′)² を微分した式は 2f′(f − f″) = 0 となる。よって x = 2 での値は x = 0 での 1² − 0² = 1 に等しい。",
      "ウ": "初期条件を満たす解は f(x) = (eˣ ＋ e⁻ˣ)/2 である。f と f′ の二乗の差は、分子を展開して差を取ると常に1になる。",
      "エ": "f と f′ はそれぞれ双曲線余弦と双曲線正弦に当たる。それらの二乗の差は恒等的に1なので、x = 2 としても3にはならない。",
      "オ": "問われるのは x の二乗ではなく f と f′ の二乗の差である。この差の導関数はゼロなので、初期条件から値1が得られる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q44",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "景気シナリオと利得の分散",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "二つの証券 A、B を保有しており、A、B 共に1年後に必ず売却するものとする。売却した証券 A から得られる利得を X、証券 B から得られる利得を Y とし、1年後の景気の状況に応じて得られる X と Y は以下の表のとおりとする。\n\nなお、1年後の景気の状況は「好景気」、「横ばい」、「不況」のいずれかであって、それぞれの生じる確率は10％、70％、20％とする。\nこのとき、(1/2)X ＋ (1/2)Y の分散はいくらか。",
    "choices": {
      "ア": "1.8",
      "イ": "2.2",
      "ウ": "2.6",
      "エ": "3.6",
      "オ": "4.4"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Z = (X ＋ Y)/2 は5、3、−0.5をそれぞれ確率0.1、0.7、0.2でとる。E[Z] = 2.5、E[Z²] = 8.85 なので、分散は 8.85 − 2.5² = 2.6 である。",
    "choiceExplanations": {
      "ア": "平均利得 (X ＋ Y)/2 は好景気で5、横ばいで3、不況で−0.5となる。期待値2.5からのずれの二乗を確率で重み付けすると、1.8ではなく2.6となる。",
      "イ": "二つの利得は同じ景気で決まるので、別々に分散を求めて平均するのでは、共分散を反映できない。景気ごとの利得の平均から直接計算すると分散は2.6である。",
      "ウ": "Z = (X ＋ Y)/2 は5、3、−0.5をそれぞれ確率0.1、0.7、0.2でとる。E[Z] = 2.5、E[Z²] = 8.85 なので、分散は 8.85 − 2.5² = 2.6 である。",
      "エ": "Zは三つの値を同じ確率でとるわけではない。各値の二乗に0.1、0.7、0.2を掛けて足した8.85から平均の二乗6.25を引く。",
      "オ": "Zの期待値は5 × 0.1 ＋ 3 × 0.7 − 0.5 × 0.2 = 2.5 となる。分散は二乗の期待値8.85から、期待値の二乗6.25を引いた2.6である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-digital/q44.webp"
    ],
    "imageAltTexts": [
      "好景気・横ばい・不況ごとに証券AとBから得られる利得X、Yを示した表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q45",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "標本平均の正規分布と標本数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある農場で生産されるメロンの重さは平均1200 g、標準偏差25 gの正規分布に従う。この農場のメロンを無作為に n 個選ぶとき、その n 個の重さの平均が、95％以上の確率で1195 gより重い値となるために最低限必要な個数 n はいくらか。\nただし、標準正規分布の上側10％点は1.282、上側5％点は1.645、上側2.5％点は1.960とする。",
    "choices": {
      "ア": "9",
      "イ": "10",
      "ウ": "65",
      "エ": "68",
      "オ": "97"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "標本平均の標準偏差は 25/√n g なので、95％以上となる条件は 5√n/25 ≥ 1.645 である。n ≥ 25 × 1.645² ≈ 67.65 より、必要最小数は68個となる。",
    "choiceExplanations": {
      "ア": "n = 9 のとき、標本平均の標準偏差は25/3 gとなり、基準の1195 gは平均より標準偏差0.6個分だけ下にある。必要な1.645個分には届かない。",
      "イ": "判定する値は 5√n/25 = √n/5 である。n = 10 ではこの値が1.645よりかなり小さく、標本平均が1195 gを上回る確率は95％に届かない。",
      "ウ": "n = 65 では √65/5 ≈ 1.61 となり、上側5％点1.645より小さい。必要な標本数は 25 × 1.645² を切り上げた68である。",
      "エ": "標本平均の標準偏差は 25/√n g なので、95％以上となる条件は 5√n/25 ≥ 1.645 である。n ≥ 25 × 1.645² ≈ 67.65 より、必要最小数は68個となる。",
      "オ": "97は、両側95％区間に用いる1.960を使った場合の必要数に近い。今回は1195 g以下となる側だけを5％以下に抑えるので、上側5％点の1.645を用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q46",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "確率変数の変換とエントロピー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "U_X = {−1, 0, 1} 上に値をとる確率変数 X の確率分布が P(X = x) = 1/3（x ∈ U_X）で与えられるとする。また、確率変数 Y、Z を Y = sin (π/2)X、Z = cos πX で定義する。U_Y、U_Z をそれぞれ Y、Z の定義域とするとき、X、Y、Z のエントロピー\n\n・H(X) = −Σ_(x∈U_X) P(X = x) log₂ P(X = x)\n・H(Y) = −Σ_(y∈U_Y) P(Y = y) log₂ P(Y = y)\n・H(Z) = −Σ_(z∈U_Z) P(Z = z) log₂ P(Z = z)\n\nの大小関係として正しいのはどれか。",
    "choices": {
      "ア": "H(X) = H(Y) ＜ H(Z)",
      "イ": "H(Y) ＜ H(X) ＜ H(Z)",
      "ウ": "H(Y) ＜ H(Z) ＜ H(X)",
      "エ": "H(Z) ＜ H(X) = H(Y)",
      "オ": "H(Z) ＜ H(X) ＜ H(Y)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "公開冊子の正答番号表は選択肢2を示すが、ZはXの決定的な関数なので H(Z) ＞ H(X) は成立しない。式を計算すると H(Z) ＜ H(X) = H(Y) となり、選択肢4に当たる。",
    "choiceExplanations": {
      "ア": "XとYの三つの値はそれぞれ確率1/3なので、H(X) = H(Y) となる。Zでは X = −1 と X = 1 が同じ値になるため、H(Z) はそれらより小さい。",
      "イ": "公開冊子の正答番号表は選択肢2を示すが、ZはXの決定的な関数なので H(Z) ＞ H(X) は成立しない。式を計算すると H(Z) ＜ H(X) = H(Y) となり、選択肢4に当たる。",
      "ウ": "Yは入力の三つの値を異なる値に対応させるので、Xと同じエントロピーをもつ。Zでは二つの入力値が同じ出力値にまとまるため、H(Y) ＜ H(Z) とはならない。",
      "エ": "XとYはいずれも3値の一様分布、Zは確率2/3と1/3の2値分布なので、数式からはこの関係が得られる。公開冊子の正答番号表には選択肢2が掲載されている。",
      "オ": "H(Z) が小さいという部分は合っている。XとYはどちらも確率1/3の値を三つずつとるため、二つのエントロピーは等しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q47",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "玉の交換と定常分布",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "袋 A に赤玉が二つ、袋 B に白玉が三つ入っている。それぞれの袋から一つずつ玉を取り出し、その二つの玉を交換して袋へ戻す。この操作を多数回繰り返した後に袋 A に赤玉が一つもない確率として最も妥当なのはどれか。",
    "choices": {
      "ア": "2/9",
      "イ": "3/10",
      "ウ": "1/3",
      "エ": "12/25",
      "オ": "2/3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "玉にラベルを付けると、交換はどの組合せの間でも逆向きと同じ確率で起こるため、定常状態では袋Aに入る2玉の組合せ10通りが等確率になる。白玉3個から2個を選ぶ組合せは3通りなので、確率は3/10である。",
    "choiceExplanations": {
      "ア": "袋Aの赤玉数を状態として遷移を考えると、状態0から1へ移る確率は2/3で、状態1から0へ移る確率は1/3である。定常分布では状態0の確率が状態1の半分となるので、状態0の確率は2/9ではない。",
      "イ": "玉にラベルを付けると、交換はどの組合せの間でも逆向きと同じ確率で起こるため、定常状態では袋Aに入る2玉の組合せ10通りが等確率になる。白玉3個から2個を選ぶ組合せは3通りなので、確率は3/10である。",
      "ウ": "袋Aの赤玉数は0、1、2の三つの状態を取るが、各状態が等確率ではない。玉2個の組合せを数えると、全10通りのうち赤玉0個は3通りである。",
      "エ": "袋Aには互いに異なる二つの玉が入るため、白玉を選ぶ確率を独立に掛けることはできない。定常状態では白玉2個の組合せ3通りを全体の10通りで割る。",
      "オ": "袋Aに赤玉がないためには、二つの玉が両方とも白でなければならない。候補の5玉から白玉2個が占める組合せの割合は3/10となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q48",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "オペレーションズ・リサーチ",
    "topicTags": [
      "凸二次計画と境界上の最小値",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の非線形計画問題の最適解における目的関数の値はいくらか。\n\nminimize　2x₁² − x₁x₂ ＋ x₂² − 2x₁ − (9/2)x₂\nsubject to　2x₁ ＋ x₂ ≤ 3、x₁ ≥ 0",
    "choices": {
      "ア": "−107/14",
      "イ": "−13/2",
      "ウ": "−5",
      "エ": "−9/2",
      "オ": "−2"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "境界 x₂ = 3 − 2x₁ 上で目的関数は 8(x₁ − 1/2)² − 13/2 となり、最小は (x₁, x₂) = (1/2, 2) である。この点で目的関数の勾配は制約 2x₁ ＋ x₂ ≤ 3 の法線 (2, 1) の負の定数倍なので、凸性から実行可能領域全体でも最小になる。",
    "choiceExplanations": {
      "ア": "制約を外して勾配をゼロにすると (x₁, x₂) = (17/14, 20/7) で、目的関数値は −107/14 になる。この点は 2x₁ ＋ x₂ ≤ 3 を満たさないため、候補にならない。",
      "イ": "境界 x₂ = 3 − 2x₁ 上で目的関数は 8(x₁ − 1/2)² − 13/2 となり、最小は (x₁, x₂) = (1/2, 2) である。この点で目的関数の勾配は制約 2x₁ ＋ x₂ ≤ 3 の法線 (2, 1) の負の定数倍なので、凸性から実行可能領域全体でも最小になる。",
      "ウ": "実行可能な点 (1/2, 2) で目的関数値は −6.5 となる。すでに−5より小さい値を取るため、−5は最適値ではない。",
      "エ": "(0, 3) では目的関数が −9/2 となるが、同じ境界上で x₁を増やすと値を小さくできる。境界に沿って平方完成した式は x₁ = 1/2 で最小になる。",
      "オ": "例えば制約を満たす (1/2, 2) を代入すると値は −13/2 である。−2より小さな値を実際に取るので、−2は最小値ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q49",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "オペレーションズ・リサーチ",
    "topicTags": [
      "M/M/1待ち行列とリトルの法則",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ある24時間営業の出張所にはサービス事務を行う窓口が一つしかなく、他の客がサービスを受けている場合は、後から来た客は順番に並んで待つ。1人の職員が全てのサービスを行う。1時間当たりの平均来客数は9人でポアソン到着を仮定し、平均サービス時間は客1人につき平均5分で指数分布に従っているとする。定常状態において、サービスを待っている客の待ち行列の平均人数 L_q［人］と、客が出張所に到着してから自分の番が来るまでの平均待ち時間 W_q［分］の値の組合せとして正しいのはどれか。",
    "choices": {
      "ア": "L_q：2　W_q：20",
      "イ": "L_q：2.25　W_q：15",
      "ウ": "L_q：2.25　W_q：20",
      "エ": "L_q：3　W_q：15",
      "オ": "L_q：3　W_q：20"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "平均サービス率は12人/時、利用率はρ = 9/12 = 0.75 なので、待ち行列の平均人数は ρ²/(1 − ρ) = 2.25 人である。リトルの法則により待ち時間は 2.25/9 時間、すなわち15分となる。",
    "choiceExplanations": {
      "ア": "平均到着率9人/時に対し待ち時間が20分なら、リトルの法則により平均人数は3人となり、2人とは整合しない。サービス中の客を除いた平均待ち時間は15分である。",
      "イ": "平均サービス率は12人/時、利用率はρ = 9/12 = 0.75 なので、待ち行列の平均人数は ρ²/(1 − ρ) = 2.25 人である。リトルの法則により待ち時間は 2.25/9 時間、すなわち15分となる。",
      "ウ": "2.25人はサービス中の客を含まない待ち行列の平均人数である。20分はサービス時間5分も含めた平均滞在時間であり、待ち時間は15分となる。",
      "エ": "平均待ち時間15分は正しいが、3人はサービス中の客も含む平均人数である。平均でサービス中の0.75人を除くと2.25人となる。",
      "オ": "3人と20分は、サービス中の客も数えた平均人数と、サービス終了まで含めた平均滞在時間である。問われるのは列に並ぶ人数とサービス開始までの時間である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2024-annual-senmon-digital-q50",
    "exam": "kokka-sogo-dai",
    "year": 2024,
    "season": "annual",
    "session": "senmon-digital",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "オペレーションズ・リサーチ",
    "topicTags": [
      "重さ制約付きのナップサック問題",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "一つの袋と価値と重さが表のように与えられている6種類の荷物 A～F が一つずつある。袋に詰め込める荷物の重さの合計の上限を5 kgとするとき、詰め込む荷物の価値［円］の合計の最大値はいくらか。",
    "choices": {
      "ア": "500",
      "イ": "550",
      "ウ": "570",
      "エ": "600",
      "オ": "650"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "Eを入れる場合は最大500円、EなしでBを入れる場合は残り2 kgにAとCを入れて最大570円となる。BもEも入れない場合は、C、D、Fで重さ5 kg、価値600円となり最大である。",
    "choiceExplanations": {
      "ア": "EとCを詰めると5 kgで500円になる。C、D、Fなら同じ5 kgで価値600円になるため、500円が上限ではない。",
      "イ": "BとFを詰めると5 kgで550円となる。一方、Bを入れずにC、D、Fの組合せを選べば、同じ重量で600円となる。",
      "ウ": "A、B、Cを選ぶと5 kgで570円になり、A、D、Fでも同じ価値となる。AをCに置き換えてC、D、Fとすると、重量を変えずに価値が30円増える。",
      "エ": "Eを入れる場合は最大500円、EなしでBを入れる場合は残り2 kgにAとCを入れて最大570円となる。BもEも入れない場合は、C、D、Fで重さ5 kg、価値600円となり最大である。",
      "オ": "B又はEを入れる場合はどの組合せでも570円以下である。残るA、C、D、Fは全て入れると6 kgなので、C、D、Fの600円が最良である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000007473.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2024年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） デジタル区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2024/senmon-digital/q50.webp"
    ],
    "imageAltTexts": [
      "荷物AからFの価値と重さを示した表"
    ]
  }
];
