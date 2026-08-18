/* ============================================================
   PROJECTS DATA — single source of truth for teaser-level copy.
   Position Pilot and Agency OS have deep hand-authored detail
   blocks directly in index.html (too bespoke to templatise
   usefully for just two entries) — keep their name/tagline/status
   here in sync with those blocks by hand. Marketing Skills
   Standard and Job Search Score are rendered from this file by
   script.js; both now have full pages at /systems/[id]/ (see
   build_systems.py in the scratchpad, not committed — same
   "generated HTML is the source of truth" pattern as the notes).
   ============================================================ */

const PROJECTS = [
  {
    id: "position-pilot",
    name: "Position Pilot",
    tagline: "AI-native GTM strategy engine",
    status: "Live",
    statusVariant: "live",
    meta: "15 agents · 3 stages · human review",
    tier: "flagship"
  },
  {
    id: "agency-os",
    name: "Agency OS",
    tagline: "An AI workflow system I decided not to ship.",
    status: "Archived",
    statusVariant: "default",
    tier: "full"
  },
  {
    id: "marketing-skills-standard",
    name: "Marketing Skills Standard",
    tagline: "An evaluation protocol for AI marketing tools.",
    description: "Every “best AI marketing skills” list ranks by GitHub stars — which measures popularity, not whether the output is any good. A fixed, versioned rubric scores real outputs with quoted evidence for every deduction, so a comparison is reproducible instead of a vibe. A CI check re-derives every published score from its own evidence to catch drift before it ships.",
    status: "V1 · Validating",
    statusVariant: "default",
    url: "https://github.com/aayushiagratha/marketing-skills-hub",
    tier: "lightweight"
  },
  {
    id: "job-search-score",
    name: "Job Search Score",
    tagline: "A sponsorship-aware job search agent — built to solve my own problem.",
    description: "Most job boards can't tell you whether a company can legally sponsor a visa or how contested a role really is. This checks both, then scores the role against my actual CV before I spend an evening writing a cover letter for a role I was never eligible for.",
    status: "Open Source",
    statusVariant: "default",
    url: "https://github.com/aayushiagratha/job-search-score",
    tier: "lightweight"
  }
];
