/**
 * Setup cities slider functionality
 */
export function setupCities() {
  // Cities data - contains information about major US cities
  const citiesData = [
    {
      name: "Nueva York",
      image: "./images/nuevayork.jpeg",
      description: "Experimenta la vibrante energía de la Gran Manzana con su icónico horizonte, espectáculos de Broadway y diversos vecindarios.",
      highlights: ["Estatua de la Libertad", "Central Park", "Times Square", "Broadway"]
    },
    {
      name: "San Francisco",
      image: "./images/sanfrancisco.jpeg",
      description: "Descubre el encanto de la Bahía con sus colinas, tranvías y el magnífico Puente Golden Gate.",
      highlights: ["Puente Golden Gate", "Isla Alcatraz", "Fisherman's Wharf", "Barrio Chino"]
    },
    {
      name: "Los Ángeles",
      image: "./images/losangeles.jpeg",
      description: "Explora la capital del entretenimiento con Hollywood, hermosas playas y vibrantes escenas culturales.",
      highlights: ["Letrero de Hollywood", "Playa Venice", "Universal Studios", "Beverly Hills"]
    },
    {
      name: "Chicago",
      image: "./images/chicago.jpeg",
      description: "Visita la Ciudad de los Vientos con su impresionante arquitectura, pizza estilo Chicago y atracciones junto al lago.",
      highlights: ["Millennium Park", "Navy Pier", "Instituto de Arte", "Torre Willis"]
    },
    {
      name: "Miami",
      image: "./images/miami.jpeg",
      description: "Disfruta del paraíso tropical con playas prístinas, vida nocturna vibrante y única mezcla cultural.",
      highlights: ["South Beach", "Distrito Art Deco", "Pequeña Habana", "Everglades"]
    },
    {
      name: "Las Vegas",
      image: "./images/lasvegas.jpeg",
      description: "Experimenta la Capital Mundial del Entretenimiento con sus espectaculares shows y lujosos resorts.",
      highlights: ["The Strip", "Calle Fremont", "Tours al Gran Cañón", "Shows de Clase Mundial"]
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