/* Nour Emad — Portfolio JS */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky nav --- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* --- Mobile burger --- */
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* --- Active nav link on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* --- Fade-in on scroll --- */
  document.querySelectorAll(
    '#about .about-inner, #skills .skill-card, #projects .pcard, #services .scard, #approach .approach-step, #contact .contact-inner'
  ).forEach(el => el.classList.add('fade-in'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

});
