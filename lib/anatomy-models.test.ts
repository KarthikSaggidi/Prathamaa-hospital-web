// @ts-expect-error Bun provides its test runner at runtime.
import { describe, test, expect } from "bun:test";
import { readFile } from "node:fs/promises";
import { Box3, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { departments } from "../components/data";
import { anatomyModels } from "./anatomy-models";
import { doctorProfiles, doctorBookingUrl } from "./doctor-profiles";
import { doctorAnchor, searchHospital } from "./hospital-search";

describe("department anatomy assets", () => {
  test("every available department has a local anatomical model", () => {
    expect(Object.keys(anatomyModels).sort()).toEqual(departments.map((item) => item.slug).sort());
  });
  test("every department has a unique specialty model", () => {
    const files = Object.values(anatomyModels).map((model) => model.file);
    expect(new Set(files).size).toBe(files.length);
    expect(anatomyModels.pediatrics.note).not.toContain("Adult");
  });
  for (const file of new Set(Object.values(anatomyModels).map((item) => item.file))) {
    test(`${file}: GLB loads, contains valid geometry and fits the viewer`, async () => {
      const bytes = await readFile(new URL(`../public/models/anatomy/${file}.glb`, import.meta.url));
      const gltf = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), "");
      const bounds = new Box3().setFromObject(gltf.scene), size = bounds.getSize(new Vector3());
      expect(Math.max(size.x, size.y, size.z)).toBeCloseTo(3.35, 3);
      expect(bounds.getCenter(new Vector3()).length()).toBeLessThan(.001);
      let triangles = 0;
      gltf.scene.traverse((object) => {
        if (!(object instanceof Mesh)) return;
        const geometry = object.geometry, positions = geometry.attributes.position, normals = geometry.attributes.normal;
        expect(geometry.index).not.toBeNull();
        expect(positions.count).toBeGreaterThan(0);
        expect(normals.count).toBe(positions.count);
        for (let i = 0; i < positions.count; i++) {
          expect(Number.isFinite(positions.getX(i) + positions.getY(i) + positions.getZ(i))).toBe(true);
          expect(Number.isFinite(normals.getX(i) + normals.getY(i) + normals.getZ(i))).toBe(true);
        }
        for (const index of geometry.index!.array) expect(index).toBeLessThan(positions.count);
        triangles += geometry.index!.count / 3;
      });
      expect(triangles).toBeGreaterThan(500);
    });
  }
});

describe("doctor profile navigation", () => {
  test("booking URLs retain the selected doctor and available department", () => {
    for (const profile of doctorProfiles) {
      const url = new URL(doctorBookingUrl(profile), "https://hospital.example");
      expect(url.pathname).toBe("/appointment");
      expect(url.searchParams.get("doctor")).toBe(profile.bookingName);
      expect(url.searchParams.get("department")).toBe(profile.department);
      if (profile.department) expect(departments.some((item) => item.slug === profile.department)).toBe(true);
    }
  });
  test("hero search targets the dedicated doctor directory", () => {
    for (const profile of doctorProfiles) {
      const results = searchHospital(profile.sourceName);
      expect(results.some((result) => result.href === `/doctors#${doctorAnchor(profile.sourceName)}`)).toBe(true);
    }
  });
});
