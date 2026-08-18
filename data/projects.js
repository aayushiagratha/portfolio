/* ============================================================
   PROJECTS DATA — single source of truth for teaser-level copy.
   Position Pilot is hand-authored directly in index.html as the
   flagship card (bespoke pipeline-preview diagram, not worth
   templatising for one entry) — keep its name/tagline/status here
   in sync with that markup by hand. Agency OS, Marketing Skills
   Standard, and Job Search Score are all rendered as identical
   secondary cards from this file by script.js. All four now have
   full pages at /systems/[id]/ (see build_systems.py in the
   scratchpad, not committed — generated HTML is the source of
   truth, same pattern as Notes).
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
    tier: "secondary"
  },
  {
    id: "marketing-skills-standard",
    name: "Marketing Skills Standard",
    tagline: "An evaluation protocol for AI marketing tools.",
    status: "V1 · Validating",
    statusVariant: "default",
    tier: "secondary"
  },
  {
    id: "job-search-score",
    name: "Job Search Score",
    tagline: "A sponsorship-aware job search agent — built to solve my own problem.",
    status: "Open Source",
    statusVariant: "default",
    tier: "secondary"
  }
];
