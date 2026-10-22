# Opulent Financial — website

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4.

Built from the "Opulent Financial — website design" canvas (Home, Credit Optimization, Inner Circle and
Free Score Check boards), with every page those designs link to implemented as a real route.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see "Integrations"
npm run dev                  # http://localhost:3000
```

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Development server (Turbopack)  |
| `npm run build`     | Production build                |
| `npm start`         | Serve the production build      |
| `npm run lint`      | ESLint (Next core-web-vitals)   |
| `npm run typecheck` | TypeScript, no emit             |

## Routes

| Route | Source |
| --- | --- |
| `/` | Home — design board |
| `/services/credit-optimization` | Design board |
| `/inner-circle` | Design board |
| `/score-check` | Design board (3-step flow) |
| `/services` | "View all services" |
| `/services/business-funding` · `/entity-structuring` · `/life-insurance` · `/annuities` | Service cards and selector |
| `/results` | "All case studies" |
| `/education`, `/education/[slug]` | Education Hub and article cards |
| `/founder` | "Meet Lenny" |
| `/affiliate`, `/careers` | Partner cards |
| `/contact` | Every "Book a Free Consultation" (`?goal=` preselects the topic) |
| `/legal/privacy` · `/terms` · `/disclosures` | Footer |

## Project structure

```
app/                 routes, metadata, sitemap, robots, generated icons/OG image
components/
  brand/             logo lockups
  layout/            header, desktop dropdown, mobile menu sheet, footer
  home/              home-page sections
  sections/          shared page sections (heroes, CTA band, timeline, cards, selector)
  forms/             inquiry form, score-check flow
  ui/                buttons, fields, icons, FAQ, section headers
  visuals/           illustrative art (gauge, cards, covers, portrait frame)
lib/                 content + config (site, services, goals, articles, results, legal), validation, server action
public/brand/        original logo assets from the design
```

Content lives in `lib/` as typed data, so copy changes rarely touch components.

## Integrations

All are optional environment variables — see `.env.example`.

- **Forms** (`INQUIRY_WEBHOOK_URL`): consultation, affiliate, careers and Inner Circle forms are validated on the
  client and again on the server (`lib/actions/inquiry.ts`), then POSTed as JSON. Without the URL, visitors are told
  their request was not sent and given direct contact details — the site never claims a submission it didn't make.
- **Inner Circle checkout** (`NEXT_PUBLIC_INNER_CIRCLE_CHECKOUT_URL`): when set, all Join buttons go to checkout.
- **Credit-score checks**: no credit-data provider is connected. The flow validates details and identity, then
  explains that online checks aren't live and offers a call or a clearly labelled sample report. Identity data
  (SSN, date of birth) never leaves the browser. Integrate a provider in `submitIdentity` in
  `components/forms/ScoreCheckFlow.tsx` via a server action.
- **Social links / MyTradeLine**: unset links render as plain text rather than dead links.

## Content still needed from the business

Bracketed text such as `[Phone number]` marks content carried over from the design that only the business can
supply. Search the codebase for `[` inside strings to find each one. Main items:

- Contact details and business hours — `lib/site.ts`
- Founder headshot (pass `src` to `FounderPortrait`) and quote
- Client case studies and testimonials (real, anonymized, with written permission) — `lib/results.ts`, Inner Circle page
- Pricing, timelines, value-stack amounts, Inner Circle billing and cancellation terms
- Industry program details (healthcare, real estate)
- Legal text: privacy policy, terms, CROA and insurance/annuity disclosures, consent language, credit-data
  provider disclosure — `lib/legal.ts`
- Open roles and affiliate commission structure

The three Education Hub articles are factual starter pieces on the topics the design names; review them before
launch.

## Accessibility and motion

Semantic landmarks and headings, labelled fields with inline errors, visible focus rings, keyboard-operable
menus and accordions, a modal `<dialog>` mobile menu, and `prefers-reduced-motion` support (all animation stops
and decorative-only motion is hidden). Scroll reveals use CSS scroll-driven animations and progressively enhance.
