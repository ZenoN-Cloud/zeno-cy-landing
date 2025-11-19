# Zeno CY Landing

## 🎉 Production Status

**Desktop PageSpeed:** 97/100 ✅  
**Mobile PageSpeed:** 76/100 ✅  
**Brotli Compression:** Enabled ✅  
**Auto-Deploy:** GitHub Actions ✅

## Quick Start

```bash
npm install
npm run dev      # Development
npm run build    # Production build
./deploy.sh      # Manual deploy to S3
```

Auto-deploy on `git push origin main`

---

## 1. Goals, Audience, Positioning
- **Primary KPI:** convert visitors into private beta requests (collect email, company size, serviced banks).
- **Secondary KPIs:** reinforce privacy-first trust, capture qualitative pain points (banks, CSV volumes, feature requests).
- **Audience:** accountants & operations leads at EU SMBs (starting with Cyprus incubators/fintech communities) plus independent accounting agencies serving Hellenic Bank, Bank of Cyprus, Alpha Bank Cyprus.
- **Message:** “Save 3–5 hours a week cleaning bank CSVs without ever pushing data to third-party clouds” and “local Cyprus-first focus, GDPR-ready from day one.”

## 2. Content Architecture
| Section | Goal | Key Elements |
| --- | --- | --- |
| Hero | Communicate time savings + privacy, push CTA | Headline “Stop Wasting 5 Hours a Week Cleaning Bank CSVs.”, subcopy about local processing, CTA (`email + Join Private Beta`), Loom/Tella demo in glassmorphic card |
| Privacy Hook | Establish GDPR trust | Title “Your Data Never Leaves Your Computer”, three pillars: Zero Data Storage, 100% Local Processing, No Tracking, badge “Designed for EU compliance”, lucide icons (shield, chip, eye-off) |
| Feature Roadmap | Show velocity + invite input | Two-column table “In the Demo Today” (CSV upload, instant preview, secure exports) vs “Coming Soon” (invoice parsing, VAT handling, PDF support). Footer: “Have a feature request? Add it in the form below.” |
| Trust / Partners | Social proof | Logos for IDEA Innovation Center, CYBAN, TechIsland (placeholder text “Partner slots available” until confirmed), short founder quote |
| Founder’s Circle CTA | Capture leads with context | Copy about 20 early slots, concierge onboarding, influence on roadmap. Form fields: email, company size radios (1–5 / 6–20 / 21+), banks textarea/multiselect, privacy note “We’ll reply within 24h. No spam.” |

## 3. Messaging Pillars
1. **Time back:** automate CSV normalization, ledger reconciliation, audit-ready exports.
2. **Privacy-first:** zero data storage, on-device processing, EU-only infra, optional audited logs.
3. **Cyprus expertise:** references to Hellenic/Bank of Cyprus integrations, awareness of local compliance nuances.

## 4. Tech Stack & Tooling
- **Framework:** Next.js 14 App Router + TypeScript.
- **Styling/UI:** Tailwind CSS utility-first core plus shadcn/ui for consistent forms/cards; lucide-react for iconography.
- **Animation:** Framer Motion (hero fade, roadmap reveal, CTA hover micro-interactions).
- **Content management:** Contentlayer or lightweight MDX/JSON in `src/content/sections.ts` to let marketing edit copy.
- **Forms:** Formspark/Formspree or Next.js Route Handler posting to CRM (HubSpot/Notion) later.
- **Analytics:** Plausible or Simple Analytics (cookie-less, GDPR friendly) with custom event on CTA + form submission conversions.
- **SEO:** `next-sitemap`, Open Graph metadata, structured data snippets, lighthouse budget ≥ 80.

## 5. AWS / Hosting Topology
1. Build with `next build && next export` to produce `/out`.
2. Host static assets in S3 bucket `zeno-cy-landing` (static website mode disabled, use CloudFront origin).
3. CloudFront distribution with ACM certificate in `us-east-1` for `zeno-cy.com`, Route53 A/AAAA aliases to CloudFront.
4. App at `app.zeno-cy.com` can stay on Vercel/AWS Amplify; configure Route53 subdomain separately.
5. **CI/CD (GitHub Actions):**
   - Node 20 runner, `npm ci`, `npm run lint`, `npm run build`.
   - `aws s3 sync ./out s3://zeno-cy-landing --delete`.
   - `aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"`.
   - Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `DISTRIBUTION_ID`.

## 6. UX / UI Guidance
- **Layout:** 12-column grid, max-width 1200px, generous vertical rhythm. Mobile stacks single column.
- **Color:** cool gradient background (#0F172A → #1E1B4B) + warm accent (lime/amber) for CTA states. Glassmorphism around video.
- **Typography:** Headlines in Space Grotesk or Sora (700), body in Inter/Manrope (500). Maintain consistent letter spacing for fintech feel.
- **Video:** 1-minute Loom/Tella autoplay (muted, loop). Provide static poster fallback.
- **Icons & Illustrations:** Lucide line icons + subtle glow; avoid heavy 3D.
- **Forms:** inline validation, disabled state during submit, privacy blurb. Add multi-select for banks (Hellenic, BoC, Alpha, Other) and optional textarea for feature pain.
- **Micro-interactions:** hero CTA hover glow, roadmap cards slide-in, trust logos grayscale→color.

## 7. Assets Checklist
- Loom/Tella demo export (1080p, 60s max, no audio narration or keep muted).
- Founder quote (≤140 chars) + portrait (optional) for trust block.
- Logos: IDEA Innovation Center, CYBAN, TechIsland (SVG/PNG, monochrome + color variants) or placeholders.
- Icon set (Lucide) references for shield, cpu, eye-off, check.
- Background gradient + subtle noise texture exported from Figma.

## 8. Repo Structure & Files
```
zeno-cy-landing/
├─ docs/
│  ├─ brief.md            # goals, audience, KPI summary
│  └─ outline-assessment.md # block-by-block copy cues
├─ src/
│  ├─ content/sections.ts  # text/config per section
│  ├─ components/sections/ # Hero.tsx, PrivacyProof.tsx, etc.
│  └─ app/(marketing)/page.tsx
└─ README.md
```
Add shared UI primitives under `src/components/ui/` (imported from shadcn generator) and analytics helper in `src/lib/analytics.ts`.

## 9. Setup & Commands
```bash
npm install
npm run dev
npm run lint
npm run build
```
For Contentlayer-enabled builds add `npm run dev:content` if necessary.

## 10. Workflow & Milestones
1. **Discovery:** finalize copy, collect demo footage, confirm target banks list.
2. **Design:** low-fi → hi-fi in Figma (hero, privacy, roadmap, CTA) plus moodboard referencing privacy-tech minimalism.
3. **Development:** scaffold project, implement sections sequentially, integrate form handler (Formspark or `/api/request-access`).
4. **QA:** run `npm run lint`, `npm run build`, Lighthouse desktop/mobile ≥ 90, responsive & accessibility review.
5. **Deploy:** merge to `main`, GitHub Action builds + syncs to S3, invalidate CloudFront, verify DNS + HTTPS.
6. **Post-launch:** monitor Plausible goals, iterate on headline/CTA via A/B tests, feed submissions into CRM for onboarding 20-slot Founder’s Circle.

## 11. Metrics & Observability
- Conversion rate from hero form submissions.
- CTA click-through to form vs completions.
- Distribution of selected banks & company size (helps roadmap prioritization).
- Web Vitals: LCP < 2.5s, CLS < 0.1, TTFB < 200ms via CloudFront.
- Error monitoring (Sentry or Vercel analytics if mirrored) for form/API failures.

Use this README as the single source of truth when briefing designers, engineers, and ops before the first public iteration of the landing page.
