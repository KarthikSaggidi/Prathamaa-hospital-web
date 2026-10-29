/** Locally hosted anatomical meshes. See public/models/anatomy/NOTICE.md for sources. */
export const anatomyModels: Record<string, { file: string; source: "bodyparts" | "hra" | "original" | "mixed"; label: string; note?: string; rotation?: [number, number, number] }> = {
  cardiology: { file: "heart", source: "bodyparts", label: "Heart & coronary vessels" },
  neurology: { file: "brain", source: "bodyparts", label: "Brain anatomy" },
  nephrology: { file: "kidneys", source: "bodyparts", label: "Kidneys & renal vessels" },
  urology: { file: "urinary", source: "bodyparts", label: "Urinary system" },
  "orthopedics-sports-medicine": { file: "knee", source: "bodyparts", label: "Knee joint · sectioned bones" },
  gynecology: { file: "reproductive", source: "hra", label: "Uterus, ovaries & fallopian tubes" },
  pediatrics: { file: "pediatric-examination", source: "original", label: "Pediatric examination set", note: "Small-diaphragm stethoscope & thermometer" },
  "dental-implantology": { file: "dental", source: "bodyparts", label: "Teeth & jaw anatomy" },
  dermatology: { file: "skin-cross-section", source: "original", label: "Skin, follicles & glands", note: "Layered skin cutaway · illustrative anatomy", rotation: [.15, -.3, 0] },
  ent: { file: "ent-airways", source: "bodyparts", label: "Ear, nose & throat", note: "Nasal structures, pharynx, larynx & ear" },
  "maxillo-facial-surgery": { file: "maxillofacial-jaw", source: "bodyparts", label: "Facial bones, jaw & muscles", note: "Maxilla, mandible, dentition & facial musculature" },
  "plastic-surgery": { file: "facial-muscles", source: "bodyparts", label: "Facial anatomy cutaway" },
  radiology: { file: "face", source: "bodyparts", label: "Craniofacial skeletal anatomy" },
  anesthesia: { file: "anesthesia-airway", source: "bodyparts", label: "Larynx, trachea & bronchi", note: "Laryngeal cartilages & branching airway" },
  "general-laparoscopic-surgery": { file: "digestive-surgery", source: "bodyparts", label: "Abdominal surgical anatomy", note: "Liver, stomach, intestines, gallbladder & pancreas" },
  "general-medicine": { file: "medicine-torso", source: "mixed", label: "Integrated organ anatomy", note: "Heart, lungs, liver, stomach, spleen & kidneys" },
};
