import assert from 'node:assert/strict';
import { allPages } from '../lib/seo-pages';
import { canonicalUrl, site } from '../lib/site';

const preview = process.env.SEO_CHECK_URL || 'http://localhost:3011';
const requestHeaders = { 'User-Agent': 'facebookexternalhit/1.1', Accept: 'text/html' };
const decode = (value: string) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");

for (const page of allPages) {
  const response = await fetch(new URL(page.path, preview), { headers: requestHeaders });
  assert.equal(response.status, 200, page.path);
  const html = await response.text();
  assert.equal(decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ''), `${page.title} | ${site.name}`, `${page.path}: title`);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
  assert.equal(canonical?.[1] && new URL(canonical[1]).href, new URL(canonicalUrl(page.path)).href, `${page.path}: canonical`);
  const description = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/);
  assert.equal(decode(description?.[1] || ''), page.description, `${page.path}: description`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${page.path}: one main heading`);
  assert.equal((html.match(/<main[\s>]/g) || []).length, 1, `${page.path}: one main landmark`);
  const socialUrl = html.match(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/);
  assert.equal(socialUrl?.[1] && new URL(socialUrl[1]).href, new URL(canonicalUrl(page.path)).href, `${page.path}: Open Graph URL`);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${page.path}: Twitter card`);
  const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  assert.ok(graphs.some(graph => graph['@graph']?.some((node: { '@type': string }) => node['@type'] === 'Hospital')), `${page.path}: hospital schema`);
  assert.ok(graphs.some(graph => graph['@graph']?.some((node: { '@type': string }) => ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'MedicalWebPage'].includes(node['@type']))), `${page.path}: page schema`);
  console.log(`PASS ${page.path}`);
}

const sitemap = await fetch(new URL('/sitemap.xml', preview));
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
assert.equal((xml.match(/<loc>/g) || []).length, allPages.length);
for (const page of allPages) assert.ok(xml.includes(`<loc>${canonicalUrl(page.path)}</loc>`));
const robots = await fetch(new URL('/robots.txt', preview));
assert.equal(robots.status, 200);
assert.ok((await robots.text()).includes(`${new URL(canonicalUrl('/')).origin}/sitemap.xml`));
const card = await fetch(new URL('/opengraph-image', preview));
assert.equal(card.status, 200);
assert.ok(card.headers.get('content-type')?.includes('image/png'));
const bytes = new DataView(await card.arrayBuffer());
assert.equal(bytes.getUint32(0), 0x89504e47);
assert.equal(bytes.getUint32(16), 1200);
assert.equal(bytes.getUint32(20), 630);
for (const [path, dimension] of [['/icon', 192], ['/apple-icon', 180]] as const) {
  const icon = await fetch(new URL(path, preview));
  assert.equal(icon.status, 200, path);
  const iconBytes = new DataView(await icon.arrayBuffer());
  assert.equal(iconBytes.getUint32(0), 0x89504e47, path);
  assert.equal(iconBytes.getUint32(16), dimension, path);
  assert.equal(iconBytes.getUint32(20), dimension, path);
}
const variant = await fetch(new URL('/appointment?department=cardiology&doctor=Dr.+B+Susruth+Kumar', preview), { headers: requestHeaders });
assert.ok((await variant.text()).includes(`rel="canonical" href="${canonicalUrl('/appointment')}"`));
const api = await fetch(new URL('/api/appointments', preview));
assert.ok(api.headers.get('x-robots-tag')?.includes('noindex'));
const missing = await fetch(new URL('/not-an-existing-hospital-page', preview), { headers: requestHeaders });
assert.equal(missing.status, 404);
assert.ok((await missing.text()).includes('noindex'));
console.log('PASS sitemap, robots, 1200×630 social image, booking canonical, API noindex and 404 handling.');
