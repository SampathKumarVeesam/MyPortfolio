// ===================================================================
// theme-switcher.ts — Floating theme picker panel component
// ===================================================================

import { el } from "./dom";
import { THEMES, applyTheme, type ThemeDefinition } from "./themes";

/**
 * Build and attach the floating theme switcher UI.
 */
export function buildThemeSwitcher(): HTMLElement {
  // Container
  const wrapper = el("div", { className: "theme-switcher", id: "theme-switcher" });

  // Toggle button (palette icon)
  const toggleBtn = el("button", {
    className: "theme-toggle-btn",
    id: "theme-toggle-btn",
    attrs: { "aria-label": "Toggle theme picker", title: "Change Theme" },
    html: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  });

  // Panel
  const panel = el("div", { className: "theme-panel", id: "theme-panel" });

  // Panel header
  const panelHeader = el("div", { className: "theme-panel-header" });
  panelHeader.appendChild(el("h3", { text: "Choose Theme" }));
  panelHeader.appendChild(
    el("span", { className: "theme-panel-subtitle", text: "16 handcrafted color palettes" })
  );
  panel.appendChild(panelHeader);

  // Group themes by category
  const categories: Map<string, ThemeDefinition[]> = new Map();
  THEMES.forEach((theme) => {
    if (!categories.has(theme.category)) {
      categories.set(theme.category, []);
    }
    categories.get(theme.category)!.push(theme);
  });

  // Render each category
  categories.forEach((themes, categoryName) => {
    const group = el("div", { className: "theme-group" });
    group.appendChild(el("div", { className: "theme-group-label", text: categoryName }));

    const grid = el("div", { className: "theme-grid" });
    themes.forEach((theme) => {
      const option = el("button", {
        className: "theme-option",
        attrs: { "data-theme": theme.id, title: theme.name },
      });

      // Color swatches preview
      const swatches = el("div", { className: "theme-swatches" });
      theme.preview.forEach((color) => {
        swatches.appendChild(
          el("span", {
            className: "theme-swatch",
            style: { background: color },
          })
        );
      });
      option.appendChild(swatches);

      // Label
      option.appendChild(el("span", { className: "theme-name", text: theme.name }));

      // Click handler
      option.addEventListener("click", () => {
        applyTheme(theme.id);
      });

      grid.appendChild(option);
    });

    group.appendChild(grid);
    panel.appendChild(group);
  });

  // Toggle panel
  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
    toggleBtn.classList.toggle("active");
  });

  // Close panel when clicking outside
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!wrapper.contains(target)) {
      panel.classList.remove("open");
      toggleBtn.classList.remove("active");
    }
  });

  wrapper.append(toggleBtn, panel);
  return wrapper;
}
