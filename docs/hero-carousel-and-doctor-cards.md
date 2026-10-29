# Animated homepage campaigns and doctor portrait stages

> Historical implementation notes. The active homepage uses the six 3D campaign banners documented in [hero-banner-hd.md](./hero-banner-hd.md). Retired banner files referenced below have been removed during unused-asset cleanup.

## Current campaign refinement

Heart Care, Women & Children and Orthopaedics now match the introduction, preventive care and specialty care campaigns. All six active slides use 1920 × 900 WebP backgrounds with HTML headings, short supporting text and matching medical icons. Their previous PNG/portrait files are retained as inactive originals. The three new files are `public/images/hero-banners/heart-care.webp`, `public/images/hero-banners/women-children.webp` and `public/images/hero-banners/orthopaedics.webp`.

The pause/play button has been removed. Six-second autoplay continues during hover and keyboard focus. Manual navigation resets the countdown and automatic rotation continues. Reduced-motion preferences use instant transitions while automatic rotation remains active. Indicators never wrap; an overflowing strip scrolls horizontally and automatically reveals the active indicator on slide changes and viewport resizes.

These changes update `lib/hero-banners.ts`, `components/HeroCarousel.tsx`, `components/HeroCarousel.module.css` and `public/images/hero-banners/README.md`. No doctor assets or data were changed in this refinement.

The prior implementation notes below describe the original six-slide delivery; this section supersedes its campaign preservation and pause-button details.

Validation for this refinement: ESLint, standalone TypeScript, all 54 existing tests and the production build pass. Browser checks passed at 1920, 1440, 1280, 1024, 768, 600, 393, 360 and 320px widths for every campaign. A stress check with 40 additional indicators confirmed a single horizontal row, horizontal scrolling and no page overflow. Six-second automation, 700ms transitions, wrapping controls, manual timer resets and reduced motion passed without browser runtime errors.

### New artwork generation prompts

Mode: built-in image generator. Final assets are saved in `public/images/hero-banners/` as the three WebP files listed above, with high-quality encoding at 1920 × 900.

Shared prompt: Use case ads-marketing. Create a professional hospital campaign background with luminous white/ivory space, soft flowing ribbons, pale gradients and one tasteful frosted-glass medical illustration at the far right. Leave the left 65% calm for live HTML text, and keep the top 16% and bottom 30% quiet for the existing navbar and action controls. Balanced, spacious, clean and high resolution. No photographs, people, faces, hospital branding, logos, text, lettering, labels, slogans, numbers, buttons, statistics or UI mockup.

- Heart Care: warm white, coral/blush, orange highlights and light-blue accents; a translucent heart-outline sculpture with a subtle ECG pulse line. No exposed anatomy or dark saturated background.
- Women & Children: luminous ivory, blush rose, lavender and restrained plum; an abstract frosted-glass mother-and-child care symbol formed by two protective curves and two rounded forms. No actual people or photographic silhouettes.
- Orthopaedics: white, ice-blue, mint and teal; a clean compact sculptural knee-joint care symbol in glass and ivory with a gentle movement arc and restrained orange detail.


Implemented in the existing Next.js App Router project using React, CSS modules, the existing icon library and Next Image; no new dependency was added.

## File manifest

Modified:

- `components/Hero.tsx` — retains the existing hospital search, appointment links and statistics; delegates banner behavior.
- `components/Hero.module.css` — hero layout and existing action controls.
- `lib/hero-banners.ts` — six ordered campaign entries, stable IDs, descriptive alt text, optional HTML content and responsive art direction.
- `components/Icons.tsx` — pause and play icons using the existing SVG system.
- `components/DoctorPortrait.tsx` — a single actual hospital symbol behind each portrait.
- `components/DoctorPortrait.module.css` — centered 240px logo, subtle opacity, contained full portrait and responsive sizing.
- `components/DoctorDirectory.module.css` — restrained card borders and corrected mobile portrait centering.
- `lib/doctor-profiles.ts` — only four portrait imports changed; all clinical data and booking identities preserved.
- `public/images/hero-banners/README.md` — upload paths, configuration, sequence and behavior.

Created:

- `components/HeroCarousel.tsx`
- `components/HeroCarousel.module.css`
- `public/images/hero-banners/hospital-intro.webp`
- `public/images/hero-banners/preventive-care.webp`
- `public/images/hero-banners/specialty-care.webp`
- `public/images/doctors/dr-d-shivani-manne-cutout.png`
- `public/images/doctors/dr-nirban-mitra-cutout.png`
- `public/images/doctors/dr-b-susruth-kumar-cutout.png`
- `public/images/doctors/dr-batta-rakesh-yadav-cutout.png`
- `docs/hero-carousel-and-doctor-cards.md`

The approved heart-care, women-children and orthopaedics desktop/portrait files remain unchanged. Their SHA-256 checksums were recorded before implementation and verified afterward. Existing urology and emergency campaign files remain on disk but are not in the active six-slide sequence.

## Portrait audit

The alpha channels were inspected using image metadata and pixel statistics, not inferred from filename or CSS blending.

| Profile | Website source | Result |
| --- | --- | --- |
| Dr. D Shivani Manne | `public/images/doctors/dr-d-shivani-manne-cutout.png` | New transparent cutout; original retained |
| Dr. Pikkalla Naveena | `public/images/doctors/dr-pikkalla-naveena-cutout.png` | Reused existing transparent portrait |
| Dr. Batta Rakesh Yadav | `public/images/doctors/dr-batta-rakesh-yadav-cutout.png` | New transparent cutout; original retained |
| Dr. Seshu Mohan | `public/images/doctors/dr-seshu-mohan-cutout.png` | Reused existing transparent portrait |
| Dr. Nirban Mitra | `public/images/doctors/dr-nirban-mitra-cutout.png` | New transparent cutout; original retained |
| Dr. B Susruth Kumar | `public/images/doctors/dr-b-susruth-kumar-cutout.png` | New transparent cutout; original retained |
| Dr. Gopi Kishore | `assests/derived/doctor-gopi.png` | Existing transparent illustrated profile icon; real photograph not supplied |
| Dr. Shankar Reddy | `assests/derived/doctor-shankar.png` | Existing transparent illustrated profile icon; real photograph not supplied |

No photographic profile still needs background removal. Gopi Kishore and Shankar Reddy retain their original illustrated icons rather than introducing invented photographic identities. No doctor name, role, qualification, experience, review metric, care description, department or appointment identifier was changed.

All portraits share one centered instance of the actual `public/images/prathamaa-hospital-symbol.png` asset at subtle opacity. The mark maintains its original aspect ratio. Portraits use `object-fit: contain` with bottom alignment; there is no forced circular crop, overlay over the face or CSS background removal. The shared component also updates profile dialogs and compact portrait uses.

## Asset generation

Mode: built-in `image_gen`, not CLI/API fallback. Backgrounds were encoded as 1920 × 900 WebP. The four cutouts retain genuine PNG alpha. All generated assets are copied into the workspace; original images remain untouched.

### Final campaign prompt set

Use case: ads-marketing. Asset type: full-bleed 1920 × 900 landscape hospital homepage campaign background. Create premium clean graphic artwork with generous calm space in the left 65% for live HTML typography. Keep the top 16% and bottom 30% quiet for the existing floating navbar and action controls. No people, photographs, hospital branding, logos, text, lettering, numbers, buttons, statistics or UI mockup.

- Introduction: soft ivory and cream gradients, pale ice-blue flowing forms, restrained orange ribbons, navy fine-line medical geometry on the far right, polished connected-care aesthetic.
- Preventive care: white, ice-blue, soft mint and teal with restrained orange accents; one frosted glass shield and heartbeat line at the far right, backed by elegant flowing ribbons.
- Specialty care: ivory white and pale periwinkle with navy, soft blue and warm orange details; compact connected-care sculpture at the far right using frosted glass discs, a stethoscope motif and flowing elliptical ribbons.

The exact requested introduction headline and subtitle are rendered as live HTML. Its four strengths reflect existing site content: specialist care, a patient-first approach, modern diagnostics and 24/7 emergency support. The other new campaigns describe preventive/general medicine and coordinated specialty care already present on the site. No accreditations or success rates were added.

### Final portrait editing prompt

Use case: background-extraction. Edit target: each supplied existing real doctor portrait. Remove ONLY the white or very light surrounding photographic background to true alpha transparency. Preserve this exact person and entire visible silhouette, facial identity, expression, hair, skin texture, face, clothing, coat lettering, embroidered hospital logo, stethoscope, arms, hands, pose, proportions, lighting and all photographic detail. Precise background removal only: do not redraw, beautify, retouch, relight, recolor, replace or invent body parts. Do not crop the head, hair, shoulders or arms beyond the supplied framing. Leave a modest transparent margin above the head. Preserve the full coat and all white clothing as foreground. Output a genuinely transparent PNG, no solid color, shadow, halo or added branding.

Edit targets: `assests/derived/doctor-shivani.png`, `assests/derived/doctor-nirban.png`, `assests/derived/doctor-susruth.png`, `public/images/doctors/dr-batta-rakesh-yadav.jpeg`.

## Verification results

- `npm run lint`: passed.
- `./node_modules/.bin/tsc --noEmit`: passed.
- `npm test`: 54 tests passed across all five existing test files.
- `npm run build`: passed; all 34 App Router routes generated/compiled successfully.
- `git diff --check`: passed.
- SHA-256 verification: all six approved desktop/portrait assets remained byte-identical.
- Production-browser hero checks: 1920 × 900, 1440 × 900, 1280 × 720, 1024 × 768, 768 × 1024, 600 × 900, 393 × 852 and 320 × 740. Verified intro-first order, exactly six indicators, all image URLs, full viewport width, no horizontal overflow, text clear of the navbar/action bar, wrapping arrows and keyboard selection.
- Production-browser doctor checks: 1440, 1024, 768, 393 and 320px widths. Verified eight cards, exactly one centered logo per portrait stage, contained portrait geometry, working profile dialogs, search and appointment URLs.
- Controlled-clock browser checks: six-second autoplay, hover pause/resume, manual timer reset, slide 6 → 1 wrap, explicit pause/resume and reduced-motion behavior passed.
- No browser runtime errors occurred during these checks.

A local production preview was left running at `http://127.0.0.1:3002` for review, without interrupting the existing servers on port 3000.
