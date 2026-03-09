document.querySelectorAll('form.form-card').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const feedback = form.querySelector('.form-feedback');
    const message = form.dataset.successMessage || 'Form submitted successfully.';

    if (!form.checkValidity()) {
      feedback.textContent = 'Please complete all required fields before submitting.';
      feedback.style.color = '#b42318';
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());
    console.log('Form submission preview:', entries);

    feedback.textContent = message;
    feedback.style.color = '#0b5a32';
    form.reset();
  });
});

const navWrap = document.querySelector('.nav-wrap');
const navLinks = navWrap?.querySelector('.nav-links');
const siteHeader = document.querySelector('.site-header');

const newsPosts = [
  {
    title: '2026 Scholarship Intake Opens for Qualified Applicants',
    date: 'March 8, 2026',
    category: 'Scholarships',
    summary: 'Applications are now open with updated document requirements, guidance sessions, and admission support timelines.',
    href: 'news-scholarship-2026.html',
    image: 'https://i.ibb.co/JW664n2y/Chat-GPT-Image-Mar-8-2026-12-00-34-PM.png',
    imageAlt: 'Students celebrating scholarship opportunities'
  },
  {
    title: 'IELTS Mock Exam Certificate Request System Launched',
    date: 'March 8, 2026',
    category: 'Announcements',
    summary: 'Students who complete IELTS mock exams can now request certificate processing through the new dedicated certificate workflow.',
    href: 'news-ielts-certificate-system.html',
    image: 'https://i.ibb.co/5W4FhDnH/Chat-GPT-Image-Mar-8-2026-08-38-03-PM-1.png',
    imageAlt: 'IELTS classroom completion and certificate announcement'
  },
  {
    title: 'Healthcare Referral Program Expansion Update',
    date: 'March 8, 2026',
    category: 'Healthcare Programs',
    summary: 'Tolbert Innovation Hub has expanded healthcare referral support pathways for families seeking treatment coordination in India.',
    href: 'news-healthcare-referral-expansion.html',
    image: 'https://i.ibb.co/PZtxGS1X/Chat-GPT-Image-Mar-8-2026-01-03-34-PM.png',
    imageAlt: 'Healthcare support and treatment coordination update'
  },
  {
    title: 'Technology Innovation Support for Liberian Businesses',
    date: 'March 8, 2026',
    category: 'Technology Programs',
    summary: 'New technology consultation support helps businesses modernize operations with websites, platforms, and digital process tools.',
    href: 'news-technology-support-2026.html',
    image: 'https://i.ibb.co/wFnGC1NQ/Chat-GPT-Image-Mar-8-2026-12-25-09-PM.png',
    imageAlt: 'Technology innovation and software support update'
  }
];

function renderLatestUpdates() {
  const container = document.querySelector('[data-latest-news]');
  if (!container) return;

  container.innerHTML = newsPosts
    .slice(0, 3)
    .map((post) => `
      <article class="card news-card">
        <img class="news-card-image" src="${post.image}" alt="${post.imageAlt}" loading="lazy" />
        <p class="news-meta">${post.date}</p>
        <p class="news-category">${post.category}</p>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <a class="card-link" href="${post.href}">Read More →</a>
      </article>
    `)
    .join('');
}

function injectFooterFeaturedNews() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;
  if (footer.querySelector('[data-featured-news-footer]')) return;

  const footerGrid = footer.querySelector('.footer-grid');
  if (footerGrid) {
    const card = document.createElement('div');
    card.setAttribute('data-featured-news-footer', 'true');
    card.innerHTML = '<h3>Featured News</h3><p><a href="news.html">Read the latest updates from Tolbert Innovation Hub</a></p>';
    footerGrid.appendChild(card);
    return;
  }

  const container = footer.querySelector('.container') || footer;
  const paragraph = document.createElement('p');
  paragraph.setAttribute('data-featured-news-footer', 'true');
  paragraph.innerHTML = '<a href="news.html">Featured News: Read the latest updates</a>';
  container.appendChild(paragraph);
}

function wireAutoHideHeader() {
  if (!siteHeader) return;

  let lastScrollY = window.scrollY;
  const threshold = 8;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    const menuOpen = navWrap?.classList.contains('nav-open');

    if (currentY <= 40 || menuOpen) {
      siteHeader.classList.remove('header-hidden');
      lastScrollY = currentY;
      return;
    }

    if (delta > threshold) {
      siteHeader.classList.add('header-hidden');
    } else if (delta < -threshold) {
      siteHeader.classList.remove('header-hidden');
    }

    lastScrollY = currentY;
  }, { passive: true });
}

if (navWrap && navLinks) {
  if (!navLinks.id) {
    navLinks.id = 'primary-navigation';
  }

  if (!navLinks.querySelector('a[href="news.html"]')) {
    const newsLink = document.createElement('a');
    newsLink.href = 'news.html';
    newsLink.textContent = 'News';
    const homeLink = navLinks.querySelector('a[href="index.html"]');
    if (homeLink?.nextSibling) {
      homeLink.insertAdjacentElement('afterend', newsLink);
    } else if (homeLink) {
      navLinks.append(newsLink);
    } else {
      navLinks.prepend(newsLink);
    }
  }

  const isNewsPage = /news(.*)?\.html$/i.test(window.location.pathname.split('/').pop() || '');
  if (isNewsPage) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });
    const newsNav = navLinks.querySelector('a[href="news.html"]');
    if (newsNav) {
      newsNav.classList.add('active');
      newsNav.setAttribute('aria-current', 'page');
    }
  }

  const brand = navWrap.querySelector('.brand');
  if (brand && !brand.querySelector('.brand-logo')) {
    const brandText = brand.textContent.trim();
    brand.textContent = '';

    const logo = document.createElement('img');
    logo.className = 'brand-logo';
    logo.src = 'https://i.ibb.co/SXJKRq0S/Tolbert-Innovation-Logo.jpg';
    logo.alt = 'Tolbert Innovation Hub logo';
    logo.width = 48;
    logo.height = 48;

    const text = document.createElement('span');
    text.className = 'brand-text';
    text.textContent = brandText || 'Tolbert Innovation Hub';

    brand.append(logo, text);
  }

  let menuButton = navWrap.querySelector('.menu-toggle');
  if (!menuButton) {
    menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'menu-toggle';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', navLinks.id);
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    menuButton.innerHTML = '<span aria-hidden="true">☰</span> Menu';

    if (brand) {
      brand.insertAdjacentElement('afterend', menuButton);
    } else {
      navWrap.prepend(menuButton);
    }
  }

  const closeMenu = () => {
    navWrap.classList.remove('nav-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const shouldOpen = !navWrap.classList.contains('nav-open');
    navWrap.classList.toggle('nav-open', shouldOpen);
    menuButton.setAttribute('aria-expanded', String(shouldOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 920) closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) {
      closeMenu();
    }
  });
}

wireAutoHideHeader();
renderLatestUpdates();
injectFooterFeaturedNews();
