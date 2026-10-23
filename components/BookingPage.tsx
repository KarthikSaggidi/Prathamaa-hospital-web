"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import { departments } from "./data";
import { Icon } from "./Icons";
import { availableDoctors, bookingPrefill, bookingRequestPayload, diagnosticTests, emptyBooking, hospitalDateTime, patientFields, validateBooking, type BookingErrors, type BookingKind, type BookingValues } from "@/lib/booking";
import styles from "./BookingPage.module.css";

const advantages = [
  { icon: "people", title: "Experienced Specialists", text: "Connect with our dedicated healthcare team.", tone: "orange" },
  { icon: "shieldCheck", title: "Personalized Care", text: "Patient-focused and compassionate treatment.", tone: "blue" },
  { icon: "clock", title: "Quick & Easy Booking", text: "Request your preferred visit in minutes.", tone: "green" },
  { icon: "heart", title: "Your Health, Our Priority", text: "Thoughtful care for you and your family.", tone: "pink" },
];
const benefits = [
  { icon: "calendar", title: "Easy Booking", text: "A few details. A simpler visit.", tone: "orange" },
  { icon: "shieldCheck", title: "Personal Care", text: "Support from our hospital team", tone: "blue" },
  { icon: "clock", title: "Team Confirmation", text: "We confirm your preferred visit", tone: "orange" },
  { icon: "heart", title: "Better Care", text: "For a healthier tomorrow", tone: "pink" },
];

export function BookingPage({ kind }: { kind: BookingKind }) {
  const lab = kind === "lab";
  const [values, setValues] = useState<BookingValues>({ ...emptyBooking });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [today, setToday] = useState("");
  const [receipt, setReceipt] = useState<BookingValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const relevantDoctors = availableDoctors(values.department);
  const selectedTest = diagnosticTests.find((item) => item.name === values.test);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setValues((current) => ({ ...current, ...bookingPrefill(new URLSearchParams(window.location.search)) }));
      setToday(hospitalDateTime().date);
    });
    const updateDate = () => setToday(hospitalDateTime().date);
    const timer = window.setInterval(updateDate, 60000);
    document.addEventListener("visibilitychange", updateDate);
    return () => { cancelAnimationFrame(frame); clearInterval(timer); document.removeEventListener("visibilitychange", updateDate); };
  }, []);
  useEffect(() => { if (receipt) confirmationRef.current?.focus(); }, [receipt]);

  function update(field: keyof BookingValues, value: string) {
    setValues((current) => ({ ...current, [field]: value, ...(field === "department" ? { doctor: availableDoctors(value).some((doctor) => doctor.bookingName === current.doctor) ? current.doctor : "" } : {}) }));
    setErrors((current) => ({ ...current, [field]: undefined, ...(field === "department" ? { doctor: undefined } : {}) }));
    if (status === "error") { setStatus("idle"); setMessage(""); }
  }
  function focusField(field: keyof BookingValues) {
    const input = formRef.current?.elements.namedItem(field);
    if (input instanceof HTMLElement) input.focus();
  }
  function goToDetails() {
    if (status === "success") return;
    const issues = validateBooking(kind, values);
    const patientErrors = Object.fromEntries(patientFields.filter((field) => issues[field]).map((field) => [field, issues[field]]));
    if (Object.keys(patientErrors).length) { setErrors((current) => ({ ...current, ...patientErrors })); focusField(patientFields.find((field) => issues[field])!); setStep(1); }
    else { setStep(2); focusField(lab ? "test" : "department"); }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const issues = validateBooking(kind, values);
    setErrors(issues);
    if (Object.keys(issues).length) {
      const field = Object.keys(issues)[0] as keyof BookingValues;
      setStep(patientFields.includes(field) ? 1 : 2); focusField(field); return;
    }
    busy.current = true; setStatus("sending"); setMessage(""); setStep(2);
    try {
      const response = await fetch(lab ? "/api/lab-tests" : "/api/appointments", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingRequestPayload(kind, values)), signal: AbortSignal.timeout(22000),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.ok !== true) {
        if (data?.errors && typeof data.errors === "object") {
          const serverErrors: BookingErrors = {};
          for (const [field, error] of Object.entries(data.errors)) if (field in emptyBooking && typeof error === "string") serverErrors[field as keyof BookingValues] = error;
          setErrors(serverErrors);
          const first = Object.keys(serverErrors)[0] as keyof BookingValues | undefined;
          if (first) { focusField(first); setStep(patientFields.includes(first) ? 1 : 2); }
        }
        throw new Error(typeof data?.message === "string" ? data.message : "We could not confirm receipt. Please call our team before sending another request.");
      }
      setReceipt({ ...values }); setStatus("success"); setStep(3);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "We could not confirm receipt. Please call +91 800 900 2444 to check before submitting again.");
    } finally { busy.current = false; }
  }
  function field(label: string, name: keyof BookingValues, icon: string, control: ReactNode, required = false) {
    return <div className={styles.field}><label htmlFor={`booking-${name}`}>{label}{required && <span className={styles.required}> *</span>}</label><div className={`${styles.inputWrap} ${errors[name] ? styles.invalid : ""}`}><Icon name={icon} size={19} />{control}</div>{errors[name] && <span id={`booking-${name}-error`} className={styles.fieldError}>{errors[name]}</span>}</div>;
  }
  const props = (name: keyof BookingValues) => ({ id: `booking-${name}`, name, value: values[name], onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => update(name, event.target.value), "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `booking-${name}-error` : undefined });

  return (
    <div className={styles.page}>
      <Lotus className={styles.lotusLeft} /><Lotus className={styles.lotusRight} />
      <header className={styles.intro}><span className={styles.eyebrow}>{lab ? "DIAGNOSTIC CARE" : "APPOINTMENT"}</span><h1>{lab ? <>Book a <span>Lab Test</span></> : <>Book an <span>Appointment</span></>}</h1><p>{lab ? "Request a test or scan with our diagnostics team. Let’s make your next step in care easier." : "Fill out the form below to schedule your consultation with our expert healthcare specialists."}</p></header>
      <nav className={styles.steps} aria-label="Booking progress"><ol>{["Your Details", lab ? "Test Details" : "Appointment", "Confirmation"].map((label, index) => <li key={label} className={step === index + 1 ? styles.currentStep : step > index + 1 ? styles.completedStep : ""} aria-current={step === index + 1 ? "step" : undefined}><button type="button" disabled={status === "sending" || (index === 2 && status !== "success")} onClick={() => {
        if (status === "success") { confirmationRef.current?.focus(); return; }
        if (index === 0) { setStep(1); focusField("fullName"); } else if (index === 1) goToDetails();
      }}><span>{step > index + 1 ? <Icon name="check" size={16} /> : index + 1}</span>{label}</button></li>)}</ol></nav>
      <div className={styles.shell}>
        {receipt ? <div className={styles.confirmation} ref={confirmationRef} tabIndex={-1} aria-labelledby="booking-received-title"><span className={styles.successIcon}><Icon name="check" size={33} /></span><span className={styles.eyebrow}>THANK YOU FOR CHOOSING PRATHAMAA</span><h2 id="booking-received-title">Your {lab ? "test" : "appointment"} request<br /><span>has been received.</span></h2><p>Thank you, {receipt.fullName}. Our hospital team will contact you to confirm availability and arrange your visit.</p><div className={styles.receipt}><span className={styles.pending}><span /> Awaiting hospital confirmation</span><dl><div><dt>{lab ? "Requested test" : "Department"}</dt><dd>{lab ? receipt.test : departments.find((item) => item.slug === receipt.department)?.name}</dd></div>{!lab && receipt.doctor && <div><dt>Preferred doctor</dt><dd>{receipt.doctor}</dd></div>}<div><dt>Preferred date</dt><dd>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date(`${receipt.appointmentDate}T12:00:00+05:30`))}</dd></div><div><dt>Preferred time</dt><dd>{receipt.appointmentTime} IST</dd></div><div><dt>Contact number</dt><dd>{receipt.mobile}</dd></div></dl></div><p className={styles.confirmationNote}>Your preferred date and time are subject to hospital confirmation. For help with your request, call <a href="tel:+918009002444">+91 800 900 2444</a>.</p><div className={styles.confirmationActions}><Link href="/">Return home <Icon name="arrowRight" size={17} /></Link><button type="button" onClick={() => { setReceipt(null); setValues({ ...emptyBooking }); setStatus("idle"); setStep(1); requestAnimationFrame(() => focusField("fullName")); }}>Make another request</button></div></div> : <form ref={formRef} className={styles.form} onSubmit={submit} noValidate aria-busy={status === "sending"}>
          <fieldset disabled={status === "sending"} className={styles.formFields}>
            <section className={styles.formSection} aria-labelledby="patient-information-title" onFocusCapture={() => setStep(1)}><SectionTitle icon="user" title="Patient Information" subtitle="Tell us about yourself" id="patient-information-title" /><div className={styles.fieldsGrid}>
              {field("Full Name", "fullName", "user", <input {...props("fullName")} autoComplete="name" placeholder="Enter your full name" minLength={2} maxLength={100} required />, true)}
              {field("Mobile Number", "mobile", "phone", <input {...props("mobile")} type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter your mobile number" maxLength={18} required />, true)}
              {field("Email Address", "email", "mail", <input {...props("email")} type="email" autoComplete="email" placeholder="Enter your email address" maxLength={254} />)}
              {field("Gender", "gender", "people", <select {...props("gender")} required><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select>, true)}
            </div></section>
            <section className={styles.formSection} aria-labelledby="appointment-details-title" onFocusCapture={() => { if (!patientFields.some((name) => validateBooking(kind, values)[name])) setStep(2); }}><SectionTitle icon={lab ? "flask" : "calendar"} title={lab ? "Test & Visit Details" : "Appointment Details"} subtitle={lab ? "Choose your test and preferred visit" : "Choose your department, doctor and preferred time"} id="appointment-details-title" /><div className={styles.fieldsGrid}>
              {lab ? <>{field("Select Test / Scan", "test", "flask", <select {...props("test")} required><option value="">Select a test or scan</option>{["Lab test", "Imaging", "Cardiac diagnostics"].map((category) => <optgroup label={category} key={category}>{diagnosticTests.filter((item) => item.category === category).map((item) => <option key={item.name}>{item.name}</option>)}</optgroup>)}</select>, true)}<div className={styles.field}><label htmlFor="booking-service">Service Type</label><div className={styles.inputWrap}><Icon name="notes" size={19} /><input id="booking-service" value={selectedTest?.category || "Choose a test to see the service"} readOnly /></div></div></> : <>{field("Department", "department", "stethoscope", <select {...props("department")} required><option value="">Select department</option>{departments.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select>, true)}{field("Preferred Doctor", "doctor", "doctor", <select {...props("doctor")}><option value="">No preference (optional)</option>{relevantDoctors.map((doctor) => <option key={doctor.bookingName}>{doctor.bookingName}</option>)}</select>)}</>}
              {field(lab ? "Preferred Date" : "Appointment Date", "appointmentDate", "calendar", <input {...props("appointmentDate")} type="date" min={today || undefined} required />, true)}
              {field(lab ? "Preferred Time" : "Appointment Time", "appointmentTime", "clock", <input {...props("appointmentTime")} type="time" required />, true)}
            </div><p className={styles.preferenceNote}><Icon name="clock" size={13} /> All times are in IST. Our team will confirm availability.{lab && " Test preparation details will be shared by the hospital team."}</p></section>
            <section className={`${styles.formSection} ${styles.notesSection}`} aria-labelledby="booking-notes-title"><SectionTitle icon="notes" title={lab ? "Additional Notes" : "Symptoms / Health Problems"} subtitle={lab ? "Share any details that may help us arrange your visit" : "Help us understand your concern better"} id="booking-notes-title" /><label htmlFor="booking-symptoms" className={styles.srOnly}>{lab ? "Additional notes" : "Symptoms or reason for your visit"}</label><textarea {...props("symptoms")} rows={4} maxLength={500} placeholder={lab ? "Share your test requirements or any questions for our team…" : "Describe your symptoms or reason for visit…"} />{errors.symptoms && <span id="booking-symptoms-error" className={styles.fieldError}>{errors.symptoms}</span>}<span className={styles.characterCount}>{values.symptoms.length}/500</span></section>
            {status === "error" && <div className={styles.errorMessage} role="alert"><strong>Your request has not been confirmed.</strong><p>{message}</p><a href="tel:+918009002444">Call the hospital for help <Icon name="phone" size={14} /></a></div>}
            {Object.values(errors).some(Boolean) && <p className={styles.validationMessage} role="alert">Please check the highlighted fields before sending your request.</p>}
            <button type="submit" className={styles.submit} disabled={status === "sending"}>{status === "sending" ? <><span className={styles.spinner} /> Sending your request…</> : <><Icon name={lab ? "flask" : "calendar"} size={21} />{lab ? "Request Test Booking" : "Confirm Appointment"}<Icon name="arrowRight" size={20} /></>}</button>
            <p className={styles.privacy}><Icon name="lock" size={15} /> Your details are shared with our hospital team to arrange your care.</p>
          </fieldset>
        </form>}
        <aside className={styles.sidebar} aria-labelledby="booking-benefits-title"><div className={`${styles.photo} ${lab ? styles.labPhoto : ""}`}><Image src={lab ? "/images/booking-lab-care.png" : "/images/booking-consultation-care.png"} alt={lab ? "Illustration of a laboratory scientist inspecting a sealed sample in a diagnostic laboratory" : "Illustration of a doctor reassuring an elderly patient during a consultation"} fill sizes="(max-width: 900px) 92vw, 420px" preload /></div><div className={styles.sidebarCard}><h2 id="booking-benefits-title">Why Choose Prathamaa Hospital?</h2><div className={styles.advantages}>{advantages.map((item, index) => <div key={item.title}><span className={`${styles.roundIcon} ${styles[item.tone]}`}><Icon name={lab && index === 0 ? "flask" : item.icon} size={27} /></span><div><h3>{lab && index === 0 ? "Coordinated Diagnostic Care" : item.title}</h3><p>{lab && index === 0 ? "Request the right test with support from our team." : item.text}</p></div></div>)}</div><div className={styles.help}><span className={`${styles.roundIcon} ${styles.blue}`}><Icon name="headset" size={28} /></span><div><h3>Need Help?</h3><p>Our support team is here to assist you.</p><a href="tel:+918009002444"><Icon name="phone" size={19} /> +91 800 900 2444</a></div></div></div></aside>
      </div>
      <section className={styles.benefits} aria-label="Booking with Prathamaa Hospital">{benefits.map((item) => <div key={item.title}><span className={`${styles.roundIcon} ${styles[item.tone]}`}><Icon name={item.icon} size={25} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</section>
    </div>
  );
}

function SectionTitle({ icon, title, subtitle, id }: { icon: string; title: string; subtitle: string; id: string }) {
  return <div className={styles.sectionTitle}><span className={`${styles.roundIcon} ${styles.orange}`}><Icon name={icon} size={26} /></span><div><h2 id={id}>{title}</h2><p>{subtitle}</p></div></div>;
}
function Lotus({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 320 300" fill="none" aria-hidden="true"><g stroke="#ffd6c3" strokeWidth="2"><path d="M160 276C85 205 103 95 160 20c57 75 75 185 0 256Z" fill="#fff1e9" /><path d="M160 276C55 254 10 163 17 87c87 8 150 73 143 189Z" fill="#fff0e7" /><path d="M160 276c105-22 150-113 143-189-87 8-150 73-143 189Z" fill="#fff0e7" /><path d="M160 276C72 291 13 258 2 207c66-31 124-7 158 69Z" fill="#fff4ed" /><path d="M160 276c88 15 147-18 158-69-66-31-124-7-158 69Z" fill="#fff4ed" /></g></svg>;
}
