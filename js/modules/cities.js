/**
 * Setup cities slider functionality
 */
export function setupCities() {
  // Cities data - contains information about major US cities
  const citiesData = [
    {
      name: "New York City",
      image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Experience the vibrant energy of the Big Apple with its iconic skyline, Broadway shows, and diverse neighborhoods.",
      highlights: ["Statue of Liberty", "Central Park", "Times Square", "Broadway"]
    },
    {
      name: "San Francisco",
      image: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Discover the charm of the Bay Area with its hills, cable cars, and the magnificent Golden Gate Bridge.",
      highlights: ["Golden Gate Bridge", "Alcatraz Island", "Fisherman's Wharf", "Chinatown"]
    },
    {
      name: "Los Angeles",
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Explore the entertainment capital with Hollywood, beautiful beaches, and vibrant cultural scenes.",
      highlights: ["Hollywood Sign", "Venice Beach", "Universal Studios", "Beverly Hills"]
    },
    {
      name: "Chicago",
      // image: "https://images.pexels.com/photos/2148516/pexels-photo-2148516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      image: "https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Visit the Windy City with its stunning architecture, deep-dish pizza, and lakefront attractions.",
      highlights: ["Millennium Park", "Navy Pier", "Art Institute", "Willis Tower"]
    },
    {
      name: "Miami",
      image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Enjoy the tropical paradise with pristine beaches, vibrant nightlife, and unique cultural blend.",
      highlights: ["South Beach", "Art Deco District", "Little Havana", "Everglades"]
    },
    {
      name: "Las Vegas",
      image: "https://images.pexels.com/photos/415999/pexels-photo-415999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Experience the Entertainment Capital of the World with its spectacular shows and luxurious resorts.",
      highlights: ["The Strip", "Fremont Street", "Grand Canyon Tours", "World-class Shows"]
    }
  ];

  const citySlideContainer = document.getElementById('city-slide-container');
  const prevBtn = document.getElementById('prev-city');
  const nextBtn = document.getElementById('next-city');
  const sliderIndicatorsContainer = document.getElementById('slider-indicators');
  
  let currentIndex = 0;
  let slideWidth;
  let slidesToShow = 1;
  let touchStartX = 0;
  let touchEndX = 0;

  // Create city cards
  function createCityCards() {
    citySlideContainer.innerHTML = '';
    
    citiesData.forEach((city, index) => {
      const cityCard = document.createElement('div');
      cityCard.className = 'city-card';
      
      cityCard.innerHTML = `
        <div class="city-card-inner">
          <div class="city-image">
            <img src="${city.image}" alt="${city.name}">
          </div>
          <div class="city-info">
            <h3>${city.name}</h3>
            <p>${city.description}</p>
            <div class="city-highlights">
              ${city.highlights.map(highlight => `<span class="city-highlight">${highlight}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
      
      citySlideContainer.appendChild(cityCard);
    });
  }

  // Create slider indicators
  function createSliderIndicators() {
    sliderIndicatorsContainer.innerHTML = '';
    
    const totalSlides = Math.ceil(citiesData.length / slidesToShow);
    
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.className = `slider-indicator ${i === 0 ? 'active' : ''}`;
      indicator.setAttribute('data-index', i);
      
      indicator.addEventListener('click', () => {
        goToSlide(i);
      });
      
      sliderIndicatorsContainer.appendChild(indicator);
    }
  }

  // Go to specific slide
  function goToSlide(index) {
    const totalSlides = Math.ceil(citiesData.length / slidesToShow);
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    
    const translateX = -currentIndex * (slidesToShow * slideWidth);
    citySlideContainer.style.transform = `translateX(${translateX}px)`;
    
    // Update indicators
    document.querySelectorAll('.slider-indicator').forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
  }

  // Handle next slide
  function nextSlide() {
    const totalSlides = Math.ceil(citiesData.length / slidesToShow);
    goToSlide((currentIndex + 1) % totalSlides);
  }

  // Handle previous slide
  function prevSlide() {
    const totalSlides = Math.ceil(citiesData.length / slidesToShow);
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }

  // Update slidesToShow based on screen width
  function updateSlidesToShow() {
    if (window.innerWidth >= 1024) {
      slidesToShow = 3;
    } else if (window.innerWidth >= 768) {
      slidesToShow = 2;
    } else {
      slidesToShow = 1;
    }
    
    // Recalculate slide width
    slideWidth = citySlideContainer.parentElement.clientWidth / slidesToShow;
    
    // Update slides
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
      card.style.flex = `0 0 ${100 / slidesToShow}%`;
    });
    
    // Recreate indicators
    createSliderIndicators();
    
    // Reset to first slide
    goToSlide(0);
  }

  // Initialize touch events for mobile swipe
  function initTouchEvents() {
    citySlideContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    citySlideContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  // Handle swipe direction
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left (next)
      nextSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right (prev)
      prevSlide();
    }
  }

  // Initialize slider
  function initSlider() {
    createCityCards();
    updateSlidesToShow();
    
    // Add event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    window.addEventListener('resize', updateSlidesToShow);
    
    // Initialize touch events
    initTouchEvents();
    
    // Auto play slider
    setInterval(nextSlide, 5000);
  }

  // Initialize the slider
  initSlider();
}