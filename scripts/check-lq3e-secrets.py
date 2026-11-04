"""Report scoped secret-pattern counts without revealing matching values."""
import json,re,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
names=set(subprocess.check_output(['git','diff','--name-only','d9334a18a'],cwd=ROOT,text=True).splitlines())
names.update(p.relative_to(ROOT).as_posix() for p in (ROOT/'reports/LQ3E-20261104').glob('*') if p.is_file() and not p.name.endswith('-execution.log'))
names.update(p.relative_to(ROOT).as_posix() for p in (ROOT/'scripts').glob('*lq3e*'))
patterns=[r'sk-(?:live|test)-[A-Za-z0-9]{16,}',r'gh[pousr]_[A-Za-z0-9]{25,}',r'xox[baprs]-[A-Za-z0-9-]{20,}',r'AKIA[0-9A-Z]{16}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----']
checked=0; matches=[]
for name in sorted(names):
    p=ROOT/name
    if not p.is_file() or p.suffix not in ['.json','.py','.md','.txt','.log','.mjs']: continue
    content=p.read_text(encoding='utf-8-sig'); checked+=1
    if any(re.search(pattern,content) for pattern in patterns): matches.append(name)
result=dict(checkedFiles=checked,matches=len(matches),matchPaths=matches)
(ROOT/'reports/LQ3E-20261104/secret-pattern-check.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print(f'Scoped secret-pattern check: {checked} text files; {len(matches)} matches')
assert not matches
