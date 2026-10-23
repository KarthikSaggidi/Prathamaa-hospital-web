import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { doctorLocation, filterDoctorProfiles, parseSavedDoctorIds } from "./doctor-directory";
import { doctorProfiles } from "./doctor-profiles";
import { doctorAnchor, searchHospital } from "./hospital-search";
import { isNavActive, navLinks } from "./navigation";

describe("doctor directory", () => {
  it("shows every existing doctor without a filter", () => {
    assert.equal(doctorProfiles.length, 8);
    assert.deepEqual(filterDoctorProfiles(""), doctorProfiles);
    assert.deepEqual(filterDoctorProfiles("   "), doctorProfiles);
  });

  it("finds doctors by name, role, care area and a small spelling error", () => {
    for (const [query, name] of [
      [" SHIVANI ", "Dr. D Shivani Manne"],
      ["Medical Director", "Dr. D Shivani Manne"],
      ["OSMANIA", "Dr. D Shivani Manne"],
      ["Naveena", "Dr. Pikkalla Naveena"],
      ["obstetrics", "Dr. Pikkalla Naveena"],
      ["Rakesh Yadav", "Dr. Batta Rakesh Yadav"],
      ["orthopedic surgeon", "Dr. Batta Rakesh Yadav"],
      ["FIJR", "Dr. Batta Rakesh Yadav"],
      ["Seshu Mohan", "Dr. Seshu Mohan"],
      ["robotic", "Dr. Seshu Mohan"],
      ["kidney transplant", "Dr. Seshu Mohan"],
      ["heart", "Dr. B Susruth Kumar"],
      ["cardiolgy", "Dr. B Susruth Kumar"],
      ["urinary", "Dr. Gopi Kishore"],
      ["general surgeon", "Dr. Shankar Reddy"],
    ]) {
      assert.ok(filterDoctorProfiles(query).some((doctor) => doctor.name === name), query);
    }
  });

  it("combines search and the doctors' current specialties", () => {
    assert.deepEqual(filterDoctorProfiles("Medical Director", "general-laparoscopic-surgery").map((doctor) => doctor.name), ["Dr. D Shivani Manne"]);
    assert.deepEqual(filterDoctorProfiles("", "gynecology").map((doctor) => doctor.name), ["Dr. Pikkalla Naveena"]);
    assert.deepEqual(filterDoctorProfiles("", "orthopedics-sports-medicine").map((doctor) => doctor.name), ["Dr. Batta Rakesh Yadav"]);
    assert.deepEqual(filterDoctorProfiles("", "urology").map((doctor) => doctor.name), ["Dr. Seshu Mohan", "Dr. Gopi Kishore"]);
    assert.deepEqual(filterDoctorProfiles("heart", "cardiology").map((doctor) => doctor.name), ["Dr. B Susruth Kumar"]);
    assert.deepEqual(filterDoctorProfiles("heart", "pediatrics"), []);
    assert.deepEqual(filterDoctorProfiles("zzzzunknown"), []);
  });

  it("removes the former pediatrician from search and saved profiles", () => {
    assert.deepEqual(filterDoctorProfiles("L Kiran Kumar"), []);
    assert.deepEqual(parseSavedDoctorIds('["doctor-dr-l-kiran-kumar"]'), []);
    assert.ok(!doctorProfiles.some((doctor) => /kiran/i.test(doctor.name)));
  });

  it("does not add unprovided credentials or review metrics to new profiles", () => {
    const naveena = doctorProfiles.find((doctor) => doctor.name === "Dr. Pikkalla Naveena")!;
    const rakesh = doctorProfiles.find((doctor) => doctor.name === "Dr. Batta Rakesh Yadav")!;
    const seshu = doctorProfiles.find((doctor) => doctor.name === "Dr. Seshu Mohan")!;
    assert.equal(naveena.qualifications, "MD (Gynecology & Obstetrics)");
    assert.equal(rakesh.qualifications, "MBBS, MS (Ortho), FIJR, FIAS, FISM");
    assert.equal(seshu.qualifications, undefined);
    for (const doctor of [naveena, rakesh, seshu]) {
      assert.equal(doctor.experience, undefined);
      assert.equal(doctor.rating, undefined);
      assert.equal(doctor.reviewCount, undefined);
    }
  });

  it("makes every profile discoverable with a unique directory link", () => {
    const anchors = doctorProfiles.map((doctor) => doctorAnchor(doctor.sourceName));
    assert.equal(new Set(anchors).size, doctorProfiles.length);
    for (const doctor of doctorProfiles) {
      const target = `/doctors#${doctorAnchor(doctor.sourceName)}`;
      assert.ok(searchHospital(doctor.name).some((result) => result.type === "Doctor" && result.href === target));
    }
  });

  it("offers the existing hospital location without matching an unknown branch", () => {
    assert.deepEqual(filterDoctorProfiles("", "all", doctorLocation.id), doctorProfiles);
    assert.deepEqual(filterDoctorProfiles("heart", "cardiology", doctorLocation.id).map((doctor) => doctor.name), ["Dr. B Susruth Kumar"]);
    assert.deepEqual(filterDoctorProfiles("", "all", "unknown-branch"), []);
  });

  it("restores a saved shortlist and ignores corrupt or stale profile IDs", () => {
    const id = doctorAnchor(doctorProfiles[0].sourceName);
    assert.deepEqual(parseSavedDoctorIds(JSON.stringify([id, id, "unknown-profile", 12, null])), [id]);
    for (const value of [null, "", "not-json", '{"id":"anything"}', "null"]) {
      assert.deepEqual(parseSavedDoctorIds(value), []);
    }
  });
});

describe("page navigation highlights", () => {
  const active = (pathname: string) => navLinks.filter((link) => isNavActive(pathname, link.href)).map((link) => link.id);

  it("keeps Home active at every homepage section", () => {
    for (const hash of ["", "#home", "#departments", "#doctors", "#about", "#contact"]) {
      assert.deepEqual(active(new URL(`https://hospital.example/${hash}`).pathname), ["home"]);
    }
  });

  it("highlights the current page and its nested routes", () => {
    for (const link of navLinks) assert.deepEqual(active(link.href), [link.id]);
    assert.deepEqual(active("/departments/cardiology"), ["departments"]);
    assert.deepEqual(active("/doctors/consultant"), ["doctors"]);
  });

  it("does not highlight unrelated paths or pages outside the main navigation", () => {
    for (const path of ["/doctors-old", "/about-us-old", "/appointment", "/lab-tests"]) {
      assert.deepEqual(active(path), []);
    }
  });
});
