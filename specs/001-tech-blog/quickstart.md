# Quickstart: Tech Learnings Blog

**Feature**: Tech Learnings Blog  
**Branch**: 001-tech-blog  
**Date**: 2025-11-05  
**Purpose**: Local development setup, build process, and deployment guide

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ and npm 9+ installed ([download](https://nodejs.org/))
- **Git** installed and configured
- **Code Editor** (VS Code recommended with Prettier and ESLint extensions)
- **Vercel or Netlify Account** (free tier sufficient) for deployment

**Verify Installation**:

```bash
node --version   # Should show v18+ or higher
npm --version    # Should show 9+ or higher
git --version    # Should show 2.x+
```

---

## Quick Start (5 Minutes)

### 1. Clone Repository

```bash
git clone <repository-url>
cd NabheetBlog
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Eleventy (static site generator)
- Tailwind CSS (styling framework)
- Prism.js (syntax highlighting)
- PostCSS (CSS processing)
- Development tools (ESLint, Prettier)

### 3. Configure Author Profile

Edit `src/_data/author.json` with your information:

```json
{
  "name": "Your Name",
  "short_bio": "Your one-sentence bio (50-150 chars)",
  "long_bio": "Your full biography for About page (200-1000 chars)",
  "portrait": "/assets/images/profile.jpg",
  "portrait_alt": "Portrait description",
  "role": "Your Professional Title",
  "location": "Your Location",
  "email": "your@email.com",
  "social": {
    "github": "yourusername",
    "linkedin": "yourusername",
    "twitter": "yourusername"
  }
}
```

**Add Your Portrait**:
- Place your portrait image at `src/assets/images/profile.jpg`
- Recommended size: 400x400px, JPG or PNG, <200KB
- Monochrome or muted colors match Apple aesthetic

### 4. Define Initial Tags

Edit `src/_data/tags.json` to add your content categories:

```json
{
  "tags": [
    {
      "slug": "ai",
      "name": "Artificial Intelligence",
      "description": "Deep dives into machine learning and AI",
      "color": "#8B5CF6"
    },
    {
      "slug": "system-design",
      "name": "System Design",
      "description": "Scalable architecture patterns",
      "color": "#10B981"
    }
  ]
}
```

### 5. Write Your First Post

Create `src/posts/2025-11-05-hello-world.md`:

```markdown
---
title: "Hello World: Launching My Tech Blog"
slug: "hello-world"
date: 2025-11-05
author: "Your Name"
excerpt: "Welcome to my new technical blog where I'll share learnings about engineering, AI, and system design."
tags: ["system-design"]
draft: false
---

# Hello World

Welcome to my technical blog! This is where I'll be sharing deep dives into...

## What to Expect

- Engineering insights
- System architecture patterns
- AI explorations

Stay tuned for more!

## Code Example

\`\`\`javascript
console.log('Hello, World!');
\`\`\`
```

**Frontmatter Requirements**:
- `title`: Required, 1-100 chars
- `date`: Required, ISO format (YYYY-MM-DD)
- `author`: Required, must match name in `author.json`
- `tags`: Required, 1-5 tags, must exist in `tags.json`

### 6. Start Development Server

```bash
npm run dev
```

This command:
- Starts Eleventy in watch mode
- Starts Tailwind CSS in watch mode
- Serves site at `http://localhost:8080`
- Auto-reloads on file changes

**Open in Browser**: Visit `http://localhost:8080`

You should see:
- Homepage with your first post listed
- Header with navigation and theme toggle
- Footer with your social links

### 7. Test Dark Mode

Click the sun/moon icon in the header to toggle between light and dark themes. Verify:
- Colors transition smoothly (300ms)
- Code blocks adapt to theme
- Theme preference persists on reload

---

## Project Structure

```
NabheetBlog/
├── src/                          # Source files (Eleventy input)
│   ├── _includes/                # Layouts and partials
│   │   ├── layouts/
│   │   │   ├── base.njk         # Base HTML layout
│   │   │   ├── post.njk         # Blog post layout
│   │   │   └── page.njk         # Static page layout
│   │   └── partials/
│   │       ├── header.njk       # Site header
│   │       ├── footer.njk       # Site footer
│   │       ├── post-card.njk    # Post preview card
│   │       └── share-buttons.njk
│   ├── _data/                   # Global data files
│   │   ├── author.json          # Author profile
│   │   └── tags.json            # Tag definitions
│   ├── posts/                   # Blog posts (Markdown)
│   │   └── YYYY-MM-DD-slug.md
│   ├── pages/                   # Static pages
│   │   ├── about.njk            # About page
│   │   └── archive.njk          # Archive page
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── tailwind.css     # Tailwind imports
│   │   │   └── prism-theme.css  # Syntax highlighting
│   │   ├── js/
│   │   │   ├── theme-toggle.js
│   │   │   ├── reading-progress.js
│   │   │   └── share.js
│   │   └── images/
│   │       ├── profile.jpg      # Your portrait
│   │       └── posts/           # Post images
│   └── index.njk                # Homepage
│
├── dist/                        # Build output (gitignored)
│
├── .eleventy.js                 # Eleventy configuration
├── tailwind.config.js           # Design system tokens
├── postcss.config.js            # PostCSS config
├── package.json                 # Dependencies & scripts
├── .gitignore
└── README.md
```

---

## Development Workflow

### Adding a New Post

1. **Create Markdown file** in `src/posts/`:

```bash
touch src/posts/2025-11-06-my-new-post.md
```

2. **Add frontmatter** and content:

```markdown
---
title: "My New Post Title"
slug: "my-new-post"
date: 2025-11-06
author: "Your Name"
excerpt: "Brief description (100-300 chars)"
tags: ["ai", "system-design"]
featured_image: "/assets/images/posts/my-post-hero.jpg"
featured_image_alt: "Hero image description"
draft: false
---

# Your content here

Write your post with **Markdown** formatting...
```

3. **Eleventy watches** and rebuilds automatically
4. **Refresh browser** to see changes (or use live reload)

### Adding a Featured Image

1. Add image to `src/assets/images/posts/`
2. Optimize image:
   - Convert to WebP (or use JPG/PNG)
   - Resize to 1200x630px (OpenGraph optimal)
   - Keep file size <500KB
3. Reference in frontmatter:

```yaml
featured_image: "/assets/images/posts/my-image.jpg"
featured_image_alt: "Descriptive alt text for accessibility"
```

### Adding Code Blocks

Use triple backticks with language identifier:

````markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
````

**Supported Languages**:
- `javascript`, `typescript`, `python`, `go`, `rust`
- `bash`, `json`, `yaml`, `markdown`, `html`, `css`

Prism.js automatically applies syntax highlighting at build time.

### Customizing Colors

Edit `tailwind.config.js` to adjust design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Light mode
        'bg-light': '#FFFFFF',
        'text-light': '#111827',
        // Dark mode
        'bg-dark': '#0B0B0B',
        'text-dark': '#E5E7EB',
        // Accent
        'accent-light': '#007AFF',
        'accent-dark': '#0A84FF',
      },
    },
  },
};
```

Tailwind purges unused classes at build time (10-20KB final CSS).

---

## Build & Deploy

### Local Production Build

Test production build locally:

```bash
npm run build
```

This command:
1. Runs Eleventy build (generates HTML from Markdown/Nunjucks)
2. Compiles and purges Tailwind CSS (removes unused classes)
3. Minifies JavaScript
4. Optimizes images
5. Outputs to `dist/` directory

**Verify Build**:

```bash
# Serve dist/ locally
npx serve dist
# Visit http://localhost:3000
```

Check:
- All pages render correctly
- Dark mode works
- Images load
- Code highlighting applied

### Deploy to Vercel

#### Option A: Vercel CLI (Recommended for First Deploy)

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Login**:

```bash
vercel login
```

3. **Deploy**:

```bash
vercel
```

Follow prompts:
- Link to existing project or create new
- Confirm build command: `npm run build`
- Confirm output directory: `dist`

4. **Production Deploy**:

```bash
vercel --prod
```

Your site is live at `https://your-project.vercel.app`

#### Option B: Vercel Git Integration (Automatic Deploys)

1. **Push to GitHub**:

```bash
git add .
git commit -m "feat: initial blog setup"
git push origin main
```

2. **Connect to Vercel**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Eleventy settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Node Version: 18.x

3. **Deploy**: Click "Deploy"

4. **Automatic Deploys**: Every push to `main` triggers production deploy. PRs get preview deploys.

**Configure Custom Domain** (optional):
- Vercel Dashboard → Domains → Add Domain
- Follow DNS configuration instructions
- SSL auto-provisioned via Let's Encrypt

### Deploy to Netlify

#### Option A: Netlify CLI

1. **Install Netlify CLI**:

```bash
npm install -g netlify-cli
```

2. **Login**:

```bash
netlify login
```

3. **Initialize**:

```bash
netlify init
```

Follow prompts to link repository.

4. **Deploy**:

```bash
netlify deploy --prod
```

#### Option B: Netlify Git Integration

1. **Push to GitHub**:

```bash
git push origin main
```

2. **Connect to Netlify**:
   - Visit [app.netlify.com/start](https://app.netlify.com/start)
   - Connect GitHub repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Publish Directory: `dist`

3. **Deploy**: Click "Deploy site"

4. **Automatic Deploys**: Enabled by default for `main` branch.

---

## Testing

### Manual Testing Checklist

Before deploying to production, verify:

- [ ] **Homepage**: Lists posts, hero section visible, responsive
- [ ] **Blog Post**: Renders correctly, code highlighting works, reading progress visible
- [ ] **About Page**: Author bio displays, portrait loads, social links work
- [ ] **Dark Mode**: Toggle works, colors adapt, preference persists on reload
- [ ] **Responsive**: Test on mobile (320px), tablet (768px), desktop (1024px+)
- [ ] **Navigation**: All links work, no 404 errors
- [ ] **Images**: Featured images load, alt text present
- [ ] **SEO**: Page titles correct, meta descriptions present
- [ ] **Performance**: Page loads quickly (<2s on 3G), no layout shift

### Cross-Browser Testing

Test on:
- **Safari** (macOS and iOS) - primary target audience uses Apple devices
- **Chrome** (desktop and Android)
- **Firefox** (desktop)

### Accessibility Testing

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Verify focus indicators visible
   - Ensure theme toggle, links, share buttons are keyboard-accessible

2. **Screen Reader** (macOS VoiceOver):

```bash
# Enable VoiceOver
System Preferences → Accessibility → VoiceOver → Enable
# Or: Cmd + F5

# Navigate with:
# - VO + Right Arrow (next item)
# - VO + H (next heading)
# - VO + Cmd + H (list all headings)
```

Verify:
- Heading hierarchy makes sense (h1 → h2 → h3)
- Images have descriptive alt text
- Theme toggle announces state ("dark mode enabled")

3. **Color Contrast** (axe DevTools):
   - Install [axe DevTools extension](https://www.deque.com/axe/devtools/)
   - Run audit on homepage and blog post
   - Fix any contrast violations (target 4.5:1 body text, 3:1 large text)

### Performance Testing

#### Lighthouse (Chrome DevTools)

1. Open Chrome DevTools (F12)
2. Navigate to Lighthouse tab
3. Select categories: Performance, Accessibility, SEO
4. Click "Analyze page load"

**Target Scores**:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**Key Metrics**:
- FCP (First Contentful Paint): <1.5s
- TTI (Time to Interactive): <3.5s
- CLS (Cumulative Layout Shift): 0
- Bundle size: <200KB

#### WebPageTest

For real-world performance testing:

1. Visit [webpagetest.org](https://www.webpagetest.org/)
2. Enter your deployed URL
3. Select location (e.g., California, USA)
4. Select device (Mobile 3G or 4G)
5. Run test

**Target**:
- TTFB (Time to First Byte): <100ms (CDN-served)
- Load Time: <3s on 3G

### Lighthouse CI (Automated)

Configure in `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:8080
            http://localhost:8080/posts/hello-world
          uploadArtifacts: true
          temporaryPublicStorage: true
          configPath: './lighthouserc.json'
```

**Lighthouse Config** (`lighthouserc.json`):

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run serve",
      "url": ["http://localhost:8080"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.95}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1500}],
        "interactive": ["error", {"maxNumericValue": 3500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0}]
      }
    }
  }
}
```

This fails CI if performance/accessibility regressions detected.

---

## Troubleshooting

### Build Errors

**Error: Post missing required field 'title'**
- Fix: Add `title` to post frontmatter

**Error: Invalid tag 'xyz' in post**
- Fix: Add tag to `src/_data/tags.json` first, then reference in post

**Error: Featured image not found**
- Fix: Verify image exists at path specified in `featured_image` field

**Error: Duplicate slug 'hello-world'**
- Fix: Ensure all post slugs are unique

### Dark Mode Issues

**Theme doesn't persist on reload**
- Fix: Check browser localStorage is enabled (not in private/incognito mode)
- Debug: Open DevTools → Application → Local Storage → verify `theme` key exists

**Flash of wrong theme on reload**
- Fix: Ensure inline theme script in `<head>` runs before page render
- Script should be blocking (not `async` or `defer`)

### Performance Issues

**Slow page loads**
- Check image sizes (compress images to <500KB, use WebP)
- Verify Tailwind CSS purged unused classes (check `dist/assets/styles/main.css` size, should be <20KB)
- Ensure JavaScript deferred (`<script defer>`)

**Large JavaScript bundle**
- Check Prism.js only includes needed languages (configure in `.eleventy.js`)
- Remove unused dependencies from `package.json`

### Styling Issues

**Styles not updating**
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check Tailwind watch is running (`npm run dev` includes CSS watch)
- Verify class names are correct (Tailwind v3 syntax)

---

## NPM Scripts

```json
{
  "scripts": {
    "dev": "eleventy --serve & npm run css:watch",
    "build": "npm run css:build && eleventy",
    "css:watch": "tailwindcss -i src/assets/styles/tailwind.css -o dist/assets/styles/main.css --watch",
    "css:build": "NODE_ENV=production tailwindcss -i src/assets/styles/tailwind.css -o dist/assets/styles/main.css --minify",
    "serve": "npm run build && npx serve dist",
    "lint": "eslint src/assets/js/**/*.js",
    "format": "prettier --write 'src/**/*.{njk,md,js,json,css}'"
  }
}
```

**Commands**:
- `npm run dev`: Start development server (Eleventy + Tailwind watch)
- `npm run build`: Production build (CSS purged, HTML minified)
- `npm run serve`: Build and serve locally (test production build)
- `npm run lint`: Check JavaScript for errors (ESLint)
- `npm run format`: Format code (Prettier)

---

## Configuration Files

### `.eleventy.js` (Eleventy Config)

```javascript
module.exports = function(eleventyConfig) {
  // Passthrough copy (assets served as-is)
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  
  // Syntax highlighting
  const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // RSS & Sitemap
  const pluginRss = require('@11ty/eleventy-plugin-rss');
  eleventyConfig.addPlugin(pluginRss);
  
  // Filters
  eleventyConfig.addFilter('readingTime', (content) => {
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200); // avg 200 words/min
  });
  
  eleventyConfig.addFilter('dateFormat', (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Collections
  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('src/posts/*.md')
      .filter(post => !post.data.draft) // exclude drafts in production
      .sort((a, b) => b.date - a.date);
  });
  
  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk'
  };
};
```

### `tailwind.config.js` (Design System)

```javascript
module.exports = {
  content: [
    './src/**/*.{njk,md,html,js}'
  ],
  darkMode: 'class', // Enable dark mode via 'dark' class on <html>
  theme: {
    extend: {
      colors: {
        // Light mode
        'bg-light': '#FFFFFF',
        'text-primary-light': '#111827',
        'text-secondary-light': '#6B7280',
        'accent-light': '#007AFF',
        'code-bg-light': '#F9FAFB',
        'border-light': '#E5E7EB',
        // Dark mode
        'bg-dark': '#0B0B0B',
        'text-primary-dark': '#E5E7EB',
        'text-secondary-dark': '#9CA3AF',
        'accent-dark': '#0A84FF',
        'code-bg-dark': '#1F2937',
        'border-dark': '#374151',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text-primary-light'),
            a: {
              color: theme('colors.accent-light'),
              '&:hover': {
                color: theme('colors.accent-light'),
              },
            },
            code: {
              color: theme('colors.text-primary-light'),
              backgroundColor: theme('colors.code-bg-light'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.text-primary-dark'),
            a: {
              color: theme('colors.accent-dark'),
            },
            code: {
              color: theme('colors.text-primary-dark'),
              backgroundColor: theme('colors.code-bg-dark'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

---

## Next Steps

1. **Complete Implementation**: Run `/speckit.tasks` to generate task breakdown from user stories
2. **Set Up CI/CD**: Configure GitHub Actions for Lighthouse CI and auto-deploy
3. **Write Seed Articles**: Create 3-5 initial posts to demonstrate design and populate homepage
4. **Launch**: Deploy to production, share with audience, gather feedback
5. **Iterate**: Monitor analytics (Plausible/Umami), validate success criteria, improve based on insights

---

## Support & Resources

**Documentation**:
- [Eleventy Docs](https://www.11ty.dev/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Nunjucks Templating](https://mozilla.github.io/nunjucks/)

**Community**:
- [Eleventy Discord](https://www.11ty.dev/blog/discord/)
- [Tailwind Discord](https://tailwindcss.com/discord)

**Performance Tools**:
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

---

**Quickstart Complete** ✅  
You're ready to build the Tech Learnings Blog! Run `npm run dev` and start writing.

