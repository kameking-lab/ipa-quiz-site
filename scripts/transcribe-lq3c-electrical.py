"""Transcribe the original-checked plain electrical questions only."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; REPORT=ROOT/'reports/LQ3B-20261104'
p=REPORT/'manuscripts/pe-first-electrical-2024.json'; q=json.loads(p.read_text(encoding='utf8'))
s=(REPORT/'2024-04-sorted.txt').read_text(encoding='utf8')
s=re.sub(r'^===.*?===\s*','',s,flags=re.M); s=re.sub(r'^【04】.*?\d+/23\s*','',s,flags=re.M)
blocks=re.split(r'Ⅲ[ー一−－](\d+)\s*',s)
fixes={'磁東':'磁束','バルプ':'バルブ','かっ':'かつ','そのもので':'そのもので','ベースパンド':'ベースバンド','べースパンド':'ベースバンド','局部発信器':'局部発振器','シンポル':'シンボル','M0dulation':'Modulation','AmpIitude':'Amplitude','スーパーへ':'スーパーヘ','そう。':'そう。'}
for i in range(1,len(blocks),2):
    n=int(blocks[i])
    if n not in [2,13,17,31,33]: continue
    parts=re.split(r'^[①②③④⑤]',blocks[i+1],flags=re.M); assert len(parts)==6
    text=[]
    for t in parts:
        t=''.join(t.split()).replace('。,' ,'。').replace(',。','。').replace(',,',',')
        for a,b in fixes.items(): t=t.replace(a,b)
        t=t.replace('強磁性体を置くと,磁束','強磁性体を置くと,磁束').replace('磁気遮断とは磁界','磁気遮断とは、磁界')
        t=t.replace('は,振動','は振動').replace('は,機械','は機械').replace('は,電力線','は電力線')
        text.append(t)
    q[n-1].update(text=text[0],choices=text[1:])
p.write_text(json.dumps(q,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('10 original-checked text questions; remaining equations/diagrams use official images')
