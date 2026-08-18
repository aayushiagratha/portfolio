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
   2. COMBINED EDUCATION · SKILLS · CERTIFICATIONS TOGGLE
   ---------------------------------------------------------- */
const combinedToggle = document.getElementById('combinedToggle');
const combinedList   = document.getElementById('combinedList');

if (combinedToggle && combinedList) {
  combinedToggle.addEventListener('click', () => {
    const isOpen = combinedList.classList.contains('open');
    combinedList.classList.toggle('open');
    combinedToggle.setAttribute('aria-expanded', String(!isOpen));
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
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close on link click
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-label', 'Menu');
      menuBtn.setAttribute('aria-expanded', 'false');
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
   6. EDUCATION · SKILLS · CERTIFICATIONS TOGGLE — merged into section 2
   ---------------------------------------------------------- */
   // (Position Pilot's expand toggle lived here — removed along with the
   // homepage accordion; the system now has its own page instead.)

/* ----------------------------------------------------------
   7. SECONDARY SYSTEMS — rendered from data/projects.js as cards
      (Position Pilot is hand-authored as the flagship card,
      directly in index.html)
   ---------------------------------------------------------- */
const secondaryMount = document.getElementById('secondarySystems');

if (secondaryMount && typeof PROJECTS !== 'undefined') {
  const secondary = PROJECTS.filter(p => p.tier === 'secondary');

  const card = p => `
    <a class="sys-card sys-card--secondary" href="systems/${p.id}/">
      <span class="status-badge${p.statusVariant === 'live' ? ' status-badge--live' : ''}"><span class="dot"></span>${p.status}</span>
      <div class="sys-name">${p.name}</div>
      <p class="sys-tag">${p.tagline}</p>
      <span class="sys-explore">Explore →</span>
    </a>
  `;

  const [first, second, third] = secondary;
  secondaryMount.innerHTML = `
    <div class="sys-row">
      ${card(first)}
      ${card(second)}
    </div>
    ${third ? card(third) : ''}
  `;
}

/* ----------------------------------------------------------
   8. NOTES PREVIEW — rendered from data/notes.js
   ---------------------------------------------------------- */
const notesMount = document.getElementById('notesPreview');

if (notesMount && typeof NOTES !== 'undefined') {
  notesMount.innerHTML = NOTES.map(n => `
    <a class="note-row" href="notes/${n.slug}/">
      <span class="note-title">${n.title}</span>
      <span class="note-tag">${n.tag}</span>
    </a>
  `).join('');
}

/* ----------------------------------------------------------
   9. ASK MY CV MODAL — every [data-ask-cv] trigger opens this
      instead of navigating. href stays as a real fallback link
      if JS doesn't run.
   ---------------------------------------------------------- */
const askCvModal = document.getElementById('askCvModal');

if (askCvModal) {
  const openTriggers = document.querySelectorAll('[data-ask-cv]');
  const closeTriggers = askCvModal.querySelectorAll('[data-ask-cv-close]');
  let lastFocused = null;

  const openModal = (e) => {
    e.preventDefault();
    lastFocused = document.activeElement;
    askCvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    askCvModal.querySelector('.ask-cv-modal-close').focus();
  };

  const closeModal = () => {
    askCvModal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  openTriggers.forEach(el => el.addEventListener('click', openModal));
  closeTriggers.forEach(el => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && askCvModal.classList.contains('open')) closeModal();
  });
}


