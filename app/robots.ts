import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return site.indexable
    ? { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: absoluteUrl('/sitemap.xml') }
    : { rules: { userAgent: '*', disallow: '/' } };
}
