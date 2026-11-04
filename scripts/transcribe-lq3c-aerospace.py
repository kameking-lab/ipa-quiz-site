"""校正済み原本19ページに対応するOCRを、既知の誤読を修正して転記。

空欄表とブロック図は原本表示を維持。未確認の他部門は処理しない。
"""
import json
import re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
REPORT=ROOT/'reports/LQ3B-20261104'
p=REPORT/'manuscripts/pe-first-aerospace-2024.json'
qs=json.loads(p.read_text(encoding='utf8'))
ocr=(REPORT/'2024-03-sorted.txt').read_text(encoding='utf8')
ocr=re.sub(r'^===.*?===\s*','',ocr,flags=re.M)
ocr=re.sub(r'^【03】.*?\d+/19\s*','',ocr,flags=re.M)
ocr=ocr.replace('Ⅲー42次元','Ⅲー4 2次元')
blocks=re.split(r'Ⅲ[ー一−－](\d+)\s*',ocr)
fixes={'工ンジン':'エンジン','ェンジン':'エンジン','レー月線図':'V−n線図','揚カ':'揚力','空カ':'空力','推カ':'推力','ControIAnticipationparameter':'Control Anticipation Parameter','(rad]':'[rad^−1]','Crad]':'[rad^−1]','いくっか':'いくつか','C02':'CO2','高バイバス':'高バイパス','サーモル':'サーマル','7&8km/s':'7〜8 km/s','l()km/s':'10 km/s','lcm':'1 cm','被爆':'被曝','「日クロス」':'「βクロス」','ベイロード':'ペイロード','べイロード':'ペイロード','スイング.バイ':'スイングバイ','ター ポ':'ターボ','ターポ':'ターボ','ー液推進薬':'一液推進薬','スビン':'スピン','アプレーター':'アブレーター','アプレーション':'アブレーション','LEー7':'LE−7','SateIIite':'Satellite','SateIIite':'Satellite','GlobaINavigation':'Global Navigation','1,OOOMHz':'1,000 MHz'}
for i in range(1,len(blocks),2):
    n=int(blocks[i]); raw=blocks[i+1]
    if n in [3,8,21,23,30,34,35]: continue
    parts=re.split(r'^[①②③④⑤]',raw,flags=re.M)
    assert len(parts)==6,(n,len(parts))
    texts=[]
    for s in parts:
        s=''.join(s.split())
        for a,b in fixes.items(): s=s.replace(''.join(a.split()),b)
        s=s.replace(',,',',').replace(',。','。').replace('。,','。')
        texts.append(s)
    if n in [13,25] and texts[0].endswith('どれ'): texts[0]+='か。'
    qs[n-1].update(text=texts[0],choices=texts[1:])
# 原本17ページの①はOCR末尾欠落を補正。
qs[31]['choices'][0]='GPS（Global Positioning System）やGLONASS（GLObal NAvigation Satellite System）の測位精度は、航空路を航行するには十分であるが、衛星に不具合があった場合にただちにそれを検出し、ユーザに伝送することまでは保証されていない。'
qs[16]['sources'][0]['url']='https://sma.jaxa.jp/TechDoc/Docs/JAXA-JERG-0-052B.pdf'
p.write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('30 text questions; 5 original-image combination/diagram questions')
