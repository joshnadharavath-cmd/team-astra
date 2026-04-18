/* ============================================
   Team Astra — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile nav toggle ──
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });


  // ── Intersection Observer — reveal animations ──
  const revealTargets = [
    ...document.querySelectorAll('.section-label'),
    ...document.querySelectorAll('.section-title'),
    ...document.querySelectorAll('.about-text'),
    ...document.querySelectorAll('.about-stats'),
    ...document.querySelectorAll('.stat-card'),
    ...document.querySelectorAll('.domain-card'),
    ...document.querySelectorAll('.social-card'),
    ...document.querySelectorAll('.connect-subtitle'),
    ...document.querySelectorAll('.gallery-item'),
    ...document.querySelectorAll('.reveal'),
  ];

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(el => revealObserver.observe(el));


  // ── Timeline reveal ──
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 120);
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
  );

  timelineItems.forEach(el => timelineObserver.observe(el));


  // ── Stat counter animation ──
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quint
      const eased = 1 - Math.pow(1 - progress, 5);
      const current = Math.round(eased * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }


  // ── Hero particles ──
  const particlesContainer = document.getElementById('hero-particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * -10}s;
    `;
    particlesContainer.appendChild(p);
  }

  // Inject particle keyframes
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes particleFloat {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.4;
      }
      25% {
        transform: translate(${randomRange(-30, 30)}px, ${randomRange(-40, 40)}px) scale(1.2);
        opacity: 0.8;
      }
      50% {
        transform: translate(${randomRange(-20, 20)}px, ${randomRange(-50, 50)}px) scale(0.8);
        opacity: 0.3;
      }
      75% {
        transform: translate(${randomRange(-35, 35)}px, ${randomRange(-30, 30)}px) scale(1.1);
        opacity: 0.6;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
