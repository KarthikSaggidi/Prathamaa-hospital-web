import { doctors } from "@/components/data";

const profiles = [
  { name: "Dr. Shivani Manne", role: "Co-founder & Medical Director", department: null, bookingName: "Dr. Shivani Manne", intro: "Dr. Shivani Manne is the Co-founder and Medical Director of Prathamaa Hospital, bringing medical leadership and a commitment to patient-centered care.", interests: ["Medical leadership", "Patient-centered care", "Coordinated hospital care"] },
  { name: "Dr. L Kiran Kumar", role: "Consultant Paediatrician & Neonatologist", department: "pediatrics", bookingName: "Dr. L Kiran Kumar", intro: "Dr. L Kiran Kumar specializes in paediatrics and neonatology, with a focus on the healthcare needs of newborns, children and their families.", interests: ["Child health", "Newborn care", "Paediatric consultations"] },
  { name: "Dr. Nirban Mitra", role: "Dental Implantologist", department: "dental-implantology", bookingName: "Dr. Nirban Mitra", intro: "Dr. Nirban Mitra is a dental implantologist at Prathamaa Hospital. Patients can discuss their dental concerns, implant options and the next steps in their care during a consultation.", interests: ["Dental implantology", "Dental consultations", "Restorative care planning"] },
  { name: "Dr. B Susruth Kumar", role: "Cardiologist", department: "cardiology", bookingName: "Dr. B Susruth Kumar", intro: "Dr. B Susruth Kumar is a cardiologist at Prathamaa Hospital. Consultations offer an opportunity to discuss heart health concerns, assessment and an individual care plan.", interests: ["Heart health", "Cardiology consultations", "Cardiac care planning"] },
  { name: "Dr. Gopi Kishore", role: "Urologist", department: "urology", bookingName: "Dr. Gopi Kishore", intro: "Dr. Gopi Kishore is a urologist at Prathamaa Hospital, providing specialist consultations for urinary health concerns and discussing appropriate care options with patients.", interests: ["Urology consultations", "Urinary health", "Individual care planning"] },
  { name: "Dr. Shankar Reddy", role: "General Surgeon", department: "general-laparoscopic-surgery", bookingName: "Dr. Shankar Reddy", intro: "Dr. Shankar Reddy is a general surgeon at Prathamaa Hospital. Patients can discuss their surgical concerns, assessment and care planning during a consultation.", interests: ["General surgery", "Surgical consultations", "Perioperative care planning"] },
] as const;

export const doctorProfiles = doctors.map((doctor, index) => ({ ...doctor, ...profiles[index], reviewCount: Number.parseInt(doctor.reviews, 10), sourceName: doctor.name }));
export type DoctorProfile = typeof doctorProfiles[number];
export function doctorBookingUrl(doctor: DoctorProfile) {
  const params = new URLSearchParams({ doctor: doctor.bookingName });
  if (doctor.department) params.set("department", doctor.department);
  return `/appointment?${params.toString()}`;
}
