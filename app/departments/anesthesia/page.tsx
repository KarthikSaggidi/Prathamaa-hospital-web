import Link from "next/link";

export default function AnesthesiaPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/anesthesia.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Anesthesia
          </h1>

          <p className="department-subtitle">
            Safe and advanced anesthesia care for surgical,
            emergency, and critical procedures with
            expert monitoring and patient safety support.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Anesthesia Department
            </h2>

            <p>
              The Anesthesia Department at Prathamaa Hospital
              plays a vital role in ensuring safe and painless
              surgical procedures for patients of all age groups.
              Our experienced anesthesiologists provide advanced
              anesthesia care before, during, and after surgery
              with continuous patient monitoring and expert support.
            </p>

            <p>
              We focus on patient safety, pain management,
              and smooth recovery using modern anesthesia
              techniques and advanced monitoring equipment.
              Our department works closely with surgeons,
              critical care specialists, and nursing teams
              to provide complete perioperative care.
            </p>

            <h2>
              Conditions & Procedures We Support
            </h2>

            <div className="department-list">

              <div>General Surgeries</div>
              <div>Orthopedic Procedures</div>
              <div>Emergency Surgeries</div>
              <div>Pediatric Surgeries</div>
              <div>Gynecological Procedures</div>
              <div>Critical Care Support</div>
              <div>Pain Management</div>
              <div>Trauma & Accident Cases</div>
              <div>Laparoscopic Surgeries</div>
              <div>High-Risk Surgical Cases</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>General Anesthesia</div>
              <div>Regional Anesthesia</div>
              <div>Spinal Anesthesia</div>
              <div>Local Anesthesia</div>
              <div>Postoperative Pain Care</div>
              <div>ICU Monitoring Support</div>
              <div>Emergency Anesthesia</div>
              <div>Preoperative Evaluation</div>

            </div>

            <h2>
              Advanced Patient Monitoring
            </h2>

            <p>
              Our anesthesia department uses advanced
              monitoring systems to continuously track
              heart rate, oxygen levels, blood pressure,
              and breathing during surgical procedures.
              This ensures maximum patient safety and
              smooth anesthesia management throughout surgery.
            </p>

            <p>
              We carefully assess every patient before
              surgery to determine the safest anesthesia
              plan based on medical history, age,
              and health condition. Our specialists
              ensure patients remain comfortable and stable
              during all medical procedures.
            </p>

            <h2>
              Pain Management & Recovery Care
            </h2>

            <p>
              Effective pain management is an important
              part of recovery after surgery. Our department
              provides advanced pain relief methods to
              reduce discomfort and help patients recover
              faster after procedures.
            </p>

            <p>
              With experienced anesthesiologists,
              modern equipment, and dedicated critical
              care support, Prathamaa Hospital delivers
              safe, reliable, and high-quality anesthesia
              services with complete patient care and safety.
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
