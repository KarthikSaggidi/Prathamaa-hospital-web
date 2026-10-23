import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("pediatrics");

export default function DepartmentPage() {
  return <DepartmentDetail slug="pediatrics" />;
}
