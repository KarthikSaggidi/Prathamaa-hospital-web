import Link from "next/link";

export default function DentalImplantologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/dental-implantology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Dental Implantology
          </h1>

          <p className="department-subtitle">
            Advanced dental implant treatments for restoring
            missing teeth, improving oral health, and creating
            confident, natural-looking smiles with expert dental care.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Dental Implantology Department
            </h2>

            <p>
              The Dental Implantology Department at Prathamaa
              Hospital provides advanced dental care solutions
              for patients with missing or damaged teeth.
              Our experienced dental specialists focus on
              restoring oral function, appearance, and confidence
              using modern implant techniques and advanced
              dental technologies.
            </p>

            <p>
              Dental implants are one of the most effective
              and long-lasting solutions for replacing missing
              teeth. Our department combines precision,
              safety, and personalized treatment planning
              to provide natural-looking and comfortable
              dental restorations for every patient.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Missing Teeth</div>
              <div>Damaged Teeth</div>
              <div>Tooth Loss</div>
              <div>Jaw Bone Problems</div>
              <div>Dental Infections</div>
              <div>Loose Dentures</div>
              <div>Gum Disorders</div>
              <div>Broken Teeth</div>
              <div>Oral Pain</div>
              <div>Smile Restoration</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Dental Implants</div>
              <div>Single Tooth Replacement</div>
              <div>Full Mouth Rehabilitation</div>
              <div>Cosmetic Dentistry</div>
              <div>Smile Designing</div>
              <div>Dental Consultation</div>
              <div>Teeth Cleaning</div>
              <div>Oral Health Checkups</div>

            </div>

            <h2>
              Advanced Implant Procedures
            </h2>

            <p>
              Our department uses modern implant technologies
              and high-quality dental materials to ensure
              safe and successful implant procedures.
              Dental implants are designed to function
              like natural teeth and provide long-term
              stability, comfort, and durability.
            </p>

            <p>
              We carefully evaluate every patient’s oral
              health condition before planning implant
              treatments. Our specialists provide
              personalized treatment plans based on
              jawbone structure, dental condition,
              and aesthetic requirements.
            </p>

            <h2>
              Modern Dental Care Facilities
            </h2>

            <p>
              Prathamaa Hospital is equipped with advanced
              dental equipment, digital imaging systems,
              sterilized treatment rooms, and modern
              implant technologies to provide safe and
              effective dental procedures.
            </p>

            <p>
              With experienced implantologists,
              skilled dental staff, and patient-focused
              care, Prathamaa Hospital ensures high-quality
              dental treatments with comfort, precision,
              and excellent long-term results.
            </p>

            <div className="department-buttons">

              <Link
                href="/appointment"
                className="primary-btn"
              >
                Book Appointment
              </Link>

              <Link
                href="/departments"
                className="secondary-btn"
              >
                Back to Departments
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}