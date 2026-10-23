import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("ent");

export default function DepartmentPage() {
  return <DepartmentDetail slug="ent" />;
}
