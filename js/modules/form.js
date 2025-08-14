import emailjs from '@emailjs/browser';

/**
 * Setup contact form functionality with EmailJS
 */
export function setupForm() {
  // Initialize EmailJS with your public key
  emailjs.init('QVUd0vIqQZqQxeFx9');
  
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
        // Prepare template parameters for EmailJS
        const templateParams = {
          from_name: name,
          from_email: email,
          phone: phone,
          visa_type: visaType,
          message: message || 'Sin mensaje adicional',
          to_email: 'info@avusa-asesores.com',
          reply_to: email
        };
        
        console.log('Enviando correo con parámetros:', templateParams);
        
        // Send email using EmailJS
        const response = await emailjs.send(
          'default_service', // Usar servicio por defecto
          'template_9xg3lee', // Tu template ID
          templateParams
        );
        
        console.log('Respuesta de EmailJS:', response);
        
        if (response.status === 200) {
          // Success - reset form and show success message
          contactForm.reset();
          successMessage.classList.add('visible');
          console.log('Correo enviado exitosamente');
        } else {
          throw new Error('Error en el envío del formulario');
        }
        
      } catch (error) {
        console.error('Error detallado al enviar email:', error);
        
        // Mostrar error más específico
        let errorMessage = 'Hubo un error al enviar su consulta. ';
        
        if (error.text) {
          errorMessage += `Detalles: ${error.text}`;
        } else if (error.message) {
          errorMessage += `Detalles: ${error.message}`;
        } else {
          errorMessage += 'Por favor, intente nuevamente o contáctenos directamente por WhatsApp.';
        }
        
        showErrorMessage(errorMessage);
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
  
  // Hide after 8 seconds for longer error messages
  setTimeout(() => {
    errorElement.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.parentNode.removeChild(errorElement);
      }
    }, 300);
  }, 8000);
}