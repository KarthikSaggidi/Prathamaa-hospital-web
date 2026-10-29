# Homepage campaign banners

Place future images in `public/images/hero-banners/` and add their entries to `lib/hero-banners.ts`. The URL omits `public`: `hospital-intro-3d-4k.webp` becomes `/images/hero-banners/hospital-intro-3d-4k.webp`.

## Active sequence

| Slide | Stable ID | Desktop image | Responsive artwork |
| --- | --- | --- | --- |
| 1 | `hospital-intro` | `hospital-intro-3d-4k.webp` | Accessible live HTML text and icons |
| 2 | `heart-care` | `heart-care-3d-4k.webp` | Accessible live HTML text and icons |
| 3 | `women-children` | `women-children-3d-4k.webp` | Accessible live HTML text and icons |
| 4 | `orthopaedics` | `orthopaedics-3d-4k.webp` | Accessible live HTML text and icons |
| 5 | `preventive-care` | `preventive-care-3d-4k.webp` | Accessible live HTML text and icons |
| 6 | `specialty-care` | `specialty-care-3d-4k.webp` | Accessible live HTML text and icons |

All six active campaigns use original 3D illusion artwork: sculptural medical subjects, architectural alcoves, glass orbit forms, realistic reflections and contact shadows. Live responsive HTML typography and SVG icons remain separate from the artwork. Only the six configured 3D banner images are kept in this folder. Superseded HD exports, earlier campaign artwork and unused portrait variants have been removed.

Active backgrounds are **3840 × 1800 WebP exports**. The built-in image generation service returned **1832 × 859 PNG sources**; the exports use Lanczos3 resampling and WebP quality 98. These are 4K-width exports, not native 4K generations. [3d-artwork.json](./3d-artwork.json) records each source size, export size and file size. [The exact prompt set](../../../docs/hero-3d-prompts.json) is saved with the project.

There are no navigation bars, buttons, statistics, copy or hospital logos baked into the artwork. Each subject occupies the right side on desktop; mobile and tablet stack live text above a dedicated artwork stage, preserving the subject instead of cropping the center of the wide banner.

## Configuration

```ts
{
  id: "hospital-intro",
  src: "/images/hero-banners/hospital-intro-3d-4k.webp",
  width: 3840,
  height: 1800,
  alt: "Describe the illustration or the meaningful text embedded in the image.",
  position: "center",
  // Optional: dedicated artwork for screens up to 1100px.
  mobileSrc: "/images/hero-banners/my-portrait-banner.webp",
  mobileBackground: "#fffaf4",
  // Optional: HTML content for artwork without embedded typography.
  eyebrow: "CARE THAT PUTS YOU FIRST",
  title: "Your Health,",
  accent: "Our Priority",
  subtitle: "Short, accurate campaign copy.",
  theme: "orange",
  strengths: [{ icon: "stethoscope", label: "Specialist care" }],
}
```

Only reference files that exist. `title`, `accent`, `subtitle`, `strengths`, `theme`, `position`, `mobileSrc` and `mobileBackground` are optional. Source `width` and `height` let the renderer account for the full scaled background before cropping. Themes support `orange`, `teal`, `blue`, `rose` and `plum`. Icons reuse `components/Icons.tsx`.

## Behavior

The introduction appears first. Autoplay advances every 6 seconds with a 700ms fade and subtle horizontal movement. Previous/next buttons wrap; indicators select any slide; Left/Right/Home/End work when the banner area is focused. Manual selection resets the timer.

There is no pause/play button. Autoplay continues while the pointer hovers over the hero and while any carousel control has keyboard focus. Manual selection resets the six-second countdown and automatic rotation continues. A hidden browser tab resumes with a fresh countdown when visible again. Reduced-motion preferences use instant slide changes instead of animated movement; automatic rotation and manual navigation remain active.

Only the active, outgoing and next images mount. The next picture preloads at low fetch priority. The previous image stays visible until the requested image loads. Failed assets are skipped. All event subscriptions and timers are cleaned up on unmount.

The six indicators stay on one horizontal row. If more slides are configured than fit, the strip scrolls horizontally with a hidden scrollbar; selecting or automatically advancing a slide brings its indicator into view without moving the page vertically.

On desktop the banner extends behind the floating navbar, live action bar and statistics, with narrower live copy beside the medical sculpture. Mouse movement adds a small horizontal/vertical parallax; touch and reduced-motion devices keep the artwork still. On mobile and tablet, the live copy sits above a right-framed artwork stage and controls. All campaign copy remains responsive HTML. Optional portrait sources remain supported for future artwork. The action bar, search, statistics, navigation and appointment routes remain separate website components.

See `docs/hero-banner-hd.md` for current artwork provenance, export details and layout. Earlier campaign history is in `docs/hero-carousel-and-doctor-cards.md`.

## Image clarity

Hero images use quality 100 for browser delivery. The carousel measures its artwork stage and requests enough pixels for the full rendered source image. Desktop uses a cover composition; the mobile stage contains the image and frames its right-hand subject. This avoids enlarging a phone-width image over the entire tall hero. Next Image still selects an appropriate candidate for the device pixel density, up to the 3840px source width. Campaign copy and icons remain live HTML/SVG. No blur filter is applied to the banner image.

See `docs/hero-banner-hd.md` for export dimensions, source provenance and the enhancement prompt.
