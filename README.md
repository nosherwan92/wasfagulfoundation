# Wasfa Gul Foundation — Website

Official website of **Wasfa Gul Foundation**, a registered Pakistani non-profit dedicated to building a state-of-the-art charitable hospital in Jhelum and empowering deserving students through distance learning.

**Live site:** https://wasfagulfoundation.org

---

## Project structure

```
website/
├── index.html              ← Home (rich storytelling, impact stats, chairman, news)
├── about.html              ← Story, Chairman's message, Board of Trustees, values
├── hospital.html           ← Charitable hospital — departments & services
├── education.html          ← Distance Learning programme details
├── projects.html           ← All projects overview
├── transparency.html       ← Governance, audits, planned donation utilisation
├── gallery.html            ← Photo gallery (healthcare / education / community)
├── news.html               ← News & updates
├── donate.html             ← Donation form, tiers, ways to give
├── zakat.html              ← Zakat info + interactive Zakat calculator
├── sadaqah.html            ← Sadaqah explainer
├── volunteer.html          ← Volunteer opportunities + application form
├── faq.html                ← Frequently asked questions (FAQPage schema)
├── contact.html            ← Contact form, address, working hours
├── 404.html                ← Friendly not-found page
├── sitemap.xml             ← XML sitemap for search engines
├── robots.txt              ← Robots directives + sitemap reference
├── CNAME                   ← GitHub Pages custom domain
├── .nojekyll               ← Tells GitHub Pages to skip Jekyll processing
├── RESEARCH_REPORT.md      ← Strategy brief informing the design (cited research)
└── assets/
    ├── css/style.css       ← All site styles
    ├── js/main.js          ← Interactivity (nav, reveal, counters, Zakat calc)
    └── img/                ← Logo, chairman, trustee photos
```

---

## Tech stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no framework, no build step
- **Fonts:** Playfair Display (headings) + Inter (body), via Google Fonts
- **Images:** Logo and trustee portraits are local; supporting imagery is hosted on Unsplash CDN
- **SEO:** OG meta + Twitter Cards on every page; JSON-LD structured data (NGO, Hospital, EducationalOrganization, FAQPage, BreadcrumbList, DonateAction)
- **Accessibility:** WCAG 2.2 AA targets — skip link, semantic landmarks, focus-visible, fieldset/radio donation tiers, visually-hidden currency labels, 24×24 touch targets
- **Performance:** Hero image preloaded with `fetchpriority="high"`, gallery images lazy-loaded with `decoding="async"`

---

## Editing the site

### Quick text edits (no installation needed)
1. Go to the file on github.com
2. Click the ✏️ pencil icon (top right)
3. Make your edit
4. Scroll down → write a short commit message → **Commit changes**
5. GitHub Pages redeploys automatically within ~30 seconds

### Larger changes (multiple files)
- Use [github.dev](https://github.dev) — press `.` (period) on any repo page to open VS Code in the browser
- Or use [GitHub Desktop](https://desktop.github.com/) for local editing

### Replacing photos
Drop a new image into `assets/img/` keeping the same filename (e.g. `chairman-web.jpg`, `wasfa-gul.jpg`, `nosherwan.jpg`, `logo-mark.png`). No HTML edits needed.

---

## Deployment

The site is deployed via **GitHub Pages**. The `CNAME` file points it to `wasfagulfoundation.org`. DNS A/CNAME records are managed in Cloudflare:

```
A   @     185.199.108.153   (DNS only / grey cloud)
A   @     185.199.109.153   (DNS only / grey cloud)
A   @     185.199.110.153   (DNS only / grey cloud)
A   @     185.199.111.153   (DNS only / grey cloud)
CNAME www  <username>.github.io
```

SSL certificate is auto-issued by Let's Encrypt via GitHub Pages. **Enforce HTTPS** is enabled in repo Settings → Pages.

---

## Pre-launch checklist (DEPLOYMENT.md)

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for items to complete before sharing the URL publicly — contact details, social links, payment-gateway integration, etc.

---

## Board of Trustees

- **Dr Khalid Gondal** — Chairman
- **Dr Wasfa Gul** — Trustee · Foundation Namesake
- **Nosherwan Khawaja, FCA** — Trustee · Finance & Governance

---

## Licence & attribution

Website content © Wasfa Gul Foundation. All rights reserved.

Stock photography is from [Unsplash](https://unsplash.com) (free for commercial use, no attribution required).

Open source dependencies: Google Fonts (Playfair Display, Inter, Noto Naskh Arabic).
