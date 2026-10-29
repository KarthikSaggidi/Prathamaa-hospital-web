# Homepage 3D illusion banners

All six campaigns now use newly generated sculptural artwork. Each composition combines a subject on the right, a recessed architectural alcove, glass orbit forms, realistic material reflections and contact shadows. The left side remains quiet for live text.

| Campaign | Active file | Subject |
| --- | --- | --- |
| Introduction | `public/images/hero-banners/hospital-intro-3d-4k.webp` | Ivory/orange glass medical cross and stethoscope |
| Heart Care | `public/images/hero-banners/heart-care-3d-4k.webp` | Coral anatomical heart and transparent orbit |
| Women & Children | `public/images/hero-banners/women-children-3d-4k.webp` | Porcelain mother and infant within rose/lavender glass |
| Orthopaedics | `public/images/hero-banners/orthopaedics-3d-4k.webp` | Detailed knee joint with blue cartilage and teal hoops |
| Preventive Care | `public/images/hero-banners/preventive-care-3d-4k.webp` | Beveled mint shield, checkmark and stethoscope |
| Specialty Care | `public/images/hero-banners/specialty-care-3d-4k.webp` | Blue glass cross, stethoscope, heart and brain sculptures |

## Source and export provenance

Mode: built-in `image_gen`, six independent new artwork generations. Exact prompts: [hero-3d-prompts.json](./hero-3d-prompts.json).

The requested canvas was 3840 × 1800. The generation service returned 1832 × 859 PNGs, which were exported to **3840 × 1800 WebP**, Lanczos3 resampling, quality 98 and smart chroma subsampling. These dimensions describe the resampled exports, not native generated detail. Each file is about 613–723 KiB. Per-asset source dimensions, export dimensions and file sizes: [3d-artwork.json](../public/images/hero-banners/3d-artwork.json).

The sources remain at the image generation service's local output location. The project uses its own exported WebP files; it does not depend on those source paths at runtime. Superseded campaign artwork and the three retired standalone homepage hero images have been removed after checking runtime references. The six configured 3D exports are retained. New filenames avoid stale cached image URLs.

To export a fresh set of generated sources:

```sh
node scripts/export-hero-3d.mjs /path/to/sources.json
```

The input is an array of `{ "id": "hospital-intro", "source": "/path/to/generated.png" }` entries. The script writes each versioned WebP and its provenance metadata.

## Presentation

Desktop headlines use a narrower column beside the medical subject. The introduction uses a 70% horizontal focal position to keep the full glass cross in frame on narrower desktop aspect ratios; other campaigns retain centered framing. A small mouse-driven parallax (up to 6px horizontal and 4px vertical) adds depth while leaving text stable. Artwork scales slightly to keep its edges covered. Touch devices and reduced-motion preferences disable this effect.

At 1100px and below, copy and artwork stack. All six live text blocks share one grid cell so the carousel height stays stable when the headline changes. The right side of the wide source is framed in a dedicated 225–390px artwork stage, clear of the controls and action bar. Soft masks blend the stage edges into the background without blurring the image, and the narrow-screen controls leave space for the floating contact button. The appointment, doctor search and statistics components remain separate.

The six-second autoplay, manual navigation, single-row indicators, hidden-tab handling, failed-image skip behavior and keyboard controls are preserved. Reduced motion removes visual transitions while retaining the established autoplay behavior.

## Image delivery

Hero delivery uses `next/image` at quality 100. The image allowlist includes quality 100 and responsive widths through 3840px. The actual artwork stage is measured; the resource sizing hint accounts for both stage dimensions and source aspect ratio, with the browser then applying device pixel density. Server-rendered mobile sizing hints estimate the compact artwork stage, avoiding an unnecessary full-screen-width 4K request before hydration. Desktop uses a cover composition; mobile uses containment inside a wider right-aligned picture to preserve the sculpture.

Only the current, outgoing and next images mount. The next image loads at low priority. Campaign text and icons stay sharp as HTML and SVG; there are no text or logos baked into the generated artwork and no image blur filters.

## Verification

The production build, TypeScript, targeted ESLint and 58 project tests pass. Browser verification covers all six campaigns at 1440 × 900 (2×), 1920 × 1080 (1×), 768 × 1024 (2×), 393 × 852 (2×) and 320 × 740 (2×). Checks include source/delivery dimensions, no horizontal overflow, text clear of navigation/actions, manual and keyboard navigation, search, autoplay on hover/focus, manual timer reset, desktop parallax and reduced motion. Final layout refinements receive targeted viewport checks.
