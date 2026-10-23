import { NextResponse } from "next/server";
import { handleBookingRequest } from "@/lib/booking-server";

export async function GET() {
  return NextResponse.json({ ok: true, message: "Appointments API working" });
}

export async function POST(request: Request) {
  return handleBookingRequest(request, "appointment");
}
