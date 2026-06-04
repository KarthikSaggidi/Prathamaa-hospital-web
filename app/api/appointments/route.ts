import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Appointments API working",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(
      "Appointment Payload:",
      body
    );

    const response = await fetch(
      "https://erp.prathamaahospital.in/api/public/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    console.log(
      "ERP Response:",
      data
    );

    return NextResponse.json(data);

  } catch (error) {
    console.error(
      "ERP Connection Error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Unable to connect to ERP",
      },
      {
        status: 500,
      }
    );
  }
}