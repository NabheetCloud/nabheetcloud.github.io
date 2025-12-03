# Navigation Menu Guide

## Overview

The navigation menu supports dropdown menus with sub-items. The menu is responsive and works on both desktop and mobile devices.

**Note:** Open Source, SAP, ERPNext, and AI menu items are currently **hidden by default**. See the "Enabling Hidden Menu Items" section below to show them.

## Features

- ✅ **Hover Dropdowns** - Desktop users can hover over menu items to reveal sub-menus
- ✅ **Mobile Responsive** - Hamburger menu on mobile with tap-to-expand navigation
- ✅ **Sticky Header** - Navigation stays at the top while scrolling
- ✅ **Dark Mode Support** - Fully styled for both light and dark themes
- ✅ **Coming Soon States** - Placeholder dropdowns for future sections

## Current Menu Structure

**Visible:**
```
├── Home (/)
├── Posts ▼
│   ├── All Posts (/archive/)
│   └── By Tag (/tags/ai/)
└── About (/about/)
```

**Hidden (can be enabled):**
```
├── Open Source ▼
│   └── Coming soon...
├── SAP ▼
│   └── Coming soon...
├── ERPNext ▼
│   └── Coming soon...
└── AI ▼
    └── Coming soon...
```

## Enabling Hidden Menu Items

To show the hidden menu items (Open Source, SAP, ERPNext, AI), edit `src/_includes/partials/header.njk`:

**Find this line:**
```njk
{% set showExtraMenus = false %}
```

**Change to:**
```njk
{% set showExtraMenus = true %}
```

Then rebuild the site:
```bash
npm run build
```

The menu items will now appear in both desktop and mobile navigation!

## How to Add Sub-Menu Items

### Option 1: Using navigation.json (Future Enhancement)

The file `src/_data/navigation.json` contains the menu structure. In a future update, the header template can be refactored to use this data file for easier menu management.

**Example structure:**
```json
{
  "title": "SAP",
  "dropdown": true,
  "items": [
    {
      "title": "ABAP Development",
      "url": "/sap/abap/"
    },
    {
      "title": "S/4HANA Migration",
      "url": "/sap/s4hana/"
    },
    {
      "title": "RAP Framework",
      "url": "/sap/rap/"
    }
  ]
}
```

### Option 2: Manual HTML Editing (Current)

Edit `src/_includes/partials/header.njk` and find the section you want to modify.

**Example: Adding SAP sub-menu items**

Find this section:
```html
{# SAP Dropdown #}
<div class="relative group">
  <button class="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-accent-light dark:hover:text-accent-dark transition-colors">
    SAP
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
    <div class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 italic">Coming soon...</div>
  </div>
</div>
```

Replace with:
```html
{# SAP Dropdown #}
<div class="relative group">
  <button class="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-accent-light dark:hover:text-accent-dark transition-colors">
    SAP
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
    <a href="/sap/abap/" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">ABAP Development</a>
    <a href="/sap/s4hana/" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">S/4HANA Migration</a>
    <a href="/sap/rap/" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">RAP Framework</a>
  </div>
</div>
```

**Don't forget to update the mobile menu section too:**
```html
<div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
  <a href="/" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-accent-light dark:hover:text-accent-dark">Home</a>
  <a href="/archive/" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-accent-light dark:hover:text-accent-dark">Posts</a>
  <div class="block py-2 text-gray-500 dark:text-gray-500 text-sm">Open Source (Coming soon)</div>
  
  {# SAP section - expanded #}
  <details class="py-2">
    <summary class="text-gray-700 dark:text-gray-300 hover:text-accent-light dark:hover:text-accent-dark cursor-pointer">SAP</summary>
    <div class="pl-4 mt-2 space-y-2">
      <a href="/sap/abap/" class="block text-gray-600 dark:text-gray-400 hover:text-accent-light dark:hover:text-accent-dark">ABAP Development</a>
      <a href="/sap/s4hana/" class="block text-gray-600 dark:text-gray-400 hover:text-accent-light dark:hover:text-accent-dark">S/4HANA Migration</a>
      <a href="/sap/rap/" class="block text-gray-600 dark:text-gray-400 hover:text-accent-light dark:hover:text-accent-dark">RAP Framework</a>
    </div>
  </details>
  
  <div class="block py-2 text-gray-500 dark:text-gray-500 text-sm">ERPNext (Coming soon)</div>
  <div class="block py-2 text-gray-500 dark:text-gray-500 text-sm">AI (Coming soon)</div>
  <a href="/about/" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-accent-light dark:hover:text-accent-dark">About</a>
</div>
```

## Creating Category Pages

When you add sub-menu items, you'll also need to create corresponding pages.

**Example: Create SAP ABAP page**

Create `src/pages/sap-abap.njk`:
```html
---
layout: layouts/page.njk
title: ABAP Development
description: Deep dives into ABAP programming and SAP development
permalink: /sap/abap/
---

<h1>ABAP Development</h1>

<p>Articles and insights about ABAP programming, SAP development, and enterprise solutions.</p>

{# List all posts tagged with 'abap' #}
<div class="grid gap-8 md:grid-cols-2 mt-8">
  {% for post in collections.posts | reverse %}
    {% if "abap" in post.data.tags %}
      {% include "partials/post-card.njk" %}
    {% endif %}
  {% endfor %}
</div>
```

Then add the `abap` tag to your posts' frontmatter.

## Styling Notes

- **Dropdown width**: Currently set to `w-48` (12rem). Adjust as needed for longer menu items.
- **Hover state**: Uses Tailwind's `group-hover` utility for dropdown visibility
- **Transitions**: 200ms duration for smooth animations
- **Dark mode**: All colors have dark mode variants

## Testing

After making changes:

1. **Rebuild the site**: `npm run build`
2. **Test desktop dropdowns**: Hover over each menu item
3. **Test mobile menu**: Resize browser to mobile width and click hamburger menu
4. **Test dark mode**: Toggle theme and verify styling
5. **Test keyboard navigation**: Tab through menu items for accessibility

## Future Enhancements

- [ ] Refactor header to use `navigation.json` data file
- [ ] Add JavaScript for better mobile dropdown behavior
- [ ] Add active state indicators for current page
- [ ] Support for multi-level nested menus
- [ ] Add icons to menu items
- [ ] Add search functionality in navigation

