import type { Question } from "@/lib/questions/types";

export const AP_QUESTIONS_2017_AUTUMN_PM: Question[] = [
  {
    id: "ap-2017a-pm-q2",
    exam: "ap",
    session: "pm",
    year: 2017,
    season: "autumn",
    qNumber: 2,
    type: "descriptive",
    category: "経営戦略",
    topicTags: ["財務分析", "損益分岐点", "設備投資"],
    difficulty: 4,
    question: `次の問2〜問11については4問を選択し，答案用紙の選択欄の問題番号を○印で囲んで解答してください。なお，5問以上○印で囲んだ場合は，はじめの4問について採点します。

電子部品会社の経営戦略に関する次の記述を読んで，設問1〜4に答えよ。

A社は，電子部品を製造する中堅企業である。優秀な技術者が生み出す高性能，高品質な製品が強みであり，異なる種類の製品を製造するP事業部とQ事業部から成る。創業以来急成長しており売上は伸びていたが，当期は外部環境の悪化によって大幅な減益の見込みである。A社のF取締役は，この状況に強い危機感を抱き，利益を確保して成長を目指す中期計画を策定すべく，経営企画部のG課長に経営戦略の立案を指示した。

〔環境分析〕

G課長は，経営戦略の立案に当たり，まず①ファイブフォース分析とSWOT分析に基づき，事業分野別に環境分析を実施した。

P事業についての環境分析は，次のとおりである。

- A社の創業以来の主力事業であり，売上の80%を占める。国内売上は業界3位である。
- 過去数年間は市場全体の需要が伸びていたが，前期から過当競争によって，競争環境が急速に厳しくなっており，今後の売上は横ばいと見込まれる。
- 原材料として不可欠な希少金属の需給ひっ迫によって，原材料価格が高騰している。
- 当期に，顧客企業である電機メーカ大手が事業統合し，市場が二つのグループに集約された影響で，今後は寡占市場への部品供給となる。
- 顧客企業からの値下げ要求と，原価上昇によって，収益性が大幅に悪化しており，一部の製品で採算割れとなっている。
- 外資系のB社がP事業と同じ市場に参入し，A社よりも安価な製品を来年発売予定である。

一方，Q事業についての環境分析は，次のとおりである。

- Q事業は，A社の売上の20%を占め，その国内売上は，トップのD社に次いで業界2位である。
- A社とD社の製品は性能，品質がほぼ同等である。D社は短納期対応が強みである。小型化・軽量化に関してはA社が先行し，独自の微細加工技術と特許をもっている。
- Q事業は数年前にできた市場だが，新規参入企業が増えており，IoTの流れに乗って，今後5年間で市場が10倍になると予測される。
- 現在は自動車業界向けの需要が多いが，今後の需要の伸びでは医療機器業界向けが最大になると予測される。医療機器メーカからは，短納期要求は少ないが，医療機器の小型化に伴って，電子部品も一層の小型化・軽量化が求められる。
- A社は，業界トップの大手医療機器メーカE社における新型機器開発に向けての実証実験に参加した結果，小型化・軽量化の点で高い評価を受け，採用がほぼ決まった。E社向けの量産化は早ければ来期から始まり，再来期に本格化される見通しである。現在，A社に十分な供給力があるとは言えず，今後も事態が改善しないと判断されれば，A社の採用が見送られD社が採用される可能性がある。

〔財務分析〕

G課長はA社の財務状況を把握するために，直近の財務諸表を確認し，分析を行った。A社の貸借対照表，損益計算書，キャッシュフロー計算書及び財務分析は，表1〜4のとおりであり，減価償却費は前期160（百万円），当期見込145（百万円）である。

経年分析や業界標準との比較による分析の結果，収益性に問題があることが分かった。G課長は，分析結果をF取締役に報告したところ，②損益分岐点を下げるためには何をすればよいかを検討するよう指示された。

〔経営戦略〕

F取締役は，〔環境分析〕及び〔財務分析〕の結果に基づき，A社の経営戦略を次のように定めた。

- P事業は，製品ライフサイクルの［c］移行したので，投資を凍結することによって，損益分岐点を下げて利益を確保する。
- Q事業は，製品ライフサイクルの［d］移行しつつあるので，経営資源を集中し，③差別化によって成長を加速させ，業界トップの地位を目指す。

〔設備投資計画〕

F取締役は，次の指針でQ事業の生産能力増強に向けた設備投資計画を作成するようにG課長に指示した。

- 策定した〔経営戦略〕に沿った設備投資計画とすること
- 投資が適切かどうかを判断するために，経済性計算を実施すること
- 設備投資がキャッシュフローに与える影響を考慮すること

G課長は，来期の設備投資計画案を三つ作成し，F取締役に提出した。

なお，資本コストとは，借入れや株式などで資本を調達するために必要なコストである。

案1：［e］キャッシュフローがマイナスにならない範囲で，設備投資を複数期にかけて実施する。内部利益率（以下，IRRという）は3%，資本コストは4%と想定する。

案2：銀行借入300百万円によって，来期に設備投資を一気に実施することで，売上を増加させる。IRRは8%，資本コストは5%と想定する。

案3：来期は設備投資を見送る。この場合，来期の売上は減少が見込まれる。

F取締役は，④検討の結果，最終的に案2を採用した。

**設問1** 本文中の下線①について，“買い手の交渉力”の変化によって，A社のP事業が受ける影響を，本文中の内容に沿って，35字以内で述べよ。

**設問2** 〔財務分析〕について，(1)〜(3)に答えよ。

(1) 表3中の［a］に入れる適切な数値を答えよ。

(2) 表4中の［b］に入れる適切な数値を答えよ。答えは，小数第1位を四捨五入し，整数で求めよ。

(3) 本文中の下線②について，来期にA社が損益分岐点を下げるためにとるべき最も有効な方策を解答群の中から選び，記号で答えよ。

解答群

ア 固定費を120（百万円）減少させ，変動費率を50%に増加させる。

イ 固定費を60（百万円）増加させ，変動費率を43%に減少させる。

ウ 固定費を90（百万円）増加させ，変動費率を40%に減少させる。

**設問3** 〔経営戦略〕について，(1)，(2)に答えよ。

(1) 本文中の［c］，［d］に入れる最も適切な字句を解答群の中から選び，記号で答えよ。

解答群

ア 成長期から衰退期に　イ 成長期から成熟期に

ウ 導入期から成熟期に　エ 導入期から成長期に

(2) 本文中の下線③について，どのような市場ニーズに対してどのようにD社との差別化を図るかを40字以内で述べよ。

**設問4** 〔設備投資計画〕について，(1)，(2)に答えよ。

(1) 本文中の［e］に入れる最も適切な字句を解答群の中から選び，記号で答えよ。

解答群

ア 営業活動による　イ 投資活動による

ウ 財務活動による　エ フリー

(2) 本文中の下線④について，三つの案の中から案2が最も妥当と判断した理由を，財務の観点から40字以内で述べよ。`,
    answer: `**設問1** 顧客企業の市場寡占化によって，値下げ要求が強まる。

**設問2**

- (1) a　185
- (2) b　81
- (3) ウ

**設問3**

- (1) c　イ、d　エ
- (2) 医療機器の小型化ニーズに対して，強みの微細加工技術で差別化する。

**設問4**

- (1) e　エ
- (2) 内部利益率が資本コストを上回るのは案2だけだから`,
    explanation: "損益分岐点は固定費を限界利益率で割り、三つの案を同じ式で比較します。設備投資では、内部利益率が調達にかかる資本コストを上回るかを確認します。",
    hasImage: true,
    imageUrls: [
      "/images/ap/2017-autumn-pm/q2-table1.webp",
      "/images/ap/2017-autumn-pm/q2-table2.webp",
      "/images/ap/2017-autumn-pm/q2-table3.webp",
      "/images/ap/2017-autumn-pm/q2-table4.webp",
    ],
    imageAltTexts: ["表1 貸借対照表", "表2 損益計算書", "表3 キャッシュフロー計算書", "表4 財務分析"],
    sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=9",
    sourceAnswerUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=1",
    license: "IPA-public",
  },
  {
    "id": "ap-2017a-pm-q3",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 3,
    "type": "descriptive",
    "category": "アルゴリズム",
    "topicTags": [
      "ナップザック問題"
    ],
    "difficulty": 4,
    "question": "問3　ナップザック問題",
    "answer": "**設問１**\n\n- (1)　ア　6\n\n- イ　9\n\n- ウ　12\n\n- エ　15\n\n- (2)　A（ 0 ），B（ 1 ），C（ 1 ）\n\n**設問２**\n\n- オ　t－size[s]\n\n- カ　maxvalue[t]\n\n- キ　choice[k]\n\n- ク　maxvalue[V]\n\n**設問３**\n\n- ケ　NV",
    "explanation": "同じ品物を複数選べるため、品物の追加後と同じ行の小さい容量を参照します。選んだ品物の容積だけ容量を戻すと、価値合計を実現する組合せを復元できます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q03-p15.webp",
      "/questions/ipa/ap/2017-autumn-pm/q03-p16.webp",
      "/questions/ipa/ap/2017-autumn-pm/q03-p17.webp",
      "/questions/ipa/ap/2017-autumn-pm/q03-p18.webp"
    ],
    "imageAltTexts": [
      "問3 ナップザック問題（問題冊子 PDF 15ページ）",
      "問3 ナップザック問題（問題冊子 PDF 16ページ）",
      "問3 ナップザック問題（問題冊子 PDF 17ページ）",
      "問3 ナップザック問題（問題冊子 PDF 18ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=15",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=2",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q4",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 4,
    "type": "descriptive",
    "category": "システムアーキテクチャ",
    "topicTags": [
      "WebAPIの設計"
    ],
    "difficulty": 4,
    "question": "問4　WebAPIの設計",
    "answer": "**設問１**\n\n- 愛称，ユーザID，パスワード\n\n**設問２**\n\n- 設計方針　WebAPI へのアクセスは，全てHTTPS を用いて行う。\n\n- 理由　HTTP だと盗聴される危険があるから\n\n**設問３**\n\n- (1)　a　計測データ登録\n\n- (2)　b　イ\n\n- c　ウ\n\n- (3)　d　DELETE\n\n- e　GET\n\n- (4)　f　－\n\n- g　計測日時，計測値\n\n**設問４**\n\n- HTTP ステータスを400 で返す。",
    "explanation": "体重計がどの操作でデータを登録・取得・削除するかをユースケースに対応付けます。認証情報はHTTPSで保護し、必須項目を満たさない要求にはクライアントエラーを返します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q04-p19.webp",
      "/questions/ipa/ap/2017-autumn-pm/q04-p20.webp",
      "/questions/ipa/ap/2017-autumn-pm/q04-p21.webp",
      "/questions/ipa/ap/2017-autumn-pm/q04-p22.webp",
      "/questions/ipa/ap/2017-autumn-pm/q04-p23.webp"
    ],
    "imageAltTexts": [
      "問4 WebAPIの設計（問題冊子 PDF 19ページ）",
      "問4 WebAPIの設計（問題冊子 PDF 20ページ）",
      "問4 WebAPIの設計（問題冊子 PDF 21ページ）",
      "問4 WebAPIの設計（問題冊子 PDF 22ページ）",
      "問4 WebAPIの設計（問題冊子 PDF 23ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=19",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=2",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q5",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 5,
    "type": "descriptive",
    "category": "ネットワーク",
    "topicTags": [
      "SDN（Software-Defined Networking）を利用したネットワーク設計"
    ],
    "difficulty": 4,
    "question": "問5　SDN（Software-Defined Networking）を利用したネットワーク設計",
    "answer": "**設問１**\n\n- a　ccc\n\n- b　aaa\n\n**設問２**\n\n- c　13\n\n- d　3\n\n**設問３**\n\n- (1)　e　8\n\n- f　13\n\n- (2)　サーバやFW のMAC アドレス\n\n**設問４**\n\n- (1)　1，3\n\n- (2)　項番　5\n\n- 内容　Forward 13",
    "explanation": "送信元と宛先のMACアドレスで適用する表の行を決め、Forwardで指定された出口を順に追います。障害時は、どの出口を変えれば顧客の通信を維持できるかを確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q05-p25.webp",
      "/questions/ipa/ap/2017-autumn-pm/q05-p26.webp",
      "/questions/ipa/ap/2017-autumn-pm/q05-p27.webp",
      "/questions/ipa/ap/2017-autumn-pm/q05-p28.webp"
    ],
    "imageAltTexts": [
      "問5 SDN（Software-Defined Networking）を利用したネットワーク設計（問題冊子 PDF 25ページ）",
      "問5 SDN（Software-Defined Networking）を利用したネットワーク設計（問題冊子 PDF 26ページ）",
      "問5 SDN（Software-Defined Networking）を利用したネットワーク設計（問題冊子 PDF 27ページ）",
      "問5 SDN（Software-Defined Networking）を利用したネットワーク設計（問題冊子 PDF 28ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=25",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=3",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q6",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 6,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "青果卸売業の取引システム改修"
    ],
    "difficulty": 4,
    "question": "問6　青果卸売業の取引システム改修",
    "answer": "**設問１**\n\n- (1)　a　→\n\n- b　↓\n\n- c　販売区分コード\n\n- (2)　仕入金額，販売金額\n\n**設問２**\n\n- (1)　d　仲卸業者コード\n\n- e　品目コード，産地コード，パレット数，単価，仕入担当者コード\n\n- (2)　予約情報を取りまとめる軸は今後変更される可能性があるから\n\n**設問３**\n\n- f　SUM(t2.単価 * t1.パレット数)\n\n- g　INNER JOIN 仕入明細 USING (仕入番号, 仕入明細番号)\n\n- h　品目コード, 品目名, 産地コード, 産地名又は品目コード, 産地コード",
    "explanation": "エンティティの識別子と取引の多重度を業務ルールから読み取ります。返品金額を求めるSQLでは、仕入明細の単価を結合してから、品目・産地単位で合計します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q06-p29.webp",
      "/questions/ipa/ap/2017-autumn-pm/q06-p30.webp",
      "/questions/ipa/ap/2017-autumn-pm/q06-p31.webp",
      "/questions/ipa/ap/2017-autumn-pm/q06-p32.webp"
    ],
    "imageAltTexts": [
      "問6 青果卸売業の取引システム改修（問題冊子 PDF 29ページ）",
      "問6 青果卸売業の取引システム改修（問題冊子 PDF 30ページ）",
      "問6 青果卸売業の取引システム改修（問題冊子 PDF 31ページ）",
      "問6 青果卸売業の取引システム改修（問題冊子 PDF 32ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=29",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=3",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q7",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 7,
    "type": "descriptive",
    "category": "組込みシステム開発",
    "topicTags": [
      "ドライブレコーダ"
    ],
    "difficulty": 4,
    "question": "問7　ドライブレコーダ",
    "answer": "**設問１**\n\n- a　動画ファイルを保存\n\n**設問２**\n\n- 10.5FN\n\n**設問３**\n\n- (1)　b　衝撃イベント\n\n- c　画像格納イベント\n\n- d　タイマ満了イベント\n\n- (2)　e　20\n\n- f　20\n\n**設問４**\n\n- 電源投入後，システム時刻の設定が完了するまでの間に衝撃を検出した場合",
    "explanation": "衝撃の直前分を保持する領域と、衝撃後に取得を続ける処理を分けて考えます。状態遷移図では、各イベントが何を開始・終了させるかを確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q07-p33.webp",
      "/questions/ipa/ap/2017-autumn-pm/q07-p34.webp",
      "/questions/ipa/ap/2017-autumn-pm/q07-p35.webp",
      "/questions/ipa/ap/2017-autumn-pm/q07-p36.webp"
    ],
    "imageAltTexts": [
      "問7 ドライブレコーダ（問題冊子 PDF 33ページ）",
      "問7 ドライブレコーダ（問題冊子 PDF 34ページ）",
      "問7 ドライブレコーダ（問題冊子 PDF 35ページ）",
      "問7 ドライブレコーダ（問題冊子 PDF 36ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=33",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=4",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q8",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 8,
    "type": "descriptive",
    "category": "情報システム開発",
    "topicTags": [
      "ソフトウェア適格性確認テスト"
    ],
    "difficulty": 4,
    "question": "問8　ソフトウェア適格性確認テスト",
    "answer": "**設問１**\n\n- （100，100），（60，100），（60，70），（100，30）\n\n**設問２**\n\n- a　30\n\n- b　250\n\n**設問３**\n\n- (1)　c　ENGLISH の境界値チェック\n\n- (2)　d　141\n\n- e　129\n\n- (3)　（ウ，160），（オ，1），（ケ，190）\n\n**設問４**\n\n- 条件1 が偽，条件2 が真，条件5 が偽となる場合が成立しないから",
    "explanation": "合否条件を座標上に置き、判定が切り替わる境界の内外を確かめます。条件を個別に組み合わせる際は、条件式同士が矛盾して実行不能になる場合もあります。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q08-p37.webp",
      "/questions/ipa/ap/2017-autumn-pm/q08-p38.webp",
      "/questions/ipa/ap/2017-autumn-pm/q08-p39.webp",
      "/questions/ipa/ap/2017-autumn-pm/q08-p40.webp"
    ],
    "imageAltTexts": [
      "問8 ソフトウェア適格性確認テスト（問題冊子 PDF 37ページ）",
      "問8 ソフトウェア適格性確認テスト（問題冊子 PDF 38ページ）",
      "問8 ソフトウェア適格性確認テスト（問題冊子 PDF 39ページ）",
      "問8 ソフトウェア適格性確認テスト（問題冊子 PDF 40ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=37",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=4",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q9",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 9,
    "type": "descriptive",
    "category": "プロジェクトマネジメント",
    "topicTags": [
      "ERPパッケージのベンダ選定"
    ],
    "difficulty": 4,
    "question": "問9　ERPパッケージのベンダ選定",
    "answer": "**設問１**\n\n- ウ\n\n**設問２**\n\n- (1)　a　ア\n\n- (2)　b　RFI\n\n- d　パラメタ\n\n- (3)　c　L\n\n- 理由　業界での採用実績がないから\n\n**設問３**\n\n- (1)　e　イ\n\n- (2)　下線②　システム運用・保守の費用も評価基準に加える。\n\n- 下線③　評価項目ごとに重み付けをして点数を合計する。",
    "explanation": "ベンダから得た情報で自社の要件との適合性を比較します。費用は導入後の運用・保守まで含め、評価項目の重要度を重みとして点数に反映します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q09-p41.webp",
      "/questions/ipa/ap/2017-autumn-pm/q09-p42.webp",
      "/questions/ipa/ap/2017-autumn-pm/q09-p43.webp",
      "/questions/ipa/ap/2017-autumn-pm/q09-p44.webp"
    ],
    "imageAltTexts": [
      "問9 ERPパッケージのベンダ選定（問題冊子 PDF 41ページ）",
      "問9 ERPパッケージのベンダ選定（問題冊子 PDF 42ページ）",
      "問9 ERPパッケージのベンダ選定（問題冊子 PDF 43ページ）",
      "問9 ERPパッケージのベンダ選定（問題冊子 PDF 44ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=41",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=5",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q10",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 10,
    "type": "descriptive",
    "category": "サービスマネジメント",
    "topicTags": [
      "サービスデスク"
    ],
    "difficulty": 4,
    "question": "問10　サービスデスク",
    "answer": "**設問１**\n\n- (1)　a　カ\n\n- b　ウ\n\n- (2)　サービスデスクのオペレータだけで解決策を早期に回答できる。\n\n**設問２**\n\n- (1)　理由　月曜日の夕方にFAQ に追加したから\n\n- c　随時，FAQ に追加する。\n\n- (2)　エ\n\n- (3)　d　インシデントの解決目標時間\n\n- 下線③　サービスデスクは，調査依頼先に解決目標時間を遵守させるよう納期を管理する。",
    "explanation": "問い合わせの推移とFAQへの追加時刻を照らすと、回答の初動を改善できる箇所が分かります。調査を別の担当に依頼する場合も、解決目標時間を追跡します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q10-p45.webp",
      "/questions/ipa/ap/2017-autumn-pm/q10-p46.webp",
      "/questions/ipa/ap/2017-autumn-pm/q10-p47.webp",
      "/questions/ipa/ap/2017-autumn-pm/q10-p48.webp",
      "/questions/ipa/ap/2017-autumn-pm/q10-p49.webp"
    ],
    "imageAltTexts": [
      "問10 サービスデスク（問題冊子 PDF 45ページ）",
      "問10 サービスデスク（問題冊子 PDF 46ページ）",
      "問10 サービスデスク（問題冊子 PDF 47ページ）",
      "問10 サービスデスク（問題冊子 PDF 48ページ）",
      "問10 サービスデスク（問題冊子 PDF 49ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=45",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=5",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  },
  {
    "id": "ap-2017a-pm-q11",
    "exam": "ap",
    "year": 2017,
    "season": "autumn",
    "session": "pm",
    "qNumber": 11,
    "type": "descriptive",
    "category": "システム監査",
    "topicTags": [
      "受発注業務に関わる情報システムの監査"
    ],
    "difficulty": 4,
    "question": "問11　受発注業務に関わる情報システムの監査",
    "answer": "**設問１**\n\n- a　注文書なし\n\n**設問２**\n\n- b　1　順不同\n\n- c　2\n\n**設問３**\n\n- d　営業所長が入力した\n\n**設問４**\n\n- e　受注管理システム\n\n**設問５**\n\n- 先行発注と納品完了の権限を有する者を別にする。",
    "explanation": "注文と入力の証跡を対応付け、誤りや不正を防ぐ統制が実際に機能するかを確かめます。先行発注と納品完了は権限を分け、同じ担当者が両方を操作できないようにします。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/ap/2017-autumn-pm/q11-p51.webp",
      "/questions/ipa/ap/2017-autumn-pm/q11-p52.webp",
      "/questions/ipa/ap/2017-autumn-pm/q11-p53.webp",
      "/questions/ipa/ap/2017-autumn-pm/q11-p54.webp"
    ],
    "imageAltTexts": [
      "問11 受発注業務に関わる情報システムの監査（問題冊子 PDF 51ページ）",
      "問11 受発注業務に関わる情報システムの監査（問題冊子 PDF 52ページ）",
      "問11 受発注業務に関わる情報システムの監査（問題冊子 PDF 53ページ）",
      "問11 受発注業務に関わる情報システムの監査（問題冊子 PDF 54ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_qs.pdf#page=51",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_pm_ans.pdf#page=6",
    "sourceAttribution": "出典：情報処理推進機構（IPA）応用情報技術者 2017年度秋期 午後",
    "license": "IPA-public"
  }
];
