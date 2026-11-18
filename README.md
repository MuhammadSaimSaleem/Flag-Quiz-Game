# 🏳️ Flag Quiz Game

An interactive, fast-paced world geography and flag identification web game built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. Test your knowledge of national flags across the globe, filter by region, track your streaks, and explore country facts powered by real-time country data.

---

## ✨ Features

* **🌍 Global & Regional Modes:** Play with flags from around the world or narrow your focus to specific continents/regions (Africa, Americas, Asia, Europe, Oceania).
* **⚡ Multiple-Choice Gameplay:** Fast, responsive rounds with instant visual feedback on correct and incorrect guesses.
* **🔥 Score & Streak Tracking:** Keep track of your current streak, high scores, and accuracy as you progress.
* **📊 Country Insights & Data:** Integrates live country metadata (capitals, regions, population, and high-resolution flag SVGs/PNGs) alongside local fallback datasets (`src/data`).
* **📱 Responsive & Accessible UI:** Clean, modern interface built with reusable UI primitives (`src/components/ui`) that works seamlessly across desktop and mobile screens.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack), React, TypeScript |
| **Styling & UI** | Tailwind CSS, Custom UI Components (`src/components/ui`) |
| **Data & API** | REST Countries API + Local Country Dataset (`src/data`) |

---

## 📁 Project Structure

```text
Flag-Quiz-Game/
├── public/                 # Static assets, icons, and fallback media
└── src/
    ├── app/                # Next.js App Router pages, layouts, and global styles
    ├── components/
    │   ├── lib/            # Component-level helpers and wrappers
    │   └── ui/             # Reusable UI primitives (buttons, cards, badges, etc.)
    ├── data/               # Local country & flag fallback datasets
    └── lib/                # API fetchers, quiz logic, and shared utilities
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** 18+ (20+ recommended)
* **npm**, **pnpm**, or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/MuhammadSaimSaleem/Flag-Quiz-Game.git
cd Flag-Quiz-Game
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start playing.

---

## 📜 Available Scripts

* `npm run dev` — Starts the Next.js development server.
* `npm run build` — Creates an optimized production build.
* `npm run start` — Starts the production server.
* `npm run lint` — Runs ESLint to check for code quality and formatting issues.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
