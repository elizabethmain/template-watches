/* ── ENVIRONMENT PROBES ─────────────────── */
    const isMobile  = window.matchMedia('(max-width: 768px)').matches;
    const isTouch   = window.matchMedia('(hover: none)').matches;
    const prefersRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── NAVIGATION SCROLL STATE ───────────── */
    const nav = document.getElementById('nav');
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── MOBILE MENU ────────────────────────── */
    const mobileMenu     = document.getElementById('mobileMenu');
    const hamburger      = document.querySelector('.nav-hamburger');
    const menuClose      = document.getElementById('mobileMenuClose');
    const menuLinks      = document.querySelectorAll('.mobile-menu-link');

    function openMenu() {
      mobileMenu.classList.add('open');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    hamburger.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openMenu(); });
    menuClose.addEventListener('click', closeMenu);
    menuLinks.forEach(l => l.addEventListener('click', closeMenu));
    // Close on backdrop tap (touch outside the list)
    mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });

    /* ── HERO BG LOAD ANIMATION ────────────── */
    const heroBg = document.getElementById('heroBg');
    setTimeout(() => heroBg.classList.add('loaded'), 300);

    /* ── TICKER DUPLICATION ─────────────────── */
    const tickerItems = [
      'Swiss Made', 'Geneva Atelier', 'Est. 1887',
      'In-House Calibre', 'Hand Assembled', 'Tourbillon',
      'Chronomètre Certifié', '248 Components', 'Lac Léman',
      'Precision Since 1887', 'Limited Production', 'Platinum & Steel',
    ];
    const track = document.getElementById('ticker');
    const buildItem = t => {
      const el = document.createElement('span');
      el.className = 'ticker-item';
      el.innerHTML = `<span class="ticker-dot"></span>${t}`;
      return el;
    };
    [...tickerItems, ...tickerItems].forEach(t => track.appendChild(buildItem(t)));

    /* ── INTERSECTION OBSERVER (REVEAL) ─────── */
    // Skip animation entirely if user prefers reduced motion
    const revealEls = document.querySelectorAll('.reveal');
    if (prefersRM) {
      revealEls.forEach(el => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.10 }
      );
      revealEls.forEach(el => observer.observe(el));
      // Immediately reveal hero content
      document.querySelectorAll('.hero .reveal').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 200);
      });
    }

    /* ── MAGNETIC BUTTON MICRO-PHYSICS ─────── */
    // Only attach on true pointer devices — never on touch
    if (!isTouch && !prefersRM) {
      document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const rect = btn.getBoundingClientRect();
          const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
          const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
          btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      });
    }