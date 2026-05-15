// ===================================================================
// dom.ts — Typed DOM helper utility
// ===================================================================

import type { ElementOptions } from "./types";

/**
 * Create a typed HTML element with optional classes, attributes, and content.
 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  opts: ElementOptions = {}
): HTMLElementTagNameMap[K] {
  const elem = document.createElement(tag);

  if (opts.className) elem.className = opts.className;
  if (opts.id) elem.id = opts.id;
  if (opts.html) elem.innerHTML = opts.html;
  if (opts.text) elem.textContent = opts.text;

  if (opts.attrs) {
    Object.entries(opts.attrs).forEach(([key, value]) => {
      elem.setAttribute(key, value);
    });
  }

  if (opts.style) {
    Object.assign(elem.style, opts.style);
  }

  if (opts.children) {
    opts.children.forEach((child) => {
      if (child) elem.appendChild(child);
    });
  }

  return elem;
}
