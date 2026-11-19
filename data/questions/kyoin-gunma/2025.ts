import type { Question } from "@/lib/questions/types";

const japanesePassage = "子どもはオノマトペが大好きだ。オノマトペが感覚的でわかりやすいというだけでなく、場面全体をオノマトペ一つで換喩的に表すことができる、声の強弱や発話の速さ、リズムなどに感情を込めやすいなどの理由による。オノマトペは子どもを言語の世界に引きつける。それによって子どもはことばに興味を持ち、もっと聞きたい、話したい、ことばを使いたいと思う。それだけでもとても大事な働きだが、オノマトペに親しむことで子どもは言語のさまざまな性質を学ぶことができるのである。【ア】次のような気づきがあるだろう。\n① オノマトペのリズムや音から、母語の音の特徴や音の並び方などの特徴に気づく。（オノマトペは、一般語とほとんど変わらない音で構成されている。）\n② 音と視覚情報の対応づけを感覚的に「感じる」ことによって、耳に入ってくる人が発する「音」が何かを「指す」ということに気づく。それは「ことばは意味を持つ」という気づきにつながる。\n③ 母語特有の音と意味の結びつき（たとえば、音の〔下線部a：セイ〕濁と対象の大きさとの対応）を感覚的に覚える。これは大人になってオノマトペを効果的に創造的に使う、つまり新しいオノマトペを状況に即して【イ】的に作っていくための基礎となる。\n④ たくさんの要素がありすぎる場面で、オノマトペのアイコン性は単語が指し示す部分に子どもが注目するのを助け、その意味を見つけやすくする。動詞や形容詞は、目の前に見える対象そのもののごく一部を切り取ったものが意味になる。動詞を学習するときは、動作主、動作対象、道具、背景などたくさんの要素からなる場面で動きや行為にだけ注意を向けなければならないし、形容詞を学習するときはモノの触覚、模様、大きさ、重さなど、特定の特徴だけを取り出さなければならない。オノマトペは子どもが目の前の情報を「切り出す」ための武器となる。\nこれらを統合してまとめてみると、言語習得におけるオノマトペの役割は、〔下線部b：子どもに言語の大局観を与える〕ことと言えよう。何の知識も持たない状態から始めなければならない子どもと、抽象的な記号の膨大かつ複雑な体系である言語の姿。最初は歩くことはもとより、立つこともできなかった子どもが、どのような方法をもって言語という高い山を登りきることができるのだろう？　その秘密に迫ることが、記号接地問題、そして言語習得の謎を解き明かすことなのである。\n（今井むつみ・秋田喜美『言語の本質』による）";
const englishPassage = "A new study says higher levels of \"forever chemicals\" may be in seafood. Forever chemicals are man-made toxins. They do not break down. They can stay in our blood and 【下線部：lead to】 a variety of health issues. These include cancer, and kidney and liver problems. Researchers in the USA said there should be safety guidelines for these chemicals in seafood. The level of these toxins is highest in marine creatures like prawns and lobster. This could mean people who love sushi and prawn cocktails may have to rethink their diet and eat 【a】 seafood.\nForever chemicals were developed in the 1930s. Today, they are found in food packaging. Most of our food wrappers, take out containers, and other food holders contain the chemicals. Over the decades, the chemicals have entered our 【b】. Professor Megan Romano said she wanted people to enjoy seafood, 【c】 also to be aware of the risks. She said: \"Our recommendation isn't to not eat seafood. Seafood is a great source of lean protein and omega fatty acids.\" She thinks it is important for people to understand more about what is in the food they eat.\n［Breaking News English, Seafood could have higher levels of \"forever chemicals\"より］";

export const KYOIN_GUNMA_2025: Question[] = [
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-01",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 1,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "国語",
    "topicTags": [
      "接続語"
    ],
    "difficulty": 2,
    "question": japanesePassage + "\n\n" + "本文中の空欄【ア】に当てはまる語として、最も適するものはどれか。",
    "choices": {
      "ア": "しかし",
      "イ": "なぜなら",
      "ウ": "たとえば",
      "エ": "むしろ",
      "オ": "それとも"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "次に続く①〜④は、オノマトペに親しむことで得られる気づきの具体例である。一般的な説明のあとに例を導く「たとえば」が適する。",
    "choiceExplanations": {
      "ア": "前後は対立関係にない。後段では、言語の性質を学ぶと述べた前段を具体化している。",
      "イ": "後段が挙げるのは気づきの具体例であり、前文が成立する理由を説明する段落ではない。",
      "ウ": "次の①〜④は、オノマトペに親しむことで得られる気づきの具体例である。",
      "エ": "前段の理解を退けて別の評価に置き換える箇所ではない。",
      "オ": "前後を二つの選択肢として提示している箇所ではない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号1。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-02",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 2,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "国語",
    "topicTags": [
      "同音異字"
    ],
    "difficulty": 2,
    "question": japanesePassage + "\n\n" + "下線部aと同じ漢字を使うものはどれか。",
    "choices": {
      "ア": "セイ密な検査をする",
      "イ": "原稿をセイ書する",
      "ウ": "セイ寂の中を歩く",
      "エ": "神セイな空気に包まれる",
      "オ": "政府がセイ明を発表した"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "「清書」は下書きを整えて書き直すことで、「清濁」の「清」と同じ字を使う。「清濁」はここでは、ことばの音の清音と濁音を指す。",
    "choiceExplanations": {
      "ア": "「精密」の「精」は細部まで正確であることを表す。",
      "イ": "「清書」の「清」を用いる。音の「清濁」も同じ「清」である。",
      "ウ": "「静寂」の「静」は音がなく静かな状態を表す。",
      "エ": "「神聖」の「聖」はけがれがなく尊いことを表す。",
      "オ": "「声明」の「声」は公に意思や見解を言い表す語に用いられる。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号2。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-03",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 3,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "国語",
    "topicTags": [
      "文脈"
    ],
    "difficulty": 2,
    "question": japanesePassage + "\n\n" + "本文中の空欄【イ】に当てはまる語として、最も適するものはどれか。",
    "choices": {
      "ア": "絶対",
      "イ": "論理",
      "ウ": "刹那",
      "エ": "即興",
      "オ": "現実"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "大人が「状況に即して」新しいオノマトペを作るとは、場面に合わせてその場で新しい言い方を生み出すことである。したがって「即興」が適する。",
    "choiceExplanations": {
      "ア": "前後にあるのは場面に応じた言葉づくりであり、無条件という意味の「絶対」は合わない。",
      "イ": "音と意味の対応を感覚的に学んで利用する話であり、推論の手順を強調する段落ではない。",
      "ウ": "「刹那的」はその瞬間だけにとらわれることを表し、場に応じて創作する技能を言い表さない。",
      "エ": "「状況に即して」とあるように、その場に合わせて新しい表現を作ることを指す。",
      "オ": "実際に可能かどうかを述べているのではなく、新しい表現をその場で生み出すことを述べている。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号3。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-04",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 4,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "国語",
    "topicTags": [
      "指示内容"
    ],
    "difficulty": 2,
    "question": japanesePassage + "\n\n" + "下線部b「子どもに言語の大局観を与える」を説明したものとして、最も適するものはどれか。",
    "choices": {
      "ア": "子どもに、言語の全体的な構造や性質を理解させるということ。",
      "イ": "子どもに、言語習得の方法について研究しようという意欲を持たせるということ。",
      "ウ": "子どもに、単語は音の組み合わせから成り立っていると感じさせるということ。",
      "エ": "子どもに、言語の全体的な構造の中から一部の情報を切り出す作業をさせるということ。",
      "オ": "子どもに、単語とその単語が表す対象の対応づけを一つずつ覚えさせていくということ。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "「大局観」は、母語の音、音と意味の結びつき、場面のどこに注目するかなど、①〜④を統合して言語の全体像を捉えることを指す。",
    "choiceExplanations": {
      "ア": "母語の音や語の意味など、①〜④の気づき全体をまとめた表現である。",
      "イ": "言葉への興味を引き出すことは述べられているが、言語習得を研究する意欲は述べられていない。",
      "ウ": "音や音の並びへの気づきは①で扱う一部分であり、「大局観」は①〜④を統合する。",
      "エ": "④の切り出しの対象は、目の前の場面に含まれる情報である。",
      "オ": "②が示すのは音が何かを指すという原理への気づきであり、語を一つずつ覚える手順ではない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号4。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-05",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 5,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "国語",
    "topicTags": [
      "内容読解"
    ],
    "difficulty": 2,
    "question": japanesePassage + "\n\n" + "本文の内容として、最も適するものはどれか。",
    "choices": {
      "ア": "子どもがことばの意味を理解するためには、大人とオノマトペを用いないで会話をすることが重要である。",
      "イ": "子どもがことばの意味を理解するためには、大人がオノマトペを多用して子どもに話しかけることが望ましい。",
      "ウ": "子どもがことばの語源を理解するためには、子どもがオノマトペを用いて、目の前の情報を換喩的に表現することが重要である。",
      "エ": "子どもが言語を学ぶ過程において、子どもはオノマトペに触れることで、ことばに興味を持ったり、ことばを話したいと感じたりする。",
      "オ": "子どもが言語を学ぶ過程において、子ども自身が新しいオノマトペを一人で作る訓練を行うことが重要である。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "冒頭ではオノマトペが子どもを言語の世界に引きつけると述べている。その結果、子どもはことばに興味を持ち、もっと聞きたい、話したいと思う。",
    "choiceExplanations": {
      "ア": "本文はオノマトペが子どもを言語の世界に引きつけ、意味の理解も助けると述べている。",
      "イ": "本文はオノマトペの役割を説明しており、大人に多用を勧める記述はない。",
      "ウ": "場面を換喩的に表せる性質は冒頭で触れられるが、語源を知る方法として述べられていない。",
      "エ": "冒頭で、オノマトペに引きつけられた子どもが、もっと聞きたい、話したいと思うと述べている。",
      "オ": "③は親しむ経験が将来の創造的な使用の基礎になると述べており、子どもに一人で訓練することを求めていない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号5。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-06",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 6,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "社会",
    "topicTags": [
      "偏西風"
    ],
    "difficulty": 2,
    "question": "次の文の【A】と【B】に当てはまる語として、正しいものの組合せはどれか。\n\n日本の東京とアメリカのロサンゼルス間を飛行機で移動する際、日本からロサンゼルスへ東に向かって飛行する行きの便と、ロサンゼルスから日本へ西に向かって飛行する帰りの便では、同一の飛行距離であっても所要時間が異なる。所要時間が異なるのは、上空を吹く【A】の影響を受けるからであり、ロサンゼルスへ向かう行きの便と比べ、日本へ向かう帰りの便の飛行時間が【B】なる。この傾向は特に冬期に顕著である。",
    "choices": {
      "ア": "A：貿易風　B：短く",
      "イ": "A：貿易風　B：長く",
      "ウ": "A：季節風　B：短く",
      "エ": "A：偏西風　B：短く",
      "オ": "A：偏西風　B：長く"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "中緯度の上空の偏西風は西から東へ吹く。東へ飛ぶ行きの便には追い風、西へ飛ぶ日本行きの便には向かい風になるため、帰りの所要時間が長くなる。",
    "choiceExplanations": {
      "ア": "貿易風は主に低緯度で吹く。この航路の帰りは中緯度の偏西風を向かい風に受ける。",
      "イ": "帰りが長くなる点は合うが、その原因は中緯度の上空に吹く偏西風である。",
      "ウ": "季節風は季節で風向が変わる風を指す。ここでは偏西風の向かい風で西行きの所要時間が長くなる。",
      "エ": "風の名称は合うが、西へ飛ぶ帰りには西から吹く偏西風が向かい風になる。",
      "オ": "偏西風は西から東へ吹くため、東行きの便には追い風、西行きの帰りの便には向かい風となる。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号6。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-07",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 7,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "社会",
    "topicTags": [
      "古代ギリシャ"
    ],
    "difficulty": 2,
    "question": "次の文は、古代のギリシャで行われた政治について説明したものである。【A】と【B】に当てはまる語として、正しいものの組合せはどれか。\n\n紀元前8世紀頃からポリスとよばれる都市国家が多数生まれたギリシャでは、成人男子の市民が戦闘の義務を果たすことで政治参加の権利を得た。なかでも【A】では、大きな勢力をもったペルシャ帝国との戦争に勝利したあと、紀元前5世紀に、すべての成人男子の市民が出席する民会を中心とした【B】が行われた。しかし、女性や奴隷には民会に出席する権利は与えられていなかった。",
    "choices": {
      "ア": "A：アテネ　B：共和政",
      "イ": "A：アテネ　B：民主政",
      "ウ": "A：カルタゴ　B：共和政",
      "エ": "A：カルタゴ　B：民主政",
      "オ": "A：カルタゴ　B：君主制"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "紀元前5世紀のアテネでは、成人男子の市民が民会に直接出席する民主政が発展した。女性や奴隷は市民として民会に出席することができなかった。",
    "choiceExplanations": {
      "ア": "都市名は合うが、成人男子の市民が民会で直接参加するこの政治は民主政と呼ぶ。",
      "イ": "紀元前5世紀のアテネで、成人男子の市民による民会を中心とする直接民主政が発展した。",
      "ウ": "カルタゴは北アフリカのフェニキア系の都市であり、本文が述べるポリスはアテネである。",
      "エ": "ここで問う民主政を発展させたのはギリシャのアテネである。",
      "オ": "ペルシャ戦争後のアテネの民会を中心とした政治は、君主制ではなく民主政である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号7。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-08",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 8,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "社会",
    "topicTags": [
      "世界の気候"
    ],
    "difficulty": 2,
    "question": "世界のさまざまな気候について説明した次の文章のうち、正しいものはどれか。",
    "choices": {
      "ア": "インドネシアは熱帯に位置し、1年を通じて気温が高く雨が多い。1日の天気は変わりやすく短時間に激しい雨と風を伴う気象現象であるスコールが発生することがある。",
      "イ": "乾燥帯は、雨がとても少ない地域で、砂や岩の砂漠が広がる砂漠気候と、少しだけ雨が降るサバナ気候に分けられる。",
      "ウ": "ヨーロッパ南部にあるスペインは温帯に位置し、その中でも夏に雨が多く多湿な地中海性気候である。",
      "エ": "亜寒帯（冷帯）は、短い夏と寒さの厳しい冬があり、夏と冬の気温差が小さい地域で、タイガとよばれる針葉樹林が広がっている。",
      "オ": "寒帯は、一年中寒さが厳しく、樹木の育たない地域で、夏の間だけ地表の氷が溶けてわずかに草類が生えるステップ気候と、一年中氷と雪に覆われる氷雪気候に分けられる。"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "赤道付近のインドネシアは高温多雨の熱帯にあり、短時間に激しい雨と風を伴うスコールが起こることがある。気候帯とその地域で見られる現象の組合せが合っている。",
    "choiceExplanations": {
      "ア": "インドネシアは赤道付近にあり、高温多雨で短時間の激しい降雨が起こりやすい。",
      "イ": "乾燥帯を砂漠気候とステップ気候に分ける。サバナ気候は熱帯の区分である。",
      "ウ": "地中海性気候では夏の降水が少なく、冬に雨が多い。",
      "エ": "亜寒帯にはタイガが広がるが、夏と冬の気温差は一般に大きい。",
      "オ": "夏に低い草やコケなどが見られる寒帯の気候はツンドラ気候である。ステップ気候は乾燥帯に属する。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号8。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-09",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 9,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "社会",
    "topicTags": [
      "企業の社会的責任"
    ],
    "difficulty": 2,
    "question": "一般にCSRと呼ばれる、企業が果たすべき社会的責任に当たるものとして、正しいものはどれか。",
    "choices": {
      "ア": "利潤の追求を優先すること。",
      "イ": "投資家に株式配当金を配付すること。",
      "ウ": "市場を独占して競争原理が働かないようにすること。",
      "エ": "企業間で協議して価格を決定すること。",
      "オ": "従業員の労働時間の削減や健康管理に努めること。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "従業員は企業が責任を負う相手の一つである。過度な労働時間を減らし、働く人の健康や安全を守ることは、労働環境を改善するCSRの取組に当たる。",
    "choiceExplanations": {
      "ア": "利益は事業を続ける上で重要だが、利潤を優先すること自体は社会への責任を果たす取組に当たらない。",
      "イ": "配当は株主への利益還元であり、ここで問われる社会や従業員への配慮を示す取組ではない。",
      "ウ": "競争を排除すると消費者の選択肢が狭まる。公正な事業活動を重視するCSRの趣旨に反する。",
      "エ": "競争事業者間で価格を取り決める行為はカルテルに当たり得る。公正な競争を損なう。",
      "オ": "働く人の安全と健康を守る労働環境の改善は、企業が従業員に対して果たす社会的責任の一つである。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号9。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-10",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 10,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "社会",
    "topicTags": [
      "国際協力"
    ],
    "difficulty": 2,
    "question": "次の文は国際的な貧困問題の解消に向けた取組について説明したものである。【A】と【B】に当てはまる語として、正しいものの組合せはどれか。\n\n貧困の解消は、国際社会の安定に欠かせない。現在各国の民間協力組織である【A】を中心に、自立した生活を促し支える取組が広がっている。その一例として、社会的に弱い立場にある人々が起業するための資金を融資する【B】がある。",
    "choices": {
      "ア": "A：ODA　B：フィンテック",
      "イ": "A：ODA　B：マイクロクレジット",
      "ウ": "A：NGO　B：フィンテック",
      "エ": "A：NGO　B：マイクロクレジット",
      "オ": "A：PKO　B：フィンテック"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "NGOは非政府組織であり、マイクロクレジットは通常の金融サービスを利用しにくい人への少額融資である。",
    "choiceExplanations": {
      "ア": "ODAは政府開発援助である。フィンテックは金融と技術を組み合わせる取組の総称である。",
      "イ": "少額融資はマイクロクレジットだが、民間の非政府組織はNGOと呼ぶ。",
      "ウ": "民間協力組織を表すNGOは合っているが、起業等を支える少額融資の名称はマイクロクレジットである。",
      "エ": "NGOは非政府組織であり、マイクロクレジットは通常の金融サービスを利用しにくい人への少額融資である。",
      "オ": "PKOは平和維持活動を指す。金融技術全般を指すフィンテックも、この融資の名称ではない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号10。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-11",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 11,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "場合の数"
    ],
    "difficulty": 2,
    "question": "0、1、2、3の中から数字を選んで3桁の整数を作るとき、3桁の整数は全部で何個できるか。ただし、同じ数字を繰り返し用いてよいものとする。",
    "choices": {
      "ア": "18個",
      "イ": "24個",
      "ウ": "48個",
      "エ": "64個",
      "オ": "256個"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "3桁の整数なので、百の位に0は置けず1、2、3の3通りである。数字を繰り返せるので十の位と一の位は4通りずつあり、積は3×4×4＝48となる。",
    "choiceExplanations": {
      "ア": "たとえば百の位を3通り、残りを3通り、2通りとすると18通りになるが、それは同じ数字を使わない場合である。",
      "イ": "十の位と一の位はそれぞれ4通りあるので、百の位を含めて3×4×4通りになる。",
      "ウ": "百の位は0を除く3通り、十の位と一の位は0も含む4通りずつなので、3×4×4＝48である。",
      "エ": "4³には百の位が0のものも含まれる。その16通りを除くと48通りである。",
      "オ": "4⁴は数字を4回選ぶ場合の数で、この問題では選ぶ桁は3つである。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号11。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-12",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 12,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "相似"
    ],
    "difficulty": 2,
    "question": "下の図のように4点A、B、C、Dがある。直線ABと直線CDは平行であり、直線ADと直線BCの交点をOとする。AB＝16、BO＝12、AO＝15、CD＝12のとき、COの長さは次のどれか。",
    "choices": {
      "ア": "8",
      "イ": "9",
      "ウ": "10",
      "エ": "11",
      "オ": "45/4"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "平行線から△ABOと△DCOが相似で、BOにCOが対応する。よってCO＝12×12÷16＝9である。",
    "choiceExplanations": {
      "ア": "COが8ならBO：CO＝12：8＝3：2となり、AB：CD＝4：3と一致しない。",
      "イ": "平行線から△ABOと△DCOが相似で、BOにCOが対応する。よってCO＝12×12÷16＝9である。",
      "ウ": "COが10ならBO：CO＝6：5となり、平行線でできる相似の比4：3と一致しない。",
      "エ": "ABからCDへの倍率は3/4である。BO＝12に同じ倍率をかけると9である。",
      "オ": "15×3/4はAOに対応するDOの長さである。COはBOに対応する。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号12。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "imageUrls": [
      "/questions/kyoin-gunma/2025/q12.webp"
    ],
    "imageAltTexts": [
      "線分ABとCDが平行で、ADとBCがOで交わる図"
    ]
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-13",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 13,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "比"
    ],
    "difficulty": 2,
    "question": "0でない数x、yがx：y＝2：5を満たすとき、（x＋y）：（2y－3x）を最も簡単な整数の比で表したものは次のどれか。",
    "choices": {
      "ア": "2：5",
      "イ": "5：2",
      "ウ": "7：4",
      "エ": "4：15",
      "オ": "11：13"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "x＝2k、y＝5kとおくと、前項x＋yは7k、後項2y－3xは10k－6k＝4kである。共通のkを除くと7：4となる。",
    "choiceExplanations": {
      "ア": "これはxとy自体の比である。問われているのはx、yから作った二つの式の比である。",
      "イ": "これはyとxを逆順にした比であり、和や差を計算した結果ではない。",
      "ウ": "x＝2k、y＝5kと置けば、x＋y＝7k、2y－3x＝4kとなる。",
      "エ": "4は後項の係数であり、前項は2＋5＝7である。",
      "オ": "後項は2×5－3×2＝4であり、13にはならない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号13。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-14",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 14,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "平方数"
    ],
    "difficulty": 2,
    "question": "756をできるだけ小さい自然数nで割って、ある自然数の2乗にする。自然数nは次のどれか。",
    "choices": {
      "ア": "3",
      "イ": "6",
      "ウ": "7",
      "エ": "21",
      "オ": "36"
    },
    "answer": [],
    "officialAnswerNumber": null,
    "explanation": "試験時の設問では商を自然数の平方に限ることが明記されていなかったため、群馬県は受験者全員を正答として扱った。公開問題の文面では、756＝2²×3³×7を21で割ると36＝6²になる。",
    "choiceExplanations": {
      "ア": "公開版の文面で756÷3＝252＝2²×3²×7となり、7の指数が奇数である。",
      "イ": "公開版の文面で756÷6＝126＝2×3²×7となり、自然数の平方ではない。",
      "ウ": "公開版の文面で756÷7＝108＝2²×3³となり、3の指数が奇数のままである。",
      "エ": "公開版の文面では756÷21＝36＝6²である。試験時の文言の誤りについては、県が全員に得点を与えた。",
      "オ": "公開版の文面で756÷36＝21＝3×7となり、自然数の平方ではない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/site/houdou/713945.html",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号14。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "officialScoring": {
      "kind": "credit-for-all",
      "reason": "試験時の設問中の文言の誤りにより、群馬県が全員を正答扱いとした。"
    }
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-15",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 15,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "数学",
    "topicTags": [
      "円周角"
    ],
    "difficulty": 3,
    "question": "右の図において、点A、B、P、Q₁、Q₄は円Oの周上の点である。∠AQ₁B、∠AQ₂B、∠AQ₃B、∠AQ₄B、∠AQ₅Bの中で、角の大きさが∠APBより大きくなる角の個数は次のどれか。ただし、∠APBは鋭角とする。",
    "choices": {
      "ア": "1個",
      "イ": "2個",
      "ウ": "3個",
      "エ": "4個",
      "オ": "5個"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "Q₁の角はPと同じ弧に対する円周角で等しく、円外のQ₂では小さくなる。円内のQ₃とQ₅、および弦ABの反対側の円周上のQ₄で角が大きくなる。",
    "choiceExplanations": {
      "ア": "反対側の円周上のQ₄だけでなく、円内のQ₃、Q₅から見た角も大きくなる。",
      "イ": "Q₃とQ₄に加え、弦ABの反対側の円内にあるQ₅から見た角も大きい。",
      "ウ": "Q₁では同じ弧ABに対する円周角になり、円外のQ₂では小さくなる。Q₃、Q₄、Q₅で大きくなる。",
      "エ": "Q₁はPと弦ABの同じ側の円周上にあり、角は等しい。Q₂も大きくならない。",
      "オ": "円外のQ₂から見た角は∠APBより小さく、Q₁から見た角は等しい。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号15。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "imageUrls": [
      "/questions/kyoin-gunma/2025/q15.webp"
    ],
    "imageAltTexts": [
      "円Oの周上にA、B、P、Q₁、Q₄があり、Q₂は円の外側、Q₃とQ₅は内側にある図"
    ]
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-16",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 16,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "理科",
    "topicTags": [
      "等加速度運動"
    ],
    "difficulty": 2,
    "question": "右の図のように、滑らかな斜面上に台車を乗せ、静かに手を離した。このとき、台車が斜面を下り始めたときから下り終わるまでの時間と移動距離の関係を表したグラフとして、最も適切なものはどれか。",
    "choices": {
      "ア": "時間とともに直線的に増え、途中から直線的に減るグラフ",
      "イ": "増加するにつれて傾きが小さくなるグラフ",
      "ウ": "原点から一定の傾きで増える直線のグラフ",
      "エ": "原点から増加し、傾きが次第に大きくなるグラフ",
      "オ": "最初は一定の傾きで増え、途中から水平になるグラフ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "台車には斜面方向に一定の加速度がはたらき、静止から速度が増す。移動距離は時間の2乗に比例するので、距離と時間のグラフの傾きは大きくなる。",
    "choiceExplanations": {
      "ア": "移動距離は積み重なる量であり、斜面を下る途中に減少しない。",
      "イ": "距離と時間のグラフの傾きは速さを表す。傾きが小さくなる曲線は減速を示す。",
      "ウ": "傾きが一定なら速さも一定になる。台車は静止から下り始めて加速する。",
      "エ": "滑らかな斜面では一定の加速度で速さが増す。静止からの移動距離は時間の2乗に比例する。",
      "オ": "水平部分は移動距離が増えず静止していることを示す。台車は斜面を下る間、加速する。"
    },
    "hasImage": true,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号16。解説は過去問AIの独自作成。",
    "license": "PREF-published",
    "imageUrls": [
      "/questions/kyoin-gunma/2025/q16.webp"
    ],
    "imageAltTexts": [
      "滑らかな斜面の上端に台車を置いて手を離す図"
    ],
    "choiceImageUrls": {
      "ア": "/questions/kyoin-gunma/2025/q16-1.webp",
      "イ": "/questions/kyoin-gunma/2025/q16-2.webp",
      "ウ": "/questions/kyoin-gunma/2025/q16-3.webp",
      "エ": "/questions/kyoin-gunma/2025/q16-4.webp",
      "オ": "/questions/kyoin-gunma/2025/q16-5.webp"
    }
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-17",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 17,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "理科",
    "topicTags": [
      "気体の性質"
    ],
    "difficulty": 2,
    "question": "次のア〜オの気体のうち、水上置換法で集めることが適している気体として、最も適切な組合せはどれか。\n\nア 水素　イ 塩素　ウ 二酸化炭素　エ アンモニア　オ 塩化水素",
    "choices": {
      "ア": "ア・ウ",
      "イ": "ア・エ",
      "ウ": "イ・ウ",
      "エ": "イ・オ",
      "オ": "エ・オ"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "水素は水にほとんど溶けず、二酸化炭素も塩素・アンモニア・塩化水素ほど水に取り込まれやすくはないため、この組合せが適切である。",
    "choiceExplanations": {
      "ア": "水素は水にほとんど溶けず、二酸化炭素も塩素・アンモニア・塩化水素ほど水に取り込まれやすくはないため、この組合せが適切である。",
      "イ": "水素は集められるが、アンモニアは水に非常によく溶ける。",
      "ウ": "塩素は水に溶け、一部が水と反応する。この方法で組み合わせるなら塩素より水素が適している。",
      "エ": "塩化水素は水に非常によく溶け、塩素も水に溶けて反応するため、どちらも適さない。",
      "オ": "アンモニアも塩化水素も水に非常によく溶けるので、水上での捕集には適さない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号17。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-18",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 18,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "理科",
    "topicTags": [
      "メンデル遺伝"
    ],
    "difficulty": 2,
    "question": "代々丸い種子をつくるエンドウのめしべに、代々しわのある種子をつくるエンドウの花粉を受粉させると、得られた種子はすべて丸い種子であった。この丸い種子をまいて育てたエンドウのめしべに、代々しわのある種子をつくるエンドウの花粉を受粉させたところ、全部で928個の種子が得られた。このうち丸い種子の個数として、最も適切なものはどれか。",
    "choices": {
      "ア": "0個",
      "イ": "232個",
      "ウ": "464個",
      "エ": "696個",
      "オ": "928個"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "丸をR、しわをrとすると、1回目でRrができ、Rrとrrの交配では丸いRrが半分になる。928÷2＝464である。",
    "choiceExplanations": {
      "ア": "丸い種子に育った交雑個体は丸の対立遺伝子を持ち、次世代に伝えることができる。",
      "イ": "232個は全体の1/4だが、今回の組合せはヘテロ接合体と劣性ホモ接合体なので丸としわは1：1と期待される。",
      "ウ": "丸をR、しわをrとすると、1回目でRrができ、Rrとrrの交配では丸いRrが半分になる。928÷2＝464である。",
      "エ": "696個は全体の3/4であり、Rr同士を交配した場合に期待される割合である。",
      "オ": "全て丸くなるのは、たとえば丸の純系RRとしわの純系rrを交配した場合である。今回は丸い親がRrである。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号18。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-19",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 19,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "理科",
    "topicTags": [
      "火山"
    ],
    "difficulty": 2,
    "question": "気象庁によると、赤城山は成層火山である。成層火山について述べた文として、最も適切なものはどれか。",
    "choices": {
      "ア": "ハワイ島にあるマウナロアは、代表的な成層火山である。",
      "イ": "マグマの粘り気は、盛り上がった形の火山のマグマに比べて大きい。",
      "ウ": "マグマは、傾斜の緩やかな形の火山のマグマに比べて有色鉱物になる成分を多く含む。",
      "エ": "噴火が起こると、火口で溶岩が固まることが多い。",
      "オ": "噴火の様子は、盛り上がった形の火山に比べて穏やかである。"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "中学理科で比較する典型例では、成層火山のマグマは溶岩ドームをつくる非常に粘性の高いものより流れやすく、噴火も比較的穏やかである。",
    "choiceExplanations": {
      "ア": "マウナロアは流動性の高い溶岩が広がってできた盾状火山である。",
      "イ": "一般に溶岩ドームをつくるマグマは粘性が高く、成層火山のマグマより流れにくい。",
      "ウ": "傾斜の緩い盾状火山をつくる玄武岩質マグマのほうが、一般に有色鉱物になりやすい鉄・マグネシウムに富む。",
      "エ": "火口付近で粘性の高い溶岩が盛り上がって固まるのは溶岩ドームの特徴である。成層火山は溶岩流と火砕物が繰り返し積み重なる。",
      "オ": "中学理科で比較する典型例では、成層火山のマグマは溶岩ドームをつくる非常に粘性の高いものより流れやすく、噴火も比較的穏やかである。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号19。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-20",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 20,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "理科",
    "topicTags": [
      "発電方式"
    ],
    "difficulty": 2,
    "question": "次の発電方法のうち、蒸気によって発電機を回して発電させるしくみをもつ発電方法として、最も適切な組合せはどれか。",
    "choices": {
      "ア": "火力発電・水力発電・原子力発電",
      "イ": "火力発電・原子力発電・地熱発電",
      "ウ": "火力発電・太陽光発電・地熱発電",
      "エ": "水力発電・原子力発電・太陽光発電",
      "オ": "水力発電・太陽光発電・地熱発電"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "火力発電、原子力発電、地熱発電には、それぞれ燃料の燃焼熱、核分裂の熱、地下の熱で得た蒸気を使ってタービンを回す方式がある。水力は水の流れ、太陽光は太陽電池を使う。",
    "choiceExplanations": {
      "ア": "水力発電では水の流れや落差で水車を回し、蒸気を使わない。",
      "イ": "代表的な方式では、燃料の燃焼熱、核分裂の熱、地下の熱で得た蒸気でタービンを回して発電する。",
      "ウ": "太陽光発電は太陽電池で光エネルギーを直接電気に変換する。",
      "エ": "原子力発電は蒸気を利用するが、水力発電と太陽光発電は蒸気タービンによる発電ではない。",
      "オ": "地熱発電は蒸気でタービンを回す方式があるが、水力と太陽光は蒸気を使わない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号20。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-21",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 21,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "英語",
    "topicTags": [
      "句動詞"
    ],
    "difficulty": 2,
    "question": englishPassage + "\n\n" + "下線部について、本文中で使われている意味に最も近いものはどれか。",
    "choices": {
      "ア": "result",
      "イ": "lose",
      "ウ": "end",
      "エ": "cause",
      "オ": "change"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "lead to health issuesは「健康問題を引き起こす」という意味であり、cause health issuesに言い換えられる。",
    "choiceExplanations": {
      "ア": "「〜という結果を生む」はresult inと表せるが、result単独では本文の目的語をそのまま取れない。",
      "イ": "loseは「失う」で、化学物質が健康問題を発生させるという因果関係を表せない。",
      "ウ": "endは「終わる」または「終わらせる」を意味し、ここでは健康問題を発生させるという意味である。",
      "エ": "lead to health issuesは「健康問題を引き起こす」という意味であり、cause health issuesに言い換えられる。",
      "オ": "changeは「変わる」または「変える」を意味し、新たな健康問題が起きるという意味とは異なる。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号21。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-22",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 22,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "英語",
    "topicTags": [
      "数量表現"
    ],
    "difficulty": 2,
    "question": englishPassage + "\n\n" + "本文中の【a】に当てはまる語として、最も適するものはどれか。",
    "choices": {
      "ア": "less",
      "イ": "few",
      "ウ": "many",
      "エ": "much",
      "オ": "more"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "seafoodはここでは不可算名詞である。食生活を見直して魚介類を食べる量を減らすという意味なので、量を少なくする比較級lessが合う。",
    "choiceExplanations": {
      "ア": "seafoodはここでは不可算名詞である。摂取量を減らすという文脈にlessが合う。",
      "イ": "fewは数えられる複数名詞に付き、不可算名詞のseafoodの量を修飾できない。",
      "ウ": "manyは数えられる複数名詞の数が多いことを表し、seafoodの摂取量を減らす文脈にも合わない。",
      "エ": "muchは不可算名詞に使えるが、多量を意味するため、摂取を見直すという文脈に合わない。",
      "オ": "more seafoodは量を増やすという意味になる。ここでは化学物質の摂取を抑える方向で食生活を見直す話である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号22。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-23",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 23,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "英語",
    "topicTags": [
      "語彙"
    ],
    "difficulty": 2,
    "question": englishPassage + "\n\n" + "本文中の【b】に当てはまる語句として、最も適するものはどれか。",
    "choices": {
      "ア": "food allergy",
      "イ": "food chain",
      "ウ": "food bank",
      "エ": "food cost",
      "オ": "food crisis"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "food chainは「食物連鎖」である。長年のうちに化学物質が、ある生物が別の生物を食べる関係を通じて食物の中に入り込んだと述べている。",
    "choiceExplanations": {
      "ア": "食物アレルギーという意味で、化学物質が長年にわたって入り込む経路を指さない。",
      "イ": "food chainは食物連鎖であり、化学物質が食べるものを通じて生物に取り込まれる文脈に合う。",
      "ウ": "フードバンクは食品の寄付を受けて必要な人などに届ける活動や団体で、本文の蓄積の経路ではない。",
      "エ": "food costは食費や原材料費を指し、化学物質が入り込む経路にはならない。",
      "オ": "food crisisは食料危機を指し、本文では食物連鎖を通じた化学物質の移行を扱う。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号23。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-24",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 24,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "英語",
    "topicTags": [
      "接続詞"
    ],
    "difficulty": 2,
    "question": englishPassage + "\n\n" + "本文中の【c】に当てはまる語として、最も適するものはどれか。",
    "choices": {
      "ア": "since",
      "イ": "unless",
      "ウ": "but",
      "エ": "because",
      "オ": "if"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "教授が望むのは、魚介類を楽しむことと、リスクも意識することの両方である。後半を付け加えながら対比させるので、but alsoが適する。",
    "choiceExplanations": {
      "ア": "sinceは時の起点や理由を示す。ここは魚介類を楽しむことに加えて危険性も意識する、というつなぎ方である。",
      "イ": "unlessは「〜でない限り」という条件を表すが、ここでは二つの意図を併記している。",
      "ウ": "楽しむこととリスクに注意を払うことを対比しつつ、but alsoで後者も必要だと付け加えている。",
      "エ": "becauseは理由を導くが、リスクを知ることが魚介類を楽しむ理由だとは述べていない。",
      "オ": "ifは条件を導くが、ここではto enjoyとto be awareという二つの行為をつないでいる。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号24。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-25",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 25,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "英語",
    "topicTags": [
      "内容一致"
    ],
    "difficulty": 2,
    "question": englishPassage + "\n\n" + "本文の内容と一致する文として、最も適するものはどれか。",
    "choices": {
      "ア": "Some researchers in the USA are waking up to the health risks of forever chemicals.",
      "イ": "People living close to the sea should be aware of forever chemicals.",
      "ウ": "Food wrappers include the most forever chemicals in man-made products.",
      "エ": "Professor Megan Romano tells us not to eat seafood any more.",
      "オ": "Forever chemicals were created in the 1930s, but now they aren’t found in daily use items."
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "米国の研究者は健康への影響を踏まえ、魚介類に含まれる化学物質について安全性の目安が必要だと述べている。",
    "choiceExplanations": {
      "ア": "米国の研究者は健康への影響を踏まえ、魚介類に含まれる化学物質について安全性の目安が必要だと述べている。",
      "イ": "本文は魚介類の消費者一般を取り上げており、海の近くに住む人に限定していない。",
      "ウ": "食品包装に含まれるとは述べているが、人工製品の中で含有量が最高という比較はしていない。",
      "エ": "教授は魚介類を食べないよう勧めているわけではないと明言し、その栄養面の利点も述べている。",
      "オ": "1930年代に開発された点は合うが、現在も食品の包装など日常的な製品に含まれると述べている。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号25。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-26",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 26,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "芸術",
    "topicTags": [
      "楽器の奏法"
    ],
    "difficulty": 2,
    "question": "楽器とその奏法として、正しいものの組合せはどれか。\n\nア 三味線：ハジキ\nイ ギター：タンギング\nウ リコーダー：サミング\nエ 箏：スクイばち",
    "choices": {
      "ア": "ア・イ",
      "イ": "ア・ウ",
      "ウ": "イ・ウ",
      "エ": "イ・エ",
      "オ": "ウ・エ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "三味線のハジキは指ではじいて鳴らす奏法である。リコーダーのサミングは親指で裏の穴の開き方を調節する。",
    "choiceExplanations": {
      "ア": "三味線のハジキは正しい。タンギングは舌で息を区切る管楽器の奏法である。",
      "イ": "三味線のハジキは指ではじいて鳴らす奏法である。リコーダーのサミングは親指で裏の穴の開き方を調節する。",
      "ウ": "リコーダーのサミングは正しいが、ギターは弦を鳴らす楽器であり、舌で音を区切るタンギングは用いない。",
      "エ": "タンギングは管楽器の奏法で、スクイばちは三味線などでばちをすくい上げる奏法である。",
      "オ": "リコーダーのサミングは正しい。箏は主に爪で弦をはじき、ばちを用いるスクイばちとは組み合わない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号26。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-27",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 27,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "芸術",
    "topicTags": [
      "美術作品と作者"
    ],
    "difficulty": 2,
    "question": "美術作品とその作者として、正しいものの組合せはどれか。\n\nア ゲルニカ：アンリ・マティス\nイ ダヴィデ：レオナルド・ダ・ヴィンチ\nウ 見返り美人図：菱川師宣\nエ 笛を吹く少年：エドゥワール・マネ",
    "choices": {
      "ア": "ア・イ",
      "イ": "ア・ウ",
      "ウ": "イ・ウ",
      "エ": "イ・エ",
      "オ": "ウ・エ"
    },
    "answer": "オ",
    "officialAnswerNumber": 5,
    "explanation": "『見返り美人図』は菱川師宣による肉筆浮世絵である。『笛を吹く少年』はフランスの画家エドゥワール・マネの作品で、この二つの組合せが合う。",
    "choiceExplanations": {
      "ア": "『ゲルニカ』はピカソの絵画であり、著名な大理石像『ダヴィデ』はミケランジェロの作品である。",
      "イ": "『見返り美人図』は菱川師宣の作品だが、『ゲルニカ』を描いたのはピカソである。",
      "ウ": "『見返り美人図』の作者は合っているが、『ダヴィデ』はレオナルド・ダ・ヴィンチの作品ではない。",
      "エ": "『笛を吹く少年』の作者はマネである。著名な大理石像『ダヴィデ』はミケランジェロが制作した。",
      "オ": "『見返り美人図』は菱川師宣の肉筆浮世絵で、『笛を吹く少年』はエドゥワール・マネの絵画である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号27。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-28",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 28,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育法規",
    "topicTags": [
      "教育基本法"
    ],
    "difficulty": 2,
    "question": "次の文は、教育基本法第九条の条文である。空欄（ア）〜（エ）に当てはまる語として、正しいものの組合せはどれか。\n\n第九条　法律に定める学校の教員は、自己の（ア）な使命を深く自覚し、絶えず研究と修養に励み、その（イ）の遂行に努めなければならない。\n2　前項の教員については、その使命と（イ）の重要性にかんがみ、その身分は（ウ）され、待遇の適正が期せられるとともに、（エ）と研修の充実が図られなければならない。",
    "choices": {
      "ア": "（ア）崇高　（イ）職責　（ウ）尊重　（エ）福利",
      "イ": "（ア）明確　（イ）業務　（ウ）保障　（エ）養成",
      "ウ": "（ア）崇高　（イ）職責　（ウ）尊重　（エ）養成",
      "エ": "（ア）明確　（イ）職責　（ウ）保障　（エ）福利",
      "オ": "（ア）崇高　（イ）業務　（ウ）保障　（エ）養成"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "教育基本法第9条は、教員に崇高な使命を自覚して職責の遂行に努めるよう求めている。第2項に教員の身分の尊重と、養成・研修の充実が定められている。",
    "choiceExplanations": {
      "ア": "第2項が研修と並べて充実を求めるのは「養成」である。",
      "イ": "養成は正しいが、条文は「崇高な使命」「職責」「身分は尊重され」と定める。",
      "ウ": "第1項の「崇高な使命」「職責」と、第2項の「身分は尊重され」「養成と研修」が全て一致する。",
      "エ": "職責は合うが、使命は崇高、身分は尊重、研修と並ぶのは養成である。",
      "オ": "崇高と養成は合うが、遂行に努める対象は「職責」で、身分について条文が用いる語は「尊重」である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号28。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-29",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 29,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育法規",
    "topicTags": [
      "地方公務員法"
    ],
    "difficulty": 3,
    "question": "次のア〜オの中で、地方公務員法の条文として、正しいものの組合せはどれか。\n\nア　すべて職員は、全体の奉仕者として公共の利益のために勤務し、且つ、職務の遂行に当つては、全力を挙げてこれに専念しなければならない。\nイ　職員は、その職務を遂行するに当つて、法令、条例、地方公共団体の規則及び地方公共団体の機関の定める規程に従うものであり、上司の職務上の命令に従うものではない。\nウ　職員は、その職の信用を傷つけ、又は職員の職全体の不名誉となるような行為をしてはならない。\nエ　職員は、その職に就いている間に限り、職務上知り得た秘密を漏らしてはならない。\nオ　職員は、法律又は条例に特別の定がある場合を除く外、その勤務時間及び職務上の注意力のすべてをその職責遂行のために用い、当該地方公共団体がなすべき責を有する職務にのみ従事しなければならない。",
    "choices": {
      "ア": "ア・イ・ウ",
      "イ": "ア・ウ・オ",
      "ウ": "ア・エ・オ",
      "エ": "イ・ウ・エ",
      "オ": "イ・エ・オ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "アは第30条の服務の根本基準、ウは第33条の信用失墜行為の禁止、オは第35条の職務専念義務に合致する。イとエはそれぞれ職務命令と退職後の守秘義務を取り落としている。",
    "choiceExplanations": {
      "ア": "イは誤りである。第32条では上司の職務上の命令にも忠実に従わなければならない。",
      "イ": "アは第30条の服務の根本基準、ウは第33条の信用失墜行為の禁止、オは第35条の職務専念義務である。",
      "ウ": "エは誤りである。第34条第1項の秘密を守る義務は退職後も続く。",
      "エ": "ウは第33条に合うが、第32条は職務命令への服従を求め、第34条は退職後にも守秘義務を課す。",
      "オ": "オは第35条に合うが、イは職務命令に従う義務を、エは退職後の守秘義務を取り落としている。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号29。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-30",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 30,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育心理",
    "topicTags": [
      "動機づけ"
    ],
    "difficulty": 2,
    "question": "次の文は、心理学の用語について説明したものである。文中の空欄（　）に当てはまる語句として、正しいものはどれか。\n\nもともと内発的に動機づけられていた行動に対して報酬を与えると、その内発的動機づけが弱まり、報酬がなければ行動が起こりにくい受動的な状態になることを（　）という。",
    "choices": {
      "ア": "アンダーマイニング効果",
      "イ": "エンハンシング効果",
      "ウ": "負の強化",
      "エ": "スランプ",
      "オ": "プラトー"
    },
    "answer": "ア",
    "officialAnswerNumber": 1,
    "explanation": "もともと面白いから取り組んでいた活動に外的報酬を加えると、活動自体への関心が弱まり、報酬がなくなると行動が減ることがある。これをアンダーマイニング効果という。",
    "choiceExplanations": {
      "ア": "自ら興味を持ってしていた行動に外的報酬が加わり、もともとの内発的動機づけが低くなる現象である。",
      "イ": "エンハンシング効果は、肯定的なフィードバックなどで内発的動機づけが高まる場合を指す。",
      "ウ": "負の強化では、行動に続いて嫌な刺激を取り除くことで、その行動の頻度が高まる。",
      "エ": "スランプは一時的に成績や調子が落ちる状態であり、報酬が動機づけに及ぼす特定の効果ではない。",
      "オ": "プラトーは練習を重ねても成績の向上が一時的に停滞する状態である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号30。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-31",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 31,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育心理",
    "topicTags": [
      "適応機制"
    ],
    "difficulty": 3,
    "question": "「適応機制」に関する用語の説明として、正しいものの組合せはどれか。\n\nア　「投射（投影）」とは、自己の内に存在する認めがたい欲求や感情を自分から排除して、他者がもっていると認知する機制のことである。\nイ　「抑圧」とは、ある目標を達成しようという欲求がかなえられないとき、その欲求が向けられている対象と類似した別の対象に置き換えることで欲求不満の解消がなされることである。\nウ　「昇華」とは、社会的に許容されない性的欲求や攻撃欲求が社会的、文化的に価値の高い目的に向けられ、努力することである。\nエ　「退行」とは、解決することが困難な状況で、自我が合理的な対処法を放棄して、より未発達な段階に逆戻りすることである。\nオ　「逃避」とは、自己のある弱点に対する非難を避けるために、これと正反対の行動や態度をとることである。",
    "choices": {
      "ア": "ア・イ・オ",
      "イ": "ア・ウ・エ",
      "ウ": "ア・ウ・オ",
      "エ": "イ・ウ・エ",
      "オ": "イ・エ・オ"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "他者の感情とみなすのが投射、社会的価値のある方向へ向けるのが昇華、以前の発達段階に戻るのが退行である。",
    "choiceExplanations": {
      "ア": "アは投射に合うが、イの対象の置換えは代償、オの反対の態度は反動形成に近い。",
      "イ": "他者の感情とみなすのが投射、社会的価値のある方向へ向けるのが昇華、以前の発達段階に戻るのが退行である。",
      "ウ": "アとウは正しいが、オのように反対の態度を取るのは逃避ではなく反動形成に当たる。",
      "エ": "ウとエは正しいが、抑圧は受け入れがたい欲求などを意識から締め出す機制である。",
      "オ": "エは正しいが、イの対象の置換えとオの反対の行動は、それぞれ抑圧と逃避の説明になっていない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号31。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-32",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 32,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "学校保健",
    "topicTags": [
      "熱中症予防"
    ],
    "difficulty": 2,
    "question": "熱中症予防に関する説明について、正しいものの組合せはどれか。\n\nア　暑さ指数（WBGT）は、熱中症を予防することを目的として1954年に日本で提案された指標である。\nイ　暑さ指数（WBGT）は、人体の熱収支に与える影響の大きい「気圧」、「日射・輻射など周辺の熱環境」、「気温」の3つを取り入れた指標である。\nウ　熱中症を引き起こす条件は、「環境」と「からだ」と「行動」によるものが考えられ、「環境」の要因は、気温が高い、湿度が高い、風が弱いなどが挙げられる。\nエ　熱中症を予防するためには、涼しい服装の選択、日陰の利用、日傘や帽子の使用、水分や塩分補給をすることなどが効果的である。\nオ　熱中症予防運動指針（日本スポーツ協会「スポーツ活動中の熱中症予防ガイドブック」）に示されている、「運動は原則中止」とされる暑さ指数（WBGT）は、35以上である。",
    "choices": {
      "ア": "ア・イ",
      "イ": "ア・ウ",
      "ウ": "イ・オ",
      "エ": "ウ・エ",
      "オ": "エ・オ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "高温・多湿・弱い風は環境要因であり、涼しい服装、日陰の利用や適切な水分・塩分補給は予防に有効である。",
    "choiceExplanations": {
      "ア": "暑さ指数は米国で提案された。また、その要素には気圧ではなく湿度が入る。",
      "イ": "ウの気温・湿度・風は環境要因である。アの提案国は日本ではなく米国である。",
      "ウ": "暑さ指数に含まれるのは湿度、熱環境、気温である。日本スポーツ協会の原則中止は31以上である。",
      "エ": "高温・多湿・弱い風は環境要因であり、涼しい服装、日陰の利用や適切な水分・塩分補給は予防に有効である。",
      "オ": "エは正しいが、運動を原則中止とする指針の基準は暑さ指数31以上である。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号32。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-33",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 33,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "学校保健",
    "topicTags": [
      "AED"
    ],
    "difficulty": 2,
    "question": "応急手当の必要な場面で使用するAEDに関する説明について、正しいものの組合せはどれか。\n\nア　傷病者のプライバシーを考え、衣服の上から電極パッドを貼るようにする。\nイ　電極パッドが貼り付きにくいときは、周囲の人に電極パッドを手で押さえてもらいながら電気ショックボタンを押す。\nウ　非医療従事者であっても、音声ガイドや取扱説明に従って、AEDを使用し、傷病者の心肺蘇生を行うことができる。\nエ　感電の可能性があるので、電気ショックを行った後は、そのまま傷病者に触れることなく、意識の回復を待つようにする。\nオ　心停止には、電気ショックの適応とならない場合もあるが、AEDが、自動的に心臓の状態を判断し、電気ショックが必要かどうかを教えてくれる。",
    "choices": {
      "ア": "ア・イ",
      "イ": "ア・ウ",
      "ウ": "イ・エ",
      "エ": "ウ・オ",
      "オ": "エ・オ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "非医療従事者でもAEDの音声案内に従って使える。心停止でもすべてが電気ショックの適応になるわけではなく、AEDは心電図を解析してショックが必要か知らせる。",
    "choiceExplanations": {
      "ア": "パッドは衣服の上ではなく皮膚に直接貼り、ショック時には傷病者から全員が離れる。",
      "イ": "一般の人がAEDを使えるというウは正しいが、電極パッドは胸の皮膚に直接貼る。",
      "ウ": "ショック時は誰も傷病者やパッドに触れないようにする。ショック後はAEDの指示に従って胸骨圧迫を再開する。",
      "エ": "一般の人も音声案内に従って使うことができ、AEDは心電図を解析して電気ショックの要否を知らせる。",
      "オ": "オは正しいが、ショック後は意識の回復を待つのではなく、AEDの案内に従って心肺蘇生を続ける。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号33。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-34",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 34,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育施策",
    "topicTags": [
      "外国人児童生徒等の教育"
    ],
    "difficulty": 3,
    "question": "「外国人児童生徒等の教育の充実について（報告）」（令和2年3月 外国人児童生徒等の教育の充実に関する有識者会議）において示された取組の方向性について、正しいものの組合せはどれか。\n\nア　日本に在留する外国人の数が大きく減少する中で、外国人の子供たちが将来にわたって日本に居住し、日本国籍を取得することで今後の日本を形成する存在となるよう、関連施策を充実させる必要がある。\nイ　外国人の子供たちが日本における生活の基礎を身に付け、その能力を伸ばし、未来を切り拓くことができるようにすることは、国際人権規約に基づく確固とした権利であり、「誰一人取り残さない」という発想に立ち、社会全体としてその環境を提供できるようにしなければならない。\nウ　日本語の能力が十分でない外国人の子供たちは、言葉のハンディから、学習や交友関係の形成に困難を抱えがちである。このため、適切な指導の下で将来への現実的な展望が持てるよう、学校の内外を通じ、STEAM教育を中心とした個別の学びを提供する必要がある。\nエ　外国人の子供たちのアイデンティティの確立を支え、自己肯定感を育むとともに、家族関係の形成に資するためには、これまで以上に日本語、日本文化の学びに対する支援に取り組むことに加え、地域の関係機関と連携した学校外の取組を進めていくことが特に重要である。\nオ　日本人の子供たちと外国人の子供たちがともに学習する機会を活かし、多様性は社会を豊かにするという価値観の醸成や、グローバル人材の育成など、異文化理解・多文化共生の考え方に基づく教育に更に取り組むべきである。",
    "choices": {
      "ア": "ア・ウ",
      "イ": "ア・エ",
      "ウ": "イ・エ",
      "エ": "イ・オ",
      "オ": "ウ・オ"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "外国人の子供の学びを権利として保障し、ともに学ぶ機会を異文化理解と多文化共生につなげるという方向性である。",
    "choiceExplanations": {
      "ア": "報告は在留外国人の増加を背景にしている。また、日本語の困難に対しては日本語指導や教科の学習支援を重視する。",
      "イ": "アの在留外国人の減少・国籍取得という説明は報告の方向性と異なる。エの箇所では母語・母文化の学びへの支援が挙げられている。",
      "ウ": "イは学ぶ環境を確保する権利についての記述と合う。エは、報告が重視する母語・母文化を日本語・日本文化に置き換えている。",
      "エ": "外国人の子供の学びを権利として保障し、ともに学ぶ機会を異文化理解と多文化共生につなげるという方向性である。",
      "オ": "オは報告に沿うが、ウの「STEAM教育を中心」とする説明は、日本語の力や教科の学びを支える取組の記述に合わない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号34。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-35",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 35,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育施策",
    "topicTags": [
      "日本版DBS"
    ],
    "difficulty": 2,
    "question": "令和6年6月の国会で、「日本版DBS」を導入するための法律が成立した。この「日本版DBS」についての説明として正しいものはどれか。",
    "choices": {
      "ア": "氏名、生年月日、住所だけでなく成績や健康面の留意事項など、教育に関するあらゆる情報をデータベース化して進学先の学校へ引き継ぐ仕組みである。",
      "イ": "全ての学校に設置されている学校いじめ対策組織が、校内のいじめ対応に当たって平時から実効的な役割を果たし、重大事態が発生した際も、学校と設置者が連携して対応をとれるようにするための仕組みである。",
      "ウ": "未来へ責任ある行動をとる態度とスキルを育成する国際的教育プログラムの日本版である。",
      "エ": "教育・保育施設等や子供が活動する場（放課後児童クラブ、学習塾、スポーツクラブ、部活動など）等において、学校設置者や事業者等が、業務を行わせる者について、特定性犯罪前科の有無を確認する仕組みである。",
      "オ": "デジタル掲示板の仕組みを生かし、児童生徒同士が意見をやりとりすることができる日本独自のオンライン情報共有システムである。"
    },
    "answer": "エ",
    "officialAnswerNumber": 4,
    "explanation": "こども性暴力防止法は、対象の学校設置者や事業者等が、こどもと接する対象業務に従事する者について特定性犯罪前科の有無を確認することを定める。",
    "choiceExplanations": {
      "ア": "日本版DBSでは子供に接する業務に就く人の特定性犯罪前科を確認する。生徒の成績等を引き継ぐ制度ではない。",
      "イ": "これは学校のいじめ対応に関わる説明であり、日本版DBSはこどもに対する性暴力を防ぐための取組である。",
      "ウ": "日本版DBSの中心は教育プログラムではなく、対象業務の従事者の特定性犯罪前科の有無を確認する仕組みである。",
      "エ": "こども性暴力防止法は、対象の学校設置者や事業者等が、こどもと接する対象業務に従事する者について特定性犯罪前科の有無を確認することを定める。",
      "オ": "児童生徒の情報共有の仕組みではなく、こどもに接する業務に関する性暴力防止の仕組みである。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号35。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-36",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 36,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育施策",
    "topicTags": [
      "COCOLOプラン"
    ],
    "difficulty": 3,
    "question": "文部科学省が令和5年3月にとりまとめた「誰一人取り残されない学びの保障に向けた不登校対策」（COCOLOプラン）について、正しいものの組合せはどれか。\n\nア　仮に不登校になったとしても、多様な学びにつながることができるよう、個々のニーズに応じた受け皿を整備するとしている。\nイ　不登校の定義を変更することで、対象者を絞って手厚い支援につなげるとしている。\nウ　心の小さなSOSを見逃さず、「チーム学校」で支援する取組の一つとして、1人1台端末を活用し、心や体調の変化の早期発見を推進するとしている。\nエ　財務省と連携し、公立、私立を問わず高校の授業料を無償化するなど、誰一人取り残されない学びの保障につなげるための新たな支援制度の制定を目指すとしている。\nオ　学校の風土の「見える化」を通して、学校を「みんなが安心して学べる」場所にするとしている。",
    "choices": {
      "ア": "ア・イ・ウ",
      "イ": "ア・イ・オ",
      "ウ": "ア・ウ・オ",
      "エ": "イ・ウ・エ",
      "オ": "ウ・エ・オ"
    },
    "answer": "ウ",
    "officialAnswerNumber": 3,
    "explanation": "個々に応じた学びの確保、心身の変化の早期発見を含むチーム学校の支援、安心できる学校づくりに対応する。",
    "choiceExplanations": {
      "ア": "アとウは正しいが、プランは不登校の定義変更で対象を絞る方針を示していない。",
      "イ": "多様な学びの受け皿と学校風土の見える化は柱に含まれるが、イの対象者を絞るという説明は合わない。",
      "ウ": "個々に応じた学びの確保、心身の変化の早期発見を含むチーム学校の支援、安心できる学校づくりに対応する。",
      "エ": "ウの端末活用は含まれるが、不登校の定義変更や公私を問わない高校授業料無償化はプランの取組に含まれない。",
      "オ": "ウとオは含まれるが、エの高校授業料無償化の制度制定はこのプランが掲げるものではない。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号36。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  },
  {
    "id": "kyoin-gunma-2025-annual-kyotsu-37",
    "exam": "kyoin-gunma",
    "session": "kyotsu",
    "year": 2025,
    "season": "annual",
    "qNumber": 37,
    "examDate": "2025-07-06",
    "type": "multiple-choice",
    "category": "教育施策",
    "topicTags": [
      "教師を取り巻く環境整備"
    ],
    "difficulty": 3,
    "question": "次の文は、「『令和の日本型学校教育』を担う質の高い教師の確保のための環境整備に関する総合的な方策について〜全ての子供たちへのよりよい教育の実現を目指した、学びの専門職としての『働きやすさ』と『働きがい』の両立に向けて〜（答申）」（令和6年8月27日 中央教育審議会）における「第2章 教師を取り巻く環境整備の基本的な考え方」の一部（抜粋）である。文中の空欄（ア）〜（ウ）に当てはまる語句として、正しいものの組合せはどれか。\n\n〇 今般の教師を取り巻く環境整備の最終的な目的は、学校教育の質の向上を通した、「全ての子供たちへのよりよい教育の実現」である。\n\n〇 具体的には、教師のこれまでの働き方を見直し、長時間勤務の是正を図ることで、教師の健康を守ることはもとより、日々の生活の質や教職人生を豊かにするなど教師の（ア）を向上させることが重要である。また、自らの人間性や創造性を高め、その（イ）が最大限発揮できる勤務環境を整備し、教師がその高い専門性を大いに発揮できるようにすることにより、子供たちに対してよりよい教育を行うことができるようになる。\n\n〇 さらに、新たな学びの実現に向けて、高度専門職である教師が、働き方改革により創出した時間も活用しつつ、教職生涯を通じて新しい知識・技能等を学び続け資質能力の向上を図り、子供一人一人の学びを最大限に引き出す教師としての役割を果たすことが重要である。あわせて、（ウ）人材を教育界内外から確保することにより、質の高い教職員集団を実現していくことは、我が国の学校教育の質を高め、子供たちに対してよりよい教育を行うために重要なことである。",
    "choices": {
      "ア": "（ア）指導力　（イ）意欲と能力　（ウ）多様な",
      "イ": "（ア）ウェルビーイング　（イ）意欲と能力　（ウ）多様な",
      "ウ": "（ア）ウェルビーイング　（イ）知識と経験　（ウ）多様な",
      "エ": "（ア）指導力　（イ）知識と経験　（ウ）グローバルな",
      "オ": "（ア）ウェルビーイング　（イ）意欲と能力　（ウ）グローバルな"
    },
    "answer": "イ",
    "officialAnswerNumber": 2,
    "explanation": "働き方の見直しでウェルビーイングを高め、意欲と能力を発揮できる環境を整え、教育界内外から多様な人材を確保すると述べている。",
    "choiceExplanations": {
      "ア": "意欲と能力、多様なは合うが、日々の生活の質や教職人生を豊かにすることはウェルビーイングの向上として述べられている。",
      "イ": "働き方の見直しでウェルビーイングを高め、意欲と能力を発揮できる環境を整え、教育界内外から多様な人材を確保すると述べている。",
      "ウ": "アとウは合うが、整備した勤務環境で最大限に発揮できるようにするのは「意欲と能力」である。",
      "エ": "答申は生活の質を含むウェルビーイングを重視し、「意欲と能力」を発揮できる環境と「多様な」人材を挙げている。",
      "オ": "アとイは合っているが、教育界内外から確保する人材は「多様な」と記されている。"
    },
    "hasImage": false,
    "sourcePdfUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf",
    "sourceAnswerUrl": "https://www.pref.gunma.jp/uploaded/attachment/683278.pdf#page=17",
    "sourceAttribution": "出典：群馬県教育委員会 令和8年度採用 群馬県公立学校教員選考試験（2025年度実施） 一般教養・教職に関する科目 解答番号37。解説は過去問AIの独自作成。",
    "license": "PREF-published"
  }
];
