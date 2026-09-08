// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------- Footer year ----------
document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ---------- Gallery filter ----------
const filterPills = document.querySelectorAll('.filter-pill');
const galleryItems = document.querySelectorAll('.gallery-item');
if (filterPills.length && galleryItems.length) {
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

// ---------- Lightbox ----------
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxArt = lightbox.querySelector('.lightbox-art');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const artHTML = item.querySelector('.placeholder-art').outerHTML;
      const caption = item.querySelector('.gallery-caption').textContent;
      lightboxArt.innerHTML = artHTML;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('open');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('open');
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ---------- Birthday countdown ----------
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  // TODO: replace with Isabel's real birthday (next occurrence), format YYYY-MM-DDTHH:mm:ss
  const targetDate = new Date('2026-09-18T00:00:00');

  const dayEl = document.getElementById('cd-days');
  const hourEl = document.getElementById('cd-hours');
  const minEl = document.getElementById('cd-mins');
  const secEl = document.getElementById('cd-secs');

  function updateCountdown() {
    const now = new Date();
    let diff = Math.max(0, targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (dayEl) dayEl.textContent = String(days).padStart(2, '0');
    if (hourEl) hourEl.textContent = String(hours).padStart(2, '0');
    if (minEl) minEl.textContent = String(mins).padStart(2, '0');
    if (secEl) secEl.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
