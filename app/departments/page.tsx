import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/seo-pages";
import { DepartmentDirectory } from "@/components/DepartmentDirectory";
import { JsonLd } from "@/components/JsonLd";
import { departmentListStructuredData, pageStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(pages.departments);

export default function DepartmentsPage() {
  return <><JsonLd data={pageStructuredData(pages.departments, "CollectionPage")} /><JsonLd data={departmentListStructuredData()} /><DepartmentDirectory /></>;
}
