import type { Question } from "@/lib/questions/types";

export const SC_QUESTIONS_2017_AUTUMN_PM2: Question[] = [
  {
    "id": "sc-2017a-pm2-q2",
    "exam": "sc",
    "year": 2017,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "データ暗号化",
      "鍵管理",
      "HSM"
    ],
    "difficulty": 4,
    "question": "問2　データ暗号化の設計",
    "answer": "問２\n                       出題趣旨\n   2005 年の個人情報保護法施行以降，個人情報を暗号化して保存することが求められるようになった。DBMS\n製品においてもデータ暗号化の機能が備わってきており，重要なデータを暗号化してデータベースに保管する\nシステムが増えてきている。\n データベース暗号化及び暗号鍵の管理においては，やみくもにデータ暗号化や鍵管理機能を実装するのでは\nなく，想定するリスクと残存リスクを明確にし，目的に沿って設計・実装することが重要である。鍵管理にお\nいては，暗号化に使用する鍵を安全に管理するための手段として，ハードウェア暗号モジュールが用いられて\nきた。\n 本問では，データ暗号化を題材に，暗号方式及びハードウェア暗号モジュールに関する基本的な知識並びに\n目的に沿ったデータ暗号方式の設計能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１  (1)   a   FISC\n               b  CRYPTREC\n         (2)  162\n         (3) オペレータ及びシステム管理者が，暗号化された契約情報を暗号化・復号に用\n       いられる鍵を用いて復号し，取得するリスク\n 設問２  (1)   c   FIPS\n         (2) 単独の鍵管理者ではマスタ鍵を復元できない。\n         (3) 場合製品H を交換した場合\n      目的マスタ鍵を復元するため\n         (4) 耐タンパ性\n         (5) 事象静電気の放電による規定の範囲を超える電源電圧の発生\n       機能事象をセンサが検知し，製品H 自身を使用不能で戻せない状態にする。\n 設問３  (1) エラーとなる手順(v)\n              API-X のコマンド 暗号化(DBαのDB データ鍵，DBαのDB マスタ鍵ID)\n              API-X のエラーの DBαのDB マスタ鍵が鍵ストアファイル2 に存在しない\n          原因    こと\n         (2) 複数のH クライアントが送信したデータ鍵ID が重複した場合\n 設問４  (1) 業務担当者及び契約者が業務アプリケーションを利用して持ち出すリスク\n         (2) オペレータ及びシステム管理者が，メモリダンプから平文の契約情報を読み出\n       し，持ち出すリスク\n\n\n\n\n\n                                                2/2\n\n                                                                   ©2017 独立行政法人情報処理推進機構",
    "explanation": "契約情報が平文になる場所と、データ鍵を使える主体をシステム構成図で追います。HSMで保護するマスタ鍵の復元手順を確認し、アプリケーションとDBサーバに残る持ち出しリスクを区別します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sc/2017-autumn-pm2/page-16.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-17.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-18.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-19.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-20.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-21.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-22.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-23.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-24.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-25.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-26.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-27.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-28.webp",
      "/questions/ipa/sc/2017-autumn-pm2/page-29.webp"
    ],
    "imageAltTexts": [
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 16ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 17ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 18ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 19ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 20ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 21ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 22ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 23ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 24ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 25ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 26ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 27ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 28ページ）",
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計（公式問題PDF 29ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/sc/2017-autumn-pm2/answer-q2-p02.webp"
    ],
    "answerImageAltTexts": [
      "情報処理安全確保支援士 2017年度秋期 午後II 問2　データ暗号化の設計 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sc_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sc_pm2_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）情報処理安全確保支援士 2017年度秋期 午後II",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
