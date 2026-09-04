/* ─── Utility helpers ───────────────────────────────── */

/**
 * utils.js — Shared utility functions for Kumbhani Digital website
 */

/**
 * Debounce — limits how often a function fires
 * @param {Function} fn
 * @param {number} delay ms
 */
export function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle — ensures function fires at most once per interval
 * @param {Function} fn
 * @param {number} limit ms
 */
export function throttle(fn, limit = 100) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn(...args);
    }
  };
}

/**
 * Select a single DOM element (throws if missing in dev)
 * @param {string} selector
 * @param {Element} parent
 */
export function qs(selector, parent = document) {
  const el = parent.querySelector(selector);
  return el;
}

/**
 * Select all matching DOM elements
 * @param {string} selector
 * @param {Element} parent
 */
export function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

/**
 * Set current year in any element with id="footer-year"
 */
export function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/**
 * Add/remove class helper
 */
export function toggleClass(el, cls) {
  if (!el) return;
  el.classList.toggle(cls);
}

/**
 * Smooth scroll to element by ID
 * @param {string} id
 * @param {number} offset extra px offset (for sticky header)
 */
export function scrollToId(id, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
