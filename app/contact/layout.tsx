import { JsonLd } from '@/components/JsonLd';
import { pages } from '@/lib/seo-pages';
import { pageMetadata } from '@/lib/seo';
import { pageStructuredData } from '@/lib/structured-data';

export const metadata = pageMetadata(pages.contact);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <><JsonLd data={pageStructuredData(pages.contact, 'ContactPage')} />{children}</>;
}
