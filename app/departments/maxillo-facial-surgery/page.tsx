import Link from "next/link";

export default function MaxilloFacialSurgeryPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/maxillo-facial-surgery.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Maxillo Facial Surgery
          </h1>

          <p className="department-subtitle">
            Advanced surgical care for facial trauma,
            jaw correction, oral diseases, facial reconstruction,
            and cosmetic facial procedures with precision and expertise.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Maxillo Facial Surgery Department
            </h2>

            <p>
              The Maxillo Facial Surgery Department at Prathamaa Hospital
              specializes in the diagnosis, surgical treatment,
              and reconstruction of diseases, injuries, and defects
              involving the face, jaw, mouth, and neck region.
              Our department combines advanced surgical techniques
              with modern medical technology to provide safe,
              effective, and personalized care for every patient.
            </p>

            <p>
              Our experienced maxillofacial surgeons are trained
              in handling complex facial trauma, jaw deformities,
              oral infections, facial tumors, dental-related surgeries,
              and reconstructive procedures. We focus on restoring
              both function and appearance while ensuring patient
              comfort, safety, and faster recovery.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Facial Trauma & Injuries</div>
              <div>Jaw Fractures</div>
              <div>Wisdom Tooth Problems</div>
              <div>Facial Deformities</div>
              <div>Oral Infections</div>
              <div>TM Joint Disorders</div>
              <div>Facial Swelling</div>
              <div>Oral Tumors & Cysts</div>
              <div>Jaw Alignment Problems</div>
              <div>Congenital Facial Defects</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Facial Trauma Surgery</div>
              <div>Jaw Correction Surgery</div>
              <div>Dental Surgical Procedures</div>
              <div>Wisdom Tooth Extraction</div>
              <div>Facial Reconstruction</div>
              <div>Oral Biopsy Procedures</div>
              <div>TM Joint Treatment</div>
              <div>Cosmetic Facial Surgery</div>

            </div>

            <h2>
              Advanced Surgical Care
            </h2>

            <p>
              Our department uses advanced imaging systems,
              precision surgical instruments, and modern treatment
              methods to ensure accurate diagnosis and successful
              surgical outcomes. We focus on minimally invasive
              procedures whenever possible to reduce pain,
              minimize scarring, and support faster healing.
            </p>

            <p>
              The surgical team works closely with dental specialists,
              ENT experts, plastic surgeons, and anesthesiologists
              to provide comprehensive care for complex facial
              and oral conditions. Every treatment plan is carefully
              designed according to the individual needs of the patient.
            </p>

            <h2>
              Patient-Focused Recovery & Rehabilitation
            </h2>

            <p>
              At Prathamaa Hospital, patient recovery and comfort
              are given the highest priority. Our specialists provide
              detailed post-surgical guidance, rehabilitation support,
              pain management, and follow-up care to ensure
              smooth healing and long-term results.
            </p>

            <p>
              With experienced surgeons, advanced surgical facilities,
              modern operation theaters, and compassionate care,
              the Maxillo Facial Surgery Department at Prathamaa Hospital
              delivers trusted healthcare services focused on safety,
              precision, and patient satisfaction.
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