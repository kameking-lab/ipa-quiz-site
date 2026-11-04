"""Read-only verification against supplied PDFs, using pdfplumber independently.

Usage: python scripts/verify-kenchikushi2-owner-pdfs.py OWNER_DIRECTORY
Requires pdfplumber. Prints a small JSON audit; never downloads or writes source data.
The original transcription used PyMuPDF; this comparison uses PDFMiner/pdfplumber.
"""
import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / "data/qualification-staging/kenchikushi2"


def normalize(text):
    text = unicodedata.normalize("NFKC", text).replace("~", "～").replace("〜", "～")
    return re.sub(r"\s|[\x00-\x1f]", "", text)


def source_questions(path):
    questions = {}
    with pdfplumber.open(path) as pdf:
        for page_number in range(2, 11):
            # Ruby is 5.315 pt; retain small numeric superscripts used for m².
            page = pdf.pages[page_number - 1].filter(
                lambda obj: obj.get("object_type") != "char"
                or obj["size"] > 6 or obj.get("text", "").isdigit()
            )
            text = unicodedata.normalize("NFKC", page.extract_text(use_text_flow=True))
            text = re.sub(r"(?m)^計画\s*\d+\s*$", "", text)
            parts = re.split(r"〔No\.\s*(\d+)〕", text)
            for i in range(1, len(parts), 2):
                number = int(parts[i])
                fields = re.split(r"(?m)^\s*([1-5])\s*\.\s*", parts[i + 1])
                choices = {int(fields[j]): fields[j + 1] for j in range(1, len(fields), 2)}
                assert sorted(choices) == [1, 2, 3, 4, 5], (number, choices)
                if number == 1:
                    # Both PDF text decoders yield 繁, but the printed glyph is 繫.
                    choices[2] = choices[2].replace("繁虹梁", "繫虹梁")
                if number == 15:
                    # Visual check: the stacked fraction is 1/8. In text flow,
                    # its denominator is on a separate line after the numerator.
                    choices[3] = re.sub(r"\n8\n", "", choices[3])
                    choices[3] = choices[3].replace("本勾配を1\nとし", "本勾配を1/8とし")
                questions[number] = (page_number, fields[0], choices)
    assert sorted(questions) == list(range(1, 26))
    return questions


def source_questions_ii(path):
    """Independent PDFMiner text comparison; figures are checked as images."""
    figures = {12: (140, 330, 465, 663), 17: (165, 350, 445, 536),
               18: (90, 120, 510, 380), 20: (78, 188, 530, 516)}
    questions = {}
    with pdfplumber.open(path) as pdf:
        for page_number in range(11, 25):
            rect = figures.get(page_number)
            def retain(obj):
                if obj.get("object_type") != "char":
                    return True
                if obj["top"] >= 790 or (obj["size"] <= 6 and not (obj["size"] > 5 and obj.get("text", "").isdigit())):
                    return False
                return not (rect and obj["x0"] < rect[2] and obj["x1"] > rect[0]
                            and obj["top"] < rect[3] and obj["bottom"] > rect[1])
            text = unicodedata.normalize("NFKC", pdf.pages[page_number-1].filter(retain).extract_text(use_text_flow=True))
            parts = re.split(r"〔No\.\s*(\d+)〕", text)
            for i in range(1, len(parts), 2):
                number = int(parts[i])
                fields = re.split(r"(?m)^\s*([1-5])\s*\.\s*", parts[i+1])
                choices = {int(fields[j]): fields[j+1] for j in range(1, len(fields), 2)}
                assert sorted(choices) == [1, 2, 3, 4, 5], number
                # Text flow puts denominators before numerators; restored from page images.
                if number == 1:
                    choices[2] = re.sub(r"高さの\s*2\s*1\s*のもの", "高さの1/2のもの", choices[2])
                if number == 16:
                    for choice, denominator in [(1, 8), (2, 3), (3, 50), (5, 100)]:
                        choices[choice] = re.sub(r"の\s*"+str(denominator)+r"\s*1\s*", "の1/"+str(denominator), choices[choice])
                if number == 18:
                    choices[4] = re.sub(r"ものの\s*2\s*1\s*だけ", "ものの1/2だけ", choices[4])
                questions[number] = (page_number, fields[0], choices)
    assert sorted(questions) == list(range(1, 26))
    return questions


def source_questions_iii(path):
    figures = {2: [(90,155,510,412)], 3: [(210,96,505,246),(220,366,495,607)],
               4: [(70,122,410,468)], 5: [(180,75,540,322),(70,458,455,677)],
               6: [(210,415,545,576)]}
    questions = {}
    with pdfplumber.open(path) as pdf:
        for page_number in range(2,14):
            rects = figures.get(page_number, [])
            def retain(obj):
                if obj.get("object_type") != "char": return True
                if obj["top"] >= 790 or obj["size"] <= 5.5: return False
                return not any(obj["x0"] < r[2] and obj["x1"] > r[0] and obj["top"] < r[3] and obj["bottom"] > r[1] for r in rects)
            page = pdf.pages[page_number-1]
            text = unicodedata.normalize("NFKC", page.filter(retain).extract_text(use_text_flow=True))
            parts = re.split(r"〔No\.\s*(\d+)〕", text)
            for i in range(1,len(parts),2):
                number = int(parts[i])
                fields = re.split(r"(?m)^\s*([1-5])\s*\.\s*", parts[i+1])
                choices = {int(fields[j]):fields[j+1] for j in range(1,len(fields),2)}
                body = fields[0]
                if number == 1:
                    # The printed numerator is I_B; text flow outputs denominator first.
                    body = re.sub(r"とするとき、\s*I\s*A\s*I\s*B", "とするとき、I_B/I_A", body)
                if number in [4,6]:
                    tables = [t for t in page.extract_tables() if len(t) == 6 and len(t[0]) == (3 if number == 4 else 2)]
                    assert len(tables) == 1, (number, tables)
                    table = tables[0]
                    assert len(table) == 6 and len(table[0]) == (3 if number == 4 else 2), (number, table)
                    choices = {}
                    for j,row in enumerate(table[1:],1):
                        if number == 4:
                            choices[j] = f"R_A：{row[0]}、R_B：{row[1]}、Q_Cの絶対値：{row[2]}"
                        else:
                            # Exponent and unit normalized to the original table's headings.
                            value = normalize(row[1]).replace("−", "-")
                            assert value.endswith("×10-5"), value
                            choices[j] = f"L：{row[0]} m、I：{value[:-5]}×10⁻⁵ m⁴"
                if number == 5:
                    for j in [1,2,4,5]:
                        choices[j] = re.sub(r"[\s\x00-\x1f]*2\s*kN", "√2 kN", choices[j])
                if number == 10:
                    for j,term in enumerate(["内法貫","転び止め","長押","配付け垂木","根太掛け"],1):
                        choices[j] = choices[j].replace(term,term+" ― ",1)
                if number == 11: choices[5] = re.sub(r"断面積の\s*3\s*1", "断面積の1/3", choices[5])
                if number == 14:
                    choices[1] = re.sub(r"距離の\s*30\s*1", "距離の1/30", choices[1])
                    choices[4] = re.sub(r"長さの\s*10\s*1", "長さの1/10", choices[4])
                if number == 16:
                    for denominator in [200,250]:
                        choices[5] = re.sub(r"スパンの\s*"+str(denominator)+r"\s*1", "スパンの1/"+str(denominator), choices[5])
                assert sorted(choices) == [1,2,3,4,5], (number, choices)
                # U+2212 and fullwidth source minus are mathematically identical here.
                choices = {k:v.replace("−","-") for k,v in choices.items()}
                questions[number] = (page_number, body, choices)
    assert sorted(questions) == list(range(1,26))
    return questions


def source_questions_iv(path):
    questions = {}
    with pdfplumber.open(path) as pdf:
        for page_number in range(14,24):
            page = pdf.pages[page_number-1]
            def retain(obj):
                if obj.get("object_type") != "char": return True
                if obj["top"] >= 790 or obj["size"] <= 5.5: return False
                return not (page_number == 14 and obj["x0"] < 532 and obj["x1"] > 70 and obj["top"] < 622 and obj["bottom"] > 458)
            text = unicodedata.normalize("NFKC", page.filter(retain).extract_text(use_text_flow=True))
            parts = re.split(r"〔No\.\s*(\d+)〕",text)
            for i in range(1,len(parts),2):
                number = int(parts[i])
                fields = re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1])
                choices = {int(fields[j]):fields[j+1] for j in range(1,len(fields),2)}
                if number == 2:
                    tables = [t for t in page.extract_tables() if len(t)==6 and len(t[0])==3]
                    assert len(tables)==1, tables
                    choices = {j:"／".join(row) for j,row in enumerate(tables[0][1:],1)}
                if number == 8: choices[1] = re.sub(r"鉄筋径の\s*6\s*1", "鉄筋径の1/6",choices[1])
                if number == 12: choices[1] = re.sub(r"面が\s*20\s*1", "面が1/20",choices[1])
                if number == 13: choices[1] = re.sub(r"サイズの\s*2\s*1", "サイズの1/2",choices[1])
                if number == 15: choices[2] = re.sub(r"ともに\s*1,000\s*1", "ともに1/1,000",choices[2])
                if number == 21: choices[4] = re.sub(r"ので、\s*100\s*1", "ので、1/100",choices[4])
                if number == 23:
                    for j,term in enumerate(["距離測量","平板測量","トラバース測量","角測量","水準測量"],1):
                        choices[j] = choices[j].replace(term,term+" ― ",1)
                assert sorted(choices)==[1,2,3,4,5],number
                questions[number]=(page_number,fields[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_2025_i(path):
    questions = {}
    with pdfplumber.open(path) as pdf:
        for page_number in range(2,11):
            page = pdf.pages[page_number-1].filter(lambda o:o.get("object_type")!="char" or o["size"]>5.5 and o["top"]<790)
            text = unicodedata.normalize("NFKC",page.extract_text(use_text_flow=True))
            parts = re.split(r"〔No\.\s*(\d+)〕",text)
            for i in range(1,len(parts),2):
                n=int(parts[i]);fields=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(fields[j]):fields[j+1] for j in range(1,len(fields),2)}
                if n==15: choices[4]=re.sub(r"延べ面積の\s*3\s*1","延べ面積の1/3",choices[4])
                assert sorted(choices)==[1,2,3,4,5],n
                questions[n]=(page_number,fields[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_2025_ii(path):
    figures={13:(82,100,528,408),17:(130,350,480,578),18:(70,120,545,371),19:(120,120,485,301),20:(120,185,485,500)}
    questions={}
    with pdfplumber.open(path) as pdf:
        for pn in range(11,25):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get("object_type")!="char":return True
                if o["size"]<=5.5 or o["top"]>=790:return False
                return not(r and o["x0"]<r[2] and o["x1"]>r[0] and o["top"]<r[3] and o["bottom"]>r[1])
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize("NFKC",page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n==15:
                    table=page.extract_tables()[0]
                    assert len(table)==8 and len(table[0])==5,table
                    choices={}
                    for j,row in enumerate(table[3:],1):
                        cells=[normalize(c) for c in row]
                        # Merged header and vertically typeset fractions are flattened explicitly.
                        fraction=re.search(r"([568])",cells[1])[1]
                        region=re.sub(r"[()0-9]","",cells[1])
                        cells[1]=region+"（"+fraction+"/10）"
                        cells[4]=cells[4][0]+"/10"
                        choices[j]="／".join(cells)
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_2025_iii(path):
    figures={2:(225,137,543,405),3:(283,99,550,242),4:(70,120,440,550),5:(220,95,550,278),12:(142,98,440,317)}
    questions={}
    with pdfplumber.open(path) as pdf:
        for pn in range(2,14):
            page=pdf.pages[pn-1];rects=[figures[pn]] if pn in figures else []
            if pn==3:rects.append((70,378,548,527))
            def retain(o):
                if o.get("object_type")!="char":return True
                if o["size"]<=5.5 or o["top"]>=790:return False
                return not any(o["x0"]<r[2] and o["x1"]>r[0] and o["top"]<r[3] and o["bottom"]>r[1] for r in rects)
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize("NFKC",page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);fields=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(fields[j]):fields[j+1] for j in range(1,len(fields),2)}
                if n==1:
                    for k in choices:choices[k]=re.sub(r"10\s*4\s*mm\s*4","10⁴mm⁴",choices[k])
                if n in [3,4]:
                    tables=[x for x in page.extract_tables() if len(x)==6 and len(x[0])==2];assert len(tables)==1,tables
                    choices={}
                    for j,row in enumerate(tables[0][1:],1):
                        if n==3:choices[j]="M_Bの大きさ："+row[0]+"、Q_ABの大きさ："+row[1]
                        else:choices[j]="曲げモーメント図："+row[0]+"、せん断力の最大値："+re.sub(r"P\s*2","P/2",row[1])
                if n==5:
                    for k in choices:choices[k]=re.sub(r"3\s*kN","√3kN",choices[k])
                if n==10:
                    for k,term in enumerate(['雨押え','折置組','鼻母屋','木割り','側桁'],1):choices[k]=normalize(choices[k]).replace(term,term+' ― ',1)
                if n==16:choices[5]=normalize(choices[5]).replace("スパンの3001","スパンの1/300")
                if n==17:
                    choices[4]=normalize(choices[4]).replace('の倍である。','の1/√3倍である。');choices[5]=normalize(choices[5]).removesuffix("13")
                if n==19:choices[3]=re.sub(r"200\s*1","1/200",choices[3]);choices[3]=re.sub(r"100\s*1","1/100",choices[3])
                if n==21:
                    choices[1]=re.sub(r"10\s*1","1/10",choices[1]);choices[2]=re.sub(r"3\s*2","2/3",choices[2])
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,fields[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_2025_iv(path):
    figures={14:(120,140,480,334),22:(70,75,510,236)};questions={}
    with pdfplumber.open(path) as pdf:
        for pn in range(14,24):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get("object_type")!="char":return True
                if o["size"]<=5.5 or o["top"]>=790:return False
                return not(r and o["x0"]<r[2] and o["x1"]>r[0] and o["top"]<r[3] and o["bottom"]>r[1])
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize("NFKC",page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n==11:choices[3]=normalize(choices[3]).replace('から41付近','から1/4付近')
                if n==20:choices[2]=normalize(choices[2]).replace('から41の高さ','から1/4の高さ')
                if n==16:
                    for k,term in enumerate(['短ざく金物','折曲げ金物','ひねり金物','くら金物','ホールダウン金物(引寄せ金物)'],1):choices[k]=normalize(choices[k]).replace(term,term+' ― ',1)
                if n==23:
                    tables=[x for x in page.extract_tables() if len(x)==6 and len(x[0])==3];assert len(tables)==1,tables
                    choices={k:'／'.join(row) for k,row in enumerate(tables[0][1:],1)}
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2026_i(path):
    questions={}
    terms={1:['イタリア大使館別荘記念公園本邸(栃木県)','軽井沢の山荘(長野県)','旧岩崎家茅町本邸洋館(東京都)','八勝館御幸の間棟(愛知県)','聴竹居(京都府)'],2:['CO濃度','色温度','直達日射量','熱伝導率','ラウドネスレベル'],12:['劇場','事務所ビル','図書館','病院','学校'],19:['換気設備','電気設備','衛生設備','排水設備','ガス設備']}
    with pdfplumber.open(path) as pdf:
        for pn in range(2,10):
            page=pdf.pages[pn-1].filter(lambda o:o.get('object_type')!='char' or o['size']>5.5 and o['top']<790)
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize('NFKC',page.extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n in terms:
                    for k,term in enumerate(terms[n],1):choices[k]=normalize(choices[k]).replace(term,term+' ― ',1)
                if n==17:choices[5]=normalize(choices[5]).replace('勾配を101と','勾配を1/10と')
                assert sorted(choices)==[1,2,3,4,5],n
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2026_ii(path):
    figures={13:(110,480,500,775),17:(110,135,485,445),18:(110,135,470,445),19:(65,155,550,740)};questions={}
    with pdfplumber.open(path) as pdf:
        for pn in range(10,24):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get('object_type')!='char':return True
                if o['size']<=5.5 or o['top']>=790:return False
                return not(r and o['x0']<r[2] and o['x1']>r[0] and o['top']<r[3] and o['bottom']>r[1])
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize('NFKC',page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);source=parts[i+1].replace('面積を\n1.8','面積を1.8');f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",source);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n==1:choices[5]=normalize(choices[5]).replace('高さの21のもの','高さの1/2のもの')
                if n==2:
                    choices[2]=normalize(choices[2]).replace('面積の71の場合','面積の1/7の場合');choices[5]=normalize(choices[5]).replace('合計の2001を','合計の1/200を')
                if n==5:choices[5]=normalize(choices[5]).replace('幅の21だけ','幅の1/2だけ')
                if n==11:choices[4]=normalize(choices[4]).replace('床面積の201未満','床面積の1/20未満')
                if n==18:
                    table=page.crop((90,550,450,750)).extract_tables()[0];assert len(table)==6 and len(table[0])==2,table
                    choices={}
                    for j,row in enumerate(table[1:],1):
                        formula=normalize(row[0]);height=normalize(row[1])
                        if j==2:
                            assert formula.startswith('(1.2-1)'),formula
                            formula=formula.replace('(1.2-1)','',1).removesuffix('2')+'(1.2-1)/2'
                        if j==3:
                            assert formula.startswith('1.2'),formula
                            formula=formula.removeprefix('1.2').removesuffix('2')+'1.2/2'
                        choices[j]=formula+'／'+height
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2026_iii(path):
    figures={4:(120,110,495,415),5:(280,100,460,400),6:(70,95,500,570),7:(175,395,430,665),8:(145,135,500,500),9:(135,90,465,280)};questions={}
    with pdfplumber.open(path) as pdf:
        for pn in range(2,14):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get('object_type')!='char':return True
                if o['size']<=5.5 or o['top']>=790:return False
                return not(r and o['x0']<r[2] and o['x1']>r[0] and o['top']<r[3] and o['bottom']>r[1])
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize('NFKC',page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);source=parts[i+1].replace('倍率は\n2.5','倍率は2.5');f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",source);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n==3:
                    for k,term in enumerate(['鼻隠','格縁','方立','長押','敷目板'],1):choices[k]=normalize(choices[k]).replace(term,term+' ― ',1)
                if n==9:
                    table=page.crop((90,440,230,570)).extract_tables()[0];assert len(table)==6 and len(table[0])==2,table
                    choices={j:'2階用：'+row[0]+'、1階用：'+row[1] for j,row in enumerate(table[1:],1)}
                if n==12:f[0]=normalize(f[0]).replace('面材張り(部分)','面材張り(■部分)')
                if n==16:choices[1]=normalize(choices[1]).replace('長さの43以下','長さの3/4以下')
                if n==17:choices[2]=normalize(choices[2]).replace('床面積の41で','床面積の1/4で')
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2026_iv(path):
    figures={15:(130,365,470,650),18:(70,95,490,745),19:(175,95,440,260),20:(170,75,430,310),21:(100,135,510,675),22:(145,95,455,315),23:(70,95,365,640)};questions={}
    terms={8:['火打土台','小屋梁','大引','棟木','通し柱'],10:['蟻掛け','平ほぞ差し割くさび締め','傾ぎ大入れ小根ほぞ差し','ねじ組','渡りあご'],11:['ひら金物(SM-15S)','火打金物(HB)','かね折り金物(SA・S)','羽子板パイプ(SP・E)','引張金物(TB-D)'],13:['イ','ロ','ハ','ニ','ホ'],15:['イ','ロ','ハ','ニ','ホ'],16:['イ','ロ','ハ','ニ','ホ'],23:['木材の面取りや溝付け','合板の釘打ち','鉄筋の結束線締め','長さの測定','トラバース測量']}
    with pdfplumber.open(path) as pdf:
        for pn in range(14,27):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get('object_type')!='char':return True
                if o['size']<=5.5 or o['top']>=790:return False
                return not(r and o['x0']<r[2] and o['x1']>r[0] and o['top']<r[3] and o['bottom']>r[1])
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize('NFKC',page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);source=parts[i+1].replace('壁倍率\n3.7','壁倍率3.7');f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",source);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n in terms:
                    for j,term in enumerate(terms[n],1):choices[j]=normalize(choices[j]).replace(term,term+' ― ',1)
                if n==12:
                    region=page.filter(lambda o:o.get('object_type')!='char' or o['size']>5.5).crop((285,100,470,698))
                    table=region.extract_tables()[0];assert len(table)==6 and len(table[0])==1,table
                    choices={j:row[0] for j,row in enumerate(table[1:],1)}
                if n==17:
                    labels=page.crop((228,100,355,628)).extract_text().splitlines();assert normalize(labels[0])=='名称',labels
                    choices={j:v for j,v in enumerate(labels[1:],1)}
                if n==18:choices[1]=normalize(choices[1]).replace('面で501と','面で1/50と')
                if n==22:choices[5]=normalize(choices[5]).replace('勾配を501と','勾配を1/50と')
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2025_i(path):
    terms={2:['昼光率','透湿','立体角投射率','作用温度','VOC'],19:['排水通気設備','換気設備','ガス設備','冷暖房設備','電気設備']};questions={}
    with pdfplumber.open(path) as pdf:
        for pn in range(2,10):
            page=pdf.pages[pn-1]
            def retain(o):
                if o.get('object_type')!='char':return True
                if o['size']<=5.5 or o['top']>=790:return False
                return not(pn==6 and o['x0']<465 and o['x1']>70 and o['top']<560 and o['bottom']>95)
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize('NFKC',page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n in terms:
                    for j,term in enumerate(terms[n],1):choices[j]=normalize(choices[j]).replace(term,term+' ― ',1)
                if n==15:
                    region=page.filter(lambda o:o.get('object_type')!='char' or o['size']>5.5).crop((99,95,230,560));table=region.extract_tables()[0];assert len(table)==6,table
                    choices={j:row[0] for j,row in enumerate(table[1:],1)}
                if n==6:choices[5]=normalize(choices[5]).replace('と、21になる','と、1/2になる')
                if n==22:choices[4]=normalize(choices[4]).replace('勾配を、501と','勾配を、1/50と')
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2025_ii(path):
    figures={10:(70,375,550,795),13:(160,220,440,540),14:(70,75,510,490),17:(120,215,480,465),18:(260,420,550,760),19:(115,130,490,430),20:(70,150,500,625),23:(70,245,545,475)};questions={}
    with pdfplumber.open(path) as pdf:
        for pn in range(10,24):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get('object_type')!='char':return True
                if o['size']<=5.5 or o['top']>=800:return False
                return not(r and o['x0']<r[2] and o['x1']>r[0] and o['top']<r[3] and o['bottom']>r[1])
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize('NFKC',page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n in (2,8):
                    rect=(70,375,150,485) if n==2 else (70,75,150,190)
                    text=unicodedata.normalize('NFKC',page.crop(rect).extract_text());rows=re.findall(r'([1-5])\.\s*([0-9.]+)\s*m(2)?',text)
                    choices={int(k):v+' m'+('²' if sup else '') for k,v,sup in rows}
                if n==6:choices[1]=normalize(choices[1]).replace('床面積の201と','床面積の1/20と')
                if n==9:choices[3]=normalize(choices[3]).replace('所要断面積の31を','所要断面積の1/3を')
                if n==16:choices[5]=normalize(choices[5]).removesuffix('隣地')
                if n==18:
                    table=page.filter(lambda o:o.get('object_type')!='char' or o['size']>5.5).crop((95,490,335,625)).extract_tables()[0]
                    choices={j:'／'.join(v for v in row if v) for j,row in enumerate(table[1:],1)}
                if n==24:
                    table=page.crop((90,245,545,475)).extract_tables()[0];assert len(table)==6 and len(table[0])==2
                    choices={j:'／'.join(row) for j,row in enumerate(table[1:],1)}
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2025_iii(path):
    figures={4:(85,110,550,260),5:(250,120,470,610),6:(170,75,515,285),7:(160,85,380,355),8:(75,105,525,470),9:(135,90,465,265),11:(165,400,440,605)};questions={}
    terms={3:['登り淀','鏡板','挟み束','羽目板','地貫'],19:['1階床荷重(束立て床)','1階天井荷重','2階床荷重(枠組壁工法)','屋根荷重(和小屋寄棟)','屋根荷重(洋小屋)']}
    with pdfplumber.open(path) as pdf:
        for pn in range(2,14):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get('object_type')!='char':return True
                if o['size']<=5.5 or o['top']>=790:return False
                return not(r and o['x0']<r[2] and o['x1']>r[0] and o['top']<r[3] and o['bottom']>r[1])
            parts=re.split(r"〔No\.\s*(\d+)〕",unicodedata.normalize('NFKC',page.filter(retain).extract_text(use_text_flow=True)))
            for i in range(1,len(parts),2):
                n=int(parts[i]);f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n==12:
                    rows=re.findall(r'([1-5])\.\s*([A-E])',unicodedata.normalize('NFKC',page.crop((70,100,120,240)).extract_text()));choices={int(k):v for k,v in rows}
                if n in terms:
                    for k,term in enumerate(terms[n],1):choices[k]=normalize(choices[k]).replace(term,term+' ― ',1)
                if n==4:choices[3]=normalize(choices[3]).replace('直径の1001以上','直径の1/100以上')
                if n==8:f[0]=normalize(f[0]).replace('「b:101l、h:梁せいの41」','「b:1/10l、h:梁せいの1/4」')
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def source_questions_m2025_iv(path):
    figures={18:(130,280,410,505),19:(95,130,525,645),20:(75,90,530,380),21:(70,95,370,640)};questions={}
    terms={1:['道路占用許可申請','完了検査申請','建築物除却届','建築工事届','クレーン設置届'],3:['捨てコンクリート地業','砕石地業','スクリューウエイト貫入試験','目つぶし砂利','割栗地業'],6:['杢目材','二方柾材','四方柾材','絞り丸太','四方竹'],7:['屋根','内壁','2階床組','竿縁天井','1階床組'],8:['土台','筋かい','根太','母屋','垂木'],10:['胴差','小屋梁','土台','垂木','広小舞'],11:['小屋梁と軒桁','土台同士の隅角部','小屋束と棟木','間仕切桁と胴差のT字部','折置組の柱と小屋梁'],15:list('イロハニホ'),16:list('イロハニホ'),23:['スコヤ','のみ','きり','のこぎり','かんな']}
    with pdfplumber.open(path) as pdf:
        for pn in range(14,25):
            page=pdf.pages[pn-1];r=figures.get(pn)
            def retain(o):
                if o.get('object_type')!='char':return True
                if o['size']<=5.5 or o['top']>=790:return False
                return not(r and o['x0']<r[2] and o['x1']>r[0] and o['top']<r[3] and o['bottom']>r[1])
            text=unicodedata.normalize('NFKC',page.filter(retain).extract_text(use_text_flow=True)).replace('壁倍率\n3.7','壁倍率3.7');parts=re.split(r"〔No\.\s*(\d+)〕",text)
            for i in range(1,len(parts),2):
                n=int(parts[i]);f=re.split(r"(?m)^\s*([1-5])\s*\.\s*",parts[i+1]);choices={int(f[j]):f[j+1] for j in range(1,len(f),2)}
                if n in terms:
                    for k,term in enumerate(terms[n],1):choices[k]=normalize(choices[k]).replace(term,term+' ― ',1)
                if n==13:choices[1]=normalize(choices[1]).replace('表目を3倍','表目を√3倍')
                if n==17:
                    labels=page.crop((228,100,360,635)).extract_text().splitlines();assert normalize(labels[0])=='名称',labels
                    choices={j:v for j,v in enumerate(labels[1:],1)}
                if n==18:choices[4]=normalize(choices[4]).replace('勾配を、2001と','勾配を、1/200と')
                if n==21:choices[5]=normalize(choices[5]).replace('は、10mmと','は、±10mmと')
                assert sorted(choices)==[1,2,3,4,5],(n,choices)
                questions[n]=(pn,f[0],choices)
    assert sorted(questions)==list(range(1,26))
    return questions


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("owner_directory", type=Path)
    args = parser.parse_args()
    manifest = json.loads((STAGING / "source-manifest.json").read_text(encoding="utf-8"))
    counts = {"ownerPdfs": 0, "officialAnswers": 0, "questionBodies": 0, "choices": 0}
    for round_ in manifest["rounds"]:
        for doc in [*round_["questionDocuments"], round_["answerDocument"]]:
            file = args.owner_directory / doc["url"].rsplit("/", 1)[1]
            assert hashlib.sha256(file.read_bytes()).hexdigest() == doc["sha256"], file.name
            with pdfplumber.open(file) as pdf:
                assert len(pdf.pages) == doc["pages"], file.name
                if doc is round_["answerDocument"]:
                    text = unicodedata.normalize("NFKC", pdf.pages[0].extract_text())
                    for subject in ["I", "II", "III", "IV"]:
                        match = re.search(r"学科\s*" + subject + r"\s+((?:[1-5]\s*){25})(?![1-5])", text)
                        assert match, (file.name, subject)
                        row = list(map(int, re.findall(r"[1-5]", match[1])))
                        assert row == round_["officialAnswers"][subject], (file.name, subject)
                        counts["officialAnswers"] += len(row)
            counts["ownerPdfs"] += 1
    for year, subject, extract, source in [(2026,"I",source_questions,"R8_2k_1_2.pdf"),(2026,"II",source_questions_ii,"R8_2k_1_2.pdf"),(2026,"III",source_questions_iii,"R8_2k_3_4.pdf"),(2026,"IV",source_questions_iv,"R8_2k_3_4.pdf"),(2025,"I",source_questions_2025_i,"2k-2025-1st-gakka1_2.pdf"),(2025,"II",source_questions_2025_ii,"2k-2025-1st-gakka1_2.pdf"),(2025,"III",source_questions_2025_iii,"2k-2025-1st-gakka3_4.pdf"),(2025,"IV",source_questions_2025_iv,"2k-2025-1st-gakka3_4.pdf"),(2026,"mokuzo-I",source_questions_m2026_i,"R8_mk_1_2.pdf"),(2026,"mokuzo-II",source_questions_m2026_ii,"R8_mk_1_2.pdf"),(2026,"mokuzo-III",source_questions_m2026_iii,"R8_mk_3_4.pdf"),(2026,"mokuzo-IV",source_questions_m2026_iv,"R8_mk_3_4.pdf"),(2025,"mokuzo-I",source_questions_m2025_i,"mk-2025-1st-gakka1_2.pdf"),(2025,"mokuzo-II",source_questions_m2025_ii,"mk-2025-1st-gakka1_2.pdf"),(2025,"mokuzo-III",source_questions_m2025_iii,"mk-2025-1st-gakka3_4.pdf"),(2025,"mokuzo-IV",source_questions_m2025_iv,"mk-2025-1st-gakka3_4.pdf")]:
        originals = extract(args.owner_directory / source)
        filename = f"mokuzo-{year}-{subject[7:]}.ts" if subject.startswith("mokuzo-") else f"{year}-{subject}.ts"
        data = (STAGING / filename).read_text(encoding="utf-8")
        staged = json.loads(data.split("= ", 1)[1].rsplit(";", 1)[0])
        assert len(staged) == 25
        for question in staged:
            number = question["qNumber"]
            page, body, choices = originals[number]
            assert page == question["sourcePage"], (subject, number)
            assert normalize(body) == normalize(question["question"]), (subject, number, "body", body)
            counts["questionBodies"] += 1
            for index, key in enumerate("アイウエオ", 1):
                assert normalize(choices[index]) == normalize(question["choices"][key].replace("−", "-")), (subject, number, key, choices[index], question["choices"][key])
                counts["choices"] += 1
    print(json.dumps({"status": "PASS", "counts": counts, "normalization": "NFKC; whitespace/control removal; wave dash variants normalized to ～; ruby stored separately; source diagrams retained as PNG and labels excluded from prose; printed fractions, radicals, superscripts, ■ and ± restored by visual source comparison; choice tables independently parsed with PDFMiner/pdfplumber; paper-specific normalization documented in staging README and extraction functions"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
