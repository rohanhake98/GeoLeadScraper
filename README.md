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

### Map providers

| Map | Status |
| --- | --- |
| Google Maps | ✅ Google Maps scraper (search results + reviews of a place) |
| Yandex Maps | ✅ |
| 2GIS | ✅ |

### Browsers

| Browser | Support |
| ------- | ------- |
| Google Chrome | ✅ Full support |
| Microsoft Edge | ✅ Full support (Chromium-based, same steps as Chrome) |
| Brave | ✅ Works (Chromium-based) |
| Opera | ✅ Works (Chromium-based) |
| Firefox | ❌ Not supported (different extension format) |
| Safari | ❌ Not supported |

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

**Windows (PowerShell):**
```powershell
# 1. Copy the env file
Copy-Item apps/extension/.env.example apps/extension/.env

# 2. Install dependencies (skip Puppeteer browser download)
$env:PUPPETEER_SKIP_DOWNLOAD="true"; pnpm install

# 3. Build sub-packages first
pnpm turbo ready --filter="./apps/extension/packages/*" --force

# 4. Build the extension
pnpm turbo build --filter="./apps/extension/chrome-extension" --filter="./apps/extension/pages/*" --force
```

**macOS / Linux:**
```bash
cp apps/extension/.env.example apps/extension/.env
PUPPETEER_SKIP_DOWNLOAD=true pnpm install
pnpm turbo ready --filter="./apps/extension/packages/*" --force
pnpm turbo build --filter="./apps/extension/chrome-extension" --filter="./apps/extension/pages/*" --force
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

## 🛠️ Install from Source Code ZIP — Complete Step-by-Step Guide

> This guide walks you through **every single step** from downloading the repository ZIP to having a working Chrome extension — no prior experience required.

---

### Prerequisites

Before you start, make sure the following are installed on your computer:

| Tool | Minimum version | Download |
|------|----------------|---------|
| **Node.js** | v20 or later | [nodejs.org](https://nodejs.org/) |
| **pnpm** | v9 or later | installed in Step 3 below |
| **Google Chrome** (or any Chromium browser) | any recent version | [google.com/chrome](https://www.google.com/chrome/) |

> 💡 To check if Node.js is already installed, open a terminal and run `node -v`. You need to see `v20.x.x` or higher.

---

### Step 1 — Download the source code ZIP

1. Open your browser and go to the repository:
   **[github.com/ozhehkovski/geoleadscraper](https://github.com/ozhehkovski/geoleadscraper)**
2. Click the green **`< > Code`** button near the top-right of the page.
3. In the dropdown, click **`Download ZIP`**.
4. Your browser will download a file called **`geoleadscraper-main.zip`** (or similar) — save it anywhere you like (e.g. your `Downloads` folder).

> ⚠️ This ZIP contains the **source code**. You must build it before Chrome can load it (that's what the next steps do).

---

### Step 2 — Extract (unzip) the file

**Windows:**
1. Right-click `geoleadscraper-main.zip` in File Explorer.
2. Choose **"Extract All…"** → click **Extract**.
3. A new folder named **`geoleadscraper-main`** will appear next to the ZIP.

**macOS:**
1. Double-click `geoleadscraper-main.zip` in Finder.
2. A folder called **`geoleadscraper-main`** will be created automatically.

**Linux:**
```bash
unzip geoleadscraper-main.zip
```

You should now have a folder with files like `package.json`, `turbo.json`, `apps/`, etc. inside it.

---

### Step 3 — Install pnpm (if not already installed)

Open a terminal (Command Prompt / PowerShell on Windows, Terminal on Mac/Linux) and run:

```bash
npm install -g pnpm
```

Verify it worked:
```bash
pnpm -v
# Should output: 9.x.x or higher
```

---

### Step 4 — Open a terminal inside the project folder

**Windows (File Explorer):**
1. Open the extracted `geoleadscraper-main` folder in File Explorer.
2. Click the address bar at the top → type `cmd` → press **Enter**.
   *(Alternatively: hold `Shift`, right-click an empty area in the folder → "Open PowerShell window here".)*

**macOS / Linux:**
```bash
cd ~/Downloads/geoleadscraper-main
# (adjust the path to wherever you extracted the ZIP)
```

All remaining commands in this guide must be run from **inside this folder**.

---

### Step 5 — Prepare the environment and install dependencies

#### Step 5a — Copy the `.env` file

The build tool requires a `.env` file inside `apps/extension/`. Without it, the build silently runs **0 tasks**.

**Windows (PowerShell):**
```powershell
Copy-Item apps\extension\.env.example apps\extension\.env
```

**macOS / Linux:**
```bash
cp apps/extension/.env.example apps/extension/.env
```

> ⚠️ **This step is mandatory.** Skipping it causes `pnpm build:extension` to produce "No tasks were executed" with no error message.

#### Step 5b — Install project dependencies

**Windows (PowerShell):**
```powershell
$env:PUPPETEER_SKIP_DOWNLOAD="true"; pnpm install
```

**macOS / Linux (bash/zsh):**
```bash
PUPPETEER_SKIP_DOWNLOAD=true pnpm install
```

> ⚠️ **Why the `PUPPETEER_SKIP_DOWNLOAD` flag?**  
> The project includes an optional API backend that uses Puppeteer. During install, Puppeteer tries to auto-download its own bundled Chromium browser. This download often fails on restricted networks or corrupted caches. Since you only need the **Chrome extension** (not the backend), skipping this download is completely safe and has no effect on the extension.

This will download all required packages into a `node_modules/` folder. It may take a minute or two depending on your internet connection.

Expected output (last few lines will look something like):
```
Packages: +XXX
Progress: resolved XXX, reused XXX, downloaded XXX, added XXX, done
```

---

### Step 6 — Build the Chrome extension

The build requires **two commands** — the first compiles the internal helper packages, the second builds the actual extension.

**Step 6a — Build sub-packages** (must run first):

**Windows (PowerShell):**
```powershell
pnpm turbo ready --filter="./apps/extension/packages/*" --force
```
**macOS / Linux:**
```bash
pnpm turbo ready --filter="./apps/extension/packages/*" --force
```

Expected: `Tasks: 3 successful, 3 total`

**Step 6b — Build the extension**:

```bash
pnpm turbo build --filter="./apps/extension/chrome-extension" --filter="./apps/extension/pages/*" --force
```

Expected output:
```
Tasks:    7 successful, 7 total
Cached:   0 cached, 7 total
  Time:   ~45s
```

The final extension files are written to:
```
apps/extension/dist/
```

You should see these files inside `dist/`: `manifest.json`, `service-worker.js`, `injected.js`, icon files, and `popup/`, `options/`, `content/` folders.

> ⚠️ If the build fails:
> - Make sure you copied `.env` in Step 5a
> - Make sure `pnpm install` completed without errors
> - Make sure Node.js is v20 or higher (`node -v`)

---

### Step 7 — Open the Extensions page

**Google Chrome:**
1. Open Chrome and in the address bar type:
   ```
   chrome://extensions
   ```
   Press **Enter**.
2. In the top-right corner, toggle **"Developer mode"** to **ON**.
   - Three buttons appear: *Load unpacked*, *Pack extension*, *Update*.

**Microsoft Edge:**
1. Open Edge and in the address bar type:
   ```
   edge://extensions
   ```
   Press **Enter**.
2. In the bottom-left sidebar, toggle **"Developer mode"** to **ON**.
   - The **"Load unpacked"** button appears at the top.

> 💡 Edge is built on Chromium and supports Chrome extensions natively — no extra configuration needed.

---

### Step 8 — Load the built extension

1. Click **"Load unpacked"**.
2. A file picker opens. Navigate to the `dist` folder inside your project:
   ```
   geoleadscraper-main/apps/extension/dist
   ```
3. Select (click once) the **`dist`** folder — do **not** go inside it — then click **"Select Folder"** (Windows) or **"Open"** (Mac/Linux).
4. The **GeoLeadScraper** extension card will appear with a blue toggle (enabled).

> ✅ You're done! The extension is now installed.

---

### Step 9 — Pin the extension to your toolbar (recommended)

**Chrome:**
1. Click the **puzzle-piece icon** (🧩) at the top-right of Chrome.
2. Find **GeoLeadScraper** in the list.
3. Click the **pin icon** (📌) next to it.

**Edge:**
1. Click the **puzzle-piece icon** (🧩) or **Extensions** button at the top-right of Edge.
2. Find **GeoLeadScraper** in the list.
3. Click the **eye icon** (👁) or **"Show in toolbar"** toggle next to it.

---

### Step 10 — Verify the extension works

1. In Chrome or Edge, go to **[google.com/maps](https://www.google.com/maps)**.
2. Search for any business type, e.g. `"coffee shops in New York"`.
3. Wait for the results list to load on the left side.
4. You should see the **GeoLeadScraper floating panel** appear automatically on the left.
5. Click **"Start extracting"** — the counter should start incrementing.

🎉 If you see the panel and the counter moves, everything is working correctly!

---

### Troubleshooting

| Problem | Fix |
|---------|-----|
| *`pnpm install` fails with "Failed to set up chrome"* | Puppeteer can't download its browser. Use `$env:PUPPETEER_SKIP_DOWNLOAD="true"; pnpm install` (PowerShell) or `PUPPETEER_SKIP_DOWNLOAD=true pnpm install` (Mac/Linux). |
| *Build says "No tasks were executed"* | The `.env` file is missing. Run `Copy-Item apps\extension\.env.example apps\extension\.env` (Windows) or `cp apps/extension/.env.example apps/extension/.env` (Mac/Linux), then rebuild. |
| *"Manifest file is missing or unreadable"* in Chrome | You selected the wrong folder. Make sure you select `apps/extension/dist` — the folder that contains `manifest.json` directly. |
| *`pnpm install` fails with other errors* | Check your Node.js version (`node -v` must be ≥ v20). Re-run `npm install -g pnpm` to update pnpm. |
| Panel doesn't appear on Google Maps | Make sure the extension is enabled in `chrome://extensions` or `edge://extensions`. Refresh the Google Maps tab after enabling. |
| Extension icon shows an error badge | Click the error badge for details. Usually means a stale build — re-run the two build commands from Step 6 and reload the extension. |
| Edge shows *"Extensions that aren't from the Microsoft Store"* banner | This is just a warning. Click **"Keep it on"** — the extension is safe to use. You can also go to `edge://extensions` → toggle **"Allow extensions from other stores"** to dismiss this permanently. |

> 💡 After any code change, re-run the two build commands from Step 6, then click the **refresh icon** on the extension card at `chrome://extensions` to apply the update.

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
