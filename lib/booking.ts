import { departments } from "@/components/data";
import { doctorProfiles } from "./doctor-profiles";

export type BookingKind = "appointment" | "lab";
export const diagnosticTests = [
  { name: "Complete Blood Count", category: "Lab test", department: "General Medicine" },
  { name: "Blood Sugar Test", category: "Lab test", department: "General Medicine" },
  { name: "Thyroid Test", category: "Lab test", department: "General Medicine" },
  { name: "MRI Scan", category: "Imaging", department: "Radiology" },
  { name: "CT Scan", category: "Imaging", department: "Radiology" },
  { name: "X-Ray", category: "Imaging", department: "Radiology" },
  { name: "Ultrasound", category: "Imaging", department: "Radiology" },
  { name: "ECG", category: "Cardiac diagnostics", department: "Cardiology" },
] as const;
export type BookingValues = {
  fullName: string; mobile: string; email: string; gender: string;
  department: string; doctor: string; test: string;
  appointmentDate: string; appointmentTime: string; symptoms: string;
};
export type BookingErrors = Partial<Record<keyof BookingValues, string>>;
export const emptyBooking: BookingValues = { fullName: "", mobile: "", email: "", gender: "", department: "", doctor: "", test: "", appointmentDate: "", appointmentTime: "", symptoms: "" };
export const patientFields: (keyof BookingValues)[] = ["fullName", "mobile", "email", "gender"];

export function hospitalDateTime(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)!.value;
  return { date: `${part("year")}-${part("month")}-${part("day")}`, time: `${part("hour")}:${part("minute")}` };
}
export function departmentForErp(slug: string) {
  return slug === "orthopedics-sports-medicine" ? "Orthopedics" : departments.find((item) => item.slug === slug)?.name ?? "";
}
export function availableDoctors(department: string) {
  return doctorProfiles.filter((doctor) => !department || !doctor.department || doctor.department === department);
}
export function bookingPrefill(params: URLSearchParams): Partial<BookingValues> {
  const requestedDepartment = departments.find((item) => item.slug === params.get("department"));
  const doctor = doctorProfiles.find((item) => item.bookingName === params.get("doctor"));
  const department = requestedDepartment?.slug || doctor?.department || "";
  return { department, doctor: doctor && (!doctor.department || doctor.department === department) ? doctor.bookingName : "", test: diagnosticTests.find((item) => item.name === params.get("test"))?.name || "" };
}
export function validateBooking(kind: BookingKind, values: BookingValues, now = new Date()): BookingErrors {
  const errors: BookingErrors = {};
  if (values.fullName.trim().length < 2 || values.fullName.trim().length > 100) errors.fullName = "Enter your full name (2–100 characters).";
  if (!/^(?:\+91)?[6-9]\d{9}$/.test(values.mobile.replace(/[\s()-]/g, ""))) errors.mobile = "Enter a valid Indian mobile number, with or without +91.";
  if (values.email.trim() && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254)) errors.email = "Enter a valid email address, or leave this field blank.";
  if (!["Male", "Female", "Other"].includes(values.gender)) errors.gender = "Please select your gender.";
  if (kind === "appointment") {
    if (!departments.some((item) => item.slug === values.department)) errors.department = "Please select a department.";
    if (values.doctor && !availableDoctors(values.department).some((item) => item.bookingName === values.doctor)) errors.doctor = "Select a doctor from this department, or choose no preference.";
  } else if (!diagnosticTests.some((item) => item.name === values.test)) errors.test = "Please select a test or scan.";
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(values.appointmentDate) && !Number.isNaN(Date.parse(values.appointmentDate)) && new Date(values.appointmentDate).toISOString().slice(0, 10) === values.appointmentDate;
  if (!validDate || values.appointmentDate < hospitalDateTime(now).date) errors.appointmentDate = "Choose today or a future date.";
  const validTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(values.appointmentTime);
  if (!validTime) errors.appointmentTime = "Please select your preferred time.";
  else if (validDate && Date.parse(`${values.appointmentDate}T${values.appointmentTime}:00+05:30`) <= now.getTime()) errors.appointmentTime = "This time has passed. Please choose a future time (IST).";
  if (values.symptoms.length > 500) errors.symptoms = "Keep your notes within 500 characters.";
  return errors;
}
export function bookingRequestPayload(kind: BookingKind, values: BookingValues) {
  const diagnostic = diagnosticTests.find((item) => item.name === values.test);
  return {
    fullName: values.fullName.trim(), phone: values.mobile.replace(/[\s()-]/g, ""), email: values.email.trim(), gender: values.gender,
    department: kind === "lab" ? diagnostic?.department ?? "" : departmentForErp(values.department),
    doctorName: kind === "appointment" ? values.doctor : "",
    appointmentDate: values.appointmentDate, appointmentTime: values.appointmentTime,
    reason: values.symptoms.trim(), ...(kind === "lab" ? { testName: values.test } : {}),
  };
}
export function bookingValuesFromPayload(body: Record<string, unknown>): BookingValues {
  const text = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const department = text("department");
  return { fullName: text("fullName"), mobile: text("phone"), email: text("email"), gender: text("gender"),
    department: departments.find((item) => item.slug === department || item.name === department || departmentForErp(item.slug) === department)?.slug ?? "",
    doctor: text("doctorName"), test: text("testName"), appointmentDate: text("appointmentDate"), appointmentTime: text("appointmentTime"), symptoms: text("reason") };
}
