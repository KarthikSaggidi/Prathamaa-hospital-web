export function getSiteOrigin(value: string) {
  const url = new URL(value.trim());
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a public HTTP(S) origin without credentials, a path, query or fragment.');
  }
  return url.origin;
}

export function allowIndexing(environment: { SITE_INDEXABLE?: string; VERCEL_ENV?: string }) {
  return environment.SITE_INDEXABLE !== 'false' && (!environment.VERCEL_ENV || environment.VERCEL_ENV === 'production');
}

export const site = {
  name: 'Prathamaa Hospital',
  alternateName: 'Prathama Hospital',
  origin: getSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL || 'https://prathamaahospital.in'),
  description: 'Multispeciality care at Prathamaa Hospital in Hyderabad. Explore specialist doctors, medical departments, diagnostics and 24/7 emergency support.',
  phone: '+918009002444',
  secondaryPhone: '+918009006444',
  email: 'Prathamaahospital@gmail.com',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  maps: 'https://www.google.com/maps/search/?api=1&query=17.5405432,78.4341348',
  logo: '/images/prathamaa-hospital-logo.png',
  indexable: allowIndexing({ SITE_INDEXABLE: process.env.SITE_INDEXABLE, VERCEL_ENV: process.env.VERCEL_ENV }),
} as const;

export function absoluteUrl(path = '/') {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('A site URL must use a local absolute path.');
  return new URL(path, site.origin).toString();
}

export function canonicalUrl(path: string) {
  const url = new URL(absoluteUrl(path));
  url.search = '';
  url.hash = '';
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
  return url.toString();
}
