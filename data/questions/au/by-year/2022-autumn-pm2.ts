import type { Question } from "@/lib/questions/types";

export const AU_QUESTIONS_2022_AUTUMN_PM2: Question[] = [
  {
    "id": "au-2022a-pm2-q1",
    "exam": "au",
    "year": 2022,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 1,
    "type": "essay",
    "category": "午後論述",
    "topicTags": [
      "情報システムの個別監査計画と監査手続"
    ],
    "difficulty": 4,
    "question": "問1　情報システムの個別監査計画と監査手続について。",
    "answer": "情報システムの個別監査計画において，対象となる情報システムの特徴，リスク評価結果などを考慮して，\n監査の重点項目・着眼点を設定し，それに対応する適切な監査手続を作成する。一方，監査手続の作成において\n監査資源の制約などの理由で本来必要と考えた監査手続が採用できない場合には，代替手続の選択・適用に加\nえ，監査リスクへの対応方法を適切に計画することが必要となる。\n 本問では，システム監査人として，情報システムの特徴やリスク評価結果などを適切に分析して重点項目・\n着眼点を適切に設定し，本来必要と考えた監査手続が採用できない場合における監査リスクを明確にし，その\n対応方法を計画できる知識・能力などを問う。",
    "modelAnswer": "### IPA公式の出題趣旨\n\n情報システムの個別監査計画において，対象となる情報システムの特徴，リスク評価結果などを考慮して，監査の重点項目・着眼点を設定し，それに対応する適切な監査手続を作成する。一方，監査手続の作成において監査資源の制約などの理由で本来必要と考えた監査手続が採用できない場合には，代替手続の選択・適用に加え，監査リスクへの対応方法を適切に計画することが必要となる。\n 本問では，システム監査人として，情報システムの特徴やリスク評価結果などを適切に分析して重点項目・着眼点を適切に設定し，本来必要と考えた監査手続が採用できない場合における監査リスクを明確にし，その対応方法を計画できる知識・能力などを問う。",
    "explanation": "監査対象の特徴とリスク評価から、重点項目・着眼点を選んだ理由を説明します。次に、本来必要な監査手続がどの制約によって実施できないかを明確にし、代替手続によって得られる証拠と残る監査リスクを対応付けます。手続を別のものに置き換えたという記述だけでなく、十分性をどう補い、監査リスクにどう対応する計画にしたかを書くことが重要です。対象、リスク、確認したい事実、証拠、手続の順につなぐと論旨がぶれにくくなります。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_qs.pdf) / [IPA公式出題趣旨（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_ans.pdf)",
    "scoringCriteria": "監査対象の特徴とリスク評価から、重点項目・着眼点を選んだ理由を説明します。次に、本来必要な監査手続がどの制約によって実施できないかを明確にし、代替手続によって得られる証拠と残る監査リスクを対応付けます。手続を別のものに置き換えたという記述だけでなく、十分性をどう補い、監査リスクにどう対応する計画にしたかを書くことが重要です。対象、リスク、確認したい事実、証拠、手続の順につなぐと論旨がぶれにくくなります。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_qs.pdf) / [IPA公式出題趣旨（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/au/2022-autumn-pm2/question-p03.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問1 情報システムの個別監査計画と監査手続（PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）"
  },
  {
    "id": "au-2022a-pm2-q2",
    "exam": "au",
    "year": 2022,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 2,
    "type": "essay",
    "category": "午後論述",
    "topicTags": [
      "システム障害管理態勢に関する監査"
    ],
    "difficulty": 4,
    "question": "問2　システム障害管理態勢に関する監査について。",
    "answer": "情報システムの改変によるシステムの複雑化・高度化に伴い，システム障害の影響がますます大きくなって\nいることから，障害の発生を防ぐとともに，発生時の影響を最小にすること，再発を防止することが重要にな\nる。\n 一方で，システム障害がどの箇所でいつ発生するのかの予測は困難であり，外部接続先の情報システムの障\n害による影響なども想定される。このような状況を踏まえて，システム監査人は，改変後のシステム障害管理\n態勢が構築され，実効性があるかどうかを確かめる必要がある。\n 本問は，システム監査人として，改変後のシステム障害管理態勢の実効性を確かめるための着眼点について\n具体的に論述することを求めている。論述を通じて，適切かつ十分な監査証拠を入手し，検証，評価するための\n知識・能力などを評価する。",
    "modelAnswer": "### IPA公式の出題趣旨\n\n情報システムの改変によるシステムの複雑化・高度化に伴い，システム障害の影響がますます大きくなっていることから，障害の発生を防ぐとともに，発生時の影響を最小にすること，再発を防止することが重要になる。\n 一方で，システム障害がどの箇所でいつ発生するのかの予測は困難であり，外部接続先の情報システムの障害による影響なども想定される。このような状況を踏まえて，システム監査人は，改変後のシステム障害管理態勢が構築され，実効性があるかどうかを確かめる必要がある。\n 本問は，システム監査人として，改変後のシステム障害管理態勢の実効性を確かめるための着眼点について具体的に論述することを求めている。論述を通じて，適切かつ十分な監査証拠を入手し，検証，評価するための知識・能力などを評価する。",
    "explanation": "システムの改変によって障害の発生要因や影響範囲がどう変わったかを起点にします。障害の予防、発生時の影響抑制、再発防止に分け、監査で何を確かめるかを具体化します。体制や規程の存在だけでなく、訓練記録、対応記録、原因分析と改善の実施状況など、実際に機能していると判断するための証拠を対応付けてください。外部接続先の障害に起因する影響も、対象システムの依存関係に基づいて論述に組み込みます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_qs.pdf) / [IPA公式出題趣旨（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_ans.pdf)",
    "scoringCriteria": "システムの改変によって障害の発生要因や影響範囲がどう変わったかを起点にします。障害の予防、発生時の影響抑制、再発防止に分け、監査で何を確かめるかを具体化します。体制や規程の存在だけでなく、訓練記録、対応記録、原因分析と改善の実施状況など、実際に機能していると判断するための証拠を対応付けてください。外部接続先の障害に起因する影響も、対象システムの依存関係に基づいて論述に組み込みます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_qs.pdf) / [IPA公式出題趣旨（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/au/2022-autumn-pm2/question-p04.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問2 システム障害管理態勢に関する監査（PDF 4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_au_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）"
  }
];
