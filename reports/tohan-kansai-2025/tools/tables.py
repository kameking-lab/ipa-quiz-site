"""成分表（「成分 分量」の見出し行に続く行）を Markdown のパイプ表に変換する。
QuestionBody はパイプ表を <table> として描画し、content-quality は表を持つ問題を描画可能と判定する。"""
import json, re, sys

ROW = re.compile(r'^(.+?) ([０-９（].*)$')

def to_table(question: str) -> str:
    lines = question.split('\n')
    out, i = [], 0
    while i < len(lines):
        if lines[i].strip() == '成分 分量':
            rows = []
            j = i + 1
            while j < len(lines) and lines[j].strip() and not re.match(r'^[ａ-ｅ] ', lines[j]) and ROW.match(lines[j].strip()):
                m = ROW.match(lines[j].strip())
                rows.append((m.group(1).strip(), re.sub(r'\s+', '', m.group(2))))
                j += 1
            if not rows:
                raise SystemExit(f'no rows after 成分 分量: {question[:40]}')
            out += ['| 成分 | 分量 |', '| --- | --- |'] + [f'| {a} | {b} |' for a, b in rows]
            if j < len(lines) and lines[j].strip():
                out.append('')
            i = j
            continue
        out.append(lines[i])
        i += 1
    return '\n'.join(out)

if __name__ == '__main__':
    path = sys.argv[1]
    data = json.load(open(path, encoding='utf-8'))
    changed = []
    for q in data['questions']:
        new = to_table(q['question'])
        if new != q['question']:
            q['question'] = new
            changed.append(q['number'])
    json.dump(data, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print('converted', changed)
