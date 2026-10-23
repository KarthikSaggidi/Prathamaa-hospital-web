# Security and Hostinger build maintenance

## Dependency remediation — 2026-10-23

The original npm lockfile reported **14 vulnerable packages**: 1 critical, 10 high, 2 moderate and 1 low. The remediated lockfile reports **0 known npm vulnerabilities**, including development dependencies. This is a dependency-advisory check, not a guarantee that an application has no possible security issues.

Changes:

- Updated Next.js and its matching ESLint configuration from 16.2.4 to 16.4.3. The update includes fixes for the [image optimization advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw) and [Cache Components advisory](https://github.com/advisories/GHSA-673q-mjm6-r5xr).
- Updated Mongoose within its existing major version to 8.24.6.
- Removed unused Axios and CORS dependencies. Application API clients already use `fetch`.
- Resolved compatible transitive security patches through npm, including Sharp 0.35.5, PostCSS 8.5.23, Babel 7.29.7, brace-expansion 1.1.21, browserslist 4.29.4, source-map-js 1.2.2, js-yaml 4.3.2 and nanoid 3.3.20. No forced major-version updates or security-audit suppression were used.
- Kept `package-lock.json` as the single deployment lockfile and removed the conflicting Bun lockfile. The lockfile includes native Linux dependencies for Next.js, Sharp and Tailwind.
- Added `npm run audit`, which checks development dependencies and fails for any reported severity, and documented supported Node.js versions.

Run `npm run audit` again after dependency changes; advisory results can change as new issues are published. Managed Node.js runtime updates are controlled by Hostinger; select a supported, patched runtime in its settings. See [Hostinger's runtime security update information](https://www.hostinger.com/support/node-js-24-22-1-security-update-on-hostinger-hosting/).

## Hostinger build compatibility

Production builds now run `next build --webpack`. Hostinger's [Next.js 16 build guidance](https://www.hostinger.com/support/how-to-fix-next-js-16-turbopack-build-errors-on-hostinger/) documents helper-process restrictions and system-library incompatibility with Turbopack, including a webpack requirement for Next.js 16.3.3 and newer. Development may still use Turbopack locally.

The project retains Next.js's server output and `next start`, so ERP API routes and runtime image optimization remain available. Configure Hostinger's Node.js/Next.js preset with Node.js 22.x or 24.x, `npm run build`, output directory `.next`, and `npm start` where a start command is requested. Full settings are in the [README](../README.md#hostinger-deployment).

## Verification

Validation uses a clean `npm ci --include=dev --include=optional`, the security audit, ESLint, the existing unit tests, the webpack production build with TypeScript checking, and read-only checks against `next start`. The local build was verified on Node.js 22.22.3/macOS; the Linux native packages are present in the lockfile. Actual Hostinger deployment logs remain the authority for the hosted environment.
