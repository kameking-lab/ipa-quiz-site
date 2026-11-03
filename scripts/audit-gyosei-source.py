"""Read-only source audit. Requires pdfplumber, requests, bs4 and pdftotext/poppler-data.
Downloads official documents only into TemporaryDirectory; no API keys required.
Run: python scripts/audit-gyosei-source.py
"""
import hashlib
import json
import re
import subprocess
import tempfile
from pathlib import Path

import pdfplumber
import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = json.loads((ROOT / 'reports/gyosei-latest2-evidence.json').read_text())


def clean(text):
    text = text.replace('(cid:7722)', '遡').replace('\x07', '')
    text = re.sub(r'(?m)^.*8029_.*$', '', text)
    text = re.split('［問題4[14]', text)[0]
    text = re.split('（下書用）', text)[0]
    text = re.split(r'基\s*礎\s*知\s*識', text)[0]
    return re.sub(r'(?m)^\s*\d+\s*$', '', text).strip()


def norm(text):
    return re.sub(r'\s', '', text).removesuffix('()')


def split_questions(text):
    parts = re.split(r'(?m)^\s*問題\s*(\d+)\s*', text)
    return {int(parts[i]): clean(parts[i+1]) for i in range(1, len(parts), 2)}


with tempfile.TemporaryDirectory(prefix='gyosei-audit-') as directory:
    for year in [2024, 2025]:
        r = year - 2018
        pdf = Path(directory) / f'{year}.pdf'
        response = requests.get(f'https://gyosei-shiken.or.jp/pdf/r{r}_mondai.pdf', timeout=60)
        response.raise_for_status()
        pdf.write_bytes(response.content)
        assert hashlib.sha256(response.content).hexdigest() == EVIDENCE['pdfSha256'][str(year)]
        with pdfplumber.open(pdf) as doc:
            pages = [p.crop((0, 0, p.width, p.height-35)).extract_text() or '' for p in doc.pages[1:]]
        first = split_questions('\n'.join(pages))
        second_text = subprocess.run(['pdftotext', '-layout', str(pdf), '-'], check=True, capture_output=True).stdout.decode()
        second = split_questions('\n'.join(second_text.split('\f')[1:]))
        data_text = (ROOT / f'data/questions/gyosei/{year}.ts').read_text()
        questions = json.loads(data_text.split(' = ', 1)[1].rstrip().removesuffix(';'))
        response = requests.get(f'https://gyosei-shiken.or.jp/doc/exam/r{r}ans.html', timeout=60)
        response.raise_for_status()
        response.encoding = 'utf-8' if year == 2025 else response.apparent_encoding
        answer_soup = BeautifulSoup(response.text, 'html.parser')
        answer_text = norm(answer_soup.get_text())
        answers = {}
        for row in answer_soup.select('tr'):
            cells = [re.sub(r'\s+', '', c.get_text()) for c in row.find_all(['td', 'th'], recursive=False)]
            for i, cell in enumerate(cells):
                match = re.fullmatch(r'問題([０-９0-9]+)', cell)
                if match and i+1 < len(cells):
                    n = int(match[1])
                    if 41 <= n <= 43:
                        answers[n] = [int(cells[i+j]) for j in [2, 4, 6, 8]]
                    elif n not in [44, 45, 46]:
                        answers[n] = cells[i+1]
        assert [q['qNumber'] for q in questions] == list(range(2, 58))
        for q in questions:
            n = q['qNumber']
            assert norm(first[n]) == norm(second[n]), (year, n, 'independent extraction mismatch')
            if q['type'] == 'multiple-choice':
                parts = re.split(r'(?m)^([1-5])\s+', first[n])
                tail = re.search(r'\n（(?:注|参考条文|参照条文)）', parts[-1])
                if tail:
                    parts[0] += '\n\n' + parts[-1][tail.start():]
                    parts[-1] = parts[-1][:tail.start()]
                assert norm(q['question']) == norm(parts[0]), (year,n,'stem')
                assert [norm(v) for v in q['choices'].values()] == [norm(parts[i]) for i in range(2,11,2)], (year,n,'choices')
                expected = answers[n]
                expected = expected if expected == '全員正解' else str(int(expected))
                assert q['officialAnswerNumber'] == expected, (year,n,'official answer')
            elif q['type'] == 'native-b':
                start = first[n].rfind('\n1 ')
                assert norm(q['question']) == norm(first[n][:start]), (year,n,'cloze stem')
                assert [int(s['answer']) for s in q['nativeB']['slots']] == answers[n]
                bank = first[n][start:]
                if year == 2024 and n == 43:
                    # The printed two-column cells wrap onto the following row.
                    bank = bank.replace(
                        '17 機関相互間における権限の存否又は 18 当事者間の法律関係を確認し又は形\nその行使 成する処分又は裁決に関する訴訟',
                        '17 機関相互間における権限の存否又はその行使 18 当事者間の法律関係を確認し又は形成する処分又は裁決に関する訴訟')
                    bank = bank.replace(
                        '19 自己の法律上の利益にかかわる資格 20 国又は公共団体の機関の法規に適合\nで提起する訴訟 しない行為の是正を求める訴訟',
                        '19 自己の法律上の利益にかかわる資格で提起する訴訟 20 国又は公共団体の機関の法規に適合しない行為の是正を求める訴訟')
                parts = re.split(r'(?<!\d)([1-9]|1[0-9]|20)\s+', bank)
                assert [int(parts[i]) for i in range(1, len(parts), 2)] == list(range(1, 21))
                assert [norm(c['label']) for c in q['nativeB']['candidates']] == [norm(parts[i]) for i in range(2, len(parts), 2)], (year,n,'word bank')
            else:
                assert norm(q['question']) == norm(first[n]), (year,n,'descriptive stem')
                for example in q['modelAnswer'].split('\n\n'):
                    assert norm(example) in answer_text, (year,n,'official descriptive example')
        print(f'{year}: 56 source transcriptions agree between PDF engines; 50 choice sets and 3 cloze keys match official sources.')
