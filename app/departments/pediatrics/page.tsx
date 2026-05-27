import Link from "next/link";

export default function PediatricsPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/pediatrics.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Pediatrics
          </h1>

          <p className="department-subtitle">
            Complete healthcare services for newborns,
            infants, children, and adolescents with
            compassionate pediatric care and advanced medical support.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Pediatrics Department
            </h2>

            <p>
              The Pediatrics Department at Prathamaa Hospital
              provides comprehensive healthcare services for
              children from birth through adolescence.
              Our experienced pediatricians focus on preventive
              healthcare, growth monitoring, vaccinations,
              nutritional guidance, and treatment of childhood illnesses.
            </p>

            <p>
              We understand that children require specialized
              medical attention in a friendly and comfortable
              environment. Our pediatric department combines
              modern medical facilities with compassionate care
              to ensure the health, safety, and well-being
              of every child.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Fever and Viral Infections</div>
              <div>Respiratory Problems</div>
              <div>Asthma and Allergies</div>
              <div>Nutrition Deficiencies</div>
              <div>Childhood Infections</div>
              <div>Growth Disorders</div>
              <div>Digestive Disorders</div>
              <div>Skin Conditions</div>
              <div>Vaccination Support</div>
              <div>Newborn Health Issues</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Child Health Checkups</div>
              <div>Vaccination Programs</div>
              <div>Growth Monitoring</div>
              <div>Nutrition Counseling</div>
              <div>Newborn Care</div>
              <div>Adolescent Healthcare</div>
              <div>Emergency Pediatric Care</div>
              <div>Developmental Assessments</div>

            </div>

            <h2>
              Advanced Pediatric Care
            </h2>

            <p>
              Our department is designed to create a
              child-friendly healthcare environment.
              We focus on accurate diagnosis, early treatment,
              and preventive healthcare to ensure children
              grow healthy and strong.
            </p>

            <p>
              We provide continuous monitoring of growth,
              developmental milestones, and nutritional
              health to support the overall development
              of children. Our specialists work closely
              with parents to provide guidance regarding
              vaccinations, diet, hygiene, and healthy lifestyles.
            </p>

            <h2>
              Modern Pediatric Facilities
            </h2>

            <p>
              Prathamaa Hospital is equipped with advanced
              pediatric diagnostic facilities, child-friendly
              consultation rooms, emergency care services,
              and experienced healthcare professionals
              dedicated to pediatric medicine.
            </p>

            <p>
              With advanced medical equipment, experienced
              pediatricians, and compassionate nursing staff,
              Prathamaa Hospital ensures the best medical
              care for every child with safety, comfort,
              and personalized attention.
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