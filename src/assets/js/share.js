// Share buttons functionality for Tech Learnings Blog

(function() {
  'use strict';
  
  // Copy link to clipboard functionality
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const copyLinkText = document.getElementById('copyLinkText');
  
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async function() {
      const url = this.dataset.url;
      
      try {
        // Use modern Clipboard API
        await navigator.clipboard.writeText(url);
        
        // Update button text to show success
        copyLinkText.textContent = 'Copied!';
        copyLinkBtn.classList.add('bg-green-100', 'dark:bg-green-900');
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyLinkText.textContent = 'Copy Link';
          copyLinkBtn.classList.remove('bg-green-100', 'dark:bg-green-900');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          copyLinkText.textContent = 'Copied!';
          setTimeout(() => {
            copyLinkText.textContent = 'Copy Link';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          copyLinkText.textContent = 'Failed';
          setTimeout(() => {
            copyLinkText.textContent = 'Copy Link';
          }, 2000);
        }
        
        document.body.removeChild(textArea);
      }
    });
  }
})();

