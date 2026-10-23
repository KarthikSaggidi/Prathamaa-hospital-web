import { NextResponse } from "next/server";
import { departments } from "@/components/data";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ ok: false, message: "Please submit your request from our contact page." }, { status: 403 });
  }
  let body: Record<string, unknown>;
  try {
    if (Number(request.headers.get("content-length")) > 12000) {
      return NextResponse.json({ ok: false, message: "Your request is too long." }, { status: 413 });
    }
    const text = await request.text();
    if (text.length > 12000) return NextResponse.json({ ok: false, message: "Your request is too long." }, { status: 413 });
    body = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid request");
  } catch {
    return NextResponse.json({ ok: false, message: "Please provide a valid callback request." }, { status: 400 });
  }
  const fields = ["fullName", "email", "phone", "department", "message"] as const;
  const payload = Object.fromEntries(fields.map((field) => [field, typeof body[field] === "string" ? body[field].trim() : ""])) as Record<typeof fields[number], string>;
  const mobile = payload.phone.replace(/[\s()-]/g, "");
  if (payload.fullName.length < 2 || payload.fullName.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 254 || !/^(?:\+91)?[6-9]\d{9}$/.test(mobile) || !departments.some(({ slug }) => slug === payload.department) || payload.message.length < 10 || payload.message.length > 2000) {
    return NextResponse.json({ ok: false, message: "Please check your name, email, mobile number, department, and message (10–2,000 characters)." }, { status: 400 });
  }
  const endpoint = process.env.ERP_CALLBACK_URL;
  if (!endpoint) {
    return NextResponse.json({ ok: false, message: "Online callback requests are temporarily unavailable. Please call our hospital team for assistance." }, { status: 503 });
  }
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.ERP_CALLBACK_TOKEN ? { Authorization: `Bearer ${process.env.ERP_CALLBACK_TOKEN}` } : {}) },
      body: JSON.stringify({ ...payload, phone: mobile }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
      redirect: "error",
    });
    const data = await response.json();
    if (!response.ok || data?.ok === false || data?.success === false || (data?.ok !== true && data?.success !== true)) {
      return NextResponse.json({ ok: false, message: "The hospital could not confirm your callback request. Please try again or call our team." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "We could not reach the hospital service. Please try again or call our team." }, { status: 502 });
  }
}
