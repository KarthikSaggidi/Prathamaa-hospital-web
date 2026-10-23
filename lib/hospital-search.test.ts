import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { searchHospital } from "./hospital-search";

describe("hospital search", () => {
  it("ranks the relevant specialty first for common care terms", () => {
    for (const [query, slug] of [["heart", "cardiology"], ["kidney", "nephrology"], ["skin", "dermatology"], ["chest pain", "cardiology"], ["paediatrics", "pediatrics"], ["orthopaedic", "orthopedics-sports-medicine"]]) {
      assert.equal(searchHospital(query)[0]?.id, slug, query);
    }
  });
  it("finds doctors by name and provides individual card anchors", () => {
    assert.equal(searchHospital("Dr. Shivani")[0]?.href, "/doctors#doctor-dr-shivani-manne");
    assert.equal(searchHospital("gopi kishore")[0]?.type, "Doctor");
    assert.ok(searchHospital("doctors").every((result) => result.type === "Doctor"));
    assert.ok(searchHospital("doctors").length > 0);
  });
  it("supports partial names, capitalization, whitespace and a small spelling error", () => {
    assert.equal(searchHospital("   CARDIOLOGY   ")[0]?.id, "cardiology");
    assert.equal(searchHospital("cardiolgy")[0]?.id, "cardiology");
    assert.equal(searchHospital("shiva")[0]?.type, "Doctor");
  });
  it("requires all query terms and handles missing matches without fabricated results", () => {
    assert.deepEqual(searchHospital("skin nonexistentcondition"), []);
    assert.deepEqual(searchHospital("zzzzunknowncondition"), []);
    assert.deepEqual(searchHospital("   "), []);
    assert.ok(searchHospital("care").length <= 8);
  });
});
