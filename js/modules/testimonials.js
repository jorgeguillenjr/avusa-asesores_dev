/**
 * Setup testimonials slider functionality
 */
export function setupTestimonials() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentIndex = 0;
  let autoSlideInterval;

  // Show a specific testimonial by index
  function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
      card.classList.remove('active');
    });
    
    // Show the selected testimonial
    testimonialCards[index].classList.add('active');
    
    // Update dots
    testimonialDots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    testimonialDots[index].classList.add('active');
    
    // Update current index
    currentIndex = index;
  }

  // Set up dot click events
  testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      showTestimonial(index);
      resetAutoSlide();
    });
  });

  // Auto slide function
  function autoSlide() {
    const nextIndex = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
  }

  // Reset auto slide timer
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
  }

  // Initialize testimonials
  function initTestimonials() {
    // Show first testimonial
    showTestimonial(0);
    
    // Start auto slide
    autoSlideInterval = setInterval(autoSlide, 5000);
  }

  // Initialize
  initTestimonials();
}