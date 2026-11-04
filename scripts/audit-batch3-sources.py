import json,subprocess,hashlib
from pathlib import Path
root=Path('.');out=root/'reports/int7-20261105'
branches={'benrishi':'qual/benrishi-20261104','sokuryoshi':'qual/sokuryoshi-20261104','dokugeki-chiba':'qual/dokugeki-chiba-20261104','jokaso-setsubishi':'qual/jokaso-setsubishi-20261104','chiiki-ryoko':'qual/chiiki-ryoko-20261104','junkango-kansai':'qual/junkango-kansai-20261104','kukaku-seiri':'qual/kukaku-seiri-20261104','dojo-osen':'qual/dojo-osen-20261104','kenchikushi2':'qual/kenchikushi2-20261104'}
rows=[]
for code,branch in branches.items():
 path='data/qualification-staging/'+code
 changes=subprocess.check_output(['git','diff','--name-only',branch,'--',path],text=True).splitlines();assert not changes,(code,changes)
 files=list((root/path).rglob('*'));files=[p for p in files if p.is_file()]
 sha=subprocess.check_output(['git','rev-parse',branch],text=True).strip()
 rows.append({'code':code,'sourceBranch':branch,'sourceHead':sha,'unchangedFiles':len(files),'differences':changes})
base='ef95cd92d198186d2dc52095bd27fe4ebea4676e'
branches_all=['feat/prune-a-20261104','feat/grow-b-20261104','feat/tsugino-funnel-20261104','feat/contact-site-param-20261104',*branches.values()]
ancestry=[]
for b in [base,*branches_all]:
 assert subprocess.run(['git','merge-base','--is-ancestor',b,'HEAD']).returncode==0,b
 ancestry.append({'ref':b,'sha':subprocess.check_output(['git','rev-parse',b],text=True).strip()})
for path in ['scripts/vercel-migrate.mjs','prisma','vercel.json','.vercelignore','mobile/shared/AuthorizedContent.tsx']:
 changes=subprocess.check_output(['git','diff','--name-only',base,'--',path],text=True).strip();assert not changes,(path,changes)
result={'base':base,'ancestry':ancestry,'privateManuscripts':rows,'dbAndMigrationFiles':'unchanged from batch2','publicProjectionCount':1782,'normalExercises':1782}
# Derive counts instead of treating hand-written totals as authoritative.
receipt=json.loads((out/'projection-receipt.json').read_text(encoding='utf8'))
result['normalExercises']=sum(receipt['counts'].values());result['publicProjectionCount']=result['normalExercises'];result['originals']=result['normalExercises']+len(receipt['excluded'])
(out/'source-and-ancestry-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps({'sources':len(rows),'unchangedSourceFiles':sum(r['unchangedFiles'] for r in rows),'exercises':result['normalExercises'],'originals':result['originals']}))
