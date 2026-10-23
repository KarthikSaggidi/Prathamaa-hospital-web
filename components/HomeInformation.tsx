import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import styles from "./HomeInformation.module.css";

const patientEducation = "https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/";
const hospitalValues = [
  { icon: "heartOutline", title: "Compassion", text: "Listening to people, with care and respect." },
  { icon: "people", title: "Collaboration", text: "Medical expertise across connected specialties." },
  { icon: "shieldCheck", title: "Trust", text: "Clear communication and ethical practice." },
];
const diagnosticApproach = [
  { icon: "stethoscope", title: "Understanding the person", text: "Symptoms, health history and examination findings provide context for a clinical assessment." },
  { icon: "xray", title: "Building the clinical picture", text: "Relevant laboratory findings and imaging add information to help clinicians investigate a concern." },
  { icon: "notes", title: "Interpreting findings together", text: "Results are considered alongside the clinical picture to inform care planning and monitoring." },
];
const carePrinciples = [
  "Listening to patients and families",
  "Explaining care in understandable language",
  "Respecting privacy and individual needs",
  "Bringing specialties together around care",
];
const questions = [
  { question: "What does multispeciality care mean?", answer: <p>It brings different areas of medical expertise within one hospital. At Prathamaa Hospital, departments cover areas such as general medicine, children’s health, women’s health, surgery and other specialties, with diagnostic support connecting different parts of care. <Link href="/departments">Learn about our departments.</Link></p> },
  { question: "How are diagnostic results understood?", answer: <p>Clinical history, examination and relevant findings are considered together. A report needs clinical context, and a doctor can explain what its findings mean for an individual person.</p> },
  { question: "What guides the hospital’s approach to patient care?", answer: <p>Our approach is guided by compassion, clear communication, patient safety and ethical practice. We aim to make patients and families feel heard, respected and involved in conversations about care.</p> },
  { question: "How do different departments support one another?", answer: <p>Specialists bring different perspectives to a patient’s care. Diagnostic information can support clinical assessment, while medical, surgical and supportive services contribute to an overall care plan according to the patient’s needs.</p> },
  { question: "What is Prathamaa Hospital’s connection to Hyderabad?", answer: <p>Prathamaa Hospital is based in Hyderabad, Telangana, with a focus on compassionate healthcare for individuals and families. <Link href="/about">Read about the hospital, its leadership and its values.</Link></p> },
];

export function HomeInformation() {
  return (
    <div className={styles.information}>
      <section className={styles.overview} id="home-hospital" aria-labelledby="home-hospital-title">
        <div className={styles.hospitalVisual}>
          <Image src="/images/footer-hospital-sunset.png" alt="Architectural illustration of Prathamaa Hospital in warm evening light" fill sizes="(max-width: 850px) 92vw, 42vw" />
          <div className={styles.photoShade} />
          <span className={styles.photoTag}><Icon name="location" size={17} />HYDERABAD, TELANGANA</span>
          <div className={styles.photoCaption}><span className={styles.captionIcon}><Icon name="heartOutline" size={26} /></span><div><strong>Medicine with a human touch.</strong><p>Compassion, expertise and an understanding of what matters to people.</p></div></div>
        </div>
        <div className={styles.overviewCopy}>
          <span className={styles.eyebrow}>GET TO KNOW PRATHAMAA</span>
          <h2 id="home-hospital-title">Rooted in Hyderabad.<br /><span>Focused on people.</span></h2>
          <p>Prathamaa Hospital brings multispeciality medical care, diagnostic services and emergency support together in Hyderabad, Telangana. Our focus is to combine medical expertise with clear communication and attention to the person receiving care.</p>
          <p>From general health and family care to specialist treatment, our departments connect different areas of expertise. The aim is a considered approach that reflects each patient’s needs.</p>
          <div className={styles.values}>{hospitalValues.map((value) => <div key={value.title}><span><Icon name={value.icon} size={22} strokeWidth={1.7} /></span><h3>{value.title}</h3><p>{value.text}</p></div>)}</div>
          <Link href="/about" className={styles.textLink}>Discover our story & values<Icon name="arrowRight" size={17} /></Link>
        </div>
      </section>

      <section className={styles.diagnostics} id="home-diagnostics" aria-labelledby="home-diagnostics-title">
        <div className={styles.diagnosticCopy}>
          <span className={styles.eyebrow}>UNDERSTANDING DIAGNOSIS</span>
          <h2 id="home-diagnostics-title">Every finding matters.<br /><span>The whole picture matters more.</span></h2>
          <p>Diagnosis brings information together. A clinician considers a person’s symptoms, health history and examination, alongside appropriate investigations, to understand a health concern.</p>
          <div className={styles.diagnosticApproach}>{diagnosticApproach.map((item) => <div key={item.title}><span className={styles.approachIcon}><Icon name={item.icon} size={23} strokeWidth={1.7} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div>
          <div className={styles.educationNote}><Icon name="notes" size={17} /><div><p>A report is one part of a clinical assessment, rather than a diagnosis on its own.</p><a href={patientEducation} target="_blank" rel="noopener noreferrer">Patient education from MedlinePlus<Icon name="arrowRight" size={14} /></a></div></div>
        </div>
        <div className={styles.labVisual}>
          <Image src="/images/booking-lab-care.png" alt="Laboratory care illustration showing a professional examining a sample" fill sizes="(max-width: 850px) 92vw, 42vw" />
          <div className={styles.photoShade} />
          <span className={styles.photoTag}><Icon name="flask" size={17} />DIAGNOSTIC INFORMATION</span>
          <div className={styles.photoCaption}><span className={styles.captionIcon}><Icon name="brain" size={26} /></span><div><strong>Information, understood in context.</strong><p>Clinical assessment and diagnostic findings belong in the same conversation.</p></div></div>
        </div>
      </section>

      <section className={styles.support} id="home-faqs" aria-labelledby="home-faqs-title">
        <div className={styles.faqColumn}>
          <span className={styles.eyebrow}>UNDERSTANDING OUR HOSPITAL</span>
          <h2 id="home-faqs-title">A closer look<br /><span>at how we care.</span></h2>
          <p className={styles.faqIntro}>Learn about multispeciality healthcare, the role of diagnostics and the values behind our approach.</p>
          <div className={styles.faqList}>{questions.map((item, index) => <details key={item.question} className={styles.faq} name="home-hospital-questions" open={index === 0}><summary><span className={styles.questionNumber}>0{index + 1}</span><span>{item.question}</span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.answer}>{item.answer}</div></details>)}</div>
        </div>
        <aside className={styles.charter} id="home-care-principles" aria-labelledby="home-care-principles-title">
          <div className={styles.charterTop}><span className={styles.charterIcon}><Icon name="heartOutline" size={30} strokeWidth={1.6} /></span><span className={styles.eyebrow}>THE PERSON BEHIND THE CARE</span><h3 id="home-care-principles-title">Care with dignity.<br />Care with understanding.</h3><p>Medical needs are only one part of a person’s experience. The way care is explained and delivered matters, too.</p></div>
          <div className={styles.charterBody}><ul>{carePrinciples.map((principle) => <li key={principle}><span><Icon name="check" size={14} strokeWidth={2.5} /></span>{principle}</li>)}</ul><p>These principles reflect our commitment to a thoughtful, patient-centered hospital environment.</p><Link href="/about">More about our approach<Icon name="arrowRight" size={16} /></Link></div>
        </aside>
      </section>
    </div>
  );
}
