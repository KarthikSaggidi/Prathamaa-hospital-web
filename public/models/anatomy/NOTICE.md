# Anatomical model credits

These local glTF assets contain anatomical atlas meshes, rather than procedural organ shapes. They are educational reference views with illustrative colors. They are not patient-specific scans.

## BodyParts3D 4.0

**BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.**

- Publisher and license: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html
- Download page: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- Mesh archive: https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/isa_BP3D_4.0_obj_99.zip
- Structure mappings: `isa_element_parts.txt` and `partof_element_parts.txt` in the same source directory.
- License: https://creativecommons.org/licenses/by/4.0/

Used in `heart`, `brain`, `kidneys`, `urinary`, `knee`, `dental`, `face`, `facial-muscles`, `skin`, and `ear`.

Adaptations: selected structures; coordinate-system conversion; recentering and uniform scaling; illustrative materials and colors; normals; compact indexed geometry; quantized vertex storage. The knee is sectioned with planar end caps. Facial skin is cropped at the neck; the surgical face is a skin/skeletal cutaway. One external ear is selected. The original anatomical surfaces are retained in these views. Per-mesh FJ identifiers are preserved in the GLB node names and `manifest.json`.

## Human Reference Atlas / HuBMAP

**Kristen Browne and Heidi Schlehlein. HuBMAP CCF 3D Reference Object Library.**
Created using the Visible Human Dataset, National Library of Medicine.

- Library: https://humanatlas.io/3d-reference-library
- License: https://creativecommons.org/licenses/by/4.0/
- Complete asset URLs, source metadata and citations: [hra-sources.json](./hra-sources.json)

`reproductive.glb` combines complementary anatomical meshes from:

- Uterus, Female v1.2: https://purl.humanatlas.io/ref-organ/uterus-female/v1.2
- Fallopian Tube, Female, Left v1.2: https://purl.humanatlas.io/ref-organ/fallopian-tube-female-left/v1.2
- Fallopian Tube, Female, Right v1.2: https://purl.humanatlas.io/ref-organ/fallopian-tube-female-right/v1.2
- Ovary, Female, Left v1.3: https://purl.humanatlas.io/ref-organ/ovary-female-left/v1.3
- Ovary, Female, Right v1.3: https://purl.humanatlas.io/ref-organ/ovary-female-right/v1.3

`lungs.glb`: Browne, Kristen, and Heidi Schlehlein. 2024. *3D Reference Organ for Lung, Female v1.4.* https://doi.org/10.48539/HBM994.HXJP.575

`liver.glb`: Browne, Kristen. 2024. *3D Reference Organ for Liver, Female v1.2.* https://doi.org/10.48539/HBM599.GZLD.639

Adaptations: selected anatomical meshes, complementary parts combined in their original spatial relationship, recentering, uniform scaling, recoloring, normals, indexed geometry and quantized vertex storage. These are adult anatomical references; the paediatrics viewer explicitly identifies its adult reference.

## Regeneration

Existing assets work offline after deployment; no external atlas service is used at runtime.

```sh
python3 scripts/fetch-anatomy-sources.py /tmp/prathamaa-anatomy
bun scripts/build-anatomy-models.mjs /tmp/prathamaa-anatomy
bun test lib/anatomy-models.test.ts
```

The download script fetches selected source components with HTTP byte ranges. It does not download the entire BodyParts3D archive. The build script writes standards-compliant GLB assets with KHR_mesh_quantization, which the bundled GLTFLoader supports without an additional decoder.
