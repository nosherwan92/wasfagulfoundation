# Wasfa Gul Foundation — Website Research & Strategy Brief

*Deep research report. Compiled June 2026. All claims cited inline.*

This report exists to inform the rebuild of the Wasfa Gul Foundation website. It is the result of five parallel research passes covering global NGO benchmarks, Pakistani NGO benchmarks and Urdu-in-English UX, donation conversion and Pakistani payment rails, WCAG 2.2 AA + Core Web Vitals, and SEO/Schema.org + CMS integration. Findings are surfaced first; concrete design decisions are at the end.

---

## 1. Executive summary

Eight findings drove every design decision at the back of this report:

1. **The world's best NGO homepages do not look like fundraising pages.** Gates Foundation, UNICEF, and AKDN run their homepages like magazines or newsrooms; St. Jude and Red Cross run theirs like always-on donation appeals. The split tracks audience: institutional NGOs prioritise storytelling; service-delivery NGOs prioritise conversion.
2. **Pakistani NGOs separate Zakat from Sadaqah from generic donation at the navigation level.** Donors with religious intent will not mix categories; surfacing them as separate top-level routes is the dominant pattern at Shaukat Khanum, HANDS, and Edhi.
3. **There is strong experimental evidence (NextAfter, +55%) for sticky donate buttons** during campaigns. Above-the-fold CTAs lift conversion roughly 30% over buried links. Both belong on the page.
4. **Stripe and PayPal do not work for Pakistan-domiciled NGO accounts.** This is the single most important technical constraint and shapes the entire CMS recommendation.
5. **WCAG 2.2 added six new criteria** in October 2023, three of which affect this site directly: Focus Not Obscured (sticky header), Target Size 24×24px (mobile donate buttons), Consistent Help (FAQ/contact placement).
6. **Core Web Vitals 2026:** LCP ≤2.5s, INP ≤200ms (replaced FID in March 2024), CLS ≤0.1. Hero image strategy is the largest LCP lever on an image-heavy NGO site.
7. **`NGO`, `Hospital`, and `EducationalOrganization` schemas** can all coexist on one site via `parentOrganization`/`subOrganization`. `DonateAction` is the schema.org pattern for donate intent, but Google does not promise SERP enrichment for it.
8. **Urdu in English-primary interfaces works in two places only:** untranslated Islamic giving terms (Zakat, Sadqa, Lillah) and the donate CTA itself (HANDS pairs *عطیہ کریں* alongside English). Elite Pakistani higher-ed (LUMS, AKU, IBA) deliberately strips Urdu from English homepages.

---

## 2. Global NGO benchmarks

### 2.1 gatesfoundation.org
Hero: static photograph (child receiving polio vaccine in Liberia), 7-word headline "Our efforts strive toward one goal," single text CTA pointing to focus areas. Main nav has only **three** top-level items — About / Our work / Ideas — and **no Donate link in primary nav**; giving is pushed to the footer under "Give with us" routing to Gates Philanthropy Partners. Impact stats are plain-text "Foundation facts" (2,215 employees; 2,506 grants; $8.5B charitable support for year-end 2025) — no animated counters. Pattern worth stealing: treating the homepage like a magazine with a long "Ideas" feed of ~15 article cards, signalling that storytelling is the conversion goal, not fundraising. [Source](https://www.gatesfoundation.org/)

### 2.2 akf.org (Aga Khan Foundation)
Hero: autoplay background video (`AKF-Home-Video.mp4`), single headline "Building a future where we all thrive together," no inline CTA in the hero. Five-item nav (What We Do, Where We Work, News & Stories, About, **Donate**) with a mega-menu on Where We Work splitting countries into "Implementation" vs "Outreach." Impact stats as three image-card tiles (13.9 million supported; 87.6 million trees planted; 8.1 million accessing care) — static, not animated. Pattern worth stealing: **geo-router on the Donate CTA** — clicking Donate opens a country picker (AU/CA/USA/UK/Rest of World) routing donors to the correct local tax-deductible entity. [Source](https://akf.org/)

### 2.3 the.akdn (AKDN umbrella)
Hero: full-bleed news carousel. Nav built around verbs (What We Do / How We Work / Who We Are / Resources & Media). No donate — AKDN delegates giving to agency sites. Impact stats: icon-led number block ("14 million" care; "844,000" learners). Transparency surfaced via a partner-logo wall (Global Affairs Canada, EU, USAID, Gates, World Bank, FCDO) — donor logos as trust signal. Pattern worth stealing: **organising a complex multi-agency network around four verbs** ("Developing Human Capacity / Building Resilient Communities / Generating Economic Growth / Honouring Cultural Heritage") rather than program names. [Source](https://the.akdn/en/home)

### 2.4 unicef.org
Hero: single image (children in a Gaza tent), short headline, one CTA pointing to the 2025 Annual Report. Five-item mega-menu nav (Who we are, What we do, Research and reports, Stories, Take action); **Donate lives in the persistent header utility bar**, not buried. Dedicated top-level "Transparency and accountability" link inside Who-we-are; footer lists Evaluation, Ethics, Internal Audit, Safeguarding. Pattern worth stealing: **five-language toggle** (EN/FR/ES/AR/中文) in header plus an "Emergencies spotlight" sub-menu listing nine active crises by name (Gaza, Sudan, Ukraine, Yemen…) — the nav itself becomes a humanitarian dashboard. [Source](https://www.unicef.org/)

### 2.5 stjude.org
Hero: single photograph (patient "Oakleigh" high-fiving a nurse), four-word headline "Finding cures. Saving children." with **three CTAs in the hero** (Refer a Patient, Explore Our Research, Donate Now). Five-item nav plus **two persistent red header buttons** ("Refer a Patient" and "Donate Now") that sit outside the nav so they survive every page. Trust signalled via a footer badge wall (Charity Navigator, BBB Wise Giving, U.S. News, Magnet Nursing, NCI). Pattern worth stealing: **twin always-on header buttons in St. Jude red** — the two highest-value user intents get fixed homes regardless of scroll or section. [Source](https://www.stjude.org/)

### 2.6 mayoclinic.org
Hero: minimal text-only ("Transforming your care") with two CTAs and no large hero image. Five-item mega-menu nav (Care at Mayo, Health Library, For Medical Professionals, Research & Education, Giving to Mayo Clinic). Almost no impact stats on homepage — Mayo leans on the credential "No. 1 hospital in the world according to Newsweek." Pattern worth stealing: the **A–Z alphabet strip** ("Find diseases & conditions by first letter") directly under the hero turns the homepage into a search index, capturing dominant SEO/utility intent before any marketing content. [Source](https://www.mayoclinic.org/)

### 2.7 redcross.org
Hero: **multiple stacked disaster-alert pop-ups** (Indiana storms, Illinois storms) above the fold, each with its own image, headline, and "give now" CTA — the hero is a live newsroom. Six-item nav (Donate, Give Blood, Training & Certification, Volunteer, About Us, Get Help), every one opening a true mega menu with sub-columns plus a right-rail promo image card. Transparency surfaced via Donate menu item "Where Your Money Goes" — top-level, not buried. Pattern worth stealing: **geo-personalisation** — header shows "Your Local Red Cross" based on zip code; disaster pop-ups are localised to current events. [Source](https://www.redcross.org/)

---

## 3. Pakistani NGO benchmarks + Urdu-in-English UX

### 3.1 Shaukat Khanum Memorial Cancer Hospital
Hero: three-slide carousel of the hospital network (Lahore, Peshawar, Karachi under-construction). Six-item top nav with **Donors as a dedicated top-level item** (not buried under "Get Involved"). Donors mega-menu unbundles giving into **12 routes**: Zakat, Donation, Sadqa, Donate by SMS, Sponsor a Cancer Patient, Donate a Meal, Support a Project, Sponsorship of Equipment, Donations in Kind, Online Fundraising, Corporate Sponsorship, Education sponsorship. Impact stats are animated counters framed monetarily and as outcomes ("PKR ___ Billion SPENT on FREE TREATMENT", "% Patients treated free of cost"). Trust signals: Shariah-compliance certificate, Pakistan Centre for Philanthropy certification, AF Ferguson audit reference embedded in Zakat FAQ. Pattern worth stealing: **splitting donation intent at the navigation level** (Zakat ≠ Sadqa ≠ general ≠ sponsorship) so a religiously-motivated donor lands on the right form immediately. [Source](https://shaukatkhanum.org.pk/) · [Donors page](https://shaukatkhanum.org.pk/donors/) · [Zakat page](https://shaukatkhanum.org.pk/donors/zakat/)

### 3.2 Transparent Hands
Hero: static donate banner followed by a **live patient-appeal grid** — individual patients (Miraj, Pathani Mai, Muhammad Jam, Reshma, Abdul Hadi, Ameeq) with photo, condition-led title ("Heal Miraj's Little Heart with Cardiac Surgery"), progress bar, $ raised vs required, per-patient "Donate Now." Nav: Appeals (mega-menu: Surgeries, Medical Procedures, Special Campaigns, Palestine Emergency) / About / Success Stories / Medical Camps / Blogs, plus a persistent **Donation Basket** counter — donations treated like e-commerce. Two side-by-side header buttons: "Donate Now" and "Give Sadaqah." Dedicated routes for `/pay-zakat-online/`, `/sadaqah-donations/`, `/sadaqah-vs-zakat/`, `/zakat-calculator/`. Pattern worth stealing: **named individual patients with photo + funding progress bar + condition-specific verb** ("Heal," "Restore," "Enable") — turns abstract giving into a chooseable, near-completed micro-goal. [Source](https://www.transparenthands.org/)

### 3.3 HANDS
Hero: large multi-slide carousel (13+ banners), every slide ending in a Donate Now CTA. Six-item nav. Red "Donate Now" in header, repeated at footer with **three geographic variants**: "Donate In Pakistan / Donate In UK / Donate In USA" — routing diaspora donors to tax-deductible vehicles in their home jurisdiction (Hands International UK, i-Care USA). Floating header **Zakat Calculator** widget computes 2.5% of eligible amount. Zakat books published in English, Urdu, and Sindhi PDFs. No animated counter on homepage; substitutes a partner-logo wall (~75 logos: UN agencies, banks, FMCG) for numeric credibility. Pattern worth stealing: **geographic donate-routing** for diaspora tax-deductibility and tri-language Zakat documentation. [Source](https://hands.org.pk/)

### 3.4 Edhi Foundation
Hero: **scam-alert strip at top** ("Please avoid donating on these fraudulent websites…") followed by a crowdfunding-style appeal panel with raised/goal/supporters/end-date. Built on an Odoo e-commerce stack — donations literally are products. Two CTAs: "Donate with Card" (literal phrasing for trust) and separate DONATE nav item. Plus emergency "Call 115" pinned top-left. Appeals mega-menu lists Sadqa, Zakat, Fidya, Food Bank, Lillah, Aqeeqa, Qurbani 2026 as separate giving categories. Four large counters reflect service-volume not money: "200+ INFANT SUPPORT, 140+ HOMELESS SHELTERS, 1800+ EMERGENCY VEHICLES, 100+ INTERNATIONAL AID." Pattern worth stealing: **up-front fraud disclaimer naming look-alike scam domains** — Pakistani donor base is wary of fake sites; explicitly listing the fakes builds trust faster than a "verified" badge. [Source](https://edhi.org/)

### 3.5 Urdu-in-English UX — what's actually in the wild
- **Shaukat Khanum:** one transliterated tagline (*"Durust aur Barwaqt"* — "Accurate and Timely") on lab service; transliterated Islamic terms (*Zakat*, *Sadqa*) in giving menu. Otherwise English. [Source](https://shaukatkhanum.org.pk/)
- **HANDS:** Urdu *script* sibling to the donate button — *عطیہ کریں* ("Donate"), plus Sindhi *عطيو ڏيو*; parallel `/urdu/` site. Urdu present in the donate flow, not in the English body. [Source](https://hands.org.pk/)
- **Edhi:** transliterated Islamic giving terms as menu items (Sadqa, Zakat, Fidya, Fitrana, Lillah, Aqeeqa, Qurbani, Langer, HunarMAND); heavy parenthetical English glosses. [Source](https://edhi.org/)
- **Transparent Hands:** almost no Urdu — purely English even for religious giving. [Source](https://www.transparenthands.org/)
- **LUMS / AKU / IBA:** **zero Urdu on homepages**. Elite Pakistani higher-ed deliberately scrubs it because they compete internationally. [LUMS](https://lums.edu.pk/) · [AKU](https://www.aku.edu/Pages/home.aspx) · [IBA](https://www.iba.edu.pk/)

**The pattern.** Urdu enters English interfaces in three places only: (1) Islamic giving categories kept untranslated because their meanings are precise and the audience knows them; (2) short branded taglines on service sections; (3) a parallel Urdu donate button in actual Urdu script, not transliteration.

### 3.6 Recommended Urdu phrases for Wasfa Gul Foundation
1. **Sehat aur Taleem** — *صحت اور تعلیم* — "Health and Education." Two-noun hero subline; pairs cleanly with the foundation's scope.
2. **Khidmat-e-Khalq** — *خدمتِ خلق* — "Service to humanity." Formal Persianate register; reads institutional. Use above the impact-stats band.
3. **Insaaniyat ki Khidmat** — *انسانیت کی خدمت* — "Service of humanity." Plainer cousin; better in a donor letter than as branded chrome.
4. **Mil Kar Banayein** — *مل کر بنائیں* — "Let us build together." Active, future-tense, collaborative — fits a hospital-build campaign CTA.
5. **Ummeed ki Kiran** — *امید کی کرن* — "A ray of hope." Use sparingly on patient-story / scholarship cards. Overused in Pakistani charity copy — risks generic.

**Implementation rule:** pair any of these with an English gloss in the same line on first appearance. Reserve Urdu script (not transliteration) for the donate button, mirroring the HANDS *عطیہ کریں* pattern.

---

## 4. Donation conversion + Pakistani payment gateways

### 4.1 Donate button placement
The strongest evidence in 2026 supports **both** sticky header + hero-area CTA. NextAfter's controlled experiment (91,000 sessions, 95.5% confidence) found a sticky donate button with campaign-specific CTA produced a **55% lift in donor conversion** during a high-urgency campaign. [Source](https://www.nextafter.com/experiments/how-a-sticky-donate-button-with-a-campaign-specific-cta-effects-donor-conversion-during-a-high-urgency-campaign/) Above-the-fold CTAs are reported to outperform below-the-fold roughly 304% in broader testing; hero-banner donate buttons convert up to 30% higher than buried links. [Source](https://neonone.com/resources/blog/donate-button/) · [Source](https://www.wandr.studio/blog/nonprofit-website-design-the-complete-2026-guide)

### 4.2 Suggested-amount tier design
- **Four tiers** is the most-cited sweet spot; more options paradoxically depress conversion.
- **62% of gift arrays are sequential** low-to-high.
- $100 is the single most common amount in US data. [Source](https://connectionpoint.com/fundraiserhub/suggested-donation-amounts/)
- A NextAfter experiment with Dallas Theological Seminary found replacing a blank field with three high-anchored buttons **dropped conversion by 54.9%** when defaults didn't match the audience. [Source](https://www.nextafter.com/experiments/how-suggested-gift-amounts-affects-donations/)
- A different NextAfter test increased choice and reported a **104% conversion lift** with only a $4 drop in average gift. [Source](https://benchmarks.nextafter.com/)

**Synthesis for Pakistan:** 4 tiers, default to the second-lowest, anchor amounts to local median giving (not US benchmarks), and label every tier with an impact frame ("PKR 5,000 = one outpatient visit").

### 4.3 One-time vs monthly default
M+R Benchmarks 2026 (260+ US nonprofits): **64% pre-select one-time, 35% pre-select monthly**. [Source](https://www.nonprofitpro.com/article/monthly-giving-fuels-online-fundraising-growth-plus-5-more-insights-from-mr-benchmarks/) 2025 was unusual — one-time revenue grew 17% vs 12% for monthly, breaking a long trend; attributed to emergency-response behavior. Monthly still accounts for **27% of all online revenue, rising to 37% at Extra-Large nonprofits**, with public-media organisations at 61%. Sustainer retention is 71% after 12 months vs 24% for one-time. [Source](https://mrbenchmarks.com/fundraising/)

**Recommendation for Wasfa Gul Foundation:** default to one-time (matches Pakistani donor expectation and Ramadan Zakat spikes), but place a prominent "Become a Sustainer" monthly toggle. Pre-tick monthly only on dedicated sustainer-recruitment pages.

### 4.4 Trust signals
Most-cited stack for 2026: PCI/SSL badge near payment, third-party rating seal in sight of the form (Pakistan equivalent: Pakistan Centre for Philanthropy / PCP certification), audited-financials link, photo + first-name of a real beneficiary, "X% reaches patients" one-liner. [Source](https://www.truesense.com/blog/building-donor-trust-with-secure-donation-badges) · [Source](https://www.zeffy.com/blog/donation-page) · [Source](https://www.idonate.com/blog/nonprofit-online-donation-page-optimization-for-the-second-half-of-2026) · [Source](https://bloomerang.com/blog/2026-giving-report-donor-motivation-and-charitable-giving-trends)

### 4.5 Zakat / Sadaqah UX (Pakistani Muslim donors)
Common pattern across Shaukat Khanum, Islamic Relief, Transparent Hands, and Edhi:
1. **Separate religious category at the top of the funnel** (Zakat ≠ Sadaqah ≠ Fitrana ≠ general) — donors will not mix.
2. **Embed a Zakat calculator** (gold, silver, cash, shares, property). [Islamic Relief example](https://islamic-relief.org.pk/zakat-calculator-pakistan/)
3. Surface a **Shariah-compliance certificate** and **PCP certification** near the form.
4. Provide an **SMS micro-donation alternative** for low-bandwidth donors (Shaukat Khanum's "SMS 100 to 7770").
5. State explicitly on the Zakat page that **100% goes to eligible recipients with no admin deduction**.

[SKMCH&RC Donors](https://shaukatkhanum.org.pk/donors/) · [Transparent Hands Zakat](https://www.transparenthands.org/top-5-zakat-accepting-organizations-pakistan/) · [Edhi Zakat](https://www.edhi.org/zakat)

### 4.6 Payment gateways in Pakistan (2026)

**Local rails (PSO/PSP licensed):**

| Gateway | Setup fee | Recurring | Notes |
|---|---|---|---|
| **JazzCash Custom Checkout** | None | Direct-debit instruction; no turnkey subscription API | Largest reach; supports cards (3DS), mobile wallet, vouchers, direct debit; plugins for WordPress/WooCommerce/Magento/PrestaShop/OpenCart/Joomla [Source](https://www.jazzcash.com.pk/corporate/online-payment-gateway/) |
| **Easypaisa** | None | Similar to JazzCash | 59M+ users by end-2025; integrates via aggregators (Simpaisa, CashMaal, PayFast) [Source](https://udhaar.pk/best-business-payment-app-pakistan/) |
| **PayFast** | None | "Lacks dunning, retry, recurring logic out of the box" | PSP aggregator covering JazzCash, Easypaisa, banks, cards through one API [Source](https://rapidgateway.pk/resources/payfast-pakistan-review) |
| **Safepay** | None | More recurring-friendly | On-site checkout, Shopify integration, dev-friendly API [Source](https://rapidgateway.pk/resources/best-payment-gateway-pakistan) |
| **HBL / MCB** | Negotiated | Custom enterprise only | 2.5–3.5% MDR typical for cards |

**International gateways — critical constraint:**
- **Stripe is NOT available to Pakistan-registered merchants** as of 2026. Pakistan is absent from Stripe's supported-country list. Workaround is incorporating a US LLC via Stripe Atlas, which requires US banking and tax compliance. [Source](https://stripe.com/global) · [Source](https://mazinooyolo.com/blog/stripe-account-in-pakistan/)
- **PayPal is NOT available** to PK merchants; inbound transfers only reach PK bank accounts via Xoom from outside. [Source](https://wise.com/pk/blog/paypal-account-in-pakistan)
- **Razorpay** is India-only acquiring; not available to PK merchants. [Source](https://razorpay.com/accept-international-payments/)

**The implication is structural:** to accept international donations, Wasfa Gul Foundation needs a sister entity in the UK or US (the IKCA-USA / Imran Khan Cancer Appeal UK model that Shaukat Khanum uses), then Stripe/PayPal on that side. For PKR donations, primary rails are **JazzCash + Easypaisa + Safepay**.

---

## 5. WCAG 2.2 AA + Core Web Vitals checklist

WCAG 2.2 became a W3C Recommendation on **5 October 2023**. [Source](https://www.w3.org/WAI/news/2023-10-05/wcag22rec/)

### 5.1 Contrast
- **SC 1.4.3 Contrast (Minimum):** 4.5:1 normal text; 3:1 large text (≥18pt / ~24px, or 14pt bold / ~18.5px). [Source](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- **SC 1.4.11 Non-text Contrast:** 3:1 for UI components and meaningful graphical objects. [Source](https://www.w3.org/TR/WCAG22/#non-text-contrast)
- **Text on hero photo:** W3C Technique G18 permits darkening the area *behind* the letters (scrim/blur rectangle/dark overlay) rather than tinting the entire image. Validate the **darkest pixel under the text**, not the average. [Source](https://www.w3.org/WAI/WCAG22/Techniques/general/G18) · [Failure pattern F83](https://www.w3.org/WAI/WCAG22/Techniques/failures/F83)

### 5.2 New in WCAG 2.2 (six criteria affecting this site)
[Source](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- **2.4.11 Focus Not Obscured (AA).** Focused control must not be hidden by sticky headers/cookie banners. Critical given our sticky donate header.
- **2.5.7 Dragging Movements (AA).** Provide a non-drag alternative for any drag interaction.
- **2.5.8 Target Size (AA).** Pointer targets ≥ **24×24 CSS pixels**, or spaced so 24-px circles don't intersect. Affects mobile donate tiers and gallery thumbnails.
- **3.2.6 Consistent Help (A).** Help mechanisms across pages must be in the same relative location.
- **3.3.7 Redundant Entry (A).** Don't make users re-type info already given in the same flow.
- **3.3.8 Accessible Authentication (AA).** No cognitive puzzles for login; allow password managers, OAuth, biometric.

### 5.3 Donation form patterns
- **Use native `<input type="radio">` inside a `<fieldset>`** for tier selection — the First Rule of ARIA: use native HTML when it provides the semantics. Tab moves into the group; arrow keys move/select within. [Source](https://www.w3.org/TR/using-aria/#rule1) · [Source](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- **JAWS does not read `$25` as money** — it reads the symbol literally. NVDA, VoiceOver, TalkBack do. Add a visually-hidden "Donate 25 US dollars" inside the same `<label>`. [Source](https://www.tpgi.com/money-talks-formatting-currency-in-web-content/)
- **Donation confirmation modal:** prefer native `<dialog>` with `.showModal()` — browser provides `aria-modal`, focus trap, inert backdrop for free. Return focus to the donate button on close. [Source](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) · [Source](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- **In-flight status:** `<p role="status">Donation processing…</p>` — implicit `aria-live="polite"` announcement. [Source](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role)

### 5.4 Core Web Vitals 2026 targets
All measured at the 75th percentile of real users. [Source](https://web.dev/articles/vitals)

| Metric | Good | Source |
|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | [web.dev](https://web.dev/articles/lcp) |
| **INP** (Interaction to Next Paint) | ≤ 200ms | [web.dev](https://web.dev/articles/inp) |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | [web.dev](https://web.dev/articles/cls) |

INP replaced FID as a Core Web Vital on **12 March 2024**. [Source](https://web.dev/blog/inp-cwv-launch)

### 5.5 Hero image strategy (the biggest LCP lever)
- **Never `loading="lazy"` the LCP hero.** Lazy-loaded in-viewport images wait for layout — measurably regresses LCP. [Source](https://web.dev/articles/lcp-lazy-loading)
- **Preload the LCP image** with `imagesrcset` + `fetchpriority="high"`:

```html
<link rel="preload" as="image"
      href="/img/hero-1200.jpg"
      imagesrcset="/img/hero-600.jpg 600w,
                   /img/hero-1200.jpg 1200w,
                   /img/hero-2000.jpg 2000w"
      imagesizes="100vw"
      fetchpriority="high">
```

Google Flights saw LCP improve **2.6s → 1.9s** by adding `fetchpriority`. [Source](https://web.dev/articles/fetch-priority) · [Source](https://web.dev/articles/preload-responsive-images)

- **Always set `width` and `height`** on every `<img>` — modern browsers derive aspect ratio, preventing CLS. [Source](https://web.dev/articles/optimize-cls)
- **Unsplash URLs use Imgix:** `auto=format` serves AVIF/WebP when supported; build responsive `srcset` with `w=` variants. Preserve the `ixid` param. [Source](https://unsplash.com/documentation)
- **Gallery thumbnails:** `loading="lazy"` + `decoding="async"`. Hero: `fetchpriority="high"`, no lazy.

---

## 6. SEO + Schema.org for non-profits

### 6.1 Schema strategy
Mark up identity once at the organisation level, then mark up each programme on its own page. Link via `subOrganization` / `parentOrganization` with `@id` URIs. [Source](https://developers.google.com/search/docs/appearance/structured-data/organization)

**Core schemas for Wasfa Gul Foundation:**

1. **NGO** — `name`, `legalName`, `url`, `logo`, `address`, `contactPoint`, `sameAs`, `nonprofitStatus`, `subOrganization` [Source](https://schema.org/NGO)
2. **Hospital** — multi-parent (MedicalOrganization + EmergencyService + CivicStructure). `medicalSpecialty`, `availableService`, `openingHoursSpecification`, `isAcceptingNewPatients` [Source](https://schema.org/Hospital)
3. **EducationalOrganization** — `alumni`, `numberOfStudents`, `hasCredential` [Source](https://schema.org/EducationalOrganization)
4. **DonateAction** — attached via `potentialAction` on the NGO. Google does NOT promise a "donate" rich result, but the markup is valid and consumed by AI/assistant engines. [Source](https://schema.org/DonateAction)
5. **FAQPage** — **caveat:** Google stopped showing FAQ rich results on **7 May 2026**; appearance/report being dropped June 2026. Markup remains valid for Bing, AI engines, assistants. [Source](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
6. **BreadcrumbList** — actively supported by Google.
7. **Article** for news (`headline`, `image` ≥1200px, `datePublished`, `author`, `publisher`). [Source](https://developers.google.com/search/docs/appearance/structured-data/article)
8. **Event** for camps and fundraisers (`startDate` ISO 8601 with timezone, `eventAttendanceMode`, `location`, `organizer`, `offers`). [Source](https://developers.google.com/search/docs/appearance/structured-data/event)

**Minimal JSON-LD example for the foundation:**

```json
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": "https://wasfagulfoundation.org/#org",
  "name": "Wasfa Gul Foundation",
  "url": "https://wasfagulfoundation.org/",
  "logo": "https://wasfagulfoundation.org/logo.png",
  "sameAs": ["https://facebook.com/wasfagul", "https://linkedin.com/company/wasfagul"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jhelum",
    "addressCountry": "PK"
  },
  "subOrganization": [
    {"@id": "https://wasfagulfoundation.org/#hospital"},
    {"@id": "https://wasfagulfoundation.org/#education"}
  ],
  "potentialAction": {
    "@type": "DonateAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://wasfagulfoundation.org/donate",
      "actionPlatform": [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform"
      ]
    },
    "recipient": {"@id": "https://wasfagulfoundation.org/#org"},
    "priceCurrency": "PKR"
  }
}
```

### 6.2 Open Graph & Twitter Cards
Essential tags per spec: `og:title`, `og:type`, `og:url`, `og:image`, plus recommended `og:description`, `og:site_name`, `og:locale`, `og:image:width`, `og:image:height`, `og:image:alt`. [Source](https://ogp.me/)

**Recommended:** 1200 × 630 px image (1.91:1, < 5 MB, JPG/PNG/WebP) — works for Facebook, LinkedIn, and Twitter `summary_large_image`. If Twitter tags are absent, Twitter falls back to OG.

### 6.3 What Google enriches for NGOs
- **Site name + sitelinks** via `WebSite` structured data on the homepage. Sitelinks are auto-generated; cannot be requested manually. [Source](https://developers.google.com/search/docs/appearance/site-names) · [Source](https://developers.google.com/search/docs/appearance/sitelinks)
- **Knowledge panel** built from `Organization`/`NGO` markup combined with Wikipedia/Wikidata `sameAs` links. [Source](https://developers.google.com/search/docs/appearance/structured-data/organization)
- No documented "Donate" SERP action; `DonateAction` markup is still recommended for semantic clarity.

---

## 7. CMS + donation gateway integration

| Path | Cost (yr 1) | Recurring | PK fit | Build effort |
|---|---|---|---|---|
| **WordPress + GiveWP free + JazzCash button** | ~$0–$150 | Manual (saved-card scheduler) | High | Low |
| **WordPress + GiveWP Plus + custom JazzCash Give gateway** | ~$349 + dev | Yes (with custom work) | High | Medium |
| **Webflow + Donorbox** | ~$420 (Webflow) | Yes (Stripe only) | Low without fiscal sponsor | Very low |
| **Headless (Sanity/Strapi) + JazzCash hosted** | ~$200 + dev | Limited | High | High |

[GiveWP pricing](https://givewp.com/pricing/) · [GiveWP Recurring add-on](https://givewp.com/addons/recurring-donations/) · [JazzCash sandbox](https://sandbox.jazzcash.com.pk/Sandbox/) · [Stripe global availability](https://stripe.com/global)

**Critical constraint repeated:** Stripe and PayPal are not available for Pakistan-registered merchant accounts. GiveWP's smoothest integration is Stripe; the GiveWP plugin directory does NOT contain a first-party JazzCash or Easypaisa gateway. There are community-built JazzCash plugins for WooCommerce; treating donations as WooCommerce orders is one workaround.

**Pragmatic recommendation for Wasfa Gul Foundation:**

**WordPress + GiveWP (free or Basic) + JazzCash/Easypaisa via custom integration for local PKR donations**, plus an overseas fiscal-sponsor route (UK/US sister charity) for international donors using PayPal/Stripe on that side. This is the same structural pattern Shaukat Khanum uses (SKMCH&RC + IKCA-USA + IKCA-UK).

---

## 8. Design implications for the Wasfa Gul Foundation rebuild

These translate the research into concrete, implementable decisions for the rebuild. Each maps to a specific finding above.

1. **Sticky header with persistent gold Donate button.** Every benchmark site does this. NextAfter's +55% sticky-button finding is the strongest single piece of conversion evidence in the report. Use the existing gold (#D4A017) on white header to mirror St. Jude's pattern.

2. **Three donate routes at the navigation level, not buried in a "Give" mega-menu.** Following Shaukat Khanum / HANDS / Edhi: `Donate`, `Zakat`, `Sadaqah` should be discoverable from the header. Donors with religious intent will not mix categories — splitting them up-front lifts conversion and trust.

3. **Zakat calculator embedded on the Zakat page** (2.5% of eligible amount, with gold/silver/cash/property fields per Islamic Relief model), plus a "100% to eligible recipients" statement and a Shariah-compliance + PCP certification badge near the form. Add an SMS short-code micro-donation route as a low-bandwidth alternative.

4. **Diaspora donate-routing in the footer.** Mirror HANDS: "Donate in Pakistan / Donate in UK / Donate in USA." This is a forcing function — the Foundation needs sister entities in UK and US to accept Stripe/PayPal, given those gateways do not work for PK-registered accounts.

5. **Patient/student stories with progress bars, named individuals, action verbs.** Transparent Hands' grid pattern ("Heal Miraj's Little Heart with Cardiac Surgery — 91.5% Complete") is the most chooseable, near-completed-goal framing in Pakistani charity UX. Add this pattern to the Hospital page for sponsorship and the Education page for scholarships.

6. **Up-front scam-alert strip on the donate page.** Edhi's pattern listing look-alike fraudulent domains is more trust-building than a "verified" badge for Pakistani donors. Reserve until at least one impersonation appears, then deploy proactively.

7. **British English copy with three Urdu touches, all in script (not transliteration).** (a) Urdu-script sibling to the Donate button — *عطیہ کریں* — mirroring HANDS; (b) *Sehat aur Taleem* (صحت اور تعلیم) as a hero subline; (c) *Khidmat-e-Khalq* (خدمتِ خلق) above the impact-stats band. Untranslated Islamic giving terms (Zakat, Sadqa, Lillah, Fidya) remain in the donate flow as standard practice. Reject Urdu beyond these locations — elite Pakistani institutions deliberately strip it from English homepages.

8. **Impact stats framed monetarily and as outcomes, not vanity metrics.** Replace generic counters with Shaukat Khanum's pattern: "PKR X spent on free treatment," "% patients treated free of cost," "outpatient visits in year." Edhi's service-volume framing ("1,800+ emergency vehicles") also works.

9. **WCAG 2.2 AA hard requirements before launch.** Sticky header must respect SC 2.4.11 (Focus Not Obscured) — use `scroll-padding-top` matching header height. All donate tier buttons ≥ 24×24px (SC 2.5.8). Donate tiers as `<input type="radio">` inside `<fieldset>` with visually-hidden "$25 = Donate 25 US dollars" labels for JAWS. Hero text uses a darkened scrim under letters per Technique G18 (already in current CSS — validate the darkest pixel).

10. **LCP hero strategy.** Preload the hero image with `<link rel="preload" as="image" imagesrcset=... fetchpriority="high">`. Never `loading="lazy"` the hero. Use Unsplash's `auto=format` for AVIF/WebP. Lazy-load all gallery thumbnails. Target LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.

11. **JSON-LD schema on every page.** Site-wide `NGO` + `WebSite` blocks; `Hospital` on the hospital page; `EducationalOrganization` on the education page; `FAQPage` on the FAQ (still mark up despite May 2026 Google deprecation — used by Bing/AI engines); `BreadcrumbList` on every inner page; `Article` on each news post; `Event` for camps.

12. **CMS path: WordPress + GiveWP for content + JazzCash hosted checkout for PKR donations.** Defer Webflow/Headless until budget supports custom dev. Plan for a UK or US sister entity within 18 months — without one, international donor coverage is functionally zero. Document this constraint in the strategy deck so the board understands it before the hospital opens.

---

## 9. Sources cited

**Global benchmarks:** [Gates Foundation](https://www.gatesfoundation.org/) · [AKF](https://akf.org/) · [AKDN](https://the.akdn/en/home) · [UNICEF](https://www.unicef.org/) · [St. Jude](https://www.stjude.org/) · [Mayo Clinic](https://www.mayoclinic.org/) · [Red Cross](https://www.redcross.org/)

**Pakistani benchmarks:** [Shaukat Khanum](https://shaukatkhanum.org.pk/) · [Transparent Hands](https://www.transparenthands.org/) · [HANDS](https://hands.org.pk/) · [Edhi](https://edhi.org/) · [Islamic Relief Pakistan Zakat Calculator](https://islamic-relief.org.pk/zakat-calculator-pakistan/) · [LUMS](https://lums.edu.pk/) · [AKU](https://www.aku.edu/Pages/home.aspx) · [IBA](https://www.iba.edu.pk/)

**Donation conversion:** [NextAfter sticky-button experiment](https://www.nextafter.com/experiments/how-a-sticky-donate-button-with-a-campaign-specific-cta-effects-donor-conversion-during-a-high-urgency-campaign/) · [NextAfter gift amounts](https://www.nextafter.com/experiments/how-suggested-gift-amounts-affects-donations/) · [NextAfter benchmarks](https://benchmarks.nextafter.com/) · [M+R Benchmarks 2026](https://mrbenchmarks.com/fundraising/) · [M+R via NonProfit PRO](https://www.nonprofitpro.com/article/monthly-giving-fuels-online-fundraising-growth-plus-5-more-insights-from-mr-benchmarks/) · [Neon One donate buttons](https://neonone.com/resources/blog/donate-button/) · [Bloomerang 2026](https://bloomerang.com/blog/2026-giving-report-donor-motivation-and-charitable-giving-trends) · [TrueSense trust badges](https://www.truesense.com/blog/building-donor-trust-with-secure-donation-badges) · [Zeffy 2026](https://www.zeffy.com/blog/donation-page) · [iDonate 2026](https://www.idonate.com/blog/nonprofit-online-donation-page-optimization-for-the-second-half-of-2026) · [Connection Point gift arrays](https://connectionpoint.com/fundraiserhub/suggested-donation-amounts/)

**Pakistani payment gateways:** [JazzCash Gateway](https://www.jazzcash.com.pk/corporate/online-payment-gateway/) · [JazzCash sandbox](https://sandbox.jazzcash.com.pk/Sandbox/) · [Udhaar.pk comparison](https://udhaar.pk/best-business-payment-app-pakistan/) · [Rapid Gateway PayFast review](https://rapidgateway.pk/resources/payfast-pakistan-review) · [Rapid Gateway 2026 comparison](https://rapidgateway.pk/resources/best-payment-gateway-pakistan) · [Buzz Interactive](https://www.buzzinteractive.co/blog/payment-gateways-in-pakistan) · [Stripe global](https://stripe.com/global) · [Wise PayPal in PK](https://wise.com/pk/blog/paypal-account-in-pakistan) · [Mazino Stripe Atlas guide](https://mazinooyolo.com/blog/stripe-account-in-pakistan/)

**WCAG 2.2 + Core Web Vitals:** [WCAG 2.2 Recommendation](https://www.w3.org/WAI/news/2023-10-05/wcag22rec/) · [WCAG 2.2 Spec](https://www.w3.org/TR/WCAG22/) · [New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) · [SC 1.4.3 Contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum) · [SC 1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast) · [Technique G18](https://www.w3.org/WAI/WCAG22/Techniques/general/G18) · [Failure F83](https://www.w3.org/WAI/WCAG22/Techniques/failures/F83) · [SC 2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) · [SC 2.5.8 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · [SC 3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) · [Using ARIA Rule 1](https://www.w3.org/TR/using-aria/#rule1) · [ARIA APG Radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) · [TPGi currency](https://www.tpgi.com/money-talks-formatting-currency-in-web-content/) · [MDN HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) · [web.dev Vitals](https://web.dev/articles/vitals) · [web.dev LCP](https://web.dev/articles/lcp) · [web.dev INP](https://web.dev/articles/inp) · [web.dev CLS](https://web.dev/articles/cls) · [INP launch](https://web.dev/blog/inp-cwv-launch) · [LCP lazy loading](https://web.dev/articles/lcp-lazy-loading) · [fetch-priority](https://web.dev/articles/fetch-priority) · [Preload responsive images](https://web.dev/articles/preload-responsive-images) · [Optimize CLS](https://web.dev/articles/optimize-cls) · [Unsplash docs](https://unsplash.com/documentation)

**SEO + Schema.org:** [schema.org/NGO](https://schema.org/NGO) · [schema.org/Hospital](https://schema.org/Hospital) · [schema.org/EducationalOrganization](https://schema.org/EducationalOrganization) · [schema.org/DonateAction](https://schema.org/DonateAction) · [Google Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization) · [Google FAQPage](https://developers.google.com/search/docs/appearance/structured-data/faqpage) · [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article) · [Google Event](https://developers.google.com/search/docs/appearance/structured-data/event) · [Google Site Names](https://developers.google.com/search/docs/appearance/site-names) · [Open Graph spec](https://ogp.me/)

**CMS + gateway:** [GiveWP pricing](https://givewp.com/pricing/) · [GiveWP Recurring](https://givewp.com/addons/recurring-donations/) · [Donorbox features](https://donorbox.org/donor-management)

---

*End of report. Save this document — it is the source of truth for the rebuild.*
