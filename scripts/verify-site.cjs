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
const curriculumSource = fs.readFileSync('lib/linear-algebra.ts', 'utf8');
const curriculum = JSON.parse(curriculumSource.split('export const LINEAR_ALGEBRA_LESSONS = ')[1].trim().replace(/;$/, ''));
assert.equal(curriculum.length, 32, 'Expected complete core and entrance-exam curriculum');
const routes = ['/', '/linear-algebra/', '/calculus/', '/complex/', '/pdf/', ...articles.map(a => '/' + a.subject + '/' + a.slug + '/')];
const site = 'https://university-math-crj.pages.dev';
const linearAlgebra = articles.filter(a => a.subject === 'linear-algebra').sort((a, b) => a.order - b.order);
assert.deepEqual(linearAlgebra.map(a => a.slug), curriculum.map(a => a.slug), 'Curriculum and article order differ');
assert.equal(new Set(curriculum.map(a => a.slug)).size, curriculum.length, 'Duplicate chapter slug');
for (const [i, lesson] of curriculum.entries()) {
  assert.equal(lesson.title, linearAlgebra[i].title, 'Curriculum title differs');
  for (const prerequisite of lesson.prerequisites) assert.ok(curriculum.slice(0, i).some(a => a.slug === prerequisite), lesson.slug + ': prerequisite must precede chapter');
}
let links = 0, images = 0, pdfs = 0;
for (const route of routes) {
  const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
  assert.match(html, /<h1[\s>]/, route + ': missing title');
  assert.ok(html.includes('<link rel="canonical" href="' + site + route + '"'), route + ': incorrect canonical');
  assert.ok(html.includes('<meta property="og:url" content="' + site + route + '"'), route + ': incorrect Open Graph URL');
  assert.doesNotMatch(html, /class="katex-error"/, route + ': invalid math');
  if (route.startsWith('/linear-algebra/') && route !== '/linear-algebra/') {
    assert.match(html, /aria-label="章の移動"/, route + ': missing chapter navigation');
    assert.match(html, /<details class="answer"/, route + ': missing self-check answer');
    const index = linearAlgebra.findIndex(a => route === '/linear-algebra/' + a.slug + '/');
    const navigation = html.match(/<nav aria-label="章の移動"[^>]*>(.*?)<\/nav>/s)?.[1];
    assert.ok(navigation, route + ': missing chapter navigation');
    const targets = [...navigation.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(m => m[1]);
    const expected = [linearAlgebra[index - 1], linearAlgebra[index + 1]].filter(Boolean).map(a => '/linear-algebra/' + a.slug + '/');
    assert.deepEqual(targets, expected, route + ': incorrect previous/next chapter');
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
    const latex = fs.readFileSync(path.join('latex/src', path.basename(target).replace(/\.pdf$/, '.tex')), 'utf8');
    assert.equal([...latex.matchAll(/\\problem\b/g)].length, article.pdf.count, target + ': frontmatter problem count differs from source');
    const bytes = fs.readFileSync(path.join(root, target));
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', target + ': invalid PDF');
    assert.deepEqual(bytes, fs.readFileSync(path.join(process.cwd(), 'public', target)), target + ': export differs from generated PDF');
    pdfs++;
  }
}
const landing = fs.readFileSync(path.join(root, 'linear-algebra/index.html'), 'utf8');
assert.doesNotMatch(landing, /準備中|これからの学習順|基礎から順に記事を追加/);
for (const article of linearAlgebra) {
  assert.ok(landing.includes('href="/linear-algebra/' + article.slug + '/"'), 'Missing landing article ' + article.slug);
  for (const target of [article.pdf.problems, article.pdf.solutions]) assert.ok(landing.includes('href="' + target + '"'), 'Missing landing PDF ' + target);
}
const landingPdfs = [...landing.matchAll(/<a\b[^>]*\bhref="(\/pdf\/la-[^"]+\.pdf)"/g)].map(m => m[1]);
assert.equal(landingPdfs.length, linearAlgebra.length * 2, 'Incorrect PDF link count on landing');
const vectors = fs.readFileSync(path.join(root, 'linear-algebra/vectors/index.html'), 'utf8');
assert.doesNotMatch(vectors, /扱う予定/);
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(locations.sort(), routes.map(route => site + route).sort(), 'Incorrect sitemap URLs');
assert.ok(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes(site + '/sitemap.xml'), 'Incorrect robots sitemap URL');
for (const article of articles) assert.ok(sitemap.includes('/' + article.subject + '/' + article.slug + '/'), 'Missing sitemap article ' + article.slug);
console.log('PASS: ' + routes.length + ' exported pages, ' + links + ' internal links, ' + images + ' article figures, ' + pdfs + ' PDFs, correct chapter order, canonical/Open Graph and sitemap URLs');
