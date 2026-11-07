# LQ6：1級電気工事施工管理・第一次検定

- ブランチ：`qual/sekou-1denki-20261104`、起点 `origin/main` = `00e49b94060cc2671e9d098df91d653a4ed3ffe2`。
- 令和8年度（2026-07-12）・令和7年度（2025-07-13）の各89問、計178問を未公開ステージングに収録。
- 全724肢に独自解説。No.55～60は各5肢、それ以外は各4肢。公式試験は89問中60問を選択解答する形式で、収録数と実際の解答数は区別する。
- 公式問題・正答：一般財団法人建設業振興基金。問題と正答は同一PDF（正答表は令和8年度44ページ、令和7年度43ページ）。
- 原本：`origin/ops/source-pdfs-20261104` の `sekou-1denki/`。`MANIFEST.json` はそのブランチと内容一致。PDFのSHA-256も一致。
- オーナー決定（2026-11-04 01:30）で権利確認済み。`FCIP-owner-confirmed` はその内部記録で、公式の一般公開ライセンスを主張するものではない。
- `catalog.ts` は `ready-to-ingest`。公開問題一覧、遅延ローダー、公開試験一覧、サイトマップには出さない。push・PR・デプロイは実施しない。

## 原本照合

`finalize-source.py` は抽出ドラフトと独自解説からデータと必要図21点を生成する。正答表のセル位置から89問×2年度の正答を照合し、全178問で一致。

`verify-source.py` は全902項目（問題文178＋選択肢724）をPDFの非ルビ文字列と比較する。空白・Unicode正規化後の一致880項目、数式・空欄・図の個別確認22項目、未確認差分0。個別確認した原文・保存文・理由・ハッシュは `transcription-review.json` に記録。行境界は保持し、`dB/m` と次項番号が結合する誤変換を防ぐ。

必要図はPDFから該当部分のみ切出し、すべて目視確認。図選択肢には原番号と位置を明記し、全問題で選択肢シャッフルを抑止して公式正答・図・解説の番号を一致させる。法令・規程の解説は出題時点に基づくことを明示し、未確認の法令基準日は付与しない。

## 再生成・検証

原本PDFを `.cache/sekou-1denki/r07_1dg_mondai.pdf` と `r08_1dg_mondai.pdf` に配置して、リポジトリルートで実行する。

```text
python -X utf8 reports/sekou-1denki/finalize-source.py
python -X utf8 reports/sekou-1denki/verify-source.py
pnpm validate:questions
pnpm typecheck
pnpm test -- __tests__/questions/sekou-1denki.test.ts
```

検証結果と独立レビューの経緯・修正内容は `verification.md` および `independent-review-*.md` を参照。レビューコマンドはすべて `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を使用した。
