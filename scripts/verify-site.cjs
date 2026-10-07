// Verify the exported site after npm run build. Run: node scripts/verify-site.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const matter = require('gray-matter');
const root = path.join(process.cwd(), 'out');
const subjects = ['linear-algebra', 'calculus', 'complex'];
const articles = subjects.flatMap(subject => fs.readdirSync('content/' + subject)
  .filter(file => file.endsWith('.mdx'))
  .map(file => ({ subject, slug: file.slice(0, -4), ...matter(fs.readFileSync('content/' + subject + '/' + file, 'utf8')).data })));
assert.equal(articles.filter(a => a.subject === 'linear-algebra').length, 16);
const routes = ['/', '/linear-algebra/', '/calculus/', '/complex/', '/pdf/', ...articles.map(a => '/' + a.subject + '/' + a.slug + '/')];
let links = 0, images = 0, pdfs = 0;
for (const route of routes) {
  const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
  assert.match(html, /<h1[\s>]/, route + ': missing title');
  assert.doesNotMatch(html, /class="katex-error"/, route + ': invalid math');
  if (route.startsWith('/linear-algebra/') && route !== '/linear-algebra/') {
    assert.match(html, /aria-label="章の移動"/, route + ': missing chapter navigation');
    assert.match(html, /<details class="answer"/, route + ': missing self-check answer');
  }
  for (const match of html.matchAll(/<(a|img)\b[^>]*?\b(?:href|src)="(\/[^"?]*)"/g)) {
    const target = match[2].split('#')[0];
    const file = path.join(root, target.endsWith('/') ? target + 'index.html' : target);
    assert.ok(fs.existsSync(file), route + ': missing linked resource ' + target);
    match[1] === 'img' ? images++ : links++;
  }
}
for (const article of articles) {
  for (const target of [article.pdf.problems, article.pdf.solutions]) {
    const bytes = fs.readFileSync(path.join(root, target));
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', target + ': invalid PDF');
    pdfs++;
  }
}
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const article of articles) assert.ok(sitemap.includes('/' + article.subject + '/' + article.slug + '/'), 'Missing sitemap article ' + article.slug);
console.log('PASS: ' + routes.length + ' exported pages, ' + links + ' internal links, ' + images + ' article figures, ' + pdfs + ' PDFs, all article sitemap entries');
