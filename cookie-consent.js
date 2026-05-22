// Cookie Consent Management
document.addEventListener('DOMContentLoaded', function() {
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptButton = document.getElementById('accept-cookies');
  const rejectButton = document.getElementById('reject-cookies');
  
  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieConsent');
  
  if (!cookieChoice) {
    // Show the banner if no choice has been made
    cookieConsent.style.display = 'block';
    
    // Handle accept button click
    acceptButton.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieConsent.style.display = 'none';
      
      // Enable Google Analytics
      enableGoogleAnalytics();
      
      // Track the consent event
      gtag('event', 'cookie_consent', {
        'event_category': 'privacy',
        'event_label': 'accepted'
      });
    });
    
    // Handle reject button click
    rejectButton.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'rejected');
      cookieConsent.style.display = 'none';
      
      // Disable Google Analytics
      disableGoogleAnalytics();
      
      // Track the consent event
      gtag('event', 'cookie_consent', {
        'event_category': 'privacy',
        'event_label': 'rejected'
      });
    });
  } else if (cookieChoice === 'accepted') {
    // If previously accepted, enable analytics
    enableGoogleAnalytics();
  } else {
    // If previously rejected, disable analytics
    disableGoogleAnalytics();
  }
  
  // Function to enable Google Analytics
  function enableGoogleAnalytics() {
    // Set a cookie to indicate analytics is enabled
    document.cookie = "analytics_enabled=true; max-age=31536000; path=/";
    
    // Make sure Google Analytics is running
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }
  
  // Function to disable Google Analytics
  function disableGoogleAnalytics() {
    // Set a cookie to indicate analytics is disabled
    document.cookie = "analytics_enabled=false; max-age=31536000; path=/";
    
    // Disable Google Analytics
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
    
    // Clear existing cookies
    clearAnalyticsCookies();
  }
  
  // Function to clear analytics cookies
  function clearAnalyticsCookies() {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      // Check if the cookie is related to Google Analytics
      if (name.indexOf('_ga') === 0 || name.indexOf('_gid') === 0 || name.indexOf('_gat') === 0) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }
    }
  }
}); 