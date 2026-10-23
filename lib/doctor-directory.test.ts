import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { doctorLocation, filterDoctorProfiles, parseSavedDoctorIds } from "./doctor-directory";
import { doctorProfiles } from "./doctor-profiles";
import { doctorAnchor, searchHospital } from "./hospital-search";
import { isNavActive, navLinks } from "./navigation";

describe("doctor directory", () => {
  it("shows every existing doctor without a filter", () => {
    assert.deepEqual(filterDoctorProfiles(""), doctorProfiles);
    assert.deepEqual(filterDoctorProfiles("   "), doctorProfiles);
  });

  it("finds doctors by name, role, care area and a small spelling error", () => {
    for (const [query, name] of [
      [" SHIVANI ", "Dr. Shivani Manne"],
      ["neonatologist", "Dr. L Kiran Kumar"],
      ["heart", "Dr. B Susruth Kumar"],
      ["cardiolgy", "Dr. B Susruth Kumar"],
      ["urinary", "Dr. Gopi Kishore"],
      ["general surgeon", "Dr. Shankar Reddy"],
    ]) {
      assert.ok(filterDoctorProfiles(query).some((doctor) => doctor.name === name), query);
    }
  });

  it("combines search and specialty filters, including medical leadership", () => {
    assert.deepEqual(filterDoctorProfiles("", "leadership").map((doctor) => doctor.name), ["Dr. Shivani Manne"]);
    assert.deepEqual(filterDoctorProfiles("heart", "cardiology").map((doctor) => doctor.name), ["Dr. B Susruth Kumar"]);
    assert.deepEqual(filterDoctorProfiles("heart", "pediatrics"), []);
    assert.deepEqual(filterDoctorProfiles("zzzzunknown"), []);
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
