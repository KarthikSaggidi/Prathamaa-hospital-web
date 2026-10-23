/** Locally hosted anatomical meshes. See public/models/anatomy/NOTICE.md for sources. */
export const anatomyModels: Record<string, { file: string; source: "bodyparts" | "hra"; label: string; note?: string }> = {
  cardiology: { file: "heart", source: "bodyparts", label: "Heart & coronary vessels" },
  neurology: { file: "brain", source: "bodyparts", label: "Brain anatomy" },
  nephrology: { file: "kidneys", source: "bodyparts", label: "Kidneys & renal vessels" },
  urology: { file: "urinary", source: "bodyparts", label: "Urinary system" },
  "orthopedics-sports-medicine": { file: "knee", source: "bodyparts", label: "Knee joint · sectioned bones" },
  gynecology: { file: "reproductive", source: "hra", label: "Uterus, ovaries & fallopian tubes" },
  pediatrics: { file: "lungs", source: "hra", label: "Lung anatomy", note: "Adult anatomy reference" },
  "dental-implantology": { file: "dental", source: "bodyparts", label: "Teeth & jaw anatomy" },
  dermatology: { file: "skin", source: "bodyparts", label: "Facial skin anatomy" },
  ent: { file: "ear", source: "bodyparts", label: "External ear anatomy" },
  "maxillo-facial-surgery": { file: "face", source: "bodyparts", label: "Skull & jaw anatomy" },
  "plastic-surgery": { file: "facial-muscles", source: "bodyparts", label: "Facial anatomy cutaway" },
  radiology: { file: "face", source: "bodyparts", label: "Craniofacial skeletal anatomy" },
  anesthesia: { file: "lungs", source: "hra", label: "Lungs & bronchial anatomy" },
  "general-laparoscopic-surgery": { file: "liver", source: "hra", label: "Liver anatomy" },
  "general-medicine": { file: "kidneys", source: "bodyparts", label: "Renal anatomy" },
};
