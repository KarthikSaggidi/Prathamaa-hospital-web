import { NextResponse } from "next/server";

const medicalData = [
  {
    title: "Fever",
    category: "Disease",
    department: "General Medicine",
    symptoms: [
      "High temperature",
      "Body pain",
      "Weakness",
      "Headache",
    ],
    causes:
      "Usually caused by viral or bacterial infections.",
    treatment:
      "Hydration, rest, paracetamol, and medical evaluation if persistent.",
  },

  {
    title: "Headache",
    category: "Symptom",
    department: "Neurology",
    symptoms: [
      "Head pain",
      "Nausea",
      "Eye strain",
    ],
    causes:
      "Stress, migraine, dehydration, sinus infection, or lack of sleep.",
    treatment:
      "Pain relief medication, hydration, sleep, and neurological consultation if severe.",
  },

  {
    title: "Chest Pain",
    category: "Symptom",
    department: "Cardiology",
    symptoms: [
      "Chest tightness",
      "Breathing difficulty",
      "Sweating",
    ],
    causes:
      "Heart disease, acidity, anxiety, or muscle strain.",
    treatment:
      "Immediate cardiac evaluation is recommended.",
  },

  {
    title: "Diabetes",
    category: "Disease",
    department: "Endocrinology",
    symptoms: [
      "Frequent urination",
      "Increased thirst",
      "Fatigue",
    ],
    causes:
      "High blood sugar due to insulin resistance or deficiency.",
    treatment:
      "Diet control, exercise, insulin therapy, and medications.",
  },

  {
    title: "Orthopedics",
    category: "Department",
    department: "Orthopedics",
    symptoms: [
      "Joint pain",
      "Bone fractures",
      "Muscle injuries",
    ],
    causes:
      "Sports injuries, arthritis, trauma, and aging.",
    treatment:
      "Physiotherapy, surgery, medications, and rehabilitation.",
  },

  {
    title: "Cardiology",
    category: "Department",
    department: "Cardiology",
    symptoms: [
      "Chest pain",
      "Palpitations",
      "Shortness of breath",
    ],
    causes:
      "Heart and blood vessel related disorders.",
    treatment:
      "ECG, angiography, medications, and cardiac procedures.",
  },
];

export async function GET(
  request: Request
) {

  const { searchParams } =
    new URL(request.url);

  const query =
    searchParams
      .get("query")
      ?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const filteredData =
    medicalData.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(query) ||
        item.department
          .toLowerCase()
          .includes(query) ||
        item.symptoms.some(
          (symptom) =>
            symptom
              .toLowerCase()
              .includes(query)
        )
    );

  return NextResponse.json(
    filteredData
  );
}
