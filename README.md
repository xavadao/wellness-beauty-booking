# Serenova Wellness Booking

A wellness and beauty booking demo for the fictional Serenova sanctuary.

[Live demo](https://vibed-wellness.xavainf.com)

## Features

- Treatment catalog with categories, pricing, duration, and treatment detail pages.
- Practitioner profiles with expertise and signature treatments.
- Four-step booking flow: treatment, practitioner, date/time, and contact details.
- Responsive home, sanctuary story, contact page, and mobile navigation.
- Validated demo contact and bespoke-request forms.

## Run locally

Prerequisites: Node.js 22.13 or newer and pnpm 11.13.0 (`corepack enable`).

```sh
pnpm install
pnpm dev
```

Open the development URL printed by Next.js (normally `http://localhost:3000`). No API keys, database, or environment variables are required.

## Build and preview

```sh
pnpm build
pnpm preview
```

The build checks TypeScript and exports static HTML, JavaScript, and CSS to `out/`. Preview rebuilds the site and serves that output with Wrangler. Next.js App Router handles navigation; all sample detail routes are generated at build time. Adding data-backed routes requires updating the corresponding sample dataset and rebuilding.

## Deploy

The site uses Cloudflare Workers Static Assets. The existing `wrangler.jsonc` names the `vibed-wellness` Worker and attaches the custom domain `vibed-wellness.xavainf.com`.

```sh
pnpm exec wrangler login
pnpm deploy
```

Deployment requires access to the configured Cloudflare account and the `xavainf.com` zone. For another account, update `account_id`, Worker name, and custom-domain route in `wrangler.jsonc`. Authenticate through Wrangler or an untracked `CLOUDFLARE_API_TOKEN`; never commit credentials.

## Demo limitations

Booking availability is illustrative. No appointment is reserved, payment collected, email sent, or contact request delivered. Use fictional personal information. Business details, phone, and messaging links are sample content; replace them before using this as a real business website.

Photography loads from the original Unsplash URLs and typography from Google Fonts, so those visuals require internet access. The app has no production API, authentication, billing, or server-side persistence.

## Source layout

- `src/app/`: Next.js routes, metadata, and styles.
- `src/site/`: original interface, components, and bundled sample data.
- `src/lib/router-compat.tsx`: navigation adapters used by the interface.
- `public/`: favicon and static response headers.
- `wrangler.jsonc`: standalone static deployment configuration.

## Discovery and credits

Public pages include descriptive sample-content metadata, canonical URLs, social previews, a sitemap, robots.txt, and a concise llms.txt directory. The initial exported HTML contains the page content; query-dependent state hydrates separately. Private browser-state pages are omitted from the sitemap and carry noindex metadata where applicable. These conventions support discovery; they do not promise search or assistant rankings.

Every page includes an accessible “Made with XavaInf” credit linking to https://xavainf.com. The credit is placed in page flow so it does not cover forms, galleries, or mobile navigation.
