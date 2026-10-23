import details from "./department-details.json";

export type DepartmentSlug = keyof typeof details;
export const departmentDetails = details;

export const departmentVisuals: Record<DepartmentSlug, { headline: string; accent: string; tint: string; model: string; image: string }> = {
  cardiology: { headline: "Expert care. A healthier heart.", accent: "#dc4767", tint: "#fce8ed", model: "Heart & blood vessels", image: "cardiology" },
  neurology: { headline: "Thoughtful care for your nervous system.", accent: "#8462c6", tint: "#f0eafa", model: "Brain & nervous system", image: "neurology" },
  nephrology: { headline: "Specialized care for kidney health.", accent: "#c85b71", tint: "#fbe9ee", model: "Kidneys & renal system", image: "nephrology" },
  urology: { headline: "Personal care. Renewed confidence.", accent: "#577bc3", tint: "#e9f0fc", model: "Urinary system", image: "urology" },
  "orthopedics-sports-medicine": { headline: "Move better. Live more fully.", accent: "#b57b3a", tint: "#fbf1df", model: "Bone & joint care", image: "orthopedics-sports-medicine" },
  gynecology: { headline: "Compassionate care at every life stage.", accent: "#d76291", tint: "#fcebf3", model: "Female reproductive system", image: "gynecology" },
  pediatrics: { headline: "Small steps. Healthier futures.", accent: "#24a69b", tint: "#e4f6f1", model: "Child health & development", image: "pediatrics" },
  "dental-implantology": { headline: "A confident smile starts with care.", accent: "#667fbe", tint: "#ebf0fb", model: "Tooth & dental implant", image: "dental-implantology" },
  dermatology: { headline: "Feel comfortable in your skin.", accent: "#d97666", tint: "#fceee8", model: "Skin layers & hair follicles", image: "dermatology" },
  ent: { headline: "Hear clearly. Breathe comfortably.", accent: "#cf8d5b", tint: "#fcf0e5", model: "Ear anatomy", image: "ent" },
  "maxillo-facial-surgery": { headline: "Precision care for your face and jaw.", accent: "#b0807b", tint: "#f9eeeb", model: "Face & jaw structure", image: "maxillo-facial-surgery" },
  "plastic-surgery": { headline: "Restoring form, function and confidence.", accent: "#bc7790", tint: "#f9ecf1", model: "Facial reconstruction", image: "plastic-surgery" },
  radiology: { headline: "A clearer picture of your health.", accent: "#459bac", tint: "#e7f5f8", model: "Diagnostic imaging scanner", image: "radiology" },
  anesthesia: { headline: "Your comfort. Our careful attention.", accent: "#3f9eac", tint: "#e5f4f6", model: "Anaesthesia mask & breathing circuit", image: "anesthesia" },
  "general-laparoscopic-surgery": { headline: "Precision in surgery. Care in recovery.", accent: "#508eb1", tint: "#e9f3f9", model: "Laparoscopic surgical instruments", image: "general-surgery" },
  "general-medicine": { headline: "Your first step toward better health.", accent: "#398fbb", tint: "#e5f2fb", model: "Stethoscope & primary care", image: "general-medicine" },
};
