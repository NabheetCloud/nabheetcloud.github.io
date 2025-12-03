# Implementation Plan: Tech Learnings Blog

**Branch**: `001-tech-blog` | **Date**: 2025-11-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-tech-blog/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a minimalist, performance-driven technical blog that evokes Apple's design precision, combining timeless print typography with modern static site responsiveness. The blog will feature dual light/dark themes, blazing-fast load times (TTFB <100ms), and an immersive reading experience for engineering articles. Core capabilities include Markdown-based content with syntax-highlighted code blocks, tag-based filtering, responsive design, and SEO optimization. Target performance: Lighthouse 95+, FCP <1.5s, TTI <3.5s. "Readable like Medium, beautiful like Apple.com, fast like static HTML."

## Technical Context

**Language/Version**: JavaScript / Node.js 18+  
**Primary Dependencies**: Eleventy (11ty) v2.0+, Tailwind CSS v3.0+, Prism.js, @tailwindcss/typography  
**Storage**: Markdown files (content), localStorage (theme preference), static JSON (generated at build for search/filtering)  
**Testing**: Manual cross-browser testing (Safari, Chrome, Firefox), Lighthouse CI, WCAG validation tools  
**Target Platform**: Static site hosted on CDN (Vercel or Netlify), modern browsers (last 2 years)  
**Project Type**: Single static site generator project  
**Performance Goals**: TTFB <100ms, FCP <1.5s, TTI <3.5s, Lighthouse Performance 95+, CLS = 0  
**Constraints**: Bundle size <200KB gzipped per route, no server-side rendering, no database  
**Scale/Scope**: Initial 3-5 articles, designed to scale to 100+ posts, tag-based taxonomy, single author

**Constitution Version**: 1.0.0

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Code Quality ✅

**Status**: PASS

**Compliance**:
- Clean Code Standards: Eleventy templates will use Nunjucks with consistent naming conventions. Tailwind utility classes provide self-documenting styling.
- Self-Documenting Code: Template partials will be clearly named (header.njk, footer.njk, post.njk). JavaScript for theme toggle will include inline comments.
- DRY Principle: Layouts and partials will be reused across all pages. Tailwind configuration will centralize design tokens (colors, typography, spacing).
- SOLID Principles: Template components will have single responsibilities (header handles navigation, footer handles credits/links).
- Code Review Mandatory: All changes will go through PR review process with linting checks.

**Enforcement**:
- ESLint for JavaScript code quality
- Prettier for consistent formatting
- Stylelint for CSS/Tailwind best practices
- Template linting via 11ty build warnings

### II. Testing Standards ⚠️

**Status**: CONDITIONAL PASS (adjusted for static site context)

**Compliance**:
- Tests Before Implementation: Manual test scenarios defined in spec.md will be verified before deployment
- Test Coverage: Unit tests for JavaScript utilities (theme toggle, reading progress). Integration tests via Lighthouse CI for performance/accessibility.
- Integration Tests: Cross-browser testing on Safari/Chrome/Firefox for rendering consistency. Lighthouse CI validates end-to-end performance.
- Contract Testing: Not applicable (no API endpoints; static HTML output)
- Continuous Testing: Lighthouse CI runs on every PR. Manual accessibility audits before merge.
- Test Maintenance: Test scenarios documented in spec.md acceptance criteria. Lighthouse thresholds defined in CI config.

**Justification for Deviations**:
- Static site with no backend APIs means no contract tests needed
- 80% code coverage target not applicable to template-heavy static sites
- Manual testing supplemented by automated Lighthouse CI covers critical paths

**Enforcement**:
- Lighthouse CI with performance/accessibility thresholds (95+ scores)
- Manual test checklist in PR template covering user stories from spec.md
- WCAG validation tools (axe DevTools) before deployment

### III. User Experience Consistency ✅

**Status**: PASS

**Compliance**:
- Design System Compliance: Tailwind configuration will define comprehensive design system (colors, typography scale, spacing, shadows). All components built from these tokens.
- Accessibility Standards: WCAG 2.1 Level AA compliance verified via Lighthouse and axe DevTools. Semantic HTML, ARIA labels, keyboard navigation, color contrast ratios (4.5:1 body text, 3:1 large text).
- Responsive Design: Mobile-first Tailwind approach ensures responsiveness. Breakpoints tested: 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop).
- Consistent Interaction Patterns: Theme toggle uses standard sun/moon icons. Navigation patterns consistent across all pages. Share buttons use familiar social media icons.
- Loading States and Feedback: Reading progress bar provides scroll feedback. Theme transitions complete in 300ms. Static site means no async loading states.
- Error Handling UX: 404 page with clear navigation back to homepage. Graceful fallbacks for missing images (alt text), failed font loads (system fonts).

**Enforcement**:
- Tailwind design tokens in tailwind.config.js (single source of truth)
- Lighthouse Accessibility score 95+ requirement in CI
- Manual keyboard navigation testing in PR checklist
- Color contrast validation via axe DevTools

### IV. Performance Requirements ✅

**Status**: PASS

**Compliance**:
- Response Time Targets: TTFB <100ms (CDN-served static HTML), FCP <1.5s (3G), TTI <3.5s (mobile). No API endpoints (static site).
- Bundle Size Limits: Tailwind CSS purged to minimal size (~10-20KB gzipped). JavaScript <50KB gzipped (theme toggle, reading progress, Prism.js). Total per-route budget: <200KB.
- Database Query Optimization: N/A (no database; static site generated at build time).
- Caching Strategy: CDN edge caching (Vercel/Netlify). Browser caching via cache headers. Theme preference cached in localStorage.
- Performance Monitoring: Lighthouse CI on every PR. Manual WebPageTest validation from multiple geos. Post-deployment monitoring via Vercel/Netlify analytics.
- Optimization Before Launch: Images optimized (WebP with fallbacks), fonts preloaded, CSS inlined for critical path, Prism.js lazy-loaded per language.

**Enforcement**:
- Lighthouse CI thresholds: Performance 95+, FCP <1.5s, TTI <3.5s, CLS = 0
- Bundle size check in CI (fail if >200KB gzipped)
- WebPageTest validation before production deployment
- Vercel/Netlify analytics monitoring post-launch

### Summary

**Overall Status**: ✅ PASS with justified adjustments for static site context

**Deviations**:
- Testing Standards: Adjusted for static site (no backend APIs, template-heavy). Manual + Lighthouse CI provides sufficient coverage.

**Next Steps**:
- Proceed to Phase 0 Research
- Re-validate after Phase 1 Design

## Project Structure

### Documentation (this feature)

```text
specs/001-tech-blog/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── frontmatter-schema.json  # Markdown frontmatter validation schema
└── checklists/
    └── requirements.md  # Specification quality checklist (already created)
```

### Source Code (repository root)

```text
# Static site structure for Eleventy project

src/
├── _includes/
│   ├── layouts/
│   │   ├── base.njk           # Base layout with <html>, <head>, <body>
│   │   ├── post.njk           # Blog post layout (extends base)
│   │   └── page.njk           # Static page layout (extends base)
│   └── partials/
│       ├── header.njk         # Site header with navigation & theme toggle
│       ├── footer.njk         # Site footer with social links
│       ├── post-card.njk      # Post preview card (for homepage)
│       ├── reading-progress.njk # Reading progress bar
│       └── share-buttons.njk  # Social share buttons
├── posts/
│   ├── 2025-11-01-building-saleor-app.md
│   ├── 2025-11-03-understanding-cloudfront.md
│   └── ... (additional Markdown posts)
├── pages/
│   ├── about.njk              # About page
│   └── archive.njk            # Optional archive/all posts page
├── assets/
│   ├── styles/
│   │   ├── tailwind.css       # Tailwind base, components, utilities
│   │   └── prism-theme.css    # Prism.js syntax highlighting theme (dual mode)
│   ├── js/
│   │   ├── theme-toggle.js    # Dark/light mode toggle logic
│   │   ├── reading-progress.js # Reading progress bar logic
│   │   └── share.js           # Copy-to-clipboard functionality
│   └── images/
│       ├── profile.jpg        # Author portrait
│       └── og-default.jpg     # Default OpenGraph image
├── index.njk                  # Homepage
└── 404.njk                    # 404 error page

# Eleventy configuration
.eleventy.js                   # Eleventy config (plugins, filters, collections)

# Tailwind configuration
tailwind.config.js             # Design system tokens (colors, fonts, spacing)
postcss.config.js              # PostCSS config (Tailwind, autoprefixer)

# Build output
dist/                          # Generated static site (gitignored)
├── index.html
├── posts/
│   ├── building-saleor-app/
│   │   └── index.html
│   └── understanding-cloudfront/
│       └── index.html
├── about/
│   └── index.html
├── assets/
│   ├── styles/
│   │   └── main.css           # Compiled, purged Tailwind CSS
│   ├── js/
│   │   └── bundle.js          # Minified JavaScript
│   └── images/
├── sitemap.xml
└── robots.txt

# Package management
package.json                   # Dependencies and build scripts
package-lock.json

# Git
.gitignore                     # Ignore dist/, node_modules/

# CI/CD
.github/
└── workflows/
    └── deploy.yml             # Vercel/Netlify deploy + Lighthouse CI

# SEO
robots.txt                     # Allow all crawlers
sitemap.xml                    # Generated by Eleventy plugin
```

**Structure Decision**: 

Chosen **single static site generator project** structure using Eleventy. This is appropriate because:

1. **Static Site Context**: Blog has no backend APIs, no user authentication, no database. Content is Markdown files transformed to HTML at build time.

2. **Eleventy Conventions**: `src/_includes/` for layouts/partials, `src/posts/` for blog content, `src/assets/` for styles/scripts/images, `dist/` for build output.

3. **Content-Driven**: Blog posts are Markdown files in `src/posts/` with YAML frontmatter. Eleventy collections auto-generate post listings, tag pages, and RSS feeds.

4. **Build-Time Optimization**: Tailwind CSS purges unused styles at build. Images optimized via Eleventy plugins. JavaScript bundled and minified.

5. **Scalability**: Structure supports 100+ posts without code changes (content-driven taxonomy, automated collection generation).

6. **Deployment**: Static output in `dist/` deployed to CDN (Vercel/Netlify) for <100ms TTFB worldwide.

**Alternative Considered**: Separate `frontend/` and `backend/` directories rejected because there is no backend (static site generator only).

## Complexity Tracking

> **No constitutional violations requiring justification. Section left empty.**

## Phase 0: Research

See [research.md](./research.md) for detailed technology evaluations and decisions.

## Phase 1: Design

See [data-model.md](./data-model.md) for entity schemas and relationships.  
See [contracts/](./contracts/) for Markdown frontmatter validation schemas.  
See [quickstart.md](./quickstart.md) for local development setup and deployment guide.
