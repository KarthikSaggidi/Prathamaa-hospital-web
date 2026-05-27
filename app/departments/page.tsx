import Link from "next/link";

import { Icon } from "@/components/Icons";

const departments = [

  {
    name: "Pediatrics",
    slug: "pediatrics",
    icon: "baby",
    description:
      "Complete healthcare services for infants, children, and adolescents.",
  },

  {
    name: "Gynaecology & Obstetrics",
    slug: "gynecology",
    icon: "gynecology",
    description:
      "Specialized care for women's reproductive health, pregnancy, and maternity wellness.",
  },

  {
    name: "General Surgery",
    slug: "general-laparoscopic-surgery",
    icon: "plus",
    description:
      "Advanced surgical procedures with modern laparoscopic and minimally invasive techniques.",
  },

  {
    name: "Anaesthesia",
    slug: "anesthesia",
    icon: "clock",
    description:
      "Safe and effective anesthesia support for surgical and emergency procedures.",
  },

  {
    name: "orthopedics-sports-medicine",
    slug: "orthopedics-sports-medicine",
    icon: "bone",
    description:
      "Comprehensive treatment for bones, joints, fractures, arthritis, and sports injuries.",
  },

  {
    name: "General Medicine",
    slug: "general-medicine",
    icon: "hospital",
    description:
      "Comprehensive healthcare services for diagnosis, treatment, and prevention of illnesses.",
  },

  {
    name: "Cardiology",
    slug: "cardiology",
    icon: "heart",
    description:
      "Advanced heart care services including ECG, cardiac diagnosis, and hypertension management.",
  },

  {
    name: "Urology",
    slug: "urology",
    icon: "activity",
    description:
      "Specialized care for urinary tract disorders and kidney-related conditions.",
  },

  {
    name: "Neurology",
    slug: "neurology",
    icon: "brain",
    description:
      "Expert diagnosis and treatment for brain, nerve, and spinal disorders.",
  },

  {
    name: "Nephrology",
    slug: "nephrology",
    icon: "activity",
    description:
      "Advanced kidney care and treatment for renal disorders and hypertension.",
  },

  {
    name: "Radiology",
    slug: "radiology",
    icon: "search",
    description:
      "Advanced imaging services including X-Ray, CT Scan, MRI, and Ultrasound.",
  },

  {
    name: "Dermatology",
    slug: "dermatology",
    icon: "star",
    description:
      "Expert skin, hair, and nail care treatments using advanced technologies.",
  },

  {
    name: "ENT",
    slug: "ent",
    icon: "activity",
    description:
      "Specialized treatment for ear, nose, throat, sinus, and hearing disorders.",
  },

  {
    name: "Maxillo Facial Surgery",
    slug: "maxillo-facial-surgery",
    icon: "user",
    description:
      "Expert surgical care for jaw correction, facial trauma, and oral conditions.",
  },

  {
    name: "Plastic Surgery",
    slug: "plastic-surgery",
    icon: "user",
    description:
      "Advanced cosmetic and reconstructive surgeries performed with precision and care.",
  },

  {
    name: "Dental Implantology",
    slug: "dental-implantology",
    icon: "grid",
    description:
      "Modern dental implant solutions for restoring healthy and confident smiles.",
  },

];

export default function DepartmentsPage() {

  return (

    <main className="departments-page">

      <div className="container">

        <div className="departments-page-header">

          <h1>
            Our Departments
          </h1>

          <p>
            Explore the specialized healthcare
            departments available at Prathamaa
            Hospital with advanced medical
            facilities, modern technologies,
            and experienced doctors dedicated
            to providing world-class patient care.
          </p>

        </div>

        <div className="departments-list-grid">

          {departments.map(
            (department) => (

              <Link
                href={`/departments/${department.slug}`}
                className="department-box"
                key={department.name}
              >

                <div className="department-icon">

                  <Icon
                    name={department.icon}
                    size={42}
                  />

                </div>

                <h3>
                  {department.name}
                </h3>

                <p>
                  {department.description}
                </p>

                <div className="department-read-more">

                  Learn More →

                </div>

              </Link>
            )
          )}

        </div>

      </div>

    </main>
  );
}