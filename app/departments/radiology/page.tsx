import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("radiology");

export default function DepartmentPage() {
  return <DepartmentDetail slug="radiology" />;
}
