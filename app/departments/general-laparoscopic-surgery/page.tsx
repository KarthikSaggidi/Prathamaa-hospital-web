import { departmentMetadata } from "@/lib/seo";
import { DepartmentDetail } from "@/components/DepartmentDetail";

export const metadata = departmentMetadata("general-laparoscopic-surgery");

export default function DepartmentPage() {
  return <DepartmentDetail slug="general-laparoscopic-surgery" />;
}
