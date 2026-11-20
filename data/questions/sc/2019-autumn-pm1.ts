import type { Question } from "@/lib/questions/types";

export const SC_2019_AUTUMN_PM1_QUESTIONS: Question[] = [
  {
    "id": "sc-2019a-pm1-q1",
    "exam": "sc",
    "year": 2019,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "セキュリティ",
    "topicTags": [
      "送信ドメイン認証",
      "SPF",
      "DKIM",
      "DMARC"
    ],
    "difficulty": 4,
    "question": "電子メールのセキュリティ対策",
    "answer": "設問１        a  MAIL FROM\n 設問２  (1)  b ×\n               c ×\n               d ×\n               e ×\n               f ×\n               g ○\n               h ×\n               i ×\n         (2)  j  x1.y1.z1.1\n         (3) 送信側のDNS サーバに設定されたIP アドレスとSMTP 接続元のIP アドレス\n       が一致しないから\n         (4) メール本文及びメールヘッダの改ざんの有無\n 設問３        k   mail.x-sha.co.jp.\n               l   x2.y2.z2.1\n               m  quarantine\n               n   r\n 設問４     N 社の取引先と似たメールアドレスから送信ドメイン認証技術を利用してメー\n       ルを送信する。",
    "modelAnswer": "```text\n設問１        a  MAIL FROM\n 設問２  (1)  b ×\n               c ×\n               d ×\n               e ×\n               f ×\n               g ○\n               h ×\n               i ×\n         (2)  j  x1.y1.z1.1\n         (3) 送信側のDNS サーバに設定されたIP アドレスとSMTP 接続元のIP アドレス\n       が一致しないから\n         (4) メール本文及びメールヘッダの改ざんの有無\n 設問３        k   mail.x-sha.co.jp.\n               l   x2.y2.z2.1\n               m  quarantine\n               n   r\n 設問４     N 社の取引先と似たメールアドレスから送信ドメイン認証技術を利用してメー\n       ルを送信する。\n```",
    "explanation": "SPFが確認するSMTPの送信元と、利用者に表示するFromヘッダーを区別する。DKIMで署名を検証した上で、DMARCでは認証に使ったドメインとFromのドメインが整合するかを確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/sc/2019-autumn-pm1/p02.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p03.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p04.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p05.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p06.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p07.webp"
    ],
    "imageAltTexts": [
      "2019年度秋期 情報処理安全確保支援士 午後I 問1 電子メールのセキュリティ対策（公式問題PDF 2ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問1 電子メールのセキュリティ対策（公式問題PDF 3ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問1 電子メールのセキュリティ対策（公式問題PDF 4ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問1 電子メールのセキュリティ対策（公式問題PDF 5ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問1 電子メールのセキュリティ対策（公式問題PDF 6ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問1 電子メールのセキュリティ対策（公式問題PDF 7ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/sc/2019-autumn-pm1/q1-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "問1の公式解答例（1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sc_pm1_qs.pdf#page=2",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sc_pm1_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2019年度秋期 情報処理安全確保支援士 午後I」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "sc-2019a-pm1-q3",
    "exam": "sc",
    "year": 2019,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "セキュリティ",
    "topicTags": [
      "インシデント対応",
      "証拠保全",
      "ログ調査"
    ],
    "difficulty": 4,
    "question": "標的型攻撃への対応",
    "answer": "設問１  (1) メモリ上の情報が失われないようにするため\n         (2) ① ・J 社情報システムに感染を拡大する。\n       ② ・インターネットに情報を送信する。\n 設問２        a ウ\n               b イ\n               c オ\n               d ア\n 設問３  (1)   e   IP アドレスw1.x1.y1.z1 との通信履歴\n         (2) 感染したが，C&C サーバと通信する前にネットワークから切り離された状態\n         (3) R ログをマルウェアM のハッシュ値で検索する。",
    "modelAnswer": "```text\n設問１  (1) メモリ上の情報が失われないようにするため\n         (2) ① ・J 社情報システムに感染を拡大する。\n       ② ・インターネットに情報を送信する。\n 設問２        a ウ\n               b イ\n               c オ\n               d ア\n 設問３  (1)   e   IP アドレスw1.x1.y1.z1 との通信履歴\n         (2) 感染したが，C&C サーバと通信する前にネットワークから切り離された状態\n         (3) R ログをマルウェアM のハッシュ値で検索する。\n```",
    "explanation": "端末を隔離して通信を止める操作と、電源を維持してメモリ上の証拠を保全する操作を区別する。通信履歴がない場合も、隔離の時刻やファイルのハッシュ値を使って調査を続ける。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/sc/2019-autumn-pm1/p14.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p15.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p16.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p17.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p18.webp",
      "/questions/ipa-official/sc/2019-autumn-pm1/p19.webp"
    ],
    "imageAltTexts": [
      "2019年度秋期 情報処理安全確保支援士 午後I 問3 標的型攻撃への対応（公式問題PDF 14ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問3 標的型攻撃への対応（公式問題PDF 15ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問3 標的型攻撃への対応（公式問題PDF 16ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問3 標的型攻撃への対応（公式問題PDF 17ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問3 標的型攻撃への対応（公式問題PDF 18ページ）",
      "2019年度秋期 情報処理安全確保支援士 午後I 問3 標的型攻撃への対応（公式問題PDF 19ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/sc/2019-autumn-pm1/q3-answer-p02.webp"
    ],
    "answerImageAltTexts": [
      "問3の公式解答例（2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sc_pm1_qs.pdf#page=14",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sc_pm1_ans.pdf#page=2",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2019年度秋期 情報処理安全確保支援士 午後I」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
