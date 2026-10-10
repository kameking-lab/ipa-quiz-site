import sys, pypdfium2 as p
S=sys.argv[1]; K=2.5/1.6
JOBS=[("tp260424-05a_01.pdf",10,"2025/q13-figure.png",(250,150,725,530)),
 ("tp260424-05a_01.pdf",11,"2025/q16-choice1.png",(122,490,462,630)),
 ("tp260424-05a_01.pdf",11,"2025/q16-choice2.png",(497,490,837,630)),
 ("tp260424-05a_01.pdf",11,"2025/q16-choice3.png",(122,680,462,820)),
 ("tp260424-05a_01.pdf",11,"2025/q16-choice4.png",(497,680,837,820)),
 ("tp260424-05a_01.pdf",13,"2025/q22-choice1.png",(165,232,375,400)),
 ("tp260424-05a_01.pdf",13,"2025/q22-choice2.png",(465,232,645,402)),
 ("tp260424-05a_01.pdf",13,"2025/q22-choice3.png",(175,460,375,745)),
 ("tp260424-05a_01.pdf",13,"2025/q22-choice4.png",(455,460,665,710)),
 ("tp250428-05a_02.pdf",4,"2024/q13-ecg1.png",(140,110,770,365)),
 ("tp250428-05a_02.pdf",4,"2024/q13-ecg2.png",(140,440,770,705)),
 ("tp250428-05a_02.pdf",5,"2024/q13-ecg3.png",(140,110,770,365)),
 ("tp250428-05a_02.pdf",5,"2024/q13-ecg4.png",(140,435,770,750))]
import os
cache={}
for pdf,page,out,box in JOBS:
    k=(pdf,page)
    if k not in cache: cache[k]=p.PdfDocument(f"{S}/src/{pdf}")[page-1].render(scale=2.5).to_pil().convert("RGB")
    im=cache[k].crop(tuple(int(v*K) for v in box))
    os.makedirs(os.path.dirname(f"{S}/r3/fig/{out}"),exist_ok=True)
    im.save(f"{S}/r3/fig/{out}",optimize=True); print(out, im.size)
