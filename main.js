/* =====================================================
   Portfolio – main.js
   1. Mobile menu   2. Active link on scroll
   3. Reveal sections   4. Certificate lightbox   5. Footer year
   ===================================================== */

/* ---------- 1. Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function setMenu(open) {
  navMenu.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

navToggle.addEventListener('click', () => {
  setMenu(!navMenu.classList.contains('open'));
});

// Close the menu after clicking any link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

/* ---------- 2. Highlight the active link while scrolling ---------- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const linkObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' }); // fires when a section crosses the middle of the screen

sections.forEach(section => linkObserver.observe(section));

/* ---------- 3. Reveal section content once as it scrolls into view ---------- */
const revealTargets = document.querySelectorAll('.section-head, .card, .timeline-item, .about-text');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

/* ---------- 4. Certificate lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const certOpen = document.getElementById('certOpen');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox() {
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  certOpen.focus();
}

certOpen.addEventListener('click', openLightbox);
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

/* ---------- 5. Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
