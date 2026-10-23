# Prathamaa Hospital website

Next.js application with hospital information, doctor profiles, departmental care pages and server-side ERP booking routes.

## Local development

Use Node.js 22 or 24 and npm 10 or newer. `.nvmrc` selects Node.js 22. `package-lock.json` is the deployment lockfile; commit it whenever dependencies change.

```bash
npm ci --include=dev --include=optional
npm run dev
```

Open the local address printed by Next.js, usually http://localhost:3000.

## Hostinger deployment

Deploy this repository as a **Node.js Web App** with the **Next.js** framework preset. The booking and callback APIs require a running Node.js application.

| Setting | Value |
| --- | --- |
| Repository branch | `main` |
| Root directory | `./` |
| Node.js version | `22.x` (or `24.x`) |
| Package manager | npm |
| Install command, if configurable | `npm ci --include=dev --include=optional` |
| Build command | `npm run build` |
| Build output directory | `.next` |
| Start command, if configurable | `npm start` |

`npm run build` runs `next build --webpack`. Hostinger documents that Next.js 16.3.3 and newer require webpack on its build servers because of Turbopack/system-library compatibility. Keep this script when redeploying. See [Hostinger's Next.js build guide](https://www.hostinger.com/support/how-to-fix-next-js-16-turbopack-build-errors-on-hostinger/) and [Node.js deployment settings](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).

Set the applicable variables from `.env.example` in Hostinger's environment-variable settings. `NEXT_PUBLIC_SITE_URL` should be `https://prathamaahospital.in`. Set the ERP callback URL and optional server-side credentials supplied by the hospital; actual secrets belong in the hosting settings.

After pushing, confirm the new commit in Hostinger's Deployments page and redeploy if automatic deployments are disabled. Deployment success must be checked in Hostinger's build and runtime logs.

## Validation

```bash
npm run audit
npm run lint
npm test
npm run build
npm start -- --port 3011
```

The existing unit-test runner and `npm run seo:check` use Bun; install Bun to run those development checks. Hostinger's install, build and start commands require only npm and Node.js. With the local production server running, `npm run seo:check` checks public pages, metadata, sitemap, images and routing without submitting patient bookings.

See [the security and hosting maintenance notes](docs/security-and-hosting.md) for the dependency update details and [SEO configuration](docs/seo.md) for production metadata settings.
