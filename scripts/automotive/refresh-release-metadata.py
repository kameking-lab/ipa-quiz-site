"""Keep public partial-coverage counts aligned with the accepted ID ledger."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
meta = json.loads((ROOT/'data/questions/automotive/qualifications.json').read_text(encoding='utf-8'))
p = ROOT/'lib/qualifications/catalog.ts'
catalog = p.read_text(encoding='utf-8')
pseo = ROOT/'lib/seo/exam-meta.ts'
seo = pseo.read_text(encoding='utf-8')
for m in meta:
    pattern = r'  \{\n    slug: "' + re.escape(m['exam']) + r'".*?\n  \},'
    match = re.search(pattern, catalog, re.S)
    assert match, m['exam']
    block = match[0]
    block = re.sub(r'保存\d+原問中\d+問', f"保存{m['stored']}原問中{m['reviewed']}問", block)
    remaining = [f"未収録{m['stored']-m['reviewed']}原問の内容照合"] if m['stored'] != m['reviewed'] else []
    block = re.sub(r'remainingWork: \[[^\n]*\]', 'remainingWork: '+json.dumps(remaining,ensure_ascii=False), block)
    catalog = catalog[:match.start()] + block + catalog[match.end():]
    seo = re.sub(r'("'+re.escape(m['exam'])+r'": ")\d+原問中\d+問',
                 lambda match: match[1]+f"{m['stored']}原問中{m['reviewed']}問", seo)
p.write_text(catalog, encoding='utf-8', newline='\n')
pseo.write_text(seo, encoding='utf-8', newline='\n')
ledger = json.loads((ROOT/'data/qualification-staging/automotive/latest-two/qa/lq1b-recovery-ledger.json').read_text(encoding='utf-8'))
count = ledger['releaseOriginals']
p = ROOT/'data/questions/automotive/README.md'
s = p.read_text(encoding='utf-8')
s = re.sub(r'\d+原問・\d+肢解説を通常', f'{count}原問・{count*4}肢解説を通常', s)
s = re.sub(r'残\d+原問は別の保存原稿', f'残{610-count}原問は別の保存原稿', s)
s = re.sub(r'このうち通常原問は\d+、技術確認3、公式全員正解1。',
           f'通常採点への未収録{610-count}問には公式全員正解1問を含む。', s)
s = re.sub(r'通常採点への未収録\d+問', f'通常採点への未収録{610-count}問', s)
s = re.sub(r'(?:現在の|最終)\d+ ID・候補ハッシュ・証拠ハッシュ・未収録\d+ ID',
           f'現在の{count} ID・候補ハッシュ・証拠ハッシュ・未収録{610-count} ID', s)
p.write_text(s, encoding='utf-8', newline='\n')
print(json.dumps({'releaseOriginals': count, 'remaining':610-count}))
