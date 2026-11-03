import json,re,unicodedata
from pathlib import Path
out=Path('data/questions/denki2');out.mkdir(parents=True,exist_ok=True)
answers={'08':'1321'+'241144'+'4322121331'+'421441243'+'121443'+'24423'+'4323133312'+'4132234431'+'32','07':'3242'+'331141'+'1231434423'+'231224413'+'244213'+'13552'+'4143122343'+'2244314231'+'41'}
for y in ['08','07']:
 src=json.loads(Path(f'reports/sekou-2denki/r{y}-extract.json').read_text()); qs=[];current=None
 for p in src['pages'][1:-2]:
  for l in p['lines']:
   t=l['text'];m=re.match(r'〔No\s*．\s*(\d+)\s*〕\s*(.*)',t)
   if m:
    current={'number':int(m[1]),'pdfPage':p['page'],'lines':[m[2]]};qs.append(current)
   elif current and not t.startswith('※'):current['lines'].append(t)
 assert len(qs)==62
 for q in qs:
  lines=q.pop('lines'); groups=[]; group=[]
  for t in lines:
   m=re.match(r'^([1-5])\s*．\s*(.*)',t)
   if m:
    groups.append(group);group=[m[2]]
   else:group.append(t)
  groups.append(group)
  q['question']='\n'.join(groups[0]).strip();q['choices']=[''.join(g).strip() for g in groups[1:]]
  q['officialAnswerNumbers']=[int(answers[y][q['number']-1])];q['requiredSelections']=1
 season='early' if y=='08' else 'late';year=2026 if y=='08' else 2025
 url=f'https://www.fcip-shiken.jp/pdf/r{y}_2dg'+('z' if y=='08' else '')+'_mondai.pdf'
 data={'exam':'denki2','year':year,'season':season,'session':'gakka','edition':f'令和{8 if y=="08" else 7}年度2級電気工事施工管理技術検定 第一次検定（{"前期" if y=="08" else "後期"}）','publishedCount':62,'questionUrl':url,'answerUrl':url,'questionSha256':src['sha256'],'answerSha256':src['sha256'],'answerPdfPage':len(src['pages']),'questions':qs}
 (out/f'{year}-{season}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 print(y, 'segmented 62 questions; diagram choices restored by finalize-source.py')
