// Reading progress bar for Tech Learnings Blog

(function() {
  'use strict';
  
  const progressBar = document.getElementById('reading-progress-bar');
  
  if (!progressBar) return;
  
  // Calculate and update reading progress on scroll
  function updateProgress() {
    // Calculate how far down the page the user has scrolled
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update progress bar width
    progressBar.style.width = scrolled + '%';
  }
  
  // Update progress on scroll (with throttle for performance)
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initialize on page load
  updateProgress();
})();

