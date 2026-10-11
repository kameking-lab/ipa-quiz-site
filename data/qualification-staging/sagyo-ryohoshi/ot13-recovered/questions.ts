import type { Question } from "@/lib/questions/types";

/** Source-verified originals connected to the OT registry; release is coordinated separately. */
export const OT13_RECOVERED_QUESTIONS: Question[] = [
  {
    "id": "sagyo-ryohoshi-2024-annual-am-q2",
    "exam": "sagyo-ryohoshi",
    "session": "am",
    "year": 2024,
    "season": "annual",
    "qNumber": 2,
    "question": "56 歳の男性。数年前から頸椎椎間板ヘルニアを指摘されていた。昨日、自宅で\n転倒して突然に麻痺を呈した。頸髄損傷と診断され、主な損傷部位以下の機能は\nASIA 機能障害尺度［ASIA Impairment Scale〈AIS〉］でB である。頸椎MRI（別冊\nNo. 1）を別に示す。\n　正しいのはどれか。",
    "choices": {
      "ア": "横隔膜の麻痺がある。",
      "イ": "肩をすくめることができる。",
      "ウ": "頸部の感覚機能障害を認める。",
      "エ": "スプーンを握り食事ができる。",
      "オ": "棚の上の物をとることができる。"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09a_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午前）",
    "license": "MHLW-attributed",
    "subject": "午前",
    "officialAnswerNumber": "2",
    "type": "multiple-choice",
    "category": "午前",
    "topicTags": [
      "頸髄損傷",
      "AIS",
      "残存機能"
    ],
    "difficulty": 4,
    "answer": "イ",
    "requiredSelections": 1,
    "explanation": "公式正答は2。頸椎MRIに示された損傷部位と、その上位に残る機能を対応させる。肩をすくめる運動は主に僧帽筋上部によるもので、この症例では残存する頸部・肩甲帯の機能として可能である。AIS Bは感覚不全の分類であり、仙髄領域を含む感覚が残る一方、運動機能の保存には分類上の制限がある。『損傷部位以下の感覚も全て消失する』『全ての筋の収縮がゼロになる』と読み替えず、MRIと各動作に必要な機能を合わせて判断する。",
    "choiceExplanations": {
      "ア": "横隔膜は主にC3〜C5由来の横隔神経で支配される。提示MRIとAIS Bという記載だけから横隔膜麻痺を断定することはできず、本例の正答となる残存機能ではない。",
      "イ": "正しい。肩をすくめる運動は僧帽筋上部を中心に行う。提示された頸髄損傷より上位に残る頸部・肩甲帯の機能を利用できるため、この動作は可能と判断する。",
      "ウ": "頸部の感覚は上位頸髄の皮膚分節と対応する。本例では損傷部位より上位の感覚まで障害されるとは示されていない。またAIS Bは感覚が全て失われる分類でもない。",
      "エ": "スプーンを直接握って口へ運ぶには、手指の把持機能に加えて上肢を操作する随意運動が必要である。本例の損傷部位と機能から、その動作が可能とは判断できない。万能カフなどで把持を代償する場合とは区別する。",
      "オ": "棚上の物を取るには肩・肘を協調させて上肢を挙上し、さらに手指で物品を把持する機能が必要である。肩をすくめられることだけで、これらの動作全体が可能になるわけではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q2-booklet-1.png"
    ],
    "imageAltTexts": [
      "原本別冊No.1：頸椎MRI"
    ],
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09a_02.pdf",
      "https://asia-spinalinjury.org/wp-content/uploads/2019/04/ASIA-ISCOS-IntlWorksheet_2019.pdf"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-am-q6",
    "exam": "sagyo-ryohoshi",
    "session": "am",
    "year": 2024,
    "season": "annual",
    "qNumber": 6,
    "question": "35 歳の男性。交通事故により頸髄損傷完全麻痺（第4 頸髄節まで機能残存）で回\n復期リハビリテーション病棟に入院中である。60 歳代の父母との同居を見据えて\n作業療法を実施している。介助量軽減に向けた支援機器・自助具（別冊No. 2）を別\nに示す。\n　導入で正しいのはどれか。2 つ選べ。",
    "choices": {
      "ア": "①",
      "イ": "②",
      "ウ": "③",
      "エ": "④",
      "オ": "⑤"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09a_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午前）",
    "license": "MHLW-attributed",
    "subject": "午前",
    "officialAnswerNumber": "15",
    "type": "multiple-choice",
    "category": "午前",
    "topicTags": [
      "頸髄損傷",
      "自助具",
      "移乗"
    ],
    "difficulty": 3,
    "answer": [
      "ア",
      "オ"
    ],
    "requiredSelections": 2,
    "explanation": "公式正答は1・5。C4まで機能が残る完全頸髄損傷では、上肢で実用的な把持・操作を行う機能が不足する一方、頸部や口の動きを利用できる。移動用リフトは移乗時の家族の身体的負担を減らし、マウススティックは残存する口・頸部の機能による操作を支える。電動車椅子は入力装置の適合が重要であり、図の手操作用ジョイスティックと、顎操作・呼気操作などに変更した装置を混同しない。",
    "choiceExplanations": {
      "ア": "正しい。図①は移動用リフトである。自力での移乗が難しい本例で、抱え上げに伴う父母の負担を軽減できる。スリングの適合や安全な操作方法も合わせて確認する。",
      "イ": "図②は手でジョイスティックを操作する電動車椅子であり、C4までの完全麻痺ではその上肢操作が難しい。顎などで操作できる入力装置へ変更すれば適応を検討できるが、図に示された装置そのものの選択とは異なる。",
      "ウ": "図③の万能カフは手で物品を握る力を代償するが、装着した食具などを動かす上肢機能は別に必要である。本例では把持の代償だけで食事動作などを自立させることは難しい。",
      "エ": "図④のポータブルスプリングバランサーは上肢の重さを支え、残っている上肢運動を利用しやすくする装置である。C4までの完全麻痺で不足する実用的な上肢運動を、支持だけで新たに作り出す装置ではない。",
      "オ": "正しい。図⑤はマウススティックであり、口で保持して頸部の動きを利用し、スイッチやキーなどを操作する。手指を使用しにくい本例の残存機能に適合する。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q6-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q6-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q6-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q6-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q6-choice-5.png"
    },
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09a_02.pdf",
      "https://asia-spinalinjury.org/wp-content/uploads/2019/04/ASIA-ISCOS-IntlWorksheet_2019.pdf"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-am-q9",
    "exam": "sagyo-ryohoshi",
    "session": "am",
    "year": 2024,
    "season": "annual",
    "qNumber": 9,
    "question": "68 歳の女性。2 か月前に頭部打撲歴あり。10 日前から歩行障害が出現し徐々に\n悪化した。病院を受診したところ緊急入院となった。穿頭血腫ドレナージ術後、症\n状は改善した。\n　別に示す頭部CT 画像（別冊No. 3）のうち、この患者の術前の頭部CT 画像はど\nれか。",
    "choices": {
      "ア": "①",
      "イ": "②",
      "ウ": "③",
      "エ": "④",
      "オ": "⑤"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09a_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午前）",
    "license": "MHLW-attributed",
    "subject": "午前",
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "午前",
    "topicTags": [
      "慢性硬膜下血腫",
      "頭部CT"
    ],
    "difficulty": 3,
    "answer": "エ",
    "requiredSelections": 1,
    "explanation": "公式正答は4。軽微な頭部打撲から時間を置いて歩行障害が出現し、穿頭血腫除去術で改善した経過は慢性硬膜下血腫に合致する。図④では頭蓋内面に沿う三日月状の低吸収域と、それによる脳の圧排を認める。頭部外傷後の症状は直後に限らず、数週間後から徐々に現れることもある。病歴と、血腫が脳実質の内側か外側かという画像上の位置を対応させる。",
    "choiceExplanations": {
      "ア": "図①では脳室の拡大が目立つ。歩行障害を生じる病態は複数あるが、画像は本例で問われる三日月状の硬膜下血腫を示していない。脳室拡大だけを根拠に本例の術式を説明することはできない。",
      "イ": "図②の低吸収域は脳実質内の広い範囲に分布する。頭蓋内面に沿う硬膜下の液体貯留とは位置・形状が異なり、穿頭血腫除去で改善した本例に対応しない。",
      "ウ": "図③では脳実質内に高吸収域の塊が認められる。実質内の出血を示す像であり、慢性硬膜下血腫でみられる頭蓋内面に沿う三日月状の貯留像とは異なる。",
      "エ": "正しい。図④は頭蓋内面に沿う三日月状の低吸収域が脳を圧排しており、慢性硬膜下血腫に合致する。打撲から遅れて症状が進行し、穿頭血腫除去で改善したという病歴とも一致する。",
      "オ": "図⑤では脳溝・脳槽に沿う高吸収域が目立つ。血液の分布が本例の硬膜下貯留像とは異なり、慢性硬膜下血腫を示す図④を選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q9-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q9-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q9-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q9-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-am-q9-choice-5.png"
    },
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09a_02.pdf",
      "https://www.nhs.uk/conditions/subdural-haematoma/"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q1",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 1,
    "question": "Daniels らの徒手筋力テストの段階5 及び4 の検査を図に示す。\n検査者が抵抗を加える位置で正しいのはどれか。2 つ選べ。",
    "choices": {
      "ア": "肩甲骨挙上",
      "イ": "肘屈曲",
      "ウ": "母指内転",
      "エ": "股関節屈曲、外転、外旋と膝屈曲",
      "オ": "股関節内転"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "subject": "午後",
    "officialAnswerNumber": "34",
    "type": "multiple-choice",
    "category": "午後",
    "topicTags": [
      "徒手筋力テスト",
      "抵抗位置"
    ],
    "difficulty": 4,
    "answer": [
      "ウ",
      "エ"
    ],
    "requiredSelections": 2,
    "explanation": "公式正答は3・4。段階4・5の徒手筋力テストでは、被検者の運動を妨げる方向に、対象筋の作用を評価できる位置で抵抗を加える。図③は母指内転に対して基節骨へ外転方向の抵抗を加え、図④は縫工筋の複合運動に対して大腿と下腿の2点に抵抗を加えている。段階4と5の違いは抵抗に耐える力の程度であり、設問はその強さではなく抵抗を加える位置を問う。",
    "choiceExplanations": {
      "ア": "肩甲骨挙上では肩の上面へ下向きの抵抗を加える。図①では上腕・肘付近に抵抗を加えており、肩甲帯の挙上を評価する標準的な抵抗位置と一致しない。",
      "イ": "肘屈曲では前腕遠位、手関節の近位に抵抗を加えて肘を伸展させる方向に負荷する。図②は標準的な前腕遠位の抵抗位置・向きと一致せず、肘屈曲筋力の検査として適切でない。",
      "ウ": "正しい。母指内転に対して、母指基節骨の内側へ外転方向の抵抗を加えている。母指を手掌側へ近づける内転運動を妨げる位置・方向になっている。",
      "エ": "正しい。股関節屈曲・外転・外旋と膝屈曲は縫工筋の作用を評価する組合せである。膝外側付近に下・内側方向、下腿内前面に上・外側方向の抵抗を加える図で、複合運動に対する標準的な2点抵抗に一致する。",
      "オ": "股関節内転では側臥位の下側検査脚を用い、その大腿遠位内側へ下向きの抵抗を加える。図⑤では抵抗位置が膝より下の下腿側に寄っており、標準位置と異なる。下向きという方向だけを誤りの理由にしない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q1-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q1-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q1-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q1-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q1-choice-5.png"
    },
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q1-question.png"
    ],
    "imageAltTexts": [
      "原本：徒手筋力テスト5種類と抵抗方向の凡例"
    ],
    "officialReferenceUrls": [
      "https://at.uwa.edu/mmt/scapula.htm",
      "https://at.uwa.edu/mmt/Elbow.htm",
      "https://at.uwa.edu/mmt/thumb.htm",
      "https://at.uwa.edu/mmt/hip.htm"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q2",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 2,
    "question": "36 歳の男性。手にバスケットボールが当たって受傷した。来院時の手指の写真\n（別冊No. 1Ａ）と単純エックス線写真（別冊No. 1Ｂ）を別に示す。\n　考えられるのはどれか。",
    "choices": {
      "ア": "Bennett 骨折",
      "イ": "Heberden 結節",
      "ウ": "槌　指",
      "エ": "ばね指",
      "オ": "ボクサー骨折"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "subject": "午後",
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "午後",
    "topicTags": [
      "槌指",
      "手指外傷"
    ],
    "difficulty": 2,
    "answer": "ウ",
    "requiredSelections": 1,
    "explanation": "公式正答は3。ボールが指先に当たってDIP関節が強制的に屈曲すると、末節骨に付着する終末伸筋腱の断裂や付着部の裂離骨折が起こり、指先を自力で伸ばせなくなる。これが槌指である。提示写真の指先の下垂と、エックス線写真の末節骨基部の裂離像を、受傷機転と対応させて判断する。",
    "choiceExplanations": {
      "ア": "Bennett骨折は母指の第1中手骨基部に生じる関節内骨折である。提示された指先の伸展障害と末節骨の所見とは、障害部位が異なる。",
      "イ": "Heberden結節はDIP関節の変形性関節症に伴う骨性の膨隆である。ボールが当たった直後に生じた終末伸筋機構の障害とは異なる。",
      "ウ": "正しい。槌指は終末伸筋腱またはその末節骨付着部の損傷で、DIP関節が屈曲して指先が下垂する。ボールによる受傷機転、写真、エックス線所見が一致する。",
      "エ": "ばね指は屈筋腱と腱鞘の通過障害により、指の屈伸時に引っ掛かりや弾発を生じる。指先を伸展できない槌指の所見とは機序が異なる。",
      "オ": "ボクサー骨折は典型的には握りこぶしで殴打した際の第5中手骨頸部骨折である。指先へのボール衝突による末節部の損傷とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q2-booklet-1.png"
    ],
    "imageAltTexts": [
      "原本別冊No.1：受傷した手指の写真と単純エックス線写真"
    ],
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_02.pdf",
      "https://www.orthoinfo.org/diseases--conditions/mallet-finger-baseball-finger/"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q4",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 4,
    "question": "21 歳の女性。先天性の右上肢欠損。上肢の写真（別冊No. 2）を別に示す。\n　起こり得る2 次性の障害で最もみられるのはどれか。",
    "choices": {
      "ア": "幻肢痛",
      "イ": "神経腫",
      "ウ": "側弯症",
      "エ": "断端浮腫",
      "オ": "骨断端の過成長"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "subject": "午後",
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "午後",
    "topicTags": [
      "先天性上肢欠損",
      "二次障害"
    ],
    "difficulty": 3,
    "answer": "ウ",
    "requiredSelections": 1,
    "explanation": "公式正答は3。先天性上肢欠損では側弯症の合併が報告されており、成長期から脊柱・体幹の状態を観察する必要がある。設問は21歳の先天性欠損でみられる二次障害を比較しており、外傷・手術による切断直後の合併症や、成長期の骨断端の問題とは分けて考える。左右の上肢の重量差や筋の不均衡だけで側弯の原因を断定することはしない。",
    "choiceExplanations": {
      "ア": "幻肢痛は失われた肢が痛むように感じる現象で、後天的な切断後の問題として代表的である。先天性欠損で全く起こらないとはいえないが、本例で最もみられる二次障害として選ぶのは側弯症である。",
      "イ": "神経腫は損傷・切断された神経の再生に関連して生じる。本例は先天性上肢欠損であり、外傷や手術で神経が切断されたという経過は示されていない。",
      "ウ": "正しい。先天性上肢欠損では側弯症の合併が報告されている。脊柱の弯曲や体幹の非対称性を観察すべき二次障害であり、公式正答も3である。欠損の大きさだけで側弯の程度が決まるとはいえない。",
      "エ": "断端浮腫は切断術後の組織損傷や循環の変化などで問題になる。本例は21歳の先天性欠損であり、術後の浮腫が生じる経過とは異なる。",
      "オ": "骨断端の過成長は、骨格が成長中の小児の切断後に問題となる。本例の年齢と先天性欠損という条件では、比較肢の中で最もみられる二次障害としては選ばない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q4-booklet-1.png"
    ],
    "imageAltTexts": [
      "原本別冊No.2：先天性の右上肢欠損の写真"
    ],
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_02.pdf",
      "https://pubmed.ncbi.nlm.nih.gov/3955950/"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q6",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 6,
    "question": "52 歳の男性。右利き。脳梗塞による右片麻痺。発症後14 日目に回復期リハビリテーション病棟へ転棟した。意識は清明で、認知機能に問題はない。Brunnstrom 法ステージ上肢Ⅲ、手指Ⅲ、下肢Ⅴ。疼痛や浮腫はない。機能回復を目的とした作業療法を図に示す。\n現時点でこの患者の右上肢に行う訓練で最も適切なのはどれか。",
    "choices": {
      "ア": "ペグ差し",
      "イ": "立位での輪投げ",
      "ウ": "両手でボールを受ける",
      "エ": "輪を背中で持ち替え",
      "オ": "肘伸展位での窓拭き"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "subject": "午後",
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "午後",
    "topicTags": [
      "脳卒中",
      "Brunnstrom",
      "上肢訓練"
    ],
    "difficulty": 4,
    "answer": "エ",
    "requiredSelections": 1,
    "explanation": "公式正答は4。上肢・手指のBrunnstromステージⅢでは共同運動と集団的な把握が中心で、分離運動や巧緻な把持・随意的な開放が十分でない。図④の背中で輪を持ち替える課題は、健側の手も利用しながら、背部へ手を運ぶ運動を段階的に練習できる。背部へ手を到達させる完成した分離運動が既にステージⅢで可能という意味ではなく、現在の機能を使って次の運動を促す訓練として選ぶ。下肢Ⅴだから上肢も同程度に回復しているとは判断しない。",
    "choiceExplanations": {
      "ア": "ペグ差しは細かい把持、位置合わせ、随意的な開放を繰り返す課題である。手指Ⅲでは集団把握が中心なので、巧緻性の要求が現時点の右手機能に対して高い。",
      "イ": "輪投げには上肢を狙った方向へ動かすことと、適切な時点で輪を離すことが必要である。立位保持ができる下肢Ⅴであっても、上肢・手指Ⅲの課題としてその操作能力まで確保されるわけではない。",
      "ウ": "ボールを受けるには両手を開いて対象へ合わせ、タイミングよく把持する必要がある。随意的な手指伸展・開放が不十分な手指Ⅲでは、他動的な補助などがなければ要求が高い。",
      "エ": "正しい。背中での輪の持ち替えは、健側の手から輪を受けるなど課題を調整し、麻痺側の集団把握を利用して背部への上肢運動を促せる。完成した動作を最初から自立して行わせるという意味ではない。",
      "オ": "肘を伸ばしたまま窓を拭くには、肩の運動と肘伸展を組み合わせた分離的な制御が必要である。上肢Ⅲでは共同運動から十分に分離できないため、現時点の比較課題としては適さない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q6-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q6-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q6-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q6-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q6-choice-5.png"
    },
    "officialReferenceUrls": [
      "https://www.sralab.org/sites/default/files/2017-07/1520603_fma-ue-protocol-english-updated-20150311.pdf"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q7",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 7,
    "question": "19 歳の男性。身長170 cm、体重60 kg。頸髄損傷（第6 頸髄節まで機能残存）。\n車椅子は全幅70 cm、全長120 cm。車椅子とベッド間の移乗は前・後方移動で自\n立し、ADL は自助具や環境整備で自立の見込みを得た。住宅改修図（別冊No. 3）を\n別に示す。\n　正しいのはどれか。",
    "choices": {
      "ア": "①屋外スロープの勾配を1 / 6 にした。",
      "イ": "②居間と台所の開口部の幅を80 cm にした。",
      "ウ": "③車椅子が回転するポーチの幅を140 cm にした。",
      "エ": "④歩行者とすれ違うための廊下幅を120 cm にした。",
      "オ": "⑤床面から浴槽の縁までの高さを80 cm にした。"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "subject": "午後",
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "午後",
    "topicTags": [
      "頸髄損傷",
      "住宅改修",
      "車椅子"
    ],
    "difficulty": 4,
    "answer": "ウ",
    "requiredSelections": 1,
    "explanation": "公式正答は3。設問の車椅子は幅70cm・全長120cmであり、図のポーチには方向転換できる空間が必要である。国土交通省の住宅設計ハンドブックでも、この寸法範囲の車椅子に対する転回空間として140cm四方が示されており、肢3と一致する。開口部や廊下は単なる車体幅だけでなく、進入方向、扉操作、手動駆動時の手の余裕や歩行者の姿勢を含めて評価する。80cmの開口部や120cmの廊下を、あらゆる条件で通行・すれ違い不能と断定しない。",
    "choiceExplanations": {
      "ア": "勾配1/6は、C6残存の本人が屋外で車椅子を自力駆動する条件では急である。緩い勾配と休息・操作の余裕を確保する改修が必要であり、公式正答には含まれない。",
      "イ": "幅80cmでは幅70cmの車体との差が10cmにとどまる。図②の居間と台所の間の開口部への接近・通過や、自力駆動・開口部操作の余裕まで評価する必要がある。80cmが一般に通行不能という意味ではなく、本例の自立動線を整える比較肢として選ばない。",
      "ウ": "正しい。幅140cmのポーチは、設問の車椅子が方向転換する空間として対応する。国土交通省の住宅設計資料にも、幅70cm・全長120cm以下の車椅子を想定した140cm四方の転回空間が示される。",
      "エ": "廊下幅120cmは、歩行者が横向きになるなどの条件で車椅子とすれ違える場合はある。しかし、通常の歩行姿勢で余裕をもってすれ違う動線を確保する本例の改修としては余裕が小さい。『120cmでは絶対にすれ違えない』とは断定しない。",
      "オ": "浴槽縁が床から80cmでは、車椅子座面からの前後方向の移乗に大きな高低差が生じる。本人の残存機能に合わせて座面との高さ関係や移乗方法を調整すべきであり、この高さを選ばない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q7-booklet-1.png"
    ],
    "imageAltTexts": [
      "原本別冊No.3：寸法と動線を示した住宅改修図"
    ],
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_02.pdf",
      "https://www.mlit.go.jp/jutakukentiku/house/content/001751893.pdf",
      "https://www.city.tama.lg.jp/_res/projects/default_project/_page_/001/004/820/11111111111111.pdf"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q8",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 8,
    "question": "8 歳の女児。脳性麻痺痙直型両麻痺である。ボール遊び時の姿勢設定を図に示す。\nこの児の適切な姿勢設定はどれか。",
    "choices": {
      "ア": "1",
      "イ": "2",
      "ウ": "3",
      "エ": "4",
      "オ": "5"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "subject": "午後",
    "officialAnswerNumber": "5",
    "type": "multiple-choice",
    "category": "午後",
    "topicTags": [
      "脳性麻痺",
      "姿勢設定",
      "座位"
    ],
    "difficulty": 3,
    "answer": "オ",
    "requiredSelections": 1,
    "explanation": "公式正答は5。痙直型両麻痺の児の上肢活動では、下肢の伸展・内転方向の緊張に配慮し、骨盤と体幹を安定させて両手を使いやすくする。図⑤は低い座面に座り、股・膝関節を曲げ、両足を床につけた状態で前方のボールへ手を伸ばす設定である。下肢を伸ばしたままにする姿勢や、支持が少ない姿勢に比べ、ボール遊びのための安定した基盤を作りやすい。実際の設定は児の関節可動域や筋緊張に合わせて調整する。",
    "choiceExplanations": {
      "ア": "図①は腹臥位で頭部・体幹を起こし、下肢を伸ばした姿勢である。体幹と下肢の伸展方向の緊張を強めやすく、両手を自由に使うための安定した姿勢としては本例に適さない。",
      "イ": "図②は両下肢を左右非対称に配置した床座位である。骨盤・股関節の左右差を生じやすく、両足で支持して体幹を安定させる図⑤の設定より本例のボール遊びに適さない。",
      "ウ": "図③は膝立ちで股関節を伸ばし、台に手を置く姿勢である。足底による支持がなく、下肢・体幹の伸展方向の緊張にも配慮が必要で、両手での遊びを安定させる設定として図⑤を優先する。",
      "エ": "図④は下肢を前方へ伸ばし、足底が床に接地していない座位である。膝伸展による筋の張力や骨盤の後傾、支持の不足が上肢活動を妨げ得る。股・膝を曲げて足底支持を得る設定の方が適切である。",
      "オ": "正しい。低い座面で股・膝関節を曲げ、両足を床につけた座位により、骨盤・体幹の支持を得ながら前方のボールへ両手を出せる。下肢伸展方向の緊張に配慮し、遊びのための上肢活動を行いやすい。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "choiceImageUrls": {
      "ア": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q8-choice-1.png",
      "イ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q8-choice-2.png",
      "ウ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q8-choice-3.png",
      "エ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q8-choice-4.png",
      "オ": "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q8-choice-5.png"
    },
    "officialReferenceUrls": [
      "https://osaka-drc.jp/about/faq.php"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2024-annual-pm-q9",
    "exam": "sagyo-ryohoshi",
    "session": "pm",
    "year": 2024,
    "season": "annual",
    "qNumber": 9,
    "question": "78 歳の男性。病室からリハビリテーション室まで歩いて来室した。到着後に息\n苦しく動悸がすると訴えたため、直ちに心電図検査が施行された。心電図（別冊\nNo. 4）を別に示す。\n　心電図の所見で正しいのはどれか。",
    "choices": {
      "ア": "心室細動",
      "イ": "心室頻拍",
      "ウ": "心房細動",
      "エ": "心室性期外収縮",
      "オ": "完全房室ブロック"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第60回作業療法士国家試験（2025年実施・午後）",
    "license": "MHLW-attributed",
    "subject": "午後",
    "officialAnswerNumber": "3",
    "type": "multiple-choice",
    "category": "午後",
    "topicTags": [
      "心電図",
      "心房細動"
    ],
    "difficulty": 3,
    "answer": "ウ",
    "requiredSelections": 1,
    "explanation": "公式正答は3。提示心電図ではQRS波を識別できる一方、R-R間隔が不規則で、一定のP波が認められない。これは心房細動の特徴である。心室細動のようにQRSが失われる波形、心室頻拍の連続した幅広いQRS、単発の心室性期外収縮、P波とQRSが独立する完全房室ブロックと区別する。息苦しさ・動悸という症状も起こり得るが、最終的な選択は心電図所見に基づく。",
    "choiceExplanations": {
      "ア": "心室細動では無秩序な電気活動となり、規則的なQRS波を識別できなくなる。提示波形にはQRSを認めるため、心室細動の波形とは異なる。",
      "イ": "心室頻拍では心室由来の頻拍として幅広いQRSが連続する。提示波形の主所見はR-R間隔の不規則性と明瞭なP波の欠如であり、心房細動を選ぶ。",
      "ウ": "正しい。R-R間隔が不規則で、各QRSに先行する一定のP波が認められない。心房細動ではこうした所見や細かな基線の揺れがみられる。",
      "エ": "心室性期外収縮では予定された拍動より早い幅広いQRSが出現する。単発の早期収縮という説明だけでは、提示された全体の不規則なリズムとP波の欠如を説明できない。",
      "オ": "完全房室ブロックでは心房のP波と心室のQRSが独立して出現する。提示波形はP波とQRSの解離より、一定のP波がなくR-R間隔が不規則であることが特徴である。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot13-recovered/r60-pm-q9-booklet-1.png"
    ],
    "imageAltTexts": [
      "原本別冊No.4：心電図"
    ],
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-09b_02.pdf",
      "https://www.msdmanuals.com/professional/cardiovascular-disorders/specific-cardiac-arrhythmias/atrial-fibrillation"
    ]
  },
  {
    "id": "sagyo-ryohoshi-2025-annual-am-q72",
    "exam": "sagyo-ryohoshi",
    "session": "am",
    "year": 2025,
    "season": "annual",
    "qNumber": 72,
    "question": "体幹の回旋運動を図に示す。\n　この運動に作用するのはどれか。",
    "choices": {
      "ア": "右多裂筋",
      "イ": "左腰方形筋",
      "ウ": "右外腹斜筋",
      "エ": "右内腹斜筋",
      "オ": "左脊柱起立筋"
    },
    "sourcePdfUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09a_01.pdf",
    "sourceAnswerUrl": "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-09seitou.pdf",
    "sourceAttribution": "出典：厚生労働省 第61回作業療法士国家試験（2026年実施・午前）",
    "license": "MHLW-attributed",
    "subject": "午前",
    "officialAnswerNumber": "4",
    "type": "multiple-choice",
    "category": "午前",
    "topicTags": [
      "体幹回旋",
      "内腹斜筋",
      "運動学"
    ],
    "difficulty": 2,
    "answer": "エ",
    "requiredSelections": 1,
    "explanation": "公式正答は4。図は被検者の体幹を右へ回旋する運動である。内腹斜筋は片側の収縮で同側への体幹回旋に働くため、右内腹斜筋が該当する。右回旋では左外腹斜筋も協働するが、選択肢の外腹斜筋は右側であり作用方向が反対になる。観察者から見た左右と被検者自身の左右を混同しない。",
    "choiceExplanations": {
      "ア": "右多裂筋の片側収縮は体幹を反対側へ回旋させる作用を持つ。右回旋の主動作に対応する右内腹斜筋とは作用方向が異なる。",
      "イ": "左腰方形筋は主に左側屈、骨盤の引き上げ、腰椎の安定に働く。図の右回旋を担う筋として、この選択肢を選ばない。",
      "ウ": "右外腹斜筋の片側収縮は反対側、すなわち左への体幹回旋に働く。図の右回旋では左外腹斜筋が協働するため、左右の取り違えに注意する。",
      "エ": "正しい。右内腹斜筋は同側である右への体幹回旋に働き、図の運動方向に一致する。左外腹斜筋とともに右回旋を行う。",
      "オ": "左脊柱起立筋は体幹の伸展や左側屈、姿勢保持を主に担う。図で問われる右への回旋を直接説明する選択肢は右内腹斜筋である。姿勢保持への関与が全くないという意味ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": false,
    "lastUpdated": "2026-10-11",
    "imageUrls": [
      "/questions/sagyo-ryohoshi/ot13-recovered/r61-am-q72-rotation-figure.png"
    ],
    "imageAltTexts": [
      "原本：被検者の体幹右回旋を示す図"
    ],
    "officialReferenceUrls": []
  }
];
