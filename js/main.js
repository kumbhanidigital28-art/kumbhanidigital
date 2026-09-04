/**
 * main.js — Entry point for Kumbhani Digital website
 */
import { setFooterYear } from './utils.js';
import { initAnimations } from './animations.js';

/* ─── Page Loader ───────────────────────────────────── */
function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  }
}

/* ─── Contact Form Handler ──────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn    = form.querySelector('[type="submit"]');
    const status = document.getElementById('form-status');

    btn.disabled     = true;
    btn.textContent  = 'Sending…';

    // Simulate async submission (replace with real API endpoint)
    await new Promise(r => setTimeout(r, 1500));

    btn.textContent = 'Message Sent ✓';
    if (status) {
      status.textContent = 'Thanks! We\'ll get back to you within 24 hours.';
      status.className   = 'form-status success';
    }

    setTimeout(() => {
      form.reset();
      btn.disabled    = false;
      btn.textContent = 'Send Message';
      if (status) status.textContent = '';
    }, 4000);
  });
}

/* ─── Smooth scroll for anchor links ────────────────── */
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── Back to top button ────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Bootstrap ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initAnimations();
  initContactForm();
  initAnchorScroll();
  initBackToTop();
  hideLoader();
});
