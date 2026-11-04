"""Write the accepted packet handoff, refusing to claim incomplete reviews."""
import datetime,hashlib,json,re,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
REPORT=ROOT/'reports/LQ3D-20261104'
receipts={
 'biotechnology':'astra-biotechnology-final.md',
 'water':'astra-water-acceptance.md',
 'management':'astra-management-final.md',
 'applied-science':'astra-applied-science-1.md',
 'fisheries':'astra-fisheries-acceptance.md',
 'agriculture':'astra-agriculture-final.md',
 'environment':'astra-environment-acceptance.md',
 'nuclear':'astra-nuclear-acceptance.md',
}
for slug,name in receipts.items():
    text=(REPORT/name).read_text(encoding='utf-8-sig')
    assert 'PASS' in text.splitlines()[0] and 'FAIL' not in text.splitlines()[0],name
nuclear=(REPORT/receipts['nuclear']).read_text(encoding='utf-8-sig')
assert 'PASS' in nuclear and ('応用' in nuclear or 'applied' in nuclear)
checks=json.loads((REPORT/'check-exit-codes.json').read_text(encoding='utf-8-sig'))
assert checks==dict(validateQuestions=0,typecheck=0,relatedTests=0),checks
verification=json.loads((REPORT/'verification.json').read_text(encoding='utf-8'))
assert verification['questions']==280 and verification['choiceReasons']==1400
pins=json.loads((REPORT/'adoption-manifest.json').read_text(encoding='utf-8'))
acceptance=[]
for pin in pins:
    slug=pin['paperId'].removeprefix('pe-first-').removesuffix('-2024')
    receipt=REPORT/receipts[slug]
    acceptance.append(dict(paperId=pin['paperId'],status='PASS',review=receipt.relative_to(ROOT).as_posix(),reviewSha256=hashlib.sha256(receipt.read_bytes()).hexdigest(),normalizedSha256=pin['normalizedSha256']))
(REPORT/'acceptance-manifest.json').write_text(json.dumps(acceptance,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
scope=json.loads((REPORT/'scope.json').read_text(encoding='utf-8'))
for item in scope: item['status']='adopted-astra-pass'
(REPORT/'scope.json').write_text(json.dumps(scope,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
def logtext(path):
    data=path.read_bytes()
    return data.decode('utf-16') if data.startswith((b'\xff\xfe',b'\xfe\xff')) else data.decode('utf-8-sig')
for name in ('validate-questions','typecheck','tests'):
    data=logtext(REPORT/f'local/{name}-accepted.log')
    clean='\n'.join(line.rstrip() for line in data.splitlines()).rstrip()+'\n'
    (REPORT/f'{name}-final.txt').write_text(clean,encoding='utf-8',newline='\n')
tests=logtext(REPORT/'local/tests-accepted.log')
now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9))).isoformat(timespec='seconds')
commits=subprocess.check_output(['git','log','--format=%h %s','d9334a18a..HEAD'],cwd=ROOT).decode('utf-8').strip()
status=subprocess.check_output(['git','status','--short'],cwd=ROOT).decode('utf-8').strip()
lines=[
 '# LQ3D 作業報告（2026-11-04）',
 '',
 '後半8回280問・1,400肢解説を完成。各部門を指定CLIのgpt-6-astraで独立レビューし、必須指摘を修正してPASSを確認した。',
 '',
 '- worktree: `C:/Users/kanet/20260522/wt-LQ3D`',
 '- branch: `qual/LQ3D-20261104`',
 '- 起点: `d9334a18a`（作成時のqual/LQ3-20261104。LQ3C完成5回を含む）',
 '- 開始: 03:01:31 JST、40分境界: 03:41:31 JST',
 f'- 本報告生成: {now}',
 '- 権利はオーナー確認済みとして継続。公式保存済みPDFを利用。取得制限の迂回、push、PR、デプロイは一切なし。秘密値の出力なし。',
 '',
 '## 完成・独立受入',
 '',
 'すべて2024年度、各35問・175肢・公式正答35/35一致。本文・式・図表・全選択肢は公式原問ページ画像で保持（計145ページ）。未校正OCRを表示本文へ転用していない。原子力Q8・Q9・Q11は二ページを表示する。',
 '',
]
labels={'water':'上下水道','agriculture':'農業','fisheries':'水産','management':'経営工学','applied-science':'応用理学','biotechnology':'生物工学','environment':'環境','nuclear':'原子力・放射線'}
for slug in labels: lines.append(f"- {labels[slug]}: PASS、`{receipts[slug]}`")
lines += [
 '',
 '原子力最終票は、応用理学の指数表記修正と統合テストの追加台帳対応も再確認している。生物Q16コドン配列、上下水道Q13/Q28、経営Q6/Q9/Q19/Q31、水産Q17/Q30、農業Q22、環境Q8/Q23/Q33/Q34、原子力Q18と指数表記を修正した。水産Q17の一度のレビュー誤読は原寸原本で再確認し、訂正後の独立PASSを採用した。',
 '',
 '## 出典上の限界',
 '',
 '- 環境Q14: 2022年版JIS本文の個別条項との直接照合は未完。旧版の補助資料と書誌情報を区別し、この限界を配信要約にも明記。Astraは試験学習用としてPASS。規格適合の認定ではない。',
 '- 環境Q31: 維管束植物6000/8000/固有2900の資料リンクと、蘚苔類1600の資料リンクを追加。固有270の外部一次資料の裏付けは未確認として明記。',
 '- 環境Q34: 公式正答⑤を維持。ただし⑤の周期説明は環境省2012年資料・現行説明とも一致し、公式が不適切とする理由は確認できない。不整合を明記し、歴史改定の説明を創作していない。',
 '- 水産Q30④: 国内100 Bq/kgとCodex1000 Bq/kg、年間1mSvの考え方を区別し、原文の精度を注記。原子力Q21④も7Li・γ分岐の簡略表現を補足した。',
 '',
 '## 検証',
 '',
 '- `corepack pnpm validate:questions`: exitCode=0、26,444問、fail=0、既存warn=16,808。native用のため専門科目280問は専用検証で別途確認。',
 '- `corepack pnpm typecheck`: exitCode=0。',
 '- 関連Vitest: exitCode=0。件数は `tests-final.txt` の末尾参照。新規台帳を動的に検査する専用テスト、既存PE統合、採点、表示、解説、進捗、セッション、リンク、ナビゲーションを含む。',
 f"- `python scripts/audit-lq3d.py`: 280公式正答、1,400理由、全pin一致。基準の既存データ・画像・LQ3B資料{verification['baselineFilesUnchanged']}ファイル不変。追加差分の秘密値形式検査0件。",
 '- 独立レビュー: すべて `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を使用。最終票・中間FAIL票を保存。',
 '',
 '## 分離と再開',
 '',
 'LQ3Cの原稿・問題データ・画像・catalog.json・LQ3B台帳と残件一覧は未変更。追加登録は `catalog-lq3d.json` と `reports/LQ3D-20261104/adoption-manifest.json` に分離。共通ファイルは読み込み二か所とPE統合テストの台帳件数合算だけを変更した。',
 '',
 'LQ3D担当の未完成回は0。前半LQ3Cの残り（繊維・金属・資源工学2024、計105問）は本作業に含めず、未変更。基準からの接続総数は33回1,155問・採点1,154問（既存情報2025Q25の参照専用を維持）。',
 '',
 '次回は `git -C C:/Users/kanet/20260522/wt-LQ3D status --short`、`git log -10 --oneline`、本報告を確認。部門ごとのコミットを統合する際は専用catalog/manifestと読み込み変更も一緒に取り込む。LQ3Cが残りを進めても、LQ3Dの登録ファイルは別なので旧インポーターによる上書きを避けられる。',
 '',
 '校正済み稿は `reports/LQ3D-20261104/manuscripts/`。自作稿の修正後だけ `python scripts/import-lq3d.py 2024 <部門番号> --refresh` を使う。authorスクリプトの不用意な再実行は避ける。最終監査は `python scripts/audit-lq3d.py`。詳細実行ログ・閲覧キャッシュはlocal/にありGit対象外。最終検証ログはUTF-8で追跡保存。',
 '',
 '## 保存済みコミット（報告直前）',
 '',
 '```text',commits,'```',
 '',
 '最終報告・検証保存コミットはこの後なので、最終HEADはgit log -1で確認。作業状態は最終保存後のgit status --shortで確認できる。',
]
text='\n'.join(lines)+'\n'
(REPORT/'lq3d-report.md').write_text(text,encoding='utf-8',newline='\n')
external=Path('C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lq3d-report.md')
external.write_text(text,encoding='utf-8',newline='\n')
print('Report saved; all eight receipts PASS; all required check exit codes=0')
