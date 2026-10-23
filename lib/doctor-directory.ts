import { doctorProfiles } from "./doctor-profiles";
import { doctorAnchor, searchHospital } from "./hospital-search";

export const doctorLocation = { id: "hyderabad", name: "Hyderabad", hospital: "Prathamaa Hospital" } as const;

export function filterDoctorProfiles(query: string, specialty = "all", location = "all") {
  if (location !== "all" && location !== doctorLocation.id) return [];
  const ranked = query.trim()
    ? searchHospital(query, 100)
        .filter((item) => item.type === "Doctor")
        .flatMap((item) => doctorProfiles.filter((doctor) => doctorAnchor(doctor.sourceName) === item.id))
    : doctorProfiles;
  return ranked.filter((doctor) => specialty === "all" || (doctor.department ?? "leadership") === specialty);
}

/** Stored favorites contain only valid public profile IDs, never patient details. */
export function parseSavedDoctorIds(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    const known = new Set(doctorProfiles.map((doctor) => doctorAnchor(doctor.sourceName)));
    return [...new Set(parsed.filter((id): id is string => typeof id === "string" && known.has(id)))];
  } catch { return []; }
}
