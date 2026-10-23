import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/seo-pages";
import { BookingPage } from "@/components/BookingPage";
import { JsonLd } from "@/components/JsonLd";
import { pageStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(pages.appointment);

export default function AppointmentPage() {
  return <><JsonLd data={pageStructuredData(pages.appointment)} /><BookingPage kind="appointment" /></>;
}
