"""Write the bounded LQ3C handoff from accepted receipts and current git state."""
import json,re,subprocess
from datetime import datetime,timezone,timedelta
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
REPORT=ROOT/'reports/LQ3C-20261104'
def read(p): return json.loads(p.read_text(encoding='utf-8-sig'))
def git(*args): return subprocess.check_output(['git',*args],cwd=ROOT).decode('utf8').strip()
scope=read(REPORT/'scope.json')
evidence=read(REPORT/'verification.json')
receipts={'pe-first-marine-2025':'astra-marine-final.md','pe-first-marine-2024':'astra-marine-final.md','pe-first-aerospace-2024':'astra-aerospace-acceptance.md','pe-first-electrical-2024':'astra-electrical-final.md','pe-first-chemical-2024':'astra-chemical-final.md'}
pins=read(ROOT/'reports/LQ3B-20261104/adoption-manifest.json')
new={p['paperId']:p for p in pins if p['paperId'] in receipts}
assert len(new)==5
for paper,filename in receipts.items():
    s=(REPORT/filename).read_text(encoding='utf8')
    assert 'PASS' in s[:120] and 'FAIL' not in s[:120],(paper,filename)
for x in scope['LQ3C']:
    pin=next((p for p in new.values() if p['year']==x['year'] and p['department']==int(x['department'][:2])),None)
    x['status']='adopted-astra-pass' if pin else 'source-cached-manuscript-pending'
    if pin: x['paperId']=pin['paperId']; x['receipt']=receipts[pin['paperId']]
(REPORT/'scope.json').write_text(json.dumps(scope,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
table='\n'.join(f"| {x['department']} | {x['year']} | {'35問・175肢、PASS' if x['status']=='adopted-astra-pass' else '未制作・未接続'} |" for x in scope['LQ3C'])
status='\n'.join(line for line in git('status','--short').splitlines() if line=='?? AGENTS.md' or line.startswith('?? reports/LQ3-20261104/'))
commits=git('log','--format=%h %s',f"{scope['baseline']}..HEAD")
now=datetime.now(timezone(timedelta(hours=9))).isoformat(timespec='seconds')
body=f'''# LQ3C 作業報告（2026-11-04）

前半8回280問のうち **5回175問・875肢解説を完成**。指定CLIのgpt-6-astraで各部門の独立レビューPASSまで修正した。残りは前半の3回105問・525肢。全8回完了ではない。40分の作業枠で未完成稿を接続せず、再開可能な状態を残す。

- worktree: `C:/Users/kanet/20260522/wt-LQ3`
- branch: `{git('branch','--show-current')}`
- 起点: `{scope['baseline']}`
- 開始: 02:25:37 JST、40分境界: 03:05:37 JST
- 本報告生成: {now}
- 権利はオーナー確認済みとして作業継続。取得STOPを理由に停止していない。保存済み公式PDFを再利用し、アクセス制限の迂回なし。push・PR・デプロイなし。秘密値の出力なし。

## 対象と結果

残件一覧の順序で前半8回を固定した（`scope.json`）。

| 部門 | 年度 | 状態 |
|---|---:|---|
{table}

今回の公式175正答は全一致。新規の69問は本文・全5肢をテキスト化し、必要な図も表示。ほかの設問は公式原問画像で本文・式・図表・全選択肢を保持した。全117ページ画像を保存。前回までの700問と関連資産は維持。技術士専門科目の接続総数は25回875問、採点874問（情報2025 Q25の参照専用を維持）。

## 検証と独立受入

- `corepack pnpm validate:questions`: 26,444問、fail=0、既存warn=16,808、exitCode=0。native問題用なので今回の専門科目は専用テスト・原本照合で別途確認。
- `corepack pnpm typecheck`: exitCode=0（`typecheck-final.log`）。
- 関連Vitest: 10ファイル69テスト成功、exitCode=0（`tests-final.log`）。動的manifestに含まれる新規各35問の公式正答・全肢理由・採点・資産ハッシュを検証。旧2,975肢のみのテストと区別。
- `python scripts/audit-lq3c.py`: 新規175正答・875理由、原稿/採用JSON/PDF/画像の全pin一致。既存PEデータ・画像558ファイル不変。LQ3D担当の新規接続0。結果 `verification.json`。
- 独立レビューは全て `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only`。受入票: 船舶2回 `astra-marine-final.md`、航空 `astra-aerospace-acceptance.md`、電気電子 `astra-electrical-final.md`、化学 `astra-chemical-final.md`。いずれもPASS。
- 必須指摘は全て修正。船舶Q33の式の符号説明、航空Q3肢順・OCR・Q4原文単位と注記の分離、電気電子の6肢理由と転記9箇所、化学Q21の重合分類。航空Q17のTID/DD、Q34の平面/三次元測位の区別も保持。航空の一度の依頼文字化けはレビュー未実施として扱い、UTF-8ファイルで再実行した。

## 部門別コミット

```text
{commits}
```

最終報告・検証ログ整理のコミットはこの後に作成されるため、最新は `git log -1` を参照。

## 残り3回の再開

1. `git -C C:/Users/kanet/20260522/wt-LQ3 status --short`、本報告、`reports/LQ3C-20261104/scope.json`を読む。同じブランチを使う。
2. 前半の未完は **繊維2024（06）、金属2024（07）、資源工学2024（08）**。各35問、合計105問。原本は `reports/LQ3B-20261104/sources/2024-DD.pdf`、OCRは `2024-DD-sorted.txt`、公式キーは `official-keys-2024.json` の部門番号。PDFとOCRは取得済み。繊維の閲覧連結画像だけローカルキャッシュに作ったが、原稿・採用データは未制作。
3. 原本を校正し `reports/LQ3B-20261104/manuscripts/pe-first-<slug>-2024.json`へ35問と175理由を作成する。slugはtextile/metal/resource。未校正OCRを直接接続しない。
4. `python scripts/import-lq3b.py 2024 <部門番号>`。旧 `import-lq3-manuscripts.py` は実行しない。新規35問だけ接続し、必要時のみ自作稿を `--refresh`。
5. 検証と指定CLIの独立レビューをPASSまで行い、部門ごとにコミットする。複数稿がレビュー中なら `scripts/stage-lq3c-papers.py <合格paperId>`でcatalog/manifestの合格分だけをstageできる。
6. 既に合格した5回は再制作不要。author/transcribe/fixスクリプト群は履歴・再現資料であり、校正済み原稿へ不用意に再実行しない。

**LQ3D担当は未変更**: 上下水道、農業、水産、経営工学、応用理学、生物工学、環境、原子力・放射線の2024、8回280問。LQ3C残3回と別枠。全体の残りは11回385問。

## 作業ツリー

開始時からあったAGENTS.mdとreports/LQ3-20261104配下の未追跡ログ・renderedには手を加えていない。今回のlocal画像キャッシュと詳細executionログはgitignore対象。開始時から維持している未追跡一覧は以下。今回分を保存した後の最終状態は `git status --short` で照合する。

```text
{status}
```
'''
(REPORT/'report.md').write_text(body,encoding='utf8',newline='\n')
external=Path('C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lq3c-report.md')
external.write_text(body,encoding='utf8',newline='\n')
print('Wrote internal and requested external LQ3C reports')
