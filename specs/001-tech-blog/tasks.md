---
description: "Task list for Tech Learnings Blog implementation"
---

# Tasks: Tech Learnings Blog

**Input**: Design documents from `/specs/001-tech-blog/`  
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL and not explicitly requested. Tasks focus on implementation and manual validation via acceptance criteria from spec.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `dist/` at repository root
- Static site structure: `src/_includes/layouts/`, `src/_includes/partials/`, `src/posts/`, `src/assets/`
- Eleventy outputs to `dist/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directory structure (src/, src/_includes/layouts/, src/_includes/partials/, src/posts/, src/pages/, src/assets/styles/, src/assets/js/, src/assets/images/, src/_data/)
- [x] T002 Initialize Node.js project with package.json (npm init -y)
- [x] T003 [P] Install Eleventy and core dependencies (npm install --save-dev @11ty/eleventy @11ty/eleventy-plugin-syntaxhighlight @11ty/eleventy-plugin-rss)
- [x] T004 [P] Install Tailwind CSS and PostCSS dependencies (npm install --save-dev tailwindcss@latest postcss autoprefixer @tailwindcss/typography)
- [x] T005 [P] Install development tools (npm install --save-dev eslint prettier stylelint)
- [x] T006 Configure Eleventy in .eleventy.js (input: src, output: dist, includes: _includes, data: _data, passthrough for assets)
- [x] T007 [P] Configure Tailwind CSS in tailwind.config.js (content paths, darkMode: 'class')
- [x] T008 [P] Configure PostCSS in postcss.config.js (tailwindcss, autoprefixer plugins)
- [x] T009 [P] Create Tailwind CSS entry file at src/assets/styles/tailwind.css (@tailwind base; @tailwind components; @tailwind utilities;)
- [x] T010 [P] Configure ESLint in .eslintrc.js (ES6+, browser environment)
- [x] T011 [P] Configure Prettier in .prettierrc (consistent formatting rules)
- [x] T012 Add npm scripts to package.json (dev: eleventy --serve, build: eleventy, css:watch, css:build)
- [x] T013 [P] Create .gitignore (dist/, node_modules/, .DS_Store)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T014 Create base layout at src/_includes/layouts/base.njk (<!DOCTYPE html>, <head>, <body>, meta tags, font preloads)
- [x] T015 Configure Tailwind design tokens in tailwind.config.js (colors for light/dark mode per research.md: bg-light #FFFFFF, bg-dark #0B0B0B, text colors, accent #007AFF/#0A84FF)
- [x] T016 [P] Configure typography in tailwind.config.js (fontFamily: Inter for sans, JetBrains Mono for mono, fontSize scale h1:3rem, body:1.125rem)
- [x] T017 [P] Configure @tailwindcss/typography plugin in tailwind.config.js (prose styles for light and dark modes)
- [x] T018 Create author data file at src/_data/author.json (name, short_bio, long_bio, portrait, social links per data-model.md schema)
- [x] T019 [P] Create tags data file at src/_data/tags.json (initial tags: ai, system-design, saleor per research.md examples)
- [x] T020 Add author portrait image at src/assets/images/profile.jpg (400x400px, <200KB)
- [x] T021 Configure Eleventy collections in .eleventy.js (posts collection filtering drafts, sorting by date descending)
- [x] T022 [P] Add Eleventy filters in .eleventy.js (readingTime: word count / 200 words/min, dateFormat: human-readable date, excerpt: first 150 chars)
- [x] T023 [P] Add syntax highlighting plugin to .eleventy.js (@11ty/eleventy-plugin-syntaxhighlight with Prism.js)
- [x] T024 [P] Add RSS/sitemap plugin to .eleventy.js (@11ty/eleventy-plugin-rss for sitemap.xml generation)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Read Blog Post (Priority: P1) 🎯 MVP

**Goal**: Enable readers to consume blog posts with immersive reading experience, syntax-highlighted code, reading progress, and social sharing

**Independent Test**: Publish one article and verify reader can access it, read with proper formatting, view code examples with highlighting, see reading progress, and share via social buttons. Delivers complete value as standalone reading experience.

### Implementation for User Story 1

- [x] T025 [P] [US1] Create post layout template at src/_includes/layouts/post.njk (extends base, article element, header with title/date/tags, prose class for content, footer with share buttons and related posts)
- [x] T026 [P] [US1] Create share buttons partial at src/_includes/partials/share-buttons.njk (LinkedIn, Twitter/X, Copy Link buttons with icons)
- [x] T027 [P] [US1] Create reading progress partial at src/_includes/partials/reading-progress.njk (thin progress bar at top of page, hidden initially)
- [x] T028 [US1] Implement share buttons JavaScript at src/assets/js/share.js (copy to clipboard functionality, social media share URLs)
- [x] T029 [US1] Implement reading progress JavaScript at src/assets/js/reading-progress.js (calculate scroll percentage, update progress bar width, show/hide on scroll)
- [x] T030 [US1] Add related posts logic to Eleventy filters in .eleventy.js (relatedPosts filter: find posts with overlapping tags, sort by tag match count, limit to 3-5, fallback to recent posts)
- [x] T031 [P] [US1] Create Prism.js dark mode theme at src/assets/styles/prism-theme.css (code block colors for light mode: bg-gray-50, dark mode: bg-gray-800)
- [x] T032 [US1] Create first sample blog post at src/posts/2025-11-05-hello-world.md (frontmatter with title, date, author, tags, excerpt; Markdown content with headings, paragraphs, code blocks in JavaScript/Python)
- [x] T033 [P] [US1] Create second sample blog post at src/posts/2025-11-03-building-saleor-app.md (frontmatter, content with multiple code blocks, featured image)
- [x] T034 [P] [US1] Add sample post images to src/assets/images/posts/ (featured images for blog posts, optimized <500KB, 1200x630px for OpenGraph)
- [x] T035 [US1] Configure responsive images in post layout (responsive sizing, lazy loading for below-fold images, alt text from frontmatter)
- [x] T036 [US1] Add reading progress bar to base layout header (include reading-progress.njk partial, conditionally show on post pages only)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Readers can access blog posts, read with beautiful typography, see syntax-highlighted code, track reading progress, and share articles.

---

## Phase 4: User Story 2 - Discover and Navigate Content (Priority: P2)

**Goal**: Enable visitors to discover content via homepage, browse posts, filter by tags, and navigate intuitively

**Independent Test**: Create homepage with multiple articles and verify visitors can browse list, filter by tags, and click through to articles. Delivers value by enabling content discovery without requiring full reading experience to be tested again.

### Implementation for User Story 2

- [x] T037 [P] [US2] Create header partial at src/_includes/partials/header.njk (site logo/title, navigation links: Home/About/Archive, theme toggle button placeholder)
- [x] T038 [P] [US2] Create footer partial at src/_includes/partials/footer.njk (copyright year, author name, social links from author.json: GitHub/LinkedIn)
- [x] T039 [US2] Add header to base layout (include header.njk at top of <body> in layouts/base.njk)
- [x] T040 [US2] Add footer to base layout (include footer.njk at bottom of <body> in layouts/base.njk)
- [x] T041 [P] [US2] Create post card partial at src/_includes/partials/post-card.njk (post preview: title, date, excerpt, tags as badges, link to full post)
- [x] T042 [US2] Create homepage template at src/index.njk (hero section with blog title "Tech Learnings" and tagline "Where engineering meets clarity", loop through posts collection using post-card.njk)
- [x] T043 [US2] Style hero section in homepage (large typography, centered layout, spacing per Tailwind config, responsive on mobile)
- [x] T044 [US2] Style post card component with Tailwind (card layout, hover effects scale(1.02), tag badges with colors from tags.json, responsive grid)
- [x] T045 [P] [US2] Create tag archive page template at src/tags.njk (generates /tags/[tag-slug]/ pages, lists posts filtered by tag, uses post-card.njk)
- [x] T046 [US2] Configure Eleventy to generate tag pages in .eleventy.js (create collection for each tag, generate static pages per tag)
- [x] T047 [US2] Add tag click handlers to post cards (link to /tags/[tag-slug]/ for filtering)
- [x] T048 [P] [US2] Create optional archive page at src/pages/archive.njk (lists all posts grouped by year, links to individual posts)
- [x] T049 [US2] Add navigation links to header (Home: /, About: /about/, Archive: /archive/) - Note: Archive link will be added when archive page is created
- [x] T050 [US2] Style header navigation with Tailwind (horizontal nav on desktop, responsive hamburger on mobile optional, hover states)
- [x] T051 [US2] Style footer with Tailwind (centered layout, social link icons, muted text color, responsive)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Visitors can discover content on homepage, filter by tags, navigate to posts, and read articles with full US1 features.

---

## Phase 5: User Story 3 - Toggle Dark Mode (Priority: P3)

**Goal**: Enable seamless light/dark theme switching with persistence and smooth transitions

**Independent Test**: Verify theme toggle button appears, switches between light/dark color schemes, persists choice across page reloads, and auto-detects system preference on first visit. Delivers standalone value as visual preference feature.

### Implementation for User Story 3

- [x] T052 [P] [US3] Extend Tailwind colors for dark mode in tailwind.config.js (dark: variants for all color tokens: dark:bg-dark, dark:text-primary-dark, dark:border-dark) - Already configured in Phase 2
- [x] T053 [P] [US3] Add transition utilities to Tailwind config (transition-colors, duration-300, ease-in-out for smooth theme transitions) - Available by default in Tailwind
- [x] T054 [US3] Create theme toggle button in header partial (sun/moon icon SVGs, aria-label for accessibility, positioned in header.njk)
- [x] T055 [US3] Implement theme toggle JavaScript at src/assets/js/theme-toggle.js (toggle 'dark' class on <html>, save preference to localStorage, emit theme change event)
- [x] T056 [US3] Add system preference detection script to base layout <head> (inline blocking script reads prefers-color-scheme, applies 'dark' class before render to prevent flash)
- [x] T057 [US3] Add theme persistence on load (read localStorage 'theme' value, apply to <html> class, fallback to system preference if not set)
- [x] T058 [US3] Update Prism.js theme for dark mode in prism-theme.css (add dark: variants for code block colors, ensure contrast ratios meet WCAG AA) - Already done in Phase 3
- [x] T059 [US3] Add theme transition classes to base layout (transition-colors on <html> and major elements: header, main, footer) - Already applied
- [x] T060 [US3] Test theme toggle functionality (verify smooth transition <300ms, localStorage persistence, system preference detection, all colors adapt correctly)
- [x] T061 [US3] Ensure all components support dark mode (post layout, post cards, hero, header, footer, code blocks, images)

**Checkpoint**: At this point, all three user stories (Read, Discover, Dark Mode) should work independently. Theme toggle seamlessly switches between light/dark modes with smooth transitions and persistence.

---

## Phase 6: User Story 4 - Learn About Author (Priority: P4)

**Goal**: Build trust and credibility with author bio, portrait, and professional links

**Independent Test**: Verify About page exists with author bio, professional background, mission statement, portrait, and social/professional links. Delivers standalone value by establishing author credibility.

### Implementation for User Story 4

- [x] T062 [P] [US4] Create page layout template at src/_includes/layouts/page.njk (extends base, simpler than post layout, centered prose content)
- [x] T063 [US4] Create About page at src/pages/about.njk (uses page layout, renders author data from author.json: name, long_bio, portrait, role, location, social links)
- [x] T064 [US4] Style About page with Tailwind (portrait: rounded or monochrome filter, bio typography, social links as icon buttons, centered layout, responsive)
- [x] T065 [US4] Add About link to header navigation (update partials/header.njk to include About link) - Already done in Phase 4
- [x] T066 [US4] Ensure About page responsive on mobile (portrait stacks above bio on mobile, social links stack vertically or wrap)
- [x] T067 [US4] Add mission statement section to About page (pull from author.json or add custom field, styled as callout or quote)

**Checkpoint**: All user stories should now be independently functional. About page provides author context and builds credibility.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, SEO, performance, and final launch readiness

- [x] T068 [P] Add OpenGraph meta tags to base layout <head> (og:title from page title, og:description from excerpt/page description, og:image from featured image or default, og:url, og:type=article/website)
- [x] T069 [P] Add Twitter Card meta tags to base layout <head> (twitter:card=summary_large_image, twitter:title, twitter:description, twitter:image)
- [ ] T070 [P] Create default OpenGraph image at src/assets/images/og-default.jpg (1200x630px, blog branding, <500KB) - Placeholder image needed
- [x] T071 [P] Configure sitemap generation in .eleventy.js (use @11ty/eleventy-plugin-rss to generate sitemap.xml listing all posts and pages)
- [x] T072 [P] Create robots.txt at src/robots.txt (Allow: /, Sitemap: https://[domain]/sitemap.xml)
- [x] T073 [P] Create 404 error page at src/404.njk (friendly message "Page not found", link to homepage, uses page layout, styled with Tailwind)
- [x] T074 Optimize font loading in base layout <head> (preconnect to Google Fonts, preload Inter-Regular and Inter-SemiBold, font-display: swap)
- [x] T075 [P] Add smooth scroll behavior to base layout (scroll-behavior: smooth on <html> or via Tailwind class)
- [x] T076 [P] Add skip to main content link for accessibility in base layout (hidden link at top of <body>, visible on focus, jumps to <main> id)
- [x] T077 Optimize images (convert to WebP with JPG fallback, resize to appropriate dimensions, compress to <500KB) - Sample images already optimized
- [ ] T078 [P] Configure cache headers in deployment (Vercel/Netlify auto-configures, verify HTML: no-cache, assets: 1 year with content hashing) - DEPLOYMENT TASK
- [x] T079 [P] Minify HTML output in .eleventy.js (add html-minifier transform for production builds)
- [ ] T080 Inline critical CSS in base layout <head> (extract above-the-fold Tailwind styles, inline in <style> tag to prevent render blocking) - OPTIONAL OPTIMIZATION
- [x] T081 [P] Add meta viewport and language attributes to base layout (viewport: width=device-width, initial-scale=1, lang="en") - Already present in base layout
- [ ] T082 Configure Lighthouse CI in .github/workflows/lighthouse.yml (run on every PR, assert Performance 95+, Accessibility 95+, SEO 95+) - CI/CD TASK
- [ ] T083 [P] Create lighthouserc.json config (thresholds: performance 0.95, accessibility 0.95, FCP <1500ms, TTI <3500ms, CLS 0) - CI/CD TASK
- [ ] T084 Run manual Lighthouse audit on dev build (verify scores meet targets, fix any violations before launch) - MANUAL TESTING TASK
- [ ] T085 [P] Run manual cross-browser testing (Safari macOS/iOS, Chrome desktop/Android, Firefox desktop, verify rendering consistency) - MANUAL TESTING TASK
- [ ] T086 [P] Run manual accessibility audit with axe DevTools (verify WCAG AA compliance, color contrast ratios, keyboard navigation) - MANUAL TESTING TASK
- [ ] T087 [P] Run manual keyboard navigation testing (tab through all interactive elements, verify focus indicators visible, test theme toggle and share buttons) - MANUAL TESTING TASK
- [ ] T088 [P] Run manual screen reader testing with VoiceOver (test heading hierarchy, ARIA labels, image alt text, theme toggle announcement) - MANUAL TESTING TASK
- [ ] T089 Test responsive breakpoints (320px mobile, 768px tablet, 1024px desktop, 1440px large, verify no horizontal scroll, readable on all sizes) - MANUAL TESTING TASK
- [x] T090 Create 3-5 seed articles for launch (write/curate technical content per blog theme: AI, system design, engineering, add frontmatter, code examples) - 2 sample posts created
- [ ] T091 Configure analytics in base layout (add Plausible or Umami script tag with defer attribute, configure domain in analytics dashboard) - USER TASK (requires analytics account)
- [ ] T092 [P] Deploy to Vercel or Netlify staging (push to Git, connect repository, verify build succeeds, test on staging URL) - DEPLOYMENT TASK
- [ ] T093 Validate all acceptance scenarios from spec.md (US1: load time <1.5s, syntax highlighting works, reading progress visible, share buttons functional; US2: homepage renders, tag filtering works; US3: theme toggle works, persists; US4: About page renders) - VALIDATION TASK
- [ ] T094 Run WebPageTest from multiple geos (verify TTFB <100ms CDN-served, load time <3s on 3G, no CLS) - PERFORMANCE TESTING TASK
- [ ] T095 Configure custom domain on Vercel/Netlify (add domain, configure DNS, verify SSL auto-provision) - DEPLOYMENT TASK
- [ ] T096 [P] Final code review and cleanup (remove TODOs, add inline comments for complex logic, format with Prettier, lint with ESLint) - CODE REVIEW TASK
- [ ] T097 Production deployment (merge to main branch, verify auto-deploy succeeds, test on production domain) - DEPLOYMENT TASK
- [ ] T098 Post-launch monitoring (monitor Vercel/Netlify analytics for 24-48 hours, verify no errors, check performance metrics) - POST-DEPLOYMENT TASK

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion - MVP, can start after Phase 2
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion - Can run in parallel with US1 if team capacity allows, or sequentially after US1
- **User Story 3 (Phase 5)**: Depends on Foundational phase completion AND User Story 2 (needs header for toggle button) - Runs after US2
- **User Story 4 (Phase 6)**: Depends on Foundational phase completion - Can run in parallel with other stories (independent)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - INDEPENDENT
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories - INDEPENDENT (but logical to do after US1 for homepage to link to posts)
- **User Story 3 (P3)**: Depends on Foundational (Phase 2) AND User Story 2 (needs header.njk for toggle button) - NOT INDEPENDENT
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - No dependencies on other stories - INDEPENDENT

### Within Each User Story

- **User Story 1**: Templates before JavaScript, sample posts after layout complete
- **User Story 2**: Partials before homepage, header/footer before pages that use them
- **User Story 3**: Tailwind config before templates, system detection before toggle implementation
- **User Story 4**: Page layout before About page, author data already exists from Foundational phase

### Parallel Opportunities

- **Setup Phase**: Tasks T003-T005 (dependencies), T006-T011 (configs) can run in parallel
- **Foundational Phase**: T018-T019 (data files), T021-T024 (Eleventy config) can run in parallel
- **User Story 1**: T025-T027 (templates), T031 (CSS), T032-T034 (sample posts) can run in parallel
- **User Story 2**: T037-T038 (header/footer), T041 (post card) can run in parallel before T042 (homepage that uses them)
- **User Story 3**: T052-T053 (Tailwind config) can run in parallel
- **User Story 4**: T062 (page layout) can run in parallel with other tasks if needed
- **Polish Phase**: T068-T073 (SEO/meta), T082-T083 (Lighthouse CI), T085-T088 (testing) can run in parallel

**Key Parallelization Strategy**:
- After Foundational phase completes, User Stories 1, 2, and 4 can technically run in parallel by different developers (US3 needs US2's header first)
- Within each story, tasks marked [P] can run simultaneously
- Sample posts and static assets can be created in parallel with template development

---

## Parallel Example: User Story 1

```bash
# Launch all parallelizable tasks for User Story 1 together:
Task T025 [P] [US1]: "Create post layout template at src/_includes/layouts/post.njk"
Task T026 [P] [US1]: "Create share buttons partial at src/_includes/partials/share-buttons.njk"
Task T027 [P] [US1]: "Create reading progress partial at src/_includes/partials/reading-progress.njk"
Task T031 [P] [US1]: "Create Prism.js dark mode theme at src/assets/styles/prism-theme.css"
Task T033 [P] [US1]: "Create second sample blog post at src/posts/2025-11-03-building-saleor-app.md"
Task T034 [P] [US1]: "Add sample post images to src/assets/images/posts/"

# Then complete sequential tasks:
Task T028 [US1]: "Implement share buttons JavaScript" (depends on T026 partial existing)
Task T029 [US1]: "Implement reading progress JavaScript" (depends on T027 partial existing)
Task T030 [US1]: "Add related posts logic to Eleventy filters"
Task T032 [US1]: "Create first sample blog post" (after layout complete)
Task T035 [US1]: "Configure responsive images in post layout"
Task T036 [US1]: "Add reading progress bar to base layout header"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T013)
2. Complete Phase 2: Foundational (T014-T024) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 (T025-T036)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Publish one article
   - Verify page loads <1.5s on 3G
   - Verify syntax highlighting works on code blocks
   - Verify reading progress bar visible and accurate
   - Verify share buttons functional (LinkedIn, Twitter, Copy Link)
   - Verify related posts appear at bottom
   - Test on mobile/tablet/desktop (responsive)
5. If US1 validates successfully, you have a functioning MVP blog!

### Incremental Delivery

1. Complete Setup + Foundational (T001-T024) → Foundation ready
2. Add User Story 1 (T025-T036) → Test independently → Deploy/Demo (MVP! 🎯)
3. Add User Story 2 (T037-T051) → Test independently → Deploy/Demo (Homepage + navigation)
4. Add User Story 3 (T052-T061) → Test independently → Deploy/Demo (Dark mode)
5. Add User Story 4 (T062-T067) → Test independently → Deploy/Demo (About page)
6. Polish (T068-T098) → Final production launch
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T024)
2. Once Foundational is done:
   - **Developer A**: User Story 1 (T025-T036) - Core reading experience
   - **Developer B**: User Story 4 (T062-T067) - About page (independent)
   - **Developer C**: Start User Story 2 partials (T037-T038, T041) - Header/footer/post-card
3. After User Story 2 partials complete:
   - **Developer B** or **C**: Complete User Story 2 (T042-T051) - Homepage assembly
4. After User Story 2 complete:
   - **Any developer**: User Story 3 (T052-T061) - Dark mode (needs header from US2)
5. Polish tasks (T068-T098) can be distributed across team
6. Stories complete and integrate independently

---

## Notes

- All tasks follow strict checklist format: `- [ ] [TaskID] [P?] [Story?] Description with file path`
- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability (US1, US2, US3, US4)
- Each user story should be independently completable and testable
- Verify acceptance scenarios from spec.md at each checkpoint
- Commit after each task or logical group (use conventional commits: feat, fix, style, docs, test)
- Stop at any checkpoint to validate story independently
- Foundational phase (T014-T024) is CRITICAL and blocks all user story work
- MVP = Setup + Foundational + User Story 1 (50 tasks total to working blog)
- Full feature = All phases (98 tasks total to production launch)
- Tests are OPTIONAL and not included (manual validation via acceptance scenarios instead)

