import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("maxillo-facial-surgery");

export default function DepartmentPage() {
  return <DepartmentDetail slug="maxillo-facial-surgery" />;
}
