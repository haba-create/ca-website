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
      document.title = 'Macrolinks Associates | Ein integrierter Ansatz für Unternehmen';
    } else {
      document.title = 'Macrolinks Associates | An integrated approach to business';
    }
  }
});
