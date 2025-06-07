/**
 * Setup disclaimer modal functionality
 */
export function setupDisclaimer() {
  const disclaimerModal = document.getElementById('disclaimerModal');
  const closeDisclaimer = document.getElementById('closeDisclaimer');
  
  // Show disclaimer on page load (optional - you can remove this if not needed)
  // setTimeout(() => {
  //   disclaimerModal.style.display = 'block';
  // }, 2000);
  
  // Close disclaimer when clicking the X button
  if (closeDisclaimer) {
    closeDisclaimer.addEventListener('click', () => {
      disclaimerModal.style.display = 'none';
    });
  }
  
  // Close disclaimer when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === disclaimerModal) {
      disclaimerModal.style.display = 'none';
    }
  });
  
  // Close disclaimer with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && disclaimerModal.style.display === 'block') {
      disclaimerModal.style.display = 'none';
    }
  });
}