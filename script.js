/* ============================================================
   SCRIPT.JS — AAYUSHI AGRATHA PORTFOLIO
   ============================================================ */

/* Root-relative prefix to the site root, derived from this
   script's own tag src, so the same code works whether the page
   is index.html, systems/[id]/, or notes/[slug]/. */
const scriptRoot = (document.currentScript
  ? document.currentScript.getAttribute('src')
  : 'script.js'
).replace(/script\.js$/, '');

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
        link.style.color = href === `#${id}` ? 'var(--off-white)' : '';
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

/* ----------------------------------------------------------
   10. NAV DROPDOWNS — Systems / Notes quick-links, populated
      from the same data/projects.js + data/notes.js used by the
      homepage preview sections, so there's one source of truth.
      Research/Experience/About aren't collections, so they stay
      plain links.
   ---------------------------------------------------------- */
const navDropdownSystems = document.querySelector('[data-nav-dropdown="systems"]');
const navDropdownNotes = document.querySelector('[data-nav-dropdown="notes"]');

if (navDropdownSystems && typeof PROJECTS !== 'undefined') {
  navDropdownSystems.innerHTML = PROJECTS
    .map(p => `<a href="${scriptRoot}systems/${p.id}/">${p.name}</a>`)
    .join('');
}

if (navDropdownNotes && typeof NOTES !== 'undefined') {
  navDropdownNotes.innerHTML = NOTES
    .map(n => `<a href="${scriptRoot}notes/${n.slug}/">${n.title}</a>`)
    .join('');
}

/* ----------------------------------------------------------
   11. NOTES APP — sidebar folder filtering + search. Client-side
      only: the folder a note lives in is read straight off each
      .notes-item's data-folder attribute, and search matches
      against the title/preview text already in the DOM.
   ---------------------------------------------------------- */
const notesApp = document.querySelector('.notes-app');

if (notesApp) {
  const folderBtns = notesApp.querySelectorAll('.notes-sidebar-folder');
  const items = notesApp.querySelectorAll('.notes-item');
  const listTitle = notesApp.querySelector('.notes-list-title');
  const listCount = notesApp.querySelector('.notes-list-count');
  const monthHeader = notesApp.querySelector('.notes-list-month');
  const emptyState = notesApp.querySelector('.notes-list-empty');
  const searchInput = notesApp.querySelector('.notes-search-input');

  let currentFolder = 'all';

  function applyFilter() {
    const query = (searchInput?.value ?? '').trim().toLowerCase();
    let visible = 0;

    items.forEach(item => {
      const inFolder = currentFolder === 'all' || item.dataset.folder === currentFolder;
      const text = item.querySelector('.notes-item-title').textContent.toLowerCase()
        + ' ' + item.querySelector('.notes-item-preview').textContent.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const match = inFolder && matchesQuery;
      item.style.display = match ? '' : 'none';
      if (match) visible += 1;
    });

    if (listTitle) listTitle.textContent = currentFolder === 'all' ? 'All Notes' : currentFolder;
    if (listCount) listCount.textContent = `${visible} note${visible === 1 ? '' : 's'}`;
    if (monthHeader) monthHeader.style.display = visible > 0 ? '' : 'none';
    if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
  }

  folderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFolder = btn.dataset.folder;
      folderBtns.forEach(b => b.classList.toggle('notes-sidebar-folder--active', b === btn));
      applyFilter();
    });
  });

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  /* Play button reads the open note aloud with the browser's own
     text-to-speech — no audio files to generate or host. */
  const playBtn = notesApp.querySelector('.notes-play-btn');
  if (playBtn && 'speechSynthesis' in window) {
    playBtn.addEventListener('click', () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        return;
      }
      const title = notesApp.querySelector('.notes-reading-title')?.textContent ?? '';
      const body = notesApp.querySelector('.notes-reading-body')?.textContent ?? '';
      const utterance = new SpeechSynthesisUtterance(`${title}. ${body}`);
      utterance.onstart = () => playBtn.classList.add('notes-play-btn--active');
      utterance.onend = () => playBtn.classList.remove('notes-play-btn--active');
      utterance.onerror = () => playBtn.classList.remove('notes-play-btn--active');
      speechSynthesis.speak(utterance);
    });
  }
}


