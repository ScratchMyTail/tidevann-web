// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Only handle smooth scrolling for same-page links
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Scroll to top when logo is clicked
document.getElementById('nav-logo').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Review carousel functionality
const reviews = document.querySelectorAll('.review');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.review-nav.prev');
const nextButton = document.querySelector('.review-nav.next');
let currentReview = 0;
let isAnimating = false;

function showReview(index) {
  if (isAnimating) return;
  isAnimating = true;

  // Remove active class from current review immediately
  reviews[currentReview].classList.remove('active');
  dots[currentReview].classList.remove('active');
  
  // Update current review index
  currentReview = index;
  
  // Add active class to new review
  reviews[currentReview].classList.add('active');
  dots[currentReview].classList.add('active');

  // Reset animation state after animation completes
  setTimeout(() => {
    isAnimating = false;
  }, 1000);
}

function nextReview() {
  const nextIndex = (currentReview + 1) % reviews.length;
  showReview(nextIndex);
}

function prevReview() {
  const prevIndex = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(prevIndex);
}

// Add click handlers to navigation buttons
prevButton.addEventListener('click', prevReview);
nextButton.addEventListener('click', nextReview);

// Add click handlers to dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (index !== currentReview) {
      showReview(index);
    }
  });
});

// Auto-rotate reviews every 15 seconds
setInterval(nextReview, 15000);

// Screenshot carousel functionality
const screenshots = document.querySelectorAll('.phone-screen img');
let currentScreenshot = 0;

function showScreenshot(index) {
  // Fade out current screenshot
  screenshots[currentScreenshot].classList.remove('active');
  
  // Update current screenshot index
  currentScreenshot = index;
  
  // Fade in new screenshot
  screenshots[currentScreenshot].classList.add('active');
}

function nextScreenshot() {
  const nextIndex = (currentScreenshot + 1) % screenshots.length;
  showScreenshot(nextIndex);
}

// Auto-rotate screenshots every 10 seconds
setInterval(nextScreenshot, 5000);

// Tagline carousel functionality
const taglines = document.querySelectorAll('.tagline');
let currentTagline = 0;
let isTaglineAnimating = false;

function showTagline(index) {
  if (isTaglineAnimating) return;
  isTaglineAnimating = true;
  
  // Add exit class to current tagline
  taglines[currentTagline].classList.add('exit');
  
  // Update current tagline index
  currentTagline = index;
  
  // Add active class to new tagline
  taglines[currentTagline].classList.add('active');
  
  // Reset animation state after animation completes
  setTimeout(() => {
    // Remove exit class from previous tagline
    taglines.forEach((tagline, i) => {
      if (i !== currentTagline) {
        tagline.classList.remove('active', 'exit');
      }
    });
    isTaglineAnimating = false;
  }, 800);
}

function nextTagline() {
  const nextIndex = (currentTagline + 1) % taglines.length;
  showTagline(nextIndex);
}

// Auto-rotate taglines every 6 seconds
setInterval(nextTagline, 6000);

// App icon scroll animation
const navIcon = document.querySelector('.nav-logo img');
let isScrolled = false;

function handleScroll() {
  const scrollPosition = window.scrollY;
  const heroHeight = document.querySelector('.hero').offsetHeight;
  
  if (scrollPosition > heroHeight * 0.5) {
    if (!isScrolled) {
      navIcon.classList.add('visible');
      isScrolled = true;
    }
  } else {
    if (isScrolled) {
      navIcon.classList.remove('visible');
      isScrolled = false;
    }
  }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
// Initial check
handleScroll();

// Hamburger menu functionality
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (hamburgerMenu) {
  hamburgerMenu.addEventListener('click', function() {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  if (navLinks && navLinks.classList.contains('active') && 
      !hamburgerMenu.contains(event.target) && 
      !navLinks.contains(event.target)) {
    hamburgerMenu.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Close menu when clicking on a link
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      hamburgerMenu.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
} 