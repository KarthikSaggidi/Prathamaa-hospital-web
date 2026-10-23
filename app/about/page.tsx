import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/seo-pages";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { AboutLeadership } from "@/components/AboutLeadership";
import { JsonLd } from "@/components/JsonLd";
import { pageStructuredData } from "@/lib/structured-data";
import { departments, quickStats } from "@/components/data";
import { Icon } from "@/components/Icons";
import styles from "./about.module.css";

const aboutFont = localFont({
  src: "../../public/fonts/Manrope-Variable.ttf",
  variable: "--font-about",
  display: "swap",
  weight: "200 800",
});

export const metadata = pageMetadata(pages.about);

const values = [
  { icon: "heartOutline", title: "Compassion", text: "Listening with empathy and treating every patient and family with dignity and respect." },
  { icon: "people", title: "Collaboration", text: "Bringing medical expertise together across specialties for a more connected care experience." },
  { icon: "shieldCheck", title: "Integrity", text: "Building trust through ethical practice, patient safety and clear, honest communication." },
  { icon: "lightbulb", title: "Progress", text: "Combining modern medical technology with thoughtful, personal attention to patient care." },
];

const commitments = [
  "Experienced professionals across medical specialties",
  "Modern infrastructure to support coordinated care",
  "Patient-first communication at every stage",
];

const careSteps = [
  { title: "We listen first.", text: "Your concerns, questions and personal circumstances help us understand what matters to you." },
  { title: "We connect the right expertise.", text: "Our medical team brings together assessment, specialist knowledge and an individual approach to care." },
  { title: "We make the next step clearer.", text: "We believe you should understand your care options, ask questions and feel supported along the way." },
];

export default function AboutPage() {
  return (
    <div className={`${styles.page} ${aboutFont.variable}`}>
      <JsonLd data={pageStructuredData(pages.about, "AboutPage")} />
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={styles.heroBackdrop} aria-hidden="true">
          <Image src="/images/departments-hero.png" alt="" fill preload sizes="100vw" />
        </div>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><Icon name="chevronRight" size={12} /><span aria-current="page">About us</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.sectionLabel}>THE PEOPLE BEHIND YOUR CARE</span>
              <h1 id="about-hero-title">Advanced care.<br />A deeply <em>human touch.</em></h1>
              <p>Medical expertise matters. So does feeling understood. At Prathamaa Hospital, we bring both together to care for you and the people you love.</p>
              <div className={styles.heroActions}>
                <a href="#our-story" className={styles.primary}>Discover our story<Icon name="arrowRight" size={19} /></a>
                <Link href="/doctors" className={styles.secondary}><Icon name="doctor" size={20} />Meet our doctors</Link>
              </div>
              <div className={styles.heroLocation}>
                <span><Icon name="location" size={20} /></span>
                <p>Rooted in Hyderabad.<strong>Here for every stage of life.</strong></p>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.carePhoto}>
                <Image src="/images/contact-hero.png" alt="A reassuring moment between a doctor and a young patient" fill preload sizes="(max-width: 800px) 90vw, 44vw" />
              </div>
              <span className={styles.photoBadge}><Icon name="shieldCheck" size={18} />Care centered around you</span>
              <div className={styles.photoCaption}>
                <span className={styles.captionIcon}><Icon name="heartOutline" size={28} strokeWidth={1.6} /></span>
                <div><small>OUR EVERYDAY COMMITMENT</small><strong>People first. Always.</strong><p>Compassion in the moments that matter.</p></div>
              </div>
            </div>
          </div>

          <div className={styles.stats} aria-label="Hospital at a glance">
            {quickStats.map((stat) => (
              <div key={stat.label}>
                <span className={styles.statIcon}><Icon name={stat.icon} size={27} strokeWidth={1.7} /></span>
                <div><strong>{stat.value}</strong><span>{stat.label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutLeadership />

      <section id="our-story" className={styles.story} aria-labelledby="story-title">
        <div className={`${styles.container} ${styles.storyGrid}`}>
          <div className={styles.storyVisual}>
            <Image src="/images/departments-hero.png" alt="An illustration of a bright, welcoming hospital reception" fill sizes="(max-width: 800px) 90vw, 43vw" />
            <span className={styles.imageLabel}><Icon name="location" size={16} />HYDERABAD, TELANGANA</span>
            <div className={styles.storyPhotoCaption}><span>ONE HOSPITAL. MANY WAYS TO CARE.</span><strong>A welcoming space.<br />A caring approach.</strong></div>
          </div>

          <div className={styles.storyCopy}>
            <span className={styles.sectionLabel}>OUR STORY</span>
            <h2 id="story-title">Many specialties.<br />One shared <em>purpose.</em></h2>
            <p className={styles.intro}>Healthcare is personal.<br />We believe your experience should be, too.</p>
            <p>Prathamaa Hospital is a multispeciality hospital in Hyderabad, Telangana, dedicated to combining experienced medical professionals, modern technology and compassionate patient care.</p>
            <p>From everyday health concerns to specialist consultations, surgical care and emergency support, our focus is on helping patients and families navigate their care with confidence.</p>
            <ul className={styles.commitments}>{commitments.map((commitment) => <li key={commitment}><span><Icon name="check" size={14} /></span>{commitment}</li>)}</ul>
            <Link href="/departments" className={styles.textLink}>Explore our {departments.length} departments<Icon name="arrowRight" size={19} /></Link>
          </div>
        </div>
      </section>

      <section className={styles.purpose} id="our-purpose" aria-labelledby="purpose-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionLabel}>WHAT GUIDES US</span><h2 id="purpose-title">A clear vision.<br />A meaningful <em>mission.</em></h2></div>
            <p>Our purpose shapes the decisions we make, the way we care and the relationships we build with our community.</p>
          </div>
          <div className={styles.purposeGrid}>
            <article className={styles.visionCard}>
              <div className={styles.purposeCardTop}><span className={styles.cardIcon}><Icon name="search" size={30} strokeWidth={1.6} /></span><span className={styles.cardNumber}>01 / LOOKING AHEAD</span></div>
              <h3>Our vision</h3>
              <p>To become one of the most trusted and innovative healthcare providers, offering quality treatment, advanced technology and ethical care.</p>
              <span className={styles.cardFooter}>A HEALTHIER TOMORROW, TOGETHER<Icon name="arrowRight" size={17} /></span>
            </article>
            <article className={styles.missionCard}>
              <div className={styles.purposeCardTop}><span className={styles.cardIcon}><Icon name="heartOutline" size={30} strokeWidth={1.6} /></span><span className={styles.cardNumber}>02 / EVERY DAY</span></div>
              <h3>Our mission</h3>
              <p>To provide accessible, affordable and high-quality healthcare while keeping patient safety, trust and medical excellence at the center of our work.</p>
              <span className={styles.cardFooter}>MAKING A DIFFERENCE THROUGH CARE<Icon name="arrowRight" size={17} /></span>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.values} aria-labelledby="values-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionLabel}>THE PRATHAMAA APPROACH</span><h2 id="values-title">The difference is<br />in <em>how we care.</em></h2></div>
            <p>Shared values connect the expertise of our teams with the needs of the people we serve.</p>
          </div>
          <div className={styles.valueGrid}>
            {values.map((value, index) => <article key={value.title}><span className={styles.valueNumber}>0{index + 1}</span><span className={styles.valueIcon}><Icon name={value.icon} size={27} strokeWidth={1.6} /></span><h3>{value.title}</h3><p>{value.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.experience} aria-labelledby="experience-title">
        <div className={`${styles.container} ${styles.experienceGrid}`}>
          <div className={styles.experienceCopy}>
            <span className={styles.sectionLabel}>MORE THAN MEDICAL EXPERTISE</span>
            <h2 id="experience-title">Care that starts<br />with <em>understanding.</em></h2>
            <p>A good healthcare experience is built on more than a treatment plan. It also means feeling heard, knowing what comes next and having people you can turn to.</p>
            <div className={styles.carePromise}><Icon name="heartOutline" size={27} strokeWidth={1.6} /><p>Personal attention.<br /><strong>A shared commitment to your well-being.</strong></p></div>
          </div>
          <ol className={styles.careSteps}>{careSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="visit-title">
        <div className={`${styles.container} ${styles.visit}`}>
          <div className={styles.visitCopy}>
            <span className={styles.sectionLabel}>HERE WHEN YOU NEED US</span>
            <h2 id="visit-title">Let’s take care<br />of <em>what matters.</em></h2>
            <p>Whether you’re looking for a specialist or have a question about visiting Prathamaa Hospital, our team is here to help you find your way.</p>
            <div className={styles.visitActions}><Link href="/contact" className={styles.primary}>Talk to our team<Icon name="arrowRight" size={19} /></Link><a href="tel:+918009002444" className={styles.callLink}><Icon name="phone" size={20} /><span>Call the hospital<strong>+91 800 900 2444</strong></span></a></div>
            <Link href="/appointment" className={styles.textLink}>Ready to plan a consultation?<Icon name="arrowRight" size={17} /></Link>
          </div>
          <div className={styles.visitPhoto}>
            <Image src="/images/footer-hospital-sunset.png" alt="An architectural illustration of Prathamaa Hospital" fill sizes="(max-width: 800px) 90vw, 42vw" />
            <span><Icon name="location" size={17} />Prathamaa Hospital, Hyderabad</span>
          </div>
        </div>
      </section>
    </div>
  );
}
