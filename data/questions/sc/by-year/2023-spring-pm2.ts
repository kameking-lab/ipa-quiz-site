import type { Question } from "@/lib/questions/types";

export const SC_QUESTIONS_2023_SPRING_PM2: Question[] = [
  {
    "id": "sc-2023h-pm2-q1",
    "exam": "sc",
    "year": 2023,
    "season": "spring",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "Webセキュリティ"
    ],
    "difficulty": 4,
    "question": "問1　Webセキュリティに関する次の記述を読んで、設問に答えよ。",
    "answer": "令和５年度 春期 情報処理安全確保支援士試験 解答例\n\n午後Ⅱ試験\n\n問１\n\n                       出題趣旨\n 企業グループでは，グループ会社がそれぞれ多数のWeb サイトを構築している場合がある。さらに，そうし\n                                                 ぜい\n たWeb サイトのセキュリティ品質を一定に保つための脆弱性診断を第三者に委託している場合と自社で実施し\nている場合がある。\n  本問では，Web サイトに対する脆弱性診断を題材として，各種脆弱性に関する知識，それらを発見するため\nのツールの利用方法と注意点に関する知識，及び脆弱性診断を自社で実施する上での課題を解決する能力を問\nう。\n\n\n  設問                解答例・解答の要点                 備考\n  設問１  診断対象のWeb サイトの設計書を確認するという方法\n 設問２(1)  a イ\n              b ウ\n         (2)  c  (2-3)\n         (3) アンケート入力1 からアンケート入力2 に遷移するURL の拡張機能に，アンケ\n        ート確認のURL を登録する。\n         (4) トピック検索結果の画面での検索結果の件数が1 以上になる値\n 設問３(1) ウ，エ\n         (2) ① 画面遷移  (A)\n          理由  同じアカウントで連続5 回パスワードを間違えるとアカウン\n              トがロックされるから\n       ② 画面遷移  (C)\n          理由  キャンペーンは1 会員に付き1 回しか申込みできないから\n 設問４(1)  d  HTML 内のスクリプトからcookie へのアクセス\n         (2) 偽の入力フォームを表示させ，入力情報を攻撃者サイトに送る手口\n 設問５(1) group_code が削除されているリクエスト\n         (2)  e  JSESSIONID\n              f  group_code\n 設問６(1) グループ各社で資産管理システムを導入し，Web サイトの情報を管理する。\n         (2) B 社への問合せ窓口をA 社の診断部門に設置し，窓口が蓄積した情報をA 社グ\n      ループ内で共有する。\n\n\n\n\n\n                                                1/2\n\n                                                                            ©2023 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "診断の準備、ツールの動かし方、検出結果の読み方、運用体制を分けて整理します。\n\n- 設問1：画面をたどるだけでは、入力条件を満たしたときだけ現れる機能を拾えません。設計書との照合で診断対象の漏れを減らします。\n- 設問2：画面遷移の前後で必要なパラメータが変わる点に着目します。自動巡回が確認画面を経由できない場合は拡張機能に遷移先を設定し、検索結果から先へ進むには結果が存在する入力値を与えます。\n- 設問3：繰り返すと状態が変わる操作を先に抽出します。ログイン失敗を重ねるとロックされる操作と、会員ごとに一度だけの申込みでは、同じリクエストを何度も送る診断が後続の検査に影響します。\n- 設問4：cookieをスクリプトから読ませない設定と、画面自体を偽装して入力を奪う攻撃を区別します。cookieの保護だけで、偽フォームによる入力情報の送信まで防げるとは限りません。\n- 設問5：項目を改変した場合だけでなく、削除したリクエストに対する認可も確認します。セッション識別子とグループを示す値は役割を分けて扱います。\n- 設問6：診断の内製化にはツールの導入だけでなく、対象資産の把握と、外部の専門家への問合せから得た知識を蓄積・共有する仕組みが必要です。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_ans.pdf)",
    "scoringCriteria": "診断の準備、ツールの動かし方、検出結果の読み方、運用体制を分けて整理します。\n\n- 設問1：画面をたどるだけでは、入力条件を満たしたときだけ現れる機能を拾えません。設計書との照合で診断対象の漏れを減らします。\n- 設問2：画面遷移の前後で必要なパラメータが変わる点に着目します。自動巡回が確認画面を経由できない場合は拡張機能に遷移先を設定し、検索結果から先へ進むには結果が存在する入力値を与えます。\n- 設問3：繰り返すと状態が変わる操作を先に抽出します。ログイン失敗を重ねるとロックされる操作と、会員ごとに一度だけの申込みでは、同じリクエストを何度も送る診断が後続の検査に影響します。\n- 設問4：cookieをスクリプトから読ませない設定と、画面自体を偽装して入力を奪う攻撃を区別します。cookieの保護だけで、偽フォームによる入力情報の送信まで防げるとは限りません。\n- 設問5：項目を改変した場合だけでなく、削除したリクエストに対する認可も確認します。セッション識別子とグループを示す値は役割を分けて扱います。\n- 設問6：診断の内製化にはツールの導入だけでなく、対象資産の把握と、外部の専門家への問合せから得た知識を蓄積・共有する仕組みが必要です。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p02.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p03.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p04.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p05.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p06.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p07.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p08.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p09.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p10.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p11.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p12.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問1 Webセキュリティ（PDF 2ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 3ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 4ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 5ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 6ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 7ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 8ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 9ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 10ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 11ページ）",
      "IPA公式問題 問1 Webセキュリティ（PDF 12ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/sc/2023-spring-pm2/q1-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問1（PDF 1ページ）"
    ]
  },
  {
    "id": "sc-2023h-pm2-q2",
    "exam": "sc",
    "year": 2023,
    "season": "spring",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "Webサイトのクラウドサービスへの移行と機能拡張"
    ],
    "difficulty": 4,
    "question": "問2　Webサイトのクラウドサービスへの移行と機能拡張に関する次の記述を読んで、設問に答えよ。",
    "answer": "問２\n\n                       出題趣旨\n 近年，クラウドサービスへの移行が加速する中で，セキュリティについてオンプレミスとは異なる知見が求\nめられている。また，外部サービスとの連携が増加しているが，セキュアではない設定がされるケースも散見\nされる。\n  本問では，Web サイトのクラウドサービスへの移行と機能拡張を題材として，自社システムからクラウドサ\nービスへの移行時及び移行後におけるセキュリティに関わる設定と，外部サービスと連携する際の認可，権限\n設定についての分析能力を問う。\n\n\n  設問                解答例・解答の要点                 備考\n  設問１     a ○\n              b ×\n              c ×\n              d ○\n              e ○\n              f ×\n              g ○\n              h ○\n              i ○\n 設問２(1)  j ウ\n              k エ\n              l イ\n         (2) {\n              \"system\": \"4000\",\n              \"account\": \"11[1-9][0-9]\",\n              \"service\": \"オブジェクトストレージサービス\",\n              \"event\": \"オブジェクトの削除\"\n              }\n 設問３(1)  m 新日記サービス\n              n サービスT\n              o サービスT\n         (2)  p  (3)\n              q  (7)\n         (3) ウ，エ\n 設問４(1) アクセストークン要求に必要なcode パラメータを不正に取得できないから\n         (2) 検証コードのSHA-256 によるハッシュ値をbase64url エンコードした値と，チ\n      ャレンジコードの値との一致を確認する。\n 設問５(1) OSS リポジトリのファイルZ の変更履歴から削除前のファイルを取得する。\n         (2) アップロードされたソースコードを承認する承認権限は，開発リーダーだけに\n      与えるようにする。\n         (3) X トークンには，ソースコードのダウンロード権限だけを付与する。\n\n\n\n\n\n                                                2/2\n\n                                                                            ©2023 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "移行先がクラウドでも、自社が設定する項目とサービス提供者に任せる項目を区別します。表の各運用について、誰が対象機能を管理できるかを一つずつ対応付けて確認します。\n\n- 設問1：オンプレミス時代の運用をそのまま当てはめず、利用するサービスで設定・実施できる範囲を確認します。公式解答例の○×を、表の個別の運用と照合してください。\n- 設問2：監査ログの絞込みでは、システム、アカウント、サービス、イベントの全条件を満たす必要があります。アカウントの正規表現は桁ごとの許容範囲を確認し、削除操作を他の操作と混同しないようにします。\n- 設問3：OAuthの認可では、資源を提供する側とアクセスする側、コードを受け取る先を分けて図に書くと対応が明確になります。\n- 設問4：アクセストークン要求に必要なcodeを取得できるかという条件と、PKCEによる検証コードの照合を区別します。検証コードからSHA-256のハッシュ値を求め、base64url表現をチャレンジコードと照合します。\n- 設問5：リポジトリから秘密情報を含むファイルを削除しても、履歴から過去の内容を取得できる点が問題です。承認できる人を限定し、連携用トークンにも必要なダウンロード権限だけを付けて、変更の承認と情報の取得の権限を分離します。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_ans.pdf)",
    "scoringCriteria": "移行先がクラウドでも、自社が設定する項目とサービス提供者に任せる項目を区別します。表の各運用について、誰が対象機能を管理できるかを一つずつ対応付けて確認します。\n\n- 設問1：オンプレミス時代の運用をそのまま当てはめず、利用するサービスで設定・実施できる範囲を確認します。公式解答例の○×を、表の個別の運用と照合してください。\n- 設問2：監査ログの絞込みでは、システム、アカウント、サービス、イベントの全条件を満たす必要があります。アカウントの正規表現は桁ごとの許容範囲を確認し、削除操作を他の操作と混同しないようにします。\n- 設問3：OAuthの認可では、資源を提供する側とアクセスする側、コードを受け取る先を分けて図に書くと対応が明確になります。\n- 設問4：アクセストークン要求に必要なcodeを取得できるかという条件と、PKCEによる検証コードの照合を区別します。検証コードからSHA-256のハッシュ値を求め、base64url表現をチャレンジコードと照合します。\n- 設問5：リポジトリから秘密情報を含むファイルを削除しても、履歴から過去の内容を取得できる点が問題です。承認できる人を限定し、連携用トークンにも必要なダウンロード権限だけを付けて、変更の承認と情報の取得の権限を分離します。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p13.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p14.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p15.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p16.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p17.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p18.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p19.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p20.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p21.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p22.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p23.webp",
      "/images/ipa-written-qb7/sc/2023-spring-pm2/question-p24.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 13ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 14ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 15ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 16ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 17ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 18ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 19ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 20ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 21ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 22ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 23ページ）",
      "IPA公式問題 問2 Webサイトのクラウドサービスへの移行と機能拡張（PDF 24ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_sc_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/sc/2023-spring-pm2/q2-answer-p02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問2（PDF 2ページ）"
    ]
  }
];
