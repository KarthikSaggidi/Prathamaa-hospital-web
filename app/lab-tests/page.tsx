import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/seo-pages";
import { BookingPage } from "@/components/BookingPage";
import { JsonLd } from "@/components/JsonLd";
import { pageStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(pages.labTests);

export default function LabTestsPage() {
  return <><JsonLd data={pageStructuredData(pages.labTests)} /><BookingPage kind="lab" /></>;
}
