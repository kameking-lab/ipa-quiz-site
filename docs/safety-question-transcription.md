# 安全試験の文字表示データ

`data/exam-library/presentation/` は 78 回・1972 問の表示用データです。1868 問の択一式は問題文と5つの選択肢、104 問の記述式は設問本文を持ちます。図表は `public/exam-library/*/text-q*-p*-fig*.webp` の専用クロップを表示します。

取り込み正本 `data/exam-library/papers/` の `text`・`correctChoice`・`answerAuthority` は変更しません。原文の SHA-256 が一致した表示データだけをサーバーで採用するため、別の問題や改訂前の表示文が混ざることを防ぎます。解説の正本もこの生成処理では変更しません。

## 再生成

PyMuPDF と Pillow を使用します。PDF の保管先はスクリプトの `CACHE` 定数で指定します。

```powershell
python scripts/transcribe-safety-exams.py --workers 3
npx vitest run __tests__/exam-library-presentation.test.ts
```

単一回は `--paper emkohyo-EM20261804` で生成できます。PDF の本文ベースライン、文字サイズ、クリップ範囲、画像タイルを解析します。ふりがなを本文に混ぜず、上付き・下付き文字を保持し、図表の正答印を除去します。画像は元の PDF から描画し、生成 AI で描き直しません。

## 原図確認による補正

`presentation-overrides.json` に、図と照合した数式・化学構造などの補正と確認理由を保存しています。問題に含まれる意図的な誤りは訂正しません。例えば EM20261801 問12の根号内中央の添字は原図の `x` を保持し、EM20251807 問15の肢4も誤った官能基構造のままです。

自動の構造検査は、全文の専門的な校閲の代わりにはなりません。原図確認で見つかった差分は、原文や採点キーを変えず表示用補正へ反映します。再生成の診断ログは `logs/safety-transcription/` に出力されます。
