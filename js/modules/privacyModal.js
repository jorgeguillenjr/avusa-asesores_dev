/**
 * Setup privacy policy modal functionality
 */
export function setupPrivacyModal() {
  const privacyPolicyLink = document.getElementById('privacy-policy-link');
  const privacyPolicyModal = document.getElementById('privacyPolicyModal');
  const closePrivacyModal = document.getElementById('closePrivacyModal');
  const acceptPrivacyPolicy = document.getElementById('acceptPrivacyPolicy');
  
  // Open modal when privacy policy link is clicked
  if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', (e) => {
      e.preventDefault();
      showModal();
    });
  }
  
  // Close modal when X button is clicked
  if (closePrivacyModal) {
    closePrivacyModal.addEventListener('click', () => {
      hideModal();
    });
  }
  
  // Close modal when "Entendido" button is clicked
  if (acceptPrivacyPolicy) {
    acceptPrivacyPolicy.addEventListener('click', () => {
      hideModal();
    });
  }
  
  // Close modal when clicking outside the modal content
  if (privacyPolicyModal) {
    privacyPolicyModal.addEventListener('click', (e) => {
      if (e.target === privacyPolicyModal) {
        hideModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && privacyPolicyModal && privacyPolicyModal.style.display === 'flex') {
      hideModal();
    }
  });
  
  function showModal() {
    if (privacyPolicyModal) {
      privacyPolicyModal.style.display = 'flex';
      privacyPolicyModal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Focus management for accessibility
      const firstFocusableElement = privacyPolicyModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }
  
  function hideModal() {
    if (privacyPolicyModal) {
      privacyPolicyModal.classList.remove('show');
      
      // Add a small delay before hiding to allow animation to complete
      setTimeout(() => {
        privacyPolicyModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
      }, 300);
    }
  }
  
  // Trap focus within modal when it's open
  function trapFocus(e) {
    if (privacyPolicyModal && privacyPolicyModal.style.display === 'flex') {
      const focusableElements = privacyPolicyModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  }
  
  document.addEventListener('keydown', trapFocus);
}