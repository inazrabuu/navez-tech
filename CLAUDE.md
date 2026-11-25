# CLAUDE.md — navez.tech website

Guidance for Claude (and humans) working in this repo. Read fully before making changes.

## 1. Project

- **Company:** navez.tech — B2B technology partner
- **Primary market:** Indonesia & Southeast Asia (B2B decision makers: founders, COOs, CFOs, IT leads)
- **Language:** English (main, site root) + Indonesian under `/id/` with Indonesian URL slugs. Translations are `<name>.id.md` / `index.id.md` next to the English file and need the full front matter; UI strings in `i18n/id.yaml`; translated data in `data/lang/id/`. Privacy, terms and security are English-only for now (Indonesian pages link to them). Every content change should be made in both languages.
- **Site goal:** Convert qualified visitors into booked calls (HubSpot) or WhatsApp chats; grow organic + AI-search visibility via the blog
- **Services (4) and slugs:**
  - B2B Digital Agency → `digital-agency`
  - Agentic AI Development → `agentic-ai`
  - Cybersecurity → `cybersecurity`
  - ERP & Business System Setup → `erp-business-systems`
- **Positioning (draft, TODO confirm):** One partner for the company's digital stack — the site that wins customers, the systems that run operations, the AI that automates them, the security that protects them.

## 2. Locked stack — do not change without asking

| Layer | Choice | Notes |
|---|---|---|
| Static site generator | Hugo (pin `0.170.0`) | New template system (`layouts/baseof.html`, `layouts/_partials/`) |
| CSS | Tailwind CSS v4 + `@tailwindcss/typography` | Via Hugo `css.TailwindCSS`; CLI installed through npm (standalone binary unsupported since Hugo 0.161) |
| Interactivity | Native HTML first (`<details>`, `<dialog>`), Alpine.js only where needed | Bundled with Hugo `js.Build` |
| CMS | Sveltia CMS (Git-based) | `static/admin/`; GitHub backend; OAuth via Sveltia CMS Authenticator on Cloudflare Workers |
| Search | Pagefind | Post-build index; powers blog search + `Ctrl/⌘K` palette |
| CRM / forms / booking | HubSpot Free | Forms embed + Meetings embed; max 2 bookable users |
| Hosting | Cloudflare Pages | `static/_headers` for security headers |
| Consent | vanilla-cookieconsent | HubSpot tracking loads only after consent (UU PDP) |

Rules:
- Popular, open-source, well-documented tools only. No proprietary UI kits, no paid themes, no CSS-in-JS.
- Ask before adding any npm dependency.

## 3. Commands

```bash
npm install                     # tailwindcss, @tailwindcss/cli, @tailwindcss/typography, alpinejs, pagefind
hugo server -D                  # dev at http://localhost:1313 (CMS at /admin/)
npm run build                   # hugo --gc --minify && npx pagefind --site public
npm run check                   # build + htmltest (broken links) — run before calling any task done
```

Cloudflare Pages build settings: build command `npm run build`, output `public`, env `HUGO_VERSION=0.170.0`, `NODE_VERSION` = current LTS.

## 4. Repo structure

```
hugo.yaml
package.json
archetypes/                 # one per content type (service, use-case, work, post, glossary)
assets/
  css/main.css              # Tailwind entry + @theme tokens (single source of design tokens)
  js/main.js                # Alpine init, menu, palette, consent
  images/                   # site-level images (processed by Hugo)
  brand/                    # logo.svg, logomark.svg (inlined in templates)
content/
  _index.md                 # home
  services/                 # _index.md + 4 service pages
  use-cases/
  work/                     # page bundles: work/<slug>/index.md + images
  insights/                 # page bundles: insights/<slug>/index.md + images
  glossary/
  authors/
  about.md  book-a-call.md  contact.md  privacy.md  terms.md  security.md
data/
  site.yaml                 # legal entity, address, WhatsApp, HubSpot IDs, announcement bar
  stats.yaml  clients.yaml  testimonials.yaml  comparison.yaml
i18n/en.yaml                # ALL UI strings live here, never hardcoded in templates
layouts/
  baseof.html  home.html  page.html  section.html  taxonomy.html  term.html  404.html
  services/  use-cases/  work/  insights/  glossary/
  _partials/
    head/        # meta, og, css, schema
    layout/      # announcement, header, mega-menu, mobile-nav, footer, mobile-cta-bar
    sections/    # hero, logo-strip, service-grid, process, comparison, stats, cta-band, faq, contact
    components/  # button, card-*, badge, breadcrumb, toc, author, palette
    schema/      # JSON-LD builders
  _shortcodes/   # callout, figure, table-wrap, cta
static/
  admin/index.html  admin/config.yml
  fonts/
  favicon.ico  favicon.svg  apple-touch-icon.png  site.webmanifest
  images/brand/             # logo-512.png (schema/social), og-default.png (1200x630)
  _headers
  robots.txt
  .well-known/security.txt
```

## 5. Information architecture

```
/                                   Home
/services/                          Overview (4 services)
/services/<slug>/                   Service pages (shared template)
/use-cases/  /use-cases/<slug>/     Scenario-led; filter by service + industry
/work/       /work/<slug>/          3 case studies at launch
/insights/   /insights/<slug>/      Blog (flat slugs; category pages at /insights/category/<term>/)
/insights/glossary/<slug>/          Definitional pages
/about/  /book-a-call/  /contact/  /privacy/  /terms/  /security/  /thank-you/  /404
```

Navigation:
- Header: Services (mega menu: 4 items, each with one-line descriptor) · Use Cases · Work · Insights · About · **Book a call** (primary button)
- Mobile: hamburger drawer + sticky bottom bar with **Book a call** and **WhatsApp**
- Footer: services, company, latest 3 posts, legal entity (PT name, NIB, office address), email, socials, legal links

### Page templates

**Home** (in order): announcement bar (optional) → hero → client/partner logo strip → service grid (4) → process (Discover → Build → Secure → Support) → featured use cases (3) → featured case study with one hard metric → comparison table (navez vs in-house vs freelancers vs large SI) → stats → testimonials → FAQ → latest insights (3) → contact block → CTA band.

**Service page:** hero (outcome headline + CTA) → problems we solve → what's included → platforms/stack → engagement models → related case studies (fallback: related use cases) → FAQ → cross-sell to related services → CTA band.

**Use case:** problem → approach → expected outcome → related service → related case study (if any) → CTA.

**Case study:** client (or anonymized label), industry, location, services → challenge → solution → results (metric cards) → stack → testimonial → next case study → CTA.

**Insight post:** breadcrumb → title → answer summary (lead) → meta (author, date, updated) → TOC (if > 3 H2) → body → FAQ → author card → related service CTA → related posts.

**Book a call:** short intro + what to expect (3 points) → HubSpot qualifier form + Meetings embed in tabs ("Book a time" / "Send details") → WhatsApp alternative → `/thank-you/` with next steps.

Related content is pulled by front-matter `service` field via `where`, not by taxonomy (avoids `/services/` URL collision).

## 6. Content model

All front matter is **YAML** (Sveltia handles YAML most reliably). Every collection must exist in **both** an archetype and `static/admin/config.yml`.

| Type | Key fields |
|---|---|
| service | `title, slug, summary, icon, weight, hero_headline, problems[], included[], platforms[], engagement_models[], faq[{q,a}], related_services[], seo{title,description}` |
| use-case | `title, service, industry, problem, approach, outcome, faq[], weight` |
| work | `title, client, client_display (real or anonymized), industry, location, services[], challenge, solution, results[{metric,label}], stack[], testimonial{quote,name,role}, cover, featured` |
| post | `title, description, date, lastmod, author, category, service, tags[], answer_summary, faq[], cover, draft` |
| glossary | `title, short_definition, related_service` |
| author | `name, role, bio, credentials[], linkedin, photo` |
| data/site.yaml | `legal_name, nib, address, email, whatsapp, hubspot{portal_id, form_id, meetings_url}, announcement{enabled,text,url}` |

Post categories = the 4 service pillars + `business-technology` (general).

Sveltia config rules:
- Use page bundles for `work` and `insights` so Hugo can process images.
- Site settings (`data/*.yaml`) exposed as a `files` collection named "Site settings".
- Configure `i18n` with a single locale `en` so `id` can be added without restructuring.
- Pin the Sveltia CMS script to an exact version in `static/admin/index.html`.

## 7. Design system

### Reference: viskal.id
Use https://viskal.id/ as the **look-and-feel reference only**: corporate-modern B2B, generous whitespace, deep-blue brand, confident sentence-case headlines, mega menu with descriptions, command palette search, sequenced process section, comparison table, stats, testimonials, FAQ, dark CTA bands, contact block with WhatsApp + form/meeting toggle, footer with legal entity details.

**Do not copy** its copy, images, logo, icons, illustrations, or exact layouts/proportions. navez must be recognisably its own brand.

### Tokens (defined once in `assets/css/main.css` via `@theme`)

Proposed defaults, TODO replace when a brand guide exists:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@source "hugo_stats.json";

@theme {
  --color-ink: #0E1B33;        /* text, dark sections */
  --color-brand: #1F4FE0;      /* primary actions, links */
  --color-brand-deep: #13308F; /* hover, dark CTA bands */
  --color-signal: #12A594;     /* status/success only — use sparingly */
  --color-surface: #F4F6FA;    /* alternate section background */
  --color-line: #DCE2EC;       /* borders, dividers */

  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

  --radius-control: 0.5rem;    /* inputs, small buttons */
  --radius-card: 0.875rem;     /* cards */
  --radius-panel: 1.5rem;      /* hero panel, CTA bands */
}
```

- **Type:** Plus Jakarta Sans (open source, designed in Jakarta), self-hosted `.woff2` in `static/fonts/`, `font-display: swap`, preload the 2 main weights. One family only.
- **Type scale:** body 16–18px, line-height 1.6; headings tight (1.1–1.2), sentence case; max line length ~70ch (`max-w-prose` for long-form).
- **Radius hierarchy:** controls < cards < panels. Buttons may be pill. Never one radius for everything.
- **Shadows:** almost none; use `line` borders and `surface` backgrounds for separation.
- **Colour use:** never hardcode hex in templates — use token utilities (`bg-brand`, `text-ink`, `border-line`).
- **Dark mode:** not at launch. Dark appears only as intentional sections (CTA bands, footer).

### Logo & brand assets
- Master files: `assets/brand/logo.svg` (full lockup) and `assets/brand/logomark.svg` (icon only).
- Inline the SVG in header/footer via `{{ (resources.Get "brand/logo.svg").Content | safeHTML }}`; fills use `currentColor`, so one file works on light and dark sections (no separate white version).
- Header: full logo ≥ `md`, logomark below `md`; wrap in a link to `/` with `aria-label` = company name.
- Raster exports in `static/images/brand/`: `logo-512.png` for the `Organization` schema `logo`, `og-default.png` as the fallback share image.
- Favicons in `static/`: `favicon.svg` (primary), `favicon.ico` (32px fallback), `apple-touch-icon.png` (180px), referenced in `_partials/head/meta.html`.

### Signature element
Spend boldness in one place: the **home hero "systems map"** — an inline SVG showing the four services as connected layers (website → business systems → AI agents, wrapped in a security layer). One orchestrated load animation; static when `prefers-reduced-motion`. Everything else stays quiet.

### Design rules
- Numbered markers (01, 02…) only for real sequences (process steps).
- No ALL-CAPS eyebrow labels; section eyebrows in sentence case and only where they aid scanning.
- No single-word colour/italic highlights in headlines.
- No scroll-triggered fade-up on every section; motion only on user action or the one hero moment.
- Comparison table: use text + icon (Yes / Partial / No), never colour alone.
- Photography: real team/office/work photos preferred; no generic stock handshakes.

### Responsive
- Mobile-first. Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- Service grid: 1 col → 2×2 (md) → 4 col (xl).
- Mega menu ≥ `lg`; drawer below.
- Tap targets ≥ 44px; mobile sticky CTA bar hidden on `/book-a-call/`.

## 8. Coding conventions

- Tailwind utilities in templates. Repeated patterns become **partials**, not `@apply` chains. `@apply` only inside `@layer components` for prose/form base styles.
- No inline `style=""`, no `!important`, no custom CSS files besides `main.css`.
- Partials take a `dict` context and document expected params in a comment at the top.
- Every image goes through Hugo image processing: WebP, `srcset`, explicit `width`/`height`, `loading="lazy"` except the LCP image.
- JS: progressive enhancement — every page must work with JS disabled except embeds and the palette.
- All UI strings via `{{ i18n "key" }}`.
- Site constants (WhatsApp, HubSpot IDs, legal entity) from `data/site.yaml` only.

## 9. SEO, AEO & GEO

- **Every page:** unique `<title>` (≤ 60 chars) and meta description (≤ 155), canonical, Open Graph + Twitter tags, fallback OG image.
- **JSON-LD (in `_partials/schema/`):**
  - `Organization` (legal name, address, logo, sameAs) + `WebSite` on all pages
  - `Service` on service pages
  - `BlogPosting` + `Person` author on posts; `Article` on case studies
  - `FAQPage` wherever `faq[]` is present
  - `BreadcrumbList` on all non-home pages
  - `DefinedTerm` on glossary pages
- **Answer-first writing:** every post renders `answer_summary` (2–3 sentences, directly answers the title) as its lead. H2s phrased as questions where natural. Prefer tables for comparisons.
- **E-E-A-T:** author pages with credentials; visible `lastmod` ("Updated …") from Git (`enableGitInfo: true`).
- **AI crawlers:** `robots.txt` allows search and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended); disallows `/admin/`.
- **`/llms.txt`:** custom Hugo output format on home listing services, use cases, case studies, and top posts with one-line descriptions.
- Hugo built-ins: `sitemap.xml`, RSS for `/insights/`.
- Internal linking: every post links to its service pillar; every service page links to ≥ 3 posts once available.

## 10. Integrations

**HubSpot**
- Load forms/meetings embeds **only** on `/book-a-call/` and `/contact/`, lazily, from IDs in `data/site.yaml`.
- Form fields: name, work email, company, company size, service (4 options + "Not sure"), budget range (IDR), timeline, message.
- HubSpot tracking code loads only after analytics consent.
- Redirect to `/thank-you/` after submit.

**WhatsApp:** `https://wa.me/<number>?text=<prefilled, URL-encoded>`; number from `data/site.yaml`. Prefill text varies by page (service name included on service pages).

**Pagefind:** index only `main` content; exclude nav/footer with `data-pagefind-ignore`; palette opens with `Ctrl/⌘K` and from a header search button.

## 11. Security, privacy & legal

- `static/_headers`: HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `frame-ancestors 'none'`.
- CSP: build from HubSpot's published domain list; ship as `Content-Security-Policy-Report-Only` first, enforce after a clean week.
- `/.well-known/security.txt` + `/security/` responsible-disclosure page (we sell cybersecurity — this must be exemplary).
- Privacy policy aligned with Indonesia's Personal Data Protection Law (UU PDP No. 27/2022). TODO: legal review.
- `/admin/` is `noindex`; no secrets in the repo (OAuth secrets live in Cloudflare Worker env vars).

## 12. Quality bar (definition of done)

- Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Own JS ≤ 50 KB gzipped (excluding HubSpot embeds)
- WCAG 2.2 AA: visible focus, skip link, keyboard-operable mega menu/drawer/palette/accordion, `prefers-reduced-motion` respected
- Tested at 375px, 768px, 1024px, 1440px
- `npm run check` passes (build, no broken links)
- New content type? Archetype + Sveltia collection + template + JSON-LD all added in the same change

## 13. Copy & content rules

- Voice: plain, specific, confident; active voice; sentence case; no buzzword filler ("cutting-edge", "synergy", "revolutionize").
- CTAs say what happens: "Book a call", "Chat on WhatsApp", "Read the case study".
- Local context welcome (Indonesian business realities, IDR, local platforms) but site language is English.
- Never ship lorem ipsum. Placeholder copy is marked `TODO(content):` so it can be grepped.
- No em dashes in any language; use commas, colons, parentheses or full stops.
- Indonesian copy: friendly and conversational but not slangy, reader is "Anda" (e.g. CTA "Ngobrol yuk", "Cara kerja kami", "satu partner"). No semicolons, use commas. Keep keyword-led phrasing in SEO titles and URLs (e.g. "Jadwalkan konsultasi", "Jasa pembuatan website perusahaan").
- Case studies: real metrics only; anonymize client names when under NDA.

## 14. Open items

- [ ] Final brand palette, logo, and positioning line
- [ ] Legal entity details (PT name, NIB, address) for footer/schema
- [ ] HubSpot portal/form IDs and meetings URL
- [ ] WhatsApp business number
- [ ] 3 case studies' content and approvals
- [ ] ERP platforms we actually implement (for the ERP service page)
- [ ] Analytics choice beyond HubSpot (e.g. Cloudflare Web Analytics, cookieless)
