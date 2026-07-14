/* Alfaisal University — 2026 Redesign — shared interactivity */
document.addEventListener('DOMContentLoaded', function () {

  /* Language toggle: an explicit click always wins over the remembered
     preference — otherwise switching to EN from an AR page would just
     redirect straight back to AR on the very next page load. */
  document.querySelectorAll('.lang-pill, .lang-switch, .drawer-lang').forEach(function (a) {
    a.addEventListener('click', function () {
      try {
        var target = document.documentElement.lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('alfaisalLang', target);
      } catch (e) {}
    });
  });

  /* Sticky header shadow on scroll */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('scrolled', y > 12);
    if (toTop) toTop.classList.toggle('show', y > 480);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Mobile nav drawer */
  var drawer = document.querySelector('.mobile-drawer');
  var openBtn = document.querySelector('.nav-toggle');
  var closeBtn = document.querySelector('.close-drawer');
  var backdrop = document.querySelector('.mobile-drawer .backdrop');
  function setDrawer(state) {
    if (!drawer) return;
    drawer.classList.toggle('open', state);
    document.body.style.overflow = state ? 'hidden' : '';
  }
  if (openBtn) openBtn.addEventListener('click', function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (backdrop) backdrop.addEventListener('click', function () { setDrawer(false); });

  document.querySelectorAll('.mobile-drawer .m-nav > li > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var li = a.parentElement;
      if (li.querySelector('.m-sub')) {
        e.preventDefault();
        var wasOpen = li.classList.contains('open');
        document.querySelectorAll('.mobile-drawer .m-nav > li').forEach(function (li2) { li2.classList.remove('open'); });
        if (!wasOpen) li.classList.add('open');
      }
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Accordion */
  document.querySelectorAll('.accordion-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.closest('.accordion-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Animated counters */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counted = new WeakSet();
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }
  function animateCount(el) {
    var target = el.getAttribute('data-count');
    var numMatch = target.match(/[\d.]+/);
    if (!numMatch) return;
    var num = parseFloat(numMatch[0]);
    var suffix = target.replace(numMatch[0], '');
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = (num * eased);
      el.textContent = (Number.isInteger(num) ? Math.floor(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Hero rotating slides (if present) */
  var slides = document.querySelectorAll('.hero-media[data-slides] img');
  if (slides.length > 1) {
    var idx = 0;
    setInterval(function () {
      slides[idx].style.opacity = 0;
      idx = (idx + 1) % slides.length;
      slides[idx].style.opacity = .5;
    }, 5000);
  }
});
