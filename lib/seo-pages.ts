import type { DepartmentSlug } from './department-config';

export const pages = {
  home: { path: '/', name: 'Home', title: 'Multispeciality Hospital in Hyderabad', description: 'Prathamaa Hospital in Hyderabad offers multispeciality care, specialist doctors, diagnostics and 24/7 emergency support. Explore care for your family.' },
  about: { path: '/about', name: 'About Us', title: 'About Our Hospital in Hyderabad', description: 'Learn about Prathamaa Hospital in Hyderabad, our founder and medical leadership, and our commitment to compassionate, ethical, patient-centered healthcare.' },
  departments: { path: '/departments', name: 'Departments', title: 'Medical Departments & Specialties in Hyderabad', description: 'Explore 16 medical departments at Prathamaa Hospital in Hyderabad, including cardiology, pediatrics, gynecology, orthopedics, urology and general medicine.' },
  doctors: { path: '/doctors', name: 'Our Doctors', title: 'Specialist Doctors in Hyderabad', description: 'Meet the doctors at Prathamaa Hospital in Hyderabad. Explore medical specialties, professional roles and clinical interests, and find the right care team.' },
  contact: { path: '/contact', name: 'Contact Us', title: 'Contact Our Hospital in Hyderabad', description: 'Contact Prathamaa Hospital in Hyderabad for patient support, directions, specialist care and callback requests. Call +91 800 900 2444 for emergency support.' },
  appointment: { path: '/appointment', name: 'Book an Appointment', title: 'Book a Doctor Appointment in Hyderabad', description: 'Request a doctor appointment at Prathamaa Hospital in Hyderabad. Choose a department, preferred doctor, date and time. Our team will confirm your visit.' },
  labTests: { path: '/lab-tests', name: 'Lab Tests', title: 'Lab Tests & Diagnostic Care in Hyderabad', description: 'Request lab tests or diagnostic scans at Prathamaa Hospital in Hyderabad. Choose a test and preferred visit, and our diagnostics team will assist you.' },
} as const;

export const departmentSeo = {
  cardiology: { name: 'Cardiology', title: 'Cardiology & Heart Care in Hyderabad', description: 'Explore cardiology and heart care at Prathamaa Hospital in Hyderabad, including cardiac consultations, diagnostic assessment and personalized care planning.' },
  neurology: { name: 'Neurology', title: 'Neurology & Brain Care in Hyderabad', description: 'Explore neurology at Prathamaa Hospital in Hyderabad. Learn about care for brain, spinal cord and nerve conditions, specialist assessment and treatments.' },
  nephrology: { name: 'Nephrology', title: 'Nephrology & Kidney Care in Hyderabad', description: 'Learn about nephrology and kidney care at Prathamaa Hospital in Hyderabad, including kidney disease assessment, ongoing management and specialist support.' },
  urology: { name: 'Urology', title: 'Urology & Urinary Care in Hyderabad', description: 'Explore urology services at Prathamaa Hospital in Hyderabad, including care for urinary concerns, kidney stones and prostate conditions. Meet our care team.' },
  'orthopedics-sports-medicine': { name: 'Orthopedics & Sports Medicine', title: 'Orthopedics & Sports Medicine in Hyderabad', description: 'Explore bone, joint and sports injury care at Prathamaa Hospital in Hyderabad. Learn about orthopedic consultations, treatment options and recovery support.' },
  gynecology: { name: 'Gynecology & Obstetrics', title: 'Gynecology & Obstetrics in Hyderabad', description: 'Explore gynecology and obstetric care at Prathamaa Hospital in Hyderabad, including women’s health, pregnancy care and specialist consultation services.' },
  pediatrics: { name: 'Pediatrics', title: 'Pediatrics & Child Care in Hyderabad', description: 'Explore pediatric care at Prathamaa Hospital in Hyderabad, including newborn care, child health, vaccinations and consultations with our pediatric team.' },
  'dental-implantology': { name: 'Dental Implantology', title: 'Dental Implants & Dental Care in Hyderabad', description: 'Learn about dental implantology at Prathamaa Hospital in Hyderabad, including dental implant consultations, restorative care and oral health assessment.' },
  dermatology: { name: 'Dermatology', title: 'Dermatology, Skin & Hair Care in Hyderabad', description: 'Explore dermatology at Prathamaa Hospital in Hyderabad. Learn about skin, hair and nail conditions, specialist consultations and individual care options.' },
  ent: { name: 'ENT', title: 'ENT, Ear, Nose & Throat Care in Hyderabad', description: 'Explore ENT care at Prathamaa Hospital in Hyderabad, including assessment of ear, nose and throat concerns, hearing problems and specialist treatments.' },
  'maxillo-facial-surgery': { name: 'Maxillo Facial Surgery', title: 'Maxillofacial & Jaw Surgery in Hyderabad', description: 'Learn about maxillofacial surgery at Prathamaa Hospital in Hyderabad, including specialist assessment and care for conditions affecting the face and jaw.' },
  'plastic-surgery': { name: 'Plastic Surgery', title: 'Plastic & Reconstructive Surgery in Hyderabad', description: 'Explore plastic and reconstructive surgery at Prathamaa Hospital in Hyderabad. Learn about specialist consultations, treatment options and recovery care.' },
  radiology: { name: 'Radiology', title: 'Radiology & Diagnostic Imaging in Hyderabad', description: 'Explore radiology and diagnostic imaging at Prathamaa Hospital in Hyderabad, including imaging services that support clinical assessment and care planning.' },
  anesthesia: { name: 'Anesthesia', title: 'Anesthesia & Perioperative Care in Hyderabad', description: 'Learn about anesthesia at Prathamaa Hospital in Hyderabad, including preoperative assessment, anesthesia support, patient monitoring and recovery care.' },
  'general-laparoscopic-surgery': { name: 'General & Laparoscopic Surgery', title: 'General & Laparoscopic Surgery in Hyderabad', description: 'Explore general and laparoscopic surgery at Prathamaa Hospital in Hyderabad, including surgical consultations, minimally invasive care and recovery support.' },
  'general-medicine': { name: 'General Medicine', title: 'General Medicine & Physician Care in Hyderabad', description: 'Explore general medicine at Prathamaa Hospital in Hyderabad, including physician consultations, chronic condition management and preventive healthcare.' },
} satisfies Record<DepartmentSlug, { name: string; title: string; description: string }>;

export type PageInfo = { path: string; name: string; title: string; description: string };
export const departmentPages: PageInfo[] = Object.entries(departmentSeo).map(([slug, info]) => ({ ...info, path: `/departments/${slug}` }));
export const allPages: PageInfo[] = [...Object.values(pages), ...departmentPages];
