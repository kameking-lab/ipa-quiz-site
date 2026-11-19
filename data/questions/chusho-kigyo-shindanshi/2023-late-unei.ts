import type { Question } from "@/lib/questions/types";

export const CHUSHO_2023_RETEST_D_QUESTIONS: Question[] = [
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q1",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 1,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "管理指標",
    "topicTags": [
      "管理指標",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "管理指標に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 作業者の遊休時間を求めるために、作業の遂行時間を調査し、標準時間を設定した。\nｂ 作業を行うのに実際に要した時間に対する標準時間の比率として、作業の能率を求めた。\nｃ 生産性を評価するために、労働量を生産量で除して得られる労働生産性を求めた。\nｄ 投入された主原材料の量に対する、実際に産出された製品の量の比率として、歩留りを求めた。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：正 ｄ：誤",
      "オ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "標準時間の設定自体は遊休時間の測定を目的としない。能率は標準時間÷実作業時間、労働生産性は生産量÷労働量、歩留りは産出量÷投入量である。",
    "choiceExplanations": {
      "ア": "ａの標準時間は所定の条件での標準的な作業所要時間を表す。労働生産性を求める際の分子は生産量である。",
      "イ": "実作業時間に対する標準時間の比は作業能率を表す。ｃは生産量と労働量の位置が逆である。",
      "ウ": "ａの標準時間設定と遊休時間の測定は目的が異なる。ｂは実作業時間に対する標準時間の割合なので正しい。",
      "エ": "ｃは生産量を労働量で除すのが正しい。ｄの産出量を投入量で除す指標は歩留りである。",
      "オ": "標準時間の設定自体は遊休時間の測定を目的としない。能率は標準時間÷実作業時間、労働生産性は生産量÷労働量、歩留りは産出量÷投入量である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q2",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 2,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "多種少量生産",
    "topicTags": [
      "多種少量生産",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "需要が安定せず、加工方法が多様な寿命の短い製品の多種少量生産に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "加工品の流れが一定ではないので、製品別レイアウトを導入する。",
      "イ": "需要の動向にあわせて頻繁に生産計画を変更することが必要なので、MRP を導入する。",
      "ウ": "需要変動に対し、生産量を変動させるのではなく、完成品在庫をもって対応する。",
      "エ": "スループットタイムを短くし、コストダウンを図るために、専用ラインを導入する。",
      "オ": "部品の共通化や標準化などにより、製品や加工順序の多様性を吸収する。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "部品を共通化すると、品種ごとに専用部品を揃える必要が減る。標準化した部品や作業を組み合わせれば加工順序にも対応しやすくなる。",
    "choiceExplanations": {
      "ア": "加工経路が一定しない場合、異なる製品に同じ種類の設備を使える工程別レイアウトが適している。製品別レイアウトは流れが安定した品目に向く。",
      "イ": "MRPは部品の必要量や必要時期を求める仕組みである。需要変動による計画の頻繁な変更は所要量の再計算を増やす。",
      "ウ": "製品寿命が短く需要が不安定なときは、完成品在庫で吸収すると売れ残りのリスクが高い。",
      "エ": "専用ラインは一定の製品を継続的に多量に作るときに向く。品種切替の多い現場では設備の汎用性が有利である。",
      "オ": "部品を共通化すると、品種ごとに専用部品を揃える必要が減る。標準化した部品や作業を組み合わせれば加工順序にも対応しやすくなる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q3",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 3,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "生産順序",
    "topicTags": [
      "生産順序",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "ある職場に到着している ３ 種類の製品Ａ、Ｂ、Ｃについて、生産を開始してからすべての製品の加工を完了するまでの時間（総所要時間）を最小化する生産順序について考える。この職場の作業条件は以下に示すとおりである。\n＜作業条件＞\n・各製品は、最初に第 １ 工程で、次に、第 ２ 工程で同じ順序で加工される。\n・各工程では一度加工が始まったら、その製品が完成するまで同じ製品を加工する。\n・工程間の運搬時間は １ 時間とする。\n・各製品の各工程における加工時間は下表に示される。\n\n（単位：時間）\n製品 Ａ Ｂ Ｃ\n第 １ 工程 ５ ４ ３\n第 ２ 工程 ２ ５ ３\n第 １ 工程における ３ つの製品Ａ、Ｂ、Ｃの投入順序に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "Ａ、Ｂ、Ｃの順に投入すると、総所要時間は 17 時間である。",
      "イ": "Ａ、Ｃ、Ｂの順に投入すると、総所要時間は 19 時間である。",
      "ウ": "Ｂ、Ｃ、Ａの順に投入すると、SPT 順に投入するよりも総所要時間は長くなる。",
      "エ": "SPT 順に投入すると、総所要時間は 15 時間である。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "最初の工程の処理時間が短い順はＣ、Ｂ、Ａである。第2工程の完了は順に時刻7、13、15となり、総所要時間は15時間である。",
    "choiceExplanations": {
      "ア": "第2工程でＢが時刻15に終わり、続くＣの加工に3時間を要する。全体は18時間である。",
      "イ": "第1工程で最後のＢが時刻12に完成する。運搬して時刻13に第2工程を開始し、時刻18に終了する。",
      "ウ": "Ｂ、Ｃ、Ａの順でも第2工程の終了時刻は順に10、13、15となる。SPT順と同じである。",
      "エ": "最初の工程の処理時間が短い順はＣ、Ｂ、Ａである。第2工程の完了は順に時刻7、13、15となり、総所要時間は15時間である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q4",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 4,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "ラインバランシング",
    "topicTags": [
      "ラインバランシング",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "要素作業ａ～ｇの先行関係が下図に示される製品を、単一ラインで生産する。生産計画量が 200 個、稼働予定時間が 30 時間のとき、実行可能な最小の作業工程数とその工程数での最小のサイクルタイムの組み合わせとして、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "作業工程数： ２ サイクルタイム： ９ 分",
      "イ": "作業工程数： ３ サイクルタイム： ６ 分",
      "ウ": "作業工程数： ３ サイクルタイム： ７ 分",
      "エ": "作業工程数： ３ サイクルタイム： ８ 分",
      "オ": "作業工程数： ４ サイクルタイム： ５ 分"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "計画を満たす上限は1個当たり9分であり、2工程は先行関係の下で実行できない。ａ・ｂ、ｃ・ｄ・ｅ、ｆ・ｇなら順に7、6、5分となり、最小は3工程で7分である。",
    "choiceExplanations": {
      "ア": "全要素の合計は18分だが、最初の9分に収まる先行関係を満たす作業集合では、残りを9分以内に集約できない。例えばａ・ｂ・ｄを配置しても残りは10分になる。",
      "イ": "6分以内の第1工程に可能なのはａだけ、またはａとｄである。最大5分しか配置できず、残る13分以上を2工程に収容できない。",
      "ウ": "計画を満たす上限は1個当たり9分であり、2工程は先行関係の下で実行できない。ａ・ｂ、ｃ・ｄ・ｅ、ｆ・ｇなら順に7、6、5分となり、最小は3工程で7分である。",
      "エ": "3工程は必要だが、ａ・ｂ、ｃ・ｄ・ｅ、ｆ・ｇとすれば最長工程は7分で済む。",
      "オ": "4工程ならａ・ｄ、ｂ、ｃ・ｅ、ｆ・ｇの順で5分以内にできる。設問は工程数を先に最小化するため、3工程での最短時間を求める。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q4.png"
    ],
    "imageAltTexts": [
      "要素作業の先行順位図。ａは4分でｂ・ｃ・ｄに先行する。ｂとｃは各3分でｅに、ｃと1分のｄはｆに先行する。ｅとｆは各2分で3分のｇに先行する。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q5",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 5,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "フロムツウチャート",
    "topicTags": [
      "フロムツウチャート",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "ある工場の ８ 台の機械Ａ～Ｈ間における １ 日の品物の運搬回数を分析した結果、次のフロムツウチャートが得られた。この図表から読み取れる内容に関する記述として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "運搬回数が最も多いのは機械Ｄ・Ｆ間である。",
      "イ": "機械Ｃからは他のすべての機械に品物が運搬されている。",
      "ウ": "機械間で双方向の運搬が発生するのは ２ カ所である。",
      "エ": "他の機械からの機械Ｂへの運搬回数は 12 である。",
      "オ": "流出する運搬回数が最も多いのは機械Ｃである。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "両向きのセルがある組はＣ・Ｄ間とＥ・Ｇ間の2組である。Ｂ列にはＡから12回とＨから2回が記録されている。流入の合計は14回となる。",
    "choiceExplanations": {
      "ア": "Ｄ・Ｆ間はＤからＦへの31回で、Ｃ・Ｄ間の往復合計は22＋10＝32回である。",
      "イ": "Ｃ行にはＡ列やＢ列のように空白のセルがある。Ｃから全機械に流出しているわけではない。",
      "ウ": "両向きのセルがある組はＣ・Ｄ間とＥ・Ｇ間の2組である。",
      "エ": "Ｂ列にはＡから12回とＨから2回が記録されている。流入の合計は14回となる。",
      "オ": "Ｃからの流出は49回である。Ｄからの流出は10＋4＋31＋5＝50回となり、Ｃを上回る。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q5.png"
    ],
    "imageAltTexts": [
      "From行とTo列で機械間の運搬回数を示す。Ａ行はＢ12、Ｃ3、Ｅ2、Ｆ8、Ｈ2。Ｂ行はＣ5、Ｄ6、Ｆ20、Ｇ7。Ｃ行はＤ22、Ｅ15、Ｆ7、Ｇ1、Ｈ4。Ｄ行はＣ10、Ｅ4、Ｆ31、Ｇ5。Ｅ行はＤ2、Ｇ10、Ｈ7。Ｆ行はＧ9、Ｈ9。Ｇ行はＥ8、Ｈ19。Ｈ行はＢ2。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q6",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 6,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "生産方式",
    "topicTags": [
      "生産方式",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "生産方式に関する関連性の強い用語の組み合わせとして、最も適切なものはどれか。",
    "choices": {
      "ア": "アジャイル生産と大量生産",
      "イ": "間欠生産とロット生産",
      "ウ": "セル生産と部品中心生産",
      "エ": "モジュール生産と製番管理"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "間欠生産では品目ごとに生産を区切る。一定数量を一つのまとまりとして処理するロット生産はその代表例である。",
    "choiceExplanations": {
      "ア": "アジャイル生産は需要変化への迅速な対応を重視する。大量生産は同一仕様の品目を大量に作る方式である。",
      "イ": "間欠生産では品目ごとに生産を区切る。一定数量を一つのまとまりとして処理するロット生産はその代表例である。",
      "ウ": "セル生産では担当者や小チームが複数工程を受け持つ。部品中心生産という語はその組織形態を示さない。",
      "エ": "モジュール生産は標準化した構成単位を組み合わせる方式である。製番管理は受注品などを製造番号単位で追跡する管理方法である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q7",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 7,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "在庫評価",
    "topicTags": [
      "在庫評価",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "在庫評価に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 後入れ先出し法では、古いものが残っていると考えて、現在の在庫の価値を評価する。\nｂ 移動平均法では、受け入れるものの数量とその時点の在庫数量の和を、受け入れるものの金額とその時点の在庫金額の和で除して平均単価を求める。\nｃ 先入れ先出し法では、古いものから順に払い出されたと考えて、現在の在庫の価値を評価する。\nｄ 総平均法では、期首在庫高と期間受入れ額の和を、期首在庫数量と期間受入れ数量との和で除して平均単価を求める。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "後入れ先出しでは古い在庫が残り、先入れ先出しでは古い在庫が先に出る。移動平均の分子は金額で、総平均は期首と期中受入れを合算する。",
    "choiceExplanations": {
      "ア": "ｂの加重平均は合計金額を合計数量で割る。ｃの先入れ先出しでは古い品を先に払い出す。",
      "イ": "後入れ先出しでは古い在庫が残り、先入れ先出しでは古い在庫が先に出る。移動平均の分子は金額で、総平均は期首と期中受入れを合算する。",
      "ウ": "ｄは期首在庫高と期間受入額の合計を対応する数量で除す正しい式である。",
      "エ": "ａの後入れ先出しでは古い在庫が残る。ｂでは合計金額を合計数量で除すので、提示式は逆である。",
      "オ": "ａは正しい。後入れ先出しは、新しく受け入れた品が先に払い出されると仮定する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q8",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 8,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "経済的発注量",
    "topicTags": [
      "経済的発注量",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "経済的発注量モデルにおけるＴ期間の総費用を表す数式として、最も適切なものはどれか。ただし、Q を １ 回当たりの発注量、d を １ 期当たりの推定需要量、a を １ 回当たりの発注費、b を １ 個 １ 期当たりの保管費とする。",
    "choices": {
      "ア": "aTd／Q ＋ bTQ",
      "イ": "aTd／Q ＋ bTQ／2",
      "ウ": "aTQ／2 ＋ bTd／Q",
      "エ": "aTQ ＋ bTd／Q"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "発注はＴd個の需要に対してＴd/Ｑ回である。平均在庫Ｑ/2をＴ期保管する費用を加えると、aＴd/Ｑ＋bＴＱ/2となる。",
    "choiceExplanations": {
      "ア": "期中在庫はＱから0まで減るため平均Ｑ/2である。保管費にＱ全量を掛けると2倍になる。",
      "イ": "発注はＴd個の需要に対してＴd/Ｑ回である。平均在庫Ｑ/2をＴ期保管する費用を加えると、aＴd/Ｑ＋bＴＱ/2となる。",
      "ウ": "aは1回当たり発注費なので発注回数Ｔd/Ｑを掛ける。平均在庫Ｑ/2に掛ける係数はbである。",
      "エ": "bは1個1期の保管費なので発注回数Ｔd/Ｑには掛けない。aに掛けるのは発注回数である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q9",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 9,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "QC七つ道具",
    "topicTags": [
      "QC七つ道具",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "QC ７ つ道具と新 QC ７ つ道具に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "ある製品の重量と強度の関係を調べるため、連関図を作成した。",
      "イ": "原因と結果、目的と手段などが複雑に絡み合った問題の相互関係を調べるため、特性要因図を作成した。",
      "ウ": "重量に関する不適合品の発生状況を調べるため、散布図を作成した。",
      "エ": "２ つの特性値が対になった時系列データを ２ 次元平面上にプロットして、管理図を作成した。",
      "オ": "不良発生の主要な原因を特定するため、パレート図を作成した。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "パレート図では不良を原因などの区分別に集計し、大きい順に並べる。累積比率から優先して対処する区分を把握できる。",
    "choiceExplanations": {
      "ア": "重量と強度のような二つの測定値の関係を見るには散布図を使う。連関図は問題を取り巻く因果関係を結び付ける道具である。",
      "イ": "複数の原因や手段が互いに絡む場合は連関図が適する。特性要因図は一つの特性に影響する要因を体系化する。",
      "ウ": "不適合の発生件数を確認するにはチェックシートや不良区分別の集計が適する。散布図は二変量の対応をみる図である。",
      "エ": "二つの特性値を対にして座標に置くのは散布図である。管理図では工程の特性値を時系列に追い、管理限界と照合する。",
      "オ": "パレート図では不良を原因などの区分別に集計し、大きい順に並べる。累積比率から優先して対処する区分を把握できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q10",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 10,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "工程分析",
    "topicTags": [
      "工程分析",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "JIS で定義される工程分析に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 工程分析では、生産対象物が製品になる過程などを系統的に、対象に適合した図記号で表して調査・分析をする。\nｂ 工程図記号には、 ５ つの基本図記号と ３ つの補助図記号の他に複合記号がある。\nｃ 工程図記号は、形状に変化を与える加工工程、位置に変化を与える運搬工程、数量または品質の基準に対する合否を判定する検査工程に大別される。\nｄ 作業者工程分析では、原材料、部品などの生産対象物が製品になる過程が工程図記号で表される。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：正",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "工程分析は生産過程を記号化する。ｂの記号数には誤りがあり、ｃは停滞を欠き、ｄは製品工程分析の説明である。",
    "choiceExplanations": {
      "ア": "ｂは基本記号と補助記号の数の説明に誤りがある。ｄで述べている分析対象は作業者の行動ではなく生産対象物である。",
      "イ": "ｃは貯蔵と滞留を表す停滞を落としている。加工・運搬・検査だけでは工程図記号を分類しきれない。",
      "ウ": "工程分析は生産過程を記号化する。ｂの記号数には誤りがあり、ｃは停滞を欠き、ｄは製品工程分析の説明である。",
      "エ": "ａは工程分析の定義に沿う。作業者工程分析で工程記号にするのは作業者の行動の経過である。",
      "オ": "ｃは貯蔵や滞留に当たる停滞を欠く。ｄは生産対象物を軸にした製品工程分析を述べている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q11",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 11,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "生産統制",
    "topicTags": [
      "生産統制",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "生産統制に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "現品管理は、資材、仕掛品、製品などの物について加工の状況を管理する活動で、現物管理ともいう。",
      "イ": "進捗管理は、仕事の進捗状況を把握し、日々の仕事の進み具合を調整する活動で、進度管理ともいう。",
      "ウ": "プルシステムは、前工程から引き取られた量を補充するためにだけ、生産活動を行う管理方式で、前工程引き取り方式ともいう。",
      "エ": "余力管理は、各工程または作業者について、現在の負荷状況と現有能力とを把握し、現在どれだけの余力または不足があるかを検討し、生産数量を増減させる活動で、工数管理ともいう。",
      "オ": "流動数管理は、流動数分布を利用して、生産システムの問題点を把握したり、改善の方法を検討する分析手法である。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "進捗管理は予定に対する作業の実績を点検し、遅れや前倒しを日々調整する。進度管理とも呼ばれる。プル方式では後工程が前工程から必要分を引き取り、前工程は後工程に引き取られた量だけ補充する。",
    "choiceExplanations": {
      "ア": "現品管理では資材や製品の所在、数量、移動などを把握する。加工の進み具合は進捗管理の対象である。",
      "イ": "進捗管理は予定に対する作業の実績を点検し、遅れや前倒しを日々調整する。進度管理とも呼ばれる。",
      "ウ": "プル方式では後工程が前工程から必要分を引き取り、前工程は後工程に引き取られた量だけ補充する。",
      "エ": "余力管理は能力と負荷の差を捉え、負荷配分や人員・設備などを調整する。生産数量の増減に限定した活動ではない。",
      "オ": "流動数管理は投入量、完了量、仕掛量の推移を追って流れを管理する。設問のような問題発見と改善検討のための分析手法は流動数分析に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q12",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 12,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "線形計画法",
    "topicTags": [
      "線形計画法",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "ある工場では、 ４ 台の機械設備を用いて ２ 種類の製品Ｘ、Ｙを生産することができる。下表には、製品を １ 単位生産するのに必要な各機械の工数と製品を １ 単位生産して得られる単位利益、および現状で使用可能な各機械の工数が示されている。また、参考として、下表に示した各機械における使用可能工数の制約を次ページに図示している。総利益を最も高くする方策として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "機械Ａの使用可能工数を現状から ４ 引き上げて 12 とする。",
      "イ": "機械Ｂの使用可能工数を現状から ３ 引き上げて 21 とする。",
      "ウ": "機械Ｃの使用可能工数を現状から ４ 引き上げて 28 とする。",
      "エ": "機械Ｄの使用可能工数を現状から ４ 引き上げて 28 とする。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "機械Ｃの上限を28にすればＸ＋Ｙ≦7になる。例えばＸ＝1、Ｙ＝6は全制約を満たし、利益は28である。",
    "choiceExplanations": {
      "ア": "機械Ｃが課すＸ＋Ｙ≦6はそのままで、総利益4(Ｘ＋Ｙ)の上限は24のままである。",
      "イ": "機械Ｂの上限を緩めても機械Ｃの制約は残るため、Ｘ＋Ｙを6より大きくできない。",
      "ウ": "機械Ｃの上限を28にすればＸ＋Ｙ≦7になる。例えばＸ＝1、Ｙ＝6は全制約を満たし、利益は28である。",
      "エ": "機械Ｄの上限を引き上げても機械ＣがＸ＋Ｙを6以下に制約する。利益24を超えられない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q12-1.png",
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q12-2.png"
    ],
    "imageAltTexts": [
      "各行は製品Ｘの所要工数、製品Ｙの所要工数、使用可能工数の順。Ａは2、0、8。Ｂは0、3、18。Ｃは4、4、24。Ｄは4、2、24。製品ＸとＹの単位利益はともに4。",
      "横軸は製品Ｘ、縦軸は製品Ｙ。機械ＡはＸ＝4、機械ＢはＹ＝6、機械ＣはＸ＋Ｙ＝6、機械Ｄは2Ｘ＋Ｙ＝12で示される。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q13",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 13,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "標準時間",
    "topicTags": [
      "標準時間",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "標準時間に関する以下の文章の空欄Ａ～Ｄに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。標準時間は、その仕事に適性をもち、習熟した作業者が、所定の作業条件の下で、必要な余裕をもち、正常な作業ペースによって仕事を遂行するために必要とされる時間で、 Ａ と Ｂ から構成され、おのおのはさらに、正味時間と余裕時間に分けられる。また、 Ａ は Ｃ と Ｄ とに分けることが可能である。",
    "choices": {
      "ア": "Ａ：主作業時間 Ｂ：準備作業時間 Ｃ：主体作業時間\nＤ：付随作業時間",
      "イ": "Ａ：主作業時間 Ｂ：段取作業時間 Ｃ：主体作業時間\nＤ：付随作業時間",
      "ウ": "Ａ：主作業時間 Ｂ：付随作業時間 Ｃ：主体作業時間\nＤ：準備作業時間",
      "エ": "Ａ：主体作業時間 Ｂ：準備段取作業時間 Ｃ：主作業時間\nＤ：付随作業時間",
      "オ": "Ａ：主体作業時間 Ｂ：付随作業時間 Ｃ：主作業時間\nＤ：準備段取作業時間"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "標準時間は主体作業時間と準備段取作業時間に分かれる。主体作業時間をさらに主作業時間と付随作業時間に分ける。",
    "choiceExplanations": {
      "ア": "主作業時間は主体作業時間の内訳の一つである。Ａに主作業時間を置くとＣとの包含関係が逆転する。",
      "イ": "Ｂは準備から段取りまでを含む準備段取作業時間である。Ａは主作業と付随作業を含む主体作業時間である。",
      "ウ": "付随作業時間は主体作業時間の内訳であり、準備段取作業時間に代わるＢには入らない。",
      "エ": "標準時間は主体作業時間と準備段取作業時間に分かれる。主体作業時間をさらに主作業時間と付随作業時間に分ける。",
      "オ": "付随作業は主体作業に含める。準備段取作業時間は主体作業時間と並ぶ区分なのでＤではなくＢに入る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q14",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 14,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "設備保全",
    "topicTags": [
      "設備保全",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "設備保全に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 生産保全の目的は、設備の計画、設計・製作から運用・保全を経て廃棄、再利用に至る過程で発生するライフサイクルコストを最小にすることによって経営に貢献することである。\nｂ 設備保全は、設備の性能を維持するために、設備の劣化防止、劣化測定および劣化回復の諸機能を担う、日常的または定期的な計画、点検、検査、調整、整備、修理、取替えなどの諸活動の総称である。\nｃ 定期保全は、設備の劣化傾向を設備診断技術などによって管理し、故障に至る前の最適な時期に最善の対策を行う方法である。\nｄ 予防保全は、アイテムの劣化の影響を緩和し、かつ、故障の発生確率を低減するために行う保全である。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：正 ｄ：誤",
      "イ": "ａ：正 ｂ：正 ｃ：誤 ｄ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：正 ｄ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：正 ｄ：正",
      "オ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "生産保全は設備のライフサイクル全体の費用を抑え、設備保全は性能を維持する活動を含む。ｃは予知保全の説明で、故障確率を低減するｄは予防保全に当たる。",
    "choiceExplanations": {
      "ア": "ｃは一定の周期で実施する定期保全ではなく、劣化状況を診断する予知保全に相当する。ｄは予防保全の目的に沿う。",
      "イ": "生産保全は設備のライフサイクル全体の費用を抑え、設備保全は性能を維持する活動を含む。ｃは予知保全の説明で、故障確率を低減するｄは予防保全に当たる。",
      "ウ": "ｂの点検、整備、修理などは設備保全に含まれる。ｃで述べる劣化傾向に応じた時機の選択は予知保全である。",
      "エ": "ａのライフサイクルコスト最小化は生産保全の目的である。ｃは一定の周期による定期保全の説明ではない。",
      "オ": "ａは正しい。生産保全は調達から廃棄・再利用までの費用を考慮する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q15",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 15,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "最適発注計画",
    "topicTags": [
      "最適発注計画",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "ある製品についての最適発注計画を考える。製品の発注費は １ 回当たり 5,000円、保管費は １ 個 １ 期当たり 50 円である。ただし、製品は、期首に発注し即時に納入され、保管費は、翌期以降に持ち越された量にだけ発生するものとする。下表は、毎期の予測需要量および最適発注計画を算出するための計算シートを示している。例えば、「 ２ 期に発注」の行と ４ 期の列で示されるセルの値 9,500 は、 ２ 期に ２ 期から ４ 期までの予測需要量の合計値 70 を発注した場合の費用を示している。すなわち、 ３ 期の予測需要量分 10 が １ 期間、 ４ 期の予測需要量分 40 が ２ 期間持ち越されることから、この発注に対する保管費が（10 × １ ＋ 40 × ２ ）× 50 ＝ 4,500 となり、これに発注費 5,000 を加えた値が 9,500 である。\nこの表から読み取れる記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ １ 期に全期間の予測需要量を発注したときの総在庫保管費は、8,000 円である。\nｂ ３ 期の予測需要量が 10 から 15 に変更されると、最適発注計画の発注期は変化する。\nｃ 最適発注計画では、 １ 期と ３ 期に発注が行われる。\nｄ 最適発注計画の総費用は 12,000 円である。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "一括発注の保管費は13,000－5,000＝8,000円となる。最適は第1・4期の12,000円で、第3期需要が増えてもその発注期は変わらない。",
    "choiceExplanations": {
      "ア": "第3期の需要を15に変えても第1期と第4期に発注する計画が最適である。ｂは誤りである。",
      "イ": "第1・3期の発注費用は6,000＋7,000＝13,000円である。第1・4期に発注する12,000円の方が安い。",
      "ウ": "一括発注の保管費は13,000－5,000＝8,000円となる。最適は第1・4期の12,000円で、第3期需要が増えてもその発注期は変わらない。",
      "エ": "一括発注の保管費8,000円は正しく、ａは誤りにできない。第3期の需要増加後も第1・4期の発注が最適となる。",
      "オ": "一括発注の総費用から発注費を除くと8,000円なのでａは正しい。ｃの第1・3期の組み合わせは13,000円かかる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q15.png"
    ],
    "imageAltTexts": [
      "第1〜4期の予測需要量は10、20、10、40。第1期の発注で第1〜4期までを賄う費用は順に5,000、6,000、7,000、13,000円。第2期の発注で第2〜4期までを賄う費用は順に5,000、5,500、9,500円。第3期の発注で第3期または第4期までを賄う費用は5,000、7,000円。第4期のみは5,000円。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q16",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 16,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "製品設計",
    "topicTags": [
      "製品設計",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "製品開発・製品設計に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 製品設計は、顧客のニーズ変化、生産者の技術向上、地球環境への対応などを動機として新たな製品を企画し、その製品化を図る活動である。\nｂ 生産設計は、機能設計の内容について、生産に対する容易性・経済性などを考慮して設計する活動である。\nｃ 機能設計は、期待する製品の性能を発揮するのに必要な機能とそれらの関連とを求め、各機能を実現させる構造を求める活動である。\nｄ マーケットインは、部品の製造販売を行う業者が、完成品のメーカーに設計の協力をして共同開発を行い、その際に自社の部品をその新製品の組立てに使用するように働きかける活動である。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：正 ｄ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：誤 ｄ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "製品設計は企画を受けて仕様・構造を具体化する活動で、ｂとｃは設計区分の説明に合う。マーケットインは顧客ニーズを起点とするのでｄは誤りである。",
    "choiceExplanations": {
      "ア": "ａは新製品の企画から製品化までを含む製品開発の説明である。ｃは実現すべき機能と構造を検討する機能設計に沿っている。",
      "イ": "ｂは正しい。機能設計の成果を作りやすさや経済性の観点で具体化するのが生産設計である。",
      "ウ": "製品設計は企画を受けて仕様・構造を具体化する活動で、ｂとｃは設計区分の説明に合う。マーケットインは顧客ニーズを起点とするのでｄは誤りである。",
      "エ": "ｃの機能と構造の対応を考える活動は機能設計である。ｄは部品メーカーの設計協力による採用提案を説明している。",
      "オ": "ｂの生産容易性と経済性は生産設計の観点である。ｄは顧客ニーズを出発点とするマーケットインの説明ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q17",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 17,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "ジャストインタイム",
    "topicTags": [
      "ジャストインタイム",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "JIT（ジャストインタイム）に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ かんばんと呼ばれる作業指示票を利用して、生産工程を選択する。\nｂ 最終工程の生産量を平準化することが重要である。\nｃ すべての工程が、後工程の要求に合わせて、必要な物を、必要なときに、必要な量だけ生産する生産方式である。\nｄ 作り過ぎによる中間仕掛品の滞留、工程の遊休などを生じさせないように、生産工程の流れ化および生産リードタイムの短縮に狙いがある。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：正",
      "イ": "ａ：正 ｂ：正 ｃ：正 ｄ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：正 ｄ：正",
      "エ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：誤 ｄ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "かんばんは補充する品目や数量を指示する。最終工程の平準化で後工程からの引取りを安定させ、必要量を必要時に供給して仕掛を抑える。",
    "choiceExplanations": {
      "ア": "かんばんは引取りや補充生産の指示に用いるためａは誤りである。後工程の要求に合わせて生産するｃは正しい。",
      "イ": "ａの工程選択はかんばんの役割と異なる。ｄは仕掛在庫を抑え、流れを良くするJITの狙いに沿う。",
      "ウ": "かんばんは補充する品目や数量を指示する。最終工程の平準化で後工程からの引取りを安定させ、必要量を必要時に供給して仕掛を抑える。",
      "エ": "最終工程の平準化は上流工程の負荷を安定させる。工程の流れ化とリードタイム短縮もJITの目的である。",
      "オ": "ｂの平準化とｃの後工程引取りはJITの構成要素である。いずれも正しい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q18",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 18,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "設備投資評価",
    "topicTags": [
      "設備投資評価",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "設備投資案の評価に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 原価比較法では、資本費用と操業費用との合計を求め、その総額によって評価する。\nｂ 資本回収期間法では、投資額が回収できる期間によって評価する。\nｃ 正味現在価値法では、投資によって得られるキャッシュフローを資本コストで割り引いた現在価値によって評価する。\nｄ 投資利益率法では、投資額を年間利益で除した比率によって評価する。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：正 ｄ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "原価比較法は資本費用と操業費用を比べ、回収期間法は投資の回収の早さを比べる。正味現在価値ではキャッシュフローの割引現在価値から投資額を引き、投資利益率の分子は利益である。",
    "choiceExplanations": {
      "ア": "原価比較法は資本費用と操業費用を比べ、回収期間法は投資の回収の早さを比べる。正味現在価値ではキャッシュフローの割引現在価値から投資額を引き、投資利益率の分子は利益である。",
      "イ": "回収期間法は投資額を回収できるまでの期間で評価する。正味現在価値法の計算には当初投資額の控除も必要である。",
      "ウ": "ｂの回収期間による判定は正しい。ｄは年間利益を投資額で割る向きが逆である。",
      "エ": "資本費用に操業費用を加えた比較は原価比較法である。ｃは割引後の収入に対する当初投資額の処理が欠けている。",
      "オ": "ａとｂは両手法の説明に沿う。ｄの投資額÷年間利益は投資利益率を表さない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q19",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 19,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "改善活動",
    "topicTags": [
      "改善活動",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "生産の合理化・改善に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 3S における専門化（specialization）は、生産工程、生産システム、工場または企業を対象に特定の機能に特化することである。\nｂ 5W1Ｈは、改善活動を行うときの指針で、「どれだけ」の問いかけが含まれる。\nｃ ECRS の原則におけるＲは、「削減できないか」という改善の指針または着眼点を意味する。\nｄ 動作経済の原則は、 １ ）身体の使用、 ２ ）作業場所、 ３ ）工具および設備の設計、に関する ３ つの原則に大別される。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤 ｄ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正 ｄ：誤",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤 ｄ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：正 ｄ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正 ｄ：正"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "3Sの専門化と動作経済の3区分は正しい。「どれだけ」は5W2Hの追加項目で、ECRSのＲは順序や配置の変更を表す。",
    "choiceExplanations": {
      "ア": "5W1Hには何を・なぜ・いつ・どこで・誰が・どのようにが含まれる。「どれだけ」はHow muchで、5W2Hで加わる。",
      "イ": "ECRSのＲはRearrangeで、順序や配置を変えられないかを問う。ｄの動作経済の3区分は正しい。",
      "ウ": "3Sの専門化と動作経済の3区分は正しい。「どれだけ」は5W2Hの追加項目で、ECRSのＲは順序や配置の変更を表す。",
      "エ": "ａは特定機能に特化する専門化の説明である。Ｒの見直し対象は順序や配置である。",
      "オ": "3Sの専門化は特定分野に集中することなのでａは正しい。Ｒを単に「削減」とするｃは誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q20",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 20,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "商業動態統計",
    "topicTags": [
      "商業動態統計",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "以下のグラフは、経済産業省の商業動態統計における小売業の業態別の年間販売額推移を示している。グラフ内の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "Ａ：ドラッグストア Ｂ：百貨店 Ｃ：ホームセンター",
      "イ": "Ａ：ドラッグストア Ｂ：ホームセンター Ｃ：百貨店",
      "ウ": "Ａ：百貨店 Ｂ：ドラッグストア Ｃ：ホームセンター",
      "エ": "Ａ：百貨店 Ｂ：ホームセンター Ｃ：ドラッグストア"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "上昇が続くＡはドラッグストアである。2020年に落ち込んだＢが百貨店で、比較的横ばいのＣがホームセンターに当たる。",
    "choiceExplanations": {
      "ア": "上昇が続くＡはドラッグストアである。2020年に落ち込んだＢが百貨店で、比較的横ばいのＣがホームセンターに当たる。",
      "イ": "2020年に販売が大きく落ちた線はＢであり、百貨店に当たる。Ｃは変動が比較的小さいホームセンターである。",
      "ウ": "Ａは2014年から2022年にかけて売上を伸ばしたドラッグストアである。百貨店に対応するのはコロナ禍の落ち込みが大きいＢである。",
      "エ": "ドラッグストアの線は上昇傾向のＡである。ホームセンターに対応するＣは3兆円台を中心に推移している。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q20.png"
    ],
    "imageAltTexts": [
      "2014年から2022年までの年間販売額の推移。コンビニエンスストアは約10兆円から12兆円に増加。Ａは約5兆円から8兆円に増加。Ｂは約7兆円から2020年に約5兆円へ減少し、その後やや回復。Ｃは3兆円台でおおむね横ばい。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q21",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 21,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "用途地域",
    "topicTags": [
      "用途地域",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "都市計画法および建築基準法では、用途地域とそこに建築可能な建築物について定められている。以下のａとｂの用途地域において、床面積が 1,000 m² のドラッグストア（ １ 階建て）を建築することができるかどうかの組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 工業専用地域\nｂ 準工業地域",
    "choices": {
      "ア": "ａ：建築することができる ｂ：建築することができる",
      "イ": "ａ：建築することができる ｂ：建築することができない",
      "ウ": "ａ：建築することができない ｂ：建築することができる",
      "エ": "ａ：建築することができない ｂ：建築することができない"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "建築基準法の用途制限で、工業専用地域にはこの物販店舗を建築できない。準工業地域には床面積1,000平方メートルの店舗を建築できる。",
    "choiceExplanations": {
      "ア": "工業専用地域は工業のための地域で、設問の物販店舗は建てられない。",
      "イ": "工業専用地域では設問の店舗は不可である。準工業地域ではこの規模の物販店舗を建てられる。",
      "ウ": "建築基準法の用途制限で、工業専用地域にはこの物販店舗を建築できない。準工業地域には床面積1,000平方メートルの店舗を建築できる。",
      "エ": "準工業地域では設問の規模・用途のドラッグストアを建てられる。工業専用地域と同じ制限はかからない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q22",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 22,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "中心市街地活性化法",
    "topicTags": [
      "中心市街地活性化法",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "中心市街地活性化法に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "この法律の目的は、中心市街地に位置するコミュニティの担い手としての商店街が、地域住民の生活の利便性を高めるために実施するさまざまな地域貢献事業を支援することである。",
      "イ": "市町村は、中心市街地の活性化に関する施策を総合的かつ効果的に推進するため、各市町村に中心市街地活性化本部を設置する。",
      "ウ": "中心市街地活性化協議会は、市町村が作成する基本計画について協議するための組織であり、認定基本計画の実施について、市町村に意見を述べることはできない。",
      "エ": "中心市街地活性化協議会を設置する場合、都市機能の増進を総合的に推進するための調整を図るのにふさわしい者か、経済活力の向上を総合的に推進するための調整を図るのにふさわしい者のいずれか一方のみを構成員として選択する必要がある。",
      "オ": "特定民間中心市街地経済活力向上事業を実施しようとする者は、単独または共同して、中心市街地活性化協議会における協議を経て、特定民間中心市街地経済活力向上事業計画を作成し、経済産業大臣の認定を申請することができる。"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "民間の事業実施者は単独でも共同でも計画を作成できる。中心市街地活性化協議会での協議を経て経済産業大臣に認定を申請する。",
    "choiceExplanations": {
      "ア": "中心市街地活性化法は都市機能の増進と経済活力の向上を一体的に推進する。地域貢献を行う商店街の支援を述べる規定とは目的が異なる。",
      "イ": "中心市街地活性化本部は国の内閣に置かれる。市町村は中心市街地の基本計画の作成などを行う。",
      "ウ": "協議会は基本計画の作成に関して協議し、認定基本計画の実施について市町村に意見を述べることもできる。",
      "エ": "協議会は都市機能の増進を担う側と経済活力の向上を担う側が共同で組織できる。いずれか一方だけを選ぶ制度ではない。",
      "オ": "民間の事業実施者は単独でも共同でも計画を作成できる。中心市街地活性化協議会での協議を経て経済産業大臣に認定を申請する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q23",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 23,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "立地適正化計画",
    "topicTags": [
      "立地適正化計画",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "都市再生特別措置法における立地適正化計画に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "居住環境誘導施設とは、居住環境の向上に資するものとして小規模なスーパーマーケット等の店舗が想定されており、小規模な病院・診療所等の医療施設は含まれない。",
      "イ": "居住調整区域とは、医療・福祉・商業等の都市機能を都市の中心拠点や生活拠点に誘導し集約することにより、これらの各種サービスを効率的に提供することを図る区域である。",
      "ウ": "都市計画上の区域区分が定められていない市町村においては、線引きの代替措置として立地適正化計画を活用することができる。",
      "エ": "立地適正化計画の区域は、都市計画区域と重複してはならない。",
      "オ": "立地適正化計画を活用して居住の誘導等を推進する際には、市街化区域ではなく市街化調整区域に居住を誘導することが必要である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "区域区分が定められていない都市でも、計画により居住や生活サービスの立地を誘導できる。線引きに代わる誘導手段として活用できる。",
    "choiceExplanations": {
      "ア": "住民の利便に資する小規模な医療施設も居住環境誘導施設として想定される。小売施設だけに限定されない。",
      "イ": "これは都市機能誘導区域の説明である。居住調整区域は住宅地化を抑制すべき区域に関する制度である。",
      "ウ": "区域区分が定められていない都市でも、計画により居住や生活サービスの立地を誘導できる。線引きに代わる誘導手段として活用できる。",
      "エ": "立地適正化計画は都市計画区域内を対象に作成する。両区域が重複しないという制限はない。",
      "オ": "計画は生活に必要な機能を確保できる区域へ居住を誘導する。市街化調整区域は市街化を抑制する区域である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q24",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 24,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "修正ハフモデル",
    "topicTags": [
      "修正ハフモデル",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "ある地域に住む消費者Ｘが、ある店舗に買い物に出かける確率を考えたい。その地域には店舗Ａと店舗Ｂの ２ 店舗のみが存在する。このとき、消費者Ｘが店舗Ｂに買い物に出かける確率を計算したい。以下で示す条件が与えられたとき、修正ハフモデルを用いて上記の確率を求める場合、最も適切なものを下記の解答群から選べ。なお、店舗の魅力度については売場面積を使用する。\n店舗Ａの売場面積 ：1,500 m²\n店舗Ａと消費者Ｘとの距離：800 m\n店舗Ｂの売場面積 ：600 m²\n店舗Ｂと消費者Ｘとの距離：400 m\n距離抵抗係数 ：2",
    "choices": {
      "ア": "5/13",
      "イ": "4/9",
      "ウ": "8/13",
      "エ": "8/9"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "店舗ＡとＢの魅力度は1,500/800²と600/400²であり、比は5対8である。Ｂの比率は8/(5＋8)＝8/13となる。",
    "choiceExplanations": {
      "ア": "5/13は店舗Ａを選ぶ確率である。距離の二乗で補正したＡとＢの魅力度の比は5対8になる。",
      "イ": "4/9は距離を一乗で補正した場合のＢの比率になる。設問の距離抵抗係数は2である。",
      "ウ": "店舗ＡとＢの魅力度は1,500/800²と600/400²であり、比は5対8である。Ｂの比率は8/(5＋8)＝8/13となる。",
      "エ": "魅力度の分子を8と置くと、合計の分母はＡの5を足した13である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q25",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 25,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "売場照明",
    "topicTags": [
      "売場照明",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "店舗施設の売場を演出する照明および色彩に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "光源の光の強さを表わす量を輝度という。",
      "イ": "周辺環境の中でどのくらい目立って見えるかを識別性という。",
      "ウ": "照明による物の色の見え方を光色という。",
      "エ": "光に照らされている面の明るさの度合いを照度という。",
      "オ": "文字の読みやすさの程度を明視性という。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "照度は受光面の単位面積当たりに入射する光束で、単位はルクスである。売場や作業面に届く明るさを評価する。",
    "choiceExplanations": {
      "ア": "光源から特定方向に出る光の強さは光度である。輝度は発光面などをある方向から見た単位面積当たりの光度を表す。",
      "イ": "周囲から目立ち視線を引く性質は誘目性である。識別性は対象を他と見分けられる度合いをいう。",
      "ウ": "照明で照らした物の色の見え方に関わる照明の性質は演色性である。光色は光源の発する光自体の色をいう。",
      "エ": "照度は受光面の単位面積当たりに入射する光束で、単位はルクスである。売場や作業面に届く明るさを評価する。",
      "オ": "文字の読みやすさは可読性で表す。明視性は明るさや対比などによる対象の見やすさに関わる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q26",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 26,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "売場の生産性",
    "topicTags": [
      "売場の生産性",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "下表は、店舗Ｘにおける、ある期間の売場別の売上高、粗利益率、SKU 数、ゴンドラ本数を示したものである。売場Ａから売場Ｅの ５ つの売場の生産性に関する記述として、最も適切なものを下記の解答群から選べ。なお、ここでは、スペース生産性はゴンドラ １ 本当たりの粗利益高で評価し、営業利益は粗利益から管理コストを差し引いたものとして計算する。管理コストは １SKU 当たり同一であるとする。また、表に記載した内容以外の条件については、すべて同一であることとする。",
    "choices": {
      "ア": "売場Ａと売場Ｃの １ SKU 当たりの粗利益高は同じである。",
      "イ": "ゴンドラ １ 本当たりの営業利益額が最も高いのは売場Ｄである。",
      "ウ": "商品の自動発注システムを導入して １ SKU 当たりの管理コストが半分になったとすると、そのときの営業利益額の増加額が一番大きい売場は、売場Ｂである。",
      "エ": "すべての売場でゴンドラ本数を １ 本ずつ減らしたとき、売場ごとの売上高がそれぞれ ３ 割減少しても、すべての売場でスペース生産性が高まる。",
      "オ": "最もスペース生産性が高い売場は、売場Ｅである。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "Ｄは1本当たり粗利益が36万円÷3＝12万円で最大で、1本当たりのSKU数も120÷3＝40と最少である。共通単価の管理費を差し引いても最も高い。",
    "choiceExplanations": {
      "ア": "売場Ａは20万円÷200＝1,000円、売場Ｃは20万円÷250＝800円である。",
      "イ": "Ｄは1本当たり粗利益が36万円÷3＝12万円で最大で、1本当たりのSKU数も120÷3＝40と最少である。共通単価の管理費を差し引いても最も高い。",
      "ウ": "管理費の削減額はSKU数に比例する。最多の300 SKUを持つ売場Ｅの増加額が最も大きい。",
      "エ": "例えば売場Ｃはゴンドラが5本から4本に減るが、粗利益も3割減る。1本当たりは4万円から3.5万円に落ちる。",
      "オ": "Ｅは30万円÷5＝6万円である。Ｄの36万円÷3＝12万円の方が高い。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q26.png"
    ],
    "imageAltTexts": [
      "売上高、粗利益率、SKU数、ゴンドラ本数の順。Ａは80万円、25％、200、4。Ｂは90万円、30％、200、3。Ｃは100万円、20％、250、5。Ｄは120万円、30％、120、3。Ｅは150万円、20％、300、5。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q27",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 27,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "棚割と陳列",
    "topicTags": [
      "棚割と陳列",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "食品スーパーの売場づくりに関する記述として、最も適切なものはどれか。ただし、いずれの記述でも売場の什器は、横幅が 90 cm で最上段の棚の高さが170 cm の常温のゴンドラであることとする。",
    "choices": {
      "ア": "３ 本以上横に並んだゴンドラをまたがって同じ商品カテゴリーをホリゾンタル陳列すると、商品を選びやすい売場になる。",
      "イ": "前進立体陳列をすると、棚のボリューム感を演出することができる。",
      "ウ": "陳列するすべての商品のフェイス数を均等に配分するよりも、過去の販売数量が少ない商品に多くのフェイス数を配分する方が、売場における欠品のリスクが小さくなる。",
      "エ": "販売力が最も高いと考えられるのは最上段の棚である。",
      "オ": "ブレークアップラインを売場内に作ると、商品の安さを演出することができる。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "奥の商品を手前へ出し、高さや奥行きを意識して陳列すると、棚の密度と量感を出せる。売れ行きの良い商品に十分な棚容量を配分すると、補充間の欠品を抑えられる。少量販売品への優先配分は需要と逆になる。",
    "choiceExplanations": {
      "ア": "広い範囲を横一列にすると、買物客が同じカテゴリのために横へ移動する。縦方向にまとめれば異なる高さからもカテゴリを見つけやすい。",
      "イ": "奥の商品を手前へ出し、高さや奥行きを意識して陳列すると、棚の密度と量感を出せる。",
      "ウ": "売れ行きの良い商品に十分な棚容量を配分すると、補充間の欠品を抑えられる。少量販売品への優先配分は需要と逆になる。",
      "エ": "一般に手に取りやすく見やすいゴールデンゾーンに販売力がある。170cmの最上段は商品への手の届きやすさに劣る。",
      "オ": "ブレークアップラインは陳列の連続を区切って売場に変化を付ける。安さを伝える専用の手法ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q28",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 28,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "売場演出",
    "topicTags": [
      "売場演出",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "売場における商品の陳列や売場の演出に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "衣料品をフェイスアウト陳列する目的は、関連購買の促進である。",
      "イ": "売場のテーマに合わせたプロップスは、買物客にテーマイメージの伝達を促進する。",
      "ウ": "代替性がない複数のブランドの商品のグルーピングは、ブランドスイッチを促進する。",
      "エ": "同系色の商品を集合陳列する目的は、売り込みたい商品を識別しやすくすることである。",
      "オ": "類似した複数の商品をジャンブル陳列すると、商品パッケージが識別しやすくなる。"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "テーマに合う小道具を使うと、利用場面や季節感を買物客に伝えやすくなる。ブランドスイッチは代替可能な商品の間で起こる。互いに代替できない商品のグルーピングではこの目的を果たしにくい。",
    "choiceExplanations": {
      "ア": "フェイスアウト陳列は服を正面に見せ、色、柄、デザインを伝える。関連購買には一緒に使う商品を近接させる陳列を用いる。",
      "イ": "テーマに合う小道具を使うと、利用場面や季節感を買物客に伝えやすくなる。",
      "ウ": "ブランドスイッチは代替可能な商品の間で起こる。互いに代替できない商品のグルーピングではこの目的を果たしにくい。",
      "エ": "同系色の集合は統一感を生む。特定商品を際立たせるには色の対比などで他と区別する。",
      "オ": "ジャンブル陳列は商品を混ぜて積み、量感や割安感を出す。個々のパッケージは整列した陳列の方が判別しやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q29",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 29,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "インストアプロモーション",
    "topicTags": [
      "インストアプロモーション",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "インストアプロモーションに関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ エンドなどで大量陳列をする主な目的は、計画購買を発生させることである。\nｂ 季節の催事や行事にあったプロモーション計画を立てる 52 週マーチャンダイジングの主な目的は、競合店と異なる販促テーマで顧客を獲得することである。\nｃ クロス・マーチャンダイジングの主な目的は、関連購買を促進することである。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：正",
      "エ": "ａ：誤 ｂ：正 ｃ：誤",
      "オ": "ａ：誤 ｂ：誤 ｃ：正"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "エンドの大量陳列は予定外の購買に働きかける。週単位の企画は年間需要への対応が主で、関連商品の併売はクロス・マーチャンダイジングに当たる。",
    "choiceExplanations": {
      "ア": "大量陳列は売場で注目を集め、予定外の購入を促す。関連商品を合わせるｃは正しい。",
      "イ": "ａは計画外の購入を促す効果を見落としている。ｃの関連購買の促進はクロス・マーチャンダイジングの主要な目的である。",
      "ウ": "52週マーチャンダイジングの中心は、季節や年間行事による需要に合わせて週単位で商品・販促を組むことである。競合店との差別化を主目的とするｂは誤りである。",
      "エ": "ｂは競合店と異なる企画に目的を限定しており不適切で、ｃは組み合わせで関連購買を伸ばす活動に沿う。",
      "オ": "エンドの大量陳列は予定外の購買に働きかける。週単位の企画は年間需要への対応が主で、関連商品の併売はクロス・マーチャンダイジングに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q30",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 30,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "景品表示法",
    "topicTags": [
      "景品表示法",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "不当景品類及び不当表示防止法（景品表示法）に関する以下の文章の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。一般懸賞における景品類の最高額は、懸賞に係る取引価額が Ａ 円未満の場合は取引価額の Ｂ 倍とし、取引価額が Ａ 円以上の場合は 10 万円と定められている。また、景品類の総額の上限については、懸賞に係る売上予定総額の ２ ％ と定められている。なお、景品類の価額は、同じものが市販されている場合は、 Ｃ によるとされている。",
    "choices": {
      "ア": "Ａ：5,000\nＢ：20\nＣ：景品類を提供する者がそれを入手した価格",
      "イ": "Ａ：5,000\nＢ：20\nＣ：景品類の提供を受ける者がそれを通常購入するときの価格",
      "ウ": "Ａ：10,000\nＢ：10\nＣ：景品類を提供する者がそれを入手した価格",
      "エ": "Ａ：10,000\nＢ：10\nＣ：景品類の提供を受ける者がそれを通常購入するときの価格"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "一般懸賞の個別上限は取引価額5,000円未満でその20倍、5,000円以上で10万円である。市販品の価額は消費者が通常購入する価格で評価する。",
    "choiceExplanations": {
      "ア": "5,000円と20倍は正しい。市販品の景品価額は提供事業者の仕入額ではなく、受け取る側の通常の購入価格で判断する。",
      "イ": "一般懸賞の個別上限は取引価額5,000円未満でその20倍、5,000円以上で10万円である。市販品の価額は消費者が通常購入する価格で評価する。",
      "ウ": "境界額は10,000円ではなく5,000円である。市販品の算定に提供する側の購入原価は使わない。",
      "エ": "Ｃは正しいが、ＡとＢは5,000円と20倍である。たとえば取引額が4,000円なら個別上限は8万円となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q31",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 31,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "在庫管理",
    "topicTags": [
      "在庫管理",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "小売店舗における在庫管理に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ ある商品の安全在庫を引き上げた場合、その商品の欠品リスクを小さくすることができる。\nｂ 定期発注方式を採用した場合、 １ 回当たりの発注量は発注間隔を短くするほど多くなる。\nｃ 定量発注方式を採用した場合、発注点は有効在庫量と発注量の和として設定された値である。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：正",
      "オ": "ａ：誤 ｂ：正 ｃ：誤"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "安全在庫を増やせば需要変動に対する欠品リスクを下げられる。定期発注の間隔が短ければ通常1回の発注量は減り、定量発注の基準在庫はリードタイム中の需要と安全在庫で決まる。",
    "choiceExplanations": {
      "ア": "発注間隔を短くすると、次に発注するまでに見込む需要量も少なくなる。ｂの発注量の向きは逆である。",
      "イ": "定量発注方式の発注点は、リードタイム中の需要の見込みと安全在庫を基に決める。発注量を足すとするｃは誤りである。",
      "ウ": "安全在庫を増やせば需要変動に対する欠品リスクを下げられる。定期発注の間隔が短ければ通常1回の発注量は減り、定量発注の基準在庫はリードタイム中の需要と安全在庫で決まる。",
      "エ": "ａは安全在庫の役割に合う。定期発注の間隔を短くすれば通常、1回に見込む期間需要は減る。",
      "オ": "安全在庫は需要上振れなどに対応するために持つのでａは正しい。発注頻度を上げると通常、1回の補充量は減る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q32",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 32,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "輸送手段",
    "topicTags": [
      "輸送手段",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "輸送手段の特徴に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "RORO 船に貨物を積み込む際には、クレーンが必要である。",
      "イ": "鉄道輸送は、トラック輸送に比べて、荷主が出発時間を自由に指定することができ、短距離で少量の輸送の場合に輸送量当たりの輸送料金が低い傾向がある。",
      "ウ": "特別積合せ運送は、集貨された貨物を最終目的地まで仕分けず、不定期に実施する貸切運送をいう。",
      "エ": "トラックの時間当たりの実車率を高める方策の １ つは、走行時間のうちの実車時間を長くすることである。",
      "オ": "トラック輸送から鉄道輸送へのモーダルシフトを推進することにより、トラックのみの直行輸送に比べて、荷役作業の負担が減少する。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "時間で測った実車率は走行時間に占める貨物を積んだ走行時間の割合である。空車走行を実車走行に替えれば割合は上がる。",
    "choiceExplanations": {
      "ア": "RORO船は車両や台車などをランプから乗り降りさせる船である。原則としてクレーンで吊り上げる方式ではない。",
      "イ": "鉄道はダイヤと発着拠点の制約を受け、長距離・大量輸送に向く。短距離で出発時刻を調整しやすいのはトラックの特徴である。",
      "ウ": "特別積合せ運送では複数荷主の貨物を集め、仕分けして定期的に幹線輸送する。設問の貸切運送の説明と異なる。",
      "エ": "時間で測った実車率は走行時間に占める貨物を積んだ走行時間の割合である。空車走行を実車走行に替えれば割合は上がる。",
      "オ": "鉄道への切替では端末の集配や発着拠点での積替えが必要になる。直行トラックより荷役工程が増えることがある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q33",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 33,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "ユニットロード",
    "topicTags": [
      "ユニットロード",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "物流におけるユニットロードに関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "一貫パレチゼーションは、最終目的地まで貨物を異なるパレットに積み替えながら物流を行うことである。",
      "イ": "通い容器は、一定の企業または事業所などの間で、 １ 回限りの使用を目的とした輸送用容器のことである。",
      "ウ": "日本産業規格（JIS）のユニットロードシステム通則（JIS Z 0650:2020）で規定されているパレットの平面寸法は、 １ 種類に統一されている。",
      "エ": "パレットプールシステムは、互換性のあるパレットを広範囲の利用者間で共同運用する仕組みである。",
      "オ": "平パレットを使用する場合は、使用しない場合に比べて、積み込みや取り卸しなどの荷役効率が低い。"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "パレットプールは共通仕様のパレットを利用者間で共同運用する。回収や再貸出によって同じパレットを繰り返し使える。",
    "choiceExplanations": {
      "ア": "一貫パレチゼーションは、出荷から荷受けまで同じパレットに載せたまま運ぶ方式である。積替えを減らす効果がある。",
      "イ": "通い容器は回収して繰り返し使う輸送容器である。繰り返し運ぶ企業間や拠点間で使う。",
      "ウ": "規格には互換性を考慮した複数の平面寸法が規定されている。1種類のみという説明は適切でない。",
      "エ": "パレットプールは共通仕様のパレットを利用者間で共同運用する。回収や再貸出によって同じパレットを繰り返し使える。",
      "オ": "パレットは貨物を一つの単位としてフォークリフトなどで扱えるようにする。ばら積みと比べて荷役の効率が上がる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q34",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 34,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "チェーン小売業の物流",
    "topicTags": [
      "チェーン小売業の物流",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "チェーン小売業の物流センターに関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 在庫型物流センターの在庫が預かり在庫である場合、その在庫の所有権は小売業にある。\nｂ 大ロットで入荷した貨物を小ロットに小分けする作業は、在庫型物流センター、通過型物流センターいずれでも行われる。\nｃ 物流センターから店舗へのカテゴリー納品の目的は、店舗での荷受回数を少なくすることである。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：正",
      "ウ": "ａ：正 ｂ：誤 ｃ：誤",
      "エ": "ａ：誤 ｂ：正 ｃ：正",
      "オ": "ａ：誤 ｂ：正 ｃ：誤"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "預かり在庫は通常、納入側が所有する。小分けは両方式にあり、カテゴリー納品は店頭での商品取扱いを効率化する。",
    "choiceExplanations": {
      "ア": "預かり在庫では通常、所有権は預けたメーカーや卸売業者にある。小売側が保管する場所と在庫の所有権は一致しない。",
      "イ": "ａでは預かり在庫の所有者を取り違えている。小分け・仕分け作業は在庫型と通過型の両方で行われる。",
      "ウ": "ａの所有権は預けた側にある。ｂのロットを小分けする作業は通過型でも行う。",
      "エ": "通過型でも店舗別などの小分けを行うのでｂは正しい。カテゴリー納品は店内での仕分けや陳列の効率化を主に狙う。",
      "オ": "預かり在庫は通常、納入側が所有する。小分けは両方式にあり、カテゴリー納品は店頭での商品取扱いを効率化する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q35",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 35,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "ピッキング",
    "topicTags": [
      "ピッキング",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "物流センターの運営に関する記述として、最も適切なものはどれか。",
    "choices": {
      "ア": "3PL 事業は、荷主に対して、保管機能のみを提供する事業をいう。",
      "イ": "小分け商品化包装は流通加工に含まれるが、値札付けは含まれない。",
      "ウ": "摘み取り方式ピッキングは、オーダー別に商品を一品ごとに集品する方法である。",
      "エ": "マテハン機器のうち、ソーターとパレタイザは保管用の機器である。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "ウ",
    "explanation": "摘み取り方式では注文単位で各商品の保管場所を回り、必要量を集める。複数注文分をまとめて取り出して仕分ける種まき方式と区別する。",
    "choiceExplanations": {
      "ア": "3PLは第三者が荷主の物流を包括的に受託する。保管のほか物流計画、輸送、在庫管理などを含み得る。",
      "イ": "値札付けも商品の販売に向けた付加作業であり、流通加工に含まれる。",
      "ウ": "摘み取り方式では注文単位で各商品の保管場所を回り、必要量を集める。複数注文分をまとめて取り出して仕分ける種まき方式と区別する。",
      "エ": "ソーターは貨物を仕分け、パレタイザは貨物をパレットに積み付ける。いずれも保管そのものを行う機器ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q36",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 36,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "インストアコード",
    "topicTags": [
      "インストアコード",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "インストアコードおよびインストアマーキングに関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ インストアコードには、バーコードの中に価格情報が含まれる NonPLU タイプがある。\nｂ インストアコードで、先頭の ２ 桁に “49” を利用することは正しい利用方法である。\nｃ 商品が製造または出荷される段階で、製造業者または発売元が商品包装にJAN コードを JAN シンボルにより表示することを、インストアマーキングという。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：誤",
      "イ": "ａ：正 ｂ：誤 ｃ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：正",
      "エ": "ａ：誤 ｂ：誤 ｃ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：誤"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "NonPLU型には価格情報を含められる。先頭「49」のJANコードをメーカーが表示する行為は、インストアマーキングではなくソースマーキングである。",
    "choiceExplanations": {
      "ア": "日本の「49」はGS1事業者コードに割り当てられる先頭番号の一つである。店舗独自のインストアコード用の番号ではない。",
      "イ": "NonPLU型には価格情報を含められる。先頭「49」のJANコードをメーカーが表示する行為は、インストアマーキングではなくソースマーキングである。",
      "ウ": "ａのNonPLUは価格情報をコードに含める。メーカーが商品包装に表示するのはソースマーキングである。",
      "エ": "ａは正しい。店舗等で独自の商品コードを付すインストアマーキングと、製造段階で付すソースマーキングを区別する。",
      "オ": "ｂとｃは誤りだが、ａは正しい。NonPLU型のインストアコードには価格を入れられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q37",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 37,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "GS1識別コード",
    "topicTags": [
      "GS1識別コード",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "GS1 識別コードは、企業間電子データ交換（EDI）や流通ビジネスメッセージ標準（流通 BMS）などを促進する観点から GS1 が定めている国際標準の識別コードである。その中には、商品やサービスを識別するための JAN コード（GTIN）をはじめ、さまざまな用途に応じて企業や事業所や資産などの識別コードが定められ、利用が促進されている。以下のａ～ｃの識別コードと １ ～ ３ の記述の組み合わせとして、最も適切なものを下記の解答群から選べ。\n［識別コード］\nａ GLN\nｂ GRAI\nｃ SSCC\n［記述］\n１ 物流・出荷などの輸送用梱包単位の識別コードで、欧米を中心に利用が進められ、日本でも、GS1-128 シンボルや EPC タグ（電子タグ）による利用が行われているコードである。\n２ カゴ台車や折り畳みコンテナなどの、企業間で繰り返し利用する資産を管理するための識別コードで、GS1-128 シンボルや EPC タグ（電子タグ）などによる利用が行われているコードである。\n３ 企業・事業所の識別コードで、流通 BMS などの EDI における送受信先の識別コードとしての利用が進んでいるコードである。",
    "choices": {
      "ア": "ａと １ ｂと ２ ｃと ３",
      "イ": "ａと １ ｂと ３ ｃと ２",
      "ウ": "ａと ２ ｂと ３ ｃと １",
      "エ": "ａと ３ ｂと １ ｃと ２",
      "オ": "ａと ３ ｂと ２ ｃと １"
    },
    "answer": "オ",
    "officialAnswerNumber": "オ",
    "explanation": "GLNは企業や拠点、GRAIは通い容器などの再利用資産、SSCCは出荷梱包単位を識別する。したがって順に３・２・１となる。",
    "choiceExplanations": {
      "ア": "GLNは事業所などの識別に使うため３である。物流の梱包単位を示す１はSSCCに対応する。",
      "イ": "GLNは輸送梱包ではなく拠点の識別に使う。繰り返し利用する資産の２はGRAIである。",
      "ウ": "GLNは企業や拠点を示す３で、GRAIが通い容器などの２に対応する。",
      "エ": "GLNと３は対応する。GRAIは再利用資産の２で、輸送中の荷物単位の１はSSCCである。",
      "オ": "GLNは企業や拠点、GRAIは通い容器などの再利用資産、SSCCは出荷梱包単位を識別する。したがって順に３・２・１となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q38",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 38,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "基本統計量",
    "topicTags": [
      "基本統計量",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "ある小売店の ID-POS データから、下表に示すように、全顧客の過去 １ 年間における顧客ごとの購買金額を計算した。これより顧客全体の購買状況を評価するため、全体の基本統計量として、平均値、中央値、最頻値、分散、標準偏差、最小値、そして最大値を計算した。これらの統計量の性質から常に成り立つ関係として、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "（最大値－最小値）/2＝平均値",
      "イ": "（最大値－中央値）＝（中央値－最小値）²",
      "ウ": "（最頻値－最小値）＝中央値",
      "エ": "（標準偏差）²＝分散",
      "オ": "（平均値＋標準偏差）²＝最大値"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "標準偏差は分散の非負の平方根として定義する。そのため標準偏差の2乗は常に分散となる。平均値や標準偏差からこの式で最大値を得ることはできない。例えば全員の購買額が10なら左辺は100、右辺は10になる。",
    "choiceExplanations": {
      "ア": "最大値と最小値の差の半分は範囲の半分である。平均値は全顧客の値を合計して件数で割るので、通常これとは異なる。",
      "イ": "例えば1、2、10では、最大値から中央値を引くと8、中央値から最小値を引いた値の2乗は1になる。",
      "ウ": "最頻値は頻度が最大の値、中央値は順番の中央の値である。最頻値から最小値を引いても中央値にはならない。",
      "エ": "標準偏差は分散の非負の平方根として定義する。そのため標準偏差の2乗は常に分散となる。",
      "オ": "平均値や標準偏差からこの式で最大値を得ることはできない。例えば全員の購買額が10なら左辺は100、右辺は10になる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q38.png"
    ],
    "imageAltTexts": [
      "顧客IDごとの1年間の購買金額の一覧から、平均値、中央値、最頻値、分散、標準偏差、最小値、最大値を算出する。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q39",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 39,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "EDI",
    "topicTags": [
      "EDI",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "「中小企業共通 EDI 標準」は、中小企業の生産性をより一層向上させることを目的として、特定非営利活動法人 IT コーディネータ協会から公開され、バージョンアップが継続されている。その中でも使われている EDI のフレームワークに関する以下の図の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。",
    "choices": {
      "ア": "Ａ：情報表現 Ｂ：運用手順 Ｃ：電文搬送",
      "イ": "Ａ：情報表現 Ｂ：登録手順 Ｃ：製品搬送",
      "ウ": "Ａ：情報表現 Ｂ：登録手順 Ｃ：電文搬送",
      "エ": "Ａ：正規表現 Ｂ：運用手順 Ｃ：電文搬送",
      "オ": "Ａ：正規表現 Ｂ：登録手順 Ｃ：製品搬送"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "ＥＤＩでは業務情報を情報表現で文法化し、取引を行う運用手順を定め、電文搬送で情報をやり取りする。図のＡ、Ｂ、Ｃが順に対応する。",
    "choiceExplanations": {
      "ア": "ＥＤＩでは業務情報を情報表現で文法化し、取引を行う運用手順を定め、電文搬送で情報をやり取りする。図のＡ、Ｂ、Ｃが順に対応する。",
      "イ": "図のＢは業務連携の手順であり、登録に限定されない。Ｃは製品ではなくデータとしての電文を運ぶ。",
      "ウ": "伝達には電文搬送を使うが、図のＢは手続きを全体として扱う運用手順である。登録だけを指す語ではない。",
      "エ": "Ａは業務情報を文法化する情報表現である。正規表現は文字列パターンの記法に限られており該当しない。",
      "オ": "Ａは情報表現、Ｂは運用手順である。Ｃで搬送するのは商品の現物ではなく取引メッセージである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19",
    "imageUrls": [
      "/images/chusho-kigyo-shindanshi/2023-late-unei-q39.png"
    ],
    "imageAltTexts": [
      "業務連携を業務情報とＢが実現する。業務情報を文法化したものがＡで、Ｂは業務情報およびＡと関連する。Ａを搬送するＣはＢを実現する。"
    ]
  },
  {
    "id": "chusho-kigyo-shindanshi-2023-late-unei-q40",
    "exam": "chusho-kigyo-shindanshi",
    "session": "unei",
    "season": "late",
    "year": 2023,
    "fiscalYear": 2023,
    "examDate": "2023-12-23",
    "qNumber": 40,
    "subject": "運営管理（那覇地区再試験）",
    "type": "multiple-choice",
    "category": "HACCP",
    "topicTags": [
      "HACCP",
      "那覇地区再試験"
    ],
    "difficulty": 3,
    "question": "令和 ３ 年 ６ 月 １ 日から、原則として企業規模に関係なく、すべての食品等事業者は HACCP に沿った衛生管理に取り組むこととなっている。そこで小規模営業者等は、業界団体が作成し、厚生労働省が内容を確認した手引書を参考にして、厚生労働省のサイトに記載された ６ つの内容を実施していれば、該当する食品衛生法の規定に基づき、「営業者は厚生労働省令に定められた基準（一般衛生管理の基準とHACCP に沿った衛生管理の基準）に従い、公衆衛生上必要な措置を定め、これを遵守している」と見なされる。上記の下線部で示した ６ つの内容に関する記述の正誤の組み合わせとして、最も適切なものを下記の解答群から選べ。\nａ 手引書の解説を読み、自分の業種・業態では、何が危害要因となるかを理解すること。\nｂ 手引書のひな形を利用して、衛生管理計画と（必要に応じて）手順書を準備すること。\nｃ 衛生管理計画と手順書の内容を取引関係者に周知すること。",
    "choices": {
      "ア": "ａ：正 ｂ：正 ｃ：正",
      "イ": "ａ：正 ｂ：正 ｃ：誤",
      "ウ": "ａ：誤 ｂ：正 ｃ：正",
      "エ": "ａ：誤 ｂ：誤 ｃ：正",
      "オ": "ａ：誤 ｂ：誤 ｃ：誤"
    },
    "answer": "イ",
    "officialAnswerNumber": "イ",
    "explanation": "小規模事業者は手引書で業態の危害要因を理解し、衛生管理計画と必要な手順書を作る。実施内容は従業員に周知するため、ｃは誤りである。",
    "choiceExplanations": {
      "ア": "ｃの周知先は現場で衛生管理を行う従業員であり、取引関係者ではない。ａとｂは正しい。",
      "イ": "小規模事業者は手引書で業態の危害要因を理解し、衛生管理計画と必要な手順書を作る。実施内容は従業員に周知するため、ｃは誤りである。",
      "ウ": "危害要因の理解は食品衛生管理を始めるための手順である。周知先についてのｃも誤っている。",
      "エ": "手引書を使った危害要因の理解と計画作成はともに実施事項である。手順の共有は従業員に対して行う。",
      "オ": "ｃは誤りだが、手引書で危害要因を確認するａと計画等を準備するｂは必要な取り組みである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jf-cmca.jp/attach/test/shikenmondai/1ji(sai)2023/D1JI2023-2.pdf",
    "sourceAnswerUrl": "https://www.jf-cmca.jp/attach/test/r05/1ji(sai)_seikai/D.pdf",
    "sourceAttribution": "出典：一般社団法人中小企業診断協会 令和5年度第1次試験（那覇地区再試験） D 運営管理",
    "license": "JF-CMCA-attributed",
    "lastUpdated": "2026-11-19"
  }
];
