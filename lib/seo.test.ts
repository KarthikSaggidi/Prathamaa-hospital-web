import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { getSiteOrigin, allowIndexing, canonicalUrl, site } from './site';
import { allPages, departmentSeo, pages } from './seo-pages';
import { pageMetadata, departmentMetadata } from './seo';
import { departmentDetails, type DepartmentSlug } from './department-config';
import { departmentStructuredData, hospitalStructuredData, serializeJsonLd } from './structured-data';
import sitemap from '../app/sitemap';
import robots from '../app/robots';

describe('search discovery and metadata', () => {
  it('normalizes a public origin and rejects credentials, non-HTTP URLs and URL suffixes', () => {
    assert.equal(getSiteOrigin(' https://prathamaahospital.in/ '), 'https://prathamaahospital.in');
    for (const url of ['javascript:alert(1)', 'https://user:password@example.com', 'https://example.com/path', 'https://example.com?preview=1', 'https://example.com/#section']) assert.throws(() => getSiteOrigin(url));
  });

  it('keeps staging and Vercel previews out of the index', () => {
    assert.equal(allowIndexing({}), true);
    assert.equal(allowIndexing({ VERCEL_ENV: 'production' }), true);
    assert.equal(allowIndexing({ SITE_INDEXABLE: 'false' }), false);
    assert.equal(allowIndexing({ SITE_INDEXABLE: 'true', VERCEL_ENV: 'preview' }), false);
    assert.equal(allowIndexing({ VERCEL_ENV: 'development' }), false);
  });

  it('canonicalizes appointment variants without retaining doctor or department queries', () => {
    assert.equal(canonicalUrl('/appointment?doctor=Dr.+Shivani&department=pediatrics#form'), `${site.origin}/appointment`);
    assert.equal(canonicalUrl('/departments/cardiology/'), `${site.origin}/departments/cardiology`);
    assert.throws(() => canonicalUrl('//another-site.example/'));
  });

  it('gives every public page a unique title, description and matching canonical/social URL', () => {
    assert.equal(allPages.length, 23);
    assert.equal(new Set(allPages.map(page => page.path)).size, allPages.length);
    assert.equal(new Set(allPages.map(page => page.description)).size, allPages.length);
    assert.equal(new Set(allPages.map(page => page.title)).size, allPages.length);
    for (const page of allPages) {
      const metadata = pageMetadata(page);
      assert.deepEqual(metadata.title, { absolute: `${page.title} | ${site.name}` });
      assert.equal(metadata.description, page.description);
      assert.ok(page.description.length >= 90 && page.description.length <= 180, `${page.path}: description length`);
      assert.equal(metadata.alternates?.canonical, canonicalUrl(page.path));
      assert.equal(metadata.openGraph?.url, canonicalUrl(page.path));
      assert.ok(existsSync(`app${page.path === '/' ? '' : page.path}/page.tsx`), page.path);
    }
  });

  it('covers every available department with its own localized metadata', () => {
    assert.deepEqual(Object.keys(departmentSeo).sort(), Object.keys(departmentDetails).sort());
    for (const slug of Object.keys(departmentSeo) as DepartmentSlug[]) {
      assert.equal(departmentMetadata(slug).alternates?.canonical, `${site.origin}/departments/${slug}`);
    }
  });

  it('lists only canonical public pages in the sitemap', () => {
    const entries = sitemap();
    assert.deepEqual(entries.map(entry => entry.url), site.indexable ? allPages.map(page => canonicalUrl(page.path)) : []);
    assert.ok(entries.every(entry => !entry.url.includes('/api/') && !entry.url.includes('?') && !entry.url.includes('#')));
    const rules = robots();
    assert.equal(rules.sitemap, site.indexable ? `${site.origin}/sitemap.xml` : undefined);
    assert.deepEqual(rules.rules, site.indexable ? { userAgent: '*', allow: '/', disallow: '/api/' } : { userAgent: '*', disallow: '/' });
  });

  it('describes the published hospital contact details without fabricated ratings or reviews', () => {
    const data = hospitalStructuredData();
    assert.equal(data['@graph'][0].name, site.name);
    assert.equal(data['@graph'][0].telephone, site.phone);
    assert.equal(data['@graph'][0].address?.addressLocality, 'Hyderabad');
    assert.ok(!JSON.stringify(data).includes('aggregateRating'));
    assert.ok(!JSON.stringify(data).includes('sameAs'));
  });

  it('links department breadcrumbs to the actual parent directory and current page', () => {
    const graph = departmentStructuredData('cardiology')['@graph'];
    assert.equal(graph[0]['@type'], 'MedicalWebPage');
    const breadcrumb = graph.find(item => item['@type'] === 'BreadcrumbList');
    assert.deepEqual(breadcrumb && 'itemListElement' in breadcrumb ? breadcrumb.itemListElement?.map(item => item.item) : [], [canonicalUrl(pages.home.path), canonicalUrl(pages.departments.path), canonicalUrl('/departments/cardiology')]);
  });

  it('escapes script-closing characters while preserving valid JSON-LD', () => {
    const data = { '@type': 'WebPage', name: '</script><script>alert(1)</script>' };
    const serialized = serializeJsonLd(data);
    assert.ok(!serialized.includes('<'));
    assert.deepEqual(JSON.parse(serialized), data);
  });
});
