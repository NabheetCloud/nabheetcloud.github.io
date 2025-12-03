/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{njk,md,html,js}'
  ],
  darkMode: 'class', // Enable dark mode via 'dark' class on <html>
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'bg-light': '#FFFFFF',
        'text-primary-light': '#111827',
        'text-secondary-light': '#6B7280',
        'accent-light': '#007AFF',
        'code-bg-light': '#F9FAFB',
        'border-light': '#E5E7EB',
        // Dark mode colors
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
      fontSize: {
        // Typography scale per research.md
        'h1': '3rem',      // 48px
        'h2': '2rem',      // 32px
        'h3': '1.5rem',    // 24px
        'body': '1.125rem', // 18px
        'code': '0.95rem',  // 15.2px
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text-primary-light'),
            maxWidth: '65ch',
            a: {
              color: theme('colors.accent-light'),
              '&:hover': {
                color: theme('colors.accent-light'),
                opacity: 0.8,
              },
            },
            code: {
              color: theme('colors.text-primary-light'),
              backgroundColor: theme('colors.code-bg-light'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.text-primary-dark'),
            a: {
              color: theme('colors.accent-dark'),
              '&:hover': {
                color: theme('colors.accent-dark'),
                opacity: 0.8,
              },
            },
            code: {
              color: theme('colors.text-primary-dark'),
              backgroundColor: theme('colors.code-bg-dark'),
            },
            h1: {
              color: theme('colors.text-primary-dark'),
            },
            h2: {
              color: theme('colors.text-primary-dark'),
            },
            h3: {
              color: theme('colors.text-primary-dark'),
            },
            h4: {
              color: theme('colors.text-primary-dark'),
            },
            strong: {
              color: theme('colors.text-primary-dark'),
            },
            blockquote: {
              color: theme('colors.text-secondary-dark'),
              borderLeftColor: theme('colors.border-dark'),
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

