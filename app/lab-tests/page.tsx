import Image from "next/image";
import logo from "@/assests/logo.png";

const tests = [
  "Complete Blood Count",
  "Blood Sugar Test",
  "MRI Scan",
  "CT Scan",
  "X-Ray",
  "Ultrasound",
  "ECG",
  "Thyroid Test",
];

export default function LabTestsPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="appointment-form-container">
          <div className="appointment-top">
            <div className="page-logo">
              <Image
                src={logo}
                alt="Prathamaa Diagnostics"
                priority
              />
            </div>

            <h1>Book a Lab Test</h1>

            <p>
              Book diagnostic tests and receive accurate reports from our
              advanced hospital laboratory.
            </p>
          </div>

          <form className="hospital-form">
            <div className="hospital-form-grid">
              <label>
                Full Name
                <input
                  type="text"
                  placeholder="Enter your full name"
                />
              </label>

              <label>
                Mobile Number
                <input
                  type="text"
                  placeholder="Enter phone number"
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  placeholder="Enter email"
                />
              </label>

              <label>
                Select Test
                <select>
                  <option>Select Lab Test</option>

                  {tests.map((test) => (
                    <option key={test}>{test}</option>
                  ))}
                </select>
              </label>

              <label>
                Preferred Date
                <input type="date" />
              </label>

              <label>
                Preferred Time
                <input type="time" />
              </label>
            </div>

            <label className="full-width-field">
              Additional Notes
              <textarea
                rows={6}
                placeholder="Additional information"
              />
            </label>

            <button type="submit" className="hospital-submit-btn">
              Book Test
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}