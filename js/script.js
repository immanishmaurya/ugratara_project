const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  navToggle.querySelector('i').classList.toggle('fa-times');
  navToggle.querySelector('i').classList.toggle('fa-bars');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    mainNav.classList.remove('open');
    navToggle.querySelector('i').classList.remove('fa-times');
    navToggle.querySelector('i').classList.add('fa-bars');
  }
});

const links = document.querySelectorAll('.main-nav a');
links.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 760) {
      mainNav.classList.remove('open');
      navToggle.querySelector('i').classList.remove('fa-times');
      navToggle.querySelector('i').classList.add('fa-bars');
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Header scroll effect
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Hero Carousel Functionality
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.querySelector('.carousel-btn.prev');
    this.nextBtn = document.querySelector('.carousel-btn.next');
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 2000; // 2 seconds

    this.init();
  }

  init() {
    // Set up event listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Start autoplay
    this.startAutoPlay();

    // Pause autoplay on hover
    const carousel = document.querySelector('.hero-carousel');
    carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  goToSlide(index) {
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');

    // Update current slide
    this.currentSlide = index;

    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slideCount;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HeroCarousel();
});
