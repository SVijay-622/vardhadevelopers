# Vardha Developers — Website

Corporate website for Vardha Developers. Built with React 19, TypeScript (strict), Vite, Tailwind CSS v4, Framer Motion, React Router and Lucide icons.

## Getting started

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # type-check + production build to /dist (also generates sitemap.xml)
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Updating content

All content lives outside the UI components. Edit these files; the site updates everywhere.

| What | File |
| --- | --- |
| Company details, contact info, social links, founder, form endpoint, site URL | `src/config/site.ts` |
| Every image (swap photography here) | `src/data/images.ts` |
| Projects | `src/data/projects.ts` |
| Services / capabilities | `src/data/services.ts` |
| Partnership programmes and the partner-network diagram | `src/data/partners.ts` |
| Insights articles | `src/data/insights.ts` |
| Stats, approach steps, principles, values, vision, mission, company story | `src/data/content.ts` |

### Placeholders to replace before launch

Values in `[BRACKETS]` are placeholders. None of them are real company facts.

- **`src/config/site.ts`**: `url` (production domain), office address, email, phone, hours, LinkedIn / Instagram URLs (an empty URL shows a placeholder), founder name / message / story / portrait.
- **`src/data/projects.ts`**: all six projects are placeholders (`placeholder: true`). Each one is labelled "Placeholder" on the site. Replace names, locations, types, area, role, descriptions and images, then set `placeholder: false`.
- **`src/data/insights.ts`**: articles are sample topics (`placeholder: true`), labelled "Sample article". Replace them with published articles.
- **`src/data/content.ts`**: the `XX+` stats, `companyStory`, and the draft `vision` / `mission` (derived from the brand positioning, so confirm them with Vardha).
- **`public/robots.txt`**: sitemap domain.
- **`index.html`**: add `address`, `telephone`, `email`, `url` to the LocalBusiness JSON-LD once confirmed.
- **Privacy Policy / Terms**: `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`.
- **Map**: replace the map placeholder at the bottom of `src/pages/Contact.tsx` with a Google Maps embed.

### Images

Current photographs are Unsplash placeholders. To use Vardha's own photography, put files in `public/images/` and change `src` in `src/data/images.ts`, e.g. `src: '/images/project-one.jpg'`. Always write a descriptive `alt`. Unsplash images get responsive `srcset`s automatically. Local images are served as-is, so export them at sensible sizes (around 2400px wide for full-bleed images).

### Contact form

The form validates in the browser. **It does not send anything until `enquiryEndpoint` in `src/config/site.ts` is set** (e.g. Formspree, Basin, or your own API route). Until then, submitting shows the confirmation message but no email goes out. Submissions are POSTed as JSON:

```json
{ "name": "", "email": "", "phone": "", "company": "", "type": "landowner", "location": "", "message": "" }
```

Links can preselect the enquiry type: `/contact?type=general|landowner|partnership|project|career`.

## Deployment

This is a single-page app. Configure your host to serve `index.html` for unknown paths so deep links such as `/projects/project-one` work:

- **Netlify**: add `public/_redirects` containing `/* /index.html 200`
- **Vercel**: add a rewrite of `/(.*)` to `/index.html`
- **Apache / Nginx**: fall back to `index.html` (`try_files $uri /index.html;`)

## Structure

```
src/
  components/          Reusable UI (Navbar, Footer, Button, cards, ImageReveal, Marquee, PartnerNetwork…)
    sections/          Page sections shared across pages (HomeHero, WhatWeDo, ApproachProcess, FinalCta…)
  pages/               One file per route (inner pages are code-split)
  layouts/             RootLayout: navbar, page transitions, footer
  data/                Content (see table above)
  config/              Site-wide settings
  lib/                 Motion presets, utilities, enquiry handling, navbar tone context
```

Motion respects the visitor's reduced-motion setting (`MotionConfig reducedMotion="user"` plus a CSS fallback).
