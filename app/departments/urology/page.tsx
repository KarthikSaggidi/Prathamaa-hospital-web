import Link from "next/link";

export default function UrologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/urology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Urology
          </h1>

          <p className="department-subtitle">
            Comprehensive urological care for kidney,
            urinary tract, bladder, and male reproductive
            health disorders with advanced diagnostic
            and surgical treatment facilities.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Urology Department
            </h2>

            <p>
              The Urology Department at Prathamaa Hospital
              specializes in the diagnosis, treatment,
              and management of disorders related to
              the urinary tract and male reproductive system.
              Our department provides advanced medical
              and surgical care using modern technologies,
              minimally invasive procedures,
              and personalized treatment plans.
            </p>

            <p>
              Our experienced urologists focus on providing
              effective treatment with patient comfort,
              privacy, and safety as top priorities.
              We offer specialized care for both men and women
              suffering from urinary system disorders,
              kidney conditions, bladder problems,
              and reproductive health concerns.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Kidney Stones</div>
              <div>Urinary Tract Infections</div>
              <div>Prostate Enlargement</div>
              <div>Bladder Disorders</div>
              <div>Kidney Infections</div>
              <div>Urinary Incontinence</div>
              <div>Male Infertility</div>
              <div>Blood in Urine</div>
              <div>Urinary Obstruction</div>
              <div>Urological Cancers</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Kidney Stone Treatment</div>
              <div>Urological Consultation</div>
              <div>Prostate Care</div>
              <div>Bladder Evaluation</div>
              <div>Minimally Invasive Surgery</div>
              <div>Urinary Infection Treatment</div>
              <div>Male Reproductive Care</div>
              <div>Preventive Urology Checkups</div>

            </div>

            <h2>
              Advanced Urological Care
            </h2>

            <p>
              Our urology department uses advanced imaging systems,
              diagnostic equipment,
              and modern surgical techniques
              to provide accurate diagnosis and effective treatment.
              We focus on minimally invasive procedures whenever possible
              to reduce pain, minimize hospital stay,
              and support faster patient recovery.
            </p>

            <p>
              The department works closely with nephrologists,
              radiologists, and surgical specialists
              to provide comprehensive and coordinated patient care.
              Our goal is to improve urinary health,
              restore normal function,
              and enhance the overall quality of life for every patient.
            </p>

            <h2>
              Patient-Centered Treatment & Recovery
            </h2>

            <p>
              At Prathamaa Hospital,
              patient education and preventive healthcare
              are considered essential parts of treatment.
              Our specialists guide patients regarding hydration,
              dietary management,
              lifestyle modifications,
              and follow-up care to prevent future complications.
            </p>

            <p>
              With experienced urologists,
              advanced surgical facilities,
              modern diagnostic support,
              and compassionate healthcare professionals,
              the Urology Department at Prathamaa Hospital
              delivers trusted, safe,
              and high-quality urological care services.
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