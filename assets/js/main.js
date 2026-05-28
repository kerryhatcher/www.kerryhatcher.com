(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    /* Staggered entrance for hero / heading clusters */
    document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
      const items = group.querySelectorAll('[data-reveal]');
      items.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 70, 480)}ms`;
      });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Sticky header scrim ---------- */
  const header = document.querySelector('[data-site-header]');
  if (header) {
    let ticking = false;
    const updateHeader = () => {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      ticking = false;
    };
    updateHeader();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Reading progress (post pages only) ---------- */
  const progress = document.querySelector('[data-reading-progress] .reading-progress__bar');
  const article = document.querySelector('.post__body');
  if (progress && article) {
    const compute = () => {
      const rect = article.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport * 0.4;
      const passed = Math.min(Math.max(viewport * 0.6 - rect.top, 0), total);
      const pct = total > 0 ? (passed / total) * 100 : 0;
      progress.style.transform = `scaleX(${pct / 100})`;
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { compute(); raf = 0; });
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }
})();
