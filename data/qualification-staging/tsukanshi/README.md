# 通関士試験・未公開ステージング

- **第59回（2025-10-05実施）**: 通関業法20問・関税法等30問・通関実務15問（第3〜17問）＝65原問、105解答単位（語群問題は空欄イ〜ホごと）。通関実務第1・2問（申告書作成式）は除外。`2025.json`。
- **第60回（2026-10-04実施）**: 問題文のみ `sources/transcription-60.json`（59原問、`officialAnswers: null`）。正答は税関サイトで 2026-11-10 の合格発表以降に掲載予定。掲載後に `official-answers.json` の "60" と editorial を追加して `2026.json` を生成する。第60回は構成が違う（通関業法17・関税法等28・通関実務16問のうち申告書2問除外）。択一式に「０」の選択肢がない問がある。

**未公開。** `publishable: false`、全レコード `publicAllowed: false`。共有レジストリ・UIの差分案は `reports/tsukanshi-registry.md`。

## 由来
第59回の転記と公式正答は `origin/claude/compassionate-brahmagupta-wkiu7v`（47110393c）の成果を取り込んだ（`sources/59-*.txt` と `sources/wip-manifest-59.json` の SHA-256 を再確認）。WIP の解説は記述ごとの理由になっていなかったため、全空欄・全記述・計算過程の独自解説を書き直した（`editorial/59-*.json`）。

## 再生成・検証
```powershell
python -X utf8 scripts/build-tsukanshi-staging.py [--check]
pnpm vitest run __tests__/questions/w3-law-customs-staging.test.ts
```
