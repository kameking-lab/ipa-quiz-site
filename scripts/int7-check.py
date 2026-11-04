import json,os,subprocess,sys,time,hashlib
from pathlib import Path
name,*args=sys.argv[1:]
allowed={'PATH','PATHEXT','SYSTEMROOT','WINDIR','COMSPEC','TEMP','TMP','USERPROFILE','LOCALAPPDATA','APPDATA','PROGRAMFILES','PROGRAMFILES(X86)','PROGRAMDATA','HOMEDRIVE','HOMEPATH','NUMBER_OF_PROCESSORS','PROCESSOR_ARCHITECTURE','OS'}
env={k:v for k,v in os.environ.items() if k.upper() in allowed}
env.update({'NEXT_TELEMETRY_DISABLED':'1','NODE_OPTIONS':'--max-old-space-size=4096','CI':'1'})
root=Path(__file__).resolve().parents[1];out=root/'reports/int7-20261105';out.mkdir(exist_ok=True,parents=True)
start=time.time();log=out/(name+'.log')
with log.open('wb') as f:
 result=subprocess.run(args,cwd=root,env=env,stdout=f,stderr=subprocess.STDOUT)
receipt={'command':args,'exitCode':result.returncode,'seconds':round(time.time()-start,2),'log':log.relative_to(root).as_posix(),'sha256':hashlib.sha256(log.read_bytes()).hexdigest(),'environment':'allowlisted OS variables only; CI=1, telemetry disabled, NODE_OPTIONS=4096; no service credentials or env files'}
(out/(name+'.result.json')).write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf8')
print(json.dumps(receipt));sys.exit(result.returncode)
