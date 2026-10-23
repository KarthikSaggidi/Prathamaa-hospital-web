import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("plastic-surgery");

export default function DepartmentPage() {
  return <DepartmentDetail slug="plastic-surgery" />;
}
