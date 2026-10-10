# Crop figure assets from the official question PDFs (render scale 2.5; boxes given in 1.6-scale page coords).
import sys, os, pypdfium2 as p
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import content_q26_50 as c
S, OUT = sys.argv[1], sys.argv[2]; K = 2.5 / 1.6; cache = {}
for x in c.Q:
    f = x.get("figure")
    if not f: continue
    pdf = "tp260424-05a_01.pdf" if x["round"] == 115 else "tp250428-05a_01.pdf"; year = 2025 if x["round"] == 115 else 2024
    if (pdf, f["pdfPage"]) not in cache: cache[(pdf, f["pdfPage"])] = p.PdfDocument(f"{S}/src/{pdf}")[f["pdfPage"] - 1].render(scale=2.5).to_pil().convert("RGB")
    page = cache[(pdf, f["pdfPage"])]
    jobs = [(f["file"], f["box"])] if f["kind"] == "stem" else list(zip(f["files"], f["boxes"]))
    for name, box in jobs:
        d = f"{OUT}/{year}"; os.makedirs(d, exist_ok=True)
        im = page.crop(tuple(int(v * K) for v in box)); im.save(f"{d}/{name}", optimize=True); print(year, name, im.size)
