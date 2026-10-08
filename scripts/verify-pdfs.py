"""Check regenerated PDFs with PyMuPDF. Run from repository root.
Optional argument: path to write a JSON verification report.
"""
from pathlib import Path
import json,re,sys
import fitz

reports=[]
errors=[]
for path in sorted(Path('public/pdf').glob('*.pdf')):
    doc=fitz.open(path)
    source=Path('latex/src')/(path.stem+'.tex')
    expected=len(re.findall(r'\\problem\b',source.read_text()))
    text=''.join(re.sub(r'\s+','',page.get_text()) for page in doc)
    for n in range(1,expected+1):
        if f'問題{n}' not in text:errors.append(f'{path}: missing problem {n}')
    if '\ufffd' in text:errors.append(f'{path}: replacement glyph')
    for page in doc:
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines',[]):
                for span in line['spans']:
                    r=fitz.Rect(span['bbox'])
                    if r.x0 < -1 or r.x1 > page.rect.width+1 or r.y0 < -1 or r.y1 > page.rect.height+1:
                        errors.append(f'{path}, page {page.number+1}: clipped text {span["text"]}')
    links=[link['uri'] for page in doc for link in page.get_links() if 'uri' in link]
    if not any('https://university-math-crj.pages.dev/' in url for url in links):errors.append(f'{path}: missing site hyperlink')
    if expected==6 and len(doc)!=3:errors.append(f'{path}: expected intentional three-page layout, got {len(doc)}')
    reports.append(dict(pdf=path.name,pages=len(doc),problems=expected,bytes=path.stat().st_size,links=links))
report=dict(pdfs=reports,errors=errors)
if len(sys.argv)>1:Path(sys.argv[1]).write_text(json.dumps(report,ensure_ascii=False,indent=2))
assert not errors,errors
print(f'PASS: {len(reports)} PDFs, {sum(x["pages"] for x in reports)} pages; problem numbering, text bounds and site hyperlinks')
