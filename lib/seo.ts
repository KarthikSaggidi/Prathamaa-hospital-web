import type { Metadata } from 'next';
import type { DepartmentSlug } from './department-config';
import { departmentSeo, type PageInfo } from './seo-pages';
import { canonicalUrl, site } from './site';

export function pageMetadata(page: PageInfo): Metadata {
  const title = `${page.title} | ${site.name}`;
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: canonicalUrl(page.path) },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: site.name,
      title,
      description: page.description,
      url: canonicalUrl(page.path),
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Prathamaa Hospital — multispeciality care in Hyderabad' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
      images: [{ url: '/opengraph-image', alt: 'Prathamaa Hospital — multispeciality care in Hyderabad' }],
    },
  };
}

export function departmentMetadata(slug: DepartmentSlug): Metadata {
  return pageMetadata({ ...departmentSeo[slug], path: `/departments/${slug}` });
}
