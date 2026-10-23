# SEO implementation and launch

The public canonical origin is **https://prathamaahospital.in**, confirmed by the owner. Set `NEXT_PUBLIC_SITE_URL` before building if the production origin changes. Every canonical, sitemap entry, Open Graph URL and structured-data identifier uses this origin.

## Implemented

- Unique titles, descriptions, canonical URLs and social sharing metadata for all 23 public pages: the home page, About, Departments, Doctors, Contact, Appointment, Lab Tests and all 16 department pages.
- `/sitemap.xml` contains only public canonical URLs. Query variants, API routes and model assets are excluded. No artificial last-modified dates are generated.
- `/robots.txt` permits public pages and excludes API crawling. API responses also carry `X-Robots-Tag: noindex, nofollow, nosnippet`.
- `SITE_INDEXABLE=false` disables indexing on staging. Vercel preview and development deployments are also excluded automatically. Production defaults to indexable.
- The global Hospital and WebSite JSON-LD uses contact details already published on the website. Page, department, directory and breadcrumb schemas describe the actual pages. Doctor entities use existing names and roles, without fabricated qualifications, review counts or ratings.
- The primary 24/7 number is marked as an emergency contact. General outpatient opening hours are not inferred from emergency availability.
- A 1200×630 PNG sharing card is generated locally at `/opengraph-image`, without third-party font or image requests.
- Square 192×192 browser/search icons and 180×180 Apple icons render the existing hospital symbol. The old favicon asset contained PNG data under an ICO filename; its original pixels are preserved in a correctly named PNG source.
- Descriptive Hyderabad copy, internal specialty links, existing visible patient information, a keyboard skip link and a single main landmark per page support discovery and accessibility.
- Google Search Console and Bing ownership verification tags are optional environment settings.

## Keyword focus

Keywords are used naturally in page titles, descriptions and visible content. No hidden keyword blocks, doorway pages, unsupported “best hospital” claims or meta-keyword ranking promises are added. Google does not use the meta-keyword tag for ranking.

| Page group | Search intent |
| --- | --- |
| Home | Prathamaa Hospital, Prathama Hospital, multispeciality hospital in Hyderabad |
| About | hospital in Hyderabad, hospital leadership, patient-centered healthcare |
| Doctors | specialist doctors in Hyderabad, the existing doctors’ names and roles |
| Contact | hospital contact Hyderabad, emergency support, hospital directions |
| Appointment | doctor appointment in Hyderabad, specialist consultation |
| Lab Tests | lab tests in Hyderabad, diagnostic care, diagnostic scans |
| Cardiology | cardiology, heart care in Hyderabad |
| Neurology | neurology, brain and nerve care in Hyderabad |
| Nephrology | nephrology, kidney care in Hyderabad |
| Urology | urology, urinary care in Hyderabad |
| Orthopedics | orthopedics, sports medicine, bone and joint care in Hyderabad |
| Gynecology | gynecology, obstetrics, women’s health in Hyderabad |
| Pediatrics | pediatrics, child and newborn care in Hyderabad |
| Dental Implantology | dental implants and dental care in Hyderabad |
| Dermatology | dermatology, skin and hair care in Hyderabad |
| ENT | ear, nose and throat care in Hyderabad |
| Maxillofacial Surgery | face and jaw surgery in Hyderabad |
| Plastic Surgery | plastic and reconstructive surgery in Hyderabad |
| Radiology | radiology and diagnostic imaging in Hyderabad |
| Anesthesia | anesthesia and perioperative care in Hyderabad |
| General Surgery | general and laparoscopic surgery in Hyderabad |
| General Medicine | general medicine, physician care in Hyderabad |

## Validation

```sh
bun run lint
bun run test
bun run build
bun run start --port 3011
# In a second terminal:
bun run seo:check
```

`SEO_CHECK_URL` changes the preview URL used by `seo:check`. The production smoke check requests all 23 routes as a crawler and verifies response status, canonicals, descriptions, a single h1/main landmark, social metadata and parseable JSON-LD. It also checks sitemap coverage, robots, the sharing image dimensions, booking query canonicalization, API indexing headers and 404 handling. It sends no booking or callback submissions.

## After deployment

1. Confirm HTTPS, the apex/`www` redirect and the primary domain in the hosting platform. Avoid serving the same site independently on multiple indexable domains.
2. Add the domain to [Google Search Console](https://search.google.com/search-console) using DNS verification, or set `GOOGLE_SITE_VERIFICATION` from the HTML-tag verification method and rebuild. Set `BING_SITE_VERIFICATION` if using Bing Webmaster Tools. The repository does not include private ownership tokens.
3. Submit **https://prathamaahospital.in/sitemap.xml**, and inspect the home page and priority department URLs in Search Console. A Git push does not itself submit a sitemap or prove that the deployed version is live.
4. Check the deployed pages with the [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/).
5. Maintain a verified hospital Google Business Profile with an accurate street address, working phone numbers, actual outpatient hours and genuine patient reviews. The code does not invent a street address or verified social accounts; add confirmed details consistently to the visible contact information and structured data together.
6. Have the medical team review clinical pages before making additional treatment or outcome claims. Add actual reviewer names and review dates only after review occurs.
7. Monitor Search Console indexing and Core Web Vitals on the deployed site, and keep doctor listings and service information current. Local previews cannot establish real-world search rankings or field performance.

Search rankings, indexing and rich results are determined by search engines and cannot be guaranteed. Further improvements depend on deployment, accurate business listings, helpful medically reviewed content and the site’s reputation.

References: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags), [local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
