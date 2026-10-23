import { NextResponse } from "next/server";
import { bookingRequestPayload, bookingValuesFromPayload, validateBooking, type BookingKind } from "./booking";

const appointmentEndpoint = "https://erp.prathamaahospital.in/api/public/appointments";
type BookingServiceOptions = { fetcher?: typeof fetch; now?: Date; labEndpoint?: string };

/** Validate locally and acknowledge receipt only after the hospital service accepts it. */
export async function handleBookingRequest(request: Request, kind: BookingKind, options: BookingServiceOptions = {}) {
  const json = (body: object, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, message: "Please submit your request from our booking page." }, 403);
  let body: Record<string, unknown>;
  try {
    if (Number(request.headers.get("content-length")) > 12000) return json({ ok: false, message: "Your request is too long." }, 413);
    const raw = await request.text();
    if (raw.length > 12000) return json({ ok: false, message: "Your request is too long." }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid booking");
    body = parsed as Record<string, unknown>;
  } catch { return json({ ok: false, message: "Please provide valid booking details." }, 400); }

  const values = bookingValuesFromPayload(body);
  const errors = validateBooking(kind, values, options.now ?? new Date());
  if (Object.keys(errors).length) return json({ ok: false, message: "Please check the highlighted booking details.", errors }, 400);

  const payload = bookingRequestPayload(kind, values);
  const labEndpoint = options.labEndpoint ?? process.env.ERP_LAB_BOOKING_URL;
  const dedicatedLab = kind === "lab" && Boolean(labEndpoint);
  const { testName, doctorName, email, ...core } = { ...payload, testName: "testName" in payload ? payload.testName : undefined };
  const outgoing = {
    ...core,
    ...(email ? { email } : {}), ...(doctorName ? { doctorName } : {}),
    ...(dedicatedLab ? { testName } : {}),
    // The existing ERP supports appointment requests. Include the diagnostic request
    // in its reason field so the hospital team can arrange the requested test.
    reason: kind === "lab" && !dedicatedLab ? `Diagnostic test request: ${values.test}${values.symptoms.trim() ? `\nPatient notes: ${values.symptoms.trim()}` : ""}` : payload.reason,
  };
  try {
    const response = await (options.fetcher ?? fetch)(dedicatedLab ? labEndpoint! : appointmentEndpoint, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outgoing), cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000),
    });
    const data: unknown = await response.json().catch(() => null);
    const acknowledgement = data && typeof data === "object" && !Array.isArray(data) ? data as Record<string, unknown> : null;
    if (!response.ok || !acknowledgement || (acknowledgement.ok !== true && acknowledgement.success !== true) || acknowledgement.ok === false || acknowledgement.success === false) {
      if (response.status === 429) return json({ ok: false, message: "The hospital booking service is busy. Please wait a moment or call our team for assistance." }, 503);
      return json({ ok: false, message: "The hospital could not confirm receipt of your request. Please call +91 800 900 2444 before submitting again." }, 502);
    }
    return json({ ok: true, message: "Your request has been received. The hospital team will confirm your visit." }, 200);
  } catch {
    return json({ ok: false, message: "We could not confirm receipt with the hospital service. Please call +91 800 900 2444 to check before submitting again." }, 502);
  }
}
