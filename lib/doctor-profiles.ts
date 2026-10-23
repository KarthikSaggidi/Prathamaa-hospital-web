import type { StaticImageData } from "next/image";
import shivani from "@/assests/derived/doctor-shivani.png";
import nirban from "@/assests/derived/doctor-nirban.png";
import susruth from "@/assests/derived/doctor-susruth.png";
import gopi from "@/assests/derived/doctor-gopi.png";
import shankar from "@/assests/derived/doctor-shankar.png";
import naveena from "@/public/images/doctors/dr-pikkalla-naveena-cutout.png";
import rakesh from "@/public/images/doctors/dr-batta-rakesh-yadav.jpeg";
import seshu from "@/public/images/doctors/dr-seshu-mohan-cutout.png";

type DoctorRecord = {
  name: string;
  role: string;
  department: string;
  image: StaticImageData;
  qualifications?: string;
  experience?: string;
  rating?: string;
  reviews?: string;
  intro: string;
  interests: string[];
  sourceName?: string;
  bookingAliases?: string[];
};

// The directory, search, booking forms and structured data share this roster.
// New qualifications and roles are transcribed from the supplied coats;
// unspecified degrees, experience and review scores are intentionally omitted.
const roster: DoctorRecord[] = [
  {
    name: "Dr. D Shivani Manne",
    role: "Medical Director",
    qualifications: "MBBS, M.S General and Laparoscopic Surgeon (OSMANIA)",
    department: "general-laparoscopic-surgery",
    image: shivani,
    experience: "10+ Years Experience", rating: "4.8", reviews: "98 Reviews",
    intro: "Dr. D Shivani Manne is the Medical Director of Prathamaa Hospital and a general and laparoscopic surgeon. She combines medical leadership with surgical consultations and patient-centered care.",
    interests: ["General surgery", "Laparoscopic surgery", "Medical leadership"],
    // Preserve previously shared profile and appointment links after the name correction.
    sourceName: "Dr. Shivani Manne",
    bookingAliases: ["Dr. Shivani Manne"],
  },
  {
    name: "Dr. Pikkalla Naveena",
    role: "Gynecologist & Obstetrician",
    qualifications: "MD (Gynecology & Obstetrics)",
    department: "gynecology",
    image: naveena,
    intro: "Dr. Pikkalla Naveena holds an MD in Gynecology & Obstetrics. At Prathamaa Hospital, patients can consult her about gynecological concerns, pregnancy and obstetric care.",
    interests: ["Gynecology", "Obstetrics", "Pregnancy care"],
  },
  {
    name: "Dr. Batta Rakesh Yadav",
    role: "Consultant Orthopaedic Surgeon",
    qualifications: "MBBS, MS (Ortho), FIJR, FIAS, FISM",
    department: "orthopedics-sports-medicine",
    image: rakesh,
    intro: "Dr. Batta Rakesh Yadav is a Consultant Orthopaedic Surgeon at Prathamaa Hospital. Patients can discuss bone and joint concerns, orthopaedic assessment and surgical care planning during a consultation.",
    interests: ["Orthopaedics", "Bone & joint care", "Orthopaedic surgery"],
  },
  {
    name: "Dr. Seshu Mohan",
    role: "Senior Consultant Urologist · Laparoscopic, Robotic & Kidney Transplant Surgeon",
    department: "urology",
    image: seshu,
    intro: "Dr. Seshu Mohan is a Senior Consultant Urologist and a laparoscopic, robotic and kidney transplant surgeon. Patients can consult him at Prathamaa Hospital about urinary health concerns and specialist surgical care planning.",
    interests: ["Urology", "Laparoscopic & robotic surgery", "Kidney transplant surgery"],
  },
  {
    name: "Dr. Nirban Mitra", role: "Dental Implantologist", department: "dental-implantology", image: nirban,
    experience: "8+ Years Experience", rating: "4.7", reviews: "61 Reviews",
    intro: "Dr. Nirban Mitra is a dental implantologist at Prathamaa Hospital. Patients can discuss their dental concerns, implant options and the next steps in their care during a consultation.",
    interests: ["Dental implantology", "Dental consultations", "Restorative care planning"],
  },
  {
    name: "Dr. B Susruth Kumar", role: "Cardiologist", department: "cardiology", image: susruth,
    experience: "5+ Years Experience", rating: "4.5", reviews: "56 Reviews",
    intro: "Dr. B Susruth Kumar is a cardiologist at Prathamaa Hospital. Consultations offer an opportunity to discuss heart health concerns, assessment and an individual care plan.",
    interests: ["Heart health", "Cardiology consultations", "Cardiac care planning"],
  },
  {
    name: "Dr. Gopi Kishore", role: "Urologist", department: "urology", image: gopi,
    experience: "9+ Years Experience", rating: "4.7", reviews: "66 Reviews",
    intro: "Dr. Gopi Kishore is a urologist at Prathamaa Hospital, providing specialist consultations for urinary health concerns and discussing appropriate care options with patients.",
    interests: ["Urology consultations", "Urinary health", "Individual care planning"],
  },
  {
    name: "Dr. Shankar Reddy", role: "General Surgeon", department: "general-laparoscopic-surgery", image: shankar,
    experience: "5+ Years Experience", rating: "4.5", reviews: "96 Reviews",
    intro: "Dr. Shankar Reddy is a general surgeon at Prathamaa Hospital. Patients can discuss their surgical concerns, assessment and care planning during a consultation.",
    interests: ["General surgery", "Surgical consultations", "Perioperative care planning"],
  },
];

export const doctorProfiles = roster.map((doctor) => ({
  ...doctor,
  bookingName: doctor.name,
  sourceName: doctor.sourceName ?? doctor.name,
  reviewCount: doctor.reviews ? Number.parseInt(doctor.reviews, 10) : undefined,
}));
export type DoctorProfile = typeof doctorProfiles[number];

export function doctorBookingUrl(doctor: DoctorProfile) {
  const params = new URLSearchParams({ doctor: doctor.bookingName, department: doctor.department });
  return `/appointment?${params.toString()}`;
}
