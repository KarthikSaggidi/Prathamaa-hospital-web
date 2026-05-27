import Link from "next/link";

export default function GynecologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/gynecology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Gynecology
          </h1>

          <p className="department-subtitle">
            Specialized women’s healthcare services for
            pregnancy care, reproductive health,
            fertility treatments, and advanced gynecological care.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Gynecology Department
            </h2>

            <p>
              The Gynecology Department at Prathamaa Hospital
              provides comprehensive healthcare services for
              women of all age groups. Our experienced
              gynecologists focus on preventive healthcare,
              reproductive wellness, pregnancy management,
              fertility support, and advanced gynecological
              treatments with compassionate care.
            </p>

            <p>
              We understand the importance of women’s health
              at every stage of life. From adolescence to
              pregnancy and menopause, our specialists
              provide personalized treatment plans,
              modern diagnostics, and continuous medical
              support in a safe and comfortable environment.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Pregnancy Care</div>
              <div>Menstrual Disorders</div>
              <div>PCOD & PCOS</div>
              <div>Infertility Problems</div>
              <div>Hormonal Imbalance</div>
              <div>Menopause Management</div>
              <div>Uterine Disorders</div>
              <div>Pelvic Pain</div>
              <div>Ovarian Cysts</div>
              <div>Gynecological Infections</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Antenatal Care</div>
              <div>Pregnancy Scans</div>
              <div>Normal Delivery Care</div>
              <div>High-Risk Pregnancy Care</div>
              <div>Women Health Checkups</div>
              <div>Fertility Counseling</div>
              <div>Ultrasound Services</div>
              <div>Postnatal Care</div>

            </div>

            <h2>
              Advanced Women Healthcare
            </h2>

            <p>
              Our department is equipped with advanced
              medical technologies and modern facilities
              for accurate diagnosis and effective treatment.
              We provide complete maternity care, fertility
              guidance, minimally invasive procedures,
              and preventive screenings to support
              women’s long-term health.
            </p>

            <p>
              With experienced gynecologists, skilled
              nursing staff, and patient-focused care,
              Prathamaa Hospital ensures safe, reliable,
              and high-quality healthcare services for women
              with dignity, privacy, and compassion.
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