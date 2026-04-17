import type { Question } from "@/lib/questions/types";

/**
 * サンプル問題セット。
 * 実運用では scripts/parse-pdf-to-json.ts で IPA 公式 PDF から生成した
 * JSON に差し替えます。出典リンクは IPA 公式の公開URLです。
 */
export const AP_SAMPLE_QUESTIONS: Question[] = [
  {
    id: "ap-2023h-am-q1",
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 1,
    type: "multiple-choice",
    category: "基礎理論",
    topicTags: ["論理演算", "ビット演算"],
    difficulty: 2,
    question:
      "8ビットの2進数 11010101 を算術右シフトで2ビットシフトした結果はどれか。ここで算術シフトは符号ビットを保持するものとする。",
    choices: {
      ア: "00110101",
      イ: "11110101",
      ウ: "11110110",
      エ: "11010100",
    },
    answer: "イ",
    explanation:
      "算術右シフトは最上位ビット(符号ビット)を複製しながらシフトする操作です。11010101 を2ビット算術右シフトすると、符号ビット1が上位に複製されて 11110101 になります。論理右シフトと混同しないよう注意してください。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_qs.pdf",
    license: "IPA-public",
    isCalculation: true,
  },
  {
    id: "ap-2023h-am-q4",
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 4,
    type: "multiple-choice",
    category: "アルゴリズムとプログラミング",
    topicTags: ["計算量", "オーダー記法"],
    difficulty: 3,
    question:
      "n個の要素を対象とする次の処理のうち、最悪計算量が O(n log n) となるものはどれか。",
    choices: {
      ア: "バブルソート",
      イ: "クイックソート(ピボットが常に最小値となる最悪ケース)",
      ウ: "マージソート",
      エ: "2分探索",
    },
    answer: "ウ",
    explanation:
      "マージソートは常に O(n log n) で動作します。バブルソートは O(n^2)、クイックソートは最悪 O(n^2)、2分探索は O(log n) です。アルゴリズムごとに平均と最悪の両方の計算量を押さえましょう。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2023h-am-q25",
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 25,
    type: "multiple-choice",
    category: "データベース",
    topicTags: ["正規化", "第3正規形"],
    difficulty: 3,
    question:
      "関数従属が存在するリレーションを第3正規形にするために行う操作として、最も適切なものはどれか。",
    choices: {
      ア: "候補キー以外の属性を削除する。",
      イ: "部分関数従属を排除して、候補キーの一部に従属する属性を別のリレーションに分解する。",
      ウ: "推移的関数従属を排除して、非キー属性が他の非キー属性に従属しないようにリレーションを分解する。",
      エ: "多値従属を排除するためにリレーションを3つ以上に分解する。",
    },
    answer: "ウ",
    explanation:
      "第3正規形は、非キー属性が候補キーに直接のみ従属し、他の非キー属性に推移的に従属しない状態を指します。イは第2正規形、エはボイスコッド以降の概念です。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2023h-am-q33",
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 33,
    type: "multiple-choice",
    category: "ネットワーク",
    topicTags: ["TCP/IP", "サブネット"],
    difficulty: 2,
    question:
      "IPアドレス 192.168.10.0/24 のネットワークを4つのサブネットに等分割した。各サブネットで利用可能なホスト数はいくつか。",
    choices: {
      ア: "30",
      イ: "62",
      ウ: "126",
      エ: "254",
    },
    answer: "イ",
    explanation:
      "/24 を4分割するとサブネットマスクは /26 になります。/26 のアドレス空間は 2^(32-26)=64 個あり、ネットワークアドレスとブロードキャストアドレスを除くと 64-2=62 がホストに割り当て可能です。サブネット分割問題は「2の何乗か」と「ネットワーク/ブロードキャストを引く2」の2点を必ず確認しましょう。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_qs.pdf",
    license: "IPA-public",
    isCalculation: true,
  },
  {
    id: "ap-2023h-am-q41",
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 41,
    type: "multiple-choice",
    category: "セキュリティ",
    topicTags: ["公開鍵暗号", "デジタル署名"],
    difficulty: 2,
    question:
      "送信者がメッセージに対してデジタル署名を作成する手順として、最も適切なものはどれか。",
    choices: {
      ア: "送信者の公開鍵でハッシュ値を暗号化する。",
      イ: "送信者の秘密鍵でハッシュ値を暗号化する。",
      ウ: "受信者の公開鍵でメッセージ本体を暗号化する。",
      エ: "共通鍵でハッシュ値を暗号化する。",
    },
    answer: "イ",
    explanation:
      "デジタル署名は送信者の秘密鍵でメッセージのハッシュ値を暗号化して作成します。受信側は送信者の公開鍵で復号し、改ざん検知と送信者認証を行います。公開鍵で暗号化するのはメッセージそのものの機密性確保(アではなくウのケース)で、役割を混同しないこと。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2024h-am-q2",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "spring",
    qNumber: 2,
    type: "multiple-choice",
    category: "基礎理論",
    topicTags: ["情報理論", "エントロピー"],
    difficulty: 3,
    question:
      "発生確率が 1/2, 1/4, 1/8, 1/8 である4種類の記号を符号化するとき、1記号あたりの平均情報量(エントロピー)は何ビットか。",
    choices: {
      ア: "1.50",
      イ: "1.75",
      ウ: "2.00",
      エ: "2.25",
    },
    answer: "イ",
    explanation:
      "H = -Σp·log2 p。計算すると (1/2)·1 + (1/4)·2 + (1/8)·3 + (1/8)·3 = 0.5 + 0.5 + 0.375 + 0.375 = 1.75。ハフマン符号の平均符号長もこれに一致します。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/2024h06h_ap_am_qs.pdf",
    license: "IPA-public",
    isCalculation: true,
  },
  {
    id: "ap-2024h-am-q27",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "spring",
    qNumber: 27,
    type: "multiple-choice",
    category: "データベース",
    topicTags: ["トランザクション", "ACID"],
    difficulty: 2,
    question:
      "トランザクションの ACID 特性のうち、「他のトランザクションの途中経過の影響を受けず、独立して実行できる性質」を示すものはどれか。",
    choices: {
      ア: "Atomicity(原子性)",
      イ: "Consistency(一貫性)",
      ウ: "Isolation(独立性)",
      エ: "Durability(永続性)",
    },
    answer: "ウ",
    explanation:
      "Isolation(独立性)は並行実行時に他トランザクションの中間状態の影響を受けない性質を指します。分離レベル(Read Committed, Serializable など)の話題と必ず紐づけて覚えましょう。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/2024h06h_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2024h-am-q43",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "spring",
    qNumber: 43,
    type: "multiple-choice",
    category: "セキュリティ",
    topicTags: ["認証", "多要素認証"],
    difficulty: 1,
    question:
      "多要素認証において「本人が知っているもの」と「本人が所有しているもの」の組合せに該当するものはどれか。",
    choices: {
      ア: "指紋 と 暗証番号",
      イ: "パスワード と ワンタイムパスワードトークン",
      ウ: "顔認証 と 静脈認証",
      エ: "パスワード と 秘密の質問",
    },
    answer: "イ",
    explanation:
      "多要素認証の3要素は「知識(Something you know)」「所有(Something you have)」「生体(Something you are)」。パスワードは知識、トークンは所有、指紋/顔/静脈は生体です。エはどちらも知識要素なので多要素ではありません。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/2024h06h_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2024h-am-q52",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "spring",
    qNumber: 52,
    type: "multiple-choice",
    category: "プロジェクトマネジメント",
    topicTags: ["PMBOK", "EVM"],
    difficulty: 3,
    question:
      "ある時点で PV=100 万円、EV=80 万円、AC=90 万円 であるプロジェクトについて、コスト効率指数(CPI)として正しいものはどれか。",
    choices: {
      ア: "0.80",
      イ: "0.89",
      ウ: "1.13",
      エ: "1.25",
    },
    answer: "イ",
    explanation:
      "CPI = EV / AC = 80 / 90 ≒ 0.89。1未満なのでコスト超過傾向。同時に SPI=EV/PV=0.80 でスケジュール遅延も発生しています。EVM はこの2指標を必ずセットで覚えましょう。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/2024h06h_ap_am_qs.pdf",
    license: "IPA-public",
    isCalculation: true,
  },
  {
    id: "ap-2024a-am-q15",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "autumn",
    qNumber: 15,
    type: "multiple-choice",
    category: "コンピュータシステム",
    topicTags: ["仮想記憶", "ページング"],
    difficulty: 3,
    question:
      "仮想記憶管理におけるページ置換アルゴリズムの一つである LRU (Least Recently Used) の動作として最も適切なものはどれか。",
    choices: {
      ア: "最も古くロードされたページを置換する。",
      イ: "最も長い間参照されていないページを置換する。",
      ウ: "最も参照回数が少ないページを置換する。",
      エ: "ランダムに選んだページを置換する。",
    },
    answer: "イ",
    explanation:
      "LRU は「最近使っていない」ページを置換対象にします。アは FIFO、ウは LFU の説明です。実装方式(スタック、カウンタ、近似 LRU)もあわせて確認しておきましょう。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_2/2024h06a_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2024a-am-q62",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "autumn",
    qNumber: 62,
    type: "multiple-choice",
    category: "システム戦略",
    topicTags: ["IT投資評価", "ROI"],
    difficulty: 2,
    question:
      "投資評価指標のうち、投資額に対する年間の平均的な純利益の割合を示すものはどれか。",
    choices: {
      ア: "NPV",
      イ: "IRR",
      ウ: "ROI",
      エ: "EVA",
    },
    answer: "ウ",
    explanation:
      "ROI(Return On Investment)は投資額に対する利益率を示します。NPV は割引現在価値の総和、IRR は NPV がゼロになる割引率、EVA は経済的付加価値。各指標の違いを混同しないよう意識しましょう。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_2/2024h06a_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2025h-am-q38",
    exam: "ap",
    session: "am",
    year: 2025,
    season: "spring",
    qNumber: 38,
    type: "multiple-choice",
    category: "セキュリティ",
    topicTags: ["ゼロトラスト", "認証認可"],
    difficulty: 3,
    question:
      "ゼロトラストアーキテクチャの考え方として、最も適切なものはどれか。",
    choices: {
      ア: "社内ネットワーク内であれば全ての通信を信頼する。",
      イ: "VPN 接続が確立されれば社内アクセスを信頼する。",
      ウ: "全てのアクセス要求を常に認証・認可し、最小権限で許可する。",
      エ: "ファイアウォールで境界を強固にし、内部の通信は信頼する。",
    },
    answer: "ウ",
    explanation:
      "ゼロトラストは「何も信頼しない」を前提に、全アクセスに対して継続的な認証・認可と最小権限の原則を適用します。境界防御(ア、イ、エ)とは対比構造で覚えてください。NIST SP 800-207 が原典。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2025h07_1/2025h07h_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2025h-am-q68",
    exam: "ap",
    session: "am",
    year: 2025,
    season: "spring",
    qNumber: 68,
    type: "multiple-choice",
    category: "経営戦略",
    topicTags: ["ポーターの5フォース", "競争戦略"],
    difficulty: 2,
    question:
      "ポーターの5フォース分析における「買い手の交渉力」を高める要因として最も適切なものはどれか。",
    choices: {
      ア: "購入先を変更するスイッチングコストが高いこと",
      イ: "売り手企業の数が少なく、製品が差別化されていること",
      ウ: "買い手が大量購入する大口顧客であること",
      エ: "買い手にとって購入品が自社コストの小さな割合しか占めないこと",
    },
    answer: "ウ",
    explanation:
      "買い手の交渉力は、買い手側が集中している・大口である・代替製品が豊富・スイッチングコストが低い、などで高まります。ア、イ、エはいずれも売り手側が優位になる条件です。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2025h07_1/2025h07h_ap_am_qs.pdf",
    license: "IPA-public",
  },
  {
    id: "ap-2025h-am-q79",
    exam: "ap",
    session: "am",
    year: 2025,
    season: "spring",
    qNumber: 79,
    type: "multiple-choice",
    category: "法務",
    topicTags: ["個人情報保護法", "要配慮個人情報"],
    difficulty: 2,
    question:
      "個人情報保護法における「要配慮個人情報」に該当しないものはどれか。",
    choices: {
      ア: "人種・信条・社会的身分",
      イ: "病歴・診療記録",
      ウ: "勤務先・役職名",
      エ: "犯罪歴・被疑事実",
    },
    answer: "ウ",
    explanation:
      "要配慮個人情報は、人種・信条・社会的身分・病歴・犯罪歴など、本人への差別・偏見・不利益につながりうる情報に限定されます。単なる勤務先や役職名は含まれません。取得には原則として本人同意が必要という点もセットで押さえましょう。",
    hasImage: false,
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2025h07_1/2025h07h_ap_am_qs.pdf",
    license: "IPA-public",
  },
];
