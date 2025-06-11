import { setupHeader } from './modules/header.js';
import { setupCities } from './modules/cities.js';
import { setupTestimonials } from './modules/testimonials.js';
import { setupFaq } from './modules/faq.js';
import { setupForm } from './modules/form.js';
import { setupScrollTop } from './modules/scrollTop.js';
import { setupDisclaimer } from './modules/disclaimer.js';
import { setupPrivacyModal, setupServiceModal, setupLegalNoticeModal } from './modules/modals.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup header scroll behavior
  setupHeader();
  
  // Setup cities slider
  setupCities();
  
  // Setup testimonials slider
  setupTestimonials();
  
  // Setup FAQ accordion
  setupFaq();
  
  // Setup contact form
  setupForm();
  
  // Setup back to top button
  setupScrollTop();
  
  // Setup disclaimer modal
  setupDisclaimer();
  
  // Setup privacy policy modal
  setupPrivacyModal();
  
  // Setup service terms modal
  setupServiceModal();
  
  // Setup legal notice modal
  setupLegalNoticeModal();
});