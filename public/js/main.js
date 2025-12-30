// Language Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const translatableElements = document.querySelectorAll('[data-en][data-de]');

  // Check for saved language preference or default to English
  let currentLang = localStorage.getItem('preferredLanguage') || 'en';

  // Apply saved language on load
  setLanguage(currentLang);

  // Language button click handlers
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update button states
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update all translatable elements
    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.textContent = text;
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update page title
    if (lang === 'de') {
      document.title = 'SocialBoost | Social Media Marketing Agentur';
    } else {
      document.title = 'SocialBoost | Social Media Marketing Agency';
    }
  }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }
});

// Smooth Scroll for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Navbar Background on Scroll
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
});

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert(localStorage.getItem('preferredLanguage') === 'de'
          ? 'Bitte füllen Sie alle Pflichtfelder aus.'
          : 'Please fill in all required fields.');
        return;
      }

      // Simulate form submission (replace with actual endpoint in production)
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = localStorage.getItem('preferredLanguage') === 'de'
        ? 'Wird gesendet...'
        : 'Sending...';

      // Simulate API call
      setTimeout(() => {
        alert(localStorage.getItem('preferredLanguage') === 'de'
          ? 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.'
          : 'Thank you for your message! We will get back to you shortly.');

        this.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1000);
    });
  }
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
