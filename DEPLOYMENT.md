# Deployment & Pre-Launch Checklist

Read this **before** sharing https://wasfagulfoundation.org publicly.

---

## ✅ One-time setup (do these once)

### 1. Upload site to GitHub
- [ ] Create repo on github.com (e.g. `wasfagulfoundation`)
- [ ] Upload **all files inside** `website/` (not the folder itself) via GitHub web UI → "uploading an existing file"
- [ ] Commit with message: `Initial website launch`

### 2. Enable GitHub Pages
- [ ] Repo → **Settings** → **Pages**
- [ ] Source: **Deploy from a branch** → branch: **main** → folder: **/ (root)** → Save
- [ ] Wait ~1 minute for green confirmation: "Your site is live at https://<username>.github.io/<repo>/"

### 3. Connect Cloudflare DNS to GitHub Pages
- [ ] In GitHub Pages → **Custom domain**: enter `wasfagulfoundation.org` → Save
- [ ] In Cloudflare → DNS → Records — add the following (set proxy to **DNS only / grey cloud**):

| Type   | Name | Content                      |
|--------|------|------------------------------|
| A      | @    | 185.199.108.153              |
| A      | @    | 185.199.109.153              |
| A      | @    | 185.199.110.153              |
| A      | @    | 185.199.111.153              |
| CNAME  | www  | `<username>.github.io`       |

- [ ] Wait 5–30 min for DNS propagation
- [ ] Back in GitHub Pages → tick **Enforce HTTPS** (appears once Let's Encrypt cert is issued)
- [ ] Verify https://wasfagulfoundation.org loads with padlock

### 4. (Optional) Re-enable Cloudflare proxy
After SSL is confirmed working, you can switch Cloudflare records back to **Proxied (orange cloud)** and set SSL/TLS mode to **Full (strict)** to get CDN, caching, and DDoS protection.

---

## ⚠ Content to update before public launch

These currently say "to be added" or are placeholders:

### `contact.html`
- [ ] **Office Address** — replace "To be added — Jhelum, Pakistan" with the real address
- [ ] **Phone** — replace "To be added" with real number
- [ ] **Email** — replace "To be added" with real email (e.g. `info@wasfagulfoundation.org`)

### Footer (every page)
- [ ] **Social links** — replace `href="#"` on Facebook / LinkedIn / Instagram / YouTube with real URLs (or remove until accounts exist)

### `donate.html`
- [ ] **Payment gateway** — currently a demo form. Integrate JazzCash / Easypaisa / Safepay before accepting real donations. See `RESEARCH_REPORT.md` section 7 for options.
- [ ] **Bank account details** — add direct bank transfer instructions if accepting wires

### `zakat.html`
- [ ] **Shariah-compliance certificate** — once the Shariah Board issues it, link the PDF
- [ ] **SMS short-code** — once a short-code is assigned, update the SMS instruction

### `transparency.html`
- [ ] **Annual reports** — link the PDF when published
- [ ] **PCP certification** — link the certificate when issued
- [ ] **Audited financials** — link after first year of operation

### `news.html` and homepage news preview
- [ ] Replace "Coming soon" placeholder cards with real news posts as the Foundation develops

---

## 🎯 Post-launch (within first week)

- [ ] Submit `sitemap.xml` to **Google Search Console**: https://search.google.com/search-console
- [ ] Submit to **Bing Webmaster Tools**: https://www.bing.com/webmasters
- [ ] Test the live URL on **PageSpeed Insights**: https://pagespeed.web.dev — confirm LCP < 2.5s
- [ ] Test on **Lighthouse** (in Chrome DevTools) — aim for 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] Validate structured data: https://search.google.com/test/rich-results
- [ ] Test sharing on WhatsApp / Facebook / LinkedIn — confirm OG image + title appear correctly
- [ ] Set up **Google Analytics 4** or **Plausible** / **Umami** (privacy-friendly) to track visitors

---

## 📅 Ongoing maintenance

- **Weekly:** check for broken links (use https://www.deadlinkchecker.com)
- **Monthly:** update news / gallery with new content; review donation form analytics
- **Quarterly:** rotate hero imagery; update impact numbers as the foundation grows
- **Annually:** publish annual report PDF on Transparency page

---

## 🆘 Things that need backend (future work)

The current site is fully static (no server). These features will eventually need a backend:

- **Real donation processing** → JazzCash/Easypaisa/Safepay merchant accounts + payment gateway integration (or WordPress + GiveWP migration)
- **Contact form submission** → currently a demo. Use Formspree (https://formspree.io) or Netlify Forms for free, no-server email forwarding
- **Newsletter signup** → integrate Mailchimp / Buttondown / Brevo
- **Donor management** → consider Donorbox or build a CRM when donor volume grows
- **International donations** → register a sister entity in UK and/or USA so you can accept Stripe / PayPal (Pakistan-registered entities cannot accept either directly)

---

## 🔐 Backup strategy

Because the site is on GitHub:
- Your code is automatically backed up to GitHub's servers
- Every change is tracked in commit history — you can roll back any edit
- You can also keep a local copy by cloning the repo: `git clone https://github.com/<username>/wasfagulfoundation.git`
