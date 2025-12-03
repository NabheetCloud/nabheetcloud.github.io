# Research: Tech Learnings Blog

**Feature**: Tech Learnings Blog  
**Branch**: 001-tech-blog  
**Date**: 2025-11-05  
**Purpose**: Document technology decisions, rationale, and alternatives for the minimalist technical blog

## Executive Summary

This research phase validates the technical stack for a performance-driven, Apple-inspired static blog. All decisions optimize for three core requirements: (1) blazing speed (TTFB <100ms, FCP <1.5s), (2) beautiful Apple-like design aesthetic, and (3) dual light/dark theme support. The chosen stack (Eleventy, Tailwind CSS, Prism.js) leverages static site generation for maximum performance while maintaining developer ergonomics and design flexibility.

## Technology Decisions

### 1. Static Site Generator: Eleventy (11ty)

**Decision**: Use Eleventy v2.0+ as the static site generator

**Rationale**:
- **Performance First**: Eleventy generates pure HTML at build time with zero client-side JavaScript overhead. This aligns perfectly with TTFB <100ms and FCP <1.5s targets.
- **Markdown Native**: First-class Markdown support with frontmatter. Authors write in plain Markdown without wrestling with CMS abstractions.
- **Flexibility**: Supports multiple template languages (Nunjucks, Liquid, JavaScript). Nunjucks chosen for readability and component reusability.
- **Fast Builds**: Incremental builds mean 100+ post site still builds in <2 minutes. Critical for content velocity.
- **Plugin Ecosystem**: Rich plugin ecosystem for SEO (@11ty/eleventy-plugin-rss, sitemap generation), image optimization, and syntax highlighting integration.
- **No Framework Lock-In**: Generates framework-agnostic HTML/CSS/JS. No React/Vue overhead for a content site that doesn't need client-side hydration.

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| **Next.js (Static Export)** | Overkill for a blog. React overhead adds unnecessary JavaScript bundle size (even with static export). Build times slower for content-heavy sites. |
| **Gatsby** | React-based (unnecessary JS overhead). Slower build times. GraphQL layer adds complexity for simple Markdown content. Community momentum declining. |
| **Hugo** | Very fast builds but Go templates less ergonomic than Nunjucks. Weaker plugin ecosystem. Harder to integrate custom JavaScript (theme toggle, reading progress). |
| **Jekyll** | Ruby dependency slower than Node.js-based 11ty. Liquid templates less expressive than Nunjucks. Slower community momentum. |
| **Astro** | Excellent choice but newer ecosystem. Eleventy has more mature plugin support for SEO, RSS, and accessibility. Astro's partial hydration unnecessary for a blog. |

**Best Practices**:
- Use Nunjucks for templates (readable syntax, component reusability)
- Organize templates: `_includes/layouts/` for page layouts, `_includes/partials/` for reusable components
- Leverage Eleventy collections to auto-generate post listings, tag pages, and related posts
- Use filters for date formatting, excerpt generation, and reading time calculation
- Configure `.eleventy.js` with passthrough copies for assets (images, fonts) and custom filters

**References**:
- Eleventy Docs: https://www.11ty.dev/docs/
- Eleventy Base Blog starter: https://github.com/11ty/eleventy-base-blog
- Performance benchmarks: https://www.zachleat.com/web/build-benchmark/

---

### 2. Styling Framework: Tailwind CSS

**Decision**: Use Tailwind CSS v3.0+ with @tailwindcss/typography plugin

**Rationale**:
- **Utility-First Efficiency**: Utility classes enable rapid iteration on Apple-inspired design without writing custom CSS. Inline styles in templates make component boundaries clear.
- **Design System Tokens**: `tailwind.config.js` centralizes design tokens (colors, typography scale, spacing, shadows) matching Apple's visual language. Single source of truth prevents style drift.
- **PurgeCSS Integration**: Tailwind automatically purges unused styles at build time. Final CSS bundle typically 10-20KB gzipped (well under 200KB budget).
- **@tailwindcss/typography**: "Prose" classes provide beautiful typographic defaults for Markdown content (optimal line lengths, vertical rhythm, heading hierarchy) without custom CSS.
- **Dark Mode Built-In**: `dark:` variant enables seamless light/dark theme with just a class toggle on `<html>` element. No manual CSS duplication.
- **Responsive Design**: Mobile-first breakpoints (`sm:`, `md:`, `lg:`, `xl:`) make responsive design declarative and consistent across all components.

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| **Custom CSS (BEM/SMACSS)** | Time-intensive to build comprehensive design system. Harder to maintain consistency. No automatic purging (larger bundle sizes). |
| **Bootstrap** | Component library (buttons, modals, etc.) unnecessary for a blog. Opinionated styles harder to customize for Apple aesthetic. Larger bundle size. |
| **Styled Components / CSS-in-JS** | Requires React/Vue runtime. Adds JavaScript overhead and complexity. Tailwind's utility classes achieve same goals with zero runtime cost. |
| **Vanilla CSS + PostCSS** | Flexible but time-intensive. No design system out-of-box. Manual responsive breakpoints error-prone. Tailwind provides better DX without sacrificing flexibility. |
| **Tachyons** | Utility-first like Tailwind but smaller ecosystem, less active development, no official dark mode support, and less comprehensive documentation. |

**Best Practices**:
- Define color palette in `tailwind.config.js` matching light/dark mode design (Apple Blue #007AFF / #0A84FF as accent)
- Use `@tailwindcss/typography` for blog post content (`.prose` class on article body)
- Configure font families: Inter for UI, SF Pro Display/Text for headings/body (with system font fallbacks)
- Extend Tailwind with custom utilities for reading progress bar, smooth scroll, and theme transitions
- Organize styles: `tailwind.css` imports base/components/utilities; `prism-theme.css` for syntax highlighting

**Color System** (from spec):
- Light: bg-white, text-gray-900, accent-blue-600
- Dark: bg-black (or gray-900), text-gray-100, accent-blue-400
- Code blocks: bg-gray-50 (light), bg-gray-800 (dark)

**References**:
- Tailwind CSS Docs: https://tailwindcss.com/docs
- @tailwindcss/typography: https://github.com/tailwindlabs/tailwindcss-typography
- Dark mode guide: https://tailwindcss.com/docs/dark-mode

---

### 3. Syntax Highlighting: Prism.js

**Decision**: Use Prism.js for code block syntax highlighting

**Rationale**:
- **Lightweight**: Core Prism.js is ~2KB gzipped. Only load language grammars actually used (JS, Python, Go, Rust, TypeScript) to minimize bundle size.
- **Build-Time or Runtime**: Can run at build time (via Eleventy plugin) or client-side. Build-time preferred to reduce client-side JavaScript (better performance).
- **Theming**: Supports custom themes. Create dual light/dark theme matching Tailwind color system (bg-gray-50/bg-gray-800).
- **Line Highlighting**: Supports line highlighting and line numbers for tutorial-style code examples.
- **Markdown Integration**: Eleventy markdown parser (markdown-it) integrates seamlessly with Prism.js via plugins.

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| **Highlight.js** | Larger bundle size (~50KB vs Prism's ~2KB). Auto-detection feature unnecessary (Markdown already specifies language). |
| **Shiki** | VSCode-quality highlighting but significantly larger bundle (TextMate grammars included). Build-time only. Overkill for blog code examples. |
| **CodeMirror / Monaco** | Full code editors (interactive) unnecessary for static read-only code examples. Massive bundle size (hundreds of KB). |
| **Plain `<pre><code>`** | No syntax highlighting severely degrades readability for technical audience. Core UX requirement. |

**Best Practices**:
- Use Prism.js at build time via `@11ty/eleventy-plugin-syntaxhighlight` (zero client-side JS)
- Create custom Prism theme in `prism-theme.css` matching light/dark mode color system
- Load only required language grammars: JavaScript, Python, Go, Rust, TypeScript, Bash, JSON, Markdown
- Use inline code styles (Tailwind `.prose code`) for consistency with block code
- Configure line-wrapping and scrollable overflow for long code lines

**References**:
- Prism.js: https://prismjs.com/
- Eleventy Syntax Highlighting Plugin: https://www.11ty.dev/docs/plugins/syntaxhighlight/
- Custom Prism themes: https://github.com/PrismJS/prism-themes

---

### 4. Typography: Inter + SF Pro (with System Font Fallbacks)

**Decision**: Use Inter (Google Fonts) for UI and SF Pro Display/Text for headings/body with system font fallbacks

**Rationale**:
- **Apple-Inspired Aesthetic**: SF Pro is Apple's system font. Using it (or Inter as close alternative) evokes Apple.com's calm precision.
- **Readability**: Inter designed for screen readability with optimal x-height and letter spacing. Excellent for long-form technical content.
- **Performance**: Google Fonts CDN with `font-display: swap` prevents FOIT (flash of invisible text). System font fallbacks (`-apple-system, BlinkMacSystemFont, "Segoe UI"`) ensure instant rendering.
- **Variable Fonts**: Inter supports variable font format (single file, multiple weights) reducing HTTP requests.
- **Monospace**: JetBrains Mono or SF Mono for code blocks (excellent ligature support, technical aesthetic).

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| **System Fonts Only** | No distinctive brand identity. Generic look doesn't evoke Apple aesthetic. Inconsistent across platforms (Segoe UI on Windows vs SF Pro on macOS). |
| **Adobe Fonts (Proxima Nova, Futura)** | Requires Adobe Fonts subscription. Slower loading than Google Fonts CDN. Not necessary for blog. |
| **Self-Hosted Fonts** | More control but requires manual optimization (woff2 conversion, subsetting). Google Fonts CDN handles this automatically with better caching. |
| **Serif Fonts (Georgia, Merriweather)** | Traditional "print" look conflicts with modern, tech-forward aesthetic. Sans-serif cleaner for code-heavy content. |

**Best Practices**:
- Load fonts from Google Fonts CDN with `font-display: swap` and `preconnect` for DNS resolution
- Define font stacks in `tailwind.config.js`:
  - Sans: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Mono: `"JetBrains Mono", "SF Mono", Menlo, Monaco, "Courier New", monospace`
- Subset fonts to Latin charset (reduces file size by ~60%)
- Preload critical font files (`Inter-Regular.woff2`, `Inter-SemiBold.woff2`) in `<head>`
- Use variable font if available (Inter supports it)

**Typography Scale** (from spec):
- Headings: 600-700 weight, h1=3rem (48px), h2=2rem (32px)
- Body: 400 weight, 1.125rem (18px) for comfortable reading
- Code: 400 weight, 0.95rem (15.2px) slightly smaller than body

**References**:
- Inter Font: https://rsms.me/inter/
- Google Fonts: https://fonts.google.com/specimen/Inter
- JetBrains Mono: https://www.jetbrains.com/lp/mono/

---

### 5. Deployment: Vercel or Netlify

**Decision**: Deploy to Vercel or Netlify (user's choice)

**Rationale**:
- **CDN by Default**: Both provide global CDN edge network ensuring <100ms TTFB worldwide.
- **Zero Config**: Both auto-detect Eleventy projects and configure build commands (`npm run build`, output `dist/`) without manual setup.
- **Git-Based Workflow**: Automatic deploys on push to main branch. Preview deploys for PRs enable testing before production.
- **Performance**: Edge caching, Brotli compression, HTTP/2 push, automatic SSL. All performance optimizations built-in.
- **Analytics**: Both offer analytics (Vercel Analytics, Netlify Analytics) for traffic insights without invasive tracking.
- **Free Tier**: Generous free tiers sufficient for personal blog (unlimited bandwidth on Vercel, 100GB/month on Netlify).

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| **GitHub Pages** | No automatic build pipeline for Eleventy (requires manual build/commit of `dist/` or GitHub Actions setup). No built-in CDN (slower TTFB). |
| **AWS S3 + CloudFront** | More control but requires manual configuration (S3 bucket, CloudFront distribution, CI/CD setup). Overkill for blog. Netlify/Vercel provide same features with zero config. |
| **Cloudflare Pages** | Excellent alternative (similar to Vercel/Netlify) but slightly less mature Eleventy support. Good backup option. |
| **Self-Hosted (Nginx)** | Maximum control but requires server maintenance, SSL setup, CDN configuration. Unnecessary complexity for static site. |

**Best Practices**:
- Configure build command: `npm run build` (runs `eleventy` + `tailwindcss build`)
- Set publish directory: `dist/`
- Enable automatic deployments on push to `main` branch
- Configure preview deployments for PRs (test before production)
- Set up custom domain with SSL (both providers auto-provision Let's Encrypt certificates)
- Configure cache headers (HTML: no-cache, assets: 1 year with content hashing)
- Enable Brotli compression (both providers do this automatically)

**Vercel vs Netlify**:
- **Vercel**: Faster edge network, better analytics UI, tighter Next.js integration (irrelevant for 11ty), easier custom redirects
- **Netlify**: More mature Eleventy community, better form handling (irrelevant for blog), stronger OSS community focus

**Recommendation**: Start with Vercel for fastest TTFB. Switch to Netlify if specific features needed (both are excellent).

**References**:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com/
- Eleventy Deployment Guide: https://www.11ty.dev/docs/deployment/

---

### 6. Analytics: Plausible or Umami

**Decision**: Use Plausible or Umami for privacy-friendly analytics

**Rationale**:
- **Privacy-First**: No cookies, no personal data collection, GDPR/CCPA compliant by default. Respects technical audience's privacy expectations.
- **Lightweight**: Plausible script <1KB, Umami ~2KB (vs Google Analytics ~45KB). Minimal performance impact.
- **Simple Metrics**: Tracks page views, referrers, devices, browsers. Sufficient for blog insights without invasive user tracking.
- **No Cookie Consent Required**: Privacy-first approach means no annoying cookie banners (better UX).
- **Self-Hosted Option**: Umami can be self-hosted for complete data ownership (Plausible offers self-hosted but paid).

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| **Google Analytics (GA4)** | Invasive tracking (cookies, personal data). Requires cookie consent banner. 45KB script impacts performance. Overkill for blog. |
| **Fathom Analytics** | Similar to Plausible but more expensive ($14/month vs Plausible $9/month for 10K visitors). No free tier. |
| **No Analytics** | Blind to traffic patterns. Can't measure success criteria (bounce rate, avg read time, organic traffic growth). Some analytics needed. |
| **Server Logs (Vercel/Netlify)** | Very privacy-friendly but limited insights (no client-side metrics like bounce rate, time on page). Insufficient for SC-010/SC-011 validation. |

**Best Practices**:
- Add Plausible/Umami script to base layout `<head>` with `defer` attribute (non-blocking)
- Configure custom events for theme toggle, share button clicks (optional)
- Self-host Umami if complete data ownership desired (adds maintenance overhead)
- Use analytics to validate success criteria: bounce rate <40%, avg read time >2.5min, organic traffic +15% MoM

**Plausible vs Umami**:
- **Plausible**: Paid ($9/month), hosted service, excellent UX, auto-updates, no maintenance
- **Umami**: Free (self-hosted), requires server/database (Vercel + PlanetScale free tier works), more control

**Recommendation**: Start with Plausible for zero maintenance. Switch to self-hosted Umami if budget constrained or data ownership critical.

**References**:
- Plausible: https://plausible.io/
- Umami: https://umami.is/
- Privacy comparison: https://plausible.io/vs-google-analytics

---

### 7. SEO & Metadata: @11ty/eleventy-plugin-rss + Custom Meta Tags

**Decision**: Use @11ty/eleventy-plugin-rss for sitemap/RSS, custom templates for OpenGraph/Twitter cards

**Rationale**:
- **Sitemap Generation**: Eleventy RSS plugin auto-generates sitemap.xml from post collections. No manual maintenance.
- **RSS Feed**: Plugin generates RSS feed for subscribers (technical audience appreciates RSS).
- **OpenGraph/Twitter Cards**: Custom meta tags in base layout using post frontmatter (title, excerpt, featured image). Validates via social media debuggers.
- **robots.txt**: Simple static file allowing all crawlers (`User-agent: *, Allow: /`).
- **Clean URLs**: Eleventy's permalink feature generates `/posts/post-slug/` instead of `/posts/post-slug.html` (more readable).

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| **Manual sitemap.xml** | Error-prone as post count grows. Eleventy plugin auto-generates from collections (always up-to-date). |
| **Yoast SEO / CMS SEO Plugins** | Requires WordPress/CMS. Eleventy is static site (no CMS). Custom meta tags via templates sufficient. |
| **Schema.org JSON-LD** | Valuable for rich snippets but overkill for blog (articles already structured). Can add later if needed. |

**Best Practices**:
- Install `@11ty/eleventy-plugin-rss` for sitemap and RSS feed generation
- Add OpenGraph meta tags to base layout: `og:title`, `og:description`, `og:image`, `og:url`, `og:type=article`
- Add Twitter Card meta tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- Generate unique meta descriptions per page (post excerpt for articles, custom for static pages)
- Create `robots.txt` allowing all crawlers
- Configure clean URLs via permalink in post frontmatter: `permalink: /posts/{{ title | slug }}/`
- Optimize featured images (1200x630px, <500KB, WebP with JPG fallback) for social media cards

**References**:
- Eleventy RSS Plugin: https://www.11ty.dev/docs/plugins/rss/
- OpenGraph Protocol: https://ogp.me/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

---

## Performance Optimization Strategies

### Critical Rendering Path
1. **Inline Critical CSS**: Extract above-the-fold Tailwind styles, inline in `<head>` to prevent render-blocking
2. **Preload Fonts**: `<link rel="preload">` for Inter-Regular and Inter-SemiBold (most used weights)
3. **Defer JavaScript**: Theme toggle and reading progress scripts load with `defer` attribute (non-blocking)
4. **Image Optimization**: Use WebP format with JPG fallback, lazy-load below-the-fold images (`loading="lazy"`)

### Bundle Size Optimization
1. **Tailwind Purging**: Configure `content` paths in `tailwind.config.js` to purge unused utility classes (10-20KB final CSS)
2. **Prism.js Language Subset**: Only include grammars for languages actually used (JS, Python, Go, Rust, TS)
3. **Tree-Shaking**: Use ES modules for JavaScript, enable tree-shaking in bundler (esbuild or Rollup)
4. **Minification**: Minify CSS (cssnano), JavaScript (esbuild), HTML (html-minifier via Eleventy transform)

### Caching Strategy
1. **CDN Edge Caching**: Vercel/Netlify cache static HTML at edge locations worldwide (<100ms TTFB)
2. **Browser Caching**: Long cache headers for assets (1 year) with content-hashing filenames (`main.abc123.css`)
3. **localStorage Theme**: Cache theme preference in localStorage (avoid flash of wrong theme on reload)

### Lighthouse CI Validation
- **Performance**: 95+ score, FCP <1.5s, TTI <3.5s, CLS = 0
- **Accessibility**: 95+ score, color contrast ratios, keyboard navigation, semantic HTML
- **SEO**: 95+ score, meta descriptions, sitemap, robots.txt
- **Best Practices**: 95+ score, HTTPS, no console errors, modern image formats

---

## Design System Tokens

### Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `bg-primary` | `#FFFFFF` | `#0B0B0B` | Page background |
| `text-primary` | `#111827` (gray-900) | `#E5E7EB` (gray-200) | Body text |
| `text-secondary` | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | Muted text, dates |
| `accent` | `#007AFF` (blue-600) | `#0A84FF` (blue-400) | Links, buttons |
| `code-bg` | `#F9FAFB` (gray-50) | `#1F2937` (gray-800) | Code block background |
| `border` | `#E5E7EB` (gray-200) | `#374151` (gray-700) | Dividers, borders |
| `shadow` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.05)` | Shadows, elevation |

### Typography Scale

| Element | Font Family | Weight | Size (rem) | Line Height |
|---------|-------------|--------|------------|-------------|
| `h1` | Inter / SF Pro Display | 600-700 | 3.0 (48px) | 1.2 |
| `h2` | Inter / SF Pro Display | 600-700 | 2.0 (32px) | 1.3 |
| `h3` | Inter / SF Pro Display | 600 | 1.5 (24px) | 1.4 |
| `body` | Inter / SF Pro Text | 400 | 1.125 (18px) | 1.7 |
| `code` | JetBrains Mono / SF Mono | 400 | 0.95 (15.2px) | 1.6 |
| `small` | Inter / SF Pro Text | 400 | 0.875 (14px) | 1.5 |

### Spacing Scale

Use Tailwind's default spacing scale (4px base unit):
- `space-2` (0.5rem / 8px): tight spacing (inline elements)
- `space-4` (1rem / 16px): default spacing (paragraphs)
- `space-8` (2rem / 32px): section spacing (headings)
- `space-16` (4rem / 64px): major section breaks

### Motion & Transitions

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Theme toggle | `background-color, color, border-color` | 300ms | `ease-in-out` |
| Link hover | `color` | 150ms | `ease-out` |
| Button hover | `transform` | 200ms | `ease-out` (scale 1.02) |
| Page load | `opacity` | 400ms | `ease-out` (0 → 1) |
| Scroll | `scroll-behavior: smooth` | Auto | Browser default |

---

## Accessibility Checklist

- [ ] **Semantic HTML**: Use `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` landmarks
- [ ] **Heading Hierarchy**: Logical h1→h2→h3 structure (no skipping levels)
- [ ] **ARIA Labels**: Add `aria-label` to theme toggle, share buttons, navigation
- [ ] **Keyboard Navigation**: Tab order follows visual flow, focus indicators visible
- [ ] **Color Contrast**: Verify 4.5:1 body text, 3:1 large text (use axe DevTools)
- [ ] **Alt Text**: Descriptive alt text for all images (author portrait, post featured images)
- [ ] **Focus Management**: Theme toggle announces state change to screen readers
- [ ] **Skip Links**: "Skip to main content" link for keyboard users (hidden until focused)
- [ ] **Screen Reader Testing**: Test with VoiceOver (macOS) or NVDA (Windows)
- [ ] **No Motion Preference**: Respect `prefers-reduced-motion` media query (disable smooth scroll)

---

## Testing Strategy

### Manual Testing
1. **Cross-Browser**: Safari (macOS/iOS), Chrome (desktop/Android), Firefox (desktop)
2. **Responsive**: 320px (iPhone SE), 768px (iPad), 1024px (laptop), 1440px (desktop)
3. **Keyboard Navigation**: Tab through all interactive elements, verify focus indicators
4. **Screen Reader**: VoiceOver (Safari + macOS) for heading structure, ARIA labels
5. **Dark Mode**: Toggle theme, verify colors, contrast ratios, code block theming
6. **Performance**: Lighthouse audit (Performance, Accessibility, SEO 95+)

### Automated Testing (Lighthouse CI)
- Configure Lighthouse CI in GitHub Actions (runs on every PR)
- Set thresholds: Performance 95+, Accessibility 95+, SEO 95+, Best Practices 95+
- Assert metrics: FCP <1.5s, TTI <3.5s, CLS = 0, bundle size <200KB

### User Acceptance Testing
- Publish to staging environment (Vercel preview deploy)
- Verify all acceptance scenarios from spec.md:
  - **US1 (Read)**: Page loads <1.5s, code highlighting works, reading progress visible, share buttons functional
  - **US2 (Discover)**: Homepage lists posts, tag filtering works, responsive on mobile
  - **US3 (Dark Mode)**: Theme toggle works, preference persists, auto-detects system preference
  - **US4 (About)**: About page renders, portrait displays, social links work
- Validate edge cases: no tags, missing images, JavaScript disabled, screen reader
- Confirm success criteria: Lighthouse scores, load times, visual design quality

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Font loading delay** | FOIT (flash of invisible text) | Use `font-display: swap`, preload critical fonts, system font fallbacks |
| **Large JavaScript bundle** | Slower TTI, exceeds 200KB budget | Defer non-critical scripts, tree-shake unused code, lazy-load Prism.js |
| **Dark mode flash** | Wrong theme flickers on reload | Inline theme detection script in `<head>` (blocking but <1KB), read localStorage before render |
| **Image optimization** | Large images slow FCP | Use WebP with JPG fallback, lazy-load below-fold images, Eleventy image plugin |
| **SEO without CMS** | Manual meta tag maintenance | Template meta tags from frontmatter (DRY), Eleventy plugin for sitemap/RSS |
| **Browser compatibility** | Older browsers break | Set browserslist targets (last 2 years), PostCSS autoprefixer, test on Safari/Chrome/Firefox |

---

## Next Steps

1. **Phase 1: Design** → Generate data-model.md (entity schemas), contracts/ (frontmatter validation), quickstart.md (setup guide)
2. **Implementation** → `/speckit.tasks` to break down user stories into actionable tasks
3. **Development** → Set up Eleventy project, Tailwind config, base templates, seed articles
4. **Testing** → Manual cross-browser testing, Lighthouse CI, accessibility audit
5. **Deployment** → Deploy to Vercel/Netlify, configure custom domain, enable analytics
6. **Launch** → Publish 3-5 seed articles, validate success criteria (SC-001 through SC-024)

---

**Research Complete** ✅  
All technology decisions validated. No NEEDS CLARIFICATION markers remain. Ready for Phase 1 Design.

