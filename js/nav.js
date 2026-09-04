/**
 * nav.js — Sticky header & mobile menu for Kumbhani Digital
 */
import { qs, throttle } from './utils.js';

const header    = qs('#site-header');
const hamburger = qs('#hamburger');
const navLinks  = qs('#nav-links');

/* ─── Sticky header on scroll ───────────────────────── */
function handleScroll() {
  if (!header) return;
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', throttle(handleScroll, 80), { passive: true });
handleScroll(); // run once on load

/* ─── Mobile hamburger menu ─────────────────────────── */
function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger bars → X
  const bars = hamburger.querySelectorAll('.hamburger-bar');
  if (isOpen) {
    bars[0].style.transform = 'translateY(7px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', toggleMenu);

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });
}

/* ─── Active link highlighting ──────────────────────── */
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPath);
  link.setAttribute('aria-current', href === currentPath ? 'page' : 'false');
});
