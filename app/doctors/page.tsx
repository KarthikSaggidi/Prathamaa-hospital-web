import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/seo-pages";
import { DoctorDirectory } from "@/components/DoctorDirectory";
import { JsonLd } from "@/components/JsonLd";
import { pageStructuredData } from "@/lib/structured-data";
import { doctorProfiles } from "@/lib/doctor-profiles";
import { doctorAnchor } from "@/lib/hospital-search";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata(pages.doctors);

export default function DoctorsPage() {
  const doctors = {
    "@context": "https://schema.org", "@type": "ItemList", name: "Doctors at Prathamaa Hospital",
    itemListElement: doctorProfiles.map((doctor, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "Person", "@id": absoluteUrl(`/doctors#${doctorAnchor(doctor.sourceName)}`), name: doctor.name, jobTitle: doctor.role, description: [doctor.role, doctor.qualifications].filter(Boolean).join(". "), image: absoluteUrl(doctor.image.src), url: absoluteUrl(`/doctors#${doctorAnchor(doctor.sourceName)}`), worksFor: { "@id": absoluteUrl("/#hospital") } },
    })),
  };
  return <><JsonLd data={pageStructuredData(pages.doctors, "CollectionPage")} /><JsonLd data={doctors} /><DoctorDirectory /></>;
}
