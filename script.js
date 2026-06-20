/* ============================================================
   SCRIPT.JS — AAYUSHI AGRATHA PORTFOLIO
   ============================================================ */

/* ----------------------------------------------------------
   1. EXPANDABLE WORK ITEMS
   ---------------------------------------------------------- */
const workRows = document.querySelectorAll('.work-row');

workRows.forEach(row => {
  row.addEventListener('click', () => {
    const item = row.closest('.work-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.work-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.work-row').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      row.setAttribute('aria-expanded', 'true');

      // Scroll into view with a small offset
      setTimeout(() => {
        const top = item.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 50);
    }
  });

  // Keyboard support
  row.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      row.click();
    }
  });
});

/* ----------------------------------------------------------
   2. CERTIFICATIONS TOGGLE
   ---------------------------------------------------------- */
const certsToggle = document.getElementById('certsToggle');
const certsList   = document.getElementById('certsList');

if (certsToggle && certsList) {
  certsToggle.addEventListener('click', () => {
    const isOpen = certsList.classList.contains('open');
    certsList.classList.toggle('open');
    certsToggle.setAttribute('aria-expanded', String(!isOpen));
  });
}

/* ----------------------------------------------------------
   3. MOBILE NAV
   ---------------------------------------------------------- */
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-label', isOpen ? 'Menu' : 'Close menu');
  });

  // Close on link click
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

/* ----------------------------------------------------------
   4. ACTIVE NAV HIGHLIGHTING ON SCROLL
   ---------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.style.color = href === `#${id}` ? 'var(--ink)' : '';
      });
    }
  });
}, { rootMargin: '-30% 0px -65% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));

/* ----------------------------------------------------------
   5. SUBTLE SCROLL FADE-IN
   ---------------------------------------------------------- */
const fadeEls = document.querySelectorAll('.work-item, .writing-sample, .about-para');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});


/* ----------------------------------------------------------
6. EDUCATION TOGGLE
---------------------------------------------------------- */
const eduToggle = document.getElementById('eduToggle');
const eduList = document.getElementById('eduList');

if (eduToggle && eduList) {
  eduToggle.addEventListener('click', () => {
    const isOpen = eduList.classList.contains('open');
    eduList.classList.toggle('open');
    eduToggle.setAttribute('aria-expanded', String(!isOpen));
  });
}
