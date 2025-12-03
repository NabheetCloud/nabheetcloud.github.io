// T055: Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  if (!themeToggle) return;
  
  // Get current theme from localStorage or system preference (defaults to dark)
  const getCurrentTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    
    // Default to dark mode
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
  };
  
  // Apply theme to HTML element
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    
    // Update button aria-label
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    
    // Update button icon
    updateThemeIcon(theme);
  };
  
  // Update theme toggle icon
  const updateThemeIcon = (theme) => {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (theme === 'dark') {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    
    // Emit custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  };
  
  // Initialize theme on page load
  applyTheme(getCurrentTheme());
  
  // Add click listener
  themeToggle.addEventListener('click', toggleTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});

