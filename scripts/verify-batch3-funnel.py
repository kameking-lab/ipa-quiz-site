"""Exercise KFUN1 only on owned loopback servers and synthetic credentials."""
import json
import os
import socket
import subprocess
import time
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[1]
out = root/'reports/int7-20261105'
for port in [3374,3375]:
    with socket.socket() as probe:
        probe.bind(('127.0.0.1',port))
env = dict(os.environ)
env.update({
    'NODE_ENV':'development', 'NEXT_TELEMETRY_DISABLED':'1',
    'BILLING_MODE':'mock', 'BILLING_ORIGIN':'http://127.0.0.1:3374',
    'BILLING_LEGAL_REVIEWED':'true', 'BILLING_NOTICE_AT':'2026-01-01T00:00:00.000Z',
    'BILLING_TRANSITION_STARTS_AT':'2026-01-02T00:00:00.000Z',
    'AUTH_SECRET':'int7-loopback-only-synthetic-secret-do-not-use-elsewhere',
    'KV_REST_API_URL':'http://127.0.0.1:3375', 'KV_REST_API_TOKEN':'int7-loopback-mock',
    'NEXT_PUBLIC_POSTHOG_KEY':'phc_int7_loopback_fake',
    'NEXT_PUBLIC_POSTHOG_HOST':'https://us.i.posthog.com',
    'E2E_BASE_URL':'http://127.0.0.1:3374',
    'KFUN1_EVIDENCE_DIR':str(out/'funnel'),
})
(out/'funnel').mkdir(exist_ok=True)
with (out/'funnel-server.log').open('wb') as log:
    server = subprocess.Popen(['node','node_modules/next/dist/bin/next','dev','-H','127.0.0.1','-p','3374'],cwd=root,env=env,stdout=log,stderr=subprocess.STDOUT,creationflags=subprocess.CREATE_NO_WINDOW)
    try:
        ready = False
        for _ in range(90):
            if server.poll() is not None:
                raise RuntimeError('Owned funnel server exited')
            try:
                with urllib.request.urlopen('http://127.0.0.1:3374',timeout=8) as response:
                    response.read()
                    if response.status==200:
                        ready=True
                        break
            except Exception:
                time.sleep(1)
        if not ready:
            raise RuntimeError('Owned funnel server did not start')
        run = subprocess.run(['corepack.cmd','pnpm','exec','playwright','test','tests/e2e/tsugino-funnel.spec.ts','--workers=1','--retries=0'],cwd=root,env=env)
        if run.returncode:
            raise SystemExit(run.returncode)
        (out/'funnel-environment.json').write_text(json.dumps({'origin':env['E2E_BASE_URL'],'redisStub':'http://127.0.0.1:3375','billing':'mock','credentials':'synthetic loopback-only','browserExternalRequests':'intercepted by tsugino-funnel.spec.ts before sending','realPayments':False,'realDatabase':False},indent=2)+'\n',encoding='utf8')
    finally:
        subprocess.run(['taskkill','/PID',str(server.pid),'/T','/F'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
