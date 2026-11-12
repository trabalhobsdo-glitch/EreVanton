if ('IntersectionObserver' in window) {
  const bar = document.querySelector('#mobile-bar');
  const sections = document.querySelectorAll('.masthead, .hero-photo, #packages, #package-guide, .footer');
  const visibleSections = new Set();

  const observer = new IntersectionObserver((entries) => {
    for (const {target, isIntersecting} of entries) {
      if (isIntersecting) visibleSections.add(target);
      else visibleSections.delete(target);
    }

    const showBar = visibleSections.size === 0;
    document.body.classList.toggle('has-mobile-bar', showBar);
    bar.hidden = !showBar;
  });

  sections.forEach((section) => observer.observe(section));
}

if ('IntersectionObserver' in window && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const entranceObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        entranceObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.2 });

  document.querySelectorAll('.ingredient-card, .story-pair figure, .product-photo')
    .forEach((element) => entranceObserver.observe(element));
}

const packageNotice = document.querySelector('#package-notice');
if (packageNotice) {
  const dismiss = () => { packageNotice.hidden = true; };
  packageNotice.querySelector('button').addEventListener('click', dismiss);
  packageNotice.querySelector('a').addEventListener('click', dismiss);
  window.setTimeout(() => { packageNotice.hidden = false; }, 7000);
}
