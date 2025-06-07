/**
 * Setup contact form functionality with email sending
 */
export function setupForm() {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');
  const closeSuccess = document.getElementById('close-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const visaType = document.getElementById('visa-type').value;
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !email || !phone || !visaType) {
        showErrorMessage('Por favor, complete todos los campos requeridos.');
        return;
      }
      
      // Email validation
      if (!isValidEmail(email)) {
        showErrorMessage('Por favor, ingrese un correo electrónico válido.');
        return;
      }
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Enviando...';
      submitButton.disabled = true;
      
      try {
        // Send email using Formspree (primary method)
        const formData = new FormData(contactForm);
        
        const response = await fetch('https://formspree.io/f/mldnrvlo', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Success - reset form and show success message
          contactForm.reset();
          successMessage.classList.add('visible');
          
          // Send confirmation email to client (optional)
          await sendConfirmationEmail(name, email, visaType);
          
        } else {
          throw new Error('Error en el envío del formulario');
        }
        
      } catch (error) {
        console.error('Error sending email:', error);
        showErrorMessage('Hubo un error al enviar su consulta. Por favor, intente nuevamente o contáctenos directamente.');
      } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }
  
  // Close success message
  if (closeSuccess) {
    closeSuccess.addEventListener('click', () => {
      successMessage.classList.remove('visible');
    });
  }
  
  // Close success message when clicking outside
  if (successMessage) {
    successMessage.addEventListener('click', (e) => {
      if (e.target === successMessage) {
        successMessage.classList.remove('visible');
      }
    });
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show error message
 */
function showErrorMessage(message) {
  // Create or update error message element
  let errorElement = document.getElementById('form-error-message');
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = 'form-error-message';
    errorElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #dc3545;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 400px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      line-height: 1.4;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    document.body.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  
  // Show the message
  setTimeout(() => {
    errorElement.style.transform = 'translateX(0)';
  }, 100);
  
  // Hide after 5 seconds
  setTimeout(() => {
    errorElement.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.parentNode.removeChild(errorElement);
      }
    }, 300);
  }, 5000);
}

/**
 * Send confirmation email to client (optional feature)
 */
async function sendConfirmationEmail(name, email, visaType) {
  try {
    // This is an optional feature - you can implement this with EmailJS or another service
    // For now, we'll just log it
    console.log(`Confirmation email would be sent to ${email} for ${name} regarding ${visaType} visa`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error here as the main form submission was successful
  }
}