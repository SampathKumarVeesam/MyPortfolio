// ===================================================================
// main.ts — Application entry point
// ===================================================================

import "./style.css";
import { PORTFOLIO_DATA } from "./data";
import { renderPortfolio } from "./components";
import { buildThemeSwitcher } from "./theme-switcher";
import { loadSavedTheme } from "./themes";
import {
  initNavbar,
  initCursorGlow,
  initScrollReveal,
  initSkillBars,
  initCounters,
  initTypingEffect,
  initTiltCards,
  initParticleCanvas,
  initSmoothScroll,
  initContactForm,
} from "./interactions";

// Boot the application
document.addEventListener("DOMContentLoaded", (): void => {
  // 1. Render all DOM from typed data
  renderPortfolio(PORTFOLIO_DATA);

  // 2. Add theme switcher to the page
  document.body.appendChild(buildThemeSwitcher());

  // 3. Load saved theme (or default "dark")
  loadSavedTheme();

  // 4. Attach all interactive behaviors
  initNavbar();
  initCursorGlow();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initTypingEffect(PORTFOLIO_DATA.roles);
  initTiltCards();
  initParticleCanvas();
  initSmoothScroll();
  initContactForm();
});
