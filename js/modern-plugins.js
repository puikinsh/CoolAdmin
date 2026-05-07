/**
 * CoolAdmin — Modern plugin behaviors (vanilla JS).
 *
 * Animated counters, modern progress bars, and a lightweight image lightbox.
 * Styles live in css/theme.css; nothing is injected at runtime.
 */

ready(() => {
  initCounters();
  initModernProgressBars();
  initLightbox();
});

// `<span class="counter" data-count="42" data-duration="2000">0</span>`
// Animates from 0 → data-count when the element scrolls into view.
function initCounters() {
  const counters = $$('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      const target = parseInt(el.getAttribute('data-count') || el.textContent, 10);
      const duration = parseInt(el.getAttribute('data-duration'), 10) || 2000;
      animateCounter(el, 0, target, duration);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  const delta = end - start;

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(start + delta * eased);
    element.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else element.textContent = end.toLocaleString();
  };

  requestAnimationFrame(tick);
}

// `.progress-bar-modern` with `data-percentage` + `data-duration` and an
// inner `.progress-fill` element. Animates width when scrolled into view.
function initModernProgressBars() {
  const bars = $$('.progress-bar-modern');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const target = Number(entry.target.getAttribute('data-percentage') || 0);
      const duration = Number(entry.target.getAttribute('data-duration') || 1000);
      animateProgressBar(entry.target, target, duration);
    });
  }, { threshold: 0.1 });

  bars.forEach((bar) => observer.observe(bar));
}

function animateProgressBar(element, targetPercentage, duration) {
  const startTime = performance.now();
  const fill = find(element, '.progress-fill') || element;
  const text = find(element, '.progress-text');

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = targetPercentage * progress;
    fill.style.width = `${value}%`;
    if (text) text.textContent = `${Math.round(value)}%`;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

// Click any `[data-lightbox]` element to open its `href` (or `data-src`)
// image in a full-screen overlay.
function initLightbox() {
  $$('[data-lightbox]').forEach((trigger) => {
    on(trigger, 'click', function (e) {
      e.preventDefault();
      const src = this.href || this.getAttribute('data-src');
      if (src) openLightbox(src);
    });
  });
}

function openLightbox(imageSrc) {
  const overlay = document.createElement('div');
  overlay.className = 'modern-lightbox';

  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';

  const content = document.createElement('div');
  content.className = 'lightbox-content';

  const img = document.createElement('img');
  img.src = imageSrc;          // textContent-safe; never serialized as HTML
  img.alt = 'Lightbox image';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close lightbox');
  closeBtn.innerHTML = '&times;';

  content.append(img, closeBtn);
  backdrop.append(content);
  overlay.append(backdrop);
  document.body.append(overlay);
  addClass(document.body, 'lightbox-open');

  const close = () => {
    removeClass(document.body, 'lightbox-open');
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };

  const onKey = (e) => { if (e.key === 'Escape') close(); };

  on(backdrop, 'click', (e) => { if (e.target === backdrop) close(); });
  on(closeBtn, 'click', close);
  document.addEventListener('keydown', onKey);
}
