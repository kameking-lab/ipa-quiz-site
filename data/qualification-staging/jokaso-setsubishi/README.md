# 浄化槽設備士（学科）・未公開ステージング

COV1 B候補7に基づくCQ4。浄化槽管理士（`jokaso`）とは別資格。
2026-11-04に公式一覧を通常GETで確認し、直近の令和8年・令和7年の学科問題と学科正答を取得。
各50問、計100問。実地試験は対象外。

`manifest.json`と各問の`publicAllowed`は常に`false`。ExamCode、公開レジストリ、通常ローダー、publicディレクトリには接続しない。
資格台帳にはexamCodeを付けず、未公開の保存先を記録する。
著作権ポリシーの許可要件を記録し、既存の管理士の権利確認を設備士へ流用しない。

問題本文・番号1〜4の選択肢・公式正答番号は原本どおり。改行・空白は整理し、ルビは本文から除くが原本画像に保持する。
原文の誤った記述も正しい内容へ書き換えず、独自解説で説明する。
全100問に問題全体の原本切出し画像を保存し、図、表、数式、選択肢内図版を保持する。画像はステージング内の相対パス。
独立レビュー初回で2枚の見出し・肢番号の欠落が見つかったため、全100枚を原ページ全体のPNG描画後に切り出す方法で再生成した。最終資産はPNGであり、直接PDFをクリップして描画したWebPは残さない。

2025年の画像PDFは異なる解像度で2回OCRし、不一致を拡大原本で確認する。記録は`reports/CQ4-20261104/transcription/`。
OCRを公式本文とみなさず、原本と正答表を別に照合する。
法令基準日が公式資料で明記されていない場合は`lawReferenceDate: null`とし、試験日を公式基準日と称さない。
各問の`legalContextDate`は説明対象の試験時点を表す。

原本PDFと一時OCR画像はコミットしない。再取得用URL・HTTP結果・SHA-256はmanifestに保持する。

## 検証と再照合

```powershell
pnpm validate:questions --exam=jokaso-setsubishi
pnpm test __tests__/questions/jokaso-setsubishi-staging.test.ts __tests__/lib/exam-config-integrity.test.ts
pnpm typecheck
python scripts/audit-jokaso-setsubishi-source.py --source-dir <原本PDF保存先>
```

`validate:questions`は専用の厳密スキーマで100問の番号・公式正答・本文ハッシュ・原本画像ハッシュ・全肢解説・未公開設定を確認する。
最後に表示される通常問題の件数は0であり、その前の`[staging] ... 100 questions`が本データの検証結果。
引数なしの全資格検証でも本ステージングを検証する。

原本監査スクリプトは4PDFのSHA-256、座標に基づく全100正答表セル、100枚の原本画像のピクセル一致を検証する。
本文ハッシュは目視照合後の改変検知用であり、原本との文字単位照合そのものを証明しない。
スキャン原文の独立照合と解説の正確性は、別プロセスのread-onlyレビューで確認する。
