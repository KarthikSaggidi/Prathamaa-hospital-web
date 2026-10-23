import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("orthopedics-sports-medicine");

export default function DepartmentPage() {
  return <DepartmentDetail slug="orthopedics-sports-medicine" />;
}
