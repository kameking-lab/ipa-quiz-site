import type { Question } from "@/lib/questions/types";

export const AU_QUESTIONS_2021_AUTUMN_PM1: Question[] = [
  {
    "id": "au-2021a-pm1-q1",
    "exam": "au",
    "year": 2021,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "システム監査",
      "AI",
      "PoC"
    ],
    "difficulty": 4,
    "question": "問1　チャットボット開発の企画段階における監査に関する次の記述を読んで，設問1〜4に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１ ア 経営会議などの議事録を閲覧し，経営層によって十分に審議され，承認されて\n      いるかを確かめる。\n設問２ イ  PoC 計画書を閲覧し，目的，結果の評価基準，終了基準の記述があることを確\n      かめる。\n    ウ  PoC 評価書を閲覧し，結果の評価や終了の判断についての記述を確かめる。\n 設問３  学習後に結果を評価しないで本番移行してしまうという問題\n 設問４    AI の特性の教育や，結果の正しさや利用可否を判断する教育の予定がないから",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１ ア 経営会議などの議事録を閲覧し，経営層によって十分に審議され，承認されて\n      いるかを確かめる。\n設問２ イ  PoC 計画書を閲覧し，目的，結果の評価基準，終了基準の記述があることを確\n      かめる。\n    ウ  PoC 評価書を閲覧し，結果の評価や終了の判断についての記述を確かめる。\n 設問３  学習後に結果を評価しないで本番移行してしまうという問題\n 設問４    AI の特性の教育や，結果の正しさや利用可否を判断する教育の予定がないから\n```",
    "explanation": "設問1：企画が正式な意思決定を経ているかは、担当者の説明だけでなく、経営会議などの議事録を閲覧して確認する。審議された事実と承認された事実の両方を確かめる手続にする。\n\n設問2：PoCの前に目的、評価基準、終了基準を定め、実施後にはその基準に照らして結果と終了判断を確認する。計画書と評価書では確認する事項が異なるため、それぞれの資料に即した監査手続を書く。\n\n設問3・4：学習を実行したという事実は、結果を評価したことにはならない。本番移行前の評価が必要であり、利用者の教育にもAIの特性と、結果の正しさや利用してよいかを判断する内容が必要となる。機能の操作方法だけで教育が十分と判断しない。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p2.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p3.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p4.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p5.webp"
    ],
    "imageAltTexts": [
      "2021年秋期 AU 問1 本文・図表・設問（公式PDF 2ページ）",
      "2021年秋期 AU 問1 本文・図表・設問（公式PDF 3ページ）",
      "2021年秋期 AU 問1 本文・図表・設問（公式PDF 4ページ）",
      "2021年秋期 AU 問1 本文・図表・設問（公式PDF 5ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/au-2021a-pm1-q1-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "au-2021a-pm1-q1 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "au-2021a-pm1-q2",
    "exam": "au",
    "year": 2021,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "IT投資",
      "システム再構築",
      "非機能要件"
    ],
    "difficulty": 4,
    "question": "問2　システム再構築プロジェクトの企画段階の監査に関する次の記述を読んで，設問1〜4に答えよ。",
    "answer": "設問                解答例・解答の要点                備考\n 設問１  予算規模に応じたIT 投資の責任者がプロジェクト運営委員会のメンバとして\n      参画していること\n 設問２  再構築方式を比較検討した際の評価項目に，ビジネス目標の視点があること\n設問３  (i) 現行システムの要件を熟知している者がいないので，仕様を適切に確定でき\n      ない。\n        (ii) 業務要件が明確でないので，要件を充足しているかどうかのテストができな\n      いこと\n 設問４  セキュリティ，障害設計などの非機能要件の実現性が検討されていること",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                備考\n 設問１  予算規模に応じたIT 投資の責任者がプロジェクト運営委員会のメンバとして\n      参画していること\n 設問２  再構築方式を比較検討した際の評価項目に，ビジネス目標の視点があること\n設問３  (i) 現行システムの要件を熟知している者がいないので，仕様を適切に確定でき\n      ない。\n        (ii) 業務要件が明確でないので，要件を充足しているかどうかのテストができな\n      いこと\n 設問４  セキュリティ，障害設計などの非機能要件の実現性が検討されていること\n```",
    "explanation": "設問1：投資規模に見合う責任者が運営委員会に参加しているかを確認する。委員会が存在することだけでは、必要な権限と責任を持つ者が判断に加わっているとはいえない。\n\n設問2：再構築方式の比較は、技術や費用の評価だけでなく、ビジネス目標の達成に役立つかという視点が必要である。方式選定時の評価項目に、その観点が含まれることを確かめる。\n\n設問3・4：現行要件を理解する者が不在なら、仕様の確定も、要件を満たしたかのテストも困難になる。また、機能がそろっていても、セキュリティや障害設計などの非機能要件を実現できるとは限らない。要件定義と実現性評価の両面から監査の着眼点を整理する。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p6.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p7.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p8.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p9.webp"
    ],
    "imageAltTexts": [
      "2021年秋期 AU 問2 本文・図表・設問（公式PDF 6ページ）",
      "2021年秋期 AU 問2 本文・図表・設問（公式PDF 7ページ）",
      "2021年秋期 AU 問2 本文・図表・設問（公式PDF 8ページ）",
      "2021年秋期 AU 問2 本文・図表・設問（公式PDF 9ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/au-2021a-pm1-q2-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "au-2021a-pm1-q2 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "au-2021a-pm1-q3",
    "exam": "au",
    "year": 2021,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "結合テスト",
      "委託先管理",
      "監査手続"
    ],
    "difficulty": 4,
    "question": "問3　結合テストの監査に関する次の記述を読んで，設問1〜5に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１  テスト項目の質が十分であることが評価されていないから\n設問２  課題管理表を閲覧し，マスタデータの作成ミスの再発防止策の内容と対応期限\n     を確かめる。\n設問３  類似不良点検について，開発チーム間で情報共有されているか\n設問４  システムテスト開始前に購買管理システムと生産管理システムとの疎通確認テ\n     ストを実施すること\n設問５   C 社システム部及び利用部門が主体的にシステムテストを実施する体制を確保\n     できるか",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１  テスト項目の質が十分であることが評価されていないから\n設問２  課題管理表を閲覧し，マスタデータの作成ミスの再発防止策の内容と対応期限\n     を確かめる。\n設問３  類似不良点検について，開発チーム間で情報共有されているか\n設問４  システムテスト開始前に購買管理システムと生産管理システムとの疎通確認テ\n     ストを実施すること\n設問５   C 社システム部及び利用部門が主体的にシステムテストを実施する体制を確保\n     できるか\n```",
    "explanation": "設問1：テストの件数や不良の収束だけでは、必要な観点を十分に試したかは判断できない。結合テスト完了の評価には、テスト項目の質に対する評価も必要である。\n\n設問2・3：発見した不良への修正と、同じ原因による再発を防ぐ活動を区別する。課題管理表で再発防止策と対応期限を確認し、類似不良の点検情報が開発チームをまたいで共有されているかも確かめる。\n\n設問4・5：後続のシステムテストを始める前に、関係するシステム間で疎通を確認する。委託先だけに任せる体制ではなく、発注者のシステム部と利用部門が主体的にテストを実施できるかを確認することで、業務上必要な検証が抜けるリスクを捉えられる。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p10.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p11.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p12.webp",
      "/questions/ipa-plan5-qb8/2021r03a_au_pm1-p13.webp"
    ],
    "imageAltTexts": [
      "2021年秋期 AU 問3 本文・図表・設問（公式PDF 10ページ）",
      "2021年秋期 AU 問3 本文・図表・設問（公式PDF 11ページ）",
      "2021年秋期 AU 問3 本文・図表・設問（公式PDF 12ページ）",
      "2021年秋期 AU 問3 本文・図表・設問（公式PDF 13ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/au-2021a-pm1-q3-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "au-2021a-pm1-q3 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_au_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
