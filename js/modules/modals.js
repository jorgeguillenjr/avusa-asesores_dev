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
      showPrivacyModal();
    });
  }
  
  // Close modal when X button is clicked
  if (closePrivacyModal) {
    closePrivacyModal.addEventListener('click', () => {
      hidePrivacyModal();
    });
  }
  
  // Close modal when "Entendido" button is clicked
  if (acceptPrivacyPolicy) {
    acceptPrivacyPolicy.addEventListener('click', () => {
      hidePrivacyModal();
    });
  }
  
  // Close modal when clicking outside the modal content
  if (privacyPolicyModal) {
    privacyPolicyModal.addEventListener('click', (e) => {
      if (e.target === privacyPolicyModal) {
        hidePrivacyModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && privacyPolicyModal && privacyPolicyModal.style.display === 'flex') {
      hidePrivacyModal();
    }
  });
  
  function showPrivacyModal() {
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
  
  function hidePrivacyModal() {
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
  function trapPrivacyFocus(e) {
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
  
  document.addEventListener('keydown', trapPrivacyFocus);
}

/**
 * Setup service terms modal functionality
 */
export function setupServiceModal() {
  const serviceTermsLink = document.getElementById('service-terms-link');
  const serviceTermsModal = document.getElementById('serviceTermsModal');
  const closeServiceTermsModal = document.getElementById('closeServiceTermsModal');
  const acceptServiceTerms = document.getElementById('acceptServiceTerms');
  
  // Open modal when service terms link is clicked
  if (serviceTermsLink) {
    serviceTermsLink.addEventListener('click', (e) => {
      e.preventDefault();
      showServiceModal();
    });
  }
  
  // Close modal when X button is clicked
  if (closeServiceTermsModal) {
    closeServiceTermsModal.addEventListener('click', () => {
      hideServiceModal();
    });
  }
  
  // Close modal when "Entendido" button is clicked
  if (acceptServiceTerms) {
    acceptServiceTerms.addEventListener('click', () => {
      hideServiceModal();
    });
  }
  
  // Close modal when clicking outside the modal content
  if (serviceTermsModal) {
    serviceTermsModal.addEventListener('click', (e) => {
      if (e.target === serviceTermsModal) {
        hideServiceModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceTermsModal && serviceTermsModal.style.display === 'flex') {
      hideServiceModal();
    }
  });
  
  function showServiceModal() {
    if (serviceTermsModal) {
      serviceTermsModal.style.display = 'flex';
      serviceTermsModal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Focus management for accessibility
      const firstFocusableElement = serviceTermsModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }
  
  function hideServiceModal() {
    if (serviceTermsModal) {
      serviceTermsModal.classList.remove('show');
      
      // Add a small delay before hiding to allow animation to complete
      setTimeout(() => {
        serviceTermsModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
      }, 300);
    }
  }
  
  // Trap focus within modal when it's open
  function trapServiceFocus(e) {
    if (serviceTermsModal && serviceTermsModal.style.display === 'flex') {
      const focusableElements = serviceTermsModal.querySelectorAll(
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
  
  document.addEventListener('keydown', trapServiceFocus);
}