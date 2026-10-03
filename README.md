# GeoLeadScraper — Free Google Maps Scraper (Chrome Extension)

**GeoLeadScraper is a free, open-source Google Maps scraper** — a Chrome /
Chromium extension that extracts public business data from **Google Maps**
(plus **Yandex Maps** and **2GIS**) and exports it to **CSV, XLSX or JSON** in
one click. No account, no API key, no quotas, no tracking.

If you've been looking for a **free Google Maps scraper for lead generation**
that runs entirely in your browser, this is it: search any place on Google Maps,
hit **Start extracting**, and download a clean spreadsheet of business leads —
names, addresses, phone numbers, websites, ratings, reviews and more.

**🌐 Website & docs: [geoleadscraper.com](https://geoleadscraper.com/)** — install guide, how-to and FAQ.

<p>
  <a href="https://geoleadscraper.com/"><img alt="Website" src="https://img.shields.io/badge/website-geoleadscraper.com-0a7cff.svg"></a>
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green.svg">
  <img alt="Manifest V3" src="https://img.shields.io/badge/Chrome-MV3-blue.svg">
  <img alt="Free & Open Source" src="https://img.shields.io/badge/free-open--source-brightgreen.svg">
</p>

> ⚠️ Use responsibly and in compliance with the terms of service of the maps you
> scrape and with applicable data-protection laws. Only public business data.

## Why GeoLeadScraper?

- 🆓 **Truly free Google Maps scraper** — MIT-licensed, no paywall, no sign-up, no credit card.
- 🗺️ **Google Maps, Yandex Maps & 2GIS** — one tool, three of the biggest map providers.
- 🔑 **No API key, no Google Places API** — scrapes the page you're looking at, in your browser.
- 📤 **One-click export** to **CSV / Excel (XLSX) / JSON**.
- ⭐ **Google Maps reviews export** — download every review of a business.
- 🧲 **Built for lead generation** — turn any map search into a list of business leads.
- 🔌 **Optional self-hosted backend** to also scrape **emails, phone numbers and social links** from each business website.
- 🤖 **MCP server included** — let Claude (or any MCP client) collect and analyze leads on command.
- 🕵️ **Private** — runs locally, your data never touches our servers (there are none).

## What you can extract

Business name · category · full address · phone number · website · rating ·
review count · latitude / longitude · opening hours · claimed status · menu /
booking links — and, with the optional backend, **email addresses, phone numbers
and social media links** scraped from each business's own website.

**Reviews** of any single place: author · rating · text · language · publish/edit
date · sub-ratings · photo links · owner response · review link.

## Supported platforms

| Map | Status |
| --- | --- |
| Google Maps | ✅ Google Maps scraper (search results + reviews of a place) |
| Yandex Maps | ✅ |
| 2GIS | ✅ |

## Quick start (install the Chrome extension)

### Install the ready-made build (no coding)
1. Go to **[Releases → latest](https://github.com/ozhehkovski/geoleadscraper/releases/latest)** and download
   **`geoleadscraper-extension-vX.Y.Z.zip`** (not "Source code").
2. Unzip it.
3. Open `chrome://extensions` → enable **Developer mode** → **Load unpacked** →
   select the unzipped folder (the one that contains `manifest.json`).

> ⚠️ The green **Code → Download ZIP** button gives you the *source code*, not the
> extension. Loading that folder fails with *"Manifest file is missing or unreadable"* —
> use the Releases zip above, or build it yourself.

### Build from source
Requirements: Node.js >= 20 and pnpm >= 9 (`npm i -g pnpm`).
```bash
pnpm install
pnpm build:extension
```
Then in Chrome: open `chrome://extensions` → enable **Developer mode** →
**Load unpacked** → select `apps/extension/dist`.

📖 Step-by-step install guide with screenshots: **[geoleadscraper.com/install](https://geoleadscraper.com/install)**.

### Optional: scrape website contacts (emails / phones / socials)
```bash
pnpm dev:api
# or: cd apps/api && docker compose up --build
```
Then open extension **Settings** → set **Backend URL** (default `http://localhost:5050`).

### Optional: MCP server (collect leads from Claude)
A built-in [MCP server](apps/api/MCP.md) lets an AI assistant such as Claude run
`collect_maps(...)` to scrape businesses through the extension and analyze them.
See [apps/api/MCP.md](apps/api/MCP.md).

---

## 📋 How to Use — Step-by-Step Guide

### Step 1 — Install the extension

Follow the [Quick start](#quick-start-install-the-chrome-extension) section above.
Once loaded you will see the GeoLeadScraper icon in your Chrome toolbar.

---

### Step 2 — Open Google Maps and search

1. Go to **[google.com/maps](https://www.google.com/maps)** — or any regional
   Google domain: `google.co.in`, `google.co.uk`, `google.de`, `google.fr`, etc.
2. Type your search, for example:
   - `"restaurants in Mumbai"`
   - `"plumbers in London"`
   - `"dentists near Times Square"`
3. Wait for the **results list** to appear on the left side of the page.

> 💡 The more specific your search, the more targeted your leads.
> Combine a business type with a city or neighbourhood for best results.

**Yandex Maps / 2GIS** — navigate to the map, perform a category search, then follow the same steps.

---

### Step 3 — Open the extraction panel

The GeoLeadScraper widget appears **automatically** as a floating panel on the
left side of Google Maps (right side for 2GIS).

If the panel doesn't appear:
- Make sure you're on a **search results** page (results list on the left must be visible).
- Try refreshing the page.
- Check the extension is enabled in `chrome://extensions`.

---

### Step 4 — Start extracting

Click **"Start extracting"** in the panel.

- The counter updates in real time as businesses are collected.
- The extension automatically pages through all results — no manual scrolling needed.
- Google Maps returns ~20 results per request; the extension keeps fetching until no more pages exist or your configured limit is reached.

**To pause** (Google Maps only): click **Pause** — resume later from where you left off.  
**To stop early**: click **Stop** — you can still export whatever was collected.

---

### Step 5 — Export your leads

When extraction finishes (or after pausing/stopping), click **"Export results (N)"**.

The file downloads immediately. Every export always contains exactly **7 columns**:

| # | Column | Description |
|---|--------|-------------|
| 1 | **Name** | Business name |
| 2 | **Address** | Full street address |
| 3 | **Phone** | Phone number — *blank if not listed* |
| 4 | **Email** | Email address — *blank if not listed* |
| 5 | **Website** | Website URL — *blank if not listed* |
| 6 | **Has Website** | `TRUE` or `FALSE` — filter-ready in Excel / Google Sheets |
| 7 | **Map Link** | Direct Google Maps URL for that specific business (`maps.google.com/?cid=…`) |

> 💡 **Excel / Google Sheets tips:**
> - Filter `Has Website = FALSE` → businesses with **no website** (prime leads for web agencies).
> - Filter `Has Website = TRUE` then filter `Phone` is blank → businesses missing contact info.
> - Click any **Map Link** cell to open that business directly in Google Maps.

---

### Step 6 — Choose your export format

Go to extension **Settings** (click the GeoLeadScraper icon → Settings) and pick:

| Format | Best for |
|--------|----------|
| **CSV** | Google Sheets, any spreadsheet app, CRM imports |
| **XLSX** | Microsoft Excel (native format, correct column order guaranteed) |
| **JSON** | Developers, automation scripts, API pipelines |

---

### Step 7 — Export Google Maps reviews (optional)

To collect all reviews of a **single business**:

1. Click any business in the results to open its detail panel.
2. GeoLeadScraper switches to **Reviews mode** automatically.
3. Click **"Extract reviews"**.
4. The extension opens the Reviews tab and auto-scrolls to load all pages.
5. When the counter stops, click **"Export reviews"**.

Each review row contains: author · star rating · review text · date · owner reply · sub-ratings · photo links.

---

### Step 8 — Scrape emails & phones from websites (optional)

> Requires the optional self-hosted backend.

1. Start the backend:
   ```bash
   pnpm dev:api
   # or
   cd apps/api && docker compose up --build
   ```
2. Open extension **Settings** → set **Backend URL** to `http://localhost:5050`.
3. Enable **"Extract website contacts"** in Settings.
4. Run extraction — the extension visits each business website and extracts
   publicly listed emails, phones and social media links.

---

### Step 9 — Reset and run a new search

Click **Reset** in the panel to clear results, then return to Step 2 with a new query.

---

### Tips & best practices

| Tip | Details |
|-----|---------|
| **Use regional Google domains** | `google.co.in` for India, `google.co.uk` for UK — results are localised |
| **Narrow your search** | `"electricians in Brooklyn"` gives better leads than `"electricians"` |
| **Use Pause** | On Google Maps you can pause mid-extraction and resume — useful for large searches |
| **Increase request interval** | In Settings, raise the delay between requests to reduce rate-limit risk |
| **Auto-download** | Enable **Auto download** in Settings to save automatically when extraction finishes |
| **Filter Has Website = FALSE** | Find local businesses with no website — high-value leads for agencies |
| **Open Map Link** | Every row has a direct link to that business on Google Maps — verify before outreach |

---

## Monorepo layout
```
geoleadscraper/
└── apps/
    ├── api/         # Optional stateless backend (NestJS + Puppeteer) + MCP server
    └── extension/   # Chrome MV3 extension (Turborepo + Vite + React)
```
Tooling: **pnpm workspaces + Turborepo**.

## Development
```bash
pnpm dev:extension   # watch-build the extension
pnpm dev:api         # run the backend in watch mode
pnpm lint
pnpm type-check
pnpm test
```

### Releasing
Bump `APP_VERSION` in `apps/extension/packages/shared/config.ts`, merge, then push a
matching tag (`git tag v1.2.0 && git push origin v1.2.0`). The **Extension** GitHub
Action builds the extension and attaches `geoleadscraper-extension-vX.Y.Z.zip` to the release.

## FAQ

**Is this really a free Google Maps scraper?**
Yes — 100% free and open-source (MIT). No account, no quotas, no trial, no hidden Pro tier.

**Do I need the Google Places API or an API key?**
No. GeoLeadScraper reads public Google Maps search results in your browser — no API key, no billing.

**Is there a limit on how many results I can scrape?**
No paid limit. Collect as many results as Google Maps returns; use a reasonable pace
to stay within the platforms' terms of service.

**Can it scrape emails and phone numbers from business websites?**
Yes, with the optional self-hosted backend, which visits each business website and
extracts publicly listed emails, phones and social links.

**Does it work with Yandex Maps and 2GIS too?**
Yes — the same extension scrapes Google Maps, Yandex Maps and 2GIS.

**Does it work on google.co.in / google.co.uk / google.de?**
Yes — the extension activates on all major regional Google domains automatically.

**What columns does the exported file have?**
Every export (CSV, XLSX, JSON) always has exactly 7 columns in this order:
Name · Address · Phone · Email · Website · Has Website · Map Link.
Missing values are left **blank** (never "N/A"), and Has Website is `TRUE`/`FALSE`
so you can filter in Excel with one click.

## Keywords

free google maps scraper · google maps scraper chrome extension · google maps
data extractor · scrape google maps · google maps lead generation · business
leads scraper · yandex maps scraper · 2gis scraper · email & phone scraper ·
export google maps to csv/excel · open-source web scraper · no API key.

## Links
- 🌐 Website & docs: **[geoleadscraper.com](https://geoleadscraper.com/)**
- 📋 How to use: [Step-by-step guide](#-how-to-use--step-by-step-guide)
- ❓ FAQ: [geoleadscraper.com/faq](https://geoleadscraper.com/faq)

## License
[MIT](./LICENSE) — free for personal and commercial use.
