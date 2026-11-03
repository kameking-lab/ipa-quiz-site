# ボイラー上位資格・整備士 直近2回監査

確認日: 2026-11-03。作業ブランチ: claude/loving-heisenberg-dft90n。

## 共通

公式一覧 https://www.exam.or.jp/lckohyo/ の掲載欄を直接確認。実施時期と掲載年月は別。1級・整備士は2026年10月掲載（2026年1〜6月実施）と2026年4月掲載（2025年7〜12月実施）。特級は2026年4月掲載（2025年10月実施）と2025年4月掲載（2024年10月実施）。回次をURL名や現時点の年度から推定していない。

既存 eisei1 の Question 型・data/questions・登録・動的ローダー・資格台帳を利用。台帳は ready-to-ingest とし isExamPublished=false。公開用問題配列と動的ローダーは同じゲートを適用。新しい公開ルートの個別追加は不要（既存の動的ルートを利用）。ステージングも validate:questions の対象へ明示的に追加。公開許可・build・デプロイ・PR作成は行わない。

## 一級ボイラー技士（boiler1）

- 全問公開: 両回40問、合計80問。公式の○付き正答を全問取得し、原問番号ごとに保存データと照合。
- 2026年10月: https://www.exam.or.jp/wp-content/uploads/2026/10/LC20262102.pdf
  SHA256: 9780e5b4a5ea602a74d85dce9f3a75f32f8190c153e98b5aabc8bd32cbeb6510
- 2026年4月: https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260402-1.pdf
  SHA256（既存の公式取得記録）: 05339b613bc8d9f8158631ef7ee64a546865aceacae91dfac0e9bee2291a6bc9
- 問題文・5肢は公式PDFのテキストに基づく。既存の4月公表テキストと独自解説を再利用。10月は公式PDFから抽出し、問6の分数式をPDF画面と照合してテキストに補正。必要な線図・回路図だけを画像併用し hasImage を設定。全問画像への置換なし。
- 各問に問題・正答出典URLと公表年月・原問番号を付与。spring/autumn は掲載月4月/10月の内部キーであり、表示は公表年月とする。解説は独自作成、法令は出題時点と明記。
- 4月は既存PDF抽出テキストを再利用しており、今回新たな全ページの目視再校正は行っていない。公開前の最終レビューは台帳に残す。
- pnpm install 完了。validate:questions・typecheck・関連テストの結果は以下に記録する。
- 検証結果: pnpm validate:questions 成功（26524問、fail=0。既存警告とタグ未設定等の警告あり）。関連4ファイル1090テスト成功。typecheck は標準ヒープでメモリ不足となったため NODE_OPTIONS=--max-old-space-size=12288 pnpm typecheck で成功。4月PDFも再取得しSHA256一致を確認。
