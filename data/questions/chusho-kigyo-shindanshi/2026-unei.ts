import type { Question } from "@/lib/questions/types";

export const CHUSHO_2026_D_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 1,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産管理",
    "topicTags": [
      "生産指標"
    ],
    "difficulty": 3,
    "question": "生産指標に関連する記述と用語の組み合わせとして、最も適切なものを下記の解\n 答群から選べ。\n\n\n ａ　素材が準備されてから完成品になるまでの時間を表す数値\n ｂ　単位時間に処理される仕事量を表す数値\n ｃ　仕事全体を１人の作業者で遂行するのに要する時間を表す数値\n ｄ　投入された主原材料の量に対する、その主原材料から実際に産出された製品の\n  量の比率を表す数値",
    "choices": {
      "ア": "ａ：スループット　　ｂ：歩留り　　　　　ｃ：工数\n  　　ｄ：適合品率",
      "イ": "ａ：メイクスパン　　ｂ：スループット　　ｃ：工程能力指数\n  　　ｄ：適合品率",
      "ウ": "ａ：メイクスパン　　ｂ：歩留り　　　　　ｃ：リードタイム\n  　　ｄ：可用率",
      "エ": "ａ：リードタイム　　ｂ：スループット　　ｃ：工数\n  　　ｄ：歩留り",
      "オ": "ａ：リードタイム　　ｂ：メイクスパン　　ｃ：工程能力指数\n  　　ｄ：歩留り"
    },
    "answer": "エ",
    "explanation": "aはリードタイム、bはスループット、cは工数、dは歩留り。四つとも一致するのはエ。\n\n正答の根拠：\nエ：素材の準備から完成までがリードタイム、単位時間の処理量がスループット、1人で遂行する所要時間が工数、主原材料からの産出比率が歩留り。",
    "choiceExplanations": {
      "ア": "aをスループット、bを歩留りとする点が逆の概念。dの適合品率も投入原材料に対する産出量ではない。",
      "イ": "bのスループットのみ一致。aはメイクスパンではなくリードタイム、cは工数、dは歩留り。",
      "ウ": "a・b・c・dのいずれも設問の定義と一致しない。",
      "エ": "素材の準備から完成までがリードタイム、単位時間の処理量がスループット、1人で遂行する所要時間が工数、主原材料からの産出比率が歩留り。",
      "オ": "dの歩留りのみ一致し、aはリードタイム、bはスループット、cは工数。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 2,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産計画",
    "topicTags": [
      "MRP"
    ],
    "difficulty": 3,
    "question": "MRP に関する以下の文章の空欄Ａ～Ｄに入る用語の組み合わせとして、最も適\n 切なものを下記の解答群から選べ。\n\n\n 　MRP において、 　 Ａ  とは、連続した時間の流れを隣り合った適切な小期\n 間に細分化して、この小期間単位ですべての生産活動を計画・統制することであ\n る。細分化された小期間のことを　 Ｂ  という。\n 　MRP における 　 Ｃ  には、独立需要品目を対象として、品目ごとに\n 　 Ｂ  の単位で設定した生産予定が示されている。さらに、独立需要品目と従\n 属需要品目の関係性が記載された　 Ｄ  を用いて、資材の所要量展開が行われ\n る。",
    "choices": {
      "ア": "Ａ：MPS            Ｂ：BOM\n  　　Ｃ：ローリングスケジュール  Ｄ：タイムフェイズ",
      "イ": "Ａ：MPS           Ｂ：タイムフェイズ\n  　　Ｃ：タイムバケット      Ｄ：ローリングスケジュール",
      "ウ": "Ａ：タイムフェイズ       Ｂ：BOM\n  　　Ｃ：タイムバケット       Ｄ：MPS",
      "エ": "Ａ：タイムフェイズ      Ｂ：タイムバケット\n  　　Ｃ：MPS            Ｄ：BOM",
      "オ": "Ａ：タイムフェイズ      Ｂ：タイムバケット\n  　　Ｃ：ローリングスケジュール  Ｄ：BOM"
    },
    "answer": "エ",
    "explanation": "時間を小期間に分けて計画するのがタイムフェイズ、その小期間がタイムバケット。独立需要の生産予定はMPS、品目間の構成関係はBOM。",
    "choiceExplanations": {
      "ア": "MPSは基準生産計画であり時間分割そのものではない。BOMは期間単位でもない。",
      "イ": "A・Bが誤り。MPSをタイムフェイズの意味に置けず、タイムバケットは期間単位である。",
      "ウ": "Aのみ一致。Bはタイムバケット、CはMPS、DはBOM。",
      "エ": "A=タイムフェイズ、B=タイムバケット、C=MPS、D=BOMがすべて一致。",
      "オ": "A・B・Dは一致するがCはローリングスケジュールではなくMPS。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 3,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "工程管理",
    "topicTags": [
      "PERT",
      "クリティカルパス"
    ],
    "difficulty": 3,
    "question": "あるプロジェクトは７つの作業工程Ａ～Ｇで構成されている。各作業工程の作業\n 時間と作業工程間の先行関係が下図で示されるとき、このプロジェクトのPERT\n 計算に関する記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "このプロジェクトの最短完了時間は、18 時間である。",
      "イ": "作業工程Ａの作業時間が１時間短くなると、クリティカルパスは複数にな\n   る。",
      "ウ": "作業工程Ｃの作業時間が１時間増えると、このプロジェクトの最短完了時間\n   は長くなる。",
      "エ": "作業工程Ｃを作業工程Ｅの先行作業からなくすことができても、このプロ\n   ジェクトの最短完了時間は変わらない。",
      "オ": "作業工程Ｆの作業実施を不要にすると、このプロジェクトの最短完了時間は\n   短くなる。"
    },
    "answer": "ウ",
    "explanation": "図の最長経路はC(6)+E(8)+G(5)=19時間。A+D+G=18時間、C+F=9時間。Cを1時間延ばせば完了は20時間。",
    "choiceExplanations": {
      "ア": "最短完了時間は最長経路の19時間で、18時間はA-D-G経路。",
      "イ": "A-D-Gは元々18時間でAを短縮すると17時間になる。19時間のC-E-Gとの同率経路は増えない。",
      "ウ": "C-E-Gはクリティカルパスなので、Cを1時間延ばすと19時間から20時間になる。",
      "エ": "CをEの先行から外すとEはB(5時間)後に始められ、B-E-G=18時間となる。完了時間が19から18時間に変わる。",
      "オ": "Fの経路C-Fは9時間でクリティカルパスではなく、不要にしても19時間のC-E-Gが残る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/unei/2026-D-source-page-4.png"
    ],
    "imageAltTexts": [
      "令和8年度運営管理第3問の原本図表（PDF 4ページ）"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 4,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産計画",
    "topicTags": [
      "線形計画法"
    ],
    "difficulty": 3,
    "question": "ある工場では、電力とガスを利用して２種類の製品Ａ、Ｂが生産される。下表に\n は、製品を１kg 生産するのに必要な電力とガスの量と、製品を１kg 販売して得ら\n れる単位利益、および現状で使用可能な電力とガスの量が示されている。総利益が\n 最大になる方策として、最も適切なものを下記の解答群から選べ。\n\n\n              製品Ａ     製品Ｂ    使用可能量\n      電力        4（kW）      1（kW）      18（kW）\n      ガス        1（Nm3）      2（Nm3）      8（Nm3）\n      単位利益    2（万円／kg）  1（万円／kg）",
    "choices": {
      "ア": "製品Ａを生産せず、製品Ｂを４kg 生産する。",
      "イ": "製品Ａを２kg 生産し、製品Ｂを３kg 生産する。",
      "ウ": "製品Ａを４kg 生産し、製品Ｂを２kg 生産する。",
      "エ": "製品Ａを６kg 生産し、製品Ｂを１kg 生産する。",
      "オ": "製品Ａを８kg 生産し、製品Ｂを生産しない。"
    },
    "answer": "ウ",
    "explanation": "制約は4A+B≤18、A+2B≤8。交点A=4、B=2で利益は10万円。候補のうち実行可能かつ最大。",
    "choiceExplanations": {
      "ア": "A=0,B=4は電力4、ガス8で可能だが利益4万円。",
      "イ": "A=2,B=3は電力11、ガス8で可能だが利益7万円。",
      "ウ": "A=4,B=2は電力18、ガス8をちょうど使い、利益10万円で最大。",
      "エ": "A=6,B=1では電力が25kWとなり18kWを超える。",
      "オ": "A=8,B=0では電力が32kWとなり18kWを超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 5,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "環境管理",
    "topicTags": [
      "循環型社会",
      "カーボンフットプリント"
    ],
    "difficulty": 3,
    "question": "環境問題に関連する記述と用語の組み合わせとして、最も適切なものを下記の解\n 答群から選べ。\n\n\n ａ　化石資源を除く、動植物に由来する有機物であり、エネルギー源として利用す\n  ることができるもの。\n ｂ　廃棄物の再利用や再資源化などを通して、最終的に廃棄物を限りなくなくそう\n  とする取り組み。\n ｃ　機能を復元する処理を含めて製品を再利用すること。\n ｄ　製品やサービスのライフサイクル全体における温室効果ガス排出量をCO2 排\n  出量に換算して数値化すること。",
    "choices": {
      "ア": "ａ：バイオマス　　　　　　　ｂ：ゼロエミッション\n  　　ｃ：リファービッシュ　　　　ｄ：カーボンフットプリント",
      "イ": "ａ：バイオマス　　　　　　　ｂ：ライフサイクルアセスメント\n  　　ｃ：エコマテリアル　　　　　ｄ：カーボンニュートラル",
      "ウ": "ａ：バイオマス　　　　　　　ｂ：リファービッシュ\n  　　ｃ：ゼロエミッション　　　　ｄ：カーボンニュートラル",
      "エ": "ａ：マテリアルリサイクル　　ｂ：エコマテリアル\n  　　ｃ：ゼロエミッション　　　　ｄ：カーボンフットプリント",
      "オ": "ａ：マテリアルリサイクル　　ｂ：ゼロエミッション\n  　　ｃ：リファービッシュ　　　　ｄ：ライフサイクルアセスメント"
    },
    "answer": "ア",
    "explanation": "aバイオマス、bゼロエミッション、cリファービッシュ、dカーボンフットプリントの組合せ。\n\n正答の根拠：\nア：四つの定義と用語が一致する。",
    "choiceExplanations": {
      "ア": "四つの定義と用語が一致する。",
      "イ": "bのLCAは環境負荷のライフサイクル評価、cのエコマテリアルは環境配慮材料、dのカーボンニュートラルは排出・吸収の均衡。",
      "ウ": "bはゼロエミッション、cはリファービッシュ、dはカーボンフットプリントである。",
      "エ": "aはバイオマス、bはゼロエミッション、cはリファービッシュである。",
      "オ": "aはバイオマス、dはカーボンフットプリントである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 6,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "作業管理",
    "topicTags": [
      "労働安全",
      "ヒューマンエラー"
    ],
    "difficulty": 3,
    "question": "労働災害の抑止に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "SHELL モデルの考え方に基づいて、事故の原因を、Software（手順書等）、\n   Hardware（設備等）、Environment（作業環境）、Liveware（作業者の個人特性）、\n   Liability（信頼性）の観点で分析した。",
      "イ": "作業者の安全を確保するために、炉内の温度が一定値に下がるまで加熱炉の扉\n  が開かないようにすることは、フールプルーフの考えに則っている。",
      "ウ": "ハインリッヒ（H. W. Heinrich）による事故調査の分析結果に基づいて、不安全\n  行動よりも発生頻度が高いことが予想される不安全状態への対策に重点的に取り\n  組んだ。",
      "エ": "フォールトトレランスの考えに則って、両手で同時にプッシュスイッチを押さ\n  ないと設備が稼働しない仕組みをプレス装置に設けた。",
      "オ": "リーズン（J. Reason）のエラー分類モデルに従って、職場内のヒューマンエラー\n    をSlip、Lapse、Violation に分類して防止対策を講じた。"
    },
    "answer": "イ",
    "explanation": "炉内温度が安全域になるまで扉を開けられない設計は、誤操作しても危険を生じさせないフールプルーフ。\n\n正答の根拠：\nイ：安全条件を満たさなければ扉を開けられないので、誤操作を許しても危険を防ぐフールプルーフに該当する。",
    "choiceExplanations": {
      "ア": "SHELLの最後のLは周囲の人を含むLivewareでありLiabilityではない。",
      "イ": "安全条件を満たさなければ扉を開けられないので、誤操作を許しても危険を防ぐフールプルーフに該当する。",
      "ウ": "ハインリッヒの分析では不安全行動を軽視して不安全状態だけに重点を置く説明は導けない。",
      "エ": "両手押しは危険部に手を置いたまま起動する誤操作を防ぐフールプルーフ。故障しても機能を維持するフォールトトレランスではない。",
      "オ": "リーズンの分類にはMistakeもあり、Slip・Lapse・Violationの三つだけでは不完全。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 7,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "作業管理",
    "topicTags": [
      "職務設計",
      "TWI"
    ],
    "difficulty": 3,
    "question": "生産職場で行われる作業の設計と訓練に関する記述として、最も適切なものはど\n れか。",
    "choices": {
      "ア": "OJT では、職務遂行上で必要な共通的な知識、技能、態度など、職場で経験\n  できない理論的知識や体系的理解の習得を目的に作業訓練が実施される。",
      "イ": "TWI（Training Within Industry）のJob Relations では、作業者が仕事全体の\n  目的を理解するために、仕事を構成する作業の先行関係を学ぶ。",
      "ウ": "職務拡大（Job Enlargement）では、作業者に計画・判断・フィードバックと\n  いった管理的要素を委ねることにより、責任感や達成感の向上を図る。",
      "エ": "職務充実（Job Enrichment）では、担当職務を一定期間ごとに変更することに\n  より、担当する職務の範囲を広げて多能工の養成を図る。",
      "オ": "ハックマン（J. R. Hackman）とオルダム（G. R. Oldham）が提唱した職務特性モ\n  デルでは、職務の内発的動機づけを、技能多様性、タスク完結性、タスク重要\n  性、自律性、フィードバックの観点から評価する。"
    },
    "answer": "オ",
    "explanation": "職務特性モデルの五特性は技能多様性、タスク完結性、タスク重要性、自律性、フィードバック。\n\n正答の根拠：\nオ：職務特性モデルの五つの中核特性を正しく列挙している。",
    "choiceExplanations": {
      "ア": "職場での実務経験を通じた訓練がOJTで、職場で経験できない体系的理論はOff-JTの対象。",
      "イ": "TWIのJob Relationsは人間関係を良好にする監督者訓練で、作業の先行関係の習得ではない。",
      "ウ": "計画・判断を委ねる縦方向の職務深化は職務充実。職務拡大は同水準の作業範囲を広げる。",
      "エ": "定期的な担当変更はジョブローテーションであり、職務充実は責任や裁量を増やす。",
      "オ": "職務特性モデルの五つの中核特性を正しく列挙している。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 8,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "作業管理",
    "topicTags": [
      "標準時間",
      "ワークサンプリング"
    ],
    "difficulty": 3,
    "question": "１人の作業者が組み立てに従事する職場において、ある製品の組み立ての標準時\n 間を算定するための時間研究を実施した。\n 　製品を150 個組み立てる作業を観測したところ、次表の結果が得られた。\n\n\n           主作業時間              2.3 時間\n           付随作業時間            0.7 時間\n           準備段取り作業時間      1.0 時間\n\n\n 　さらに、この職場の余裕率を算定するために、非作業時間を除いた実動時間の中\n で、観測回数が500 回のワークサンプリングを実施したところ、余裕に相当するサ\n ンプルが100 個得られた。\n 　この下での組立作業の標準時間（分／個）として、最も適切なものはどれか。ただ\n し、レイティング係数は0.75 として標準時間を算定すること。",
    "choices": {
      "ア": "0.90 分／個",
      "イ": "0.96 分／個",
      "ウ": "1.20 分／個",
      "エ": "1.50 分／個",
      "オ": "1.60 分／個"
    },
    "answer": "エ",
    "explanation": "正味作業時間は(2.3+0.7+1.0)×0.75=3時間。余裕率は実動時間基準で100/500=20%、標準時間は3÷(1−0.2)÷150×60=1.50分/個。",
    "choiceExplanations": {
      "ア": "0.90分は正味作業4時間、レイティング0.75、余裕20%を正しく反映していない。",
      "イ": "0.96分は観測時間とレイティング・余裕の換算結果に一致しない。",
      "ウ": "1.20分は余裕を加味せず3時間を150個で割った値。",
      "エ": "レイティング後の3時間を余裕割合0.8で割ると3.75時間、150個で割り1.50分/個。",
      "オ": "1.60分はレイティング係数を反映しない観測4時間/150個の値。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 9,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "作業管理",
    "topicTags": [
      "サーブリッグ分析"
    ],
    "difficulty": 3,
    "question": "下表は、単腕ロボットが加工前ワークを自動旋盤にセットする作業に対してサー\n ブリッグ分析を実施した結果である。この工程では、加工前ワークが単腕ロボット\n によって自動旋盤に移動され、自動旋盤がワークを固定（チャック）した後に加工が\n 開始される。加工が終了したワークは、別ロボットによって自動旋盤から取り出さ\n れた後に、再び、次の加工前ワークが単腕ロボットによって自動旋盤にセットされ\n る。\n 　この分析結果に基づいて、作業時間の短縮に向けた単腕ロボットの動作改善を考\n えるとき、改善案の候補として、最も不適切なものを下記の解答群から選べ。\n\n\n     No. サーブリッグ 時間（秒）     単腕ロボット動作の内容\n                 加工済みワークが、別ロボットによって自動\n     1     UD          20.0\n                 旋盤から取り出されるのを待つ。\n                 ロボットハンドを回転させながら加工前ワー\n      2    TE＋PP         6.5\n                 クの供給台へ。\n     3      SH            0.3 視覚センサで加工前ワークの位置を探索。\n     4       P            1.0 ロボットハンドを位置合わせ。\n     5      G            0.3 加工前ワークを把持。\n     6    TL＋PP         8.0 加工前ワークを回転させながら自動旋盤へ。\n     7       P            0.6 加工前ワークの姿勢を中空で最終調整。\n     8     UD           3.0 チャックされるのを中空で待つ。\n     9      H            0.5 チャックのために加工前ワークを保持。\n     10      RL            0.2 加工前ワークを放す。\n     11     TE            7.0 ロボットハンドを初期位置に戻す。\n\n\n ここで、表内の各サーブリッグの意味は、次のとおりである。\n 　SH：探す、G：つかむ、TE：から手移動、TL：運ぶ、Ｈ：保持、\n 　RL：放す、P：位置決め、PP：前置き、UD：避けえぬ遅れ",
    "choices": {
      "ア": "加工済みワークが取り出されるのを待っているNo. 1 の時間内に、No. 2 か\n  ら５を実施する。",
      "イ": "No. 2 の実施時間を短縮するために、加工前ワークの供給台を自動旋盤に近\n  接させる。",
      "ウ": "No. 6 の実施時間を短縮するために、供給台における加工前ワークの保管姿\n  勢を改善する。",
      "エ": "チャック直前のロボットハンドの手待ちを削減するために、No. 8 と９を取\n  り除く。",
      "オ": "No. 11 を実施する代わりに、次の加工前ワークに対するNo. 2 を実施する。"
    },
    "answer": "エ",
    "explanation": "チャック待ち(UD)とワーク保持(H)は現行チャック動作に必要であり、両方を削除する案は不適切。\n\n正答の根拠：\nエ：No.8のチャック待ちとNo.9の保持を無条件に除くとワークを確実に固定できないため不適切。",
    "choiceExplanations": {
      "ア": "加工済品の取り出し待ち20秒を利用して次ワークの取り出し・把持を並行できれば時間を短縮できる。",
      "イ": "供給台を旋盤に近づけるとから手移動TEの距離と時間の短縮候補となる。",
      "ウ": "保管姿勢を搬送姿勢に近づければ運搬中の前置きPPを減らす候補となる。",
      "エ": "No.8のチャック待ちとNo.9の保持を無条件に除くとワークを確実に固定できないため不適切。",
      "オ": "初期位置への空手移動を次ワーク供給台への移動と兼ねれば重複移動を減らせる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 10,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "品質管理",
    "topicTags": [
      "抜取検査",
      "OC曲線"
    ],
    "difficulty": 3,
    "question": "抜取検査に関する記述の組み合わせとして、最も適切なものを下記の解答群から\n 選べ。\n\n\n ａ　OC 曲線は、不良率p のロットが一回抜取検査で合格となる確率L（p）を表し\n  た曲線である。\n ｂ　LTPD（Lot Tolerance Percent Defective）を満たさないロットが抜取検査に\n  よって合格と判定される確率は、生産者危険を表している。\n  ｃ　AQL（Acceptable Quality Level）を満たすロットが抜取検査によって不合格と\n  判定される確率は、消費者危険を表している。\n ｄ　ある一回抜取検査で、サンプルサイズｎを変えることなく合格判定個数ｃを大\n  きくすると、ロットの合格率は高くなる。\n ｅ　ある一回抜取検査で、合格判定個数ｃを変えることなくサンプルサイズｎを大\n  きくすると、生産者危険は低下する。",
    "choices": {
      "ア": "ａとｂ",
      "イ": "ａとｄ",
      "ウ": "ｂとｄ",
      "エ": "ｂとｅ",
      "オ": "ｃとｅ"
    },
    "answer": "イ",
    "explanation": "aとdが正しい。LTPDでの誤合格は消費者危険、AQLでの誤不合格は生産者危険。n増加・c固定なら合格しにくくなる。",
    "choiceExplanations": {
      "ア": "aは正しいがbのLTPD不適合ロットの合格は生産者危険でなく消費者危険。",
      "イ": "aはOC曲線の定義、dは許容不良個数cを増やすと合格確率が上がるので両方正しい。",
      "ウ": "dは正しいがbは消費者危険の説明。",
      "エ": "bは消費者危険で誤り。eもn増加でAQLロットが不合格になりやすく、生産者危険が上がるため誤り。",
      "オ": "cはAQLロットの誤不合格＝生産者危険。eもn増加で生産者危険は低下しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 11,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産技術",
    "topicTags": [
      "工作機械"
    ],
    "difficulty": 3,
    "question": "金属を加工する設備に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "研削盤とは、他の工作機械で既に加工された工作物をさらに高い精度や良い面\n  粗度に加工したり、熱処理や表面処理が施されて切削加工ができない工作物の加\n  工を行う装置のことである。",
      "イ": "フライス盤とは、複数の切削工具を自動で交換しながら、穴あけ・溝加工・ね\n  じ加工などの工程を連続して実行できる高度な自動加工装置のことである。",
      "ウ": "ボール盤とは、回転する刃物を用いて、平面・溝・段差などを切削し、さまざ\n  まな形状を加工できる汎用性の高い装置のことである。",
      "エ": "ホブ盤とは、先端工具を高速回転させて金属や樹脂に穴をあけることに特化し\n  た装置のことである。",
      "オ": "マシニングセンタとは、歯形を削り出すための工具を連続的に噛み合わせなが\n  ら加工を進め、歯車専用の形状を効率的に生成する装置のことである。"
    },
    "answer": "ア",
    "explanation": "研削盤は砥石などで高精度・良好な面粗さに加工でき、熱処理後の仕上げにも用いられる。\n\n正答の根拠：\nア：研削盤の高精度仕上げや硬い工作物への適用を正しく説明している。",
    "choiceExplanations": {
      "ア": "研削盤の高精度仕上げや硬い工作物への適用を正しく説明している。",
      "イ": "工具の自動交換で複数工程を連続加工するのはマシニングセンタ。",
      "ウ": "回転刃物で平面・溝などを削るのはフライス盤。",
      "エ": "穴あけを主用途とするのはボール盤。ホブ盤は歯車加工に用いる。",
      "オ": "工具を噛み合わせて歯車の歯を切るのはホブ盤。マシニングセンタではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 12,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "職場管理",
    "topicTags": [
      "5S"
    ],
    "difficulty": 3,
    "question": "職場管理の前提となる５Ｓ（「整理」「整頓」「清掃」「清潔」「躾」）に基づいて実施した\n 施策として、最も適切なものはどれか。",
    "choices": {
      "ア": "「躾」として、職場の整理・整頓・清掃を繰り返し、汚れのない状態を維持でき\n  るようにした。",
      "イ": "「清潔」として、決められたルールを守る習慣づけを徹底させ、職場が５Ｓ活動\n  前の状態に戻らないようにした。",
      "ウ": "「清掃」として、必要なものについた汚れを取り除き、きれいな状態にした。",
      "エ": "「整頓」として、職場にある工具を必要か不必要か区分し、不必要なものは処分\n  した。",
      "オ": "「整理」として、必要な工具がすぐに使用できるように置き場所を決め、誰でも\n  分かるように工具名ラベルを添付した。"
    },
    "answer": "ウ",
    "explanation": "清掃は必要なものや職場の汚れを除くこと。整理は要不要の区分、整頓は定位置化、清潔は良い状態の維持、躾はルールの習慣化。",
    "choiceExplanations": {
      "ア": "清掃等で汚れのない状態を維持するのは清潔。躾は決めたことを守る習慣化。",
      "イ": "ルールを守る習慣づけは躾であり清潔ではない。",
      "ウ": "必要なものの汚れを除去するのは清掃。",
      "エ": "要不要を区分し不要物を処分するのは整理。",
      "オ": "工具の置き場所を定めて表示するのは整頓。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 13,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "設備管理",
    "topicTags": [
      "MTTR",
      "TPM",
      "予防保全"
    ],
    "difficulty": 3,
    "question": "設備管理に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答\n 群から選べ。\n\n\n ａ　MTTR は、故障設備が修復されてから、次に故障するまでの動作時間の平均\n  値である。\n ｂ　TPM は、あらゆるロスを未然防止するために、生産部門をはじめ、開発、営\n  業、管理などの全部門にわたって展開される活動である。\n ｃ　設備の故障は、規定の機能を失った状態と、規定の性能を満たせなくなった状\n  態、の２つに分類される。\n ｄ　予防保全には、時間計画保全と状態基準保全がある。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：誤",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正　　ｄ：誤",
      "ウ": "ａ：誤　　ｂ：正　　ｃ：正　　ｄ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：誤　　ｄ：正",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正"
    },
    "answer": "エ",
    "explanation": "a誤（MTTRは平均修復時間）、b正（TPMは全部門で展開）、c誤（故障の分類をその二つに限定できない）、d正（時間計画保全と状態基準保全）。",
    "choiceExplanations": {
      "ア": "aのMTTRを平均故障間隔と取り違え、dの予防保全の二方式も誤としている。",
      "イ": "aはMTTRとMTBFの混同、bのTPMを誤とするのも違う。",
      "ウ": "a・bは合うがcを正、dを誤とする点が逆。",
      "エ": "a誤、b正、c誤、d正が公式の正誤と一致する。",
      "オ": "a・dは合うがbのTPMを誤、cの二分類を正とする点が違う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 14,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "工場レイアウト",
    "topicTags": [
      "SLP",
      "PQ分析"
    ],
    "difficulty": 3,
    "question": "工場レイアウト計画全体の体系的なアプローチであるSLP に関する記述の正誤\n の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n\n ａ　PQ 分析により生産品目と生産数量との関係を分析し、生産品目の特性に合わ\n  せた工場レイアウトを検討する。\n ｂ　SLP におけるアクティビティとは、レイアウト計画の対象となる構成要素の\n  総称である。\n ｃ　SLP では、相互関係・面積・調整の３つの基本項目に基づき、レイアウト計\n  画を体系的に進める。\n ｄ　重量物を取り扱う工場では、物の流れよりもアクティビティ相互関係を重視し\n  てレイアウトの近接性評価を行う。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：正　　ｄ：誤",
      "イ": "ａ：正　　ｂ：正　　ｃ：誤　　ｄ：誤",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤　　ｄ：正",
      "エ": "ａ：誤　　ｂ：正　　ｃ：正　　ｄ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正　　ｄ：正"
    },
    "answer": "ア",
    "explanation": "a・b・cは正しい。重量物では運搬負荷が大きく、物の流れを軽視して相互関係を優先するdは誤り。\n\n正答の根拠：\nア：品目・数量分析、活動要素、相互関係・面積・調整の三項目は正しい。重量物では物の流れが重要。",
    "choiceExplanations": {
      "ア": "品目・数量分析、活動要素、相互関係・面積・調整の三項目は正しい。重量物では物の流れが重要。",
      "イ": "cを誤としているがSLPの基本項目は相互関係・面積・調整。",
      "ウ": "bのアクティビティ定義とcの基本項目を誤とする一方、dを正としており不一致。",
      "エ": "aのPQ分析を誤とするが、生産品目と数量を分析して配置を検討するのは適切。",
      "オ": "a・bを誤、dを正としており三点が不一致。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 15,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産ライン",
    "topicTags": [
      "ラインバランシング"
    ],
    "difficulty": 3,
    "question": "要素作業１～７の先行関係が下図に示される製品を単一ラインで生産する。この\n 生産ラインでは、この製品を１時間当たり６個以上生産する必要がある。この生産\n ラインを３工程で構成する場合における記述の正誤の組み合わせとして、最も適切\n なものを下記の解答群から選べ。\n\n\n\n\n\n 　　※〇は要素作業、〇の右下は要素作業時間を表す。\n\n\n ａ　ピッチタイムを８分にした場合、３工程の生産ラインを実現できる。\n ｂ　ピッチタイムを９分にした場合、３工程の生産ラインを実現できる。\n ｃ　ピッチタイムを10 分にした場合、生産ラインの編成効率は90 ％である。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：正",
      "イ": "ａ：正　　ｂ：正　　ｃ：誤",
      "ウ": "ａ：誤　　ｂ：正　　ｃ：正",
      "エ": "ａ：誤　　ｂ：正　　ｃ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正"
    },
    "answer": "ウ",
    "explanation": "作業時間合計27分。8分ピッチでは3工程総能力24分で不可。9分なら3工程に編成可能。10分ピッチの編成効率は27/(3×10)=90%。",
    "choiceExplanations": {
      "ア": "aを正とするが27分の仕事を8分×3工程=24分には収められない。",
      "イ": "aが誤、cが正なので不一致。",
      "ウ": "a誤、b正、c正が成立する。",
      "エ": "cを誤とするが編成効率27/30=90%。",
      "オ": "bを誤とするが9分ピッチなら3工程へ編成できる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/unei/2026-D-source-page-15.png"
    ],
    "imageAltTexts": [
      "令和8年度運営管理第15問の原本図表（PDF 15ページ）"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 16,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "品質管理",
    "topicTags": [
      "実験計画法",
      "直交表"
    ],
    "difficulty": 3,
    "question": "ある加工設備において、現状よりも生産数量を増加させることを目指している。\n そこで、２つの水準を持つ４つの加工条件（刃物の種類、加工速度、加工手順、治\n 具の種類）について、直交表を用いた実験計画法によってさらに良い条件の組み合\n わせを探すこととした。実験回数を削減するために２水準系のL8 直交配列表を用\n いた実験を計画した。調べたい因子および交互作用は、下表のとおりである。\n 　下図に示す線点図を用いて、因子Ａを直交表の１列目、因子Ｂを２列目、因子Ｂ\n と因子Ｃの交互作用を６列目に割り付けるとき、５列目と７列目への割り付けの組\n み合わせとして、最も適切なものを下記の解答群から選べ。\n\n              項目     内容\n             因子    Ａ：刃物の種類\n                   Ｂ：加工速度\n                   Ｃ：加工手順\n                   Ｄ：治具の種類\n             交互作用  Ａ×Ｂ、Ｂ×Ｃ",
    "choices": {
      "ア": "５列目：Ａ×Ｂ　　７列目：誤差",
      "イ": "５列目：Ｃ　　　　７列目：Ｄ",
      "ウ": "５列目：Ｄ　　　　７列目：Ｃ",
      "エ": "５列目：Ｄ　　　　７列目：誤差",
      "オ": "５列目：誤差　　　７列目：Ｄ"
    },
    "answer": "オ",
    "explanation": "L8線点図で1列Aと2列Bの交互作用A×Bは3列、2列Bと4列Cの交互作用B×Cは6列。残る5列は誤差、7列はD。",
    "choiceExplanations": {
      "ア": "A×Bは1列と2列を結ぶ3列で、5列ではない。",
      "イ": "CはBの2列と6列を結ぶ4列に置くので5列ではない。",
      "ウ": "Cは4列であり7列ではない。",
      "エ": "7列を誤差にするとDの割付位置が合わない。",
      "オ": "5列は誤差、7列をDに割り付ける。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/unei/2026-D-source-page-16.png"
    ],
    "imageAltTexts": [
      "令和8年度運営管理第16問の原本図表（PDF 16ページ）"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 17,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "需要予測",
    "topicTags": [
      "移動平均",
      "指数平滑"
    ],
    "difficulty": 3,
    "question": "次ページの図は、製品１と製品２の、ある年の月ごとの出荷量実績をそれぞれ折\n れ線グラフで示したものである。また、各製品に対して、移動平均法（過去３期の\n 平均）、指数平滑法（平滑化係数α ＝0.8）、指数平滑法（平滑化係数α ＝0.2）の３\n 種類を適用した予測出荷量のグラフをａ～ｃに示す。このとき、各グラフと適用し\n た方法の組み合わせとして、最も適切なものを下記の解答群から選べ。ただし、３\n つの方法の比較が可能になる４月以降の適用結果に基づいてグラフを描いている。",
    "choices": {
      "ア": "ａ：移動平均法（過去３期の平均）\n  　　ｂ：指数平滑法（平滑化係数α ＝0.2）\n  　　ｃ：指数平滑法（平滑化係数α ＝0.8）",
      "イ": "ａ：移動平均法（過去３期の平均）\n  　　ｂ：指数平滑法（平滑化係数α ＝0.8）\n  　　ｃ：指数平滑法（平滑化係数α ＝0.2）",
      "ウ": "ａ：指数平滑法（平滑化係数α ＝0.2）\n  　　ｂ：移動平均法（過去３期の平均）\n  　　ｃ：指数平滑法（平滑化係数α ＝0.8）",
      "エ": "ａ：指数平滑法（平滑化係数α ＝0.2）\n  　　ｂ：指数平滑法（平滑化係数α ＝0.8）\n  　　ｃ：移動平均法（過去３期の平均）",
      "オ": "ａ：指数平滑法（平滑化係数α ＝0.8）\n  　　ｂ：指数平滑法（平滑化係数α ＝0.2）\n  　　ｃ：移動平均法（過去３期の平均）\n\n17"
    },
    "answer": "エ",
    "explanation": "bは直近実績への追随が最も速くα=0.8。aは変化にゆっくり追随するα=0.2。cは過去3期の実績をならす移動平均。",
    "choiceExplanations": {
      "ア": "aの移動平均は合うがb・cの平滑化係数が逆。",
      "イ": "aは合うがcはα=0.2、bがα=0.8。",
      "ウ": "aをα=0.2、bを移動平均と置くが、グラフは逆。",
      "エ": "a=α0.2、b=α0.8、c=移動平均とする公式正答。ただし原図の製品1はa/cの平滑さが近く、製品2の段差への追随から識別する。",
      "オ": "bとcを取り違え、aもα=0.8ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/unei/2026-D-source-page-18.png"
    ],
    "imageAltTexts": [
      "令和8年度運営管理第17問の原本図表（PDF 18ページ）"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q18-p1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 18,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "設備選択",
    "topicTags": [
      "損益分岐点",
      "固定費"
    ],
    "difficulty": 3,
    "question": "ある部品を加工するための同等の設備の候補が３種類あり、加工数量に応じた使\n い方を検討している。各設備の月当たりの固定費と、部品１個当たりの変動費を下\n 表に示す。以下の設問に答えよ。\n\n                         （単位：円）\n             固定費（月当たり）変動費（１個当たり）\n         設備１           130,000                 200\n         設備２           100,000                 300\n         設備３            50,000                 400\n\n\n\n（設問１）\n  　３種類の候補から設備１台を新たに導入する場合、月当たりの固定費と変動費\n  の合計を最小化するために、最も適切なものを下記の解答群から選べ。なお、解\n  答に際しては次のグラフを適宜利用すること。",
    "choices": {
      "ア": "加工数量が設備１と設備２の優劣分岐点未満であれば、設備２が他の２つの\n   設備より有利である。",
      "イ": "加工数量が設備１と設備３の優劣分岐点未満であれば、設備１が他の２つの\n   設備より有利である。",
      "ウ": "加工数量が設備１と設備３の優劣分岐点未満であれば、設備３が他の２つの\n   設備より有利である。",
      "エ": "加工数量が設備２と設備３の優劣分岐点未満であれば、設備２が他の２つの\n   設備より有利である。",
      "オ": "加工数量が設備２と設備３の優劣分岐点未満であれば、設備３が他の２つの\n   設備より有利である。"
    },
    "answer": "ウ",
    "explanation": "総費用は設備1=130000+200q、設備2=100000+300q、設備3=50000+400q。1と3はq=400で交差し、それ未満では設備3が最小。",
    "choiceExplanations": {
      "ア": "設備1・2の交点はq=300だが、q<300では設備3が設備2より安い。",
      "イ": "1・3の交点q=400より小さい数量では固定費の低い設備3が設備1より安い。",
      "ウ": "q<400では設備3が設備1より安く、設備2との比較でもq<400なら設備3が安い。",
      "エ": "2・3の交点q=500より小さい数量では設備3が設備2より安い。",
      "オ": "q<500では設備3は設備2より安いが、q=400～500では設備1の方が設備3より安い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "part": "1",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/unei/2026-D-source-page-19.png"
    ],
    "imageAltTexts": [
      "令和8年度運営管理第18問の原本図表（PDF 19ページ）"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q18-p2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 18,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "設備選択",
    "topicTags": [
      "埋没費用",
      "変動費"
    ],
    "difficulty": 3,
    "question": "ある部品を加工するための同等の設備の候補が３種類あり、加工数量に応じた使\n い方を検討している。各設備の月当たりの固定費と、部品１個当たりの変動費を下\n 表に示す。以下の設問に答えよ。\n\n                         （単位：円）\n             固定費（月当たり）変動費（１個当たり）\n         設備１           130,000                 200\n         設備２           100,000                 300\n         設備３            50,000                 400\n\n\n\n（設問２）\n  　すでに設備１と設備２を１台ずつ導入してある場合、月当たりの固定費と変動\n  費の合計を最小化するための設備の使い方として、最も適切なものはどれか。",
    "choices": {
      "ア": "（設問１）で求められる設備１と設備２の優劣分岐点までは設備１を使用し、\n  それ以上は設備２を使用する。",
      "イ": "（設問１）で求められる設備１と設備２の優劣分岐点までは設備２を使用し、\n  それ以上は設備１を使用する。",
      "ウ": "設備１と設備２を固定費の比率に応じて使用する。",
      "エ": "常に設備１を使用する。",
      "オ": "常に設備２を使用する。"
    },
    "answer": "エ",
    "explanation": "設備1・2をすでに保有しているので固定費は使い方によらず発生する。変動費200円/個の設備1を常に使う。",
    "choiceExplanations": {
      "ア": "既設設備の固定費は回避できず、分岐点以下でも変動費の高い設備2を使う理由がない。",
      "イ": "分岐点で切り替える考え自体が既設の固定費を重複評価している。",
      "ウ": "固定費比率で稼働配分しても変動費の合計を最小化できない。",
      "エ": "設備1の変動費200円/個は設備2の300円/個より低いため常に設備1が有利。",
      "オ": "設備2は1個当たり変動費が100円高い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "part": "2",
    "imageUrls": [
      "/images/questions/chusho-kigyo-shindanshi/2026/unei/2026-D-source-page-19.png"
    ],
    "imageAltTexts": [
      "令和8年度運営管理第18問の原本図表（PDF 19ページ）"
    ],
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 19,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "物流管理",
    "topicTags": [
      "製造ロット",
      "運搬ロット"
    ],
    "difficulty": 3,
    "question": "複数の種類の部品を１つの加工設備で製造している工程がある。１種類の部品は\n それぞれ200 個単位で製造している（本問では、この200 個のことを製造ロットサ\n イズと呼ぶ）。加工設備では１個ずつ連続して加工して順次、50 個入る箱に入れる。\n 箱に50 個の部品が入ったらコンベヤで後工程へ運搬する（本問では、この50 個の\n ことを運搬ロットサイズと呼ぶ）。\n 　このとき、部品の後工程への到達時刻を早める施策の正誤の組み合わせとして、\n 最も適切なものを下記の解答群から選べ。ただし、部品種類を切り替える時間（段\n 取り時間など）は無視できるほど短いものとする。また、コンベヤの運搬速度は不\n 変とする。\n\n\n ａ　製造ロットサイズを半減する。\n ｂ　運搬ロットサイズを半減する。\n ｃ　コンベヤでの運搬距離を半減する。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：正",
      "イ": "ａ：正　　ｂ：正　　ｃ：誤",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：正",
      "エ": "ａ：誤　　ｂ：正　　ｃ：正",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正"
    },
    "answer": "エ",
    "explanation": "段取り時間を無視する条件では製造ロットの半減は先頭箱の完成時刻を早めない。運搬ロットを25個にすれば箱が先に出発し、距離半減も走行時間を短くする。",
    "choiceExplanations": {
      "ア": "aの製造ロット半減は50個箱の満杯時刻を変えない。",
      "イ": "aが誤りで、cは運搬距離短縮により正しい。",
      "ウ": "aは誤り、bは箱を25個で送れるので正しい。",
      "エ": "a誤、b正、c正の組合せ。",
      "オ": "bを誤とするが運搬ロットを半減すれば後工程への到達を早められる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 20,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "在庫管理",
    "topicTags": [
      "定期発注方式",
      "安全在庫"
    ],
    "difficulty": 3,
    "question": "定期発注方式における、安全在庫量や発注量を求める式として、次のものがあ\n る。\n\n\n 安全在庫量＝安全係数×需要量の標準偏差× 　発注間隔＋調達期間 \n 発注量＝（発注間隔＋調達期間）中の需要推定量－発注残－手持在庫量＋安全在庫量\n\n\n 　これらの式で求められる安全在庫量や発注量に関する記述の正誤の組み合わせと\n して、最も適切なものを下記の解答群から選べ。\n\n\n ａ　発注量は、安全在庫量とは独立して、発注間隔と調達期間に基づいて設定す\n  る。\n ｂ　発注間隔と調達期間が等しい状況から、調達期間を維持したまま発注間隔のみ\n  を半減する場合の安全在庫量と、発注間隔を維持したまま調達期間のみを半減す\n  る場合の安全在庫量は同じである。\n ｃ　発注間隔と調達期間が等しい状況から、調達期間を維持したまま発注間隔のみ\n  を半減する場合の発注量と、発注間隔を維持したまま調達期間のみを半減する場\n  合の発注量は同じである。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正",
      "ウ": "ａ：誤　　ｂ：正　　ｃ：正",
      "エ": "ａ：誤　　ｂ：正　　ｃ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正"
    },
    "answer": "エ",
    "explanation": "a誤（発注量の式に安全在庫が入る）、b正（いずれもT+Lが同じ）、c誤（発注残・手持在庫の変化まで同一とは言えない）。",
    "choiceExplanations": {
      "ア": "aを正とするが発注量は安全在庫量に依存する。",
      "イ": "aは誤り。bは発注間隔と調達期間の和が同じなので正しい。",
      "ウ": "cを正とするが発注残・手持在庫により発注量は変わる。",
      "エ": "a誤、b正、c誤の組合せ。",
      "オ": "bを誤、cを正としており逆。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 21,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "生産管理",
    "topicTags": [
      "資材管理",
      "負荷計画"
    ],
    "difficulty": 3,
    "question": "資材管理（生産管理用語（JIS Z8141））を効果的に実施するために必要なこととし\n て、最も不適切なものはどれか。",
    "choices": {
      "ア": "外部から適正な品質の部品等を必要量だけ、必要な時期までに経済的に調達す\n  ること。",
      "イ": "生産活動に当たって、内外製の最適分担の下に、原材料、部品を安定的に外部\n  から調達すること。",
      "ウ": "生産に必要な原材料、部品等の所要量、品質、必要時期などを決めること。",
      "エ": "生産部門ごとに課す仕事量を計算し、計画期間全体にわたって各職場に割り付\n  けること。",
      "オ": "必要な部品等を、必要なときに、必要な量を、必要な場所へ供給できるよう\n  に、各種品目の在庫を望ましい水準に維持すること。"
    },
    "answer": "エ",
    "explanation": "仕事量を計算して職場へ割り付けるのは負荷計画であり、資材管理の対象ではない。\n\n正答の根拠：\nエ：職場別の作業負荷の計算と割付は負荷計画であり資材管理ではない。",
    "choiceExplanations": {
      "ア": "適正品質・必要量・必要時期・経済性を考えた外部調達は資材管理に含まれる。",
      "イ": "内外製の分担を踏まえた原材料・部品の安定調達は資材管理に関係する。",
      "ウ": "原材料や部品の所要量・品質・時期の決定は資材計画の内容。",
      "エ": "職場別の作業負荷の計算と割付は負荷計画であり資材管理ではない。",
      "オ": "必要な品目を必要な時・量・場所に供給できる在庫水準の維持は資材管理の内容。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 22,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗・商店街",
    "topicTags": [
      "商店街実態調査"
    ],
    "difficulty": 3,
    "question": "全国商店街振興組合連合会が公表している『令和６年度商店街実態調査報告書』に\n 関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "商店街全体における１商店街当たりの平均店舗数は200 程度である。",
      "イ": "商店街タイプ別にみると、広域型商店街よりも、近隣型商店街の数が多い。",
      "ウ": "商店街に立地するチェーン店舗のうち、商店街の会員（組合員）になっている店\n  舗数の割合は10 ％を下回っている。",
      "エ": "商店街を構成する全店舗のうち、最も店舗数が多い業種は最寄品小売店であ\n  る。",
      "オ": "「政令指定都市・特別区」よりも、「人口５万人未満の都市」に所在する商店街数\n  が多い。"
    },
    "answer": "イ",
    "explanation": "令和6年度商店街実態調査の商店街タイプ別では、近隣型商店街の数が広域型より多い。\n\n正答の根拠：\nイ：近隣型商店街は広域型商店街より数が多い。",
    "choiceExplanations": {
      "ア": "同調査の平均店舗数は200店程度には達しない。",
      "イ": "近隣型商店街は広域型商店街より数が多い。",
      "ウ": "チェーン店の商店街会員割合は10%未満ではない。",
      "エ": "全店舗で最多の業種を最寄品小売店とする記述は調査結果に合わない。",
      "オ": "政令指定都市・特別区と人口5万人未満都市の商店街数の大小関係が逆。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 23,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗立地法制",
    "topicTags": [
      "景観法"
    ],
    "difficulty": 3,
    "question": "都市、農山漁村などにおける良好な景観の形成を促進するために景観法が定めら\n れており、店舗を出店する際には、店舗の外観などについて、その規制を受ける場\n 合がある。\n 　景観法に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "景観計画の区域は、都市計画区域内でなければならない。",
      "イ": "景観計画の策定では、景観重要建造物の指定の方針は必須事項であり、屋外広\n  告物の表示の制限は選択事項である。",
      "ウ": "景観重要樹木に指定された樹木は、その所有者であれば自由に現状変更ができ\n  る。",
      "エ": "景観地区内では、建築物の壁面の位置は制限されるが、形態意匠は制限されな\n  い。",
      "オ": "道路、河川および海岸は、景観公共重要施設として、景観計画に定めることが\n  できない。"
    },
    "answer": "イ",
    "explanation": "景観計画では景観重要建造物の指定方針を定め、屋外広告物の表示に関する制限は必要に応じて定める事項。\n\n正答の根拠：\nイ：景観重要建造物の指定方針は必須、屋外広告物の表示制限は選択事項という区別が正しい。",
    "choiceExplanations": {
      "ア": "景観計画区域は都市計画区域外にも設定できる。",
      "イ": "景観重要建造物の指定方針は必須、屋外広告物の表示制限は選択事項という区別が正しい。",
      "ウ": "景観重要樹木の現状変更には所有者であっても規制がかかる。",
      "エ": "景観地区では建築物の形態意匠も制限の対象。",
      "オ": "道路・河川・海岸等を景観重要公共施設として景観計画に定められる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 24,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗立地法制",
    "topicTags": [
      "立地適正化計画"
    ],
    "difficulty": 3,
    "question": "都市再生特別措置法における立地適正化計画に関する記述として、最も適切なも\n のはどれか。",
    "choices": {
      "ア": "居住誘導区域外であっても、市町村は必要に応じて居住推進エリアなどの独自\n  の区域を設定することができる。",
      "イ": "コンパクト・プラス・ネットワークの方針に基づき、各市町村の中心市街地へ\n  の一極集中が推進されている。",
      "ウ": "地域・生活拠点は、人口の集積度合いが低く、各種の都市機能が集積する地区\n  である。",
      "エ": "都市機能増進施設（誘導施設）とはスーパーマーケットなどの商業施設や病院な\n  どの医療施設であり、学校などの教育施設は含まれない。",
      "オ": "立地適正化計画では、原則として都市機能誘導区域を居住誘導区域外に定める\n  必要がある。"
    },
    "answer": "ア",
    "explanation": "市町村は法定の居住誘導区域の外側にも地域の実情に応じた独自の居住推進エリアなどを設定できる。\n\n正答の根拠：\nア：居住誘導区域外の独自エリア設定を認める記述。",
    "choiceExplanations": {
      "ア": "居住誘導区域外の独自エリア設定を認める記述。",
      "イ": "コンパクト・プラス・ネットワークは複数拠点を公共交通で結ぶ考え方で、一極集中を義務づけない。",
      "ウ": "地域・生活拠点は生活機能と一定の居住の集積を図るもので、低い人口集積を定義としない。",
      "エ": "誘導施設には教育施設も含み得るため、学校を一律除外しない。",
      "オ": "都市機能誘導区域は原則として居住誘導区域内に設定する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 25,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗安全法制",
    "topicTags": [
      "消防用設備",
      "点検"
    ],
    "difficulty": 3,
    "question": "小売店舗等の店舗施設（一般住宅と併用するものは除く）について、消防法令で定\n められた消防用設備等の点検に関する記述の正誤の組み合わせとして、最も適切な\n ものを下記の解答群から選べ。\n\n\n ａ　店舗に設置されている消防用設備等の機器点検は、１カ月に１回実施する必要\n  がある。\n ｂ　延べ面積が1,000 m2 以上の小売店舗は、消防設備士等の法令で定められた資\n  格者に消防用設備等の点検をさせなければならない。\n ｃ　特定防火対象物では、消防用設備等の点検結果を１年に１回、消防長または消\n  防署長に報告する必要がある。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：正",
      "オ": "ａ：誤　　ｂ：正　　ｃ：誤"
    },
    "answer": "エ",
    "explanation": "a誤（機器点検は通常6か月ごと）、b正（延べ面積1000㎡以上の特定防火対象物等は有資格者点検）、c正（特定防火対象物の報告は1年ごと）。",
    "choiceExplanations": {
      "ア": "機器点検を毎月とするaが誤り、cの1年ごとの報告を誤とする点も違う。",
      "イ": "aを正、bを誤としており両方違う。",
      "ウ": "aは毎月でなく通常6か月ごと、bも資格者点検が必要。",
      "エ": "a誤、b正、c正の組合せ。",
      "オ": "cを誤とするが特定防火対象物は1年に1回報告する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q26",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 26,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗立地法制",
    "topicTags": [
      "まちづくり3法",
      "中心市街地活性化"
    ],
    "difficulty": 3,
    "question": "いわゆるまちづくり３法（大規模小売店舗立地法、中心市街地活性化法、都市計\n 画法）に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "大規模小売店舗立地法では、大規模小売店舗を出店する場合、新設に関する届\n  出をすれば、説明会を開催する必要はない。",
      "イ": "大規模小売店舗立地法では、大規模小売店舗を設置する者が配慮すべき事項\n  に、騒音の発生は含まれない。",
      "ウ": "中心市街地活性化法では、市町村は中心市街地活性化本部を組織し、その下で\n  中心市街地活性化計画を作成することで、都道府県知事の認定を受けることがで\n  きる。",
      "エ": "中心市街地活性化法に基づいて中心市街地活性化協議会を組織する場合、経済\n  活力の向上を担う者として、商工会または商工会議所を構成員にすることができ\n  る。",
      "オ": "都市計画法では、市街化調整区域には、用途地域を定める必要がある。"
    },
    "answer": "エ",
    "explanation": "中心市街地活性化協議会の経済活力向上を担う構成員には商工会・商工会議所が含まれる。\n\n正答の根拠：\nエ：商工会・商工会議所は経済活力向上を担う者として協議会の構成員になれる。",
    "choiceExplanations": {
      "ア": "大店立地法の新設届出後には説明会開催などの手続がある。",
      "イ": "大店立地法は周辺の生活環境への配慮として騒音も扱う。",
      "ウ": "基本計画は市町村が作成し内閣総理大臣の認定を受ける。都道府県知事の認定ではない。",
      "エ": "商工会・商工会議所は経済活力向上を担う者として協議会の構成員になれる。",
      "オ": "市街化調整区域は市街化を抑制する区域で、用途地域を必ず定めるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q27",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 27,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "商品管理",
    "topicTags": [
      "相乗積",
      "粗利益"
    ],
    "difficulty": 3,
    "question": "下表は、ある店舗の商品カテゴリー別の売上高と粗利益をまとめたものである。\n この表におけるカテゴリーごとの相乗積に関する記述として、最も適切なものを下\n 記の解答群から選べ。\n\n\n           売上高    粗利益\n 商品カテゴリー                売上構成比   粗利益率\n           （千円）   （千円）\n    Ａ               1,800           450        15.0 ％        25.0 ％\n    Ｂ               2,160           324        18.0 ％        15.0 ％\n    Ｃ               1,440           504        12.0 ％        35.0 ％\n    Ｄ               3,600           720        30.0 ％        20.0 ％\n    Ｅ               3,000           750        25.0 ％        25.0 ％\n    全体             12,000         2,748       100.0 ％        22.9 ％",
    "choices": {
      "ア": "カテゴリーＢの相乗積は、カテゴリーＡよりも大きい。",
      "イ": "カテゴリーＣの相乗積は、カテゴリーＢよりも大きい。",
      "ウ": "カテゴリーＤの相乗積は、カテゴリーＥよりも大きい。",
      "エ": "相乗積が最も大きいのは、カテゴリーＣである。",
      "オ": "相乗積が最も大きいのは、カテゴリーＤである。"
    },
    "answer": "イ",
    "explanation": "相乗積は売上構成比×粗利益率。A=3.75、B=2.70、C=4.20、D=6.00、E=6.25（各％ポイント）でEが最大。",
    "choiceExplanations": {
      "ア": "B=18%×15%=2.70はA=15%×25%=3.75より小さい。",
      "イ": "C=12%×35%=4.20はB=18%×15%=2.70より大きい。",
      "ウ": "D=30%×20%=6.00はE=25%×25%=6.25より小さい。",
      "エ": "C=4.20で最大ではなく、E=6.25。",
      "オ": "D=6.00よりE=6.25が大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q28",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 28,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "販売促進法制",
    "topicTags": [
      "景品表示法",
      "景品類"
    ],
    "difficulty": 3,
    "question": "不当景品類及び不当表示防止法（景品表示法）に関する記述として、最も適切なも\n のはどれか。",
    "choices": {
      "ア": "一般懸賞による景品類の提供の最高額は、取引価額が5,000 円以上の場合、30\n  万円とされている。",
      "イ": "共同懸賞における景品類の総額の限度額は、懸賞に係る売上予定総額の１％\n  である。",
      "ウ": "景品類には、金券、商品券、値引、アフターサービスが含まれる。",
      "エ": "総付景品の景品類の最高額は、取引価額が1,000 円以上の場合、取引価額の\n    10 分の２とされている。",
      "オ": "対象商品の購入を条件として先着100 名に、景品がもらえるタイプの販売促進\n  は、一般懸賞の制限を受ける。"
    },
    "answer": "エ",
    "explanation": "総付景品では取引価額1000円以上の最高額は取引価額の20%。\n\n正答の根拠：\nエ：取引価額1000円以上の総付景品上限は取引価額の10分の2。",
    "choiceExplanations": {
      "ア": "一般懸賞で取引価額5000円以上の最高額は30万円ではなく10万円。",
      "イ": "共同懸賞の総額限度は売上予定総額の1%ではない。",
      "ウ": "通常の値引やアフターサービスは景品類に含めない。",
      "エ": "取引価額1000円以上の総付景品上限は取引価額の10分の2。",
      "オ": "購入条件の先着順で偶然性・優劣による選定がなければ一般懸賞ではなく総付景品として扱う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q29",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 29,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "店舗設備",
    "topicTags": [
      "照明",
      "JIS照度"
    ],
    "difficulty": 3,
    "question": "店舗の照明に関する以下の文章の空欄ＡとＢに入る数値の組み合わせとして、最\n も適切なものを下記の解答群から選べ。\n\n\n  　JIS では、店舗における照明について、領域ごとの推奨照度を定めている。\n 　例えば、重要陳列部については、スーパーマーケットもファッション店も\n 　 Ａ  ルクスと定めており、大形店の店内全般やファッション店のスペシャル\n 陳列部は、　 Ｂ  ルクスと定めている。また、物品販売店の一般共通事項とし\n て、洗面所は200 ルクスと定めている。",
    "choices": {
      "ア": "Ａ：300　　Ｂ：500",
      "イ": "Ａ：300　　Ｂ：750",
      "ウ": "Ａ：500　　Ｂ：300",
      "エ": "Ａ：500　　Ｂ：750",
      "オ": "Ａ：750　　Ｂ：500"
    },
    "answer": "オ",
    "explanation": "設問が引用するJISの推奨照度では、重要陳列部A=750ルクス、大形店の店内全般・スペシャル陳列部B=500ルクス。",
    "choiceExplanations": {
      "ア": "重要陳列部を300とする点が低すぎる。",
      "イ": "A=300、B=750はいずれも設問の対象領域に合わない。",
      "ウ": "A=500、B=300ではともに設問の推奨値と異なる。",
      "エ": "A=500、B=750では大小が逆。",
      "オ": "A=750ルクス、B=500ルクスで一致。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q30",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 30,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "価格政策",
    "topicTags": [
      "価格弾力性",
      "需要の先食い"
    ],
    "difficulty": 3,
    "question": "スーパーマーケットにおけるグロサリーの商品価格に関する以下の文章の空欄Ａ\n とＢに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n\n 　近年の物価上昇により、仕入原価が高まり販売価格を上げなければならないこと\n が増えているが、価格弾力性が　 Ａ  商品の大幅な値上げは、売上数量を大き\n く減らしてしまうため注意が必要である。\n 　また、特売による販売促進は、　 Ｂ  により、販促終了後に、特売商品の定\n 番売上が販促実施前と比べて、大きく落ち込むリスクがあるため、実施頻度やタイ\n ミングを調整することが必要である。",
    "choices": {
      "ア": "Ａ：高い　　Ｂ：需要の先食い",
      "イ": "Ａ：高い　　Ｂ：チェリーピッカー",
      "ウ": "Ａ：低い　　Ｂ：需要の先食い",
      "エ": "Ａ：低い　　Ｂ：チェリーピッカー"
    },
    "answer": "ア",
    "explanation": "価格弾力性の高い商品は値上げで数量が大きく減る。特売後の定番売上低下には需要の先食いが関係する。\n\n正答の根拠：\nア：Aは高い、Bは需要の先食いで両方一致。",
    "choiceExplanations": {
      "ア": "Aは高い、Bは需要の先食いで両方一致。",
      "イ": "価格弾力性は合うが、特売後の売上低下はチェリーピッカーではなく需要の先食い。",
      "ウ": "需要の先食いは合うが、値上げに数量が敏感なのは弾力性が高い場合。",
      "エ": "弾力性と特売後の現象の双方が逆。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q31",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 31,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "販売促進",
    "topicTags": [
      "クーポン",
      "インストアプロモーション"
    ],
    "difficulty": 3,
    "question": "インストアプロモーションに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "エンド売場では、売場内の優位置・劣位置を考慮して陳列する必要がない。",
      "イ": "クーポン販促は、同額の値引販促と比べて消費者の内的参照価格を低下させに\n  くい。",
      "ウ": "新聞折込チラシや電子チラシの目的は、主に非計画購買を増やすことである。",
      "エ": "デモンストレーション販売は、主にリピート購買を増やすことを目的に実施す\n  る。",
      "オ": "バンドル販売は、販売価格を下げてお買得感を演出するが、買上点数の減少に\n  つながりやすい。"
    },
    "answer": "イ",
    "explanation": "クーポンは対象者や利用時に限って価格を下げるため、恒常的な値引より内的参照価格を下げにくい。\n\n正答の根拠：\nイ：クーポン割引は通常価格自体を下げる値引より内的参照価格の低下を抑えやすい。",
    "choiceExplanations": {
      "ア": "エンド売場でも視認性や動線による優位置・劣位置がある。",
      "イ": "クーポン割引は通常価格自体を下げる値引より内的参照価格の低下を抑えやすい。",
      "ウ": "チラシは来店前の計画購買や来店誘導にも働き、主に非計画購買とは言えない。",
      "エ": "デモ販売は試用・実演で新規購買や初回購入を促す。リピート購買が主目的とは限らない。",
      "オ": "バンドル販売は複数商品の一括購入を促し、買上点数を増やし得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q32",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 32,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "EC運営",
    "topicTags": [
      "特定商取引法",
      "フルフィルメント"
    ],
    "difficulty": 3,
    "question": "インターネットを通じて消費者に商品を販売するネットショップの運営に関する\n 記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "OMO とは、実店舗を持たずにネットショップで顧客に購買体験の価値を高め\n  る取り組みである。",
      "イ": "SEO とは、セキュリティを高めるために必要な対策である。",
      "ウ": "アフィリエイト広告とは、検索エンジンで検索されたキーワードに対応して、\n  検索結果ページに掲載される広告である。",
      "エ": "個人でネットショップを運営する場合、特定商取引法の規制対象となる。",
      "オ": "フルフィルメントサービスを利用すると、在庫の所有権を持たずにネット\n  ショップを運営することができる。"
    },
    "answer": "エ",
    "explanation": "個人によるネットショップでも反復継続した通信販売の事業者に当たれば特定商取引法の規制対象となる。\n\n正答の根拠：\nエ：個人運営でも通信販売の事業者には特商法が適用される。",
    "choiceExplanations": {
      "ア": "OMOはオンラインとオフラインを融合する考えで、実店舗を持たないことの定義ではない。",
      "イ": "SEOは検索エンジン最適化であり、セキュリティ対策の略ではない。",
      "ウ": "検索語連動の検索結果広告はリスティング広告。アフィリエイトは成果報酬型の提携広告。",
      "エ": "個人運営でも通信販売の事業者には特商法が適用される。",
      "オ": "フルフィルメントは保管・梱包・配送等の受託であり、在庫所有権の移転を意味しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q33",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 33,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "在庫管理",
    "topicTags": [
      "ダブルビン方式",
      "発注点補充点方式"
    ],
    "difficulty": 3,
    "question": "小売店舗における発注方法に関する以下の文章の空欄Ａ～Ｃに入る語句の組み合\n わせとして、最も適切なものを下記の解答群から選べ。\n\n\n 　ダブルビン方式と発注点補充点方式の共通点は、在庫量があらかじめ定められた\n 発注点まで減少したときに、発注するということである。発注間隔は、販売量の増\n 減によって　 Ａ  。\n 　相違点は、１回当たりの発注量の算出の仕方である。ダブルビン方式の発注量\n は、あらかじめ定められた一定量であり、　 Ｂ  と同量である。発注点補充点\n 方式の発注量は、補充点と　 Ｃ  との差である。",
    "choices": {
      "ア": "Ａ：変化しない　　Ｂ：発注点　　Ｃ：安全在庫量",
      "イ": "Ａ：変化しない　　Ｂ：補充点　　Ｃ：有効在庫量",
      "ウ": "Ａ：変化する　　　Ｂ：発注点　　Ｃ：安全在庫量",
      "エ": "Ａ：変化する　　　Ｂ：発注点　　Ｃ：有効在庫量",
      "オ": "Ａ：変化する　　　Ｂ：補充点　　Ｃ：有効在庫量"
    },
    "answer": "エ",
    "explanation": "両方式とも在庫が発注点に達した時に発注するため間隔は需要で変化する。ダブルビンの定量は発注点と同量。発注点補充点方式は補充点−有効在庫量を発注する。",
    "choiceExplanations": {
      "ア": "Aは販売量に応じて変化し、Cは安全在庫量でなく有効在庫量。",
      "イ": "Aは定期でなく変化し、Bは補充点でなく発注点。",
      "ウ": "A・Bは一致するがCは有効在庫量。",
      "エ": "A=変化する、B=発注点、C=有効在庫量が一致。",
      "オ": "A・Cは合うがBは補充点でなく発注点。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q34",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 34,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "取引適正化法制",
    "topicTags": [
      "中小受託取引適正化法",
      "特定運送委託"
    ],
    "difficulty": 3,
    "question": "「下請代金支払遅延等防止法（下請法）」が改正され、「製造委託等に係る中小受託\n 事業者に対する代金の支払の遅延等の防止に関する法律（中小受託取引適正化法）」\n  が2026 年１月１日に施行された。当該改正に伴い、適用対象要件の１つである取\n 引の内容に、「特定運送委託」が新たに追加された。この「特定運送委託」に該当する\n 取引として、最も適切なものはどれか。",
    "choices": {
      "ア": "貨物自動車運送事業者が貨物運送に併せて請け負った梱包を、梱包業者に委託\n  する取引",
      "イ": "貨物利用運送事業者が請け負った貨物運送のうちの一部を、他の運送事業者に\n  委託する取引",
      "ウ": "自社工場間における半製品の運送のような、取引の相手方に対する運送ではな\n  い運送を、荷主が運送事業者に委託する取引",
      "エ": "内航運送事業者が請け負う貨物運送に必要な船舶の運航を、他の内航運送事業\n  者に委託する取引",
      "オ": "発荷主が販売した商品を取引の相手方に引き渡す場合に、その商品の運送を運\n  送事業者に委託する取引"
    },
    "answer": "オ",
    "explanation": "特定運送委託には発荷主が取引相手に引き渡す販売商品の運送を運送事業者へ委託する場合が該当する。設問の施行日2026年1月1日を基準に判定。",
    "choiceExplanations": {
      "ア": "運送に伴う梱包の再委託であり、発荷主から運送事業者への特定運送委託の対象と異なる。",
      "イ": "運送事業者による運送の再委託は特定運送委託として問う発荷主の委託ではない。",
      "ウ": "自社工場間の運送は取引相手への引渡しに伴うものではない。",
      "エ": "内航運送事業者の運航再委託で、発荷主の販売商品の引渡し委託ではない。",
      "オ": "発荷主が販売商品を取引相手へ引き渡すため運送事業者へ委託する場合に該当。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q35",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 35,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "物流管理",
    "topicTags": [
      "ユニットロード",
      "一貫パレチゼーション"
    ],
    "difficulty": 3,
    "question": "物流におけるユニットロードに関する以下の文章の空欄Ａ～Ｃに入る語句の組み\n 合わせとして、最も適切なものを下記の解答群から選べ。\n\n\n 　貨物をユニットロードにすることによって、荷役を機械化し、輸送や保管などを\n 一貫して効率化する仕組みをユニットロードシステムという。例えば、一貫パレチ\n ゼーションは、発地から着地まで一貫して 　 Ａ  物流を行うことをいう。ユ\n ニットロードシステムには、体系化された輸送包装寸法を得るための基準となる包\n 装モジュールがある。包装モジュールの倍数値または分割値を組み合わせて導き出\n した一連の平面寸法（長さ×幅）を包装モジュール寸法という。例えば、包装モ\n ジュール寸法1,100 mm × 1,100 mm は、 　 Ｂ  の包装モジュールから導かれ\n ている。\n 　一方、ユニットロードシステムによって物流効率が低下することがある。例え\n ば、平パレットを利用して貨物をトラックで輸送する場合、 　 Ｃ  ことがあ\n る。",
    "choices": {
      "ア": "Ａ：同一のパレットに貨物を積載したまま\n   　　Ｂ：600 mm × 400 mm　　　　Ｃ：トラックの積載率が低下する",
      "イ": "Ａ：同一のパレットに貨物を積載したまま\n   　　Ｂ：550 mm × 366 mm　　　　Ｃ：トラックの積載率が低下する",
      "ウ": "Ａ：同一のパレットに貨物を積載したまま\n   　　Ｂ：600 mm × 400 mm　　　　Ｃ：トラックの積卸の荷役時間が長くなる",
      "エ": "Ａ：同一の輸送機関で異なるパレットに貨物を積み替えながら\n   　　Ｂ：550 mm × 366 mm　　　　Ｃ：トラックの積卸の荷役時間が長くなる",
      "オ": "Ａ：同一の輸送機関で異なるパレットに貨物を積み替えながら\n   　　Ｂ：600 mm × 400 mm　　　　Ｃ：トラックの積載率が低下する"
    },
    "answer": "イ",
    "explanation": "一貫パレチゼーションは同じパレットで発地から着地まで輸送する。1100×1100mmは550×366mmのモジュール系列から導かれ、平パレットは車両積載率を下げる場合がある。",
    "choiceExplanations": {
      "ア": "A・Cは合うが、Bのモジュールは600×400mmではない。",
      "イ": "同一パレット、550×366mmの包装モジュール、平パレットによる積載率低下の組合せ。",
      "ウ": "Bが違い、ユニットロード化は通常積卸しの荷役時間を短縮する。",
      "エ": "Aの積替え前提とCの荷役時間増加が一貫パレチゼーションの説明に合わない。",
      "オ": "AとBが違う。Cの積載率低下のみあり得る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q36",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 36,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "物流センター",
    "topicTags": [
      "在庫型",
      "通過型"
    ],
    "difficulty": 3,
    "question": "小売業の物流センターの機能に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "仕入先から物流センターへの納品頻度を少なくするには、通過型物流センター\n  よりも、在庫型物流センターを利用する方が適している。",
      "イ": "通過型物流センター内の作業工程数を少なくするには、注文商品を事前に店舗\n  別に仕分けて入荷するタイプの物流センターよりも、事前に仕分けをせずに総量\n  をそのまま入荷するタイプの物流センターを利用する方が適している。",
      "ウ": "店舗での発注から納品までのリードタイムを短くするには、在庫型物流セン\n  ターよりも、通過型物流センターを利用する方が適している。",
      "エ": "物流センターから店舗へのカテゴリー納品は、納品車両の積載効率を上昇させ\n  るのに適している。",
      "オ": "プロセスセンターは、物流ネットワーク上で輸送機関を切り替えることを主な\n  機能としており、貨物ターミナル駅やコンテナターミナルなどと呼ばれる。"
    },
    "answer": "ア",
    "explanation": "在庫型センターはまとめて入荷・保管して店舗へ供給できるため、仕入先からの納品頻度を減らすのに向く。\n\n正答の根拠：\nア：在庫型なら仕入先の納品をまとめ、在庫から出荷できる。",
    "choiceExplanations": {
      "ア": "在庫型なら仕入先の納品をまとめ、在庫から出荷できる。",
      "イ": "事前店舗別仕分けで入荷したほうがセンター内の仕分け工程を減らせる。",
      "ウ": "センター内に在庫のある在庫型のほうが注文から納品までを短縮しやすい。",
      "エ": "カテゴリー別納品は売場作業に有利でも混載・車両積載効率の向上を必ずしも意味しない。",
      "オ": "プロセスセンターは流通加工等を担い、輸送モードの切替拠点の説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q37",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 37,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "物流センター",
    "topicTags": [
      "ピッキング",
      "ロケーション管理"
    ],
    "difficulty": 3,
    "question": "物流センターの運営に関する記述の正誤の組み合わせとして、最も適切なものを\n 下記の解答群から選べ。\n\n\n ａ　トラック予約受付システムを導入すると、トラックの荷待ち時間を短縮させる\n  効果が期待できる。\n ｂ　ピッキングする商品品目数がオーダー数より少ない場合には、種まき方式より\n  も摘み取り方式の方が適している。\n ｃ　フリーロケーション管理は、固定ロケーション管理よりも、人によるピッキン\n  グの作業効率が高いが、保管効率は低い。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：正",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正"
    },
    "answer": "ウ",
    "explanation": "a正。品目数がオーダー数より少なければ一括で集めて仕分ける種まき方式が向くためb誤。フリーロケーションは保管効率を上げやすく、人手のピッキング効率は固定方式が高い場合がありc誤。",
    "choiceExplanations": {
      "ア": "aは合うがbは種まき方式が向き、摘み取り方式ではない。",
      "イ": "aは合うがcの作業効率・保管効率の特徴が逆。",
      "ウ": "a正、b誤、c誤の組合せ。",
      "エ": "予約受付システムで荷待ち短縮が期待できるのでaを誤とする点が違う。",
      "オ": "aを誤、cを正とする点が違う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q38",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 38,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "商品識別",
    "topicTags": [
      "GTIN",
      "JANコード"
    ],
    "difficulty": 3,
    "question": "一般財団法人流通システム開発センターでは、商品変更などにともないGTIN-\n  13 が変更になる具体的な内容を「10 の基準」として定めている。その基準に従えば、\n 自発的に従来商品と分けて受発注する意図はない場合に、以下の商品変更例の中で\n 特に新たなGTIN-13 を設定する必要がない事例として、最も適切なものはどれか。\n ただし、記載以外の変更はないものとする。",
    "choices": {
      "ア": "従来商品のクッキーの成分にナッツなどのアレルゲンを追加し、商品表示を変\n  更した場合",
      "イ": "従来商品のコーヒー豆を有機栽培のコーヒー豆に変更し、オーガニック（有機）\n  マークを追加した場合",
      "ウ": "従来商品のジュースの内容量を500 ml から475 ml に減量した場合",
      "エ": "従来商品の包装容器をガラスからPET 素材に変更し、総重量を30 ％軽量化\n  した場合",
      "オ": "従来商品のポテトチップスのパッケージを、サッカーワールドカップ期間限定\n  で、サッカーワールドカップ用のデザイン包装に変更した場合"
    },
    "answer": "オ",
    "explanation": "一定期間だけのパッケージデザイン変更で、従来品と分けて受発注する意図がなければ新GTINの設定は特に不要。",
    "choiceExplanations": {
      "ア": "アレルゲン追加は消費者の安全に直結する成分変更なので新GTINが必要。",
      "イ": "オーガニック認証マークの追加は商品認証・表示の重要な変更で新GTINが必要。",
      "ウ": "500mlから475mlへの内容量変更は明示された内容量の変更で新GTINが必要。",
      "エ": "包装材変更に伴う総重量30%減は大きな寸法・重量属性の変更として新GTINが必要。",
      "オ": "期間限定のデザイン包装だけで、別管理の意図もないため新GTINは特に不要。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q39",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 39,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "商品識別",
    "topicTags": [
      "JANコード",
      "PLU"
    ],
    "difficulty": 3,
    "question": "商品コードやそのマーキングに関する以下の文章の空欄Ａ～Ｄに入る用語の組み\n 合わせとして、最も適切なものを下記の解答群から選べ。\n\n\n 　商品コードのマーキングには、商品の製造・出荷段階で、メーカーなどが取得し\n たGS1 事業者コードに基づくJAN コードを、商品包装や容器にマーキングする\n 　 Ａ  マーキングと、小売店が総菜や不定貫商品などに、店舗内のみで通用す\n る 　 Ｂ  コードをマーキングする 　 Ｂ  マーキングがある。 　 Ｂ\n コードには、価格情報がバーコード自体に埋め込まれている 　 Ｃ  方式と、\n バーコード自体に価格情報を持たず、データベースを用いて価格を参照する\n 　 Ｄ  方式がある。",
    "choices": {
      "ア": "Ａ：インストア  Ｂ：ソース      Ｃ：non-PLU  Ｄ：PLU",
      "イ": "Ａ：インストア  Ｂ：ソース     Ｃ：PLU      Ｄ：non-PLU",
      "ウ": "Ａ：ソース    Ｂ：インストア   Ｃ：non-PLU  Ｄ：PLU",
      "エ": "Ａ：ソース    Ｂ：インストア  Ｃ：PLU      Ｄ：non-PLU",
      "オ": "Ａ：フル     Ｂ：ソース      Ｃ：non-PLU  Ｄ：PLU"
    },
    "answer": "ウ",
    "explanation": "メーカー側のコード付与はソースマーキング、店内専用コードはインストアコード。価格を埋め込むのはnon-PLU、価格表を参照するのはPLU。",
    "choiceExplanations": {
      "ア": "ソースとインストアを逆にしている。",
      "イ": "A・Bが逆で、PLUとnon-PLUの価格保持も逆。",
      "ウ": "A=ソース、B=インストア、C=non-PLU、D=PLUが一致。",
      "エ": "A・Bは合うがC・Dが逆。",
      "オ": "メーカー付与をフル、店内付与をソースとする点が誤り。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q40",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 40,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "決済法制",
    "topicTags": [
      "資金決済法",
      "前払式支払手段"
    ],
    "difficulty": 3,
    "question": "資金決済に関する法律（資金決済法）は、近年の ICT の発達や利用者ニーズの多\n 様化などの資金決済システムをめぐる環境の変化に対応するため、前払式支払手\n 段、資金移動、資金清算、暗号資産（仮想通貨）などについて規定している。以下の\n 紙型の商品券などのうち、資金決済法の適用を受ける前払式支払手段として、最も\n 適切なものはどれか。",
    "choices": {
      "ア": "社員食堂の食券",
      "イ": "乗車券",
      "ウ": "全国共通おこめ券",
      "エ": "地方公共団体が発行する商品券",
      "オ": "美術館の入場券"
    },
    "answer": "ウ",
    "explanation": "全国共通おこめ券は紙型の商品券であり、資金決済法上の前払式支払手段に当たる。\n\n正答の根拠：\nウ：全国共通おこめ券は一般の商品券として前払式支払手段の規制対象。",
    "choiceExplanations": {
      "ア": "社員食堂の食券は従業員向け福利厚生等の適用除外に当たる。",
      "イ": "乗車券は輸送役務に係る適用除外の券。",
      "ウ": "全国共通おこめ券は一般の商品券として前払式支払手段の規制対象。",
      "エ": "地方公共団体が発行する商品券は発行者に関する適用除外。",
      "オ": "美術館の入場券は施設利用・入場に関する適用除外。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q41",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 41,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "データ分析",
    "topicTags": [
      "尺度水準"
    ],
    "difficulty": 3,
    "question": "ある小売店の販売データを用いて、優良顧客と一般顧客の購買行動の違いを分析\n するために、顧客ID ごとの総購買金額の大きさで顧客を「一般顧客」と「優良顧客」\n という２つのクラスに分類した。その後、顧客属性、各商品の購買数、クラスを整\n 理して以下のようなデータセットを構築した。このとき、顧客ID、性別、年齢、\n クラスの各項目のデータと、その尺度水準（名義尺度、順序尺度、間隔尺度、比例\n 尺度）の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n\n  顧客ID  性別  年齢  商品Ａ（個）  ・・・   商品ZZZ（個）クラス\n    A001      １      28        5     ・・・           0          1\n    A002      ２      47         0     ・・・           1          0\n  ・・・ ・・・ ・・・  ・・・    ・・・    ・・・   ・・・\n    Z999      ３      32         1     ・・・           0          0\n ＊ただし、性別の１は女性、２は男性、３はその他を意味している。また、クラス\n の０は一般顧客を、１は優良顧客を意味している。",
    "choices": {
      "ア": "顧客ID －名義尺度　性別－名義尺度　年齢－比例尺度　クラス－名義尺度",
      "イ": "顧客ID －名義尺度　性別－順序尺度　年齢－比例尺度　クラス－順序尺度",
      "ウ": "顧客ID －名義尺度　性別－名義尺度　年齢－順序尺度　クラス－順序尺度",
      "エ": "顧客ID －間隔尺度　性別－名義尺度　年齢－順序尺度　クラス－名義尺度",
      "オ": "顧客ID －間隔尺度　性別－順序尺度　年齢－比例尺度　クラス－順序尺度"
    },
    "answer": "ア",
    "explanation": "IDと性別は区別の記号なので名義尺度。年齢は真の0と比率が意味を持つ比例尺度。ここでのクラス0/1は区分ラベルで名義尺度。",
    "choiceExplanations": {
      "ア": "顧客ID・性別・クラスは名義尺度、年齢は比例尺度で一致。",
      "イ": "性別コード1/2/3には大小関係がない。クラス0/1も序列データとして扱わない。",
      "ウ": "年齢は単なる順序でなく比が意味を持つ比例尺度。",
      "エ": "顧客IDは数量差に意味がない名義尺度、年齢は比例尺度。",
      "オ": "IDは間隔尺度ではなく、性別も順序尺度ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q42",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 42,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "情報法制",
    "topicTags": [
      "個人情報保護法",
      "仮名加工情報"
    ],
    "difficulty": 3,
    "question": "2015 年の個人情報保護法改正により「匿名加工情報」の制度が導入されたが、個\n 人情報を匿名加工情報にするには、データの削除や高度な加工技術を必要とする。\n また、不可逆的な加工を施すため、データの具体性や詳細さが失われ、分析用途が\n 限定されるという課題がある。そこで「仮名加工情報」は、データ利活用の促進と個\n 人のプライバシー保護の両立を目的として、2022 年４月１日施行の改正個人情報\n 保護法において新たに導入された。\n 　このような、「匿名加工情報」および「仮名加工情報」に関する記述の正誤の組み合\n わせとして、最も適切なものを下記の解答群から選べ。\n\n\n ａ　個人情報保護法で定める要配慮個人情報を含む個人情報を加工して、匿名加工\n  情報を作成することは禁止されていない。\n ｂ　個人情報を含む販売データを仮名加工情報に加工したとしても、他の情報と容\n  易に照合することができ、それにより特定の個人を識別することができる状態に\n  ある場合は、当該仮名加工情報は個人情報に該当する。\n ｃ　個人情報取扱事業者である仮名加工情報取扱事業者は、本人の事前の同意を得\n  なくても原則として、仮名加工情報である個人データを第三者に提供することが\n  できる。",
    "choices": {
      "ア": "ａ：正　　ｂ：正　　ｃ：誤",
      "イ": "ａ：正　　ｂ：誤　　ｃ：正",
      "ウ": "ａ：正　　ｂ：誤　　ｃ：誤",
      "エ": "ａ：誤　　ｂ：正　　ｃ：誤",
      "オ": "ａ：誤　　ｂ：誤　　ｃ：正"
    },
    "answer": "ア",
    "explanation": "a正（要配慮個人情報を含む元データから匿名加工情報を作成すること自体は禁止されない）、b正（容易照合で個人識別可能なら個人情報）、c誤（仮名加工情報である個人データの第三者提供は原則禁止）。",
    "choiceExplanations": {
      "ア": "a正、b正、c誤の組合せ。",
      "イ": "bは容易照合による識別が可能なので正しく、cは同意だけで原則第三者提供可能とはならない。",
      "ウ": "bを誤とするが識別可能な仮名加工情報は個人情報に当たる。",
      "エ": "aを誤とするが、適切に加工して匿名加工情報を作ることは可能。",
      "オ": "a・bを誤、cを正としており全て不一致。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  },
  {
    "id": "chusho-kigyo-shindanshi-2026-annual-unei-q43",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "year": 2026,
    "season": "annual",
    "qNumber": 43,
    "subject": "運営管理",
    "type": "multiple-choice",
    "category": "EC広告",
    "topicTags": [
      "CTR",
      "CVR",
      "ROAS"
    ],
    "difficulty": 3,
    "question": "ある小売店では商品販売を目的としたEC サイトを運用しており、そこで利用し\n ているネット広告の効果を評価しようとしている。以下の評価方法に関する記述の\n 空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選\n べ。\n\n\n 　最初にCTR を分析し、　 Ａ  を評価する。CTR が低い場合は、ターゲティ\n ングの変更やクリエイティブの改善を検討する必要がある。CTR が良好と考えら\n れる場合にはCVR を確認し、CVR が低い場合には 　 Ｂ  を検討する必要が\n ある。加えて、当該広告費に対する関連した売上を測る　 Ｃ  をモニタリング\n する。これらの指標を適切に管理し、広告効果を継続的に改善することが重要であ\n る。",
    "choices": {
      "ア": "Ａ：広告の訴求力　　Ｂ：ホームページの構成やSEO 対策\n  　　Ｃ：ROE",
      "イ": "Ａ：広告の訴求力　　Ｂ：ランディングページの構成や購入導線の改善\n  　　Ｃ：ROAS",
      "ウ": "Ａ：広告の訴求力　　Ｂ：ランディングページの構成や購入導線の改善\n  　　Ｃ：ROE",
      "エ": "Ａ：顧客の購買力　　Ｂ：ホームページの構成やSEO 対策\n  　　Ｃ：ROAS",
      "オ": "Ａ：顧客の購買力　　Ｂ：ランディングページの構成や購入導線の改善\n  　　Ｃ：ROE"
    },
    "answer": "イ",
    "explanation": "CTRは広告のクリック率で訴求力をみる。CVRが低ければランディングページや購入導線を改善する。広告費対売上はROAS。",
    "choiceExplanations": {
      "ア": "Aは合うが、CVR改善の直接対象はLP・購入導線で、CはROEでなくROAS。",
      "イ": "A=広告の訴求力、B=LP構成・購入導線、C=ROASで一致。",
      "ウ": "A・Bは合うがROEは自己資本利益率で広告費対売上ではない。",
      "エ": "CTRは顧客の購買力ではなく広告クリック率を表す。",
      "オ": "Bは合うがAは広告訴求力、CはROAS。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji2026/D1JC2026.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r08/1ji_seikai/2026D.pdf",
    "sourceAttribution": "一般社団法人日本中小企業診断士協会連合会・令和8年度中小企業診断士第1次試験 D運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-10-11"
  }
];
