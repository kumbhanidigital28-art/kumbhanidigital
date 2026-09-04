/**
 * animations.js — Scroll-reveal & counter animations for Kumbhani Digital
 */
import { qsa } from './utils.js';

/* ─── Scroll Reveal (IntersectionObserver) ──────────── */
function initScrollReveal() {
  const revealEls = qsa('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ─── Stagger Children ──────────────────────────────── */
function initStagger() {
  qsa('.stagger').forEach(parent => {
    [...parent.children].forEach(child => {
      child.classList.add('reveal');
    });
  });
}

/* ─── Animated Counters ─────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.count || el.textContent, 10);
  const suffix = el.textContent.replace(/[0-9]/g, '').trim(); // e.g. "+"
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = qsa('.stat-number[data-count], .stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => {
    // Store original text as data-count if not already set
    if (!el.dataset.count) {
      const num = parseInt(el.textContent, 10);
      if (!isNaN(num)) el.dataset.count = num;
    }
    observer.observe(el);
  });
}

/* ─── Floating elements ─────────────────────────────── */
function initFloat() {
  qsa('.float').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.4}s`;
  });
}

/* ─── Init all ──────────────────────────────────────── */
export function initAnimations() {
  initStagger();
  initScrollReveal();
  initCounters();
  initFloat();
}
