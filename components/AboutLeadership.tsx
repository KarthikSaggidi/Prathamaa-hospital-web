import Link from "next/link";
import founder from "@/assests/derived/doctor-karthik1.png";
import { doctorProfiles } from "@/lib/doctor-profiles";
import { DoctorPortrait } from "./DoctorPortrait";
import { Icon } from "./Icons";
import styles from "./AboutLeadership.module.css";

const principles = [
  { icon: "people", title: "Patient-Centered Approach", text: "Care with empathy, personal attention and respect." },
  { icon: "shieldCheck", title: "Ethical & Trusted Healthcare", text: "Clear communication and transparency at every step." },
  { icon: "lightbulb", title: "Innovation in Care", text: "Combining modern technology with medical expertise." },
  { icon: "heartOutline", title: "Stronger Communities", text: "A commitment to healthier individuals and families." },
];

const medicalDirector = doctorProfiles.find((doctor) => doctor.role === "Medical Director")!;
const leaders = [
  {
    name: "Dr. Karthik Manne",
    role: "Founder & Director",
    image: founder,
    description: "Leading Prathamaa Hospital with a vision to make quality healthcare accessible to every family.",
  },
  {
    name: medicalDirector.name,
    role: medicalDirector.role,
    image: medicalDirector.image,
    description: medicalDirector.qualifications,
  },
];

export function AboutLeadership() {
  return (
    <section className={styles.section} id="leadership" aria-labelledby="leadership-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Leadership with Purpose</p>
            <h2 id="leadership-title">A commitment to <em>better healthcare.</em></h2>
          </div>
          <p className={styles.sectionIntro}>Meet the people guiding Prathamaa Hospital’s approach to compassionate, ethical and patient-centered care.</p>
        </div>

        <div className={styles.grid}>
          <figure className={styles.founder}>
            <div className={styles.portraitFrame}>
              <DoctorPortrait
                image={founder}
                name="Dr. Karthik Manne, Founder and Director of Prathamaa Hospital"
                sizes="(max-width: 600px) 90vw, (max-width: 1000px) 420px, 35vw"
              />
            </div>
            <figcaption className={styles.identity}>
              <span className={styles.role}>Founder &amp; Director</span>
              <h3>Dr. Karthik Manne</h3>
              <p>Leading Prathamaa Hospital with a vision to make quality healthcare accessible to every family.</p>
              <span className={styles.location}><Icon name="location" size={16} />Prathamaa Hospital, Hyderabad</span>
            </figcaption>
          </figure>

          <div className={styles.copy}>
            <div className={styles.visionHeading}>
              <span className={styles.visionIcon}><Icon name="heartOutline" size={25} strokeWidth={1.7} /></span>
              <span>OUR FOUNDER’S VISION</span>
            </div>
            <h3 className={styles.visionTitle}>People at the heart<br className={styles.desktopBreak} /> of everything we do.</h3>

            <div className={styles.introduction}>
              <p>Under the leadership of Dr. Karthik Manne, Prathamaa Hospital is built on a simple belief — healthcare should be compassionate, ethical and accessible to every individual and family.</p>
              <p>We focus on combining medical expertise with a patient-first approach, modern technology and a culture of care to create healthier communities.</p>
            </div>

            <ul className={styles.principles} aria-label="Our leadership principles">
              {principles.map((principle) => (
                <li key={principle.title}>
                  <span className={styles.principleIcon}><Icon name={principle.icon} size={25} strokeWidth={1.7} /></span>
                  <div><h4>{principle.title}</h4><p>{principle.text}</p></div>
                </li>
              ))}
            </ul>

            <details className={styles.team}>
              <summary>Meet Our Leadership Team<Icon name="arrowRight" size={20} strokeWidth={1.8} /></summary>
              <div className={styles.teamPanel}>
                <div className={styles.teamHeading}>
                  <span>THE PEOPLE BEHIND OUR PURPOSE</span>
                  <h4>Meet our leadership</h4>
                </div>
                <div className={styles.teamGrid}>
                  {leaders.map((leader) => (
                    <article key={leader.name}>
                      <div className={styles.teamPhoto}><DoctorPortrait image={leader.image} name={leader.name} sizes="80px" compact /></div>
                      <div><h5>{leader.name}</h5><span>{leader.role}</span><p>{leader.description}</p></div>
                    </article>
                  ))}
                </div>
                <Link href="/doctors#medical-team">Get to know our medical team<Icon name="arrowRight" size={17} /></Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
