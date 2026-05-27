import Link from "next/link";

export default function GeneralSurgeryPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/general-surgery.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            General & Laparoscopic Surgery
          </h1>

          <p className="department-subtitle">
            Advanced surgical care with modern laparoscopic
            procedures, expert surgeons, faster recovery,
            and comprehensive treatment for various surgical conditions.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About General Surgery Department
            </h2>

            <p>
              The General & Laparoscopic Surgery Department
              at Prathamaa Hospital provides advanced surgical
              treatments using modern technologies and
              minimally invasive techniques. Our experienced
              surgeons specialize in diagnosing and treating
              a wide range of surgical conditions with
              precision, safety, and compassionate care.
            </p>

            <p>
              We focus on delivering effective surgical
              solutions with minimal pain, smaller incisions,
              reduced hospital stay, and faster recovery.
              Our department is equipped with advanced
              operation theaters and modern surgical
              equipment to ensure the highest standards
              of patient care.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Appendicitis</div>
              <div>Gallbladder Stones</div>
              <div>Hernia Treatment</div>
              <div>Piles & Fissures</div>
              <div>Abdominal Pain</div>
              <div>Thyroid Disorders</div>
              <div>Breast Disorders</div>
              <div>Gastrointestinal Problems</div>
              <div>Trauma & Injuries</div>
              <div>Minor & Major Surgeries</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Laparoscopic Surgery</div>
              <div>General Surgical Procedures</div>
              <div>Hernia Repair Surgery</div>
              <div>Gallbladder Surgery</div>
              <div>Appendix Surgery</div>
              <div>Emergency Surgical Care</div>
              <div>Post-Surgical Care</div>
              <div>Minimally Invasive Procedures</div>

            </div>

            <h2>
              Advanced Surgical Care
            </h2>

            <p>
              Our department specializes in laparoscopic
              and minimally invasive surgical techniques
              that help patients recover faster with
              less discomfort and reduced complications.
              We ensure precise diagnosis, safe surgical
              procedures, and continuous monitoring
              throughout the treatment process.
            </p>

            <p>
              Our surgical team works closely with
              anesthesiologists, nurses, and rehabilitation
              specialists to provide complete patient care
              before, during, and after surgery.
            </p>

            <h2>
              Modern Operation Theaters
            </h2>

            <p>
              Prathamaa Hospital is equipped with advanced
              modular operation theaters, modern laparoscopic
              equipment, and high-quality monitoring systems
              to support safe and efficient surgeries.
              We maintain strict sterilization protocols
              and international safety standards for every procedure.
            </p>

            <p>
              Our goal is to provide world-class surgical
              care with compassion, precision, and faster
              recovery so patients can return to their
              normal lives as quickly as possible.
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
