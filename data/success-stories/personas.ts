import type { ExamCode } from "@/lib/questions/types";

export interface PersonaInput {
  slug: string;
  exam: ExamCode;
  titleHook: string;
  ageRange: string;
  occupation: string;
  background: string;
  motivation: string;
  studyMonths: number;
  totalStudyHours: number;
  passedAt: string;
  score?: string;
  weeklyHours: number;
  scheduleNarrative: string;
  strugglePoint: string;
  breakthroughMethod: string;
  toolMix: string;
  examDayNarrative: string;
  afterEffect: string;
  nextGoal: string;
  keyTakeaways: string[];
  relatedBlogSlug?: string;
  relatedEssayExam?: ExamCode;
  publishedOffsetDays: number;
}

export const ALL_PERSONAS: PersonaInput[] = [
  /* ============== IP（ITパスポート） 4本 ============== */
  {
    slug: "ip-eigyo-25sai-3kagetu",
    exam: "ip",
    titleHook: "営業職25歳・3か月で合格。商談でITコンプレックスを解消した話",
    ageRange: "20代前半",
    occupation: "SaaS法人営業",
    background: "文系卒、IT未経験で営業職に新卒入社2年目",
    motivation:
      "顧客のCTOやエンジニアとの商談でAPI・SLA・コンテナの用語が分からず会話が止まる。提案を主導するためにITの全体地図を頭に入れたかった",
    studyMonths: 3,
    totalStudyHours: 120,
    passedAt: "2025-10",
    score: "総合680点 / テクノロジ系620・マネジメント系700・ストラテジ系720",
    weeklyHours: 12,
    scheduleNarrative:
      "平日は通勤電車と昼休みで1時間、休日は2時間。1か月目は参考書1周、2か月目は過去問5回分演習、3か月目は模試形式で時間配分の練習。",
    strugglePoint:
      "テクノロジ系のネットワーク・データベース分野が最後まで安定せず、模試で60%を割る回が続いた",
    breakthroughMethod:
      "原理から理解しようとして時間を浪費していたが、途中で方針を切り替え過去問5回分の頻出100語に絞って暗記カード化。本番では8割取れた",
    toolMix:
      "参考書1冊 + 過去問AIのAIコパイロット。「営業職にとってこの用語が重要な理由を教えて」という聞き方で毎回自分の仕事と接続を確認",
    examDayNarrative:
      "100分の試験を65分で解き終わり、35分かけて全問見直し。テクノロジ系が一番低かったが、ストラテジ・マネジメント系で合格ラインに乗った",
    afterEffect:
      "商談中にエンジニアから技術質問が来ても用語の意味を取り違えないので会話が止まらなくなった。提案書にKPIやROIを盛り込めるようになり上長レビューの戻しが減った",
    nextGoal: "基本情報技術者",
    keyTakeaways: [
      "営業職は「顧客との会話で使う言葉」を軸に用語を覚えると定着が早い",
      "テクノロジ系は深追いせず、過去問5年分の頻出100語に絞ると80%取れる",
      "ストラテジ系は普段の商談内容と紐付けると一気に得点源になる",
    ],
    publishedOffsetDays: 40,
  },
  {
    slug: "ip-shukatsu-22sai-2kagetu",
    exam: "ip",
    titleHook: "就活前の大学3年生・2か月で合格。ガクチカに使えた話",
    ageRange: "20代前半",
    occupation: "文系大学3年生（経済学部）",
    background: "プログラミング経験なし、Excel・Wordが使える程度",
    motivation:
      "就活でIT業界も視野に入れたいが文系のためアピール材料がない。資格より「2か月でやり切った学習プロセス」をESに書きたかった",
    studyMonths: 2,
    totalStudyHours: 120,
    passedAt: "2025-08",
    score: "総合745点",
    weeklyHours: 14,
    scheduleNarrative:
      "平日は午前中の講義の合間に2時間、休日は3時間。1か月目はYouTube無料講座 + 参考書1周、2か月目は過去問6回分と弱点演習。",
    strugglePoint:
      "プログラミング未経験で擬似言語のアルゴリズム問題に詰まった。最初は擬似言語の構文を全部覚えようとして失敗",
    breakthroughMethod:
      "「コードを読むときは紙に変数を書いて値の変化を追う」と教わり、過去問の擬似言語20問を全部紙にトレース。途中から頭の中で値の変化が追えるようになった",
    toolMix:
      "参考書1冊 + 過去問サイト + 過去問AIのAIコパイロット。「文系学生向けに3行で説明して」と毎回短くまとめてもらった",
    examDayNarrative:
      "100分の試験を80分で解き終わり、20分かけて見直し。文系未経験の2か月学習としては十分な結果",
    afterEffect:
      "ES面接で「2か月で120時間の学習計画を立て、週次で進捗を測定して再配分した」というプロセスを語れた。文系で技術アピールできない悩みが解消し、SaaS企業のカスタマーサクセス職に内定",
    nextGoal: "基本情報技術者（入社前に取得予定）",
    keyTakeaways: [
      "ITパスポートは「就活のガクチカ素材」として優秀（学習プロセスを語れる）",
      "擬似言語は構文暗記ではなく、紙の表でトレースする訓練が効く",
      "1日2時間×2か月で文系未経験でも745点は十分狙える",
    ],
    publishedOffsetDays: 44,
  },
  {
    slug: "ip-shufu-38sai-itmiknk",
    exam: "ip",
    titleHook: "育休復帰前の38歳・スキマ時間で合格。事務職復帰の追い風になった",
    ageRange: "30代後半",
    occupation: "総務事務（育休中）",
    background: "新卒から総務一筋15年、Excel・PowerPointは得意",
    motivation:
      "育休復帰前に会社で基幹システムが刷新され、復帰後は事務側のレビュアーとして参加すると聞いた。基本用語が分からないと議論についていけないと判断",
    studyMonths: 6,
    totalStudyHours: 90,
    passedAt: "2026-01",
    score: "総合625点",
    weeklyHours: 3,
    scheduleNarrative:
      "下の子0歳・上の子3歳で机に向かう時間ゼロ。平日は寝かしつけ後30分、休日は夫に子供を任せた朝1時間、家事中は音声教材で隙間学習。",
    strugglePoint:
      "セキュリティ・暗号化分野が最も苦戦。寝不足の30分で抽象概念を読み込むのは無理だった",
    breakthroughMethod:
      "音声教材に切り替え、洗濯物を干しながら暗号方式の解説を1日2回。10日続けると共通鍵・公開鍵・電子署名の流れが感覚で残るようになった",
    toolMix:
      "音声教材 + スマホ過去問アプリ + 過去問AIのAIコパイロット。「30秒で説明して」と短文化を毎回お願いした",
    examDayNarrative:
      "子供を夫に預けて午前中に受験。100分を90分使い切り、テクノロジ系600点とギリギリだったが、ストラテジ・マネジメント系で実務経験を活かして合格",
    afterEffect:
      "復帰3週間後のシステム刷新会議で「データ連携時の暗号化方式は決まっていますか」と質問できた。15年前の自分にはあり得ない発言。事務側の窓口としての存在感が変わった",
    nextGoal: "情報セキュリティマネジメント（SG）",
    keyTakeaways: [
      "30代以降の主婦学習は「机に向かう時間ゼロ」を前提に設計するほうが続く",
      "暗号化など抽象概念は音声教材で耳から入れると定着する",
      "復帰前資格取得は職場での発言権を取り戻す手段として機能する",
    ],
    publishedOffsetDays: 47,
  },
  {
    slug: "ip-tenshoku-31sai-eigyo-syanai-se",
    exam: "ip",
    titleHook: "営業から社内SEへ転職した31歳。IPは「通行手形」だった",
    ageRange: "30代前半",
    occupation: "社内SE（転職前は法人営業）",
    background: "情報系学部卒だが10年現場から離れており実質ブランク",
    motivation:
      "営業から社内SEへの転職面接で「現在のIT知識をどう証明するか」を毎回問われ、これに答える材料が欲しかった",
    studyMonths: 4,
    totalStudyHours: 100,
    passedAt: "2025-09",
    score: "総合765点",
    weeklyHours: 6,
    scheduleNarrative:
      "転職活動と並行のため平日2時間・休日3時間で月25時間ペース。クラウド・コンテナ・DevOpsなど10年前にはなかった分野を集中インプット。",
    strugglePoint:
      "10年前の大学知識との差分（クラウド・コンテナ・DevOps・生成AI）の埋め直し。最新分野ほど参考書の解説が薄い",
    breakthroughMethod:
      "参考書の解説が薄い分野は過去問AIのAIコパイロットや外部記事を組み合わせ、「2025年現在の実務でこの用語はどう使われていますか」と聞いて暗記ではなく理解で進めた",
    toolMix:
      "参考書 + 外部技術記事 + 過去問AIのAIコパイロット。最新トピックは実務文脈で聞き直す癖をつけた",
    examDayNarrative:
      "営業経験が活きるストラテジ系が800点、マネジメント系780点、テクノロジ系720点で合格",
    afterEffect:
      "社内SEとして半年勤務した実感は「ITパスポートで得た知識のうち実務で直接使うのは2〜3割。残り7割は会話の背景知識として効く」。CIDR分けの議論などで会話が止まらなくなった",
    nextGoal: "基本情報技術者 → 応用情報技術者 → セキュリティスペシャリスト",
    keyTakeaways: [
      "営業から社内SEへの転職面接では、ITパスポートが学習意欲の客観証明になる",
      "情報系出身でも10年離れているとクラウド・コンテナ系は新規学習が必要",
      "ITパスポートは「通行手形」であり、実務スキルは別途学ぶと割り切る",
    ],
    relatedBlogSlug: "kakumon-gakushuu-science",
    publishedOffsetDays: 51,
  },

  /* ============== SG（情報セキュリティマネジメント） 4本 ============== */
  {
    slug: "sg-jinjibu-29sai-shanai-sec",
    exam: "sg",
    titleHook: "人事部29歳・社内セキュリティ研修担当に抜擢されSGに合格",
    ageRange: "20代後半",
    occupation: "人事（社員教育担当）",
    background: "文系卒、人事一筋6年。ITは社内システム利用者レベル",
    motivation:
      "個人情報の取り扱い研修を人事が担当することになり、いきなり「セキュリティの基礎を教えてください」と任された。社内講師として最低限の根拠が必要だった",
    studyMonths: 4,
    totalStudyHours: 140,
    passedAt: "2025-10",
    score: "午前66点 / 午後72点",
    weeklyHours: 9,
    scheduleNarrative:
      "平日朝1時間・帰宅後30分、休日2.5時間。1か月目に教科書1周、2か月目で午前過去問5回分、3か月目から午後の事例問題に集中。",
    strugglePoint:
      "午後の事例問題で「組織のセキュリティ運用」を問う設問に苦戦。実務未経験で具体例が浮かばず、模範解答の言い回しが頭に入らなかった",
    breakthroughMethod:
      "過去問AIのAIコパイロットに「この設問で問われている管理策はISMSのどの統制に対応しますか」と聞き、JIS Q 27001の管理策番号と紐付けて覚え直した",
    toolMix:
      "公式テキスト + 午後問題集 + 過去問AIのAIコパイロット。事例問題は1問につき設問の意図解析を10分かけて整理する習慣",
    examDayNarrative:
      "午後試験は時間ギリギリ。3問目の長文事例で15分使いすぎたが、1・2問目を確実に押さえて合格圏に届いた",
    afterEffect:
      "社内研修で「ISMSの管理策にはこういう体系があり…」と説明できるようになり、人事メンバーから「説明が分かりやすい」と評価された。労務系の規程改訂にもセキュリティ観点で意見できるようになった",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "SGは午前より午後の組織運用観点が合否を分ける",
      "実務未経験者は管理策をISMS統制番号と紐付けて記憶すると応用が利く",
      "人事・総務など非IT部門こそSGの実務価値が高い",
    ],
    relatedEssayExam: "sc",
    publishedOffsetDays: 30,
  },
  {
    slug: "sg-keiri-34sai-naibutousei-fukugyo",
    exam: "sg",
    titleHook: "経理職34歳・内部統制プロジェクト参加で必要に迫られSG合格",
    ageRange: "30代前半",
    occupation: "経理（J-SOX対応担当）",
    background: "経理一筋12年、IT統制は監査人とのやり取りで聞きかじり",
    motivation:
      "J-SOX内部統制プロジェクトでIT統制部分の窓口を任されたが、用語の8割が分からなかった",
    studyMonths: 5,
    totalStudyHours: 130,
    passedAt: "2025-04",
    score: "午前72点 / 午後68点",
    weeklyHours: 6,
    scheduleNarrative:
      "決算期は学習を一時停止し、繁忙期外の月平均30時間で進めた。午前は通勤電車、午後は週末にまとめて。",
    strugglePoint:
      "技術用語（暗号・認証・通信）が初見ばかりで参考書を読んでも頭に残らなかった",
    breakthroughMethod:
      "経理視点で「これは仕訳でいう何に近いか」「監査ログは経理の証憑保管と同じ」と無理やり既知の概念に紐付けた。AIコパイロットに「経理職向けに例え話で」と毎回頼んだ",
    toolMix:
      "公式テキスト + 過去問AIのAIコパイロット + 社内監査資料",
    examDayNarrative:
      "午後の長文で「ID管理」「アクセス制御」が問われ、職場での実体験そのままの設問に救われた",
    afterEffect:
      "監査人とのIT統制議論で対等に話せるようになり、過去6年指摘されていた論点を半分以下に減らせた。経理部内でも「ITに強い人」と認識が変わった",
    nextGoal: "システム監査技術者（AU）",
    keyTakeaways: [
      "経理職は内部統制との接続でSGを位置付けると意味が腹落ちする",
      "繁忙期に学習を止める前提で長めの期間設計（5か月）が現実的",
      "技術用語は既知業務との対応関係を作って覚えると忘れにくい",
    ],
    relatedEssayExam: "au",
    publishedOffsetDays: 33,
  },
  {
    slug: "sg-shanai-se-27sai-jissen-tonyu",
    exam: "sg",
    titleHook: "社内SE27歳・情報漏洩インシデント直後にSGで体系化",
    ageRange: "20代後半",
    occupation: "社内SE（インフラ運用）",
    background: "情報系専門卒、社内SE5年目",
    motivation:
      "自社で軽微な情報漏洩インシデントが発生し対応に追われた。再発防止策の議論に参加するなかで「我流の知識では限界がある」と痛感",
    studyMonths: 3,
    totalStudyHours: 110,
    passedAt: "2025-10",
    score: "午前78点 / 午後74点",
    weeklyHours: 10,
    scheduleNarrative:
      "平日2時間（朝1時間・帰宅後1時間）、休日3時間。インシデント対応で残業が多い週は休日に詰めた。",
    strugglePoint:
      "個人情報保護法・サイバーセキュリティ基本法など法令分野は実務でほぼ触らない領域で、最後まで定着が遅かった",
    breakthroughMethod:
      "法令は条文単位ではなく「この行為は何法のどの章に違反するか」のチェック表を自作。AIコパイロットに「事例 → 該当法令 → 罰則」の組で出題してもらった",
    toolMix:
      "公式テキスト + 過去問AIのAIコパイロット（事例問題ジェネレーター活用）",
    examDayNarrative:
      "午前で時間が余り、午後の長文事例にじっくり取り組めた。インシデント実体験で問題文の状況が手に取るように分かった",
    afterEffect:
      "社内のセキュリティ委員会に呼ばれるようになり、再発防止策の提案がそのまま採用された。SC受験につながる足場ができた",
    nextGoal: "情報処理安全確保支援士（SC）に翌春挑戦",
    keyTakeaways: [
      "実務インシデントの直後はSG学習の効率が最大化する",
      "法令分野は条文ではなく「事例 → 該当法令」の対応表で覚える",
      "SGはSCの前哨戦として位置付けると挫折しにくい",
    ],
    relatedEssayExam: "sc",
    publishedOffsetDays: 36,
  },
  {
    slug: "sg-houmu-41sai-kontora-recho",
    exam: "sg",
    titleHook: "法務41歳・契約書のセキュリティ条項を理解するためSG受験",
    ageRange: "40代前半",
    occupation: "法務（IT契約レビュー担当）",
    background: "法務一筋15年、IT契約は4年前から担当",
    motivation:
      "システム開発契約・SaaS契約のセキュリティ条項を法務がレビューする際、技術前提が分からず判断に迷う場面が増えていた",
    studyMonths: 6,
    totalStudyHours: 100,
    passedAt: "2025-04",
    score: "午前68点 / 午後70点",
    weeklyHours: 4,
    scheduleNarrative:
      "本業の繁忙にあわせ柔軟に。平日30分・休日2時間ペース。法令分野は得意領域なので捨てがたい技術分野に時間を寄せた。",
    strugglePoint:
      "暗号方式・認証プロトコルなど技術寄りの問題で正答率が伸びなかった",
    breakthroughMethod:
      "「契約書のセキュリティ条項に出てくる技術用語」というフィルタで参考書の重要度を再評価し、AES・TLS・OAuth・SAML・MFAなど契約頻出の20語に学習時間を集中投下",
    toolMix:
      "公式テキスト + 契約書サンプル + 過去問AIのAIコパイロット",
    examDayNarrative:
      "法令分野で時間を稼ぎ、技術分野はTLS・暗号など過去問頻出の論点で確実に得点。バランス型で合格ラインに乗った",
    afterEffect:
      "契約書のセキュリティ条項を「技術的にどう実装される条文か」まで踏まえてレビューできるようになり、ベンダーとの交渉で押し戻される場面が半減した",
    nextGoal: "情報処理安全確保支援士（SC）の午前免除狙い",
    keyTakeaways: [
      "法務職は「契約条項頻出の技術用語」に絞ると効率が高い",
      "得意分野（法令）で時間を作り、苦手分野（技術）に時間を集中する戦略",
      "資格は契約レビューの判断軸として直接実務に効く",
    ],
    publishedOffsetDays: 39,
  },

  /* ============== FE（基本情報技術者） 5本 ============== */
  {
    slug: "fe-shinsotsu-23sai-1nenme",
    exam: "fe",
    titleHook: "新卒SE1年目・入社半年で基本情報合格。研修中の学習法",
    ageRange: "20代前半",
    occupation: "新卒SE（Web系SIer）",
    background: "情報系学部卒、Pythonを大学で軽く触っていた",
    motivation:
      "会社の新卒研修で「半年以内に基本情報を取れ」と指示されたが、研修で疲れて自習が進まなかった",
    studyMonths: 4,
    totalStudyHours: 200,
    passedAt: "2025-08",
    score: "科目A 72点 / 科目B 76点",
    weeklyHours: 12,
    scheduleNarrative:
      "平日は研修後の1.5時間、休日は4時間。研修内容と試験範囲が重なる週は学習時間を半分にしてバランスを取った。",
    strugglePoint:
      "科目B（プログラミング）でスタックとキューのアルゴリズムが理解できず、過去問の正答率が30%台で停滞",
    breakthroughMethod:
      "AIコパイロットに「スタックの状態遷移を1ステップずつ図で見せて」と頼み、push/popを表でトレース。10問解いた頃から自力でトレースできるようになり正答率が70%超に",
    toolMix:
      "参考書 + 過去問AI + 同期との週次勉強会",
    examDayNarrative:
      "CBT形式で科目A・B連続。科目Aで余った時間を科目Bのアルゴリズムに回せたのが大きい",
    afterEffect:
      "現場配属でJavaのコードレビューを受けるとき、用語の意味で詰まることがなくなった。チームリーダーから「基礎が固まっている」と評価され、設計レビューにも呼ばれるようになった",
    nextGoal: "応用情報技術者（AP）",
    keyTakeaways: [
      "新卒は研修時期に勉強できる時間を1日単位で確保する",
      "アルゴリズムは構文ではなく「状態遷移の図」で覚える",
      "同期との週次勉強会は進捗管理のペースメーカーになる",
    ],
    publishedOffsetDays: 20,
  },
  {
    slug: "fe-tenshoku-28sai-mikens-syokuba",
    exam: "fe",
    titleHook: "未経験から28歳でIT転職・基本情報で武器を作る",
    ageRange: "20代後半",
    occupation: "未経験エンジニア（受託開発）",
    background: "前職は飲食店店長、独学でJavaScriptを半年学習",
    motivation:
      "未経験転職組として周囲との差を埋める必要があった。実務経験ゼロでも体系知識を持っていることを示したかった",
    studyMonths: 6,
    totalStudyHours: 280,
    passedAt: "2025-04",
    score: "科目A 68点 / 科目B 70点",
    weeklyHours: 11,
    scheduleNarrative:
      "平日1.5時間・休日3.5時間。プログラミングスクール卒業後に独学で進めたため、ペース管理は完全自前。",
    strugglePoint:
      "ハードウェア・ネットワーク・データベースの基礎理論が独学では穴だらけで、何度やっても暗記止まりだった",
    breakthroughMethod:
      "AIコパイロットに「この計算問題、なぜこの公式を使うのか高校数学からの順番で説明して」と頼み、原理から積み上げ直した。1問に40分かけてもいいと割り切ったのが効いた",
    toolMix:
      "参考書（栢木先生）+ 過去問AI + プログラミングスクールのメンター相談",
    examDayNarrative:
      "科目Aは時間ギリギリ、科目Bは余裕を持って完答。基礎理論で時間を使った分、アルゴリズムでは落ち着いて解けた",
    afterEffect:
      "現場での会話で「TCP/IP」「インデックス」などの用語に対する反応速度が他の未経験組と明確に違うと言われるようになった。半年後にプロジェクトのサブリーダーに登用",
    nextGoal: "応用情報技術者（AP）に2年目で挑戦",
    keyTakeaways: [
      "未経験転職組はFEで「実務経験ゼロでも体系知識はある」を示せる",
      "基礎理論は1問40分かけてもいいから原理で理解する",
      "メンター + AIコパイロットの組み合わせで独学の盲点を埋める",
    ],
    publishedOffsetDays: 23,
  },
  {
    slug: "fe-gakusei-21sai-summer-intern",
    exam: "fe",
    titleHook: "情報系大学2年・サマーインターン応募に合わせ取得",
    ageRange: "20代前半",
    occupation: "情報系大学2年生",
    background: "C言語・Pythonを授業で学習、競プロ経験あり",
    motivation:
      "サマーインターン応募で「基本情報を持っていると書類通過率が上がる」と先輩から聞いた",
    studyMonths: 3,
    totalStudyHours: 130,
    passedAt: "2025-06",
    score: "科目A 78点 / 科目B 86点",
    weeklyHours: 11,
    scheduleNarrative:
      "授業合間と自宅学習で平日2時間・休日3時間。アルゴリズムは強かったので科目B対策は短く、科目Aのマネジメント系・ストラテジ系に時間を集中。",
    strugglePoint:
      "ストラテジ系（経営戦略・マーケティング）が想像以上に出題範囲広く、20歳前後の経験では具体例が浮かばなかった",
    breakthroughMethod:
      "「学園祭の出店をBSCで設計したら」「サークル運営をSWOTで分析したら」と身近な事例に置き換える練習をAIコパイロット相手に繰り返した",
    toolMix:
      "授業の教科書 + 過去問AI + 競プロサイト",
    examDayNarrative:
      "科目Bは余裕、科目Aで時間調整がやや忙しかった。マネジメント・ストラテジ系の論点で見覚えのある問題が多く出て助かった",
    afterEffect:
      "希望のサマーインターン3社に通過。ESに「基本情報合格 + 競プロ実績」を書けたのが大きかった。インターン先で他大学の参加者と話しても引け目を感じなかった",
    nextGoal: "応用情報技術者（AP）を3年生のうちに",
    keyTakeaways: [
      "情報系学生は科目Bが得意分野なら、科目Aのマネジメント・ストラテジ系に時間を集中する",
      "ストラテジ系は身近な活動を題材に置き換えると暗記が理解になる",
      "インターン選考での通過率向上に直結する資格",
    ],
    publishedOffsetDays: 26,
  },
  {
    slug: "fe-shanai-se-33sai-jissenrenketsu",
    exam: "fe",
    titleHook: "社内SE33歳・IT資格ゼロのまま10年勤めた末の基本情報",
    ageRange: "30代前半",
    occupation: "社内SE（運用・ヘルプデスク）",
    background: "情報系専門卒、社内SE10年だがコードを書く実務はゼロ",
    motivation:
      "後輩入社の基本情報合格に焦り、10年無資格で来た自分の立場が危ういと感じた",
    studyMonths: 5,
    totalStudyHours: 170,
    passedAt: "2025-04",
    score: "科目A 70点 / 科目B 62点",
    weeklyHours: 8,
    scheduleNarrative:
      "業務後に1時間、土日は3時間ずつ。家庭の都合で学習時間が削られる週もあり、6か月計画を5か月に圧縮した。",
    strugglePoint:
      "科目B（プログラミング）が最大の壁。実務でコードを書いていないため擬似言語の読解が遅く、模試で科目Bは40点台が続いた",
    breakthroughMethod:
      "毎日30分、過去問の擬似言語を音読してトレースする習慣を作った。1か月続けたら「読みながら値が頭に入る」状態になり、模試で60点を超えた",
    toolMix:
      "参考書 + 過去問AI + 紙のトレース用ノート",
    examDayNarrative:
      "科目Bは時間配分との戦い。最後の1問を捨てる判断ができたのが合格に寄与した",
    afterEffect:
      "10年運用しかしてこなかった自分が、開発チームとの会話で「アルゴリズム」「O記法」のような語を使えるようになった。プロジェクトへのアサインが増え、評価面談での点が上がった",
    nextGoal: "応用情報技術者（AP）を翌秋",
    keyTakeaways: [
      "コードを書かない職種でも擬似言語は音読トレースで攻略できる",
      "30代以降は学習時間を確保する仕組みを家族と合意するのが先",
      "10年無資格でも一念発起すれば届く",
    ],
    publishedOffsetDays: 29,
  },
  {
    slug: "fe-koukousei-17sai-shoukibo",
    exam: "fe",
    titleHook: "高校2年17歳・夏休み集中で基本情報合格",
    ageRange: "10代後半",
    occupation: "工業高校2年生（情報技術科）",
    background: "学校でJavaを履修中、独学で簡単なゲームを作ったことがある",
    motivation:
      "高校在学中に基本情報を取って指定校推薦の判定材料にしたかった",
    studyMonths: 2,
    totalStudyHours: 180,
    passedAt: "2025-08",
    score: "科目A 76点 / 科目B 80点",
    weeklyHours: 22,
    scheduleNarrative:
      "夏休み40日間に集中投下。1日4〜5時間。前半20日で参考書 + 過去問演習、後半20日は弱点復習と模試形式。",
    strugglePoint:
      "科目Aの経営戦略・法務分野は高校生の経験では実感が湧かず、用語暗記が苦痛だった",
    breakthroughMethod:
      "AIコパイロットに「高校生向けに身近な例で説明して」と頼み、PPMをコンビニ商品の配置、SWOTを部活の戦略に置き換えてもらった。例え話が腹落ちすると暗記が一気に進んだ",
    toolMix:
      "学校の教科書 + 参考書 + 過去問AI + 担任教員の個別質問",
    examDayNarrative:
      "科目B（プログラミング）が想像以上に易しく感じ、余った時間で全問見直しできた",
    afterEffect:
      "指定校推薦の校内選考で「基本情報合格」が決め手となり、第一志望の情報系大学への内部推薦枠を獲得",
    nextGoal: "応用情報技術者（AP）を高校3年で",
    keyTakeaways: [
      "高校生は夏休み40日集中で180時間投下できる",
      "経営戦略系は身近な題材への置き換えで腹落ちする",
      "指定校推薦・AO入試の差別化材料として有効",
    ],
    publishedOffsetDays: 32,
  },

  /* ============== AP（応用情報技術者） 5本 ============== */
  {
    slug: "ap-shanai-se-29sai-2kaime-goukaku",
    exam: "ap",
    titleHook: "社内SE29歳・2回目の挑戦でAP合格。1度の不合格で見えた弱点",
    ageRange: "20代後半",
    occupation: "社内SE（業務システム開発）",
    background: "FE合格後、AP1度不合格を経験",
    motivation:
      "1度目は午後で59点と僅差で落ちた。リベンジで合格して評価面談で昇格条件を満たしたかった",
    studyMonths: 5,
    totalStudyHours: 250,
    passedAt: "2025-10",
    score: "午前76点 / 午後72点",
    weeklyHours: 12,
    scheduleNarrative:
      "平日2時間・休日4時間。1度目の失敗を踏まえ、午後問題集中の配分（午前30:午後70）に切り替えた。",
    strugglePoint:
      "1度目はストラテジ系の論述で大量に減点された。記述の型が身についておらず、思いつきで書いていた",
    breakthroughMethod:
      "午後問題は「設問の問いに対し因果でつなぐ」テンプレを徹底。AIコパイロットに添削を依頼し、自分の答案と模範解答の差分を毎回言語化",
    toolMix:
      "午後問題集 + 過去問AI（午後添削機能） + 模範解答音読",
    examDayNarrative:
      "午後の選択問題は得意分野（経営戦略・データベース・マネジメント）の3つに絞ったのが時間配分上正解だった",
    afterEffect:
      "昇格条件のひとつをクリアし、半年後にチームリーダー昇格。AP合格者として後輩からの質問対応も増え、社内での立ち位置が変わった",
    nextGoal: "プロジェクトマネージャ（PM）",
    keyTakeaways: [
      "AP不合格者は午前ではなく午後の記述精度が原因のことが多い",
      "午後は「設問の問いに因果でつなぐ」テンプレ習得が最短",
      "選択問題は得意3分野を本番前に確定させる",
    ],
    relatedEssayExam: "pm",
    publishedOffsetDays: 10,
  },
  {
    slug: "ap-bushou-46sai-saikyo-fukugyo",
    exam: "ap",
    titleHook: "管理職46歳・部下より遅れたくない一心でAP合格",
    ageRange: "40代後半",
    occupation: "IT部長（中堅製造業）",
    background: "AP合格は20年ぶりの本格学習。FE取得は20代の話",
    motivation:
      "部下の若手が次々APを取り、自分が部長として無資格のままでは指示が空回りすると感じた",
    studyMonths: 8,
    totalStudyHours: 320,
    passedAt: "2025-04",
    score: "午前80点 / 午後68点",
    weeklyHours: 10,
    scheduleNarrative:
      "平日朝1時間（出社前）・帰宅後30分・休日3時間。長期戦覚悟の8か月計画で、繁忙月は週5時間まで落とした。",
    strugglePoint:
      "20年前のIT知識との断絶。クラウド・マイクロサービス・コンテナ・SREなど現代の論点で基礎用語から学び直しが必要だった",
    breakthroughMethod:
      "AIコパイロットに「20年前のオンプレ感覚を持つ部長向けに、クラウド特有の概念を順番に説明して」と毎晩30分話した。経営目線で意味が分かると記憶に残った",
    toolMix:
      "参考書 + 過去問AI + 部下にお願いした週次レクチャー",
    examDayNarrative:
      "午前は実務知識で楽勝、午後は記述で苦戦。経営戦略・システム監査を選んで管理職経験を活かして書き切った",
    afterEffect:
      "部下の前で技術論議に参加できるようになり、「あの部長と技術の話ができる」と評判が変わった。経営層への提案でも技術リスクを自分の言葉で説明できるようになり、ITプロジェクトの承認率が上がった",
    nextGoal: "ITストラテジスト（ST）",
    keyTakeaways: [
      "40代管理職こそAPで「現代のIT」を学び直す価値がある",
      "20年前知識との断絶は「経営目線で説明してもらう」と埋まる",
      "8か月計画 + 繁忙期の柔軟な減速が現実解",
    ],
    relatedEssayExam: "st",
    publishedOffsetDays: 13,
  },
  {
    slug: "ap-ikuji-fukki-32sai-jitan-goukaku",
    exam: "ap",
    titleHook: "育休復帰直後の32歳エンジニア・時短勤務でAP合格",
    ageRange: "30代前半",
    occupation: "Webエンジニア（時短勤務）",
    background: "復帰前にFE合格、復帰後はSE業務に従事",
    motivation:
      "時短勤務で評価が下がる懸念があり、客観的なスキル証明が欲しかった",
    studyMonths: 7,
    totalStudyHours: 200,
    passedAt: "2025-10",
    score: "午前68点 / 午後66点",
    weeklyHours: 6,
    scheduleNarrative:
      "子供の寝かしつけ後の45分が主戦場。土曜の朝に夫と子供を遊ばせている間の2時間が追加リソース。",
    strugglePoint:
      "学習時間が確保できないストレスで、模試の点数が伸び悩んだ時期に挫けかけた",
    breakthroughMethod:
      "「45分で1問解く」と決めて毎日続けた。量を求めず、解いた問題は必ずAIコパイロットで誤答分析まで完結させた",
    toolMix:
      "過去問AIメイン + 紙の参考書はトイレに置いて隙間で",
    examDayNarrative:
      "午後の選択は実務密接な「情報システム開発」「データベース」「マネジメント」。短時間学習で網羅性が低いぶん、得意分野に絞った",
    afterEffect:
      "時短勤務でもAP保有で評価面談で「成長意欲が高い」と書面評価がついた。半年後にフルタイム復帰時にチームリーダー候補としてアサイン",
    nextGoal: "プロジェクトマネージャ（PM）またはデータベーススペシャリスト（DB）",
    keyTakeaways: [
      "育児中の学習は「45分で1問」の短時間集中型が続く",
      "量より「誤答分析を毎回完結させる」深さが大事",
      "時短勤務の評価減を資格でカバーする戦略は実際に機能する",
    ],
    relatedEssayExam: "pm",
    publishedOffsetDays: 16,
  },
  {
    slug: "ap-tenshoku-itsenryaku-35sai",
    exam: "ap",
    titleHook: "ITコンサル転職35歳・APは「基礎力の名刺」だった",
    ageRange: "30代前半",
    occupation: "ITコンサルタント（戦略系）",
    background: "事業会社のIT企画10年、コンサル転職時にAPを取得",
    motivation:
      "戦略系コンサルでも顧客のIT組織と議論するためにAPの体系が必要だった。MBAでは届かない技術解像度を補完する目的",
    studyMonths: 4,
    totalStudyHours: 180,
    passedAt: "2025-04",
    score: "午前82点 / 午後74点",
    weeklyHours: 11,
    scheduleNarrative:
      "クライアントワーク後に1.5時間、休日3時間。出張多めで隙間時間（移動中・ホテル）でのスマホ過去問が学習の半分を占めた。",
    strugglePoint:
      "ネットワーク・データベースの技術細部で実装感覚がなく、模試で取りこぼしが続いた",
    breakthroughMethod:
      "AIコパイロットに「コンサル目線で、この技術問題がプロジェクトのどこに効くか」と毎回聞き、技術細部を経営インパクトに紐付けて記憶",
    toolMix:
      "過去問AI（スマホ） + 参考書（ホテル滞在時） + 上司との週次15分技術ディスカッション",
    examDayNarrative:
      "午後は「経営戦略・システム監査・サービスマネジメント」のソフト系3問で勝負。論述構成は戦略コンサルの提案書フォーマットを応用",
    afterEffect:
      "クライアントとの技術議論で押し負けなくなった。CIO向け提案で「技術的な実現性」を自分の言葉で語れるようになり、コンサル単価の正当化に直結",
    nextGoal: "ITストラテジスト（ST）またはシステムアーキテクト（SA）",
    keyTakeaways: [
      "コンサルはAPで技術解像度を経営目線に翻訳する練習を積める",
      "出張族はスマホ過去問が学習時間の半分を占める前提で計画する",
      "ソフト系3問選択 + 提案書フォーマット応用で午後を攻略",
    ],
    relatedEssayExam: "st",
    publishedOffsetDays: 19,
  },
  {
    slug: "ap-sukatsu-3nensei-shinrocha-shoumei",
    exam: "ap",
    titleHook: "理系大学3年・院試との同時並行でAP合格",
    ageRange: "20代前半",
    occupation: "理系大学3年生（情報系）",
    background: "FEを大学1年で取得、競プロ経験あり",
    motivation:
      "院試対策と並行してAPを取り、就活時に基礎研究 + 体系知識の両方を示したかった",
    studyMonths: 4,
    totalStudyHours: 200,
    passedAt: "2025-04",
    score: "午前86点 / 午後78点",
    weeklyHours: 12,
    scheduleNarrative:
      "院試対策と完全並行。AP単独学習日は週2日（火・木）に固定し、土日は院試。試験前2週間は院試学習を一時停止。",
    strugglePoint:
      "午後の経営戦略・サービスマネジメント分野で大学生らしい具体例が浮かばず、論述が抽象的になりがち",
    breakthroughMethod:
      "AIコパイロットに「大学院生向けの研究室運営でこの経営手法を使うとどうなる」と置き換え演習。研究室を組織と見立てて論述する練習で抽象度を下げた",
    toolMix:
      "過去問AI + 院試研究 + 競プロサイト（科目B類問補強）",
    examDayNarrative:
      "午前で時間が大きく余り、午後の論述に集中投下。研究室テーマを応用した論述で時間内に書き切った",
    afterEffect:
      "院試合格 + APの両方を実績として持ち、ベンチャー企業のサマーインターン選考で差別化に成功。複数内定の中から納得して選択できた",
    nextGoal: "情報処理安全確保支援士（SC）または応用情報→高度の流れ",
    keyTakeaways: [
      "院試との同時並行は曜日固定で破綻を防ぐ",
      "経営戦略系は研究室運営に置き換える発想で抽象度を下げる",
      "院試合格 + AP のコンボはベンチャー就活で強い差別化",
    ],
    publishedOffsetDays: 22,
  },

  /* ============== ST（ITストラテジスト） 4本 ============== */
  {
    slug: "st-pm-tenshin-itsenryaku-38sai",
    exam: "st",
    titleHook: "PM経験5年から事業企画へ。STで戦略レベルに脱皮",
    ageRange: "30代後半",
    occupation: "事業企画（旧PM）",
    background: "PM保有、PMO 5年、事業会社のDX企画に転身",
    motivation:
      "PMの実行レベルから、経営直下の戦略提案レベルへキャリアシフトしたかった。STは戦略提案能力の客観証明として最適と判断",
    studyMonths: 8,
    totalStudyHours: 350,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 11,
    scheduleNarrative:
      "業務後1時間 + 休日3時間。論文は週1本必ず書き上げて添削サイクルを回した。",
    strugglePoint:
      "午後Ⅱ論文で「経営戦略との接続」を論じる際、PM視点が抜けず実行論に終始しがち。テーマを『投資判断』に上げる練習が必要だった",
    breakthroughMethod:
      "AIコパイロットに「PM目線が混じっていないか、経営視点で書き直すならどこを直すか」と論文ごとに添削依頼。8本添削後に論文構成が経営レベルに上がった",
    toolMix:
      "論文集 + 過去問AI（論文添削機能） + 上司の事業計画書を写経",
    examDayNarrative:
      "午後Ⅰの選択は得意のDX企画系2問。午後Ⅱは新規事業の投資判断テーマを選び、自分の担当案件を抽象化して論述",
    afterEffect:
      "事業企画の提案書クオリティが上司から「経営層に直接出せるレベル」と評価された。DX戦略会議に若手で唯一呼ばれるようになり、社内での影響力が変わった",
    nextGoal: "MBA取得 or システム監査技術者（AU）",
    keyTakeaways: [
      "PM出身者はSTで「実行から投資判断へ」視点を上げる練習ができる",
      "論文は週1本ペース、AI添削で経営視点への引き上げを反復",
      "実担当案件を抽象化して書ける受験者は強い",
    ],
    relatedEssayExam: "st",
    publishedOffsetDays: 5,
  },
  {
    slug: "st-dx-sokumen-shucchou-42sai",
    exam: "st",
    titleHook: "DX推進室42歳・経営層への提案力強化でST合格",
    ageRange: "40代前半",
    occupation: "DX推進室マネージャー",
    background: "AP・PM保有、DX推進室3年目",
    motivation:
      "DX提案を役員会で通すのに苦戦していた。役員と同じ語彙で戦略を語れる証明として受験",
    studyMonths: 10,
    totalStudyHours: 380,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 9,
    scheduleNarrative:
      "10か月の超長期計画。週末に論文1本、平日は午前過去問。途中で論文添削サイクルを月4本→月6本に増やした。",
    strugglePoint:
      "DX実務は豊富だが「中期経営計画への接続」を論じる訓練が不足していた",
    breakthroughMethod:
      "自社の中期経営計画書を読み込み、AIコパイロットに「この経営目標をDX投資に翻訳して論文の章立てに落とせ」と毎回依頼",
    toolMix:
      "公式論文集 + 自社IR資料 + 過去問AI",
    examDayNarrative:
      "午後Ⅱは「事業ポートフォリオ転換期のIT戦略」テーマを選択。自社事例を抽象化し、経営計画との因果関係を明示して合格",
    afterEffect:
      "役員会提案で「経営目標 → DX投資 → ROI」の流れで説明できるようになり、提案承認率が6割から8割に上昇。執行役員候補に",
    nextGoal: "ITコーディネータ または MBA",
    keyTakeaways: [
      "DX推進者は中期経営計画書を題材に論文設計を練習する",
      "AI添削で「経営目標との因果関係」を毎回強化",
      "資格は役員会での提案承認率に直接寄与する",
    ],
    relatedEssayExam: "st",
    publishedOffsetDays: 8,
  },
  {
    slug: "st-itsenryaku-consul-36sai",
    exam: "st",
    titleHook: "コンサルタント36歳・案件単価向上のためST取得",
    ageRange: "30代前半",
    occupation: "ITコンサルタント（業務系）",
    background: "AP保有、コンサルファーム5年",
    motivation:
      "シニアコンサルへの昇格条件として戦略系資格が推奨されていた。社内昇格 + 顧客アピールの両狙い",
    studyMonths: 6,
    totalStudyHours: 280,
    passedAt: "2025-10",
    score: "午後Ⅱ A評価",
    weeklyHours: 11,
    scheduleNarrative:
      "クライアントワーク後の1.5時間 + 休日3時間。出張中はホテルで論文骨子検討。",
    strugglePoint:
      "論文の構成力は得意だが、IT戦略の中身（具体的な技術選定根拠）で抽象度が高すぎる傾向があった",
    breakthroughMethod:
      "AIコパイロットに「この論文、技術選定根拠が薄い。SA視点で具体的な代替案と比較を入れて」と毎回フィードバック依頼",
    toolMix:
      "コンサルメソッド本 + 過去問AI + 社内シニアの過去合格論文",
    examDayNarrative:
      "午後Ⅱは「業界再編期のIT戦略」を選択。コンサル案件を脱色して書いた",
    afterEffect:
      "シニアコンサル昇格 + 顧客提案単価アップ。「ST合格者として提案します」と冒頭に書けるだけで信頼感が変わった",
    nextGoal: "プロジェクトマネージャ（PM）",
    keyTakeaways: [
      "コンサル昇格条件としてSTは投資効率が高い",
      "論文構成は得意でも技術根拠の具体性が課題になりやすい",
      "AI添削で抽象度のチューニングを反復",
    ],
    relatedEssayExam: "st",
    publishedOffsetDays: 11,
  },
  {
    slug: "st-bushou-48sai-cio-jisedai",
    exam: "st",
    titleHook: "情シス部長48歳・CIO候補としてST取得",
    ageRange: "40代後半",
    occupation: "情報システム部長",
    background: "PM・SA保有、情シス20年、部長3年目",
    motivation:
      "CIO候補としての客観要件を満たす必要があった。社外取締役からも資格取得を推奨されていた",
    studyMonths: 12,
    totalStudyHours: 420,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 8,
    scheduleNarrative:
      "1年計画。週末に論文1本、平日は午前過去問。1年計画にすることで本業ピーク期も学習を止めずに済んだ。",
    strugglePoint:
      "20年の現場感覚が逆に邪魔をして、論文が「実務をなぞるだけ」になりがちだった。抽象論への引き上げに半年かかった",
    breakthroughMethod:
      "AIコパイロットに「論文のどの段落が『実務報告』になっているか、抽象論に書き直して」と依頼。10本添削後に視座が上がった",
    toolMix:
      "公式論文集 + 自社の事業戦略資料 + 過去問AI",
    examDayNarrative:
      "午後Ⅱは「グローバル展開とIT戦略」を選択。海外子会社統合の自社事例を抽象化",
    afterEffect:
      "CIO昇格の最終要件を満たした。社外講演依頼が増え、社内外でのプレゼンス向上",
    nextGoal: "システム監査技術者（AU） + 社外取締役研修",
    keyTakeaways: [
      "40代以降の経験豊富層は『実務報告』から抽象論への引き上げが課題",
      "1年計画なら本業ピーク期も学習を止めずに済む",
      "STはCIO・経営層キャリアの必須要件",
    ],
    relatedEssayExam: "st",
    publishedOffsetDays: 14,
  },

  /* ============== SA（システムアーキテクト） 3本 ============== */
  {
    slug: "sa-architect-34sai-jissen-sokumen",
    exam: "sa",
    titleHook: "業務系アーキテクト34歳・実務知識の体系化でSA合格",
    ageRange: "30代前半",
    occupation: "システムアーキテクト（業務系SIer）",
    background: "AP保有、アーキテクト業務4年目",
    motivation:
      "実務でアーキテクト名乗りはしているが、客観証明がなくレビュー時に発言力が弱いと感じていた",
    studyMonths: 6,
    totalStudyHours: 240,
    passedAt: "2025-10",
    score: "午後Ⅱ A評価",
    weeklyHours: 10,
    scheduleNarrative:
      "平日1.5時間・休日3時間。論文は隔週で1本、午前は通勤電車で。",
    strugglePoint:
      "設計の現場では「正解」を1つに絞らないが、論文では明確な根拠提示が求められる。判断軸の言語化に苦労",
    breakthroughMethod:
      "AIコパイロットに「この設計判断のトレードオフを3軸で表にして」と頼み、判断軸を可視化。論文での根拠提示が早くなった",
    toolMix:
      "論文集 + 過去問AI + 社内設計書のリバースエンジニアリング",
    examDayNarrative:
      "午後Ⅱは「外部システム連携を含むアーキテクチャ設計」テーマ。担当案件を抽象化して書ききった",
    afterEffect:
      "設計レビューで「SA保有者の意見」として扱われるようになり、議論の流れを作れる立場に。シニアアーキテクト昇格",
    nextGoal: "ITストラテジスト（ST）",
    keyTakeaways: [
      "実務アーキテクトは判断軸の言語化が論文攻略の鍵",
      "AI添削でトレードオフ表を毎回作る習慣をつける",
      "資格保有でレビュー時の発言力が変わる",
    ],
    relatedEssayExam: "sa",
    publishedOffsetDays: 7,
  },
  {
    slug: "sa-web-engineer-30sai-modan",
    exam: "sa",
    titleHook: "Webエンジニア30歳・モダン設計とSA論文の橋渡し",
    ageRange: "30代前半",
    occupation: "Webエンジニア（自社サービス開発）",
    background: "AP保有、マイクロサービス設計経験",
    motivation:
      "モダンWeb開発の設計経験を、SIer視点の伝統的アーキテクチャ用語に翻訳できないと感じた。両方の世界を行き来できる証明として受験",
    studyMonths: 5,
    totalStudyHours: 220,
    passedAt: "2025-10",
    score: "午後Ⅱ A評価",
    weeklyHours: 11,
    scheduleNarrative:
      "業務後2時間・休日3時間。論文添削をAIコパイロットで毎週回した。",
    strugglePoint:
      "業務系のバッチ処理・帳票出力など『伝統的』領域の論文事例が経験になく、論述材料が不足していた",
    breakthroughMethod:
      "AIコパイロットに「業務系SIerのバッチ処理設計を、Webエンジニア目線で再翻訳して」と依頼。マイクロサービスでのイベント処理と対応付けて理解",
    toolMix:
      "論文集 + 過去問AI + IPAサンプル答案分析",
    examDayNarrative:
      "午後Ⅱは「複数システム連携設計」を選択。マイクロサービス間連携の経験を業務系用語に翻訳して論述",
    afterEffect:
      "自社サービスでの設計議論が SIer出身メンバーともスムーズに。技術スタック横断の議論で頼られる存在に",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "モダンWeb系は伝統的SIer用語への翻訳練習が必須",
      "AIで「Webから業務系へ」「業務系からWebへ」相互翻訳",
      "用語を両方使えると設計議論で強い",
    ],
    relatedEssayExam: "sa",
    publishedOffsetDays: 10,
  },
  {
    slug: "sa-pm-doumonsei-40sai",
    exam: "sa",
    titleHook: "PM保有40歳・現場と経営の橋渡しでSA追加取得",
    ageRange: "40代前半",
    occupation: "プロジェクトマネージャ",
    background: "PM・AP保有、PM経験8年",
    motivation:
      "PMの計画力に技術設計の根拠力を加えたかった。経営層への説明で技術根拠を自分で持ちたい",
    studyMonths: 7,
    totalStudyHours: 260,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 9,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。PM論文の経験を活かしSA論文も書きやすかったが、技術深度の調整が課題。",
    strugglePoint:
      "PMの目線で書くと「進捗管理」「リスク管理」中心になりがちで、アーキテクト視点の「設計判断」が薄くなった",
    breakthroughMethod:
      "AIコパイロットに「PM視点の段落を3割削って、SA視点の設計判断・トレードオフを2割増やせ」と添削依頼を毎回",
    toolMix:
      "論文集 + 過去問AI + 担当案件の設計書",
    examDayNarrative:
      "午後Ⅱは「ステークホルダー多数のアーキテクチャ設計」テーマ。PMの調整経験を背景にしつつ設計判断を前面に",
    afterEffect:
      "プロジェクト立ち上げ時にPMとSAを兼務できるポジションを得て、案件単価が上昇",
    nextGoal: "ITストラテジスト（ST）",
    keyTakeaways: [
      "PM保有者はSA論文で「設計判断」を意識的に増やす",
      "AI添削で視点比率を毎回測る",
      "PM + SA保有でPj立ち上げのキーマンになれる",
    ],
    relatedEssayExam: "sa",
    publishedOffsetDays: 13,
  },

  /* ============== PM（プロジェクトマネージャ） 4本 ============== */
  {
    slug: "pm-shokyu-pm-31sai-shokyu-shoki",
    exam: "pm",
    titleHook: "新人PM31歳・PM論文で挫けかけたが半年で合格",
    ageRange: "30代前半",
    occupation: "プロジェクトマネージャ（SIer・PM歴2年）",
    background: "AP保有、SE10年→PM転向2年目",
    motivation:
      "PMとして自信が持てず、客観的な『PMとしての合格証』が欲しかった",
    studyMonths: 6,
    totalStudyHours: 230,
    passedAt: "2025-10",
    score: "午後Ⅱ A評価",
    weeklyHours: 9,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。論文は週1本、AIで添削後に再執筆まで実施。",
    strugglePoint:
      "PM経験2年で「失敗事例」しか書けない論文が量産された。成功体験を抽象化する力が不足していた",
    breakthroughMethod:
      "AIコパイロットに「この失敗からPMが学んだ知見だけを抽出し、成功事例として書き直して」と依頼。失敗の中の成功要素を抽出する練習で論文が変わった",
    toolMix:
      "論文集 + 過去問AI + 先輩PMとの月1相談",
    examDayNarrative:
      "午後Ⅱは「進捗遅延への対応」を選択。実プロジェクトでの遅延対応経験をベースに、PMの判断根拠を主軸で執筆",
    afterEffect:
      "PMとして社内の中規模案件を主体的に動かせるようになり、メンバーからも信頼感が変わった",
    nextGoal: "システムアーキテクト（SA）",
    keyTakeaways: [
      "若手PMは失敗事例から成功要素を抽出する練習が要",
      "AI添削で「PMの判断根拠」を毎回強化",
      "資格はPMとしての自信を補強する",
    ],
    relatedEssayExam: "pm",
    publishedOffsetDays: 6,
  },
  {
    slug: "pm-bunkateki-pm-37sai-3kaime",
    exam: "pm",
    titleHook: "3度目の挑戦・37歳ベテランPMが論文の罠を超えた",
    ageRange: "30代後半",
    occupation: "プロジェクトマネージャ（外資SI）",
    background: "AP保有、PM経験10年、PM試験2回不合格",
    motivation:
      "2回連続で午後Ⅱ B評価で落ちた。論文の問題点が分からず迷走していた",
    studyMonths: 8,
    totalStudyHours: 300,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 9,
    scheduleNarrative:
      "8か月で論文40本執筆。月5本ペース。",
    strugglePoint:
      "経験は豊富なのに論文がB評価止まり。「設問への直接的な応答が弱い」と添削で指摘され続けていた",
    breakthroughMethod:
      "AIコパイロットに「論文の各段落が設問のどの問いに答えているか、マッピング表で見せて」と依頼。設問→論述の対応関係を可視化したら、無関係な段落が3割もあったと判明",
    toolMix:
      "論文集 + 過去問AI（設問マッピング機能） + 自分の不合格論文の見直し",
    examDayNarrative:
      "午後Ⅱは「ステークホルダー対立の調整」を選択。設問→段落マッピングを意識して論述",
    afterEffect:
      "3度目の正直で合格。PM資格保有者として上位案件のリードPMに登用",
    nextGoal: "ITストラテジスト（ST）",
    keyTakeaways: [
      "PM論文B評価の原因は「設問への直接応答の弱さ」が多い",
      "AI添削で設問→段落マッピング表を作る",
      "経験豊富でも論文の型を意識的に学ぶ必要がある",
    ],
    relatedEssayExam: "pm",
    publishedOffsetDays: 9,
  },
  {
    slug: "pm-itil-pm-44sai-senryakurinkai",
    exam: "pm",
    titleHook: "44歳・運用畑からPM転身、初挑戦で一発合格",
    ageRange: "40代前半",
    occupation: "プロジェクトマネージャ（インフラ系）",
    background: "ITILv4、AP保有、運用15年→PM転向3年目",
    motivation:
      "運用畑から開発PMへ完全転身する過程で、PM資格保有が社内アピールとして必要だった",
    studyMonths: 7,
    totalStudyHours: 270,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 9,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。運用経験を活かしリスク管理章を厚く、開発経験不足は文献ベースで補強。",
    strugglePoint:
      "運用視点で「リスク・問題管理」は強いが、開発プロジェクト特有の「要件定義・スコープ管理」で経験が浅かった",
    breakthroughMethod:
      "AIコパイロットに「運用経験者向けに、開発プロジェクトの要件定義段階で起きる典型的なPM課題を体系化して」と依頼し、開発プロジェクトの典型シナリオを20件インプット",
    toolMix:
      "論文集 + 過去問AI + 社内の過去プロジェクト報告書",
    examDayNarrative:
      "午後Ⅱは「要員配置とスケジュール調整」を選択。運用畑出身を活かしリスク管理の章で差別化",
    afterEffect:
      "運用 + PM両方できる人材として希少性が高まり、社内のクリティカル案件に投入される機会増加",
    nextGoal: "ITサービスマネージャ（SM）またはAU",
    keyTakeaways: [
      "運用畑出身PMは「開発特有のPM課題」を後付けで学ぶ",
      "AIで典型シナリオを大量インプット",
      "運用 + PM のスキルセット組み合わせは希少",
    ],
    relatedEssayExam: "pm",
    publishedOffsetDays: 12,
  },
  {
    slug: "pm-josei-pm-33sai-ikujifukki",
    exam: "pm",
    titleHook: "育休復帰女性PM33歳・時短勤務でPM合格",
    ageRange: "30代前半",
    occupation: "プロジェクトマネージャ（時短勤務）",
    background: "AP保有、PM経験4年、育休復帰直後",
    motivation:
      "時短勤務でPM職を続けるため、客観的な能力証明が必要だった",
    studyMonths: 9,
    totalStudyHours: 240,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 6,
    scheduleNarrative:
      "9か月の長期計画。子供の寝かしつけ後45分が主戦場。論文は土日の朝1時間で。",
    strugglePoint:
      "学習時間が短いため論文の本数が稼げず、添削サイクルが遅れがちだった",
    breakthroughMethod:
      "「論文1本を分割して書く」方式に切り替え、30分で章単位の執筆 → 翌日30分で次章。AIコパイロットで章ごとに即時添削",
    toolMix:
      "論文集 + 過去問AI（章単位添削） + スマホ過去問",
    examDayNarrative:
      "午後Ⅱは「短納期プロジェクトの優先順位調整」を選択。育児中の時間管理感覚をPM論述に応用",
    afterEffect:
      "時短勤務継続でも社内評価が維持され、フルタイム復帰時にシニアPMへ昇格",
    nextGoal: "ITストラテジスト（ST）",
    keyTakeaways: [
      "時短勤務者は「論文を章単位で分割執筆」が現実解",
      "AI即時添削で章ごとに完結",
      "育児中の時間管理感覚は論文の説得力に変換できる",
    ],
    relatedEssayExam: "pm",
    publishedOffsetDays: 15,
  },

  /* ============== NW（ネットワークスペシャリスト） 4本 ============== */
  {
    slug: "nw-infra-engineer-29sai-jissen",
    exam: "nw",
    titleHook: "インフラエンジニア29歳・実務密接5か月でNW合格",
    ageRange: "20代後半",
    occupation: "インフラエンジニア（クラウド系）",
    background: "AP保有、AWS実務3年、オンプレ経験2年",
    motivation:
      "AWS中心の実務で OSI参照モデルの下位層理解が浅くなっており、NWで地盤を固めたかった",
    studyMonths: 5,
    totalStudyHours: 230,
    passedAt: "2025-10",
    score: "午前Ⅰ免除 / 午前Ⅱ80点 / 午後Ⅰ72点 / 午後Ⅱ68点",
    weeklyHours: 11,
    scheduleNarrative:
      "平日1.5時間・休日4時間。午後Ⅱの長文事例は休日にまとめて。",
    strugglePoint:
      "クラウド中心の実務でルーティング・スイッチング・サブネット計算など『下位層』の細部に弱かった",
    breakthroughMethod:
      "AIコパイロットに「AWSでこの設計をオンプレ機器でやるとどうなる」と毎回問い、クラウド→オンプレ対応関係を整理",
    toolMix:
      "ポケットスタディ + 過去問AI + オンプレ機器のシミュレータ",
    examDayNarrative:
      "午後Ⅱはセキュリティ寄りのVPN設計を選択。実務経験ある問題で時間内に書き切った",
    afterEffect:
      "AWS設計議論でオンプレ前提のネットワーク知識を交えられるようになり、ハイブリッドクラウド案件の主力に",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "クラウド系エンジニアこそNWで下位層を補強する価値が高い",
      "AIで「クラウド→オンプレ」相互翻訳を反復",
      "ハイブリッドクラウド案件でNW知識が差別化に",
    ],
    publishedOffsetDays: 4,
  },
  {
    slug: "nw-shanai-se-35sai-shaiyuu-saiekti",
    exam: "nw",
    titleHook: "社内SE35歳・社内ネットワーク刷新プロジェクトと並行で合格",
    ageRange: "30代前半",
    occupation: "社内SE（ネットワーク運用）",
    background: "AP保有、社内NW運用8年",
    motivation:
      "全社拠点間ネットワーク刷新の責任者を任され、ベンダー提案を評価できる知識が必要だった",
    studyMonths: 7,
    totalStudyHours: 290,
    passedAt: "2025-04",
    score: "午前Ⅱ74点 / 午後Ⅰ68点 / 午後Ⅱ74点",
    weeklyHours: 10,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。本業の刷新プロジェクト稼働期は学習量を週5時間まで落として継続。",
    strugglePoint:
      "MPLS-VPN、IPv6、SD-WANなどベンダー提案で頻出の新世代技術が、教科書ベースの知識では追いつかなかった",
    breakthroughMethod:
      "AIコパイロットに「ベンダー提案書に出てくるSD-WANの構成要素を、午後Ⅰの設問形式で出題して」と依頼。実務テーマと試験論点を直結させた",
    toolMix:
      "ポケットスタディ + 過去問AI + ベンダー提案書",
    examDayNarrative:
      "午後Ⅱは拠点間VPN設計を選択。本業で扱っていたMPLS-VPN事例が題材と重なり、時間内に書き切った",
    afterEffect:
      "ベンダー提案を技術的に評価できるようになり、過去 \"提案丸呑み\" だった意思決定を社内主導に転換",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "社内ネットワーク刷新と並行受験は実務と試験論点が重なって効率的",
      "新世代技術はAIで設問形式に再構成して学ぶ",
      "ベンダー対等交渉のための投資として優秀",
    ],
    publishedOffsetDays: 7,
  },
  {
    slug: "nw-ses-25sai-shoten",
    exam: "nw",
    titleHook: "SES派遣25歳・現場ガチャからの脱出戦略でNW取得",
    ageRange: "20代後半",
    occupation: "SESエンジニア（NW運用監視）",
    background: "FE保有、NW運用監視1年・テスター2年",
    motivation:
      "派遣先の運用監視業務がループしている状況を変えたかった。NW合格でアサインを設計案件にシフト",
    studyMonths: 6,
    totalStudyHours: 260,
    passedAt: "2025-10",
    score: "午前Ⅱ72点 / 午後Ⅰ66点 / 午後Ⅱ70点",
    weeklyHours: 10,
    scheduleNarrative:
      "業務後2時間・休日4時間。運用監視シフト勤務に合わせフレキシブルに。",
    strugglePoint:
      "監視業務だけでは設計目線の経験が積めず、午後Ⅱの記述で設計判断の根拠が弱かった",
    breakthroughMethod:
      "AIコパイロットに「監視業務で見ているこの障害が、設計フェーズではどう予防されているか」と聞き、運用 → 設計の逆引き学習を反復",
    toolMix:
      "過去問AI + 教科書 + GNS3シミュレータ",
    examDayNarrative:
      "午後Ⅱは負荷分散設計を選択。シミュレータで触っていた構成が題材で時間内に完答",
    afterEffect:
      "NW合格を機に派遣先を変更し、設計案件にアサイン。単価が2割上昇、運用ループから脱出",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "運用監視SESは設計フェーズへの逆引き学習で経験不足を補う",
      "シミュレータで触ると論述の説得力が変わる",
      "資格はSESの単価・案件選択肢を直接動かす",
    ],
    publishedOffsetDays: 10,
  },
  {
    slug: "nw-rinji-bushou-44sai-jisedai",
    exam: "nw",
    titleHook: "情シス課長44歳・次世代育成 + 経営説明のためNW取得",
    ageRange: "40代後半",
    occupation: "情報システム課長",
    background: "AP・PM保有、社内NW担当15年",
    motivation:
      "ゼロトラスト・SASEなど新世代NW設計を経営層に説明するうえで、保有資格でも上位の更新が必要と判断",
    studyMonths: 9,
    totalStudyHours: 310,
    passedAt: "2025-04",
    score: "午前Ⅱ82点 / 午後Ⅰ70点 / 午後Ⅱ72点",
    weeklyHours: 8,
    scheduleNarrative:
      "9か月の長期計画。週末論文、平日午前過去問。新世代NW分野は専門書を別途購入。",
    strugglePoint:
      "15年前の知識が新世代NW（ゼロトラスト・SASE・SD-WAN）と接続できず、用語の表層理解で終わる時期が続いた",
    breakthroughMethod:
      "AIコパイロットに「ゼロトラストモデルを、従来の境界型防御から段階的に説明して」と依頼。15年前知識から段階的にブリッジ",
    toolMix:
      "専門書 + 過去問AI + ベンダー資料",
    examDayNarrative:
      "午後Ⅱはセキュアアクセス設計を選択。経営説明用の資料作成経験が論述設計に応用できた",
    afterEffect:
      "経営層へのゼロトラスト移行提案が承認され、3年計画のNW刷新プロジェクトの責任者に",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "ベテラン情シスはNW新世代技術への接続学習が必要",
      "AIで「従来→現代」の段階的ブリッジを作る",
      "経営説明力 × 技術知識で大型刷新を主導できる",
    ],
    publishedOffsetDays: 13,
  },

  /* ============== DB（データベーススペシャリスト） 4本 ============== */
  {
    slug: "db-data-engineer-30sai-bunseki",
    exam: "db",
    titleHook: "データエンジニア30歳・SQL実務 × DB理論の橋渡し",
    ageRange: "30代前半",
    occupation: "データエンジニア（BIプラットフォーム）",
    background: "AP保有、SQL実務5年、BigQuery / Snowflake運用",
    motivation:
      "実務は分析SQLが中心で、正規化・トランザクション・トリガーなどOLTP設計の体系が弱かった",
    studyMonths: 5,
    totalStudyHours: 220,
    passedAt: "2025-10",
    score: "午前Ⅱ80点 / 午後Ⅰ72点 / 午後Ⅱ70点",
    weeklyHours: 10,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。午後Ⅱは大きな机が必要なため休日に集中。",
    strugglePoint:
      "DWH中心の実務で、第3正規化やER図設計の細部を問われると詰まる場面が多かった",
    breakthroughMethod:
      "AIコパイロットに「分析用のスタースキーマと、OLTP用の第3正規化を同じテーマで対比して」と依頼。実務（DWH）と試験（OLTP）の差分を整理",
    toolMix:
      "教科書 + 過去問AI + 実務SQLログ",
    examDayNarrative:
      "午後Ⅱはトランザクション設計を選択。教科書知識を活かして論述",
    afterEffect:
      "OLTP設計の議論にも参加できるようになり、データ基盤チームの幅が広がった。データプラットフォームリードに昇格",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "データエンジニアはOLTP設計の体系学習で実務を補強できる",
      "AIで「DWH ↔ OLTP」相互翻訳を反復",
      "DB資格でデータプラットフォームリードのポジションに",
    ],
    publishedOffsetDays: 3,
  },
  {
    slug: "db-shokyu-shogun-26sai-dba",
    exam: "db",
    titleHook: "DBA見習い26歳・現場ローテーション3年目で合格",
    ageRange: "20代後半",
    occupation: "DBA（金融系SIer）",
    background: "FE保有、Oracle運用2年・チューニング1年",
    motivation:
      "金融系DBAは資格保有が信頼性につながる。3年目で取得しないと評価が止まると感じた",
    studyMonths: 6,
    totalStudyHours: 260,
    passedAt: "2025-04",
    score: "午前Ⅱ74点 / 午後Ⅰ68点 / 午後Ⅱ72点",
    weeklyHours: 10,
    scheduleNarrative:
      "平日2時間・休日3時間。Oracle実機での演習を含めて学習効率を上げた。",
    strugglePoint:
      "実務は単一DBの運用が中心で、複数DB連携やレプリケーション設計の知識が薄かった",
    breakthroughMethod:
      "AIコパイロットに「単一DBの運用しか経験ない人向けに、複数DB連携・レプリケーション設計の典型シナリオを段階的に説明して」と依頼",
    toolMix:
      "教科書 + 過去問AI + Oracle実機演習",
    examDayNarrative:
      "午後Ⅱはレプリケーション設計を選択。直前期の演習が実を結び時間内に完答",
    afterEffect:
      "DBA 3年目で資格保有者として案件アサインの幅が広がり、新規DB構築案件のリードを任された",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "金融系DBAは資格保有でアサイン幅が変わる",
      "実機演習で論述の説得力が増す",
      "AIで未経験トピックの段階的補強",
    ],
    publishedOffsetDays: 6,
  },
  {
    slug: "db-shanai-se-37sai-jisedai-renkei",
    exam: "db",
    titleHook: "社内SE37歳・基幹DB刷新プロジェクトを期にDB取得",
    ageRange: "30代後半",
    occupation: "社内SE（業務システム）",
    background: "AP保有、基幹システム保守10年",
    motivation:
      "基幹DBのクラウド移行プロジェクトで、ベンダーの設計提案を評価する立場になった",
    studyMonths: 7,
    totalStudyHours: 280,
    passedAt: "2025-10",
    score: "午前Ⅱ76点 / 午後Ⅰ72点 / 午後Ⅱ70点",
    weeklyHours: 9,
    scheduleNarrative:
      "業務後1時間・休日3.5時間。基幹DB刷新プロジェクトの設計レビュー資料が実務と試験の橋渡しに。",
    strugglePoint:
      "保守業務中心で、新規設計時のスキーマ判断軸（正規化・非正規化の使い分け）に経験が乏しかった",
    breakthroughMethod:
      "AIコパイロットに「現行基幹DBのスキーマ判断を、午後Ⅰ問題の論述形式で解説して」と依頼。実務題材を試験論点に再構成",
    toolMix:
      "教科書 + 過去問AI + 現行スキーマ図",
    examDayNarrative:
      "午後Ⅱは性能設計を選択。基幹DB刷新の事例を抽象化して論述",
    afterEffect:
      "ベンダー提案の評価で技術的優位に立てるようになり、クラウド移行案件のリードに登用",
    nextGoal: "システムアーキテクト（SA）",
    keyTakeaways: [
      "保守中心の社内SEは新規設計時の判断軸を後付けで学ぶ",
      "実務題材を試験論点に再構成するAI活用",
      "刷新プロジェクトと資格学習の同時並行は効率的",
    ],
    publishedOffsetDays: 9,
  },
  {
    slug: "db-josei-engineer-31sai-ikuji-ato",
    exam: "db",
    titleHook: "育児両立中の31歳DBエンジニア・8か月で合格",
    ageRange: "30代前半",
    occupation: "DBエンジニア（時短勤務）",
    background: "AP保有、DB設計3年、育児中",
    motivation:
      "時短勤務でも専門性で評価されたい。DB専門資格は時短勤務の信頼性補強として最適と判断",
    studyMonths: 8,
    totalStudyHours: 200,
    passedAt: "2025-04",
    score: "午前Ⅱ72点 / 午後Ⅰ68点 / 午後Ⅱ68点",
    weeklyHours: 6,
    scheduleNarrative:
      "8か月計画。子供の寝かしつけ後45分、土日朝の1時間。",
    strugglePoint:
      "学習時間が限られ、午後Ⅱの長文事例を最後まで書き切る練習が不足",
    breakthroughMethod:
      "週末1日で論述「骨子だけ」を30分で書き、翌週末に肉付けする2週サイクル。AIコパイロットで骨子段階で論点漏れチェック",
    toolMix:
      "過去問AI + 教科書 + スマホ過去問",
    examDayNarrative:
      "午後Ⅱはトランザクション設計を選択。骨子段階で論点を絞っていたため時間内に書き切れた",
    afterEffect:
      "時短勤務でもDB専門家として案件にアサインされるようになり、評価面談で「専門性が確立した」と書面評価",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "時短勤務者は論文骨子→肉付けの2週サイクルが現実的",
      "AIで骨子段階の論点漏れチェック",
      "DB専門資格は時短勤務の信頼性補強に有効",
    ],
    publishedOffsetDays: 12,
  },

  /* ============== ES（エンベデッドシステムスペシャリスト） 3本 ============== */
  {
    slug: "es-jidousha-engineer-32sai-mcu",
    exam: "es",
    titleHook: "自動車業界32歳・MCUファーム開発者がES合格",
    ageRange: "30代前半",
    occupation: "車載組込みエンジニア（MCUファーム開発）",
    background: "AP保有、C/C++開発5年、AUTOSAR経験あり",
    motivation:
      "AUTOSAR / Functional Safetyの実務で、組込みの体系知識を客観証明したかった",
    studyMonths: 5,
    totalStudyHours: 230,
    passedAt: "2025-10",
    score: "午前Ⅱ82点 / 午後Ⅰ72点 / 午後Ⅱ70点",
    weeklyHours: 11,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。リアルタイムOS・割込み設計など実務と重なる分野は短時間で。",
    strugglePoint:
      "AUTOSARベースの自動車向け開発は標準化されており、ESで問われる汎用組込み設計（家電・産業機器）に発想を広げるのに時間がかかった",
    breakthroughMethod:
      "AIコパイロットに「AUTOSARの設計パターンを汎用組込み設計に翻訳して」と依頼。自動車独自の制約を抜いた骨格を理解",
    toolMix:
      "教科書 + 過去問AI + 社内の家電プロジェクト資料",
    examDayNarrative:
      "午後Ⅱはリアルタイム制御を選択。AUTOSAR知識を汎用化して論述",
    afterEffect:
      "車載 × 汎用組込み両方の議論ができる人材として評価され、新規家電プロジェクトの設計レビュアーに",
    nextGoal: "情報処理安全確保支援士（SC）",
    keyTakeaways: [
      "業界特化エンジニアはESで汎用化スキルを習得",
      "AIで業界標準 → 汎用設計への翻訳",
      "業界横断の議論ができる人材は希少",
    ],
    publishedOffsetDays: 2,
  },
  {
    slug: "es-iot-engineer-28sai-shouhin",
    exam: "es",
    titleHook: "IoT商品開発28歳・ハード × ソフト両面でES合格",
    ageRange: "20代後半",
    occupation: "IoTスマート家電エンジニア",
    background: "FE保有、Wi-Fi / BLE通信モジュール開発3年",
    motivation:
      "ハード設計とソフト設計を両方やる立場で、双方の体系知識をES試験で固めたかった",
    studyMonths: 6,
    totalStudyHours: 240,
    passedAt: "2025-04",
    score: "午前Ⅱ74点 / 午後Ⅰ68点 / 午後Ⅱ72点",
    weeklyHours: 10,
    scheduleNarrative:
      "業務後2時間・休日2時間。試作品の評価期間は学習を中断するなど柔軟に。",
    strugglePoint:
      "ハードウェア設計の電気回路・センサ仕様問題が、ソフトウェアエンジニア出身の私には基礎理論が不足していた",
    breakthroughMethod:
      "AIコパイロットに「電子工作の本にあるレベルから、ES午前Ⅱで問われる回路理論までを段階的に説明して」と依頼。ステップ学習で理解",
    toolMix:
      "教科書 + 過去問AI + 電子工作の入門書",
    examDayNarrative:
      "午後Ⅱはセンサーネットワーク設計を選択。実務題材と近く時間内に完答",
    afterEffect:
      "ハードウェアエンジニアとの会話で対等に話せるようになり、ハード × ソフトの統合設計を任されるようになった",
    nextGoal: "ネットワークスペシャリスト（NW）",
    keyTakeaways: [
      "ソフト出身者は電気回路を段階学習で攻略",
      "AIで「電子工作レベル → 試験レベル」の段差を埋める",
      "IoT商品開発はハード × ソフト両方の資格価値が高い",
    ],
    publishedOffsetDays: 5,
  },
  {
    slug: "es-fa-engineer-39sai-plc",
    exam: "es",
    titleHook: "工場自動化39歳・PLC一筋からES取得で視野を広げる",
    ageRange: "30代後半",
    occupation: "工場自動化エンジニア（PLC・FA系）",
    background: "AP保有、PLC開発12年",
    motivation:
      "PLC専業から組込み全般へキャリアの幅を広げたく、ES取得で体系的に学び直し",
    studyMonths: 7,
    totalStudyHours: 270,
    passedAt: "2025-10",
    score: "午前Ⅱ76点 / 午後Ⅰ70点 / 午後Ⅱ74点",
    weeklyHours: 9,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。PLC実機演習を学習に組み込み、論述のリアリティを確保。",
    strugglePoint:
      "PLCラダー言語と組込みC言語のメンタルモデルが異なり、混乱しがちだった",
    breakthroughMethod:
      "AIコパイロットに「PLCラダーで実装するこの制御を、組込みCで実装するとどうなるか」と双方向に翻訳練習",
    toolMix:
      "教科書 + 過去問AI + PLC実機 + C言語入門書",
    examDayNarrative:
      "午後Ⅱは制御系設計を選択。PLC経験を抽象化して論述",
    afterEffect:
      "PLC × 組込みC両方できる人材として希少性が上がり、新規ライン立ち上げの設計責任者に登用",
    nextGoal: "システムアーキテクト（SA）",
    keyTakeaways: [
      "PLC専業エンジニアはESで組込みC視点を獲得",
      "AIで「PLC ↔ 組込みC」相互翻訳を反復",
      "業界特化スキルを横展開する手段としてES",
    ],
    publishedOffsetDays: 8,
  },

  /* ============== SC（情報処理安全確保支援士） 5本 ============== */
  {
    slug: "sc-shanai-cisco-31sai-csirt",
    exam: "sc",
    titleHook: "CSIRT配属31歳・実務直結でSC合格、登録支援士へ",
    ageRange: "30代前半",
    occupation: "セキュリティエンジニア（CSIRT）",
    background: "AP・SG保有、CSIRT配属1年目",
    motivation:
      "登録情報処理安全確保支援士の取得が部署目標。実務と直結する試験で実用性も高い",
    studyMonths: 5,
    totalStudyHours: 250,
    passedAt: "2025-10",
    score: "午前Ⅱ80点 / 午後Ⅰ74点 / 午後Ⅱ70点",
    weeklyHours: 12,
    scheduleNarrative:
      "業務後2時間・休日4時間。CSIRT実務インシデント対応経験がそのまま午後事例に直結。",
    strugglePoint:
      "実務はWAF・EDRなど運用ツール中心で、暗号方式・認証プロトコルの理論で時々詰まった",
    breakthroughMethod:
      "AIコパイロットに「現場のEDR/SIEMアラートを、SC午後Ⅰの設問形式に再構成して」と依頼。実務と試験の論点接続を強化",
    toolMix:
      "教科書 + 過去問AI + 自社のインシデント対応記録",
    examDayNarrative:
      "午後Ⅱは標的型攻撃対応を選択。CSIRT実務経験そのままで時間内に完答",
    afterEffect:
      "登録情報処理安全確保支援士として活動開始。社内外でセキュリティ専門家として呼ばれる機会増加",
    nextGoal: "登録情報処理安全確保支援士の維持研修",
    keyTakeaways: [
      "CSIRT実務者は午後Ⅱの実例論述が最大の強み",
      "理論分野はAIで設問形式に再構成して補強",
      "登録支援士は専門家としての社内外プレゼンスに直結",
    ],
    relatedEssayExam: "sc",
    publishedOffsetDays: 1,
  },
  {
    slug: "sc-shanai-se-33sai-saigo",
    exam: "sc",
    titleHook: "社内SE33歳・3度目の挑戦で念願のSC合格",
    ageRange: "30代前半",
    occupation: "社内SE（インフラ運用）",
    background: "AP・SG保有、SC受験3回目",
    motivation:
      "過去2回午後Ⅱで惜敗。社内のセキュリティ責任者ポジションの最終条件",
    studyMonths: 6,
    totalStudyHours: 320,
    passedAt: "2025-04",
    score: "午前Ⅱ74点 / 午後Ⅰ68点 / 午後Ⅱ72点",
    weeklyHours: 12,
    scheduleNarrative:
      "業務後2時間・休日4時間。過去2回の不合格論述を全て見直しから始めた。",
    strugglePoint:
      "午後Ⅱで「設問の具体性に答えきれない」癖があり、抽象的な対策を書きがちだった",
    breakthroughMethod:
      "AIコパイロットに過去不合格論述を投入し「設問のどの具体性が抜けているか」を逐次分析。20本添削で抽象→具体の癖を矯正",
    toolMix:
      "過去問AI + 教科書 + 自分の不合格論述",
    examDayNarrative:
      "午後Ⅱは多層防御設計を選択。具体的なツール名・設定値まで書き込めた",
    afterEffect:
      "社内セキュリティ責任者に正式任命。CSIRT組成 + ISMS認証取得プロジェクトのリードに",
    nextGoal: "システム監査技術者（AU）",
    keyTakeaways: [
      "SC不合格の原因は午後Ⅱの「具体性不足」が多い",
      "AIで過去不合格論述から癖を可視化",
      "セキュリティ責任者ポジションの実質的な必須要件",
    ],
    relatedEssayExam: "sc",
    publishedOffsetDays: 4,
  },
  {
    slug: "sc-pen-tester-28sai-redteam",
    exam: "sc",
    titleHook: "ペネトレーションテスター28歳・攻撃側視点でSC合格",
    ageRange: "20代後半",
    occupation: "ペネトレーションテスター",
    background: "AP・OSCP保有、ペネトレ実務2年",
    motivation:
      "攻撃側スキルの実証はOSCPで済んでいたが、防御側設計の体系知識をSCで補強したかった",
    studyMonths: 4,
    totalStudyHours: 200,
    passedAt: "2025-10",
    score: "午前Ⅱ86点 / 午後Ⅰ78点 / 午後Ⅱ74点",
    weeklyHours: 12,
    scheduleNarrative:
      "業務後1.5時間・休日4時間。攻撃側知識が午前Ⅱで効きすぎ、午前は短時間で済んだ。",
    strugglePoint:
      "防御側の「組織運用観点」（規程・教育・監査）の論述が、攻撃側の感覚では具体性に欠けた",
    breakthroughMethod:
      "AIコパイロットに「攻撃側経験者向けに、組織運用の防御設計を体系化して」と依頼。攻撃ベクトル → 防御規程の対応関係で記憶",
    toolMix:
      "過去問AI + 教科書 + 自分のペネトレ報告書",
    examDayNarrative:
      "午後Ⅱは Web アプリケーションのセキュリティ設計を選択。攻撃者視点で防御の穴を指摘 → 対策と論述",
    afterEffect:
      "攻撃 × 防御両方の視点を持つ希少人材として、コンサル案件の単価が大幅上昇",
    nextGoal: "登録情報処理安全確保支援士登録",
    keyTakeaways: [
      "攻撃者経験者は防御側の組織運用観点が弱点",
      "AIで攻撃ベクトル → 防御規程の対応表を作る",
      "攻撃 × 防御両視点は単価に直結",
    ],
    relatedEssayExam: "sc",
    publishedOffsetDays: 7,
  },
  {
    slug: "sc-shokyu-se-26sai-keieiteki-shinten",
    exam: "sc",
    titleHook: "新人SE26歳・配属2年目で挑戦したSCの壁",
    ageRange: "20代後半",
    occupation: "SE（金融系SI）",
    background: "AP保有、SE2年目",
    motivation:
      "金融系では若手でも資格保有が評価軸。早期にSCを取って案件選択肢を広げたかった",
    studyMonths: 7,
    totalStudyHours: 320,
    passedAt: "2025-04",
    score: "午前Ⅱ72点 / 午後Ⅰ70点 / 午後Ⅱ68点",
    weeklyHours: 11,
    scheduleNarrative:
      "業務後2時間・休日3時間。実務経験が浅いぶん時間で補う方針。",
    strugglePoint:
      "セキュリティ実務経験ゼロから挑むため、論述で「経験談」を書けず教科書知識のみの論述になりがち",
    breakthroughMethod:
      "AIコパイロットに「実務未経験者でも書ける、典型的なセキュリティインシデント事例を10件作って」と依頼。事例ストックを蓄積して論述材料に",
    toolMix:
      "過去問AI + 教科書 + 上司の過去合格論文",
    examDayNarrative:
      "午後Ⅱは内部不正対策を選択。AIで作った事例ストックを骨子に、教科書知識を肉付け",
    afterEffect:
      "金融系プロジェクトでセキュリティ担当としてアサインされるようになり、若手で大型案件のサブ責任者に",
    nextGoal: "プロジェクトマネージャ（PM）",
    keyTakeaways: [
      "実務未経験者はAIで仮想事例ストックを作る",
      "教科書知識 + 事例ストックで論述材料を確保",
      "金融系の若手は早期SC取得が案件選択肢を広げる",
    ],
    relatedEssayExam: "sc",
    publishedOffsetDays: 10,
  },
  {
    slug: "sc-josei-engineer-35sai-jirei",
    exam: "sc",
    titleHook: "セキュリティ商品開発35歳女性・育児両立でSC合格",
    ageRange: "30代前半",
    occupation: "セキュリティ製品開発エンジニア",
    background: "AP・SG保有、EDR製品の開発3年",
    motivation:
      "登録情報処理安全確保支援士の取得が会社方針。EDR開発に説得力を持たせるため",
    studyMonths: 8,
    totalStudyHours: 220,
    passedAt: "2025-04",
    score: "午前Ⅱ78点 / 午後Ⅰ70点 / 午後Ⅱ68点",
    weeklyHours: 7,
    scheduleNarrative:
      "8か月計画。子供の寝かしつけ後の45分が主戦場。土日朝に2時間追加。",
    strugglePoint:
      "EDR開発者として攻撃検知の理論は得意だが、組織側の規程・教育・運用論述が手薄",
    breakthroughMethod:
      "AIコパイロットに「EDR開発者目線で、組織運用観点のセキュリティ設計を体系化して」と依頼。製品観点 → 運用観点の翻訳練習を反復",
    toolMix:
      "過去問AI + 教科書 + 自社製品の運用ガイド",
    examDayNarrative:
      "午後Ⅱは標的型攻撃検知 + 組織運用を選択。製品開発知識を運用文脈に翻訳して論述",
    afterEffect:
      "製品開発側 + 運用観点両方持つ人材として、顧客SOCへの製品導入支援にも参画",
    nextGoal: "登録情報処理安全確保支援士登録 + AU",
    keyTakeaways: [
      "製品開発者は運用観点の論述が手薄になりやすい",
      "AIで製品 → 運用の翻訳練習",
      "登録支援士は製品開発者の信頼性補強に直結",
    ],
    relatedEssayExam: "sc",
    publishedOffsetDays: 13,
  },

  /* ============== SM（ITサービスマネージャ） 3本 ============== */
  {
    slug: "sm-ipo-shanai-se-38sai-itil",
    exam: "sm",
    titleHook: "情シス運用マネージャ38歳・ITIL × SMで管理体系を確立",
    ageRange: "30代後半",
    occupation: "情シス運用マネージャ",
    background: "AP・ITILv4保有、運用15年",
    motivation:
      "ITIL知識は持っていても客観証明としてSMを取得し、運用部門の地位向上を狙った",
    studyMonths: 7,
    totalStudyHours: 250,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 8,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。論文は週末に1本ペース。",
    strugglePoint:
      "実務経験は豊富だが、論文で『運用日誌』のような書き方になりがちで、抽象論への引き上げに苦労",
    breakthroughMethod:
      "AIコパイロットに「論文の段落のうち、運用日誌のような記述部分を抽象論に書き直して」と依頼を毎回",
    toolMix:
      "論文集 + 過去問AI + ITIL公式書籍",
    examDayNarrative:
      "午後Ⅱはインシデント管理の改善を選択。自社のインシデント対応プロセス再設計の実体験を抽象化",
    afterEffect:
      "運用部門の発言力が強化され、情シス全体方針への影響力が増した。運用部長候補に",
    nextGoal: "システム監査技術者（AU）",
    keyTakeaways: [
      "運用畑は論文の『運用日誌化』が最大の落とし穴",
      "AIで抽象論への書き直しを反復",
      "ITIL + SMでマネジメント信頼性を確立",
    ],
    relatedEssayExam: "sm",
    publishedOffsetDays: 0,
  },
  {
    slug: "sm-msp-engineer-34sai-aws",
    exam: "sm",
    titleHook: "AWS MSP運用エンジニア34歳・SREの体系化でSM合格",
    ageRange: "30代前半",
    occupation: "クラウドMSP（AWS運用受託）",
    background: "AP保有、AWS運用5年、SRE実務2年",
    motivation:
      "SRE実務をITIL / SM体系で再整理し、顧客説明力を強化",
    studyMonths: 6,
    totalStudyHours: 230,
    passedAt: "2025-10",
    score: "午後Ⅱ A評価",
    weeklyHours: 10,
    scheduleNarrative:
      "業務後2時間・休日2時間。SREメトリクスの分析と論文素材が直結。",
    strugglePoint:
      "SRE実務はメトリクス駆動だが、SM論文では『プロセス改善』の物語化が必要で、書き方が違う",
    breakthroughMethod:
      "AIコパイロットに「SLO違反のメトリクスを、SM論文の改善プロセス物語に翻訳して」と依頼を反復",
    toolMix:
      "論文集 + 過去問AI + 自社のSREポストモーテム",
    examDayNarrative:
      "午後Ⅱはサービスレベル管理を選択。SRE実体験をSM論文形式で論述",
    afterEffect:
      "MSP顧客への運用報告がプロセス改善物語として伝わるようになり、契約更新率が向上",
    nextGoal: "システムアーキテクト（SA）",
    keyTakeaways: [
      "SRE実務者はメトリクス → 物語の翻訳練習が要",
      "AIでSLO違反を改善プロセス物語に変換",
      "SMは顧客説明力強化に直結",
    ],
    relatedEssayExam: "sm",
    publishedOffsetDays: 3,
  },
  {
    slug: "sm-cloud-ops-29sai-josei",
    exam: "sm",
    titleHook: "クラウド運用29歳女性・若手で初挑戦SM合格",
    ageRange: "20代後半",
    occupation: "クラウド運用エンジニア（女性）",
    background: "AP保有、運用3年",
    motivation:
      "高度試験の中で女性比率が低い領域でリードしたかった。SMはサービス目線が女性視点と相性良いと判断",
    studyMonths: 6,
    totalStudyHours: 240,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 10,
    scheduleNarrative:
      "業務後2時間・休日2時間。論文は週末に1本、AIで添削後に再執筆。",
    strugglePoint:
      "経験年数3年でマネジメント実体験が浅く、論文の主人公像が説得力に欠けた",
    breakthroughMethod:
      "AIコパイロットに「経験浅いマネージャがリードを発揮した典型シナリオを20件作って」と依頼。論述の主人公像を仮想構築",
    toolMix:
      "論文集 + 過去問AI + 上司の合格論文",
    examDayNarrative:
      "午後Ⅱはリリース管理を選択。AIで作った典型シナリオを骨子に肉付け",
    afterEffect:
      "若手女性高度合格者として社内でロールモデル扱い。後輩女性の資格挑戦相談が増えた",
    nextGoal: "ITストラテジスト（ST）",
    keyTakeaways: [
      "経験浅い若手はAIで仮想シナリオを作って補完",
      "SMは女性比率が比較的高い高度試験",
      "ロールモデルとしての副次的価値",
    ],
    relatedEssayExam: "sm",
    publishedOffsetDays: 6,
  },

  /* ============== AU（システム監査技術者） 3本 ============== */
  {
    slug: "au-naibukansa-39sai-jaiotsu",
    exam: "au",
    titleHook: "内部監査39歳・J-SOX対応の延長線でAU合格",
    ageRange: "30代後半",
    occupation: "内部監査人（IT監査担当）",
    background: "AP・公認内部監査人（CIA）保有",
    motivation:
      "CIAは持っているがIPA系の客観証明があると社内外で通りやすい。AUで国内資格を補完",
    studyMonths: 6,
    totalStudyHours: 240,
    passedAt: "2025-10",
    score: "午後Ⅱ A評価",
    weeklyHours: 10,
    scheduleNarrative:
      "業務後1.5時間・休日3時間。J-SOX期は学習を週5時間に絞り柔軟運用。",
    strugglePoint:
      "監査論は得意だがIT技術論述（クラウド・新世代技術への監査観点）に経験不足",
    breakthroughMethod:
      "AIコパイロットに「クラウド監査の典型論点（CSP責任範囲・SLA監査）を体系化して」と依頼",
    toolMix:
      "論文集 + 過去問AI + 自社の内部監査調書",
    examDayNarrative:
      "午後Ⅱはクラウドサービス監査を選択。J-SOX実務経験をクラウド文脈に翻訳して論述",
    afterEffect:
      "クラウド監査の専門家として社内外から引き合いが増加。監査法人からの引き抜きオファーも",
    nextGoal: "公認会計士",
    keyTakeaways: [
      "CIA + AUの組み合わせは国内外で説得力が増す",
      "AIで新世代技術の監査観点を後追い学習",
      "クラウド監査領域は希少性が高い",
    ],
    relatedEssayExam: "au",
    publishedOffsetDays: 2,
  },
  {
    slug: "au-jiten-shanai-se-45sai-jisedai",
    exam: "au",
    titleHook: "情シス課長から監査部門へ転籍した45歳・AUで地位確立",
    ageRange: "40代後半",
    occupation: "監査部門（旧情シス課長）",
    background: "AP・SC保有、情シス20年→監査3年目",
    motivation:
      "現場 → 監査への転籍で「監査人としての客観証明」が必要だった",
    studyMonths: 8,
    totalStudyHours: 310,
    passedAt: "2025-04",
    score: "午後Ⅱ A評価",
    weeklyHours: 9,
    scheduleNarrative:
      "8か月の長期計画。論文は週1本、平日は午前過去問。",
    strugglePoint:
      "情シス目線が抜けず、論文が「現場目線の批評」になりがち。監査人としての中立性表現に苦労",
    breakthroughMethod:
      "AIコパイロットに「情シス目線の批評と監査人の指摘の違い」を毎回フィードバック。中立的なリスクベース表現に矯正",
    toolMix:
      "論文集 + 過去問AI + 内部監査基準",
    examDayNarrative:
      "午後Ⅱは情報セキュリティ監査を選択。現場経験を活かしつつ監査人としての中立性を担保して論述",
    afterEffect:
      "監査部門で「現場経験 + 監査資格」の希少人材として位置付けられ、社内最重要監査案件を担当",
    nextGoal: "公認情報システム監査人（CISA）",
    keyTakeaways: [
      "現場 → 監査の転籍者は中立性表現の矯正が課題",
      "AIで「現場目線 vs 監査目線」のフィードバック",
      "現場経験 + AUは監査部門で希少性が高い",
    ],
    relatedEssayExam: "au",
    publishedOffsetDays: 5,
  },
  {
    slug: "au-it-consul-42sai-shinketsu",
    exam: "au",
    titleHook: "ITコンサル42歳・監査領域参入のためAU取得",
    ageRange: "40代前半",
    occupation: "ITコンサルタント（業務改善 → 監査領域へ）",
    background: "AP・PM・ST保有、コンサル12年",
    motivation:
      "業務改善案件から監査・統制領域への業務拡張に必要だった",
    studyMonths: 5,
    totalStudyHours: 210,
    passedAt: "2025-10",
    score: "午後Ⅱ A評価",
    weeklyHours: 10,
    scheduleNarrative:
      "クライアントワーク後1.5時間・休日3時間。論文は出張中のホテルで骨子作成。",
    strugglePoint:
      "改善コンサル目線で「提案」を書く癖が抜けず、監査論述の「評価」スタンスへの転換が課題",
    breakthroughMethod:
      "AIコパイロットに「コンサル提案の段落を、監査評価の段落に書き直して」と依頼。提案 → 評価のスタンス変換を反復",
    toolMix:
      "論文集 + 過去問AI + 監査法人の研修資料",
    examDayNarrative:
      "午後Ⅱはシステム開発プロジェクト監査を選択。コンサル経験を抽象化しつつ評価視点で論述",
    afterEffect:
      "監査領域のコンサル案件にも参画できるようになり、案件単価と幅が両方拡大",
    nextGoal: "公認情報システム監査人（CISA）",
    keyTakeaways: [
      "コンサルはAUで「提案 → 評価」スタンス変換が必要",
      "AIで段落単位のスタンス変換練習",
      "業務改善 + 監査両方できると案件選択肢が広がる",
    ],
    relatedEssayExam: "au",
    publishedOffsetDays: 8,
  },
];
