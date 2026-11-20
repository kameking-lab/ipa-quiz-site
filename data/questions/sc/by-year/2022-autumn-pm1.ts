import type { Question } from "@/lib/questions/types";

export const SC_QUESTIONS_2022_AUTUMN_PM1: Question[] = [
  {
    "id": "sc-2022a-pm1-q1",
    "exam": "sc",
    "year": 2022,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "IoT",
      "脆弱性対策",
      "DNS"
    ],
    "difficulty": 4,
    "question": "問1　IoT製品の開発に関する次の記述を読んで，設問に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1)  a  DNS キャッシュポイズニング\n        (2)  b エ\n        (3) 権威DNS サーバからの応答よりも早く到達する。\n        (4) サーバ証明書を検証し，通信相手がW サーバであることを確認する実装\n        (5)  c コードサイニング\n 設問２     d シェルが実行するコマンドをパラメータで不正に指定できて\n設問３(1) 攻撃リクエストをPOST メソッドで送信させるスクリプトを含むページを表示\n      させる仕組み\n        (2)  e 推測困難である\n 設問４  脆弱性A ア\n       脆弱性B オ",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1)  a  DNS キャッシュポイズニング\n        (2)  b エ\n        (3) 権威DNS サーバからの応答よりも早く到達する。\n        (4) サーバ証明書を検証し，通信相手がW サーバであることを確認する実装\n        (5)  c コードサイニング\n 設問２     d シェルが実行するコマンドをパラメータで不正に指定できて\n設問３(1) 攻撃リクエストをPOST メソッドで送信させるスクリプトを含むページを表示\n      させる仕組み\n        (2)  e 推測困難である\n 設問４  脆弱性A ア\n       脆弱性B オ\n```",
    "explanation": "設問1：名前解決の改ざんと通信相手の認証を分けて考える。偽のDNS応答で接続先を誘導されても、サーバ証明書を検証して正しい相手か確かめれば、偽サーバへの接続を防げる。ファームウェア自体の正当性はコードサイニングによって確認する。\n\n設問2・3：外部から渡された値をシェルのコマンドとして解釈する箇所と、利用者のブラウザから意図しない要求を送信させる箇所を区別する。POSTへの変更だけでは、攻撃者がPOST要求を送るページを用意できるため対策にならない。トークンには第三者が推測できない値が必要になる。\n\n設問4：個々の脆弱性の影響だけでなく、どの攻撃によって次の攻撃に必要な条件がそろうかを追う。選択する組合せは、原本の攻撃シナリオと公式解答例を照合して確認する。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p2.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p3.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p4.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p5.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p6.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p7.webp"
    ],
    "imageAltTexts": [
      "2022年秋期 SC 問1 本文・図表・設問（公式PDF 2ページ）",
      "2022年秋期 SC 問1 本文・図表・設問（公式PDF 3ページ）",
      "2022年秋期 SC 問1 本文・図表・設問（公式PDF 4ページ）",
      "2022年秋期 SC 問1 本文・図表・設問（公式PDF 5ページ）",
      "2022年秋期 SC 問1 本文・図表・設問（公式PDF 6ページ）",
      "2022年秋期 SC 問1 本文・図表・設問（公式PDF 7ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/sc-2022a-pm1-q1-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "sc-2022a-pm1-q1 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "sc-2022a-pm1-q2",
    "exam": "sc",
    "year": 2022,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "インシデント対応",
      "ログ分析",
      "アクセス制御"
    ],
    "difficulty": 4,
    "question": "問2　脆弱性に起因するセキュリティインシデントへの対応に関する次の記述を読んで，設問に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n 設問１     a  a3.b3.c3.d3\n設問２(1) run プロセスの親プロセスがT ソフトのプロセスであるから\n        (2)  b  13:04:32\n             c  13:05:50\n             d  a8.b8.c8.d8\n             e  LDAP\n             f  JExp\n設問３(1) ログ出力処理する文字列中に攻撃文字列が含まれれば悪用可能だから\n        (2) 会員サーバからインターネット宛てのLDAP 通信が許可されていないから\n 設問４     g 予約サーバ\n             h  SNS 投稿用のサーバのURL\n             i 全て",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n 設問１     a  a3.b3.c3.d3\n設問２(1) run プロセスの親プロセスがT ソフトのプロセスであるから\n        (2)  b  13:04:32\n             c  13:05:50\n             d  a8.b8.c8.d8\n             e  LDAP\n             f  JExp\n設問３(1) ログ出力処理する文字列中に攻撃文字列が含まれれば悪用可能だから\n        (2) 会員サーバからインターネット宛てのLDAP 通信が許可されていないから\n 設問４     g 予約サーバ\n             h  SNS 投稿用のサーバのURL\n             i 全て\n```",
    "explanation": "設問1・2：通信ログ、プロセスの親子関係、時刻を突き合わせて侵入後の動きを追う。runプロセスの親がTソフトであることは、単に同時刻に動いていたという情報よりも実行元を特定する根拠になる。空欄のIPアドレスや時刻は、該当するログ行から転記する。\n\n設問3：脆弱性のある処理に攻撃文字列が届く経路と、その処理が外部へ接続する経路を別々に確認する。画面の入力欄だけでなく、ログ出力に含まれる文字列も入口になり得る。一方、会員サーバから外部へのLDAP通信が許可されていないことは、その後の攻撃経路を遮る条件となる。\n\n設問4：侵害されたサーバを起点にしても必要以上の通信ができないよう、送信元、接続先、許可範囲を絞る。通常業務で必要なSNS投稿先と、任意の外部接続先を混同しないことがポイントである。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p8.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p9.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p10.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p11.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p12.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p13.webp"
    ],
    "imageAltTexts": [
      "2022年秋期 SC 問2 本文・図表・設問（公式PDF 8ページ）",
      "2022年秋期 SC 問2 本文・図表・設問（公式PDF 9ページ）",
      "2022年秋期 SC 問2 本文・図表・設問（公式PDF 10ページ）",
      "2022年秋期 SC 問2 本文・図表・設問（公式PDF 11ページ）",
      "2022年秋期 SC 問2 本文・図表・設問（公式PDF 12ページ）",
      "2022年秋期 SC 問2 本文・図表・設問（公式PDF 13ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/sc-2022a-pm1-q2-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "sc-2022a-pm1-q2 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "sc-2022a-pm1-q3",
    "exam": "sc",
    "year": 2022,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "OSS",
      "サプライチェーン",
      "インシデント対応"
    ],
    "difficulty": 4,
    "question": "問3　オンラインゲーム事業者でのセキュリティインシデント対応に関する次の記述を読んで，設問に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1)  a  376\n        (2) prog というファイルをダウンロードし，実行する命令\n        (3)  b 一時ディレクトリ内のログ\n        (4) ゼロデイ攻撃\n設問２(1) レジストリサーバに固有のレスポンスヘッダ\n        (2) 上書きされたイメージを削除する。\n設問３(1)  c  a3.b3.c3.d3\n        (2)  d エ\n        (3) 別のIP アドレスを攻撃者が用いる場合\n        (4)  e オ",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1)  a  376\n        (2) prog というファイルをダウンロードし，実行する命令\n        (3)  b 一時ディレクトリ内のログ\n        (4) ゼロデイ攻撃\n設問２(1) レジストリサーバに固有のレスポンスヘッダ\n        (2) 上書きされたイメージを削除する。\n設問３(1)  c  a3.b3.c3.d3\n        (2)  d エ\n        (3) 別のIP アドレスを攻撃者が用いる場合\n        (4)  e オ\n```",
    "explanation": "設問1：コンテナ内の命令が何を取得し、何を実行し、どの痕跡を消すかを順に読む。ダウンロードと実行を一続きの処理として捉え、一時ディレクトリ内のログが調査時に残るとは限らない点にも注意する。\n\n設問2：公開サービスの識別につながる情報と、既に改変された成果物への対応を分ける。固有のレスポンスヘッダからレジストリサーバだと識別される可能性があり、上書きされたイメージは削除して再利用を防ぐ必要がある。\n\n設問3：通信先の調査では、原本の通信記録に現れるアドレスを根拠にする。ただし、そのアドレスだけを遮断しても、攻撃者が別のアドレスに切り替えれば防げない。侵入経路、成果物、通信制御の複数の観点で対応を組み合わせる。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p14.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p15.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p16.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p17.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p18.webp",
      "/questions/ipa-plan5-qb8/2022r04a_sc_pm1-p19.webp"
    ],
    "imageAltTexts": [
      "2022年秋期 SC 問3 本文・図表・設問（公式PDF 14ページ）",
      "2022年秋期 SC 問3 本文・図表・設問（公式PDF 15ページ）",
      "2022年秋期 SC 問3 本文・図表・設問（公式PDF 16ページ）",
      "2022年秋期 SC 問3 本文・図表・設問（公式PDF 17ページ）",
      "2022年秋期 SC 問3 本文・図表・設問（公式PDF 18ページ）",
      "2022年秋期 SC 問3 本文・図表・設問（公式PDF 19ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/sc-2022a-pm1-q3-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "sc-2022a-pm1-q3 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
