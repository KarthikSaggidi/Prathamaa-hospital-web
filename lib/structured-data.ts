import { departmentSeo, pages, type PageInfo } from './seo-pages';
import { absoluteUrl, canonicalUrl, site } from './site';
import type { DepartmentSlug } from './department-config';

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function hospitalStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Hospital',
        '@id': absoluteUrl('/#hospital'),
        name: site.name,
        alternateName: site.alternateName,
        url: absoluteUrl('/'),
        logo: absoluteUrl(site.logo),
        description: site.description,
        telephone: site.phone,
        email: site.email,
        address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
        geo: { '@type': 'GeoCoordinates', latitude: 17.5405432, longitude: 78.4341348 },
        hasMap: site.maps,
        founder: { '@type': 'Person', name: 'Dr. Karthik Manne' },
        contactPoint: [
          { '@type': 'ContactPoint', telephone: site.phone, contactType: 'emergency support', hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' } },
          { '@type': 'ContactPoint', telephone: site.secondaryPhone, contactType: 'hospital support' },
        ],
      },
      { '@type': 'WebSite', '@id': absoluteUrl('/#website'), url: absoluteUrl('/'), name: site.name, alternateName: site.alternateName, inLanguage: 'en-IN', publisher: { '@id': absoluteUrl('/#hospital') } },
    ],
  };
}

export function pageStructuredData(page: PageInfo, type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'MedicalWebPage' = 'WebPage') {
  const breadcrumbs = page.path === '/' ? [] : [pages.home, ...(page.path.startsWith('/departments/') ? [pages.departments] : []), page];
  const breadcrumbId = `${canonicalUrl(page.path)}#breadcrumb`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${canonicalUrl(page.path)}#webpage`,
        url: canonicalUrl(page.path),
        name: page.title,
        description: page.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': absoluteUrl('/#website') },
        about: { '@id': absoluteUrl('/#hospital') },
        publisher: { '@id': absoluteUrl('/#hospital') },
        ...(breadcrumbs.length ? { breadcrumb: { '@id': breadcrumbId } } : {}),
      },
      ...(breadcrumbs.length ? [{ '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: canonicalUrl(item.path) })) }] : []),
    ],
  };
}

export function departmentStructuredData(slug: DepartmentSlug) {
  return pageStructuredData({ ...departmentSeo[slug], path: `/departments/${slug}` }, 'MedicalWebPage');
}

export function departmentListStructuredData() {
  return {
    '@context': 'https://schema.org', '@type': 'ItemList',
    '@id': absoluteUrl('/departments#specialties'), name: 'Medical departments at Prathamaa Hospital',
    itemListElement: Object.entries(departmentSeo).map(([slug, item], index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: absoluteUrl(`/departments/${slug}`) })),
  };
}
