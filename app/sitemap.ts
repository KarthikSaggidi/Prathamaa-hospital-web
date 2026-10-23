import type { MetadataRoute } from 'next';
import { allPages } from '@/lib/seo-pages';
import { canonicalUrl, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return site.indexable ? allPages.map((page) => ({ url: canonicalUrl(page.path) })) : [];
}
