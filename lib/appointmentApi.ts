export async function bookAppointment(data: {
  fullName: string;
  phone: string;
  age?: string;
  gender?: string;
  appointmentDate: string;
  appointmentTime: string;
  reason?: string;
}) {
  const res = await fetch("https://erp.prathamaahospital.in/api/public/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok || !json.ok) {
    throw new Error(json.message || "Failed to book appointment");
  }

  return json;
}
