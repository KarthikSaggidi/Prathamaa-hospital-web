import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("gynecology");

export default function DepartmentPage() {
  return <DepartmentDetail slug="gynecology" />;
}
