# Volterra Energy: Clean Energy Platform

**Volterra Energy** is a multi-page web application for residential and commercial clean energy systems, covering rooftop **Solar Panels**, **Battery Storage**, **Quiet Heating & Cooling (HVAC)**, **EV Charging**, and **Annual Care Plans** across the **USA, UK, Australia, and Canada**.

Built with human-friendly copy for everyday homeowners alongside collapsible technical specifications for engineers, the app prioritizes fast eager loading, mobile-first responsiveness, and interactive calculators that carry user selections directly into booking quotes.

---

## Key Features & Functionality

### 1. Multi-Page Navigation & Routing
Clean History API routing (`src/App.tsx`) with zero loading spinners and instant transitions across 12 views:
- **`/` (Home)**: Full-bleed hero with instant GSAP animations, quick savings hook, overview of services, featured customer results, and regional hub highlights.
- **`/solutions` (All Services)**: Side-by-side overview of Solar, Battery Backup, Heating & Cooling, and EV Charging with direct quote triggers.
- **`/solutions/solar` (Solar Panels)**: Home & commercial solar packages, architectural mounting details, and collapsible hardware specifications.
- **`/solutions/battery-storage` (Battery Storage)**: Blackout protection overview, nighttime solar storage, and embedded interactive **Power Outage Backup Checker**.
- **`/solutions/hvac` (Heating & Cooling)**: Ductless and whole-home heat pump solutions synced with rooftop solar, plus technical specs.
- **`/solutions/ev-charging` (EV Charging)**: Home Level-2 chargers with solar surplus charging and commercial parking canopy solutions.
- **`/energy-assessment` (Solar Savings Calculator & Planning Suite)**: Primary 30-second home & appliance solar calculator plus 3 optional deep-dive planning tools.
- **`/projects` & `/projects/:id` (Customer Projects & Case Studies)**: Filterable portfolio (`All`, `Homes`, `Businesses`, `Solar`, `Battery`, `HVAC`) with dedicated project case study pages and *"Book Similar System"* context handoff.
- **`/maintenance` (Annual Care Plans)**: Interactive 3-tier maintenance selector (`Solar Care`, `Complete Home`, `Business Care`) and enrollment request form.
- **`/about` (About Us)**: Engineering leadership team, 2018-2025 milestones, international certifications (NABCEP, MCS/IET, CEC, CSA/ESA), and 4 regional offices.
- **`/contact` (Contact & Free Quote Booking)**: Direct regional phone/email links and validated booking form that automatically pre-fills system recommendations, custom packages, or postal codes from calculators and project pages.

---

### 2. Interactive Calculators & Planning Tools

#### Home & Appliance Solar Savings Calculator (`SmartAssessmentTool`)
Designed so non-technical users get an accurate system estimate in under 30 seconds without needing utility bill jargon:
- **Region & Utility Pricing**: Switch between **USA**, **UK**, **Australia**, and **Canada**, automatically adjusting regional sun yield factors, default electricity rates, and currency symbols.
- **Property Type & Size**: Choose **Home** (`1-2 Bed`, `3-4 Bed`, `5+ Bed`) or **Business** (`Small Office/Shop`, `Store/Clinic`, `Warehouse/Facility`).
- **Interactive Appliance Picker**:
  - `-` / `+` stepper for Air Conditioner units
  - Clickable toggles for Refrigerator, Washing/Dryer, Electric Water Heater, Heat Pump, Electric Vehicle, Pool/Water Pump, and Heavy Equipment
- **Usage Timing & Battery Toggle**: Pick **Daytime**, **Balanced**, or **Evening/Night** usage and toggle battery backup on or off.
- **Optional Bill Override & Tech View**: Expandable manual monthly bill adjustment (`$`) plus a **"Tech View: Show kWh & Yield Math"** toggle displaying daily kWh estimates, sun hours, and offset math.
- **Persistence & Quote Handoff**: Saves inputs in `localStorage` and sends a formatted summary straight to the Contact Booking form.

#### Extra Planning Tools (Optional on `/energy-assessment`)
1. **20-Year Payback & Tax Credit Chart (`RoiAnalysisTool`)**:
   - Interactive Recharts line and bar charts comparing cumulative utility costs vs. clean-energy costs over **10 and 20 years**.
   - Sliders for system cost, current yearly electric bill, Year-1 savings, annual maintenance, utility inflation %, and an optional rebate/tax credit toggle.
2. **Power Outage Backup Checker (`BatterySimulatorTool`)**:
   - Select battery sizes (`10`, `13.5`, `20`, `27`, `40 kWh`) and toggle essential vs. heavy home appliances (`Fridge`, `Lights`, `Wi-Fi`, `Laptop`, `TV`, `AC`, `Laundry`).
   - Calculates usable battery energy (accounting for depth of discharge and inverter efficiency), total wattage load, estimated backup hours, and includes a live outage simulation time slider.
3. **Custom Package Builder (`SystemBuilderTool`)**:
   - Step-by-step bundle configurator for Solar array size (`5`-`15 kW`), Battery storage (`None`-`20 kWh`), HVAC zone system, Home EV Charger, Live Phone App monitoring, and 25-Year Protection Plan.
   - Updates estimated package price, annual kWh output, usable backup hours, and warranty duration in real time, with one-click quote submission.

---

### 3. Dual-Audience UX & Technical Depth
- **`TechSpecsDrawer`**: Reusable collapsible drawer included across `/solutions/solar`, `/solutions/battery-storage`, `/solutions/hvac`, and `/solutions/ev-charging`. Everyday readers see plain-English benefits first, while engineers and builders can expand detailed equipment specs (cell chemistry, efficiency ratings, warranties, inverter topologies).
- **Dynamic Per-Route SEO (`src/utils/seo.ts`)**: Automatically updates `<title>`, `<meta name="description">`, OpenGraph tags, Twitter cards, and Schema.org JSON-LD (`Organization`, `Service`, `WebApplication`, `CollectionPage`, `AboutPage`, `ContactPage`) on navigation.

---

### 4. Performance, Motion & Responsive Design
- **Fast Eager Loading**: All pages, interactive planning tools, and images (`ArchImage` with `loading="eager"` and bundled static assets) load immediately with no lazy-load spinners or scroll pop-in delays.
- **Optimized Bundle Splitting**: Configured Vite/Rolldown `manualChunks` separating `vendor-react`, `vendor-charts`, `vendor-gsap`, `vendor-motion`, and `vendor-icons`.
- **Non-Blocking GSAP Motion (`useInstantHeroGsap`)**: Fast `0.26s-0.28s` hero and card reveal animations using `gsap` + `ScrollTrigger` that never hide content at `opacity: 0` and respect `prefers-reduced-motion`.
- **Mobile-First Alignment**: Responsive grids, touch-friendly controls, full-width mobile CTAs where appropriate, overflow-safe layouts (`overflow-x-clip`), and a full-screen mobile navigation drawer.
- **Themed Developer Credit Footer**: Interactive footer badge displaying a Volterra-themed (`#0B3B3C`) popover with LinkedIn and GitHub profile links on hover or click.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8 (`@vitejs/plugin-react`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Charts & Data Visualization**: Recharts
- **Animations**: GSAP (`gsap` + `ScrollTrigger`), Motion
- **Icons**: Lucide React

---

## Project Structure

```text
├── index.html                          # Entry HTML + base SEO meta tags
├── metadata.json                       # App metadata
├── vercel.json                         # Vercel Vite build, dist output & SPA fallback rewrites
├── vite.config.ts                      # Vite + Tailwind v4 + manual vendor chunks
└── src/
    ├── App.tsx                         # Client routing, booking context state & layout shell
    ├── main.tsx                        # React 19 root mount
    ├── index.css                       # Global Tailwind v4 & design tokens
    ├── assets/                         # Static imported imagery
    ├── data/energyData.ts              # Regional configs, projects, appliances & maintenance plans
    ├── types/energy.ts                 # Shared TypeScript interfaces & route IDs
    ├── utils/
    │   ├── calculations.ts             # Solar sizing, battery runtime, package & 20-yr ROI math
    │   ├── seo.ts                      # Per-route document title, meta tags & JSON-LD injector
    │   └── useGsapReveal.ts            # Instant non-blocking GSAP ScrollTrigger animations
    ├── components/
    │   ├── interactive/
    │   │   ├── SmartAssessmentTool.tsx # Home-size & appliance solar savings calculator
    │   │   ├── RoiAnalysisTool.tsx     # 10/20-year payback & tax credit Recharts analyzer
    │   │   ├── BatterySimulatorTool.tsx# Blackout appliance load & runtime simulator
    │   │   ├── SystemBuilderTool.tsx   # Step-by-step custom solar/battery/HVAC/EV configurator
    │   │   └── MaintenanceSelector.tsx # Annual care plan comparison & signup form
    │   ├── layout/
    │   │   ├── Navbar.tsx              # Responsive header, solutions dropdown & mobile drawer
    │   │   ├── Footer.tsx              # Regional hubs, quick links & interactive dev credit
    │   │   └── PageContainer.tsx       # Consistent max-width & responsive padding wrapper
    │   └── ui/
    │       ├── AnimatedCounter.tsx     # Smooth numeric transitions for KPI readouts
    │       ├── ArchImage.tsx           # Eager-loaded image wrapper with clean fallback state
    │       ├── SectionHeader.tsx       # Standardized editorial section headers
    │       └── TechSpecsDrawer.tsx     # Collapsible engineering specs panel
    └── pages/
        ├── HomePage.tsx
        ├── SolutionsPage.tsx
        ├── SolarSolutionsPage.tsx
        ├── BatteryStoragePage.tsx
        ├── HvacSystemsPage.tsx
        ├── EvChargingPage.tsx
        ├── EnergyAssessmentPage.tsx
        ├── ProjectsPage.tsx
        ├── ProjectDetailPage.tsx
        ├── MaintenancePlansPage.tsx
        ├── AboutUsPage.tsx
        └── ContactBookingPage.tsx
```

---

## Getting Started & Deployment

### Prerequisites
- Node.js 18+ (or Bun)

### Installation & Local Development

```bash
# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev
```

### Verification & Production Build

```bash
# Type-check codebase
npm run lint

# Build production bundle into dist/
npm run build

# Preview built bundle locally
npm run preview
```

### Deploying to Vercel
`vercel.json` is pre-configured with `framework: "vite"`, `outputDirectory: "dist"`, and a catch-all SPA rewrite so all client routes (`/about`, `/solutions/solar`, `/energy-assessment`, `/projects/:id`) work without 404 errors on direct access or refresh.

---

## Developer
**Maheen Imran** | [LinkedIn](https://www.linkedin.com/in/maheenimran9) · [GitHub](https://github.com/maheenimran9)
