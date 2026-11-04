import sys, subprocess, json, hashlib
from pathlib import Path
number = sys.argv[1]
base = Path('reports/lq4e-20261104')
prompt = base / f'review{number}-prompt.txt'
report = base / f'independent-review{number}.md'
log = Path(f'C:/Users/kanet/AppData/Local/Temp/codex-work/lq4e-review{number}.log')
args = ['C:/Users/kanet/AppData/Roaming/npm/codex.cmd','exec','-m','gpt-6-astra','-s','read-only','-C',str(Path.cwd()),'--color','never','-o',str(report),'-']
prompt_bytes = prompt.read_bytes()
with log.open('wb') as output:
    result = subprocess.run(args,input=prompt_bytes,stdout=output,stderr=subprocess.STDOUT)
evidence = {'modelCommand':'C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra','arguments':args[3:],'exitCode':result.returncode,'prompt':str(prompt),'promptSha256':hashlib.sha256(prompt_bytes).hexdigest(),'report':str(report),'reportSha256':hashlib.sha256(report.read_bytes()).hexdigest() if report.exists() else None,'rawLog':str(log),'rawLogSha256':hashlib.sha256(log.read_bytes()).hexdigest()}
(base/f'review{number}-execution.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Review {number} exit={result.returncode}')
sys.exit(result.returncode)
