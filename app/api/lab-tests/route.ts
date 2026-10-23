import { handleBookingRequest } from "@/lib/booking-server";

export async function POST(request: Request) {
  return handleBookingRequest(request, "lab");
}
