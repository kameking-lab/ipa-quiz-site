候補 `17d7ea6b1` の中間レビューでは、必須修正を3件確認しました。判定対象は指定コミットで、レビュー中に現れた親側の未コミット修正は含めていません。

1. **[P1] 測量士午後10問が自己確認画面に入らない**
   
   [lib/questions/descriptive.ts:5](C:/Users/kanet/20260522/wt-batch3/lib/questions/descriptive.ts:5) の対象資格に `sokuryoshi` がありません。  
   再現条件：`/quiz?exam=sokuryoshi&mode=year&year=2025&session=pm` を開く。`QuizPlayer.tsx:433` の自己確認分岐を通らず、選択肢のない通常プレイヤーに入るため、解答によって解説を開けません。公開問題ページでも同じ判定により公式解答例画像の表示分岐から外れます。測量士を自己確認対象へ追加する必要があります。

2. **[P2] nativeからのrelated要求がnative判定を通らない**
   
   [app/quiz/QuizClient.tsx:105](C:/Users/kanet/20260522/wt-batch3/app/quiz/QuizClient.tsx:105) は、候補HEADではnativeでも自動取得し、`X-Kakomon-Native` を送信しません。  
   再現条件：`MOBILE_IAP_ENABLED` が `true` ではない環境で、iOSから問題を開き、残りプールに関連問題が存在する場合。[related API:16](C:/Users/kanet/20260522/wt-batch3/app/api/questions/related/route.ts:16) の空応答条件を通らず、未選択問題の本文・正答を取得してキャッシュします。native側で取得を停止するか、識別ヘッダーを確実に送る必要があります。strict有効時は空応答になります。

3. **[P2] 測量士午後の解答用紙画像が公開投影から欠落**
   
   [scripts/build-batch3-projections.py:67](C:/Users/kanet/20260522/wt-batch3/scripts/build-batch3-projections.py:67) は `originalQuestion.sourcePages` のみを投影し、元データの `answerSheetPages` を無視します。  
   例：`sokuryoshi-2025-annual-pm-q1` の解答用紙 `000271266` の1・2ページが公開データに入りません。同様に午後10問すべてで欠落しています。作図・記入用の原図を使って自己確認できるよう、解答用紙画像も公開投影・表示対象に含める必要があります。

指定件数1,782件、全員正解2問の除外、准看護師問139の単独複数正答、地域限定旅行の複数選択指定、問題URLキーの重複なしを確認しました。画像台帳1,224件の元画像・公開画像のハッシュも一致しています。INT5B migration処理・Prisma・iOS serverは起点から変更されていません。

テスト・ビルド・ネットワーク接続・秘密値読取り・ファイル変更は実施していません。これはコード中間レビューであり、最終検証完了や専門家校閲・権利者許諾の完了を示すものではありません。

VERDICT: FAIL