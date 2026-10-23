// @ts-expect-error Bun provides the test runner at runtime.
import { describe, expect, test } from "bun:test";
import { availableDoctors, bookingPrefill, bookingRequestPayload, departmentForErp, hospitalDateTime, validateBooking, type BookingValues } from "./booking";
import { handleBookingRequest } from "./booking-server";

const now = new Date("2030-06-15T04:30:00Z"); // 10:00 IST
const valid: BookingValues = { fullName: "Test Patient", mobile: "+91 90000 00000", email: "", gender: "Female", department: "cardiology", doctor: "", test: "Complete Blood Count", appointmentDate: "2030-06-16", appointmentTime: "10:30", symptoms: "Consultation request" };
function request(body: unknown, origin = "https://hospital.example") {
  return new Request("https://hospital.example/api/appointments", { method: "POST", headers: { "Content-Type": "application/json", origin }, body: JSON.stringify(body) });
}
const fakeFetch = (run: (url: string, init: RequestInit) => Response | Promise<Response>) => ((input: RequestInfo | URL, init: RequestInit = {}) => Promise.resolve(run(String(input), init))) as typeof fetch;

describe("booking validation and prefill", () => {
  test("accepts an optional email and doctor, normalizes phone and preserves ERP department names", () => {
    expect(validateBooking("appointment", valid, now)).toEqual({});
    expect(bookingRequestPayload("appointment", valid).phone).toBe("+919000000000");
    expect(departmentForErp("orthopedics-sports-medicine")).toBe("Orthopedics");
  });
  test("checks names, phone, optional email and gender", () => {
    const errors = validateBooking("appointment", { ...valid, fullName: " ", mobile: "12345", email: "wrong", gender: "Unknown" }, now);
    expect(Object.keys(errors).sort()).toEqual(["email", "fullName", "gender", "mobile"]);
  });
  test("rejects impossible dates, elapsed dates and elapsed same-day times in India", () => {
    expect(hospitalDateTime(now)).toEqual({ date: "2030-06-15", time: "10:00" });
    expect(validateBooking("appointment", { ...valid, appointmentDate: "2030-02-31" }, now).appointmentDate).toBeDefined();
    expect(validateBooking("appointment", { ...valid, appointmentDate: "2030-06-14" }, now).appointmentDate).toBeDefined();
    expect(validateBooking("appointment", { ...valid, appointmentDate: "2030-06-15", appointmentTime: "09:59" }, now).appointmentTime).toBeDefined();
    expect(validateBooking("appointment", { ...valid, appointmentDate: "2030-06-15", appointmentTime: "10:30" }, now)).toEqual({});
  });
  test("rejects unknown departments, mismatched doctors, unknown tests, invalid times and excessive notes", () => {
    expect(validateBooking("appointment", { ...valid, department: "unknown" }, now).department).toBeDefined();
    expect(validateBooking("appointment", { ...valid, doctor: "Dr. Gopi Kishore" }, now).doctor).toBeDefined();
    expect(validateBooking("lab", { ...valid, test: "Not offered" }, now).test).toBeDefined();
    expect(validateBooking("lab", { ...valid, appointmentTime: "25:15" }, now).appointmentTime).toBeDefined();
    expect(validateBooking("appointment", { ...valid, symptoms: "a".repeat(501) }, now).symptoms).toBeDefined();
  });
  test("doctor links prefill their specialty and conflicting links never select an unrelated doctor", () => {
    expect(bookingPrefill(new URLSearchParams({ doctor: "Dr. Gopi Kishore" }))).toMatchObject({ department: "urology", doctor: "Dr. Gopi Kishore" });
    expect(bookingPrefill(new URLSearchParams({ department: "cardiology", doctor: "Dr. Gopi Kishore" }))).toMatchObject({ department: "cardiology", doctor: "" });
    expect(availableDoctors("cardiology").some((doctor) => doctor.bookingName === "Dr. Gopi Kishore")).toBe(false);
    expect(bookingPrefill(new URLSearchParams({ test: "MRI Scan" })).test).toBe("MRI Scan");
  });
});

describe("hospital booking gateway", () => {
  test("invalid requests never reach the ERP", async () => {
    let calls = 0;
    const response = await handleBookingRequest(request({ fullName: "X" }), "appointment", { now, fetcher: fakeFetch(() => { calls++; return Response.json({ ok: true }); }) });
    expect(response.status).toBe(400); expect(calls).toBe(0);
    expect((await response.json()).errors.mobile).toBeDefined();
  });
  test("rejects malformed JSON and cross-site submissions", async () => {
    const malformed = new Request("https://hospital.example/api/appointments", { method: "POST", body: "{" });
    expect((await handleBookingRequest(malformed, "appointment", { now })).status).toBe(400);
    expect((await handleBookingRequest(request(bookingRequestPayload("appointment", valid), "https://unrelated.example"), "appointment", { now })).status).toBe(403);
  });
  test("acknowledges an explicit ERP success and returns no patient details", async () => {
    let calls = 0;
    const response = await handleBookingRequest(request(bookingRequestPayload("appointment", valid)), "appointment", { now, fetcher: fakeFetch((url, init) => {
      calls++; expect(url).toBe("https://erp.prathamaahospital.in/api/public/appointments");
      const payload = JSON.parse(String(init.body)); expect(payload.department).toBe("Cardiology"); expect(payload.phone).toBe("+919000000000");
      expect(payload).not.toHaveProperty("doctorName"); expect(payload).not.toHaveProperty("email");
      return Response.json({ ok: true, patient: { fullName: "Private patient data" } });
    }) });
    expect(calls).toBe(1); expect(response.status).toBe(200);
    const body = await response.json(); expect(body.ok).toBe(true); expect(body).not.toHaveProperty("patient");
  });
  test("never presents upstream errors, HTML or an unacknowledged response as success", async () => {
    for (const upstream of [Response.json({ ok: false }), Response.json({ ok: true }, { status: 500 }), new Response("<html>Service offline</html>"), Response.json({ message: "Unknown outcome" })]) {
      const response = await handleBookingRequest(request(bookingRequestPayload("appointment", valid)), "appointment", { now, fetcher: fakeFetch(() => upstream) });
      expect(response.status).toBe(502); expect((await response.json()).ok).toBe(false);
    }
  });
  test("network failures preserve an uncertain outcome instead of claiming confirmation", async () => {
    const response = await handleBookingRequest(request(bookingRequestPayload("appointment", valid)), "appointment", { now, fetcher: fakeFetch(() => { throw new TypeError("Connection interrupted"); }) });
    expect(response.status).toBe(502); expect((await response.json()).message).toContain("before submitting again");
  });
  test("diagnostic requests reach the existing ERP with the selected test and patient notes", async () => {
    const values = { ...valid, test: "MRI Scan", symptoms: "Please advise on preparation." };
    const response = await handleBookingRequest(request(bookingRequestPayload("lab", values)), "lab", { now, labEndpoint: "", fetcher: fakeFetch((url, init) => {
      expect(url).toContain("/api/public/appointments"); const payload = JSON.parse(String(init.body));
      expect(payload.department).toBe("Radiology"); expect(payload.reason).toContain("Diagnostic test request: MRI Scan"); expect(payload.reason).toContain(values.symptoms);
      return Response.json({ ok: true });
    }) });
    expect((await response.json()).ok).toBe(true);
  });
  test("can use a dedicated diagnostic endpoint without changing the user flow", async () => {
    const response = await handleBookingRequest(request(bookingRequestPayload("lab", valid)), "lab", { now, labEndpoint: "https://hospital.example/diagnostics", fetcher: fakeFetch((url, init) => {
      expect(url).toBe("https://hospital.example/diagnostics"); expect(JSON.parse(String(init.body)).testName).toBe("Complete Blood Count");
      return Response.json({ success: true });
    }) });
    expect((await response.json()).ok).toBe(true);
  });
});
