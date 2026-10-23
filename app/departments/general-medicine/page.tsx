import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("general-medicine");

export default function DepartmentPage() {
  return <DepartmentDetail slug="general-medicine" />;
}
