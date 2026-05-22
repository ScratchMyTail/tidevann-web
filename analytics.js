// Custom analytics tracking for Tidevann.app

// Track app store link clicks
document.addEventListener('DOMContentLoaded', function() {
  // Track App Store link clicks
  const appStoreLink = document.querySelector('a.app-store');
  if (appStoreLink) {
    appStoreLink.addEventListener('click', function() {
      gtag('event', 'app_store_click', {
        'event_category': 'download',
        'event_label': 'App Store'
      });
    });
  }

  // Track Google Play link clicks
  const playStoreLink = document.querySelector('a.play-store');
  if (playStoreLink) {
    playStoreLink.addEventListener('click', function() {
      gtag('event', 'play_store_click', {
        'event_category': 'download',
        'event_label': 'Google Play'
      });
    });
  }

  // Track navigation clicks
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const section = this.getAttribute('href').substring(1);
      gtag('event', 'navigation_click', {
        'event_category': 'navigation',
        'event_label': section
      });
    });
  });

  // Track email link clicks
  const emailLink = document.querySelector('a.email-link');
  if (emailLink) {
    emailLink.addEventListener('click', function() {
      gtag('event', 'email_click', {
        'event_category': 'contact',
        'event_label': 'Email'
      });
    });
  }

  // Track review navigation
  const reviewDots = document.querySelectorAll('.review-dots .dot');
  reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      gtag('event', 'review_navigation', {
        'event_category': 'reviews',
        'event_label': 'Review ' + (index + 1)
      });
    });
  });

  // Track screenshot carousel navigation
  const screenshotImages = document.querySelectorAll('.phone-screen img');
  screenshotImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      gtag('event', 'screenshot_view', {
        'event_category': 'screenshots',
        'event_label': 'Screenshot ' + (index + 1)
      });
    });
  });

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
        gtag('event', 'scroll_depth', {
          'event_category': 'engagement',
          'event_label': maxScroll + '%'
        });
      }
    }
  });

  // Track time on page
  const timeIntervals = [10, 30, 60, 120, 300]; // 10s, 30s, 1min, 2min, 5min
  timeIntervals.forEach(seconds => {
    setTimeout(() => {
      gtag('event', 'time_on_page', {
        'event_category': 'engagement',
        'event_label': seconds + ' seconds'
      });
    }, seconds * 1000);
  });
}); 