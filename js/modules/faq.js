/**
 * Setup FAQ accordion functionality
 */
export function setupFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Check if this item is already active
      const isActive = item.classList.contains('active');
      
      // Close all items first
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // Toggle the clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}