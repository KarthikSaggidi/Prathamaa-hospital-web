import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("dental-implantology");

export default function DepartmentPage() {
  return <DepartmentDetail slug="dental-implantology" />;
}
