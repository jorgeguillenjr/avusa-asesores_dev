/**
 * Setup contact form functionality
 */
export function setupForm() {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');
  const closeSuccess = document.getElementById('close-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const visaType = document.getElementById('visa-type').value;
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !email || !phone || !visaType) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // In a real application, you would send this data to a server
      // For this example, we'll just simulate a successful submission
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      successMessage.classList.add('visible');
    });
  }
  
  // Close success message
  if (closeSuccess) {
    closeSuccess.addEventListener('click', () => {
      successMessage.classList.remove('visible');
    });
  }
}