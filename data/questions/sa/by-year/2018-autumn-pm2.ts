import type { Question } from "@/lib/questions/types";

export const SA_QUESTIONS_2018_AUTUMN_PM2: Question[] = [
  {
    "id": "sa-2018a-pm2-q1",
    "exam": "sa",
    "year": 2018,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 1,
    "type": "essay",
    "category": "システム企画",
    "topicTags": [
      "業務からのニーズに応えるためのデータを活用した情報の提供について"
    ],
    "difficulty": 4,
    "question": "問1　業務からのニーズに応えるためのデータを活用した情報の提供について",
    "answer": "近年，業務からのニーズに応えるためにデータを活用した情報の提供をすることが増えている。システムアーキテクトは，ニーズを分析し，どのような情報を提供するのかを検討する必要がある。また，このような情報の提供では算出元のデータが企業内にはないなどの課題があることも多い。そのため，課題に対応するための工夫も求められる。本問は，業務のためにデータ活用をする際に，求められたニーズ，ニーズの分析結果と提供した情報，情報の提供に課題があった際の工夫について，具体的に論述することを求めている。論述を通じて，システムアーキテクトに必要な要求の分析能力，課題への対応能力などを評価する。",
    "explanation": "利用部門が必要とする判断から、提供する情報と粒度を決めます。元データの入手に課題がある場合は、選んだ工夫とその理由を具体的に示します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sa/2018-autumn-pm2/q01-p03.webp",
      "/questions/ipa/sa/2018-autumn-pm2/q01-p02.webp"
    ],
    "imageAltTexts": [
      "問1 業務からのニーズに応えるためのデータを活用した情報の提供について（問題冊子 PDF 3ページ）",
      "問1 業務からのニーズに応えるためのデータを活用した情報の提供について（問題冊子 PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_pm2_qs.pdf#page=3",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_pm2_ans.pdf#page=1",
    "sourceAttribution": "出典：情報処理推進機構（IPA）システムアーキテクト 2018年度秋期 午後II",
    "license": "IPA-public"
  },
  {
    "id": "sa-2018a-pm2-q2",
    "exam": "sa",
    "year": 2018,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 2,
    "type": "essay",
    "category": "システム設計",
    "topicTags": [
      "業務ソフトウェアパッケージの導入について"
    ],
    "difficulty": 4,
    "question": "問2　業務ソフトウェアパッケージの導入について",
    "answer": "近年，情報システム開発期間の短縮，業務品質の向上などのために，情報システムの構築に，業務ソフトウェアパッケージ（以下，パッケージという）を導入するケースが増えている。システムアーキテクトは，実現したい業務機能を達成するために，パッケージが提供する機能と実現したい業務機能とのギャップをどのように解決するか検討し，利用部門に選択してもらう必要がある。本問は，パッケージ導入の際に生じる実現したい業務機能とのギャップ，及び解決策について，具体的に論述することを求めている。論述を通じて，システムアーキテクトに必要なパッケージ導入に関連した能力と経験を評価する。",
    "explanation": "業務機能とパッケージ機能の差を特定し、解決策ごとに業務への影響を比較します。利用部門が選択できるよう、判断の根拠を示します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sa/2018-autumn-pm2/q02-p04.webp",
      "/questions/ipa/sa/2018-autumn-pm2/q02-p02.webp"
    ],
    "imageAltTexts": [
      "問2 業務ソフトウェアパッケージの導入について（問題冊子 PDF 4ページ）",
      "問2 業務ソフトウェアパッケージの導入について（問題冊子 PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_pm2_qs.pdf#page=4",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_pm2_ans.pdf#page=1",
    "sourceAttribution": "出典：情報処理推進機構（IPA）システムアーキテクト 2018年度秋期 午後II",
    "license": "IPA-public"
  },
  {
    "id": "sa-2018a-pm2-q3",
    "exam": "sa",
    "year": 2018,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 3,
    "type": "essay",
    "category": "組込みシステム",
    "topicTags": [
      "組込みシステムのAI利用，IoT化などに伴うデータ量増加への対応について"
    ],
    "difficulty": 4,
    "question": "問3　組込みシステムのAI利用，IoT化などに伴うデータ量増加への対応について",
    "answer": "AI，IoT の進展もあり，組込みシステムが処理するデータ量は年々増加している。一方で，組込みシステムはシステムそれぞれ特有の制約条件をもち，データ量の増加に対応するためには工夫が必要である。組込みシステムのアーキテクトは，その制約条件を把握し，データ量増加に対応したシステムを構築する必要がある。本問は，解答者が開発に携わった組込みシステムにおいて，データ量の増加で発生した問題をアーキテクトとしてどのように解決して目的を達成したか，具体的に論述することを求めている。論述を通じて，システムアーキテクトに必要な要件分析力と分析に基づくシステム構築力を評価する。",
    "explanation": "データ量の増加が、処理時間・記憶容量・通信などにどう影響するかを具体化します。システム固有の制約を踏まえた対策と、その評価結果をつなげます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sa/2018-autumn-pm2/q03-p05.webp"
    ],
    "imageAltTexts": [
      "問3 組込みシステムのAI利用，IoT化などに伴うデータ量増加への対応について（問題冊子 PDF 5ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_pm2_qs.pdf#page=5",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sa_pm2_ans.pdf#page=1",
    "sourceAttribution": "出典：情報処理推進機構（IPA）システムアーキテクト 2018年度秋期 午後II",
    "license": "IPA-public"
  }
];
