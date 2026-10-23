import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("neurology");

export default function DepartmentPage() {
  return <DepartmentDetail slug="neurology" />;
}
