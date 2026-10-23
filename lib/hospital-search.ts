import { departments } from "@/components/data";
import details from "./department-details.json";
import { doctorProfiles } from "./doctor-profiles";

type Result = { id: string; title: string; subtitle: string; type: "Department" | "Doctor"; href: string; icon: string };
const aliases: Record<string, string> = {
  cardiac: "heart", cardiology: "heart", cardiologist: "heart", cardio: "heart",
  paediatrics: "pediatrics", paediatric: "pediatrics", pediatric: "pediatrics", paediatrician: "pediatrics", pediatrician: "pediatrics", children: "child", babies: "baby",
  gynaecology: "gynecology", gynaecologist: "gynecology", gynecologist: "gynecology", womens: "women",
  orthopaedics: "orthopedics", orthopaedic: "orthopedics", orthopedic: "orthopedics", orthopedist: "orthopedics",
  neurologist: "neurology", nephrologist: "nephrology", urologist: "urology", dermatologist: "dermatology",
  teeth: "tooth", dental: "tooth", dentist: "tooth", implantologist: "implant", kidneys: "kidney", joints: "joint", bones: "bone", headaches: "headache",
};
const clean = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const tokens = (value: string) => clean(value).split(/\s+/).filter((word) => word && !["dr", "doctor", "doctors", "department", "departments", "the", "and", "for", "of"].includes(word)).map((word) => aliases[word] ?? word);
const indexTokens = (value: string) => [...new Set([...tokens(value), ...clean(value).split(/\s+/)])];
export const doctorAnchor = (name: string) => `doctor-${clean(name).replace(/\s+/g, "-")}`;

const specialtyTerms: Record<string, string> = {
  cardiology: "heart cardiac", nephrology: "kidney renal dialysis", urology: "urinary bladder",
  neurology: "brain nerve headache", dermatology: "skin hair nail", pediatrics: "child baby newborn",
  gynecology: "women pregnancy maternity", "orthopedics-sports-medicine": "bone joint fracture sports",
  "dental-implantology": "tooth implant", ent: "ear nose throat sinus hearing", radiology: "scan imaging xray mri ct ultrasound",
};

const entries = [
  ...departments.map((department) => {
    const info = details[department.slug as keyof typeof details];
    return { id: department.slug, title: department.name, subtitle: department.description, type: "Department" as const, href: `/departments/${department.slug}`, icon: department.icon,
      words: indexTokens(`${department.name} ${department.description} ${info.sections.flatMap((section) => section.items).join(" ")}`), titleWords: indexTokens(`${department.name} ${specialtyTerms[department.slug] ?? ""}`), normalized: clean(department.name) };
  }),
  ...doctorProfiles.map((doctor) => ({ id: doctorAnchor(doctor.sourceName), title: doctor.name.trim(), subtitle: doctor.role, type: "Doctor" as const, href: `/doctors#${doctorAnchor(doctor.sourceName)}`, icon: "doctor",
    words: indexTokens(`${doctor.name} ${doctor.role} ${doctor.qualifications ?? ""} ${doctor.interests.join(" ")}`), titleWords: indexTokens(doctor.name), normalized: clean(doctor.name) })),
];

function closeWord(a: string, b: string) {
  if (a.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length >= b.length) i++;
    if (b.length >= a.length) j++;
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

export function searchHospital(query: string, limit = 8): Result[] {
  const terms = tokens(query).slice(0, 12);
  if (!terms.length) {
    const type = /^(dr|doctor|doctors)$/i.test(query.trim()) ? "Doctor" : /^departments?$/i.test(query.trim()) ? "Department" : null;
    return type ? entries.filter((entry) => entry.type === type).slice(0, limit).map((entry) => ({ id: entry.id, title: entry.title, subtitle: entry.subtitle, type: entry.type, href: entry.href, icon: entry.icon })) : [];
  }
  return entries.map((entry) => {
    let score = entry.normalized === clean(query) ? 100 : 0;
    for (const term of terms) {
      if (entry.titleWords.includes(term)) score += 25;
      else if (entry.titleWords.some((word) => word.startsWith(term))) score += 15;
      else if (entry.words.includes(term)) score += 10;
      else if (entry.words.some((word) => word.startsWith(term))) score += 5;
      else if (entry.words.some((word) => closeWord(term, word))) score += 2;
      else return { entry, score: 0 };
    }
    return { entry, score };
  }).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title)).slice(0, limit).map(({ entry }) => ({ id: entry.id, title: entry.title, subtitle: entry.subtitle, type: entry.type, href: entry.href, icon: entry.icon }));
}
