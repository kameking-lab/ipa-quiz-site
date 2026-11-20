import type { Question } from "@/lib/questions/types";

export const KOKKA_SOGO_DAI_2025_SENMON_SURI_BUTSURI_CHIKYU: Question[] = [
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q002",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "基礎数学・情報数学",
    "topicTags": [
      "内分点",
      "Ⅰ部・必須問題"
    ],
    "difficulty": 3,
    "question": "正四面体 OABC において、辺 OA の中点を M、辺 BC の中点を N、さらに正三角形 ABC の重心を G とする。直線 MN と直線 OG の交点を P とするとき、比 MP：PN はいくらか。",
    "choices": {
      "ア": "1：2",
      "イ": "1：1",
      "ウ": "3：√2",
      "エ": "4：3",
      "オ": "2：1"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "O を原点とすると M＝A/2、N＝(B＋C)/2 であり、MN の中点は (A＋B＋C)/4＝3G/4 なので OG 上にある。",
    "choiceExplanations": {
      "ア": "1：2 に内分する点を原点 O から表すと A の係数が 1/3、B と C は各 1/6 となり、OG 上にない。",
      "イ": "O を原点とすると M＝A/2、N＝(B＋C)/2 であり、MN の中点は (A＋B＋C)/4＝3G/4 なので OG 上にある。",
      "ウ": "OG 上の点では O を原点としたとき A、B、C の係数が全て等しくなるため、MP と PN は等しい。",
      "エ": "4：3 に内分すると A の係数は 3/14、B と C は各 2/7 となり、OG 上にない。",
      "オ": "2：1 に内分する点では A の係数 1/6 と、B と C の係数 1/3 が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 2。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q006",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "基礎数学・情報数学",
    "topicTags": [
      "行列の累乗",
      "Ⅱ部・選択問題",
      "選択A（数理科学系）"
    ],
    "difficulty": 3,
    "question": "次の行列 A に対し、A^2025 として正しいのはどれか。\nA＝(1/2)［(1, 0, √3), (0, 2, 0), (−√3, 0, 1)］\n行列は各行を括弧で囲んで表す。",
    "choices": {
      "ア": "［(−1, 0, 0), (0, 1, 0), (0, 0, −1)］",
      "イ": "(1/2)［(1, 0, √3), (0, 2, 0), (−√3, 0, 1)］",
      "ウ": "(1/2)［(−1, 0, √3), (0, 2, 0), (−√3, 0, 1)］",
      "エ": "(1/2^2024)［(−1, 0, 0), (0, 1, 0), (0, 0, −1)］",
      "オ": "(1/2^2025)［(−1, 0, √3), (0, 2, 0), (−√3, 0, −1)］"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "第2座標は固定され、第1・第3座標上の回転角は −60° である。2025＝6×337＋3 より、この平面上では180°回転となる。",
    "choiceExplanations": {
      "ア": "第2座標は固定され、第1・第3座標上の回転角は −60° である。2025＝6×337＋3 より、この平面上では180°回転となる。",
      "イ": "この行列は A 自身であり、累乗後は非対角成分が消える。",
      "ウ": "累乗後の第1・第3座標上の行列は −I なので、右上や左下の成分は 0 になる。",
      "エ": "第2座標の固有値は 1 のままであり、1/2^2024 に縮まない。",
      "オ": "A は直交行列なので、累乗しても各列の長さは 1 に保たれる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 6。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q020",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "銀河の赤方偏移",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "遠方の銀河のスペクトルを観察すると、原子の種類によって決まるはずの吸収線の位置が波長の長い方にずれている。これは、銀河が観測点からその銀河までの距離 r に比例する速さ v で後退しているためであり、v と r の間には、宇宙の膨張率を表すハッブル定数を H とし、以下の関係が知られている。\nv＝Hr\nある銀河のスペクトルを観測したところ、波長 0.393 μm に相当する吸収線の波長が 0.412 μm と観測された。観測点からこの銀河までの距離として最も妥当なのはどれか。\nただし、ハッブル定数 H を 21 km/s/100万光年、光の速度を 3.0×10^5 km/s とする。",
    "choices": {
      "ア": "3.4億光年",
      "イ": "5.0億光年",
      "ウ": "6.9億光年",
      "エ": "10億光年",
      "オ": "15億光年"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "波長の相対変化 (0.412−0.393)/0.393 を光速に掛けると v は約 1.45×10^4 km/s となる。これを H で割ると約 690×100万光年である。",
    "choiceExplanations": {
      "ア": "3.4億光年から求まる後退速度は約 7.1×10^3 km/s で、観測波長のずれからの推定値より小さい。",
      "イ": "5.0億光年なら後退速度は 1.05×10^4 km/s であり、赤方偏移から得られる約 1.45×10^4 km/s に届かない。",
      "ウ": "波長の相対変化 (0.412−0.393)/0.393 を光速に掛けると v は約 1.45×10^4 km/s となる。これを H で割ると約 690×100万光年である。",
      "エ": "10億光年なら 2.1×10^4 km/s の後退速度に相当し、波長のずれに対して大きすぎる。",
      "オ": "15億光年では後退速度が 3.15×10^4 km/s となり、測定された赤方偏移からの推定値を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 20。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q021",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "海洋循環",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "海洋に関する次の記述のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 海面付近の表層混合層では水温が深さによらず、ほぼ一様となっている。中緯度では、表層混合層の厚さは、夏季には海面が日射によって温められて対流が起こったり、風によってかき混ぜられたりするために厚く、冬季には海面が冷却されて安定になるため薄くなる。\n㋑ 海洋の表層を流れる主な海流は、海上風によって引き起こされる風成循環である。原動力となっている主な風系は、亜熱帯高気圧の周りを吹く貿易風と偏西風である。これにより、世界の各大洋には巨大な水平循環が形成されている。\n㋒ 日本の太平洋側には、北上する黒潮と南下する親潮がある。黒潮は、亜熱帯循環系で西岸強化により流れが強い。速いところでは2 m/sを超え、北大西洋のメキシコ湾流と共に世界の二大海流と言われる。\n㋓ 高緯度の海水は低温であり、また、海水が凍ると、取り残された塩類によって海水の塩分が増加するため、密度が大きくなる。密度が大きくなった海水は、海流に沿って、中緯度に移動する。この水平循環を熱塩循環という。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑の風応力は大洋の表層循環を駆動する。㋒の黒潮は西岸強化が生じる北太平洋の亜熱帯循環の西岸境界流である。",
    "choiceExplanations": {
      "ア": "㋐は季節の傾向を逆にしている。中緯度では冬の表面冷却が対流を促し、混合層が深くなる。",
      "イ": "㋒は妥当だが、㋐は冬季の冷却で表層が安定するとしている点が誤りである。",
      "ウ": "㋑の風応力は大洋の表層循環を駆動する。㋒の黒潮は西岸強化が生じる北太平洋の亜熱帯循環の西岸境界流である。",
      "エ": "㋓の高密度水は沈み込み、熱塩循環は深層流と鉛直運動を含む。",
      "オ": "㋓で述べる降温や海氷形成は沈み込みの要因だが、熱塩循環を水平循環とする部分が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 21。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q022",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "地震波からみる地球内部",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "地震波の観測から分かる地球内部の構造に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「震央距離が1000 kmを超えるような遠地地震では、震央と観測点をそれぞれ地球の中心と直線で結び、この2直線のなす角度を震央距離として用いる。図Ⅰで示すように、これを角距離といい、ここでは Δ と表現する。\n図Ⅱは、P波の伝わり方を示している。P波は、Δ＝103°〜143°の辺りでは観測されず、その地域をシャドー・ゾーンという。これは、ある深さに外側から内側に向かってP波の速度が急激に［㋐］なる不連続面があり、そこでP波が下向きに曲げられることによる。この不連続面の深さは約2900 kmで、この面を境に、外側の［㋑］と内側の核に分けられる。\nS波は Δ＝103°以遠で観測されないので、核は［㋒］であると考えられたが、技術の進歩により、シャドー・ゾーンでも、図Ⅱの点線で示されるように、弱いP波が観測されるようになった。これは、核の内部に速度が急に速くなる不連続面があり、今度はそこでP波が上向きに曲げられることによる。この不連続面の深さは約5100 kmで、核はこの面を境に、外側の外核と内側の内核に分けられる。内核で速度が急増するのは、内核が［㋓］となっているためである。」",
    "choices": {
      "ア": "遅く／マントル／液体／固体",
      "イ": "遅く／地殻／液体／固体",
      "ウ": "速く／マントル／液体／固体",
      "エ": "速く／マントル／固体／液体",
      "オ": "速く／地殻／固体／液体"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "マントルから液体外核に入るとP波は減速し、S波は液体を伝わらない。中心側の内核は固体なので、液体外核から内核へ入るP波は再び速くなる。",
    "choiceExplanations": {
      "ア": "マントルから液体外核に入るとP波は減速し、S波は液体を伝わらない。中心側の内核は固体なので、液体外核から内核へ入るP波は再び速くなる。",
      "イ": "約2900 kmの境界の外側を占めるのはマントルであり、地殻ははるかに浅い。",
      "ウ": "㋐の速度変化が逆であり、P波はマントルから外核に入ると遅くなる。",
      "エ": "核の状態が逆で、外核は液体、内核は固体である。",
      "オ": "地殻は深さ約2900 kmまで達せず、その深さの境界で外核へ入るP波は減速する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 22。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q022.webp"
    ],
    "imageAltTexts": [
      "角距離の定義と地球内部を通るP波の経路・シャドーゾーン"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q023",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "日本の地層と資源",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "日本の代表的な資源に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ ペルム紀の付加体の地層中にはサンゴ礁が含まれることがあり、これらが天然ガスの根源岩となっている。\n㋑ 古第三紀の日本の内陸部の一部には森林が発達し、その堆積物が福岡県の筑豊炭田、福島県の常磐炭田、北海道の石狩炭田などの根源岩となっている。\n㋒ 新第三紀になると日本海が拡大し、厚い地層が堆積した。新潟県や秋田県などに分布するこの時代の地層からは石油が産出する。\n㋓ 第四紀は、周期的な気候変動に特徴付けられる。この中の温暖期の地層中に蒸発岩である岩塩鉱床が含まれることがある。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑の炭田は陸上植物由来の堆積物に関係する。㋒の新潟・秋田では、日本海が広がった新第三紀に形成された堆積盆の地層から石油が産出する。",
    "choiceExplanations": {
      "ア": "㋒は妥当だが、サンゴ礁由来の石灰岩を日本の天然ガスの根源岩とする㋐は妥当でない。",
      "イ": "㋐はサンゴ礁を根源岩としており、㋓は第四紀温暖期の日本に岩塩鉱床を想定している点が誤りである。",
      "ウ": "㋑の炭田は陸上植物由来の堆積物に関係する。㋒の新潟・秋田では、日本海が広がった新第三紀に形成された堆積盆の地層から石油が産出する。",
      "エ": "㋑は妥当だが、㋓の岩塩鉱床形成には強い蒸発と塩分濃縮が必要である。",
      "オ": "㋒は妥当だが、㋓の岩塩鉱床が日本の第四紀温暖期の地層に伴うという説明は妥当でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 23。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q024",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "放射年代測定",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "放射性同位体年代に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「自然界には様々な放射性同位体が存在し、絶えず一定の速さで崩壊し、安定な同位体へと変化する。放射性同位体の数が元の半分になるのに要する時間を半減期という。質量数14の炭素は放射性同位体であり、［㋐］と宇宙線との衝突により絶えず生成され、その半減期は約［㋑］年である。［㋒］、⁸⁷Rb、²³⁸Uなどの半減期の長い放射性同位体は古い地質時代の年代測定に利用される。岩石はこれらの元素をわずかに含むため、自然放射線が出ているが、特に［㋓］は高い放射線量を示す。」",
    "choices": {
      "ア": "海／57万／³H／花こう岩",
      "イ": "海／57万／⁴⁰K／かんらん岩",
      "ウ": "大気／57万／⁴⁰K／花こう岩",
      "エ": "大気／5700／³H／かんらん岩",
      "オ": "大気／5700／⁴⁰K／花こう岩"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "¹⁴C は宇宙線由来の中性子と大気中の窒素との反応により生じ、半減期は約5700年である。⁴⁰K は古い岩石の測定に利用され、花こう岩には K、U、Th が比較的濃集する。",
    "choiceExplanations": {
      "ア": "¹⁴C は主に大気中の窒素から生じる。³H は半減期が約12年と短く、古い地質時代の測定には向かない。",
      "イ": "⁴⁰K は長寿命だが、¹⁴C の生成は主として大気中で半減期は約5700年である。",
      "ウ": "¹⁴C の半減期を約57万年とする点が誤りである。",
      "エ": "³H は半減期が短く、かんらん岩は一般に花こう岩に比べて K、U、Th が少ない。",
      "オ": "¹⁴C は宇宙線由来の中性子と大気中の窒素との反応により生じ、半減期は約5700年である。⁴⁰K は古い岩石の測定に利用され、花こう岩には K、U、Th が比較的濃集する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 24。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q025",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "地球科学",
    "topicTags": [
      "太陽系の惑星",
      "Ⅱ部・選択問題",
      "選択B（物理・地球科学系）"
    ],
    "difficulty": 3,
    "question": "太陽系の惑星の質量と密度の分布を示した図に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのは次のうちどれか。\n「木星は［㋐］と［㋑］を主な組成とし、図の［㋒］である。」",
    "choices": {
      "ア": "ケイ素／ヘリウム／A",
      "イ": "ケイ素／酸素／B",
      "ウ": "水素／ヘリウム／C",
      "エ": "水素／鉄／C",
      "オ": "鉄／酸素／B"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "木星は主に水素とヘリウムからなり、地球の約318倍の質量と約1.3 g/cm³の密度をもつので C に当たる。",
    "choiceExplanations": {
      "ア": "木星は図の A よりはるかに重く、ケイ素は木星の主成分ではない。",
      "イ": "B は地球より質量が小さい点であり、ケイ素や酸素は木星の主要な組成に当たらない。",
      "ウ": "木星は主に水素とヘリウムからなり、地球の約318倍の質量と約1.3 g/cm³の密度をもつので C に当たる。",
      "エ": "C は正しいが、木星の主要成分として水素に次ぐのはヘリウムである。",
      "オ": "鉄と酸素を主な組成とする点も、地球より軽い B を木星とする点も誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 25。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q025.webp"
    ],
    "imageAltTexts": [
      "太陽系惑星の質量と密度の分布図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q026",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 26,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "部分集合の和",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "整数の有限集合 A に対して、A に属する全ての元の和を S(A) とおく。例えば、S({2, 4, 5})＝2＋4＋5＝11 となる。ただし、空集合 ∅ については、S(∅)＝0 と定めておく。このとき、次の式の値はいくらか。\nΣ[A⊆{1, 2, 3, 4, 5, 6}] S(A)",
    "choices": {
      "ア": "64",
      "イ": "672",
      "ウ": "720",
      "エ": "1008",
      "オ": "1344"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "1〜6の各数を含む部分集合は残る5要素の選び方 2⁵＝32 通りずつある。したがって総和は 32(1＋2＋3＋4＋5＋6)＝672 となる。",
    "choiceExplanations": {
      "ア": "64 は部分集合の個数 2⁶ であり、各部分集合について元の値を加えた総和とは異なる。",
      "イ": "1〜6の各数を含む部分集合は残る5要素の選び方 2⁵＝32 通りずつある。したがって総和は 32(1＋2＋3＋4＋5＋6)＝672 となる。",
      "ウ": "元には順序がなく、6! の並べ方を数える問題ではない。",
      "エ": "1〜6のどの元も32回ずつ現れるので、21×48＝1008 にはならない。",
      "オ": "全64部分集合に各数が現れるわけではなく、各数が現れるのはその半分の32個である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 26。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q027",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 27,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "合成写像の単射と全射",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "集合 X と集合 Y の間の写像 f：X→Y、g：Y→X に関する次の記述㋐、㋑、㋒のうち、常に正しいもののみを全て挙げているのはどれか。\n㋐ g∘f が全単射であり、かつ、g が単射であるなら、f は全単射である。\n㋑ f が単射であり、かつ、g が全射であるなら、g∘f は全単射である。\n㋒ g∘f が単射であり、かつ、f が全射であるなら、g は単射である。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋒",
      "エ": "㋑",
      "オ": "㋑、㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋐では合成の単射性から f は単射で、任意の y について g(f(x))＝g(y) となる x と g の単射性から f は全射となる。㋒では同じ g の値をもつ二点を f で逆にたどると、合成の単射性により二点は一致する。",
    "choiceExplanations": {
      "ア": "㋐は正しいが、f の全射性で Y の任意の二点の原像が取れるため㋒も正しい。",
      "イ": "㋑には X＝{0,1}、Y＝{0,1,2}、f(0)＝0、f(1)＝1、g(0)＝g(1)＝0、g(2)＝1 という反例がある。",
      "ウ": "㋐では合成の単射性から f は単射で、任意の y について g(f(x))＝g(y) となる x と g の単射性から f は全射となる。㋒では同じ g の値をもつ二点を f で逆にたどると、合成の単射性により二点は一致する。",
      "エ": "㋑の条件では g が f の像上で異なる二点を同じ点へ送ることがあり、合成の単射性は保証されない。",
      "オ": "㋒は正しいが、㋑では g が全射でも f の像に制限したときの全射性が保証されない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 27。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q028",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 28,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "整除順序",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "2⁴・3⁵・5⁶ の正の約数全体の集合 M に対し順序 ≦d を次で定義する。\nm ≦d n ⇔ n は m で割り切れる\nこのとき集合 {(x, y) ｜ x, y∈M, x ≦d y} の元の個数はいくらか。",
    "choices": {
      "ア": "3150",
      "イ": "7140",
      "ウ": "8820",
      "エ": "16384",
      "オ": "21945"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "指数の上限を k とすると順序条件を満たす対は (k＋1)(k＋2)/2 通りである。各素数の指数を独立に選べるので 15×21×28＝8820 となる。",
    "choiceExplanations": {
      "ア": "指数 0〜4 の対 (a,b) には a≦b を満たす15通りがあり、3150 ではこの因子を正しく反映できない。",
      "イ": "3 と 5 の指数対にはそれぞれ21通りと28通りあり、2 の指数対の15通りも掛ける必要がある。",
      "ウ": "指数の上限を k とすると順序条件を満たす対は (k＋1)(k＋2)/2 通りである。各素数の指数を独立に選べるので 15×21×28＝8820 となる。",
      "エ": "指数の組は整除条件付きで数えるため、任意の指数を順序と無関係に選ぶことはできない。",
      "オ": "3種類の指数対が独立なので答えは15、21、28の積であり、21945 は28で割り切れない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 28。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q029",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 29,
    "type": "multiple-choice",
    "category": "集合・位相",
    "topicTags": [
      "距離空間の完備性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "正の整数全体の集合 N 上に次の距離関数 dᵢ（i＝1, 2, 3）を定めて距離空間 Xᵢ＝(N, dᵢ) とするとき、完備なもののみを全て挙げているのはどれか。ただし、距離空間が完備であるとは、その任意のコーシー列が収束することである。\nd₁(x,y)＝|1/x−1/y|\nd₂(x,y)＝0（x＝y）、1（x≠y）\nd₃(x,y)＝0（x＝y＝1）、1/(y−1)（x＝1, y＞1）、1/(x−1)（x＞1, y＝1）、|1/(x−1)−1/(y−1)|（x,y＞1）",
    "choices": {
      "ア": "X₁、X₂",
      "イ": "X₁、X₃",
      "ウ": "X₂",
      "エ": "X₂、X₃",
      "オ": "X₃"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "X₂ ではコーシー列が最終的に一定になる。X₃ は 1 を 0 に、n＞1 を 1/(n−1) に写すと実数の閉部分集合に等長なので完備である。",
    "choiceExplanations": {
      "ア": "X₁ は実数上の {1, 1/2, …} と等長であり、列 1/n の極限 0 が集合にない。",
      "イ": "X₃ は完備だが、X₁ では整数の列 (n) がコーシー列であるにもかかわらず収束しない。",
      "ウ": "X₂ は完備であり、0 に当たる点を含む X₃ も完備である。",
      "エ": "X₂ ではコーシー列が最終的に一定になる。X₃ は 1 を 0 に、n＞1 を 1/(n−1) に写すと実数の閉部分集合に等長なので完備である。",
      "オ": "X₃ だけでなく、異なる点の距離が常に1である X₂ でも全てのコーシー列が収束する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 29。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q030",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 30,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "巡回群の元の位数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "加法群 ℤ/2025ℤ の位数27の元の個数はいくらか。",
    "choices": {
      "ア": "18",
      "イ": "25",
      "ウ": "27",
      "エ": "81",
      "オ": "90"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "27 は 2025 の約数なので位数27の部分群があり、求める元はその生成元である。27を法とした剰余のうち27と互いに素なものは 27−9＝18 個ある。",
    "choiceExplanations": {
      "ア": "27 は 2025 の約数なので位数27の部分群があり、求める元はその生成元である。27を法とした剰余のうち27と互いに素なものは 27−9＝18 個ある。",
      "イ": "生成元に対応する剰余から3の倍数9個を除く必要がある。",
      "ウ": "27個は 27x＝0 を満たす全ての元の数で、その中には位数1、3、9の元も含まれる。",
      "エ": "81 は 2025 の3冪部分の位数だが、そこで位数27となる元は一部だけである。",
      "オ": "位数が27を割る元でも27個に限られるため、位数がちょうど27の元が90個になることはない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 30。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q031",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 31,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "極大イデアル",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "2変数多項式環 ℂ[x,y] のイデアルで、x³−2y² を元にもち、かつ、極大イデアルであるのは次のうちではどれか。",
    "choices": {
      "ア": "(x³−4, y²−2)",
      "イ": "(x＋1, y−3)",
      "ウ": "(x−y²＋1, y−2)",
      "エ": "(x−1, x²−√2 y)",
      "オ": "(x−1, x−2y²)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "商環では x＝1、y＝1/√2 とできるので商環は体 ℂ である。この点で x³−2y²＝0 となるため、多項式は評価準同型の核に属する。",
    "choiceExplanations": {
      "ア": "x³−2y² は二つの生成元の線形結合だが、共通零点が6個あるため極大ではない。",
      "イ": "このイデアルの零点 (−1,3) における x³−2y² の値は −19 なので、対象の多項式を含まない。",
      "ウ": "生成元が消える点は (3,2) であり、そこで x³−2y² は 19 となる。",
      "エ": "商環では x＝1、y＝1/√2 とできるので商環は体 ℂ である。この点で x³−2y²＝0 となるため、多項式は評価準同型の核に属する。",
      "オ": "x＝1 のとき y＝±1/√2 の両方が共通零点であり、二つの異なる評価イデアルに含まれるので極大でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 31。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q032",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 32,
    "type": "multiple-choice",
    "category": "代数",
    "topicTags": [
      "分解体の拡大次数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "x⁶−7x³＋10 の ℚ 上の最小分解体を K とするとき、体 K の ℚ 上の拡大次数はいくらか。",
    "choices": {
      "ア": "6",
      "イ": "9",
      "ウ": "12",
      "エ": "18",
      "オ": "36"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ℚ(ζ₃) 上で 2 と 5 の類は立方剰余群で独立である。実際、2 と 5 の上の素イデアルの付値を取ると 2ᵃ5ᵇ が立方になるには a,b がともに3の倍数であり、Kummer 理論より全体は次数 2×3²＝18 となる。",
    "choiceExplanations": {
      "ア": "次数6は x³−2 単独の分解体の次数であり、5の立方根を加えると拡大する。",
      "イ": "K には原始3乗根が入るため、拡大次数は偶数となる。",
      "ウ": "因子は x³−2 と x³−5 で、どちらの立方根を添える段階も、下の体に根がなければ次数3となる。",
      "エ": "ℚ(ζ₃) 上で 2 と 5 の類は立方剰余群で独立である。実際、2 と 5 の上の素イデアルの付値を取ると 2ᵃ5ᵇ が立方になるには a,b がともに3の倍数であり、Kummer 理論より全体は次数 2×3²＝18 となる。",
      "オ": "二つの三次式の分解体が同じ原始3乗根を含むので、個別の分解体の次数を掛けた 6×6 のままにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 32。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q033",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 33,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "計量に関する勾配",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xy 平面上のリーマン計量を g＝dx²＋2√2 dxdy＋4dy² で与える。関数 f(x,y)＝x²−√2 y² の g に関する勾配ベクトル場 grad f に対して、その点 (1,−1) における値 grad f(1,−1) として正しいのはどれか。",
    "choices": {
      "ア": "2 ∂/∂x",
      "イ": "2 ∂/∂x＋2√2 ∂/∂y",
      "ウ": "4 ∂/∂x",
      "エ": "6 ∂/∂x＋2√2 ∂/∂y",
      "オ": "(√2/2) ∂/∂y"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "勾配の成分 (a,b) は a＋√2 b＝2、√2 a＋4b＝2√2 を満たす。解は (2,0) である。",
    "choiceExplanations": {
      "ア": "勾配の成分 (a,b) は a＋√2 b＝2、√2 a＋4b＝2√2 を満たす。解は (2,0) である。",
      "イ": "これは通常のユークリッド計量での勾配であり、与えられた計量行列を掛けると df の成分と一致しない。",
      "ウ": "第1成分だけを4にすると、∂/∂x との内積が df(∂/∂x)＝2 にならない。",
      "エ": "(a,b)＝(6,2√2) なら計量で下げた第1成分は10となり、必要な2と異なる。",
      "オ": "第1成分が 0、第2成分が √2/2 なら計量で下げた第1成分は1となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 33。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q034",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 34,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "曲面の連結和",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の図は四つの閉曲面 K、P、S、T の展開図である。連結和 P # P に関する記述として正しいのはどれか。ただし、二つの曲面 M、N の連結和 M # N とは、M と N から開円板を一つずつ取り去り、取り去ったときに生じる円周に沿ってこれらを貼り合わせてできる曲面のことである。",
    "choices": {
      "ア": "K と同相である。",
      "イ": "P と同相である。",
      "ウ": "S と同相である。",
      "エ": "T と同相である。",
      "オ": "K、P、S、T のいずれとも同相ではない。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "P は射影平面であり、その二つの連結和はクラインの壺になる。K の展開図は片方の対で辺の向きを反転する貼り合わせによりクラインの壺を表す。",
    "choiceExplanations": {
      "ア": "P は射影平面であり、その二つの連結和はクラインの壺になる。K の展開図は片方の対で辺の向きを反転する貼り合わせによりクラインの壺を表す。",
      "イ": "P はオイラー標数が1だが、P # P のオイラー標数は 1＋1−2＝0 である。",
      "ウ": "S では頂点が三つの同値類になり、オイラー標数は 3−2＋1＝2 だから P # P と同相ではない。",
      "エ": "T はトーラスで向き付け可能だが、P # P にはメビウス帯が残るので向き付けられない。",
      "オ": "P # P は向き付け不可能な閉曲面でオイラー標数が0であり、K と同じクラインの壺である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 34。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q034.webp"
    ],
    "imageAltTexts": [
      "四つの閉曲面 K、P、S、T の辺の同一視を示す展開図"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q035",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 35,
    "type": "multiple-choice",
    "category": "幾何",
    "topicTags": [
      "はめ込みと埋め込み",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "M、N を可微分多様体とし、f：M→N を可微分写像とする。全ての点 p∈M において f の微分写像 dfₚ：TₚM→T_{f(p)}N が単射であるとき、f を「はめ込み」という。また、はめ込みであり、かつ、f：M→f(M) が同相写像となる（ただし、f(M) の位相は、N からの相対位相で定める。）とき、f を「埋め込み」という。\n次の㋐、㋑、㋒に掲げる三つの写像のうち、はめ込みであって埋め込みではないもののみを全て挙げているのはどれか。\n㋐ f：ℝ→ℝ²、f(t)＝(t²,t³)\n㋑ f：ℝ→ℝ²、f(t)＝(sin 2t,sin 3t)\n㋒ f：ℝ→ℝ²、f(t)＝(sinh 2t,sinh 3t)",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋒",
      "ウ": "㋑",
      "エ": "㋑、㋒",
      "オ": "㋒"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑では cos 2t と cos 3t が同時に零となる実数 t がないので微分は単射である。周期 2π をもつため f 自身は単射でなく、埋め込みではない。",
    "choiceExplanations": {
      "ア": "㋐は t＝0 で速度ベクトルが零となり、微分が単射でない。",
      "イ": "㋐は原点ではめ込みにならず、㋒は第1座標から連続に t を復元できる埋め込みである。",
      "ウ": "㋑では cos 2t と cos 3t が同時に零となる実数 t がないので微分は単射である。周期 2π をもつため f 自身は単射でなく、埋め込みではない。",
      "エ": "㋑は条件を満たすが、㋒は第1座標 x に逆双曲線正弦を適用して t＝arsinh(x)/2 を連続に復元できる。",
      "オ": "㋒の第1成分は微分が常に正で逆写像も連続なので、はめ込みと埋め込みの両方である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 35。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q036",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 36,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "一様連続性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "以下の関数 fᵢ（i＝1, 2, 3）のうち、その定義域 Iᵢ⊆ℝ 上で一様連続なもののみを全て挙げているのはどれか。\nf₁(x)＝1/x、I₁＝(0,1)\nf₂(x)＝(eˣ−1)/x、I₂＝(0,∞)\nf₃(x)＝0（x＝0）、x sin(1/x)（x≠0）、I₃＝[−1,1]",
    "choices": {
      "ア": "f₁、f₂",
      "イ": "f₁、f₂、f₃",
      "ウ": "f₂",
      "エ": "f₃",
      "オ": "該当なし"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "f₃ は |x sin(1/x)|≦|x| から 0 でも連続であり、コンパクトな区間上で連続なので一様連続である。",
    "choiceExplanations": {
      "ア": "f₁ では x＝1/n と y＝1/(n＋1) が互いに近づいても関数値は1だけ離れる。",
      "イ": "f₃ は一様連続だが、f₁ は 0 付近で関数値が発散するため一様連続でない。",
      "ウ": "f₂ では x＝n と y＝n＋1/n の差が零に近づく一方、差商の大きさは指数関数的に増え、関数値の差も発散する。",
      "エ": "f₃ は |x sin(1/x)|≦|x| から 0 でも連続であり、コンパクトな区間上で連続なので一様連続である。",
      "オ": "定義域が閉有界区間の f₃ はそこで連続なので、一様連続な関数が存在する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 36。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q037",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 37,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "二曲面の交線の接線",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xyz 空間 ℝ³ 内の二つの曲面\nS₁＝{(x,y,z) ｜ x⁴＋y³＋z²＝13, x,y,z≧0}、\nS₂＝{(x,y,z) ｜ 16x²＋8y²−z⁴＝32, x,y,z≧0}\nに対して、これらの共通部分として定まる曲線を C とする。このとき、点 (1,2,2) における C の接線 l と xy 平面の関係として正しいのはどれか。",
    "choices": {
      "ア": "(−7/2, 7/2, 0) で交わる。",
      "イ": "(−4, 4, 0) で交わる。",
      "ウ": "(−7/2, 9/2, 0) で交わる。",
      "エ": "(−3, 4, 0) で交わる。",
      "オ": "交点を持たない。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "法線 (4,12,4) と (32,32,−32) の両方に直交する方向は (−2,1,−1) である。接線上で z を 0 にするにはこの方向にパラメータを2進めればよい。",
    "choiceExplanations": {
      "ア": "交点候補までの変位 (−9/2,3/2,−2) は S₁ の法線 (4,12,4) と直交しない。",
      "イ": "候補点への変位 (−5,2,−2) は S₂ の法線 (32,32,−32) に直交しない。",
      "ウ": "この候補では y の増加が 5/2 であり、z が2減るときの正しい増加量 2 を超える。",
      "エ": "法線 (4,12,4) と (32,32,−32) の両方に直交する方向は (−2,1,−1) である。接線上で z を 0 にするにはこの方向にパラメータを2進めればよい。",
      "オ": "接線方向 (−2,1,−1) は z 成分が零でなく、z＝0 を横切る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 37。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q039",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 39,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "複素正則関数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "複素数平面 ℂ 上の三つの関数 f、g、h をそれぞれ f(z)＝(z̄)²/4、g(z)＝(z＋z̄)/2、h(z)＝(z−z̄)/(2i) とする。ただし、z̄ は z の複素共役を表し、i は虚数単位とする。\nこのとき、次の関数㋐〜㋓のうち、ℂ 上正則であるもののみを全て挙げているのはどれか。\n㋐ f(z)\n㋑ i(g(z)＋h(z))\n㋒ g(z)h(z)\n㋓ f(z)＋ig(z)h(z)",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "z＝x＋iy とおくと f(z) は (x²−y²)/4−ixy/2 であり、ig(z)h(z)＝ixy である。和は z²/4 となり正則である。",
    "choiceExplanations": {
      "ア": "f の複素共役方向の微分は z̄/2 であり、平面全体で零ではない。",
      "イ": "㋑は非定数の純虚数値関数、㋒は非定数の実数値関数であり、どちらも平面全体では正則でない。",
      "ウ": "㋑と㋒が正則なら開写像定理により像は開集合となるはずだが、いずれの像も直線上にある。",
      "エ": "㋓は正則だが、㋒は実数値で変化するので正則性を満たさない。",
      "オ": "z＝x＋iy とおくと f(z) は (x²−y²)/4−ixy/2 であり、ig(z)h(z)＝ixy である。和は z²/4 となり正則である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 39。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q040",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 40,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "ルベーグ測度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の集合のルベーグ測度はいくらか。\n{x∈(0,1) ｜ sin(logₑ x)＞0}",
    "choices": {
      "ア": "1/(e^π＋1)",
      "イ": "e^π/(e^π＋1)",
      "ウ": "1/(e^(2π)＋1)",
      "エ": "e^π/(e^(2π)＋1)",
      "オ": "e^(2π)/(e^(2π)＋1)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "log x の負の範囲で正弦が正になる最初の区間は (−2π,−π) である。各区間長を合計すると (e^(−π)−e^(−2π))/(1−e^(−2π))＝1/(e^π＋1) となる。",
    "choiceExplanations": {
      "ア": "log x の負の範囲で正弦が正になる最初の区間は (−2π,−π) である。各区間長を合計すると (e^(−π)−e^(−2π))/(1−e^(−2π))＝1/(e^π＋1) となる。",
      "イ": "これは 1 から正解の測度を引いた値で、ほぼ全体を占める負の正弦側の測度に対応する。",
      "ウ": "対数側の区間の長さは π で、間隔 2π のみから測度を求めることはできない。",
      "エ": "級数の公比は e^(−2π) だが、最初の区間長は e^(−π)−e^(−2π) である。",
      "オ": "正弦が正となる x は e^(−π) 以下に限られ、この選択肢のように1に近い測度にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 40。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q041",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 41,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "熱方程式と対数微分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "正の実数値をとる C^∞ 級の2変数関数 u(t,x) が偏微分方程式 uₜ＝uₓₓ を満たすとき、v＝uₓ/u で定まる2変数関数 v(t,x) が必ず満たす偏微分方程式として正しいのは次のうちではどれか。",
    "choices": {
      "ア": "vₜ−vvₓ＋2vₓₓ＝0",
      "イ": "vₜ＋vvₓ＋2vₓₓ＝0",
      "ウ": "vₜ−2vvₓ−vₓₓ＝0",
      "エ": "vₜ−2vvₓ＋vₓₓ＝0",
      "オ": "vₜ＋2vvₓ＋2vₓₓ＝0"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "w＝log u とすると wₜ＝wₓₓ＋wₓ² である。x で微分して v＝wₓ を用いると vₜ＝vₓₓ＋2vvₓ を得る。",
    "choiceExplanations": {
      "ア": "(v²)ₓ は 2vvₓ であり、熱方程式に由来する vₓₓ の係数もこの式とは異なる。",
      "イ": "w＝log u の方程式 wₜ＝wₓₓ＋wₓ² を微分すると、vₜ 側と同符号で括った場合の係数は −2、−1 になる。",
      "ウ": "w＝log u とすると wₜ＝wₓₓ＋wₓ² である。x で微分して v＝wₓ を用いると vₜ＝vₓₓ＋2vvₓ を得る。",
      "エ": "非線形項の符号は合うが、vₓₓ は右辺に正の符号で現れる。",
      "オ": "連鎖律によって vₜ は vₓₓ と 2vvₓ の和になるため、左辺では両者を引く。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 41。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q042",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 42,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "逐次近似法",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "0以上の整数 n に対して、関数 xₙ(t) を x₀(t)＝1、xₙ₊₁(t)＝1＋∫₀ᵗ s xₙ(s) ds で定めるとき、lim[n→∞] xₙ(1) はいくらか。",
    "choices": {
      "ア": "1",
      "イ": "√e",
      "ウ": "e",
      "エ": "e√e",
      "オ": "e²"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "反復すると xₙ(t)＝Σ[k＝0〜n] (t²/2)ᵏ/k! を得る。t＝1 で級数の極限を取ると exp(1/2) である。",
    "choiceExplanations": {
      "ア": "初回の反復でも x₁(1)＝1＋1/2 となるため、極限は1より大きい。",
      "イ": "反復すると xₙ(t)＝Σ[k＝0〜n] (t²/2)ᵏ/k! を得る。t＝1 で級数の極限を取ると exp(1/2) である。",
      "ウ": "積分方程式の微分形は x′＝t x であり、指数は t でなく t²/2 である。",
      "エ": "t＝1 における指数 1/2 は、係数 s を 0 から1まで積分して得られる。",
      "オ": "積分演算を繰り返すと評価点1では 1/(2ᵏk!) が加わり、e² の級数にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 42。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q043",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 43,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "フーリエ変換と畳み込み",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "関数 f(x) を f(x)＝x（−1≦x≦1）、0（x＜−1 または 1＜x）で定めるとき、関数 g(x)＝∫[−∞〜∞] f(x−y)f(y) dy のフーリエ変換 ℱ[g](ξ)＝∫[−∞〜∞] g(x)e^(−iξx) dx の ξ＝π/4 における値 ℱ[g](π/4) はいくらか。ただし、i は虚数単位である。",
    "choices": {
      "ア": "−2(4−π)²/π⁴",
      "イ": "−4(4−π)²/π⁴",
      "ウ": "−8(4−π)²/π⁴",
      "エ": "−16(4−π)²/π⁴",
      "オ": "−32(4−π)²/π⁴"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "部分積分により ℱ[f](ξ)＝2i(cos ξ/ξ−sin ξ/ξ²) となる。ξ＝π/4 でこれを二乗すると −32(4−π)²/π⁴ である。",
    "choiceExplanations": {
      "ア": "畳み込みの変換は ℱ[f] の二乗であり、π/4 ではその絶対値の二乗の係数が2ではなく32となる。",
      "イ": "奇関数の積分を 0 から1に縮める段階で因子2が付き、フーリエ変換を二乗するとこの因子も二乗される。",
      "ウ": "ξ＝π/4 のとき 1/ξ²＝16/π² となるため、sin 項の値を 8/π² と見積もることはできない。",
      "エ": "sin(π/4) と cos(π/4) はともに √2/2 で、二乗した係数にもこの値が反映される。",
      "オ": "部分積分により ℱ[f](ξ)＝2i(cos ξ/ξ−sin ξ/ξ²) となる。ξ＝π/4 でこれを二乗すると −32(4−π)²/π⁴ である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 43。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q044",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 44,
    "type": "multiple-choice",
    "category": "解析",
    "topicTags": [
      "ガウスの発散定理",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "xyz 空間において、単位球面 S＝{(x,y,z) ｜ x²＋y²＋z²＝1} は n(0,0,1)＝(0,0,1) を満たす外向きの単位法線ベクトル場 n によって向き付けられているとする。ℝ³ 上のベクトル場 A を A(x,y,z)＝(xy²＋x²y, yz²＋y²z, zx²＋z²x) と定めたとき、面積分 ∬ₛ A・n dS の値はいくらか。",
    "choices": {
      "ア": "0",
      "イ": "π/5",
      "ウ": "2π/5",
      "エ": "3π/5",
      "オ": "4π/5"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "発散定理により球内部で x²＋y²＋z²＋2xy＋2yz＋2zx を積分する。交差項は消え、4π∫₀¹ r⁴ dr＝4π/5 が残る。",
    "choiceExplanations": {
      "ア": "発散のうち xy、yz、zx に比例する項は対称性で消えるが、二乗項の積分は正である。",
      "イ": "半径方向の r² の積分に球面全体の立体角 4π を掛けるため、π/5 にはならない。",
      "ウ": "被積分関数は単位球での体積積分に直せるため、北半球に対応する係数 2π で止めると半分になる。",
      "エ": "対称性により x²、y²、z² の三項は等しいが、合計は球座標で r² となり総立体角は 4π である。",
      "オ": "発散定理により球内部で x²＋y²＋z²＋2xy＋2yz＋2zx を積分する。交差項は消え、4π∫₀¹ r⁴ dr＝4π/5 が残る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 44。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q045",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 45,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "異なる二種が揃うまでの待ち時間",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "3種類のおもちゃ A、B、C のいずれか一つが封入された箱が販売されている。購入し開封するまで中身は分からず、おもちゃが A、B、C である確率はそれぞれ 1/30、1/20、11/12 となっている。この箱を一つずつ購入し開封していくとき、A と B の2種類のおもちゃが揃うまでに購入される箱の個数の期待値はいくらか。",
    "choices": {
      "ア": "35",
      "イ": "36",
      "ウ": "37",
      "エ": "38",
      "オ": "41"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "A と B の初出時刻を Tₐ、Tᵦ とすると、必要なのは max(Tₐ,Tᵦ) である。期待値は 30＋20−1/(1/30＋1/20)＝38 となる。",
    "choiceExplanations": {
      "ア": "最初に A か B が出るまで平均12箱かかり、その後の待ち時間も平均26箱ある。",
      "イ": "A が先に出る確率は2/5で、B を待つ20箱と A を待つ30箱を等しい重みで平均することはできない。",
      "ウ": "最初に出た方が B である確率は3/5なので、残りの期待値は 20×2/5＋30×3/5＝26 となる。",
      "エ": "A と B の初出時刻を Tₐ、Tᵦ とすると、必要なのは max(Tₐ,Tᵦ) である。期待値は 30＋20−1/(1/30＋1/20)＝38 となる。",
      "オ": "個別の初出期待値の合計50から、どちらかが最初に出るまでの期待値12を引く必要がある。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 45。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q046",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 46,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "マルコフ連鎖",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "粒子 P を1秒ごとに観測すると、各時点で四つの点 a₁、a₂、b、c のいずれかに滞在している。3点から形成される二つのグループ Xᵢ＝{aᵢ,b,c}（i＝1,2）に基づき、それぞれのグループ内での粒子の移動規則 Mᵢ を次の通りに定める。\nMᵢ：グループ Xᵢ のうち粒子が滞在している点以外の2点のいずれか一方に確率1/2で移動する。\nここで、各観測時点で粒子 P が滞在している点から、1秒後に P が観測される点について次が分かっているとする。\n・点 aᵢ（i＝1,2）に滞在していれば、Mᵢ に従う。\n・点 b に滞在していれば、M₁ と M₂ のいずれか一方がそれぞれ確率1/2で選択され、選ばれた移動規則に従う。\n・点 c に滞在していれば、M₁ と M₂ のいずれか一方がそれぞれ確率1/4及び確率3/4で選択され、選ばれた移動規則に従う。\n以上の仮定の下で、点 a₁ で観測された粒子 P が n 秒後に点 c で観測される確率を pₙ とするとき、lim[n→∞] pₙ はいくらか。",
    "choices": {
      "ア": "1/8",
      "イ": "1/6",
      "ウ": "5/24",
      "エ": "1/3",
      "オ": "3/8"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "c にいると次は必ず別の点に移り、他の各点からは確率1/2で c に入る。pₙ₊₁＝(1−pₙ)/2 の不動点は1/3であり、誤差は毎回 −1/2 倍になる。",
    "choiceExplanations": {
      "ア": "1/8 は c から a₁ へ1秒で移る確率であり、長時間後に c にいる確率とは異なる。",
      "イ": "c 以外の三点のどこからでも次に c へ移る確率は1/2なので、極限が1/6では確率の流入と流出が釣り合わない。",
      "ウ": "5/24 は定常状態での a₂ の確率に相当し、c の確率は p＝(1−p)/2 で決まる。",
      "エ": "c にいると次は必ず別の点に移り、他の各点からは確率1/2で c に入る。pₙ₊₁＝(1−pₙ)/2 の不動点は1/3であり、誤差は毎回 −1/2 倍になる。",
      "オ": "3/8 は c から a₂ へ1秒で移る確率であり、c に入る確率を表していない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 46。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q047",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 47,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "カルバック・ライブラー情報量",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "二つの事象 A、B は P(A)＝1/6、P(B｜A)＝1/2、P(B｜Aᶜ)＝1/5 を満たしている。ただし、P(B｜A) は事象 A の下での事象 B の条件付き確率であり、P(B｜Aᶜ) は A の余事象の下での B の条件付き確率である。このとき、観測の対象として A、Aᶜ を与える場合の、事象 B の下での条件付き確率の確率 P に対するカルバック―ライブラー情報量\nP(A｜B) logₑ[P(A｜B)/P(A)]＋P(Aᶜ｜B) logₑ[P(Aᶜ｜B)/P(Aᶜ)]\nはいくらか。",
    "choices": {
      "ア": "(5 logₑ2−2 logₑ5−2 logₑ3)/3",
      "イ": "(2 logₑ5−5 logₑ2)/3",
      "ウ": "(11 logₑ2−5 logₑ5)/6",
      "エ": "(5 logₑ5−11 logₑ2)/6",
      "オ": "(5 logₑ2−2 logₑ5)/3"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "P(B)＝1/12＋1/6＝1/4 なので、事後確率は 1/3 と 2/3 である。比は2と4/5となり、(logₑ2＋2 logₑ(4/5))/3 を整理すればよい。",
    "choiceExplanations": {
      "ア": "事後確率と事前確率の比は2と4/5であり、整理後に logₑ3 の項は現れない。",
      "イ": "与えられた向きの情報量は非負であり、この選択肢は 5²＜2⁵ のため負になる。",
      "ウ": "各対数に掛けるのは事後確率の 1/3 と 2/3 であり、1/6 と 5/6 ではない。",
      "エ": "この式は対数比を逆にして事前分布で重み付けした場合に対応し、設問の向きと異なる。",
      "オ": "P(B)＝1/12＋1/6＝1/4 なので、事後確率は 1/3 と 2/3 である。比は2と4/5となり、(logₑ2＋2 logₑ(4/5))/3 を整理すればよい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 47。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q048",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 48,
    "type": "multiple-choice",
    "category": "確率・統計",
    "topicTags": [
      "二項分布の偶奇",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "λ を正の定数とする。n＞λ なる正の整数 n に対し、表が出る確率が λ/n である硬貨を n 回投げたときに、表が出る回数が偶数回となる確率を pₙ とする。このとき、極限 lim[n→∞] pₙ の値はいくらか。",
    "choices": {
      "ア": "(1−e^(−λ))/2",
      "イ": "(1−e^(−2λ))/2",
      "ウ": "1/2",
      "エ": "(1＋e^(−λ))/2",
      "オ": "(1＋e^(−2λ))/2"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "表の回数を K とすると 2pₙ−1＝E[(−1)ᴷ]＝(1−2λ/n)ⁿ である。右辺の極限が e^(−2λ) なので、これを pₙ について解けばよい。",
    "choiceExplanations": {
      "ア": "表が0回の確率は e^(−λ) に近づくが、偶数回には2回、4回などの確率も加わる。",
      "イ": "これは奇数回となる確率の極限であり、偶数回はその補集合である。",
      "ウ": "λ を固定すると偶数と奇数の確率差は e^(−2λ) と正なので、両者は等しくない。",
      "エ": "偶奇の確率差には (1−2λ/n)ⁿ が現れ、(1−λ/n)ⁿ ではない。",
      "オ": "表の回数を K とすると 2pₙ−1＝E[(−1)ᴷ]＝(1−2λ/n)ⁿ である。右辺の極限が e^(−2λ) なので、これを pₙ について解けばよい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 48。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q049",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 49,
    "type": "multiple-choice",
    "category": "計算機数学",
    "topicTags": [
      "論理関数の和積標準形",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次は、論理変数 x、y、z に関するある論理関数 f：{0,1}³→{0,1} の真理値表である。この関数 f を和積標準形 A₁∧A₂ で表したものとして正しいのはどれか。\nただし、i＝1,2 に対して Aᵢ＝p₁ⁱ∨p₂ⁱ∨p₃ⁱ であり、p₁ⁱ、p₂ⁱ、p₃ⁱ は x、y、z、若しくはそれらの否定 x̄、ȳ、z̄ である。",
    "choices": {
      "ア": "(x∨y∨z)∧(x∨y∨z̄)",
      "イ": "(x∨y∨z̄)∧(x̄∨ȳ∨z̄)",
      "ウ": "(x∨ȳ∨z)∧(x̄∨y∨z̄)",
      "エ": "(x̄∨y∨z)∧(x̄∨ȳ∨z)",
      "オ": "(x̄∨ȳ∨z)∧(x∨ȳ∨z̄)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "表で値が0となる行は (0,0,1) と (1,1,1) である。それぞれの行でだけ偽になる最大項を作り、その論理積を取る。",
    "choiceExplanations": {
      "ア": "第1因子が (0,0,0) で偽になるが、表でのこの行の値は1である。",
      "イ": "表で値が0となる行は (0,0,1) と (1,1,1) である。それぞれの行でだけ偽になる最大項を作り、その論理積を取る。",
      "ウ": "第1因子が (0,1,0) で偽を返すため、真理値表と合わない。",
      "エ": "第1因子は (1,0,0) で偽であるが、表ではこの入力の出力は1である。",
      "オ": "第1因子は (1,1,0) で偽になるので、値が1の行まで除いてしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 49。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q049.webp"
    ],
    "imageAltTexts": [
      "論理変数 x、y、z の8通りの入力に対する真理値表"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q050",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 50,
    "type": "multiple-choice",
    "category": "計算機数学",
    "topicTags": [
      "16進数の計算",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "16進数で 7FFD と表される正数と 8003 と表される正数を掛けた値を、16進数で表した値はいくらか。",
    "choices": {
      "ア": "3FDA0009",
      "イ": "3FFD0009",
      "ウ": "3FFFFFF7",
      "エ": "4AFE8009",
      "オ": "4FFFC007"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "16進数の 7FFD＝8000−3、8003＝8000＋3 なので、積は 40000000−9＝3FFFFFF7 である。",
    "choiceExplanations": {
      "ア": "両数は16進数の8000から3ずつ離れているので、積の下4桁は 0009 でなく FFF7 になる。",
      "イ": "末尾が9となるのは差の平方の符号を足した場合だが、ここでは 8000² から9を引く。",
      "ウ": "16進数の 7FFD＝8000−3、8003＝8000＋3 なので、積は 40000000−9＝3FFFFFF7 である。",
      "エ": "積は 16進数の 40000000 を少し下回るので、先頭が4のこの値は大きすぎる。",
      "オ": "一の位の7は合うが、積は 16進数の 40000000 より小さい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 50。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q051",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 51,
    "type": "multiple-choice",
    "category": "計算機数学",
    "topicTags": [
      "有限オートマトンと正規表現",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "Σ＝{a,b} とする。図のような決定性有限オートマトンが定義する言語と等価な言語を表す正規表現は次のうちではどれか。\nただし、初期状態を ⇒、受理状態を◎で表すとする。また、正規表現「＋」、「・」、「*」はそれぞれ「和集合をとる」、「連接する」、「0回以上の連接を任意の回数繰り返す」を表すものとする。",
    "choices": {
      "ア": "a・b*＋b*",
      "イ": "a・b・(a・b)*＋b・b*",
      "ウ": "(a・b)*＋b*",
      "エ": "(a・b)*＋b・b*",
      "オ": "(a・b＋b)*"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "どちらの受理状態からも b 単独と ab のまとまりで受理状態へ移れる。a の直後には b が必要なので、全ての受理語は b と ab の連接である。",
    "choiceExplanations": {
      "ア": "a の直後は非受理状態なので、a 単独まで含むこの式は一致しない。",
      "イ": "初期状態が受理状態なので空語が含まれるが、この式は最低1文字を要求する。",
      "ウ": "bab は初期状態から下の受理状態を経由して初期状態に戻るため受理されるが、この式では生成されない。",
      "エ": "abb は ab で初期状態に戻り、最後の b で下の受理状態に入るが、この式では生成されない。",
      "オ": "どちらの受理状態からも b 単独と ab のまとまりで受理状態へ移れる。a の直後には b が必要なので、全ての受理語は b と ab の連接である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 51。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q051.webp"
    ],
    "imageAltTexts": [
      "初期状態と二つの受理状態を含む決定性有限オートマトン"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q052",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 52,
    "type": "multiple-choice",
    "category": "情報理論",
    "topicTags": [
      "確率分布とエントロピー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "S＝{1,2,3} 上の確率分布 P₀(X) に対し、次で確率分布 Pₜ(X) を定める。\nPₜ(X＝x)＝Σ[y∈S, y≠x] Pₜ₋₁(X＝y)/2　（t＝1,2,…）\n確率分布 Pₜ(X) のエントロピー Hₜ(X)＝−Σ[x∈S] Pₜ(X＝x) log₂ Pₜ(X＝x) について、P₀(X) によらず成り立つ性質として最も妥当なのはどれか。",
    "choices": {
      "ア": "Hₜ(X)≦Hₜ₋₁(X)",
      "イ": "Hₜ(X)＜Hₜ₋₁(X)",
      "ウ": "Hₜ(X)＝Hₜ₋₁(X)",
      "エ": "Hₜ(X)＞Hₜ₋₁(X)",
      "オ": "Hₜ(X)≧Hₜ₋₁(X)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "更新後の分布は、元の分布を左右に巡回置換した二つの分布の平均になる。エントロピーの凹性と置換で値が変わらないことから、更新後のエントロピーは元以上である。",
    "choiceExplanations": {
      "ア": "一点に質量が集中する分布から始めると、次の分布は残る二点に半分ずつ分かれ、エントロピーが増える。",
      "イ": "一様分布は更新しても一様のままなので、常に厳密に減ることはない。",
      "ウ": "分布 (1,0,0) から (0,1/2,1/2) に変わるとエントロピーが0から1に増えるため、常に等しいわけではない。",
      "エ": "一様分布の場合は時刻によらずエントロピーが log₂3 なので、厳密な不等号は成立しない。",
      "オ": "更新後の分布は、元の分布を左右に巡回置換した二つの分布の平均になる。エントロピーの凹性と置換で値が変わらないことから、更新後のエントロピーは元以上である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 52。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q053",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 53,
    "type": "multiple-choice",
    "category": "情報理論",
    "topicTags": [
      "初回成功時刻の期待値",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "表と裏が出る確率がそれぞれ1/2のコインを M 回振る。このとき、次のような確率変数を考える。\nN＝表が出るまでにかかった試行の回数（M回の試行で表が出た場合）、0（M回の試行で全て裏が出た場合）\nN の期待値が 15/8 よりも大きくなるような最小の M の値はいくらか。",
    "choices": {
      "ア": "4",
      "イ": "5",
      "ウ": "6",
      "エ": "7",
      "オ": "8"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "期待値は Σ[k＝1〜M] k/2ᵏ＝2−(M＋2)/2ᴹ で、M とともに増える。M＝6 で 15/8、M＝7 でそれを超える。",
    "choiceExplanations": {
      "ア": "M＝4 の期待値は 2−6/16＝13/8 であり、15/8 を下回る。",
      "イ": "M＝5 では 2−7/32＝57/32 なので、15/8＝60/32 に達しない。",
      "ウ": "M＝6 で期待値は 2−8/64＝15/8 となるが、設問はこの値を超えることを求めている。",
      "エ": "期待値は Σ[k＝1〜M] k/2ᵏ＝2−(M＋2)/2ᴹ で、M とともに増える。M＝6 で 15/8、M＝7 でそれを超える。",
      "オ": "M＝8 でも条件は満たすが、既に M＝7 で期待値が 15/8 より大きい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 53。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q054",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 54,
    "type": "multiple-choice",
    "category": "計算機数学",
    "topicTags": [
      "再帰と二項係数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "C言語で記述された次のプログラムを実行したとき、出力される数はいくらか。\n#include<stdio.h>\nint F(int m, int n){\n  int C;\n  if(n == 0 || n == m){\n    C = 1;\n  }else{\n    C = F(m-1, n-1) + F(m-1, n);\n  }\n  return C;\n}\nint main(void){\n  int C, m = 7, n = 4;\n  C = F(m, n);\n  printf(\"%d\\n\", C);\n  return 0;\n}",
    "choices": {
      "ア": "35",
      "イ": "36",
      "ウ": "37",
      "エ": "38",
      "オ": "39"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "再帰式と両端の値1はパスカルの三角形に一致する。したがって F(7,4)＝7!/(4!3!)＝35 である。",
    "choiceExplanations": {
      "ア": "再帰式と両端の値1はパスカルの三角形に一致する。したがって F(7,4)＝7!/(4!3!)＝35 である。",
      "イ": "F(6,3) は20、F(6,4) は15となるため、合計は36に届かない。",
      "ウ": "基底条件で返す1は各再帰枝に対応し、F(6,3) と F(6,4) の和に追加で足す値はない。",
      "エ": "m が1減る二つの呼出しを足して得られる値は 20＋15 であり、試行回数を足す計算ではない。",
      "オ": "F(7,4) は F(7,3) と等しく、7個から3個を選ぶ組合せ数 35 に当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 54。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q056",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 56,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "合同式と逆元",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "S＝{0,1,2,…,25} とする。暗号化関数 E：S→S を E(x)＝23x＋3 (mod 26) と定義すると、それに対応する復号化関数 D：S→S とは、D(E(x))＝x（x∈S）となるような関数であり、ある a∈S を用いて D(y)＝a(y−3) (mod 26) と表される。このとき、D(1) の値はいくらか。",
    "choices": {
      "ア": "6",
      "イ": "11",
      "ウ": "17",
      "エ": "18",
      "オ": "23"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "23×9≡1 (mod 26) なので a＝9 である。D(1)≡9(1−3)≡18 (mod 26) となる。",
    "choiceExplanations": {
      "ア": "E(6) は11となり、1に復号される前の値ではない。",
      "イ": "23×11＋3＝256 で、26で割った余りは22である。",
      "ウ": "23×17＋3＝394 の26での余りは4になり、1にならない。",
      "エ": "23×9≡1 (mod 26) なので a＝9 である。D(1)≡9(1−3)≡18 (mod 26) となる。",
      "オ": "23 は E の乗数だが、その逆元は9であり、求める復号値にも一致しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 56。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q057",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 57,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "ハミルトン閉路",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次に示すグラフ (a)〜(f) のうち、各頂点をちょうど一度だけ通る閉路をもつもののみを全て挙げているのはどれか。",
    "choices": {
      "ア": "(a)、(b)、(d)",
      "イ": "(a)、(c)、(e)、(f)",
      "ウ": "(b)、(c)、(d)、(e)、(f)",
      "エ": "(b)、(d)、(f)",
      "オ": "(c)、(e)、(f)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "(c) は左→上→中央→右→下、(e) は左上→右上→右下→中央→左下、(f) は左上→右上→右下→左下→中央と進み始点へ戻れる。(a) は奇数頂点の二部グラフで、(b) と (d) には次数2の頂点を全て通る閉路がない。",
    "choiceExplanations": {
      "ア": "(a) は頂点数が奇数の二部グラフなので奇数長の閉路をもたず、全頂点を通れない。",
      "イ": "(c)、(e)、(f) は条件を満たすが、二部グラフである (a) には5頂点を回る閉路がない。",
      "ウ": "(b) では三つの次数2の頂点を通るために左右の頂点がそれぞれ3本の閉路辺を必要とし、成立しない。",
      "エ": "(d) では右上、中央、左下の頂点を通ると左上と右下にそれぞれ3本の辺が必要になる。",
      "オ": "(c) は左→上→中央→右→下、(e) は左上→右上→右下→中央→左下、(f) は左上→右上→右下→左下→中央と進み始点へ戻れる。(a) は奇数頂点の二部グラフで、(b) と (d) には次数2の頂点を全て通る閉路がない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 57。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q057.webp"
    ],
    "imageAltTexts": [
      "5頂点からなる無向グラフ (a)〜(f)"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q058",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 58,
    "type": "multiple-choice",
    "category": "離散数学",
    "topicTags": [
      "グラフの歩道数",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のような無向グラフを考える。頂点1から頂点2に至る長さ5の経路はいくつあるか。\nただし、経路は頂点の列であり、経路を構成する辺の数を長さとする。また、同じ頂点を複数回通ることも許すものとする。",
    "choices": {
      "ア": "60",
      "イ": "61",
      "ウ": "62",
      "エ": "63",
      "オ": "64"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "ループを除いた四角形で、頂点1から2へ奇数回 k で移る経路は 2^(k−1) 通りある。ループする時点を選ぶと、長さ5の総数は 5×1＋10×4＋1×16＝61 になる。",
    "choiceExplanations": {
      "ア": "別頂点への移動が1回、3回、5回の場合は順に 5、40、16 通りで、合計が60を1上回る。",
      "イ": "ループを除いた四角形で、頂点1から2へ奇数回 k で移る経路は 2^(k−1) 通りある。ループする時点を選ぶと、長さ5の総数は 5×1＋10×4＋1×16＝61 になる。",
      "ウ": "各自己ループは頂点列上では1通りの滞在であり、別方向のループとして重複計上できない。",
      "エ": "ループ以外の移動回数が偶数だと1と2が属する二部グラフの異なる側を結べず、数に加わらない。",
      "オ": "ループなしの5歩では最後に2を選ぶため経路は16通りであり、それに5通りと40通りを加える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 58。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q058.webp"
    ],
    "imageAltTexts": [
      "四頂点の四角形と各頂点の自己ループ"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q059",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 59,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "前進差分の精度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "連続的微分可能な関数 f(x) の1階導関数 f′(x) の2次精度の近似式を f(x)、f(x＋h)、f(x＋2h) を用いて表したものとして最も妥当なのはどれか。\nただし、近似式が2次精度であるとは、h の絶対値が十分小さいときに、近似式と元の式の差の大きさが h² の定数倍以下であることを意味する。",
    "choices": {
      "ア": "[f(x)−2f(x＋h)＋f(x＋2h)]/h",
      "イ": "[f(x)−2f(x＋h)＋f(x＋2h)]/h²",
      "ウ": "[3f(x)−4f(x＋h)＋f(x＋2h)]/h²",
      "エ": "[−f(x)＋2f(x＋h)−f(x＋2h)]/h",
      "オ": "[−3f(x)＋4f(x＋h)−f(x＋2h)]/(2h)"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "十分滑らかな f に対してはテイラー展開の定数項と2次項が消え、f′(x) を誤差 O(h²) で得る公式である。原文の連続的微分可能という条件だけで誤差 O(h²) が保証されるわけではなく、例えば3階導関数が近傍で有界ならこの誤差評価が成り立つ。",
    "choiceExplanations": {
      "ア": "f(x)＝x のような一次関数では分子が0になるため、導関数1を近似できない。",
      "イ": "十分滑らかな場合にこの形が近似するのは2階導関数で、一次関数の導関数を再現しない。",
      "ウ": "一次関数 f(x)＝x に対してこの式は −2/h となり、h を小さくしても1に近づかない。",
      "エ": "この式も一次関数を代入すると0となり、一次の変化を打ち消してしまう。",
      "オ": "十分滑らかな f に対してはテイラー展開の定数項と2次項が消え、f′(x) を誤差 O(h²) で得る公式である。原文の連続的微分可能という条件だけで誤差 O(h²) が保証されるわけではなく、例えば3階導関数が近傍で有界ならこの誤差評価が成り立つ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 59。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q060",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 60,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "ニュートン法の二次収束",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "関数 g：ℝ→ℝ を連続的微分可能とし、g(1)＝2、g′(1)＝−3 であるとする。関数 f：ℝ→ℝ を f(x)＝(x−1)g(x) と定義し、方程式 f(x)＝0 に対しニュートン法を適用して生成された点列を {xₖ}（k≧0） とする。lim[k→∞] xₖ＝1 かつ各 k について xₖ≠1 であるとき、lim[k→∞] |xₖ₊₁−1|/|xₖ−1|² はいくらか。",
    "choices": {
      "ア": "4/9",
      "イ": "2/3",
      "ウ": "1",
      "エ": "3/2",
      "オ": "9/4"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ニュートン更新を整理すると xₖ₊₁−1＝(xₖ−1)²g′(xₖ)/[g(xₖ)＋(xₖ−1)g′(xₖ)] となる。連続性から求める絶対値の比は 3/2 に収束する。",
    "choiceExplanations": {
      "ア": "4/9 は g(1)/|g′(1)| の二乗だが、誤差の二乗で割ると残る係数は |g′(1)|/|g(1)| である。",
      "イ": "誤差比は分子に |g′(1)|、分母に |g(1)| が残るので、2/3 はその逆数である。",
      "ウ": "g(1) の大きさ2に対して g′(1) の大きさが3なので、極限は1より大きい。",
      "エ": "ニュートン更新を整理すると xₖ₊₁−1＝(xₖ−1)²g′(xₖ)/[g(xₖ)＋(xₖ−1)g′(xₖ)] となる。連続性から求める絶対値の比は 3/2 に収束する。",
      "オ": "比の中で二乗されているのは現在の誤差であり、残る係数 3/2 をさらに二乗する必要はない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 60。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q065",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 65,
    "type": "multiple-choice",
    "category": "数値計算",
    "topicTags": [
      "凸性とヘッセ行列",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の関数 f(x,y,z) が凸関数となるような整数 k はいくつあるか。\nf(x,y,z)＝3x²＋(8−k)xy＋3y²＋(2/3)z⁶−(k/3)z⁴＋10z²",
    "choices": {
      "ア": "8",
      "イ": "9",
      "ウ": "10",
      "エ": "11",
      "オ": "15"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "xy 成分のヘッセ行列から |8−k|≦6 が必要となる。z 成分の二階微分 20(z²−1)²＋4(10−k)z² は k≦10 で非負であり、k＞10 では z²＝1 で負になるので、整数は2〜10の9個である。",
    "choiceExplanations": {
      "ア": "端点 k＝2 と k＝10 でもヘッセ行列は半正定値なので、両方を範囲に含める。",
      "イ": "xy 成分のヘッセ行列から |8−k|≦6 が必要となる。z 成分の二階微分 20(z²−1)²＋4(10−k)z² は k≦10 で非負であり、k＞10 では z²＝1 で負になるので、整数は2〜10の9個である。",
      "ウ": "k＝11 を含めると z＝1 で z 方向の二階微分が −4 となり、凸性に反する。",
      "エ": "xy 平面に制限した条件だけでは範囲が広くなりすぎ、z 方向の条件によって上限は10まで下がる。",
      "オ": "k は下限2と上限10を同時に満たす必要があるため、15通りにはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 65。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q066",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 66,
    "type": "multiple-choice",
    "category": "物理数学",
    "topicTags": [
      "保存場の線積分",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように、xy 平面において、y≧0 の領域に、原点 O を中心とする半径 r の半円がある。\n(r,0) を始点、(−r,0) を終点とする、この半円に沿った反時計回りの経路を C とするとき、経路 C に沿ったベクトル場 A＝(x²,y²) の線積分の値はいくらか。",
    "choices": {
      "ア": "−2πr³/3",
      "イ": "−2r³/3",
      "ウ": "0",
      "エ": "2r³/3",
      "オ": "2πr³/3"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "A は φ＝(x³＋y³)/3 の勾配である。積分は終点と始点のポテンシャル差で、(−r³−r³)/3＝−2r³/3 となる。",
    "choiceExplanations": {
      "ア": "A は勾配場で経路によらず、半円の弧長に由来する π の因子は現れない。",
      "イ": "A は φ＝(x³＋y³)/3 の勾配である。積分は終点と始点のポテンシャル差で、(−r³−r³)/3＝−2r³/3 となる。",
      "ウ": "y³ の項は始点と終点でともに0だが、x³ の値は r³ から −r³ へ変化する。",
      "エ": "この値は経路を逆向きにたどった場合の符号である。",
      "オ": "経路長を掛ける形にはならず、終点のポテンシャルは始点より小さいので積分は負である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 66。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q066.webp"
    ],
    "imageAltTexts": [
      "原点を中心とする上半円と右から左へ進む経路 C"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q069",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 69,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "投射軌道の包絡線",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "花火が打ち上がって花火玉が破裂すると、無数の小さな火薬玉が四方八方に飛び出して発光する。図のように、水平面内に x 軸、鉛直上向きに z 軸正の向きをとり、原点で花火玉が破裂した直後に火薬玉は速さ v で一様等方に飛び出したとする。十分に時間が経過したとき、xz 面内で火薬玉が発光した領域の包絡線（図の太い曲線）を表す式として最も妥当なのはどれか。\nただし、重力加速度の大きさを g とし、空気抵抗や風の影響は無視できるものとする。また、火薬玉の発光は十分長く続くものとする。",
    "choices": {
      "ア": "z＝−(g/v²)x²＋v²/(4g)",
      "イ": "z＝−(g/v²)x²＋v²/(2g)",
      "ウ": "z＝−[g/(2v²)]x²＋v²/(4g)",
      "エ": "z＝−[g/(2v²)]x²＋v²/(2g)",
      "オ": "z＝−[g/(4v²)]x²＋v²/(2g)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "射出角 θ の軌道は z＝x tan θ−[gx²/(2v²)](1＋tan²θ) である。固定した x で tan θ について最大化すると、求める式になる。",
    "choiceExplanations": {
      "ア": "鉛直に飛び出した火薬玉は x＝0 で高さ v²/(2g) まで上がり、この選択肢の切片を超える。",
      "イ": "水平面 z＝0 での最大飛距離は v²/g だが、この式の正の零点は v²/(√2g) となる。",
      "ウ": "x² の係数は正しいが、x＝0 の最大高さは v²/(4g) の2倍である。",
      "エ": "射出角 θ の軌道は z＝x tan θ−[gx²/(2v²)](1＋tan²θ) である。固定した x で tan θ について最大化すると、求める式になる。",
      "オ": "この式で z＝0 とすると x＝√2v²/g となり、同じ高さへ戻る投射の最大距離 v²/g を超える。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 69。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q069.webp"
    ],
    "imageAltTexts": [
      "火薬玉の投射軌道と包絡線"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q070",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 70,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "単振り子のラグランジュ方程式",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "単振り子のラグランジュ方程式に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「長さ l の糸に質量 m のおもりをつけた単振り子を考える。図に示したように、鉛直線と糸のなす角度 θ を一般化座標にとる。おもりの運動エネルギー及びおもりの最下点を基準とする重力の位置エネルギーを考えると、ラグランジアン（ラグランジュ関数）L は［㋐］となり、ラグランジュ方程式［㋑］を計算すると、ニュートンの運動方程式と同じ式が得られる。ただし、θ̇ は θ の時間微分を表し、重力加速度の大きさを g とする。」",
    "choices": {
      "ア": "L＝ml²θ̇²/2−mgl cos θ ／ d/dt(∂L/∂θ̇)−∂L/∂θ＝0",
      "イ": "L＝ml²θ̇²/2−mgl(1−cos θ) ／ d/dt(∂L/∂θ̇)＋∂L/∂θ＝0",
      "ウ": "L＝ml²θ̇²/2−mgl(1−cos θ) ／ d/dt(∂L/∂θ̇)−∂L/∂θ＝0",
      "エ": "L＝ml²θ̇²/2＋mgl(1−cos θ) ／ d/dt(∂L/∂θ̇)＋∂L/∂θ＝0",
      "オ": "L＝ml²θ̇²/2＋mgl(1−cos θ) ／ d/dt(∂L/∂θ̇)−∂L/∂θ＝0"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "最下点からの高さが l(1−cos θ) なので、L は運動エネルギーから mgl(1−cos θ) を引いた式になる。標準のラグランジュ方程式を使うと ml²θ̈＋mgl sin θ＝0 を得る。",
    "choiceExplanations": {
      "ア": "最下点を零とした位置エネルギーは mgl(1−cos θ) であり、L の角度依存項は ＋mgl cos θ になる。",
      "イ": "L は正しいが、停留条件で生じる ∂L/∂θ の項は左辺で負になる。",
      "ウ": "最下点からの高さが l(1−cos θ) なので、L は運動エネルギーから mgl(1−cos θ) を引いた式になる。標準のラグランジュ方程式を使うと ml²θ̈＋mgl sin θ＝0 を得る。",
      "エ": "符号を二つ変えると運動方程式の形が偶然合うが、L は T−V であり、方程式の左辺も ∂L/∂θ を引く。",
      "オ": "位置エネルギーを足した L を標準式に入れると、重力トルクの向きが安定な最下点から離れる方向になってしまう。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 70。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q070.webp"
    ],
    "imageAltTexts": [
      "鉛直線に対し角度 θ をなす長さ l の単振り子"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q071",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 71,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "正準変換と調和振動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "1次元調和振動子に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「質量 m、ばね定数 k の1次元調和振動子がある。この系のハミルトニアン H は、位置座標を x、運動量を p として H＝p²/(2m)＋kx²/2 で与えられる。一般化座標 Q とそれに共役な一般化運動量 P を用いて正準変換を行う。Γ を定数として Q＝Γx とおくと、Q に共役な運動量 P は P＝∂L/∂Q̇＝［㋐］と書ける。ここで、L は系のラグランジアン、Q̇ は Q の時間微分である。この P と Q を用いてハミルトニアン H＝PQ̇−L を書き下せば、調和振動子の運動エネルギーを E とするとき、H＝E の解が P−Q 位相空間において円軌道を描くための条件を求めることができる。その条件は、Γ＝［㋑］となる。このとき、円軌道の半径は［㋒］であり、さらに正準方程式 Q̇＝∂H/∂P、Ṗ＝−∂H/∂Q（Ṗ は P の時間微分）を考慮すれば、円軌道を描く角速度の大きさは［㋓］となる。」",
    "choices": {
      "ア": "mQ̇/Γ²／(mk)^(1/4)／(4mE²/k)^(1/4)／√[k/(4m)]",
      "イ": "mQ̇/Γ²／(mk)^(1/4)／(4mE²/k)^(1/4)／√(k/m)",
      "ウ": "mQ̇/Γ²／(mk/2)^(1/4)／(mE²/(4k))^(1/4)／√(k/m)",
      "エ": "2mQ̇/Γ²／(mk/2)^(1/4)／(4mE²/k)^(1/4)／√[k/(4m)]",
      "オ": "2mQ̇/Γ²／(mk/2)^(1/4)／(mE²/(4k))^(1/4)／√(k/m)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "P＝mQ̇/Γ² で、Γ⁴＝mk とすれば H＝√(k/m)(P²＋Q²)/2 になる。問題の H＝E に従って E を全エネルギーと読むと、半径は (4mE²/k)^(1/4)、角速度は √(k/m) である。",
    "choiceExplanations": {
      "ア": "正準方程式では Q̇＝√(k/m) P、Ṗ＝−√(k/m) Q となり、角速度に 1/2 は付かない。",
      "イ": "P＝mQ̇/Γ² で、Γ⁴＝mk とすれば H＝√(k/m)(P²＋Q²)/2 になる。問題の H＝E に従って E を全エネルギーと読むと、半径は (4mE²/k)^(1/4)、角速度は √(k/m) である。",
      "ウ": "円を得るには P² と Q² の係数を等しくするので、Γ⁴＝mk/2 では不足する。",
      "エ": "L の運動項 mQ̇²/(2Γ²) を Q̇ で微分すると 2 は残らず、P＝mQ̇/Γ² となる。",
      "オ": "角速度は正しいが、P の係数も Γ の条件も誤っていて、示された半径は導けない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 71。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q072",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 72,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "円管内の粘性流",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "半径 a の十分長い円筒形パイプの中で、非圧縮性ニュートン流体が定常流をなしている。図のように、パイプの中心軸を z 軸とし、中心軸からの距離を r とする。流体の粘性係数を μ、z 軸方向の速度成分を v(r)、圧力を P(z) とすると、ナビエ–ストークス方程式は\nμ(d²/dr²＋(1/r)d/dr)v＝dP/dz＝定数\nとなる。v(a)＝0 のとき、v(0) として最も妥当なのはどれか。ただし、流体にはたらく重力の影響は無視できるものとする。",
    "choices": {
      "ア": "−[a²/(2μ)]dP/dz",
      "イ": "−[a²/(4μ)]dP/dz",
      "ウ": "[a²/(4μ)]dP/dz",
      "エ": "[a²/(2μ)]dP/dz",
      "オ": "(a²/μ)dP/dz"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "方程式を積分し r＝0 で有限であることを使うと、v(r)＝[r²/(4μ)]dP/dz＋定数を得る。管壁で v(a)＝0 を課すと、この定数が v(0) になる。",
    "choiceExplanations": {
      "ア": "r² に作用する二階微分項と (1/r)d/dr 項は各2を与え、係数の分母は2ではなく4になる。",
      "イ": "方程式を積分し r＝0 で有限であることを使うと、v(r)＝[r²/(4μ)]dP/dz＋定数を得る。管壁で v(a)＝0 を課すと、この定数が v(0) になる。",
      "ウ": "圧力が下流に向けて低下すると dP/dz＜0 だが、この式では流速が負になる。",
      "エ": "この式は圧力勾配に対する符号が逆であり、解の分母に現れる係数4も欠けている。",
      "オ": "管壁条件を用いると中心値の符号が dP/dz と逆になり、円筒座標の微分演算により係数 1/4 も付く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 72。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q072.webp"
    ],
    "imageAltTexts": [
      "半径 a の円管内における粘性流体の速度成分"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q073",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 73,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "気温減率のある大気の気圧",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "大気は、高度が上がるにつれて温度が下がることが知られている。鉛直上向きに z 軸正の向きをとり、地表を高度 z＝0、地表の温度を T₀、γ（＞0）を定数とすると、高度 z における温度 T(z) は T(z)＝T₀−γz と表すことができる。また、高度 z における圧力 P(z) について釣り合いの式 P(z＋dz)＋ρ(z)g dz＝P(z) が成り立つ。大気を理想気体とみなし、高度 z と z＋dz の間の微小区間において、1モル当たりの理想気体の状態方程式 P(z)V(z)＝RT(z) が成り立つとしたとき、P(z) として最も妥当なのはどれか。\nただし、大気の密度を ρ(z)、体積を V(z)、気体定数を R、地表の圧力を P₀、大気1モル当たりの質量を M とする。また、重力加速度の大きさを g とし、g は高度 z によらず一定とする。",
    "choices": {
      "ア": "P₀[(T₀−γz)/T₀]^(Mg/(Rγ))",
      "イ": "P₀[(T₀−γz)/T₀]^(Rγ/(Mg))",
      "ウ": "P₀[T₀/(T₀−γz)]^(Mg/(Rγ))",
      "エ": "P₀ exp[−Mgγz/(RT)]",
      "オ": "P₀ exp[−Mgz/(γRT)]"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "ρ＝M/V＝MP/(RT) なので d log P/dz＝−Mg/[R(T₀−γz)] となる。積分すると log(P/P₀)＝[Mg/(Rγ)]log[(T₀−γz)/T₀] を得る。",
    "choiceExplanations": {
      "ア": "ρ＝M/V＝MP/(RT) なので d log P/dz＝−Mg/[R(T₀−γz)] となる。積分すると log(P/P₀)＝[Mg/(Rγ)]log[(T₀−γz)/T₀] を得る。",
      "イ": "圧力の対数を微分すると −Rγ²/[Mg(T₀−γz)] となり、静水圧式が求める係数と異なる。",
      "ウ": "気温が低下すると T₀/(T₀−γz) は増加するため、この式では高度とともに気圧が上がってしまう。",
      "エ": "温度が高度で変わる場合は 1/T(z) を積分する必要があり、指数に γz を直接入れる式にはならない。",
      "オ": "等温で得られる指数型には γ の因子がなく、この設問の温度分布では積分結果は対数になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 73。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q074",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 74,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "理想気体の等積加熱",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "軽くて摩擦のないピストンを備えた容器に理想気体が閉じ込められている。図のように、この気体の圧力 P と絶対温度 T が過程㋐〜㋓を経て、A→B→C→D→A と変化したとき、気体が外部に仕事をせず、気体の内部エネルギーが増加した過程のみを全て挙げているのはどれか。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋐、㋑、㋒",
      "エ": "㋑",
      "オ": "㋑、㋓"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "理想気体では体積が T/P に比例し、㋐は原点を通る直線上にあるので体積一定である。温度は上昇するため内部エネルギーが増える。",
    "choiceExplanations": {
      "ア": "理想気体では体積が T/P に比例し、㋐は原点を通る直線上にあるので体積一定である。温度は上昇するため内部エネルギーが増える。",
      "イ": "㋑では圧力一定で温度が上がり、体積膨張による仕事をする。",
      "ウ": "㋒では温度一定のため、理想気体の内部エネルギーは変化しない。",
      "エ": "㋑は定圧膨張で気体が正の仕事をするため、仕事ゼロの条件を満たさない。",
      "オ": "㋓は温度が下がる定圧圧縮であり、内部エネルギーの増加条件を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 74。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q074.webp"
    ],
    "imageAltTexts": [
      "圧力と温度を座標とする理想気体の四過程"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q075",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 75,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "二準位系の熱平衡",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "2準位系の平均エネルギーに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「0 又は ε（＞0）の二つのエネルギー状態をもち、ボルツマン統計に従う N 個の独立な粒子から成る系を考える。この系が温度 T の熱平衡状態にあるとき、この系の平均エネルギーは［㋐］である。また、エネルギー状態が ε である粒子の数が N/2 個より多くなる反転分布を作り出すことができ、その状態を表すためには仮想的に［㋑］と考えればよい。ただし、ボルツマン定数を kᵦ とし、β＝1/(kᵦT) とする。」",
    "choices": {
      "ア": "Nε/[1＋e^(−βε)]／β＜0",
      "イ": "Nε/[1＋e^(−βε)]／β＞0",
      "ウ": "Nε/[1＋e^(βε)]／β＜0",
      "エ": "Nε/[1＋e^(βε)]／β＞0",
      "オ": "Nε/[1＋e^(βε)]／β＝0"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "励起準位の確率は e^(−βε)/[1＋e^(−βε)]＝1/[1＋e^(βε)] なので、Nε を掛けると全体の平均エネルギーとなる。励起準位の確率が1/2を超えるには e^(βε)＜1、すなわち β＜0 が必要である。",
    "choiceExplanations": {
      "ア": "反転分布の符号は合っているが、示された平均値は β＞0 で励起準位の占有率を1/2より大きくしてしまう。",
      "イ": "正温度のボルツマン分布では励起準位が基底準位より少なく、この選択肢は平均エネルギーの式も指数の符号が逆である。",
      "ウ": "励起準位の確率は e^(−βε)/[1＋e^(−βε)]＝1/[1＋e^(βε)] なので、Nε を掛けると全体の平均エネルギーとなる。励起準位の確率が1/2を超えるには e^(βε)＜1、すなわち β＜0 が必要である。",
      "エ": "平均値の式は正しいが、β＞0 では e^(βε)＞1 となり励起準位は半数未満になる。",
      "オ": "β＝0 で二つの準位はちょうど等確率になり、反転分布にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 75。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q076",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 76,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "球面波と単スリット回折",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "3次元空間で真空中を伝わる電磁波に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「光速を c とし、原点からの距離を r とすると、原点から球面状に伝わる電磁波の波動方程式は ∂²u(t,r)/∂t²＝c²(∂²/∂r²＋(2/r)∂/∂r)u(t,r) で与えられる。u(t,r) は電磁波の電場の成分であり、原点から外向きに伝わる電磁波の解は、定数を A、波長を λ、虚数単位を i とすると、u(t,r)＝［㋐］となる。\nいま、図のように、直交座標系 (x,y,z) をとり、x＝0 平面に衝立があり、z＝0 に z 方向の厚みの無視できるスリットが −d/2≦y≦d/2 で開いている。x 軸正の向きに x＝−∞ から x＝0 に向けて波長 λ の平面波を入射し、スリットを通過させた。\nx＞0 の x 軸に近い領域では、電磁波の電場はスリットの各点から出た球面波の重ね合わせで求まると仮定することができ、原点から十分遠方の点 (x,y,0) における電場の成分は近似的に u(t,x,y,0)〜［㋑］となる。ただし、r＝√(x²＋y²) とし、d²/(λr)≪1 と近似した。また、B は定数である。」",
    "choices": {
      "ア": "(A/r²)e^[i(2π/λ)(r−ct)] ／ [B/(yr)]cos[πdy/(λr)]e^[i(2π/λ)(r−ct)]",
      "イ": "(A/r²)e^[i(2π/λ)(r−ct)] ／ [B/(yr)]sin[πdy/(λr)]e^[i(2π/λ)(r−ct)]",
      "ウ": "(A/r)e^[i(2π/λ)(r−ct)] ／ (B/y)cos[πdy/(λr)]e^[i(2π/λ)(r−ct)]",
      "エ": "(A/r)e^[i(2π/λ)(r−ct)] ／ (B/y)sin[πdy/(λr)]e^[i(2π/λ)(r−ct)]",
      "オ": "(A/r)e^[i(2π/λ)(r−ct)] ／ (B/y)cos[2πdy/(λr)]e^[i(2π/λ)(r−ct)]"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "ru は一次元波動方程式を満たすので、外に伝わる電場は e^[i(2π/λ)(r−ct)]/r に比例する。開口位置 y′ による位相差を −2πyy′/(λr) として対称な区間で積分すると、遠方の振幅因子は sin[πdy/(λr)]/y に比例する。",
    "choiceExplanations": {
      "ア": "球面波の振幅は 1/r であり、1/r² に比例するのは強度である。さらに cos を y で割った形は軸上で発散する。",
      "イ": "開口にわたる積分は正弦を生むが、球面波の方程式を ru に直すと、電場の減衰は 1/r と分かる。",
      "ウ": "球面波の因子は正しいが、y＝0 で各開口の寄与は同位相で有限であり、cos を y で割った形は不適切である。",
      "エ": "ru は一次元波動方程式を満たすので、外に伝わる電場は e^[i(2π/λ)(r−ct)]/r に比例する。開口位置 y′ による位相差を −2πyy′/(λr) として対称な区間で積分すると、遠方の振幅因子は sin[πdy/(λr)]/y に比例する。",
      "オ": "遠方の振幅は開口の両端からの複素指数関数の差を積分して得られ、cos の形では軸上の有限な値を表せない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 76。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q076.webp"
    ],
    "imageAltTexts": [
      "平面波が単スリットを通り観測点へ伝わる配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q078",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 78,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "相対論的なサイクロトロン半径",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "直交座標系 (x,y,z) において、静止質量 m、電荷 q の荷電粒子が、一様な磁束密度 B＝(0,0,B) の中でローレンツ力のみを受けて、xy 平面内で円運動している。荷電粒子の速度を v、運動量を p とすると、運動方程式は dp/dt＝qv×B、p＝mv/√(1−v²/c²) となる。ここで、c は光速であり、v＝|v| である。荷電粒子の円運動の半径として最も妥当なのはどれか。\nただし、p＝|p| であり、重力の影響は無視できるものとする。式中の v、p、B は文脈によりベクトルまたはその成分・大きさを表す。",
    "choices": {
      "ア": "[p/(qB)]/[1−v²/c²]",
      "イ": "[p/(qB)]/√(1−v²/c²)",
      "ウ": "p/(qB)",
      "エ": "[p/(qB)]√(1−v²/c²)",
      "オ": "[p/(qB)](1−v²/c²)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "円軌道では運動量の向きだけが回転するので |dp/dt|＝pv/r であり、磁気力の大きさ |qB|v と等しい。選択肢は qB を正の量として書いており、符号付きの積なら半径は p/|qB| となる。",
    "choiceExplanations": {
      "ア": "p に既に相対論的な補正が含まれているため、半径にさらに 1/(1−v²/c²) を掛けない。",
      "イ": "運動量を静止質量から求めるときに平方根の逆数が現れ、運動量 p を使った半径式には別途現れない。",
      "ウ": "円軌道では運動量の向きだけが回転するので |dp/dt|＝pv/r であり、磁気力の大きさ |qB|v と等しい。選択肢は qB を正の量として書いており、符号付きの積なら半径は p/|qB| となる。",
      "エ": "p√(1−v²/c²) は mv に戻った量なので、この式は相対論的運動量による半径の増加を失っている。",
      "オ": "磁気力とのつり合いは p と v の積を用い、v は両辺から消えるので、追加の因子 1−v²/c² は残らない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 78。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q079",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 79,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "磁場のベクトルポテンシャル",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "直交座標系 (x,y,z) において、一様な磁束密度 B＝(0,0,B) に対応するベクトルポテンシャルとして、次の㋐〜㋕のうち、妥当なもののみを挙げているのはどれか。\n㋐ (Bx,0,0)　㋑ (0,Bx,0)　㋒ (0,0,Bx)\n㋓ (Bz/2,0,−Bx/2)　㋔ (0,−Bz/2,Bx/2)　㋕ (−By/2,Bx/2,0)",
    "choices": {
      "ア": "㋐、㋔",
      "イ": "㋑、㋓",
      "ウ": "㋑、㋕",
      "エ": "㋒、㋓",
      "オ": "㋒、㋕"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "㋑では ∂Aᵧ/∂x＝B だけが寄与し、㋕では ∂Aᵧ/∂x−∂Aₓ/∂y＝B/2−(−B/2) となる。両者とも回転の他の成分は零である。",
    "choiceExplanations": {
      "ア": "㋐は x 成分のみが x に依存して回転が零であり、㋔の回転には x および y 成分がある。",
      "イ": "㋑の回転は (0,0,B) だが、㋓の回転は (0,B,0) となる。",
      "ウ": "㋑では ∂Aᵧ/∂x＝B だけが寄与し、㋕では ∂Aᵧ/∂x−∂Aₓ/∂y＝B/2−(−B/2) となる。両者とも回転の他の成分は零である。",
      "エ": "㋒の回転は (0,−B,0)、㋓の回転は (0,B,0) であり、いずれも z 方向を向かない。",
      "オ": "㋕は正しいが、㋒は ∂A_z/∂x＝B によって y 方向の磁場を生む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 79。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q080",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 80,
    "type": "multiple-choice",
    "category": "古典物理学",
    "topicTags": [
      "振動電場と周期平均エネルギー",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "荷電粒子の運動と運動エネルギーに関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「真空中において、質量 m、電荷 −e（e＞0）の静止している自由電子に、E(t)＝E₀ cos ωt で表される時間 t で変化する振動電場が照射された。ここで、E₀ は定数であり、ω は振動の角周波数である。このとき電子には振動運動が誘起され、その振幅は［㋐］である。また、1周期当たりの電子の平均運動エネルギーは［㋑］で表される。」",
    "choices": {
      "ア": "eE₀/(mω)／e²E₀²/(2mω)",
      "イ": "eE₀/(mω)／e²E₀²/(4mω)",
      "ウ": "eE₀/(mω²)／e²E₀²/(2mω²)",
      "エ": "eE₀/(mω²)／e²E₀²/(4mω²)",
      "オ": "eE₀/(mω²)／e²E₀²/(8mω²)"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "加速度を積分すると速度は −eE₀ sin ωt/(mω) となり、さらに積分すると変位の振幅は eE₀/(mω²) になる。速度の二乗の周期平均は振幅の二乗の半分なので、運動エネルギーの平均は e²E₀²/(4mω²) である。",
    "choiceExplanations": {
      "ア": "eE₀/(mω) は速度の振幅であり、変位の振幅にはさらに 1/ω が必要になる。",
      "イ": "速度を二乗するため、平均エネルギーの分母には ω が二乗で現れる。",
      "ウ": "変位の振幅は正しいが、平均エネルギーを求めるには最大値に sin² の平均 1/2 を掛ける。",
      "エ": "加速度を積分すると速度は −eE₀ sin ωt/(mω) となり、さらに積分すると変位の振幅は eE₀/(mω²) になる。速度の二乗の周期平均は振幅の二乗の半分なので、運動エネルギーの平均は e²E₀²/(4mω²) である。",
      "オ": "変位の振幅は正しいが、速度二乗の周期平均に使う係数は 1/2 だけであり、さらに半分にはしない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 80。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q081",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 81,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "量子調和振動子の古典的禁制領域",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "1次元空間の調和振動子ポテンシャル中を運動する質量 m の粒子のハミルトニアンは H＝p²/(2m)＋mω²x²/2 で与えられる。ω は角振動数、x は粒子の位置座標であり、p は運動量である。粒子は量子論的な基底状態にあるとする。古典力学で許される範囲の外に粒子が見いだされる確率 P として最も妥当なのはどれか。\nただし、C＝∫[1〜∞] e^(−y²)dy とする。なお、必要に応じて、a＞0 に対して成り立つ次の公式を用いてもよい。\n∫[−∞〜∞] e^(−ax²)dx＝√(π/a)",
    "choices": {
      "ア": "C/√π",
      "イ": "C",
      "ウ": "2C/√π",
      "エ": "2C",
      "オ": "4C/√π"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "E₀＝ℏω/2 とポテンシャルが等しい転回点は x＝±√(ℏ/(mω)) である。y＝x√(mω/ℏ) とすると確率密度は e^(−y²)/√π になり、|y|＞1 の積分は 2C/√π となる。",
    "choiceExplanations": {
      "ア": "これは規格化したガウス分布の一方の裾の確率であり、反対側の裾も足す必要がある。",
      "イ": "C には分布を全空間で規格化する係数 1/√π と両側を数える係数2が入っていない。",
      "ウ": "E₀＝ℏω/2 とポテンシャルが等しい転回点は x＝±√(ℏ/(mω)) である。y＝x√(mω/ℏ) とすると確率密度は e^(−y²)/√π になり、|y|＞1 の積分は 2C/√π となる。",
      "エ": "二つの裾を加える係数は正しいが、ガウス積分の規格化のため √π で割る必要がある。",
      "オ": "C はすでに転回点1から無限遠までの片側の積分であり、左右の二領域を合わせる因子は4でなく2である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 81。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q082",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 82,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "シュテルン–ゲルラッハ実験",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "次の実験の解釈に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n真空中において、下図のように、中性の銀原子ビームを不均一な磁場の中に入射すると、後方のスクリーン上の2か所に集まって銀原子が付着した。なお、銀の原子番号は47であり、最外殻軌道は s 軌道となる。\n㋐ 銀原子の最外殻電子の軌道角運動量に起因する磁気モーメントのため、銀原子は磁場によって上又は下向きの力を受ける。\n㋑ 銀原子の最外殻電子のスピンに起因する磁気モーメントのため、銀原子は磁場によって上又は下向きの力を受ける。\n㋒ 銀原子の最外殻電子のスピン状態は2種類である。\n㋓ 銀原子の最外殻電子の軌道角運動量の磁気量子数は2個である。",
    "choices": {
      "ア": "㋐、㋒",
      "イ": "㋐、㋓",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "銀の最外殻の不対電子は s 軌道にあるため、分裂に関与する磁気モーメントはスピンに由来する。スピンの磁場方向への射影は二通りある。",
    "choiceExplanations": {
      "ア": "スピン状態が2種類である点は正しいが、s 軌道の軌道角運動量は零である。",
      "イ": "最外殻の s 軌道では軌道角運動量量子数 l＝0 で、軌道磁気量子数 mₗ は0の一つしかない。",
      "ウ": "銀の最外殻の不対電子は s 軌道にあるため、分裂に関与する磁気モーメントはスピンに由来する。スピンの磁場方向への射影は二通りある。",
      "エ": "スピンに起因する力は正しいが、軌道磁気量子数は mₗ＝0 の一つだけである。",
      "オ": "観測された二方向は軌道の磁気量子数ではなく、スピンの射影 ±1/2 に対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 82。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q082.webp"
    ],
    "imageAltTexts": [
      "不均一磁場で銀原子ビームが二つに分かれる実験配置"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q083",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 83,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "二準位ハミルトニアンの摂動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ハミルトニアンの行列が、次のように表されている。エネルギー固有値の近似値として妥当なもののみを挙げているのはどれか。ただし、ε₁、ε₂ は実数、α は複素数とし、また、ε₁−ε₂≫|α| とする。\n行列の第1行は (ε₁, α)、第2行は (α*, ε₂)。",
    "choices": {
      "ア": "ε₁＋｜α｜/(ε₁−ε₂)、ε₂−｜α｜/(ε₁−ε₂)",
      "イ": "ε₁＋｜α｜/(ε₁−ε₂)、ε₂＋｜α｜/(ε₁−ε₂)",
      "ウ": "ε₁＋｜α｜²/(ε₁−ε₂)、ε₂−｜α｜²/(ε₁−ε₂)",
      "エ": "ε₁＋｜α｜²/(ε₁−ε₂)、ε₂＋｜α｜²/(ε₁−ε₂)",
      "オ": "ε₁＋2｜α｜²/(ε₁−ε₂)、ε₂−2｜α｜²/(ε₁−ε₂)"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Δ＝ε₁−ε₂ とすると、固有値の差は √(Δ²＋4|α|²) である。これを2次まで展開すると Δ＋2|α|²/Δ になり、各固有値はこの差の変化の半分ずつ逆方向にずれる。",
    "choiceExplanations": {
      "ア": "行列式に非対角成分が入る形は αα*＝|α|² で、|α| の一次項はない。",
      "イ": "補正を両方に加えると、固有値の和がトレース ε₁＋ε₂ からずれる。",
      "ウ": "Δ＝ε₁−ε₂ とすると、固有値の差は √(Δ²＋4|α|²) である。これを2次まで展開すると Δ＋2|α|²/Δ になり、各固有値はこの差の変化の半分ずつ逆方向にずれる。",
      "エ": "非対角成分はトレースを変えないので、上の準位が上がった分だけ下の準位が下がる。",
      "オ": "固有値差の補正は 2|α|²/Δ だが、個別の固有値の補正はその半分である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 83。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q084",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 84,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "不確定性関係と水素原子の安定性",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "不確定性原理の水素原子への応用に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「水素原子中の電子がクーロン引力によって陽子の位置に落ち込まず、距離を保って安定に存在する理由について不確定性原理を用いて考える。陽子は電子に比べて十分重いので、静止しているとみなす。電子の質量を m、電荷を −e（e＞0）、真空の誘電率を ε₀ とする。電子は運動量 Δp で陽子の周りの半径 Δr 程度の空間を運動しているとすると、系の全エネルギー E は E＝Δp²/(2m)−e²/(4πε₀Δr) と書ける。ここで、不確定性関係 ΔrΔp≧ℏ/2 を適用すると、Δr＝［㋐］のときに、全系のエネルギーが［㋑］となり最小値を取ることが示される。電子は電磁波を放出して、できるだけ低いエネルギー状態になろうとするが、不確定性関係のため、電子の軌道半径は Δr＝［㋐］より小さくなることができない。」",
    "choices": {
      "ア": "πε₀ℏ²/(me²)／−me⁴/(4π²ε₀²ℏ²)",
      "イ": "πε₀ℏ²/(me²)／−me⁴/(8π²ε₀²ℏ²)",
      "ウ": "πε₀ℏ²/(me²)／−me⁴/(32π²ε₀²ℏ²)",
      "エ": "4πε₀ℏ²/(me²)／−me⁴/(8π²ε₀²ℏ²)",
      "オ": "4πε₀ℏ²/(me²)／−me⁴/(32π²ε₀²ℏ²)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "固定した r＝Δr で Δp＝ℏ/(2r) とすると下限は A/r²−B/r となり、A＝ℏ²/(8m)、B＝e²/(4πε₀) である。最小点 r＝2A/B と最小値 −B²/(4A) がこの組合せに一致する。",
    "choiceExplanations": {
      "ア": "最小点では引力による位置エネルギーの絶対値の半分が運動エネルギーであり、両者の和はこの選択肢の半分の大きさになる。",
      "イ": "固定した r＝Δr で Δp＝ℏ/(2r) とすると下限は A/r²−B/r となり、A＝ℏ²/(8m)、B＝e²/(4πε₀) である。最小点 r＝2A/B と最小値 −B²/(4A) がこの組合せに一致する。",
      "ウ": "r は合っているが、Δp＝ℏ/(2r) を代入したエネルギーの最小値はこの4倍の絶対値になる。",
      "エ": "この r は求めた最小点の4倍で、A/r²−B/r の微分はそこで零にならない。",
      "オ": "ΔrΔp の下限に ℏ/2 を用いる設問の見積もりでは、半径もエネルギーもこの値にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 84。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q085",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 85,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "励起準位の自然幅",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "基底状態 g と励起状態 e から成る2準位系を考える。二つの状態のエネルギー差は E₀ である。基底状態にあった系が時刻 t＝0 で外場との相互作用で励起状態 e に遷移した。その後、励起状態 e は寿命 τ で基底状態 g に緩和した。この場合の励起状態 e の波動関数は時間の関数であり、a₀ を係数として ψ(t)＝a₀ exp(−iE₀t/ℏ−t/τ) と表される。エネルギーの関数として表した励起状態 e の分布確率 Ψ*(E)Ψ(E) の係数を除いた表式として最も妥当なのは次のうちではどれか。\nただし、Ψ(E)＝∫[−∞〜∞]ψ(t) exp(iEt/ℏ)dt＝∫[0〜∞]ψ(t) exp(iEt/ℏ)dt は ψ(t) のフーリエ変換、Ψ*(E) はその複素共役、i は虚数単位である。",
    "choices": {
      "ア": "1/[(E−E₀)²−(ℏ/τ)²]",
      "イ": "1/[(E−E₀)²＋(ℏ/τ)²]",
      "ウ": "1/[(E−E₀)²＋(τ/ℏ)²]",
      "エ": "exp[−((E−E₀)/(ℏ/τ))²]",
      "オ": "exp[−((E−E₀)/(τ/ℏ))²]"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "積分の結果は a₀/[1/τ−i(E−E₀)/ℏ] である。絶対値の二乗から定数因子を除くと、分母は (E−E₀)²＋(ℏ/τ)² となる。",
    "choiceExplanations": {
      "ア": "複素共役との積では実部・虚部の二乗が加算される。この式は E＝E₀ で負にもなり、確率の形として不適切である。",
      "イ": "積分の結果は a₀/[1/τ−i(E−E₀)/ℏ] である。絶対値の二乗から定数因子を除くと、分母は (E−E₀)²＋(ℏ/τ)² となる。",
      "ウ": "エネルギー幅にはエネルギーの単位が必要であり、τ/ℏ はその逆の単位をもつ。",
      "エ": "時間に関して片側の指数減衰を変換するとローレンツ型になり、エネルギーでのガウス型は得られない。",
      "オ": "時間波形がガウス関数ではなく指数関数なので、変換後の分布はこの式にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 85。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q086",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 86,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "金属と半導体の電子状態",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "金属と半導体、絶縁体に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「真性半導体では、冷却すると電気抵抗率が増加するが、多くの金属では減少する。それは、［㋐］がバンドギャップ中に位置するのかバンド内に位置するのかの違いに起因する。\n金、銀、銅など多くの金属は金属光沢をもち不透明である一方、ガラスやダイヤモンドなど透明な物質の多くは絶縁体である。この違いは、小さいエネルギーの光でも［㋑］を励起して光を吸収・反射できるかどうかの違いに起因する。\n一般に、金属は半導体・絶縁体より熱伝導率が高い。それは、［㋒］だけでなく伝導電子も熱を運ぶからである。」",
    "choices": {
      "ア": "欠陥準位／格子振動／イオン",
      "イ": "欠陥準位／電子／格子振動",
      "ウ": "欠陥準位／電子／イオン",
      "エ": "フェルミ準位／格子振動／イオン",
      "オ": "フェルミ準位／電子／格子振動"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "真性半導体ではフェルミ準位がバンドギャップ内にあり、金属では電子が低エネルギーの光でも応答する。金属では格子振動に加えて伝導電子が熱伝導に寄与する。",
    "choiceExplanations": {
      "ア": "真性半導体の抵抗の温度変化は主にバンド間の熱励起で決まり、欠陥準位の存在を前提としない。",
      "イ": "光との相互作用と熱伝導の説明は合うが、バンド内かギャップ内かを比較するのはフェルミ準位である。",
      "ウ": "金属が光を吸収・反射する際に電子が関与する点は合っているが、格子が担う熱の輸送は主として格子振動による。",
      "エ": "フェルミ準位は正しいが、光に応答するのは電子であり、熱は伝導電子と格子振動が運ぶ。",
      "オ": "真性半導体ではフェルミ準位がバンドギャップ内にあり、金属では電子が低エネルギーの光でも応答する。金属では格子振動に加えて伝導電子が熱伝導に寄与する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 86。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q087",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 87,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "一次元結晶の逆格子",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "結晶の逆格子に関する次の記述の㋐、㋑に当てはまるものの組合せとして最も妥当なのはどれか。\n「図Ⅰに示すように、原子間隔 a で同じ種類の原子が無限に並ぶ1次元結晶格子を考える。この結晶の1次元逆格子空間での逆格子点の間隔は［㋐］である。図Ⅰの結晶の原子間隔の1/3の位置に、同じ種類の原子を1個挿入してできた、図Ⅱに示すような1次元結晶の逆格子点間隔は［㋑］となる。」",
    "choices": {
      "ア": "π/a／π/a",
      "イ": "π/a／2π/a",
      "ウ": "π/a／3π/a",
      "エ": "2π/a／2π/a",
      "オ": "2π/a／3π/a"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "図Ⅱには間隔 a/3 と 2a/3 が交互に現れるため、並進して同じ並びになる最小距離はどちらも a である。exp(iGa)＝1 から逆格子点間隔は両方とも 2π/a になる。",
    "choiceExplanations": {
      "ア": "実格子を a だけ移動したとき位相の増分は 2π の整数倍であるため、逆格子の最小間隔は π/a ではない。",
      "イ": "図Ⅱの間隔は正しいが、単純な図Ⅰでも周期 a に対応する逆格子間隔は 2π/a になる。",
      "ウ": "最初の位相周期は π ではなく 2π であり、挿入原子によって図Ⅱの並進周期が変わることもない。",
      "エ": "図Ⅱには間隔 a/3 と 2a/3 が交互に現れるため、並進して同じ並びになる最小距離はどちらも a である。exp(iGa)＝1 から逆格子点間隔は両方とも 2π/a になる。",
      "オ": "図Ⅱで a/3 だけ動かすと全原子が再び原子位置に重なるわけではなく、実格子の周期は a のままである。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 87。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q087.webp"
    ],
    "imageAltTexts": [
      "図Ⅰの等間隔格子と図Ⅱの原子挿入後の一次元結晶"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q088",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 88,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "第二種超伝導体の上部臨界磁場",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "超伝導には、磁場が表面からどれくらいの深さまで侵入するかの指標であるロンドン磁場侵入長 λ と、超伝導電子対の大きさの程度を表すコヒーレンス長 ξ という二つの特徴的な長さがある。磁場を印加したとき、第2種超伝導体の超伝導状態が完全に消失する上部臨界磁場を表す式として最も妥当なのはどれか。\nただし、Φ₀ は磁束量子である。",
    "choices": {
      "ア": "Φ₀/(πλ²)",
      "イ": "Φ₀/(πλξ)",
      "ウ": "Φ₀/(πξ²)",
      "エ": "πλ²/Φ₀",
      "オ": "πξ²/Φ₀"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "渦糸芯の広さはコヒーレンス長の二乗に比例し、上部臨界の磁束密度は Φ₀/ξ² に比例する。Ginzburg–Landau 理論では Bc₂＝Φ₀/(2πξ²) であり、選択肢では比例関係と次元が合うこの式が最も妥当である。",
    "choiceExplanations": {
      "ア": "侵入長 λ は磁場の遮蔽を表す長さで、超伝導を壊す渦糸芯の重なりを決める尺度は ξ である。",
      "イ": "二つの長さを混ぜた面積は磁束密度の次元を与えるが、上部臨界磁場を決める尺度は ξ² である。",
      "ウ": "渦糸芯の広さはコヒーレンス長の二乗に比例し、上部臨界の磁束密度は Φ₀/ξ² に比例する。Ginzburg–Landau 理論では Bc₂＝Φ₀/(2πξ²) であり、選択肢では比例関係と次元が合うこの式が最も妥当である。",
      "エ": "面積を磁束で割っているため磁束密度の逆数の次元であり、上部臨界を表さない。",
      "オ": "ξ が現れる点は合っているが、磁束量子を面積で割る向きが逆である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 88。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q089",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 89,
    "type": "multiple-choice",
    "category": "現代物理学",
    "topicTags": [
      "ダイヤモンドの sp³ 混成",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ダイヤモンドにおける共有結合を考える。炭素原子の 2s 軌道の電子の波動関数を χ(s)、2p 軌道の電子の波動関数を χ(p_x)、χ(p_y)、χ(p_z) とする。これらの波動関数はそれぞれ規格化されているものとする。これら四つの軌道からつくられる sp³ 混成軌道の一つを表す波動関数として最も妥当なのはどれか。\nただし、選択肢の波動関数は、規格化されていない。",
    "choices": {
      "ア": "χ(s)＋χ(p_x)＋χ(p_y)＋χ(p_z)",
      "イ": "√2 χ(s)＋χ(p_x)＋χ(p_y)＋χ(p_z)",
      "ウ": "χ(s)＋√2 χ(p_x)＋χ(p_y)＋χ(p_z)",
      "エ": "χ(s)＋√2 χ(p_x)＋√2 χ(p_y)＋χ(p_z)",
      "オ": "χ(s)＋√2 χ(p_x)＋√2 χ(p_y)＋√2 χ(p_z)"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "正四面体の一つの方向 (1,1,1) へ向く混成軌道は、四つの原子軌道が同じ絶対値の係数で加わる。全体を 1/2 倍すれば規格化される。",
    "choiceExplanations": {
      "ア": "正四面体の一つの方向 (1,1,1) へ向く混成軌道は、四つの原子軌道が同じ絶対値の係数で加わる。全体を 1/2 倍すれば規格化される。",
      "イ": "規格化したときの s 成分の重みは 2/5 で、sp³ 混成の 1/4 より大きい。",
      "ウ": "pₓ だけを強めると、p 成分の向きが (1,1,1) からずれ、s 成分の重みも 1/5 に下がる。",
      "エ": "pₓ と pᵧ を強めた和の s 成分の重みは 1/6 で、sp³ の混成比と一致しない。",
      "オ": "p 成分の方向は対称だが、s 成分の比例係数をこのままにすると規格化後の重みは 1/7 となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 89。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q090",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 90,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "竜巻の旋衡風と中心気圧",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "台風の風は、一般に気圧傾度力、コリオリ力、遠心力の三つの力が釣り合った状態である傾度風平衡と考えることができる。一方、竜巻の風は、台風の風よりはるかに空間、時間スケール共に小さいので、これらの三つの力のうち一つを無視することができ、残る二つの力が釣り合った状態である旋衡風平衡と考えることができる。\nいま、北緯45度で発生した竜巻を考える。竜巻は中心からの距離によらず、一定の角速度で回転している。半径50 mでの風速が70 m/s、地上気圧が1000 hPaであった時の竜巻の中心気圧として最も妥当なのはどれか。\nなお、必要に応じて、地上での空気密度を 1.2 kg/m³、地球の自転速度を 7.3×10⁻⁵ rad/s としてよい。",
    "choices": {
      "ア": "955 hPa",
      "イ": "960 hPa",
      "ウ": "965 hPa",
      "エ": "970 hPa",
      "オ": "975 hPa"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "コリオリ力を無視すると dp/dr＝ρv²/r であり、v＝Ωr なので半径 R までの積分は ρΩ²R²/2＝ρv(R)²/2 になる。1000 hPa から29.4 hPa を引くと970.6 hPa である。",
    "choiceExplanations": {
      "ア": "半径50 mでの気圧と中心の差は、固体回転を仮定すると45 hPaよりかなり小さい。",
      "イ": "外側での風速70 m/sを全ての半径で一定とすることはできず、風速は中心に向かって線形に小さくなる。",
      "ウ": "一定角速度として積分すると、気圧差は35 hPaより小さい約29.4 hPaとなる。",
      "エ": "コリオリ力を無視すると dp/dr＝ρv²/r であり、v＝Ωr なので半径 R までの積分は ρΩ²R²/2＝ρv(R)²/2 になる。1000 hPa から29.4 hPa を引くと970.6 hPa である。",
      "オ": "気圧差25 hPaは ρ(70 m/s)²/2＝2940 Pa より小さく、中心気圧を高く見積もっている。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 90。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q091",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 91,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "海洋の慣性振動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球上における海水の水平運動方程式は、摩擦、圧力の水平勾配及び平均流が存在しないとすると、次式のように表すことができる。\n∂u/∂t−fv＝0、∂v/∂t＋fu＝0\nここで、u、v はそれぞれ海水の速度の東向き及び北向き成分、f はコリオリ係数である。この水平運動方程式に基づいて、海水が運動すると仮定すると、その軌跡は円を描く。円運動の周期が17時間となる緯度として最も妥当なのはどれか。\nなお、必要に応じて、以下の数値を用いてよい。\nsin(25°)＝0.42、sin(35°)＝0.57、sin(40°)＝0.64",
    "choices": {
      "ア": "25度",
      "イ": "30度",
      "ウ": "35度",
      "エ": "40度",
      "オ": "45度"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "連立式から d²u/dt²＋f²u＝0 なので周期は 2π/|f| である。|f|＝2Ω|sin φ| と地球の自転周期約24時間より、|sin φ|＝12/17≃0.71 となる。",
    "choiceExplanations": {
      "ア": "25度での周期は地球の自転周期を使うと約 12/0.42＝28.6 時間である。",
      "イ": "30度では sin 30°＝1/2 なので、慣性周期は約24時間となる。",
      "ウ": "35度の正弦は0.57なので、周期は約21時間であり17時間を上回る。",
      "エ": "40度では周期が約18.8時間となり、17時間との差は45度の場合より大きい。",
      "オ": "連立式から d²u/dt²＋f²u＝0 なので周期は 2π/|f| である。|f|＝2Ω|sin φ| と地球の自転周期約24時間より、|sin φ|＝12/17≃0.71 となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 91。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q092",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 92,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "地表面の放射平衡温度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地表面温度が T で、上向きの正味放射量を Rn、下向きの大気放射量を L、ステファン・ボルツマン定数を σ とすると地表面における放射収支は、次式のように表すことができる。\nRn＝σT⁴−L\n夕方のある時刻での地表面温度が T₀ であったところ、夜間に気温が下がり、最低温度 T_min に達したとき、T_min として最も妥当なのはどれか。\nただし、大気放射量 L は夕方から夜間にかけて一定、地表面温度 T に対する黒体放射量は σT⁴、地中伝導熱はゼロであり、顕熱と潜熱は無視できるものとする。また、T₀ と T_min の差は十分小さいものとし、以下のテイラー展開による近似を用いてよい。\nf(x)＝x⁴−xₐ⁴≃4x³(x−xₐ)　（x≃xₐ）",
    "choices": {
      "ア": "3T₀/4−L/(4σT₀³)",
      "イ": "3T₀/4＋L/(4σT₀³)",
      "ウ": "T₀−L/(4σT₀³)",
      "エ": "T₀＋L/(4σT₀³)",
      "オ": "5T₀/4−L/(4σT₀³)"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "最低温度を夜間の放射平衡とみなすと σT_min⁴＝L である。T₀ の近くで展開すると L≃σ[T₀⁴＋4T₀³(T_min−T₀)] となり、これを解けばよい。",
    "choiceExplanations": {
      "ア": "下向き放射 L が増えると地表の平衡温度は上昇し、近似式での L の係数は正になる。",
      "イ": "最低温度を夜間の放射平衡とみなすと σT_min⁴＝L である。T₀ の近くで展開すると L≃σ[T₀⁴＋4T₀³(T_min−T₀)] となり、これを解けばよい。",
      "ウ": "近似するときは地表が既に T₀ で放射している σT₀⁴ を差し引く必要があり、変化量は −L だけでは決まらない。",
      "エ": "既に初期状態で放射が釣り合う L＝σT₀⁴ の場合でも、この式では T_min が T₀ より高くなってしまう。",
      "オ": "L が増えるほどこの選択肢の値は下がるが、放射だけで釣り合う温度 (L/σ)^(1/4) は上昇する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 92。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q093",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 93,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "凝結生成物と空気塊の浮力",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "空気塊に働く浮力に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「浮力は空気塊とその周囲の空気との間に密度差がある場合に生じ、空気塊が上昇すれば対流雲が形成される。液体や固体の凝結生成物を含んだ湿潤大気に対する鉛直方向の運動方程式は、次式のように表すことができる。\ndw/dt＝−(1/ρ)∂p′/∂z＋g(θ′/θ＋0.608qᵥ−qₗ−qᵢ)\nここで、w は鉛直速度、t は時間、ρ は密度、p′ は気圧の水平平均からの気圧のずれ、z は高度、g は重力加速度の大きさ、θ、θ′ はそれぞれ温位の水平平均とそれからの温位のずれ、qᵥ、qₗ、qᵢ はそれぞれ水蒸気、水滴、氷粒子の混合比を表す。水滴などの凝結生成物が蒸発すると気温は［㋐］し、［㋑］の浮力が生じる。θ が300 Kの場合、この式から1 Kの温位［㋐］によって生じる浮力は、凝結生成物およそ［㋒］g/kgによって生じる浮力に相当することが分かる。つまり、凝結生成物によって生じる浮力は積乱雲の中で［㋓］を起こす要因の一つである。」",
    "choices": {
      "ア": "低下／負／3／下降流",
      "イ": "低下／正／1/3／上昇流",
      "ウ": "低下／正／3／下降流",
      "エ": "上昇／負／1/3／上昇流",
      "オ": "上昇／正／1/3／下降流"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "蒸発には潜熱が必要で空気が冷え、温位偏差 θ′ が負になって負の浮力を与える。1/300≃0.0033 kg/kg は約3 g/kg の凝結物の負の浮力と同程度で、下降流につながる。",
    "choiceExplanations": {
      "ア": "蒸発には潜熱が必要で空気が冷え、温位偏差 θ′ が負になって負の浮力を与える。1/300≃0.0033 kg/kg は約3 g/kg の凝結物の負の浮力と同程度で、下降流につながる。",
      "イ": "温位低下なら θ′/θ は負になり、1/300 を g/kg に直すと約3.3であって 1/3 ではない。",
      "ウ": "約3 g/kg と下降流は妥当だが、蒸発冷却に対応する項の符号は負である。",
      "エ": "水滴の蒸発は周囲の空気から熱を奪うので気温を下げ、負の浮力は下降を促す。",
      "オ": "蒸発で気温が上昇するという説明が逆で、水滴や氷の荷重項は鉛直加速度を負の向きに変える。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 93。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q094",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 94,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "持ち上げ凝結高度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地上の空気の温度は304 K、露点温度は300 Kであった。このとき、地上の空気塊を持ち上げていったときに凝結の始まる高度として最も妥当なのはどれか。\nただし、地表付近の空気塊は混合比一定で上昇するとし、等混合比線に沿う温度変化は以下が成り立つものとする。\ndT_d/dz＝−gRᵥT_d/(R_d Lᵥ)\nここで、T_d は露点温度、z は高度、R_d、Rᵥ はそれぞれ乾燥空気と水蒸気の気体定数で、R_d/Rᵥ＝0.6、蒸発熱 Lᵥ＝2.5×10⁶ J/kg、重力加速度の大きさ g＝10 m/s² とする。\nなお、必要に応じて、気温を T、乾燥空気の定圧比熱を Cₚ＝1000 J/kg/K とする以下の乾燥断熱減率の関係式を用いてよい。\ndT/dz＝−g/Cₚ",
    "choices": {
      "ア": "500 m",
      "イ": "600 m",
      "ウ": "700 m",
      "エ": "800 m",
      "オ": "900 m"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "気温は約0.010 K/m、露点温度は地表付近で約0.002 K/m の割合で下がる。初めの差4 Kは約 4/(0.010−0.002)＝500 m で解消する。",
    "choiceExplanations": {
      "ア": "気温は約0.010 K/m、露点温度は地表付近で約0.002 K/m の割合で下がる。初めの差4 Kは約 4/(0.010−0.002)＝500 m で解消する。",
      "イ": "600 m まで乾燥断熱を適用すると気温は298 Kで、露点は約298.8 Kなので、その手前で既に一致している。",
      "ウ": "700 m と見積もるには温度と露点の差が約0.0057 K/m ずつ縮む必要があるが、実際の差の減少率は約0.008 K/m である。",
      "エ": "露点温度は800 mで約1.6 K低下するが、気温は同じ高さまでに8 K低下しており、飽和するにはその前で十分である。",
      "オ": "気温の冷却は露点温度の低下より大きく、初めの4 Kの差を埋めるのに900 mまでは要しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 94。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q095",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 95,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "等方弾性体の体積弾性率",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "微小変形近似が成り立つ範囲内において、等方弾性体についてのデカルト座標系 (x₁,x₂,x₃) での垂直応力 σᵢᵢ と垂直ひずみ εᵢᵢ の関係は、ラメ定数 λ、μ 及び体積ひずみ e＝ε₁₁＋ε₂₂＋ε₃₃ を用いて次のように与えられる。\nσ₁₁＝λe＋2με₁₁\nσ₂₂＝λe＋2με₂₂\nσ₃₃＝λe＋2με₃₃\nある弾性体に等方的な圧力 p＝σ₁₁＝σ₂₂＝σ₃₃ が作用したとき、p と e の関係は体積弾性率 K を用いて、p＝Ke と表される。λ と μ を用いて K を表したものとして最も妥当なのはどれか。",
    "choices": {
      "ア": "λ＋2μ",
      "イ": "(λ＋2μ)/3",
      "ウ": "3λ＋2μ",
      "エ": "(3λ＋2μ)/3",
      "オ": "(3λ＋5μ)/3"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "三つの式を足すと 3p＝3λe＋2μe となる。両辺を3で割ると、p に対する体積弾性率は λ＋2μ/3 である。",
    "choiceExplanations": {
      "ア": "等方的に変形する場合、各方向の垂直ひずみは e 全体ではなく e/3 になる。",
      "イ": "3で割る前の λ の係数は3であり、λ をそのまま3で割ることはできない。",
      "ウ": "三方向の応力を合計すると (3λ＋2μ)e だが、この合計は p ではなく 3p である。",
      "エ": "三つの式を足すと 3p＝3λe＋2μe となる。両辺を3で割ると、p に対する体積弾性率は λ＋2μ/3 である。",
      "オ": "μ の項は三方向のひずみの和 2μ(ε₁₁＋ε₂₂＋ε₃₃) であるため、5μ にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 95。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q096",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 96,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "大森公式と余震頻度",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "大きな地震の後には、多くの場合、その近くで引き続いて多数の地震（余震等）が発生する。余震の発生数は時間とともに、次式で表されるように減少することが知られている。\nn(t)＝K/(t＋c)\nここで、t は大地震発生からの経過時間、n(t) は経過時間 t における単位時間当たりのある大きさ以上の余震発生回数、K と c は定数である。\nいま、ある大地震について、その発生から1日経過した時点（t＝1）での余震の頻度が1日当たり176回、10日後（t＝10）の頻度が1日当たり32回であった。この大地震発生から1か月後（t＝31）の余震の頻度の予測値として最も妥当なのはどれか。",
    "choices": {
      "ア": "1日当たり1回",
      "イ": "1日当たり4回",
      "ウ": "1日当たり7回",
      "エ": "1日当たり11回",
      "オ": "1日当たり17回"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "176(1＋c)＝32(10＋c) から c＝1、K＝352 と定まる。したがって31日後は 352/(31＋1)＝11 回/日である。",
    "choiceExplanations": {
      "ア": "1回/日に近づくには、推定された K と c を使うと t が約351日まで進む必要がある。",
      "イ": "K＝352、c＝1 を使うと4回/日になるのは t＝87 であり、31日後ではない。",
      "ウ": "7回/日に相当する t は約49日なので、31日後を過小に見積もっている。",
      "エ": "176(1＋c)＝32(10＋c) から c＝1、K＝352 と定まる。したがって31日後は 352/(31＋1)＝11 回/日である。",
      "オ": "頻度17回/日は t が約20日の値に近く、31日後にはさらに下がる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 96。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q097",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 97,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "地球磁場での磁石の振動",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "細長い磁石を細い糸で水平につるし、地球磁場内で自由に回転振動させるとする。いま、磁石の平衡位置からのずれの角を φ とすれば、磁石の微小回転振動は次の運動方程式で表される。\nC d²φ/dt²＋MHφ＝0\nここで、M は磁石の磁気モーメント、H は地磁気の水平分力、C は磁石の慣性モーメント、t は時間である。また、磁石は長さ 2a の一様な細い棒であり、その質量が m であるとする。このとき、C＝ma²/3 である。m＝9 g、a＝10 cm、M＝1 A m²、H＝30000 nT とするとき、磁石の自由振動周期として最も妥当なのはどれか。",
    "choices": {
      "ア": "1 s",
      "イ": "2 s",
      "ウ": "3 s",
      "エ": "6 s",
      "オ": "10 s"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "SI単位で C＝0.009×0.1²/3＝3×10⁻⁵ kg m²、MH＝1×30000×10⁻⁹＝3×10⁻⁵ N m となる。したがって周期は 2π√(C/MH)＝2π s である。",
    "choiceExplanations": {
      "ア": "換算後の MH/C は約 1 s⁻² であるため、1 s は角振動数の逆数に近いが、一周期には角度 2π が必要である。",
      "イ": "周期2 s には角振動数約 π rad/s が必要だが、ここでの角振動数は1 rad/s である。",
      "ウ": "約3秒は半周期 π s に近く、一周期の値ではない。",
      "エ": "SI単位で C＝0.009×0.1²/3＝3×10⁻⁵ kg m²、MH＝1×30000×10⁻⁹＝3×10⁻⁵ N m となる。したがって周期は 2π√(C/MH)＝2π s である。",
      "オ": "10 s なら必要な MH/C は約0.39 s⁻² だが、与えられた値では 1 s⁻² になる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 97。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q098",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 98,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "球状天体の定常熱伝導",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "一様な媒質から成る球形の天体の熱伝導を考える。天体の中心からの距離 r における絶対温度 T が満たす熱伝導方程式は、次式のように表すことができる。\nk(d²T/dr²＋(2/r)dT/dr)＝−ρH\nここで、k は熱伝導率、ρ は密度、H は放射性物質による単位質量、単位時間当たりの発熱量である。これを積分することで、天体における温度分布が得られる。\n天体の中心の温度は有限であり、天体表面での熱流量 q＝−k dT/dr を 70×10⁻³ W m⁻²、天体表面の温度を300 Kとするとき、天体中心の温度として最も妥当なのはどれか。\nただし、k＝4 W m⁻¹ K⁻¹、天体の半径を6370 kmとする。",
    "choices": {
      "ア": "5.6×10³ K",
      "イ": "5.6×10⁴ K",
      "ウ": "2.2×10⁴ K",
      "エ": "5.6×10⁷ K",
      "オ": "2.2×10⁷ K"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "中心での有限性から dT/dr は r に比例し、表面 r＝R では −q/k になる。これを全半径で積分すると中心温度は 300＋qR/(2k)≃5.6×10⁴ K となる。",
    "choiceExplanations": {
      "ア": "6370 km は 6.37×10⁶ m であり、温度上昇は 0.070×6.37×10⁶/(2×4) K と計算する。",
      "イ": "中心での有限性から dT/dr は r に比例し、表面 r＝R では −q/k になる。これを全半径で積分すると中心温度は 300＋qR/(2k)≃5.6×10⁴ K となる。",
      "ウ": "温度勾配の大きさは中心の0から表面の q/k へ線形に増えるので、平均勾配は q/(2k) となり、この値より高い温度を得る。",
      "エ": "与えられた熱流量は 70 W/m² ではなく 0.070 W/m² であり、換算を省くと温度差が1000倍になる。",
      "オ": "表面での温度勾配はわずか 0.0175 K/m で、線形な勾配を半径全体で積分しても数千万 K にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 98。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q099",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 99,
    "type": "multiple-choice",
    "category": "地球物理学",
    "topicTags": [
      "平板近似の重力異常",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図のように半径 R、鉛直方向の厚さ h で、一様な密度 ρ をもつ円筒形の台地（地形の高まり）がある。h に対して R が十分大きいとき、この円筒形台地全体の質量による台地表面の中心点 O における重力異常を、近似的に表すものとして最も妥当なのはどれか。\nただし、万有引力定数を G とする。\nなお、地球外部のある点において、地球内部の微小質量 dm との間に働く引力による微小な引力加速度の大きさ dgₘ は、その点と微小質量 dm との距離を b として、次のように表される。\ndgₘ＝G dm/b²",
    "choices": {
      "ア": "πρGh",
      "イ": "2πρGh",
      "ウ": "4πρGh",
      "エ": "2πρGR",
      "オ": "4πρGR"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "円盤状の薄層 dt が軸上の点に及ぼす鉛直引力は、R が十分大きい極限では 2πGρ dt である。深さ 0 から h まで積み重ねると 2πGρh となる。",
    "choiceExplanations": {
      "ア": "平面方向の角度は台地の全周にわたって 2π なので、半分の π では足りない。",
      "イ": "円盤状の薄層 dt が軸上の点に及ぼす鉛直引力は、R が十分大きい極限では 2πGρ dt である。深さ 0 から h まで積み重ねると 2πGρh となる。",
      "ウ": "薄層は観測点の下側にだけ存在し、鉛直引力を求める面の寄与は 2π の係数になる。",
      "エ": "R を大きくすると無限平板の重力に近づき、結果は半径ではなく台地の厚さに比例する。",
      "オ": "この式は R が大きくなると発散するが、遠い質量からの力は鉛直成分が小さく、平板近似では有限値に近づく。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 99。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q099.webp"
    ],
    "imageAltTexts": [
      "半径 R、厚さ h、密度 ρ の円筒台地と表面中心 O"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q100",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 100,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "ゴンドワナ大陸の復元",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ゴンドワナ大陸に関する記述㋐〜㋓のうち、妥当なもののみを挙げているのはどれか。\n㋐ 石炭紀にゴンドワナ大陸を構成していた地塊のうち、現在は赤道に近い位置にある地塊においても氷成堆積物が見られ、当時、ゴンドワナ大陸は極域にも分布していたことが分かる。\n㋑ ペルム紀に栄えた植物であるグロソプテリスの化石は、南アメリカ、アフリカ、インド、オーストラリアから産出しているが、南極大陸は氷床に覆われているため、グロソプテリスの化石は未発見である。\n㋒ ジュラ紀まではゴンドワナ大陸の一部であったインドとマダガスカルは、白亜紀に入るとゴンドワナ大陸から離れ、さらに白亜紀後期以降はインドとマダガスカルが分離した。\n㋓ 白亜紀にインドがユーラシアに衝突し、ヒマラヤ山脈が形成された。他の山脈と比べて古い時代から形成が始まったため、地球上で最も高い標高地点ができている。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋑、㋒",
      "エ": "㋑、㋓",
      "オ": "㋒、㋓"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "現在の低緯度に残る氷成堆積物は、石炭紀の大陸の配置が現在と違ったことを示す。インドとマダガスカルの間の分離は、それらが一緒にゴンドワナの他の部分から離れた後に起きた。",
    "choiceExplanations": {
      "ア": "㋐は妥当だが、南極大陸でも露出する岩石からグロソプテリスの化石が発見されている。",
      "イ": "現在の低緯度に残る氷成堆積物は、石炭紀の大陸の配置が現在と違ったことを示す。インドとマダガスカルの間の分離は、それらが一緒にゴンドワナの他の部分から離れた後に起きた。",
      "ウ": "㋒は妥当だが、南極からの化石もゴンドワナ大陸に共通する植物相を示す。",
      "エ": "グロソプテリスは南極でも発見されており、インドとユーラシアの主な大陸衝突は新生代に起きた。",
      "オ": "㋒は妥当だが、ヒマラヤの高い標高は形成開始が他より古かったためと説明されない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 100。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q101",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 101,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "伊豆衝突帯と丹沢の形成",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "島弧と島弧の衝突に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「日本列島の地体構造を見ると、伊豆半島の北方で［㋐］や秩父帯、中央構造線が北に向かって屈曲している。この構造は、［㋑］プレートの上にある伊豆・小笠原弧が［㋑］プレートの北上のために本州弧と衝突して形成されたものである。主として［㋒］から成る丹沢地塊と伊豆地塊とが本州弧に衝突し、さらに丹沢地塊が［㋓］を続けることで、丹沢山地では島弧中部地殻を構成するトーナル岩体が地表に露出している。」",
    "choices": {
      "ア": "四万十帯／フィリピン海／火山噴出物／隆起",
      "イ": "四万十帯／フィリピン海／石灰岩類／沈降",
      "ウ": "四万十帯／太平洋／石灰岩類／隆起",
      "エ": "秋吉帯／フィリピン海／石灰岩類／隆起",
      "オ": "秋吉帯／太平洋／火山噴出物／沈降"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "屈曲が見られる四万十帯は、本州とフィリピン海プレート上の伊豆・小笠原弧との衝突の影響を受けた。火山性の地塊が衝突して隆起し、侵食によって中部地殻の岩体が露出した。",
    "choiceExplanations": {
      "ア": "屈曲が見られる四万十帯は、本州とフィリピン海プレート上の伊豆・小笠原弧との衝突の影響を受けた。火山性の地塊が衝突して隆起し、侵食によって中部地殻の岩体が露出した。",
      "イ": "四万十帯とフィリピン海プレートは合うが、丹沢地塊の主体は島弧の火山噴出物で、岩体の露出には隆起が関わる。",
      "ウ": "伊豆・小笠原弧は沈み込む太平洋プレート側に乗るのではなく、上盤側のフィリピン海プレート上に発達する。",
      "エ": "この位置で北へ曲がる主要帯は四万十帯で、衝突した地塊の主な構成物は火山噴出物である。",
      "オ": "火山噴出物は妥当だが、衝突する島弧の載るプレートと、丹沢地塊の上下運動が違う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 101。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q102",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 102,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "日本の地震と斜面崩壊",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "近年の地震に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「平成16年（2004年）新潟県中越地震では、気象庁震度階級で最も大きい［㋐］が計測された。\n平成20年（2008年）岩手・宮城内陸地震の発震機構は、［㋑］型の地震である。\n平成30年（2018年）北海道胆振東部地震は、東西方向の軸を持つ逆断層の活動によるもので、斜面上に堆積した［㋒］層が粘土化した層をすべり面とする多数の地すべりが発生した。\n令和6年（2024年）能登半島地震のうち2024年1月1日に発生した M7.6 の地震は、［㋓］型の地震で、その直後からの地震活動は150 kmに及ぶ。この地震では、輪島地方で最大4 m程度の隆起が観測された。」",
    "choices": {
      "ア": "震度6強／正断層／降下火山灰／正断層",
      "イ": "震度6強／逆断層／泥岩／逆断層",
      "ウ": "震度7／正断層／降下火山灰／正断層",
      "エ": "震度7／逆断層／降下火山灰／逆断層",
      "オ": "震度7／逆断層／泥岩／正断層"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "中越地震の最大震度は7で、岩手・宮城内陸地震および能登半島地震はいずれも圧縮による逆断層型である。胆振東部地震では降下火山灰などが重なる斜面で地すべりが多発した。",
    "choiceExplanations": {
      "ア": "気象庁震度階級の最大は7であり、新潟県中越地震では川口町で震度7を観測した。",
      "イ": "二つの断層型は合うが、新潟県中越地震の最大震度は7で、胆振東部の斜面崩壊には降下火山灰などの火山性堆積物が関わった。",
      "ウ": "震度と斜面の堆積物は合うが、岩手・宮城内陸地震と能登半島地震はいずれも逆断層型である。",
      "エ": "中越地震の最大震度は7で、岩手・宮城内陸地震および能登半島地震はいずれも圧縮による逆断層型である。胆振東部地震では降下火山灰などが重なる斜面で地すべりが多発した。",
      "オ": "能登半島地震は逆断層型であり、北海道胆振東部地震の広域の斜面崩壊の説明には火山灰層が当てはまる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 102。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q103",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 103,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "プレート境界と発震機構",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "プレート境界付近で発生する地震の震源メカニズムに関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「図Ⅰに示す三つのプレート境界 X、Y、Z で主に発生する地震の震源メカニズムを表す下半球投影図は、それぞれ図Ⅱの［㋐］、［㋑］、［㋒］であり、また、年間当たり最も地震エネルギーを放出している場所は［㋓］である。ただし、図Ⅰの矢印はプレートの相対運動の方向を表すものとする。」",
    "choices": {
      "ア": "A／B／C／Z",
      "イ": "A／C／D／X",
      "ウ": "B／D／C／Z",
      "エ": "D／B／A／X",
      "オ": "D／C／B／Y"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "X は圧縮により片側が沈み込む逆断層型 A、Y は矢印が示す水平ずれの向きに合う横ずれ型 C、Z は引張りによる正断層型 D である。巨大なプレート境界地震が起きる X で地震により放出されるエネルギーが最も大きい。",
    "choiceExplanations": {
      "ア": "X の図は合うが、Z は海嶺の発散境界であり、横ずれ型の C ではなく正断層型の D が対応する。",
      "イ": "X は圧縮により片側が沈み込む逆断層型 A、Y は矢印が示す水平ずれの向きに合う横ずれ型 C、Z は引張りによる正断層型 D である。巨大なプレート境界地震が起きる X で地震により放出されるエネルギーが最も大きい。",
      "ウ": "X は二つのプレートが近づく境界であり、四象限に分かれる横ずれ型の B ではない。",
      "エ": "最大のエネルギー放出を X とする点は合っているが、圧縮境界 X と発散境界 Z に対応する A と D の順が逆である。",
      "オ": "Y の横ずれ型は C でよいが、X が正断層型の D になることはなく、大地震のエネルギーは主に沈み込み境界 X で放出される。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 103。解説は過去問AIの独自作成。 図Ⅰの出典：上田誠也「三つのプレート境界 X、Y、Z」（『地球科学選書 地球』所収、岩波書店）。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q103.webp"
    ],
    "imageAltTexts": [
      "プレート境界 X・Y・Z の相対運動と四つの下半球投影図 A〜D"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q104",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 104,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "首都圏低地の沖積層",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、東京都江東区付近の東西断面を模式的に示したものである。次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「①は更新統である。②の地層は、主に［㋐］に埋没段丘堆積物が堆積したものである。③の地層は、［㋑］の時期に、①と②の地層が削られた谷に河川から浅海の堆積物が埋積したものである。④の地層は、［㋒］に細粒堆積物が堆積した［㋓］層である。」",
    "choices": {
      "ア": "河川／温暖期／最終氷期／固結度の高い",
      "イ": "河川／最終氷期／温暖期／固結度の高い",
      "ウ": "河川／最終氷期／温暖期／軟弱な",
      "エ": "浅海／温暖期／最終氷期／固結度の高い",
      "オ": "浅海／最終氷期／温暖期／軟弱な"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "河川が段丘を形成し、最終氷期の海面低下で深い谷ができた。温暖化に伴う海進の時期には谷を埋める土砂や上部の軟弱な細粒堆積物がたまった。",
    "choiceExplanations": {
      "ア": "埋没段丘は河川によるが、谷の開析は海面が低い氷期に進み、細粒の堆積はその後の温暖期に生じた。",
      "イ": "谷の切り込みと埋積の順序は合うが、上部の若い細粒堆積物は軟弱で、固結度が高くない。",
      "ウ": "河川が段丘を形成し、最終氷期の海面低下で深い谷ができた。温暖化に伴う海進の時期には谷を埋める土砂や上部の軟弱な細粒堆積物がたまった。",
      "エ": "浅海の堆積より先に河川の段丘形成と氷期の谷の切り込みが起き、最上部の細粒層は固結度が低い。",
      "オ": "上位の地層の形成時期は合うが、埋没段丘堆積物②は主として河川の堆積物である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 104。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q104.webp"
    ],
    "imageAltTexts": [
      "東京都江東区付近の低地と埋没地形を示す模式断面"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q105",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 105,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "混濁流とタービダイト",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "堆積構造に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「大陸棚や大陸斜面に堆積していた砂などが［㋐］によって混濁流となり深海底に再堆積することがある。こうしてできたユニットを［㋑］と呼ぶ。［㋑］では、混濁流が徐々に流速を落としながら堆積が起きるため、典型的な堆積構造として、最下部に主に砂を含む［㋒］、その上位にシルトから成る平行葉理、最上部に泥岩が重なるパターンが見られる場合が多い。」",
    "choices": {
      "ア": "大規模な嵐による波浪／タービダイト／級化層理",
      "イ": "大規模な嵐による波浪／コンターライト／ハンモック状斜交層理",
      "ウ": "地震による地すべり／タービダイト／級化層理",
      "エ": "地震による地すべり／コンターライト／級化層理",
      "オ": "地震による地すべり／コンターライト／ハンモック状斜交層理"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "地震で斜面が崩れると土砂を含む密度流が流れ下り、その堆積物がタービダイトになる。流れの減速に伴って粗粒子から先に沈むので、砂質の基底部には上方細粒化する級化層理が現れる。",
    "choiceExplanations": {
      "ア": "堆積物の名称と構造は合うが、大陸斜面の堆積物が崩れて深海に流れ下る誘因としては地震による地すべりが最も妥当である。",
      "イ": "コンターライトは主に海底地形に沿う底層流による堆積物で、嵐の波浪が作るハンモック状斜交層理は比較的浅い海に典型的である。",
      "ウ": "地震で斜面が崩れると土砂を含む密度流が流れ下り、その堆積物がタービダイトになる。流れの減速に伴って粗粒子から先に沈むので、砂質の基底部には上方細粒化する級化層理が現れる。",
      "エ": "地震による地すべりと級化層理は妥当だが、混濁流の堆積ユニットはタービダイトである。",
      "オ": "大陸斜面を流れ下る混濁流の堆積物はコンターライトではなく、基底部では砂粒の級化が典型的である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 105。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q106",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 106,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "海浜から外側陸棚までの堆積相",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図は、海岸の砂浜（後浜、前浜）から外側陸棚までの模式的な断面である。それぞれの深さでの堆積相に関する記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「前浜相は波の影響を受けるため、堆積物は分級が［㋐］、海側に緩く傾いたくさび型の堆積相を示す。上部外浜相は海岸と平行な沿岸流と沿岸砂州の切れ目から沖に向かう離岸流が見られ、［㋑］などにより特徴付けられる。外側陸棚相は暴浪時の波浪限界より深い海底の堆積物で、基本は［㋒］であるが、暴浪時に堆積した［㋓］が挟まれる。」",
    "choices": {
      "ア": "悪く／トラフ型斜交層理が発達した砂層／泥層／砂層",
      "イ": "悪く／平行葉理が発達した泥層／砂層／泥層",
      "ウ": "良く／トラフ型斜交層理が発達した砂層／泥層／砂層",
      "エ": "良く／平行葉理が発達した泥層／砂層／泥層",
      "オ": "良く／平行葉理が発達した泥層／泥層／砂層"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "前浜では波が粒径を選別し、上部外浜の流れは砂に斜交層理をつくる。静穏な沖合では泥が堆積し、暴浪時に砂が運ばれると泥層の間に砂層が残る。",
    "choiceExplanations": {
      "ア": "上部外浜と外側陸棚の堆積物は合うが、前浜では波による選別が繰り返され、分級が良くなる。",
      "イ": "前浜の分級の説明が逆で、底面流が作用する上部外浜では泥より砂が主体となる。",
      "ウ": "前浜では波が粒径を選別し、上部外浜の流れは砂に斜交層理をつくる。静穏な沖合では泥が堆積し、暴浪時に砂が運ばれると泥層の間に砂層が残る。",
      "エ": "前浜の良い分級は正しいが、外側陸棚では通常時の泥の中に暴浪時の砂層が挟まる。",
      "オ": "外側陸棚の組合せは合うが、上部外浜は沿岸流などが砂を動かすため、トラフ型斜交層理のある砂層が特徴となる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 106。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q106.webp"
    ],
    "imageAltTexts": [
      "砂浜、外浜、陸棚の地形と晴天時・暴浪時の波浪限界"
    ]
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q107",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 107,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "化石の保存と示準化石",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "化石の保存に関する記述㋐〜㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ 皮膚や筋肉などの軟体部がそのまま化石として保存されることはなく、印象化石として形のみが保存される。\n㋑ 生痕化石とは、生物の生活の痕跡が残されたものであり、体化石と違って埋没までに運搬されることはない。\n㋒ 進化が速く、短期間に広い分布をもち、産出数の多い種は、年代の決定や地層の対比に役立つ示相化石として利用される。\n㋓ 水中の生物は陸地の生物よりも化石として残りやすい。",
    "choices": {
      "ア": "㋐、㋑",
      "イ": "㋐、㋒",
      "ウ": "㋐、㋓",
      "エ": "㋑、㋓",
      "オ": "㋓"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "水域では遺骸が堆積物に覆われやすく、海生の殻や骨などが地層中に残りやすい。陸上で堆積物に覆われない場合は、分解や風化が進みやすい。",
    "choiceExplanations": {
      "ア": "例外的に軟組織が保存されることがあり、糞などの生痕は埋没前に移動し得る。",
      "イ": "形だけでなく軟組織の残る保存もある。また、地層の年代決定や対比に役立つ化石は示準化石と呼ぶ。",
      "ウ": "㋓は妥当だが、急速な埋没や樹脂への封入など、条件によっては軟体部も保存される。",
      "エ": "水中の生物は化石になりやすいが、㋑には糞化石の元になる糞など、運搬され得る生痕もある。",
      "オ": "水域では遺骸が堆積物に覆われやすく、海生の殻や骨などが地層中に残りやすい。陸上で堆積物に覆われない場合は、分解や風化が進みやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 107。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q108",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 108,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "原生代の酸素増加と氷河堆積物",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "原生代に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「原生代初めには、［㋐］のような光合成生物の働きによって海洋中の酸素濃度が上昇し、酸素が鉄と結合することで生じた大量の酸化鉄が海底に沈殿して、［㋑］を形成した。また、世界各地の原生代初めと原生代末の地層を調べると、ドロップストーンと呼ばれる［㋒］が全球的に見つかり、当時は極端に［㋓］していたことが分かる。」",
    "choices": {
      "ア": "シアノバクテリア／ストロマトライト／熱帯性沈殿物／温暖化",
      "イ": "シアノバクテリア／縞状鉄鉱層／氷河性堆積物／寒冷化",
      "ウ": "シアノバクテリア／縞状鉄鉱層／熱帯性沈殿物／温暖化",
      "エ": "アーキア／ストロマトライト／熱帯性沈殿物／温暖化",
      "オ": "アーキア／縞状鉄鉱層／氷河性堆積物／寒冷化"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "酸素発生型光合成をするシアノバクテリアが供給した酸素は海水中の鉄を酸化し、縞状鉄鉱層の形成に関わった。ドロップストーンは氷に運ばれた礫が落下してできるため、広範な氷河活動と寒冷化を示す。",
    "choiceExplanations": {
      "ア": "ストロマトライトは微生物の活動でできる層状構造で、溶存鉄が酸化してできた縞状鉄鉱層とは異なる。",
      "イ": "酸素発生型光合成をするシアノバクテリアが供給した酸素は海水中の鉄を酸化し、縞状鉄鉱層の形成に関わった。ドロップストーンは氷に運ばれた礫が落下してできるため、広範な氷河活動と寒冷化を示す。",
      "ウ": "生物と鉄の堆積物は合うが、ドロップストーンは氷河活動の証拠で、熱帯の温暖化の指標ではない。",
      "エ": "酸素を発生する光合成の担い手はシアノバクテリアであり、鉄の酸化に由来する堆積物は縞状鉄鉱層である。",
      "オ": "鉄鉱層と寒冷化の説明は合うが、アーキアはこの酸素を発生する光合成の担い手ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 108。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q109",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 109,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "マグマ生産のプレート境界別分布",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "現在の地球におけるマグマの生産に関する次の記述の㋐、㋑、㋒に当てはまるものの組合せとして最も妥当なのはどれか。\n「マグマのおおよそ3分の2は［㋐］において生産される。残りの3分の1のうちの大部分は［㋑］において生産される。また、地表に噴出するマグマの量は、地球におけるマグマ生産量全体の［㋒］%程度である。」",
    "choices": {
      "ア": "ホットスポット／プレート収束境界／10",
      "イ": "ホットスポット／プレート発散境界／50",
      "ウ": "プレート発散境界／ホットスポット／50",
      "エ": "プレート発散境界／プレート収束境界／10",
      "オ": "プレート収束境界／ホットスポット／50"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "発散境界の中央海嶺で上昇したマントルが減圧融解し、マグマの大部分を作る。残りの主な生産地は収束境界の沈み込み帯で、多くが地下に貫入して固まるため噴出は全体の約1割である。",
    "choiceExplanations": {
      "ア": "沈み込み帯と噴出割合は妥当だが、生産量が最も多いのはホットスポットよりも全球につながる中央海嶺である。",
      "イ": "中央海嶺が世界最大のマグマ生産の場であり、地下で固まるものも多いので噴出割合を半分とするのは大きすぎる。",
      "ウ": "発散境界は最大の生産地だが、残りの主な生産地は沈み込み帯であり、噴出量は半分より小さい。",
      "エ": "発散境界の中央海嶺で上昇したマントルが減圧融解し、マグマの大部分を作る。残りの主な生産地は収束境界の沈み込み帯で、多くが地下に貫入して固まるため噴出は全体の約1割である。",
      "オ": "収束境界でもマグマは生じるが、中央海嶺の生産量がそれを上回る。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 109。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q110",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 110,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "中央海嶺の溶岩と熱水噴出",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "中央海嶺に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「中央海嶺では、［㋐］質マグマが海洋中に噴出し、［㋑］を形成することが多い。また、海底に染み込み温められた海水が噴出する海底熱水活動が見られることもある。熱水は、［㋒］より噴出し、主に［㋓］を含んでいる。」",
    "choices": {
      "ア": "流紋岩／塊状溶岩／チムニー／酸化鉱物",
      "イ": "流紋岩／枕状溶岩／パイプ／硫化鉱物",
      "ウ": "安山岩／塊状溶岩／チムニー／硫化鉱物",
      "エ": "玄武岩／塊状溶岩／パイプ／酸化鉱物",
      "オ": "玄武岩／枕状溶岩／チムニー／硫化鉱物"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "マントルの減圧融解でできた玄武岩質溶岩が海水で急冷され、枕状の形をとる。熱水が冷たい海水と混ざると硫化鉱物が沈殿し、チムニーが成長する。",
    "choiceExplanations": {
      "ア": "中央海嶺の減圧融解では通常は玄武岩質マグマが生じ、熱水の混合で沈殿する代表的な鉱物は硫化物である。",
      "イ": "枕状溶岩と硫化物は妥当だが、マグマは主に玄武岩質で、熱水の噴出口に形成される煙突状のものはチムニーと呼ぶ。",
      "ウ": "チムニーと硫化鉱物は妥当だが、海嶺で噴出する主なマグマは玄武岩質で、海水で急冷されると枕状溶岩ができやすい。",
      "エ": "玄武岩質なのは正しいが、海底噴出で典型的なのは枕状溶岩である。熱水のチムニーでは金属硫化物がよく沈殿する。",
      "オ": "マントルの減圧融解でできた玄武岩質溶岩が海水で急冷され、枕状の形をとる。熱水が冷たい海水と混ざると硫化鉱物が沈殿し、チムニーが成長する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 110。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q111",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 111,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "かんらん岩の鉱物と変質",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "かんらん岩に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「かんらん岩とは、かんらん石及び［㋐］を主成分鉱物とし、その他に、［㋑］、クロムスピネル、ざくろ石、角閃石、雲母、硫化鉱物などを少量含むことがある。かんらん岩は様々に分類され、例えば、形成された圧力の違いでは、［㋑］かんらん岩、スピネルかんらん岩、ざくろ石かんらん岩に分類される。出現としては、中央海嶺近傍や造山帯におけるアルプス型かんらん岩体として、また、［㋒］やキンバーライトなどの捕獲岩として産する。かんらん岩が水の作用を受けて変質してできた岩石は［㋓］と呼ばれる。」",
    "choices": {
      "ア": "輝石／斜長石／玄武岩／蛇紋岩",
      "イ": "輝石／斜長石／シルト岩／斑れい岩",
      "ウ": "輝石／石英／シルト岩／蛇紋岩",
      "エ": "石英／輝石／シルト岩／蛇紋岩",
      "オ": "石英／輝石／玄武岩／斑れい岩"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "主成分はかんらん石と輝石で、低圧側では斜長石を含む型がある。マントル由来の岩片が玄武岩に捕獲されることがあり、かんらん岩の加水変質では蛇紋岩が形成される。",
    "choiceExplanations": {
      "ア": "主成分はかんらん石と輝石で、低圧側では斜長石を含む型がある。マントル由来の岩片が玄武岩に捕獲されることがあり、かんらん岩の加水変質では蛇紋岩が形成される。",
      "イ": "シルト岩は堆積岩で、代表的なマントル捕獲岩の運び手ではない。かんらん岩の加水変質で斑れい岩はできない。",
      "ウ": "かんらん岩の圧力に応じた典型的な分類は斜長石、スピネル、ざくろ石であり、石英を含む型をここに入れるのは適切でない。",
      "エ": "蛇紋岩は正しいが、かんらん岩の主なケイ酸塩鉱物には石英ではなく輝石が含まれる。",
      "オ": "玄武岩による捕獲は妥当だが、かんらん岩の主成分として石英を挙げる点と、加水変質岩を斑れい岩とする点が誤りである。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 111。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q112",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 112,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "地殻・マントル・核の主要元素",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "地球内部の化学組成に関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「地球内部を構成する物質やその化学組成は、天然の試料や地球内部の地震波速度構造及び地球内部相当の高温高圧実験などの結果を組み合わせて推定される。大陸地殻では酸素と［㋐］を合わせると重量で70%以上を占め、他に、アルミニウム、［㋑］、カルシウム、［㋒］、ナトリウム、カリウム、チタンなどを含めると約99%となる。マントルは酸素と［㋐］と［㋒］で約90%を占める。金属核の主要な構成元素は［㋑］であり、その他の金属成分として約5%の［㋓］や金属以外の軽元素も含まれる。」",
    "choices": {
      "ア": "鉄／マグネシウム／ケイ素／銅",
      "イ": "マグネシウム／ケイ素／鉄／銅",
      "ウ": "マグネシウム／鉄／ケイ素／ニッケル",
      "エ": "ケイ素／マグネシウム／鉄／ニッケル",
      "オ": "ケイ素／鉄／マグネシウム／ニッケル"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "地殻ではケイ酸塩に由来する酸素とケイ素が多く、マントルにはかんらん石や輝石に多いマグネシウムも加わる。金属核は主に鉄から成り、ニッケルを含む。",
    "choiceExplanations": {
      "ア": "大陸地殻の酸素に次ぐ成分は鉄ではなくケイ素であり、金属核の主成分はマグネシウムではない。",
      "イ": "大陸地殻ではケイ酸塩鉱物が多いが、金属核はケイ素に富むのではなく鉄を主体とする。",
      "ウ": "金属核の鉄・ニッケルは妥当だが、地殻では酸素とケイ素が重量の多くを占めるので、㋐と㋒が逆である。",
      "エ": "㋐と㋓は合うが、マグネシウムは主にマントルのケイ酸塩に多く、金属核では鉄が主成分である。",
      "オ": "地殻ではケイ酸塩に由来する酸素とケイ素が多く、マントルにはかんらん石や輝石に多いマグネシウムも加わる。金属核は主に鉄から成り、ニッケルを含む。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 112。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q113",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 113,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "レアアース鉱床とイオン吸着",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "ハイテク産業をはじめ様々な製品に欠かせないレアアースを供給する鉱床タイプは大別して、火成鉱床と風化鉱床に分類され、風化鉱床の一つにイオン吸着型鉱床が知られる。これは主に花こう岩の風化によって形成された土壌中において、レアアースが粘土鉱物表面に吸着して存在し、そのため、イオン交換などにより容易に回収できるという特徴がある。レアアース及びその鉱床に関する記述㋐〜㋓のうち、妥当なもののみを全て挙げているのはどれか。\n㋐ レアアースとは、ランタノイド15元素に白金、パラジウムを加えた17元素の総称である。\n㋑ レアアースは、化学的性質が互いに類似しており、自然界では同様の挙動を示すため、単元素の鉱床は存在しない。\n㋒ レアアース鉱床は偏在性が高く、そのおよそ8割は中国に存在する。\n㋓ 粘土鉱物は、可塑性のある非結晶質の物質で、かつ、複雑な形状のため、その表面が正又は負に帯電することで、その粒間に水を含んだりイオンを吸着したりすることができる。",
    "choices": {
      "ア": "㋐",
      "イ": "㋐、㋑",
      "ウ": "㋑",
      "エ": "㋒、㋓",
      "オ": "㋓"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "レアアースには三価のイオンとしてふるまう元素が多く、結晶中で互いに置換しやすい。このため、天然鉱石では一般に複数のレアアース元素が共存する。",
    "choiceExplanations": {
      "ア": "ランタノイドに加える2元素はスカンジウムとイットリウムであり、白金とパラジウムは白金族である。",
      "イ": "レアアースが共存する点は妥当だが、㋐の元素の定義が誤っている。",
      "ウ": "レアアースには三価のイオンとしてふるまう元素が多く、結晶中で互いに置換しやすい。このため、天然鉱石では一般に複数のレアアース元素が共存する。",
      "エ": "レアアース鉱床は世界各地にも存在し、生産や精製の集中を鉱床の存在比率と同一視できない。また、多くの粘土鉱物は層状の結晶構造をもつ。",
      "オ": "粘土鉱物のイオン吸着は妥当だが、典型的な粘土鉱物には層状結晶があり、非結晶質と一括できない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 113。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q114",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 114,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "氷期と間氷期の地質学的指標",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "氷期−間氷期サイクルに関する次の記述の㋐〜㋓に当てはまるものの組合せとして最も妥当なのはどれか。\n「深海のボーリングコアや氷床コアに含まれる［㋐］を分析すると、気候（気温や水温）の変動を復元することができる。これは、地球上の物質循環のサイクルの中で、質量によって同位体が分別されるからであり、質量数が［㋑］同位体の割合が高い場合、寒冷化したと復元される。［㋒］以降、寒冷な時期（氷期）と比較的暖かい時期（間氷期）が繰り返されてきた様子が明らかとなっており、現在から見て最も新しい氷期は約1万年前に終わり、現在は間氷期である。特に氷期に大きく発達する氷河による侵食力は、河川の侵食力に比べてはるかに大きく、ホルンやカールのような特徴的な地形が形成されることがある。また、氷河が削り取った岩片が岩盤を引っかくことで岩盤表面に［㋓］が残ることがあり、これは過去に氷河が動いた方向を示す手掛かりとなる。」",
    "choices": {
      "ア": "炭素同位体比／小さい／約260万年前／条線",
      "イ": "炭素同位体比／大きい／約26万年前／擦痕",
      "ウ": "酸素同位体比／小さい／約26万年前／擦痕",
      "エ": "酸素同位体比／大きい／約26万年前／条線",
      "オ": "酸素同位体比／大きい／約260万年前／擦痕"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "寒冷期に軽い酸素を多く含む水が氷床に蓄えられるため、海水側では重い ¹⁸O が相対的に増えるが、氷床コアそのものの傾向は逆である。約260万年前から続く第四紀の氷河の移動は岩盤の擦痕からも推定できる。",
    "choiceExplanations": {
      "ア": "約260万年前は第四紀の始まりに近いが、コアから氷期・間氷期を調べる代表的な指標は炭素ではなく酸素の同位体比である。",
      "イ": "擦痕は地表に残る指標であるものの、コアで分析する酸素同位体比と第四紀の開始時期が選ばれていない。",
      "ウ": "氷床の氷では寒冷期に軽い酸素の割合が高まる傾向があるが、海洋側の記録では重い酸素の割合が増える。また、第四紀の氷期・間氷期の繰り返しは約26万年より古くから起きている。",
      "エ": "海洋記録の酸素同位体比の傾向は合うが、第四紀の始まりは約26万年前ではなく約260万年前である。",
      "オ": "寒冷期に軽い酸素を多く含む水が氷床に蓄えられるため、海水側では重い ¹⁸O が相対的に増えるが、氷床コアそのものの傾向は逆である。約260万年前から続く第四紀の氷河の移動は岩盤の擦痕からも推定できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 114。解説は過去問AIの独自作成。"
  },
  {
    "id": "kokka-sogo-dai-2025-annual-senmon-suri-butsuri-chikyu-q115",
    "exam": "kokka-sogo-dai",
    "year": 2025,
    "season": "annual",
    "session": "senmon-suri-butsuri-chikyu",
    "qNumber": 115,
    "type": "multiple-choice",
    "category": "地質学",
    "topicTags": [
      "地球型惑星の地表面の年代",
      "Ⅲ部・選択問題"
    ],
    "difficulty": 3,
    "question": "図の曲線㋐、㋑、㋒は、地球・金星・火星の地表面のうち、ある年代 t 億年前以降に形成された割合を示す。㋐、㋑、㋒の組合せとして最も妥当なのはどれか。",
    "choices": {
      "ア": "金星／地球／火星",
      "イ": "金星／火星／地球",
      "ウ": "火星／地球／金星",
      "エ": "火星／金星／地球",
      "オ": "地球／金星／火星"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "火星は古いクレーター地形を多く残すため㋐、金星は比較的最近の限られた年代に地表が大きく更新された㋑に当たる。地球はプレート運動で地表が継続的に更新され、特に若い海洋底が広い面積を占めるため㋒である。",
    "choiceExplanations": {
      "ア": "㋐では約40億年前ごろの古い地表が多く残っており、大規模に表面が更新された金星には当たらない。",
      "イ": "㋒の地球は妥当だが、火星の古い地表が多い特徴は曲線㋐に現れる。",
      "ウ": "火星は㋐で合っているが、若い時代の狭い年代帯に更新が集中する㋑が金星であり、㋒が地球になる。",
      "エ": "火星は古いクレーター地形を多く残すため㋐、金星は比較的最近の限られた年代に地表が大きく更新された㋑に当たる。地球はプレート運動で地表が継続的に更新され、特に若い海洋底が広い面積を占めるため㋒である。",
      "オ": "地球の海洋底はプレート運動で更新され続けており、㋐のように地表の大部分が数十億年前から残る分布にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "sourceAnswerUrl": "https://www.jinji.go.jp/content/000016303.pdf",
    "license": "JINJI-attributed",
    "sourceAttribution": "出典：人事院「2025年度 国家公務員採用総合職試験（院卒者試験・大卒程度試験共通） 数理科学・物理・地球科学区分 専門試験（多肢選択式）」No. 115。解説は過去問AIの独自作成。",
    "imageUrls": [
      "/questions/kokka-sogo-dai/2025/senmon-suri-butsuri-chikyu/q115.webp"
    ],
    "imageAltTexts": [
      "地表面が形成された年代の累積割合を示す三本の曲線"
    ]
  }
];
