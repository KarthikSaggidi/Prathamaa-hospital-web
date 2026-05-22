import Image from "next/image";

import { Icon } from "@/components/Icons";

import logo from "@/assests/logo.jpg";

const departments = [

  {

    name: "General Medicine",

    icon: "hospital",

    description:

      "Comprehensive healthcare services for diagnosis, treatment, and prevention of common illnesses.",

  },

  {

    name: "Gynecology",

    icon: "gynecology",

    description:

      "Specialized care for women's reproductive health, pregnancy, and wellness.",

  },

  {

    name: "Plastic Surgery",

    icon: "user",

    description:

      "Advanced reconstructive and cosmetic procedures performed with precision and care.",

  },

  {

    name: "Women & Children Care",

    icon: "baby",

    description:

      "Dedicated healthcare services for mothers, infants, and children.",

  },

  {

    name: "Dermatology",

    icon: "star",

    description:

      "Expert treatment for skin, hair, and nail conditions using advanced technologies.",

  },

  {

    name: "Diabetics Care",

    icon: "heart",

    description:

      "Comprehensive diabetes management and lifestyle guidance for healthier living.",

  },

  {

    name: "General & Laparoscopic Surgery",

    icon: "plus",

    description:

      "Modern minimally invasive surgeries with faster recovery and precision care.",

  },

  {

    name: "Pediatrics",

    icon: "baby",

    description:

      "Complete healthcare services for infants, children, and adolescents.",

  },

  {

    name: "Anesthesia",

    icon: "clock",

    description:

      "Safe and effective anesthesia support for surgical and emergency procedures.",

  },

  {

    name: "Radiology",

    icon: "search",

    description:

      "Advanced imaging services including X-Ray, Ultrasound, and diagnostic scans.",

  },

  {

    name: "Medical Gastrology",

    icon: "activity",

    description:

      "Specialized treatment for digestive system disorders and gastrointestinal diseases.",

  },

  {

    name: "Implantology",

    icon: "grid",

    description:

      "Modern dental implant solutions for restoring healthy and confident smiles.",

  },

  {

    name: "Maxio Facial Surgery",

    icon: "user",

    description:

      "Expert surgical care for facial trauma, jaw correction, and oral conditions.",

  },

  {

    name: "Orthopedics Sports Medicine",

    icon: "bone",

    description:

      "Comprehensive bone, joint, and sports injury treatment with rehabilitation care.",

  },

];

export default function DepartmentsPage() {

  return (

    <main className="departments-page">

      <div className="container">

        <div className="departments-page-header">

          <div className="departments-page-logo">

            <Image

              src={logo}

              alt="Prathamaa Hospital"

              priority

            />

          </div>

          <h1>

            Our Departments

          </h1>

          <p>

            Explore the specialized

            healthcare departments

            available at Prathamaa

            Hospital with advanced

            medical facilities and

            experienced doctors.

          </p>

        </div>

        <div className="departments-list-grid">

          {departments.map(

            (department) => (

              <div

                className="department-box"

                key={

                  department.name

                }

              >

                <div className="department-icon">

                  <Icon

                    name={

                      department.icon

                    }

                    size={42}

                  />

                </div>

                <h3>

                  {department.name}

                </h3>

                <p>

                  {

                    department.description

                  }

                </p>

              </div>

            )

          )}

        </div>

      </div>

    </main>

  );

}