// === OTOS CONTINUITY — MAIN JS ===

// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll-reveal animation
const revealEls = document.querySelectorAll(
  '.card, .feature-card, .evidence-card, .partner-category, .flow-step, .pilot-stat-card, .timeline-step, .contact-option'
);
revealEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Staggered reveal for grids
const grids = ['.cards-grid', '.solution-features', '.partner-categories', '.evidence-grid', '.contact-options'];
grids.forEach(selector => {
  const grid = document.querySelector(selector);
  if (!grid) return;
  const children = grid.querySelectorAll('.fade-up');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#FF9D3D';
    }
  });
});

// Animate stats counter on scroll
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const isPercent = el.textContent.includes('%');
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current + (isPercent ? '%' : '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.replace('%', '').replace(',', '');
      const target = parseInt(text);
      if (!isNaN(target)) animateCounter(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => statObserver.observe(el));
