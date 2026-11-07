"""Coordinate-order OCR draft, corrected against all 14 official page images.

The final manuscript is the reviewable artifact, not the uncorrected OCR.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
rows = []
for path in sorted((ROOT/'rendered').glob('2025-11-*.ocr.json')):
    words = [w for line in json.loads(path.read_text(encoding='utf-8-sig')) for w in line['words']]
    words.sort(key=lambda w:w['y']+w['height']/2)
    physical = []
    for word in words:
        cy = word['y'] + word['height']/2
        if not physical or cy-physical[-1][0]>12:
            physical.append((cy,[word]))
        else:
            physical[-1][1].append(word)
    for _, ws in physical:
        text = ''.join(w['text'] for w in sorted(ws,key=lambda w:w['x']))
        if re.search(r'【1?1】|令和7年度|10時30分|Ⅲ次の35',text):
            continue
        rows.append(text)
text = '\n'.join(rows)
parts = re.split(r'Ⅲ[ー－−一]\s*(\d+)\s*',text)
questions = {}
for i in range(1,len(parts),2):
    n, body = int(parts[i]), parts[i+1].replace('\n','')
    # Explicit glyph corrections checked against the source pages.
    for old,new in [('プラインド','ブラインド'),('().3~2.5m','0.3～2.5μm'),
      ('しつくい','しっくい'),('定数として扱って良。','定数として扱って良い。'),
      ('定数として扱って良③','定数として扱って良い。③'),
      ('O.9','0.9'),('O.2~O.7','0.2～0.7'),('0.3~o.8ppm','0.3～0.8ppm'),
      ('Cm2]','[m²]'),('[cm2]','[cm²]'),('フレキシビリテイ','フレキシビリティ'),
      ('吹出しロ','吹出し口'),('給気ロ','給気口'),('掃除ロ','掃除口'),
      ('ェアフロー','エアフロー'),('C02','CO₂'),('かっオフセット','かつオフセット'),
      ('IOOmm','100mm'),('少しずっ','少しずつ'),('鼻,喉に刺激を生④','鼻，喉に刺激を生じる。④'),
      ('紙おむっ','紙おむつ'),('IO%','10%'),('べンゼン','ベンゼン'),('べッド','ベッド'),
      ('JISA3302一2000','JIS A 3302－2000'),('ThermalNOx','Thermal NOx'),
      ('精密ろ過法()F膜)','精密ろ過法（MF膜）'),('限外ろ過法()F膜)','限外ろ過法（UF膜）'),
      ('生活環境影響調査は許可','生活環境影響調査は，許可'),('義務づけ,られて','義務づけられて'),
      ('圧力変動が発生し負圧','圧力変動が発生し，負圧'),('日射遮蔽係数sc','日射遮蔽係数SC'),
      (',','，')]:
        body=body.replace(old,new)
    chunks = re.split(r'[①②③④⑤]',body)
    if len(chunks)==6:
        questions[n] = dict(text=chunks[0],choices=chunks[1:])
assert set(questions) == set(range(1,36)), set(range(1,36))-set(questions)
questions[2] = dict(text='下図に示す点光源に照らされたA点の水平面照度に最も近い値はどれか。ただし，点光源の配光特性は一様なものとし，反射は考慮しないものとする。', choices=['250 lx','63 lx','54 lx','42 lx','31 lx'], hasFigure=True)
questions[2].update(figureClip=[120,465,435,605], figureAlt='光度1000cdの点光源は水平面から高さ2m。点光源からA点への光線は鉛直下向きと60度をなす。')
questions[8] = dict(text='湿り空気の比エンタルピー h [kJ/kg(DA)]は次の式で表せる。\nh = 1.0t + (2500 + 1.8t)x [kJ/kg(DA)]\nただし，t：乾球温度[℃]，x：絶対湿度[kg/kg(DA)]，kg(DA)：乾き空気の質量。\n乾き空気1000 kg(DA)を含む，乾球温度10℃，絶対湿度0.004 kg/kg(DA)の湿り空気を，蒸気で加熱・加湿し，乾球温度42℃，絶対湿度0.014 kg/kg(DA)としたときの空気の得た熱量として，最も近い値はどれか。', choices=['58 kJ','58 MJ','78 MJ','32 MJ','20 kJ'])
questions[9] = dict(text='室内機器の顕熱発熱量が6480 Wのときに，室温を34℃に保つための換気量に最も近い値はどれか。ただし，外気温19℃，空気密度1.2 kg/m³，乾き空気の定圧比熱は1.0 kJ/(kg・K)とする。', choices=['100 m³/h','360 m³/h','1023 m³/h','1296 m³/h','1555 m³/h'])
questions[17] = dict(text='室内において，ホルムアルデヒドが単一の材料から放散するとき，以下の条件におけるホルムアルデヒドを放散する材料の放散面積に最も近いものはどれか。ただし，発生したホルムアルデヒドは，瞬時に一様拡散し，吸着・分解せず，室内濃度に変動はなく安定しているものとする。\n(1) 室の容積：60 m³\n(2) 室の換気回数：0.5回/h\n(3) 外気中のホルムアルデヒド濃度：6 μg/m³\n(4) 室内空気中のホルムアルデヒド定常濃度：30 μg/m³\n(5) ホルムアルデヒド放散速度：20 μg/(m²h)', choices=['18 m²','27 m²','36 m²','45 m²','72 m²'])
questions[19] = dict(text='含水率（湿量基準）96％の汚泥10m³と含水率（湿量基準）99％の汚泥15m³を混合したときの含水率（湿量基準）として，最も近いものはどれか。',choices=['96.9％','97.2％','97.5％','97.8％','98.1％'])
questions[30] = dict(text='厚生省通達「一般廃棄物処理事業に対する指導に伴う留意事項について（昭和52年環整95号，平成2年衛環22号改定）」に示された方法に従い焼却灰の熱しゃく減量を求めるための測定を行ったところ，次の値が得られた。熱しゃく減量として，最も近い値はどれか。\n乾燥後の試料の重量：10kg\nそのうち，大型不燃物の重量：2kg\n大型不燃物除去後・強熱前の重量：40g\n大型不燃物除去後・強熱後の重量：38g',choices=['3.5％','4.0％','4.5％','5.0％','5.5％'])
reasons=json.loads((ROOT/'sanitary-2025-reasons.json').read_text(encoding='utf8'))
for q in reasons:
    q.update(questions[q['number']])
(ROOT/'manuscripts').mkdir(exist_ok=True)
(ROOT/'manuscripts/pe-first-sanitary-2025.json').write_text(json.dumps(reasons,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('Prepared 35 questions; corrected OCR requires final review of manuscript.')
