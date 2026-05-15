# Sampath Kumar Veesam – Professional Portfolio

A high-end, data-driven professional portfolio built with **TypeScript**, **Vite**, and **Vanilla CSS**. This project features a stunning glassmorphic design, realistic 3D interactive elements, and a dynamic 16-color theme system.

![Hero Section](./public/images/hero-bg.png) <!-- Update with an actual screenshot if needed -->

## ✨ Features

- **Data-Driven Architecture:** All portfolio content (resume, skills, projects) is centralized in a single `data.ts` file. No HTML to manage!
- **16 Dynamic Themes:** A built-in theme switcher offering 16 handcrafted color palettes across three categories (Color Theory, Project Style, Purpose).
- **Glassmorphism Design:** Modern, premium aesthetic with frosted glass effects, subtle borders, and glowing accents.
- **Interactive 3D Elements:** Cards tilt based on mouse position using perspective transformations.
- **Particle Canvas Background:** A professional, lightweight floating node background that connects as elements get closer.
- **Animations:** Scroll-reveal sections, animated stat counters, and typing text effects.
- **Fully Type-Safe:** Built with strict TypeScript interfaces for all data structures and DOM interactions.
- **Vite Powered:** Lightning-fast HMR and optimized production builds.

## 📁 Project Structure

```
MyPortfolio/
├── index.html              # Minimal Vite entry point (only hosts the canvas and #app container)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── public/                 # Static assets (images)
└── src/
    ├── types.ts            # TypeScript interfaces defining the data structures
    ├── data.ts             # 📝 **THE SOURCE OF TRUTH**: Edit this file to update your portfolio content!
    ├── components.ts       # Functions that dynamically build the DOM sections
    ├── dom.ts              # Type-safe utility for creating HTML elements
    ├── interactions.ts     # Logic for scroll reveal, counters, typing, 3D tilt, and particles
    ├── themes.ts           # Definition of the 16 color themes
    ├── theme-switcher.ts   # UI component for the floating theme picker
    ├── main.ts             # Application entry point (renders components, attaches interactions)
    └── style.css           # Global design system, glassmorphism, and responsive layouts
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone or download the repository.
2. Open your terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled files will be output to the `dist/` directory, ready to be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

## ✍️ How to Update Your Content

You **do not** need to edit any HTML. To update your portfolio (add a new job, change a skill, update your bio):

1. Open `src/data.ts`.
2. Modify the `PORTFOLIO_DATA` object. 
3. Save the file. The UI will automatically rebuild based on your new data.

The data structure is strictly typed via `src/types.ts`, so your IDE will provide autocomplete and error checking as you edit!

## 🎨 Changing Default Themes

By default, the portfolio loads the "dark" theme (or whatever the user last selected via `localStorage`). If you want to change the initial default theme, modify the `loadSavedTheme` function in `src/themes.ts`:

```typescript
export function loadSavedTheme(): void {
  const saved = localStorage.getItem("portfolio-theme");
  // Change "dark" to your preferred theme ID (e.g., "monochromatic", "luxury", "light")
  applyTheme(saved || "dark"); 
}
```

## 🛠 Tech Stack

- **HTML5**: Semantic structure via DOM generation.
- **Vanilla CSS3**: CSS Variables for theming, Grid/Flexbox layouts, Keyframe animations.
- **TypeScript**: Strict typing for data and DOM interactions.
- **Vite**: Next-generation frontend tooling.

---

Crafted with ♥ by Sampath Kumar Veesam.

LIVE LINK : https://portfolio-sampath.netlify.app/
