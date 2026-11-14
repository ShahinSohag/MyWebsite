const languageButton = document.querySelector('#language-toggle');

function setLanguage(language) {
  const bangla = language === 'bn';
  document.documentElement.lang = bangla ? 'bn' : 'en';
  document.body.classList.toggle('bangla', bangla);
  document.querySelectorAll('[data-en][data-bn]').forEach((element) => {
    element.innerHTML = element.dataset[bangla ? 'bn' : 'en'];
  });
  languageButton.textContent = bangla ? 'EN' : 'বাংলা';
  languageButton.setAttribute('aria-label', bangla ? 'Switch to English' : 'বাংলা ভাষায় দেখুন');
  document.title = bangla ? 'পোর্টফোলিও — স্বাধীন ডিজাইনার' : 'Portfolio — Independent Designer';
  document.querySelector('meta[name="description"]').content = bangla
    ? 'স্বাধীন ডিজাইনারের পোর্টফোলিও ও নির্বাচিত সৃজনশীল কাজ।'
    : 'Independent designer portfolio and selected creative work.';
  try { localStorage.setItem('portfolio-language', language); } catch (_) { /* Storage is optional. */ }
}

languageButton.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'bn' ? 'en' : 'bn');
});

try {
  if (localStorage.getItem('portfolio-language') === 'bn') setLanguage('bn');
} catch (_) { /* Start in English when storage is unavailable. */ }

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.page-section').forEach((section) => revealObserver.observe(section));
}
